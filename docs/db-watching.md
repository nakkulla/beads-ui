# DB Watching and Resolution

The server watches the resolved workspace database target for changes and
schedules a refresh of active list subscriptions. Clients receive
`snapshot`/`upsert`/`delete` envelopes for their active subscriptions.

The canonical deployment keeps issue data in a central Dolt server, not in a
per-repo file. Local file events cannot observe a write another machine made
there, so watching is one of two refresh paths and never the only one — see
[Periodic Refresh](#periodic-refresh).

## Resolution Order

`server/db.js` resolves the target to match beads CLI precedence:

1. `--db <path>` flag (when forced by the server configuration)
2. `BEADS_DB` environment variable
3. Nearest `.beads/*.db` by walking up from the server `root_dir`
4. Nearest `.beads/metadata.json` by walking up — a metadata-backed (non-SQLite,
   e.g. Dolt) workspace resolves to that `.beads` **directory**
5. `~/.beads/default.db` fallback

Step 3 stops at a workspace boundary: a `.beads` directory that has
`metadata.json` but no local `*.db` ends the upward walk, so a metadata-backed
workspace never borrows an ancestor workspace's SQLite database.

The SQLite compatibility path is supported, not retired. `server/bd.js` injects
`BEADS_DB` into `bd` invocations **only** when the nearest resolution found a
SQLite file that exists; otherwise the CLI performs its own resolution and no
database override is forced.

## What the Watcher Binds

`server/watcher.js` binds according to what the resolution returned:

- **SQLite file** — watches the file's parent directory and filters events by
  the database file name.
- **`.beads` directory** (metadata-backed workspace) — watches that directory.

Events are debounced (250 ms by default) with a short cooldown after each
refresh, and the watcher rebinds when the workspace or configuration changes at
runtime.

## Periodic Refresh

Because a central-server write leaves no local filesystem event, the server also
refreshes active subscriptions on a timer (`poll_interval_seconds`, default 30,
`0` disables it). This is the complementary path for remote changes, not a
fallback for a broken watcher.

## Behavior When Missing

If nothing exists at the resolved path, the server logs a clear warning and
still attempts to bind a watcher on the containing directory. Initializing or
recovering a beads workspace is owned by the beads runtime setup procedure for
that repository — follow it rather than running ad-hoc initialization commands
against the central database from here. Once the workspace resolves, changes are
detected without restarting the server.
