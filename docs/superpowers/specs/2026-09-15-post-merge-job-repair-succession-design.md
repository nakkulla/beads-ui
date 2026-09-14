---
scope:
  - server/worker/pr-actions.js
  - server/worker/pr-actions.test.js
  - server/worker/queue-store.js
  - server/worker/queue-store.test.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/repo-operation-coordinator.test.js
  - server/ws.worker-queue.test.js
  - server/ws/snapshot-retention.js
  - server/ws/snapshot-retention.test.js
  - server/e2e/worker-flow.test.js
  - docs/adr/
---

# 수정된 배포 잡의 실행 증거로 원래 실패를 완료한다

작성일: 2026-09-15 · Bead: `UI-j9j5` · 상태: 승인 전 설계

## 1. 목적과 정본

현재 정리 경로는 원래 PR의 merge SHA에서 잡을 읽고 같은 blob만 재시도한다.
따라서 코드를 수정·배포해도 원래 실패를 완료할 수 없는 복구 공백이 있다.
수정 잡의 실제 성공을 이전 실패와 명시적으로 연결하여 이 공백을 닫는다.

이 저장소는 소비자다. 의미의 정본은 dotfiles의 `dotfiles-2mpr`와
`docs/superpowers/specs/2026-09-15-post-merge-job-repair-succession-design.md`
§3–5다. 양쪽 설계를 함께 발행·검토하며, 구현 packet은 정본 설계의 발행 SHA를
핀한다. 이 문서는 소비자의 저장·경합·재시작·정리 구현을 소유한다.

## 2. 선택과 변경 경계

채택: 커밋된 수정 잡의 `# repo-ops-replaces: <name>@<old-blob>` 선언을 읽고 기존
`RepoOperation` 봉투와 원장으로 실행·예약·성공 승계를 처리한다. 코드와 복구 의도가
같은 PR에서 검토되고, 임의 코드를 실행하는 새로운 경로가 생기지 않는다.

옛 blob 반복은 결함을 고치지 못하므로 기각한다. 원래 merge SHA를 최신 SHA로
바꾸는 방법도 관련 없는 잡까지 실행하고 승인 근거를 잃으므로 기각한다.
결정: 임의 스크립트 API, 새 복구 버튼, 새 Worker 실행 상태, 자동 AI 수리 레인은
추가하지 않는다. 기존 `worker-cleanup-retry` 요청을 그대로 쓴다.
결정: queue 파일을 세션이 직접 편집하거나 failed operation을 성공으로 바꾸지 않는다.

## 3. 선언 읽기와 durable 원장

`runPostMergeJobs`는 실행 전 디렉터리 전체의 기존 일반 파일 판정과 함께 선언도
검사한다. 실제 merge 트리의 blob에서 첫 32줄을 읽는다. 한 줄의 정확한 문법은
`# repo-ops-replaces: <같은 파일명>@<소문자 40hex>`이며 선언은 하나만 허용한다.
경로 구분자·다른 이름·자기 blob·중복·잘못된 값·읽기 실패는 어떤 잡도 시작하기 전에
명명된 실패로 멈춘다. 선언이 없으면 기존 동작이다. 같은 줄 수 안에 있는 malformed
`repo-ops-replaces` 접두도 무시하지 않는다.

원장 key `<name>@<blob>`와 기존 필드 `operation_id`, `repo_id`, `at`는 유지한다.
상태는 `intent | applied | superseded`다. 추가 필드는 다음 두 참조뿐이다.

| 필드 | 위치 | 의미 |
| --- | --- | --- |
| `replaces: {key, operation_id}` | 수정 잡의 intent/applied | 선언이 지정한 실제 이전 intent와 원래 실패 operation; 없던 과거를 생성하지 않음 |
| `repair: {key, operation_id}` | 이전 intent/superseded | 현재 예약된 수정 key와 실행; 실패 기록의 기존 operation_id는 보존 |

예약 시 새 intent와 이전 `repair`를 하나의 CAS(읽었던 값이 그대로인지 확인하는
조건부 저장)로 쓴다. 입력은 이전 key·operation, 새 key·operation, 같은 repo다.
원래 pointer가 바뀌었거나 다른 수정이 먼저 예약했으면 새 실행을 시작하지 않는다.
잡 bytes와 operation의 script path/blob/target identity를 대조하여 key만 믿지 않는다.

성공 확정은 새 key의 `applied`와 이전 key의 `superseded`, 두 참조의 일치,
원래 operation의 `superseded_by`를 하나의 CAS로 저장한다. 원래 operation의 failed,
exit와 로그는 바꾸지 않는다. 링크의 대상은 정확히 성공한 applied operation이다.
이미 확정된 동일 연결은 재요청해도 같은 결과이며 다른 연결로 덮을 수 없다.

