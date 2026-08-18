# base에 포함된 ahead 브랜치 잔재 자동 회수 설계 (UI-kt5d)

- 작성일: 2026-08-18
- 상태: 사용자 설계 승인 완료, spec gate 대기
- Bead: `UI-kt5d`
- route: `full_plan`
- 선행 조건: `UI-8vn1` closed(머지·필수 배포 검증 완료)
- 실측 계기: `dotfiles-dk6v`, `UI-20gk`

## 1. 문제와 실측

UI-8vn1은 Worker dispatch pre-flight의 잔재 판정을
`absent | discardable | base_contained | unique | unknown`으로 구조화하고,
**working tree delta**가 핀된 base와 정확히 같을 때만 자동 회수한다. 커밋된
작업은 다루지 않는다. `branch_ahead > 0` 또는 `head_ahead > 0`이면 내용과
무관하게 즉시 `unique`로 보존한다(`server/worker/worktree.js` §관측, `cause`
`branch_ahead`/`head_ahead`).

이 경계는 고유 커밋을 `git worktree add -B`가 조용히 잃게 만드는 사고를 막지만,
브랜치의 고유 커밋이 이미 base에 반영된 경우까지 영구 대기로 만든다.

2026-08-18 `dotfiles-dk6v`에서 다음 상태가 실측됐다.

- worktree는 clean이다.
- branch는 `origin/main` 대비 ahead 5 / behind 21이다.
- branch-only 5커밋 모두 main에 패치 동등본이 있다.
- 최종 변경 경로 2개의 mode/blob 상태가 main과 정확히 같다.
- 원격 브랜치, PR, 기존 attempt는 없다.

`UI-20gk`는 같은 성질의 다른 형태다. worktree는 이미 없고, base에 정확히 포함된
ahead local branch만 남아 같은 raw `worktree_stale_work`를 만든다.

두 형태 모두 사용자가 판단할 재료가 없다. 브랜치의 최종 결과는 이미 base에 있고,
남겨 두면 그 Bead는 다시 dispatch되지 않는다.

부수적으로 관측된 두 번째 결함: worktree 없는 branch-only 잔재는
`staleWorkAdmission()`이 `identity.worktree_realpath`를 문자열로 요구하기 때문에
항상 `owned=false`가 되어 `unknown`/`ownership_unknown`으로 투영된다. 그 카드는
`다시 확인`만 노출하는데, 다시 확인해도 같은 판정이 나오므로 영구 막다른 길이다.
고유 커밋을 가진 branch-only 잔재는 현재 어떤 복구 경로도 갖지 못한다.

## 2. 목표와 불변식

1. 핀된 최신 base에 정확히 포함됨을 증명한 ahead 브랜치 잔재는 사용자 개입 없이
   회수하고, 같은 tick에서 새 dispatch를 계속한다.
2. 커밋을 지우는 회수는 그 커밋 범위 전체를 담은 검증된 bundle을 먼저 남긴다.
   포함 증명은 최종 상태만 보지만 보존은 중간 commit·blob·history까지 담는다.
   따라서 base에 없는 커밋 내용이 복구 불가능하게 사라지는 경로가 없다.
3. 자동 회수의 파괴적 동작은 비강제 `git worktree remove`와 예상 SHA에 결속된
   local ref 삭제뿐이다. 원격 ref, PR, base는 건드리지 않는다.
4. 증명 실패, 관측 실패, archive 검증 실패, identity drift는 원본을 보존하고
   fail-closed한다.
5. 고유 커밋을 가진 branch-only 잔재도 백업 후 새로 시작할 수 있는 실행 가능한
   복구 표면을 갖는다.
6. 백업 없는 삭제 동작은 제공하지 않는다. 자동·수동을 가리지 않고 모든 ref 삭제는
   검증된 archive 뒤에만 일어난다.
7. 새 durable guard를 만들지 않는다. 점유 보호는 UI-8vn1이 이미 세운 것을 그대로
   통과한다.
8. dotfiles가 소유하는 workflow metadata·label·status 계약은 바꾸지 않는다.

## 3. 범위와 소유 표면

