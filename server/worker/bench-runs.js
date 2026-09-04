/**
 * Bench experiment runs — clone creation and the immutable run manifest
 * (preset-compare §4.2·§4.3·§4.7).
 *
 * One experiment takes ONE `route=quick_fix` bead and re-runs it under several
 * execution presets, `repeats` times each. Every cell is a clone bead carrying
 * the same body bytes, the same self-review receipt, and a COMPLETE execution
 * tuple pinned at creation time.
 *
 * Why the tuple is pinned rather than copied: a preset is sparse, so copying it
 * verbatim would leave every axis it does not name resolving against whatever
 * the workspace default happens to be when that cell finally dispatches. Two
 * cells of the same experiment would then differ on an axis nobody chose. The
 * ladder is preset > workspace quick_fix lane > workspace general > harness
 * projection, and its orchestration half is resolved by
 * `exec-preset-coordinator.resolveForDispatch(workspace, { route: 'quick_fix' })`
 * — the same function dispatch itself reads, so the pin cannot disagree with
 * what would have run.
 *
 * The clone lands NO dependency edge. `related` collides with the sibling rule
 * and `discovered-from` means follow-up work; the link is `bench_source`.
 *
 * The manifest holds the run's INPUTS only. Cell results are projected from the
 * clone beads' own attempt records every time they are read (§4.7), because a
 * second result ledger would have to be kept in step with attempt history that
 * already is the source of truth.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { EXEC_SETTING_KEYS, QUICK_FIX_LANE_MAP } from './exec-enums.js';
import { loadExecutionDefaults } from './execution-defaults.js';
import { benchManifestPath, benchRunsDir } from './state-paths.js';

const log = debug('worker:bench-runs');

/**
 * The label every clone carries. Board hides it by default (§4.8); the Worker
 * tab shows it because it is the lane that executes it.
 */
export const BENCH_LABEL = 'bench';

/**
 * `bench_run` / close-reason run-id vocabulary, consumed verbatim from the
 * dotfiles contract (`metadata.out_of_registry.formats.bench_run`, and the same
 * token set inside `landing_none_close.close_reason.regex`).
 */
export const BENCH_RUN_ID_RE = /^[A-Za-z0-9._-]+$/;

/** A full commit object name — the only shape `bench_base` accepts. */
const FULL_SHA_RE = /^[0-9a-f]{40}$/i;

/**
 * The reviewer triple a `고정` toggle overwrites on every cell (§4.2). Kept as
 * one list because the three are only meaningful together: an effort without
 * the model it belongs to names nothing.
 */
export const BENCH_REVIEWER_KEYS = [
  'impl_review_model',
  'impl_review_effort',
  'impl_review_speed'
];

/**
 * The complete tuple a clone pins: the canonical execution keys plus
 * `impl_dispatch`, which is not one of them because it is a selector-level
 * choice rather than a launcher flag — and is exactly the axis a quick_fix
 * clone must override.
 */
export const BENCH_TUPLE_KEYS = [...EXEC_SETTING_KEYS, 'impl_dispatch'];

/**
 * The three orchestration keys `resolveForDispatch` already resolves. They are
 * taken from its answer rather than re-derived here so the pin and the dispatch
 * read the same ladder.
 */
const ORCHESTRATION_TUPLE_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed'
];

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function usableString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * The harness layer of the ladder, projected from the pinned
 * `execution-defaults.json` (§4.2 last rung).
 *
 * Only the keys the artifact actually states are produced. A key it does not
 * name has no harness answer, so the tuple simply omits it rather than
 * inventing one — an invented value would be pinned onto every clone and read
 * back later as a choice somebody made.
 *
 * @param {{ fs?: any }} [deps]
 * @returns {Record<string, string>}
 */
