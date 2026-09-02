---
scope:
  - server/worker/scheduler.js
  - server/worker/attach.js
  - server/worker/workspace-activity.js
  - server/worker/foreign-blocker-status.js
  - docs/superpowers/specs/2026-08-28-worker-prerequisite-wait-tier-design.md
---

# Worker `waiting` 복귀 트리거 설계 — 선행이 닫히면 같은 rig든 foreign이든 사람 개입 없이 보통 후보로 돌아온다

- Bead: `UI-978d` (route `spec_backed`, `UI-cacf` 통합)
- 선행 스펙: `docs/superpowers/specs/2026-08-28-worker-prerequisite-wait-tier-design.md`
  (`UI-8jau`, 이하 "대기 tier 스펙"). 그 스펙 §4.5의 "`attach.js`의 `onIssuesChanged` 구독은
  손대지 않는다. 복귀 트리거는 별도 관측이 아니라 다음 tick의 보통 후보 선택이다"를 이 스펙이
  뒤집는다. `waiting` 계층의 정의·판정식·타일·fence는 그대로이고, 여기서 정하는 것은 **그 다음
  tick이 언제 나는가**뿐이다.
- 계약: dotfiles `workflow-state.yaml prerequisite_gate.worker_judgment.candidate_return =
  bd_ready_after_blocker_closed`. 복귀 판정은 요청 rig의 `bd ready` 하나이며 이 스펙은 그 판정을
  **언제 다시 묻는가**만 소유한다.
- 출처: 2026-08-30 `dotfiles-6qc7`(foreign blocker `Analysis-2zly` 02:34Z close 후 약 하루
  정지), 2026-08-31 `PROSTATE-0yz`(UI-cacf 실측).
- rev2 (스펙 리뷰 REVISE 반영): 재스캔의 bd 읽기를 `bd ready` 한 번으로 바꾸고(D1), 감시
  cooldown이 버리는 변경을 덮는 cover 실행을 두며(D4), "워크트리 bd 쓰기는 메인 감시에 안
  잡힌다"는 rev1의 사실 주장을 실측으로 정정했다(§1-2, §8).

## 1. 문제

`waiting` attempt는 fence가 없어 다음 pass에서 `bd ready`에 있으면 보통 후보로 dispatch된다
(대기 tier 스펙 D3). 그런데 그 pass를 부르는 원천이 없다.

| 원천 | 실제 동작 | 복귀에 쓸 수 있는가 |
| --- | --- | --- |
| `attach.js` `beadsChanges.fire()` (`watchDb`) | completion-intent metadata 재관측, parked 재개 스캔(`scheduler.onIssuesChanged`), hold 선 merge kick — **pass 없음** | 같은 rig의 `bd close`가 여기 잡히지만 pass가 안 돈다 |
| 같은 워크스페이스 세션 종료 (`onSessionDone` → `tick`) | pass가 돈다 | 같은 rig의 Worker 세션이 blocker를 닫은 경우만 |
| UI 액션 (`handleWorkerQueueArm` 등) | pass가 돈다 | 사람이 만져야 한다 |
| 재시작 (`startWorkerAttachment`) | `reconcile`은 죽은 attempt를 처분할 때만 tick — 처분할 것이 없으면 **pass 없음** | 정지 중 닫힌 blocker를 재관측하지 못한다 |
| 다른 rig의 어떤 이벤트 | 이 워크스페이스에 아무 신호도 오지 않는다 | foreign blocker는 구조적으로 항상 노출 |

실측(2026-09-02, bd `1.2.0-fork.1`, 이 저장소와 dotfiles)으로 확인한 사실이 설계를 좌우한다.

1. **fs 감시는 이슈 ID를 받는 bd 명령에 울리고, 읽기도 예외가 아니다.** Dolt 모드의
   `watchDb`는 `.beads/` 디렉터리를 보는데, `bd show <id>`는 읽기 전용이어도
   `.beads/last-touched`를 그 ID로 다시 쓴다. 반면 **`bd ready --json`·`bd list --json`·
   `bd dep list <id> --json`은 `last-touched`를 건드리지 않는다.** 따라서 재스캔이 `bd show`를
   부르면 그 읽기가 감시를 다시 울리지만, `bd ready`만 부르면 자기 이벤트가 없다.
