/**
 * Move the global active Codex login off an account at the trigger, and back
 * to the default account once that account has reset (UI-tyc2 §4, UI-32oq
 * §4.2).
 *
 * The active login (`~/.codex`) is what every Codex call without its own
 * account starts on — session codex-runner legs, terminal `codex`, and Worker
 * attempts that pinned no account. A credit-holding account does not fail at
 * 100%, so nothing else moves it; this pass does, within these limits:
 *
 * - Criterion: the runner's server-global active-switch settings alone
 *   (UI-32oq §4.1). `auto_switch` must be on and the target list non-empty;
 *   a repo's own limit policy never moves the global login.
 * - Departure: an active window at or above `preempt_pct` (else 100) moves
 *   the login to the target list's first window-headroom account (`kind:
 *   'preempt'`, never a credit account). Only the default account or a listed
 *   account is moved; any other active account was chosen on purpose.
 * - Departure record: a successful move off the default writes `{
 *   default_account, to_account, until }` (`active-login-return-store.js`); a
 *   later automatic move from `to_account` updates `to_account` only.
 * - Return: while a record stands, the observed active is its `to_account`,
 *   `until` has passed (or is null), and the default's row is `ok` with every
 *   judged window below the trigger, the login goes back to the default —
 *   also when the active account is below the trigger. The record ends when
 *   the observed active is the default, or neither the default nor
 *   `to_account` (a person switched), or when the settings turn the switch
 *   off or change the default.
 * - Guards, for a departure and a return alike: a switch already holding the
 *   lock, a running Codex attempt with no account (it reads the active
 *   login's auth file), a target a running attempt uses (skipped), and a held
 *   account (skipped).
 * - Confirm stage: under the manual switch lock, a fresh `--api` read and a
 *   fresh read of every input — settings and record included — decide again
 *   before the shared switch runs or a record is ended on what the list says.
 *
 * The lock, confirm, record, notice and single-flight flow is
 * `createActiveReturn`, shared with the Claude pass (UI-btp3 §4.2); each
 * provider hands in only its own rules (judged windows, candidate choice,
 * running attempt guard, timer mode, notice wording).
 *
 * Every input is injected; the server entry wires the real readers.
 *
 * @typedef {import('./routes/codex-usage.js').UsageAccount} UsageAccount
 * @typedef {import('./routes/codex-usage.js').UsageWindow} UsageWindow
 * @typedef {import('./limit-policy-settings.js').ActiveSwitchSettings} ActiveSwitchSettings
 * @typedef {import('./active-login-return-store.js').DepartureRecord} DepartureRecord
 * @typedef {import('./active-login-return-store.js').DepartureStore} DepartureStore
 * @typedef {{ key: string, pct: number, resetsAt?: string }} ActiveWindow
 * @typedef {{ key: string, number: number, windows?: any[] }} ActiveRow
 * @typedef {{ ok: true, accounts: any[], active_key: string|null }|{ ok: false, error?: string }} AccountListRead
 * @typedef {{ key: string, name: string }} RegisteredWorkspace
 * @typedef {{ key: string, number: number }} ReturnCandidate
 * @typedef {{ kind: 'off' }
 *   | { kind: 'clear', forget: boolean }
 *   | { kind: 'none', reason: string, forget: boolean }
 *   | { kind: 'switch', forget: boolean, returning: boolean, active: ActiveRow, exhausted: ActiveWindow[], candidate: ReturnCandidate, settings: ActiveSwitchSettings, record: DepartureRecord|null }} Assessment
 * `forget`: the observed active ends the standing record (applied only under
 * the lock, on the fresh list). `returning`: the switch goes to the default.
 * @typedef {{ accounts: any[], allowed: string[], current_account: string, held_accounts: Set<string>, excluded_accounts: Set<string>, max_pct: number }} CandidateInput
 * `max_pct` is the trigger: every judged candidate window must stay below it.
 * @typedef {Object} ActiveReturnRules
 * @property {'codex'|'claude'} provider - Lock key, settings key and log label.
 * @property {string} label - The provider name the notices carry.
 * @property {(window: any) => boolean} countsWindow - Whether a window is
 * judged: it can put the active account at the trigger, and it decides
 * whether the default has room to return.
 * @property {(record: any, accounts: any[]) => { block: string|null, in_use: string|null }} scanRunning
 * - One `running` attempt: a reason that blocks the switch outright, and the
 * account to keep out of the targets.
 * @property {(input: CandidateInput) => ReturnCandidate|null} pickCandidate
 * - The departure target the target list yields, or null.
 * @property {boolean} always_on - True: the timer runs from `start()` until
 * `stop()`; false: it runs only while the active account is at the trigger
 * or a departure record stands.
 * @property {string} effect - The notice line on when the new login applies.
 * @typedef {Object} ActiveReturnDeps
 * @property {() => Promise<AccountListRead>} listAccounts - The cached list
 * the timer re-reads.
 * @property {() => Promise<AccountListRead>} listAccountsFresh - The
 * cache-bypassing read of the confirm stage.
 * @property {(provider: 'codex'|'claude') => ActiveSwitchSettings} settingsOf
 * - The runner's server-global active-switch settings, read at judgment time.
 * @property {DepartureStore} [departures] - The departure records; absent
 * keeps them in memory only (the server entry hands in the file-backed one).
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
 * @property {() => number} [now] - Clock for `until`.
 * @property {number} [exhausted_pct] - The trigger while the settings set no
 * `preempt_pct`.
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
import { createDepartureStore } from './active-login-return-store.js';

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
 * Local `HH:MM` of an ISO time — the return time a notice names.
 *
 * @param {string} iso
 * @returns {string}
 */
