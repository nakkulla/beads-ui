# Worker Jobs Durable Backend Implementation Plan

Parent bead: UI-qclw

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the in-memory Worker job manager with a durable repo-local
supervisor + SQLite backend so Worker UI can survive server restarts, show
current/recent jobs, expose elapsed time and log preview, and support the shared
cancel policy.

**Architecture:** Keep `beads-ui` as the UI-facing API server, but move job
ownership into a repo-local companion supervisor rooted under
`.bdui/worker-jobs/`. The server talks to that supervisor through a local HTTP
client, the supervisor persists job rows/events in SQLite plus log files, and
the browser keeps using polling against `beads-ui` routes so the existing Worker
route structure stays intact.

**Tech Stack:** Node.js, Express, `node:sqlite`, detached child processes,
lit-html, vitest, Beads (`bd`)

**Spec:** `docs/superpowers/specs/2026-04-17-worker-job-backend-design.md`

---

## Working Context

- execution repo root: 현재 작업 디렉터리 (`beads-ui`)
- parent bead: `UI-qclw`
- canonical workspace branch: `ui-qclw-worker-jobs-durable-backend`
- 구현 범위는 **repo-local durable worker backend + Worker UI integration**

### 이번 런에 포함하는 범위

- `.bdui/worker-jobs/` state path helpers와 `.gitignore` 보강
- SQLite jobs/job_events schema와 durable log path 관리
- repo-local supervisor bootstrap/health/reconcile/cancel orchestration
- `beads-ui` worker routes의 create/list/detail/cancel/log API 확장
- Worker row/detail/current-recent jobs/log preview/cancel UX 연결
- 서버 재시작 이후 active job 추적 회귀 테스트

### 이번 런에서 의도적으로 제외하는 범위

- machine reboot 이후 자동 resume 보장
- websocket/SSE push 도입
- retry button / retry policy
- full transcript viewer
- optional `tmux` attach/debug layer
- workflow-specific cancel hook (`bd-ralph-v2` 전용 cleanup orchestration)

## File Structure

| Action | File                                           | Responsibility                                                                       |
| ------ | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Modify | `.gitignore`                                   | `.bdui/worker-jobs/` repo-local runtime/state ignore                                 |
| Create | `server/worker/state-paths.js`                 | `.bdui/worker-jobs/` 하위 DB/log/runtime/lock 경로 계산                              |
| Create | `server/worker/state-paths.test.js`            | repo root/workspace 기준 state path 회귀 테스트                                      |
| Create | `server/worker/job-store.js`                   | SQLite schema init, job CRUD, event append, conflict query, log path metadata        |
| Create | `server/worker/job-store.test.js`              | schema/transition/conflict/log lifecycle 테스트                                      |
| Create | `server/worker/process-runner.js`              | detached runner spawn, stdout/stderr log append, graceful/force terminate helper     |
| Create | `server/worker/process-runner.test.js`         | spawn/log/cancel/force kill 단위 테스트                                              |
| Create | `server/worker/pr-target-resolver.js`          | `pr-review` issue-only target resolution 규칙                                        |
| Create | `server/worker/pr-target-resolver.test.js`     | 0/1/2 open PR 후보 규칙 테스트                                                       |
| Create | `server/worker/supervisor.js`                  | singleton lock, health server, create/list/detail/log/cancel/reconcile orchestration |
| Create | `server/worker/supervisor.test.js`             | create/cancel/reconcile/final result classification 테스트                           |
| Create | `server/worker/supervisor.integration.test.js` | long-running dummy process, restart/reconcile, cancel timeout integration 테스트     |
| Create | `server/worker/supervisor-entry.js`            | worker supervisor daemon entrypoint                                                  |
| Create | `server/worker/supervisor-client.js`           | `beads-ui` → supervisor local HTTP client                                            |
| Modify | `server/cli/daemon.js`                         | worker supervisor bootstrap에 재사용 가능한 detached runtime helpers 추출/재사용     |
| Modify | `server/cli/daemon.test.js`                    | worker supervisor runtime path/launch helper 회귀 테스트                             |
| Modify | `server/worker/jobs.js`                        | in-memory manager를 supervisor bootstrap/client gateway로 교체                       |
| Modify | `server/worker/jobs.test.js`                   | client bootstrap/conflict/error mapping 테스트로 갱신                                |
| Modify | `server/routes/worker-jobs.js`                 | list/detail/create/cancel/log endpoint 및 error contract 확장                        |
| Modify | `server/routes/worker-jobs.test.js`            | route-level status code/shape/tail validation 테스트                                 |
| Modify | `app/data/worker-selectors.js`                 | active/current/recent job selection, elapsed, cancellable state 계산                 |
| Modify | `app/data/worker-selectors.test.js`            | camelCase API job shape + active/recent selector 테스트                              |
| Modify | `app/views/worker-parent-row.js`               | active status chip, elapsed, view/cancel action                                      |
| Modify | `app/views/worker-detail.js`                   | current job card, recent jobs, log preview, cancel action                            |
| Modify | `app/views/worker.js`                          | selected parent 기준 current/recent job fetch/poll wiring                            |
| Modify | `app/views/worker-detail.test.js`              | current/recent job/log preview/cancel UI 테스트                                      |
| Modify | `app/views/worker.test.js`                     | worker polling/action disable 회귀 테스트                                            |
| Modify | `app/main.js`                                  | worker action toast/fetch wiring이 새 route shape를 소비하도록 정리                  |
| Modify | `app/main.worker.test.js`                      | Worker 탭 route bootstrap 회귀 유지                                                  |

