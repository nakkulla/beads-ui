<h1 align="center">
  Beads UI
</h1>
<p align="center">
  <b>Local UI for the <code>bd</code> CLI – <a href="https://github.com/steveyegge/beads">Beads</a></b><br>
  Collaborate on issues with your coding agent.
</p>
<div align="center">
  <a href="https://www.npmjs.com/package/beads-ui"><img src="https://img.shields.io/npm/v/beads-ui.svg" alt="npm Version"></a>
  <a href="https://semver.org"><img src="https://img.shields.io/:semver-%E2%9C%93-blue.svg" alt="SemVer"></a>
  <a href="https://github.com/mantoni/beads-ui/actions/worflows/ci.yml"><img src="https://github.com/mantoni/eslint_d.js/actions/workflows/ci.yml/badge.svg" alt="Build Status"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/eslint_d.svg" alt="MIT License"></a>
  <br>
  <br>
</div>

## Features

A dark-first control tower with **two tabs** plus a shared detail panel:

- 🏂 **Board tab** – Blocked / Ready / In progress / Resolved / Closed columns
  with a route-driven workflow stepper, drag-to-restatus, and keyboard
  navigation. Click a card to open the shared detail panel.
- 🤖 **Worker tab** – A four-column session queue console (대기 / 실행 중 / PR
  대기 / 완료): drag Board candidates into the single waiting queue, ▶/⏸
  auto-advance with an editable concurrency cap (slots), live running-session
  tiles, and a failure banner. Completion is judged by the SERVER observing an
  open PR for the session's branch — never by the session's self-report — so a
  finished bead lands in **PR 대기** with CI / local-verification / base badges.
  Merging is always a human `[머지]` click, gated on a verification result bound
  to the PR's current head SHA (a stale green never passes). `[폐기]` first
  creates a verified recovery archive under
  `$XDG_STATE_HOME/bdui/<workspace>/discard-backups/<operation-id>`; an unmerged
  PR is then closed and its worktree/branch removed, while an already merged PR
  creates a human-merge-only revert PR. Keep the archive directory intact when
  recovery is needed: verify `COMPLETE` equals `sha256(manifest.json)`, inspect
  the manifest's artifact hashes and modes, run `git bundle verify` (then fetch
  the bundle), and restore `index.patch`/`worktree.patch` plus recorded files
  deliberately. Re-run a failed discard through its displayed `[재시도]` action
  so it resumes the same durable operation. Historical `stopped` attempts are
  read-only; old `worker-attempt-stop` and `worker-pr-discard` clients receive
  `action_retired` and make no changes.
- 🎞️ **Transcript viewer** – Click a running tile (or a session-history row) to
  open the session drawer: parsed assistant / tool / gate / phase lines with
  live-follow for a running attempt and the same viewer for a Done/Failed log.
- 🗂️ **Detail panel** – id/title/deps/workflow, Artifacts (open the embedded
  markdown viewer), the 5-key execution settings + `workflow_mode` editor, and
  the session history.
- 📺 **Live updates** – A single WebSocket per-subscription push protocol
  (`snapshot`/`upsert`/`delete`), plus a server-side periodic refresh
  (`poll_interval_seconds`, default 30, `0` = off) so writes from other machines
  through the central DB surface without a local fs event.
- ⌨️ **Keyboard navigation** – Navigate and edit without touching the mouse.
- 🔀 **Multi-workspace** – Switch between projects via the header dropdown.
- 📱 **Phone-ready** – Columns/lanes stack and the panels/viewers go fullscreen
  at ≤640px (reachable over Tailscale).

## Setup

```sh
npm i beads-ui -g
# In your project directory:
bdui start --open
```

See `bdui --help` for options.

### Access model (no auth)

There is **no token authentication**: bdui is designed for a trusted, private
network (loopback or a Tailscale tailnet with ACLs). Network isolation is the
access boundary — anyone who can reach the port can read and mutate issues, so
never bind it to an untrusted interface.

Two in-app defenses remain for browser-borne (CSRF-style) attacks:

- **WebSocket Origin allowlist** — browser sockets must present an acceptable
  `Origin`: a **same-origin** request (the `Origin`'s host:port equals the
  request `Host` — i.e. the page was served by this same server, which covers
  the tailscale-IP deployment) is accepted, as is any origin listed in
  `BDUI_ALLOWED_ORIGINS` (comma-separated). With no allowlist configured, only
  loopback dev origins are accepted. Non-browser clients (no `Origin` header)
  are governed by network isolation, not this check.
- **REST posture** — mutating REST endpoints require an `application/json` body
  (cross-origin HTML forms cannot produce one) and no CORS headers are served,
  so cross-origin browser reads stay blocked.

A leftover `[auth]` section in `config.toml` is ignored with a one-line startup
warning — remove it.

## Data topology

The canonical Beads database is a single Dolt server (Mac Studio, port `3307`);
every workspace resolves against it, so there is no per-repo local DB to sync.
`/healthz` reports `{ ok, checks: { bd, db, worker } }` for readiness. See
`docs/superpowers/specs/2026-07-15-beads-ui-redesign-mac-studio-canonical-design.md`
for the full design.

## Screenshots

**Board**

![Board view](https://github.com/mantoni/beads-ui/raw/main/media/bdui-board.png)

## Environment variables

- `BD_BIN`: path to the `bd` binary.
- `BDUI_RUNTIME_DIR`: override runtime directory for PID/logs. Defaults to
  `$XDG_RUNTIME_DIR/beads-ui` or the system temp dir.
- `BDUI_FRONTEND_MODE`: `live` forces on-demand bundling for `/main.bundle.js`
  even when `app/main.bundle.js` exists. The default is `static`.
- `HOST`: overrides the bind address (default `127.0.0.1`).
- `PORT`: overrides the listen port (default `3000`).

These can also be set via CLI options: `bdui start --host 0.0.0.0 --port 8080`

## Platform notes

- macOS/Linux are fully supported. On Windows, the CLI uses `cmd /c start` to
  open URLs and relies on Node’s `process.kill` semantics for stopping the
  daemon.

## Developer Workflow

- 🔨 Clone the repo and run `npm install`.
- 🚀 Start the dev server with `npm start`.
- 🔗 Alternatively, use `npm link` to link the package globally and run
  `bdui start` from any project.

### Shared server live mode

When the shared launchd-managed server runs with `BDUI_FRONTEND_MODE=live`:

- changes under `app/**` apply on browser refresh
- changes under `server/**` or `bin/**` require a shared server restart
- the canonical shared-service restart flow is managed outside this repo and is
  tracked separately in `dotfiles-6ch`

## Debug Logging

- The codebase uses the `debug` package with namespaces like `beads-ui:*`.
- Enable logs in the browser by running in DevTools:
  - `localStorage.debug = 'beads-ui:*'` then reload the page
- Enable logs for Node/CLI (server, build scripts) by setting `DEBUG`:
  - `DEBUG=beads-ui:* bdui start`
  - `DEBUG=beads-ui:* node scripts/build-frontend.js`

## License

MIT