export function benchHarnessDefaults(deps = {}) {
  const loaded = loadExecutionDefaults(deps.fs ? { fs: deps.fs } : {});
  const session =
    loaded.supported && isRecord(loaded.session) ? loaded.session : null;
  if (session === null) {
    return {};
  }
  /** @type {Record<string, string>} */
  const out = {};
  const review = isRecord(session.review) ? session.review : null;
  const reviewers =
    review && isRecord(review.reviewers) ? review.reviewers : {};
  const plan_review = isRecord(session.plan_review)
    ? session.plan_review
    : null;
  /**
   * @param {string} step
   * @param {string|null} model
   */
  const applyReviewer = (step, model) => {
    if (model === null) {
      return;
    }
    out[`${step}_review_model`] = model;
    const entry = isRecord(reviewers[model]) ? reviewers[model] : null;
    const effort = entry ? usableString(entry.effort) : null;
    if (effort !== null) {
      out[`${step}_review_effort`] = effort;
    }
    // The artifact states no per-reviewer speed; `default` is the contract's
    // only non-opt-in tier, so it is the answer for every step alike.
    out[`${step}_review_speed`] = 'default';
  };
  const review_default = review ? usableString(review.default) : null;
  applyReviewer('spec', review_default);
  applyReviewer('impl', review_default);
  applyReviewer(
    'plan',
    plan_review ? usableString(plan_review.standard_recommended) : null
  );

  const implementation = isRecord(session.implementation)
    ? session.implementation
    : null;
  const impl_default =
    implementation && isRecord(implementation.default)
      ? implementation.default
      : null;
  if (impl_default) {
    const runtime = usableString(impl_default.runtime);
    const model = usableString(impl_default.model);
    const effort = usableString(impl_default.effort);
    if (runtime !== null) {
      out.impl_runtime = runtime;
    }
    if (model !== null) {
      out.impl_model = model;
    }
    if (effort !== null) {
      out.impl_effort = effort;
    }
  }
  const route_defaults =
    implementation && isRecord(implementation.route_defaults)
      ? implementation.route_defaults
      : null;
  const quick_fix =
    route_defaults && isRecord(route_defaults.quick_fix)
      ? route_defaults.quick_fix
      : null;
  const dispatch = quick_fix ? usableString(quick_fix.dispatch) : null;
  if (dispatch !== null) {
    out.impl_dispatch = dispatch;
  }
  return out;
}

/**
 * Resolve one preset into the COMPLETE execution tuple a clone pins (§4.2).
 *
 * The three orchestration keys come from `resolveForDispatch`, which already walked
 * preset > queue quick_fix lane > queue general > launcher fallback for a
 * `route=quick_fix` bead. Every remaining key walks the same shape by hand
 * against the kv layers the coordinator cannot reach: the route-scoped
 * `quick_fix_*` profile first, the general `workflow_session_defaults` key
 * second, the harness projection last. An EMPTY quick_fix key is not an answer,
 * so it falls through to the general one — that is what makes the profile an
 * override layer rather than an independent profile (ADR 0032).
 *
 * @param {{
 *   coordinator: { resolveForDispatch: (workspace: string, bead: any) => any },
 *   workspace: string,
 *   preset_settings: Record<string, unknown>,
 *   kv_values?: Record<string, unknown>,
 *   harness?: Record<string, string>
 * }} input
 * @returns {{ ok: true, values: Record<string, string> }|{ ok: false, reason: string }}
 */
export function resolveBenchTuple(input) {
  const preset = isRecord(input.preset_settings) ? input.preset_settings : {};
  const kv = isRecord(input.kv_values) ? input.kv_values : {};
  const harness = isRecord(input.harness)
    ? input.harness
    : benchHarnessDefaults();

  /** @type {any} */
  let resolved;
  try {
    resolved = input.coordinator.resolveForDispatch(input.workspace, {
      route: 'quick_fix',
      // `resolveExecSettings` reads the orchestration axis under the bead
      // snapshot's own field names, not the metadata ones.
      model: usableString(preset.orchestration_model) ?? undefined,
      effort: usableString(preset.orchestration_effort) ?? undefined,
      orchestration_speed: usableString(preset.orchestration_speed) ?? undefined
    });
  } catch (err) {
    log('bench tuple orchestration resolution threw: %o', err);
    return { ok: false, reason: 'orchestration_resolution_failed' };
  }
  if (!resolved || resolved.ok !== true || !isRecord(resolved.exec)) {
    return { ok: false, reason: 'orchestration_resolution_failed' };
  }
  if (usableString(resolved.exec.invalid_reason) !== null) {
    return { ok: false, reason: String(resolved.exec.invalid_reason) };
  }

  /** @type {Record<string, string>} */
  const values = {};
  for (const key of BENCH_TUPLE_KEYS) {
    if (ORCHESTRATION_TUPLE_KEYS.includes(key)) {
      const value = usableString(resolved.exec[key]);
      if (value !== null) {
        values[key] = value;
      }
      continue;
    }
    const lane_key = QUICK_FIX_LANE_MAP[key];
    const picked =
      usableString(preset[key]) ??
      (lane_key ? usableString(kv[lane_key]) : null) ??
      usableString(kv[key]) ??
      usableString(harness[key]);
    if (picked !== null) {
      values[key] = picked;
    }
  }
  return { ok: true, values };
}

