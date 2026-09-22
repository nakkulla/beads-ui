import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDescriptionScope } from './artifact-scope.js';

/**
 * false: this file reads a subset of the pinned `quick_fix_handoff` canon.
 * The following projection keys ship as bytes but have no reader here — no
 * reader exists means the key is inactive, not that it was overlooked:
 *
 * - `quick_fix_handoff.automatic_queue_handoff` — a session-side procedure;
 *   this repository only receives its result (queue placement) via the
 *   existing place API.
 * - `quick_fix_handoff.session_owned_pin` — no reader.
 * - `description_scope.writer` — `parseDescriptionScope` reads only the
 *   `section`/`item` rules.
 * - `metadata.parent_keys.worker_created_from` — already consumed as a code
 *   registry elsewhere (ADR 0012 style), not through this projection.
 * - `process_routes.quick_fix.worker_dispatch` — the behavior is already a
 *   fixed code path (ADR 0019/0031/0050).
 * - `manual_merge_continuation.auto_review_dispatch` — ADR 0019.
 *
 * `checks.user_decision_reserved.details_key` is also unread: this module
 * never emits per-line detail objects, only the `missing` token.
 *
 * Regex translation for `checks.user_decision_reserved.line_regex`: each
 * pattern is compiled with the `u` flag so counted quantifiers advance by
 * Unicode code point like Python `re`, not UTF-16 code unit. A pattern
 * beginning with the Python-only inline flag `(?i)` has that four-character
 * prefix stripped and is compiled with `'iu'` instead — this is the only
 * inline flag translated; any other inline flag makes `new RegExp` throw,
 * which callers treat as `supported: false` (fail-quiet, not a rewrite).
 */

const CONTRACTS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'generated',
  'contracts'
);

export const QUICK_FIX_HANDOFF_PATH = path.join(
  CONTRACTS_DIR,
  'quick-fix-handoff.json'
);

export const QUICK_FIX_HANDOFF_PROVENANCE_PATH = path.join(
  CONTRACTS_DIR,
  'quick-fix-handoff.provenance.json'
);

/**
 * `## ` on a trimmed line closes a section (any h2); `###` and deeper stay body.
 */
const H2_PREFIX = '## ';

/**
 * Contract line boundaries: `\r\n` and `\n` only. U+2028, U+0085 and U+000B are
 * body characters, so nothing here may lean on `\s` or a multiline `.`.
 */
const LINE_BOUNDARY_RE = /\r\n|\n/;

/** Contract trim: ASCII space and tab only. `String.trim()` also eats NBSP. */
const TRIM_RE = /^[ \t]+|[ \t]+$/g;

const REGEX_METACHARS_RE = /[.*+?^${}()|[\]\\]/g;

/** @typedef {{ readFileSync: (path: string, encoding?: string) => Buffer|string }} QuickFixHandoffFs */
/**
 * @typedef {Object} PredecessorResolver
 * @property {(bead_id: string) => string[]|null} blocksOf IDs this Bead
 * depends on with `blocks` (its own predecessors). false: a snapshot-unresolved
 * ID returns null, never an empty array by omission.
 */
/**
 * @typedef {Object} QuickFixHandoffLoad
 * @property {number|null} schema_version
 * @property {boolean} supported
 * @property {string|null} source_commit
 * @property {Record<string, any>|null} rules
 */
/**
 * @typedef {Object} QuickFixHandoffState
 * @property {'reviewed'|'stale'|'unreviewed'|'unknown'} state
 * @property {string[]} missing
 * @property {string|null} digest
 */

/** @type {QuickFixHandoffLoad|null} */
let cached = null;

/**
 * @param {Record<string, any>} [facts]
 * @returns {QuickFixHandoffLoad}
 */
