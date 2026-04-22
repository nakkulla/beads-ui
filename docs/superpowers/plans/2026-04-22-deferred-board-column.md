# Deferred Board Column Implementation Plan
Parent bead: UI-eigm

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `deferred` as a first-class Beads status in beads-ui, expose it as
a board-only temporary column toggle with a live count, and allow moving issues
into and out of `deferred` from board/list/detail flows.

**Architecture:** Extend the canonical status model so client and server both
accept `deferred`, then wire a new `deferred-issues` subscription into board and
issues-list routing. Keep the board UX session-local by storing
`show_deferred_column` only in the in-memory app state, while leaving existing
`resolved` and `closed` behaviors intact.

**Tech Stack:** Node.js, lit-html, WebSocket protocol handlers, Vitest, Beads
(`bd`)

**Spec:** `docs/superpowers/specs/2026-04-21-deferred-board-column-design.md`

---

## Working Context

- execution repo root: 현재 작업 디렉터리 (`beads-ui`)
- parent bead: `UI-eigm`
- canonical workspace branch: `bd-ralph/ui-eigm-deferred-board`
- 구현 범위는 **Deferred status model + board toggle column + list/detail/server
  wiring + regression tests**

### 이번 런에 포함하는 범위

- canonical status 목록과 status label에 `deferred` 추가
- board용 `deferred-issues` subscription 및 `Deferred (N)` 토글 버튼 추가
- board session-local UI state(`show_deferred_column`) 추가
- issues list/detail/inline row status controls와 issues tab filter routing에
  `deferred` 반영
- server subscription validator/list adapter/update-status 경로에 `deferred`
  반영
- board/list/status/subscription 회귀 테스트 추가

### 이번 런에서 의도적으로 제외하는 범위

- `Deferred` 표시 여부의 localStorage/server persistence
- `defer_until` 편집/표시 UX
- Worker/Epics 전용 status UX 변경
- board 전체 레이아웃 재설계

## File Structure

| Action | File | Responsibility |
| --- | --- | --- |
| Modify | `app/utils/status.js` | canonical status order + `statusLabel('deferred')` |
| Modify | `app/utils/status.test.js` | deferred status order/label 회귀 테스트 |
| Modify | `app/state.js` | `board.show_deferred_column` session-local state 추가 |
| Modify | `app/state.test.js` | board toggle state merge/regression 확인 |
| Modify | `app/main.js` | deferred filter persistence, issues spec routing, board/cleanup deferred subscription wiring |
| Modify | `app/data/providers.js` | `updateIssue()` status union과 mutation JSDoc을 deferred까지 확장 |
| Modify | `app/data/list-selectors.js` | board/list selector status typing surface를 deferred-aware로 정리 |
| Create | `app/main.deferred-status.test.js` | deferred issues/board subscription wiring과 aux merge 경로 회귀 테스트 |
| Modify | `app/views/board.js` | `Deferred (N)` button, conditional deferred column, drag/drop target, counts |
| Modify | `app/styles.css` | deferred toggle button / board header controls / deferred status badge styling |
| Modify | `app/views/board.test.js` | board render/toggle/drag-drop 회귀 테스트 |
| Modify | `app/views/board.persist.test.js` | `show_deferred_column` session-local store sync 테스트 |
| Modify | `app/views/detail.js` | detail status select와 status union JSDoc에 deferred 추가 |
| Modify | `app/views/detail.test.js` | detail status select option 회귀 테스트 |
| Modify | `app/views/issue-row.js` | list inline status select와 row patch JSDoc에 deferred 추가 |
| Modify | `app/views/list.js` | status filter label/rendering, deferred-only/combined list handling, status union JSDoc 정리 |
| Modify | `app/views/list.test.js` | deferred filter + inline status option 테스트 |
| Modify | `server/list-adapters.js` | `deferred-issues` subscription → `bd list --status deferred` |
| Modify | `server/list-adapters.test.js` | deferred subscription arg mapping 테스트 |
| Modify | `server/validators.js` | `deferred-issues` subscription type 허용 |
| Modify | `server/validators.test.js` | deferred subscription validation 테스트 |
| Modify | `server/ws.js` | `update-status` allowed set에 deferred 추가 |
| Modify | `server/ws.mutations.test.js` | deferred mutation accept/validation 테스트 |

---

### Task 1: canonical status model과 server subscription contract 확장

**Files:**

- Modify: `app/utils/status.js`
- Modify: `app/utils/status.test.js`
- Modify: `server/list-adapters.js`
- Modify: `server/list-adapters.test.js`
- Modify: `server/validators.js`
- Modify: `server/validators.test.js`
- Modify: `server/ws.js`
- Modify: `server/ws.mutations.test.js`

