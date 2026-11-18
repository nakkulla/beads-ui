/**
 * The session-lane Codex startup-screen wait vocabulary (UI-ahzh §3.3): the
 * kinds a `startup_wait` record may carry, their display labels, and the one
 * normalizer the queue store, the scheduler and the card read. The hub
 * (`session-hub codex-startup`) owns the classification; this module only
 * names what it answered (ADR UI-jlov).
 */

/**
 * @typedef {'hooks'|'update'|'model'|'login'|'trust'|'unknown'} StartupWaitKind
 */

/**
 * One observed startup-screen wait of a live session-lane Codex window.
 * `since` restarts and `notified_at` clears whenever `fingerprint` changes.
 *
 * @typedef {Object} StartupWait
 * @property {StartupWaitKind} kind
 * @property {string} fingerprint
 * @property {number} since
 * @property {number|null} notified_at
 */

/** @type {Readonly<Record<StartupWaitKind, string>>} */
export const STARTUP_WAIT_LABELS = Object.freeze({
  hooks: '훅 확인',
  update: '업데이트 안내',
  model: '모델 안내',
  login: '로그인',
  trust: '폴더 신뢰',
  unknown: '기타 시작 화면'
});

/**
 * Whether a value names one `StartupWaitKind`.
 *
 * @param {unknown} value
 * @returns {value is StartupWaitKind}
 */
export function isStartupWaitKind(value) {
  return typeof value === 'string' && Object.hasOwn(STARTUP_WAIT_LABELS, value);
}

/**
 * A stored `startup_wait`, or null when it is absent or malformed — a kind
 * outside the list reads as no wait at all.
 *
 * @param {unknown} value
 * @returns {StartupWait|null}
 */
export function normalizeStartupWait(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = /** @type {Record<string, unknown>} */ (value);
  if (
    !isStartupWaitKind(raw.kind) ||
    typeof raw.fingerprint !== 'string' ||
    raw.fingerprint.length === 0 ||
    typeof raw.since !== 'number' ||
    !Number.isFinite(raw.since)
  ) {
    return null;
  }
  return {
    kind: raw.kind,
    fingerprint: raw.fingerprint,
    since: raw.since,
    notified_at:
      typeof raw.notified_at === 'number' && Number.isFinite(raw.notified_at)
        ? raw.notified_at
        : null
  };
}

/**
 * Whether two `startup_wait` values are the same record field for field.
 *
 * @param {StartupWait|null|undefined} a
 * @param {StartupWait|null|undefined} b
 * @returns {boolean}
 */
export function sameStartupWait(a, b) {
  if (!a || !b) {
    return !a && !b;
  }
  return (
    a.kind === b.kind &&
    a.fingerprint === b.fingerprint &&
    a.since === b.since &&
    a.notified_at === b.notified_at
  );
}
