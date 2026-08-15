# beads-ui WebSocket Protocol

This document defines the JSON messages exchanged between the browser client and
the local server over a single WebSocket connection. The canonical message-type
set lives in `app/protocol.js` (`MESSAGE_TYPES`); this doc describes their
payloads.

- Transport: single WebSocket connection (`/ws`)
- Encoding: JSON text frames
- Correlation: every request/response pair shares the same `id`

## Envelope shapes

- RequestEnvelope: `{ id: string, type: MessageType, payload?: any }`
- ReplyEnvelope:
  `{ id: string, ok: boolean, type: MessageType, payload?: any, error?: { code, message, details? } }`

Server-push events (unsolicited) use the ReplyEnvelope shape with `ok: true` and
a generated `id` (e.g. `evt-…`).

## Connection (no auth)

There is no token auth: a socket may send application messages immediately after
connect. The only handshake-time gate is the **Origin allowlist** for browser
sockets (same-origin, or `BDUI_ALLOWED_ORIGINS`; absent `Origin` = non-browser
client, governed by network isolation). See the README's "Access model" section.

`ping` → `{ ok, payload: { ts } }` is available as a liveness check.

## Issue subscriptions (push protocol)

Read data flows through subscriptions, never one-shot list RPCs.

- `subscribe-list` payload: `{ id: client_id, type, params? }` — starts a
  per-subscription stream; the server replies `ok` then pushes a `snapshot`. The
  `closed-issues` type accepts `params.since` (epoch ms): only issues with
  `closed_at >= since` are streamed. Changing `since` requires an
  `unsubscribe-list` for the client id followed by a fresh `subscribe-list`.
- `unsubscribe-list` payload: `{ id: client_id }`.
- Push events (server → client), keyed by the subscription `id`:
  - `snapshot` payload: `{ type:'snapshot', id, revision, issues:[…] }`
  - `upsert` payload: `{ type:'upsert', id, revision, issue }`
  - `delete` payload: `{ type:'delete', id, revision, issue_id }`

The detail panel uses the same mechanism with a `detail:<id>` client id and an
`issue-detail` spec.

## Issue mutations

- `update-status` payload: `{ id, status }`
- `update-priority` payload: `{ id, priority: 0|1|2|3|4 }`
- `update-assignee` payload: `{ id, assignee }`
- `edit-text` payload:
  `{ id, field: 'title'|'description'|'acceptance'|'notes'|'design', value }`
- `update-exec-settings` payload: `{ id, key, value }` — execution-preference
  metadata (the 12 keys + `workflow_mode`; `workflow_mode='standard'` unsets the
  override key). Replaces the removed v3 `update-workflow-settings`.
- `create-issue` payload: `{ title, type?, priority?, description? }`
- `delete-issue` payload: `{ id }`
- `dep-add` / `dep-remove` payload: `{ a, b, view_id? }` (`a` depends on `b`).
- `label-add` / `label-remove` payload: `{ id, label }`
- `get-comments` payload: `{ id }`; `add-comment` payload: `{ id, body }`.

## Workspace management

- `list-workspaces` (reply includes `hidden: [abs path]`), `get-workspace`,
  `set-workspace` (`{ path }`), `git-pull-workspace`. `workspace-changed` is a
  server-push event when the default workspace changes.
- `set-workspace-visibility` payload: `{ path, visible }` — toggles whether a
  registered workspace shows in the picker for every client (server-global
  persisted set); reply `{ changed, hidden }`. The path must be absolute and in
  the available-workspace allowlist.

## Manual UI-order channel (spec §2)

Per-workspace persisted manual card ranking shared by the Board columns and the
Worker candidate lane. CAS-guarded like the worker queue.

- `subscribe-ui-order` / `unsubscribe-ui-order` payload: `{ id: client_id }` —
  subscribe replies `ok` then pushes an initial snapshot.
- `ui-order-snapshot` (push) payload: `{ id, revision, order }` where `order`
  maps bead id → numeric rank; pushed to every subscriber after any mutation.
- `ui-order-set` payload: `{ expected_revision, entries: [{ bead_id, rank }] }`
  — reply `{ applied, conflict, revision, order }`; on `conflict` adopt the
  returned snapshot and retry. A WS-originated `update-status` → `closed` prunes
  that bead's rank server-side.

