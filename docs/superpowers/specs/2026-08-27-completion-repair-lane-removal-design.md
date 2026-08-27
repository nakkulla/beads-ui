---
scope:
  - server/worker/completion-intent.js
  - server/worker/completion-repair.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/attach.js
  - server/worker/bd-metadata.js
  - server/ws/worker-handlers.js
  - app/data/worker-queue-store.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/worker/repo-ops-timeline.js
  - app/views/worker/failure-labels.js
  - app/protocol.md
---

# post-merge 완료 자동 AI 수리 레인 제거 — 실패는 needs_human 종단, 로그 인계 (UI-8w4t)

## 배경

UI-s582는 검증/배포 RepoOperation의 AI 수리 경로를 걷어냈다. 그런데 머지 **뒤**
완료 흐름(`server/worker/completion-intent.js`)에는 별도의 자동 AI 수리 레인이 남아
있다: post-merge verify red·정리 실패·배포 실패가 나면 소유권 probe를 돌려
`pr_owned`면 같은 Bead에서 AI 세션을 띄우고(`resume_root`), `base_owned`면 수리
Bead를 자동 생성해 AI 세션을 디스패치한다(`create_repair`/`dispatch_repair` →
`waiting_repair_pr`). 사용자 원칙은 "AI가 개입하는 저장소 작업은 머지 충돌 해소
세션 하나"이며, UI-s582에서 `auto_repair` 토글이 사라지면서 이 레인의 게이트가
오히려 하나 줄었다.

배포/검증 실패는 대부분 결정적 원인(스크립트 오류, tracked-clean 불일치, 서비스
재시작, 테스트 red)이라 코드 변경이 필요하고, 그건 일반 Bead/PR 경로가 맞다.
사람이 세션을 띄웠을 때 바로 로그로 원인을 볼 수 있으면 충분하다.

## 목표

1. 자동 AI 수리 레인 전부 제거: `resume_root`, `create_repair`, `dispatch_repair`,
   소유권 probe, 수리 Bead 생성, 수리 세션 디스패치, 수리 예산/체인 상태.
2. post-merge 완료 실패는 원인을 기록한 `needs_human`으로 종단한다. 재진입은 사람의
   `[머지]` 재클릭, 설정 카드의 `배포 실행`, 또는 사람이 여는 Bead뿐이다.
3. 실패를 사람이 바로 볼 수 있게 남긴다: 카드에 `log_path` 노출, 종단 시 Bead에
   실패 comment 1건, 실패 로그 보존.
4. 새 버튼은 넣지 않는다(설계 논의에서 결정: 상한 초과 충돌·배포/검증 실패 모두 사람
   판단이 필요한 영역).

비목표: 충돌 해소 세션(`scheduler.resolveConflict`, `conflict_resolution` attempt,
`RESOLUTION_ROUND_CAP`), auto-review(`dispatch_auto_review`, head-review 경로와
`head_repair` attempt kind), completion-intent의 나머지 액션(gate/probe 제외
enter_cleanup/resume_intent/merge_subject/retry_cleanup/reconcile_op/
resume_metadata_check/retry_failed_op/pause/complete), script_retry, 수동 배포 실행은
바꾸지 않는다.

## 1. 커널 — `completion-intent.js`

- `decideCompletionAction`:
  - `verify_red` → 지금은 `probe`. 변경: `{ kind: 'needs_human', reason: 'verify_red' }`.
  - `pr_owned`/`base_owned`/`repair_created`/`cleanup_repairable`/`repair_pr_open`/
    `repair_pr_merged` fact state와 `probe`/`create_repair`/`dispatch_repair` action,
    phase `repairing`/`waiting_repair_pr` 분기 제거.
  - `cleanup_repairable`(정리 커서를 막은 RepoOperation 실패)은 지금 `null`(영원 대기)
    이다. 변경: `{ kind: 'needs_human', reason: failure.code }` — 실패 카드가 이미
    원인·재시도 결과를 보여주므로 대기할 근거가 없다.
- 실패→정책 표(`:86-109`)에서 `repair_*` 항목 제거; `COMPLETION_RETRY_POLICY`의
  `create_repair`/`dispatch_repair` 항목 제거. `REPAIR_SESSION_CAP`,
  `operationIdentity`의 `repair_round` 인자 제거.
