---
scope:
  - server/worker/runnable-cache
  - server/workflow-enrich
  - server/workspace-snapshot-phase3.test.js
  - app/data/subscription-issue-store
  - app/data/list-selectors
  - types/subscription-issue-store.ts
  - app/main.js
  - app/main.test.js
  - app/views/board/
  - app/views/worker/
  - app/views/monitor/
  - app/views/detail-panel/
  - app/main.bundle.js
  - app/main.bundle.js.map
  - docs/adr/
  - docs/data-exchange-subscription-plan.md
---

# 반복 조회와 불필요한 화면 갱신 줄이기

- Bead: UI-hhn9
- 작성일: 2026-09-08
- 상태: 작성안 — 사용자 문구 검토 전, 구현·발행 전
- 경로: spec_backed. 한 통합 변경으로 인도하며 단계별 이슈를 추가하지 않는다.
- 통합: UI-9pp3(화면 갱신), UI-f32r(추가 서버 비용 관찰).
- 함께 작성한 스펙: [배포 패키지·미사용 코드·운영 문서 정리](2026-09-08-package-and-code-cleanup-design.md), UI-7732.

## 1. 목표

화면에 표시할 결과가 같거나 현재 화면과 무관할 때 수행하는 반복 작업을 줄인다.
후보 목록의 이슈별 동기 Git 조회, 무관한 구독의 전체 알림, 숨긴 화면의 재조합과
렌더링, 내용이 바뀌지 않은 메시지의 정렬·통지를 직접 제거한다.

사용자는 조사 결과를 7개 이슈로 나눈 것이 과하다고 지적하고 성능과 정리 작업
2개로 합친 뒤 스펙을 작성하도록 요청했다. 서버·프런트 변경은 이 성능 이슈 안에서
통합 검증한다. 아직 측정하지 않은 서버 비용을 별도 필수 계측 사업으로 만들지 않는다.

성공은 같은 입력에서 화면·실행 자격이 유지되면서 불필요한 호출과 렌더 횟수가
줄어드는 것이다. 특정 장비의 밀리초 수치나 삭제한 줄 수를 성공 조건으로 삼지 않는다.

## 2. 확인한 근거

조사 기준 실행 코드는 `ed3ce09185bcac1ee756c2fbacee8efeb0bea081`이다.
작성 중 추가된 main 커밋은 스펙 문서 변경이며 아래 실행 코드는 같았다.

| 재현·관찰 | 결과 | 원인과 위치 |
| --- | --- | --- |
| 실제 기본 enrich + 주입 스냅샷의 open 10행/100행 | 동기 HEAD 조회 10회/100회, 약 108ms/1,095ms; 같은 루프의 타이머 지연 약 109ms/1,097ms | `server/worker/runnable-cache.js:630-639,688-707`이 행마다 컨텍스트 없이 enrich 호출 |
| 숨긴 Board에 무관한 Worker 구독 snapshot 전달 | Board의 여섯 열 snapshot 읽기 발생 | `app/data/subscription-issue-stores.js:14-33`의 출처 없는 전체 통지, `app/views/board/index.js:301-415,1198-1208`의 무조건 재조합 |
| 1,000행에서 더 오래된 upsert와 없는 id delete 각각 전달 | 각 메시지에서 알림 1회·정렬 비교 5,876회, 내용 변화 없음 | `app/data/subscription-issue-store.js:86-128`의 무조건 정렬·통지 |
| Board 열 선택 | registry의 snapshot 복사 뒤 selector에서 다시 복사 | `app/data/subscription-issue-stores.js`, `app/data/list-selectors.js` |

시간 수치는 로컬 합성 입력으로 실행한 재현이며 실제 운영 응답 시간으로 일반화하지
않는다. 숨김 재현은 실제 registry와 JSDOM을 사용했다. 기존 전체 검사에서는
타입·lint·포맷과 테스트 10,921개가 통과했으므로 이 비용은 기존 검증이 잡지 못한
문제다. 변경 후에는 아래 행위·호출 횟수 검증을 추가한다.

## 3. 접근 비교

| 접근 | 장점 | 비용·한계 | 판단 |
| --- | --- | --- | --- |
| 기존 비동기 조회 재사용, 알림 출처 필터, 숨김 렌더 생략 | 결함이 생기는 호출 지점에서 반복을 없애고 기존 상태 소유권을 유지한다 | 호출 계약과 활성 화면 회귀 검증이 필요하다 | 채택 |
| 모든 갱신에 debounce나 긴 캐시 TTL 적용 | 호출 빈도를 낮추기 쉽다 | 불필요한 작업은 남고 필요한 최신 표시까지 늦어진다 | 기각 |
| 중앙 이슈 캐시·새 데이터 계층·광범위 계측 도입 | 구조 전체를 바꿀 여지가 있다 | 확인한 결함보다 큰 상태·운영 계약 변경이 된다 | 기각 |

