# Worker 탭 추가 Implementation Plan

Parent bead: UI-62lm

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 workspace 기준으로 parent 이슈의 진행률, spec, PR, worker action(`bd-ralph-v2`, `pr-review`)을 한 화면에서 다루는 `Worker` 탭을 `beads-ui`에 추가한다.

**Architecture:** 기존 push-only issue subscription 구조는 그대로 유지하고, Worker 탭은 `app/data/worker-selectors.js`에서 parent/child/progression/runnable view-model을 계산한다. Worker-specific 동작은 Express API(`jobs`, `prs`, `spec`)로 보강하고, 클라이언트는 별도 Worker selection state와 polling 기반 job 상태 갱신을 사용한다. 기존 global `selected_id` detail dialog와 Worker selection은 분리한다.

**Tech Stack:** Node.js, Express, WebSocket, lit-html, vitest, Beads (`bd`), GitHub CLI (`gh`)

**Spec:** `docs/superpowers/specs/2026-04-16-worker-tab-design.md`

---

## Working Context

- execution repo root: 현재 작업 디렉터리 (`beads-ui`)
- parent bead: `UI-62lm`
- current spec: `docs/superpowers/specs/2026-04-16-worker-tab-design.md`

### 이번 런에 포함하는 범위

- `Worker` top nav / route / state 추가
- Worker tree + filter + parent/child row 렌더링
- Worker selectors (parent grouping, progression, badges, runnable)
- Worker detail panel (summary, spec panel, PR panels)
- worker API (`/api/worker/jobs`, `/api/worker/prs`, `/api/worker/spec/:issueId`)
- spec read/write path safety helper
- Worker job polling
- 관련 테스트 추가

### 이번 런에서 의도적으로 제외하는 범위

- transcript/log tail viewer
- queue management / concurrency setting UI
- spec 신규 생성 wizard
- child 이슈 직접 실행 UI
- multi-workspace Worker overview
- websocket 기반 job push

## File Structure

