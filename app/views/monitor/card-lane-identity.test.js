import { render } from 'lit-html';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  candidateCard,
  miniRow,
  setChipPresetContext
} from '../worker/lanes.js';
import { runningTile } from '../worker/running-grid.js';

/**
 * Lane identity of the slot-1 Bead attribute chips (UI-refs §6): one Bead
 * drawn by every lane renderer both tabs use carries the same chips — class,
 * text, order, binding state and click hint — in its identity line, and none
 * of them in the slot-5b execution line.
 */

const PRESET_COMPLEX = {
  id: 'p-complex',
  name: '복잡 프리셋',
  applies_to: 'general',
  settings: { impl_runtime: 'claude' }
};

const PRESET_FRONTEND = {
  id: 'p-frontend',
  name: '프런트 프리셋',
  applies_to: 'general',
  settings: { impl_runtime: 'codex' }
};

/**
 * The renderer of each lane, fed the same Bead. `done_monitor` is the Monitor
 * tab's three-line done row; `done` is the Worker tab's.
 *
 * @type {Record<string, (item: Record<string, any>) => import('lit-html').TemplateResult>}
 */
const LANES = {
  candidate: (item) =>
    candidateCard(
      /** @type {any} */ ({
        ...item,
        lane: 'candidate',
        draggable: false,
        queue_placeable: true,
        reason: ''
      })
    ),
  waiting: (item) =>
    miniRow(
      /** @type {any} */ ({
        ...item,
        lane: 'queue',
        done: false,
        draggable: true
      })
    ),
  running: (item) =>
    runningTile(
      /** @type {any} */ ({
        ...item,
        bead_id: item.id,
        attempt_id: 'att-1',
        runner: 'claude',
        model: 'opus',
        started_at: 1000,
        can_pause: true
      }),
      2000
    ),
  pr_wait: (item) =>
    miniRow(
      /** @type {any} */ ({
        ...item,
        lane: 'pr_wait',
        done: false,
        draggable: false
      })
    ),
  done: (item) =>
    miniRow(
      /** @type {any} */ ({
        ...item,
        lane: 'done',
        done: true,
        draggable: false
      })
    ),
  done_monitor: (item) =>
    miniRow(
      /** @type {any} */ ({
        ...item,
        lane: 'done',
        done: true,
        draggable: false,
        done_layout: 'three_line',
        workspace_name: 'repo-a'
      })
    )
};

/** The Bead every fixture starts from. */
const BEAD = {
  id: 'UI-a1',
  title: '속성 칩',
  root_dir: '/repo-a',
  priority: 2
};

/**
 * The fixtures §6 names: ineligible, 세션 권장 with and without `exec_lane`,
 * 복잡 + area (apply and restore), and `quick_fix` 리뷰 reviewed.
 *
 * @type {Array<[string, Record<string, any>]>}
 */
const FIXTURES = [
  [
    'worker-ineligible',
    { labels: ['worker-ineligible'], worker_ineligible: true }
  ],
  [
    '세션 실행 (exec_lane session)',
    {
      labels: ['session-preferred'],
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip',
      exec_lane: 'session'
    }
  ],
  [
    '세션 권장 (no exec_lane)',
    {
      labels: ['session-preferred'],
      session_preferred: true,
      session_preferred_reason: 'user_feedback_loop',
      exec_lane: 'worker'
    }
  ],
  [
    '복잡 + area, click applies',
    {
      labels: ['complex', 'frontend', 'backend'],
      complex_reason: 'hard_diagnosis',
      chip_metadata: {},
      workflow: { route: 'spec_backed' }
    }
  ],
  [
    '복잡 + area, click restores',
    {
      labels: ['complex', 'frontend'],
      complex_reason: 'invariant_reasoning',
      chip_metadata: {
        chip_preset_source: 'complex',
        applied_exec_preset: 'p-complex',
        impl_runtime: 'claude'
      },
      workflow: { route: 'spec_backed' }
    }
  ],
  [
    'quick_fix 리뷰 reviewed',
    {
      workflow: {
        route: 'quick_fix',
        quick_fix_review: { state: 'reviewed', missing: [], digest: 'abc' }
      }
    }
  ]
];

