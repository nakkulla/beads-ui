# Worker stale worktree 자동 회수와 선택 복구 구현 계획 (UI-8vn1)

## Context

- 승인 스펙:
  `docs/superpowers/specs/2026-08-18-worker-stale-worktree-recovery-design.md`
  @ `368932e0c38c218d2d8f7f0b191bb74a29235cd2`
  (`spec_review=self@368932e0c38c218d2d8f7f0b191bb74a29235cd2`).
- 실측 결함: `dotfiles-4viq`의 오래된 worktree에는 최신 pinned base와 exact
  path-state가 같은 tracked 잔재만 있고 고유 commit도 없었지만,
  `removeIfDiscardable()`가 모든 dirty 상태를 보존해 scheduler가
  `worktree_stale_work`로 반복 거절했다.
- 목표: base-contained tracked 잔재는 topology lock 안에서 보수적으로 증명해
  자동 회수하고 같은 dispatch tick을 계속한다. base에 없는 파일 상태나 commit은
  자동으로 삭제하지 않고, 기존 작업 이어가기 또는 verified archive 후 최신
  base에서 새로 시작하는 선택을 제공한다. 백업 없는 삭제는 만들지 않는다.
- canonical owner는 beads-ui 내부 Worker state와 recovery archive다.
  dotfiles 소유 workflow metadata·label·status 계약은 변경하지 않으며,
  `queue.json`의 optional admission/recovery state만 확장한다.
- 구현은 승인 스펙의 두 sealable unit을 순차적으로 누적한다. Phase 2는 Phase 1이
  봉인한 identity/observation/admission 계약만 소비한다. 각 Phase 완료 시 parent
  브랜치에 focused verification과 review 가능한 커밋을 남기고, 최종 산출은
  source·tests·`app/main.bundle.js`·`app/main.bundle.js.map`을 포함한 하나의
  non-empty PR이다.
- 새로 선택하거나 만든 worktree에서 첫 검증을 실행하기 전에
  `node --version`이 `package.json#engines`(`>=22`)를 만족하는지와
  `npm ls --depth=0` 성공을 확인한다. 의존성이 없으면 그 worktree 안에서
  lockfile 기반으로 설치하며 다른 checkout의 `node_modules`를 빌리거나
  symlink하지 않는다. Phase 2가 Phase 1의 같은 worktree를 이어받지 않으면 이
  사전 확인을 반복한다.

## Phase 1: 잔재 관측·base-contained 자동 회수·structured admission

작업 내용:

- `server/worker/worktree.js`의 `removeIfDiscardable()` 결과를 승인 스펙의
  `absent | discardable | base_contained | unique | unknown` observation으로
  확장한다. worktree realpath, branch, HEAD, pinned base, status path state를
  server-only identity snapshot과 digest로 묶고, public surface에는 경로·raw Git
  stderr·파일 내용을 내보내지 않는다.
- staged 상태는 base의 mode/object/absence, unstaged 상태는 Git filter가 반영된
  blob·mode·type/absence와 exact equality로 증명한다. staged+unstaged가 겹친
  경로는 두 상태를 각각 검증한다. untracked, rename/typechange, dirty submodule,
  unsupported special file, 관측 실패는 자동 포함으로 추론하지 않는다.
- 같은 topology lock 안에서 active/recovery owner 부재를 확인하고
  `base_contained`를 판정한 뒤, destructive step 직전에 identity와
  `status_digest`를 재관측한다. 증명된 tracked 경로만 exact-path restore하고
  clean/ahead=0을 다시 확인한 다음 `--force` 없이 worktree를 제거한다.
  broad reset, `git clean`, force removal은 사용하지 않는다.
- 기존 clean residue, branch-only residue, branch/HEAD ahead, detached HEAD,
  stop cleanup의 의미를 유지한다. identity drift, restore 실패, remove 실패는
  원본을 보존한 `unique` 또는 `unknown` 결과로 닫는다.
- `server/worker/queue-store.js`의 admission normalization/persistence를
  `stale_work` schema 1 optional payload까지 확장한다. 동일 identity·cause·
  capability snapshot의 반복 기록은 revision을 증가시키지 않고, 기존
  `reason/at/stale` 소비자는 그대로 동작하게 한다.
