# 재시작 생존 runner 제어와 통합 폐기 원복 설계 (UI-309b)

- 날짜: 2026-08-10
- Bead: UI-309b (route: full_plan)
- Target base: `main` (`origin/main`)
- 관련 기존 설계:
  - `2026-07-25-worker-phase1-pause-claude-only.md`
  - `2026-07-27-worker-discard-button.md`
  - `2026-07-27-worker-detached-session-reconcile.md`
  - `2026-07-27-worker-residue-dispatch-hygiene.md`

이 문서는 위 설계의 ⏸/■/[폐기] 의미 중 본 문서와 충돌하는 부분을 대체한다.
기존 attempt 이력의 `stopped` 값은 그대로 읽지만, 새 UI와 새 전이는 이 문서의
⏸/[폐기] 계약을 따른다.

## 1. 문제

워커 runner는 `detached: true`로 실행되므로 beads-ui 서버가 재시작돼도 살아남을
수 있다. 현재 startup recovery는 그런 `running` attempt의 session log tail과
usage 집계는 되살리지만 scheduler의 process-local `running` handle은 복구하지
않는다. 그 결과 다음 불일치가 생긴다.

1. UI의 live transcript는 이어지지만 ⏸와 ■는 `running` map에 없는 attempt를
   제어하지 못한다.
2. `pause()`가 SIGTERM을 보낸 직후 서버가 재시작되면 process-local
   `paused_done`이 사라진다. 이후 stop 경로는 persisted PID를 다시 확인하지 않고
   runner가 이미 끝났다고 가정할 수 있다.
3. 실행 tile의 ■와 `pr_wait`의 [폐기]는 이름도 의미도 다르며, failed/orphaned와
   merged cleanup failure에는 구현 전체를 안전하게 포기하는 한 개의 동작이 없다.
4. 현재 PR 폐기는 단발 transition이다. PR close, Bead 변경, branch/worktree 삭제,
   queue mutation 사이에 서버가 재시작되면 어떤 단계까지 끝났는지 durable하게
   알 수 없다.
5. 삭제 전에 복구 가능한 snapshot을 만들지 않으므로 dirty/untracked 변경이나
   remote branch만 남은 commit을 잃을 수 있다.
6. 이미 merge된 구현은 history rewrite 없이 원복해야 하지만 현재 adapter에는
   revert branch/PR 생성 경로가 없다.

## 2. 확정된 제품 의미

### 2.1 제어는 ⏸와 [폐기] 두 개다

- **⏸ 일시정지**: runner를 종료하되 session/worktree/branch/PR/Bead lane을 보존한다.
  같은 `session_id`로 재개할 수 있다.
- **[폐기]**: “이 구현을 구현 직전 상태로 되돌린다”는 durable 요청이다. 실행,
  paused, failed/orphaned, worker 소유 `pr_wait`, merged cleanup failure에서 같은
  라벨과 같은 확인 UX를 쓴다.
- 기존 **■ stop 버튼은 제거**한다. 새 폐기 성공은 별도 stop 의미가 아니라 아래
  rollback operation의 완료를 뜻한다.
- failed banner의 ↻/✕는 각각 재개/배너 확인이라는 기존 의미를 유지하고, [폐기]를
  함께 노출한다.

### 2.2 daemon은 추가하지 않는다

- 살아남은 runner 자체는 현재처럼 OS detached process group으로 유지한다.
- beads-ui 서버가 process controller이자 durable operation driver다.
- 서버 startup은 persisted control/discard intent를 읽어 중단된 단계를 재개한다.
- live transcript는 기존 file tail/session monitor를 계속 사용한다.
- recovered `running` attempt는 기존처럼 scheduler slot을 점유하고 중복 dispatch를
  막는다.

따라서 전역 supervisor daemon이나 별도 SQLite job service는 이번 범위가 아니다.
서버가 내려가 있는 동안 runner는 계속 실행될 수 있지만, 제어 요청은 서버가 다시
올라온 뒤 durable state machine이 이어서 처리한다.

### 2.3 폐기의 종료 조건

- **아직 merge되지 않음**: recovery archive 검증 → runner 종료 확인 → OPEN PR
  close → worktree/local branch/remote branch 정리 → Bead `open` 및 `pr_url` 제거 →
  후보 레인 복귀.
