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
  readback·OFF 중 running 보존·ON 전환 즉시 reconcile·fresh-facts
  continuation), (5) master §17.2 seam의 Phase 분리(deploy 몫은 UI-1lmv에서
  완료, verify candidate 몫은 이 계획)와 §18.12 user-checkout pre/post snapshot
  검증.

### 재분해 이력 (2026-08-14, 13 phase → 10 phase)

- 이 계획의 최초 게시본(`0343175c278c68308dedc9e0721f8fd460e7f3e9`)은 13개
  phase였다. 사용자 지시로 dotfiles 승인 스펙
  `docs/superpowers/specs/2026-08-12-execution-unit-promotion-contract-design.md`
  (Bead `dotfiles-5ivc`)의 §3.1 seal 4조건과 §3.3 최소-개수 선호를 기준으로
  재분해했다.
- 적용한 판정 규칙: 인접 작업이 ⓐ 같은 저장소 ⓑ 같은 검증 번들 ⓒ 순차
  dependency로 이어지면 한 phase가 기본이고, 분리는 **다른 repo / 독립
  외부효과 / 승인된 병렬성 / 실행 힌트 차이** 중 하나만 정당화한다. task 수는
  분할 사유가 아니다. 독립 외부효과와 독립 durable readback을 갖는 단위는 그대로
  개별 phase로 남는다.
- 매핑: 구1→Phase 1 · 구2+3+4→Phase 2 · 구5→Phase 3 · 구6+7→Phase 4 ·
  구8→Phase 5 · 구9→Phase 6 · 구10→Phase 7 · 구11→Phase 8 · 구12→Phase 9 ·
  구13→Phase 10(disposition·label·report의 durable write 몫) + `## 완료
  절차`(read-only integration 확인과 parent close 몫).
- 근거 스펙 `dotfiles-5ivc`는 `open`이고 그 계약은 아직 active surface
  (`docs/contracts/workflow.yaml`·`harness.yaml`)에 반영되지 않았다. 같은 스펙
  §10은 UI-vobi를 소급 재분해 비목표로 두므로, 이 재분해는 계약 강제가 아니라
  **사용자 지시**에 따른 것이다.
- 재분해 시점에 phase 진행은 0건이었다(children 13개 모두 `open`,
  implementation edit 없음).

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

### 완주 계약 (2026-08-14 사용자 지시로 채택, fast_track)

이 계획의 실행은 dotfiles 스펙
`docs/superpowers/specs/2026-08-14-fast-track-autonomous-finish-v3-design.md`
(Bead `dotfiles-5864`)의 이슈 생애주기를 따른다. 그 스펙 §10은 진행 중 이슈의
소급 재구성을 비목표로 두지만, **사용자가 2026-08-14 현재 발화로 UI-vobi에
적용을 지시**했으므로 그 지시가 우선한다.

- **부모 워크트리 단일화(§3.1)**: 이슈 전체를 `.worktrees/UI-vobi` 하나에서
  수행하고 branch는 `UI-vobi`로 고정한다(basename==branch 유지). **phase child는
  워크트리·브랜치를 갖지 않는다.** 예외는 둘뿐이다 — enclosed cross-repo landing의
  임시 detached 워크트리(Phase 1·6·7·9), Worker 소유 `.worktrees/.repo-ops-deploy`.
- **누적 기본(§3.2)**: seal된 phase의 커밋은 부모 브랜치에 남고 base 반영은
  미룬다. phase마다 PR을 만들지 않는다 — 아래 `landing:` 힌트가 있는 phase만
  중간 합류한다.
- **중간 landing은 선언된 phase만, 세션이 자체 수행(§3.3)**: `landing: direct`는
  PR 없이 clean integration 워크트리에서 squash·검증·push한다. landing 대상은
  부모 브랜치의 **현재 누적 전체**이며 부분 landing은 없다. landing 후 부모
  브랜치를 landed tip으로 재정렬하고 누적을 비운다. 안전 조건 6항(ancestry,
  content equality, focused verification green, seal receipt, fail-closed,
  repo-ops terminal evidence)과 재정렬 전건 확인은 스펙 §3.3 그대로다.
