/**
 * Record retention and the one-time record migration
 * (record-timeline-retention §8).
 *
 * Two jobs live here because they answer the same question — "where does a
 * bead's Worker evidence live, and for how long":
 *
 *   - {@link createRecordRetention}`.sweep()` runs at server start and once a
 *     day. For a bead bd reports `closed` whose LAST timeline event is older
 *     than `archive_days`, it gzips the session originals into the bead's
 *     `archive/`; past `delete_days` it drops that retired content entirely.
 *     `events.jsonl` and `attempts/*.json` are NEVER touched — the timeline is
 *     the permanent SoT (§5), so retention may only ever remove the bulky
 *     machine transcript the timeline points AT.
 *   - {@link createRecordRetention}`.migrate()` runs once per workspace, before
 *     anything reads `queue.json`, and converts the pre-split layout into the
 *     bead-scoped one.
 *
 * Nothing here updates a stored `log_path`. §4 fixes ONE read-resolution
 * ladder — stored `log_path` → bead `sessions/` → legacy flat `sessions/` →
 * bead `archive/*.gz` → `expired` — and every move this module makes goes
 * FORWARD along that ladder. A reader whose first candidate vanished finds the
 * file at the next one, which is why archiving does not have to rewrite records
 * it would otherwise have to keep in sync.
 *
 * Every filesystem step is idempotent by an existence check rather than by a
 * journal: an interrupted pass is re-run from the top and each step recognizes
 * its own finished work. That is what makes the fixed migration order (§8.3)
 * safe to interrupt at any point.
 */
import node_fs from 'node:fs';
import path from 'node:path';
import node_zlib from 'node:zlib';
import { debug } from '../logging.js';
import { errorDetail } from './error-detail.js';
import { transferableAttempts } from './queue-store.js';
import {
  attemptRecordPath,
  beadArchivePath,
  beadSessionLogPath,
  beadsRootDir,
  queueFilePath,
  recordMigrationMarkerPath,
  retentionPolicyPath,
  sessionLogPath
} from './state-paths.js';

const log = debug('worker:record-retention');

/** @type {number} */
const DAY_MS = 86_400_000;

/**
 * Schema version of the one-time record migration. It is the marker's suffix
 * (`beads/.migrated-v1`), so a future v2 gets a marker of its own rather than
 * inheriting this one's completion.
 *
 * @type {number}
 */
export const RECORD_MIGRATION_VERSION = 1;

/**
 * The retention horizons a workspace gets when it declares none (§8.1).
 *
 * @type {Readonly<{ archive_days: number, delete_days: number }>}
 */
export const DEFAULT_RETENTION_POLICY = Object.freeze({
  archive_days: 30,
  delete_days: 180
});

/**
 * Workspaces whose record migration has been constructed but has not finished
 * yet. `/healthz` reads this through {@link recordMigrationPending}: §8.3
 * requires the server NOT to report ready while the record layout is still
 * being converted, because everything a client would read in that window — the
 * queue, the attempt records, the session logs — is mid-move.
 *
 * Process-global rather than per-attachment: health is asked about the server,
 * and one unconverted workspace is enough to make the answer no.
 *
 * @type {Set<string>}
 */
const MIGRATION_PENDING = new Set();

/**
 * @param {string} workspace_root
 * @returns {string}
 */
function keyFor(workspace_root) {
  return path.resolve(String(workspace_root || ''));
}

/**
 * Is a record migration still outstanding?
 *
 * @param {string} [workspace_root] - One workspace, or every attached workspace
 * when omitted.
 * @returns {boolean}
 */
export function recordMigrationPending(workspace_root) {
  if (typeof workspace_root !== 'string' || workspace_root.length === 0) {
    return MIGRATION_PENDING.size > 0;
  }
  return MIGRATION_PENDING.has(keyFor(workspace_root));
}

/**
 * Drop every pending mark. Test-only hook — production clears one workspace at
 * a time, from the migration that owns it.
 */
export function __resetRecordMigrationPendingForTest() {
  MIGRATION_PENDING.clear();
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * One retention horizon, or the default when the stored value cannot be one.
 *
 * Fail-quiet PER VALUE (§8.1): a file that names a usable `archive_days` and a
 * broken `delete_days` keeps the good half. Collapsing the whole file to
 * defaults would silently discard a horizon an operator did set.
 *
 * @param {unknown} value
 * @param {number} fallback
 * @returns {number}
 */
function daysOr(value, fallback) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }
  const days = Math.floor(value);
  return days > 0 ? days : fallback;
}

