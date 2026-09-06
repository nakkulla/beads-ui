/**
 * ADR signal computer (spec UI-8uz7 §5.2, §8).
 *
 * Runs the three installed dotfiles checkers asynchronously and consumes their
 * `--json` output verbatim (ADR 0012: the vocabulary is a code registry, the
 * rules are not reimplemented in JS). Nothing here runs on a synchronous
 * projection path (ADR 0026) and nothing reads `bd`.
 *
 * @import { AdrRecord } from './adr-frontmatter.js'
 * @import { CheckerPaths } from './adr-registry.js'
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { readAdrDir } from './adr-frontmatter.js';
import {
  ADR_DIR_REL,
  CROSS_CITATION_RE,
  SPEC_DIR_REL,
  defaultCheckerPaths
} from './adr-registry.js';

/**
 * @typedef {Object} SpawnResult
 * @property {number} code - Process exit code (non-zero for failures).
 * @property {string} stdout - Captured standard output.
 * @property {string} stderr - Captured standard error.
 */

/**
 * Injection contract for `spawn`: `(command, args, options) => Promise<SpawnResult>`.
 * A *resolved* promise means the process ran and exited — including a non-zero
 * exit code, which the caller interprets. A *rejected* promise means the process
 * could not run at all or was killed (missing `python3`, missing checker file,
 * timeout); the rejection is recorded as an environment error.
 *
 * @typedef {(command: string, args: string[], options: { cwd: string, timeout: number }) => Promise<SpawnResult>} SpawnFn
 */

/**
 * @typedef {Object} CheckerError
 * @property {string} kind - Contract kind, or an unknown one kept verbatim.
 * @property {string} [file] - Offending file, when the checker reports one.
 * @property {number | null} [line] - Offending line, when reported.
 * @property {number | null} [adr] - ADR number, when reported.
 * @property {string} [detail] - Free-form cause.
 */

/**
 * @typedef {Object} CandidateResult
 * @property {string} spec - Repo-relative spec path.
 * @property {boolean} ok - Checker verdict for that spec.
 * @property {CheckerError[]} errors - Reported errors, verbatim.
 */

/**
 * @typedef {Object} CrossCitation
 * @property {string} file - Repo-relative citing file.
 * @property {number} line - 1-based line number.
 * @property {string} repo - Cited repository name.
 * @property {number} adr - Cited ADR number.
 */

/**
 * @typedef {Object} EnvErrors
 * @property {string | null} index - `adr-index.py` failure sentence.
 * @property {string | null} citations - `adr-cite-check.py` failure sentence.
 * @property {string | null} candidates - `check-adr-candidates.py` failure sentence.
 */

/**
 * @typedef {Object} AdrWorkspace
 * @property {string} root_dir - Absolute workspace root.
 * @property {number} computed_at - Epoch millis of this computation.
 * @property {false} computing - Always false on a finished result.
 * @property {EnvErrors} env_errors - Per-checker environment failures.
 * @property {boolean} adr_dir_missing - True when `docs/adr` is absent.
 * @property {AdrRecord[]} current - `accepted` ADRs, id descending.
 * @property {AdrRecord[]} history - All other ADRs, id descending.
 * @property {{ file: string, error: string }[]} frontmatter_errors - Reader failures.
 * @property {{ ok: boolean, detail: string | null } | null} index_drift - Index verdict.
 * @property {CheckerError[]} citations_stale - Guidance citation errors.
 * @property {CandidateResult[]} candidates - Per-spec candidate results.
 * @property {CrossCitation[]} cross_citations - `ADR <repo>/NNNN` mentions.
 * @property {boolean} retry_pending - True while any env error remains.
 */

/**
 * @typedef {Object} AdrPlan
 * @property {boolean} full - True to recompute everything.
 * @property {string[]} [specs] - Repo-relative specs to recompute when partial.
 */

/** Checker timeout, in milliseconds. */
const CHECKER_TIMEOUT_MS = 20000;

/** Captured checker output ceiling. */
const CHECKER_MAX_BUFFER = 8 * 1024 * 1024;

