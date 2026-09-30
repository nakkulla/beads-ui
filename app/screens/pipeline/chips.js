/**
 * Shared card fragments of the pipeline screen (UI-dbn6 §3.4). The card
 * grammar (2026-08-25 §2 line order, §5.1 slots, 2026-08-28 chip click
 * meaning) is inherited; what differs from the retired Worker/Monitor
 * fragments is the markup contract:
 *
 * - every clickable fragment carries `data-op` — the screen's one click
 *   delegation routes on it, never on class names;
 * - every relative/elapsed time is a `[data-ts]` span the 1s ticker rewrites
 *   (`ui/ticker.js`), so no fragment bakes a stale clock into the DOM;
 * - class names use the `pl-` prefix and read tokens from `ui/tokens.css`.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { chipPresetBinding } from '../../model/chip-preset-binding.js';
import { splitLabels } from '../../model/label-policy.js';
import { routeChipValue } from '../../model/lane-model.js';
import { formatTimestampLocal } from '../../model/relative-time.js';
import { formatTs } from '../../ui/ticker.js';
import { areaLabels, areaTooltip } from '../../utils/area-judgement.js';
import {
  COMPLEX_CHIP_LABEL,
  complexTooltip
} from '../../utils/complex-judgement.js';
import {
  formatUsageTotalWithCost,
  providerUsageBadges,
  usageTooltip
} from '../../utils/token-usage.js';

/**
 * @import { LaneItem } from '../../model/lane-model.js'
 * @import { ChipPresetContext } from '../../model/chip-preset-binding.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * One operation a card offers. Rendered as a `.pl-op` button whose `data-*`
 * attributes are the op's whole payload source.
 *
 * @typedef {Object} OpDef
 * @property {string} op - The screen-level action name (`discard`, `merge`…).
 * @property {string} label
 * @property {string} [title]
 * @property {boolean} [disabled]
 * @property {'primary'|'danger'|'ghost'|'plain'} [tone]
 * @property {boolean} [destructive] - Always lives in the `⋯` sheet.
 * @property {Record<string, string|number|undefined|null>} [data]
 */

/**
 * A `[data-ts]` span. The first paint is computed here so the text is right
 * before the ticker's first beat.
 *
 * @param {number|null|undefined} ts
 * @param {string} fmt
 * @param {{ pre?: string, post?: string, now?: number, cls?: string, title?: string }} [options]
 * @returns {TemplateResult|''}
 */
export function timeSpan(ts, fmt, options = {}) {
  if (typeof ts !== 'number' || !Number.isFinite(ts)) {
    return '';
  }
  const value = formatTs(fmt, ts, options.now ?? Date.now());
  return html`<span
    class=${options.cls || 'pl-ts'}
    data-ts=${String(ts)}
    data-ts-fmt=${fmt}
    data-ts-pre=${ifDefined(options.pre)}
    data-ts-post=${ifDefined(options.post)}
    title=${ifDefined(options.title)}
    >${value ? `${options.pre || ''}${value}${options.post || ''}` : ''}</span
  >`;
}

/**
 * Coerce a timestamp field (number or ISO string) to epoch ms, or null.
 *
 * @param {unknown} value
 * @returns {number|null}
 */
