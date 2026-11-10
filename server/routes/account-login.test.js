import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  claudeLoginArgv,
  codexIdentityOf,
  createAccountLoginHandlers,
  createAccountLoginManager,
  createLoginFiles,
  deviceCodeOf,
  lastJsonObjectOf,
  lastOutputLine,
  loginUrlOf
} from './account-login.js';
import {
  __resetSwitchStateForTest,
  acquireSwitchLock,
  isSwitchInFlight,
  releaseSwitchLock
} from './account-switch.js';

/**
 * @import { CommandResult, LoginFiles } from './account-login.js'
 * @typedef {EventEmitter & { pid: number, stdout: EventEmitter & { setEncoding: () => void }, stderr: EventEmitter & { setEncoding: () => void } }} FakeChild
 */

const DEVICE_URL = 'https://auth.openai.com/codex/device';
const DEVICE_CODE = 'K7QX-M2P9D';
// `codex login --device-auth` output rebuilt on the line structure of one
// masked capture (codex-cli 0.162.0, 2026-11-10: a leading blank line, the
// link and the code each alone on an indented, newline-terminated line, ANSI
// colors); the words are typical and the code is invented.
const DEVICE_OUTPUT = [
  '',
  '\u001b[1mWelcome to Codex\u001b[0m [v0.162.0]',
  "\u001b[90mOpenAI's command-line coding agent\u001b[0m",
  '',
  'Follow these steps to sign in with ChatGPT using device code authorization:',
  '',
  '1. Open this link in your browser and sign in to your account',
  `   \u001b[94m${DEVICE_URL}\u001b[0m`,
  '',
  '2. Enter this one-time code \u001b[90m(expires in 15 minutes)\u001b[0m',
  `   \u001b[94m${DEVICE_CODE}\u001b[0m`,
  '',
  '\u001b[90mDevice codes are a common phishing target. Never share this code.\u001b[0m',
  ''
].join('\n');

const KEY_A = 'user-AAA::11111111-1111-1111-1111-111111111111';
const KEY_B = 'user-BBB::22222222-2222-2222-2222-222222222222';
const KEY_C = 'user-CCC::33333333-3333-3333-3333-333333333333';

const CLAUDE_URL =
  'https://claude.ai/oauth/authorize?code=true&client_id=9d1c250a&response_type=code&redirect_uri=https%3A%2F%2Fplatform.claude.com%2Foauth%2Fcode%2Fcallback&scope=user%3Aprofile+user%3Ainference&code_challenge=abcDEF123&code_challenge_method=S256&state=xyz789';
const CLAUDE_CODE = 'pasteCODE-abc_123#state789';
const CLAUDE_SCREEN = [
  'Logging in Account-2 (two@example.com) [isolated login]',
  '',
  "Browser didn't open? Use the url below to sign in (c to copy)",
  '',
  CLAUDE_URL,
  '',
  'Paste code here if prompted >'
].join('\n');

// `cswap login --json` / `cswap remove --yes --json` result lines as
// claude-swap a279d67 prints them: one unindented JSON line, stdout's last.
const CSWAP_LOGIN_UPDATED =
  '{"schemaVersion": 1, "ok": true, "outcome": "updated", "number": 2, "email": "two@example.com"}';
const CSWAP_LOGIN_ADDED =
  '{"schemaVersion": 1, "ok": true, "outcome": "added", "number": 5, "email": "new@example.com"}';
const CSWAP_LOGIN_MISMATCH =
  '{"schemaVersion": 1, "ok": false, "error": "identity_mismatch", "message": "The login is other@example.com [personal], not Account-2 (two@example.com [personal]); nothing was saved."}';
const CSWAP_LOGIN_CANCELLED =
  '{"schemaVersion": 1, "ok": false, "error": "login_incomplete", "message": "Cancelled."}';

/** @type {(code: number, stdout?: string, stderr?: string) => CommandResult} */
function commandResult(code, stdout = '', stderr = '') {
  return { code, stdout, stderr, not_found: false, timed_out: false };
}

/**
 * @param {number} [rounds]
 */
async function drain(rounds = 60) {
  for (let round = 0; round < rounds; round += 1) {
    await Promise.resolve();
  }
}

/**
 * @param {{ user: string, workspace: string, email: string }} identity
 * @returns {Buffer}
 */
function codexAuthJson(identity) {
  /** @param {unknown} value */
  const b64 = (value) =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  const claims = {
    email: identity.email,
    'https://api.openai.com/auth': {
      chatgpt_user_id: identity.user,
      chatgpt_account_id: identity.workspace,
      user_id: identity.user
    }
  };
  return Buffer.from(
    JSON.stringify({
      OPENAI_API_KEY: null,
      tokens: {
        id_token: `${b64({ alg: 'none' })}.${b64(claims)}.sig`,
        access_token: 'at-secret-token',
        refresh_token: 'rt-secret-token',
        account_id: identity.workspace
      },
      last_refresh: '2026-11-10T00:00:00Z'
    })
  );
}

/**
 * @param {string} key
 * @param {string} email
 */
function authFor(key, email) {
  const [user, workspace] = key.split('::');
  return codexAuthJson({ user, workspace, email });
}

/**
 * A codex-auth stand-in holding the §2 measured behaviour (codex-auth
 * 0.3.0-alpha.11): `import` writes only the account file — `imported` for a
 * new key, `updated` for a known one — and never the active key or the
 * global auth.json; `switch` to another account first backs the global
 * auth.json up into the account it leaves.
 *
 * @param {{ accounts: Array<[string, string]>, active_key: string|null }} initial
 */
function codexAuthModel(initial) {
  /** @type {Map<string, { email: string, bytes: Buffer }>} */
  const accounts = new Map();
  for (const [key, email] of initial.accounts) {
    accounts.set(key, { email, bytes: authFor(key, `${email}`) });
  }
  const model = {
    accounts,
    active_key: initial.active_key,
    /** @type {Buffer|null} */
    auth_json: initial.active_key
      ? /** @type {Buffer} */ (accounts.get(initial.active_key)?.bytes)
      : null,
    /**
     * @param {Buffer|undefined} bytes
     * @returns {CommandResult}
     */
    import(bytes) {
      const identity = bytes ? codexIdentityOf(bytes) : null;
      if (!bytes || !identity) {
        return commandResult(
          1,
          'Import Summary: 0 imported, 1 skipped\n',
          '  skipped   auth.json: MissingEmail\n'
        );
      }
      const known = accounts.has(identity.key);
      accounts.set(identity.key, {
        email: identity.email || '',
        bytes
      });
      return commandResult(
        0,
        known ? '  updated   auth.json\n' : '  imported  auth.json\n'
      );
    },
    /**
     * @param {string} key
     */
    switchTo(key) {
      if (key === model.active_key) {
        return;
      }
      if (model.active_key && model.auth_json) {
        const leaving = accounts.get(model.active_key);
        if (leaving) {
          leaving.bytes = model.auth_json;
        }
      }
      model.active_key = key;
      model.auth_json = accounts.get(key)?.bytes ?? null;
    },
    list() {
      return {
        ok: /** @type {const} */ (true),
        accounts: [...accounts].map(([key, row], index) => ({
          key,
          number: index + 1,
          email: row.email,
          active: key === model.active_key
        })),
        active_key: model.active_key
      };
    }
  };
  return model;
}

