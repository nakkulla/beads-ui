/**
 * Per-attempt session log (spec §5.2, feeds the Phase 11 transcript viewer).
 *
 * The raw runner event stream (untransformed jsonl lines) lives in a
 * per-attempt file under the XDG state dir so a session's transcript survives
 * worktree churn and a beads-ui restart.
 *
 * WRITER RETIREMENT (UI-o2yt §3.2): the runner itself now writes that file
 * through an fd it inherited at spawn, so this module no longer persists
 * anything — a server-side write would only duplicate what the kernel already
 * appended. What remains is the READ side (snapshot) plus the in-process append
 * BROKER: the engine's tail reader (and, after a restart, the detached session
 * monitor) re-broadcast each parsed line here, which is what keeps the ws
 * drawer's live follow working unchanged.
 */
import { EventEmitter } from 'node:events';
import nodeFs from 'node:fs';
import zlib from 'node:zlib';
import { createTranscriptReducer } from '../../app/utils/transcript-lines.js';
import { readAttemptDelegationStreams } from './delegation-monitor.js';
import { emitQueueChanged } from './queue-events.js';
import {
  attemptRecordPath,
  beadArchivePath,
  beadSessionLogPath,
  beadsRootDir,
  sessionLogPath
} from './state-paths.js';

/**
 * What the viewer shows when the read-resolution order finds no file at all
 * (record-timeline-retention §4). Deletion is a POLICY outcome, not a fault, so
 * it gets a sentence of its own rather than the empty transcript an unreadable
 * file produces.
 */
export const EXPIRED_SESSION_LOG_NOTICE = '만료됨(180일 보존 정책)';

/**
 * Where one attempt's transcript can be read, or `expired` when none of the
 * three locations holds it.
 *
 * @typedef {{ status: 'ok', path: string, gzipped: boolean }|{ status: 'expired', path: null, gzipped: false }} SessionLogLocation
 */

/**
 * The ONE read-resolution order (record-timeline-retention §4), shared by this
 * module's readers and the ws session-log viewer so a drawer can never open a
 * different file than the one the server treats as authoritative.
 *
 * Order, first hit wins:
 *   1. the attempt record's STORED `log_path`, used verbatim — the record names
 *      its own transcript and nothing derives a path when one is stored;
 *   2. the bead-scoped default `beads/<bead>/sessions/<attempt>.jsonl`, which is
 *      where a record with no stored path lives after the §4 layout;
 *   3. the legacy flat `sessions/<attempt>.jsonl`, unmigrated history;
 *   4. the gzip archive `beads/<bead>/archive/<attempt>.jsonl.gz` (§8.2), which
 *      retention wrote WITHOUT touching `log_path` — this step is why that is
 *      safe.
 *
 * Steps 2 and 4 need the bead: an attempt id is not required to embed one
 * (`review:authority-…` does not), so without `bead_id` the ladder is the
 * stored path and the legacy flat file only.
 *
 * @param {{ workspace: string, attempt_id: string, bead_id?: string|null, log_path?: string|null, fs?: typeof import('node:fs'), pathFor?: (workspace: string, attempt_id: string) => string }} input
 * @returns {SessionLogLocation}
 */
export function resolveSessionLogRead(input) {
  const fs = input.fs || nodeFs;
  const legacyPathFor = input.pathFor || sessionLogPath;
  const bead_id =
    typeof input.bead_id === 'string' && input.bead_id.length > 0
      ? input.bead_id
      : null;
  /** @type {Array<{ path: string, gzipped: boolean }>} */
  const candidates = [];
  if (typeof input.log_path === 'string' && input.log_path.length > 0) {
    candidates.push({
      path: input.log_path,
      gzipped: input.log_path.endsWith('.gz')
    });
  }
  if (bead_id !== null) {
    candidates.push({
      path: beadSessionLogPath(input.workspace, bead_id, input.attempt_id),
      gzipped: false
    });
  }
  candidates.push({
    path: legacyPathFor(input.workspace, input.attempt_id),
    gzipped: false
  });
  if (bead_id !== null) {
    candidates.push({
      path: beadArchivePath(input.workspace, bead_id, input.attempt_id),
      gzipped: true
    });
  }
  for (const candidate of candidates) {
    try {
      if (fs.statSync(candidate.path).isFile()) {
        return {
          status: 'ok',
          path: candidate.path,
          gzipped: candidate.gzipped
        };
      }
    } catch {
      // Absent or unreadable: the next candidate answers.
    }
  }
  return { status: 'expired', path: null, gzipped: false };
}