## Periodic refresh

Besides fs-watch-driven pushes, the server re-runs list refreshes every
`poll_interval_seconds` (config, default 30, `0` = off) while at least one
client is connected, so writes from other machines through the central DB
surface without a local fs event.

## Worker queue channel (worker-phase2 §3/§4/§6)

Per-workspace subscription + CAS-guarded mutations + a whole-queue push.

There is ONE waiting lane. The retired serial/parallel split is replaced by a
single `queue` plus a `slots` concurrency cap (`slots: 1` is the old serial
meaning), and completion is decided by the SERVER OBSERVING an open PR, not by
the session's self-report — so a bead moves `queue` → `pr_wait` → `done`.
Nothing merges without a human `[머지]` click.

- `subscribe-worker-queue` / `unsubscribe-worker-queue` payload: `{ id }`.
- `worker-queue-snapshot` (push) payload:
  `{ type: 'worker-queue-snapshot', id, root_dir, queue }` — `root_dir` is the
  workspace this snapshot describes (envelope addressing, not part of `queue`),
  so a client that already repointed to another workspace can drop a snapshot
  from a subscription the server has not torn down yet; the rest is the full
  queue (`revision`, `auto_advance`, `slots`, `pr_wait_holds_slot`, `queue[]`,
  `pr_wait[]`, `done[]`, `attempts`, `admission`, `cleanup_failed`,
  `exec_defaults`) plus four server-decorated, NON-persisted keys:
  `workspace_info: { verify_cmd, slots }`, `pr_observations` (per-`pr_wait` PR
  state + merge-gate verdict, memory cache only), `bead_titles`
  (`Record<bead_id, title>` for the `queue`/`pr_wait`/`done` beads, memory cache
  only), and `declared_base`. `bead_titles` is PARTIAL: only titles already
  cached travel, a miss simply has no entry and arrives in a later snapshot once
  the server's async lookup fills it. Consumers fail-quiet on the whole key
  being absent (older server) and on a missing entry — both fall back to
  displaying the bead id. `bead_labels` is likewise a non-persisted partial
  `Record<bead_id, string[]>` for the same `queue`/`pr_wait`/`done` beads. Its
  arrays are normalized from the same async `bd show` fill as titles and times;
  no entry means label truth is unknown (not an empty array), including when an
  older server omits the whole key. It is UI projection only and never Worker
  scheduler authority.
- A RUNNING attempt inside `attempts` additionally carries the non-persisted
  `last_event_at` (epoch ms) — when the server last saw a session-log line for
  that attempt (UI-53es §1). It is what the monitor row's live heartbeat reads;
  because a log line is not a queue transition, every session-log publish (live
  tail and post-restart re-attach alike) arms a 3-second COALESCED queue fanout,
  so a burst costs one snapshot per window. Live-only: a server restart drops it
  until the next line arrives, and consumers fail-quiet on its absence (no dot
  rather than a stale one).
- `declared_base: string|null` — what this workspace DECLARES as its target base
  (`docs/agents/repo-ops.toml` top-level `base`), read from the declaration
  only. An absent file or absent key travels as `'main'`, matching the
  contract's undeclared fallback; an unreadable file, a parse failure, or a
  `base` value that is empty / not a string / shell-unsafe travels as `null`, so
  a client can say "unknown" instead of claiming `main`. The five-step resolve
  (which fetches) stays on the dispatch path and never runs for this key, so a
  `declared_base` string means "declared", never "verified". Consumers
  fail-quiet on the key being absent (older server).
- `worker-queue-place` payload: `{ bead_id, index?, expected_revision }` — a
  successful placement also kicks the live dispatch loop (`tick`), so an
  auto_advance-ON queue with a free slot starts the bead without waiting for
  another trigger.
- `worker-queue-reorder` payload: `{ bead_id, to_index, expected_revision }`
- `worker-queue-toggle` payload: `{ on, expected_revision }` — persists the
  legacy independent `auto_advance` surface and, on turn-ON, kicks the live
  dispatch loop (`tick`).
