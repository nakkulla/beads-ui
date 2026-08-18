# Worker stale worktree 자동 회수와 선택 복구 설계 (UI-8vn1)

- 작성일: 2026-08-18
- 상태: 사용자 설계 승인 완료, written spec 검토 대기
- Bead: `UI-8vn1`
- route: `full_plan`
- 실측 계기: `dotfiles-4viq` dispatch pre-flight

## 1. 문제와 실측

Worker는 새 attempt를 만들기 전에 최신 target base를 다시 해석하고 guard hook을
설치한 뒤 `worktree.removeIfDiscardable()`로 같은 Bead의 이전 worktree와 branch를
검사한다. 현재 판정은 다음 순서다.

1. worktree에 `git status --porcelain` 출력이 있으면 즉시 `dirty`로 보존한다.
2. branch 또는 worktree HEAD가 핀된 base보다 앞서면 보존한다.
3. 모두 아니면 비강제 `git worktree remove`로 자동 정리한다.
4. scheduler는 모든 보존 사유를 하나의 `worktree_stale_work` admission reason으로
   축약한다.

이 경계는 `git worktree add -B`가 고유 커밋을 강제로 잃게 만드는 사고를 막지만,
오래된 branch와 최신 base 사이에 이미 게시된 변경도 현재 branch 기준으로
`dirty`이면 구분하지 못한다.

2026-08-18 `dotfiles-4viq`에서 다음 상태가 실측됐다.

- worktree branch HEAD: `78e25331`
- 당시 `origin/main`: `5ac4e80d`
- branch ahead: 0, behind: 8
- 수정 파일:
  `docs/superpowers/specs/2026-08-13-advise-realign-design.md`
- worktree 파일 blob: `25baa9ce6719bb0c847beeb234edc8a50795d6dd`
- spec review commit `f83593c6` 및 `origin/main`의 같은 경로 blob:
  `25baa9ce6719bb0c847beeb234edc8a50795d6dd`

따라서 base에 없는 고유 작업은 없었지만 raw `dirty` 판정 때문에 dispatch가 계속
거절됐다. UI는 사용자가 판단할 근거와 복구 동작 없이 `⛔ worktree_stale_work`만
표시했다.

## 2. 목표와 불변식

1. 핀된 최신 base에 정확히 포함된 tracked 잔재는 사용자 개입 없이 회수하고 새
   worktree dispatch를 계속한다.
2. base에 없는 파일 상태나 고유 commit은 자동으로 삭제하지 않는다.
3. 고유 작업은 사용자가 기존 작업을 이어가거나, 검증된 recovery archive를 만든
   뒤 최신 base에서 새로 시작할 수 있다.
4. 재개 가능한 기존 leaf attempt가 있으면 새 세션을 만들기 전에 그 resume 경로를
   우선한다.
5. 백업 없는 삭제 동작은 제공하지 않는다.
6. 관측 실패, identity drift, archive 검증 실패는 모두 원본을 보존하고
   fail-closed한다.
7. 같은 admission과 복구 operation은 반복 tick·중복 click·서버 재시작에서도
   중복 side effect를 만들지 않는다.
8. dotfiles가 소유하는 workflow metadata·label·status 계약은 바꾸지 않는다.

## 3. 범위와 소유 표면

| 표면 | 책임 |
|---|---|
| `server/worker/worktree.js` | 잔재 identity·상태 관측, base 포함 여부 분류, 자동 회수 |
| `server/worker/scheduler.js` | dispatch pre-flight, 기존 attempt resume 우선, orphan worktree 채택 attempt |
| `server/worker/queue-store.js` | structured admission과 durable recovery operation, restart normalization |
| `server/worker/recovery-archive.js` | 기존 binary-safe archive 생성·checksum 검증 재사용 |
| `server/ws/worker-handlers.js` | 안전한 public projection, continue/backup/recheck action과 CAS |
| `app/views/worker/index.js` 및 관련 view | 사람에게 읽히는 사유·요약·진행 동작 |
| `server/worker/*.test.js`, `server/ws/*.test.js`, `app/views/worker/*.test.js` | 판정·전이·UI 계약 검증 |
| `app/main.bundle.js`, `app/main.bundle.js.map` | frontend source의 generated runtime copy |