- **이미 merge됨**: 원본 구현 archive 검증 → 현재 target base에서 inverse change를
  담은 revert branch/PR 생성 → 사람의 merge 대기. revert PR이 merge되고 기존
  post-merge verify/deploy가 성공한 뒤에만 잔재를 정리하고 Bead를 `open` 후보로
  돌린다.
- 어느 경로도 base reset, force-push, merge commit 삭제, 자동 revert merge를 하지
  않는다.
- archive/process identity/PR state/ownership/readback 중 하나라도 확정되지 않으면
  정리하지 않고 fail closed한다.

## 3. 스코프

### 포함

- recovered `running`/pause-in-flight runner의 live·⏸·[폐기] 제어
- PID+PGID+start time 기반 process identity와 group 종료 확인
- `queue.json` 기반 durable attempt control/discard operation
- 삭제 전 recovery archive 생성·검증
- running/paused/failed/orphaned/worker-owned `pr_wait`/merged cleanup failure의
  통합 [폐기]
- OPEN/CLOSED-unmerged PR close와 branch/worktree/Bead 정리
- MERGED PR의 inverse-diff revert PR 생성 및 human-merge 후 완료
- Worker와 Monitor의 동일 제어, progress/error/readback 표시
- restart/crash/race/idempotency 테스트

### 비-목표

- 전역 runner daemon/supervisor 도입
- 외부 PR row의 branch/worktree 자동 삭제. worker ownership을 증명할 수 없으므로
  기존처럼 [폐기] 대상이 아니다.
- Done lane에서 이미 완료·정리된 임의 과거 변경을 찾아 원복하는 기능
- revert PR 자동 merge
- git history rewrite, force-push, target base reset
- backup 자동 만료/삭제 UI. v1 archive는 명시적으로 지우기 전까지 보존한다.
- 새 Bead status/label/metadata 키 또는 dotfiles workflow 계약 의미 변경

## 4. 현재 구현에서 재사용할 seam

- `server/worker/runner/session.js`: detached process group, negative PID signal,
  transcript fd와 tail reader
- `server/worker/session-monitor.js`, `attach.js`: startup log boundary, usage replay,
  detached session live monitor
- `server/worker/scheduler.js`: slot/claim, pause/resume, base-drift settlement,
  workflow/exec stamp rollback
- `server/worker/queue-store.js`: workspace별 atomic `queue.json` persist와 revision CAS
- `server/worker/pr-actions.js`: PR authoritative read, close, branch/worktree cleanup,
  merge cleanup/deploy pipeline
- `server/worker/worktree.js`: branch ownership 관측과 fail-closed removal
- `server/worker/gh.js`: GitHub CLI injection seam
- Worker/Monitor의 기존 pause/resume/PR discard event delegation과 toast/banner

기존 `scheduler.stop()`과 `prActions.discard()`를 서로 호출하게 만드는 방식은 쓰지
않는다. 둘은 memory-only fence와 서로 다른 partial-state 계약을 갖고 있어 restart
safe한 단일 의미가 되지 못한다. 공통 durable coordinator 아래에 process/backup/PR/
cleanup 단계를 명시적으로 둔다.

## 5. Durable 데이터 모델

### 5.1 Process identity

새 attempt는 spawn 성공 시 다음 identity를 한 번에 기록한다.

```js
process_identity: {
  pid,
  pgid,
  started_at
}
```

- detached child는 process-group leader이므로 정상 spawn에서는 `pid === pgid`를
  확인한다. 확인되지 않으면 launch를 실패 처리한다.
- legacy attempt는 기존 `pid`/`started_at`을 읽고 `pgid = pid`로만 추론하되,
  실제 `getpgid(pid)`/start time이 모두 일치할 때만 제어할 수 있다.
- probe 결과는 `owned | gone | recycled | unknown` 네 가지다.
  - `owned`: PID alive, start time 일치, PGID 일치
  - `gone`: PID와 process group 모두 없음
  - `recycled`: PID는 존재하지만 start time 또는 PGID가 다름. 저장 runner는 끝난
    것으로 판단하되 그 process에는 signal을 보내지 않는다.
  - `unknown`: `ps`/group probe 오류 또는 필요한 identity 부재. 아무 signal/cleanup도
    하지 않는다.
