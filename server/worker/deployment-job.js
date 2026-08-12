import { spawn } from 'node:child_process';

/** @type {ReadonlySet<string>} */
const DEPLOYMENT_STATES = new Set([
  'idle',
  'pending',
  'running',
  'succeeded',
  'failed'
]);

/**
 * @typedef {(command: string, args: string[], options: { cwd: string, shell: false, stdio: string[], windowsHide: boolean }) => import('node:child_process').ChildProcess} SpawnImpl
 */
/**
 * @typedef {(ancestor: string, descendant: string) => boolean} IsAncestor
 */

/**
 * Provider responses are an external contract. Callers must be able to tell a
 * malformed or mismatched response from an ordinary failed deployment.
 */
class DeploymentJobError extends Error {
  /**
   * @param {string} code
   * @param {string} message
   */
  constructor(code, message) {
    super(message);
    this.name = 'DeploymentJobError';
    this.code = code;
  }
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 */
function isSha(value) {
  return typeof value === 'string' && /^[0-9a-f]{40}$/i.test(value);
}

/**
 * @param {unknown} value
 */
function isGeneration(value) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

/**
 * @param {unknown} value
 * @param {string} field
 */
function requireString(value, field) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new DeploymentJobError(
      'deployment_input_invalid',
      `${field} must be a non-empty string`
    );
  }
  return value;
}

/**
 * @param {unknown} value
 * @param {string} code
 * @returns {{ target_base: string, target_sha: string, generation: number }}
 */
function bindingFrom(value, code) {
  if (
    !isRecord(value) ||
    typeof value.target_base !== 'string' ||
    value.target_base.length === 0 ||
    !isSha(value.target_sha) ||
    !isGeneration(value.generation)
  ) {
    throw new DeploymentJobError(code, 'deployment binding is invalid');
  }
  return {
    target_base: value.target_base,
    target_sha: String(value.target_sha).toLowerCase(),
    generation: Number(value.generation)
  };
}

/**
 * @param {unknown} value
 * @returns {{ state: 'idle'|'pending'|'running'|'succeeded'|'failed', target_base: string|null, target_sha: string|null, deployed_sha: string|null, generation: number|null, error_code: string|null, log_path: string|null }}
 */
function parseStatus(value) {
  if (!isRecord(value) || typeof value.state !== 'string') {
    throw new DeploymentJobError(
      'deployment_provider_malformed',
      'provider status is malformed'
    );
  }
  if (!DEPLOYMENT_STATES.has(value.state)) {
    throw new DeploymentJobError(
      'deployment_provider_malformed',
      'provider status has an unknown state'
    );
  }
  const nullable_binding =
    value.target_base === null &&
    value.target_sha === null &&
    value.generation === null;
  if (value.state === 'idle') {
    if (
      !nullable_binding ||
      value.deployed_sha !== null ||
      value.error_code !== null ||
      value.log_path !== null
    ) {
      throw new DeploymentJobError(
        'deployment_provider_malformed',
        'idle provider status carries a binding'
      );
    }
    return {
      state: 'idle',
      target_base: null,
      target_sha: null,
      deployed_sha: null,
      generation: null,
      error_code: null,
      log_path: null
    };
  }
  if (value.state === 'failed' && nullable_binding) {
    if (
      value.deployed_sha !== null ||
      typeof value.error_code !== 'string' ||
      value.error_code.length === 0 ||
      value.log_path !== null
    ) {
      throw new DeploymentJobError(
        'deployment_provider_malformed',
        'unbound provider failure has invalid fields'
      );
    }
    return {
      state: 'failed',
      target_base: null,
      target_sha: null,
      deployed_sha: null,
      generation: null,
      error_code: value.error_code,
      log_path: null
    };
  }
  const binding = bindingFrom(value, 'deployment_provider_malformed');
  const deployed_sha = value.deployed_sha;
  const error_code = value.error_code;
  const log_path = value.log_path;
  if (
    (deployed_sha !== null && !isSha(deployed_sha)) ||
    (error_code !== null &&
      (typeof error_code !== 'string' || error_code.length === 0)) ||
    (log_path !== null &&
      (typeof log_path !== 'string' || log_path.length === 0))
  ) {
    throw new DeploymentJobError(
      'deployment_provider_malformed',
      'provider status has invalid optional fields'
    );
  }
  if (
    (value.state === 'pending' &&
      (deployed_sha !== null || error_code !== null || log_path !== null)) ||
    (value.state === 'running' &&
      (deployed_sha !== null || error_code !== null || log_path === null)) ||
    (value.state === 'succeeded' &&
      (deployed_sha !== binding.target_sha ||
        error_code !== null ||
        log_path === null)) ||
    (value.state === 'failed' &&
      (deployed_sha !== null || error_code === null || log_path === null))
  ) {
    throw new DeploymentJobError(
      'deployment_provider_malformed',
      'provider status state fields disagree'
    );
  }
  return {
    state: /** @type {'pending'|'running'|'succeeded'|'failed'} */ (
      value.state
    ),
    target_base: binding.target_base,
    target_sha: binding.target_sha,
    deployed_sha:
      typeof deployed_sha === 'string' ? deployed_sha.toLowerCase() : null,
    generation: binding.generation,
    error_code,
    log_path
  };
}

