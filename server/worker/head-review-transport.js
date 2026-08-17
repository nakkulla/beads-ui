/**
 * Live effect adapters for the head-review continuation (UI-58w8 §3–§4).
 *
 * `head-review.js` owns the state machine; this module owns how its effects
 * actually happen on this machine — Beads receipt reads/writes, git lineage
 * proofs, and the review/repair sessions spawned through the SAME runner
 * adapters ordinary Worker sessions use. Everything here is injected so the
 * focused tests exercise the mapping without a process or a network.
 *
 * Exactly-once across restarts is durable here, not in memory: every
 * review/repair attempt has a marker file keyed by its deterministic attempt
 * id. A recorded terminal result is returned verbatim instead of re-running;
 * a recorded live process is ADOPTED — the transport waits for the exact pid
 * to exit and then reads the attempt's own session log — and only an attempt
 * with no record at all may spawn. A `revising` journal whose findings were
 * lost with the process (crash between prerecord and spawn) fails closed
 * rather than repairing against guessed findings.
 *
 * The reviewer session runs in review mode: read-only sandbox argv, the
 * review preamble (no PR-submission contract), and the explicit selected
 * model — never the writable Worker defaults. The repair session is the one
 * writable owner of the bead worktree for its round; its self-report is never
 * evidence, the state machine re-derives head, lineage and receipts from
 * authoritative reads.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { REVIEW_EFFORTS, REVIEW_STEP_MODELS } from './exec-enums.js';
import { DEFAULT_REVIEWER, DEFAULT_REVIEW_EFFORT } from './head-review.js';
import { adapterSpec } from './runner/index.js';
import { workspaceStateDir } from './state-paths.js';

/**
 * The one structured-verdict channel between a review session and the Worker.
 * The session's LAST line matching this marker carries a JSON object
 * `{ "verdict": "APPROVE"|"REVISE", "findings": [...] }`; anything else is a
 * malformed result and never a success.
 */
export const HEAD_REVIEW_VERDICT_MARKER = 'HEAD_REVIEW_VERDICT';

/**
 * The repair session's structured result line:
 * `HEAD_REPAIR_RESULT { "self_review": "APPROVE"|"REVISE" }`. The exact-delta
 * self-review verdict must come back through this channel — a repair session
 * that merely exits zero has proven nothing.
 */
export const HEAD_REPAIR_RESULT_MARKER = 'HEAD_REPAIR_RESULT';

/** How long an adopted live attempt is awaited before failing closed. */
export const ATTEMPT_ADOPTION_WAIT_MS = 30 * 60 * 1000;

const SHA40_RE = /^[0-9a-f]{40}$/i;
const RECEIPT_RE = /^([^@\s]+)@([0-9a-f]{40})$/i;
/** How much session-text tail a terminal marker keeps (verdict lines are last). */
const MARKER_TEXT_TAIL = 8000;

/**
 * Parse the last structured verdict line out of a session's text output.
 *
 * @param {string} text
 * @returns {{ verdict: 'APPROVE'|'REVISE', findings: unknown[] }|null}
 */
export function parseVerdictLine(text) {
  const payload = lastMarkerPayload(text, HEAD_REVIEW_VERDICT_MARKER);
  if (
    !payload ||
    (payload.verdict !== 'APPROVE' && payload.verdict !== 'REVISE')
  ) {
    return null;
  }
  return {
    verdict: payload.verdict,
    findings: Array.isArray(payload.findings) ? payload.findings : []
  };
}

/**
 * Parse the last structured repair-result line out of a session's text.
 *
 * @param {string} text
 * @returns {{ self_review: string }|null}
 */
export function parseRepairResultLine(text) {
  const payload = lastMarkerPayload(text, HEAD_REPAIR_RESULT_MARKER);
  if (!payload || typeof payload.self_review !== 'string') {
    return null;
  }
  return { self_review: payload.self_review };
}

/**
 * @param {string} text
 * @param {string} marker
 * @returns {any|null}
 */