- signal 직전과 강제 signal 직전에 identity를 다시 확인한다.
- 종료 성공은 leader PID 부재만이 아니라 process group 부재까지 확인해야 한다.
  leader는 없고 같은 PGID group이 남아 ownership을 증명할 수 없으면 `unknown`으로
  fail closed한다.

### 5.2 Attempt control

attempt에 nullable한 durable control record를 둔다.

```js
control: {
  kind: 'pause',
  phase: 'requested' | 'signaled' | 'terminated' | 'done' | 'failed',
  requested_at,
  last_error
}
```

- ⏸ click은 먼저 `requested`를 atomic persist하고 readback한 뒤 signal한다.
- owned group에 SIGTERM을 보내고 유한 grace 뒤에도 남으면 identity를 다시 확인해
  SIGKILL한다.
- session monitor를 EOF까지 drain하고 group 부재를 확인한 뒤 attempt를 `paused`로
  기록한다. session/worktree/branch/lane은 유지한다.
- 서버가 어느 단계에서 재시작돼도 startup control recovery가 이 record를 scheduler
  dead-attempt reconcile보다 먼저 처리한다. process가 이미 끝났다면 `paused`로
  finalize하므로 ordinary failure로 오판하지 않는다.
- `done` control은 attempt history에 남기되 active intent로 세지 않는다.

### 5.3 Discard operation

`queue.json`에 `discard_operations` map을 추가하고 `bead_id`당 active operation은
하나만 허용한다. 최소 shape은 다음과 같다.

```js
{
  operation_id,
  bead_id,
  attempt_id,
  requested_at,
  mode: 'undecided' | 'unmerged' | 'merged_revert',
  phase,
  process_identity,
  source_snapshot,
  backup: { path, manifest_sha256, verified_at },
  original_pr,
  revert_pr,
  last_error
}
```

`source_snapshot`은 첫 mutation 전에 고정한 다음을 담는다.

- repo/workspace/worktree/branch/target base와 관측 근거
- attempt status/base/head/session id/process identity
- local branch/ref SHA, remote branch/ref SHA
- PR number/url/state/base/head ref/base SHA/head SHA
- Bead status와 기존 `pr_url`
- queue/pr_wait/cleanup_failed/merge_queue membership

operation 생성과 다음 fence는 한 store mutation이다.

- 해당 bead의 자동 dispatch와 external PR adoption 금지
- merge queue에서 제외하고 새 merge click 거부
- pause/resume/충돌해소/중복 discard 거부
- poller observation은 무시하지 않고 operation driver에 전달

각 phase는 “외부 side effect 실행 → authoritative readback → 다음 phase atomic persist”
순서다. 재시작 후에는 phase 이름만 믿지 않고 해당 readback을 반복해 이미 끝난
side effect를 확인한다. 부재는 관측 성공 뒤에만 success이며, 관측 실패는 부재가
아니다.

새 attempt 성공 종료에는 `discarded`를 사용할 수 있다. 기존 `stopped` attempt는
history로 그대로 normalize/render하고 새 write에서는 만들지 않는다. 이미 `done`인
PR-delivery attempt는 과거 실행 사실이므로 덮어쓰지 않고 discard operation에만
폐기 이력을 남긴다.

## 6. Recovery archive

### 6.1 위치와 완료 표식

archive는 repo/worktree 밖의 다음 위치에 둔다.

```text
$XDG_STATE_HOME/bdui/<workspace-slug>/discard-backups/<operation-id>/
```

먼저 sibling temp directory에 쓰고, 모든 checksum과 bundle 검증이 끝난 뒤 final
directory로 atomic rename한다. `manifest.json`과 그 SHA-256을 담은 `COMPLETE`가
둘 다 일치해야 `backup_verified`로 전이한다. partial temp는 startup에서 완료로
간주하지 않으며 같은 operation이 안전하게 다시 만든다.

### 6.2 내용

- `manifest.json`: §5.3 snapshot, archive schema version, 파일 mode/type/size/SHA-256,
  제외/실패 항목
- `commits.bundle`: target base에 없는 source head commit. 원격 branch가 이미
  없어도 GitHub pull ref/head SHA fetch를 시도한다.
