import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createApp } from '../app.js';
import { registerWorkspace } from '../registry-watcher.js';

/** @type {string} */
let workspace;

beforeAll(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-doc-'));
  const docs_dir = path.join(workspace, 'docs');
  fs.mkdirSync(docs_dir, { recursive: true });
  fs.writeFileSync(path.join(docs_dir, 'spec.md'), '# Spec\nhello');
  fs.writeFileSync(path.join(docs_dir, 'notes.txt'), 'not markdown');
  // A file OUTSIDE docs/, plus a symlink inside docs/ pointing to it.
  fs.writeFileSync(path.join(workspace, 'secret.md'), 'top secret');
  fs.symlinkSync(
    path.join(workspace, 'secret.md'),
    path.join(docs_dir, 'escape.md')
  );
  // A file just over the 1 MiB cap.
  fs.writeFileSync(
    path.join(docs_dir, 'big.md'),
    Buffer.alloc(1024 * 1024 + 1, 0x61)
  );

  registerWorkspace({
    path: workspace,
    database: path.join(workspace, '.beads')
  });
});

afterAll(() => {
  fs.rmSync(workspace, { recursive: true, force: true });
});

/**
 * @param {string} query
 * @returns {Promise<{ status: number, body: any }>}
 */
async function requestDoc(query) {
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: workspace,
    frontend_mode: 'static'
  });
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, () => resolve(undefined)));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no address');
  }
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/doc?${query}`
    );
    let body = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }
    return { status: response.status, body };
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

describe('GET /api/doc', () => {
  test('happy path returns markdown content', async () => {
    const { status, body } = await requestDoc(
      `workspace=${encodeURIComponent(workspace)}&path=docs/spec.md`
    );
    expect(status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.path).toBe('docs/spec.md');
    expect(body.content).toContain('hello');
  });

  test('symlink escaping docs/ is blocked (403)', async () => {
    const { status } = await requestDoc(
      `workspace=${encodeURIComponent(workspace)}&path=docs/escape.md`
    );
    expect(status).toBe(403);
  });

  test('non-docs path is blocked (400)', async () => {
    const { status } = await requestDoc(
      `workspace=${encodeURIComponent(workspace)}&path=secret.md`
    );
    expect(status).toBe(400);
  });

  test('non-markdown path is blocked (400)', async () => {
    const { status } = await requestDoc(
      `workspace=${encodeURIComponent(workspace)}&path=docs/notes.txt`
    );
    expect(status).toBe(400);
  });

  test('files over 1 MiB are blocked (413)', async () => {
    const { status } = await requestDoc(
      `workspace=${encodeURIComponent(workspace)}&path=docs/big.md`
    );
    expect(status).toBe(413);
  });

  test('missing file yields 404', async () => {
    const { status } = await requestDoc(
      `workspace=${encodeURIComponent(workspace)}&path=docs/missing.md`
    );
    expect(status).toBe(404);
  });

  test('unregistered workspace is blocked (403)', async () => {
    const other = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-doc-other-'));
    try {
      const { status } = await requestDoc(
        `workspace=${encodeURIComponent(other)}&path=docs/spec.md`
      );
      expect(status).toBe(403);
    } finally {
      fs.rmSync(other, { recursive: true, force: true });
    }
  });
});