- `server/worker/scheduler.js` dispatch pre-flight가 structured observation을
  소비하게 한다. `absent/discardable/base_contained` 자동 회수 성공은 같은
  externally initiated tick의 정상 dispatch로 이어지고, `unique/unknown`은
  attempt를 만들지 않은 채 summary, opaque `action_id`, capability가 있는
  structured admission을 기록한다. 같은 identity를 소유한 resume 가능 leaf
  attempt는 자동 회수보다 우선해 Phase 2 action capability로 투영한다.
- capability를 계산하기 전에 worktree realpath와 branch가 Worker의 해당 Bead
  소유 규칙을 만족하는지 검사한다. 비소유 identity는 파일/ref를 건드리지 않은
  `unknown` 보존 admission으로 남기고
  `can_resume/can_continue/can_backup_fresh/can_recheck`를 모두 false로 닫는다.
- `server/ws/worker-handlers.js`의 queue snapshot projection을 optional
  `stale_work` 공개 필드로 확장하되 절대 경로, Git stderr, 파일 내용과 archive
  manifest는 제거한다. 이전 client/server 조합은 기존 admission reason으로
  fail-quiet한다.

검증: 이 worktree의 첫 검증이면 먼저 `node --version`과
`npm ls --depth=0`을 확인하고 필요 시 같은 worktree에 의존성을 설치한다.
그다음 RED→GREEN으로
`npm test -- server/worker/worktree.integration.test.js server/worker/queue-store.test.js server/worker/scheduler.test.js server/ws.worker-queue.test.js`를 통과시키고,
기존 clean residue·stop cleanup·`worktree_add_failed`·queue revision 회귀를
같은 focused suite에서 확인한다.

Phase 1 봉인 기준:

- `dotfiles-4viq` shape와 binary/symlink/deletion exact-state 사례가
  `base_contained`로 자동 회수되고 같은 tick에서 새 attempt가 시작된다.
- base와 다른 staged/unstaged 상태, 혼합 중간 상태, untracked/rename/typechange/
  submodule/special file, 고유 commit은 자동 cleanup되지 않는다.
- 판정과 restore 사이 identity drift 또는 Git 실패가 파일/ref를 바꾸지 않으며,
  동일 관측 tick은 queue revision·알림을 반복 증가시키지 않는다.
- Phase 1 diff와 focused test 영수증을 parent가 확인한 누적 커밋을 Phase 2 입력
  SHA로 고정한다.

## Phase 2: 이어가기·verified archive 후 새 시작·Worker UI·배포

작업 내용 (durable recovery와 scheduler):

- `server/worker/queue-store.js`와 `server/worker/discard-coordinator.js`의 기존
  restart-safe discard operation을 attempt-less stale-work mode로 확장한다.
  queue operation과 dispatch fence를 원자적으로 기록하고, persisted phase마다
  외부 상태를 authoritative readback한 뒤 재개한다. 별도 best-effort backup
  helper나 새 archive 포맷은 만들지 않는다.
- stale-work operation fence는 persisted 상태가 terminal이 될 때까지 scheduler
  tick, queue drag/reorder, 중복 action click, stop cleanup과 다른 discard/cleanup
  진입을 server-side에서 거절한다. 재시작 전후 모두 queue state readback으로
  같은 fence를 복원하며 UI 잠금만 안전 경계로 사용하지 않는다.
- `server/worker/recovery-archive.js`의 기존 binary-safe archive를 재사용해
  commit bundle, staged/unstaged patch, modified/untracked 파일, source snapshot과
  checksum manifest를 만든다. `COMPLETE`·checksum·bundle 검증 receipt가 durable
  state에 저장되기 전에는 cleanup을 한 번도 호출하지 않는다.
- verified archive 뒤에도 source identity가 같을 때만 worktree/local branch를
  정리한다. cleanup 실패는 원본과 receipt를 모두 보존한 재시도 가능 operation으로
  남기고, terminal success에서만 admission/fence를 한 번 지운 뒤 같은 lane
  위치의 fresh dispatch tick을 요청한다. remote branch/PR owner가 있으면 기존
  owner로 돌려보내며 새 원격 삭제·PR close를 수행하지 않는다.
- `server/worker/scheduler.js`에 stale-work action entry를 추가한다.
  `기존 작업 이어가기`는 같은 identity의 resume 가능한 최신 leaf attempt가
  있으면 기존 `resume()` 계약을 사용하고, 없으면 `stale_work_continue` launch로
  기존 worktree를 remove/add 없이 채택한다.