/**
 * In-memory login files.
 */
function fakeFiles() {
  let next = 0;
  const state = {
    /** @type {Set<string>} */
    homes: new Set(),
    /** @type {string[]} */
    removed_homes: [],
    /** @type {Map<string, Buffer>} */
    auth: new Map(),
    /** @type {Map<string, number>} */
    pid_records: new Map(),
    /** @type {Buffer[]} */
    replaced: []
  };
  /** @type {LoginFiles} */
  const files = {
    createTempHome: vi.fn(async () => {
      next += 1;
      const home = `/state/account-login/codex-tmp/home-${next}`;
      state.homes.add(home);
      return home;
    }),
    removeTempHome: vi.fn(async (/** @type {string} */ home) => {
      state.homes.delete(home);
      state.removed_homes.push(home);
    }),
    tempAuthPath: (home) => `${home}/auth.json`,
    readTempAuth: vi.fn(async (/** @type {string} */ home) => {
      const bytes = state.auth.get(home);
      if (!bytes) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' });
      }
      return bytes;
    }),
    replaceActiveAuth: vi.fn(async (/** @type {Buffer} */ bytes) => {
      state.replaced.push(bytes);
    }),
    writePidRecord: vi.fn(
      async (/** @type {string} */ id, /** @type {number} */ pid) => {
        state.pid_records.set(id, pid);
      }
    ),
    removePidRecord: vi.fn(async (/** @type {string} */ id) => {
      state.pid_records.delete(id);
    }),
    readPidRecords: vi.fn(async () =>
      [...state.pid_records].map(([login_id, pid]) => ({ login_id, pid }))
    ),
    removeTempHomes: vi.fn(async () => {
      const count = state.homes.size;
      state.homes.clear();
      return count;
    })
  };
  return { files, state };
}

/**
 * @param {number} pid
 * @returns {FakeChild}
 */
function fakeChild(pid) {
  const child = /** @type {FakeChild} */ (new EventEmitter());
  child.pid = pid;
  child.stdout = Object.assign(new EventEmitter(), { setEncoding() {} });
  child.stderr = Object.assign(new EventEmitter(), { setEncoding() {} });
  return child;
}

/**
 * @param {FakeChild} child
 * @param {number|null} code
 * @param {NodeJS.Signals|null} [signal]
 */
function endChild(child, code, signal = null) {
  child.emit('exit', code, signal);
  child.emit('close', code, signal);
}

/**
 * @param {{ model?: ReturnType<typeof codexAuthModel>, resolveBin?: (name: string) => string|null }} [options]
 */
function codexHarness(options = {}) {
  const model =
    options.model ||
    codexAuthModel({
      accounts: [
        [KEY_A, 'a@example.com'],
        [KEY_B, 'b@example.com']
      ],
      active_key: KEY_A
    });
  const { files, state } = fakeFiles();
  /** @type {FakeChild[]} */
  const children = [];
  /** @type {Array<[string, boolean]>} */
  const lock_seen = [];
  const spawnLogin = vi.fn(() => {
    const child = fakeChild(4000 + children.length);
    children.push(child);
    return child;
  });
  const runCommand = vi.fn(
    async (/** @type {string} */ _bin, /** @type {string[]} */ args) => {
      lock_seen.push([`run:${args[0]}`, isSwitchInFlight('codex')]);
      if (args[0] === 'import') {
        return model.import(state.auth.get(path.dirname(args[1])));
      }
      return commandResult(0);
    }
  );
  vi.mocked(files.replaceActiveAuth).mockImplementation(async (bytes) => {
    lock_seen.push(['replace', isSwitchInFlight('codex')]);
    state.replaced.push(bytes);
    model.auth_json = bytes;
  });
  const listCodex = vi.fn(async () => {
    lock_seen.push(['list', isSwitchInFlight('codex')]);
    return model.list();
  });
  const listClaude = vi.fn(async () => ({
    ok: /** @type {const} */ (true),
    accounts: [],
    active_key: null
  }));
  const invalidateCodex = vi.fn();
  const invalidateClaude = vi.fn();
  const killGroup = vi.fn();
  const log = vi.fn();
  let id = 0;
  const manager = createAccountLoginManager({
    resolveBin:
      options.resolveBin || ((/** @type {string} */ name) => `/fake/${name}`),
    resolveCswap: () => '/fake/cswap',
    spawnLogin,
    runCommand,
    runTmux: async () => commandResult(1),
    killGroup,
    processAlive: () => false,
    files,
    listAccounts: { codex: listCodex, claude: listClaude },
    invalidateUsageCache: { codex: invalidateCodex, claude: invalidateClaude },
    randomId: () => {
      id += 1;
      return `login-${id}`;
    },
    env: { PATH: '/usr/bin:/bin' },
    log
  });
  return {
    manager,
    model,
    files,
    state,
    children,
    spawnLogin,
    runCommand,
    listCodex,
    invalidateCodex,
    killGroup,
    log,
    lock_seen
  };
}

/**
 * Start a Codex login and bring it to `awaiting_user`.
 *
 * @param {ReturnType<typeof codexHarness>} h
 * @param {Record<string, unknown>} input
 */
async function startCodexToCode(h, input) {
  const started = await h.manager.start({ provider: 'codex', ...input });
  await drain();
  const child = h.children[h.children.length - 1];
  child.stdout.emit('data', DEVICE_OUTPUT);
  if (!started.ok) {
    throw new Error(`start failed: ${started.error}`);
  }
  return { login_id: started.login_id, child };
}

/**
 * Finish a Codex child with exit 0 after it wrote `auth.json`.
 *
 * @param {ReturnType<typeof codexHarness>} h
 * @param {FakeChild} child
 * @param {Buffer} auth
 */
