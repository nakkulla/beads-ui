/**
 * The `▶ 바로 실행` confirm dialog (UI-qbgj §3.4). The Worker tab, the Monitor
 * tab and the issue detail panel all reach it through the one shared click
 * rule (`runExternalWaitAction`), so the three surfaces never diverge.
 *
 * The material is the server action's payload — the Slurm job id, the ssh host
 * and the display-only `capacity` — and the renderer never re-judges whether
 * the button may stand. The defaults are the host's real headroom times the
 * server-global ratio (`takeover_ratio_percent`, default 80). Without
 * `capacity.host` both fields start empty and the run button stays off until a
 * person fills them.
 *
 * @typedef {import('../../protocol.js').CapacityView} CapacityView
 * @typedef {Object} TakeoverMaterial
 * @property {string} root_dir
 * @property {string} wait_id
 * @property {string} job_id
 * @property {string} ssh_host
 * @property {CapacityView|null} capacity
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { TAKEOVER_RATIO_FALLBACK } from '../../data/external-wait-settings-store.js';
import { errorText } from '../../utils/error-text.js';
import { formatClockLocal } from '../../utils/relative-time.js';

/** The overcommit warning (UI-qbgj §3.4). */
export const TAKEOVER_OVERCOMMIT_WARNING =
  '공용 서버: Slurm이 다른 사용자에게 배정한 자원을 나눠 쓴다';

/** @type {() => (number|null)} */
let ratio_source = () => null;

/**
 * Point the dialog at the server-global ratio (`main.js` binds the
 * external-wait settings store here). A source that answers null keeps the
 * fallback 80.
 *
 * @param {() => (number|null)} source
 */
export function bindTakeoverRatioSource(source) {
  ratio_source = source;
}

/**
 * The ratio in percent the dialog uses right now.
 *
 * @returns {number}
 */
export function takeoverRatioPercent() {
  const value = ratio_source();
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : TAKEOVER_RATIO_FALLBACK;
}

/**
 * The fields the dialog opens with: `floor((cpus − load1) × ratio)` CPUs and
 * `floor(mem_available / 1024 × ratio)` G. A field whose default is below 1, or
 * a capacity without `host`, opens empty — the server refuses 0.
 *
 * @param {CapacityView|null|undefined} capacity
 * @param {number} ratio_percent
 * @returns {{ cpus: string, mem_gb: string }}
 */
export function takeoverDefaults(capacity, ratio_percent) {
  const host = capacity?.host;
  if (!host) {
    return { cpus: '', mem_gb: '' };
  }
  const ratio = ratio_percent / 100;
  const cpus = Math.floor((host.cpus - host.load1) * ratio);
  const mem_gb = Math.floor((host.mem_available_mb / 1024) * ratio);
  return {
    cpus: cpus >= 1 ? String(cpus) : '',
    mem_gb: mem_gb >= 1 ? String(mem_gb) : ''
  };
}

/**
 * One field as an integer ≥ 1, or null.
 *
 * @param {string} text
 * @returns {number|null}
 */
export function parseTakeoverCount(text) {
  const trimmed = String(text ?? '').trim();
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }
  const value = Number(trimmed);
  return Number.isSafeInteger(value) && value >= 1 ? value : null;
}

/**
 * Whether a request goes past Slurm's unallocated share of the partition —
 * `cpu_total − cpu_alloc` CPUs or `mem_total_mb − mem_alloc_mb` memory.
 *
 * @param {CapacityView|null|undefined} capacity
 * @param {number|null} cpus
 * @param {number|null} mem_gb
 * @returns {boolean}
 */
export function takeoverOvercommits(capacity, cpus, mem_gb) {
  const slurm = capacity?.slurm;
  if (!slurm) {
    return false;
  }
  return (
    (cpus !== null && cpus > slurm.cpu_total - slurm.cpu_alloc) ||
    (mem_gb !== null && mem_gb * 1024 > slurm.mem_total_mb - slurm.mem_alloc_mb)
  );
}

/**
 * The guidance lines: the Slurm allocation, the real headroom, when that
 * capacity was read, and what the run does to the original job. Lines without
 * material are left out.
 *
 * @param {TakeoverMaterial} material
 * @param {number|null} cpus
 * @returns {string[]}
 */
export function takeoverGuidance(material, cpus) {
  const capacity = material.capacity;
  const slurm = capacity?.slurm;
  const host = capacity?.host;
  const read_time = formatClockLocal(capacity?.observed_at);
  return [
    slurm
      ? `Slurm 배정 · ${capacity.partition} CPU ${slurm.cpu_alloc}/${slurm.cpu_total} · 메모리 ${Math.floor(slurm.mem_alloc_mb / 1024)}/${Math.floor(slurm.mem_total_mb / 1024)}G`
      : '',
    host
      ? `실제 여유 · ${host.name} CPU ${Math.max(0, Math.floor(host.cpus - host.load1))}/${host.cpus} (부하 ${Math.round(host.load1)}) · 쓸 수 있는 메모리 ${Math.floor(host.mem_available_mb / 1024)}G`
      : '',
    read_time ? `용량 확인 ${read_time}` : '',
    cpus !== null
      ? `원 Slurm 작업 ${material.job_id}는 취소되고, 워크플로면 하위 단계까지 이 서버에서 ${cpus}코어 안에서 돈다`
      : `원 Slurm 작업 ${material.job_id}는 취소되고, 워크플로면 하위 단계까지 이 서버에서 돈다`
  ].filter(Boolean);
}