function lastMarkerPayload(text, marker) {
  const lines = String(text).split('\n');
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i].trim();
    if (!line.startsWith(marker)) {
      continue;
    }
    try {
      const parsed = JSON.parse(line.slice(marker.length).trim());
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Map a reviewer selection onto the runner registry. `codex` rides its own
 * runner with the EXPLICIT preset model (`sol`, the harness reviewer preset's
 * gpt-5.6-sol) rather than whatever the workspace catalog defaults to; the
 * claude-family models ride the claude runner with an explicit model. The
 * vocabulary itself is owned by `exec-enums.js`.
 *
 * @param {string} reviewer
 * @returns {{ runner: string, model: string|undefined }|null}
 */
function runnerFor(reviewer) {
  if (reviewer === 'codex') {
    return { runner: 'codex', model: 'sol' };
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
 * @property {(name: string) => { name: string, spawn: (bead: any, cwd: string, settings: any) => { pid?: number|null, done: Promise<any> } }} makeRunner
 * @property {{ exists: (repo: string, bead_id: string) => boolean, pathFor: (repo: string, bead_id: string) => string }} worktree
 * @property {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} gitRun
 * @property {(bead_id: string) => Promise<string|null>} probeHead - Fresh
 * authoritative PR head observation.
 * @property {(bead_id: string) => boolean} [beadSessionActive] - Whether an
 * ordinary Worker session already owns this bead (unique-writer fence for the
 * repair round).
 * @property {typeof nodeFs} [fs]
 * @property {(pid: number) => boolean} [pidAlive]
 * @property {(ms: number) => Promise<void>} [sleep]
 * @property {() => number} [now]
 * @property {(...args: any[]) => void} [log]
 */

/**
 * @param {HeadReviewTransportDeps} deps
 */
export function createHeadReviewTransport(deps) {
  const log = deps.log || (() => {});
  const fs = deps.fs || nodeFs;
  const now = deps.now || (() => Date.now());
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms)));
  const pidAlive =
    deps.pidAlive ||
    ((/** @type {number} */ pid) => {
      try {
        process.kill(pid, 0);
        return true;
      } catch {
        return false;
      }
    });

  /**
   * @param {string} attempt_id
   */
  function markerPathFor(attempt_id) {
    const slug = String(attempt_id).replace(/[^A-Za-z0-9._-]/g, '_');
    return path.join(
      workspaceStateDir(deps.workspace),
      'head-review-attempts',
      `${slug}.json`
    );
  }

  /**
   * @param {string} attempt_id
   * @returns {Record<string, any>|null}
   */
  function readMarker(attempt_id) {
    try {
      const raw = fs.readFileSync(markerPathFor(attempt_id), 'utf8');
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} attempt_id
   * @param {Record<string, any>} marker
   */
  function writeMarker(attempt_id, marker) {
    const file = markerPathFor(attempt_id);
    try {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(marker));
      return true;
    } catch (err) {
      log(
        'head-review attempt marker write failed for %s: %o',
        attempt_id,
        err
      );
      return false;
    }
  }

  /**
   * Read Bead metadata, distinguishing ABSENCE from an unreadable record —
   * only the caller knows which of the two may fall through to a default.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: boolean, metadata: Record<string, any> }>}
   */
  async function metadataOf(bead_id) {
    try {
      const issue = await deps.bd.readIssue(bead_id);
      const md = issue && typeof issue === 'object' ? issue.metadata : null;
      return {
        ok: true,
        metadata: md && typeof md === 'object' && !Array.isArray(md) ? md : {}
      };
    } catch (err) {
      log('head-review metadata read failed for %s: %o', bead_id, err);
      return { ok: false, metadata: {} };
    }
  }

  /**
   * Background reviewer selection: exactly Bead `impl_review_model` /
   * `impl_review_effort`, then the harness implementation-gate default —
   * current-user and workspace layers do not participate, and `self`/`skip`,
   * an unknown model, an unsupported effort, OR an unreadable Bead record is
   * a terminal failure with no fallback (workflow contract, manual merge
   * continuation): a default chosen over a record we could not read might be
   * overriding an explicit `self`/`skip`.
   *
   * @param {string} bead_id
   */
  async function selectReviewer(bead_id) {
    const read = await metadataOf(bead_id);
    if (!read.ok) {
      return {
        ok: false,
        reviewer: DEFAULT_REVIEWER,
        effort: DEFAULT_REVIEW_EFFORT,
        reason: 'reviewer_selection_unreadable'
      };
    }
    const md = read.metadata;
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
    const read = await metadataOf(bead_id);
    const raw =
      typeof read.metadata.impl_review === 'string'
        ? read.metadata.impl_review.trim()
        : '';
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
   * Queue-owned lineage proof (UI-58w8 §2). A head move counts as queue-owned
   * only when ALL of the following hold:
   *
   * 1. the caller VOUCHES for a queue-owned mutation (`resolver:<attempt>`,
   *    `base_update`, or `repair:<attempt>`) — an ordinary descendant push by
   *    an external actor satisfies every git probe below, so with no vouched
   *    mutation the move fails as `mutation_unproven`;
   * 2. both SHAs exist after a fetch and the prior head is an ancestor of the
   *    new one (nobody replaced the reviewed history);
   * 3. when the caller observed the PR's head ref, the remote branch tip IS
   *    the observed head — a head buried under later external commits is not
   *    the identity that was vouched for.
   *
   * @param {string} bead_id
   * @param {{ prior_head_sha: string, head_sha: string, target_base: string, head_ref?: string|null, mutation?: string|null }} input
   */
  async function lineage(bead_id, input) {
    if (
      !SHA40_RE.test(String(input.prior_head_sha)) ||
      !SHA40_RE.test(String(input.head_sha))
    ) {
      return { queue_owned: false, reason: 'lineage_identity_invalid' };
    }
    const prior = String(input.prior_head_sha).toLowerCase();
    const head = String(input.head_sha).toLowerCase();
    if (prior === head) {
      return { queue_owned: true };
    }
    if (typeof input.mutation !== 'string' || input.mutation.length === 0) {
      return { queue_owned: false, reason: 'mutation_unproven' };
    }
    try {
      const fetched = await deps.gitRun(['fetch', '--quiet', 'origin'], {
        cwd: deps.repo
      });
      if (fetched.code !== 0) {
        return { queue_owned: false, reason: 'lineage_fetch_failed' };
      }
      for (const sha of [prior, head]) {
        const present = await deps.gitRun(
          ['cat-file', '-e', `${sha}^{commit}`],
          { cwd: deps.repo }
        );
        if (present.code !== 0) {
          return { queue_owned: false, reason: 'lineage_sha_unreachable' };
        }
      }
      const ancestry = await deps.gitRun(
        ['merge-base', '--is-ancestor', prior, head],
        { cwd: deps.repo }
      );
      if (ancestry.code !== 0) {
        return { queue_owned: false, reason: 'external_head_drift' };
      }
      if (typeof input.head_ref === 'string' && input.head_ref.length > 0) {
        const tip = await deps.gitRun(
          ['rev-parse', `refs/remotes/origin/${input.head_ref}`],
          { cwd: deps.repo }
        );
        if (tip.code !== 0 || tip.stdout.trim().toLowerCase() !== head) {
          return { queue_owned: false, reason: 'remote_ref_mismatch' };
        }
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
   * Recover a finished attempt's text from its own session log by replaying
   * the lines through the SAME adapter that wrote them.
   *
   * @param {string} runner_name
   * @param {string} log_path
   * @returns {string|null}
   */
  function textFromLog(runner_name, log_path) {
    /** @type {string} */
    let raw;
    try {
      raw = fs.readFileSync(log_path, 'utf8');
    } catch {
      return null;
    }
    const spec = adapterSpec(runner_name);
    /** @type {string[]} */
    const texts = [];
    for (const line of raw.split('\n')) {
      if (!line.trim()) {
        continue;
      }
      /** @type {any} */
      let parsed;
      try {
        parsed = JSON.parse(line);
      } catch {
        continue;
      }
      const events = spec.normalize(parsed);
      for (const event of Array.isArray(events)
        ? events
        : events
          ? [events]
          : []) {
        if (event && event.kind === 'text' && typeof event.text === 'string') {
          texts.push(event.text);
        }
      }
    }
    return texts.join('\n');
  }

  /**
   * Run — or durably adopt — exactly one attempt to its terminal text.
   *
   * @param {{ attempt_id: string, reviewer: string, effort: string, bead_id: string, prompt: string, mode: 'review'|null }} input
   * @returns {Promise<{ ok: true, text: string }|{ ok: false, reason: string }>}
   */
  async function runAttempt(input) {
    const marker = readMarker(input.attempt_id);
    if (marker && marker.terminal && typeof marker.terminal === 'object') {
      const terminal = marker.terminal;
      return terminal.ok === true
        ? { ok: true, text: String(terminal.text ?? '') }
        : {
            ok: false,
            reason:
              typeof terminal.reason === 'string'
                ? terminal.reason
                : 'session_failed'
          };
    }
    if (marker) {
      return adoptAttempt(input.attempt_id, marker);
    }

    const mapped = runnerFor(input.reviewer);
    if (!mapped) {
      return { ok: false, reason: 'reviewer_selection_invalid' };
    }
    if (!deps.worktree.exists(deps.repo, input.bead_id)) {
      return { ok: false, reason: 'worktree_missing' };
    }
    const cwd = deps.worktree.pathFor(deps.repo, input.bead_id);
    const log_path = path.join(
      workspaceStateDir(deps.workspace),
      'head-review-attempts',
      `${String(input.attempt_id).replace(/[^A-Za-z0-9._-]/g, '_')}.log.jsonl`
    );
    // Prerecord BEFORE the spawn (UI-58w8 §6): a crash between spawn and the
    // post-spawn write would otherwise leave no record at all, and the next
    // pass would start a SECOND process for the same attempt. With this
    // marker the next pass adopts instead — and an adoption that cannot
    // recover a result fails closed rather than re-running.
    writeMarker(input.attempt_id, {
      attempt_id: input.attempt_id,
      pid: null,
      runner: mapped.runner,
      log_path,
      started_at: now(),
      terminal: null
    });
    /** @type {any} */
    let handle;
    try {
      const runner = deps.makeRunner(mapped.runner);
      handle = runner.spawn({ id: input.bead_id, prompt: input.prompt }, cwd, {
        model: mapped.model,
        effort: input.effort,
        speed: 'default',
        // Review attempts carry the read-only review contract instead of the
        // writable Worker defaults (mode='review' switches both the argv
        // sandbox and the preamble); the repair attempt is the writable one.
        mode: input.mode,
        fast_track: input.mode !== 'review',
        repo: deps.repo,
        target_base: null,
        base_oid: null,
        disposition: null,
        log_path
      });
    } catch (err) {
      log('head-review session spawn failed for %s: %o', input.bead_id, err);
      return { ok: false, reason: 'transport_unavailable' };
    }
    writeMarker(input.attempt_id, {
      attempt_id: input.attempt_id,
      pid: typeof handle.pid === 'number' ? handle.pid : null,
      runner: mapped.runner,
      log_path,
      started_at: now(),
      terminal: null
    });
    /** @type {any} */
    let verdict;
    try {
      verdict = await handle.done;
    } catch (err) {
      log('head-review session crashed for %s: %o', input.bead_id, err);
      const failure = { ok: false, reason: 'transport_unavailable' };
      writeMarker(input.attempt_id, {
        attempt_id: input.attempt_id,
        runner: mapped.runner,
        log_path,
        started_at: now(),
        terminal: failure
      });
      return /** @type {{ ok: false, reason: string }} */ (failure);
    }
    /** @type {{ ok: boolean, text?: string, reason?: string }} */
    const terminal =
      verdict && verdict.success === true
        ? { ok: true, text: textOf(verdict).slice(-MARKER_TEXT_TAIL) }
        : {
            ok: false,
            reason:
              verdict && typeof verdict.reason === 'string'
                ? verdict.reason
                : 'session_failed'
          };
    writeMarker(input.attempt_id, {
      attempt_id: input.attempt_id,
      runner: mapped.runner,
      log_path,
      started_at: now(),
      terminal
    });
    return terminal.ok === true
      ? { ok: true, text: String(terminal.text ?? '') }
      : { ok: false, reason: /** @type {string} */ (terminal.reason) };
  }

  /**
   * Adopt a recorded live attempt: wait for the EXACT recorded pid to exit,
   * then read the attempt's own session log. No second process is ever
   * spawned for a recorded attempt — an unrecoverable record fails closed.
   *
   * @param {string} attempt_id
   * @param {Record<string, any>} marker
   * @returns {Promise<{ ok: true, text: string }|{ ok: false, reason: string }>}
   */
  async function adoptAttempt(attempt_id, marker) {
    const pid = typeof marker.pid === 'number' ? marker.pid : null;
    const deadline = now() + ATTEMPT_ADOPTION_WAIT_MS;
    while (pid !== null && pidAlive(pid)) {
      if (now() >= deadline) {
        return { ok: false, reason: 'attempt_adoption_timeout' };
      }
      await sleep(2000);
    }
    const log_path =
      typeof marker.log_path === 'string' ? marker.log_path : null;
    const runner_name =
      typeof marker.runner === 'string' ? marker.runner : 'codex';
    const text = log_path ? textFromLog(runner_name, log_path) : null;
    if (text === null) {
      const failure = { ok: false, reason: 'attempt_result_unrecoverable' };
      writeMarker(attempt_id, { ...marker, terminal: failure });
      return /** @type {{ ok: false, reason: string }} */ (failure);
    }
    const terminal = { ok: true, text: text.slice(-MARKER_TEXT_TAIL) };
    writeMarker(attempt_id, { ...marker, terminal });
    return { ok: true, text: terminal.text };
  }

  /**
   * Best-effort stop of a recorded attempt's process group — cancel semantics
   * only; stop success is NEVER a merge-safety input (the journal CAS is).
   *
   * @param {string} attempt_id
   */
  function stopAttempt(attempt_id) {
    const marker = readMarker(attempt_id);
    const pid = marker && typeof marker.pid === 'number' ? marker.pid : null;
    if (pid === null || marker?.terminal) {
      return false;
    }
    try {
      // The group only: the runner spawns detached process groups, and
      // signalling a bare pid would risk hitting an unrelated process that
      // reused it. A failed stop is not an error here — the journal CAS, not
      // this signal, is what makes a late result a no-op.
      process.kill(-pid, 'SIGTERM');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * @param {Record<string, any>} packet
   */
  async function runReview(packet) {
    const receipt = await readReceipt(String(packet.bead_id));
    const spec_read = await metadataOf(String(packet.bead_id));
    const spec_id =
      typeof spec_read.metadata.spec_id === 'string'
        ? spec_read.metadata.spec_id
        : null;
    const prompt = [
      `Bead ${packet.bead_id} 수동 머지 continuation implementation review.`,
      '',
      '이 세션은 READ-ONLY 리뷰다. 어떤 파일도 수정하지 말고, 어떤 브랜치에도 push하지 말라.',
      '',
      `- 대상 head: ${packet.head_sha}`,
      `- target base: ${packet.target_base}`,
      `- authority: ${packet.authority_id}`,
      `- attempt: ${packet.attempt_id}`,
      `- 직전 implementation receipt: ${receipt ? receipt.raw : '(없음)'}`,
      `- 승인 spec: ${spec_id ?? '(Bead metadata에 없음)'}`,
      '- head 이동 출처: queue-owned mutation (conflict resolver push / base update)',
      '',
      '절차:',
      `1. \`git fetch origin\` 후 \`git diff origin/${packet.target_base}...${packet.head_sha}\`로 최종 PR diff 전체를 검토하라.`,
      '2. correctness·contract 위반·회귀 위험에 집중하고, blocking finding만 REVISE 사유로 삼아라.',
      '3. 리뷰 우회·receipt 직접 기록·merge 실행은 금지된다. verdict 판정만 반환하라.',
      '',
      `마지막 출력 줄은 정확히 다음 한 줄이어야 한다(JSON 한 줄):`,
      `${HEAD_REVIEW_VERDICT_MARKER} {"verdict":"APPROVE"|"REVISE","findings":[{"title":"...","detail":"...","file":"..."}]}`
    ].join('\n');
    const run = await runAttempt({
      attempt_id: String(packet.attempt_id),
      reviewer: String(packet.reviewer),
      effort: String(packet.effort),
      bead_id: String(packet.bead_id),
      prompt,
      mode: 'review'
    });
    if (!run.ok) {
      return run;
    }
    const parsed = parseVerdictLine(run.text);
    if (!parsed) {
      return { ok: false, reason: 'review_verdict_missing' };
    }
    return { ok: true, verdict: parsed.verdict, findings: parsed.findings };
  }

  /**
   * @param {Record<string, any>} packet
   */
  async function runRepair(packet) {
    if (
      typeof deps.beadSessionActive === 'function' &&
      deps.beadSessionActive(String(packet.bead_id))
    ) {
      // Unique-writer fence: the repair round may not share the worktree with
      // a live ordinary session.
      return { ok: false, reason: 'bead_running' };
    }
    const marker = readMarker(String(packet.attempt_id));
    if (!Array.isArray(packet.findings) && !marker) {
      // A `revising` journal without durable findings and without a recorded
      // attempt means the findings died with the process — repairing against
      // guessed findings is worse than a needs-human stop.
      return { ok: false, reason: 'repair_findings_unavailable' };
    }
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
      '5. repair delta 전체를 self-review하라. 통과 시에만',
      '   `bd update ' +
        String(packet.bead_id) +
        ' --set-metadata impl_review=self@<새 head SHA> exec_receipt=delegated:codex@<새 head SHA>`를 기록하라.',
      '6. base로의 push, merge 실행, 두 번째 수정 라운드는 금지된다.',
      '',
      '마지막 출력 줄은 정확히 다음 한 줄이어야 한다(JSON 한 줄):',
      `${HEAD_REPAIR_RESULT_MARKER} {"self_review":"APPROVE"|"REVISE"}`
    ].join('\n');
    const run = await runAttempt({
      attempt_id: String(packet.attempt_id),
      reviewer: 'codex',
      effort: 'xhigh',
      bead_id: String(packet.bead_id),
      prompt,
      mode: null
    });
    if (!run.ok) {
      return run;
    }
    const result = parseRepairResultLine(run.text);
    if (!result) {
      return { ok: false, reason: 'repair_result_missing' };
    }
    const head = await probeHead(String(packet.bead_id));
    if (typeof head !== 'string' || !SHA40_RE.test(head)) {
      return { ok: false, reason: 'repair_head_unobservable' };
    }
    const exec_read = await metadataOf(String(packet.bead_id));
    const exec_receipt =
      typeof exec_read.metadata.exec_receipt === 'string'
        ? exec_read.metadata.exec_receipt
        : '';
    if (
      !exec_read.ok ||
      !exec_receipt.toLowerCase().endsWith(`@${head.toLowerCase()}`)
    ) {
      return { ok: false, reason: 'repair_exec_receipt_mismatch' };
    }
    return {
      ok: true,
      head_sha: head.toLowerCase(),
      self_review: result.self_review
    };
  }

  return {
    selectReviewer,
    readReceipt,
    writeReceipt,
    lineage,
    observeHead: probeHead,
    runReview,
    runRepair,
    stopAttempt
  };
}
