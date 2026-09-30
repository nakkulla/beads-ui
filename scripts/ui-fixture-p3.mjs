/**
 * Phase 3 material of the UI verification fixture (UI-dbn6): the settings
 * reads and writes (presets with their profile, session defaults with the
 * Worker address, workspace accounts, the active-model list with its CAS and
 * refusals), the ADR snapshot, the compare snapshot and the repo-ops
 * declaration / timeline of the queue view. Everything is synthetic and
 * in-memory; nothing here reads `bd` or `~/.local/state`.
 */

const SHA = 'f36a84d7c0ffee0123456789abcdef0123456789';

/**
 * The impl-presets snapshot: general and quick_fix presets the settings bars
 * list, and one chip binding.
 *
 * @returns {Record<string, any>}
 */
export function presetSnapshotP3() {
  return {
    revision: 4,
    presets: [
      {
        id: 'p-claude',
        name: '클로드 구현',
        applies_to: 'general',
        settings: {
          orchestration_model: 'opus',
          orchestration_effort: 'xhigh',
          impl_runtime: 'claude',
          impl_model: 'sonnet',
          impl_effort: 'high'
        }
      },
      {
        id: 'p-astra',
        name: 'astra 구현 — 긴 이름의 실행 프리셋 예시',
        applies_to: 'general',
        settings: {
          orchestration_model: 'opus',
          orchestration_effort: 'high',
          impl_runtime: 'codex',
          impl_model: 'gpt-5.5',
          impl_effort: 'xhigh'
        }
      },
      {
        id: 'p-qf',
        name: '빠른 수정',
        applies_to: 'quick_fix',
        settings: {
          quick_fix_orchestration_model: 'sonnet',
          quick_fix_orchestration_effort: 'high'
        }
      }
    ],
    chip_bindings: { complex: 'p-claude' }
  };
}

/**
 * The `get-session-defaults` reply of one repo: its values, no warning, and
 * a resolved Worker address with the common default configured.
 *
 * @param {Record<string, any>|undefined} state - The repo's monitor state row.
 * @param {{ value: string, revision: string }} common
 * @returns {Record<string, any>}
 */
export function sessionDefaultsReply(state, common) {
  return {
    values: { ...(state?.session_defaults || {}) },
    warnings: [],
    worker_url: {
      status: 'ok',
      effective_url: common.value,
      source: 'common',
      common: {
        state: 'configured',
        value: common.value,
        revision: common.revision
      },
      warnings: []
    }
  };
}

/**
 * The `get-workspace-accounts` reply: a usable layer naming one account.
 *
 * @returns {Record<string, any>}
 */
export function workspaceAccountsReply() {
  return {
    state: 'usable',
    values: { claude_account: 'lab@claude.test' },
    warnings: []
  };
}

/**
 * The server-global active-model list with the store's write rules: a stale
 * `expected_revision` is `conflict`, an unknown name `unknown_model`, and a
 * runner with every model off `runner_all_disabled`.
 */
export function createModelVisibility() {
  let snapshot = {
    revision: 1,
    disabled_models: ['haiku'],
    runners: {
      claude: [
        { name: 'opus', id: 'claude-opus' },
        { name: 'sonnet', id: 'claude-sonnet' },
        { name: 'haiku', id: 'claude-haiku' }
      ],
      codex: [
        { name: 'gpt-5.5', id: 'gpt-5.5' },
        { name: 'gpt-5.5-mini', id: 'gpt-5.5-mini' }
      ]
    }
  };
  return {
    get: () => snapshot,
    /**
     * @param {Record<string, any>} payload
     * @returns {{ ok: true, snapshot: any } | { ok: false, code: string, snapshot: any }}
     */
    set(payload) {
      if (payload.expected_revision !== snapshot.revision) {
        return { ok: false, code: 'conflict', snapshot };
      }
      const disabled = Array.isArray(payload.disabled_models)
        ? payload.disabled_models.map(String)
        : [];
      const names = Object.values(snapshot.runners)
        .flat()
        .map((model) => model.name);
      if (disabled.some((name) => !names.includes(name))) {
        return { ok: false, code: 'unknown_model', snapshot };
      }
      for (const models of Object.values(snapshot.runners)) {
        if (models.every((model) => disabled.includes(model.name))) {
          return { ok: false, code: 'runner_all_disabled', snapshot };
        }
      }
      snapshot = {
        ...snapshot,
        revision: snapshot.revision + 1,
        disabled_models: disabled
      };
      return { ok: true, snapshot };
    }
  };
}

