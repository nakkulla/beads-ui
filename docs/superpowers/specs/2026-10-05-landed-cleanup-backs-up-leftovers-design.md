---
scope:
  - server/worker/worktree.js
  - server/worker/quickfix-landing.js
  - server/worker/pr-actions.js
  - server/worker/attach.js
  - server/worker/recovery-archive.js
  - server/worker/resolution-ladder.js
  - server/worker/queue-store.js
---

# 착지 뒤 정리는 남은 미전달 변경을 백업하고 마무리한다 (UI-w2ou)

## 1. 배경과 목표

2026-10-05 prostate `PROSTATE-u6u` quick_fix 착지는 base 포함 확인과 배포를 통과했다. 그런데 브랜치 정리에서
`worktree_remove_failed`(`manager_reason: untracked_present`)로 멈췄다. 사용자가 [정리 재시도]를 눌러도 같은 지점에서
다시 멈췄다. 막은 것은 Worker가 작업 폴더에 만들고 커밋에서 뺀 부산물 두 개(`storyboard.md.bak`,
`storyboard_preview.html`)였다. 원인이 그대로라 재시도는 언제나 같은 결과를 낸다.

이는 설계대로의 동작이다. 완료 정리(`removeCompleted`)는 base에 없는 내용이 작업 폴더에 남으면 지우지 않고 사람에게
넘긴다(§2). 그러나 착지가 증명된 뒤에 남은 것은 리뷰·배포가 끝난 결과물 밖의 부산물이거나 전달되지 않은 수정이다.
그 판단에 사람이 할 일은 "어딘가에 보존돼 있는가"를 확인하는 것뿐이다. 사용자 방향(2026-10-05)은 "멈추는 건 최대한
하지 않는다"이다. 2026-09-21 결정(ADR UI-18a5 잔재 처분)도 같은 원칙을 이미 디스패치 잔재에 적용했다. 그 결정은
"이어갈 수 없으면 자동 백업 뒤 새로 시작"이며, 착지 뒤 정리에는 빠져 있었다.

**목표:** 착지가 증명된 완료 정리에서 작업 폴더에 남은 미전달 변경(추적 파일의 미커밋 수정, 새 파일)은 검증된 체크섬
백업으로 보존한 뒤 워크트리와 로컬 브랜치를 지워 마무리한다. 사람에게 멈추는 것은 두 경우뿐이다. 하나는 백업이 보존을
증명하지 못하는 경우이고, 다른 하나는 소유·identity가 흔들린 경우다.

**비목표:** 디스패치 잔재 처분(`removeIfDiscardable`, ADR UI-18a5 잔재 처분)은 이미 자동 백업이라 바꾸지 않는다.
백업 자동 만료·용량 상한과 실패 사유의 한국어 문장 정비는 하지 않는다. 이미 멈춘 행을 자동으로 다시 판정하는 코드도
두지 않는다(§3.6).

## 2. 검증된 전제

기준은 `a3aa2a86cb535fdcfd07c0f7774e8aa246248efd`이다.

- `removeCompleted`는 topology lock 안에서 소유·identity를 확인한다. 이어 판정 순서는 다음과 같다.
  - special 경로가 있으면 `special_file`이다.
  - delivered tree와 다른 staged 경로는 `dirty_unique`이다.
  - 다른 unstaged·untracked 경로는 각각 `dirty_unique`·`untracked_present`로 거부한다.
  - 근거: `server/worker/worktree.js:1237-1251`, `:1388-1424`.
- 거부가 없으면 status digest를 다시 읽고, 같을 때만 지운다. digest에는 미추적 파일 내용 해시가 들어 있다. 순서는
  `git worktree remove --force` 다음 `update-ref -d`이다 — `server/worker/worktree.js:645-671`, `:1457-1492`.
- 그 해시는 `git hash-object --path=<경로>`라 clean 필터·줄끝 변환을 거친 값이다. 원시 바이트가 달라도 같은 해시가 될
  수 있다 — `server/worker/worktree.js:422-466`.
- 삭제 단계의 실패는 셋이다.
  - `remove_failed`: 워크트리 삭제 명령 자체가 실패한 경우다.
  - `ref_delete_failed`: 워크트리를 지운 뒤에 생긴다.
  - `post_remove_verify_failed`: 둘 다 지운 뒤에도 생길 수 있다.
  - 근거: `server/worker/worktree.js:1479-1508`.
