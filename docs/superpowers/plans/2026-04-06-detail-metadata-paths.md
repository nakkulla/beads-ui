# Detail Metadata Paths Implementation Plan

Parent bead: UI-tuxb

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show `spec_id`, `metadata.plan`, and `metadata.handoff` as read-only
paths in the issue detail sidebar when those values exist.

**Architecture:** Keep the change entirely inside the detail view. Extend the
detail payload typedef to acknowledge `spec_id` and the `metadata` object,
normalize the three path values with a small local helper, and render a
dedicated `Metadata` props card only when at least one value exists. Add narrow
CSS for row layout and truncation without changing the server or protocol shape.

**Tech Stack:** lit-html, vitest, vanilla JS DOM API, existing detail view CSS

**Spec:** `docs/superpowers/specs/2026-04-06-detail-metadata-paths-design.md`

---

## File Structure

| File                       | Action | Responsibility                                                                                  |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `app/views/detail.js`      | Modify | Extend `IssueDetail` typing, normalize metadata paths, render `Metadata` section in the sidebar |
| `app/styles.css`           | Modify | Add metadata row/value layout and truncation styles for the detail sidebar                      |
| `app/views/detail.test.js` | Modify | Cover metadata section render/hide/title behavior                                               |

---

### Task 1: Detail view metadata rendering tests

**Files:**

- Modify: `app/views/detail.test.js`
- Verify against: `app/views/detail.js`

- [ ] **Step 1: Write the failing tests**

Add these tests near the other sidebar/detail rendering tests in
`app/views/detail.test.js`:

```js
test('renders metadata paths in sidebar when values exist', async () => {
  document.body.innerHTML =
    '<section class="panel"><div id="mount"></div></section>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

  const issue = {
    id: 'UI-120',
    title: 'Has metadata',
    dependencies: [],
    dependents: [],
    spec_id:
      'docs/superpowers/specs/2026-04-06-detail-metadata-paths-design.md',
    metadata: {
      plan: 'docs/superpowers/plans/2026-04-06-detail-metadata-paths.md',
      handoff: 'docs/handoffs/2026-04-06_12-00-00_detail-metadata.md'
    }
  };

  const stores = {
    snapshotFor(id) {
      return id === 'detail:UI-120' ? [issue] : [];
    },
    subscribe() {
      return () => {};
    }
  };

  const view = createDetailView(mount, async () => ({}), undefined, stores);
  await view.load('UI-120');

  const metadataCard = Array.from(mount.querySelectorAll('.props-card')).find(
    (card) => card.textContent?.includes('Metadata')
  );

  expect(metadataCard).toBeTruthy();
  expect(metadataCard && metadataCard.textContent).toContain('Spec');
  expect(metadataCard && metadataCard.textContent).toContain('Plan');
  expect(metadataCard && metadataCard.textContent).toContain('Handoff');
  expect(metadataCard && metadataCard.textContent).toContain(
    'docs/superpowers/specs/2026-04-06-detail-metadata-paths-design.md'
  );
  expect(metadataCard && metadataCard.textContent).toContain(
    'docs/superpowers/plans/2026-04-06-detail-metadata-paths.md'
  );
  expect(metadataCard && metadataCard.textContent).toContain(
    'docs/handoffs/2026-04-06_12-00-00_detail-metadata.md'
  );
});

test('hides metadata section when all metadata paths are missing', async () => {
  document.body.innerHTML =
    '<section class="panel"><div id="mount"></div></section>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

  const issue = {
    id: 'UI-121',
    title: 'No metadata',
    dependencies: [],
    dependents: []
  };

  const stores = {
    snapshotFor(id) {
      return id === 'detail:UI-121' ? [issue] : [];
    },
    subscribe() {
      return () => {};
    }
  };

  const view = createDetailView(mount, async () => ({}), undefined, stores);
  await view.load('UI-121');

  expect(mount.textContent || '').not.toContain('Metadata');
  expect(mount.textContent || '').not.toContain('Spec');
  expect(mount.textContent || '').not.toContain('Plan');
  expect(mount.textContent || '').not.toContain('Handoff');
});

test('renders only present metadata values and keeps full path in title', async () => {
  document.body.innerHTML =
    '<section class="panel"><div id="mount"></div></section>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

  const planPath =
    'docs/superpowers/plans/2026-04-06-detail-metadata-paths-with-a-very-long-name-for-truncation.md';
  const issue = {
    id: 'UI-122',
    title: 'Partial metadata',
    dependencies: [],
    dependents: [],
    spec_id: '   ',
    metadata: {
      plan: planPath,
      handoff: null
    }
  };

  const stores = {
    snapshotFor(id) {
      return id === 'detail:UI-122' ? [issue] : [];
    },
    subscribe() {
      return () => {};
    }
  };

  const view = createDetailView(mount, async () => ({}), undefined, stores);
  await view.load('UI-122');

  expect(mount.textContent || '').toContain('Metadata');
  expect(mount.textContent || '').toContain('Plan');
  expect(mount.textContent || '').not.toContain('Spec');
  expect(mount.textContent || '').not.toContain('Handoff');

  const value = /** @type {HTMLElement|null} */ (
    mount.querySelector('.metadata-path__value')
  );
  expect(value).toBeTruthy();
  expect(value && value.getAttribute('title')).toBe(planPath);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/views/detail.test.js` Expected: FAIL because the
