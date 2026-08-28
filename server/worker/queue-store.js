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
 * Restart safety: `load()` forces `auto_advance = false` regardless of the
 * persisted value. It retains the raw value only in a process-local snapshot;
 * the self-deploy restore controller may consume that snapshot after proving
 * the restarting deploy reached terminal success. Crashes, manual restarts,
 * and unknown provenance stay OFF. The reset is in-memory; the corrected value
 * is flushed to disk on the next mutation.
 *
 * @typedef {Object} QueueEntry
 * @property {string} bead_id - The bead placed in this lane.
 * @property {number} added_at - Epoch ms the bead entered this lane.
 * @property {string|null} [merge_sha] - Observed merge commit for this row.
 * @property {string|null} [cleanup_cursor] - Next post-merge cleanup step.
 * @property {string|null} [head_ref] - Branch identity retained for deferred cleanup.
 * @property {string|null} [pr_url] - PR URL retained for deferred notification.
 * @property {string|null} [serial_lane_id] - Original serial lane retained
 * while this row waits for merge cleanup. Optional for legacy snapshots.
 * @property {boolean} [external] - Durable external origin: a promoted
 * externally-merged row keeps this after the registry overlay yields, so
 * failure-resume eligibility ([정리]) still classifies it as external.
 * @property {string|null} [armed_by_lane] - Cross-lane id (`cl_*`) that armed
 * this row for dispatch (UI-jaua §5.1). Written on PARALLEL waiting rows and
 * carried onto the `pr_wait` row that replaces one; never on a serial-lane
 * row, because a cross-lane member is loaded into the parallel queue. Absent
 * means "this row is not part of a running cross lane", which is what every
 * legacy `queue.json` and every restart resolves to.
 */
/**
 * @typedef {Object} SerialLane
 * @property {string} id - Fixed slot id (`s1`..`s5`); never user-named.
 * @property {QueueEntry[]} entries - Waiting members in execution order.
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
 * @property {string|null} armed_by_lane - Cross-lane id this dispatch was
 * armed by (UI-jaua §5.1), snapshotted like `base_oid`/`runner`/`model`. The
 * `pr_wait` row is planted from it and the failure path is judged against it,
 * so it must survive queue mutations; `disarm` never clears an attempt.
 * @property {string|null} model - Model snapshot.
 * @property {string|null} effort - Effort snapshot.
 * @property {string|null} observed_effort - Effort observed after launch from
 * the runner's own session file (Claude project JSONL / Codex rollout). Null
 * for legacy attempts and runners without an observer.
 * @property {string|null} speed - Orchestration service tier snapshot.
 * @property {string|null} claude_account - Claude account email applied to the
 * launch, or null when the runner did not apply a Claude pin.
 * @property {string|null} codex_account - Codex account key applied to the
 * launch, or null when no Codex pin was applied.
 * @property {number|null} exit - Process exit code.
 * @property {unknown} verify_result - Worker independent-verification result.
 * @property {{ pinned?: string, observed?: string, landed?: boolean, via?: string, shas?: string[], pushed?: string[], artifact_pushed?: string[], inherited?: string[], skipped?: string, error?: string }|null} base_drift -
 * The POST-HOC base observation (UI-8mvc §3, rebuilt UI-1xcd §4), written at
 * every termination path: the pinned `base_oid`, the remote tip re-resolved
 * after the session ended, and — from the attempt's OWN pre-push record —
 * whether it pushed at its base and whether that push is on the base now.
 * `pushed` holds the base-destined oids the hook recorded (present as `[]` when
 * the record was readable and held none); `shas` narrows that to the ones
 * reachable from the observed tip, which is a violation's whole evidence.
 * `artifact_pushed` holds the base-destined oids the hook let through under its
 * docs-only exemption (UI-7ufi §2.4): published on purpose, so never landing
 * candidates and never evidence of a violation.
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
 * @property {string|null} status - Attempt lifecycle: pending/running/done/
 * failed/orphaned/paused/stopped/discarded. `paused` is resumable; `stopped` is
 * legacy history; `discarded` is the unified archive-backed terminal action.
 * `pending` is a `review_session` registered by the `[리뷰 후 머지]` CAS write
 * whose session has not spawned yet (UI-d7fy §5.2); the four states that lane
 * ever holds are `pending`/`running`/`done`/`failed`.
 * @property {string|null} workflow_mode_prior - workflow_mode value snapshotted before launch (null=was unset).
 * @property {string|null} target_base - Merge target base at dispatch.
 * @property {number|null} finished_at - Epoch ms the attempt terminated.
 * @property {string|null} cause - Failure cause (failure banner reason).
 * @property {{ reason: string, command: string|null }|null} cause_detail -
 * What the fail-closed path actually caught, when the cause alone cannot say
 * it (UI-2o4z §2): the caught `reason` plus the simple command it matched
 * (`command` null for an interactive-question blocker). Every fail-closed path
 * that knows one records it — the `loud_fail_blocker` guard kill and, since
 * UI-ogf9, the `workflow_mode` stamp failures; other causes leave it null.
 * @property {number|null} dismissed_at - Epoch ms a human closed (✕) this
 * failure's banner, declaring it handled. Null means "still unhandled", which
 * is one of the two ways the UI stops showing a failure banner (the other is
 * being superseded by a later attempt for the same bead).
 * @property {boolean} halted_auto_advance - Whether this attempt performed the
 * durable true-to-false auto-advance transition.
 * @property {{ input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number, reasoning_output_tokens?: number, total_cost_usd?: number }|null} usage -
 * Token usage this attempt consumed (UI-raqh §1), persisted when the session
 * ends (success/failure/pause/stop) from the live tally in `usage-store.js`.
 * Null on an attempt whose runner reported none and on every record written
 * before the field existed — the display is fail-quiet, so a null simply
 * renders nothing.
 * @property {UsageLeg[]} usage_legs - Completed nested provider usage receipts
 * (Codex delegation units and Claude subagents alike). Legacy attempts
 * normalize this optional field to an empty list.
 * @property {DelegationSession[]} delegation_sessions - Validated delegated
 * session summaries, same two providers. Legacy attempts normalize this
 * optional field to an empty list.
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
 * @property {string|null} forked_from_session_id - The provider session id this
 * attempt was FORKED from at dispatch (UI-p206 §6); null for every attempt that
 * forked nothing. A fork is issued a new session id, so `session_id` — extracted
 * from the session's own init event — never matches the one it inherited
 * context from, and without this field the relationship is unrecoverable from
 * the record. Distinct from `resumed_from`, which names a prior ATTEMPT rather
 * than a session and implies the same transcript continued.
 * @property {'session'|'fresh'|null} continuation_mode - Whether this child
 * reused the provider session or started a replacement session. Null keeps
 * legacy history neutral.
 * @property {Record<string, string|null>|null} exec_restore_values - Raw bead
 * metadata observed immediately before this attempt overlaid exec stamps.
 * @property {string|null} workflow_mode_source_prior - `workflow_mode_source`
 * value snapshotted before launch (null=was unset), reverted with
 * `workflow_mode` as one pair (UI-bu6d §5).
 * @property {Record<string, string|null>|null} receipt_baseline - Exact values
 * of the five receipt-authority keys read immediately BEFORE this attempt's
 * first metadata write (UI-bu6d §2). Null when the pre-dispatch read failed, in
 * which case "appeared or changed" is unsayable and those checks are skipped.
 * @property {Record<string, unknown>|null} receipt_check - The completion-time
 * receipt observation (UI-bu6d §3). DISPLAY AND HISTORY ONLY: the merge gate
 * re-runs the check against current metadata rather than trusting this.
 * @property {{ mismatch: Record<string, unknown>, continuation: null }|null} continuation_action -
 * Durable action-required descriptor when a background relaunch cannot choose
 * across runners. Null on ordinary attempts.
 * @property {boolean} conflict_resolution - Whether this attempt was dispatched
 * to RESOLVE a PR conflict (worker-phase2 §6). It is the single input that
 * relaxes the session-side base-into-branch `git merge` guard, so it is
 * recorded durably: a reconcile pass or a restart must be able to see what kind
 * of attempt this was. Defaults false — a missing value fails closed.
 * @property {boolean} quickfix_lane - Whether this is a Worker-dispatched
 * quick_fix lane attempt. Settlement uses it to choose landing instead of PR
 * observation, and the session uses it as the exemption basis for the three
 * base-push guard layers (pre-push hook install, base-drift observation, and
 * textual guard). Defaults false.
 * @property {{ cursor: 'base_containment'|'repo_operations'|'branch_cleanup'|'parent_close'|'no_change_close'|null, head_sha: string|null, reason: string|null }|null} quickfix_landing -
 * Durable landing progress. `cursor` reuses the cleanup step vocabulary (null
 * before the first cleanup step) plus `no_change_close` for a contract
 * refuted close settled without a delta head, `head_sha` is the 40hex bound by
 * `impl_review` (null under `no_change_close`), and `reason` records a landing
 * failure. Its shape is directly
 * consumable by the existing `prWaitProgress` projection.
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
 * owns this attempt; null for ordinary sessions.
 * @property {boolean} worker_serial - RETIRED legacy flag from the global
 * `worker-serial` mutex regime. Round-trips for history; nothing consumes it
 * for scheduling and no new dispatch writes it.
 * @property {string|null} serial_lane_id - Serial lane (`s1`..`s5`) this
 * attempt's lineage occupies, snapshotted at dispatch; null for parallel-lane
 * work. Successor attempts of the same lineage inherit it.
 * @property {string|null} completion_op_id - Journal operation paired with the
 * attempt before spawn.
 * @property {CompletionFailureKey|null} completion_failure_key - SHA-bound
 * failure identity the session was asked to repair.
 * @property {'implementation'|'review_session'|'retired_kind'} kind - Which
 * lane produced this attempt (UI-d7fy §5.5). A `review_session` is the
 * `[리뷰 후 머지]` click's session: real work a person must be able to see, but
 * not the bead's own implementation run, so it never holds the bead's 실행중
 * slot. Legacy records carry no `kind` and are implementation runs by
 * definition; a kind this enum no longer names is a RETIRED lane and
 * normalizes to a terminal `retired_kind` attempt of KIND `retired_kind`
 * (§3.8) — never to `implementation`, which would let the migrated record
 * read as the bead's own failed run and occupy a lane forever.
 * @property {'click'|'auto'|null} origin - Whether a human click or the
 * automatic resolution lane asked for this attempt. Null on an ordinary
 * implementation attempt, which answers to neither.
 * @property {'bead'|'harness'|null} reviewer_source - Which layer of the
 * manual-continuation selection ladder resolved the reviewer. Recorded because
 * the ladder is a dotfiles contract and "which layer answered" is the only way
 * to see it was followed.
 * @property {string|null} authority_id - Merge authority this attempt was
 * dispatched under, so a late result can fail its CAS against a replaced one.
 * @property {string|null} head_sha - Head the review was bound to.
 * @property {string|null} log_path - The session log file the log view reads.
 * The transcript is NOT copied into the queue.
 */
/**
 * One completed nested provider receipt. Two providers share the shape and no
 * durable field was added for the second (UI-2mpn §5.3): `provider:'codex'`
 * carries the two Codex roles, a UTC-second `completed_at` string, and neither
 * `agent_type` nor `agent_id`; `provider:'claude'` carries `role:'subagent'`,
 * the two optional Claude-only agent fields, and epoch-ms (or null) times,
 * because a stream line with no `timestamp` gives the parser nothing to date
 * the receipt with and inventing a clock read would break replay equality.
 *
 * @typedef {Object} UsageLeg
 * @property {string} receipt_id
 * @property {'codex'|'claude'} provider
 * @property {'implementation'|'review-consult'|'subagent'} role
 * @property {string|null} [agent_type] - Claude only: the `subagent_type` the
 * `Agent` call named, or the `agentType` its result reported.
 * @property {string|null} [agent_id] - Claude only: `tool_use_result.agentId`,
 * preserved for display since the matching key stays the launch id.
 * @property {string} session_id
 * @property {string} turn_id
 * @property {string|null} model
 * @property {string|null} effort
 * @property {{ input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number, reasoning_output_tokens: number }|{ total_tokens: number }} usage - The
 * total-only alternative is a Claude subagent's alone (UI-1663 §5.3): a
 * backgrounded leg is only ever reported as one number, and no four-field
 * reconstruction exists for it.
 * @property {string|number|null} completed_at
 */
/**
 * One delegated session summary, on the same two-provider split as
 * {@link UsageLeg}. For `provider:'claude'`, `session_id` and `turn_id` are
 * both the launch id and every time field is `number|null`.
 *
 * @typedef {Object} DelegationSession
 * @property {string} launch_id
 * @property {'codex'|'claude'} provider
 * @property {'implementation'|'review-consult'|'subagent'} role
 * @property {string|null} [agent_type] - Claude only.
 * @property {string|null} model
 * @property {string|null} effort
 * @property {string} session_id
 * @property {string|null} turn_id
 * @property {'running'|'done'|'failed'|'interrupted'} status
 * @property {number|null} started_at
 * @property {string|number|null} completed_at
 * @property {number|null} last_event_at
 */
/**
 * @typedef {Object} StaleWorkSummary
 * @property {number} staged_count
 * @property {number} unstaged_count
 * @property {number} untracked_count
 * @property {number} branch_ahead
 * @property {number} head_ahead
 */
/**
 * @typedef {Object} StaleWorkIdentity
 * @property {string|null} worktree_realpath
 * @property {string|null} branch
 * @property {string|null} head_sha
 * @property {string|null} branch_head_sha
 * @property {string|null} base_oid
 * @property {string|null} status_digest
 */
/**
 * @typedef {Object} StaleWorkAdmission
 * @property {1} schema
 * @property {'worktree'|'branch'} residue
 * @property {'unique'|'unknown'} state
 * @property {string} cause
 * @property {StaleWorkSummary} summary
 * @property {string} identity_digest
 * @property {string} action_id
 * @property {boolean} can_resume
 * @property {boolean} can_continue
 * @property {boolean} can_backup_fresh
 * @property {boolean} can_recheck
 * @property {StaleWorkIdentity} [identity]
 */
/**
 * @typedef {Object} AdmissionRecord
 * @property {string} reason
 * @property {number} at
 * @property {true} [stale]
 * @property {StaleWorkAdmission} [stale_work]
 */
/**
 * @typedef {Object} Queue
 * @property {number} revision - CAS counter; bumped on every mutation.
 * @property {boolean} auto_advance - Whether the scheduler may start sessions.
 * Cold load resets this OFF; only a verified terminal self-deploy may restore
 * the process-local pre-restart value.
 * @property {SerialLane[]} serial_lanes - Fixed-slot exclusive waiting lanes
 * (`s1`..`s5`). Array order is display order; `entries` order is execution
 * order. Length always equals {@link Queue.serial_lane_count}.
 * @property {number} serial_lane_count - How many serial lanes are active
 * (1..5). Shrinking returns truncated waiting entries to the parallel lane.
 * @property {string|null} orchestration_model - Workspace default outer launch
 * model, stored as a VALUE rather than a preset reference (spec §C.5). Null
 * leaves dispatch on the hardcoded `opus` fallback.
 * @property {string|null} orchestration_effort - Workspace default outer effort.
 * @property {string|null} orchestration_speed - Workspace default outer speed.
 * @property {{ version: number, at: number }|null} session_defaults_migration -
 * The per-workspace completion marker for the spec §F migration. Written ONLY
 * after all three destinations read back, and it is what stops the migration
 * from re-running on the next start.
 * @property {number} slots - Concurrency cap: how many sessions the scheduler
 * may run at once (worker-phase2 §3). Integer ≥ 1, default 2. `slots = 1` IS
 * the retired serial lane's semantics.
 * @property {QueueEntry[]} queue - The ONE waiting lane, in dispatch order
 * (worker-phase2 §3). Ordering/dependency safety is carried by the admission
 * validator + bd deps, not by a lane split.
 * @property {QueueEntry[]} pr_wait - Beads whose PR the server OBSERVED open,
 * waiting for a human merge click (worker-phase2 §4).
 * @property {QueueEntry[]} done - Completed today.
 * @property {string[]} [disarmed_on_load] - TRANSIENT (UI-jaua §5.1): the
 * cross-lane ids whose arm this process's cold load cleared. Never persisted
 * and never in the cache — it is attached to exported snapshots only, because
 * the value is recomputed at every start. It is what separates "a restart
 * stopped this lane" from "this lane was never started".
 * @property {Record<string, Attempt>} attempts - Attempt records by attempt_id.
 * @property {Record<string, AdmissionRecord>} admission -
 * Auto-run admission observations by bead_id (badge display). Cleared only on a
 * successful dispatch or queue removal — never auto-expired. `stale:true` marks
 * the ONE non-blocking record (UI-dlim §3.4): the bead was ADMITTED with a
 * stale spec_review receipt, so the badge must not read as a refusal. Every
 * record without the flag is a refusal, exactly as before.
 * @property {Record<string, { step: string, reason: string, bd_restore: string|null, at: number, detail: string|null, output_tail?: string, log_path?: string, failure_code?: string, retryable?: boolean, retry_count?: number, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number, diagnosis?: { verdict: string, attempt_id: string, consumed: boolean, evidence: string, fix_bead_id?: string, malformed?: boolean } }>} cleanup_failed -
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
 * DURABLE, unlike the fail-closed cold-load reset of
 * {@link Queue.auto_advance}: merging beads-ui DEPLOYS beads-ui, which restarts
 * this process, so a flag kept in memory would switch itself off exactly when
 * the queue merged its own repository. Nothing here resumes a half-run session,
 * and the enroller's own members are re-judged by the driver at their turn.
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
 * @property {{ verify: boolean, deploy: boolean }} repo_ops_opt_out - Per-kind
 * workspace opt-out from the repository's DECLARED verify/deploy operations
 * (UI-lsti §1). `true` makes this workspace treat that kind as undeclared when
 * it creates NEW operations; the declaration itself, other workspaces, and
 * operations that already exist are untouched. A legacy queue file has no key,
 * which normalizes to both kinds running — the state every such workspace was
 * actually in.
 * @property {Record<string, RepoOperation>} repo_operations - Worker-owned
 * one-shot repository operation journal.
 * @property {number} manual_deploy_seq - Monotonic per-workspace counter of
 * MANUAL deploy runs (UI-s582 §3.5). Its only consumer is the manual deploy
 * operation identity: the automatic id hashes (repo, base, target, effective
 * base, script), so a second 배포 실행 on the same tip would adopt the first
 * run's terminal record. Issuing a fresh value inside the repo-operation lock
 * makes every click a NEW operation. A legacy queue file has no key, which
 * normalizes to 0.
 * @property {RepoOperationMigration|null} repo_operation_migration - The
 * one-shot legacy-state migration stamp. Absent (null) on every queue written
 * before the RepoOperation runtime, which is exactly what makes the migration
 * run once and never again.
 */
/**
 * @typedef {Object} RepoOperationMigrationResult
 * @property {string} bead_id
 * @property {string} from_step - Legacy cleanup step the record failed at.
 * @property {string} from_reason - Legacy failure reason, kept verbatim.
 * @property {string|null} subject_sha - Canonical subject SHA proven contained
 * in the fetched remote base tip.
 * @property {'merge_sha'|'head_sha'|null} subject_source
 * @property {string|null} target_base
 * @property {string} disposition - What the migration decided (master spec §11).
 * @property {string|null} reason - Why a `legacy_manual` record was preserved.
 * @property {Record<string, unknown>|null} evidence - Retired-provider status
 * snapshot read once during the migration, when one was read.
 * @property {number} at
 */
/**
 * @typedef {Object} RepoOperationMigration
 * @property {number} version - Migration schema version.
 * @property {number} at
 * @property {Record<string, RepoOperationMigrationResult>} results
 */
/**
 * @typedef {Object} RepoOperation
 * @property {number} schema
 * @property {string} repo_id
 * @property {'verify'|'deploy'} kind
 * @property {{ bead_id: string, merged_sha: string }[]} subjects
 * @property {string} effective_base_sha
 * @property {string} target_base
 * @property {string|null} target_sha
 * @property {string|null} target_tree
 * @property {string|null} verify_head_sha
 * @property {string[]} verify_head_shas
 * @property {string|null} deploy_worktree
 * @property {string} script_object_type
 * @property {string|null} script_path - Declared repo-relative script path, for
 * display alongside the pinned blob. Null on records written before it existed.
 * @property {string} script_mode
 * @property {string} script_blob_sha
 * @property {'queued'|'running'|'succeeded'|'failed'|'retry_pending'} state
 * @property {string} attempt_id
 * @property {number} requested_at
 * @property {number|null} started_at
 * @property {number|null} finished_at
 * @property {{ pid: number, pgid: number, started_at: number }|null} process_identity
 * @property {string|null} log_path
 * @property {string|null} log_digest
 * @property {number|null} exit_code
 * @property {string|null} signal
 * @property {{ code: string, fingerprint: string, detail: string, interrupted: boolean, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }|null} failure
 * @property {{ first_failure: RepoOperation['failure'], first_fingerprint: string|null, first_failed_at: number|null, consumed_key: [string, string, string]|null, absorbed: { first_failure: NonNullable<RepoOperation['failure']>, first_fingerprint: string, at: number }|null, outcome: 'pending'|'consumed'|'not_applicable'|'absorbed', blocked_reason: string|null }|null} retry
 * @property {string|null} superseded_by
 * @property {'automatic'|'manual'} source - Who asked for this operation. Every
 * record the Worker creates by itself is `automatic`; `manual` is the 배포 실행
 * click (UI-s582 §3). Legacy records normalize to `automatic`.
 * @property {number|null} manual_run_id - The per-workspace sequence value this
 * MANUAL run was issued, and part of its operation id. Null on every automatic
 * record.
 * @property {{ at: number, by: string }|null} dismissed - A human acknowledged
 * this failed row (UI-q0uy §4.6-2). NOT a state transition: the row stays
 * `failed` and auditable, and only the 해결 필요 tally leaves it out.
 * @property {{ approved_source_path: string, approved_source_sha: string, requested_by: string, requested_at: number }|null} bootstrap_provenance
 */