- `index.patch`: `git diff --cached --binary --full-index`
- `worktree.patch`: `git diff --binary --full-index`
- `files/`: modified tracked file과 `git ls-files --others --exclude-standard`로 찾은
  untracked file의 frozen byte copy. symlink는 link 자체를 기록하며 workspace 밖
  target을 따라가지 않는다.
- `session.jsonl`: 해당 attempt transcript가 있으면 copy와 checksum

ignored file, dependency/build output는 포함하지 않고 manifest에 제외 규칙을 적는다.
dirty submodule, socket/device 등 완전한 복구를 보장할 수 없는 항목을 만나면
archive를 성공 처리하지 않고 fail closed한다.

### 6.3 실행 중 snapshot의 안정성

살아 있는 runner에는 삭제 signal을 보내기 전에 다음 순서를 적용한다.

1. durable discard intent/fence 기록
2. process identity 확인
3. owned process group에 SIGSTOP을 보내 quiesce
4. repository topology lock 아래 snapshot/archive 생성 및 검증
5. archive receipt persist
6. SIGTERM+SIGCONT, grace 뒤 필요하면 identity 재확인 후 SIGKILL
7. process group 부재와 session-log EOF drain 확인

SIGSTOP은 backup consistency를 위한 quiesce이며 kill/cleanup이 아니다. archive가
실패하면 group을 임의로 재개하거나 삭제하지 않고 operation을 `failed`로 표시한 채
quiesced 상태와 모든 artifact를 보존한다. 사용자가 원인을 고친 뒤 [재시도]로 같은
operation을 이어간다.

이미 process가 `gone`/`recycled`이면 signal 없이 archive한다. `unknown`이면 archive
일관성도 보장할 수 없으므로 시작하지 않는다.

## 7. 통합 [폐기] state machine

### 7.1 공통 진입

1. WS `worker-discard`는 `{ bead_id, attempt_id?, expected_revision }`을 받는다.
2. server가 대상이 latest/leaf attempt 또는 worker-owned PR row인지, revision과
   worktree/branch ownership이 일치하는지 검증한다.
3. 사용자 확인 한 번으로 operation을 생성한다. 이미 active operation이 있으면 새로
   만들지 않고 현재 operation을 반환한다.
4. §6 archive를 검증한다. 이 단계 이전에는 runner kill, PR close, Bead 변경,
   branch/worktree 삭제를 하지 않는다.
5. runner가 있으면 종료를 확정하고 base-drift/guard evidence를 기존 settlement seam으로
   기록한다.
6. GitHub에서 PR state/head/base를 authoritative하게 다시 읽어 아래 두 경로로
   분기한다. read 실패는 fail closed다.

### 7.2 Unmerged 경로

- PR 없음: cleanup으로 진행한다.
- PR `OPEN`: close 요청 후 `CLOSED` readback을 확인한다.
- PR `CLOSED`이고 merge되지 않음: close를 생략한다.
- OPEN read와 close 사이 merge돼 close가 실패하면 다시 읽고 `MERGED`일 때 merged
  revert 경로로 원자적으로 전환한다. 단순 close 실패는 멈춘다.

정리 순서:

1. source worktree를 exact branch ownership 아래 제거
2. local branch 부재 확인
3. remote branch 삭제 및 `ls-remote` 부재 확인
4. Bead status를 `open`으로 쓰고 readback
5. `pr_url` 제거 및 readback
6. queue/pr_wait/admission/cleanup_failed/merge_queue membership 제거와 operation `done`
   기록을 한 store mutation으로 처리
7. queue snapshot push와 candidate refresh

마지막 store mutation 전까지 durable fence가 후보 재등장과 재dispatch를 막는다.
성공해도 archive는 유지하며 UI가 경로와 operation id를 알려준다.

### 7.3 Merged revert 경로

MERGED는 “폐기 불가”로 끝내지 않지만, 기존 merge를 삭제하지도 않는다.

1. GitHub PR detail에서 original `baseRefOid`/`headRefOid`/merge SHA, merge 방식,
   PR commit/file 목록과 target base를 고정하고 필요한 OID를 fetch한다.
2. 최신 fetched target-base tip에서 `revert-<bead-id>-<operation-short-id>` branch와
   같은 basename의 임시 worktree를 만든다.