- `createCompletionActionDriver`: `continueCreateRepair`, `startRepair`,
  `resolveAutoResolution`의 repair 특례 제거. `needs_human` 종단은 기존
  `terminal_reason` 기록(`reason`, `stage`, `failure_key`, `evidence`, `log_path`,
  `at`)을 그대로 쓰되 `log_path`를 반드시 채운다(§4).
- `CONFLICT_RESOLUTION_FAILURES`와 auto-review 분기는 변경 없음.

## 2. 삭제·정리 — 서버

- `server/worker/completion-repair.js` **전체 삭제**(수리 Bead 생성 `ensureLinkedBead`,
  `probeOwnership`, 호출자 없는 `ensureRepoRecoveryBead`) + 테스트.
- `scheduler.js`: `completionRepairPrompt`, `dispatchCompletionRepair`, `launch_kind:
  'completion_repair'` 경로 삭제. `resolveConflict`·`dispatchReviseFix`·head-review
  디스패치는 건드리지 않는다.
- `attach.js`: `createCompletionRepairService` 조립과 `completionRepair`/`scheduler.
  dispatchCompletionRepair` 주입 제거. `deployTargetJudge`(auto-advance-restore용,
  이름만 비슷)는 무관 — 유지.
- `queue-store.js`: `beginRepairOp`, `prepareCompletionOp`의 repair 용도,
  `recordCompletionRepairBead` 삭제. `CompletionPhase`에서 `repairing`/
  `waiting_repair_pr`, `CompletionSubject.role`의 `'repair'`, `CompletionOperation.kind`의
  `create_repair`/`dispatch_repair`와 `repair_bead_id`, `CompletionIntent`의
  `repair_sessions_used`/`repair_bead_ids`/`subject_stack`, `MAX_REPAIR_SESSIONS`,
  attempt의 `repair_operation_id`/`completion_mode` 제거. `head_repair` attempt kind는
  head-review 것이므로 유지.
- **로드 시 정규화**(UI-s582의 `repairing → failed` 전례와 같은 지점): 영속된
  completion intent의 phase가 `repairing`/`waiting_repair_pr`이면
  `terminal_reason = { reason: 'repair_lane_retired', stage: <이전 phase>,
  failure_key: <있으면>, evidence: null, log_path: <있으면>, at: <로드 시각> }`으로
  `needs_human` 종단 상태로 바꾸고 `repair_*`/`subject_stack` 키는 버린다. 수리 Bead가
  이미 만들어진 경우 그 Bead는 손대지 않는다(사람이 닫는다). 마이그레이션 파일 없음.
- `server/ws/worker-handlers.js` `completion_status` 투영: phase enum에서 두 값 제거,
  `current_repair`/`repair_session_cap`/`repair_sessions_used` 제거.

## 3. 클라이언트

- `app/data/worker-queue-store.js` typedef, `app/views/worker/index.js`의 `case
  'repairing'`/`'waiting_repair_pr'` 배지(`수정 PR #n 대기 중`/`머지 중`),
  `completion_repair_pr_url`/`_number` 계산, `code.startsWith('repair_')` 라벨 통과,
  `lanes.js`의 `repair_pr_el`(`.worker-mini__repair-pr`) 제거.
- `needs_human` 종단 카드 문구: 기존 `terminal_reason` 렌더에 `reason` 문장 +
  `stage`를 쓴다. 새 reason 문장을 `failure-labels.js`에 추가: `verify_red` →
  "머지 후 검증이 실패했습니다", `repair_lane_retired` → "자동 수리 레인이 은퇴해
  사람 처리로 넘어왔습니다".
- `app/protocol.md`: `completion_status` phase enum·필드 갱신, 수리 관련 문단 삭제.

## 4. 실패 인계 — 로그 경로·Bead comment·보존

- **카드 `log_path` 노출**: `repo-ops-timeline.js`의 operation 카드 `세부`와
  completion `needs_human` 카드에 `log_path` 절대 경로를 `<code>`로 렌더하고 복사
  버튼을 붙인다(기존 SHA 복사 패턴 재사용). 투영에 `log_path`는 이미 있다.
