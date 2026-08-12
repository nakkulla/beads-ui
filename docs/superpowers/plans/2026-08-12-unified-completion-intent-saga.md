# UI-f17c 구현 계획: issue close와 repo-level 배포 자동복구 분리

- Bead: `UI-f17c`
- route: `full_plan`
- workflow mode: `fast_track`
- spec: `docs/superpowers/specs/2026-08-12-unified-completion-intent-saga-design.md` @ `1a951135dfadb161b0e665ef918289917e16db59`
- plan path: `docs/superpowers/plans/2026-08-12-unified-completion-intent-saga.md`
- predecessor chain: `dotfiles-uib7 → UI-lb58 → dotfiles-j8e6`
- relaunch contract: `UI-lbqw`
- target base: 세 predecessor가 모두 포함된 fetched `origin/main` exact SHA

## Context

`dotfiles-uib7`, `UI-lb58`, `dotfiles-j8e6`이 active deployment authority를
external repo-level job으로 옮긴다. 기존 `UI-f17c` plan이 전제로 한 managed Adapter,
receipt, restart journal, runtime marker와 partial release recovery는 이 선행 체인 뒤에
존재하지 않는다.

이번 구현은 individual issue lifecycle과 repository deployment lifecycle을 분리한다.
이슈는 merge, detached post-merge verify, `requestDeployment()`의 accepted/no-op과 exact
status binding readback 뒤 cleanup·Parent close를 마친다. provider가 이후 pending,
running, failed 또는 recovering이어도 닫힌 이슈를 reopen하지 않는다. 저장소별
coordinator가 latest desired generation을 관측하고 terminal failure를 30초/120초
backoff로 두 번 retry한다. 소진 뒤에는 stable identity의 repo-level recovery Bead와 fresh
session을 한 번 만들고, `retry_same|repair_pr_open|awaiting_confirmation|unrecoverable`
outcome을 external provider observation으로 연결한다.

Worker UI에는 toolbar/KPI와 lanes 사이 compact deployment strip 하나를 둔다. 기본은 한
줄이고 click 또는 keyboard disclosure 때만 timeline, recovery session, log와 현재 유효한
action을 펼친다. issue/PR별 deploy button은 만들지 않는다.

### 실행 전제와 경계

1. `dotfiles-uib7`, `UI-lb58`, `dotfiles-j8e6`이 모두 `closed`이고 installed
   `repo-deployctl`, `repo-deployer`, final Workflow Contract와 shared runtime exact
   process/path/SHA/port/HTTP readback이 green이기 전에는 parent claim, phase child,
   worktree 또는 implementation edit를 만들지 않는다.
2. 실행 시작 시 세 Bead의 authoritative `bd show --json`, dependency graph, fetched
   `origin/main` containment과 provider `status --json`을 readback하고 base SHA를 고정한다.
3. landed `UI-lb58`의 Deployment Job schema와 module/file names를 읽어 아래 logical seam을
   실제 경로에 매핑한다. 이름 이동만 반영한다. request/status/retry binding, generation,
   cleanup boundary 또는 provider ownership 의미가 spec과 다르면 첫 write 전에 plan을
   재검토한다.
4. fresh `dispatch_repair`는 new recovery Bead/worktree/current preset을 사용한다. 같은
   recovery attempt continuation에만 landed `UI-lbqw` resolver를 사용한다. prior issue
   transcript나 worktree를 fresh recovery에 재사용하지 않는다.
5. Worker는 installed `repo-deployctl request|status|retry --json`만 사용한다. provider
   state file, release directory, lock, process marker 또는 service status를 직접
   read/write하지 않는다.
6. workflow label/metadata grammar와 `[deploy]` contract는 바꾸지 않는다. active managed
   reader/writer compatibility를 추가하지 않고 historical specs/plans와 inert state는
   보존한다.
7. root controller가 전체 diff/status, 검증, phase seal, review gate, PR과 finishing을
   소유한다. 한 implementation worktree에서 phase를 순서대로 진행한다.

## Phase 1: predecessor preflight와 issue completion 경계 전환

### 대상 seam

- landed `UI-lb58` Deployment Job module과 tests (실행 preflight에서 exact path 고정)
- `server/worker/pr-actions.js`
- `server/worker/pr-actions.test.js`
- `server/worker/pr-poller.js`
- `server/worker/pr-poller.test.js`
- `server/worker/queue-store.js`
- `server/worker/queue-store.test.js`
- `server/worker/completion-intent.js`
- `server/worker/completion-intent.test.js`

