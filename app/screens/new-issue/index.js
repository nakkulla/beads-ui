import { closeDialog, showDialog } from '../../ui/dialog.js';
import { ISSUE_TYPES, typeLabel } from '../../utils/issue-type.js';
import { priority_levels } from '../../utils/priority.js';

/**
 * The new-issue screen (UI-dbn6 §3.1): the native `<dialog>` form (title,
 * type, priority, labels, markdown description; Ctrl/Cmd+Enter submits, the
 * last type and priority are remembered) plus, in the 전체 scope, the target
 * repository picker. `create-issue` writes to the CONNECTED workspace, so a
 * repo other than the connected one is connected first (`set-workspace`)
 * and nothing is sent when that switch fails.
 *
 * @typedef {Object} NewIssueOptions
 * @property {() => Array<{ root_dir: string, name: string }>|null} [targets] -
 * The repos to offer (전체 scope), or null to hide the picker (레포 scope).
 * @property {() => string|null} [connected] - The connected repo, the default.
 * @property {(root_dir: string) => Promise<boolean>} [switchWorkspace]
 */

/**
 * Create and manage the New Issue dialog (native <dialog>).
 *
 * @param {HTMLElement} mount_element - Container to attach dialog (e.g., main#app)
 * @param {(type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<unknown>} sendFn - Transport function
 * @param {NewIssueOptions} [options]
 * @returns {{ open: () => void, close: () => void }}
 */