- **Bead comment 1건**: completion intent가 `needs_human`으로 종단되는 시점(드라이버의
  `settleFailure`/종단 기록 직후)에 `deps.bd.comment(root_bead_id, text)`
  (`bd-metadata.js` 기존 어댑터)로 다음 형식을 남긴다. 같은 `(op_id, failure_key)`에
  대해 한 번만 — `terminal_reason`에 `comment_at` 시각을 기록해 재시작·재진입 시
  중복을 막는다.

  ```
  ## 🤖 완료 실패 기록
  - 단계: verify | deploy | cleanup
  - 원인: <failure.code> — <failure-labels 문장>
  - 대상: <target_sha> (base <target_base>)
  - 로그: <log_path>
  - 재시도: <retryOutcomeText> | 없음
  - 다음: [머지] 재클릭 · 설정 카드 배포 실행 · 코드 수정은 새 Bead
  ```

  로그 본문은 복사하지 않는다(용량·비밀값). comment 실패는 경고 로그만 남기고 종단을
  막지 않는다(head-review-transport의 `bd.comment` 실패 처리와 같은 태도).
- **로그 보존**: 실패 operation의 `log_path`(`logDir(workspace)/<operation_id>.log`)는
  `snapshot-retention`/정리 sweep에서 **operation 기록이 dismiss되기 전까지** 지우지
  않는다. 현재 로그 삭제 경로가 없으면 이 항목은 "확인·테스트 고정"으로 끝난다.

## 5. 은퇴 문서 (파일 유지)

- `docs/superpowers/specs/2026-08-11-self-healing-auto-merge-completion-intent-design.md`
  §4.4~4.7(소유권 probe·PR/base 소유 수리·post-merge 수리) — 나머지 completion-intent
  설계는 유효.
- `2026-08-13-post-merge-completion-reentry-design.md`,
  `2026-08-18-repair-session-merge-fence-design.md`,
  `2026-08-19-moot-repair-failure-neutralization-design.md` — 전체 은퇴.
- `2026-08-11-completion-resume-lineage-recovery-design.md`,
  `2026-08-12-unified-completion-intent-saga-design.md` — repair 절만 은퇴.

## 구현 unit 후보
- `kernel-remove`: §1 + §2 completion-intent/completion-repair/scheduler
  (server/worker/completion-intent.js)
- `store-remove`: §2 queue-store·attach·worker-handlers 투영·로드 정규화
  (server/worker/queue-store.js)
- `ui-handoff`: §3 + §4 카드 log_path·Bead comment·문구
  (app/views/worker/index.js, server/worker/completion-intent.js comment 훅)

## 검증
- 삭제/갱신 테스트: `completion-intent.test.js`(repair 제목 ~20건 삭제, 충돌·auto-review
  케이스 유지), `completion-repair.test.js` 삭제, `scheduler.test.js` `completion repair
  dispatch` describe 삭제, `queue-store.test.js` repair 예산/기록 ~13건 삭제(RepoOperation
  `repairing→failed` 케이스는 UI-s582 것이므로 유지), `worker-handlers.completion-
  projection.test.js` phase 열거 갱신, `index.test.js`/`lanes.test.js` 수정 PR 배지 삭제.
- 신규 테스트: `verify_red`/`cleanup_repairable` → `needs_human`(reason·log_path 채움);
  로드 정규화 `repairing`/`waiting_repair_pr` → `repair_lane_retired` 종단; Bead comment
  1회성(같은 op_id·failure_key 재시도 시 재작성 안 함, comment 실패 시 종단 유지);
  카드 `log_path` 렌더·복사; 실패 로그가 dismiss 전 sweep에서 살아남음.
- 전체: `npx vitest run` green, `npm run tsc`, `npm run lint`, `npx prettier --check .`,
  `npm run build`. 번들 grep `completion_repair|waiting_repair_pr|repair_bead` 0건.

## 경계·후속

형제 유닛 없음(단일 레포·단일 Bead). 실행 중 발견 항목은 Finish admission으로만
들어온다.

- 관찰: 이미 만들어진 수리 Bead(`<root>-r<8hex>` 제목 "… 자동머지 실패 복구")가 rig에
  남아 있으면 사람이 닫는다 — 자동 sweep 대상 아님(소유권 불명).