- **최종 PR 1개(§3.4)**: 마지막 phase seal 후 이슈 통합 diff에 대해
  implementation gate 1회를 돌리고, PR을 하나 만들어 완료 보고·`pr_url` 기록 후
  PR Delivery stop한다. 사람 접점은 이 PR 하나뿐이다.
- **위임 단위는 phase 하나(2026-08-14 사용자 지시)**: 그룹 A/B/C 같은 phase 내부
  경계는 *부분 완료 시 재개 지점*이지 dispatch 단위가 아니다.
- **모드는 `fast_track`**: 게이트 질문 없이 완주하며, 정지 지점은 hard stop 5종과
  최종 PR Delivery stop뿐이다.

#### phase별 landing 힌트

| phase | landing | 사유 |
| --- | --- | --- |
| 1 | — | enclosed foreign(dotfiles). 부모 브랜치 누적 대상이 아니다. |
| 2 | 없음(누적) | 구조적 필요 없음. |
| 3 | `direct` | 수용 증거가 **실제 workspace queue의 migration schema version·result record readback과 재시작 후 adoption 실측**이라 코드가 배포되어 돌아야 한다. 배포는 merged base 정책을 읽으므로 merged 상태가 전제다. |
| 4 | 없음(누적) | seam 테스트로 검증이 닫힌다. |
| 5 | `direct` | 자기 배포 경로 전환. 첫 self-deploy가 **previous base에 pin된 정책**을 읽고 `.worktrees/.repo-ops-deploy`에서 실행되므로 merged 상태 없이는 성립하지 않는다(계획 본문도 "merge 후 첫 self-deploy"로 전제한다). |
| 6·7·9 | — | enclosed foreign(train_bot·TRACE-ICI·dotfiles). 부모 브랜치 누적 대상이 아니다. |
| 8 | 없음(누적) | 제거와 checker로 검증이 닫힌다. |
| 10 | 금지 | 마지막 phase는 landing 힌트를 가질 수 없다(스펙 §4.1). 최종 PR이 비지 않도록 누적을 강제한다. |

Phase 3의 landing은 Phase 2+3 누적 전체를, Phase 5의 landing은 Phase 4+5 누적
전체를 대상으로 한다. 최종 PR에는 Phase 6~10의 누적분(코드 몫은 주로 Phase 8)이
담긴다.

### 실행 규칙 (모든 phase 공통)

- **compat dual-lane**: Phase 2~7 구간에서 post-merge owner는 fetched
  `repo-ops/config.toml` 존재로 분기한다 — config 있는 repo는 새 RepoOperation
  lane, 없는 repo는 기존 legacy lane을 그대로 탄다. Phase 8 전까지 모든
  config-absent repo는 legacy lane을 유지하며, legacy lane 코드 제거는 Phase
  8에서만 한다. 실패 시 현재 phase에서 멈추고 이전 runtime path를 보존한다.
- **effective policy pinning**: 각 landing 자신의 배포는 previous target-base
  SHA에 pin된 정책으로 수행된다(합류하는 변경이 자기 verify/deploy를 정의할 수
  없음). 이전 정책에 deploy가 없던 첫 실행은 approved bootstrap CLI만 입구다.
- **enclosed foreign 단위**(Phase 1·6·7·9): master spec §14과 승인된
  ledger(`enclosed:UI-vobi`)에 따라 새 Bead/PR 없이 resolved target base에
  direct landing한다. 각 landing 전에 target repo abspath·resolved base와
  근거·fetch된 tip SHA·owned paths·verification bundle을 선언하고, landing 후
  actual tip/landed tip/owned commit SHA를 UI-vobi notes에 기록한다. user
  checkout의 HEAD/index/tracked/untracked를 전후 snapshot으로 비교해 불변임을
  증명한다(§18.12).
- **beads-ui 코드 phase의 공통 검증**: Phase 2·3·4·5·8은 부모 워크트리에서 AGENTS
  Pre-Handoff Validation(`node --version` engines 정합·`npm ls --depth=0`·
  `npm run tsc`·`npm test`·`npm run lint`·`npm run prettier:write`)을 수행하고,
  frontend 변경이 있으면 `npm run build` 후 `app/main.bundle.js`/`.map`을 같은
  커밋에 포함한다. 마지막 phase의 전체 검증은 앞 phase의 seal 조건을 대신하지
  않는다.