/**
 * Read the dialog material off a `data-takeover` button.
 *
 * @param {HTMLElement} button
 * @returns {TakeoverMaterial|null}
 */
export function takeoverMaterialOf(button) {
  /** @type {any} */
  let parsed = null;
  try {
    parsed = JSON.parse(button.dataset.takeover || 'null');
  } catch {
    parsed = null;
  }
  const root_dir = button.dataset.rootDir || '';
  const wait_id = button.dataset.waitId || '';
  if (
    !parsed ||
    typeof parsed.job_id !== 'string' ||
    !parsed.job_id ||
    !root_dir ||
    !wait_id
  ) {
    return null;
  }
  return {
    root_dir,
    wait_id,
    job_id: parsed.job_id,
    ssh_host: typeof parsed.ssh_host === 'string' ? parsed.ssh_host : '',
    capacity:
      parsed.capacity && typeof parsed.capacity === 'object'
        ? parsed.capacity
        : null
  };
}

/**
 * Open the dialog and run the takeover. The request goes out only on
 * `[바로 실행]`; a refusal keeps the dialog open with the server's message,
 * and a success hands the reply to `adopt` and closes it.
 *
 * @param {TakeoverMaterial} material
 * @param {{ transport: (type: string, payload?: unknown) => Promise<any>, adopt?: (res: any) => void, ratio?: number, document?: Document }} deps
 * @returns {Promise<{ sent: boolean, ok: boolean, res?: any }>}
 */
export function openTakeoverDialog(material, deps) {
  const doc = deps.document || document;
  const defaults = takeoverDefaults(
    material.capacity,
    deps.ratio ?? takeoverRatioPercent()
  );
  let cpus_text = defaults.cpus;
  let mem_text = defaults.mem_gb;
  let error = '';
  let busy = false;
  let sent = false;
  const dialog = doc.createElement('dialog');
  dialog.className = 'op-dialog takeover-dialog';
  dialog.setAttribute('aria-label', '바로 실행');
  doc.body.append(dialog);

  return new Promise((resolve) => {
    /**
     * @param {boolean} ok
     * @param {any} [res]
     */
    const finish = (ok, res) => {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      }
      dialog.remove();
      resolve({ sent, ok, ...(res === undefined ? {} : { res }) });
    };

    const onConfirm = async () => {
      const cpus = parseTakeoverCount(cpus_text);
      const mem_gb = parseTakeoverCount(mem_text);
      if (busy || cpus === null || mem_gb === null) {
        return;
      }
      busy = true;
      error = '';
      draw();
      sent = true;
      try {
        const res = await deps.transport('external_wait_takeover', {
          root_dir: material.root_dir,
          wait_id: material.wait_id,
          cpus,
          mem_gb
        });
        if (res?.ok === false) {
          error = String(
            res.message || res.error || '바로 실행에 실패했습니다'
          );
          busy = false;
          draw();
          return;
        }
        deps.adopt?.(res);
        finish(true, res);
      } catch (err) {
        error = errorText(err) || '바로 실행에 실패했습니다';
        busy = false;
        draw();
      }
    };

    function draw() {
      const cpus = parseTakeoverCount(cpus_text);
      const mem_gb = parseTakeoverCount(mem_text);
      const ready = cpus !== null && mem_gb !== null && !busy;
      const overcommit = takeoverOvercommits(material.capacity, cpus, mem_gb);
      render(
        html`<h2>▶ 바로 실행 · Slurm ${material.job_id}</h2>
          <div class="takeover-dialog__fields">
            <label>
              CPU
              <input
                type="number"
                class="ui-input takeover-dialog__cpus"
                inputmode="numeric"
                min="1"
                step="1"
                .value=${live(cpus_text)}
                ?disabled=${busy}
                @input=${(/** @type {Event} */ ev) => {
                  cpus_text = /** @type {HTMLInputElement} */ (ev.target).value;
                  draw();
                }}
              />
            </label>
            <label>
              메모리(G)
              <input
                type="number"
                class="ui-input takeover-dialog__mem"
                inputmode="numeric"
                min="1"
                step="1"
                .value=${live(mem_text)}
                ?disabled=${busy}
                @input=${(/** @type {Event} */ ev) => {
                  mem_text = /** @type {HTMLInputElement} */ (ev.target).value;
                  draw();
                }}
              />
            </label>
          </div>
          <ul class="takeover-dialog__guide">
            ${takeoverGuidance(material, cpus).map(
              (line) => html`<li>${line}</li>`
            )}
          </ul>
          ${overcommit
            ? html`<p class="takeover-dialog__warn">
                ${TAKEOVER_OVERCOMMIT_WARNING}
              </p>`
            : ''}
          ${error
            ? html`<p class="takeover-dialog__error" role="alert">${error}</p>`
            : ''}
          <div class="op-dialog__actions takeover-dialog__actions">
            <button
              type="button"
              class="op-btn takeover-dialog__cancel"
              ?disabled=${busy}
              @click=${() => finish(false)}
            >
              취소
            </button>
            <button
              type="button"
              class="op-btn op-btn--primary takeover-dialog__confirm"
              ?disabled=${!ready}
              title=${ready ? '' : 'CPU와 메모리를 1 이상의 정수로 채우세요'}
              @click=${onConfirm}
            >
              바로 실행
            </button>
          </div>`,
        dialog
      );
    }

    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      if (!busy) {
        finish(false);
      }
    });
    draw();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  });
}
