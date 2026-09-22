/**
 * 여러 저장소 설정 창의 관측 모델 (UI-e1ta §3).
 *
 * The bulk window reads what the ticked repos hold RIGHT NOW and stands each
 * row on that reading. This module is the whole judgement and nothing else: no
 * DOM, no transport, no draft state. The worker form, the session tab and the
 * account tab all call the same two functions so one row cannot disagree with
 * another about what `갈림` means.
 *
 * Four observations, in the order they are decided (§3):
 * - `pending` — one ticked repo has not been READ for that layer yet. Decided
 *   first, because an unread layer arrives looking exactly like an empty one
 *   and reading it as `비어 있음` would send a deletion request for a setting
 *   nobody has seen.
 * - `mixed` — two or more distinct values (an empty value counts as one).
 * - `empty` — every repo leaves the key unset.
 * - `same` — every repo holds the same non-empty value.
 *
 * Layer readiness is per LAYER, not per key, and the two layers judge it
 * differently (§3): the session-defaults layer is read when the row says
 * `session_defaults_state === 'ready'`, the account layer when the row carries
 * a `workspace_accounts` whose `state` is not `unusable`. Queue-sourced keys
 * arrive with the row itself, so they have no lookup state and never observe
 * `pending`.
 *
 * A legacy server that omits `session_defaults_state` is NOT read as pending:
 * inventing `pending` there would drop every row out of every apply forever
 * (§8).
 */

/** The layers a key can be observed from. */
export const OBSERVATION_LAYERS = /** @type {const} */ ([
  'session_defaults',
  'workspace_accounts',
  'queue'
]);

/**
 * @typedef {'session_defaults'|'workspace_accounts'|'queue'} ObservationLayer
 */

/**
 * @typedef {Object} Observation
 * @property {'same'|'empty'|'mixed'|'pending'} state
 * @property {string|null} value - The value the row stands on; `null` unless
 * the state is `same`.
 * @property {Array<{ root_dir: string, name: string, value: string|null }>} per_repo
 * - Every ticked repo's own value, in row order. Empty for `pending` repos.
 * @property {number} pending_count - How many ticked repos have not been read.
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The stored form of one cell: a non-empty string, else `null`. A stored
 * boolean `true` reads as the string a select carries for it, so the session
 * tab's `bool` row observes like every other row.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
export function observedValue(value) {
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  if (value === true) {
    return 'true';
  }
  return null;
}

/**
 * Whether EVERY ticked repo comes from a server too old to project the account
 * layer (§8). `session_defaults_state` is the marker: a current server always
 * writes it, so a row without it cannot be asked for `workspace_accounts`
 * either. Holding those rows at `미확인` forever would leave the two account
 * rows permanently out of every apply, so the legacy fallback stands them on
 * `기본값 사용` with no badge, exactly as UI-628r did. One current row in the
 * selection is enough to leave the fallback: that row CAN say whether it was
 * read.
 *
 * @param {Array<Record<string, any>>} rows
 * @returns {boolean}
 */
export function accountLayerLegacy(rows) {
  const list = Array.isArray(rows) ? rows.filter((row) => isRecord(row)) : [];
  return (
    list.length > 0 &&
    list.every((row) => !Object.hasOwn(row, 'session_defaults_state'))
  );
}

/**
 * Whether one monitor row has READ the given layer (§3).
 *
 * @param {Record<string, any>} row
 * @param {ObservationLayer} layer
 * @returns {boolean}
 */
export function layerReady(row, layer) {
  if (layer === 'queue') {
    return true;
  }
  if (layer === 'session_defaults') {
    // A server that never had the key is not pending — it is a server whose
    // values are the whole truth it can tell (§8).
    const state = row.session_defaults_state;
    return typeof state === 'string' ? state === 'ready' : true;
  }
  const accounts = row.workspace_accounts;
  return isRecord(accounts) && accounts.state !== 'unusable';
}

