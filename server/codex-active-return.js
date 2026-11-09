/**
 * Move the global active Codex login to a window-headroom account once its
 * window reaches the global trigger (UI-tyc2 §4, UI-giog §4.4).
 *
 * The active login (`~/.codex`) is what every Codex call without its own
 * account starts on — session codex-runner legs, terminal `codex`, and Worker
 * attempts that pinned no account. A credit-holding account does not fail at
 * 100%, so nothing else moves it back; this pass does, within these limits:
 *
 * - Criterion: the runner's server-global limit policy alone (UI-giog). The
 *   scope must be `global`, the mode `switch`, and the global allow list must
 *   hold BOTH the active account and the candidate. A `repo` scope never
 *   switches the global login, whatever the repo policies say.
 * - Trigger: an active window at or above the global `preempt_pct`, else 100.
 *   The candidate is the allow list's first window-headroom account
 *   (`kind: 'preempt'`, never a credit account) whose windows are all below
 *   the trigger.
 * - Guards: a switch already holding the lock, a running Codex attempt with
 *   no account (it reads the active login's auth file), a candidate a running
 *   attempt uses (skipped), and a held account (skipped).
 * - Confirm stage: under the manual switch lock, a fresh `--api` read and a
 *   fresh read of every input — the global settings included — decide again
 *   before the shared switch runs.
 *
 * The lock, confirm, notice and single-flight flow is `createActiveReturn`,
 * shared with the Claude pass (UI-btp3 §4.2); each provider hands in only its
 * own rules (target windows, candidate choice, running attempt guard, timer
 * mode, notice text).
 *
 * Every input is injected; the server entry wires the real readers.
 *
 * @typedef {import('./routes/codex-usage.js').UsageAccount} UsageAccount
 * @typedef {import('./routes/codex-usage.js').UsageWindow} UsageWindow
 * @typedef {import('./limit-policy-settings.js').GlobalLimitPolicy} GlobalLimitPolicy
 * @typedef {{ key: string, pct: number }} ActiveWindow
 * @typedef {{ key: string, number: number, windows?: any[] }} ActiveRow
 * @typedef {{ ok: true, accounts: any[], active_key: string|null }|{ ok: false, error?: string }} AccountListRead
 * @typedef {{ key: string, name: string }} RegisteredWorkspace
 * @typedef {{ key: string, number: number }} ReturnCandidate
 * @typedef {{ kind: 'off' }
 *   | { kind: 'clear' }
 *   | { kind: 'none', reason: string }
 *   | { kind: 'switch', active: ActiveRow, exhausted: ActiveWindow[], candidate: ReturnCandidate }} Assessment
 * @typedef {{ accounts: any[], allowed: string[], current_account: string, held_accounts: Set<string>, excluded_accounts: Set<string>, max_pct: number }} CandidateInput
 * `max_pct` is the trigger: every judged candidate window must stay below it.
 * @typedef {Object} ActiveReturnRules
 * @property {'codex'|'claude'} provider - Lock key, settings key and log label.
 * @property {(window: any) => boolean} countsWindow - Whether a window can
 * mark the active account as reaching the trigger.
 * @property {(record: any, accounts: any[]) => { block: string|null, in_use: string|null }} scanRunning
 * - One `running` attempt: a reason that blocks the switch outright, and the
 * account to keep out of the candidates.
 * @property {(input: CandidateInput) => ReturnCandidate|null} pickCandidate
 * - The candidate the global allow list yields, or null.
 * @property {boolean} always_on - True: the timer runs from `start()` until
 * `stop()`; false: it runs only while the active account is at the trigger.
 * @property {(from: number, to: number, windows: string) => string} switchNotice
 * @typedef {Object} ActiveReturnDeps
 * @property {() => Promise<AccountListRead>} listAccounts - The cached list
 * the timer re-reads.
 * @property {() => Promise<AccountListRead>} listAccountsFresh - The
 * cache-bypassing read of the confirm stage.
 * @property {(provider: 'codex'|'claude') => GlobalLimitPolicy} globalPolicyOf
 * - The runner's server-global limit policy and scope, read at judgment time.
 * @property {() => RegisteredWorkspace[]} listWorkspaces - Registered
 * workspaces; `key` is the resolved path the queue store is keyed by.
 * @property {(workspace: string) => any} queueSnapshot - One workspace queue
 * (`provider_hold`, `attempts`).
 * @property {(provider: 'codex'|'claude') => boolean} acquireLock - The manual
 * switch lock; false when another switch holds it.
 * @property {(provider: 'codex'|'claude') => void} releaseLock
 * @property {(provider: 'codex'|'claude') => boolean} isLocked
 * @property {(account_number: number) => Promise<{ ok: boolean, error?: string }>} switchAccount
 * - The shared switch path (cache drop and switch listeners on success).
 * @property {(message: string) => void} notify - One `ops` notice.
 * @property {(message: string, ...args: any[]) => void} [log]
 * @property {number} [exhausted_pct] - The trigger while the global policy
 * sets no `preempt_pct`.
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

  /**
   * The global policy when it allows a global-login switch at all: scope
   * `global`, mode `switch`, a non-empty allow list (UI-giog §4.4 step 1).
   *
   * @returns {GlobalLimitPolicy|null}
   */
  function switchingPolicy() {
    const policy = deps.globalPolicyOf(provider);
    if (
      policy?.scope !== 'global' ||
      policy.mode !== 'switch' ||
      !Array.isArray(policy.accounts) ||
      policy.accounts.length === 0
    ) {
      return null;
    }
    return policy;
  }

  /**
   * The active account's windows at or above the trigger; none without
   * window info.
   *
   * @param {ActiveRow} account
   * @param {number} trigger_pct
   * @returns {ActiveWindow[]}
   */
  function triggeredWindowsOf(account, trigger_pct) {
    const windows = Array.isArray(account.windows) ? account.windows : [];
    return windows.filter(
      (window) =>
        rules.countsWindow(window) &&
        typeof window?.pct === 'number' &&
        window.pct >= trigger_pct
    );
  }

  /**
   * Snapshot every readable registered queue, in workspace key order.
   *
   * @returns {any[]}
   */
  function readQueues() {
    /** @type {{ key: string, queue: any }[]} */
    const queues = [];
    for (const workspace of deps.listWorkspaces()) {
      try {
        queues.push({
          key: workspace.key,
          queue: deps.queueSnapshot(workspace.key)
        });
      } catch {
        // An unreadable queue contributes no running or held account.
      }
    }
    queues.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
    return queues.map((entry) => entry.queue);
  }

  /**
   * Judge one account list against the global settings and fresh queue
   * snapshots, synchronously: no await may separate these reads from the
   * switch they decide.
   *
   * @param {{ ok: true, accounts: any[] }} list
   * @param {boolean} locked - The confirm stage already holds the lock.
   * @returns {Assessment}
   */
  function judge(list, locked) {
    const policy = switchingPolicy();
    if (policy === null) {
      return { kind: 'off' };
    }
    const trigger_pct = policy.preempt_pct ?? exhausted_pct;
    const active = list.accounts.find((account) => account?.active === true);
    const exhausted = active ? triggeredWindowsOf(active, trigger_pct) : [];
    if (!active || exhausted.length === 0) {
      return { kind: 'clear' };
    }
    if (!locked && deps.isLocked(provider)) {
      return { kind: 'none', reason: 'switch_in_flight' };
    }
    // An account kept active on purpose is left out of the allow list.
    if (!policy.accounts.includes(active.key)) {
      return { kind: 'none', reason: 'active_not_allowed' };
    }

    /** @type {Set<string>} */
    const in_use = new Set();
    /** @type {Set<string>} */
    const held = new Set();
    for (const queue of readQueues()) {
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

    const candidate = rules.pickCandidate({
      accounts: list.accounts,
      allowed: policy.accounts,
      current_account: active.key,
      held_accounts: held,
      excluded_accounts: in_use,
      max_pct: trigger_pct
    });
    if (candidate === null) {
      return { kind: 'none', reason: 'no_candidate' };
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

  /**
   * Read the cached list once and judge it.
   *
   * @returns {Promise<void>}
   */
  function evaluateNow() {
    return Promise.resolve()
      .then(() => deps.listAccounts())
      .then((list) => observe(list))
      .catch((err) => {
        log(`${provider} active return tick failed: %o`, err);
      });
  }

  function tick() {
    void evaluateNow();
  }

  /**
   * Apply an assessment's timer effects. True when the judgment ends here;
   * false only for a switch. A pass that cannot switch (`off`) or has no
   * trigger to watch (`clear`) leaves a trigger-only timer stopped.
   *
   * @param {Assessment} outcome
   * @returns {boolean}
   */
  function settle(outcome) {
    if (outcome.kind === 'off' || outcome.kind === 'clear') {
      if (!rules.always_on) {
        stopTimer();
      }
      return true;
    }
    if (!rules.always_on) {
      startTimer();
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
    // A failed read decides nothing and leaves the timer as it was.
    if (!isList(list)) {
      return;
    }
    if (settle(judge(list, false))) {
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
      // From here to `switchAccount` nothing awaits: the settings and queues
      // the judgment reads are the ones the switch acts on.
      const confirmed = judge(fresh, true);
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
    /**
     * Read the cached list and judge it once now — the server entry calls
     * this after a global limit-policy write finished propagating.
     */
    evaluateNow,
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
 * list; its timer runs only while the active account is at the trigger.
 *
 * @param {CodexActiveReturnDeps} deps
 */
export function createCodexActiveReturn(deps) {
  /** @type {ActiveReturnRules} */
  const rules = {
    provider: 'codex',
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
        `🔁 Codex 전역 로그인 자동 전환 — 계정 #${from} → 계정 #${to}`,
        `#${from} ${windows} · 전역 한도 대응 · 새로 시작하는 호출부터 적용`
      ].join('\n')
  };
  return createActiveReturn(
    rules,
    /** @type {ActiveReturnDeps} */ (/** @type {unknown} */ (deps))
  );
}
