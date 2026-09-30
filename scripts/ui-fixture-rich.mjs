/**
 * The restored-surface material of the UI verification fixture (UI-dbn6
 * P1-r2): on top of the 8-repo base (`ui-fixture-data.mjs`) every surface the
 * repair round brought back is fed at least once so `ui-shots.mjs` captures
 * it — realistic long IDs, live activity and delegations on running tiles,
 * interactive sessions in each conversation state, PR rows across the status
 * badge vocabulary, 막힘 reasons, an overdue and a completed external wait, a
 * serial blocks cycle, stage documents, applied presets, and the header usage
 * meter's accounts.
 */
import { buildPipelineFixture } from './ui-fixture-data.mjs';

const MERGE_SHA = 'c'.repeat(40);

/**
 * @param {number} now
 * @param {number} ago_ms
 * @returns {string}
 */
function isoAgo(now, ago_ms) {
  return new Date(now - ago_ms).toISOString();
}

/**
 * A usage record of one attempt (tokens only; the catalog prices it).
 *
 * @param {number} scale
 * @returns {Record<string, number>}
 */
function usageOf(scale) {
  return {
    input_tokens: 1800 * scale,
    output_tokens: 620 * scale,
    cache_read_input_tokens: 42_000 * scale,
    cache_creation_input_tokens: 3_100 * scale
  };
}

/**
 * An interactive-session record (the server's `interactive_sessions` value).
 *
 * @param {string} bead_id
 * @param {number} now
 * @param {Record<string, any>} patch
 * @returns {Record<string, any>}
 */
function session(bead_id, now, patch) {
  return {
    bead_id,
    kind: 'inquiry',
    provider: 'claude',
    session_id: `sess-${bead_id}`,
    mode: 'fork',
    source: 'attempt',
    attempt_id: `${bead_id}-1700000000-1`,
    tmux_session: 'bdui',
    tmux_window: String(bead_id.length),
    state: 'live',
    settled_at: null,
    launched_at: now - 420_000,
    turn_state: 'running',
    turn_state_since: now - 140_000,
    last_message: {
      text: '재현 로그를 붙였습니다 — 다음 판단을 기다립니다',
      at: now - 90_000
    },
    discord_url: null,
    ...patch
  };
}

/**
 * One PR 대기 entry plus its observation.
 *
 * @param {Record<string, any>} row
 * @param {string} bead_id
 * @param {string} title
 * @param {Record<string, any>} gate
 * @param {Record<string, any>} [entry]
 */
function addPr(row, bead_id, title, gate, entry = {}) {
  row.pr_wait = [
    ...row.pr_wait.filter(
      (/** @type {any} */ item) => item.bead_id !== bead_id
    ),
    { bead_id, added_at: 1, ...entry }
  ];
  row.bead_titles[bead_id] = title;
  row.pr_observations[bead_id] = {
    ...(row.pr_observations[bead_id] || {}),
    pr: {
      number: 300 + bead_id.length,
      url: `https://example.test/pr/${encodeURIComponent(bead_id)}`,
      state: 'OPEN',
      head_sha: `h-${bead_id}`
    },
    gate: {
      enabled: false,
      tier: 'blocked',
      gate_badge: '관측 대기',
      base_badge: '최신',
      reason: null,
      ...gate
    }
  };
}

/**
 * A wait reason of one bead.
 *
 * @param {string} root_dir
 * @param {string} bead_id
 * @param {Record<string, any>} patch
 * @returns {Record<string, any>}
 */
function reason(root_dir, bead_id, patch) {
  return {
    subject: { bead_id, root_dir },
    targets: [],
    actions: [],
    verdict: 'normal',
    ...patch
  };
}

/**
 * Lay the restored-surface material onto a base fixture (mutates and returns
 * it). Repo order: a b c d e f g h.
 *
 * @param {ReturnType<typeof buildPipelineFixture>} fixture
 * @param {number} now
 * @returns {ReturnType<typeof buildPipelineFixture>}
 */
