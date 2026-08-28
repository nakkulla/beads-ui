import { describe, expect, test } from 'vitest';
import {
  REC_LABEL,
  REC_REASONS,
  REC_REASON_TEXT,
  recSettings,
  recTooltip
} from './rec-settings.js';

/**
 * The contract's `rec_reason` signal enum, written out rather than imported:
 * the server half lives in a node-only module, so the drift guard is a literal
 * here and an equality against THIS list in `server/worker/exec-enums.test.js`.
 */
const CONTRACT_SIGNALS = [
  'contract_change',
  'multi_repo',
  'open_design_fork',
  'multi_phase',
  'claude_bound'
];

describe('recSettings 존재 조건 (UI-sbum §1)', () => {
  test('returns a recommendation when the orchestration model is recommended', () => {
    const result = recSettings({ rec_orchestration_model: 'fable' });

    expect(result).toEqual({
      reasons: [],
      rec: { orchestration_model: 'fable' },
      state: 'unapplied'
    });
  });

  test('returns null when only the implementation runtime is recommended', () => {
    const result = recSettings({ rec_impl_runtime: 'claude' });

    expect(result).toBeNull();
  });

  test('carries the recommended implementation runtime alongside the model', () => {
    const result = recSettings({
      rec_orchestration_model: 'fable',
      rec_impl_runtime: 'claude'
    });

    expect(result?.rec).toEqual({
      orchestration_model: 'fable',
      impl_runtime: 'claude'
    });
  });

  test('ignores an orchestration model outside the enum', () => {
    const result = recSettings({ rec_orchestration_model: 'opus' });

    expect(result).toBeNull();
  });

  test('ignores an implementation runtime outside the enum', () => {
    const result = recSettings({
      rec_orchestration_model: 'fable',
      rec_impl_runtime: 'codex'
    });

    expect(result?.rec).toEqual({ orchestration_model: 'fable' });
  });
});

describe('recSettings rec_reason 파싱 (UI-sbum §1)', () => {
  test('splits the signal list on +', () => {
    const result = recSettings({
      rec_orchestration_model: 'fable',
      rec_reason: 'contract_change+claude_bound'
    });

    expect(result?.reasons).toEqual(['contract_change', 'claude_bound']);
  });

  test('drops tokens outside the signal enum', () => {
    const result = recSettings({
      rec_orchestration_model: 'fable',
      rec_reason: 'contract_change+made_up'
    });

    expect(result?.reasons).toEqual(['contract_change']);
  });

  test('keeps the chip when rec_reason is absent', () => {
    const result = recSettings({ rec_orchestration_model: 'fable' });

    expect(result?.reasons).toEqual([]);
  });
});

describe('recSettings 상태 판정 (UI-sbum §1)', () => {
  test('reads unapplied when no authority key is set', () => {
    const result = recSettings(
      { rec_orchestration_model: 'fable', rec_impl_runtime: 'claude' },
      {}
    );

    expect(result?.state).toBe('unapplied');
  });

  test('reads applied when every recommended key already matches', () => {
    const result = recSettings(
      { rec_orchestration_model: 'fable', rec_impl_runtime: 'claude' },
      { orchestration_model: 'fable', impl_runtime: 'claude' }
    );

    expect(result?.state).toBe('applied');
  });

  test('reads diverged when an authority key holds a different value', () => {
    const result = recSettings(
      { rec_orchestration_model: 'fable' },
      { orchestration_model: 'opus' }
    );

    expect(result?.state).toBe('diverged');
  });

  test('reads diverged when only part of the recommendation is applied', () => {
    const result = recSettings(
      { rec_orchestration_model: 'fable', rec_impl_runtime: 'claude' },
      { orchestration_model: 'fable' }
    );

    expect(result?.state).toBe('diverged');
  });

  test('reads the authority from the same bag when none is passed', () => {
    const result = recSettings({
      rec_orchestration_model: 'fable',
      orchestration_model: 'fable'
    });

    expect(result?.state).toBe('applied');
  });
});