## 4. 후보 목록의 Git 조회

### 4.1 이미 받은 스냅샷을 준비 단계에 전달한다

현재 목록·상세가 사용하는 `warmWorkflowProbes(items, workspace_root, generation)`를
후보 목록 채우기에도 사용한다. 새 캐시·주기 타이머·bd 조회 경로를 만들지 않는다.

1. 기존 `path.resolve` 기준으로 workspace를 한 번 정규화하고, 공유 스냅샷 요청과
   준비 단계에 같은 문자열을 전달한다. symlink를 합치는 별도 식별 체계는 도입하지 않는다.
2. `fetchRunnable`이 이미 받은 정상·최신 `result.snapshot`을 그대로 보관한다.
   이 객체의 `generation`과 `all`이 준비 단계의 세대 입력이다.
3. 실제 workflow 정보를 그릴 행을 준비한다. 현재 판정의 기본 대상인 유효 id의
   open 비-Phase-child와 in_progress 행을 사용한다. 실행 가능 여부·라벨·차단 의존
   판정을 새로 복제하지 않는다. 준비 대상의 축소가 자격 판정 결과를 바꾸면 안 된다.
4. 선택한 행과 원본 스냅샷을 기존 비동기 준비 함수에 전달하고 완료를 기다린다.
   가변 Git 사실은 선택한 행만이 아니라 `snapshot.all` 전체로 준비한다.
5. 반환된 같은 컨텍스트를 해당 채우기의 지역 변수로 보관하고 모든 행의
   `enrichIssueWorkflow`에 명시 전달한다. 행마다 HEAD를 다시 읽지 않는다.
   주입 가능한 `enrichWorkflow`도 컨텍스트를 받도록 호출 계약과 테스트를 맞춘다.

같은 workspace·세대의 HEAD/branch/dirty 준비는 기존 공유 Promise를 재사용한다.
경로 변경·조상 관계·커밋 존재는 기존 불변 키 캐시와 동시성 상한을 사용한다.
다른 세대가 시작됐다고 진행 중인 행의 컨텍스트를 전역의 최신 값으로 바꾸지 않는다.

### 4.2 실패와 호환 범위

- 정상 스냅샷의 Git 프로브 실패는 해당 신선도 정보를 미판정으로 둔다.
  준비 컨텍스트를 생략해 동기 프로브로 되돌아가는 fallback은 허용하지 않는다.
- 스냅샷 실패·stale·형식 오류에서는 기존 마지막 정상 후보와 재시도 억제 규칙을
  유지한다. 프로브 실패를 정상 빈 목록으로 바꿔 기존 후보를 지우지 않는다.
- 같은 workspace의 진행 중 채우기 공유, 구독자 0일 때 조회 생략, 두 후보 묶음의
  동일한 시각·무효화·실패 처리를 유지한다.
- 테스트 전용 `runJson` 분기는 세대 없는 입력으로 별도 데이터 경로를 유지한다.
  실제 생성자는 `server/worker/runtime.js`에서 기본 옵션으로만 호출한다.
  이 분기와 테스트 전용 옵션을 제거하고 기존 테스트는 `requestSnapshot` 주입으로
  통일한다. 테스트를 위해 가짜 세대를 생산하는 런타임 계층을 새로 만들지 않는다.
- 테스트 fixture는 실제 스냅샷의 `generation/all/ready_explain` 형태를 따른다.
  순수 자격 판정 테스트의 Git 준비는 모듈 mock으로 고립하고, 이 변경의 핵심 회귀
  검사는 기본 준비 함수와 실제 임시 Git 저장소를 사용한다. 고정 횟수의 microtask
  대기 대신 기존 완료 신호나 관측 가능한 채우기 완료를 기다린다.

결정: `title-cache`의 동기 호출, bd 명령 의미, admission·머지 자격의 재확인은
바꾸지 않는다 — 이번에 확인한 결함은 후보 투영의 반복 Git 조회이며, 실행 직전
검사는 읽은 뒤 상태가 바뀌는 문제를 막는 별도 책임이다.

ADR 0026의 후보 캐시 예외만 대체한다. 불변 사실의 키·상한, 미판정의 세대 한정,
비동기 준비와 캐시 읽기의 분리, 캡처한 HEAD에 대한 조회와 title-cache 예외는
새 ADR에 그대로 승계한다. 기존 Accepted 본문의 의미를 직접 덧고치지 않는다.

