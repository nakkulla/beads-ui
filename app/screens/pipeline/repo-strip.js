/**
 * The repo strip of the 전체 toolbar (UI-dbn6 §3.3) — the retired repo deck
 * folded into one line of chips: name · running n/slots · automation dot · ⚙.
 * Chip click narrows the scope to that repo, the dot sends
 * `worker-automation-toggle` for that repo (its own revision), ⚙ opens that
 * repo's settings. On a phone the strip scrolls horizontally.
 */
import { html } from 'lit-html';

/**
 * @typedef {{ root_dir: string, name: string, auto_advance: boolean, running: number, slots: number }} RepoChip
 */

/**
 * The chip material of every visible repo, in `workspaces_state` order. The
 * automation state reads an adopted mutation reply before the row when one is
 * held (the row catches up on the next push).
 *
 * @param {Array<Record<string, any>>} states
 * @param {(root_dir: string) => any} adoptedOf
 * @returns {RepoChip[]}
 */
export function repoChips(states, adoptedOf) {
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
        running: typeof counts.running === 'number' ? counts.running : 0,
        slots: typeof row.slots === 'number' ? row.slots : 1
      };
    });
}

/**
 * @param {RepoChip[]} chips
 * @returns {import('lit-html').TemplateResult}
 */
export function repoStrip(chips) {
  return html`<div class="pl-strip" role="list" aria-label="레포">
    ${chips.map(
      (chip) =>
        html`<span class="pl-strip__chip" role="listitem">
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
          <button
            type="button"
            class="pl-strip__dot${chip.auto_advance ? ' is-on' : ''}"
            data-op="repo-automation"
            data-root-dir=${chip.root_dir}
            aria-pressed=${chip.auto_advance ? 'true' : 'false'}
            aria-label=${`${chip.name} 자동화 ${chip.auto_advance ? '끄기' : '켜기'}`}
            title=${chip.auto_advance
              ? '자동화 켜짐 — 슬롯이 비면 다음 행이 출발합니다'
              : '자동화 꺼짐 — 다음 행은 수동으로만 출발합니다'}
          >
            <i aria-hidden="true"></i>
          </button>
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
        </span>`
    )}
  </div>`;
}
