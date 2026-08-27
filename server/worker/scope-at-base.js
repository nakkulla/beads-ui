/**
 * The declared-scope reader for the waiting-lane overlap chips (UI-qm12 §4.1).
 *
 * Extracted from the retired parallel-analysis target snapshot (UI-s582 §4)
 * unchanged: the chips are the only surviving reader, and a second definition
 * of "declared scope" is exactly what the original extraction avoided.
 */
import { parseArtifactScope } from './artifact-scope.js';

/**
 * The union of the declared `scope:` prefixes of `artifact_paths`, read from
 * the pinned base.
 *
 * `fail_on_read_error` makes ONE unreadable artifact collapse the whole result
 * to null — a partial union would silently under-declare.
 *
 * @param {(args: string[]) => Promise<{ code: number, stdout: string }>} gitRun
 * @param {string} base_sha
 * @param {string[]} artifact_paths
 * @param {boolean} [fail_on_read_error]
 * @returns {Promise<string[]|null>}
 */
export async function scopeAtBase(
  gitRun,
  base_sha,
  artifact_paths,
  fail_on_read_error = false
) {
  /** @type {Set<string>} */
  const scope = new Set();
  for (const artifact_path of artifact_paths) {
    const content = await gitRun([
      'cat-file',
      'blob',
      `${base_sha}:${artifact_path}`
    ]);
    if (content.code !== 0) {
      if (fail_on_read_error) {
        return null;
      }
      continue;
    }
    for (const prefix of parseArtifactScope(content.stdout)) {
      scope.add(prefix);
    }
  }
  return [...scope].sort();
}