/**
 * The repo-ops decoration of a queue view: a resolved declaration (verify +
 * deploy), the workspace opt-out, and the pinned automation policy lists.
 *
 * @param {Record<string, any>} view - `queueViewOf(row, state)`.
 * @param {Record<string, any>} row
 * @returns {Record<string, any>}
 */
export function withRepoOps(view, row) {
  return {
    ...view,
    repo_operations: row.repo_operations || [],
    cleanup_failed: row.cleanup_failed || {},
    workspace_info: {
      ...view.workspace_info,
      repo_ops: {
        status: 'resolved',
        repo_id: row.root_dir,
        source_path: 'repo-ops/config.toml',
        base_ref: 'main',
        base_sha: SHA,
        verify: { script: 'repo-ops/script/verify', timeout_ms: 1_200_000 },
        deploy: { script: 'repo-ops/script/deploy', timeout_ms: 600_000 }
      }
    },
    // repo-d skips its deploy in this workspace (the skipped lane look)
    repo_ops_opt_out: { verify: false, deploy: row.root_dir.endsWith('-d') },
    repo_operation_policy: {
      supported: true,
      schema_version: 3,
      worker_automatic: [
        'owned_deploy_worktree_fetch_detached_alignment_recreate',
        'recovered_pre_execution_fetch_timeout_retry_once',
        'repo_serial_lock_wait',
        'restart_operation_adoption'
      ],
      never_automatic: [
        'baseline_failure_ignore',
        'credential_entry',
        'destructive_action',
        'history_rewrite'
      ]
    }
  };
}

/**
 * More repo-c operations for the timeline drawer: a passed verify, a manual
 * deploy, a post-merge job, and a failed deploy with its log and output.
 *
 * @param {Record<string, any>} fixture
 * @param {number} now
 */
export function enrichRepoOps(fixture, now) {
  const c = fixture.workspaces.find((row) =>
    String(row.root_dir).endsWith('/repo-c')
  );
  if (!c) {
    return;
  }
  const failed = (c.repo_operations || []).find(
    (op) => op.operation_id === 'deploy-c-7'
  );
  if (failed) {
    Object.assign(failed, {
      target_base: 'main',
      target_sha: SHA,
      finished_at: now - 540_000,
      elapsed_ms: 58_000,
      failure: { code: 'deploy_script_failure' },
      failure_kind: 'script',
      exit_code: 1,
      script_path: 'repo-ops/script/deploy',
      script_blob_sha: '9a0b1c2d3e4f5061728394a5b6c7d8e9f0a1b2c3',
      log_path:
        '/Users/fixture/.local/state/bdui/repo-c/repo-ops/deploy-c-7/verify-and-deploy-output.log',
      output_tail:
        'npm ERR! code ELIFECYCLE\nnpm ERR! bdui-shared restart exited 1'
    });
  }
  c.repo_operations = [
    ...(c.repo_operations || []),
    {
      operation_id: 'verify-c-6',
      kind: 'verify',
      state: 'succeeded',
      target_base: 'main',
      target_sha: SHA,
      requested_at: now - 1_900_000,
      finished_at: now - 1_800_000,
      elapsed_ms: 96_000,
      subjects: []
    },
    {
      operation_id: 'deploy-c-5',
      kind: 'deploy',
      state: 'succeeded',
      source: 'manual',
      target_base: 'main',
      target_sha: SHA,
      requested_at: now - 7_300_000,
      finished_at: now - 7_200_000,
      elapsed_ms: 71_000,
      subjects: []
    },
    {
      operation_id: 'job-c-5',
      kind: 'job',
      state: 'succeeded',
      script_path: 'repo-ops/post-merge.d/10-refresh-index',
      target_base: 'main',
      target_sha: SHA,
      requested_at: now - 7_100_000,
      finished_at: now - 7_050_000,
      elapsed_ms: 12_000,
      subjects: []
    }
  ];
}

/**
 * @param {number|string} id
 * @param {Record<string, any>} [extra]
 */
