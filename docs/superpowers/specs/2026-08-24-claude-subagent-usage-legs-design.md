---
scope:
  - server/worker/
  - server/ws/worker-handlers.js
  - app/utils/
  - app/views/detail-panel/
  - app/views/worker/
---

# Worker Claude→Claude 위임 서브에이전트 토큰·세션 분리 표시

- Bead: `UI-2mpn` (route `spec_backed`)
- 선행 스펙: `2026-08-10-provider-role-token-usage-design.md`(UI-raqh, `usage_legs`
  스키마·provider 합계 규칙), `2026-08-18-delegated-session-live-monitor-design.md`
  (UI-c00b, `delegation_sessions`·leg 행·`launch_id` transcript). 이 문서는 그 두
  구조를 **재사용**하며, UI-c00b 비목표 중 두 항목을 Claude `Agent` 도구에 한해
  대체한다(§2.5).
- 사용자 결정(2026-08-24): ① 기존 leg 구조 재사용, ② `role='subagent'` +
  `agent_type` 원문, ③ 토큰은 종료 영수증으로만 표시(라이브 하한값 없음), ④ 표시
  화면은 Codex 위임과 같은 두 곳(세션 이력 행, 모니터 타일 leg 칩)만, ⑤ 설계
  B 승인: 세션 이력 행 클릭으로 서브에이전트 transcript를 기존 drawer에서 열고,
  부모 transcript에서는 서브에이전트 줄을 `Agent` 호출 아래로 접어 구분한다
  (§6.3–6.4). ④의 "두 곳"은 서브에이전트 **행**이 놓이는 화면을 말하며, ⑤의
  transcript 표시는 새 화면이 아니라 기존 drawer 안의 표현이다.

## 1. 문제

Claude 세션이 `Agent` 도구로 서브에이전트를 띄우면 Worker는 부모 세션의
`tool_use` 한 줄만 보여 준다. 서브에이전트 세션·모델·상태는 어디에도 없고, 토큰은
부모 `result.usage`에 **포함되지 않아** Claude 합계에서 통째로 빠진다. 부모
transcript drawer에는 서브에이전트 줄이 부모 줄과 섞여 나오고, 서버
`last_activity`도 서브에이전트 활동을 부모 활동으로 보고한다. Codex 위임만
`codex-delegation-monitor-v1`/`codex-usage-receipt-v1`로 분리돼 있다.

## 2. 검증된 전제 (Worker 세션 로그 40개 실측, 2026-08-24)

1. `claude -p --output-format stream-json --verbose` 부모 스트림은 서브에이전트의
   `assistant`/`user`/`tool_progress` 이벤트를 `parent_tool_use_id`(= 부모
   `Agent` `tool_use.id`)를 붙여 그대로 흘린다. 서브에이전트 `assistant` 메시지는
   `message.id`·`message.model`·`message.usage`를 갖는다. 서브에이전트용
   `result`·`system/init` 이벤트는 없다.
2. `Agent` 종료는 부모 `user` 이벤트의 `tool_result{tool_use_id}` 블록으로 오고,
   같은 이벤트의 최상위 `tool_use_result`에 `agentId`, `agentType`,
   `resolvedModel`, `status`, `totalDurationMs`, `totalTokens`,
   `totalToolUseCount`, `usage{input_tokens, output_tokens,
   cache_read_input_tokens, cache_creation_input_tokens, …}`가 실린다(관측 62/62).
   `totalTokens`는 `usage` 4필드 합과 일치했다.
3. 부모 `result.usage`의 `input_tokens`·`cache_read_input_tokens`는 부모 자체
   메시지 합과 정확히 같다 — 서브에이전트 토큰을 **제외**한다. `result.modelUsage`
   와 `total_cost_usd`는 서브에이전트 모델을 포함한다.
4. 서브에이전트 스트림 메시지 `usage.output_tokens`는 스트리밍 시점 스냅샷이라
   실제의 1–2% 수준으로 과소계상된다(입력·캐시는 정확). 따라서 라이브 per-subagent
   토큰 하한을 표시하지 않는다(결정 ③).
5. `Agent` `tool_use.input` 키는 `description, model, prompt, run_in_background,
   subagent_type`이며 관측된 호출은 전부 `run_in_background:false`, 깊이 1
   (`subagent_stats.spawned_by_subagents=0`).
6. 이 저장소에는 `parent_tool_use_id`를 읽는 코드가 없고, 기존 fixture의 값은 모두
   `null`이다.

### 2.5 선례 대체

