#!/usr/bin/env node
/**
 * Measure beads-ui request latency and transfer size against a running server
 * (UI-j2h3 §4.6). Read-only by default.
 *
 * Usage:
 *   node scripts/ws-latency-probe.mjs <host:port> [--idle-ms 60000] [--idle-timeout-ms 300000]
 *   node scripts/ws-latency-probe.mjs <host:port> --apply-preset <preset_id> --repos <root_a,root_b>
 *
 * Read-only measurements:
 *   (1) `get-session-defaults` / `get-workspace-accounts` round trips for every
 *       visible workspace right after `subscribe-monitor-pipeline`;
 *   (2) the same round trips once no push arrived for `--idle-ms`;
 *   (3) the first snapshot's JSON bytes versus the socket bytes received for it
 *       (raw TCP client negotiating permessage-deflate, `net.Socket.bytesRead`);
 *   (4) `GET /main.bundle.js` and `/styles.css` with `Accept-Encoding: gzip`;
 *   (5) `ping` round trips every 250ms during the idle wait (p50/p99/max).
 *
 * Write mode (`--apply-preset` with `--repos`) sends `apply-impl-preset-global`
 * with concurrency 4, and only to a repo whose current applied record already
 * names that preset (a re-apply keeps the kv values and only refreshes
 * `applied_at`). The script sends no other write request.
 */
/* global WebSocket, performance, setInterval, clearInterval, setTimeout, Buffer, process */
import { randomBytes } from 'node:crypto';
import http from 'node:http';
import net from 'node:net';
import zlib from 'node:zlib';

const APPLY_PARALLEL = 4;
const PING_INTERVAL_MS = 250;

/**
 * Parse CLI arguments.
 *
 * @param {string[]} argv
 * @returns {{ target: string, idle_ms: number, idle_timeout_ms: number, apply_preset: string|null, repos: string[] }}
 */
function parseArgs(argv) {
  /** @type {string|null} */
  let target = null;
  let idle_ms = 60_000;
  let idle_timeout_ms = 300_000;
  /** @type {string|null} */
  let apply_preset = null;
  /** @type {string[]} */
  let repos = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--idle-ms') {
      idle_ms = Number(argv[++index]);
    } else if (arg === '--idle-timeout-ms') {
      idle_timeout_ms = Number(argv[++index]);
    } else if (arg === '--apply-preset') {
      apply_preset = argv[++index] || null;
    } else if (arg === '--repos') {
      repos = String(argv[++index] || '')
        .split(',')
        .map((value) => value.trim())
        .filter((value) => value.length > 0);
    } else if (!arg.startsWith('--') && target === null) {
      target = arg;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  if (target === null) {
    throw new Error('usage: ws-latency-probe.mjs <host:port> [options]');
  }
  if ((apply_preset === null) !== (repos.length === 0)) {
    throw new Error('--apply-preset and --repos must be given together');
  }
  return { target, idle_ms, idle_timeout_ms, apply_preset, repos };
}

/**
 * A request/response client over the Node built-in WebSocket.
 *
 * @param {string} target - host:port
 * @returns {Promise<{ request: (type: string, payload?: Record<string, unknown>) => Promise<{ ms: number, reply: any }>, onPush: (listener: (msg: any) => void) => void, close: () => void }>}
 */
async function openClient(target) {
  const socket = new WebSocket(`ws://${target}/ws`);
  /** @type {Map<string, (msg: any) => void>} */
  const pending = new Map();
  /** @type {Array<(msg: any) => void>} */
  const push_listeners = [];
  let counter = 0;
  socket.addEventListener('message', (event) => {
    const msg = JSON.parse(String(event.data));
    const resolve = pending.get(msg.id);
    if (resolve) {
      pending.delete(msg.id);
      resolve(msg);
      return;
    }
    for (const listener of push_listeners) {
      listener(msg);
    }
  });
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', () => resolve(undefined), { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  return {
    request: (type, payload = {}) => {
      counter += 1;
      const id = `probe-${counter}`;
      const started = performance.now();
      return new Promise((resolve) => {
        pending.set(id, (reply) =>
          resolve({ ms: performance.now() - started, reply })
        );
        socket.send(JSON.stringify({ id, type, payload }));
      });
    },
    onPush: (listener) => {
      push_listeners.push(listener);
    },
    close: () => socket.close()
  };
}