### 작업

1. landed Deployment Job의 exact request/status binding과 merged-floor record를 readback해
   `merge M → latest verified D → request(D) → matching generation G`를 하나의 durable
   close precondition으로 만든다. timeout/crash는 status-first
   `applied|not_applied|unknown`으로 정산한다.
2. matching `accepted|noop`과 status binding을 기록한 즉시 각 row의
   `child_sweep → branch_cleanup → parent_close`를 재개한다. provider success/coverage wait는 issue close
   authority에서 제거하고 pending/running/failed/recovering이 closed Bead를 reopen하거나
   `pr_wait`로 되돌리지 못하게 한다.
3. queue migration은 기존 merge floor, target SHA와 generation을 보존한다. 현재 matching
   succeeded status는 그대로 adopt하고, matching failed status는 Phase 2의 retry budget 0
   입력으로 넘긴다. malformed/wrong repo/base/SHA/generation은 close와 retry 모두
   fail-closed한다.
4. two merge floors가 같은 current desired generation에 결합되어도 각 issue cleanup/close는
   독립 CAS로 완료하고 deployment job은 execution slot과 browser subscriber 없이 별도 poller
   demand로 유지한다.

Verification: `npm test -- server/worker/deployment-job.test.js server/worker/pr-actions.test.js server/worker/pr-poller.test.js server/worker/queue-store.test.js server/worker/completion-intent.test.js`

### Phase acceptance

- durable request binding 전에는 이슈가 닫히지 않고, binding 뒤에는 provider terminal
  success 없이도 cleanup과 close가 끝난다.
- later provider failure가 closed Bead, merged PR 또는 merge floor를 되돌리는 path가 없다.
- lower/divergent/malformed provider binding으로 close, coverage 또는 retry effect가 발생하지
  않는다.

## Phase 2: repo deployment retry와 crash-safe recovery state

### 대상 seam

- landed `UI-lb58` Deployment Job module과 tests
- `server/worker/queue-store.js`
- `server/worker/queue-store.test.js`
- `server/worker/runtime.js`
- `server/worker/runtime.test.js`
- `server/worker/attach.js`
- `server/worker/attach.test.js`
- `server/worker/deployment-recovery.js` (new)
- `server/worker/deployment-recovery.test.js` (new)

### 작업

1. canonical repo key별 deployment row에 provider projection과 Worker-owned
   `automatic_retry_count`, `next_retry_at`, exact `failure_key`, recovery operation을 additive
   normalize한다. failure identity는 repo/base/SHA/generation/error code/bounded log digest를
   포함하고 unknown fields를 버려 새 budget을 만드는 fail-open migration을 금지한다.
2. matching terminal failed generation만 30초와 120초 durable backoff 뒤
   `retryDeployment(repo)`로 전환한다. operation prerecord, provider retry, returned binding과
   immediate status readback을 crash-safe하게 정산하고 restart/repeated poll이 count나
   generation을 중복 증가시키지 않게 한다.
3. higher valid desired generation은 old retry/recovery를 `superseded` evidence로 정산하고
   독립 budget을 시작한다. lower, divergent 또는 malformed binding은 retry, adoption,
   coverage와 UI success에 사용하지 않는다.
4. pending/running/retrying/recovering/confirmation row 자체가 startup과 live path의 poller
   demand가 되게 한다. coordinator loop는 provider call을 유한하게 정산하고 한 repo의
   hung/failed observation이 다른 runnable intent를 막지 않게 한다.

Verification: `npm test -- server/worker/deployment-job.test.js server/worker/deployment-recovery.test.js server/worker/queue-store.test.js server/worker/runtime.test.js server/worker/attach.test.js`

### Phase acceptance

- matching failure 하나가 restart 횟수와 무관하게 automatic retry budget 두 개만 소비한다.
- provider state와 external effect의 writer는 external deployer 하나뿐이다.
- newer desired coalescing과 stale generation rejection이 동일 reducer에서 결정된다.

## Phase 3: recovery Bead, fresh session과 structured outcome

### 대상 seam

- `server/worker/deployment-recovery.js`
- `server/worker/deployment-recovery.test.js`
- `server/bd.js`
- `server/bd.test.js`
- `server/worker/completion-repair.js`
- `server/worker/completion-repair.test.js`
- `server/worker/scheduler.js`
- `server/worker/scheduler.test.js`
- `server/worker/session-monitor.js`
- `server/worker/session-monitor.test.js`
- landed `UI-lbqw` continuation resolver/provenance module과 tests

