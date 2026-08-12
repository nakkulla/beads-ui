import { runBdJson } from './bd.js';
import { createWorkspaceSnapshotCoordinator } from './workspace-snapshot-coordinator.js';

const SUPPORTED_DEPENDENCY_IDENTITY = {
  version: '1.2.0-fork.1',
  commit: '6da490c1b54ed410150422380bb91fcf6f910bfa'
};

/** @type {Map<string, ReturnType<typeof createWorkspaceSnapshotCoordinator>>} */
const COORDINATORS = new Map();
/** @type {typeof createWorkspaceSnapshotCoordinator} */
let coordinatorFactory = createWorkspaceSnapshotCoordinator;

/**
 * Request the shared raw snapshot for one workspace.
 *
 * @param {string | undefined} root_dir
 * @param {string} cause
 */
export function requestWorkspaceSnapshot(root_dir, cause) {
  return coordinatorFor(root_dir).request(cause);
}

/**
 * Record successful mutation evidence for one workspace without starting a
 * generation unless that workspace already has a pending retry.
 *
 * @param {string | undefined} root_dir
 */
export function signalWorkspaceSnapshotMutation(root_dir) {
  const key = workspaceKey(root_dir);
  const coordinator = COORDINATORS.get(key);
  if (coordinator) {
    coordinator.signalMutation();
  }
}

/**
 * Clear the process-local coordinators between isolated tests.
 */
export function __resetWorkspaceSnapshotRuntimeForTest() {
  COORDINATORS.clear();
  coordinatorFactory = createWorkspaceSnapshotCoordinator;
}

/**
 * Replace the runtime coordinator factory for an isolated integration test.
 *
 * @param {typeof createWorkspaceSnapshotCoordinator} factory
 */
export function __setWorkspaceSnapshotCoordinatorFactoryForTest(factory) {
  coordinatorFactory = factory;
  COORDINATORS.clear();
}

/**
 * @param {string | undefined} root_dir
 */
function coordinatorFor(root_dir) {
  const key = workspaceKey(root_dir);
  let coordinator = COORDINATORS.get(key);
  if (!coordinator) {
    coordinator = coordinatorFactory({
      cwd: root_dir || undefined,
      resolveDependencyMode: () =>
        resolveLiveDependencyMode(root_dir || undefined)
    });
    COORDINATORS.set(key, coordinator);
  }
  return coordinator;
}

/**
 * @param {string | undefined} root_dir
 */
function workspaceKey(root_dir) {
  return String(root_dir || '');
}

/**
 * Resolve the capability from the exact immutable CLI build attested by the
 * runner-boundary test. Unknown and failed identities deliberately retain the
 * compatibility fallback instead of inferring support from list rows.
 *
 * @param {string | undefined} cwd
 * @returns {Promise<'embedded-dependencies'|'legacy-dependency-fallback'>}
 */
async function resolveLiveDependencyMode(cwd) {
  try {
    const result = await runBdJson(['version', '--json'], { cwd });
    if (result.code === 0 && isSupportedDependencyIdentity(result.stdoutJson)) {
      return 'embedded-dependencies';
    }
  } catch {
    // A failed capability probe must preserve provenance through the fallback.
  }
  return 'legacy-dependency-fallback';
}

/**
 * @param {unknown} value
 */
function isSupportedDependencyIdentity(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    /** @type {Record<string, unknown>} */ (value).version ===
      SUPPORTED_DEPENDENCY_IDENTITY.version &&
    /** @type {Record<string, unknown>} */ (value).commit ===
      SUPPORTED_DEPENDENCY_IDENTITY.commit
  );
}
