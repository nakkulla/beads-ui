#!/usr/bin/env node
/**
 * UI verification fixture server (UI-dbn6 Phase 1). Serves `app/` (the built
 * `main.bundle.js` and the page with its bootstrap config) and a WebSocket
 * subset of the real protocol over an in-memory 8-repo fixture: the five
 * pipeline lanes, a grace chip, an external wait, a PR wait and a done row.
 *
 * Queue mutations (`worker-queue-reorder`·`-place`·`-remove`·`-start-now`)
 * change the fixture queue, bump that repo's `revision`, reply with the new
 * queue and push keyed patches exactly like the server (`*-snapshot` first,
 * `*-patch` with `seq` after). Every other op answers `ok`. It never runs
 * `bd`, never reads `~/.local/state`, and never starts a Worker.
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
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

/**
 * @param {number} index
 * @returns {string}
 */
function letterOf(index) {
  return String.fromCharCode('A'.charCodeAt(0) + index);
}

/**
 * A workflow projection whose band lights `spec` done and `plan` current.
 *
 * @param {'spec'|'plan'|'impl'|'pr'} current
 * @returns {Record<string, any>}
 */
function workflowAt(current) {
  const order = ['spec', 'plan', 'impl', 'pr', 'merge'];
  const at = order.indexOf(current);
  /** @type {Record<string, any>} */
  const stages = {};
  order.forEach((key, index) => {
    stages[key] = {
      fill: index < at ? 'full' : index === at ? 'dim' : 'none'
    };
  });
  return { route: 'spec_backed', stages };
}

/**
 * The fixture's pipeline: `repos` workspaces with every lane populated.
 *
 * @param {{ now?: number, repos?: number }} [options]
 * @returns {{ workspaces: Array<Record<string, any>>, workspaces_state: Array<Record<string, any>> }}
 */