/**
 * Subscribe to the monitor channel and resolve with its first snapshot.
 *
 * @param {Awaited<ReturnType<typeof openClient>>} client
 * @returns {Promise<any>} snapshot payload
 */
async function subscribeMonitor(client) {
  const snapshot = new Promise((resolve) => {
    client.onPush((msg) => {
      if (msg.type === 'monitor-pipeline-snapshot') {
        resolve(msg.payload);
      }
    });
  });
  await client.request('subscribe-monitor-pipeline', { id: 'probe:monitor' });
  return snapshot;
}

/**
 * Send both repo-panel reads for every root concurrently.
 *
 * @param {Awaited<ReturnType<typeof openClient>>} client
 * @param {string[]} roots
 * @returns {Promise<Array<{ root_dir: string, type: string, ms: number, ok: boolean }>>}
 */
async function measurePanelReads(client, roots) {
  const jobs = [];
  for (const root_dir of roots) {
    for (const type of ['get-session-defaults', 'get-workspace-accounts']) {
      jobs.push(
        client.request(type, { root_dir }).then(({ ms, reply }) => ({
          root_dir,
          type,
          ms: Math.round(ms),
          ok: reply.ok === true
        }))
      );
    }
  }
  return Promise.all(jobs);
}

/**
 * Wait until no push arrived for `idle_ms`, pinging every 250ms meanwhile.
 *
 * @param {Awaited<ReturnType<typeof openClient>>} client
 * @param {number} idle_ms
 * @param {number} idle_timeout_ms
 * @returns {Promise<{ reached_idle: boolean, waited_ms: number, pings: number[] }>}
 */
async function waitIdle(client, idle_ms, idle_timeout_ms) {
  let last_push = performance.now();
  client.onPush(() => {
    last_push = performance.now();
  });
  /** @type {number[]} */
  const pings = [];
  const started = performance.now();
  const timer = setInterval(() => {
    void client.request('ping').then(({ ms }) => pings.push(ms));
  }, PING_INTERVAL_MS);
  try {
    while (performance.now() - started < idle_timeout_ms) {
      if (performance.now() - last_push >= idle_ms) {
        return {
          reached_idle: true,
          waited_ms: Math.round(performance.now() - started),
          pings
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    return {
      reached_idle: false,
      waited_ms: Math.round(performance.now() - started),
      pings
    };
  } finally {
    clearInterval(timer);
  }
}

/**
 * Nearest-rank percentile.
 *
 * @param {number[]} values
 * @param {number} p - 0..100
 * @returns {number|null}
 */
function percentile(values, p) {
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const rank = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((p / 100) * sorted.length) - 1)
  );
  return Math.round(sorted[rank]);
}

/**
 * Measure the first monitor snapshot on a raw TCP WebSocket that offers
 * permessage-deflate: JSON bytes after inflation versus socket bytes read.
 *
 * @param {string} target - host:port
 * @returns {Promise<{ json_bytes: number, socket_bytes: number, compressed: boolean, extensions: string }>}
 */
async function measureSnapshotBytes(target) {
  const [host, port_text] = splitTarget(target);
  const socket = net.connect(Number(port_text), host);
  let buffer = Buffer.alloc(0);
  let handshake_done = false;
  let extensions = '';
  let bytes_after_handshake = 0;
  /** @type {Buffer[]} */
  let fragments = [];
  let fragment_compressed = false;

  return new Promise((resolve, reject) => {
    socket.once('error', reject);
    socket.on('connect', () => {
      socket.write(
        [
          'GET /ws HTTP/1.1',
          `Host: ${target}`,
          'Upgrade: websocket',
          'Connection: Upgrade',
          `Sec-WebSocket-Key: ${randomBytes(16).toString('base64')}`,
          'Sec-WebSocket-Version: 13',
          'Sec-WebSocket-Extensions: permessage-deflate; client_no_context_takeover',
          '',
          ''
        ].join('\r\n')
      );
    });
    socket.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!handshake_done) {
        const end = buffer.indexOf('\r\n\r\n');
        if (end < 0) {
          return;
        }
        const head = buffer.subarray(0, end).toString();
        const match = /sec-websocket-extensions:\s*([^\r\n]*)/i.exec(head);
        extensions = match ? match[1] : '';
        handshake_done = true;
        buffer = buffer.subarray(end + 4);
        bytes_after_handshake = socket.bytesRead - buffer.length;
        sendMaskedText(
          socket,
          JSON.stringify({
            id: 'probe-raw-1',
            type: 'subscribe-monitor-pipeline',
            payload: { id: 'probe:raw' }
          })
        );
      }
      for (;;) {
        const frame = readFrame(buffer);
        if (frame === null) {
          return;
        }
        buffer = buffer.subarray(frame.total);
        if (frame.opcode >= 0x8) {
          continue;
        }
        if (frame.opcode !== 0) {
          fragments = [];
          fragment_compressed = frame.rsv1;
        }
        fragments.push(frame.payload);
        if (!frame.fin) {
          continue;
        }
        const raw = Buffer.concat(fragments);
        const text = fragment_compressed
          ? zlib
              .inflateRawSync(
                Buffer.concat([raw, Buffer.from([0, 0, 0xff, 0xff])])
              )
              .toString()
          : raw.toString();
        const msg = JSON.parse(text);
        if (msg.type === 'monitor-pipeline-snapshot') {
          const socket_bytes =
            socket.bytesRead - buffer.length - bytes_after_handshake;
          socket.destroy();
          resolve({
            json_bytes: Buffer.byteLength(text),
            socket_bytes,
            compressed: fragment_compressed,
            extensions
          });
          return;
        }
      }
    });
  });
}