같은 수정 blob을 수동 재시도할 때에는 기존 same-key retry CAS가 새 operation으로
바뀌면서 이전 key의 예약도 함께 갱신된다. 하나만 갱신된 상태를 저장하지 않는다.
새 key를 위해 선언 자체나 이전 실패 identity를 바꿀 수는 없다.

## 4. 상태별 판단과 실패

- 이전 key 없음: 새 잡을 정상 실행한다. 과거 key나 실패 operation을 생성하지 않는다.
- 이전 key가 applied 또는 유효하게 superseded: 기존 완료는 유지하고 새 잡은 자신의
  key로 정상 실행한다. 이미 끝난 이전 기록의 연결을 새로 덮지 않는다.
- 이전 intent: 현재 operation을 reconcile하여 terminal failed와 실제 실행 종료 또는
  시작 전 실패를 확인한다. running/queued/retry_pending, 결과 불명, probe 오류,
  operation 부재, repo/identity 불일치는 새 실행과 예약을 막는다.
- 이전 operation은 성공했으나 ledger만 intent: 같은 성공을 먼저 재채택하여 applied로
  만든다. 실패로 취급하여 재실행하지 않는다.
- 수정 예약 후 원래 잡 retry: 수정 operation을 조정하여 진행 중이면 pending,
  실패면 그 원인과 연결 대상을 반환한다. 옛 blob을 다시 실행하지 않는다.
- 수정본 실패: 이전 key는 미완 intent와 예약을 유지한다. 기존 수정 job의 실패
  사다리·수동 재시도를 사용하며 횟수 제한을 늘리지 않는다.
- 수정본 성공: 기존 exact-target, terminal exit 0, 산출물·tracked-clean 검증이 모두
  성립할 때만 §3의 성공 CAS를 수행하고 즉시 readback한다.

선언은 부분 효과가 없다는 증거가 아니다. 정본의 구현 리뷰 조건에 따라 수정 잡이
부분 효과를 확인·재사용해야 한다. Worker가 임의로 cleanup을 보상 실행하지 않는다.

## 5. 중단·재시작·완료 소비

예약 전 중단은 실행을 시작하지 않았다. 예약 후 spawn 전 중단은 기존 started 증거와
같은 operation 조정으로 판단한다. spawn 후 결과가 불명하면 중복 실행하지 않는다.
성공 뒤 CAS 전 중단은 기존 정확한 성공 증거를 재채택하여 같은 CAS를 마친다.
CAS 응답 유실은 원장 readback으로 판정한다. 새 operation을 만들 근거가 아니다.

`normalizePostMergeJobs`와 디스크 round-trip은 새 필드를 보존하고 관계를 검증한다.
기존 intent/applied 행은 변환 없이 읽힌다. 인식한 복구 행의 필드가 손상됐다고
행을 버려 “미실행 key”로 바꾸면 안 된다. 손상은 원본 파일을 보존하는 상태 읽기
실패로 표면화하고 실행·정리 변경을 막는다. 다른 repository·자기 참조·누락 대상과
앞으로 향하는 `repair` 연결의 순환은 같은 실패다. 짝인 `replaces` 역참조는 정상이다.
intent의 예약 대상은 진행 중일 수 있지만 superseded의 대상은 반드시 applied와
성공 증거가 있어야 한다. 자동 추정·수리·과거 실행은 금지한다.

원래 PR의 `runOnePostMergeJob`은 `superseded`를 읽으면 정확한 successor key의
applied와 operation identity·성공 증거를 확인한다. 유효하면 이 잡은 충족된 것으로
보고 다음 정리 단계로 진행한다. 원래 PR의 merge SHA와 실패 이력은 그대로다.
깨진 연결은 실패이며 applied처럼 조용히 건너뛰지 않는다.

새 잡 성공이 다른 PR의 `cleanup_failed`를 무조건 지우지는 않는다. 사용자 요청을
받은 복구 세션이 원래 Bead에 기존 `worker-cleanup-retry`를 현재 revision으로 보내고
정리·close를 확인한다. 재요청과 재시작에서도 옛 잡이 실행되지 않아야 한다.
retention은 참조하는 successor operation의 실행 근거를 함께 보존하며, 화면 투영이나
이력 정리가 성공 판정에 필요한 durable 증거를 없애지 못한다.

## 6. 구현·인도 순서

하나의 spec_backed 구현 packet에서 선언 파서, 원장 mutation/normalization,
기존 실행·정리 경로와 회귀 테스트를 함께 다룬다. 별도 renderer·카드 문법은 건드리지 않는다.

