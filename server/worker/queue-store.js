/**
 * Worker queue store — persistence + revision-CAS concurrency guard.
 *
 * NO EXECUTION lives here (that is Phase 10). This module only owns durable
 * queue placement: which beads sit in the waiting `queue` / PR-wait lane / Done
 * lane, the `auto_advance` flag, the concurrency cap `slots`, and the
 * per-attempt record container (spec §5.2). Ordering mutations are guarded by an
 * integer `revision` CAS so a stale client's drag can never clobber a newer
 * ordering (spec §5.1).
 *
 * Persistence: one `queue.json` per workspace under
 * `$XDG_STATE_HOME/bdui/<slug>/` (see state-paths.js). Writes are atomic
 * (temp file + rename) so a crash mid-write never leaves a partial file.
 *
 * Restart safety: `load()` ALWAYS forces `auto_advance = false` regardless of
 * the persisted value, so beads-ui never auto-resumes execution after a crash
 * (spec §5.3). The reset is in-memory; the corrected value is flushed to disk
 * on the next mutation.
 *
 * @typedef {Object} QueueEntry
 * @property {string} bead_id - The bead placed in this lane.
 * @property {number} added_at - Epoch ms the bead entered this lane.
 * @property {string|null} [merge_sha] - Observed merge commit for deployment coverage.
 * @property {string|null} [verified_target_sha] - Verified target SHA submitted to the provider.
 * @property {number|null} [deployment_generation] - Provider generation bound to this row.
 * @property {string|null} [cleanup_cursor] - Next post-deployment cleanup step.
 * @property {string|null} [head_ref] - Branch identity retained for deferred cleanup.
 * @property {string|null} [pr_url] - PR URL retained for deferred notification.
 */
/**
 * Per-attempt record container (spec §5.2). Phase 9 persists the shape; Phase 10
 * fills the runtime fields at dispatch time. Runtime fields default to null.
 *
 * @typedef {Object} Attempt
 * @property {string} attempt_id - Stable id for this launch attempt.
 * @property {string} bead_id - Bead this attempt runs.
 * @property {string|null} base_oid - Git base OID snapshotted at dispatch.
 * @property {string|null} head_oid - Git head OID at dispatch.
 * @property {number|null} started_at - Epoch ms the session started.
 * @property {number|null} pid - OS process id of the runner.
 * @property {{ pid: number, pgid: number, started_at: number }|null} process_identity -
 * Verified detached process-group identity used for restart-safe control.
 * @property {{ kind: 'pause', phase: 'requested'|'signaled'|'terminated'|'done'|'failed', requested_at: number, last_error: string|null }|null} control -
 * Durable pause intent and monotonic recovery phase.
 * @property {string|null} runner - Runner adapter (claude/codex/ccx).
 * @property {string|null} session_id - Runner session identifier (claude
 * `session_id` / codex `thread_id`) captured from the stream's first event for
 * `--resume`/transcript tracking; null until the runner emits it (spec §2).
 * @property {string|null} model - Model snapshot.
 * @property {string|null} effort - Effort snapshot.
 * @property {string|null} speed - Orchestration service tier snapshot.
 * @property {number|null} exit - Process exit code.
 * @property {unknown} verify_result - Worker independent-verification result.
 * @property {{ pinned?: string, observed?: string, landed?: boolean, via?: string, shas?: string[], pushed?: string[], inherited?: string[], skipped?: string, error?: string }|null} base_drift -
 * The POST-HOC base observation (UI-8mvc §3, rebuilt UI-1xcd §4), written at
 * every termination path: the pinned `base_oid`, the remote tip re-resolved
 * after the session ended, and — from the attempt's OWN pre-push record —
 * whether it pushed at its base and whether that push is on the base now.
 * `pushed` holds the base-destined oids the hook recorded (present as `[]` when
 * the record was readable and held none); `shas` narrows that to the ones
 * reachable from the observed tip, which is a violation's whole evidence.
 * `skipped` records an attempt the invariant does not apply to (a disposition,
 * or an external-conflict dispatch with no pinned base) and `error` the
 * observation step that could not be completed — including `push_log_absent`,
 * the attempt dispatched before the record existed. A failed observation is
 * deliberately NOT a violation. Null on every attempt observed before the field
 * existed and on one whose base never moved: there is nothing to say.
 * `inherited` is retired (the reflog precedence stage it belonged to is gone)
 * and kept in the shape only so a legacy record round-trips.
 * @property {string|null} repo - Target repo root (the reconcile's observation
 * scope: a dead attempt's PR is looked for in THIS repo).
 * @property {string|null} status - Attempt lifecycle: running/done/failed/
 * orphaned/paused/stopped/discarded. `paused` is resumable; `stopped` is legacy
 * history; `discarded` is the unified archive-backed terminal action.
 * @property {string|null} workflow_mode_prior - workflow_mode value snapshotted before launch (null=was unset).
 * @property {string|null} target_base - Merge target base at dispatch.
 * @property {number|null} finished_at - Epoch ms the attempt terminated.
 * @property {string|null} cause - Failure cause (failure banner reason).
 * @property {{ reason: string, command: string|null }|null} cause_detail -
 * What the fail-closed path actually caught, when the cause alone cannot say
 * it (UI-2o4z §2): the guard `reason` plus the simple command it matched
 * (`command` null for an interactive-question blocker). Only the
 * `loud_fail_blocker` cause carries one; every other failure leaves it null.
 * @property {number|null} dismissed_at - Epoch ms a human closed (✕) this
 * failure's banner, declaring it handled. Null means "still unhandled", which
 * is one of the two ways the UI stops showing a failure banner (the other is
 * being superseded by a later attempt for the same bead).
 * @property {{ input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number, reasoning_output_tokens?: number, total_cost_usd?: number }|null} usage -
 * Token usage this attempt consumed (UI-raqh §1), persisted when the session
 * ends (success/failure/pause/stop) from the live tally in `usage-store.js`.
 * Null on an attempt whose runner reported none and on every record written
 * before the field existed — the display is fail-quiet, so a null simply
 * renders nothing.
 * @property {UsageLeg[]} usage_legs - Completed nested provider usage receipts.
 * Legacy attempts normalize this optional field to an empty list.
 *
 * RETIRED merge-axis fields (worker-phase2 §2). New attempts never write them,
 * but attempt history is immutable (§9), so the shape is preserved so a legacy
 * `queue.json` round-trips through {@link makeAttempt} without losing a record
 * of what the old regime did:
 * @property {string|null} merge_sha - SERVER-observed merge SHA.
 * @property {string|null} merge_policy - Resolved merge policy at dispatch.
 * @property {string|null} drift_policy - Resolved drift policy at dispatch.
 * @property {string|null} demoted_reason - Why the merge policy was demoted.
 * @property {string|null} release_rejected - Last rejected merge-lock release.
 * @property {string|null} done_kind - How the attempt completed.
 * @property {unknown} verify_cmd_result - Post-merge verify_cmd result.
 * @property {string[]|null} exec_stamped_keys - Exec-setting metadata keys
 * stamped onto the bead at dispatch (bead-absent keys filled from the
 * workspace-global default). Recorded durably BEFORE the first metadata write
 * so a restart's reconcile can revert them; null when nothing was stamped.
 * @property {string|null} exec_default_preset_id - Selected workspace preset
 * ID snapshotted for this fresh dispatch; null when the workspace used harness
 * fallbacks without a selected preset.
 * @property {number|null} exec_default_preset_revision - Global preset-store
 * revision paired with `exec_default_preset_id`; null without a selected
 * preset. Together they prove which mutable preset version the attempt pinned.
 * @property {Record<string, string|null>|null} exec_values - Effective resolved
 * values from the 12-key dispatch contract, kept independently from the worker
 * stamp subset so relaunch decisions can prove their exact current or explicit
 * prior provenance. Null on legacy attempts.
 * @property {string|null} resumed_from - Prior attempt_id this attempt resumes
 * (manual session resume, spec §1); null for a first-launch attempt. The
 * `already_resumed` guard scans attempts for a child carrying this so a failed
 * attempt is resumed at most once — a scan-derived judgment that survives cold
 * reload.
 * @property {'session'|'fresh'|null} continuation_mode - Whether this child
 * reused the provider session or started a replacement session. Null keeps
 * legacy history neutral.
 * @property {Record<string, string|null>|null} exec_restore_values - Raw bead
 * metadata observed immediately before this attempt overlaid exec stamps.
 * @property {{ mismatch: Record<string, unknown>, continuation: null }|null} continuation_action -
 * Durable action-required descriptor when a background relaunch cannot choose
 * across runners. Null on ordinary attempts.
 * @property {boolean} conflict_resolution - Whether this attempt was dispatched
 * to RESOLVE a PR conflict (worker-phase2 §6). It is the single input that
 * relaxes the session-side base-into-branch `git merge` guard, so it is
 * recorded durably: a reconcile pass or a restart must be able to see what kind
 * of attempt this was. Defaults false — a missing value fails closed.
 * @property {boolean} external_conflict - Whether this resolution attempt was
 * dispatched for an EXTERNAL PR row (UI-w0hi §1) — a bead a normal session
 * delivered, which the durable lanes never held. It is what routes the two
 * termination paths away from `moveToPrWait`: a successful external resolution
 * must close its attempt WITHOUT injecting the bead into the durable `pr_wait`
 * lane, whose membership stays the external overlay's. Durable because the
 * restart-recovery path (`disposeDeadAttempt`) has no in-memory record of what
 * kind of attempt it is disposing. Defaults false — a missing value fails
 * closed onto the ordinary completion.
 * @property {boolean} cleanup_diagnosis - Historical cleanup-diagnosis marker.
 * New attempts never write it; legacy records retain it for round-trip
 * compatibility.
 * @property {string|null} cleanup_diagnosis_result_path - Historical result
 * path retained for round-trip compatibility.
 * @property {{ reason: string, command: string|null, at: number }|null} guard_kill -
 * The fail-closed evidence a DETACHED session monitor recorded before killing an
 * orphan session (UI-o2yt §3.3). A killed session leaves no verdict behind, so
 * the reconcile pass would judge it by `gh` alone and read an already-pushed PR
 * as success; this record is what makes that disposition fail closed instead.
 * Written before the signal, so it survives even when the kill itself does not
 * happen (a pid that turned out to be dead or recycled). Null on every attempt
 * no monitor ever stopped.
 * @property {{ reason: string, command: string|null, at: number }[]|null} guard_warnings -
 * The guard verdicts this attempt drew that did NOT end it (UI-1xcd §1). A
 * `warn` lets the session run on, so the only trace it used to leave was a
 * stream event nothing persisted — and `base_merge` moved onto that path, which
 * makes "the session merged the base into its branch" a fact worth having after
 * the session is gone. Accumulated in dispatch order by the live path and by
 * the restart monitor alike, and BOUNDED at normalize time
 * ({@link GUARD_WARNINGS_CAP} entries, {@link GUARD_WARNING_COMMAND_MAX}
 * characters of command) so a chatty session cannot grow `queue.json` without
 * limit. Null on an attempt that drew none and on every record written before
 * the field existed.
 * @property {boolean} spec_review_stale - Whether this attempt was dispatched
 * with a stale spec_review receipt (UI-dlim §3.2), i.e. the session was asked
 * to run the contract's in-session re-review lane before implementing. Recorded
 * durably so the activity log and the UI can tell a plain attempt from one that
 * spent its opening on a receipt refresh. Defaults false.
 * @property {string|null} disposition - Which REVISE-parking disposition this
 * attempt is (UI-hs11 §3.3), or null for an ordinary implementation attempt.
 * Recorded durably because it is what routes the termination away from the
 * PR-existence verdict — a session that opens no PR must not be judged by one,
 * and a restart has to be able to tell the two kinds apart.
 * @property {string|null} disposition_receipt - The `spec_review` value the
 * disposition is replacing. Durable for the same reason: after a restart the
 * completion verdict has no in-memory record of what the receipt used to be,
 * and "the receipt changed" is the whole judgment.
 * @property {boolean} disposition_resume - Whether this disposition attempt was
 * launched with the `--resume` argv. A resume whose transcript turned out to be
 * gone is retried ONCE as a fresh substitute session, and this flag is what
 * bounds that retry to one.
 * @property {string|null} disposition_prompt - The task prompt this disposition
 * was launched with. Durable so the substitute session can be launched with the
 * identical instruction without re-deriving it — and so a restart can too.
 * @property {string|null} system_prompt - The contract this attempt was sent on
 * the `--append-system-prompt` channel (UI-rxp3 §3), verbatim. Written at spawn
 * from the same `buildArgv` result the argv came from, so it is what the process
 * received rather than a reconstruction. Null on every attempt recorded before
 * the field existed — the reader treats that as "기록 없음", never as empty.
 * @property {string|null} task_prompt - The positional task prompt of the same
 * spawn, on the same terms. Distinct from {@link Attempt.disposition_prompt},
 * which is the disposition lane's own relaunch input and is kept for that.
 * NEITHER field rides the worker-state push: the projection strips both
 * (`worker-handlers.js`), and the UI fetches them on demand.
 * @property {string|null} completion_root_id - Root completion intent that
 * owns this repair attempt; null for ordinary sessions.
 * @property {boolean} worker_serial - Whether this attempt's lineage was
 * authoritatively classified as `worker-serial` at its first dispatch.
 * @property {string|null} completion_op_id - Journal operation paired with the
 * attempt before spawn.
 * @property {'resume_root'|'dispatch_repair'|null} completion_mode - Repair
 * dispatch shape.
 * @property {CompletionFailureKey|null} completion_failure_key - SHA-bound
 * failure identity the session was asked to repair.
 */
/**
 * @typedef {Object} UsageLeg
 * @property {string} receipt_id
 * @property {'codex'} provider
 * @property {'implementation'|'review-consult'} role
 * @property {string} session_id
 * @property {string} turn_id
 * @property {string} model
 * @property {{ input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number, reasoning_output_tokens: number }} usage
 * @property {string} completed_at
 */
/**
 * @typedef {Object} Queue
 * @property {number} revision - CAS counter; bumped on every mutation.
 * @property {boolean} auto_advance - Whether the scheduler may start sessions.
 * @property {string|null} default_exec_preset_id - The selected server-global
 * preset reference. Queue state never owns a copy of preset settings.
 * @property {boolean} pr_wait_holds_slot - Whether dispatch runs serially until
 * each durable PR wait leaves through merge cleanup or discard. The legacy key
 * name remains stable; the stored `slots` preference is not overwritten.
 * @property {Record<string, string>} exec_defaults - Workspace-global exec
 * setting defaults (subset of the 5 exec keys; an unset key is absent). Only
 * valid enum values survive normalize. An absent key leaves dispatch on the
 * final fallback: `opus` for orchestration_model, unset for the other 3.
 * @property {number} slots - Concurrency cap: how many sessions the scheduler
 * may run at once (worker-phase2 §3). Integer ≥ 1, default 2. `slots = 1` IS
 * the retired serial lane's semantics.
 * @property {QueueEntry[]} queue - The ONE waiting lane, in dispatch order
 * (worker-phase2 §3). Ordering/dependency safety is carried by the admission
 * validator + bd deps, not by a lane split.
 * @property {QueueEntry[]} pr_wait - Beads whose PR the server OBSERVED open,
 * waiting for a human merge click (worker-phase2 §4).
 * @property {QueueEntry[]} done - Completed today.
 * @property {Record<string, Attempt>} attempts - Attempt records by attempt_id.
 * @property {Record<string, { reason: string, at: number, stale?: true }>} admission -
 * Auto-run admission observations by bead_id (badge display). Cleared only on a
 * successful dispatch or queue removal — never auto-expired. `stale:true` marks
 * the ONE non-blocking record (UI-dlim §3.4): the bead was ADMITTED with a
 * stale spec_review receipt, so the badge must not read as a refusal. Every
 * record without the flag is a refusal, exactly as before.
 * @property {Record<string, { step: string, reason: string, bd_restore: string|null, at: number, detail: string|null, output_tail?: string, log_path?: string, failure_code?: string, retryable?: boolean, retry_count?: number, diagnosis?: { verdict: string, attempt_id: string, consumed: boolean, evidence: string, fix_bead_id?: string, malformed?: boolean } }>} cleanup_failed -
 * Beads whose post-merge cleanup stopped part-way (worker-phase2 §6). DURABLE
 * on purpose: the PR is already merged and irreversible, the bead is left
 * `resolved`, and nothing retries by itself — so the record that a human must
 * finish the cleanup has to outlive a server restart. `bd_restore` is null when
 * the stop happened BEFORE the parent close (bd was never touched, so `resolved`
 * still holds by itself), `restored` when the close was undone back to
 * `resolved`, and `restore_failed` when even that did not stick — the one case
 * where the bead's real bd status disagrees with the contract, which must be
 * recorded rather than left silent. `detail` is the failing step's own
 * diagnostic text (e.g. the git stderr behind `verify_worktree_failed`,
 * UI-2o4z §3); null on a record that carries none, including every record
 * written before the field existed. `output_tail` is the failing command's own
 * trailing output (UI-qult §1) — absent, not null, on every record that has
 * none. `log_path` is the absolute path to that command's FULL preserved output
 * (UI-0x54), which the capped `output_tail` cannot hold; absent when the run
 * wrote no complete log file, and overwritten by a cleanup retry's own run.
 * Both live HERE rather than
 * in bd metadata because the bd contract surface is owned by dotfiles
 * (`docs/contracts/workflow.md`) and beads-ui only consumes it; this is
 * server-owned queue state about a lane member, exactly like {@link admission}.
 * @property {MergeQueueEntry[]} merge_queue - The sequential merge queue
 * (UI-5v7d §1), FIFO. DURABLE because a `pr_wait` merge deploys, and a beads-ui
 * deploy restarts this very server: a queue that lived in memory would be lost
 * exactly when it is half-done. `resolution_rounds` is durable for the same
 * reason — the per-item conflict-resolution cap has to hold ACROSS that
 * restart, not just within one process life. Everything else the driver knows
 * (which item is active, why one failed, the waiting clocks) stays in memory
 * like {@link Queue.admission}'s live siblings: after a restart nothing is in
 * flight.
 * @property {boolean} auto_merge - Whether the auto-merge enroller may keep
 * feeding eligible `pr_wait` rows into {@link Queue.merge_queue} (UI-yk55 §2).
 * DURABLE, unlike {@link Queue.auto_advance}: merging beads-ui DEPLOYS beads-ui,
 * which restarts this process, so a flag kept in memory would switch itself off
 * exactly when the queue merged its own repository. The restart-safety argument
 * that forces `auto_advance` to false on load does not apply — nothing here
 * resumes a half-run session, and the enroller's own members are re-judged by
 * the driver at their turn.
 * @property {Record<string, MergeSkip>} auto_merge_skips - Beads the driver gave
 * up on, by bead_id, each pinned to the head SHA it failed at (UI-yk55 §3).
 * DURABLE for the same reason as the flag, and it is what stops the enroller
 * from re-queuing a failed item forever: `enqueueMerge` resets
 * `resolution_rounds` to 0, so an automatic re-entry on the SAME head would hand
 * a conflict item an endless supply of resolution sessions. A record is dropped
 * as soon as the head moves (someone actually changed the branch), when a human
 * clicks [머지] on the row, or when the bead leaves the lane.
 * @property {Record<string, CompletionIntent>} completion_intents - Durable
 * root-scoped completion sagas. Missing on legacy queue files and normalized
 * to an empty map; execution lives in `completion-intent.js`.
 * @property {Record<string, DiscardOperation>} discard_operations - Durable
 * discard sagas keyed by operation id. A missing legacy field normalizes to an
 * empty map; every non-done operation fences its bead from other drivers.
 * @property {Record<string, DeploymentReconcile>} reconcile - Durable
 * deployment reconciliation state keyed by parent Bead.
 * @property {DeploymentObservation|null} deployment - The current external
 * deployment-provider observation. It is repo-level, not a PR-row result.
 * @property {LastDeploy|null} last_deploy - The workspace's most recent
 * post-merge deployment (worker-deploy-hook §3). ONE record, overwritten each
 * time — the question it answers is "is the running service the merged code?",
 * which only the latest deploy can answer. Null on a workspace that has never
 * deployed (no `[worker.deploy]` section, or none run yet).
 */
/**
 * @typedef {Object} DeploymentObservation
 * @property {'idle'|'pending'|'running'|'succeeded'|'failed'} state
 * @property {string|null} target_base
 * @property {string|null} target_sha
 * @property {string|null} deployed_sha
 * @property {number|null} generation
 * @property {string|null} error_code
 * @property {string|null} log_path
 */
/**
 * @typedef {Object} DiscardOperation
 * @property {string} operation_id
 * @property {string} bead_id
 * @property {string|null} attempt_id
 * @property {number} requested_at
 * @property {'undecided'|'unmerged'|'merged_revert'} mode
 * @property {string} phase
 * @property {{ pid: number, pgid: number, started_at: number }|null} process_identity
 * @property {Record<string, unknown>} source_snapshot
 * @property {{ path: string, manifest_sha256: string, verified_at: number }|null} backup
 * @property {Record<string, unknown>|null} original_pr
 * @property {Record<string, unknown>|null} revert_pr
 * @property {Record<string, unknown>} receipts
 * @property {string|null} last_error
 */
/**
 * One member of the sequential merge queue (UI-5v7d §1).
 *
 * @typedef {Object} MergeQueueEntry
 * @property {string} bead_id - The `pr_wait` bead awaiting its merge turn.
 * @property {number} resolution_rounds - How many conflict-resolution rounds
 * this item has already consumed. Persisted so the 2-round cap survives the
 * deploy restart a merge can trigger.
 * @property {ResolutionWait|InvalidResolutionWait|null} resolution - Durable
 * binding between this queue item and one exact conflict-resolution attempt.
 * @property {{ subject_bead_id: string, mismatch: Record<string, unknown>, continuation: 'prior_session'|'fresh_current'|null, decision_token: Record<string, unknown>|null }|null} [continuation_action]
 * A cross-runner resolver decision that must survive restart.
 */