const CROSS_CITATION_GLOBAL_RE = new RegExp(
  CROSS_CITATION_RE.source,
  `${CROSS_CITATION_RE.flags}g`
);

/**
 * Default spawn: `python3 <args>` through `execFile`, wrapped so a non-zero exit
 * resolves and only a real spawn/timeout failure rejects.
 *
 * @type {SpawnFn}
 */
function defaultSpawn(command, args, options) {
  return new Promise((resolve, reject) => {
    execFile(
      command,
      args,
      {
        cwd: options.cwd,
        timeout: options.timeout,
        maxBuffer: CHECKER_MAX_BUFFER
      },
      (err, stdout, stderr) => {
        if (err && typeof err.code !== 'number') {
          reject(err);
          return;
        }
        resolve({
          code: err ? Number(err.code) : 0,
          stdout: String(stdout),
          stderr: String(stderr)
        });
      }
    );
  });
}

/**
 * @param {unknown} err
 */
function causeOf(err) {
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return String(err);
}

/**
 * Environment error sentence: `<checker file name>: <cause>` (§8).
 *
 * @param {string} checker_path
 * @param {string} cause
 */
function envSentence(checker_path, cause) {
  return `${path.basename(checker_path)}: ${cause}`;
}

/**
 * @param {unknown} value
 * @returns {CheckerError[]}
 */
function normalizeCheckerErrors(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  /** @type {CheckerError[]} */
  const errors = [];
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    const record = /** @type {Record<string, unknown>} */ (entry);
    errors.push({
      kind: typeof record.kind === 'string' ? record.kind : 'unknown',
      file: typeof record.file === 'string' ? record.file : undefined,
      line: typeof record.line === 'number' ? record.line : null,
      adr: typeof record.adr === 'number' ? record.adr : null,
      detail: typeof record.detail === 'string' ? record.detail : undefined
    });
  }
  return errors;
}

/**
 * @param {string} stdout
 * @returns {{ ok: boolean, errors: CheckerError[] }}
 */
function parseCheckerJson(stdout) {
  const parsed = JSON.parse(stdout);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('checker JSON is not an object');
  }
  const record = /** @type {Record<string, unknown>} */ (parsed);
  return {
    ok: record.ok === true,
    errors: normalizeCheckerErrors(record.errors)
  };
}

/**
 * @param {string} dir
 */