| 표면 | 책임 |
|---|---|
| `server/worker/worktree.js` | ahead 커밋의 base 포함 증명, branch-only 관측, CAS ref 삭제 |
| `server/worker/scheduler.js` | 잔재 형태별 admission 소유·능력 계산 |
| `server/worker/recovery-archive.js` | branch-only archive 모드(커밋 번들 전용). 자동 회수와 사용자 백업이 공유한다 |
| `server/worker/discard-coordinator.js` | branch-only stale-work cleanup 단계 |
| `server/ws/worker-handlers.js` | 형태별 action capability 게이팅 |
| `app/views/worker/index.js` 및 관련 view | branch-only 잔재 카드 문구와 버튼 |
| `server/worker/*.test.js`, `server/ws/*.test.js`, `app/views/worker/*.test.js` | 판정·전이·UI 계약 검증 |
| `app/main.bundle.js`, `app/main.bundle.js.map` | frontend source의 generated runtime copy |

새 Bead metadata key나 label을 만들지 않는다. `queue.json`의 admission 구조는
UI-8vn1의 `stale_work` schema 1을 확장하며 새 durable operation 종류를 만들지
않는다.

## 4. ahead 커밋의 base 포함 증명

### 4.1 증명 정의

UI-8vn1이 working tree delta에 적용한 exact path-state equality 원칙을 커밋된
작업으로 확장한다. semantic patch 포함이나 patch-id 유사성은 추론하지 않는다.

핀된 `base_oid`와 잔재 ref(`refs/heads/<bead-id>`)에 대해 다음을 계산한다.

~~~
merge_base = git merge-base <base_oid> <ref>
P          = git diff --name-only -z --no-renames <merge_base> <ref>
증명       = ∀p ∈ P: treeState(<ref>, p) == treeState(<base_oid>, p)
~~~

`treeState`는 이미 존재하는 `treePathState()`가 반환하는 `{ mode, oid }` 또는
경로 부재다. 양쪽 모두 부재인 경우도 일치로 본다. 현재 이 helper는 `ls-tree`
출력에서 `blob` 항목만 파싱하고 나머지를 파싱 실패로 처리하므로, gitlink(mode
`160000`) 항목을 파싱 실패와 구분할 수 있도록 확장한다. §4.2가 두 경우에 서로
다른 결과를 요구하기 때문이다.

`P`는 그 ref의 고유 커밋이 merge base 대비 **순수하게 기여한 경로 집합**이다.
`P`의 모든 경로에서 ref 트리와 base 트리가 정확히 같으면, base는 그 ref가 만든
최종 결과를 이미 전부 담고 있다. `P` 밖 경로는 merge base와 ref가 동일하므로
그 ref가 기여한 바가 없다.

이 증명이 보장하는 것은 **최종 상태의 포함**까지다. 브랜치 안에서 추가했다가
지운 파일, 또는 나중 커밋이 덮어쓴 중간 리비전은 `P`의 최종 비교에 나타나지
않으면서도 base 어디에도 없을 수 있다. 따라서 증명만으로는 ref 삭제를 정당화하지
않으며, §5.2의 검증된 bundle이 그 잔여분까지 보존한 뒤에만 삭제한다. 증명은
"자동으로 지워도 되는가"를, bundle은 "지운 것을 되찾을 수 있는가"를 각각
책임진다.

`--no-renames`를 쓰므로 rename은 삭제 경로와 추가 경로 두 항목으로 나타나고 각각
독립적으로 비교된다. 브랜치 안에서 바꿨다가 되돌린 경로는 `P`에 들어가지 않는데,
그 ref의 순 기여가 없다는 뜻이므로 올바른 제외다.

건전성: behind 0인 순수 ahead 브랜치는 `merge_base == base_oid`이므로 `P`가 비지
않는 한 증명이 반드시 실패한다. base에 없는 작업은 어떤 경우에도 통과하지
않는다. 실측 `dotfiles-dk6v`는 behind 21이라 `merge_base`가 오래된 fork point이고
`P`가 2개 경로이며 base가 그 최종 상태를 이미 담고 있어 통과한다.

### 4.2 거절 조건

다음 중 하나라도 성립하면 증명을 시도하지 않거나 실패로 확정한다.

| 조건 | 관측 | 결과 |
|---|---|---|
| `base..ref`에 merge commit 존재 | `rev-list --count --merges` > 0 | `unique` / `ahead_merge_commit` |
| `P`의 어느 경로든 gitlink(submodule) 항목 | `merge_base`·`ref`·`base_oid` 세 상태 중 하나라도 `ls-tree` mode `160000` | `unique` / `ahead_submodule_path` |
| `P`의 어느 경로든 상태 불일치 | `treePathState` 비교 실패 | `unique` / `ahead_not_contained` |
| `merge-base`, `rev-list`, `diff`, `ls-tree` 관측 실패 | 비정상 exit 또는 파싱 실패 | `unknown` / `observe_failed` |