- 각 phase 완료는 이전 phase의 exact commit·terminal exit/log·readback
  evidence를 다음 phase input으로 pin한다.
- **실행 힌트**: `실행: main(<사유>)`가 있는 phase만 controller main이 직접
  수행한다. 힌트가 없는 phase는 delegate 기본이며, 실행 시점 이탈은 phase
  child의 execution 영수증에 사유 1줄로 남긴다.
- **병합 phase의 재개 지점**: Phase 2·4는 여러 구 phase를 합친 단위다. 부분
  완료가 발생하면 각 phase에 표시된 task 그룹 경계에서 이어받고, 그룹 경계를
  넘지 않은 미완 작업은 같은 phase 안에서 복구한다.

## Phase 1: dotfiles 첫 new-runner deploy 실증 (§15-3 잔여)

`실행: main(되돌리기 어려운 외부 배포 효과 통제)`

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

## Phase 2: merge 판정·verify·post-merge lane 전환 (§15-4, §7, §8, §12)

부모 브랜치 누적. 같은 저장소·같은 검증 번들·순차 dependency로 이어지는 세
작업을 한 seal 단위로 묶는다. **위임은 이 phase 전체가 한 단위**이며, 그룹
A→B→C 경계는 부분 완료 시 재개 지점일 뿐이다.

**그룹 A — no-CI merge eligibility (§12)**

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

**그룹 B — verify flow: ensureVerify와 candidate-tree receipt (§7)**

4. coordinator에 `ensureVerify(candidate)`를 추가한다: 실제 merge 방식의
   synthetic candidate tree를 temporary clean checkout에 materialize하고
   effective base script를 한 번 실행, receipt key =
   `(effective_base_sha, candidate_tree_sha, verify_script_identity)`.
5. merge flow 연결: verify absent → 즉시 eligibility(§7.2 포함: post-merge
   stage/failure 미생성); present → pre-merge 1회 실행, merge 후 remote merged
   tree 동일 시 receipt 승계, 다르면 final tree에서 1회 재실행.
6. pre-merge failure는 merge를 중지하고 원래 merge intent를 durable
   continuation으로 보존, post-merge failure는 rollback 없이 Bead를
   `resolved/pr_wait`에 유지한다(§7.3). 네 repo 모두 현재 verify 미선언이므로
   이 경로는 dormant지만 계약상 필수다.

**그룹 C — post-merge coordinator 연결과 cleanup cursor 재작성 (§8)**

7. `pr-actions.js` cleanup cursor를 `base_containment → repo_operations →
   child_sweep → branch_cleanup → parent_close`로 재작성한다. config-present
   repo는 `ensureDeploy` coalescing(+미커버 subject 승계, lock 후 fetch-bind)을
   호출하고 terminal evidence로 진행하며, config-absent repo는 기존
   `post_merge_verify/deployment_request` legacy lane을 유지한다(Phase 8까지).
8. external merged observation([정리] 클릭 경로)과 startup reconciliation이 같은
   coordinator Interface를 쓰도록 연결한다. deploy absent → 가짜 record 없이
   skip.
9. 성공 판정은 script exit 0 + 영구 worktree `HEAD==target_sha`·tracked-clean
   readback으로만 하고, success 전 Bead close를 금지한다. descendant coverage
   (뒤 operation 성공이 앞 subject를 커버)와 실패 격리(앞 failure가 뒤
   descendant를 막지 않음)를 store 규칙대로 연결한다.

검증: AGENTS Pre-Handoff Validation 전체 통과 + `npm run build` 후
bundle/map 포함 + `rg`로 active tree에서 checks consumer(prChecks·
commitChecks·ci badge) 0건 + 신규 focused suite green(verify absent no-op·
receipt 승계·base/head/tree/script 변경 시 stale·different-final-tree 1회 실행·
verify candidate mismatch 거부·새 cursor 전이·dual-lane 분기·coalesce/coverage·
close 전 success 요구) + 기존 legacy suite 무수정 green.