/**
 * @typedef {Object} DiscardOperation
 * @property {string} operation_id
 * @property {string} bead_id
 * @property {string|null} attempt_id
 * @property {'discard'|'stale_work_backup_fresh'} kind
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
 * @property {number} rebase_rounds - How many QUEUE-CAUSED re-conflicts this
 * item has absorbed (UI-p49g §3.2). A session that resolved correctly against
 * the base it was dispatched on is not charged a resolution round when a later
 * merge moves that base under it; this counter bounds that forgiveness so the
 * forgiven case cannot call sessions forever.
 * @property {ResolutionWait|InvalidResolutionWait|null} resolution - Durable
 * binding between this queue item and one exact conflict-resolution attempt.
 * @property {{ subject_bead_id: string, mismatch: Record<string, unknown>, continuation: 'prior_session'|'fresh_current'|null, decision_token: Record<string, unknown>|null }|null} [continuation_action]
 * @property {MergeAuthority|null} [authority]
 * @property {MergeHold|null} [hold] - Why the merge gate is holding this item
 * (UI-d7fy §3.3). A hold is NOT a failure: the authority stays, the item keeps
 * its slot, nothing is dequeued or terminalized, and every `kick()` re-runs the
 * gate on it. Absent on an item the gate has never held.
 * A cross-runner resolver decision that must survive restart.
 */
/**
 * @typedef {Object} MergeAuthority
 * @property {string} id
 * @property {'manual'|'automatic'} source
 * @property {number} granted_at
 * @property {string} requested_head_sha
 * @property {string} target_base
 * @property {'lane'} [via] - PROVENANCE only (UI-jaua §5.4): which non-click
 * path asked for this manual authority. `manual` stays the one source — the
 * continuation judgment reads `source` and nothing else — so this field can
 * never change whether an item proceeds. Absent means the ordinary click, which
 * is what every legacy `queue.json` round-trips to.
 */
/**
 * One merge-gate hold (UI-d7fy §3.3).
 *
 * @typedef {Object} MergeHold
 * @property {string} reason - The gate verdict holding the item, verbatim
 * (`review_receipt_missing` / `review_receipt_stale` /
 * `review_receipt_undetermined`).
 * @property {string} head_sha - The head the verdict was taken on, or `''`
 * when the refusal carried none.
 * @property {number} since - When THIS reason started holding the item. A
 * refresh that reports the same reason keeps the original timestamp; a
 * different reason restarts it.
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
 * @property {string} dispatch_head_sha - The PR head the queue APPROVED and
 * dispatched this resolution against (UI-p49g §3.1). Read back when the item
 * returns dirty, to tell a session that pushed nothing from one whose push was
 * overtaken by a base that moved. A legacy record reads `''`, which the charge
 * judgment treats as unreadable and therefore chargeable.
 * @property {string} base_ref - The PR base branch at dispatch.
 * @property {string} head_ref - The PR head branch at dispatch.
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
 * @typedef {'gating'|'merging'|'cleaning'|'waiting_metadata'|'reviewing'|'retrying'|'paused'|'needs_human'|'completed'} CompletionPhase
 */
/**
 * @typedef {Object} CompletionSubject
 * @property {'root'} role - The completion subject is always the root PR now
 * that the post-merge repair lane is retired (UI-8w4t §2); the field stays so
 * the `completion_status` projection keeps one stable shape.
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
 * @property {'merge_subject'|'retry_cleanup'} kind
 * @property {CompletionFailureKey} failure_key
 * @property {string|null} attempt_id
 * @property {'prepared'|'dispatched'|'observed'|'consumed'} status
 */
/**
 * @typedef {Object} CompletionTerminal
 * @property {string} reason
 * @property {string} stage
 * @property {CompletionFailureKey|null} failure_key
 * @property {string|null} evidence
 * @property {string|null} log_path
 * @property {string|null} op_id - The RepoOperation this failure belongs to,
 * or null when the stop happened before any operation ran (UI-8w4t §4).
 * @property {number|null} comment_at - Epoch ms the Bead failure comment was
 * claimed for this `(op_id, failure_key)`. Durable BEFORE the comment goes out,
 * so a lost call is never rewritten and a re-click never duplicates it.
 * @property {number} at
 */
/**
 * @typedef {CompletionTerminal & { resumed_at: number }} CompletionResumedTerminal
 */
/**
 * What a CALLER hands {@link createQueueStore} — the two UI-8w4t fields are
 * optional on the way in and always present on the durable record, so a writer
 * with no operation and no comment claim does not have to say so twice.
 *
 * @typedef {Omit<CompletionTerminal, 'op_id'|'comment_at'> & { op_id?: string|null, comment_at?: number|null }} CompletionTerminalInput
 */
/**
 * The durable inputs one automatic resolution attempt re-runs its original
 * effect with (UI-hk74 §3 second table). Every field is nullable because the
 * five retry families need different subsets and a class that needs none still
 * carries the record: an absent key and a null key must not read differently
 * after a restart.
 *
 * @typedef {Object} CompletionAutoResolutionOp
 * @property {string|null} completion_op_id - `op_id` of the operation that
 * failed, preserved because {@link CompletionIntent.active_op} may settle
 * independently.
 * @property {CompletionFailureKey|null} failure_key
 * @property {{ continuation: 'prior_session'|'fresh_current', decision_token: string }|null} continuation
 * @property {string|null} continuation_mismatch
 * @property {string|null} operation_id - RepoOperation superseded by a verify
 * re-run.
 * @property {string|null} head_sha
 * @property {string|null} base_sha
 * @property {string|null} merged_sha
 * @property {string|null} cleanup_cursor
 */
/**
 * Non-terminal automatic resolution state (UI-hk74 §4). Present ONLY while the
 * intent sits in the phase its `class` names; every other phase drops it, so a
 * stale record can never grant a second budget.
 *
 * @typedef {Object} CompletionAutoResolution
 * @property {'metadata_watch'|'auto_review'|'retry'} class
 * @property {string} origin_reason - The full terminal reason string that would
 * have been recorded had the failure terminalized.
 * @property {string} origin_stage
 * @property {CompletionPhase} return_phase - Where a successful resolution
 * returns the saga.
 * @property {number} attempts
 * @property {number|null} next_at - `retry` only.
 * @property {string|null} last_error
 * @property {CompletionAutoResolutionOp} op
 */
/**
 * @typedef {Object} CompletionIntent
 * @property {string} target_base
 * @property {CompletionPhase} phase
 * @property {CompletionSubject} subject
 * @property {CompletionOperation|null} active_op
 * @property {CompletionTerminal|null} terminal_reason
 * @property {CompletionAutoResolution|null} auto_resolution
 * @property {CompletionAutoResolution|null} paused_resolution - The resolution
 * parked by an `auto_merge` OFF boundary, restored verbatim on resume so a
 * pause never refunds the retry budget.
 * @property {CompletionResumedTerminal} [resumed_terminal]
 */
/**
 * @typedef {Object} QueueOpResult
 * @property {boolean} ok - True when the mutation was applied.
 * @property {boolean} conflict - True when rejected by a revision mismatch.
 * @property {Queue} queue - Current snapshot (new on success, unchanged else).
 * @property {string} [reason] - Why a non-conflict rejection happened, for the
 * ops that distinguish causes; absent when there is nothing to distinguish.
 * @property {string[]} [cancelled_attempt_ids] - Sessions the same write
 * settled, for the caller that still owes their processes a stop (UI-d7fy
 * §5.6).
 */
import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { createUnhandledFailurePredicate } from './attempt-failure.js';
import {
  finalizeDelegationSessions,
  normalizeDelegationSessions,
  readAttemptDelegationStreams
} from './delegation-monitor.js';
import { ORCHESTRATION_KEYS, execSettingEnums } from './exec-enums.js';
import { orderLaneByBlocks } from './lane-order.js';
import { queueFilePath } from './state-paths.js';
import {
  consumeUsageReceiptFiles,
  normalizeUsageLegs,
  readAttemptUsageReceipts
} from './usage-receipts.js';

// 정렬 규칙은 하나다 (UI-jaua §4). 함수는 브라우저도 쓸 수 있게 `lane-order.js`가
// 소유하고, 이 모듈은 기존 소비자를 위해 같은 이름으로 다시 내보낸다.
export { orderLaneByBlocks };

/**
 * Default concurrency cap when a queue carries no (or an unusable) `slots`
 * value — worker-phase2 §3/§9.
 *
 * @type {number}
 */
export const DEFAULT_SLOTS = 2;

/**
 * Schema version of the spec §F session-defaults migration. Stored in the
 * per-workspace completion marker so a future migration revision can re-run
 * against a workspace this one already finished.
 *
 * @type {number}
 */
export const SESSION_DEFAULTS_MIGRATION_VERSION = 1;

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
  'merging',
  'cleaning',
  'waiting_metadata',
  'reviewing',
  'retrying',
  'paused',
  'needs_human',
  'completed'
];

/**
 * The one binding between an automatic resolution class and the phase that
 * holds it (UI-hk74 §4). Both directions are invariants the normalizer
 * enforces: a class in the wrong phase is a corrupt record, not a hint.
 *
 * @type {Readonly<Record<CompletionAutoResolution['class'], CompletionPhase>>}
 */
export const COMPLETION_AUTO_RESOLUTION_PHASE = Object.freeze({
  metadata_watch: /** @type {CompletionPhase} */ ('waiting_metadata'),
  auto_review: /** @type {CompletionPhase} */ ('reviewing'),
  retry: /** @type {CompletionPhase} */ ('retrying')
});

/** @type {Set<CompletionPhase>} */
const COMPLETION_AUTO_RESOLUTION_PHASES = new Set(
  Object.values(COMPLETION_AUTO_RESOLUTION_PHASE)
);

/**
 * Phases a resolution may return to on success (UI-hk74 §3). Deliberately
 * excludes every terminal, paused, and auto-resolution phase: returning into
 * another wait would make "success" mean nothing.
 *
 * @type {Set<CompletionPhase>}
 */
const COMPLETION_RETURN_PHASES = new Set(
  /** @type {CompletionPhase[]} */ (['gating', 'merging', 'cleaning'])
);

/**
 * Delayed-retry budget (UI-hk74 §3). Shared by the durable bound here and the
 * coordinator's own ladder, which must agree or `retry_exhausted` would fire at
 * two different counts.
 *
 * @type {number}
 */
export const COMPLETION_RETRY_MAX = 3;

/**
 * Phases that must NOT start a pre-merge verify run (UI-hk74 §8). `reviewing`
 * is absent on purpose: the gate demands a verify receipt immediately after an
 * approval, so suppressing it there would only add one verify's latency.
 *
 * @type {Set<string>}
 */
export const COMPLETION_VERIFY_SUPPRESSED_PHASES = new Set([
  'needs_human',
  'waiting_metadata',
  'retrying'
]);

/** @type {NonNullable<Attempt['kind']>[]} */
const ATTEMPT_KINDS = ['implementation', 'review_session', 'retired_kind'];

/** @type {CompletionOperation['kind'][]} */
const COMPLETION_OP_KINDS = ['merge_subject', 'retry_cleanup'];

/** @type {CompletionOperation['status'][]} */
const COMPLETION_OP_STATUSES = [
  'prepared',
  'dispatched',
  'observed',
  'consumed'
];

const COMPLETION_EVIDENCE_MAX = 4_000;

const COMPLETION_LOG_PATH_MAX = 1_000;

const COMPLETION_REASON_MAX = 500;

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
    role !== 'root' ||
    typeof bead_id !== 'string' ||
    bead_id.length === 0 ||
    bead_id !== root_bead_id ||
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
    value.attempt_id !== null
  ) {
    return null;
  }
  return {
    op_id: value.op_id,
    kind: /** @type {CompletionOperation['kind']} */ (kind),
    failure_key,
    attempt_id: null,
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
    op_id:
      typeof value.op_id === 'string' && value.op_id.length > 0
        ? value.op_id
        : null,
    comment_at:
      typeof value.comment_at === 'number' && Number.isFinite(value.comment_at)
        ? value.comment_at
        : null,
    at: typeof value.at === 'number' && Number.isFinite(value.at) ? value.at : 0
  };
}

/**
 * @param {unknown} value
 * @returns {CompletionResumedTerminal|null}
 */
function normalizeCompletionResumedTerminal(value) {
  const terminal = normalizeCompletionTerminal(value);
  if (
    !terminal ||
    !isRecord(value) ||
    typeof value.resumed_at !== 'number' ||
    !Number.isFinite(value.resumed_at)
  ) {
    return null;
  }
  return { ...terminal, resumed_at: value.resumed_at };
}

/**
 * @param {unknown} value
 * @returns {CompletionAutoResolutionOp}
 */
function normalizeCompletionAutoResolutionOp(value) {
  const raw = isRecord(value) ? value : {};
  /**
   * @param {unknown} field
   * @returns {string|null}
   */
  const text = (field) =>
    typeof field === 'string' && field.length > 0
      ? field.slice(0, COMPLETION_LOG_PATH_MAX)
      : null;
  const continuation = isRecord(raw.continuation) ? raw.continuation : {};
  const continuation_kind = continuation.continuation;
  return {
    completion_op_id: text(raw.completion_op_id),
    failure_key: normalizeCompletionFailureKey(raw.failure_key),
    continuation:
      (continuation_kind === 'prior_session' ||
        continuation_kind === 'fresh_current') &&
      typeof continuation.decision_token === 'string' &&
      continuation.decision_token.length > 0
        ? {
            continuation: continuation_kind,
            decision_token: continuation.decision_token
          }
        : null,
    continuation_mismatch: text(raw.continuation_mismatch),
    operation_id: text(raw.operation_id),
    head_sha: isSha(raw.head_sha) ? raw.head_sha : null,
    base_sha: isSha(raw.base_sha) ? raw.base_sha : null,
    merged_sha: isSha(raw.merged_sha) ? raw.merged_sha : null,
    cleanup_cursor: text(raw.cleanup_cursor)
  };
}

/**
 * Read one automatic resolution record. Fail-closed (UI-hk74 §10): anything the
 * shape cannot vouch for returns null, and the caller turns that into
 * `needs_human` rather than resuming automation on a guess.
 *
 * @param {unknown} value
 * @returns {CompletionAutoResolution|null}
 */
function normalizeCompletionAutoResolution(value) {
  if (!isRecord(value)) {
    return null;
  }
  const resolution_class = value.class;
  const return_phase = value.return_phase;
  const next_at = value.next_at;
  if (
    typeof resolution_class !== 'string' ||
    !Object.hasOwn(COMPLETION_AUTO_RESOLUTION_PHASE, resolution_class) ||
    typeof value.origin_reason !== 'string' ||
    value.origin_reason.length === 0 ||
    typeof value.origin_stage !== 'string' ||
    value.origin_stage.length === 0 ||
    typeof return_phase !== 'string' ||
    !COMPLETION_RETURN_PHASES.has(
      /** @type {CompletionPhase} */ (return_phase)
    ) ||
    typeof value.attempts !== 'number' ||
    !Number.isInteger(value.attempts) ||
    value.attempts < 0 ||
    value.attempts > COMPLETION_RETRY_MAX ||
    (next_at !== null &&
      (typeof next_at !== 'number' ||
        !Number.isFinite(next_at) ||
        resolution_class !== 'retry')) ||
    (value.last_error !== null &&
      value.last_error !== undefined &&
      typeof value.last_error !== 'string')
  ) {
    return null;
  }
  return {
    class: /** @type {CompletionAutoResolution['class']} */ (resolution_class),
    origin_reason: value.origin_reason.slice(0, COMPLETION_REASON_MAX),
    origin_stage: value.origin_stage,
    return_phase: /** @type {CompletionPhase} */ (return_phase),
    attempts: value.attempts,
    next_at: typeof next_at === 'number' ? next_at : null,
    last_error:
      typeof value.last_error === 'string'
        ? value.last_error.slice(-COMPLETION_EVIDENCE_MAX)
        : null,
    op: normalizeCompletionAutoResolutionOp(value.op)
  };
}

/**
 * Move an intent to `phase` under the auto-resolution invariants of UI-hk74 §4.
 * Every mutator that assigns a phase goes through here.
 *
 * A live resolution HOLDS the phase (UI-hk74 review F1). The re-run of a
 * failed effect goes through the ordinary owners, and those owners assign
 * `return_phase` — `prepareCompletionOp(phase:'cleaning')` is the plain case.
 * Letting that assignment through produced an intent in its return phase still
 * carrying `auto_resolution`, which the normalizer drops on the next cold
 * load: the whole retry budget vanished across a restart and the next failure
 * started again at `attempts = 0`, so the 3-attempt cap bounded nothing. The
 * record and its phase therefore travel together, and BOTH are released at the
 * one moment the §3 success condition reads back — `clearCompletionAutoResolution`,
 * a consumed operation, terminalization, or a human click. `paused` parks
 * instead of clearing.
 *
 * @param {CompletionIntent} intent
 * @param {CompletionPhase} phase
 * @returns {boolean} False when the phase would contradict the record.
 */
function applyCompletionPhase(intent, phase) {
  if (
    COMPLETION_AUTO_RESOLUTION_PHASES.has(phase) &&
    (!intent.auto_resolution ||
      COMPLETION_AUTO_RESOLUTION_PHASE[intent.auto_resolution.class] !== phase)
  ) {
    return false;
  }
  if (phase === 'paused' && intent.auto_resolution) {
    intent.paused_resolution = intent.auto_resolution;
    intent.auto_resolution = null;
    intent.phase = phase;
    return true;
  }
  if (intent.auto_resolution && !COMPLETION_AUTO_RESOLUTION_PHASES.has(phase)) {
    // Held, not refused: the caller's own effect (the journalled operation it
    // is opening) must still land, and only the resolution's success may move
    // the saga out of its waiting phase.
    return true;
  }
  intent.phase = phase;
  return true;
}

/**
 * Preserve a malformed record as a terminal saga instead of dropping it and
 * letting the next intake re-enter it as a fresh root.
 *
 * @param {string} root_bead_id
 * @param {unknown} value
 * @returns {CompletionIntent}
 */