gitlink 검사가 `merge_base` 상태까지 보는 이유는, `ref`와 `base_oid` 두 상태만
비교하면 merge base에 있던 submodule을 양쪽이 똑같이 삭제하거나 동일한 일반
파일로 교체한 경우 어느 쪽에서도 mode `160000`이 관측되지 않아 이 거절 조건이
그대로 우회되기 때문이다.

이 네 cause는 기존 `cause` enum에 추가되며, 증명을 시도한 경로에서 기존 blanket
`branch_ahead` cause를 대체한다. detached worktree HEAD가 base보다 앞선 경우의
`head_ahead` cause는 그대로 남는다.

### 4.3 patch-id 미사용

Bead 설명은 patch-id를 보조 증거로 언급했다. 이 설계는 patch-id를 계산하지도,
저장하지도 않는다. 삭제 권한이 아니고, 증명을 통과한 잔재는 카드로 표시되지
않으므로 진단 가치가 없으며, 증명에 실패한 잔재의 카드에서도 사용자의 선택을
바꾸지 못한다. 계산하지 않는 편이 잔재 경로의 git spawn 수를 줄인다.

### 4.4 detached HEAD

worktree HEAD가 detached이고 base보다 앞선 `head_ahead` 잔재는 이번 범위가
아니다. Worker는 Bead worktree를 항상 branch로 만들므로 실측 사례가 없고,
detached 잔재에는 §5.3의 CAS가 결속할 ref 자체가 없어 같은 안전 논증을 세울 수
없다. 현행대로 `unique`로 보존한다.

## 5. 자동 회수

### 5.1 세 형태

증명을 통과한 잔재는 형태에 따라 다음 순서로 회수한다. 모두 기존
`topologyLock`과 판정/파괴 사이 재관측 CAS 안에서 수행한다.

| 형태 | 순서 |
|---|---|
| A. clean worktree + contained ahead branch (`dotfiles-dk6v`) | archive 검증 → 재관측 → `worktree remove` → CAS ref 삭제 |
| B. branch-only contained ahead (`UI-20gk`) | archive 검증 → 재관측 → CAS ref 삭제 |
| C. dirty base_contained + contained ahead branch | archive 검증 → 재관측 → exact-path restore → 재관측 → `worktree remove` → CAS ref 삭제 |

세 형태 모두 `branch_ahead > 0`이므로 §5.2의 archive가 선행한다. `branch_ahead`가
0인 UI-8vn1의 기존 `discardable`·`base_contained` 회수는 커밋을 지우지 않으므로
archive 대상이 아니며 현행 동작 그대로다.

형태 C는 UI-8vn1의 working tree 증명과 이번 커밋 증명을 **둘 다** 통과해야 한다.
UI-8vn1의 restore 후 재관측은 현재 `state === 'discardable' && branch_ahead === 0
&& head_ahead === 0`을 요구하는데, 형태 C에서는 `branch_ahead > 0`이 정상이므로
재관측 수용 조건을 "working tree delta가 사라졌고 ahead 포함 증명이 여전히
성립한다"로 바꾼다. 재관측이 이 조건을 만족하지 못하면 기존
`restoreContainedState()`로 되돌리고 `unknown`/`restore_failed`를 반환한다.

### 5.2 삭제 전 archive

자동 회수가 지우는 ref는 base에 없는 중간 commit·blob·history를 담고 있을 수
있다(§4.1). 파괴적 단계에 들어가기 전에 `recovery-archive.js`의 branch-only
모드(§8.2)로 `<base_oid>..<ref>` 커밋 bundle을 만들고 검증한다.

1. 기존 `discard-backups` 위치에 operation 없는 자동 회수용 archive를 만든다.
2. `git bundle create`와 `git bundle verify`를 repo 루트에서 수행한다.
3. checksum manifest를 기록하고 다시 검증한다.
4. 검증이 끝난 뒤에만 재관측 CAS와 파괴적 단계로 진행한다.

bundle 생성 또는 검증이 실패하면 어떤 파일·worktree·ref도 바꾸지 않고
`unknown`/`archive_failed`를 반환한다. 실패한 임시 archive는 진단 경로에만 남긴다.