function adr(id, extra = {}) {
  const num = typeof id === 'number' ? String(id).padStart(4, '0') : id;
  return {
    file: `${num}-decision.md`,
    id,
    title: `결정 ${id}`,
    status: 'accepted',
    date: '2026-09-01',
    summary: '',
    supersedes: [],
    superseded_by: null,
    superseded_by_note: null,
    spec: null,
    bead: null,
    ...extra
  };
}

/**
 * The `adr-snapshot` workspaces of the first repos: a rich repo with signals
 * of every kind, a clean one, a computing one with an environment error, and
 * one without `docs/adr`.
 *
 * @param {Array<{ root_dir: string, name: string }>} workspaces
 * @param {number} now
 * @returns {{ workspaces: any[] }}
 */
export function adrSnapshot(workspaces, now) {
  const [a, b, c, d] = workspaces;
  /** @type {any[]} */
  const views = [];
  if (a) {
    views.push({
      root_dir: a.root_dir,
      name: a.name,
      name_duplicate: false,
      computing: false,
      computed_at: now - 120_000,
      env_errors: { index: null, citations: null, candidates: null },
      adr_dir_missing: false,
      current: [
        adr('UI-nuwy', {
          title: '같은 Worker 세션 대화와 무인 복귀',
          summary:
            'fork 문의를 은퇴하고 인계 뒤 같은 세션을 재개하며 단계별로 알립니다',
          date: '2026-09-28',
          spec: 'docs/superpowers/specs/2026-09-26-same-session-conversation-design.md',
          bead: 'UI-nuwy'
        }),
        adr('UI-ooc0', {
          title: '활성 모델은 서버 전역 목록 하나',
          summary:
            '선택 목록은 서버 전역 활성 모델 필터를 거치고 편집 위치는 일괄 창의 전역 탭 하나',
          date: '2026-09-20',
          bead: 'UI-ooc0'
        }),
        adr('UI-u6ud-5', {
          title: '배포 선언은 핀된 base의 repo-ops 설정',
          summary:
            '배포 명령과 실패 사다리는 dotfiles 정본을 핀 사본으로 읽습니다',
          date: '2026-08-19'
        }),
        adr(12, {
          title: '데이터 계층은 bd CLI shell-out',
          summary: '구독별 store는 전체 issue push를 받아 내용 변경만 통지한다',
          date: '2026-06-02'
        })
      ],
      history: [
        adr('UI-ri8n', {
          title: '문의 세션 fork 방식',
          status: 'superseded',
          superseded_by: 'UI-nuwy',
          date: '2026-09-10'
        }),
        adr(9, {
          title: '구 모니터 탭 3열 격자',
          status: 'superseded',
          superseded_by: 12,
          date: '2026-05-01'
        })
      ],
      frontmatter_errors: [
        { file: '0009-decision.md', error: 'date 형식이 YYYY-MM-DD가 아님' }
      ],
      index_drift: { ok: false, detail: 'README 색인에 UI-ooc0 줄이 없습니다' },
      citations_stale: [
        {
          kind: 'retired',
          file: 'AGENTS.md',
          line: 14,
          adr: 'UI-u6ud-5',
          detail: '대체된 ADR을 현재 결정으로 인용'
        },
        {
          kind: 'missing',
          file: 'docs/agents/policy.md',
          line: 3,
          adr: 99,
          detail: '없는 ADR 번호'
        }
      ],
      candidates: [
        {
          spec: 'docs/superpowers/specs/2026-09-23-frontend-rewrite-unified-pipeline-design.md',
          ok: false,
          errors: [
            {
              kind: 'adr_missing',
              file: '2026-09-23-frontend-rewrite-unified-pipeline-design.md',
              line: 498,
              adr: null,
              detail: '후보 1의 ADR이 아직 없습니다'
            }
          ]
        },
        {
          spec: 'docs/superpowers/specs/2026-09-29-transcript-drawer-conversation-view-design.md',
          ok: false,
          errors: [
            {
              kind: 'section_missing',
              file: 'x.md',
              line: null,
              adr: null,
              detail: ''
            }
          ]
        }
      ],
      cross_citations: [
        {
          file: 'docs/adr/0012-decision.md',
          line: 22,
          repo: 'dotfiles',
          adr: 45,
          target: { root_dir: '/fixture/dotfiles', status: 'accepted' }
        }
      ]
    });
  }
  if (b) {
    views.push({
      root_dir: b.root_dir,
      name: b.name,
      computing: false,
      computed_at: now - 300_000,
      env_errors: { index: null, citations: null, candidates: null },
      adr_dir_missing: false,
      current: [
        adr(3, {
          title: '작업 트리 이름은 브랜치와 같다',
          summary: 'Bead 작업은 Bead ID, 그 밖은 소문자 kebab slug',
          date: '2026-07-11'
        })
      ],
      history: [],
      frontmatter_errors: [],
      index_drift: { ok: true, detail: null },
      citations_stale: [],
      candidates: [],
      cross_citations: []
    });
  }
  if (c) {
    views.push({
      root_dir: c.root_dir,
      name: c.name,
      computing: true,
      computed_at: null,
      env_errors: {
        index: null,
        citations: 'adr-cite-check.py: python3을 찾지 못했습니다',
        candidates: null
      },
      adr_dir_missing: false,
      current: [adr(1, { title: '첫 결정', summary: '', date: '2026-01-02' })],
      history: [],
      frontmatter_errors: [],
      index_drift: { ok: true, detail: null },
      citations_stale: [],
      candidates: [],
      cross_citations: []
    });
  }
  if (d) {
    views.push({
      root_dir: d.root_dir,
      name: d.name,
      computing: false,
      computed_at: now - 600_000,
      env_errors: { index: null, citations: null, candidates: null },
      adr_dir_missing: true,
      current: [],
      history: [],
      frontmatter_errors: [],
      index_drift: null,
      citations_stale: [],
      candidates: [],
      cross_citations: []
    });
  }
  return { workspaces: views };
}

