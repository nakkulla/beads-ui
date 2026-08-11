# `worker-serial` 배타 실행과 일괄 설정·드래그 UI 구현 계획 (`UI-nrut`)

- Bead: `UI-nrut`
- Approved spec: `docs/superpowers/specs/2026-08-11-worker-serial-worker-ui-design.md@cfa8772e92437ca3224f06277f31af3d5776ad74`
- Route: `full_plan`
- Authoring base: `origin/main@cfa8772e92437ca3224f06277f31af3d5776ad74`
- Provider dependency: `dotfiles-sj12`의 canonical contract merge·install·close readback 뒤에만 실행한다.
- Eligibility: post-restart process path·port·HTTP 검증 residue 때문에 `worker-ineligible`을 유지하며 interactive controller가 실행·마감한다.

## Context

현재 Worker는 single queue와 workspace `slots` cap만 사용하고, 전역
`pr_wait_holds_slot` 토글은 큐 전체를 직렬화한다. 이 계획은 canonical exact
`worker-serial` label이 붙은 이슈만 queue 차례에서 exclusive barrier가 되게 하고,
durable `pr_wait`를 떠날 때까지 다른 lineage의 새 attempt 시작을 막는다. queue
dispatch뿐 아니라 manual resume, conflict, cleanup diagnosis, completion repair,
REVISE 시작도 같은 workspace atomic launch coordinator를 통과한다.

사용자는 waiting row checkbox로 여러 이슈를 선택하고 `일반 병렬` 또는
`머지까지 단독` dropdown을 적용한다. 순서는 기존 queue CAS protocol을 유지한 채
행의 grip drag로 하나씩 조정한다. Beads CLI/schema와 bulk write protocol은 바꾸지
않고 existing `label-add`/`label-remove`를 순차 사용한다.

구현은 한 `UI-nrut` worktree/branch/PR에서 네 phase를 순차 실행한다. Phase 1이
durable snapshot과 launch race를 닫고, Phase 2가 subscription 밖 waiting row의
tri-state label truth를 공급하며, Phase 3이 bulk/drag UI를 연결하고, Phase 4가
통합 race·frontend bundle을 봉인한다. execution selector는 구현 진입에서 한 번
resolve한다. Sol/xhigh controller가 설계·통합·full diff·최종 검증을 소유하고,
복잡한 scheduler leaf와 bounded UI/test leaf는 승인된 phase 경계 안에서만 위임할
수 있다. 현재 Plan Delivery 세션은 parent claim, child, worktree, 구현 수정을 만들지
않는다.

## Phase 1: durable serial lineage와 atomic launch coordinator

1. `server/worker/queue-store.test.js`와 `server/worker/scheduler.test.js`에 RED seam을
   먼저 추가한다. fresh `worker_serial` snapshot, legacy false, resume inheritance,
   physical ID가 다른 repair child의 `completion_root_id` 상속, serial 단독 dispatch,
   앞선 일반 batch drain, pending fence, active running/paused/`pr_wait` 차단을 현재
   구현이 보장하지 못함을 관측한다. `app/utils/worker-serial.test.js`에는 exact
   `worker-serial`, malformed/non-array false, `worker-ineligible` 독립성을 추가하고,
   scheduler에는 active serial label remove 유지와 running non-serial label add
   비소급 seam을 포함한다.
2. `app/utils/worker-serial.js`의 exact label helper를 server/client가 공유하고
   `Attempt.worker_serial`을 `queue-store.js` normalize/make/round-trip에 추가한다.
   ordinary lineage identity는 `bead_id`, completion-owned lineage는
   `completion_root_id ?? bead_id`로 계산하며 linked repair child는 root source
   attempt의 serial snapshot을 상속한다.
3. `server/worker/scheduler.js`에 workspace-scoped synchronous launch coordinator를
   추가한다. `pending_serial_bead`, exclusive reservation, ordinary launch
   reservations를 한 JS critical section에서 검사·기록하고, durable running/paused/
   `pr_wait` activity로 handoff한다. busy는 admission failure가 아니라 side-effect-free
   defer/rescan이며 prerecord 전 abort는 claim과 reservation을 함께 해제한다.
   authoritative rescan은 pending Bead의 label 제거, dequeue, ready 상실, admission
   refusal을 매번 재판정해 stale fence를 clear하거나 다음 eligible serial로
   recompute한다.
4. `runPass()`는 queue order상 serial 앞의 일반 candidate만 먼저 reserve한 뒤 scan을
   절단한다. dispatch 직전 authoritative label re-read가 serial로 바뀐 candidate는
   existing reservations를 drain 대상으로 두고 pending fence로 전환한다. blocked,
   unreadable, admission-refused serial은 기존 anti-starvation 규칙대로 skip한다.
   pending clear/recompute의 네 조건은 각각 focused scheduler test로 고정한다.
