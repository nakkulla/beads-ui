/**
 * Return the global active Codex account to a window-headroom account once
 * its window is exhausted (UI-tyc2 §4).
 *
 * The active login (`~/.codex`) is what every Codex call without its own
 * account starts on — session codex-runner legs, terminal `codex`, and Worker
 * attempts that pinned no account. A credit-holding account does not fail at
 * 100%, so nothing else moves it back; this pass does, within these limits:
 *
 * - Criterion: only a `switch` repo whose Codex allow list holds BOTH the
 *   active account and the candidate allows the move. The candidate is that
 *   allow list's first window-headroom account (`kind: 'preempt'`, never a
 *   credit account); repos are read in workspace key order and the first
 *   candidate wins.
 * - Guards: a switch already holding the lock, a running Codex attempt with
 *   no account (it reads the active login's auth file), a candidate a running
 *   attempt uses (skipped), a held account (skipped), and a `wait` repo with
 *   no Codex repo default — its dispatch, follow and receipt resume all land
 *   on the active login, so moving it would switch that repo's account.
 * - Confirm stage: under the manual switch lock, a fresh `--api` read and a
 *   fresh read of every input decide again before the shared switch runs.
 *
 * The lock, confirm, notice and single-flight flow is `createActiveReturn`,
 * shared with the Claude pass (UI-btp3 §4.2); each provider hands in only its
 * own rules (target windows, candidate choice, repo default key, running
 * attempt guard, timer mode, notice text).
 *
 * Every input is injected; the server entry wires the real readers.
 *
 * @typedef {import('./routes/codex-usage.js').UsageAccount} UsageAccount
 * @typedef {import('./routes/codex-usage.js').UsageWindow} UsageWindow
 * @typedef {import('./workspace-accounts.js').WorkspaceAccountsLayer} WorkspaceAccountsLayer
 * @typedef {{ key: string, pct: number }} ActiveWindow
 * @typedef {{ key: string, number: number, windows?: any[] }} ActiveRow
 * @typedef {{ ok: true, accounts: any[], active_key: string|null }|{ ok: false, error?: string }} AccountListRead
 * @typedef {{ key: string, name: string }} RegisteredWorkspace
 * @typedef {{ key: string, number: number }} ReturnCandidate
 * @typedef {{ kind: 'clear' }
 *   | { kind: 'none', reason: string }
 *   | { kind: 'wait_blocked', active: ActiveRow, exhausted: ActiveWindow[], candidate: ReturnCandidate, wait_repo: string }
 *   | { kind: 'switch', active: ActiveRow, exhausted: ActiveWindow[], candidate: ReturnCandidate }} Assessment
 * @typedef {{ accounts: any[], allowed: string[], current_account: string, held_accounts: Set<string>, excluded_accounts: Set<string> }} CandidateInput
 * @typedef {Object} ActiveReturnRules
 * @property {'codex'|'claude'} provider - Lock key, policy key and log label.
 * @property {'codex_account'|'claude_account'} default_field - The repo
 * default key a `wait` repo needs to be safe from the switch.
 * @property {(window: any) => boolean} countsWindow - Whether a window can
 * mark the active account exhausted.
 * @property {(record: any, accounts: any[]) => { block: string|null, in_use: string|null }} scanRunning
 * - One `running` attempt: a reason that blocks the switch outright, and the
 * account to keep out of the candidates.
 * @property {(input: CandidateInput) => ReturnCandidate|null} pickCandidate
 * - The candidate one switch repo's allow list yields, or null.
 * @property {boolean} always_on - True: the timer runs from `start()` until
 * `stop()`; false: it runs only while the active account is exhausted.
 * @property {(from: number, to: number, windows: string) => string} switchNotice
 * @property {(wait_repo: string) => string} waitNotice
 * @typedef {Object} ActiveReturnDeps
 * @property {() => Promise<AccountListRead>} listAccounts - The cached list
 * the timer re-reads.
 * @property {() => Promise<AccountListRead>} listAccountsFresh - The
 * cache-bypassing read of the confirm stage.
 * @property {() => RegisteredWorkspace[]} listWorkspaces - Registered
 * workspaces; `key` is the resolved path the queue store is keyed by.
 * @property {(workspace: string) => any} queueSnapshot - One workspace queue
 * (`provider_limit_policy`, `provider_hold`, `attempts`).
 * @property {(workspace: string) => Promise<WorkspaceAccountsLayer>} readWorkspaceAccounts
 * - The repo's `bd kv` account default layer.
 * @property {(provider: 'codex'|'claude') => boolean} acquireLock - The manual
 * switch lock; false when another switch holds it.
 * @property {(provider: 'codex'|'claude') => void} releaseLock
 * @property {(provider: 'codex'|'claude') => boolean} isLocked
 * @property {(account_number: number) => Promise<{ ok: boolean, error?: string }>} switchAccount
 * - The shared switch path (cache drop and switch listeners on success).
 * @property {(message: string) => void} notify - One `ops` notice.
 * @property {(message: string, ...args: any[]) => void} [log]
 * @property {number} [exhausted_pct] - Window pct that counts as exhausted.
 * @property {number} [interval_ms] - Timer period.
 * @property {(fn: () => void, ms: number) => any} [setInterval]
 * @property {(handle: any) => void} [clearInterval]
 * @typedef {Omit<ActiveReturnDeps, 'acquireLock'|'releaseLock'|'isLocked'> & {
 *   acquireLock: (provider: 'codex') => boolean,
 *   releaseLock: (provider: 'codex') => void,
 *   isLocked: (provider: 'codex') => boolean,
 *   activeAccountOf: (attempt: any) => string|null,
 *   selectCandidate: (input: any) => { decision: 'switch', key: string, number: number|null }|{ decision: 'none', reason: string }
 * }} CodexActiveReturnDeps
 * `activeAccountOf` is the account a run record pinned, or null;
 * `selectCandidate` is `selectCodexSwitchCandidate`.
 */

