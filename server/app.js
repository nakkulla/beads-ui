/**
 * @import { Express, Request, Response } from 'express'
 */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { checkHealth } from './health.js';
import { registerWorkspace } from './registry-watcher.js';
import { claudeUsageHandler } from './routes/claude-usage.js';
import { codexUsageHandler } from './routes/codex-usage.js';
import { docHandler } from './routes/doc.js';

/**
 * Bootstrap config handed to the client in the served HTML. Label visibility is
 * NOT part of it: that policy is per-workspace, editable at runtime, and
 * delivered over the `display-policy` subscription instead.
 *
 * @param {{ workspace_config?: { default_workspace: string | null } }} config
 * @returns {{ workspace_config: { default_workspace: string | null } }}
 */
function toBootstrapPayload(config) {
  return {
    workspace_config: {
      default_workspace:
        typeof config.workspace_config?.default_workspace === 'string' &&
        config.workspace_config.default_workspace.length > 0
          ? config.workspace_config.default_workspace
          : null
    }
  };
}

/**
 * @param {string} json
 * @returns {string}
 */
function escapeBootstrapJson(json) {
  return json
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/**
 * Create and configure the Express application.
 *
 * @param {{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', workspace_config?: { default_workspace: string | null }, health_probes?: { bd_probe?: () => boolean | Promise<boolean>, db_probe?: () => boolean | Promise<boolean>, bd_capability_probe?: (root_dir: string) => Promise<{ ok: boolean, diagnostics: Record<string, unknown> }> }, runtime_identity?: () => any }} config - Server configuration.
 * @returns {Express} Configured Express app instance.
 */
export function createApp(config) {
  const app = express();

  // Basic hardening and config
  app.disable('x-powered-by');

  // No token auth (spec §8). REST mutations still require an
  // `application/json` body (express.json) to block cross-origin form CSRF, and
  // no CORS headers are added, so cross-origin reads stay blocked.

  // Health endpoint (unauthenticated readiness probe). Overall ok=false → 503.
  /**
   * @param {Request} _req
   * @param {Response} res
   */
  app.get('/healthz', async (_req, res) => {
    const result = await checkHealth({
      root_dir: config.root_dir,
      bd_probe: config.health_probes?.bd_probe,
      db_probe: config.health_probes?.db_probe,
      bd_capability_probe: config.health_probes?.bd_capability_probe,
      runtime_identity: config.runtime_identity
    });
    res.type('application/json');
    res.status(result.ok ? 200 : 503).send(result);
  });

  // Enable JSON body parsing for API endpoints
  app.use(express.json());

  // `/api/worker/merge-lock` is retired with the merge axis (worker-phase2 §2):
  // sessions never merge, so there is no lock to acquire and no endpoint to
  // mount — the path is a plain 404.

  // Serve a markdown document from a registered workspace's docs/ directory.
  app.get('/api/doc', docHandler);

  // Fail-quiet Claude Code usage snapshot for the header meter.
  app.get('/api/claude-usage', claudeUsageHandler);

  // Fail-quiet Codex usage snapshot from the versioned codex-auth contract.
  app.get('/api/codex-usage', codexUsageHandler);

  // Register workspace endpoint - allows CLI to register workspaces dynamically
  // when the server is already running
  /**
   * @param {Request} req
   * @param {Response} res
   */
  app.post('/api/register-workspace', (req, res) => {
    const { path: workspace_path, database } = req.body || {};
    if (!workspace_path || typeof workspace_path !== 'string') {
      res.status(400).json({ ok: false, error: 'Missing or invalid path' });
      return;
    }
    if (!database || typeof database !== 'string') {
      res.status(400).json({ ok: false, error: 'Missing or invalid database' });
      return;
    }
    registerWorkspace({ path: workspace_path, database });
    res.status(200).json({ ok: true, registered: workspace_path });
  });

  /**
   * @param {Request} _req
   * @param {Response} res
   */
  app.get('/api/config', (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.type('application/json');
    res.status(200).send(toBootstrapPayload(config));
  });

  const use_live_bundle = config.frontend_mode === 'live';
  const bundle_missing = use_live_bundle
    ? false
    : !fs.statSync(path.resolve(config.app_dir, 'main.bundle.js'), {
        throwIfNoEntry: false
      });

  if (use_live_bundle || bundle_missing) {
    /**
     * On-demand bundle for the browser using esbuild.
     *
     * @param {Request} _req
     * @param {Response} res
     */
    app.get('/main.bundle.js', async (_req, res) => {
      try {
        const esbuild = await import('esbuild');
        const entry = path.join(config.app_dir, 'main.js');
        const result = await esbuild.build({
          entryPoints: [entry],
          bundle: true,
          format: 'esm',
          platform: 'browser',
          target: 'es2020',
          sourcemap: 'inline',
          minify: false,
          write: false
        });
        const out = result.outputFiles && result.outputFiles[0];
        if (!out) {
          res.status(500).type('text/plain').send('Bundle failed: no output');
          return;
        }
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        res.send(out.text);
      } catch (err) {
        res
          .status(500)
          .type('text/plain')
          .send('Bundle error: ' + (err && /** @type {any} */ (err).message));
      }
    });
  }

  // Root serves bootstrapped index.html explicitly before static middleware.
  /**
   * @param {Request} _req
   * @param {Response} res
   */
  app.get('/', (_req, res) => {
    const index_path = path.join(config.app_dir, 'index.html');
    const index_html = fs.readFileSync(index_path, 'utf8');
    const payload = escapeBootstrapJson(
      JSON.stringify(toBootstrapPayload(config))
    );

    res
      .set('Cache-Control', 'no-store')
      .status(200)
      .type('html')
      .send(
        index_html.replace(
          '</head>',
          `<script>window.__BDUI_BOOTSTRAP__=${payload};</script></head>`
        )
      );
  });

  // Static assets from /app
  app.use(express.static(config.app_dir, { index: false }));

  return app;
}