2. **워크트리 안의 bd도 메인 rig의 `.beads`에 닿는다.** `.beads/config.yaml`이 tracked라
   `.worktrees/<id>/.beads/`가 존재하지만, `bd -C .worktrees/<id> show <id>`는 워크트리가
   아니라 **메인 체크아웃의 `.beads/last-touched`** 를 그 ID로 썼다(dotfiles
   `.worktrees/dotfiles-zn7l`에서 두 번 확인; 워크트리 `.beads`에는 `last-touched`가 생기지
   않았다). 즉 세션이 워크트리에서 부른 `bd close`는 메인 rig의 감시에 잡힌다. 이것은 bd
   버전의 `.beads` 해소 규칙에 달린 사실이므로 §4.2의 두 번째 publish 지점이 보험으로 남는다.
3. **감시 cooldown은 변경을 버린다.** `watchDb`는 콜백 뒤 `cooldown_ms`(기본 1초) 동안 도착한
   fs 이벤트를 무시한다(`server/watcher.js`). 어떤 이벤트로 `fire()`가 난 직후 1초 안에 blocker가
   닫히면 그 변경은 어디에도 통지되지 않는다. 트리거는 이 창을 스스로 덮어야 한다.
4. **요청 rig의 `bd ready`가 foreign blocker 닫힘을 반영한다**(UI-cacf 실측: 2zly close 뒤
   dotfiles의 `bd ready`가 6qc7을 돌려줌). 복귀 판정에 foreign 상태 조회는 필요 없다.
   `queryForeignBlockerStatus`는 정산 시점의 증명(대기 tier 스펙 §4.2)에만 쓰이고 이 스펙은
   그것을 부르지 않는다.

또한 등록된 워크스페이스는 전부 attachment가 된다(`server/index.js` `worker_roots` = 레지스트리
전체 + startup root). `waiting`으로 정산됐다는 것은 정산 시점에 owner rig가 visible이었다는
뜻이므로(`no_rig`면 판정 불가 → 기존 정산), foreign blocker의 owner rig는 같은 프로세스 안에
attachment로 살아 있다.

## 2. 목표와 비목표

목표

- 같은 rig blocker가 닫히면 `waiting` bead가 추가 큐 조작 없이 재디스패치된다(UI-cacf 수용 1).
- foreign rig blocker가 닫히면 유한·명시된 지연(§3 D4: 활동이 이어져도 최대 30초 + bd 지연)
  안에 재디스패치된다(수용 2).
- blocker가 열려 있으면 재디스패치도 bd 프로세스 폭증도 없다. 재관측 비용은 워크스페이스당
  `bd ready` 프로세스 수로 상한이 명시된다(수용 3).
- 재시작 뒤 정지 중 닫힌 blocker를 한 번 재관측한다.
- 파킹(`awaiting_user`) 재개 경로·retry ladder·기존 tick 원천은 불변(수용 4).

비목표

- 표시(선행 대기 타일의 blocker 상태 실시간 갱신·foreign rig 문자 표기·stale-work 처분 도달)는
  `UI-yue8`이 소유한다. 이 스펙은 타일을 건드리지 않고 admission 기록도 새로 쓰지 않는다.
- `waiting` 판정식·`failure-class.js`·fence·`TERMINAL_ATTEMPT_STATUSES` 변경 없음.
- 죽은 attempt 복구 경로(`disposeDeadAttempt`의 `session_ended_unresolved`)는 그대로.
- `server/watcher.js`의 cooldown 의미 변경. cooldown이 버린 변경을 감시가 후행 통지하게 바꾸면
  같은 `fire()`를 타는 parked 스캔(`readMetadata` = `bd show`)이 자기 읽기로 다시 울려 1초 주기
  루프가 된다. 그 창은 이 스펙의 재스캔이 §3 D4로 덮는다.
- 다른 머신이 central dolt에 직접 쓴 변경의 관측(§8 잔여).
- cadence 타이머. 대기 tier 스펙 §4.5와 UI-hk74가 배제한 원칙을 유지한다 — 이벤트가 없으면
  아무것도 돌지 않는다.

## 3. 결정 요약