- 소유 워크트리와 브랜치가 이미 없으면 성공을 돌려준다 — `server/worker/worktree.js:1305-1309`.
- status 관측은 `--untracked-files=all`이고 `--ignored`가 없다. 그래서 무시(.gitignore) 파일은 비교 대상이 아니고
  `remove --force`가 지운다 — `server/worker/worktree.js:583-586`, `:1479`.
- squash 뒤 비조상 이력만 `createBranchArchive`로 보존하며, 그 영수증은 버린다 —
  `server/worker/worktree.js:1427-1446`.
- worktree manager에 배선된 백업은 `recoveryArchive.createBranch` 하나뿐이다 — `server/worker/attach.js:1071-1081`.
- `recoveryArchive.create`가 하는 일 — `server/worker/recovery-archive.js:389-397`, `:474-495`, `:503-520`,
  `:573-588`, `server/worker/state-paths.js:66-80`.
  - 파일 사본 목록은 `diff --name-only HEAD`(작업 폴더 대 HEAD)와 무시되지 않은 미추적 파일이다. 그래서 HEAD=A,
    index=B, 작업 폴더=A인 경로는 사본에서 빠지고, B는 `index.patch`에만 남는다.
  - 두 patch는 `diff --cached --binary --full-index --no-ext-diff`와 `diff --binary --full-index --no-ext-diff`다.
    `--no-textconv`가 없어, textconv가 걸린 파일은 적용할 수 없는 변환 결과만 남을 수 있다.
  - 결과는 sha256 manifest·`COMPLETE`와 함께 `discard-backups/<operation_id>`에 만든다.
  - 같은 id 디렉터리가 이미 있으면 입력을 대조하지 않고 검증만 해 재사용한다.
  - 무시 파일은 manifest `excluded`에 적고 담지 않는다.
- 폐기 백업은 `archiveDiscardSource`가 이 동기 `create`를 topology lock 안에서 부른다 —
  `server/worker/discard-coordinator.js:583-612`, `server/worker/recovery-archive.js:958`.
- `discard-backups`를 지우거나 만료하는 코드는 없다. 확인 명령:
  `grep -rn 'discardBackupRootDir\|discardBackupDir' server app`. 정의 외 참조는 `recovery-archive.js`뿐이다.
- quick_fix 착지는 `branch_cleanup` 단계에서 `cleanupBranch` → `removeCompleted`를 부른다. 실패하면
  `worktree_remove_failed`와 `cleanup_detail{manager_reason, worktree_removed, branch_removed}`를 남긴다 —
  `server/worker/quickfix-landing.js:633-670`, `:1320-1331`.
- 변경 없음·가설 반박 종료(`settleNoChangeClose`)도 같은 `cleanupBranch`를 쓴다 —
  `server/worker/quickfix-landing.js:915-954`.
- 착지 기록은 `markStep`·`moveToDone`마다 `landing_extra`만 이어 쓴다. 단계 timeline은 `recordLandingStep`이 남긴다
  — `server/worker/quickfix-landing.js:1320-1334`, `:1349-1360`, `:220-253`.
- `settle`은 실행마다 `landing_extra`를 `null`에서 다시 시작한다. 이미 close된 Bead의 `parent_close` 지름길은
  `quickfix_landing`을 추가 필드 없이 새로 쓴다 — `server/worker/quickfix-landing.js:1046-1050`, `:1010-1027`.
- PR 머지 후 정리는 `cleanupCompletedBranches` → `removeCompleted`이다. 실패 detail은
  `manager_reason=<r> worktree_removed=<b> branch_removed=<b>` 문자열이다 — `server/worker/pr-actions.js:1618-1634`.
- 정리 실패 중 관측형(자동 재실행)은 `worktree_remove_failed`의 `manager_reason`이 `observe_failed`·
  `delivered_unobservable`·`archive_failed`일 때뿐이다 — `server/worker/resolution-ladder.js:45-60`.
- 실패한 quick_fix 착지는 [정리 재시도](같은 attempt의 settlement 재실행)로만 다시 돈다. 부팅 재분류는 세션 원인만
  다룬다 — `server/worker/scheduler.js:14045-14050`, `:14126-14133`, `:10961-10970`.
