# 폐기 시 phase child 삭제와 승인 artifact 보존 설계 (UI-cfzq)

- 날짜: 2026-08-12
- Bead: `UI-cfzq`
- Route: `spec_backed`
- 선행 설계: `docs/superpowers/specs/2026-08-10-worker-recovered-control-discard-rollback-design.md`
- Unit ledger: beads-ui 구현 `bead:UI-cfzq`; dotfiles 잔여 정리 `enclosed:UI-cfzq`

## 배경

Worker의 `[폐기]`는 recovery archive, runner/PR/git 정리, parent Bead `open`,
`pr_url` 제거까지 수행한다. 그러나 `full_plan` 실행 진입에서 생성된 direct phase
child는 남긴다. 그 결과 폐기된 구현의 child가 UI에 계속 보이고, 이후 수정된
plan으로 재개하면 과거 `plan_task_digest`와 현재 phase digest가 달라
`phase_children_mismatch`로 park될 수 있다.

폐기의 기준점은 과거 plan bytes가 아니다. 사용자는 구현 도중에도 spec/plan을
수정하고 다시 승인할 수 있다. 따라서 폐기는 **현재 승인된 spec/plan authority를
그대로 보존**하면서, 폐기 대상 implementation attempt가 만든 실행 상태만 제거해야
한다.

## 목표

1. 폐기 시작 시 parent의 direct phase child를 정확히 snapshot하고 recovery archive에
   원본 JSON을 보존한다.
2. archive 검증과 runner/PR/git 정리가 끝난 뒤 snapshot child를 영구 삭제하고,
   parent의 direct child 목록에서 모두 사라졌음을 readback한다.
3. 현재 승인된 spec/plan과 review authority는 변경하지 않는다.
4. 폐기된 implementation attempt의 parent metadata만 정리해 다음 실행이 새 attempt로
   시작되게 한다.
5. crash/restart와 부분 삭제에서도 같은 operation ID로 안전하게 이어 간다.

## 비목표

- spec/plan 파일을 폐기 전 commit으로 되돌리기
- `spec_id`, `plan_path`, `spec_review`, `plan_review`, `plan_approval` 삭제 또는 재작성
- parent notes나 과거 attempt/session evidence 삭제
- direct phase child 아래의 descendant를 cascade 삭제
- 예상하지 못한 새 child를 자동으로 삭제
- dotfiles workflow key/status/label 어휘 변경

## 삭제 및 보존 경계

### 보존

- parent native `spec_id`
- parent metadata `plan_path`, `spec_review`, `plan_review`, `plan_approval`
- 현재 checkout과 target base에 존재하는 수정된 spec/plan 파일 및 commit
- parent notes, attempt 기록, recovery archive

### 제거

- 폐기 시작 시 snapshot한 direct phase child 전체
- parent metadata `pr_url`
- parent metadata `impl_review`
- parent metadata `last_checked_sha`
- 기존 폐기 설계가 이미 소유하는 worktree/local branch/remote branch/queue lane residue

`impl_review`는 폐기된 구현 diff의 gate receipt이고 `last_checked_sha`는 그 attempt가
진행하며 이동한 freshness cursor이므로 새 실행의 authority가 될 수 없다. 반면 spec과
plan review/approval receipt는 현재 승인 artifact의 authority이므로 유지한다.

## Parent authority baseline

source observation은 child를 읽는 시점에 parent를 `bd show --json` 한 번으로 읽고
다음 baseline을 `source_snapshot.parent_authority`에 저장한다. 각 key는 값뿐 아니라
존재 여부도 보존해 absent와 empty/string 값을 구분한다.

- native `spec_id`
- metadata `plan_path`
- metadata `spec_review`
- metadata `plan_review`
- metadata `plan_approval`

parent implementation metadata transition 직전에 parent를 다시 한 번 읽어 다섯 필드의
존재 여부와 값이 baseline과 정확히 같은지 비교한다. 다르면 아무 parent field도 쓰지
않고 `bd_parent_authority_changed`로 멈춘다. `updateFields` 직후에는 parent status가
`open`이고 `pr_url`/`impl_review`/`last_checked_sha`가 absent이며, 보존할 다섯 필드가
baseline과 여전히 같은지를 하나의 readback 결과로 검증한다.

## Child snapshot 계약

`discard-coordinator`의 source observation 단계에서 parent의 direct child를 조회한다.
조회는 기존 `bd-metadata.listChildren()`과 동일하게 structural `--parent` 관계와
`metadata.parent=<parent-id>` 관계의 합집합을 사용한다. 각 ID는 `bd show --json`으로
원본 issue를 읽고 다음을 검증한다.

- child ID가 parent와 다르다.
- `metadata.parent`가 parent ID이다.
- `metadata.plan_task_anchor`가 존재한다.
- child 자신에게 direct child가 없다.

하나라도 맞지 않거나 child 조회/readback이 실패하면 operation 생성 전에
`phase_child_snapshot_failed`로 거부한다. descendant가 있으면
`phase_child_nested`로 fail-closed한다. `bd delete --cascade`는 사용하지 않는다.

