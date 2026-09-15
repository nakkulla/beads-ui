import { execFileSync } from 'node:child_process';
import { describe, expect, test, vi } from 'vitest';
import { isHttpOriginValue } from './session-defaults.js';
import { commonGet, commonSet, resolveWorkerUrl } from './worker-url.js';

// Producer origin/main 4bafb6f3c8091e456d36e2f0b1eca2cf3333efbc;
// fixture commit 02d238589faff331ade2a01228b41965fae81640,
// tests/fixtures/worker-url-origins.json, verbatim bytes.
/** @type {{ label: string, value: unknown, valid: boolean }[]} */
const PRODUCER_FIXTURE = JSON.parse(String.raw`[
  {
    "label": "canonical-0",
    "value": "http://localhost",
    "valid": true
  },
  {
    "label": "canonical-1",
    "value": "http://localhost:3000",
    "valid": true
  },
  {
    "label": "canonical-2",
    "value": "http://100.122.98.8:3000",
    "valid": true
  },
  {
    "label": "canonical-3",
    "value": "https://example.com",
    "valid": true
  },
  {
    "label": "canonical-4",
    "value": "https://example.com:8443",
    "valid": true
  },
  {
    "label": "canonical-5",
    "value": "http://[::1]:3000",
    "valid": true
  },
  {
    "label": "canonical-6",
    "value": "http://[2001:db8::1]",
    "valid": true
  },
  {
    "label": "canonical-7",
    "value": "http://[::ffff:c000:201]",
    "valid": true
  },
  {
    "label": "canonical-8",
    "value": "http://xn--bcher-kva.example",
    "valid": true
  },
  {
    "label": "canonical-9",
    "value": "http://xn--zca.de",
    "valid": true
  },
  {
    "label": "canonical-10",
    "value": "http://example.com.",
    "valid": true
  },
  {
    "label": "canonical-11",
    "value": "http://a_b",
    "valid": true
  },
  {
    "label": "canonical-12",
    "value": "http://host:0",
    "valid": true
  },
  {
    "label": "canonical-13",
    "value": "http://host:65535",
    "valid": true
  },
  {
    "label": "noncanonical-0",
    "value": "http://host:80",
    "valid": false
  },
  {
    "label": "noncanonical-1",
    "value": "https://host:443",
    "valid": false
  },
  {
    "label": "noncanonical-2",
    "value": "http://HOST",
    "valid": false
  },
  {
    "label": "noncanonical-3",
    "value": "HTTP://host",
    "valid": false
  },
  {
    "label": "noncanonical-4",
    "value": "http://host/",
    "valid": false
  },
  {
    "label": "noncanonical-5",
    "value": "http://host/path",
    "valid": false
  },
  {
    "label": "noncanonical-6",
    "value": "http://host?x",
    "valid": false
  },
  {
    "label": "noncanonical-7",
    "value": "http://host?",
    "valid": false
  },
  {
    "label": "noncanonical-8",
    "value": "http://host#x",
    "valid": false
  },
  {
    "label": "noncanonical-9",
    "value": "http://host#",
    "valid": false
  },
  {
    "label": "noncanonical-10",
    "value": "http://user@host",
    "valid": false
  },
  {
    "label": "noncanonical-11",
    "value": "http://user:pass@host",
    "valid": false
  },
  {
    "label": "noncanonical-12",
    "value": "http://bücher.example",
    "valid": false
  },
  {
    "label": "noncanonical-13",
    "value": "http://[2001:0db8:0:0:0:0:0:1]",
    "valid": false
  },
  {
    "label": "noncanonical-14",
    "value": "http://[2001:DB8::1]",
    "valid": false
  },
  {
    "label": "noncanonical-15",
    "value": "http://::1",
    "valid": false
  },
  {
    "label": "noncanonical-16",
    "value": "http://[::ffff:192.0.2.1]",
    "valid": false
  },
  {
    "label": "noncanonical-17",
    "value": "http://[::1%25eth0]",
    "valid": false
  },
  {
    "label": "noncanonical-18",
    "value": "http://host:03000",
    "valid": false
  },
  {
    "label": "noncanonical-19",
    "value": "http://host:",
    "valid": false
  },
  {
    "label": "noncanonical-20",
    "value": "http://host:65536",
    "valid": false
  },
  {
    "label": "noncanonical-21",
    "value": "http://127.1",
    "valid": false
  },
  {
    "label": "noncanonical-22",
    "value": "http://2130706433",
    "valid": false
  },
  {
    "label": "noncanonical-23",
    "value": "http://0177.0.0.1",
    "valid": false
  },
  {
    "label": "noncanonical-24",
    "value": "http://0x7f.0.0.1",
    "valid": false
  },
  {
    "label": "noncanonical-25",
    "value": "http://127.0.0.1.",
    "valid": false
  },
  {
    "label": "noncanonical-26",
    "value": "http://example.123",
    "valid": false
  },
  {
    "label": "noncanonical-27",
    "value": "http://%65xample.com",
    "valid": false
  },
  {
    "label": "noncanonical-28",
    "value": "http://host name",
    "valid": false
  },
  {
    "label": "noncanonical-29",
    "value": " http://host",
    "valid": false
  },
  {
    "label": "noncanonical-30",
    "value": "http://host\n",
    "valid": false
  },
  {
    "label": "noncanonical-31",
    "value": "http://host\\path",
    "valid": false
  },
  {
    "label": "noncanonical-32",
    "value": "ftp://host",
    "valid": false
  },
  {
    "label": "noncanonical-33",
    "value": "host:3000",
    "valid": false
  },
  {
    "label": "noncanonical-34",
    "value": "http://",
    "valid": false
  },
  {
    "label": "noncanonical-35",
    "value": "http://xn--a",
    "valid": false
  },
  {
    "label": "noncanonical-36",
    "value": "http://xn--",
    "valid": false
  },
  {
    "label": "noncanonical-37",
    "value": null,
    "valid": false
  },
  {
    "label": "noncanonical-38",
    "value": 7,
    "valid": false
  },
  {
    "label": "noncanonical-39",
    "value": true,
    "valid": false
  },
  {
    "label": "noncanonical-40",
    "value": "",
    "valid": false
  },
  {
    "label": "canonical-idn-virama-joiner",
    "value": "http://xn--11b2ezcw70k",
    "valid": true
  },
  {
    "label": "noncanonical-idn-leading-combining",
    "value": "http://xn--a-wbb",
    "valid": false
  },
  {
    "label": "idn-context-0",
    "value": "http://xn--mgba3gch31f060k",
    "valid": true
  },
  {
    "label": "idn-context-1",
    "value": "http://xn--mgbc799q",
    "valid": false
  },
  {
    "label": "idn-context-2",
    "value": "http://xn--mgbb899q",
    "valid": true
  },
  {
    "label": "idn-context-3",
    "value": "http://xn--ab-j1t",
    "valid": false
  },
  {
    "label": "idn-context-4",
    "value": "http://xn--11b2ezcw70k",
    "valid": true
  },
  {
    "label": "idn-context-5",
    "value": "http://xn--mgbh0fb2c",
    "valid": true
  },
  {
    "label": "idn-context-6",
    "value": "http://xn--a-zmcl5hc",
    "valid": false
  },
  {
    "label": "idn-context-7",
    "value": "http://xn--1gj",
    "valid": false
  },
  {
    "label": "idn-context-8",
    "value": "http://xn--zca",
    "valid": true
  },
  {
    "label": "idn-context-9",
    "value": "http://xn--3xa",
    "valid": true
  },
  {
    "label": "idn-context-10",
    "value": "http://xn--n3h",
    "valid": true
  },
  {
    "label": "trailing-dot-0",
    "value": "http://127.0.0.1..",
    "valid": true
  },
  {
    "label": "trailing-dot-1",
    "value": "http://127.0.0.1...:3000",
    "valid": true
  },
  {
    "label": "trailing-dot-2",
    "value": "http://1..",
    "valid": true
  },
  {
    "label": "trailing-dot-3",
    "value": "http://0x7f.1..",
    "valid": true
  },
  {
    "label": "trailing-dot-4",
    "value": "http://a.1..",
    "valid": true
  },
  {
    "label": "trailing-dot-5",
    "value": "http://1.2.3.4..:80",
    "valid": false
  }
]
`);