/**
 * One repo's value for a key inside a layer.
 *
 * @param {Record<string, any>} row
 * @param {string} key
 * @param {ObservationLayer} layer
 * @returns {string|null}
 */
function valueOf(row, key, layer) {
  if (layer === 'session_defaults') {
    const values = isRecord(row.session_defaults) ? row.session_defaults : {};
    return observedValue(values[key]);
  }
  if (layer === 'workspace_accounts') {
    const accounts = isRecord(row.workspace_accounts)
      ? row.workspace_accounts
      : null;
    const values = accounts && isRecord(accounts.values) ? accounts.values : {};
    return observedValue(values[key]);
  }
  return observedValue(row[key]);
}

/**
 * Observe one key across the ticked repos.
 *
 * @param {Array<Record<string, any>>} rows - The SELECTED monitor rows, in row
 * order.
 * @param {string} key
 * @param {ObservationLayer} layer
 * @returns {Observation}
 */
export function observeKey(rows, key, layer) {
  const list = Array.isArray(rows) ? rows.filter((row) => isRecord(row)) : [];
  if (layer === 'workspace_accounts' && accountLayerLegacy(list)) {
    // An all-legacy selection has no lookup state to read, so it starts at
    // `기본값 사용` with nothing to explain — an empty `per_repo` is what keeps
    // {@link observationBadge} silent (§8).
    return { state: 'empty', value: null, per_repo: [], pending_count: 0 };
  }
  /** @type {Array<{ root_dir: string, name: string, value: string|null }>} */
  const per_repo = [];
  let pending_count = 0;
  for (const row of list) {
    const entry = {
      root_dir: String(row.root_dir ?? ''),
      name: String(row.name ?? row.root_dir ?? ''),
      value: layerReady(row, layer) ? valueOf(row, key, layer) : null
    };
    if (!layerReady(row, layer)) {
      pending_count += 1;
    }
    per_repo.push(entry);
  }
  if (pending_count > 0) {
    return { state: 'pending', value: null, per_repo, pending_count };
  }
  if (per_repo.length === 0) {
    return { state: 'empty', value: null, per_repo, pending_count: 0 };
  }
  const first = per_repo[0].value;
  const uniform = per_repo.every((entry) => entry.value === first);
  if (!uniform) {
    return { state: 'mixed', value: null, per_repo, pending_count: 0 };
  }
  return first === null
    ? { state: 'empty', value: null, per_repo, pending_count: 0 }
    : { state: 'same', value: first, per_repo, pending_count: 0 };
}

/**
 * Observe a SET-valued key — the per-runner allow list (§6). Two repos agree
 * only when their sets hold exactly the same members; order is not a value.
 *
 * @param {Array<Record<string, any>>} rows
 * @param {(row: Record<string, any>) => string[]} readSet - How to pull one
 * repo's set out of its row.
 * @returns {{ state: 'same'|'empty'|'mixed', value: string[], per_repo: Array<{ root_dir: string, name: string, value: string }> }}
 */
export function observeSet(rows, readSet) {
  const list = Array.isArray(rows) ? rows.filter((row) => isRecord(row)) : [];
  const per_repo = list.map((row) => {
    const members = readSet(row);
    return {
      root_dir: String(row.root_dir ?? ''),
      name: String(row.name ?? row.root_dir ?? ''),
      value: [...members].sort().join(',')
    };
  });
  if (per_repo.length === 0) {
    return { state: 'empty', value: [], per_repo };
  }
  const first = per_repo[0].value;
  if (!per_repo.every((entry) => entry.value === first)) {
    return { state: 'mixed', value: [], per_repo };
  }
  return {
    state: first.length === 0 ? 'empty' : 'same',
    value: readSet(list[0]),
    per_repo
  };
}

/**
 * The queue field one profile's apply record rides on. The two records are
 * independent: a general apply never touches the quick_fix one (design §4.1).
 *
 * @param {unknown} applies_to
 * @returns {string}
 */