export function epochOf(value) {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (typeof value === 'string' && value.length > 0) {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/**
 * One op button.
 *
 * @param {OpDef} op
 * @returns {TemplateResult}
 */
export function opButton(op) {
  const data = op.data || {};
  /** @param {string} key */
  const attr = (key) =>
    data[key] === undefined || data[key] === null
      ? undefined
      : String(data[key]);
  return html`<button
    type="button"
    class="pl-op pl-op--${op.tone || 'plain'}"
    data-op=${op.op}
    data-bead-id=${ifDefined(attr('bead_id'))}
    data-root-dir=${ifDefined(attr('root_dir'))}
    data-attempt-id=${ifDefined(attr('attempt_id'))}
    data-operation-id=${ifDefined(attr('operation_id'))}
    data-operation-kind=${ifDefined(attr('operation_kind'))}
    data-last-error=${ifDefined(attr('last_error'))}
    data-confirmation=${ifDefined(attr('confirmation'))}
    data-resume-kind=${ifDefined(attr('resume_kind'))}
    data-runner=${ifDefined(attr('runner'))}
    data-since=${ifDefined(attr('since'))}
    data-external-wait-op=${ifDefined(attr('external_wait_op'))}
    data-wait-id=${ifDefined(attr('wait_id'))}
    data-mode=${ifDefined(attr('mode'))}
    data-confirm=${ifDefined(attr('confirm'))}
    data-lane=${ifDefined(attr('lane'))}
    data-to-index=${ifDefined(attr('to_index'))}
    data-queue-op=${ifDefined(attr('queue_op'))}
    data-chip-key=${ifDefined(attr('chip_key'))}
    ?disabled=${op.disabled === true}
    title=${ifDefined(op.title)}
    aria-label=${ifDefined(op.title ? undefined : op.label)}
  >
    ${op.label}
  </button>`;
}

/**
 * The foot of a card (slot 6): at most two non-destructive ops inline, the
 * rest plus every destructive op behind `⋯` (UI-dbn6 §3.6).
 *
 * @param {OpDef[]} ops
 * @param {{ bead_id: string, root_dir: string }} coord
 * @param {TemplateResult|''} [extra] - Non-button foot material (merge-step
 * gauge, discard receipt).
 * @returns {TemplateResult|''}
 */
export function footTemplate(ops, coord, extra = '') {
  const inline = ops.filter((op) => op.destructive !== true).slice(0, 2);
  const rest = ops.filter((op) => !inline.includes(op));
  if (inline.length === 0 && rest.length === 0 && extra === '') {
    return '';
  }
  return html`<div class="pl-foot">
    ${extra}
    <span class="pl-foot__ops">
      ${inline.map((op) => opButton(op))}
      ${rest.length > 0
        ? html`<button
            type="button"
            class="pl-op pl-op--ghost pl-op--more"
            data-op="ops-sheet"
            data-bead-id=${coord.bead_id}
            data-root-dir=${coord.root_dir}
            title="다른 조작"
            aria-label="다른 조작"
          >
            ⋯
          </button>`
        : ''}
    </span>
  </div>`;
}

/**
 * @param {string} id
 * @returns {TemplateResult}
 */
export function idChip(id) {
  return html`<button
    type="button"
    class="pl-id"
    data-op="copy-id"
    data-bead-id=${id}
    title="클릭하면 ID 복사"
  >
    ${id}
  </button>`;
}

/**
 * @param {unknown} priority
 * @returns {TemplateResult|''}
 */
export function priorityBadge(priority) {
  if (typeof priority !== 'number' || !Number.isFinite(priority)) {
    return '';
  }
  const level = Math.max(0, Math.min(4, Math.trunc(priority)));
  return html`<span class="pl-pri" title=${`우선순위 P${level}`}
    >P${level}</span
  >`;
}

/**
 * The repo badge (slot 1, 전체 scope only). Click narrows the scope to it.
 *
 * @param {string|undefined} name
 * @param {string|undefined} root_dir
 * @returns {TemplateResult|''}
 */
export function repoBadge(name, root_dir) {
  if (!name || !root_dir) {
    return '';
  }
  return html`<button
    type="button"
    class="pl-repo"
    data-op="scope-repo"
    data-root-dir=${root_dir}
    title=${`${root_dir} — 이 레포로 좁히기`}
  >
    ${name}
  </button>`;
}

/**
 * @param {unknown} pr_url
 * @param {unknown} pr_number
 * @returns {TemplateResult|''}
 */
export function prLink(pr_url, pr_number) {
  if (
    typeof pr_url !== 'string' ||
    !Number.isInteger(pr_number) ||
    /** @type {number} */ (pr_number) <= 0
  ) {
    return '';
  }
  let protocol = '';
  try {
    protocol = new URL(pr_url).protocol;
  } catch {
    return '';
  }
  if (protocol !== 'https:' && protocol !== 'http:') {
    return '';
  }
  return html`<a
    class="pl-pr"
    href=${pr_url}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${pr_number} ↗</a
  >`;
}

/**
 * @param {string|undefined} slug
 * @returns {TemplateResult|''}
 */
export function foreignRepoBadge(slug) {
  return slug
    ? html`<span
        class="pl-badge pl-badge--quiet"
        title="다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다."
        >↗ ${slug}</span
      >`
    : '';
}

/**
 * @param {LaneItem['workflow']} workflow
 * @returns {TemplateResult|''}
 */
export function routeChip(workflow) {
  const value = routeChipValue(/** @type {any} */ (workflow));
  if (value === null) {
    return '';
  }
  return html`<span
    class="pl-chip pl-chip--route${value === 'unset' ? ' is-derived' : ''}"
    data-route=${value}
    title=${value === 'unset' ? 'route 미핀 (metadata unset)' : 'route'}
    >${value}</span
  >`;
}

/**
 * @param {{ kind: 'serial', index: number }|{ kind: 'parallel' }|undefined} origin
 * @returns {TemplateResult|''}
 */
export function laneOriginChip(origin) {
  if (!origin) {
    return '';
  }
  const serial = origin.kind === 'serial';
  return html`<span
    class="pl-chip"
    title=${serial
      ? `직렬 레인 ${origin.index} — 이 레인은 이 일감이 끝날 때까지 다음 항목을 내보내지 않는다`
      : '병렬 큐 — 슬롯이 남는 한 다른 항목과 함께 실행된다'}
    >${serial ? `직렬 ${origin.index}` : '병렬'}</span
  >`;
}

/**
 * Worker creation provenance and the `discovered-from` origin (slot 5a).
 *
 * @param {{ worker_created_from?: string, worker_created_from_root_dir?: string, from_id?: string, root_dir?: string }} item
 * @param {{ include_from?: boolean }} [options]
 * @returns {TemplateResult|''}
 */
export function sourceChips(item, options = {}) {
  const source_id =
    typeof item.worker_created_from === 'string'
      ? item.worker_created_from
      : '';
  const source_root =
    typeof item.worker_created_from_root_dir === 'string'
      ? item.worker_created_from_root_dir
      : '';
  const from =
    options.include_from !== false && item.from_id && item.from_id !== source_id
      ? html`<button
          type="button"
          class="pl-chip pl-chip--link"
          data-op="open-issue"
          data-bead-id=${item.from_id}
          data-root-dir=${item.root_dir || ''}
          title=${`출처 ${item.from_id} 열기`}
        >
          ↩ from ${item.from_id}
        </button>`
      : '';
  if (source_id.length === 0) {
    return from;
  }
  return html`<span
      class="pl-chip"
      title=${`Worker가 ${source_id}에서 새로 만든 이슈입니다`}
      >워커 생성</span
    >${source_root.length > 0
      ? html`<button
          type="button"
          class="pl-chip pl-chip--link"
          data-op="open-issue"
          data-bead-id=${source_id}
          data-root-dir=${source_root}
          title=${`생성 원본 ${source_id} 열기`}
        >
          ↩ 생성 원본 ${source_id}
        </button>`
      : html`<span
          class="pl-chip is-disabled"
          title="원본 저장소를 확인할 수 없음"
          >↩ 생성 원본 ${source_id}</span
        >`}${from}`;
}

/**
 * Plain label chips under the fixed label rule (UI-dbn6 §4.2). Judgement
 * labels are drawn by their own chips; hidden labels are dropped.
 *
 * @param {unknown} labels
 * @returns {TemplateResult|''}
 */
export function labelChips(labels) {
  const plain = splitLabels(labels).plain;
  return plain.length > 0
    ? html`${plain.map(
        (label) =>
          html`<span class="pl-chip pl-chip--label" title="라벨"
            >${label}</span
          >`
      )}`
    : '';
}

/**
 * The 오케/워커 execution chips (slot 5b).
 *
 * @param {LaneItem['exec_chips']} chips
 * @param {{ pin?: boolean }} [options]
 * @returns {TemplateResult|''}
 */
export function execChips(chips, options = {}) {
  if (!chips || (!chips.orchestration && !chips.worker)) {
    return '';
  }
  const note = options.pin === true ? '\n이슈 핀 — 레포 기본값과 다름' : '';
  /**
   * @param {string} key
   * @param {any} chip
   */
  const one = (key, chip) =>
    chip
      ? html`<span
          class="pl-fact${chip.pinned === true || options.pin === true
            ? ' is-pin'
            : ''}"
          title=${`${chip.title || ''}${note}`}
          >${key} <b>${chip.text}</b></span
        >`
      : '';
  return html`${one('오케', chips.orchestration)}${one('워커', chips.worker)}`;
}

/**
 * Token usage / cost facts (slot 5b).
 *
 * @param {any} usage
 * @param {{ scope?: any, direct_session?: boolean }} [options]
 * @returns {TemplateResult|''}
 */
export function usageFacts(usage, options = {}) {
  const usage_options = {
    scope: options.scope,
    direct_session: options.direct_session === true
  };
  const badges = providerUsageBadges(usage, usage_options);
  if (badges.length > 0) {
    return html`${badges.map(
      (badge) =>
        html`<span class="pl-fact" title=${badge.tooltip}>${badge.label}</span>`
    )}`;
  }
  const label = formatUsageTotalWithCost(usage);
  return label
    ? html`<span class="pl-fact" title=${usageTooltip(usage, usage_options)}
        >${label}</span
      >`
    : '';
}

/**
 * The open judgement popover key of a card, or null.
 *
 * @param {LaneItem & { chip_popover?: any }} item
 * @returns {string|null}
 */
export function openChipKey(item) {
  return item.chip_popover ? item.chip_popover.chip_key : null;
}

/**
 * One judgement chip (UI-8x90 §4.5, UI-wg68 §5.2): bound → preset
 * apply/restore, otherwise the reason popover.
 *
 * @param {{ chip_key: string, label: string, title: string, item: any, ctx: ChipPresetContext|null, open: boolean }} input
 * @returns {TemplateResult}
 */
export function judgementChip(input) {
  const { chip_key, label, title, item, ctx, open } = input;
  const route =
    typeof item.route === 'string' && item.route.length > 0
      ? item.route
      : typeof item.workflow?.route === 'string'
        ? item.workflow.route
        : '';
  const binding = ctx
    ? chipPresetBinding(
        chip_key,
        item.chip_metadata,
        route,
        ctx,
        item.id,
        item.root_dir || ''
      )
    : null;
  if (!binding) {
    return html`<button
      type="button"
      class="pl-chip pl-chip--judge"
      data-op="chip-popover"
      data-chip-key=${chip_key}
      data-bead-id=${item.id}
      data-root-dir=${item.root_dir || ''}
      aria-expanded=${open ? 'true' : 'false'}
      title=${title}
    >
      ${label}
    </button>`;
  }
  return html`<button
    type="button"
    class="pl-chip pl-chip--judge is-bound"
    data-op="chip-preset"
    data-chip-key=${chip_key}
    data-bead-id=${item.id}
    data-root-dir=${item.root_dir || ''}
    data-state=${binding.state}
    aria-busy=${binding.busy ? 'true' : 'false'}
    title=${`${title}${binding.title_suffix}`}
  >
    ${label}
  </button>`;
}

/**
 * `복잡` then `frontend`·`backend` (UI-wg68 §5.4).
 *
 * @param {any} item
 * @param {ChipPresetContext|null} ctx
 * @returns {TemplateResult|''}
 */
export function judgementChips(item, ctx) {
  const open = openChipKey(item);
  const complex =
    typeof item.complex_reason === 'string' && item.complex_reason.length > 0
      ? judgementChip({
          chip_key: 'complex',
          label: COMPLEX_CHIP_LABEL,
          title: complexTooltip(item.complex_reason),
          item,
          ctx,
          open: open === 'complex'
        })
      : '';
  const areas = areaLabels(item.labels).map((label) =>
    judgementChip({
      chip_key: label,
      label,
      title: areaTooltip(label),
      item,
      ctx,
      open: open === label
    })
  );
  return complex === '' && areas.length === 0 ? '' : html`${complex}${areas}`;
}

/**
 * A reason-popover chip with no preset binding (`세션 권장`, `worker-ineligible`,
 * `리뷰 ✓`, `스펙 대기`, readiness, receipt).
 *
 * @param {any} item
 * @param {string} chip_key
 * @param {string} label
 * @param {string} title
 * @param {string} [tone]
 * @returns {TemplateResult}
 */
export function popoverChip(item, chip_key, label, title, tone = 'judge') {
  return html`<button
    type="button"
    class="pl-chip pl-chip--${tone}"
    data-op="chip-popover"
    data-chip-key=${chip_key}
    data-bead-id=${item.id}
    data-root-dir=${item.root_dir || ''}
    aria-expanded=${openChipKey(item) === chip_key ? 'true' : 'false'}
    title=${title}
  >
    ${label}
  </button>`;
}

/**
 * One openable dependency chip (`⛓`·`→`·`🔓`·`⧉`, UI-8x90 §4.2).
 *
 * @param {{ id: string, label: string, title?: string, foreign?: boolean, root_dir?: string, openable?: boolean }} chip
 * @param {string} kind
 * @param {string} fallback_root
 * @returns {TemplateResult}
 */
function depChip(chip, kind, fallback_root) {
  const cls = `pl-chip pl-chip--${kind}${chip.foreign ? ' is-foreign' : ''}`;
  return chip.openable === true
    ? html`<button
        type="button"
        class=${cls}
        data-op="open-issue"
        data-bead-id=${chip.id}
        data-root-dir=${chip.root_dir || fallback_root}
        title=${chip.title || ''}
      >
        ${chip.label}
      </button>`
    : html`<span class=${cls} title=${chip.title || ''}>${chip.label}</span>`;
}

/**
 * @template {{ id: string }} T
 * @param {T[]|undefined} chips
 * @returns {T[]}
 */
function byId(chips) {
  return Array.isArray(chips)
    ? chips.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    : [];
}

/**
 * Slot 4 — 4a 의존 (gate → `⛓` → after → `→` → grace) and 4b 정보 (`🔓`·`⧉`·
 * `scope 없음`). Each line fails quiet on its own material.
 *
 * @param {any} chips
 * @param {{ root_dir: string, leading?: TemplateResult|'', after?: TemplateResult|'', trailing?: TemplateResult|'' }} options
 * @returns {TemplateResult|''}
 */
export function depLines(chips, options) {
  const leading = options.leading || '';
  const after = options.after || '';
  const trailing = options.trailing || '';
  const predecessors = /** @type {any[]} */ (byId(chips?.predecessors));
  const dependents = /** @type {any[]} */ (byId(chips?.dependents));
  const released = Array.isArray(chips?.released) ? chips.released : [];
  const overlaps = /** @type {any[]} */ (byId(chips?.overlaps));
  const scope_missing = chips?.scope_missing === true;
  const primary =
    predecessors.length > 0 ||
    dependents.length > 0 ||
    leading !== '' ||
    after !== '' ||
    trailing !== '';
  const secondary = released.length > 0 || overlaps.length > 0 || scope_missing;
  return html`${primary
    ? html`<div class="pl-deps">
        ${leading}${predecessors.map((chip) =>
          depChip(chip, 'dep', options.root_dir)
        )}${after}${dependents.map((chip) =>
          depChip(chip, 'next', options.root_dir)
        )}${trailing}
      </div>`
    : ''}${secondary
    ? html`<div class="pl-deps pl-deps--info">
        ${released.map((/** @type {any} */ chip) =>
          depChip(chip, 'released', options.root_dir)
        )}${overlaps.map((chip) =>
          depChip(
            {
              id: chip.id,
              label: `⧉ ${chip.id}`,
              title: [`겹침 · ${chip.location_label}`, ...chip.prefixes].join(
                '\n'
              ),
              openable: true,
              ...(chip.root_dir ? { root_dir: chip.root_dir } : {})
            },
            'overlap',
            options.root_dir
          )
        )}${scope_missing
          ? html`<span
              class="pl-chip pl-chip--quiet"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`
          : ''}
      </div>`
    : ''}`;
}

/**
 * The slot-4a gate chip (UI-01wh §3.2) — its popover carries `↻ 지금 프로브`.
 *
 * @param {any} item
 * @returns {TemplateResult|''}
 */
export function gateChip(item) {
  const gate = item.gate;
  if (!gate) {
    return '';
  }
  return html`<button
    type="button"
    class="pl-chip pl-chip--gate"
    data-op="chip-popover"
    data-chip-key="gate"
    data-bead-id=${item.id}
    data-root-dir=${item.root_dir || ''}
    aria-expanded=${openChipKey(item) === 'gate' ? 'true' : 'false'}
    title=${gate.title}
  >
    ${gate.label}
  </button>`;
}

/**
 * The grace chip `⏳ <n>초` (slot 4a). The countdown text ticks; the chip's
 * disappearance is the lane model's `next_boundary_at` re-render.
 *
 * @param {{ added_at?: number|null, manual_only?: boolean }} item
 * @param {number} grace_ms
 * @param {number} now
 * @returns {TemplateResult|''}
 */
export function graceChip(item, grace_ms, now) {
  if (item.manual_only === true || typeof item.added_at !== 'number') {
    return '';
  }
  const expiry = item.added_at + grace_ms;
  if (expiry <= now) {
    return '';
  }
  return html`<span
    class="pl-chip pl-chip--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${timeSpan(expiry, 'countdown', { now })}</span
  >`;
}

/**
 * Slot 7 — `생성 · 수정` relative times.
 *
 * @param {{ created_at?: unknown, updated_at?: unknown }} item
 * @param {number} now
 * @returns {TemplateResult|''}
 */
export function timesLine(item, now) {
  const created = epochOf(item.created_at);
  const updated = epochOf(item.updated_at);
  if (created === null && updated === null) {
    return '';
  }
  return html`<div class="pl-times">
    ${created !== null
      ? timeSpan(created, 'rel', {
          pre: '생성 ',
          now,
          title: `생성 ${formatTimestampLocal(created)}`
        })
      : ''}${created !== null && updated !== null
      ? html`<span aria-hidden="true"> · </span>`
      : ''}${updated !== null
      ? timeSpan(updated, 'rel', {
          pre: '수정 ',
          now,
          title: `수정 ${formatTimestampLocal(updated)}`
        })
      : ''}
  </div>`;
}

/** Five fixed progress cells of the top band (UI-dbn6 §3.4 change 1). */
const BAND_STAGES = /** @type {const} */ ([
  'spec',
  'plan',
  'impl',
  'pr',
  'merge'
]);

/**
 * The fill of one band cell: `done` (산출물 있음 · dark stage colour),
 * `lit` (reviewed or current · bright stage colour), `none` (line colour).
 *
 * @param {any} stage
 * @param {boolean} current
 * @returns {'none'|'done'|'lit'}
 */
function bandFill(stage, current) {
  const fill = stage && stage.fill ? stage.fill : 'none';
  if (fill === 'none') {
    return 'none';
  }
  if (current || stage.glyph === 'review' || stage.glyph === 'skip') {
    return 'lit';
  }
  return 'done';
}

/**
 * The top-edge 5-cell progress band replacing the slot-3 stepper. `close`
 * (quick_fix) fills the merge cell; a route without plan leaves that cell at
 * the line colour. No workflow material draws no band (fail-quiet).
 *
 * @param {any} workflow
 * @param {string|undefined} status
 * @returns {TemplateResult|''}
 */
export function progressBand(workflow, status) {
  const stages =
    workflow && workflow.stages && typeof workflow.stages === 'object'
      ? workflow.stages
      : null;
  if (!stages) {
    return '';
  }
  const active = status === 'in_progress' || status === 'resolved';
  let current_marked = !active;
  /** @type {string[]} */
  const labels = [];
  const cells = BAND_STAGES.map((key) => {
    const stage = key === 'merge' ? stages.merge || stages.close : stages[key];
    const is_current =
      !current_marked &&
      !!stage &&
      stage.fill === 'dim' &&
      stage.stale !== true;
    if (is_current) {
      current_marked = true;
    }
    const fill = bandFill(stage, is_current);
    labels.push(
      `${key} ${fill === 'none' ? '미도달' : fill === 'lit' ? '완료·현재' : '진행'}`
    );
    return html`<i
      class="pl-band__cell pl-band__cell--${key} is-${fill}${is_current
        ? ' is-current'
        : ''}"
    ></i>`;
  });
  return html`<div class="pl-band" role="img" aria-label=${labels.join(' · ')}>
    ${cells}
  </div>`;
}

/**
 * A popover body (reason popups, wait verdict evidence).
 *
 * @param {{ title: string, lines: string[], exit?: TemplateResult|'' }} content
 * @returns {TemplateResult}
 */
export function popoverBody(content) {
  return html`<div class="pl-pop" role="dialog" aria-label=${content.title}>
    <div class="pl-pop__title">${content.title}</div>
    ${content.lines.length > 0
      ? html`<ul class="pl-pop__lines">
          ${content.lines.map((line) => html`<li>${line}</li>`)}
        </ul>`
      : ''}
    ${content.exit ? html`<div class="pl-pop__exit">${content.exit}</div>` : ''}
  </div>`;
}
