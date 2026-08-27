---
scope:
  - server/worker/completion-intent.js
  - server/worker/completion-repair.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/attach.js
  - server/worker/bd-metadata.js
  - server/worker/runner/preamble.js
  - server/worker/runner/claude.js
  - server/worker/runner/codex.js
  - server/ws/worker-handlers.js
  - server/ws/snapshot-retention.js
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
  `resolveAutoResolution`의 repair 특례 제거.
- **명시적 `needs_human`은 자동 정책을 우회한다.** 지금 `needs_human`도 `settleFailure`를
  거치고, 유지되는 `verify_cmd_failed: 'retry'` 정책이 phase를 `retrying`으로 되돌려
  자동 재시도될 수 있다. 변경: `decideCompletionAction`이 `needs_human`을 돌려주면
  드라이버는 정책 표를 보지 않고 바로 `terminal_reason`을 저장한다(`auto_resolution`
  없음). 원인은 `fact.evidence.failure_code ?? fact.evidence.reason ??
  fact.failure_key.reason` 순으로 읽는다 — cleanup 기록은 `failure.code`가 아니라
  `reason`/`failure_code`를 갖는다. `terminal_reason` 형식은 §4.
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
- **재시작 안전 은퇴 순서**(단계 정규화만으로는 부족: 수리 세션 프로세스는 서버
  재시작 뒤에도 살아 있고, attach는 시작 시 모든 `running` attempt를 다시 감시한다).
  로드 정규화는 다음 순서로, 필드를 버리기 **전에** 활성 세션을 정리한다:
  1. phase `repairing`/`waiting_repair_pr`인 intent마다 연결 필드(`active_op`,
     `repair_operation_id`, `completion_mode`, `repair_bead_ids`)로 활성 attempt를
     식별한다.
  2. 그 attempt가 `running`이면 기존 프로세스 제어 경로(`stopWorkerAttempt`와 같은
     정지 API)로 종료하고 attempt를 종단 상태(`failed`, reason
     `repair_lane_retired`)로 영속화한다. 살아 있는 PID가 없으면 종단만 기록.
  3. intent에 `terminal_reason = { reason: 'repair_lane_retired', stage: <이전
     phase>, failure_key: <있으면>, evidence: null, log_path: <있으면>, op_id:
     <있으면>, comment_at: null, at: <로드 시각> }`을 쓴다.
  4. 그 다음에야 `repair_*`/`subject_stack`/`completion_mode` 키를 버린다.
  수리 Bead가 이미 만들어진 경우 그 Bead는 손대지 않는다(사람이 닫는다).
  마이그레이션 파일 없음. 테스트: 살아 있는 PID를 가진 `repairing` intent로 재시작 →
  프로세스 종료·attempt 종단·terminal 기록·필드 제거 순서 확인.
- 세션 안내문·러너 어댑터: `server/worker/runner/preamble.js`의 `completion_repair`
  안내 블록, `runner/claude.js`·`runner/codex.js`의 `completion_repair`/
  `repair_operation_id` 전달을 제거한다(충돌 해소·head-review 전달은 유지).
  `server/ws/snapshot-retention.js`의 `repair_operation_id` 참조 제거.
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

- **`terminal_reason` 형식 확장**: `CompletionTerminal`에 `op_id: string|null`과
  `comment_at: number|null`을 추가하고 `normalizeCompletionTerminal`과
  `normalizeCompletionResumedTerminal` **양쪽**이 보존한다(지금은 정규화에서
  탈락). `op_id`는 verify/cleanup 증거의 operation ID를 fact → decide → settle까지
  전달해 채운다; 실행 전 실패라 operation이 없으면 `null`.
- **카드 `log_path` 노출**: `repo-ops-timeline.js`의 operation 카드 `세부`와
  completion `needs_human` 카드에 `log_path`가 **있을 때만** 절대 경로를 `<code>`로
  렌더하고 복사 버튼을 붙인다(기존 SHA 복사 패턴 재사용). 로그 파일은 RepoOperation이
  실제 시작될 때 생기므로 `repo_operations_unavailable`, 설정 해석 실패, candidate
  불일치, operation 생성 실패 같은 실행 전 cleanup 중단에는 경로가 없다 — 그 경우
  복사 제어를 생략하고 comment에는 `(없음)`을 쓴다.
- **Bead comment 1건**: `needs_human` 종단 저장과 **같은 원자적 쓰기**에서
  `terminal_reason.comment_at`을 먼저 기록하고, 그 뒤 best-effort로
  `deps.bd.comment(root_bead_id, text)`(`bd-metadata.js` 기존 어댑터)를 호출한다.
  중복 판정은 `(op_id, failure_key)`를 현재 `terminal_reason`과 `resumed_terminal`
  **둘 다**와 대조한다([머지] 재클릭 시 이전 terminal이 `resumed_terminal`로
  이동하기 때문). 재시작 사이에 comment 호출이 유실돼도 재작성하지 않는다(0건은
  카드가 보완, 중복은 금지). 형식:

  ```
  ## 🤖 완료 실패 기록
  - 단계: verify | deploy | cleanup
  - 원인: <failure.code> — <failure-labels 문장>
  - 대상: <target_sha> (base <target_base>)
  - 로그: <log_path> | (없음)
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
  projection.test.js` phase 열거 갱신, `index.test.js`/`lanes.test.js` 수정 PR 배지 삭제,
  `server/worker/runner/claude.test.js`·`codex.test.js`·`preamble` 테스트,
  `server/ws/snapshot-retention.test.js`, `server/e2e/worker-flow.test.js`,
  `server/ws.worker-queue.test.js`, `server/worker/merge-queue.test.js`의 repair 케이스.
- 신규 테스트: `verify_red`/`cleanup_repairable` → `needs_human`이 정책 표를 우회해 바로
  종단(재구동 후에도 `auto_resolution` 없이 `needs_human`); 원인 소스 우선순위
  (`failure_code`→`reason`→`failure_key.reason`); 실행 전 cleanup 실패(`log_path` 없음)
  → 카드 복사 제어 생략·comment `(없음)`; 로드 정규화 `repairing`/`waiting_repair_pr` →
  살아 있는 PID 종료·attempt 종단·`repair_lane_retired` 기록·필드 제거 순서; `op_id`·
  `comment_at`이 두 terminal 정규화를 통과; Bead comment 1회성(`terminal_reason`과
  `resumed_terminal` 대조, comment 실패 시 종단 유지); 카드 `log_path` 렌더·복사; 실패
  로그가 dismiss 전 sweep에서 살아남음.
- 은퇴 식별자 grep 게이트: `completion_repair|dispatchCompletionRepair|repair_bead|
  repair_sessions_used|subject_stack|waiting_repair_pr|repair_operation_id|
  completion_mode`가 `server/`·`app/` 소스·테스트에서 0건(의도된 legacy 로드 fixture
  제외, 목록을 테스트에 명시).
- 전체: `npx vitest run` green, `npm run tsc`, `npm run lint`, `npx prettier --check .`,
  `npm run build`. 번들 grep 동일 식별자 0건.

## 경계·후속

형제 유닛 없음(단일 레포·단일 Bead). 실행 중 발견 항목은 Finish admission으로만
들어온다.

- 관찰: 이미 만들어진 수리 Bead(`<root>-r<8hex>` 제목 "… 자동머지 실패 복구")가 rig에
  남아 있으면 사람이 닫는다 — 자동 sweep 대상 아님(소유권 불명).
