/**
 * `RepairSessionAdapter` (master spec §4.4, §9.3).
 *
 * It normalizes ONE terminal RepoOperation failure into a dispatch packet and
 * hands it to the scheduler's existing session Interface — no second session
 * runner, no per-kind agent. Three rules shape everything here:
 *
 *   1. The packet carries the failure's exact input, the sanitized output/log,
 *      the spec/plan `Test scope`, and the current review/PR facts.
 *   2. Its prohibitions are the pinned contract's `never_automatic` enum, so
 *      the gate and the prompt forbid exactly the same things.
 *   3. The outcome is judged by FRESH git and operation readback. A session
 *      that says it fixed the failure has proved nothing; only a terminal
 *      success in the chain, or repo facts that moved, change any state.
 */
import path from 'node:path';
import {
  classifyRepoOperationFailure,
  repairSessionProhibitions
} from './repo-operation-policy.js';
import { normalizeScriptRetry, scriptIdentity } from './resolution-ladder.js';

/**
 * Patterns whose MATCHED TEXT must never reach a packet, a prompt, or the
 * durable record. Credential shapes only — never the surrounding log line,
 * which is the diagnostic the session needs.
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

/** Maximum sanitized log tail carried in the packet. */
const LOG_TAIL_BYTES = 4000;

/**
 * Remove credential-shaped substrings. Called on everything that leaves a log
 * file: the packet, the prompt, and the durable evidence line.
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

/**
 * The deterministic repair owner for a coalesced multi-subject operation
 * (§9.3): the subject whose `merged_sha` is contained in the bound target and
 * newest, ties broken by the lexicographically first `bead_id`. A single
 * subject owns itself without asking git anything.
 *
 * @param {{ gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string }>, repo: string }} deps
 * @param {{ subjects: { bead_id: string, merged_sha: string }[], target_sha: string|null }} operation
 * @returns {Promise<string|null>}
 */
export async function resolveRepairOwner(deps, operation) {
  const subjects = Array.isArray(operation.subjects) ? operation.subjects : [];
  if (subjects.length === 0) {
    return null;
  }
  if (subjects.length === 1) {
    return subjects[0].bead_id;
  }
  /** @type {{ bead_id: string, timestamp: number, contained: boolean }[]} */
  const candidates = [];
  for (const subject of subjects) {
    const contained =
      typeof operation.target_sha === 'string'
        ? (
            await deps.gitRun(
              [
                'merge-base',
                '--is-ancestor',
                subject.merged_sha,
                operation.target_sha
              ],
              { cwd: deps.repo }
            )
          ).code === 0
        : true;
    const stamped = await deps.gitRun(
      ['log', '-1', '--format=%ct', subject.merged_sha],
      { cwd: deps.repo }
    );
    const timestamp = Number.parseInt(stamped.stdout.trim(), 10);
    candidates.push({
      bead_id: subject.bead_id,
      timestamp: Number.isFinite(timestamp) ? timestamp : -1,
      contained
    });
  }
  // Containment first: a subject the bound target does not contain cannot own
  // the repair for that target. When none is contained the whole set stays
  // eligible rather than leaving the operation ownerless.
  const contained = candidates.filter((candidate) => candidate.contained);
  const pool = contained.length > 0 ? contained : candidates;
  pool.sort(
    (left, right) =>
      right.timestamp - left.timestamp ||
      left.bead_id.localeCompare(right.bead_id)
  );
  return pool[0]?.bead_id ?? null;
}

/**
 * The tree/script/environment evidence a repeated failure is compared against
 * (§9.3). Two failures with the same fingerprint AND the same evidence are the
 * same failure reproducing, which buys no further automatic budget.
 *
 * @param {any} operation
 * @returns {string}
 */
export function repairEvidenceKey(operation) {
  return [
    operation.target_sha || '',
    operation.target_tree || '',
    operation.script_blob_sha || '',
    operation.script_mode || '',
    operation.effective_base_sha || ''
  ].join('|');
}

