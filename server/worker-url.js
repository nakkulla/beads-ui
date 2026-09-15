import { execFile } from 'node:child_process';

/**
 * Run the installed helper without changing the service account environment.
 *
 * @param {string} file
 * @param {string[]} argv
 * @param {import('node:child_process').ExecFileOptions & { input?: string }} options
 * @returns {Promise<{stdout: string}>}
 */
function runHelper(file, argv, options) {
  return new Promise((resolve, reject) => {
    const { input, ...exec_options } = options;
    const child = execFile(file, argv, exec_options, (error, stdout) => {
      if (error) {
        reject(Object.assign(error, { stdout }));
      } else {
        resolve({ stdout: String(stdout) });
      }
    });
    // A process exiting before consuming stdin is handled by execFile's result.
    child.stdin?.on('error', () => {});
    child.stdin?.end(input);
  });
}

/** @param {unknown} value */
function nullableString(value) {
  return value === null || typeof value === 'string';
}

/** @param {any} common */
function validCommon(common) {
  return (
    common !== null &&
    typeof common === 'object' &&
    nullableString(common.value) &&
    nullableString(common.revision) &&
    ['configured', 'unset', 'invalid', 'unavailable'].includes(common.state)
  );
}

/** @param {string} [code] */
function unavailable(code = 'helper_unavailable') {
  return { status: /** @type {const} */ ('unavailable'), error: { code } };
}

/**
 * @param {string[]} argv
 * @param {typeof runHelper} run
 * @param {string} [input]
 * @returns {Promise<any>}
 */
async function invoke(argv, run, input) {
  try {
    const result = await run('worker-url', argv, {
      timeout: 12000,
      maxBuffer: 1024 * 1024,
      encoding: 'utf8',
      input
    });
    const parsed = JSON.parse(result.stdout);
    return parsed?.schema === 1 ? parsed : null;
  } catch (error) {
    try {
      const parsed = JSON.parse(/** @type {any} */ (error).stdout);
      if (parsed?.schema === 1 && typeof parsed.error?.code === 'string') {
        return { schema: 1, error: { code: parsed.error.code } };
      }
    } catch {
      // A missing helper, timeout or malformed response has no producer error.
    }
    return null;
  }
}

/**
 * @param {{ root: string, workspace: Record<string, unknown> }} input
 * @param {typeof runHelper} [run]
 */
export async function resolveWorkerUrl({ root, workspace }, run = runHelper) {
  const result = await invoke(
    ['resolve', '--root', root, '--workspace-json-stdin', '--json'],
    run,
    JSON.stringify(workspace)
  );
  if (
    !result ||
    result.error ||
    !nullableString(result.effective_url) ||
    !['workspace', 'common', 'unset'].includes(result.source) ||
    !nullableString(result.workspace_override) ||
    !validCommon(result.common) ||
    !Array.isArray(result.warnings)
  ) {
    return unavailable();
  }
  const { effective_url, source, workspace_override, common, warnings } =
    result;
  return {
    status: 'ok',
    effective_url,
    source,
    workspace_override,
    common,
    warnings
  };
}

/**
 * @param {{ value: string|null, expected_revision: string }} input
 * @param {typeof runHelper} [run]
 */
export async function commonSet({ value, expected_revision }, run = runHelper) {
  const result = await invoke(
    [
      'common',
      'set',
      '--json',
      '--expect-revision',
      expected_revision,
      ...(value === null ? ['--unset'] : ['--value', value])
    ],
    run
  );
  if (!result || result.error || !validCommon(result.common)) {
    return unavailable(result?.error?.code);
  }
  return { status: /** @type {const} */ ('ok'), common: result.common };
}

/** @param {typeof runHelper} [run] */
export async function commonGet(run = runHelper) {
  const result = await invoke(['common', 'get', '--json'], run);
  return result && !result.error && validCommon(result.common)
    ? { status: 'ok', common: result.common }
    : unavailable(result?.error?.code);
}
