import { describe, expect, test, vi } from 'vitest';
import { createExternalJobObservations } from './external-job-observations.js';

/** @param {Record<string, any>} [gate_patch] */
function snapshot(gate_patch = {}) {
  const gate = {
    id: 'Analysis-ph3a',
    title: '외부 계산 246416',
    issue_type: 'gate',
    await_id: 'a'.repeat(24),
    await_type: 'human',
    status: 'open',
    ...gate_patch
  };
  const consumer = {
    id: 'Analysis-xz9d',
    title: 'microbiome_bile',
    status: 'in_progress'
  };
  return {
    all: [consumer, gate],
    id_index: new Map([
      [gate.id, gate],
      [consumer.id, consumer]
    ]),
    blocks_in: new Map([[gate.id, [consumer.id]]])
  };
}

function watch(patch = {}) {
  return {
    schema: 'external-job-monitor-v1',
    watch_id: 'a'.repeat(24),
    repo: '/repos/project/.worktrees/job',
    gate_id: 'Analysis-ph3a',
    consumer: 'Analysis-xz9d',
    job_id: '246416',
    stage: 'active',
    observation_state: 'PENDING',
    last_observed_at: '2026-09-15T00:54:00Z',
    next_observation_at: '2026-09-15T01:09:00Z',
    ...patch
  };
}

/**
 * @param {Record<string, any>} watch_value
 * @param {Record<string, any>} [options]
 */
function collector(watch_value, options = {}) {
  const io = {
    readdir: vi.fn(async () => [`${watch_value.watch_id}.json`]),
    readFile: vi.fn(
      async (/** @type {string} */ file, /** @type {string} */ encoding) => {
        void file;
        void encoding;
        return JSON.stringify(watch_value);
      }
    )
  };
  const run = vi.fn(async (file, args) => {
    if (file === 'bead-job-monitor') {
      return {
        stdout: JSON.stringify({
          ok: true,
          schema: 'external-job-monitor-service-v1',
          loaded: true,
          command_matches: true,
          loaded_matches_plist: true,
          executable_exists: true,
          loaded_state: 'not running',
          last_tick: { exit_code: 0, skipped: true }
        })
      };
    }
    const repo = args[1];
    if (repo === '/repos/project' || repo === '/repos/project/.worktrees/job') {
      return { stdout: '/repos/project/.git\n' };
    }
    return { stdout: '/repos/other/.git\n' };
  });
  return {
    observations: createExternalJobObservations({
      state_root: '/state',
      now: () => Date.parse('2026-09-15T01:00:00Z'),
      fs: io,
      run,
      ...options
    }),
    run,
    io
  };
}

