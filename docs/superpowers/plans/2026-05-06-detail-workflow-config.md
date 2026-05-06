# Detail Workflow Config Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build config-driven workflow sections in Detail, remove Board workflow chips, add exact-label policy, and make only route metadata editable through a validated Save flow.

**Architecture:** Add small workflow contract UI utilities owned by `beads-ui`; keep TOML config as display policy only. Server normalizes config and exposes it through bootstrap/API, while WebSocket route mutation validates enum/topology values and delegates to one `bd update` plus readback. Detail consumes the normalized config, renders read-only contract sections, and uses one explicit route-edit mutation.

**Tech Stack:** ECMAScript modules, lit-html, JSDoc type annotations, Vitest, `smol-toml`, existing `bd` CLI wrappers.

---

## Authority and reviewed baseline

- Bead: `UI-hjii`
- Reviewed spec: `docs/superpowers/specs/2026-05-05-detail-workflow-config-design.md`
- Reviewed spec SHA: `e382d98e23fa6e9a0e12740e72365fba5572a0d9`
- Reviewed spec hash: `8cd58b8a81e6f13b1e7e16f8ee7b282bc10b478eb55e576789330f48ca35e395`
- Gate evidence: external spec review `APPROVE_WITH_CHANGES`, fixes committed, compact self-review `APPROVE` recorded on `UI-hjii`.
- Worktree: `/Users/isy_macstudio/Documents/GitHub/beads-ui/.worktrees/UI-hjii`

## File structure

- Modify: `server/config.js` — normalize `labels.visible_exact` plus `detail.workflow_summary` sections/fields/editable fields.
- Modify: `server/app.js` — include full normalized config in bootstrap and `/api/config`.
- Modify: `app/state.js` and `app/main.js` — preserve normalized config client-side; pass store/config access to Detail.
- Modify: `app/utils/label-badge.js` — support prefix plus exact label filtering.
- Modify: `app/views/board.js`, `app/views/list.js`, `app/views/epics.js` — read prefix/exact config; remove Board workflow chip rendering.
- Create: `app/utils/workflow-fields.js` — app-owned field registry, topology derivation, section normalization, row builders, route payload validation helpers.
- Modify: `app/views/detail.js` — replace fixed workflow summary + metadata path card with config-driven workflow summary; add route edit/save/cancel and copy artifact UX.
- Modify: `app/protocol.js`, `app/ws.js` tests — add `update-route-metadata` message type and prove client allowlist accepts it.
- Modify: `server/ws.js` — add route metadata mutation handler.
- Modify tests: `server/config.test.js`, `app/state.test.js`, `app/main.config-refresh.test.js`, `app/utils/label-badge.test.js`, `app/views/board.test.js`, `app/views/list.test.js`, `app/views/epics.test.js`, `app/views/detail.test.js`, `app/views/detail.toast.test.js`, `server/ws.mutations.test.js`, `app/protocol.test.js`, `app/ws.test.js`.
- Do not modify: `CHANGES.md`.

## Defaults and constants

Use these constants consistently in server/client normalization and tests:

```js
const DEFAULT_VISIBLE_PREFIXES = ['has:', 'reviewed:'];
const DEFAULT_VISIBLE_EXACT = [];
const DEFAULT_WORKFLOW_SUMMARY_CONFIG = {
  sections: [
    'route',
    'artifacts',
    'review_gates',
    'freshness',
    'delivery',
    'followup',
    'human'
  ],
  route: {
    fields: [
      'execution_lane',
      'topology',
      'workspace_policy',
      'branch_policy',
      'finish_action'
    ],
    editable_fields: ['execution_lane', 'topology']
  },
  artifacts: { fields: ['spec_id', 'plan', 'handoff'] },
  review_gates: {
    fields: [
      'status',
      'verdict',
      'final_source',
      'external_attempts',
      'reviewed_at_sha',
      'content_hash'
    ]
  },
  freshness: {
    fields: [
      'execution_base_sha',
      'spec_freshness_checked_at_sha',
      'plan_freshness_checked_at_sha',
      'spec_handoff_at_sha',
      'spec_handoff_content_hash'
    ]
  },
  delivery: { fields: ['pr_url'] },
  followup: {
    fields: [
      'followup_kind',
      'source_repo',
      'source_bead',
      'source_artifact',
      'source_pr',
      'target_repo',
      'target_paths',
      'required_action'
    ]
  },
  human: { fields: ['human_decision_required'] }
};
```

---

### Task 1: Server config normalization

**Files:**
- Modify: `server/config.js`
- Modify: `server/config.test.js`

- [ ] **Step 1: Write failing config tests for exact labels and workflow defaults**

Add tests to `server/config.test.js`:

```js
test('reads visible exact labels from TOML', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'bdui-config-'));
  const file = path.join(dir, 'config.toml');
  writeFileSync(
    file,
    '[labels]\nvisible_prefixes = ["has:", "lane:"]\nvisible_exact = ["pr", "human", "skill-related"]\n'
  );

  const config = readRuntimeConfigForTest(file);

  expect(config.label_display_policy.visible_prefixes).toEqual([
    'has:',
    'lane:'
  ]);
  expect(config.label_display_policy.visible_exact).toEqual([
    'pr',
    'human',
    'skill-related'
  ]);
});

test('normalizes default workflow summary config', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'bdui-config-'));
  const file = path.join(dir, 'config.toml');
  writeFileSync(file, '');

  const config = readRuntimeConfigForTest(file);

  expect(config.detail.workflow_summary.sections).toEqual([
    'route',
    'artifacts',
    'review_gates',
    'freshness',
    'delivery',
    'followup',
    'human'
  ]);
  expect(config.detail.workflow_summary.route.fields).toContain('topology');
  expect(config.detail.workflow_summary.route.editable_fields).toEqual([
    'execution_lane',
    'topology'
  ]);
});

test('ignores unknown workflow section fields and non-editable edit config', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'bdui-config-'));
  const file = path.join(dir, 'config.toml');
  writeFileSync(
    file,
    '[detail.workflow_summary]\nsections = ["route", "bogus"]\n\n[detail.workflow_summary.route]\nfields = ["execution_lane", "bogus"]\neditable_fields = ["execution_lane", "workspace_policy", "bogus"]\n'
  );

  const config = readRuntimeConfigForTest(file);

  expect(config.detail.workflow_summary.sections).toEqual(['route']);
  expect(config.detail.workflow_summary.route.fields).toEqual([
    'execution_lane'
  ]);
  expect(config.detail.workflow_summary.route.editable_fields).toEqual([
    'execution_lane'
  ]);
});

test('keeps backward compatibility for prefix-only configs', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'bdui-config-'));
  const file = path.join(dir, 'config.toml');
  writeFileSync(file, '[labels]\nvisible_prefixes = ["has:"]\n');

  const config = readRuntimeConfigForTest(file);

  expect(config.label_display_policy.visible_prefixes).toEqual(['has:']);
  expect(config.label_display_policy.visible_exact).toEqual([]);
  expect(config.detail.workflow_summary.route.fields).toContain('topology');
});
```

- [ ] **Step 2: Run config tests and verify failure**

Run:

```bash
npm test -- server/config.test.js
```

