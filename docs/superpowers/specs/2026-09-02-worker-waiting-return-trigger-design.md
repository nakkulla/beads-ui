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

## 1. 문제

`waiting` attempt는 fence가 없어 다음 pass에서 `bd ready`에 있으면 보통 후보로 dispatch된다
(대기 tier 스펙 D3). 그런데 그 pass를 부르는 원천이 없다.

| 원천 | 실제 동작 | 복귀에 쓸 수 있는가 |
| --- | --- | --- |
| `attach.js` `beadsChanges.fire()` (`watchDb`) | completion-intent metadata 재관측, parked 재개 스캔(`scheduler.onIssuesChanged`), hold 선 merge kick — **tick 없음** | 같은 rig의 사람 CLI `bd close`가 여기 잡히지만 pass가 안 돈다 |
| 같은 워크스페이스 세션 종료 (`onSessionDone` → `tick`) | pass가 돈다 | 같은 rig의 Worker 세션이 blocker를 닫은 경우만 |
| UI 액션 (`handleWorkerQueueArm` 등) | pass가 돈다 | 사람이 만져야 한다 |
| 재시작 (`startWorkerAttachment`) | `reconcile`은 죽은 attempt를 처분할 때만 tick — 처분할 것이 없으면 **pass 없음** | 정지 중 닫힌 blocker를 재관측하지 못한다 |
| 다른 rig의 어떤 이벤트 | 이 워크스페이스에 아무 신호도 오지 않는다 | foreign blocker는 구조적으로 항상 노출 |

실측으로 확인한 사실 세 가지가 설계를 좌우한다.

1. **fs 감시는 읽기에도 울린다.** Dolt 모드의 `watchDb`는 `.beads/` 디렉터리를 보는데, 읽기
   전용 `bd show`도 `.beads/last-touched`를 다시 쓴다(2026-09-02 실측, 이 저장소). 따라서
   재스캔이 bd를 읽으면 그 읽기가 다시 감시를 울린다. `watchDb`의 cooldown 1초 안에 끝나는
   읽기는 삼켜지지만 Dolt `bd ready`는 그보다 길 수 있으므로, 상한 없는 재스캔은 bd 프로세스
   자기 루프가 된다.
2. **워크트리 세션의 bd 쓰기는 메인 rig 감시에 안 잡힌다.** `.beads/config.yaml`이 tracked라
   `.worktrees/<id>/.beads/`가 존재하고 그 안의 세션이 부른 `bd`는 워크트리의 `.beads`에
   닿는다. 같은 rig는 세션 종료 tick이 이미 덮는다. foreign rig는 그 rig의 **세션 종료 tick**도
   신호로 써야 한다.
