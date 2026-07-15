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

## Connection auth (first frame)

When the server is started with an `[auth] token` (see the README), every new
socket MUST send an **auth frame** as its FIRST message within the auth deadline
(default 5s): `{ type: 'auth', token: string }`. A wrong/missing token, a
non-auth first frame, or a timeout closes the socket with code `4401` before any
other message is processed. `auth` is a connection-layer frame, not a
`MessageType`, so it never appears in a reply. A same-origin/allowlisted
`Origin` is additionally required for browser sockets (defense-in-depth).

`ping` → `{ ok, payload: { ts } }` is available post-auth as a liveness check.

## Issue subscriptions (push protocol)

Read data flows through subscriptions, never one-shot list RPCs.

- `subscribe-list` payload: `{ id: client_id, type, params? }` — starts a
  per-subscription stream; the server replies `ok` then pushes a `snapshot`.
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
  metadata (the 5 keys + `workflow_mode`; `workflow_mode='standard'` unsets the
  override key). Replaces the removed v3 `update-workflow-settings`.
- `create-issue` payload: `{ title, type?, priority?, description? }`
- `delete-issue` payload: `{ id }`
- `dep-add` / `dep-remove` payload: `{ a, b, view_id? }` (`a` depends on `b`).
- `label-add` / `label-remove` payload: `{ id, label }`
- `get-comments` payload: `{ id }`; `add-comment` payload: `{ id, body }`.

## Workspace management

- `list-workspaces`, `get-workspace`, `set-workspace` (`{ path }`),
  `sync-workspace`, `git-pull-workspace`. `workspace-changed` is a server-push
  event when the default workspace changes.

## Worker queue channel (spec §5.1)

Per-workspace subscription + CAS-guarded mutations + a whole-queue push.

- `subscribe-worker-queue` / `unsubscribe-worker-queue` payload: `{ id }`.
- `worker-queue-snapshot` (push) payload: `{ id, queue }` — the full queue
  (`revision`, `auto_advance`, `serial[]`, `parallel[]`, `done[]`, `attempts`).
- `worker-queue-place` payload:
  `{ bead_id, lane:'serial'|'parallel', index?, expected_revision }`
- `worker-queue-reorder` payload:
  `{ bead_id, lane, to_index, expected_revision }`
- `worker-queue-toggle` payload: `{ on, expected_revision }` — persists
  `auto_advance` and, on turn-ON, kicks the live dispatch loop (`tick`).
- `worker-queue-remove` payload: `{ bead_id, expected_revision }`
- `worker-attempt-stop` payload: `{ attempt_id }` — stops (■) a running attempt
  (group-kill + attempt failed + `workflow_mode` revert); replies
  `{ attempt_id, stopped }`.

Every queue mutation replies `{ applied, conflict, queue }`; a stale
`expected_revision` yields `conflict:true` + the current queue for re-sync.

## Session-log (transcript) channel (spec §5.6)

Streams a per-attempt raw runner event stream to the transcript viewer.

- `subscribe-session-log` payload: `{ id: client_id, attempt_id }` — replies
  `ok`, then pushes a `session-log-snapshot`; a live attempt then pushes
  `session-log-append` per new event. A Done/Failed attempt is snapshot-only.
- `unsubscribe-session-log` payload: `{ id: client_id }`.
- `session-log-snapshot` (push) payload: `{ id, attempt_id, lines:[…] }` — the
  persisted raw jsonl events.
- `session-log-append` (push) payload: `{ id, attempt_id, event }` — one raw
  event.

## Removed (historical)

`list-issues`, `epic-status`, `list-ready`, `subscribe-updates` /
`issues-changed`, and `update-workflow-settings` were removed. Use the
subscription push protocol and `update-exec-settings` instead.

## Errors

Errors follow `{ code, message, details? }`. Common codes: `bad_request`
(malformed payload / unknown type), `not_found`, `bd_error`, `unknown_type`.
