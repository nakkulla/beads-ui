---
scope:
  - app/views/worker/index.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/gate-labels.js
  - app/views/monitor/index.js
  - app/utils/exec-settings-chip.js
  - app/styles.css
  - server/worker/scheduler.js
  - app/main.bundle.js
  - app/main.bundle.js.map
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md
  - AGENTS.md
---

# Worker 상단 배너 제거 — 큐 정지·공급자 보류는 막힌 카드가 말한다

- Bead: UI-01wh
- 작성일: 2026-09-09
- 상태: 작성안 — 승인 대상
- 경로: spec_backed, 한 저장소

## 1. 목표와 사용자 결정 (2026-09-09)

Worker 탭 상단의 배너 세 종류 — 체계적 정지(`worker-hold--systemic`), 환경
보류(`worker-hold--env`), 공급자 게이트(`worker-provider-gate`) — 를 없앤다.
정지·보류라는 **사실**과 그 **출구**는 그 사실에 실제로 막혀 있는 카드에 직접
표시한다. 막힌 카드가 하나도 없으면 아무것도 그리지 않는다(fail-quiet).

사용자가 결정한 것:

- 배너는 완전 제거다. "끄기 버튼"이 아니다 — 서 있는 정지를 화면이 숨기는 토글은
  만들지 않는다.
- 이슈가 있는 것은 **해당 이슈 카드**에 표시한다. 큐 전체 상태를 카드 위 별도
  층으로 올리지 않는다.
- 체계적 정지를 세운 attempt의 타일이 이미 사라진 뒤(이어해서 성공·폐기·레거시
  hold)에는, 막힌 **대기 행마다** `▶ 재개`를 둔다. 클릭은 배너의 `재개`와 같은
  큐 전체 해제다(ADR 0048 "사람의 승인 한 번"). 대기 행이 하나도 없으면 아무것도
  그리지 않고, hold는 다음 행이 들어올 때 그 행에서 드러난다.
- 공급자 게이트(outage·한도)에 막힌 대기 행에는 `[지금 시작]`을 둔다. 그 클릭은
  **이 행 하나**를 공급자 게이트를 무시하고 디스패치한다 — 2026-08-24 공급자
  스펙 §6의 "수동 이어하기는 게이트의 예외"와 같은 논리다. target 자체는
  기존 해제 절차가 판정한다 — `outage`와 계정이 있는 `usage_limit`은 프로브,
  `account:null`인 `usage_limit`은 프로브를 예약하지 않으므로(§6 F3,
  `provider-health.js:439`) 묶인 attempt의 수동 이어하기가 지금처럼 그 target을
  지운다(진짜 장애면 새 attempt가 다시 보류되며 target을 재등록한다). `해제`(target
  삭제, 사용자가 회복을 단언) 조작은 두지 않는다.

바꾸지 않는 것:

- 스케줄러의 정지 상태 모델(`queue.hold`·`lineages`·`provider_hold`), 해제
  절차(`resumeQueueHold`·`retry-now`·프로브), ADR 0048의 해제 승인 규칙(큐를 세운
  attempt 계보의 ↻ 이어하기 = 재개). 바뀌는 것은 표시 위치와 조작의 자리다.
- held 타일 family(`parked`·`retry_wait`·`waiting`·`provider_hold`)의 뱃지·
  팝오버·foot. `retry_wait` 타일 foot에 `↻ 지금 재시도`가 **추가**되는 것만이
  변경이다(§3.3).

## 2. 확인한 사실 (2026-09-09 실측)

- **microbiome_bile.** `provider_hold.claude.targets[0] = { kind:'outage',
  model:'fable', account:'nakkulla2@gmail.com', detail:'rate_limited_429',
  last_error:'Fable 5.1 requires usage credits…' }`, since 09-08 19:14. 이
  target을 등록한 attempt(`Analysis-rq9-…-12`, `paused`)는 사용자가 ↻로 이어해
  자식(`…-14`, fable·활성 계정)이 09-08 19:17에 **성공**했고 bead는 `done`이다.
  `lane-model.js heldAttemptStates`는 `resumed_from`으로 이어진 provider_hold
  attempt를 held 타일에서 빼므로(`:1189`) **타일은 없다**. target은 프로브(같은
  모델·같은 계정)가 계속 429를 받아 남아 있고, outage 종류에는 재무장·나이 상한이
  없다(`provider-health.js:445`, `usage_limit`에만 있다). `scheduler.js:2833`은
  outage target이 하나라도 있으면 그 러너의 **모든** 후보를 건너뛰므로, 직렬 레인
  s1의 `Analysis-x63a`(09-09 11:51 투입)가 디스패치되지 않는다. 이 사실을 말하던
  유일한 표면이 배너였다.
