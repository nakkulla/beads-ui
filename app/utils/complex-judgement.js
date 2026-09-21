/**
 * The workflow contract's 복잡 판정, read from label `complex` + metadata
 * `complex_reason` (UI-7nhi §1).
 *
 * dotfiles owns the vocabulary; beads-ui is a CONSUMER (AGENTS.md), so an
 * unreadable attachment is an absent judgement (`''`), never a throw. The
 * judgement names no model and no runtime: those belong to the pin editor.
 */
import { workerLabels } from './worker-eligibility.js';

/** The label carrying the 복잡 판정. */
export const COMPLEX_LABEL = 'complex';

/**
 * `complex_reason` signal vocabulary. A token outside it is dropped rather than
 * displayed: a tooltip naming a signal this UI cannot explain is worse than one
 * omitting it.
 *
 * @type {ReadonlyArray<string>}
 */
export const COMPLEX_REASONS = [
  'hard_diagnosis',
  'invariant_reasoning',
  'verification_by_judgment'
];

/** The single chip this module drives. */
export const COMPLEX_CHIP_LABEL = '복잡';

/**
 * One display sentence per `complex_reason` signal (UI-8x90 §4.6). The tooltip
 * and the 사유 팝업 read the same map so one judgement never reads two ways.
 * Signal MEANING is owned by the dotfiles contract; only the wording is decided
 * here, and it still never names a model or a runtime.
 *
 * @type {Record<string, string>}
 */
export const COMPLEX_REASON_TEXT = {
  hard_diagnosis:
    '원인이 불명확하거나 재현이 불안정해 가설-검증 루프가 필요하다',
  invariant_reasoning: '정합성이 상태기계·동시성·불변식 추론에 달려 있다',
  verification_by_judgment:
    '테스트가 못 잡고 리뷰어의 추론으로만 검증할 수 있다'
};

/**
 * The contract signals of one bead's 복잡 판정 joined by `+`, or `''` when there
 * is none to draw (UI-7nhi §1).
 *
 * Label and reason are read TOGETHER because the contract makes either half
 * alone meaningless, exactly like `session-preferred.js`: a label with no enum
 * signal is an invalid attachment, and a signal with no label is not an
 * attachment at all. Neither is an error, so nothing throws here.
 *
 * @param {unknown} labels
 * @param {unknown} metadata
 * @returns {string}
 */
export function complexReason(labels, metadata) {
  if (!workerLabels(labels).includes(COMPLEX_LABEL)) {
    return '';
  }
  if (typeof metadata !== 'object' || metadata === null) {
    return '';
  }
  const raw = /** @type {any} */ (metadata).complex_reason;
  if (typeof raw !== 'string') {
    return '';
  }
  /** @type {string[]} */
  const signals = [];
  for (const token of raw.split('+')) {
    const signal = token.trim();
    if (COMPLEX_REASONS.includes(signal) && !signals.includes(signal)) {
      signals.push(signal);
    }
  }
  return signals.join('+');
}

/**
 * The 사유 sentences of one judgement, in metadata order (UI-8x90 §4.6). An
 * unknown signal never reaches here — {@link complexReason} already dropped it.
 *
 * @param {unknown} reason
 * @returns {string[]}
 */
export function complexReasonSentences(reason) {
  if (typeof reason !== 'string' || reason.length === 0) {
    return [];
  }
  return reason
    .split('+')
    .map((signal) => COMPLEX_REASON_TEXT[signal.trim()] || '')
    .filter((text) => text.length > 0);
}

/**
 * The chip's `title`, shared by every card and the issue detail so one judgement
 * reads the same everywhere. No 상태 line: 적용 is a manual preset choice, so
 * there is no authority key to compare against (UI-7nhi §결정).
 *
 * @param {unknown} reason
 * @returns {string}
 */
export function complexTooltip(reason) {
  if (typeof reason !== 'string' || reason.length === 0) {
    return '';
  }
  const sentences = complexReasonSentences(reason);
  /** @type {string[]} */
  const lines = ['복잡한 작업으로 판정됨'];
  if (sentences.length > 0) {
    lines.push(`사유: ${sentences.join(' · ')}`);
  }
  return lines.join('\n');
}
