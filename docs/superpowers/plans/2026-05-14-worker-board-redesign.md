# Worker Board Redesign Implementation Plan

> **For agentic workers:** REQUIRED EXECUTION SKILL: use the workflow-selected execution skill to implement this plan task-by-task. For Beads-backed work, use `superpowers:executing-plans` by default; use `superpowers:subagent-driven-development` only when the parent Bead has `metadata.execution_mode=subagent_driven` or the user explicitly requested subagent implementation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Worker tree with a 4-lane queued worker board that runs `codex exec /goal <issueId>` and automatic delayed `codex exec $pr-finish <pr#>` under a server-owned scheduler.

**Architecture:** Keep the existing Worker tab mount and supervisor daemon boundaries, but move Worker command decisions into `server/worker/queue-scheduler.js` and Beads metadata helpers in `server/worker/queue-state.js`. Frontend derives cards with `app/data/worker-board-selectors.js`, renders board/card components, persists card moves through `server/routes/worker-queue.js`, and consumes worker live events over the existing app WebSocket event-dispatch path.

**Tech Stack:** ECMAScript modules, Lit templates, Express routes, Node `child_process.spawn`, Node `node:sqlite`, Vitest, `bd` CLI via `server/bd.js`, `gh pr list` through `runShell`, `codex exec --json` JSONL parsing.

---

## Source and workflow context

- Parent Bead: `UI-l3c3`.
- Intent source: `docs/superpowers/specs/2026-05-13-worker-board-redesign-design.md`.
- Current baseline: `npm test` passes in `.worktrees/UI-l3c3` (106 files, 569 tests).
- Topology: Bead metadata says `workspace_policy=worktree`, `branch_policy=feature`, `finish_action=pr`.
- Delivery order: implementation → verification → formal implementation-review → PR Delivery. Do not run `gh pr create` before the implementation-review gate.
- Do not modify `CHANGES.md`.

## File structure

### Create

- `app/utils/queue-sort.js` — pure sort-key parse/insert/rebalance helpers for waiting lane ordering.
- `app/utils/queue-sort.test.js` — queue-sort unit coverage.
- `app/data/worker-board-selectors.js` — parent rows to `inbox` / `waiting` / `progress` / `done` card groups, move validation, parallel/override derivation.
- `app/data/worker-board-selectors.test.js` — selector lane/order/gate coverage.
- `app/views/worker-board.js` — 4-lane board root, drag/drop delegation, queue toolbar wiring.
- `app/views/worker-card.js` — common worker card template.
- `app/views/worker-card-progress.js` — progress/review-wait/pr-finish live section.
- `app/views/worker-card-children.js` — inline child rows.
- `server/worker/queue-state.js` — Beads metadata read/write helpers for lane, sort key, parallel/model/effort, PR cache, review-wait fields.
- `server/worker/queue-state.test.js` — mocked `bd` helper coverage.
- `server/worker/worker-config-writer.js` — safe `[worker]` TOML section update helper for default model/effort changes.
- `server/worker/worker-config-writer.test.js` — config writer coverage for preserving unrelated config and updating worker defaults.
- `server/worker/pr-finish-skill-check.js` — `$pr-finish` skill availability probe used by supervisor startup.
- `server/worker/pr-finish-skill-check.test.js` — skill probe coverage.
- `server/worker/queue-scheduler.js` — queue state machine, timers, phase transitions, pause/skip/cancel actions.
- `server/worker/queue-scheduler.test.js` — fake-clock scheduler coverage.
- `server/routes/worker-queue.js` — Worker queue REST endpoints used by the board.
- `server/routes/worker-queue.test.js` — route validation and response coverage.

### Modify

- `app/protocol.js` — add worker event names to `MESSAGE_TYPES` so `app/ws.js` can dispatch them.
- `app/state.js` — expand `worker` slice with `paused`, `live_jobs`, `countdown`, `pr_review_waits`, `done_filter`, `default_model`, `default_effort`.
- `app/ws.js` — no transport rewrite; rely on existing event dispatch after `MESSAGE_TYPES` accepts worker event names.
- `app/main.js` — replace Worker job polling/action callbacks with queue state refresh, queue endpoints, and worker WS event reducers.
- `app/views/worker.js` — mount `worker-board.js`; keep detail panel only for selected card.
- `app/views/worker-detail.js` — remove `bd-ralph` / `pr-review` controls; add parallel/model/effort controls and existing spec panel.
- `app/views/worker-toolbar.js` — search/status/done filter/default model/default effort/pause controls.
- `app/styles.css` — replace tree-specific Worker styles with board/card/progress/drag styles; keep route scroll contract.
- `server/app.js` — register `worker-queue` route; remove `worker-prs` route registration.
- `server/config.js` — parse `[worker] default_model/default_effort/pr_review_wait_ms/advance_delay_ms` and expose worker config in `/api/config` bootstrap payload.
- `server/worker/job-store.js` — add phase/session/log/usage columns with additive migration.
- `server/worker/jobs.js` — expose queue operations and worker event snapshots from supervisor client.
- `server/worker/process-runner.js` — replace `bd-ralph` / `pr-review` target builder with `/goal` / `$pr-finish` phase args, model/effort flags, JSONL event parser.
- `server/worker/supervisor.js` — instantiate scheduler, cache PR metadata with `gh pr list`, emit worker events, serialize new job fields, enforce `$pr-finish` skill availability.
- `server/worker/supervisor-entry.js` — pass parsed worker config and skill-check result into the supervisor daemon.
- `server/ws.js` — bridge supervisor `job.*` / `queue.*` live events into browser WebSocket envelopes.
- `server/ws.test.js` — prove worker live events are delivered over `/ws` to frontend subscribers.
- Tests that assert old Worker tree/PR UI (`app/views/worker.test.js`, `app/views/worker-detail.test.js`, `server/worker/process-runner.test.js`, `server/worker/supervisor.test.js`, `server/worker/supervisor.integration.test.js`, `server/routes/worker-jobs.test.js`, `server/app.test.js`, `server/config.test.js`, `app/main.worker.test.js`, `app/ws.test.js`, `app/protocol.test.js`, `app/state.test.js`).
- `app/main.bundle.js` and `app/main.bundle.js.map` after final frontend build.

### Remove

- `app/views/worker-tree.js`
- `app/views/worker-parent-row.js`
- `app/views/worker-child-row.js`
- `app/views/worker-pr-panel.js`
- `app/views/worker-pr-panel.test.js`
- `app/views/worker-pr-summary.js`
- `app/views/worker-pr-summary.test.js`
- `server/worker/pr-target-resolver.js`
- `server/worker/pr-target-resolver.test.js`
- `server/worker/pr-reader.js`
- `server/routes/worker-prs.js`
- `server/routes/worker-prs.test.js`

---

## Task 1: Config, state, and protocol foundations

**Files:**
- Modify: `server/config.js`
- Modify: `server/config.test.js`
- Modify: `server/app.js`
- Create: `server/worker/worker-config-writer.js`
- Create: `server/worker/worker-config-writer.test.js`
- Modify: `app/main.js`
- Modify: `app/state.js`
- Modify: `app/state.test.js`
- Modify: `app/protocol.js`
- Modify: `app/protocol.test.js`
- Modify: `app/ws.test.js`

- [ ] **Step 1: Write failing tests for worker config, state, and protocol events**

Add these tests before implementation:

```js
// server/config.test.js

test('reads worker queue defaults from TOML', () => {
  process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker]
default_model = "gpt-5.5"
default_effort = "high"
pr_review_wait_ms = 120000
advance_delay_ms = 45000
`);

  const config = getConfig();

  expect(config.worker).toEqual({
    default_model: 'gpt-5.5',
    default_effort: 'high',
    pr_review_wait_ms: 120000,
    advance_delay_ms: 45000
  });
});

test('falls back to worker queue defaults when TOML values are invalid', () => {
  process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker]
default_model = ""
default_effort = "maximum"
pr_review_wait_ms = -1
advance_delay_ms = 0
`);

  const config = getConfig();

  expect(config.worker).toEqual({
    default_model: 'gpt-5.5',
    default_effort: 'high',
    pr_review_wait_ms: 300000,
    advance_delay_ms: 60000
  });
});
```

```js
// server/app.test.js

import { createServer } from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createApp } from './app.js';
import { getConfig } from './config.js';

afterEach(() => {
  delete process.env.BDUI_CONFIG_PATH;
});

describe('worker config API', () => {
  test('updates worker defaults and returns bootstrap worker config', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-config-api-'));
    const config_path = path.join(dir, 'config.toml');
    fs.writeFileSync(config_path, '[worker]\npr_review_wait_ms = 120000\nadvance_delay_ms = 45000\n');
    process.env.BDUI_CONFIG_PATH = config_path;
    const config = getConfig();
    const app = createApp({ ...config, host: '127.0.0.1', port: 0, app_dir: '.', root_dir: process.cwd(), frontend_mode: 'static' });
    const server = createServer(app);
    const address = await new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address())));

    const response = await fetch(`http://127.0.0.1:${address.port}/api/config/worker`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ default_model: 'gpt-5.4', default_effort: 'medium', pr_review_wait_ms: 999 })
    });
    const body = await response.json();
    await new Promise((resolve) => server.close(resolve));

    const text = fs.readFileSync(config_path, 'utf8');
    expect(response.status).toBe(200);
    expect(body.worker.default_model).toBe('gpt-5.4');
    expect(body.worker.default_effort).toBe('medium');
    expect(body.worker.pr_review_wait_ms).toBe(120000);
    expect(text).toContain('default_model = "gpt-5.4"');
    expect(text).toContain('default_effort = "medium"');
    expect(text).not.toContain('999');
  });
});
```

```js
// app/state.test.js

test('initializes worker board runtime state', () => {
  const store = createStore();

  expect(store.getState().worker).toEqual({
    selected_parent_id: null,
    paused: false,
    live_jobs: {},
    countdown: null,
    pr_review_waits: {},
    done_filter: 'today',
    default_model: 'gpt-5.5',
    default_effort: 'high',
    queue_blocked_reason: null,
    pr_finish_available: true
  });
});

test('emits when worker live job changes', () => {
  const store = createStore();
  const seen = [];
  const off = store.subscribe((state) => seen.push(state.worker.live_jobs));

  store.setState({
    worker: {
      live_jobs: {
        'UI-1': {
          jobId: 'job-1',
          issueId: 'UI-1',
          phase: 'goal',
          sub_state: 'goal_running'
        }
      }
    }
  });
  store.setState({
    worker: {
      live_jobs: {
        'UI-1': {
          jobId: 'job-1',
          issueId: 'UI-1',
          phase: 'goal',
          sub_state: 'goal_running'
        }
      }
    }
  });
  off();

  expect(seen).toHaveLength(1);
});
```

```js
// server/worker/worker-config-writer.test.js

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { updateWorkerConfigFile } from './worker-config-writer.js';

describe('worker-config-writer', () => {
  test('updates worker defaults while preserving unrelated TOML text', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-config-'));
    const file_path = path.join(dir, 'config.toml');
    fs.writeFileSync(file_path, 'default_workspace = "/repo"\n[labels]\nvisible_prefixes = ["has:"]\n');

    updateWorkerConfigFile(file_path, { default_model: 'gpt-5.4', default_effort: 'medium' });

    const text = fs.readFileSync(file_path, 'utf8');
    expect(text).toContain('default_workspace = "/repo"');
    expect(text).toContain('[worker]');
    expect(text).toContain('default_model = "gpt-5.4"');
    expect(text).toContain('default_effort = "medium"');
  });
});
```

```js
// app/state.test.js

test('hydrates worker defaults from bootstrap config', () => {
  const store = createStore({
    config: {
      worker: {
        default_model: 'gpt-5.4',
        default_effort: 'medium',
        pr_review_wait_ms: 120000,
        advance_delay_ms: 45000
      }
    }
  });

  expect(store.getState().worker.default_model).toBe('gpt-5.4');
  expect(store.getState().worker.default_effort).toBe('medium');
});
```

```js
// app/protocol.test.js

test('accepts worker queue event message types', () => {
  expect(isMessageType('job.pr_review_wait')).toBe(true);
  expect(isMessageType('queue.countdown')).toBe(true);
  expect(isMessageType('queue.paused')).toBe(true);
});
```

```js
// app/ws.test.js