3. **실제로 target base에 들어간 exact integrated delta**를 merge 방식별로 증명한다.
   - merge commit: first parent tree→merge commit tree
   - squash: squash commit parent tree→squash commit tree. PR file 목록과 대조한다.
   - rebase: target-base first-parent history에서 PR commit series와 patch-id/path가
     일치하는 contiguous range를 증명한다. exact range를 증명하지 못하면 추측하지
     않는다.
4. 증명된 aggregate binary diff를 현재 base에 reverse 3-way apply한다. empty inverse,
   unproven range, apply conflict, binary/submodule 복원 불가, verify 실패는 push하지
   않고 fail closed한다.
5. repo의 declared pre-merge verification을 실행하고 commit/push한다.
6. 원본 PR/operation/archive를 명시한 revert PR을 같은 target base로 생성한다.
   자동 merge/auto-merge queue 등록은 하지 않는다.
7. Bead를 `resolved`, `pr_url=<revert-pr-url>`로 readback하고 기존 durable
   `pr_wait` row를 rollback-wait로 유지한다. 원본 PR URL/SHA는 operation에 남긴다.
8. local revert worktree는 push/readback 뒤 제거하고 remote revert branch는 PR
   lifecycle 동안 보존한다.

revert PR이 merge되면 기존 base sync/post-merge verify/deploy seam을 재사용하되,
rollback operation인 경우 child close/parent close/ship 완료 경로로 보내지 않는다.
verify/deploy/branch cleanup이 모두 성공한 뒤 Bead를 `open`, `pr_url` 제거로
readback하고 pr_wait/operation을 완료한다. revert PR이 GitHub에서 직접 merge돼도
poller가 같은 operation을 찾아 동일 finalize를 실행한다. revert PR이 merge 없이
닫히면 operation과 archive를 보존한 failure로 남긴다.

### 7.4 Merge cleanup failure

`cleanup_failed`가 있는 row도 [폐기]를 노출한다. authoritative PR이 MERGED이므로
항상 §7.3으로 간다. 기존 cleanup retry [정리]와 [폐기]는 동시에 실행할 수 없으며,
먼저 durable operation/fence를 잡은 쪽만 진행한다. discard operation이 시작되면
기존 detached deploy pending launch도 취소 가능한 단계에서는 취소하고, 이미
launch됐거나 결과를 모르면 멈춰 사람이 확인하게 한다.

## 8. Startup recovery와 동시성

startup 순서:

1. queue store load (`auto_advance=false` 유지)
2. active discard operation 복구 및 fence 재구성
3. pending pause control 복구
4. recovered running attempt의 usage replay/session monitor 연결
5. discard/control driver 재개
6. ordinary dead-attempt reconcile와 PR poller 시작

핵심 race 규칙:

- poller는 durable discard가 있는 PR의 CLOSED/MERGED 관측을 ordinary cleanup으로
  소비하지 않고 operation driver에 전달한다.
- scheduler slot 계산과 active/external-protected 집합은 active discard bead를 항상
  포함한다.
- branch/worktree 관측과 삭제는 기존 topology lock을 공유한다.
- GitHub/BD/git/store write는 성공 응답만으로 완료하지 않고 authoritative readback을
  요구한다.
- process identity가 바뀌면 signal하지 않는다. unknown 상태는 “이미 종료”로
  축약하지 않는다.
- operation retry는 같은 `operation_id`와 archive를 재사용하고 외부 action을
  중복 실행하지 않는다.
- 두 browser의 동시 click은 queue revision CAS와 bead별 active-operation uniqueness로
  하나만 승인한다.

## 9. UI/프로토콜

### 9.1 Worker

- running tile: `⏸` + `[폐기]`
- paused tile: `▶` + `[폐기]`
- latest failed/orphaned banner: `↻` + `[폐기]` + `✕`
- worker-owned pr_wait row: `[머지]/[정리]` 상태와 별개로 가능한 경우 `[폐기]`
- merged cleanup failure: `[정리]`와 `[폐기]`를 모두 보여 주되 한 operation이 시작되면
  다른 쪽은 disable
