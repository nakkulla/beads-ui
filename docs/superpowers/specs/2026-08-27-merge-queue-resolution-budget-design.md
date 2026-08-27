---
scope:
  - server/worker/merge-queue.js
  - server/worker/queue-store.js
  - server/worker/pr-actions.js
  - server/worker/scheduler.js
  - server/worker/worktree.js
  - app/views/worker/index.js
---

# 머지 큐 충돌 해소 예산 정정 — 큐 유발 재충돌 비과금·worktree_missing 자동 복원

- Bead: UI-p49g
- 기준 커밋: `00b4344d57ab74c2c9869b6d5c2fe216ba94dbdd`
- 관련: UI-ww5s(resolver self-review 결속, deferred), UI-zgbi(EXTERNAL fork 폴백, open)

## 1. 문제

`server/worker/merge-queue.js`의 충돌 해소 라운드 캡(`RESOLUTION_ROUND_CAP=2`)은
"같은 세션이 같은 충돌을 두 번 못 풀었다"를 세야 한다. 현재는 시스템 사정으로 생긴
두 경우도 예산을 먹거나 곧바로 포기한다.

1. **큐가 만든 재충돌.** 해소 세션이 `RESOLUTION_WAIT_MS`(30분)를 넘기면 wait가
   `yielded`로 차례를 양보하고, 그 사이 다른 PR이 머지돼 base가 움직이면 방금 해소한
   브랜치가 다시 dirty가 된다. `runLatestMerge`는 ready 후 재프로브가 dirty면
   무조건 `consume_round=true`로 라운드를 깎는다. 세션 실패가 아닌데 캡을 소모한다.
2. **`worktree_missing` 즉시 포기.** `scheduler.js resolveConflict`와
   `dispatchExternalConflict`는 `deps.worktree.exists`가 false면 거절하고, 큐는
   `failAndDequeue`로 그 head를 제외한다. PR 브랜치는 origin에 살아 있어 복원이
   파괴적이지 않은데도 사람에게 넘긴다.

## 2. 목표와 원칙

- `resolution_rounds`는 **세션이 실제로 시도해 실패한 횟수**만 센다.
- 큐 유발 재충돌은 별도 카운터 `rebase_rounds`로 세고 라운드를 소비하지 않으며,
  같은 세션을 다시 이어간다. 무한 루프 방지를 위해 그 카운터에도 durable 캡을 둔다.
- `worktree_missing`은 origin의 PR head 브랜치로 워크트리를 복원한 뒤 디스패치한다.
  복원이 안전하지 않으면 지금처럼 거절하되 사유를 구분한다.
- 판정 근거를 하나라도 읽지 못하면 **세션 실패로 과금**한다(fail-closed). 잘못
  비과금해서 무한정 세션을 부르는 쪽이 잘못 과금해서 사람에게 넘기는 쪽보다 나쁘다.

## 3. durable 상태 (`server/worker/queue-store.js`)

### 3.1 `ResolutionWait` 필드 추가

| 필드 | 타입 | 기록 시점 | 의미 |
|---|---|---|---|
| `dispatch_head_sha` | `string` | `bindResolutionWait` | 큐가 승인해 디스패치한 PR head(`approved.head_sha`) |
| `base_ref` | `string` | `bindResolutionWait` | 디스패치 때 PR base 브랜치 이름 |
| `base_tip_at_settle` | `string\|null` | `settleResolutionWait` | attempt 종료를 관측한 시점의 `origin/<base_ref>` tip. bind 시 `null` |

`bindResolutionWait` 입력에 `dispatch_head_sha`(40hex 필수)·`base_ref`(비어있지 않은
문자열 필수)를 추가한다. 둘 중 하나라도 없으면 bind는 실패(`false`)하고 드라이버는
기존 실패 경로(halt)를 탄다. `settleResolutionWait` 입력에 `base_tip: string|null`을
추가한다.

구버전 레코드(필드 부재)는 `normalize` 단계에서 `dispatch_head_sha=''`,
`base_ref=''`, `base_tip_at_settle=null`로 읽는다. 이 값은 §4의 판정에서 "읽지
못함"으로 취급돼 과금된다 — 배포 전에 대기 중이던 해소는 현행과 같게 동작한다.

### 3.2 `MergeQueueEntry.rebase_rounds`

`resolution_rounds`와 같은 규칙: 정수, 부재·비정상은 0, `enqueueMerge`는 0으로
초기화. `auto_merge_skips` 제외 판정과 `dequeueMerge`에는 관여하지 않는다.

### 3.3 `consumeResolutionWait` 입력 변경