/**
 * @param {{ store: any, gitRun: any, repo: string, dispatchSession: (input: any) => Promise<{ ok: boolean, attempt_id?: string, session_id?: string|null, reason?: string }>, fs?: typeof import('node:fs'), beadFacts?: (bead_id: string) => Promise<{ review?: any, test_scope?: any }> }} deps
 */
export function createRepairSessionAdapter(deps) {
  /**
   * Read the tail of the operation log, sanitized. A missing or unreadable log
   * yields '' — the packet says so rather than inventing evidence.
   *
   * @param {string|null} log_path
   * @returns {string}
   */
  function logTail(log_path) {
    if (typeof log_path !== 'string' || log_path.length === 0 || !deps.fs) {
      return '';
    }
    try {
      const text = deps.fs.readFileSync(log_path, 'utf8');
      return sanitizeOutput(
        text.length > LOG_TAIL_BYTES ? text.slice(-LOG_TAIL_BYTES) : text
      );
    } catch {
      return '';
    }
  }

  /**
   * Normalize one failure into the dispatch packet (§9.3). Everything in it is
   * an OBSERVATION: the exact input that failed, the sanitized output, the
   * `Test scope` of the governing spec/plan, and the current review/PR facts.
   *
   * @param {{ workspace: string, operation_id: string, operation: any, mode: 'auto'|'manual', owner_bead: string|null }} input
   */
  async function buildPacket(input) {
    const operation = input.operation;
    const failure = operation.failure || null;
    const owner_bead = input.owner_bead;
    const queue = deps.store.snapshot(input.workspace);
    const chain_id = operation.repair.chain_id || input.operation_id;
    const retry = normalizeScriptRetry(operation);
    // The case that matters most is the retry that FAILED AGAIN: the session
    // must see the first failure's fingerprint to recognize it is looking at a
    // reproduction rather than a fresh symptom. Reading only `absorbed` would
    // carry evidence exactly when the retry succeeded and no session runs, and
    // drop it on the path that dispatches one.
    const retry_evidence = operation.retry?.absorbed
      ? {
          first_fingerprint: operation.retry.absorbed.first_fingerprint,
          at: operation.retry.absorbed.at
        }
      : operation.retry?.first_fingerprint
        ? {
            first_fingerprint: operation.retry.first_fingerprint,
            at: operation.retry.first_failed_at ?? null
          }
        : null;
    const prior_fingerprints = Object.entries(queue.repo_operations || {})
      .filter(
        ([, candidate]) =>
          (candidate.repair?.chain_id || null) === chain_id &&
          (candidate.state === 'failed' || candidate.state === 'repairing') &&
          typeof candidate.failure?.code === 'string' &&
          typeof candidate.failure?.fingerprint === 'string'
      )
      .map(([operation_id, candidate]) => ({
        operation_id,
        code: candidate.failure.code,
        fingerprint: candidate.failure.fingerprint
      }));
    /** @type {{ review?: any, test_scope?: any }} */
    let facts = {};
    if (owner_bead && deps.beadFacts) {
      try {
        facts = (await deps.beadFacts(owner_bead)) || {};
      } catch {
        facts = {};
      }
    }
    return {
      schema: 1,
      mode: input.mode,
      workspace: input.workspace,
      owner_bead,
      operation: {
        operation_id: input.operation_id,
        kind: operation.kind,
        step: operation.step ?? null,
        reason: operation.reason ?? null,
        repo: deps.repo,
        target_base: operation.target_base,
        target_sha: operation.target_sha,
        target_tree: operation.target_tree,
        effective_base_sha: operation.effective_base_sha,
        script_blob_sha: operation.script_blob_sha,
        script_mode: operation.script_mode,
        script_identity: scriptIdentity(operation),
        script_object_type: operation.script_object_type,
        attempt_id: operation.attempt_id,
        exit_code: operation.exit_code,
        signal: operation.signal,
        started_at: operation.started_at,
        finished_at: operation.finished_at
      },
      subjects: (operation.subjects || []).map(
        (/** @type {any} */ subject) => ({
          bead_id: subject.bead_id,
          merged_sha: subject.merged_sha
        })
      ),
      failure: failure
        ? {
            code: failure.code,
            classification: classifyRepoOperationFailure(operation),
            fingerprint: failure.fingerprint,
            detail: sanitizeOutput(failure.detail),
            interrupted: failure.interrupted === true
          }
        : null,
      log: {
        path: operation.log_path,
        digest: operation.log_digest,
        tail:
          typeof operation.output_tail === 'string'
            ? sanitizeOutput(operation.output_tail)
            : logTail(operation.log_path)
      },
      chain: {
        chain_id,
        auto_budget: operation.repair.auto_budget,
        auto_used: operation.repair.auto_used
      },
      ladder: {
        script_retry:
          retry.status === 'unconsumed' ? 'not_applicable' : retry.status,
        script_retry_evidence: retry_evidence,
        auto_repair_session:
          operation.repair.auto_used > 0 ? 'consumed' : 'unused',
        stage:
          input.mode === 'manual'
            ? 'user_triggered_session'
            : 'auto_repair_session',
        prior_fingerprints
      },
      test_scope: facts.test_scope ?? null,
      review: facts.review ?? null,
      prohibitions: repairSessionProhibitions()
    };
  }

  /**
   * Dispatch one repair attempt through the scheduler's session Interface. The
   * caller has already prerecorded the durable `repairing` state and, for an
   * automatic dispatch, spent the chain budget — a spawn refusal here therefore
   * never buys a second automatic try.
   *
   * @param {{ workspace: string, operation_id: string, operation: any, mode: 'auto'|'manual', owner_bead: string|null }} input
   */
  async function dispatch(input) {
    if (!input.owner_bead) {
      return { ok: false, reason: 'repair_owner_unresolved' };
    }
    const packet = await buildPacket(input);
    let result;
    try {
      result = await deps.dispatchSession({
        workspace: input.workspace,
        bead_id: input.owner_bead,
        operation_id: input.operation_id,
        packet
      });
    } catch {
      return { ok: false, reason: 'repair_dispatch_failed' };
    }
    if (
      !result ||
      result.ok !== true ||
      typeof result.attempt_id !== 'string'
    ) {
      return {
        ok: false,
        reason: (result && result.reason) || 'repair_dispatch_failed'
      };
    }
    return {
      ok: true,
      attempt_id: result.attempt_id,
      session_id:
        typeof result.session_id === 'string' ? result.session_id : null
    };
  }

  /**
   * Judge a dispatched repair from FRESH facts only (§4.4). The session's own
   * report is not an input and is never read here: the verdict comes from the
   * durable operation records in the chain and, for `covered`, from git.
   *
   * @param {{ workspace: string, operation_id: string }} input
   * @returns {Promise<{ verdict: 'chain_closed'|'session_running'|'unresolved', evidence: string|null }>}
   */
  async function judge(input) {
    const queue = deps.store.snapshot(input.workspace);
    if (input.operation_id.startsWith('cleanup:')) {
      const bead_id = input.operation_id.slice('cleanup:'.length);
      const failure = queue.cleanup_failed?.[bead_id];
      if (!failure) {
        return { verdict: 'chain_closed', evidence: bead_id };
      }
      const attempt_id = failure.repair?.attempt_id;
      const attempt = attempt_id ? queue.attempts?.[attempt_id] : null;
      if (attempt && attempt.status === 'running') {
        return { verdict: 'session_running', evidence: attempt_id };
      }
      return { verdict: 'unresolved', evidence: null };
    }
    const operation = queue.repo_operations[input.operation_id];
    if (!operation) {
      return { verdict: 'unresolved', evidence: null };
    }
    const chain_id = operation.repair.chain_id || input.operation_id;
    for (const [candidate_id, candidate] of Object.entries(
      queue.repo_operations
    )) {
      const candidate_chain = /** @type {any} */ (candidate).repair?.chain_id;
      if (
        candidate_chain === chain_id &&
        /** @type {any} */ (candidate).state === 'succeeded'
      ) {
        return { verdict: 'chain_closed', evidence: candidate_id };
      }
    }
    const attempt_id = operation.repair.attempt_id;
    const attempt = attempt_id ? queue.attempts?.[attempt_id] : null;
    if (attempt && attempt.status === 'running') {
      return { verdict: 'session_running', evidence: attempt_id };
    }
    return { verdict: 'unresolved', evidence: null };
  }

  return { buildPacket, dispatch, judge, sanitizeOutput, logTail };
}