- discard 진행 중에는 phase(`백업 중`, `runner 종료 중`, `PR 정리 중`,
  `revert PR 대기`, `원복 배포 중`)와 마지막 error/[재시도]를 표시

확인 문구는 결과를 상태별로 명시한다.

- unmerged: “복구 archive를 만든 뒤 runner/PR/branch/worktree를 정리하고 이슈를
  후보로 되돌립니다.”
- merged: “이미 merge된 구현입니다. 복구 archive를 만든 뒤 revert PR을 생성하며,
  실제 원복은 사람이 그 PR을 merge한 뒤 완료됩니다.”

### 9.2 Monitor

Worker와 같은 eligibility, 확인 문구, WS action을 사용한다. Monitor가 별도 stop/
discard 의미를 재구현하지 않는다.

### 9.3 Protocol

- 신규/통합 request: `worker-discard`
- pause: `worker-attempt-pause` 유지, durable control 결과(`phase`, `reason`) 추가
- retire: `worker-attempt-stop`, `worker-pr-discard` active frontend call 제거
- snapshot: active discard operation의 UI-safe projection만 포함. archive 절대경로는
  해당 로컬 UI에만 노출하고 session prompt처럼 별도 민감 payload에는 섞지 않는다.
- 실패 응답은 boolean 무시가 아니라 stable reason과 operation state를 반환하고
  Worker/Monitor가 toast/banner로 표시한다.

## 10. 계약 locality와 migration

- Bead에는 기존 `open`/`resolved`와 `pr_url`만 사용한다. 새 status/label/metadata를
  만들지 않는다.
- attempt/control/discard/cleanup state는 beads-ui의 `queue.json` 내부 계약이다.
- dotfiles `workflow.{md,yaml}`의 `resolved`/`closed`, review receipt, execution setting,
  finishing 의미는 바꾸지 않는다. 따라서 dotfiles cross-repo unit은 없다.
- merged 원복은 history rewrite가 아니라 명시적 revert PR이고, human merge와 기존
  verify/deploy gate를 통과한다.
- legacy queue:
  - `process_identity`가 없으면 검증 가능한 경우에만 `pid`/`started_at`에서 보수적으로
    복구한다.
  - `discard_operations`/`control` 부재는 빈 상태다.
  - `stopped`는 historical terminal로 읽되 새 write는 하지 않는다.
- 기존 `worker-attempt-stop`/`worker-pr-discard` 메시지를 보내는 stale client에는
  `action_retired`를 반환해 조용한 no-op을 막는다.

## 11. 실패 표시와 운영 복구

- 모든 failure는 `operation_id`, phase, stable reason, 마지막 검증된 receipt를
  queue snapshot에 남긴다.
- [재시도]는 새 operation을 만들지 않고 같은 phase에서 authoritative observation을
  반복한다.
- archive 성공 후 cleanup 실패는 archive path를 항상 표시한다.
- archive 이전 실패는 “아직 아무것도 삭제하지 않음”을 표시한다.
- revert PR 생성 뒤 실패는 PR URL과 현재 merge state를 표시한다.
- 자동 archive 삭제는 없다. 수동 복구 문서는 manifest, bundle, patches, files를
  이용한 복원 절차와 checksum 확인을 설명한다.

## 12. Acceptance criteria

1. 서버 재시작을 살아남은 `running` attempt가 live transcript를 계속 보내고,
   중복 dispatch 없이 slot을 점유하며, ⏸/[폐기]가 process identity를 확인해 작동한다.
2. pause SIGTERM과 child exit 사이에 서버가 재시작돼도 pending pause가 `paused`로
   finalize되고, 살아 있는 group을 종료됐다고 가정하지 않는다.
3. 새 UI에는 ■가 없고 Worker/Monitor의 대상 상태에 [폐기]가 일관되게 보인다.
4. [폐기]는 runner kill/PR close/ref 삭제/Bead 변경 전에 complete recovery archive를
   검증한다.
5. archive에는 commit, staged/unstaged, modified/untracked file, session evidence와
   checksum manifest가 포함된다.
6. 각 destructive phase 뒤 서버를 재시작해도 같은 operation이 중복 side effect나
   데이터 유실 없이 완료 또는 fail-closed 상태로 복구된다.