/**
 * @typedef {'waiting'|'yielded'|'ready'} ResolutionWaitState
 */
/**
 * @typedef {Object} ResolutionWait
 * @property {string} attempt_id
 * @property {string} subject_bead_id
 * @property {number} deadline_at
 * @property {ResolutionWaitState} state
 * @property {number|null} yielded_at
 * @property {number|null} settled_at
 */
/**
 * Canonical fail-closed marker for a persisted non-null resolution record that
 * cannot safely be interpreted as an attempt binding.
 *
 * @typedef {Object} InvalidResolutionWait
 * @property {'invalid'} state
 * @property {'resolution_wait_invalid'} reason
 */
/**
 * One auto-merge exclusion record (UI-yk55 §3.2).
 *
 * @typedef {Object} MergeSkip
 * @property {string} head_sha - The head SHA OBSERVED when the driver gave up.
 * The exclusion holds only while the branch still points there; a different head
 * means someone (a resolution session, a human) moved it, and the row becomes a
 * candidate again.
 * @property {string} reason - The driver's own skip vocabulary, so the row can
 * say WHY it is being passed over with the same words the failure badge uses.
 * @property {number} at - Epoch ms of the disposition.
 */
/**
 * @typedef {Object} LastDeploy
 * @property {'deployed'|'launched'|'failed'} outcome - `deployed` = the
 * synchronous command exited 0; `launched` = a DETACHED command was started
 * after the cleanup was durably recorded — an intent, NOT a confirmation (a
 * self-restarting deploy kills the observer, so nothing can confirm it);
 * `failed` = it ran and did not succeed, or never started.
 * @property {string|null} reason - The failure vocabulary
 * (`deploy_failed` / `deploy_timeout` / `deploy_spawn_error` /
 * `deploy_verify_missing` / `deploy_base_not_synced`); null on a success.
 * @property {string} bead_id - The merge whose cleanup ran this deploy.
 * @property {string} base_sha - The base commit that was deployed.
 * @property {number} at - Epoch ms of the record.
 * @property {string} [detail] - The failure's own diagnostic text (UI-l53x §4):
 * the guard behind `deploy_base_not_synced`, or the spawn error behind
 * `deploy_spawn_error`. ABSENT — not null — on a record that has none, the same
 * rule `cleanup_failed.output_tail`/`log_path` follow. The 512-char cap lives on
 * the producer (`errorDetail`), not here.
 * @property {string} [log_path] - Absolute path to the deploy command's FULL
 * preserved output (UI-l53x §1). Present only for a SYNCHRONOUS deploy that
 * reached the runner and whose log file completed; a detached deploy has no
 * observable output at all, and a pre-run refusal never opened a file.
 * @property {'workspace'|'managed'} [adapter]
 * @property {string} [attempt_id]
 * @property {string} [merged_floor_sha]
 * @property {string} [receipt_path]
 * @property {string} [receipt_digest]
 */
/**
 * @typedef {Object} DeploymentReconcile
 * @property {string} bead_id
 * @property {string} attempt_id
 * @property {string} target_base
 * @property {string} merged_floor_sha
 * @property {string|null} candidate_sha
 * @property {'workspace'|'managed'|null} adapter
 * @property {'queued'|'pinned'|'verifying'|'deploying'|'restarting'|'readback'|'complete'|'failed'} stage
 * @property {string|null} receipt_path
 * @property {string|null} receipt_digest
 * @property {string|null} receipt_attempt_id
 * @property {string|null} receipt_floor_sha
 * @property {number} retry_count
 * @property {number|null} retry_at
 * @property {string|null} last_retryable_reason
 * @property {{ reason: string, detail: string|null, step: string|null, failure_code: string|null, retryable: boolean|null, at: number }|null} terminal_failure
 * @property {number} updated_at
 */
/**
 * @typedef {'gating'|'repairing'|'waiting_repair_pr'|'merging'|'cleaning'|'paused'|'needs_human'|'completed'} CompletionPhase
 */
/**
 * @typedef {Object} CompletionSubject
 * @property {'root'|'repair'} role
 * @property {string} bead_id
 * @property {string|null} pr_url
 * @property {string|null} head_sha
 * @property {string|null} base_sha
 * @property {string|null} merged_sha
 */
/**
 * @typedef {Object} CompletionFailureKey
 * @property {string} stage
 * @property {string} reason
 * @property {string} subject_sha
 * @property {string} base_sha
 * @property {string} result_digest
 */
/**
 * @typedef {Object} CompletionOperation
 * @property {string} op_id
 * @property {'resume_root'|'create_repair'|'dispatch_repair'|'merge_subject'|'retry_cleanup'} kind
 * @property {CompletionFailureKey} failure_key
 * @property {string|null} attempt_id
 * @property {string|null} repair_bead_id
 * @property {'prepared'|'dispatched'|'observed'|'consumed'} status
 */
/**
 * @typedef {Object} CompletionTerminal
 * @property {string} reason
 * @property {string} stage
 * @property {CompletionFailureKey|null} failure_key
 * @property {string|null} evidence
 * @property {string|null} log_path
 * @property {number} at
 */
/**
 * @typedef {Object} CompletionIntent
 * @property {string} target_base
 * @property {CompletionPhase} phase
 * @property {CompletionSubject} subject
 * @property {number} repair_sessions_used
 * @property {string[]} repair_bead_ids
 * @property {CompletionSubject[]} subject_stack - Prior subjects to restore
 * after a nested linked repair merges, oldest first.
 * @property {CompletionOperation|null} active_op
 * @property {CompletionTerminal|null} terminal_reason
 */
/**
 * @typedef {Object} QueueOpResult
 * @property {boolean} ok - True when the mutation was applied.
 * @property {boolean} conflict - True when rejected by a revision mismatch.
 * @property {boolean} [stale] - True when an older deployment observation was refused.
 * @property {boolean} [binding_mismatch] - True when one generation names two bindings.
 * @property {boolean} [regression] - True when an observation reverses deployment progress.
 * @property {Queue} queue - Current snapshot (new on success, unchanged else).
 * @property {string} [reason] - Why a non-conflict rejection happened, for the
 * ops that distinguish causes; absent when there is nothing to distinguish.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { execSettingEnums } from './exec-enums.js';
import { validateManagedFailure } from './managed-failure.js';
import { queueFilePath } from './state-paths.js';
import {
  consumeUsageReceiptFiles,
  normalizeUsageLegs,
  readAttemptUsageReceipts
} from './usage-receipts.js';

/**
 * Default concurrency cap when a queue carries no (or an unusable) `slots`
 * value — worker-phase2 §3/§9.
 *
 * @type {number}
 */
export const DEFAULT_SLOTS = 2;

/**
 * Lower bound on the concurrency cap. 1 is the retired serial lane: exactly one
 * session at a time.
 *
 * @type {number}
 */
export const MIN_SLOTS = 1;

/** @type {CompletionPhase[]} */
const COMPLETION_PHASES = [
  'gating',
  'repairing',
  'waiting_repair_pr',
  'merging',
  'cleaning',
  'paused',
  'needs_human',
  'completed'
];

/** @type {CompletionOperation['kind'][]} */
const COMPLETION_OP_KINDS = [
  'resume_root',
  'create_repair',
  'dispatch_repair',
  'merge_subject',
  'retry_cleanup'
];

/** @type {CompletionOperation['status'][]} */
const COMPLETION_OP_STATUSES = [
  'prepared',
  'dispatched',
  'observed',
  'consumed'
];

const COMPLETION_RESUME_LEAF_STATUSES = new Set([
  'running',
  'paused',
  'done',
  'failed',
  'orphaned',
  'stopped'
]);

const MAX_REPAIR_SESSIONS = 2;

const COMPLETION_EVIDENCE_MAX = 4_000;

const COMPLETION_LOG_PATH_MAX = 1_000;