UI-c00b 비목표 "`parent_tool_use_id` … 휴리스틱하게 스캔하지 않는다"와 "`Explore`
row를 만들지 않는다"는 Codex 위임 producer 계약을 정하던 범위 경계였다. 이 스펙은
그 두 항목을 **Claude `Agent` 도구에 한해** 대체한다. `parent_tool_use_id`와
`tool_use_result`는 Claude Code stream-json의 구조화된 필드이지 텍스트 휴리스틱이
아니며, dotfiles가 소유하는 계약 표면(라벨·Bead metadata 키·receipt/monitor
스키마)은 건드리지 않는다. Codex 위임의 producer 계약·비목표는 그대로다.

## 3. 목표

- running/terminal Claude attempt 아래에 서브에이전트 행을 상태·`agent_type`·
  모델·short ID·경과·최근 활동과 함께 표시한다.
- 종료된 서브에이전트의 정확한 토큰을 `usage_legs` 영수증으로 남기고 Claude
  헤드라인 합계에 포함한다.
- 행 클릭으로 서브에이전트 transcript를 기존 drawer에서 snapshot + live로 연다.
- 부모 transcript에서 서브에이전트 줄을 `Agent` 호출 아래로 접고, 서버
  `last_activity`가 부모 줄만 보게 한다.
- 서버 재시작 후 세션 로그 재생만으로 같은 상태를 복원한다.

## 4. 비목표

- 새 durable 파일·환경변수·producer 계약·Bead metadata 키·라벨.
- 라이브 per-subagent 토큰(하한값) 표시, `result.modelUsage`/`subagent_stats` 사용.
- Worker 탭 실행 카드에 leg 칩 추가.
- 깊이 2 이상 서브에이전트 트리(평평하게 같은 그룹으로 처리).
- Codex 부모 세션(codex runner)의 자식 스레드.
- 기존 세션 이력 backfill(재생은 running attempt 복구 경로에만 적용).

## 5. 서버 설계

### 5.1 `liftDelegation(raw)` — `server/worker/runner/claude.js`

`liftUsage`와 나란히 두는 **무상태** 순수 함수: 현재 줄 하나에서 읽을 수 있는
사실만 돌려주고, 과거 줄에 의존하는 판단은 하지 않는다. 라이브 경로
(`scheduler`의 runner 이벤트 구독)와 복구 경로(`session-monitor.handleLine`,
`usage-replay`)가 **같은 함수**를 호출한다. 반환은 다음 셋 중 하나 또는 `null`.

| 신호 | 원천 | 반환 |
| --- | --- | --- |
| 시작 | `parent_tool_use_id` 없는 `assistant` 메시지의 `tool_use{name:'Agent'}` | `{ kind:'start', launch_id: tool_use.id, agent_type: input.subagent_type ?? null, model_alias: input.model ?? null, at }` |
| 진행 | `parent_tool_use_id`가 있는 `assistant`/`user`/`tool_progress` | `{ kind:'progress', launch_id: parent_tool_use_id, model: assistant.message.model ?? null, at }` |
| 종료 | `parent_tool_use_id` 없는 `user`의 `tool_result{tool_use_id}` 블록과 같은 줄의 최상위 `tool_use_result` | `{ kind:'end', launch_id: tool_use_id, is_error, result_status: tool_use_result.status ?? null, agent_id: tool_use_result.agentId ?? null, agent_type: tool_use_result.agentType ?? null, model: tool_use_result.resolvedModel ?? null, usage: 4필드 정수일 때 {4필드} 아니면 null, total_tokens, at }` |

- `at`은 이벤트 최상위 `timestamp`(ISO)가 있으면 그 epoch ms, 없으면 `null`.
  수신 시각은 쓰지 않는다 — 라이브와 재생이 같은 줄에서 같은 값을 내야 한다.
- `Agent`가 아닌 `tool_result`(시작을 본 적 없는 id 포함)는 파서가 구분하지
  못하므로 `end` 후보로 그대로 반환하고, 채택 여부는 §5.2가 정한다.

### 5.2 in-memory 세션 저장소 — `server/worker/delegation-store.js`

`usage-store.js`와 같은 형태: `(workspace, attempt_id) → { sessions:
Map<launch_id, DelegationSession>, legs: UsageLeg[] }`. **누적 상태 결합과 영수증
생성은 전부 여기가 소유한다.** `apply(workspace, attempt_id, lifted)`:

- `start`: 세션 생성 `{ launch_id, provider:'claude', role:'subagent', agent_type,
  model: model_alias, effort: null, session_id: launch_id, turn_id: launch_id,
  status:'running', started_at: at, completed_at: null, last_event_at: at }`.
  `at`이 `null`이면 `started_at`·`last_event_at`도 `null`.
- `progress`: 세션이 없으면(재생 경계 이전 시작) 위와 같은 꼴로 `agent_type:null,
  model:null`인 running 세션을 지연 생성한다. `model`이 오면 확정하고
  `last_event_at`은 `at`이 `null`이 아닐 때만 갱신한다.
- `end`: 해당 `launch_id` 세션이 없으면 무시(`Agent`가 아닌 tool_result). 있으면
  `status`는 `is_error===true` 또는 `result_status`가 `null`이 아니면서
  `'completed'`가 아닐 때 `failed`, 그 외 `done`; `completed_at`·`last_event_at`은
  `at`; `agent_type`·`model`은 `end` 값이 있으면 그것으로 확정. `usage`가 있으면
  leg를 추가한다: `{ receipt_id: launch_id, provider:'claude', role:'subagent',
  agent_type, agent_id, model, session_id: launch_id, turn_id: launch_id, effort:
  null, usage:{4필드, reasoning_output_tokens:0}, completed_at: at }`. `usage`가
  없으면 leg 없이 세션만 닫는다. `total_tokens`가 4필드 합과 다르면 값은 그대로
  쓰고 redacted 경고 로그만 남긴다.
- `session_id`는 시작부터 종료까지 `launch_id`로 고정한다 — running 중에는
  `agentId`가 없고, `attemptLegs`의 세션↔영수증 매칭 키가 `session_id+turn_id`이기
  때문이다. `agentId`는 leg의 선택 필드 `agent_id`로만 보존한다.

`get(workspace, attempt_id)`는 `{ sessions, legs }`; `clear`는 `usage-store`와 동일.
재생 여부 표식은 두지 않는다(세션·leg 값이 라이브와 동일하므로 partial 개념이
없다). prompt·result 본문·cwd는 저장하지 않는다.

### 5.3 스키마 확장 — `server/worker/queue-store.js`

새 durable 필드는 없다. 기존 타입을 다음처럼 넓힌다.

```js
// UsageLeg
provider: 'codex' | 'claude'
role: 'implementation' | 'review-consult' | 'subagent'
agent_type?: string|null       // provider==='claude'일 때만
agent_id?: string|null         // provider==='claude'일 때만 (tool_use_result.agentId)
// DelegationSession: provider/role/agent_type 같은 확장.
//   provider==='claude'이면 started_at·last_event_at·completed_at은 number|null
//   (timestamp 없는 줄에서 시작한 세션), session_id/turn_id는 launch_id와 같다.
```

검증 규칙: `provider:'claude'`는 `role:'subagent'`만, `provider:'codex'`는 기존 두
role만 허용하고 `agent_type`·`agent_id`는 claude 항목에서만 선택 필드다. Codex
세션의 시간 필드 필수 규칙은 그대로다. 그 외 조합은 기존과 같이 normalize 단계에서
버린다. UI의 경과·최근 활동 표시는 `null` 시간을 빈 셀로 둔다. `isUsageLeg`/`normalizeUsageLegs`/
`normalizeDelegationSessions`/`finalizeDelegationSessions`가 이 규칙을 공유하며,
`receipt_id`/`launch_id` 중복 제거·"첫 기록 우선"·터미널 시 `running→interrupted`
규칙은 그대로 적용된다.

### 5.4 라이브 투영·터미널 정산

- `server/ws/worker-handlers.js attemptsWithUsage()`: running attempt의
  `delegation_sessions`에 `delegation-store`의 세션을, `usage_legs`에 그 legs를
  기존 Codex 스캔 결과와 함께 `normalize*`로 합친다. 순서는 기존과 같이 durable이
  뒤(첫 기록 우선).
- `scheduler`: runner `event`마다 `liftDelegation`→`delegation_store.apply`, 변화가
  있으면 기존 `scheduleUsageFanout(workspace)`(3초 coalesce)를 그대로 쓴다.
- 터미널(`terminalReceiptPatch`): `delegation-store.get()`의 세션·legs를 Codex
  스캔 결과와 같은 자리에 합쳐 durable patch에 넣고 저장소 항목을 비운다. 실패 시
  기존 규칙대로 정산은 계속된다.