async function completeCodexLogin(h, child, auth) {
  const home = [...h.state.homes][h.state.homes.size - 1];
  h.state.auth.set(home, auth);
  endChild(child, 0);
  await drain();
}

beforeEach(() => {
  vi.useFakeTimers();
  __resetSwitchStateForTest();
});

afterEach(() => {
  vi.useRealTimers();
  __resetSwitchStateForTest();
});

describe('codex output parsing', () => {
  test('extracts the link and code from ANSI-colored output', () => {
    const found = deviceCodeOf(DEVICE_OUTPUT);

    expect(found).toEqual({ url: DEVICE_URL, user_code: DEVICE_CODE });
  });

  test('waits for the line that ends a code split across chunks', () => {
    const cut = DEVICE_OUTPUT.indexOf(DEVICE_CODE) + 6;

    const found = deviceCodeOf(DEVICE_OUTPUT.slice(0, cut));

    expect(found).toBeNull();
  });

  test('strips ANSI and cuts the last output line to 200 characters', () => {
    const output = `first\n\u001b[31m${'x'.repeat(300)}\u001b[0m\n\n`;

    const line = lastOutputLine(output);

    expect(line).toBe('x'.repeat(200));
  });

  test('derives the codex-auth account key from the id_token payload', () => {
    const identity = codexIdentityOf(authFor(KEY_A, 'a@example.com'));

    expect(identity).toEqual({ key: KEY_A, email: 'a@example.com' });
  });

  test('falls back to user_id and tokens.account_id for the key', () => {
    /** @param {unknown} value */
    const b64 = (value) =>
      Buffer.from(JSON.stringify(value)).toString('base64url');
    const bytes = Buffer.from(
      JSON.stringify({
        tokens: {
          id_token: `${b64({})}.${b64({
            email: 'f@example.com',
            'https://api.openai.com/auth': { user_id: 'user-F' }
          })}.sig`,
          account_id: 'ws-F'
        }
      })
    );

    const identity = codexIdentityOf(bytes);

    expect(identity).toEqual({ key: 'user-F::ws-F', email: 'f@example.com' });
  });
});

describe('codex login flow', () => {
  test('reaches awaiting_user with the link and code', async () => {
    const h = codexHarness();

    const { login_id } = await startCodexToCode(h, { mode: 'add' });

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'awaiting_user',
      provider: 'codex',
      mode: 'add',
      url: DEVICE_URL,
      user_code: DEVICE_CODE,
      needs_code: false
    });
  });

  test('spawns codex login in its own process group with a temp CODEX_HOME', async () => {
    const h = codexHarness();

    await startCodexToCode(h, { mode: 'add' });

    expect(h.spawnLogin).toHaveBeenCalledWith(
      '/fake/codex',
      ['login', '--device-auth'],
      expect.objectContaining({
        shell: false,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: expect.objectContaining({
          CODEX_HOME: '/state/account-login/codex-tmp/home-1'
        })
      })
    );
    expect(h.state.pid_records.get('login-1')).toBe(4000);
  });

  test('adds a new account and reports added', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });

    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'done',
      result: {
        outcome: 'added',
        key: KEY_C,
        email: 'c@example.com',
        number: 3
      },
      url: null,
      user_code: null
    });
  });

  test('reports updated for an account the list already holds', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });

    await completeCodexLogin(h, child, authFor(KEY_B, 'b@example.com'));

    expect(h.manager.status(login_id)?.result?.outcome).toBe('updated');
  });

  test('deletes the temp CODEX_HOME and pid record after success', async () => {
    const h = codexHarness();
    const { child } = await startCodexToCode(h, { mode: 'add' });

    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));

    expect(h.state.removed_homes).toEqual([
      '/state/account-login/codex-tmp/home-1'
    ]);
    expect(h.state.homes.size).toBe(0);
    expect(h.state.pid_records.size).toBe(0);
  });

  test('imports the temp auth.json with codex-auth', async () => {
    const h = codexHarness();
    const { child } = await startCodexToCode(h, { mode: 'add' });

    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));

    expect(h.runCommand).toHaveBeenCalledWith(
      '/fake/codex-auth',
      ['import', '/state/account-login/codex-tmp/home-1/auth.json'],
      expect.anything()
    );
  });

  test('drops the codex usage cache on done', async () => {
    const h = codexHarness();
    const { child } = await startCodexToCode(h, { mode: 'add' });

    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));

    expect(h.invalidateCodex).toHaveBeenCalledOnce();
  });

  test('pins the relogin row key and rejects another identity without importing', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, {
      mode: 'relogin',
      number: 2
    });

    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'identity_mismatch',
      logged_in_email: 'c@example.com'
    });
    expect(h.runCommand).not.toHaveBeenCalled();
    expect(h.invalidateCodex).not.toHaveBeenCalled();
    expect(h.state.homes.size).toBe(0);
  });

  test('replaces the global auth.json when the relogin target is active', async () => {
    const h = codexHarness();
    const fresh = authFor(KEY_A, 'a@example.com');
    const { login_id, child } = await startCodexToCode(h, {
      mode: 'relogin',
      number: 1
    });

    await completeCodexLogin(h, child, fresh);

    expect(h.manager.status(login_id)?.state).toBe('done');
    expect(h.files.replaceActiveAuth).toHaveBeenCalledWith(fresh);
  });

  test('leaves the global auth.json alone for an inactive account', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, {
      mode: 'relogin',
      number: 2
    });

    await completeCodexLogin(h, child, authFor(KEY_B, 'b@example.com'));

    expect(h.manager.status(login_id)?.state).toBe('done');
    expect(h.files.replaceActiveAuth).not.toHaveBeenCalled();
  });

  test('keeps a fresh active login through a later switch away', async () => {
    const h = codexHarness();
    const fresh = authFor(KEY_A, 'a@example.com');
    const { child } = await startCodexToCode(h, {
      mode: 'relogin',
      number: 1
    });
    await completeCodexLogin(h, child, fresh);

    h.model.switchTo(KEY_B);

    expect(h.model.accounts.get(KEY_A)?.bytes).toEqual(fresh);
  });

  test('answers 404 account_not_found for an unknown relogin number', async () => {
    const h = codexHarness();

    const started = await h.manager.start({
      provider: 'codex',
      mode: 'relogin',
      number: 9
    });

    expect(started).toEqual({ ok: false, error: 'account_not_found' });
    expect(h.spawnLogin).not.toHaveBeenCalled();
  });

  test('fails login_failed with the last output line on a non-zero exit', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });

    child.stderr.emit(
      'data',
      '\u001b[31mError: device code login is disabled for this workspace\u001b[0m\n'
    );
    endChild(child, 1);
    await drain();

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'login_failed',
      message: 'Error: device code login is disabled for this workspace'
    });
    expect(h.state.homes.size).toBe(0);
  });

  test('fails device_auth_unavailable when no code shows in ten seconds', async () => {
    const h = codexHarness();
    const started = await h.manager.start({ provider: 'codex', mode: 'add' });
    await drain();
    const child = h.children[0];
    h.killGroup.mockImplementation(() => endChild(child, null, 'SIGTERM'));
    const login_id = started.ok ? started.login_id : '';

    await vi.advanceTimersByTimeAsync(10_000);

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'device_auth_unavailable'
    });
    expect(h.state.homes.size).toBe(0);
  });

  test('fails not_found when codex is not installed', async () => {
    const h = codexHarness({ resolveBin: () => null });

    const started = await h.manager.start({ provider: 'codex', mode: 'add' });
    await drain();

    expect(h.manager.status(started.ok ? started.login_id : '')).toMatchObject({
      state: 'failed',
      error: 'not_found'
    });
  });

  test('fails import_failed with the codex-auth summary when import refuses', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    h.runCommand.mockResolvedValueOnce(
      commandResult(
        1,
        'Import Summary: 0 imported, 1 skipped\n',
        '  skipped   auth.json: MissingEmail\n'
      )
    );

    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'import_failed',
      message: 'skipped   auth.json: MissingEmail'
    });
  });
});