async function directoryExists(dir) {
  try {
    const stat = await fs.stat(dir);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * List the top-level `.md` files of a directory (no sub-directories).
 *
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function listMarkdown(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
}

/**
 * Create a semaphore that admits at most `limit` concurrent tasks.
 *
 * @param {number} limit
 */
function createLimiter(limit) {
  const max = Math.max(1, limit);
  let active = 0;
  /** @type {(() => void)[]} */
  const waiting = [];

  /**
   * @template T
   * @param {() => Promise<T>} task
   * @returns {Promise<T>}
   */
  return async function withLimit(task) {
    if (active >= max) {
      await new Promise((resolve) => waiting.push(() => resolve(undefined)));
    }
    active += 1;
    try {
      return await task();
    } finally {
      active -= 1;
      const next = waiting.shift();
      if (next) {
        next();
      }
    }
  };
}

/**
 * Create an ADR signal computer. Previous per-spec candidate results are kept
 * per workspace inside the instance so a partial plan can reuse them.
 *
 * @param {Object} [options]
 * @param {SpawnFn} [options.spawn] - Injected process runner (see `SpawnFn`).
 * @param {CheckerPaths} [options.checker_paths] - Injected checker paths.
 * @param {number} [options.concurrency] - Max concurrent spawns (default 4).
 */
export function createAdrSignals(options = {}) {
  const spawn = options.spawn || defaultSpawn;
  const checker_paths = options.checker_paths || defaultCheckerPaths();
  const with_limit = createLimiter(options.concurrency ?? 4);
  /** @type {Map<string, Map<string, CandidateResult>>} */
  const previous_candidates = new Map();

  /**
   * @param {string} root_dir
   * @param {string[]} args
   */
  function runChecker(root_dir, args) {
    // Every spawn of this instance shares one concurrency ceiling (§4).
    return with_limit(() =>
      spawn('python3', args, { cwd: root_dir, timeout: CHECKER_TIMEOUT_MS })
    );
  }

  /**
   * Step 2: index drift.
   *
   * @param {string} root_dir
   * @returns {Promise<{ drift: { ok: boolean, detail: string | null } | null, env_error: string | null }>}
   */
  async function computeIndexDrift(root_dir) {
    try {
      const result = await runChecker(root_dir, [
        checker_paths.index,
        '--dir',
        ADR_DIR_REL,
        '--check'
      ]);
      if (result.code === 2) {
        return {
          drift: null,
          env_error: envSentence(
            checker_paths.index,
            result.stderr.trim() || 'usage error (exit 2)'
          )
        };
      }
      const first_line = result.stderr.split('\n')[0].trim();
      return {
        drift: { ok: result.code === 0, detail: first_line || null },
        env_error: null
      };
    } catch (err) {
      return {
        drift: null,
        env_error: envSentence(checker_paths.index, causeOf(err))
      };
    }
  }

  /**
   * Step 3: guidance citation staleness.
   *
   * @param {string} root_dir
   * @returns {Promise<{ stale: CheckerError[], env_error: string | null }>}
   */
  async function computeCitations(root_dir) {
    try {
      const result = await runChecker(root_dir, [
        checker_paths.citations,
        '--repo',
        '.',
        '--json'
      ]);
      if (result.code === 2) {
        return {
          stale: [],
          env_error: envSentence(
            checker_paths.citations,
            result.stderr.trim() || 'usage error (exit 2)'
          )
        };
      }
      const parsed = parseCheckerJson(result.stdout);
      if (!parsed.ok && parsed.errors.length === 0) {
        return {
          stale: [
            { kind: 'unknown', detail: result.stderr.trim() || undefined }
          ],
          env_error: null
        };
      }
      return { stale: parsed.errors, env_error: null };
    } catch (err) {
      return {
        stale: [],
        env_error: envSentence(checker_paths.citations, causeOf(err))
      };
    }
  }

  /**
   * Step 4: per-spec candidate materialization.
   *
   * @param {string} root_dir
   * @param {AdrPlan} plan
   * @param {string[]} spec_files - Repo-relative spec paths present on disk.
   * @returns {Promise<{ candidates: CandidateResult[], env_error: string | null }>}
   */
  async function computeCandidates(root_dir, plan, spec_files) {
    const cached =
      previous_candidates.get(root_dir) ||
      /** @type {Map<string, CandidateResult>} */ (new Map());
    const requested = plan.full ? null : new Set(plan.specs || []);
    const to_run = spec_files.filter(
      (spec) => !requested || requested.has(spec) || !cached.has(spec)
    );

    /** @type {string | null} */
    let env_error = null;
    /** @type {(() => Promise<CandidateResult | null>)[]} */
    const tasks = to_run.map((spec) => async () => {
      try {
        const result = await runChecker(root_dir, [
          checker_paths.candidates,
          '--spec',
          spec,
          '--adr-dir',
          ADR_DIR_REL,
          '--json'
        ]);
        if (result.code === 2) {
          // A usage exit is local to the spec row, not a repo-wide env error.
          return {
            spec,
            ok: false,
            errors: [
              {
                kind: 'usage',
                file: spec,
                line: null,
                adr: null,
                detail: result.stderr.trim() || 'usage error (exit 2)'
              }
            ]
          };
        }
        const parsed = parseCheckerJson(result.stdout);
        return { spec, ok: parsed.ok, errors: parsed.errors };
      } catch (err) {
        env_error = envSentence(checker_paths.candidates, causeOf(err));
        return null;
      }
    });

    const results = await Promise.all(tasks.map((task) => task()));
    if (env_error) {
      previous_candidates.delete(root_dir);
      return { candidates: [], env_error };
    }

    /** @type {Map<string, CandidateResult>} */
    const next = new Map();
    for (const result of results) {
      if (result) {
        next.set(result.spec, result);
      }
    }
    // Reuse the untouched rows and drop results for specs that no longer exist.
    /** @type {CandidateResult[]} */
    const candidates = [];
    for (const spec of spec_files) {
      const value = next.get(spec) || cached.get(spec);
      if (value) {
        candidates.push(value);
        next.set(spec, value);
      }
    }
    previous_candidates.set(root_dir, next);
    return { candidates, env_error: null };
  }

  /**
   * Step 5: cross-repository citations in ADRs and specs.
   *
   * @param {string} root_dir
   * @param {string[]} files - Repo-relative files to scan.
   * @returns {Promise<CrossCitation[]>}
   */
  async function computeCrossCitations(root_dir, files) {
    /** @type {CrossCitation[]} */
    const citations = [];
    for (const file of files) {
      /** @type {string} */
      let text;
      try {
        text = await fs.readFile(path.join(root_dir, file), 'utf8');
      } catch {
        continue;
      }
      const lines = text.split('\n');
      for (let i = 0; i < lines.length; i += 1) {
        CROSS_CITATION_GLOBAL_RE.lastIndex = 0;
        for (const match of lines[i].matchAll(CROSS_CITATION_GLOBAL_RE)) {
          citations.push({
            file,
            line: i + 1,
            repo: match[1],
            adr: Number(match[2])
          });
        }
      }
    }
    return citations;
  }

  /**
   * Compute every ADR signal for one workspace.
   *
   * @param {string} root_dir - Absolute workspace root.
   * @param {AdrPlan} plan - Recompute plan from the watch layer.
   * @returns {Promise<AdrWorkspace>}
   */
  async function computeWorkspace(root_dir, plan) {
    const adr_dir = path.join(root_dir, ADR_DIR_REL);
    const spec_dir = path.join(root_dir, SPEC_DIR_REL);
    const adr_dir_missing = !(await directoryExists(adr_dir));

    /** @type {EnvErrors} */
    const env_errors = { index: null, citations: null, candidates: null };

    if (adr_dir_missing) {
      previous_candidates.delete(root_dir);
      return {
        root_dir,
        computed_at: Date.now(),
        computing: false,
        env_errors,
        adr_dir_missing: true,
        current: [],
        history: [],
        frontmatter_errors: [],
        index_drift: null,
        citations_stale: [],
        candidates: [],
        cross_citations: [],
        retry_pending: false
      };
    }

    const { adrs, errors: frontmatter_errors } = await readAdrDir(adr_dir);
    const by_id_desc = [...adrs].sort((a, b) => b.id - a.id);
    const current = by_id_desc.filter((adr) => adr.status === 'accepted');
    const history = by_id_desc.filter((adr) => adr.status !== 'accepted');

    const spec_files = (await listMarkdown(spec_dir)).map(
      (name) => `${SPEC_DIR_REL}/${name}`
    );
    const adr_files = (await listMarkdown(adr_dir)).map(
      (name) => `${ADR_DIR_REL}/${name}`
    );

    const [index_result, citation_result, candidate_result, cross_citations] =
      await Promise.all([
        computeIndexDrift(root_dir),
        computeCitations(root_dir),
        computeCandidates(root_dir, plan, spec_files),
        computeCrossCitations(root_dir, [...adr_files, ...spec_files])
      ]);

    env_errors.index = index_result.env_error;
    env_errors.citations = citation_result.env_error;
    env_errors.candidates = candidate_result.env_error;

    return {
      root_dir,
      computed_at: Date.now(),
      computing: false,
      env_errors,
      adr_dir_missing: false,
      current,
      history,
      frontmatter_errors,
      index_drift: index_result.drift,
      citations_stale: citation_result.stale,
      candidates: candidate_result.candidates,
      cross_citations,
      retry_pending: Boolean(
        env_errors.index || env_errors.citations || env_errors.candidates
      )
    };
  }

  return { computeWorkspace };
}