| Action | File | Responsibility |
| --- | --- | --- |
| Modify | `app/state.js` | `worker` view + Worker selection/filter state shape 추가 |
| Modify | `app/router.js` | `worker` view parse/goto, Worker query semantics 처리 |
| Modify | `app/utils/issue-url.js` | Worker용 canonical hash helper 지원 |
| Modify | `app/views/nav.js` | `Worker` 탭 추가 |
| Modify | `app/main.js` | `worker-root` shell 추가, Worker view wiring, Worker polling lifecycle |
| Create | `app/data/worker-selectors.js` | parent grouping, progression, runnable, sorting, filtering |
| Create | `app/data/worker-selectors.test.js` | selector 계산 검증 |
| Create | `app/views/worker.js` | Worker split layout shell |
| Create | `app/views/worker-toolbar.js` | search/status/runnable/open-pr filter UI |
| Create | `app/views/worker-tree.js` | parent tree, expand/collapse, closed-child toggle |
| Create | `app/views/worker-parent-row.js` | parent row rendering + actions |
| Create | `app/views/worker-child-row.js` | child row rendering |
| Create | `app/views/worker-detail.js` | right panel shell |
| Create | `app/views/worker-spec-panel.js` | spec read/edit/save UI |
| Create | `app/views/worker-pr-panel.js` | selected parent PR list + per-PR action |
| Create | `app/views/worker-pr-summary.js` | workspace-wide open PR summary |
| Create | `app/views/worker*.test.js` | Worker view/component tests |
| Modify | `app/styles.css` | Worker layout, row, badge, panel styles |
| Modify | `server/app.js` | Worker API route mount |
| Create | `server/path-safety.js` | docs/** markdown path validation helpers |
| Create | `server/path-safety.test.js` | path safety tests |
| Create | `server/worker/spec-reader.js` | issue `spec_id` resolve + markdown read |
| Create | `server/worker/spec-writer.js` | issue `spec_id` resolve + markdown write |
| Create | `server/worker/pr-reader.js` | issue-linked PR resolve + workspace PR list/read |
| Create | `server/worker/jobs.js` | job manager for `bd-ralph-v2` / `pr-review` |
| Create | `server/routes/worker-spec.js` | GET/PUT spec route |
| Create | `server/routes/worker-prs.js` | selected parent PR + workspace PR summary route |
| Create | `server/routes/worker-jobs.js` | GET/POST jobs route |
| Create | `server/routes/worker-*.test.js` | worker route tests |
| Create | `app/main.worker.test.js` | route/tab/polling integration test |

---

### Task 1: Worker route/state skeleton 추가

**Files:**
- Modify: `app/state.js`
- Modify: `app/router.js`
- Modify: `app/utils/issue-url.js`
- Modify: `app/views/nav.js`
- Modify: `app/main.js`
- Create: `app/main.worker.test.js`

- [ ] **Step 1: failing test로 Worker route/state 기대 동작을 고정**

`app/main.worker.test.js`에 아래 시나리오를 먼저 추가한다.

1. `#/worker` 진입 시 `Worker` 탭이 active가 된다.
2. `#/worker?issue=UI-62lm` 진입 시 Worker selection만 갱신되고 기존 detail dialog는 자동으로 열리지 않는다.
3. `gotoView('worker')`가 Worker hash로 이동한다.

핵심 테스트 스케치:

```js
it('activates Worker tab from hash without opening global detail dialog', async () => {
  window.location.hash = '#/worker?issue=UI-62lm';
  const root = document.createElement('div');
  document.body.append(root);

  bootstrap(root);

  expect(document.querySelector('.tab.active')?.textContent).toContain('Worker');
  expect(document.querySelector('#detail-root')).toBeNull();
});
```

- [ ] **Step 2: Worker route/state 테스트만 먼저 실행해 실패 확인**

Run:

```bash
npx vitest run app/main.worker.test.js app/router.test.js app/views/nav.test.js
```

Expected:
- `worker` view가 아직 없어서 route/nav assertion FAIL
- Worker selection과 global detail separation assertion FAIL

- [ ] **Step 3: state / router / issue-url / nav를 최소 구현으로 확장**

`app/state.js`는 `ViewName`에 `worker`를 추가하고 Worker 전용 selection/filter 상태를 위한 shape를 추가한다.

예상 shape:

```js
/** @typedef {'issues'|'epics'|'board'|'worker'} ViewName */
/** @typedef {{ selected_parent_id: string | null, show_closed_children: string[] }} WorkerState */
```

`app/router.js`는:
- `parseView()`에서 `worker` 인식
- hash query의 `issue`를 `worker.selected_parent_id`로 매핑
- `gotoView('worker')` 지원

`app/utils/issue-url.js`는 Worker hash를 생성할 수 있어야 한다.

예상 helper 스케치:

```js
export function issueHashFor(view, id) {
  const v = view === 'epics' || view === 'board' || view === 'worker' ? view : 'issues';
  return `#/${v}?issue=${encodeURIComponent(id)}`;
}
```

`app/views/nav.js`는 네 번째 탭 `Worker`를 추가한다.

`app/main.js`는 shell에 `worker-root`를 추가하되, 아직 빈 mount만 연결한다.

- [ ] **Step 4: route/nav 테스트를 다시 실행**

Run:

```bash
npx vitest run app/main.worker.test.js app/router.test.js app/views/nav.test.js
```

Expected: PASS

---

### Task 2: Worker selector 계층 구현

**Files:**
- Create: `app/data/worker-selectors.js`
- Create: `app/data/worker-selectors.test.js`
- (Reference) `app/data/list-selectors.js`
- (Reference) `app/data/sort.js`

- [ ] **Step 1: selector test로 progression/runnable/filter/sort 규칙 고정**

`app/data/worker-selectors.test.js`에 아래를 명시적으로 테스트한다.

1. child 상태 가중치가 `open=0`, `in_progress=0.5`, `resolved=0.85`, `closed=1.0`으로 계산된다.
2. closed child는 기본 child list에서 숨겨진다.
3. `runnable` predicate는 `is_parent && has_spec_id && !has_active_job && workspace_is_valid && parent_status !== 'closed'`를 따른다.
4. `resolved` parent는 runnable에 포함된다.
5. 기본 정렬이 `active job -> runnable -> status -> priority -> time -> id`를 따른다.
6. `runnable only` / `has open pr only` / search / status filter가 AND 조합으로 적용된다.

핵심 테스트 스케치:

```js
it('computes progression from child weights', () => {
  const vm = buildWorkerParentViewModel(parent, children, { jobs: [], workspace: true });
  expect(vm.progress_percent).toBe(59);
});