- 복구(`attach.recoverRunningAttempts`): `usage-replay.replayUsage`가 각 줄에
  `liftDelegation`도 적용해 `delegation-store`를 채우고, 경계 이후는
  `session-monitor.handleLine`이 같은 함수를 호출한다. `usage-replay`는 runner가
  `claude`일 때만 이 함수를 받는다(codex adapter는 `liftDelegation` 미정의 →
  건너뜀).

### 5.5 집계 규칙 — `app/utils/token-usage.js`

- `Attempt.usage`(부모 `result.usage` authoritative)는 불변.
- `sumAttemptUsage`·`projectAttemptUsage`·`providerUsageBadges`의
  `candidate.provider !== 'codex'` 필터를 provider별 분기로 일반화: claude leg는
  Claude 헤드라인(입력+출력+캐시읽기+캐시생성)에, codex leg는 Codex 헤드라인에
  합산. `UsageRole`에 `'subagent'` 추가, `sumAttemptUsage().roles`에 `subagent`
  항목 추가. Codex 합계·breakdown은 변하지 않는다.

## 6. UI 설계

### 6.1 세션 이력 행 — `app/views/detail-panel/session-history.js`

기존 중첩 leg 행 렌더러가 `provider:'claude'` 항목을 받는다. 라벨
`Claude · <agent_type> · <model short>`; `agent_type` 결손이면 그 조각 생략.
상태 아이콘(running/done/failed/interrupted)·short ID(leg `agent_id`가 있으면 그 앞
8자, 없으면 `launch_id` 뒤 8자)·
경과·최근 활동은 Codex 행과 같은 열. 토큰은 `usage_legs`에 영수증이 있을 때만
subtotal+breakdown(Claude 공식)을 표시하고, 없으면 셀을 비운다(`0` 금지). 이슈
헤딩의 Claude 합계에 leg가 더해진다. 행 클릭은 기존 `onOpenDelegation(attempt_id,
launch_id)`를 그대로 쓰며 drawer meta는 `{ runner:'claude', role:'subagent',
agent_type, model, session_id, status }`.

### 6.2 모니터 타일 leg 칩 — `attemptLegs`/`legLabelOf`, `running-grid.js`

`legLabelOf(role, runtime, ordinal, agent_type)`에 `role==='subagent'` 분기:
`<agent_type ?? 'subagent'> · claude`. 실행 중 `⟳`, 종료 `✓ N` 접힘은 기존 그대로.
Worker 탭 실행 카드는 변경 없음.

### 6.3 서브에이전트 transcript — `session-log.js readDelegation`, `worker-handlers`

`readDelegation(workspace, attempt_id, launch_id)`가 delegation monitor dir에서
`launch_id`를 찾지 못하면 **부모 세션 로그를 읽어 `parent_tool_use_id ===
launch_id`인 줄과 종료 `tool_result` 줄만** 스냅샷으로 돌려준다(`offset`은 부모
로그의 줄 경계). `session-monitor.handleLine`은 `parent_tool_use_id`가 있는
이벤트를 `sessionLog.publish(workspace, attempt_id, obj, parent_tool_use_id)`로 한 번
더 발행해 `launch_id` 구독자가 live append를 받는다(기존 `launch_id` 구독 필터
그대로). 클라이언트 `subscribe-session-log` 페이로드·drawer 코드는 변경 없이 meta
표시만 확장한다.

### 6.4 부모 transcript 접기 — `app/utils/transcript-lines.js`, `transcript-drawer.js`

- `DisplayLine`에 `parent_tool_use_id?: string` 추가. 파서는 서브에이전트 줄을
  버리지 않고 이 값을 붙인다. `Agent` tool 줄은 `tool:'Agent'`에 `input.subagent_type`·
  `input.description`을 요약으로 갖는다.
- drawer `segmentsOf()`에 새 세그먼트 종류 `subagent`: `Agent` 줄이 헤더가 되고,
  같은 `parent_tool_use_id` 줄들이 그 아래 들여쓰기로 묶인다. 헤더 표기
  `🤖 <subagent_type> · <n>줄 · ⟳|✓|✗`; 기본 접힘, 클릭으로 펼침(`unfolded` Set
  재사용). 기존 `FOLD_AT` 같은-도구 접기는 그룹 내부에서만 독립 동작한다. 헤더를 못
  본 `parent_tool_use_id`(스냅샷 경계)는 익명 헤더 `🤖 subagent`로 묶는다.
- 서버 `createTranscriptReducer`(`last_activity`·`last_event_at`)는
  `parent_tool_use_id`가 있는 이벤트를 건너뛴다.