export function createNewIssueDialog(mount_element, sendFn, options = {}) {
  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'new-issue-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');

  dialog.innerHTML = `
    <div class="new-issue__container" part="container">
      <header class="new-issue__header">
        <div class="new-issue__title">New Issue</div>
        <button type="button" class="new-issue__close" aria-label="Close">×</button>
      </header>
      <div class="new-issue__body">
        <form id="new-issue-form" class="new-issue__form">
          <div class="new-issue__repo" id="new-repo-row" hidden>
            <label for="new-repo">Repository</label>
            <select id="new-repo" name="repo" aria-label="Repository"></select>
          </div>
          <label for="new-title">Title</label>
          <input id="new-title" name="title" type="text" required placeholder="Short summary" />

          <label for="new-type">Type</label>
          <select id="new-type" name="type" aria-label="Issue type"></select>

          <label for="new-priority">Priority</label>
          <select id="new-priority" name="priority" aria-label="Priority"></select>

          <label for="new-labels">Labels</label>
          <input id="new-labels" name="labels" type="text" placeholder="comma,separated" />

          <label for="new-description">Description</label>
          <textarea id="new-description" name="description" rows="6" placeholder="Optional markdown description"></textarea>

          <div aria-live="polite" role="status" class="new-issue__error" id="new-issue-error"></div>

          <div class="new-issue__actions" style="grid-column: 1 / -1">
            <button type="button" id="btn-cancel">Cancel (Esc)</button>
            <button type="submit" id="btn-create">Create</button>
          </div>
        </form>
      </div>
    </div>
  `;

  mount_element.appendChild(dialog);

  const form = /** @type {HTMLFormElement} */ (
    dialog.querySelector('#new-issue-form')
  );
  const input_title = /** @type {HTMLInputElement} */ (
    dialog.querySelector('#new-title')
  );
  const sel_type = /** @type {HTMLSelectElement} */ (
    dialog.querySelector('#new-type')
  );
  const sel_priority = /** @type {HTMLSelectElement} */ (
    dialog.querySelector('#new-priority')
  );
  const input_labels = /** @type {HTMLInputElement} */ (
    dialog.querySelector('#new-labels')
  );
  const input_description = /** @type {HTMLTextAreaElement} */ (
    dialog.querySelector('#new-description')
  );
  const error_box = /** @type {HTMLDivElement} */ (
    dialog.querySelector('#new-issue-error')
  );
  const btn_cancel = /** @type {HTMLButtonElement} */ (
    dialog.querySelector('#btn-cancel')
  );
  const btn_create = /** @type {HTMLButtonElement} */ (
    dialog.querySelector('#btn-create')
  );
  const btn_close = /** @type {HTMLButtonElement} */ (
    dialog.querySelector('.new-issue__close')
  );
  const repo_row = /** @type {HTMLDivElement} */ (
    dialog.querySelector('#new-repo-row')
  );
  const sel_repo = /** @type {HTMLSelectElement} */ (
    dialog.querySelector('#new-repo')
  );

  /**
   * Fill the target picker for this open: every offered repo, the connected
   * one chosen. No targets (레포 scope) hides the row.
   */
  function populateRepos() {
    const targets = options.targets ? options.targets() : null;
    sel_repo.replaceChildren();
    if (!targets || targets.length === 0) {
      repo_row.hidden = true;
      return;
    }
    const connected = options.connected ? options.connected() : null;
    for (const target of targets) {
      const o = document.createElement('option');
      o.value = target.root_dir;
      o.textContent = target.name;
      sel_repo.appendChild(o);
    }
    sel_repo.value =
      connected && targets.some((target) => target.root_dir === connected)
        ? connected
        : targets[0].root_dir;
    repo_row.hidden = false;
  }

  // Populate selects
  function populateSelects() {
    sel_type.replaceChildren();
    // Empty option to allow leaving type unspecified
    const optEmpty = document.createElement('option');
    optEmpty.value = '';
    optEmpty.textContent = '— Select —';
    sel_type.appendChild(optEmpty);
    for (const t of ISSUE_TYPES) {
      const o = document.createElement('option');
      o.value = t;
      o.textContent = typeLabel(t);
      sel_type.appendChild(o);
    }

    sel_priority.replaceChildren();
    for (let i = 0; i <= 4; i += 1) {
      const o = document.createElement('option');
      o.value = String(i);
      const label = priority_levels[i] || 'Medium';
      o.textContent = `${i} – ${label}`;
      sel_priority.appendChild(o);
    }
  }
  populateSelects();

  function requestClose() {
    try {
      closeDialog(dialog);
    } catch {
      dialog.removeAttribute('open');
    }
  }

  /**
   * @param {boolean} is_busy
   */
  function setBusy(is_busy) {
    input_title.disabled = is_busy;
    sel_repo.disabled = is_busy;
    sel_type.disabled = is_busy;
    sel_priority.disabled = is_busy;
    input_labels.disabled = is_busy;
    input_description.disabled = is_busy;
    btn_cancel.disabled = is_busy;
    btn_create.disabled = is_busy;
    btn_create.textContent = is_busy ? 'Creating…' : 'Create';
  }

  function clearError() {
    error_box.textContent = '';
  }

  /**
   * @param {string} msg
   */
  function setError(msg) {
    error_box.textContent = msg;
  }

  function loadDefaults() {
    try {
      const t = window.localStorage.getItem('beads-ui.new.type');
      if (t) {
        sel_type.value = t;
      } else {
        sel_type.value = '';
      }
      const p = window.localStorage.getItem('beads-ui.new.priority');
      if (p && /^\d$/.test(p)) {
        sel_priority.value = p;
      } else {
        sel_priority.value = '2';
      }
    } catch {
      sel_type.value = '';
      sel_priority.value = '2';
    }
  }

  function saveDefaults() {
    const t = sel_type.value || '';
    const p = sel_priority.value || '';
    if (t.length > 0) {
      window.localStorage.setItem('beads-ui.new.type', t);
    }
    if (p.length > 0) {
      window.localStorage.setItem('beads-ui.new.priority', p);
    }
  }

  /**
   * Submit handler: validate, create, then open the created issue details.
   *
   * @returns {Promise<void>}
   */
  async function createNow() {
    clearError();
    const title = String(input_title.value || '').trim();
    if (title.length === 0) {
      setError('Title is required');
      input_title.focus();
      return;
    }
    const prio = Number(sel_priority.value || '2');
    if (!(prio >= 0 && prio <= 4)) {
      setError('Priority must be 0..4');
      sel_priority.focus();
      return;
    }
    const type = String(sel_type.value || '');
    const desc = String(input_description.value || '');

    /** @type {{ title: string, type?: string, priority?: number, description?: string }} */
    const payload = { title };
    if (type.length > 0) {
      payload.type = type;
    }
    if (String(prio).length > 0) {
      payload.priority = prio;
    }
    if (desc.length > 0) {
      payload.description = desc;
    }

    setBusy(true);
    const target = repo_row.hidden ? '' : sel_repo.value;
    const connected = options.connected ? options.connected() : null;
    if (target && target !== connected && options.switchWorkspace) {
      const switched = await options.switchWorkspace(target);
      if (!switched) {
        setBusy(false);
        setError('Failed to switch workspace');
        return;
      }
    }
    try {
      await sendFn('create-issue', payload);
    } catch {
      setBusy(false);
      setError('Failed to create issue');
      return;
    }

    saveDefaults();

    setBusy(false);
    requestClose();
  }

  // Events
  dialog.addEventListener('cancel', (ev) => {
    ev.preventDefault();
    requestClose();
  });
  btn_close.addEventListener('click', () => requestClose());
  btn_cancel.addEventListener('click', () => requestClose());
  dialog.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault();
      void createNow();
    }
  });
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    void createNow();
  });

  return {
    open() {
      form.reset();
      clearError();
      loadDefaults();
      populateRepos();
      try {
        showDialog(dialog);
      } catch {
        dialog.setAttribute('open', '');
      }
      setTimeout(() => {
        try {
          input_title.focus();
        } catch {
          // ignore
        }
      }, 0);
    },
    close() {
      requestClose();
    }
  };
}
