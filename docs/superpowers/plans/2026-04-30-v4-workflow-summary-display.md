# v4 Workflow Summary Display Implementation Plan
Parent bead: UI-uf7m

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show v4 workflow contract metadata on Board cards and in the Issue detail sidebar without exposing run ledger/evidence artifact links.

**Architecture:** Add one small helper module that normalizes workflow metadata, formats timestamps/durations, and derives board/detail display rows from the issue object. The Board and Detail views import that helper and render only safe, canonical values; styles are isolated from existing label badges.

**Tech Stack:** ECMAScript modules, lit-html, JSDoc type annotations, Vitest/jsdom, existing CSS in `app/styles.css`.

skill_workflow=none
skill_workflow_reason=Application UI change only; no skill artifacts are created or modified.
execution_lane=plan

---

## File structure

- Create `app/utils/workflow-summary.js`: canonical metadata normalization, timestamp/duration formatting, safe PR URL parsing, and issue-to-summary derivation.
- Create `app/utils/workflow-summary.test.js`: focused unit coverage for duration, timestamp, URL, enum normalization, and derived summary behavior.
- Modify `app/views/detail.js`: extend `IssueDetail.metadata`, import `workflowSummaryFromIssue`, and render a `Workflow summary` card when the helper returns rows.
- Modify `app/views/detail.test.js`: verify full summary rendering, safe PR link attributes, partial metadata rendering, and hidden empty summary.
- Modify `app/views/board.js`: extend `IssueLite.metadata`, import helper functions, and render workflow chips for canonical lane/skill/PR metadata.
- Modify `app/views/board.test.js`: verify workflow chips from push-store and fallback data paths, invalid metadata suppression, and unchanged label badge behavior.
- Modify `app/styles.css`: add `.workflow-chip*` and `.workflow-summary*` styles that are visually distinct from `.label-badge`.
- Modify `docs/superpowers/specs/2026-04-30-v4-workflow-summary-display-design.md`: already updated with spec-review clarifications for PR number-only behavior and board metadata preservation.

## Task 1: Workflow summary helper

**Files:**
- Create: `app/utils/workflow-summary.js`
- Create: `app/utils/workflow-summary.test.js`

- [ ] **Step 1: Write failing helper tests**

Add `app/utils/workflow-summary.test.js` with tests for:

```js
import { describe, expect, test } from 'vitest';
import {
  formatWorkflowDuration,
  formatWorkflowTimestamp,
  normalizeExecutionLane,
  normalizeSkillWorkflow,
  parseWorkflowTimestamp,
  safeWorkflowUrl,
  workflowSummaryFromIssue
} from './workflow-summary.js';

describe('workflow summary utils', () => {
  test('normalizes canonical execution lanes only', () => {
    expect(normalizeExecutionLane('plan')).toBe('plan');
    expect(normalizeExecutionLane('quick_edit')).toBe('quick_edit');
    expect(normalizeExecutionLane('Plan')).toBeNull();
    expect(normalizeExecutionLane('')).toBeNull();
    expect(normalizeExecutionLane(null)).toBeNull();
  });

  test('normalizes canonical skill workflow values only', () => {
    expect(normalizeSkillWorkflow('none')).toBe('none');
    expect(normalizeSkillWorkflow('writing_skills')).toBe('writing_skills');
    expect(normalizeSkillWorkflow('skill_creator')).toBe('skill_creator');
    expect(normalizeSkillWorkflow('skill-related')).toBeNull();
    expect(normalizeSkillWorkflow(' skill_creator ')).toBeNull();
  });

  test('parses only finite string timestamps', () => {
    expect(parseWorkflowTimestamp('2026-04-30T06:00:00Z')).toBe(Date.parse('2026-04-30T06:00:00Z'));
    expect(parseWorkflowTimestamp('not a date')).toBeNull();
    expect(parseWorkflowTimestamp(123)).toBeNull();
  });

  test('formats compact durations', () => {
    expect(formatWorkflowDuration(Date.parse('2026-04-30T00:00:00Z'), Date.parse('2026-04-30T00:00:45Z'))).toBe('45s');
    expect(formatWorkflowDuration(Date.parse('2026-04-30T00:00:00Z'), Date.parse('2026-04-30T00:07:03Z'))).toBe('7m 3s');
    expect(formatWorkflowDuration(Date.parse('2026-04-30T00:00:00Z'), Date.parse('2026-04-30T02:14:59Z'))).toBe('2h 14m');
    expect(formatWorkflowDuration(Date.parse('2026-04-30T00:00:00Z'), Date.parse('2026-05-01T03:59:00Z'))).toBe('1d 3h');
    expect(formatWorkflowDuration(Date.parse('2026-04-30T00:00:00Z'), Date.parse('2026-04-30T00:00:00Z'))).toBe('0s');
    expect(formatWorkflowDuration(Date.parse('2026-04-30T00:01:00Z'), Date.parse('2026-04-30T00:00:00Z'))).toBeNull();
  });

  test('formats local timestamps with date and minute precision', () => {
    expect(formatWorkflowTimestamp(Date.parse('2026-04-30T06:05:00Z'))).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });

  test('allows only safe http and https PR URLs', () => {
    expect(safeWorkflowUrl('https://github.com/nakkulla/beads-ui/pull/92')?.href).toBe('https://github.com/nakkulla/beads-ui/pull/92');
    expect(safeWorkflowUrl('http://example.test/pr/1')?.href).toBe('http://example.test/pr/1');
    expect(safeWorkflowUrl('/relative')).toBeNull();
    expect(safeWorkflowUrl('javascript:alert(1)')).toBeNull();
  });

  test('derives workflow summary rows and board chips from canonical metadata', () => {
    const summary = workflowSummaryFromIssue({
      metadata: {
        run_started_at: '2026-04-30T06:00:00Z',
        run_finished_at: '2026-04-30T06:46:38Z',
        pr_url: 'https://github.com/nakkulla/beads-ui/pull/92',
        pr_number: 92,
        execution_lane: 'plan',
        skill_workflow: 'skill_creator'
      }
    });

    expect(summary.detail_rows.map((row) => row.label)).toEqual([
      'Duration',
      'Started',
      'Finished',
      'PR',
      'Lane',
      'Skill workflow'
    ]);
    expect(summary.board_chips.map((chip) => chip.label)).toEqual(['plan', 'skill_creator', 'PR']);
  });

  test('omits PR row and chip when only pr_number is present', () => {
    const summary = workflowSummaryFromIssue({
      metadata: {
        pr_number: 92,
        execution_lane: 'quick_edit',
        skill_workflow: 'none'
      }
    });

    expect(summary.detail_rows.some((row) => row.label === 'PR')).toBe(false);
    expect(summary.board_chips.map((chip) => chip.label)).toEqual(['quick_edit']);
  });
});
```

- [ ] **Step 2: Run helper tests and confirm failure**

Run:

```bash
npm test -- app/utils/workflow-summary.test.js
```

Expected: FAIL because `app/utils/workflow-summary.js` does not exist yet.

- [ ] **Step 3: Implement helper**

Create `app/utils/workflow-summary.js` with exported functions named in the spec. Use exact-string enum checks, string-only timestamp parsing, `new URL()` with `http:`/`https:` protocol filtering, compact duration formatting, local `YYYY-MM-DD HH:mm` timestamp formatting, and `workflowSummaryFromIssue(issue)` returning:

```js
{
  detail_rows: Array<{ label: string, value: string, kind?: 'link', href?: string }>,
  board_chips: Array<{ label: string, kind: 'lane'|'skill'|'pr' }>
}
```

Keep `skill_workflow='none'` visible in detail rows but hidden from board chips.

- [ ] **Step 4: Run helper tests and commit**

Run:

```bash
npm test -- app/utils/workflow-summary.test.js
```

Expected: PASS.

Commit:

```bash
git add app/utils/workflow-summary.js app/utils/workflow-summary.test.js
git commit -m "workflow summary helper 추가"
```

