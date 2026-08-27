---
scope:
  - server/worker/merge-queue.js
  - server/worker/queue-store.js
  - server/worker/pr-actions.js
  - server/worker/scheduler.js
  - server/worker/worktree.js
  - server/worker/attach.js
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
  "읽지 못함"에는 재프로브 자체의 실패(`probe.ok===false`)도 포함된다.

## 3. durable 상태 (`server/worker/queue-store.js`)

### 3.1 `ResolutionWait` 필드 추가

| 필드 | 타입 | 기록 시점 | 의미 |
|---|---|---|---|
| `dispatch_head_sha` | `string` | bind | 큐가 승인해 디스패치한 PR head(`approved.head_sha`) |
| `base_ref` | `string` | bind | 디스패치 때 PR base 브랜치 이름 |
| `head_ref` | `string` | bind | 디스패치 때 PR head 브랜치 이름(프로브의 `head_ref`) |

"bind"는 `resolution` 레코드를 쓰는 두 경로 모두를 뜻한다: `bindResolutionWait`와
`appendResolutionAttempt`(§4.4). 두 경로는 하나의 검증 helper를 공유하며,
`dispatch_head_sha`는 40hex, `base_ref`·`head_ref`는 비어있지 않은 문자열이어야
한다. 하나라도 어긋나면 그 쓰기는 실패(`ok:false`)하고 호출자는 기존 실패 경로를
탄다(드라이버 halt / 디스패치 거절).

settle·yield·consume의 형태는 바뀌지 않는다. settle 시점에 읽는 값은 없다.

구버전 레코드(필드 부재)는 normalize 단계에서 세 필드 모두 `''`로 읽는다. 이
값은 §4.3에서 "읽지 못함"으로 취급돼 과금된다 — 배포 전에 대기 중이던 해소는
현행과 같게 동작한다.

### 3.2 `MergeQueueEntry.rebase_rounds`

`resolution_rounds`와 같은 규칙: 정수, 부재·비정상은 0. `MergeQueueEntry`를
만드는 **모든** 지점에서 `resolution_rounds: 0` 옆에 `rebase_rounds: 0`을 함께
쓴다 — 현재 `queue-store.js`에 `resolution_rounds: 0` 리터럴이 여덟 곳 있으며
(enqueue·manual merge·자동 등록·완료 루트·external 등) 하나도 빠뜨리지 않는다.
방어선은 둘이다: normalize가 부재·비정상을 0으로 읽고, `consumeResolutionWait`의
증가도 `Number.isFinite`가 아니면 0에서 시작한다. 그래서 어느 생성 지점을 놓쳐도
`NaN`이 되지 않는다.

`auto_merge_skips` 제외 판정과 `dequeueMerge`에는 관여하지 않는다.

### 3.3 `consumeResolutionWait` 입력 변경

`consume_round: boolean`을 `charge: 'session'|'rebase'|'none'`으로 바꾼다.
`session`은 `resolution_rounds += 1`, `rebase`는 `rebase_rounds += 1`, `none`은
카운터 불변. 그 외 값은 실패(`false`). 호출자는 `merge-queue.js` 하나다.

## 4. 판정 (`server/worker/merge-queue.js`)

### 4.1 base 포함 seam

`deps.baseContained?: (bead_id: string, input: { base_ref: string, head_ref: string, head_sha: string }) => Promise<'contained'|'not_contained'|null>`
을 추가한다. `pr-actions.js`가 attempt의 `repo`에서 구현한다:

1. `git fetch origin <base_ref> <head_ref>` — 실패 → `null`
2. `git rev-parse origin/<head_ref>`가 `head_sha`와 다름 → `null`(head가 그 사이
   또 움직임; 이번 판정은 성립하지 않는다)
3. `git merge-base --is-ancestor origin/<base_ref> <head_sha>` — exit 0 →
   `'contained'`, exit 1 → `'not_contained'`, 그 외 → `null`

seam 부재는 `null`과 같다. `server/worker/attach.js`의 `createMergeQueue` deps
조립에 `probeMergeability`·`dispatchConflict`와 나란히 명시적으로 연결한다 —
생산 큐는 deps를 골라 넘기므로 연결을 빠뜨리면 모든 재충돌이 과금된다.

이 기준은 시점에 의존하지 않는다. 세션이 현재 base tip을 이미 머지했는데도
dirty면 세션의 해소가 틀린 것이고, 머지하지 않았으면(그 뒤 base가 움직였으면)
큐 유발이다. settle 시점의 base tip 스냅샷은 필요 없고, 승격이 늦어져도 결과가
바뀌지 않는다.

