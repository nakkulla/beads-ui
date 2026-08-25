---
scope:
  - server/worker/runner/claude.js
  - server/worker/delegation-store.js
  - server/worker/usage-receipts.js
  - server/worker/queue-store.js
  - app/utils/token-usage.js
  - app/views/detail-panel/session-history.js
---

# 백그라운드 Claude 서브에이전트 위임 세션의 종료 판정과 토큰 집계

- Bead: `UI-1663` (route `spec_backed`)
- 선행 스펙: `2026-08-24-claude-subagent-usage-legs-design.md`(UI-2mpn — `liftDelegation`
  무상태 계약, `delegation-store` 소유 상태, `usage_legs` 영수증, 세션 이력 행). 이
  문서는 그 구조를 **재사용**하며, UI-2mpn 전제 5(관측된 `Agent` 호출이 전부
  `run_in_background:false`)가 깨진 자리만 확장한다.
- 사용자 결정(2026-08-25): ① 백그라운드 leg의 토큰은 `task_notification.usage.total_tokens`를
  leg 총량으로 채택하고 Claude 합계에 표식 없이 포함한다(4필드 분해가 없다는 사실은
  그 leg 배지의 hover tooltip에서만 밝힌다 — §6.1), ② 이미 잘못 저장된 과거 attempt는
  소급 정정하지 않는다, ③ 종료 신호 채택은 **정확도 우선 업그레이드** 규칙을 쓴다.

## 1. 문제

`Agent` 도구를 `run_in_background: true`로 띄운 Claude 서브에이전트는 세션 이력에서
항상 실패(`✗`)로 표시되고, 완료 시각·토큰·`agent_id`가 모두 비어 나온다. 실제로는
정상 완료한 leg다.

원인 사슬은 네 단계다.

1. `liftDelegation`은 백그라운드 런치의 **즉시** `tool_result`
   (`tool_use_result.status = "async_launched"`)를 `kind:'end'`로 올린다. 한 줄만
   보는 파서는 그것이 종료 영수증인지 런치 확인인지 구분하지 않는다.
2. `delegation-store.closeSession`은 `result_status !== 'completed'`를 실패로
   판정하므로 세션이 곧바로 `failed`로 닫힌다.
3. 진짜 종료 신호인 `system/task_notification`은 `liftDelegation`이
   `assistant`/`user`/`parent_tool_use_id` 줄만 읽으므로 파싱조차 되지 않는다.
   닫힌 세션은 이후 `progress` 신호로 되살아나지 않으므로(`status !== 'running'`이면
   무시) 정정 기회가 없다.
4. `async_launched` 영수증에는 usage가 없어 `closeSession`이 leg receipt를 push하지
   않는다. 그래서 시간·토큰 칸이 비고, `session-history.js shortIdOf`가 `agent_id`
   대신 launch id 꼬리로 떨어진다. `liftUsage`는 `parent_tool_use_id` 줄을 이중계산
   방지로 제외하므로, leg receipt마저 없으면 이 서브에이전트 토큰은 attempt Claude
   합계 **어디에도** 잡히지 않는다.

## 2. 검증된 전제 (Worker 세션 로그 60~80개 실측, 2026-08-25)

측정 대상은 `~/.local/state/bdui/beads-ui-680a04fbdcbc/sessions/*.jsonl`이다.

1. `system/task_notification`은 백그라운드 여부와 무관하게 **모든** `local_agent`
   종료에 온다(관측 137/137). 키는 `task_id`, `tool_use_id`, `status`,
   `output_file`, `summary`, `usage`, `uuid`, `session_id`이며 최상위 `timestamp`가
   **없다**. `usage`는 `{ total_tokens, tool_uses, duration_ms }`로, 4필드 분해가
   아니다.
2. `local_agent`의 `task_notification.status`는 관측 137건 전부 `completed`였다.
   비정상 종료(`failed`, `stopped`)는 전부 `local_bash` 작업에서만 관측됐으므로,
   그 어휘는 필드에 존재하지만 서브에이전트에서는 아직 관측되지 않았다.