/**
 * Render the packet as the session prompt. It states the observed failure, the
 * evidence locations, and the prohibitions — and it explicitly refuses to
 * accept the session's own claim as the outcome, because the coordinator will
 * judge from git and the operation record either way.
 *
 * @param {any} packet
 * @returns {string}
 */
export function repairSessionPrompt(packet) {
  const operation = packet.operation || {};
  const failure = packet.failure || {};
  const lines = [
    `repo operation ${operation.kind} 실패를 진단하고 고쳐라 — operation=${operation.operation_id}, target=${operation.target_base}@${operation.target_sha || '?'}, script blob=${operation.script_blob_sha} mode=${operation.script_mode}.`,
    `실패 분류=${failure.classification || failure.code || '?'}, code=${failure.code || '?'}, exit=${operation.exit_code ?? '?'}, signal=${operation.signal ?? '없음'}, fingerprint=${failure.fingerprint || '?'}.`
  ];
  if (packet.ladder) {
    lines.push(`앞 단계 결과: ${JSON.stringify(packet.ladder)}`);
  }
  if (packet.log && packet.log.path) {
    lines.push(`전체 로그: ${packet.log.path}`);
  }
  if (packet.log && packet.log.tail) {
    lines.push(`로그 tail (secret 제거됨):\n${packet.log.tail}`);
  }
  if (packet.test_scope && packet.test_scope.path) {
    lines.push(
      `Test scope: ${packet.test_scope.path}${
        packet.test_scope.section ? ` — ${packet.test_scope.section}` : ''
      }`
    );
  }
  if (packet.review) {
    lines.push(
      `현재 review/PR 사실: ${JSON.stringify(packet.review)} (관측값이며, 네가 바꿀 대상이 아니다)`
    );
  }
  lines.push(
    '허용: 코드 또는 repo operation script 수정 + focused test 실행, 필요한 review 갱신, commit/push/corrective PR, 안전한 environment 수리 후 같은 target operation의 새 attempt 요청.'
  );
  lines.push(
    `금지 (계약 enum ${(packet.prohibitions || []).join(', ')}): verify/deploy 선언이나 script를 삭제해 실패를 성공으로 바꾸지 마라. credential을 출력·저장·추측하지 마라. destructive action이나 history rewrite를 묻지 않고 실행하지 마라. operation이나 Bead를 자기보고로 success/closed 처리하지 마라. 실패한 자신을 다시 dispatch하지 마라.`
  );
  lines.push(
    '결과는 네 보고가 아니라 fresh git/operation readback으로 판정된다 — 성공했다고 쓰는 것으로는 아무것도 바뀌지 않는다.'
  );
  return lines.join('\n\n');
}

/**
 * Locate the governing spec/plan `Test scope` for a bead from its workflow
 * metadata. Path only: reading the document is the session's job, and beads-ui
 * never restates a contract it consumes.
 *
 * @param {{ spec_id?: string|null, plan_path?: string|null }} metadata
 * @returns {{ path: string, section: string }|null}
 */
export function testScopeOf(metadata) {
  const target =
    (typeof metadata.plan_path === 'string' && metadata.plan_path.length > 0
      ? metadata.plan_path
      : null) ||
    (typeof metadata.spec_id === 'string' && metadata.spec_id.length > 0
      ? metadata.spec_id
      : null);
  if (!target) {
    return null;
  }
  return { path: path.normalize(target), section: 'Test scope' };
}
