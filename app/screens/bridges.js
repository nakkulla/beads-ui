/**
 * The existing surfaces the unified shell mounts unchanged until Phases 2–3
 * replace them (UI-dbn6 §4.1 bridges): the document viewer, the new-issue
 * dialog, the settings dialog, the compare view, the ADR view and the issue
 * detail panel. Each gets the same options it had, fed from the shell's
 * stores; the connected workspace's worker-queue store keeps feeding them.
 */
import { ALL_SCOPE } from '../core/state.js';
import { depCandidateModel } from '../model/dep-candidates.js';
import { createAdrView } from '../views/adr/index.js';
import { createCompareView } from '../views/compare/index.js';
import { createDetailPanel } from '../views/detail-panel/index.js';
import { createMdViewer } from '../views/detail-panel/md-viewer.js';
import { createNewIssueDialog } from '../views/new-issue-dialog.js';
import { createSettingsDialog } from '../views/settings-dialog/index.js';

/**
 * @typedef {Object} BridgeDeps
 * @property {HTMLElement} root - The shell root (dialogs attach here).
 * @property {HTMLElement} compare_root
 * @property {HTMLElement} adr_root
 * @property {HTMLElement} detail_mount
 * @property {(type: string, payload?: unknown) => Promise<any>} send - Tracked send; rejects on error.
 * @property {(type: string, payload?: unknown) => Promise<any>} transport - Swallows errors outside the propagated set.
 * @property {{ monitor: any, queue: any, presets: any, visibility: any, sessionLog: any, issues: any, displayPolicy: any, adr: any }} stores
 * @property {() => string|null} connectedPath
 * @property {() => string} effectiveScope
 * @property {(id: string, root_dir: string) => void} openIssue
 * @property {(root_dir: string) => Promise<boolean>} switchWorkspace
 * @property {() => void} closeIssue
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
  const md_mount = document.createElement('div');
  md_mount.className = 'md-viewer-root';
  document.body.appendChild(md_mount);
  const md_viewer = createMdViewer(md_mount, {
    getWorkspacePath: () => deps.connectedPath() || undefined
  });

  const new_issue_dialog = createNewIssueDialog(deps.root, (type, payload) =>
    deps.send(type, payload)
  );

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
      void md_viewer.open(doc.path, {
        missing_state: doc.missing_state,
        ...(root_dir ? { workspace: root_dir } : {})
      });
    }
  });

  const detail_panel = createDetailPanel(deps.detail_mount, {
    issueStores: stores.issues,
    transport: deps.transport,
    queueStore: stores.queue,
    pipelineStore: stores.monitor,
    execPresetStore: stores.presets,
    modelVisibilityStore: stores.visibility,
    sessionLogStore: stores.sessionLog,
    getWorkspacePath: () => deps.connectedPath() || undefined,
    mdViewer: md_viewer,
    depCandidates: () => {
      const workspaces = stores.monitor.get();
      if (workspaces === null) {
        return null;
      }
      const scope = deps.effectiveScope();
      const states = stores.monitor.getWorkspacesState();
      return scope === ALL_SCOPE
        ? depCandidateModel(workspaces, states)
        : depCandidateModel(workspaces, states, { root_dir: scope });
    },
    subscribeCandidates: (fn) => stores.monitor.subscribe(fn),
    onNavigate: (id, root_dir) => deps.openIssue(id, root_dir || ''),
    onClose: () => deps.closeIssue(),
    onOpenExecPresets: () => settings_dialog.open('execution')
  });

  return {
    new_issue_dialog,
    settings_dialog,
    compare_view,
    detail_panel
  };
}