## Phase 3: legacy state migration `repo_operation_migration_v1` (§11, §15-4)

`실행: main(durable queue schema/data를 1회 변환하는 되돌리기 어려운 효과와 그
수렴 readback 통제)`
`landing: direct(수용 증거가 실제 workspace queue readback과 재시작 adoption
실측이라 배포된 코드가 필요하고, 배포는 merged base 정책을 읽는다)`

seal 후 Phase 2+3 누적 전체를 direct landing한다. 새 runtime 첫 부팅에서 1회
실행되며 dual-read 종료를 준비한다.
Phase 2가 만든 새 lane이 legacy record를 인수하는 단계다.

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

검증: §17.8 seam green(q1hs/oj2f/qero 대표 record의 1회 수렴·exact old success만
adoption·budget 미소급) + 실제 workspace queue에서 migration schema version과
result record readback + 재시작 후 같은 input adoption 실측 + AGENTS Pre-Handoff
Validation 통과.

## Phase 4: auto repair 엔진과 설정·policy projection (§4.4, §4.5, §9.3, §10, §15-4)

부모 브랜치 누적. backend 엔진과 그 제어·표시 표면은 같은 저장소·같은 검증
번들의 한 산출물이다. **위임은 이 phase 전체가 한 단위**이며, 그룹 A→B 경계는
부분 완료 시 재개 지점일 뿐이다.

**그룹 A — RepairSessionAdapter (§4.4, §9.3)**

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

**그룹 B — 설정·policy projection UI/protocol (§4.5, §10)**

4. dotfiles `generated/contracts/repo-operation-policy.json`의 exact copy를
   source commit과 함께 beads-ui generated runtime copy로 pin하고, digest/source
   commit이 approved artifact와 다르면 실패하는 contract test를 추가한다.
   backend는 그 copy와 operation state를 protocol로 전달한다(정책 문장
   hard-code 금지).
5. Worker/Monitor workspace 설정에 독립 `자동 해결` toggle(기본 ON, 남은
   budget·active repair session 표시)과 §10의 세 목록(자동 처리/자동 session/
   자동 금지)을 추가한다. 기존 자동화 toggle과 상호 불간섭을 유지한다.
6. operation card(kind·target SHA/tree·script path/blob·elapsed·state·sanitized
   output tail·log link·exit code·repair session link)와 실패 kind별 해결
   버튼(수동 버튼도 coordinator 새 attempt 경유)을 붙인다. generic `재시도`
   버튼은 만들지 않는다. `app/protocol.js`/`app/protocol.md`에 `auto_repair`
   mutation·policy projection·operation states를 기록한다.

검증: §17.6·§17.7 seam green — advisory 4종(durable ON/OFF readback·OFF running
보존·ON 즉시 reconcile·fresh-facts continuation) + chain 1회 budget·fingerprint
loop 차단·successor 계승이 추가 dispatch를 막음·config-disable 우회 거부 +
toggle·세 목록·card/log/exit/session link·absent stage `안 함` 표시·kind별 해결
버튼; AGENTS Pre-Handoff Validation 전체 통과 + `npm run build` 후 bundle/map
포함.

## Phase 5: beads-ui cutover — repo-ops 선언과 self-deploy (§14.1, §15-5)

`실행: main(자기 배포 경로 전환과 self-restart 실측이라는 되돌리기 어려운
외부효과 통제)`
`landing: direct(첫 self-deploy가 previous base에 pin된 정책을 읽고 영구 deploy
워크트리에서 실행되므로 merged 상태가 전제다)`

seal 후 Phase 4+5 누적 전체를 direct landing한다. 외부 효과(자기 배포 경로 전환).

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

검증: §17.5 self-restart 실측 + §17.9의 CI workflow 제거 몫 — active tree에
`.github/workflows/ci.yml` 부재와 branch protection required check 0개 API
readback(§18.2) + §17.10 beads-ui script(same-SHA replay idempotent, secret-free
failure) + live `/healthz` source SHA/realpath exact readback + §17.11의
beads-ui AGENTS/protocol/bundle/source map 몫 + AGENTS Pre-Handoff Validation
통과 + user checkout snapshot 불변(§18.12).