### 4.2 charge 결정

`runLatestMerge`에서 `ready_attempt_id`가 있을 때만 계산한다(없으면 `'none'`).

```
r = entry.resolution
if (!probe.ok)                                   → 'session'   // 재프로브 실패 = 읽지 못함
if (probe.kind !== 'dirty')                      → 'none'      // clean/merged/closed: 해소됨
if (!SHA40(probe.head_sha) || !SHA40(r.dispatch_head_sha)
    || !r.base_ref || !r.head_ref)               → 'session'   // 근거 부재
if (probe.head_sha === r.dispatch_head_sha)      → 'session'   // 세션이 push 안 함
c = await deps.baseContained(subject, { base_ref: r.base_ref, head_ref: r.head_ref, head_sha: probe.head_sha })
if (c === 'not_contained')                       → 'rebase'    // 큐 유발
                                                 → 'session'   // 'contained' 또는 null
```

`!probe.ok`에서 `'session'`으로 과금하는 것은 현행(`consume_round=false`)의 변경이다:
지금은 프로브가 막힌 순간 ready 레코드가 무과금으로 소비돼, 다음 루프에서 dirty가
관측되면 이전 세션 라운드가 세어지지 않은 채 새 세션이 디스패치된다. 원칙 §2에
따라 닫는다.

`effective_rounds`는 `charge==='session'`일 때만 +1 한다. 새 변수
`effective_rebase = rebase_rounds + (charge==='rebase' ? 1 : 0)`을 두고,
`effective_rebase >= RESOLUTION_REBASE_CAP`이면 `refused` /
`resolution_rebase_cap`으로 반환해 `processItem`이 `failAndDequeue`한다. 기존
`resolution_round_cap` 분기는 그대로이며 먼저 검사된다.

`export const RESOLUTION_REBASE_CAP = 3;` — `createMergeQueue` deps에
`rebase_round_cap?: number`로 override 가능(`resolution_round_cap`과 동형).

### 4.3 디스패치 시 head/base 전달

`dispatchConflict(bead_id, approved, resolution_wait, continuation)`의 `approved`에
`head_ref: string|null`을 추가하고, `merge-queue.js`는 프로브의 `head_ref`를
채운다. `merge-queue.js`가 만드는 `resolution_wait` 객체에 `dispatch_head_sha`·
`base_ref`·`head_ref`를 싣는다(`base_ref`가 `null`이면 `'main'`, `conflictPrompt`
기본값과 같다).

실제 쓰기 경로는 대부분 스케줄러의 atomic prerecord다: `resolution_wait`가
`scheduler.js prerecordResolutionAttempt` → `store.appendResolutionAttempt`로
전달되고, 그 store 메서드가 attempt와 `resolution` 레코드를 한 revision에 쓴다.
`appendResolutionAttempt`는 §3.1의 공유 helper로 세 필드를 검증해 `resolution`에
싣는다. `ensureResolutionBound`의 legacy `bindResolution` 갈래(커스텀 dispatcher가
attempt만 기록한 경우)도 같은 세 값을 받아 `bindResolutionWait`에 넘긴다.

## 5. 워크트리 복원 (`server/worker/worktree.js`, `server/worker/scheduler.js`)

### 5.1 `restore({ repo, bead_id, head_ref })`

`createWorktreeManager`에 추가. topology lock 안에서 순서대로:

1. `branchForBead(bead_id) !== head_ref` → `{ ok:false, reason:'worktree_restore_branch_mismatch' }`
2. `pathFor(repo, bead_id)`가 이미 있음(exists가 false였는데 lock 안에서 생김) → `worktree_restore_path_exists`
3. `git fetch origin <head_ref>` 실패 또는 `git rev-parse --verify origin/<head_ref>` 실패
   → `worktree_restore_branch_missing`
4. 로컬 브랜치 `<head_ref>`가 있고 tip이 `origin/<head_ref>`와 다름
   → `worktree_restore_branch_diverged` (미push 로컬 작업일 수 있어 손대지 않음)
5. 로컬 브랜치 없음 → `git worktree add --track -b <head_ref> <path> origin/<head_ref>`;
   있음 → `git worktree add <path> <head_ref>`. 실패 → `worktree_restore_failed`
6. 성공 → `{ ok:true, path }`

