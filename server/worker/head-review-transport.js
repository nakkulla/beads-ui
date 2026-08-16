/**
 * Live effect adapters for the head-review continuation (UI-58w8 §3–§4).
 *
 * `head-review.js` owns the state machine; this module owns how its effects
 * actually happen on this machine — Beads receipt reads/writes, git lineage
 * proofs, and the review/repair sessions spawned through the SAME runner
 * adapters ordinary Worker sessions use. Everything here is injected so the
 * focused tests exercise the mapping without a process or a network.
 *
 * The reviewer session is dispatched read-only BY CONTRACT (its prompt), and
 * the state machine independently re-checks the PR head after the verdict —
 * a reviewer that mutated anything shows up as drift and never approves. The
 * repair session is the one writable owner of the bead worktree for its
 * round; its self-report is never evidence, the machine re-derives head,
 * lineage and receipt from authoritative reads.
 */
import { REVIEW_EFFORTS, REVIEW_STEP_MODELS } from './exec-enums.js';
import { DEFAULT_REVIEWER, DEFAULT_REVIEW_EFFORT } from './head-review.js';

/**
 * The one structured-verdict channel between a review session and the Worker.
 * The session's LAST line matching this marker carries a JSON object
 * `{ "verdict": "APPROVE"|"REVISE", "findings": [...] }`; anything else is a
 * malformed result and never a success.
 */
export const HEAD_REVIEW_VERDICT_MARKER = 'HEAD_REVIEW_VERDICT';

const SHA40_RE = /^[0-9a-f]{40}$/i;
const RECEIPT_RE = /^([^@\s]+)@([0-9a-f]{40})$/i;

/**
 * Parse the last structured verdict line out of a session's text output.
 *
 * @param {string} text
 * @returns {{ verdict: 'APPROVE'|'REVISE', findings: unknown[] }|null}
 */
export function parseVerdictLine(text) {
  const lines = String(text).split('\n');
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i].trim();
    if (!line.startsWith(HEAD_REVIEW_VERDICT_MARKER)) {
      continue;
    }
    const payload = line.slice(HEAD_REVIEW_VERDICT_MARKER.length).trim();
    /** @type {any} */
    let parsed = null;
    try {
      parsed = JSON.parse(payload);
    } catch {
      return null;
    }
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      (parsed.verdict !== 'APPROVE' && parsed.verdict !== 'REVISE')
    ) {
      return null;
    }
    return {
      verdict: parsed.verdict,
      findings: Array.isArray(parsed.findings) ? parsed.findings : []
    };
  }
  return null;
}

/**
 * Map a reviewer selection onto the runner registry. `codex` is its own
 * runner; the claude-family models ride the claude runner with an explicit
 * model. The vocabulary itself is owned by `exec-enums.js`.
 *
 * @param {string} reviewer
 * @returns {{ runner: string, model: string|undefined }|null}
 */
function runnerFor(reviewer) {
  if (reviewer === 'codex') {
    return { runner: 'codex', model: undefined };
  }
  if (reviewer === 'opus' || reviewer === 'fable') {
    return { runner: 'claude', model: reviewer };
  }
  return null;
}

/**
 * @typedef {Object} HeadReviewTransportDeps
 * @property {string} workspace
 * @property {string} repo
 * @property {{ readIssue: (bead_id: string) => Promise<Record<string, any>>, setMetadata: (bead_id: string, key: string, value: string) => Promise<void> }} bd
 * @property {(name: string) => { name: string, spawn: (bead: any, cwd: string, settings: any) => { done: Promise<any> } }} makeRunner
 * @property {{ exists: (repo: string, bead_id: string) => boolean, pathFor: (repo: string, bead_id: string) => string }} worktree
 * @property {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} gitRun
 * @property {(bead_id: string) => Promise<string|null>} probeHead - Fresh
 * authoritative PR head observation.
 * @property {(...args: any[]) => void} [log]
 */

/**
 * @param {HeadReviewTransportDeps} deps
 */