- 현행 스펙의 거부 규칙:
  - `docs/superpowers/specs/2026-09-14-worker-completion-outcome-cleanup-design.md:126-133`, `:150-152`, `:171-172`
  - `docs/superpowers/specs/2026-09-15-cleanup-failure-bead-scoped-auto-retry-design.md:87-91`
  - `docs/superpowers/specs/2026-08-29-quickfix-no-delta-close-settlement-design.md:93-96`
  - `docs/superpowers/specs/2026-08-18-worker-stale-worktree-recovery-design.md:44`
- 자동 처분의 표면 선례는 "백업 경로는 timeline detail에 기록한다"이다 —
  `docs/superpowers/specs/2026-09-21-worker-wait-guard-simplification-design.md:200-202`.
- 발생 현황은 `~/.local/state/bdui/*/beads/*/events.jsonl`에서 `worktree_remove_failed`를 grep해 확인했다.
  - 최근 Bead 5개: quick_fix `dotfiles-d0sb`·`PROSTATE-u6u`, PR `dotfiles-6ivn`·`dotfiles-gyno`·`Hippo-427`.
  - `manager_reason`이 남은 기록은 `PROSTATE-u6u`(`untracked_present`) 하나다.
  - 지금 이 사유로 멈춰 있는 행도 그 하나다(전 작업공간 `queue.json` 조회).

## 3. 설계

### 3.1 백업 대상

`removeCompleted`의 호출자는 세 곳이다(§2). 모두 착지 판정(base 포함·배포) 또는 변경 없음 종료 판정을 마친 뒤에만
이 함수를 부른다. 그래서 "착지가 증명됨"은 이 함수의 전제이고, 함수 안에서 다시 판정하지 않는다.
`removeCompleted`가 소유·identity를 확인한 뒤 작업 폴더에서 delivered tree와 다른 경로를 찾으면 다음과 같이 나눈다.

| 남은 상태 | 지금 | 바뀐 뒤 |
| --- | --- | --- |
| 무시되지 않은 새 파일(내용이 base와 다름) | `untracked_present`로 멈춤 | 백업 뒤 진행 |
| 추적 파일의 미커밋 수정(staged·unstaged) | `dirty_unique`로 멈춤 | 백업 뒤 진행 |
| special 파일(소켓·FIFO 등) | `special_file`, 미추적이면 `untracked_present`로 멈춤 | 어느 쪽이든 `special_file`로 멈춤 — `create`가 담지 못한다(`unsupported_file_type`) |
| status 해석 불가(`rename_or_copy`·`unmerged_state`·`submodule_state`·`typechange_state`·`unsupported_status`) | 그 사유로 멈춤 | 그대로 멈춤 — 백업 형식이 온전히 담는다고 보장하지 못한다 |
| 무시 파일 | 비교 없이 삭제 | 그대로 — 백업하지 않는다(manifest `excluded`) |

한 경로라도 백업 대상이면 백업 한 번이 작업 폴더의 모든 미전달 변경을 담는다. 모든 경로가 delivered tree와 같으면
지금처럼 백업 없이 지운다.

백업은 index와 작업 폴더 양쪽의 미전달 내용을 각각 원시 바이트로 복원할 수 있어야 한다. 현행 `create`는 이를
보장하지 않으므로(§2) 다음을 더한다. 이 보강은 폐기 백업에도 그대로 적용된다(같은 함수).

- staged 경로(index가 HEAD와 다른 경로)는 index blob의 원시 바이트 사본을 checksum과 함께 싣는다. HEAD=A, index=B,
  작업 폴더=A인 경로의 B도 사본으로 남는다.
- unstaged·미추적 경로는 지금처럼 작업 폴더 파일의 원시 바이트 사본이다.
- 두 patch는 `--no-textconv`·`--no-ext-diff`로 만든다. 변환 결과가 아니라 적용 가능한 원래 내용이 남는다.
- `verify`는 새 사본까지 checksum으로 검증한다.