/**
 * Draw one lane renderer into a fresh host.
 *
 * @param {string} lane
 * @param {Record<string, any>} fields
 * @returns {HTMLElement}
 */
function draw(lane, fields) {
  const host = document.createElement('div');
  render(LANES[lane]({ ...BEAD, ...fields }), host);
  return host;
}

/**
 * The slot-1 attribute chips of one drawn card, in order, as the facts a
 * reader and a click see.
 *
 * @param {HTMLElement} host
 * @returns {Array<Record<string, string|null>>}
 */
function slotOneChips(host) {
  return Array.from(
    host.querySelectorAll(
      ':is(.worker-card__head, .worker-mini__head, .worker-mini__row1, .rtile__hd) > .worker-attrs > *'
    ),
    (chip) => ({
      class: Array.from(chip.classList).sort().join(' '),
      text: (chip.textContent || '').replace(/\s+/g, ' ').trim(),
      state: chip.getAttribute('data-state'),
      pressed: chip.getAttribute('aria-pressed'),
      hint: chip.getAttribute('title'),
      bead: chip.getAttribute('data-bead-id'),
      root: chip.getAttribute('data-root-dir')
    })
  );
}

describe('slot-1 attribute chips across lanes (UI-refs §4.1)', () => {
  beforeEach(() => {
    setChipPresetContext({
      bindings: { complex: 'p-complex', frontend: 'p-frontend', backend: null },
      quick_fix_bindings: {},
      presets: [PRESET_COMPLEX, PRESET_FRONTEND],
      revision: 1
    });
  });

  afterEach(() => {
    setChipPresetContext(null);
  });

  test.each(FIXTURES)(
    'draws the same slot-1 chips on every lane for %s',
    (_name, fields) => {
      const candidate = slotOneChips(draw('candidate', fields));

      const lanes = Object.keys(LANES).map((lane) => [
        lane,
        slotOneChips(draw(lane, fields))
      ]);

      expect(candidate.length).toBeGreaterThan(0);
      expect(Object.fromEntries(lanes)).toEqual(
        Object.fromEntries(Object.keys(LANES).map((lane) => [lane, candidate]))
      );
    }
  );

  test.each(Object.keys(LANES))(
    'draws no judgement chip in the execution line on the %s lane',
    (lane) => {
      const host = draw(lane, {
        labels: ['complex', 'frontend', 'backend'],
        complex_reason: 'hard_diagnosis',
        chip_metadata: {},
        exec: 'session',
        workflow: { route: 'spec_backed' }
      });

      const in_run = host.querySelectorAll(
        ':is(.worker-chips--run, .rtile__meta) .judgement-chip'
      );

      expect(in_run).toHaveLength(0);
    }
  );

  test('binds the click of a bound chip the same on every lane', () => {
    const fields = FIXTURES[3][1];

    const hints = Object.keys(LANES).map((lane) =>
      slotOneChips(draw(lane, fields)).map((chip) => [chip.state, chip.hint])
    );

    expect(hints[0]).toEqual([
      ['unapplied', expect.stringContaining('클릭: 복잡 프리셋 적용')],
      ['unapplied', expect.stringContaining('클릭: 프런트 프리셋 적용')],
      [null, expect.not.stringContaining('클릭:')]
    ]);
    for (const lane_hints of hints) {
      expect(lane_hints).toEqual(hints[0]);
    }
  });

  test('draws no attribute group on a Bead without attribute material', () => {
    const hosts = Object.keys(LANES).map((lane) => draw(lane, { labels: [] }));

    const groups = hosts.map((host) => host.querySelector('.worker-attrs'));

    expect(groups).toEqual(hosts.map(() => null));
  });
});