`createWorktreeManager()`의 deps는 현재 Git runner, `fs`, lock만 받는다. archive
생성기를 같은 방식의 주입 의존으로 추가하고, 주입되지 않은 호출자에서는 커밋을
지우는 회수를 시도하지 않고 기존 `branch_ahead` 보존 동작을 유지한다. 이렇게
두면 archive 없이 ref가 지워지는 조합이 구성상 존재할 수 없다.

이 archive는 사용자에게 노출되는 흐름이 아니다. 자동 회수는 여전히 사용자 개입
없이 끝나며, archive는 §2의 "백업 없는 삭제 없음" 불변식을 자동 경로에서도
성립시키는 안전망이다. 잔재가 드문 사건이므로 누적량은 실질적으로 작고, archive
자동 만료·삭제 UI는 UI-8vn1과 같이 이번 범위가 아니다.

### 5.3 CAS ref 삭제

`git update-ref -d refs/heads/<branch> <expected_head_sha>`가 compare-and-swap
그 자체다. ref가 예상 SHA를 가리킬 때만 삭제되고, 그렇지 않으면 비정상 종료하며
아무것도 바꾸지 않는다.

브랜치가 worktree에 체크아웃돼 있으면 ref를 지울 수 없으므로 형태 A와 C에서는
`worktree remove`가 먼저다. 그 결과 CAS 삭제 실패 시점에는 worktree가 이미
사라진 상태다. 이는 데이터 손실이 아니다. 형태 A의 worktree는 clean이고 형태 C의
worktree는 restore로 HEAD 상태로 정규화된 뒤이므로, 남은 내용은 전부 ref가
가리키는 커밋에 있다. CAS 실패는 `unknown`/`ref_delete_failed`로 반환해 브랜치를
보존하고, 무엇보다 뒤이은 `worktree add -B`가 드리프트한 ref를 덮어쓰는 것을
막는다.

`worktree add -B`가 어차피 브랜치를 base로 옮기므로 명시적 삭제 없이도 기능은
성립한다. 그럼에도 명시적 CAS 삭제를 두는 이유는 두 가지다. `add`는 topology
lock 밖의 별개 호출이라 관측과 이동 사이 드리프트 창이 열려 있고, `-B`는 ref가
무엇을 가리키든 조용히 옮기므로 "증명된 것만 지웠다"는 관측 가능한 기록을 남기지
못한다.

### 5.4 branch-only 관측 확장

현재 `removeIfDiscardable()`은 worktree가 없으면 `identity.head_sha`를 `null`로
두고, 회수 단계 진입 전 `!worktreePresent(first)`에서 조기 반환한다. 다음을
바꾼다.

1. branch-only 관측의 identity에 `branch_head_sha`를 추가한다. CAS 삭제의 예상
   값이자 재관측 비교 대상이다.
2. branch-only 관측의 `status_digest`는 `{ branch_present, branch_head_sha,
   branch_ahead, base_oid }`로 계산한다.
3. 회수 단계 진입 조건을 "관측이 `ok`이고, 제거할 worktree 또는 삭제할 잔재 ref
   중 적어도 하나가 있을 때"로 바꾼다. 지금은 worktree 부재만으로 조기 반환하므로
   증명을 통과한 branch-only 잔재가 재관측 CAS와 ref 삭제 단계에 도달하지 못한다.
   `preserve` 요청과 `absent` 상태의 조기 반환은 그대로 둔다.
4. branch-only 관측의 `owned`는 잔재 branch 이름이 `branchForBead(bead_id)`와
   같은지로 판정한다. worktree 경로가 없으므로 `isOwnedWorktree()`는 적용할 대상이
   없다. 이 명명 규칙은 Worker가 브랜치를 찾는 근거 그 자체이므로 추가 근거를
   요구하지 않는다.

## 6. 같은 tick dispatch

scheduler pre-flight는 `removeIfDiscardable()`이 `ok`를 반환하면 같은 함수 흐름에서
곧바로 `worktree.add`로 진행한다. 따라서 판정 확장만으로 "회수 성공은 같은
scheduler tick의 fresh dispatch로 이어진다"가 성립하며, dispatch 경로에 새 분기를
만들지 않는다.

재개 가능한 attempt가 있을 때 scheduler는 먼저 `preserve: true`로 관측만 하고
`matchingResidueAttempt()`로 매칭을 시도한다. 이 함수는
`identity.worktree_realpath`가 문자열일 것을 요구하므로 branch-only 잔재는 결코
매칭되지 않고, `preserve` 없는 두 번째 호출로 넘어가 회수된다. worktree가 없는
attempt는 resume 자체가 불가능하므로 이것이 올바른 동작이다. 이 성질은 우연에
기대지 않도록 테스트로 고정한다.