| # | 결정 | 근거 |
| --- | --- | --- |
| D1 | 복귀 판정은 scheduler의 새 메서드 `rescanWaiting(workspace)` 하나다. 후보는 waiting 행뿐이고, 판정은 **워크스페이스당 `bd ready --json` 한 번**(새 bd dep `readyBeadIds`)으로 후보 ∩ ready ≠ ∅이면 **내부 `tickPass`** 1회다. not-ready에는 아무것도 쓰지 않는다 | §1-1: `bd ready`는 fs 이벤트를 만들지 않으므로 재스캔이 자기 감시를 울리지 않는다. 비용은 waiting 행 수와 무관하게 재스캔 1회당 프로세스 1개다. 판정을 pass와 같은 `bd ready` 소속 하나로 두어 "재스캔은 통과했는데 pass가 not-ready"가 생기지 않는다(pass의 `snapshotBead`도 같은 `bd ready`를 읽는다) |
| D2 | `tickPass`이지 `tick`이 아니다 — `dispatch_refused`를 비우지 않는다 | `tick`은 외부 개시 tick이며 dispatch 거부(worktree stale-work 등)를 다시 시도하게 한다. 그 거부는 durable admission으로 기록돼 사람의 처분(UI-yue8)을 기다리는 상태이고, bd 변경 이벤트가 그것을 되풀이 시도하면 거부마다 git probe 비용이 든다. 재스캔은 `dispatch_refused` bead를 후보에서도 뺀다 |
| D3 | 같은 rig 트리거는 `attach.js` `beadsChanges.fire()`의 네 번째 호출 `scheduler.rescanWaiting(key)`다 | 이미 있는 bd 변경 신호이고, 사람 CLI와 워크트리 세션의 `bd close`가 모두 잡히는 자리다(§1-2). 기존 세 호출은 그대로다 |
| D4 | 재스캔은 워크스페이스당 **leading + trailing cover** 로 돈다: 호출 시 실행 중이거나 cover가 예약돼 있지 않으면 즉시 1회 실행하고, 모든 호출은 cover 타이머를 `now + WAITING_RESCAN_COVER_MS(2_000)`로 다시 건다. 연속 호출 아래에서도 leading 실행 뒤 `WAITING_RESCAN_MAX_WAIT_MS(30_000)`가 지나면 cover가 강제로 돈다 | §1-3: cover는 `fire()` 뒤 1초 cooldown 창(+debounce 0.25초)이 끝난 다음 `bd ready`를 다시 읽으므로, 그 창에서 감시가 버린 변경도 판정된다(리뷰 finding 1). 마지막 호출 기준으로 다시 걸어야 나중 `fire()`의 cooldown 창까지 덮는다. max-wait는 bd 활동이 1.25초 간격보다 촘촘히 이어지는 동안 cover가 무한히 밀리는 것을 막는 상한이다. 비용 상한: 이벤트 burst당 `bd ready` 2회, 연속 활동 아래 30초당 2회, 이벤트 없으면 0회, waiting 행이 없으면 후보가 비어 bd를 읽지 않는다 |
| D5 | foreign 트리거는 프로세스 내 **워크스페이스 활동 버스**(새 모듈 `server/worker/workspace-activity.js`)다. publish 지점은 owner rig attachment의 `fire()`와 scheduler 외부 `tick()` 진입 두 곳. 수신 attachment는 waiting 행의 `cause_detail.blockers[].rig`(prefix)가 발신 root의 prefix와 같을 때만 재스캔한다 | owner rig의 bd 변경은 그 rig의 attachment만 본다. 팬아웃이 아니라 prefix 매칭이므로 무관한 rig의 활동은 in-memory 비교로 끝난다. 다른 rig의 `watchDb`를 추가 구독하지 않는다 — 그 rig의 attachment가 이미 보고 있다. `tick()` publish는 §1-2가 bd 버전 사실이라는 점에 대한 보험이다: Worker 세션 종료는 fs와 무관하게 Worker가 아는 사실이다 |
| D6 | prefix를 아직 모르면(`cachedIssuePrefixFor(root) === null`) 일치로 간주한다. 각 attachment는 시작 시 자기 prefix를 `prewarmIssuePrefix`한다 | 모름을 불일치로 읽으면 복귀를 놓친다. 일치로 읽어도 비용은 D4 안의 `bd ready`다. prewarm이 있으면 정상 상태에서는 모르는 prefix가 없다 |
| D7 | 재시작 복구는 `startWorkerAttachment` 끝의 `rescanWaiting` 1회다 | 정지 중 닫힌 blocker는 어느 이벤트에도 다시 오지 않는다. 한 번의 시작 시 재스캔은 cadence가 아니다 |

## 4. 서버

### 4.1 `scheduler.js` — `rescanWaiting(workspace)`