3. **요청 rig의 `bd ready`가 foreign blocker 닫힘을 반영한다**(UI-cacf 실측: 2zly close 뒤
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
- foreign rig blocker가 닫히면 유한·명시된 지연(§3 D4의 floor, 30초) 안에 재디스패치된다(수용 2).
- blocker가 열려 있으면 재디스패치도 bd 프로세스 폭증도 없다. 재관측 비용은 waiting 행 수에
  비례하고 상한이 명시된다(수용 3).
- 재시작 뒤 정지 중 닫힌 blocker를 한 번 재관측한다.
- 파킹(`awaiting_user`) 재개 경로·retry ladder·기존 tick 원천은 불변(수용 4).

비목표

- 표시(선행 대기 타일의 blocker 상태 실시간 갱신·foreign rig 문자 표기·stale-work 처분 도달)는
  `UI-yue8`이 소유한다. 이 스펙은 타일을 건드리지 않는다.
- `waiting` 판정식·`failure-class.js`·fence·`TERMINAL_ATTEMPT_STATUSES` 변경 없음.
- 죽은 attempt 복구 경로(`disposeDeadAttempt`의 `session_ended_unresolved`)는 그대로.
- 다른 머신이 central dolt에 직접 쓴 변경의 관측(§8 잔여).
- cadence 타이머. 대기 tier 스펙 §4.5와 UI-hk74가 배제한 원칙을 유지한다 — 이벤트가 없으면
  아무것도 돌지 않는다.

## 3. 결정 요약

| # | 결정 | 근거 |
| --- | --- | --- |
| D1 | 복귀 판정은 scheduler의 새 메서드 `rescanWaiting(workspace)` 하나다. 후보는 waiting 행뿐이고, 판정은 pass와 같은 `snapshotBead` → `ready && !blocked`이며, 하나라도 ready면 **내부 `tickPass`** 1회다 | 전체 pass는 큐 길이만큼 bd를 읽는다. waiting 행만 읽으면 비용이 waiting 행 수에 비례한다(수용 3). 판정을 pass와 같은 함수·같은 조건으로 두어 "재스캔은 통과했는데 pass가 거부"하는 두 판정을 만들지 않는다 |
| D2 | `tickPass`이지 `tick`이 아니다 — `dispatch_refused`를 비우지 않는다 | `tick`은 외부 개시 tick이며 dispatch 거부(worktree stale-work 등)를 다시 시도하게 한다. 그 거부는 durable admission으로 기록돼 사람의 처분(UI-yue8)을 기다리는 상태이고, bd 변경 이벤트가 그것을 되풀이 시도하면 거부마다 git probe 비용이 든다. 재스캔은 `dispatch_refused` bead를 후보에서도 뺀다 |
| D3 | 같은 rig 트리거는 `attach.js` `beadsChanges.fire()`의 네 번째 호출 `scheduler.rescanWaiting(key)`다 | 이미 있는 bd 변경 신호이고, 사람 CLI `bd close`가 잡히는 유일한 자리다. 기존 세 호출은 그대로다 |
| D4 | 재스캔은 bead당 **trailing throttle** `WAITING_RECHECK_FLOOR_MS = 30_000`을 가진다. floor 안에 온 호출은 버리지 않고 만료 시점의 한 번으로 모은다 | §1-1의 자기 루프를 끊는다. 이벤트를 버리면 "blocker가 자기 읽기 직후 30초 안에 닫힌" 경우 다음 이벤트까지 멈춰 수용 1을 어긴다. 모으면 모든 이벤트가 floor 안에 한 번은 판정된다. 최악(자기 읽기가 cooldown보다 길 때)은 waiting 행이 있는 동안만 30초당 행당 bd 2회로 수렴하며, 행이 없으면 0이다 |
| D5 | foreign 트리거는 프로세스 내 **워크스페이스 활동 버스**(새 모듈 `server/worker/workspace-activity.js`)다. publish 지점은 owner rig attachment의 `fire()`와 scheduler 외부 `tick()` 진입 두 곳. 수신 attachment는 waiting 행의 `cause_detail.blockers[].rig`(prefix)가 발신 root의 prefix와 같을 때만 재스캔한다 | §1-2: 워크트리 세션의 `bd close`는 owner의 세션 종료 tick으로만 관측된다. 팬아웃이 아니라 prefix 매칭이므로 무관한 rig의 활동은 in-memory 비교로 끝난다. 다른 rig의 `watchDb`를 추가 구독하지 않는다 — 그 rig의 attachment가 이미 보고 있다 |
| D6 | prefix를 아직 모르면(`cachedIssuePrefixFor(root) === null`) 일치로 간주한다. 각 attachment는 시작 시 자기 prefix를 `prewarmIssuePrefix`한다 | 모름을 불일치로 읽으면 복귀를 놓친다. 일치로 읽어도 비용은 throttle 안의 bd 2회다. prewarm이 있으면 정상 상태에서는 모르는 prefix가 없다 |
| D7 | 재시작 복구는 `startWorkerAttachment` 끝의 `rescanWaiting` 1회다 | 정지 중 닫힌 blocker는 어느 이벤트에도 다시 오지 않는다. 한 번의 시작 시 재스캔은 cadence가 아니다 |
| D8 | 재스캔은 pass와 같은 admission 기록을 남긴다: not-ready면 `dequeueIfClosed` → `recordSkipReason(notReadyReason(snap))`, snapshot 실패면 `bd_snapshot_failed` | UI-cacf의 진단은 "admission 마지막 기록이 blocker 닫히기 전 그대로"였다. 재관측 시각이 기록에 보여야 "안 돈 것"과 "돌았는데 아직 아님"을 사람이 구분한다 |

## 4. 서버

### 4.1 `scheduler.js` — `rescanWaiting(workspace)`

```
async function rescanWaiting(workspace):
  q = deps.store.snapshot(workspace)               // throw → log, return {checked:0, returned:0}
  lanes = queue ∪ serial_lanes entries (onIssuesChanged와 같은 집합)
  candidates = q.attempts 중
      status === 'waiting'
      ∧ latestImplementationAttempt(q, bead_id).attempt_id === attempt_id
      ∧ lanes.has(bead_id)
      ∧ ¬claimed ∧ ¬activeBeadIdsFrom(q) ∧ ¬leafPausedBeads(q) ∧ ¬dispatch_refused ∧ ¬cleanup_pending
  throttle (D4): due = candidates 중 now - last_at[bead] ≥ FLOOR
                 나머지는 trailing timer 하나(unref)로 floor 만료 때 rescanWaiting 재호출
  for bead in due:
    last_at[bead] = now
    snap = await deps.bd.snapshotBead(bead)        // throw → recordSkipReason('bd_snapshot_failed'), continue
    if !snap.ready || snap.blocked:
      if !dequeueIfClosed(workspace, bead, snap): recordSkipReason(workspace, bead, notReadyReason(snap))
      continue
    returned += 1
  if returned > 0: await tickPass(workspace)
  return { checked: due.length, returned }
```

- `claimed`·`cleanup_pending`·`dispatch_refused`는 pass가 보는 그 Set이고 `activeBeadIdsFrom`·
  `leafPausedBeads`·`latestImplementationAttempt`·`dequeueIfClosed`·`recordSkipReason`·
  `notReadyReason`은 모두 기존 함수다. 새 판정 함수는 없다.
- ready인 bead를 직접 dispatch하지 않고 `tickPass`에 맡기는 이유: 슬롯 계산·직렬 레인 head
  규칙·armed_only 축소·admission·claim은 전부 pass의 것이고, 재스캔이 그 일부를 복제하면 두
  경로가 갈린다. `tickPass`는 이미 coalesced drain이라 겹치는 호출도 안전하다.
- throttle 상태는 `Map<bead_id, number>`(마지막 bd 읽기 시각)와 workspace당 trailing timer
  하나다. 재스캔 때마다 후보가 아닌 bead의 항목은 지운다(새 attempt가 뜨면 latest가 바뀌어
  후보에서 빠진다). timer는 `unref`해 프로세스 종료를 막지 않는다.
- `FLOOR`는 모듈 상수 `WAITING_RECHECK_FLOOR_MS = 30_000`. 테스트 seam으로
  `deps.waitingRecheckFloorMs`를 받되 production은 기본값만 쓴다.
- 반환값 `{checked, returned}`는 테스트가 "bd를 몇 번 읽었는가"를 고정하는 용도이며 UI로
  나가지 않는다.

### 4.2 `scheduler.js` — `tick()`의 활동 publish

`tick(workspace)` 진입에서 `deps.publishActivity(workspace)`를 부른다. 기본값은
`workspace-activity.js`의 `publishWorkspaceActivity`이고 테스트는 seam으로 바꾼다. `tickPass`·
`runPass`·`requestRescan`에서는 부르지 않는다 — 내부 재스캔이 publish하면 서로를 blocker로 둔
두 rig가 재스캔을 주고받는다(throttle로 유한하지만 이유 없는 비용).

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
  `rescanWaiting`이 다시 거르므로 여기서는 보지 않는다(거짓 양성은 throttle 안의 bd 2회).
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
  microbiome_bile rig에서 사람이 메인 체크아웃에서 `bd close Analysis-2zly` → 그 rig의
  `.beads/last-touched` 변경 → 그 attachment의 `fire()` → `publishWorkspaceActivity(<mb root>)` →
  dotfiles attachment 리스너: `cachedIssuePrefixFor(<mb root>) === 'Analysis'` 일치 →
  `rescanWaiting(dotfiles)` → `snapshotBead(dotfiles-6qc7).ready === true` → `tickPass` → 새
  attempt. 세션이 worktree에서 닫은 경우는 그 세션의 `onSessionDone` → `tick` → publish로 같은
  경로다. 지연 상한: `watchDb` debounce 0.25초 + throttle 최대 30초.
- **같은 rig (사람 CLI).** `bd close <blocker>` → `fire()` → `rescanWaiting` → ready → `tickPass`.
- **blocker 열림.** `fire()`마다 재스캔이 불리지만 throttle이 30초당 한 번으로 모으고, 그 한 번은
  `snapshotBead` 1회 + `not_ready:open` 기록이다. 다른 큐 항목은 읽지 않는다.
- **stale-work 거부(PROSTATE-0yz).** blocker 닫힘 → 재스캔 → ready → `tickPass` → dispatch가
  `worktree_stale_work`로 거부·`dispatch_refused`에 등록. 이후 이벤트에서 재스캔은 그 bead를
  후보에서 빼므로 bd를 다시 읽지 않는다. 처분은 UI-yue8.
- **재시작.** 정지 중 blocker 닫힘 → 시작 시 `rescanWaiting` 1회 → ready → 새 attempt.

## 6. 검증 bundle

- `server/worker/scheduler.test.js` (기존 `scheduler prerequisite wait` describe 옆에 새 describe):
  (a) waiting 정산 뒤 `config.S1.ready = true`로 바꾸고 `rescanWaiting` → 새 attempt가 뜬다,
  `tick` 호출 없이; (b) `ready=false`면 attempt 없음·admission `not_ready:open` 기록·
  `snapshotBead`는 S1 1회뿐(같은 큐의 다른 항목은 읽지 않음); (c) fake timers로 floor 안의 두
  호출이 bd 1회로 모이고 만료 시 trailing 1회가 돈다; (d) `dispatch_refused`에 있는 bead는
  읽지 않는다; (e) `tick()`이 `publishActivity(workspace)`를 부르고 `rescanWaiting`의 `tickPass`는
  부르지 않는다; (f) `onIssuesChanged`의 parked 재개 케이스 기존 테스트 불변.
- `server/worker/attach.test.js`: (g) `fire()`가 `scheduler.rescanWaiting`과
  `publishWorkspaceActivity`를 부른다; (h) 다른 root의 활동 — prefix 일치 → `rescanWaiting` 호출,
  불일치 → 미호출, 미확인(null) → 호출, 자기 root → 미호출; (i) `startWorkerAttachment`가
  `rescanWaiting`을 한 번 부른다; (j) `stop()` 뒤에는 활동이 와도 부르지 않는다.
- `server/worker/workspace-activity.test.js`: publish가 리스너를 부르고, unsubscribe 뒤에는 안
  부르며, 던지는 리스너가 다른 리스너를 막지 않는다.
- `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120초) · `npm run lint` ·
  `npm run prettier:write` → `npm run build` 뒤 `app/main.bundle.js{,.map}` 변경 없음(서버
  코드만).
- 실제 화면: 공유 서버 배포 뒤, waiting 행이 있는 워크스페이스에서 blocker를 닫고 클릭 없이
  새 attempt가 뜨는 것(같은 rig 1회, foreign 1회)을 Worker 탭 스크린샷으로 남긴다.

## 7. 구현 unit 후보

한 unit이다: `server/worker/workspace-activity.js` → `scheduler.js rescanWaiting`·`tick` publish →
`attach.js` 배선 → 대기 tier 스펙 정정. 새 모듈은 리스너 집합 하나라 분리할 이유가 없다.

## 8. 경계·후속

- 관찰: 다른 머신이 central dolt에 직접 쓴 변경은 이 프로세스의 어느 fs 감시에도 오지 않는다.
  그 rig의 세션 종료 tick이나 사람의 UI 조작이 남은 경로이며, 서버 리스트 refresh 폴러
  (`poll_interval_seconds`)는 Worker 큐를 건드리지 않는다. — 단일 머신 운영이라 이번 범위 밖.
- 관찰: `waiting` 정산 뒤 owner rig가 레지스트리에서 빠지거나 숨겨지면 활동 신호가 없다. 요청
  rig의 `bd ready`는 여전히 맞으므로 다음 외부 tick에 돌아온다(fail-quiet).
- 관찰: `watchDb`가 읽기에도 울리는 것은 이 스펙이 throttle로 감당할 뿐 고치지 않는다.
  `onIssuesChanged`의 parked 스캔이 같은 신호에서 `readMetadata`를 부르는 것도 같은 노출이지만
  이 스펙의 범위 밖이다.
- 표시(선행 대기 타일 blocker 상태 갱신·foreign rig 표기·stale-work 처분 도달)는 `UI-yue8`.

## 결정 (ADR 후보)

- `waiting` 복귀 트리거는 이벤트 구독(같은 rig fs 감시 + owner rig 활동 버스)과 bead당 trailing
  throttle 재스캔이며, 판정은 요청 rig의 `bd ready` 하나이고 cadence 타이머는 두지 않는다 —
  되돌리기 어려움: 성립(활동 버스와 `tick` publish 지점이 attachment 수명에 결속되고, 나중에
  cadence를 더하면 두 트리거가 공존해 비용 상한 서술이 깨진다) / 맥락 없이 놀라움: 성립(fs
  감시가 읽기에도 울리는데 왜 폭증하지 않는가, foreign은 왜 그 rig의 DB를 직접 보지 않는가) /
  실제 트레이드오프: 성립(throttle floor 30초만큼 복귀가 늦어지는 대신 bd 비용이 waiting 행
  수로 상한된다). `summary`: "Worker의 waiting 복귀는 cadence가 아니라 이벤트 구독이다 — 같은
  rig는 bd 변경 감시, foreign은 owner rig의 활동 버스가 요청 rig의 재스캔을 부르고, 재스캔은
  bead당 30초 trailing throttle 안에서 bd ready 하나로 판정한다". 대기 tier 스펙의 ADR 후보
  ("waiting은 터미널 결말이며 복귀는 보통 후보 dispatch")와 충돌하지 않는다 — 그 결정의
  "다음 tick"을 이 결정이 공급한다.