---

### Task 1: durable state path와 SQLite job store 기반 추가

**Files:**

- Modify: `.gitignore`
- Create: `server/worker/state-paths.js`
- Create: `server/worker/state-paths.test.js`
- Create: `server/worker/job-store.js`
- Create: `server/worker/job-store.test.js`

- [ ] **Step 1: state path + job store 테스트를 먼저 추가**

`server/worker/state-paths.test.js` 에서는 repo root 기준으로
`.bdui/worker-jobs/` 아래 DB/log/runtime path가 안정적으로 계산되는지 고정한다.
`server/worker/job-store.test.js` 에서는 다음 계약을 먼저 실패시키도록 추가한다.

1. schema init 시 `jobs` 와 `job_events` 테이블이 생성된다.
2. create 시 빈 log file path와 `job.created` event가 함께 기록된다.
3. active conflict query가 `workspace + issueId` / `workspace + prNumber` 를
   구분한다.
4. final state가 되면 conflict에서 제외된다.

핵심 테스트 예시:

```js
test('creates job row and job.created event together', () => {
  const store = createJobStore({ root_dir: repo_root });

  const job = store.createJob({
    command: 'bd-ralph-v2',
    issueId: 'UI-qclw',
    workspace: repo_root
  });

  expect(job.status).toBe('queued');
  expect(job.logPath).toContain('.bdui/worker-jobs/logs/');
  expect(store.listEvents(job.id)[0].event_type).toBe('job.created');
});
```

- [ ] **Step 2: job store 테스트만 먼저 실행해 실패를 확인**

Run:

```bash
npx vitest run server/worker/state-paths.test.js server/worker/job-store.test.js
```

Expected:

- 새 모듈이 아직 없어 import 또는 assertion FAIL
- `.bdui/worker-jobs/` ignore/path contract가 아직 구현되지 않아 FAIL

- [ ] **Step 3: state path와 SQLite store 구현을 추가**

`server/worker/state-paths.js` 는 repo root 기준으로 아래 경로를 계산한다.

- state root: `.bdui/worker-jobs/`
- DB: `.bdui/worker-jobs/jobs.sqlite`
- logs: `.bdui/worker-jobs/logs/`
- runtime: `.bdui/worker-jobs/runtime/`
- lock: `.bdui/worker-jobs/runtime/supervisor.lock`

`server/worker/job-store.js` 는 `node:sqlite` 의 `DatabaseSync` 를 사용해 schema
init, create/list/detail/update/event append/log file bootstrap helper를
제공한다. API-facing camelCase 변환은 여기서 하지 말고 persistence는 snake_case
중심으로 유지한다.

구현 스케치:

```js
const db = new DatabaseSync(paths.database_path);
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (...);
  CREATE TABLE IF NOT EXISTS job_events (...);
`);