describe('codex switch lock', () => {
  test('leaves the switch lock free while waiting for the user', async () => {
    const h = codexHarness();

    await startCodexToCode(h, { mode: 'add' });

    expect(isSwitchInFlight('codex')).toBe(false);
  });

  test('holds the switch lock only for the list reads, import and replacement', async () => {
    const h = codexHarness();
    const { child } = await startCodexToCode(h, {
      mode: 'relogin',
      number: 1
    });
    h.lock_seen.length = 0;

    await completeCodexLogin(h, child, authFor(KEY_A, 'a@example.com'));

    expect(h.lock_seen).toEqual([
      ['list', true],
      ['run:import', true],
      ['replace', true],
      ['list', true]
    ]);
    expect(isSwitchInFlight('codex')).toBe(false);
  });

  test('fails switch_in_flight without importing when the lock stays busy', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    acquireSwitchLock('codex');

    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));
    await vi.advanceTimersByTimeAsync(31_000);

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'switch_in_flight'
    });
    expect(h.runCommand).not.toHaveBeenCalled();
    releaseSwitchLock('codex');
  });

  test('imports once a briefly held lock frees up', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    acquireSwitchLock('codex');
    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));

    releaseSwitchLock('codex');
    await vi.advanceTimersByTimeAsync(600);

    expect(h.manager.status(login_id)?.state).toBe('done');
  });
});

describe('codex stop procedure', () => {
  test('cancels with SIGTERM to the process group and deletes the temp home', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    h.killGroup.mockImplementation(() => endChild(child, null, 'SIGTERM'));

    const cancelled = await h.manager.cancel(login_id);

    expect(cancelled).toEqual({ ok: true, state: 'cancelled', error: null });
    expect(h.killGroup.mock.calls).toEqual([[4000, 'SIGTERM']]);
    expect(h.state.homes.size).toBe(0);
    expect(h.state.pid_records.size).toBe(0);
  });

  test('expires after fifteen minutes with SIGTERM then SIGKILL', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    h.killGroup.mockImplementation((_pid, signal) => {
      if (signal === 'SIGKILL') {
        endChild(child, null, 'SIGKILL');
      }
    });

    await vi.advanceTimersByTimeAsync(15 * 60_000);
    await vi.advanceTimersByTimeAsync(5_000);

    expect(h.killGroup.mock.calls).toEqual([
      [4000, 'SIGTERM'],
      [4000, 'SIGKILL']
    ]);
    expect(h.manager.status(login_id)?.state).toBe('expired');
    expect(h.state.homes.size).toBe(0);
  });

  test('reports cleanup_incomplete when the group outlives SIGKILL', async () => {
    const h = codexHarness();
    const { login_id } = await startCodexToCode(h, { mode: 'add' });

    const pending = h.manager.cancel(login_id);
    await vi.advanceTimersByTimeAsync(6_500);
    const cancelled = await pending;

    expect(cancelled).toEqual({
      ok: true,
      state: 'failed',
      error: 'cleanup_incomplete'
    });
    expect(h.state.pid_records.has(login_id)).toBe(true);
  });

  test('ignores the child close that a stop caused', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    h.killGroup.mockImplementation(() => endChild(child, 0));

    await h.manager.cancel(login_id);
    await drain();

    expect(h.manager.status(login_id)?.state).toBe('cancelled');
    expect(h.runCommand).not.toHaveBeenCalled();
  });

  test('drops an ended session from memory after five minutes', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    h.killGroup.mockImplementation(() => endChild(child, null, 'SIGTERM'));
    await h.manager.cancel(login_id);

    await vi.advanceTimersByTimeAsync(5 * 60_000);

    expect(h.manager.status(login_id)).toBeNull();
  });
});

describe('one login per provider', () => {
  test('refuses a second start of the same provider with the running id', async () => {
    const h = codexHarness();
    const first = await h.manager.start({ provider: 'codex', mode: 'add' });

    const second = await h.manager.start({ provider: 'codex', mode: 'add' });

    expect(second).toEqual({
      ok: false,
      error: 'login_in_flight',
      login_id: first.ok ? first.login_id : ''
    });
  });

  test('refuses a concurrent start while the first still reads the list', async () => {
    const h = codexHarness();

    const [first, second] = await Promise.all([
      h.manager.start({ provider: 'codex', mode: 'relogin', number: 1 }),
      h.manager.start({ provider: 'codex', mode: 'relogin', number: 2 })
    ]);

    expect(first.ok).toBe(true);
    expect(second).toMatchObject({ ok: false, error: 'login_in_flight' });
  });

  test('accepts a new start once the previous login ended', async () => {
    const h = codexHarness();
    const { login_id, child } = await startCodexToCode(h, { mode: 'add' });
    h.killGroup.mockImplementation(() => endChild(child, null, 'SIGTERM'));
    await h.manager.cancel(login_id);

    const next = await h.manager.start({ provider: 'codex', mode: 'add' });

    expect(next.ok).toBe(true);
  });
});