export function appliedPresetFieldFor(applies_to) {
  return applies_to === 'quick_fix'
    ? 'applied_quick_fix_preset'
    : 'applied_exec_preset';
}

/**
 * Observe the queue's apply record OF ONE PROFILE. The identity of an applied
 * preset is its `id` ALONE (§4.1): `applied_at` is written per repo by
 * `apply-impl-preset-global`, so comparing whole records would report `갈림`
 * for one preset applied to every repo at once, and `revision` is a fact about
 * the preset rather than about this read-only line.
 *
 * @param {Array<Record<string, any>>} rows
 * @param {unknown} [applies_to] - The profile whose record to read; `general`
 * by default.
 * @returns {Observation}
 */
export function observeAppliedPreset(rows, applies_to = 'general') {
  const field = appliedPresetFieldFor(applies_to);
  return observeKey(
    (Array.isArray(rows) ? rows : []).map((row) => ({
      ...row,
      __applied_preset_id: isRecord(row?.[field])
        ? observedValue(row[field].id)
        : null
    })),
    '__applied_preset_id',
    'queue'
  );
}

/**
 * Whether EVERY ticked repo carries this profile's record key. The line is
 * drawn only when the projection has it: an older server that omits the field
 * gets no line and no invented wording (§8).
 *
 * @param {Array<Record<string, any>>} rows
 * @param {unknown} [applies_to] - The profile whose record to look for.
 * @returns {boolean}
 */
export function appliedPresetProjected(rows, applies_to = 'general') {
  const field = appliedPresetFieldFor(applies_to);
  const list = Array.isArray(rows) ? rows.filter((row) => isRecord(row)) : [];
  return list.length > 0 && list.every((row) => Object.hasOwn(row, field));
}

/**
 * The badge one observation shows, or `null` when the row simply stands on its
 * own value with nothing to explain — a single ticked repo never has a `갈림`
 * to report (§3).
 *
 * @param {Observation} observation
 * @param {(value: string|null) => string} [labelOf] - How to name one repo's
 * value in the `title`; the raw value by default.
 * @returns {{ text: string, title: string, state: string }|null}
 */
export function observationBadge(observation, labelOf) {
  const nameOf =
    typeof labelOf === 'function'
      ? labelOf
      : (/** @type {string|null} */ value) => value ?? '없음';
  const count = observation.per_repo.length;
  if (observation.state === 'pending') {
    return {
      state: 'pending',
      text: `미확인 · ${observation.pending_count}곳 조회 중`,
      title: '아직 읽지 못한 저장소가 있어 이 행은 적용에서 빠집니다'
    };
  }
  if (observation.state === 'mixed') {
    /** @type {Map<string, string[]>} */
    const groups = new Map();
    for (const entry of observation.per_repo) {
      const label = nameOf(entry.value);
      groups.set(label, [...(groups.get(label) || []), entry.name]);
    }
    const summary = [...groups.entries()]
      .map(([label, names]) => `${names.length}곳 ${label}`)
      .join(' · ');
    const title = observation.per_repo
      .map((entry) => `${entry.name}: ${nameOf(entry.value)}`)
      .join('\n');
    return { state: 'mixed', text: `갈림 · ${summary}`, title };
  }
  if (count < 2) {
    return null;
  }
  return observation.state === 'empty'
    ? {
        state: 'empty',
        text: `${count}곳 모두 비어 있음`,
        title: `${count}곳 모두 이 값을 두지 않습니다`
      }
    : {
        state: 'same',
        text: `${count}곳 모두 같음`,
        title: `${count}곳 모두 ${nameOf(observation.value)}`
      };
}

/**
 * Whether a row standing on this observation may go into an apply payload
 * (§3.2). `갈림`과 `미확인` rows keep each repo's own value by staying out.
 *
 * @param {Observation} observation
 * @returns {boolean}
 */
export function observationApplies(observation) {
  return observation.state === 'same' || observation.state === 'empty';
}
