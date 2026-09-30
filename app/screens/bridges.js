/**
 * The existing surfaces the unified shell mounts unchanged until Phase 3
 * replaces them (UI-dbn6 §4.1 bridges): the settings dialog, the compare view
 * and the ADR view. Each gets the same options it had, fed from the shell's
 * stores; the connected workspace's worker-queue store keeps feeding them.
 * The issue detail, transcript, document viewer and new-issue dialog are
 * Phase 2's own screens (`screens/detail/`, `transcript/`, `doc-viewer/`,
 * `new-issue/`).
 */
import { createAdrView } from '../views/adr/index.js';
import { createCompareView } from '../views/compare/index.js';
import { createSettingsDialog } from '../views/settings-dialog/index.js';

/**
 * @typedef {Object} BridgeDeps
 * @property {HTMLElement} root - The shell root (dialogs attach here).
 * @property {HTMLElement} compare_root
 * @property {HTMLElement} adr_root
 * @property {(type: string, payload?: unknown) => Promise<any>} send - Tracked send; rejects on error.
 * @property {(type: string, payload?: unknown) => Promise<any>} transport - Swallows errors outside the propagated set.
 * @property {{ monitor: any, queue: any, presets: any, visibility: any, displayPolicy: any, adr: any }} stores
 * @property {{ open: (doc_path: string, open_options?: any) => Promise<void>|void }} docViewer
 * @property {() => string|null} connectedPath
 * @property {(id: string, root_dir: string) => void} openIssue
 * @property {(root_dir: string) => Promise<boolean>} switchWorkspace
 * @property {(fn: () => void) => () => void} subscribeWorkspace
 * @property {(open: boolean) => void} onSettingsOpenChange
 */

/**
 * The label vocabulary the settings dialog offers: every label a visible
 * candidate carries.
 *
 * @param {any} monitor
 * @returns {string[]}
 */
function candidateLabels(monitor) {
  /** @type {Set<string>} */
  const seen = new Set();
  for (const row of monitor.get() || []) {
    for (const entry of Array.isArray(row.runnable) ? row.runnable : []) {
      for (const label of Array.isArray(entry.labels) ? entry.labels : []) {
        if (typeof label === 'string' && label) {
          seen.add(label);
        }
      }
    }
  }
  return [...seen].sort();
}

/**
 * @param {BridgeDeps} deps
 */
export function mountBridges(deps) {
  const { stores } = deps;

  const settings_dialog = createSettingsDialog(deps.root, {
    policyStore: stores.displayPolicy,
    queueStore: stores.queue,
    implPresetStore: stores.presets,
    modelVisibilityStore: stores.visibility,
    transport: (type, payload) => deps.send(type, payload),
    monitorRows: () => stores.monitor.getWorkspacesState(),
    subscribeMonitorRows: (fn) => stores.monitor.subscribe(fn),
    onOpenChange: (open) => deps.onSettingsOpenChange(open),
    labelOptions: () => candidateLabels(stores.monitor)
  });

  const compare_view = createCompareView(deps.compare_root, {
    transport: deps.transport,
    gotoIssue: (id) => deps.openIssue(id, ''),
    execPresetStore: stores.presets,
    sourceCandidates: () => []
  });

  createAdrView(deps.adr_root, {
    adrStore: stores.adr,
    gotoIssue: (id) => deps.openIssue(id, ''),
    getWorkspacePath: () => deps.connectedPath() || undefined,
    subscribeWorkspace: deps.subscribeWorkspace,
    switchWorkspace: deps.switchWorkspace,
    openDoc: (doc, root_dir) => {
      void deps.docViewer.open(doc.path, {
        missing_state: doc.missing_state,
        ...(root_dir ? { workspace: root_dir } : {})
      });
    }
  });

  return { settings_dialog, compare_view };
}