- [ ] **Step 1: status/server contract 테스트를 먼저 추가**

먼저 `deferred`를 아직 모르는 현재 구현이 실패하도록 아래 테스트를 추가한다.

1. `STATUSES` 가 `['open', 'in_progress', 'deferred', 'resolved', 'closed']`
   순서를 가진다.
2. `statusLabel('deferred') === 'Deferred'` 이다.
3. `mapSubscriptionToBdArgs({ type: 'deferred-issues' })` 가
   `['list', '--json', '--tree=false', '--status', 'deferred', '--limit', '1000']`
   를 반환한다.
4. `validateSubscribeListPayload()` 가 `deferred-issues` 를 허용한다.
5. `update-status` 가 `deferred` payload 를 받아 `bd update --status deferred`
   로 전달한다.

핵심 테스트 예시:

```js
test('maps deferred subscription to bd list deferred', () => {
  expect(mapSubscriptionToBdArgs({ type: 'deferred-issues' })).toEqual([
    'list',
    '--json',
    '--tree=false',
    '--status',
    'deferred',
    '--limit',
    '1000'
  ]);
});
```

- [ ] **Step 2: focused server/status tests만 먼저 실행해 실패를 확인**

Run:

```bash
npx vitest run \
  app/utils/status.test.js \
  server/list-adapters.test.js \
  server/validators.test.js \
  server/ws.mutations.test.js
```

Expected:

- `deferred` 관련 expectation FAIL
- subscription type unknown 또는 status validation FAIL

- [ ] **Step 3: canonical status + server contract를 최소 구현으로 맞춘다**

구현 포인트:

- `app/utils/status.js`
  - `STATUSES` 에 `deferred` 를 `resolved` 앞에 추가
  - `statusLabel()` switch 에 `Deferred` 추가
- `server/list-adapters.js`
  - `deferred-issues` case 추가
- `server/validators.js`
  - `SUBSCRIPTION_TYPES` 에 `deferred-issues` 추가
- `server/ws.js`
  - `allowed` set 및 bad_request 메시지에 `deferred` 포함

구현 스케치:

```js
export const STATUSES = [
  'open',
  'in_progress',
  'deferred',
  'resolved',
  'closed'
];
```

```js
case 'deferred-issues': {
  return [
    'list',
    '--json',
    '--tree=false',
    '--status',
    'deferred',
    '--limit',
    '1000'
  ];
}
```

- [ ] **Step 4: focused server/status tests를 다시 실행**

Run:

```bash
npx vitest run \
  app/utils/status.test.js \
  server/list-adapters.test.js \
  server/validators.test.js \
  server/ws.mutations.test.js
```

Expected: PASS

---

### Task 2: board Deferred 토글 column과 session-local state 추가

**Files:**

- Modify: `app/state.js`
- Modify: `app/state.test.js`
- Modify: `app/main.js`
- Modify: `app/data/providers.js`
- Modify: `app/data/list-selectors.js`
- Modify: `app/views/board.js`
- Modify: `app/styles.css`
- Modify: `app/views/board.test.js`
- Modify: `app/views/board.persist.test.js`

- [ ] **Step 1: board state/UX 테스트를 먼저 추가**

아래 계약을 테스트로 먼저 고정한다.

1. board 기본 렌더에서는 Deferred 컬럼이 보이지 않는다.
2. board 상단 control 영역에 `Deferred (N)` 버튼이 항상 보인다.
3. 버튼 클릭 시 Deferred 컬럼이 나타나고 다시 클릭하면 숨는다.
4. `tab:board:deferred` store snapshot 개수가 버튼 count와 column count 둘 다에
   반영된다.
5. `board.show_deferred_column` 은 store에는 저장되지만 localStorage persistence
   대상은 아니다.
6. Deferred 컬럼이 보일 때 drag/drop target 으로 동작한다.

핵심 테스트 예시:

```js
test('toggles deferred column from board header button', async () => {
  await view.load();

  const button = mount.querySelector('.board-deferred-toggle');
  expect(mount.querySelector('#deferred-col')).toBeNull();

  button.click();
  expect(mount.querySelector('#deferred-col')).toBeTruthy();

  button.click();
  expect(mount.querySelector('#deferred-col')).toBeNull();
});
```

- [ ] **Step 2: board-focused tests를 먼저 실행해 실패를 확인**

Run:

```bash
npx vitest run \
  app/state.test.js \
  app/views/board.test.js \
  app/views/board.persist.test.js
```

Expected:

- `show_deferred_column` state missing FAIL
- `Deferred (N)` button / column / drag-drop expectation FAIL

- [ ] **Step 3: state + board view + board subscription wiring을 구현**

구현 포인트:

- `app/state.js`
  - `BoardState` 에 `show_deferred_column: boolean` 추가
  - 기본값은 `false`
  - shallow equality check에 새 필드 포함
- `app/main.js`
  - board view 진입 시 `tab:board:deferred` subscription/store 추가
  - board view 이탈 시 unsubscribe/unregister 추가
  - `clearAndResubscribe()` 와 `storeIds` 목록에도 deferred 반영
  - board localStorage persistence는 기존 `closed_filter` 만 유지
- `app/data/providers.js`
  - `updateIssue()` 의 status union/JSDoc을 `deferred` 포함으로 확장
- `app/data/list-selectors.js`
  - board/list selector typing surface가 deferred column/store를 수용하도록 JSDoc 정리
- `app/views/board.js`
  - `COLUMN_STATUS_MAP` 에 `deferred-col: 'deferred'` 추가
  - `list_deferred` 와 `show_deferred_column` derived state 추가
  - `Deferred (N)` 버튼을 기존 closed filter와 같은 header control group에 배치
  - `show_deferred_column` 이 true일 때만 `Deferred` 컬럼 렌더
  - total count 계산/store refresh 경로에 deferred 반영
  - `Deferred (N)` count는 board 진입 직후 `tab:board:deferred` snapshot으로 즉시 확보되도록 유지
- `app/styles.css`
  - board header control row에서 closed filter와 deferred toggle이 함께 정렬되도록 스타일 보강
  - deferred toggle active state와 deferred status badge가 기존 badge 톤과 충돌하지 않게 최소 스타일 추가

구현 스케치:

```js
const show_deferred_column =
  Boolean(store?.getState().board?.show_deferred_column);

const deferred_count = list_deferred.length;
```

```js
store.setState({
  board: { show_deferred_column: !show_deferred_column }
});
```

- [ ] **Step 4: board-focused tests를 다시 실행**

Run:

```bash
npx vitest run \
  app/state.test.js \
  app/views/board.test.js \
  app/views/board.persist.test.js
```

Expected: PASS

---

### Task 3: issues list/detail routing과 status controls에 deferred 반영

**Files:**

- Modify: `app/main.js`
- Modify: `app/data/providers.js`
- Modify: `app/data/list-selectors.js`
- Create: `app/main.deferred-status.test.js`
- Modify: `app/views/detail.js`
- Modify: `app/views/detail.test.js`
- Modify: `app/views/issue-row.js`
- Modify: `app/views/list.js`
- Modify: `app/views/list.test.js`

- [ ] **Step 1: issues view routing/status control 테스트를 먼저 추가**

아래 계약을 테스트로 먼저 고정한다.

1. issues status filter dropdown에 `Deferred` 가 보인다.
2. `deferred` 단일 filter 선택 시 `tab:issues` 가 아니라
   `tab:issues:deferred` / `deferred-issues` subscription 이 사용된다.
3. `open + deferred` 같이 다중 선택 시 `tab:issues` 결과와
   `tab:issues:deferred` 결과가 merge 된다.
4. detail status select 와 issue row inline status select 둘 다 `deferred` 옵션을
   보여준다.
5. localStorage filter 복원 경로가 `deferred` 를 유효 값으로 유지한다.

핵심 테스트 예시:

```js
test('subscribes to deferred aux store and merges open plus deferred', async () => {
  toggleFilter(0, 'Open');
  toggleFilter(0, 'Deferred');

  expect(subscribeCalls).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        payload: expect.objectContaining({
          id: 'tab:issues:deferred',
          type: 'deferred-issues'
        })
      })
    ])
  );
});
```

- [ ] **Step 2: issues view focused tests를 먼저 실행해 실패를 확인**

Run:

```bash
npx vitest run \
  app/main.deferred-status.test.js \
  app/views/detail.test.js \
  app/views/list.test.js
```

Expected:

- deferred filter option / subscription wiring FAIL
- detail/row status option expectation FAIL

- [ ] **Step 3: issues routing과 status UI를 구현**

구현 포인트:

- `app/main.js`
  - persisted filter valid set에 `deferred` 추가
  - `computeIssuesSpec()` 에 `deferred` 단일 선택 → `deferred-issues`
  - issues view 전용 `needs_aux_deferred` 계산과 `tab:issues:deferred` register/subscribe/unsubscribe 경로를 분리 명시
  - board view 전용 `tab:board:deferred` register/subscribe/unsubscribe 경로와 cleanup 목록을 분리 유지
  - `clearAndResubscribe()` / workspace switch store unregister 목록에 deferred IDs를 모두 반영
- `app/data/providers.js`
  - `updateIssue()` status patch JSDoc이 UI select와 같은 union을 공유하도록 정리
