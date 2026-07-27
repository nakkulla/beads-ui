# 워커 post-merge deploy hook + cleanup 순서 계약 정합화 (UI-3onr)

## Context

UI-89q5 머지 후 공유 서버가 구버전 번들을 서빙한 사고의 근본 수정. 워커 [머지]
cleanup 파이프라인에 배포 단계가 없어 UI 버튼 머지 경로에는 배포 수행 주체가
없다. 승인 스펙: `docs/superpowers/specs/2026-07-27-worker-deploy-hook-design.md`
@ `9390054a2e505c26db5bfab3e7a47c21b08aeb51` (codex spec 게이트 REVISE 4건 반영
완료, `spec_review` 수취).

계획 조사에서 추가 발견: dotfiles 계약(`docs/contracts/workflow.md` Finishing,
`workflow.yaml finish.sweep_order`, workflow 스킬 `references/finishing.md`)은
"install(배포)은 sync+verify 직후, branch/worktree 정리 후 **parent close
마지막**"인데, 워커 `CLEANUP_STEPS`는 `parent_close → branch_cleanup` 역순이고
승인 스펙의 deploy는 맨 뒤였다. **사용자 결정(2026-07-27): 이번 작업에서 같이
정합화** — 스펙을 개정해 워커 순서를 계약에 맞춘다. 스펙 드리프트는 사용자 명시
승인으로 처리하고 Bead notes에 기록한다.

정합화된 cleanup 순서 (6단계):

```
base_sync → post_merge_verify → deploy → child_sweep → branch_cleanup → parent_close
```

- deploy는 계약의 install 위치(verify green 직후)로 이동. 단 **detached 모드는
  터미널 발사 예외**: deploy 단계(3)에서는 사전 검사만 수행하고, 실제 발사는
  parent_close까지의 durable 기록(`last_deploy: launched` + `moveToDone` atomic)
  이후에 한다 — 자기재시작이 남은 단계를 죽이면 안 되기 때문. 계약 문서에 이
  예외를 명시한다.
- parent_close가 맨 뒤로 가면서 기존 `restoreResolved`(parent_close 이후 실패 시
  bd를 resolved로 복원) 의미론 단순화: branch_cleanup 실패는 close 이전이므로
  복원 불요, parent_close 자체 실패만 고려.
- deploy cmd는 재실행 안전(멱등)해야 함 — [머지] 재클릭 cleanup 재시도는 항상
  1단계부터 전체 재실행이므로 (config 문서에 명시).

스펙에 이미 고정된 나머지 의미론(변경 없음): `[worker.deploy."<abs>"]` config
(argv·timeout_ms 기본 600000·detached, 자동 감지 없음), verify 해석 불가 +
deploy 설정 시 `deploy_verify_missing`, deploy 직전 브랜치·clean·HEAD==base_sha
재검증 실패 시 `deploy_base_not_synced`, 동기 모드 사유 어휘
(`deploy_failed`/`deploy_timeout`/`deploy_spawn_error`), 실패는
`cleanup_failed`에 `step:'deploy'`로 기록(기존 배너+[머지] 재클릭 재시도),
workspace당 `last_deploy` durable 기록, ⚙ 다이얼로그 read-only 섹션(승인 목업:
`~/tmp/mockups/2026-07-27-worker-deploy-settings-dialog.html`).

## Phase 1: 스펙 개정 + 발견 사항 기록

- 스펙 §2를 정합화 순서(위 6단계)로 개정: deploy 위치 이동, detached 터미널
  발사 예외, restoreResolved 단순화, 멱등 요구 추가. §5(계약 co-update)도 순서
  정합화 포함으로 갱신. main에서 커밋 → fetch/ff-only/push → ahead 0.
- Bead notes에 기록: 스펙 개정은 사용자 명시 승인(계약 정합화 결정)에 의한
  amendment — `spec_review` 수취는 원리뷰 대상 유지, 개정 SHA 병기.
- 검증: `git status -sb`로 ahead 0 + `bd show UI-3onr --json` notes readback.

## Phase 2: dotfiles 계약 문서 갱신

- 실제 canonical 클론 확인: `readlink ~/.claude/skills/pr-finish`로 스킬 소스가
  가리키는 dotfiles 체크아웃을 확정한 뒤 그 저장소에서 작업 (조사에서
  `~/GitHub/dotfiles`와 `~/Documents/GitHub/dotfiles` 두 경로 관측 — 실측 필수).
- workflow 스킬 `references/finishing.md`(과 필요 시
  `docs/contracts/workflow.{md,yaml}`)에 additive 기록: beads-ui 워커 merge-click
  cleanup은 이 sweep의 소비자이며 6단계 순서(계약 정렬), deploy(=install) 실행
  조건(실제 verify green, 해석 불가 시 `deploy_verify_missing`), detached 터미널
  발사 예외, `deploy_base_not_synced` 재검증. dotfiles 커밋·푸시 (해당 저장소
  규칙 준수, Korean 커밋).
- 검증: 갱신 문서에 6단계 순서·예외 문구 존재 grep 확인 + push 후 ahead 0.

## Phase 3: 서버 구현 (worktree `.worktrees/UI-3onr`, branch `UI-3onr`)

- `server/config.js`: `normalizeWorkerDeploy` 신설(`normalizeWorkerVerify`
  110-144 미러: 절대경로 키, non-empty argv, timeout 기본
  `DEFAULT_VERIFY_TIMEOUT_MS`, `detached === true`만 true), `getConfig()`에
  `worker_deploy` 추가. `config.test.js` 확장.