const COMMON = {
  value: 'http://common:3000',
  state: 'configured',
  revision: 'a'.repeat(64)
};
const RESOLVED = {
  schema: 1,
  effective_url: COMMON.value,
  source: 'common',
  workspace_override: null,
  common: COMMON,
  warnings: []
};
const INPUT = {
  root: '/repo with spaces',
  workspace: { schema: 1, impl_model: 'sol' }
};

/** @param {any} body */
function successfulRun(body = RESOLVED) {
  return vi.fn().mockResolvedValue({ stdout: JSON.stringify(body) });
}

describe('worker URL adapter', () => {
  test('binds the root and exact snapshot to bounded argv-only execution', async () => {
    const run = successfulRun();

    await resolveWorkerUrl(INPUT, run);

    expect(run).toHaveBeenCalledExactlyOnceWith(
      'worker-url',
      ['resolve', '--root', INPUT.root, '--workspace-json-stdin', '--json'],
      {
        input: JSON.stringify(INPUT.workspace),
        timeout: 12000,
        maxBuffer: 1024 * 1024,
        encoding: 'utf8'
      }
    );
    expect(run.mock.calls[0][2]).not.toHaveProperty('shell');
    expect(run.mock.calls[0][2]).not.toHaveProperty('env');
  });

  test.each([null, 'http://new:3000'])(
    'sends exactly one common write spelling for %s',
    async (value) => {
      const run = successfulRun({ schema: 1, common: COMMON });

      const result = await commonSet(
        { value, expected_revision: 'missing' },
        run
      );

      expect(result).toEqual({ status: 'ok', common: COMMON });
      expect(run.mock.calls[0][1]).toEqual([
        'common',
        'set',
        '--json',
        '--expect-revision',
        'missing',
        ...(value === null ? ['--unset'] : ['--value', value])
      ]);
      expect(run).toHaveBeenCalledTimes(1);
    }
  );

  test('reads the common document through the installed helper', async () => {
    const run = successfulRun({ schema: 1, common: COMMON });

    const result = await commonGet(run);

    expect(result).toEqual({ status: 'ok', common: COMMON });
    expect(run.mock.calls[0][1]).toEqual(['common', 'get', '--json']);
  });

  test.each([
    { schema: 2 },
    { effective_url: 3 },
    { source: 'guessed' },
    { workspace_override: false },
    { common: { ...COMMON, state: 'broken' } },
    { common: { ...COMMON, revision: 2 } },
    { common: { ...COMMON, value: false } },
    { warnings: {} }
  ])('rejects malformed schema or vocabulary %j', async (patch) => {
    const run = successfulRun({ ...RESOLVED, ...patch });

    const result = await resolveWorkerUrl(INPUT, run);

    expect(result).toEqual({
      status: 'unavailable',
      error: { code: 'helper_unavailable' }
    });
  });

  test.each(['ENOENT', 'ETIMEDOUT', 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER'])(
    'reports execution failure %s without retrying',
    async (code) => {
      const run = vi
        .fn()
        .mockRejectedValue(Object.assign(new Error(code), { code }));

      const result = await resolveWorkerUrl(INPUT, run);

      expect(result).toMatchObject({
        status: 'unavailable',
        error: { code: 'helper_unavailable' }
      });
      expect(run).toHaveBeenCalledTimes(1);
    }
  );

  test('rejects non-JSON helper output', async () => {
    const run = vi.fn().mockResolvedValue({ stdout: 'not JSON' });

    const result = await resolveWorkerUrl(INPUT, run);

    expect(result).toMatchObject({
      status: 'unavailable',
      error: { code: 'helper_unavailable' }
    });
  });

  test('passes a common revision conflict through without retrying', async () => {
    const run = vi.fn().mockRejectedValue({
      code: 1,
      stdout: JSON.stringify({
        schema: 1,
        error: { code: 'revision_conflict' }
      })
    });

    const result = await commonSet(
      { value: null, expected_revision: COMMON.revision },
      run
    );

    expect(result).toEqual({
      status: 'unavailable',
      error: { code: 'revision_conflict' }
    });
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('maps producer resolve errors to helper unavailable', async () => {
    const run = vi.fn().mockRejectedValue({
      code: 1,
      stdout: JSON.stringify({ schema: 1, error: { code: 'invalid_input' } })
    });

    const result = await resolveWorkerUrl(INPUT, run);

    expect(result).toMatchObject({
      status: 'unavailable',
      error: { code: 'helper_unavailable' }
    });
  });
});

describe('pinned producer origin corpus', () => {
  test('pins all 74 producer rows', () => {
    expect(PRODUCER_FIXTURE).toHaveLength(74);
  });

  test.each(PRODUCER_FIXTURE)('matches $label', ({ value, valid }) => {
    const accepted = typeof value === 'string' && isHttpOriginValue(value);

    expect(accepted).toBe(valid);
  });
});
const JOB_PATH = 'repo-ops/post-merge.d/2026-09-15-worker-url-verify';
const JOB_HARNESS = String.raw`
import base64
import contextlib
import hashlib
import io
import json
import os
from pathlib import Path
import runpy
import struct
import sys
from types import SimpleNamespace
from unittest.mock import patch

job = runpy.run_path(sys.argv[1])
g = job['main'].__globals__
case = sys.argv[2]
root = Path('/registered/repo')
common = {'value': 'http://common:3000', 'state': 'configured', 'revision': 'original'}
resolved = {'schema': 1, 'effective_url': common['value'], 'source': 'common', 'common': common}
applied = {'status': 'ok', **resolved}
snapshot = {'schema': 1, 'bdui_url': 'http://exception:3000'}

if case == 'websocket':
    key = base64.b64encode(bytes(16)).decode()
    accept = base64.b64encode(hashlib.sha1((key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').encode()).digest()).decode()
    body = json.dumps({'id': 'worker-url-post-merge', 'ok': True, 'payload': {'worker_url': applied}}).encode()
    def frame(opcode, data, final=True):
        size = len(data)
        head = bytes([(128 if final else 0) | opcode])
        return head + (bytes([size]) if size < 126 else bytes([126]) + struct.pack('!H', size)) + data
    stream = io.BytesIO(('HTTP/1.1 101 Switching Protocols\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n').encode()
        + frame(1, b'{"type":"event"}') + frame(9, b'ping')
        + frame(1, body[:80], False) + frame(0, body[80:]))
    sent = []
    connection = SimpleNamespace(makefile=lambda *args: stream, sendall=sent.append, settimeout=lambda value: None, close=lambda: None)
    with patch.object(g['socket'], 'create_connection', return_value=connection), patch.object(g['os'], 'urandom', side_effect=lambda size: bytes(size)):
        result = job['ws_defaults']('http://service:3000/healthz', root)
    request_frame = sent[1]
    offset = 2 if request_frame[1] & 127 < 126 else 4
    mask = request_frame[offset:offset + 4]
    payload = bytes(value ^ mask[index % 4] for index, value in enumerate(request_frame[offset + 4:]))
    assert json.loads(payload)['payload'] == {'root_dir': str(root)}
    assert request_frame[1] & 128
    assert sent[2][0] & 15 == 10
    assert sent[3][0] & 15 == 8
    assert result == applied
    print(json.dumps({'result': 'passed'}))
elif case.startswith('snapshot'):
    record = {'found': False} if case == 'snapshot-absent' else {'found': True, 'value': ''}
    g['command'] = lambda *args, **kwargs: SimpleNamespace(returncode=1 if not record['found'] else 0, stdout=json.dumps(record))
    try:
        value, _ = job['snapshot_at'](root)
        print(json.dumps({'result': 'absent', 'snapshot': value}))
    except ValueError as error:
        print(json.dumps({'result': str(error)}))
else:
    snapshots = [({}, {'found': False}), ({}, {'found': case == 'changed-snapshot'})]
    commons = [dict(common), dict(common)]
    if case == 'changed-common':
        commons[1]['revision'] = 'changed'
    if case == 'unset':
        common.update(value=None, state='unset')
        resolved.update(effective_url=None, source='unset')
        applied.update(effective_url=None, source='unset')
    if case == 'mismatch':
        applied['source'] = 'workspace'
    if case == 'helper-unavailable':
        applied = {'status': 'unavailable', 'error': {'code': 'helper_unavailable'}}
    if case == 'common-invalid':
        common['state'] = 'invalid'
    calls = []
    g['durable_root'] = lambda cwd: root
    g['git'] = lambda *args: 'a' * 40
    g['snapshot_at'] = lambda target: snapshots.pop(0)
    def helper(cli, argv, snapshot=None):
        calls.append(argv)
        return {'common': commons.pop(0)} if argv == ['common', 'get'] else resolved
    g['helper'] = helper
    g['ws_defaults'] = lambda *args: applied
    def http_get(url, decode=False):
        calls.append(url)
        return {'runtime': {'source_sha': 'wrong' if case == 'wrong-sha' else 'a' * 40, 'source_repo': '/deploy'}} if decode else None
    g['http_get'] = http_get
    with patch.dict(os.environ, {'REPO_OPS_TARGET_SHA': 'a' * 40, 'BDUI_DEPLOY_HEALTH_URL': 'http://service:3000/healthz'}), patch.object(g['shutil'], 'which', return_value='/installed/worker-url'):
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                status = job['main']()
            result = 'passed' if status == 0 else 'failed'
        except ValueError as error:
            result = str(error)
    queues = [value for value in calls if isinstance(value, str) and '/api/worker/queue?' in value]
    assert not any('set' in value for value in calls if isinstance(value, list))
    print(json.dumps({'result': result, 'queue_requests': len(queues)}))
`;

describe('read-only post-merge verification job', () => {
  test.each([
    ['websocket', 'passed'],
    ['snapshot-absent', 'absent'],
    ['snapshot-unreadable', 'workspace_unavailable: empty or unreadable value'],
    ['configured', 'passed'],
    ['unset', 'passed'],
    ['changed-snapshot', 'changed during verification'],
    ['changed-common', 'changed during verification'],
    ['mismatch', 'WS resolver mismatch: source'],
    ['wrong-sha', 'health source SHA mismatch'],
    ['helper-unavailable', 'helper_unavailable'],
    ['common-invalid', 'common_invalid']
  ])('verifies isolated job behavior %s', (scenario, expected) => {
    const output = execFileSync(
      'python3',
      ['-c', JOB_HARNESS, JOB_PATH, scenario],
      { encoding: 'utf8', timeout: 10000 }
    );

    const result = JSON.parse(output);

    expect(result.result).toBe(expected);
    if (scenario === 'configured' || scenario === 'unset') {
      expect(result.queue_requests).toBe(scenario === 'configured' ? 1 : 0);
    }
  });
});