export function buildPipelineFixture(options = {}) {
  const now = typeof options.now === 'number' ? options.now : Date.now();
  const count = typeof options.repos === 'number' ? options.repos : 8;
  /** @type {Array<Record<string, any>>} */
  const workspaces = [];
  /** @type {Array<Record<string, any>>} */
  const workspaces_state = [];
  for (let index = 0; index < count; index++) {
    const letter = letterOf(index);
    const name = `repo-${letter.toLowerCase()}`;
    const root_dir = `/fixture/${name}`;
    const id = (/** @type {number} */ n) => `${letter}-${n}`;
    /** @type {Record<string, string>} */
    const bead_titles = {};
    /** @type {Record<string, any>} */
    const bead_workflow = {};
    /** @type {Record<string, any>} */
    const bead_overlay = {};
    const title = (/** @type {number} */ n, /** @type {string} */ text) => {
      bead_titles[id(n)] = `${text} (${name})`;
      bead_overlay[id(n)] = {
        route: 'spec_backed',
        metadata: {},
        priority: n % 4,
        issue_type: n % 3 === 0 ? 'bug' : 'task',
        labels: n % 2 === 0 ? ['frontend'] : ['backend']
      };
      return bead_titles[id(n)];
    };
    title(1, '대기 첫 항목 — 헤더 정렬');
    title(2, '대기 둘째 항목 — 외부 작업 대기');
    title(3, '대기 셋째 항목');
    title(4, '실행 중 — 레인 모델 분할');
    title(5, 'PR 대기 — 칩 문법 정리');
    title(6, '완료 — 모바일 레인 바');
    title(7, '직렬 레인 항목');
    bead_workflow[id(1)] = workflowAt('plan');
    bead_workflow[id(2)] = workflowAt('impl');
    bead_workflow[id(3)] = workflowAt('spec');
    bead_workflow[id(4)] = workflowAt('impl');
    bead_workflow[id(5)] = {
      ...workflowAt('pr'),
      chips: {
        pr: { number: 300 + index, url: `https://example.test/pr/${index}` }
      }
    };
    bead_workflow[id(6)] = {
      ...workflowAt('pr'),
      stages: {
        ...workflowAt('pr').stages,
        pr: { fill: 'full' },
        merge: { fill: 'full' }
      }
    };
    const runnable = [10, 11, 12].map((n, k) => ({
      bead_id: id(n),
      title: `후보 ${k + 1} — 설정 탭 목적별 정리 (${name})`,
      route: k === 1 ? 'quick_fix' : 'spec_backed',
      spec_id: k === 1 ? '' : `docs/superpowers/specs/2026-09-2${k}-${name}.md`,
      published: k !== 1,
      blocked: false,
      blocked_by: [],
      labels: k === 0 ? ['frontend', 'complex'] : ['backend'],
      priority: k,
      issue_type: k === 2 ? 'bug' : 'task',
      created_at: now - (k + 1) * 86_400_000,
      updated_at: now - (k + 1) * 3_600_000,
      status: 'open',
      workflow: workflowAt(k === 1 ? 'impl' : 'spec')
    }));
    /** @type {Array<Record<string, any>>} */
    const queue = [
      { bead_id: id(1), added_at: index === 0 ? now - 5_000 : now - 600_000 },
      { bead_id: id(2), added_at: now - 900_000 },
      { bead_id: id(3), added_at: now - 1_200_000 }
    ];
    /** @type {Array<Record<string, any>>} */
    const external_waits = [];
    /** @type {Array<Record<string, any>>} */
    const wait_reasons = [];
    if (index === 1) {
      const wait_id = 'w-0123456789ab';
      external_waits.push({
        wait_id,
        root_dir,
        bead_id: id(2),
        owner_kind: 'worker',
        stage: 'detached',
        budget: { turns_total: 3, turns_used: 1 },
        registered_at: new Date(now - 3_600_000).toISOString(),
        next_observation_at: new Date(now + 120_000).toISOString(),
        error_count: 0,
        last_error: null,
        jobs: [
          {
            adapter: 'slurm',
            ssh_host: 'wallace',
            job_id: '42',
            submitted_at: new Date(now - 3_600_000).toISOString(),
            log_path: '/logs/job.log',
            state: 'RUNNING',
            observed_at: new Date(now - 60_000).toISOString(),
            terminal: null
          }
        ],
        completion: null,
        resume: null
      });
      wait_reasons.push({
        kind: 'external_job',
        subject: { bead_id: id(2), root_dir },
        headline: 'wallace 작업 42 · RUNNING',
        release: '완료되면 같은 세션을 이어간다',
        verdict: 'normal',
        targets: [],
        actions: [
          {
            op: 'external_wait_check',
            label: '[지금 확인]',
            placement: 'card',
            payload: { root_dir, wait_id }
          },
          {
            op: 'external_wait_stop',
            label: '[관찰 중단]',
            placement: 'card',
            confirm: '대기 키를 지웁니다. 계속할까요?',
            payload: { root_dir, wait_id }
          }
        ]
      });
    }
    const attempt_id = `${id(4)}-1700000000-1`;
    const revision = 10 + index;
    workspaces.push({
      root_dir,
      name,
      revision,
      auto_advance: index === 0,
      queue,
      serial_lanes:
        index === 0
          ? [
              {
                id: 's1',
                entries: [{ bead_id: id(7), added_at: now - 60_000 }]
              }
            ]
          : [],
      serial_lane_count: index === 0 ? 1 : 0,
      pr_wait: [{ bead_id: id(5), added_at: now - 7_200_000 }],
      done: [{ bead_id: id(6), added_at: now - 1_800_000 }],
      runnable,
      attempts: {
        [attempt_id]: {
          attempt_id,
          bead_id: id(4),
          status: 'running',
          started_at: now - 1_500_000,
          runner: 'claude',
          model: 'opus',
          effort: 'high'
        }
      },
      admission: {},
      pr_observations: {
        [id(5)]: {
          pr: {
            number: 300 + index,
            url: `https://example.test/pr/${index}`,
            state: 'OPEN',
            head_sha: `abc${index}`
          }
        }
      },
      bead_titles,
      bead_workflow,
      bead_overlay,
      external_waits,
      wait_reasons
    });
    workspaces_state.push({
      root_dir,
      name,
      auto_advance: index === 0,
      auto_merge: false,
      slots: 2,
      revision,
      issue_prefix: letter,
      serial_lane_count: index === 0 ? 1 : 0,
      counts: { running: 1, pr_wait: 1, queue: 3, runnable: 3 },
      orchestration_model: 'sonnet',
      session_defaults: {},
      execution_defaults: {
        supported: true,
        schema_version: 1,
        source_commit: 'fixture',
        digest: 'fixture',
        session: { impl_runtime: 'claude' },
        orchestration: {
          runtime: 'claude',
          model: 'sonnet',
          model_id: 'claude-sonnet',
          effort: null,
          speed: null
        }
      }
    });
  }
  return { workspaces, workspaces_state };
}

/**
 * The worker-queue view of one fixture repo (the reply `queue` of a mutation
 * and the `worker-queue-snapshot` body).
 *
 * @param {Record<string, any>} row
 * @param {Record<string, any>} state
 * @returns {Record<string, any>}
 */