## Task 2: Detail Workflow summary card

**Files:**
- Modify: `app/views/detail.js`
- Modify: `app/views/detail.test.js`

- [ ] **Step 1: Write failing detail tests**

Add focused tests to `app/views/detail.test.js`:

```js
test('renders workflow summary from contract metadata', async () => {
  document.body.innerHTML = '<section class="panel"><div id="mount"></div></section>';
  const mount = document.getElementById('mount');
  const issue = {
    id: 'UI-92',
    title: 'Workflow issue',
    dependencies: [],
    dependents: [],
    metadata: {
      run_started_at: '2026-04-30T06:00:00Z',
      run_finished_at: '2026-04-30T06:46:38Z',
      pr_url: 'https://github.com/nakkulla/beads-ui/pull/92',
      pr_number: 92,
      plan: 'docs/superpowers/plans/2026-04-30-v4-workflow-summary-display.md',
      execution_lane: 'plan',
      skill_workflow: 'none'
    }
  };
  const stores = { snapshotFor: (id) => (id === 'detail:UI-92' ? [issue] : []), subscribe: () => () => {} };
  const view = createDetailView(mount, async () => ({}), undefined, stores);

  await view.load('UI-92');

  const card = mount.querySelector('.workflow-summary');
  expect(card?.textContent).toContain('Workflow summary');
  expect(card?.textContent).toContain('Duration');
  expect(card?.textContent).toContain('46m 38s');
  expect(card?.textContent).toContain('Lane');
  expect(card?.textContent).toContain('plan');
  expect(card?.textContent).toContain('Skill workflow');
  expect(card?.textContent).toContain('none');
  const link = card?.querySelector('a');
  expect(link?.textContent).toBe('PR #92');
  expect(link?.getAttribute('href')).toBe('https://github.com/nakkulla/beads-ui/pull/92');
  expect(link?.getAttribute('target')).toBe('_blank');
  expect(link?.getAttribute('rel')).toBe('noreferrer noopener');
  const side_titles = Array.from(mount.querySelectorAll('.detail-side .props-card__title')).map((el) => el.textContent?.trim());
  expect(side_titles.indexOf('Workflow summary')).toBeGreaterThan(-1);
  expect(side_titles.indexOf('Metadata')).toBeGreaterThan(-1);
  expect(side_titles.indexOf('Workflow summary')).toBeLessThan(side_titles.indexOf('Metadata'));
});

test('renders partial workflow summary and hides unsafe PR links', async () => {
  document.body.innerHTML = '<section class="panel"><div id="mount"></div></section>';
  const mount = document.getElementById('mount');
  const issue = {
    id: 'UI-93',
    title: 'Partial workflow issue',
    dependencies: [],
    dependents: [],
    metadata: {
      pr_url: 'javascript:alert(1)',
      pr_number: 93,
      execution_lane: 'quick_edit'
    }
  };
  const stores = { snapshotFor: (id) => (id === 'detail:UI-93' ? [issue] : []), subscribe: () => () => {} };
  const view = createDetailView(mount, async () => ({}), undefined, stores);

  await view.load('UI-93');

  const card = mount.querySelector('.workflow-summary');
  expect(card?.textContent).toContain('Lane');
  expect(card?.textContent).toContain('quick_edit');
  expect(card?.textContent).not.toContain('PR #93');
  expect(card?.querySelector('a')).toBeNull();
});

test('hides workflow summary when metadata has no displayable values', async () => {
  document.body.innerHTML = '<section class="panel"><div id="mount"></div></section>';
  const mount = document.getElementById('mount');
  const issue = {
    id: 'UI-94',
    title: 'No workflow issue',
    dependencies: [],
    dependents: [],
    metadata: {
      run_started_at: 'not a date',
      execution_lane: 'Plan',
      skill_workflow: ''
    }
  };
  const stores = { snapshotFor: (id) => (id === 'detail:UI-94' ? [issue] : []), subscribe: () => () => {} };
  const view = createDetailView(mount, async () => ({}), undefined, stores);

  await view.load('UI-94');

  expect(mount.querySelector('.workflow-summary')).toBeNull();
});
```