test('dispatches worker queue events', () => {
  const sockets = setupFakeWebSocket();
  const client = createWsClient();
  sockets[0].openNow();
  const events = [];

  client.on('queue.countdown', (payload) => events.push(payload));
  sockets[0].emitMessage({
    id: 'evt-worker-1',
    ok: true,
    type: 'queue.countdown',
    payload: { remainingMs: 1000, nextIssueId: 'UI-1' }
  });

  expect(events).toEqual([{ remainingMs: 1000, nextIssueId: 'UI-1' }]);
  client.close();
});
```

Run:

```bash
npm test -- server/config.test.js server/worker/worker-config-writer.test.js server/app.test.js app/state.test.js app/protocol.test.js app/ws.test.js
```

Expected: FAIL with missing `worker` config/state and invalid message types.

- [ ] **Step 2: Implement worker config normalization and bootstrap exposure**

In `server/config.js`, add worker defaults and normalizers near existing config constants:

```js
const DEFAULT_WORKER_CONFIG = Object.freeze({
  default_model: 'gpt-5.5',
  default_effort: 'high',
  pr_review_wait_ms: 300000,
  advance_delay_ms: 60000
});
const WORKER_EFFORTS = new Set(['low', 'medium', 'high']);

/**
 * @param {unknown} value
 */
