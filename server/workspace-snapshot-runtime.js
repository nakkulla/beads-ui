import { createWorkspaceSnapshotCoordinator } from './workspace-snapshot-coordinator.js';

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
 * Read the last successful snapshot of one workspace WITHOUT asking for a new
 * one (UI-d13v §3.5).
 *
 * A cross-workspace reader — the follow-up count of a bead whose waiters live
 * in another rig — must not drive that rig's refresh cadence: fanning a
 * generation out per visible workspace multiplies every projection by the
 * number of open repos for a number that tolerates being one cycle late. A
 * workspace nobody has subscribed to therefore reads as `null`, and no
 * coordinator is created for it.
 *
 * @param {string | undefined} root_dir
 * @returns {import('./workspace-snapshot-coordinator.js').WorkspaceSnapshot | null}
 */
export function peekWorkspaceSnapshot(root_dir) {
  const coordinator = COORDINATORS.get(workspaceKey(root_dir));
  return coordinator ? coordinator.getSnapshot() : null;
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
      cwd: root_dir || undefined
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