function createJob(input) {
  const job_id = makeJobId();
  ensureLogFile(job_id);
  insert_job_stmt.run(...);
  insert_event_stmt.run(job_id, 'job.created', payload_json);
  return getJob(job_id);
}
```

- [ ] **Step 4: state/store 테스트를 다시 실행**

Run:

```bash
npx vitest run server/worker/state-paths.test.js server/worker/job-store.test.js
```

Expected: PASS

---

### Task 2: process runner와 supervisor orchestration foundation 구현

**Files:**

- Create: `server/worker/process-runner.js`
- Create: `server/worker/process-runner.test.js`
- Create: `server/worker/pr-target-resolver.js`
- Create: `server/worker/pr-target-resolver.test.js`
- Create: `server/worker/supervisor.js`
- Create: `server/worker/supervisor.test.js`
- Create: `server/worker/supervisor.integration.test.js`
- Create: `server/worker/supervisor-entry.js`
- Modify: `server/cli/daemon.js`
- Modify: `server/cli/daemon.test.js`

- [ ] **Step 1: runner/PR target/supervisor 테스트를 먼저 추가**

세 테스트 묶음에서 아래를 먼저 고정한다.

1. `process-runner` 는 unit test에서는 spawn stub 기반으로 검증하고, integration
   test에서는 `codex` 대신 dummy long-running `node` script를 detached process로
   띄워 stdout/stderr를 지정 log file에 append 한다.
2. `pr-target-resolver` 는 issue-only `pr-review` 요청에서 open PR 후보가 0개면
   `422`, 2개 이상이면 `409`, 1개면 해당 PR 번호를 반환한다.
3. `supervisor` 는 create 시 `queued → starting/running` 전이, cancel 시
   `cancelling → cancelled`, startup reconcile 시 죽은 pid를 `failed` 로
   정리한다.
4. singleton/lock 테스트는 `lock held by dead process` 와
   `PID exists but health check fails` 상황에서 stale owner takeover가 허용되고
   split-brain 없이 새 supervisor가 ownership을 이어받는지 확인한다.
5. integration 테스트는 dummy long-running node process를 띄운 뒤 graceful
   cancel, timeout 후 force kill, supervisor restart 후 reconcile 을 확인한다.
6. supervisor/process integration 테스트는 실제 repo runtime을 쓰지 않고
   test마다 분리된 temp runtime/state root와 고정 dummy worker script fixture를
   사용한다.

핵심 테스트 예시:

```js
test('marks stale active job as failed during reconcile', async () => {
  const store = createJobStore({ root_dir: repo_root });
  const supervisor = createWorkerSupervisor({ root_dir: repo_root, store });
  const job = store.createRunningJob({ pid: 999999, issue_id: 'UI-qclw' });

  await supervisor.reconcileJobs();

  expect(store.getJob(job.id).status).toBe('failed');
});
```

- [ ] **Step 2: foundation 테스트를 실행해 실패를 확인**

Run:

```bash
npx vitest run \
  server/worker/process-runner.test.js \
  server/worker/pr-target-resolver.test.js \
  server/worker/supervisor.test.js \
  server/worker/supervisor.integration.test.js \
  server/cli/daemon.test.js
```

Expected:

- supervisor/runner/entrypoint 미구현으로 FAIL
- detached runtime helper가 worker supervisor path를 아직 모른다.

- [ ] **Step 3: runner/supervisor/daemon bootstrap 구현을 추가**

구현 원칙:

- `server/cli/daemon.js` 의 detached/PID/log helper를 일반화해서 server daemon과
  worker supervisor daemon이 둘 다 reuse 하게 한다.
- `server/worker/supervisor.js` 는 singleton lock + local-only HTTP server +
  store + runner를 조합한다.
- startup 시 non-final jobs를 reconcile 한다.
- stale owner 판정은 **exclusive lock + PID + health check** 를 함께 사용하고,
  health probe가 실패한 live PID 또는 dead lock holder만 takeover 대상으로
  간주한다.
- 테스트는 `temp dir` 기반 isolated runtime/state root, deterministic
  timeout/poll 값, 고정 dummy worker fixture를 사용해 환경 의존 flake를 줄인다.
- create accepted 전에는 status를 거짓으로 `running` 으로 응답하지 않는다.
- cancel은 `SIGTERM` → deadline poll → `SIGKILL` 순서를 공통 정책으로 둔다.

구현 스케치:

```js
export async function ensureWorkerSupervisor(options) {
  const probe = await pingSupervisor(options);
  if (probe.ok) {
    return probe;
  }

  const started = startManagedDaemon({
    entry_path: getWorkerSupervisorEntryPath(),
    runtime_dir: paths.runtime_dir,
    pid_file_name: 'supervisor.pid',
    log_file_name: 'supervisor.log'
  });

  return await waitForSupervisorHealthy(started);
}
```

- [ ] **Step 4: foundation 테스트를 다시 실행**

Run:

```bash
npx vitest run \
  server/worker/process-runner.test.js \
  server/worker/pr-target-resolver.test.js \
  server/worker/supervisor.test.js \
  server/worker/supervisor.integration.test.js \
  server/cli/daemon.test.js
