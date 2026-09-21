import { describe, expect, test } from 'vitest';
import {
  RELATION_CHIPS,
  REPRESENTATIVE_KIND_ORDER,
  SUMMARY_CHIPS,
  WAIT_KINDS,
  WAIT_VERDICTS,
  representativeWaitReason,
  waitBadgeText,
  waitKindRow,
  waitScopeOf
} from './wait-vocabulary.js';

describe('wait vocabulary table', () => {
  test('keeps every row id unique', () => {
    const ids = WAIT_KINDS.map((row) => row.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  test('lists the spec row ids in order', () => {
    const ids = WAIT_KINDS.map((row) => row.id);

    expect(ids).toEqual([
      'prerequisite',
      'provider_hold',
      'retry_wait',
      'awaiting_user',
      'external_job'
    ]);
  });

  test('gives every row a scope, a glyph string and the release sentence', () => {
    const complete = WAIT_KINDS.every(
      (row) =>
        ['bead', 'queue'].includes(row.scope) &&
        typeof row.glyph === 'string' &&
        row.release.length > 0
    );

    expect(complete).toBe(true);
  });

  test('defines both times-line words on every row (UI-0bvr §5.1)', () => {
    const defined = WAIT_KINDS.every(
      (row) =>
        typeof row.elapsed_word === 'string' &&
        typeof row.next_word === 'string'
    );

    expect(defined).toBe(true);
  });

  test('leaves both times-line words empty for the two prerequisite rows', () => {
    const rows = WAIT_KINDS.filter((row) =>
      ['prerequisite', 'prerequisite_foreign'].includes(row.id)
    );

    expect(rows.map((row) => [row.elapsed_word, row.next_word])).toEqual([
      ['', '']
    ]);
  });

  test('names the times-line words of the clock-carrying kinds', () => {
    const words = ['external_job', 'retry_wait', 'provider_hold']
      .map((id) => WAIT_KINDS.find((row) => row.id === id))
      .map((row) => [row?.elapsed_word, row?.next_word]);

    expect(words).toEqual([
      ['경과', '다음'],
      ['대기', '다음 재시도'],
      ['보류', '다음 프로브']
    ]);
  });

  test('writes the overdue glyph as one codepoint without a variation selector', () => {
    const overdue = WAIT_VERDICTS.find((row) => row.verdict === 'overdue');

    expect([...(overdue?.glyph || '')].map((ch) => ch.codePointAt(0))).toEqual([
      0x26a0
    ]);
  });
});

describe('waitScopeOf', () => {
  test('treats provider gate chips as queue-scoped', () => {
    expect(waitScopeOf('gate')).toBe('queue');
  });

  test.each(['prerequisite', 'provider_hold', 'external_job', 'recovery'])(
    'treats %s as an issue fact',
    (kind) => {
      expect(waitScopeOf(kind)).toBe('bead');
    }
  );
});

describe('waitKindRow', () => {
  test('maps a prerequisite to the one prerequisite row', () => {
    const row = waitKindRow(
      { kind: 'prerequisite' },
      /** @type {any} */ ({ returning: true })
    );

    expect(row?.id).toBe('prerequisite');
  });

  test('infers an outage hold from the headline when no hold kind is given', () => {
    const row = waitKindRow({
      kind: 'provider_hold',
      headline: 'codex 공급자 장애 · 접속 실패'
    });

    expect(row?.id).toBe('provider_hold');
  });

  test('defaults an unlabelled provider hold to the usage limit row', () => {
    const row = waitKindRow({
      kind: 'provider_hold',
      headline: 'codex 한도 초과'
    });

    expect(row?.id).toBe('provider_hold');
  });

  test('omits the retired queue hold', () => {
    const row = waitKindRow({
      kind: 'queue_hold',
      headline: '환경 오류로 큐 일시 정지 · network'
    });

    expect(row).toBeNull();
  });

  test('returns null for a reason without a kind', () => {
    expect(waitKindRow({ headline: '무엇' })).toBeNull();
  });
});

describe('waitBadgeText', () => {
  const prerequisite = WAIT_KINDS[0];

  test('draws the kind glyph and label at a normal verdict', () => {
    expect(waitBadgeText(prerequisite, 'normal')).toBe('⛓ 선행 대기');
  });

  test('adds the elapsed minutes to an overdue badge', () => {
    const text = waitBadgeText(waitKindRow({ kind: 'retry_wait' }), 'overdue', {
      since: 1000,
      now: 1000 + 12 * 60_000
    });

    expect(text).toBe('⚠ 재시도 대기 · 지연 12분');
  });

  test('omits the minutes when no observation start is known', () => {
    expect(
      waitBadgeText(waitKindRow({ kind: 'retry_wait' }), 'overdue', { now: 5 })
    ).toBe('⚠ 재시도 대기 · 지연');
  });

  test('marks an action-required badge', () => {
    expect(waitBadgeText(prerequisite, 'action_required')).toBe(
      '⛔ 선행 대기 · 조치 필요'
    );
  });

  test('draws the kind alone when the server has no verdict', () => {
    expect(waitBadgeText(prerequisite, null)).toBe('⛓ 선행 대기');
  });

  test('omits retired base movement as a wait kind', () => {
    const base_moved = WAIT_KINDS.find((row) => row.id === 'base_moved');

    expect(waitBadgeText(base_moved, 'normal')).toBe('');
  });
});

describe('representativeWaitReason', () => {
  test('prefers the action-required foreign prerequisite over a normal one', () => {
    const chosen = representativeWaitReason([
      { kind: 'prerequisite', verdict: 'normal' },
      { kind: 'prerequisite_foreign', verdict: 'action_required' }
    ]);

    expect(chosen?.kind).toBe('prerequisite_foreign');
  });

  test('breaks a verdict tie with the kind order', () => {
    const chosen = representativeWaitReason([
      { kind: 'retry_wait', verdict: 'normal' },
      { kind: 'awaiting_user', verdict: 'normal' }
    ]);

    expect(chosen?.kind).toBe('awaiting_user');
  });

  test('ignores external work and queue facts', () => {
    const chosen = representativeWaitReason([
      { kind: 'external_job', verdict: 'action_required' },
      { kind: 'gate', verdict: 'normal' },
      { kind: 'retry_wait', verdict: 'normal' }
    ]);

    expect(chosen?.kind).toBe('retry_wait');
  });

  test('returns null when nothing is issue-scoped', () => {
    expect(representativeWaitReason([{ kind: 'gate' }])).toBeNull();
  });

  test('orders human decisions ahead of prerequisites', () => {
    expect(REPRESENTATIVE_KIND_ORDER.indexOf('awaiting_user')).toBeLessThan(
      REPRESENTATIVE_KIND_ORDER.indexOf('prerequisite')
    );
  });
});

describe('relation and summary chips', () => {
  test('keeps the chip grammar meanings verbatim', () => {
    const meanings = Object.fromEntries(
      RELATION_CHIPS.map((row) => [row.id, row.meaning])
    );

    expect(meanings).toMatchObject({
      'blocked-by': '지금 못 가는 이유',
      blocks: '내가 먼저 가야 풀리는 이슈',
      released: '왜 이제 갈 수 있나',
      'scope-overlap': '같이 출발하면 부딪히는 이슈',
      'scope-missing': '겹침 판정 불가',
      'discovered-from': '어디서 파생됐나',
      'worker-created': 'Worker가 어느 이슈에서 새로 만들었나'
    });
  });

  test('carries the grace and external-count chips', () => {
    const labels = RELATION_CHIPS.map((row) => row.label);

    expect(labels).toContain('⏳ <n>초');
    expect(labels).not.toContain('<판정 글리프> 외부 작업 N건');
  });

  test('states the blocked aggregation rule on the summary chip', () => {
    const blocked = SUMMARY_CHIPS.find((row) => row.id === 'blocked');

    expect(blocked?.meaning).toContain('provider_hold도 포함');
  });

  test('names the four summary chips', () => {
    expect(SUMMARY_CHIPS.map((row) => row.id)).toEqual([
      'running',
      'pr_wait',
      'done',
      'blocked'
    ]);
  });
});

test('shares one session label across parked and recovery kinds', () => {
  const rows = ['awaiting_user', 'recovery'].map((kind) =>
    waitKindRow({ kind })
  );

  expect(rows.map((row) => waitBadgeText(row, 'action_required'))).toEqual([
    '⛔ 세션이 멈춤 · 조치 필요',
    '⛔ 세션이 멈춤 · 조치 필요'
  ]);
});

test('shares one prerequisite label across repositories', () => {
  expect(waitKindRow({ kind: 'prerequisite_foreign' })).toBe(
    waitKindRow({ kind: 'prerequisite' })
  );
});

test('pins the representative reason order', () => {
  expect(REPRESENTATIVE_KIND_ORDER).toEqual([
    'awaiting_user',
    'recovery',
    'provider_hold',
    'prerequisite_foreign',
    'prerequisite',
    'retry_wait'
  ]);
});