/**
 * Split host:port.
 *
 * @param {string} target
 * @returns {[string, string]}
 */
function splitTarget(target) {
  const at = target.lastIndexOf(':');
  return [target.slice(0, at), target.slice(at + 1)];
}

/**
 * Send one masked client text frame.
 *
 * @param {net.Socket} socket
 * @param {string} text
 */
function sendMaskedText(socket, text) {
  const payload = Buffer.from(text);
  const mask = randomBytes(4);
  /** @type {Buffer} */
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x81, 0x80 | payload.length]);
  } else if (payload.length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(payload.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 0x80 | 127;
    header.writeBigUInt64BE(BigInt(payload.length), 2);
  }
  const masked = Buffer.alloc(payload.length);
  for (let index = 0; index < payload.length; index += 1) {
    masked[index] = payload[index] ^ mask[index % 4];
  }
  socket.write(Buffer.concat([header, mask, masked]));
}

/**
 * Parse one unmasked server frame from the front of `buffer`.
 *
 * @param {Buffer} buffer
 * @returns {{ fin: boolean, rsv1: boolean, opcode: number, payload: Buffer, total: number }|null}
 */
function readFrame(buffer) {
  if (buffer.length < 2) {
    return null;
  }
  let length = buffer[1] & 0x7f;
  let offset = 2;
  if (length === 126) {
    if (buffer.length < 4) {
      return null;
    }
    length = buffer.readUInt16BE(2);
    offset = 4;
  } else if (length === 127) {
    if (buffer.length < 10) {
      return null;
    }
    length = Number(buffer.readBigUInt64BE(2));
    offset = 10;
  }
  if (buffer.length < offset + length) {
    return null;
  }
  return {
    fin: (buffer[0] & 0x80) !== 0,
    rsv1: (buffer[0] & 0x40) !== 0,
    opcode: buffer[0] & 0x0f,
    payload: buffer.subarray(offset, offset + length),
    total: offset + length
  };
}

/**
 * GET a static asset with `Accept-Encoding: gzip` and count wire bytes.
 *
 * @param {string} target
 * @param {string} url_path
 * @returns {Promise<{ path: string, status: number, content_encoding: string|null, content_type: string|null, body_bytes: number }>}
 */
function measureAsset(target, url_path) {
  const [host, port] = splitTarget(target);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host,
        port: Number(port),
        path: url_path,
        headers: { 'accept-encoding': 'gzip' }
      },
      (res) => {
        let body_bytes = 0;
        res.on('data', (chunk) => {
          body_bytes += chunk.length;
        });
        res.on('end', () =>
          resolve({
            path: url_path,
            status: res.statusCode || 0,
            content_encoding: res.headers['content-encoding'] || null,
            content_type: res.headers['content-type'] || null,
            body_bytes
          })
        );
      }
    );
    req.on('error', reject);
    req.end();
  });
}