/**
 * @param {Record<string, any>} over
 */
function group(over) {
  return {
    badge: 'preset',
    n: 12,
    issue_count: 10,
    landed: 9,
    judged: 11,
    in_flight: 1,
    landing_rate: 9 / 11,
    problem_count: 3,
    problem_rate: 0.25,
    problems: {
      failed: 1,
      retry: 1,
      review: 1,
      human: 0,
      verify: 0,
      duration: 1,
      cost: 0,
      pin: 1
    },
    duration_ms: { mean: 2_280_000, median: 1_900_000, sample: 12, total: 12 },
    cost_usd: {
      mean: 1.84,
      median: 1.4,
      sample: 11,
      total: 12,
      partial_count: 1
    },
    compositions: [
      { composition: 'claude-opus/xhigh → sonnet/high', count: 12 }
    ],
    best: [],
    attempt_ids: [],
    ...over
  };
}

/**
 * The `get-compare` reply: a summary, four groups (preset groups with best
 * markers, an unmatched one), their session rows and the effective criteria.
 * `runs` and `bench_rows` carry material the screen must NOT read.
 *
 * @param {Record<string, any>} request
 * @param {Array<{ root_dir: string, name: string }>} workspaces
 * @param {number} now
 * @param {Record<string, any>} default_criteria
 * @returns {Record<string, any>}
 */