export function queueViewOf(row, state) {
  return {
    revision: row.revision,
    auto_advance: state.auto_advance,
    auto_merge: state.auto_merge,
    slots: state.slots,
    serial_lane_count: state.serial_lane_count,
    queue: row.queue,
    serial_lanes: row.serial_lanes,
    pr_wait: row.pr_wait,
    done: row.done,
    attempts: row.attempts,
    admission: row.admission,
    cleanup_failed: {},
    bead_titles: row.bead_titles,
    workspace_info: { slots: state.slots, base: 'main' }
  };
}

/**
 * Apply one queue mutation to the fixture. Returns whether it applied.
 *
 * @param {Record<string, any>} row
 * @param {string} type
 * @param {Record<string, any>} payload
 * @returns {boolean}
 */
export function applyQueueOp(row, type, payload) {
  const bead_id = String(payload.bead_id || '');
  /** @type {Array<{ entries: Array<Record<string, any>>, lane: string|null }>} */
  const lanes = [
    { entries: row.queue, lane: null },
    ...row.serial_lanes.map((/** @type {any} */ lane) => ({
      entries: lane.entries,
      lane: lane.id
    }))
  ];
  const holder = lanes.find((entry) =>
    entry.entries.some((item) => item.bead_id === bead_id)
  );
  const take = () => {
    if (!holder) {
      return { bead_id, added_at: Date.now() };
    }
    const at = holder.entries.findIndex((item) => item.bead_id === bead_id);
    return holder.entries.splice(at, 1)[0];
  };
  /** @param {string|null|undefined} lane */
  const target = (lane) =>
    lanes.find((entry) => entry.lane === (lane || null)) || null;
  if (type === 'worker-queue-reorder') {
    const dest = target(payload.lane ?? holder?.lane);
    if (!holder || !dest) {
      return false;
    }
    const entry = take();
    const index = Math.max(
      0,
      Math.min(Number(payload.to_index) || 0, dest.entries.length)
    );
    dest.entries.splice(index, 0, entry);
    return true;
  }
  if (type === 'worker-queue-place') {
    const dest = target(payload.lane);
    if (!dest) {
      return false;
    }
    const entry = take();
    row.runnable = row.runnable.filter(
      (/** @type {any} */ item) => item.bead_id !== bead_id
    );
    const index =
      typeof payload.index === 'number'
        ? Math.max(0, Math.min(payload.index, dest.entries.length))
        : dest.entries.length;
    dest.entries.splice(index, 0, entry);
    return true;
  }
  if (type === 'worker-queue-remove' || type === 'worker-queue-start-now') {
    if (!holder) {
      return false;
    }
    take();
    return true;
  }
  return false;
}

/**
 * @param {Record<string, any>} issue
 * @returns {Record<string, any>}
 */
function detailIssue(issue) {
  return {
    id: issue.id,
    title: issue.title,
    status: 'open',
    priority: 2,
    issue_type: 'task',
    description: '픽스처 이슈',
    labels: [],
    dependencies: [],
    dependents: [],
    comments: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

/**
 * Start the fixture server on 127.0.0.1 (`port: 0` picks a free port).
 *
 * @param {{ port?: number, now?: number }} [options]
 * @returns {Promise<{ port: number, close: () => Promise<void>, state: () => ReturnType<typeof buildPipelineFixture> }>}
 */
export async function startFixtureServer(options = {}) {
  const fixture = buildPipelineFixture({ now: options.now });
  let current = fixture.workspaces[0].root_dir;
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
    const body = { root_dir: row.root_dir, queue: queueViewOf(row, state) };
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
          workspaces: fixture.workspaces.map((row) => ({
            path: row.root_dir,
            database: `${row.root_dir}/.beads`
          })),
          current: { root_dir: current, db_path: `${current}/.beads` },
          hidden: []
        });
        return;
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
          {
            revision: 1,
            presets: [],
            chip_bindings: {}
          }
        );
        return;
      case 'subscribe-model-visibility':
        ok({});
        push(
          ws,
          String(payload.id || 'model-visibility'),
          'model-visibility-snapshot',
          {
            revision: 1,
            disabled_models: ['haiku'],
            runners: {
              claude: [
                { name: 'opus', id: 'claude-opus' },
                { name: 'sonnet', id: 'claude-sonnet' },
                { name: 'haiku', id: 'claude-haiku' }
              ],
              codex: [{ name: 'gpt-5', id: 'gpt-5' }]
            }
          }
        );
        return;
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
              title: row?.bead_titles?.[bead_id] || bead_id
            })
          ];
        }
        ok({ id: client_id });
        push(ws, client_id, 'snapshot', { revision: 1, issues });
        return;
      }
      case 'get-comments':
        ok([]);
        return;
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
            queue: queueViewOf(row, state)
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
        ok({ applied, queue: queueViewOf(row, state) });
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