- **dotfiles.** `hold = { kind:'systemic', cause:'loud_fail_blocker',
  halted_by_attempt_id:'dotfiles-muao-…-1' }`, since 09-08 18:06. 그 attempt의
  자식(`…-2`, `resumed_from` = `-1`)은 09-08 19:14에 PR #494로 **성공**했고 큐·PR
  대기는 비어 있다. ↻이 hold를 푸는 규칙(ADR 0048, 514b57f)은 09-09 01:43 배포
  이후에만 적용되므로 그 전날의 ↻은 hold를 건드리지 않았다. 지금 이 hold가 막는
  것은 없고, 표시는 배너와 `재개` 버튼만 남아 있다.
- **큐 정지 중의 디스패치.** `scheduler.js:12309` `armed_only = auto_advance !==
  true || hold !== null` — 정지 중에는 명시적 실행 지시(`▶ 진행`의
  `armed_by_lane`, `[지금 시작]`의 in-memory 요청)를 든 행만 후보다. 즉
  `[지금 시작]`은 **이미** `queue.hold`를 그 행 하나에 대해 우회한다.
- **공급자 게이트는 우회하지 않는다.** `providerDispatchHeld`는 launch 경로
  (`scheduler.js:7396`)에서 후보의 arm·start-now 여부와 무관하게 판정한다. 예외는
  수동 이어하기(`resume()` 경로)뿐이다.
- **`[지금 시작]`은 유예 중에만 그려진다.** `lanes.js:1769
  startNowButtonTemplate`은 `graceRemainingMs(added_at) <= 0`이면 `''`다.
  `requestStartNow`의 요청은 `QUEUE_GRACE_MS`(20초) 뒤 읽기 시점에 폐기된다
  (`scheduler.js:857`).
- **환경 보류의 lineage는 두 상태다.** `lineages`가 비면 hold가 풀리므로(ADR
  0016 사다리) env hold가 서 있는 동안 lineage는 반드시 하나 이상 있지만, 그
  lineage가 **예약 대기**(`next_at` 있음, `↻ 재시도 대기` 타일)인지 **재시도 실행
  중**(`next_at === null`, `queue-hold.js:277`; 타일은 실행 타일로 바뀐다,
  `scheduler.js:7762`)인지는 갈린다. `running-grid.js:987`은 `지금 재시도`를 "큐
  헤더의 조작"이라 명시해 타일에서 뺐다 — 헤더가 없어지면 그 자리는 **예약 대기
  타일**의 foot이고, 실행 중에는 누를 재시도가 없다.
- **대기 행의 러너는 화면이 이미 해석한다.** 슬롯 5 exec 칩
  (`exec-settings-chip.js formatOrchestrationChip`)이 `modelRunnerOf(runner_catalog,
  model)`로 모델→러너를 도출한다. 유예 칩 `⏳`는 admission 레코드가 아니라
  `added_at` 시각 계산으로 그린다(UI-q1tg §3.3 결정 3) — 게이트 칩도 같은 선례를
  따른다.
- **Monitor는 같은 재료를 받는다.** `monitor-handlers.js:890`은 워크스페이스
  항목을 `{...decorateQueue(...), root_dir, name}`으로 싣고, `decorateQueue`는
  `hold`·`lineages`·`provider_hold`·`runner_catalog`·`account_catalog`를 그대로
  통과시킨다(`worker-handlers.js:2963`). Worker 어댑터도 `...q`를 편다
  (`workspace-adapter.js:680`). 두 탭의 `buildLanes` 입력에 새로 실을 것은 없다.
- **공급자 스펙 §9.5의 게이트 배지 목적**은 "이어하기 클릭 시 장애 진행 중임을
  함께 보여 반복 클릭을 인지한 채 선택하게 한다"였다. 이 설계에서는 같은 문장이
  `[지금 시작]` **바로 옆 칩**으로 그 행에 붙으므로 목적은 국소적으로 보존된다.

## 3. 설계

### 3.1 게이트 투영 — `lane-model.js`, 표시 전용 파생값

대기 행 `LaneItem`에 선택 필드 `gate`를 더한다. 재료가 없으면 필드 자체가 없다.

```ts
gate?: {
  kind: 'systemic' | 'env' | 'provider_outage' | 'provider_usage',
  label: string,        // 4a 칩 문구 (§3.2)
  title: string,        // 툴팁 — 팝업 첫 줄과 같은 문장
  since: number | null, // queue.hold.since — `▶ 재개` CAS 재료 (systemic/env)
  next_at: number | null, // env: 가장 이른 lineages[].next_at · outage: next_probe_at · usage: resets_at
  lines: string[]       // 팝업 본문 (§3.2)
}
```

한 행에 두 게이트가 동시에 서면(`queue.hold`와 `provider_hold` — 공급자 스펙 §6
"둘 다 서 있으면 둘 다 막는다") `gate`는 큐 게이트 하나만 싣고 `gate.lines`에
공급자 사유를 한 줄 덧붙인다 — 칩은 행당 하나다. 큐 정지가 풀리면 다음 스냅샷이
공급자 칩으로 바뀐다.

