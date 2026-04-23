# 최신순 정렬과 Deferred UI 정합성 정리 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** open 계열 list/board/epics/subscription snapshot을 최신 생성일 우선으로 통일하고, Deferred UI surface와 board 6컬럼 레이아웃 계약을 코드/테스트/문서까지 일치시킨다.

**Architecture:** 정렬 정책은 `app/data/sort.js`의 shared comparator를 source of truth로 유지하고, 이를 재사용하는 selectors/store/test/docs를 함께 갱신한다. Deferred UI는 canonical `STATUSES`를 유지한 채 detail/list/filter/badge style regression을 고정하고, board는 shared CSS variable 기반 최소폭 계약으로 5→6컬럼 재분배를 안정화한다.

**Tech Stack:** ECMAScript modules, Lit-style view rendering, Vitest, ESLint, TypeScript JSDoc checking, Prettier, bd CLI

---

## File Structure

- `app/data/sort.js` — open/closed shared comparator source of truth
- `app/data/list-selectors.js` — list/board/epic children selector sorting contract and JSDoc
- `app/data/subscription-issue-store.js` — subscription snapshot ordering that reuses the shared comparator
- `app/views/detail.js` — detail status select runtime wiring
- `app/views/issue-row.js` — inline status badge/select class contract
- `app/views/list.js` — filter dropdown + inline edit surface
- `app/views/board.js` — board column count/style contract consumer
- `app/styles.css` — `is-deferred` style and board min-width variable contract
- `docs/subscription-issue-store.md` — sorting policy documentation
- `app/data/list-selectors.test.js` — selector ordering regression coverage
- `app/data/subscription-issue-store.test.js` — snapshot ordering regression coverage
- `app/views/detail.test.js` — detail Deferred option/value/class contract
- `app/views/list.test.js` — list Deferred dropdown/inline select contract
- `app/views/board.test.js` — deferred column toggle + board layout contract coverage
- `server/ws.mutations.test.js` — verify existing `update-status` deferred contract only if UI/protocol drift appears during implementation

### Task 1: 최신순 shared sorting contract로 정렬 정책 전환

**Files:**
- Modify: `app/data/sort.js`
- Modify: `app/data/list-selectors.js`
- Modify: `app/data/subscription-issue-store.js`
- Test: `app/data/list-selectors.test.js`
- Test: `app/data/subscription-issue-store.test.js`

- [ ] **Step 1: open 계열 최신순 회귀 테스트를 먼저 추가한다**

```js
import { createListSelectors } from './list-selectors.js';

const issues = [
  { id: 'UI-1', status: 'open', priority: 0, created_at: '2026-04-20T00:00:00Z' },
  { id: 'UI-2', status: 'open', priority: 4, created_at: '2026-04-22T00:00:00Z' },
  { id: 'UI-3', status: 'closed', closed_at: 30 }
];

expect(selectors.selectIssuesFor('tab:issues').map((it) => it.id)).toEqual(['UI-2', 'UI-1']);
expect(selectors.selectBoardColumn('tab:board:closed', 'closed').map((it) => it.id)).toEqual(['UI-3']);
```

- [ ] **Step 2: subscription snapshot도 같은 sorting contract를 따르는지 failing test를 추가한다**

```js
const store = createSubscriptionIssueStore('tab:issues');
store.applyPush({
  type: 'snapshot',
  id: 'tab:issues',
  revision: 1,
  issues: [
    { id: 'UI-1', created_at: '2026-04-20T00:00:00Z', priority: 0 },
    { id: 'UI-2', created_at: '2026-04-22T00:00:00Z', priority: 4 }
  ]
});

expect(store.snapshot().map((it) => it.id)).toEqual(['UI-2', 'UI-1']);
```

- [ ] **Step 3: targeted tests를 실행해 현재 계약이 실패하는지 확인한다**