/**
 * Re-apply one preset to the repos whose applied record already names it.
 *
 * @param {Awaited<ReturnType<typeof openClient>>} client
 * @param {any} snapshot - monitor snapshot payload
 * @param {string} preset_id
 * @param {string[]} repos
 * @returns {Promise<Record<string, unknown>>}
 */
async function reapplyPreset(client, snapshot, preset_id, repos) {
  const presets_snapshot = new Promise((resolve) => {
    client.onPush((msg) => {
      if (msg.type === 'impl-presets-snapshot') {
        resolve(msg.payload);
      }
    });
  });
  await client.request('subscribe-impl-presets', { id: 'probe:presets' });
  const presets = /** @type {any} */ (await presets_snapshot);
  const preset = (presets.presets || []).find(
    (/** @type {any} */ entry) => entry.id === preset_id
  );
  if (!preset) {
    return { error: `preset ${preset_id} not found` };
  }
  const field =
    preset.applies_to === 'quick_fix'
      ? 'applied_quick_fix_preset'
      : 'applied_exec_preset';
  /** @type {Array<{ root_dir: string, reason: string }>} */
  const skipped = [];
  /** @type {any[]} */
  const eligible = [];
  for (const root_dir of repos) {
    const row = (snapshot.workspaces_state || []).find(
      (/** @type {any} */ entry) => entry.root_dir === root_dir
    );
    if (!row) {
      skipped.push({ root_dir, reason: 'not a visible workspace' });
    } else if (row[field]?.id !== preset_id) {
      skipped.push({
        root_dir,
        reason: `${field} is ${row[field]?.id ?? 'null'}, not ${preset_id}`
      });
    } else {
      eligible.push(row);
    }
  }
  /** @type {any[]} */
  const results = [];
  let next_index = 0;
  const started = performance.now();
  const drain = async () => {
    while (next_index < eligible.length) {
      const row = eligible[next_index];
      next_index += 1;
      const { ms, reply } = await client.request('apply-impl-preset-global', {
        preset_id,
        expected_revision: presets.revision,
        expected_queue_revision: row.revision,
        root_dir: row.root_dir
      });
      results.push({
        root_dir: row.root_dir,
        ms: Math.round(ms),
        ok: reply.ok === true,
        applied: reply.payload?.applied ?? null,
        queue_applied: reply.payload?.queue_applied ?? null,
        error: reply.error?.code ?? null
      });
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(APPLY_PARALLEL, eligible.length) }, () =>
      drain()
    )
  );
  return {
    preset_id,
    wall_ms: Math.round(performance.now() - started),
    results,
    skipped
  };
}

/**
 * Run the probe and print one JSON report.
 */
async function main() {
  const args = parseArgs(process.argv.slice(2));
  /** @type {Record<string, unknown>} */
  const report = { target: args.target, at: new Date().toISOString() };

  const client = await openClient(args.target);
  try {
    const snapshot = await subscribeMonitor(client);
    const roots = (snapshot.workspaces_state || []).map(
      (/** @type {any} */ row) => row.root_dir
    );
    report.workspaces = roots.length;
    report.after_subscribe = await measurePanelReads(client, roots);

    const idle = await waitIdle(client, args.idle_ms, args.idle_timeout_ms);
    report.idle = { reached: idle.reached_idle, waited_ms: idle.waited_ms };
    report.idle_reads = await measurePanelReads(client, roots);
    report.ping = {
      count: idle.pings.length,
      p50_ms: percentile(idle.pings, 50),
      p99_ms: percentile(idle.pings, 99),
      max_ms: idle.pings.length > 0 ? Math.round(Math.max(...idle.pings)) : null
    };

    report.snapshot_bytes = await measureSnapshotBytes(args.target);
    report.assets = [
      await measureAsset(args.target, '/main.bundle.js'),
      await measureAsset(args.target, '/styles.css')
    ];

    if (args.apply_preset !== null) {
      const fresh = await openClient(args.target);
      try {
        const fresh_snapshot = await subscribeMonitor(fresh);
        report.apply = await reapplyPreset(
          fresh,
          fresh_snapshot,
          args.apply_preset,
          args.repos
        );
      } finally {
        fresh.close();
      }
    }
  } finally {
    client.close();
  }
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err && err.stack ? err.stack : String(err)}\n`);
  process.exitCode = 1;
});