## 7. 점유 보호 — 새 guard 없음

이번 유닛은 새 durable guard를 만들지 않는다. 필요한 보호가 모두 존재한다.

| 위험 | 기존 보호 |
|---|---|
| 활성·재개 가능한 attempt가 잔재를 소유 | scheduler의 `preserve: true` 선행 관측과 resume 우선 |
| 진행 중 cleanup·discard·repo operation | scheduler active union이 dispatch 자체를 막음 |
| 동시 Git 변경 | `topologyLock` + 판정/파괴 사이 재관측 + `update-ref` CAS |
| Worker 소유가 아닌 경로·브랜치 | `isOwnedWorktree()`와 `branchForBead()` 명명 규칙 |

### 7.1 Bead 수용 기준 2에서 제거하는 조항

Bead 설명의 수용 기준 2는 "PR 또는 remote branch owner가 있으면 파일·worktree·
ref를 변경하지 않는다"를 요구했다. 이 설계는 그 조항을 채택하지 않으며, Bead
설명도 같은 내용으로 정정한다. 근거는 다음과 같다.

1. 이 유닛의 파괴적 동작은 로컬 worktree 제거와 **로컬** ref 삭제뿐이다. 원격
   브랜치도 PR도 변경되지 않는다.
2. 포함 증명이 통과했다는 것은 그 로컬 ref의 고유 커밋이 전부 base에 있다는
   뜻이므로, 삭제로 잃는 내용이 없다. 원격에 같은 브랜치가 있다면 사본이 하나 더
   있다는 뜻이라 오히려 더 안전한 방향이다.
3. UI-8vn1이 같은 가드를 둔 이유는 그쪽이 **증명되지 않은 고유 작업을 archive 후
   실제로 삭제**하는 동작이었기 때문이다. 이번 유닛에는 그 전제가 없다.
4. 남는 부작용은 로컬 ref를 base에서 다시 만든 뒤 push가 non-fast-forward로
   거절될 수 있다는 것인데, 이는 데이터 손실이 아닌 안전한 실패이며 기존
   `discardable` 회수 경로에서 이미 같은 방식으로 발생하는 성질이라 이번 유닛이
   새로 만드는 위험이 아니다.
5. 이 조항을 유지하면 PR을 올렸다가 닫아 원격 ref만 남은 브랜치는 영원히 자동
   회수되지 않아, 해결하려는 실측 부류를 다시 놓친다.

## 8. 증명 실패 branch-only 잔재의 복구 표면

### 8.1 admission 소유와 능력

`staleWorkAdmission()`의 `owned` 판정에서 `identity.worktree_realpath` 요구를
제거하고, `observation.owned === true && identity.branch === bead_id`로 바꾼다.
잔재 형태를 admission payload에 명시한다.

~~~js
stale_work: {
  schema: 1,
  residue: 'worktree' | 'branch',
  state: 'unique' | 'unknown',
  cause,
  summary,
  identity_digest,
  action_id,
  can_resume,
  can_continue,
  can_backup_fresh,
  can_recheck
}
~~~

능력은 형태별로 계산한다.

| 형태·상태 | `can_resume` | `can_continue` | `can_backup_fresh` | `can_recheck` |
|---|---|---|---|---|
| `worktree` + `unique` | resume 후보 있을 때 | 예 | 예 | 아니오 |
| `branch` + `unique` | 아니오 | 아니오 | 예 | 예 |
| 모든 형태 + `unknown` | 아니오 | 아니오 | 아니오 | 예 |

`branch` 형태에서 `can_resume`과 `can_continue`는 항상 닫힌다. 채택하거나 이어갈
worktree가 존재하지 않기 때문이다.

`residue`는 schema 1에 더해지는 optional 필드다. 값이 없는 payload는 `worktree`로
읽어 UI-8vn1이 기록한 기존 admission과 이전 server가 보낸 snapshot이 그대로
동작하게 한다. schema 번호는 올리지 않는다. 이 필드를 모르는 이전 client는 기존
badge로 fail-quiet한다.

public projection 규칙은 UI-8vn1과 같다. worktree/repo 경로, raw Git stderr, 파일
내용, archive 내부 manifest는 보내지 않는다.

### 8.2 branch-only archive 모드

