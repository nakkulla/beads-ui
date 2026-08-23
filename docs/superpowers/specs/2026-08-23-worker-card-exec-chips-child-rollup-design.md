---
scope:
  - app/utils/exec-settings-chip.js
  - app/utils/exec-settings-chip.test.js
  - app/utils/child-rollup.js
  - app/utils/child-rollup.test.js
  - app/views/child-rollup.js
  - app/views/child-rollup.test.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/board/card.js
  - app/views/board/card.test.js
  - app/views/board/index.js
  - app/views/board/index.test.js
  - app/main.js
  - app/styles.css
  - app/styles.worker-theme.test.js
---

# Worker 카드 정보 보강 — 실행 설정 칩(오케·워커)과 실행 타일 child 진행도

## 배경과 목적

Worker 콘솔(`app/views/worker/`)의 카드들은 "무엇이 돌고 있는가"는 말하지만
"**어떤 설정으로** 도는가/돌 것인가"와 "**어디까지** 왔는가"를 말하지 않는다.

1. 실행 타일(`running-grid.js`)은 attempt에 기록된 오케스트레이션 튜플
   (`runner · model · effort · Fast`, `app/utils/attempt-display.js
   formatAttemptTuple`)만 그린다. 구현을 누구에게 위임하는지(`impl_runtime` /
   `impl_model` / `impl_effort` / `impl_speed`)는 어디에도 없다.
2. 대기 행(`lanes.js miniRow`, 병렬 `queue`·직렬 `s1~s5`)과 후보 카드
   (`candidateCard`)는 실행 설정 필드 자체가 없어 "이 설정으로 돌아간다"를 미리
   볼 수 없다.
3. 실행 타일은 현재 진행중 child 제목 한 줄(`current_child`, UI-53es §2)만
   있고, Board 카드(`board/card.js rollTemplate` + `board/index.js rollupFor`)가
   보여주는 `children N/M`·펼침 목록이 없다. Worker 뷰의 child 맵
   (`worker/index.js buildModel`)은 `in_progress` 컬럼만 읽어 전체 수를 셀 수
   없다.

### 조사로 확정한 사실 (Bead 설명과 다른 부분 포함)

- attempt 레코드의 `exec_values`(12키, `server/worker/exec-enums.js
  EXEC_SETTING_KEYS`)에는 `impl_speed`가 **없다**. 그리고
  `impl_runtime/impl_model/impl_effort`는 **Bead에 핀된 값만** 담긴다 —
  `server/worker/policy.js` 헤더가 선언하듯 세션 9키의 워크스페이스 레이어는
  `bd kv workflow_session_defaults`이고 그것은 세션이 직접 읽지 Worker 런처는
  읽지 않는다. 따라서 `exec_values`만으로는 핀 없는 보통의 bead에서 워커 칩이
  비어 버린다. "데이터 추가 없이 가능"은 핀된 bead에만 성립한다.
- "실제로 어떤 설정으로 돌아갈지"는 핀(bead metadata) > 전역(kv) > 기본(harness
  투영) 레이어 해석이며, 이 계산은 이슈 상세 유효 설정 카드가 쓰는
  `app/utils/execution-defaults.js resolveExecutionSettings`가 이미 한다. 입력
  중 bead metadata는 Worker 탭이 구독하는 ready/blocked/in_progress 이슈에
  있고, `runner_catalog`·`execution_defaults`·orchestration 3키는 큐 스냅샷에
  있으며, kv 전역값만 `get-session-defaults` 요청으로 받아야 한다.
- Board의 `children N/M`은 Board가 구독한 5컬럼(blocked/ready/in_progress/
  resolved/closed)에서 클라이언트가 센다. closed 컬럼은 사용자가 고른 기간(기본
  '오늘') 안만 오므로 **기간 밖에서 닫힌 child는 N에도 M에도 안 들어간다** —
  이는 Board의 현행 동작이다. Worker 탭은 resolved를 구독하지 않는다.
- `app/utils/current-child.js selectCurrentChild`가 Board·Worker가 공유하는
  "현재 child" 선택 계약이며, `parentIdOf`는 `board/index.js`와
  `worker/index.js`에 같은 함수가 두 벌 있다.