it('treats resolved parent as runnable when other conditions pass', () => {
  expect(isRunnableParent(parentResolved, { has_spec_id: true, has_active_job: false, workspace_is_valid: true })).toBe(true);
});
```

- [ ] **Step 2: selector tests만 먼저 실행해 실패 확인**

Run:

```bash
npx vitest run app/data/worker-selectors.test.js
```

Expected: FAIL — module/functions 미구현

- [ ] **Step 3: `worker-selectors.js` 구현**

필수 export 예시:

```js
export function computeProgressFromStatuses(statuses) { /* ... */ }
export function isRunnableParent(parent, context) { /* ... */ }
export function buildWorkerParents(issues, options = {}) { /* ... */ }
export function filterWorkerParents(items, filters) { /* ... */ }
```

중요 구현 규칙:
- parent 판정: `parent-child` 관계, `dependents`, 또는 child count 기반
- child 표시 리스트는 기본적으로 `closed` 제외
- 정렬 comparator는 deterministic해야 함
- row/action/filter가 같은 `isRunnableParent()`를 재사용해야 함

- [ ] **Step 4: selector tests 재실행**

Run:

```bash
npx vitest run app/data/worker-selectors.test.js
```

Expected: PASS

---

### Task 3: Worker tree / toolbar / row UI 구현

**Files:**
- Create: `app/views/worker.js`
- Create: `app/views/worker-toolbar.js`
- Create: `app/views/worker-tree.js`
- Create: `app/views/worker-parent-row.js`
- Create: `app/views/worker-child-row.js`
- Create: `app/views/worker.test.js`
- Modify: `app/main.js`
- Modify: `app/styles.css`

- [ ] **Step 1: UI component failing test 작성**

`app/views/worker.test.js`에 아래를 고정한다.

1. filter toolbar가 search/status/runnable/open-pr controls를 렌더한다.
2. parent row에 progression bar, badge, action buttons가 보인다.
3. expand 시 non-closed child만 기본 표시된다.
4. `Show closed (N)` 클릭 시 closed child가 노출된다.
5. `Run bd-ralph-v2` / `Run pr-review` 버튼 활성화가 selector predicate와 일치한다.

핵심 테스트 스케치:

```js
it('hides closed children by default and reveals them on toggle', async () => {
  render(workerView(...), mount);
  expect(mount.textContent).not.toContain('closed child');

  mount.querySelector('[data-show-closed="UI-62lm"]')?.click();
  await Promise.resolve();

  expect(mount.textContent).toContain('closed child');
});
```

- [ ] **Step 2: Worker UI tests 실행해 실패 확인**

Run:

```bash
npx vitest run app/views/worker.test.js
```

Expected: FAIL — components 미구현

- [ ] **Step 3: Worker split layout과 tree UI 구현**

`app/views/worker.js`는 왼쪽/오른쪽 panel shell을 렌더한다.

예상 shell 스케치:

```js
export function createWorkerView(mount, deps) {
  function renderView(state) {
    render(html`
      <section class="worker-root">
        <aside class="worker-left">...</aside>
        <section class="worker-right">...</section>
      </section>
    `, mount);
  }
  return { load() {}, clear() {}, destroy() {} };
}
```

`worker-parent-row.js`는 progression, badges, actions를 담당한다.

Action binding은 콜백만 받도록 유지한다.

```js
html`
  <button ?disabled=${!row.runnable} @click=${() => onRunRalph(row.id)}>Run bd-ralph-v2</button>
  <button ?disabled=${!row.pr_review_enabled} @click=${() => onRunPrReview(row.id)}>Run pr-review</button>
`
```

- [ ] **Step 4: `app/main.js`에 Worker mount/wiring 추가**

기존 shell에 Worker route root를 추가하고 route visibility를 연결한다.

추가 shell 예시:

```js
<section id="worker-root" class="route worker" hidden></section>
```

route switch 시 `worker-root.hidden`을 `s.view !== 'worker'`로 제어한다.

- [ ] **Step 5: Worker UI tests 재실행**

Run:

```bash
npx vitest run app/views/worker.test.js app/main.worker.test.js
```

Expected: PASS

---

### Task 4: spec path safety + spec panel API/UI 구현

**Files:**
- Create: `server/path-safety.js`
- Create: `server/path-safety.test.js`
- Create: `server/worker/spec-reader.js`
- Create: `server/worker/spec-writer.js`
- Create: `server/routes/worker-spec.js`
- Create: `server/routes/worker-spec.test.js`
- Create: `app/views/worker-spec-panel.js`
- Create: `app/views/worker-spec-panel.test.js`
- Modify: `server/app.js`

- [ ] **Step 1: path safety와 spec route failing tests 작성**

`server/path-safety.test.js`에 다음을 고정한다.

1. `docs/spec.md`, `docs/nested/spec.md` 허용
2. 절대 경로 금지
3. `..` traversal 금지
4. `.md` 외 확장자 금지
5. canonical resolve가 workspace/docs 밖으로 나가면 금지

`server/routes/worker-spec.test.js`는:
- GET spec 성공
- GET spec 404 (`spec_id` 없음)
- PUT spec 성공
- PUT spec path violation 403
을 검증한다.

- [ ] **Step 2: spec server tests 실행해 실패 확인**

Run:

```bash
npx vitest run server/path-safety.test.js server/routes/worker-spec.test.js
```

Expected: FAIL

- [ ] **Step 3: path safety helper와 spec read/write route 구현**

`server/path-safety.js`는 `beads-worker` 패턴과 유사하게 최소 helper를 제공한다.

예상 구현 스케치:

```js
export function isSafeRelativeMarkdownPath(targetPath) {
  return typeof targetPath === 'string' &&
    targetPath.startsWith('docs/') &&
    !path.isAbsolute(targetPath) &&
    !targetPath.includes('..') &&
    targetPath.endsWith('.md');
}