describe('login logging', () => {
  test('never hands a code, link, token or output to the log', async () => {
    const h = codexHarness();
    const { child } = await startCodexToCode(h, { mode: 'add' });
    await completeCodexLogin(h, child, authFor(KEY_C, 'c@example.com'));
    const claude = claudeHarness();
    const login_id = await startClaudeToUrl(claude);
    await claude.manager.submitCode(login_id, CLAUDE_CODE);

    const logged = JSON.stringify([
      ...h.log.mock.calls,
      ...claude.log.mock.calls
    ]);

    expect(logged).not.toContain(DEVICE_CODE);
    expect(logged).not.toContain(DEVICE_URL);
    expect(logged).not.toContain('secret-token');
    expect(logged).not.toContain('Welcome to Codex');
    expect(logged).not.toContain(CLAUDE_CODE);
    expect(logged).not.toContain('claude.ai/oauth');
  });
});

/**
 * A scripted tmux: one server, windows by id, a pane screen the test sets.
 *
 * @param {{ session?: boolean }} [options]
 */
function fakeTmux(options = {}) {
  /** @type {string[][]} */
  const calls = [];
  const state = {
    session: options.session ?? false,
    /** @type {Map<string, string>} */
    windows: new Map(),
    next: 1,
    screen: '',
    dead: false,
    stubborn: false
  };
  /**
   * @param {string[]} args
   * @returns {Promise<CommandResult>}
   */
  async function runTmux(args) {
    calls.push(args);
    const command = args[0];
    if (command === 'has-session') {
      return state.session
        ? commandResult(0)
        : commandResult(1, '', "can't find session: bdui-login");
    }
    if (command === 'new-session' || command === 'new-window') {
      state.session = true;
      const id = state.next;
      state.next += 1;
      state.windows.set(`@${id}`, `%${id}`);
      return commandResult(0, `@${id} %${id}\n`);
    }
    if (command === 'list-panes') {
      return commandResult(
        0,
        [...state.windows.values()]
          .map((pane) => `${pane} ${state.dead ? 1 : 0}`)
          .join('\n')
      );
    }
    if (command === 'capture-pane') {
      return commandResult(0, state.screen);
    }
    if (command === 'kill-window') {
      if (!state.stubborn) {
        state.windows.delete(args[2]);
      }
      return commandResult(0);
    }
    if (command === 'list-windows') {
      if (state.windows.size === 0) {
        return commandResult(
          1,
          '',
          'no server running on /tmp/tmux-501/default'
        );
      }
      return commandResult(0, `${[...state.windows.keys()].join('\n')}\n`);
    }
    return commandResult(0);
  }
  return { runTmux: vi.fn(runTmux), calls, state };
}

/**
 * @param {{ session?: boolean, resolveCswap?: () => string|null }} [options]
 */
function claudeHarness(options = {}) {
  const tmux = fakeTmux({ session: options.session });
  /** @type {Array<[string, boolean]>} */
  const lock_seen = [];
  const listClaude = vi.fn(async () => {
    lock_seen.push(['list', isSwitchInFlight('claude')]);
    return {
      ok: /** @type {const} */ (true),
      accounts: [
        {
          key: 'one@example.com',
          number: 1,
          email: 'one@example.com',
          active: true
        },
        {
          key: 'two@example.com',
          number: 2,
          email: 'two@example.com',
          active: false
        }
      ],
      active_key: 'one@example.com'
    };
  });
  const invalidateClaude = vi.fn(() => {
    lock_seen.push(['invalidate', isSwitchInFlight('claude')]);
  });
  const log = vi.fn();
  const { files } = fakeFiles();
  const manager = createAccountLoginManager({
    resolveBin: (/** @type {string} */ name) => `/fake/${name}`,
    resolveCswap: options.resolveCswap || (() => '/Users/me/.local/bin/cswap'),
    spawnLogin: vi.fn(),
    runCommand: vi.fn(async () => commandResult(0)),
    runTmux: tmux.runTmux,
    killGroup: vi.fn(),
    processAlive: () => false,
    files,
    listAccounts: {
      claude: listClaude,
      codex: vi.fn(async () => ({
        ok: /** @type {const} */ (false),
        error: 'x'
      }))
    },
    invalidateUsageCache: { claude: invalidateClaude, codex: vi.fn() },
    randomId: () => 'abcdef12-3456-7890-abcd-ef1234567890',
    env: { PATH: '/usr/bin:/bin' },
    log
  });
  return { manager, tmux, listClaude, invalidateClaude, log, lock_seen };
}

/**
 * Start a Claude relogin and bring it to `awaiting_user`.
 *
 * @param {ReturnType<typeof claudeHarness>} h
 * @param {Record<string, unknown>} [input]
 * @returns {Promise<string>}
 */
async function startClaudeToUrl(h, input = { mode: 'relogin', number: 2 }) {
  const started = await h.manager.start({ provider: 'claude', ...input });
  if (!started.ok) {
    throw new Error(`start failed: ${started.error}`);
  }
  await drain();
  h.tmux.state.screen = CLAUDE_SCREEN;
  await vi.advanceTimersByTimeAsync(1_000);
  return started.login_id;
}

/**
 * Let the pane exit with `screen` as its whole scrollback, then poll once.
 *
 * @param {ReturnType<typeof claudeHarness>} h
 * @param {string} tail
 */
async function endClaudePane(h, tail) {
  h.tmux.state.screen = `${CLAUDE_SCREEN}\n${CLAUDE_CODE}\n${tail}\n\nPane is dead (status 0, Tue Nov 10 20:15:16 2026)\n`;
  h.tmux.state.dead = true;
  await vi.advanceTimersByTimeAsync(1_000);
  await drain();
}