/** The cached-list re-read period of an active-account return pass. */
export const ACTIVE_RETURN_INTERVAL_MS = 60_000;

const DEFAULT_EXHAUSTED_PCT = 100;

/**
 * Accounts any `provider_hold` target of this queue names.
 *
 * @param {any} queue
 * @param {Set<string>} into
 */
function collectHeldAccounts(queue, into) {
  for (const hold of Object.values(queue?.provider_hold || {})) {
    for (const target of /** @type {any} */ (hold)?.targets || []) {
      if (typeof target?.account === 'string') {
        into.add(target.account);
      }
    }
  }
}

/**
 * Whether a layer settles a repo default under `field`. An unreadable layer
 * settles nothing, so its repo counts as having none (§4.5).
 *
 * @param {WorkspaceAccountsLayer|null} layer
 * @param {'codex_account'|'claude_account'} field
 * @returns {boolean}
 */
function hasRepoDefault(layer, field) {
  const value = /** @type {any} */ (layer?.values)?.[field];
  return (
    layer?.state === 'usable' && typeof value === 'string' && value.length > 0
  );
}

/**
 * Create one provider's active-account return pass. `observe(list)` judges
 * one parsed account list.
 *
 * @param {ActiveReturnRules} rules
 * @param {ActiveReturnDeps} deps
 */
