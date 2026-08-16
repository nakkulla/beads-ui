# 수동 머지 review continuation 실행 계획

## Context

이 계획은 승인·게시된 spec docs/superpowers/specs/2026-08-16-manual-merge-review-continuation-design.md@e930be5be2e88ab7b9dedd9c3a6f507fe43026a9를 실행한다. 사용자 의도는 global auto_merge=false여도 개별 [머지] 클릭을 해당 항목의 durable 완료 권한으로 취급하여, queue-owned head 변경 뒤 implementation review, 필요한 1회 repair/self-review, fresh re-gate, pinned-head merge와 cleanup까지 자동으로 수렴시키는 것이다.

확인된 root cause는 두 계약의 결합이다. server/worker/merge-queue.js는 resolution.state=ready 뒤 global auto_merge가 꺼져 있으면 manual item도 pause하고, conflict resolver·base update가 만든 새 head에는 current impl_review receipt가 없지만 자동 reviewer를 dispatch하는 상태 전이가 없다. dotfiles의 기존 review/workflow 지침도 target drift 뒤 external follow-up review를 일반적으로 금지하므로 consumer만 우회해서는 정합할 수 없다.

작성 시점의 durable evidence는 다음과 같다.

- UI-ffeu는 closed이며 PR #139의 cleanup residue가 마감됐다. terminal row에 cleanup retry를 다시 실행하지 않는다.
- UI-wv97은 resolved, PR #142, observed head 12b188bca289024d4de503c904767b54c964d980이며 current impl_review가 stale하다.
- dotfiles-vzlm은 open이고 canonical contract provider unit이다.
- UI-58w8은 위 세 Bead를 blocks dependency로 소유하고 worker-ineligible label을 유지한다.
- beads-ui와 dotfiles의 repo-ops/config.toml에는 deploy만 있고 verify는 없다. 어떤 Phase도 legacy verify를 호출하거나 gh pr checks를 기다리지 않는다.
- 작성 시 origin/main은 spec publication commit e930be5be2e88ab7b9dedd9c3a6f507fe43026a9을 포함한다. 각 Phase는 시작 직전에 remote/base/head를 다시 pin하며 이 문서의 관측 SHA를 실행 권한으로 사용하지 않는다.

실행 재개 시 controller는 게시된 plan_path와 plan_approval을 확인한 뒤 UI-58w8을 claim하고 Phase 수와 같은 child 세 개를 만든다. 각 child는 plan_task_anchor와 해당 Phase section SHA-256 digest를 기록하고 순차 blocks chain으로 묶는다. child는 implementation·verification·exec_receipt 뒤 resolved, 해당 효과의 remote containment와 deploy coverage 뒤 closed한다. parent worktree는 .worktrees/UI-58w8, branch는 UI-58w8 하나만 사용한다.

## Phase 1: 기존 PR #142와 cleanup residue 마감