- `worker-automation-toggle` payload: `{ on, expected_revision }` — atomically
  aligns `auto_advance` and `auto_merge`; OFF also clears ordinary waiting merge
  entries while preserving active and resolution-bound work.
- `worker-auto-repair-toggle` payload: `{ on, expected_revision }` — the
  INDEPENDENT RepoOperation repair axis (master spec §9.3). It neither reads nor
  writes `auto_advance`/`auto_merge`, and neither of those writes it. OFF blocks
  NEW automatic repair dispatch only: a repair session already running is never
  stopped by this mutation. ON reconciles eligible failed operations immediately
  rather than waiting for the periodic pass. Reply carries the authoritative
  `queue` like every other CAS mutation.
- `worker-repo-operation-repair` payload: `{ operation_id }` — the per-failure
  resolve click (master spec §10). Not a retry: the server dispatches a repair
  session through the coordinator, and a NEW attempt exists only after that
  session produced evidence. Reply `{ ok, reason?, attempt_id, queue }`;
  `reason` is the coordinator's refusal code (`repo_operation_not_failed`,
  `repair_chain_closed`, `repair_session_unavailable`,
  `repair_owner_unresolved`, a scheduler reason such as
  `worktree_missing`/`bead_running`, …).
- The `worker-queue-snapshot` carries `auto_repair: boolean` — the durable value
  of that axis; an absent key on a legacy queue reads as ON.
- The `worker-queue-snapshot` carries `repo_operation_policy` — the projection
  of the PINNED contract copy `generated/contracts/repo-operation-policy.json`
  (an exact byte copy of the dotfiles artifact, with its source commit and
  digest in the sibling provenance file). Shape:
  `{ schema_version, supported: boolean, source_commit, digest, worker_automatic: string[], auto_repair: { default, scope, resolution_subject, resolution_ladder: Record<string,unknown>[], manual_human_fix }, completion_chain: Record<string,string>, repair_session_packet: string[], resolution_entry_surface, never_automatic: string[] }`.
  The lists and the ladder are the contract vocabulary VERBATIM: membership is
  decided by the contract alone, never by server or client code. A client
  renders each token through a display dictionary and MUST fall back to the raw
  token, so a contract that gains an entry shows up without a client change.
  `supported` is the consumer decoder guard: it is `false` whenever
  `schema_version` is anything other than `2`, and a client MUST then render the
  schema-mismatch notice instead of the ladder. `supported: false` stops the
  AUTOMATIC ladder steps only — the user-triggered resolution entry stays
  available, which is why a failed card keeps its resolve button either way.
- The `worker-queue-snapshot` carries `repo_operations` — the operation cards,
  newest `requested_at` first. Each card:
  `{ operation_id, kind: 'verify'|'deploy', repo_id, target_base, target_sha, target_tree, effective_base_sha, script_path, script_blob_sha, script_mode, state: 'queued'|'running'|'succeeded'|'failed'|'repairing'|'retry_pending', requested_at, started_at, finished_at, elapsed_ms, exit_code, signal, log_path, log_digest, output_tail, subjects, failure, failure_kind, verify_stage, repair_eligible, repair: { chain_id, owner_bead, auto_budget, auto_used, remaining, session_id, attempt_id, attempt_status, ladder_stage }, retry: { status, first_fingerprint, blocked_reason, absorbed }, dismissed, superseded_by }`.
  `output_tail` and `failure.detail` are SANITIZED (credential-shaped substrings
  redacted) and the tail is bounded — the full log stays behind `log_path`.
  `failure_kind` is a DISPLAY token, not an eligibility verdict: it is
  `verify_script_failure`, `deploy_script_failure`,
  `interrupted_without_terminal_exit`, or — for every other failure — the raw
  `failure.code`. There is no `other` token and no allowlist behind it; under
  contract v2 every unresolved terminal failure is repair-eligible, so
  `repair_eligible` is true for any failed card that is not superseded. The
  token selects the card's resolve button wording, and a client MUST fall back
  to a generic resolve label for an unknown token; there is deliberately no
  generic retry affordance. `retry.status` reports the first ladder step's
  outcome (`unconsumed`, `consumed`, `absorbed`, `not_applicable`) and
  `repair.ladder_stage` the durable stage the subject has reached. `dismissed`
  removes a row from the 해결 필요 tally and from the AUTOMATIC ladder steps
  only — the resolve button stays. A record that cannot be read as a complete
  operation is DROPPED rather than projected partially.