- orphan worktree 채택은 정상 dispatch의 guard hook, admission 재검사, exec 설정
  resolve, metadata restore snapshot, attempt prerecord, session monitor를
  재사용한다. attempt에는 pinned `base_oid`와 관측 `head_oid`를 구분해 기록하고,
  시작 prompt에 기존 worktree 보존·dirty/ahead 요약·최신 base·선검토 의무를
  명시한다. spawn 전 drift는 attempt 0건으로 거절하고, prerecord 후 spawn 실패는
  일반 failed-attempt 복구 표면을 사용하며 worktree를 보존한다.
- `상태 다시 확인`은 base/worktree를 재관측해 admission만 갱신한다.
  `base_contained`로 바뀌면 자동 회수와 dispatch를 계속하고, `unique`면 선택
  capability를 다시 노출하며, 계속 `unknown`이면 원본·attempt·archive를
  변경하지 않은 채 recheck capability만 갱신한다. backup-fresh action은 handler
  재검증을 통과한 경우에만 durable coordinator operation을 시작한다.

작업 내용 (WebSocket과 UI):

- `server/ws/worker-handlers.js`, `server/ws/connection.js`,
  `server/worker/attach.js`와 `app/protocol.js`에 stale-work
  continue/backup-fresh/recheck 메시지를 연결한다. 모든 action은
  `expected_revision`과 opaque `action_id`를 요구하고, mutation 직전에 waiting
  lane, active union, fetched/pinned base, worktree identity, PR/remote owner를
  다시 확인한다. mismatch는 무변경 conflict와 최신 snapshot으로 응답한다.
- `app/views/worker/index.js`와 `app/views/worker/lanes.js`에서 raw
  `⛔ worktree_stale_work` 대신 `이전 작업 보존됨` 또는
  `이전 작업 상태 확인 실패`, staged/unstaged/untracked·ahead 요약과 사람이
  읽을 수 있는 cause를 렌더한다.
- capability가 true인 동작만 `기존 작업 이어가기`,
  `백업 후 새로 시작`, `다시 확인`으로 표시한다. action/operation 중에는 카드
  drag와 중복 click을 잠그고 기존 discard progress를 재사용한다. verified
  archive 뒤 cleanup 실패일 때만 안전하게 투영된 archive 경로와 retry를
  보여 준다. 백업 없는 삭제 버튼은 추가하지 않는다.
- `백업 후 새로 시작` 설명에는 Git-ignored dependency/build output이 archive
  대상이 아니라는 정적 안내를 표시한다. archive의 기존
  `manifest.excluded` 의미는 보존하되 manifest 자체는 public projection이나
  UI로 내보내지 않는다.
- frontend source 수정 뒤 `npm run build`로 `app/main.bundle.js`와
  `app/main.bundle.js.map`을 재생성한다. dotfiles workflow 계약, archive
  location/format, remote branch/PR 정책은 바꾸지 않는다.