3. 동기 leg의 `tool_use_result.totalTokens`는 `usage` 4필드 합과 90/90 일치했다
   (UI-2mpn 전제 2 재확인). 같은 launch의 `task_notification.total_tokens`는 그보다
   **0.7~1.5% 작다**(예: 234,750 → 232,970 / 278,567 → 275,390). 두 값은 같은 것을
   재는 같은 스케일이며, 차이는 스트리밍 스냅샷 집계의 과소계상이다(UI-2mpn 전제 4와
   같은 성질).
4. `tool_use_result.usage`의 4필드는 세션 누적이 아니라 **마지막 API 호출의 스냅샷**
   이다(`iterations` 길이 1, `cache_read_input_tokens`가 그 시점 컨텍스트 크기).
   부모 스트림의 서브에이전트 `assistant` 메시지를 합산해 4필드를 재구성하면
   16.6M이 나와 스케일이 완전히 달라진다. 서브에이전트 전사 파일
   (`subagents/agent-*.jsonl`)에도 `result` 이벤트가 없다(관측: `assistant` 217,
   `user` 132, `attachment` 2). **정확한 4필드 재구성 경로는 존재하지 않는다.**
5. 동기 leg에서 `task_notification`은 `tool_result`보다 **항상 먼저** 온다
   (관측 126/126). 백그라운드 leg에서는 `async_launched` `tool_result`가 먼저 오거나
   (관측 2건) 아예 오지 않는다(관측 4건).
6. `system/task_updated`는 `patch.status`(`completed`/`failed`/`killed`)와
   `patch.end_time`(epoch ms)을 싣지만 `tool_use_id`가 **없다**. `task_id`만으로는
   무상태 파서가 launch id를 알 수 없다.
7. `task_id`는 곧 `tool_use_result.agentId`다(관측 91/91 일치). 따라서
   `task_notification`은 `tool_use_id`(= launch id)와 `agent_id`를 한 줄에서 모두
   제공한다.
8. `task_updated.end_time`(1787626311813)과 같은 launch의 마지막 `progress` 줄
   `timestamp`(`2026-08-25T02:51:51.767Z`)의 차이는 **46ms**였다.
9. durable 오염 범위는 작다. `queue.json`의 172개 attempt 중 Claude leg 상태는
   `done` 17, `interrupted` 2, `failed` 2로, 잘못 저장된 것은 4 leg뿐이다.

## 3. 목표

- 백그라운드 서브에이전트가 정상 완료하면 세션 이력에서 `✓`로 표시된다.
- 그 leg의 토큰이 `usage_legs` 영수증으로 남아 Claude 헤드라인 합계에 포함된다.
- 완료 시각과 `agent_id`가 채워져 동기 leg와 같은 행 모양을 갖는다.
- 라이브 경로와 세션 로그 재생 경로가 같은 줄에서 같은 값을 낸다.
- 동기 leg의 정확도(4필드 영수증)는 어떤 순서에서도 열화되지 않는다.

## 4. 비목표

- 이미 잘못 저장된 과거 4 leg의 소급 정정(결정 ②). UI-2mpn 비목표 "기존 세션 이력
  backfill 없음"을 그대로 유지한다.
- `system/task_updated` 파싱.
- 동기 leg의 producer 계약·영수증 형태 변경.
- 깊이 2 이상 서브에이전트 트리.
- 새 durable 파일·환경변수·Bead metadata 키·라벨.
- `tool_uses`·`duration_ms` 표시(집계에 쓰지 않는다).

## 5. 서버 설계

### 5.1 `liftDelegation(raw)` — `server/worker/runner/claude.js`