이 모드는 §5.2의 자동 회수 archive가 먼저 요구하므로 unit 1에서 도입하고, 이
절의 사용자 백업 흐름이 같은 구현을 재사용한다.

`recovery-archive.js`의 archive 생성은 현재 `input.worktree`를 필수로 받고
submodule 검사, untracked special file 검사, worktree/index patch, 파일 스냅샷을
모두 worktree에서 만든다. branch-only 원본에는 worktree가 없으므로 repo와 ref만
받는 모드를 더한다.

- 산출물: `<base_oid>..<ref>` 커밋 번들과 checksum manifest, source snapshot.
- 번들 생성과 `git bundle verify`는 모두 repo 루트에서 수행한다.
- worktree/index patch, untracked 스냅샷, submodule·special file 검사는 대상이
  존재하지 않으므로 수행하지 않으며, manifest `excluded`에 그 사실을 그대로
  드러낸다.
- 검증 규칙은 기존과 같다. `COMPLETE`와 모든 checksum, bundle verify가 통과해야
  archive가 verified다.

### 8.3 branch-only cleanup

discard coordinator의 stale-work cleanup은 형태에 따라 갈린다. `branch` 형태의
cleanup은 `worktree remove`를 건너뛰고 §5.3과 같은 CAS ref 삭제만 수행한다.
verified archive 이전 파괴 금지, archive 이후 cleanup 실패 시 원본과 verified
archive 동시 보존, persisted phase의 authoritative readback 재개는 UI-8vn1 계약을
그대로 따른다.

### 8.4 Worker UI

`branch` 형태 잔재 카드는 다음을 표시한다.

- 제목: `이전 브랜치 보존됨`
- 요약: 고유 commit 수. staged/unstaged/untracked 수는 표시 대상이 없으므로
  넣지 않는다.
- 설명: 자동으로 지우지 않은 이유(포함 증명 실패, merge commit, submodule 경로)
- 동작: `백업 후 새로 시작`, `다시 확인`

`worktree` 형태 카드는 UI-8vn1의 현행 표현을 그대로 유지한다. capability가 false인
버튼은 disabled가 아니라 아예 표시하지 않는 기존 규칙을 따른다. frontend source
변경 후 `app/main.bundle.js`와 source map을 재생성한다.

## 9. 오류·동시성 경계

1. topology lock이 관측·증명·회수를 직렬화한다.
2. 판정과 파괴 사이 재관측이 state와 identity 전체를 비교하고, 다르면 무변경
   `unknown`/`identity_changed`를 반환한다.
3. bundle 생성 또는 검증 실패는 파괴적 단계 이전이므로 아무것도 바꾸지 않고
   `archive_failed`를 반환한다.
4. `update-ref` CAS 실패는 원본 ref를 보존하고 `ref_delete_failed`를 반환한다.
5. Git 관측 실패는 부재나 clean으로 해석하지 않고 `unknown`으로 확정한다.
6. 증명 실패는 어떤 파일·ref·worktree도 바꾸지 않는다.
7. queue revision과 `action_id`는 stale click을 거절한다. 같은 identity와 cause를
   다시 관측하면 revision을 반복 증가시키지 않는다.
8. 자동·수동을 가리지 않고 검증된 archive 이전의 파괴적 단계는 0회다.
9. raw Git stderr와 파일 내용은 snapshot이나 알림에 포함하지 않는다.

## 10. 적용·배포 연속성

이 유닛은 Worker runtime behavior와 frontend bundle을 바꾸므로 PR merge만으로
완료되지 않는다. 적용 순서의 canonical owner는 기존 `repo-ops/config.toml`의
`[deploy]` 선언과 `repo-ops/script/deploy`이며, 이번 유닛은 새 deploy 경로나
rollback state를 만들지 않는다.

source, tests, `app/main.bundle.js`와 `app/main.bundle.js.map`은 모두 현재 PR에
포함한다. 마감 readback은 다음 순서로 적용 완료를 확정한다.

1. 해당 merge를 target 또는 descendant로 포함하는 repo operation이 terminal
   success인지 확인한다.
2. `.worktrees/.repo-ops-deploy` HEAD가 merge SHA를 포함하고 tracked-clean인지
   확인한다.
3. 실제 server process가 그 deploy worktree에서 실행되는지, canonical port가
   listening인지, 기본 HTTP health 응답이 정상인지 확인한다.

deploy script가 실패하거나 executor가 끊기면 terminal success를 기록하지 않고,
같은 durable repo operation cursor가 기존
`script_retry → auto_repair_session → user_triggered_session` 사다리로 재개한다.