export function enrichFixture(fixture, now) {
  const [a, b, c, d, e, f, g, h] = fixture.workspaces;
  const states = fixture.workspaces_state;
  const attempt = (/** @type {any} */ row) =>
    row.attempts[Object.keys(row.attempts)[0]];

  // Running tiles: live activity and usage everywhere; delegations on repo-a.
  fixture.workspaces.forEach((row, index) => {
    Object.assign(attempt(row), {
      last_activity: {
        text: `Edit app/screens/pipeline/${index % 2 ? 'lanes' : 'mini-row'}.js`,
        at: now - (index + 1) * 15_000
      },
      usage: usageOf(index + 1)
    });
    row.bead_times = {
      [`${row.name.slice(-1).toUpperCase()}-6`]: {
        created_at: now - 3 * 86_400_000,
        updated_at: now - 1_900_000
      }
    };
  });
  attempt(a).legs = [
    {
      label: 'general-purpose · claude · sonnet',
      state: 'live',
      runtime: 'claude',
      model: 'sonnet',
      usage: { input_tokens: 12_400, output_tokens: 2_380 }
    },
    {
      label: 'codex · gpt-5',
      state: 'done',
      runtime: 'codex',
      model: 'gpt-5',
      native: true,
      usage: { input_tokens: 5_200, output_tokens: 840, total_tokens: 6_040 }
    }
  ];

  // Done row usage for the 레포 toolbar token total.
  a.attempts['A-6-1700000000-0'] = {
    attempt_id: 'A-6-1700000000-0',
    bead_id: 'A-6',
    status: 'done',
    started_at: now - 3_000_000,
    finished_at: now - 1_800_000,
    runner: 'claude',
    model: 'opus',
    usage: usageOf(3)
  };

  // Long IDs: a PR row, a running bead with delegations, a candidate with
  // stage documents and a PR link, a queued row waiting on its inquiry.
  addPr(
    a,
    'UI-dbn6',
    'beads-ui 프런트엔드 재작성 — 통합 파이프라인 화면과 모바일 우선',
    {
      enabled: true,
      tier: 'eligible',
      gate_badge: '머지 가능'
    }
  );
  a.merge_queue = [
    { bead_id: 'A-5', authority: { source: 'manual' } },
    { bead_id: 'UI-dbn6', authority: { source: 'manual' } }
  ];
  a.merge_queue_state = { active: 'A-5', failures: {} };
  a.pr_activity = {
    'A-5': {
      activity: null,
      merge_progress: { step: 'merging', started_at: now - 30_000 }
    }
  };
  a.lane_states = { s1: { cycle: true } };
  a.repo_operations = [
    {
      operation_id: 'deploy-a-1',
      kind: 'deploy',
      state: 'succeeded',
      target_sha: 'f36a84d7c0ffee0123456789',
      finished_at: now - 5_400_000,
      elapsed_ms: 74_000,
      subjects: []
    }
  ];
  a.wait_reasons = [
    reason(a.root_dir, 'A-2', {
      kind: 'awaiting_user',
      headline: '사람의 판단을 기다리는 질문',
      verdict: 'normal'
    })
  ];

  b.bead_titles['dotfiles-hwmfv'] =
    'dotfiles 워크플로 계약 — Worker 리뷰 영수증 정본을 한 곳으로 모으고 소비자 동기화';
  b.attempts['dotfiles-hwmfv-1700000000-1'] = {
    attempt_id: 'dotfiles-hwmfv-1700000000-1',
    bead_id: 'dotfiles-hwmfv',
    status: 'running',
    started_at: now - 2_700_000,
    runner: 'codex',
    model: 'gpt-5',
    effort: 'high',
    last_activity: {
      text: 'apply_patch docs/contracts/workflow-contract.md',
      at: now - 8_000
    },
    usage: usageOf(2),
    legs: [
      {
        label: 'reviewer · claude · opus',
        state: 'done',
        runtime: 'claude',
        model: 'opus',
        usage: { input_tokens: 8_100, output_tokens: 1_020 }
      }
    ]
  };
  b.external_waits[0].next_observation_at = isoAgo(now, 600_000);
  Object.assign(b.wait_reasons[0], {
    verdict: 'overdue',
    since: now - 5_400_000,
    verdict_reason: {
      code: 'observation_overdue',
      message: '관찰 예정 10분 지남'
    }
  });
  b.session_active = [
    {
      bead_id: 'B-9',
      title: '세션이 직접 잡은 이슈 — 설정 탭 목적별 정리',
      status: 'in_progress',
      started_at: now - 1_200_000,
      updated_at: now - 60_000,
      labels: ['frontend'],
      session_refs: [
        {
          provider: 'claude',
          session_id: 'sess-b9-direct',
          host: 'studio',
          locality: 'local',
          current: true,
          last_event_at: now - 45_000
        }
      ]
    }
  ];
  b.auto_merge = true;
  states[1].auto_merge = true;
  states[1].counts = { ...states[1].counts, session_active: 1 };

  // 막힘: an action-required recovery and a provider hold in repo-c.
  c.runnable[0] = {
    ...c.runnable[0],
    bead_id: 'beads-ui-7xrf',
    title:
      '모니터 파이프라인 스냅샷 축소 — keyed patch 경계 재설계와 푸시 폭주 방지',
    workflow: {
      route: 'full_plan',
      stages: {
        spec: {
          fill: 'full',
          glyph: 'review',
          doc: {
            path: 'docs/superpowers/specs/2026-09-23-snapshot-shrink.md',
            missing_state: null
          }
        },
        plan: {
          fill: 'dim',
          doc: {
            path: 'docs/superpowers/plans/2026-09-30-snapshot-shrink.md',
            missing_state: 'plan_pending'
          }
        },
        impl: { fill: 'none' },
        pr: { fill: 'none' },
        merge: { fill: 'none' }
      },
      chips: { pr: { number: 341, url: 'https://example.test/pr/341' } }
    }
  };
  c.wait_reasons = [
    reason(c.root_dir, 'C-2', {
      kind: 'recovery',
      headline: '자동 재개 3회 무진전 — 사람 판단 필요',
      verdict: 'action_required',
      verdict_reason: { code: 'no_progress', message: '같은 원인으로 3회 멈춤' }
    }),
    reason(c.root_dir, 'C-3', {
      kind: 'provider_hold',
      headline: 'Claude 사용량 한도',
      since: now - 1_800_000,
      resets_at: now + 3_600_000
    })
  ];

  // repo-d: the queued long-ID row waiting on its live inquiry.
  d.queue = [{ bead_id: 'rokit-iqq', added_at: now - 1_500_000 }, ...d.queue];
  d.bead_titles['rokit-iqq'] =
    'rokit 분석 파이프라인 — 샘플 메타데이터 정규화 결과 검토';
  d.wait_reasons = [
    reason(d.root_dir, 'rokit-iqq', {
      kind: 'awaiting_user',
      headline: '정규화 기준 질문에 답 대기',
      since: now - 900_000
    })
  ];

  // Interactive sessions, one per conversation state.
  a.interactive_sessions = {
    'inq-a2': session('A-2', now, {
      discord_url: 'https://discord.test/channels/1/2'
    })
  };
  d.interactive_sessions = {
    'inq-rokit': session('rokit-iqq', now, {
      turn_state: 'question',
      mode: 'resume',
      source: 'attempt'
    })
  };
  c.interactive_sessions = {
    'inq-c2': session('C-2', now, {
      mode: 'resume',
      turn_state: 'idle',
      conversation: { processed_message_at: now - 120_000 }
    })
  };
  b.interactive_sessions = {
    'res-b4': session('B-4', now, { kind: 'resolve', turn_state: 'idle' })
  };
  e.interactive_sessions = {
    'inq-e4': session('E-4', now, { mode: 'resume', conversation: {} })
  };
  f.interactive_sessions = {
    'inq-f4': session('F-4', now, {
      mode: 'resume',
      conversation: { result: { kind: 'takeover' } }
    })
  };
  g.interactive_sessions = {
    'ext-g2': session('G-2', now, {
      kind: 'external_resume',
      source: 'recovered'
    })
  };
  h.interactive_sessions = {
    'inq-h2': session('H-2', now, { state: 'exiting', settled_at: now - 5_000 })
  };

  // PR rows across the status vocabulary.
  b.completion_status = {
    'B-5': {
      phase: 'retrying',
      auto_resolution: {
        attempts: 1,
        attempt_cap: 3,
        origin_reason: 'verify_red',
        next_at: now + 300_000,
        last_error: 'verify exit 1'
      }
    }
  };
  b.merge_queue = [{ bead_id: 'B-5', authority: { source: 'automatic' } }];
  b.merge_queue_state = { active: null, failures: {} };
  c.completion_status = {
    'C-5': {
      phase: 'needs_human',
      head_sha: 'abc1234',
      failure_stage: 'verify',
      failure_reason: 'verify_red',
      terminal_reason: 'verify_red',
      log_path: '/logs/completion/C-5.log'
    }
  };
  addPr(d, 'D-5', 'PR 대기 — base 뒤처짐 (repo-d)', { reason: 'base_behind' });
  addPr(e, 'E-5', 'PR 대기 — 리뷰 영수증 없음 (repo-e)', {
    tier: 'review',
    gate_badge: '',
    reason: 'review_receipt_missing'
  });
  // No review session runs for E-5: the only review wording in the PR lane is
  // the receipt-missing recovery hold (a running review would read as normal).
  e.external_waits = [
    {
      wait_id: 'w-e2-completed',
      root_dir: e.root_dir,
      bead_id: 'E-2',
      owner_kind: 'session',
      stage: 'completing',
      budget: { turns_total: 3, turns_used: 2 },
      registered_at: isoAgo(now, 7_200_000),
      next_observation_at: isoAgo(now, -600_000),
      error_count: 0,
      last_error: null,
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'hamilton',
          job_id: '9051',
          submitted_at: isoAgo(now, 7_000_000),
          log_path: '/logs/slurm-9051.out',
          state: 'COMPLETED',
          observed_at: isoAgo(now, 300_000),
          terminal: 'COMPLETED'
        }
      ],
      completion: { completed_at: isoAgo(now, 320_000) },
      resume: null
    }
  ];
  e.wait_reasons = [
    reason(e.root_dir, 'E-2', {
      kind: 'external_job',
      headline: 'hamilton 작업 9051 · COMPLETED',
      release: '같은 세션에서 이어가면 결과를 읽고 계속한다',
      actions: [
        {
          op: 'external_wait_resume',
          label: '[세션에서 이어가기]',
          placement: 'card',
          payload: {
            root_dir: e.root_dir,
            wait_id: 'w-e2-completed',
            mode: 'session',
            bead_id: 'E-2'
          }
        }
      ]
    })
  ];
  f.merge_queue_state = {
    active: null,
    failures: { 'F-5': 'resolution_round_cap' }
  };
  addPr(f, 'F-8', 'PR 대기 — 실행 영수증 성립 안 함 (repo-f)', {}, {});
  f.pr_observations['F-8'].receipt_check = {
    ok: false,
    probe_error: false,
    codes: ['main_receipt_unbacked', 'absent'],
    blocking_codes: ['main_receipt_unbacked'],
    badge_codes: ['absent']
  };
  addPr(
    g,
    'G-5',
    'PR 대기 — 머지 후 정리 멈춤 (repo-g)',
    { tier: 'merged', gate_badge: '머지됨' },
    { merge_sha: MERGE_SHA, cleanup_cursor: 'child_sweep' }
  );
  g.cleanup_failed = {
    'G-5': {
      step: 'child_sweep',
      reason: 'bd close 실패 — lock',
      at: now - 900_000
    }
  };
  // Merge strands (design-system round): 검증 중 (active), 배포 실패 (failed)
  // and a later cleanup step, each bound to its merged sha.
  addPr(
    b,
    'B-7',
    'PR 대기 — 머지 뒤 검증 중 (repo-b)',
    { tier: 'merged', gate_badge: '머지됨' },
    { merge_sha: MERGE_SHA, cleanup_cursor: 'repo_operations' }
  );
  b.repo_operations = [
    {
      operation_id: 'verify-b-7',
      kind: 'verify',
      state: 'running',
      requested_at: now - 90_000,
      subjects: [{ bead_id: 'B-7', merged_sha: MERGE_SHA }]
    }
  ];
  addPr(
    c,
    'C-7',
    'PR 대기 — 머지 뒤 배포 실패 (repo-c)',
    { tier: 'merged', gate_badge: '머지됨' },
    { merge_sha: MERGE_SHA, cleanup_cursor: 'repo_operations' }
  );
  c.repo_operations = [
    {
      operation_id: 'deploy-c-7',
      kind: 'deploy',
      state: 'failed',
      requested_at: now - 600_000,
      subjects: [{ bead_id: 'C-7', merged_sha: MERGE_SHA }]
    }
  ];
  c.cleanup_failed = {
    'C-7': {
      step: 'repo_operations',
      reason: 'deploy exit 1',
      at: now - 480_000
    }
  };
  // A quick_fix tile landing on its own: the same strand on the running tile.
  Object.assign(attempt(e), {
    quickfix_lane: true,
    quickfix_landing: {
      cursor: 'child_sweep',
      head_sha: MERGE_SHA,
      reason: null
    }
  });
  addPr(
    d,
    'D-7',
    'PR 대기 — 머지 뒤 브랜치 정리 중 (repo-d)',
    { tier: 'merged', gate_badge: '머지됨' },
    { merge_sha: MERGE_SHA, cleanup_cursor: 'branch_cleanup' }
  );
  addPr(
    h,
    'H-5',
    'PR 대기 — 세션이 낸 외부 PR (repo-h)',
    { base_badge: '충돌' },
    { external: true, wt_present: false }
  );

  // Held tiles: a parked one with its history and log, a recovery wait and a
  // failure whose popover offers the attempt id.
  Object.assign(attempt(g), {
    status: 'parked',
    cause: 'awaiting_user',
    finished_at: now - 700_000,
    cause_detail: {
      summary:
        '리뷰 영수증이 최종 head에 유효하지 않아 파킹했습니다 — 재리뷰 범위를 사람이 정해 주세요. '.repeat(
          4
        )
    }
  });
  g.bead_timelines = {
    'G-4': {
      events: [1, 2, 3, 4, 5].map((n) => ({
        event_id: `g4-${n}`,
        kind: 'attempt_event',
        summary: [
          '구현 시작',
          '검증 통과',
          'PR 생성',
          '리뷰 영수증 불일치',
          '파킹 — 사람 판단 대기'
        ][n - 1],
        at: now - (6 - n) * 600_000
      })),
      log_path: '/logs/attempts/G-4-1700000000-1.jsonl'
    }
  };
  Object.assign(attempt(h), {
    status: 'waiting',
    cause: 'resume_refused',
    finished_at: now - 400_000,
    cause_detail: { recovery: { reason: 'credential' } }
  });
  Object.assign(attempt(d), {
    status: 'failed',
    cause: 'session_failed:exit_1',
    finished_at: now - 200_000
  });

  // Applied presets: named, null and absent; repo-a runs automation.
  Object.assign(states[0], {
    applied_exec_preset: { id: 'p-claude', applied_at: now - 86_400_000 },
    applied_quick_fix_preset: { id: 'p-qf', applied_at: now - 86_400_000 }
  });
  Object.assign(states[1], {
    applied_exec_preset: { id: 'p-astra', applied_at: now - 3_600_000 },
    applied_quick_fix_preset: null
  });
  Object.assign(states[2], {
    applied_exec_preset: null,
    applied_quick_fix_preset: null
  });
  // Repo-strip exec line (design-system round): a runner catalog that names
  // the runners, per-repo orchestration and worker defaults, and one repo
  // without the projections (its cell draws no second line).
  const catalog = {
    runners: {
      claude: {
        models: {
          opus: { id: 'opus', efforts: ['medium', 'high', 'xhigh'] },
          sonnet: { id: 'sonnet', efforts: ['medium', 'high'] }
        }
      },
      codex: {
        models: { 'gpt-5.5': { id: 'gpt-5.5', efforts: ['high', 'xhigh'] } }
      }
    },
    model_index: { opus: 'claude', sonnet: 'claude', 'gpt-5.5': 'codex' }
  };
  Object.assign(states[0], {
    runner_catalog: catalog,
    orchestration_model: 'opus',
    orchestration_effort: 'xhigh',
    session_defaults: {
      impl_runtime: 'claude',
      impl_model: 'sonnet',
      impl_effort: 'high'
    }
  });
  Object.assign(states[1], {
    runner_catalog: catalog,
    orchestration_model: 'opus',
    orchestration_effort: 'high',
    session_defaults: {
      impl_runtime: 'codex',
      impl_model: 'gpt-5.5',
      impl_effort: 'xhigh'
    }
  });
  Object.assign(states[2], { runner_catalog: catalog });
  delete states[3].execution_defaults;
  delete states[3].runner_catalog;
  delete states[3].session_defaults;
  states[0].counts = { ...states[0].counts, running: 1 };
  return fixture;
}