describe('claude login window', () => {
  test('sets remain-on-exit before cswap login runs', async () => {
    const h = claudeHarness();

    await h.manager.start({ provider: 'claude', mode: 'add' });
    await drain();

    const names = h.tmux.calls.map((args) => args[0]);
    expect(names.slice(0, 5)).toEqual([
      'has-session',
      'new-session',
      'resize-window',
      'set-option',
      'respawn-pane'
    ]);
    expect(h.tmux.calls[1]).toEqual(
      expect.arrayContaining(['-d', '-s', 'bdui-login', '/bin/sleep'])
    );
    expect(h.tmux.calls[3]).toEqual([
      'set-option',
      '-w',
      '-t',
      '@1',
      'remain-on-exit',
      'on'
    ]);
  });

  test('names the window in ASCII and opens it detached in the existing session', async () => {
    const h = claudeHarness({ session: true });

    await h.manager.start({ provider: 'claude', mode: 'add' });
    await drain();

    expect(h.tmux.calls[1]).toEqual([
      'new-window',
      '-d',
      '-t',
      '=bdui-login:',
      '-n',
      'login-claude-abcdef12',
      '-P',
      '-F',
      '#{window_id} #{pane_id}',
      '/bin/sleep',
      '60'
    ]);
  });

  test('respawns the pane with the absolute cswap login command and a UTF-8 LANG', async () => {
    const h = claudeHarness();

    await h.manager.start({ provider: 'claude', mode: 'relogin', number: 2 });
    await drain();

    expect(h.tmux.calls[4]).toEqual([
      'respawn-pane',
      '-k',
      '-t',
      '%1',
      '/usr/bin/env',
      '-u',
      'CLAUDE_CONFIG_DIR',
      '-u',
      'CLAUDE_SECURESTORAGE_CONFIG_DIR',
      'LANG=en_US.UTF-8',
      'PATH=/usr/bin:/bin',
      '/Users/me/.local/bin/cswap',
      'login',
      '2',
      '--json'
    ]);
  });

  test('mirrors a server cswap profile variable instead of unsetting it', () => {
    const argv = claudeLoginArgv(
      '/bin/cswap',
      { mode: 'add', number: null },
      { CLAUDE_CONFIG_DIR: '/cfg' }
    );

    expect(argv).toEqual([
      '/usr/bin/env',
      '-u',
      'CLAUDE_SECURESTORAGE_CONFIG_DIR',
      'LANG=en_US.UTF-8',
      'CLAUDE_CONFIG_DIR=/cfg',
      '/bin/cswap',
      'login',
      '--new',
      '--json'
    ]);
  });

  test('fails not_found when cswap is not installed', async () => {
    const h = claudeHarness({ resolveCswap: () => null });

    const started = await h.manager.start({ provider: 'claude', mode: 'add' });
    await drain();

    expect(h.manager.status(started.ok ? started.login_id : '')).toMatchObject({
      state: 'failed',
      error: 'not_found'
    });
  });
});

describe('claude login URL and code', () => {
  test('reads the login URL from the joined scrollback and asks for the code', async () => {
    const h = claudeHarness();

    const login_id = await startClaudeToUrl(h);

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'awaiting_user',
      url: CLAUDE_URL,
      needs_code: true,
      user_code: null
    });
    expect(h.tmux.calls).toContainEqual([
      'capture-pane',
      '-p',
      '-J',
      '-S',
      '-',
      '-t',
      '%1'
    ]);
  });

  test('rejoins a URL a TUI hard-wrapped over several lines', () => {
    const wrapped = `Sign in:\n${CLAUDE_URL.slice(0, 90)}\n${CLAUDE_URL.slice(90, 180)}\n${CLAUDE_URL.slice(180)}\n\nPaste code here if prompted >`;

    const url = loginUrlOf(wrapped);

    expect(url).toBe(CLAUDE_URL);
  });

  test('fails login_url_missing when no URL shows in ten seconds', async () => {
    const h = claudeHarness();
    const started = await h.manager.start({ provider: 'claude', mode: 'add' });

    await vi.advanceTimersByTimeAsync(10_000);
    await drain();

    expect(h.manager.status(started.ok ? started.login_id : '')).toMatchObject({
      state: 'failed',
      error: 'login_url_missing'
    });
    expect(h.tmux.calls.map((args) => args[0])).toContain('kill-window');
  });

  test('types the code with send-keys -l and then Enter', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);

    const sent = await h.manager.submitCode(login_id, ` ${CLAUDE_CODE}\n`);

    expect(sent).toEqual({ ok: true, state: 'verifying' });
    expect(h.tmux.calls.slice(-2)).toEqual([
      ['send-keys', '-t', '%1', '-l', '--', CLAUDE_CODE],
      ['send-keys', '-t', '%1', 'Enter']
    ]);
  });

  test('accepts the code only once', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);
    await h.manager.submitCode(login_id, CLAUDE_CODE);

    const second = await h.manager.submitCode(login_id, CLAUDE_CODE);

    expect(second).toEqual({ ok: false, error: 'code_already_sent' });
  });

  test('refuses a code before the login waits for one', async () => {
    const h = claudeHarness();
    const started = await h.manager.start({ provider: 'claude', mode: 'add' });
    await drain();

    const sent = await h.manager.submitCode(
      started.ok ? started.login_id : '',
      CLAUDE_CODE
    );

    expect(sent).toEqual({ ok: false, error: 'not_awaiting_code' });
  });

  test('refuses a code holding whitespace inside it', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);

    const sent = await h.manager.submitCode(login_id, 'abc\ndef');

    expect(sent).toEqual({ ok: false, error: 'invalid_code' });
  });

  test('refuses a code for a codex login', async () => {
    const h = codexHarness();
    const { login_id } = await startCodexToCode(h, { mode: 'add' });

    const sent = await h.manager.submitCode(login_id, 'ABCD');

    expect(sent).toEqual({ ok: false, error: 'code_not_supported' });
  });
});