```

Expected: PASS

---

### Task 3: `beads-ui` worker routes를 supervisor-backed API로 확장

**Files:**

- Create: `server/worker/supervisor-client.js`
- Modify: `server/worker/jobs.js`
- Modify: `server/worker/jobs.test.js`
- Modify: `server/routes/worker-jobs.js`
- Modify: `server/routes/worker-jobs.test.js`

- [ ] **Step 1: route/client 회귀 테스트를 먼저 추가**

`server/worker/jobs.test.js` 와 `server/routes/worker-jobs.test.js` 를
업데이트해서 아래 HTTP contract를 먼저 고정한다.

1. `GET /api/worker/jobs` 는 camelCase field shape + `elapsedMs` +
   `isCancellable` 를 반환한다.
2. `GET /api/worker/jobs/:jobId` 는 `events` 와 `logPreview` 를 포함한다.
3. `GET /api/worker/jobs/:jobId`, `POST /api/worker/jobs/:jobId/cancel`,
   `GET /api/worker/jobs/:jobId/log` 는 모두 selected workspace ownership 검증을
   수행하고, 다른 workspace job이면 `404` 또는 동일한 not-found envelope로
   숨긴다.
4. `POST /api/worker/jobs/:jobId/cancel` 은 active job만 받아들이고 terminal
   job에는 `409`.
5. `GET /api/worker/jobs/:jobId/log?tail=200` 은 `1..1000` 정수만 허용하고,
   음수/0/비정수는 `400` 으로 거절한다.
6. supervisor unavailable 은 `502` 또는 `503` 으로 매핑된다.

핵심 테스트 예시:

```js
expect(response.status).toBe(200);
expect(body.item.logPreview.tail).toEqual(['line 1']);
expect(body.item.isCancellable).toBe(true);
```

- [ ] **Step 2: worker route 테스트를 실행해 실패를 확인**

Run:

```bash
npx vitest run server/worker/jobs.test.js server/routes/worker-jobs.test.js
```

Expected:

- current in-memory manager API shape와 route surface가 새 계약과 달라 FAIL

- [ ] **Step 3: supervisor client와 worker route 구현을 교체**

`server/worker/jobs.js` 는 더 이상 in-memory source of truth를 갖지 말고,
`ensureWorkerSupervisor()` + `supervisor-client` 를 통해
create/list/detail/cancel/log 요청을 proxy 하는 thin gateway가 된다.

`server/routes/worker-jobs.js` 는 아래 surface를 제공하도록 확장한다.

- `GET /api/worker/jobs`
- `GET /api/worker/jobs/:jobId`
- `POST /api/worker/jobs`
- `POST /api/worker/jobs/:jobId/cancel`
- `GET /api/worker/jobs/:jobId/log`

`resolveWorkspace()` 검증은 유지하되, route layer는 workspace/body/tail
validation과 status code mapping에 집중한다. `jobId` 기반 detail/cancel/log
요청도 반드시 현재 workspace 스코프 안에서만 resolve 되게 해서 cross-workspace
조작 경로를 만들지 않는다.

- [ ] **Step 4: worker route 테스트를 다시 실행**

Run:

```bash
npx vitest run server/worker/jobs.test.js server/routes/worker-jobs.test.js
```

Expected: PASS

---

### Task 4: Worker selector/view를 current/recent jobs UI로 연결

**Files:**

- Modify: `app/data/worker-selectors.js`
- Modify: `app/data/worker-selectors.test.js`
- Modify: `app/views/worker-parent-row.js`
- Modify: `app/views/worker-detail.js`
- Modify: `app/views/worker.js`
- Modify: `app/views/worker-detail.test.js`
- Modify: `app/views/worker.test.js`
- Modify: `app/main.js`
- Modify: `app/main.worker.test.js`

- [ ] **Step 1: selector/view 테스트를 먼저 추가**

아래 UI 계약을 테스트로 먼저 고정한다.

1. parent row가 active job status chip + elapsed + cancel 가능 여부를 보여준다.
2. detail panel이 current job card, recent jobs list, log preview tail을
   렌더한다.
3. active job이 있으면 direct run action이 disable 되고 `Cancel` / `View job`
   action이 보인다.
4. polling 결과가 current/recent sections를 갱신한다.
5. log fetch 실패와 execution state를 혼동하지 않고, log 영역만 빈 상태/오류
   힌트를 보인다.

핵심 테스트 예시:

```js
expect(screen.textContent).toContain('Running');
expect(screen.textContent).toContain('4m 12s');
expect(screen.querySelector('button[data-action="cancel-job"]')).not.toBeNull();
```

- [ ] **Step 2: selector/view 테스트를 실행해 실패를 확인**

Run:

```bash
npx vitest run \
  app/data/worker-selectors.test.js \
  app/views/worker-detail.test.js \
  app/views/worker.test.js \
  app/main.worker.test.js