7. unmerged PR은 close되고 local/remote branch와 worktree가 없어지며 Bead는 자동
   재queue 없이 `open` 후보로 돌아온다.
8. OPEN→MERGED race는 cleanup으로 오판하지 않고 revert PR 경로로 전환한다.
9. merged/cleanup-failed PR의 [폐기]는 revert PR만 만들고 자동 merge하지 않는다.
   그 PR의 merge+verify+deploy가 성공하기 전에는 Bead를 후보로 돌리지 않는다.
10. identity/backup/GitHub/BD/git/store readback 실패는 artifact를 보존하고 UI에
    operation phase/reason/[재시도]를 노출한다.
11. 외부 PR과 Done lane에는 destructive [폐기]를 제공하지 않는다.
12. `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`가
    통과하고 frontend bundle/map이 갱신된다.

## Test scope

### RED→GREEN seams

1. **Process identity/controller**
   - 새 `server/worker/process-controller.js` 단위 테스트: owned/gone/recycled/unknown,
     PGID mismatch, signal 직전 identity drift, TERM grace→KILL, group 부재 확인.
   - runner spawn 테스트: detached child의 `pid===pgid` snapshot과 legacy identity
     보수적 복구.

2. **Durable pause recovery**
   - scheduler/queue-store 테스트: pause intent가 signal보다 먼저 persist되고, 각
     phase crash/reload 뒤 `paused`로 finalize된다.
   - attach/session-monitor 테스트: recovered running live tail은 한 번만 replay되고,
     pending pause 종료 시 EOF drain 뒤 monitor가 내려간다.

3. **Recovery archive**
   - 새 archive module 테스트: ahead commit bundle, staged/unstaged binary patch,
     modified/untracked/symlink copy, session copy, checksum/COMPLETE 검증.
   - temp partial/manifest corruption/dirty submodule/special file/disk write failure가
     destructive phase를 열지 않는지 검증.
   - real git fixture에서 `git bundle verify`와 frozen file checksum을 검증.

4. **Discard operation persistence/idempotency**
   - queue-store 테스트: operation create uniqueness, phase transition CAS, active fence,
     legacy normalize, final atomic lane removal.
   - 각 외부 side effect 직후 injected crash → 새 coordinator/store로 reload → 이미
     확인된 action은 중복하지 않고 다음 단계만 실행.

5. **Unmerged PR cleanup/races**
   - pr-actions stateful fake: PR 없음/OPEN/CLOSED/MERGED/read error/close fail,
     OPEN→MERGED race, poller와 discard 동시 관측, branch auto-delete와 ls-remote 실패.
   - worktree integration: exact branch ownership, foreign/prunable/detached/list failure,
     cleanup idempotent absence.

6. **Merged revert PR**
   - gh adapter: base/head/merge OID 조회, pull ref fetch, branch push, PR create/readback.
   - real git fixtures: merge/squash/rebase 모양의 actual integrated range 증명과
     aggregate tree diff reverse apply, rebase range 불명확/conflict/binary/submodule/
     empty inverse 거부.
   - revert PR human merge 관측 뒤 verify/deploy/branch cleanup/Bead open finalize와
     close-without-merge failure.

7. **WS/UI 통합**
   - WS: `worker-discard` revision CAS, target routing, active-operation reuse, stable reason,
     retired action error.
   - Worker/Monitor: ■ 부재, running/paused/failed/pr_wait/cleanup_failed eligibility,
     external/Done 제외, 상태별 확인 문구, phase/error/retry rendering.

### Characterization / 회귀 검사

- existing pause/resume session id와 workflow/exec stamp semantics
- recovered running slot accounting과 usage replay boundary
- base-drift/guard settlement
- ordinary merge cleanup/deploy order와 external merged [정리]
- `pr_wait_holds_slot`, merge queue, auto-merge의 기존 동작
- historical `stopped`/legacy attempt normalize

## 13. 구현 후 배포

frontend source 변경 뒤 `npm run build`로 `app/main.bundle.js`와 map을 포함한다.
PR merge 뒤 `docs/agents/repo-ops.toml`의 detached deploy 선언을 따라
`bdui-shared restart`를 실행하고, merged checkout의 process path·listening port·HTTP
응답과 recovered operation startup을 확인한 뒤에만 완료로 선언한다.