/**
 * The workspace's retention horizons (§8.1).
 *
 * A file of its own rather than a `display-policy.json` field: that store drops
 * unknown fields when it normalizes, so a horizon stored there would disappear
 * the first time any display policy was written.
 *
 * @param {string} workspace_root
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {{ archive_days: number, delete_days: number }}
 */
export function readRetentionPolicy(workspace_root, options = {}) {
  const fs = options.fs || node_fs;
  const file = retentionPolicyPath(workspace_root);
  /** @type {unknown} */
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err)?.code !== 'ENOENT') {
      log('retention policy unreadable at %s: %s', file, errorDetail(err));
    }
    return { ...DEFAULT_RETENTION_POLICY };
  }
  if (!isRecord(parsed)) {
    log('retention policy at %s is not an object', file);
    return { ...DEFAULT_RETENTION_POLICY };
  }
  return {
    archive_days: daysOr(
      parsed.archive_days,
      DEFAULT_RETENTION_POLICY.archive_days
    ),
    delete_days: daysOr(
      parsed.delete_days,
      DEFAULT_RETENTION_POLICY.delete_days
    )
  };
}

/**
 * @param {unknown} value
 * @returns {any[]}
 */
function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function recordOf(value) {
  return isRecord(value) ? value : {};
}

/**
 * The `.jsonl`/`.stderr.log` suffixes a bead's `sessions/` directory holds, and
 * the archive suffix each becomes. Ordered longest-first so `.stderr.log` is
 * recognized before a shorter suffix could claim part of it.
 *
 * @type {ReadonlyArray<{ source: string, archive: string }>}
 */
const SESSION_SUFFIXES = Object.freeze([
  { source: '.stderr.log', archive: '.stderr.log.gz' },
  { source: '.jsonl', archive: '.jsonl.gz' }
]);

/**
 * Suffix used while an original is being retired. The rename happens FIRST so
 * the file leaves the read ladder in one atomic step; the unlink that follows
 * only reclaims space, and a crash between the two leaves residue this module
 * sweeps on its next pass rather than a half-readable transcript.
 *
 * @type {string}
 */
const RETIRED_SUFFIX = '.retired';

/**
 * Split one session filename into its attempt id and archive suffix.
 *
 * @param {string} name
 * @returns {{ attempt_id: string, archive_suffix: string }|null}
 */
function sessionFileParts(name) {
  for (const suffix of SESSION_SUFFIXES) {
    if (name.length > suffix.source.length && name.endsWith(suffix.source)) {
      return {
        attempt_id: name.slice(0, -suffix.source.length),
        archive_suffix: suffix.archive
      };
    }
  }
  return null;
}

/**
 * Swap the `.jsonl` tail of a session path for another session suffix.
 *
 * @param {string} jsonl_path
 * @param {string} suffix
 * @returns {string}
 */
function replaceJsonlSuffix(jsonl_path, suffix) {
  return `${jsonl_path.slice(0, -'.jsonl'.length)}${suffix}`;
}

/**
 * Build the workspace's retention/migration runner.
 *
 * Constructing one MARKS the workspace's migration pending: the window §8.3
 * gates health on opens the moment the attachment exists, not when its startup
 * sequence happens to reach {@link RecordRetention.migrate}. A SUCCESSFUL
 * {@link RecordRetention.migrate} — a converted pass, or one that found the
 * completion marker already there — is what closes it. A failed pass leaves it
 * open on purpose: the workspace is still in the pre-migration layout, the
 * startup sequence stops before the readers that gate exists to hold back, and
 * a server that answered ready there would be answering for records it never
 * converted.
 *
 * @param {{
 *   workspace_root: string,
 *   timeline: ReturnType<typeof import('./bead-timeline.js').createBeadTimeline>,
 *   readStatus: (bead_id: string) => Promise<string|null>,
 *   fs?: typeof import('node:fs'),
 *   gzip?: (input: Buffer) => Buffer,
 *   now?: () => number
 * }} deps
 */