function normalizePositiveInteger(value, fallback) {
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

/**
 * @param {any} parsed
 * @returns {{ default_model: string, default_effort: string, pr_review_wait_ms: number, advance_delay_ms: number }}
 */
function normalizeWorkerConfig(parsed) {
  const worker = parsed?.worker || {};
  const default_model =
    typeof worker.default_model === 'string' &&
    worker.default_model.trim().length > 0
      ? worker.default_model.trim()
      : DEFAULT_WORKER_CONFIG.default_model;
  const default_effort = WORKER_EFFORTS.has(worker.default_effort)
    ? worker.default_effort
    : DEFAULT_WORKER_CONFIG.default_effort;
  return {
    default_model,
    default_effort,
    pr_review_wait_ms: normalizePositiveInteger(
      worker.pr_review_wait_ms,
      DEFAULT_WORKER_CONFIG.pr_review_wait_ms
    ),
    advance_delay_ms: normalizePositiveInteger(
      worker.advance_delay_ms,
      DEFAULT_WORKER_CONFIG.advance_delay_ms
    )
  };
}
```

Add `worker: normalizeWorkerConfig(parsed)` to successful and missing-config returns, and add `worker` to the `getConfig()` return JSDoc. In `server/app.js`, extend `toBootstrapPayload` and `createApp` config JSDoc with `worker`, then include:

```js
worker: config.worker || {
  default_model: 'gpt-5.5',
  default_effort: 'high',
  pr_review_wait_ms: 300000,
  advance_delay_ms: 60000
}
```

Create `server/worker/worker-config-writer.js` with `updateWorkerConfigFile(config_path, values)`. It must preserve existing unrelated TOML text, create a `[worker]` section when absent, replace only `default_model` and `default_effort` lines inside `[worker]`, and reject invalid effort values outside `low|medium|high`. Add `PATCH /api/config/worker` in `server/app.js` that writes defaults through this helper, re-reads config, and returns the new bootstrap config. The route must not write wait-duration keys from the toolbar.

Update `app/main.js` `readBootstrapConfig` / bootstrap normalization so `window.__BDUI_CONFIG__.worker` flows into `createStore({ config })`. `createStore` then seeds `state.worker.default_model` and `state.worker.default_effort` from `config.worker`; later `PATCH /api/config/worker` responses update both `state.config.worker` and `state.worker.default_*`.

- [ ] **Step 3: Implement worker state and protocol changes**

In `app/state.js`, replace `WorkerState` with:

```js
/**
 * @typedef {'goal'|'pr_finish'} WorkerJobPhase
 * @typedef {'goal_running'|'pr_review_wait'|'pr_finish_running'} WorkerSubState
 * @typedef {{ jobId: string, issueId: string, phase: WorkerJobPhase, sub_state: WorkerSubState, sessionId?: string, lastLogLine?: string, startedAt?: string, prNumber?: number | null, prUrl?: string | null, model?: string, effort?: string, parallel?: boolean }} WorkerLiveJob
 * @typedef {{ issueId: string, remaining_ms: number, next_issue_id?: string | null }} WorkerCountdown
 * @typedef {{ jobId: string, prNumber: number, remaining_ms: number, total_ms: number, cancelled?: boolean }} WorkerReviewWait
 * @typedef {{ selected_parent_id: string | null, paused: boolean, live_jobs: Record<string, WorkerLiveJob>, countdown: WorkerCountdown | null, pr_review_waits: Record<string, WorkerReviewWait>, done_filter: ClosedFilter, default_model: string, default_effort: 'low'|'medium'|'high', queue_blocked_reason?: string | null, pr_finish_available?: boolean }} WorkerState
 */
```

Initialize `state.worker` with defaults from the test. Replace the current worker equality block with JSON equality for the expanded worker slice:

```js
const worker_changed = JSON.stringify(next.worker) !== JSON.stringify(state.worker);
```

Then use `!worker_changed` in the no-op condition instead of comparing only `selected_parent_id` and `show_closed_children`.

In `app/protocol.js`, append these values to `MESSAGE_TYPES`:

```js
'job.started',
'job.session_id',
'job.log_line',
'job.exited',
'job.pr_linked',
'job.pr_review_wait',
'job.pr_review_wait_cancelled',
'queue.countdown',
'queue.advanced',
'queue.paused',
'queue.blocked'
```

- [ ] **Step 4: Run targeted tests and commit**

Run:

```bash
npm test -- server/config.test.js server/worker/worker-config-writer.test.js app/state.test.js app/protocol.test.js app/ws.test.js server/app.test.js
npm run tsc
```

Expected: targeted tests PASS and typecheck PASS.

Commit:

```bash
git add server/config.js server/config.test.js server/app.js server/worker/worker-config-writer.js server/worker/worker-config-writer.test.js app/main.js app/state.js app/state.test.js app/protocol.js app/protocol.test.js app/ws.test.js
git commit -m "Worker 보드 설정과 이벤트 기반 추가"
```

---

## Task 2: Queue sort-key utility

**Files:**
- Create: `app/utils/queue-sort.js`
- Create: `app/utils/queue-sort.test.js`

- [ ] **Step 1: Write failing queue-sort tests**

Create `app/utils/queue-sort.test.js`:

```js
import { describe, expect, test } from 'vitest';
import {
  nextTailSortKey,
  parseSortKey,
  rebalanceSortKeys,
  sortKeyBetween
} from './queue-sort.js';

describe('queue-sort', () => {
  test('parses invalid sort keys as zero', () => {
    expect(parseSortKey('1000')).toBe(1000);
    expect(parseSortKey('abc')).toBe(0);
    expect(parseSortKey(undefined)).toBe(0);
  });

  test('returns tail sort key in 1000 increments', () => {
    expect(nextTailSortKey([])).toBe(1000);
    expect(nextTailSortKey(['1000', '3000'])).toBe(4000);
  });

  test('returns middle sort key between neighbors', () => {
    expect(sortKeyBetween(1000, 3000)).toEqual({ sort_key: 2000, rebalance: false });
  });

  test('requests rebalance when neighboring keys have no integer gap', () => {
    expect(sortKeyBetween(1000, 1001)).toEqual({ sort_key: 0, rebalance: true });
  });

  test('rebalances cards into 1000-spaced keys', () => {
    expect(rebalanceSortKeys(['UI-A', 'UI-B', 'UI-C'])).toEqual([
      { id: 'UI-A', sort_key: 1000 },
      { id: 'UI-B', sort_key: 2000 },
      { id: 'UI-C', sort_key: 3000 }
    ]);
  });
});
```

Run:

```bash
npm test -- app/utils/queue-sort.test.js
```

Expected: FAIL because `queue-sort.js` does not exist.

- [ ] **Step 2: Implement sort-key helpers**

Create `app/utils/queue-sort.js`:

```js
const SORT_STEP = 1000;
const MAX_SORT_KEY = 1_000_000_000;

/**
 * @param {string | number | undefined | null} value
 */
export function parseSortKey(value) {
  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/**
 * @param {Array<string | number | undefined | null>} existing_keys
 */
export function nextTailSortKey(existing_keys) {
  const max_key = existing_keys.reduce(
    (max, key) => Math.max(max, parseSortKey(key)),
    0
  );
  return max_key >= MAX_SORT_KEY ? SORT_STEP : max_key + SORT_STEP;
}

/**
 * @param {number | null | undefined} previous_key
 * @param {number | null | undefined} next_key
 */
export function sortKeyBetween(previous_key, next_key) {
  const prev = parseSortKey(previous_key);
  const next = parseSortKey(next_key);
  if (prev === 0 && next === 0) {
    return { sort_key: SORT_STEP, rebalance: false };
  }
  if (prev === 0) {
    const candidate = Math.floor(next / 2);
    return candidate > 0
      ? { sort_key: candidate, rebalance: false }
      : { sort_key: 0, rebalance: true };
  }
  if (next === 0) {
    const candidate = prev + SORT_STEP;
    return candidate <= MAX_SORT_KEY
      ? { sort_key: candidate, rebalance: false }
      : { sort_key: 0, rebalance: true };
  }
  const candidate = Math.floor((prev + next) / 2);
  if (candidate <= prev || candidate >= next) {
    return { sort_key: 0, rebalance: true };
  }
  return { sort_key: candidate, rebalance: false };
}

/**
 * @param {string[]} ids
 */
export function rebalanceSortKeys(ids) {
  return ids.map((id, index) => ({ id, sort_key: (index + 1) * SORT_STEP }));
}
```

- [ ] **Step 3: Run tests and commit**

Run:

```bash
npm test -- app/utils/queue-sort.test.js
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add app/utils/queue-sort.js app/utils/queue-sort.test.js
git commit -m "Worker 대기열 정렬 키 유틸 추가"
```

---

## Task 3: Worker board selectors and move validation

**Files:**
- Create: `app/data/worker-board-selectors.js`
- Create: `app/data/worker-board-selectors.test.js`
- Modify: `app/data/worker-selectors.js`
- Modify: `app/data/worker-selectors.test.js`

- [ ] **Step 1: Write failing selector tests**

Create `app/data/worker-board-selectors.test.js` with these behavior tests:

```js
import { describe, expect, test } from 'vitest';
import { buildWorkerBoard, canMoveWorkerCard } from './worker-board-selectors.js';

const base_parent = {
  id: 'UI-A',
  title: 'Parent A',
  status: 'open',
  priority: 2,
  issue_type: 'epic',
  spec_id: 'docs/spec.md',
  metadata: {},
  updated_at: '2026-05-14T00:00:00Z'
};

describe('worker-board-selectors', () => {
  test('puts metadata waiting cards into sort-key order', () => {
    const board = buildWorkerBoard([
      { ...base_parent, id: 'UI-B', metadata: { worker_lane: 'waiting', worker_queue_sort_key: '3000' } },
      { ...base_parent, id: 'UI-A', metadata: { worker_lane: 'waiting', worker_queue_sort_key: '1000' } }
    ], { jobs: [], done_filter: 'today', now: new Date('2026-05-14T12:00:00Z') });

    expect(board.waiting.map((card) => card.id)).toEqual(['UI-A', 'UI-B']);
  });

  test('derives progress before waiting metadata', () => {
    const board = buildWorkerBoard(
      [{ ...base_parent, metadata: { worker_lane: 'waiting', worker_queue_sort_key: '1000' } }],
      {
        jobs: [{ id: 'job-1', issueId: 'UI-A', status: 'running', phase: 'goal' }],
        done_filter: 'today',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.progress.map((card) => card.id)).toEqual(['UI-A']);
    expect(board.waiting).toEqual([]);
  });

  test('derives done from resolved status inside local-day filter', () => {
    const board = buildWorkerBoard(
      [{ ...base_parent, status: 'resolved', updated_at: '2026-05-14T01:00:00Z' }],
      { jobs: [], done_filter: 'today', now: new Date('2026-05-14T12:00:00Z') }
    );

    expect(board.done.map((card) => card.id)).toEqual(['UI-A']);
  });

  test('derives done from terminal killed job using job finished time', () => {
    const board = buildWorkerBoard(
      [{ ...base_parent, metadata: { worker_lane: 'progress' }, updated_at: '2026-05-01T01:00:00Z' }],
      {
        jobs: [{ id: 'job-1', issueId: 'UI-A', status: 'cancelled', wasForceKilled: true, finishedAt: '2026-05-14T02:00:00Z' }],
        done_filter: 'today',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.done.map((card) => card.id)).toEqual(['UI-A']);
    expect(board.progress).toEqual([]);
  });

  test('lets done to inbox metadata override remove done classification', () => {
    const board = buildWorkerBoard(
      [{ ...base_parent, status: 'closed', metadata: { worker_lane: 'inbox' } }],
      { jobs: [], done_filter: '7', now: new Date('2026-05-14T12:00:00Z') }
    );

    expect(board.inbox.map((card) => card.id)).toEqual(['UI-A']);
    expect(board.done).toEqual([]);
  });

  test('blocks queue moves for cards without spec', () => {
    const result = canMoveWorkerCard(
      { ...base_parent, spec_id: '', metadata: {} },
      'inbox',
      'waiting',
      { serial_busy: false }
    );

    expect(result).toEqual({ ok: false, reason: 'Spec required to enter queue' });
  });

  test('blocks non-parallel progress move when serial slot is busy', () => {
    const result = canMoveWorkerCard(base_parent, 'waiting', 'progress', {
      serial_busy: true
    });

    expect(result).toEqual({ ok: false, reason: 'Serial slot busy. Mark as parallel or wait.' });
  });
});
```

Update `app/data/worker-selectors.test.js` to include `issue_type: 'task'` in a parent candidate test and expect the row to appear. This locks the spec requirement that parent candidates include `task`.

Run:

```bash
npm test -- app/data/worker-board-selectors.test.js app/data/worker-selectors.test.js
```

Expected: FAIL because selector module is missing and task parents are excluded.

- [ ] **Step 2: Include task as a top-level Worker parent candidate**

In `app/data/worker-selectors.js`, change `isTopLevelParentCandidate` to:

```js
function isTopLevelParentCandidate(issue) {
  return (
    (!issue.parent || issue.parent.length === 0) &&
    (issue.issue_type === 'feature' ||
      issue.issue_type === 'epic' ||
      issue.issue_type === 'task')
  );
}
```

Extend `WorkerIssue` typedef with `metadata?: Record<string, string>`.

- [ ] **Step 3: Implement board selector functions**

Create `app/data/worker-board-selectors.js` with these exports and names:

```js
import { parseSortKey } from '../utils/queue-sort.js';

const ACTIVE_STATUSES = new Set(['queued', 'starting', 'running', 'cancelling']);
const FINAL_FAILURE_STATUSES = new Set(['failed', 'cancelled']);
const LANES = ['inbox', 'waiting', 'progress', 'done'];

/**
 * @param {any} issue
 */
function metadataOf(issue) {
  return issue?.metadata && typeof issue.metadata === 'object'
    ? issue.metadata
    : {};
}

/**
 * @param {unknown} value
 */
function isTrue(value) {
  return String(value || '').toLowerCase() === 'true';
}

/**
 * @param {any} issue
 */
function hasSpec(issue) {
  return typeof issue.spec_id === 'string' && issue.spec_id.trim().length > 0;
}

/**
 * @param {any} job
 */
function jobIssueId(job) {
  return job.issueId || job.issue_id || job.parentId || job.parent_id || '';
}

/**
 * @param {any} job
 */
function isActiveJob(job) {
  return ACTIVE_STATUSES.has(String(job?.status || ''));
}

/**
 * @param {any} job
 */
function isTerminalFailureJob(job) {
  return FINAL_FAILURE_STATUSES.has(String(job?.status || '')) || job?.wasForceKilled === true;
}

/**
 * @param {any} job
 */
function jobFinishedAt(job) {
  return job?.finishedAt || job?.finished_at || '';
}

/**
 * @param {any} issue
 * @param {Date} now
 * @param {'today'|'3'|'7'} done_filter
 * @param {any[]} jobs
 */
function isDone(issue, now, done_filter, jobs) {
  if (metadataOf(issue).worker_lane === 'inbox') {
    return false;
  }
  const terminal_job = jobs
    .filter((job) => jobIssueId(job) === issue.id && isTerminalFailureJob(job))
    .sort((a, b) => Date.parse(jobFinishedAt(b) || '0') - Date.parse(jobFinishedAt(a) || '0'))[0];
  const status_done = issue.status === 'resolved' || issue.status === 'closed';
  if (!status_done && !terminal_job) {
    return false;
  }
  const days = done_filter === '7' ? 7 : done_filter === '3' ? 3 : 1;
  const since = new Date(now);
  since.setHours(0, 0, 0, 0);
  if (days > 1) {
    since.setDate(since.getDate() - (days - 1));
  }
  const done_at = terminal_job
    ? Date.parse(jobFinishedAt(terminal_job))
    : Date.parse(issue.closed_at || issue.updated_at || issue.created_at || '');
  return !Number.isFinite(done_at) || done_at >= since.getTime();
}

/**
 * @param {any} issue
 * @param {{ jobs?: any[], now?: Date, done_filter?: 'today'|'3'|'7' }} options
 */
export function buildWorkerCard(issue, options = {}) {
  const metadata = metadataOf(issue);
  const jobs = Array.isArray(options.jobs) ? options.jobs : [];
  const active_job = jobs.find((job) => jobIssueId(job) === issue.id && isActiveJob(job)) || null;
  const phase = active_job?.phase || (metadata.worker_pr_review_wait_started_at ? 'goal' : null);
  const sub_state = metadata.worker_pr_review_wait_started_at
    ? 'pr_review_wait'
    : phase === 'pr_finish'
      ? 'pr_finish_running'
      : active_job
        ? 'goal_running'
        : null;
  const child_total = Array.isArray(issue.children) ? issue.children.length : 0;
  const child_done = child_total === 0
    ? 0
    : issue.children.filter((child) => child.status === 'resolved' || child.status === 'closed').length;
  return {
    ...issue,
    metadata,
    lane: deriveWorkerLane(issue, { ...options, jobs }),
    sort_key: parseSortKey(metadata.worker_queue_sort_key),
    parallel: isTrue(metadata.worker_parallel),
    model: metadata.worker_model || '',
    effort: metadata.worker_effort || '',
    prNumber: metadata.pr_number ? Number.parseInt(metadata.pr_number, 10) : null,
    prUrl: metadata.pr_url || '',
    active_job,
    phase,
    sub_state,
    child_total,
    child_done
  };
}

/**
 * @param {any} issue
 * @param {{ jobs?: any[], now?: Date, done_filter?: 'today'|'3'|'7' }} options
 */
export function deriveWorkerLane(issue, options = {}) {
  const metadata = metadataOf(issue);
  const jobs = Array.isArray(options.jobs) ? options.jobs : [];
  const now = options.now || new Date();
  const done_filter = options.done_filter || 'today';
  if (jobs.some((job) => jobIssueId(job) === issue.id && isActiveJob(job)) || metadata.worker_pr_review_wait_started_at) {
    return 'progress';
  }
  if (metadata.worker_lane === 'waiting') {
    return 'waiting';
  }
  if (metadata.worker_lane === 'inbox') {
    return 'inbox';
  }
  if (isDone(issue, now, done_filter, jobs)) {
    return 'done';
  }
  return 'inbox';
}

/**
 * @param {any[]} parents
 * @param {{ jobs?: any[], now?: Date, done_filter?: 'today'|'3'|'7' }} options
 */
export function buildWorkerBoard(parents, options = {}) {
  const board = { inbox: [], waiting: [], progress: [], done: [] };
  for (const parent of parents) {
    const card = buildWorkerCard(parent, options);
    board[card.lane].push(card);
  }
  board.waiting.sort((a, b) => a.sort_key - b.sort_key || a.id.localeCompare(b.id));
  board.inbox.sort((a, b) => a.id.localeCompare(b.id));
  board.progress.sort((a, b) => a.id.localeCompare(b.id));
  board.done.sort((a, b) => a.id.localeCompare(b.id));
  return board;
}

/**
 * @param {any} card
 * @param {string} from_lane
 * @param {string} to_lane
 * @param {{ serial_busy?: boolean }} context
 */
export function canMoveWorkerCard(card, from_lane, to_lane, context = {}) {
  if (!LANES.includes(to_lane)) {
    return { ok: false, reason: 'Invalid worker lane' };
  }
  if (from_lane === 'progress' && (to_lane === 'inbox' || to_lane === 'waiting')) {
    return { ok: false, reason: 'Cancel first' };
  }
  if ((to_lane === 'waiting' || to_lane === 'progress') && !hasSpec(card)) {
    return { ok: false, reason: 'Spec required to enter queue' };
  }
  if (to_lane === 'progress' && context.serial_busy && !isTrue(metadataOf(card).worker_parallel)) {
    return { ok: false, reason: 'Serial slot busy. Mark as parallel or wait.' };
  }
  return { ok: true };
}
```

- [ ] **Step 4: Run tests and commit**

Run:

```bash
npm test -- app/data/worker-board-selectors.test.js app/data/worker-selectors.test.js
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add app/data/worker-board-selectors.js app/data/worker-board-selectors.test.js app/data/worker-selectors.js app/data/worker-selectors.test.js
git commit -m "Worker 보드 lane selector 추가"
```

---

## Task 4: Beads queue metadata state helper

**Files:**
- Create: `server/worker/queue-state.js`
- Create: `server/worker/queue-state.test.js`

- [ ] **Step 1: Write failing queue-state tests**

Create `server/worker/queue-state.test.js` with mocked `run_bd_json_impl` and `run_bd_impl`:

```js
import { describe, expect, test, vi } from 'vitest';
import { createQueueState } from './queue-state.js';

describe('queue-state', () => {
  test('normalizes bd show array and reads waiting cards', async () => {
    const run_bd_json_impl = vi.fn(async () => [
      {
        id: 'UI-A',
        spec_id: 'docs/spec.md',
        metadata: { worker_lane: 'waiting', worker_queue_sort_key: '2000' }
      },
      {
        id: 'UI-B',
        spec_id: 'docs/spec.md',
        metadata: { worker_lane: 'waiting', worker_queue_sort_key: '1000' }
      }
    ]);
    const state = createQueueState({ cwd: '/repo', run_bd_json_impl });

    const waiting = await state.listWaitingCards();

    expect(waiting.map((card) => card.id)).toEqual(['UI-B', 'UI-A']);
    expect(run_bd_json_impl).toHaveBeenCalledWith(['list', '--json'], { cwd: '/repo' });
  });

  test('moves card to waiting with lane and sort metadata', async () => {
    const run_bd_impl = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const state = createQueueState({ cwd: '/repo', run_bd_impl });

    await state.moveToWaiting('UI-A', 3000);

    expect(run_bd_impl).toHaveBeenCalledWith(
      ['update', 'UI-A', '--set-metadata', 'worker_lane=waiting', '--set-metadata', 'worker_queue_sort_key=3000'],
      { cwd: '/repo' }
    );
  });

  test('persists worker override metadata', async () => {
    const run_bd_impl = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const state = createQueueState({ cwd: '/repo', run_bd_impl });

    await state.setWorkerOverrides('UI-A', {
      worker_parallel: 'true',
      worker_model: 'gpt-5.4',
      worker_effort: 'medium'
    });

    expect(run_bd_impl).toHaveBeenCalledWith(
      [
        'update',
        'UI-A',
        '--set-metadata',
        'worker_parallel=true',
        '--set-metadata',
        'worker_model=gpt-5.4',
        '--set-metadata',
        'worker_effort=medium'
      ],
      { cwd: '/repo' }
    );
  });

  test('clears PR metadata when no PR is linked', async () => {
    const run_bd_impl = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const state = createQueueState({ cwd: '/repo', run_bd_impl });

    await state.cachePrLink('UI-A', null);

    expect(run_bd_impl).toHaveBeenCalledWith(
      ['update', 'UI-A', '--unset-metadata', 'pr_number', '--unset-metadata', 'pr_url'],
      { cwd: '/repo' }
    );
  });
});
```

Run:

```bash
npm test -- server/worker/queue-state.test.js
```

Expected: FAIL because `queue-state.js` does not exist.

- [ ] **Step 2: Implement metadata helpers**

Create `server/worker/queue-state.js` with these exported APIs:

```js
import { runBd, runBdJson } from '../bd.js';
import { parseSortKey } from '../../app/utils/queue-sort.js';

/**
 * @param {{ cwd: string, run_bd_impl?: typeof runBd, run_bd_json_impl?: typeof runBdJson }} options
 */
export function createQueueState(options) {
  const run_bd_impl = options.run_bd_impl || runBd;
  const run_bd_json_impl = options.run_bd_json_impl || runBdJson;
  const cwd = options.cwd;

  /**
   * @param {string[]} args
   */
  async function runUpdate(args) {
    const result = await run_bd_impl(args, { cwd });
    if (result.code !== 0) {
      throw Object.assign(new Error(result.stderr || result.stdout || 'bd update failed'), {
        code: 'bd_failed'
      });
    }
    return result;
  }

  /**
   * @param {unknown} value
   */
  function normalizeIssues(value) {
    if (Array.isArray(value)) {
      return value.filter((item) => item && typeof item === 'object');
    }
    return value && typeof value === 'object' ? [value] : [];
  }

  return {
    async listIssues() {
      return normalizeIssues(await run_bd_json_impl(['list', '--json'], { cwd }));
    },

    async listWaitingCards() {
      const issues = await this.listIssues();
      return issues
        .filter((issue) => issue?.metadata?.worker_lane === 'waiting')
        .map((issue) => ({
          ...issue,
          sort_key: parseSortKey(issue?.metadata?.worker_queue_sort_key),
          parallel: String(issue?.metadata?.worker_parallel || '').toLowerCase() === 'true'
        }))
        .sort((a, b) => a.sort_key - b.sort_key || String(a.id).localeCompare(String(b.id)));
    },

    async moveToWaiting(issue_id, sort_key) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_lane=waiting',
        '--set-metadata',
        `worker_queue_sort_key=${String(sort_key)}`
      ]);
    },

    async moveToInbox(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_lane=inbox',
        '--unset-metadata',
        'worker_queue_sort_key'
      ]);
    },

    async moveToProgress(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_lane=progress',
        '--unset-metadata',
        'worker_queue_sort_key'
      ]);
    },

    async clearProgress(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--unset-metadata',
        'worker_lane',
        '--unset-metadata',
        'worker_queue_sort_key',
        '--unset-metadata',
        'worker_pr_review_wait_started_at',
        '--unset-metadata',
        'worker_pr_review_wait_cancelled'
      ]);
    },

    async setLastJob(issue_id, phase, job_id) {
      const key = phase === 'pr_finish' ? 'worker_last_pr_finish_job_id' : 'worker_last_goal_job_id';
      return runUpdate(['update', issue_id, '--set-metadata', `${key}=${job_id}`]);
    },

    async setLastSession(issue_id, phase, session_id) {
      const key = phase === 'pr_finish' ? 'worker_last_pr_finish_session_id' : 'worker_last_goal_session_id';
      return runUpdate(['update', issue_id, '--set-metadata', `${key}=${session_id}`]);
    },

    async startReviewWait(issue_id, started_at) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        `worker_pr_review_wait_started_at=${started_at}`,
        '--unset-metadata',
        'worker_pr_review_wait_cancelled'
      ]);
    },

    async cancelReviewWait(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        'worker_pr_review_wait_cancelled=true'
      ]);
    },

    async clearReviewWait(issue_id) {
      return runUpdate([
        'update',
        issue_id,
        '--unset-metadata',
        'worker_pr_review_wait_started_at',
        '--unset-metadata',
        'worker_pr_review_wait_cancelled'
      ]);
    },

    async setWorkerOverrides(issue_id, values) {
      const args = ['update', issue_id];
      for (const key of ['worker_parallel', 'worker_model', 'worker_effort']) {
        const value = values[key];
        if (typeof value === 'string' && value.length > 0) {
          args.push('--set-metadata', `${key}=${value}`);
        } else {
          args.push('--unset-metadata', key);
        }
      }
      return runUpdate(args);
    },

    async getIssue(issue_id) {
      return normalizeIssues(await run_bd_json_impl(['show', issue_id, '--json'], { cwd }))[0] || null;
    },

    async rebalanceWaiting(cards) {
      for (const { id, sort_key } of cards) {
        await runUpdate(['update', id, '--set-metadata', `worker_queue_sort_key=${String(sort_key)}`]);
      }
    },

    async cachePrLink(issue_id, pr) {
      if (!pr) {
        return runUpdate([
          'update',
          issue_id,
          '--unset-metadata',
          'pr_number',
          '--unset-metadata',
          'pr_url'
        ]);
      }
      return runUpdate([
        'update',
        issue_id,
        '--set-metadata',
        `pr_number=${String(pr.number)}`,
        '--set-metadata',
        `pr_url=${pr.url}`
      ]);
    }
  };
}
```

- [ ] **Step 3: Run tests and commit**

Run:

```bash
npm test -- server/worker/queue-state.test.js
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add server/worker/queue-state.js server/worker/queue-state.test.js
git commit -m "Worker 큐 metadata 상태 헬퍼 추가"
```

---

## Task 5: Codex phase runner, JSONL capture, and job persistence

**Files:**
- Modify: `server/worker/process-runner.js`
- Modify: `server/worker/process-runner.test.js`
- Modify: `server/worker/job-store.js`
- Modify: `server/worker/job-store.test.js`
- Modify: `server/worker/supervisor.js`
- Modify: `server/worker/supervisor.test.js`

- [ ] **Step 1: Write failing runner and store tests**

Replace old `buildWorkerExecTarget` tests in `server/worker/process-runner.test.js` with:

```js
import {
  buildWorkerExecArgs,
  createCodexJsonlParser,
  createWorkerProcessRunner
} from './process-runner.js';

