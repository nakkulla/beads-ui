# Card Labels & Created Date Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display `has:` and `reviewed:` prefix labels as colored badges and
issue creation date as relative time on board cards and list/epic rows.

**Architecture:** Two new utility modules (`label-badge.js`, `relative-time.js`)
following existing badge/util patterns (DOM element factories).
`relative-time.js` accepts both epoch-ms and ISO string timestamps for
compatibility with existing view/test data. Board card template gets a label
row + date in meta. List and epic table headers gain Labels + Created columns.
CSS additions for label badge colors (light + dark themes). Existing
board/list/epics tests are updated to cover the new rendering and column order.

**Tech Stack:** lit-html, vitest, vanilla JS DOM API

**Spec:** `docs/superpowers/specs/2026-04-03-card-labels-and-date-design.md`

---

## File Structure

| File                                | Action | Responsibility                                                                                               |
| ----------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `app/utils/relative-time.js`        | Create | `formatRelativeTime(timestamp)` — epoch ms or ISO string → relative time string                              |
| `app/utils/relative-time.test.js`   | Create | Unit tests for relative time boundary values                                                                 |
| `app/utils/label-badge.js`          | Create | `filterCardLabels(labels)` — filter `has:`/`reviewed:` labels; `createLabelBadge(label)` — DOM badge element |
| `app/utils/label-badge.test.js`     | Create | Unit tests for filtering and badge creation                                                                  |
| `app/styles.css`                    | Modify | Add `.label-badge`, `.board-card__labels`, `.board-card__date` styles                                        |
| `app/views/board.js`                | Modify | Add `labels` to `IssueLite` typedef; add label row + date to `cardTemplate()`                                |
| `app/views/issue-row.js`            | Modify | Add `labels`, `created_at` to `IssueRowData` typedef; add Labels + Created `<td>` cells                      |
| `app/views/list.js`                 | Modify | Add Labels + Created to colgroup + thead (7→9 columns)                                                       |
| `app/views/epics.js`                | Modify | Add Labels + Created to colgroup + thead (6→8 columns)                                                       |
| `app/views/board.test.js`           | Modify | Cover label/date rendering and mixed timestamp inputs on board cards                                         |
| `app/views/list.test.js`            | Modify | Cover Labels/Created columns and filtered badge rendering in issue rows                                      |
| `app/views/list.navigation.test.js` | Modify | Update column-position selectors affected by inserted Labels column                                          |
| `app/views/epics.test.js`           | Modify | Cover Labels/Created columns and mixed timestamp inputs in epic rows                                         |

---

### Task 1: `relative-time.js` — Utility + Tests

**Files:**

- Create: `app/utils/relative-time.js`
- Create: `app/utils/relative-time.test.js`

- [ ] **Step 1: Write the failing tests**

Create `app/utils/relative-time.test.js`:

```js
import { describe, expect, test } from 'vitest';
import { formatRelativeTime } from './relative-time.js';

describe('utils/relative-time', () => {
  const NOW = 1712100000000; // fixed reference point

  function rt(ms_ago) {
    return formatRelativeTime(NOW - ms_ago, NOW);
  }

  test('returns empty string for empty input', () => {
    expect(formatRelativeTime(0)).toBe('');
    expect(formatRelativeTime(null)).toBe('');
    expect(formatRelativeTime(undefined)).toBe('');
  });

  test('parses ISO string timestamps', () => {
    expect(formatRelativeTime('2024-04-02T23:20:00.000Z', NOW)).toBe('방금');
  });

  test('returns empty string for invalid timestamps', () => {
    expect(formatRelativeTime('not-a-date', NOW)).toBe('');
  });

  test('future timestamps show "방금"', () => {
    expect(formatRelativeTime(NOW + 60000, NOW)).toBe('방금');
  });

  test('seconds ago shows "방금"', () => {
    expect(rt(0)).toBe('방금');
    expect(rt(59_000)).toBe('방금');
  });

  test('minutes ago', () => {
    expect(rt(60_000)).toBe('1분 전');
    expect(rt(59 * 60_000)).toBe('59분 전');
  });

  test('hours ago', () => {
    expect(rt(60 * 60_000)).toBe('1시간 전');
    expect(rt(23 * 60 * 60_000)).toBe('23시간 전');
  });

  test('days ago', () => {
    expect(rt(24 * 60 * 60_000)).toBe('1일 전');
    expect(rt(6 * 24 * 60 * 60_000)).toBe('6일 전');
  });

  test('weeks ago', () => {
    expect(rt(7 * 24 * 60 * 60_000)).toBe('1주 전');
    expect(rt(27 * 24 * 60 * 60_000)).toBe('3주 전');
  });

  test('months ago', () => {
    expect(rt(30 * 24 * 60 * 60_000)).toBe('1개월 전');
    expect(rt(335 * 24 * 60 * 60_000)).toBe('11개월 전');
  });

  test('years ago', () => {
    expect(rt(365 * 24 * 60 * 60_000)).toBe('1년 전');
    expect(rt(730 * 24 * 60 * 60_000)).toBe('2년 전');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/utils/relative-time.test.js` Expected: FAIL — module