기존 `add()`는 `-B`로 브랜치를 base에 리셋하므로 재사용하지 않는다. `git worktree
prune`은 하지 않는다 — registry에 남은 stale 항목은 5단계 `add`가 거절하고 그
사유는 `worktree_restore_failed`로 표면화된다.

### 5.2 호출 지점과 `head_ref` 전달

스케줄러 두 함수에 `head_ref: string|null` 인자를 추가한다:
`resolveConflict(workspace, bead_id, resolution_wait, continuation, head_ref)`,
`dispatchExternalConflict(workspace, bead_id, target_base, resolution_wait, continuation, head_ref)`.
둘 다 `wt_present`가 false이고 `head_ref`가 문자열이면
`deps.worktree.restore({ repo, bead_id, head_ref })`를 한 번 호출한다. `ok`면 진행,
아니면 `{ ok:false, reason }`. `head_ref`가 `null`이거나 `restore`가 함수가 아니면
현행 `worktree_missing`.

`head_ref`는 `pr-actions.js`가 관측한 `pr.head_ref`에서 온다. 스케줄러를 부르는
경로는 셋이고 **셋 다** 넘긴다:

- 큐 경로: `dispatchConflict` → `dispatchResolution`/`dispatchExternalResolution`
  (`approved.head_ref`).
- 수동 `[해소]`/`[머지]` 클릭의 DIRTY 분기(`merge()` 안, `isConflicting(first.pr)`):
  `dispatchResolution`/`dispatchExternalResolution`을 직접 부르며
  `first.pr.head_ref`를 넘긴다.
- `dispatchResolution` 내부의 resumable 부재 → `dispatchExternalResolution` 폴백도
  같은 `head_ref`를 보존한다.

`dispatchResolution`·`dispatchExternalResolution`의 시그니처는
`(bead_id, head_sha, base_ref, head_ref, resolution_wait, continuation)`이 된다.

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

- `queue-store.test.js`: 새 필드 정규화(구버전 → `''`/0), bind·append 두 경로의
  필수 필드 누락 실패, `consume` charge 3종과 잘못된 값 거절, `rebase_rounds`가
  비정상일 때 consume이 0에서 시작, 여덟 생성 지점이 `rebase_rounds: 0`을 쓰는지
  (각 mutation 후 스냅샷 검사).
- `merge-queue.test.js`: §4.2 일곱 갈래 각 1개(probe 실패·clean·근거 부재·head
  불변·not_contained·contained·null), `rebase` 캡 도달 → `resolution_rebase_cap`
  skip 기록, `baseContained` seam 부재 → `session`, `approved.head_ref`와
  `resolution_wait` 세 필드가 `dispatchConflict`에 전달됨.
- `pr-actions.test.js`: `baseContained` 3결과(fetch 실패·head 불일치·ancestor
  여부), `dispatchConflict`와 수동 DIRTY 분기와 내부→외부 폴백이 `head_ref`를
  스케줄러까지 전달.
- `attach.test.js`: 생산 조립이 `baseContained`를 큐 deps에 연결.
- `worktree.integration.test.js`: `restore` 성공(로컬 브랜치 없음/있음·동일 tip),
  거절 4종.
- `scheduler.test.js`: `exists` false → `restore` 호출 → 디스패치; `restore` 거절
  사유 전파; `head_ref` null → `worktree_missing`; `appendResolutionAttempt`에 세
  필드 전달.
- `index.test.js`: `mergeFailureText` 신규 6개.

## 8. 비범위

- resolver self-review 영수증 배선과 영수증 부재 후속 세션 — UI-ww5s.
- EXTERNAL 충돌 fork 실패 후 라운드 2의 fresh 폴백 — UI-zgbi.
- `RESOLUTION_ROUND_CAP` 값 변경, `RESOLUTION_WAIT_MS` 변경.
- `baseContained`의 2단계에서 head가 또 움직여 `null`이 된 경우의 오과금. 다음
  프로브가 새 head를 보므로 드물고, 안전한 쪽 오류라 수용한다.

## 9. 구현 unit 후보

1. `store` — §3 (queue-store.js + 테스트)
2. `queue` — §4 (merge-queue.js, pr-actions.js baseContained, attach.js 연결 + 테스트)
3. `restore` — §5 (worktree.js, scheduler.js, pr-actions.js head_ref 전달 + 테스트)
4. `ui` — §6

1→2, 1·3은 독립. 한 PR로 착지한다.