**어느 행이 막힌 행인가.** 판정은 스냅샷 하나로 한다(admission 레코드는 쓰지
않는다 — UI-q1tg §3.3 결정 3과 같은 이유: 정지 중 tick은 후보를 필터 단계에서
걸러 행별 레코드를 쓰지 않고, 슬롯이 없어 tick이 안 돌면 stale 레코드가 남는다.
레코드는 서버가 왜 넘겼는지의 기록이고 화면의 진실은 스냅샷 계산이다).

- 대상 행: 병렬 큐(`queue[]`)의 모든 행과 직렬 레인의 **첫 대기 행**(lane-model이
  이미 대기 행으로 분류하는 것). 직렬 레인의 뒤 행은 제외한다 — 그 행의 "지금 갈
  수 있나"는 레인 순서가 답하고, 게이트 칩까지 얹으면 같은 사실이 레인 길이만큼
  반복된다. 연결 레인 행(`chainRow`)·후보 카드·PR 대기·완료 행은 대상이 아니다.
- `queue.hold`가 `systemic`/`env`면 대상 행 가운데 `armed_by_lane`이 **없는** 행
  전부에 `gate.kind`를 그 값으로 싣는다. arm된 행은 정지 중에도 디스패치되므로(§2
  `armed_only`) 큐 게이트에 막힌 행이 아니다. 이 arm 제외는 **큐 게이트 판정에만**
  적용한다 — 공급자 게이트는 arm 여부와 무관하게 launch 경로에서 판정되므로
  (`scheduler.js:7396`) 아래 공급자 판정은 arm된 행에도 그대로 한다.
- `env`의 `next_at`은 `lineages[].next_at` 중 유한한 값의 최솟값이고, 전부
  `null`(재시도 실행 중, §2)이면 `null`이다.
- `provider_hold`는 행의 **해석 러너**로 판정한다. 러너는 슬롯 5 exec 칩과 같은
  재료 — `pinnedExecChips`가 읽는 실행 값 행의 `orchestration_model` 해석값(핀 >
  큐 기본값) — 를 `modelRunnerOf(runner_catalog, model)`에 넣은 값이다.
  `exec-settings-chip.js`에 `resolvedRunnerOf(rows, runner_catalog)`를 export해
  두 소비자가 한 함수를 부른다. 러너를 못 도출하면 칩을 그리지 않는다.
  - 그 러너에 `kind:'outage'` target이 하나라도 있으면 `provider_outage`.
  - `kind:'usage_limit'` target은 계정 단위다(§6 rev2): `account === null`이면
    러너 전체가 막히므로 `provider_usage`; `account`가 있으면 행의 해석 계정 —
    실행 값 행의 `claude_account`/`codex_account` 해석값, 없으면
    `account_catalog`의 활성 계정 — 과 같을 때만 `provider_usage`. 계정을 해석할
    수 없으면 그리지 않는다(fail-quiet — 서버 admission이 진실이고 칩은 그 진실을
    미리 말하는 힌트다; 덜 그리는 쪽으로만 틀린다).
- 게이트가 서 있어도 대상 행이 없으면 `gate`를 실을 곳이 없고, 그것이 곧 "막힌
  카드가 없으면 그리지 않는다"다.

**retry_wait 타일.** env hold가 서 있을 때 `retry_wait` 타일 투영에
`hold_since: number`를 더한다(`workspace.hold.since`). §3.3의 `↻ 지금 재시도`가
그 CAS를 쓴다.

### 3.2 게이트 칩 — 슬롯 4a 판정 칩 (`lanes.js`)

`dependencyChipsTemplate`의 4a 줄 **맨 앞**에 선다(순서: 게이트 → 발차 → 선행 →
후속 → 유예 `⏳`). "왜 못 가나"의 가장 바깥 사정이 큐 전체의 사정이기 때문이다.

마크업은 판정 칩 규칙(칩 문법 §4.5)을 따른다:

```html
<button type="button"
  class="worker-dep worker-dep--gate worker-dep--gate-<kind> judgement-chip"
  data-chip-key="gate" data-bead-id="<ID>" aria-expanded="false" title="…">
```

| kind | 문구 | 색 | 이유 |
| --- | --- | --- | --- |
| `systemic` | `⛔ 정지 · <failureText(hold.cause)>` | danger | 사람만 푼다 — 거절이다 |
| `env` | `↻ 환경 보류 · 다음 HH:MM` / `next_at` 없으면 `↻ 환경 보류 · 재시도 실행 중` | 중립 | 스스로 풀린다 — `⏳ 유예`가 danger를 타지 않는 것과 같은 이유 |
| `provider_outage` | `⚠️ 공급자 장애 · 다음 프로브 HH:MM` | warn | held 타일 뱃지와 같은 문구 |
| `provider_usage` | `⏳ 한도 대기 HH:MM · <alias\|email>` / `⏳ 한도 대기 · 리셋 미상` | 중립 | held 타일 뱃지와 같은 문구 |

