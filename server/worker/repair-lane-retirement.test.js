import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createQueueStore } from './queue-store.js';
import { queueFilePath, workspaceStateDir } from './state-paths.js';

const WS = '/tmp/example-workspace/repair-lane';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-repair-lane-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

const HEAD_SHA = 'a'.repeat(40);
const BASE_SHA = 'b'.repeat(40);

const FAILURE_KEY = {
  stage: 'merge_gate',
  reason: 'verify_cmd_failed',
  subject_sha: HEAD_SHA,
  base_sha: BASE_SHA,
  result_digest: 'c'.repeat(64)
};

/**
 * Persist the shape a pre-UI-8w4t server left behind: a saga parked in a repair
 * phase with its session still recorded as `running`.
 *
 * @param {string} phase
 * @param {Record<string, unknown>} [intent_extra]
 */
function writeLegacyRepairQueue(phase, intent_extra = {}) {
  fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
  fs.writeFileSync(
    queueFilePath(WS),
    JSON.stringify({
      revision: 7,
      attempts: {
        'att-repair': {
          attempt_id: 'att-repair',
          bead_id: 'UI-root',
          status: 'running',
          repo: '/repo',
          target_base: 'main',
          base_oid: BASE_SHA,
          runner: 'claude',
          pid: 4242,
          started_at: 1000,
          log_path: '/logs/att-repair.log',
          completion_root_id: 'UI-root',
          completion_op_id: 'op-1',
          completion_mode: 'resume_root',
          completion_failure_key: FAILURE_KEY
        },
        'att-other': {
          attempt_id: 'att-other',
          bead_id: 'UI-other',
          status: 'running'
        }
      },
      completion_intents: {
        'UI-root': {
          target_base: 'main',
          phase,
          subject: {
            role: 'root',
            bead_id: 'UI-root',
            pr_url: 'https://github.com/o/r/pull/1',
            head_sha: HEAD_SHA,
            base_sha: BASE_SHA,
            merged_sha: null
          },
          repair_sessions_used: 1,
          repair_bead_ids: [],
          subject_stack: [],
          active_op: {
            op_id: 'op-1',
            kind: 'resume_root',
            failure_key: FAILURE_KEY,
            attempt_id: 'att-repair',
            repair_bead_id: null,
            status: 'dispatched'
          },
          terminal_reason: null,
          ...intent_extra
        }
      }
    })
  );
}

describe('queue-store repair-lane retirement (UI-8w4t §2)', () => {
  test('withholds a repairing intent from the loaded snapshot', () => {
    writeLegacyRepairQueue('repairing');

    const q = createQueueStore().snapshot(WS);

    expect(q.completion_intents).toEqual({});
  });

  test('names the session attempt the retirement has to stop', () => {
    writeLegacyRepairQueue('waiting_repair_pr');

    const pending = createQueueStore().pendingRepairLaneRetirements(WS);

    expect(pending).toHaveLength(1);
    expect(pending[0]).toMatchObject({
      root_bead_id: 'UI-root',
      phase: 'waiting_repair_pr',
      attempt_ids: ['att-repair'],
      op_id: 'op-1',
      log_path: '/logs/att-repair.log'
    });
  });

  test('leaves an unrelated running attempt out of the plan', () => {
    writeLegacyRepairQueue('repairing');

    const pending = createQueueStore().pendingRepairLaneRetirements(WS);

    expect(pending[0].attempt_ids).not.toContain('att-other');
  });

  test('terminalizes the session and the intent in one persist', () => {
    writeLegacyRepairQueue('repairing');
    const store = createQueueStore();

    const result = store.retireRepairLane(WS, {
      root_bead_id: 'UI-root',
      at: 5_000
    });

    expect(result.ok).toBe(true);
    expect(result.queue.attempts['att-repair']).toMatchObject({
      status: 'failed',
      cause: 'repair_lane_retired',
      finished_at: 5_000
    });
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'needs_human',
      terminal_reason: {
        reason: 'repair_lane_retired',
        stage: 'repairing',
        failure_key: FAILURE_KEY,
        evidence: null,
        log_path: '/logs/att-repair.log',
        op_id: 'op-1',
        comment_at: null,
        at: 5_000
      }
    });
  });

  test('drops every retired key from the persisted record', () => {
    writeLegacyRepairQueue('repairing');
    const store = createQueueStore();

    store.retireRepairLane(WS, { root_bead_id: 'UI-root', at: 5_000 });

    const raw = fs.readFileSync(queueFilePath(WS), 'utf8');
    expect(raw).not.toMatch(/repair_sessions_used|repair_bead_ids/);
    expect(raw).not.toMatch(/subject_stack|completion_mode/);
    expect(raw).not.toMatch(/repair_operation_id|resume_root/);
  });

  test('leaves an unrelated running attempt untouched', () => {
    writeLegacyRepairQueue('repairing');
    const store = createQueueStore();

    const result = store.retireRepairLane(WS, {
      root_bead_id: 'UI-root',
      at: 5_000
    });

    expect(result.queue.attempts['att-other'].status).toBe('running');
  });

  test('refuses a root the cold load did not withhold', () => {
    writeLegacyRepairQueue('repairing');
    const store = createQueueStore();

    const result = store.retireRepairLane(WS, {
      root_bead_id: 'UI-absent',
      at: 5_000
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('repair_lane_not_pending');
  });

  test('retires a root exactly once', () => {
    writeLegacyRepairQueue('repairing');
    const store = createQueueStore();
    store.retireRepairLane(WS, { root_bead_id: 'UI-root', at: 5_000 });

    const repeated = store.retireRepairLane(WS, {
      root_bead_id: 'UI-root',
      at: 6_000
    });

    expect(repeated.ok).toBe(false);
    expect(
      repeated.queue.completion_intents['UI-root'].terminal_reason?.at
    ).toBe(5_000);
  });

  test('replans from disk when a restart lost the retirement write', () => {
    writeLegacyRepairQueue('repairing');
    createQueueStore().retireRepairLane(WS, {
      root_bead_id: 'UI-root',
      at: 1
    });
    writeLegacyRepairQueue('repairing');

    const pending = createQueueStore().pendingRepairLaneRetirements(WS);

    expect(pending.map((plan) => plan.root_bead_id)).toEqual(['UI-root']);
  });
});