- 결정: 규칙은 `removeCompleted` 한 곳에 둔다. 그래서 quick_fix 착지·변경 없음 종료·PR 머지 후 정리 세 경로가 함께
  바뀐다(대안: quick_fix만 — 같은 위험을 경로마다 다르게 다룰 이유가 없고, PR 경로도 같은 실패가 있었다).
- 결정: 남은 변경을 커밋해 base로 보내지 않는다(대안: 자동 커밋 후 정리 — 리뷰와 배포가 끝난 뒤라 리뷰 없는 내용과
  `.bak` 같은 부산물이 base에 들어간다).

### 3.2 순서와 원자성

topology lock을 쥔 채 아래 순서를 지킨다.

1. 소유·identity 확인과 첫 status digest. 현행 순서 그대로다.
2. 경로 분류(§3.1). 멈춤 대상이 하나라도 있으면 백업 없이 그 사유로 끝낸다.
3. 비조상 이력의 branch archive. 현행 그대로다.
4. 미전달 내용 인벤토리를 만든다. 인벤토리는 다음 세 가지로 이루어진다.
   - 경로 집합
   - 경로마다 종류·모드와 원시 바이트 sha256(staged 경로는 index blob, unstaged·미추적 경로는 작업 폴더 파일, 둘 다인
     경로는 둘 다)
   - 두 patch의 sha256

   바이트는 필터를 거치지 않고 읽는다. digest는 필터를 거친 해시라 이 대조를 대신하지 못한다(§2). 백업 manifest의
   인벤토리는 실제로 복사한 바이트로 계산한다. 그래서 복사 중 내용이 바뀌면 manifest가 4단계 인벤토리와 어긋난다.
5. 작업 폴더 백업(§3.3)을 만들거나 재사용하고 검증한다. 실패하면 `archive_failed`로 끝내며, 아무것도 지우지 않는다.
6. 삭제 직전 대조.
   - 인벤토리를 다시 만들어 백업 manifest의 인벤토리와 정확히 같은지 본다.
   - status digest와 HEAD·브랜치 재확인(현행)도 함께 통과해야 한다.
   - 하나라도 다르면 `identity_changed`로 끝내며, 아무것도 지우지 않는다.
7. `worktree remove --force` 다음 `update-ref -d`. 현행 그대로다.

백업 검증과 내용 대조 전에는 어떤 삭제도 일어나지 않는다. 그래서 "백업 없는 삭제는 없다"는 불변식(08-18 불변식 5)이
지우는 바로 그 내용에 대해 유지된다. `create`는 동기 복사라 큰 미추적 파일이 있으면 그동안 서버 이벤트 루프를
잡는다. 폐기 백업도 같은 `create`를 같은 잠금 안에서 부르므로(§2) 별도 처리는 하지 않는다.

### 3.3 백업 식별과 재사용

- 형식과 위치는 기존 recovery archive(`recoveryArchive.create`)와 `discard-backups/`를 쓴다. 별도 형식은 만들지
  않는다. §3.1의 index 사본은 같은 manifest에 더하는 항목이다.
- 백업 manifest는 §3.2의 인벤토리를 싣는다.
- 백업 id는 브랜치, 브랜치 head, 인벤토리 해시로 결정적으로 만든다.
  - 예: `completed-worktree-<sha256(branch)[:12]>-<head[:12]>-<sha256(inventory)[:12]>`.
- 재사용 규칙:
  - 같은 id의 백업이 이미 있으면, 그 manifest 인벤토리가 지금 인벤토리와 정확히 같을 때만 재사용한다.
  - 다르면 그 백업은 건드리지 않고 남긴다. 새 id(예: 같은 id에 순번 접미사)로 다시 만든다.
  - 복사 도중 내용이 바뀌어 manifest가 인벤토리와 어긋난 백업(A→B→A)은 재사용되지 않는다. 그 백업을 근거로 삭제하는
    일도 없다(§3.2 6단계).
- 재시작이나 [정리 재시도]로 같은 정리가 다시 돌면, 내용이 그대로인 한 같은 백업을 재사용한다. 워크트리가 이미
  지워졌으면 현행대로 성공한다.
- worktree manager에 작업 폴더 백업 의존성을 하나 더 배선한다. 이 의존성은 영수증
  `{path, manifest_sha256, file_count}`를 돌려준다.
  - 예: `createWorktreeArchive`. `attach.js`가 `createBranchArchive`처럼 `recoveryArchive.create`를 감싼다.
  - 배선이 없으면 백업 대상 경로는 현행 사유로 멈춘다(fail-closed).