## Phase 6: train_bot enclosed direct landing + deploy/readback (§14.3, §15-6)

`실행: main(다른 repo direct landing과 원격 재배포라는 되돌리기 어려운 외부효과
통제)`

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
HEAD==target SHA + §17.10의 train_bot script 몫 — 대상 repo 테스트 관례에 따른
same-SHA replay idempotency와 secret-free failure 검증 결과 + user checkout
snapshot 불변.

## Phase 7: TRACE-ICI enclosed direct landing + deploy/readback (§14.4, §15-7)

`실행: main(다른 repo direct landing과 SLURM 원격 배포라는 되돌리기 어려운
외부효과 통제)`

외부 효과. `enclosed:UI-vobi`, target `TRACE-ICI/ilsun/dev`.

1. `repo-ops/config.toml`(base="ilsun/dev")과 `scripts/deploy_fisher.sh`의
   expected SHA·SLURM running-job fail-closed·remote fetch/ff-only exact sync·
   `uv sync`·final SHA readback을 표준 entrypoint로 이전해 direct landing한다.
   `[verify]`는 추가하지 않는다.
2. 시작과 끝에 local `.worktrees/.repo-ops-deploy` HEAD==fetched
   `origin/ilsun/dev` target SHA를 확인하고, success exit 전 Fisher remote HEAD
   exact SHA를 확인한다.
3. 새 Worker operation으로 deploy를 실행해 terminal exit/log·readback을 얻는다.
   첫 실행은 bootstrap CLI이며 approved source는 Phase 6과 같은 방식의
   target-local enclosed landing commit + `repo-ops/config.toml` 경로다.
   active SLURM job·unavailable SSH/uv/index는 명확한 failure code로 남긴다.

검증: enclosed landing guards + queue record `succeeded` + Fisher remote
HEAD==target + §17.10의 TRACE script 몫 — 대상 repo 테스트 관례에 따른 same-SHA
replay idempotency와 secret-free failure 검증 결과 + user checkout snapshot
불변.

## Phase 8: legacy reader/provider consumer 제거 (§13, §15-8)

부모 브랜치 누적(최종 PR에 담긴다). 네 repo가 모두 새 lane으로 옮겨진 뒤
실행한다.

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
0건, shared owners 보존; AGENTS Pre-Handoff Validation 전체 통과.

## Phase 9: dotfiles enclosed provider retirement + absence readback (§14.2, §15-9)

`실행: main(다른 repo direct landing과 설치 표면 제거라는 되돌리기 어려운
외부효과 통제)`

외부 효과. `enclosed:UI-vobi`, target `dotfiles/main`. Phase 1의 새 runner
dotfiles deploy 성공 evidence가 전제다.

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

## Phase 10: 최종 disposition·label·completion report (§15-10~11, §19)

`실행: main(Bead disposition·label·보고서라는 durable 상태 쓰기와 그 readback
통제)`

durable write 몫만 이 phase가 소유한다. **마지막 phase이므로 landing 힌트를 가질
수 없다**(완주 계약 §4.1). parent close는 이 phase seal 뒤 `## 완료 절차`의 최종
delivery와 merge leg에서 수행한다.

1. `dotfiles-ji9f`를 superseded close하고, union follow-up inventory와
   superseded Bead disposition을 authoritative readback으로 확인한다(§18.14).
2. §19 증거 5종(beads-ui self-deploy exit/log와 script-owned live health ·
   dotfiles new operation deploy와 provider absence readback · train_bot
   target-base containment/deploy exit/status log · TRACE-ICI 동일 · union
   follow-up inventory와 superseded Bead disposition readback)이 모두 모였는지
   확인하고 UI-vobi notes에 기록한다.
3. spec follow-up self-review와 같은 logical write에서 `worker-ineligible`
   label을 제거하고, completion report를 parent Bead의 bd comment로 작성한다.

검증: §17.11의 나머지 몫 green(dotfiles workflow/skills/checker/render/install
tests, 네 repo config/path/executable checks) + §19 증거 5종 notes 기록 readback
+ label 제거와 `dotfiles-ji9f` close의 `bd show --json` readback.

## 완료 절차

phase가 아니다 — read-only 통합 확인과 최종 delivery만 수행한다.