공급자 두 문구는 `running-grid.js providerHoldBadgeText`(`:332`)와 **같은 함수**로
만든다. 그 함수를 새 순수 모듈 `app/views/worker/gate-labels.js`로 옮기고
`running-grid.js`·`lanes.js`가 함께 import한다 — 같은 사실이 타일과 행에서 두
어휘로 읽히지 않게 한다. 시각 조각은 재료가 없으면 빠진다(fail-quiet).

**클릭 = 사유 팝업**(`chip-popover.js`, `data-chip-key="gate"`). 칩은 상태를 쓰지
않는다(AGENTS.md 칩 규칙). 제목은 `자동 디스패치가 막혀 있다`, 본문 `gate.lines`:

- 공통: 원인 문장(`failureText`; 모르는 토큰은 raw — `loud_fail_blocker`처럼
  문장이 등록되지 않은 원인은 지금처럼 토큰이 보인다), `since` 시각.
- `systemic`: `정지시킨 attempt <halted_by_attempt_id>`(없으면 생략), `bead
  <bead_ids>`. 마지막 줄 `출구: 이 행의 ▶ 재개(큐 전체) 또는 [지금 시작](이 행만)`.
- `env`: lineage별 `<bead_id> · 재시도 n/3 · 다음 HH:MM`(실행 중이면 `· 재시도
  실행 중`). 마지막 줄은 재료로 갈린다 — `next_at`이 있으면 `출구: 재시도 대기
  타일의 ↻ 지금 재시도, 또는 [지금 시작](이 행만)`, 전부 실행 중이면 `출구: [지금
  시작](이 행만) — 재시도 결과를 기다리는 중`. 없는 타일의 버튼을 안내하지 않는다.
- `provider_outage`·`provider_usage`: 모델·계정, `last_error` 원문, 다음
  프로브/리셋, 자동 재개·자동 전환 상태(held 타일 팝오버가 쓰는 같은 텍스트 함수).
  마지막 줄은 target의 해제 주체로 갈린다 — `outage`와 계정이 있는 `usage_limit`은
  `출구: [지금 시작](이 행만, 게이트 무시) — target은 프로브 성공 시 자동 해제`,
  `account:null`인 `usage_limit`은 `출구: [지금 시작](이 행만, 게이트 무시) — 이
  target은 프로브가 없고, 묶인 attempt의 ↻ 이어하기가 지운다(§6 F3)`.

`title` 툴팁은 유지한다. 두 탭에서 같은 팝업이다.

### 3.3 조작 — 슬롯 1 조작(대기 행)과 held 타일 foot

`rowActionsTemplate`(대기 행 1번 줄 끝, `lanes.js`)의 순서는
`[▶ 재개] [지금 시작] ↑ ↓ ✕`가 된다. 넓은 것(큐 전체) → 좁은 것(이 행) → 자리
조작 → 빼기.

- **`▶ 재개`** — `gate.kind === 'systemic'`인 행에만. `op-btn
  worker-mini__hold-resume`, `data-action="queue-hold-resume"`,
  `data-since=<gate.since>`, title `정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다
  (큐 전체)`. 클릭은 기존 `sendHoldAction('worker-queue-hold-resume')`와 같은
  요청(`{ since }`; Monitor는 `{ since, root_dir }`)이고, 거부 toast(`hold_changed`
  → "큐 상태가 바뀌었습니다 — 다시 확인하세요")도 그대로다. 막힌 행 전부에 그린다
  — 같은 행동이고 `since` CAS가 두 번째 클릭을 no-op으로 만든다(ADR 0048 §3.3).
  "첫 행에만" 같은 선택 규칙을 만들지 않는다: 병렬·직렬 여러 레인 사이의 "첫
  행"은 정의가 필요한 새 개념이다.
- **`[지금 시작]`** — 표시 조건을 `graceRemainingMs > 0 || item.gate`로 넓힌다.
  게이트로 그려질 때 title은 `큐 정지·공급자 보류를 이 행에 대해서만 무시하고 지금
  실행합니다`. WS op·핸들러·`not_waiting` 거부는 그대로다. `env` 행에도 그린다 —
  재시도를 기다리지 않고 이 행을 밀겠다는 결정은 사용자의 것이다.
- **`↻ 지금 재시도`** — `retry_wait` 타일의 foot(`heldFootTemplate`, kind
  `retry_wait`)에 `op-btn rtile__hold-retry`로 선다. 재료는 §3.1의 `hold_since`이며
  없으면 그리지 않는다. 재시도가 실행 중인 lineage는 `retry_wait` 타일이 아니라
  실행 타일이므로 이 버튼이 없다 — 그 사이 env hold의 조작 표면은 막힌 행의 `[지금
  시작]`뿐이며 이는 의도된 결과다(누를 재시도가 없다). 클릭은 기존 `worker-queue-hold-retry-now { since }`이고 —
  예약된 재시도 **전부**를 지금 실행한다(`retry-now`의 기존 의미) — 여러 lineage
  타일에 같은 버튼이 서고 CAS가 중복을 막는다. foot은 이제 이 버튼이 재료이므로
  `폐기` 유무와 무관하게 그린다; `폐기`가 있으면 그 뒤다. env 대기 행에는 이
  버튼을 두지 않는다 — 재시도는 lineage(타일)의 것이고, 행이 원하는 것은 `[지금
  시작]`이다.