const ATTEMPT_CONTROL_TRANSITIONS = {
  requested: new Set(['signaled', 'failed']),
  signaled: new Set(['terminated', 'failed']),
  terminated: new Set(['done', 'failed']),
  done: new Set(),
  failed: new Set()
};

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isSha(value) {
  return typeof value === 'string' && /^[0-9a-f]{40}$/i.test(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isDigest(value) {
  return typeof value === 'string' && /^[0-9a-f]{64}$/i.test(value);
}

/**
 * @param {unknown} value
 * @param {string} root_bead_id
 * @returns {CompletionSubject|null}
 */
function normalizeCompletionSubject(value, root_bead_id) {
  if (!isRecord(value)) {
    return null;
  }
  const role = value.role;
  const bead_id = value.bead_id;
  if (
    (role !== 'root' && role !== 'repair') ||
    typeof bead_id !== 'string' ||
    bead_id.length === 0 ||
    (role === 'root' && bead_id !== root_bead_id) ||
    typeof value.pr_url !== 'string' ||
    value.pr_url.length === 0 ||
    !isSha(value.head_sha) ||
    !isSha(value.base_sha) ||
    (value.merged_sha !== null && !isSha(value.merged_sha))
  ) {
    return null;
  }
  return {
    role,
    bead_id,
    pr_url: value.pr_url,
    head_sha: value.head_sha,
    base_sha: value.base_sha,
    merged_sha: value.merged_sha
  };
}

/**
 * @param {unknown} value
 * @returns {CompletionFailureKey|null}
 */
function normalizeCompletionFailureKey(value) {
  if (
    !isRecord(value) ||
    typeof value.stage !== 'string' ||
    value.stage.length === 0 ||
    typeof value.reason !== 'string' ||
    value.reason.length === 0 ||
    !isSha(value.subject_sha) ||
    !isSha(value.base_sha) ||
    !isDigest(value.result_digest)
  ) {
    return null;
  }
  return {
    stage: value.stage,
    reason: value.reason,
    subject_sha: value.subject_sha,
    base_sha: value.base_sha,
    result_digest: value.result_digest
  };
}

/**
 * @param {CompletionFailureKey|null} left
 * @param {CompletionFailureKey|null} right
 */
function sameCompletionFailureKey(left, right) {
  return (
    left !== null &&
    right !== null &&
    left.stage === right.stage &&
    left.reason === right.reason &&
    left.subject_sha === right.subject_sha &&
    left.base_sha === right.base_sha &&
    left.result_digest === right.result_digest
  );
}

/**
 * @param {unknown} value
 * @returns {CompletionOperation|null}
 */
function normalizeCompletionOperation(value) {
  if (!isRecord(value)) {
    return null;
  }
  const kind = value.kind;
  const status = value.status;
  const failure_key = normalizeCompletionFailureKey(value.failure_key);
  const session_op = kind === 'resume_root' || kind === 'dispatch_repair';
  const attempt_id =
    typeof value.attempt_id === 'string' && value.attempt_id.length > 0
      ? value.attempt_id
      : null;
  if (
    typeof value.op_id !== 'string' ||
    value.op_id.length === 0 ||
    typeof kind !== 'string' ||
    !COMPLETION_OP_KINDS.includes(
      /** @type {CompletionOperation['kind']} */ (kind)
    ) ||
    typeof status !== 'string' ||
    !COMPLETION_OP_STATUSES.includes(
      /** @type {CompletionOperation['status']} */ (status)
    ) ||
    !failure_key ||
    (session_op && !attempt_id) ||
    (!session_op && value.attempt_id !== null) ||
    (value.repair_bead_id !== null &&
      (typeof value.repair_bead_id !== 'string' ||
        value.repair_bead_id.length === 0))
  ) {
    return null;
  }
  return {
    op_id: value.op_id,
    kind: /** @type {CompletionOperation['kind']} */ (kind),
    failure_key,
    attempt_id,
    repair_bead_id:
      typeof value.repair_bead_id === 'string' ? value.repair_bead_id : null,
    status: /** @type {CompletionOperation['status']} */ (status)
  };
}

/**
 * @param {unknown} value
 * @returns {CompletionTerminal|null}
 */
function normalizeCompletionTerminal(value) {
  if (!isRecord(value)) {
    return null;
  }
  const failure_key =
    value.failure_key === null
      ? null
      : normalizeCompletionFailureKey(value.failure_key);
  if (
    typeof value.reason !== 'string' ||
    value.reason.length === 0 ||
    typeof value.stage !== 'string' ||
    value.stage.length === 0 ||
    (value.failure_key !== null && !failure_key)
  ) {
    return null;
  }
  return {
    reason: value.reason,
    stage: value.stage,
    failure_key,
    evidence:
      typeof value.evidence === 'string'
        ? value.evidence.slice(-COMPLETION_EVIDENCE_MAX)
        : null,
    log_path:
      typeof value.log_path === 'string'
        ? value.log_path.slice(0, COMPLETION_LOG_PATH_MAX)
        : null,
    at: typeof value.at === 'number' && Number.isFinite(value.at) ? value.at : 0
  };
}

/**
 * Preserve a malformed record as a terminal saga instead of dropping it and
 * silently granting a fresh repair budget on the next intake.
 *
 * @param {string} root_bead_id
 * @param {unknown} value
 * @returns {CompletionIntent}
 */
function invalidCompletionIntent(root_bead_id, value) {
  const raw = isRecord(value) ? value : {};
  const raw_subject = isRecord(raw.subject) ? raw.subject : {};
  const repair_bead_ids = Array.isArray(raw.repair_bead_ids)
    ? [...new Set(raw.repair_bead_ids.filter((id) => typeof id === 'string'))]
    : [];
  const role = raw_subject.role === 'repair' ? 'repair' : 'root';
  const subject_id =
    typeof raw_subject.bead_id === 'string' && raw_subject.bead_id.length > 0
      ? raw_subject.bead_id
      : root_bead_id;
  if (role === 'repair' && !repair_bead_ids.includes(subject_id)) {
    repair_bead_ids.push(subject_id);
  }
  return {
    target_base: typeof raw.target_base === 'string' ? raw.target_base : '',
    phase: 'needs_human',
    subject: {
      role,
      bead_id: subject_id,
      pr_url:
        typeof raw_subject.pr_url === 'string' ? raw_subject.pr_url : null,
      head_sha: isSha(raw_subject.head_sha) ? raw_subject.head_sha : null,
      base_sha: isSha(raw_subject.base_sha) ? raw_subject.base_sha : null,
      merged_sha: isSha(raw_subject.merged_sha) ? raw_subject.merged_sha : null
    },
    repair_sessions_used:
      typeof raw.repair_sessions_used === 'number' &&
      Number.isInteger(raw.repair_sessions_used) &&
      raw.repair_sessions_used >= 0 &&
      raw.repair_sessions_used <= MAX_REPAIR_SESSIONS
        ? raw.repair_sessions_used
        : MAX_REPAIR_SESSIONS,
    repair_bead_ids,
    subject_stack: [],
    active_op: null,
    terminal_reason: {
      reason: 'intent_state_invalid',
      stage: 'state',
      failure_key: null,
      evidence: 'completion_intent_malformed',
      log_path: null,
      at: 0
    }
  };
}

/**
 * @param {string} root_bead_id
 * @param {unknown} value
 * @returns {CompletionIntent}
 */
function normalizeCompletionIntent(root_bead_id, value) {
  if (!isRecord(value)) {
    return invalidCompletionIntent(root_bead_id, value);
  }
  const subject = normalizeCompletionSubject(value.subject, root_bead_id);
  const phase = value.phase;
  const repair_bead_ids = Array.isArray(value.repair_bead_ids)
    ? [...new Set(value.repair_bead_ids)]
    : null;
  const raw_subject_stack =
    value.subject_stack === undefined
      ? []
      : Array.isArray(value.subject_stack)
        ? value.subject_stack
        : null;
  const subject_stack = raw_subject_stack?.map((item) =>
    normalizeCompletionSubject(item, root_bead_id)
  );
  const active_op =
    value.active_op === null
      ? null
      : normalizeCompletionOperation(value.active_op);
  const terminal_reason =
    value.terminal_reason === null
      ? null
      : normalizeCompletionTerminal(value.terminal_reason);
  const valid_repair_ids =
    repair_bead_ids !== null &&
    repair_bead_ids.every(
      (id) => typeof id === 'string' && id.length > 0 && id !== root_bead_id
    );
  if (
    typeof value.target_base !== 'string' ||
    value.target_base.length === 0 ||
    typeof phase !== 'string' ||
    !COMPLETION_PHASES.includes(/** @type {CompletionPhase} */ (phase)) ||
    !subject ||
    typeof value.repair_sessions_used !== 'number' ||
    !Number.isInteger(value.repair_sessions_used) ||
    value.repair_sessions_used < 0 ||
    value.repair_sessions_used > MAX_REPAIR_SESSIONS ||
    !valid_repair_ids ||
    !subject_stack ||
    subject_stack.length > MAX_REPAIR_SESSIONS ||
    subject_stack.some(
      (item) =>
        !item ||
        (item.role === 'repair' && !repair_bead_ids.includes(item.bead_id))
    ) ||
    (subject.role === 'repair' && subject_stack.length === 0) ||
    (subject.role === 'repair' && !repair_bead_ids.includes(subject.bead_id)) ||
    (value.active_op !== null && !active_op) ||
    (value.terminal_reason !== null && !terminal_reason) ||
    (phase === 'needs_human' && !terminal_reason) ||
    (phase !== 'needs_human' && terminal_reason)
  ) {
    return invalidCompletionIntent(root_bead_id, value);
  }
  return {
    target_base: value.target_base,
    phase: /** @type {CompletionPhase} */ (phase),
    subject,
    repair_sessions_used: value.repair_sessions_used,
    repair_bead_ids: /** @type {string[]} */ (repair_bead_ids),
    subject_stack: /** @type {CompletionSubject[]} */ (subject_stack),
    active_op,
    terminal_reason
  };
}

/**
 * @param {unknown} raw
 * @returns {Record<string, CompletionIntent>}
 */
function normalizeCompletionIntents(raw) {
  /** @type {Record<string, CompletionIntent>} */
  const out = {};
  if (!isRecord(raw)) {
    return out;
  }
  for (const [root_bead_id, value] of Object.entries(raw)) {
    if (root_bead_id.length === 0) {
      continue;
    }
    out[root_bead_id] = normalizeCompletionIntent(root_bead_id, value);
  }
  return out;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Coerce a candidate `slots` value to a usable cap, or null when it is not one.
 * A non-number, a non-integer, and anything below {@link MIN_SLOTS} are all
 * unusable — `setSlots` REJECTS those without a write (the stored value is never
 * corrupted, and the client learns its input was refused), while `normalize`
 * falls back to {@link DEFAULT_SLOTS} (a queue.json must always load).
 *
 * @param {unknown} value
 * @returns {number|null}
 */
function normalizeSlots(value) {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return null;
  }
  return value >= MIN_SLOTS ? value : null;
}

/**
 * The deploy outcomes the record accepts. Anything else is not a vocabulary the
 * UI can render, so it is refused on write and dropped on load.
 *
 * @type {string[]}
 */
const DEPLOY_OUTCOMES = ['deployed', 'launched', 'failed'];

/** @type {string[]} */
const DEPLOYMENT_JOB_STATES = [
  'idle',
  'pending',
  'running',
  'succeeded',
  'failed'
];

/**
 * Queue properties this module actively normalizes. Any other top-level field
 * is historical opaque data and must round-trip instead of being deleted by an
 * unrelated queue mutation.
 */
const KNOWN_QUEUE_FIELDS = new Set([
  'revision',
  'auto_advance',
  'pr_wait_holds_slot',
  'default_exec_preset_id',
  'exec_defaults',
  'slots',
  'queue',
  'serial',
  'parallel',
  'pr_wait',
  'done',
  'attempts',
  'admission',
  'cleanup_failed',
  'merge_queue',
  'auto_merge',
  'auto_merge_skips',
  'completion_intents',
  'discard_operations',
  'reconcile',
  'deployment',
  'last_deploy',
  'merge_policy',
  'drift_policy',
  'worker_runner',
  'review_model',
  'ship_failure'
]);

/** @type {string[]} */
const RECONCILE_STAGES = [
  'queued',
  'pinned',
  'verifying',
  'deploying',
  'restarting',
  'readback',
  'complete',
  'failed'
];

/**
 * @returns {Queue}
 */
function emptyQueue() {
  return {
    revision: 0,
    auto_advance: false,
    pr_wait_holds_slot: false,
    default_exec_preset_id: null,
    exec_defaults: {},
    slots: DEFAULT_SLOTS,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    admission: {},
    cleanup_failed: {},
    merge_queue: [],
    auto_merge: false,
    auto_merge_skips: {},
    completion_intents: {},
    discard_operations: {},
    reconcile: {},
    deployment: null,
    last_deploy: null
  };
}

/**
 * Normalize the durable auto-merge exclusion map. A record missing the head SHA
 * it is pinned to is DROPPED rather than kept: the whole exclusion is "this head
 * already failed", and a record that cannot name a head would exclude the row
 * forever.
 *
 * @param {unknown} raw
 * @returns {Record<string, MergeSkip>}
 */
function normalizeMergeSkips(raw) {
  /** @type {Record<string, MergeSkip>} */
  const out = {};
  if (!isRecord(raw)) {
    return out;
  }
  for (const [bead_id, value] of Object.entries(raw)) {
    if (
      !isRecord(value) ||
      typeof value.head_sha !== 'string' ||
      value.head_sha.length === 0
    ) {
      continue;
    }
    out[bead_id] = {
      head_sha: value.head_sha,
      reason: typeof value.reason === 'string' ? value.reason : '',
      at:
        typeof value.at === 'number' && Number.isFinite(value.at) ? value.at : 0
    };
  }
  return out;
}

/**
 * @param {unknown} value
 * @returns {ResolutionWait|InvalidResolutionWait|null}
 */
function normalizeResolutionWait(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (!isRecord(value)) {
    return { state: 'invalid', reason: 'resolution_wait_invalid' };
  }
  const attempt_id = value.attempt_id;
  const subject_bead_id = value.subject_bead_id;
  const deadline_at = value.deadline_at;
  const state = value.state;
  const yielded_at = value.yielded_at;
  const settled_at = value.settled_at;
  const valid_state =
    state === 'waiting' || state === 'yielded' || state === 'ready';
  const valid_yielded_at =
    yielded_at === null ||
    (typeof yielded_at === 'number' && Number.isFinite(yielded_at));
  const valid_settled_at =
    settled_at === null ||
    (typeof settled_at === 'number' && Number.isFinite(settled_at));
  const valid_transition =
    (state === 'waiting' && yielded_at === null && settled_at === null) ||
    (state === 'yielded' &&
      typeof yielded_at === 'number' &&
      settled_at === null) ||
    (state === 'ready' && typeof settled_at === 'number');
  if (
    typeof attempt_id !== 'string' ||
    attempt_id.length === 0 ||
    typeof subject_bead_id !== 'string' ||
    subject_bead_id.length === 0 ||
    typeof deadline_at !== 'number' ||
    !Number.isFinite(deadline_at) ||
    !valid_state ||
    !valid_yielded_at ||
    !valid_settled_at ||
    !valid_transition
  ) {
    return { state: 'invalid', reason: 'resolution_wait_invalid' };
  }
  return {
    attempt_id,
    subject_bead_id,
    deadline_at,
    state,
    yielded_at,
    settled_at
  };
}

/**
 * Normalize the durable merge queue: entry order is the FIFO order, a bead may
 * appear once, a missing/unusable `resolution_rounds` reads as 0, and every
 * legacy entry receives an explicit null resolution binding.
 *
 * @param {unknown} arr
 * @returns {MergeQueueEntry[]}
 */
function normalizeMergeQueue(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  /** @type {MergeQueueEntry[]} */
  const out = [];
  const seen = new Set();
  for (const raw of arr) {
    if (!isRecord(raw) || typeof raw.bead_id !== 'string' || !raw.bead_id) {
      continue;
    }
    if (seen.has(raw.bead_id)) {
      continue;
    }
    seen.add(raw.bead_id);
    const continuation_action = normalizeContinuationAction(
      raw.continuation_action
    );
    out.push({
      bead_id: raw.bead_id,
      resolution_rounds:
        typeof raw.resolution_rounds === 'number' &&
        Number.isFinite(raw.resolution_rounds) &&
        raw.resolution_rounds > 0
          ? Math.floor(raw.resolution_rounds)
          : 0,
      resolution: normalizeResolutionWait(raw.resolution),
      ...(continuation_action === null ? {} : { continuation_action })
    });
  }
  return out;
}

/**
 * @param {unknown} value
 * @returns {MergeQueueEntry['continuation_action']}
 */
function normalizeContinuationAction(value) {
  if (
    !isRecord(value) ||
    typeof value.subject_bead_id !== 'string' ||
    value.subject_bead_id.length === 0 ||
    !isRecord(value.mismatch) ||
    value.mismatch.continuation_required !== true ||
    !isRecord(value.mismatch.decision_token)
  ) {
    return null;
  }
  const continuation =
    value.continuation === 'prior_session' ||
    value.continuation === 'fresh_current'
      ? value.continuation
      : null;
  return {
    subject_bead_id: value.subject_bead_id,
    mismatch: clone(value.mismatch),
    continuation,
    decision_token:
      continuation !== null && isRecord(value.decision_token)
        ? clone(value.decision_token)
        : null
  };
}

/**
 * @param {unknown} left
 * @param {unknown} right
 */
function sameDecisionToken(left, right) {
  if (!isRecord(left) || !isRecord(right)) {
    return false;
  }
  const keys = [
    'source_attempt_id',
    'source_attempt_digest',
    'observed_queue_revision',
    'preset_id',
    'preset_revision',
    'effective_exec_digest'
  ];
  return (
    Object.keys(left).sort().join('\u0000') ===
      keys.slice().sort().join('\u0000') &&
    Object.keys(right).sort().join('\u0000') ===
      keys.slice().sort().join('\u0000') &&
    keys.every((key) => left[key] === right[key])
  );
}

/**
 * Deep clone via JSON — queue state is plain data, so this is safe and keeps
 * returned snapshots isolated from the in-memory cache.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * @param {unknown} entry
 * @returns {QueueEntry|null}
 */
function normalizeEntry(entry) {
  if (!isRecord(entry) || typeof entry.bead_id !== 'string') {
    return null;
  }
  return {
    ...entry,
    bead_id: entry.bead_id,
    added_at: typeof entry.added_at === 'number' ? entry.added_at : 0,
    merge_sha: isSha(entry.merge_sha)
      ? String(entry.merge_sha).toLowerCase()
      : null,
    verified_target_sha: isSha(entry.verified_target_sha)
      ? String(entry.verified_target_sha).toLowerCase()
      : null,
    deployment_generation:
      typeof entry.deployment_generation === 'number' &&
      Number.isInteger(entry.deployment_generation) &&
      entry.deployment_generation > 0
        ? entry.deployment_generation
        : null,
    cleanup_cursor:
      typeof entry.cleanup_cursor === 'string' &&
      entry.cleanup_cursor.length > 0
        ? entry.cleanup_cursor
        : null,
    head_ref:
      typeof entry.head_ref === 'string' && entry.head_ref.length > 0
        ? entry.head_ref
        : null,
    pr_url:
      typeof entry.pr_url === 'string' && entry.pr_url.length > 0
        ? entry.pr_url
        : null
  };
}

/**
 * @param {string} bead_id
 * @param {number} added_at
 * @returns {QueueEntry}
 */
function makeQueueEntry(bead_id, added_at) {
  return {
    bead_id,
    added_at,
    merge_sha: null,
    verified_target_sha: null,
    deployment_generation: null,
    cleanup_cursor: null,
    head_ref: null,
    pr_url: null
  };
}

/**
 * @param {unknown} arr
 * @returns {QueueEntry[]}
 */
function normalizeLane(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  /** @type {QueueEntry[]} */
  const out = [];
  const seen = new Set();
  for (const raw of arr) {
    const e = normalizeEntry(raw);
    if (e && !seen.has(e.bead_id)) {
      seen.add(e.bead_id);
      out.push(e);
    }
  }
  return out;
}

/**
 * How many surviving guard verdicts one attempt keeps, and how much of the
 * command each keeps (UI-1xcd §1, implementation review 2026-08-04).
 *
 * `queue.json` is durable and rewritten on every attempt update, so an
 * unbounded append is a file that grows for as long as a session keeps warning.
 * The EARLIEST warnings are the ones kept: the first occurrence is what explains
 * how a session got where it did, and a full record stops changing.
 *
 * @type {number}
 */
export const GUARD_WARNINGS_CAP = 50;

/** @type {number} */
export const GUARD_WARNING_COMMAND_MAX = 500;

/**
 * Normalize a guard-warning list onto its bounded shape.
 *
 * @param {unknown[]} raw
 * @returns {{ reason: string, command: string|null, at: number }[]}
 */
function boundGuardWarnings(raw) {
  /** @type {{ reason: string, command: string|null, at: number }[]} */
  const out = [];
  for (const entry of raw) {
    if (out.length >= GUARD_WARNINGS_CAP) {
      break;
    }
    if (!isRecord(entry)) {
      continue;
    }
    const command =
      typeof entry.command === 'string'
        ? entry.command.slice(0, GUARD_WARNING_COMMAND_MAX)
        : null;
    out.push({
      reason: typeof entry.reason === 'string' ? entry.reason : '',
      command,
      at: typeof entry.at === 'number' ? entry.at : 0
    });
  }
  return out;
}

/**
 * @param {unknown} value
 * @returns {{ pid: number, pgid: number, started_at: number }|null}
 */
function normalizeProcessIdentity(value) {
  const pid = isRecord(value) ? value.pid : null;
  const pgid = isRecord(value) ? value.pgid : null;
  const started_at = isRecord(value) ? value.started_at : null;
  if (
    !isRecord(value) ||
    typeof pid !== 'number' ||
    !Number.isInteger(pid) ||
    typeof pgid !== 'number' ||
    !Number.isInteger(pgid) ||
    typeof started_at !== 'number' ||
    !Number.isFinite(started_at) ||
    pid <= 0 ||
    pgid <= 0
  ) {
    return null;
  }
  return {
    pid,
    pgid,
    started_at
  };
}

/**
 * @param {unknown} value
 * @returns {Attempt['control']}
 */
function normalizeAttemptControl(value) {
  const requested_at = isRecord(value) ? value.requested_at : null;
  if (
    !isRecord(value) ||
    value.kind !== 'pause' ||
    !Object.hasOwn(ATTEMPT_CONTROL_TRANSITIONS, String(value.phase)) ||
    typeof requested_at !== 'number' ||
    !Number.isFinite(requested_at)
  ) {
    return null;
  }
  return {
    kind: 'pause',
    phase: /** @type {NonNullable<Attempt['control']>['phase']} */ (
      value.phase
    ),
    requested_at,
    last_error:
      typeof value.last_error === 'string' && value.last_error.length > 0
        ? value.last_error
        : null
  };
}

/**
 * @param {unknown} value
 * @returns {Record<string, unknown>|null}
 */
function normalizeJsonRecord(value) {
  return isRecord(value) ? clone(value) : null;
}

/**
 * @param {unknown} value
 * @returns {DiscardOperation['backup']}
 */
function normalizeDiscardBackup(value) {
  if (
    !isRecord(value) ||
    typeof value.path !== 'string' ||
    value.path.length === 0 ||
    typeof value.manifest_sha256 !== 'string' ||
    !/^[0-9a-f]{64}$/.test(value.manifest_sha256) ||
    typeof value.verified_at !== 'number' ||
    !Number.isFinite(value.verified_at)
  ) {
    return null;
  }
  return {
    path: value.path,
    manifest_sha256: value.manifest_sha256,
    verified_at: value.verified_at
  };
}

/**
 * @param {unknown} value
 * @param {string} operation_id
 * @returns {DiscardOperation|null}
 */
function normalizeDiscardOperation(value, operation_id) {
  if (
    !isRecord(value) ||
    typeof operation_id !== 'string' ||
    operation_id.length === 0 ||
    typeof value.bead_id !== 'string' ||
    value.bead_id.length === 0 ||
    typeof value.phase !== 'string' ||
    value.phase.length === 0 ||
    typeof value.requested_at !== 'number' ||
    !Number.isFinite(value.requested_at) ||
    (value.mode !== 'undecided' &&
      value.mode !== 'unmerged' &&
      value.mode !== 'merged_revert')
  ) {
    return null;
  }
  const source_snapshot = normalizeJsonRecord(value.source_snapshot);
  if (!source_snapshot) {
    return null;
  }
  return {
    operation_id,
    bead_id: value.bead_id,
    attempt_id:
      typeof value.attempt_id === 'string' && value.attempt_id.length > 0
        ? value.attempt_id
        : null,
    requested_at: value.requested_at,
    mode: value.mode,
    phase: value.phase,
    process_identity: normalizeProcessIdentity(value.process_identity),
    source_snapshot,
    backup: normalizeDiscardBackup(value.backup),
    original_pr: normalizeJsonRecord(value.original_pr),
    revert_pr: normalizeJsonRecord(value.revert_pr),
    receipts: normalizeJsonRecord(value.receipts) || {},
    last_error:
      typeof value.last_error === 'string' && value.last_error.length > 0
        ? value.last_error
        : null
  };
}

/**
 * @param {unknown} raw
 * @returns {Record<string, DiscardOperation>}
 */
function normalizeDiscardOperations(raw) {
  /** @type {Record<string, DiscardOperation>} */
  const operations = {};
  if (!isRecord(raw)) {
    return operations;
  }
  for (const [operation_id, value] of Object.entries(raw)) {
    const operation = normalizeDiscardOperation(value, operation_id);
    if (operation) {
      operations[operation_id] = operation;
    }
  }
  return operations;
}

/**
 * Fill an attempt container over its default (all-null) shape.
 *
 * @param {Partial<Attempt> & { attempt_id: string, bead_id: string }} fields
 * @returns {Attempt}
 */
export function makeAttempt(fields) {
  return {
    attempt_id: fields.attempt_id,
    bead_id: fields.bead_id,
    base_oid: fields.base_oid ?? null,
    head_oid: fields.head_oid ?? null,
    started_at: fields.started_at ?? null,
    pid: fields.pid ?? null,
    process_identity: normalizeProcessIdentity(fields.process_identity),
    control: normalizeAttemptControl(fields.control),
    runner: fields.runner ?? null,
    session_id: fields.session_id ?? null,
    model: fields.model ?? null,
    effort: fields.effort ?? null,
    speed: typeof fields.speed === 'string' ? fields.speed : null,
    exit: fields.exit ?? null,
    verify_result: fields.verify_result ?? null,
    base_drift: isRecord(fields.base_drift)
      ? /** @type {Attempt['base_drift']} */ (fields.base_drift)
      : null,
    repo: fields.repo ?? null,
    status: fields.status ?? null,
    workflow_mode_prior: fields.workflow_mode_prior ?? null,
    target_base: fields.target_base ?? null,
    merge_sha: fields.merge_sha ?? null,
    finished_at: fields.finished_at ?? null,
    cause: fields.cause ?? null,
    cause_detail: isRecord(fields.cause_detail)
      ? /** @type {{ reason: string, command: string|null }} */ (
          fields.cause_detail
        )
      : null,
    dismissed_at: fields.dismissed_at ?? null,
    usage: isRecord(fields.usage)
      ? /** @type {Attempt['usage']} */ (fields.usage)
      : null,
    usage_legs: normalizeUsageLegs(fields.usage_legs),
    merge_policy: fields.merge_policy ?? null,
    drift_policy: fields.drift_policy ?? null,
    demoted_reason: fields.demoted_reason ?? null,
    release_rejected: fields.release_rejected ?? null,
    done_kind: fields.done_kind ?? null,
    verify_cmd_result: fields.verify_cmd_result ?? null,
    exec_default_preset_id: fields.exec_default_preset_id ?? null,
    exec_default_preset_revision:
      typeof fields.exec_default_preset_revision === 'number' &&
      Number.isFinite(fields.exec_default_preset_revision)
        ? fields.exec_default_preset_revision
        : null,
    exec_stamped_keys: Array.isArray(fields.exec_stamped_keys)
      ? fields.exec_stamped_keys
      : null,
    exec_values:
      fields.exec_values &&
      typeof fields.exec_values === 'object' &&
      !Array.isArray(fields.exec_values)
        ? fields.exec_values
        : null,
    exec_restore_values:
      fields.exec_restore_values &&
      typeof fields.exec_restore_values === 'object' &&
      !Array.isArray(fields.exec_restore_values)
        ? fields.exec_restore_values
        : null,
    continuation_mode:
      fields.continuation_mode === 'session' ||
      fields.continuation_mode === 'fresh'
        ? fields.continuation_mode
        : null,
    continuation_action: isRecord(fields.continuation_action)
      ? clone(fields.continuation_action)
      : null,
    resumed_from: fields.resumed_from ?? null,
    conflict_resolution: fields.conflict_resolution === true,
    external_conflict: fields.external_conflict === true,
    cleanup_diagnosis: fields.cleanup_diagnosis === true,
    cleanup_diagnosis_result_path:
      typeof fields.cleanup_diagnosis_result_path === 'string'
        ? fields.cleanup_diagnosis_result_path
        : null,
    guard_kill: isRecord(fields.guard_kill)
      ? /** @type {Attempt['guard_kill']} */ (fields.guard_kill)
      : null,
    guard_warnings: Array.isArray(fields.guard_warnings)
      ? /** @type {Attempt['guard_warnings']} */ (
          boundGuardWarnings(fields.guard_warnings)
        )
      : null,
    spec_review_stale: fields.spec_review_stale === true,
    disposition: fields.disposition ?? null,
    disposition_receipt: fields.disposition_receipt ?? null,
    disposition_resume: fields.disposition_resume === true,
    disposition_prompt: fields.disposition_prompt ?? null,
    system_prompt: fields.system_prompt ?? null,
    task_prompt: fields.task_prompt ?? null,
    completion_root_id:
      typeof fields.completion_root_id === 'string'
        ? fields.completion_root_id
        : null,
    worker_serial: fields.worker_serial === true,
    completion_op_id:
      typeof fields.completion_op_id === 'string'
        ? fields.completion_op_id
        : null,
    completion_mode:
      fields.completion_mode === 'resume_root' ||
      fields.completion_mode === 'dispatch_repair'
        ? fields.completion_mode
        : null,
    completion_failure_key: normalizeCompletionFailureKey(
      fields.completion_failure_key
    )
  };
}

/**
 * Migrate a pre-worker-phase1 attempt record on load (spec §3). A user ■ used
 * to be recorded as `failed` + `cause:'stopped'`, which the UI renders as a
 * failure banner; the honest state is now `stopped` with no cause.
 *
 * Lane placement is deliberately NOT touched: retroactively pulling a bead out
 * of a lane would rewrite a queue the user built. §2.2's lane removal applies
 * only to ■ operations performed under this spec.
 *
 * @param {Record<string, unknown>} value
 * @returns {Record<string, unknown>}
 */
function migrateLegacyStopped(value) {
  if (value.status === 'failed' && value.cause === 'stopped') {
    return { ...value, status: 'stopped', cause: null };
  }
  return value;
}

/**
 * @param {unknown} raw
 * @returns {Queue}
 */
function normalizeQueue(raw) {
  /** @type {Queue & Record<string, unknown>} */
  const q = emptyQueue();
  if (!isRecord(raw)) {
    return q;
  }
  for (const [key, value] of Object.entries(raw)) {
    if (!KNOWN_QUEUE_FIELDS.has(key)) {
      q[key] = value;
    }
  }
  q.revision =
    typeof raw.revision === 'number' && Number.isFinite(raw.revision)
      ? Math.max(0, Math.floor(raw.revision))
      : 0;
  q.slots = normalizeSlots(raw.slots) ?? DEFAULT_SLOTS;
  q.pr_wait_holds_slot = raw.pr_wait_holds_slot === true;
  q.default_exec_preset_id =
    typeof raw.default_exec_preset_id === 'string' &&
    raw.default_exec_preset_id.trim().length > 0
      ? raw.default_exec_preset_id.trim()
      : null;
  // LEGACY MERGE (worker-phase2 §9): a queue.json from the serial/parallel
  // regime has no `queue` key, so its two lanes fold into the single lane —
  // ALL of `serial` first (it was the priority lane), then `parallel`, each
  // lane's internal order untouched. `normalizeLane`'s first-wins dedupe now
  // also spans the concatenation, so a bead recorded in both lanes keeps its
  // (earlier) serial position instead of appearing twice.
  q.queue = normalizeLane(
    [raw.queue, raw.serial, raw.parallel].filter(Array.isArray).flat()
  );
  // A queue.json written before the pr_wait lane existed simply has no key →
  // empty lane. Past `done` entries STAY in `done`: a pr_stop completion from
  // the old regime is not retroactively re-filed as "awaiting a merge click"
  // (worker-phase2 §9 — never rewrite a queue the user built).
  q.pr_wait = normalizeLane(raw.pr_wait);
  q.done = normalizeLane(raw.done);
  if (isRecord(raw.attempts)) {
    for (const [key, value] of Object.entries(raw.attempts)) {
      if (isRecord(value) && typeof value.bead_id === 'string') {
        q.attempts[key] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...migrateLegacyStopped(value),
            attempt_id: key,
            bead_id: value.bead_id
          })
        );
      }
    }
  }
  // A legacy queue.json carrying the retired workspace-global `merge_policy` /
  // `drift_policy` simply has no destination field here, so the keys are DROPPED
  // on load without error (worker-phase2 §9).
  // Retired keys (`worker_runner`, and `review_model` since dotfiles-mqcj) and
  // values outside the current catalog (the old codex `gpt-5.*` orchestration
  // models) have no entry here, so they are dropped on load and the setting
  // falls back to unset (spec §3). A dropped `review_model` is NOT migrated into
  // the per-step keys — the split contract has no dual read.
  if (isRecord(raw.exec_defaults)) {
    // Resolved at CALL time, never at module load: the enum table is catalog-
    // derived and the catalog is a config-file input.
    const enums = execSettingEnums();
    for (const [key, value] of Object.entries(raw.exec_defaults)) {
      const allowed = enums[key];
      if (allowed && typeof value === 'string' && allowed.includes(value)) {
        q.exec_defaults[key] = value;
      }
    }
  }
  if (isRecord(raw.admission)) {
    for (const [bead_id, value] of Object.entries(raw.admission)) {
      if (isRecord(value) && typeof value.reason === 'string') {
        q.admission[bead_id] = {
          reason: value.reason,
          at: typeof value.at === 'number' ? value.at : 0
        };
        // Absent on every record written before UI-dlim → reads as a refusal,
        // which is what those records were.
        if (value.stale === true) {
          q.admission[bead_id].stale = true;
        }
      }
    }
  }
  // A queue.json written before Phase 5 simply has no key → empty map, which
  // reads as "no bead is awaiting a cleanup fix" (worker-phase2 §6).
  if (isRecord(raw.cleanup_failed)) {
    for (const [bead_id, value] of Object.entries(raw.cleanup_failed)) {
      if (isRecord(value) && typeof value.reason === 'string') {
        q.cleanup_failed[bead_id] = {
          step: typeof value.step === 'string' ? value.step : '',
          reason: value.reason,
          bd_restore:
            typeof value.bd_restore === 'string' ? value.bd_restore : null,
          at: typeof value.at === 'number' ? value.at : 0,
          detail: typeof value.detail === 'string' ? value.detail : null
        };
        if (typeof value.output_tail === 'string') {
          q.cleanup_failed[bead_id].output_tail = value.output_tail;
        }
        if (typeof value.log_path === 'string') {
          q.cleanup_failed[bead_id].log_path = value.log_path;
        }
        if (
          typeof value.failure_code === 'string' &&
          validateManagedFailure(value).ok
        ) {
          q.cleanup_failed[bead_id].failure_code = value.failure_code;
        }
        if (typeof value.retryable === 'boolean') {
          q.cleanup_failed[bead_id].retryable = value.retryable;
        }
        if (
          Number.isInteger(value.retry_count) &&
          Number(value.retry_count) >= 0
        ) {
          q.cleanup_failed[bead_id].retry_count = Number(value.retry_count);
        }
        if (
          isRecord(value.diagnosis) &&
          typeof value.diagnosis.verdict === 'string' &&
          typeof value.diagnosis.attempt_id === 'string' &&
          typeof value.diagnosis.evidence === 'string'
        ) {
          q.cleanup_failed[bead_id].diagnosis = {
            verdict: value.diagnosis.verdict,
            attempt_id: value.diagnosis.attempt_id,
            consumed: value.diagnosis.consumed === true,
            evidence: value.diagnosis.evidence
          };
          if (typeof value.diagnosis.fix_bead_id === 'string') {
            q.cleanup_failed[bead_id].diagnosis.fix_bead_id =
              value.diagnosis.fix_bead_id;
          }
          if (value.diagnosis.malformed === true) {
            q.cleanup_failed[bead_id].diagnosis.malformed = true;
          }
        }
      }
    }
  }
  // A queue.json written before UI-5v7d has no key → empty queue, which reads
  // as "nothing is waiting to merge" — the state a restart should resume into.
  q.merge_queue = normalizeMergeQueue(raw.merge_queue);
  // A queue.json written before UI-yk55 has neither key → auto-merge OFF with no
  // exclusions, which is the state every such workspace was actually in. Unlike
  // `auto_advance` the stored value IS honoured on load — see the field doc.
  q.auto_merge = raw.auto_merge === true;
  q.auto_merge_skips = normalizeMergeSkips(raw.auto_merge_skips);
  q.completion_intents = normalizeCompletionIntents(raw.completion_intents);
  recoverLegacyCompletionAnchors(q);
  q.discard_operations = normalizeDiscardOperations(raw.discard_operations);
  q.reconcile = normalizeReconcile(raw.reconcile);
  q.deployment = normalizeDeploymentObservation(raw.deployment);
  // A queue.json written before the deploy hook simply has no key → null, which
  // reads as "this workspace has never deployed" (worker-deploy-hook §3). A
  // record carrying an outcome outside the vocabulary is dropped the same way:
  // an unrenderable record and no record mean the same thing to the reader.
  q.last_deploy = normalizeLastDeploy(raw.last_deploy);
  // auto_advance intentionally left false — see load() restart-safety note.
  return q;
}