```

Expected:

- current UI가 active badge 정도만 갖고 있어 current/recent/log/cancel assertion
  FAIL

- [ ] **Step 3: selector/view/main 구현을 추가**

구현 원칙:

- selector는 API camelCase 응답을 canonical 입력으로 삼고 `currentJob`,
  `recentJobs`, `elapsedLabel`, `hasActiveJob`, `canCancel` 같은 뷰 모델만
  계산한다.
- `worker-detail` 은 current job card와 recent job list를 함께 렌더한다.
- cancel은 optimistic success state를 만들지 말고 accepted 응답 이후에만
  `cancelling` 표시를 갱신한다.
- polling은 기존 3초 cadence를 유지하되 selected workspace/issue 기준 job list와
  필요 시 selected job detail/log를 함께 새로 읽는다.

- [ ] **Step 4: selector/view 테스트를 다시 실행**

Run:

```bash
npx vitest run \
  app/data/worker-selectors.test.js \
  app/views/worker-detail.test.js \
  app/views/worker.test.js \
  app/main.worker.test.js
```

Expected: PASS

---

### Task 5: end-to-end validation과 recovery 회귀를 마무리

**Files:**

- Modify: `server/worker/supervisor.integration.test.js`
- Modify: `server/routes/worker-jobs.test.js`
- Modify: `app/views/worker-detail.test.js`
- Modify: `app/views/worker.test.js`
- Modify: `docs/superpowers/plans/2026-04-17-worker-job-backend.md` (검증 결과
  체크용 주석/본문 수정이 필요할 때만)

- [ ] **Step 1: recovery + cancel + UI 연결을 묶는 회귀 테스트를 보강**

최종 검증은 아래 acceptance를 각각 테스트 또는 명령으로 대응시킨다.

1. Worker UI에서 `bd-ralph-v2` / `pr-review` job create 가능
2. server restart 뒤에도 active job 추적 가능
3. row/detail 에 status + elapsed 표시
4. cancel 요청 가능
5. graceful → timeout → force 정책 검증
6. 최근 로그 tail + recent jobs 이력 노출
7. 동일 대상 active job 중복 방지

- [ ] **Step 2: targeted suites를 실행**

Run:

```bash
npx vitest run \
  server/worker/job-store.test.js \
  server/worker/process-runner.test.js \
  server/worker/pr-target-resolver.test.js \
  server/worker/supervisor.test.js \
  server/worker/supervisor.integration.test.js \
  server/worker/jobs.test.js \
  server/routes/worker-jobs.test.js \
  app/data/worker-selectors.test.js \
  app/views/worker-detail.test.js \
  app/views/worker.test.js \
  app/main.worker.test.js
```

Expected: PASS

- [ ] **Step 3: repo-wide verification 실행**

Run:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

Expected:

- `npm run tsc` PASS
- `npm test` PASS
- `npm run lint` PASS
- `npm run prettier:write` completes and leaves no surprising diffs beyond
  intended formatting

- [ ] **Step 4: parent bead/PR summary에 남길 verification 요약을 정리**

완료 시 run ledger와 bead metadata에 최소 아래 요약이 남도록 한다.

- restart/reconcile smoke PASS 여부
- cancel grace/force path PASS 여부
- duplicate active conflict PASS 여부
- Worker UI current/recent/log preview PASS 여부

---

## Self-Review Checklist

- spec coverage: durable store, supervisor lifecycle, cancel policy, API
  surface, UI current/recent jobs, log preview, restart reconcile, duplicate
  conflict 모두 task 1~5에 매핑했다.
- placeholder scan: 미완성 표시나 후속 미루기 표현 없이 바로 실행 가능한 단계로
  작성했다.
- type consistency: API는 camelCase, persistence는 snake_case, runtime state
  path는 `.bdui/worker-jobs/` 로 일관되게 사용했다.
- scope check: websocket/SSE, reboot resume, retry/tmux/full transcript viewer는
  명시적으로 범위 밖으로 남겼다.
