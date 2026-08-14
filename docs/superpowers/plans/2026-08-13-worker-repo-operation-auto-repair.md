# Worker 단일 RepoOperation 전환 실행 계획 (UI-vobi)

## Context

- Bead `UI-vobi` (route=full_plan), spec:
  `docs/superpowers/specs/2026-08-13-worker-repo-operation-auto-repair-design.md`
  @ `ee5905ff62fe91f1b8f134f9c020c999532aea81` (spec_review=self@ee5905ff…,
  impl_entry=user-approved). 이 계획은 scope split 이후 UI-vobi에 남은 master
  spec §15-4~11 몫을 실행한다.
- 선행 완료: `UI-1lmv`(§15-2 Phase A — resolver v2·operation store·영구 deploy
  worktree·one-shot runner·coordinator 최소 표면·bootstrap CLI·transition
  launcher, PR #133, main=b4d0213에 포함)와 `dotfiles-b2yx`(canonical contract,
  dotfiles `repo-ops/config.toml`+`repo-ops/script/deploy`,
  `generated/contracts/repo-operation-policy.json`, PR #394). 둘 다 closed.
- 폐기된 8-phase 초안의 blocking findings를 이 계획이 승계한다:
  (3) 외부 효과 단위(migration/cutover/train_bot/TRACE/legacy 제거/dotfiles
  retirement)를 개별 phase로 분리, (4) auto_repair 검증 4종(durable ON/OFF
  readback·OFF 중 running 보존·ON 전환 즉시 reconcile·fresh-facts continuation),
  (5) master §17.2 seam의 Phase 분리(deploy 몫은 UI-1lmv에서 완료, verify
  candidate 몫은 이 계획)와 §18.12 user-checkout pre/post snapshot 검증.

### 관측된 시작 상태 (2026-08-14, main=b4d0213)

- 새 core는 `server/worker/attach.js`에 부팅 `reconcile()`만 연결되어 있고
  `ensureDeploy()`의 프로덕션 호출처는 0곳이다. 배포는 여전히 legacy
  `pr-actions.js`(`CLEANUP_STEPS=[base_sync, post_merge_verify,
  deployment_request, child_sweep, branch_cleanup, parent_close]`) →
  `deployment-job.js`(repo-deployctl 클라이언트) 경로가 수행한다.
- merge 판정은 `merge-gate.js` 3-tier(CI/local verify/no-signal)이고
  `pr-poller.js`가 `gh.js prChecks/commitChecks`로 checks를 관측·캐시한다.
  frontend `app/views/worker/index.js`가 `GATE_BADGES`(CI ✓ 등)를 렌더한다.
- legacy 선언은 `docs/agents/repo-ops.toml`([verify] npm run all + [deploy]
  scripts/deploy-self.js)이고 reader는 `server/worker/repo-ops.js`
  (소비: attach.js, server/ws/worker-handlers.js)다.
- `scripts/deploy-self.js`는 `BDUI_DEPLOY_TARGET_SHA` 프로토콜 + runtime
  `current` symlink 발행을 쓴다 — 새 `REPO_OPS_*`/영구 worktree 계약과 다르다.
- beads-ui에 `repo-ops/` 없음, `.github/workflows/ci.yml` 잔존.
- dotfiles workspace queue: `auto_repair=true`, `repo_operations` 0건 — 새
  runner의 dotfiles deploy는 아직 한 번도 실행되지 않았다(b2yx는 사용자 승인
  수동 install.sh로 배포). `repo-deployctl`은 `~/.local/bin`에 잔존. 두 repo
  모두 `.worktrees/.repo-ops-deploy` 미생성. train_bot/TRACE-ICI에 repo-ops
  없음.

### 실행 규칙 (모든 phase 공통)

- **compat dual-lane**: Phase 4~10 구간에서 post-merge owner는 fetched
  `repo-ops/config.toml` 존재로 분기한다 — config 있는 repo는 새 RepoOperation
  lane, 없는 repo는 기존 legacy lane을 그대로 탄다. Phase 11 전까지 모든
  config-absent repo는 legacy lane을 유지하며, legacy lane 코드 제거는 Phase
  11에서만 한다. 실패 시 현재 phase에서 멈추고 이전 runtime path를 보존한다.
- **effective policy pinning**: 각 phase PR 자신의 배포는 previous target-base
  SHA에 pin된 정책으로 수행된다(PR이 자기 verify/deploy를 정의할 수 없음).
  이전 정책에 deploy가 없던 첫 실행은 approved bootstrap CLI만 입구다.
- **enclosed foreign 단위**(Phase 1·9·10·12): master spec §14과 승인된
  ledger(`enclosed:UI-vobi`)에 따라 새 Bead/PR 없이 resolved target base에
  direct landing한다. 각 landing 전에 target repo abspath·resolved base와
  근거·fetch된 tip SHA·owned paths·verification bundle을 선언하고, landing 후
  actual tip/landed tip/owned commit SHA를 UI-vobi notes에 기록한다. user
  checkout의 HEAD/index/tracked/untracked를 전후 snapshot으로 비교해 불변임을
  증명한다(§18.12).
- 각 phase 완료는 이전 phase의 exact commit·terminal exit/log·readback
  evidence를 다음 phase input으로 pin한다.

## Phase 1: dotfiles 첫 new-runner deploy 실증 (§15-3 잔여)

b2yx가 남긴 미완 단계. 코드 변경 없음, 외부 효과(dotfiles runtime 재배포).

1. `repo-ops-bootstrap` CLI로 dotfiles workspace에 approved bootstrap deploy를
   요청한다. approved source는 **dotfiles-local** 승인 artifact인
   `docs/superpowers/specs/2026-08-13-opt-in-repo-operations-contract-design.md`
   + 그 최종 approved commit 40-hex SHA(실행 시 dotfiles main에서 확정 —
   provenance 검증은 대상 repo에서의 commit/tree 존재를 요구하므로 beads-ui
   쪽 plan SHA를 쓰지 않는다).
2. spool 소비 → 검증된 provenance prerecord → `.worktrees/.repo-ops-deploy`
   생성/정렬 → one-shot runner 실행 → terminal exit/log marker까지 관측한다.
3. dotfiles 설치 runtime readback(installed copy/service verifier가 script 안에서
   수행)과 queue `repo_operations` record의 `succeeded`/exit 0을 확인한다.
4. 같은 exact target의 승인 재요청 1회로 새 record 없이 기존 succeeded
   record가 adoption됨(`exact_input_exit_zero_evidence_adoption`)을 실증한다.
   script 자체의 idempotent same-SHA replay와 secret-free failure는 b2yx가
   land한 script 검증 evidence를 pin해 인용한다(실제 실패 유발은 하지 않음).

검증: dotfiles queue에 `state=succeeded, exit_code=0` record(최초)와 재요청
adoption receipt, deploy worktree `HEAD == pinned origin/main tip`, CLI
receipt, user checkout snapshot 전후 불변.

## Phase 2: no-CI merge eligibility (§15-4, §12)

beads-ui PR. merge 판정에서 GitHub checks를 제거한다.

1. `merge-gate.js`를 재작성한다: CI tier·local fallback tier·no-signal tier와
   `GATE_BADGES`의 CI 문구를 제거하고, eligibility를 fresh PR/base/head
   identity·clean mergeability·current review receipts·(선언 시) verify
   receipt만으로 판정한다.
2. `pr-poller.js`의 checks 관측·empty/pending/error cache·checks 수요 poll과
   `gh.js`의 `prChecks`/`commitChecks`, auto-merge/completion-repair의 CI
   ownership probe를 제거한다. GitHub API 사용은 PR identity·base/head·
   mergeability·merge/containment 관측으로 좁힌다.
3. frontend `app/views/worker/index.js`(+lanes)의 CI badge 렌더와 관련 fixture를
   새 판정 표시로 갱신한다.

검증: `npm run all` green + frontend 변경이므로 `npm run build` 실행 후
`app/main.bundle.js`/`.map`을 같은 PR에 포함 + `rg`로 active tree에서 checks
consumer(prChecks·commitChecks·ci badge) 0건(§17.9의 checks 몫 RED→GREEN).

## Phase 3: verify flow — ensureVerify와 candidate-tree receipt (§7, §15-4)

beads-ui PR. 네 repo 모두 현재 verify 미선언이므로 dormant지만 계약상 필수 경로.

1. coordinator에 `ensureVerify(candidate)`를 추가한다: 실제 merge 방식의
   synthetic candidate tree를 temporary clean checkout에 materialize하고
   effective base script를 한 번 실행, receipt key =
   `(effective_base_sha, candidate_tree_sha, verify_script_identity)`.
2. merge flow 연결: verify absent → 즉시 eligibility(§7.2 포함: post-merge
   stage/failure 미생성); present → pre-merge 1회 실행, merge 후 remote merged
   tree 동일 시 receipt 승계, 다르면 final tree에서 1회 재실행.
3. pre-merge failure는 merge를 중지하고 원래 merge intent를 durable
   continuation으로 보존, post-merge failure는 rollback 없이 Bead를
   `resolved/pr_wait`에 유지한다(§7.3).

검증: 신규 focused suite green — absent no-op·receipt 승계·base/head/tree/script
변경 시 stale·different-final-tree 1회 실행·verify candidate와 repo/origin/base/
SHA/script mismatch 거부(master §17.2 verify 몫+§17.3).

## Phase 4: post-merge coordinator 연결과 cleanup cursor 재작성 (§8, §15-4)

beads-ui PR. post-merge owner를 config-present repo에 대해 새 lane으로 바꾼다.

1. `pr-actions.js` cleanup cursor를 `base_containment → repo_operations →
   child_sweep → branch_cleanup → parent_close`로 재작성한다. config-present
   repo는 `ensureDeploy` coalescing(+미커버 subject 승계, lock 후 fetch-bind)을
   호출하고 terminal evidence로 진행하며, config-absent repo는 기존
   `post_merge_verify/deployment_request` legacy lane을 유지한다(Phase 11까지).
2. external merged observation([정리] 클릭 경로)과 startup reconciliation이 같은
   coordinator Interface를 쓰도록 연결한다. deploy absent → 가짜 record 없이
   skip.
3. 성공 판정은 script exit 0 + 영구 worktree `HEAD==target_sha`·tracked-clean
   readback으로만 하고, success 전 Bead close를 금지한다. descendant coverage
   (뒤 operation 성공이 앞 subject를 커버)와 실패 격리(앞 failure가 뒤
   descendant를 막지 않음)를 store 규칙대로 연결한다.

검증: focused suite green — 새 cursor 전이·dual-lane 분기·coalesce/coverage·
close 전 success 요구(§17.4의 coordinator 연결 몫); 기존 legacy suite 무수정
green.

## Phase 5: legacy state migration `repo_operation_migration_v1` (§11, §15-4)

beads-ui PR. 새 runtime 첫 부팅 1회 실행, dual-read 종료 준비.

1. canonical subject SHA를 `merge_sha` 우선/`head_sha` 보조로 계산하고 remote
   containment를 확인한다. legacy `base_sync` failure는 새 bounded remote
   materialization으로 재분류한다.
2. legacy `post_merge_verify`/`deployment_request`/`deploy` failure를 §11 표대로
   변환한다: 새 config에 verify 있으면 verify operation으로, 없으면 retire;
   old provider status는 migration 중 1회만 읽어 exact terminal success만
   adoption, 아니면 새 deploy operation 생성. ambiguity는 `legacy_manual`
   evidence로 보존(fake success 금지).
3. migration result와 schema version을 atomic 저장하고 재시작 시 같은 input을
   adoption한다. legacy failure에 auto repair budget을 소급 소비하지 않는다.

검증: §17.8 seam green — q1hs/oj2f/qero 대표 record의 1회 수렴·exact old
success만 adoption·budget 미소급.

## Phase 6: auto repair 엔진 — RepairSessionAdapter (§4.4, §9.3, §15-4)

beads-ui PR. dispatch는 backend까지, UI는 Phase 7.

1. `RepairSessionAdapter`를 기존 scheduler `launchSession`/resume/log/monitor
   Interface 위에 구현한다: failure exact input·sanitized log·Test scope·현재
   review/PR facts를 packet으로 owner Bead repair attempt를 dispatch하고, 결과
   판정은 session 자기보고가 아니라 fresh Git/operation readback으로 한다.
2. `startRepair(operation_id, mode)`를 coordinator에 추가하고 eligible failure
   (`verify_script_failure`/`deploy_script_failure`/`interrupted_without_
   terminal_exit`)에 chain당 1회 자동 dispatch를 연결한다. `chain_id`/
   `owner_bead`/`auto_used` 계승(store의 `inheritRepoOperationChain`)과
   multi-subject 결정적 owner(최신 merged_sha, 동률 시 bead_id 사전순), same
   fingerprint 무증거 재현 시 manual 유지 규칙을 강제한다.
3. `auto_repair` OFF는 신규 dispatch만 차단(running 보존), ON 전환은 eligible
   failed operation 즉시 reconcile, continuation은 repair 산출물이 아닌 fresh
   facts로만 연다. repair session 금지 목록(§9.3 session이 할 수 없는 일)을
   packet과 게이트에 반영한다.

검증: §17.6 seam green — advisory 4종(durable ON/OFF readback·OFF running
보존·ON 즉시 reconcile·fresh-facts continuation) + chain 1회 budget·fingerprint
loop 차단·successor 계승이 추가 dispatch를 막음·config-disable 우회 거부.

## Phase 7: auto_repair 설정·policy projection UI/protocol (§4.5, §10, §15-4)

beads-ui PR.

1. dotfiles `generated/contracts/repo-operation-policy.json`의 exact copy를
   source commit과 함께 beads-ui generated runtime copy로 pin하고, digest/source
   commit이 approved artifact와 다르면 실패하는 contract test를 추가한다.
   backend는 그 copy와 operation state를 protocol로 전달한다(정책 문장
   hard-code 금지).
2. Worker/Monitor workspace 설정에 독립 `자동 해결` toggle(기본 ON, 남은
   budget·active repair session 표시)과 §10의 세 목록(자동 처리/자동 session/
   자동 금지)을 추가한다. 기존 자동화 toggle과 상호 불간섭을 유지한다.
3. operation card(kind·target SHA/tree·script path/blob·elapsed·state·sanitized
   output tail·log link·exit code·repair session link)와 실패 kind별 해결
   버튼(수동 버튼도 coordinator 새 attempt 경유)을 붙인다. generic `재시도`
   버튼은 만들지 않는다. `app/protocol.js`/`app/protocol.md`에 `auto_repair`
   mutation·policy projection·operation states를 기록한다.

검증: §17.7 seam green — toggle·세 목록·card/log/exit/session link·absent
stage `안 함` 표시·kind별 해결 버튼; `npm run build` 후 bundle/map 포함.

## Phase 8: beads-ui cutover — repo-ops 선언과 self-deploy (§14.1, §15-5)

beads-ui PR + 외부 효과(자기 배포 경로 전환).

1. `repo-ops/config.toml`(base=main, [deploy] script/timeout)과
   `repo-ops/script/deploy`를 추가한다: `scripts/deploy-self.js`의 install/
   build/restart/readback 책임을 `REPO_OPS_*` 계약으로 이전 — local HEAD 확인,
   `npm ci`, `npm run build`, `bdui-shared restart`, bounded `/healthz`에서
   source SHA==target·realpath==`REPO_OPS_REPO_ROOT` 확인 후 exit 0.
   `.worktrees/.repo-ops-deploy`가 stable runtime source가 되도록 runtime
   pointer/config를 정합하고 candidate release·`current` symlink 발행을 만들지
   않는다.
2. `.github/workflows/ci.yml`을 제거하고 branch protection required check 0개를
   API readback으로 확인한다. AGENTS의 “빈 checks는 vacuous pass” 특례와
   Post-Merge Runtime Validation 절을 새 operation/auto repair 경로로 갱신한다.
3. merge 후 첫 self-deploy는 previous base에 deploy 선언이 없으므로 approved
   bootstrap CLI로 실행한다. self-restart E2E: 실행 중 서버를 script가
   재시작해도 one-shot executor가 살아 exit code/log marker를 남기고 재시작된
   Worker가 같은 operation을 adoption함을 실측한다.

검증: §17.5 self-restart 실측 + §17.10 beads-ui script(same-SHA replay
idempotent, secret-free failure) + live `/healthz` source SHA/realpath exact
readback + user checkout snapshot 불변(§18.12).

## Phase 9: train_bot enclosed direct landing + deploy/readback (§14.3, §15-6)

외부 효과. `enclosed:UI-vobi`, target `train_bot/main`.

1. train_bot에 `repo-ops/config.toml`(base=main)과 기존 `scripts/deploy.sh`를
   표준 entrypoint `repo-ops/script/deploy`로 이전해 direct landing한다:
   시작 시 local `.worktrees/.repo-ops-deploy` HEAD==fetched target 확인,
   `REPO_OPS_TARGET_SHA`를 remote host에 전달해 fetch 후 exact commit ff-only
   sync(단순 `git pull` 금지), dependency install, `projectmgr restart
   trainbot`, remote HEAD exact SHA·`projectmgr status trainbot` 확인 후 exit 0.
   기존 full unittest 선언은 제거한다.
2. 새 Worker operation으로 train_bot deploy를 실행하고 terminal exit/log·remote
   readback을 확인한다. 첫 실행은 bootstrap CLI이며 approved source는
   **target-local**로 검증 가능한 이 enclosed landing commit(40-hex) +
   `repo-ops/config.toml` 경로를 쓰고, 그 landing이 user-approved plan의
   산출임을 UI-vobi notes의 landing evidence로 결속한다.
3. SSH/remote/projectmgr/credential failure가 secret-free log와 repair session
   경로로 넘어가는지 확인한다.

검증: enclosed landing guards(공통 규칙) + queue record `succeeded` + remote
HEAD==target SHA + user checkout snapshot 불변.

## Phase 10: TRACE-ICI enclosed direct landing + deploy/readback (§14.4, §15-7)

외부 효과. `enclosed:UI-vobi`, target `TRACE-ICI/ilsun/dev`.

1. `repo-ops/config.toml`(base="ilsun/dev")과 `scripts/deploy_fisher.sh`의
   expected SHA·SLURM running-job fail-closed·remote fetch/ff-only exact sync·
   `uv sync`·final SHA readback을 표준 entrypoint로 이전해 direct landing한다.
   `[verify]`는 추가하지 않는다.
2. 시작과 끝에 local `.worktrees/.repo-ops-deploy` HEAD==fetched
   `origin/ilsun/dev` target SHA를 확인하고, success exit 전 Fisher remote HEAD
   exact SHA를 확인한다.
3. 새 Worker operation으로 deploy를 실행해 terminal exit/log·readback을 얻는다.
   첫 실행은 bootstrap CLI이며 approved source는 Phase 9와 같은 방식의
   target-local enclosed landing commit + `repo-ops/config.toml` 경로다.
   active SLURM job·unavailable SSH/uv/index는 명확한 failure code로 남긴다.

검증: enclosed landing guards + queue record `succeeded` + Fisher remote
HEAD==target + user checkout snapshot 불변.

## Phase 11: legacy reader/provider consumer 제거 (§13, §15-8)

beads-ui PR. 네 repo가 모두 새 lane으로 옮겨진 뒤 실행.

1. `server/worker/repo-ops.js`(v1 reader)와 attach.js/worker-handlers.js의
   소비처, `deployment-job.js`, `deployment-recovery.js`, queue-store의
   provider generation/binding/retry/recovery journal 필드, pr-actions의
   `post_merge_verify`/`deployment_request` legacy 분기와 provider observer,
   repo-deployctl invocation/config path, `docs/agents/repo-ops.toml`,
   `scripts/deploy-self.js`(+test)를 제거한다.
2. provider 전용 tests와 active instruction prose를 제거하고, historical
   docs/fixture allowlist 기반 retirement checker를 추가한다
   (`scripts/check-managed-deploy-retired.js` 선례 패턴 — active provider
   vocabulary reader/writer 0개 요구).
3. 공통 scheduler launcher·session monitor·queue CAS·cleanup coordinator는
   삭제하지 않음을 테스트로 고정한다.

검증: §17.9 seam green — deployment-job/recovery/repo-deployctl reader/writer
0건, shared owners 보존; `npm run all` green.

## Phase 12: dotfiles enclosed provider retirement + absence readback (§14.2, §15-9)

외부 효과. `enclosed:UI-vobi`, target `dotfiles/main`. Phase 1의 새 runner
dotfiles deploy 성공 evidence가 전제.

1. dotfiles에서 `repo-deployctl` CLI/serve daemon, repo-deployer
   launchd/projectmgr service, installer/runtime verifier,
   desired/status/state/execution lock file의 active writer/reader를 direct
   landing으로 제거한다.
2. 설치 표면 absence readback: `~/.local/bin/repo-deployctl` 제거, launchd/
   projectmgr 서비스 목록에서 부재, state 디렉터리 active writer 0개를
   확인한다(파일 삭제 등 비가역 동작은 landing commit이 소유한 범위만).
3. 제거 후 dotfiles의 새 lane deploy가 여전히 성공하는지 1회 readback으로
   확인한다(landing 자체의 배포가 그 증거).

검증: enclosed landing guards + provider absence readback — active
reader/writer 0, binary/service/install/runtime reference 부재(§17.9의
dotfiles provider 몫) + retirement 후 deploy operation `succeeded` + user
checkout snapshot 불변.

## Phase 13: 최종 검증·disposition·close 준비 (§15-10~11, §19)

1. 두 repo full verification(beads-ui `npm run all`+build, dotfiles 자체
   checker), generated artifacts digest(policy JSON copy vs dotfiles source
   commit), shared runtime health, 네 repo exact remote tips/deploy evidence를
   최종 확인한다.
2. `dotfiles-ji9f`를 superseded close하고 union follow-up inventory와
   superseded Bead disposition을 readback한다.
3. §19 증거 5종이 모두 모였는지 확인한 뒤 spec follow-up self-review와 같은
   logical write에서 `worker-ineligible` label을 제거하고, completion report
   작성 후 parent close 순서(remote containment → operation terminal evidence →
   enclosed tips/readbacks → report → close)를 밟는다.

검증: §17.11 seam(instructions/generated/runtime checks) green + §19 증거 목록
전부 notes에 기록 + label 제거·close readback.

## Test scope

RED→GREEN 실행 권한은 master spec §17에서 UI-vobi에 남은 다음 seam에 있다.
UI-1lmv가 이미 green으로 만든 seam(§17.1 resolver, §17.2 deploy checkout 몫,
§17.4 store CAS/chain 계승, §17.5 runner atomicity/restart 생존, bootstrap
게이트, transition launcher)은 재실행 대상이 아니며 기존 suite는 수정하지
않는다.

- Phase 1: §17.10 dotfiles 몫 — worker adoption 실증(같은 exact target 재요청)
  + b2yx script 검증 evidence pin(same-SHA replay idempotency·secret-free
  failure).
- Phase 2: §17.9의 checks consumer 제거 몫(negative: active tree 0건).
- Phase 3: §17.2의 verify candidate mismatch 몫 + §17.3 전체.
- Phase 4: §17.4의 coordinator 연결 몫(cursor 전이·dual-lane·coalesce/coverage).
- Phase 5: §17.8 전체.
- Phase 6: §17.6 전체(advisory 4종 + chain budget/owner/fingerprint).
- Phase 7: §17.7 전체.
- Phase 8: §17.5의 self-deploy 실측 E2E + §17.10 beads-ui 몫 + §17.11 AGENTS/
  bundle/source map 몫.
- Phase 9/10: §17.10 train_bot/TRACE 몫(각 enclosed repo의 script 검증은 해당
  repo 테스트 관례를 따르고 beads-ui suite에 이식하지 않는다).
- Phase 11: §17.9의 provider deletion 몫(beads-ui) + shared owner 보존 고정.
- Phase 12: §17.9의 dotfiles provider 몫 — active reader/writer·service/
  install/runtime reference 부재 readback.
- Phase 13: §17.11 나머지.
- §18.12 user-checkout snapshot 검증은 Phase 1·8·9·10·12의 검증 라인에
  포함된다.

제외: verify를 어느 repo에 실제 선언하는 작업(향후 opt-in), 새 provider/daemon
작성, GitHub Actions 재도입, closed historical specs/plans/receipts 삭제.

## 비범위·후속

- workspace UI의 기타 개선(worker lane 재설계 등 다른 Bead 소유)은 손대지
  않는다.
- `~/.config/bdui/config.toml`의 runtime pointer 정합은 Phase 8 cutover에서
  필요한 최소 변경만 수행하고 전후 값을 notes에 기록한다.