export function createRecordRetention(deps) {
  const workspace_root = String(deps.workspace_root ?? '');
  const fs = deps.fs || node_fs;
  const gzip =
    deps.gzip || ((/** @type {Buffer} */ input) => node_zlib.gzipSync(input));
  const now = deps.now || (() => Date.now());
  const timeline = deps.timeline;
  const readStatus = deps.readStatus;

  MIGRATION_PENDING.add(keyFor(workspace_root));

  /**
   * @param {string} file
   * @returns {boolean}
   */
  function exists(file) {
    try {
      fs.statSync(file);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * The raw persisted queue, read straight off disk rather than through the
   * store. The migration must run BEFORE the first `queue.json` load (§8.3), so
   * asking the store for a snapshot here would perform exactly the load it is
   * supposed to precede — and would then cache a pre-migration queue for the
   * rest of the process.
   *
   * An ABSENT queue and an unreadable one are different answers (§8.3): a
   * workspace that has never run has nothing to convert, while a queue this
   * process cannot read or parse is a FAULT, and converting "nothing" on top of
   * it would stamp the marker over records still sitting in that file.
   *
   * @returns {{ status: 'ok', queue: Record<string, any> }|{ status: 'absent' }|{ status: 'unreadable', detail: string }}
   */
  function readQueueFile() {
    const file = queueFilePath(workspace_root);
    /** @type {string} */
    let text;
    try {
      text = fs.readFileSync(file, 'utf8');
    } catch (err) {
      if (/** @type {NodeJS.ErrnoException} */ (err)?.code === 'ENOENT') {
        return { status: 'absent' };
      }
      const detail = errorDetail(err);
      log('queue read failed for %s: %s', file, detail);
      return { status: 'unreadable', detail };
    }
    try {
      const parsed = JSON.parse(text);
      if (!isRecord(parsed)) {
        throw new Error('queue file is not an object');
      }
      return { status: 'ok', queue: parsed };
    } catch (err) {
      const detail = errorDetail(err);
      log('queue parse failed for %s: %s', file, detail);
      return { status: 'unreadable', detail };
    }
  }

  /**
   * The queue as the RETENTION pass wants it: a file it cannot read answers the
   * same way an absent one does, because the pass reads it only to learn which
   * attempts are running, and it already skips a bead it cannot judge.
   *
   * @returns {Record<string, any>|null}
   */
  function queueForSweep() {
    const read = readQueueFile();
    return read.status === 'ok' ? read.queue : null;
  }

  /**
   * Every attempt row of a raw queue that names both a bead and an attempt.
   *
   * @param {Record<string, any>|null} queue
   * @returns {any[]}
   */
  function attemptsOf(queue) {
    return Object.values(recordOf(queue?.attempts)).filter(
      (attempt) =>
        isRecord(attempt) &&
        typeof attempt.attempt_id === 'string' &&
        attempt.attempt_id.length > 0 &&
        typeof attempt.bead_id === 'string' &&
        attempt.bead_id.length > 0
    );
  }

  /**
   * Attempt ids that are RUNNING right now. Their transcript is an open file a
   * live child is still appending to, so no pass — migration or retention —
   * may move, compress, or remove it.
   *
   * @param {Record<string, any>|null} queue
   * @returns {Set<string>}
   */
  function runningAttemptIds(queue) {
    return new Set(
      attemptsOf(queue)
        .filter((attempt) => attempt.status === 'running')
        .map((attempt) => String(attempt.attempt_id))
    );
  }

  /**
   * Which bead each live attempt belongs to, inverted.
   *
   * @param {Record<string, any>|null} queue
   * @returns {Map<string, Set<string>>}
   */
  function attemptIdsByBead(queue) {
    /** @type {Map<string, Set<string>>} */
    const by_bead = new Map();
    for (const attempt of attemptsOf(queue)) {
      const bead_id = String(attempt.bead_id);
      let ids = by_bead.get(bead_id);
      if (!ids) {
        ids = new Set();
        by_bead.set(bead_id, ids);
      }
      ids.add(String(attempt.attempt_id));
    }
    return by_bead;
  }

  /**
   * The attempts §7 says may leave `queue.json`, decided by the store's OWN
   * predicate. The raw file is shaped defensively first: an older queue may
   * simply lack a collection the predicate reads, and a migration that threw on
   * that would leave the workspace unconverted forever.
   *
   * @param {Record<string, any>} queue
   * @returns {any[]}
   */
  function transferCandidates(queue) {
    /** @type {any} */
    const shaped = {
      attempts: Object.fromEntries(
        attemptsOf(queue).map((attempt) => [attempt.attempt_id, attempt])
      ),
      queue: arrayOf(queue.queue),
      serial_lanes: arrayOf(queue.serial_lanes).map((lane) => ({
        entries: arrayOf(lane?.entries)
      })),
      pr_wait: arrayOf(queue.pr_wait),
      merge_queue: arrayOf(queue.merge_queue),
      completion_intents: recordOf(queue.completion_intents),
      discard_operations: recordOf(queue.discard_operations)
    };
    return transferableAttempts(shaped);
  }

  /**
   * Publish one file atomically: temp beside the destination, then rename.
   *
   * @param {string} file
   * @param {string|Buffer} contents
   */
  function writeAtomic(file, contents) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, contents);
    fs.renameSync(tmp, file);
  }

  /**
   * Retire an original: rename out of the read ladder, then unlink.
   *
   * @param {string} file
   */
  function retireFile(file) {
    const retired = `${file}${RETIRED_SUFFIX}`;
    try {
      fs.renameSync(file, retired);
    } catch (err) {
      log('retire rename failed for %s: %s', file, errorDetail(err));
      return;
    }
    try {
      fs.unlinkSync(retired);
    } catch (err) {
      // Residue only: the file is already out of every read path, and the next
      // pass sweeps it.
      log('retire unlink failed for %s: %s', retired, errorDetail(err));
    }
  }

  /**
   * @param {string} file
   */
  function removeFile(file) {
    try {
      fs.unlinkSync(file);
    } catch (err) {
      if (/** @type {NodeJS.ErrnoException} */ (err)?.code !== 'ENOENT') {
        log('unlink failed for %s: %s', file, errorDetail(err));
      }
    }
  }

  /**
   * @param {string} dir
   * @returns {string[]}
   */
  function listDir(dir) {
    try {
      return fs.readdirSync(dir);
    } catch (err) {
      if (/** @type {NodeJS.ErrnoException} */ (err)?.code !== 'ENOENT') {
        log('directory read failed for %s: %s', dir, errorDetail(err));
      }
      return [];
    }
  }

  /**
   * The two bead-scoped directories retention operates on, derived from the
   * path helpers so the layout stays stated once, in `state-paths.js`.
   *
   * @param {string} bead_id
   */
  function beadDirs(bead_id) {
    return {
      sessions: path.dirname(beadSessionLogPath(workspace_root, bead_id, 'x')),
      archive: path.dirname(beadArchivePath(workspace_root, bead_id, 'x'))
    };
  }

  /**
   * Every bead with a record directory.
   *
   * @returns {string[]}
   */
  function beadIds() {
    const root = beadsRootDir(workspace_root);
    /** @type {import('node:fs').Dirent[]} */
    let entries;
    try {
      entries = /** @type {any} */ (
        fs.readdirSync(root, { withFileTypes: true })
      );
    } catch (err) {
      if (/** @type {NodeJS.ErrnoException} */ (err)?.code !== 'ENOENT') {
        log('bead root read failed for %s: %s', root, errorDetail(err));
      }
      return [];
    }
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  }

  /**
   * When this bead was last heard from. The TIMELINE is the clock, not the
   * files: it is the permanent record (§5), so it still answers for a bead
   * whose transcripts were archived on an earlier pass — which is exactly the
   * bead the delete horizon has to judge.
   *
   * @param {string} bead_id
   * @returns {number|null} Epoch ms, or null when the bead has no event.
   */
  function lastEventAt(bead_id) {
    let latest = null;
    for (const event of timeline.readTimeline(bead_id)) {
      if (typeof event.at === 'number' && Number.isFinite(event.at)) {
        latest = latest === null ? event.at : Math.max(latest, event.at);
      }
    }
    return latest;
  }

  /**
   * Compress one session original into the bead's archive, then retire it.
   *
   * The archive is written temp→rename BEFORE the original is retired, so the
   * two never overlap in a way that loses the transcript: either the original
   * is still there, or the archive is complete. A destination that already
   * exists is an earlier pass that got as far as publishing — the compression
   * is skipped and only the retirement is repeated.
   *
   * @param {string} source
   * @param {string} destination
   * @returns {boolean} Whether the transcript is now in the archive.
   */
  function archiveOne(source, destination) {
    try {
      if (!exists(destination)) {
        writeAtomic(destination, gzip(fs.readFileSync(source)));
      }
    } catch (err) {
      log('archive write failed for %s: %s', source, errorDetail(err));
      return false;
    }
    retireFile(source);
    return true;
  }

  /**
   * Where one attempt's archive of a given suffix goes.
   *
   * `state-paths.js` names the transcript archive; the stderr sidecar's name is
   * derived from it here for the same reason `session-log.js` derives the
   * sidecar of a log path — one suffix rule, applied at both ends.
   *
   * @param {string} bead_id
   * @param {string} attempt_id
   * @param {string} archive_suffix
   * @returns {string}
   */
  function archivePathFor(bead_id, attempt_id, archive_suffix) {
    const base = beadArchivePath(workspace_root, bead_id, attempt_id);
    return `${base.slice(0, -'.jsonl.gz'.length)}${archive_suffix}`;
  }

  /**
   * The attempts a bead owns whose transcript may still sit at the LEGACY flat
   * `sessions/<attempt_id>` path.
   *
   * That path is not history: it is still the write-side default for every new
   * spawn (`session-log.js` `pathFor`), so a bead's newest transcripts are
   * there while its migrated ones are under `beads/<bead>/sessions/`. Retention
   * has to sweep both or the 30/180-day policy would silently apply to old
   * records only.
   *
   * Ids come from the two places that name a bead's attempts without opening
   * the flat directory (whose filenames do not carry a bead): the transferred
   * records, and the live queue.
   *
   * @param {string} bead_id
   * @param {Map<string, Set<string>>} queue_by_bead
   * @returns {Set<string>}
   */
  function legacyAttemptIds(bead_id, queue_by_bead) {
    const ids = new Set(queue_by_bead.get(bead_id) || []);
    const dir = path.dirname(attemptRecordPath(workspace_root, bead_id, 'x'));
    for (const name of listDir(dir)) {
      if (name.endsWith('.json')) {
        ids.add(name.slice(0, -'.json'.length));
      }
    }
    return ids;
  }

  /**
   * Compress one bead's session originals (§8.2), in both locations the §4 read
   * ladder resolves: the bead's own `sessions/` and the legacy flat path.
   *
   * @param {string} bead_id
   * @param {Set<string>} running
   * @param {Set<string>} legacy_ids
   * @returns {number} Files archived.
   */
  function archiveBead(bead_id, running, legacy_ids) {
    const dirs = beadDirs(bead_id);
    let archived = 0;
    for (const name of listDir(dirs.sessions)) {
      if (name.endsWith(RETIRED_SUFFIX)) {
        removeFile(path.join(dirs.sessions, name));
        continue;
      }
      const parts = sessionFileParts(name);
      if (parts === null || running.has(parts.attempt_id)) {
        continue;
      }
      const destination = archivePathFor(
        bead_id,
        parts.attempt_id,
        parts.archive_suffix
      );
      if (archiveOne(path.join(dirs.sessions, name), destination)) {
        archived += 1;
      }
    }
    for (const attempt_id of legacy_ids) {
      if (running.has(attempt_id)) {
        continue;
      }
      const flat = sessionLogPath(workspace_root, attempt_id);
      for (const suffix of SESSION_SUFFIXES) {
        const source = replaceJsonlSuffix(flat, suffix.source);
        if (!exists(source)) {
          continue;
        }
        const destination = archivePathFor(bead_id, attempt_id, suffix.archive);
        if (archiveOne(source, destination)) {
          archived += 1;
        }
      }
    }
    return archived;
  }

  /**
   * Drop one bead's retired transcript content past the delete horizon (§8.2).
   *
   * BOTH the archive and any session original are removed. A workspace whose
   * server was down across the whole archive window reaches the delete horizon
   * with uncompressed originals still in place, and leaving those behind would
   * make the 180-day policy depend on the server having been running on the
   * right day.
   *
   * `events.jsonl` and `attempts/*.json` are not reachable from here by
   * construction: this walks only `sessions/` and `archive/`.
   *
   * @param {string} bead_id
   * @param {Set<string>} running
   * @param {Set<string>} legacy_ids
   * @returns {number} Files deleted.
   */
  function purgeBead(bead_id, running, legacy_ids) {
    const dirs = beadDirs(bead_id);
    let deleted = 0;
    for (const name of listDir(dirs.archive)) {
      removeFile(path.join(dirs.archive, name));
      deleted += 1;
    }
    for (const name of listDir(dirs.sessions)) {
      const parts = sessionFileParts(name);
      if (parts !== null && running.has(parts.attempt_id)) {
        continue;
      }
      removeFile(path.join(dirs.sessions, name));
      deleted += 1;
    }
    for (const attempt_id of legacy_ids) {
      if (running.has(attempt_id)) {
        continue;
      }
      const flat = sessionLogPath(workspace_root, attempt_id);
      for (const suffix of SESSION_SUFFIXES) {
        const source = replaceJsonlSuffix(flat, suffix.source);
        if (exists(source)) {
          removeFile(source);
          deleted += 1;
        }
      }
    }
    return deleted;
  }

  /**
   * MIGRATION STEP 1 — write an `attempts/<id>.json` record for every attempt
   * §7 says may leave `queue.json`.
   *
   * @param {Record<string, any>} queue
   * @returns {{ written: string[], failed: number }} Attempt ids whose record is
   * readable on disk, and how many candidates did not get one.
   */
  function migrateAttemptRecords(queue) {
    /** @type {string[]} */
    const written = [];
    let failed = 0;
    for (const attempt of transferCandidates(queue)) {
      const file = attemptRecordPath(
        workspace_root,
        attempt.bead_id,
        attempt.attempt_id
      );
      if (exists(file)) {
        written.push(attempt.attempt_id);
        continue;
      }
      try {
        writeAtomic(file, JSON.stringify(attempt, null, 2));
        const readback = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (!isRecord(readback) || readback.attempt_id !== attempt.attempt_id) {
          throw new Error('readback did not return the record just written');
        }
        written.push(attempt.attempt_id);
      } catch (err) {
        // Deliberately NOT recorded as written, and COUNTED: the pass stops
        // before step 4 on any failure, so this attempt keeps its queue row and
        // the next start converts it.
        failed += 1;
        log('attempt record write failed for %s: %s', file, errorDetail(err));
      }
    }
    return { written, failed };
  }

  /**
   * MIGRATION STEP 2 — move the flat `sessions/<attempt>` originals into their
   * bead directory.
   *
   * `rename` ONLY, never copy+unlink: a session's transcript is an inherited fd
   * in a child process, and copying would leave that child writing to an inode
   * nothing can read again. `rename` keeps the inode and the fd valid, which is
   * also why a RUNNING attempt could in principle be moved safely — and is
   * skipped anyway (§8.3 step 2), because the destination a live reader was
   * told about must not change under it.
   *
   * @param {Record<string, any>} queue
   * @param {Set<string>} running
   * @returns {{ moved: number, failed: number }} Files moved, and how many moves
   * the pass could not make.
   */
  function migrateSessionLogs(queue, running) {
    let moved = 0;
    let failed = 0;
    for (const attempt of attemptsOf(queue)) {
      const attempt_id = String(attempt.attempt_id);
      if (running.has(attempt_id)) {
        continue;
      }
      const bead_id = String(attempt.bead_id);
      const flat = sessionLogPath(workspace_root, attempt_id);
      const bead_log = beadSessionLogPath(workspace_root, bead_id, attempt_id);
      for (const suffix of SESSION_SUFFIXES) {
        const source = replaceJsonlSuffix(flat, suffix.source);
        const destination = replaceJsonlSuffix(bead_log, suffix.source);
        if (exists(destination) || !exists(source)) {
          continue;
        }
        try {
          fs.mkdirSync(path.dirname(destination), { recursive: true });
          fs.renameSync(source, destination);
          moved += 1;
        } catch (err) {
          failed += 1;
          log('session log move failed for %s: %s', source, errorDetail(err));
        }
      }
    }
    return { moved, failed };
  }

  /**
   * MIGRATION STEP 3 — back-fill one `attempt_failed` timeline event per past
   * failure record.
   *
   * The `event_id` is the same one {@link
   * import('./queue-store.js').createQueueStore} composes for an attempt's
   * ending (`attempt_failed:<attempt_id>:terminal`), so the back-fill and the
   * live transfer can never show a human the same failure twice, and re-running
   * this step appends a line the reader dedupes away.
   *
   * The summary comes from `cause` alone (§8.3): a pre-migration record predates
   * the extracted `cause_detail.summary`, and inventing a richer line for old
   * rows would make history look like it had evidence it never had.
   *
   * @param {Record<string, any>} queue
   * @returns {{ appended: number, failed: number }} Events appended, and how
   * many failure records did not get one.
   */
  function backfillFailureEvents(queue) {
    let appended = 0;
    let failed = 0;
    for (const attempt of attemptsOf(queue)) {
      if (attempt.status !== 'failed') {
        continue;
      }
      const cause =
        typeof attempt.cause === 'string' && attempt.cause.trim().length > 0
          ? attempt.cause.trim()
          : '원인 미상';
      const result = timeline.append({
        bead_id: String(attempt.bead_id),
        attempt_id: String(attempt.attempt_id),
        kind: 'attempt_failed',
        seq: 'terminal',
        summary: `세션 실패 — ${cause}`,
        ...(typeof attempt.finished_at === 'number' && attempt.finished_at > 0
          ? { at: attempt.finished_at }
          : {})
      });
      if (result.ok) {
        appended += 1;
      } else {
        failed += 1;
        log(
          'failure back-fill append failed for %s: %s',
          attempt.attempt_id,
          result.detail || result.reason
        );
      }
    }
    return { appended, failed };
  }

  /**
   * MIGRATION STEP 4 — write the reduced `queue.json`.
   *
   * Only attempts whose record step 1 PROVED readable are dropped, so a record
   * that failed to write keeps its queue row. Written temp→rename→readback for
   * the same reason the record write is: this is the moment the transferred
   * history stops existing in two places.
   *
   * @param {Record<string, any>} queue
   * @param {string[]} transferred
   * @returns {boolean} Whether the reduced queue is readable on disk.
   */
  function writeReducedQueue(queue, transferred) {
    if (transferred.length === 0) {
      return true;
    }
    const dropped = new Set(transferred);
    /** @type {Record<string, any>} */
    const attempts = {};
    for (const [attempt_id, attempt] of Object.entries(
      recordOf(queue.attempts)
    )) {
      if (!dropped.has(attempt_id)) {
        attempts[attempt_id] = attempt;
      }
    }
    const file = queueFilePath(workspace_root);
    try {
      writeAtomic(file, JSON.stringify({ ...queue, attempts }, null, 2));
      const readback = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (!isRecord(readback) || !isRecord(readback.attempts)) {
        throw new Error('readback did not return the queue just written');
      }
      for (const attempt_id of dropped) {
        if (Object.hasOwn(readback.attempts, attempt_id)) {
          throw new Error(`reduced queue still carries ${attempt_id}`);
        }
      }
      return true;
    } catch (err) {
      log('reduced queue write failed for %s: %s', file, errorDetail(err));
      return false;
    }
  }

  /**
   * MIGRATION STEP 5 — stamp the marker.
   *
   * @param {number} at
   * @returns {boolean}
   */
  function writeMarker(at) {
    const file = recordMigrationMarkerPath(workspace_root);
    try {
      writeAtomic(
        file,
        `${JSON.stringify({ version: RECORD_MIGRATION_VERSION, at }, null, 2)}\n`
      );
      return true;
    } catch (err) {
      log('migration marker write failed for %s: %s', file, errorDetail(err));
      return false;
    }
  }

  return {
    /**
     * The horizons in force right now, re-read per pass so an operator's edit
     * takes effect without a restart.
     */
    policy() {
      return readRetentionPolicy(workspace_root, { fs });
    },

    /**
     * The one-time record migration (§8.3), in the fixed order 1→5.
     *
     * Interrupting anywhere is safe: 1-3 pass on existence checks, an interrupt
     * before 4 loses nothing because the queue has not been reduced yet, and an
     * interrupt after 4 but before 5 makes 1-4 no-ops on the re-run.
     *
     * FAIL-CLOSED at every step. Steps 1-3 each report whether they finished
     * ALL of their work, and a single unfinished item stops the pass before
     * step 4: the marker is the thing that makes this migration one-time, so
     * stamping it over a record that never moved, a transcript that never
     * moved, or a failure event that was never written would make that loss
     * permanent. Nothing is undone — the workspace keeps the layout it already
     * had, which every read path still resolves — and the next start retries.
     *
     * @returns {{ ok: boolean, skipped: boolean, records: number, moved: number, events: number }}
     */
    migrate() {
      /** @type {{ ok: boolean, skipped: boolean, records: number, moved: number, events: number }} */
      let result = {
        ok: false,
        skipped: false,
        records: 0,
        moved: 0,
        events: 0
      };
      try {
        if (exists(recordMigrationMarkerPath(workspace_root))) {
          result = { ok: true, skipped: true, records: 0, moved: 0, events: 0 };
          return result;
        }
        const read = readQueueFile();
        if (read.status === 'unreadable') {
          // A queue this process cannot read is a FAULT, not an empty
          // workspace: its records are still in that file, so nothing may be
          // declared converted on top of it.
          log(
            'record migration aborted for %s: queue.json unreadable (%s)',
            workspace_root,
            read.detail
          );
          return result;
        }
        if (read.status === 'absent') {
          // A workspace with no queue file has no records to convert. It is
          // still stamped: the marker means "this layout is current", and a
          // fresh workspace's is.
          result = {
            ok: writeMarker(now()),
            skipped: false,
            records: 0,
            moved: 0,
            events: 0
          };
          return result;
        }
        const queue = read.queue;
        const running = runningAttemptIds(queue);
        const records = migrateAttemptRecords(queue);
        const logs = migrateSessionLogs(queue, running);
        const events = backfillFailureEvents(queue);
        result = {
          ok: false,
          skipped: false,
          records: records.written.length,
          moved: logs.moved,
          events: events.appended
        };
        const incomplete = records.failed + logs.failed + events.failed > 0;
        if (incomplete) {
          log(
            'record migration incomplete for %s: %d record(s), %d log move(s), %d failure event(s) failed — queue left unreduced',
            workspace_root,
            records.failed,
            logs.failed,
            events.failed
          );
          return result;
        }
        if (!writeReducedQueue(queue, records.written)) {
          return result;
        }
        result = { ...result, ok: writeMarker(now()) };
        return result;
      } finally {
        // Health stays not-ready while the layout is unconverted (§8.3): the
        // flag is cleared on a REAL success and on the marker skip, never on a
        // failure, because everything a client would read is still mid-layout
        // and the readers this gate protects have not been started either.
        if (result.ok) {
          MIGRATION_PENDING.delete(keyFor(workspace_root));
        }
      }
    },

    /**
     * One retention pass (§8.2): archive, then delete, per closed bead.
     *
     * A bead bd does not report `closed` is skipped ENTIRELY — no archive, no
     * delete. Age alone is not evidence a bead is finished; a long-running one
     * that has been quiet for a month still has a human waiting on its
     * transcript.
     *
     * `readStatus` throwing is bd being unreadable, not the bead being open, so
     * the bead is skipped rather than treated either way — the pass runs again
     * tomorrow.
     *
     * @returns {Promise<{ archived: number, deleted: number, closed: number }>}
     */
    async sweep() {
      const policy = readRetentionPolicy(workspace_root, { fs });
      const at = now();
      const queue = queueForSweep();
      const running = runningAttemptIds(queue);
      const queue_by_bead = attemptIdsByBead(queue);
      let archived = 0;
      let deleted = 0;
      let closed = 0;
      for (const bead_id of beadIds()) {
        const last = lastEventAt(bead_id);
        if (last === null) {
          continue;
        }
        const age_days = (at - last) / DAY_MS;
        if (age_days < policy.archive_days) {
          continue;
        }
        /** @type {string|null} */
        let status;
        try {
          status = await readStatus(bead_id);
        } catch (err) {
          log('bd status read failed for %s: %s', bead_id, errorDetail(err));
          continue;
        }
        if (status !== 'closed') {
          continue;
        }
        closed += 1;
        const legacy_ids = legacyAttemptIds(bead_id, queue_by_bead);
        if (age_days >= policy.delete_days) {
          deleted += purgeBead(bead_id, running, legacy_ids);
          continue;
        }
        archived += archiveBead(bead_id, running, legacy_ids);
      }
      return { archived, deleted, closed };
    }
  };
}