- `provider_hold` held 타일의 foot(`↻ 이어하기`·`⋯ 다른 방법으로`·`폐기`)은 그대로다.

### 3.4 서버 — `[지금 시작]`의 공급자 게이트 우회 (`scheduler.js dispatch`)

`dispatch()`의 `providerDispatchHeld` 판정 앞에서, **라이브 스냅샷의 현재 대기
엔트리**(`queue[]` 또는 `serial_lanes[].entries[]`에서 이 bead의 항목)에
`isStartNowEntry(workspace, entry, now())`(`scheduler.js:884`)가 참이면 게이트를
**건너뛴다**. 요청 시각의 존재(`startNowRequestedAt !== null`)만 보지 않는다 —
`isStartNowEntry`는 `entry.added_at <= requested_at`까지 판정하므로, 클릭 뒤 20초
안에 재배치돼 `added_at`이 새로 찍힌 행에는 이전 클릭의 우회 권한이 남지 않는다
(재배치 뒤 arm된 행이 옛 요청으로 게이트를 넘는 경합을 막는다). 조건은 그 in-memory
`[지금 시작]` 요청 하나다:

- `armed_by_lane`(`▶ 진행`)은 우회하지 않는다. durable하고 재시작을 넘어 살아
  남는 지시라, 서버가 뜨는 순간 게이트가 서 있어도 재생된다. `[지금 시작]` 요청은
  클릭으로만 생기고 20초 뒤 사라지는 사람의 즉시 지시라 "이 행을 지금 밀라"와
  일치한다.
- 기록: 새 durable 필드는 없다. 수동 이어하기(§9.5)와 같다 — 실행된 attempt의
  `runner/model/claude_account` 스탬프가 무엇이 돌았는지를 말하고, 게이트가 서
  있는 동안 attempt가 시작됐다는 사실은 스냅샷(`provider_hold` 유지 + 새
  `running`)으로 읽힌다.
- 실패 경로는 기존 그대로다: 우회 디스패치가 같은 장애를 만나면 `holdAttempt`가
  target에 attempt를 묶고(같은 (kind, model, account)는 병합), held 타일이 다시
  선다.
- `queue.hold` 우회는 이미 있다(§2). 바꾸지 않는다.

### 3.5 제거

- `app/views/worker/index.js`: `holdBannerTemplate`·`providerGateBannerTemplate`와
  `topTemplate`의 두 호출, `.worker-hold__retry`/`.worker-hold__resume` 클릭 분기.
  `sendHoldAction`은 남아 새 클릭 분기(`[data-action="queue-hold-resume"]`,
  `.rtile__hold-retry`)가 부른다.
- `app/styles.css`: `.worker-hold`·`.worker-hold--systemic`·`.worker-hold__text`·
  `.worker-hold__retry`·`.worker-hold__resume`·`.worker-provider-gate` 전부. 추가는 `.worker-dep--gate-systemic`(danger)·
  `.worker-dep--gate-provider_outage`(warn) 두 색 변형만 — `env`·`usage`는
  `.worker-dep` 기본색이다.
- 배너의 `role="alert"`/`role="status"` live region은 대체하지 않는다. 결정: 정지는
  막힌 행 위에 보이는 상태이고, 조작 거부는 기존 toast가 알린다. 큐 정지가 걸리는
  순간의 음성 알림은 없어진다 — 그 알림은 Discord 푸시가 이미 맡고 있다
  (`notify.js`).
- `app/views/worker/index.test.js` 2177–2430행의 배너 테스트 11건은 §5의 행·타일
  테스트로 대체한다.

### 3.6 Monitor

같은 `lane-model` → 같은 행. `miniRow`·`rowActionsTemplate`·판정 칩 팝업을 공유하므로
Monitor 대기 행에도 칩·`▶ 재개`·`[지금 시작]`이 자동으로 선다. Monitor 클릭
분기는 `worker-queue-hold-resume`에 `root_dir`을 실어 보낸다(`mutationWorkspaceOf`가
읽는다 — `[지금 시작]`이 이미 그렇게 한다, `monitor/index.js:2383`). 레포 타일
헤더에 정지 요약을 **추가하지 않는다** — 막힌 행이 없는 정지는 그릴 재료가 없고,
있으면 행이 말한다.

### 3.7 슬롯 표·문서 정정 (ADR 0014 절차)