describe('buildWorkerExecArgs', () => {
  test('builds goal phase args with model and effort', () => {
    expect(
      buildWorkerExecArgs({
        phase: 'goal',
        issueId: 'UI-qclw',
        model: 'gpt-5.5',
        effort: 'high'
      })
    ).toEqual([
      'exec',
      '--json',
      '-m',
      'gpt-5.5',
      '-c',
      'model_reasoning_effort=high',
      '/goal UI-qclw'
    ]);
  });

  test('builds pr-finish phase args with quoted skill invocation target', () => {
    expect(
      buildWorkerExecArgs({
        phase: 'pr_finish',
        prNumber: 42,
        model: 'gpt-5.5',
        effort: 'high'
      })
    ).toEqual([
      'exec',
      '--json',
      '-m',
      'gpt-5.5',
      '-c',
      'model_reasoning_effort=high',
      '$pr-finish 42'
    ]);
  });
});

describe('createCodexJsonlParser', () => {
  test('extracts session id, agent message line, and usage events', () => {
    const events = [];
    const parser = createCodexJsonlParser((event) => events.push(event));

    parser.write('{"type":"thread.started","thread_id":"018f"}\n');
    parser.write('{"type":"item.completed","item":{"type":"agent_message","text":"Done"}}\n');
    parser.write('{"type":"turn.completed","usage":{"input_tokens":10,"output_tokens":2}}\n');

    expect(events).toEqual([
      { type: 'session_id', sessionId: '018f' },
      { type: 'log_line', line: 'Done' },
      { type: 'usage', usage: { input_tokens: 10, output_tokens: 2 } }
    ]);
  });
});
```

In `server/worker/job-store.test.js`, add:

```js
test('persists worker phase, session id, log line, and usage', () => {
  const root_dir = mkdtemp();
  const store = createJobStore({ root_dir, now: () => '2026-05-14T00:00:00.000Z' });

  const job = store.createJob({
    command: 'codex',
    phase: 'goal',
    issueId: 'UI-A',
    workspace: root_dir,
    model: 'gpt-5.5',
    effort: 'high'
  });
  store.updateJob(job.id, {
    session_id: '018f',
    last_log_line: 'Done',
    usage_json: JSON.stringify({ input_tokens: 10 })
  });

  expect(store.getJob(job.id)).toMatchObject({
    phase: 'goal',
    session_id: '018f',
    last_log_line: 'Done',
    model: 'gpt-5.5',
    effort: 'high'
  });
});
```

Run:

```bash
npm test -- server/worker/process-runner.test.js server/worker/job-store.test.js
```

Expected: FAIL because old command builders and schema do not support new fields.

- [ ] **Step 2: Implement runner args and JSONL parser**

In `server/worker/process-runner.js`, replace `buildWorkerExecTarget` with `buildWorkerExecArgs` and add parser:

```js
/**
 * @param {{ phase: 'goal'|'pr_finish', issueId?: string | null, prNumber?: number | null, model: string, effort: string }} input
 * @returns {string[]}
 */
export function buildWorkerExecArgs(input) {
  const target = input.phase === 'goal'
    ? `/goal ${requireIssueId(input.issueId)}`
    : `$pr-finish ${String(requirePrNumber(input.prNumber))}`;
  return [
    'exec',
    '--json',
    '-m',
    input.model,
    '-c',
    `model_reasoning_effort=${input.effort}`,
    target
  ];
}

/** @param {string | null | undefined} issue_id */
function requireIssueId(issue_id) {
  if (!issue_id) {
    throw Object.assign(new Error('Missing issueId for /goal'), { code: 'invalid_request' });
  }
  return issue_id;
}

/** @param {number | null | undefined} pr_number */
function requirePrNumber(pr_number) {
  if (!Number.isInteger(pr_number)) {
    throw Object.assign(new Error('Missing prNumber for $pr-finish'), { code: 'invalid_request' });
  }
  return pr_number;
}

/**
 * @param {(event: { type: 'session_id', sessionId: string } | { type: 'log_line', line: string } | { type: 'usage', usage: Record<string, unknown> }) => void} on_event
 */
export function createCodexJsonlParser(on_event) {
  let buffer = '';
  return {
    /** @param {Buffer | string} chunk */
    write(chunk) {
      buffer += String(chunk);
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';
      for (const line of lines) {
        parseLine(line, on_event);
      }
    },
    flush() {
      if (buffer.length > 0) {
        parseLine(buffer, on_event);
        buffer = '';
      }
    }
  };
}
```

Add `parseLine` that ignores invalid JSON, emits `session_id` for `thread.started.thread_id`, emits `log_line` for `item.completed.item.type === 'agent_message'`, and emits `usage` for `turn.completed.usage`.

Update `startJob(input)` to accept `phase`, `model`, `effort`, and `onCodexEvent`; call `spawn_impl('codex', buildWorkerExecArgs(input), spawn_options)`. When stdout emits data, write it to the log stream and pass chunks to `createCodexJsonlParser(input.onCodexEvent || (() => {}))`. Keep stderr appended to the same log stream.

- [ ] **Step 3: Add additive job-store migration**

In `server/worker/job-store.js`, add columns to `CREATE TABLE`:

```sql
phase TEXT,
model TEXT,
effort TEXT,
session_id TEXT,
last_log_line TEXT,
usage_json TEXT
```

After `CREATE INDEX` statements, run additive migrations with a helper:

```js
for (const [column, definition] of Object.entries({
  phase: 'TEXT',
  model: 'TEXT',
  effort: 'TEXT',
  session_id: 'TEXT',
  last_log_line: 'TEXT',
  usage_json: 'TEXT'
})) {
  try {
    db.exec(`ALTER TABLE jobs ADD COLUMN ${column} ${definition}`);
  } catch (error) {
    if (!String(error?.message || '').includes('duplicate column')) {
      throw error;
    }
  }
}
```

Extend select/list/insert statements and `JobRow` typedef with `phase`, `model`, `effort`, `session_id`, `last_log_line`, `usage_json`. In `createJob`, use `input.command ?? 'codex'`, `input.phase ?? null`, `input.model ?? null`, and `input.effort ?? null`.

- [ ] **Step 4: Thread phase fields through supervisor serialization**

In `server/worker/supervisor.js`, change `createJob(input)` to require `phase`, `model`, and `effort` for new callers. Existing route tests can keep `command: 'codex'` after Task 7, so for this task use defaults:

```js
const phase = input.phase || (input.command === 'pr-review' ? 'pr_finish' : 'goal');
const model = input.model || 'gpt-5.5';
const effort = input.effort || 'high';
```

Pass these values to `store.createJob` and `runner.startJob`. Handle `onCodexEvent`:

```js
onCodexEvent(event) {
  if (event.type === 'session_id') {
    store.updateJob(created_job.id, { session_id: event.sessionId });
    store.appendEvent(created_job.id, 'job.session_id', { phase, sessionId: event.sessionId });
  }
  if (event.type === 'log_line') {
    store.updateJob(created_job.id, { last_log_line: event.line });
    store.appendEvent(created_job.id, 'job.log_line', { phase, line: event.line, at: now() });
  }
  if (event.type === 'usage') {
    store.updateJob(created_job.id, { usage_json: JSON.stringify(event.usage) });
  }
}
```

Update `serializeJob` to include `phase`, `model`, `effort`, `sessionId`, `lastLogLine`, parsed `usage`, and existing `wasForceKilled` so frontend selectors can distinguish forced terminal cancels.

- [ ] **Step 5: Run tests and commit**

Run:

```bash
npm test -- server/worker/process-runner.test.js server/worker/job-store.test.js server/worker/supervisor.test.js
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add server/worker/process-runner.js server/worker/process-runner.test.js server/worker/job-store.js server/worker/job-store.test.js server/worker/supervisor.js server/worker/supervisor.test.js
git commit -m "Worker codex 단계 실행 정보 저장"
```

---

## Task 6: Server-owned queue scheduler

**Files:**
- Create: `server/worker/queue-scheduler.js`
- Create: `server/worker/queue-scheduler.test.js`

- [ ] **Step 1: Write failing scheduler tests**

Create `server/worker/queue-scheduler.test.js` with fake timers:

```js
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueScheduler } from './queue-scheduler.js';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

