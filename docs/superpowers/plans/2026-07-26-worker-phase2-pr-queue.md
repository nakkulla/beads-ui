# worker 재설계 Phase ② 구현 계획: 머지 축 제거·관측 기반 완료 판정·단일 큐·PR 대기 열 (UI-43di)

## Context

- Bead: UI-43di (full_plan, spec 게이트 통과). 승인 스펙: `docs/superpowers/specs/2026-07-26-worker-phase2-pr-queue.md` @ `4d32d342a46373d9b3a5c54a50807615f5a9c0f2` (codex REVISE 6건 전건 수용 반영).
- 관통 원칙: 무인 자동화는 PR을 머지 가능 상태로 만들기까지, 머지는 사람 클릭, 판정은 세션 자기보고가 아닌 서버 관측.
- 현행 핵심 실측: 완료 판정은 `server/worker/verify.js`의 이원 lane(pr_stop=resolved+pr_url 자기보고 / auto_merge=merge_sha+closed), 소비는 `scheduler.js:472-571`. 워커는 `gh`를 전혀 호출하지 않는다. 레인은 serial/parallel 이원(`queue-store.js`, `tickPass` `scheduler.js:1243-1329`). 머지 축 표면: `merge-lock-route.js`·`session-tokens.js`·`locks.js` 머지락 계층·`breaker.js`·`policy.js` 정책 축·`preamble.js mergeLockProtocol`·`verify-cmd.js` post-merge 실행.
- 실행: 워크트리 `.worktrees/UI-43di`(branch=`UI-43di`, base=origin/main 핀). 각 Phase는 `npm run all` green으로 닫고, 프런트엔드 변경 phase는 `npm run build` 번들 포함. Phase별 실행 child bead 생성(`bd create --parent UI-43di`), 구현은 위임(복잡 구현=opus leaf, 기계적 삭제·수정 sweep=sonnet leaf), phase 경계마다 컨트롤러 diff 리뷰 + 실행 영수증.

## Phase 1: gh 어댑터 + 관측 기반 완료 판정 + pr_wait 레인

1. `server/worker/gh.js` 신규: `gh` CLI 어댑터. 모든 호출이 **3-상태 결과**(`ok(data)` / `empty` / `error(reason)`)를 반환하고 spawn을 격리해 테스트에서 mock 가능하게. 이 phase에서는 `openPrForBranch(repo_dir, branch)`(`gh pr list --head` 상당)와 `checkAvailability()`(`gh auth status` 상당)만; 이후 phase가 같은 어댑터에 조회/머지/업데이트/close를 추가.
2. `verify.js` 교체: `verifyMerge` 이원 판정 → `verifyPrSubmitted` 관측 판정(어댑터 주입). 성공=열린 PR 존재; 관측 성공·빈=`pr_missing`; 오류=짧은 재시도 후 `gh_observation_failed`. 워커가 `pr_url`/`resolved`를 bd에 보정 기록(+readback), 세션이 이미 기록했으면 무해 통과.
3. `queue-store.js`: `pr_wait` 레인 신설 + `moveToPrWait` 단일 mutation(attempt done 기록과 원자). `scheduler.js` 완료 경로(440-571): verify 호출 교체, 성공 시 workflow_mode revert(이제 모든 성공이 PR-stop 성질이므로 상시) + exec 스탬프 revert 유지 + `moveToPrWait`. `admission.js`: `gh_unavailable` fail-closed 검사 추가.
4. 이 phase에서 merge_policy 분기·post-merge verify_cmd 호출은 완료 경로에서 분리만 하고(죽은 코드화) 삭제는 Phase 2가 수행. UI는 pr_wait 항목을 임시로 done 열에 "PR 대기" 표기(4열 IA는 Phase 6).

검증: `verify`/`scheduler`/`queue-store`/`admission` 테스트 교체·신규 green (`npm run all`) — 관측 3-상태, bd 보정 기록, pr_wait 원자 이동, gh_unavailable 거부.

## Phase 2: 머지 축 연쇄 삭제