- `2026-08-25-card-header-grammar-unify-design.md` §5.1에 **정정(UI-01wh)** 문단:
  4a에 게이트 칩(`⛔ 정지`·`↻ 환경 보류`·`⚠️ 공급자 장애`·`⏳ 한도 대기`, 줄 맨
  앞, 클릭 = 사유 팝업); 1번 조작(대기 행)에 `▶ 재개`; `[지금 시작]`의 표시
  조건 확장; `retry_wait` 타일 foot에 `↻ 지금 재시도`. 자리의 근거: 게이트 칩은
  "지금 갈 수 있나"에 답하므로 4a, `▶ 재개`·`[지금 시작]`은 "내가 여기서 무엇을
  하나"이므로 1번 조작. 상단 배너는 슬롯 표 밖의 층이었고 이제 없다.
- `2026-09-02-worker-operation-surface-unify-design.md` §3.2 표에 두 행: 대기 행
  `▶ 재개`(`op-btn worker-mini__hold-resume`), `retry_wait` 타일 foot
  `↻ 지금 재시도`(`op-btn rtile__hold-retry`).
- `2026-08-24-worker-provider-outage-hold-resume-design.md` §10 "게이트 배지"
  문단과 §9.5 두 번째 줄에 정정 각주: 배지는 UI-01wh로 막힌 대기 행의 4a 칩이
  됐다.
- `2026-09-03-monitor-exec-material-queue-grace-design.md` §3.3 "유예 중인 행에만
  `[지금 시작]`"에 정정 각주: 게이트에 막힌 행에도 선다(UI-01wh).
- `2026-09-08-resume-click-releases-systemic-hold-design.md` §1의 "배너와 `재개`
  버튼은 없애지 않는다"는 ADR 후보 1의 supersede가 대체한다 — 스펙 본문은 이력으로
  두고 정정 각주만 단다.
- `AGENTS.md` 「워커·모니터 카드 배치 문법」에 결정 한 줄: "큐 정지·공급자 보류는
  상단 배너가 아니라 **막힌 대기 행**의 4a 게이트 칩과 1번 조작(`▶ 재개`·
  `[지금 시작]`)이다. 막힌 행이 없으면 그리지 않는다 — 근거는 이 스펙."

## 4. 검토한 대안

- **배너 유지 + 끄기 버튼.** 서 있는 정지를 화면이 숨기는 토글이다. 끈 뒤 새
  행이 조용히 안 도는 상황이 오늘의 "왜 안 돌지"와 같다. 기각.
- **서버 admission 레코드로 게이트 사유를 기록해 행이 읽기.** 정지 중 tick은
  후보를 필터 단계에서 걸러 행별 레코드를 쓰지 않고(§2), 쓰게 만들어도 슬롯이
  없어 tick이 안 돌면 stale 레코드가 남는 UI-q1tg §3.3의 결함이 재현된다. 기각 —
  화면의 진실은 스냅샷 계산이고, 이미 두 탭에 있는 재료로 충분하다.
- **stale hold 자동 해제**(정지 계보의 자식 성공 시). ADR 0048 "자동 재개는 hold를
  풀지 않는다" 조항까지 바꾸는 변경이고 이번 범위는 표시 위치다. 사용자 기각.
- **공급자 `해제` 조작**(target 삭제). 증거 없는 단언이고, 장애가 진짜면 다음
  디스패치들이 연쇄로 보류된다. 사용자 기각 — `[지금 시작]`은 한 행의 증거 기반
  시도다.
- **`▶ 재개`를 첫 막힌 행에만.** 병렬·직렬 여러 레인 사이의 "첫 행"이 새 개념이다.
  CAS가 중복 클릭을 no-op으로 만드니 전부에 그리는 것이 규칙이 적다. 기각.

## 5. 검증과 인수 기준

### Test scope

RED → GREEN 시임. 기존 테스트 파일의 setup 패턴을 따른다. **회귀**로 표시한 항목은
변경 전에도 통과하는 대조 조건이라 RED 근거가 아니며, 짝이 되는 RED 시임과 같은
테스트 블록에 결합해 변경이 그 경계를 넘지 않음을 고정한다.

- `app/views/worker/lane-model.test.js`
  1. systemic hold + 병렬 대기 행 2 + 직렬 레인(대기 2행) → 병렬 2행과 직렬 첫
     행에 `gate.kind==='systemic'`·`since`, 직렬 둘째 행에는 `gate` 없음.
  2. (회귀, 1과 같은 블록) `armed_by_lane`이 있는 행은 systemic hold에서 `gate`
     없음 — 그러나 같은 행이 outage target의 러너면 `provider_outage` `gate`는
     있다(RED: arm 제외가 공급자 판정을 삼키지 않는다).
  3. env hold + `lineages[{next_at}]` → `gate.kind==='env'`, `next_at`은 가장 이른
     값; `retry_wait` 타일에 `hold_since`. 모든 lineage가 `next_at:null`이면
     `gate.next_at===null`이고 라벨은 `재시도 실행 중`.
  4. `provider_hold.claude.targets=[outage]` + 행의 해석 모델이 claude 러너 →
     `provider_outage`·`next_at===next_probe_at`; 해석 모델이 codex 러너인 행에는
     없음; `runner_catalog` 부재면 없음.
  5. usage_limit `account:null` → 러너 전체 `provider_usage`; `account:'a@x'` +
     행 해석 계정 `'b@x'` → 없음; 같으면 있음; 계정 해석 불가 → 없음.
  6. hold와 provider_hold 동시 → `gate.kind`는 큐 게이트, `lines`에 공급자 줄 포함.
  7. (회귀, 1과 같은 블록) 게이트가 서 있고 대기 행이 없으면 어느 항목에도 `gate`
     없음(그릴 곳 없음).
