import { execFileSync } from 'node:child_process';

const SHARED_SERVICE_LABEL = 'com.beads-ui.server';

/**
 * Return true when the launchd-managed shared beads-ui service is running for
 * the current user session.
 *
 * @returns {boolean}
 */
export function isManagedSharedServiceRunning() {
  if (process.platform !== 'darwin' || typeof process.getuid !== 'function') {
    return false;
  }

  try {
    const output = execFileSync(
      'launchctl',
      ['print', `gui/${process.getuid()}/${SHARED_SERVICE_LABEL}`],
      {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    return output.includes('state = running');
  } catch {
    return false;
  }
}