/**
 * The retired identifiers, and the ONLY places allowed to still name them.
 *
 * `queue-store.js` reads them once, inside its delimited legacy-load region,
 * because retiring a persisted saga means reading the keys that identify its
 * session before dropping them; the region is stripped below rather than the
 * whole file allowed. The two fixtures are legacy payloads on purpose — they
 * exist to prove the loader still copes with what an old server wrote.
 */
const RETIRED_IDENTIFIERS = [
  'completion_repair',
  'dispatchCompletionRepair',
  'repair_bead',
  'repair_sessions_used',
  'subject_stack',
  'waiting_repair_pr',
  'repair_operation_id',
  'completion_mode',
  'resume_root',
  'create_repair',
  'dispatch_repair'
];

const GREP_ALLOWLIST = [
  'server/worker/__fixtures__/legacy-cleanup-dotfiles.json',
  'server/worker/__fixtures__/legacy-repair-lane-queue.json',
  'server/worker/repair-lane-retirement.test.js'
];

const LEGACY_REGION_FILE = 'server/worker/queue-store.js';
const LEGACY_REGION_BEGIN = 'UI-8w4t legacy-read:begin';
const LEGACY_REGION_END = 'UI-8w4t legacy-read:end';

/**
 * @param {string} dir
 * @returns {string[]}
 */
function sourceFilesUnder(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') {
        continue;
      }
      out.push(...sourceFilesUnder(full));
      continue;
    }
    if (/\.(js|ts|json)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

describe('retired repair-lane identifier gate (UI-8w4t §검증)', () => {
  test('no server source or test names a retired identifier', () => {
    const root = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      '..',
      '..'
    );
    /** @type {string[]} */
    const offenders = [];

    for (const file of sourceFilesUnder(path.join(root, 'server'))) {
      const rel = path.relative(root, file);
      if (GREP_ALLOWLIST.includes(rel)) {
        continue;
      }
      let text = fs.readFileSync(file, 'utf8');
      if (rel === LEGACY_REGION_FILE) {
        const begin = text.indexOf(LEGACY_REGION_BEGIN);
        const end = text.indexOf(LEGACY_REGION_END);
        expect(begin).toBeGreaterThan(-1);
        expect(end).toBeGreaterThan(begin);
        text = text.slice(0, begin) + text.slice(end);
      }
      for (const identifier of RETIRED_IDENTIFIERS) {
        if (text.includes(identifier)) {
          offenders.push(`${rel}: ${identifier}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