function unsupported(facts = {}) {
  return {
    schema_version: null,
    supported: false,
    source_commit: null,
    rules: null,
    ...facts
  };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

/**
 * The Git blob object name of these exact bytes. Recomputing it is what proves
 * the provenance names THIS artifact and not another revision of it — the byte
 * count and SHA-256 alone would still accept a provenance file copied from a
 * different pin.
 *
 * @param {Buffer} bytes
 * @returns {string}
 */
function gitBlobSha(bytes) {
  return nodeCrypto
    .createHash('sha1')
    .update(Buffer.from(`blob ${bytes.length}\0`, 'utf8'))
    .update(bytes)
    .digest('hex');
}

/**
 * @param {unknown} provenance
 * @param {Buffer} bytes
 * @param {string} digest
 * @returns {boolean}
 */
function provenanceMatches(provenance, bytes, digest) {
  return (
    isRecord(provenance) &&
    isNonEmptyString(provenance.source_repo) &&
    isNonEmptyString(provenance.source_path) &&
    isNonEmptyString(provenance.source_commit) &&
    provenance.bytes === bytes.length &&
    provenance.sha256 === digest &&
    provenance.source_blob_sha === gitBlobSha(bytes)
  );
}

/**
 * Translate a Python `re` pattern from `checks.user_decision_reserved` into a
 * Node `RegExp`. Only the head `(?i)` prefix is understood (rest); any other
 * inline flag is left for `new RegExp` to reject, which the callers treat as
 * unsupported. false: the case-insensitive projection pattern needs this.
 *
 * @param {string} pattern
 * @returns {RegExp}
 */
function compileReservationRegex(pattern) {
  if (pattern.startsWith('(?i)')) {
    return new RegExp(pattern.slice(4), 'iu');
  }
  return new RegExp(pattern, 'u');
}

/**
 * @param {unknown} rule
 * @returns {boolean}
 */
function predecessorEdgeUsable(rule) {
  if (rule === undefined) {
    return true;
  }
  if (!isRecord(rule)) {
    return false;
  }
  const required_edge = rule.required_edge;
  const reversed_edge = rule.reversed_edge;
  const missing_tokens = rule.missing_tokens;
  return (
    Array.isArray(rule.sections) &&
    rule.sections.length > 0 &&
    rule.sections.every((name) => isNonEmptyString(name)) &&
    isNonEmptyString(rule.line_trigger) &&
    isNonEmptyString(rule.id_regex) &&
    (rule.excludes === undefined || rule.excludes === 'self_id') &&
    rule.absent_mention === 'skip_fail_quiet' &&
    rule.unresolved_candidate === 'skip_fail_quiet' &&
    isRecord(required_edge) &&
    required_edge.dependency_type === 'blocks' &&
    required_edge.side === 'issue_dependencies' &&
    isRecord(reversed_edge) &&
    reversed_edge.side === 'predecessor_dependencies_contain_issue' &&
    isRecord(missing_tokens) &&
    isNonEmptyString(missing_tokens.missing) &&
    isNonEmptyString(missing_tokens.reversed)
  );
}

/**
 * @param {unknown} rule
 * @returns {boolean}
 */
function userDecisionReservedUsable(rule) {
  if (rule === undefined) {
    return true;
  }
  if (!isRecord(rule)) {
    return false;
  }
  if (rule.scan !== 'all_body_lines_trimmed') {
    return false;
  }
  if (!Array.isArray(rule.line_regex) || rule.line_regex.length === 0) {
    return false;
  }
  if (rule.absent_match !== 'skip_fail_quiet') {
    return false;
  }
  if (
    !isNonEmptyString(rule.missing_token) ||
    !rule.missing_token.includes('<n>')
  ) {
    return false;
  }
  return rule.line_regex.every((/** @type {unknown} */ pattern) => {
    if (!isNonEmptyString(pattern)) {
      return false;
    }
    try {
      compileReservationRegex(pattern);
      return true;
    } catch {
      return false;
    }
  });
}

/**
 * Every predicate the judgment reads must be present as the type it will be
 * used as, because a half-projection would otherwise reach `new RegExp` and
 * turn a contract drift into a wrong answer instead of a quiet `unknown`.
 *
 * @param {unknown} handoff
 * @param {unknown} description_scope
 * @returns {boolean}
 */
function rulesUsable(handoff, description_scope) {
  if (!isRecord(handoff) || !isRecord(description_scope)) {
    return false;
  }
  const checks = handoff.checks;
  const receipt = handoff.receipt;
  if (!isRecord(checks) || !isRecord(receipt)) {
    return false;
  }
  const sections = checks.sections;
  const scope = checks.scope;
  const baseline_red = checks.baseline_red;
  return (
    isRecord(sections) &&
    Array.isArray(sections.required) &&
    sections.required.every((name) => isNonEmptyString(name)) &&
    isNonEmptyString(sections.heading_regex) &&
    isNonEmptyString(sections.label_regex) &&
    isRecord(scope) &&
    isNonEmptyString(scope.required_state) &&
    isRecord(baseline_red) &&
    isNonEmptyString(baseline_red.section) &&
    isNonEmptyString(baseline_red.line_regex) &&
    isNonEmptyString(receipt.key) &&
    isNonEmptyString(receipt.format_regex) &&
    predecessorEdgeUsable(checks.predecessor_edge) &&
    userDecisionReservedUsable(checks.user_decision_reserved)
  );
}

/**
 * Read the pinned projection once per process. Injected filesystems bypass
 * cache so tests can exercise each failure independently.
 *
 * @param {{ fs?: QuickFixHandoffFs }} [deps]
 * @returns {QuickFixHandoffLoad}
 */
export function loadQuickFixHandoff(deps = {}) {
  if (cached && !deps.fs) {
    return cached;
  }
  const fs = deps.fs || nodeFs;
  /** @type {QuickFixHandoffLoad} */
  let loaded;
  try {
    const raw = fs.readFileSync(QUICK_FIX_HANDOFF_PATH);
    const bytes = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
    const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');
    const provenance = JSON.parse(
      String(fs.readFileSync(QUICK_FIX_HANDOFF_PROVENANCE_PATH, 'utf8'))
    );
    const artifact = JSON.parse(bytes.toString('utf8'));
    const schema_version = isRecord(artifact) ? artifact.schema_version : null;
    const source_commit = isRecord(provenance)
      ? provenance.source_commit
      : null;
    const valid =
      isRecord(artifact) &&
      schema_version === 1 &&
      rulesUsable(artifact.quick_fix_handoff, artifact.description_scope) &&
      provenanceMatches(provenance, bytes, digest);
    loaded = valid
      ? {
          schema_version,
          supported: true,
          source_commit,
          rules: {
            quick_fix_handoff: artifact.quick_fix_handoff,
            description_scope: artifact.description_scope
          }
        }
      : unsupported({
          schema_version:
            typeof schema_version === 'number' ? schema_version : null,
          source_commit:
            typeof source_commit === 'string' ? source_commit : null
        });
  } catch {
    loaded = unsupported();
  }
  if (!deps.fs) {
    cached = loaded;
  }
  return loaded;
}

/**
 * @param {string} text
 * @returns {string[]}
 */
function splitLines(text) {
  return text.split(LINE_BOUNDARY_RE);
}

/**
 * @param {string} line
 * @returns {string}
 */
function trimAscii(line) {
  return line.replace(TRIM_RE, '');
}

/**
 * The projection ships `<name>` templates, so the required name is spliced in
 * escaped. Every template is `^`-anchored, which is what makes `test()` the
 * same judgment as the checker's `re.match`.
 *
 * @param {string} template
 * @param {string} name
 * @returns {RegExp}
 */
function namedRegex(template, name) {
  return new RegExp(
    template.replace('<name>', name.replace(REGEX_METACHARS_RE, '\\$&'))
  );
}

/**
 * Map each required name to its section lines, heading line included.
 *
 * @param {string} text
 * @param {string[]} required
 * @param {string} heading_template
 * @param {string} label_template
 * @returns {Map<string, string[]>}
 */
function findSections(text, required, heading_template, label_template) {
  /** @type {Map<string, RegExp>} */
  const headings = new Map();
  /** @type {Map<string, RegExp>} */
  const labels = new Map();
  for (const name of required) {
    headings.set(name, namedRegex(heading_template, name));
    labels.set(name, namedRegex(label_template, name));
  }
  const lines = splitLines(text);
  const trimmed = lines.map(trimAscii);

  /** @type {Map<string, number>} */
  const starts = new Map();
  for (let index = 0; index < trimmed.length; index += 1) {
    const candidate = trimmed[index];
    for (const name of required) {
      if (starts.has(name)) {
        continue;
      }
      const heading = headings.get(name);
      const label = labels.get(name);
      if (
        (heading && heading.test(candidate)) ||
        (label && label.test(candidate))
      ) {
        // 한 줄이 이름 하나를 열면 그 줄에 대한 나머지 이름 검사는 멈춘다.
        starts.set(name, index);
        break;
      }
    }
  }

  /** @type {Map<string, string[]>} */
  const sections = new Map();
  for (const [name, start] of starts) {
    let end = start + 1;
    while (end < lines.length) {
      const candidate = trimmed[end];
      if (candidate.startsWith(H2_PREFIX)) {
        break;
      }
      let is_label = false;
      for (const pattern of labels.values()) {
        if (pattern.test(candidate)) {
          is_label = true;
          break;
        }
      }
      if (is_label) {
        break;
      }
      end += 1;
    }
    sections.set(name, lines.slice(start, end));
  }
  return sections;
}

/**
 * The `## scope` declaration state, read through the one scope parser this
 * repository has (설계 §3.2) rather than a second one.
 *
 * @param {unknown} description
 * @returns {'undeclared'|'empty_declaration'|'declared_scope'}
 */
function descriptionScopeState(description) {
  const items = parseDescriptionScope(description);
  if (items === null) {
    return 'undeclared';
  }
  return items.length === 0 ? 'empty_declaration' : 'declared_scope';
}

/**
 * SHA-256 of the description string's UTF-8 bytes, first 12 hex. No trimming, no
 * newline normalization, no NFC. A non-string description has no digest at all.
 *
 * @param {unknown} description
 * @returns {string|null}
 */
function bodyDigest(description) {
  if (typeof description !== 'string') {
    return null;
  }
  return nodeCrypto
    .createHash('sha256')
    .update(Buffer.from(description, 'utf8'))
    .digest('hex')
    .slice(0, 12);
}

/**
 * @param {Record<string, any>} issue
 * @returns {unknown}
 */
function issueType(issue) {
  return Object.hasOwn(issue, 'issue_type') ? issue.issue_type : issue.type;
}

/**
 * Bead IDs the `line_trigger` line declares as predecessors, in first-seen
 * mention order with the issue's own id excluded when `excludes` says so.
 *
 * @param {Map<string, string[]>} sections
 * @param {Record<string, any>} rule
 * @param {unknown} self_id
 * @returns {string[]}
 */
function predecessorMentions(sections, rule, self_id) {
  const trigger = rule.line_trigger;
  const id_re = new RegExp(rule.id_regex, 'g');
  const excludes_self = rule.excludes === 'self_id';

  /** @type {string[]} */
  const found = [];
  for (const name of rule.sections) {
    for (const line of sections.get(name) || []) {
      if (trigger && !line.includes(trigger)) {
        continue;
      }
      for (const match of line.matchAll(id_re)) {
        const candidate = match[0];
        if (excludes_self && candidate === self_id) {
          continue;
        }
        if (!found.includes(candidate)) {
          found.push(candidate);
        }
      }
    }
  }
  return found;
}

/**
 * `missing` tokens for every declared predecessor whose edge is wrong. A
 * declared ID the resolver cannot place is skipped fail-quiet — the id
 * regex also matches ordinary hyphenated words.
 *
 * @param {Record<string, any>} issue
 * @param {Map<string, string[]>} sections
 * @param {Record<string, any>|undefined} rule
 * @param {PredecessorResolver|null|undefined} resolver
 * @returns {string[]}
 */
function predecessorState(issue, sections, rule, resolver) {
  if (!rule || !resolver) {
    return [];
  }
  const self_id = issue.id;
  const mentions = predecessorMentions(sections, rule, self_id);
  if (mentions.length === 0) {
    return [];
  }
  const declared =
    typeof self_id === 'string' ? resolver.blocksOf(self_id) : null;
  const missing_token = rule.missing_tokens.missing;
  const reversed_token = rule.missing_tokens.reversed;

  /** @type {string[]} */
  const failures = [];
  for (const candidate of mentions) {
    if (declared && declared.includes(candidate)) {
      continue;
    }
    const other = resolver.blocksOf(candidate);
    if (other === null) {
      continue;
    }
    const template =
      typeof self_id === 'string' && other.includes(self_id)
        ? reversed_token
        : missing_token;
    failures.push(template.replace('<id>', candidate));
  }
  return failures;
}

/**
 * `user_decision_reserved:L<n>` tokens for every trimmed body line matching
 * one of the pinned reservation regexes, resolver-independent (§4.4).
 *
 * @param {string} text
 * @param {Record<string, any>|undefined} rule
 * @returns {string[]}
 */
function reservationTokens(text, rule) {
  if (!rule) {
    return [];
  }
  const patterns = rule.line_regex.map((/** @type {string} */ pattern) =>
    compileReservationRegex(pattern)
  );
  /** @type {string[]} */
  const tokens = [];
  const lines = splitLines(text);
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = trimAscii(lines[index]);
    if (
      patterns.some((/** @type {RegExp} */ pattern) => pattern.test(trimmed))
    ) {
      tokens.push(rule.missing_token.replace('<n>', String(index + 1)));
    }
  }
  return tokens;
}

