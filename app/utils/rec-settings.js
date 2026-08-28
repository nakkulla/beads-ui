/**
 * The workflow contract's RECOMMENDED execution settings (`rec_*`), read as one
 * 복잡도 판정 (UI-sbum §1).
 *
 * dotfiles records `rec_orchestration_model` / `rec_impl_runtime` / `rec_reason`
 * only when the recommendation DIFFERS from the default, so the mere presence of
 * `rec_orchestration_model` is the judgement "이 작업은 복잡하다". That is why
 * this module answers with one chip's worth of state and never with a model or
 * runtime name: those belong to the pin editor, not to the advisory.
 *
 * Same fail-quiet principle as `session-preferred.js`: malformed input is an
 * absent recommendation (`null` / empty), never a throw — beads-ui is a CONSUMER
 * of that contract (AGENTS.md), so a key it cannot read is simply not displayed.
 */

/**
 * `rec_reason` signal vocabulary. Mirrors `REC_SIGNALS` in
 * `server/worker/exec-enums.js`; both sides assert the equality because the two
 * runtimes share no module.
 *
 * @type {ReadonlyArray<string>}
 */
export const REC_REASONS = [
  'contract_change',
  'multi_repo',
  'open_design_fork',
  'multi_phase',
  'claude_bound'
];

/** The single chip this module drives. */
export const REC_LABEL = '복잡';

/**
 * One display sentence per `rec_reason` signal (UI-8x90 §4.6). The tooltip and
 * the 사유 팝업 read the same map so one judgement never reads two ways. Signal
 * MEANING is owned by the dotfiles rec-exec-settings spec; only the wording is
 * decided here, and it still never names a model or a runtime.
 *
 * @type {Record<string, string>}
 */
export const REC_REASON_TEXT = {
  contract_change: '계약 문서·checker·스킬 사본을 함께 바꿔야 한다',
  multi_repo: '둘 이상의 저장소에 작업 단위가 생긴다',
  open_design_fork: '실행 중에도 이어질 미해결 설계 분기가 있다',
  multi_phase: '여러 Phase 또는 병렬 쓰기 조정이 필요하다',
  claude_bound: 'Claude 세션 자산·의미론에 강하게 묶여 있다'
};

/**
 * The 사유 sentences of one judgement, in metadata order (UI-8x90 §4.6). An
 * unknown signal never reaches here — {@link recReasons} already dropped it.
 *
 * @param {RecSettings|null|undefined} rec
 * @returns {string[]}
 */
export function recReasonSentences(rec) {
  const reasons = rec && Array.isArray(rec.reasons) ? rec.reasons : [];
  return reasons
    .map((reason) => REC_REASON_TEXT[reason] || '')
    .filter((text) => text.length > 0);
}

/**
 * Recommended value vocabulary per authority key. A value outside it is read as
 * absent, exactly like an out-of-enum `session_preferred_reason`.
 *
 * @type {Record<string, ReadonlyArray<string>>}
 */
const REC_ENUMS = {
  orchestration_model: ['fable'],
  impl_runtime: ['claude']
};

/**
 * `state` → the word the tooltip and the 사유 팝업 use for it (UI-8x90 §4.5).
 *
 * @type {Record<string, string>}
 */
export const REC_STATE_TEXT = {
  unapplied: '미적용',
  applied: '적용됨',
  diverged: '추천과 다름'
};

/**
 * @typedef {Object} RecSettings
 * @property {string[]} reasons - `rec_reason` signals inside the enum, in the
 * order the metadata wrote them. Empty when the key is absent or carries only
 * unknown tokens — the chip still renders, because the recommendation itself is
 * what the model key states.
 * @property {{ orchestration_model: string, impl_runtime?: string }} rec - The
 * recommended values keyed by their AUTHORITY key name, so applying one is a
 * copy rather than a translation.
 * @property {'unapplied'|'applied'|'diverged'} state - How the authority keys
 * currently stand against `rec`.
 */