```
async function rescanWaiting(workspace):          // 공개 메서드 = 아래 throttle 껍데기
  throttle(workspace):
    if running[workspace] or cover_timer[workspace] armed:
      re-arm cover_timer to now + COVER_MS (max-wait 초과 시 즉시 실행으로 대체)
      return
    await runRescan(workspace); arm cover_timer to now + COVER_MS

async function runRescan(workspace):
  q = deps.store.snapshot(workspace)               // throw → log, return {checked:0, returned:0}
  lanes = queue ∪ serial_lanes entries (onIssuesChanged와 같은 집합)
  candidates = q.attempts 중
      status === 'waiting'
      ∧ latestImplementationAttempt(q, bead_id).attempt_id === attempt_id
      ∧ lanes.has(bead_id)
      ∧ ¬claimed ∧ ¬activeBeadIdsFrom(q) ∧ ¬leafPausedBeads(q) ∧ ¬dispatch_refused ∧ ¬cleanup_pending
  if candidates empty: return {checked:0, returned:0}          // bd를 부르지 않는다
  ready = await deps.bd.readyBeadIds()             // throw → log, return (다음 이벤트가 다시 묻는다)
  returned = candidates ∩ ready
  if returned non-empty: await tickPass(workspace)
  return { checked: candidates.size, returned: returned.size }
```

- `claimed`·`cleanup_pending`·`dispatch_refused`는 pass가 보는 그 Set이고 `activeBeadIdsFrom`·
  `leafPausedBeads`·`latestImplementationAttempt`는 기존 함수다. 새 판정 함수는 없다.
- `deps.bd.readyBeadIds(): Promise<Set<string>>`는 scheduler `bd` dep typedef에 **optional**로
  더한다(`readIssue`와 같은 방식). `attach.js`의 `createLiveBd`는 `snapshotBead`가 이미 부르는
  `bd ready --limit 1000 --json` + `readyRows`/`readyIdSet`을 그대로 써서 구현한다. 미배선이면
  `rescanWaiting`은 아무것도 하지 않고 `{checked:0, returned:0}`을 돌려준다(fail-quiet).
- ready인 bead를 직접 dispatch하지 않고 `tickPass`에 맡기는 이유: 슬롯 계산·직렬 레인 head
  규칙·armed_only 축소·admission·claim은 전부 pass의 것이고, 재스캔이 그 일부를 복제하면 두
  경로가 갈린다. `tickPass`는 이미 coalesced drain이라 drain 중 호출도 rescan 표시 뒤 같은
  promise를 돌려주므로 안전하다.
- not-ready에는 admission 기록을 쓰지 않는다. `bd ready` 부재만으로는 status를 모르므로
  `not_ready:<status>` 토큰을 만들 수 없고, `not_ready:unknown`은 사람에게 잘못된 진단이다.
  재관측 시각은 `debug` 로그(`worker:scheduler`)에 남긴다. 보드 표시는 UI-yue8.
- throttle 상태는 workspace당 `{ running: boolean, cover_timer, leading_at }`이다. cover 타이머는
  `unref`한다. cover 실행 자체는 새 cover를 걸지 않는다 — 실행 중 새 호출이 오면 그 호출이
  다시 건다. 상수 `WAITING_RESCAN_COVER_MS = 2_000`, `WAITING_RESCAN_MAX_WAIT_MS = 30_000`은
  테스트 seam `deps.waitingRescan = { cover_ms, max_wait_ms }`로 바꿀 수 있고 production은
  기본값만 쓴다.
- 반환값 `{checked, returned}`는 테스트가 "bd를 몇 번 읽었는가"를 고정하는 용도이며 UI로
  나가지 않는다.

**자기 루프가 없는 이유(§1-1).** 재스캔의 유일한 bd 호출 `bd ready`는 `last-touched`를 쓰지
않는다. 복귀가 성립해 `tickPass`가 돌면 pass의 `bd show`들이 감시를 울려 `fire()` → 재스캔이
한 번 더 오지만, 그 재스캔은 `bd ready` 1회로 끝나고(bead는 이미 dispatch되어 후보가 아니다)
더 이상 이벤트를 만들지 않는다. parked 스캔의 `readMetadata`가 만드는 이벤트는 감시 cooldown이
삼키며, 그것은 이 스펙 이전과 같다.

### 4.2 `scheduler.js` — `tick()`의 활동 publish

