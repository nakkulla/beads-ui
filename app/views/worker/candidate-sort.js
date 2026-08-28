/**
 * Candidate lane sort chain (UI-d13v §4).
 *
 * The lane's order is an ATOMIC-KEY CHAIN of 1–3 steps, not a mode: the four
 * former modes survive as presets and `Board 순서` is retired, because the
 * candidate lane no longer reads the Board's manual rank (§2.1·§6). The chain
 * is a purely CLIENT-side preference — the server sends one candidate feed and
 * the lane decides how to read it.
 *
 * @import { SortKey, SortStep } from '../../data/sort.js'
 */
import { SORT_KEY_DEFAULT_DIR, cmpChain, isSortStep } from '../../data/sort.js';
import { blockerIdsOf } from './blocker-ids.js';

/**
 * @type {string}
 */
export const CANDIDATE_SORT_KEY = 'bdui.worker.candidate_sort';

/**
 * @typedef {'spec'|'bottleneck'|'created'|'updated'} PresetId
 */

/**
 * The persisted selection: either a preset id or the explicit chain behind it.
 * A chain matching a preset step-for-step is stored as `{ preset }` (§4.3) so
 * the header select keeps naming what the user chose.
 *
 * @typedef {{ preset: PresetId } | { chain: SortStep[] }} CandidateSortState
 */

/**
 * Presets in render order (§4.2). `spec` leads and is the default for the same
 * reason as before (UI-raqh): the pane answers "what can I dispatch" and only a
 * spec-carrying bead is queue-eligible. What changed is the order INSIDE each
 * group — `created asc` (longest-waiting first) rather than Board rank.
 *
 * @type {ReadonlyArray<{ id: PresetId, label: string, chain: SortStep[] }>}
 */
export const CANDIDATE_SORT_PRESETS = Object.freeze([
  {
    id: /** @type {PresetId} */ ('spec'),
    label: 'spec 우선',
    chain: [
      {
        key: /** @type {SortKey} */ ('spec'),
        dir: /** @type {'desc'} */ ('desc')
      },
      {
        key: /** @type {SortKey} */ ('created'),
        dir: /** @type {'asc'} */ ('asc')
      }
    ]
  },
  {
    id: /** @type {PresetId} */ ('bottleneck'),
    label: '병목 우선',
    chain: [
      {
        key: /** @type {SortKey} */ ('priority'),
        dir: /** @type {'asc'} */ ('asc')
      },
      {
        key: /** @type {SortKey} */ ('dependents'),
        dir: /** @type {'desc'} */ ('desc')
      },
      {
        key: /** @type {SortKey} */ ('released'),
        dir: /** @type {'desc'} */ ('desc')
      }
    ]
  },
  {
    id: /** @type {PresetId} */ ('created'),
    label: '최신 생성',
    chain: [
      {
        key: /** @type {SortKey} */ ('created'),
        dir: /** @type {'desc'} */ ('desc')
      },
      {
        key: /** @type {SortKey} */ ('priority'),
        dir: /** @type {'asc'} */ ('asc')
      }
    ]
  },
  {
    id: /** @type {PresetId} */ ('updated'),
    label: '최신 수정',
    chain: [
      {
        key: /** @type {SortKey} */ ('updated'),
        dir: /** @type {'desc'} */ ('desc')
      }
    ]
  }
]);

/**
 * @type {CandidateSortState}
 */
export const CANDIDATE_SORT_DEFAULT = Object.freeze({
  preset: /** @type {PresetId} */ ('spec')
});

/**
 * Longest chain the editor and the storage narrowing accept (§4.1).
 *
 * @type {number}
 */
export const CHAIN_MAX_STEPS = 3;

/**
 * Key labels for the chain editor, in the §4.1 표 order. The key vocabulary
 * itself comes from `SORT_KEY_DEFAULT_DIR` so this list cannot drift from the
 * comparator's.
 *
 * @type {ReadonlyArray<{ key: SortKey, label: string }>}
 */
export const SORT_KEY_OPTIONS = Object.freeze([
  { key: /** @type {SortKey} */ ('priority'), label: '우선순위' },
  { key: /** @type {SortKey} */ ('dependents'), label: '후속 수' },
  { key: /** @type {SortKey} */ ('released'), label: '해제 시각' },
  { key: /** @type {SortKey} */ ('spec'), label: 'spec 유무' },
  { key: /** @type {SortKey} */ ('created'), label: '생성' },
  { key: /** @type {SortKey} */ ('updated'), label: '수정' }
]);

/**
 * @param {unknown} value
 * @returns {value is PresetId}
 */
