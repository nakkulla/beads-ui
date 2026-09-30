/**
 * The repo strip of the 전체 toolbar (UI-dbn6 §3.3) — the retired repo deck
 * folded into chips: name · running n/slots · automation dot · auto-merge mark
 * · ⚙, with the applied presets on a second line (P1-r2 item 14).
 * Chip click narrows the scope to that repo, the dot sends
 * `worker-automation-toggle` for that repo (its own revision), ⚙ opens that
 * repo's settings. On a phone the strip scrolls horizontally.
 */
import { html } from 'lit-html';
import { appliedPresetLine } from '../../model/repo-presets.js';

/**
 * @typedef {{ root_dir: string, name: string, auto_advance: boolean, auto_merge: boolean, running: number, slots: number, presets: string|null }} RepoChip
 */

/**
 * The chip material of every visible repo, in `workspaces_state` order. The
 * automation and auto-merge states and the applied presets read an adopted
 * mutation reply before the row when one is held (the row catches up on the
 * next push).
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
        presets: appliedPresetLine(row, adopted, presets)
      };
    });
}

/**
 * One state mark of a chip: a toggle on a fine pointer, a state-only mark on
 * a coarse one — a 44px target does not fit inside the chip, so touch toggles
 * from the 레포 toolbar after narrowing the scope.
 *
 * @param {{ op: string, cls: string, on: boolean, root_dir: string, label: string, title: string, body: unknown, coarse: boolean }} mark
 * @returns {import('lit-html').TemplateResult}
 */
function stateMark(mark) {
  if (mark.coarse) {
    return html`<span
      class="${mark.cls}${mark.on ? ' is-on' : ''}"
      role="img"
      aria-label=${mark.label}
      title=${mark.title}
      >${mark.body}</span
    >`;
  }
  return html`<button
    type="button"
    class="${mark.cls}${mark.on ? ' is-on' : ''}"
    data-op=${mark.op}
    data-root-dir=${mark.root_dir}
    aria-pressed=${mark.on ? 'true' : 'false'}
    aria-label=${mark.label}
    title=${mark.title}
  >
    ${mark.body}
  </button>`;
}

/**
 * @param {RepoChip[]} chips
 * @param {{ coarse?: boolean }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function repoStrip(chips, options = {}) {
  const coarse = options.coarse === true;
  return html`<div class="pl-strip" role="list" aria-label="레포">
    ${chips.map(
      (chip) =>
        html`<span class="pl-strip__chip" role="listitem">
          <span class="pl-strip__row">
            <button
              type="button"
              class="pl-strip__name"
              data-op="scope-repo"
              data-root-dir=${chip.root_dir}
              title=${`${chip.root_dir} — 이 레포로 좁히기`}
            >
              ${chip.name}
              <span class="pl-strip__load" title="실행 중 / 동시 실행 슬롯"
                >${chip.running}/${chip.slots}</span
              >
            </button>
            ${stateMark({
              op: 'repo-automation',
              cls: 'pl-strip__dot',
              on: chip.auto_advance,
              root_dir: chip.root_dir,
              coarse,
              label: coarse
                ? `${chip.name} 자동 진행 ${chip.auto_advance ? '켜짐' : '꺼짐'}`
                : `${chip.name} 자동화 ${chip.auto_advance ? '끄기' : '켜기'}`,
              title: chip.auto_advance
                ? '자동화 켜짐 — 슬롯이 비면 다음 행이 출발합니다'
                : '자동화 꺼짐 — 다음 행은 수동으로만 출발합니다',
              body: html`<i aria-hidden="true"></i>`
            })}
            ${stateMark({
              op: 'auto-merge',
              cls: 'pl-strip__merge',
              on: chip.auto_merge,
              root_dir: chip.root_dir,
              coarse,
              label: coarse
                ? `${chip.name} 자동 머지 ${chip.auto_merge ? '켜짐' : '꺼짐'}`
                : `${chip.name} 자동 머지 ${chip.auto_merge ? '끄기' : '켜기'}`,
              title: chip.auto_merge
                ? '자동 머지 켜짐 — 자격이 생기는 PR을 계속 머지합니다'
                : '자동 머지 꺼짐',
              body: '머지'
            })}
            <button
              type="button"
              class="pl-strip__gear"
              data-op="repo-settings"
              data-root-dir=${chip.root_dir}
              aria-label=${`${chip.name} 설정`}
              title="이 레포의 설정"
            >
              ⚙
            </button>
          </span>
          ${chip.presets
            ? html`<span class="pl-strip__presets" title=${chip.presets}
                >${chip.presets}</span
              >`
            : ''}
        </span>`
    )}
  </div>`;
}
