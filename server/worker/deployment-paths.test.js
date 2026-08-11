import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  deploymentReceiptPath,
  deploymentRoot,
  isReleasePath,
  releasePath
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