/**
 * @param {unknown} value
 * @returns {DeploymentObservation|null}
 */
function normalizeDeploymentObservation(value) {
  if (
    !isRecord(value) ||
    typeof value.state !== 'string' ||
    !DEPLOYMENT_JOB_STATES.includes(value.state)
  ) {
    return null;
  }
  const unbound =
    value.target_base === null &&
    value.target_sha === null &&
    value.deployed_sha === null &&
    value.generation === null &&
    value.error_code === null &&
    value.log_path === null;
  if (value.state === 'idle') {
    return unbound
      ? {
          state: 'idle',
          target_base: null,
          target_sha: null,
          deployed_sha: null,
          generation: null,
          error_code: null,
          log_path: null
        }
      : null;
  }
  if (
    value.state === 'failed' &&
    value.target_base === null &&
    value.target_sha === null &&
    value.deployed_sha === null &&
    value.generation === null
  ) {
    return typeof value.error_code === 'string' &&
      value.error_code.length > 0 &&
      value.log_path === null
      ? {
          state: 'failed',
          target_base: null,
          target_sha: null,
          deployed_sha: null,
          generation: null,
          error_code: value.error_code,
          log_path: null
        }
      : null;
  }
  if (
    typeof value.target_base !== 'string' ||
    value.target_base.length === 0 ||
    !isSha(value.target_sha) ||
    !Number.isInteger(value.generation) ||
    Number(value.generation) <= 0 ||
    (value.deployed_sha !== null && !isSha(value.deployed_sha)) ||
    (value.error_code !== null &&
      (typeof value.error_code !== 'string' ||
        value.error_code.length === 0)) ||
    (value.log_path !== null &&
      (typeof value.log_path !== 'string' || value.log_path.length === 0))
  ) {
    return null;
  }
  const target_sha = String(value.target_sha).toLowerCase();
  const deployed_sha =
    typeof value.deployed_sha === 'string'
      ? value.deployed_sha.toLowerCase()
      : null;
  const valid_state =
    (value.state === 'pending' &&
      deployed_sha === null &&
      value.error_code === null &&
      value.log_path === null) ||
    (value.state === 'running' &&
      deployed_sha === null &&
      value.error_code === null &&
      typeof value.log_path === 'string') ||
    (value.state === 'succeeded' &&
      deployed_sha === target_sha &&
      value.error_code === null &&
      typeof value.log_path === 'string') ||
    (value.state === 'failed' &&
      deployed_sha === null &&
      typeof value.error_code === 'string' &&
      typeof value.log_path === 'string');
  if (!valid_state) {
    return null;
  }
  return {
    state: /** @type {DeploymentObservation['state']} */ (value.state),
    target_base: value.target_base,
    target_sha,
    deployed_sha,
    generation: Number(value.generation),
    error_code: value.error_code,
    log_path: value.log_path
  };
}

/**
 * @param {DeploymentObservation} current
 * @param {DeploymentObservation} observation
 */
function deploymentStateRegresses(current, observation) {
  if (
    current.generation === null ||
    observation.generation === null ||
    current.generation !== observation.generation ||
    current.target_base !== observation.target_base ||
    current.target_sha !== observation.target_sha
  ) {
    return false;
  }
  if (current.state === 'succeeded' || current.state === 'failed') {
    return observation.state !== current.state;
  }
  return current.state === 'running' && observation.state === 'pending';
}

/**
 * @param {unknown} value
 * @returns {LastDeploy|null}
 */
function normalizeLastDeploy(value) {
  if (
    !isRecord(value) ||
    typeof value.outcome !== 'string' ||
    !DEPLOY_OUTCOMES.includes(value.outcome)
  ) {
    return null;
  }
  /** @type {LastDeploy} */
  const record = {
    outcome: /** @type {'deployed'|'launched'|'failed'} */ (value.outcome),
    reason: typeof value.reason === 'string' ? value.reason : null,
    bead_id: typeof value.bead_id === 'string' ? value.bead_id : '',
    base_sha: typeof value.base_sha === 'string' ? value.base_sha : '',
    at: typeof value.at === 'number' ? value.at : 0
  };
  // Carried only when there is something to carry, so an older `queue.json` and
  // a record with no diagnostics both load as an ABSENT key.
  if (typeof value.detail === 'string' && value.detail.length > 0) {
    record.detail = value.detail;
  }
  if (typeof value.log_path === 'string' && value.log_path.length > 0) {
    record.log_path = value.log_path;
  }
  if (value.adapter === 'workspace' || value.adapter === 'managed') {
    record.adapter = value.adapter;
  }
  if (typeof value.attempt_id === 'string' && value.attempt_id.length > 0) {
    record.attempt_id = value.attempt_id;
  }
  if (/^[0-9a-f]{40}$/i.test(String(value.merged_floor_sha || ''))) {
    record.merged_floor_sha = String(value.merged_floor_sha).toLowerCase();
  }
  if (typeof value.receipt_path === 'string' && value.receipt_path.length > 0) {
    record.receipt_path = value.receipt_path;
  }
  if (/^[0-9a-f]{64}$/i.test(String(value.receipt_digest || ''))) {
    record.receipt_digest = String(value.receipt_digest).toLowerCase();
  }
  return record;
}

/**
 * @param {unknown} raw
 * @returns {Record<string, DeploymentReconcile>}
 */
function normalizeReconcile(raw) {
  /** @type {Record<string, DeploymentReconcile>} */
  const out = {};
  if (!isRecord(raw)) {
    return out;
  }
  for (const [bead_id, value] of Object.entries(raw)) {
    if (
      !isRecord(value) ||
      value.bead_id !== bead_id ||
      typeof value.attempt_id !== 'string' ||
      value.attempt_id.length === 0 ||
      typeof value.target_base !== 'string' ||
      value.target_base.length === 0 ||
      !/^[0-9a-f]{40}$/i.test(String(value.merged_floor_sha || '')) ||
      !RECONCILE_STAGES.includes(String(value.stage || ''))
    ) {
      continue;
    }
    out[bead_id] = {
      bead_id,
      attempt_id: value.attempt_id,
      target_base: value.target_base,
      merged_floor_sha: String(value.merged_floor_sha).toLowerCase(),
      candidate_sha: /^[0-9a-f]{40}$/i.test(String(value.candidate_sha || ''))
        ? String(value.candidate_sha).toLowerCase()
        : null,
      adapter:
        value.adapter === 'workspace' || value.adapter === 'managed'
          ? value.adapter
          : null,
      stage: /** @type {DeploymentReconcile['stage']} */ (value.stage),
      receipt_path:
        typeof value.receipt_path === 'string' && value.receipt_path.length > 0
          ? value.receipt_path
          : null,
      receipt_digest: /^[0-9a-f]{64}$/i.test(String(value.receipt_digest || ''))
        ? String(value.receipt_digest).toLowerCase()
        : null,
      receipt_attempt_id:
        typeof value.receipt_attempt_id === 'string' &&
        value.receipt_attempt_id.length > 0
          ? value.receipt_attempt_id
          : null,
      receipt_floor_sha: /^[0-9a-f]{40}$/i.test(
        String(value.receipt_floor_sha || '')
      )
        ? String(value.receipt_floor_sha).toLowerCase()
        : null,
      retry_count:
        typeof value.retry_count === 'number' &&
        Number.isInteger(value.retry_count) &&
        value.retry_count >= 0
          ? value.retry_count
          : 0,
      retry_at:
        typeof value.retry_at === 'number' && Number.isFinite(value.retry_at)
          ? value.retry_at
          : null,
      last_retryable_reason:
        typeof value.last_retryable_reason === 'string' &&
        value.last_retryable_reason.length > 0
          ? value.last_retryable_reason
          : null,
      terminal_failure:
        isRecord(value.terminal_failure) &&
        typeof value.terminal_failure.reason === 'string'
          ? {
              reason: value.terminal_failure.reason,
              detail:
                typeof value.terminal_failure.detail === 'string'
                  ? value.terminal_failure.detail
                  : null,
              step:
                typeof value.terminal_failure.step === 'string'
                  ? value.terminal_failure.step
                  : null,
              failure_code:
                typeof value.terminal_failure.failure_code === 'string' &&
                validateManagedFailure(value.terminal_failure).ok
                  ? value.terminal_failure.failure_code
                  : null,
              retryable:
                typeof value.terminal_failure.retryable === 'boolean'
                  ? value.terminal_failure.retryable
                  : null,
              at:
                typeof value.terminal_failure.at === 'number'
                  ? value.terminal_failure.at
                  : 0
            }
          : null,
      updated_at:
        typeof value.updated_at === 'number' &&
        Number.isFinite(value.updated_at)
          ? value.updated_at
          : 0
    };
  }
  return out;
}

/**
 * Build a {@link LastDeploy} from a caller's input, or null when the input is
 * not a recordable outcome (which the mutations turn into a refused write).
 *
 * @param {unknown} input
 * @param {number} at
 * @returns {LastDeploy|null}
 */
function buildLastDeploy(input, at) {
  if (!isRecord(input)) {
    return null;
  }
  return normalizeLastDeploy({ ...input, at });
}

/**
 * @param {number} index
 * @param {number} length
 * @returns {number}
 */
function clampIndex(index, length) {
  if (typeof index !== 'number' || !Number.isFinite(index) || index < 0) {
    return length;
  }
  return Math.min(Math.floor(index), length);
}

/**
 * Remove a bead from every lane (used for two-way moves + dedupe).
 *
 * The merge queue goes with them (UI-5v7d §1): a merge turn only means anything
 * while the bead is in `pr_wait`, so a bead that left the lane — merged and
 * cleaned, discarded, dragged back to 대기 — must not keep a place in line. The
 * driver reads the same disappearance and moves on to the next item.
 *
 * @param {Queue} q
 * @param {string} bead_id
 */
function removeFromLanes(q, bead_id) {
  q.queue = q.queue.filter((e) => e.bead_id !== bead_id);
  q.pr_wait = q.pr_wait.filter((e) => e.bead_id !== bead_id);
  q.done = q.done.filter((e) => e.bead_id !== bead_id);
  q.merge_queue = q.merge_queue.filter((e) => e.bead_id !== bead_id);
  // The auto-merge exclusion describes a `pr_wait` member (UI-yk55 §3.2.1): a
  // bead that merged, was discarded, or was dragged back out of the lane carries
  // no exclusion into whatever happens to it next.
  delete q.auto_merge_skips[bead_id];
}

/**
 * Whether a bead may take a place in the merge queue (UI-wwby §2).
 *
 * The EXTERNAL bypass stays — an external row has no durable `pr_wait` entry to
 * be a member of, which is the whole reason it exists (UI-7agi §4) — but it is
 * now subordinate to lane exclusivity: a bead sitting in `queue` or `done` is
 * refused whatever the caller claims about it. That makes the store the final
 * gate rather than the overlay, so the exclusivity `removeFromLanes` just
 * established cannot be undone a moment later by a stale registry row. Both
 * enqueue paths share it deliberately: a manual [머지] click must not be a way
 * around a rule the automatic enroller obeys.
 *
 * @param {Queue} q
 * @param {string} bead_id
 * @param {boolean} external
 */
function enqueueMember(q, bead_id, external) {
  const in_other_lane =
    q.queue.some((e) => e.bead_id === bead_id) ||
    q.done.some((e) => e.bead_id === bead_id);
  if (in_other_lane) {
    return false;
  }
  return external || q.pr_wait.some((e) => e.bead_id === bead_id);
}

/**
 * Insert runnable work immediately before the durable yielded suffix.
 *
 * @param {Queue} q
 * @param {MergeQueueEntry} entry
 */
function insertRunnableMergeEntry(q, entry) {
  const yielded_at = q.merge_queue.findIndex(
    (item) => item.resolution?.state === 'yielded'
  );
  const index = yielded_at < 0 ? q.merge_queue.length : yielded_at;
  q.merge_queue.splice(index, 0, entry);
}

/**
 * Resume one paused saga without discarding its current subject or lineage.
 * The merged SHA is the durable discriminator between pre-merge gating and
 * post-merge cleanup replay.
 *
 * @param {Queue} next
 * @param {string} root_bead_id
 */
function resumeCompletionIntentRecord(next, root_bead_id) {
  const intent = next.completion_intents[root_bead_id];
  if (
    next.auto_merge !== true ||
    !intent ||
    intent.phase !== 'paused' ||
    intent.active_op !== null
  ) {
    return false;
  }
  intent.phase = intent.subject.merged_sha === null ? 'gating' : 'cleaning';
  if (!next.merge_queue.some((entry) => entry.bead_id === root_bead_id)) {
    insertRunnableMergeEntry(next, {
      bead_id: root_bead_id,
      resolution_rounds: 0,
      resolution: null
    });
  }
  if (next.auto_merge_skips[root_bead_id]) {
    delete next.auto_merge_skips[root_bead_id];
  }
  return true;
}

/**
 * Return the sole immutable root attempt used to anchor a completion lineage.
 * Completion repair descendants carry a non-null operation id, so they can
 * never be mistaken for the root provenance record.
 *
 * @param {Queue} queue
 * @param {string} root_bead_id
 * @returns {Attempt|null}
 */
function originalCompletionAnchor(queue, root_bead_id) {
  const anchors = Object.values(queue.attempts).filter(
    (attempt) =>
      attempt.bead_id === root_bead_id &&
      attempt.completion_root_id === root_bead_id &&
      attempt.completion_op_id === null
  );
  return anchors.length === 1 ? anchors[0] : null;
}

/**
 * Backfill the one unambiguous root provenance record written before root
 * anchors existed. Current completion intake writes its anchor atomically.
 *
 * @param {Queue} queue
 */
function recoverLegacyCompletionAnchors(queue) {
  for (const [root_bead_id, intent] of Object.entries(
    queue.completion_intents
  )) {
    if (originalCompletionAnchor(queue, root_bead_id)) {
      continue;
    }
    const candidates = Object.values(queue.attempts).filter(
      (attempt) =>
        attempt.bead_id === root_bead_id &&
        attempt.target_base === intent.target_base &&
        attempt.base_oid === intent.subject.base_sha &&
        attempt.completion_root_id === null &&
        attempt.completion_op_id === null &&
        attempt.completion_mode === null &&
        attempt.completion_failure_key === null
    );
    if (candidates.length === 1) {
      candidates[0].completion_root_id = root_bead_id;
      candidates[0].completion_op_id = null;
    }
  }
}

/**
 * Validate that an attempt can become a completion intent's sole root anchor.
 * This is intentionally separate from the mutation so callers can reject an
 * invalid intake without partially placing its merge-queue entry.
 *
 * @param {Queue} queue
 * @param {string} root_bead_id
 * @param {string|undefined} source_attempt_id
 * @param {string} target_base
 * @param {CompletionSubject} subject
 * @returns {Attempt|null}
 */
function completionSourceForAnchor(
  queue,
  root_bead_id,
  source_attempt_id,
  target_base,
  subject
) {
  if (typeof source_attempt_id !== 'string' || source_attempt_id.length === 0) {
    return null;
  }
  const source = queue.attempts[source_attempt_id];
  if (
    !source ||
    source.bead_id !== root_bead_id ||
    source.target_base !== target_base ||
    source.base_oid !== subject.base_sha ||
    (source.completion_root_id !== null &&
      source.completion_root_id !== root_bead_id) ||
    source.completion_op_id !== null ||
    source.completion_mode !== null ||
    source.completion_failure_key !== null
  ) {
    return null;
  }
  const anchors = Object.values(queue.attempts).filter(
    (attempt) =>
      attempt.bead_id === root_bead_id &&
      attempt.completion_root_id === root_bead_id &&
      attempt.completion_op_id === null
  );
  return anchors.length === 0 ||
    (anchors.length === 1 && anchors[0].attempt_id === source_attempt_id)
    ? source
    : null;
}

/**
 * The root's Done transition is also the saga's durable completion receipt.
 * Repair children are not keys in this map, so their own cleanup cannot close
 * the root by accident.
 *
 * @param {Queue} q
 * @param {string} bead_id
 */
function completeIntentForDone(q, bead_id) {
  const intent = q.completion_intents[bead_id];
  if (!intent) {
    return;
  }
  intent.phase = 'completed';
  intent.active_op = null;
  intent.terminal_reason = null;
}

/**
 * Create a Worker queue store. A single instance is shared server-wide so all
 * connections (and thus all clients dragging concurrently) observe one coherent
 * in-memory revision, making the CAS authoritative in-process.
 *
 * @param {{ now?: () => number, filePathFor?: (workspace: string) => string, fs?: typeof import('node:fs') }} [options]
 */
