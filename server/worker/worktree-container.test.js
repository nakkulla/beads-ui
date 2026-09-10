import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { prepareWorktreeContainer } from './worktree-container.js';

/** @type {string} */
let repo;

beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'worktree-container-'));
});

afterEach(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

describe('worker/worktree-container', () => {
  test('creates the ordinary container when neither entry exists', () => {
    const result = prepareWorktreeContainer(repo);

    expect(result).toEqual({
      path: path.join(repo, '.worktrees'),
      realpath: fs.realpathSync(path.join(repo, '.worktrees'))
    });
    expect(fs.lstatSync(result.path).isDirectory()).toBe(true);
  });

  test('preserves an existing ordinary container', () => {
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(container);

    const result = prepareWorktreeContainer(repo);

    expect(result.realpath).toBe(fs.realpathSync(container));
    expect(fs.lstatSync(container).isDirectory()).toBe(true);
  });

  test('accepts an ordinary directory creation race', () => {
    const container = path.join(repo, '.worktrees');
    const mkdir_sync = vi.fn((destination, options) => {
      fs.mkdirSync(destination);
      fs.mkdirSync(destination, options);
    });
    const racing_fs = new Proxy(fs, {
      get(target, property) {
        if (property === 'mkdirSync') {
          return mkdir_sync;
        }
        return Reflect.get(target, property);
      }
    });

    const result = prepareWorktreeContainer(repo, racing_fs);

    expect(result.realpath).toBe(fs.realpathSync(container));
    expect(mkdir_sync).toHaveBeenCalledWith(container, { recursive: true });
  });

  test('preserves an existing relative directory symlink before inspecting nosync', () => {
    const target = path.join(repo, 'existing-target');
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(target);
    fs.writeFileSync(path.join(repo, '.worktrees.nosync'), 'invalid\n');
    fs.symlinkSync('existing-target', container, 'dir');

    const result = prepareWorktreeContainer(repo);

    expect(result.realpath).toBe(fs.realpathSync(target));
    expect(fs.readlinkSync(container)).toBe('existing-target');
  });

  test('preserves an existing absolute directory symlink', () => {
    const target = fs.mkdtempSync(path.join(os.tmpdir(), 'worktree-target-'));
    const container = path.join(repo, '.worktrees');
    fs.symlinkSync(target, container, 'dir');

    try {
      const result = prepareWorktreeContainer(repo);

      expect(result.realpath).toBe(fs.realpathSync(target));
      expect(fs.readlinkSync(container)).toBe(target);
    } finally {
      fs.rmSync(target, { recursive: true, force: true });
    }
  });

  test('rejects a broken container symlink', () => {
    const container = path.join(repo, '.worktrees');
    fs.symlinkSync('missing-target', container, 'dir');

    expect(() => prepareWorktreeContainer(repo)).toThrow(container);
    expect(fs.readlinkSync(container)).toBe('missing-target');
  });

  test('rejects a circular container symlink', () => {
    const container = path.join(repo, '.worktrees');
    fs.symlinkSync('.worktrees', container, 'dir');

    expect(() => prepareWorktreeContainer(repo)).toThrow(container);
    expect(fs.readlinkSync(container)).toBe('.worktrees');
  });

  test('rejects a regular file at the container path', () => {
    const container = path.join(repo, '.worktrees');
    fs.writeFileSync(container, 'keep\n');

    expect(() => prepareWorktreeContainer(repo)).toThrow(container);
    expect(fs.readFileSync(container, 'utf8')).toBe('keep\n');
  });

  test('rejects a regular file at the nosync path', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    fs.writeFileSync(nosync, 'keep\n');

    expect(() => prepareWorktreeContainer(repo)).toThrow(nosync);
    expect(fs.existsSync(path.join(repo, '.worktrees'))).toBe(false);
  });

  test('rejects a symlink at the nosync path', () => {
    const target = path.join(repo, 'target');
    const nosync = path.join(repo, '.worktrees.nosync');
    fs.mkdirSync(target);
    fs.symlinkSync('target', nosync, 'dir');

    expect(() => prepareWorktreeContainer(repo)).toThrow(nosync);
    expect(fs.existsSync(path.join(repo, '.worktrees'))).toBe(false);
  });

  test('links an absent container to a prepared nosync directory', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(nosync);

    const result = prepareWorktreeContainer(repo);

    expect(result).toEqual({
      path: container,
      realpath: fs.realpathSync(nosync)
    });
    expect(fs.readlinkSync(container)).toBe('.worktrees.nosync');
  });

  test('replaces an empty ordinary container with the relative nosync link', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(nosync);
    fs.mkdirSync(container);

    const result = prepareWorktreeContainer(repo);

    expect(result.realpath).toBe(fs.realpathSync(nosync));
    expect(fs.lstatSync(container).isSymbolicLink()).toBe(true);
    expect(fs.readlinkSync(container)).toBe('.worktrees.nosync');
  });

  test('keeps every entry in a nonempty ordinary container', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(nosync);
    fs.mkdirSync(container);
    fs.writeFileSync(path.join(container, 'keep'), 'human data\n');

    expect(() => prepareWorktreeContainer(repo)).toThrow(container);
    expect(fs.readFileSync(path.join(container, 'keep'), 'utf8')).toBe(
      'human data\n'
    );
    expect(fs.lstatSync(container).isDirectory()).toBe(true);
  });

  test('returns the same prepared link on repeated calls', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    fs.mkdirSync(nosync);
    const first = prepareWorktreeContainer(repo);

    const second = prepareWorktreeContainer(repo);

    expect(second).toEqual(first);
    expect(fs.readlinkSync(first.path)).toBe('.worktrees.nosync');
  });

  test('accepts one same-target link creation race', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(nosync);
    const symlink_sync = vi.fn((target, destination, type) => {
      fs.symlinkSync(target, destination, type);
      throw Object.assign(new Error('lost race'), { code: 'EEXIST' });
    });
    const racing_fs = new Proxy(fs, {
      get(target, property) {
        if (property === 'symlinkSync') {
          return symlink_sync;
        }
        return Reflect.get(target, property);
      }
    });

    const result = prepareWorktreeContainer(repo, racing_fs);

    expect(result.realpath).toBe(fs.realpathSync(nosync));
    expect(fs.readlinkSync(container)).toBe('.worktrees.nosync');
    expect(symlink_sync).toHaveBeenCalledTimes(1);
  });

  test('rejects a different-target link creation race', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    const other = path.join(repo, 'other');
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(nosync);
    fs.mkdirSync(other);
    const racing_fs = new Proxy(fs, {
      get(target, property) {
        if (property === 'symlinkSync') {
          return () => {
            fs.symlinkSync('other', container, 'dir');
            throw Object.assign(new Error('lost race'), { code: 'EEXIST' });
          };
        }
        return Reflect.get(target, property);
      }
    });

    expect(() => prepareWorktreeContainer(repo, racing_fs)).toThrow(container);
    expect(fs.readlinkSync(container)).toBe('other');
  });

  test('leaves no ordinary fallback after link creation fails', () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(nosync);
    fs.mkdirSync(container);
    const failing_fs = new Proxy(fs, {
      get(target, property) {
        if (property === 'symlinkSync') {
          return () => {
            throw new Error('link denied');
          };
        }
        return Reflect.get(target, property);
      }
    });

    expect(() => prepareWorktreeContainer(repo, failing_fs)).toThrow(container);
    expect(fs.existsSync(container)).toBe(false);
    expect(fs.lstatSync(nosync).isDirectory()).toBe(true);
  });
});
