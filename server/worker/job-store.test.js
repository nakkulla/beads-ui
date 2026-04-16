import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createJobStore } from './job-store.js';

/** @type {string[]} */
const tmps = [];

function mkdtemp() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-store-'));
  tmps.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tmps.splice(0)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
});

describe('worker job store', () => {
  test('creates job row, empty log file, and job.created event together', () => {
    const root_dir = mkdtemp();
    const store = createJobStore({ root_dir, now: () => '2026-04-17T02:00:00.000Z' });

    const job = store.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir,
      createdBy: 'codex'
    });

    const events = store.listEvents(job.id);

    expect(job.status).toBe('queued');
    expect(job.issue_id).toBe('UI-qclw');
    expect(job.workspace_path).toBe(root_dir);
    expect(job.created_at).toBe('2026-04-17T02:00:00.000Z');
    expect(job.log_path).toContain('.bdui/worker-jobs/logs/');
    expect(fs.existsSync(path.join(root_dir, job.log_path))).toBe(true);
    expect(events).toHaveLength(1);
    expect(events[0].event_type).toBe('job.created');
  });

  test('detects active conflicts by issue and pr number and ignores final jobs', () => {
    const root_dir = mkdtemp();
    const store = createJobStore({ root_dir, now: () => '2026-04-17T02:00:00.000Z' });

    const first = store.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir
    });

    expect(
      store.findActiveConflict({ workspace: root_dir, issueId: 'UI-qclw' })?.id
    ).toBe(first.id);
    expect(
      store.findActiveConflict({ workspace: root_dir, prNumber: 42 })
    ).toBeNull();

    const pr_job = store.createJob({
      command: 'pr-review',
      issueId: 'UI-other',
      prNumber: 42,
      workspace: root_dir
    });

    expect(
      store.findActiveConflict({ workspace: root_dir, prNumber: 42 })?.id
    ).toBe(pr_job.id);

    store.updateJob(pr_job.id, {
      status: 'failed',
      finished_at: '2026-04-17T02:05:00.000Z'
    });

    expect(
      store.findActiveConflict({ workspace: root_dir, prNumber: 42 })
    ).toBeNull();
  });
});