/**
 * The bead one TRANSFERRED attempt belongs to, or null when no bead directory
 * claims it (§7).
 *
 * A consumer that holds only an attempt id — the ws viewer, whose client sends
 * exactly that — cannot ask {@link resolveSessionLogRead} for the bead-scoped
 * candidates without this. The bead is recovered from the RECORD TREE rather
 * than from the id, because the id does not carry it: `beads/<bead>/attempts/`
 * is scanned for a record, then the session/archive files, so an attempt whose
 * record was written answers on the first probe.
 *
 * Fail-quiet: an unreadable tree is "unknown bead", which degrades the ladder
 * to the legacy flat path rather than throwing on a read path.
 *
 * @param {string} workspace
 * @param {string} attempt_id
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {string|null}
 */
export function beadOfTransferredAttempt(workspace, attempt_id, options = {}) {
  const fs = options.fs || nodeFs;
  /** @type {string[]} */
  let bead_ids;
  try {
    bead_ids = fs
      .readdirSync(beadsRootDir(workspace), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return null;
  }
  for (const bead_id of bead_ids) {
    const probes = [
      attemptRecordPath(workspace, bead_id, attempt_id),
      beadSessionLogPath(workspace, bead_id, attempt_id),
      beadArchivePath(workspace, bead_id, attempt_id)
    ];
    for (const probe of probes) {
      try {
        if (fs.statSync(probe).isFile()) {
          return bead_id;
        }
      } catch {
        // Not this bead.
      }
    }
  }
  return null;
}

/**
 * What a reader may hand the resolution ladder about the attempt it is opening.
 * Both fields are optional: a caller that holds the attempt RECORD passes them
 * and skips every lookup, and one that holds only an id passes neither.
 *
 * @typedef {{ bead_id?: string|null, log_path?: string|null }} SessionLogReadOptions
 */

/**
 * Coalescing window for the `last_event_at` queue fanout (UI-53es §1). A log
 * line is not a queue transition, so it rides the same throttle shape the usage
 * ticks use: the first event in a window arms the timer and the rest of the
 * burst rides it.
 */
export const LAST_EVENT_FANOUT_MS = 3_000;

/**
 * A live-append notification, emitted for every appended raw event so the ws
 * transcript subscription (Phase 11) can push new lines to a live attempt's
 * drawer without re-reading the whole file.
 *
 * @typedef {{ workspace: string, attempt_id: string, event: unknown, launch_id?: string, offset?: number }} SessionLogAppend
 */

/**
 * The stderr sidecar of a session log: same directory, same attempt, `.stderr.log`
 * instead of `.jsonl` (UI-o2yt §3.1). Spawn/CLI faults land there instead of
 * polluting the jsonl — and instead of filling an unread pipe.
 *
 * @param {string} log_path
 * @returns {string}
 */
export function stderrPathOf(log_path) {
  return `${String(log_path).replace(/\.jsonl$/, '')}.stderr.log`;
}

/**
 * The launch a raw event belongs to when it is a Claude subagent line, else
 * null (UI-2mpn §6.3).
 *
 * A subagent has no stream of its own: its events ride the PARENT log tagged
 * with `parent_tool_use_id`. Re-publishing those lines under that id is what
 * gives a `launch_id` subscriber — the drawer opened on a subagent row — the
 * same live append feed a Codex delegation gets from its own monitor file.
 *
 * @param {unknown} event
 * @returns {string|null}
 */
export function delegatedLaunchIdOf(event) {
  if (!isObject(event)) {
    return null;
  }
  const launch_id = /** @type {any} */ (event).parent_tool_use_id;
  return typeof launch_id === 'string' && launch_id.length > 0
    ? launch_id
    : null;
}

/**
 * How much of a display line's text the activity overlay carries (UI-eey2
 * §9.3). The running card shows ONE line, so anything past this is layout the
 * client would have to throw away anyway.
 */
export const LAST_ACTIVITY_TEXT_LIMIT = 160;

/**
 * The last display line an attempt produced, projected for the wire.
 *
 * @typedef {Object} LastActivity
 * @property {number} at - Epoch ms the producing event was observed.
 * @property {'assistant'|'thinking'|'tool'|'gate'|'phase'|'result'|'error'|'blocker'} kind
 * @property {string} text
 * @property {string} [tool]
 * @property {string} [command]
 * @property {string} [path]
 * @property {string} [result]
 */

/**
 * The bd subcommands that MUTATE a bead's durable state, and therefore the
 * workflow projection the stepper reads (UI-eey2 §9.2). `show`/`list` are reads
 * and deliberately absent.
 */
const BD_WRITE_SUBCOMMANDS = new Set(['update', 'close', 'dep']);

/**
 * `bd dep` carries reads as well as writes, so it alone needs a second word:
 * `bd dep list` is a read and must not expire anything, while `bd dep add`
 * changes exactly the projection the stepper draws.
 */
const BD_DEP_WRITE_VERBS = new Set(['add', 'remove', 'rm', 'delete', 'del']);

/** A bead id token: rig prefix, a dash, then the id (phase children add `.n`). */
const BEAD_ID_RE = /^[A-Za-z][A-Za-z0-9]*-[A-Za-z0-9]+(?:\.[0-9]+)*$/;

/**
 * Bead ids a completed bd WRITE command names, or an empty array for anything
 * else. Fully fail-quiet: an unparseable command simply names nothing, since
 * the only consequence of a miss is that the 5-minute TTL catches up instead.
 *
 * Every id-shaped argument is returned rather than only the first, because
 * `bd dep add A B` changes the projection of BOTH ends and an extra cache
 * expiry costs one refill. `bd dep` READS (`list`, `tree`, …) name nothing:
 * expiring on a read would refill the cache on every dependency inspection.
 *
 * @param {unknown} command
 * @returns {string[]}
 */
export function beadWriteTargets(command) {
  if (typeof command !== 'string' || command.length === 0) {
    return [];
  }
  /** @type {string[]} */
  const ids = [];
  const seen = new Set();
  const re = /(?:^|[;&|(]|\s)bd\s+([a-z-]+)((?:\s+[^;&|]+)?)/g;
  let match;
  while ((match = re.exec(command)) !== null) {
    if (!BD_WRITE_SUBCOMMANDS.has(match[1])) {
      continue;
    }
    const words = String(match[2] || '')
      .split(/\s+/)
      .filter((word) => word.length > 0);
    if (match[1] === 'dep' && !BD_DEP_WRITE_VERBS.has(words[0])) {
      continue;
    }
    for (const token of words) {
      if (token.startsWith('-') || token.includes('=')) {
        continue;
      }
      if (BEAD_ID_RE.test(token) && !seen.has(token)) {
        seen.add(token);
        ids.push(token);
      }
    }
  }
  return ids;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObject(value) {
  return !!value && typeof value === 'object';
}

/**
 * Project one parsed display line onto the bounded activity shape.
 *
 * @param {any} line
 * @param {number} at
 * @returns {LastActivity}
 */
function activityOf(line, at) {
  const tool = typeof line.tool === 'string' ? line.tool : '';
  const command = typeof line.command === 'string' ? line.command : '';
  const file_path = typeof line.path === 'string' ? line.path : '';
  const result = typeof line.result === 'string' ? line.result : '';
  const body =
    line.kind === 'tool'
      ? command || file_path || tool
      : typeof line.text === 'string'
        ? line.text
        : '';
  return {
    at,
    kind: line.kind,
    text: String(body).slice(0, LAST_ACTIVITY_TEXT_LIMIT),
    ...(tool.length > 0 ? { tool } : {}),
    ...(command.length > 0 ? { command } : {}),
    ...(file_path.length > 0 ? { path: file_path } : {}),
    ...(result.length > 0 ? { result } : {})
  };
}

/**
 * Create a session-log reader with an in-process append pub/sub.
 *
 * One shared instance lives on the Worker runtime, so the line readers'
 * `publish` and the ws subscription's `subscribe` flow through the same broker.
 *
 * @param {{ fs?: typeof import('node:fs'), pathFor?: (workspace: string, attempt_id: string) => string, attemptLogPath?: (workspace: string, attempt_id: string) => string|null, now?: () => number, emitChanged?: (workspace: string) => void, fanoutMs?: number, onBeadWrite?: (workspace: string, bead_id: string) => void }} [options] - Broker
 * wiring, plus `attemptLogPath`: the READ-side override (UI-hk74 §7), by which
 * an attempt whose durable record names its own transcript is read from THAT
 * file. It is deliberately not consulted by `pathFor`/`stderrPathFor`, which
 * are the write-side contract the scheduler hands to a spawn.
 * @returns {{
 *   pathFor: (workspace: string, attempt_id: string) => string,
 *   stderrPathFor: (workspace: string, attempt_id: string) => string,
 *   readPathFor: (workspace: string, attempt_id: string, options?: SessionLogReadOptions) => string,
 *   resolveLog: (workspace: string, attempt_id: string, options?: SessionLogReadOptions) => SessionLogLocation,
 *   publish: (workspace: string, attempt_id: string, event: unknown, launch_id?: string, offset?: number) => void,
 *   attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void,
 *   read: (workspace: string, attempt_id: string, options?: { end_offset?: number } & SessionLogReadOptions) => unknown[],
 *   readDelegation: (workspace: string, attempt_id: string, launch_id: string, known_session?: unknown, options?: SessionLogReadOptions) => { lines: unknown[], last_event_at: number|null, offset: number },
 *   lastEventAtOf: (workspace: string, attempt_id: string, options?: SessionLogReadOptions) => number|null,
 *   lineBoundaryOf: (workspace: string, attempt_id: string, options?: SessionLogReadOptions) => number|null,
 *   lastEventAt: (workspace: string, attempt_id: string, launch_id?: string) => number|null,
 *   lastActivity: (workspace: string, attempt_id: string) => LastActivity|null,
 *   subscribe: (fn: (a: SessionLogAppend) => void, launch_id?: string) => (() => void)
 * }}
 */
export function createSessionLog(options = {}) {
  const fs = options.fs || nodeFs;
  const pathFor = options.pathFor || sessionLogPath;
  const attemptLogPath =
    typeof options.attemptLogPath === 'function'
      ? options.attemptLogPath
      : null;
  const now = options.now || Date.now;
  const emitChanged = options.emitChanged || emitQueueChanged;
  const fanout_ms =
    typeof options.fanoutMs === 'number'
      ? options.fanoutMs
      : LAST_EVENT_FANOUT_MS;
  const onBeadWrite =
    typeof options.onBeadWrite === 'function' ? options.onBeadWrite : null;
  const emitter = new EventEmitter();
  // A live attempt may have many drawer subscribers; avoid the warning.
  emitter.setMaxListeners(0);

  /**
   * Last observed session-log event time per attempt (UI-53es §1). Live-only,
   * like the usage tally: a restart loses it and the monitor row simply omits
   * the heartbeat dot until the next line arrives.
   *
   * @type {Map<string, number>}
   */
  const last_event_at = new Map();
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const fanout_timers = new Map();

  /**
   * One incremental transcript parser per STREAM — the attempt's own log and
   * each delegation launch parse independently, because the `tool_use` →
   * `tool_result` pairing is per stream and crossing them would let one
   * session's result land on another's tool line.
   *
   * @type {Map<string, { push: (event: unknown) => any[] }>}
   */
  const reducers = new Map();
  /**
   * The last non-`thinking` display line per ATTEMPT (delegations included, so
   * the running card shows what the session is doing right now rather than what
   * its orchestrator last said). Live-only, exactly like `last_event_at`.
   *
   * The stored value is the LINE OBJECT, not a snapshot of it: a claude tool
   * line learns its result summary when the later `tool_result` back-fills it in
   * place, and projecting at read time is what lets that update show.
   *
   * @type {Map<string, { at: number, line: any }>}
   */
  const last_activity = new Map();
  /**
   * Pending claude `Bash` commands by `tool_use` id, per stream. A bd write is
   * announced on the RESULT, so the command text has to survive from the
   * `tool_use` that started it (UI-eey2 §9.2).
   *
   * @type {Map<string, Map<string, string>>}
   */
  const pending_commands = new Map();

  /**
   * Announce one completed bd write, fail-quiet.
   *
   * @param {string} workspace
   * @param {unknown} command
   */
  function announceBeadWrites(workspace, command) {
    if (!onBeadWrite) {
      return;
    }
    for (const bead_id of beadWriteTargets(command)) {
      try {
        onBeadWrite(workspace, bead_id);
      } catch {
        // A broken cache hook must never break the session.
      }
    }
  }

  /**
   * Observe bd write COMPLETIONS in one raw event. Claude announces on the
   * paired `tool_result`, codex on the `command_execution` `item.completed` —
   * both are the moment the command finished, so a refill cannot read the
   * pre-write value back (UI-eey2 §9.2).
   *
   * @param {string} workspace
   * @param {string} stream_key
   * @param {unknown} event
   */
  function observeBeadWrites(workspace, stream_key, event) {
    if (!onBeadWrite || !isObject(event)) {
      return;
    }
    const raw = /** @type {any} */ (event);
    if (raw.type === 'assistant' && isObject(raw.message)) {
      const content = Array.isArray(raw.message.content)
        ? raw.message.content
        : [];
      for (const block of content) {
        if (
          isObject(block) &&
          /** @type {any} */ (block).type === 'tool_use' &&
          /** @type {any} */ (block).name === 'Bash' &&
          typeof (/** @type {any} */ (block).id) === 'string'
        ) {
          const input = /** @type {any} */ (block).input;
          const command = isObject(input) ? input.command : '';
          if (typeof command === 'string' && command.length > 0) {
            let lane = pending_commands.get(stream_key);
            if (!lane) {
              lane = new Map();
              pending_commands.set(stream_key, lane);
            }
            lane.set(String(/** @type {any} */ (block).id), command);
          }
        }
      }
      return;
    }
    if (raw.type === 'user' && isObject(raw.message)) {
      const lane = pending_commands.get(stream_key);
      if (!lane) {
        return;
      }
      const content = Array.isArray(raw.message.content)
        ? raw.message.content
        : [];
      for (const block of content) {
        if (
          isObject(block) &&
          /** @type {any} */ (block).type === 'tool_result'
        ) {
          const id = String(/** @type {any} */ (block).tool_use_id || '');
          const command = lane.get(id);
          if (command !== undefined) {
            lane.delete(id);
            announceBeadWrites(workspace, command);
          }
        }
      }
      return;
    }
    if (raw.type === 'item.completed' && isObject(raw.item)) {
      const item = /** @type {any} */ (raw.item);
      if (item.type === 'command_execution') {
        announceBeadWrites(workspace, item.command);
      }
    }
  }

  /**
   * Fold one raw event into the attempt's activity projection.
   *
   * Wholly inside an exception boundary (UI-eey2 §12): a parser fault or a
   * malformed event drops THAT event and keeps the last successful
   * `last_activity` — `publish()`'s own stamping and fanout are unaffected
   * because this is called from inside its own try.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string|undefined} launch_id
   * @param {unknown} event
   */
  function observeActivity(workspace, attempt_id, launch_id, event) {
    const stream_key = keyOf(workspace, attempt_id, launch_id);
    let reducer = reducers.get(stream_key);
    if (!reducer) {
      // `skip_delegated` keeps a subagent line out of the ATTEMPT's activity
      // overlay (UI-2mpn §6.4): the running card says what the session is
      // doing, and a child's `Read` is not the parent's work. The drawer's own
      // parse keeps those lines — it folds them under the `Agent` call instead.
      reducer = createTranscriptReducer({ skip_delegated: true });
      reducers.set(stream_key, reducer);
    }
    const produced = reducer.push(event);
    observeBeadWrites(workspace, stream_key, event);
    if (!Array.isArray(produced)) {
      return;
    }
    for (let i = produced.length - 1; i >= 0; i -= 1) {
      const line = produced[i];
      if (line && line.kind !== 'thinking') {
        last_activity.set(keyOf(workspace, attempt_id), {
          at: now(),
          line
        });
        return;
      }
    }
  }

  /**
   * Arm the coalesced queue fanout for a workspace. The value is already
   * recorded; this is only what tells the clients to come look at it.
   *
   * @param {string} workspace
   */
  function scheduleFanout(workspace) {
    if (fanout_timers.has(workspace)) {
      return;
    }
    const timer = setTimeout(() => {
      fanout_timers.delete(workspace);
      try {
        emitChanged(workspace);
      } catch {
        // A broken fanout must never break the session.
      }
    }, fanout_ms);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
    fanout_timers.set(workspace, timer);
  }

  /**
   * The `log_path` the attempt RECORD stores, or null when it stores none
   * (record-timeline-retention §4). Used verbatim — a stored path is the
   * authoritative answer and nothing derives one over it.
   *
   * A caller that already holds the record passes `options.log_path`; the
   * `attemptLogPath` hook is the lookup for one that holds only an id, and it
   * carries the containment check that keeps durable state from becoming a
   * file-read primitive (UI-hk74 §7).
   *
   * Fail-quiet: a resolver that throws or answers with anything but a non-empty
   * string names no log, and the ladder's remaining candidates answer.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {SessionLogReadOptions} options
   * @returns {string|null}
   */
  function storedLogPathOf(workspace, attempt_id, options) {
    if (typeof options.log_path === 'string' && options.log_path.length > 0) {
      return options.log_path;
    }
    if (attemptLogPath) {
      try {
        const recorded = attemptLogPath(workspace, attempt_id);
        if (typeof recorded === 'string' && recorded.length > 0) {
          return recorded;
        }
      } catch {
        // Fall through: an unreadable record names no log.
      }
    }
    return null;
  }

  /**
   * Where this attempt's transcript is, through the ONE ladder of
   * {@link resolveSessionLogRead}.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {SessionLogReadOptions} [options]
   * @returns {SessionLogLocation}
   */
  function resolveLog(workspace, attempt_id, options = {}) {
    return resolveSessionLogRead({
      fs,
      pathFor,
      workspace,
      attempt_id,
      bead_id: options.bead_id ?? null,
      log_path: storedLogPathOf(workspace, attempt_id, options)
    });
  }

  /**
   * The bytes of a located log, decompressed when it is the gzip archive
   * (§8.2). The archive is expanded HERE rather than handed to a client: a
   * reader's contract is jsonl either way, and the compression is a storage
   * detail of the retention policy.
   *
   * @param {SessionLogLocation} located
   * @returns {Buffer|null}
   */
  function logBytes(located) {
    if (located.status !== 'ok') {
      return null;
    }
    try {
      const bytes = fs.readFileSync(located.path);
      return located.gzipped ? zlib.gunzipSync(bytes) : bytes;
    } catch {
      return null;
    }
  }

  /**
   * Which file a READER should open for one attempt (UI-hk74 §7).
   *
   * Expired resolves to the default path rather than to null so every caller
   * that only wants a name keeps the string contract it always had; the
   * readers below ask {@link resolveLog} directly and can tell the two apart.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {SessionLogReadOptions} [options]
   * @returns {string}
   */
  function readPathFor(workspace, attempt_id, options = {}) {
    const located = resolveLog(workspace, attempt_id, options);
    return located.status === 'ok'
      ? located.path
      : pathFor(workspace, attempt_id);
  }

  /**
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} [launch_id]
   * @returns {string}
   */
  function keyOf(workspace, attempt_id, launch_id) {
    return `${workspace}\u0000${attempt_id}\u0000${launch_id || ''}`;
  }

  /**
   * Does this raw parent-log line close the named launch? The terminating
   * `tool_result` rides the PARENT turn (no `parent_tool_use_id`), so it is the
   * one subagent line the tag alone cannot find.
   *
   * @param {any} raw
   * @param {string} launch_id
   * @returns {boolean}
   */
  function closesLaunch(raw, launch_id) {
    if (raw.type !== 'user' || !isObject(raw.message)) {
      return false;
    }
    const content = Array.isArray(/** @type {any} */ (raw.message).content)
      ? /** @type {any} */ (raw.message).content
      : [];
    return content.some(
      (/** @type {any} */ block) =>
        isObject(block) &&
        /** @type {any} */ (block).type === 'tool_result' &&
        /** @type {any} */ (block).tool_use_id === launch_id
    );
  }

  /**
   * One subagent's transcript, filtered out of the parent's session log
   * (UI-2mpn §6.3): the lines tagged with its launch id plus the `tool_result`
   * that ends it. `offset` is the parent log's own line boundary — the
   * republished live appends carry none, so they always pass the subscriber's
   * boundary filter and nothing is dropped.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} launch_id
   * @param {SessionLogReadOptions} [options]
   * @returns {{ lines: unknown[], last_event_at: number|null, offset: number }}
   */
  function readDelegatedFromParent(
    workspace,
    attempt_id,
    launch_id,
    options = {}
  ) {
    const located = resolveLog(workspace, attempt_id, options);
    const bytes = logBytes(located);
    if (bytes === null || located.status !== 'ok') {
      return { lines: [], last_event_at: null, offset: 0 };
    }
    const file = located.path;
    /** @type {unknown[]} */
    const lines = [];
    for (const line of bytes.toString('utf8').split(/\r?\n/)) {
      const trimmed = line.trim();
      if (trimmed.length === 0) {
        continue;
      }
      /** @type {any} */
      let raw;
      try {
        raw = JSON.parse(trimmed);
      } catch {
        continue;
      }
      if (!isObject(raw)) {
        continue;
      }
      if (
        delegatedLaunchIdOf(raw) === launch_id ||
        closesLaunch(raw, launch_id)
      ) {
        lines.push(raw);
      }
    }
    /** @type {number|null} */
    let last_event_at = null;
    try {
      last_event_at = fs.statSync(file).mtimeMs;
    } catch {
      last_event_at = null;
    }
    return { lines, last_event_at, offset: bytes.lastIndexOf(0x0a) + 1 };
  }

  return {
    // The WRITE-side contract: what the scheduler hands a spawn as
    // `log_path`/`stderr_path`. Deliberately NOT attempt-aware — resolving it
    // through a record that does not exist yet at spawn time would decide where
    // a session writes from state the session itself is about to create.
    pathFor,

    /**
     * @param {string} workspace
     * @param {string} attempt_id
     */
    stderrPathFor(workspace, attempt_id) {
      return stderrPathOf(pathFor(workspace, attempt_id));
    },

    /**
     * Which file a reader opens for this attempt (UI-hk74 §7). Exposed so a
     * consumer outside this module can name the same transcript the drawer
     * shows instead of re-deriving it.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     */
    readPathFor,

    /**
     * Where this attempt's transcript is — or that it has EXPIRED (§4). The ws
     * session-log viewer reads it through this method so the drawer and the
     * readers above resolve one file by one ladder.
     */
    resolveLog,

    /**
     * Broadcast one raw event to the live subscribers. The event is ALREADY on
     * disk (the runner wrote it); this is the in-process notification only.
     *
     * Every publish — live tail AND post-restart re-attach — also stamps
     * `last_event_at` and arms the coalesced queue fanout (UI-53es §1). Without
     * the fanout the stamp would never reach a client: the queue snapshot only
     * goes out on a queue change or a usage tick, and a log line that carries no
     * usage is neither.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {unknown} event
     * @param {string} [launch_id]
     * @param {number} [offset] - Byte offset of this line in its delegation
     * stream, so a subscriber can drop what its snapshot already contained.
     */
    publish(workspace, attempt_id, event, launch_id, offset) {
      const delegation_id =
        typeof launch_id === 'string' && launch_id.length > 0
          ? launch_id
          : undefined;
      // A subagent line stamps ITS OWN launch, never the parent attempt
      // (UI-2mpn §6.4). The parent's "최근 활동" answers what the session is
      // doing, and a child's `Read` is not the parent doing anything — the same
      // separation the activity reducer makes one line below. The republish of
      // the very same event under its `launch_id` carries `delegation_id`, so
      // the subagent row still gets its own recency.
      if (delegation_id || !delegatedLaunchIdOf(event)) {
        last_event_at.set(keyOf(workspace, attempt_id, delegation_id), now());
      }
      try {
        observeActivity(workspace, attempt_id, delegation_id, event);
      } catch {
        // The activity overlay is display-only: a parse fault keeps the last
        // successful value and never interrupts the broadcast below.
      }
      scheduleFanout(workspace);
      emitter.emit('append', {
        workspace,
        attempt_id,
        event,
        ...(delegation_id ? { launch_id: delegation_id } : {}),
        ...(typeof offset === 'number' && Number.isFinite(offset)
          ? { offset }
          : {})
      });
    },

    /**
     * Re-broadcast a runner handle's raw stream to the live subscribers.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {import('node:events').EventEmitter} events
     */
    attach(workspace, attempt_id, events) {
      events.on('raw', (obj) => {
        try {
          this.publish(workspace, attempt_id, obj);
          // A subagent line belongs to two streams at once (UI-2mpn §6.3): the
          // parent transcript, which folds it under the `Agent` call, and the
          // subagent drawer, which has no file of its own to tail.
          const launch_id = delegatedLaunchIdOf(obj);
          if (launch_id) {
            this.publish(workspace, attempt_id, obj, launch_id);
          }
        } catch {
          // A broken subscriber must never crash the session.
        }
      });
    },

    /**
     * When the attempt's log file was last written, in epoch ms (UI-rkly §2).
     *
     * The raw event payloads carry no timestamp of their own, so a snapshot
     * has no other way to say how long ago the session last moved. The file's
     * mtime is that answer for everything already on disk; the live appends
     * after it are stamped client-side on receipt.
     *
     * Null when the file cannot be stat'd at all (absent yet, or unreadable) —
     * same fail-quiet contract as `read`.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {SessionLogReadOptions} [options]
     * @returns {number|null}
     */
    lastEventAtOf(workspace, attempt_id, options = {}) {
      const located = resolveLog(workspace, attempt_id, options);
      if (located.status !== 'ok') {
        return null;
      }
      try {
        return fs.statSync(located.path).mtimeMs;
      } catch {
        return null;
      }
    },

    /**
     * The byte offset just past the LAST newline in an attempt's log — the
     * line boundary a reader can hand off at (UI-o2yt §3.3).
     *
     * Startup recovery splits one log between two consumers: the usage replay
     * owns `[0, boundary)` and the reattached monitor owns `[boundary, ∞)`.
     * Deriving both from ONE observation is what makes the split exact — a
     * boundary each side computed for itself would leave the lines appended
     * in between either counted twice or, worse, by nobody.
     *
     * Null when the file cannot be read at all (absent yet, or unreadable):
     * there is no boundary to hand off, so the caller starts from zero.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {SessionLogReadOptions} [options]
     * @returns {number|null}
     */
    lineBoundaryOf(workspace, attempt_id, options = {}) {
      const raw = logBytes(resolveLog(workspace, attempt_id, options));
      return raw === null ? null : raw.lastIndexOf(0x0a) + 1;
    },

    /**
     * When this attempt last produced a session-log event, or null when none
     * has been observed in this process (UI-53es §1). The monitor row's live
     * heartbeat reads it; absence renders no dot rather than a stale one.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {number|null}
     */
    lastEventAt(workspace, attempt_id, launch_id) {
      const at = last_event_at.get(keyOf(workspace, attempt_id, launch_id));
      return typeof at === 'number' ? at : null;
    },

    /**
     * The last non-`thinking` display line this attempt produced in THIS
     * process, or null when none has been observed (UI-eey2 §9.3). Live-only
     * and fail-quiet, on the same contract as {@link lastEventAt}: a restart
     * loses it and the running card simply omits the activity row.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {LastActivity|null}
     */
    lastActivity(workspace, attempt_id) {
      const hit = last_activity.get(keyOf(workspace, attempt_id));
      if (!hit) {
        return null;
      }
      try {
        return activityOf(hit.line, hit.at);
      } catch {
        return null;
      }
    },

    /**
     * Read the persisted stream back as parsed objects (empty when absent).
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {{ end_offset?: number } & SessionLogReadOptions} [options] - Stop
     * at this byte offset (the handoff boundary above); the rest belongs to
     * another reader. `bead_id`/`log_path` steer the §4 resolution ladder.
     * @returns {unknown[]}
     */
    read(workspace, attempt_id, options = {}) {
      const bytes = logBytes(resolveLog(workspace, attempt_id, options));
      if (bytes === null) {
        return [];
      }
      const raw =
        typeof options.end_offset === 'number'
          ? bytes.subarray(0, options.end_offset).toString('utf8')
          : bytes.toString('utf8');
      /** @type {unknown[]} */
      const out = [];
      for (const line of raw.split(/\r?\n/)) {
        const t = line.trim();
        if (t.length === 0) {
          continue;
        }
        try {
          out.push(JSON.parse(t));
        } catch {
          /* skip malformed */
        }
      }
      return out;
    },

    /**
     * Read one authorized delegation stream through the validated monitor
     * reader. Callers must authorize the launch before invoking this method,
     * and pass the identity they authorized as `known_session`: the reader
     * rejects a stream whose on-disk identity disagrees with it, so a file
     * swapped under an authorized launch id returns nothing rather than
     * another session's transcript.
     *
     * `offset` is the boundary this snapshot was taken at; the caller uses it
     * to drop live appends the snapshot already contains.
     *
     * A launch with no monitor stream falls back to the PARENT log filtered by
     * `parent_tool_use_id` (UI-2mpn §6.3) — that is where a Claude subagent's
     * transcript lives, since it has no file of its own.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {string} launch_id
     * @param {unknown} [known_session]
     * @param {SessionLogReadOptions} [options]
     * @returns {{ lines: unknown[], last_event_at: number|null, offset: number }}
     */
    readDelegation(
      workspace,
      attempt_id,
      launch_id,
      known_session,
      options = {}
    ) {
      const scanned = readAttemptDelegationStreams(workspace, attempt_id, {
        known_sessions: known_session ? [known_session] : undefined
      });
      const stream = scanned.streams.find(
        (candidate) => candidate.launch_id === launch_id
      );
      const session = scanned.sessions.find(
        (candidate) => candidate.launch_id === launch_id
      );
      if (!stream || !session) {
        // A Claude subagent has no monitor file — its transcript is the subset
        // of the PARENT log tagged with this launch id (UI-2mpn §6.3). The same
        // fallback answers an unknown Codex launch with an empty snapshot,
        // because no parent line carries its id either.
        return readDelegatedFromParent(
          workspace,
          attempt_id,
          launch_id,
          options
        );
      }
      return {
        lines: stream.events.map((entry) => entry.event),
        last_event_at: session.last_event_at,
        offset: stream.offset
      };
    },

    /**
     * Subscribe to live append notifications (every attempt, every workspace —
     * callers filter by `attempt_id`). Returns an unsubscribe function.
     *
     * @param {(a: SessionLogAppend) => void} fn
     * @param {string} [launch_id]
     * @returns {() => void}
     */
    subscribe(fn, launch_id) {
      const delegation_id =
        typeof launch_id === 'string' && launch_id.length > 0
          ? launch_id
          : null;
      /** @param {SessionLogAppend} append */
      const listener = (append) => {
        const append_id = append.launch_id || null;
        if (append_id === delegation_id) {
          fn(append);
        }
      };
      emitter.on('append', listener);
      return () => emitter.off('append', listener);
    }
  };
}
