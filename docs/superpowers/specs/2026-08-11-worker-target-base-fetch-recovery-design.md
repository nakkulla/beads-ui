# Worker target base fetch 복구 설계

## 배경

Worker는 dispatch 직전에 target base의 원격 tip을 고정하기 위해
`resolveTargetBase`에서 `git fetch --no-tags <remote> <base>`를 실행한다. 현재는
fetch가 한 번이라도 실패하면 즉시 `base_unresolved:fetch`를 admission 사유로
기록하고 dispatch를 거부한다.

`UI-309b`에서 이 사유가 관측됐지만 같은 저장소와 서비스 환경에서 이후 fetch와
base resolution은 정상 동작했다. 또한 scheduler는 여러 Bead를 병렬 dispatch하며
각 dispatch가 `{ force: true }` resolution을 독립 실행하므로, 같은 저장소의 같은
remote-tracking ref를 갱신하는 fetch가 겹칠 수 있다. 현재 결과는 fetch 실패의
`stderr`를 버리고 `fetch` 단계만 남기므로 일시적 네트워크 오류, 인증 오류,
ref-lock 충돌을 구분할 수도 없다.

## 목표

- 같은 workspace에서 겹치는 base resolution이 중복 fetch를 실행하지 않는다.
- 일시적인 fetch 실패는 짧고 유한한 재시도 안에서 복구한다.
- 최종 실패만 `base_unresolved:fetch` admission 사유가 된다.
- 실패 진단에는 credential 가능성이 있는 Git 원문 대신 안전한 분류만 남긴다.
- fetch가 최종 실패하면 stale 원격 ref로 우회하지 않는 기존 fail-closed 계약을
  유지한다.

## 설계

### Workspace별 single-flight resolution

`createWorkerAttachment`의 기존 `resolveBase` seam에 in-flight Promise를 하나 둔다.
resolution이 진행 중이면 scan, dispatch, merge gate를 포함한 모든 동시 호출은 그
Promise를 공유한다.

- 진행 중인 resolution은 `{ force: true }` 호출에도 충분히 최신인 동일 관측으로
  취급한다.
- resolution이 끝난 뒤 들어온 `{ force: true }` 호출은 새 resolution을 시작한다.
- force가 아닌 호출의 기존 TTL cache 동작은 유지한다.
- cache 시각은 resolution 완료 시점에 기록해 느린 fetch가 TTL을 소모하지 않게
  한다.
- 성공과 실패 모두 in-flight 정리를 `finally`에서 수행해 영구 고착을 막는다.

이 경계는 한 attachment가 한 workspace를 소유한다는 기존 구조를 이용하며,
저장소 전역 lock이나 별도 durable state를 추가하지 않는다.

### Fetch bounded retry

`resolveTargetBase`의 5단계 fetch만 총 3회까지 실행한다. 첫 실패 뒤 100ms, 두 번째
실패 뒤 300ms를 기다린다. 테스트는 대기 함수를 주입해 실제 시간을 소비하지
않는다.

모든 non-zero fetch 종료를 동일하게 bounded retry한다. Git 오류 문자열로
재시도 가능성을 완벽하게 판정할 수 없고, 인증·설정 오류도 총 400ms의 상한 뒤
기존처럼 fail-closed되므로 별도 정책 분기는 두지 않는다.

재시도 중 성공하면 기존 5단계의 remote-tracking ref 검증으로 이어간다. 세 번 모두
실패하면 `step: "fetch"`를 반환하며 local branch나 이전 remote-tracking tip으로
fallback하지 않는다.

### 안전한 실패 진단

fetch의 마지막 `stderr`는 메모리 안에서 다음 stable category 중 하나로만
분류한다.

- `ref_lock`: ref 또는 lock 파일 갱신 충돌
- `network`: DNS, 연결, timeout 등 전송 실패
- `auth`: 인증 또는 credential 획득 실패
- `missing_ref`: 원격 branch가 없다는 fetch 응답
- `unknown`: 위 분류에 포함되지 않은 실패

반환 `detail`과 서버 로그에는 remote 이름, 시도 횟수, 마지막 exit code, category만
남긴다. 원격 URL이나 `stderr` 원문은 queue, Beads, 로그에 저장하지 않는다.

### Admission 배지 수명

재시도 안에서 복구되면 resolver는 성공을 반환하므로 scheduler는
`base_unresolved:fetch`를 새로 기록하지 않고 dispatch를 계속한다. 이전 dispatch가
남긴 `base_unresolved:*` admission 기록은 다음 정상 launch의 기존
`clearAdmission` 경로에서 제거된다. 이후 단계가 다른 이유로 실패하면 admission
사유는 그 최신 실패로 덮어쓴다.

`auto_advance=false`인 workspace에서 별도의 background network probe는 실행하지
않는다. 네트워크 상태 변화만으로 작업을 깨우거나 dispatch하는 것은 이 수정의
범위가 아니며, 기존 배지는 다음 명시적 또는 자동 dispatch 시 재검증되어 갱신된다.

## 검증

- 첫 fetch 실패 뒤 두 번째 성공은 resolved base를 반환하고 두 번만 fetch한다.
- 세 번 모두 실패하면 세 번만 fetch하고 분류·시도 횟수·exit code를 반환한다.
- ref-lock, network, auth, missing-ref, unknown 분류가 원문을 노출하지 않는다.
- 동시에 들어온 여러 force resolution은 하나의 underlying fetch를 공유한다.
- shared resolution 완료 뒤 새 force resolution은 새 fetch를 수행한다.
- 최종 fetch 실패만 `base_unresolved:fetch` admission 사유를 만든다.
- 복구된 resolution은 정상 dispatch 경로로 진행하고 정상 launch가 과거 admission
  기록을 제거한다.
- `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`를 통과한다.
- main 반영 뒤 `bdui-shared restart`를 실행하고 merged checkout의 process path,
  listening port, HTTP 응답을 확인한다.

## 비목표

- target base 선언 형식이나 remote 선택 규칙은 바꾸지 않는다.
- fetch 실패 시 stale ref를 허용하지 않는다.
- queue schema, Beads metadata, workflow 계약 어휘를 추가하지 않는다.
- `auto_advance=false`에서 독립적인 주기성 health check를 추가하지 않는다.
- Git 명령 전반에 공통 retry framework를 도입하지 않는다.

## 완료 조건

1. 병렬 dispatch가 같은 workspace에서 중복 base fetch를 만들지 않는다.
2. 일시적인 fetch 실패는 3회 상한 안에서 복구되고 오류 배지를 만들지 않는다.
3. 최종 실패는 fail-closed되며 안전한 category를 통해 원인 종류를 진단할 수 있다.
4. 다음 정상 launch가 과거 `base_unresolved:*` admission 기록을 제거한다.
5. 관련 단위 테스트와 전체 검증, 공유 서비스 런타임 검증이 모두 통과한다.