- 결정: 용량 상한과 자동 만료는 두지 않는다(대안: 상한 초과 시 멈춤). 정리 뒤 워크트리가 지워지므로 디스크 순사용량은
  그대로이고, 늘어나는 것은 복사 중 최대치뿐이다. `discard-backups`의 현행 정책(만료 없음)과도 같다.

### 3.4 영수증 전달과 기록

- `removeCompleted`의 결과에 `backup`(영수증 또는 `null`)을 더한다.
  - 백업을 만든 뒤라면 성공이든 실패든 싣는다. 예를 들어 워크트리는 지웠는데 `ref_delete_failed`인 경우에도 싣는다.
  - 그래야 다음 실행에 작업 폴더가 없어도 경로가 사라지지 않는다.
- quick_fix 착지와 변경 없음 종료:
  - 성공 영수증은 `landing_extra`에 넣어 `markStep`·`moveToDone`을 거쳐 `quickfix_landing`에 남긴다
    (예: `cleanup_backup`).
  - 실패면 `cleanup_detail`에 같은 영수증을 싣는다.
  - 재진입 보존: `settle`은 시작할 때 durable `quickfix_landing`에 이미 있는 백업 영수증을 `landing_extra`로
    복원한다. 출처는 `cleanup_backup` 또는 `cleanup_detail`의 영수증이다.
  - 이후의 모든 기록은 그 영수증을 이어 쓴다. 대상은 `markStep`·`fail`·`moveToDone`, 이미 close된 Bead의
    `parent_close` 지름길, 변경 없음 종료의 완료 기록이다.
  - manager가 새 영수증을 주지 않는 재실행(이미 지워진 워크트리)에서도 앞서 기록한 백업 경로가 사라지지 않는다.
  - `LandingExtra`·`Attempt['quickfix_landing']` 타입을 함께 넓힌다.
- PR 머지 후 정리: 실패 detail 문자열에 `backup=<path>`를 덧붙인다. `manager_reason=` 토큰은 하나로 유지해야 분류가
  그대로다.
- 표면: 백업을 만든 정리는 Bead timeline에 한 줄을 남긴다. detail은 백업 경로다.
  - 예: `정리 — 커밋 안 된 변경 N개를 백업하고 워크트리를 지움`.
  - PR 경로에 timeline 기록자가 없으면 작업공간의 공유 timeline writer를 배선한다.
- 결정: 알림과 카드 슬롯은 더하지 않는다. 근거는 두 가지다.
  - 선례: 09-21 `stale_work_auto`.
  - 전제: ADR UI-18a5-3 — 정리는 조용히 둔다.

### 3.5 그대로 멈추는 경우

멈추는 경우는 시점에 따라 둘로 나뉜다.

**삭제 전 실패** — 워크트리와 브랜치를 건드리지 않고 그 사유로 끝난다.
- §3.1의 special·해석 불가 상태
- 소유·identity 계열(`identity_changed`·`ownership_changed`·`foreign_worktree`·`path_present`·`identity_invalid`).
  §3.2 6단계의 내용 대조 불일치도 여기에 든다.
- 백업 실패(`archive_failed`)
- 백업 배선 없음(§3.3). 이때는 현행 사유(`dirty_unique`·`untracked_present`)가 그대로 남는다.

**삭제 도중 실패** — 이미 지운 부분을 기록하고 재실행으로 이어간다.
- 해당 사유: `remove_failed`, 워크트리를 지운 뒤의 `ref_delete_failed`, 지운 뒤의 `post_remove_verify_failed`.
- `worktree_removed`·`branch_removed`와 백업 영수증을 실패 기록에 남긴다.
- 재실행은 남은 부분만 처리한다(§2 부재 시 성공).

출구는 현행 그대로다. quick_fix는 [정리 재시도], PR은 관측형 자동 재실행과 [워커로 이어가기]다. `archive_failed`는
PR 경로에서 이미 관측형이다(§2).

### 3.6 이미 멈춘 행

