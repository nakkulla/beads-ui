import { describe, expect, test } from 'vitest';
import * as preamble from './preamble.js';
import {
  CLAUDE_LIFETIME_DIRECTIVE,
  CODEX_LIFETIME_DIRECTIVE,
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
 * A complete facts card, as `attempt-facts.js` would collect one at dispatch.
 * Every field is filled so a snapshot shows the whole grammar; the fail-quiet
 * cases override individual fields with null.
 *
 * @param {Object} [over]
 * @returns {any}
 */
function facts(over = {}) {
  return {
    attempt_id: 'att-1',
    bead_id: 'UI-1',
    route: 'spec_backed',
    base: `origin/main@${'a'.repeat(40)}`,
    worktree: '/repo/.worktrees/UI-1',
    dotfiles_root: '/dotfiles',
    workflow_python: '/dotfiles/.venv/bin/python',
    node_modules: 'ok',
    remote_tip: null,
    selector_inputs: [
      { key: 'impl_runtime', value: 'claude', source: 'bead' },
      { key: 'impl_model', value: 'opus', source: 'workspace_kv' },
      { key: 'impl_effort', value: null, source: null },
      { key: 'impl_speed', value: null, source: null },
      { key: 'impl_dispatch', value: null, source: null }
    ],
    reviewer_preset: {
      token: 'codex',
      model: 'gpt-5.6-sol',
      effort: 'xhigh',
      digest: 'abc123'
    },
    bead_status: 'in_progress',
    claimed_by_worker: true,
    scripts: [
      {
        command: 'python3 /skills/impl-selector.py --controller-runtime claude',
        note: '실행 형태 정본.'
      },
      {
        command: 'python3 /skills/check-completion-report.py <경로>',
        note: null
      }
    ],
    pitfalls: '- zsh: 글롭은 따옴표\n- `set -o pipefail`',
    ...over
  };
}

/**
 * Every option combination the dispatch paths actually produce (UI-rxp3 Test
 * scope 1): fast_track × pr_submit/disposition × target_base presence, and
 * since harness-reduction spec D1 the facts-bearing variants of each. Frozen
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
  },
  {
    name: 'codex runtime',
    options: { runtime: 'codex', fast_track: true, target_base: 'main' }
  },
  {
    name: 'facts + fast_track + base (the worker dispatch default)',
    options: { fast_track: true, target_base: 'main', attempt_facts: facts() }
  },
  {
    name: 'facts + codex runtime',
    options: {
      runtime: 'codex',
      fast_track: true,
      target_base: 'main',
      attempt_facts: facts({
        scripts: [
          {
            command:
              'python3 /skills/impl-selector.py --controller-runtime codex',
            note: null
          }
        ]
      })
    }
  },
  {
    name: 'facts + disposition',
    options: {
      pr_submit: false,
      disposition: true,
      fast_track: true,
      attempt_facts: facts()
    }
  },
  {
    name: 'facts + quickfix_lane',
    options: {
      quickfix_lane: true,
      fast_track: true,
      target_base: 'main',
      attempt_facts: facts({ route: 'quick_fix' })
    }
  },
  {
    name: 'facts + review',
    options: { review: true, attempt_facts: facts() }
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

  test('orders 무인 모드 → 시도 사실 → fast_track → 종점 → PR base → 가드 계약 → fix-now → 수명', () => {
    const out = applyPreamble('작업하라', {
      fast_track: true,
      target_base: 'ilsun/dev',
      attempt_facts: facts()
    }).system_prompt;
    const idx = (/** @type {string} */ part) => out.indexOf(part);

    expect(idx(UNATTENDED_PREAMBLE)).toBeLessThan(idx('## 시도 사실'));
    expect(idx('## 시도 사실')).toBeLessThan(idx(FAST_TRACK_DIRECTIVE));
    expect(idx(FAST_TRACK_DIRECTIVE)).toBeLessThan(idx(PR_SUBMIT_DIRECTIVE));
    expect(idx(PR_SUBMIT_DIRECTIVE)).toBeLessThan(idx('## PR base'));
    expect(idx('## PR base')).toBeLessThan(idx('## 가드 계약'));
    expect(idx('## 가드 계약')).toBeLessThan(idx(FIX_NOW_DIRECTIVE));
    expect(idx(FIX_NOW_DIRECTIVE)).toBeLessThan(idx(CLAUDE_LIFETIME_DIRECTIVE));
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
    expect(UNATTENDED_PREAMBLE).toContain('단계마다 요약 메시지를 쓰지 않는다');
    expect(UNATTENDED_PREAMBLE).toContain('비정상 종료');
  });

  test('names the one tool that holds the claude process', () => {
    expect(CLAUDE_LIFETIME_DIRECTIVE).toContain('새 `Agent` 호출만');
    expect(CLAUDE_LIFETIME_DIRECTIVE).toContain(
      '턴이 끝나면 프로세스가 죽는다'
    );
    expect(guardContractDirective()).not.toContain('백그라운드 태스크');
  });

  test('drops the enumeration the lifetime block used to carry', () => {
    expect(CLAUDE_LIFETIME_DIRECTIVE).not.toContain('implement-codex');
    expect(CLAUDE_LIFETIME_DIRECTIVE).not.toContain('최대 2시간');
  });

  test('carries the Fable unattended completion rules', () => {
    expect(UNATTENDED_PREAMBLE).toContain('이 세션은 자율 실행이다');
    expect(UNATTENDED_PREAMBLE).toContain('지금 툴콜로 한다');
    expect(UNATTENDED_PREAMBLE).toContain('한 응답에 모두 낸다');
  });

  test('adds no narration-suppression sentence', () => {
    expect(UNATTENDED_PREAMBLE).not.toContain('나레이션');
    expect(UNATTENDED_PREAMBLE).not.toContain('진행 상황을 적지 마라');
  });

  test('keeps the runtime-specific wait paragraph out of the shared block', () => {
    expect(UNATTENDED_PREAMBLE).not.toContain('최대 2시간');
    expect(UNATTENDED_PREAMBLE).not.toContain('spawn_agent');
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
    expect(PR_SUBMIT_DIRECTIVE).toContain('저장소가 요구하는 검증과 리뷰');
    expect(PR_SUBMIT_DIRECTIVE).toContain('PR을 생성');
    expect(PR_SUBMIT_DIRECTIVE).not.toContain('CI 확인');
    expect(PR_SUBMIT_DIRECTIVE).toContain('머지는 큐가 소유한다');
    expect(PR_SUBMIT_DIRECTIVE).toContain('세션에서 머지하지 마라');
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

    expect(out).not.toContain('저장소가 요구하는 검증과 리뷰');
    expect(out).toContain('## 무인 모드');
    expect(out).toContain('## 가드 계약');
  });

  test('keeps the PR-submit directive by default', () => {
    expect(applyPreamble('작업하라').system_prompt).toContain(
      '저장소가 요구하는 검증과 리뷰'
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

    expect(out).not.toContain('저장소가 요구하는 검증과 리뷰');
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
      'implementation review 게이트 1회'
    );
    expect(QUICKFIX_LANE_DIRECTIVE).toContain('실제로 push한 head SHA');
    expect(QUICKFIX_LANE_DIRECTIVE).toContain(
      '진행 권한이며 실제 리뷰 증거가 아니다'
    );
    expect(QUICKFIX_LANE_DIRECTIVE).not.toContain('skip`으로 선택하지 마라');
    expect(QUICKFIX_LANE_DIRECTIVE).toContain('bead `resolved`');
    expect(QUICKFIX_LANE_DIRECTIVE).toContain(
      '배포 실행·배포 증거·bead `closed`·worktree/브랜치 정리는 Worker가 소유한다'
    );
    expect(QUICKFIX_LANE_DIRECTIVE).toContain(
      'dotfiles `docs/contracts/workflow-contract.md`'
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
      system_prompt: [
        UNATTENDED_PREAMBLE,
        CLAUDE_LIFETIME_DIRECTIVE,
        REVIEW_PREAMBLE
      ].join('\n\n'),
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
  });

  test('pairs the hook-bypass prohibition with a legal isolation alternative', () => {
    expect(contract).toContain(
      'GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null'
    );
  });

  // Spec D1: the enumeration was a second copy of `command-guard.js`'s table,
  // and a copy of a table reads as the boundary of the rule.
  test('drops the relocation enumeration and the wrong/right pair', () => {
    expect(contract).not.toContain('GIT_CONFIG_COUNT');
    expect(contract).not.toContain('GIT_CONFIG_PARAMETERS');
    expect(contract).not.toContain('오답:');
    expect(contract).not.toContain('정답:');
    expect(contract).not.toContain('`status`·`rev-parse`');
    expect(contract).not.toContain('git config --get core.hooksPath');
  });

  test('points at the refusal message for the exact judgment', () => {
    expect(contract).toContain('거부 시 훅 메시지가 안내한다');
  });

  test('splits the hook effect by runtime', () => {
    expect(contract).toContain('Claude 세션은 PreToolUse 훅이 먼저 거부하고');
    expect(contract).toContain('Codex 런타임은 훅이 없어');
  });

  test('stays under half the size the enumeration made it', () => {
    expect(contract.length).toBeLessThan(1200);
  });

  test('pairs the merge prohibition with the session terminal it should reach', () => {
    expect(contract).toContain('머지는 큐가 소유한다');
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

  test('keeps naming the persistent-write spellings it kills on', () => {
    expect(contract).toContain('git config set|unset');
  });

  test('keeps the persistent config write in the kill tier', () => {
    expect(contract).toContain('git config core.hooksPath <값>');
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
  });

  test('drops the hook-bypass tier along with its runtime split', () => {
    expect(contract).not.toContain('GIT_CONFIG_PARAMETERS');
    expect(contract).not.toContain('Codex 런타임은 훅이 없어');
  });
});

describe('runner/preamble runtime lifetime split (codex-orchestration-parity §3.2)', () => {
  test('names only claude wait tools in the claude lifetime block', () => {
    expect(CLAUDE_LIFETIME_DIRECTIVE).toContain('`Agent`');
    expect(CLAUDE_LIFETIME_DIRECTIVE).toContain('`SendMessage`');
    expect(CLAUDE_LIFETIME_DIRECTIVE).not.toContain('spawn_agent');
  });

  test('names only native codex wait tools in the codex lifetime block', () => {
    expect(CODEX_LIFETIME_DIRECTIVE).toContain('spawn_agent');
    expect(CODEX_LIFETIME_DIRECTIVE).toContain('wait_agent');
    for (const claude_only of [
      '`Agent`',
      '`SendMessage`',
      '최대 2시간',
      '백그라운드 셸'
    ]) {
      expect(CODEX_LIFETIME_DIRECTIVE).not.toContain(claude_only);
    }
  });

  test('refuses fire-and-forget completion in the codex lifetime block', () => {
    expect(CODEX_LIFETIME_DIRECTIVE).toContain('구현 완료를 보고할 수 없다');
  });

  test('composes the codex lifetime block for a codex runtime', () => {
    const out = applyPreamble('작업하라', { runtime: 'codex' }).system_prompt;

    expect(out).toContain(CODEX_LIFETIME_DIRECTIVE);
    expect(out).not.toContain(CLAUDE_LIFETIME_DIRECTIVE);
  });

  test('composes the claude lifetime block when no runtime is given', () => {
    const out = applyPreamble('작업하라').system_prompt;

    expect(out).toContain(CLAUDE_LIFETIME_DIRECTIVE);
    expect(out).not.toContain(CODEX_LIFETIME_DIRECTIVE);
  });

  test('carries the runtime lifetime block into the review shape too', () => {
    const out = applyPreamble('검토하라', {
      runtime: 'codex',
      review: true
    }).system_prompt;

    expect(out).toContain(CODEX_LIFETIME_DIRECTIVE);
  });
});

describe('runner/preamble result line grammar (spec D1)', () => {
  test('inlines the five result forms in the PR-submit terminal', () => {
    for (const form of [
      '성공 · <PR #N|push <sha7>|refuted: …|no-delta: …|bench:<run_id>>',
      '파킹 · <awaiting_user 값>',
      '실패 · <원인>',
      '환경 · <오류 문장 원문>',
      '대기 · blocks:<ID>[, …]'
    ]) {
      expect(PR_SUBMIT_DIRECTIVE).toContain(form);
    }
  });

  test('inlines the same forms in the quick_fix terminal', () => {
    expect(QUICKFIX_LANE_DIRECTIVE).toContain('실패 · <원인>');
    expect(QUICKFIX_LANE_DIRECTIVE).toContain('환경 · <오류 문장 원문>');
  });

  test('declares the grammar a copy of the dotfiles canonical source', () => {
    expect(PR_SUBMIT_DIRECTIVE).toContain(
      '이 문법의 정본은 dotfiles `finishing.md`이고 위는 사본이다'
    );
  });
});

describe('runner/preamble attempt facts card (spec D1)', () => {
  test('emits no facts block when the caller hands over no facts', () => {
    const out = applyPreamble('작업하라', { fast_track: true }).system_prompt;

    expect(out).not.toContain('## 시도 사실');
  });

  test('states the identity line with the recorded workflow mode', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts()
    }).system_prompt;

    expect(out).toContain(
      '- attempt=att-1 bead=UI-1 route=spec_backed workflow_mode=fast_track (source=attempt 기록)'
    );
  });

  test('omits the route token when the bead carries no route', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ route: null })
    }).system_prompt;

    expect(out).toContain('- attempt=att-1 bead=UI-1 workflow_mode=fast_track');
    expect(out).not.toContain('route=');
  });

  test('omits the dotfiles_root line when it could not be resolved', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ dotfiles_root: null })
    }).system_prompt;

    expect(out).not.toContain('dotfiles_root=');
    expect(out).toContain('## 시도 사실');
    expect(out).toContain('수집 위임(subagent wave) 없이');
  });

  test('omits the workflow_python line when the venv is absent', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ workflow_python: null })
    }).system_prompt;

    expect(out).not.toContain('workflow_python=');
  });

  test('reports a skipped install on both the fact and the done list', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ node_modules: 'skipped' })
    }).system_prompt;

    expect(out).toContain('- node_modules=skipped (source=dispatch 시 npm ci)');
    expect(out).toContain('- npm ci=skipped');
  });

  test('omits both install lines when nothing was installed', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ node_modules: null })
    }).system_prompt;

    expect(out).not.toContain('node_modules=');
    expect(out).not.toContain('npm ci=');
  });

  test('omits the remote tip line on a first dispatch', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts()
    }).system_prompt;

    expect(out).not.toContain('tip=');
  });

  test('states the remote tip when a continuation observed one', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({
        remote_tip: { remote: 'upstream', branch: 'UI-1', sha: 'b'.repeat(40) }
      })
    }).system_prompt;

    expect(out).toContain(
      `- upstream/UI-1 tip=${'b'.repeat(40)} (source=git ls-remote upstream)`
    );
  });

  test('says 없음 rather than Worker when no claim was written', () => {
    const claimed = applyPreamble('작업하라', {
      attempt_facts: facts()
    }).system_prompt;
    const unclaimed = applyPreamble('작업하라', {
      attempt_facts: facts({ claimed_by_worker: false })
    }).system_prompt;

    expect(claimed).toContain('- status=in_progress(선점: Worker)');
    expect(unclaimed).toContain('- status=in_progress(선점: 없음)');
  });

  test('omits the status line when bd could not be read', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ bead_status: null })
    }).system_prompt;

    expect(out).not.toContain('- status=');
    expect(out).toContain('- session_ref 불필요');
  });

  test('names every selector input with the layer that carries it', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts()
    }).system_prompt;

    expect(out).toContain(
      '- 선택 입력: impl_runtime=claude (source=bead), impl_model=opus (source=workspace_kv), impl_effort=없음 (source=없음), impl_speed=없음 (source=없음), impl_dispatch=없음 (source=없음)'
    );
  });

  test('names the reviewer preset with its pinned digest', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts()
    }).system_prompt;

    expect(out).toContain(
      '- 리뷰어 프리셋: codex → gpt-5.6-sol/xhigh (source=핀 사본 review.reviewers, digest=abc123)'
    );
  });

  test('omits the reviewer preset line when the pin could not be read', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ reviewer_preset: null })
    }).system_prompt;

    expect(out).not.toContain('리뷰어 프리셋');
  });

  test('omits the script section when no script file was installed', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ scripts: [] })
    }).system_prompt;

    expect(out).not.toContain('스크립트 호출');
  });

  test('carries the target repo pitfalls section verbatim', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts()
    }).system_prompt;

    expect(out).toContain('### Worker pitfalls (대상 저장소 AGENTS.md)');
    expect(out).toContain('- zsh: 글롭은 따옴표');
  });

  test('omits the pitfalls section when the repo declares none', () => {
    const out = applyPreamble('작업하라', {
      attempt_facts: facts({ pitfalls: null })
    }).system_prompt;

    expect(out).not.toContain('Worker pitfalls');
  });

  test('keeps the facts card out of the read-only review shape', () => {
    const out = applyPreamble('검토하라', {
      review: true,
      attempt_facts: facts()
    }).system_prompt;

    expect(out).not.toContain('## 시도 사실');
    expect(out).toContain(REVIEW_PREAMBLE);
  });
});
