import { describe, expect, test } from 'vitest';
import * as preamble from './preamble.js';
import {
  FAST_TRACK_DIRECTIVE,
  FIX_NOW_DIRECTIVE,
  PR_SUBMIT_DIRECTIVE,
  QUICKFIX_LANE_DIRECTIVE,
  REVIEW_PREAMBLE,
  UNATTENDED_PREAMBLE,
  applyPreamble,
  guardContractDirective,
  prBaseDirective
} from './preamble.js';

/**
 * Every option combination the dispatch paths actually produce (UI-rxp3 Test
 * scope 1): fast_track × pr_submit/disposition × target_base presence. Frozen
 * as golden snapshots so a wording drift has to be an explicit edit.
 *
 * @type {Array<{ name: string, options: any }>}
 */
const COMBINATIONS = [
  { name: 'plain', options: {} },
  { name: 'fast_track', options: { fast_track: true } },
  { name: 'base only', options: { target_base: 'ilsun/dev' } },
  {
    name: 'fast_track + base (the worker dispatch default)',
    options: { fast_track: true, target_base: 'main' }
  },
  {
    name: 'diagnosis no-PR',
    options: { pr_submit: false, disposition: false }
  },
  { name: 'disposition', options: { pr_submit: false, disposition: true } },
  {
    name: 'disposition + fast_track',
    options: { pr_submit: false, disposition: true, fast_track: true }
  },
  {
    name: 'disposition ignores target_base',
    options: { pr_submit: false, disposition: true, target_base: 'main' }
  },
  {
    name: 'disposition + fast_track ignores target_base',
    options: {
      pr_submit: false,
      disposition: true,
      fast_track: true,
      target_base: 'main'
    }
  },
  {
    name: 'quickfix_lane',
    options: { quickfix_lane: true, target_base: 'main' }
  }
];

describe('runner/preamble channel split (UI-rxp3 §1)', () => {
  test('returns the system prompt and the task prompt as separate fields', () => {
    const out = applyPreamble('작업하라');

    expect(out.task_prompt).toBe('작업하라');
    expect(out.system_prompt).toContain(UNATTENDED_PREAMBLE);
  });

  test('keeps the task prompt free of every contract part', () => {
    const out = applyPreamble('작업하라', {
      fast_track: true,
      target_base: 'main'
    });

    expect(out.task_prompt).toBe('작업하라');
    expect(out.task_prompt).not.toContain('무인 모드');
    expect(out.task_prompt).not.toContain('가드 계약');
  });

  test('coerces a missing base prompt to an empty task prompt', () => {
    expect(applyPreamble(/** @type {any} */ (undefined)).task_prompt).toBe('');
  });

  test('orders 무인 모드 → fast_track → fix-now → 종점 → PR base → 가드 계약', () => {
    const out = applyPreamble('작업하라', {
      fast_track: true,
      target_base: 'ilsun/dev'
    }).system_prompt;
    const idx = (/** @type {string} */ part) => out.indexOf(part);

    expect(idx(UNATTENDED_PREAMBLE)).toBeLessThan(idx(FAST_TRACK_DIRECTIVE));
    expect(idx(FAST_TRACK_DIRECTIVE)).toBeLessThan(idx(FIX_NOW_DIRECTIVE));
    expect(idx(FIX_NOW_DIRECTIVE)).toBeLessThan(idx(PR_SUBMIT_DIRECTIVE));
    expect(idx(PR_SUBMIT_DIRECTIVE)).toBeLessThan(idx('## PR base'));
    expect(idx('## PR base')).toBeLessThan(idx('## 가드 계약'));
  });

  test.each(COMBINATIONS)(
    'freezes the assembled system prompt for $name',
    ({ options }) => {
      expect(
        applyPreamble('작업하라', options).system_prompt
      ).toMatchSnapshot();
    }
  );
});