- `cleanup_failed` rows that stop the cleanup cursor are OVERLAID at projection
  time with `subject_id`, `repair_eligible: true`, and the same
  `repair: { chain_id, auto_used, auto_budget, remaining, ladder_stage, … }`
  shape an operation card carries, so a failure recorded on that surface has the
  same resolve entry. No durable state is migrated. A bead that already owns a
  failed operation record is NOT overlaid, because the operation record carries
  the more specific failure facts.
- `worker-queue-set-slots` payload: `{ slots, expected_revision }` — the
  concurrency cap (lower bound 1).
- `worker-queue-set-pr-wait-hold` payload: `{ on, expected_revision }` — when
  enabled, forces the effective concurrency cap to 1 through PR merge cleanup
  while preserving the stored `slots` preference for later restoration.
- `worker-queue-remove` payload: `{ bead_id, expected_revision }`
- `worker-attempt-pause` payload: `{ attempt_id }` — pauses (⏸) a running
  attempt while preserving its resumable state. Reply
  `{ attempt_id, paused, phase, reason }` exposes the durable control phase
  (`done` when the pause has settled).
- `worker-attempt-resume` payload:
  `{ attempt_id, expected_revision, continuation?, decision_token? }` — ▶ on a
  paused/failed/orphaned attempt; cap-exempt (human-originated).
- `worker-attempt-dismiss` payload: `{ attempt_id, expected_revision }` — the
  failure banner's ✕: stamps `dismissed_at` on a `failed`/`orphaned` attempt so
  it stops reading as an unhandled failure. Reply
  `{ attempt_id, dismissed, conflict, reason, queue }`; `reason` is
  `attempt_not_found` / `not_dismissable` / `already_dismissed`.
- `worker-merge-queue-add` payload:
  `{ bead_id, expected_revision, continuation?, decision_token? }` — the
  `[머지]` click (UI-5v7d §3). It QUEUES rather than merges: the durable
  `merge_queue` is FIFO and one server-side driver merges its head, so two
  clicks never merge at once. Everything the direct click used to derive stays
  in the driver's `merge()` call — click-time `gh` re-read, gate re-evaluation
  against the observed head SHA, BEHIND update-branch, DIRTY resolution dispatch
  — so the snapshot badges remain ADVISORY. Reply:
  `{ bead_id, applied, conflict, queued, queue }`; queuing a bead that is
  already queued is a no-op (`applied:false`). A durable cross-runner
  `continuation_action` reuses this message to bind `prior_session` or
  `fresh_current` to the server-issued token before the driver resumes.
- `worker-merge-queue-add-all` payload: `{ expected_revision }` — the lane
  header's `[일괄 머지]`: the SERVER picks every currently mergeable `pr_wait`
  row (the same disjuncts the row's `merge_enabled` uses, external rows
  included) and queues them in lane order in one CAS write. Reply
  `{ applied, conflict, queued, queue }` where `queued` is how many rows were
  actually added.
- `worker-merge-queue-remove` payload: `{ bead_id, expected_revision }`, or
  `{ all: true, expected_revision }` — `[취소]` on a WAITING item, and with
  `all` the header's `[일괄 머지 중단]`, which drops every waiting item in ONE
  server-side write (per-row removal would let the active item finish in between
  and promote a waiter whose own removal then refuses). The ACTIVE item is never
  removed; asking for it by id refuses with `reason:'merge_active'`, since its
  merge is already running against GitHub. Reply
  `{ bead_id, applied, conflict, reason, queue }`.
- The `worker-queue-snapshot` carries the queue as `merge_queue`
  (`[{ bead_id, resolution_rounds, resolution?, continuation_action? }]`,
  durable order). The optional `resolution` projection is the exact durable wait
  record (`attempt_id`, `subject_bead_id`, `deadline_at`, `state`, `yielded_at`,
  `settled_at`); older snapshots may omit it. A non-persisted
  `merge_queue_state` = `{ active, failures }` says which item the driver is on
  and why each skipped one failed.