필수 source·generated artifact는 현재 PR이 운반하고 post-merge live 적용은
`[deploy]` coverage가 운반하므로 `worker-ineligible` label을 두지 않는다.

## 11. Test scope

### 11.1 RED→GREEN seams

이 절은 변경 전에 실제로 실패하는 새 동작만 담는다. UI-8vn1 기준에서 이미
통과하는 보존 동작은 §11.2 회귀로 옮긴다.

1. `server/worker/worktree.integration.test.js`
   - `dotfiles-dk6v` 형태(clean worktree + behind 상태의 contained ahead branch)를
     archive 검증 후 `worktree remove`와 CAS ref 삭제까지 마친다.
   - `UI-20gk` 형태(worktree 없는 contained ahead branch)를 archive 검증 후 CAS
     ref 삭제만으로 회수한다.
   - dirty base_contained와 contained ahead가 겹친 조합을 archive 검증과 restore
     후 회수한다.
   - 브랜치가 추가한 뒤 삭제한 파일은 `P`에서 빠져 증명을 통과하지만, 남은 bundle이
     그 중간 blob과 commit을 담고 있어 복구 가능하다.
   - 나중 커밋이 덮어쓴 중간 리비전도 같은 bundle에서 복구 가능하다.
   - behind 0인 순수 ahead branch는 `ahead_not_contained`로 보존한다.
   - `P`의 한 경로라도 mode 또는 blob이 다르면 `ahead_not_contained`로 보존한다.
   - rename은 `--no-renames`로 삭제·추가 두 경로로 각각 비교된다.
   - `base..ref`에 merge commit이 있으면 `ahead_merge_commit`으로 보존한다.
   - gitlink가 `ref`와 `base_oid` 어디에도 없고 `merge_base`에만 있는 경우에도
     `ahead_submodule_path`로 거절한다.
   - bundle 생성 또는 검증이 실패하면 `archive_failed`로 아무것도 바꾸지 않는다.
   - 관측과 CAS 삭제 사이 ref가 움직이면 `ref_delete_failed`로 브랜치를 보존한다.
   - 재관측에서 state 또는 identity가 달라지면 `identity_changed`로 무변경
     거절한다.

2. `server/worker/scheduler.test.js`
   - 두 실측 형태가 raw `worktree_stale_work` 없이 회수되고 같은 externally
     initiated tick에서 정상 dispatch된다.
   - branch-only 잔재는 resumable attempt row가 있어도 `preserve` 경로에서
     매칭되지 않고 회수된다.
   - 증명 실패 잔재는 `residue`가 포함된 structured admission으로 기록되고 attempt를
     만들지 않는다.
   - 형태별 capability 표(§8.1)가 그대로 계산된다.

3. `server/worker/queue-store.test.js`
   - `residue: 'branch'`가 normalize·persist·서버 재시작 뒤에도 보존된다.
   - `residue`가 없는 payload는 `worktree`로 읽힌다.
   - 같은 identity와 cause를 다시 관측하면 queue revision을 증가시키지 않는다.

4. `server/worker/recovery-archive.test.js` 및 `server/worker/discard-coordinator.test.js`
   - branch-only archive가 커밋 번들과 manifest만 만들고 verify를 통과한다.
   - manifest `excluded`가 worktree 파생 산출물의 부재를 드러낸다.
   - branch-only cleanup이 `worktree remove` 없이 CAS ref 삭제만 수행한다.
   - archive 실패 전 cleanup 0회, verified archive 후 cleanup 실패와 retry가
     receipt를 보존한다.

5. `server/ws/worker-handlers.capability.test.js`
   - `branch` 형태에서 continue/resume 요청이 무변경 거절된다.

6. `app/views/worker/index.test.js`
   - `branch` 형태 카드가 `이전 브랜치 보존됨` 제목과 고유 commit 수 요약,
     허용된 두 버튼만 렌더한다.

### 11.2 회귀 검증

이번 변경 전에 이미 통과하는 동작으로, 회귀가 없음을 확인한다.

