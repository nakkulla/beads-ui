/**
 * Construct the reversible change for a merged Worker implementation.
 *
 * This module deliberately stops before any remote mutation.  Its caller owns
 * verification, commit, push and PR creation; therefore an ambiguous Git
 * history can never result in a remotely visible rollback branch.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** @param {string} value */
function isSha(value) {
  return /^[0-9a-f]{40}$/i.test(value);
}

/**
 * @param {{ code: number, stdout: string, stderr: string }} result
 * @param {string} reason
 */
function commandFailure(result, reason) {
  return result.code === 0 ? null : { ok: false, reason };
}

/**
 * The Git-only preparation seam for an inverse PR. `gitRun` receives argv
 * arrays; no git operation here uses a shell or stdin.
 *
 * @param {{ gitRun: (args: string[], options: { cwd: string }) => Promise<{ code: number, stdout: string, stderr: string }>, tempDir?: () => string, patchId?: (repo: string, patch_path: string) => string }} deps
 */
export function createRevertBuilder(deps) {
  const tempDir =
    deps.tempDir ||
    (() => fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-revert-')));
  const patchId =
    deps.patchId ||
    ((/** @type {string} */ repo, /** @type {string} */ patch_path) =>
      execFileSync('git', ['patch-id', '--stable'], {
        cwd: repo,
        input: fs.readFileSync(patch_path),
        encoding: 'utf8'
      })
        .trim()
        .split(/\s+/)[0]);

  /**
   * @param {string} repo
   * @param {string} from
   * @param {string} to
   * @param {string} patch_path
   */
  async function writePatch(repo, from, to, patch_path) {
    const nonempty = await deps.gitRun(['diff', '--quiet', from, to], {
      cwd: repo
    });
    if (nonempty.code === 0) {
      return { ok: false, reason: 'inverse_empty' };
    }
    if (nonempty.code !== 1) {
      return { ok: false, reason: 'integrated_diff_observe_failed' };
    }
    const raw = await deps.gitRun(['diff', '--raw', from, to], { cwd: repo });
    if (raw.code !== 0) {
      return { ok: false, reason: 'integrated_diff_observe_failed' };
    }
    if (
      /^:[0-7]{6} 160000 /m.test(raw.stdout) ||
      /^:160000 /m.test(raw.stdout)
    ) {
      return { ok: false, reason: 'submodule_inverse_unsupported' };
    }
    const patch = await deps.gitRun(
      ['diff', '--binary', '--full-index', `--output=${patch_path}`, from, to],
      { cwd: repo }
    );
    return (
      commandFailure(patch, 'integrated_diff_write_failed') || { ok: true }
    );
  }

  /**
   * @param {string} repo
   * @param {string} sha
   * @param {string} scratch
   */
  async function patchEvidence(repo, sha, scratch) {
    const patch_path = path.join(scratch, `${sha}.patch`);
    const written = await deps.gitRun(
      [
        'show',
        '--pretty=format:',
        '--binary',
        '--full-index',
        `--output=${patch_path}`,
        sha
      ],
      { cwd: repo }
    );
    if (written.code !== 0) {
      return null;
    }
    try {
      const patch_id = patchId(repo, patch_path);
      if (!/^[0-9a-f]{40}$/i.test(patch_id)) {
        return null;
      }
      const paths = await deps.gitRun(
        ['diff-tree', '--no-commit-id', '--name-only', '-r', sha],
        { cwd: repo }
      );
      if (paths.code !== 0) {
        return null;
      }
      return {
        patch_id,
        paths: paths.stdout.split('\n').filter(Boolean).sort()
      };
    } catch {
      return null;
    }
  }

  /**
   * Prove that GitHub's ordered PR commit list is one linear source range.
   * Squash proof compares this range's complete binary diff with the landed
   * single-parent commit, so matching paths alone can never authorize a revert.
   *
   * @param {string} repo
   * @param {{ head_sha: string, commits: unknown[] }} original
   */
  async function sourceRange(repo, original) {
    const commits = original.commits
      .map((/** @type {unknown} */ commit) =>
        typeof commit === 'object' && commit !== null
          ? /** @type {any} */ (commit).oid
          : null
      )
      .filter((/** @type {unknown} */ oid) => typeof oid === 'string');
    if (
      commits.length === 0 ||
      commits.some((oid) => !isSha(oid)) ||
      commits.at(-1) !== original.head_sha
    ) {
      return null;
    }
    let from = null;
    for (let index = 0; index < commits.length; index += 1) {
      const sha = commits[index];
      const parents = await deps.gitRun(
        ['rev-list', '--parents', '-n', '1', sha],
        { cwd: repo }
      );
      const values = parents.stdout.trim().split(/\s+/);
      if (
        parents.code !== 0 ||
        values.length !== 2 ||
        values[0] !== sha ||
        !isSha(values[1]) ||
        (index > 0 && values[1] !== commits[index - 1])
      ) {
        return null;
      }
      from ??= values[1];
    }
    return from === null ? null : { from, to: original.head_sha };
  }

  /**
   * Write a canonical full-index binary diff for byte-for-byte comparison.
   *
   * @param {string} repo
   * @param {string} from
   * @param {string} to
   * @param {string} output_path
   */
  async function exactPatch(repo, from, to, output_path) {
    const result = await deps.gitRun(
      [
        'diff',
        '--binary',
        '--full-index',
        '--no-ext-diff',
        '--no-textconv',
        `--output=${output_path}`,
        from,
        to
      ],
      { cwd: repo }
    );
    return result.code === 0 ? fs.readFileSync(output_path) : null;
  }

  /**
   * @param {string} repo
   * @param {{ number?: number, head_sha: string }} original
   * @param {string[]} oids
   */
  async function fetchEvidence(repo, original, oids) {
    if (Number.isFinite(original.number)) {
      const pull_ref = `refs/pull/${original.number}/head`;
      const fetched_pull = await deps.gitRun(['fetch', 'origin', pull_ref], {
        cwd: repo
      });
      if (fetched_pull.code === 0) {
        const fetched_head = await deps.gitRun(['rev-parse', 'FETCH_HEAD'], {
          cwd: repo
        });
        if (
          fetched_head.code !== 0 ||
          fetched_head.stdout.trim() !== original.head_sha
        ) {
          return { ok: false, reason: 'pull_ref_head_mismatch' };
        }
      } else {
        // GitHub normally retains refs/pull/<n>/head after branch deletion.
        // The explicitly pinned head SHA is the fallback recovery surface;
        // both its fetch and object type are confirmed before other evidence.
        const fetched_head = await deps.gitRun(
          ['fetch', 'origin', original.head_sha],
          { cwd: repo }
        );
        const observed_head = await deps.gitRun(
          ['cat-file', '-e', `${original.head_sha}^{commit}`],
          { cwd: repo }
        );
        if (fetched_head.code !== 0 || observed_head.code !== 0) {
          return { ok: false, reason: 'pull_ref_head_unavailable' };
        }
      }
    }
    for (const oid of oids) {
      if (!isSha(oid)) {
        return { ok: false, reason: 'source_oid_invalid' };
      }
      let observed = await deps.gitRun(['cat-file', '-e', `${oid}^{commit}`], {
        cwd: repo
      });
      if (observed.code !== 0) {
        const fetched = await deps.gitRun(['fetch', 'origin', oid], {
          cwd: repo
        });
        if (fetched.code !== 0) {
          return { ok: false, reason: 'source_oid_fetch_failed' };
        }
        observed = await deps.gitRun(['cat-file', '-e', `${oid}^{commit}`], {
          cwd: repo
        });
        if (observed.code !== 0) {
          return { ok: false, reason: 'source_oid_unavailable' };
        }
      }
    }
    return { ok: true };
  }

  /**
   * @param {string} repo
   * @param {string} target_sha
   * @param {{ merge_sha: string, head_sha: string, commits: unknown[], files: unknown[] }} original
   * @param {string} scratch
   */
  async function prove(repo, target_sha, original, scratch) {
    if (!isSha(original.merge_sha)) {
      return { ok: false, reason: 'merge_sha_invalid' };
    }
    const parents = await deps.gitRun(
      ['rev-list', '--parents', '-n', '1', original.merge_sha],
      { cwd: repo }
    );
    if (parents.code !== 0) {
      return { ok: false, reason: 'merge_commit_unavailable' };
    }
    const integrated = await deps.gitRun(
      ['merge-base', '--is-ancestor', original.merge_sha, target_sha],
      { cwd: repo }
    );
    if (integrated.code !== 0) {
      return { ok: false, reason: 'merge_not_on_target_base' };
    }
    const parent_values = parents.stdout.trim().split(/\s+/);
    if (
      parent_values[0] !== original.merge_sha ||
      parent_values.some((value) => !isSha(value))
    ) {
      return { ok: false, reason: 'merge_commit_unproven' };
    }
    if (parent_values.length === 3 && original.head_sha === parent_values[2]) {
      return {
        ok: true,
        method: 'merge',
        from: parent_values[1],
        to: original.merge_sha
      };
    }
    if (parent_values.length === 2) {
      const parent = await deps.gitRun(
        ['rev-parse', `${original.merge_sha}^`],
        { cwd: repo }
      );
      if (parent.code !== 0 || !isSha(parent.stdout.trim())) {
        return { ok: false, reason: 'squash_parent_unavailable' };
      }
      const changed = await deps.gitRun(
        ['diff', '--name-only', parent.stdout.trim(), original.merge_sha],
        { cwd: repo }
      );
      if (changed.code !== 0) {
        return { ok: false, reason: 'squash_files_observe_failed' };
      }
      const observed = changed.stdout.split('\n').filter(Boolean).sort();
      const expected = original.files
        .map((/** @type {unknown} */ file) =>
          typeof file === 'object' && file !== null
            ? /** @type {any} */ (file).path
            : null
        )
        .filter(
          (/** @type {unknown} */ file) =>
            typeof file === 'string' && file.length > 0
        )
        .sort();
      if (
        expected.length > 0 &&
        observed.length === expected.length &&
        observed.every((file, index) => file === expected[index])
      ) {
        const source = await sourceRange(repo, original);
        if (source !== null) {
          const source_patch = await exactPatch(
            repo,
            source.from,
            source.to,
            path.join(scratch, 'squash-source.patch')
          );
          const integrated_patch = await exactPatch(
            repo,
            parent.stdout.trim(),
            original.merge_sha,
            path.join(scratch, 'squash-integrated.patch')
          );
          if (
            source_patch !== null &&
            integrated_patch !== null &&
            source_patch.equals(integrated_patch)
          ) {
            return {
              ok: true,
              method: 'squash',
              from: parent.stdout.trim(),
              to: original.merge_sha
            };
          }
        }
      }
    }
    {
      const commits = original.commits
        .map((/** @type {unknown} */ commit) =>
          typeof commit === 'object' && commit !== null
            ? /** @type {any} */ (commit).oid
            : null
        )
        .filter(
          (/** @type {unknown} */ oid) => typeof oid === 'string' && isSha(oid)
        );
      if (commits.length === 0) {
        return { ok: false, reason: 'rebase_range_unproven' };
      }
      const history = await deps.gitRun(
        ['log', '--format=%H', '--first-parent', target_sha],
        { cwd: repo }
      );
      if (history.code !== 0) {
        return { ok: false, reason: 'rebase_history_unavailable' };
      }
      const first_parent = history.stdout.split('\n').filter(Boolean);
      /** @type {{ patch_id: string, paths: string[] }[]} */
      const original_evidence = [];
      for (const sha of commits) {
        const evidence = await patchEvidence(repo, sha, scratch);
        if (!evidence) {
          return { ok: false, reason: 'rebase_range_unproven' };
        }
        original_evidence.push(evidence);
      }
      /** @type {{ from: string, to: string, range: string[] }[]} */
      const matches = [];
      for (
        let start = 0;
        start <= first_parent.length - commits.length;
        start += 1
      ) {
        const candidate = first_parent
          .slice(start, start + commits.length)
          .reverse();
        /** @type {{ patch_id: string, paths: string[] }[]} */
        const candidate_evidence = [];
        for (const sha of candidate) {
          const evidence = await patchEvidence(repo, sha, scratch);
          if (!evidence) {
            candidate_evidence.length = 0;
            break;
          }
          candidate_evidence.push(evidence);
        }
        if (
          candidate_evidence.length !== original_evidence.length ||
          candidate_evidence.some(
            (value, index) =>
              value.patch_id !== original_evidence[index].patch_id ||
              value.paths.join('\0') !==
                original_evidence[index].paths.join('\0')
          )
        ) {
          continue;
        }
        const oldest = candidate[0];
        const parent = await deps.gitRun(['rev-parse', `${oldest}^`], {
          cwd: repo
        });
        if (parent.code !== 0 || !isSha(parent.stdout.trim())) {
          return { ok: false, reason: 'rebase_range_unproven' };
        }
        if (candidate[candidate.length - 1] !== original.merge_sha) {
          continue;
        }
        matches.push({
          from: parent.stdout.trim(),
          to: candidate[candidate.length - 1],
          range: candidate
        });
      }
      if (matches.length > 1) {
        return { ok: false, reason: 'rebase_range_ambiguous' };
      }
      if (matches.length === 1) {
        return { ok: true, method: 'rebase', ...matches[0] };
      }
      return { ok: false, reason: 'rebase_range_unproven' };
    }
  }

  /**
   * Prepare a fresh target-base worktree with the proven inverse applied.
   *
   * @param {{ repo: string, worktree: string, branch: string, target_base: string, target_sha?: string, original: { number?: number, merge_sha: string, head_sha: string, commits: unknown[], files: unknown[] } }} input
   */
  async function prepare(input) {
    if (!input.branch || !input.target_base || !input.worktree) {
      return { ok: false, reason: 'revert_input_invalid' };
    }
    const pinned_target =
      typeof input.target_sha === 'string' && isSha(input.target_sha)
        ? input.target_sha
        : null;
    const fetched = await deps.gitRun(
      ['fetch', 'origin', pinned_target || input.target_base],
      { cwd: input.repo }
    );
    if (fetched.code !== 0) {
      return { ok: false, reason: 'target_base_fetch_failed' };
    }
    const target = pinned_target
      ? { code: 0, stdout: `${pinned_target}\n` }
      : await deps.gitRun(
          ['rev-parse', `refs/remotes/origin/${input.target_base}`],
          { cwd: input.repo }
        );
    if (target.code !== 0 || !isSha(target.stdout.trim())) {
      return { ok: false, reason: 'target_base_unavailable' };
    }
    const commits = input.original.commits
      .map((/** @type {unknown} */ commit) =>
        typeof commit === 'object' && commit !== null
          ? /** @type {any} */ (commit).oid
          : null
      )
      .filter((/** @type {unknown} */ oid) => typeof oid === 'string');
    const evidence = await fetchEvidence(input.repo, input.original, [
      input.original.merge_sha,
      input.original.head_sha,
      ...commits
    ]);
    if (!evidence.ok) {
      return evidence;
    }
    const patch_dir = tempDir();
    const proof = await prove(
      input.repo,
      target.stdout.trim(),
      input.original,
      patch_dir
    );
    if (!proof.ok) {
      return proof;
    }
    const patch_path = path.join(patch_dir, 'integrated.patch');
    if (typeof proof.from !== 'string' || typeof proof.to !== 'string') {
      return { ok: false, reason: 'integrated_range_unproven' };
    }
    const patch = await writePatch(
      input.repo,
      proof.from,
      proof.to,
      patch_path
    );
    if (!patch.ok) {
      return patch;
    }
    const added = await deps.gitRun(
      [
        'worktree',
        'add',
        '--no-checkout',
        '-b',
        input.branch,
        input.worktree,
        target.stdout.trim()
      ],
      { cwd: input.repo }
    );
    if (added.code !== 0) {
      return { ok: false, reason: 'revert_worktree_create_failed' };
    }
    const checkout = await deps.gitRun(['checkout', input.branch], {
      cwd: input.worktree
    });
    if (checkout.code !== 0) {
      return { ok: false, reason: 'revert_worktree_checkout_failed' };
    }
    const checked = await deps.gitRun(
      ['apply', '--check', '--reverse', '--3way', patch_path],
      { cwd: input.worktree }
    );
    if (checked.code !== 0) {
      return { ok: false, reason: 'inverse_apply_conflict' };
    }
    const applied = await deps.gitRun(
      ['apply', '--reverse', '--3way', patch_path],
      { cwd: input.worktree }
    );
    if (applied.code !== 0) {
      return { ok: false, reason: 'inverse_apply_failed' };
    }
    const tree = await deps.gitRun(['write-tree'], { cwd: input.worktree });
    const tree_sha = tree.stdout.trim();
    if (tree.code !== 0 || !isSha(tree_sha)) {
      return { ok: false, reason: 'inverse_tree_observe_failed' };
    }
    return {
      ok: true,
      worktree: input.worktree,
      branch: input.branch,
      base_sha: target.stdout.trim(),
      tree_sha,
      patch_path,
      proof
    };
  }

  return { prepare };
}