Run: `npm test -- app/data/list-selectors.test.js app/data/subscription-issue-store.test.js`
Expected: 최신 생성일 우선 assertion이 FAIL 한다.

- [ ] **Step 4: shared comparator를 created_at desc 중심으로 바꾸고 재사용 지점을 정리한다**

```js
export function cmpPriorityThenCreated(a, b) {
  const created_a = toSortableTimestamp(a.created_at);
  const created_b = toSortableTimestamp(b.created_at);
  if (created_a !== created_b) {
    return created_a < created_b ? 1 : -1;
  }

  const priority_a = a.priority ?? 2;
  const priority_b = b.priority ?? 2;
  if (priority_a !== priority_b) {
    return priority_a - priority_b;
  }

  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}
```

- [ ] **Step 5: selector/store 주석과 targeted tests를 갱신 후 다시 실행한다**

Run: `npm test -- app/data/list-selectors.test.js app/data/subscription-issue-store.test.js`
Expected: PASS

- [ ] **Step 6: task commit을 남긴다**

```bash
git add app/data/sort.js app/data/list-selectors.js app/data/subscription-issue-store.js app/data/list-selectors.test.js app/data/subscription-issue-store.test.js
git commit -m "feat: 최신순 정렬 공용 계약 갱신"
```

### Task 2: Deferred runtime surface regression을 detail/list/filter/style로 고정

**Files:**
- Modify: `app/views/detail.js`
- Modify: `app/views/issue-row.js`
- Modify: `app/views/list.js`
- Modify: `app/styles.css`
- Test: `app/views/detail.test.js`
- Test: `app/views/list.test.js`
- Verify only if drift found: `server/ws.mutations.test.js`

- [ ] **Step 1: detail/list Deferred surface를 고정하는 failing tests를 추가한다**

```js
expect(option_values).toContain('deferred');
expect(status_select.value).toBe('deferred');
expect(status_select.className).toContain('is-deferred');
expect(filter_labels).toContain('Deferred');
```

- [ ] **Step 2: targeted tests를 실행해 현재 regression gap을 확인한다**

Run: `npm test -- app/views/detail.test.js app/views/list.test.js`
Expected: `is-deferred` class/style 또는 surface-specific assertion 중 하나가 FAIL 한다.

- [ ] **Step 3: canonical status source는 유지하고 surface binding만 고정한다**

```js
const status_select = html`
  <select
    class="badge-select badge--status is-${current.status || 'open'}"
    @change=${onStatusChange}
  >
    ${STATUSES.map((status) => html`
      <option value=${status}>${statusLabel(status)}</option>
    `)}
  </select>
`;
```

```css
.status-badge.is-deferred,
.badge-select.badge--status.is-deferred {
  background: var(--badge-bg-deferred);
  color: var(--badge-fg-deferred);
}
```

- [ ] **Step 4: existing mutation contract와 충돌하지 않는지 필요 시 확인한다**

Run: `npm test -- app/views/detail.test.js app/views/list.test.js`
Expected: PASS

If UI 테스트 중 `update-status` drift가 의심되면 run: `npm test -- server/ws.mutations.test.js`
Expected: `update-status accepts deferred` PASS

- [ ] **Step 5: task commit을 남긴다**

```bash
git add app/views/detail.js app/views/issue-row.js app/views/list.js app/styles.css app/views/detail.test.js app/views/list.test.js
git commit -m "fix: deferred UI 회귀 계약 고정"
```

### Task 3: Board 6컬럼 레이아웃을 shared min-width variable로 재배치

**Files:**
- Modify: `app/views/board.js`
- Modify: `app/styles.css`
- Test: `app/views/board.test.js`

- [ ] **Step 1: board layout contract를 고정하는 failing test를 추가한다**

```js
const board_root = mount.querySelector('.board-root');
expect(board_root.style.getPropertyValue('--board-column-count')).toBe('6');
expect(getComputedStyle(board_root).gridTemplateColumns).toContain('var(--board-column-min-width)');
```