실행: main(legacy queue에는 새 continuation journal이 없고 pinned-head merge·deploy·Bead close라는 비가역 외부효과를 controller가 직접 소유해야 한다)
landing: direct(PR #142의 merge·deploy·close가 다음 provider 변경의 기준 main과 dependency 해제를 만든다)

1. UI-ffeu를 bd show --json으로 다시 읽고 closed, cleanup_failed/pr_wait 부재, 현재 deploy SHA의 descendant coverage를 확인한다. 이미 terminal이면 어떤 retry·session도 시작하지 않는다.
2. UI-wv97과 PR #142를 fresh fetch/GitHub read로 다시 관측하여 current base/head와 OPEN state를 pin한다. DIRTY/CONFLICTING 또는 BEHIND이면 review를 시작하지 않고 기존 controller-owned conflict resolver/base-update 경로를 실행해 terminal success를 기다린다.
3. resolver/update 뒤 remote를 다시 fetch하고 PR을 재관측한다. 새 head의 remote containment, old-head ancestry, current base containment와 CLEAN mergeability를 모두 확인한다. head가 다시 drift하거나 lineage가 불명확하면 stale evidence를 채택하지 않고 중단한다.
4. 이 최종 CLEAN head의 전체 PR diff만 Codex implementation reviewer가 한 번 검토한다. APPROVE면 impl_review=codex@<current-head>를 기록하고 readback한다. REVISE면 모든 finding을 한 batch로 수정·검증한 뒤 controller가 full artifact 또는 정확한 repair delta를 self-review하고 새 head receipt를 기록한다. blocking finding, transport failure, head drift, receipt mismatch는 merge를 중단한다.
5. fresh merge gate에서 current spec/implementation receipts, CLEAN mergeability, pinned head를 확인하고 pr-finish로 PR #142를 squash merge한다. repo-ops/config.toml에 verify가 없음을 다시 확인하여 verify operation을 만들지 않는다.
6. merge SHA를 대상으로 deploy RepoOperation terminal success, .worktrees/.repo-ops-deploy의 clean detached descendant HEAD, shared process source path·port·/·/healthz 응답을 확인한다. cleanup cursor를 끝낸 뒤 UI-wv97을 closed하고 dependency readback을 남긴다.

검증: bd show UI-ffeu/UI-wv97 --json, resolver/update terminal receipt, old→new head ancestry·current base containment·remote containment, gh pr view #142의 final CLEAN identity와 MERGED readback, impl_review current-head receipt, verify operation 부재, deploy operation exit 0과 target/descendant coverage, shared runtime source SHA·path·port·HTTP readback, git/Beads cleanup residue 부재를 모두 확인한다.

## Phase 2: dotfiles canonical review continuation 계약 배포

landing: direct(beads-ui consumer가 배포·설치된 canonical workflow/review 계약을 전제로 구현되어야 하므로 provider를 먼저 main에 고정한다)

1. latest dotfiles origin/main에서 .worktrees/dotfiles-vzlm과 branch dotfiles-vzlm을 만들고 dotfiles-vzlm을 claim한다. 사용자 main checkout의 기존 dirty paths는 건드리지 않으며, remote의 canonical/generated same-path drift가 있으면 merge를 추측하지 않고 hard stop한다.
2. docs/contracts/workflow.md와 docs/contracts/workflow.yaml에 manual per-item authority, automatic enrollment과의 분리, queue-owned head별 exactly-once reviewer, REVISE 뒤 1회 repair/controller self-review, journal-bound receipt, self/skip/skipped fail-closed 의미를 추가한다. docs/contracts/harness.yaml의 reviewer table은 read-only owner로 유지한다.
3. src/shared/skills/workflow/SKILL.md, src/shared/skills/review/review/SKILL.md, src/shared/skills/beads/bd-usage/references/bd-usage.md에 같은 좁은 manual-continuation 예외와 receipt/readback 규칙을 반영한다. ordinary formal gate single-pass와 자동 second reviewer 금지는 그대로 보존한다.
4. contract checker와 focused tests를 먼저 RED로 만들고 source를 GREEN으로 고친다. scripts/render.py로 generated Codex/Claude instruction copies와 machine projection을 갱신하고 source/runtime 의미가 일치하는지 검사한다.
5. controller가 full diff/status를 검토하고 contract-bearing implementation review를 통과시킨다. changed paths와 parent를 pin해 dotfiles main에 direct land하고 remote containment을 확인한다.
6. landing 이전 base가 선언한 repo-ops [deploy]를 사용해 terminal success를 얻고, durable synced deploy checkout에서 설치된 Codex/Claude workflow·review·bd-usage runtime copies의 exact 의미를 readback한다. completion report와 exec_receipt를 기록한 뒤 dotfiles-vzlm을 closed한다.

검증: dotfiles focused contract/skill tests, scripts/render.py와 generated diff, repository full required tests, git diff --check, pinned single-parent remote containment, previous-base deploy operation exit 0, deploy worktree clean descendant HEAD, 설치된 양 runtime workflow/review/bd-usage copy readback, bd show dotfiles-vzlm --json closed evidence를 확인한다.

## Phase 3: beads-ui durable authority·review·repair state machine 구현

1. UI-wv97와 dotfiles-vzlm이 closed이고 UI-ffeu가 계속 closed인지 dependency readback으로 확인한다. 같은 durable update에서 UI-58w8의 worker-ineligible label을 제거하고 readback한 뒤에만 implementation dispatch를 시작한다.
2. UI-58w8 worktree에서 latest origin/main을 fetch하고 history rewrite 없이 merge해 provider/runtime 기준과 정렬한다. published spec bytes가 동일한지 확인하고 semantic conflict나 unowned path overlap이면 중단한다.
3. server/worker/queue-store.js에 authority와 head_review journal normalization·persistence·CAS를 구현한다. nonterminal duplicate click은 authority를 재사용하고, failed 재클릭/cancel 뒤 re-enqueue는 새 authority를 발급하며 old attempt late result를 no-op으로 만든다. legacy authority-less entry는 fail-quiet/manual re-click 대기 상태로 남긴다.
4. server/worker/merge-queue.js, scheduler.js, attach.js, pr-actions.js와 필요한 adapter에 manual authority driver를 구현한다. global auto_merge OFF는 automatic enrollment만 멈추고 manual continuation은 resolver/base-update 뒤 selected reviewer를 exactly once dispatch한다. self/skip selection, skipped receipt, malformed result, drift와 readback mismatch는 terminal needs-human failure다.
5. APPROVE는 exact authority/head/review attempt와 Beads receipt를 journal에 함께 결속한다. REVISE는 findings digest와 repair_rounds=1을 prerecord한 뒤 writable repair-controller를 한 번만 실행하고, controller-owned self-review가 결속된 새 head만 approved로 전환한다. second external review나 second repair는 만들지 않는다.
6. final merge path는 current PR/base/head, CLEAN mergeability, journal-bound impl_review, optional repo-ops verify 선언, cancel generation을 다시 읽고 pinned-head merge를 한 번만 실행한다. queue-owned 추가 head는 새 journal로, external drift는 failed로 보낸다.
7. server/ws/worker-handlers.js와 app/views/worker/index.js에 authority identity와 pending/reviewing/revising/failed projection을 연결한다. live activity는 실제 running/paused attempt에만 표시하고 optional field가 없는 legacy row는 fail-quiet한다. frontend 변경 뒤 app/main.bundle.js와 app/main.bundle.js.map을 deterministic rebuild한다.
8. queue schema가 소유하는 단일 capability constant를 existing Worker status와 worker-queue-snapshot에 read-only로 투영한다. status/snapshot은 actual queue store의 auto_merge boolean과 manual_merge_continuation: { schema_version: 1, head_review_projection: true }를 서로 독립된 필드로 반환하며, health와 WS가 별도 의미를 복제하지 않는다. protocol·health tests가 이 exact shape을 고정한다.
9. focused RED→GREEN tests와 end-to-end Worker flow를 통과시킨 뒤 AGENTS.md의 Pre-Handoff Validation 순서로 node engine, npm ls --depth=0, npm run tsc, npm test, npm run lint, npm run prettier:write, npm run build, git diff --check를 수행한다. controller가 full status/diff와 generated artifacts를 확인하고 current integrated head implementation review를 완료한다.
10. origin의 writable fork를 대상으로 non-empty PR을 만들고 pr_url, exec_receipt, completion report를 기록하여 Phase child와 parent를 resolved로 둔다. 이 Phase에는 landing hint를 두지 않으며 final PR merge 전 delivery stop을 지킨다.

검증: authority/reviewer/repair/cancel/restart focused tests와 server/e2e/worker-flow.test.js, Worker status/WS capability contract tests, full Pre-Handoff Validation, current-head impl_review receipt, exact PR head/base/changed-path containment, Bead metadata·label·phase-child readback을 확인한다. post-merge child close에는 Finishing의 deployed-process status/snapshot acceptance가 추가로 필요하다.

## Test scope

Phase 2의 RED→GREEN seam은 canonical contract checker가 manual continuation 예외, self/skip/skipped fail-closed, workflow/review/bd-usage source와 generated/runtime copy 불일치를 검출하는 것이다.

Phase 3의 RED→GREEN seam은 다음 네 묶음이다.

1. authority: auto_merge=false manual enqueue, automatic source 구분, toggle OFF 보존, failed/cancel 재발급, old-result CAS, legacy fail-quiet.
2. reviewer continuation: resolver/base update 새 head, exactly-once dispatch, APPROVE receipt/readback, self/skip reviewer selection과 skipped receipt 거부, journal authority/head/attempt와 무관한 self@<current-head> 거부, malformed·transport·drift failure, restart adoption.
3. bounded repair: findings prerecord, exactly-one repair, controller self-review 결속, no-progress/second-round terminal failure, external drift 거부.
4. end-to-end/UI: manual click에서 resolver 또는 base update를 거쳐 review/repair, merge, cleanup으로 수렴하고 cancel/restart 중 duplicate session/merge가 없으며 badge와 bundle이 실제 state를 반영한다. Worker status와 WS snapshot은 같은 schema constant에서 auto_merge와 manual continuation/head_review support를 독립적으로 투영한다.

Phase 1은 기존 PR과 runtime의 operational finishing이므로 새 TDD seam을 만들지 않는다. GitHub checks/CI gate 재도입, repo-ops [verify]가 없는 저장소의 legacy verify, legacy entry 자동 migration, parallel merge, unlimited repair, 새 workflow metadata key는 모든 Phase의 명시적 제외 범위다.

## Finishing

Phase 3의 non-empty PR delivery 뒤 controller는 현재 사용자의 끝까지 머지 지시를 pr-finish 권한으로 이어받되, Phase seal과 merge를 같은 것으로 취급하지 않는다. pr-finish는 fresh pinned head, current implementation review와 repo policy를 다시 확인하고 squash merge한 뒤 deploy RepoOperation terminal success, .worktrees/.repo-ops-deploy clean descendant HEAD, shared service process path·port·/·/healthz를 검증한다.

같은 shared process의 /healthz Worker status와 authenticated read-only worker-queue-snapshot을 읽어 target workspace의 auto_merge=false와 manual_merge_continuation={schema_version:1, head_review_projection:true}가 독립 필드로 활성화됐는지 확인한다. 이 값은 deployed source SHA와 동일한 queue schema constant에서 나와야 하며 별도 health-only flag는 허용하지 않는다. focused end-to-end tests가 false global toggle 아래 manual authority continuation을 증명하고, deployed process readback이 그 exact implementation을 실행 중임을 결속해야 한다. status/snapshot 불일치나 capability 부재는 배포 실패로 취급한다.

그 뒤 Phase children을 leaves-first로 closed하고 completion report를 readback한 다음 UI-58w8을 마지막에 closed한다. 어떤 required verification이나 source-of-truth check가 실패하면 merge 또는 close를 강행하지 않는다.