/**
 * @param {unknown} value
 * @returns {Record<string, unknown>|null}
 */
function recordOf(value) {
  return typeof value === 'object' && value !== null
    ? /** @type {Record<string, unknown>} */ (value)
    : null;
}

/**
 * One recommended value, or `''` when it is absent or outside the enum.
 *
 * @param {unknown} value
 * @param {ReadonlyArray<string>} allowed
 * @returns {string}
 */
function enumValue(value, allowed) {
  return typeof value === 'string' && allowed.includes(value) ? value : '';
}

/**
 * The `rec_reason` signals inside the contract enum. `<signal>[+<signal>...]`
 * is the contract's own shape; unknown tokens are dropped rather than shown,
 * since a tooltip that names a signal this UI cannot explain is worse than one
 * that omits it.
 *
 * @param {unknown} value
 * @returns {string[]}
 */
export function recReasons(value) {
  if (typeof value !== 'string') {
    return [];
  }
  return value
    .split('+')
    .map((token) => token.trim())
    .filter((token) => REC_REASONS.includes(token));
}

/**
 * The 복잡 판정 for one bead, or `null` when there is none to draw.
 *
 * `authority` is separated from `metadata` because the two travel apart on the
 * monitor wire: the runnable row carries `rec` (recommendations) and `exec_pins`
 * (authority) as two fields. Worker and the issue detail pass the whole metadata
 * bag, where both live together, so the parameter defaults to it.
 *
 * @param {unknown} metadata - The bag holding the `rec_*` keys.
 * @param {unknown} [authority] - The bag holding `orchestration_model` /
 * `impl_runtime`. Defaults to `metadata`.
 * @returns {RecSettings|null}
 */
export function recSettings(metadata, authority = metadata) {
  const meta = recordOf(metadata);
  if (!meta) {
    return null;
  }
  const orchestration_model = enumValue(
    meta.rec_orchestration_model,
    REC_ENUMS.orchestration_model
  );
  // 존재 조건 (§1): `rec_impl_runtime`만 있는 bead는 chip을 얻지 않는다 — 그
  // 추천은 세션 impl-entry 미리보기가 담당한다 (dotfiles 소유).
  if (orchestration_model.length === 0) {
    return null;
  }
  const impl_runtime = enumValue(meta.rec_impl_runtime, REC_ENUMS.impl_runtime);
  /** @type {{ orchestration_model: string, impl_runtime?: string }} */
  const rec = { orchestration_model };
  if (impl_runtime.length > 0) {
    rec.impl_runtime = impl_runtime;
  }
  const auth = recordOf(authority) || {};
  const keys = Object.keys(rec);
  let present = 0;
  let same = 0;
  for (const key of keys) {
    const value = auth[key];
    if (typeof value === 'string' && value.length > 0) {
      present += 1;
      if (value === /** @type {Record<string, string>} */ (rec)[key]) {
        same += 1;
      }
    }
  }
  const state =
    present === 0 ? 'unapplied' : same === keys.length ? 'applied' : 'diverged';
  return { reasons: recReasons(meta.rec_reason), rec, state };
}

/**
 * The chip's `title`, shared by every card and the issue detail so one judgement
 * reads the same everywhere. Never names a model or a runtime (§결정) — the chip
 * says 복잡, and the tooltip says why and whether it is applied.
 *
 * @param {RecSettings|null|undefined} rec
 * @returns {string}
 */
export function recTooltip(rec) {
  if (!rec || typeof rec !== 'object') {
    return '';
  }
  const sentences = recReasonSentences(rec);
  const state_text = REC_STATE_TEXT[rec.state] || '';
  /** @type {string[]} */
  const lines = ['복잡한 작업으로 판정됨'];
  if (sentences.length > 0) {
    lines.push(`사유: ${sentences.join(' · ')}`);
  }
  if (state_text.length > 0) {
    lines.push(`상태: ${state_text}`);
  }
  return lines.join('\n');
}