- `server/worker/queue-store.js`: top-level `last_deploy` 필드(`emptyQueue`
  179-192, `normalizeQueue` 312-391에 `cleanup_failed` 로드 블록 376-388 템플릿
  로 검증 추가), `recordLastDeploy(workspace, rec)` mutation
  (`applyUnconditional` 패턴, `recordCleanupFailure` 899-918 미러), detached용
  `moveToDone`+`last_deploy` atomic 결합 mutation. 테스트 추가.
- `server/worker/pr-actions.js`: `CLEANUP_STEPS` 정합화 재배열 + `deploy` 추가,
  `runCleanup`(681-737)에 deploy 단계 삽입(사전 검사: `resolveVerify` 해석 →
  `deploy_verify_missing`, `gitRun`으로 브랜치/clean/HEAD==base_sha 재검증 →
  `deploy_base_not_synced`; 동기 실행은 `verify-cmd.js`의
  `runVerifyCmd`(155-230, `spawn_impl` 주입 지원)를 repo 루트 cwd로 재사용;
  detached는 사전 검사 후 pending → parent_close 후 atomic 기록 → detached+unref
  발사, 동기 spawn 예외 시 `failed` 덮어쓰기), `restoreResolved` 호출 조건을 새
  순서에 맞게 조정, deploy resolver 주입(`resolveDeploy` deps 추가 —
  `resolveVerify` 429 패턴). 기존 순서 단언 테스트 갱신 + 신규 테스트
  (`makeActions` calls-로그 하네스 130-282 재사용).
- `server/ws/worker-handlers.js` `decorateQueue`(173-200): `workspace_info`에
  `deploy_cmd`(`getConfig().worker_deploy`에서 해석)와 `last_deploy`(큐에서)
  추가. 핸들러 테스트 확장.
- 검증: `npm run tsc && npm test`(서버 스위트 녹색, 기존 1343+ 통과 유지).

## Phase 4: 프론트엔드 + 번들

- `app/views/worker/exec-defaults-dialog.js`: 기존 폼 아래 read-only 「검증·배포
  설정」 섹션(승인 목업 구성: verify 명령/source 배지/timeout, deploy 명령/
  detached 배지/안내 문구, `last_deploy` 배지 행 — 기록 없으면 생략, 편집 요소
  없음). `workspace_info`는 이미 구독 중인 `queueStore` 스냅샷에서 읽음.
- `app/styles.css`: `.exec-defaults` 블록(2504-2573) 뒤에 섹션 스타일 추가.
- `app/views/worker/index.test.js`: `openExecDefaults` 헬퍼(1823-1831) 재사용해
  설정 있음/없음/detached 배지/마지막 배포 배지/편집 요소 부재 테스트.
- 검증: `npm run all`(tsc/lint/prettier/test) + `npm run build` 후 번들 포함
  커밋.

## Phase 5: 전달 + 런타임 적용

- PR 생성(`origin`=nakkulla/beads-ui 대상, 체크 없음=vacuous pass), 머지 경로는
  워크플로 finishing 규칙(AI review gate)에 따름.
- 머지 후: `~/.config/bdui/config.toml`에 `[worker.deploy."<beads-ui 절대경로>"]
  cmd=["bdui-shared","restart"], detached=true` 추가(사용자 소유 파일 — 기록 전
  현재 내용 확인), main ff-only 동기화.
- Post-Merge Runtime Validation: 머지 체크아웃에서 번들 확인, `bdui-shared
  restart`, 프로세스 경로·포트·HTTP 200·서빙 번들 해시 == 머지 산출물 검증.
  ⚙ 다이얼로그에 배포 설정 표시 확인.
- 검증: 서빙 번들 SHA-256 == 머지 커밋 번들 + ⚙ 다이얼로그 섹션 렌더 확인.

## Test scope

RED->GREEN 대상 seam (모두 Phase 3-4):

- `normalizeWorkerDeploy` (Phase 3, `server/config.test.js`): argv 아닌 cmd
  거부, timeout 기본값, detached boolean 강제, 비절대경로 키 스킵.
- `queue-store last_deploy` (Phase 3): normalizeQueue 레거시 폴백,
  recordLastDeploy 기록/덮어쓰기, atomic moveToDone+launched 결합.
- `pr-actions deploy 단계` (Phase 3): 정합화 순서 시퀀스(calls 로그), 동기
  성공/실패/타임아웃, `deploy_verify_missing`, 재검증 3케이스(브랜치 불일치·
  dirty·HEAD 드리프트) → `deploy_base_not_synced`, detached 발사 전 atomic 기록
  + 동기 spawn 실패 덮어쓰기, verify 실패 시 deploy 미도달, deploy 미설정 통과,
  실패 시 `cleanup_failed.step='deploy'`, 새 순서의 restoreResolved 조건.
- `decorateQueue` (Phase 3): `deploy_cmd`/`last_deploy` 노출.
- `exec-defaults-dialog 섹션` (Phase 4, `index.test.js`): 설정 있음/없음,
  detached·source 배지, last_deploy 배지, 편집 요소 부재.

제외: 실제 `bdui-shared restart` 실행(수동 런타임 검증으로 대체 — spawn은
`spawn_impl` mock), dolt/bd 실연동(기존 mock 패턴 유지).

## 실행 방식

- Phase 1-2: main 실행 (계약·스펙 semantic co-update — canonical+소비자 동시
  갱신 사유).
- Phase 3-4: opus 위임(worktree 격리), 단계 경계마다 컨트롤러 diff·검증 리뷰.
- Phase 5: main 실행 (머지·런타임 적용·사용자 파일).
- Bead: Phase당 실행 child 1개(`bd create --parent UI-3onr`,
  `plan_task_anchor="Phase <N>"`).