/**
 * The clone bead one cell is created from (§4.3).
 *
 * The description is copied BYTE FOR BYTE: the quick_fix self-review receipt
 * `self@<digest>` is bound to the sha256 of the body, so the copied receipt
 * only stays valid while the body does. That is also why the receipt is copied
 * rather than regenerated — regenerating it would be the Worker asserting a
 * review it never performed.
 *
 * @param {{
 *   source: { id: string, title: string, description: string, issue_type?: string|null, priority?: number|null, labels?: string[], quick_fix_review: string },
 *   preset: { id: string, name: string },
 *   k: number,
 *   run_id: string,
 *   base_sha: string,
 *   tuple: Record<string, string>,
 *   reviewer?: Record<string, string>|null
 * }} input
 * @returns {{ title: string, description: string, issue_type: string|null, priority: number|null, labels: string[], metadata: Record<string, string> }}
 */
export function benchCloneFields(input) {
  const area_labels = Array.isArray(input.source.labels)
    ? input.source.labels.filter(
        (label) => typeof label === 'string' && label.length > 0
      )
    : [];
  /** @type {Record<string, string>} */
  const metadata = {
    route: 'quick_fix',
    quick_fix_review: input.source.quick_fix_review,
    ...input.tuple,
    ...(isRecord(input.reviewer) ? input.reviewer : {}),
    // Always delegated. A quick_fix defaults to `main`, and under that default
    // the preset's implementation runtime and model would never be exercised —
    // which is the whole subject of the comparison.
    impl_dispatch: 'delegated',
    bench_run: input.run_id,
    bench_cell: `${input.preset.id}:${input.k}`,
    bench_source: input.source.id,
    bench_base: input.base_sha,
    landing: 'none'
  };
  return {
    title: `[bench] ${input.source.title} · ${input.preset.name} #${input.k}`,
    description: input.source.description,
    issue_type: usableString(input.source.issue_type),
    priority:
      typeof input.source.priority === 'number' &&
      Number.isFinite(input.source.priority)
        ? input.source.priority
        : null,
    labels: [...new Set([...area_labels, BENCH_LABEL])],
    metadata
  };
}

/**
 * Whether one source bead may be cloned at all (§4.1·§6).
 *
 * Fail-closed on both counts: a non-quick_fix route has no self-sufficient
 * body to copy, and a missing `quick_fix_review` would make every clone refuse
 * admission for a reason that looks like a Worker defect.
 *
 * @param {{ route?: unknown, quick_fix_review?: unknown, description?: unknown }} source
 * @returns {{ ok: true }|{ ok: false, reason: string }}
 */
export function benchSourceEligibility(source) {
  if (source?.route !== 'quick_fix') {
    return { ok: false, reason: 'source_not_quick_fix' };
  }
  if (usableString(source.quick_fix_review) === null) {
    return { ok: false, reason: 'source_quick_fix_review_missing' };
  }
  if (usableString(source.description) === null) {
    return { ok: false, reason: 'source_description_missing' };
  }
  return { ok: true };
}

/**
 * Persist one run manifest. Written ONCE, after every clone exists, and never
 * rewritten — so a reader that finds a manifest knows the run it names was
 * fully created.
 *
 * @param {string} workspace_root
 * @param {Record<string, any>} manifest
 * @param {{ fs?: any }} [deps]
 * @returns {{ ok: boolean, path?: string, reason?: string }}
 */