- detached `head_ahead` 잔재를 계속 보존한다.
- UI-8vn1의 dirty base_contained·unique·unknown 판정이 그대로 유지된다.
- `branch_ahead`가 0인 기존 `discardable` 회수가 archive 없이 현행 그대로 동작한다.
- `worktree` 형태 카드 표현이 유지된다.
- `residue`가 없는 이전 projection에서 기존 badge가 계속 렌더된다.
- public projection이 경로, raw Git stderr, 파일 내용을 노출하지 않는다.
- 기존 clean residue 자동 제거, stop cleanup, `worktree_add_failed` badge.
- 기존 pause/failed attempt resume와 unified discard archive.
- queue CAS, restart normalization, lane scheduling, slot ownership.
- Worker/Monitor snapshot redaction.
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`

## 12. 수용 기준

1. `dotfiles-dk6v` 재현형과 `UI-20gk` 재현형이 사용자 개입 없이 회수되고 같은
   tick에서 dispatch된다.
2. 자동 회수가 ref를 지우기 전에 `<base>..<ref>` 커밋 bundle을 만들고 검증하며,
   증명이 보지 않는 중간 commit·blob·history까지 그 bundle에서 복구할 수 있다.
3. `P`의 어느 경로든 base와 다르거나, merge commit 또는 gitlink가 `merge_base`·
   `ref`·`base_oid` 중 어디에든 있거나, bundle 검증이 실패하거나, Git 관측이
   실패하면 파일·worktree·ref를 변경하지 않는다.
4. 판정 직전과 파괴 단계 사이 identity 또는 ref가 움직이면 CAS로 거절하고 원본을
   보존한다.
5. 자동 회수가 원격 ref, PR, base를 변경하지 않는다.
6. 고유 커밋을 가진 branch-only 잔재가 `백업 후 새로 시작`과 `다시 확인`을 가진
   실행 가능한 카드로 표시된다.
7. `residue`가 durable state의 normalize·persist·재시작을 거쳐 보존되고, 부재 시
   `worktree`로 읽혀 금지된 capability가 열리지 않는다.
8. 자동·수동을 가리지 않고 verified archive 없이는 어떤 파괴적 단계도 실행하지
   않는다. 백업 없는 삭제 action이 없다.
9. focused integration/scheduler/queue 회귀 테스트가 UI-8vn1의 dirty
   base_contained 및 unique/unknown 동작을 함께 보존한다.
10. dotfiles workflow metadata·label·status 어휘가 바뀌지 않는다.
11. 전체 pre-handoff validation과 frontend bundle 생성이 통과한다.
12. merge 이후 declared deploy operation이 terminal success이고, deploy worktree
    SHA·tracked-clean 및 실제 process path·port·HTTP health readback이 통과한다.

## 13. 제외 범위

- semantic patch containment, patch-id 기반 판정 또는 삭제
- 고유 commit 각각의 중간 트리가 base 이력에 존재하는지에 대한 증명. 실측
  `dotfiles-dk6v`처럼 base에 다른 커밋이 섞인 브랜치는 이 증명을 통과할 수 없어
  해결하려는 부류 자체를 탈락시킨다. 중간 내용은 증명이 아니라 §5.2의 검증된
  bundle이 책임진다.
- detached worktree HEAD가 base보다 앞선 `head_ahead` 잔재의 자동 회수
- untracked/ignored 상태나 submodule 내용의 포함 판정
- 원격 branch 삭제, PR close, 새 PR 복구 정책
- backup archive 자동 만료·삭제 UI
- Bead status/metadata/label 계약 변경
- Worker 밖의 임의 수동 worktree·branch 정리 도구
- 백업 없는 destructive cleanup

## 14. 실행 단위 근거

하나의 repository 안이지만 독립 검증 가능한 두 sealable unit을 가진다.

1. **ahead containment 증명, 삭제 전 archive, CAS 자동 회수.**
   `server/worker/worktree.js`와 `server/worker/recovery-archive.js`의 branch-only
   모드를 포함하는 server-only 변경이다. 두 실측 형태를 여기서 해소하며 frontend
   bundle이 필요 없고, focused integration/scheduler/archive 테스트만으로 봉인된다.
2. **증명 실패 branch-only 잔재의 복구 표면.** admission 소유·능력 계산과
   `residue` durable 보존, unit 1이 봉인한 branch-only archive 모드를 재사용하는
   사용자 백업 흐름, branch-only cleanup, ws 게이팅, Worker UI, bundle 재생성을
   포함한다.

두 번째 unit은 첫 번째가 봉인한 identity·archive·`residue` 계약을 소비하고
durable operation과 frontend bundle까지 포함한다. 따라서 route는 `full_plan`이며, spec
gate 뒤 plan이 Phase 경계를 고정한다. 착수는 `UI-8vn1`이 closed된 뒤다.