function createHarness(overrides = {}) {
  const events = [];
  const spawned = [];
  const queue_state = {
    moveToProgress: vi.fn(async () => {}),
    clearProgress: vi.fn(async () => {}),
    startReviewWait: vi.fn(async () => {}),
    clearReviewWait: vi.fn(async () => {}),
    cancelReviewWait: vi.fn(async () => {}),
    cachePrLink: vi.fn(async () => {}),
    listWaitingCards: vi.fn(async () => []),
    setLastJob: vi.fn(async () => {}),
    setLastSession: vi.fn(async () => {}),
    ...overrides.queue_state
  };
  const scheduler = createQueueScheduler({
    queue_state,
    pr_review_wait_ms: 300000,
    advance_delay_ms: 60000,
    now: () => '2026-05-14T00:00:00.000Z',
    spawn_phase: async (input) => {
      spawned.push(input);
      return { id: `${input.phase}-${input.issueId || input.prNumber}` };
    },
    find_prs: overrides.find_prs || (async () => []),
    broadcast: (type, payload) => events.push({ type, payload })
  });
  return { scheduler, queue_state, events, spawned };
}

describe('queue-scheduler', () => {
  test('starts review wait after successful goal with a PR and spawns pr-finish after wait', async () => {
    const harness = createHarness({ find_prs: async () => [{ number: 42, url: 'https://github.test/pull/42' }] });

    await harness.scheduler.handleJobExit({ issueId: 'UI-A', phase: 'goal', status: 'succeeded', jobId: 'job-goal' });
    await vi.advanceTimersByTimeAsync(300000);

    expect(harness.queue_state.cachePrLink).toHaveBeenCalledWith('UI-A', { number: 42, url: 'https://github.test/pull/42' });
    expect(harness.spawned).toContainEqual({ issueId: 'UI-A', phase: 'pr_finish', prNumber: 42 });
  });

  test('skips review wait when successful goal has no PR and starts advance countdown', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [{ id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }])
      },
      find_prs: async () => []
    });

    await harness.scheduler.handleJobExit({ issueId: 'UI-A', phase: 'goal', status: 'succeeded', jobId: 'job-goal' });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toContainEqual({ issueId: 'UI-B', phase: 'goal' });
  });

  test('cancels auto pr-finish once and leaves review wait occupied', async () => {
    const harness = createHarness({ find_prs: async () => [{ number: 42, url: 'https://github.test/pull/42' }] });

    await harness.scheduler.handleJobExit({ issueId: 'UI-A', phase: 'goal', status: 'succeeded', jobId: 'job-goal' });
    await harness.scheduler.cancelAutoPrFinish('UI-A');
    await vi.advanceTimersByTimeAsync(300000);

    expect(harness.queue_state.cancelReviewWait).toHaveBeenCalledWith('UI-A');
    expect(harness.spawned).toEqual([]);
  });

  test('does not auto-advance while serial slot is occupied', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [{ id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }])
      }
    });

    await harness.scheduler.handleJobStart({ issueId: 'UI-A', jobId: 'job-a', phase: 'goal', parallel: false });
    harness.scheduler.setPaused(false);
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
  });

  test('auto-advances a parallel head while serial slot is occupied', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [{ id: 'UI-X', spec_id: 'docs/spec.md', metadata: { worker_parallel: 'true' }, parallel: true }])
      }
    });

    await harness.scheduler.handleJobStart({ issueId: 'UI-A', jobId: 'job-a', phase: 'goal', parallel: false });
    harness.scheduler.setPaused(false);
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toContainEqual(expect.objectContaining({ issueId: 'UI-X', phase: 'goal', parallel: true }));
  });

  test('does not advance serial queue when a parallel card completes', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [{ id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }])
      }
    });

    await harness.scheduler.handleJobStart({ issueId: 'UI-X', jobId: 'job-x', phase: 'goal', parallel: true });
    await harness.scheduler.handleJobExit({ issueId: 'UI-X', phase: 'pr_finish', status: 'succeeded', jobId: 'job-finish' });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
  });

  test('stops auto-advance on a spec-less head waiting card', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [
          { id: 'UI-B', spec_id: '', metadata: {}, parallel: false },
          { id: 'UI-C', spec_id: 'docs/spec.md', metadata: {}, parallel: false }
        ])
      }
    });

    await harness.scheduler.handleJobExit({ issueId: 'UI-A', phase: 'pr_finish', status: 'succeeded', jobId: 'job-finish' });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
    expect(harness.events.some((event) => event.type === 'queue.blocked')).toBe(true);
  });

  test('clears progress without advancing when pr-finish fails', async () => {
    const harness = createHarness();

    await harness.scheduler.handleJobStart({ issueId: 'UI-A', jobId: 'job-a', phase: 'pr_finish', parallel: false });
    await harness.scheduler.handleJobExit({ issueId: 'UI-A', phase: 'pr_finish', status: 'failed', jobId: 'job-a' });

    expect(harness.queue_state.clearProgress).toHaveBeenCalledWith('UI-A');
    expect(harness.spawned).toEqual([]);
  });

  test('does not auto-advance while paused', async () => {
    const harness = createHarness({
      queue_state: {
        listWaitingCards: vi.fn(async () => [{ id: 'UI-B', spec_id: 'docs/spec.md', metadata: {}, parallel: false }])
      }
    });

    harness.scheduler.setPaused(true);
    await harness.scheduler.handleJobExit({ issueId: 'UI-A', phase: 'pr_finish', status: 'succeeded', jobId: 'job-finish' });
    await vi.advanceTimersByTimeAsync(60000);

    expect(harness.spawned).toEqual([]);
  });
});
```

Run:

```bash
npm test -- server/worker/queue-scheduler.test.js
```

Expected: FAIL because scheduler does not exist.

- [ ] **Step 2: Implement scheduler public API and timer state**

Create `server/worker/queue-scheduler.js` with this public shape:

```js
/**
 * @param {{ queue_state: any, pr_review_wait_ms: number, advance_delay_ms: number, now?: () => string, spawn_phase: (input: { issueId?: string, phase: 'goal'|'pr_finish', prNumber?: number, parallel?: boolean }) => Promise<{ id: string }>, find_prs: (issue_id: string) => Promise<Array<{ number: number, url: string }>>, broadcast: (type: string, payload: Record<string, unknown>) => void }} options
 */