UI-2mpn §5.1의 **무상태** 계약을 유지한다. 한 줄에서 읽을 수 있는 사실만 돌려주고,
launch id 매핑이나 이전 상태 의존 판단은 하지 않는다. `task_notification`이
`tool_use_id`를 직접 싣기 때문에 task_id → launch_id 매핑 테이블 없이 무상태가
성립한다(전제 1). `task_updated`는 그 매핑을 줄 수 없으므로 읽지 않는다(전제 6).

`DelegationSignal`에 신호 하나를 추가하고 `end`에 필드 하나를 더한다.

| 신호 | 원천 | 반환 |
| --- | --- | --- |
| 런치 확인 (신규) | `parent_tool_use_id` 없는 `user`의 `tool_result`이고 같은 줄 `tool_use_result.isAsync === true` 또는 `status === 'async_launched'` | `{ kind:'launch_ack', launch_id, at }` |
| 종료 (기존) | 위 조건에 해당하지 않는 `tool_result` + `tool_use_result` | 기존 `end` + `source:'tool_result'` |
| 종료 (신규) | `type==='system' && subtype==='task_notification'`이고 `tool_use_id`가 비어 있지 않음 | `{ kind:'end', source:'notification', launch_id: tool_use_id, is_error:false, result_status: status, agent_id: task_id, agent_type:null, model:null, usage:null, total_tokens: usage.total_tokens (정수 ≥0일 때, 아니면 null), at:null }` |

- `launch_ack`는 종료가 아니다. 상태를 바꾸지 않는다. 이 신호의 유일한 목적은
  `async_launched` `tool_result`가 `end`로 오해되지 않게 하는 것이므로 식별자와
  시각만 싣는다. `agent_type`은 `start`가, `model`은 `start`/`progress`가 이미
  확정하고, `agent_id`는 종료 시 `notification`이 싣는다(전제 7) — `launch_ack`가
  스트림에 실리지 않는 백그라운드 leg도 같은 경로로 `agent_id`를 얻는다.
- `task_notification` 줄에는 `timestamp`가 없으므로 `at`은 항상 `null`이다(전제 1).
  수신 시각을 대신 쓰지 않는다 — 라이브와 재생이 같은 값을 내야 한다.
- `notification`의 `result_status`는 그대로 싣는다. `local_agent`에서 `completed`
  외의 값은 아직 관측되지 않았지만(전제 2), 필드가 그 어휘를 가지므로 §5.2의 실패
  판정이 그대로 적용된다.
- `tool_use_id`가 없는 `task_notification`(`local_bash` 등)은 `null`을 돌려준다.
  §5.2가 시작을 본 적 없는 launch id를 버리므로, `tool_use_id`가 있는
  `local_bash` 알림도 채택되지 않는다.

### 5.2 채택 규칙 — `server/worker/delegation-store.js`

상태는 전부 store가 소유한다(UI-2mpn §5.2).

**`launch_ack`**: `last_event_at`만 갱신한다. `status`는 `running`으로 유지하고
세션 레코드에 새 필드를 쓰지 않는다. 시작을 본 적 없는 launch id면 버린다.

**`end` — 정확도 우선 업그레이드(결정 ③)**: 어떤 종료 영수증으로 닫혔는지를
`closed_by: 'tool_result' | 'notification'`로 기억한다.

이 값은 **세션 레코드 밖**, store가 attempt별로 들고 있는 별도 in-memory 맵
(`launch_id → closed_by`)에 둔다. 세션 객체에 필드로 얹으면 안 된다:
`delegation-monitor.js`의 `isClaudeSession`은 `hasExactKeys(value, CLAUDE_SESSION_KEYS)`
로 키 집합을 **정확히** 검사하고, 그 집합에는 `closed_by`도 `agent_id`도 없다. 알려지지
않은 키가 하나라도 붙으면 `normalizeDelegationSessions`가 그 행을 통째로 버려서, 고치려던
행이 화면에서 사라진다. 같은 이유로 `agent_id`는 세션이 아니라 leg receipt에만 싣는다
(`isUsageLeg`는 Claude leg의 `agent_id`를 허용한다).

