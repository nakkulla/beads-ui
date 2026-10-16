/**
 * The post-merge job runner (UI-i60a §1–§3): apply every job file a landed
 * commit carries exactly once per file content, before the landing's row may
 * close.
 *
 * ONE implementation for every Worker settlement that owns a landing — the PR
 * cleanup today, the direct-push quick_fix landing next (UI-1eag §3.1) — so the
 * ledger, reservation, succession and re-adoption rules cannot drift between
 * two copies. The runner knows no row kind: its caller hands in the landed
 * commit, the human retry authority, and two result callbacks, and records
 * whatever those callbacks return in its own vocabulary.
 *
 * WHERE A JOB RUNS (UI-1eag §3.2). Job NAMES always come from the landed tree
 * M. When the shared deploy worktree HEAD H already strictly descends from M
 * inside the freshly fetched target base, a name that still needs a run is
 * resolved in H's tree: the same blob runs at H under its own key, a
 * same-name blob whose `repo-ops-replaces` declaration names exactly M's key
 * runs at H through the existing reservation and succession, and anything else
 * stops on `post_merge_job_target_moved:<M's key>`. The ledger judgment always
 * comes first, so a key that is applied, validly superseded, or following a
 * reservation is never resolved at all. H is an observation for judgment only;
 * the coordinator's exact alignment inside the deploy lock stays the authority,
 * and the worktree is never rewound to M.
 */

/**
 * Where the post-merge job files live in a tree (UI-i60a §2). The directory's
 * EXISTENCE is the activation — `repo-ops/config.toml` has no key for it — so
 * an absent directory is a no-op, not a misconfiguration.
 */
export const POST_MERGE_JOB_DIR = 'repo-ops/post-merge.d';

/**
 * @typedef {Object} PostMergeJobEntry
 * @property {string} name - The job file's basename, which is also its
 * execution-order key (run-parts convention).
 * @property {string} mode - Git's six-digit entry mode.
 * @property {string} type - Git's object type for the entry.
 * @property {string} object_sha
 * @property {string} key - The ledger key `<filename>@<blob sha>`. Content
 * addressed, so editing the file yields a new key and exactly one new run.
 * @property {{ key: string, operation_id?: string }|null} [replaces]
 */

/**
 * What the row's settlement hands the runner. Both callbacks return the
 * caller's own NON-NULL stop result, which the runner returns unchanged; a
 * `null` from {@link PostMergeJobRunner.run} always means "the step is done".
 *
 * @template T
 * @typedef {Object} PostMergeJobRunInput
 * @property {string} bead_id - The row running the step; it becomes the
 * subject of every job operation the step records.
 * @property {string} merge_sha - The row's landed commit (a PR's merge SHA, a
 * direct push's receipt-bound landing head). Job names come from its tree.
 * @property {() => Promise<{ ok: true, base: string }|{ ok: false, reason: string }>} resolveTargetBase
 * - The landing's target base. Asked only once the tree carries a job.
 * @property {boolean} job_retry - A person's authority to re-run an
 * outcome-unknown job (`started` without terminal success). Only a human
 * retry of this step may carry it.
 * @property {(reason: string, evidence: { log_path?: string }) => Promise<T>|T} onFailure
 * - Record the step's stop under `reason`; `log_path` is the failing run's
 * preserved log, when one exists.
 * @property {() => Promise<T>|T} onPending - Report a live run this pass must
 * not duplicate.
 */

/**
 * @typedef {Object} RunContext
 * @property {any} operations - The repo-operation coordinator's job lane.
 * @property {string} merge_sha
 * @property {string} target_base
 * @property {boolean} job_retry
 * @property {string|null} pinned_target - The advanced deploy HEAD a revision
 * was resolved at; null resolves each entry that needs a run.
 * @property {string|null} origin_key - The landed-tree key a resolved revision
 * runs for, so a moved-target stop names the key the next judgment re-judges.
 * @property {(reason: string, evidence?: { log_path?: string }) => Promise<unknown>} fail
 * @property {() => Promise<unknown>} pending
 */

/**
 * @typedef {Object} PostMergeJobRunner
 * @property {<T>(input: PostMergeJobRunInput<T>) => Promise<T|null>} run
 */

