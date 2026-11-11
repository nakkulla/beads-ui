import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  createHermesCodexFollow,
  installHermesCodexFollow
} from './hermes-codex-follow.js';
import {
  notifyAccountSwitched,
  subscribeAccountSwitched
} from './routes/account-switch.js';

const AUTH_CLAIM = 'https://api.openai.com/auth';

/** @type {string[]} */
const temp_dirs = [];

afterEach(() => {
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/**
 * An unsigned JWT whose payload names one ChatGPT user and workspace.
 *
 * @param {string} user
 * @param {string} workspace
 */
function jwtOf(user, workspace) {
  const encode = (/** @type {unknown} */ value) =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  return [
    encode({ alg: 'none' }),
    encode({
      email: `${user}@example.com`,
      [AUTH_CLAIM]: { chatgpt_user_id: user, chatgpt_account_id: workspace }
    }),
    'sig'
  ].join('.');
}

/**
 * Write a Codex login for `user::workspace` and a Hermes pool, returning the
 * homes the follower reads.
 *
 * @param {{ codex: [string, string], pool: Array<{ id: string, priority: number, key?: [string, string] }> }} fixture
 */
function homesWith(fixture) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-follow-'));
  temp_dirs.push(root);
  const codex_home = path.join(root, 'codex');
  const hermes_home = path.join(root, 'hermes');
  fs.mkdirSync(codex_home);
  fs.mkdirSync(hermes_home);
  fs.writeFileSync(
    path.join(codex_home, 'auth.json'),
    JSON.stringify({
      tokens: {
        id_token: jwtOf(...fixture.codex),
        account_id: fixture.codex[1]
      }
    })
  );
  fs.writeFileSync(
    path.join(hermes_home, 'auth.json'),
    JSON.stringify({
      credential_pool: {
        'openai-codex': fixture.pool.map((entry) => ({
          id: entry.id,
          priority: entry.priority,
          ...(entry.key ? { access_token: jwtOf(...entry.key) } : {})
        }))
      }
    })
  );
  return { codex_home, hermes_home, home_dir: root };
}

/**
 * An execFile stand-in that answers each call with the next queued error.
 *
 * @param {Array<(Error & { code?: unknown, killed?: boolean }) | null>} answers
 */
function fakeExecFile(answers) {
  /** @type {Array<{ file: string, args: string[] }>} */
  const calls = [];
  const exec_file = vi.fn(
    (
      /** @type {string} */ file,
      /** @type {string[]} */ args,
      /** @type {unknown} */ _options,
      /** @type {(error: any) => void} */ callback
    ) => {
      calls.push({ file, args });
      callback(answers.shift() ?? null);
    }
  );
  return { exec_file, calls };
}

/**
 * @param {string|number|null} code
 * @param {boolean} [killed]
 */
function execError(code, killed = false) {
  return Object.assign(new Error('exec'), { code, killed });
}

const TWO_ACCOUNTS = [
  {
    id: 'aaa111',
    priority: 0,
    key: /** @type {[string, string]} */ (['u1', 'ws1'])
  },
  {
    id: 'bbb222',
    priority: 1,
    key: /** @type {[string, string]} */ (['u2', 'ws2'])
  }
];

describe('createHermesCodexFollow', () => {
  test('moves the matching Hermes entry to priority 0', async () => {
    const homes = homesWith({ codex: ['u2', 'ws2'], pool: TWO_ACCOUNTS });
    const { exec_file, calls } = fakeExecFile([null]);

    const outcome = await createHermesCodexFollow({
      ...homes,
      exec_file
    }).follow();

    expect(outcome).toEqual({ status: 'moved', entry_id: 'bbb222' });
    expect(calls).toEqual([
      {
        file: 'hermes',
        args: ['auth', 'priority', 'openai-codex', 'bbb222', '0']
      }
    ]);
  });

  test('leaves Hermes alone when no entry is the same account', async () => {
    const homes = homesWith({ codex: ['u2', 'ws9'], pool: TWO_ACCOUNTS });
    const { exec_file } = fakeExecFile([]);

    const outcome = await createHermesCodexFollow({
      ...homes,
      exec_file
    }).follow();

    expect(outcome).toEqual({ status: 'no_match' });
    expect(exec_file).not.toHaveBeenCalled();
  });

  test('skips the command when the matching entry is already first', async () => {
    const homes = homesWith({ codex: ['u1', 'ws1'], pool: TWO_ACCOUNTS });
    const { exec_file } = fakeExecFile([]);

    const outcome = await createHermesCodexFollow({
      ...homes,
      exec_file
    }).follow();

    expect(outcome).toEqual({ status: 'already_first', entry_id: 'aaa111' });
    expect(exec_file).not.toHaveBeenCalled();
  });

  test('falls back to ~/.local/bin/hermes and reports hermes_missing when neither exists', async () => {
    const homes = homesWith({ codex: ['u2', 'ws2'], pool: TWO_ACCOUNTS });
    const { exec_file, calls } = fakeExecFile([
      execError('ENOENT'),
      execError('ENOENT')
    ]);

    const outcome = await createHermesCodexFollow({
      ...homes,
      exec_file
    }).follow();

    expect(outcome).toEqual({ status: 'hermes_missing', entry_id: 'bbb222' });
    expect(calls.map((call) => call.file)).toEqual([
      'hermes',
      path.join(homes.home_dir, '.local', 'bin', 'hermes')
    ]);
  });

  test('reports a failed hermes command without retrying', async () => {
    const homes = homesWith({ codex: ['u2', 'ws2'], pool: TWO_ACCOUNTS });
    const { exec_file } = fakeExecFile([execError(2)]);

    const outcome = await createHermesCodexFollow({
      ...homes,
      exec_file
    }).follow();

    expect(outcome).toEqual({ status: 'failed', entry_id: 'bbb222' });
    expect(exec_file).toHaveBeenCalledTimes(1);
  });

  test('reports a killed hermes command as a timeout', async () => {
    const homes = homesWith({ codex: ['u2', 'ws2'], pool: TWO_ACCOUNTS });
    const { exec_file } = fakeExecFile([execError(null, true)]);

    const outcome = await createHermesCodexFollow({
      ...homes,
      exec_file,
      timeout_ms: 50
    }).follow();

    expect(outcome).toEqual({ status: 'timeout', entry_id: 'bbb222' });
    expect(exec_file.mock.calls[0][2]).toMatchObject({
      shell: false,
      timeout: 50
    });
  });

  test('ignores pool entries that carry no access token', async () => {
    const homes = homesWith({
      codex: ['u2', 'ws2'],
      pool: [
        { id: 'aaa111', priority: 0 },
        { id: 'bbb222', priority: 1, key: ['u2', 'ws2'] }
      ]
    });
    const { exec_file } = fakeExecFile([null]);

    const outcome = await createHermesCodexFollow({
      ...homes,
      exec_file
    }).follow();

    expect(outcome).toEqual({ status: 'moved', entry_id: 'bbb222' });
  });
});

describe('installHermesCodexFollow', () => {
  test('follows a Codex switch and ignores a Claude switch', async () => {
    const homes = homesWith({ codex: ['u2', 'ws2'], pool: TWO_ACCOUNTS });
    const { exec_file } = fakeExecFile([null]);
    /** @type {string[]} */
    const lines = [];
    const logged = new Promise((resolve) => {
      const unsubscribe = installHermesCodexFollow({
        ...homes,
        exec_file,
        subscribe: subscribeAccountSwitched,
        log: (line) => {
          lines.push(line);
          unsubscribe();
          resolve(undefined);
        }
      });
    });

    notifyAccountSwitched('claude');
    notifyAccountSwitched('codex');
    await logged;

    expect(lines).toEqual(['hermes-codex-follow: moved entry=bbb222']);
    expect(exec_file).toHaveBeenCalledTimes(1);
  });
});