`queue.json`의 admission/recovery state는 beads-ui 내부 durable state다. 새 Bead
metadata key나 label을 만들지 않는다. 기존 `recovery-archive.js`의 archive 형식과
`discard-backups` 위치를 재사용하고, 별도 백업 포맷을 만들지 않는다.

## 4. 잔재 관측과 분류

### 4.1 구조화된 결과

`removeIfDiscardable()`의 boolean 중심 결과를 다음 의미를 표현하는 구조화된
observation으로 확장한다. 실제 이름은 구현에서 주변 타입과 맞출 수 있지만 의미는
고정한다.

~~~js
{
  ok,
  state: 'absent' | 'discardable' | 'base_contained' | 'unique' | 'unknown',
  removed,
  cause,
  identity: {
    worktree_realpath,
    branch,
    head_sha,
    base_oid,
    status_digest
  },
  summary: {
    staged_count,
    unstaged_count,
    untracked_count,
    branch_ahead,
    head_ahead
  }
}
~~~

- `absent`: worktree와 branch 잔재가 없다.
- `discardable`: worktree가 clean이고 branch/HEAD가 base보다 앞서지 않는다.
- `base_contained`: tracked 로컬 delta가 있지만 모든 delta 상태가 핀된 base의
  동일 경로 상태와 정확히 일치하고 고유 commit이 없다.
- `unique`: base와 다른 staged/unstaged 상태, untracked 파일, type/rename/submodule
  상태, branch/HEAD 고유 commit 중 하나가 있다.
- `unknown`: Git 관측, identity, 상태 해석 또는 제거가 확정되지 않는다.

`cause`는 `dirty_unique`, `branch_ahead`, `head_ahead`,
`untracked_present`, `submodule_state`, `observe_failed`,
`identity_changed`, `remove_failed`처럼 사람이 이해할 요약을 만들 수 있는 안정된
내부 enum이다. UI가 raw enum만 그대로 표시하지는 않는다.

### 4.2 base-contained의 보수적 증명

자동 회수는 semantic patch 포함이나 patch-id 유사성을 추론하지 않고 exact
path-state equality만 인정한다.

1. `HEAD -> index`에 실제 staged delta가 있는 경로는 index의 mode, object
   identity 또는 absence가 base의 같은 경로와 정확히 같아야 한다.
2. `index -> worktree`에 실제 unstaged delta가 있는 경로는 worktree의 file
   type, mode, Git filter가 반영된 blob identity 또는 absence가 base와 정확히
   같아야 한다.
3. 한 경로에 staged와 unstaged 상태가 모두 있으면 두 사용자 보존 상태가 각각
   base-contained임을 증명해야 한다.
4. untracked 파일, rename/typechange, dirty submodule, unsupported special file은
   첫 버전에서 exact 포함을 추론하지 않고 `unique`로 보존한다.
5. branch와 worktree HEAD 모두 `base..ref` ahead count가 0이어야 한다.
6. 재개 가능한 leaf attempt가 같은 worktree identity를 소유하면 자동 회수하지
   않고 resume 선택을 노출한다.

이 경계는 이번 실측처럼 오래된 HEAD의 tracked 파일이 최신 base blob과 정확히
같은 경우를 자동 회수하지만, base에 더 많은 수정이 섞여 단순히 비슷한 patch는
보존한다.

### 4.3 자동 회수

자동 회수는 다음 순서를 하나의 repo topology lock 안에서 수행한다.

1. Worker 소유 경로·branch와 활성/복구 중 attempt 부재를 확인한다.
2. base OID, HEAD, status path set과 각 path state로 `status_digest`를 만든다.
3. `base_contained`를 증명한다.
4. destructive step 직전에 같은 identity와 digest를 다시 관측한다.
5. 증명된 tracked 경로만 exact-path restore로 기존 HEAD 상태로 돌린다.
6. worktree가 clean이고 branch/HEAD ahead가 여전히 0인지 다시 확인한다.
7. `--force` 없이 `git worktree remove`를 실행한다.