검증: Phase 1과 다른 worktree에서 시작한다면 focused test 전에
`node --version`과 `npm ls --depth=0`을 다시 확인하고 필요 시 그 worktree에
의존성을 설치한다. RED→GREEN으로
`npm test -- server/worker/scheduler.test.js server/worker/queue-store.test.js server/worker/discard-coordinator.test.js server/worker/recovery-archive.test.js server/ws.worker-queue.test.js app/views/worker/index.test.js app/views/worker/lanes.test.js`를 통과시키고,
`npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
`npm run build`를 실행한다. formatter/build 뒤 exact-path diff와 전체 검증을
다시 확인한다.

Phase 2 봉인 기준:

- resume 가능한 같은-identity attempt는 기존 resume 경로를 사용하고, 없을 때만
  기존 worktree를 채택한 `stale_work_continue` attempt가 생성된다.
- archive 검증 실패 전 cleanup 0회, verified archive 뒤 cleanup 실패 receipt
  보존, 재시작 adoption, 중복 click/tick 방지, terminal fresh dispatch가 모두
  focused test로 증명된다.
- WebSocket projection과 UI에 절대 경로, raw stderr, 파일 내용, manifest가
  노출되지 않고, `unknown`/`unique`별 허용 action과 CAS conflict가 정확하다.
- generated bundle을 포함한 parent 누적 diff와 full validation이 통과하며,
  현재 Bead에 별도 worker-ineligible residue가 없다.

## Test scope

모든 변경 seam은 해당 Phase에서 assertion을 먼저 실패시키고 구현으로
GREEN 전환한다.

Phase 1 RED→GREEN seams:

1. `server/worker/worktree.integration.test.js` — tracked
   binary/symlink/deletion, staged/unstaged/혼합 상태의 exact base containment,
   보존 대상(untracked·rename/typechange·submodule·special file·ahead), identity
   drift, restore/remove 실패.
2. `server/worker/scheduler.test.js` — base-contained residue의 same-tick
   dispatch, resume owner 우선, unique/unknown admission과 attempt 0건,
   비소유 realpath/branch의 무변경 보존과 네 action capability 모두 false.
3. `server/worker/queue-store.test.js` — optional stale-work schema의
   normalize/persist 및 동일 snapshot no-op revision.
4. `server/ws.worker-queue.test.js` — UI-safe projection과 legacy fail-quiet.

Phase 2 RED→GREEN seams:

1. `server/worker/discard-coordinator.test.js`·
   `server/worker/queue-store.test.js` — attempt-less operation phase/fence,
   restart adoption, archive-before-cleanup, verified receipt 보존, terminal
   admission clear/fresh tick 1회. persisted fence가 재시작 전후 scheduler tick,
   queue drag/reorder, 중복 action, stop cleanup과 다른 discard/cleanup 진입을
   모두 막는 assertion을 포함한다.
2. `server/worker/scheduler.test.js` — resume 우선, orphan adopt launch,
   remove/add 미호출, prerecord/monitor 재사용, drift와 spawn failure 보존.
   recheck가 `base_contained`이면 자동 회수·same-tick dispatch,
   `unique`이면 capability 재산출, 계속 `unknown`이면
   file/ref/attempt/archive mutation 0건인지 각각 검증한다. identity와
   capability도 같으면 admission revision이 no-op인지 함께 확인한다.
3. `server/ws.worker-queue.test.js` — action CAS/identity mismatch, continue
   route 선택, backup-fresh의 coordinator 성공 route, recheck 세 결과 응답,
   remote PR/branch owner 거절, projection redaction. drag/reorder와 중복 click도
   active persisted fence에 의해 server-side conflict가 되는지 검증한다.
4. `app/views/worker/index.test.js`·`app/views/worker/lanes.test.js` — 한국어
   제목/요약, capability별 action, action 중 drag/click lock, optional projection
   부재 badge, operation progress/retry, ignored dependency/build output이
   archive에서 제외된다는 정적 안내.
5. `server/worker/recovery-archive.test.js` — 기존 archive format·binary safety·
   checksum 검증과 `manifest.excluded` 의미 회귀. 포맷 변경이 필요하지 않으면
   새 production format을 추가하지 않고 coordinator 소비 seam만 보강한다.

회귀 검증:

- 기존 pause/failed attempt resume와 unified discard archive.
- clean/branch-only residue, stop cleanup, lane scheduling, slot ownership,
  queue CAS/restart normalization, Worker/Monitor snapshot redaction.
- Pre-Handoff Validation 전체와 frontend generated artifact 재현성.

제외:

- semantic patch/patch-id containment, untracked/ignored/submodule 자동 중복 판정.
- archive 만료/삭제 UI, 원격 branch 삭제, PR close, Worker 밖 수동 worktree 정리.
- Bead status/metadata/label 계약 변경, 별도 backup/rollback state,
  백업 없는 destructive cleanup.

## Delivery

- Phase 2 봉인 뒤 구현 gate는 현재 parent head에 결속하고 하나의 non-empty PR로
  `origin`의 writable fork를 대상으로 전달한다. merge/close는 `pr-finish`
  authority에서만 수행한다.
- merge 뒤 fetched previous target base의 `repo-ops/config.toml` `[deploy]`와
  `repo-ops/script/deploy`가 소유하는 기존 repo operation으로 배포한다. 새
  deploy·rollback 경로를 추가하지 않는다.
- 완료 선언 전 해당 merge를 target 또는 descendant로 포함한 repo operation의
  terminal success, `.worktrees/.repo-ops-deploy`의 merge 포함 SHA와
  tracked-clean, 실제 server process의 deploy worktree 경로·canonical port·
  HTTP health 응답을 authoritative readback한다.