/**
 * The base fixture with the restored-surface material.
 *
 * @param {{ now?: number }} [options]
 * @returns {ReturnType<typeof buildPipelineFixture>}
 */
export function buildRichFixture(options = {}) {
  const now = typeof options.now === 'number' ? options.now : Date.now();
  return enrichFixture(buildPipelineFixture({ now }), now);
}

/**
 * The impl-presets snapshot: three presets the repo strip names.
 *
 * @returns {Record<string, any>}
 */
export function presetSnapshot() {
  return {
    revision: 4,
    presets: [
      { id: 'p-claude', name: '클로드 구현', settings: {} },
      {
        id: 'p-astra',
        name: 'astra 구현 — 긴 이름의 실행 프리셋 예시',
        settings: {}
      },
      { id: 'p-qf', name: '빠른 수정', settings: {} }
    ],
    chip_bindings: {}
  };
}

/**
 * One provider's usage-meter payload: two accounts, the second near its
 * limit.
 *
 * @param {'claude'|'codex'} provider
 * @param {number} now
 * @returns {Record<string, any>}
 */
export function usageSnapshot(provider, now) {
  const reset = (/** @type {number} */ hours) =>
    new Date(now + hours * 3_600_000).toISOString();
  const windows = (/** @type {number} */ five, /** @type {number} */ week) => [
    { key: '5h', pct: five, resetsAt: reset(2) },
    { key: '7d', pct: week, resetsAt: reset(90) }
  ];
  const host = provider === 'claude' ? 'claude.test' : 'openai.test';
  return {
    available: true,
    windows: windows(38, 21),
    ageSeconds: 42,
    accounts: [
      {
        number: 1,
        email: `lab@${host}`,
        alias: provider === 'claude' ? '연구실' : 'team',
        plan: 'max',
        active: true,
        status: 'ok',
        windows: windows(38, 21),
        fetchedAt: new Date(now - 42_000).toISOString(),
        ageSeconds: 42
      },
      {
        number: 2,
        email: `personal@${host}`,
        alias: null,
        plan: 'pro',
        active: false,
        status: 'ok',
        windows: windows(93, 81),
        fetchedAt: new Date(now - 300_000).toISOString(),
        ageSeconds: 300
      }
    ]
  };
}
