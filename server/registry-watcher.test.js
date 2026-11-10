import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  getAvailableWorkspaces,
  readRegistry,
  readRegistryStrict
} from './registry-watcher.js';

/** @type {string} */
let home;

beforeEach(() => {
  home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-registry-'));
  vi.stubEnv('HOME', home);
});

afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(home, { recursive: true, force: true });
});

/**
 * @param {string} content
 */
function writeRegistry(content) {
  fs.mkdirSync(path.join(home, '.beads'), { recursive: true });
  fs.writeFileSync(path.join(home, '.beads', 'registry.json'), content);
}

describe('strict registry read (UI-xm29 §4.4 remove)', () => {
  test('reads a missing registry as no entry', () => {
    const entries = readRegistryStrict();

    expect(entries).toEqual([]);
  });

  test('throws on a registry that does not parse', () => {
    writeRegistry('{ not json');

    expect(() => readRegistryStrict()).toThrow();
  });

  test('throws on a registry that is not an array', () => {
    writeRegistry('{}');

    expect(() => readRegistryStrict()).toThrow('registry is not an array');
  });

  test('keeps the lenient read empty on a registry that does not parse', () => {
    writeRegistry('{ not json');

    const entries = readRegistry();

    expect(entries).toEqual([]);
  });

  test('lists the workspaces of a readable registry in strict mode', () => {
    writeRegistry(
      JSON.stringify([
        {
          workspace_path: '/work/one',
          database_path: '/work/one/.beads',
          pid: 1,
          version: '1'
        }
      ])
    );

    const workspaces = getAvailableWorkspaces({ strict: true });

    expect(workspaces.map((workspace) => workspace.path)).toEqual([
      '/work/one'
    ]);
  });

  test('throws from the strict workspace list on an unreadable registry', () => {
    writeRegistry('{ not json');

    expect(() => getAvailableWorkspaces({ strict: true })).toThrow();
  });
});