- [ ] **Step 2: Run detail tests and confirm failure**

Run:

```bash
npm test -- app/views/detail.test.js
```

Expected: FAIL because the detail card is not rendered yet.

- [ ] **Step 3: Implement detail rendering**

In `app/views/detail.js`, import `workflowSummaryFromIssue`, extend the `IssueDetail.metadata` JSDoc shape with `run_started_at`, `run_finished_at`, `pr_url`, `pr_number`, `execution_lane`, and `skill_workflow`, compute `const workflow_summary = workflowSummaryFromIssue(issue)`, and render a `Workflow summary` props card before the existing Metadata card when `detail_rows.length > 0`.

- [ ] **Step 4: Run detail/helper tests and commit**

Run:

```bash
npm test -- app/utils/workflow-summary.test.js app/views/detail.test.js
```

Expected: PASS.

Commit:

```bash
git add app/views/detail.js app/views/detail.test.js
git commit -m "이슈 상세 workflow summary 표시"
```

## Task 3: Board workflow chips and styles

**Files:**
- Modify: `app/views/board.js`
- Modify: `app/views/board.test.js`
- Modify: `app/styles.css`

- [ ] **Step 1: Write failing board tests**

Add tests to `app/views/board.test.js` that cover push-store and fallback data paths:

```js
test('renders workflow chips from board card metadata', async () => {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = document.getElementById('m');
  const issueStores = createTestIssueStores();
  issueStores.getStore('tab:board:ready').applyPush({
    type: 'snapshot',
    id: 'tab:board:ready',
    revision: 1,
    issues: [{
      id: 'WF-1',
      title: 'workflow card',
      created_at: Date.parse('2026-04-30T06:00:00Z'),
      labels: ['has:spec'],
      metadata: {
        execution_lane: 'plan',
        skill_workflow: 'skill_creator',
        pr_url: 'https://github.com/nakkulla/beads-ui/pull/92'
      }
    }]
  });
  const view = createBoardView(mount, null, () => {}, createStore(), undefined, issueStores);

  await view.load();

  const card = mount.querySelector('[data-issue-id="WF-1"]');
  expect(Array.from(card.querySelectorAll('.workflow-chip')).map((el) => el.textContent?.trim())).toEqual(['plan', 'skill_creator', 'PR']);
  expect(card.querySelector('.label-badge')?.textContent).toBe('has:spec');
});

test('suppresses workflow chips for invalid metadata values', async () => {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = document.getElementById('m');
  const issueStores = createTestIssueStores();
  issueStores.getStore('tab:board:ready').applyPush({
    type: 'snapshot',
    id: 'tab:board:ready',
    revision: 1,
    issues: [{
      id: 'WF-2',
      title: 'invalid workflow card',
      created_at: Date.parse('2026-04-30T06:00:00Z'),
      metadata: {
        execution_lane: 'Plan',
        skill_workflow: 'none',
        pr_url: 'data:text/html,<h1>x</h1>'
      }
    }]
  });
  const view = createBoardView(mount, null, () => {}, createStore(), undefined, issueStores);

  await view.load();

  expect(mount.querySelector('[data-issue-id="WF-2"] .workflow-chip')).toBeNull();
});

test('preserves workflow metadata in fallback fetch mode', async () => {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = document.getElementById('m');
  const view = createBoardView(
    mount,
    {
      async getReady() {
        return [{
          id: 'WF-3',
          title: 'fallback workflow card',
          created_at: Date.parse('2026-04-30T06:00:00Z'),
          metadata: { execution_lane: 'quick_edit', skill_workflow: 'writing_skills' }
        }];
      },
      async getBlocked() { return []; },
      async getInProgress() { return []; },
      async getResolved() { return []; },
      async getClosed() { return []; }
    },
    () => {},
    undefined,
    { selectors: { getIds: () => [], count: () => 0 } },
    undefined
  );

  await view.load();

  expect(Array.from(mount.querySelectorAll('[data-issue-id="WF-3"] .workflow-chip')).map((el) => el.textContent?.trim())).toEqual(['quick_edit', 'writing_skills']);
});
```