5. normal dispatch, manual resume, durable/external conflict, cleanup diagnosis,
   completion resume/repair, REVISE disposition의 첫 side effect 앞에 같은 guard를
   연결한다. same `serial_lineage_id`이면서 기존 resume/repair continuation ownership
   검증을 통과한 요청만 예외로 허용한다. same-ID fresh manual launch는 queue-owned
   exclusive reservation 전에는 거부한다. startup tick 전 수동 시작도 durable
   queue/attempt에서 pending/active fence를 먼저 재구성한다.

Verification: `npm test -- server/worker/queue-store.test.js
server/worker/scheduler.test.js server/worker/completion-repair.test.js
app/utils/worker-serial.test.js`와
`npm run tsc`가 통과한다.

## Phase 2: authoritative queue label projection과 mutation convergence

1. `server/worker/title-cache.test.js`, `server/ws.worker-title-decoration.test.js`,
   `server/ws.labels.test.js`에 RED assertions를 추가한다. Ready/Blocked 밖 waiting
   row label 부재, projection miss의 false 오판, label mutation 뒤 stale cache,
   successful `worker-serial` write 뒤 scheduler tick 부재를 각각 재현한다.
2. existing async `bd show` decoration owner가 issue title/time과 함께 normalized labels를
   캐시하도록 확장하고 `labelsFor()`/per-Bead invalidation을 제공한다. shared
   `decorateQueue()`는 queue/pr_wait/done ID의 partial
   `bead_labels: Record<bead_id,string[]>`를 내보내며 별도 `bd` process와 persisted
   queue field를 만들지 않는다.
3. projection miss/older server는 `worker_serial=null` unknown으로 유지한다. label
   mutation readback과 issue-store refresh는 해당 cache entry를 invalidate/refill하고
   coalesced fanout으로 다음 snapshot을 보낸다. scheduler enforcement는 projection이
   아니라 기존 authoritative `snapshotBead()` re-read만 신뢰한다.
4. generic label handler는 exact `worker-serial` add/remove가 `bd show --json`까지
   성공한 경우에만 label cache refresh와 scheduler tick을 요청한다. 다른 label과
   bd write/readback failure는 serial 전용 side effect를 만들지 않는다.

Verification: `npm test -- server/worker/title-cache.test.js
server/ws.worker-title-decoration.test.js server/ws.labels.test.js
server/worker/scheduler.test.js`와 `npm run tsc`가 통과한다.

## Phase 3: bulk 실행 방식 UI와 handle-only reorder

1. `app/views/worker/index.test.js`, `app/views/worker/lanes.test.js`에 RED seam을 먼저
   추가한다. waiting-only checkbox, tri-state serial chip/unknown hint, selection
   lifecycle, queue-order mutation, partial failure retention, grip-only drag와 mobile
   collapsed behavior가 현재 DOM에 없음을 확인한다. serial busy의
   `다른 작업 종료 대기 · 머지까지 단독` reason과 auto-merge OFF serial `pr_wait`
   hint도 현재 부재를 RED로 고정한다.
2. `buildModel()`이 server `bead_labels`와 live issue labels를 tri-state map으로
   합치고 waiting row에 `worker_serial: true|false|null`을 투영한다. known true는
   `머지까지 단독`, unknown은 `실행 방식 확인 중`을 표시하며 unknown을 일반 병렬로
   렌더하거나 no-op 판정에 쓰지 않는다. pending serial waiting reason과 active
   serial `pr_wait`의 auto-merge OFF hint를 기존 reason/hint surface에 연결한다.
3. `createWorkerView()`에 browser-local selected ID Set과 bulk toolbar를 추가한다.
   선택 ID를 current queue order로 정렬하고 모든 label state가 known인 뒤 existing
   `label-add`/`label-remove`를 한 번에 하나씩 보낸다. 전체 성공/no-op/부분 실패
   toast를 구분하고 실패 ID만 선택 상태로 남긴다.
4. queue row checkbox와 accessible grip의 event boundary를 분리한다. reorder는 grip에서
   시작한 single-row drag만 existing `worker-queue-reorder`와 CAS retry-once로 보내고,
   checkbox/dropdown/chip/action pointer는 detail open이나 drag를 시작하지 않는다.
5. `app/styles.css`에 selected row, bulk toolbar, serial/unknown chip, focus-visible,
   responsive layout을 기존 Worker palette로 추가한다. mobile queue pane collapsed면
   bulk controls를 렌더하지 않고, 선택 행 묶음 drag나 mobile 전용 위치 menu는
   추가하지 않는다.

Verification: `npm test -- app/views/worker/index.test.js
app/views/worker/lanes.test.js app/main.worker-queue-sync.test.js`와 `npm run tsc`,
`npm run lint`가 통과한다.

## Phase 4: race 통합, full verification과 frontend bundle