1. 삭제: `merge-lock-route.js`(+`app.js` 마운트), `session-tokens.js`, `breaker.js`, `locks.js` 머지락 계층(`acquireMerge`/`MergeBlockedError`/`isMergeBlocked`), `preamble.js`의 `mergeLockProtocol`·`DRIFT_HALT_DIRECTIVE`, `policy.js`의 `MERGE_POLICIES`/`DRIFT_POLICIES`/`resolvePolicies`(`resolveExecSettings`만 잔류), `scheduler.js`의 `runPostMergeVerify`·정책 해석·강등(`demoted_reason`)·breaker 가드, queue-store 정책 필드·`setPolicy`·ws `worker-queue-set-policy`.
2. 소비처 정리: `runtime.js`/`attach.js`/`orphan.js`의 breaker 배선 제거 — 실패·orphan 시 동작을 "auto_advance OFF + 실패 배너(최신 failed attempt 렌더)"로 단일화. 전역 ▶의 breaker 리셋, resume의 리셋 분기(Phase ① §1.3) 제거. stop/pause의 토큰 revoke·머지락 해제 단계 제거.
3. `PR_STOP_DIRECTIVE` → 상시 고정 지시문("PR 제출까지, 절대 머지 금지"). `session.js` `MERGE_RE` 가드 분리: `gh pr merge`·base push는 전면 차단 유지, `git merge`는 attempt의 해소 모드 플래그(Phase 5에서 세팅) 있을 때만 base-into-branch 허용.
4. UI: 컨트롤 바 policy select 2종·verify_cmd 표시줄·breaker 배너 의존 제거, 타일 merge_policy/`demoted_reason` 칩 제거. 테스트: 머지 축 테스트 삭제(`merge-lock-route`/`session-tokens`/`breaker`/`app.merge-lock`/`worker-squash` e2e/`locks` 머지락·`policy` 정책 케이스), MERGE_RE 분기 테스트 신규.

검증: `/api/worker/merge-lock` 부재(404) + 삭제 대상 파일 부재 + 실패 경로(배너·auto_advance OFF) 테스트 green (`npm run all`).

## Phase 3: 단일 큐 + 슬롯 N + 레거시 마이그레이션

1. `queue-store.js`: `serial`/`parallel` → 단일 `queue` 레인(레인 3종: `queue`/`pr_wait`/`done`). `place`/`reorder`/`remove` 단일 리스트화. `slots` 필드 신설(기본 2, 하한 1, CAS) + ws `worker-queue-set-slots`.
2. `scheduler.js`: `tickPass` 단일 스캔(빈 슬롯 수만큼 순서대로 채움, blocked/admission-invalid skip 유지), `runningInLane` 제거, cap 초과 표시(수동 재개 허용) 단일 cap 기준 유지. `attach.js`의 `workerParallelSlots` → store `slots` 반영.
3. normalize 레거시 마이그레이션: `serial`+`parallel` → `queue`(serial 앞, 상대 순서 보존), workspace 정책 필드 제거, attempt 레거시 필드(`merge_policy` 등) 보존·무시, `slots` 부재 시 2, 기존 `done` 불변.
4. UI: 레인 이동/드래그 이원화 제거(단일 대기 열), 컨트롤 바 슬롯 수 편집 추가.

검증: `queue-store`(normalize 병합·slots CAS)·`scheduler`(단일 스캔·N=1 직렬 동치·starvation 없음) 테스트 green (`npm run all`).

## Phase 4: PR 폴러 + 머지 게이트 3단

1. `server/worker/pr-poller.js` 신규: `pr_wait`의 열린 PR을 30~60초 주기 조회(state·mergeable·CI·head SHA), `createPoller` 패턴(구독자 있을 때만, `pr_wait` 비면 스킵), 변화를 `emitQueueChanged`→`worker-queue-snapshot`에 얹어 푸시. mergeable UNKNOWN은 짧은 지연 후 재조회. 관측 캐시는 서버 메모리(비영속), 항목마다 head SHA 바인딩.
2. 게이트 판정: CI 있음=green 필요 / CI 없음+`verify_cmd`=로컬 검증 green 필요 / 둘 다 없음(성공한 빈 조회 기준)=게이트 없음+"검증 신호 없음". 관측 오류는 판정 불가(fail-closed, disabled+오류 배지). `gh.js`에 checks 조회 추가.
3. `verify-cmd.js` pre-merge 전환: PR head SHA 고정 detached worktree에서 실행, 결과를 head SHA에 바인딩해 캐시. 실행 시점: `pr_wait` 진입 시 + 관측 SHA에 green 결과 없을 때(재시작 cache miss·SHA 전진). stale green 거부.
4. 외부 상태 관측 분류: MERGED(정리 트리거는 Phase 5 연결 — 이 phase에서는 상태 기록·배지까지), CLOSED-unmerged는 `pr_wait` 잔류 + "PR closed" 상태·배너. UI: `pr_wait` 타일에 PR 링크(`#N ↗`)·CI/게이트/base 배지 표시.

검증: 폴러(UNKNOWN 재조회·구독 게이팅·CLOSED-unmerged 잔류)·게이트 3단(SHA 바인딩·stale 거부·오류 fail-closed) 테스트 green (`npm run all`).

## Phase 5: [머지] 클릭·충돌 해소·[재실행]·머지 후 정리