`tick(workspace)` 진입에서 `deps.publishActivity(workspace)`를 부른다. 기본값은
`workspace-activity.js`의 `publishWorkspaceActivity`이고 테스트는 seam으로 바꾼다. `tickPass`·
`runPass`·`requestRescan`·`rescanWaiting`에서는 부르지 않는다 — 내부 재스캔이 publish하면
서로를 blocker로 둔 두 rig가 재스캔을 주고받는다(D4로 유한하지만 이유 없는 비용).

`tick`은 외부 개시 tick의 유일한 입구이며 세션 종료·UI 액션·재시작 처분이 전부 여기를 지난다.
그 워크스페이스에서 무언가 끝났거나 사람이 만졌다는 뜻이므로 "이 rig의 bead 상태가 바뀌었을 수
있다"의 근사로 충분하다. 정확한 "닫힘" 이벤트가 아니어도 되는 이유는 판정이 수신측의 `bd
ready`이기 때문이다.

### 4.3 `workspace-activity.js` (신규)

```js
export function publishWorkspaceActivity(root)        // 리스너 각각을 try/catch로 호출, 예외는 log
export function onWorkspaceActivity(listener)         // (root: string) => void, unsubscribe 반환
export function __resetWorkspaceActivityForTest()
```

`foreign-blocker-status.js`의 `onForeignBlockerResolved`와 같은 모양의 프로세스 로컬 리스너
집합이다. 그 모듈에 넣지 않는 이유: 그쪽은 blocker 상태 해소기이고 이것은 워크스페이스 활동
신호라 답하는 질문이 다르다. `root`는 `path.resolve`된 워크스페이스 root(`attach.js` `keyFor`와
같은 키)다.

### 4.4 `attach.js`

- `createLiveBd`에 `readyBeadIds()`를 더한다(§4.1). `snapshotBead`의 `bd ready` 호출과
  파싱을 한 내부 함수로 빼서 둘이 같은 명령·같은 파서를 쓴다.
- `beadsChanges.fire()`에 두 호출을 더한다(기존 셋 뒤, 각각 `Promise.resolve(...).catch(log)`):
  1. `scheduler.rescanWaiting(keyFor(workspace_root))` (D3)
  2. `publishWorkspaceActivity(keyFor(workspace_root))` (D5)
- `beadsChanges.start()`에서 활동 버스를 구독하고 `stop()`에서 해제한다. 구독 핸들은 `handle`
  옆의 두 번째 필드다. 리스너:
  ```
  (root) => {
    if (root === key) return;                                   // 자기 rig는 fire()가 이미 처리
    if (!holdsWaitingOn(root)) return;
    void scheduler.rescanWaiting(key).catch(log)
  }
  ```
  `holdsWaitingOn(root)`: `runtime.queueStore.snapshot(key).attempts` 중 `status === 'waiting'`
  이고 `cause_detail.blockers[]`에 `rig !== null`인 항목이 있는 attempt에 대해, `rig ===
  cachedIssuePrefixFor(root)` 또는 `cachedIssuePrefixFor(root) === null`(D6)이면 true. 이 판정은
  in-memory 스냅샷과 prefix 캐시 읽기뿐이며 bd를 부르지 않는다. latest-attempt·레인 소속은
  `rescanWaiting`이 다시 거르므로 여기서는 보지 않는다(거짓 양성은 D4 안의 `bd ready` 1회).
- `start()`에서 `prewarmIssuePrefix(key)`를 부른다(D6). 실패는 캐시 모듈이 이미 fail-quiet다.
- `startWorkerAttachment` 끝, `beadsChanges.start()` 뒤에 `void att.scheduler.rescanWaiting(key)`
  (D7). 실패는 log.
- `__resetWorkerAttachmentsForTest`는 `beadsChanges.stop()`을 이미 부르므로 구독 해제가 따라온다.

### 4.5 대기 tier 스펙 §4.5 정정

`2026-08-28-worker-prerequisite-wait-tier-design.md` §4.5의 마지막 항목 아래에 정정 한 줄을
더한다: "**정정(UI-978d).** `onIssuesChanged` 구독을 손대지 않는다는 결정은
`2026-09-02-worker-waiting-return-trigger-design.md`가 뒤집었다 — `fire()`가 `rescanWaiting`을
부르고 foreign rig 활동은 워크스페이스 활동 버스로 관측한다. 판정이 `bd ready`라는 점과 fence
없음은 그대로다."

## 5. 재현

- **6qc7 (foreign).** dotfiles waiting 행 `blockers=[{id: Analysis-2zly, rig: 'Analysis'}]`.
  microbiome_bile rig에서 사람이 `bd close Analysis-2zly`(메인 체크아웃이든 워크트리든, §1-2) →
  그 rig의 `.beads/last-touched` 변경 → 그 attachment의 `fire()` →
  `publishWorkspaceActivity(<mb root>)` → dotfiles attachment 리스너: `cachedIssuePrefixFor(<mb
  root>) === 'Analysis'` 일치 → `rescanWaiting(dotfiles)` → `readyBeadIds()` ∋ `dotfiles-6qc7` →
  `tickPass` → 새 attempt. Worker 세션이 닫은 경우는 그 세션의 `onSessionDone` → `tick` →
  publish로도 같은 경로다. 지연 상한: `watchDb` debounce 0.25초 + bd 지연; 활동이 이어지면
  D4 max-wait 30초.
- **같은 rig.** `bd close <blocker>` → `fire()` → `rescanWaiting` → ready → `tickPass`.
- **cooldown 창 (finding 1).** 어떤 bd 명령으로 `fire()`가 난 T에 재스캔이 not-ready를 보고,
  T+0.5초에 `bd close <blocker>` → 감시는 cooldown이라 이벤트를 버린다 → 그러나 T의 호출이
  건 cover가 T+2초에 `bd ready`를 다시 읽어 ready를 본다 → `tickPass`.
- **blocker 열림.** `fire()`마다 재스캔이 불리지만 leading 1회 + cover 1회의 `bd ready`로
  끝난다. 다른 큐 항목은 읽지 않고 아무것도 쓰지 않는다.
- **stale-work 거부(PROSTATE-0yz).** blocker 닫힘 → 재스캔 → ready → `tickPass` → dispatch가
  `worktree_stale_work`로 거부·`dispatch_refused`에 등록. 이후 이벤트에서 재스캔은 그 bead를
  후보에서 빼므로 후보가 비면 bd를 읽지 않는다. 처분은 UI-yue8.
- **재시작.** 정지 중 blocker 닫힘 → 시작 시 `rescanWaiting` 1회 → ready → 새 attempt.

## 6. 검증 bundle

- `server/worker/scheduler.test.js` (기존 `scheduler prerequisite wait` describe 옆에 새 describe;
  fake bd에 `readyBeadIds`를 더해 `config.<id>.ready`로 답하게 한다):
  (a) waiting 정산 뒤 `config.S1.ready = true`로 바꾸고 `rescanWaiting` → 새 attempt가 뜬다,
  `tick` 호출 없이·`dispatch_refused` 유지; (b) `ready=false`면 attempt 없음·`readyBeadIds` 1회·
  `snapshotBead` 0회·admission 기록 없음; (c) waiting 행이 없으면 `readyBeadIds`를 부르지 않는다;
  (d) fake timers로 — 연속 호출 셋이 leading 1회로 모이고 cover가 마지막 호출 +2초에 1회 돈다;
  cover 창 안의 호출이 cover를 뒤로 민다; 연속 호출이 30초를 넘기면 cover가 강제로 돈다;
  cover 실행이 새 cover를 걸지 않는다; (e) `dispatch_refused`에 있는 bead는 후보가 아니다;
  (f) `tick()`이 `publishActivity(workspace)`를 부르고 `rescanWaiting`의 `tickPass`는 부르지
  않는다; (g) `readyBeadIds` 미배선이면 `{checked:0, returned:0}`; (h) `onIssuesChanged`의
  parked 재개 케이스 기존 테스트 불변.
- `server/worker/attach.test.js`: (i) `fire()`가 `scheduler.rescanWaiting`과
  `publishWorkspaceActivity`를 부른다; (j) 다른 root의 활동 — prefix 일치 → `rescanWaiting` 호출,
  불일치 → 미호출, 미확인(null) → 호출, 자기 root → 미호출; (k) `startWorkerAttachment`가
  `rescanWaiting`을 한 번 부른다; (l) `stop()` 뒤에는 활동이 와도 부르지 않는다;
  (m) `createLiveBd().readyBeadIds()`가 `bd ready --limit 1000 --json`을 한 번 부르고 id 집합을
  돌려주며 실패에 throw한다.
- `server/worker/workspace-activity.test.js`: publish가 리스너를 부르고, unsubscribe 뒤에는 안
  부르며, 던지는 리스너가 다른 리스너를 막지 않는다.
- `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120초) · `npm run lint` ·
  `npm run prettier:write` → `npm run build` 뒤 `app/main.bundle.js{,.map}` 변경 없음(서버
  코드만).