자동 재판정 코드는 두지 않는다(사용자 결정 2026-10-05). 지금 이 사유로 멈춘 행은 `PROSTATE-u6u` 하나다(§2). 이
수정 뒤에는 같은 사유의 새 행이 생기지 않는다. 배포 뒤 사용자가 그 행의 [정리 재시도]를 한 번 누르면 새 규칙으로 풀린다.

### 3.7 정정할 기존 문서

구현 PR에서 각 줄 아래에 `정정(UI-w2ou, 2026-10-05):` 주석을 단다.

| 문서 | 줄 | 정정 |
| --- | --- | --- |
| `2026-09-14-worker-completion-outcome-cleanup-design.md` | 130, 152, 171-172 | "유실할 고유 내용이 없다"를 "없거나 검증된 백업으로 보존했다"로 바꾼다. 추적·미추적 고유 변경은 멈춤이 아니라 백업 뒤 삭제다. 131-132행 "새 archive 서비스 없음"은 기존 recovery archive 재사용으로 지켜진다. |
| `2026-09-15-cleanup-failure-bead-scoped-auto-retry-design.md` | 89 | `dirty_unique`·`untracked_present`는 정상 배선에서는 착지 뒤 정리에서 생기지 않고 백업으로 처리된다. 백업 배선이 없을 때만 결정형으로 남는다고 적는다. |
| `2026-08-29-quickfix-no-delta-close-settlement-design.md` | 95-96 | `worktree_remove_failed` 분기는 남는다. 다만 남은 새 파일·수정은 백업 뒤 진행한다. |
| `2026-08-18-worker-stale-worktree-recovery-design.md` | 44 | 디스패치 잔재 문장이다. 착지 뒤 정리는 검증된 백업 뒤에만 지운다는 점(불변식 5)을 덧붙인다. |

## 4. 수용 기준

1. 착지가 증명된 quick_fix 정리에서 작업 폴더에 새 파일만 남아 있다고 하자. 다음이 모두 성립한다.
   - 검증된 백업이 생기고, 워크트리와 로컬 브랜치가 지워지고, 행이 완료(`done`)된다.
   - 백업 `files/`의 바이트가 원본과 같다.
   - `quickfix_landing`과 timeline에 백업 경로가 남는다.
2. 추적 파일의 미커밋 수정(staged·unstaged)도 같은 결과다.
   - 백업만으로 index와 작업 폴더의 원시 바이트를 각각 되살릴 수 있다.
   - HEAD=A, index=B, 작업 폴더=A인 경로의 B도 포함된다.
   - textconv가 걸린 파일도 patch가 변환 결과가 아니다.
3. 변경 없음·가설 반박 종료와 PR 머지 후 정리도 1·2와 같은 결과다.
4. §3.5의 삭제 전 실패는 워크트리와 브랜치를 건드리지 않는다. 실패 기록과 출구가 현행과 같다.
5. 백업과 삭제 사이에 내용이 바뀌면 지우지 않고 `identity_changed`로 끝난다.
   - 필터를 거치면 같아지고 원시 바이트만 다른 변경도 여기에 든다.
   - 그 뒤 내용이 처음 상태로 돌아와도(A→B→A), 어긋난 백업을 재사용해 지우지 않는다.
6. 내용이 그대로인 채 같은 정리를 다시 돌리면(재시작·재시도) 백업이 하나뿐이고 같은 경로를 재사용한다.
7. 삭제 도중 실패(워크트리를 지운 뒤 브랜치 삭제 실패 등) 뒤 재실행해서 완료되면, 완료 기록(`quickfix_landing`)에
   처음 만든 백업 경로가 남는다. 이미 close된 Bead의 `parent_close` 지름길로 끝나는 재시작에서도 같다.
8. 무시 파일은 백업에 없고 manifest `excluded`에 적힌다.
9. 알림이 없고, Worker·모니터 카드 표면이 바뀌지 않는다.
10. 배포 뒤 `PROSTATE-u6u` [정리 재시도] 한 번으로 행이 `done`이 된다. 백업에 `storyboard.md.bak`·
    `storyboard_preview.html`이 있다.

## 5. Test scope

**RED** — 변경 전 실패해야 하는 seam이다.