따라서 `queue-store`의 `DelegationSession` 스키마와 `isDelegationSession`의 키 검증은
바뀌지 않는다. 재생 경로는 같은 줄을 같은 순서로 다시 먹이므로 `closed_by` 맵도 그대로
복원된다.

- `source:'tool_result'`: 항상 채택한다. 세션이 `notification`으로 이미 닫혀 있어도
  상태·시각·영수증을 4필드 값으로 교체하고 `closed_by='tool_result'`로 확정한다.
  같은 `receipt_id`의 기존 leg는 제자리에서 대체하며 새 leg를 추가하지 않는다.
- `source:'notification'`: `closed_by !== 'tool_result'`일 때만 채택한다. 이미 4필드로
  닫힌 세션은 건드리지 않는다.

전제 5대로 동기 leg는 `notification`으로 먼저 닫혔다가 곧 `tool_result`로 업그레이드
된다. 라이브 표시에 total-only 중간 상태가 잠시 보이는 것이 이 규칙의 대가이며,
최종 상태는 현행과 동일하다. 백그라운드 leg는 `async_launched`가 오든(전제 5의 2건)
오지 않든(4건) 같은 규칙으로 `notification`에서 닫힌다.

**실패 판정**: 기존 규칙을 유지한다 — `is_error === true`이거나
`result_status`가 `null`이 아니면서 `'completed'`가 아니면 `failed`, 그 외에는 `done`.
`async_launched`는 §5.1에서 이미 `end`가 아니므로 이 판정에 도달하지 않는다.

**`completed_at`**: `lifted.at ?? session.last_event_at`. `notification`은 `at`이
`null`이므로 마지막 관측 활동 시각으로 떨어지며, 전제 8에서 그 오차는 46ms였다.
`last_event_at`도 줄에서 읽은 값이므로 라이브·재생 동일성은 유지된다. 둘 다 없으면
`null`로 남기고, 그 경우 세션 이력의 시간 칸은 비운다.

**leg receipt**: `lifted.usage`(4필드)가 있으면 기존 형태 그대로 push한다. 없고
`total_tokens`가 정수 ≥0이면 `usage: { total_tokens }` 형태로 push한다. 둘 다 없으면
기존대로 영수증 없이 세션만 닫고 `subagent receipt missing for launch %s`를 남긴다.

`total_tokens`가 4필드 합과 일치하는지 확인하는 기존 경고는 `usage`가 있을 때만
적용한다. total-only 영수증에는 비교 대상이 없다.

### 5.3 영수증 스키마 — `server/worker/usage-receipts.js`

`isUsageLeg`는 지금 `hasExactKeys(value.usage, USAGE_KEYS)`로 usage가 정확히 5키
(4필드 + `reasoning_output_tokens`)여야 한다고 요구하므로, total-only leg는 durable
저장에서 탈락한다. 이 파일의 파일 인테이크 경로는 Codex 전용이지만 `isUsageLeg`와
`normalizeUsageLegs`는 Claude leg도 지나가는 공용 함수다.

- `provider === 'claude' && role === 'subagent'`인 leg에 한해 `usage`가 5키
  `USAGE_KEYS` **또는** 단일 키 `{ total_tokens }` 중 하나면 유효하다. Codex leg는
  5키만 그대로 유지한다.
- `normalizeUsageLegs`는 입력 형태를 보존한다. total-only leg를 5키로 채우지 않으며
  (없는 값을 0으로 만들지 않는다), 5키 leg에 `total_tokens`를 덧붙이지도 않는다.
- `queue-store.js`의 `UsageLeg` 타입 정의에 total-only usage 형태를 union으로 추가한다.

`delegation-monitor.js`의 `isClaudeSession`은 세션 스키마만 검증하고 usage를 보지
않으므로 변경하지 않는다.

## 6. 집계·표시 설계

### 6.1 `app/utils/token-usage.js`