1. 두 repo full verification을 확인 목적으로 재실행한다(beads-ui `npm run all`
   +`npm run build`, dotfiles 자체 checker), generated artifacts digest(policy
   JSON copy vs dotfiles source commit), shared runtime health, 네 repo exact
   remote tips/deploy evidence를 최종 확인한다.
2. **최종 delivery(완주 계약 §3.4)**: 이슈 통합 diff — 부모 브랜치의 남은 누적
   전체 + Phase 3·5에서 landed된 커밋 SHA 목록 — 에 implementation gate를 1회
   돌리고 `impl_review=<reviewer>@<최종 head sha>`를 기록한다. 그 뒤 PR을 하나
   만들고, 완료 보고를 parent Bead의 bd comment로 쓰고(landed SHA·검증·잔여 위험
   열거), parent를 `resolved` + `pr_url`로 두고 **PR Delivery stop**한다.
   브랜치와 부모 워크트리는 보존한다.
3. parent close는 이 세션이 하지 않는다. 사용자가 그 PR을 확인해 `pr-finish`
   또는 beads-ui [머지]로 머지하면, 불변식 9종·post-merge tail·zero-residue
   스윕(남은 child leaves-first close → 워크트리·브랜치 제거 → parent close →
   final readback)이 §19 순서대로 수행된다.

확인: 위 재실행이 모두 green이고 Phase 10이 기록한 증거 목록과 일치한다.

## Test scope

RED→GREEN 실행 권한은 master spec §17에서 UI-vobi에 남은 다음 seam에 있다.
UI-1lmv가 이미 green으로 만든 seam(§17.1 resolver, §17.2 deploy checkout 몫,
§17.4 store CAS/chain 계승, §17.5 runner atomicity/restart 생존, bootstrap
게이트, transition launcher)은 재실행 대상이 아니며 기존 suite는 수정하지
않는다.

- Phase 1: §17.10 dotfiles 몫 — worker adoption 실증(같은 exact target 재요청)
  + b2yx script 검증 evidence pin(same-SHA replay idempotency·secret-free
  failure).
- Phase 2: §17.9의 checks consumer 제거 몫(negative: active tree 0건) +
  §17.2의 verify candidate mismatch 몫 + §17.3 전체 + §17.4의 coordinator 연결
  몫(cursor 전이·dual-lane·coalesce/coverage).
- Phase 3: §17.8 전체.
- Phase 4: §17.6 전체(advisory 4종 + chain budget/owner/fingerprint) + §17.7
  전체.
- Phase 5: §17.5의 self-deploy 실측 E2E + §17.9의 CI workflow 제거 몫과 §18.2
  required check 0 readback + §17.10 beads-ui 몫 + §17.11의 beads-ui AGENTS/
  protocol/bundle/source map 몫.
- Phase 6/7: §17.10 train_bot/TRACE 몫 — remote exact HEAD/projectmgr 및 Fisher
  exact HEAD/SLURM/uv와 각 script의 same-SHA replay idempotency·secret-free
  failure(각 enclosed repo의 script 검증은 해당 repo 테스트 관례를 따르고
  beads-ui suite에 이식하지 않는다).
- Phase 8: §17.9의 provider deletion 몫(beads-ui) + shared owner 보존 고정.
- Phase 9: §17.9의 dotfiles provider 몫 — active reader/writer·service/
  install/runtime reference 부재 readback.
- Phase 10: §17.11의 나머지 몫(dotfiles workflow/skills/checker/render/install
  tests, 네 repo config/path/executable checks).
- §18.12 user-checkout snapshot 검증은 Phase 1·5·6·7·9의 검증 라인에 포함된다.

제외: verify를 어느 repo에 실제 선언하는 작업(향후 opt-in), 새 provider/daemon
작성, GitHub Actions 재도입, closed historical specs/plans/receipts 삭제.

## 비범위·후속

- workspace UI의 기타 개선(worker lane 재설계 등 다른 Bead 소유)은 손대지
  않는다.
- `~/.config/bdui/config.toml`의 runtime pointer 정합은 Phase 5 cutover에서
  필요한 최소 변경만 수행하고 전후 값을 notes에 기록한다.