describe('external job observations', () => {
  test('orders complete workspace names before consumer identifiers', async () => {
    const { observations } = collector(watch());

    await observations.collect([
      { root_dir: '/repos/project-copy', name: 'aa', snapshot: snapshot() },
      { root_dir: '/repos/project', name: 'a', snapshot: snapshot() }
    ]);

    expect(observations.get().rows.map((row) => row.workspace_name)).toEqual([
      'a',
      'aa'
    ]);
  });

  test('maps a worktree watch through the actual git common directory', async () => {
    const { observations, run } = collector(watch());

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() },
      { root_dir: '/repos/project-copy', name: 'copy', snapshot: snapshot() }
    ]);

    expect(observations.get().rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gate_id: 'Analysis-ph3a',
          consumer_id: 'Analysis-xz9d',
          job_state: '실행 대기',
          monitor_state: '자동 확인 중',
          root_dir: '/repos/project'
        })
      ])
    );
    expect(observations.get().rows).toContainEqual(
      expect.objectContaining({
        root_dir: '/repos/project-copy',
        monitor_state: '감시 정보 없음',
        watch_id: null
      })
    );
    expect(run).toHaveBeenCalledWith(
      'bead-job-monitor',
      ['show', '--service'],
      expect.any(Object)
    );
  });

  test('keeps a native open gate visible when no watch can be verified', async () => {
    const { observations } = collector(
      watch({ await_id: 'wrong', repo: '/repos/other' })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows).toEqual([
      expect.objectContaining({
        gate_id: 'Analysis-ph3a',
        monitor_state: '감시 정보 없음',
        watch_id: null
      })
    ]);
  });

  test('marks a same-repository watch with a wrong native relation for review', async () => {
    const { observations } = collector(watch());

    await observations.collect([
      {
        root_dir: '/repos/project',
        name: 'project',
        snapshot: snapshot({ await_id: 'wrong' })
      }
    ]);

    expect(observations.get().rows).toEqual([
      expect.objectContaining({
        gate_id: 'Analysis-ph3a',
        monitor_state: '감시 확인 필요',
        monitor_reason: '감시 기록 연결을 확인할 수 없음',
        watch_id: null
      })
    ]);
  });

  test('separates failed observation from the previous scheduler state', async () => {
    const { observations } = collector(
      watch({ last_error: 'ssh timeout', next_observation_at: null })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      job_state: '계산 상태 확인 필요',
      previous_job_state: '이전 관측: 실행 대기',
      monitor_state: '감시 확인 필요',
      monitor_reason: '원격 작업 확인 시간 초과'
    });
  });

  test('redacts a command-bearing timeout from the serialized wire row', async () => {
    const secret_host = 'private-cluster.internal';
    const secret_command = `ssh -o BatchMode=yes ${secret_host} squeue --job 246416`;
    const { observations } = collector(
      watch({
        last_error: `TimeoutExpired: Command '${secret_command}' timed out after 45 seconds`
      })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);
    const wire = JSON.stringify(observations.get().rows);

    expect(wire).toContain('원격 작업 확인 시간 초과');
    expect(wire).not.toContain(secret_host);
    expect(wire).not.toContain(secret_command);
    expect(wire).not.toContain('BatchMode');
  });

  test('marks an overdue active observation without calling the job failed', async () => {
    const { observations } = collector(
      watch({ next_observation_at: '2026-09-15T00:59:00Z' })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      job_state: '실행 대기',
      monitor_state: '확인 예정 시각 지남',
      overdue: true
    });
  });

  test('marks an unknown stage and its overdue schedule for review', async () => {
    const { observations } = collector(
      watch({ stage: undefined, next_observation_at: '2026-09-15T00:59:00Z' })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      monitor_state: '감시 확인 필요',
      monitor_reason: '지원하지 않는 감시 단계',
      overdue: true
    });
  });

  test('does not claim automatic monitoring without an actual observation', async () => {
    const { observations } = collector(
      watch({ last_observed_at: null, observation_state: 'PENDING' })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      monitor_state: '감시 확인 필요',
      monitor_reason: '최근 작업 관측이 없음'
    });
  });

  test('keeps registration meaning while applying overdue semantics', async () => {
    const { observations } = collector(
      watch({ stage: 'preparing', next_observation_at: '2026-09-15T00:59:00Z' })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      monitor_state: '감시 등록 확인 필요',
      monitor_reason: '확인 예정 시각 지남',
      overdue: true
    });
  });

  test('shows a service probe failure separately from the job state', async () => {
    const { observations } = collector(watch(), {
      run: async (/** @type {string} */ file) =>
        file === 'bead-job-monitor'
          ? {
              stdout: JSON.stringify({
                ok: true,
                schema: 'external-job-monitor-service-v1',
                loaded: false,
                probe_error: 'launchctl read failed'
              })
            }
          : { stdout: '/repos/project/.git\n' }
    });

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      job_state: '실행 대기',
      monitor_state: '감시 확인 필요',
      monitor_reason: '자동 확인 실패'
    });
  });

  test('keeps valid observations when another watch file is corrupt', async () => {
    const { observations, io } = collector(watch());
    io.readdir.mockResolvedValue([
      'aaaaaaaaaaaaaaaaaaaaaaaa.json',
      'corrupt.json'
    ]);
    io.readFile.mockImplementation(async (/** @type {string} */ file) =>
      String(file).endsWith('corrupt.json') ? '{' : JSON.stringify(watch())
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows).toEqual([
      expect.objectContaining({
        gate_id: 'Analysis-ph3a',
        watch_id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
        monitor_state: '자동 확인 중'
      })
    ]);
  });

  test.each([
    [{ observation_state: 'RUNNING' }, {}, '계산 중', '자동 확인 중'],
    [
      { observation_state: 'UNKNOWN' },
      {},
      '계산 상태 확인 필요',
      '감시 확인 필요'
    ],
    [{ stage: 'preparing' }, {}, '실행 대기', '감시 등록 확인 필요'],
    [
      { stage: 'terminal_recorded', terminal_evidence: { source: 'scontrol' } },
      {},
      '종료 확인 · 결과 검증 필요',
      '종료 확인 · 대기 해제 확인 중'
    ],
    [{ stage: 'stopped' }, {}, '실행 대기', '자동 확인 중지'],
    [
      { stage: 'complete', completed_at: '2026-09-15T00:59:00Z' },
      { status: 'closed', closed_at: '2026-09-15T00:59:00Z' },
      '종료 확인 · 결과 검증 필요',
      '감시 종료'
    ],
    [
      {
        terminal_evidence: { source: 'log' },
        recovery_needed: true,
        exit_code: 1
      },
      {},
      '종료 확인 · 조치 필요',
      '자동 확인 중'
    ]
  ])(
    'projects job and monitor state independently (%#)',
    async (watch_patch, gate_patch, job_state, monitor_state) => {
      const { observations } = collector(watch(watch_patch));

      await observations.collect([
        {
          root_dir: '/repos/project',
          name: 'project',
          snapshot: snapshot(gate_patch)
        }
      ]);

      expect(observations.get().rows[0]).toMatchObject({
        job_state,
        monitor_state
      });
    }
  );

  test('shares concurrent collection and preserves stale rows after failure', async () => {
    const { observations, io } = collector(watch());
    const workspaces = [
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ];
    const first = observations.collect(workspaces);
    const second = observations.collect(workspaces);

    expect(second).toBe(first);
    await first;
    io.readdir.mockRejectedValueOnce(new Error('unreadable'));

    await observations.collect(workspaces);

    expect(observations.get()).toMatchObject({
      stale: true,
      rows: [
        expect.objectContaining({
          gate_id: 'Analysis-ph3a',
          monitor_state: '감시 확인 필요',
          monitor_reason: '감시 기록 디렉터리를 읽을 수 없음'
        })
      ]
    });

    await observations.collect(workspaces);

    expect(observations.get()).toMatchObject({
      stale: false,
      rows: [expect.objectContaining({ monitor_state: '자동 확인 중' })]
    });
  });

  test('gives an explicitly stopped producer record terminal monitor priority', async () => {
    const { observations } = collector(
      watch({
        stage: 'stopped',
        last_error: 'monitoring stopped explicitly; remote job unchanged',
        next_observation_at: '2026-09-15T00:00:00Z'
      })
    );

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      monitor_state: '자동 확인 중지',
      monitor_reason: null,
      next_observation_at: null,
      overdue: false
    });
  });

  test('keeps a closed unfinished watch visible as a native state mismatch', async () => {
    const { observations } = collector(watch({ stage: 'active' }));

    await observations.collect([
      {
        root_dir: '/repos/project',
        name: 'project',
        snapshot: snapshot({ status: 'closed' })
      }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      gate_open: false,
      monitor_state: '감시 기록과 대기 상태 확인 필요',
      recent_complete: false
    });
  });

  test('projects a gate-only row when no consumer edge exists', async () => {
    const gate_only = snapshot();
    gate_only.blocks_in = new Map();
    const { observations } = collector(watch({ repo: '/repos/other' }));

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: gate_only }
    ]);

    expect(observations.get().rows).toEqual([
      expect.objectContaining({
        gate_id: 'Analysis-ph3a',
        consumer_id: null,
        watch_id: null,
        job_state: '대기 조건'
      })
    ]);
  });

  test('retains prior workspace rows when its next snapshot fails', async () => {
    const { observations } = collector(watch());
    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: null }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      gate_id: 'Analysis-ph3a',
      stale: true,
      monitor_state: '감시 확인 필요',
      monitor_reason: '이슈 스냅샷을 읽을 수 없음'
    });
  });

  test('reconciles a native close when the watch directory read fails', async () => {
    const { observations, io } = collector(watch());
    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);
    io.readdir.mockRejectedValueOnce(new Error('unreadable'));

    await observations.collect([
      {
        root_dir: '/repos/project',
        name: 'project',
        snapshot: snapshot({ status: 'closed' })
      }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      gate_open: false,
      stale: true,
      monitor_state: '감시 기록과 대기 상태 확인 필요',
      next_observation_at: null
    });
  });

  test('drops cached automatic identity when the native await binding changes', async () => {
    const { observations, io } = collector(watch());
    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);
    io.readdir.mockRejectedValueOnce(new Error('unreadable'));

    await observations.collect([
      {
        root_dir: '/repos/project',
        name: 'project',
        snapshot: snapshot({ await_id: 'b'.repeat(24) })
      }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      watch_id: null,
      monitor_state: '감시 확인 필요'
    });
  });

  test('aborts owned service reads when the collector is cleared', async () => {
    /** @type {AbortSignal|undefined} */
    let captured_signal;
    const { observations } = collector(watch(), {
      run: (
        /** @type {string} */ file,
        /** @type {string[]} */ _args,
        /** @type {Record<string, any>} */ options
      ) => {
        captured_signal = options.signal;
        return file === 'bead-job-monitor'
          ? new Promise(() => {})
          : Promise.resolve({ stdout: '/repos/project/.git\n' });
      }
    });
    void observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    observations.clear();

    expect(
      /** @type {AbortSignal|undefined} */ (captured_signal)?.aborted
    ).toBe(true);
    expect(observations.get().rows).toEqual([]);
  });

  test('keeps recent completed history terminal despite old errors', async () => {
    const { observations } = collector(
      watch({
        stage: 'complete',
        completed_at: '2026-09-15T00:59:00Z',
        last_error: 'old probe error',
        next_observation_at: '2026-09-15T00:00:00Z'
      }),
      {
        run: async (/** @type {string} */ file) =>
          file === 'bead-job-monitor'
            ? { stdout: JSON.stringify({ ok: false, error: 'offline' }) }
            : { stdout: '/repos/project/.git\n' }
      }
    );

    await observations.collect([
      {
        root_dir: '/repos/project',
        name: 'project',
        snapshot: snapshot({
          status: 'closed',
          closed_at: '2026-09-15T00:59:00Z'
        })
      }
    ]);

    expect(observations.get().rows[0]).toMatchObject({
      recent_complete: true,
      monitor_state: '감시 종료',
      next_observation_at: null,
      overdue: false
    });
  });

  test('drops completed history after seven days', async () => {
    const { observations } = collector(
      watch({
        stage: 'complete',
        completed_at: '2026-09-07T00:59:00Z'
      })
    );

    await observations.collect([
      {
        root_dir: '/repos/project',
        name: 'project',
        snapshot: snapshot({
          status: 'closed',
          closed_at: '2026-09-07T00:59:00Z'
        })
      }
    ]);

    expect(observations.get().rows).toEqual([]);
  });

  test('projects an open gate as loading before the first collection settles', async () => {
    /** @type {(value: { stdout: string }) => void} */
    let finish_service = () => {};
    const { observations } = collector(watch(), {
      run: (/** @type {string} */ file) => {
        if (file === 'bead-job-monitor') {
          return new Promise((resolve) => (finish_service = resolve));
        }
        return Promise.resolve({ stdout: '/repos/project/.git\n' });
      }
    });

    const pending = observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get()).toMatchObject({
      loading: true,
      rows: [
        expect.objectContaining({
          gate_id: 'Analysis-ph3a',
          monitor_state: '감시 정보 조회 중'
        })
      ]
    });

    finish_service({
      stdout: JSON.stringify({
        ok: true,
        schema: 'external-job-monitor-service-v1',
        loaded: true,
        command_matches: true,
        loaded_matches_plist: true,
        executable_exists: true
      })
    });
    await pending;
  });

  test('replaces initial loading with an explicit collection error', async () => {
    const { observations, io } = collector(watch());
    io.readdir.mockRejectedValue(new Error('unreadable'));

    await observations.collect([
      { root_dir: '/repos/project', name: 'project', snapshot: snapshot() }
    ]);

    expect(observations.get()).toMatchObject({
      loading: false,
      stale: false,
      rows: [
        expect.objectContaining({
          monitor_state: '감시 확인 필요',
          monitor_reason: '감시 기록 디렉터리를 읽을 수 없음'
        })
      ]
    });
  });
});