current detail sidebar does not render a `Metadata` section or
`.metadata-path__value` element.

- [ ] **Step 3: Confirm the failing assertions point at missing metadata UI**

Expected failures should mention at least one of these:

- missing `Metadata` text
- missing `Spec` / `Plan` / `Handoff` labels
- missing `.metadata-path__value`

If the failure is unrelated, fix the test setup before changing implementation.

- [ ] **Step 4: Mark task complete**

Do not change implementation in this task. The goal is to lock the expected DOM
behavior first.

---

### Task 2: Implement metadata section in `detail.js`

**Files:**

- Modify: `app/views/detail.js`
- Verify with: `app/views/detail.test.js`

- [ ] **Step 1: Extend the detail payload typedef**

Update the `IssueDetail` typedef near the top of `app/views/detail.js` to
include `spec_id` and `metadata`:

```js
/**
 * @typedef {Object} IssueDetail
 * @property {string} id
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [design]
 * @property {string} [acceptance]
 * @property {string} [notes]
 * @property {string} [status]
 * @property {(string|null)} [close_reason]
 * @property {string} [assignee]
 * @property {number} [priority]
 * @property {string[]} [labels]
 * @property {string} [spec_id]
 * @property {{ plan?: string | null, handoff?: string | null }} [metadata]
 * @property {Dependency[]} [dependencies]
 * @property {Dependency[]} [dependents]
 * @property {Comment[]} [comments]
 */
```

- [ ] **Step 2: Add a small metadata path normalizer**

Place this helper near the other local helpers in `app/views/detail.js`:

```js
/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizePath(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : '';
}
```

- [ ] **Step 3: Render the metadata section in the sidebar**

Inside `detailTemplate(issue)`, compute the three normalized values and create a
conditional card before dependencies:

```js
const spec_value = normalizePath(issue.spec_id);
const plan_value = normalizePath(issue.metadata?.plan);
const handoff_value = normalizePath(issue.metadata?.handoff);

const metadata_rows = [
  { label: 'Spec', value: spec_value },
  { label: 'Plan', value: plan_value },
  { label: 'Handoff', value: handoff_value }
].filter((entry) => entry.value.length > 0);

const metadata_block =
  metadata_rows.length > 0
    ? html`<div class="props-card metadata-paths">
        <div class="props-card__title">Metadata</div>
        <div class="metadata-paths__list">
          ${metadata_rows.map(
            (entry) =>
              html`<div class="metadata-path">
                <div class="metadata-path__label">${entry.label}</div>
                <div class="metadata-path__value" title=${entry.value}>
                  ${entry.value}
                </div>
              </div>`
          )}
        </div>
      </div>`
    : null;
```

Then insert the block in the sidebar between `labels_block` and
`depsSection(...)`:

```js
              ${labels_block}
              ${metadata_block}
              ${depsSection('Dependencies', issue.dependencies || [])}
              ${depsSection('Dependents', issue.dependents || [])}
```

- [ ] **Step 4: Run the focused tests**

Run: `npx vitest run app/views/detail.test.js` Expected: PASS — all existing
detail tests plus the new metadata tests pass.

- [ ] **Step 5: Mark task complete**

Manual `git commit` steps are omitted from this plan. Use the repo's autocommit
workflow unless an explicit manual commit is requested.

---

### Task 3: Add metadata layout styles and run targeted verification

**Files:**

- Modify: `app/styles.css`
- Verify with: `app/views/detail.test.js`

- [ ] **Step 1: Add metadata layout styles**

Add these rules near the other detail sidebar styles in `app/styles.css`:

```css
#detail-root .metadata-paths__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

#detail-root .metadata-path {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

#detail-root .metadata-path__label {
  font-size: 12px;
  color: var(--muted);
}

#detail-root .metadata-path__value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
}
```

- [ ] **Step 2: Re-run the focused detail tests**

Run: `npx vitest run app/views/detail.test.js` Expected: PASS — CSS changes do
not affect DOM assertions.

- [ ] **Step 3: Run the repo validation commands required before handoff**

Run these commands from the repo root:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

Expected:

- `npm run tsc` exits 0
- `npm test` exits 0
- `npm run lint` exits 0
- `npm run prettier:write` formats files without introducing errors

- [ ] **Step 4: Re-run the focused detail tests after prettier**

Run: `npx vitest run app/views/detail.test.js` Expected: PASS — formatting did
not alter behavior.

- [ ] **Step 5: Mark task complete**

At this point the feature is ready for implementation review or execution
handoff.

---

## Self-Review Checklist

- **Spec coverage:** The plan covers sidebar location, conditional display,
  value normalization, truncate/title behavior, and no server/protocol changes.
- **Placeholder scan:** No TODO/TBD markers remain; each task has exact files,
  commands, and expected outcomes.
- **Type consistency:** The plan consistently uses `spec_id`, `metadata.plan`,
  `metadata.handoff`, `normalizePath`, `metadata_block`, and
  `.metadata-path__value` across tests and implementation.