export function createQueueScheduler(options) {
  let paused = false;
  let advance_timer = null;
  let review_timer = null;
  let countdown_issue_id = null;
  let serial_active_issue_id = null;
  const active_parallel_issue_ids = new Set();
  /** @type {Map<string, { jobId: string, issueId: string, prNumber: number, remainingMs: number, totalMs: number, cancelled: boolean, parallel: boolean }>} */
  const review_waits = new Map();

  return {
    getSnapshot,
    setPaused,
    handleJobStart,
    handleJobSession,
    handleJobExit,
    finishNow,
    cancelAutoPrFinish,
    runPrFinish,
    cancelReviewWaitJob,
    skipAdvance,
    cancelAutoStart,
    restoreReviewWaits,
    canStart
  };

  function getSnapshot() {
    return {
      paused,
      countdown: countdown_issue_id ? { issueId: countdown_issue_id } : null,
      pr_review_waits: Object.fromEntries(review_waits.entries())
    };
  }

  function setPaused(next_paused) {
    paused = next_paused === true;
    options.broadcast('queue.paused', { paused });
    if (paused) {
      clearAdvanceTimer();
    } else {
      void scheduleAdvance();
    }
  }


  function canStart(input) {
    return input.parallel === true || serial_active_issue_id == null;
  }

  async function handleJobStart(input) {
    if (input.parallel === true) {
      active_parallel_issue_ids.add(input.issueId);
    } else {
      serial_active_issue_id = input.issueId;
    }
    await options.queue_state.moveToProgress(input.issueId);
    await options.queue_state.setLastJob(input.issueId, input.phase, input.jobId);
    options.broadcast('job.started', input);
  }

  async function handleJobSession(input) {
    await options.queue_state.setLastSession(input.issueId, input.phase, input.sessionId);
    options.broadcast('job.session_id', input);
  }
```

Add the remaining functions with these exact behaviors:

- `handleJobExit({ issueId, phase, status, jobId })`
  - Broadcast `job.exited`.
  - Maintain `serial_active_issue_id` and `active_parallel_issue_ids`; a non-parallel succeeded completion releases the serial slot and may trigger serial auto-advance, while failed/cancelled/killed terminal states release the slot but stop without auto-advance. A parallel card completion must not trigger serial queue advance.
  - For `phase === 'goal'`, always call `find_prs(issueId)` and cache first PR or clear PR metadata.
  - If goal failed/cancelled/killed: call `queue_state.clearProgress(issueId)`, release the slot, and do not schedule review wait or advance.
  - If goal succeeded and PR exists: call `startReviewWait(issueId, jobId, pr.number, parallel)` so the `$pr-finish` phase inherits the same parallel/serial class.
  - If goal succeeded and no PR: `queue_state.clearProgress(issueId)`; call `scheduleAdvance()` only when the completed card was non-parallel and released the serial slot.
  - If `phase === 'pr_finish'` and succeeded: clear progress; call `scheduleAdvance()` only when the completed card was non-parallel and released the serial slot.
  - If `phase === 'pr_finish'` and failed/cancelled/killed: call `queue_state.clearProgress(issueId)`, release the slot, and do not schedule advance.
- `startReviewWait(issueId, jobId, prNumber, parallel)` stores `worker_pr_review_wait_started_at`, keeps `{ parallel }` in `review_waits`, broadcasts `job.pr_review_wait` every second, and spawns `pr_finish` with the same `parallel` flag when remaining time reaches `0`.
- `finishNow(issueId)` clears review timer for issue and immediately calls `runPrFinish(issueId)`.
- `cancelAutoPrFinish(issueId)` marks review wait cancelled and broadcasts `job.pr_review_wait_cancelled`; it must not clear progress.
- `runPrFinish(issueId)` clears review-wait metadata and calls `spawn_phase({ issueId, phase: 'pr_finish', prNumber, parallel: wait.parallel })`.
- `cancelReviewWaitJob(issueId)` clears review-wait metadata, clears progress metadata, removes map entry, and does not call `scheduleAdvance()`.
- `canStart({ parallel })` returns `true` for parallel cards and for non-parallel cards only when `serial_active_issue_id` is empty; manual `moveCard(... -> progress)` uses this helper.
- `scheduleAdvance()` exits when paused. Otherwise it reads `queue_state.listWaitingCards()` and inspects the head card only. If the head card lacks `spec_id`, broadcast `queue.blocked` with `{ reason: 'Spec required to enter queue', issueId }` and do not skip to later cards. If the head is non-parallel and `serial_active_issue_id` is set, do not skip to later cards and do not spawn. If the head is `worker_parallel=true`, it may spawn even while `serial_active_issue_id` is set and must not occupy the serial slot. Broadcast `queue.countdown` every second and call `spawn_phase({ issueId, phase: 'goal', parallel })` at expiry.
- `skipAdvance()` immediately spawns the current countdown card.
- `cancelAutoStart()` cancels only the current advance timer and clears countdown state.
- `restoreReviewWaits()` reads waiting/progress metadata from `queue_state.listIssues()` and restores review waits using `worker_pr_review_wait_started_at`; if elapsed >= total, immediately `runPrFinish(issueId)` unless `worker_pr_review_wait_cancelled === 'true'`.

- [ ] **Step 3: Run scheduler tests and commit**

Run:

```bash
npm test -- server/worker/queue-scheduler.test.js server/worker/queue-state.test.js
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add server/worker/queue-scheduler.js server/worker/queue-scheduler.test.js
git commit -m "Worker 큐 스케줄러 추가"
```

---

## Task 7: Supervisor integration and Worker queue API

**Files:**
- Create: `server/routes/worker-queue.js`
- Create: `server/routes/worker-queue.test.js`
- Modify: `server/app.js`
- Modify: `server/app.test.js`
- Modify: `server/worker/supervisor.js`
- Modify: `server/worker/supervisor.test.js`
- Modify: `server/worker/supervisor.integration.test.js`
- Modify: `server/worker/jobs.js`
- Create: `server/worker/pr-finish-skill-check.js`
- Create: `server/worker/pr-finish-skill-check.test.js`
- Modify: `server/worker/supervisor-entry.js`
- Modify: `server/ws.js`
- Modify: `server/ws.test.js`
- Modify: `server/routes/worker-jobs.js`
- Modify: `server/routes/worker-jobs.test.js`
- Remove: `server/routes/worker-prs.js`
- Remove: `server/routes/worker-prs.test.js`
- Remove: `server/worker/pr-reader.js`
- Remove: `server/worker/pr-target-resolver.js`
- Remove: `server/worker/pr-target-resolver.test.js`

- [ ] **Step 1: Write failing API and supervisor integration tests**

Add route tests in `server/routes/worker-queue.test.js`:

```js
import { createServer } from 'node:http';
import { afterEach, describe, expect, test, vi } from 'vitest';

const getQueueSnapshot = vi.fn();
const moveCard = vi.fn();
const setPaused = vi.fn();
const startGoal = vi.fn();

vi.mock('../worker/jobs.js', () => ({
  getWorkerJobManager: () => ({
    getQueueSnapshot,
    moveCard,
    setPaused,
    startGoal,
    finishNow: vi.fn(),
    cancelAutoPrFinish: vi.fn(),
    runPrFinish: vi.fn(),
    skipAdvance: vi.fn(),
    cancelAutoStart: vi.fn()
  })
}));

afterEach(() => vi.clearAllMocks());

describe('worker queue route', () => {
  test('GET /api/worker/queue returns queue snapshot', async () => {
    getQueueSnapshot.mockResolvedValueOnce({ paused: false, countdown: null, pr_review_waits: {} });
    const { createApp } = await import('../app.js');
    const app = createApp({ host: '127.0.0.1', port: 3000, app_dir: '.', root_dir: process.cwd(), frontend_mode: 'static' });
    const server = createServer(app);
    const address = await new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address())));

    const response = await fetch(`http://127.0.0.1:${address.port}/api/worker/queue?workspace=${encodeURIComponent(process.cwd())}`);
    const body = await response.json();
    await new Promise((resolve) => server.close(resolve));

    expect(response.status).toBe(200);
    expect(body.paused).toBe(false);
  });

  test('POST /api/worker/queue/move persists card move', async () => {
    moveCard.mockResolvedValueOnce({ ok: true });
    const { createApp } = await import('../app.js');
    const app = createApp({ host: '127.0.0.1', port: 3000, app_dir: '.', root_dir: process.cwd(), frontend_mode: 'static' });
    const server = createServer(app);
    const address = await new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address())));

    const response = await fetch(`http://127.0.0.1:${address.port}/api/worker/queue/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspace: process.cwd(), issueId: 'UI-A', fromLane: 'inbox', toLane: 'waiting', beforeId: null, afterId: null })
    });
    await new Promise((resolve) => server.close(resolve));

    expect(response.status).toBe(200);
    expect(moveCard).toHaveBeenCalledWith({ issueId: 'UI-A', fromLane: 'inbox', toLane: 'waiting', beforeId: null, afterId: null, workspace: process.cwd() });
  });
});
```

Extend `server/worker/supervisor.integration.test.js` to assert a goal command uses `codex exec --json -m gpt-5.5 -c model_reasoning_effort=high /goal UI-A` and a review wait expiry starts `codex exec ... $pr-finish 42` after mocked `gh pr list` returns one PR. Add a second integration test where `pr_finish_available=false`; expected result: `/goal` success + PR cache broadcasts `queue.blocked` with reason `$pr-finish skill unavailable` and no `$pr-finish` spawn.

Add `server/ws.test.js` coverage that stubs `getWorkerJobManager().listWorkerEvents({ workspace, since })` to return `[{ seq: 1, type: 'queue.countdown', payload: { remainingMs: 1000, nextIssueId: 'UI-A' } }]`, opens the app WebSocket, advances timers, and expects the client to receive a WebSocket envelope with `type: 'queue.countdown'`.

Add `server/worker/pr-finish-skill-check.test.js` coverage for found/missing skill paths. Add `server/routes/worker-queue.test.js` cases for `moveCard` server-side validation: spec-less `inbox -> waiting` returns 409, waiting reorder passes `beforeId/afterId`, and `waiting -> progress` calls `startGoal` after validation.

Add `server/worker/supervisor.test.js` coverage for terminal cleanup paths that currently bypass child close: successful `cancelJob()` calls `scheduler.handleJobExit({ status: 'cancelled' })` and clears progress; `reconcileJobs()` for a missing process calls `scheduler.handleJobExit({ status: 'failed' })` and clears progress; forced cancel exposes `wasForceKilled` in serialized job output so selectors can derive done from terminal killed jobs. Add startup recovery coverage where `createWorkerSupervisorServer.start()` runs `reconcileJobs()` before `scheduler.restoreReviewWaits()` and orphaned `goal` / `pr_finish` active jobs become failed/killed terminal jobs with `worker_lane` cleared.

Run:

```bash
npm test -- server/routes/worker-queue.test.js server/worker/supervisor.integration.test.js
```

Expected: FAIL because route and integrated scheduler do not exist.

- [ ] **Step 2: Integrate scheduler in supervisor**

In `server/worker/supervisor.js`:

- Import `createQueueScheduler`, `createQueueState`, and `runShell`.
- Add `scheduler`, `queue_state`, `broadcast`, `find_prs_impl`, `worker_config`, and `pr_finish_available_impl` injection points to `createWorkerSupervisor` options.
- Create a local `events` array with monotonically increasing `seq` for worker event bridge:

```js
let event_seq = 0;
const live_events = [];
function broadcast(type, payload) {
  const event = { seq: ++event_seq, type, payload, createdAt: now() };
  live_events.push(event);
  if (live_events.length > 1000) {
    live_events.splice(0, live_events.length - 1000);
  }
}
```

- Create scheduler with `spawn_phase` calling `createJob({ command: 'codex', phase, issueId, prNumber, workspace, model, effort, parallel })`. Resolve `model` and `effort` at spawn time from issue metadata first (`worker_model`, `worker_effort`), then `worker_config.default_model/default_effort`, then hard defaults `gpt-5.5/high`. Resolve `parallel` from `metadata.worker_parallel === 'true'`.
- Implement `find_prs_impl(issue_id)` with `runShell('gh', ['pr', 'list', '--state', 'open', '--search', issue_id, '--json', 'number,url,title,state'], { cwd: workspace, timeout_ms: 30000 })`, JSON parse, return array.
- In `createJob`, after a job enters running state, call `scheduler.handleJobStart({ jobId, issueId, phase, parallel, startedAt })`.
- In JSONL session callback, call `scheduler.handleJobSession({ jobId, issueId, phase, sessionId })`.
- In `finalizeFromChildClose`, after `job.exited`, call `void scheduler.handleJobExit({ issueId: job.issue_id, phase: job.phase, status: final_status, jobId: job.id, exitCode: exit_code })`.
- Add a shared `notifyTerminalJob(job, status, details)` helper and call it from every terminal path: `finalizeFromChildClose`, `cancelJob()` after successful cancel, `reconcileJobs()` when a process is missing, and `finalizeFailure()`. The helper calls `scheduler.handleJobExit({ issueId: job.issue_id, phase: job.phase, status, jobId: job.id, ...details })`; scheduler owns `queue_state.clearProgress()` for failed/cancelled/killed terminal jobs. This prevents cancelled/reconciled jobs from remaining active progress.
- In `reconcileJobs()`, preserve forced-kill evidence by appending `job.killed` when the terminal path came from a forced cancel, and ensure serialized jobs expose `wasForceKilled` for frontend done derivation.
- In `createWorkerSupervisorServer.start()`, after `await supervisor.reconcileJobs()` call `await supervisor.restoreQueueState()` (or equivalent) that invokes `scheduler.restoreReviewWaits()` and handles orphaned `goal_running` / `pr_finish_running` records as terminal failed/killed with `worker_lane` cleared before accepting queue requests.
- Expose `getQueueSnapshot`, `setPaused`, `moveCard`, `setWorkerOverrides`, `startGoal`, `finishNow`, `cancelAutoPrFinish`, `runPrFinish`, `skipAdvance`, `cancelAutoStart`, and `listWorkerEvents(since)` on the supervisor object. `getQueueSnapshot` must include `pr_finish_available` and blocked reason when unavailable.

Create `server/worker/pr-finish-skill-check.js` with `checkPrFinishSkill({ env, home_dir, exists_impl })`. It should look under `$CODEX_HOME/skills/pr-finish/SKILL.md`, `$HOME/.codex/skills/pr-finish/SKILL.md`, and repo-installed skill mirrors if explicitly provided in env. `createWorkerSupervisorServer.start()` runs the check once. When unavailable, scheduler may still complete `/goal`, but `/goal` success with PR must broadcast `queue.blocked` and must not spawn `$pr-finish` until the user/environment fixes the precondition and restarts.

Implement `moveCard(input)` in the supervisor, not only frontend. Required server semantics:
- Load the issue with `queue_state.getIssue(issueId)` and validate `spec_id` for `waiting`/`progress`.
- Reject `progress -> inbox/waiting` with `Cancel first`.
- Reject non-parallel `-> progress` when `scheduler.canStart({ parallel: false })` returns false (serial slot occupied).
- `inbox/done -> waiting`: compute sort key from `beforeId`/`afterId`; if no gap, call `queue_state.rebalanceWaiting()` then write the new key.
- `waiting -> waiting`: same sort-key/rebalance path.
- `waiting -> inbox`: set `worker_lane=inbox` and unset `worker_queue_sort_key`.
- `done -> inbox`: set `worker_lane=inbox`.
- `inbox/waiting -> progress`: validate, clear sort key, and call `startGoal({ issueId })` immediately.

- [ ] **Step 3: Expose queue operations through worker manager client**

In `server/worker/jobs.js`, add methods to manager and supervisor client:

```js
getQueueSnapshot(input) { return client.getQueueSnapshot(input); }
moveCard(input) { return client.moveCard(input); }
setWorkerOverrides(input) { return client.setWorkerOverrides(input); }
setPaused(input) { return client.setPaused(input); }
startGoal(input) { return client.startGoal(input); }
finishNow(input) { return client.finishNow(input); }
cancelAutoPrFinish(input) { return client.cancelAutoPrFinish(input); }
runPrFinish(input) { return client.runPrFinish(input); }
skipAdvance(input) { return client.skipAdvance(input); }
cancelAutoStart(input) { return client.cancelAutoStart(input); }
listWorkerEvents(input) { return client.listWorkerEvents(input); }
```

Add supervisor server endpoints:

```text
GET  /queue?workspace=<path>
GET  /events?since=<seq>&workspace=<path>
POST /queue/move
POST /queue/overrides
POST /queue/pause
POST /queue/start
POST /queue/finish-now
POST /queue/cancel-auto-pr-finish
POST /queue/run-pr-finish
POST /queue/skip-advance
POST /queue/cancel-auto-start
```

Each POST passes the JSON body to the supervisor method and returns JSON from that method. Default model/effort persistence stays on `PATCH /api/config/worker`; do not add a duplicate queue-defaults endpoint.

- [ ] **Step 4: Add main app queue route and remove worker PR route**

Create `server/routes/worker-queue.js`. Reuse `resolveWorkspace` logic from `worker-jobs.js` by exporting it from `worker-jobs.js` or moving it to a shared helper inside `server/routes/worker-workspace.js`. Endpoints:

```js
router.get('/', async (req, res) => manager.getQueueSnapshot({ workspace }));
router.get('/events', async (req, res) => manager.listWorkerEvents({ workspace, since: Number(req.query.since || 0) }));
router.post('/move', async (req, res) => manager.moveCard({ ...req.body, workspace }));
router.post('/overrides', async (req, res) => manager.setWorkerOverrides({ issueId: req.body?.issueId, values: req.body?.values || {}, workspace }));
router.post('/pause', async (req, res) => manager.setPaused({ paused: req.body?.paused === true, workspace }));
router.post('/start', async (req, res) => manager.startGoal({ issueId: req.body?.issueId, workspace }));
router.post('/finish-now', async (req, res) => manager.finishNow({ issueId: req.body?.issueId, workspace }));
router.post('/cancel-auto-pr-finish', async (req, res) => manager.cancelAutoPrFinish({ issueId: req.body?.issueId, workspace }));
router.post('/run-pr-finish', async (req, res) => manager.runPrFinish({ issueId: req.body?.issueId, workspace }));
router.post('/skip-advance', async (_req, res) => manager.skipAdvance({ workspace }));
router.post('/cancel-auto-start', async (_req, res) => manager.cancelAutoStart({ workspace }));
```

In `server/app.js`, remove `createWorkerPrsRouter` import/use and add:

```js
import { createWorkerQueueRouter } from './routes/worker-queue.js';

app.use('/api/worker/queue', createWorkerQueueRouter({ root_dir: config.root_dir }));
```

Delete removed PR route/reader/resolver files and tests.

In `server/ws.js`, add a Worker live-event bridge for the current workspace. While at least one browser socket is connected, poll `getWorkerJobManager({ root_dir }).listWorkerEvents({ workspace: CURRENT_WORKSPACE.root_dir, since })` every 1000ms, then send each returned event as an unsolicited envelope `{ id: `evt-worker-${seq}`, ok: true, type: event.type, payload: event.payload }`. This is the concrete server-to-browser transport for `job.*` / `queue.*` events; `app/main.js transport.on(...)` must not rely on supervisor-local memory without this bridge.

- [ ] **Step 5: Run targeted tests and commit**

Run:

```bash
npm test -- server/routes/worker-queue.test.js server/routes/worker-jobs.test.js server/worker/pr-finish-skill-check.test.js server/worker/supervisor.test.js server/worker/supervisor.integration.test.js server/ws.test.js server/app.test.js
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add server/app.js server/app.test.js server/routes/worker-queue.js server/routes/worker-queue.test.js server/routes/worker-jobs.js server/routes/worker-jobs.test.js server/worker/pr-finish-skill-check.js server/worker/pr-finish-skill-check.test.js server/worker/supervisor-entry.js server/worker/supervisor.js server/worker/supervisor.test.js server/worker/supervisor.integration.test.js server/worker/jobs.js server/ws.js server/ws.test.js
git rm server/routes/worker-prs.js server/routes/worker-prs.test.js server/worker/pr-reader.js server/worker/pr-target-resolver.js server/worker/pr-target-resolver.test.js
git commit -m "Worker 큐 API와 supervisor 파이프라인 연결"
```

---

## Task 8: Frontend Worker board data flow and WebSocket reducers

**Files:**
- Modify: `app/main.js`
- Modify: `app/main.worker.test.js`
- Modify: `app/views/worker.js`
- Modify: `app/views/worker.test.js`
- Create: `app/views/worker-board.js`
- Create: `app/views/worker-card.js`
- Create: `app/views/worker-card-progress.js`
- Create: `app/views/worker-card-children.js`
- Modify: `app/views/worker-toolbar.js`

- [ ] **Step 1: Write failing frontend Worker board tests**

Replace tree-specific assertions in `app/views/worker.test.js` with board assertions:

```js
test('renders four worker board lanes and selects a card', async () => {
  document.body.innerHTML = '<div id="mount"></div>';
  const mount = document.getElementById('mount');
  const store = createStore({
    view: 'worker',
    workspace: { current: { path: '/tmp/workspace', database: '/tmp/workspace/.beads/test.db' }, available: [] }
  });

  createWorkerView(mount, {
    store,
    issue_stores: createIssueStores([
      { id: 'UI-A', title: 'Inbox', status: 'open', issue_type: 'epic', spec_id: 'docs/a.md', metadata: {} },
      { id: 'UI-B', title: 'Waiting', status: 'open', issue_type: 'epic', spec_id: 'docs/b.md', metadata: { worker_lane: 'waiting', worker_queue_sort_key: '1000' } }
    ]),
    fetch_impl: vi.fn(async () => ({ ok: true, json: async () => ({}) })),
    getWorkerJobs: () => []
  });

  expect(mount.querySelector('#worker-lane-inbox')).not.toBeNull();
  expect(mount.querySelector('#worker-lane-waiting')).not.toBeNull();
  expect(mount.querySelector('#worker-lane-progress')).not.toBeNull();
  expect(mount.querySelector('#worker-lane-done')).not.toBeNull();

  mount.querySelector('[data-worker-card="UI-A"]').click();
  await Promise.resolve();

  expect(store.getState().worker.selected_parent_id).toBe('UI-A');
});

test('blocks spec-less drop into waiting and shows toast handler', () => {
  const onMoveCard = vi.fn();
  const onShowToast = vi.fn();
  document.body.innerHTML = '<div id="mount"></div>';
  const mount = document.getElementById('mount');
  const store = createStore({ view: 'worker' });

  createWorkerView(mount, {
    store,
    issue_stores: createIssueStores([
      { id: 'UI-A', title: 'No spec', status: 'open', issue_type: 'epic', spec_id: '', metadata: {} }
    ]),
    getWorkerJobs: () => [],
    onMoveCard,
    onShowToast
  });

  const card = mount.querySelector('[data-worker-card="UI-A"]');
  const lane = mount.querySelector('#worker-lane-waiting');
  card.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));
  lane.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: new DataTransfer() }));

  expect(onMoveCard).not.toHaveBeenCalled();
  expect(onShowToast).toHaveBeenCalledWith('Spec required to enter queue');
});
```

In `app/main.worker.test.js`, add a test that emits `queue.paused` through the fake transport and expects store `worker.paused` to update.

Run:

```bash
npm test -- app/views/worker.test.js app/main.worker.test.js
```

Expected: FAIL because board components and handlers are missing.

- [ ] **Step 2: Implement Worker event reducers in main**

In `app/main.js`:

- Remove `worker_jobs_timer` polling.
- Keep `refreshWorkerJobs()` as a one-shot initial load if the detail view needs persisted recent jobs.
- Add `refreshWorkerQueue()` fetching `/api/worker/queue?workspace=<workspace>` and setting `worker.paused`, `worker.countdown`, `worker.pr_review_waits`, `worker.pr_finish_available`, and `worker.queue_blocked_reason`.
- Add queue endpoint helpers:

```js
async function postWorkerQueue(path, body = {}) {
  const workspace_path = store.getState().workspace.current?.path;
  if (!workspace_path) {
    return null;
  }
  const response = await fetch(`/api/worker/queue/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, workspace: workspace_path })
  });
  return response.json().catch(() => ({}));
}
```

- Register handlers on `transport` or `ws` client:

```js
transport.on('queue.blocked', (payload) => {
  store.setState({ worker: { queue_blocked_reason: String(payload.reason || '') } });
  showToast(String(payload.reason || 'Worker queue blocked'));
});
transport.on('queue.paused', (payload) => {
  store.setState({ worker: { paused: payload.paused === true } });
});
transport.on('queue.countdown', (payload) => {
  store.setState({
    worker: {
      countdown: {
        issueId: String(payload.nextIssueId || payload.issueId || ''),
        remaining_ms: Number(payload.remainingMs || 0),
        next_issue_id: payload.nextIssueId || null
      }
    }
  });
});
transport.on('job.started', upsertWorkerLiveJob);
transport.on('job.session_id', upsertWorkerLiveJob);
transport.on('job.log_line', upsertWorkerLiveJob);
transport.on('job.pr_review_wait', updateWorkerReviewWait);
transport.on('job.pr_review_wait_cancelled', markWorkerReviewWaitCancelled);
transport.on('job.exited', removeOrFinalizeWorkerLiveJob);
```

Use object spread to update `state.worker.live_jobs` immutably by `issueId`.

- [ ] **Step 3: Implement Worker board mount**

In `app/views/worker.js`, replace `workerTreeTemplate` import/use with `workerBoardTemplate`. Keep the detail mount behavior. `createWorkerView` dependencies become:

```js
onMoveCard?: (input: { issueId: string, fromLane: string, toLane: string, beforeId?: string | null, afterId?: string | null }) => void,
onStartGoal?: (issue_id: string) => void,
onFinishNow?: (issue_id: string) => void,
onCancelAutoPrFinish?: (issue_id: string) => void,
onRunPrFinish?: (issue_id: string) => void,
onSkipAdvance?: () => void,
onCancelAutoStart?: () => void,
onPauseToggle?: (paused: boolean) => void,
onUpdateWorkerMetadata?: (issue_id: string, values: { worker_parallel?: string, worker_model?: string, worker_effort?: string }) => void,
onDefaultModelChange?: (model: string) => void,
onDefaultEffortChange?: (effort: string) => void,
onShowToast?: (message: string) => void
```

Build board rows with:

```js
const parents = buildWorkerParents(deps.issue_stores.snapshotFor('tab:worker:all'), {
  jobs,
  workspace_is_valid,
  show_closed_children: []
});
const board = buildWorkerBoard(parents, {
  jobs,
  done_filter: state.worker?.done_filter || 'today',
  now: new Date()
});
```

- [ ] **Step 4: Create board/card templates**

Create `app/views/worker-board.js` with `workerBoardTemplate(board, state, handlers)`. Use four lanes:

```js
const LANES = [
  ['inbox', 'Inbox'],
  ['waiting', 'Waiting'],
  ['progress', 'Progress'],
  ['done', 'Done']
];
```

Each lane renders:

```html
<section class="worker-board__lane" id="worker-lane-${lane}" data-worker-lane=${lane}>
  <header class="worker-board__lane-header"><h3>${title}</h3><span>${cards.length}</span></header>
  <div class="worker-board__lane-body">${cards.map(...workerCardTemplate...)}</div>