`consume_round: boolean`을 `charge: 'session'|'rebase'|'none'`으로 바꾼다.
`session`은 `resolution_rounds += 1`, `rebase`는 `rebase_rounds += 1`, `none`은
카운터 불변. 그 외 값은 실패(`false`). 호출자는 `merge-queue.js` 하나다.

## 4. 판정 (`server/worker/merge-queue.js`)

### 4.1 base tip seam

`deps.baseTip?: (bead_id: string, base_ref: string) => Promise<string|null>`을
추가한다. `pr-actions.js`가 attempt의 `repo`에서
`git ls-remote --heads origin <base_ref>`를 실행해 40hex를 돌려주고, 실패·비어있음은
`null`이다. seam 부재는 `null`과 같다.

### 4.2 settle 시 tip 기록

`promoteTerminalResolutions`는 `settleResolutionWait` 전에 `deps.baseTip(subject,
resolution.base_ref)`를 읽어 `base_tip`으로 넘긴다. 이 함수는 지금 동기라
`async`로 바꾸고, 호출자 두 곳(`drain` 루프, `prepareResolution`)은 `await`한다.
tip 읽기 실패는 `null`로 기록하고 settle은 진행한다.

### 4.3 charge 결정

`runLatestMerge`에서 `ready_attempt_id`가 있고 재프로브가 `ok && kind==='dirty'`일
때만 아래를 계산한다. 그 외(clean·merged·blocked)는 `charge='none'`이다.

```
r = entry.resolution
if (!SHA40(r.dispatch_head_sha) || !SHA40(r.base_tip_at_settle))  → 'session'
if (probe.head_sha === r.dispatch_head_sha)                        → 'session'   // 세션이 push 안 함
tip_now = await deps.baseTip(subject, r.base_ref)
if (!SHA40(tip_now))                                               → 'session'   // fail-closed
if (tip_now !== r.base_tip_at_settle)                              → 'rebase'    // 큐 유발
                                                                   → 'session'   // push했지만 여전히 dirty
```

`effective_rounds` 계산은 `charge==='session'`일 때만 +1 한다. 새 변수
`effective_rebase = rebase_rounds + (charge==='rebase' ? 1 : 0)`을 두고,
`effective_rebase >= RESOLUTION_REBASE_CAP`이면 `refused` /
`resolution_rebase_cap`으로 반환해 `processItem`이 `failAndDequeue`한다. 기존
`resolution_round_cap` 분기는 그대로다. 두 캡을 동시에 넘기면 `session` 쪽이
우선한다(과금 캡이 먼저 검사된다).

`export const RESOLUTION_REBASE_CAP = 3;` — `createMergeQueue` deps에
`rebase_round_cap?: number`로 override 가능(테스트용, `resolution_round_cap`과 동형).

### 4.4 디스패치 시 head/base 전달

`ensureResolutionBound`/`bindResolution`은 `dispatch_head_sha`·`base_ref`를 받아
`bindResolutionWait`에 넘긴다. 값의 출처는 `dispatchConflict`에 넘긴
`approved.head_sha`/`approved.base_ref`다. `base_ref`가 `null`이면 `'main'`으로
쓴다(`conflictPrompt`의 기본값과 같다).

실제 경로는 대부분 스케줄러의 atomic prerecord다: `dispatchConflict`가 넘긴
`resolution_wait`를 `scheduler.js prerecordResolutionAttempt`가
`store.appendResolutionAttempt`에 그대로 전달하고, 그 store 메서드가 attempt와
`resolution` 레코드를 한 revision에 쓴다. 따라서 `resolution_wait` 객체에
`dispatch_head_sha`·`base_ref`를 추가하고(`merge-queue.js`가
`approved`에서 채움), `appendResolutionAttempt`가 `bindResolutionWait`와 같은
검증으로 두 필드를 `resolution`에 싣는다. `ensureResolutionBound`의 legacy
`bindResolution` 갈래(커스텀 dispatcher가 attempt만 기록한 경우)도 같은 두 값을
받아 넘긴다. 두 쓰기 경로의 필드 검증은 하나의 helper를 공유한다.

## 5. 워크트리 복원 (`server/worker/worktree.js`, `server/worker/scheduler.js`)

### 5.1 `restore({ repo, bead_id, head_ref })`

`createWorktreeManager`에 추가. topology lock 안에서 순서대로:

1. `branchForBead(bead_id) !== head_ref` → `{ ok:false, reason:'worktree_restore_branch_mismatch' }`
2. `pathFor(repo, bead_id)`가 이미 있음 → `worktree_restore_path_exists`
3. `git fetch origin <head_ref>` 실패 또는 `git rev-parse --verify origin/<head_ref>` 실패
   → `worktree_restore_branch_missing`