export function createActiveReturn(rules, deps) {
  const provider = rules.provider;
  const exhausted_pct = deps.exhausted_pct ?? DEFAULT_EXHAUSTED_PCT;
  const interval_ms = deps.interval_ms ?? ACTIVE_RETURN_INTERVAL_MS;
  const arm = deps.setInterval ?? ((fn, ms) => setInterval(fn, ms));
  const disarm = deps.clearInterval ?? ((handle) => clearInterval(handle));
  const log = deps.log ?? (() => {});
  /** @type {any} */
  let timer = null;
  let pass_running = false;
  // One wait-protection notice per exhaustion interval (§4.4).
  let wait_notified = false;

  /**
   * The exhausted windows of one account; none without window info.
   *
   * @param {ActiveRow} account
   * @returns {ActiveWindow[]}
   */
  function exhaustedWindowsOf(account) {
    const windows = Array.isArray(account.windows) ? account.windows : [];
    return windows.filter(
      (window) =>
        rules.countsWindow(window) &&
        typeof window?.pct === 'number' &&
        window.pct >= exhausted_pct
    );
  }

  /**
   * The active row and its exhausted windows, or null when it is not
   * exhausted (or there is no active row).
   *
   * @param {{ ok: true, accounts: any[] }} list
   * @returns {{ active: ActiveRow, exhausted: ActiveWindow[] }|null}
   */
  function exhaustedActiveOf(list) {
    const active = list.accounts.find((account) => account?.active === true);
    const exhausted = active ? exhaustedWindowsOf(active) : [];
    return active && exhausted.length > 0 ? { active, exhausted } : null;
  }

  /**
   * Snapshot every readable registered queue, in workspace key order.
   *
   * @returns {{ key: string, name: string, queue: any }[]}
   */
  function readQueues() {
    /** @type {{ key: string, name: string, queue: any }[]} */
    const queues = [];
    for (const workspace of deps.listWorkspaces()) {
      try {
        queues.push({
          key: workspace.key,
          name: workspace.name,
          queue: deps.queueSnapshot(workspace.key)
        });
      } catch {
        // An unreadable policy drops its repo from the criterion (§4.5).
      }
    }
    queues.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
    return queues;
  }

  /**
   * Read, BEFORE the judgment's own snapshots, whether each current `wait`
   * repo has a repo default. The kv reads are the only awaits of a judgment,
   * so they run first and the judgment itself stays synchronous.
   *
   * @param {{ ok: true, accounts: any[] }} list
   * @param {boolean} locked
   * @returns {Promise<Map<string, boolean>>}
   */
  async function readWaitDefaults(list, locked) {
    /** @type {Map<string, boolean>} */
    const defaults = new Map();
    if (
      exhaustedActiveOf(list) === null ||
      (!locked && deps.isLocked(provider))
    ) {
      return defaults;
    }
    for (const { key, queue } of readQueues()) {
      if (queue?.provider_limit_policy?.[provider]?.mode !== 'wait') {
        continue;
      }
      /** @type {WorkspaceAccountsLayer|null} */
      let layer = null;
      try {
        layer = await deps.readWorkspaceAccounts(key);
      } catch {
        layer = null;
      }
      defaults.set(key, hasRepoDefault(layer, rules.default_field));
    }
    return defaults;
  }

  /**
   * Judge one account list against fresh queue snapshots, synchronously: no
   * await may separate these snapshots from the switch they decide. A `wait`
   * repo the pre-read did not cover counts as having no default.
   *
   * @param {{ ok: true, accounts: any[] }} list
   * @param {Map<string, boolean>} wait_defaults - From `readWaitDefaults`.
   * @param {boolean} locked - The confirm stage already holds the lock.
   * @returns {Assessment}
   */
  function judge(list, wait_defaults, locked) {
    const exhausted_active = exhaustedActiveOf(list);
    if (exhausted_active === null) {
      return { kind: 'clear' };
    }
    const { active, exhausted } = exhausted_active;
    if (!locked && deps.isLocked(provider)) {
      return { kind: 'none', reason: 'switch_in_flight' };
    }
    const queues = readQueues();

    /** @type {Set<string>} */
    const in_use = new Set();
    /** @type {Set<string>} */
    const held = new Set();
    for (const { queue } of queues) {
      for (const attempt of Object.values(queue?.attempts || {})) {
        const record = /** @type {any} */ (attempt);
        if (record?.status !== 'running') {
          continue;
        }
        const scanned = rules.scanRunning(record, list.accounts);
        if (scanned.block !== null) {
          return { kind: 'none', reason: scanned.block };
        }
        if (scanned.in_use !== null) {
          in_use.add(scanned.in_use);
        }
      }
      collectHeldAccounts(queue, held);
    }

    /** @type {ReturnCandidate|null} */
    let candidate = null;
    for (const { queue } of queues) {
      const policy = queue?.provider_limit_policy?.[provider];
      if (policy?.mode !== 'switch') {
        continue;
      }
      const allowed = Array.isArray(policy.accounts) ? policy.accounts : [];
      if (!allowed.includes(active.key)) {
        continue;
      }
      candidate = rules.pickCandidate({
        accounts: list.accounts,
        allowed,
        current_account: active.key,
        held_accounts: held,
        excluded_accounts: in_use
      });
      if (candidate !== null) {
        break;
      }
    }
    if (candidate === null) {
      return { kind: 'none', reason: 'no_candidate' };
    }

    for (const { key, name, queue } of queues) {
      if (queue?.provider_limit_policy?.[provider]?.mode !== 'wait') {
        continue;
      }
      if (wait_defaults.get(key) !== true) {
        return {
          kind: 'wait_blocked',
          active,
          exhausted,
          candidate,
          wait_repo: name
        };
      }
    }
    return { kind: 'switch', active, exhausted, candidate };
  }

  function startTimer() {
    if (timer !== null) {
      return;
    }
    timer = arm(tick, interval_ms);
    timer?.unref?.();
  }

  function stopTimer() {
    if (timer === null) {
      return;
    }
    disarm(timer);
    timer = null;
  }

  function tick() {
    Promise.resolve()
      .then(() => deps.listAccounts())
      .then((list) => observe(list))
      .catch((err) => {
        log(`${provider} active return tick failed: %o`, err);
      });
  }

  /**
   * Apply an assessment's timer and notice effects. True when the judgment
   * ends here; false only for a switch.
   *
   * @param {Assessment} outcome
   * @returns {boolean}
   */
  function settle(outcome) {
    if (outcome.kind === 'clear') {
      if (!rules.always_on) {
        stopTimer();
      }
      wait_notified = false;
      return true;
    }
    if (!rules.always_on) {
      startTimer();
    }
    if (outcome.kind === 'wait_blocked') {
      if (!wait_notified) {
        wait_notified = true;
        log(
          `${provider} active return held by wait repo %s`,
          outcome.wait_repo
        );
        deps.notify(rules.waitNotice(outcome.wait_repo));
      }
      return true;
    }
    return outcome.kind !== 'switch';
  }

  /**
   * @param {unknown} list
   * @returns {list is { ok: true, accounts: any[] }}
   */
  function isList(list) {
    const read = /** @type {any} */ (list);
    return read?.ok === true && Array.isArray(read.accounts);
  }

  /**
   * @param {unknown} list
   */
  async function runPass(list) {
    // A failed read decides nothing and leaves the timer as it was (§4.5).
    if (!isList(list)) {
      return;
    }
    const observed_defaults = await readWaitDefaults(list, false);
    if (settle(judge(list, observed_defaults, false))) {
      return;
    }
    if (!deps.acquireLock(provider)) {
      return;
    }
    try {
      const fresh = await deps.listAccountsFresh();
      if (!isList(fresh)) {
        return;
      }
      const fresh_defaults = await readWaitDefaults(fresh, true);
      // From here to `switchAccount` nothing awaits: the queues the judgment
      // snapshots are the ones the switch acts on.
      const confirmed = judge(fresh, fresh_defaults, true);
      if (settle(confirmed) || confirmed.kind !== 'switch') {
        return;
      }
      const from = confirmed.active.number;
      const to = confirmed.candidate.number;
      const result = await deps.switchAccount(to);
      if (!result?.ok) {
        log(
          `${provider} active return switch #%d -> #%d failed: %s`,
          from,
          to,
          result?.error ?? 'switch_failed'
        );
        return;
      }
      const windows = confirmed.exhausted
        .map((window) => `${window.key} ${Math.round(window.pct)}%`)
        .join(', ');
      log(
        `${provider} active return switched #%d -> #%d (%s)`,
        from,
        to,
        windows
      );
      deps.notify(rules.switchNotice(from, to, windows));
    } finally {
      deps.releaseLock(provider);
    }
  }

  /**
   * Judge one parsed account list. An observation arriving while a pass runs
   * is skipped; the pass already decides on newer data.
   *
   * @param {unknown} list
   * @returns {Promise<void>}
   */
  function observe(list) {
    if (pass_running) {
      return Promise.resolve();
    }
    pass_running = true;
    return runPass(list)
      .catch((err) => {
        log(`${provider} active return pass failed: %o`, err);
      })
      .finally(() => {
        pass_running = false;
      });
  }

  return {
    observe,
    /** Arm the timer now; an always-on pass is armed only here. */
    start() {
      startTimer();
    },
    /** Stop the timer for good. */
    stop() {
      stopTimer();
    },
    /** @returns {boolean} */
    timerRunning() {
      return timer !== null;
    }
  };
}