### 사용자 결정 (2026-08-23 세션)

| 결정 | 선택 |
|---|---|
| 실행 설정 칩 데이터 경로 | **클라이언트 계산** — 상세 카드와 같은 `resolveExecutionSettings` 재사용, Worker 뷰가 kv 전역값을 `get-session-defaults`로 읽어 보관. 서버 변경 없음 |
| child 진행도 데이터 | **클라이언트 구독, Board 동일** — `tab:worker:resolved` 구독 추가, Board의 계산·마크업을 공용 유틸로 올려 공유. 기간 밖 closed child를 못 세는 한계는 Board와 공유 |
| 칩 부착 범위 | 실행 타일 + 대기 행(병렬·직렬) + **후보 카드** |
| 실행 타일 rollup 기본 노출 | `children N/M ▾` 토글 + 현재 child 한 줄만 기본 표시, **목록은 기본 접음**(펼친 bead만 기억) |

구조는 "공용 유틸 2개 + 공용 템플릿 1개 + 기존 템플릿 확장"이며 Board의
`board-card__roll*` 클래스명은 그대로 둔다(동작·DOM 불변, CSS는 `app/styles/
base.css`에 전역으로 이미 있음; 이름 정리는 범위 밖).

## 설계

### 1. 실행 설정 칩 — 형식·생략 규칙 (`app/utils/exec-settings-chip.js`, 신규)

순수 포매터. 입력은 `resolveExecutionSettings`의 결과 행(`rows`)과 약간의
문맥이고, 출력은 `ExecChip = { text: string, title: string }`이다.

```js
/** @typedef {{ text: string, title: string }} ExecChip */
/** @typedef {{ orchestration: ExecChip|null, worker: ExecChip|null }} ExecChips */

export function formatAttemptOrchestrationChip(attempt)            // 실행 타일: attempt 기록값
export function formatOrchestrationChip(rows, runner_catalog)        // 대기 행·후보 카드: 해석값
export function formatWorkerChip(rows, controller_runtime)           // 세 표면 공통
```

칩 텍스트는 한 줄 `토큰 · 토큰 · …`이고 접두 라벨은 템플릿이 붙인다(§4).

| 칩 | 접두 라벨 | 텍스트 토큰 (순서대로, null은 생략) | 생략 규칙 |
|---|---|---|---|
| 오케 (attempt) | `오케` | `formatAttemptTuple(attempt)` 결과 그대로 | 빈 문자열이면 칩 null |
| 오케 (해석) | `오케` | `runner`, `rows.orchestration_model.display`, `rows.orchestration_effort.value !== null ? rows.orchestration_effort.display : null`(`CLI 기본 (미지정)`·확인 불가는 생략), `rows.orchestration_speed.value === 'fast' ? 'Fast' : null` | runner는 `modelRunnerOf(runner_catalog, rows.orchestration_model.value)` (`app/views/detail-panel/exec-settings.js`); null이면 토큰 생략. `orchestration_model.resolution === 'unavailable'`이면 칩 null |
| 워커 | `워커` | `rows.impl_dispatch.value === 'main'`이면 `['메인']` 한 토큰. 아니면 `runtime_token`, `model_token`, `effort_token`, `rows.impl_speed.value === 'fast' ? 'Fast' : null` | 모든 토큰이 null이면 칩 null |

워커 토큰 규칙:

- `runtime_token`: `impl_runtime.value === 'inherit'` → `controller_runtime`이
  있으면 `inherit→<controller_runtime>`, 없으면 `inherit`. 그 외 value 문자열.
  `resolution`이 `unavailable`/`not_applicable`이면 null.
- `model_token`: `resolution`이 `unavailable`/`not_applicable`이면 null;
  `value === 'auto'`이면 `auto`; 그 외 `display` 그대로(`compactModelId` 축약과
  ` (비호환)` 표기는 resolver가 이미 붙여 준 것을 유지).
- `effort_token`: `value === 'auto'`이면 `auto`(resolver의 `auto (실행 시
  결정)`을 축약); `unavailable`/`not_applicable`이면 null; 그 외 `display`.

