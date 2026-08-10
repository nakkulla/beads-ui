import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { usageReceiptInboxDir } from './state-paths.js';
import {
  consumeUsageReceiptFiles,
  ensureUsageReceiptInbox,
  gcUsageReceiptInboxes,
  readAttemptUsageReceipts
} from './usage-receipts.js';

/** @type {string[]} */
const temp_roots = [];

afterEach(() => {
  for (const root of temp_roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

describe('attempt usage receipts', () => {
  test('reads a valid v1 receipt from its private attempt inbox', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-receipt-'));
    temp_roots.push(root);
    const prior = process.env.XDG_STATE_HOME;
    process.env.XDG_STATE_HOME = root;
    try {
      const workspace = '/tmp/example-workspace/project-a';
      const attempt_id = 'UI-orfj-1';
      const inbox = usageReceiptInboxDir(workspace, attempt_id);
      expect(ensureUsageReceiptInbox(workspace, attempt_id).ok).toBe(true);
      fs.writeFileSync(
        path.join(inbox, 'launch-1.json'),
        JSON.stringify({
          schema: 'codex-usage-receipt-v1',
          receipt_id: 'launch-1',
          attempt_id,
          provider: 'codex',
          role: 'implementation',
          thread_id: 'thread-1',
          turn_id: 'turn-1',
          model: 'gpt-5.6-terra',
          usage: {
            input_tokens: 10,
            output_tokens: 2,
            cache_read_input_tokens: 1,
            cache_creation_input_tokens: 0,
            reasoning_output_tokens: 3
          },
          completed_at: '2026-08-11T12:34:56Z'
        })
      );
      fs.chmodSync(path.join(inbox, 'launch-1.json'), 0o600);

      const result = readAttemptUsageReceipts(workspace, attempt_id);

      expect(result.legs).toEqual([
        {
          receipt_id: 'launch-1',
          provider: 'codex',
          role: 'implementation',
          session_id: 'thread-1',
          turn_id: 'turn-1',
          model: 'gpt-5.6-terra',
          usage: {
            input_tokens: 10,
            output_tokens: 2,
            cache_read_input_tokens: 1,
            cache_creation_input_tokens: 0,
            reasoning_output_tokens: 3
          },
          completed_at: '2026-08-11T12:34:56Z'
        }
      ]);
      expect(result.files).toEqual([path.join(inbox, 'launch-1.json')]);
    } finally {
      if (prior === undefined) {
        delete process.env.XDG_STATE_HOME;
      } else {
        process.env.XDG_STATE_HOME = prior;
      }
    }
  });

  test('keeps foreign, insecure, and conflicting receipts out of persistence', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-receipt-'));
    temp_roots.push(root);
    const prior = process.env.XDG_STATE_HOME;
    process.env.XDG_STATE_HOME = root;
    try {
      const workspace = '/tmp/example-workspace/project-a';
      const attempt_id = 'UI-orfj-2';
      const inbox = usageReceiptInboxDir(workspace, attempt_id);
      ensureUsageReceiptInbox(workspace, attempt_id);
      const receipt = {
        schema: 'codex-usage-receipt-v1',
        receipt_id: 'launch-1',
        attempt_id,
        provider: 'codex',
        role: 'implementation',
        thread_id: 'thread-1',
        turn_id: 'turn-1',
        model: 'gpt-5.6-terra',
        usage: {
          input_tokens: 10,
          output_tokens: 2,
          cache_read_input_tokens: 1,
          cache_creation_input_tokens: 0,
          reasoning_output_tokens: 3
        },
        completed_at: '2026-08-11T12:34:56Z'
      };
      const file = path.join(inbox, 'launch-1.json');
      fs.writeFileSync(file, JSON.stringify(receipt), { mode: 0o600 });
      const known = readAttemptUsageReceipts(workspace, attempt_id).legs;
      receipt.usage.output_tokens = 99;
      fs.writeFileSync(file, JSON.stringify(receipt), { mode: 0o600 });

      const duplicate = readAttemptUsageReceipts(workspace, attempt_id, {
        known_legs: known
      });

      expect(duplicate.legs).toEqual([]);
      expect(duplicate.warnings).toContain('duplicate_conflict');
      expect(fs.existsSync(file)).toBe(true);
      receipt.receipt_id = 'foreign';
      receipt.attempt_id = 'another-attempt';
      fs.writeFileSync(
        path.join(inbox, 'foreign.json'),
        JSON.stringify(receipt),
        {
          mode: 0o600
        }
      );
      fs.chmodSync(file, 0o644);

      const invalid = readAttemptUsageReceipts(workspace, attempt_id);

      expect(invalid.legs).toEqual([]);
      expect(invalid.warnings).toEqual(
        expect.arrayContaining(['file_security', 'schema'])
      );
      consumeUsageReceiptFiles(invalid.files);
      expect(fs.existsSync(file)).toBe(true);
    } finally {
      if (prior === undefined) {
        delete process.env.XDG_STATE_HOME;
      } else {
        process.env.XDG_STATE_HOME = prior;
      }
    }
  });

  test('refuses an existing insecure inbox without repairing its mode', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-receipt-'));
    temp_roots.push(root);
    const prior = process.env.XDG_STATE_HOME;
    process.env.XDG_STATE_HOME = root;
    try {
      const workspace = '/tmp/example-workspace/project-a';
      const inbox = usageReceiptInboxDir(workspace, 'UI-orfj-3');
      fs.mkdirSync(inbox, { recursive: true, mode: 0o755 });
      fs.chmodSync(inbox, 0o755);

      const result = ensureUsageReceiptInbox(workspace, 'UI-orfj-3');

      expect(result).toEqual({ ok: false, reason: 'directory_mode' });
      expect(fs.statSync(inbox).mode & 0o777).toBe(0o755);
    } finally {
      if (prior === undefined) {
        delete process.env.XDG_STATE_HOME;
      } else {
        process.env.XDG_STATE_HOME = prior;
      }
    }
  });

  test('preserves a symlink target while refusing it as an inbox', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-receipt-'));
    temp_roots.push(root);
    const prior = process.env.XDG_STATE_HOME;
    process.env.XDG_STATE_HOME = root;
    try {
      const workspace = '/tmp/example-workspace/project-a';
      const inbox = usageReceiptInboxDir(workspace, 'UI-orfj-4');
      const target = path.join(root, 'target');
      fs.mkdirSync(path.dirname(inbox), { recursive: true });
      fs.mkdirSync(target, { mode: 0o755 });
      fs.chmodSync(target, 0o755);
      fs.symlinkSync(target, inbox);

      const result = ensureUsageReceiptInbox(workspace, 'UI-orfj-4');

      expect(result).toEqual({ ok: false, reason: 'directory_type' });
      expect(fs.lstatSync(inbox).isSymbolicLink()).toBe(true);
      expect(fs.statSync(target).mode & 0o777).toBe(0o755);
    } finally {
      if (prior === undefined) {
        delete process.env.XDG_STATE_HOME;
      } else {
        process.env.XDG_STATE_HOME = prior;
      }
    }
  });

  test('collects only old orphan inboxes and preserves active or unpersisted attempts', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-receipt-'));
    temp_roots.push(root);
    const prior = process.env.XDG_STATE_HOME;
    process.env.XDG_STATE_HOME = root;
    try {
      const workspace = '/tmp/example-workspace/project-a';
      const orphan = usageReceiptInboxDir(workspace, 'orphan');
      const active = usageReceiptInboxDir(workspace, 'active');
      const pending = usageReceiptInboxDir(workspace, 'pending');
      for (const id of ['orphan', 'active', 'pending']) {
        ensureUsageReceiptInbox(workspace, id);
      }
      fs.writeFileSync(
        path.join(pending, 'launch-1.json'),
        JSON.stringify({
          schema: 'codex-usage-receipt-v1',
          receipt_id: 'launch-1',
          attempt_id: 'pending',
          provider: 'codex',
          role: 'implementation',
          thread_id: 'thread-1',
          turn_id: 'turn-1',
          model: 'gpt-5.6-terra',
          usage: {
            input_tokens: 1,
            output_tokens: 1,
            cache_read_input_tokens: 0,
            cache_creation_input_tokens: 0,
            reasoning_output_tokens: 0
          },
          completed_at: '2026-08-11T12:34:56Z'
        }),
        { mode: 0o600 }
      );
      const old = new Date(Date.now() - 10_000);
      for (const dir of [orphan, active, pending]) {
        fs.utimesSync(dir, old, old);
      }

      const removed = gcUsageReceiptInboxes(
        workspace,
        {
          active: { attempt_id: 'active', status: 'running', usage_legs: [] },
          pending: { attempt_id: 'pending', status: 'done', usage_legs: [] }
        },
        { retention_ms: 1, max: 3 }
      );

      expect(removed).toBe(1);
      expect(fs.existsSync(orphan)).toBe(false);
      expect(fs.existsSync(active)).toBe(true);
      expect(fs.existsSync(pending)).toBe(true);
    } finally {
      if (prior === undefined) {
        delete process.env.XDG_STATE_HOME;
      } else {
        process.env.XDG_STATE_HOME = prior;
      }
    }
  });

  test('bounds inspected inboxes even when none can be removed', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-receipt-'));
    temp_roots.push(root);
    const prior = process.env.XDG_STATE_HOME;
    process.env.XDG_STATE_HOME = root;
    try {
      const workspace = '/tmp/example-workspace/project-a';
      const active = usageReceiptInboxDir(workspace, 'a-active');
      const orphan = usageReceiptInboxDir(workspace, 'b-orphan');
      ensureUsageReceiptInbox(workspace, 'a-active');
      ensureUsageReceiptInbox(workspace, 'b-orphan');
      const old = new Date(Date.now() - 10_000);
      fs.utimesSync(active, old, old);
      fs.utimesSync(orphan, old, old);

      const removed = gcUsageReceiptInboxes(
        workspace,
        {
          'a-active': {
            attempt_id: 'a-active',
            status: 'running',
            usage_legs: []
          }
        },
        { retention_ms: 1, max: 1 }
      );

      expect(removed).toBe(0);
      expect(fs.existsSync(orphan)).toBe(true);

      const removed_next = gcUsageReceiptInboxes(
        workspace,
        {
          'a-active': {
            attempt_id: 'a-active',
            status: 'running',
            usage_legs: []
          }
        },
        { retention_ms: 1, max: 1 }
      );

      expect(removed_next).toBe(1);
      expect(fs.existsSync(orphan)).toBe(false);
    } finally {
      if (prior === undefined) {
        delete process.env.XDG_STATE_HOME;
      } else {
        process.env.XDG_STATE_HOME = prior;
      }
    }
  });
});