검증된 child는 ID 오름차순으로 정렬해 `source_snapshot.phase_children`에 전체 issue
JSON과 함께 넣는다. recovery archive의 `manifest.json`은 이미 `source_snapshot`을
checksum 대상 bytes에 포함하므로 별도 비검증 sidecar를 만들지 않는다.

## Durable state machine

Unmerged와 merged-revert finalize 모두 parent를 다시 후보로 돌리기 전에 같은 child
정리 단계를 지난다.

1. 기존 순서대로 recovery archive를 생성하고 checksum을 검증한다.
2. runner 종료, PR close 또는 revert 완료, source worktree/local/remote ref 정리를
   authoritative readback으로 완료한다.
3. 현재 direct child ID 집합을 다시 읽는다.
   - snapshot ID의 일부가 이미 없으면 crash 후 재개로 간주한다.
   - snapshot에 없던 child가 추가됐으면 `phase_child_set_changed`로 멈춘다.
   - 현재 child에 descendant가 생겼으면 `phase_child_nested`로 멈춘다.
4. 남은 snapshot child ID를 한 번의 exact batch `bd delete <ids...> --force`로 삭제한다.
   `--cascade`는 금지한다.
5. 각 snapshot ID를 exact lookup해 전부 absent인지 확인하고, parent direct child 목록이
   empty인지 확인한다. 실패하면 operation을 `phase_children_delete_failed` 또는
   `phase_children_readback_failed`에 유지한다.
6. parent를 `open`으로 만들면서 `pr_url`, `impl_review`, `last_checked_sha`를 하나의
   logical metadata transition으로 제거한다. 이후 status와 세 metadata 부재를 다시
   읽고, `source_snapshot.parent_authority`의 다섯 필드가 존재 여부까지 동일한지 함께
   확인한다.
7. queue/pr_wait/admission/cleanup state와 discard operation을 기존 원자적 store
   mutation으로 완료하고 후보 snapshot을 refresh한다.

operation phase에는 child snapshot 완료와 child 삭제 완료 사이를 구분하는 durable
단계를 추가한다. 서버 재시작 후에는 phase 이름만 믿지 않고 exact child lookup과
parent child 목록을 다시 관측한다. 삭제가 일부만 성공한 경우 이미 absent인 ID는
성공으로 처리하고 나머지만 재시도한다.

## BD adapter

`server/worker/bd-metadata.js`의 기존 `listChildren`, `readIssue`, `findIssue`,
`updateFields`를 조합하고, exact ID batch delete (`--force`, cascade 없음) 표면만
추가한다. child 원본은 `listChildren`의 ID마다 `readIssue`로 읽고, 삭제 부재는
`findIssue`, parent status + implementation metadata 정리는 `updateFields`와 별도
readback을 재사용한다.

non-zero exit, malformed JSON, duplicate/ambiguous ID, child-set drift는 모두 absence나
성공으로 축약하지 않는다. deletion argv에는 snapshot에서 검증한 explicit ID만
들어가며 glob, prefix, parent ID를 넣지 않는다.

## 현재 잔여 상태 정리

기능 구현과 focused/full verification이 green인 뒤, implementation gate와 PR Delivery
전에 현재 `dotfiles-hdid`의 direct phase child
`dotfiles-hdid.1`, `.2`, `.3`, `.4`를 동일한 안전 경계로 정리한다.

1. 첫 mutation 전에 고정 operation ID
   `manual-dotfiles-hdid-child-cleanup-v1`을 사용한다. archive 경로는
   `$XDG_STATE_HOME/bdui/<workspace-slug>/discard-backups/manual-dotfiles-hdid-child-cleanup-v1/`
   이며, 환경 변수가 없으면 기존 state-path resolver의 기본 root를 사용한다.
2. 네 child, 각 descendant 부재, parent authority baseline을 read-only로 확인한다.
   `manifest.json`에는 operation ID, exact expected child IDs, 전체 child JSON, parent
   authority baseline을 넣고 `COMPLETE` checksum을 생성·검증한다. 같은 경로가 이미
   있으면 새 snapshot을 만들지 않고 기존 manifest/checksum을 검증해 재사용한다.
3. 삭제 직전에 현재 direct child 집합과 descendant를 다시 읽는다. manifest 밖 child나
   descendant가 있으면 멈춘다. manifest child 일부가 absent면 partial-delete 재개로
   간주하고 remaining ID만 계산한다.
4. `bd delete` dry-run이 remaining exact IDs만 가리키는지 확인한 뒤, remaining IDs만
   exact batch delete한다.
5. 각 manifest child ID absent와 parent direct child empty를 readback한다.
6. parent authority가 manifest baseline과 동일한지 확인한 뒤 parent를 `open`으로
   만들고 `impl_review`, `pr_url`, `last_checked_sha`를 하나의 logical transition으로
   제거한다. 이후 authority 동일성과 제거 필드 부재를 함께 readback한다.
7. operation ID, archive checksum, child absence, parent readback을 `UI-cfzq` notes에
   기록한다. 이 evidence가 없으면 implementation gate와 PR Delivery로 진행하지 않는다.

