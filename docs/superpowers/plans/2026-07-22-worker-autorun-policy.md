# Worker 자동실행 정책 구현 계획 (UI-aruw)

- 스펙: `docs/superpowers/specs/2026-07-20-worker-autorun-policy-design.md` @ d3d0f076918cc8b377e6bfeb701856e5af6aa0cb (spec_review: codex@d3d0f07 REVISE 5건 전건 수용 후 종결, impl_entry: user-approved)
- Bead: UI-aruw (full_plan) · worktree/branch: `.worktrees/UI-aruw` == `UI-aruw`
- 사용자 결정(2026-07-22): breaker reset 선행 부채를 이 계획에 소항목으로 포함(Phase 4).

## Context

worker 자동실행 파이프라인의 실측 결함 5종을 한 스펙으로 정합화한다: ① dispatch가 spec·route 무검사(사람 의도 앵커 없이 무인 완주 가능), ② merge/drift 정책 세팅 부재(`workflow_mode=fast_track` 무조건 stamp, PR 정지 메커니즘 없음), ③ verify의 ancestry 검사가 계약상 강제인 squash 머지와 충돌(첫 실전 auto-merge에서 `verify_failed:work_not_in_base`로 breaker 다운되는 잠복 결함), ④ 머지 전 품질 권위가 세션 자기보고뿐, ⑤ UI에서 route 추론값이 확정값처럼 표시되고 정책 metadata 편집 불가.

스펙 확정 설계: fail-closed admission validator(큐 진입·tick·dispatch 공유), `merge_policy`(auto_merge 기본/pr_stop)·`drift_policy`(auto_rereview 기본/halt)의 bead>전역>기본 해석+attempt 스냅샷, pr_stop lane 성공 판정 이원화, workspace별 `verify_cmd`(서버 설정 파일 전용, argv 배열)로 post-merge 독립 검증+미설정 시 pr_stop 강등, merge_sha 서버 관측+락 인계(handover), UI 구분 표시·편집.

드리프트 주의(리뷰 SHA 이후 8커밋, 커서 d0e572e 전진 완료): UI-19yr이 러너 인가를 `plan_review` 영수증 기반으로 전환(`server/worker/runner/index.js assertRunnerAllowed`, `server/workflow-enrich.js parsePlanReceipt/planFreshness`) — admission validator는 이 가드를 **대체하지 않고 병렬 추가**된다. UI-8nuz가 표시 정책 스토어·칩 관례 신설 — UI 작업은 그 관례(`isChipEnabled` 게이트, `.ctl-chip--<name>`)를 따른다.

### 핵심 코드 앵커 (탐색 확인)

- `server/worker/scheduler.js`(558줄): `dispatch()` L268-436 (snapshotBead 재검사→assertRunnerAllowed→breaker→worktree.add(base_oid 확정)→workflow_mode stamp+readback→token/spawn→attempt 기록), `tick()` L445-502 (serial head skip은 ready/blocked만 판정), `onSessionDone` L187-258 (성공 시 `verify.verifyMerge`, 실패 시 failAttempt=breaker trip+auto_advance off), `failAttempt` L160-175.
- `server/ws/worker-handlers.js`: `handleWorkerQueuePlace` L318-343 (bead_id/lane 타입 검사만, 거부 사유 필드 없음), `handleWorkerQueueToggle` L390-411, `replyMutation` L287-300, `fanout` L88-92 — **스케줄러 자율 전이는 fanout되지 않는 갭 확인**(클라이언트는 다음 사용자 mutation까지 옛 상태).
- `server/worker/queue-store.js`: `Queue={revision, auto_advance, serial[], parallel[], done[], attempts{}}`, CAS `applyMutation` L298-311, 스케줄러 전용 `applyUnconditional` L323-333, attempt 필드 L27-46, 영속화 `$XDG_STATE_HOME/bdui/<slug>/queue.json`.
- `server/worker/verify.js`(140줄): `DONE_STATUS='closed'` L38, ancestry 검사 L107-111, 사유 enum L28.
- `server/worker/merge-lock-route.js`(145줄): release L107-115는 **기록도 검증도 없이 즉시 해제**, acquire 시 breaker 선검사 L117-120(획득 후 재검사 없음), held ledger `Map<token,{release,repo,target_base}>`, `releaseAllForToken`=tokens.onRevoke 배선 L78-80.
- `server/worker/session-tokens.js`: `SessionTokenInfo={attempt_id, repo, bead_id}` — target_base 미결속.
- `server/worker/locks.js`: in-process FIFO promise-chain mutex, TTL 없음, `topologyLock(repo)` L104-106.
- `server/worker/breaker.js`: `reset()` L74-76 **프로덕션 호출처 없음**(주석 L9 "수동 ▶ 리셋" 미구현 — 사용자 승인으로 이번에 배선).
- `server/config.js`: `~/.config/bdui/config.toml`(smol-toml, `$BDUI_CONFIG_PATH` override), 신규 섹션 패턴=`normalizeXxx(parsed)`→`getConfig()` 스프레드 L215, `normalizeWorkspacePath` L30-41.
- `server/worker/worktree.js`: `add` L53-76 (`-B` 브랜치 전용 — **detached 미지원**), `remove` L84-96.
- `server/bd.js` `runShell` L225-288: no-shell spawn+timeout SIGKILL, 단 spawn 오류=code 127 오버로드·timeout 구분 없음.
- `server/workflow-enrich.js`: `deriveRoute` L264-272, `enrichIssueWorkflow` L421-454(chips.route 스탬프), `runGit`은 fail-quiet라 admission에 재사용 불가.
- UI: `app/views/board/card.js chipsTemplate` L172-222, `app/views/detail-panel/index.js` `sendMutation` L267-287·`propsTemplate` L672-706(select 패턴), `app/views/worker/index.js` `setAutoAdvance` L236-252(CAS retry-once)·`buildModel` L259-380, `app/views/worker/lanes.js miniRow` L26-45(`item.reason` 뱃지), `server/ws/mutation-handlers.js` `EXEC_SETTING_ENUMS` L94-101(enum metadata 편집 전례).
- 테스트: `npm run all`=lint+tsc+vitest+prettier. `server/e2e/worker-flow.test.js` L157-171 `landWorkBranch`(실 git 픽스처, `--no-ff` 머지)— squash 픽스처는 이를 `merge --squash`+commit으로 변형. `server/worker/verify.test.js`(mock gitRun 패턴).

