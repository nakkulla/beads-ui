import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  childExecChips,
  execReceiptActor,
  formatExecReceipt,
  formatPlannedExecution
} from './exec-format.js';

/** @type {HTMLElement} */
let mount;

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
  mount = /** @type {HTMLElement} */ (document.getElementById('m'));
});

describe('views/exec-format receipt strings', () => {
  test('joins the pinned effort onto the actor', () => {
    const actor = execReceiptActor({
      kind: 'delegated',
      actor: 'fable',
      effort: 'high',
      sha: 'a'.repeat(40)
    });

    expect(actor).toBe('fable:high');
  });

  test('keeps a bare actor when no effort was pinned', () => {
    const actor = execReceiptActor({
      kind: 'main',
      actor: 'bead',
      effort: null,
      sha: 'b'.repeat(40)
    });

    expect(actor).toBe('bead');
  });

  test('rebuilds the full receipt string from the normalized object', () => {
    const sha = 'c'.repeat(40);

    const text = formatExecReceipt({
      kind: 'delegated',
      actor: 'fable',
      effort: 'xhigh',
      sha
    });

    expect(text).toBe(`delegated:fable:xhigh@${sha}`);
  });
});

describe('views/exec-format planned execution', () => {
  test('returns null without a planned execution', () => {
    expect(formatPlannedExecution(null, null)).toBeNull();
  });

  test('labels a delegated plan whose reason is absent', () => {
    const presentation = formatPlannedExecution(
      { kind: 'delegated', reason: null },
      null
    );

    expect(presentation?.label).toBe('계획 · 위임');
    expect(presentation?.title).toBe('planned_execution delegated');
  });

  test('rejects a delegated plan that carries a reason', () => {
    expect(
      formatPlannedExecution({ kind: 'delegated', reason: 'because' }, null)
    ).toBeNull();
  });

  test('rejects a main plan whose reason is blank', () => {
    expect(formatPlannedExecution({ kind: 'main', reason: '  ' }, null)).toBe(
      null
    );
  });

  test('summarizes an enumerated plan by its delegated and main counts', () => {
    const presentation = formatPlannedExecution(
      {
        units: [
          { unit: 'P1', kind: 'delegated', reason: null },
          { unit: 'P2', kind: 'main', reason: '직접 통합 필요' },
          { unit: 'P3', kind: 'delegated', reason: null }
        ]
      },
      null
    );

    expect(presentation?.label).toBe('계획 · 위임 2 / 메인 1');
  });

  test('lists each unit of an enumerated plan with its kind and reason', () => {
    const presentation = formatPlannedExecution(
      {
        units: [
          { unit: 'P1', kind: 'delegated', reason: null },
          { unit: 'P2', kind: 'main', reason: '직접 통합 필요' }
        ]
      },
      null
    );

    expect(presentation?.units).toEqual([
      { unit: 'P1', kind: 'delegated', kind_label: '위임', reason: null },
      { unit: 'P2', kind: 'main', kind_label: '메인', reason: '직접 통합 필요' }
    ]);
  });

  test('carries the unit enumeration and main reasons in the title', () => {
    const presentation = formatPlannedExecution(
      {
        units: [
          { unit: 'P1', kind: 'delegated', reason: null },
          { unit: 'P2', kind: 'main', reason: '직접 통합 필요' }
        ]
      },
      null
    );

    expect(presentation?.title).toBe(
      'planned_execution P1:delegated; P2:main · planned_execution_reason P2:직접 통합 필요'
    );
  });

  test('marks an enumerated plan main only when a unit is main', () => {
    const all_delegated = formatPlannedExecution(
      {
        units: [
          { unit: 'P1', kind: 'delegated', reason: null },
          { unit: 'P2', kind: 'delegated', reason: null }
        ]
      },
      null
    );
    const mixed = formatPlannedExecution(
      {
        units: [
          { unit: 'P1', kind: 'delegated', reason: null },
          { unit: 'P2', kind: 'main', reason: '사유' }
        ]
      },
      null
    );

    expect(all_delegated?.kind).toBe('delegated');
    expect(mixed?.kind).toBe('main');
  });

  test('returns null for an enumerated plan with no units', () => {
    expect(formatPlannedExecution({ units: [] }, null)).toBeNull();
  });

  test('returns null when an enumerated unit carries an unreadable reason', () => {
    const presentation = formatPlannedExecution(
      { units: [{ unit: 'P1', kind: 'main', reason: '  ' }] },
      null
    );

    expect(presentation).toBeNull();
  });

  test('keeps the scalar presentation free of a unit list', () => {
    const presentation = formatPlannedExecution(
      { kind: 'main', reason: '직접 통합' },
      null
    );

    expect(presentation?.units).toBeUndefined();
    expect(presentation?.label).toBe('계획 · 메인');
  });

  test('renders the planned-to-actual mismatch in the label', () => {
    const sha = 'd'.repeat(40);

    const presentation = formatPlannedExecution(
      { kind: 'main', reason: 'main:bead@' + sha },
      { kind: 'delegated', actor: 'fable', effort: 'high', sha }
    );

    expect(presentation?.label).toBe('계획 · 메인 → 위임');
    expect(presentation?.title).toContain(
      `exec_receipt delegated:fable:high@${sha}`
    );
  });
});

describe('views/exec-format child chips', () => {
  test('renders the planned and actual chips under a worker class', () => {
    const sha = 'e'.repeat(40);

    render(
      childExecChips({
        workflow: {
          chips: {
            planned_execution: { kind: 'delegated', reason: null },
            exec_receipt: {
              kind: 'delegated',
              actor: 'fable',
              effort: 'high',
              sha
            }
          }
        }
      }),
      mount
    );

    expect(
      mount.querySelector('.worker-card__roll-child-chips')
    ).not.toBeNull();
    expect(mount.querySelectorAll('.ctl-chip--planned').length).toBe(1);
    expect(mount.querySelectorAll('.ctl-chip--exec-receipt').length).toBe(1);
  });

  test('renders nothing for a child without a planned execution', () => {
    expect(childExecChips({ workflow: { chips: {} } })).toBeNull();
  });
});