4. 로컬 브랜치 `<head_ref>`가 있고 tip이 `origin/<head_ref>`와 다름
   → `worktree_restore_branch_diverged` (미push 로컬 작업일 수 있어 손대지 않음)
5. 로컬 브랜치 없음 → `git worktree add --track -b <head_ref> <path> origin/<head_ref>`;
   있음 → `git worktree add <path> <head_ref>`. 실패 → `worktree_restore_failed`
6. 성공 → `{ ok:true, path }`

기존 `add()`는 `-B`로 브랜치를 base에 리셋하므로 재사용하지 않는다. `remove()`처럼
`git worktree prune`은 하지 않는다 — registry에 남은 stale 항목은 5단계 `add`가
거절하고, 그 사유는 `worktree_restore_failed`로 표면화된다.

### 5.2 호출 지점

- `resolveConflict`: `wt_present`가 false면 `deps.worktree.restore({ repo, bead_id,
  head_ref })`를 한 번 호출. `ok`면 진행, 아니면 `{ ok:false, reason }`. `restore`가
  함수가 아니면(테스트 더블) 현행 `worktree_missing`.
- `dispatchExternalConflict`: 같은 규칙.
- `head_ref`의 출처: `dispatchConflict`가 프로브의 `latest.head_ref`를
  `dispatchResolution`/`dispatchExternalResolution`에 넘기고, 그것이 스케줄러
  호출의 `resolution_wait` 옆 새 인자 `head_ref: string|null`로 도착한다.
  `null`이면 `restore`를 시도하지 않고 `worktree_missing`이다.

큐 밖의 수동 `[해소]` 클릭(`pr-actions.js`의 사람 클릭 경로)도 같은 스케줄러 함수를
타므로 동일하게 복원된다.

## 6. UI (`app/views/worker/index.js`)

새 칩·뱃지 슬롯 없음(카드 배치 문법 스펙 불변). `mergeFailureText`에 문구만 추가:

| reason | 문구 |
|---|---|
| `resolution_rebase_cap` | `큐 재충돌 3회 초과` |
| `worktree_restore_branch_mismatch` | `워크트리 복원 실패 — 브랜치 이름 불일치` |
| `worktree_restore_path_exists` | `워크트리 복원 실패 — 경로 이미 있음` |
| `worktree_restore_branch_missing` | `워크트리 복원 실패 — origin에 브랜치 없음` |
| `worktree_restore_branch_diverged` | `워크트리 복원 실패 — 로컬 브랜치가 origin과 다름` |
| `worktree_restore_failed` | `워크트리 복원 실패` |

`rebase_rounds`는 화면에 그리지 않는다. 필요해지면 카드 문법 스펙 §5.1을 먼저
갱신한다.

## 7. 테스트

- `queue-store.test.js`: 새 필드 정규화(구버전 → `''`/`null`/0), `bind` 필수 필드
  누락 실패, `settle`의 `base_tip` 기록, `consume` charge 3종과 잘못된 값 거절.
- `merge-queue.test.js`: §4.3 다섯 갈래 각 1개, `rebase` 캡 도달 →
  `resolution_rebase_cap` skip 기록, `baseTip` seam 부재 → `session` 과금,
  `promoteTerminalResolutions`가 tip을 기록.
- `worktree.integration.test.js`: `restore` 성공(로컬 브랜치 없음/있음·동일 tip),
  거절 4종.
- `scheduler.test.js`: `exists` false → `restore` 호출 → 디스패치; `restore` 거절
  사유 전파; `head_ref` null → `worktree_missing`.
- `pr-actions.test.js`: `dispatchConflict`가 `head_ref`와 `approved`를 스케줄러에
  전달.
- `index.test.js`: `mergeFailureText` 신규 6개.

## 8. 비범위

- resolver self-review 영수증 배선과 영수증 부재 후속 세션 — UI-ww5s.
- EXTERNAL 충돌 fork 실패 후 라운드 2의 fresh 폴백 — UI-zgbi.
- `RESOLUTION_ROUND_CAP` 값 변경, `RESOLUTION_WAIT_MS` 변경.
- 세션이 push한 뒤 종료 전에 base가 움직인 경우의 오과금(§4.3에서 `session`으로
  떨어짐). 드물고 안전한 쪽 오류라 수용한다.

## 9. 구현 unit 후보

1. `store` — §3 (queue-store.js + 테스트)
2. `queue` — §4 (merge-queue.js, pr-actions.js baseTip + 테스트)
3. `restore` — §5 (worktree.js, scheduler.js, pr-actions.js head_ref 전달 + 테스트)
4. `ui` — §6

1→2, 1·3은 독립. 한 PR로 착지한다.