Expected: tests fail because `visible_exact`, `detail.workflow_summary`, and/or `readRuntimeConfigForTest` export do not exist.

- [ ] **Step 3: Implement config normalization**

In `server/config.js`, export the test helper and add these helpers near existing prefix normalization:

```js
const DEFAULT_VISIBLE_EXACT = [];
const WORKFLOW_SECTION_FIELDS = {
  route: [
    'execution_lane',
    'topology',
    'workspace_policy',
    'branch_policy',
    'finish_action'
  ],
  artifacts: ['spec_id', 'plan', 'handoff'],
  review_gates: [
    'status',
    'verdict',
    'final_source',
    'external_attempts',
    'reviewed_at_sha',
    'content_hash'
  ],
  freshness: [
    'execution_base_sha',
    'spec_freshness_checked_at_sha',
    'plan_freshness_checked_at_sha',
    'spec_handoff_at_sha',
    'spec_handoff_content_hash'
  ],
  delivery: ['pr_url'],
  followup: [
    'followup_kind',
    'source_repo',
    'source_bead',
    'source_artifact',
    'source_pr',
    'target_repo',
    'target_paths',
    'required_action'
  ],
  human: ['human_decision_required']
};
const WORKFLOW_SECTIONS = Object.keys(WORKFLOW_SECTION_FIELDS);
const EDITABLE_WORKFLOW_FIELDS = {
  route: ['execution_lane', 'topology']
};

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeVisibleExact(value) {
  if (!Array.isArray(value)) {
    return DEFAULT_VISIBLE_EXACT.slice();
  }

  return value.filter((entry) => typeof entry === 'string' && entry.length > 0);
}

/**
 * @param {unknown} value
 * @param {string[]} allowed
 * @param {string[]} fallback
 */
function normalizeStringAllowlist(value, allowed, fallback) {
  if (!Array.isArray(value)) {
    return fallback.slice();
  }

  const allowed_set = new Set(allowed);
  /** @type {string[]} */
  const normalized = [];
  for (const entry of value) {
    if (
      typeof entry === 'string' &&
      allowed_set.has(entry) &&
      !normalized.includes(entry)
    ) {
      normalized.push(entry);
    }
  }
  return normalized;
}

/**
 * @param {any} parsed
 */
function normalizeWorkflowSummaryConfig(parsed) {
  const raw = parsed?.detail?.workflow_summary;
  const sections = normalizeStringAllowlist(
    raw?.sections,
    WORKFLOW_SECTIONS,
    WORKFLOW_SECTIONS
  );

  /** @type {Record<string, { fields: string[], editable_fields?: string[] }>} */
  const section_config = {};
  for (const section of WORKFLOW_SECTIONS) {
    const allowed_fields = WORKFLOW_SECTION_FIELDS[section] || [];
    const section_raw = raw?.[section];
    const fields = normalizeStringAllowlist(
      section_raw?.fields,
      allowed_fields,
      allowed_fields
    );
    const editable_fields = normalizeStringAllowlist(
      section_raw?.editable_fields,
      EDITABLE_WORKFLOW_FIELDS[section] || [],
      EDITABLE_WORKFLOW_FIELDS[section] || []
    );
    section_config[section] = editable_fields.length > 0 ? { fields, editable_fields } : { fields };
  }

  return { sections, ...section_config };
}

export const DEFAULT_WORKFLOW_SUMMARY_CONFIG = normalizeWorkflowSummaryConfig({});
```

Then update `readRuntimeConfig` return objects to include:

```js
label_display_policy: {
  visible_prefixes: normalizeVisiblePrefixes(parsed?.labels?.visible_prefixes),
  visible_exact: normalizeVisibleExact(parsed?.labels?.visible_exact)
},
detail: {
  workflow_summary: normalizeWorkflowSummaryConfig(parsed)
},
```

On fallback, return `visible_exact: []` and `detail.workflow_summary: normalizeWorkflowSummaryConfig({})`.

Export the test helper without changing production use:

```js
export const readRuntimeConfigForTest = readRuntimeConfig;
```

`server/app.js` will import `DEFAULT_WORKFLOW_SUMMARY_CONFIG` from `./config.js` for its absent-config fallback so bootstrap/API defaults stay aligned with server normalization.

- [ ] **Step 4: Run config tests and verify pass**

Run:

```bash
npm test -- server/config.test.js
```

Expected: all `server/config.test.js` tests pass.

- [ ] **Step 5: Commit config normalization**

Run:

```bash
git add server/config.js server/config.test.js
git commit -m "UI-hjii 설정 정규화 추가"
```

---

### Task 2: Bootstrap, state, and label display policy

**Files:**
- Modify: `server/app.js`
- Modify: `app/state.js`
- Modify: `app/main.js`
- Modify: `app/utils/label-badge.js`
- Modify: `server/app.test.js`
- Modify: `app/state.test.js`
- Modify: `app/main.config-refresh.test.js`
- Modify: `app/utils/label-badge.test.js`

- [ ] **Step 1: Write failing tests for bootstrap/state/label exact matching**

Add to `app/utils/label-badge.test.js`:

```js
test('filterVisibleLabels keeps prefix and exact matches', () => {
  const result = filterVisibleLabels(
    ['has:spec', 'lane:plan', 'pr', 'human', 'quick_edit', 'misc'],
    ['has:', 'lane:'],
    ['pr', 'human']
  );

  expect(result).toEqual(['has:spec', 'lane:plan', 'pr', 'human']);
});
```

Add to `app/state.test.js`:

```js
test('stores exact labels and workflow summary config', () => {
  const store = createStore({
    config: {
      label_display_policy: {
        visible_prefixes: ['lane:'],
        visible_exact: ['pr']
      },
      detail: {
        workflow_summary: {
          sections: ['route'],
          route: { fields: ['execution_lane'], editable_fields: ['execution_lane'] }
        }
      }
    }
  });

  const config = store.getState().config;

  expect(config.label_display_policy.visible_prefixes).toEqual(['lane:']);
  expect(config.label_display_policy.visible_exact).toEqual(['pr']);
  expect(config.detail.workflow_summary.sections).toEqual(['route']);
});
```

Add bootstrap/API assertions to `server/app.test.js` using the existing app test style:

```js
test('exposes exact labels and detail workflow config', async () => {
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: new URL('../app', import.meta.url).pathname,
    root_dir: process.cwd(),
    frontend_mode: 'live',
    label_display_policy: {
      visible_prefixes: ['has:'],
      visible_exact: ['pr']
    },
    detail: {
      workflow_summary: {
        sections: ['route'],
        route: { fields: ['execution_lane'], editable_fields: ['execution_lane'] }
      }
    }
  });

  const response = await request(app).get('/api/config');

  expect(response.body.label_display_policy.visible_exact).toEqual(['pr']);
  expect(response.body.detail.workflow_summary.sections).toEqual(['route']);
});

test('uses workflow summary defaults when detail config is absent', async () => {
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: new URL('../app', import.meta.url).pathname,
    root_dir: process.cwd(),
    frontend_mode: 'live',
    label_display_policy: { visible_prefixes: ['has:'], visible_exact: [] }
  });

  const response = await request(app).get('/api/config');

  expect(response.body.detail.workflow_summary.sections).toContain('route');
  expect(response.body.detail.workflow_summary.route.fields).toContain('topology');
});
```