- [ ] **Step 2: Run board tests and confirm failure**

Run:

```bash
npm test -- app/views/board.test.js
```

Expected: FAIL because workflow chips are not rendered yet.

- [ ] **Step 3: Implement board chips**

In `app/views/board.js`, import `workflowSummaryFromIssue`, extend `IssueLite.metadata` JSDoc for the three board fields, compute `const workflow_chips = workflowSummaryFromIssue(it).board_chips`, and render them between label badges and `.board-card__meta` as:

```js
workflow_chips.length > 0
  ? html`<div class="board-card__workflow">${workflow_chips.map((chip) => html`<span class=${`workflow-chip workflow-chip--${chip.kind}`}>${chip.label}</span>`)}</div>`
  : ''
```

Do not change label badge filtering or table row rendering.

- [ ] **Step 4: Add isolated styles**

In `app/styles.css`, add styles for `.board-card__workflow`, `.workflow-chip`, `.workflow-chip--lane`, `.workflow-chip--skill`, `.workflow-chip--pr`, `.workflow-summary`, `.workflow-summary__row`, `.workflow-summary__label`, and `.workflow-summary__value`. Keep these separate from `.label-badge`.

- [ ] **Step 5: Run board/detail/helper tests and commit**

Run:

```bash
npm test -- app/utils/workflow-summary.test.js app/views/detail.test.js app/views/board.test.js
```

Expected: PASS.

Commit:

```bash
git add app/views/board.js app/views/board.test.js app/styles.css
git commit -m "보드 workflow chip 표시"
```

## Task 4: Final validation and metadata

This task is the final regression gate after the focused red-green loops in Tasks 1-3; do not use it as a substitute for watching the focused tests fail before implementation.

**Files:**
- Modify: `docs/superpowers/specs/2026-04-30-v4-workflow-summary-display-design.md`
- Modify: `docs/superpowers/plans/2026-04-30-v4-workflow-summary-display.md`
- Beads metadata: `UI-uf7m.metadata.plan`, `UI-uf7m.labels`

- [ ] **Step 1: Run focused verification**

Run:

```bash
npm test -- app/utils/workflow-summary.test.js app/views/detail.test.js app/views/board.test.js
```

Expected: PASS.

- [ ] **Step 2: Run repo validation**

Run:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

Expected: all commands pass. If `prettier:write` changes files, inspect the diff and commit formatting-only changes with the relevant touched source/tests.

- [ ] **Step 3: Commit plan/spec metadata if needed**

Commit the plan and spec-review clarification changes if they are not already committed:

```bash
git add docs/superpowers/specs/2026-04-30-v4-workflow-summary-display-design.md docs/superpowers/plans/2026-04-30-v4-workflow-summary-display.md
git commit -m "workflow summary 구현 계획 추가"
```

- [ ] **Step 4: Confirm no out-of-scope UI additions**

Inspect the final diff and verify:

- No run ledger/evidence artifact link is rendered.
- `app/views/issue-row.js`, List rows, Epics rows, Worker PR panel, and backend RPCs are unchanged unless a test exposed required metadata preservation work.
- `metadata.audit_artifact`, `metadata.run_ledger`, `metadata.skill_related`, `metadata.skill_creator_required`, and `metadata.skill_eval_fast_path` are not used as primary UI sources.

## Self-review

- Spec coverage: helper normalization, detail card, board chips, URL safety, timestamp/duration behavior, invalid metadata suppression, no ledger link, and existing label/path UI preservation are covered by tasks.
- Placeholder scan: no TBD/TODO/fill-in placeholders remain; tests and commands are concrete.
- Type consistency: helper returns `detail_rows` and `board_chips`; view tasks use those exact property names.
- Skill workflow check: no skill artifacts are touched; header records `skill_workflow=none` and `execution_lane=plan`.