- [ ] **Step 2: deferred column toggle contract를 targeted run으로 확인한다**

Run: `npm test -- app/views/board.test.js`
Expected: shared min-width variable 또는 6-column redistribution assertion이 FAIL 한다.

- [ ] **Step 3: board minimum width를 shared CSS variable로 통일한다**

```css
:root {
  --board-column-min-width: 300px;
}

.board-root {
  grid-template-columns: repeat(
    var(--board-column-count, 5),
    minmax(var(--board-column-min-width), 1fr)
  );
}

.board-column {
  min-width: var(--board-column-min-width);
}

@media (max-width: 1100px) {
  .board-root {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: board targeted test를 다시 실행한다**

Run: `npm test -- app/views/board.test.js`
Expected: PASS

- [ ] **Step 5: task commit을 남긴다**

```bash
git add app/views/board.js app/styles.css app/views/board.test.js
git commit -m "fix: deferred board 6컬럼 폭 재분배"
```

### Task 4: 문서/verification/runtime evidence를 마무리한다

**Files:**
- Modify: `docs/subscription-issue-store.md`
- Modify if needed: `app/data/list-selectors.js`
- Modify if needed: `app/data/subscription-issue-store.js`

- [ ] **Step 1: sorting 문서를 최종 코드 계약과 맞춘다**

```md
## Ordering and Identity

- Default sort: `created_at` desc, then priority asc, then id asc.
- Closed-only views keep `closed_at` desc.
```

- [ ] **Step 2: full repository verification을 실행한다**

Run: `npm run lint && npm run tsc && npm test`
Expected: PASS

Run: `npm run prettier:write docs/superpowers/specs/2026-04-23-latest-first-sorting-and-deferred-ui-design.md docs/superpowers/plans/2026-04-23-latest-first-sorting-and-deferred-ui.md docs/subscription-issue-store.md app/data/sort.js app/data/list-selectors.js app/data/subscription-issue-store.js app/views/detail.js app/views/issue-row.js app/views/list.js app/views/board.js app/styles.css app/data/list-selectors.test.js app/data/subscription-issue-store.test.js app/views/detail.test.js app/views/list.test.js app/views/board.test.js`
Expected: touched files are formatted with no unintended unrelated repo churn.

- [ ] **Step 3: live/runtime surface를 직접 확인한다**

Run: `BDUI_FRONTEND_MODE=live bdui restart --host 127.0.0.1 --port 3001`
Expected: server restarts from the current worktree and serves the latest frontend source.

Manual checks:
- detail status select shows `Deferred`
- issues filter dropdown and inline status select still expose `Deferred`
- toggling Deferred column no longer causes `Closed` to jump out immediately in multi-column mode

- [ ] **Step 4: final docs/runtime commit을 남긴다**

```bash
git add docs/subscription-issue-store.md app/data/list-selectors.js app/data/subscription-issue-store.js
git add docs/superpowers/specs/2026-04-23-latest-first-sorting-and-deferred-ui-design.md docs/superpowers/plans/2026-04-23-latest-first-sorting-and-deferred-ui.md
git commit -m "docs: latest-first sorting 계획과 문서 정리"
```

## Self-Review

- **Spec coverage:** sorting / Deferred UI / board layout / docs / runtime verification / subscription store ordering까지 task에 모두 연결했다.
- **Placeholder scan:** TODO/TBD/“적절히 처리” 같은 placeholder를 쓰지 않았고, 각 task마다 명시적 파일/명령/expected output을 넣었다.
- **Type consistency:** comparator는 기존 `cmpPriorityThenCreated` symbol을 유지하되 내부 정책만 최신순으로 바꾸는 방향으로 문서화했다. Deferred는 기존 `STATUSES`와 `update-status` contract를 재사용한다.
- **Skill routing check:** skill artifact 변경은 없으므로 `superpowers:writing-skills`/`skill-creator`는 불필요하다.