`./relative-time.js` not found.

- [ ] **Step 3: Write the implementation**

Create `app/utils/relative-time.js`:

```js
/**
 * Format a timestamp as a Korean relative time string.
 *
 * @param {number | string | null | undefined} timestamp
 * @param {number} [now] - current time in ms (defaults to Date.now(), injectable for tests)
 * @returns {string}
 */
export function formatRelativeTime(timestamp, now) {
  if (!timestamp) return '';
  const ref = typeof now === 'number' ? now : Date.now();
  const parsed =
    typeof timestamp === 'number' ? timestamp : Date.parse(timestamp);
  if (!Number.isFinite(parsed)) return '';

  const diff = ref - parsed;
  if (diff < 60_000) return '방금';

  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(diff / 86_400_000);
  if (days < 7) return `${days}일 전`;

  const weeks = Math.floor(days / 7);
  if (days < 30) return `${weeks}주 전`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;

  const years = Math.floor(days / 365);
  return `${years}년 전`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run app/utils/relative-time.test.js` Expected: all tests PASS.

- [ ] **Step 5: Mark task complete**

Manual `git commit` steps are omitted from this plan. Use the repo's autocommit
workflow unless an explicit manual commit is requested.

---

### Task 2: `label-badge.js` — Utility + Tests

**Files:**

- Create: `app/utils/label-badge.js`
- Create: `app/utils/label-badge.test.js`

- [ ] **Step 1: Write the failing tests**

Create `app/utils/label-badge.test.js`:

```js
import { describe, expect, test } from 'vitest';
import { createLabelBadge, filterCardLabels } from './label-badge.js';

describe('utils/label-badge', () => {
  describe('filterCardLabels', () => {
    test('keeps has: and reviewed: prefixes', () => {
      const input = ['has:spec', 'reviewed:plan', 'area:auth', 'has:plan'];
      expect(filterCardLabels(input)).toEqual([
        'has:spec',
        'reviewed:plan',
        'has:plan'
      ]);
    });

    test('returns empty array for no matches', () => {
      expect(filterCardLabels(['area:auth', 'component:api'])).toEqual([]);
    });

    test('handles undefined and null', () => {
      expect(filterCardLabels(undefined)).toEqual([]);
      expect(filterCardLabels(null)).toEqual([]);
    });

    test('handles empty array', () => {
      expect(filterCardLabels([])).toEqual([]);
    });
  });

  describe('createLabelBadge', () => {
    test('creates span with label-badge class', () => {
      const el = createLabelBadge('has:spec');
      expect(el.tagName).toBe('SPAN');
      expect(el.classList.contains('label-badge')).toBe(true);
    });

    test('adds has modifier for has: prefix', () => {
      const el = createLabelBadge('has:plan');
      expect(el.classList.contains('label-badge--has')).toBe(true);
      expect(el.textContent).toBe('has:plan');
    });

    test('adds reviewed modifier for reviewed: prefix', () => {
      const el = createLabelBadge('reviewed:code');
      expect(el.classList.contains('label-badge--reviewed')).toBe(true);
      expect(el.textContent).toBe('reviewed:code');
    });

    test('sets title and aria-label', () => {
      const el = createLabelBadge('has:spec');
      expect(el.getAttribute('title')).toBe('has:spec');
      expect(el.getAttribute('aria-label')).toBe('Label: has:spec');
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/utils/label-badge.test.js` Expected: FAIL — module
`./label-badge.js` not found.

- [ ] **Step 3: Write the implementation**