1. ws 액션 `worker-pr-merge`: 클릭 시점 `gh` 재조회(authoritative), head SHA 변화 시 게이트 재평가(필요 시 로컬 검증 실행) 후 분기 — CLEAN→squash 머지 / BEHIND→update-branch→게이트 재확인→머지 / DIRTY→충돌 해소 세션 자동 디스패치. `gh.js`에 merge/update-branch/close 추가.
2. 머지 후 정리(외부 MERGED 관측 포함, 단일 구현): pr-finish 계약 순서 — base 동기화 → 레포 요구 post-merge 검증 → linked child 스윕(leaves-first, readback) → parent `bd close` → 워크트리·원격/로컬 브랜치 정리 → bead `done(merged)`. 실패 시 bead `resolved` 유지 + durable `merged_cleanup_failed` + 배너, 자동 재시도 없음.
3. 충돌 해소 세션: 기존 워크트리에서 `claude --resume <session_id>`(기존 resume 경로 재사용, `resumed_from` 연결), 해소 모드 플래그로 attempt 기록 → MERGE_RE 예외(Phase 2의 분기 활성화). 프롬프트: origin/main을 브랜치에 머지(merge-into-branch, rebase 금지)·의도 보존 해소·테스트·push. cap 초과 허용(수동 유래). 해소 후 폴러가 새 SHA 관측 → 게이트 재평가.
4. ws 액션 `worker-pr-rerun`([재실행]): PR close → bd `open` 복귀 + `pr_url` 제거(+readback) → 워크트리/브랜치 폐기 → `pr_wait`→`queue` 단일 mutation → 새 base 재디스패치. 폴러의 CLOSED 처리와 경합하지 않도록 전이가 원자적으로 선행.

검증: 클릭 분기 3종(mock)·재실행 전이·정리 순서와 `merged_cleanup_failed` 실패 경로·해소 디스패치(가드 예외 포함) 테스트 green (`npm run all`).

## Phase 6: 탭 IA 4열 완성 + e2e + 번들

1. `app/views/worker/` 4열 IA 마감: 대기(admission 배지)/실행 중(Phase ① 버튼)/PR 대기([머지]·[재실행]·배지)/완료(merged). 컨트롤 바 최종형(▶/⏸·슬롯·exec 기본값). `lanes.js`/`index.js`/`running-grid.js` 재편, `protocol.js` MESSAGE_TYPES 정합(신규 3종 등록 확인 — Phase ① 리뷰 재발 방지).
2. `e2e/worker-flow.test.js` 갱신: dispatch→PR 관측→`pr_wait`→(mock 머지)→정리 흐름. UI projection 테스트(4열·배지·버튼 상태).
3. `npm run build`로 `app/main.bundle.js`(+map) 재생성 포함, `npm run tsc`/`npm test`/`npm run lint`/`npm run prettier:write` 전체 통과.

검증: `npm run all` 전체 green + 번들 재생성 커밋 포함 + 로컬 live 모드 수동 스모크(4열 렌더·버튼 상태).

## Test scope

RED→GREEN seam(phase 매핑, 스펙 §12):
- P1: 관측 판정 3-상태(존재/빈→`pr_missing`/오류→`gh_observation_failed`), bd 보정 기록, `pr_wait` 원자 이동, `gh_unavailable` admission.
- P2: MERGE_RE 가드 분기(해소 모드 base merge 허용 / `gh pr merge`·base push 차단), breaker 부재 실패 경로(auto_advance OFF+배너).
- P3: 레거시 병합 normalize(순서 보존·done 불변), `slots` CAS·하한, 단일 스캔 N=1 직렬 동치·skip 유지.
- P4: 폴러 UNKNOWN 재조회·구독 게이팅·CLOSED-unmerged 잔류, 게이트 3단 판정·head SHA 바인딩·stale green 거부·관측 오류 fail-closed.
- P5: 클릭 분기 3종·SHA 변화 재평가, [재실행] 전이(open 복귀·pr_url 제거·재디스패치), 정리 순서·`merged_cleanup_failed`, 해소 디스패치.
- P6: e2e worker-flow 신규 흐름, UI projection(4열·버튼·배지).
제외: 실 네트워크 `gh` e2e·실제 GitHub 머지(어댑터 mock으로 대체, 스펙 §12) · 삭제되는 머지 축 테스트는 삭제로 대응.

## 비목표 / 마감

- 비목표는 스펙과 동일(자동 머지 부활 금지·stacked PR·GitHub 외 호스팅·소급 재배치·dotfiles 계약 문언 변경).
- 통합 후: `implementation` 게이트(통합 diff, base..HEAD) → PR 발행(origin=nakkulla/beads-ui) → 머지 후 `~/.config/bdui/config.toml` 정합 확인 + `bdui-shared restart` + 프로세스 경로·포트·HTTP 검증(AGENTS.md Post-Merge Runtime Validation) → autorun-policy 스펙 문서에 supersede 표기(§10, Phase 중 스펙 문서 수정 커밋).