function invalidCompletionIntent(root_bead_id, value) {
  const raw = isRecord(value) ? value : {};
  const raw_subject = isRecord(raw.subject) ? raw.subject : {};
  return {
    target_base: typeof raw.target_base === 'string' ? raw.target_base : '',
    phase: 'needs_human',
    subject: {
      role: 'root',
      bead_id: root_bead_id,
      pr_url:
        typeof raw_subject.pr_url === 'string' ? raw_subject.pr_url : null,
      head_sha: isSha(raw_subject.head_sha) ? raw_subject.head_sha : null,
      base_sha: isSha(raw_subject.base_sha) ? raw_subject.base_sha : null,
      merged_sha: isSha(raw_subject.merged_sha) ? raw_subject.merged_sha : null
    },
    active_op: null,
    auto_resolution: null,
    paused_resolution: null,
    terminal_reason: {
      reason: 'intent_state_invalid',
      stage: 'state',
      failure_key: null,
      evidence: 'completion_intent_malformed',
      log_path: null,
      op_id: null,
      comment_at: null,
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
  const active_op =
    value.active_op === null
      ? null
      : normalizeCompletionOperation(value.active_op);
  const terminal_reason =
    value.terminal_reason === null
      ? null
      : normalizeCompletionTerminal(value.terminal_reason);
  const resumed_terminal = normalizeCompletionResumedTerminal(
    value.resumed_terminal
  );
  const in_auto_phase = COMPLETION_AUTO_RESOLUTION_PHASES.has(
    /** @type {CompletionPhase} */ (phase)
  );
  const auto_resolution = in_auto_phase
    ? normalizeCompletionAutoResolution(value.auto_resolution)
    : null;
  const paused_resolution =
    phase === 'paused'
      ? normalizeCompletionAutoResolution(value.paused_resolution)
      : null;
  if (
    typeof value.target_base !== 'string' ||
    value.target_base.length === 0 ||
    typeof phase !== 'string' ||
    !COMPLETION_PHASES.includes(/** @type {CompletionPhase} */ (phase)) ||
    !subject ||
    (value.active_op !== null && !active_op) ||
    (value.terminal_reason !== null && !terminal_reason) ||
    (phase === 'needs_human' && !terminal_reason) ||
    (phase !== 'needs_human' && terminal_reason) ||
    (in_auto_phase &&
      (!auto_resolution ||
        COMPLETION_AUTO_RESOLUTION_PHASE[auto_resolution.class] !== phase))
  ) {
    return invalidCompletionIntent(root_bead_id, value);
  }
  const normalized = {
    target_base: value.target_base,
    phase: /** @type {CompletionPhase} */ (phase),
    subject,
    active_op,
    auto_resolution,
    paused_resolution,
    terminal_reason
  };
  return resumed_terminal ? { ...normalized, resumed_terminal } : normalized;
}

/* UI-8w4t legacy-read:begin — the ONE region allowed to name the retired
   repair-lane keys, because retiring a persisted saga means reading them once.
   The identifier grep gate (`queue-store.repair-lane-retired.test.js`) strips
   exactly this region and fails on a match anywhere else. */
/**
 * The two phases the retired post-merge automatic repair lane owned (UI-8w4t
 * §2). A record loaded in one of them is NOT malformed — it is a live saga
 * whose lane no longer exists, and retiring it is ORDERED: the detached repair
 * session survives a server restart, so its process must die and its attempt
 * must reach a terminal status BEFORE the keys that identify them are dropped.
 *
 * @type {Set<string>}
 */
const RETIRED_REPAIR_PHASES = new Set(['repairing', 'waiting_repair_pr']);

/**
 * One withheld repair-lane saga, computed from the RAW record at cold load and
 * held in memory only. Never persisted: the durable rewrite is the retirement
 * write itself, so a crash before it simply replans from the same file.
 *
 * @typedef {Object} RepairLaneRetirement
 * @property {string} root_bead_id
 * @property {string} phase - The retired phase the record was loaded in, which
 * becomes the terminal `stage`.
 * @property {string[]} attempt_ids - Sessions the lane still owns, identified
 * through `active_op`, `repair_operation_id`, `completion_mode`, and
 * `repair_bead_ids` while those keys are still readable.
 * @property {CompletionFailureKey|null} failure_key
 * @property {string|null} log_path
 * @property {string|null} op_id
 * @property {CompletionIntent} intent - The retired record, already free of
 * every `repair_*`/`subject_stack`/`completion_mode` key, awaiting its
 * terminal timestamp.
 * @property {unknown} raw_intent - The record EXACTLY as the cold load read it
 * from disk. Withholding the intent keeps it out of the in-memory snapshot,
 * but every ordinary queue write persists that snapshot — so without this the
 * first unrelated write would erase the only keys naming the session, and a
 * crash after it would leave a live repair process nothing could identify.
 * {@link persist} re-inserts it until the retirement write replaces it.
 */

/**
 * Withhold every repair-lane saga in a raw queue payload and describe what its
 * retirement has to stop first.
 *
 * @param {unknown} parsed - The raw parsed queue file.
 * @returns {RepairLaneRetirement[]}
 */
function planRepairLaneRetirements(parsed) {
  /** @type {RepairLaneRetirement[]} */
  const out = [];
  if (!isRecord(parsed) || !isRecord(parsed.completion_intents)) {
    return out;
  }
  const attempts = isRecord(parsed.attempts) ? parsed.attempts : {};
  for (const [root_bead_id, value] of Object.entries(
    parsed.completion_intents
  )) {
    if (
      root_bead_id.length === 0 ||
      !isRecord(value) ||
      !RETIRED_REPAIR_PHASES.has(String(value.phase))
    ) {
      continue;
    }
    const active_op = isRecord(value.active_op) ? value.active_op : null;
    const repair_bead_ids = Array.isArray(value.repair_bead_ids)
      ? value.repair_bead_ids.filter((id) => typeof id === 'string')
      : [];
    /** @type {Set<string>} */
    const attempt_ids = new Set();
    if (typeof active_op?.attempt_id === 'string') {
      attempt_ids.add(active_op.attempt_id);
    }
    for (const [attempt_id, raw_attempt] of Object.entries(attempts)) {
      if (!isRecord(raw_attempt)) {
        continue;
      }
      const owned = raw_attempt.completion_root_id === root_bead_id;
      if (
        (owned &&
          (raw_attempt.completion_mode != null ||
            raw_attempt.repair_operation_id != null)) ||
        (typeof raw_attempt.bead_id === 'string' &&
          repair_bead_ids.includes(raw_attempt.bead_id))
      ) {
        attempt_ids.add(attempt_id);
      }
    }
    let log_path = null;
    for (const attempt_id of attempt_ids) {
      const raw_attempt = attempts[attempt_id];
      if (isRecord(raw_attempt) && typeof raw_attempt.log_path === 'string') {
        log_path = raw_attempt.log_path.slice(0, COMPLETION_LOG_PATH_MAX);
        break;
      }
    }
    const base = invalidCompletionIntent(root_bead_id, value);
    out.push({
      root_bead_id,
      phase: String(value.phase),
      attempt_ids: [...attempt_ids],
      failure_key: normalizeCompletionFailureKey(active_op?.failure_key),
      log_path,
      op_id:
        typeof active_op?.op_id === 'string' && active_op.op_id.length > 0
          ? active_op.op_id
          : null,
      intent: { ...base, terminal_reason: null },
      raw_intent: value
    });
  }
  return out;
}

/* UI-8w4t legacy-read:end */

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
    // Withheld, not normalized (UI-8w4t §2): normalizing here would drop the
    // `repair_*` keys the retirement still has to read to find the session
    // process it must stop, and would stamp `intent_state_invalid` over the
    // reason a human needs to see.
    if (isRecord(value) && RETIRED_REPAIR_PHASES.has(String(value.phase))) {
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
 * Keep the versioned stale-work payload bounded and fail-quiet. `identity` is
 * server-only authority state; the WebSocket projection removes it.
 *
 * @param {unknown} value
 * @returns {StaleWorkAdmission|null}
 */
function normalizeStaleWork(value) {
  if (
    !isRecord(value) ||
    value.schema !== 1 ||
    (value.state !== 'unique' && value.state !== 'unknown') ||
    typeof value.cause !== 'string' ||
    !isRecord(value.summary) ||
    typeof value.identity_digest !== 'string' ||
    typeof value.action_id !== 'string'
  ) {
    return null;
  }
  /** @type {Partial<StaleWorkSummary>} */
  const summary = {};
  for (const key of /** @type {(keyof StaleWorkSummary)[]} */ ([
    'staged_count',
    'unstaged_count',
    'untracked_count',
    'branch_ahead',
    'head_ahead'
  ])) {
    const count = value.summary[key];
    if (!Number.isInteger(count) || Number(count) < 0) {
      return null;
    }
    summary[key] = Number(count);
  }
  /** @type {Omit<StaleWorkAdmission, 'identity'>} */
  const normalized = {
    schema: 1,
    residue: value.residue === 'branch' ? 'branch' : 'worktree',
    state: value.state,
    cause: value.cause,
    summary: /** @type {StaleWorkSummary} */ (summary),
    identity_digest: value.identity_digest,
    action_id: value.action_id,
    can_resume: value.can_resume === true,
    can_continue: value.can_continue === true,
    can_backup_fresh: value.can_backup_fresh === true,
    can_recheck: value.can_recheck === true
  };
  if (isRecord(value.identity)) {
    const identity = {
      worktree_realpath:
        typeof value.identity.worktree_realpath === 'string'
          ? value.identity.worktree_realpath
          : null,
      branch:
        typeof value.identity.branch === 'string'
          ? value.identity.branch
          : null,
      head_sha:
        typeof value.identity.head_sha === 'string'
          ? value.identity.head_sha
          : null,
      branch_head_sha:
        typeof value.identity.branch_head_sha === 'string'
          ? value.identity.branch_head_sha
          : null,
      base_oid:
        typeof value.identity.base_oid === 'string'
          ? value.identity.base_oid
          : null,
      status_digest:
        typeof value.identity.status_digest === 'string'
          ? value.identity.status_digest
          : null
    };
    return { ...normalized, identity };
  }
  return normalized;
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
 * Attempt statuses that no longer own their bead. Mirrors the scheduler's set;
 * kept here because the submit path must judge "is this bead free to move"
 * inside the same mutation that moves it.
 *
 * @type {Set<string>}
 */
const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped',
  'discarded'
]);

/**
 * Statuses that RELEASE a serial lane (UI-04vo §2). Deliberately NARROWER than
 * {@link TERMINAL_ATTEMPT_STATUSES}: a `failed`/`orphaned` lineage keeps its
 * lane until it merges-and-cleans or is discarded, so those two are absent
 * here even though they are terminal for membership purposes. Mirrors the
 * scheduler's set — the two must agree or occupancy would mean two things.
 *
 * @type {Set<string>}
 */
const LANE_RELEASING_ATTEMPT_STATUSES = new Set([
  'done',
  'stopped',
  'discarded'
]);

/** @type {number} */
const MIN_SERIAL_LANE_COUNT = 1;
/** @type {number} */
const MAX_SERIAL_LANE_COUNT = 5;
/** @type {number} */
const DEFAULT_SERIAL_LANE_COUNT = 1;

/**
 * Coerce a candidate serial-lane count, or null when it is not one. Mirrors
 * {@link normalizeSlots}: `setSerialLaneCount` REJECTS null without a write,
 * `normalize` falls back to {@link DEFAULT_SERIAL_LANE_COUNT}.
 *
 * @param {unknown} value
 * @returns {number|null}
 */
function normalizeSerialLaneCount(value) {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return null;
  }
  return value >= MIN_SERIAL_LANE_COUNT && value <= MAX_SERIAL_LANE_COUNT
    ? value
    : null;
}

/**
 * Zero-based slot index of a serial lane id, or null for anything else.
 *
 * @param {unknown} id
 */
function serialLaneIndex(id) {
  if (typeof id !== 'string') {
    return null;
  }
  const match = /^s([1-5])$/.exec(id);
  return match ? Number(match[1]) - 1 : null;
}

/**
 * Queue properties this module actively normalizes. Any other top-level field
 * is historical opaque data and must round-trip instead of being deleted by an
 * unrelated queue mutation.
 */
// `default_exec_preset_id` and `exec_defaults` are deliberately ABSENT: they are
// retired fields whose only remaining reader is the spec §F migration. Leaving
// them out of this set makes them round-trip as opaque legacy data, so a
// migration that stops part-way still finds its source on the next start. The
// migration deletes them itself once its completion marker is written.
const KNOWN_QUEUE_FIELDS = new Set([
  'revision',
  'auto_advance',
  // Legacy-drop key: the merge-serial toggle retired by the serial-lane regime
  // (UI-04vo). Listed so it is DROPPED on load instead of round-tripping.
  'pr_wait_holds_slot',
  'serial_lanes',
  'serial_lane_count',
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed',
  'session_defaults_migration',
  'slots',
  'queue',
  'serial',
  'parallel',
  'pr_wait',
  'done',
  // Transient by contract (UI-jaua §5.1). Listed so a value that somehow
  // reached disk is DROPPED on load instead of round-tripping as opaque data.
  'disarmed_on_load',
  'attempts',
  'admission',
  'cleanup_failed',
  'merge_queue',
  'auto_merge',
  'auto_merge_skips',
  'completion_intents',
  'discard_operations',
  'merge_policy',
  'drift_policy',
  'worker_runner',
  'review_model',
  'ship_failure',
  // Legacy-drop key: the workspace auto-repair toggle retired with the AI
  // repair lane (UI-s582 §1). Listed so a stored value is DROPPED on load
  // instead of round-tripping as opaque data.
  'auto_repair',
  'repo_ops_opt_out',
  'repo_operations',
  'manual_deploy_seq',
  'repo_operation_migration'
]);

/**
 * @param {number} count
 * @returns {SerialLane[]}
 */
function emptySerialLanes(count) {
  /** @type {SerialLane[]} */
  const lanes = [];
  for (let i = 0; i < count; i += 1) {
    lanes.push({ id: `s${i + 1}`, entries: [] });
  }
  return lanes;
}

/**
 * @returns {Queue}
 */
function emptyQueue() {
  return {
    revision: 0,
    auto_advance: false,
    orchestration_model: null,
    orchestration_effort: null,
    orchestration_speed: null,
    session_defaults_migration: null,
    slots: DEFAULT_SLOTS,
    queue: [],
    serial_lanes: emptySerialLanes(DEFAULT_SERIAL_LANE_COUNT),
    serial_lane_count: DEFAULT_SERIAL_LANE_COUNT,
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
    repo_ops_opt_out: { verify: false, deploy: false },
    repo_operations: {},
    manual_deploy_seq: 0,
    repo_operation_migration: null
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
    settled_at,
    dispatch_head_sha:
      typeof value.dispatch_head_sha === 'string'
        ? value.dispatch_head_sha
        : '',
    base_ref: typeof value.base_ref === 'string' ? value.base_ref : '',
    head_ref: typeof value.head_ref === 'string' ? value.head_ref : ''
  };
}

const SHA40_RE = /^[0-9a-f]{40}$/i;

/**
 * The dispatch identity BOTH `resolution` write paths must carry (UI-p49g
 * §3.1): `bindResolutionWait` and `appendResolutionAttempt`. A binding that
 * cannot name the exact head, base branch, and head branch it was dispatched
 * against cannot be judged when the item comes back dirty, so the write is
 * refused rather than persisted half-identified.
 *
 * @param {{ dispatch_head_sha?: unknown, base_ref?: unknown, head_ref?: unknown }} input
 * @returns {{ dispatch_head_sha: string, base_ref: string, head_ref: string }|null}
 */
function resolutionDispatchIdentity(input) {
  const { dispatch_head_sha, base_ref, head_ref } = input;
  if (
    typeof dispatch_head_sha !== 'string' ||
    !SHA40_RE.test(dispatch_head_sha) ||
    typeof base_ref !== 'string' ||
    base_ref.length === 0 ||
    typeof head_ref !== 'string' ||
    head_ref.length === 0
  ) {
    return null;
  }
  return { dispatch_head_sha, base_ref, head_ref };
}

/** Queue-owned runtime capability projected by health and Worker snapshots. */
export const MANUAL_MERGE_CONTINUATION = Object.freeze({
  schema_version: 2
});

/**
 * @param {unknown} value
 * @returns {MergeAuthority|null}
 */
function normalizeMergeAuthority(value) {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    value.id.length === 0 ||
    (value.source !== 'manual' && value.source !== 'automatic') ||
    typeof value.granted_at !== 'number' ||
    !Number.isFinite(value.granted_at) ||
    typeof value.requested_head_sha !== 'string' ||
    !SHA40_RE.test(value.requested_head_sha) ||
    typeof value.target_base !== 'string' ||
    value.target_base.length === 0
  ) {
    return null;
  }
  /** @type {MergeAuthority} */
  const authority = {
    id: value.id,
    source: value.source,
    granted_at: value.granted_at,
    requested_head_sha: value.requested_head_sha.toLowerCase(),
    target_base: value.target_base
  };
  // Only the one defined provenance survives, and only by being SET: an
  // unknown or missing `via` leaves the key absent rather than writing
  // `null`, so a legacy authority round-trips byte-identical.
  if (value.via === 'lane') {
    authority.via = 'lane';
  }
  return authority;
}

/**
 * @param {unknown} value
 * @returns {MergeHold|null}
 */
function normalizeMergeHold(value) {
  if (
    !isRecord(value) ||
    typeof value.reason !== 'string' ||
    value.reason.length === 0 ||
    typeof value.head_sha !== 'string' ||
    typeof value.since !== 'number' ||
    !Number.isFinite(value.since)
  ) {
    return null;
  }
  return {
    reason: value.reason,
    head_sha: value.head_sha.toLowerCase(),
    since: value.since
  };
}

/**
 * The states a retired `head_review` journal was in when its authority still
 * had somewhere to go (UI-d7fy §3.8). An entry loaded in one of them keeps its
 * authority and becomes a gate hold; `approved`/`failed` simply lose the field
 * and are re-judged by the gate.
 *
 * @type {Set<string>}
 */
const RETIRED_REVIEW_HOLD_STATES = new Set([
  'pending',
  'reviewing',
  'revising'
]);

/**
 * The hold a legacy `entry.head_review` migrates to (UI-d7fy §3.8). The field
 * itself is READ AND DISCARDED — never an error, never written back.
 *
 * @param {unknown} value
 * @param {MergeAuthority|null} authority
 * @returns {MergeHold|null}
 */