describe('claude login result', () => {
  test('checks pane_dead, then captures the result, then closes the window', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);
    await h.manager.submitCode(login_id, CLAUDE_CODE);
    const before = h.tmux.calls.length;

    await endClaudePane(h, CSWAP_LOGIN_UPDATED);

    const names = h.tmux.calls.slice(before).map((args) => args[0]);
    expect(names.slice(0, 3)).toEqual([
      'list-panes',
      'capture-pane',
      'kill-window'
    ]);
    expect(h.tmux.state.windows.size).toBe(0);
  });

  test('finishes done with the slot the cswap result names', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);
    await h.manager.submitCode(login_id, CLAUDE_CODE);

    await endClaudePane(h, CSWAP_LOGIN_UPDATED);

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'done',
      result: {
        outcome: 'updated',
        key: 'two@example.com',
        email: 'two@example.com',
        number: 2
      },
      url: null
    });
  });

  test('reports added for a cswap login --new that made a slot', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h, { mode: 'add' });
    await h.manager.submitCode(login_id, CLAUDE_CODE);

    await endClaudePane(h, CSWAP_LOGIN_ADDED);

    expect(h.manager.status(login_id)?.result).toEqual({
      outcome: 'added',
      key: 'new@example.com',
      email: 'new@example.com',
      number: 5
    });
  });

  test('drops the claude usage cache and re-reads the list under the switch lock', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);
    await h.manager.submitCode(login_id, CLAUDE_CODE);
    h.lock_seen.length = 0;

    await endClaudePane(h, CSWAP_LOGIN_UPDATED);

    expect(h.lock_seen).toEqual([
      ['invalidate', true],
      ['list', true]
    ]);
    expect(isSwitchInFlight('claude')).toBe(false);
  });

  test('leaves the claude switch lock free while waiting for the code', async () => {
    const h = claudeHarness();

    await startClaudeToUrl(h);

    expect(isSwitchInFlight('claude')).toBe(false);
  });

  test('fails with the cswap error code and message on identity_mismatch', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);
    await h.manager.submitCode(login_id, CLAUDE_CODE);

    await endClaudePane(h, CSWAP_LOGIN_MISMATCH);

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'identity_mismatch',
      message:
        'The login is other@example.com [personal], not Account-2 (two@example.com [personal]); nothing was saved.'
    });
    expect(h.invalidateClaude).not.toHaveBeenCalled();
  });

  test('fails login_incomplete on a cancelled cswap login', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);

    await endClaudePane(h, CSWAP_LOGIN_CANCELLED);

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'login_incomplete',
      message: 'Cancelled.'
    });
  });

  test('fails login_incomplete when the pane left no JSON line', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);

    await endClaudePane(h, 'Traceback (most recent call last):');

    expect(h.manager.status(login_id)).toMatchObject({
      state: 'failed',
      error: 'login_incomplete'
    });
  });

  test('reads the last JSON object line of a capture', () => {
    const parsed = lastJsonObjectOf(
      `{"ok": false}\n${CSWAP_LOGIN_UPDATED}\n\nPane is dead (status 0)\n`
    );

    expect(parsed).toMatchObject({ ok: true, outcome: 'updated', number: 2 });
  });
});

describe('claude stop procedure', () => {
  test('cancels by closing the window', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);

    const cancelled = await h.manager.cancel(login_id);

    expect(cancelled).toEqual({ ok: true, state: 'cancelled', error: null });
    expect(h.tmux.calls).toContainEqual(['kill-window', '-t', '@1']);
  });

  test('cancels a login that already received its code', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);
    await h.manager.submitCode(login_id, CLAUDE_CODE);

    const cancelled = await h.manager.cancel(login_id);

    expect(cancelled).toMatchObject({ ok: true, state: 'cancelled' });
  });

  test('reports cleanup_incomplete when the window outlives five seconds', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);
    h.tmux.state.stubborn = true;

    const pending = h.manager.cancel(login_id);
    await vi.advanceTimersByTimeAsync(5_500);
    const cancelled = await pending;

    expect(cancelled).toEqual({
      ok: true,
      state: 'failed',
      error: 'cleanup_incomplete'
    });
  });

  test('expires a claude login after fifteen minutes', async () => {
    const h = claudeHarness();
    const login_id = await startClaudeToUrl(h);

    await vi.advanceTimersByTimeAsync(15 * 60_000);
    await drain();

    expect(h.manager.status(login_id)?.state).toBe('expired');
    expect(h.tmux.state.windows.size).toBe(0);
  });
});

describe('startup cleanup', () => {
  test('closes the bdui-login tmux session', async () => {
    const h = claudeHarness();

    await h.manager.cleanupStale();

    expect(h.tmux.calls).toContainEqual(['kill-session', '-t', '=bdui-login']);
  });

  test('stops only recorded groups whose command line is codex login', async () => {
    const { files, state } = fakeFiles();
    state.pid_records.set('old-login', 111);
    state.pid_records.set('recycled', 222);
    const killGroup = vi.fn();
    const runCommand = vi.fn(
      async (/** @type {string} */ _bin, /** @type {string[]} */ args) =>
        commandResult(
          0,
          args[3] === '111'
            ? '/Users/me/.local/share/codex/bin/codex login --device-auth\n'
            : '/usr/bin/vim notes.txt\n'
        )
    );
    const alive = new Set([111, 222]);
    killGroup.mockImplementation((pid) => alive.delete(pid));
    const manager = createAccountLoginManager({
      files,
      runCommand,
      killGroup,
      processAlive: (pid) => alive.has(pid),
      runTmux: async () => commandResult(1, '', 'no server running')
    });

    const summary = await manager.cleanupStale();

    expect(runCommand).toHaveBeenCalledWith(
      '/bin/ps',
      ['-o', 'command=', '-p', '111'],
      expect.anything()
    );
    expect(killGroup.mock.calls).toEqual([[111, 'SIGTERM']]);
    expect(state.pid_records.size).toBe(0);
    expect(summary).toMatchObject({ stopped_groups: 1, removed_records: 2 });
  });

  test('deletes leftover temp CODEX_HOMEs', async () => {
    const { files, state } = fakeFiles();
    state.homes.add('/state/account-login/codex-tmp/home-old');
    const manager = createAccountLoginManager({
      files,
      runCommand: vi.fn(async () => commandResult(1)),
      runTmux: async () => commandResult(1)
    });

    const summary = await manager.cleanupStale();

    expect(files.removeTempHomes).toHaveBeenCalledOnce();
    expect(summary.removed_homes).toBe(1);
  });

  test('makes a start wait for the sweep', async () => {
    const h = codexHarness();
    /** @type {(value: number) => void} */
    let release = () => {};
    vi.mocked(h.files.removeTempHomes).mockImplementation(
      () =>
        new Promise((resolve) => {
          release = resolve;
        })
    );
    void h.manager.cleanupStale();

    const pending = h.manager.start({ provider: 'codex', mode: 'add' });
    await drain();
    const spawned_before = h.spawnLogin.mock.calls.length;
    release(0);
    await pending;
    await drain();

    expect(spawned_before).toBe(0);
    expect(h.spawnLogin).toHaveBeenCalledOnce();
  });
});

/**
 * @returns {any}
 */
function fakeResponse() {
  const res = {
    statusCode: 0,
    /** @type {unknown} */
    body: undefined,
    /** @type {Record<string, string>} */
    headers: {},
    /**
     * @param {string} name
     * @param {string} value
     */
    set(name, value) {
      res.headers[name] = value;
      return res;
    },
    /**
     * @param {number} code
     */
    status(code) {
      res.statusCode = code;
      return res;
    },
    /**
     * @param {unknown} payload
     */
    json(payload) {
      res.body = payload;
      return res;
    }
  };
  return res;
}