`title`(툴팁)은 첫 줄 의미 선언 + 키별 한 줄 `<SETTING_LABELS[key]>: <display>
(<SOURCE_LABELS[source]>)`. 라벨·소스 어휘는
`app/views/detail-panel/effective-settings.js`의 `SETTING_LABELS`/
`SOURCE_LABELS`를 import해 상세 카드와 공유한다(⑤).

| 칩 | 첫 줄 | 이어지는 줄 |
|---|---|---|
| 오케 (attempt) | `오케스트레이션 — 이 attempt에 기록된 실행값` | `runner: …`, `오케스트레이션 모델: …`, `오케스트레이션 effort: …`, `오케스트레이션 속도: …` (소스 표기 없음; 값 없는 줄 생략) |
| 오케 (해석) | `오케스트레이션 — 현재 해석값 (핀 > 큐 기본값)` | `orchestration_model/effort/speed` 3줄, 각 `(핀|전역|기본)` |
| 워커 | `워커(구현 위임) — 현재 해석값 (핀 > 전역 kv > 기본). 실행 중이면 세션이 시작 시 고정한 값과 다를 수 있음` | `impl_dispatch/impl_runtime/impl_model/impl_effort/impl_speed` 5줄, 각 `(핀|전역|기본)`; `display`는 resolver 값 그대로(`해당 없음`, `기본값 확인 불가` 포함) |

실행값(불변)과 해석값(가변)의 구분(③)은 시각 스타일이 아니라 이 툴팁 문구로만
한다. 추가 dim 처리 없음.

### 2. 칩 데이터 경로 — Worker 뷰 (`app/views/worker/index.js`)

#### 2.1 kv 전역값 상태

```js
/** @type {Record<string, string>} */ let session_defaults = {};
/** @type {string|null} */            let session_defaults_key = null;   // 값이 속한 workspace path
let session_defaults_stale = true;
/** @type {Promise<void>|null} */     let session_defaults_inflight = null;
```

- `ensureSessionDefaults()`: `key = getWorkspacePath?.() || ''`. `!stale &&
  key === session_defaults_key`이면 즉시 반환; in-flight가 있으면 반환;
  `transport`가 없으면 반환. 아니면 `transport('get-session-defaults', {})`를
  호출해 `res.values`가 객체면 `session_defaults = { ...res.values }`, 아니면
  `{}`; 성공·실패 모두 `session_defaults_key = key`, `stale = false`로 두고
  `doRender()`. 실패는 `debug` 로그만 남기고 전역 레이어 없이 해석한다
  (fail-quiet; 다음 갱신 시점에 재시도).
- `refreshSessionDefaults()` (공개 API): `stale = true` 후
  `void ensureSessionDefaults()`.
- `load()`: 기존 `doRender()` 앞에 `void ensureSessionDefaults()`. `load()`는
  라우트가 Worker일 때 store 변경마다 호출되므로 위 key/stale 가드가 중복 요청을
  막는다. 워크스페이스 전환은 key 불일치로 감지된다.
- `app/main.js`: 설정 다이얼로그 `onOpenChange`에서 `open === false`일 때
  `worker_view.refreshSessionDefaults()`를 호출한다(전역 기본값·전역 프리셋
  적용은 이 다이얼로그에서만 일어난다). `worker_view`는 다이얼로그보다 뒤에
  생성되므로 콜백 안에서 참조한다(다이얼로그는 bootstrap 이후에만 닫힐 수
  있다). CLI `bd kv set`로 바꾼 값은 다음 갱신 시점까지 반영되지 않는다 — 상세
  카드와 같은 한계.

#### 2.2 bead별 해석

`buildModel()` 안에서 ready/blocked/in_progress 이슈를 `issue_by_id`
(`Map<string, issue>`)로 모으고, 다음 헬퍼로 bead당 한 번 해석한다.

```js
/** @param {string} bead_id  @param {string|null} controller_runtime  @returns {Record<string, ExecutionValue>|null} */
function execRowsFor(bead_id, controller_runtime)
```

- 이슈가 `issue_by_id`에 없으면 `null`(핀을 볼 수 없는 bead는 전역값만으로
  해석하지 않는다 — 틀린 칩보다 없는 칩).