</section>
```

Add delegated drag handlers that set `dataTransfer.setData('text/plain', issueId)`, compute source/target lane from `data-worker-lane`, call `canMoveWorkerCard`, show toast on failure, and call `handlers.onMoveCard({ issueId, fromLane, toLane, beforeId, afterId })` on success.

Create `app/views/worker-card.js` showing ID/type/title/spec/parallel/model-effort/PR badge/child progress. Use `data-worker-card=${card.id}` and `draggable="true"`.

Create `app/views/worker-card-progress.js` rendering the three states from spec:

- `goal_running`: `/goal running`, elapsed/session/log, Cancel/Open log.
- `pr_review_wait`: countdown, Finish now, Cancel auto pr-finish, Open PR.
- cancelled review wait: Run pr-finish, Cancel job, Open PR.
- `pr_finish_running`: `$pr-finish running`, session/log, Cancel/Open log/Open PR.

Create `app/views/worker-card-children.js` rendering status icons `open=▢`, `in_progress=▶`, `resolved=✓`, `closed=✓`.

- [ ] **Step 5: Update toolbar controls**

In `app/views/worker-toolbar.js`, replace old runnable/open-PR toggles with:

- search input
- status dropdown: `all`, `open`, `in_progress`, `resolved_closed`
- done filter: `today`, `3`, `7`
- default model input/select seeded from `state.worker.default_model`; change calls `PATCH /api/config/worker` through `onDefaultModelChange` and updates store from response.
- default effort select: `low`, `medium`, `high`; change calls `PATCH /api/config/worker` through `onDefaultEffortChange` and updates store from response.
- pause toggle button text `Pause queue` / `Resume queue`
- Skip wait and Cancel auto-start buttons when `state.worker.countdown` exists

Use handlers `onDoneFilterChange`, `onDefaultModelChange`, `onDefaultEffortChange`, `onPauseToggle`, `onSkipAdvance`, and `onCancelAutoStart`.

- [ ] **Step 6: Run targeted tests and commit**

Run:

```bash
npm test -- app/views/worker.test.js app/main.worker.test.js app/data/worker-board-selectors.test.js app/ws.test.js
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add app/main.js app/main.worker.test.js app/views/worker.js app/views/worker.test.js app/views/worker-board.js app/views/worker-card.js app/views/worker-card-progress.js app/views/worker-card-children.js app/views/worker-toolbar.js
git commit -m "Worker 보드 렌더링과 이벤트 reducer 연결"
```

---

## Task 9: Detail controls, styling, and obsolete PR/tree cleanup

**Files:**
- Modify: `app/views/worker-detail.js`
- Modify: `app/views/worker-detail.test.js`
- Modify: `app/styles.css`
- Modify: `app/views/worker.test.js`
- Remove: `app/views/worker-tree.js`
- Remove: `app/views/worker-parent-row.js`
- Remove: `app/views/worker-child-row.js`
- Remove: `app/views/worker-pr-panel.js`
- Remove: `app/views/worker-pr-panel.test.js`
- Remove: `app/views/worker-pr-summary.js`
- Remove: `app/views/worker-pr-summary.test.js`

- [ ] **Step 1: Write failing detail/style cleanup tests**

Update `app/views/worker-detail.test.js`:

```js
test('renders worker override controls without legacy run buttons', async () => {
  document.body.innerHTML = '<div id="mount"></div>';
  const mount = document.getElementById('mount');
  const detail = createWorkerDetailView(mount, {
    fetch_impl: vi.fn(async () => ({ ok: true, json: async () => ({ body: '' }) })),
    onUpdateWorkerMetadata: vi.fn()
  });

  await detail.load(
    {
      id: 'UI-A',
      title: 'Parent',
      status: 'open',
      metadata: { worker_parallel: 'true', worker_model: 'gpt-5.4', worker_effort: 'medium' }
    },
    '/tmp/workspace',
    []
  );

  expect(mount.textContent).not.toContain('Run bd-ralph');
  expect(mount.textContent).not.toContain('Run pr-review');
  expect(mount.querySelector('[name="worker-parallel"]')).not.toBeNull();
  expect(mount.querySelector('[name="worker-model"]')).not.toBeNull();
  expect(mount.querySelector('[name="worker-effort"]')).not.toBeNull();
});
```

Update the Worker style contract test in `app/views/worker.test.js`:

```js
expect(stylesheet).toContain('.worker-board');
expect(stylesheet).toContain('.worker-board__lane');
expect(stylesheet).toContain('.worker-card');
expect(stylesheet).toContain('@keyframes worker-blink');
expect(stylesheet).not.toContain('.worker-tree');
```

Run:

```bash
npm test -- app/views/worker-detail.test.js app/views/worker.test.js
```

Expected: FAIL until detail and styles change.

- [ ] **Step 2: Replace detail job actions with metadata controls**

In `app/views/worker-detail.js`:

- Remove `workerPrPanelTemplate` and `workerPrSummaryTemplate` imports/usages.
- Keep current job/recent job/log preview and spec panel.
- Add controls in the summary header:

```html
<label><input type="checkbox" name="worker-parallel" .checked=${metadata.worker_parallel === 'true'} /> Parallel</label>
<label>Model <input name="worker-model" .value=${metadata.worker_model || ''} placeholder="default" /></label>
<label>Effort <select name="worker-effort" .value=${metadata.worker_effort || ''}>...</select></label>
<button data-worker-overrides-save>Save overrides</button>
```

- Add dependency callback:

```js
onUpdateWorkerMetadata?: (issue_id: string, values: { worker_parallel?: string, worker_model?: string, worker_effort?: string }) => void
```

Wire `onUpdateWorkerMetadata` through `createWorkerView` and `app/main.js` to `POST /api/worker/queue/overrides`. After save, refresh the Worker issue subscription or rely on the next `upsert` so card tags reflect `worker_parallel`, `worker_model`, and `worker_effort`.

The save handler sends only string metadata values:

```js
options.onUpdateWorkerMetadata?.(issue.id, {
  worker_parallel: parallel_input.checked ? 'true' : 'false',
  worker_model: model_input.value.trim(),
  worker_effort: effort_select.value
});
```

- [ ] **Step 3: Add board styles and remove tree styles**

In `app/styles.css`, replace the `.worker-tree`, `.worker-parent-row`, and `.worker-child-row` blocks with Worker board classes. Keep `#worker-root.route.worker`, `#worker-root > .worker-layout`, `#worker-detail-mount`, and `.worker-detail` scroll contracts.

