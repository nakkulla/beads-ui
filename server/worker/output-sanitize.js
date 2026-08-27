/**
 * Credential redaction for anything read out of a run log.
 *
 * Extracted from the retired repair-session adapter (UI-s582 §1) with its
 * behaviour byte-identical: the patterns, the replacement token, and the
 * empty-string fallback are exactly what the adapter applied, because the
 * surviving caller is the operation-card projection that must keep redacting
 * the same shapes it always did.
 */

/**
 * Patterns whose MATCHED TEXT must never reach a projection or the durable
 * record. Credential shapes only — never the surrounding log line, which is
 * the diagnostic the reader needs.
 *
 * @type {RegExp[]}
 */
const SECRET_PATTERNS = [
  /gh[pousr]_[A-Za-z0-9]{16,}/g,
  /github_pat_[A-Za-z0-9_]{20,}/g,
  /\bAKIA[0-9A-Z]{16}\b/g,
  /\bBearer\s+[A-Za-z0-9._~+/-]{12,}=*/gi,
  /-----BEGIN[^-]*PRIVATE KEY-----[\s\S]*?-----END[^-]*PRIVATE KEY-----/g,
  /\b(?:pass(?:word)?|secret|token|api[_-]?key)\s*[:=]\s*\S+/gi
];

const REDACTED = '[redacted]';

/**
 * Remove credential-shaped substrings. Called on everything that leaves a log
 * file.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function sanitizeOutput(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return '';
  }
  let text = value;
  for (const pattern of SECRET_PATTERNS) {
    text = text.replace(pattern, REDACTED);
  }
  return text;
}