## 5. 구독별 알림과 내용 변경

### 5.1 알림 출처를 전달한다

registry의 내부 알림에 변경을 낸 subscription id를 전달한다. 서버 push 봉투나
네트워크 프로토콜은 바꾸지 않는다. 개별 store의 listener는 인자 없는 내용 변경
알림으로 유지하며, registry가 store 연결을 만들 때 알고 있는 id를 붙인다.

`createListSelectors`의 구독은 자신이 사용하는 id 집합의 알림만 소비자에게 전달한다.
UI 정렬 설정의 알림은 별도 입력으로 그대로 전달한다. Board와 Worker는 각자의
목록 집합만 사용한다. 상세 패널의 registry listener는 현재 `detail:<id>` 구독만
받고, 선택이 없거나 다른 구독이면 snapshot을 읽지 않는다.

register/unregister에 새 초기 알림을 추가하지 않는다. 기존 load·구독 snapshot 경로가
초기 표시를 소유한다. 구독 교체·연결 해제 시 이전 store listener 해제도 유지한다.
테스트 stub의 callback 계약과 실제 소비자를 함께 수정한다.

### 5.2 내용 불변 메시지는 정렬·통지를 생략한다

다음 두 경우는 더 높은 정상 revision의 수신을 기록하되 정렬과 listener 통지를 하지 않는다.

- 기존 항목보다 낮은 유효 숫자 `updated_at` 때문에 현재 코드가 이미 무시하는 upsert.
- store에 없는 id의 delete.

동일하거나 낮은 revision 무시는 기존 규칙을 따른다. 뒤이어 그보다 낮은 revision이
도착해도 재적용되지 않아야 한다. 같은 timestamp의 upsert는 기존처럼 적용한다.
정상 변경은 기존 객체 identity와 결정적 정렬을 유지하고 통지한다. snapshot의 전체
교체와 초기 표시 알림도 유지한다.

결정: timestamp 형식이나 revision 우선순위는 바꾸지 않는다 — 현재 계약의
`updated_at`은 숫자 epoch ms이며 freshness는 revision이 정본이다.
ISO 문자열 호환 확대·깊은 동등성 비교·동일 내용 snapshot 추정 생략은 포함하지 않는다.

ADR 0002의 “적용 메시지마다 listener 호출”을 “렌더링 내용 변경 시 호출”로
대체한다. 새 ADR에는 구독별 store, 전체 issue push, revision 순서·재연결,
정렬·객체 identity 등 유지되는 조항을 함께 승계한다.

### 5.3 배열 복사를 한 번만 한다

registry의 `snapshotFor`가 소비자 소유 배열을 반환한다는 현재 경계를 유지하고
`selectBoardColumn`의 바로 뒤 복사만 제거한다. selector의 정렬이 store 내부 배열을
변형하지 않는지 검사한다. 공유 배열을 노출하거나 별도의 selector 캐시를 추가하지 않는다.

## 6. 숨긴 화면의 렌더링

라우트가 이미 설정하는 mount의 `hidden` 값을 화면 표시의 기준으로 사용한다.
전역 활성 화면 저장소나 별도의 데이터 동기화 계층을 추가하지 않는다.

| 화면 | 숨김 중 생략 | 유지할 동작과 복귀 |
| --- | --- | --- |
| Board | 열 snapshot 재조합과 DOM 렌더 | store 수신·필터·정렬·접힘 상태 유지; 기존 load에서 최신 데이터를 읽음 |
| Worker | 목록 재조합·DOM 렌더·표시용 grace tick | `adapter.notifyIssuesChanged()`의 캐시 무효화, workspace 변경 시 viewer 정리와 필요한 drawer 상태 갱신 유지; load에서 최신 렌더·표시 타이머 복귀 |
| Monitor | pipeline/viewport/지연 callback의 DOM 렌더, 표시용 tick | 새 snapshot의 `exec_adopted.clear()` 등 데이터 처리는 유지; 기존 pause/load로 tick 정지·복귀 |
| Detail | 선택 없는 상태·무관한 목록 알림의 snapshot 조회 | 현재 상세 구독과 필요한 queue 알림, 기존 비동기 응답 순서 방어 유지 |

Board는 비싼 snapshot 재조합에 들어가기 전에, 각 화면은 공통 렌더 진입점에서도
숨김을 확인한다. 이렇게 하여 구독 외에 viewport·지연 callback으로 들어온 작업도
숨긴 DOM을 다시 만들지 않게 한다. 데이터 처리와 렌더가 같은 callback 안에 있으면
데이터 처리를 먼저 수행하고 렌더만 생략한다.