describe('runner/preamble fix-now directive', () => {
  test('states the in-session adjacent-fix contract', () => {
    expect(FIX_NOW_DIRECTIVE).toContain('금지 목록이 아니다');
    expect(FIX_NOW_DIRECTIVE).toContain('결함·드리프트 클래스');
    expect(FIX_NOW_DIRECTIVE).toContain('세션 중 흡수한 발견 항목');
  });

  test.each([
    { name: 'default', options: {} },
    { name: 'fast_track', options: { fast_track: true } },
    {
      name: 'quickfix_lane',
      options: { quickfix_lane: true, target_base: 'main' }
    },
    {
      name: 'disposition',
      options: { pr_submit: false, disposition: true }
    }
  ])('injects fix-now into the $name writable shape', ({ options }) => {
    const out = applyPreamble('작업하라', options).system_prompt;

    expect(out).toContain(FIX_NOW_DIRECTIVE);
  });

  test('excludes fix-now from the read-only review shape', () => {
    const out = applyPreamble('검토하라', { review: true }).system_prompt;

    expect(out).not.toContain('## fix-now');
  });
});

describe('runner/preamble unattended framing (UI-rxp3 §1)', () => {
  test('states the absence of a responder as an environment fact', () => {
    expect(UNATTENDED_PREAMBLE).toContain('사용자는 이 세션과 통신할 수 없다');
    expect(UNATTENDED_PREAMBLE).toContain('환경 사실');
  });

  test('keeps the blocker + abnormal-exit instruction', () => {
    expect(UNATTENDED_PREAMBLE).toContain('`blocker`');
    expect(UNATTENDED_PREAMBLE).toContain('비정상 종료');
  });

  test('carries the background-task warning the guard contract used to hold', () => {
    expect(UNATTENDED_PREAMBLE).toContain('implement-codex');
    expect(UNATTENDED_PREAMBLE).toContain('최대 2시간');
    expect(guardContractDirective()).not.toContain('백그라운드 태스크');
  });

  test('names the user-only receipt keys the session cannot write', () => {
    for (const key of [
      '`impl_dispatch`',
      '`impl_entry`',
      '`plan_approval`',
      '`workflow_mode_source=user`'
    ]) {
      expect(UNATTENDED_PREAMBLE).toContain(key);
    }
    expect(UNATTENDED_PREAMBLE).toContain('영수증 위조로 fail-closed');
    expect(UNATTENDED_PREAMBLE).toContain('main 실행 근거가 아니다');
  });
});

describe('runner/preamble PR-submit directive (worker-phase2 §1)', () => {
  test('injects the PR-submit directive with no options at all', () => {
    expect(applyPreamble('작업하라').system_prompt).toContain(
      PR_SUBMIT_DIRECTIVE
    );
  });

  test('injects the PR-submit directive under fast_track too', () => {
    expect(
      applyPreamble('작업하라', { fast_track: true }).system_prompt
    ).toContain(PR_SUBMIT_DIRECTIVE);
  });

  test('states PR submission and forbids merging', () => {
    expect(PR_SUBMIT_DIRECTIVE).toContain('PR 제출');
    expect(PR_SUBMIT_DIRECTIVE).toContain('머지하지 말 것');
  });

  test('no longer names the retired merge_policy key', () => {
    expect(PR_SUBMIT_DIRECTIVE).not.toContain('merge_policy');
  });
});

describe('runner/preamble merge axis removal (worker-phase2 §2)', () => {
  test('exports no merge-lock protocol or drift directive', () => {
    expect(/** @type {any} */ (preamble).mergeLockProtocol).toBeUndefined();
    expect(/** @type {any} */ (preamble).DRIFT_HALT_DIRECTIVE).toBeUndefined();
    expect(/** @type {any} */ (preamble).PR_STOP_DIRECTIVE).toBeUndefined();
  });

  test('emits no merge-lock protocol block for any input', () => {
    const out = applyPreamble('작업하라', { fast_track: true }).system_prompt;

    expect(out).not.toContain('merge-lock');
    expect(out).not.toContain('머지 락 프로토콜');
    expect(out).not.toContain('BDUI_WORKER_TOKEN');
  });

  test('ignores retired policy options instead of branching on them', () => {
    const plain = applyPreamble('작업하라');

    const with_retired = applyPreamble(
      '작업하라',
      /** @type {any} */ ({
        merge_policy: 'auto_merge',
        drift_policy: 'halt',
        merge_lock: { port: 4100, repo: '/r', target_base: 'trunk' }
      })
    );

    expect(with_retired).toEqual(plain);
  });
});