/**
 * Judge one issue against the pinned predicates. `null`이면 판정 대상이
 * 아니고(route가 quick_fix가 아님), `state: 'unknown'`이면 투영을 못 읽어
 * 판정 자체가 불가하다.
 *
 * @param {unknown} issue
 * @param {{ fs?: QuickFixHandoffFs, predecessors?: PredecessorResolver|null }} [deps]
 * @returns {QuickFixHandoffState|null}
 */
export function judgeQuickFixHandoff(issue, deps = {}) {
  const record = isRecord(issue) ? issue : {};
  const metadata = isRecord(record.metadata) ? record.metadata : {};
  if (metadata.route !== 'quick_fix') {
    return null;
  }
  const loaded = loadQuickFixHandoff(deps);
  if (!loaded.supported || !loaded.rules) {
    return { state: 'unknown', missing: [], digest: null };
  }
  try {
    const handoff = loaded.rules.quick_fix_handoff;
    const checks = handoff.checks;
    const receipt_rules = handoff.receipt;
    const description = record.description;
    const text = typeof description === 'string' ? description : '';

    /** @type {string[]} */
    const required = checks.sections.required;
    const predecessor_rule = checks.predecessor_edge;
    const named = required.concat(
      (predecessor_rule?.sections || []).filter(
        (/** @type {string} */ name) => !required.includes(name)
      )
    );
    const sections = findSections(
      text,
      named,
      checks.sections.heading_regex,
      checks.sections.label_regex
    );

    /** @type {string[]} */
    const missing = [];
    for (const name of required) {
      if (!sections.has(name)) {
        missing.push(`section:${name}`);
      }
    }

    const scope_state = descriptionScopeState(description);
    if (scope_state !== checks.scope.required_state) {
      missing.push(`scope:${scope_state}`);
    }

    if (
      checks.baseline_red.required_when === 'issue_type_bug' &&
      issueType(record) === 'bug'
    ) {
      const section_lines = sections.get(checks.baseline_red.section) || [];
      const line_re = new RegExp(checks.baseline_red.line_regex);
      if (!section_lines.some((line) => line_re.test(line))) {
        missing.push('baseline_red');
      }
    }

    missing.push(
      ...predecessorState(record, sections, predecessor_rule, deps.predecessors)
    );
    missing.push(...reservationTokens(text, checks.user_decision_reserved));

    const digest = bodyDigest(description);
    const receipt = metadata[receipt_rules.key];
    /** @type {'reviewed'|'stale'|'unreviewed'} */
    let state;
    if (typeof receipt !== 'string' || receipt.length === 0) {
      state = 'unreviewed';
    } else if (!new RegExp(receipt_rules.format_regex).test(receipt)) {
      state = 'unreviewed';
    } else if (digest === null) {
      state = 'unreviewed';
    } else if (receipt.slice(receipt.lastIndexOf('@') + 1) === digest) {
      state = 'reviewed';
    } else {
      state = 'stale';
    }

    return { state, missing, digest };
  } catch {
    return { state: 'unknown', missing: [], digest: null };
  }
}
