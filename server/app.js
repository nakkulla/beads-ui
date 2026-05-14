/**
 * @import { Express, Request, Response } from 'express'
 */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import {
  DEFAULT_WORKER_CONFIG,
  DEFAULT_WORKFLOW_SUMMARY_CONFIG,
  getConfig
} from './config.js';
import { registerWorkspace } from './registry-watcher.js';
import { createWorkerJobsRouter } from './routes/worker-jobs.js';
import { createWorkerPrsRouter } from './routes/worker-prs.js';
import { createWorkerSpecRouter } from './routes/worker-spec.js';
import { updateWorkerConfigFile } from './worker/worker-config-writer.js';

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const WORKER_EFFORTS = new Set(['low', 'medium', 'high']);

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObjectTable(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @param {number} fallback
 * @returns {number}
 */
function normalizePositiveInteger(value, fallback) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : fallback;
}

/**
 * @param {unknown} value
 * @returns {{ default_model: string, default_effort: string, pr_review_wait_ms: number, advance_delay_ms: number }}
 */
function normalizeBootstrapWorkerConfig(value) {
  const raw = isObjectTable(value) ? value : {};
  const default_model =
    typeof raw.default_model === 'string' && raw.default_model.trim().length > 0
      ? raw.default_model.trim()
      : DEFAULT_WORKER_CONFIG.default_model;
  const default_effort =
    typeof raw.default_effort === 'string' &&
    WORKER_EFFORTS.has(raw.default_effort)
      ? raw.default_effort
      : DEFAULT_WORKER_CONFIG.default_effort;

  return {
    default_model,
    default_effort,
    pr_review_wait_ms: normalizePositiveInteger(
      raw.pr_review_wait_ms,
      DEFAULT_WORKER_CONFIG.pr_review_wait_ms
    ),
    advance_delay_ms: normalizePositiveInteger(
      raw.advance_delay_ms,
      DEFAULT_WORKER_CONFIG.advance_delay_ms
    )
  };
}

/**
 * @param {unknown} value
 * @returns {Record<string, { fg: string }>}
 */
function normalizeLabelColorTable(value) {
  if (!isObjectTable(value)) {
    return {};
  }

  /** @type {Record<string, { fg: string }>} */
  const normalized = {};
  for (const [key, rule] of Object.entries(value)) {
    if (
      key.length === 0 ||
      !isObjectTable(rule) ||
      typeof rule.fg !== 'string' ||
      !HEX_COLOR_RE.test(rule.fg)
    ) {
      continue;
    }
    normalized[key] = { fg: rule.fg };
  }

  return normalized;
}

/**
 * @param {unknown} value
 * @returns {{ prefix: Record<string, { fg: string }>, exact: Record<string, { fg: string }> }}
 */
function normalizeLabelColorPolicy(value) {
  if (!isObjectTable(value)) {
    return { prefix: {}, exact: {} };
  }

  return {
    prefix: normalizeLabelColorTable(value.prefix),
    exact: normalizeLabelColorTable(value.exact)
  };
}

/**
 * @param {{
 *   label_display_policy?: {
 *     visible_prefixes: string[],
 *     visible_exact?: string[],
 *     colors?: unknown
 *   },
 *   detail?: { workflow_summary?: unknown },
 *   workspace_config?: { default_workspace: string | null },
 *   worker?: unknown
 * }} config
 * @returns {{
 *   label_display_policy: {
 *     visible_prefixes: string[],
 *     visible_exact: string[],
 *     colors: {
 *       prefix: Record<string, { fg: string }>,
 *       exact: Record<string, { fg: string }>
 *     }
 *   },
 *   detail: { workflow_summary: unknown },
 *   workspace_config: { default_workspace: string | null },
 *   worker: { default_model: string, default_effort: string, pr_review_wait_ms: number, advance_delay_ms: number }
 * }}
 */
function toBootstrapPayload(config) {
  const visible_prefixes = Array.isArray(
    config.label_display_policy?.visible_prefixes
  )
    ? config.label_display_policy.visible_prefixes.slice()
    : ['has:', 'reviewed:'];
  const visible_exact = Array.isArray(
    config.label_display_policy?.visible_exact
  )
    ? config.label_display_policy.visible_exact.slice()
    : [];
  const detail =
    config.detail && typeof config.detail === 'object'
      ? JSON.parse(JSON.stringify(config.detail))
      : { workflow_summary: DEFAULT_WORKFLOW_SUMMARY_CONFIG };
  const worker = normalizeBootstrapWorkerConfig(config.worker);

  return {
    label_display_policy: {
      visible_prefixes,
      visible_exact,
      colors: normalizeLabelColorPolicy(config.label_display_policy?.colors)
    },
    detail,
    workspace_config: {
      default_workspace:
        typeof config.workspace_config?.default_workspace === 'string' &&
        config.workspace_config.default_workspace.length > 0
          ? config.workspace_config.default_workspace
          : null
    },
    worker
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
 * @param {{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', config_path?: string, label_display_policy?: { visible_prefixes: string[], visible_exact?: string[], colors?: unknown }, detail?: { workflow_summary?: unknown }, worker?: unknown, workspace_config?: { default_workspace: string | null } }} config - Server configuration.
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

  /**
   * @param {Request} req
   * @param {Response} res
   */
  app.patch('/api/config/worker', (req, res) => {
    if (!config.config_path || typeof config.config_path !== 'string') {
      res.status(400).json({ ok: false, error: 'Missing config path' });
      return;
    }
    try {
      updateWorkerConfigFile(config.config_path, req.body || {});
      const next_config = getConfig();
      res.set('Cache-Control', 'no-store');
      res.type('application/json');
      res.status(200).send(toBootstrapPayload(next_config));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Invalid worker config';
      res.status(400).json({ ok: false, error: message });
    }
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