export function resolveWithin(rootPath, targetPath) {
  const abs = path.resolve(rootPath, targetPath);
  return isSubpath(path.resolve(rootPath, 'docs'), abs) ? abs : null;
}
```

`worker-spec.js`는 `GET /api/worker/spec/:issueId`, `PUT /api/worker/spec/:issueId`를 제공하고 JSON body `{ content }`를 받는다.

- [ ] **Step 4: spec panel UI tests 작성 및 구현**

`app/views/worker-spec-panel.test.js`는:
- read mode 렌더
- edit mode 전환
- save callback 호출
- cancel restore
를 검증한다.

`worker-spec-panel.js`는 fetch 기반으로 spec을 로드/저장한다.

예상 save 코드:

```js
await fetch(`/api/worker/spec/${issueId}?workspace=${encodeURIComponent(workspace)}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content: nextContent })
});
```

- [ ] **Step 5: spec 관련 테스트 재실행**

Run:

```bash
npx vitest run server/path-safety.test.js server/routes/worker-spec.test.js app/views/worker-spec-panel.test.js
```

Expected: PASS

---

### Task 5: PR route + selected/workspace PR panels 구현

**Files:**
- Create: `server/worker/pr-reader.js`
- Create: `server/routes/worker-prs.js`
- Create: `server/routes/worker-prs.test.js`
- Create: `app/views/worker-pr-panel.js`
- Create: `app/views/worker-pr-summary.js`
- Create: `app/views/worker-pr-panel.test.js`
- Create: `app/views/worker-pr-summary.test.js`
- Modify: `server/app.js`

- [ ] **Step 1: PR route failing tests 작성**

`server/routes/worker-prs.test.js`에서 아래를 고정한다.

1. `GET /api/worker/prs/:issueId`는 selected parent 관련 PR 목록을 반환한다.
2. `GET /api/worker/prs?workspace=...`는 workspace-wide open PR summary를 반환한다.
3. issue에 open PR이 여러 개면 모두 반환한다.

- [ ] **Step 2: route tests 실행해 실패 확인**

Run:

```bash
npx vitest run server/routes/worker-prs.test.js
```

Expected: FAIL

- [ ] **Step 3: `pr-reader` / route 구현**

`server/worker/pr-reader.js`는:
- issue-linked PR resolve
- 다중 open PR list read
- workspace-wide open PR list read
를 담당한다.

첫 버전은 summary shape를 단순하게 유지한다.

예상 response 예시:

```json
{
  "items": [
    { "number": 42, "title": "Add Worker tab", "state": "OPEN", "baseRefName": "main", "headRefName": "worker-tab" }
  ]
}
```

- [ ] **Step 4: PR panel failing tests 작성 및 구현**

`app/views/worker-pr-panel.test.js`는:
- selected parent PR 리스트 렌더
- 다중 PR일 때 각 row에 `Run pr-review` 버튼 표시
- PR 없는 경우 empty state
를 검증한다.

`app/views/worker-pr-summary.test.js`는:
- workspace-wide list summary 렌더
를 검증한다.

- [ ] **Step 5: PR 관련 테스트 재실행**

Run:

```bash
npx vitest run server/routes/worker-prs.test.js app/views/worker-pr-panel.test.js app/views/worker-pr-summary.test.js
```

Expected: PASS

---

### Task 6: worker jobs API + polling + right panel 통합

**Files:**
- Create: `server/worker/jobs.js`
- Create: `server/routes/worker-jobs.js`
- Create: `server/routes/worker-jobs.test.js`
- Modify: `server/app.js`
- Create: `app/views/worker-detail.js`
- Modify: `app/views/worker.js`
- Modify: `app/main.js`
- Create: `app/views/worker-detail.test.js`

- [ ] **Step 1: jobs route failing tests 작성**

`server/routes/worker-jobs.test.js`에 다음을 고정한다.

1. `POST /api/worker/jobs` with `bd-ralph-v2` enqueues issue-based job
2. `POST /api/worker/jobs` with `pr-review` resolves single PR target or explicit PR target
3. `GET /api/worker/jobs` returns sanitized job list
4. 동일 parent+workspace active job이 있으면 409

- [ ] **Step 2: jobs route tests 실행해 실패 확인**

Run:

```bash
npx vitest run server/routes/worker-jobs.test.js
```

Expected: FAIL

- [ ] **Step 3: jobs route/manager 구현**

`server/worker/jobs.js`는 beads-worker 패턴을 단순화해 job manager를 제공한다.

필수 contract:
- command: `bd-ralph-v2` | `pr-review`
- status: `queued`, `running`, `capacity-wait`, `needs-attention`, `done`, `failed`
- issueId, workspace, prNumber(optional)

`pr-review`는:
- row direct action에서는 single PR만 허용
- right panel per-PR action에서는 explicit `prNumber`를 body에 허용

spawn 스케치:

```js
if (command === 'bd-ralph-v2') {
  args = ['exec', `$bd-ralph-v2 ${issueId}`];
} else {
  args = ['exec', `$pr-review ${prNumber}`];
}
```

- [ ] **Step 4: Worker polling과 right panel 통합 구현**

`app/main.js`는 Worker view active일 때만 3초 polling을 시작한다.

예상 polling skeleton:

```js
let workerJobsTimer = null;

async function refreshWorkerJobs() {
  const wsPath = store.getState().workspace.current?.path;
  if (!wsPath) return;
  const res = await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(wsPath)}`);
  // set worker job state
}
```

`worker-detail.js`는 summary + spec panel + parent PR panel + workspace PR summary를 조립한다.

- [ ] **Step 5: jobs + Worker detail tests 재실행**

Run:

```bash
npx vitest run server/routes/worker-jobs.test.js app/views/worker-detail.test.js app/main.worker.test.js
```

Expected: PASS

---

### Task 7: end-to-end polish, regression, verification

**Files:**
- Modify: `app/styles.css`
- Modify: affected Worker files as needed
- No new files unless regression demands it

- [ ] **Step 1: Worker styling and regression-focused tests 보강**

`app/styles.css`에 아래를 추가한다.

- Worker split layout
- left tree / right detail proportions
- progress bar styling
- parent row / child row spacing
- badge cluster wrapping
- right panel section card styling

필요하면 snapshot-like DOM assertions를 Worker view tests에 보강한다.

- [ ] **Step 2: targeted test suite 실행**

Run:

```bash
npx vitest run   app/main.worker.test.js   app/data/worker-selectors.test.js   app/views/worker.test.js   app/views/worker-spec-panel.test.js   app/views/worker-pr-panel.test.js   app/views/worker-pr-summary.test.js   server/path-safety.test.js   server/routes/worker-spec.test.js   server/routes/worker-prs.test.js   server/routes/worker-jobs.test.js
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
- `tsc`: exit 0
- `npm test`: all PASS
- `lint`: no errors
- `prettier:write`: formatting applied, then working tree only expected changes 남음