### 작업

1. retry 소진을 prerecord하고 `(repo, generation, failure_key)` stable identity의 type `bug`,
   priority `1` recovery Bead를 source Bead 없이 정확히 한 번 만든다. description에
   `repo-deployment:<canonical-repo>@generation:<G>` provenance를 기록하고 create/readback,
   queue bind, worktree와 session spawn crash window에서 existing artifact를 adopt한다.
2. 최초 `dispatch_repair`는 recovery Bead의 current preset 또는 workspace default로 truly
   fresh worktree/session을 만든다. 같은 recovery attempt의 manual/restart continuation만
   landed `UI-lbqw` resolver를 사용하고 runner mismatch는
   `prior_session|fresh_current|cancel` decision을 유지한다.
3. session output을 `retry_same|repair_pr_open|awaiting_confirmation|unrecoverable` structured
   disposition으로 제한한다. coordinator가 operation, failure key, repo/base/SHA/generation,
   recovery Bead/attempt와 target ownership을 검증한 뒤에만 outcome을 소비한다.
4. `retry_same`은 exact environment/service repair evidence 뒤 coordinator-owned provider
   retry로, `repair_pr_open`은 recovery PR의 기존 merge driver와 merged descendant desired
   request로 이어간다. credential, broad permission, ambiguous external effect와 malformed
   output은 mutation 없이 confirmation으로 보낸다.
5. Bead create, session spawn/monitor, outcome consume, repair PR/request와 confirmation을
   logical exactly-once CAS로 묶는다. secret/raw auth output은 queue, log, UI와 Bead에
   기록하지 않는다.

Verification: `npm test -- server/bd.test.js server/worker/deployment-recovery.test.js server/worker/completion-repair.test.js server/worker/exec-preset-coordinator.test.js server/worker/scheduler.test.js server/worker/session-monitor.test.js`

### Phase acceptance

- retry 소진 failure 하나당 recovery Bead/worktree/session/attempt가 각각 하나다.
- fresh dispatch와 continuation이 `UI-lbqw`의 서로 다른 cwd/session semantics를 지킨다.
- agent self-report만으로 provider state, success, retry 또는 sensitive mutation이 생기지
  않는다.

## Phase 4: current Beads UI의 compact disclosure와 notification

### 대상 seam

- `server/ws/worker-handlers.js`
- `server/ws/worker-handlers.last-event.test.js`
- `server/ws.worker-queue.test.js`
- `app/data/worker-queue-store.js`
- `app/main.worker-queue-sync.test.js`
- `app/main.ws-toast.test.js`
- `app/views/worker/index.js`
- `app/views/worker/index.test.js`
- `app/views/worker/lanes.js`
- `app/views/worker/lanes.test.js`
- `app/utils/toast.js`
- `app/utils/toast.test.js`
- `app/styles/tokens.css`
- `app/styles.css`

### 작업

1. server가 repo deployment row를 bounded/sanitized snapshot으로 projection한다. collapsed
   summary에는 state, repo, desired short SHA, 짧은 설명, included merge count만 노출하고
   expanded detail에는 timeline, recovery Bead/session tuple, log link와 context-valid action을
   제공한다. raw provider state file과 secret-bearing output은 노출하지 않는다.
2. Worker toolbar/KPI 아래와 five lanes 위에 current `tokens.css`, flat panel, chip, mono SHA,
   font scale과 6–10px spacing을 재사용하는 one-line disclosure strip을 렌더한다. 기본은
   collapsed이고 click/keyboard/ARIA disclosure로 같은 위치의 detail만 펼친다.
3. state를 `배포 대기|배포 중|재시도 N/2|복구 중|확인 필요|배포 완료` 하나로 표시한다.
   automatic path에서는 view-only action만 보이고 terminal/confirmation에서만
   `지금 재시도`, `복구 이어가기`와 exact confirmation action을 보인다. issue/PR deploy button은
   추가하지 않는다.
4. recovery prepared, awaiting confirmation, deployment succeeded transition에 queue revision
   기반 durable notification key를 기록하고 browser session당 toast를 한 번만 보인다.
   reconnect/restart duplicate toast와 browser-local expansion이 durable authority에 영향을
   주지 않게 한다.

