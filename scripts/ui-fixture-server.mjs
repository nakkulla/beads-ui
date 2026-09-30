#!/usr/bin/env node
/**
 * UI verification fixture server (UI-dbn6 Phase 1). Serves `app/` (the built
 * `main.bundle.js` and the page with its bootstrap config) and a WebSocket
 * subset of the real protocol over an in-memory 8-repo fixture: the five
 * pipeline lanes, a grace chip, an external wait, a PR wait and a done row
 * (`ui-fixture-data.mjs`), plus the P1-r2 restored-surface material
 * (`ui-fixture-rich.mjs`: long IDs, delegations, conversation states, PR rows
 * across the status vocabulary, 막힘 reasons, a serial cycle, presets).
 *
 * Queue mutations (`worker-queue-reorder`·`-place`·`-remove`·`-start-now`)
 * change the fixture queue, bump that repo's `revision`, reply with the new
 * queue and push keyed patches exactly like the server (`*-snapshot` first,
 * `*-patch` with `seq` after). The issue detail's reads (Phase 2) answer from
 * the same fixture: the `issue-detail` list snapshot, `get-comments`,
 * `get-bead-prompt`, `get-session-refs`, `get-bead-timeline` (with a finished
 * attempt), `get-session-defaults`, `get-workspace-accounts`,
 * `get-attempt-prompt`, `subscribe-session-log` (a finished transcript) and
 * `GET /api/doc`·`/api/claude-usage`·`/api/codex-usage` (two accounts each,
 * one near its limit) and `POST /api/{claude,codex}-account/switch` (`ok`).
 * `subscribe-impl-presets` answers three named presets. Phase 3
 * (`ui-fixture-p3.mjs`): the settings reads and writes (`get-session-defaults`
 * with a Worker address, `get-workspace-accounts`, `set-session-defaults`,
 * `set-worker-url-common`, `impl-preset-*`, `apply-impl-preset-global`,
 * `get-worker-system-prompt`, `model-visibility-set` with its CAS and
 * refusals, `set-workspace-visibility` over a registry with one hidden repo),
 * `subscribe-adr` (an `adr-snapshot` push), `get-compare` and the repo-ops
 * declaration / timeline of the queue view. Every other op answers `ok`. It
 * never runs `bd`, never reads `~/.local/state`, and never starts a Worker.
 *
 * Usage: node scripts/ui-fixture-server.mjs [--port 3101]
 * Binds 127.0.0.1 only.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocketServer } from 'ws';
import {
  canonicalJson,
  splitMonitorPipeline,
  splitWorkerQueue
} from '../app/data/keyed-patch.js';
import { DEFAULT_PROBLEM_CRITERIA } from '../app/utils/compare-problem-criteria.js';
import {
  applyQueueOp,
  detailIssue,
  queueViewOf,
  transcriptLines
} from './ui-fixture-data.mjs';
import {
  adrSnapshot,
  compareSnapshot,
  createModelVisibility,
  enrichRepoOps,
  presetSnapshotP3,
  sessionDefaultsReply,
  withRepoOps,
  workspaceAccountsReply
} from './ui-fixture-p3.mjs';
import { buildRichFixture, usageSnapshot } from './ui-fixture-rich.mjs';

const REPO_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const APP_DIR = path.join(REPO_ROOT, 'app');
const HOST = '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

/**
 * Start the fixture server on 127.0.0.1 (`port: 0` picks a free port).
 *
 * @param {{ port?: number, now?: number }} [options]
 * @returns {Promise<{ port: number, close: () => Promise<void>, state: () => ReturnType<typeof buildRichFixture> }>}
 */