## 7. 오류·호환 처리

- `tool_use_result` 결손/형식 불일치: 세션은 종료 처리, leg 없음, 경고 로그(값 미포함).
- 시작 없는 종료(`tool_result`의 id를 모름): 무시.
- 부모 종료 시 `running` 세션: 기존 `finalizeDelegationSessions`로 `interrupted`.
- 구형 durable 기록(`agent_type` 없음, `provider:'codex'`만): 그대로 렌더.
- `parent_tool_use_id`가 `null`인 기존 fixture·스트림: 동작 불변.
- 재시작 재생: 세션 로그가 유일한 SoT이고 시간 값은 줄의 `timestamp`에서만 오므로
  라이브와 재생 결과가 바이트 단위로 같다. 별도 partial 표기는 없다.

## 8. Test scope

- Seam A — `runner/claude.js liftDelegation`(파싱만): 새 fixture
  `server/worker/__fixtures__/claude-subagent.jsonl`(Agent tool_use →
  `parent_tool_use_id` 자식 assistant/user/tool_progress → tool_result +
  tool_use_result). 케이스: 시작 줄, 진행 줄(model 포함/미포함), 종료 줄(usage
  있음·없음·`is_error`), `timestamp` 없는 줄 → `at:null`, 기존 fixture(`null`
  parent)에서 전부 `null`.
- Seam A′ — `delegation-store.apply`(상태·영수증): 시작→진행→종료 순서로 세션
  상태 전이와 leg 생성, 시작 없는 진행의 지연 생성, 세션 없는 `end` 무시,
  `result_status`/`is_error`별 status, `total_tokens` 불일치 경고, `at:null` 시간
  규칙.
- Seam B — `usage-replay`/`session-monitor`: 같은 fixture 재생 결과가 라이브 경로와
  **동일한 바이트**의 `delegation_sessions`/`usage_legs`; codex runner에서는 no-op;
  부모 종료 시 `running→interrupted`.
- Seam C — `queue-store` normalize: claude leg/session 수용, `agent_type` 없는 codex
  항목 불변, `provider:'claude'+role:'implementation'` 등 잘못된 조합 거부, 중복
  `receipt_id` 첫 기록 우선.
- Seam D — `token-usage.js`: claude leg가 Claude 합계에 합산되고 Codex 합계 불변;
  `roles.subagent` 집계; 영수증 없는 세션은 `0` 행을 만들지 않음.
- Seam E — `transcript-lines.js`/drawer/`readDelegation`: 그룹 접기·펼치기·익명
  헤더, `last_activity`가 서브에이전트 줄 무시, monitor dir 부재 시 부모 로그 필터
  폴백, `launch_id` live append 재발행.
- 회귀: 기존 Codex fixture 5종·`claude-success`/`claude-tools` 테스트 전부 통과.

## 9. 검증

**머지 전(PR 전 필수, 구현 세션 소유)**

- `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`.
- 구현 워크트리에서 `BDUI_FRONTEND_MODE=live bdui start --host 127.0.0.1 --port
  3001`로 ad-hoc 서버를 띄우고, 실제 Claude attempt(서브에이전트 1개 이상 호출)를
  Worker로 실행해: 세션 이력에 서브에이전트 행이 running→done으로 바뀌고 토큰이
  종료 후 채워지는지, 모니터 타일 `⟳` 칩, 행 클릭 transcript, 부모 transcript
  접힘을 스크린샷으로 확인하고 PR 본문에 첨부한다.
- 같은 ad-hoc 서버를 재시작해 행·토큰이 유지되는지 확인한다.

**머지 후(선언된 `[deploy]`가 수송)**

- `repo-ops/config.toml [deploy]`(`repo-ops/script/deploy`)가 공유 서비스 빌드·
  재시작·소스 SHA·HTTP 응답 확인을 수행한다. 이 스펙은 그 밖의 머지 후 수동 작업을
  요구하지 않는다.

## 10. 구현 unit 후보

- `server`: `server/worker/runner/claude.js`, `server/worker/delegation-store.js`,
  `server/worker/usage-replay.js`, `server/worker/session-monitor.js`,
  `server/worker/session-log.js`, `server/worker/queue-store.js`,
  `server/worker/scheduler.js`, `server/ws/worker-handlers.js`
- `ui`: `app/utils/token-usage.js`, `app/utils/transcript-lines.js`,
  `app/views/detail-panel/session-history.js`,
  `app/views/worker/running-grid.js`, `app/views/worker/transcript-drawer.js`
