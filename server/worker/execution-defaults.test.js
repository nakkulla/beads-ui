import nodeCrypto from 'node:crypto';
import { describe, expect, test } from 'vitest';
import {
  EXECUTION_DEFAULTS_PATH,
  EXECUTION_DEFAULTS_PROVENANCE_PATH,
  loadExecutionDefaults,
  projectExecutionDefaults
} from './execution-defaults.js';

const ARTIFACT = {
  schema_version: 1,
  workflow_mode_default: 'standard',
  review: {
    default: 'codex',
    reviewers: {
      codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
      fable: { model: 'fable', effort: 'high' }
    }
  },
  plan_review: {
    standard_recommended: 'codex',
    fast_track_default: 'fable'
  },
  implementation: {
    default: {
      dispatch: 'delegated',
      runtime: 'codex',
      model: 'sol',
      effort: 'auto',
      speed: 'default'
    },
    model_catalog: { claude: ['opus'], codex: { sol: 'gpt-5.6-sol' } },
    exact_model_default_effort: {
      claude_runner: 'high',
      codex: 'runtime_model_default'
    },
    effort_by_transport: {
      'codex-native-spawn': {
        auto: 'provider-tier-or-runtime-model-default',
        explicit: 'catalog-validated',
        receipt: 'actual-effort'
      }
    }
  }
};

/**
 * @param {unknown} artifact
 * @param {Record<string, unknown>} [provenance_patch]
 */
function fixtureFs(artifact, provenance_patch = {}) {
  const bytes = Buffer.from(
    typeof artifact === 'string' ? artifact : JSON.stringify(artifact)
  );
  const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');
  const blob_sha = nodeCrypto
    .createHash('sha1')
    .update(Buffer.from(`blob ${bytes.length}\0`, 'utf8'))
    .update(bytes)
    .digest('hex');
  const provenance = Buffer.from(
    JSON.stringify({
      source_repo: 'dotfiles',
      source_path: 'generated/contracts/execution-defaults.json',
      source_commit: 'abc123',
      source_blob_sha: blob_sha,
      bytes: bytes.length,
      sha256: digest,
      ...provenance_patch
    })
  );
  return {
    /** @param {string} path */
    readFileSync(path) {
      if (path === EXECUTION_DEFAULTS_PATH) {
        return bytes;
      }
      if (path === EXECUTION_DEFAULTS_PROVENANCE_PATH) {
        return provenance;
      }
      throw new Error(`unexpected path: ${String(path)}`);
    }
  };
}

describe('loadExecutionDefaults', () => {
  test('loads valid artifact facts and caches the process value', () => {
    const loaded = loadExecutionDefaults({ fs: fixtureFs(ARTIFACT) });
    const first = loadExecutionDefaults();
    const second = loadExecutionDefaults();

    expect(loaded).toMatchObject({
      supported: true,
      schema_version: 1,
      source_commit: 'abc123',
      session: { workflow_mode_default: 'standard' }
    });
    expect(first).toBe(second);
  });

  test.each([
    ['byte count', ARTIFACT, { bytes: 1 }],
    ['digest', ARTIFACT, { sha256: '0'.repeat(64) }],
    ['blob sha', ARTIFACT, { source_blob_sha: '0'.repeat(40) }],
    ['source repo', ARTIFACT, { source_repo: '' }],
    ['source path', ARTIFACT, { source_path: '' }],
    ['schema', { ...ARTIFACT, schema_version: 2 }, {}],
    ['parse', '{broken', {}]
  ])('returns unsupported on %s failure', (_name, artifact, patch) => {
    const loaded = loadExecutionDefaults({
      fs: fixtureFs(artifact, /** @type {Record<string, unknown>} */ (patch))
    });

    expect(loaded.supported).toBe(false);
    expect(loaded.session).toBe(null);
  });

  test('returns unsupported when artifact files are missing', () => {
    const loaded = loadExecutionDefaults({
      fs: {
        readFileSync() {
          throw new Error('ENOENT');
        }
      }
    });

    expect(loaded).toMatchObject({ supported: false, session: null });
  });
});

describe('projectExecutionDefaults', () => {
  test('projects launcher fallback through resolved runner catalog ids', () => {
    const projection = projectExecutionDefaults(
      {
        runners: {
          claude: {
            command: 'claude',
            efforts: ['high'],
            models: { opus: { id: 'claude-opus-custom' } }
          }
        },
        model_index: { opus: 'claude' }
      },
      { fs: fixtureFs(ARTIFACT) }
    );

    expect(projection.orchestration).toEqual({
      runtime: 'claude',
      model: 'opus',
      model_id: 'claude-opus-custom',
      effort: null,
      speed: 'default'
    });
    expect(projection.session?.implementation.default.model_id).toBe(
      'gpt-5.6-sol'
    );
  });
});
