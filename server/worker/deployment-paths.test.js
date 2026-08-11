import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  candidateInstallMarkerPath,
  deploymentReceiptPath,
  deploymentRoot,
  isReleasePath,
  managedClaimDir,
  managedFailurePath,
  managedJournalPath,
  releasePath,
  runtimeMarkerPath,
  runtimePointerPath
} from './deployment-paths.js';
import { workspaceSlug, workspaceStateDir } from './state-paths.js';

const REPO = '/tmp/workspaces/example-repo';
const SHA = 'a'.repeat(40);

/** @type {string | undefined} */
let saved_data;
/** @type {string | undefined} */
let saved_state;

beforeEach(() => {
  saved_data = process.env.XDG_DATA_HOME;
  saved_state = process.env.XDG_STATE_HOME;
  process.env.XDG_DATA_HOME = '/data';
  process.env.XDG_STATE_HOME = '/state';
});

afterEach(() => {
  if (saved_data === undefined) {
    delete process.env.XDG_DATA_HOME;
  } else {
    process.env.XDG_DATA_HOME = saved_data;
  }
  if (saved_state === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = saved_state;
  }
});

describe('worker/deployment-paths', () => {
  test('places releases under the XDG data home using the workspace slug', () => {
    expect(deploymentRoot(REPO)).toBe(
      path.join('/data', 'bdui', 'deploy', workspaceSlug(REPO))
    );
    expect(releasePath(REPO, SHA)).toBe(
      path.join(deploymentRoot(REPO), 'releases', SHA)
    );
  });

  test('places private receipts under the workspace state directory', () => {
    expect(deploymentReceiptPath(REPO, '../attempt/UI-1')).toBe(
      path.join(
        workspaceStateDir(REPO),
        'deploy-receipts',
        '.._attempt_UI-1.json'
      )
    );
  });

  test('derives attempt-bound managed state and global runtime paths', () => {
    const attempt = 'attempt/1';
    const key = `attempt_1-${crypto.createHash('sha256').update(attempt).digest('hex').slice(0, 16)}`;
    expect(managedJournalPath(REPO, 'attempt/1')).toBe(
      path.join(workspaceStateDir(REPO), 'managed-deploy', `${key}.json`)
    );
    expect(managedClaimDir(REPO, 'attempt/1')).toBe(
      path.join(workspaceStateDir(REPO), 'managed-deploy', `${key}.json.claims`)
    );
    expect(managedFailurePath(REPO, 'attempt/1')).toBe(
      path.join(
        workspaceStateDir(REPO),
        'managed-deploy',
        `${key}.json.failure`
      )
    );
    expect(candidateInstallMarkerPath(REPO, SHA)).toBe(
      path.join(releasePath(REPO, SHA), '.bdui', 'managed-install.json')
    );
    expect(runtimePointerPath()).toBe('/data/bdui/runtime/beads-ui/current');
    expect(runtimeMarkerPath()).toBe('/state/bdui/runtime/beads-ui.json');
  });

  test('keeps distinct unsafe attempt ids separate', () => {
    expect(managedJournalPath(REPO, 'a/b')).not.toBe(
      managedJournalPath(REPO, 'a?b')
    );
    expect(managedFailurePath(REPO, 'a/b')).not.toBe(
      managedFailurePath(REPO, 'a?b')
    );
  });

  test('keeps managed journal paths absolute for a relative XDG state value', () => {
    process.env.XDG_STATE_HOME = 'relative-state';

    expect(path.isAbsolute(managedJournalPath(REPO, 'attempt-1'))).toBe(true);
  });

  test('rejects a malformed candidate SHA', () => {
    expect(() => releasePath(REPO, '../escape')).toThrow(
      'candidate_sha_invalid'
    );
  });

  test('recognizes only paths contained by the release root', () => {
    expect(isReleasePath(REPO, releasePath(REPO, SHA))).toBe(true);
    expect(
      isReleasePath(REPO, path.join(deploymentRoot(REPO), 'outside'))
    ).toBe(false);
  });

  test('falls back to the XDG data default', () => {
    delete process.env.XDG_DATA_HOME;

    expect(deploymentRoot(REPO)).toBe(
      path.join(
        os.homedir(),
        '.local',
        'share',
        'bdui',
        'deploy',
        workspaceSlug(REPO)
      )
    );
  });
});