- 있으면 `resolveExecutionSettings({ pin: issue.metadata ?? {}, global:
  { ...session_defaults, ...큐 스냅샷의 orchestration_model/effort/speed(문자열인
  것만) }, execution_defaults: q.execution_defaults ?? null, runner_catalog:
  q.runner_catalog ?? null, route: metadata.route(문자열) ?? null,
  controller_runtime })`. 이 입력 조립은 상세 패널 `execDefaults()`/
  `effectiveSettingsCardTemplate`와 같은 규칙이다.

| 표면 | `orchestration` | `worker` | `controller_runtime` |
|---|---|---|---|
| 실행 타일(실행 중·일시정지·실패) | `formatAttemptOrchestrationChip(a)` | `formatWorkerChip(rows, a.runner)` (`rows` null이면 null) | `a.runner ?? null` |
| 대기 행 (`toRows`, lane `queue`/`s1..s5`, ghost 행 제외) | `formatOrchestrationChip(rows, q.runner_catalog)` | `formatWorkerChip(rows, ctl)` | `ctl = modelRunnerOf(q.runner_catalog, rows.orchestration_model.value)` |
| 후보 카드 (`candidate_rows`) | 위와 같음 | 위와 같음 | 위와 같음 |
| 완료 행·PR 대기 행 | 없음 | 없음 | — |

결과는 `exec_chips: ExecChips|null`로 타일/행 객체에 실린다(둘 다 null이면
`null`).

### 3. child rollup — 공용화와 실행 타일 통합

#### 3.1 `app/utils/child-rollup.js` (신규, 순수 계산)

```js
export function parentIdOf(issue)                     // board/index.js·worker/index.js의 동일 함수를 이전
export function buildChildrenIndex(issues)            // board/index.js rebuildChildrenIndex 본체: id 중복 제거 후 parent → ChildRow[] (id,title,status,metadata,workflow,created_at,updated_at)
export function rollupFor(children_by_parent, id)     // board/index.js rollupFor 본체: { total, count(resolved|closed), current: selectCurrentChild(children), children }
```

`board/index.js`는 `rebuildChildrenIndex(all)` 본체를 `children_by_parent =
buildChildrenIndex(all)`로, `rollupFor(id)`를 유틸 호출 래퍼로 바꾸고 자체
`parentIdOf`를 지운다. `worker/index.js`도 자체 `parentIdOf`를 지운다. 결과
값·순서는 현행과 같다(동작 불변).

#### 3.2 `app/views/child-rollup.js` (신규, 공용 템플릿)

```js
/**
 * @param {{ total: number, count: number, current: ChildLike|null, children: ChildRow[] }} rollup
 * @param {{
 *   parent_id: string,
 *   expanded: boolean,
 *   trailing?: TemplateResult|'',                 // roll-meta 오른쪽 (Board: timesTemplate)
 *   empty_label?: string|null,                    // total 0일 때 문구; null/생략이면 아무것도 그리지 않음
 *   childChips?: (child: ChildRow) => TemplateResult|null,
 *   onToggle?: (ev: Event) => void,
 *   onChildClick?: (ev: Event, child_id: string) => void
 * }} opts
 */
export function childRollupTemplate(rollup, opts)
export function statusDotClass(status)               // board/card.js에서 이전 (rollTemplate 전용이었음)
```

- 마크업은 현행 `rollTemplate` 본체 그대로: `.board-card__roll` >
  `.board-card__roll-meta`(토글 `children N/M ▴|▾` 또는 `empty_label`의
  `.board-card__roll-none`, 그리고 `trailing`) > `.board-card__roll-current`
  (`└ ● <현재 child 제목>`, `total>0 && current`일 때) >
  `.board-card__roll-list`(`expanded && total>0`일 때, `cmpChildOrder` 정렬,
  각 행 `button.board-card__roll-child` = 상태 점 + 순번 + 제목 +
  `childChips(child)`).
- 토글에 `data-roll-parent=${parent_id}`, child 행에 `data-child-id=${child.id}`를
  **항상** 싣고, `@click`은 `onToggle`/`onChildClick`이 주어질 때만 붙인다.
  Board는 핸들러 전달(현행과 같이 `preventDefault/stopPropagation` 포함),
  Worker는 핸들러 없이 위임 클릭으로 처리한다(§3.4).
