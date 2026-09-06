/**
 * ADR contract vocabulary registry (spec UI-8uz7 §4, ADR 0012).
 *
 * The checker JSON shapes and `kind` vocabularies are defined by dotfiles
 * (`docs/superpowers/specs/2026-09-02-adr-consistency-system-design.md` §7).
 * beads-ui is a consumer of that contract, so the vocabulary is duplicated here
 * as code constants instead of read from a contract file at runtime. Unknown
 * kinds are never dropped — callers render them under `기타`.
 */
import os from 'node:os';
import path from 'node:path';

/** Required ADR frontmatter keys. */
export const REQUIRED_ADR_KEYS = ['id', 'title', 'status', 'date', 'summary'];

/** Optional ADR frontmatter keys. */
export const OPTIONAL_ADR_KEYS = [
  'supersedes',
  'superseded_by',
  'superseded_by_note',
  'spec',
  'bead'
];

/** Keys whose value must parse as an integer. */
export const INTEGER_ADR_KEYS = ['id', 'superseded_by'];

/** Keys whose value must parse as a list of integers. */
export const INTEGER_LIST_ADR_KEYS = ['supersedes'];

/** ADR status vocabulary. */
export const ADR_STATUS_VALUES = [
  'proposed',
  'accepted',
  'deprecated',
  'superseded'
];

/** Kinds reported by `adr-cite-check.py`. */
export const CITATION_ERROR_KINDS = ['missing', 'retired'];

/** Kinds reported by `check-adr-candidates.py`. */
export const CANDIDATE_ERROR_KINDS = [
  'section_missing',
  'token_missing',
  'adr_missing',
  'adr_status',
  'supersede_unapplied',
  'usage'
];

/** ADR file name pattern: `NNNN-<slug>.md`. */
export const ADR_FILE_NAME_RE = /^(\d{4})-.*\.md$/;

/**
 * Cross-repository citation syntax `ADR <repo>/NNNN`. Same expression the
 * dotfiles cite checker uses; that checker does not verify these, so this tab
 * extracts them itself (spec §5.2 step 5).
 */
export const CROSS_CITATION_RE = /\bADR ([a-z][a-z0-9-]*)\/(\d{4})\b/;

/** ADR directory, relative to a workspace root. */
export const ADR_DIR_REL = 'docs/adr';

/** Spec directory, relative to a workspace root. */
export const SPEC_DIR_REL = 'docs/superpowers/specs';

/**
 * @typedef {Object} CheckerPaths
 * @property {string} index - Path to `adr-index.py`.
 * @property {string} citations - Path to `adr-cite-check.py`.
 * @property {string} candidates - Path to `check-adr-candidates.py`.
 */

/**
 * Default installed checker paths (spec §2). dotfiles installs these on the
 * machine; `repo-ops/script/verify` already calls the first two by these paths.
 *
 * @returns {CheckerPaths}
 */
export function defaultCheckerPaths() {
  const home = os.homedir();
  return {
    index: path.join(home, '.claude/skills/adr/scripts/adr-index.py'),
    citations: path.join(home, '.claude/skills/adr/scripts/adr-cite-check.py'),
    candidates: path.join(
      home,
      '.claude/skills/workflow/scripts/check-adr-candidates.py'
    )
  };
}