function isPresetId(value) {
  return CANDIDATE_SORT_PRESETS.some((preset) => preset.id === value);
}

/**
 * @param {PresetId} id
 * @returns {SortStep[]}
 */
function presetChain(id) {
  const preset = CANDIDATE_SORT_PRESETS.find((p) => p.id === id);
  return preset ? preset.chain.map((step) => ({ ...step })) : [];
}

/**
 * @param {SortStep[]} a
 * @param {SortStep[]} b
 * @returns {boolean}
 */
function sameChain(a, b) {
  return (
    a.length === b.length &&
    a.every((step, i) => step.key === b[i].key && step.dir === b[i].dir)
  );
}

/**
 * The steps a state orders by (§4.1). A preset resolves to its table chain; a
 * stored chain is returned as a copy so a caller cannot mutate the state.
 *
 * @param {CandidateSortState} state
 * @returns {SortStep[]}
 */
export function chainOf(state) {
  if (state && 'preset' in state) {
    return presetChain(state.preset);
  }
  if (state && Array.isArray(state.chain)) {
    return state.chain.map((step) => ({ ...step }));
  }
  return presetChain(/** @type {PresetId} */ ('spec'));
}

/**
 * The preset a state names, or `null` when it is a custom chain. The header
 * select reads it to decide which option is current.
 *
 * @param {CandidateSortState} state
 * @returns {PresetId|null}
 */
export function presetIdOf(state) {
  return state && 'preset' in state ? state.preset : null;
}

/**
 * Narrow ANY value — a fresh selection, a legacy string, a parsed JSON blob —
 * to a usable state. This one function sits on BOTH the restore and the change
 * path (the UI-raqh rule, kept), so a value the editor can produce and a value
 * storage can return are judged identically:
 *
 * - a legacy string (`spec`/`created`/`updated`) → the same-id preset;
 *   `board` (retired, §2.1) and anything unknown → the default preset;
 * - a chain with an unknown key or direction in ANY step → the default preset,
 *   never a partially-honoured chain;
 * - a chain repeating a key → the LATER step is dropped, matching what the
 *   editor does when the same key is picked twice (§4.4);
 * - a chain equal to a preset step-for-step → `{ preset }` (§4.3).
 *
 * @param {unknown} raw
 * @returns {CandidateSortState}
 */
export function normalizeCandidateSort(raw) {
  if (typeof raw === 'string') {
    /** @type {unknown} */
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return isPresetId(raw)
        ? { preset: raw }
        : /** @type {CandidateSortState} */ (CANDIDATE_SORT_DEFAULT);
    }
    return normalizeCandidateSort(parsed);
  }
  if (!raw || typeof raw !== 'object') {
    return /** @type {CandidateSortState} */ (CANDIDATE_SORT_DEFAULT);
  }
  const candidate = /** @type {Record<string, unknown>} */ (raw);
  if (isPresetId(candidate.preset)) {
    return { preset: candidate.preset };
  }
  const steps = candidate.chain;
  if (
    !Array.isArray(steps) ||
    steps.length === 0 ||
    steps.length > CHAIN_MAX_STEPS ||
    !steps.every(isSortStep)
  ) {
    return /** @type {CandidateSortState} */ (CANDIDATE_SORT_DEFAULT);
  }
  /** @type {SortStep[]} */
  const chain = [];
  for (const step of steps) {
    if (!chain.some((kept) => kept.key === step.key)) {
      chain.push({ key: step.key, dir: step.dir });
    }
  }
  const matched = CANDIDATE_SORT_PRESETS.find((preset) =>
    sameChain(preset.chain, chain)
  );
  return matched ? { preset: matched.id } : { chain };
}

/**
 * Read the persisted state; anything unreadable falls back to the default
 * rather than throwing (same defence as the display filter).
 *
 * @returns {CandidateSortState}
 */
export function loadCandidateSort() {
  try {
    return normalizeCandidateSort(
      window.localStorage.getItem(CANDIDATE_SORT_KEY)
    );
  } catch {
    return /** @type {CandidateSortState} */ (CANDIDATE_SORT_DEFAULT);
  }
}

/**
 * @param {CandidateSortState} state
 */
export function saveCandidateSort(state) {
  try {
    window.localStorage.setItem(CANDIDATE_SORT_KEY, JSON.stringify(state));
  } catch {
    /* ignore — a private-mode storage denial must not break the select */
  }
}

