import { beforeEach, expect, test, vi } from 'vitest';

const CONN_WS = '/tmp/example/repo-conn';
const TARGET_WS = '/tmp/example/repo-target';

const state = vi.hoisted(() => ({
  gate: vi.fn(),
  runBd: vi.fn(),
  runProjected: vi.fn()
}));

vi.mock('../bd-effect-gate.js', () => ({
  requireBdJsonCapabilityForWorkspace: state.gate
}));

vi.mock('../bd.js', () => ({
  getGitUserName: vi.fn(),
  kvGetJson: vi.fn(),
  kvSetJson: vi.fn(),
  runBd: state.runBd,
  runBdJsonProjected: state.runProjected
}));

const { runBdInWorkspace, runBdJsonProjectedInWorkspace, setConnWorkspace } =
  await import('./context.js');

/**
 * @returns {any}
 */
function connectedSocket() {
  const ws = /** @type {any} */ ({});
  setConnWorkspace(ws, { root_dir: CONN_WS, db_path: '' });
  return ws;
}

beforeEach(() => {
  state.gate.mockReset();
  state.runBd.mockReset();
  state.runProjected.mockReset();
  state.gate.mockResolvedValue({ ok: true });
  state.runBd.mockResolvedValue({ code: 0, stdout: '', stderr: '' });
  state.runProjected.mockResolvedValue({ ok: true, data: { id: 'A-1' } });
});

test('gates an explicit write against its target workspace', async () => {
  const ws = connectedSocket();

  await runBdInWorkspace(ws, ['dep', 'add', 'A-1', 'B-1'], {
    cwd: TARGET_WS
  });

  expect(state.gate).toHaveBeenCalledWith('write', TARGET_WS);
  expect(state.runBd).toHaveBeenCalledWith(['dep', 'add', 'A-1', 'B-1'], {
    cwd: TARGET_WS
  });
});

test('binds an explicit readback to its target workspace', async () => {
  const ws = connectedSocket();

  await runBdJsonProjectedInWorkspace(ws, 'show', ['show', 'A-1', '--json'], {
    expected_id: 'A-1',
    cwd: TARGET_WS
  });

  expect(state.runProjected).toHaveBeenCalledWith(
    'show',
    ['show', 'A-1', '--json'],
    { expected_id: 'A-1', cwd: TARGET_WS }
  );
});

test('keeps connection workspace binding when cwd is absent', async () => {
  const ws = connectedSocket();

  await runBdInWorkspace(ws, ['dep', 'remove', 'A-1', 'B-1']);

  expect(state.gate).toHaveBeenCalledWith('write', CONN_WS);
  expect(state.runBd).toHaveBeenCalledWith(['dep', 'remove', 'A-1', 'B-1'], {
    cwd: CONN_WS
  });
});