export function createQueueStore(options = {}) {
  const now = options.now || (() => Date.now());
  const filePathFor = options.filePathFor || queueFilePath;
  const fs = options.fs || nodeFs;

  /** @type {Map<string, Queue>} */
  const cache = new Map();

  /**
   * @param {string} workspace
   * @returns {string}
   */
  function keyFor(workspace) {
    return path.resolve(String(workspace || ''));
  }

  /**
   * Cold-load a workspace queue from disk (once per process), forcing
   * `auto_advance = false` for restart safety. Subsequent calls return the
   * cached in-memory queue.
   *
   * @param {string} workspace
   * @returns {Queue}
   */
  function ensureLoaded(workspace) {
    const key = keyFor(workspace);
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }
    let q = emptyQueue();
    try {
      const raw = fs.readFileSync(filePathFor(workspace), 'utf8');
      q = normalizeQueue(JSON.parse(raw));
    } catch {
      q = emptyQueue();
    }
    // Restart safety: never auto-resume execution after a crash.
    q.auto_advance = false;
    cache.set(key, q);
    return q;
  }

  /**
   * Atomically persist a queue for a workspace (temp file + rename).
   *
   * @param {string} workspace
   * @param {Queue} q
   */
  function persist(workspace, q) {
    const file = filePathFor(workspace);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(q, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * Apply a CAS-guarded mutation. Builds the next state on a clone, persists it,
   * and only commits to the cache on a successful write — so a failed write
   * leaves both memory and disk at the prior revision (atomic op).
   *
   * @param {string} workspace
   * @param {number} expected_revision
   * @param {(next: Queue) => boolean} mutate - Returns false to reject.
   * @returns {QueueOpResult}
   */
  function applyMutation(workspace, expected_revision, mutate) {
    const cur = ensureLoaded(workspace);
    if (expected_revision !== cur.revision) {
      return { ok: false, conflict: true, queue: clone(cur) };
    }
    const next = clone(cur);
    if (!mutate(next)) {
      return { ok: false, conflict: false, queue: clone(cur) };
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return { ok: true, conflict: false, queue: clone(next) };
  }

  /**
   * Apply a scheduler-owned mutation WITHOUT a revision CAS. Client drags use
   * the CAS-guarded ops above; the scheduler is the single in-process writer for
   * attempt lifecycle + lane transitions, so its mutations always apply against
   * the current in-memory revision (which it still bumps so subscribers refresh).
   *
   * @param {string} workspace
   * @param {(next: Queue) => boolean} mutate
   * @returns {QueueOpResult}
   */
  function applyUnconditional(workspace, mutate) {
    const cur = ensureLoaded(workspace);
    const next = clone(cur);
    if (!mutate(next)) {
      return { ok: false, conflict: false, queue: clone(cur) };
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return { ok: true, conflict: false, queue: clone(next) };
  }

  /**
   * Fold the terminal receipt scan into the SAME queue mutation that settles an
   * attempt. Files stay untouched until that atomic write succeeds, so a queue
   * persistence failure is retried from the inbox rather than losing evidence.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {Partial<Attempt>} patch
   * @returns {{ patch: Partial<Attempt>, files: string[] }}
   */
  function terminalReceiptPatch(workspace, attempt_id, patch) {
    const current = ensureLoaded(workspace).attempts[attempt_id];
    if (!current) {
      return { patch, files: [] };
    }
    let scanned;
    try {
      scanned = readAttemptUsageReceipts(workspace, attempt_id, {
        known_legs: current.usage_legs
      });
    } catch {
      return { patch, files: [] };
    }
    return {
      patch: {
        ...patch,
        usage_legs: normalizeUsageLegs([
          ...(Array.isArray(current.usage_legs) ? current.usage_legs : []),
          ...scanned.legs
        ])
      },
      files: scanned.files
    };
  }

  /**
   * @param {QueueOpResult} result
   * @param {string[]} files
   */
  function consumeTerminalReceipts(result, files) {
    if (result.ok && files.length > 0) {
      consumeUsageReceiptFiles(files);
    }
  }

  return {
    /**
     * Cold-load (and cache) a workspace queue, forcing auto_advance=false.
     *
     * @param {string} workspace
     * @returns {Queue}
     */
    load(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * Current in-memory snapshot (loads on first access).
     *
     * @param {string} workspace
     * @returns {Queue}
     */
    snapshot(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, target_base: string, merged_floor_sha: string }} input
     * @returns {QueueOpResult}
     */
    enqueueReconcile(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const { bead_id, attempt_id, target_base, merged_floor_sha } = input;
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof attempt_id !== 'string' ||
          attempt_id.length === 0 ||
          typeof target_base !== 'string' ||
          target_base.length === 0 ||
          !/^[0-9a-f]{40}$/i.test(String(merged_floor_sha || ''))
        ) {
          return false;
        }
        const current = next.reconcile[bead_id];
        if (
          current &&
          current.stage !== 'complete' &&
          current.stage !== 'failed'
        ) {
          return false;
        }
        next.reconcile[bead_id] = {
          bead_id,
          attempt_id,
          target_base,
          merged_floor_sha: merged_floor_sha.toLowerCase(),
          candidate_sha: null,
          adapter: null,
          stage: 'queued',
          receipt_path: null,
          receipt_digest: null,
          receipt_attempt_id: null,
          receipt_floor_sha: null,
          retry_count: 0,
          retry_at: null,
          last_retryable_reason: null,
          terminal_failure: null,
          updated_at: now()
        };
        return true;
      });
    },

    /**
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, stage: 'queued'|'pinned'|'verifying'|'deploying'|'restarting'|'readback', candidate_sha?: string, adapter?: 'workspace'|'managed' }} input
     * @returns {QueueOpResult}
     */
    advanceReconcile(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const current = next.reconcile[input.bead_id];
        if (
          !current ||
          current.attempt_id !== input.attempt_id ||
          current.stage === 'complete' ||
          current.stage === 'failed' ||
          !RECONCILE_STAGES.includes(input.stage)
        ) {
          return false;
        }
        if (
          input.candidate_sha !== undefined &&
          !/^[0-9a-f]{40}$/i.test(input.candidate_sha)
        ) {
          return false;
        }
        if (
          current.candidate_sha !== null &&
          input.candidate_sha !== undefined &&
          current.candidate_sha !== input.candidate_sha.toLowerCase()
        ) {
          return false;
        }
        if (
          current.adapter !== null &&
          input.adapter !== undefined &&
          current.adapter !== input.adapter
        ) {
          return false;
        }
        if (
          input.adapter !== undefined &&
          input.adapter !== 'workspace' &&
          input.adapter !== 'managed'
        ) {
          return false;
        }
        current.stage = input.stage;
        if (input.candidate_sha !== undefined) {
          current.candidate_sha = input.candidate_sha.toLowerCase();
        }
        if (input.adapter !== undefined) {
          current.adapter = input.adapter;
        }
        current.retry_at = null;
        current.updated_at = now();
        return true;
      });
    },

    /**
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, reason: string, retry_at: number }} input
     * @returns {QueueOpResult}
     */
    retryReconcile(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const current = next.reconcile[input.bead_id];
        if (
          !current ||
          current.attempt_id !== input.attempt_id ||
          current.stage === 'complete' ||
          current.stage === 'failed' ||
          typeof input.reason !== 'string' ||
          input.reason.length === 0 ||
          typeof input.retry_at !== 'number' ||
          !Number.isFinite(input.retry_at)
        ) {
          return false;
        }
        current.retry_count += 1;
        current.retry_at = input.retry_at;
        current.last_retryable_reason = input.reason;
        current.updated_at = now();
        return true;
      });
    },

    /**
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, receipt_path: string, receipt_digest: string, receipt_attempt_id?: string, receipt_floor_sha?: string, mirror_last_deploy?: boolean }} input
     * @returns {QueueOpResult}
     */
    completeReconcile(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const current = next.reconcile[input.bead_id];
        if (
          !current ||
          current.attempt_id !== input.attempt_id ||
          current.stage === 'complete' ||
          current.stage === 'failed' ||
          current.candidate_sha === null ||
          current.adapter === null ||
          typeof input.receipt_path !== 'string' ||
          input.receipt_path.length === 0 ||
          !/^[0-9a-f]{64}$/i.test(String(input.receipt_digest || ''))
        ) {
          return false;
        }
        if (
          input.receipt_floor_sha !== undefined &&
          !/^[0-9a-f]{40}$/i.test(input.receipt_floor_sha)
        ) {
          return false;
        }
        if (
          input.receipt_attempt_id !== undefined &&
          (typeof input.receipt_attempt_id !== 'string' ||
            input.receipt_attempt_id.length === 0)
        ) {
          return false;
        }
        const prior = next.last_deploy;
        const record =
          input.mirror_last_deploy === false
            ? null
            : buildLastDeploy(
                {
                  outcome: 'deployed',
                  reason: null,
                  bead_id: current.bead_id,
                  base_sha: current.candidate_sha,
                  adapter: current.adapter,
                  attempt_id: current.attempt_id,
                  merged_floor_sha: current.merged_floor_sha,
                  receipt_path: input.receipt_path,
                  receipt_digest: input.receipt_digest,
                  ...(prior?.bead_id === current.bead_id &&
                  prior.base_sha === current.candidate_sha
                    ? { detail: prior.detail, log_path: prior.log_path }
                    : {})
                },
                now()
              );
        if (input.mirror_last_deploy !== false && !record) {
          return false;
        }
        current.stage = 'complete';
        current.receipt_path = input.receipt_path;
        current.receipt_digest = input.receipt_digest.toLowerCase();
        current.receipt_attempt_id =
          input.receipt_attempt_id || current.attempt_id;
        current.receipt_floor_sha = (
          input.receipt_floor_sha || current.merged_floor_sha
        ).toLowerCase();
        current.retry_at = null;
        current.terminal_failure = null;
        current.updated_at = now();
        if (record) {
          next.last_deploy = record;
        }
        return true;
      });
    },

    /**
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, reason: string, detail?: string|null, step?: string|null, failure_code?: string, retryable?: boolean }} input
     * @returns {QueueOpResult}
     */
    failReconcile(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const current = next.reconcile[input.bead_id];
        if (
          !current ||
          current.attempt_id !== input.attempt_id ||
          current.stage === 'complete' ||
          current.stage === 'failed' ||
          typeof input.reason !== 'string' ||
          input.reason.length === 0 ||
          (input.failure_code !== undefined &&
            !validateManagedFailure(input).ok)
        ) {
          return false;
        }
        current.stage = 'failed';
        current.retry_at = null;
        current.terminal_failure = {
          reason: input.reason,
          detail: typeof input.detail === 'string' ? input.detail : null,
          step: typeof input.step === 'string' ? input.step : null,
          failure_code:
            typeof input.failure_code === 'string' ? input.failure_code : null,
          retryable:
            typeof input.retryable === 'boolean' ? input.retryable : null,
          at: now()
        };
        current.updated_at = now();
        return true;
      });
    },

    /**
     * Place a bead into the waiting `queue` at an index, removing it from every
     * other lane (dedupe). CAS-guarded.
     *
     * There is no `lane` input any more: with the serial/parallel split gone
     * (worker-phase2 §3) the only placeable lane is `queue`, so an argument
     * with one legal value would be pure ceremony — and a stale client that
     * still sends `lane:'serial'` now simply lands in the one queue instead of
     * being rejected.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, index?: number }} input
     * @returns {QueueOpResult}
     */
    place(workspace, input) {
      const { expected_revision, bead_id, index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        removeFromLanes(next, bead_id);
        const arr = next.queue;
        arr.splice(
          clampIndex(index ?? arr.length, arr.length),
          0,
          makeQueueEntry(bead_id, now())
        );
        return true;
      });
    },

    /**
     * Reorder a bead within the waiting `queue`. CAS-guarded.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, to_index: number }} input
     * @returns {QueueOpResult}
     */
    reorder(workspace, input) {
      const { expected_revision, bead_id, to_index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const arr = next.queue;
        const from = arr.findIndex((e) => e.bead_id === bead_id);
        if (from < 0) {
          return false;
        }
        const [entry] = arr.splice(from, 1);
        arr.splice(clampIndex(to_index, arr.length), 0, entry);
        return true;
      });
    },

    /**
     * Set the concurrency cap (worker-phase2 §3). CAS-guarded, mirroring
     * {@link toggleAutoAdvance}. A value that is not an integer ≥ 1 is REJECTED
     * (`ok:false, conflict:false`) without a write, so a malformed client input
     * can never corrupt the stored cap.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, slots: unknown }} input
     * @returns {QueueOpResult}
     */
    setSlots(workspace, input) {
      const { expected_revision, slots } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const value = normalizeSlots(slots);
        if (value === null) {
          return false;
        }
        next.slots = value;
        return true;
      });
    },

    /**
     * Toggle the `auto_advance` flag. CAS-guarded. Phase 9 only persists the
     * flag — no execution is dispatched.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean }} input
     * @returns {QueueOpResult}
     */
    toggleAutoAdvance(workspace, input) {
      const { expected_revision, on } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        next.auto_advance = !!on;
        return true;
      });
    },

    /**
     * Toggle merge-serial dispatch through the durable PR-wait lifecycle. The
     * flag is durable because the wait routinely spans server restarts.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean }} input
     * @returns {QueueOpResult}
     */
    setPrWaitHoldsSlot(workspace, input) {
      const { expected_revision, on } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        next.pr_wait_holds_slot = !!on;
        return true;
      });
    },

    /**
     * Remove a bead from all placement lanes. CAS-guarded.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string }} input
     * @returns {QueueOpResult}
     */
    remove(workspace, input) {
      const { expected_revision, bead_id } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        removeFromLanes(next, bead_id);
        delete next.admission[bead_id];
        // A bead the user pulled out of every lane carries no pending cleanup
        // banner either — the record describes a lane member (§6).
        delete next.cleanup_failed[bead_id];
        return true;
      });
    },

    /**
     * Persist an attempt record (spec §5.2). CAS-guarded. Keyed by attempt_id.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, attempt: Partial<Attempt> & { attempt_id: string, bead_id: string } }} input
     * @returns {QueueOpResult}
     */
    appendAttempt(workspace, input) {
      const { expected_revision, attempt } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (
          !attempt ||
          typeof attempt.attempt_id !== 'string' ||
          typeof attempt.bead_id !== 'string'
        ) {
          return false;
        }
        next.attempts[attempt.attempt_id] = makeAttempt(attempt);
        return true;
      });
    },

    /**
     * Atomically prerecord a conflict-resolution attempt and bind its owning
     * merge queue item before the resolver process can outlive the driver.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, queue_bead_id: string, subject_bead_id: string, wait_ms: number, attempt: Partial<Attempt> & { attempt_id: string, bead_id: string } }} input
     * @returns {QueueOpResult}
     */
    appendResolutionAttempt(workspace, input) {
      const {
        expected_revision,
        queue_bead_id,
        subject_bead_id,
        wait_ms,
        attempt
      } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === queue_bead_id
        );
        if (
          !entry ||
          entry.resolution !== null ||
          !attempt ||
          typeof attempt.attempt_id !== 'string' ||
          attempt.attempt_id.length === 0 ||
          Object.hasOwn(next.attempts, attempt.attempt_id) ||
          attempt.bead_id !== subject_bead_id ||
          attempt.conflict_resolution !== true ||
          typeof attempt.started_at !== 'number' ||
          !Number.isFinite(attempt.started_at) ||
          typeof wait_ms !== 'number' ||
          !Number.isFinite(wait_ms) ||
          wait_ms < 0
        ) {
          return false;
        }
        next.attempts[attempt.attempt_id] = makeAttempt(attempt);
        entry.resolution = {
          attempt_id: attempt.attempt_id,
          subject_bead_id,
          deadline_at: attempt.started_at + wait_ms,
          state: 'waiting',
          yielded_at: null,
          settled_at: null
        };
        return true;
      });
    },

    /**
     * Append a resumed completion attempt and transfer the active operation to
     * it in the same CAS-guarded persist. A caller cannot reconstruct the
     * completion identity: it is copied from the active source record only.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, source_attempt_id: string, attempt: Partial<Attempt> & { attempt_id: string, bead_id: string } }} input
     * @returns {QueueOpResult}
     */
    appendResumedCompletionAttempt(workspace, input) {
      const { expected_revision, source_attempt_id, attempt } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const source = next.attempts[source_attempt_id];
        if (
          !source ||
          !attempt ||
          typeof attempt.attempt_id !== 'string' ||
          attempt.attempt_id.length === 0 ||
          Object.hasOwn(next.attempts, attempt.attempt_id) ||
          attempt.resumed_from !== source_attempt_id ||
          attempt.bead_id !== source.bead_id ||
          attempt.repo !== source.repo ||
          attempt.target_base !== source.target_base ||
          attempt.base_oid !== source.base_oid ||
          (attempt.continuation_mode !== 'fresh' &&
            attempt.runner !== source.runner) ||
          attempt.session_id != null ||
          attempt.pid != null ||
          attempt.status !== 'running' ||
          (source.status !== 'paused' &&
            source.status !== 'failed' &&
            source.status !== 'orphaned') ||
          Object.values(next.attempts).some(
            (item) => item.resumed_from === source_attempt_id
          ) ||
          typeof source.completion_root_id !== 'string' ||
          typeof source.completion_op_id !== 'string' ||
          (source.completion_mode !== 'resume_root' &&
            source.completion_mode !== 'dispatch_repair') ||
          source.completion_failure_key === null
        ) {
          return false;
        }
        const intent = next.completion_intents[source.completion_root_id];
        const active_op = intent?.active_op;
        if (
          !intent ||
          intent.phase !== 'repairing' ||
          !active_op ||
          active_op.op_id !== source.completion_op_id ||
          active_op.attempt_id !== source_attempt_id ||
          active_op.kind !== source.completion_mode ||
          !sameCompletionFailureKey(
            active_op.failure_key,
            source.completion_failure_key
          ) ||
          (attempt.completion_root_id != null &&
            attempt.completion_root_id !== source.completion_root_id) ||
          (attempt.completion_op_id != null &&
            attempt.completion_op_id !== source.completion_op_id) ||
          (attempt.completion_mode != null &&
            attempt.completion_mode !== source.completion_mode) ||
          (attempt.completion_failure_key != null &&
            !sameCompletionFailureKey(
              normalizeCompletionFailureKey(attempt.completion_failure_key),
              source.completion_failure_key
            ))
        ) {
          return false;
        }
        next.attempts[attempt.attempt_id] = makeAttempt({
          ...attempt,
          worker_serial: source.worker_serial === true,
          completion_root_id: source.completion_root_id,
          completion_op_id: source.completion_op_id,
          completion_mode: source.completion_mode,
          completion_failure_key: source.completion_failure_key
        });
        active_op.attempt_id = attempt.attempt_id;
        return true;
      });
    },

    /**
     * Adopt one pre-fix resume chain whose descendants lost completion
     * metadata. Only an unbranched, acyclic, same-Bead chain ending in a known
     * attempt status is safe to bind to the active operation.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string }} input
     * @returns {QueueOpResult}
     */
    adoptLegacyCompletionAttempt(workspace, input) {
      const { root_bead_id } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const active_op = intent?.active_op;
        const source = active_op
          ? next.attempts[active_op.attempt_id || '']
          : null;
        if (
          !intent ||
          !active_op ||
          (active_op.kind !== 'resume_root' &&
            active_op.kind !== 'dispatch_repair') ||
          !source ||
          source.status !== 'paused'
        ) {
          reason = 'legacy_adoption_not_applicable';
          return false;
        }
        if (
          source.completion_root_id !== root_bead_id ||
          source.completion_op_id !== active_op.op_id ||
          source.completion_mode !== active_op.kind ||
          !sameCompletionFailureKey(
            source.completion_failure_key,
            active_op.failure_key
          )
        ) {
          reason = 'legacy_lineage_ambiguous';
          return false;
        }

        let leaf = source;
        const visited = new Set([source.attempt_id]);
        while (true) {
          const children = Object.values(next.attempts).filter(
            (item) => item.resumed_from === leaf.attempt_id
          );
          if (children.length === 0) {
            break;
          }
          if (children.length !== 1) {
            reason = 'legacy_lineage_ambiguous';
            return false;
          }
          const child = children[0];
          if (
            visited.has(child.attempt_id) ||
            child.bead_id !== source.bead_id ||
            (child.completion_root_id !== null &&
              child.completion_root_id !== root_bead_id) ||
            (child.completion_op_id !== null &&
              child.completion_op_id !== active_op.op_id) ||
            (child.completion_mode !== null &&
              child.completion_mode !== active_op.kind) ||
            (child.completion_failure_key !== null &&
              !sameCompletionFailureKey(
                child.completion_failure_key,
                active_op.failure_key
              ))
          ) {
            reason = 'legacy_lineage_ambiguous';
            return false;
          }
          visited.add(child.attempt_id);
          leaf = child;
        }
        if (leaf === source) {
          reason = 'legacy_descendant_missing';
          return false;
        }
        if (!COMPLETION_RESUME_LEAF_STATUSES.has(leaf.status || '')) {
          reason = 'legacy_lineage_ambiguous';
          return false;
        }
        leaf.completion_root_id = root_bead_id;
        leaf.completion_op_id = active_op.op_id;
        leaf.completion_mode = active_op.kind;
        leaf.completion_failure_key = { ...active_op.failure_key };
        active_op.attempt_id = leaf.attempt_id;
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Stamp `dismissed_at` on a `failed`/`orphaned` attempt — the human ✕ that
     * declares a failure handled so its banner stops rendering. A USER-initiated
     * edit, so it runs the CAS path like the other client mutations; a stale
     * `expected_revision` rejects with `conflict:true`.
     *
     * Every other rejection is `conflict:false` + a `reason`, which is why the
     * checks live inside the mutate closure rather than in front of it: the
     * decision must read the same clone the write lands on, in ONE persist.
     * Dismissing an already-dismissed attempt is a REJECTION rather than a no-op
     * success — the first dismiss bumped the revision, so a double click is
     * normally caught by the CAS, and reporting success without a revision bump
     * would be the one inconsistent outcome.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, expected_revision: number }} input
     * @returns {QueueOpResult}
     */
    dismissAttempt(workspace, input) {
      const { attempt_id, expected_revision } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyMutation(workspace, expected_revision, (next) => {
        if (!Object.hasOwn(next.attempts, attempt_id)) {
          reason = 'attempt_not_found';
          return false;
        }
        const cur = next.attempts[attempt_id];
        if (cur.status !== 'failed' && cur.status !== 'orphaned') {
          reason = 'not_dismissable';
          return false;
        }
        if (typeof cur.dismissed_at === 'number') {
          reason = 'already_dismissed';
          return false;
        }
        next.attempts[attempt_id] = makeAttempt({
          ...cur,
          dismissed_at: now()
        });
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Merge a patch into an existing attempt record (scheduler-owned, no CAS).
     * Fills runtime fields at dispatch / termination (spec §5.2).
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, patch: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    updateAttempt(workspace, input) {
      const { attempt_id, patch } = input;
      const current_status =
        ensureLoaded(workspace).attempts[attempt_id]?.status;
      const terminal =
        patch.status === 'paused' ||
        patch.status === 'stopped' ||
        patch.status === 'discarded' ||
        patch.status === 'done' ||
        patch.status === 'failed' ||
        patch.status === 'orphaned' ||
        current_status === 'paused' ||
        current_status === 'stopped' ||
        current_status === 'discarded' ||
        current_status === 'done' ||
        current_status === 'failed' ||
        current_status === 'orphaned';
      const prepared = terminal
        ? terminalReceiptPatch(workspace, attempt_id, patch)
        : { patch, files: [] };
      const result = applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur) {
          return false;
        }
        next.attempts[attempt_id] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...cur,
            ...prepared.patch,
            attempt_id,
            bead_id: prepared.patch.bead_id ?? cur.bead_id
          })
        );
        return true;
      });
      consumeTerminalReceipts(result, prepared.files);
      return result;
    },

    /**
     * Persist a pause request before any signal is attempted.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, kind: 'pause' }} input
     * @returns {QueueOpResult}
     */
    requestAttemptControl(workspace, input) {
      const { attempt_id, kind } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur) {
          reason = 'attempt_not_found';
          return false;
        }
        if (kind !== 'pause') {
          reason = 'kind_invalid';
          return false;
        }
        if (cur.status !== 'running') {
          reason = 'not_running';
          return false;
        }
        if (cur.control !== null) {
          reason = 'control_exists';
          return false;
        }
        next.attempts[attempt_id] = makeAttempt({
          ...cur,
          control: {
            kind: 'pause',
            phase: 'requested',
            requested_at: now(),
            last_error: null
          }
        });
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Advance one durable attempt-control phase with an expected-phase fence.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, expected_phase: 'requested'|'signaled'|'terminated'|'done'|'failed', next_phase: 'requested'|'signaled'|'terminated'|'done'|'failed', last_error?: string|null }} input
     * @returns {QueueOpResult}
     */
    advanceAttemptControl(workspace, input) {
      const { attempt_id, expected_phase, next_phase, last_error } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur || cur.control === null) {
          reason = cur ? 'control_missing' : 'attempt_not_found';
          return false;
        }
        if (cur.control.phase !== expected_phase) {
          reason = 'phase_mismatch';
          return false;
        }
        const allowed = ATTEMPT_CONTROL_TRANSITIONS[expected_phase];
        if (!allowed || !allowed.has(next_phase)) {
          reason = 'transition_invalid';
          return false;
        }
        next.attempts[attempt_id] = makeAttempt({
          ...cur,
          control: {
            ...cur.control,
            phase: next_phase,
            last_error:
              next_phase === 'failed' && typeof last_error === 'string'
                ? last_error
                : null
          }
        });
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Atomically finish a terminated pause and mark the attempt resumable.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, finished_at: number, patch?: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    completeAttemptControl(workspace, input) {
      const { attempt_id, finished_at, patch } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur || cur.control === null) {
          reason = cur ? 'control_missing' : 'attempt_not_found';
          return false;
        }
        if (cur.control.phase !== 'terminated') {
          reason = 'phase_mismatch';
          return false;
        }
        next.attempts[attempt_id] = makeAttempt({
          ...cur,
          ...(patch || {}),
          status: 'paused',
          cause: null,
          finished_at,
          control: { ...cur.control, phase: 'done', last_error: null }
        });
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Create the bead's durable discard intent and merge fence in one CAS
     * mutation. A fresh duplicate returns the existing active operation
     * without minting a second id or bumping the revision.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, operation: { operation_id: string, bead_id: string, attempt_id?: string|null, process_identity?: { pid: number, pgid: number, started_at: number }|null, source_snapshot: Record<string, unknown> } }} input
     * @returns {QueueOpResult & { reused?: boolean, operation?: DiscardOperation }}
     */
    createDiscardOperation(workspace, input) {
      const { expected_revision, operation } = input;
      const current = ensureLoaded(workspace);
      if (expected_revision !== current.revision) {
        return {
          ok: false,
          conflict: true,
          queue: clone(current)
        };
      }
      const existing = Object.values(current.discard_operations).find(
        (item) => item.bead_id === operation?.bead_id && item.phase !== 'done'
      );
      if (existing) {
        return {
          ok: true,
          conflict: false,
          reused: true,
          operation: clone(existing),
          queue: clone(current)
        };
      }
      const normalized = normalizeDiscardOperation(
        {
          ...operation,
          requested_at: now(),
          mode: 'undecided',
          phase: 'requested',
          backup: null,
          original_pr: null,
          revert_pr: null,
          receipts: {},
          last_error: null
        },
        operation?.operation_id
      );
      if (!normalized) {
        return {
          ok: false,
          conflict: false,
          reason: 'operation_invalid',
          queue: clone(current)
        };
      }
      const result = applyMutation(workspace, expected_revision, (next) => {
        if (Object.hasOwn(next.discard_operations, normalized.operation_id)) {
          return false;
        }
        if (
          Object.values(next.discard_operations).some(
            (item) =>
              item.bead_id === normalized.bead_id && item.phase !== 'done'
          )
        ) {
          return false;
        }
        next.discard_operations[normalized.operation_id] = normalized;
        next.merge_queue = next.merge_queue.filter(
          (item) => item.bead_id !== normalized.bead_id
        );
        delete next.auto_merge_skips[normalized.bead_id];
        return true;
      });
      return result.ok
        ? { ...result, operation: clone(normalized) }
        : { ...result, reason: 'operation_conflict' };
    },

    /**
     * Advance one discard phase under an expected-phase fence. Immutable
     * source identity fields are deliberately absent from the applied patch.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, expected_phase: string, next_phase: string, patch?: { mode?: 'undecided'|'unmerged'|'merged_revert', backup?: DiscardOperation['backup'], original_pr?: Record<string, unknown>|null, revert_pr?: Record<string, unknown>|null, receipts?: Record<string, unknown>, source_snapshot?: Record<string, unknown> } }} input
     * @returns {QueueOpResult}
     */
    advanceDiscardOperation(workspace, input) {
      const { operation_id, expected_phase, next_phase, patch = {} } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const current = next.discard_operations[operation_id];
        if (!current) {
          reason = 'operation_not_found';
          return false;
        }
        if (current.phase !== expected_phase) {
          reason = 'phase_mismatch';
          return false;
        }
        if (typeof next_phase !== 'string' || next_phase.length === 0) {
          reason = 'phase_invalid';
          return false;
        }
        if (next_phase === 'done') {
          reason = 'use_complete';
          return false;
        }
        const mode = patch.mode ?? current.mode;
        if (
          mode !== 'undecided' &&
          mode !== 'unmerged' &&
          mode !== 'merged_revert'
        ) {
          reason = 'mode_invalid';
          return false;
        }
        let backup = current.backup;
        if (Object.hasOwn(patch, 'backup')) {
          backup = normalizeDiscardBackup(patch.backup);
          if (patch.backup !== null && backup === null) {
            reason = 'backup_invalid';
            return false;
          }
        }
        next.discard_operations[operation_id] = {
          ...current,
          mode,
          phase: next_phase,
          backup,
          original_pr: Object.hasOwn(patch, 'original_pr')
            ? normalizeJsonRecord(patch.original_pr)
            : current.original_pr,
          revert_pr: Object.hasOwn(patch, 'revert_pr')
            ? normalizeJsonRecord(patch.revert_pr)
            : current.revert_pr,
          receipts: {
            ...current.receipts,
            ...(normalizeJsonRecord(patch.receipts) || {})
          },
          last_error: null
        };
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Keep a failed operation active at the phase whose authoritative action
     * must be retried.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, expected_phase: string, reason: string }} input
     * @returns {QueueOpResult}
     */
    failDiscardOperation(workspace, input) {
      const { operation_id, expected_phase, reason: failure } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const current = next.discard_operations[operation_id];
        if (!current) {
          reason = 'operation_not_found';
          return false;
        }
        if (current.phase !== expected_phase) {
          reason = 'phase_mismatch';
          return false;
        }
        if (typeof failure !== 'string' || failure.length === 0) {
          reason = 'reason_invalid';
          return false;
        }
        current.last_error = failure;
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Remove all server-owned lane/failure membership and release the durable
     * fence on the same final write.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, expected_phase: string, deploy?: { outcome: 'deployed'|'launched'|'failed', reason: string|null, bead_id: string, base_sha: string, detail?: string, log_path?: string } }} input
     * @returns {QueueOpResult}
     */
    completeDiscardOperation(workspace, input) {
      const { operation_id, expected_phase } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const current = next.discard_operations[operation_id];
        if (!current) {
          reason = 'operation_not_found';
          return false;
        }
        if (current.phase !== expected_phase) {
          reason = 'phase_mismatch';
          return false;
        }
        const deploy = Object.hasOwn(input, 'deploy')
          ? buildLastDeploy(input.deploy, now())
          : null;
        if (Object.hasOwn(input, 'deploy') && deploy === null) {
          reason = 'deploy_invalid';
          return false;
        }
        removeFromLanes(next, current.bead_id);
        delete next.admission[current.bead_id];
        delete next.cleanup_failed[current.bead_id];
        next.discard_operations[operation_id] = {
          ...current,
          phase: 'done',
          last_error: null
        };
        if (deploy !== null) {
          next.last_deploy = deploy;
        }
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * @param {string} workspace
     * @returns {Set<string>}
     */
    activeDiscardBeadIds(workspace) {
      return new Set(
        Object.values(ensureLoaded(workspace).discard_operations)
          .filter((operation) => operation.phase !== 'done')
          .map((operation) => operation.bead_id)
      );
    },

    /**
     * Discard an attempt: write its terminal patch AND drop the bead from every
     * lane + its admission badge in ONE persist (worker-phase1 §2.2).
     *
     * Splitting this into `updateAttempt` + `remove` would leave a window where
     * a CAS conflict or a restart between the two writes yields "attempt
     * stopped but bead still queued", which breaks the discard guarantee (the
     * next tick would re-dispatch the bead the user just discarded).
     * Scheduler-owned (no CAS), like the other lifecycle transitions.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, bead_id: string, patch: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    discardAttempt(workspace, input) {
      const { attempt_id, bead_id, patch } = input;
      const prepared = terminalReceiptPatch(workspace, attempt_id, patch);
      const result = applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur || typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        next.attempts[attempt_id] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...cur,
            ...prepared.patch,
            attempt_id,
            bead_id: cur.bead_id
          })
        );
        removeFromLanes(next, bead_id);
        delete next.admission[bead_id];
        return true;
      });
      consumeTerminalReceipts(result, prepared.files);
      return result;
    },

    /**
     * Move a bead into the PR-wait lane: write the attempt's terminal patch AND
     * place the bead in `pr_wait` in ONE persist (worker-phase2 §4).
     *
     * Same rationale as {@link discardAttempt}: splitting this into
     * `updateAttempt` + a lane move leaves a window where a restart between the
     * two writes yields "attempt done but bead still queued", and the next tick
     * would re-dispatch a bead whose PR is already open. Scheduler-owned (no
     * CAS), like the other lifecycle transitions.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, patch: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    moveToPrWait(workspace, input) {
      const { bead_id, attempt_id, patch } = input;
      const prepared = terminalReceiptPatch(workspace, attempt_id, patch);
      const result = applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur || typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        next.attempts[attempt_id] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...cur,
            ...prepared.patch,
            attempt_id,
            bead_id: cur.bead_id
          })
        );
        // A bead RE-entering `pr_wait` keeps its place in the merge queue and
        // its consumed rounds (UI-5v7d §2): this transition is exactly what a
        // finished conflict-resolution attempt performs, and the driver is
        // sitting on that item waiting to re-merge it. Letting the lane-dedupe
        // drop the entry here would read to the driver as "the item is gone"
        // and silently cancel the automatic re-merge the whole feature exists
        // for. Every OTHER lane exit still drops it — see `removeFromLanes`.
        const queued_at = next.merge_queue.findIndex(
          (e) => e.bead_id === bead_id
        );
        const queued = queued_at >= 0 ? next.merge_queue[queued_at] : null;
        removeFromLanes(next, bead_id);
        if (queued) {
          // Its ORIGINAL position, not the head: a waiting item whose own
          // session finished must not overtake the queue.
          next.merge_queue.splice(queued_at, 0, queued);
        }
        next.pr_wait.push(makeQueueEntry(bead_id, now()));
        return true;
      });
      consumeTerminalReceipts(result, prepared.files);
      return result;
    },

    /**
     * Move a bead into the Done lane (removing it from every other lane).
     * Scheduler-owned (no CAS). Wired by Phase 5's post-merge cleanup as its
     * LAST step: a bead reaches `done` only after the whole pr-finish order ran
     * through (worker-phase2 §6).
     *
     * Any `cleanup_failed` record is dropped in the SAME mutation — a bead that
     * completed cleanup cannot simultaneously be one awaiting a human fix, and
     * splitting that into a second write would leave the banner up after a
     * successful retry.
     *
     * `attempt_id` + `patch` are OPTIONAL, and carrying them makes this the
     * `moveToPrWait` twin for the already-finished verdict (UI-b8n8 §접근 B): a
     * verify that observed a MERGED PR on a bead bd already holds as `closed`
     * terminates its attempt and lands the bead in `done` in ONE persist, so a
     * crash between the two cannot leave a done attempt on a queued bead.
     * Omitted, the mutation is exactly the lane move the cleanup path performs.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id?: string, patch?: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    moveToDone(workspace, input) {
      const { bead_id, attempt_id, patch } = input;
      const prepared =
        typeof attempt_id === 'string' && attempt_id.length > 0
          ? terminalReceiptPatch(workspace, attempt_id, patch || {})
          : { patch: patch || {}, files: [] };
      const result = applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        if (typeof attempt_id === 'string' && attempt_id.length > 0) {
          const cur = next.attempts[attempt_id];
          // An unknown attempt refuses the WHOLE mutation, exactly as
          // `moveToPrWait` does: the caller asked for one transition, and a lane
          // move without its attempt record is not that transition.
          if (!cur) {
            return false;
          }
          next.attempts[attempt_id] = makeAttempt(
            /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
              ...cur,
              ...prepared.patch,
              attempt_id,
              bead_id: cur.bead_id
            })
          );
        }
        removeFromLanes(next, bead_id);
        delete next.cleanup_failed[bead_id];
        next.done.push(makeQueueEntry(bead_id, now()));
        completeIntentForDone(next, bead_id);
        return true;
      });
      consumeTerminalReceipts(result, prepared.files);
      return result;
    },

    /**
     * Prune bounded Done history and its completed saga membership together.
     * A contradictory active/paused/terminal intent keeps its row and record;
     * age alone may never erase evidence or reopen a repair budget.
     *
     * @param {string} workspace
     * @param {{ before: number }} input
     * @returns {QueueOpResult}
     */
    pruneDoneBefore(workspace, input) {
      const { before } = input;
      return applyUnconditional(workspace, (next) => {
        if (typeof before !== 'number' || !Number.isFinite(before)) {
          return false;
        }
        const removed = next.done.filter((entry) => {
          const intent = next.completion_intents[entry.bead_id];
          return (
            entry.added_at < before && (!intent || intent.phase === 'completed')
          );
        });
        if (removed.length === 0) {
          return false;
        }
        const removed_ids = new Set(removed.map((entry) => entry.bead_id));
        next.done = next.done.filter(
          (entry) => !removed_ids.has(entry.bead_id)
        );
        for (const bead_id of removed_ids) {
          if (next.completion_intents[bead_id]?.phase === 'completed') {
            delete next.completion_intents[bead_id];
          }
        }
        return true;
      });
    },

    /**
     * Record the workspace's most recent post-merge deployment, overwriting the
     * previous one (worker-deploy-hook §3). Scheduler-owned (no CAS). An
     * outcome outside {@link DEPLOY_OUTCOMES} is refused WITHOUT a write, so a
     * caller bug cannot replace a real record with an unrenderable one.
     *
     * @param {string} workspace
     * @param {{ outcome: 'deployed'|'launched'|'failed', reason: string|null, bead_id: string, base_sha: string, detail?: string, log_path?: string }} input
     * @returns {QueueOpResult}
     */
    recordLastDeploy(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const record = buildLastDeploy(input, now());
        if (!record) {
          return false;
        }
        next.last_deploy = record;
        return true;
      });
    },

    /**
     * Persist the one current external deployment observation for a repository.
     * Row-level merge coverage is stored on QueueEntry and remains independent.
     *
     * @param {string} workspace
     * @param {DeploymentObservation} input
     * @returns {QueueOpResult}
     */
    recordDeploymentObservation(workspace, input) {
      /** @type {'stale'|'binding_mismatch'|'regression'|null} */
      let rejected = null;
      const result = applyUnconditional(workspace, (next) => {
        const observation = normalizeDeploymentObservation(input);
        if (!observation) {
          return false;
        }
        const current = next.deployment;
        if (current?.generation !== null && current?.generation !== undefined) {
          if (
            observation.generation === null ||
            observation.generation < current.generation
          ) {
            rejected = 'stale';
            return false;
          }
          if (
            observation.generation === current.generation &&
            (observation.target_base !== current.target_base ||
              observation.target_sha !== current.target_sha)
          ) {
            rejected = 'binding_mismatch';
            return false;
          }
          if (deploymentStateRegresses(current, observation)) {
            rejected = 'regression';
            return false;
          }
        }
        next.deployment = observation;
        return true;
      });
      return rejected === null ? result : { ...result, [rejected]: true };
    },

    /**
     * Atomically replace the current failed desired binding with the next
     * provider-validated retry generation. PR rows deliberately stay untouched:
     * they remain bound to the generation that accepted their merge floor.
     *
     * @param {string} workspace
     * @param {{ target_base: string, target_sha: string, generation: number }} current_binding
     * @param {{ target_base: string, target_sha: string, generation: number }} retry_binding
     * @returns {QueueOpResult & { stale?: boolean }}
     */
    recordDeploymentRetry(workspace, current_binding, retry_binding) {
      /** @type {boolean} */
      let stale = false;
      const result = applyUnconditional(workspace, (next) => {
        const current = next.deployment;
        if (
          !current ||
          current.state !== 'failed' ||
          current.target_base !== current_binding?.target_base ||
          current.target_sha !== current_binding?.target_sha ||
          current.generation !== current_binding?.generation ||
          retry_binding?.target_base !== current_binding?.target_base ||
          retry_binding?.target_sha !== current_binding?.target_sha ||
          retry_binding?.generation !== current_binding?.generation + 1
        ) {
          stale = true;
          return false;
        }
        next.deployment = {
          state: 'pending',
          target_base: current_binding.target_base,
          target_sha: current_binding.target_sha,
          deployed_sha: null,
          generation: retry_binding.generation,
          error_code: null,
          log_path: null
        };
        return true;
      });
      return stale ? { ...result, stale: true } : result;
    },

    /**
     * Bind one merged PR row to the accepted external desired generation.  The
     * binding is the merge driver's completion receipt: execution status is
     * observed later and never occupies the merge slot.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, merge_sha: string, verified_target_sha: string, deployment_generation: number, head_ref?: string|null, pr_url?: string|null }} input
     * @returns {QueueOpResult}
     */
    bindDeploymentRequest(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        if (
          typeof input?.bead_id !== 'string' ||
          !isSha(input.merge_sha) ||
          !isSha(input.verified_target_sha) ||
          !Number.isInteger(input.deployment_generation) ||
          input.deployment_generation <= 0
        ) {
          return false;
        }
        const entry = next.pr_wait.find((row) => row.bead_id === input.bead_id);
        if (!entry) {
          return false;
        }
        entry.merge_sha = input.merge_sha.toLowerCase();
        entry.verified_target_sha = input.verified_target_sha.toLowerCase();
        entry.deployment_generation = input.deployment_generation;
        entry.cleanup_cursor = 'deployment_observe';
        if (typeof input.head_ref === 'string' && input.head_ref.length > 0) {
          entry.head_ref = input.head_ref;
        }
        if (typeof input.pr_url === 'string' && input.pr_url.length > 0) {
          entry.pr_url = input.pr_url;
        }
        return true;
      });
    },

    /**
     * Atomically record the accepted desired binding and its repo observation.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, merge_sha: string, verified_target_sha: string, deployment_generation: number, target_base: string, head_ref?: string|null, pr_url?: string|null }} input
     * @returns {QueueOpResult}
     */
    recordDeploymentRequest(workspace, input) {
      /** @type {boolean} */
      let binding_mismatch = false;
      const result = applyUnconditional(workspace, (next) => {
        if (
          typeof input?.bead_id !== 'string' ||
          typeof input.target_base !== 'string' ||
          input.target_base.length === 0 ||
          !isSha(input.merge_sha) ||
          !isSha(input.verified_target_sha) ||
          !Number.isInteger(input.deployment_generation) ||
          input.deployment_generation <= 0
        ) {
          return false;
        }
        const entry = next.pr_wait.find((row) => row.bead_id === input.bead_id);
        if (!entry) {
          return false;
        }
        const current = next.deployment;
        if (
          current?.generation !== null &&
          current?.generation !== undefined &&
          input.deployment_generation === current.generation &&
          (input.target_base !== current.target_base ||
            input.verified_target_sha.toLowerCase() !== current.target_sha)
        ) {
          binding_mismatch = true;
          return false;
        }
        entry.merge_sha = input.merge_sha.toLowerCase();
        entry.verified_target_sha = input.verified_target_sha.toLowerCase();
        entry.deployment_generation = input.deployment_generation;
        entry.cleanup_cursor = 'deployment_observe';
        entry.head_ref = input.head_ref || null;
        entry.pr_url = input.pr_url || null;
        if (
          current?.generation === null ||
          current?.generation === undefined ||
          input.deployment_generation > current.generation
        ) {
          next.deployment = {
            state: 'pending',
            target_base: input.target_base,
            target_sha: input.verified_target_sha.toLowerCase(),
            deployed_sha: null,
            generation: input.deployment_generation,
            error_code: null,
            log_path: null
          };
        }
        return true;
      });
      return binding_mismatch ? { ...result, binding_mismatch: true } : result;
    },

    /**
     * Promote a directly merged external PR into the durable observation lane.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, merge_sha: string, head_ref?: string|null, pr_url?: string|null }} input
     * @returns {QueueOpResult}
     */
    promoteMergedExternal(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        if (
          typeof input?.bead_id !== 'string' ||
          !isSha(input.merge_sha) ||
          next.pr_wait.some((row) => row.bead_id === input.bead_id)
        ) {
          return false;
        }
        const entry = makeQueueEntry(input.bead_id, now());
        entry.merge_sha = input.merge_sha.toLowerCase();
        entry.head_ref = input.head_ref || null;
        entry.pr_url = input.pr_url || null;
        next.pr_wait.push(entry);
        return true;
      });
    },

    /**
     * The DETACHED deploy's atomic hand-off: finish the cleanup (`moveToDone`)
     * and record the launch intent in ONE persist (worker-deploy-hook §2).
     *
     * Splitting these would be the whole failure mode the terminal-launch
     * exception exists to avoid: a self-restarting deploy kills this server, so
     * anything not durable BEFORE the spawn may never be written at all. One
     * mutation means a restart either sees "cleanup done + deploy launched" or
     * neither — never a bead in `done` whose deploy left no trace.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, deploy: { outcome: 'deployed'|'launched'|'failed', reason: string|null, bead_id: string, base_sha: string, detail?: string, log_path?: string } }} input
     * @returns {QueueOpResult}
     */
    moveToDoneWithDeploy(workspace, input) {
      const { bead_id, deploy } = input;
      return applyUnconditional(workspace, (next) => {
        const record = buildLastDeploy(deploy, now());
        if (typeof bead_id !== 'string' || bead_id.length === 0 || !record) {
          return false;
        }
        removeFromLanes(next, bead_id);
        delete next.cleanup_failed[bead_id];
        next.done.push(makeQueueEntry(bead_id, now()));
        next.last_deploy = record;
        completeIntentForDone(next, bead_id);
        return true;
      });
    },

    /**
     * REMOVE a bead from `pr_wait` in ONE persist — the lane half of [폐기]
     * (`2026-07-27-worker-discard-button.md` §1). It lands in no lane at all:
     * the bead is `open` again and the candidate lane is synthesized as
     * ready − queue∪pr_wait∪done, so it reappears there on its own. Re-running
     * it is a deliberate drag back into `queue`, which re-passes admission.
     *
     * The single mutation is the reason the spec calls the transition
     * order-sensitive: the poller classifies PR state only for beads that are IN
     * `pr_wait`, so the discard's own `gh pr close` must stop being visible to it
     * in one step rather than across a window where the bead is half-moved.
     *
     * Any stale admission / cleanup_failed record for the bead is dropped:
     * nothing recorded about the discarded attempt still applies. Scheduler-owned
     * (no CAS).
     *
     * @param {string} workspace
     * @param {{ bead_id: string }} input
     * @returns {QueueOpResult}
     */
    removeFromPrWait(workspace, input) {
      const { bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        if (!next.pr_wait.some((e) => e.bead_id === bead_id)) {
          return false;
        }
        removeFromLanes(next, bead_id);
        delete next.admission[bead_id];
        delete next.cleanup_failed[bead_id];
        return true;
      });
    },

    /**
     * Record that a post-merge cleanup stopped at `step` (worker-phase2 §6).
     * DURABLE + terminal: nothing clears this on a timer and nothing retries —
     * the bead stays where it is, bd stays `resolved`, and the banner returns
     * the situation to a human. Scheduler-owned (no CAS).
     *
     * `bd_restore` carries what happened to the bead's status when the stop came
     * at or after the parent close; omit it for the earlier steps, which never
     * touched bd.
     *
     * `detail` carries the step's own diagnostic text when it has one (git
     * stderr, a command's message); omit it otherwise.
     *
     * `output_tail` carries the failing command's own trailing output when the
     * step ran one (UI-qult §1); omit it otherwise.
     *
     * `log_path` carries the absolute path to that command's full preserved
     * output (UI-0x54); omit it when the run left no complete log file.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, step: string, reason: string, bd_restore?: string|null, detail?: string|null, output_tail?: string|null, log_path?: string|null, failure_code?: string, retryable?: boolean, retry_count?: number }} input
     * @returns {QueueOpResult}
     */
    recordCleanupFailure(workspace, input) {
      const {
        bead_id,
        step,
        reason,
        bd_restore,
        detail,
        output_tail,
        log_path,
        failure_code,
        retryable,
        retry_count
      } = input;
      return applyUnconditional(workspace, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof reason !== 'string' ||
          reason.length === 0 ||
          (failure_code !== undefined && !validateManagedFailure(input).ok) ||
          (retry_count !== undefined &&
            (!Number.isInteger(retry_count) || Number(retry_count) < 0))
        ) {
          return false;
        }
        const diagnosis = next.cleanup_failed[bead_id]?.diagnosis;
        next.cleanup_failed[bead_id] = {
          step: typeof step === 'string' ? step : '',
          reason,
          bd_restore: typeof bd_restore === 'string' ? bd_restore : null,
          at: now(),
          detail:
            typeof detail === 'string' && detail.length > 0 ? detail : null
        };
        if (typeof output_tail === 'string' && output_tail.length > 0) {
          next.cleanup_failed[bead_id].output_tail = output_tail;
        }
        if (typeof log_path === 'string' && log_path.length > 0) {
          next.cleanup_failed[bead_id].log_path = log_path;
        }
        if (typeof failure_code === 'string') {
          next.cleanup_failed[bead_id].failure_code = failure_code;
        }
        if (typeof retryable === 'boolean') {
          next.cleanup_failed[bead_id].retryable = retryable;
        }
        if (Number.isInteger(retry_count) && Number(retry_count) >= 0) {
          next.cleanup_failed[bead_id].retry_count = Number(retry_count);
        }
        if (diagnosis) {
          next.cleanup_failed[bead_id].diagnosis = diagnosis;
        }
        return true;
      });
    },

    /**
     * Clear a bead's cleanup-failure record (scheduler-owned, no CAS). No-op
     * (no revision bump) when absent.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    clearCleanupFailure(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        if (!Object.hasOwn(next.cleanup_failed, bead_id)) {
          return false;
        }
        delete next.cleanup_failed[bead_id];
        return true;
      });
    },

    /**
     * Set the workspace's only durable preset authority under its queue CAS.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, preset_id: string|null }} input
     * @returns {QueueOpResult}
     */
    setDefaultExecPresetId(workspace, input) {
      const { expected_revision, preset_id } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (preset_id !== null && typeof preset_id !== 'string') {
          return false;
        }
        if (typeof preset_id === 'string') {
          const normalized_id = preset_id.trim();
          if (normalized_id.length === 0) {
            return false;
          }
          next.default_exec_preset_id = normalized_id;
          return true;
        }
        next.default_exec_preset_id = null;
        return true;
      });
    },

    /**
     * Retained only for in-process legacy callers while the wire protocol is
     * removed. New authority is `setDefaultExecPresetId` through the
     * coordinator; no new handler exposes this method.
     *
     * @deprecated
     * @param {string} workspace
     * @param {{ expected_revision: number, key: string, value: unknown }} input
     * @returns {QueueOpResult}
     */
    setExecDefault(workspace, input) {
      const { expected_revision, key, value } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const allowed = execSettingEnums()[key];
        if (!allowed) {
          return false;
        }
        if (value === null || value === '') {
          delete next.exec_defaults[key];
          return true;
        }
        if (typeof value !== 'string' || !allowed.includes(value)) {
          return false;
        }
        next.exec_defaults[key] = value;
        return true;
      });
    },

    /**
     * Clear raw legacy defaults after a preset-reference readback. This is a
     * migration-only operation, not an active per-key editor.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number }} input
     * @returns {QueueOpResult}
     */
    clearLegacyExecDefaults(workspace, input) {
      return applyMutation(workspace, input.expected_revision, (next) => {
        if (Object.keys(next.exec_defaults).length === 0) {
          return false;
        }
        const legacy_queue = /** @type {Partial<Queue>} */ (next);
        delete legacy_queue.exec_defaults;
        return true;
      });
    },

    /**
     * Record why a bead was refused or skipped (scheduler-owned, no CAS). A
     * DIFFERENT reason overwrites the prior record; the SAME reason is an
     * atomic no-op (`ok:false`, no revision bump). The guard lives here rather
     * than in the caller because `tick()` is not serialized — concurrent passes
     * reading the same stale "nothing recorded" snapshot would each write and
     * fan out, and a permanently not-ready bead would bump the revision on
     * every tick. `ok` therefore reports whether the record was APPLIED, which
     * is what the scheduler gates its fanout on.
     *
     * `stale:true` records the non-blocking admitted-with-a-stale-receipt
     * observation instead of a refusal (UI-dlim §3.4); it participates in the
     * same-record no-op guard, so a stale flag flipping is a real change.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, reason: string, stale?: boolean }} input
     * @returns {QueueOpResult}
     */
    recordAdmission(workspace, input) {
      const { bead_id, reason } = input;
      const stale = input.stale === true;
      return applyUnconditional(workspace, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof reason !== 'string' ||
          reason.length === 0
        ) {
          return false;
        }
        const prior = next.admission[bead_id];
        if (
          prior &&
          prior.reason === reason &&
          (prior.stale === true) === stale
        ) {
          return false;
        }
        next.admission[bead_id] = stale
          ? { reason, at: now(), stale: true }
          : { reason, at: now() };
        return true;
      });
    },

    /**
     * Drop a bead from the lanes AND its skip badge in ONE persist
     * (scheduler-owned, no CAS) — the terminal-status dequeue: a bead closed
     * outside the worker can never dispatch, so re-badging it every tick is the
     * only thing repeating it would achieve.
     *
     * Reports `ok:false` WITHOUT a revision bump when there was nothing to drop,
     * for the same reason {@link recordAdmission} no-ops an unchanged reason: a
     * repeating tick must not bump the revision forever.
     *
     * @param {string} workspace
     * @param {{ bead_id: string }} input
     * @returns {QueueOpResult}
     */
    dropFromQueue(workspace, input) {
      const { bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        const in_lane =
          next.queue.some((e) => e.bead_id === bead_id) ||
          next.pr_wait.some((e) => e.bead_id === bead_id) ||
          next.done.some((e) => e.bead_id === bead_id);
        if (!in_lane && !Object.hasOwn(next.admission, bead_id)) {
          return false;
        }
        removeFromLanes(next, bead_id);
        delete next.admission[bead_id];
        return true;
      });
    },

    /**
     * Clear a bead's admission record (scheduler-owned, no CAS). No-op (no
     * revision bump) when absent.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    clearAdmission(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        if (!Object.hasOwn(next.admission, bead_id)) {
          return false;
        }
        delete next.admission[bead_id];
        return true;
      });
    },

    /**
     * Force the auto_advance flag (scheduler-owned, no CAS) — used to turn
     * execution OFF on a session failure or a reconcile failure, which together with
     * the failure banner IS the halt behaviour (worker-phase2 §2).
     *
     * @param {string} workspace
     * @param {boolean} on
     * @returns {QueueOpResult}
     */
    setAutoAdvance(workspace, on) {
      return applyUnconditional(workspace, (next) => {
        next.auto_advance = !!on;
        return true;
      });
    },

    /**
     * Queue one or more `pr_wait` beads for the sequential merge driver
     * (UI-5v7d §1). CAS-guarded: both the single [머지] click and the lane's
     * [일괄 머지] land here, and both start from a snapshot the user saw.
     *
     * Add-all is ONE call with many entries rather than a call per bead,
     * because each write bumps the revision — a per-bead loop would make every
     * bead after the first fail its own CAS.
     *
     * Membership: a bead must be in the durable `pr_wait` lane, OR the caller
     * must declare it an EXTERNAL pr_wait row (`external: true`). External rows
     * are synthesized on the wire from bd (UI-7agi §2) and never live in
     * `queue.json`, so the store cannot see them; the ws layer that owns that
     * overlay is what vouches for them here.
     *
     * Duplicate queuing is a NO-OP for that bead, not a rejection: a whole
     * add-all whose rows are already queued still reports `ok` when it queued
     * at least one, and rejects only when it queued nothing at all.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, entries: Array<{ bead_id: string, external?: boolean }> }} input
     * @returns {QueueOpResult}
     */
    enqueueMerge(workspace, input) {
      const { expected_revision, entries } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (!Array.isArray(entries) || entries.length === 0) {
          return false;
        }
        let added = 0;
        let cleared = 0;
        for (const entry of entries) {
          const bead_id = entry && entry.bead_id;
          if (typeof bead_id !== 'string' || bead_id.length === 0) {
            continue;
          }
          if (!enqueueMember(next, bead_id, entry.external === true)) {
            continue;
          }
          // A human clicking [머지] on an auto-excluded row IS the retry the
          // exclusion must not block (UI-yk55 §3.2): the record is dropped even
          // when the row turns out to be queued already, so the driver's entry
          // filter cannot drop the item the click just asked for.
          if (next.auto_merge_skips[bead_id]) {
            delete next.auto_merge_skips[bead_id];
            cleared += 1;
          }
          if (next.merge_queue.some((e) => e.bead_id === bead_id)) {
            continue;
          }
          insertRunnableMergeEntry(next, {
            bead_id,
            resolution_rounds: 0,
            resolution: null
          });
          added += 1;
        }
        return added > 0 || cleared > 0;
      });
    },

    /**
     * Persist a cross-runner decision before the background driver releases its
     * queue turn. The token is rebound to this write's resulting revision.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, subject_bead_id: string, mismatch: Record<string, unknown> }} input
     * @returns {QueueOpResult}
     */
    requireMergeContinuation(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        if (
          !entry ||
          typeof input.subject_bead_id !== 'string' ||
          input.subject_bead_id.length === 0 ||
          !isRecord(input.mismatch) ||
          input.mismatch.continuation_required !== true ||
          !isRecord(input.mismatch.decision_token)
        ) {
          return false;
        }
        const mismatch = clone(input.mismatch);
        const decision_token = /** @type {Record<string, unknown>} */ (
          mismatch.decision_token
        );
        decision_token.observed_queue_revision = next.revision + 1;
        entry.continuation_action = {
          subject_bead_id: input.subject_bead_id,
          mismatch,
          continuation: null,
          decision_token: null
        };
        return true;
      });
    },

    /**
     * CAS-bind the user's decision to the exact durable mismatch descriptor.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }} input
     * @returns {QueueOpResult}
     */
    decideMergeContinuation(workspace, input) {
      return applyMutation(workspace, input.expected_revision, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        const action = entry?.continuation_action;
        if (
          !entry ||
          !action ||
          (input.continuation !== 'prior_session' &&
            input.continuation !== 'fresh_current') ||
          !sameDecisionToken(
            input.decision_token,
            action.mismatch.decision_token
          )
        ) {
          return false;
        }
        const decision_token = clone(input.decision_token);
        decision_token.observed_queue_revision = next.revision + 1;
        action.continuation = input.continuation;
        action.decision_token = decision_token;
        return true;
      });
    },

    /**
     * Clear only the decision consumed by a successful resolver dispatch.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, subject_bead_id: string }} input
     * @returns {QueueOpResult}
     */
    clearMergeContinuation(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        if (
          !entry?.continuation_action ||
          entry.continuation_action.subject_bead_id !== input.subject_bead_id
        ) {
          return false;
        }
        entry.continuation_action = null;
        return true;
      });
    },

    /**
     * Atomically create one root completion intent and place that public root
     * identity in the sequential merge queue. The current subject starts as
     * the root; later repair children change only the intent subject and never
     * receive an independent queue entry or budget.
     *
     * @param {string} workspace
     * @param {{ expected_revision?: number|null, root_bead_id: string, source_attempt_id: string, target_base: string, subject: CompletionSubject, external?: boolean }} input
     * @returns {QueueOpResult}
     */
    enqueueCompletionIntent(workspace, input) {
      const {
        expected_revision,
        root_bead_id,
        source_attempt_id,
        target_base,
        subject,
        external
      } = input;
      /**
       * @param {Queue} next
       */
      const mutate = (next) => {
        if (
          typeof root_bead_id !== 'string' ||
          root_bead_id.length === 0 ||
          typeof target_base !== 'string' ||
          target_base.length === 0 ||
          Object.hasOwn(next.completion_intents, root_bead_id) ||
          Object.values(next.completion_intents).some((intent) =>
            intent.repair_bead_ids.includes(root_bead_id)
          )
        ) {
          return false;
        }
        const normalized = normalizeCompletionIntent(root_bead_id, {
          target_base,
          phase: 'gating',
          subject,
          repair_sessions_used: 0,
          repair_bead_ids: [],
          subject_stack: [],
          active_op: null,
          terminal_reason: null
        });
        if (normalized.phase === 'needs_human') {
          return false;
        }
        const source = completionSourceForAnchor(
          next,
          root_bead_id,
          source_attempt_id,
          target_base,
          normalized.subject
        );
        if (!source || !enqueueMember(next, root_bead_id, external === true)) {
          return false;
        }
        source.completion_root_id = root_bead_id;
        source.completion_op_id = null;
        next.completion_intents[root_bead_id] = normalized;
        if (!next.merge_queue.some((entry) => entry.bead_id === root_bead_id)) {
          insertRunnableMergeEntry(next, {
            bead_id: root_bead_id,
            resolution_rounds: 0,
            resolution: null
          });
        }
        return true;
      };
      return typeof expected_revision === 'number'
        ? applyMutation(workspace, expected_revision, mutate)
        : applyUnconditional(workspace, mutate);
    },

    /**
     * Prerecord a repair session before spawn: the logical op, its consumed
     * lineage budget, and the scheduler attempt appear in one durable write.
     * A restart therefore adopts this exact attempt instead of granting a new
     * budget slot or spawning a duplicate session.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, op: CompletionOperation, expected_revision?: number, attempt: Partial<Attempt> & { attempt_id: string, bead_id: string } }} input
     * @returns {QueueOpResult}
     */
    beginRepairOp(workspace, input) {
      const { root_bead_id, op, attempt } = input;
      /** @param {Queue} next */
      const mutate = (next) => {
        const intent = next.completion_intents[root_bead_id];
        const normalized_op = normalizeCompletionOperation(op);
        const active_op = intent?.active_op;
        const replaces_create =
          normalized_op?.kind === 'dispatch_repair' &&
          active_op?.kind === 'create_repair' &&
          active_op.repair_bead_id === normalized_op.repair_bead_id &&
          active_op.status === 'observed' &&
          sameCompletionFailureKey(
            active_op.failure_key,
            normalized_op.failure_key
          );
        if (
          !intent ||
          (intent.active_op !== null && !replaces_create) ||
          intent.phase === 'paused' ||
          intent.phase === 'needs_human' ||
          intent.phase === 'completed' ||
          intent.repair_sessions_used >= MAX_REPAIR_SESSIONS ||
          !normalized_op ||
          normalized_op.status !== 'prepared' ||
          (normalized_op.kind !== 'resume_root' &&
            normalized_op.kind !== 'dispatch_repair') ||
          !attempt ||
          attempt.attempt_id !== normalized_op.attempt_id ||
          typeof attempt.bead_id !== 'string' ||
          attempt.bead_id.length === 0 ||
          Object.hasOwn(next.attempts, attempt.attempt_id) ||
          (normalized_op.kind === 'resume_root' &&
            attempt.bead_id !== intent.subject.bead_id) ||
          (normalized_op.kind === 'dispatch_repair' &&
            (normalized_op.repair_bead_id === null ||
              attempt.bead_id !== normalized_op.repair_bead_id ||
              !intent.repair_bead_ids.includes(attempt.bead_id)))
        ) {
          return false;
        }
        const source = originalCompletionAnchor(next, root_bead_id);
        if (!source) {
          return false;
        }
        intent.active_op = normalized_op;
        intent.phase = 'repairing';
        intent.repair_sessions_used += 1;
        next.attempts[attempt.attempt_id] = makeAttempt({
          ...attempt,
          worker_serial: source?.worker_serial === true
        });
        return true;
      };
      return typeof input.expected_revision === 'number'
        ? applyMutation(workspace, input.expected_revision, mutate)
        : applyUnconditional(workspace, mutate);
    },

    /**
     * Prerecord an external effect that does not itself consume session budget
     * (linked Bead creation, merge handoff, or cleanup replay).
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, phase: CompletionPhase, op: CompletionOperation }} input
     * @returns {QueueOpResult}
     */
    prepareCompletionOp(workspace, input) {
      const { root_bead_id, phase, op } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const normalized_op = normalizeCompletionOperation(op);
        if (
          !intent ||
          intent.active_op !== null ||
          intent.phase === 'paused' ||
          intent.phase === 'needs_human' ||
          intent.phase === 'completed' ||
          !COMPLETION_PHASES.includes(phase) ||
          phase === 'paused' ||
          phase === 'needs_human' ||
          phase === 'completed' ||
          !normalized_op ||
          normalized_op.status !== 'prepared' ||
          normalized_op.attempt_id !== null ||
          normalized_op.kind === 'resume_root' ||
          normalized_op.kind === 'dispatch_repair'
        ) {
          return false;
        }
        intent.phase = phase;
        intent.active_op = normalized_op;
        return true;
      });
    },

    /**
     * Adopt the deterministic linked repair Bead created by an active
     * `create_repair` operation. Membership is root-global, so the child can
     * never enter later as a fresh completion root with a new budget.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, op_id: string, repair_bead_id: string }} input
     * @returns {QueueOpResult}
     */
    recordCompletionRepairBead(workspace, input) {
      const { root_bead_id, op_id, repair_bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const active_op = intent?.active_op;
        if (
          !intent ||
          !active_op ||
          active_op.op_id !== op_id ||
          active_op.kind !== 'create_repair' ||
          typeof repair_bead_id !== 'string' ||
          repair_bead_id.length === 0 ||
          repair_bead_id === root_bead_id ||
          Object.hasOwn(next.completion_intents, repair_bead_id) ||
          Object.entries(next.completion_intents).some(
            ([other_root, other_intent]) =>
              other_root !== root_bead_id &&
              other_intent.repair_bead_ids.includes(repair_bead_id)
          )
        ) {
          return false;
        }
        if (!intent.repair_bead_ids.includes(repair_bead_id)) {
          if (intent.subject_stack.length >= MAX_REPAIR_SESSIONS) {
            return false;
          }
          intent.repair_bead_ids.push(repair_bead_id);
          intent.subject_stack.push({ ...intent.subject });
        }
        active_op.repair_bead_id = repair_bead_id;
        active_op.status = 'observed';
        return true;
      });
    },

    /**
     * Advance the currently journaled operation without replacing its identity.
     * Status is monotonic; clearing is legal only after logical consumption.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, op_id: string, status: CompletionOperation['status'], next_phase?: CompletionPhase, subject?: CompletionSubject, clear?: boolean }} input
     * @returns {QueueOpResult}
     */
    advanceCompletionOp(workspace, input) {
      const { root_bead_id, op_id, status, next_phase, subject, clear } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const active_op = intent?.active_op;
        const normalized_subject =
          subject === undefined
            ? null
            : normalizeCompletionSubject(subject, root_bead_id);
        const current_index = active_op
          ? COMPLETION_OP_STATUSES.indexOf(active_op.status)
          : -1;
        const next_index = COMPLETION_OP_STATUSES.indexOf(status);
        if (
          !intent ||
          !active_op ||
          active_op.op_id !== op_id ||
          next_index < current_index ||
          next_index < 0 ||
          (clear === true && status !== 'consumed') ||
          (next_phase !== undefined &&
            (!COMPLETION_PHASES.includes(next_phase) ||
              next_phase === 'needs_human' ||
              next_phase === 'completed')) ||
          (subject !== undefined && !normalized_subject) ||
          (normalized_subject?.role === 'repair' &&
            !intent.repair_bead_ids.includes(normalized_subject.bead_id))
        ) {
          return false;
        }
        active_op.status = status;
        if (next_phase !== undefined) {
          intent.phase = next_phase;
        }
        if (normalized_subject) {
          intent.subject = normalized_subject;
        }
        if (clear === true) {
          intent.active_op = null;
        }
        if (next_phase === 'paused') {
          next.merge_queue = next.merge_queue.filter(
            (entry) => entry.bead_id !== root_bead_id
          );
        }
        return true;
      });
    },

    /**
     * Replace the current merge subject after an operation has settled. A
     * repair subject must already belong to this root lineage; switching the
     * subject can therefore never smuggle an unrelated Bead under the root's
     * queue position or budget.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, phase: CompletionPhase, subject: CompletionSubject }} input
     * @returns {QueueOpResult}
     */
    setCompletionSubject(workspace, input) {
      const { root_bead_id, phase, subject } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const normalized_subject = normalizeCompletionSubject(
          subject,
          root_bead_id
        );
        if (
          !intent ||
          intent.active_op !== null ||
          intent.phase === 'paused' ||
          intent.phase === 'needs_human' ||
          intent.phase === 'completed' ||
          !normalized_subject ||
          !COMPLETION_PHASES.includes(phase) ||
          phase === 'paused' ||
          phase === 'needs_human' ||
          phase === 'completed' ||
          (normalized_subject.role === 'repair' &&
            !intent.repair_bead_ids.includes(normalized_subject.bead_id))
        ) {
          return false;
        }
        intent.subject = normalized_subject;
        intent.phase = phase;
        return true;
      });
    },

    /**
     * Restore the subject that was active before the current linked repair.
     * The identity check and stack pop share one durable mutation.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, phase: CompletionPhase, subject: CompletionSubject }} input
     * @returns {QueueOpResult}
     */
    restoreCompletionSubject(workspace, input) {
      const { root_bead_id, phase, subject } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const normalized_subject = normalizeCompletionSubject(
          subject,
          root_bead_id
        );
        const prior = intent?.subject_stack[intent.subject_stack.length - 1];
        if (
          !intent ||
          intent.active_op !== null ||
          intent.phase === 'paused' ||
          intent.phase === 'needs_human' ||
          intent.phase === 'completed' ||
          intent.subject.role !== 'repair' ||
          !prior ||
          !normalized_subject ||
          normalized_subject.role !== prior.role ||
          normalized_subject.bead_id !== prior.bead_id ||
          !COMPLETION_PHASES.includes(phase) ||
          phase === 'paused' ||
          phase === 'needs_human' ||
          phase === 'completed'
        ) {
          return false;
        }
        intent.subject_stack.pop();
        intent.subject = normalized_subject;
        intent.phase = phase;
        return true;
      });
    },

    /**
     * Stop new completion work after auto-merge is disabled. An in-flight op
     * must settle first; the paused intent remains durable while its pending
     * queue position is released, matching the explicit OFF boundary.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string }} input
     * @returns {QueueOpResult}
     */
    pauseCompletionIntent(workspace, input) {
      const { root_bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        if (
          !intent ||
          intent.active_op !== null ||
          intent.phase === 'paused' ||
          intent.phase === 'needs_human' ||
          intent.phase === 'completed'
        ) {
          return false;
        }
        intent.phase = 'paused';
        next.merge_queue = next.merge_queue.filter(
          (entry) => entry.bead_id !== root_bead_id
        );
        return true;
      });
    },

    /**
     * Re-enable an idle paused saga at the tail of the root merge queue.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string }} input
     * @returns {QueueOpResult}
     */
    resumeCompletionIntent(workspace, input) {
      return applyUnconditional(workspace, (next) =>
        resumeCompletionIntentRecord(next, input.root_bead_id)
      );
    },

    /**
     * Stop automatic progress with durable bounded evidence. The active-op
     * journal is deliberately preserved: ambiguity at an external effect is
     * evidence a restart or human diagnosis still needs.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, terminal: CompletionTerminal }} input
     * @returns {QueueOpResult}
     */
    terminalizeCompletionIntent(workspace, input) {
      const { root_bead_id, terminal } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const normalized_terminal = normalizeCompletionTerminal(terminal);
        if (!intent || intent.phase === 'completed' || !normalized_terminal) {
          return false;
        }
        intent.phase = 'needs_human';
        intent.terminal_reason = normalized_terminal;
        next.merge_queue = next.merge_queue.filter(
          (entry) => entry.bead_id !== root_bead_id
        );
        return true;
      });
    },

    /**
     * Re-adopt one historical time-only conflict terminal as the same root
     * merge saga. The terminal evidence, merge operation, queue position, and
     * optional live resolver wait change in one persist, so startup cannot
     * clear the terminal and crash before restoring its owner.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, subject: CompletionSubject, op: CompletionOperation, resolution_attempt_id?: string|null, resolution_rounds: number, wait_ms: number }} input
     * @returns {QueueOpResult}
     */
    adoptLegacyResolutionTimeout(workspace, input) {
      const {
        root_bead_id,
        subject,
        op,
        resolution_attempt_id,
        resolution_rounds,
        wait_ms
      } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const terminal = intent?.terminal_reason;
        const normalized_subject = normalizeCompletionSubject(
          subject,
          root_bead_id
        );
        const normalized_op = normalizeCompletionOperation(op);
        const expected_repair =
          intent?.subject.role === 'repair' ? intent.subject.bead_id : null;
        const active_op = intent?.active_op;
        const active_failure = active_op?.failure_key;
        const active_op_consistent =
          active_op === null ||
          (active_op?.kind === 'merge_subject' &&
            active_op.attempt_id === null &&
            active_op.repair_bead_id === expected_repair &&
            active_op.status !== 'consumed' &&
            active_failure?.stage === 'merge_subject' &&
            active_failure.subject_sha === intent?.subject.head_sha &&
            active_failure.base_sha === intent.subject.base_sha);
        const attempt =
          typeof resolution_attempt_id === 'string'
            ? next.attempts[resolution_attempt_id]
            : null;
        const attempt_started_at =
          typeof attempt?.started_at === 'number' &&
          Number.isFinite(attempt.started_at)
            ? attempt.started_at
            : null;
        if (
          !intent ||
          intent.phase !== 'needs_human' ||
          terminal?.reason !== 'resolution_timeout' ||
          terminal.stage !== 'conflict_resolution' ||
          !normalized_subject ||
          normalized_subject.role !== intent.subject.role ||
          normalized_subject.bead_id !== intent.subject.bead_id ||
          !normalized_op ||
          normalized_op.kind !== 'merge_subject' ||
          normalized_op.attempt_id !== null ||
          normalized_op.repair_bead_id !== expected_repair ||
          normalized_op.status !== 'prepared' ||
          normalized_op.failure_key.stage !== 'merge_subject' ||
          normalized_op.failure_key.subject_sha !==
            normalized_subject.head_sha ||
          normalized_op.failure_key.base_sha !== normalized_subject.base_sha ||
          !active_op_consistent ||
          next.merge_queue.some((entry) => entry.bead_id === root_bead_id) ||
          typeof resolution_rounds !== 'number' ||
          !Number.isInteger(resolution_rounds) ||
          resolution_rounds < 0 ||
          typeof wait_ms !== 'number' ||
          !Number.isFinite(wait_ms) ||
          wait_ms < 0 ||
          (resolution_attempt_id != null &&
            (typeof resolution_attempt_id !== 'string' ||
              resolution_attempt_id.length === 0 ||
              !attempt ||
              attempt.bead_id !== intent.subject.bead_id ||
              attempt.conflict_resolution !== true ||
              (attempt.status !== 'running' && attempt.status !== 'paused') ||
              attempt_started_at === null))
        ) {
          return false;
        }
        intent.phase = 'merging';
        intent.subject = normalized_subject;
        intent.active_op = active_op || normalized_op;
        intent.terminal_reason = null;
        insertRunnableMergeEntry(next, {
          bead_id: root_bead_id,
          resolution_rounds,
          resolution: attempt
            ? {
                attempt_id: attempt.attempt_id,
                subject_bead_id: attempt.bead_id,
                deadline_at:
                  /** @type {number} */ (attempt_started_at) + wait_ms,
                state: 'waiting',
                yielded_at: null,
                settled_at: null
              }
            : null
        });
        return true;
      });
    },

    /**
     * Queue every eligible row the AUTO enroller (or the lane's toggle click)
     * judged, applying the exclusion filter and the record prune inside the SAME
     * mutation (UI-yk55 §3.2/§3.2.1).
     *
     * The head comparison lives HERE rather than in the caller because the
     * decision and the write must not straddle a persist: a filter evaluated
     * against a snapshot and applied to a later one is exactly how an excluded
     * item slips back into the queue.
     *
     * `expected_revision` is optional: the ws add-all passes the revision its
     * user saw, the enroller passes none (it is a server-owned mutation, like
     * every other scheduler/driver write).
     *
     * @param {string} workspace
     * @param {{ expected_revision?: number|null, entries: Array<{ bead_id: string, external?: boolean, head_sha: string, completion?: { source_attempt_id: string, target_base: string, subject: CompletionSubject } }>, present_ids?: string[] }} input
     * @returns {QueueOpResult}
     */
    enqueueMergeAuto(workspace, input) {
      const { expected_revision, entries, present_ids } = input;
      /**
       * @param {Queue} next
       * @returns {boolean}
       */
      const mutate = (next) => {
        let changed = 0;
        // Prune first: an external row that vanished leaves NO lane mutation
        // behind (its row is a memory overlay), so this scan is the only place
        // its record can be reclaimed (§3.2.1).
        if (Array.isArray(present_ids)) {
          const present = new Set(present_ids);
          for (const bead_id of Object.keys(next.auto_merge_skips)) {
            if (!present.has(bead_id)) {
              delete next.auto_merge_skips[bead_id];
              changed += 1;
            }
          }
        }
        for (const entry of Array.isArray(entries) ? entries : []) {
          const bead_id = entry && entry.bead_id;
          if (typeof bead_id !== 'string' || bead_id.length === 0) {
            continue;
          }
          if (entry.completion) {
            if (next.auto_merge !== true || entry.external === true) {
              continue;
            }
            if (
              Object.values(next.completion_intents).some((intent) =>
                intent.repair_bead_ids.includes(bead_id)
              )
            ) {
              continue;
            }
            const existing_intent = next.completion_intents[bead_id];
            if (existing_intent) {
              if (!enqueueMember(next, bead_id, false)) {
                continue;
              }
              if (
                existing_intent.phase === 'needs_human' ||
                existing_intent.phase === 'completed'
              ) {
                continue;
              }
              if (next.auto_merge_skips[bead_id]) {
                delete next.auto_merge_skips[bead_id];
                changed += 1;
              }
              if (existing_intent.phase === 'paused') {
                if (!resumeCompletionIntentRecord(next, bead_id)) {
                  continue;
                }
                changed += 1;
              }
              if (!next.merge_queue.some((item) => item.bead_id === bead_id)) {
                insertRunnableMergeEntry(next, {
                  bead_id,
                  resolution_rounds: 0,
                  resolution: null
                });
                changed += 1;
              }
              continue;
            }
            const normalized = normalizeCompletionIntent(bead_id, {
              target_base: entry.completion.target_base,
              phase: 'gating',
              subject: entry.completion.subject,
              repair_sessions_used: 0,
              repair_bead_ids: [],
              subject_stack: [],
              active_op: null,
              terminal_reason: null
            });
            if (normalized.phase === 'needs_human') {
              continue;
            }
            const source = completionSourceForAnchor(
              next,
              bead_id,
              entry.completion.source_attempt_id,
              entry.completion.target_base,
              normalized.subject
            );
            if (!source || !enqueueMember(next, bead_id, false)) {
              continue;
            }
            source.completion_root_id = bead_id;
            source.completion_op_id = null;
            next.completion_intents[bead_id] = normalized;
            if (!next.merge_queue.some((item) => item.bead_id === bead_id)) {
              insertRunnableMergeEntry(next, {
                bead_id,
                resolution_rounds: 0,
                resolution: null
              });
            }
            if (next.auto_merge_skips[bead_id]) {
              delete next.auto_merge_skips[bead_id];
            }
            changed += 1;
            continue;
          }
          if (!enqueueMember(next, bead_id, entry.external === true)) {
            continue;
          }
          const skip = next.auto_merge_skips[bead_id];
          if (skip) {
            if (skip.head_sha === entry.head_sha) {
              // Same head that already failed — the exclusion still holds.
              continue;
            }
            // The branch moved, so whatever failed last time is not what would
            // be merged now.
            delete next.auto_merge_skips[bead_id];
            changed += 1;
          }
          if (next.merge_queue.some((e) => e.bead_id === bead_id)) {
            continue;
          }
          insertRunnableMergeEntry(next, {
            bead_id,
            resolution_rounds: 0,
            resolution: null
          });
          changed += 1;
        }
        return changed > 0;
      };
      return typeof expected_revision === 'number'
        ? applyMutation(workspace, expected_revision, mutate)
        : applyUnconditional(workspace, mutate);
    },

    /**
     * Toggle the durable `auto_merge` flag. CAS-guarded, mirroring
     * {@link toggleAutoAdvance} — the click starts an irreversible chain of
     * merges, so it must not apply against a snapshot the user never saw.
     *
     * `clear_waiting` removes ordinary queued work in the SAME mutation while
     * preserving the active item and every durable resolution journal. Turning
     * automation off pauses new merge/update/resolver effects; it does not
     * cancel a resolver already running or erase its late settlement identity.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean, clear_waiting?: boolean, keep?: string|null }} input
     * @returns {QueueOpResult}
     */
    toggleAutoMerge(workspace, input) {
      const { expected_revision, on, clear_waiting, keep } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        next.auto_merge = !!on;
        if (clear_waiting) {
          next.merge_queue = next.merge_queue.filter(
            (e) => e.bead_id === (keep || null) || e.resolution !== null
          );
        }
        return true;
      });
    },

    /**
     * Record an auto-merge exclusion AND drop the item from the merge queue in
     * ONE mutation (UI-yk55 §3.2). Driver-owned, so no CAS.
     *
     * The atomicity is the whole point. Recording and dequeuing as two writes
     * leaves a crash window in either order: record-then-crash keeps a merged-in
     * head at the queue head for the boot-resume driver to merge again, and
     * dequeue-then-crash leaves the row eligible with no exclusion, which is the
     * §3.1 loop verbatim.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, head_sha: string, reason: string }} input
     * @returns {QueueOpResult}
     */
    recordMergeSkip(workspace, input) {
      const { bead_id, head_sha, reason } = input;
      return applyUnconditional(workspace, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof head_sha !== 'string' ||
          head_sha.length === 0
        ) {
          return false;
        }
        next.auto_merge_skips[bead_id] = {
          head_sha,
          reason: typeof reason === 'string' ? reason : '',
          at: now()
        };
        next.merge_queue = next.merge_queue.filter(
          (e) => e.bead_id !== bead_id
        );
        return true;
      });
    },

    /**
     * Bind one queue item to the exact conflict-resolution attempt that is
     * already durable in the scheduler journal.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, subject_bead_id: string, attempt_id: string, wait_ms: number }} input
     * @returns {QueueOpResult}
     */
    bindResolutionWait(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        const attempt = next.attempts[input.attempt_id];
        if (
          !entry ||
          entry.resolution != null ||
          typeof input.subject_bead_id !== 'string' ||
          input.subject_bead_id.length === 0 ||
          typeof input.attempt_id !== 'string' ||
          input.attempt_id.length === 0 ||
          typeof input.wait_ms !== 'number' ||
          !Number.isFinite(input.wait_ms) ||
          input.wait_ms < 0 ||
          !attempt ||
          attempt.attempt_id !== input.attempt_id ||
          attempt.bead_id !== input.subject_bead_id ||
          attempt.conflict_resolution !== true ||
          typeof attempt.started_at !== 'number' ||
          !Number.isFinite(attempt.started_at)
        ) {
          return false;
        }
        entry.resolution = {
          attempt_id: input.attempt_id,
          subject_bead_id: input.subject_bead_id,
          deadline_at: attempt.started_at + input.wait_ms,
          state: 'waiting',
          yielded_at: null,
          settled_at: null
        };
        return true;
      });
    },

    /**
     * Relinquish only this item's queue turn while its resolver keeps running.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, subject_bead_id: string, attempt_id: string, yielded_at: number }} input
     * @returns {QueueOpResult}
     */
    yieldResolutionWait(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const index = next.merge_queue.findIndex(
          (item) => item.bead_id === input.bead_id
        );
        const entry = index < 0 ? null : next.merge_queue[index];
        const resolution = entry?.resolution;
        if (
          !entry ||
          !resolution ||
          resolution.state !== 'waiting' ||
          resolution.attempt_id !== input.attempt_id ||
          resolution.subject_bead_id !== input.subject_bead_id ||
          typeof input.yielded_at !== 'number' ||
          !Number.isFinite(input.yielded_at)
        ) {
          return false;
        }
        resolution.state = 'yielded';
        resolution.yielded_at = input.yielded_at;
        next.merge_queue.splice(index, 1);
        next.merge_queue.push(entry);
        return true;
      });
    },

    /**
     * Promote one exact settled wait ahead of ordinary runnable work while
     * preserving the currently active merge turn.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, subject_bead_id: string, attempt_id: string, settled_at: number, active_bead_id: string|null }} input
     * @returns {QueueOpResult}
     */
    settleResolutionWait(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        const resolution = entry?.resolution;
        if (
          !entry ||
          !resolution ||
          (resolution.state !== 'waiting' && resolution.state !== 'yielded') ||
          resolution.attempt_id !== input.attempt_id ||
          resolution.subject_bead_id !== input.subject_bead_id ||
          typeof input.settled_at !== 'number' ||
          !Number.isFinite(input.settled_at)
        ) {
          return false;
        }
        resolution.state = 'ready';
        resolution.settled_at = input.settled_at;

        const indexed = next.merge_queue.map((item, index) => ({
          item,
          index
        }));
        const active = indexed.find(
          ({ item }) =>
            item.bead_id === input.active_bead_id &&
            item.resolution?.state !== 'ready'
        );
        const ready = indexed
          .filter(({ item }) => item.resolution?.state === 'ready')
          .sort((left, right) => {
            const left_resolution = left.item.resolution;
            const right_resolution = right.item.resolution;
            const left_at =
              left_resolution?.state === 'ready'
                ? (left_resolution.settled_at ?? 0)
                : 0;
            const right_at =
              right_resolution?.state === 'ready'
                ? (right_resolution.settled_at ?? 0)
                : 0;
            return left_at - right_at || left.index - right.index;
          })
          .map(({ item }) => item);
        const runnable = indexed
          .filter(
            ({ item }) =>
              item !== active?.item &&
              item.resolution?.state !== 'ready' &&
              item.resolution?.state !== 'yielded'
          )
          .map(({ item }) => item);
        const yielded = indexed
          .filter(({ item }) => item.resolution?.state === 'yielded')
          .map(({ item }) => item);
        next.merge_queue = [
          ...(active ? [active.item] : []),
          ...ready,
          ...runnable,
          ...yielded
        ];
        return true;
      });
    },

    /**
     * Consume one ready attempt identity, optionally charging its completed
     * conflict round. A duplicate event finds no ready identity and is a no-op.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, consume_round: boolean }} input
     * @returns {QueueOpResult}
     */
    consumeResolutionWait(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        const resolution = entry?.resolution;
        if (
          !entry ||
          !resolution ||
          resolution.state !== 'ready' ||
          resolution.attempt_id !== input.attempt_id
        ) {
          return false;
        }
        if (input.consume_round === true) {
          entry.resolution_rounds += 1;
        }
        entry.resolution = null;
        return true;
      });
    },

    /**
     * Drop a bead from the merge queue — the DRIVER's own dequeue after it
     * finished (or gave up on) an item. Driver-owned, so no CAS, exactly like
     * the scheduler's lane transitions.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    dequeueMerge(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        if (!next.merge_queue.some((e) => e.bead_id === bead_id)) {
          return false;
        }
        next.merge_queue = next.merge_queue.filter(
          (e) => e.bead_id !== bead_id
        );
        return true;
      });
    },

    /**
     * Cancel WAITING merge-queue items — one [취소] click, or the lane's
     * [일괄 머지 중단] emptying everything but the item being merged. Both are
     * ONE CAS-guarded write: cancelling item by item would let the active item
     * finish between requests, promote the next waiter to active, and leave
     * that one queued after a click that said "stop all".
     *
     * `keep` names the item the caller must NOT remove (the active one);
     * whether an item is active is the driver's judgment, made before this.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id?: string, all?: boolean, keep?: string|null }} input
     * @returns {QueueOpResult}
     */
    cancelMerge(workspace, input) {
      const { expected_revision, bead_id, all, keep } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const doomed = all
          ? next.merge_queue
              .map((e) => e.bead_id)
              .filter((id) => id !== (keep || null))
          : [bead_id];
        const removed = next.merge_queue.filter((e) =>
          doomed.includes(e.bead_id)
        );
        if (removed.length === 0) {
          return false;
        }
        next.merge_queue = next.merge_queue.filter(
          (e) => !doomed.includes(e.bead_id)
        );
        return true;
      });
    },

    /**
     * Count one consumed conflict-resolution round against a queued item
     * (UI-5v7d §2 step 3). Driver-owned (no CAS) and durable: the cap it feeds
     * has to hold across the restart a deploy causes.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    bumpResolutionRound(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find((e) => e.bead_id === bead_id);
        if (!entry) {
          return false;
        }
        entry.resolution_rounds += 1;
        return true;
      });
    },

    /**
     * Drop cached in-memory state (test hook — forces the next access to
     * cold-load from disk, exercising the restart path).
     */
    __clearCacheForTest() {
      cache.clear();
    }
  };
}