## Phase 1: admission validator — 큐 진입·tick·dispatch 3중 배선

1. `server/worker/admission.js` 신설: `validateAdmission({gitRun, repo, base, bead:{route, spec_id, spec_review}})` — fail-closed, 검사 순서: route enum(`spec_backed|full_plan`) → `git cat-file -e <base>:<spec_id>` 실존 → 영수증 형식 `<reviewer>@<40hex>` 또는 `skipped@<40hex>`(skipped 인정) → SHA 도달성 `git rev-parse --verify --quiet <sha>^{commit}` → freshness `git log <receipt-sha>..<base> -- <spec_id>` **성공+빈 출력**. 구분 사유: `invalid_route`/`spec_missing`/`receipt_missing_or_malformed`/`receipt_unreachable`/`spec_review_stale`/`git_error`(모든 git 명령 오류=거부). `runShell('git',...)` 기반(fail-quiet `runGit` 재사용 금지).
2. 스냅샷·큐 진입 배선: `snapshotBead`에 `spec_id`/`spec_review` 필드 추가(attach.js), attach.js에 workspace-scoped admission accessor(현재 base tip 판독+validator 실행) 신설, `handleWorkerQueuePlace`가 place 전 호출 — 거부 시 `{applied:false, admission_reason}` 응답(replyMutation 확장), UI 후보 카드 뱃지는 Phase 5.
3. tick 배선: 후보 스캔(serial·parallel 공통)에서 validator 실행 — invalid면 `Queue.admission[bead_id]={reason, at}` 기록(`applyUnconditional`, 신규 필드; 성공 dispatch·큐 제거 시 정리, 자동 제거 없음) 후 **같은 tick에서 다음 후보 계속**(기존 skip-blocked-head와 동일한 skip 의미론 — serial 스캔의 break 조건 수정).
4. dispatch 재검사: `worktree.add` 후 확정 `wt.base_oid` 기준 validator 재실행(TOCTOU 차단) — 실패 시 claimed 해제+worktree remove+admission 사유 기록+re-tick. 기존 러너 가드(`assertRunnerAllowed`)는 무변경 유지.

검증: `admission.test.js`(사유 6종·skipped@ 인정·fresh 통과, mock gitRun) + `scheduler.test.js` starvation 케이스(admission-invalid serial head에서 같은 tick 다음 후보 dispatch) green.

## Phase 2: 정책 세팅 2종 — 저장·해석·스냅샷·강등·preamble