- `total === 0`: `empty_label`이 있으면 `.board-card__roll` > `.board-card__roll-meta`
  > `.board-card__roll-none` + `trailing`(Board 현행), 없으면 `''`.

`board/card.js`의 `rollTemplate(issue, ctx)`는 얇은 래퍼가 된다:
`childRollupTemplate(rollup, { parent_id: issue.id, expanded, trailing:
timesTemplate(issue), empty_label: 'children 없음', childChips: childExecChips,
onToggle: (ev) => ctx.onRollupToggle?.(ev, issue.id), onChildClick: (ev, id) =>
ctx.onChildClick?.(ev, id) })`. `childExecChips(child)`는 현행 인라인 식
(`formatPlannedExecution(...)`이 참이면 `plannedExecutionChip` +
`compactExecutionChip`을 감싼 `.board-card__roll-child-chips`, 아니면 null)을
`card.js`의 export 함수로 뽑은 것이다. Board 카드의 렌더 DOM은 변하지 않는다.

#### 3.3 Worker 탭 데이터

- `app/main.js WORKER_SUBS`에 `['tab:worker:resolved', 'resolved-issues']`
  추가. `worker/index.js`에 `RESOLVED_KEY = 'tab:worker:resolved'`를 두고
  `buildModel()`에서 `selectors.selectBoardColumn(RESOLVED_KEY, 'resolved')`를
  읽는다.
- 자식 인덱스는 `buildChildrenIndex([...ready, ...blocked, ...in_progress,
  ...resolved, ...closed])` — Board와 같은 5집합. closed는 완료 레인 기간
  (`done_range`)을 따르므로 기간 밖 child는 세지 않는다(Board와 같은 한계;
  Board와 기간이 다르면 두 탭의 N/M이 다를 수 있다 — 허용). 실행 타일은 이
  인덱스의 `rollupFor(index, a.bead_id)`를 `rollup` 필드로 싣는다
  (`total === 0`이면 `null`).
- 기존 `children_by_parent`(in_progress만)와 `currentChildTitleOf`는 제거한다.
  현재 child는 `rollup.current`가 같은 `selectCurrentChild`로 고른다(in_progress
  child는 5집합에 포함되므로 결과 동일). `IN_PROGRESS_KEY` 주석을 갱신한다.
- 펼침 상태: `/** @type {Set<string>} */ const rollup_expanded_ids = new Set()`
  — 펼친 bead만 기억(기본 접음), 뷰가 살아 있는 동안 유지되어 스냅샷 재렌더에
  잊히지 않는다. 타일 객체에 `rollup_expanded: rollup_expanded_ids.has(bead_id)`.

#### 3.4 실행 타일 렌더 (`running-grid.js`)

- `RunningTile`에 `exec_chips?: ExecChips|null`, `rollup?: ChildRollup|null`,
  `rollup_expanded?: boolean` 추가, `current_child` 제거.
- 줄 순서: 헤더 → 제목 → **rollup 블록**(`rollup`이 있을 때만;
  `childRollupTemplate(rollup, { parent_id: bead_id, expanded: rollup_expanded,
  childChips: childExecChips })` — `trailing`/`empty_label`/핸들러 없음) →
  landing 진행줄 → `.rtile__meta`(§4) → `timesMeta` → discard 영수증 → 액센트.
  기존 `.rtile__child` 한 줄은 rollup 블록의 `.board-card__roll-current` 줄이
  대체한다(같은 사실·Board와 같은 마크업). `.rtile__child` 템플릿·CSS는 지운다.
- rollup은 실행 레인 타일(실행 중·일시정지·실패)에만 붙고 PR 대기·완료 레인에는
  주지 않는다(⑨).
- `runningGridTemplate(tiles, now, selected_attempt)` 시그니처는 그대로다.

Worker 뷰 `onClick` 위임: `.rtile` 기본 클릭(이슈 상세) 분기보다 **앞에**
두 분기를 둔다.