- 실제 화면: 공유 서버 배포 뒤, waiting 행이 있는 워크스페이스에서 blocker를 닫고 클릭 없이
  새 attempt가 뜨는 것(같은 rig 1회, foreign 1회)을 Worker 탭 스크린샷으로 남긴다.

## 7. 구현 unit 후보

한 unit이다: `server/worker/workspace-activity.js` → `scheduler.js rescanWaiting`·`tick` publish →
`attach.js` 배선(`readyBeadIds` 포함) → 대기 tier 스펙 정정. 새 모듈은 리스너 집합 하나라
분리할 이유가 없다.

## 8. 경계·후속

- 관찰: 다른 머신이 central dolt에 직접 쓴 변경은 이 프로세스의 어느 fs 감시에도 오지 않는다.
  그 rig의 세션 종료 tick이나 사람의 UI 조작이 남은 경로이며, 서버 리스트 refresh 폴러
  (`poll_interval_seconds`)는 Worker 큐를 건드리지 않는다. — 단일 머신 운영이라 이번 범위 밖.
- 관찰: §1-2는 bd `1.2.0-fork.1`의 `.beads` 해소 실측이다. 워크트리의 `.beads`를 따로 쓰는 bd
  버전에서는 워크트리 안의 **사람** `bd close`가 메인 감시에 안 잡힌다(Worker 세션 종료는
  D5의 `tick()` publish가 덮는다). 그 경우 다음 외부 tick까지 기다린다(fail-quiet).
