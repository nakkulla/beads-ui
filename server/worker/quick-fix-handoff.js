import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDescriptionScope } from './artifact-scope.js';

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
    isNonEmptyString(receipt.format_regex)
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
 * Judge one issue against the pinned predicates. `null`이면 판정 대상이
 * 아니고(route가 quick_fix가 아님), `state: 'unknown'`이면 투영을 못 읽어
 * 판정 자체가 불가하다.
 *
 * @param {unknown} issue
 * @param {{ fs?: QuickFixHandoffFs }} [deps]
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
    const sections = findSections(
      text,
      required,
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