- `target.closest('.rtile .board-card__roll-toggle')` → `data-roll-parent`의
  bead를 `rollup_expanded_ids`에서 토글하고 `doRender()`, return.
- `target.closest('.rtile .board-card__roll-child')` → `data-child-id`로
  `gotoIssue(child_id)`, return.

### 4. 배치와 스타일

`lanes.js`에 `export function execChipsTemplate(chips)`를 둔다: `chips`가
null이거나 두 칩이 모두 null이면 `''`; 아니면 각 칩을
`<span class="exec-chip exec-chip--orch|--worker" title=${chip.title}><span
class="exec-chip__k">오케|워커</span>${chip.text}</span>`으로 그린다.

| 표면 | 위치 |
|---|---|
| 실행 타일 | `.rtile__meta` 안에서 기존 `<span class="rtile__runner">${meta}</span>` 자리를 `execChipsTemplate(tile.exec_chips)`가 대신한다(오케 칩 텍스트는 종전 `formatAttemptTuple` 값과 같다). 충돌 해소·base 뱃지는 앞에, usage는 뒤(오른쪽 끝)에 그대로. meta 줄 표시 조건에 `exec_chips`를 포함시킨다 |
| 대기 행 한 줄 변형 | `.worker-mini__line` 다음, `discardReceiptTemplate`·`timesMeta` 앞에 `<div class="worker-mini__exec">${execChipsTemplate(item.exec_chips)}</div>` (칩이 없으면 div도 생략) |
| 대기 행 카드 변형(REVISE 파킹·stale) | `.worker-mini__body` 다음, `.worker-mini__foot` 앞에 같은 `.worker-mini__exec` 줄 |
| 후보 카드 | 제목·스테퍼 다음, `.worker-card__foot` 앞에 같은 `.worker-mini__exec` 줄 |
| 완료 행(2줄 변형)·PR 대기 행 | 없음 |

CSS(`app/styles.css` Worker 섹션):

```css
.exec-chip { display: inline-flex; align-items: baseline; gap: var(--sp-3); min-width: 0; max-width: 100%; overflow-wrap: anywhere; }
.exec-chip__k { flex: 0 0 auto; font-size: var(--fs-chip); color: var(--text-dim); }   /* 접두 라벨은 본문보다 한 단계 흐리게 */
.worker-mini__exec { display: flex; flex-wrap: wrap; gap: var(--sp-6); font-size: var(--fs-caption); color: var(--text-muted); }
.worker-card .worker-mini__exec { margin-top: var(--sp-4); }
.rtile .board-card__roll { border-top: none; margin-top: var(--sp-4); padding-top: 0; }  /* 타일 안에서는 footer가 아니라 한 줄 */
```

`.rtile__meta`의 색·크기(`--fs-chip-lg`, `--text-dim`)는 `.exec-chip`이
상속한다. 종전 `.rtile__runner` 규칙(긴 토큰 보호: `min-width: 0`,
`max-width: 100%`, `overflow-wrap: anywhere`)은 `.exec-chip`으로 옮기고
`.rtile__runner`·`.rtile__child` 규칙은 지운다;
`app/styles.worker-theme.test.js`의 해당 테스트도 `.exec-chip`을 보게 옮긴다.
모바일 한 열 레이아웃에서 칩은 줄바꿈만 한다(추가 규칙 없음).

### 5. 오류 처리·fail-quiet 정리

| 상황 | 결과 |
|---|---|
| `get-session-defaults` 실패·미로딩·`transport` 없음 | `session_defaults = {}` — 전역 레이어 없이 해석, 칩은 핀/기본으로 표시 |
| 큐 스냅샷에 `execution_defaults`/`runner_catalog` 없음(구서버) | resolver가 `기본값 확인 불가`로 내고 §1 규칙에 따라 해당 토큰/칩 생략 |
| bead 이슈가 구독 집합에 없음 | 워커 칩·해석 오케 칩 생략(attempt 오케 칩은 유지) |
| legacy attempt(`runner/model` 없음) | 기존과 같이 오케 칩 없음 |
| child 0개 | rollup 블록 생략 |
| 구서버가 `resolved-issues` 구독을 못 줌 | 인덱스에 resolved만 빠짐(Worker 구독 등록 실패는 기존 로그 경로) |