- 관찰: `waiting` 정산 뒤 owner rig가 레지스트리에서 빠지거나 숨겨지면 활동 신호가 없다. 요청
  rig의 `bd ready`는 여전히 맞으므로 다음 외부 tick에 돌아온다(fail-quiet).
- 관찰: `watchDb`가 `bd show` 읽기에도 울리고 cooldown이 변경을 버리는 것은 이 스펙이 D1·D4로
  감당할 뿐 고치지 않는다. `onIssuesChanged`의 parked 스캔은 같은 신호에서 `readMetadata`를
  부르고 같은 cooldown 창에 노출돼 있지만 이 스펙의 범위 밖이다.
- 표시(선행 대기 타일 blocker 상태 갱신·foreign rig 표기·stale-work 처분 도달)는 `UI-yue8`.

## 결정 (ADR 후보)

- `waiting` 복귀 트리거는 이벤트 구독(같은 rig fs 감시 + owner rig 활동 버스)과 워크스페이스당
  leading+cover 재스캔이며, 판정은 요청 rig의 `bd ready` 한 번이고 cadence 타이머는 두지 않는다
  — 되돌리기 어려움: 성립(활동 버스와 `tick` publish 지점이 attachment 수명에 결속되고, 나중에
  cadence를 더하면 두 트리거가 공존해 비용 상한 서술이 깨진다) / 맥락 없이 놀라움: 성립(fs
  감시가 읽기에도 울리는데 왜 폭증하지 않는가 — `bd ready`만 읽기 때문이고, foreign은 왜 그
  rig의 DB를 직접 보지 않는가 — 그 rig의 attachment가 이미 보기 때문이다) / 실제 트레이드오프:
  성립(cover 2초·max-wait 30초만큼 복귀가 늦어질 수 있는 대신 bd 비용이 burst당 2회로
  상한된다). `summary`: "Worker의 waiting 복귀는 cadence가 아니라 이벤트 구독이다 — 같은 rig는
  bd 변경 감시, foreign은 owner rig의 활동 버스가 요청 rig의 재스캔을 부르고, 재스캔은
  워크스페이스당 leading+cover throttle 안에서 `bd ready` 한 번으로 판정한다". 대기 tier 스펙의
  ADR 후보("waiting은 터미널 결말이며 복귀는 보통 후보 dispatch")와 충돌하지 않는다 — 그
  결정의 "다음 tick"을 이 결정이 공급한다. ADR 0017(parked 비자동 복귀)과도 충돌하지 않는다 —
  이 트리거는 `waiting` 행만 후보로 삼는다. → ADR