- [ ] **Step 2: Run focused tests and verify failure**

Run:

```bash
npm test -- app/utils/label-badge.test.js app/state.test.js server/app.test.js app/main.config-refresh.test.js
```

Expected: failures show old config shape and two-argument label filter.

- [ ] **Step 3: Implement config propagation**

Update `server/app.js` `toBootstrapPayload(config)` to copy full config shape. First import the shared default:

```js
import { DEFAULT_WORKFLOW_SUMMARY_CONFIG } from './config.js';
```

Then normalize detail config:

```js
const visible_exact = Array.isArray(config.label_display_policy?.visible_exact)
  ? config.label_display_policy.visible_exact.slice()
  : [];
const detail = config.detail && typeof config.detail === 'object'
  ? structuredClone(config.detail)
  : { workflow_summary: DEFAULT_WORKFLOW_SUMMARY_CONFIG };
```

If `structuredClone` is not available in the test runtime, use JSON clone:

```js
const detail = config.detail && typeof config.detail === 'object'
  ? JSON.parse(JSON.stringify(config.detail))
  : { workflow_summary: DEFAULT_WORKFLOW_SUMMARY_CONFIG };
```

Return:

```js
return {
  label_display_policy: { visible_prefixes, visible_exact },
  workspace_config: { default_workspace },
  detail
};
```

Update JSDoc types in `server/app.js`, `app/state.js`, and `app/main.js` to include:

```js
/** @typedef {{ visible_prefixes: string[], visible_exact: string[] }} LabelDisplayPolicy */
/** @typedef {{ sections: string[], [section: string]: unknown }} WorkflowSummaryConfig */
/** @typedef {{ workflow_summary: WorkflowSummaryConfig }} DetailConfig */
```

Update `app/state.js` defaults and `normalizeConfig(input)` so missing `visible_exact` becomes `[]`, missing `detail.workflow_summary` becomes the app default, and `config_changed` compares prefixes, exact labels, workspace, and detail JSON string.

Update `app/main.js` `DEFAULT_CONFIG`, `readBootstrapConfig()`, and `refreshConfigSnapshot()` types to preserve `visible_exact` and `detail`.

- [ ] **Step 4: Implement exact label filtering**

Change `app/utils/label-badge.js`:

```js
/**
 * Filter labels using visible prefixes and exact matches.
 *
 * @param {string[] | null | undefined} labels
 * @param {string[] | null | undefined} visible_prefixes
 * @param {string[] | null | undefined} visible_exact
 * @returns {string[]}
 */
export function filterVisibleLabels(labels, visible_prefixes, visible_exact = []) {
  if (!Array.isArray(labels)) {
    return [];
  }
  const prefixes = Array.isArray(visible_prefixes) ? visible_prefixes : [];
  const exact = Array.isArray(visible_exact) ? visible_exact : [];

  return labels.filter(
    (label) =>
      exact.includes(label) || prefixes.some((prefix) => label.startsWith(prefix))
  );
}
```

Keep `filterCardLabels(labels)` backward compatible by calling `filterVisibleLabels(labels, CARD_PREFIXES, [])`.

- [ ] **Step 5: Run focused tests and verify pass**

Run:

```bash
npm test -- app/utils/label-badge.test.js app/state.test.js server/app.test.js app/main.config-refresh.test.js
```

Expected: focused tests pass.

- [ ] **Step 6: Commit config propagation and exact labels**

Run:

```bash
git add server/app.js app/state.js app/main.js app/utils/label-badge.js server/app.test.js app/state.test.js app/main.config-refresh.test.js app/utils/label-badge.test.js
git commit -m "UI-hjii 라벨 표시 정책 확장"
```

---

### Task 3: Remove Board workflow chips and update scan surfaces

**Files:**
- Modify: `app/views/board.js`
- Modify: `app/views/list.js`
- Modify: `app/views/epics.js`
- Modify: `app/views/board.test.js`
- Modify: `app/views/list.test.js`
- Modify: `app/views/epics.test.js`

- [ ] **Step 1: Write failing scan-surface tests**

Add to `app/views/board.test.js`:

```js
test('renders labels only and no workflow chips', async () => {
  document.body.innerHTML = '<div id="mount"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
  const store = {
    getState() {
      return {
        board: { closed_filter: 'today', show_deferred_column: false },
        config: {
          label_display_policy: {
            visible_prefixes: ['has:', 'lane:'],
            visible_exact: ['pr']
          }
        }
      };
    },
    setState() {},
    subscribe() {
      return () => {};
    }
  };
  const view = createBoardView(mount, async () => [], () => {}, store);

  await view.setItems([
    {
      id: 'UI-1',
      title: 'Workflow card',
      status: 'open',
      priority: 2,
      labels: ['has:spec', 'lane:plan', 'pr'],
      metadata: { execution_lane: 'plan', pr_url: 'https://example.com/pr/1' }
    }
  ]);

  expect(mount.querySelector('.board-card__workflow')).toBeNull();
  expect(Array.from(mount.querySelectorAll('.label-badge')).map((el) => el.textContent)).toEqual([
    'has:spec',
    'lane:plan',
    'pr'
  ]);
});
```

Add equivalent one-behavior assertions to `app/views/list.test.js` and `app/views/epics.test.js`: when config has `visible_exact: ['human']`, exact `human` label renders; unconfigured `quick_edit` does not render.

- [ ] **Step 2: Run scan tests and verify failure**

Run:

```bash
npm test -- app/views/board.test.js app/views/list.test.js app/views/epics.test.js
```

Expected: Board test fails because workflow chips still render and exact label config is not used in all views.

- [ ] **Step 3: Remove Board workflow chips**

In `app/views/board.js`:

- Remove `import { workflowSummaryFromIssue } from '../utils/workflow-summary.js';`
- Change config helper to return both arrays:

```js
function getVisibleLabelPolicy() {
  const policy = store?.getState?.().config?.label_display_policy;
  return {
    visible_prefixes: Array.isArray(policy?.visible_prefixes) ? policy.visible_prefixes : ['has:', 'reviewed:'],
    visible_exact: Array.isArray(policy?.visible_exact) ? policy.visible_exact : []
  };
}
```

- In `cardTemplate(it)`, replace old card label/chip code with:

```js
const label_policy = getVisibleLabelPolicy();
const card_labels = filterVisibleLabels(
  it.labels,
  label_policy.visible_prefixes,
  label_policy.visible_exact
);
```

- Delete `const workflow_chips = ...` and the `.board-card__workflow` template block.

- [ ] **Step 4: Update List and Epics label helpers**

In `app/views/list.js` and `app/views/epics.js`, replace prefix-only helper calls with:

```js
function getVisibleLabelPolicy() {
  const policy = store?.getState?.().config?.label_display_policy;
  return {
    visible_prefixes: Array.isArray(policy?.visible_prefixes) ? policy.visible_prefixes : ['has:', 'reviewed:'],
    visible_exact: Array.isArray(policy?.visible_exact) ? policy.visible_exact : []
  };
}
```

Call:

```js
const label_policy = getVisibleLabelPolicy();
const visible_labels = filterVisibleLabels(
  issue.labels,
  label_policy.visible_prefixes,
  label_policy.visible_exact
);
```

- [ ] **Step 5: Run scan tests and verify pass**

Run:

```bash
npm test -- app/views/board.test.js app/views/list.test.js app/views/epics.test.js
```

Expected: focused tests pass and no `.board-card__workflow` appears.

- [ ] **Step 6: Commit scan surface updates**

Run:

```bash
git add app/views/board.js app/views/list.js app/views/epics.js app/views/board.test.js app/views/list.test.js app/views/epics.test.js
git commit -m "UI-hjii 스캔 화면 라벨 정책 적용"
```

---

### Task 4: Workflow field registry utilities

**Files:**
- Create: `app/utils/workflow-fields.js`
- Create: `app/utils/workflow-fields.test.js`

- [ ] **Step 1: Write failing utility tests**

Create `app/utils/workflow-fields.test.js` with focused tests:

```js
import { describe, expect, test } from 'vitest';
import {
  buildWorkflowSections,
  deriveTopology,
  routeMutationValues,
  safeWorkflowUrl
} from './workflow-fields.js';

describe('workflow fields', () => {
  test('derives pr topology', () => {
    expect(
      deriveTopology({
        workspace_policy: 'worktree',
        branch_policy: 'feature',
        finish_action: 'pr'
      })
    ).toEqual({ kind: 'valid', value: 'pr' });
  });

  test('derives direct topology', () => {
    expect(
      deriveTopology({
        workspace_policy: 'current',
        branch_policy: 'same',
        finish_action: 'direct'
      })
    ).toEqual({ kind: 'valid', value: 'direct' });
  });

  test('reports invalid topology when route metadata conflicts', () => {
    expect(
      deriveTopology({
        workspace_policy: 'current',
        branch_policy: 'feature',
        finish_action: 'direct'
      })
    ).toEqual({ kind: 'invalid', value: null });
  });

  test('builds configured sections and hides absent values', () => {
    const sections = buildWorkflowSections(
      {
        id: 'UI-1',
        spec_id: 'docs/spec.md',
        labels: ['reviewed:spec'],
        metadata: {
          execution_lane: 'spec_backed',
          workspace_policy: 'worktree',
          branch_policy: 'feature',
          finish_action: 'pr',
          spec_review_verdict: 'APPROVE'
        }
      },
      {
        sections: ['route', 'artifacts', 'freshness'],
        route: { fields: ['execution_lane', 'topology'] },
        artifacts: { fields: ['spec_id', 'plan'] },
        freshness: { fields: ['execution_base_sha'] }
      }
    );

    expect(sections.map((section) => section.id)).toEqual(['route', 'artifacts']);
    expect(sections[0].rows.map((row) => row.id)).toEqual([
      'execution_lane',
      'topology'
    ]);
    expect(sections[1].rows.map((row) => row.id)).toEqual(['spec_id']);
  });

  test('rejects unsafe workflow URLs', () => {
    expect(safeWorkflowUrl('javascript:alert(1)')).toBeNull();
    expect(safeWorkflowUrl('/relative')).toBeNull();
    expect(safeWorkflowUrl('https://example.com/pr/1')?.href).toBe(
      'https://example.com/pr/1'
    );
  });

  test('builds route mutation values from selected lane and topology', () => {
    expect(routeMutationValues('plan', 'direct')).toEqual({
      execution_lane: 'plan',
      topology: 'direct'
    });
  });
});
```

- [ ] **Step 2: Run utility tests and verify failure**

Run:

```bash
npm test -- app/utils/workflow-fields.test.js
```

Expected: module missing.

- [ ] **Step 3: Implement workflow field utilities**

Create `app/utils/workflow-fields.js` with JSDoc types and these exported functions:

```js
const EXECUTION_LANES = ['quick_edit', 'spec_backed', 'plan'];
const TOPOLOGIES = {
  direct: {
    workspace_policy: 'current',
    branch_policy: 'same',
    finish_action: 'direct'
  },
  pr: {
    workspace_policy: 'worktree',
    branch_policy: 'feature',
    finish_action: 'pr'
  }
};
const SECTION_LABELS = {
  route: 'Route',
  artifacts: 'Artifacts',
  review_gates: 'Review gates',
  freshness: 'Freshness',
  delivery: 'Delivery',
  followup: 'Follow-up',
  human: 'Human blocker'
};
const FIELD_LABELS = {
  execution_lane: 'Execution lane',
  topology: 'Topology',
  workspace_policy: 'Workspace',
  branch_policy: 'Branch',
  finish_action: 'Finish',
  spec_id: 'Spec',
  plan: 'Plan',
  handoff: 'Handoff',
  status: 'Status',
  verdict: 'Verdict',
  final_source: 'Source',
  external_attempts: 'Attempts',
  reviewed_at_sha: 'Reviewed at SHA',
  content_hash: 'Content hash',
  execution_base_sha: 'Execution base SHA',
  spec_freshness_checked_at_sha: 'Spec freshness SHA',
  plan_freshness_checked_at_sha: 'Plan freshness SHA',
  spec_handoff_at_sha: 'Spec handoff SHA',
  spec_handoff_content_hash: 'Spec handoff hash',
  pr_url: 'PR',
  followup_kind: 'Kind',
  source_repo: 'Source repo',
  source_bead: 'Source bead',
  source_artifact: 'Source artifact',
  source_pr: 'Source PR',
  target_repo: 'Target repo',
  target_paths: 'Target paths',
  required_action: 'Required action',
  human_decision_required: 'Human decision required'
};

/** @param {unknown} value */
function stringValue(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
}

/** @param {unknown} value */
function displayValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return stringValue(value);
}

/** @param {unknown} value */
export function safeWorkflowUrl(value) {
  const raw = stringValue(value);
  if (!raw) {
    return null;
  }
  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

/** @param {Record<string, unknown>} metadata */
export function deriveTopology(metadata) {
  const workspace_policy = stringValue(metadata.workspace_policy);
  const branch_policy = stringValue(metadata.branch_policy);
  const finish_action = stringValue(metadata.finish_action);
  const has_any = workspace_policy || branch_policy || finish_action;
  for (const [name, values] of Object.entries(TOPOLOGIES)) {
    if (
      workspace_policy === values.workspace_policy &&
      branch_policy === values.branch_policy &&
      finish_action === values.finish_action
    ) {
      return { kind: 'valid', value: name };
    }
  }
  return has_any ? { kind: 'invalid', value: null } : { kind: 'absent', value: null };
}

/**
 * @param {unknown} lane
 * @param {unknown} topology
 */
export function routeMutationValues(lane, topology) {
  if (!EXECUTION_LANES.includes(String(lane)) || !Object.hasOwn(TOPOLOGIES, String(topology))) {
    return null;
  }
  return { execution_lane: String(lane), topology: String(topology) };
}
```

Then implement `buildWorkflowSections(issue, workflow_config)` using registry-specific row builders:

```js
/**
 * @param {any} issue
 * @param {any} workflow_config
 */
export function buildWorkflowSections(issue, workflow_config) {
  const metadata = issue?.metadata && typeof issue.metadata === 'object' ? issue.metadata : {};
  const labels = Array.isArray(issue?.labels) ? issue.labels : [];
  const sections = Array.isArray(workflow_config?.sections) ? workflow_config.sections : [];
  /** @type {Array<{ id: string, label: string, rows: Array<Record<string, unknown>> }>} */
  const result = [];

  for (const section of sections) {
    const fields = Array.isArray(workflow_config?.[section]?.fields)
      ? workflow_config[section].fields
      : [];
    const rows = buildRowsForSection(section, fields, issue, metadata, labels);
    if (rows.length > 0) {
      result.push({ id: section, label: SECTION_LABELS[section] || section, rows });
    }
  }

  return result;
}
```

`buildRowsForSection` must:

- Route: display valid lane values (`quick_edit`, `spec_backed`, `plan`), topology (`direct`, `pr`, or row with `kind: 'invalid'` and value `Invalid route metadata`), and raw route metadata only when present.
- Artifacts: source `issue.spec_id`, `metadata.plan`, `metadata.handoff`, row kind `artifact`.
- Review gates: for gates `spec`, `plan`, `impl`, build grouped row values from labels and metadata keys (`spec_review_verdict`, `spec_review_final_source`, `spec_review_external_attempts`, `spec_reviewed_at_sha`, `spec_content_hash`, etc.).
- Freshness/followup/human: display configured fields only when `displayValue(...)` is non-empty.
- Delivery: display `pr_url` only when `safeWorkflowUrl` returns URL, row kind `link`.

- [ ] **Step 4: Run utility tests and verify pass**

Run:

```bash
npm test -- app/utils/workflow-fields.test.js
```

Expected: tests pass.

- [ ] **Step 5: Commit workflow utilities**

Run:

```bash
git add app/utils/workflow-fields.js app/utils/workflow-fields.test.js
git commit -m "UI-hjii 워크플로 필드 레지스트리 추가"
```

---

### Task 5: Detail workflow rendering and artifact copy UX

**Files:**
- Modify: `app/views/detail.js`
- Modify: `app/styles.css`
- Modify: `app/views/detail.test.js`
- Modify: `app/views/detail.toast.test.js`

- [ ] **Step 1: Write failing Detail rendering tests**

Add focused tests to `app/views/detail.test.js`:

```js
test('renders configured workflow sections and artifact paths', async () => {
  document.body.innerHTML = '<section class="panel"><div id="mount"></div></section>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
  const issue = {
    id: 'UI-1',
    title: 'Workflow detail',
    labels: ['reviewed:spec'],
    spec_id: 'docs/superpowers/specs/detail.md',
    metadata: {
      execution_lane: 'spec_backed',
      workspace_policy: 'worktree',
      branch_policy: 'feature',
      finish_action: 'pr',
      spec_review_verdict: 'APPROVE',
      spec_handoff_at_sha: 'abc123'
    },
    dependencies: [],
    dependents: []
  };
  const store = {
    getState() {
      return {
        config: {
          detail: {
            workflow_summary: {
              sections: ['route', 'artifacts', 'review_gates', 'freshness'],
              route: { fields: ['execution_lane', 'topology'] },
              artifacts: { fields: ['spec_id', 'plan'] },
              review_gates: { fields: ['status', 'verdict'] },
              freshness: { fields: ['spec_handoff_at_sha', 'execution_base_sha'] }
            }
          }
        }
      };
    },
    subscribe() {
      return () => {};
    }
  };
  const stores = {
    snapshotFor(id) {
      return id === 'detail:UI-1' ? [issue] : [];
    },
    subscribe() {
      return () => {};
    }
  };

  const view = createDetailView(mount, async () => ({}), undefined, stores, store);
  await view.load('UI-1');

  expect(mount.querySelector('.metadata-paths')).toBeNull();
  expect(mount.querySelector('.workflow-summary')).toBeTruthy();
  expect(mount.textContent).toContain('Execution lane');
  expect(mount.textContent).toContain('spec_backed');
  expect(mount.textContent).toContain('Topology');
  expect(mount.textContent).toContain('pr');
  expect(mount.textContent).toContain('Spec');
  expect(mount.textContent).toContain('docs/superpowers/specs/detail.md');
  expect(mount.textContent).toContain('Spec handoff SHA');
  expect(mount.textContent).not.toContain('Execution base SHA');
});

test('renders invalid topology warning', async () => {
  // setup issue with workspace_policy=current, branch_policy=feature, finish_action=direct
  // assert text contains Invalid route metadata.
});
```

Add to `app/views/detail.toast.test.js`:

```js
test('copies artifact path and shows success toast', async () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(undefined)
    }
  });
  // render detail with spec_id configured under artifacts.
  // click `.workflow-artifact__value`.
  // expect navigator.clipboard.writeText called with full path.
  // expect toast text contains `Copied path`.
});
```

Use the current test helper style in each file; keep each test focused on one behavior.

- [ ] **Step 2: Run Detail tests and verify failure**

Run:

```bash
npm test -- app/views/detail.test.js app/views/detail.toast.test.js
```

Expected: failures show `createDetailView` lacks store argument and old metadata/workflow rendering remains.

- [ ] **Step 3: Pass config access to Detail**

Update `createDetailView` signature:

```js
export function createDetailView(
  mount_element,
  sendFn,
  navigateFn = defaultNavigateFn,
  issue_stores = undefined,
  store = undefined
) {
```

Update its JSDoc:

```js
 * @param {{ getState?: () => { config?: { detail?: { workflow_summary?: unknown } } }, subscribe?: (fn: () => void) => () => void }} [store]
```

In `app/main.js`, pass `store` as the fifth argument:

```js
detail = createDetailView(dialog.getMount(), transport, navigate_fn, sub_issue_stores, store);
```

Subscribe to store config changes in Detail only to re-render:

```js
let unsubscribe_store = () => {};
if (store && typeof store.subscribe === 'function') {
  unsubscribe_store = store.subscribe(() => {
    try {
      doRender();
    } catch (err) {
      log('store listener error %o', err);
    }
  });
}
```

Call the unsubscribe in the returned `destroy()` method before clearing DOM:

```js
destroy() {
  unsubscribe_store();
  mount_element.replaceChildren();
  if (delete_dialog && delete_dialog.parentNode) {
    delete_dialog.parentNode.removeChild(delete_dialog);
    delete_dialog = null;
  }
}
```

- [ ] **Step 4: Replace fixed summary and metadata path card**

In `app/views/detail.js`:

- Remove import of `workflowSummaryFromIssue`.
- Import:

```js
import { buildWorkflowSections } from '../utils/workflow-fields.js';
```

- Delete `expanded_metadata_labels`, `normalizePath()`, `toggleMetadataPath()`, and `metadata_block` use for `spec_id`/`plan`/`handoff`.
- Add copy handler:

```js
/** @param {string} value */
async function copyArtifactPath(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast('Copied path');
  } catch (err) {
    log('copy artifact path failed %o', err);
    showToast('Failed to copy path', 'error');
  }
}
```

- Add workflow config helper:

```js
function getWorkflowSummaryConfig() {
  return store?.getState?.().config?.detail?.workflow_summary || null;
}
```