- `app/views/worker/lanes.test.js`
  8. `gate` 있는 행의 4a 첫 칩이 `.worker-dep--gate.judgement-chip[data-chip-key="gate"]`이고
     문구가 kind별 표와 일치; `gate` 없으면 칩 없음.
  9. `rowActionsTemplate`: systemic → `[▶ 재개][지금 시작]↑↓✕` 순서와
     `data-since`; provider_outage → `▶ 재개` 없음·`지금 시작` 있음(유예 0이어도);
     gate 없고 유예 0 → 둘 다 없음(회귀).
  10. `gate-labels.js providerHoldBadgeText`가 타일과 행에서 같은 문자열을 낸다
     (running-grid 기존 테스트 이관 + lanes 측 1건).
- `app/views/worker/running-grid.test.js`
  11. `retry_wait` 타일에 `hold_since` → foot에 `.rtile__hold-retry`; 없으면 foot에
     없음; `폐기`와 함께일 때 순서.
- `app/views/worker/index.test.js`
  12. 배너 3종이 어떤 스냅샷에서도 렌더되지 않는다(`.worker-hold`·
     `.worker-provider-gate` 부재).
  13. 대기 행 `▶ 재개` 클릭 → `worker-queue-hold-resume {since}`; `hold_changed`
     응답 → 기존 toast 문구.
  14. `retry_wait` 타일 `↻ 지금 재시도` 클릭 → `worker-queue-hold-retry-now {since}`.
  15. 게이트 칩 클릭 → 팝업 열림(제목·마지막 안내 줄), 다시 클릭 → 닫힘.
  16. 게이트 행의 `[지금 시작]` 클릭 → `worker-queue-start-now {bead_id}`(유예 0).
- `app/views/monitor/index.test.js`
  17. Monitor 대기 행 `▶ 재개` 클릭 → `{since, root_dir}`.
- `server/worker/scheduler.test.js`
  18. `provider_hold` outage 중 `requestStartNow` → 그 bead가 dispatch되고 다른
     대기 bead는 그대로 남는다(`providerDispatchHeld` 우회는 요청 bead 한정).
  19. (회귀, 18과 같은 블록) `armed_by_lane`만 있는 행은 outage 중 dispatch되지
     않는다.
  20. (회귀, 18과 같은 블록) `requestStartNow` 뒤 `QUEUE_GRACE_MS`가 지나면
     우회하지 않는다.
  21. (회귀) 우회 디스패치가 다시 provider_outage로 끝나면 target에 attempt가
     묶인다(기존 `holdAttempt` 경로).
  22. `requestStartNow` 뒤 20초 안에 같은 bead를 재배치(`place`/`applySerialGroup`
     → 새 `added_at`)하고 arm하면 outage 중 dispatch되지 않는다(`isStartNowEntry`의
     `added_at <= requested_at` 판정; 요청 시각 존재만 보는 구현은 이 시임에서
     실패한다).

### 절차

Pre-Handoff 묶음(`npm run tsc` · `npx vitest run --reporter=dot` timeout 120초 ·
`npm run lint` · `npm run prettier:write` → `npm run build`)을 통과한다.
배포 뒤 microbiome_bile Worker 탭 스크린샷으로 확인한다: 배너 없음,
`Analysis-x63a` 행에 `⚠️ 공급자 장애 · 다음 프로브 HH:MM` 칩과 `[지금 시작]`;
dotfiles Worker 탭: 배너 없음, 대기 행 없음이면 아무 표시 없음.

### 인수 기준

- 어떤 스냅샷에서도 Worker 상단에 정지·보류 배너가 없다.
- 게이트에 막힌 대기 행은 두 탭 모두에서 4a 칩과 그 kind의 조작을 갖고, 막힌 행이
  없으면 게이트 표시가 어디에도 없다.
- `▶ 재개`·`↻ 지금 재시도`·`[지금 시작]`은 기존 WS op와 기존 CAS·거부 문구를 쓴다.
- `[지금 시작]`은 공급자 게이트 중 그 행 하나를 디스패치하고 `armed_by_lane`은
  하지 않는다.

## 6. 비목표

- 공급자 outage 분류(`requires usage credits` → `usage_limit`)와 outage target의
  재무장·나이 상한 — 별도 quick_fix UI-k96h(§8).
- `queue.hold`·`provider_hold` 상태 모델, 프로브, 해제 절차, ADR 0048 승인 규칙의
  변경. 결정: `resume()`의 해제 분기와 `resumeQueueHold`는 바꾸지 않는다 —
  이 스펙은 표시와 조작의 자리다.