/**
 * Create the Codex pass. `observe(list)` takes every parsed Codex account
 * list; its timer runs only while the active account is exhausted.
 *
 * @param {CodexActiveReturnDeps} deps
 */
export function createCodexActiveReturn(deps) {
  /** @type {ActiveReturnRules} */
  const rules = {
    provider: 'codex',
    default_field: 'codex_account',
    countsWindow: () => true,
    scanRunning(record) {
      // Only a Codex run without an account reads the active login; any
      // runner may carry a `codex_account` with its own CODEX_HOME.
      if (record.runner === 'codex' && deps.activeAccountOf(record) === null) {
        return { block: 'accountless_run', in_use: null };
      }
      return {
        block: null,
        in_use:
          typeof record.codex_account === 'string' &&
          record.codex_account.length > 0
            ? record.codex_account
            : null
      };
    },
    pickCandidate(input) {
      const decision = deps.selectCandidate({ ...input, kind: 'preempt' });
      if (decision.decision === 'switch' && Number.isInteger(decision.number)) {
        return {
          key: decision.key,
          number: /** @type {number} */ (decision.number)
        };
      }
      return null;
    },
    always_on: false,
    switchNotice: (from, to, windows) =>
      [
        `🔁 Codex 활성 계정 자동 전환 — 계정 #${from} → 계정 #${to}`,
        `#${from} ${windows} · 새로 시작하는 호출부터 적용`
      ].join('\n'),
    waitNotice: (wait_repo) =>
      [
        `⏸ Codex 활성 계정 자동 전환 보류 — 기다림 저장소 ${wait_repo}이 활성 로그인을 씀`,
        '그 저장소에 Codex 기본 계정을 정하면 다음 판정부터 전환합니다'
      ].join('\n')
  };
  return createActiveReturn(
    rules,
    /** @type {ActiveReturnDeps} */ (/** @type {unknown} */ (deps))
  );
}