1. integrated scheduler tests에서 scan 뒤 label add, pending drain 중 manual launch,
   serial root→다른-ID repair child, restart recovery, abort cleanup, global
   `pr_wait_holds_slot` 조합을 함께 실행한다. label projection tests는 subscription 밖
   waiting row와 mutation invalidation/fanout을 UI model까지 연결한다.
2. `npm run prettier:write` 뒤 full repository `npm run tsc`, `npm test`, `npm run lint`,
   `npm run build`를 실행한다. frontend source와 같은 commit에서
   `app/main.bundle.js`·map을 생성하고 unrelated formatting/output을 diff에서 제외한다.
3. controller가 worktree `git status`, full diff, untracked paths, focused/full test
   evidence를 검토하고 owned changes만 intentional Korean commit으로 봉인한다.
   implementation gate는 네 phase의 integrated final HEAD 하나를 대상으로 하며,
   green 뒤 origin fork PR을 만들고 PR Delivery에서 멈춘다.

Verification: `npm run tsc`, `npm test`, `npm run lint`, `npm run build`,
`git diff --check`가 integrated HEAD에서 모두 통과하고 bundle/source가 같은 commit에
포함된다.

## Test scope

| Seam | Phase | RED | GREEN | 제외 |
| --- | --- | --- | --- | --- |
| A — label helper·attempt snapshot·root lineage | Phase 1 | exact helper가 없고 `worker_serial` 부재·physical ID 비교 때문에 serial root의 linked repair child가 차단되며 running label edit가 snapshot을 바꿀 수 있음 | exact helper, durable boolean normalize, label-edit 불변성, `completion_root_id ?? bead_id` identity·상속 구현 | arbitrary related/discovered-from Bead를 same lineage로 허용 |
| B — atomic admission | Phase 1·4 | `Promise.all` queue batch와 cap-exempt paths가 serial re-read 전후 함께 side effect를 시작하고 stale pending/same-ID fresh launch가 queue를 우회 | workspace reservation, pending clear/recompute, continuation ownership, all-start guard, abort cleanup으로 exclusive 보장 | session 전체 mutex, 별도 serial lane, external PR action 직렬화 |
| C — queue label truth | Phase 2·4 | Ready/Blocked 밖 waiting ID가 false로 투영되고 mutation 뒤 stale/no tick | partial `bead_labels`, unknown tri-state, invalidation/fanout, exact mutation tick | UI projection을 scheduler authority로 사용, queue.json label mirror |
| D — bulk selection·mutation | Phase 3 | waiting checkbox/toolbar가 없고 unknown/no-op/partial failure 수렴을 표현하지 못함 | queue-order sequential generic mutations와 selection/toast state machine 구현 | bulk write protocol, rollback transaction, multi-row group drag |
| E — handle-only reorder·responsive/fail-visible UI | Phase 3 | row 전체 drag가 checkbox/action gesture와 충돌하고 bulk controls·serial waiting reason/hint가 없음 | accessible grip-only CAS reorder, desktop/mobile toolbar, busy reason과 auto-merge OFF serial hint rendering | keyboard reorder 신설, mobile 위치 선택 menu |
| F — restart/global interaction | Phase 4 | active serial snapshot 복구, pending reconstruction, global hold 조합의 회귀를 검출하지 못함 | durable attempt+startup rescan과 기존 `pr_wait_holds_slot` tests를 함께 green | external overlay/merge queue FIFO 재설계 |

각 RED는 phase production edit 전에 실제 baseline failure를 확인한다. 환경 skip,
already-green assertion, UI snapshot-only golden은 행동 seam의 RED를 대신하지 않는다.
실제 `bd`, GitHub, shared service는 unit tests에서 주입 double을 사용하고 post-merge
runtime procedure에서만 실측한다.

## Delivery checks

실행 시작 전 `dotfiles-sj12` close와 `bd ready --json` dependency 해제를 확인한 뒤
parent를 claim하고 `.worktrees/UI-nrut`를 만든다. `worker-ineligible`은 post-restart
runtime readback residue가 남아 있으므로 유지한다. 각 phase child는 RED evidence →
최소 구현 → focused verification → controller full-diff review → intentional commit →
execution receipt 순서를 따른다.

PR merge 후 canonical `main`을 merged SHA로 fast-forward하고 그 checkout에서
`npm run build`를 다시 실행한다. secret 값을 출력하지 않고
`~/.config/bdui/config.toml`의 shared-service path와 configured port가 canonical
checkout과 맞는지 확인한 뒤 `bdui-shared restart`를 실행한다. 새 process command/cwd,
listening port, 기본 HTTP response가 모두 merged state를 증명해야 한다. 실패하면
`worker-ineligible`과 Bead를 유지하고 같은 merged `main`의 첫 실패 단계부터
재개한다. 세 readback이 모두 성공한 뒤에만 label을 제거하고 leaves-first completion
sweep으로 child와 `UI-nrut`을 닫는다.