- Monitor 레포 타일 헤더의 정지 요약, 이슈 상세 패널의 게이트 표시.
- `failureText`에 `loud_fail_blocker` 등 systemic 원인 문장 등록(§8 관찰).
- 후보 카드·PR 대기·완료 행·연결 레인 행의 게이트 표시.

## 7. 구현 unit 후보

- `server`: §3.4 `dispatch()` 우회 + 테스트 18–21.
- `projection`: §3.1 `lane-model.js` `gate`·`hold_since`, `exec-settings-chip.js
  resolvedRunnerOf`, `gate-labels.js` + 테스트 1–7·10.
- `surface`: §3.2·§3.3·§3.5·§3.6 — 칩·조작·타일 foot·클릭 분기·CSS·배너 제거 +
  테스트 8–9·11–17, `npm run build`.
- `docs`: §3.7 슬롯 표·조작 표·정정 각주·`AGENTS.md`.

## 8. 경계·후속

이 설계의 형제 스펙은 없다 — 한 저장소·한 route·한 구현 단위다.

- 관찰: `provider-outage.js LIMIT_RE`가 `requires usage credits`를 못 잡아 모델
  크레딧 소진이 러너 전체 `rate_limited_429` outage로 분류되고, outage target에는
  `usage_limit`의 재무장·24h 상한이 없어 프로브가 무한 재시도한다(§2). 결함이며
  이 설계의 전제가 아니다 — route가 다른 별도 quick_fix **UI-k96h**(이 Bead에서
  `discovered-from`, 라우터가 등록)가 소유한다. 이 스펙은 그 수정 유무와 무관하게
  성립한다: 게이트가 서 있는 동안의 표시와 출구를 정할 뿐 게이트가 언제 풀리는지는
  정하지 않는다.
- 관찰: `failureText`에 `loud_fail_blocker`·`hook_bypass_blocked` 문장이 없어 칩과
  팝업에 토큰이 그대로 보인다 — 어휘 등록은 실패 문장 소유 스펙의 것이며 이
  설계의 표시 규칙(모르는 토큰은 raw)은 그대로 성립한다.
- 관찰: dotfiles의 현재 systemic hold는 대기 행이 없어 이 설계 뒤 어디에도
  보이지 않는다 — 다음 행이 들어오면 그 행의 `▶ 재개` 한 번이 출구다. 배포 전에
  지금의 `재개`를 눌러 두는 것은 운영 조치이고 설계 밖이다.

## 결정 (ADR 후보)

- 전제: ADR 0014 — 새 요소의 자리는 공유 슬롯 표가 정하고, 슬롯을 쪼개기 전에 표를
  먼저 갱신한다(§3.7).
- 전제: ADR 0038 — 처분 조작은 대기 행에 산다. 게이트 조작을 held 타일·ghost가
  아니라 대기 행에 두는 것은 같은 판정이다.
- 전제: ADR 0048 — 체계적 정지의 해제는 사람의 승인 한 번이고 자동 재개는 풀지
  않는다. 이 설계는 그 승인 규칙을 그대로 두고 배너 조항만 뒤집는다.
- **큐 정지·공급자 보류의 표시와 출구는 막힌 카드에 산다 — 상단 배너는 없고,
  막힌 카드가 없으면 정지를 그리지 않는다. `재개`는 막힌 대기 행의 조작이 되고,
  `[지금 시작]`은 한 행의 명시적 디스패치로서 큐 정지뿐 아니라 공급자 게이트도
  우회한다.** 되돌리기 어려움: 낮음 — 템플릿·CSS·`dispatch()` 조건 하나, durable
  형식 무변경 / 맥락 없이 놀라움: 있음 — 큐가 비면 서 있는 정지가 화면 어디에도
  없고, 게이트가 서 있는데 `[지금 시작]`으로 attempt가 뜬다 / 실제 trade-off:
  있음 — 큐 전체 상태의 상시 가시성 vs. 막는 것이 없는 정지가 내는 소음. 두 조건
  충족이고 Accepted ADR 0048의 "배너와 `재개` 버튼은 유지한다" 조항을 뒤집으므로
  승계 기록이 필요하다. `summary`: "Worker 큐 정지와 공급자 보류의 표시·출구는 막힌
  카드에 살고 상단 배너는 없다. 막힌 카드가 없으면 그리지 않으며, `재개`는 막힌
  대기 행의 조작이고 `[지금 시작]`은 한 행의 명시적 디스패치로 공급자 게이트도
  우회한다. 체계적 정지의 해제는 여전히 사람의 승인 한 번이며 자동 재개는 풀지
  않는다." → ADR, supersede 0048
- 게이트 투영은 admission 레코드가 아니라 스냅샷 파생값이다 — UI-q1tg §3.3 결정 3의
  적용이지 새 규칙이 아니다. → ADR 아님
