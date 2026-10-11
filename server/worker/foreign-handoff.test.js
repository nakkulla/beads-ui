import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createBeadTimeline } from './bead-timeline.js';
import {
  FOREIGN_HANDOFF_NOTIFY_LABEL,
  createForeignHandoffAnnouncer,
  foreignHandoffCauseOf
} from './foreign-handoff.js';

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'foreign-handoff-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * @param {{ timeline?: any }} [over]
 */
function makeAnnouncer(over = {}) {
  const needsHuman = vi.fn(async () => {});
  const timeline =
    over.timeline ?? createBeadTimeline({ workspace_root: root });
  const announcer = createForeignHandoffAnnouncer({
    workspace: root,
    repo: root,
    timeline,
    notify: { needsHuman }
  });
  return { announcer, needsHuman, timeline };
}

const INPUT = {
  bead_id: 'UI-1',
  cause: 'foreign_conflict_needs_human',
  identity: 'a'.repeat(40),
  pr_url: 'https://github.com/acme/target/pull/4',
  foreign_path: '/targets/target'
};

describe('foreign-handoff announcer (UI-k467 §3.7)', () => {
  test('pushes the contract notify_label with the session exit only', async () => {
    const { announcer, needsHuman } = makeAnnouncer();

    announcer.announce(INPUT);
    await Promise.resolve();
    await Promise.resolve();

    expect(needsHuman).toHaveBeenCalledWith(
      expect.objectContaining({
        bead_id: 'UI-1',
        failure_class: '외부 PR 사람 처리 필요',
        reason: 'foreign_handoff:foreign_conflict_needs_human',
        next_action: '[세션에서 이어가기]'
      })
    );
  });

  test('pushes one wall once across a fresh announcer reading the same timeline', async () => {
    const first = makeAnnouncer();
    first.announcer.announce(INPUT);
    const second = makeAnnouncer({ timeline: first.timeline });

    const announced = second.announcer.announce(INPUT);
    await Promise.resolve();

    expect(announced).toBe(false);
    expect(second.needsHuman).not.toHaveBeenCalled();
  });

  test('pushes again for a new identity of the same cause', async () => {
    const { announcer, needsHuman } = makeAnnouncer();
    announcer.announce(INPUT);

    announcer.announce({ ...INPUT, identity: 'b'.repeat(40) });
    await Promise.resolve();
    await Promise.resolve();

    expect(needsHuman).toHaveBeenCalledTimes(2);
  });

  test('sends nothing when the once-record cannot be written', async () => {
    const { announcer, needsHuman } = makeAnnouncer({
      timeline: {
        append: () => ({ ok: false }),
        readTimeline: () => []
      }
    });

    const announced = announcer.announce(INPUT);
    await Promise.resolve();

    expect(announced).toBe(false);
    expect(needsHuman).not.toHaveBeenCalled();
  });

  test('copies the contract label byte for byte', () => {
    const label = FOREIGN_HANDOFF_NOTIFY_LABEL;

    expect(Buffer.from(label, 'utf8').toString('hex')).toBe(
      Buffer.from('외부 PR 사람 처리 필요', 'utf8').toString('hex')
    );
  });

  test('reads a cause only from the class token', () => {
    const cause = foreignHandoffCauseOf('foreign_deploy_unsupported');

    expect(cause).toBe(null);
  });
});