describe('runner/preamble disposition sessions (UI-hs11 §3.3, UI-rxp3 §1)', () => {
  test('drops the PR-submit directive when the session opens no PR', () => {
    const out = applyPreamble('처분하라', {
      pr_submit: false,
      disposition: true
    }).system_prompt;

    expect(out).not.toContain('PR 제출까지 수행하고');
    expect(out).toContain('## 무인 모드');
    expect(out).toContain('## 가드 계약');
  });

  test('keeps the PR-submit directive by default', () => {
    expect(applyPreamble('작업하라').system_prompt).toContain(
      'PR 제출까지 수행하고'
    );
  });

  test('selects the disposition guard variant explicitly', () => {
    const out = applyPreamble('처분하라', {
      pr_submit: false,
      disposition: true
    }).system_prompt;

    expect(out).toContain(guardContractDirective({ disposition: true }));
    expect(out).not.toContain(guardContractDirective({ disposition: false }));
  });

  test('keeps the ordinary guard variant for a diagnosis no-PR session', () => {
    const out = applyPreamble('분류하라', {
      pr_submit: false,
      disposition: false
    }).system_prompt;

    expect(out).not.toContain('PR 제출까지 수행하고');
    expect(out).toContain(guardContractDirective({ disposition: false }));
    expect(out).not.toContain(guardContractDirective({ disposition: true }));
  });
});

describe('runner/preamble Worker-dispatched quick_fix lane', () => {
  test('replaces PR-submit and PR-base directives with the quick_fix terminal', () => {
    const out = applyPreamble('구현하라', {
      quickfix_lane: true,
      target_base: 'main'
    }).system_prompt;

    expect(out).toContain(QUICKFIX_LANE_DIRECTIVE);
    expect(out).not.toContain(PR_SUBMIT_DIRECTIVE);
    expect(out).not.toContain('## PR base');
  });

  test('states the reviewed push and Worker-owned tail', () => {
    expect(QUICKFIX_LANE_DIRECTIVE).toContain(
      'implementation review 1회(필수)'
    );
    expect(QUICKFIX_LANE_DIRECTIVE).toContain('실제로 push한 head SHA');
    expect(QUICKFIX_LANE_DIRECTIVE).toContain('bead `resolved`');
    expect(QUICKFIX_LANE_DIRECTIVE).toContain(
      '배포 실행·배포 증거·bead `closed`·worktree/브랜치 정리는 Worker가 소유한다'
    );
    expect(QUICKFIX_LANE_DIRECTIVE).toContain(
      'dotfiles `docs/contracts/workflow.md`'
    );
  });

  test('permits base push while keeping hook bypass and gh merge kills', () => {
    const out = applyPreamble('구현하라', {
      quickfix_lane: true
    }).system_prompt;

    expect(out).not.toContain('pre-push hook 이 거부한다');
    expect(out).not.toContain('base_landing_detected');
    expect(out).toContain('base 로의 `git push`가 임무');
    expect(out).toContain('git push --no-verify');
    expect(out).toContain('gh pr merge');
    expect(out).toContain('즉시 종료');
  });

  test('keeps disposition precedence over the narrow quick_fix exception', () => {
    expect(
      guardContractDirective({ disposition: true, quickfix_lane: true })
    ).toBe(guardContractDirective({ disposition: true }));
  });
});

describe('runner/preamble existing channel regressions', () => {
  test('keeps the read-only review output exact', () => {
    expect(
      applyPreamble('검토하라', {
        review: true,
        quickfix_lane: true,
        disposition: true
      })
    ).toEqual({
      system_prompt: [UNATTENDED_PREAMBLE, REVIEW_PREAMBLE].join('\n\n'),
      task_prompt: '검토하라'
    });
  });
});

describe('runner/preamble PR base directive (worker-base-scope-alignment §4)', () => {
  test('names the resolved base and the --base flag', () => {
    const out = applyPreamble('작업하라', {
      target_base: 'ilsun/dev'
    }).system_prompt;

    expect(out).toContain('gh pr create --base ilsun/dev');
    expect(out).toContain('target_base 는 `ilsun/dev`');
  });

  test('warns that omitting --base opens against the GitHub default branch', () => {
    expect(prBaseDirective('main')).toContain('GitHub 기본 브랜치');
  });

  test('announces the pre-merge comparison so the session is not surprised by it', () => {
    expect(prBaseDirective('main')).toContain('baseRefName');
    expect(prBaseDirective('main')).toContain('fail-closed');
  });

  test('injects nothing when no base was resolved', () => {
    expect(applyPreamble('작업하라').system_prompt).not.toContain('## PR base');
    expect(
      applyPreamble('작업하라', { target_base: null }).system_prompt
    ).not.toContain('## PR base');
    expect(
      applyPreamble('작업하라', { target_base: '  ' }).system_prompt
    ).not.toContain('## PR base');
  });

  test('drops the base directive with the PR-submit directive it belongs to', () => {
    const out = applyPreamble('처분하라', {
      pr_submit: false,
      disposition: true,
      target_base: 'ilsun/dev'
    }).system_prompt;

    expect(out).not.toContain('## PR base');
  });
});

