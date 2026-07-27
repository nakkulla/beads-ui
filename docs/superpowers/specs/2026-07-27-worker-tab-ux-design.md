# 워커 탭 UX 개선 4종 설계 (UI-raqh)

- 날짜: 2026-07-27
- Bead: UI-raqh
- 라우트: spec_backed
- 접근: 스냅샷 일원화(A안) — 새 서버 상태(토큰 usage·폴러 활동·머지 진행)를 전부
  기존 `worker-queue-snapshot` fanout에 실어 보내고, 클라이언트는 스냅샷만 보고
  렌더링한다. 정렬은 순수 클라이언트 기능.

## 배경

- 워커가 claude CLI를 `stream-json`으로 실행하며 세션 로그(jsonl)에 원본
  이벤트를 저장하지만, 이벤트에 실린 `usage`/`total_cost_usd`는 어디에서도
  추출·집계·표시되지 않는다 (`server/worker/runner/claude.js` `normalize()`가
  usage를 버림).
- 후보 레인은 `cmpEffectiveRank`(`app/data/sort.js:263-274`) 고정 정렬이며 정렬
  옵션 UI가 없다.
- PR 대기 카드의 "관측 대기"는 merge-gate `unobserved` 배지
  (`server/worker/merge-gate.js:52`)로, 폴러가 실제 관측/로컬검증을 돌리는
  중에도 구분 없이 "대기"로 보인다.
- 머지는 WS 요청 하나로 서버에서 동기 실행되며 정리 단계 포함 수 분 걸릴 수
  있으나(`server/worker/pr-actions.js:213-216`) 클라이언트에 진행 표시가 없다.

## 확정된 결정 (브레인스토밍 Q&A)

| 결정 | 선택 |
| --- | --- |
| 토큰 표시 형태 | 카드에 합계(입력+출력) 축약 표기 + 호버 툴팁 상세 |
| 표시 범위 | 실행 중 타일(실시간) + PR 대기 + 완료 행 |
| 집계 기준 | 마지막 attempt만 (이슈별 누적 합산 안 함) |
| 정렬 옵션 | spec 우선(기본) / Board 순서 / 최신 생성순 |
| 상태 세분화 | '확인중'(gh 관측)과 '로컬검증 실행 중' 구분 |
| 머지 진행 | 단계명까지 표시, 스냅샷 경유(새로고침·다중 클라이언트 유지), 버튼 비활성화 |

## 1. 토큰 사용량 파이프라인

### 추출 (server/worker/runner/claude.js)

- `normalize()`가 `type:'assistant'` 이벤트의 `message.usage`, `type:'result'`
  이벤트의 `usage`·`total_cost_usd`를 정규화 이벤트에 `usage` 필드로 실어
  올린다. 필드가 없거나 형태가 다르면 생략(fail-quiet).

### 누적·저장 (세션 엔진 + server/worker/queue-store.js)

- 세션 엔진이 attempt별 누적 카운터를 메모리에 유지한다:
  - 실행 중: `message.id`별 최신 usage로 교체 저장한다(스트리밍 중 같은
    `message.id`의 assistant 이벤트가 동일 usage를 반복 전달하므로 — fixture
    `claude-tools.jsonl`에서 4회/2회 반복 확인 — 이벤트 단위 합산은 중복
    집계다). 표시값은 id별 usage의 `input_tokens + output_tokens` 합.
    스트리밍 중간 이벤트의 output 과소계상은 허용(후속 이벤트/result가 갱신).
  - `result` 도착 시: 해당 이벤트의 최종 usage로 교체(권위값).
- 세션 종료(성공/실패/일시정지/중단) 시 `Attempt`에 선택 필드로 영속화:
  `usage { input_tokens, output_tokens, cache_read_input_tokens,
  cache_creation_input_tokens, total_cost_usd }`.
- 집계는 마지막 attempt만: 재실행 시 새 attempt의 usage가 표시를 대체한다.
- 크래시 시 실행 중 카운터는 유실 허용(attempt 자체가 orphaned 처리됨).

### 전송 (server/ws/worker-handlers.js `decorateQueue()`)

- 스냅샷의 실행 중 attempt에는 라이브 카운터, 종료된 attempt에는 영속화된
  usage를 포함한다.
- 실행 중 usage 변화만으로는 약 3초 스로틀(trailing edge)로 fanout. 큐 변경
  fanout은 기존대로 즉시. 스로틀 타이머는 attempt 종료 시 정리.

### 표시 (app/views/worker/)

- 실행 중 타일(`running-grid.js`) 메타줄과 PR 대기·완료 행(`lanes.js`
  `miniRow`)에 `τ 12.3k` 형태 합계(입력+출력, 캐시 제외, k/M 축약).
- 호버 툴팁(title 속성): 입력/출력/캐시읽기/캐시생성/비용(USD).
- usage가 없는 행(과거 attempt 등)은 표시 생략(fail-quiet).
- PR 대기·완료 행은 `buildModel()`(`app/views/worker/index.js`)이 해당 bead의
  마지막 attempt usage를 찾아 행에 붙인다.

## 2. 후보 카드 정렬 옵션 (클라이언트 전용)

- 후보 페인 헤더(`후보 · Board 연동` 옆)에 정렬 `<select>` 추가:
  `spec 우선`(기본) / `Board 순서` / `최신 생성순`.
- 선택은 localStorage `bdui.worker.candidate_sort`에 저장, 새로고침에도 유지.
  저장값이 없거나 미지의 값이면 기본값(`spec 우선`)으로 폴백.
