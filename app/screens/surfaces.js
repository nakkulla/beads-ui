/**
 * The screens the shell mounts next to the pipeline (UI-dbn6 §3.7–§3.9): the
 * settings dialog (`screens/settings/`), the compare screen
 * (`screens/compare/`) and the ADR screen (`screens/adr/`), each fed from the
 * shell's stores. No old view is mounted any more.
 */
import { createAdrView } from './adr/index.js';
import { createCompareView } from './compare/index.js';
import { createSettingsDialog } from './settings/index.js';

/**
 * @typedef {Object} SurfaceDeps
 * @property {HTMLElement} root - The shell root (dialogs attach here).
 * @property {HTMLElement} compare_root
 * @property {HTMLElement} adr_root
 * @property {(type: string, payload?: unknown) => Promise<any>} send - Tracked send; rejects on error.
 * @property {(type: string, payload?: unknown) => Promise<any>} transport - Swallows errors outside the propagated set.
 * @property {{ monitor: any, queue: any, presets: any, visibility: any, adr: any }} stores
 * @property {import('./settings/index.js').SettingsWorkspaces} workspaces
 * @property {{ open: (doc_path: string, open_options?: any) => Promise<void>|void }} docViewer
 * @property {() => string|null} connectedPath
 * @property {(id: string, root_dir: string) => void} openIssue
 * @property {(root_dir: string) => Promise<boolean>} switchWorkspace
 * @property {(fn: () => void) => () => void} subscribeWorkspace
 * @property {(open: boolean) => void} onSettingsOpenChange
 */

/**
 * @param {SurfaceDeps} deps
 */
export function mountSurfaces(deps) {
  const { stores } = deps;

  const settings_dialog = createSettingsDialog(deps.root, {
    queueStore: stores.queue,
    implPresetStore: stores.presets,
    modelVisibilityStore: stores.visibility,
    transport: (type, payload) => deps.send(type, payload),
    monitorRows: () => stores.monitor.getWorkspacesState(),
    subscribeMonitorRows: (fn) => stores.monitor.subscribe(fn),
    onOpenChange: (open) => deps.onSettingsOpenChange(open),
    workspaces: deps.workspaces
  });

  const compare_view = createCompareView(deps.compare_root, {
    transport: deps.transport,
    gotoIssue: (id, root_dir) => deps.openIssue(id, root_dir || '')
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