Worker에는 표시 타이머를 끄는 가벼운 pause를 추가하고 라우트 이탈에서 호출한다.
Monitor의 기존 pause는 유지한다. 재진입 load는 최신 데이터를 그리고 타이머를
중복 없이 다시 시작한다. hide를 clear/destroy로 대체하지 않는다. 현재 clear는
구독을 다시 붙이지 않으며 필터·편집 상태를 버릴 수 있기 때문이다.

상세는 같은 id 재조회에서 편집 상태를 보존하고, id/workspace가 바뀌었을 때의
request sequence·key 검증을 유지한다. Worker 큐 조작도 클릭 시 최신 queue revision을
읽는 기존 규칙을 유지한다. 화면이 숨겨졌다는 이유로 서버 채널 전체를 중지하지 않는다.

기존 타이머·listener를 만지는 범위에서는 등록과 해제를 대칭으로 맞춘다.
Worker destroy의 input/keydown listener, Monitor clear의 지연 correction timeout을
그 소유 함수에서 해제한다. 별도의 공통 lifecycle 프레임워크는 만들지 않는다.

## 7. 소유권과 구현 경계

| 계약·상태 | 정본과 변경 | 소비자·검증 |
| --- | --- | --- |
| Git 준비·투영 | `server/workflow-enrich.js`의 기존 API, `server/worker/runnable-cache.js`의 호출 | runnable-cache와 session-refs 테스트, workspace-snapshot-phase3 통합, workflow-enrich 회귀 |
| store 내용·알림 | `app/data/subscription-issue-store.js`, `types/subscription-issue-store.ts`의 설명 | registry·selector·상세·Board·Worker 테스트 |
| registry 알림 출처 | `app/data/subscription-issue-stores.js`와 selector API | 모든 runtime subscriber와 테스트 stub |
| 화면 가시성 | `app/main.js`의 라우트와 각 뷰 lifecycle | 숨김·복귀·workspace 변경·늦은 응답 회귀 |
| 설계 기록 | ADR 0002·0026을 대체하는 새 ADR | 기존 ADR의 상태·역참조, 생성 인덱스와 인용 검사 |
| 생성물 | `app/main.bundle.js`, `app/main.bundle.js.map` | 해당 구현 checkout에서 실제 build |

workflow 어휘와 자격 판정은 dotfiles 계약의 소비 범위로 유지한다. 이 성능 변경은
상위 계약 키를 추가하거나 의미를 바꾸지 않는다. 구독 API 설명의 활성 소비 문서는
수정하되 과거 스펙 전체를 현행 문서로 다시 쓰지 않는다.

## 8. 검증과 인수 기준

| 대상 | 반드시 확인할 결과 |
| --- | --- |
| 후보 10행/100행 기본 enrich | 후보 채우기 경로의 동기 Git 자식 프로세스 0회. 공유 HEAD 준비 횟수는 행 수와 함께 증가하지 않음 |
| 같은 workspace·세대 공유 | 목록/상세와 후보 준비가 동일 세대 컨텍스트를 재사용하고 추가 bd 요청을 만들지 않음 |
| 새 세대·다른 workspace | 가변 사실은 올바른 세대·workspace에서 다시 준비하며 이전 값을 섞지 않음 |
| 준비 중 Git 변경·Git 오류 | 캡처한 HEAD 기준 판정; 오류는 미판정이며 동기 fallback 없음 |
| 실패·중복 채우기 | 마지막 정상 후보 보존, 기존 구독자 0·in-flight·재시도 동작 보존 |
| 오래된 upsert·없는 delete | 1,000행에서 comparator 0회·알림 0회; 다음 더 낮은 revision은 무시 |
| 정상 변경·초기 snapshot | 필요한 알림과 표시 발생, 같은 id 객체 identity 및 정렬 보존 |
| 무관한 구독 push | Board/Worker/Detail에서 무관한 snapshot 읽기·렌더 0회; 자기 구독과 UI 정렬 변경에는 반응 |
| 숨김 중 자기 구독·queue·pipeline push | 데이터 처리는 유지하며 숨긴 화면의 비싼 재조합·DOM 렌더 0회 |
| 숨김에서 복귀 | 추가 push 없이 이미 받은 최신 상태 표시; 필터·접힘·같은 상세 편집 상태 유지 |
| lifecycle 종료 | 표시 타이머·지연 callback·listener 해제, 반복 복귀에서도 중복 부착 없음 |
| selector 정렬 | store 배열을 변형하지 않고 동일한 열 순서 반환 |