describe('runner/preamble guard contract severity tiers (UI-rxp3 §1)', () => {
  const contract = guardContractDirective();

  test('declares the three severity tiers', () => {
    expect(contract).toContain('### 즉시 종료');
    expect(contract).toContain('### 거부만 됨');
    expect(contract).toContain('### 허용됨');
  });

  test('names both immediate-kill causes', () => {
    expect(contract).toContain('gh pr merge');
    expect(contract).toContain('--no-verify');
    expect(contract).toContain('core.hooksPath');
    expect(contract).toContain('GIT_CONFIG_COUNT');
  });

  test('pairs the hook-bypass prohibition with a legal isolation alternative', () => {
    expect(contract).toContain(
      'GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null'
    );
    expect(contract).toContain('오답:');
    expect(contract).toContain('정답:');
  });

  test('pairs the merge prohibition with the session terminal it should reach', () => {
    expect(contract).toContain('머지는 사람의 클릭이다');
  });

  test('pairs the base-push refusal with the feature-branch + PR alternative', () => {
    expect(contract).toContain('pre-push hook 이 거부한다');
    expect(contract).toContain('세션은 종료되지 않고');
    expect(contract).toContain('gh pr create --base <target_base>');
  });

  test('states that a push to ANOTHER repo base is not judged at all', () => {
    expect(contract).toContain('다른 저장소의 base');
    expect(contract).toContain('판정 대상이 아니다');
  });

  test('announces the post-hoc base invariant', () => {
    expect(contract).toContain('base_landing_detected');
  });

  // UI-1xcd §5: the directive that cost a session $11.67 said the opposite.
  test('tells the session a base merge does NOT end it', () => {
    expect(contract).toContain('git merge origin/main');
    expect(contract).toContain('허용된다');
    expect(contract).toContain('기록된다');
  });

  test('names hook-path READING as no violation, unlike writing it', () => {
    expect(contract).toContain('git config --get core.hooksPath');
    expect(contract).toContain('위반이 아니다');
    expect(contract).toContain('git config set|unset');
  });

  // UI-iw28 §5: enforcement stopped killing every one-shot relocation, so the
  // notice must stop naming them unconditionally — a session told otherwise
  // invents a workaround for a rule that is no longer there.
  test('scopes the one-shot relocation kill to the command it decorates', () => {
    expect(contract).toContain('**1회성 재배치**');
    expect(contract).toContain('열거 밖인 것');
  });

  test('keeps the persistent config write in the kill tier', () => {
    expect(contract).toContain('git config core.hooksPath <값>');
  });

  test('names an enumerated one-shot relocation as no violation', () => {
    expect(contract).toContain('`status`·`rev-parse`');
    expect(contract).toContain('붙일 이유도 없다');
  });
});

describe('runner/preamble disposition guard variant (UI-rxp3 §1)', () => {
  const contract = guardContractDirective({ disposition: true });

  test('keeps gh pr merge as the one immediate kill', () => {
    expect(contract).toContain('gh pr merge');
    expect(contract).toContain('### 즉시 종료');
  });

  test('drops the hook-bypass kill the guard does not apply to it', () => {
    expect(contract).not.toContain('--no-verify');
    expect(contract).not.toContain('GIT_CONFIG_COUNT');
  });

  test('drops the base-push refusal, whose judgment it is exempt from', () => {
    expect(contract).not.toContain('pre-push hook 이 거부한다');
    expect(contract).not.toContain('base_landing_detected');
    expect(contract).toContain('거부 판정은 없다');
  });

  test('says publishing the resolved base IS the job', () => {
    expect(contract).toContain('REVISE 처분 세션');
    expect(contract).toContain('적용되지 않는다');
  });

  test('keeps the allowed tier it shares with every other session', () => {
    expect(contract).toContain('git merge origin/main');
    expect(contract).toContain('git config --get core.hooksPath');
  });
});