- Replace old `workflow_block` construction with a renderer that maps `buildWorkflowSections(issue, getWorkflowSummaryConfig())`.

Use row classes:

```js
function workflowRowTemplate(row) {
  if (row.kind === 'artifact') {
    return html`<div class="workflow-summary__row workflow-artifact">
      <div class="workflow-summary__label">${row.label}</div>
      <button
        type="button"
        class="workflow-summary__value workflow-artifact__value"
        title=${row.value}
        @click=${() => copyArtifactPath(String(row.value))}
      >${row.value}</button>
    </div>`;
  }
  if (row.kind === 'link' && row.href) {
    return html`<div class="workflow-summary__row">
      <div class="workflow-summary__label">${row.label}</div>
      <div class="workflow-summary__value"><a href=${row.href} target="_blank" rel="noreferrer noopener">${row.value}</a></div>
    </div>`;
  }
  return html`<div class="workflow-summary__row ${row.kind === 'invalid' ? 'is-invalid' : ''}">
    <div class="workflow-summary__label">${row.label}</div>
    <div class="workflow-summary__value">${row.value}</div>
  </div>`;
}
```

Render sections:

```js
const workflow_sections = buildWorkflowSections(issue, getWorkflowSummaryConfig());
const workflow_block = workflow_sections.length > 0
  ? html`<div class="props-card workflow-summary">
      <div class="props-card__title">Workflow summary</div>
      ${workflow_sections.map(
        (section) => html`<section class="workflow-summary__section" data-section=${section.id}>
          <div class="workflow-summary__section-title">${section.label}</div>
          <div class="workflow-summary__list">${section.rows.map(workflowRowTemplate)}</div>
        </section>`
      )}
    </div>`
  : null;
```

Keep `${workflow_block}` in the sidebar and remove `${metadata_block}`.

- [ ] **Step 5: Add CSS for wrapping artifact paths and sections**

In `app/styles.css`, replace or extend old metadata path styles:

```css
#detail-root .workflow-summary__section + .workflow-summary__section {
  margin-top: 0.75rem;
}

#detail-root .workflow-summary__section-title {
  color: var(--muted-fg);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

#detail-root .workflow-artifact__value {
  background: transparent;
  border: 0;
  color: var(--accent-fg);
  cursor: pointer;
  font: inherit;
  padding: 0;
  text-align: left;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

#detail-root .workflow-summary__row.is-invalid .workflow-summary__value {
  color: var(--danger-fg);
}
```

Remove `.metadata-path__value.is-expanded` behavior only if no tests still rely on old Metadata path card.

- [ ] **Step 6: Run Detail tests and verify pass**

Run:

```bash
npm test -- app/views/detail.test.js app/views/detail.toast.test.js app/utils/workflow-fields.test.js
```

Expected: focused tests pass.

- [ ] **Step 7: Commit Detail rendering**

Run:

```bash
git add app/views/detail.js app/styles.css app/main.js app/views/detail.test.js app/views/detail.toast.test.js
git commit -m "UI-hjii 상세 워크플로 표시 갱신"
```

---

### Task 6: Route edit client UX

**Files:**
- Modify: `app/views/detail.js`
- Modify: `app/utils/workflow-fields.js`
- Modify: `app/views/detail.test.js`
- Modify: `app/views/detail.toast.test.js`

- [ ] **Step 1: Write failing route edit tests**

Add to `app/views/detail.test.js`:

```js
test('edits route metadata with explicit save and cancel', async () => {
  document.body.innerHTML = '<section class="panel"><div id="mount"></div></section>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
  const issue = {
    id: 'UI-2',
    title: 'Route edit',
    labels: ['lane:plan'],
    metadata: {
      execution_lane: 'plan',
      workspace_policy: 'worktree',
      branch_policy: 'feature',
      finish_action: 'pr'
    },
    dependencies: [],
    dependents: []
  };
  const sends = [];
  const view = createDetailView(
    mount,
    async (type, payload) => {
      sends.push({ type, payload });
      return {
        ...issue,
        metadata: {
          ...issue.metadata,
          execution_lane: 'quick_edit',
          workspace_policy: 'current',
          branch_policy: 'same',
          finish_action: 'direct'
        },
        labels: ['lane:quick_edit']
      };
    },
    undefined,
    { snapshotFor: () => [issue], subscribe: () => () => {} },
    {
      getState: () => ({
        config: {
          detail: {
            workflow_summary: {
              sections: ['route'],
              route: {
                fields: ['execution_lane', 'topology', 'workspace_policy', 'branch_policy', 'finish_action'],
                editable_fields: ['execution_lane', 'topology']
              }
            }
          }
        }
      }),
      subscribe: () => () => {}
    }
  );

  await view.load('UI-2');
  mount.querySelector('[data-testid="route-edit"]')?.click();
  const lane = /** @type {HTMLSelectElement} */ (mount.querySelector('[data-testid="route-lane"]'));
  const topology = /** @type {HTMLSelectElement} */ (mount.querySelector('[data-testid="route-topology"]'));
  lane.value = 'quick_edit';
  lane.dispatchEvent(new Event('change'));
  topology.value = 'direct';
  topology.dispatchEvent(new Event('change'));
  mount.querySelector('[data-testid="route-save"]')?.click();
  await Promise.resolve();

  expect(sends).toEqual([
    {
      type: 'update-route-metadata',
      payload: { id: 'UI-2', values: { execution_lane: 'quick_edit', topology: 'direct' } }
    }
  ]);
  expect(mount.textContent).toContain('quick_edit');
  expect(mount.textContent).toContain('direct');
});

test('requires topology selection before saving invalid route', async () => {
  // setup invalid route metadata and route config.
  // click Edit; assert route-save disabled until route-topology value changes to direct or pr.
});
```

Add to `app/views/detail.toast.test.js`:

```js
test('route save failure shows error toast and preserves issue state', async () => {
  // sendFn rejects for update-route-metadata.
  // assert toast contains `Failed to save route metadata` and old route value remains visible.
});
```

- [ ] **Step 2: Run route edit tests and verify failure**

Run:

```bash
npm test -- app/views/detail.test.js app/views/detail.toast.test.js
```

Expected: controls do not exist.

- [ ] **Step 3: Add route edit state and handlers**

In `app/views/detail.js`, add state near other edit state:

```js
let edit_route = false;
let route_draft_lane = '';
let route_draft_topology = '';
```

Add helpers:

```js
function beginRouteEdit() {
  if (!current || pending) {
    return;
  }
  const metadata = current.metadata || {};
  const topology = deriveTopology(metadata);
  route_draft_lane = typeof metadata.execution_lane === 'string' ? metadata.execution_lane : '';
  route_draft_topology = topology.kind === 'valid' && topology.value ? topology.value : '';
  edit_route = true;
  doRender();
}

function cancelRouteEdit() {
  edit_route = false;
  route_draft_lane = '';
  route_draft_topology = '';
  doRender();
}

async function saveRouteEdit() {
  if (!current || pending) {
    return;
  }
  const values = routeMutationValues(route_draft_lane, route_draft_topology);
  if (!values) {
    showToast('Choose valid route metadata', 'error');
    doRender();
    return;
  }
  pending = true;
  try {
    const updated = await sendFn('update-route-metadata', {
      id: current.id,
      values
    });
    if (updated && typeof updated === 'object') {
      current = /** @type {IssueDetail} */ (updated);
    }
    edit_route = false;
    route_draft_lane = '';
    route_draft_topology = '';
    doRender();
  } catch (err) {
    log('save route metadata failed %o', err);
    edit_route = false;
    doRender();
    showToast('Failed to save route metadata', 'error');
  } finally {
    pending = false;
  }
}
```