export function compareSnapshot(request, workspaces, now, default_criteria) {
  const [a, b] = workspaces;
  /**
   * @param {string} attempt_id
   * @param {Record<string, any>} over
   */
  const row = (attempt_id, over) => ({
    attempt_id,
    bead_id: 'A-1',
    title: '세션 제목',
    root_dir: a?.root_dir,
    workspace_name: a?.name,
    outcome: {
      kind: 'landed',
      evidence: 'closed',
      pr_url: 'https://github.com/x/y/pull/301'
    },
    verify: 'pass',
    duration_ms: 1_800_000,
    finished_at: now - 3_600_000,
    usage: { total_cost_usd: 1.62, tokens: { input: 120_000, output: 22_000 } },
    composition: 'claude-opus/xhigh → sonnet/high',
    problems: {
      failed: false,
      retry: false,
      review: false,
      human: false,
      verify: false,
      duration: false,
      cost: false,
      pin: false,
      evidence: {}
    },
    preset: { deviated_keys: [] },
    ...over
  });
  const rows = [
    row('att-1', {
      bead_id: 'A-11',
      title: '후보 2 — 설정 탭 목적별 정리 (repo-a)'
    }),
    row('att-2', {
      bead_id: 'A-12',
      title:
        '긴 제목의 세션 — 리뷰 두 번과 핀 조정이 있었던 실행 중 하나의 예시',
      problems: {
        failed: false,
        retry: true,
        review: true,
        human: false,
        verify: false,
        duration: true,
        cost: false,
        pin: true,
        evidence: {
          retry: { origin: 'att-1', kind: 'resume', cause: null, env: false },
          review: { round: 2, blocking: 1, minor: 3 },
          duration: { value_ms: 5_400_000, baseline_ms: 1_900_000, factor: 2 }
        }
      },
      preset: { deviated_keys: ['impl_effort'] }
    }),
    row('att-3', {
      bead_id: 'B-3',
      title: 'repo-b 세션',
      root_dir: b?.root_dir,
      workspace_name: b?.name,
      outcome: { kind: 'failed' },
      verify: 'fail',
      problems: {
        failed: true,
        retry: false,
        review: false,
        human: true,
        verify: true,
        duration: false,
        cost: false,
        pin: false,
        evidence: {
          failed: 'session_failed:exit_1',
          human: ['승인 대기'],
          verify: 'merge_verify'
        }
      }
    }),
    row('att-4', {
      bead_id: 'B-4',
      root_dir: b?.root_dir,
      workspace_name: b?.name,
      title: '미대조 세션',
      preset_candidates: ['p-claude', 'p-astra']
    })
  ];
  const groups = [
    group({
      key: 'preset:p-claude',
      name: '클로드 구현',
      best: ['landing', 'duration'],
      attempt_ids: ['att-1', 'att-2']
    }),
    group({
      key: 'preset:p-astra',
      name: 'astra 구현 — 긴 이름의 실행 프리셋 예시',
      n: 8,
      issue_count: 7,
      landed: 5,
      judged: 7,
      landing_rate: 5 / 7,
      problem_count: 3,
      problem_rate: 0.375,
      duration_ms: { mean: 3_060_000, median: 2_700_000, sample: 8, total: 8 },
      cost_usd: {
        mean: 0.96,
        median: 0.88,
        sample: 8,
        total: 8,
        partial_count: 0
      },
      compositions: [
        { composition: 'claude-opus/high → gpt-5.5/xhigh', count: 6 },
        { composition: 'claude-opus/high → main 직접', count: 2 }
      ],
      best: ['cost'],
      attempt_ids: ['att-3']
    }),
    group({
      key: 'preset:p-qf',
      name: '빠른 수정',
      n: 5,
      issue_count: 5,
      landed: 5,
      judged: 5,
      in_flight: 0,
      landing_rate: 1,
      problem_count: 0,
      problem_rate: 0,
      problems: {},
      duration_ms: { mean: 720_000, median: 600_000, sample: 5, total: 5 },
      cost_usd: {
        mean: 0.21,
        median: 0.2,
        sample: 5,
        total: 5,
        partial_count: 0
      },
      compositions: [{ composition: 'sonnet/high → main 직접', count: 5 }],
      attempt_ids: []
    }),
    group({
      key: 'unmatched',
      name: '프리셋 미확정',
      badge: 'unmatched',
      n: 2,
      issue_count: 2,
      landed: 1,
      judged: 2,
      landing_rate: 0.5,
      problem_count: 1,
      problem_rate: 0.5,
      compositions: [],
      attempt_ids: ['att-4']
    })
  ];
  return {
    summary: group({
      key: 'summary',
      name: '전체',
      n: 27,
      issue_count: 24,
      landed: 20,
      judged: 25,
      in_flight: 2,
      landing_rate: 0.8,
      problem_count: 7,
      problem_rate: 7 / 27
    }),
    groups,
    rows,
    workspaces: workspaces.map((w) => ({ root_dir: w.root_dir, name: w.name })),
    warnings: [],
    criteria: {
      effective: request.problem_criteria
        ? { ...default_criteria, ...request.problem_criteria }
        : default_criteria,
      is_default: !request.problem_criteria,
      baselines: {
        duration_ms: { median: 1_900_000, sample: 25, active: true },
        cost_usd: { median: 1.4, sample: 24, active: true, partial_count: 1 }
      }
    },
    // Experiment material the screen must never read (spec §3.9).
    runs: [{ run_id: 'bench-should-not-show', presets: [], cells: [] }],
    bench_rows: [
      { attempt_id: 'bench-row-should-not-show', bead_id: 'BENCH-1' }
    ]
  };
}