이 소비자의 PR을 먼저 검증·병합·공유 서비스 배포한다. 아직 새 선언이 없는 기존
잡과 기존 원장을 정상 처리하는 것이 하위 호환 조건이다. dotfiles 수정 잡은 이
서비스의 배포 SHA, 프로세스 경로, 포트, HTTP 응답을 확인한 다음 배포한다.
정본 설계는 실행 전 발행·검토돼 있어야 하지만 dotfiles 수정 PR의 close는 이
소비자의 구현 선행이 아니다. 서로 close를 기다리는 순환 의존은 만들지 않는다.

`generated/contracts/repo-operation-policy.json`의 기존 v3 실패 사다리는 바꾸지
않는다. 계약 의미는 dotfiles가 소유하며 이 소비자는 별도 정책 정의자를 만들지 않는다.
실제 수정 잡 배포는 `dotfiles-2mpr`, 기존 PROSTATE-n50 등록·검증은 `dotfiles-a4zg`의
원래 운영 범위다. 같은 복구 세션이 이 둘의 증거와 선행 close를 확인한 뒤 원래
PR #499를 재진입하여 사용자 요청 전체를 마무리한다.

## 7. 검증과 완료 조건

- 선언 없는 기존 잡, 정상 선언, malformed·중복·다른 이름·자기 blob·read 실패를
  검증하고, 디렉터리 전체 검사 실패 시 spawn 횟수가 0임을 확인한다.
- 이전 없음/applied/성공 intent/실패 intent/live/unknown/probe 오류를 각각 검증한다.
- 서로 경쟁하는 수정, 원래 blob retry와 수정 예약의 경쟁, 같은 수정본 retry에서
  old/new pointer 동시 갱신, 잘못된 CAS와 반복 요청의 무효과를 검증한다.
- 예약 직전·직후, spawn 뒤, 성공 후 확정 전, 응답 유실 뒤의 재시작과 디스크
  round-trip을 검증한다. 옛 failed operation은 보존하고 실제 실행 횟수도 확인한다.
- 손상·누락·다른 repo·잘못된 script identity·순환 연결은 spawn 0, close 0,
  원본 보존이어야 한다. 같은 이름의 새로운 blob 성공만으로는 승계되지 않아야 한다.
- 새 잡 성공 → 원래 cleanup-retry → child sweep/close를 연결한 회귀에서 원래
  merge SHA 불변, 옛 blob 실행 0회, 원래 실패 로그 보존을 확인한다. 후속 실패에는
  원래 이슈를 닫지 않는다. 관련 WS·retention·Worker 흐름 테스트도 포함한다.
- 새 worktree의 Node engine과 독립 `npm ci` 후 `npm run tsc`, `npm run lint`,
  변경 파일 Prettier, `npx vitest run --reporter=dot`를 실행한다. 테스트 제한은
  저장소의 120초 기준을 따른다. 공유 배포는 pinned target의 repo-ops 경로로 수행한다.
- 이 Bead의 완료는 테스트와 PR merge가 아니라 공유 서비스 배포 SHA·실제 프로세스
  경로·포트·HTTP 응답까지다. 실제 dotfiles 원래 실패 복구는 대응 Bead의 완료
  증거로 남겨 이 소비자 배포와 혼동하지 않는다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 정본 계약·감시 활성화 수정 잡·실제 복구는 별도 저장소의 독립 인도 단위 | UI-j9j5 | dotfiles-2mpr |

## 결정 (ADR 후보)

- 전제: ADR 0010 — RepoOperation과 저장소 repo-ops 스크립트의 배포 소유권을 유지한다.
- 전제: ADR 0012 — workflow 계약은 dotfiles 정본의 소비자이며 의미를 독자 정의하지 않는다.
- 전제: ADR 0024 — 자동 AI 수리 없이 사용자 요청의 기존 복구 경로를 유지한다.
- 원장은 실패 실행을 보존하면서 커밋된 선언에 결속된 수정 intent를 예약하고 정확한
  실제 성공으로만 superseded를 확정한다. 되돌리기 어려움: durable schema와 재시작
  호환을 유지해야 함; 맥락 없으면 의외: 원래 blob은 실패한 채 원래 PR은 완료됨;
  실제 절충: latest SHA 교체와 직접 applied 덮기를 기각함. 기존 잡 발견·리뷰·
  exact-target 실행·lock·timeout·한 번 적용·unknown 중단 규칙을 승계한다.
  `summary`: "post-merge 잡은 기존 RepoOperation 봉투를 유지하고 명시적 수정 선언의 원자적 예약과 성공 승계로 원래 실패를 완료한다" → ADR, supersede 0030