이 운영 정리는 dotfiles의 spec/plan 파일이나 git history를 변경하지 않는다.

## Worker eligibility와 apply order

dotfiles 잔여 정리는 `docs/agents/repo-ops.toml`의 `[deploy]`가 운반하지 않는 required
no-PR residue다. 따라서 spec gate close에서 `spec_review` receipt와 같은 logical
write로 `worker-ineligible`을 추가하고 두 값을 readback한다.

고정 apply order는 다음과 같다.

1. `.worktrees/UI-cfzq`에서 코드와 테스트를 구현하고 focused/full verification을
   완료한다.
2. 위 고정 manual operation으로 `dotfiles-hdid` child와 implementation metadata를
   정리하고 archive·Beads readback을 `UI-cfzq` notes에 기록한다.
3. no-PR residue가 없어진 것을 확인한 뒤 `worker-ineligible`을 제거하고 readback한다.
4. integrated code diff와 manual cleanup evidence를 함께 implementation gate에서
   검토한다.
5. PR Delivery/merge 뒤 target base를 sync하고 `npm run build` 결과가 포함된 merged
   SHA에서 `docs/agents/repo-ops.toml` `[deploy]`의 `scripts/deploy-self.js`를 실행한다.
6. shared server의 process checkout, listening port, HTTP response가 merged SHA를
   제공하는지 확인한 뒤에만 완료한다.

각 단계는 직전 readback이 성공해야 다음 단계로 간다. 2단계 도중 중단되면 고정
operation archive에서 remaining IDs만 재개하고, 2단계 전 중단은 Beads를 변경하지
않는다. `worker-ineligible` 제거 전 중단은 Worker dispatch를 계속 막으며, 배포 전
중단은 merged code가 live라고 주장하지 않는다.

## 오류 처리

- archive 검증 전에는 child를 삭제하지 않는다.
- child snapshot 또는 재관측이 불확실하면 아무 child도 삭제하지 않는다.
- snapshot 밖 child가 나타나면 새 child의 소유권을 추정하지 않고 멈춘다.
- descendant가 있으면 recursive 삭제하지 않고 멈춘다.
- batch delete가 부분 성공하면 archive와 operation을 보존하고 exact absence readback으로
  재시도 대상을 계산한다.
- parent authority metadata가 예상치 않게 바뀌면 overwrite하지 않고
  `bd_parent_authority_changed`로 멈춘다.
- merged revert 경로도 child deletion과 parent implementation metadata 정리가 끝나기
  전에는 operation을 `done`으로 만들지 않는다.

## Test scope

### RED→GREEN seams

1. `bd-metadata`의 exact batch delete가 explicit ID와 `--force`만 사용하고,
   empty/duplicate ID, `--cascade`, delete non-zero를 거부한다.
2. discard source snapshot이 direct phase child 전체를 archive manifest에 포함하고,
   nested/invalid child를 mutation 전에 거부한다.
3. unmerged discard 성공 경로에서 archive 검증 receipt와 exact child batch delete가
   모두 발생하고, 검증 receipt가 delete보다 먼저 관측된다.
4. unmerged discard가 git residue 정리 뒤 exact child IDs만 batch delete하고,
   `--cascade`를 사용하지 않는다.
5. merged-revert finalize도 동일한 child 삭제/readback을 통과한다.
6. snapshot 이후 새 child가 나타나면 삭제 없이 `phase_child_set_changed`로 멈춘다.
7. partial delete 뒤 재시작하면 absent ID는 반복 삭제하지 않고 남은 ID만 삭제한다.
8. child 삭제 후 parent는 `open`이고 `pr_url`/`impl_review`/`last_checked_sha`가 없으며,
   spec/plan authority fields는 byte-for-byte 유지된다.
9. child delete/readback 실패는 operation과 archive를 보존하고 queue 재진입을 막는다.

### 회귀 검증

- 기존 unmerged/merged discard crash-recovery matrix
- recovery archive create/reuse/checksum 검증
- post-merge child close sweep — 정상 merge는 기존처럼 child를 close하며 삭제하지 않는다.
- Worker snapshot/WS discard 응답과 retry UI
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`

## 승인 기준

1. `[폐기]` 완료 뒤 폐기 대상 parent의 direct phase child가 하나도 남지 않는다.
2. 현재 승인된 spec/plan 파일과 parent authority receipts는 폐기 전후 동일하다.
3. 폐기된 구현의 `impl_review`, `pr_url`, `last_checked_sha`는 남지 않는다.
4. 삭제 child 원본 JSON은 checksum-verified recovery archive에서 복구 가능하다.
5. crash, partial delete, child-set drift, nested child에서 범위를 넓히지 않고
   fail-closed한다.
6. 정상 PR merge/finish 경로의 leaves-first child close 의미는 변하지 않는다.
7. `dotfiles-hdid.1`~`.4` 잔여 child가 삭제되고 parent의 수정된 spec/plan authority는
   그대로 유지된다.
8. spec gate close에는 `worker-ineligible`이 있고, current residue readback 완료 뒤
   implementation gate 전에는 label이 제거된다.