백엔드 핵심 회귀는 실제 임시 Git 저장소와 기본 준비/투영 함수를 사용하고 호출 수를
검사한다. 프런트 핵심 회귀는 실제 store→registry→selector→view 연결로 검사한다.
단순히 구현 함수 호출을 mock으로 되풀이 확인하는 테스트만으로 끝내지 않는다.
실시간 밀리초 상한은 flaky한 필수 테스트로 고정하지 않고 재현 전후 관찰값으로 기록한다.

최초 검사 전 해당 checkout의 Node와 `npm ls --depth=0`을 확인한다.
`npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`을 통과하고 전체
테스트는 120초 상한으로 실행한다. 구현 워크트리에서 `npm run prettier:write`를
실행하고 그 변경이 소유한 경로에만 생기는지 확인한다. `npm run build`로 bundle/map을 갱신하고
전체 변경 범위를 확인한다. 구현 착지 후 배포·실제 프로세스 경로·포트·HTTP 검증은
저장소의 기존 마감 절차를 따른다. 이 스펙 작성 자체는 구현이나 배포가 아니다.

## 9. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | user_request | 설치 패키지·도달성·문서 정합은 이 성능 동작 변경과 독립적으로 검증·인도할 수 있는 사용자 승인 묶음 | 없음 | UI-7732 |

- UI-f32r의 전역 bd 직렬화, 전체 queue 복사, 파일 polling, 중복 receipt GC는
  비용이 확인되지 않은 관찰로 남긴다. 이번 반복 작업 수정 후에도 특정 병목이
  실제로 남는 경우에만 그 비용과 소유자를 확인한다. 상시 계측 도입은 인수 조건이 아니다.
- 후보 show/ready와 실행 직전 재검사는 상태 변경 경쟁을 막으므로 성능 추정만으로
  제거하지 않는다. DB 직결·daemon·batch RPC·통신 프로토콜 변경도 포함하지 않는다.
- 별도 UI 디자인 변경, 카드 슬롯 변경, 순환 의존 전체 해체를 붙이지 않는다.
- UI-9pp3와 UI-f32r의 종료 사유는 UI-hhn9로의 사용자 승인 통합이다.
  원래 조사 기록을 보존하며 구현 완료로 기록하지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0002 — 구독별 store·전체 issue push·revision 순서와 객체 identity를 유지한다. 내용 불변 메시지의 통지만 새 ADR에서 대체한다.
- 전제: ADR 0008 — 공유 스냅샷의 bd CLI 읽기 경로를 유지한다.
- 전제: ADR 0012 — workflow 계약을 소비하며 새 어휘를 정의하지 않는다.
- 전제: ADR 0025 — 목록·상세의 공유 스냅샷 투영과 상세 전용 bd read 금지를 유지한다.
- 전제: ADR 0026 — 기존 비동기 준비·불변 키 캐시·세대 컨텍스트를 재사용하며 후보 캐시의 동기 예외만 대체한다.
- 전제: ADR 0014 — 공유 레인·카드 슬롯을 유지하며 표시 결과의 재설계를 하지 않는다.
- 후보 투영도 기존 비동기 준비 컨텍스트만 읽는다: 되돌리기 어려움 예(호출·오류·캐시 계약을 함께 되돌려야 함), 맥락 없이 의외 예(동기 API지만 동기 조회 금지), 실질 대안 있음(행별 동기 조회 유지); ADR 0026을 supersede한다; `summary`: "워크스페이스와 후보 투영은 기존 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스를 띄우지 않으며 title-cache 예외는 유지한다" → ADR
- store는 revision 수신과 내용 변경 통지를 구분하고 registry는 출처를 전달한다: 되돌리기 어려움 예(store·타입·모든 구독 소비자의 동시 변경), 맥락 없이 의외 예(수신한 revision이 진전해도 listener가 호출되지 않음), 실질 대안 있음(메시지마다 전체 통지); ADR 0002를 supersede한다; `summary`: "구독별 store는 revision을 수신하되 내용 변경만 통지하고 registry는 구독 출처를 전달하며 전체 issue push와 기존 순서·identity 규칙을 유지한다" → ADR
- 기존 hidden·load·pause 사용과 중복 배열 복사 제거: 되돌리기 어려움 아니오(라우트가 이미 설정하는 `hidden`과 기존 lifecycle 함수만 쓰는 뷰 내부 변경이라 해당 분기 제거로 되돌린다), 맥락 없이 의외 아니오(숨긴 화면을 그리지 않고 같은 배열을 두 번 복사하지 않는 것은 기존 lifecycle 의도의 연장이다), 실질 대안 있음(구독 해제 또는 추가 캐시) → ADR 아님