Create `app/utils/label-badge.js`:

```js
/** @type {ReadonlyArray<string>} */
const CARD_PREFIXES = ['has:', 'reviewed:'];

/**
 * Filter labels to only those shown on cards/rows (has: and reviewed: prefixes).
 *
 * @param {string[] | null | undefined} labels
 * @returns {string[]}
 */
export function filterCardLabels(labels) {
  if (!Array.isArray(labels)) return [];
  return labels.filter((l) =>
    CARD_PREFIXES.some((prefix) => l.startsWith(prefix))
  );
}

/**
 * Create a compact badge element for a label.
 * Follows the same DOM-element factory pattern as createTypeBadge.
 *
 * @param {string} label
 * @returns {HTMLSpanElement}
 */
export function createLabelBadge(label) {
  const el = document.createElement('span');
  el.className = 'label-badge';

  const prefix = label.startsWith('has:')
    ? 'has'
    : label.startsWith('reviewed:')
      ? 'reviewed'
      : null;
  if (prefix) {
    el.classList.add(`label-badge--${prefix}`);
  }

  el.setAttribute('title', label);
  el.setAttribute('aria-label', `Label: ${label}`);
  el.textContent = label;
  return el;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run app/utils/label-badge.test.js` Expected: all tests PASS.

- [ ] **Step 5: Mark task complete**

---

### Task 3: CSS — Label Badge & Date Styles

**Files:**

- Modify: `app/styles.css`

- [ ] **Step 1: Add label badge CSS variables to the light theme `:root`**

Find the existing `:root` block (near line 1, before the dark theme media query
at line 671). Add after the existing badge variables (around line 668):

```css
/* Label badges (card/row) */
--label-has-fg: #16a34a;
--label-has-border: color-mix(in srgb, #16a34a 35%, transparent);
--label-reviewed-fg: #2563eb;
--label-reviewed-border: color-mix(in srgb, #2563eb 35%, transparent);
```

- [ ] **Step 2: Add dark theme overrides**

Find the dark theme media query at line 1387
(`@media (prefers-color-scheme: dark)`). Add inside the `:root` block:

```css
--label-has-fg: #4ade80;
--label-has-border: color-mix(in srgb, #4ade80 30%, transparent);
--label-reviewed-fg: #60a5fa;
--label-reviewed-border: color-mix(in srgb, #60a5fa 30%, transparent);
```

- [ ] **Step 3: Add label-badge component styles**

Insert after the `.badge + .badge` block (after line 611):

```css
/* Label badge (smaller variant for cards/rows) */
.label-badge {
  display: inline-block;
  padding: 0 5px;
  line-height: 16px;
  height: 16px;
  border-radius: var(--badge-radius);
  font-size: 10px;
  font-weight: 600;
  vertical-align: middle;
  user-select: none;
  border: 1px solid;
  text-wrap: nowrap;
}
.label-badge--has {
  color: var(--label-has-fg);
  border-color: var(--label-has-border);
  background: color-mix(in srgb, var(--label-has-fg) 8%, transparent);
}
.label-badge--reviewed {
  color: var(--label-reviewed-fg);
  border-color: var(--label-reviewed-border);
  background: color-mix(in srgb, var(--label-reviewed-fg) 8%, transparent);
}
.label-badge + .label-badge {
  margin-left: var(--space-1);
}
```

- [ ] **Step 4: Add board card label row and date styles**

Insert after `.board-card__meta` block (after line 1351):

```css
.board-card__labels {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
  margin-top: var(--space-2);
}
.board-card__date {
  margin-left: auto;
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
}
```

- [ ] **Step 5: Add list/epics date cell style**

Insert after the board card date styles:

```css
.date-cell {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
}
```

- [ ] **Step 6: Mark task complete**

---

### Task 4: Board Card — Labels + Date in `cardTemplate`

**Files:**

- Modify: `app/views/board.js:10-20` (typedef)
- Modify: `app/views/board.js:181-202` (cardTemplate)
- Modify: `app/views/board.js` (imports, near top)

- [ ] **Step 1: Add imports**

At the top of `app/views/board.js`, find the existing imports (look for
`import { createTypeBadge }` and similar). Add these two imports:

```js
import { createLabelBadge, filterCardLabels } from '../utils/label-badge.js';
import { formatRelativeTime } from '../utils/relative-time.js';
```