- [ ] **Step 4: final plan conformance check**

아래를 수동 확인한다.

- `Worker` 탭 진입 가능
- global detail dialog가 Worker selection 때문에 자동 오염되지 않음
- `resolved` parent runnable 포함
- 다중 PR parent는 right panel에서 PR별 실행만 허용
- spec save path safety가 docs/** 밖으로 나가지 않음

- [ ] **Step 5: commit**

```bash
git add app/state.js app/router.js app/utils/issue-url.js app/views/nav.js app/main.js app/data/worker-selectors.js app/data/worker-selectors.test.js app/views/worker*.js app/views/worker*.test.js app/styles.css server/app.js server/path-safety.js server/path-safety.test.js server/worker/*.js server/routes/worker-*.js server/routes/worker-*.test.js
git commit -m "feat: Worker 탭 추가 계획 구현"
```

Expected:
- commit succeeds with only Worker-related files staged

---

## Self-Review Checklist

- spec의 핵심 요구(Worker tab, parent tree, progression, closed child 숨김, spec edit, PR panels, jobs, polling)가 모두 task에 대응되는지 확인한다.
- `runnable` predicate가 selector / row action / sort / filter에서 같은 함수/조건으로 재사용되도록 task에 반영됐는지 확인한다.
- global `selected_id`와 Worker selection 분리가 plan에서 빠지지 않았는지 확인한다.
- path safety helper가 read/write 모두에 적용되는지 확인한다.
- 다중 PR parent가 parent row direct action 대신 right panel per-PR action으로 연결되는지 확인한다.
- placeholder(TODO/TBD/적절한 처리) 문구가 없는지 확인한다.

## Acceptance Mapping

- Spec acceptance 1–4 → Tasks 1–3
- Spec acceptance 5–6 → Tasks 2, 5, 6
- Spec acceptance 7 → Task 4
- Spec acceptance 8 → Tasks 5–6
- Spec acceptance 9 → Tasks 2, 6
- Spec acceptance 10 → Tasks 1, 6
