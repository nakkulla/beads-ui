import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { attachWsServer, isOriginAllowed } from './ws.js';

const TAILNET = 'https://mong-nas.tailb4bcbf.ts.net';

/** @type {string | undefined} */
let saved_env;

beforeEach(() => {
  saved_env = process.env.BDUI_ALLOWED_ORIGINS;
  delete process.env.BDUI_ALLOWED_ORIGINS;
});

afterEach(() => {
  if (saved_env === undefined) {
    delete process.env.BDUI_ALLOWED_ORIGINS;
  } else {
    process.env.BDUI_ALLOWED_ORIGINS = saved_env;
  }
});

describe('isOriginAllowed — absent / null / empty', () => {
  test('absent Origin (non-browser client) is allowed', () => {
    expect(isOriginAllowed(undefined)).toBe(true);
  });

  test('empty Origin is rejected', () => {
    expect(isOriginAllowed('')).toBe(false);
  });

  test('sandboxed "null" Origin is rejected', () => {
    expect(isOriginAllowed('null')).toBe(false);
    // ...even when an explicit allowlist is configured.
    process.env.BDUI_ALLOWED_ORIGINS = TAILNET;
    expect(isOriginAllowed('null')).toBe(false);
  });
});

describe('isOriginAllowed — explicit allowlist (BDUI_ALLOWED_ORIGINS)', () => {
  test('exact allowed origin passes; everything else fails', () => {
    process.env.BDUI_ALLOWED_ORIGINS = TAILNET;
    expect(isOriginAllowed(TAILNET)).toBe(true);
    expect(isOriginAllowed('https://evil.example.com')).toBe(false);
    // Loopback is NOT auto-allowed once an explicit allowlist is set.
    expect(isOriginAllowed('http://localhost:3000')).toBe(false);
  });

  test('multiple comma-separated origins are honored, with trimming', () => {
    process.env.BDUI_ALLOWED_ORIGINS = ` ${TAILNET} , http://localhost:3000 `;
    expect(isOriginAllowed(TAILNET)).toBe(true);
    expect(isOriginAllowed('http://localhost:3000')).toBe(true);
    expect(isOriginAllowed('http://localhost:5173')).toBe(false);
  });

  test('a near-miss (scheme/host/port differences) is rejected', () => {
    process.env.BDUI_ALLOWED_ORIGINS = TAILNET;
    expect(isOriginAllowed('http://mong-nas.tailb4bcbf.ts.net')).toBe(false);
    expect(isOriginAllowed('https://mong-nas.tailb4bcbf.ts.net:8443')).toBe(
      false
    );
    expect(isOriginAllowed('https://mong-nas.tailb4bcbf.ts.net/')).toBe(false);
  });
});

describe('isOriginAllowed — no allowlist configured (loopback-only default)', () => {
  test('loopback dev origins pass', () => {
    expect(isOriginAllowed('http://localhost:3000')).toBe(true);
    expect(isOriginAllowed('http://127.0.0.1:5173')).toBe(true);
  });

  test('remote origins are rejected (fail-closed)', () => {
    expect(isOriginAllowed(TAILNET)).toBe(false);
    expect(isOriginAllowed('http://evil.example.com')).toBe(false);
  });

  test('a malformed origin string is rejected', () => {
    expect(isOriginAllowed('not a url')).toBe(false);
  });
});

describe('attachWsServer wires verifyClient', () => {
  test('the WebSocketServer is constructed with an Origin verifyClient', () => {
    const server = createServer();
    const { wss } = attachWsServer(server, { path: '/ws', root_dir: '/repo-a' });
    expect(typeof wss.options.verifyClient).toBe('function');
    wss.close();
    server.close();
  });
});
