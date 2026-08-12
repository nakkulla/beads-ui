import { createWorkspaceSnapshotCoordinator } from './workspace-snapshot-coordinator.js';

/** @type {Map<string, ReturnType<typeof createWorkspaceSnapshotCoordinator>>} */
const COORDINATORS = new Map();

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
}

/**
 * @param {string | undefined} root_dir
 */
function coordinatorFor(root_dir) {
  const key = workspaceKey(root_dir);
  let coordinator = COORDINATORS.get(key);
  if (!coordinator) {
    coordinator = createWorkspaceSnapshotCoordinator({
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