describe('login routes', () => {
  test('answers 200 with the login id on start', async () => {
    const h = codexHarness();
    const handlers = createAccountLoginHandlers(() => h.manager);
    const res = fakeResponse();

    await handlers.start(
      /** @type {any} */ ({ body: { provider: 'codex', mode: 'add' } }),
      res,
      () => {}
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, login_id: 'login-1' });
  });

  test('answers 409 login_in_flight with the running id', async () => {
    const h = codexHarness();
    const handlers = createAccountLoginHandlers(() => h.manager);
    const body = { provider: 'codex', mode: 'add' };
    await handlers.start(
      /** @type {any} */ ({ body }),
      fakeResponse(),
      () => {}
    );
    const res = fakeResponse();

    await handlers.start(/** @type {any} */ ({ body }), res, () => {});

    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual({
      ok: false,
      error: 'login_in_flight',
      login_id: 'login-1'
    });
  });

  test.each([
    [{ provider: 'gemini', mode: 'add' }, 'invalid_provider'],
    [{ provider: 'codex', mode: 'switch' }, 'invalid_mode'],
    [{ provider: 'codex', mode: 'relogin' }, 'invalid_number']
  ])('answers 400 for %o', async (body, error) => {
    const h = codexHarness();
    const handlers = createAccountLoginHandlers(() => h.manager);
    const res = fakeResponse();

    await handlers.start(/** @type {any} */ ({ body }), res, () => {});

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ ok: false, error });
  });

  test('answers the status snapshot of a running login', async () => {
    const h = codexHarness();
    const handlers = createAccountLoginHandlers(() => h.manager);
    const { login_id } = await startCodexToCode(h, { mode: 'add' });
    const res = fakeResponse();

    handlers.status(
      /** @type {any} */ ({ params: { id: login_id } }),
      res,
      () => {}
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      ok: true,
      login_id,
      provider: 'codex',
      mode: 'add',
      number: null,
      state: 'awaiting_user',
      url: DEVICE_URL,
      user_code: DEVICE_CODE,
      needs_code: false,
      result: null,
      error: null,
      message: null,
      logged_in_email: null
    });
    expect(res.headers['Cache-Control']).toBe('no-store');
  });

  test('answers 404 for an unknown login id', async () => {
    const h = codexHarness();
    const handlers = createAccountLoginHandlers(() => h.manager);
    const res = fakeResponse();

    handlers.status(
      /** @type {any} */ ({ params: { id: 'nope' } }),
      res,
      () => {}
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ ok: false, error: 'login_not_found' });
  });

  test('answers 409 code_already_sent to a second code', async () => {
    const h = claudeHarness();
    const handlers = createAccountLoginHandlers(() => h.manager);
    const login_id = await startClaudeToUrl(h);
    const request = /** @type {any} */ ({
      params: { id: login_id },
      body: { code: CLAUDE_CODE }
    });
    await handlers.code(request, fakeResponse(), () => {});
    const res = fakeResponse();

    await handlers.code(request, res, () => {});

    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual({ ok: false, error: 'code_already_sent' });
  });

  test('answers 200 with the end state on cancel', async () => {
    const h = claudeHarness();
    const handlers = createAccountLoginHandlers(() => h.manager);
    const login_id = await startClaudeToUrl(h);
    const res = fakeResponse();

    await handlers.cancel(
      /** @type {any} */ ({ params: { id: login_id }, body: {} }),
      res,
      () => {}
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, state: 'cancelled', error: null });
  });
});

describe('login files', () => {
  /** @type {string} */
  let root;

  beforeEach(() => {
    vi.useRealTimers();
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-login-files-'));
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('creates a 0700 temp home that stores the login in auth.json', async () => {
    const files = createLoginFiles({ state_dir: path.join(root, 'login') });

    const home = await files.createTempHome();

    expect(path.dirname(home)).toBe(path.join(root, 'login', 'codex-tmp'));
    expect(fs.statSync(home).mode & 0o777).toBe(0o700);
    expect(fs.readFileSync(path.join(home, 'config.toml'), 'utf8')).toBe(
      'cli_auth_credentials_store = "file"\n'
    );
  });

  test('replaces auth.json through a 0600 temp file renamed in the same folder', async () => {
    const codex_home = path.join(root, 'codex');
    fs.mkdirSync(codex_home);
    fs.writeFileSync(path.join(codex_home, 'auth.json'), 'old');
    /** @type {string[][]} */
    const steps = [];
    const spied = {
      ...fs.promises,
      /** @type {typeof fs.promises.writeFile} */
      writeFile: (file, data, options) => {
        steps.push(['write', String(file)]);
        return fs.promises.writeFile(file, data, options);
      },
      /** @type {typeof fs.promises.rename} */
      rename: (from, to) => {
        steps.push(['rename', String(from), String(to)]);
        return fs.promises.rename(from, to);
      }
    };
    const files = createLoginFiles({
      state_dir: path.join(root, 'login'),
      codex_home,
      fs: spied
    });

    await files.replaceActiveAuth(Buffer.from('fresh'));

    const temp = steps[0][1];
    expect(path.dirname(temp)).toBe(codex_home);
    expect(steps).toEqual([
      ['write', temp],
      ['rename', temp, path.join(codex_home, 'auth.json')]
    ]);
    expect(fs.readFileSync(path.join(codex_home, 'auth.json'), 'utf8')).toBe(
      'fresh'
    );
    expect(fs.statSync(path.join(codex_home, 'auth.json')).mode & 0o777).toBe(
      0o600
    );
    expect(fs.readdirSync(codex_home)).toEqual(['auth.json']);
  });

  test('empties only the temp-home folder on the startup sweep', async () => {
    const state_dir = path.join(root, 'account-login');
    const files = createLoginFiles({ state_dir });
    await files.createTempHome();
    fs.mkdirSync(path.join(root, 'codex-homes', 'real'), { recursive: true });

    const removed = await files.removeTempHomes();

    expect(removed).toBe(1);
    expect(fs.readdirSync(path.join(state_dir, 'codex-tmp'))).toEqual([]);
    expect(fs.existsSync(path.join(root, 'codex-homes', 'real'))).toBe(true);
  });

  test('refuses to remove a folder outside the temp-home folder', async () => {
    const files = createLoginFiles({ state_dir: path.join(root, 'login') });

    await expect(files.removeTempHome(root)).rejects.toThrow(
      'not a login temp home'
    );
  });

  test('round-trips pid records', async () => {
    const files = createLoginFiles({ state_dir: path.join(root, 'login') });
    await files.writePidRecord('login-a', 4321);

    const records = await files.readPidRecords();
    await files.removePidRecord('login-a');

    expect(records).toEqual([{ login_id: 'login-a', pid: 4321 }]);
    expect(await files.readPidRecords()).toEqual([]);
  });
});