Add these class families:

```css
.worker-board { display: grid; grid-template-columns: repeat(4, minmax(280px, 1fr)); gap: 1rem; min-height: 0; }
.worker-board__lane { min-width: 280px; min-height: 0; display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); }
.worker-board__lane-body { overflow: auto; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.worker-card { border: 1px solid var(--border); border-radius: 12px; padding: 0.875rem; background: var(--panel); cursor: pointer; }
.worker-card--dragging { opacity: 0.45; }
.worker-card-progress__blink { animation: worker-blink 1s ease-in-out infinite; }
@keyframes worker-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
```

Add responsive fallback:

```css
@media (max-width: 1200px) {
  .worker-board { grid-template-columns: repeat(2, minmax(280px, 1fr)); }
}
@media (max-width: 760px) {
  .worker-board { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Remove obsolete files and imports**

Run:

```bash
git rm app/views/worker-tree.js app/views/worker-parent-row.js app/views/worker-child-row.js app/views/worker-pr-panel.js app/views/worker-pr-panel.test.js app/views/worker-pr-summary.js app/views/worker-pr-summary.test.js
rg "worker-tree|worker-parent-row|worker-child-row|worker-pr-panel|worker-pr-summary|Run bd-ralph|Run pr-review" app server test
```

Expected `rg` output: none, except historical docs/spec files under `docs/` if the command includes docs. Use scoped `rg` above and remove remaining runtime/test references.

- [ ] **Step 5: Run targeted tests and commit**

Run:

```bash
npm test -- app/views/worker-detail.test.js app/views/worker.test.js app/main.worker.test.js
npm run lint
npm run tsc
```

Expected: PASS.

Commit:

```bash
git add app/views/worker-detail.js app/views/worker-detail.test.js app/styles.css app/views/worker.test.js
git rm app/views/worker-tree.js app/views/worker-parent-row.js app/views/worker-child-row.js app/views/worker-pr-panel.js app/views/worker-pr-panel.test.js app/views/worker-pr-summary.js app/views/worker-pr-summary.test.js
git commit -m "Worker 상세와 스타일을 보드 UI로 전환"
```

---

## Task 10: End-to-end verification, bundle, and PR delivery gate preparation

**Files:**
- Modify: `app/main.bundle.js`
- Modify: `app/main.bundle.js.map`
- Modify: any test files needed to keep final suite green
- Beads writes after plan-review/implementation-review only as workflow requires

- [ ] **Step 1: Run full validation before bundle**

Run:

```bash
npm run tsc
npm test
npm run lint
```

Expected:

- `npm run tsc` PASS.
- `npm test` PASS with all Worker queue, scheduler, board, and existing tests green.
- `npm run lint` PASS.

If one command fails, fix the failing code or test in the smallest relevant file and rerun the failing command.

- [ ] **Step 2: Build frontend bundle after source edits**

Run:

```bash
npm run build
```

Expected: `app/main.bundle.js` and `app/main.bundle.js.map` update.

- [ ] **Step 3: Run Pre-Handoff validation after bundle**

Run repository-required commands:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
```

Expected: all commands PASS. Running `prettier:write` may format files; run `npm run build` again after formatting so bundled frontend matches formatted source.

- [ ] **Step 4: Audit old PR/tree runtime removals**

Run:

```bash
rg "bd-ralph|pr-review|worker-prs|worker-pr-panel|worker-pr-summary|worker-tree|worker-parent-row|worker-child-row" app server test
```

Expected: no runtime/test hits. Historical hits in `docs/` are allowed only when using a broader search.

Run:

```bash
rg "worker_lane=done|lane:(waiting|progress|inbox|done|worker)|worker_queue_sort_key" server app test
```

Expected:

- No code writes `worker_lane=done`.
- No code adds lane mirror labels for worker lane metadata.
- `worker_queue_sort_key` writes only in queue-state/move tests and waiting move logic.

- [ ] **Step 5: Commit final bundle and formatting changes**

Run:

```bash
git status --short
git add app/main.bundle.js app/main.bundle.js.map app server test package-lock.json package.json
# Do not add CHANGES.md.
git commit -m "Worker 보드 자동 실행 파이프라인 완성"
```

Expected: commit succeeds. If no changes remain because previous task commits already captured everything except bundle, commit only the bundle files with the same message.

- [ ] **Step 6: Formal implementation review and PR Delivery**

After Task 10 commit:

1. Run the workflow-selected `implementation-review` gate against the diff for this Bead.
2. Fix any `REVISE` findings in scope and rerun review until verdict is `APPROVE` or `APPROVE_WITH_CHANGES`.
3. Push branch `UI-l3c3` to `origin`.
4. Create PR against `nakkulla/beads-ui` (origin target), not upstream.
5. Record PR URL and review metadata in `UI-l3c3` per workflow policy.
6. Stop at PR Delivery. Do not merge or run PR Finish without a separate explicit PR-finish request.

---

## Plan self-review

### Spec coverage

- 4 lanes, lane precedence, done filter, and `task` parent inclusion: Task 3 and Task 8.
- Beads metadata schema and no lane mirror labels: Task 4 and Task 10 audit.
- Sort-key tail/middle/rebalance policy: Task 2.
- Server-owned queue scheduler, serial/parallel slots, pause, review-wait, advance countdown, cancel/skip actions: Task 6 and Task 7.
- `/goal` and `$pr-finish` codex command args with `--json`, `-m`, `-c model_reasoning_effort`: Task 5.
- JSONL session/log/usage capture: Task 5.
- PR cache through `gh pr list` and removal of `pr-reader`/`worker-prs`/PR panel files: Task 7 and Task 9.
- Worker board/card/progress/children UI, drag-drop gate behavior, toasts: Task 8 and Task 9.
- Config defaults for model/effort/wait/advance delay plus toolbar persistence to `bdui-config.toml`: Task 1 and Task 8.
- Server-to-browser live event bridge for `job.*` / `queue.*`: Task 7 and Task 8.
- Server-side drag/drop persistence and validation: Task 7.
- Terminal failed/cancelled/killed cleanup, cancel/reconcile supervisor paths, and restart review-wait recovery: Task 3, Task 6, and Task 7.
- Per-card override persistence and spawn derivation: Task 4, Task 7, Task 9.
- `$pr-finish` skill precondition check and blocked behavior: Task 7.
- Frontend bundle and required repo validation: Task 10.

### Follow-up coverage

The spec marks multi-workspace board, child issue execution, custom command wrappers, priority queues, session deep links, and spec wizard as non-goals. This plan does not create follow-up Beads for non-goals.

### Placeholder scan

Checked for forbidden placeholder phrases from the writing-plans skill; none remain in executable task instructions. Every task names concrete files, commands, expected failing/passing states, and commit boundaries.

### Type and naming consistency

The plan uses runtime `.js` files with JSDoc types, keeps worker metadata values as strings for Beads, uses `goal` / `pr_finish` as phase names, uses `goal_running` / `pr_review_wait` / `pr_finish_running` as sub-state names, and keeps PR metadata as `pr_number` / `pr_url`.