/**
 * Read one `git ls-tree -z` listing of the job directory into filename order.
 *
 * Returns null — never a partial list — when a record cannot be parsed: a
 * listing this build cannot read in full is not evidence about which jobs are
 * pending, and skipping the unreadable part would silently drop a job.
 *
 * @param {string} stdout
 * @returns {PostMergeJobEntry[]|null}
 */
export function parsePostMergeJobEntries(stdout) {
  /** @type {PostMergeJobEntry[]} */
  const entries = [];
  for (const record of String(stdout ?? '').split('\0')) {
    if (record.length === 0) {
      continue;
    }
    const match = /^(\d{6}) ([a-z]+) ([0-9a-f]{40})\t(.+)$/.exec(record);
    if (!match) {
      return null;
    }
    const file_path = match[4];
    const name = file_path.slice(file_path.lastIndexOf('/') + 1);
    if (name.length === 0) {
      return null;
    }
    entries.push({
      name,
      mode: match[1],
      type: match[2],
      object_sha: match[3],
      key: `${name}@${match[3]}`
    });
  }
  // Byte order, not locale order: run-parts runs the C-locale sort, and a
  // locale-aware comparison would reorder the same directory per machine.
  entries.sort((left, right) =>
    left.name < right.name ? -1 : left.name > right.name ? 1 : 0
  );
  return entries;
}

/**
 * Whether one tree entry is a job file this build can execute.
 *
 * @param {PostMergeJobEntry} entry
 */
function regularJobFile(entry) {
  return (
    entry.type === 'blob' &&
    (entry.mode === '100644' || entry.mode === '100755')
  );
}

/**
 * @param {PostMergeJobEntry} entry
 * @param {string} source
 * @returns {{ ok: true, replaces: { key: string }|null }|{ ok: false, reason: string }}
 */
export function parsePostMergeJobReplacement(entry, source) {
  const candidates = String(source)
    .split(/\r?\n/)
    .slice(0, 32)
    .filter((line) => line.includes('repo-ops-replaces'));
  if (candidates.length === 0) {
    return { ok: true, replaces: null };
  }
  const match =
    candidates.length === 1
      ? /^# repo-ops-replaces: ([^@]+)@([0-9a-f]{40})$/.exec(candidates[0])
      : null;
  if (
    !match ||
    match[1] !== entry.name ||
    match[1].includes('/') ||
    match[1].includes('\\') ||
    match[2] === entry.object_sha
  ) {
    return {
      ok: false,
      reason: `post_merge_job_replacement_invalid:${entry.name}`
    };
  }
  return { ok: true, replaces: { key: `${match[1]}@${match[2]}` } };
}

/**
 * @param {string} key
 * @param {any} operation
 * @param {string} repo_id
 * @param {boolean} [success]
 */
export function postMergeJobOperationMatches(
  key,
  operation,
  repo_id,
  success = false
) {
  const match = /^([^/@\\]+)@([0-9a-f]{40})$/.exec(key);
  return (
    match !== null &&
    operation?.repo_id === repo_id &&
    operation.kind === 'job' &&
    operation.script_path === `${POST_MERGE_JOB_DIR}/${match[1]}` &&
    operation.script_blob_sha === match[2] &&
    (operation.script_mode === '100644' ||
      operation.script_mode === '100755') &&
    /^[0-9a-f]{40}$/.test(operation.target_sha) &&
    (!success ||
      (operation.state === 'succeeded' &&
        operation.exit_code === 0 &&
        operation.signal === null &&
        operation.failure === null &&
        typeof operation.started_at === 'number' &&
        typeof operation.finished_at === 'number'))
  );
}

/**
 * Name a coordinator refusal as a stop reason. The moved-target refusal
 * carries a ledger key, because that key — not the row — is what a later
 * landing or a retry re-judges.
 *
 * @param {unknown} code
 * @param {string} key
 * @returns {string}
 */
function postMergeJobFailureReason(code, key) {
  if (code === 'post_merge_job_target_moved') {
    return `post_merge_job_target_moved:${key}`;
  }
  return typeof code === 'string' && code.length > 0
    ? code
    : 'post_merge_job_failed';
}