- `worker-revise-fix` accepts the same optional
  `{ continuation, decision_token }` pair as attempt resume.
- Attempt-derived replies may carry `continuation_mismatch` with prior/current
  execution tuples, `prior_available`, and a decision token. The client never
  computes a tuple or reuses a stale token after a CAS conflict.
- `worker-discard` payload:
  `{ bead_id, attempt_id?, operation_id?, expected_revision }` — creates or
  reuses one durable, restart-safe discard operation. It validates the latest
  leaf attempt or worker-owned PR row, archives the exact source before
  destructive effects, fences dispatch/merge, and advances by authoritative
  readback. Reply:
  `{ bead_id, operation_id, accepted, discarded, pending, reused, conflict, phase, reason, receipt, queue }`;
  `pending:'merged_revert'` means the PR was merged during observation and the
  operation is waiting for the revert lifecycle. A displayed `operation_id`
  retries that exact failed durable operation after one CAS re-sync. Terminal
  `receipt` preserves the archive path plus UI-safe original/revert PR links in
  the success toast after the completed operation leaves active snapshots.
- `worker-pr-discard` and `worker-attempt-stop` are retired protocol names. The
  server replies `{ ok:false, error:{ code:'action_retired' } }` and never
  mutates state; active clients use `worker-discard` exclusively.

Every queue mutation replies `{ applied, conflict, queue }`; a stale
`expected_revision` yields `conflict:true` + the current queue for re-sync.

## Session-log (transcript) channel (spec §5.6)

Streams a per-attempt raw runner event stream to the transcript viewer.

- `subscribe-session-log` payload: `{ id: client_id, attempt_id }` — replies
  `ok`, then pushes a `session-log-snapshot`; a live attempt then pushes
  `session-log-append` per new event. A Done/Failed attempt is snapshot-only.
- `unsubscribe-session-log` payload: `{ id: client_id }`.
- `session-log-snapshot` (push) payload:
  `{ id, attempt_id, lines:[…], last_event_at }` — the persisted raw jsonl
  events plus the log file's mtime in epoch ms (`null` when the file cannot be
  stat'd). The raw events carry no timestamp, so this is where the drawer's
  "얼마 전에 움직였나" starts; live appends are stamped client-side on receipt.
- `session-log-append` (push) payload: `{ id, attempt_id, event }` — one raw
  event.

## Prompt inspection (UI-rxp3 §4/§5)

Read-only, request/response. The recorded prompts are multi-kilobyte and almost
never rendered, so they are STRIPPED from the worker-queue push
(`attemptsWithUsage`) and fetched only when a reader opens them. Workspace scope
is the connection's own workspace, exactly like `subscribe-session-log`.

- `get-attempt-prompt` payload: `{ attempt_id }` — replies
  `{ attempt_id, system_prompt, task_prompt, recorded_at }`, or
  `{ missing: true }` for an attempt recorded before the fields existed (or one
  of another workspace). `recorded_at` is the attempt's `started_at` in epoch
  ms.
- `get-bead-prompt` payload: `{ bead_id }` — the same record for the bead's
  NEWEST attempt that recorded one. A bead that was never dispatched replies
  `{ missing: true, default_task_prompt }` — what the next dispatch would send,
  so the panel can preview it without holding a copy of the text.
- `get-worker-system-prompt` payload: `{}` — replies
  `{ target_base_placeholder, system_prompt, variants:[{ key, label, condition, system_prompt }] }`.
  Assembled server-side through `runner/preamble.js`, the single owner of the
  contract text; `system_prompt` is the dispatch default (`fast_track`,
  PR-submitting) and `variants` carries each conditional shape with the
  condition that selects it.

## Removed (historical)

`list-issues`, `epic-status`, `list-ready`, `subscribe-updates` /
`issues-changed`, and `update-workflow-settings` were removed. Use the
subscription push protocol and `update-exec-settings` instead.

## Errors

Errors follow `{ code, message, details? }`. Common codes: `bad_request`
(malformed payload / unknown type), `not_found`, `bd_error`, `unknown_type`.