1. `server/config.js`: `[worker.verify."<정규화 절대경로>"]` 섹션 신설 — `cmd`(argv 문자열 배열, shell 문자열 금지)+`timeout_ms`(기본 600000) — `normalizeWorkerVerify(parsed)` 신설, `getConfig()` 노출. toolchain 제약(clean worktree에 `.venv` 등 부재 — 자체 완결 또는 canonical checkout 절대경로) 주석+예시(`beads-ui: ["npm","run","all"]`) 명시.
2. `queue-store.js`: Queue에 전역 `merge_policy`(`null|'auto_merge'|'pr_stop'`)·`drift_policy`(`null|'auto_rereview'|'halt'`) 필드+CAS setter, `worker-queue-set-policy` WS 핸들러(`handleWorkerQueueToggle` 패턴)+`app/protocol.js` MessageType 추가.
3. 해석·스냅샷·강등: resolver(bead metadata > workspace 전역 > 기본값 auto_merge/auto_rereview)를 dispatch에서 실행, attempt 레코드에 `merge_policy`/`drift_policy`/`demoted_reason` 필드 신설·스냅샷. `verify_cmd` 미설정 && 해석=auto_merge → `pr_stop` 강등+`demoted_reason='verify_cmd_unset'` 기록.
4. preamble(`runner/preamble.js`): `applyPreamble`에 pr_stop 지시문(PR 생성·CI 확인·bead `resolved` 기록까지 수행 후 머지 없이 종료; **merge_lock 블록 미주입**)·drift halt 지시문(material drift 판정 시 중단·실패 종료) 추가 — scheduler settings 경유 배선. auto_rereview는 지시문 없음(계약 기본 동작).

검증: 해석 순서·강등 unit + preamble 조합 스냅샷 테스트 + queue-store CAS setter 테스트 green.

## Phase 3: verify 재설계 — 서버 관측 merge_sha·락 인계·이원 판정

1. token 바인딩: `session-tokens.js` `SessionTokenInfo`에 `target_base` 추가(issue 시 기록), `merge-lock-route.js`에서 `session.target_base !== target_base` → 403 (attempt_id는 기존 바인딩 유지).
2. merge-lock-route 재설계: (a) acquire — 락 획득 **후** breaker 재검사(waiter 깨어난 직후 tripped→즉시 release+423), 서버가 base tip 직접 판독(`gitRun` dep 주입)해 held entry에 `base_tip_at_acquire` 기록; (b) release — base tip 재판독 → 전진 확인(acquire tip과 상이+ancestor)·세션 주장 40-hex 일치 확인(제공 시) → 성공 시 서버 관측 tip을 `onMergeObserved(attempt_id, merge_sha)` 콜백으로 attempt에 기록하고 **락을 즉시 풀지 않고 worker로 인계**(held entry 소유 이전; `releaseAllForToken`/onRevoke는 인계된 락을 건드리지 않음); 실패(미전진·불일치·git 오류) 시 release 거부 응답+attempt에 `release_rejected:<사유>` 기록.
3. scheduler/런타임 인계 수명: `onSessionDone` 성공 경로가 인계된 락을 넘겨받아 post-merge 검증(Phase 4 삽입 지점) 종료 후 해제; 실패 경로는 **breaker trip 먼저 → 락 해제** 순서. `runtime.js`/`attach.js` 배선.
4. `verifyMerge` 이원화: auto_merge = 서버 관측 `merge_sha` 기록 존재+bd `closed`(ancestry·work_tip 검사 제거 — squash 정합; merge_sha 부재는 fail-closed, 락 미획득 종료는 기존대로 `bd_not_closed` 사유 유지); pr_stop = bd `resolved`+`pr_url` metadata 존재(bdShow에 metadata 포함하도록 확장). 성공 시 pr_stop이면 `workflow_mode`를 `workflow_mode_prior`로 revert, attempt에 `done_kind`(`'auto_merge'|'pr_stop'`) 구분 기록, done lane 이동. auto_merge 성공은 기존대로 미revert.
5. preamble `mergeLockProtocol` 문구 갱신: release가 검증 인계를 시작하며 세션은 락 해제 완료를 기다리지 않고 종료 가능함을 명시.

검증: squash 머지 실 git 픽스처 e2e(worker-flow 패턴 변형) — 현행 ancestry 검사 실패 재현+신규 merge_sha 판정 통과, 위조 SHA·미전진 release 거부, 인계 보유 중 second acquirer 대기, waiter 재검사 423 — 모두 green.

## Phase 4: verify_cmd 독립 실행 — post-merge 검증 + breaker reset 배선

1. `worktree.js`에 `addDetached({repo, sha})` 신설: `git worktree add --detach <임시경로> <sha>`(topologyLock 가드, merge_sha 고정 — 가변 base tip 아님)+대칭 remove 정리.
2. verify-cmd 러너 신설(`server/worker/verify-cmd.js`): config의 argv+timeout으로 shell 미경유 spawn, `timed_out` 플래그 자체 추적으로 3구분 사유 `verify_cmd_timeout`/`verify_cmd_failed`/`verify_cmd_spawn_error` 반환(runShell은 spawn 오류=127 오버로드라 직접 spawn 또는 확장 필요).
3. scheduler 통합: auto_merge 성공 경로(verifyMerge ok 후, 인계 락 보유 상태)에서 merge_sha 고정 detached worktree 생성→verify_cmd 실행→worktree 정리(finally); 통과→락 해제+Done; 실패→**breaker trip 먼저→락 해제**→auto_advance off→attempt 실패(구분 사유). pr_stop lane은 실행하지 않음.
4. breaker reset 배선(사용자 승인 소항목): `handleWorkerQueueToggle` on=true 시 해당 workspace repo의 `breaker.reset(repo)` 호출(breaker.js 주석 L9의 기존 의도 구현) — attachment가 아는 repo 기준.