### 6. 범위 밖

- 서버 장식(`bead_exec`/`bead_children`), Monitor 탭, PR 대기·완료 레인의
  rollup·칩, `exec_receipt`(실제 실행 영수증) 칩 — Board 카드·상세가 이미
  보여준다.
- `board-card__roll*` → 중립 클래스명 개명, closed 기간 밖 child까지 세는
  별도 데이터 경로.
- `formatAttemptTuple`·`resolveExecutionSettings`의 의미 변경.

## 테스트 seam

- `app/utils/exec-settings-chip.test.js`(신규): attempt 오케 칩(튜플·빈 값 null);
  해석 오케 칩(runner 파생·unavailable → null·Fast); 워커 칩(`main` → `메인`,
  `inherit→claude`/`inherit`, `auto` 축약, `(비호환)` 유지, 모두 null → null);
  툴팁 첫 줄·키별 줄·소스 라벨.
- `app/utils/child-rollup.test.js`(신규): `parentIdOf`(string/object/없음),
  `buildChildrenIndex`(중복 id·보존 필드), `rollupFor`(N/M·현재 child·없음).
- `app/views/child-rollup.test.js`(신규): 기본 마크업, `expanded` 유무, `empty_label`
  유무(없으면 `''`), `data-roll-parent`/`data-child-id` 항상 존재, 핸들러 있을
  때만 클릭 반응, `childChips` 주입.
- `app/views/worker/running-grid.test.js`: `.rtile__runner` 대신 `.exec-chip--orch`
  텍스트가 종전 튜플과 같음; 워커 칩 표시/생략; rollup 블록(`children N/M`,
  현재 child 줄, 접힘 기본·`rollup_expanded`로 펼침, `rollup` null이면 블록
  없음); `.rtile__child` 부재.
- `app/views/worker/lanes.test.js`: `execChipsTemplate` 빈/부분/전체; 대기 행
  한 줄·카드 변형과 후보 카드의 `.worker-mini__exec` 위치; 완료 행·PR 대기 행
  미표시.
- `app/views/worker/index.test.js`: `load()` 시 `get-session-defaults` 1회 호출과
  중복 호출 억제; `refreshSessionDefaults()`·workspace key 변경 시 재호출; 응답
  실패 fail-quiet; 전역값이 워커 칩에 반영(핀 > 전역 > 기본); 이슈 없는 bead
  칩 생략; resolved 구독 포함 인덱스로 `children N/M`; 타일 토글 클릭이 상세를
  열지 않고 펼침을 토글; child 행 클릭이 `gotoIssue(child)`; ghost 행 칩 없음;
  기존 `.rtile__child` 단언은 `.board-card__roll-current`로 옮긴다.
- `app/views/board/card.test.js`·`app/views/board/index.test.js`: 기존 테스트
  무수정 통과(동작·DOM 불변 증거).
- `app/main.*.test.js`: 기존 통과; 설정 다이얼로그 닫힘 → Worker 뷰 갱신은
  `worker/index.test.js`의 공개 API 테스트로 덮고 main 쪽은 배선 한 줄이다.

## 수동 관측 (advisory)

배포 후 실행 중 세션이 있을 때 실행 타일에서 `오케 …`/`워커 …` 두 칩과
`children N/M ▾`·현재 child 줄을 육안 확인하고, 설정 다이얼로그에서 전역
`impl_runtime`을 바꾸고 닫았을 때 대기 행 워커 칩이 바뀌는지 확인한다.

## 구현 unit 후보 (advisory)

1. `utils:child-rollup` — `app/utils/child-rollup.js` + `app/views/child-rollup.js`
   + Board 리팩터(`board/index.js`, `board/card.js`) + 테스트.
2. `utils:exec-chip` — `app/utils/exec-settings-chip.js` + `lanes.js
   execChipsTemplate` + 테스트.
3. `worker:wire` — `worker/index.js`(session_defaults·issue_by_id·resolved
   구독·rollup·칩·클릭 위임), `running-grid.js`, `lanes.js` 배치, `main.js`,
   `styles.css` + 테스트.