/**
 * Create the runner for ONE workspace's repository.
 *
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: any,
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   repoOperations: any
 * }} deps - `repoOperations` is the coordinator's job lane, or null when the
 * workspace wires none (the step then stops on `repo_operations_unavailable`
 * once a job exists).
 * @returns {PostMergeJobRunner}
 */
export function createPostMergeJobRunner(deps) {
  const workspace = deps.workspace;
  const repo = deps.repo;

  /**
   * The `post_merge_jobs` step for one landed commit.
   *
   * @template T
   * @param {PostMergeJobRunInput<T>} input
   * @returns {Promise<T|null>}
   */
  async function run(input) {
    /**
     * @param {string} reason
     * @param {{ log_path?: string }} [evidence]
     */
    const fail = async (reason, evidence = {}) =>
      input.onFailure(reason, evidence);
    const merge_sha = input.merge_sha;
    const listed = await deps.gitRun(
      ['ls-tree', '-z', merge_sha, '--', `${POST_MERGE_JOB_DIR}/`],
      { cwd: repo }
    );
    // An absent directory IS a successful empty listing; a failed probe is not,
    // and must never fail open into "this merge had no jobs".
    if (listed.code !== 0) {
      return await fail('post_merge_jobs_unreadable');
    }
    const entries = parsePostMergeJobEntries(listed.stdout);
    if (entries === null) {
      return await fail('post_merge_jobs_unreadable');
    }
    if (entries.length === 0) {
      return null;
    }
    // The WHOLE directory is judged before anything runs: an entry this build
    // cannot execute stops the step instead of being skipped past, and doing it
    // up front means no job has run yet when it does.
    for (const entry of entries) {
      if (!regularJobFile(entry)) {
        return await fail(`post_merge_job_invalid:${entry.name}`);
      }
      const source = await deps.gitRun(['cat-file', 'blob', entry.object_sha], {
        cwd: repo
      });
      if (source.code !== 0) {
        return await fail(`post_merge_job_unreadable:${entry.name}`);
      }
      const declaration = parsePostMergeJobReplacement(entry, source.stdout);
      if (!declaration.ok) {
        return await fail(declaration.reason);
      }
      entry.replaces = declaration.replaces;
    }
    /** @type {any} */
    const operations = deps.repoOperations;
    if (
      !operations ||
      typeof operations.prepareJob !== 'function' ||
      typeof operations.launchJob !== 'function' ||
      typeof operations.reconcileJob !== 'function' ||
      typeof operations.waitForJobTerminal !== 'function' ||
      typeof operations.eligibleJobHead !== 'function'
    ) {
      return await fail('repo_operations_unavailable');
    }
    const expected = await input.resolveTargetBase();
    if (!expected.ok) {
      return await fail(expected.reason);
    }
    /** @type {RunContext} */
    const ctx = {
      operations,
      merge_sha,
      target_base: expected.base,
      job_retry: input.job_retry === true,
      pinned_target: null,
      origin_key: null,
      fail,
      pending: async () => input.onPending()
    };
    for (const entry of entries) {
      const outcome = await runOne(input.bead_id, entry, ctx);
      if (outcome !== null) {
        return /** @type {T} */ (outcome);
      }
    }
    return null;
  }

  /**
   * Settle one ledger key as applied and prove the write landed. The readback
   * is the point: `applied` is what suppresses every future run of this file,
   * so a write nobody confirmed would be a claim the ledger does not make.
   *
   * @param {PostMergeJobEntry} entry
   * @param {string} operation_id
   * @param {RunContext} ctx
   * @returns {Promise<unknown>}
   */
  async function settleApplied(entry, operation_id, ctx) {
    deps.store.applyPostMergeJob?.(workspace, {
      key: entry.key,
      operation_id,
      ...(entry.replaces?.operation_id ? { replaces: entry.replaces } : {})
    });
    const snapshot = deps.store.snapshot(workspace);
    const applied = snapshot.post_merge_jobs?.[entry.key] || null;
    const predecessor = entry.replaces?.operation_id
      ? snapshot.post_merge_jobs?.[entry.replaces.key] || null
      : null;
    if (
      applied?.state !== 'applied' ||
      (predecessor &&
        (predecessor.state !== 'superseded' ||
          predecessor.repair?.key !== entry.key ||
          predecessor.repair.operation_id !== operation_id))
    ) {
      return await ctx.fail(`post_merge_job_ledger_write_failed:${entry.key}`);
    }
    return null;
  }

  /**
   * Resolve one landed-tree job name in the advanced deploy HEAD tree
   * (UI-1eag §3.2). Only names the landed tree carries are ever resolved; a
   * name that first appears in the HEAD tree belongs to its own landing.
   *
   * The same blob answers the landed key itself (with the HEAD's entry mode,
   * since that is the file the aligned worktree holds). A different blob
   * answers only when it is a regular file whose declaration — parsed with the
   * landed tree's own strictness — replaces exactly the landed key. Every
   * other shape is the moved-target stop, written before anything is recorded.
   *
   * @param {PostMergeJobEntry} entry - The landed-tree entry, already judged.
   * @param {string} head
   * @returns {Promise<{ ok: true, entry: PostMergeJobEntry }|{ ok: false, reason: string }>}
   */
  async function resolveAtHead(entry, head) {
    const moved = /** @type {const} */ ({
      ok: false,
      reason: `post_merge_job_target_moved:${entry.key}`
    });
    const listed = await deps.gitRun(
      ['ls-tree', '-z', head, '--', `${POST_MERGE_JOB_DIR}/`],
      { cwd: repo }
    );
    const entries =
      listed.code === 0 ? parsePostMergeJobEntries(listed.stdout) : null;
    if (entries === null) {
      return { ok: false, reason: 'post_merge_jobs_unreadable' };
    }
    const found = entries.find((candidate) => candidate.name === entry.name);
    if (!found || !regularJobFile(found)) {
      return moved;
    }
    if (found.object_sha === entry.object_sha) {
      return { ok: true, entry: { ...entry, mode: found.mode } };
    }
    const source = await deps.gitRun(['cat-file', 'blob', found.object_sha], {
      cwd: repo
    });
    if (source.code !== 0) {
      return { ok: false, reason: `post_merge_job_unreadable:${entry.name}` };
    }
    const declaration = parsePostMergeJobReplacement(found, source.stdout);
    if (!declaration.ok || declaration.replaces?.key !== entry.key) {
      return moved;
    }
    return { ok: true, entry: { ...found, replaces: declaration.replaces } };
  }

  /**
   * The landed key already reserved a revision (`repair`): its run is the
   * only thing this key may follow, and the old blob never runs again.
   *
   * A revision run that ended failed is re-run once more only where the
   * existing rules allow it — automatically when it never started, under
   * `job_retry` when it did — and only when the advanced deploy HEAD still
   * carries that exact revision blob under the name. The re-run is the same
   * revision retry the revision's own row performs, so its one CAS replaces
   * the revision intent's operation and this key's `repair` pointer together.
   *
   * @param {string} bead_id
   * @param {PostMergeJobEntry} entry
   * @param {any} ledger - The landed key's ledger record, carrying `repair`.
   * @param {any} snapshot - The queue read the judgment started from.
   * @param {RunContext} ctx
   * @returns {Promise<unknown>}
   */
  async function followRepair(bead_id, entry, ledger, snapshot, ctx) {
    let judged;
    try {
      judged = await ctx.operations.reconcileJob(ledger.repair.operation_id);
    } catch {
      judged = { state: 'probe_error', code: 'probe_error' };
    }
    if (judged.state === 'succeeded') {
      const successor = snapshot.post_merge_jobs?.[ledger.repair.key] || null;
      if (!successor) {
        return await ctx.fail(`post_merge_job_succession_invalid:${entry.key}`);
      }
      return await settleApplied(
        {
          ...entry,
          key: ledger.repair.key,
          replaces: { key: entry.key, operation_id: ledger.operation_id }
        },
        ledger.repair.operation_id,
        ctx
      );
    }
    if (judged.state === 'running') {
      return await ctx.pending();
    }
    if (
      judged.state === 'failed' &&
      (judged.started !== true || ctx.job_retry)
    ) {
      const head =
        ctx.pinned_target ??
        (await ctx.operations.eligibleJobHead({
          target_base: ctx.target_base,
          merge_sha: ctx.merge_sha
        }));
      if (head !== null) {
        const resolved = await resolveAtHead(entry, head);
        if (resolved.ok && resolved.entry.key === ledger.repair.key) {
          return await runOne(bead_id, resolved.entry, {
            ...ctx,
            pinned_target: head,
            origin_key: ctx.origin_key ?? entry.key
          });
        }
      }
    }
    return await ctx.fail(
      `post_merge_job_repair_failed:${ledger.repair.key}:${judged.code || 'unknown'}`,
      { log_path: judged.log_path }
    );
  }

  /**
   * One job file's whole judgement: skip, re-adopt, wait, terminate, or run —
   * and, when it runs, where (UI-1eag §3.2).
   *
   * @param {string} bead_id
   * @param {PostMergeJobEntry} entry
   * @param {RunContext} ctx
   * @returns {Promise<unknown>}
   */
  async function runOne(bead_id, entry, ctx) {
    const operations = ctx.operations;
    const snapshot = deps.store.snapshot(workspace);
    const ledger = snapshot.post_merge_jobs?.[entry.key] || null;
    const predecessor = entry.replaces
      ? snapshot.post_merge_jobs?.[entry.replaces.key] || null
      : null;
    /** @type {string|null} */
    let supersedes = null;
    if (ledger?.state === 'superseded') {
      const successor = snapshot.post_merge_jobs?.[ledger.repair?.key] || null;
      const operation = snapshot.repo_operations?.[ledger.operation_id] || null;
      const successor_operation =
        snapshot.repo_operations?.[ledger.repair?.operation_id];
      if (
        successor?.state === 'applied' &&
        successor.operation_id === ledger.repair?.operation_id &&
        successor.replaces?.key === entry.key &&
        successor.replaces?.operation_id === ledger.operation_id &&
        operation?.superseded_by === ledger.repair?.operation_id &&
        postMergeJobOperationMatches(
          ledger.repair.key,
          successor_operation,
          repo,
          true
        )
      ) {
        return null;
      }
      return await ctx.fail(`post_merge_job_succession_invalid:${entry.key}`);
    }
    if (ledger?.repair) {
      return await followRepair(bead_id, entry, ledger, snapshot, ctx);
    }
    let repair = null;
    if (entry.replaces && predecessor?.state === 'intent') {
      const predecessor_operation =
        snapshot.repo_operations?.[predecessor.operation_id];
      if (
        predecessor.repo_id !== repo ||
        !predecessor_operation ||
        !postMergeJobOperationMatches(
          entry.replaces.key,
          predecessor_operation,
          repo
        )
      ) {
        return await ctx.fail(
          `post_merge_job_replacement_ineligible:${entry.key}`
        );
      }
      let judged;
      try {
        judged = await operations.reconcileJob(predecessor.operation_id);
      } catch {
        judged = { state: 'probe_error', code: 'probe_error' };
      }
      if (judged.state === 'succeeded') {
        deps.store.applyPostMergeJob?.(workspace, {
          key: entry.replaces.key,
          operation_id: predecessor.operation_id
        });
      } else if (judged.state === 'running' || judged.state === 'unknown') {
        return await ctx.fail(
          `post_merge_job_replacement_ineligible:${entry.key}`
        );
      } else if (judged.state === 'failed') {
        repair = {
          key: entry.replaces.key,
          operation_id: predecessor.operation_id
        };
        entry.replaces = { ...repair };
      } else {
        return await ctx.fail(
          `post_merge_job_replacement_ineligible:${entry.key}`
        );
      }
    }
    /** @type {{ log_path?: string }|null} */
    let unauthorized = null;
    if (ledger) {
      if (ledger.state === 'applied') {
        return null;
      }
      // A terminal RepoOperation never reopens, so the record the intent names
      // is reconciled FIRST and its own evidence decides (§3 branches ①②③).
      let judged;
      try {
        judged = await operations.reconcileJob(ledger.operation_id);
      } catch {
        judged = { state: 'unknown', operation_id: ledger.operation_id };
      }
      if (judged.state === 'succeeded') {
        return await settleApplied(entry, ledger.operation_id, ctx);
      }
      if (judged.state === 'running') {
        // Branch ①: an execution is still alive. Waiting is not a failure —
        // it is the same pending result a non-terminal deploy produces.
        return await ctx.pending();
      }
      const never_started =
        judged.state === 'failed' && judged.started !== true;
      // A record that failed before any spawn is not an unknown outcome: the
      // script demonstrably never ran, so the key is still pending and needs no
      // human authority to re-record. §2 promises exactly this exit for a
      // refused re-alignment, whose operation is terminally failed while the
      // job itself never started.
      if (!ctx.job_retry && !never_started) {
        // The effect of an interrupted run is unknown, and guessing either way
        // is worse than stopping: re-running risks a second application, and
        // writing `applied` risks recording one that never happened. The stop
        // waits for the target below, because a revision the deploy HEAD
        // declares for this key needs only the failure, not this authority.
        unauthorized = { log_path: judged.log_path };
      }
      // Branch ③ (and the never-started case above): re-record rather than
      // reopen, because a terminal RepoOperation never returns to `queued`.
      supersedes = ledger.operation_id;
    }
    let run_entry = entry;
    let target_sha = ctx.pinned_target ?? ctx.merge_sha;
    if (ctx.pinned_target === null) {
      const head = await operations.eligibleJobHead({
        target_base: ctx.target_base,
        merge_sha: ctx.merge_sha
      });
      if (head !== null) {
        const resolved = await resolveAtHead(entry, head);
        if (!resolved.ok) {
          return await ctx.fail(resolved.reason);
        }
        if (resolved.entry.key !== entry.key) {
          // The HEAD carries a revision of this key: run THAT through the
          // existing reservation and succession, never the old blob.
          return await runOne(bead_id, resolved.entry, {
            ...ctx,
            pinned_target: head,
            origin_key: entry.key
          });
        }
        run_entry = resolved.entry;
        target_sha = head;
      }
    }
    if (unauthorized !== null) {
      return await ctx.fail(
        `post_merge_job_outcome_unknown:${entry.key}`,
        unauthorized
      );
    }
    const moved_key = ctx.origin_key ?? entry.key;
    const prepared = await operations.prepareJob({
      target_base: ctx.target_base,
      target_sha,
      bead_id,
      script_path: `${POST_MERGE_JOB_DIR}/${run_entry.name}`,
      script_mode: run_entry.mode,
      script_blob_sha: run_entry.object_sha
    });
    if (prepared.ok !== true || typeof prepared.operation_id !== 'string') {
      return await ctx.fail(
        postMergeJobFailureReason(prepared.code, moved_key)
      );
    }
    // One mutation carries the whole swap: the CAS on the old pointer, the new
    // intent, and the audit lineage that records which run replaced which. Kept
    // apart, an interruption between them could leave a lineage pointing at an
    // operation this ledger never adopted.
    const claimed = deps.store.recordPostMergeJobIntent?.(workspace, {
      key: run_entry.key,
      operation_id: prepared.operation_id,
      repo_id: repo,
      ...(repair === null ? {} : { replaces: repair }),
      ...(supersedes === null ? {} : { expect_operation_id: supersedes }),
      ...(supersedes === null || supersedes === prepared.operation_id
        ? {}
        : { supersede_operation_id: supersedes })
    });
    const intent =
      deps.store.snapshot(workspace).post_merge_jobs?.[run_entry.key] || null;
    if (
      claimed?.ok !== true ||
      intent?.state !== 'intent' ||
      intent.operation_id !== prepared.operation_id
    ) {
      return await ctx.fail(
        `post_merge_job_ledger_write_failed:${run_entry.key}`
      );
    }
    const launched = await operations.launchJob({
      operation_id: prepared.operation_id
    });
    if (launched.ok !== true) {
      return await ctx.fail(
        postMergeJobFailureReason(launched.code, moved_key)
      );
    }
    const evidence = await operations.waitForJobTerminal(
      prepared.operation_id,
      { timeout_ms: prepared.timeout_ms }
    );
    if (evidence.state === 'succeeded') {
      return await settleApplied(run_entry, prepared.operation_id, ctx);
    }
    if (evidence.state === 'failed') {
      return await ctx.fail(evidence.code || 'post_merge_job_failed', {
        log_path: evidence.log_path
      });
    }
    if (evidence.state === 'unknown') {
      return await ctx.fail(`post_merge_job_outcome_unknown:${run_entry.key}`);
    }
    return await ctx.pending();
  }

  return { run };
}
