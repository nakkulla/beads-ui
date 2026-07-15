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
- 🤖 **Worker tab** – A session queue console: drag Board candidates into the
  Serial / Parallel lanes, ▶/⏸ auto-advance, live running-session tiles, and a
  circuit-breaker banner on failure.
- 🎞️ **Transcript viewer** – Click a running tile (or a session-history row) to
  open the session drawer: parsed assistant / tool / gate / phase lines with
  live-follow for a running attempt and the same viewer for a Done/Failed log.
- 🗂️ **Detail panel** – id/title/deps/workflow, Artifacts (open the embedded
  markdown viewer), the 5-key execution settings + `workflow_mode` editor, and
  the session history.
- 📺 **Live updates** – A single WebSocket per-subscription push protocol
  (`snapshot`/`upsert`/`delete`); no polling.
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

### Token authentication

Tailscale binding is network isolation, not authentication. Mutating WebSocket
messages and the worker/doc REST surfaces are gated by a **token**. Set it in
`config.toml`:

```toml
[auth]
token = "a-long-random-secret"
```

When a token is configured, the UI prompts for it once and stores it locally,
then sends it as the first WebSocket frame. `/healthz` and the static assets
stay unauthenticated. As defense-in-depth against browser cross-site WS hijacks,
browser sockets must additionally present an acceptable `Origin`: a
**same-origin** request (the `Origin`'s host:port equals the request `Host` —
i.e. the page was served by this same server, which covers the tailscale-IP
deployment) is accepted, as is any origin listed in `BDUI_ALLOWED_ORIGINS`
(comma-separated). With no allowlist configured, only loopback dev origins are
accepted. Non-browser clients (no `Origin` header) are governed by network
isolation, not this check.

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