- **subtotal**: `SUM_FIELDS` 합이 total-only 레코드에서 0이 되므로 분기한다.
  usage에 `total_tokens`가 있으면 그 값이 subtotal이고, 없으면 기존대로
  `SUM_FIELDS` 합이다. 두 값이 동시에 존재하는 레코드는 §5.3이 만들지 않는다.
- **provider 합계**: total-only leg의 subtotal을 Claude provider 합계와 `subagent`
  역할 합계에 표식 없이 더한다(결정 ①). 배지 문구는 바뀌지 않는다.
- **tooltip**: `providerUsageTooltip`은 지금 `numeric(usage.input_tokens)` 식으로
  없는 필드를 0으로 찍고 `Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성`이라는
  공식 줄을 붙인다. total-only 레코드가 그대로 지나가면 `총 219,570`과
  `입력 0 · 출력 0 · 캐시읽기 0 · 캐시생성 0`이 한 tooltip에 함께 떠서 스스로 모순된다.
  total-only 레코드일 때는 4필드 나열과 공식 줄 대신 `분해 없음 — 총량만 보고됨`
  한 줄을 쓴다. 4필드 레코드의 tooltip은 바뀌지 않는다.

### 6.2 `app/views/detail-panel/session-history.js`

이 파일은 **수정하지 않는다**. total-only leg가 화면에 닿는 자리는 leg 행의 τ 배지
하나이고, 그 배지의 라벨과 tooltip은 `staticLegTemplate`/leg 행이 `token-usage.js`의
`providerUsageBadges`에 위임해 만든다. 따라서 §6.1의 subtotal 분기와 tooltip 분기만으로
표시가 정정된다.

`[τ 자세히]`(`usageDetail(a.usage, …)`)는 부모 attempt 자신의 usage만 렌더하며 leg를
포함한 적이 없다. total-only leg는 그 화면에 흘러들지 않으므로 손대지 않는다.

행 자체(상태 글리프, short id, 시각, 토큰 칼럼)의 마크업도 그대로다. §5.1이
`notification`에서 `agent_id`를 싣고 §5.2가 leg receipt를 남기는 것만으로
`shortIdOf`가 `agent_id`로 정상화되고 시각·토큰 칸이 채워진다.

## 7. 오류·호환 처리

- `task_notification`의 `usage`가 없거나 `total_tokens`가 정수 ≥0이 아니면
  `total_tokens: null`로 올린다. 세션은 그 신호로 닫히되 영수증은 남지 않는다.
- 시작을 본 적 없는 launch id의 `notification`·`launch_ack`는 버린다(UI-2mpn §5.2의
  기존 규칙).
- 기존 durable 데이터는 그대로 읽힌다. total-only usage는 새로 쓰는 leg에만 나타나며,
  5키 leg의 검증·정규화·집계는 바뀌지 않는다.
- 과거 attempt의 `failed`/`interrupted` leg는 정정하지 않는다(결정 ②).

## 8. Test scope

- `server/worker/runner/claude.test.js`
  - `async_launched` `tool_result`에서 `kind:'launch_ack'`를 돌려준다.
  - `isAsync:true`이고 `status`가 없는 `tool_result`도 `launch_ack`가 된다.
  - `task_notification`에서 `source:'notification'`인 `end`를 돌려주고 `at`이 `null`이며
    `agent_id`가 `task_id`다.
  - `tool_use_id`가 없는 `task_notification`은 `null`을 돌려준다.
  - `task_updated`는 `null`을 돌려준다.
  - 기존 4필드 `tool_result`는 `source:'tool_result'`인 `end`를 그대로 돌려준다.
- `server/worker/delegation-store.test.js`
  - `launch_ack`는 세션을 `running`으로 두고 `agent_id`·`model`만 확정한다.
  - 백그라운드 세션이 `notification`에서 `done`으로 닫히고 total-only 영수증을 남긴다.
  - `notification`으로 닫힌 세션에 4필드 `tool_result`가 오면 영수증이 4필드로
    교체되고 leg가 중복 추가되지 않는다.
  - 4필드로 닫힌 세션에 뒤늦은 `notification`이 와도 상태·영수증이 바뀌지 않는다.
  - `completed_at`이 `at` 부재 시 `last_event_at`으로 떨어진다.
  - `notification`의 `result_status`가 `completed`가 아니면 `failed`로 닫힌다.