/**
 * @param {unknown} value
 * @param {string} mismatch_code
 * @returns {{ accepted: boolean, noop: boolean, target_base: string, target_sha: string, generation: number, error_code: string|null }}
 */
function parseRequest(value, mismatch_code) {
  if (
    !isRecord(value) ||
    typeof value.accepted !== 'boolean' ||
    typeof value.noop !== 'boolean' ||
    (value.accepted && value.noop)
  ) {
    throw new DeploymentJobError(
      'deployment_provider_malformed',
      'provider request response is malformed'
    );
  }
  if (!value.accepted && !value.noop) {
    if (
      value.target_base !== null ||
      value.target_sha !== null ||
      value.generation !== null ||
      typeof value.error_code !== 'string' ||
      value.error_code.length === 0
    ) {
      throw new DeploymentJobError(
        'deployment_provider_malformed',
        'provider rejection response is malformed'
      );
    }
    throw new DeploymentJobError(mismatch_code, value.error_code);
  }
  if (value.error_code !== null) {
    throw new DeploymentJobError(
      'deployment_provider_malformed',
      'provider accepted response carries an error'
    );
  }
  const binding = bindingFrom(value, 'deployment_provider_malformed');
  return {
    accepted: value.accepted,
    noop: value.noop,
    ...binding,
    error_code: null
  };
}

/**
 * @param {{ target_base: string, target_sha: string, generation: number }} actual
 * @param {{ target_base: string, target_sha: string, generation: number }} expected
 * @param {string} code
 */
function requireExactBinding(actual, expected, code) {
  if (
    actual.target_base !== expected.target_base ||
    actual.target_sha !== expected.target_sha ||
    actual.generation !== expected.generation
  ) {
    throw new DeploymentJobError(code, 'provider binding does not match');
  }
}

/**
 * @param {string} repo
 * @param {string[]} args
 * @param {SpawnImpl} spawn_impl
 * @returns {Promise<{ payload: unknown, exit_code: number|null }>}
 */
