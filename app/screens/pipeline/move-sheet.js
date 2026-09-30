/**
 * The move sheet of a waiting row (UI-dbn6 §3.6) — the coarse-pointer
 * replacement for `↑ ↓ ✕` and drag: `↑ 위로`·`↓ 아래로`·`맨 앞으로`,
 * `병렬로`·`직렬 n`, `지금 시작`, `대기에서 빼기`. Each button is exactly one
 * existing op (`worker-queue-reorder`·`-place`·`-start-now`·`-remove`).
 *
 * The same module draws the candidate's `[↴ 대기로]` lane choice and the
 * generic `⋯` ops sheet of a card foot.
 */
import { html } from 'lit-html';
import { sheetTemplate } from '../../ui/sheet.js';
import { opButton } from './chips.js';
import { startNowOp } from './mini-row.js';

/**
 * @import { OpDef } from './chips.js'
 * @import { LaneQueueGroup } from '../../model/lane-model.js'
 * @typedef {{ title: string, rows: OpDef[][] }} SheetModel
 */

/**
 * @param {any} group
 * @returns {Array<{ id: string, index: number, length: number }>}
 */
function serialLanesOf(group) {
  const lanes = Array.isArray(group?.sublanes?.serial)
    ? group.sublanes.serial
    : [];
  return lanes.map((/** @type {any} */ lane) => ({
    id: lane.id,
    index: lane.index,
    length: typeof lane.raw_length === 'number' ? lane.raw_length : 0
  }));
}

/**
 * The raw length of the lane a waiting row sits in.
 *
 * @param {any} item
 * @param {any} group
 * @returns {number}
 */
function laneLengthOf(item, group) {
  if (item.lane === 'queue') {
    return typeof group?.raw_queue_length === 'number'
      ? group.raw_queue_length
      : 0;
  }
  return (
    serialLanesOf(group).find((lane) => lane.id === item.lane)?.length ?? 0
  );
}

/**
 * @param {any} item
 * @param {string} queue_op
 * @param {Record<string, string|number|undefined>} [extra]
 * @returns {Record<string, string|number|undefined>}
 */
function queueData(item, queue_op, extra = {}) {
  return {
    bead_id: item.id,
    root_dir: item.root_dir,
    queue_op,
    ...extra
  };
}

/**
 * The move sheet of one waiting row.
 *
 * @param {any} item
 * @param {LaneQueueGroup|null|undefined} group - The row's repo group.
 * @param {number} now
 * @returns {SheetModel}
 */
export function moveSheetModel(item, group, now) {
  const serial = /^s[1-5]$/.test(item.lane || '');
  const index = typeof item.queue_index === 'number' ? item.queue_index : 0;
  const length = laneLengthOf(item, group);
  const lane = serial ? item.lane : undefined;
  const start = startNowOp(item, now);
  return {
    title: `${item.id} 옮기기`,
    rows: [
      [
        {
          op: 'queue-op',
          label: '↑ 위로',
          disabled: index <= 0,
          data: queueData(item, 'reorder', { lane, to_index: index - 1 })
        },
        {
          op: 'queue-op',
          label: '↓ 아래로',
          disabled: index >= length - 1,
          data: queueData(item, 'reorder', { lane, to_index: index + 1 })
        },
        {
          op: 'queue-op',
          label: '⤒ 맨 앞으로',
          disabled: index <= 0,
          data: queueData(item, 'reorder', { lane, to_index: 0 })
        }
      ],
      [
        {
          op: 'queue-op',
          label: '병렬로',
          tone: 'primary',
          disabled: !serial,
          data: queueData(item, 'place')
        },
        ...serialLanesOf(group).map((entry) => ({
          op: 'queue-op',
          label: `직렬 ${entry.index + 1}`,
          disabled: entry.id === item.lane,
          data: queueData(item, 'place', { lane: entry.id })
        }))
      ],
      [
        {
          op: 'queue-op',
          label: '지금 시작',
          disabled: start === null,
          title: start?.title,
          data: queueData(item, 'start-now')
        },
        {
          op: 'queue-op',
          label: '대기에서 빼기',
          tone: 'danger',
          data: queueData(item, 'remove')
        }
      ]
    ]
  };
}

/**
 * The `[↴ 대기로]` lane choice of a candidate: append to 병렬 or a serial lane
 * of its own repository (a placement without `index` appends, UI-mwju).
 *
 * @param {any} item
 * @param {LaneQueueGroup|null|undefined} group
 * @returns {SheetModel}
 */
export function placeSheetModel(item, group) {
  return {
    title: `${item.id} 대기로`,
    rows: /** @type {OpDef[][]} */ ([
      [
        {
          op: 'queue-op',
          label: `병렬 · ${typeof group?.raw_queue_length === 'number' ? group.raw_queue_length : 0}건`,
          tone: 'primary',
          data: queueData(item, 'place')
        }
      ],
      serialLanesOf(group).map((entry) => ({
        op: 'queue-op',
        label: `직렬 ${entry.index + 1} · ${entry.length}건`,
        data: queueData(item, 'place', { lane: entry.id })
      }))
    ]).filter((row) => row.length > 0)
  };
}

/**
 * The `⋯` sheet of a card foot: every op, destructive ones last.
 *
 * @param {any} item
 * @param {OpDef[]} ops
 * @returns {SheetModel}
 */
export function opsSheetModel(item, ops) {
  const plain = ops.filter((op) => op.destructive !== true);
  const destructive = ops.filter((op) => op.destructive === true);
  return {
    title: `${item.id} 조작`,
    rows: [plain, destructive].filter((row) => row.length > 0)
  };
}

/**
 * The WS request one `queue-op` button stands for.
 *
 * @param {DOMStringMap} data
 * @returns {{ type: string, payload: Record<string, unknown>, root_dir: string }|null}
 */
export function queueRequestOf(data) {
  const bead_id = data.beadId || '';
  const root_dir = data.rootDir || '';
  if (!bead_id || !root_dir) {
    return null;
  }
  const lane = data.lane || '';
  switch (data.queueOp) {
    case 'reorder': {
      const to_index = Number(data.toIndex);
      return Number.isInteger(to_index) && to_index >= 0
        ? {
            type: 'worker-queue-reorder',
            payload: { bead_id, to_index, ...(lane ? { lane } : {}) },
            root_dir
          }
        : null;
    }
    case 'place':
      return {
        type: 'worker-queue-place',
        payload: { bead_id, ...(lane ? { lane } : {}) },
        root_dir
      };
    case 'remove':
      return { type: 'worker-queue-remove', payload: { bead_id }, root_dir };
    default:
      return null;
  }
}

/**
 * @param {SheetModel} model
 * @returns {import('lit-html').TemplateResult}
 */
export function sheetView(model) {
  return sheetTemplate({
    title: model.title,
    body: html`${model.rows.map(
      (row) =>
        html`<div class="pl-sheet__row">${row.map((op) => opButton(op))}</div>`
    )}`
  });
}