Import `deriveTopology` and `routeMutationValues` from `workflow-fields.js`.

- [ ] **Step 4: Render route edit controls in workflow block**

In `workflowRowTemplate(row)`, when `section.id === 'route'` and `edit_route` is true, render select controls for editable fields instead of read-only rows. The simplest structure is a `routeSectionTemplate(section)` branch:

```js
function routeSectionTemplate(section) {
  if (!edit_route) {
    return html`<section class="workflow-summary__section" data-section="route">
      <div class="workflow-summary__section-title">Route</div>
      <div class="workflow-summary__list">${section.rows.map(workflowRowTemplate)}</div>
      <button type="button" class="btn" data-testid="route-edit" @click=${beginRouteEdit}>Edit</button>
    </section>`;
  }

  const can_save = route_draft_lane && route_draft_topology;
  return html`<section class="workflow-summary__section" data-section="route">
    <div class="workflow-summary__section-title">Route</div>
    <div class="workflow-summary__list">
      <div class="workflow-summary__row">
        <label class="workflow-summary__label" for="route-lane">Execution lane</label>
        <select id="route-lane" data-testid="route-lane" .value=${route_draft_lane} ?disabled=${pending} @change=${onRouteLaneChange}>
          <option value="">Choose lane</option>
          <option value="quick_edit">quick_edit</option>
          <option value="spec_backed">spec_backed</option>
          <option value="plan">plan</option>
        </select>
      </div>
      <div class="workflow-summary__row">
        <label class="workflow-summary__label" for="route-topology">Topology</label>
        <select id="route-topology" data-testid="route-topology" .value=${route_draft_topology} ?disabled=${pending} @change=${onRouteTopologyChange}>
          <option value="">Choose topology</option>
          <option value="direct">direct</option>
          <option value="pr">pr</option>
        </select>
      </div>
      ${section.rows.filter((row) => !['execution_lane', 'topology'].includes(String(row.id))).map(workflowRowTemplate)}
    </div>
    <div class="workflow-summary__actions">
      <button type="button" class="btn" data-testid="route-save" ?disabled=${pending || !can_save} @click=${saveRouteEdit}>Save</button>
      <button type="button" class="btn" data-testid="route-cancel" ?disabled=${pending} @click=${cancelRouteEdit}>Cancel</button>
    </div>
  </section>`;
}
```

Add change handlers:

```js
/** @param {Event} ev */
function onRouteLaneChange(ev) {
  route_draft_lane = /** @type {HTMLSelectElement} */ (ev.currentTarget).value;
  doRender();
}

/** @param {Event} ev */
function onRouteTopologyChange(ev) {
  route_draft_topology = /** @type {HTMLSelectElement} */ (ev.currentTarget).value;
  doRender();
}
```

- [ ] **Step 5: Run route edit tests and verify pass**

Run:

```bash
npm test -- app/views/detail.test.js app/views/detail.toast.test.js app/utils/workflow-fields.test.js
```

Expected: focused tests pass.

- [ ] **Step 6: Commit route edit UI**

Run:

```bash
git add app/views/detail.js app/utils/workflow-fields.js app/views/detail.test.js app/views/detail.toast.test.js
git commit -m "UI-hjii 라우트 편집 UI 추가"
```

---

### Task 7: Protocol and server route metadata mutation

**Files:**
- Modify: `app/protocol.js`
- Modify: `app/protocol.test.js`
- Modify: `app/ws.test.js`
- Modify: `server/ws.js`
- Modify: `server/ws.mutations.test.js`

- [ ] **Step 1: Write failing protocol/client tests**

Add to `app/protocol.test.js`:

```js
test('recognizes update-route-metadata message type', () => {
  expect(isMessageType('update-route-metadata')).toBe(true);
});
```

Add to `app/ws.test.js` using existing WebSocket mock style:

```js
test('allows update-route-metadata requests', async () => {
  const client = createWsClient({ url: 'ws://example.test/ws' });

  await expect(
    client.send('update-route-metadata', {
      id: 'UI-1',
      values: { execution_lane: 'plan', topology: 'pr' }
    })
  ).resolves.toBeDefined();
});
```

Adapt the promise resolution to the current mock helper; the point is to prove `send()` does not reject with `unknown message type`.

- [ ] **Step 2: Write failing server mutation tests**

Add to `server/ws.mutations.test.js`:

```js
test('update-route-metadata writes pr topology and lane labels', async () => {
  const mRun = /** @type {import('vitest').Mock} */ (runBd);
  const mJson = /** @type {import('vitest').Mock} */ (runBdJson);
  mRun.mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' });
  mJson.mockResolvedValueOnce({
    code: 0,
    stdoutJson: {
      id: 'UI-7',
      metadata: {
        execution_lane: 'plan',
        workspace_policy: 'worktree',
        branch_policy: 'feature',
        finish_action: 'pr'
      },
      labels: ['lane:plan']
    }
  });
  const ws = makeStubSocket();

  await handleMessage(
    /** @type {any} */ (ws),
    Buffer.from(
      JSON.stringify({
        id: 'route-1',
        type: 'update-route-metadata',
        payload: { id: 'UI-7', values: { execution_lane: 'plan', topology: 'pr' } }
      })
    )
  );

  expect(mRun.mock.calls[0][0]).toEqual([
    'update',
    'UI-7',
    '--set-metadata',
    'execution_lane=plan',
    '--set-metadata',
    'workspace_policy=worktree',
    '--set-metadata',
    'branch_policy=feature',
    '--set-metadata',
    'finish_action=pr',
    '--remove-label',
    'lane:quick_edit',
    '--remove-label',
    'lane:spec_backed',
    '--remove-label',
    'lane:plan',
    '--add-label',
    'lane:plan'
  ]);
  expect(JSON.parse(ws.sent.at(-1)).ok).toBe(true);
});

test('update-route-metadata rejects invalid enum before bd', async () => {
  const ws = makeStubSocket();

  await handleMessage(
    /** @type {any} */ (ws),
    Buffer.from(
      JSON.stringify({
        id: 'route-bad',
        type: 'update-route-metadata',
        payload: { id: 'UI-7', values: { execution_lane: 'bogus', topology: 'pr' } }
      })
    )
  );

  expect(runBd).not.toHaveBeenCalled();
  expect(JSON.parse(ws.sent.at(-1)).error.code).toBe('bad_request');
});
```

- [ ] **Step 3: Run protocol/server tests and verify failure**

Run:

```bash
npm test -- app/protocol.test.js app/ws.test.js server/ws.mutations.test.js
```

Expected: new message type and server handler missing.

- [ ] **Step 4: Add protocol message type**

In `app/protocol.js`, add `'update-route-metadata'` to the `MessageType` typedef union and `MESSAGE_TYPES` array near other mutation types.