/**
 * Set (or clear) one step's key in an edited chain (§4.4). An empty key TRUNCATES
 * the chain there — a `없음` in the middle would leave a hole the chain model has
 * no room for. Picking a key an EARLIER step already carries collapses this step
 * instead (the later one loses), and a key a LATER step carries is dropped from
 * that later step, so a chain never sorts by the same key twice.
 *
 * @param {SortStep[]} chain
 * @param {number} index
 * @param {string} key
 * @returns {SortStep[]}
 */
export function setChainStepKey(chain, index, key) {
  const steps = chain.map((step) => ({ ...step }));
  if (!key) {
    return steps.slice(0, index);
  }
  if (!Object.prototype.hasOwnProperty.call(SORT_KEY_DEFAULT_DIR, key)) {
    return steps;
  }
  const sort_key = /** @type {SortKey} */ (key);
  if (steps.slice(0, index).some((step) => step.key === sort_key)) {
    return steps.slice(0, index);
  }
  const next = {
    key: sort_key,
    dir:
      steps[index] && steps[index].key === sort_key
        ? steps[index].dir
        : SORT_KEY_DEFAULT_DIR[sort_key]
  };
  const head = steps.slice(0, index);
  const tail = steps.slice(index + 1).filter((step) => step.key !== sort_key);
  return [...head, next, ...tail].slice(0, CHAIN_MAX_STEPS);
}

/**
 * Flip one step's direction (§4.4). An index outside the chain leaves it alone.
 *
 * @param {SortStep[]} chain
 * @param {number} index
 * @returns {SortStep[]}
 */
export function flipChainStepDir(chain, index) {
  return chain.map((step, i) =>
    i === index
      ? { key: step.key, dir: step.dir === 'asc' ? 'desc' : 'asc' }
      : { ...step }
  );
}

/**
 * Re-place a chain-sorted list so a dependent sits right behind its blocker
 * (UI-q1y7 §3). Depth-first: one strand is followed to its end before the next
 * branch starts, so `A→B`, `A→D`, `B→C` reads `A, B, C, D`.
 *
 * A blocker keeps the seat the chain gave it and the dependent is pulled to it,
 * never the other way round. Only blockers PRESENT in the list move anything —
 * a blocker already queued, closed, or filtered out drops from the intersection
 * and its dependent stays at its chain seat. When the remaining rows all wait on
 * each other (a cycle), the first remaining row is placed anyway (fail-quiet):
 * the order loses meaning there, but the list is never truncated.
 *
 * @param {any[]} base
 * @returns {any[]}
 */
function groupByDependency(base) {
  const in_lane = new Set(base.map((item) => item.id));
  /** @type {Map<string, string[]>} */
  const preds_of = new Map();
  /** @type {Map<string, any[]>} */
  const dependents_of = new Map();
  for (const item of base) {
    const preds = blockerIdsOf(item).filter((id) => in_lane.has(id));
    preds_of.set(item.id, preds);
    for (const id of preds) {
      const list = dependents_of.get(id);
      if (list) {
        list.push(item);
      } else {
        dependents_of.set(id, [item]);
      }
    }
  }

  /** @type {Set<string>} */
  const placed = new Set();
  /** @type {any[]} */
  const out = [];

  /**
   * @param {any} item
   * @returns {void}
   */
  const place = (item) => {
    placed.add(item.id);
    out.push(item);
    for (const next of dependents_of.get(item.id) ?? []) {
      if (
        !placed.has(next.id) &&
        (preds_of.get(next.id) ?? []).every((id) => placed.has(id))
      ) {
        place(next);
      }
    }
  };

  while (out.length < base.length) {
    const ready = base.find(
      (item) =>
        !placed.has(item.id) &&
        (preds_of.get(item.id) ?? []).every((id) => placed.has(id))
    );
    place(ready ?? base.find((item) => !placed.has(item.id)));
  }

  return out;
}

/**
 * Order the merged candidate list (§4.1, UI-q1y7 §2).
 *
 * The chain decides the seats, then ONE dependency-adjacency pass pulls each
 * dependent behind its blocker. A blocked issue is still NOT sunk to the bottom:
 * the `⛓ blocked` chip already says it cannot start, and placement eligibility
 * is carried by `queue_placeable` plus the server admission guard, so the order
 * does not have to carry that fact a second time. What moves a row is only the
 * fact that its blocker is on the SAME lane.
 *
 * Returns a NEW array; the caller's list is left alone.
 *
 * @param {any[]} issues
 * @param {CandidateSortState} state
 * @returns {any[]}
 */
export function applyCandidateSort(issues, state) {
  const base = Array.isArray(issues) ? issues.slice() : [];
  base.sort(cmpChain(chainOf(state)));
  return groupByDependency(base);
}