- [ ] **Step 2: Update `IssueLite` typedef**

Change the typedef at lines 10-21 from:

```js
/**
 * @typedef {{
 *   id: string,
 *   title?: string,
 *   status?: 'open'|'in_progress'|'resolved'|'closed',
 *   priority?: number,
 *   issue_type?: string,
 *   created_at?: number,
 *   updated_at?: number,
 *   closed_at?: number
 * }} IssueLite
 */
```

to:

```js
/**
 * @typedef {{
 *   id: string,
 *   title?: string,
 *   status?: 'open'|'in_progress'|'resolved'|'closed',
 *   priority?: number,
 *   issue_type?: string,
 *   labels?: string[],
 *   created_at?: number | string,
 *   updated_at?: number,
 *   closed_at?: number
 * }} IssueLite
 */
```

- [ ] **Step 3: Update `cardTemplate` to render labels and date**

Replace the `cardTemplate` function body (lines 181-202) with:

```js
function cardTemplate(it) {
  const card_labels = filterCardLabels(it.labels);
  return html`
    <article
      class="board-card"
      data-issue-id=${it.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${(/** @type {MouseEvent} */ ev) => onCardClick(ev, it.id)}
      @dragstart=${(/** @type {DragEvent} */ ev) => onDragStart(ev, it.id)}
      @dragend=${onDragEnd}
    >
      <div class="board-card__title text-truncate">
        ${it.title || '(no title)'}
      </div>
      ${card_labels.length > 0
        ? html`<div class="board-card__labels">
            ${card_labels.map((l) => createLabelBadge(l))}
          </div>`
        : ''}
      <div class="board-card__meta">
        ${createTypeBadge(it.issue_type)} ${createPriorityBadge(it.priority)}
        ${createIssueIdRenderer(it.id, { class_name: 'mono' })}
        ${it.created_at
          ? html`<span
              class="board-card__date"
              title=${new Date(it.created_at).toISOString()}
              >${formatRelativeTime(it.created_at)}</span
            >`
          : ''}
      </div>
    </article>
  `;
}
```

- [ ] **Step 4: Add board rendering tests**

Update `app/views/board.test.js` to verify:

- cards render only `has:`/`reviewed:` labels as `.label-badge`
- cards without matching labels omit the labels row
- relative time text renders for both numeric and ISO string `created_at` inputs

- [ ] **Step 5: Verify board renders**

Run: `npm start` (or your dev server) and open the board view. Confirm:

- Cards with `has:`/`reviewed:` labels show colored badge row below title
- Cards without those labels show no extra row
- Relative time appears right-aligned in the meta row

- [ ] **Step 6: Mark task complete**

---

### Task 5: Issue Row — Labels + Created Columns

**Files:**

- Modify: `app/views/issue-row.js:1-10` (imports + typedef)
- Modify: `app/views/issue-row.js:140-213` (rowTemplate)

- [ ] **Step 1: Add imports**

At the top of `app/views/issue-row.js`, add after the existing imports (after
line 6):

```js
import { createLabelBadge, filterCardLabels } from '../utils/label-badge.js';
import { formatRelativeTime } from '../utils/relative-time.js';
```

- [ ] **Step 2: Update `IssueRowData` typedef**

Change line 9 from:

```js
/**
 * @typedef {{ id: string, title?: string, status?: string, priority?: number, issue_type?: string, assignee?: string, dependency_count?: number, dependent_count?: number }} IssueRowData
 */
```

to:

```js
/**
 * @typedef {{ id: string, title?: string, status?: string, priority?: number, issue_type?: string, assignee?: string, labels?: string[], created_at?: number | string, dependency_count?: number, dependent_count?: number }} IssueRowData
 */
```

- [ ] **Step 3: Add Labels and Created `<td>` cells to `rowTemplate`**

In the `rowTemplate` function, insert **after** the Title `<td>` (after line 152
— `<td role="gridcell">${editableText(it.id, 'title', it.title || '')}</td>`)
and **before** the Status `<td>`:

```js
<td role="gridcell">
  ${filterCardLabels(it.labels).map((l) => createLabelBadge(l))}
</td>
```

Then insert **after** the Priority `<td>` (after line 185 — the closing
`</select></td>` of priority) and **before** the Deps `<td>`:

```js
      <td role="gridcell" class="date-cell"
        title=${it.created_at ? new Date(it.created_at).toISOString() : ''}
      >${it.created_at ? formatRelativeTime(it.created_at) : ''}</td>
```

- [ ] **Step 4: Add row rendering tests**

Update `app/views/list.test.js` and `app/views/epics.test.js` to verify:

- Labels and Created cells render in the expected positions
- Labels cells only contain filtered `has:`/`reviewed:` badges
- Created cells render relative time for both numeric and ISO string timestamps

- [ ] **Step 5: Mark task complete**

---

### Task 6: List View — Table Header Update

**Files:**

- Modify: `app/views/list.js:317-337`

- [ ] **Step 1: Update `aria-colcount`**

Change `aria-colcount="6"` (line 317) to `aria-colcount="9"`.

- [ ] **Step 2: Update `<colgroup>`**

Replace the colgroup (lines 319-327) with:

```html
<colgroup>
  <col style="width: 100px" />
  <col style="width: 120px" />
  <col />
  <col style="width: 140px" />
  <col style="width: 120px" />
  <col style="width: 160px" />
  <col style="width: 130px" />
  <col style="width: 90px" />
  <col style="width: 80px" />
</colgroup>
```

(Added `140px` for Labels after Title, and `90px` for Created before Deps.)

- [ ] **Step 3: Update `<thead>`**

Replace the thead (lines 328-337) with:

```html
<thead>
  <tr role="row">
    <th role="columnheader">ID</th>
    <th role="columnheader">Type</th>
    <th role="columnheader">Title</th>
    <th role="columnheader">Labels</th>
    <th role="columnheader">Status</th>
    <th role="columnheader">Assignee</th>
    <th role="columnheader">Priority</th>
    <th role="columnheader">Created</th>
    <th role="columnheader">Deps</th>
  </tr>
</thead>
```

- [ ] **Step 4: Update keyboard-navigation selectors**

Update any position-sensitive tests (for example
`app/views/list.navigation.test.js`) so the status select and other controls
point at the new column indexes after inserting Labels and Created.

- [ ] **Step 5: Mark task complete**

---

### Task 7: Epics View — Table Header Update

**Files:**

- Modify: `app/views/epics.js:119-137`

- [ ] **Step 1: Update `<colgroup>`**

Replace the colgroup (lines 120-127) with:

```html
<colgroup>
  <col style="width: 100px" />
  <col style="width: 120px" />
  <col />
  <col style="width: 140px" />
  <col style="width: 120px" />
  <col style="width: 160px" />
  <col style="width: 130px" />
  <col style="width: 90px" />
</colgroup>
```

(Added `140px` for Labels after Title, and `90px` for Created at end. Epics has
no Deps column.)

- [ ] **Step 2: Update `<thead>`**

Replace the thead (lines 128-137) with:

```html
<thead>
  <tr>
    <th>ID</th>
    <th>Type</th>
    <th>Title</th>
    <th>Labels</th>
    <th>Status</th>
    <th>Assignee</th>
    <th>Priority</th>
    <th>Created</th>
  </tr>
</thead>
```

- [ ] **Step 3: Mark task complete**

---

### Task 8: Full Test Suite + Manual Verification

**Files:**

- All test files

- [ ] **Step 1: Run repo-standard validation**

Run:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

Expected: all commands succeed, including the new utility tests and updated
board/list/epics view tests.

- [ ] **Step 2: Fix any failures**

If validation fails, update the affected tests and implementation with the
smallest necessary changes. In particular verify:

- new utility tests for `relative-time.js` and `label-badge.js`
- `board.test.js` coverage for label/date rendering
- `list.test.js` and `epics.test.js` coverage for Labels/Created cells
- `list.navigation.test.js` or any other position-sensitive selectors updated
  for the new column layout

- [ ] **Step 3: Manual verification**

Start the dev server and check:

1. **Board view**: cards with `has:spec`, `has:plan`, `reviewed:code` labels
   show green/blue badges. Cards without those labels have no extra row.
   Relative time visible in meta.
2. **List view**: Labels and Created columns visible. Labels column shows
   filtered badges. Created column shows relative time with ISO tooltip on
   hover.
3. **Epics view**: Same as list but without Deps column.
4. **Dark mode**: Toggle system theme or use DevTools. Verify label badge colors
   adapt.

- [ ] **Step 4: Mark task complete**