검증: verify-cmd 러너 3구분 사유 unit(가짜 스크립트 pass/fail/timeout) + scheduler 통합 테스트(통과→Done, 실패→trip 후 해제 순서 검증) + ▶ 토글 reset 테스트 green.

## Phase 5: UI — 구분 표시·metadata 편집·전역 설정·뱃지·실시간 반영

1. route 추론/명시 구분: `enrichIssueWorkflow`에 `route_source`(`'explicit'|'derived'`) 스탬프(`deriveRoute` fallback 로직 자체는 유지), `card.js` 칩에 흐린 표시+`?` 접미(`.ctl-chip--route.is-derived`, `base.css`·`tokens.css`), detail-panel 읽기 행 동일 구분.
2. metadata 편집: `update-workflow-meta` WS mutation 신설(`EXEC_SETTING_ENUMS` 패턴 — `route`/`merge_policy`/`drift_policy` enum select+빈 값=unset, `bd update --set-metadata/--unset-metadata`+`bd show --json` readback), detail-panel `propsTemplate`에 select 3종+full_plan→spec_backed 전환 시 경고 confirm(저장된 plan 포기·마커 정리는 세션 계약 소유 문구).
3. Worker 탭: 전역 `merge_policy`/`drift_policy` select(`setAutoAdvance` CAS retry-once 패턴), `verify_cmd` 읽기 전용 표시(스냅샷 envelope에 config 계산 `workspace_info` 추가 — 편집 표면 없음), admission 거부·강등 사유 뱃지(`miniRow` reason·running tile 뱃지 패턴, `Queue.admission`·`demoted_reason` 소비).
4. 실시간 반영 갭 봉합: scheduler 자율 전이 지점(dispatch 시작·admission 기록·onSessionDone·orphan)에 `notifyQueueChanged(workspace)` fanout 훅 주입(attach/runtime에서 worker-handlers fanout 연결) — 현재 클라이언트가 다음 사용자 mutation까지 스케줄러 전이를 못 보는 확인된 갭.

검증: mutation 핸들러 테스트(enum·unset·readback)+jsdom 렌더 테스트(is-derived 칩·뱃지·select)+`npm run all` 전체 green, UI 수동 확인(추론 `?` 칩·편집·뱃지·실시간 갱신).

## Test scope

RED→GREEN seam(모두 신규 focused, 기존 테스트 무손상):

- Phase 1: `server/worker/admission.test.js` — 거부 사유 6종·skipped@ 인정·fresh 통과(mock gitRun); `scheduler.test.js` 추가 케이스 — admission-invalid head starvation 없음(수용 기준 10).
- Phase 2: 정책 해석 순서(bead>전역>기본)·`verify_cmd` 미설정 강등(수용 기준 2·6)·preamble 조합.
- Phase 3: squash 픽스처 e2e(수용 기준 4 — 현행 검사 실패·신규 통과 양방 재현), 위조 SHA·미전진 release 거부·인계 중 락 배타·waiter 423(수용 기준 11), pr_stop 성공 판정(수용 기준 3).
- Phase 4: verify_cmd 3구분 사유(수용 기준 12)·실패 시 trip→해제 순서·repo 후속 dispatch 차단(수용 기준 5)·▶ reset.
- Phase 5: `update-workflow-meta` enum mutation(수용 기준 7)·jsdom 칩/뱃지.

제외(사유): `session.js` 무락 머지 가드 자체(기존 동작 무변경), bd CLI 내부 동작(외부 도구), drift 판정 메커니즘·freshness cursor(세션 계약 소유 — 스펙 비목표), dotfiles 계약 문언(별도 spec dotfiles-nwxc 소유), 플랫폼 CI(스펙 비목표).

## 마무리 메모

- 실기 config 반영(`~/.config/bdui/config.toml`에 beads-ui `verify_cmd` 등록)은 코드 머지 후 운영 단계에서 사용자 확인 하에 수행(런타임 사용자 설정 파일 — 구현 중 무단 편집 없음).
- 통합 후 `implementation` 게이트 1회(통합 최종 diff), 이후 finishing 절차(standard 모드 — PR Delivery에서 정지).
