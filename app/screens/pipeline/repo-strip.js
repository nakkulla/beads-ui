/**
 * The repo strip of the 전체 toolbar (UI-dbn6 §3.3) — the retired repo deck
 * folded into bounded cells (design-system round). Line 1: name · running
 * `n/slots` · 자동 진행 switch · 자동 머지 switch · ⚙. Line 2: the applied
 * general preset (a gray pill), `총괄 <orchestration>`, `워커 <worker>` and
 * `qf <quick-fix preset>`, each with its formatter title as the tooltip; a
 * part without material draws nothing, and a cell with no part draws no
 * second line (fail-quiet).
 *
 * The name narrows the scope to that repo, the 진행 switch sends
 * `worker-automation-toggle` for that repo (its own revision), the 머지 switch
 * `worker-merge-auto-toggle`, ⚙ opens that repo's settings. A coarse pointer
 * gets state-only switch dots — a 44px target does not fit inside the cell,
 * so touch toggles from the 레포 toolbar after narrowing the scope.
 */
import { html } from 'lit-html';
import { deckExecChips } from '../../model/deck-exec-chips.js';
import { appliedPresetName } from '../../model/repo-presets.js';
import { gearIcon } from '../../ui/icons.js';
import { uiToggle } from '../../ui/switch.js';

/**
 * @typedef {{ text: string, title: string }} ExecPart
 * @typedef {{ root_dir: string, name: string, auto_advance: boolean, auto_merge: boolean, running: number, slots: number, preset: string|null, qf: string|null, orchestration: ExecPart|null, worker: ExecPart|null }} RepoChip
 */

/**
 * The cell material of every visible repo, in `workspaces_state` order. The
 * automation and auto-merge states and the applied presets read an adopted
 * mutation reply before the row when one is held (the row catches up on the
 * next push); the exec parts read the row projections.
 *
 * @param {Array<Record<string, any>>} states
 * @param {(root_dir: string) => any} adoptedOf
 * @param {Array<{ id: string, name: string }>} [presets] - The impl-presets
 * snapshot that names the applied presets.
 * @returns {RepoChip[]}
 */
export function repoChips(states, adoptedOf, presets = []) {
  return states
    .filter((row) => row && typeof row.root_dir === 'string')
    .map((row) => {
      const adopted = adoptedOf(row.root_dir);
      const counts =
        row.counts && typeof row.counts === 'object' ? row.counts : {};
      const exec = deckExecChips(row);
      return {
        root_dir: row.root_dir,
        name: row.name || row.root_dir,
        auto_advance:
          typeof adopted?.auto_advance === 'boolean'
            ? adopted.auto_advance
            : row.auto_advance === true,
        auto_merge:
          typeof adopted?.auto_merge === 'boolean'
            ? adopted.auto_merge
            : row.auto_merge === true,
        running: typeof counts.running === 'number' ? counts.running : 0,
        slots: typeof row.slots === 'number' ? row.slots : 1,
        preset: appliedPresetName(row, adopted, presets, 'applied_exec_preset'),
        qf: appliedPresetName(
          row,
          adopted,
          presets,
          'applied_quick_fix_preset'
        ),
        orchestration: exec ? exec.orchestration : null,
        worker: exec ? exec.worker : null
      };
    });
}

/**
 * @param {string} kind
 * @param {string} key
 * @param {string} value
 * @param {string} title
 * @returns {import('lit-html').TemplateResult}
 */
function kvPart(kind, key, value, title) {
  return html`<span class="pl-strip__kv" data-kind=${kind} title=${title}
    ><span class="pl-strip__k">${key}</span> <b>${value}</b></span
  >`;
}

/**
 * Line 2 of one cell, or '' when the repo carries none of its material.
 *
 * @param {RepoChip} chip
 * @returns {import('lit-html').TemplateResult|''}
 */
function execLine(chip) {
  if (!chip.preset && !chip.orchestration && !chip.worker && !chip.qf) {
    return '';
  }
  return html`<span class="pl-strip__r2">
    ${chip.preset
      ? html`<span
          class="ui-chip pl-strip__preset"
          data-kind="preset"
          title=${chip.preset === '프리셋 없음'
            ? '적용된 구현 프리셋 없음'
            : `적용된 구현 프리셋 · ${chip.preset}`}
          >${chip.preset}</span
        >`
      : ''}${chip.orchestration
      ? kvPart(
          'orchestration',
          '총괄',
          chip.orchestration.text,
          chip.orchestration.title
        )
      : ''}${chip.worker
      ? kvPart('worker', '워커', chip.worker.text, chip.worker.title)
      : ''}${chip.qf
      ? kvPart(
          'qf',
          'qf',
          chip.qf,
          chip.qf === '프리셋 없음'
            ? '적용된 quick fix 프리셋 없음'
            : `적용된 quick fix 프리셋 · ${chip.qf}`
        )
      : ''}
  </span>`;
}

/**
 * @param {RepoChip[]} chips
 * @param {{ coarse?: boolean }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function repoStrip(chips, options = {}) {
  const coarse = options.coarse === true;
  return html`<div
    class="pl-strip${coarse ? ' is-coarse' : ''}"
    role="list"
    aria-label="레포"
  >
    ${chips.map(
      (chip) =>
        html`<span class="pl-strip__chip" role="listitem">
          <span class="pl-strip__r1">
            <button
              type="button"
              class="pl-strip__name"
              data-op="scope-repo"
              data-root-dir=${chip.root_dir}
              title=${`${chip.root_dir} — 이 레포로 좁히기`}
            >
              <span class="pl-strip__label">${chip.name}</span>
              <span
                class="pl-strip__load${chip.slots > 0 &&
                chip.running >= chip.slots
                  ? ' is-full'
                  : ''}"
                title="실행 중 / 동시 실행 슬롯"
                >${chip.running}/${chip.slots}</span
              >
            </button>
            <span class="pl-strip__toggles">
              ${uiToggle({
                label: '진행',
                on: chip.auto_advance,
                op: 'repo-automation',
                root_dir: chip.root_dir,
                cls: 'pl-strip__auto',
                state_only: coarse,
                aria_label: coarse
                  ? `${chip.name} 자동 진행 ${chip.auto_advance ? '켜짐' : '꺼짐'}`
                  : `${chip.name} 자동화 ${chip.auto_advance ? '끄기' : '켜기'}`,
                title: chip.auto_advance
                  ? '자동화 켜짐 — 슬롯이 비면 다음 행이 출발합니다'
                  : '자동화 꺼짐 — 다음 행은 수동으로만 출발합니다'
              })}
              ${uiToggle({
                label: '머지',
                on: chip.auto_merge,
                op: 'auto-merge',
                root_dir: chip.root_dir,
                cls: 'pl-strip__merge',
                state_only: coarse,
                aria_label: coarse
                  ? `${chip.name} 자동 머지 ${chip.auto_merge ? '켜짐' : '꺼짐'}`
                  : `${chip.name} 자동 머지 ${chip.auto_merge ? '끄기' : '켜기'}`,
                title: chip.auto_merge
                  ? '자동 머지 켜짐 — 자격이 생기는 PR을 계속 머지합니다'
                  : '자동 머지 꺼짐'
              })}
            </span>
            <button
              type="button"
              class="ui-btn ui-btn--icon ui-btn--sm pl-strip__gear"
              data-op="repo-settings"
              data-root-dir=${chip.root_dir}
              aria-label=${`${chip.name} 설정`}
              title="이 레포의 설정"
            >
              ${gearIcon()}
            </button>
          </span>
          ${execLine(chip)}
        </span>`
    )}
  </div>`;
}