- `app/data/list-selectors.js`
  - board/list selector return surface가 deferred store merge와 충돌하지 않게 typing/JSDoc을 맞춘다
- `app/main.deferred-status.test.js`
  - deferred 단일 filter, `open + deferred` merge, board deferred subscription 생성/정리 케이스를 별도 파일에서 검증
- `app/views/list.js`
  - status filter 옵션 배열에 `deferred` 추가
  - `selectIssuesForCurrentFilters()` 가 aux deferred store를 merge 하도록 확장
- `app/views/detail.js`, `app/views/issue-row.js`, `app/views/list.js`, `app/views/board.js`
  - `STATUSES` 기반 select와 board/status patch surface가 새 status를 그대로 노출하게 회귀 확인
  - 흩어진 JSDoc status union/patch surface에 `deferred` 를 명시적으로 추가

구현 스케치:

```js
if (status_filters.length === 1 && st === 'deferred') {
  return { type: 'deferred-issues' };
}
```

```js
const needs_aux_deferred =
  status_filters.includes('deferred') &&
  !(status_filters.length === 1 && status_filters[0] === 'deferred');
```

- [ ] **Step 4: issues view focused tests를 다시 실행**

Run:

```bash
npx vitest run \
  app/main.deferred-status.test.js \
  app/views/detail.test.js \
  app/views/list.test.js
```

Expected: PASS

---

### Task 4: 전체 board/list/status regression 정리와 finish verification

**Files:**

- Modify: `app/data/providers.js`
- Modify: `app/data/list-selectors.js`
- Modify: `app/views/board.js`
- Modify: `app/views/board.test.js`
- Modify: `app/views/list.js`
- Modify: `app/views/list.test.js`
- Modify: `app/views/detail.js`
- Modify: `app/views/detail.test.js`
- Modify: `app/main.js`
- Modify: `server/list-adapters.js`
- Modify: `server/validators.js`
- Modify: `server/ws.js`
- Modify: `docs/superpowers/plans/2026-04-22-deferred-board-column.md` (검증 결과만 필요 시 업데이트)

- [ ] **Step 1: Deferred drag/drop + merged filters + count edge case 테스트를 보강**

추가로 아래 edge case를 고정한다.

1. Deferred 컬럼이 숨김일 때는 drop target 으로 사용되지 않는다.
2. Deferred 컬럼 표시 중 다른 컬럼으로 이동하면 status가 올바르게 바뀐다.
3. `ready + deferred` 또는 `open + deferred` 같이 섞인 filters 에서 중복 issue id가
   한 번만 렌더된다.
4. Deferred 버튼 count는 컬럼이 숨겨져도 유지된다.
5. board 첫 진입 snapshot 이후 `Deferred (N)` count가 별도 추가 fetch 없이 즉시 보인다.

- [ ] **Step 2: touched test suites를 실행한다**

Run:

```bash
npx vitest run \
  app/utils/status.test.js \
  app/state.test.js \
  app/main.deferred-status.test.js \
  app/views/board.test.js \
  app/views/board.persist.test.js \
  app/views/detail.test.js \
  app/views/list.test.js \
  server/list-adapters.test.js \
  server/validators.test.js \
  server/ws.mutations.test.js
```

Expected: PASS

- [ ] **Step 3: full repository verification을 실행한다**

Run:

```bash
npm run tsc
npm test
npm run lint
npx prettier --check \
  app/main.js \
  app/state.js \
  app/utils/status.js \
  app/utils/status.test.js \
  app/data/providers.js \
  app/data/list-selectors.js \
  app/views/board.js \
  app/views/board.test.js \
  app/views/board.persist.test.js \
  app/views/detail.js \
  app/views/detail.test.js \
  app/views/issue-row.js \
  app/views/list.js \
  app/views/list.test.js \
  server/list-adapters.js \
  server/list-adapters.test.js \
  server/validators.js \
  server/validators.test.js \
  server/ws.js \
  server/ws.mutations.test.js \
  docs/superpowers/plans/2026-04-22-deferred-board-column.md
```

Expected:

- `npm run tsc` PASS
- `npm test` PASS
- `npm run lint` PASS
- targeted Prettier check PASS

- [ ] **Step 4: plan 범위 최종 대조**

최종 확인 항목:

- board 기본 5컬럼 + Deferred 토글 확장이 spec과 일치하는지
- `resolved` UX가 유지되는지
- list/detail/board status 변경 경로가 모두 `deferred` 를 허용하는지
- `show_deferred_column` 이 localStorage에 저장되지 않는지
- 새로운 subscription IDs (`tab:board:deferred`, `tab:issues:deferred`) 가 정리된
  cleanup path를 가지는지