- 정렬 규칙:
  - `spec 우선`: `hasSpec`(`metadata.spec_id`) 기준 안정 분할 — spec 있는 그룹
    위, 없는 그룹 아래, 각 그룹 내부는 현행 `cmpEffectiveRank` 순서 유지.
  - `Board 순서`: 현행 그대로(`cmpEffectiveRank`).
  - `최신 생성순`: `app/data/sort.js`의 기존 `created_at` desc comparator 재사용.
- Ready+Blocked 병합 목록 전체에 동일 적용(현행 병합 방식 불변). 서버 변경 없음.

## 3. "확인중 / 로컬검증 실행 중" 상태

### 서버 (server/worker/pr-poller.js)

- bead별 활동을 독립 플래그 두 개로 기록한다: `{ checking, verifying }`.
  단일 enum은 장시간 로컬검증과 다음 관측 패스가 겹칠 때 `checking` 전이나
  그 `finally` 해제가 `verifying`을 덮어쓰는 경합이 있으므로 쓰지 않는다.
  - `observeBead` 시작 시 `checking=true`, 그 `finally`에서 `checking=false`.
  - `verify_cmd` 실행 시 `verifying=true`, 그 `finally`에서 `verifying=false`.
  - 각 플래그는 자기 작업의 `finally`만이 해제한다(상호 불간섭).
- 스냅샷 노출 시 단일 표시값으로 축약: `verifying` 우선
  (`verifying > checking > null`). `decorateQueue()` 경유, 전이 시 fanout.

### 표시 규칙 (app/views/worker/index.js `prWaitRow`)

활동 상태는 의미가 바뀌는 경우에만 배지를 대체한다(깜빡임 방지):

- 게이트 배지가 `관측 대기`(unobserved)이고 `checking` → `확인중` + 스피너.
- 배지가 `로컬검증 대기`(verify_pending)이고 `verifying` →
  `로컬검증 실행 중` + 스피너.
- CI ✓/✗ 등 그 외 상태에서는 폴러가 돌아도 표시 불변.

## 4. 머지 진행 표시

### 서버 (server/worker/pr-actions.js)

- bead별 `merge_progress { step, started_at }`를 기록. 단계:
  `merging`(재게이트+머지, BEHIND의 update-branch 재관측 포함) →
  `base_sync → post_merge_verify → deploy → child_sweep → branch_cleanup →
  parent_close`(기존 `CLEANUP_STEPS` 순서).
- 각 전이마다 fanout, 완료/실패 시 `finally`에서 해제.
- DIRTY(충돌) 경로: 머지 대신 충돌 해결 세션을 띄우므로 progress 해제 후 기존
  동작(실행 중 레인에 세션 등장).
- 기존 `in_flight` 중복 가드는 유지(서버 최종 방어선).

### 표시 (app/views/worker/)

- PR 대기 행에 `머지 중 · 배포` 형태의 현재 단계명 + 스피너.
  한국어 단계명: 머지 중 / base 동기화 / 머지 후 검증 / 배포 / 자식 정리 /
  브랜치 정리 / 부모 close.
- 진행 중엔 [머지]/[폐기] 버튼 비활성화.
- 클릭 직후 스냅샷 도착 전 공백은 클라이언트 로컬 pending으로 즉시 커버.
- 실패 시 progress 해제 + 기존 토스트/`정리 실패` 배너 동작 그대로.

## 계약 영향

없음. 새 상태는 전부 워커 내부(queue.json·메모리·스냅샷)이며 bd metadata 키나
라벨 어휘를 추가·변경하지 않는다. dotfiles workflow 계약 변경 불필요.

## 테스트 계획

기존 테스트 스타일(단위, active-verb 이름)로:

- `claude.js` `normalize()`: assistant/result 이벤트 usage 추출, 필드 결손 시
  생략.
- usage 중복 방지: 같은 `message.id` 반복 이벤트에서 중복 집계 없음
  (`claude-tools.jsonl` fixture 회귀 테스트).
- activity 겹침: 장시간 `verifying` 중 새 관측 패스의 `checking` 시작·종료가
  `verifying` 표시를 되돌리지 않음.
- queue-store: `Attempt.usage` 영속화·재로드.
- `decorateQueue()`: 라이브/영속 usage 및 `activity`·`merge_progress` 노출.
- `buildModel()`: 실행 중 타일·PR 대기·완료 행 usage 매핑(마지막 attempt).
- 정렬 3모드: spec 우선 분할 안정성, Board 순서 불변, 최신 생성순.
- 배지 대체 규칙: unobserved+checking, verify_pending+verifying, 그 외 불변.
- `merge_progress` 라이프사이클: 성공(단계 전이·해제), 실패(해제), DIRTY(해제).
- fanout 스로틀: usage-only 변경 3초 병합, 종료 시 타이머 정리.

## 검증 계획

- Pre-Handoff Validation: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` / `npm run build`(번들 포함).
- 머지 후: `bdui-shared restart` 및 프로세스 경로·포트·HTTP 응답 확인
  (Post-Merge Runtime Validation).

## 비범위 (Non-goals)

- 이슈별(전체 attempt) 토큰 누적 합산, 비용 중심 표시.
- 폐기(discard) 진행 표시(머지만 대상; 폐기는 기존 in_flight 거부 토스트 유지).
- 트랜스크립트 드로어 내 usage 렌더링.
- Board 탭 정렬 변경.