- `server/worker/worktree.integration.test.js`(실제 git):
  - 새 파일만 남은 경우 백업 뒤 삭제(변경 전: `untracked_present`)
  - staged·unstaged 미커밋 수정의 백업 뒤 삭제(변경 전: `dirty_unique`)
  - 백업 실패 주입 시 `archive_failed`와 무삭제(변경 전: 백업 호출이 없어 `untracked_present`)
  - 백업과 삭제 사이 내용 변경 시 `identity_changed`와 무삭제. 두 경우를 본다.
    - 원시 바이트만 다르고 필터 뒤 같은 변경(예: `.gitattributes` 줄끝 변환)
    - A→B→A 재실행에서 어긋난 백업 비재사용
  - 내용 그대로인 재실행의 백업 재사용
  - `ref_delete_failed` 결과의 백업 영수증
- `server/worker/recovery-archive.test.js`:
  - HEAD=A, index=B, 작업 폴더=A 경로의 index 사본과 그 checksum 검증
  - textconv가 설정된 파일의 patch가 원래 내용을 담음
- `server/worker/quickfix-landing.test.js`:
  - 성공 영수증이 `markStep`·`moveToDone`을 거쳐 남음
  - 실패 `cleanup_detail`의 영수증
  - 재진입 복원: 부분 삭제 뒤 재실행, close 뒤 `parent_close` 지름길 재시작
  - 변경 없음 종료 경로
  - timeline 한 줄
- `server/worker/pr-actions.test.js`: 백업 timeline 줄, 실패 detail의 `backup=` 토큰.

**회귀** — 현행 동작을 지키는 검사이고, 변경 전에도 통과한다.

- `server/worker/worktree.integration.test.js`:
  - special 파일 멈춤
  - 무시 파일 미포함
  - 배선 없음 시 현행 사유로 멈춤
  - 모든 경로가 delivered tree와 같을 때 백업 없이 삭제
- `server/worker/resolution-ladder.test.js`: `backup=` 토큰이 붙은 detail의 분류가 바뀌지 않음.
- 폐기 백업 기존 테스트: index 사본이 더해져도 통과한다.
- 저장소 기본 검증은 `AGENTS.md` Unit Testing Standards·Pre-Handoff Validation 그대로다.

## 6. 경계·후속

형제·후속 Bead는 없다.

- 관찰: `worktree_remove_failed`·`untracked_present` 등 정리 사유에 한국어 실패 문장이 없다. 카드에는 원시 토큰만
  보인다 — 이 수정 뒤 남는 멈춤은 드물어 별도 Bead를 만들지 않는다.
- 관찰: dotfiles storyboard 스킬이 `.bak`·미리보기를 저장소 작업 폴더 안에 만든다 — 이 수정이 모든 세션의 부산물을
  덮으므로 스킬 쪽 Bead는 만들지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-18a5 — 실패 attempt 타일의 `↻ 정리 재시도`(같은 attempt의 settlement 재실행)는 그대로다. 남은
  멈춤의 출구이자, 이미 멈춘 행을 푸는 수단으로 쓴다.
- 전제: ADR UI-18a5-3 — 머지 후 정리 실패는 알림 없이 카드·timeline·댓글에만 남는다. 백업 기록도 알림 없이
  timeline에만 남긴다.
- 착지가 증명된 완료 정리는 남은 미전달 변경을 검증된 체크섬 백업 뒤 지우고 사람에게 멈추지 않는다 — 첫 조건 실패:
  되돌리기는 `removeCompleted`의 백업 분기와 `attach.js` 배선을 빼는 한 번의 변경이고, 이미 만든 백업은 그대로
  유효하다. 거부 규칙을 정한 세 스펙에는 §3.7 정정 주석이 남는다 → ADR 아님
- 남은 변경을 커밋해 base로 보내지 않는다 — 첫 조건 실패: 스펙 한 줄로 바뀌는 범위 결정이다 → ADR 아님
- 백업 위치는 `discard-backups` 재사용, 용량 상한·자동 만료 없음 — 기본 제외 목록(한도·보존 수치) → ADR 아님
- 이미 멈춘 행은 자동 재판정 없이 배포 뒤 사용자 [정리 재시도] 한 번으로 푼다 — 첫 조건 실패: 한 번 하는 운영
  조치다 → ADR 아님