export function clockOf(iso) {
  const date = new Date(iso);
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

/**
 * The return hint a departure notice and a status line carry while a record
 * stands (UI-32oq §4.2 notices).
 *
 * @param {DepartureRecord} record
 * @returns {string}
 */
export function returnHintOf(record) {
  return record.until === null
    ? 'default 사용량 회복 확인 뒤 복귀'
    : `default 리셋 ${clockOf(record.until)} 뒤 복귀`;
}

/**
 * How a notice names one account row. Every notice of this flow goes through
 * here, so a display-name rule replaces one function.
 *
 * @param {{ number: number }} row
 * @returns {string}
 */
function accountLabel(row) {
  return `계정 #${row.number}`;
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
  const now = deps.now ?? (() => Date.now());
  const departures =
    deps.departures ?? createDepartureStore({ filePath: null });
  /** @type {any} */
  let timer = null;
  let pass_running = false;

  /**
   * The settings when they allow an automatic switch at all: `auto_switch`
   * on and a non-empty target list (UI-32oq §4.2 rule 1).
   *
   * @returns {ActiveSwitchSettings|null}
   */
  function switchingSettings() {
    const settings = deps.settingsOf(provider);
    if (
      settings?.auto_switch !== true ||
      !Array.isArray(settings.accounts) ||
      settings.accounts.length === 0
    ) {
      return null;
    }
    return settings;
  }

  /**
   * End a record the settings no longer back: the switch was turned off or
   * the default changed (§4.2 rule 5). Needs no account list, so it runs at
   * the top of every pass — including after a failed read.
   */
  function forgetUnbackedRecord() {
    const record = departures.get(provider);
    if (record === null) {
      return;
    }
    const settings = deps.settingsOf(provider);
    if (
      settings?.auto_switch === true &&
      settings.default_account === record.default_account
    ) {
      return;
    }
    departures.clear(provider);
    log(
      `${provider} active return dropped the departure record: settings changed`
    );
  }

  /**
   * The judged windows of one row that carry a usable percentage.
   *
   * @param {any} row
   * @returns {ActiveWindow[]}
   */
  function judgedWindowsOf(row) {
    return (Array.isArray(row?.windows) ? row.windows : []).filter(
      (/** @type {any} */ window) =>
        rules.countsWindow(window) &&
        typeof window?.pct === 'number' &&
        Number.isFinite(window.pct)
    );
  }

  /**
   * The active account's judged windows at or above the trigger; none
   * without window info.
   *
   * @param {ActiveRow} account
   * @param {number} trigger_pct
   * @returns {ActiveWindow[]}
   */
  function triggeredWindowsOf(account, trigger_pct) {
    return judgedWindowsOf(account).filter(
      (window) => window.pct >= trigger_pct
    );
  }

  /**
   * The latest reset among the windows a departure left at the trigger, or
   * null when one of them reports no usable reset time (§4.2 rule 3).
   *
   * @param {ActiveWindow[]} windows
   * @returns {string|null}
   */
  function untilOf(windows) {
    let latest = -Infinity;
    for (const window of windows) {
      const at =
        typeof window.resetsAt === 'string' ? Date.parse(window.resetsAt) : NaN;
      if (!Number.isFinite(at)) {
        return null;
      }
      latest = Math.max(latest, at);
    }
    return Number.isFinite(latest) ? new Date(latest).toISOString() : null;
  }

  /**
   * Whether the default account may take the login back (§4.2 rule 4): the
   * record's default is the current one, `until` is null or past, and the
   * default's row is `ok` with at least one judged window, all below the
   * trigger. The cached first stage also lets through a window whose reset
   * time already passed — a stale row for an idle account — so the confirm
   * stage reads it fresh; the confirm stage itself applies the rule as is.
   *
   * @param {DepartureRecord} record
   * @param {any[]} accounts
   * @param {ActiveSwitchSettings} settings
   * @param {number} trigger_pct
   * @param {boolean} cached - The first stage, on the cached list.
   * @returns {boolean}
   */
  function returnDue(record, accounts, settings, trigger_pct, cached) {
    if (record.default_account !== settings.default_account) {
      return false;
    }
    const at = now();
    if (record.until !== null && Date.parse(record.until) > at) {
      return false;
    }
    const row = accounts.find(
      (account) => account?.key === record.default_account
    );
    if (!row || row.status !== 'ok' || !Number.isInteger(row.number)) {
      return false;
    }
    const windows = judgedWindowsOf(row);
    return (
      windows.length > 0 &&
      windows.every(
        (window) =>
          window.pct < trigger_pct ||
          (cached &&
            typeof window.resetsAt === 'string' &&
            Date.parse(window.resetsAt) <= at)
      )
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
   * The running and held accounts every switch target must avoid, or the
   * running attempt that blocks any switch.
   *
   * @param {any[]} accounts
   * @returns {{ block: string|null, in_use: Set<string>, held: Set<string> }}
   */
  function scanQueues(accounts) {
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
        const scanned = rules.scanRunning(record, accounts);
        if (scanned.block !== null) {
          return { block: scanned.block, in_use, held };
        }
        if (scanned.in_use !== null) {
          in_use.add(scanned.in_use);
        }
      }
      collectHeldAccounts(queue, held);
    }
    return { block: null, in_use, held };
  }

  /**
   * Judge one account list against the settings, the departure record and
   * fresh queue snapshots, synchronously: no await may separate these reads
   * from the switch they decide.
   *
   * @param {{ ok: true, accounts: any[] }} list
   * @param {boolean} locked - The confirm stage already holds the lock.
   * @returns {Assessment}
   */
  function judge(list, locked) {
    const settings = switchingSettings();
    if (settings === null) {
      return { kind: 'off' };
    }
    const trigger_pct = settings.preempt_pct ?? exhausted_pct;
    const active = list.accounts.find((account) => account?.active === true);
    // A list without an active row says nothing about who switched.
    if (!active) {
      return { kind: 'clear', forget: false };
    }
    const stored = departures.get(provider);
    const backed =
      stored !== null && stored.default_account === settings.default_account
        ? stored
        : null;
    // Back on the default, or on an account the switch did not move to: the
    // departure is over either way (§4.2 rule 5).
    const forget =
      backed !== null &&
      (active.key === settings.default_account ||
        active.key !== backed.to_account);
    const record = forget ? null : backed;
    const exhausted = triggeredWindowsOf(active, trigger_pct);
    const returning =
      record !== null &&
      returnDue(record, list.accounts, settings, trigger_pct, !locked);
    if (exhausted.length === 0 && !returning) {
      return { kind: 'clear', forget };
    }
    if (!locked && deps.isLocked(provider)) {
      return { kind: 'none', reason: 'switch_in_flight', forget };
    }
    // An account kept active on purpose is neither the default nor listed.
    if (
      active.key !== settings.default_account &&
      !settings.accounts.includes(active.key)
    ) {
      return { kind: 'none', reason: 'active_not_allowed', forget };
    }
    const scan = scanQueues(list.accounts);
    if (scan.block !== null) {
      return { kind: 'none', reason: scan.block, forget };
    }
    if (returning) {
      const target = list.accounts.find(
        (account) => account?.key === settings.default_account
      );
      if (!scan.held.has(target.key) && !scan.in_use.has(target.key)) {
        return {
          kind: 'switch',
          forget,
          returning: true,
          active,
          exhausted,
          candidate: { key: target.key, number: target.number },
          settings,
          record
        };
      }
      if (exhausted.length === 0) {
        return { kind: 'none', reason: 'default_unavailable', forget };
      }
    }
    const candidate = rules.pickCandidate({
      accounts: list.accounts,
      allowed: settings.accounts,
      current_account: active.key,
      held_accounts: scan.held,
      excluded_accounts: scan.in_use,
      max_pct: trigger_pct
    });
    if (candidate === null) {
      return { kind: 'none', reason: 'no_candidate', forget };
    }
    return {
      kind: 'switch',
      forget,
      returning: candidate.key === settings.default_account,
      active,
      exhausted,
      candidate,
      settings,
      record
    };
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
   * Apply an assessment's timer effects. A trigger-only timer runs while
   * there is something to watch: an active account at the trigger (a
   * blocked or pending switch) or a standing departure record.
   *
   * @param {Assessment} outcome
   */
  function settle(outcome) {
    if (rules.always_on) {
      return;
    }
    if (
      outcome.kind === 'none' ||
      outcome.kind === 'switch' ||
      (outcome.kind === 'clear' && departures.get(provider) !== null)
    ) {
      startTimer();
      return;
    }
    stopTimer();
  }

  /**
   * Whether an assessment acts: a switch, or a record the observed active
   * ends. Both are confirmed on a fresh list under the lock first.
   *
   * @param {Assessment} outcome
   * @returns {boolean}
   */
  function acts(outcome) {
    return (
      outcome.kind === 'switch' || (outcome.kind !== 'off' && outcome.forget)
    );
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
   * The record a successful switch leaves (§4.2 rule 3): a return ends it, a
   * move off the default starts one, a move off `to_account` follows it.
   *
   * @param {Extract<Assessment, { kind: 'switch' }>} confirmed
   * @returns {DepartureRecord|null}
   */
  function recordAfterSwitch(confirmed) {
    const { settings, active, candidate, record } = confirmed;
    if (confirmed.returning) {
      departures.clear(provider);
      return null;
    }
    if (active.key === settings.default_account) {
      /** @type {DepartureRecord} */
      const created = {
        default_account: active.key,
        to_account: candidate.key,
        until: untilOf(confirmed.exhausted)
      };
      departures.set(provider, created);
      return created;
    }
    if (record !== null && active.key === record.to_account) {
      /** @type {DepartureRecord} */
      const followed = { ...record, to_account: candidate.key };
      departures.set(provider, followed);
      return followed;
    }
    return null;
  }

  /**
   * Run one confirmed switch and settle its record and notice. A failed
   * switch leaves the record as it was; the next cycle judges again.
   *
   * @param {Extract<Assessment, { kind: 'switch' }>} confirmed
   * @returns {Promise<void>}
   */
  async function runSwitch(confirmed) {
    const from = confirmed.active;
    const to = confirmed.candidate;
    const result = await deps.switchAccount(to.number);
    if (!result?.ok) {
      log(
        `${provider} active return switch #%d -> #%d failed: %s`,
        from.number,
        to.number,
        result?.error ?? 'switch_failed'
      );
      return;
    }
    const record = recordAfterSwitch(confirmed);
    if (confirmed.returning) {
      log(
        `${provider} active return went back to the default #%d -> #%d`,
        from.number,
        to.number
      );
      deps.notify(
        [
          `↩ ${rules.label} default 계정으로 복귀 — ${accountLabel(from)} → ${accountLabel(to)}`,
          rules.effect
        ].join('\n')
      );
      return;
    }
    const windows = confirmed.exhausted
      .map((window) => `${window.key} ${Math.round(window.pct)}%`)
      .join(', ');
    log(
      `${provider} active return switched #%d -> #%d (%s)`,
      from.number,
      to.number,
      windows
    );
    deps.notify(
      [
        `🔁 ${rules.label} 활성 계정 자동 전환 — ${accountLabel(from)} → ${accountLabel(to)}`,
        `#${from.number} ${windows} · ${rules.effect}`,
        ...(record === null ? [] : [returnHintOf(record)])
      ].join('\n')
    );
  }

  /**
   * @param {unknown} list
   */
  async function runPass(list) {
    forgetUnbackedRecord();
    // A failed read decides nothing and leaves the timer as it was.
    if (!isList(list)) {
      return;
    }
    const first = judge(list, false);
    settle(first);
    if (!acts(first)) {
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
      // From here to `switchAccount` nothing awaits: the settings, record and
      // queues the judgment reads are the ones the switch acts on.
      const confirmed = judge(fresh, true);
      if (confirmed.kind !== 'off' && confirmed.forget) {
        departures.clear(provider);
        log(
          `${provider} active return dropped the departure record: the active account moved`
        );
      }
      settle(confirmed);
      if (confirmed.kind !== 'switch') {
        return;
      }
      await runSwitch(confirmed);
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
     * this after a settings write.
     */
    evaluateNow,
    /**
     * Arm the timer now: an always-on pass always, a trigger-only pass when
     * a departure record survived the restart (it waits for the return).
     */
    start() {
      if (rules.always_on || departures.get(provider) !== null) {
        startTimer();
      }
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
 * list; its timer runs only while the active account is at the trigger or a
 * departure record stands.
 *
 * @param {CodexActiveReturnDeps} deps
 */
export function createCodexActiveReturn(deps) {
  /** @type {ActiveReturnRules} */
  const rules = {
    provider: 'codex',
    label: 'Codex',
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
    effect: '새로 시작하는 호출부터 적용'
  };
  return createActiveReturn(
    rules,
    /** @type {ActiveReturnDeps} */ (/** @type {unknown} */ (deps))
  );
}