describe('recSettings fail-quiet (UI-sbum §1)', () => {
  test('returns null for a non-object metadata', () => {
    expect(recSettings(null)).toBeNull();
    expect(recSettings('fable')).toBeNull();
    expect(recSettings(undefined)).toBeNull();
  });

  test('ignores a non-string rec_reason instead of throwing', () => {
    const result = recSettings({
      rec_orchestration_model: 'fable',
      rec_reason: 7
    });

    expect(result?.reasons).toEqual([]);
  });

  test('ignores a non-object authority instead of throwing', () => {
    const result = recSettings({ rec_orchestration_model: 'fable' }, 'nope');

    expect(result?.state).toBe('unapplied');
  });
});

describe('REC_REASON_TEXT (UI-8x90 §4.6)', () => {
  test('gives every contract signal a sentence', () => {
    const missing = REC_REASONS.filter(
      (reason) => (REC_REASON_TEXT[reason] || '').length === 0
    );

    expect(missing).toEqual([]);
  });

  test('names no signal outside the contract enum', () => {
    expect(Object.keys(REC_REASON_TEXT).sort()).toEqual(
      [...REC_REASONS].sort()
    );
  });

  test('names neither a model nor a runtime in any sentence', () => {
    const joined = Object.values(REC_REASON_TEXT).join(' ');

    expect(joined).not.toContain('fable');
    expect(joined).not.toContain('codex');
  });
});

describe('recTooltip (UI-sbum §1, 문장은 UI-8x90 §4.6)', () => {
  test('writes the reason sentences rather than the signal codes', () => {
    const rec = recSettings({
      rec_orchestration_model: 'fable',
      rec_reason: 'multi_phase'
    });

    expect(recTooltip(rec)).toContain(
      '사유: 여러 Phase 또는 병렬 쓰기 조정이 필요하다'
    );
    expect(recTooltip(rec)).not.toContain('multi_phase');
  });

  test('drops an unknown signal instead of naming it', () => {
    const rec = recSettings({
      rec_orchestration_model: 'fable',
      rec_reason: 'multi_repo+wat'
    });

    expect(recTooltip(rec)).toBe(
      '복잡한 작업으로 판정됨\n사유: 둘 이상의 저장소에 작업 단위가 생긴다\n상태: 미적용'
    );
  });

  test('names the judgement, the reasons, and the state', () => {
    const rec = recSettings(
      {
        rec_orchestration_model: 'fable',
        rec_impl_runtime: 'claude',
        rec_reason: 'contract_change+claude_bound'
      },
      {}
    );

    expect(recTooltip(rec)).toBe(
      '복잡한 작업으로 판정됨\n사유: 계약 문서·checker·스킬 사본을 함께 바꿔야 한다 · Claude 세션 자산·의미론에 강하게 묶여 있다\n상태: 미적용'
    );
  });

  test('omits the reason line when no signal survives', () => {
    const rec = recSettings({ rec_orchestration_model: 'fable' }, {});

    expect(recTooltip(rec)).toBe('복잡한 작업으로 판정됨\n상태: 미적용');
  });

  test('names neither the model nor the runtime', () => {
    const rec = recSettings({
      rec_orchestration_model: 'fable',
      rec_impl_runtime: 'claude',
      rec_reason: 'multi_repo'
    });

    const tooltip = recTooltip(rec);

    expect(tooltip).not.toContain('fable');
    expect(tooltip).not.toContain('claude');
  });

  test('answers an empty string for a missing recommendation', () => {
    expect(recTooltip(null)).toBe('');
    expect(recTooltip(undefined)).toBe('');
  });

  test('says applied and diverged in their own words', () => {
    const applied = recSettings(
      { rec_orchestration_model: 'fable' },
      { orchestration_model: 'fable' }
    );
    const diverged = recSettings(
      { rec_orchestration_model: 'fable' },
      { orchestration_model: 'opus' }
    );

    expect(recTooltip(applied)).toContain('상태: 적용됨');
    expect(recTooltip(diverged)).toContain('상태: 추천과 다름');
  });
});

describe('rec 어휘 드리프트 방지 (UI-sbum §2)', () => {
  test('matches the contract signal enum exactly', () => {
    expect(REC_REASONS).toEqual(CONTRACT_SIGNALS);
  });

  test('labels the chip 복잡', () => {
    expect(REC_LABEL).toBe('복잡');
  });
});