Verification: `npm test -- server/ws/worker-handlers.last-event.test.js server/ws.worker-queue.test.js app/main.worker-queue-sync.test.js app/main.ws-toast.test.js app/views/worker/index.test.js app/views/worker/lanes.test.js app/utils/toast.test.js`

### Phase acceptance

- Worker 최상단에는 승인된 compact one-line strip 하나만 추가되고 상세는 사용자 disclosure
  뒤에만 보인다.
- keyboard/ARIA, narrow layout과 reconnect projection이 current UI 회귀 없이 동작한다.
- recovery notification은 durable transition 하나당 browser session에서 한 번만 보인다.

## Phase 5: crash E2E, managed retirement 회귀와 delivery

### 대상 seam

- focused unit/integration files from Phase 1–4
- repo-level deployment E2E fixture (new or landed `UI-lb58` integration seam 확장)
- active managed identifier checker/tests
- `app/main.bundle.js`
- `app/main.bundle.js.map`

### 작업

1. 두 issue의 merge/request/close가 one latest desired로 coalesce되는 fixture와 provider fail
   → retry 2회 → recovery session → environment repair → retry → success fixture를
   만든다. code/config regression은 recovery PR merge와 descendant desired success까지 기존
   merge driver로 완주한다.
2. request, retry prerecord/call/readback, recovery Bead create/readback/bind, session spawn,
   outcome consume, repair merge/request와 success observation 사이에 crash를 주입해 duplicate
   retry, Bead, session, PR, request, close와 notification이 없는지 검증한다.
3. active source에서 managed Adapter/reconciler/receipt/journal/runtime-marker reader/writer가
   0인지 dotfiles retirement checker와 targeted scan으로 확인한다. historical specs/plans와
   inert state는 검사 제외 규칙대로 보존하고 새 compatibility를 추가하지 않는다.
4. full validation과 deterministic frontend build를 수행하고 generated bundle/map을 포함해
   PR을 게시한다. merge 후 external deployment job status와 shared runtime의 exact
   process/source path/SHA/port/HTTP `/healthz.runtime`을 readback한다.

Verification: `npm run tsc && npm test && npm run lint && npm run prettier:write && npm run build && npm run all`, active managed checker, provider status/live runtime exact readback

### Phase acceptance

- issue close와 deployment recovery의 full crash matrix가 logical duplicate 0으로 green이다.
- full validation, generated bundle/map과 active managed scan이 green이다.
- completion report가 `issue_closed`와
  `deployment_pending|recovering|succeeded`를 구분하고, provider success와 live exact readback
  전에는 “배포까지 완료”라고 선언하지 않는다.

## Test scope

### RED → GREEN seam mapping

1. Phase 1: durable request binding 전후 issue close boundary, timeout three-way readback,
   closed-Bead non-reopen, shared generation의 independent cleanup.
2. Phase 2: 30초/120초 automatic retry, restart/repeated poll dedupe, higher generation
   supersede, malformed binding effect 0.
3. Phase 3: recovery Bead/create/spawn crash adoption, fresh dispatch와 continuation matrix,
   structured outcome allowlist, confirmation 전 sensitive mutation 0.
4. Phase 4: compact collapsed strip, click/keyboard disclosure, context-valid actions, current
   tokens/responsive layout, durable projection과 toast dedupe.
5. Phase 5: coalesced multi-issue E2E, environment repair same-SHA retry, code/config repair PR,
   all crash windows와 active managed reader/writer 0.

### 명시적 제외

- external `repo-deployer`, `repo-deployctl` provider 내부 state/execution 재구현
- `workspace|managed` Adapter, receipt, restart journal, runtime marker compatibility 복원
- workflow label/metadata 또는 `[deploy]` declaration schema 변경
- issue/PR별 deploy action과 multiple environment UI
- credential 생성·회전, broad permission mutation과 ambiguous external-effect 자동 반복
- historical specs/plans 또는 inert managed state 삭제

## Delivery gate

1. Phase마다 focused RED를 확인하고 GREEN 검증·controller full diff review 뒤 phase child를
   닫는다.
2. implementation review gate, full validation, source/generated diff check와 fork PR delivery를
   통과한다.
3. merge 뒤 `repo-deployctl status --repo <beads-ui> --json`의 exact repo/base/SHA/generation과
   shared server process path, listening port, `/healthz.runtime.source_sha`/source realpath를
   대조한다.
4. individual `UI-f17c` lifecycle은 durable deployment request와 cleanup/close로 끝나지만,
   작업 완료 보고는 external provider success와 live exact readback까지 별도 상태로 명시한다.