- `server/worker/delegation-replay.test.js`
  - 새 fixture `__fixtures__/claude-subagent-background.jsonl`(런치 → progress →
    `task_notification`)의 재생 결과가 라이브 경로와 같다.
  - 같은 fixture의 재생 결과가 `status==='done'`, total-only 영수증 1건,
    `agent_id === task_id`, `completed_at === 마지막 progress 줄의 timestamp`임을
    **각각** 단언한다. 동일성 비교만으로는 변경 전에도 양쪽이 똑같이 `failed`·영수증
    없음으로 통과하는 vacuous RED가 되므로, 이 단언들이 RED를 성립시킨다.
- `server/worker/usage-receipts.test.js`
  - `{ total_tokens }` usage의 Claude subagent leg가 유효하고 형태가 보존된다.
  - 같은 형태의 Codex leg는 거부된다.
  - 5키 leg의 검증·정규화가 바뀌지 않는다.
- `app/utils/token-usage.test.js`
  - total-only leg의 subtotal이 `total_tokens`이고 Claude 합계에 포함된다.
  - total-only leg가 4필드 브레이크다운을 오염시키지 않는다.
  - total-only 레코드의 tooltip이 `분해 없음 — 총량만 보고됨`이고 4필드 0 나열과
    공식 줄을 포함하지 않는다.
  - 4필드 레코드의 tooltip이 바뀌지 않는다.
- `app/views/detail-panel/session-history.test.js`
  - 백그라운드 leg 행이 `✓`, `agent_id` short id, 시각, 토큰 배지와 함께 렌더된다
    (이 파일은 수정하지 않으므로 §5–§6 변경이 행에 도달하는지 확인하는 회귀 테스트다).

## 9. 검증

**머지 전 (이 PR 안에서 끝난다)**

- `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`
- 프런트엔드 편집이 있으므로 `npm run build` 후 `app/main.bundle.js`와
  `app/main.bundle.js.map`을 커밋에 포함한다.

**머지 후 (선언된 `[deploy]` 운송이 담당한다)**

핀된 previous target base의 `repo-ops/config.toml`은 `[deploy]`를 선언하며
(`script = "repo-ops/script/deploy"`, `timeout_ms = 600000`), 그 스크립트가 이 저장소의
머지 후 런타임 반영 전체 — 공유 detached 워크트리 `.worktrees/.repo-ops-deploy` 정렬,
빌드, 서버 restart, 프로세스 경로·리스닝 포트·HTTP 응답 검증 — 를 운송한다. 이 spec은
그 절차를 새로 정의하지 않고 선언된 운송에 결속한다. 따라서 PR Delivery 뒤에 유실되는
필수 작업이 없다.

**운영자 인계 잔여**

배포 후 백그라운드 서브에이전트를 쓴 새 attempt의 세션 이력에서 `✓`·시각·토큰이
나오는지 눈으로 확인하는 일은, 배포가 끝난 결과를 사후에 보는 통상적 시각 확인이다.
완료 보고의 잔여 항목으로 운영자에게 인계하며, close 전 대화형 확인을 요구하지 않는다.
과거 attempt는 결정 ②에 따라 바뀌지 않는다.

따라서 승인 범위 안에서 settled transport로 넘길 수 없는 **interactive-only 잔여는
없다**. `worker-ineligible` 라벨은 붙이지 않는다.

## 10. 구현 unit 후보

하나의 packet으로 봉인 가능하다. 파서 → store → 스키마 → 집계 → 표시가 한 줄기이고,
중간 어느 지점에서도 독립적으로 검증 가능한 경계가 생기지 않는다.
