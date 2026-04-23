/**
 * @import { Express, Request, Response } from 'express'
 */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { registerWorkspace } from './registry-watcher.js';
import { createWorkerJobsRouter } from './routes/worker-jobs.js';
import { createWorkerPrsRouter } from './routes/worker-prs.js';
import { createWorkerSpecRouter } from './routes/worker-spec.js';

/**
 * @param {{
 *   label_display_policy?: { visible_prefixes: string[] },
 *   workspace_config?: { default_workspace: string | null }
 * }} config
 * @returns {{
 *   label_display_policy: { visible_prefixes: string[] },
 *   workspace_config: { default_workspace: string | null }
 * }}
 */
function toBootstrapPayload(config) {
  const visible_prefixes = Array.isArray(
    config.label_display_policy?.visible_prefixes
  )
    ? config.label_display_policy.visible_prefixes.slice()
    : ['has:', 'reviewed:'];

  return {
    label_display_policy: {
      visible_prefixes
    },
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
 * @param {{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', label_display_policy?: { visible_prefixes: string[] } }} config - Server configuration.
 * @returns {Express} Configured Express app instance.
 */
export function createApp(config) {
  const app = express();

  // Basic hardening and config
  app.disable('x-powered-by');

  // Health endpoint
  /**
   * @param {Request} _req
   * @param {Response} res
   */
  app.get('/healthz', (_req, res) => {
    res.type('application/json');
    res.status(200).send({ ok: true });
  });

  // Enable JSON body parsing for API endpoints
  app.use(express.json());

  app.use(
    '/api/worker/spec',
    createWorkerSpecRouter({ root_dir: config.root_dir })
  );
  app.use(
    '/api/worker/prs',
    createWorkerPrsRouter({ root_dir: config.root_dir })
  );
  app.use(
    '/api/worker/jobs',
    createWorkerJobsRouter({ root_dir: config.root_dir })
  );

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