export async function startFixtureServer(options = {}) {
  const started_at = typeof options.now === 'number' ? options.now : Date.now();
  const fixture = buildRichFixture({ now: options.now });
  enrichRepoOps(fixture, started_at);
  let current = fixture.workspaces[0].root_dir;
  const model_visibility = createModelVisibility();
  /** @type {Set<{ ws: import('ws').WebSocket, client_id: string }>} */
  const visibility_subs = new Set();
  let presets = presetSnapshotP3();
  const worker_common = {
    value: 'http://100.64.0.12:3000',
    revision: 'rev-1'
  };
  /** A registered repository the fixture keeps hidden (settings 저장소 list). */
  const HIDDEN_REPO = '/fixture/repo-archive';
  /** @type {Set<string>} */
  const hidden = new Set([HIDDEN_REPO]);
  /** @type {Set<{ ws: import('ws').WebSocket, client_id: string, seq?: number, last?: Map<string, string|undefined> }>} */
  const monitor_subs = new Set();
  /** @type {Set<{ ws: import('ws').WebSocket, client_id: string, root_dir: string, seq?: number, last?: Map<string, string|undefined> }>} */
  const queue_subs = new Set();

  /**
   * @param {Record<string, any>} sub
   * @param {'monitor-pipeline'|'worker-queue'} channel
   * @param {Record<string, any>} body
   * @param {Map<string, any>} values
   */
  function pushKeyed(sub, channel, body, values) {
    /** @type {Map<string, string|undefined>} */
    const canonical = new Map(
      [...values].map(([key, value]) => [key, canonicalJson(value)])
    );
    const first = sub.last === undefined;
    /** @type {Record<string, unknown>} */
    const set = {};
    /** @type {string[]} */
    const unset = [];
    if (!first) {
      for (const [key, text] of canonical) {
        if (sub.last.get(key) !== text) {
          set[key] = values.get(key);
        }
      }
      for (const key of sub.last.keys()) {
        if (!canonical.has(key)) {
          unset.push(key);
        }
      }
      if (Object.keys(set).length === 0 && unset.length === 0) {
        return;
      }
    }
    const seq = first ? 1 : (sub.seq || 0) + 1;
    const type = `${channel}-${first ? 'snapshot' : 'patch'}`;
    const payload = first
      ? { type, id: sub.client_id, seq, ...body }
      : {
          type,
          id: sub.client_id,
          seq,
          set,
          unset,
          ...(channel === 'worker-queue' ? { root_dir: body.root_dir } : {})
        };
    sub.ws.send(
      JSON.stringify({ id: `evt-${Date.now()}`, ok: true, type, payload })
    );
    sub.seq = seq;
    sub.last = canonical;
  }

  /** @param {Record<string, any>} sub */
  function pushMonitor(sub) {
    const body = {
      workspaces: fixture.workspaces,
      workspaces_state: fixture.workspaces_state
    };
    pushKeyed(sub, 'monitor-pipeline', body, splitMonitorPipeline(body));
  }

  /** @param {Record<string, any>} sub */
  function pushQueue(sub) {
    const row = fixture.workspaces.find(
      (entry) => entry.root_dir === sub.root_dir
    );
    const state = fixture.workspaces_state.find(
      (entry) => entry.root_dir === sub.root_dir
    );
    if (!row || !state) {
      return;
    }
    const body = {
      root_dir: row.root_dir,
      queue: withRepoOps(queueViewOf(row, state), row)
    };
    pushKeyed(sub, 'worker-queue', body, splitWorkerQueue(body));
  }

  function fanout() {
    for (const sub of monitor_subs) {
      pushMonitor(sub);
    }
    for (const sub of queue_subs) {
      pushQueue(sub);
    }
  }

  /**
   * @param {import('ws').WebSocket} ws
   * @param {string} id
   * @param {string} type
   * @param {Record<string, any>} payload
   */
  function push(ws, id, type, payload) {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type,
        payload: { type, id, ...payload }
      })
    );
  }

  /**
   * @param {import('ws').WebSocket} ws
   * @param {{ id: string, type: string, payload?: any }} req
   */
  function handle(ws, req) {
    const payload =
      req.payload && typeof req.payload === 'object' ? req.payload : {};
    /** @param {unknown} body */
    const ok = (body) =>
      ws.send(
        JSON.stringify({ id: req.id, ok: true, type: req.type, payload: body })
      );
    switch (req.type) {
      case 'list-workspaces':
        ok({
          workspaces: [
            ...fixture.workspaces.map((row) => row.root_dir),
            HIDDEN_REPO
          ].map((root_dir) => ({
            path: root_dir,
            database: `${root_dir}/.beads`
          })),
          current: { root_dir: current, db_path: `${current}/.beads` },
          hidden: [...hidden]
        });
        return;
      case 'set-workspace-visibility': {
        const target = String(payload.path || '');
        if (payload.visible === false) {
          hidden.add(target);
        } else {
          hidden.delete(target);
        }
        ok({ hidden: [...hidden] });
        return;
      }
      case 'set-workspace': {
        const next = String(payload.path || '');
        const changed = next !== current;
        current = next;
        ok({
          changed,
          workspace: { root_dir: next, db_path: `${next}/.beads` }
        });
        return;
      }
      case 'subscribe-monitor-pipeline': {
        const client_id = String(payload.id || 'monitor');
        for (const sub of monitor_subs) {
          if (sub.ws === ws && sub.client_id === client_id) {
            monitor_subs.delete(sub);
          }
        }
        const sub = { ws, client_id };
        monitor_subs.add(sub);
        ok({ id: client_id });
        pushMonitor(sub);
        return;
      }
      case 'unsubscribe-monitor-pipeline':
        for (const sub of monitor_subs) {
          if (sub.ws === ws) {
            monitor_subs.delete(sub);
          }
        }
        ok({});
        return;
      case 'subscribe-worker-queue': {
        const client_id = String(payload.id || 'worker:queue');
        for (const sub of queue_subs) {
          if (sub.ws === ws && sub.client_id === client_id) {
            queue_subs.delete(sub);
          }
        }
        const sub = { ws, client_id, root_dir: current };
        queue_subs.add(sub);
        ok({ id: client_id });
        pushQueue(sub);
        return;
      }
      case 'unsubscribe-worker-queue':
        for (const sub of queue_subs) {
          if (sub.ws === ws) {
            queue_subs.delete(sub);
          }
        }
        ok({});
        return;
      case 'subscribe-impl-presets':
        ok({});
        push(
          ws,
          String(payload.id || 'exec:presets'),
          'impl-presets-snapshot',
          presets
        );
        return;
      case 'subscribe-model-visibility': {
        const client_id = String(payload.id || 'model-visibility');
        visibility_subs.add({ ws, client_id });
        ok({});
        push(
          ws,
          client_id,
          'model-visibility-snapshot',
          model_visibility.get()
        );
        return;
      }
      case 'model-visibility-set': {
        const result = model_visibility.set(payload);
        if (!result.ok) {
          ws.send(
            JSON.stringify({
              id: req.id,
              ok: false,
              type: req.type,
              error: {
                code: result.code,
                message: `model-visibility-set: ${result.code}`,
                details: { snapshot: result.snapshot }
              }
            })
          );
          return;
        }
        ok({ snapshot: result.snapshot });
        for (const sub of visibility_subs) {
          push(
            sub.ws,
            sub.client_id,
            'model-visibility-snapshot',
            result.snapshot
          );
        }
        return;
      }
      case 'impl-preset-create':
      case 'impl-preset-update':
      case 'impl-preset-delete':
      case 'impl-preset-bind':
        presets = { ...presets, revision: presets.revision + 1 };
        ok(presets);
        return;
      case 'subscribe-adr':
        ok({ id: String(payload.id || 'adr:snapshot') });
        push(
          ws,
          String(payload.id || 'adr:snapshot'),
          'adr-snapshot',
          adrSnapshot(fixture.workspaces, started_at)
        );
        return;
      case 'get-compare':
        ok(
          compareSnapshot(
            payload,
            fixture.workspaces,
            started_at,
            DEFAULT_PROBLEM_CRITERIA
          )
        );
        return;
      case 'get-worker-system-prompt':
        ok({
          target_base_placeholder: '{target_base}',
          variants: [
            {
              key: 'standard',
              condition: 'workflow_mode = standard',
              text: '너는 이 저장소의 Worker다. 과업 프롬프트의 Bead를 구현한다… (fixture)'
            },
            {
              key: 'quick_fix',
              condition: 'route = quick_fix',
              text: 'quick fix 경로: 스펙 없이 바로 고친다… (fixture)'
            }
          ]
        });
        return;
      case 'set-session-defaults': {
        const state = fixture.workspaces_state.find(
          (entry) => entry.root_dir === String(payload.root_dir || current)
        );
        if (state) {
          state.session_defaults = {
            ...(state.session_defaults || {}),
            ...(payload.values || {})
          };
        }
        ok(sessionDefaultsReply(state, worker_common));
        return;
      }
      case 'set-worker-url-common': {
        worker_common.value = String(payload.value || '');
        worker_common.revision = `rev-${Date.now()}`;
        const state = fixture.workspaces_state.find(
          (entry) => entry.root_dir === String(payload.root_dir || current)
        );
        const reply = sessionDefaultsReply(state, worker_common);
        ok({
          common_saved: true,
          common: reply.worker_url.common,
          worker_url: reply.worker_url
        });
        return;
      }
      case 'subscribe-list': {
        const client_id = String(payload.id || '');
        const kind = String(payload.type || '');
        /** @type {Array<Record<string, any>>} */
        let issues = [];
        if (kind === 'issue-detail') {
          const bead_id = String(payload.params?.id || '');
          const row = fixture.workspaces.find(
            (entry) => entry.root_dir === current
          );
          issues = [
            detailIssue({
              id: bead_id,
              title: row?.bead_titles?.[bead_id] || bead_id,
              workflow: row?.bead_workflow?.[bead_id],
              labels: row?.bead_overlay?.[bead_id]?.labels
            })
          ];
        }
        ok({ id: client_id });
        push(ws, client_id, 'snapshot', { revision: 1, issues });
        return;
      }
      case 'get-comments':
        ok(
          [
            [
              'worker',
              '구현을 시작합니다. 레인 모델 분할부터 봅니다.',
              3_600_000
            ],
            ['ilsun', '모바일 캡처도 같이 부탁합니다.', 600_000]
          ].map(([author, text, ago], index) => ({
            id: `c-${index + 1}`,
            issue_id: String(payload.id || ''),
            author,
            text,
            created_at: new Date(Date.now() - Number(ago)).toISOString()
          }))
        );
        return;
      case 'get-bead-prompt':
        ok({
          recorded_at: Date.now() - 1_500_000,
          task_prompt: `과업: ${String(payload.bead_id || '')} 구현`,
          system_prompt: '시스템 계약 (fixture)'
        });
        return;
      case 'get-session-refs':
        ok({ sessions: [] });
        return;
      case 'get-bead-timeline': {
        const bead_id = String(payload.bead_id || '');
        ok({
          events: [
            {
              at: Date.now() - 3e6,
              kind: 'attempt_started',
              text: '구현 시작'
            },
            { at: Date.now() - 2e6, kind: 'attempt_finished', text: '완료' }
          ],
          attempts: [
            {
              attempt_id: `${bead_id}-1699990000-0`,
              bead_id,
              status: 'done',
              started_at: Date.now() - 3_000_000,
              runner: 'claude',
              model: 'opus',
              effort: 'high',
              session_id: 'sess-fixture-0001'
            }
          ]
        });
        return;
      }
      case 'get-session-defaults': {
        const state = fixture.workspaces_state.find(
          (entry) => entry.root_dir === String(payload.root_dir || current)
        );
        ok({ ...sessionDefaultsReply(state, worker_common), state: 'ready' });
        return;
      }
      case 'get-workspace-accounts':
        ok(workspaceAccountsReply());
        return;
      case 'get-attempt-prompt':
        ok({ missing: true });
        return;
      case 'subscribe-session-log': {
        const client_id = String(payload.id || '');
        ok({ id: client_id });
        push(ws, client_id, 'session-log-snapshot', {
          lines: transcriptLines(),
          last_event_at: Date.now() - 60_000
        });
        return;
      }
      case 'worker-queue-reorder':
      case 'worker-queue-place':
      case 'worker-queue-remove':
      case 'worker-queue-start-now': {
        const root_dir = String(payload.root_dir || current);
        const row = fixture.workspaces.find(
          (entry) => entry.root_dir === root_dir
        );
        const state = fixture.workspaces_state.find(
          (entry) => entry.root_dir === root_dir
        );
        if (!row || !state) {
          ws.send(
            JSON.stringify({
              id: req.id,
              ok: false,
              type: req.type,
              error: { code: 'bad_request', message: 'unknown root_dir' }
            })
          );
          return;
        }
        if (
          typeof payload.expected_revision === 'number' &&
          payload.expected_revision !== row.revision
        ) {
          ok({
            applied: false,
            conflict: true,
            queue: withRepoOps(queueViewOf(row, state), row)
          });
          return;
        }
        const applied = applyQueueOp(row, req.type, payload);
        if (applied) {
          row.revision += 1;
          state.revision = row.revision;
          state.counts = {
            ...state.counts,
            queue:
              row.queue.length +
              row.serial_lanes.reduce(
                (/** @type {number} */ sum, /** @type {any} */ lane) =>
                  sum + lane.entries.length,
                0
              )
          };
        }
        ok({ applied, queue: withRepoOps(queueViewOf(row, state), row) });
        if (applied) {
          fanout();
        }
        return;
      }
      default:
        ok({});
    }
  }

  /**
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   */
  function serveHttp(req, res) {
    const url = new URL(req.url || '/', `http://${HOST}`);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const html = fs
        .readFileSync(path.join(APP_DIR, 'index.html'), 'utf8')
        .replace(
          '</head>',
          `<script>window.__BDUI_BOOTSTRAP__=${JSON.stringify({
            workspace_config: { default_workspace: null }
          })};</script></head>`
        );
      res.writeHead(200, {
        'Content-Type': MIME['.html'],
        'Cache-Control': 'no-store'
      });
      res.end(html);
      return;
    }
    if (url.pathname === '/api/doc') {
      res.writeHead(200, { 'Content-Type': MIME['.json'] });
      res.end(
        JSON.stringify({
          ok: true,
          content: `---\nstatus: approved\n---\n# ${url.searchParams.get('path') || '문서'}\n\n픽스처 문서 본문.\n`
        })
      );
      return;
    }
    if (
      url.pathname === '/api/claude-usage' ||
      url.pathname === '/api/codex-usage'
    ) {
      res.writeHead(200, { 'Content-Type': MIME['.json'] });
      res.end(
        JSON.stringify(
          // anchored at the server start so the reset instants hold still
          // (an idle page must not redraw on an unchanged poll)
          usageSnapshot(
            url.pathname === '/api/claude-usage' ? 'claude' : 'codex',
            started_at
          )
        )
      );
      return;
    }
    if (
      req.method === 'POST' &&
      (url.pathname === '/api/claude-account/switch' ||
        url.pathname === '/api/codex-account/switch')
    ) {
      req.resume();
      res.writeHead(200, { 'Content-Type': MIME['.json'] });
      res.end(JSON.stringify({ ok: true, warnings: [] }));
      return;
    }
    if (url.pathname === '/api/repo-ops-script') {
      const lane =
        url.searchParams.get('lane') === 'verify' ? 'verify' : 'deploy';
      res.writeHead(200, { 'Content-Type': MIME['.json'] });
      res.end(
        JSON.stringify({
          ok: true,
          lane,
          base_sha: url.searchParams.get('base_sha') || '',
          base_ref: 'main',
          path: `repo-ops/script/${lane}`,
          content: [
            '#!/usr/bin/env bash',
            '# 머지 직전 candidate에서 도는 안전망 (fixture)',
            'set -euo pipefail',
            'NODE_MIN="$(jq -r .engines.node package.json)"',
            'if [ -n "${CI:-}" ]; then echo "ci"; fi',
            'npm run tsc && npm run lint',
            "npx vitest run --reporter=dot --testTimeout=120000 # 'quoted'"
          ].join('\n')
        })
      );
      return;
    }
    if (url.pathname === '/api/config') {
      res.writeHead(200, { 'Content-Type': MIME['.json'] });
      res.end(
        JSON.stringify({ workspace_config: { default_workspace: null } })
      );
      return;
    }
    const target = path.normalize(path.join(APP_DIR, url.pathname));
    if (!target.startsWith(APP_DIR + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(target, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': MIME['.json'] });
        res.end('{}');
        return;
      }
      res.writeHead(200, {
        'Content-Type':
          MIME[/** @type {keyof typeof MIME} */ (path.extname(target))] ||
          'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      res.end(data);
    });
  }

  const server = http.createServer(serveHttp);
  const wss = new WebSocketServer({ server, path: '/ws' });
  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      /** @type {any} */
      let req = null;
      try {
        req = JSON.parse(String(data));
      } catch {
        return;
      }
      if (req && typeof req.id === 'string' && typeof req.type === 'string') {
        handle(ws, req);
      }
    });
    ws.on('close', () => {
      for (const sub of monitor_subs) {
        if (sub.ws === ws) {
          monitor_subs.delete(sub);
        }
      }
      for (const sub of queue_subs) {
        if (sub.ws === ws) {
          queue_subs.delete(sub);
        }
      }
      for (const sub of visibility_subs) {
        if (sub.ws === ws) {
          visibility_subs.delete(sub);
        }
      }
    });
  });

  await new Promise((resolve) => {
    server.listen(options.port ?? 3101, HOST, () => resolve(undefined));
  });
  const address = /** @type {import('node:net').AddressInfo} */ (
    server.address()
  );
  return {
    port: address.port,
    state: () => fixture,
    close: () =>
      new Promise((resolve) => {
        for (const client of wss.clients) {
          client.terminate();
        }
        wss.close(() => server.close(() => resolve(undefined)));
      })
  };
}

const is_main =
  typeof process.argv[1] === 'string' &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (is_main) {
  const flag = process.argv.indexOf('--port');
  const port = flag >= 0 ? Number(process.argv[flag + 1]) : 3101;
  if (!fs.existsSync(path.join(APP_DIR, 'main.bundle.js'))) {
    process.stderr.write(
      'app/main.bundle.js is missing — run `npm run build` first\n'
    );
    process.exit(1);
  }
  const handle = await startFixtureServer({ port });
  process.stdout.write(
    `ui-fixture-server listening on http://${HOST}:${handle.port}\n`
  );
  const stop = () => {
    void handle.close().then(() => process.exit(0));
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}