어느 단계든 달라지거나 실패하면 더 진행하지 않고 `unique` 또는 `unknown`으로
전환한다. broad reset, `git clean`, force removal은 사용하지 않는다. branch만
남고 ahead가 0인 기존 동작은 새 `git worktree add -B`가 안전하게 재결속하도록
유지할 수 있다.

## 5. Durable 진단과 action authority

### 5.1 admission projection

`queue.admission[bead_id]`는 기존 `reason/at/stale`과 호환되면서 선택 가능한
잔재에 다음 optional 구조를 보존한다.

~~~js
{
  reason: 'worktree_stale_work',
  at,
  stale_work: {
    schema: 1,
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
}
~~~

public WebSocket projection은 절대 worktree/repo 경로, raw Git stderr, 파일 내용,
archive 내부 manifest를 보내지 않는다. UI에는 count·commit ahead·사람용 cause와
opaque `action_id`만 보낸다. server 내부 state는 exact identity snapshot을
보존한다.

같은 identity와 cause를 다시 관측하면 queue revision을 반복 증가시키지 않는다.
identity 또는 action 가능성이 바뀐 경우에만 admission을 교체한다.

### 5.2 click-time authority

모든 action은 `expected_revision`과 `action_id`를 받는다. handler는 mutation 전에
다음을 다시 확인한다.

- queue에서 같은 Bead가 아직 waiting lane에 있음
- active attempt, cleanup, discard/recovery operation과 겹치지 않음
- fetched/pinned target base identity
- worktree realpath, branch, HEAD, status digest
- PR 또는 remote branch를 기존 owner가 처리 중이지 않음

불일치는 `identity_changed` 또는 기존 owner의 구체 reason으로 무변경 응답하고,
새 snapshot을 fanout한다.

## 6. 사용자 복구 흐름

### 6.1 기존 작업 이어가기

UI의 `기존 작업 이어가기`는 다음 우선순위를 갖는다.

1. 같은 worktree identity를 가진 재개 가능한 최신 leaf attempt와 resume handle이
   있으면 기존 `worker-attempt-resume` 계약을 사용한다.
2. 그런 attempt가 없으면 scheduler가 `stale_work_continue` launch를 수행한다.

orphan worktree 채택 launch는 remove/add를 건너뛰되 정상 dispatch의 guard hook,
admission recheck, exec 설정 resolve, metadata restore snapshot, attempt prerecord와
session monitor를 재사용한다. attempt에는 핀된 target `base_oid`와 관측한 worktree
`head_oid`를 구분해 기록한다. 시작 문맥은 다음 사실을 명시한다.

- 기존 worktree를 의도적으로 채택했으며 reset하거나 버리면 안 됨
- staged/unstaged/untracked와 고유 commit 요약
- 핀된 최신 base와 현재 HEAD
- 남은 변경을 먼저 검토하고 workflow authority에 맞춰 정합할 것

spawn 전에 identity가 달라지면 attempt를 만들지 않는다. prerecord 이후 spawn이
실패하면 일반 failed-attempt 복구 표면을 사용하고 worktree는 보존한다.

### 6.2 백업 후 새로 시작

`백업 후 새로 시작`은 기존 discard coordinator가 소유하는 durable operation을
attempt-less stale-work mode로 확장한다. 별도 best-effort helper를 만들지 않는다.

단계는 다음과 같다.

1. queue에 operation과 dispatch fence를 한 번에 기록한다.
2. source identity와 target base를 다시 관측한다.
3. `recovery-archive.js`로 commit bundle, staged/unstaged binary patch,
   modified/untracked 파일, source snapshot과 checksum manifest를 만든다.
4. `COMPLETE`와 모든 checksum, bundle을 다시 검증하고 receipt를 persist한다.
5. identity가 archive source와 여전히 같은지 확인한다.
6. 기존 worktree와 local branch를 정리한다.
7. admission과 fence를 지우고 같은 lane 위치에서 새 dispatch tick을 요청한다.
8. 최신 pinned base로 정상 새 worktree/attempt를 만든다.

archive 검증 전에는 cleanup을 실행하지 않는다. archive 이후 cleanup이 실패하면
원본과 verified archive를 모두 보존하고 operation phase·reason·archive receipt를
UI에 보여 준다. 서버 재시작은 persisted phase의 외부 상태를 authoritative
readback한 뒤 이어서 처리한다.

remote branch나 PR ownership이 발견되면 이 mode를 시작하지 않는다. 해당 상태는
기존 PR/통합 discard 흐름이 소유하며, 새 원격 삭제·close 정책은 이번 범위가
아니다.

백업 없는 `삭제 후 새로 시작`은 제공하지 않는다. existing archive contract처럼
Git-ignored dependency/build output은 archive 대상이 아니며 UI 설명과 manifest
`excluded`에 그대로 드러낸다.

### 6.3 상태 다시 확인

`unknown`은 `다시 확인`만 제공한다. 이 action은 target base와 worktree 상태를
재관측하고 admission을 갱신할 뿐 파일, ref, attempt, archive를 변경하지 않는다.
다시 판정된 상태가 `base_contained`이면 자동 회수와 dispatch를 이어가고,
`unique`이면 두 복구 선택을 노출한다.

## 7. Worker UI

대기 카드의 raw `⛔ worktree_stale_work`를 다음 정보로 교체한다.

- 제목: `이전 작업 보존됨` 또는 `이전 작업 상태 확인 실패`
- 요약: staged/unstaged/untracked 수, branch/HEAD 고유 commit 수
- 설명: 자동으로 지우지 않은 이유
- 동작:
  - `기존 작업 이어가기`
  - `백업 후 새로 시작`
  - `다시 확인`

서버가 보낸 capability가 false인 버튼은 disabled로 두지 않고 아예 표시하지
않는다. operation 중에는 기존 discard progress 표현을 재사용하고 카드 drag와
중복 action을 잠근다. archive 검증 뒤 cleanup 실패인 경우에만 검증된 archive
경로와 retry를 보여 준다.

이 optional projection을 모르는 이전 server/client 조합은 기존 admission badge로
fail-quiet한다. frontend source 변경 후 `app/main.bundle.js`와 source map을
재생성한다.

## 8. 오류·동시성 경계

1. topology lock은 Git worktree/ref 관측과 자동 회수를 직렬화한다.
2. queue revision, `action_id`와 `identity_digest`는 stale click을 거절한다.
3. scheduler active union은 attempt, cleanup, discard operation과 stale-work
   recovery를 모두 포함한다.
4. auto tick은 `unique` 상태에서 백업이나 continue를 선택하지 않는다.
5. archive 실패 전 cleanup은 금지하고, 실패 temp archive는 진단 경로만 남긴다.
6. verified archive 이후 operation은 restart-safe하고 같은 side effect를
   readback 없이 반복하지 않는다.
7. Git observation failure는 absence나 clean으로 해석하지 않는다.
8. 같은 실패가 바뀐 evidence 없이 반복돼 queue revision과 알림을 계속 늘리지
   않는다.
9. worktree identity가 Worker 소유 규칙을 만족하지 않으면 action capability를
   모두 닫는다.
10. raw Git stderr와 파일 내용은 UI snapshot이나 알림에 포함하지 않는다.

## 9. Test scope

### 9.1 RED→GREEN seams

1. `server/worker/worktree.integration.test.js`
   - stale branch의 tracked 수정 blob이 pinned base와 같으면
     `base_contained`로 판정하고 exact-path normalize 후 비강제 제거한다.
   - binary file, symlink와 deletion도 exact state일 때만 base-contained다.
   - base와 다른 staged/unstaged 상태는 `unique`로 보존한다.
   - staged와 unstaged가 동시에 있는 경로의 중간 상태 하나라도 다르면 보존한다.
   - untracked, rename/typechange, dirty submodule, special file은 자동 제거하지
     않는다.
   - branch ahead와 detached HEAD ahead를 계속 보존한다.
   - identity가 판정과 normalize 사이에 바뀌면 무변경 거절한다.
   - restore 또는 비강제 remove 실패는 residue를 보존한다.

2. `server/worker/scheduler.test.js`
   - 이번 `dotfiles-4viq` shape가 raw `worktree_stale_work` 없이 자동 정리되고 같은
     externally initiated tick에서 정상 dispatch된다.
   - 재개 가능한 leaf attempt가 있으면 auto reclaim보다 resume capability가
     우선한다.
   - unique/unknown observation을 structured admission으로 기록하고 attempt를
     만들지 않는다.
   - stale-work continue가 기존 worktree를 remove/add하지 않고 정상 prerecord와
     launch contract를 통과한다.
   - identity drift와 spawn failure가 worktree를 보존한다.

3. `server/worker/queue-store.test.js` 및 recovery coordinator 테스트
   - optional stale-work admission의 normalize/persist/no-op revision 의미.
   - action fence가 tick, drag, 중복 click과 다른 cleanup을 막는다.
   - attempt-less archive operation의 phase 전이와 restart adoption.
   - archive 실패 전 cleanup 0회.
   - verified archive 후 cleanup 실패와 retry가 receipt를 보존한다.
   - terminal success가 admission/fence를 한 번만 지우고 fresh tick을 요청한다.

4. `server/ws/*worker*.test.js`
   - public projection이 절대 경로, raw stderr, 파일 내용을 노출하지 않는다.
   - expected revision/action identity mismatch가 무변경 conflict를 반환한다.
   - continue는 resume 가능한 attempt를 우선하고 아니면 adopt launch를 호출한다.
   - remote PR/branch owner가 있으면 backup-new action을 거절한다.

5. `app/views/worker/index.test.js`
   - raw enum 대신 한국어 제목·요약과 허용된 버튼만 렌더한다.
   - action 중 drag/중복 click이 잠긴다.
   - unknown은 recheck만, unique는 continue/backup만 표시한다.
   - optional projection 부재에서 기존 badge가 계속 렌더된다.

### 9.2 회귀 검증

- 기존 clean residue 자동 제거, stop cleanup과 `worktree_add_failed` badge.
- 기존 pause/failed attempt resume와 unified discard archive.
- queue CAS, restart normalization, lane scheduling과 slot ownership.
- Worker/Monitor snapshot redaction.
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`

## 10. 수용 기준

1. `dotfiles-4viq`와 같은 base-contained tracked residue는 사용자의 선택 없이
   안전하게 회수되고 새 Worker attempt가 시작된다.
2. base에 없는 파일 상태나 commit은 자동 cleanup되지 않는다.
3. 고유 잔재 카드가 raw 코드 대신 원인과 작업량 요약을 보여 준다.
4. resume 가능한 과거 session은 기존 resume 경로를 사용한다.
5. resume 대상이 없으면 명시적 선택으로 기존 worktree를 채택한 새 Worker
   session이 시작된다.
6. 백업 후 새 시작은 verified recovery archive 없이는 어떤 destructive step도
   실행하지 않는다.
7. identity drift, observation failure, archive failure와 restart가 데이터 유실이나
   중복 dispatch로 이어지지 않는다.
8. 백업 없는 삭제 action이 없다.
9. dotfiles workflow metadata·label·status 어휘가 바뀌지 않는다.
10. focused tests와 전체 pre-handoff validation, frontend bundle 생성이 통과한다.

## 11. 제외 범위

- semantic patch containment나 patch-id 기반 자동 삭제
- untracked/ignored/submodule 상태의 자동 중복 판정
- backup archive 자동 만료·삭제 UI
- 원격 branch 삭제, PR close 또는 새 PR 복구 정책
- Bead status/metadata/label 계약 변경
- Worker 밖의 임의 수동 worktree 정리 도구
- 백업 없는 destructive cleanup

## 12. 실행 단위 근거

이 변경은 하나의 repository 안이지만 독립 검증 가능한 두 sealable unit을 가진다.

1. 잔재 관측·base-contained 판정·자동 회수와 structured admission.
2. resume/adopt, durable archive-new-start와 Worker UI.

두 번째 unit은 첫 번째의 identity와 admission contract를 소비하고 durable
operation·frontend bundle까지 포함한다. 따라서 route는 `full_plan`이며, written
spec 승인과 spec gate 뒤 plan이 Phase 경계를 고정한다.