function retiredReviewHold(value, authority) {
  if (
    !authority ||
    !isRecord(value) ||
    !RETIRED_REVIEW_HOLD_STATES.has(String(value.state))
  ) {
    return null;
  }
  return {
    // The placeholder §3.8 names: the next `kick()` re-runs the gate and
    // replaces it with the reason that actually holds this head.
    reason: 'review_receipt_missing',
    head_sha:
      typeof value.head_sha === 'string' && SHA40_RE.test(value.head_sha)
        ? value.head_sha.toLowerCase()
        : authority.requested_head_sha,
    since: Date.now()
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
    const authority = normalizeMergeAuthority(raw.authority);
    // A legacy `head_review` journal is read for its migration verdict only
    // (UI-d7fy §3.4/§3.8) and never round-trips.
    const hold =
      normalizeMergeHold(raw.hold) ??
      retiredReviewHold(raw.head_review, authority);
    out.push({
      bead_id: raw.bead_id,
      resolution_rounds:
        typeof raw.resolution_rounds === 'number' &&
        Number.isFinite(raw.resolution_rounds) &&
        raw.resolution_rounds > 0
          ? Math.floor(raw.resolution_rounds)
          : 0,
      rebase_rounds:
        typeof raw.rebase_rounds === 'number' &&
        Number.isFinite(raw.rebase_rounds) &&
        raw.rebase_rounds > 0
          ? Math.floor(raw.rebase_rounds)
          : 0,
      resolution: normalizeResolutionWait(raw.resolution),
      ...(continuation_action === null ? {} : { continuation_action }),
      ...(authority === null ? {} : { authority }),
      ...(hold === null ? {} : { hold })
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
        : null,
    serial_lane_id:
      typeof entry.serial_lane_id === 'string' &&
      serialLaneIndex(entry.serial_lane_id) !== null
        ? entry.serial_lane_id
        : undefined,
    // A blank or non-string value is ABSENT, not an arm: the scheduler's whole
    // test is "a non-empty lane id", so an empty string must never reach it.
    armed_by_lane:
      typeof entry.armed_by_lane === 'string' && entry.armed_by_lane.length > 0
        ? entry.armed_by_lane
        : undefined
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
    kind:
      value.kind === 'stale_work_backup_fresh'
        ? 'stale_work_backup_fresh'
        : 'discard',
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
    armed_by_lane:
      typeof fields.armed_by_lane === 'string' &&
      fields.armed_by_lane.length > 0
        ? fields.armed_by_lane
        : null,
    session_id: fields.session_id ?? null,
    model: fields.model ?? null,
    effort: fields.effort ?? null,
    observed_effort:
      typeof fields.observed_effort === 'string' &&
      fields.observed_effort.trim().length > 0
        ? fields.observed_effort
        : null,
    speed: typeof fields.speed === 'string' ? fields.speed : null,
    claude_account:
      typeof fields.claude_account === 'string' ? fields.claude_account : null,
    codex_account:
      typeof fields.codex_account === 'string' ? fields.codex_account : null,
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
    halted_auto_advance: fields.halted_auto_advance === true,
    usage: isRecord(fields.usage)
      ? /** @type {Attempt['usage']} */ (fields.usage)
      : null,
    usage_legs: normalizeUsageLegs(fields.usage_legs),
    delegation_sessions: normalizeDelegationSessions(
      fields.delegation_sessions
    ),
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
    workflow_mode_source_prior:
      typeof fields.workflow_mode_source_prior === 'string'
        ? fields.workflow_mode_source_prior
        : null,
    receipt_baseline: isRecord(fields.receipt_baseline)
      ? /** @type {Attempt['receipt_baseline']} */ (fields.receipt_baseline)
      : null,
    receipt_check: isRecord(fields.receipt_check)
      ? /** @type {Attempt['receipt_check']} */ (fields.receipt_check)
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
    forked_from_session_id:
      typeof fields.forked_from_session_id === 'string' &&
      fields.forked_from_session_id.length > 0
        ? fields.forked_from_session_id
        : null,
    conflict_resolution: fields.conflict_resolution === true,
    quickfix_lane: fields.quickfix_lane === true,
    quickfix_landing: isRecord(fields.quickfix_landing)
      ? clone(fields.quickfix_landing)
      : null,
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
    serial_lane_id:
      serialLaneIndex(fields.serial_lane_id) !== null
        ? /** @type {string} */ (fields.serial_lane_id)
        : null,
    completion_op_id:
      typeof fields.completion_op_id === 'string'
        ? fields.completion_op_id
        : null,
    completion_failure_key: normalizeCompletionFailureKey(
      fields.completion_failure_key
    ),
    kind:
      typeof fields.kind === 'string' && ATTEMPT_KINDS.includes(fields.kind)
        ? fields.kind
        : 'implementation',
    origin:
      fields.origin === 'click' || fields.origin === 'auto'
        ? fields.origin
        : null,
    reviewer_source:
      fields.reviewer_source === 'bead' || fields.reviewer_source === 'harness'
        ? fields.reviewer_source
        : null,
    authority_id:
      typeof fields.authority_id === 'string' && fields.authority_id.length > 0
        ? fields.authority_id
        : null,
    head_sha: isSha(fields.head_sha) ? fields.head_sha.toLowerCase() : null,
    log_path:
      typeof fields.log_path === 'string' && fields.log_path.length > 0
        ? fields.log_path.slice(0, COMPLETION_LOG_PATH_MAX)
        : null
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
 * Terminalize an attempt of a RETIRED lane on load (UI-d7fy §3.8).
 *
 * `makeAttempt` maps a kind the enum no longer names onto `implementation`,
 * which is the one reading that must never happen: a still-`running`
 * `head_review` record would come back as the bead's own implementation run
 * and hold its 실행중 slot forever — and so would a TERMINAL one, as the bead's
 * last implementation attempt showing an unhandled failure. So the unknown kind
 * is answered where it is read, and it is answered with the distinct kind
 * `retired_kind`, which `isImplementationAttempt` excludes: the record reaches
 * the terminal `retired_kind` its lane's removal makes it without ever passing
 * for an implementation run. A record that already settled keeps the history it
 * settled with; only its kind is answered.
 *
 * The process the running record names is the CALLER's to stop, and it is
 * still nameable afterwards: `pid`/`process_identity` survive this migration
 * untouched. {@link createQueueStore.pendingRetiredKindAttempts} is what hands
 * the caller that list.
 *
 * @param {Record<string, unknown>} value
 * @param {number} at
 * @returns {Record<string, unknown>}
 */
function migrateRetiredKind(value, at) {
  const kind = value.kind;
  if (
    typeof kind !== 'string' ||
    kind.length === 0 ||
    ATTEMPT_KINDS.includes(/** @type {any} */ (kind))
  ) {
    return value;
  }
  if (TERMINAL_ATTEMPT_STATUSES.has(String(value.status))) {
    return { ...value, kind: 'retired_kind' };
  }
  return {
    ...value,
    kind: 'retired_kind',
    status: 'failed',
    cause: 'retired_kind',
    control: null,
    finished_at: typeof value.finished_at === 'number' ? value.finished_at : at
  };
}

/**
 * The still-running attempts of a retired lane, read from the RAW record at
 * cold load (UI-d7fy §3.8). Held in memory only: the terminalization is part
 * of normalization, so nothing here has to be replayed — this list exists
 * solely to tell the caller which processes to stop.
 *
 * @typedef {Object} RetiredKindAttempt
 * @property {string} attempt_id
 * @property {string} bead_id
 * @property {string} kind - The retired kind the record carried.
 */

/**
 * @param {unknown} parsed - The raw parsed queue file.
 * @returns {RetiredKindAttempt[]}
 */
function planRetiredKindAttempts(parsed) {
  /** @type {RetiredKindAttempt[]} */
  const out = [];
  if (!isRecord(parsed) || !isRecord(parsed.attempts)) {
    return out;
  }
  for (const [attempt_id, raw] of Object.entries(parsed.attempts)) {
    if (
      !isRecord(raw) ||
      typeof raw.bead_id !== 'string' ||
      typeof raw.kind !== 'string' ||
      raw.kind.length === 0 ||
      ATTEMPT_KINDS.includes(/** @type {any} */ (raw.kind)) ||
      raw.status !== 'running'
    ) {
      continue;
    }
    out.push({ attempt_id, bead_id: raw.bead_id, kind: raw.kind });
  }
  return out;
}

/**
 * @param {unknown} value
 * @returns {RepoOperation['failure']}
 */
function normalizeRepoOperationFailure(value) {
  if (!isRecord(value) || typeof value.code !== 'string') {
    return null;
  }
  return {
    code: value.code,
    fingerprint: typeof value.fingerprint === 'string' ? value.fingerprint : '',
    detail: typeof value.detail === 'string' ? value.detail : '',
    interrupted: value.interrupted === true,
    ...(value.fetch_failure === 'timeout' || value.fetch_failure === 'nonzero'
      ? { fetch_failure: value.fetch_failure }
      : {}),
    ...(Number.isFinite(value.elapsed_ms) && Number(value.elapsed_ms) >= 0
      ? { elapsed_ms: Number(value.elapsed_ms) }
      : {})
  };
}

/**
 * Normalize optional retry evidence without changing RepoOperation schema 1.
 * A malformed object is retained only as a consumed marker so it can never
 * recreate retry eligibility after restart.
 *
 * @param {unknown} value
 * @param {unknown} state
 * @param {RepoOperation['failure']} failure
 * @returns {RepoOperation['retry']}
 */
function normalizeRepoOperationRetry(value, state, failure) {
  if (value === undefined || value === null) {
    return null;
  }
  if (!isRecord(value)) {
    return {
      first_failure: failure,
      first_fingerprint: failure?.fingerprint || null,
      first_failed_at: null,
      consumed_key: null,
      absorbed: null,
      outcome: 'consumed',
      blocked_reason: 'malformed'
    };
  }
  const first_failure =
    normalizeRepoOperationFailure(value.first_failure) || failure;
  const consumed_key =
    Array.isArray(value.consumed_key) &&
    value.consumed_key.length === 3 &&
    value.consumed_key.every((part) => typeof part === 'string')
      ? /** @type {[string, string, string]} */ ([...value.consumed_key])
      : null;
  const absorbed_raw = isRecord(value.absorbed) ? value.absorbed : null;
  const absorbed_failure = normalizeRepoOperationFailure(
    absorbed_raw?.first_failure
  );
  const absorbed =
    absorbed_raw &&
    absorbed_failure &&
    typeof absorbed_failure.code === 'string' &&
    typeof absorbed_raw.first_fingerprint === 'string' &&
    typeof absorbed_raw.at === 'number'
      ? {
          first_failure: absorbed_failure,
          first_fingerprint: absorbed_raw.first_fingerprint,
          at: absorbed_raw.at
        }
      : null;
  const valid_outcome = [
    'pending',
    'consumed',
    'not_applicable',
    'absorbed'
  ].includes(String(value.outcome));
  const malformed =
    !valid_outcome ||
    ((state === 'retry_pending' || consumed_key !== null) && !first_failure) ||
    (value.consumed_key !== null &&
      value.consumed_key !== undefined &&
      consumed_key === null) ||
    (value.absorbed !== null && value.absorbed !== undefined && !absorbed);
  return {
    first_failure,
    first_fingerprint:
      typeof value.first_fingerprint === 'string'
        ? value.first_fingerprint
        : first_failure?.fingerprint || null,
    first_failed_at:
      typeof value.first_failed_at === 'number' ? value.first_failed_at : null,
    consumed_key,
    absorbed,
    outcome: malformed
      ? 'consumed'
      : /** @type {NonNullable<RepoOperation['retry']>['outcome']} */ (
          value.outcome
        ),
    blocked_reason:
      malformed === true
        ? 'malformed'
        : typeof value.blocked_reason === 'string'
          ? value.blocked_reason
          : null
  };
}

/**
 * @param {unknown} value
 * @returns {RepoOperation|null}
 */
function normalizeRepoOperation(value) {
  if (
    !isRecord(value) ||
    value.schema !== 1 ||
    (value.kind !== 'verify' && value.kind !== 'deploy') ||
    typeof value.repo_id !== 'string' ||
    typeof value.effective_base_sha !== 'string' ||
    typeof value.target_base !== 'string' ||
    typeof value.script_mode !== 'string' ||
    typeof value.script_blob_sha !== 'string' ||
    ![
      'queued',
      'running',
      'succeeded',
      'failed',
      'repairing',
      'retry_pending'
    ].includes(String(value.state)) ||
    typeof value.attempt_id !== 'string'
  ) {
    return null;
  }
  const subjects = Array.isArray(value.subjects)
    ? value.subjects
        .filter(
          (subject) =>
            isRecord(subject) &&
            typeof subject.bead_id === 'string' &&
            isSha(subject.merged_sha)
        )
        .map((subject) => ({
          bead_id: String(subject.bead_id),
          merged_sha: String(subject.merged_sha).toLowerCase()
        }))
    : [];
  if (subjects.length === 0) {
    return null;
  }
  const provenance_raw = isRecord(value.bootstrap_provenance)
    ? value.bootstrap_provenance
    : null;
  const identity_raw = isRecord(value.process_identity)
    ? value.process_identity
    : null;
  const failure = normalizeRepoOperationFailure(value.failure);
  const retry = normalizeRepoOperationRetry(value.retry, value.state, failure);
  /** @type {string[]} */
  const verify_head_shas = [];
  for (const head_sha of [
    value.verify_head_sha,
    ...(Array.isArray(value.verify_head_shas) ? value.verify_head_shas : [])
  ]) {
    if (isSha(head_sha) && !verify_head_shas.includes(head_sha.toLowerCase())) {
      verify_head_shas.push(head_sha.toLowerCase());
    }
  }
  // `retry_pending` is a NON-TERMINAL state whose only exit needs the preserved
  // first failure: the reconcile either respawns from it or settles it. A record
  // in that state with no usable retry evidence can do neither, so it would sit
  // in `retry_pending` forever, invisible to the resolution ladder. Fail closed
  // by reading it as the terminal failure it actually is — the ladder then hands
  // it to a session like any other unresolved failure.
  const malformed_retry_pending =
    value.state === 'retry_pending' && (retry === null || !retry.first_failure);
  // The AI repair lane is retired (UI-s582 §1). A record persisted while a
  // repair session held it reads as the terminal failure it already was —
  // `repairing` was never anything but a `failed` row with a session attached,
  // and the session is gone.
  const retired_repairing = value.state === 'repairing';
  const state =
    malformed_retry_pending || retired_repairing ? 'failed' : value.state;
  // A terminal record must carry a failure or the ladder cannot see it as an
  // unresolved subject. Prefer whatever the record already had, then the
  // preserved first failure, and only then a deterministic stand-in that names
  // the malformed state rather than inventing a cause.
  const settled_failure =
    !malformed_retry_pending && !retired_repairing
      ? failure
      : failure ||
        retry?.first_failure || {
          code: malformed_retry_pending
            ? 'retry_pending_malformed'
            : 'repair_session_retired',
          fingerprint: '',
          detail: '',
          interrupted: false
        };
  return {
    schema: 1,
    repo_id: value.repo_id,
    kind: value.kind,
    subjects,
    effective_base_sha: value.effective_base_sha.toLowerCase(),
    target_base: value.target_base,
    target_sha: isSha(value.target_sha) ? value.target_sha.toLowerCase() : null,
    target_tree: isSha(value.target_tree)
      ? value.target_tree.toLowerCase()
      : null,
    verify_head_sha: isSha(value.verify_head_sha)
      ? value.verify_head_sha.toLowerCase()
      : null,
    verify_head_shas,
    deploy_worktree:
      typeof value.deploy_worktree === 'string' ? value.deploy_worktree : null,
    script_object_type:
      typeof value.script_object_type === 'string'
        ? value.script_object_type
        : 'blob',
    script_path:
      typeof value.script_path === 'string' ? value.script_path : null,
    script_mode: value.script_mode,
    script_blob_sha: value.script_blob_sha.toLowerCase(),
    state: /** @type {RepoOperation['state']} */ (state),
    attempt_id: value.attempt_id,
    requested_at:
      typeof value.requested_at === 'number' ? value.requested_at : 0,
    started_at: typeof value.started_at === 'number' ? value.started_at : null,
    finished_at:
      typeof value.finished_at === 'number' ? value.finished_at : null,
    process_identity:
      identity_raw &&
      Number.isInteger(identity_raw.pid) &&
      Number.isInteger(identity_raw.pgid) &&
      typeof identity_raw.started_at === 'number'
        ? {
            pid: Number(identity_raw.pid),
            pgid: Number(identity_raw.pgid),
            started_at: identity_raw.started_at
          }
        : null,
    log_path: typeof value.log_path === 'string' ? value.log_path : null,
    log_digest: typeof value.log_digest === 'string' ? value.log_digest : null,
    exit_code: Number.isInteger(value.exit_code)
      ? Number(value.exit_code)
      : null,
    signal: typeof value.signal === 'string' ? value.signal : null,
    failure: settled_failure,
    retry,
    superseded_by:
      typeof value.superseded_by === 'string' ? value.superseded_by : null,
    // Provenance of the request, not a state: only an exact `manual` marks the
    // 배포 실행 click, so an unreadable value reads as the Worker's own work.
    source: value.source === 'manual' ? 'manual' : 'automatic',
    manual_run_id:
      value.source === 'manual' && Number.isInteger(value.manual_run_id)
        ? Number(value.manual_run_id)
        : null,
    dismissed:
      isRecord(value.dismissed) &&
      typeof value.dismissed.at === 'number' &&
      typeof value.dismissed.by === 'string'
        ? { at: value.dismissed.at, by: value.dismissed.by }
        : null,
    bootstrap_provenance:
      provenance_raw &&
      typeof provenance_raw.approved_source_path === 'string' &&
      isSha(provenance_raw.approved_source_sha) &&
      typeof provenance_raw.requested_by === 'string' &&
      typeof provenance_raw.requested_at === 'number'
        ? {
            approved_source_path: provenance_raw.approved_source_path,
            approved_source_sha:
              provenance_raw.approved_source_sha.toLowerCase(),
            requested_by: provenance_raw.requested_by,
            requested_at: provenance_raw.requested_at
          }
        : null
  };
}

/**
 * A migration stamp is only honoured when it is fully readable: a damaged
 * record reads as "never migrated", which re-runs a migration that is
 * idempotent by construction rather than skipping a conversion forever.
 *
 * @param {unknown} value
 * @returns {RepoOperationMigration|null}
 */
function normalizeRepoOperationMigration(value) {
  if (
    !isRecord(value) ||
    !Number.isInteger(value.version) ||
    Number(value.version) < 1 ||
    typeof value.at !== 'number' ||
    !Number.isFinite(value.at) ||
    !isRecord(value.results)
  ) {
    return null;
  }
  /** @type {Record<string, RepoOperationMigrationResult>} */
  const results = {};
  for (const [bead_id, entry] of Object.entries(value.results)) {
    if (
      !isRecord(entry) ||
      typeof entry.disposition !== 'string' ||
      entry.disposition.length === 0 ||
      typeof entry.from_step !== 'string'
    ) {
      return null;
    }
    results[bead_id] = {
      bead_id,
      from_step: entry.from_step,
      from_reason:
        typeof entry.from_reason === 'string' ? entry.from_reason : '',
      subject_sha: isSha(entry.subject_sha)
        ? String(entry.subject_sha).toLowerCase()
        : null,
      subject_source:
        entry.subject_source === 'merge_sha' ||
        entry.subject_source === 'head_sha'
          ? entry.subject_source
          : null,
      target_base:
        typeof entry.target_base === 'string' && entry.target_base.length > 0
          ? entry.target_base
          : null,
      disposition: entry.disposition,
      reason: typeof entry.reason === 'string' ? entry.reason : null,
      evidence: isRecord(entry.evidence) ? entry.evidence : null,
      at: typeof entry.at === 'number' ? entry.at : 0
    };
  }
  return {
    version: Number(value.version),
    at: Number(value.at),
    results
  };
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
  // `pr_wait_holds_slot` has no destination field: the merge-serial toggle is
  // retired (UI-04vo §1) and the stored flag is DROPPED on load.
  // Resolved at CALL time, never at module load: the enum table is catalog-
  // derived and the catalog is a config-file input. A stored value the current
  // catalog no longer offers drops to null, exactly as the old `exec_defaults`
  // map did, so dispatch falls back rather than launching an unknown model.
  const orchestration_enums = execSettingEnums();
  for (const key of ORCHESTRATION_KEYS) {
    const value = raw[key];
    q[key] =
      typeof value === 'string' && orchestration_enums[key].includes(value)
        ? value
        : null;
  }
  if (
    isRecord(raw.session_defaults_migration) &&
    typeof raw.session_defaults_migration.version === 'number'
  ) {
    q.session_defaults_migration = {
      version: raw.session_defaults_migration.version,
      at:
        typeof raw.session_defaults_migration.at === 'number'
          ? raw.session_defaults_migration.at
          : 0
    };
  }
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
  // Serial lanes (UI-04vo §1). Single-membership invariant across the waiting
  // area: the parallel lane wins first, then lanes in slot order. Entries of a
  // lane beyond the stored count (crash or hand-edit residue) RETURN to the
  // parallel tail rather than being dropped — the migration must not lose
  // beads.
  q.serial_lane_count =
    normalizeSerialLaneCount(raw.serial_lane_count) ??
    DEFAULT_SERIAL_LANE_COUNT;
  /** @type {Map<string, QueueEntry[]>} */
  const stored_lanes = new Map();
  /** @type {QueueEntry[]} */
  const orphan_entries = [];
  if (Array.isArray(raw.serial_lanes)) {
    for (const lane of raw.serial_lanes) {
      if (!isRecord(lane)) {
        continue;
      }
      const index = serialLaneIndex(lane.id);
      const entries = normalizeLane(lane.entries);
      if (
        index !== null &&
        index < q.serial_lane_count &&
        !stored_lanes.has(String(lane.id))
      ) {
        stored_lanes.set(String(lane.id), entries);
      } else {
        orphan_entries.push(...entries);
      }
    }
  }
  const lane_members = new Set(q.queue.map((e) => e.bead_id));
  q.serial_lanes = emptySerialLanes(q.serial_lane_count);
  for (const lane of q.serial_lanes) {
    for (const entry of stored_lanes.get(lane.id) || []) {
      if (!lane_members.has(entry.bead_id)) {
        lane_members.add(entry.bead_id);
        lane.entries.push(entry);
      }
    }
  }
  for (const entry of orphan_entries) {
    if (!lane_members.has(entry.bead_id)) {
      lane_members.add(entry.bead_id);
      q.queue.push(entry);
    }
  }
  if (isRecord(raw.attempts)) {
    for (const [key, value] of Object.entries(raw.attempts)) {
      if (isRecord(value) && typeof value.bead_id === 'string') {
        q.attempts[key] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...migrateRetiredKind(migrateLegacyStopped(value), Date.now()),
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
        const stale_work = normalizeStaleWork(value.stale_work);
        if (stale_work !== null) {
          q.admission[bead_id].stale_work = stale_work;
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
        if (typeof value.failure_code === 'string') {
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
          value.fetch_failure === 'timeout' ||
          value.fetch_failure === 'nonzero'
        ) {
          q.cleanup_failed[bead_id].fetch_failure = value.fetch_failure;
        }
        if (
          Number.isFinite(value.elapsed_ms) &&
          Number(value.elapsed_ms) >= 0
        ) {
          q.cleanup_failed[bead_id].elapsed_ms = Number(value.elapsed_ms);
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
  // 부재·비객체·비불리언은 모두 '실행'으로 읽는다: opt-out은 사용자가 명시적으로
  // 켠 설정이며, 읽을 수 없는 값이 게이트를 건너뛰게 만들어서는 안 된다.
  q.repo_ops_opt_out = {
    verify: isRecord(raw.repo_ops_opt_out)
      ? raw.repo_ops_opt_out.verify === true
      : false,
    deploy: isRecord(raw.repo_ops_opt_out)
      ? raw.repo_ops_opt_out.deploy === true
      : false
  };
  if (isRecord(raw.repo_operations)) {
    for (const [operation_id, operation] of Object.entries(
      raw.repo_operations
    )) {
      const normalized = normalizeRepoOperation(operation);
      if (normalized) {
        q.repo_operations[operation_id] = normalized;
      }
    }
  }
  // A counter that cannot be read restarts at 0. It only has to be monotonic
  // WITHIN the live sequence of clicks it disambiguates, and a fresh record for
  // an id that already exists is refused rather than silently adopted.
  q.manual_deploy_seq =
    Number.isInteger(raw.manual_deploy_seq) && Number(raw.manual_deploy_seq) > 0
      ? Number(raw.manual_deploy_seq)
      : 0;
  q.repo_operation_migration = normalizeRepoOperationMigration(
    raw.repo_operation_migration
  );
  // auto_advance intentionally left false — see load() restart-safety note.
  return q;
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
 * Resolve a waiting-lane name to its live entries array, or null when the
 * name is unknown or points at a serial slot beyond the configured count. An
 * absent/`'parallel'` lane is the parallel queue, so stale lane-less clients
 * keep working.
 *
 * @param {Queue} q
 * @param {unknown} lane
 * @returns {QueueEntry[]|null}
 */
function waitingLaneEntries(q, lane) {
  if (lane === undefined || lane === null || lane === 'parallel') {
    return q.queue;
  }
  const index = serialLaneIndex(lane);
  if (index === null || index >= q.serial_lane_count) {
    return null;
  }
  return q.serial_lanes[index].entries;
}

/**
 * Rebind a bead's lineage to the waiting lane it now sits in (UI-04vo §2).
 *
 * A bead stays in its lane for the whole life of its attempt, so occupancy and
 * placement normally agree. They can only disagree when a human MOVES a bead
 * whose lineage is still holding a lane — dragging a failed bead to another
 * lane, or out of the waiting area entirely. Without this rebind the old lane
 * would stay occupied by an attempt whose bead has left, and nothing could ever
 * release it: the release events (merge cleanup, discard) fire against the
 * bead's CURRENT work, not the abandoned record.
 *
 * Only non-releasing attempts are rebound — a `done`/`stopped`/`discarded`
 * record is history and its lane snapshot stays as it was.
 *
 * @param {Queue} q
 * @param {string} bead_id
 * @param {string|null} lane_id - New lane, or null when leaving serial lanes.
 */
function rebindLineageLane(q, bead_id, lane_id) {
  for (const attempt of Object.values(q.attempts)) {
    if (
      attempt.bead_id === bead_id &&
      // Lane membership belongs to the implementation lineage only (UI-hk74
      // §7): a head review that happens to be running is not what occupies a
      // serial lane, and stamping it would make the lane look busy after the
      // implementation attempt released it.
      (attempt.kind ?? 'implementation') === 'implementation' &&
      !LANE_RELEASING_ATTEMPT_STATUSES.has(String(attempt.status))
    ) {
      attempt.serial_lane_id = lane_id;
    }
  }
}

/**
 * Apply the blocks correction to one serial lane's durable order (UI-04vo §3).
 *
 * The correction has to land on the STORED order, not only on the snapshot
 * projection: head selection reads `entries[0]`, so a lane whose blocker sits
 * behind its blockee would pick a permanently blocked head and stall forever.
 * A cycle disables the correction (fail-visible in the UI) rather than
 * inventing an order.
 *
 * @param {Queue} q
 * @param {unknown} lane
 * @param {{ blocker: string, blockee: string }[]|undefined} blocks_edges
 */
function applyLaneBlocksOrder(q, lane, blocks_edges) {
  const index = serialLaneIndex(lane);
  if (index === null || index >= q.serial_lane_count) {
    return;
  }
  const target = q.serial_lanes[index];
  const topo = orderLaneByBlocks(
    target.entries.map((e) => e.bead_id),
    Array.isArray(blocks_edges) ? blocks_edges : []
  );
  if (topo.cycle) {
    return;
  }
  const by_id = new Map(target.entries.map((e) => [e.bead_id, e]));
  target.entries = topo.order.map(
    (bead_id) => /** @type {QueueEntry} */ (by_id.get(bead_id))
  );
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
  for (const lane of q.serial_lanes) {
    lane.entries = lane.entries.filter((e) => e.bead_id !== bead_id);
  }
  q.pr_wait = q.pr_wait.filter((e) => e.bead_id !== bead_id);
  q.done = q.done.filter((e) => e.bead_id !== bead_id);
  q.merge_queue = q.merge_queue.filter((e) => e.bead_id !== bead_id);
  // The auto-merge exclusion describes a `pr_wait` member (UI-yk55 §3.2.1): a
  // bead that merged, was discarded, or was dragged back out of the lane carries
  // no exclusion into whatever happens to it next.
  delete q.auto_merge_skips[bead_id];
}

/**
 * @param {Queue} q
 * @param {string} bead_id
 */
function hasActiveDiscardOperation(q, bead_id) {
  return Object.values(q.discard_operations).some(
    (operation) => operation.bead_id === bead_id && operation.phase !== 'done'
  );
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
    q.serial_lanes.some((lane) =>
      lane.entries.some((e) => e.bead_id === bead_id)
    ) ||
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
  const parked = intent.paused_resolution;
  if (parked) {
    // The OFF boundary parked a live resolution, so resuming restores it
    // verbatim — same class, same attempts, same schedule. A pause that handed
    // back a fresh budget would be an unbounded retry ladder with extra steps.
    intent.auto_resolution = parked;
    intent.paused_resolution = null;
    intent.phase = COMPLETION_AUTO_RESOLUTION_PHASE[parked.class];
  } else {
    intent.phase = intent.subject.merged_sha === null ? 'gating' : 'cleaning';
  }
  if (!next.merge_queue.some((entry) => entry.bead_id === root_bead_id)) {
    insertRunnableMergeEntry(next, {
      bead_id: root_bead_id,
      resolution_rounds: 0,
      rebase_rounds: 0,
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
  intent.auto_resolution = null;
  intent.paused_resolution = null;
  intent.terminal_reason = null;
}

/**
 * Create a Worker queue store. A single instance is shared server-wide so all
 * connections (and thus all clients dragging concurrently) observe one coherent
 * in-memory revision, making the CAS authoritative in-process.
 *
 * @param {{ now?: () => number, randomUUID?: () => string, filePathFor?: (workspace: string) => string, fs?: typeof import('node:fs'), delegationStore?: ReturnType<typeof import('./delegation-store.js').createDelegationStore> }} [options]
 */
export function createQueueStore(options = {}) {
  const now = options.now || (() => Date.now());
  const randomUUID = options.randomUUID || (() => nodeCrypto.randomUUID());
  const filePathFor = options.filePathFor || queueFilePath;
  const fs = options.fs || nodeFs;
  /**
   * The process-wide live subagent tally (UI-2mpn §5.2), when one is wired. A
   * Claude subagent has no receipt file to scan, so terminal settlement is the
   * only moment its sessions and receipts can become durable.
   *
   * @type {ReturnType<typeof import('./delegation-store.js').createDelegationStore>|null}
   */
  const delegation_store = options.delegationStore || null;

  /**
   * Provenance fields for a row the automatic enroller queues. An automatic
   * authority exists so the driver can tell enrolment provenance apart from a
   * manual click — a row whose head or base the enroller could not read gets
   * no authority at all and behaves like a legacy entry.
   *
   * @param {unknown} head_sha
   * @param {unknown} target_base
   * @returns {{ authority: MergeAuthority }|{}}
   */
  function automaticAuthorityFields(head_sha, target_base) {
    if (
      typeof head_sha !== 'string' ||
      !SHA40_RE.test(head_sha) ||
      typeof target_base !== 'string' ||
      target_base.length === 0
    ) {
      return {};
    }
    return {
      authority: {
        id: randomUUID(),
        source: 'automatic',
        granted_at: now(),
        requested_head_sha: head_sha.toLowerCase(),
        target_base
      }
    };
  }

  /** @type {Map<string, Queue>} */
  const cache = new Map();
  /**
   * Repair-lane sagas this process's cold load withheld, per workspace
   * (UI-8w4t §2). In memory only, and emptied one root at a time by
   * {@link retireRepairLane}.
   *
   * @type {Map<string, RepairLaneRetirement[]>}
   */
  const repair_lane_retirements = new Map();
  /**
   * Retired-lane attempts this process's cold load terminalized, per workspace
   * (UI-d7fy §3.8). In memory only: the durable half already happened in
   * normalization, so this is just the list of processes the caller still owes
   * a stop.
   *
   * @type {Map<string, RetiredKindAttempt[]>}
   */
  const retired_kind_attempts = new Map();
  /** @type {Map<string, boolean>} */
  const auto_advance_at_shutdown = new Map();
  /**
   * Cross-lane ids this process's cold load disarmed, per workspace (UI-jaua
   * §5.1). Process-lifetime only — it is deliberately NOT part of the cached
   * queue, so no mutation can flush it to disk.
   *
   * @type {Map<string, Set<string>>}
   */
  const disarmed_on_load = new Map();

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
    let persisted_auto_advance = false;
    /** @type {RepairLaneRetirement[]} */
    let retirements = [];
    /** @type {RetiredKindAttempt[]} */
    let retired_kinds = [];
    try {
      const raw = fs.readFileSync(filePathFor(workspace), 'utf8');
      const parsed = JSON.parse(raw);
      persisted_auto_advance =
        Boolean(parsed) &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed) &&
        /** @type {any} */ (parsed).auto_advance === true;
      retirements = planRepairLaneRetirements(parsed);
      retired_kinds = planRetiredKindAttempts(parsed);
      q = normalizeQueue(parsed);
    } catch {
      q = emptyQueue();
      retirements = [];
      retired_kinds = [];
    }
    repair_lane_retirements.set(key, retirements);
    retired_kind_attempts.set(key, retired_kinds);
    auto_advance_at_shutdown.set(key, persisted_auto_advance);
    // Restart safety defaults OFF; only the verified self-deploy path may restore it.
    q.auto_advance = false;
    // Same reason, same place (UI-jaua §5.1): the server did not watch what
    // happened while it was down, so no cross lane keeps dispatching across a
    // restart. Both lanes are swept — the `pr_wait` row carries the arm that
    // the merge registration reads. The cleared ids are remembered in memory so
    // the lane can say WHY it stopped instead of looking never-started.
    /** @type {Set<string>} */
    const disarmed = new Set();
    for (const entry of [...q.queue, ...q.pr_wait]) {
      if (
        typeof entry.armed_by_lane === 'string' &&
        entry.armed_by_lane.length > 0
      ) {
        disarmed.add(entry.armed_by_lane);
      }
      delete entry.armed_by_lane;
    }
    disarmed_on_load.set(key, disarmed);
    cache.set(key, q);
    return q;
  }

  /**
   * Clone a queue for a consumer OUTSIDE the store and attach the transient
   * `disarmed_on_load` set (UI-jaua §5.1). Every exported snapshot goes through
   * here; the cached queue never carries the field, so {@link persist} cannot
   * write it.
   *
   * @param {string} workspace
   * @param {Queue} q
   * @returns {Queue}
   */
  function exportQueue(workspace, q) {
    const out = clone(q);
    out.disarmed_on_load = [
      ...(disarmed_on_load.get(keyFor(workspace)) || new Set())
    ];
    return out;
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
    fs.writeFileSync(tmp, JSON.stringify(serializable(workspace, q), null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * The payload {@link persist} writes: the queue, plus every still-withheld
   * repair-lane record exactly as it was read (UI-8w4t §2).
   *
   * The §2 order says the session dies BEFORE the keys that name it are
   * dropped. The withheld records are absent from the in-memory snapshot, so
   * any unrelated write between cold load and retirement would drop them from
   * DISK first and break that order. Merging here — at serialization only —
   * keeps the snapshot clean while the file keeps naming the live session.
   *
   * Merged ONLY when the root has no record in `q` yet: {@link retireRepairLane}
   * writes the terminal record and empties its pending entry AFTERWARDS, so an
   * unconditional merge would overwrite the retirement with the very record it
   * just retired and replan it forever. A root the queue has re-created (a
   * human re-clicked [머지]) is likewise the newer truth.
   *
   * @param {string} workspace
   * @param {Queue} q
   * @returns {unknown}
   */
  function serializable(workspace, q) {
    const pending = repair_lane_retirements.get(keyFor(workspace)) || [];
    if (pending.length === 0) {
      return q;
    }
    /** @type {Record<string, unknown>} */
    const intents = { ...q.completion_intents };
    let merged = false;
    for (const plan of pending) {
      if (
        plan.raw_intent === undefined ||
        Object.hasOwn(intents, plan.root_bead_id)
      ) {
        continue;
      }
      intents[plan.root_bead_id] = plan.raw_intent;
      merged = true;
    }
    return merged ? { ...q, completion_intents: intents } : q;
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
      return { ok: false, conflict: true, queue: exportQueue(workspace, cur) };
    }
    const next = clone(cur);
    if (!mutate(next)) {
      return { ok: false, conflict: false, queue: exportQueue(workspace, cur) };
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return { ok: true, conflict: false, queue: exportQueue(workspace, next) };
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
      return { ok: false, conflict: false, queue: exportQueue(workspace, cur) };
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return { ok: true, conflict: false, queue: exportQueue(workspace, next) };
  }

  /**
   * Fold the terminal receipt scan into the SAME queue mutation that settles an
   * attempt. Files stay untouched until that atomic write succeeds, so a queue
   * persistence failure is retried from the inbox rather than losing evidence.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {Partial<Attempt>} patch
   * @returns {{ patch: Partial<Attempt>, files: string[], drain?: { workspace: string, attempt_id: string } }}
   */
  function terminalReceiptPatch(workspace, attempt_id, patch) {
    const current = ensureLoaded(workspace).attempts[attempt_id];
    if (!current) {
      return { patch, files: [] };
    }
    /** @type {{ legs: UsageLeg[], files: string[], warnings: string[] }} */
    let scanned_receipts = { legs: [], files: [], warnings: [] };
    let receipts_read = false;
    try {
      scanned_receipts = readAttemptUsageReceipts(workspace, attempt_id, {
        known_legs: current.usage_legs
      });
      receipts_read = true;
    } catch {
      // Terminal settlement still persists without optional receipt evidence.
    }
    /** @type {DelegationSession[]} */
    let scanned_sessions = [];
    try {
      scanned_sessions = readAttemptDelegationStreams(workspace, attempt_id, {
        known_sessions: current.delegation_sessions
      }).sessions;
    } catch {
      // Terminal settlement still persists without optional monitor evidence.
    }
    // The live Claude subagent state joins the same two lists (UI-2mpn §5.4).
    // Dropping the entry is DEFERRED to `consumeTerminalReceipts`, on the same
    // contract as the receipt files above: a subagent has no inbox file to
    // rescan, so clearing before the persist succeeds would be the one way its
    // evidence is lost for good.
    const live_delegations = delegation_store
      ? delegation_store.get(workspace, attempt_id)
      : { sessions: [], legs: [] };
    return {
      ...(delegation_store ? { drain: { workspace, attempt_id } } : {}),
      patch: {
        ...patch,
        ...(receipts_read || live_delegations.legs.length > 0
          ? {
              usage_legs: normalizeUsageLegs([
                ...(Array.isArray(current.usage_legs)
                  ? current.usage_legs
                  : []),
                ...scanned_receipts.legs,
                ...live_delegations.legs
              ])
            }
          : {}),
        // Scanned first: `normalizeDelegationSessions` keeps the FIRST record
        // per launch_id, and a re-settlement's durable copy is the stale one.
        // The reader already dropped any scanned session that conflicts with
        // its durable twin, so whatever survives here is strictly fresher —
        // which is what lets a legacy record without `effort` pick the value up
        // from a re-observed stream. Matches the terminal recovery path's order.
        delegation_sessions: finalizeDelegationSessions(
          [
            ...live_delegations.sessions,
            ...scanned_sessions,
            ...(Array.isArray(current.delegation_sessions)
              ? current.delegation_sessions
              : [])
          ],
          true
        )
      },
      files: scanned_receipts.files
    };
  }

  /**
   * Release the terminal evidence a settled attempt no longer needs — but only
   * once the queue mutation that recorded it actually persisted. A failed write
   * keeps both halves: the inbox files for the next scan, and the live
   * delegation entry, which is the ONLY copy a Claude subagent has.
   *
   * @param {QueueOpResult} result
   * @param {string[]} files
   * @param {{ workspace: string, attempt_id: string }} [drain]
   */
  function consumeTerminalReceipts(result, files, drain) {
    if (!result.ok) {
      return;
    }
    if (files.length > 0) {
      consumeUsageReceiptFiles(files);
    }
    if (drain && delegation_store) {
      delegation_store.clearAttempt(drain.workspace, drain.attempt_id);
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
      return exportQueue(workspace, ensureLoaded(workspace));
    },

    /**
     * Current in-memory snapshot (loads on first access).
     *
     * @param {string} workspace
     * @returns {Queue}
     */
    snapshot(workspace) {
      return exportQueue(workspace, ensureLoaded(workspace));
    },

    /**
     * Read the process-local pre-restart auto-advance snapshot.
     *
     * @param {string} workspace
     */
    autoAdvanceAtShutdown(workspace) {
      ensureLoaded(workspace);
      return auto_advance_at_shutdown.get(keyFor(workspace)) === true;
    },

    /**
     * Consume the process-local pre-restart auto-advance snapshot.
     *
     * @param {string} workspace
     */
    consumeAutoAdvanceAtShutdown(workspace) {
      return auto_advance_at_shutdown.delete(keyFor(workspace));
    },

    /**
     * Place a bead into a waiting lane at an index, removing it from every
     * other lane (single-membership invariant). CAS-guarded. `lane` names the
     * parallel lane (`'parallel'`, or absent for stale clients) or an active
     * serial lane (`'s1'`..); an unknown lane or a slot beyond the configured
     * count is REJECTED without a write.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, lane?: string, index?: number, blocks_edges?: { blocker: string, blockee: string }[] }} input
     * @returns {QueueOpResult}
     */
    place(workspace, input) {
      const { expected_revision, bead_id, lane, index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        if (hasActiveDiscardOperation(next, bead_id)) {
          return false;
        }
        if (waitingLaneEntries(next, lane) === null) {
          return false;
        }
        removeFromLanes(next, bead_id);
        const arr = /** @type {QueueEntry[]} */ (
          waitingLaneEntries(next, lane)
        );
        arr.splice(
          clampIndex(index ?? arr.length, arr.length),
          0,
          makeQueueEntry(bead_id, now())
        );
        rebindLineageLane(
          next,
          bead_id,
          serialLaneIndex(lane) === null ? null : String(lane)
        );
        applyLaneBlocksOrder(next, lane, input.blocks_edges);
        return true;
      });
    },

    /**
     * Reorder a bead within one waiting lane. CAS-guarded. A bead absent from
     * the named lane is REJECTED — cross-lane moves go through {@link place}.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, lane?: string, to_index: number, blocks_edges?: { blocker: string, blockee: string }[] }} input
     * @returns {QueueOpResult}
     */
    reorder(workspace, input) {
      const { expected_revision, bead_id, lane, to_index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (hasActiveDiscardOperation(next, bead_id)) {
          return false;
        }
        const arr = waitingLaneEntries(next, lane);
        if (arr === null) {
          return false;
        }
        const from = arr.findIndex((e) => e.bead_id === bead_id);
        if (from < 0) {
          return false;
        }
        const [entry] = arr.splice(from, 1);
        arr.splice(clampIndex(to_index, arr.length), 0, entry);
        applyLaneBlocksOrder(next, lane, input.blocks_edges);
        return true;
      });
    },

    /**
     * Arm parallel-queue rows for a cross lane (UI-jaua §5.1/§5.3). CAS-guarded
     * like every other client op.
     *
     * Bead ids that are not in this workspace's parallel queue are IGNORED, not
     * rejected: one `▶ 진행` fans out over the repos a lane spans, and each
     * repo's op names the whole membership. Rejecting here would make a lane
     * whose members are split across repos fail in every repo but one.
     *
     * The lane's existence is deliberately NOT validated — `cross-lanes.json`
     * is server-global and this store is per-workspace (§5.3). A successful arm
     * also drops the lane from {@link Queue.disarmed_on_load}: the user just
     * answered the restart the flag was reporting.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_ids: string[], lane_id: string }} input
     * @returns {QueueOpResult}
     */
    arm(workspace, input) {
      const { expected_revision, bead_ids, lane_id } = input;
      if (
        typeof lane_id !== 'string' ||
        lane_id.length === 0 ||
        !Array.isArray(bead_ids)
      ) {
        return {
          ok: false,
          conflict: false,
          queue: exportQueue(workspace, ensureLoaded(workspace))
        };
      }
      const targets = new Set(
        bead_ids.filter((id) => typeof id === 'string' && id.length > 0)
      );
      const result = applyMutation(workspace, expected_revision, (next) => {
        // Both lanes, symmetric with `disarm` — the arm rides the PR-wait
        // transition (§5.1), so a member that was ALREADY waiting for its PR
        // when the process restarted lives only there. Sweeping the parallel
        // queue alone would clear the restart badge (below) while leaving that
        // member unarmed forever, and its merge registration would never
        // resume.
        for (const entry of [...next.queue, ...next.pr_wait]) {
          if (targets.has(entry.bead_id)) {
            entry.armed_by_lane = lane_id;
          }
        }
        return true;
      });
      if (result.ok) {
        disarmed_on_load.get(keyFor(workspace))?.delete(lane_id);
        return {
          ...result,
          queue: exportQueue(workspace, ensureLoaded(workspace))
        };
      }
      return result;
    },

    /**
     * Clear the cross-lane arm from rows of this workspace (UI-jaua §5.3).
     * CAS-guarded. `bead_ids` names the rows; `lane_id` alone clears every row
     * armed to that lane here. Both lanes are swept, because the arm rides the
     * `pr_wait` row too (§5.1). Attempt snapshots are history and stay.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_ids?: string[], lane_id?: string }} input
     * @returns {QueueOpResult}
     */
    disarm(workspace, input) {
      const { expected_revision, bead_ids, lane_id } = input;
      const has_ids = Array.isArray(bead_ids);
      const has_lane = typeof lane_id === 'string' && lane_id.length > 0;
      if (!has_ids && !has_lane) {
        return {
          ok: false,
          conflict: false,
          queue: exportQueue(workspace, ensureLoaded(workspace))
        };
      }
      const targets = has_ids
        ? new Set(
            /** @type {string[]} */ (bead_ids).filter(
              (id) => typeof id === 'string' && id.length > 0
            )
          )
        : null;
      return applyMutation(workspace, expected_revision, (next) => {
        for (const entry of [...next.queue, ...next.pr_wait]) {
          const named = targets
            ? targets.has(entry.bead_id)
            : entry.armed_by_lane === lane_id;
          if (named) {
            delete entry.armed_by_lane;
          }
        }
        return true;
      });
    },

    /**
     * Disarm ONE waiting row after its session failed (UI-jaua §5.5).
     * Scheduler-owned (no CAS), and scoped to the parallel queue of THIS
     * workspace: the scheduler is a per-workspace writer, so it must not reach
     * across repos to the lane's other members. It does not need to — the bd
     * dependency gate already holds the followers back while the failed member
     * stays open. No-op (no revision bump) when the row is not armed.
     *
     * @param {string} workspace
     * @param {{ bead_id: string }} input
     * @returns {QueueOpResult}
     */
    disarmEntry(workspace, input) {
      const { bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        const entry = next.queue.find((e) => e.bead_id === bead_id);
        if (!entry || typeof entry.armed_by_lane !== 'string') {
          return false;
        }
        delete entry.armed_by_lane;
        return true;
      });
    },

    /**
     * Resize the fixed serial-lane set (UI-04vo §1). CAS-guarded. Truncated
     * lanes RETURN their waiting entries to the parallel tail in lane order —
     * shrinking never loses beads. Active lineages are untouched: occupancy
     * lives on attempts, not on waiting entries.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, count: unknown }} input
     * @returns {QueueOpResult}
     */
    setSerialLaneCount(workspace, input) {
      const { expected_revision, count } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const value = normalizeSerialLaneCount(count);
        if (value === null) {
          return false;
        }
        if (value < next.serial_lanes.length) {
          const removed = next.serial_lanes.slice(value);
          next.serial_lanes = next.serial_lanes.slice(0, value);
          for (const lane of removed) {
            next.queue.push(...lane.entries);
          }
        }
        while (next.serial_lanes.length < value) {
          next.serial_lanes.push({
            id: `s${next.serial_lanes.length + 1}`,
            entries: []
          });
        }
        next.serial_lane_count = value;
        return true;
      });
    },

    /**
     * Move an analysis-recommended group into one serial lane in a SINGLE CAS
     * (UI-04vo §9). All-or-nothing by construction: every membership,
     * activity, lane, and size check runs on the same clone the write lands
     * on, and one failure rejects the whole mutation without a revision bump —
     * there is no partial application and no second write to undo.
     *
     * Placement appends after the lane's existing entries in submit order, and
     * the blocks correction ({@link orderLaneByBlocks}) is the FINAL order:
     * a user-submitted sequence never overrides a hard dependency.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, lane: string, ordered_bead_ids: string[], blocks_edges?: { blocker: string, blockee: string }[] }} input
     * @returns {QueueOpResult & { reason?: string }}
     */
    applySerialGroup(workspace, input) {
      const { expected_revision, lane, ordered_bead_ids } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyMutation(workspace, expected_revision, (next) => {
        const index = serialLaneIndex(lane);
        if (index === null || index >= next.serial_lane_count) {
          reason = 'lane_invalid';
          return false;
        }
        if (!Array.isArray(ordered_bead_ids) || ordered_bead_ids.length < 2) {
          reason = 'group_size';
          return false;
        }
        if (new Set(ordered_bead_ids).size !== ordered_bead_ids.length) {
          reason = 'duplicate_member';
          return false;
        }
        const active = new Set();
        for (const attempt of Object.values(next.attempts)) {
          if (!TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status))) {
            active.add(attempt.bead_id);
          }
        }
        for (const entry of next.pr_wait) {
          active.add(entry.bead_id);
        }
        for (const operation of Object.values(next.discard_operations)) {
          if (operation.phase !== 'done') {
            active.add(operation.bead_id);
          }
        }
        for (const bead_id of ordered_bead_ids) {
          const queued =
            next.queue.some((e) => e.bead_id === bead_id) ||
            next.serial_lanes.some((entry_lane) =>
              entry_lane.entries.some((e) => e.bead_id === bead_id)
            );
          if (!queued) {
            reason = 'member_absent';
            return false;
          }
          if (active.has(bead_id)) {
            reason = 'member_active';
            return false;
          }
        }
        const added_at = now();
        for (const bead_id of ordered_bead_ids) {
          removeFromLanes(next, bead_id);
        }
        const target = next.serial_lanes[index];
        for (const bead_id of ordered_bead_ids) {
          target.entries.push(makeQueueEntry(bead_id, added_at));
          rebindLineageLane(next, bead_id, String(lane));
        }
        applyLaneBlocksOrder(next, lane, input.blocks_edges);
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Reapply the authoritative blocks order to one existing serial lane after
     * its dependency graph changes (UI-2gi1 §6.5). Scheduler-owned and non-CAS:
     * the dependency write is already durable outside the queue revision. A
     * cycle or already-correct order persists nothing and does not invalidate
     * client CAS revisions.
     *
     * @param {string} workspace
     * @param {{ lane: string, blocks_edges?: { blocker: string, blockee: string }[] }} input
     * @returns {QueueOpResult & { changed: boolean, cycle: boolean }}
     */
    recalibrateSerialLane(workspace, input) {
      const current = ensureLoaded(workspace);
      const index = serialLaneIndex(input.lane);
      if (index === null || index >= current.serial_lane_count) {
        return {
          ok: false,
          conflict: false,
          queue: clone(current),
          reason: 'lane_invalid',
          changed: false,
          cycle: false
        };
      }
      const current_order = current.serial_lanes[index].entries.map(
        (entry) => entry.bead_id
      );
      const topo = orderLaneByBlocks(
        current_order,
        Array.isArray(input.blocks_edges) ? input.blocks_edges : []
      );
      if (topo.cycle) {
        return {
          ok: true,
          conflict: false,
          queue: clone(current),
          changed: false,
          cycle: true
        };
      }
      const changed = topo.order.some(
        (bead_id, position) => bead_id !== current_order[position]
      );
      if (!changed) {
        return {
          ok: true,
          conflict: false,
          queue: clone(current),
          changed: false,
          cycle: false
        };
      }
      const result = applyUnconditional(workspace, (next) => {
        applyLaneBlocksOrder(next, input.lane, input.blocks_edges);
        return true;
      });
      return { ...result, changed: result.ok, cycle: false };
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
      const result = applyMutation(workspace, expected_revision, (next) => {
        next.auto_advance = !!on;
        return true;
      });
      if (result.ok) {
        auto_advance_at_shutdown.delete(keyFor(workspace));
      }
      return result;
    },

    /**
     * Opt this workspace out of (or back into) one DECLARED repository
     * operation kind (UI-lsti §1). A narrow authority: it stores a setting and
     * nothing else. An unknown kind or a non-boolean value is
     * refused WITHOUT a write, so a malformed request never advances the
     * revision that other clients are racing against.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, kind: 'verify'|'deploy', opted_out: boolean }} input
     * @returns {QueueOpResult}
     */
    setRepoOpsOptOut(workspace, input) {
      return applyMutation(workspace, input.expected_revision, (next) => {
        if (input.kind !== 'verify' && input.kind !== 'deploy') {
          return false;
        }
        if (typeof input.opted_out !== 'boolean') {
          return false;
        }
        next.repo_ops_opt_out = {
          ...next.repo_ops_opt_out,
          [input.kind]: input.opted_out
        };
        return true;
      });
    },

    /**
     * Create or adopt a durable queued operation. This is the write-ahead
     * record the coordinator must receive before it asks the runner to spawn.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, repo_id: string, kind: 'verify'|'deploy', subjects: { bead_id: string, merged_sha: string }[], effective_base_sha: string, target_base: string, target_sha?: string, target_tree?: string, verify_head_sha?: string, deploy_worktree?: string, script_object_type?: string, script_path?: string, script_mode: string, script_blob_sha: string, attempt_id?: string, source?: 'automatic'|'manual', manual_run_id?: number, bootstrap_provenance?: RepoOperation['bootstrap_provenance'] }} input
     * @returns {QueueOpResult}
     */
    ensureRepoOperation(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        if (
          !input.operation_id ||
          !input.repo_id ||
          !isSha(input.effective_base_sha) ||
          !isSha(input.script_blob_sha) ||
          !Array.isArray(input.subjects) ||
          input.subjects.length === 0 ||
          (input.kind !== 'verify' && input.kind !== 'deploy')
        ) {
          return false;
        }
        const existing = next.repo_operations[input.operation_id];
        if (existing) {
          if (
            existing.repo_id !== input.repo_id ||
            existing.kind !== input.kind ||
            existing.effective_base_sha !==
              input.effective_base_sha.toLowerCase() ||
            existing.script_blob_sha !== input.script_blob_sha.toLowerCase()
          ) {
            return false;
          }
          const uncovered = [];
          for (const subject of input.subjects) {
            if (
              typeof subject.bead_id !== 'string' ||
              !isSha(subject.merged_sha)
            ) {
              return false;
            }
            if (
              !existing.subjects.some(
                (item) =>
                  item.bead_id === subject.bead_id &&
                  item.merged_sha === subject.merged_sha.toLowerCase()
              )
            ) {
              uncovered.push({
                bead_id: subject.bead_id,
                merged_sha: subject.merged_sha.toLowerCase()
              });
            }
          }
          if (
            existing.kind === 'verify' &&
            isSha(input.verify_head_sha) &&
            !existing.verify_head_shas.includes(
              input.verify_head_sha.toLowerCase()
            )
          ) {
            existing.verify_head_shas.push(input.verify_head_sha.toLowerCase());
          }
          if (existing.state !== 'queued') {
            return true;
          }
          for (const subject of uncovered) {
            existing.subjects.push({
              bead_id: subject.bead_id,
              merged_sha: subject.merged_sha
            });
          }
          return true;
        }
        const subjects = input.subjects.map((subject) => ({
          bead_id: subject.bead_id,
          merged_sha: subject.merged_sha.toLowerCase()
        }));
        if (
          subjects.some(
            (subject) =>
              typeof subject.bead_id !== 'string' || !isSha(subject.merged_sha)
          )
        ) {
          return false;
        }
        next.repo_operations[input.operation_id] = {
          schema: 1,
          repo_id: input.repo_id,
          kind: input.kind,
          subjects,
          effective_base_sha: input.effective_base_sha.toLowerCase(),
          target_base: input.target_base,
          // A target pinned at PRERECORD time (UI-s582 §3.5). The automatic
          // lane leaves it null and binds at launch; a manual run cannot, since
          // the tip it was authorized against is the tip it must deploy even if
          // the record waits behind another operation while the remote moves.
          target_sha: isSha(input.target_sha)
            ? input.target_sha.toLowerCase()
            : null,
          target_tree: isSha(input.target_tree)
            ? input.target_tree.toLowerCase()
            : null,
          verify_head_sha: isSha(input.verify_head_sha)
            ? input.verify_head_sha.toLowerCase()
            : null,
          verify_head_shas: isSha(input.verify_head_sha)
            ? [input.verify_head_sha.toLowerCase()]
            : [],
          deploy_worktree:
            typeof input.deploy_worktree === 'string'
              ? input.deploy_worktree
              : null,
          script_object_type: input.script_object_type || 'blob',
          script_path:
            typeof input.script_path === 'string' ? input.script_path : null,
          script_mode: input.script_mode,
          script_blob_sha: input.script_blob_sha.toLowerCase(),
          state: 'queued',
          attempt_id: input.attempt_id || `${input.operation_id}:${now()}`,
          requested_at: now(),
          started_at: null,
          finished_at: null,
          process_identity: null,
          log_path: null,
          log_digest: null,
          exit_code: null,
          signal: null,
          failure: null,
          retry: null,
          superseded_by: null,
          source: input.source === 'manual' ? 'manual' : 'automatic',
          manual_run_id:
            input.source === 'manual' && Number.isInteger(input.manual_run_id)
              ? Number(input.manual_run_id)
              : null,
          dismissed: null,
          bootstrap_provenance: input.bootstrap_provenance ?? null
        };
        return true;
      });
    },

    /**
     * Bind a live detached process to the pre-recorded operation.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, attempt_id: string, process_identity: RepoOperation['process_identity'], log_path: string, target_sha?: string, target_tree?: string, deploy_worktree?: string }} input
     * @returns {QueueOpResult}
     */
    startRepoOperation(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        if (
          !operation ||
          operation.attempt_id !== input.attempt_id ||
          (operation.state !== 'queued' && operation.state !== 'running') ||
          !input.process_identity ||
          typeof input.log_path !== 'string'
        ) {
          return false;
        }
        operation.state = 'running';
        operation.started_at = operation.started_at ?? now();
        operation.process_identity = input.process_identity;
        operation.log_path = input.log_path;
        if (isSha(input.target_sha))
          operation.target_sha = input.target_sha.toLowerCase();
        if (isSha(input.target_tree))
          operation.target_tree = input.target_tree.toLowerCase();
        if (typeof input.deploy_worktree === 'string')
          operation.deploy_worktree = input.deploy_worktree;
        return true;
      });
    },

    /**
     * Preserve the first runner failure as nonterminal retry evidence. Entering
     * `retry_pending` does not consume the one retry; consumption is a separate
     * mutation immediately before the coordinator respawns.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, attempt_id: string, exit_code: number|null, signal: string|null, failure: NonNullable<RepoOperation['failure']>, log_digest?: string|null }} input
     * @returns {QueueOpResult}
     */
    deferRepoOperationRetry(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        if (
          !operation ||
          operation.attempt_id !== input.attempt_id ||
          operation.state !== 'running' ||
          operation.retry !== null ||
          !input.failure ||
          typeof input.failure.code !== 'string'
        ) {
          return false;
        }
        operation.state = 'retry_pending';
        operation.exit_code = Number.isInteger(input.exit_code)
          ? input.exit_code
          : null;
        operation.signal =
          typeof input.signal === 'string' ? input.signal : null;
        operation.log_digest = input.log_digest ?? operation.log_digest;
        operation.finished_at = null;
        operation.process_identity = null;
        operation.failure = null;
        operation.retry = {
          first_failure: { ...input.failure },
          first_fingerprint: input.failure.fingerprint,
          // When the first attempt failed, so the failure card can say the
          // failure it shows is a reproduction rather than a new one.
          first_failed_at: now(),
          consumed_key: null,
          absorbed: null,
          outcome: 'pending',
          blocked_reason: null
        };
        return true;
      });
    },

    /**
     * Consume one exact retry key and return the same attempt to queued. This is
     * the last durable write before the runner invocation.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, attempt_id: string, consumed_key: [string, string, string] }} input
     * @returns {QueueOpResult}
     */
    consumeRepoOperationRetry(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        const retry = operation?.retry;
        if (
          !operation ||
          operation.attempt_id !== input.attempt_id ||
          operation.state !== 'retry_pending' ||
          !retry ||
          retry.consumed_key !== null ||
          !Array.isArray(input.consumed_key) ||
          input.consumed_key.length !== 3 ||
          input.consumed_key.some((part) => typeof part !== 'string')
        ) {
          return false;
        }
        retry.consumed_key = [...input.consumed_key];
        retry.outcome = 'consumed';
        operation.state = 'queued';
        operation.process_identity = null;
        operation.finished_at = null;
        return true;
      });
    },

    /**
     * Settle a consumed retry that cannot produce a terminal marker. The first
     * failure is the only complete terminal evidence, and consumption is never
     * rolled back.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, blocked_reason?: string }} input
     * @returns {QueueOpResult}
     */
    settleConsumedRepoOperationRetry(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        const retry = operation?.retry;
        if (
          !operation ||
          !retry ||
          !retry.first_failure ||
          (retry.consumed_key === null &&
            retry.outcome !== 'consumed' &&
            typeof input.blocked_reason !== 'string') ||
          !['queued', 'running', 'retry_pending'].includes(operation.state)
        ) {
          return false;
        }
        operation.state = 'failed';
        operation.failure = { ...retry.first_failure };
        operation.finished_at = now();
        operation.process_identity = null;
        if (typeof input.blocked_reason === 'string') {
          retry.outcome = 'not_applicable';
          retry.blocked_reason = input.blocked_reason;
        }
        return true;
      });
    },

    /**
     * Idempotently settle one terminal attempt. Duplicate markers never alter
     * a previously terminal record.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, attempt_id: string, exit_code: number|null, signal: string|null, failure?: RepoOperation['failure'], log_digest?: string|null, retry_outcome?: 'not_applicable'|'consumed', retry_blocked_reason?: string|null, target_sha?: string, deploy_worktree?: string }} input
     * @returns {QueueOpResult}
     */
    settleRepoOperation(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        if (!operation || operation.attempt_id !== input.attempt_id)
          return false;
        if (operation.state === 'succeeded' || operation.state === 'failed')
          return true;
        operation.exit_code = Number.isInteger(input.exit_code)
          ? input.exit_code
          : null;
        operation.signal =
          typeof input.signal === 'string' ? input.signal : null;
        operation.log_digest = input.log_digest ?? operation.log_digest;
        operation.finished_at = now();
        operation.process_identity = null;
        // A settle that never went through `startRepoOperation` (the covered
        // shortcut) carries the SHA it proved on disk here; without it the
        // record stays `target_sha: null` and no coverage sweep can read it.
        if (isSha(input.target_sha)) {
          operation.target_sha = input.target_sha.toLowerCase();
        }
        if (
          typeof input.deploy_worktree === 'string' &&
          input.deploy_worktree.length > 0
        ) {
          operation.deploy_worktree = input.deploy_worktree;
        }
        if (operation.exit_code === 0 && !operation.signal && !input.failure) {
          operation.state = 'succeeded';
          operation.failure = null;
          if (
            operation.retry?.consumed_key &&
            operation.retry.first_failure &&
            operation.retry.first_fingerprint
          ) {
            operation.retry.absorbed = {
              first_failure: { ...operation.retry.first_failure },
              first_fingerprint: operation.retry.first_fingerprint,
              at: now()
            };
            operation.retry.outcome = 'absorbed';
          }
        } else {
          operation.state = 'failed';
          operation.failure = input.failure ?? {
            code: 'runner_failed',
            fingerprint: '',
            detail: '',
            interrupted: false
          };
          if (input.retry_outcome) {
            operation.retry = {
              first_failure: operation.failure
                ? { ...operation.failure }
                : null,
              first_fingerprint: operation.failure?.fingerprint || null,
              first_failed_at: null,
              consumed_key: null,
              absorbed: null,
              outcome: input.retry_outcome,
              blocked_reason:
                typeof input.retry_blocked_reason === 'string'
                  ? input.retry_blocked_reason
                  : null
            };
          }
        }
        return true;
      });
    },

    /**
     * Attach validated bootstrap provenance and create a fresh attempt only
     * when the prior record is the provenance-less failed bootstrap record.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, provenance: NonNullable<RepoOperation['bootstrap_provenance']>, attempt_id: string }} input
     * @returns {QueueOpResult}
     */
    attachRepoOperationBootstrap(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        // `failed` is the whole guard. An approved bootstrap request IS the
        // human remediation entry (master spec §5: a new run after remediation
        // is a new attempt of the same operation), so re-requesting it must
        // reopen the record even when the FIRST bootstrap run is what failed —
        // otherwise a bootstrap that trips a precondition can never be retried,
        // because its exact input keeps adopting its own terminal failure.
        if (!operation || operation.state !== 'failed') {
          return false;
        }
        operation.bootstrap_provenance = input.provenance;
        operation.state = 'queued';
        operation.attempt_id = input.attempt_id;
        operation.started_at = null;
        operation.finished_at = null;
        operation.failure = null;
        operation.process_identity = null;
        operation.retry = null;
        return true;
      });
    },

    /**
     * Store the one-shot legacy migration result, retire the legacy failure
     * records it converted, and pin each converted row's canonical subject SHA
     * — in ONE atomic write (master spec §11 rule 7), through the same
     * temp-file-and-rename path every other mutation uses.
     *
     * An equal-or-newer stamp is never overwritten: that is what makes a
     * restart adopt the stored result instead of migrating twice.
     *
     * @param {string} workspace
     * @param {{ version: number, at: number, results: Record<string, unknown>, retire?: string[], rows?: { bead_id: string, merge_sha?: string|null, head_ref?: string|null, pr_url?: string|null, cursor?: string|null }[] }} input
     * @returns {QueueOpResult}
     */
    recordRepoOperationMigration(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const migration = normalizeRepoOperationMigration({
          version: input.version,
          at: input.at,
          results: input.results
        });
        if (!migration) {
          return false;
        }
        if (
          next.repo_operation_migration &&
          next.repo_operation_migration.version >= migration.version
        ) {
          return false;
        }
        next.repo_operation_migration = migration;
        for (const bead_id of input.retire || []) {
          delete next.cleanup_failed[bead_id];
        }
        for (const row of input.rows || []) {
          const entry = next.pr_wait.find(
            (item) => item.bead_id === row.bead_id
          );
          if (!entry) {
            continue;
          }
          if (isSha(row.merge_sha)) {
            entry.merge_sha = String(row.merge_sha).toLowerCase();
          }
          if (typeof row.head_ref === 'string') {
            entry.head_ref = row.head_ref;
          }
          if (typeof row.pr_url === 'string') {
            entry.pr_url = row.pr_url;
          }
          // The only cursor a migration may seed, and only onto a row that
          // never entered the coordinator lane: a row already mid-lane keeps
          // its own progress.
          if (row.cursor === 'base_containment' && !entry.cleanup_cursor) {
            entry.cleanup_cursor = 'base_containment';
          }
        }
        return true;
      });
    },

    /**
     * Mark a FAILED row as acknowledged by a human (UI-q0uy §4.6-2). The row
     * keeps its `failed` state and its whole evidence trail — this only takes it
     * out of the 해결 필요 tally. A row that is queued or running is refused:
     * acknowledging work that is still moving would hide a live failure path.
     *
     * @param {string} workspace
     * @param {{ operation_id: string, by?: string }} input
     * @returns {QueueOpResult}
     */
    dismissRepoOperation(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        if (!operation || operation.state !== 'failed' || operation.dismissed) {
          return false;
        }
        operation.dismissed = {
          at: now(),
          by: typeof input.by === 'string' && input.by ? input.by : 'user'
        };
        return true;
      });
    },

    /**
     * Issue the next MANUAL deploy run number (UI-s582 §3.5). The caller holds
     * the repo-operation lock, so the increment and the operation id derived
     * from it cannot interleave with another click.
     *
     * @param {string} workspace
     * @returns {QueueOpResult}
     */
    issueManualDeployRun(workspace) {
      return applyUnconditional(workspace, (next) => {
        next.manual_deploy_seq =
          (Number.isInteger(next.manual_deploy_seq)
            ? next.manual_deploy_seq
            : 0) + 1;
        return true;
      });
    },

    /**
     * @param {string} workspace
     * @param {{ operation_id: string, successor_id: string }} input
     * @returns {QueueOpResult}
     */
    supersedeRepoOperation(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const operation = next.repo_operations[input.operation_id];
        if (!operation || operation.superseded_by) return false;
        operation.superseded_by = input.successor_id;
        return true;
      });
    },

    /**
     * Toggle both workspace automation axes in one CAS-guarded mutation. OFF
     * also removes ordinary merge waits while preserving the active item and
     * every durable resolution journal.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean, keep?: string|null }} input
     * @returns {QueueOpResult}
     */
    toggleAutomation(workspace, input) {
      const { expected_revision, on, keep } = input;
      const result = applyMutation(workspace, expected_revision, (next) => {
        next.auto_advance = !!on;
        next.auto_merge = !!on;
        if (!on) {
          next.merge_queue = next.merge_queue.filter(
            (entry) =>
              entry.bead_id === (keep || null) || entry.resolution !== null
          );
        }
        return true;
      });
      if (result.ok) {
        auto_advance_at_shutdown.delete(keyFor(workspace));
      }
      return result;
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
        if (hasActiveDiscardOperation(next, bead_id)) {
          return false;
        }
        removeFromLanes(next, bead_id);
        rebindLineageLane(next, bead_id, null);
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
     * Prerecord, adopt, or settle ONE `review_session` attempt (UI-d7fy §5).
     * The three moments share this method because they are the
     * same idempotent write from different points in the same lifecycle, and
     * because {@link appendAttempt} is the wrong tool here: it replaces the
     * record wholesale, so a restart adopting a marker would reset a session
     * that had already finished. A terminal record therefore wins over any
     * patch — the marker is the slower writer, never the authority on a
     * settled attempt.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, patch: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    upsertReviewSessionAttempt(workspace, input) {
      const { attempt_id, patch } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        if (
          typeof attempt_id !== 'string' ||
          attempt_id.length === 0 ||
          !isRecord(patch)
        ) {
          reason = 'review_session_attempt_invalid';
          return false;
        }
        const current = next.attempts[attempt_id];
        if (current && TERMINAL_ATTEMPT_STATUSES.has(String(current.status))) {
          reason = 'review_session_attempt_terminal';
          return false;
        }
        const merged = { ...(current || {}), ...patch, attempt_id };
        if (
          typeof merged.bead_id !== 'string' ||
          merged.bead_id.length === 0 ||
          merged.kind !== 'review_session'
        ) {
          reason = 'review_session_attempt_invalid';
          return false;
        }
        next.attempts[attempt_id] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ (
            merged
          )
        );
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Atomically prerecord a conflict-resolution attempt and bind its owning
     * merge queue item before the resolver process can outlive the driver.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, queue_bead_id: string, subject_bead_id: string, wait_ms: number, dispatch_head_sha: string, base_ref: string, head_ref: string, attempt: Partial<Attempt> & { attempt_id: string, bead_id: string } }} input
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
      const identity = resolutionDispatchIdentity(input);
      return applyMutation(workspace, expected_revision, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === queue_bead_id
        );
        if (
          !entry ||
          !identity ||
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
          settled_at: null,
          ...identity
        };
        return true;
      });
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
        : { patch, files: [], drain: undefined };
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
      consumeTerminalReceipts(result, prepared.files, prepared.drain);
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
     * @param {{ expected_revision: number, operation: { operation_id: string, bead_id: string, attempt_id?: string|null, kind?: 'discard'|'stale_work_backup_fresh', process_identity?: { pid: number, pgid: number, started_at: number }|null, source_snapshot: Record<string, unknown> } }} input
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
     * @param {{ operation_id: string, expected_phase: string }} input
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
        if (current.kind !== 'stale_work_backup_fresh') {
          removeFromLanes(next, current.bead_id);
        }
        delete next.admission[current.bead_id];
        delete next.cleanup_failed[current.bead_id];
        next.discard_operations[operation_id] = {
          ...current,
          phase: 'done',
          last_error: null
        };
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
      consumeTerminalReceipts(result, prepared.files, prepared.drain);
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
        const entry = makeQueueEntry(bead_id, now());
        const serial_lane_id = next.attempts[attempt_id].serial_lane_id;
        if (serialLaneIndex(serial_lane_id) !== null) {
          entry.serial_lane_id = serial_lane_id;
        }
        // Re-plant the cross-lane arm from the ATTEMPT (UI-jaua §5.1): this
        // transition replaces the parallel row, so the arm would otherwise
        // vanish exactly when the merge registration needs to read it.
        //
        // EXCEPT for a lane this process's cold load disarmed (§5.4 재시작
        // 복구). The attempt snapshot predates the restart, so re-planting it
        // would restore an arm `load()` deliberately cleared and register a
        // merge the restart was supposed to stop. The lane waits for the
        // user's `▶ 진행`, which re-arms the row through {@link arm}.
        const armed_by_lane = next.attempts[attempt_id].armed_by_lane;
        if (
          typeof armed_by_lane === 'string' &&
          armed_by_lane.length > 0 &&
          !disarmed_on_load.get(keyFor(workspace))?.has(armed_by_lane)
        ) {
          entry.armed_by_lane = armed_by_lane;
        }
        next.pr_wait.push(entry);
        return true;
      });
      consumeTerminalReceipts(result, prepared.files, prepared.drain);
      return result;
    },

    /**
     * Reconcile an externally delivered OPEN PR into the durable PR-wait lane.
     * Membership, terminality, and discard ownership are judged and mutated in
     * one store write so no intermediate lane-free state can be observed.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, pr_url: string, head_ref: string }} input
     * @returns {QueueOpResult}
     */
    reconcileExternalPrWait(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const { bead_id, pr_url, head_ref } = input;
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof pr_url !== 'string' ||
          pr_url.length === 0 ||
          typeof head_ref !== 'string' ||
          head_ref.length === 0 ||
          hasActiveDiscardOperation(next, bead_id) ||
          next.pr_wait.some((entry) => entry.bead_id === bead_id) ||
          next.done.some((entry) => entry.bead_id === bead_id)
        ) {
          return false;
        }
        const in_parallel = next.queue.some(
          (entry) => entry.bead_id === bead_id
        );
        const serial_lane = next.serial_lanes.find((lane) =>
          lane.entries.some((entry) => entry.bead_id === bead_id)
        );
        if (!in_parallel && !serial_lane) {
          return false;
        }
        const attempts = Object.values(next.attempts).filter(
          (attempt) => attempt.bead_id === bead_id
        );
        if (
          !attempts.every((attempt) =>
            TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status))
          )
        ) {
          return false;
        }
        removeFromLanes(next, bead_id);
        const entry = makeQueueEntry(bead_id, now());
        entry.pr_url = pr_url;
        entry.head_ref = head_ref;
        if (serial_lane) {
          entry.serial_lane_id = serial_lane.id;
        }
        next.pr_wait.push(entry);
        return true;
      });
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
          : { patch: patch || {}, files: [], drain: undefined };
      const result = applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        const source_entry = [
          ...next.queue,
          ...next.pr_wait,
          ...next.done
        ].find((entry) => entry.bead_id === bead_id);
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
        const done_entry = source_entry
          ? normalizeEntry({ ...source_entry, added_at: now() })
          : makeQueueEntry(bead_id, now());
        if (!done_entry) {
          return false;
        }
        next.done.push(done_entry);
        completeIntentForDone(next, bead_id);
        return true;
      });
      consumeTerminalReceipts(result, prepared.files, prepared.drain);
      return result;
    },

    /**
     * Persist the active post-merge coordinator cursor. Only the canonical
     * monotonic sequence is accepted; retries may repeat the current step.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, cursor: string, merge_sha?: string, head_ref?: string|null, pr_url?: string|null }} input
     * @returns {QueueOpResult}
     */
    setCleanupCursor(workspace, input) {
      const cursors = [
        'base_containment',
        'repo_operations',
        'child_sweep',
        'branch_cleanup',
        'parent_close'
      ];
      return applyUnconditional(workspace, (next) => {
        const entry = next.pr_wait.find(
          (item) => item.bead_id === input.bead_id
        );
        const next_index = cursors.indexOf(input.cursor);
        if (!entry || next_index < 0) {
          return false;
        }
        const current_index = entry.cleanup_cursor
          ? cursors.indexOf(entry.cleanup_cursor)
          : -1;
        if (current_index === -1 && next_index !== 0) {
          return false;
        }
        if (current_index >= 0 && next_index > current_index + 1) {
          return false;
        }
        if (current_index >= 0 && next_index < current_index) {
          return false;
        }
        entry.cleanup_cursor = input.cursor;
        if (isSha(input.merge_sha)) {
          entry.merge_sha = input.merge_sha.toLowerCase();
        }
        if (typeof input.head_ref === 'string') {
          entry.head_ref = input.head_ref;
        }
        if (typeof input.pr_url === 'string') {
          entry.pr_url = input.pr_url;
        }
        return true;
      });
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
        entry.external = true;
        next.pr_wait.push(entry);
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
     * @param {{ bead_id: string, step: string, reason: string, bd_restore?: string|null, detail?: string|null, output_tail?: string|null, log_path?: string|null, failure_code?: string, retryable?: boolean, retry_count?: number, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }} input
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
        retry_count,
        fetch_failure,
        elapsed_ms
      } = input;
      return applyUnconditional(workspace, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof reason !== 'string' ||
          reason.length === 0 ||
          (failure_code !== undefined &&
            (typeof failure_code !== 'string' || failure_code.length === 0)) ||
          (fetch_failure !== undefined &&
            fetch_failure !== 'timeout' &&
            fetch_failure !== 'nonzero') ||
          (elapsed_ms !== undefined &&
            (!Number.isFinite(elapsed_ms) || Number(elapsed_ms) < 0)) ||
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
        if (fetch_failure === 'timeout' || fetch_failure === 'nonzero') {
          next.cleanup_failed[bead_id].fetch_failure = fetch_failure;
        }
        if (Number.isFinite(elapsed_ms) && Number(elapsed_ms) >= 0) {
          next.cleanup_failed[bead_id].elapsed_ms = Number(elapsed_ms);
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
     * Store the three orchestration defaults as VALUES under the queue CAS
     * (spec §C.5). This replaces both the preset reference and the per-key
     * `exec_defaults` map: the worker launcher is the only consumer of these
     * keys, so the workspace holds the value itself rather than pointing at a
     * shared preset.
     *
     * A `null` (or empty) value clears that key. The whole call is rejected —
     * with no partial write — when any named key is not an orchestration key or
     * carries a value the current catalog rejects.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, values: Record<string, string|null> }} input
     * @returns {QueueOpResult}
     */
    setOrchestrationDefaults(workspace, input) {
      const { expected_revision, values } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (!isRecord(values)) {
          return false;
        }
        const enums = execSettingEnums();
        /** @type {Record<string, string|null>} */
        const normalized = {};
        for (const [key, value] of Object.entries(values)) {
          if (!ORCHESTRATION_KEYS.includes(key)) {
            return false;
          }
          if (value === null || value === '') {
            normalized[key] = null;
            continue;
          }
          if (typeof value !== 'string' || !enums[key].includes(value)) {
            return false;
          }
          normalized[key] = value;
        }
        if (Object.keys(normalized).length === 0) {
          return false;
        }
        const target = /** @type {Record<string, unknown>} */ (
          /** @type {unknown} */ (next)
        );
        for (const [key, value] of Object.entries(normalized)) {
          target[key] = value;
        }
        return true;
      });
    },

    /**
     * Record the workspace's session-defaults migration completion marker
     * (spec §F). Written only after every destination read back, and read on
     * the next start to skip the whole procedure.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number }} input
     * @returns {QueueOpResult}
     */
    markSessionDefaultsMigrated(workspace, input) {
      return applyMutation(workspace, input.expected_revision, (next) => {
        next.session_defaults_migration = {
          version: SESSION_DEFAULTS_MIGRATION_VERSION,
          at: Date.now()
        };
        return true;
      });
    },

    /**
     * Delete the retired `default_exec_preset_id` / `exec_defaults` fields.
     * Migration-only: it runs AFTER the completion marker, which is what makes
     * a part-way migration safe to re-run.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number }} input
     * @returns {QueueOpResult}
     */
    clearLegacyExecFields(workspace, input) {
      return applyMutation(workspace, input.expected_revision, (next) => {
        const legacy_queue = /** @type {Record<string, unknown>} */ (
          /** @type {unknown} */ (next)
        );
        const had =
          Object.hasOwn(legacy_queue, 'default_exec_preset_id') ||
          Object.hasOwn(legacy_queue, 'exec_defaults');
        delete legacy_queue.default_exec_preset_id;
        delete legacy_queue.exec_defaults;
        return had;
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
     * @param {{ bead_id: string, reason: string, stale?: boolean, stale_work?: unknown }} input
     * @returns {QueueOpResult}
     */
    recordAdmission(workspace, input) {
      const { bead_id, reason } = input;
      const stale = input.stale === true;
      const stale_work = normalizeStaleWork(input.stale_work);
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
          (prior.stale === true) === stale &&
          JSON.stringify(prior.stale_work ?? null) ===
            JSON.stringify(stale_work)
        ) {
          return false;
        }
        next.admission[bead_id] = {
          reason,
          at: now(),
          ...(stale ? { stale: true } : {}),
          ...(stale_work === null ? {} : { stale_work })
        };
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
          next.serial_lanes.some((lane) =>
            lane.entries.some((e) => e.bead_id === bead_id)
          ) ||
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
     * Halt automatic dispatch and bind responsibility to one attempt in the
     * same durable mutation.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string }} input
     * @returns {QueueOpResult}
     */
    haltAutoAdvanceForAttempt(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        if (next.auto_advance !== true) {
          return false;
        }
        const attempt = next.attempts[input.attempt_id];
        next.auto_advance = false;
        if (attempt) {
          next.attempts[input.attempt_id] = makeAttempt({
            ...attempt,
            halted_auto_advance: true
          });
        }
        return true;
      });
    },

    /**
     * Dismiss repair failures whose target became moot and restore automatic
     * dispatch, when eligible, in the same durable write.
     *
     * @param {string} workspace
     * @param {{ attempt_ids: string[] }} input
     * @returns {QueueOpResult}
     */
    settleMootRepairFailures(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        let dismissed_any = false;
        let dismissed_halting = false;
        for (const attempt_id of new Set(input.attempt_ids)) {
          const attempt = next.attempts[attempt_id];
          if (
            !attempt ||
            attempt.status !== 'failed' ||
            typeof attempt.dismissed_at === 'number'
          ) {
            continue;
          }
          next.attempts[attempt_id] = makeAttempt({
            ...attempt,
            dismissed_at: now()
          });
          dismissed_any = true;
          dismissed_halting ||= attempt.halted_auto_advance === true;
        }
        if (!dismissed_any) {
          return false;
        }

        const isUnhandledFailure = createUnhandledFailurePredicate(next);
        const has_unhandled_failure = Object.values(next.attempts).some(
          (attempt) =>
            (attempt.status === 'failed' || attempt.status === 'orphaned') &&
            isUnhandledFailure(attempt)
        );
        if (
          dismissed_halting &&
          !has_unhandled_failure &&
          next.auto_advance === false
        ) {
          next.auto_advance = true;
        }
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
            rebase_rounds: 0,
            resolution: null
          });
          added += 1;
        }
        return added > 0 || cleared > 0;
      });
    },

    /**
     * Queue a manual [머지] click as a durable per-item continuation authority
     * (UI-58w8 §1). Unlike {@link enqueueMerge}, the caller must have read the
     * authoritative PR head and target base FIRST: a row whose identity could
     * not be read makes no queue effect at all, because an authority granted on
     * a guess is exactly the stale-evidence merge the journal exists to block.
     *
     * Authority lifecycle per row:
     * - new entry → fresh `authority` (source `manual`), empty review journal
     * - duplicate click on a current manual authority → reuse, no new id and
     *   no budget reset
     * - re-click after a FAILED `review_session`, an automatic enrolment, or a
     *   legacy authority-less entry → the current slot is atomically replaced
     *   with a NEW authority bound to the freshly observed head/base; every
     *   late result of the old attempt then fails its `authority_id` CAS and is
     *   a no-op.
     *
     * `via` is provenance, not a new authority kind (UI-jaua §5.4): a lane's
     * armed member registers through this same mutation with the same
     * `manual` source, so every consumer of {@link MergeAuthority.source} —
     * and `manualContinuation()` above all — behaves identically whether the
     * authority came from a click or from `▶ 진행`.
     *
     * `review_session` is the `[리뷰 후 머지]` click (UI-d7fy §5.2). It rides
     * the SAME CAS mutation as the authority it belongs to, because the two
     * facts are one decision: an authority granted without its attempt would
     * leave a held row nobody is reviewing, and an attempt registered without
     * its authority would review a head the queue never promised to merge. A
     * failed write therefore dispatches nothing at all — the caller launches
     * only after `review_session_registered` comes back true.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, entries: Array<{ bead_id: string, head_sha?: string|null, target_base?: string|null, external?: boolean, via?: 'lane' }>, review_session?: { attempt_id: string, session_source?: string|null }|null }} input
     * @returns {QueueOpResult & { review_session_registered?: boolean }}
     */
    enqueueMergeManual(workspace, input) {
      const { expected_revision, entries } = input;
      /**
       * Whether this Bead's most recent `[리뷰 후 머지]` session FAILED — the
       * one case in which an existing MANUAL authority is not reusable
       * (UI-d7fy §5.4). A failed completion leaves the authority bound to the
       * head that was CLICKED, so reusing it would send the next review at a
       * head that may since have moved: the stale binding §5.4's rebind exists
       * to prevent. A Bead with no review session at all is unaffected, which
       * keeps the plain `[머지]` re-click reusing its authority exactly as
       * before.
       *
       * An unsettled session is the most recent by definition and is not a
       * failure, so it reuses; among settled ones the latest timestamp wins.
       *
       * @param {Queue} next
       * @param {string} bead_id
       * @returns {boolean}
       */
      function lastReviewSessionFailed(next, bead_id) {
        /** @type {string|null} */
        let latest_status = null;
        let latest_at = -1;
        for (const attempt of Object.values(next.attempts)) {
          if (
            attempt.kind !== 'review_session' ||
            attempt.bead_id !== bead_id
          ) {
            continue;
          }
          if (!TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status))) {
            return false;
          }
          const at = Math.max(
            typeof attempt.finished_at === 'number' ? attempt.finished_at : 0,
            typeof attempt.started_at === 'number' ? attempt.started_at : 0
          );
          if (at >= latest_at) {
            latest_at = at;
            latest_status = String(attempt.status);
          }
        }
        return latest_status === 'failed';
      }
      const review_session =
        isRecord(input.review_session) &&
        typeof input.review_session.attempt_id === 'string' &&
        input.review_session.attempt_id.length > 0
          ? input.review_session
          : null;
      /** @type {string|null} */
      let reason = null;
      let review_session_registered = false;
      /** @type {Map<string, { authority_id: string, head_sha: string }>} */
      const granted = new Map();
      /**
       * Register the click's `review_session` attempt inside the SAME mutation.
       *
       * Refuses — without failing the authority write — when the Bead already
       * has an unsettled review session (§5.2 per-Bead in-flight guard: the
       * second click reuses the authority and dispatches nothing), when the
       * attempt id is already taken, or when this click granted no authority to
       * bind to.
       *
       * @param {Queue} next
       * @param {{ attempt_id: string, session_source?: string|null }} click
       * @param {Map<string, { authority_id: string, head_sha: string }>} authorities
       * @returns {boolean}
       */
      function registerReviewSessionAttempt(next, click, authorities) {
        if (authorities.size !== 1) {
          reason = 'review_session_authority_ambiguous';
          return false;
        }
        const [bead_id, authority] = [...authorities.entries()][0];
        if (Object.hasOwn(next.attempts, click.attempt_id)) {
          reason = 'review_session_attempt_exists';
          return false;
        }
        for (const attempt of Object.values(next.attempts)) {
          if (
            attempt.kind === 'review_session' &&
            attempt.bead_id === bead_id &&
            !TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status))
          ) {
            reason = 'review_session_in_flight';
            return false;
          }
        }
        next.attempts[click.attempt_id] = makeAttempt({
          attempt_id: click.attempt_id,
          bead_id,
          kind: 'review_session',
          origin: 'click',
          status: 'pending',
          authority_id: authority.authority_id,
          head_sha: authority.head_sha,
          // How the click resolved §5.2's session selection, recorded on the
          // EXISTING continuation field rather than a new one: `session` is the
          // resumed `claude:` entry, `fresh` the substitute. `session_id` stays
          // null until the launched runner announces its own.
          continuation_mode:
            click.session_source === 'resume' ? 'session' : 'fresh'
        });
        review_session_registered = true;
        return true;
      }
      const result = applyMutation(workspace, expected_revision, (next) => {
        if (!Array.isArray(entries) || entries.length === 0) {
          return false;
        }
        let changed = 0;
        for (const entry of entries) {
          const bead_id = entry && entry.bead_id;
          if (typeof bead_id !== 'string' || bead_id.length === 0) {
            continue;
          }
          const head_sha =
            typeof entry.head_sha === 'string' && SHA40_RE.test(entry.head_sha)
              ? entry.head_sha.toLowerCase()
              : null;
          const target_base =
            typeof entry.target_base === 'string' &&
            entry.target_base.length > 0
              ? entry.target_base
              : null;
          if (!head_sha || !target_base) {
            continue;
          }
          const via = entry.via === 'lane' ? entry.via : null;
          if (!enqueueMember(next, bead_id, entry.external === true)) {
            const lane_occupied =
              next.queue.some((item) => item.bead_id === bead_id) ||
              next.serial_lanes.some((lane) =>
                lane.entries.some((item) => item.bead_id === bead_id)
              ) ||
              next.done.some((item) => item.bead_id === bead_id);
            if (lane_occupied) {
              reason = 'lane_occupied';
            }
            continue;
          }
          const intent = next.completion_intents[bead_id];
          if (
            intent?.phase === 'needs_human' &&
            intent.terminal_reason !== null
          ) {
            intent.resumed_terminal = {
              ...intent.terminal_reason,
              resumed_at: now()
            };
            intent.phase =
              intent.subject.merged_sha === null ? 'gating' : 'cleaning';
            intent.terminal_reason = null;
            changed += 1;
          } else if (
            intent &&
            COMPLETION_AUTO_RESOLUTION_PHASES.has(intent.phase)
          ) {
            // Manual authority outranks automation (UI-hk74 §4): the click ends
            // the wait wherever it stands and hands the saga back to the gate.
            intent.auto_resolution = null;
            intent.paused_resolution = null;
            intent.phase =
              intent.subject.merged_sha === null ? 'gating' : 'cleaning';
            changed += 1;
          }
          if (next.auto_merge_skips[bead_id]) {
            delete next.auto_merge_skips[bead_id];
            changed += 1;
          }
          const existing = next.merge_queue.find((e) => e.bead_id === bead_id);
          if (existing) {
            // Only a duplicate click on the SAME MANUAL authority reuses it,
            // and only while this Bead's last review session did not FAIL. An
            // automatic enrolment is not the user's click — the click promotes
            // it to a fresh manual authority, exactly like a legacy slot
            // (UI-58w8 §1) — and a failed review session leaves the authority
            // pinned to the clicked head, so the re-click mints a fresh one
            // bound to the head just observed (UI-d7fy §5.4).
            if (
              existing.authority &&
              existing.authority.source === 'manual' &&
              !lastReviewSessionFailed(next, bead_id)
            ) {
              granted.set(bead_id, {
                authority_id: existing.authority.id,
                head_sha
              });
              continue;
            }
            existing.authority = {
              id: randomUUID(),
              source: 'manual',
              granted_at: now(),
              requested_head_sha: head_sha,
              target_base,
              ...(via === null ? {} : { via })
            };
            granted.set(bead_id, {
              authority_id: existing.authority.id,
              head_sha
            });
            // A fresh authority is a fresh judgment: whatever the gate was
            // holding the old one on is re-decided from this head (UI-d7fy
            // §3.3), and a stale reason must not outlive the authority it was
            // taken against.
            delete existing.hold;
            changed += 1;
            continue;
          }
          const authority_id = randomUUID();
          insertRunnableMergeEntry(next, {
            bead_id,
            resolution_rounds: 0,
            rebase_rounds: 0,
            resolution: null,
            authority: {
              id: authority_id,
              source: 'manual',
              granted_at: now(),
              requested_head_sha: head_sha,
              target_base,
              ...(via === null ? {} : { via })
            }
          });
          granted.set(bead_id, { authority_id, head_sha });
          changed += 1;
        }
        if (review_session !== null) {
          changed += registerReviewSessionAttempt(next, review_session, granted)
            ? 1
            : 0;
        }
        return changed > 0;
      });
      if (!result.ok) {
        review_session_registered = false;
      }
      const decorated =
        reason === null || result.ok ? result : { ...result, reason };
      return review_session === null
        ? decorated
        : { ...decorated, review_session_registered };
    },

    /**
     * The `[리뷰 후 머지]` session's completion verdict (UI-d7fy §5.4), as ONE
     * write.
     *
     * The BINDING is checked first and fails the whole write: an attempt that
     * was cancelled (§5.6) or an authority that was reissued under it means
     * this session no longer speaks for anything, and a late result must write
     * nothing at all — not even its own failure.
     *
     * `current` rebinds the authority to the FINAL observed head, carrying over
     * everything the manual click grants at that head (the `receipt_unbacked`
     * waiver above all): a REVISE fix push moves the head, and an authority
     * left on the click head would lose the waiver and hold the row forever.
     * Anything else terminalizes the attempt and refreshes the hold so the
     * button comes back with the reason beside it.
     *
     * `from: 'launch'` is the ONE case that may write over an already-terminal
     * attempt: a spawn abort records its own cause deep inside the launcher, and
     * without the relabel the click's canonical `launch_failed` state — the one
     * the row's button and reason text are defined against — would never be
     * reached. The authority binding above still guards it, so a cancelled
     * attempt (whose entry is gone) stays untouchable.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, outcome: 'current'|'failed', final_head_sha?: string|null, cause?: string|null, hold_reason?: string|null, from?: 'launch'|'completion', at?: number }} input
     * @returns {QueueOpResult & { reason?: string }}
     */
    settleReviewSession(workspace, input) {
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const attempt = next.attempts[input.attempt_id];
        const relabelable =
          input.from === 'launch' &&
          input.outcome === 'failed' &&
          attempt?.status === 'failed' &&
          attempt.cause !== 'cancelled';
        if (
          !attempt ||
          attempt.kind !== 'review_session' ||
          (!relabelable &&
            TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status)))
        ) {
          reason = 'binding_gone';
          return false;
        }
        const entry = next.merge_queue.find(
          (item) => item.bead_id === attempt.bead_id
        );
        if (
          !entry ||
          !entry.authority ||
          entry.authority.id !== attempt.authority_id
        ) {
          reason = 'binding_gone';
          return false;
        }
        const at =
          typeof input.at === 'number' && Number.isFinite(input.at)
            ? input.at
            : now();
        attempt.control = null;
        attempt.finished_at = at;
        if (input.outcome === 'current') {
          attempt.status = 'done';
          attempt.cause = null;
          if (isSha(input.final_head_sha)) {
            entry.authority.requested_head_sha = String(
              input.final_head_sha
            ).toLowerCase();
          }
          delete entry.hold;
          return true;
        }
        attempt.status = 'failed';
        attempt.cause =
          typeof input.cause === 'string' && input.cause.length > 0
            ? input.cause
            : 'receipt_not_current';
        const prior = entry.hold ?? null;
        // A caller with no verdict of its own (a session that died before it
        // could be judged) leaves the hold exactly as the gate last stated it;
        // only a fresh judgment replaces the reason.
        const hold_reason =
          typeof input.hold_reason === 'string' && input.hold_reason.length > 0
            ? input.hold_reason
            : (prior?.reason ?? 'review_receipt_missing');
        const head_sha = isSha(input.final_head_sha)
          ? String(input.final_head_sha).toLowerCase()
          : (entry.authority.requested_head_sha ?? '');
        entry.hold = {
          reason: hold_reason,
          head_sha,
          since: prior && prior.reason === hold_reason ? prior.since : at
        };
        return true;
      });
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Record or refresh one merge-gate hold, or release it (UI-d7fy §3.3).
     *
     * A hold is not a failure and not a dequeue: the item keeps its slot and
     * its authority, and every `kick()` re-runs the gate on it. `since` belongs
     * to the REASON, not to the item — a refresh reporting the same reason
     * keeps the moment that reason started, so the card can say how long this
     * particular hold has stood.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, hold: { reason: string, head_sha: string|null }|null, at: number }} input
     * @returns {QueueOpResult}
     */
    setMergeHold(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        if (!entry) {
          return false;
        }
        const prior = entry.hold ?? null;
        if (input.hold === null) {
          if (!prior) {
            return false;
          }
          delete entry.hold;
          return true;
        }
        const reason = input.hold.reason;
        const head_sha =
          typeof input.hold.head_sha === 'string'
            ? input.hold.head_sha.toLowerCase()
            : '';
        if (typeof reason !== 'string' || reason.length === 0) {
          return false;
        }
        if (prior && prior.reason === reason && prior.head_sha === head_sha) {
          return false;
        }
        entry.hold = {
          reason,
          head_sha,
          since:
            prior && prior.reason === reason
              ? prior.since
              : typeof input.at === 'number' && Number.isFinite(input.at)
                ? input.at
                : now()
        };
        return true;
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
     * identity in the sequential merge queue. The subject is the root PR and
     * stays the root PR (UI-8w4t §2).
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
          Object.hasOwn(next.completion_intents, root_bead_id)
        ) {
          return false;
        }
        const normalized = normalizeCompletionIntent(root_bead_id, {
          target_base,
          phase: 'gating',
          subject,
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
            rebase_rounds: 0,
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
     * The repair-lane sagas this process's cold load withheld (UI-8w4t §2),
     * each naming the sessions its retirement still has to stop. Read-only:
     * nothing is written and no field is dropped until {@link retireRepairLane}
     * says the stop already happened.
     *
     * @param {string} workspace
     * @returns {RepairLaneRetirement[]}
     */
    pendingRepairLaneRetirements(workspace) {
      ensureLoaded(workspace);
      return clone(repair_lane_retirements.get(keyFor(workspace)) || []);
    },

    /**
     * The retired-lane attempts this process's cold load found still `running`
     * (UI-d7fy §3.8). Their records are ALREADY terminal in the loaded
     * snapshot — normalization owns that half — so this list answers one
     * question only: which processes does the caller still owe a stop? The
     * identifying fields (`pid`, `process_identity`) survive the migration, so
     * reading this after the terminalization loses nothing.
     *
     * @param {string} workspace
     * @returns {RetiredKindAttempt[]}
     */
    pendingRetiredKindAttempts(workspace) {
      ensureLoaded(workspace);
      return clone(retired_kind_attempts.get(keyFor(workspace)) || []);
    },

    /**
     * Persist the §3.8 migration and empty its pending list. The attempts are
     * terminal in memory the moment the file is read; this is what writes that
     * back to disk once, after the caller has stopped the processes.
     *
     * @param {string} workspace
     * @returns {QueueOpResult}
     */
    commitRetiredKindAttempts(workspace) {
      const key = keyFor(workspace);
      const result = applyUnconditional(workspace, () => {
        return (retired_kind_attempts.get(key) || []).length > 0;
      });
      if (result.ok) {
        retired_kind_attempts.set(key, []);
      }
      return result;
    },

    /**
     * Retire one withheld repair-lane saga. Steps 2-4 of the §2 order share
     * ONE persist — the attempts reach `failed`, the intent reaches
     * `needs_human` with `repair_lane_retired`, and the rewritten record
     * carries none of the lane's retired keys. Split across
     * writes, a crash in between would leave a saga whose session is terminal
     * but whose card still claims a repair is running.
     *
     * Step 1 (identify) already happened at load; step 2's PROCESS stop is the
     * caller's, because a pure store cannot kill a pid. Calling this before the
     * stop is what the ordering exists to forbid.
     *
     * The repair Beads the lane already created are deliberately untouched: a
     * human closes them (§2).
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, at: number }} input
     * @returns {QueueOpResult}
     */
    retireRepairLane(workspace, input) {
      const { root_bead_id, at } = input;
      const key = keyFor(workspace);
      /** @type {string|null} */
      let reason = null;
      const result = applyUnconditional(workspace, (next) => {
        const plan = (repair_lane_retirements.get(key) || []).find(
          (item) => item.root_bead_id === root_bead_id
        );
        if (!plan || typeof at !== 'number' || !Number.isFinite(at)) {
          reason = 'repair_lane_not_pending';
          return false;
        }
        for (const attempt_id of plan.attempt_ids) {
          const attempt = next.attempts[attempt_id];
          if (
            !attempt ||
            TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status))
          ) {
            continue;
          }
          attempt.status = 'failed';
          attempt.cause = 'repair_lane_retired';
          attempt.control = null;
          attempt.finished_at = at;
        }
        next.completion_intents[root_bead_id] = {
          ...clone(plan.intent),
          terminal_reason: {
            reason: 'repair_lane_retired',
            stage: plan.phase,
            failure_key: plan.failure_key,
            evidence: null,
            log_path: plan.log_path,
            op_id: plan.op_id,
            comment_at: null,
            at
          }
        };
        return true;
      });
      if (result.ok) {
        repair_lane_retirements.set(
          key,
          (repair_lane_retirements.get(key) || []).filter(
            (item) => item.root_bead_id !== root_bead_id
          )
        );
      }
      return reason === null ? result : { ...result, reason };
    },

    /**
     * Prerecord an external effect (merge handoff or cleanup replay).
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
          normalized_op.attempt_id !== null
        ) {
          return false;
        }
        if (!applyCompletionPhase(intent, phase)) {
          return false;
        }
        intent.active_op = normalized_op;
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
          (subject !== undefined && !normalized_subject)
        ) {
          return false;
        }
        if (clear === true) {
          // A consumed operation is the readback boundary of whatever the retry
          // re-ran, so the resolution record has nothing left to bound. Cleared
          // BEFORE the phase move, because a live record holds the phase.
          intent.auto_resolution = null;
        }
        if (
          next_phase !== undefined &&
          !applyCompletionPhase(intent, next_phase)
        ) {
          return false;
        }
        active_op.status = status;
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
     * Refresh the merge subject after an operation has settled. The subject
     * normalizer pins it to the root Bead, so the refresh can only ever carry
     * new SHAs for the root PR — never an unrelated Bead.
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
          phase === 'completed'
        ) {
          return false;
        }
        if (!applyCompletionPhase(intent, phase)) {
          return false;
        }
        intent.subject = normalized_subject;
        return true;
      });
    },

    /**
     * Enter one non-terminal automatic resolution (UI-hk74 §4). The active
     * operation journal is deliberately UNTOUCHED: the failing effect's own
     * duplicate-prevention record is what a re-run must still answer to, and
     * `settleFailure` copies the parts a re-run needs into `resolution.op`.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, resolution: CompletionAutoResolution }} input
     * @returns {QueueOpResult}
     */
    startCompletionAutoResolution(workspace, input) {
      const { root_bead_id, resolution } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const normalized = normalizeCompletionAutoResolution(resolution);
        if (
          !intent ||
          !normalized ||
          intent.phase === 'needs_human' ||
          intent.phase === 'completed' ||
          intent.phase === 'paused'
        ) {
          return false;
        }
        intent.auto_resolution = normalized;
        intent.paused_resolution = null;
        return applyCompletionPhase(
          intent,
          COMPLETION_AUTO_RESOLUTION_PHASE[normalized.class]
        );
      });
    },

    /**
     * Record one resolution attempt's progress. Only the bounded per-attempt
     * fields move; class, origin, and return phase are fixed at entry.
     *
     * `supersede_op_id` retires the terminal-failed operation the record was
     * opened on, in the SAME revision that spends the retry (UI-hk74 §3 /
     * review F1). The two must be one write: spending the budget without
     * releasing the journal leaves a re-run that can never open its operation,
     * and releasing it without spending leaves a re-run that costs nothing.
     * Only that exact `op_id` is retired, so a live operation someone else
     * opened is never dropped by a stale retry.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, patch: { attempts?: number, next_at?: number|null, last_error?: string|null }, supersede_op_id?: string|null }} input
     * @returns {QueueOpResult}
     */
    updateCompletionAutoResolution(workspace, input) {
      const { root_bead_id, patch, supersede_op_id } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        const current = intent?.auto_resolution;
        if (!intent || !current || !isRecord(patch)) {
          return false;
        }
        const merged = normalizeCompletionAutoResolution({
          ...current,
          ...patch
        });
        if (
          !merged ||
          COMPLETION_AUTO_RESOLUTION_PHASE[merged.class] !== intent.phase
        ) {
          return false;
        }
        if (typeof supersede_op_id === 'string' && supersede_op_id.length > 0) {
          if (intent.active_op?.op_id !== supersede_op_id) {
            return false;
          }
          intent.active_op = null;
        }
        intent.auto_resolution = merged;
        return true;
      });
    },

    /**
     * Close one resolution after its success condition read back, returning the
     * saga to the phase the original failure interrupted.
     *
     * @param {string} workspace
     * @param {{ root_bead_id: string, phase: CompletionPhase }} input
     * @returns {QueueOpResult}
     */
    clearCompletionAutoResolution(workspace, input) {
      const { root_bead_id, phase } = input;
      return applyUnconditional(workspace, (next) => {
        const intent = next.completion_intents[root_bead_id];
        if (
          !intent ||
          intent.auto_resolution === null ||
          !COMPLETION_RETURN_PHASES.has(phase)
        ) {
          return false;
        }
        intent.auto_resolution = null;
        intent.paused_resolution = null;
        return applyCompletionPhase(intent, phase);
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
        applyCompletionPhase(intent, 'paused');
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
     * @param {{ root_bead_id: string, terminal: CompletionTerminalInput }} input
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
        intent.auto_resolution = null;
        intent.paused_resolution = null;
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
        const active_op = intent?.active_op;
        const active_failure = active_op?.failure_key;
        const active_op_consistent =
          active_op === null ||
          (active_op?.kind === 'merge_subject' &&
            active_op.attempt_id === null &&
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
          normalized_subject.bead_id !== intent.subject.bead_id ||
          !normalized_op ||
          normalized_op.kind !== 'merge_subject' ||
          normalized_op.attempt_id !== null ||
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
          rebase_rounds: 0,
          resolution: attempt
            ? {
                attempt_id: attempt.attempt_id,
                subject_bead_id: attempt.bead_id,
                deadline_at:
                  /** @type {number} */ (attempt_started_at) + wait_ms,
                state: 'waiting',
                yielded_at: null,
                settled_at: null,
                // A historical terminal carries no dispatch identity, so this
                // adoption reads exactly like a legacy record: unreadable
                // grounds, which the charge judgment bills to the session.
                dispatch_head_sha: '',
                base_ref: '',
                head_ref: ''
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
     * @param {{ expected_revision?: number|null, entries: Array<{ bead_id: string, external?: boolean, head_sha: string, target_base?: string, completion?: { source_attempt_id: string, target_base: string, subject: CompletionSubject } }>, present_ids?: string[] }} input
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
                  rebase_rounds: 0,
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
                rebase_rounds: 0,
                resolution: null,
                ...automaticAuthorityFields(
                  entry.head_sha,
                  entry.completion.target_base
                )
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
            rebase_rounds: 0,
            resolution: null,
            ...automaticAuthorityFields(entry.head_sha, entry.target_base)
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
          // A manual authority is the user's own click — the global toggle
          // owns automatic enrolment only, so it must not sweep those rows
          // (UI-58w8 §1).
          next.merge_queue = next.merge_queue.filter(
            (e) =>
              e.bead_id === (keep || null) ||
              e.resolution !== null ||
              e.authority?.source === 'manual'
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
     * @param {{ bead_id: string, subject_bead_id: string, attempt_id: string, wait_ms: number, dispatch_head_sha: string, base_ref: string, head_ref: string }} input
     * @returns {QueueOpResult}
     */
    bindResolutionWait(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find(
          (item) => item.bead_id === input.bead_id
        );
        const attempt = next.attempts[input.attempt_id];
        const identity = resolutionDispatchIdentity(input);
        if (
          !entry ||
          !identity ||
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
          settled_at: null,
          ...identity
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
     * Consume one ready attempt identity, charging the counter the driver's
     * judgment named (UI-p49g §3.3). A duplicate event finds no ready identity
     * and is a no-op.
     *
     * `session` counts a resolution the session itself failed to land;
     * `rebase` counts one the QUEUE re-conflicted by moving the base under an
     * already-correct resolution; `none` leaves both counters alone.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, charge: 'session'|'rebase'|'none' }} input
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
          resolution.attempt_id !== input.attempt_id ||
          (input.charge !== 'session' &&
            input.charge !== 'rebase' &&
            input.charge !== 'none')
        ) {
          return false;
        }
        if (input.charge === 'session') {
          entry.resolution_rounds = Number.isFinite(entry.resolution_rounds)
            ? entry.resolution_rounds + 1
            : 1;
        }
        if (input.charge === 'rebase') {
          // Second line of defence for a creation point that forgot the field:
          // a `NaN` budget would compare false against every cap forever.
          entry.rebase_rounds = Number.isFinite(entry.rebase_rounds)
            ? entry.rebase_rounds + 1
            : 1;
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
      /** @type {string[]} */
      let cancelled_attempt_ids = [];
      const result = applyMutation(workspace, expected_revision, (next) => {
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
        // The cancel's ONE write (UI-d7fy §5.6): the authority reclaim (the
        // entry leaving), and every unsettled review session that authority
        // dispatched, settle together. The process stop is the caller's and
        // comes AFTER — a late session result then fails its binding check and
        // writes nothing, whether or not the process died on time.
        /** @type {string[]} */
        const cancelled = [];
        const at = now();
        for (const attempt of Object.values(next.attempts)) {
          if (
            attempt.kind !== 'review_session' ||
            !doomed.includes(attempt.bead_id) ||
            TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status))
          ) {
            continue;
          }
          attempt.status = 'failed';
          attempt.cause = 'cancelled';
          attempt.control = null;
          attempt.finished_at = at;
          cancelled.push(attempt.attempt_id);
        }
        cancelled_attempt_ids = cancelled;
        return true;
      });
      return result.ok
        ? { ...result, cancelled_attempt_ids }
        : { ...result, cancelled_attempt_ids: [] };
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
      repair_lane_retirements.clear();
      retired_kind_attempts.clear();
    }
  };
}
