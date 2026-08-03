import { describe, expect, test } from 'vitest';
import { setConnWorkspace } from './context.js';
import { targetWorkspaceOf } from './workspace-target.js';

const CONN_WS = '/tmp/example/repo-conn';
const ALLOWED_WS = '/tmp/example/repo-target';

/**
 * A socket-shaped object; only its identity matters to the connection registry.
 *
 * @returns {any}
 */
function fakeSocket() {
  return { readyState: 1, OPEN: 1, send() {} };
}

/**
 * @param {string} [root_dir]
 * @returns {any}
 */
function connectedSocket(root_dir = CONN_WS) {
  const sock = fakeSocket();
  setConnWorkspace(sock, { root_dir, db_path: `${root_dir}/.beads/db` });
  return sock;
}

/**
 * @returns {{ listWorkspaces: () => Array<{ path: string }> }}
 */
function registry() {
  return {
    listWorkspaces: () => [{ path: CONN_WS }, { path: ALLOWED_WS }]
  };
}

describe('targetWorkspaceOf (UI-qrfo §5)', () => {
  test('returns an allow-listed absolute root_dir', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(sock, { root_dir: ALLOWED_WS }, registry());

    expect(key).toBe(ALLOWED_WS);
  });

  test('rejects an absolute path outside the allow list', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(
      sock,
      { root_dir: '/tmp/example/not-registered' },
      registry()
    );

    expect(key).toBeNull();
  });

  test('rejects a relative root_dir', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(
      sock,
      { root_dir: 'example/repo-target' },
      registry()
    );

    expect(key).toBeNull();
  });

  test('rejects an empty root_dir', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(sock, { root_dir: '' }, registry());

    expect(key).toBeNull();
  });

  test('falls back to the connection workspace when root_dir is absent', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(sock, { bead_id: 'UI-1' }, registry());

    expect(key).toBe(CONN_WS);
  });

  test('falls back to the connection workspace on a missing payload', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(sock, undefined, registry());

    expect(key).toBe(CONN_WS);
  });

  // `..` must be collapsed BEFORE the comparison, or a path that resolves into
  // the allow list is refused and — worse — one that resolves out of it passes.
  test('accepts a dot-dot path that resolves into the allow list', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(
      sock,
      { root_dir: '/tmp/example/repo-conn/../repo-target' },
      registry()
    );

    expect(key).toBe(ALLOWED_WS);
  });

  test('rejects a dot-dot path that resolves out of the allow list', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(
      sock,
      { root_dir: '/tmp/example/repo-target/../elsewhere' },
      registry()
    );

    expect(key).toBeNull();
  });

  test('compares against a resolved allow list', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(
      sock,
      { root_dir: ALLOWED_WS },
      {
        listWorkspaces: () => [
          { path: '/tmp/example/repo-conn/../repo-target' }
        ]
      }
    );

    expect(key).toBe(ALLOWED_WS);
  });

  test('rejects everything when the registry is unreadable', () => {
    const sock = connectedSocket();

    const key = targetWorkspaceOf(
      sock,
      { root_dir: ALLOWED_WS },
      {
        listWorkspaces: () => {
          throw new Error('registry boom');
        }
      }
    );

    expect(key).toBeNull();
  });
});
