/**
 * Parallel-analysis artifact bundle collector (UI-04vo §7, seam F).
 *
 * The collector reads PINNED blobs only (`git cat-file` at the snapshot's base
 * SHA) — never the live worktree — and materializes them into a private
 * temporary directory the tool-free runner streams to the model. Everything
 * that cannot be safely included is left out WITH a reason in the manifest, so
 * a downstream `uncertain` verdict can say what it did not see.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** @type {number} Hard cap on bundled files. */
export const BUNDLE_MAX_FILES = 64;
/** @type {number} Per-file byte cap. */
export const BUNDLE_MAX_FILE_BYTES = 200_000;
/** @type {number} Whole-bundle byte cap. */
export const BUNDLE_MAX_TOTAL_BYTES = 1_500_000;

/**
 * Path segments that read as credential material — excluded outright
 * (UI-04vo §Security boundaries).
 *
 * @type {RegExp}
 */
const CREDENTIAL_PATTERN =
  /(secret|credential|token|password|\.env|auth\.json)/i;

/**
 * Workspace-relative tracked source refs a doc may name. Conservative shape:
 * backtick-quoted, relative, extensioned.
 *
 * @type {RegExp}
 */
const DOC_REF_RE =
  /`([^`\s]+\.(?:js|ts|mjs|cjs|json|md|toml|yaml|yml|sh|py))`/g;

/**
 * Whether a doc-referenced path is safe to even attempt (UI-04vo §7): a
 * relative workspace path with no traversal, no `.git/**`, and no absolute
 * form. Returns the omission reason, or null when safe.
 *
 * @param {string} ref
 * @returns {string|null}
 */
function unsafeReason(ref) {
  if (
    path.isAbsolute(ref) ||
    ref.split('/').includes('..') ||
    ref === '.git' ||
    ref.startsWith('.git/')
  ) {
    return 'unsafe_path';
  }
  if (CREDENTIAL_PATTERN.test(ref)) {
    return 'credential_pattern';
  }
  return null;
}

/**
 * Collect the pinned-blob bundle for one snapshot.
 *
 * @param {{ snapshot: any, gitRun: (args: string[]) => Promise<{ code: number, stdout: string }>, tmp_root?: string }} input
 * @returns {Promise<{ ok: boolean, dir: string, manifest: { base_sha: string, files: Array<{ path: string, kind: 'spec'|'plan'|'source', bytes: number, target_id: string|null }>, omissions: Array<{ path: string, target_id: string|null, reason: string }> }, cleanup: () => void }>}
 */
export async function collectAnalysisBundle(input) {
  const { snapshot, gitRun } = input;
  const base_sha = String(snapshot?.base_sha || '');
  const dir = fs.mkdtempSync(
    path.join(input.tmp_root || os.tmpdir(), 'bdui-analysis-')
  );
  /** @type {{ path: string, kind: 'spec'|'plan'|'source', bytes: number, target_id: string|null }[]} */
  const files = [];
  /** @type {{ path: string, target_id: string|null, reason: string }[]} */
  const omissions = [];
  /** @type {Set<string>} */
  const written = new Set();
  let total_bytes = 0;

  /**
   * Read one pinned blob; null with a reason when it cannot be included.
   *
   * @param {string} blob_path
   */
  async function readBlob(blob_path) {
    const size = await gitRun(['cat-file', '-s', `${base_sha}:${blob_path}`]);
    if (size.code !== 0) {
      return { content: null, reason: 'unreadable' };
    }
    const bytes = Number.parseInt(size.stdout.trim(), 10) || 0;
    if (bytes > BUNDLE_MAX_FILE_BYTES) {
      return { content: null, reason: 'file_size_cap' };
    }
    if (total_bytes + bytes > BUNDLE_MAX_TOTAL_BYTES) {
      return { content: null, reason: 'total_size_cap' };
    }
    const blob = await gitRun(['cat-file', 'blob', `${base_sha}:${blob_path}`]);
    if (blob.code !== 0) {
      return { content: null, reason: 'unreadable' };
    }
    return { content: blob.stdout, reason: null };
  }

  /**
   * Attempt to include one path.
   *
   * @param {string} file_path
   * @param {'spec'|'plan'|'source'} kind
   * @param {string|null} target_id
   * @param {string|null} [missing_reason] - Overrides the generic reason when
   * the blob is unreadable (spec vs plan wording).
   */
  async function include(file_path, kind, target_id, missing_reason = null) {
    if (written.has(file_path)) {
      return true;
    }
    const unsafe = unsafeReason(file_path);
    if (unsafe) {
      omissions.push({ path: file_path, target_id, reason: unsafe });
      return false;
    }
    if (files.length >= BUNDLE_MAX_FILES) {
      omissions.push({ path: file_path, target_id, reason: 'file_cap' });
      return false;
    }
    const read = await readBlob(file_path);
    if (read.content === null) {
      omissions.push({
        path: file_path,
        target_id,
        reason:
          read.reason === 'unreadable' && missing_reason
            ? missing_reason
            : read.reason || 'unreadable'
      });
      return false;
    }
    const abs = path.join(dir, file_path);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, read.content);
    const bytes = Buffer.byteLength(read.content);
    total_bytes += bytes;
    written.add(file_path);
    files.push({ path: file_path, kind, bytes, target_id });
    return true;
  }

  const targets =
    snapshot?.targets && typeof snapshot.targets === 'object'
      ? snapshot.targets
      : {};
  const target_ids = Array.isArray(snapshot?.target_ids)
    ? snapshot.target_ids
    : Object.keys(targets);
  /** @type {string[]} */
  const doc_texts = [];
  for (const target_id of target_ids) {
    const target = targets[target_id];
    if (!target || typeof target.spec_id !== 'string') {
      continue;
    }
    const spec_ok = await include(
      target.spec_id,
      'spec',
      target_id,
      'spec_unreadable'
    );
    if (spec_ok) {
      const spec = await gitRun([
        'cat-file',
        'blob',
        `${base_sha}:${target.spec_id}`
      ]);
      if (spec.code === 0) {
        doc_texts.push(spec.stdout);
      }
    }
    if (typeof target.plan_path === 'string' && target.plan_path) {
      const plan_ok = await include(target.plan_path, 'plan', target_id);
      if (plan_ok) {
        const plan = await gitRun([
          'cat-file',
          'blob',
          `${base_sha}:${target.plan_path}`
        ]);
        if (plan.code === 0) {
          doc_texts.push(plan.stdout);
        }
      }
    }
  }
  // Doc-referenced tracked source refs (UI-04vo §7): only paths the pinned
  // documents themselves name, never a free repository walk.
  /** @type {Set<string>} */
  const refs = new Set();
  for (const text of doc_texts) {
    for (const match of text.matchAll(DOC_REF_RE)) {
      refs.add(match[1]);
    }
  }
  for (const ref of [...refs].sort()) {
    if (written.has(ref)) {
      continue;
    }
    await include(ref, 'source', null);
  }

  let cleaned = false;
  return {
    ok: true,
    dir,
    manifest: { base_sha, files, omissions },
    cleanup() {
      if (cleaned) {
        return;
      }
      cleaned = true;
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch {
        // Best-effort: a leftover temp dir is waste, not a correctness issue.
      }
    }
  };
}