function runProvider(repo, args, spawn_impl) {
  return new Promise((resolve, reject) => {
    /** @type {import('node:child_process').ChildProcess} */
    let child;
    try {
      child = spawn_impl('repo-deployctl', args, {
        cwd: repo,
        shell: false,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
    } catch (error) {
      reject(
        new DeploymentJobError(
          'deployment_provider_spawn_failed',
          error instanceof Error ? error.message : 'provider spawn failed'
        )
      );
      return;
    }
    let stdout = '';
    let stderr = '';
    /**
     * @param {import('node:stream').Readable|null|undefined} stream
     * @param {(chunk: string) => void} sink
     */
    const capture = (stream, sink) => {
      stream?.setEncoding('utf8');
      stream?.on('data', (/** @type {string} */ chunk) => {
        sink(chunk);
      });
      stream?.on('error', () => {});
    };
    capture(child.stdout, (chunk) => {
      stdout += chunk;
    });
    capture(child.stderr, (chunk) => {
      stderr += chunk;
    });
    child.on('error', (error) => {
      reject(
        new DeploymentJobError(
          'deployment_provider_spawn_failed',
          error instanceof Error ? error.message : 'provider spawn failed'
        )
      );
    });
    child.on('close', (code) => {
      try {
        resolve({ payload: JSON.parse(stdout), exit_code: code });
      } catch {
        reject(
          new DeploymentJobError(
            code === 0
              ? 'deployment_provider_malformed'
              : 'deployment_provider_failed',
            code === 0
              ? 'provider emitted malformed JSON'
              : stderr.trim() || `provider exited ${code}`
          )
        );
      }
    });
  });
}

/**
 * Create the external deployment-job client. It has no provider-file fallback:
 * all desired-state observation and mutation go through `repo-deployctl`.
 *
 * @param {{ spawn_impl?: SpawnImpl, isAncestor?: IsAncestor }} [options]
 */
export function createDeploymentJob(options = {}) {
  const spawn_impl =
    options.spawn_impl ||
    /** @type {SpawnImpl} */ (/** @type {unknown} */ (spawn));
  const isAncestor = options.isAncestor || (() => false);

  /**
   * Coverage is deliberately separate from provider desired-state parsing: a
   * newer desired generation may cover an older merged PR without matching its
   * target SHA. The caller supplies its repository ancestry primitive.
   *
   * @param {string} deployed_sha
   * @param {string} merge_sha
   */
  function covers(deployed_sha, merge_sha) {
    if (!isSha(deployed_sha) || !isSha(merge_sha)) {
      return false;
    }
    return isAncestor(merge_sha.toLowerCase(), deployed_sha.toLowerCase());
  }

  /**
   * @param {{ repo: string, target_base: string, verified_sha: string }} input
   */
  async function requestDeployment(input) {
    const repo = requireString(input?.repo, 'repo');
    const target_base = requireString(input?.target_base, 'target_base');
    if (!isSha(input?.verified_sha)) {
      throw new DeploymentJobError(
        'deployment_input_invalid',
        'verified_sha must be a SHA'
      );
    }
    const verified_sha = input.verified_sha.toLowerCase();
    const { payload, exit_code } = await runProvider(
      repo,
      [
        'request',
        '--repo',
        repo,
        '--base',
        target_base,
        '--verified-sha',
        verified_sha,
        '--json'
      ],
      spawn_impl
    );
    const result = parseRequest(payload, 'deployment_request_rejected');
    if (exit_code !== 0) {
      throw new DeploymentJobError(
        'deployment_provider_failed',
        `provider exited ${exit_code}`
      );
    }
    if (result.target_base !== target_base) {
      throw new DeploymentJobError(
        'deployment_binding_mismatch',
        'provider returned another target base'
      );
    }
    if (
      (result.accepted && result.target_sha !== verified_sha) ||
      (result.noop &&
        result.target_sha !== verified_sha &&
        !isAncestor(verified_sha, result.target_sha))
    ) {
      throw new DeploymentJobError(
        'deployment_binding_mismatch',
        'provider returned an unrelated target SHA'
      );
    }
    return result;
  }

  /**
   * @param {{ repo: string, current_binding?: { target_base: string, target_sha: string, generation: number }, row_binding?: { verified_target_sha: string, deployment_generation: number } }} input
   */
  async function deploymentStatus(input) {
    const repo = requireString(input?.repo, 'repo');
    const { payload, exit_code } = await runProvider(
      repo,
      ['status', '--repo', repo, '--json'],
      spawn_impl
    );
    const result = parseStatus(payload);
    if (exit_code !== 0 && result.state !== 'failed') {
      throw new DeploymentJobError(
        'deployment_provider_failed',
        `provider exited ${exit_code}`
      );
    }
    if (input.current_binding) {
      const expected = bindingFrom(
        input.current_binding,
        'deployment_binding_mismatch'
      );
      if (result.state === 'idle') {
        throw new DeploymentJobError(
          'deployment_binding_mismatch',
          'provider lost the current desired binding'
        );
      }
      requireExactBinding(
        bindingFrom(result, 'deployment_binding_mismatch'),
        expected,
        'deployment_binding_mismatch'
      );
    }
    if (input.row_binding) {
      const row = input.row_binding;
      if (
        !isSha(row.verified_target_sha) ||
        !isGeneration(row.deployment_generation)
      ) {
        throw new DeploymentJobError(
          'deployment_row_binding_invalid',
          'row deployment binding is invalid'
        );
      }
      if (result.state === 'idle' || result.generation === null) {
        throw new DeploymentJobError(
          'deployment_generation_stale',
          'provider has no current generation for the row'
        );
      }
      if (result.generation < row.deployment_generation) {
        throw new DeploymentJobError(
          'deployment_generation_stale',
          'provider generation regressed below the row'
        );
      }
      if (
        result.generation === row.deployment_generation &&
        result.target_sha !== row.verified_target_sha.toLowerCase()
      ) {
        throw new DeploymentJobError(
          'deployment_binding_mismatch',
          'row target SHA disagrees at the same generation'
        );
      }
    }
    return result;
  }

  /**
   * @param {{ repo: string, current_binding: { target_base: string, target_sha: string, generation: number } }} input
   */
  async function retryDeployment(input) {
    const repo = requireString(input?.repo, 'repo');
    const current_binding = bindingFrom(
      input?.current_binding,
      'deployment_retry_binding_mismatch'
    );
    const { payload, exit_code } = await runProvider(
      repo,
      ['retry', '--repo', repo, '--json'],
      spawn_impl
    );
    const result = parseRequest(payload, 'deployment_retry_binding_mismatch');
    if (exit_code !== 0) {
      throw new DeploymentJobError(
        'deployment_provider_failed',
        `provider exited ${exit_code}`
      );
    }
    if (
      result.target_base !== current_binding.target_base ||
      result.target_sha !== current_binding.target_sha ||
      result.generation !== current_binding.generation + 1
    ) {
      throw new DeploymentJobError(
        'deployment_retry_binding_mismatch',
        'retry response is not a newer current binding'
      );
    }
    return result;
  }

  return { requestDeployment, deploymentStatus, retryDeployment, covers };
}

export { DeploymentJobError };