- [ ] **Step 5: Implement route mutation validation in `server/ws.js`**

Add constants near `UPDATE_STATUS_ALLOWED`:

```js
const ROUTE_LANES = new Set(['quick_edit', 'spec_backed', 'plan']);
const ROUTE_TOPOLOGIES = {
  direct: {
    workspace_policy: 'current',
    branch_policy: 'same',
    finish_action: 'direct'
  },
  pr: {
    workspace_policy: 'worktree',
    branch_policy: 'feature',
    finish_action: 'pr'
  }
};
const LANE_LABELS = ['lane:quick_edit', 'lane:spec_backed', 'lane:plan'];
```

Add helper:

```js
/** @param {unknown} payload */
function validateRouteMetadataPayload(payload) {
  const body = /** @type {any} */ (payload || {});
  const id = typeof body.id === 'string' ? body.id.trim() : '';
  const values = body.values && typeof body.values === 'object' ? body.values : null;
  if (!id || !values) {
    return { ok: false, code: 'bad_request', message: 'Invalid route metadata payload' };
  }
  const lane = values.execution_lane;
  const topology = values.topology;
  if (typeof lane !== 'string' || !ROUTE_LANES.has(lane)) {
    return { ok: false, code: 'bad_request', message: 'Invalid execution lane' };
  }
  if (typeof topology !== 'string' || !Object.hasOwn(ROUTE_TOPOLOGIES, topology)) {
    return { ok: false, code: 'bad_request', message: 'Invalid route topology' };
  }
  return { ok: true, id, lane, topology };
}
```

Add handler before label mutations:

```js
if (req.type === 'update-route-metadata') {
  const validation = validateRouteMetadataPayload(req.payload);
  if (!validation.ok) {
    ws.send(JSON.stringify(makeError(req, validation.code, validation.message)));
    return;
  }
  const route = ROUTE_TOPOLOGIES[validation.topology];
  const args = [
    'update',
    validation.id,
    '--set-metadata',
    `execution_lane=${validation.lane}`,
    '--set-metadata',
    `workspace_policy=${route.workspace_policy}`,
    '--set-metadata',
    `branch_policy=${route.branch_policy}`,
    '--set-metadata',
    `finish_action=${route.finish_action}`
  ];
  for (const label of LANE_LABELS) {
    args.push('--remove-label', label);
  }
  args.push('--add-label', `lane:${validation.lane}`);

  const result = await runBdInWorkspace(args);
  if (result.code !== 0) {
    ws.send(JSON.stringify(makeError(req, 'bd_error', 'Failed to update route metadata', result.stderr)));
    return;
  }

  const shown = await runBdJsonInWorkspace(['show', validation.id, '--json']);
  if (shown.code !== 0 || !shown.stdoutJson) {
    ws.send(JSON.stringify(makeError(req, 'bd_error', 'Failed to read updated issue', shown.stderr)));
    return;
  }

  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  triggerMutationRefreshOnce();
  return;
}
```

- [ ] **Step 6: Run protocol/server tests and verify pass**

Run:

```bash
npm test -- app/protocol.test.js app/ws.test.js server/ws.mutations.test.js
```

Expected: focused tests pass.

- [ ] **Step 7: Commit protocol and server mutation**

Run:

```bash
git add app/protocol.js app/protocol.test.js app/ws.test.js server/ws.js server/ws.mutations.test.js
git commit -m "UI-hjii 라우트 메타데이터 저장 추가"
```

---

### Task 8: Follow-up tracking and final verification

**Files:**
- Modify only if needed: Beads metadata/notes for `UI-hjii`
- Do not modify: `CHANGES.md`

- [ ] **Step 1: Create or reuse the dotfiles follow-up**

Because the reviewed spec intentionally excludes dotfiles runtime config rollout from this repo implementation, create or reuse a target-owned dotfiles follow-up with this content:

```text
Title: beads-ui workflow summary config rollout
Type: task
Priority: 3
Metadata:
  followup_kind=cross_repo
  source_repo=nakkulla/beads-ui
  source_bead=UI-hjii
  source_artifact=docs/superpowers/specs/2026-05-05-detail-workflow-config-design.md
  target_repo=nakkulla/dotfiles
Required action: update dotfiles-owned ~/.config/bdui/config.toml generation and safe existing-config migration guidance for current beads-ui workflow summary config.
```

If a compatible existing dotfiles Bead already exists, reuse it. Record the target follow-up id in `UI-hjii` notes or `metadata.followup_refs` and read it back.

- [ ] **Step 2: Run required validation**

Run from worktree:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

Expected:

- `npm run tsc` exits 0.
- `npm test` exits 0.
- `npm run lint` exits 0.
- `npm run prettier:write` exits 0; if it changes files, inspect `git diff`, commit formatting changes with the relevant code commit or a separate Korean commit.

- [ ] **Step 3: Run spec prompt-to-artifact audit**

Build a checklist mapping each reviewed spec requirement to implementation evidence:

```text
Board/List/Epics workflow chips removed -> app/views/board.js no workflowSummaryFromIssue import; tests assert no .board-card__workflow.
visible_exact supported -> server/config.js, app/state.js, app/utils/label-badge.js, tests.
Detail config-driven sections -> workflow-fields utility + detail tests.
Route edit Save/Cancel -> detail route edit tests + server ws mutation tests.
Lane mirror labels synced -> server/ws.mutations.test.js stale label repair expectation.
Artifact path full wrap/copy -> detail toast/copy tests + CSS.
No non-route metadata editable -> detail tests and server handler args contain only route metadata/lane labels.
Follow-up split -> target follow-up id recorded/read back.
Required validation -> command outputs recorded.
```

- [ ] **Step 4: Implementation review gate**

Before PR Delivery, run `implementation-review` per workflow. Use external review unless contract cap already reached for the same gate identity. Fix required findings in scope, then re-run focused verification for changed paths.

- [ ] **Step 5: PR Delivery stop boundary**

After non-blocking implementation review and fixes, create PR against `nakkulla/beads-ui` from branch `UI-hjii`. Record `metadata.pr_url`, add label `pr`, and update `UI-hjii` status to `resolved` as PR Delivery evidence. Read back and push Beads. Keep `closed` reserved for explicit PR Finish after merge/base verification. Stop at PR Delivery unless user explicitly asks for PR Finish/merge.

Example Beads write after PR URL exists:

```bash
bd update UI-hjii \
  --status resolved \
  --set-metadata pr_url=https://github.com/nakkulla/beads-ui/pull/<number> \
  --add-label pr \
  --append-notes "PR Delivery: implementation reviewed and delivered in https://github.com/nakkulla/beads-ui/pull/<number>." \
  --json
bd show UI-hjii --json
bd dolt push
```

---

## Self-review checklist

- Spec coverage: every goal/non-goal has a task and at least one test or validation item.
- Follow-up coverage: dotfiles runtime config rollout is explicit in Task 8 and not mixed into this repo implementation.
- Placeholder scan: no `TBD`, no vague “add tests” without examples, no implementation-only steps without commands.
- Type consistency: `visible_prefixes`, `visible_exact`, `detail.workflow_summary`, `update-route-metadata`, `execution_lane`, and `topology` names are consistent across tasks.