export function writeBenchManifest(workspace_root, manifest, deps = {}) {
  const fs = deps.fs || nodeFs;
  const run_id = usableString(manifest?.run_id);
  if (run_id === null || !BENCH_RUN_ID_RE.test(run_id)) {
    return { ok: false, reason: 'invalid_run_id' };
  }
  const file = benchManifestPath(workspace_root, run_id);
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`);
  } catch (err) {
    log('bench manifest write failed for %s: %o', run_id, err);
    return { ok: false, reason: 'manifest_write_failed' };
  }
  return { ok: true, path: file };
}

/**
 * @param {string} workspace_root
 * @param {string} run_id
 * @param {{ fs?: any }} [deps]
 * @returns {Record<string, any>|null}
 */
export function readBenchManifest(workspace_root, run_id, deps = {}) {
  const fs = deps.fs || nodeFs;
  if (usableString(run_id) === null || !BENCH_RUN_ID_RE.test(run_id)) {
    return null;
  }
  try {
    const raw = String(
      fs.readFileSync(benchManifestPath(workspace_root, run_id), 'utf8')
    );
    const parsed = JSON.parse(raw);
    return isRecord(parsed) ? parsed : null;
  } catch {
    // An unreadable manifest is an absent one: nothing downstream may treat a
    // read failure as "this run has no cells".
    return null;
  }
}

/**
 * Every run manifest of one workspace, newest first.
 *
 * @param {string} workspace_root
 * @param {{ fs?: any }} [deps]
 * @returns {Record<string, any>[]}
 */
export function listBenchManifests(workspace_root, deps = {}) {
  const fs = deps.fs || nodeFs;
  /** @type {string[]} */
  let names;
  try {
    names = fs.readdirSync(benchRunsDir(workspace_root));
  } catch {
    return [];
  }
  /** @type {Record<string, any>[]} */
  const out = [];
  for (const name of names) {
    if (!name.endsWith('.json')) {
      continue;
    }
    const manifest = readBenchManifest(
      workspace_root,
      name.slice(0, -'.json'.length),
      deps
    );
    if (manifest) {
      out.push(manifest);
    }
  }
  out.sort((a, b) => Number(b.created_at ?? 0) - Number(a.created_at ?? 0));
  return out;
}

/**
 * The clone bead ids one run owns.
 *
 * @param {Record<string, any>|null} manifest
 * @returns {string[]}
 */
export function benchRunBeadIds(manifest) {
  if (!isRecord(manifest) || !Array.isArray(manifest.cells)) {
    return [];
  }
  /** @type {string[]} */
  const ids = [];
  for (const cell of manifest.cells) {
    const id = isRecord(cell) ? usableString(cell.bead_id) : null;
    if (id !== null) {
      ids.push(id);
    }
  }
  return ids;
}

/**
 * Create one bench run: every cell's clone, then the manifest (§4.3·§4.6).
 *
 * FAIL-CLOSED as a whole. The base tip is required up front, and a single
 * clone that cannot be completed aborts the experiment: every clone already
 * created is closed with `bench:<run_id>:aborted` and no manifest is written,
 * so a partially-created run can never be read as a run.
 *
 * `bd` is injected rather than imported so this module stays testable without a
 * database, and so the ws layer can bind the SAME workspace-scoped runner every
 * other mutation goes through.
 *
 * @param {{
 *   workspace_root: string,
 *   run_id: string,
 *   base_sha: string,
 *   source: { id: string, title: string, description: string, issue_type?: string|null, priority?: number|null, labels?: string[], quick_fix_review: string, route?: unknown },
 *   presets: Array<{ id: string, name: string, tuple: Record<string, string> }>,
 *   repeats: number,
 *   reviewer_mode: 'fixed'|'preset',
 *   reviewer: Record<string, string>|null,
 *   bd: {
 *     create: (input: { title: string, description: string, issue_type: string|null, priority: number|null }) => Promise<{ ok: boolean, id?: string, reason?: string }>,
 *     setMetadata: (bead_id: string, values: Record<string, string>) => Promise<{ ok: boolean, reason?: string }>,
 *     addLabels: (bead_id: string, labels: string[]) => Promise<{ ok: boolean, reason?: string }>,
 *     closeWithReason: (bead_id: string, reason: string) => Promise<{ ok: boolean, reason?: string }>
 *   },
 *   now?: () => number,
 *   fs?: any
 * }} input
 * @returns {Promise<{ ok: true, manifest: Record<string, any> }|{ ok: false, reason: string, aborted: string[] }>}
 */
export async function createBenchRun(input) {
  const now = input.now || (() => Date.now());
  const run_id = usableString(input.run_id);
  if (run_id === null || !BENCH_RUN_ID_RE.test(run_id)) {
    return { ok: false, reason: 'invalid_run_id', aborted: [] };
  }
  const base_sha = usableString(input.base_sha);
  if (base_sha === null || !FULL_SHA_RE.test(base_sha)) {
    // §6: without the base tip the experiment does not start. A cell cut from
    // "whatever the base is now" is not comparable with its siblings.
    return { ok: false, reason: 'base_tip_unreadable', aborted: [] };
  }
  const eligible = benchSourceEligibility(input.source);
  if (!eligible.ok) {
    return { ok: false, reason: eligible.reason, aborted: [] };
  }
  const repeats =
    Number.isInteger(input.repeats) && input.repeats >= 1 && input.repeats <= 5
      ? input.repeats
      : 0;
  if (repeats === 0) {
    return { ok: false, reason: 'invalid_repeats', aborted: [] };
  }
  if (!Array.isArray(input.presets) || input.presets.length === 0) {
    return { ok: false, reason: 'no_presets', aborted: [] };
  }
  const reviewer =
    input.reviewer_mode === 'fixed' && isRecord(input.reviewer)
      ? input.reviewer
      : null;

  /** @type {Array<{ preset_id: string, k: number, bead_id: string }>} */
  const cells = [];

  /**
   * Undo a partial creation (§4.6). Best-effort per bead: a clone that cannot
   * be closed is still reported, because the manifest is never written and the
   * operator has to know which beads were left behind.
   *
   * @param {string} reason
   * @returns {Promise<{ ok: false, reason: string, aborted: string[] }>}
   */
  const abort = async (reason) => {
    for (const cell of cells) {
      try {
        await input.bd.closeWithReason(cell.bead_id, `bench:${run_id}:aborted`);
      } catch (err) {
        log('bench abort close failed for %s: %o', cell.bead_id, err);
      }
    }
    return { ok: false, reason, aborted: cells.map((cell) => cell.bead_id) };
  };

  for (const preset of input.presets) {
    for (let k = 1; k <= repeats; k += 1) {
      const fields = benchCloneFields({
        source: input.source,
        preset,
        k,
        run_id,
        base_sha,
        tuple: preset.tuple,
        reviewer
      });
      /** @type {{ ok: boolean, id?: string, reason?: string }} */
      let created;
      try {
        created = await input.bd.create({
          title: fields.title,
          description: fields.description,
          issue_type: fields.issue_type,
          priority: fields.priority
        });
      } catch (err) {
        log('bench clone create threw: %o', err);
        return abort('clone_create_failed');
      }
      const bead_id = created.ok ? usableString(created.id) : null;
      if (bead_id === null) {
        return abort(created.reason || 'clone_create_failed');
      }
      cells.push({ preset_id: preset.id, k, bead_id });

      /** @type {{ ok: boolean, reason?: string }} */
      let labelled;
      try {
        labelled = await input.bd.addLabels(bead_id, fields.labels);
      } catch (err) {
        log('bench clone label failed for %s: %o', bead_id, err);
        return abort('clone_label_failed');
      }
      if (!labelled.ok) {
        return abort(labelled.reason || 'clone_label_failed');
      }

      /** @type {{ ok: boolean, reason?: string }} */
      let stamped;
      try {
        stamped = await input.bd.setMetadata(bead_id, fields.metadata);
      } catch (err) {
        log('bench clone metadata failed for %s: %o', bead_id, err);
        return abort('clone_metadata_failed');
      }
      if (!stamped.ok) {
        return abort(stamped.reason || 'clone_metadata_failed');
      }
    }
  }

  const manifest = {
    run_id,
    source_bead_id: input.source.id,
    base_sha,
    presets: input.presets.map((preset) => ({
      id: preset.id,
      name: preset.name,
      resolved_tuple: preset.tuple
    })),
    repeats,
    reviewer_mode: input.reviewer_mode,
    reviewer,
    delegate_forced: true,
    cells,
    created_at: now()
  };
  const written = writeBenchManifest(
    input.workspace_root,
    manifest,
    input.fs ? { fs: input.fs } : {}
  );
  if (!written.ok) {
    return abort(written.reason || 'manifest_write_failed');
  }
  return { ok: true, manifest };
}