export function createHeadReviewTransport(deps) {
  const log = deps.log || (() => {});

  /**
   * @param {string} bead_id
   * @returns {Promise<Record<string, any>>}
   */
  async function metadataOf(bead_id) {
    try {
      const issue = await deps.bd.readIssue(bead_id);
      const md = issue && typeof issue === 'object' ? issue.metadata : null;
      return md && typeof md === 'object' && !Array.isArray(md) ? md : {};
    } catch (err) {
      log('head-review metadata read failed for %s: %o', bead_id, err);
      return {};
    }
  }

  /**
   * Background reviewer selection: exactly Bead `impl_review_model` /
   * `impl_review_effort`, then the harness implementation-gate default —
   * current-user and workspace layers do not participate, and `self`/`skip`,
   * an unknown model, or an unsupported effort is a terminal failure with no
   * fallback (workflow contract, manual merge continuation).
   *
   * @param {string} bead_id
   */
  async function selectReviewer(bead_id) {
    const md = await metadataOf(bead_id);
    const raw_model =
      typeof md.impl_review_model === 'string' &&
      md.impl_review_model.length > 0
        ? md.impl_review_model
        : DEFAULT_REVIEWER;
    const raw_effort =
      typeof md.impl_review_effort === 'string' &&
      md.impl_review_effort.length > 0
        ? md.impl_review_effort
        : DEFAULT_REVIEW_EFFORT;
    if (raw_model === 'self' || raw_model === 'skip') {
      return {
        ok: false,
        reviewer: raw_model,
        effort: raw_effort,
        reason: `reviewer_selection_${raw_model}`
      };
    }
    if (!REVIEW_STEP_MODELS.includes(raw_model)) {
      return {
        ok: false,
        reviewer: raw_model,
        effort: raw_effort,
        reason: 'reviewer_selection_invalid'
      };
    }
    if (!REVIEW_EFFORTS.includes(raw_effort)) {
      return {
        ok: false,
        reviewer: raw_model,
        effort: raw_effort,
        reason: 'reviewer_effort_invalid'
      };
    }
    return { ok: true, reviewer: raw_model, effort: raw_effort };
  }

  /**
   * @param {string} bead_id
   */
  async function readReceipt(bead_id) {
    const md = await metadataOf(bead_id);
    const raw = typeof md.impl_review === 'string' ? md.impl_review.trim() : '';
    const match = RECEIPT_RE.exec(raw);
    if (!match) {
      return null;
    }
    return { actor: match[1], head_sha: match[2].toLowerCase(), raw };
  }

  /**
   * @param {string} bead_id
   * @param {string} receipt
   */
  async function writeReceipt(bead_id, receipt) {
    try {
      await deps.bd.setMetadata(bead_id, 'impl_review', receipt);
    } catch (err) {
      log('head-review receipt write failed for %s: %o', bead_id, err);
      return { ok: false, readback: null, reason: 'receipt_write_failed' };
    }
    const back = await readReceipt(bead_id);
    return { ok: back !== null, readback: back ? back.raw : null };
  }

  /**
   * Queue-owned lineage proof: both SHAs must exist after a fetch and the
   * prior head must be an ancestor of the new one. The new head itself came
   * from an authoritative GitHub observation, which is its remote
   * containment; what ancestry adds is that nobody REPLACED the reviewed
   * history — a force-push or an unrelated branch fails the probe and is
   * treated as external drift.
   *
   * @param {string} bead_id
   * @param {{ prior_head_sha: string, head_sha: string, target_base: string }} input
   */
  async function lineage(bead_id, input) {
    if (
      !SHA40_RE.test(String(input.prior_head_sha)) ||
      !SHA40_RE.test(String(input.head_sha))
    ) {
      return { queue_owned: false, reason: 'lineage_identity_invalid' };
    }
    try {
      const fetched = await deps.gitRun(['fetch', '--quiet', 'origin'], {
        cwd: deps.repo
      });
      if (fetched.code !== 0) {
        return { queue_owned: false, reason: 'lineage_fetch_failed' };
      }
      for (const sha of [input.prior_head_sha, input.head_sha]) {
        const present = await deps.gitRun(
          ['cat-file', '-e', `${sha}^{commit}`],
          { cwd: deps.repo }
        );
        if (present.code !== 0) {
          return { queue_owned: false, reason: 'lineage_sha_unreachable' };
        }
      }
      const ancestry = await deps.gitRun(
        ['merge-base', '--is-ancestor', input.prior_head_sha, input.head_sha],
        { cwd: deps.repo }
      );
      if (ancestry.code !== 0) {
        return { queue_owned: false, reason: 'external_head_drift' };
      }
      return { queue_owned: true };
    } catch (err) {
      log('head-review lineage probe failed for %s: %o', bead_id, err);
      return { queue_owned: false, reason: 'lineage_probe_failed' };
    }
  }

  /**
   * @param {string} bead_id
   */
  async function probeHead(bead_id) {
    try {
      return await deps.probeHead(bead_id);
    } catch (err) {
      log('head-review head probe failed for %s: %o', bead_id, err);
      return null;
    }
  }

  /**
   * @param {any} verdict - A RunnerVerdict.
   */
  function textOf(verdict) {
    const events = Array.isArray(verdict?.events) ? verdict.events : [];
    return events
      .filter(
        (/** @type {any} */ e) =>
          e?.kind === 'text' && typeof e.text === 'string'
      )
      .map((/** @type {any} */ e) => e.text)
      .join('\n');
  }

  /**
   * Spawn one session through the shared runner registry and await its
   * terminal verdict.
   *
   * @param {string} reviewer
   * @param {string} effort
   * @param {string} bead_id
   * @param {string} prompt
   * @returns {Promise<{ ok: true, verdict: any }|{ ok: false, reason: string }>}
   */
  async function runSession(reviewer, effort, bead_id, prompt) {
    const mapped = runnerFor(reviewer);
    if (!mapped) {
      return { ok: false, reason: 'reviewer_selection_invalid' };
    }
    if (!deps.worktree.exists(deps.repo, bead_id)) {
      return { ok: false, reason: 'worktree_missing' };
    }
    const cwd = deps.worktree.pathFor(deps.repo, bead_id);
    /** @type {any} */
    let handle;
    try {
      const runner = deps.makeRunner(mapped.runner);
      handle = runner.spawn({ id: bead_id, prompt }, cwd, {
        model: mapped.model,
        effort,
        speed: 'default',
        fast_track: true,
        repo: deps.repo,
        target_base: null,
        base_oid: null,
        disposition: null
      });
    } catch (err) {
      log('head-review session spawn failed for %s: %o', bead_id, err);
      return { ok: false, reason: 'transport_unavailable' };
    }
    /** @type {any} */
    let verdict;
    try {
      verdict = await handle.done;
    } catch (err) {
      log('head-review session crashed for %s: %o', bead_id, err);
      return { ok: false, reason: 'transport_unavailable' };
    }
    if (!verdict || verdict.success !== true) {
      return {
        ok: false,
        reason:
          verdict && typeof verdict.reason === 'string'
            ? verdict.reason
            : 'session_failed'
      };
    }
    return { ok: true, verdict };
  }

  /**
   * @param {Record<string, any>} packet
   */
  async function runReview(packet) {
    const prompt = [
      `Bead ${packet.bead_id} 수동 머지 continuation implementation review.`,
      '',
      '이 세션은 READ-ONLY 리뷰다. 어떤 파일도 수정하지 말고, 어떤 브랜치에도 push하지 말라.',
      '',
      `- 대상 head: ${packet.head_sha}`,
      `- target base: ${packet.target_base}`,
      `- authority: ${packet.authority_id}`,
      `- attempt: ${packet.attempt_id}`,
      '',
      '절차:',
      `1. \`git fetch origin\` 후 \`git diff origin/${packet.target_base}...${packet.head_sha}\`로 최종 PR diff 전체를 검토하라.`,
      '2. correctness·contract 위반·회귀 위험에 집중하고, blocking finding만 REVISE 사유로 삼아라.',
      '3. 리뷰 우회·receipt 직접 기록·merge 실행은 금지된다. verdict 판정만 반환하라.',
      '',
      `마지막 출력 줄은 정확히 다음 한 줄이어야 한다(JSON 한 줄):`,
      `${HEAD_REVIEW_VERDICT_MARKER} {"verdict":"APPROVE"|"REVISE","findings":[{"title":"...","detail":"...","file":"..."}]}`
    ].join('\n');
    const run = await runSession(
      String(packet.reviewer),
      String(packet.effort),
      String(packet.bead_id),
      prompt
    );
    if (!run.ok) {
      return run;
    }
    const parsed = parseVerdictLine(textOf(run.verdict));
    if (!parsed) {
      return { ok: false, reason: 'review_verdict_missing' };
    }
    return { ok: true, verdict: parsed.verdict, findings: parsed.findings };
  }

  /**
   * @param {Record<string, any>} packet
   */
  async function runRepair(packet) {
    const findings_json = JSON.stringify(packet.findings ?? [], null, 2);
    const prompt = [
      `Bead ${packet.bead_id} 수동 머지 continuation bounded repair (1회).`,
      '',
      `- reviewed head: ${packet.reviewed_head_sha}`,
      `- target base: ${packet.target_base}`,
      `- findings digest: ${packet.findings_digest}`,
      '',
      'REVISE findings:',
      '```json',
      findings_json,
      '```',
      '',
      '절차(순서 고정):',
      `1. 워크트리가 정확히 reviewed head \`${packet.reviewed_head_sha}\`이고 clean인지 확인하라. 아니면 아무것도 하지 말고 실패로 종료하라.`,
      '2. 위 findings를 한 batch로 수정하라. 범위 밖 변경은 금지된다.',
      '3. 저장소 필수 검증(Pre-Handoff Validation)을 실행하라.',
      '4. full diff/status를 검토하고 commit 후 브랜치에 normal push하라.',
      '5. repair delta 전체를 self-review하고, 통과 시에만',
      '   `bd update ' +
        String(packet.bead_id) +
        ' --set-metadata impl_review=self@<새 head SHA>`를 기록하라.',
      '6. base로의 push, merge 실행, 두 번째 수정 라운드는 금지된다.'
    ].join('\n');
    const run = await runSession(
      'codex',
      'xhigh',
      String(packet.bead_id),
      prompt
    );
    if (!run.ok) {
      return run;
    }
    const head = await probeHead(String(packet.bead_id));
    if (typeof head !== 'string' || !SHA40_RE.test(head)) {
      return { ok: false, reason: 'repair_head_unobservable' };
    }
    return { ok: true, head_sha: head.toLowerCase() };
  }

  return {
    selectReviewer,
    readReceipt,
    writeReceipt,
    lineage,
    observeHead: probeHead,
    runReview,
    runRepair
  };
}
