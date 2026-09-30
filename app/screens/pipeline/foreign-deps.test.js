import { afterEach, describe, expect, test } from 'vitest';
import { NOW, mountPipeline } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

const REPO_A = '/fixture/repo-a';
const REPO_B = '/fixture/repo-b';

/**
 * The 레포 scope of repo-a with A-1 blocked by repo-b's queued B-3.
 */
function mountBlocked() {
  const handle = mountPipeline({
    now: NOW,
    scope: REPO_A,
    edit: (fixture) => {
      fixture.workspaces[0].bead_blocked_by = { 'A-1': ['B-3'] };
    }
  });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @returns {HTMLElement}
 */
function chipOf(root) {
  const chip = root.querySelector(
    `.pl-row[data-bead-id="A-1"] .pl-deps .pl-chip--dep`
  );
  if (!(chip instanceof HTMLElement)) {
    throw new Error('missing dependency chip');
  }
  return chip;
}

describe('레포 범위의 타 레포 의존 칩 (UI-dbn6 §3.2, P1-r2)', () => {
  test('locates a blocker queued in another repo', () => {
    const { mount: root } = mountBlocked();

    const chip = chipOf(root);

    expect(chip.title).not.toContain('위치 미확인');
    expect(chip.title).toContain('repo-b · 병렬 #3');
  });

  test('opens the other repo blocker in its own repo', () => {
    const { mount: root, openIssue } = mountBlocked();

    chipOf(root).click();

    expect(openIssue).toHaveBeenCalledWith('B-3', REPO_B);
  });
});
