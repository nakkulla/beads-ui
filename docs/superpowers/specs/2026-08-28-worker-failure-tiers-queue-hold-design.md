---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/attempt-failure.js
  - server/worker/failure-class.js
  - server/worker/queue-hold.js
  - server/worker/auto-advance-restore.js
  - server/worker/verify.js
  - server/worker/quickfix-landing.js
  - server/worker/guard-hook.js
  - server/worker/completion-intent.js
  - server/worker/attach.js
  - server/worker/runner/claude.js
  - server/worker/runner/codex.js
  - server/worker/runner/command-guard.js
  - server/ws/worker-handlers.js
  - app/protocol.js
  - app/views/worker/
  - app/utils/failure-sentences.js
---

정정(2026-09-03, UI-gjp2)

# Worker 실패 2계층·큐 보류/정지·세션 파킹 결말 설계

Bead: UI-5ym8 · route: spec_backed · 2026-08-28 · rev 2 (spec review REVISE 9건 반영)

## 1. 문제

Worker는 어떤 attempt든 `failed`로 끝나면 `auto_advance=false`로 새 디스패치를
멈춘다(`scheduler.js failAttempt` → `queue-store.js haltAutoAdvanceForAttempt`).
실제 큐 기록(2026-07~08, 전 워크스페이스)을 전수 집계하면 정지 원인의 대부분은
큐를 세울 이유가 없는 것이었다.

| cause | 건수 | 실체 |
|---|---|---|
| `verify_failed:pr_missing` | 17 | 세션이 REVISE 처리 대기 또는 codex 환경 장애로 Bead를 파킹하고 **정상 종료**(exit 0). Worker가 "`resolved`+`pr_url`" 외의 결말을 전부 실패로 분류 |
| `loud_fail_blocker` | 16 | guard kill. 그중 base_merge·base push 7건은 이후 warn으로 완화됨, `permission_denials` 1건은 규칙 제거됨 |
| `session_failed:is_error` | 6 | `API Error: 529 Overloaded` 등 API 장애. `cause_detail`이 null이라 타일에서 원인을 읽을 수 없음 |
| `quickfix_landing_failed:*` | 5 | `not_resolved` 2 · `premature_close` · `head_mismatch` · `remote_history_not_monotonic` |
| `base_landing_detected` | 4 | 2026-08-03 하루, bead 2개 |
| `session_failed:subtype` | 2 | claude `result.subtype≠success` |

completion-intent의 `needs_human` reason 토큰은 25종인데 실제 발생 0건이고, ~10종은
durable write 실패, 2종은 마이그레이션 잔재다.

## 2. 결정 요약 (사용자 결정 2026-08-28)

1. 실패를 **`parked` / `individual` / `systemic`** 세 계층으로 나눈다. 큐 정지는
   `systemic`에만 연결한다. 개별 실패는 bead만 실패시키고 큐는 계속 간다.
2. 세션이 사용자 결정을 기다리며(`awaiting_user` 기록) 정상 종료한 결말은 실패가
   아니라 `parked`다. 자동 재디스패치는 하지 않는다(Q1=A).
3. 환경성 실패는 첫 발생부터 새 디스패치를 **보류**(사람 개입 없음)하고, 재시도
   성공 시 자동 해제, 3회 소진 또는 다른 bead에서 같은 원인 재발 시 **체계적
   정지**로 승격한다. 체계적 정지 해제는 사용자 `재개`다(Q2=A).
4. `session_failed:*`는 유지하되 세션의 마지막 오류 문장을 `cause_detail.summary`로
   끌어올려 타일에 싣는다.
5. quick_fix 착지의 `not_resolved`는 폐기한다. attempt hook의 push 기록과
   `impl_review` 영수증이 push head에 결속돼 있으면 Worker가 `resolved`를 대신 쓰고
   착지를 잇는다. 증거가 모자라면 `delivery_unproven:<빠진 증거>`다.
6. completion-intent `needs_human` 토큰을 5종으로 접는다.
7. 이미 warn 전용인 텍스트 guard(`base_merge`, `git push main`)와 pre-push hook,
   hook 우회·`gh pr merge` kill은 그대로 둔다. 세션 쪽 규칙 강화는 dotfiles
   Bead(§9)로 넘긴다.

## 3. 분류

두 순수 모듈이 나눠 갖는다.

- `server/worker/failure-class.js` — **attempt 하나의 분류**. 입력
  `{cause, cause_detail, verdict:{success, reason, summary}, bead_status, pr_url, awaiting_user}`,
  출력 `{tier:'parked'|'individual'|'env'|'systemic', retry:{max:3, delays_ms:[120000,300000,900000]}|null, cause, summary}`.
  bead ID·시각·큐 상태는 받지 않는다.
- `server/worker/queue-hold.js` — **큐 전이 reducer**. 입력
  `{hold, lineages, event:{kind, bead_id, attempt_id, cause, at, ...}, now}`, 출력
  새 `{hold, lineages}`. 반복 승격·해제·소진 판정은 전부 여기서 한다(§4).

### 3.1 `parked`

판정(네 조건 전부): verdict `success` ∧ `bead_status ∉ {resolved, closed}` ∧
`pr_url` 없음 ∧ **`awaiting_user` 키 존재**. 지금의 `verify_failed:pr_missing` 판정은
이 규칙과 §3.2·§3.3의 두 규칙으로 대체된다.

- attempt `status='parked'`, `cause='session_parked'`,
  `cause_detail={summary, awaiting_user, bead_status}`, 그리고 park 시점 사실
  `awaiting_user_present=true`를 attempt에 영속한다.
- 큐는 계속 간다. 자동 재디스패치 없음.
- 재개 경로 둘: 타일 `재시도`(ws `worker-parked-retry`), 또는 bd 변경 구독
  (`attach.js`가 completion-intent `onIssuesChanged`에 이미 연결한 구독)에서 그
  bead의 `awaiting_user`가 **있던 것이 없어진 전이**(`awaiting_user_present=true`
  → 현재 readback 부재)를 관측한 경우. 처음부터 키가 없던 bead는 이 규칙으로
  재디스패치되지 않고(§3.2로 분류됨), 같은 전이는 attempt당 한 번만 발화한다
  (`parked_resumed_at` 기록 후 무시). 두 경로 모두 새 attempt로 디스패치하고
  `parked` 레코드는 보존한다.

### 3.2 `individual`

bead만 `failed`. `auto_advance`와 `queue.hold`를 건드리지 않는다.

| 즉시 실패 | 비고 |
|---|---|
| `session_ended_unresolved` | verdict `success` ∧ status ∉ {resolved, closed} ∧ `pr_url` 없음 ∧ `awaiting_user` 없음 ∧ summary가 §3.3 환경 패턴에 **불일치**. `cause_detail.summary`는 세션 마지막 보고 첫 줄 |
| `session_failed:is_error` (환경 패턴 불일치) | 세션의 오류 문장이 bead 고유 오류(예: 테스트 실패 보고, 권한 거부)인 경우 |
| `session_failed:subtype`, `session_failed:no_result`, `session_failed:turn_failed` | 세션이 비정상 종료 |
| `quickfix_landing_failed:*` (`premature_close`, `head_mismatch`, `push_not_contained`, `invalid_impl_review`, `delivery_unproven:*`, …) | 2026-08-19 quick_fix 레인 spec의 판정 유지(미리뷰 코드 착지 방지). `not_resolved`만 §5로 대체 |
| `workflow_mode_record_failed`, `workflow_mode_revert_failed`, `disposition_failed:*` | 그 bead의 bd 기록 문제 |
| `verify_failed:bd_not_resolved`, `verify_failed:bd_record_failed` | 그 bead의 bd 기록 문제 |
| `loud_fail_blocker` (`bd_close_blocked`) | dotfiles-01no §2.5가 위임한 Codex 측 강제: `command-guard.js`가 Worker 세션의 `bd close`/`bd update --status closed`(`sh -c`·`$(…)`·`xargs` wrapper 포함)를 kill 판정(효과 `kill`, 새 `MergeViolationKind` `bd_close`). Claude 세션은 hook deny가 먼저라 도달하지 않음 |

### 3.3 `env` (환경성 — backoff 재시도 + 큐 보류)

| cause | 환경 판정 |
|---|---|
| `session_failed:is_error` | summary가 **환경 패턴**에 일치할 때만: `/API Error: 5\d\d|Overloaded|overloaded_error|rate.?limit|429|ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|fetch failed/i`. 패턴 목록은 `failure-class.js`의 상수 `ENV_ERROR_PATTERNS`가 소유한다 |
| `session_ended_unresolved` | 위와 같은 패턴이 summary에 있을 때(예: 세션이 "codex CLI를 찾을 수 없음"으로 끝난 경우는 `/command not found|ENOENT|spawn .* ENOENT|login status|not authenticated/i` 추가 패턴) |
| `verify_failed:gh_observation_failed`, `verify_failed:bd_read_failed` | 항상 |
| `verify_cmd_spawn_error` | 항상 |
| 러너 spawn 실패(`spawn_failed`, `codex_home_prepare_failed`) | 항상 |

- 첫 발생: 그 attempt는 `status='retry_wait'`, `retry={cause, attempts:1, max:3, next_at, origin_attempt_id}`.
  reducer가 `lineages`에 `{bead_id, origin_attempt_id, cause, next_at}`를 추가하고
  `hold.kind='env'`를 켠다. hold 중 `runPass`는 새 디스패치를 하지 않는다(UI-jaua
  §5.2의 armed 행 예외는 그대로). 진행 중 세션·머지 큐·PR 폴링·§3.3 재시도 자체는
  계속 간다.
- `next_at` 도달 시 같은 bead의 새 attempt로 재시도(`retry.origin_attempt_id` 계승,
  `attempts+1`). 성공하면 그 lineage만 제거. **모든 lineage가 비면** `hold=null`.
  서로 다른 원인의 lineage 둘이 동시에 있으면 한쪽 성공은 다른 쪽을 풀지 않는다.
- 승격 조건(둘 중 하나): 어떤 lineage가 3회 소진 / hold 중 **다른** bead의 attempt가
  같은 `cause`(콜론 앞 두 세그먼트, `session_failed:is_error`는 패턴 그룹명으로 비교)로
  실패. 승격하면 소진된 attempt는 `failed`, 나머지 lineage는 보존한 채
  `hold={kind:'systemic', cause, since, bead_ids, halted_by_attempt_id}`.
- 30분 규칙: hold가 없을 때 서로 다른 bead 2개가 30분 안에 같은 환경성 cause로
  실패하면(첫 실패가 hold를 켜기 전에 동시에 끝난 경우) 바로 systemic. reducer는
  `lineages`와 최근 30분의 env 실패 이력(`hold_history`, 큐에 durable)을 본다.

### 3.4 `systemic` (즉시 정지)

| cause | 이유 |
|---|---|
| `base_landing_detected` | base가 실제로 움직임(비가역). 예방층이 뚫린 증거 |
| `loud_fail_blocker` (`hook_bypass_blocked`, `merge_to_base_blocked`의 `gh pr merge`) | 예방층 우회 시도 |
| gh 미인증·bd 접속 불가가 프로브로 확정(`gh_unavailable`, `bd_unreachable`) | 모든 bead가 같은 벽 |
| completion `verify_red`, `cleanup_failed:*` | 머지 후 공유 서버 배포 파이프라인 실패 |

`hold={kind:'systemic', …}`를 켠다. 해제는 사용자 `재개`(ws `worker-queue-hold-resume`)
만이다. 재개 시 `hold=null`·`lineages=[]`이고, `hold.bead_ids`와 lineage에 있던 bead 중
`retry_wait`/`failed`(미 dismiss)인 것은 새 attempt로 재디스패치한다.

## 4. 큐 정지 상태 모델

- `queue.hold: null | {kind:'env'|'systemic', cause, since, bead_ids, halted_by_attempt_id?}`,
  `queue.lineages: Array<{bead_id, origin_attempt_id, cause, next_at, attempts}>`,
  `queue.hold_history: Array<{bead_id, cause, at}>`(최근 30분만 유지) — 신규 durable
  필드. 실패가 켜는 유일한 정지는 `hold`다.
- `queue.auto_advance`는 **사용자 ⏸/▶ 전용**으로 돌아간다. 실패 경로는 더는
  `setAutoAdvance(false)`를 호출하지 않는다.
- 호환: 기존 `queue.json`의 `halted_auto_advance:true` 레코드와
  `settleMootRepairFailures`·`auto-advance-restore.js`의 복원 경로는 그대로 두되,
  **`createUnhandledFailurePredicate`의 "미해소 실패" 판정을 `halted_auto_advance:true`인
  레코드로 한정**한다. 새 규칙의 `individual` 실패는 이 predicate에 들어가지 않으므로
  과거 halt의 dismiss·배포 재시작 복원을 막지 않는다. 새 실패는
  `halted_auto_advance`를 쓰지 않는다.
- `runPass` 진입 판정: `hold !== null` → armed 행만(기존 `armed_only` 분기 재사용).
  `auto_advance !== true` → 기존과 같음. 둘은 독립이다.
- ws 메시지(`app/protocol.js` `MessageType`에 추가, `server/ws/worker-handlers.js`가
  처리, `attach.js`가 runtime에 배선):
  - `worker-queue-hold-resume {workspace, since}` — `hold.since === since`일 때만
    (CAS) 해제·재디스패치. 불일치는 no-op 응답 `{ok:false, reason:'hold_changed'}`.
  - `worker-queue-hold-retry-now {workspace, since}` — env hold의 모든 lineage
    `next_at=now`. CAS 동일.
  - `worker-parked-retry {workspace, bead_id, attempt_id}` — `parked` attempt가
    현재 그 bead의 마지막 attempt일 때만 새 attempt 디스패치; 아니면
    `{ok:false, reason:'not_latest'}`.
  각 응답 뒤 `worker-queue-snapshot` fanout으로 readback.

## 5. quick_fix 착지: 증거 우선

전제 정정: 현재 quick_fix 레인은 pre-push hook을 **설치하지 않는다**(`scheduler.js`
dispatch의 `!quickfix_lane && !installGuardHook(...)`; 일반 hook은 base push를 거부해
레인의 종점 임무를 막기 때문). 따라서 push 기록이 없다.

1. `guard-hook.js`에 **기록 전용 모드** `install({..., mode:'record'})`를 추가한다.
   같은 스크립트 골격에서 base 판정 분기만 "거부" 대신 "기록 후 통과"로 렌더한다.
   hook 우회 kill(`command-guard.js`)과 hook 위치·파일 모드·`readPushLog`는 그대로.
   quick_fix dispatch는 이 모드로 설치하고, 일반 레인은 기존 모드 그대로다.
2. `quickfix-landing.js`의 `not_resolved` 두 분기(`:348`, `:380`)를 다음으로 바꾼다.
   세션 verdict success이고 bead status가 `resolved`가 아닐 때, `readPushLog`로 이
   attempt가 base로 push한 ref·SHA를 읽는다.
3. push 기록의 SHA와 `impl_review` 영수증 SHA가 같고 영수증이 유효하면
   (`<reviewer>@<40hex>` 또는 dotfiles-01no 이후 `skipped@<40hex>`; 어느 쪽이든
   SHA == push head) Worker가 `bd update --status resolved`를 쓰고 readback한 뒤 기존
   착지 순서를 잇는다. attempt에 `landing.resolved_by='worker:evidence'`.
4. push 기록이 없거나(`push_log_absent`), SHA가 다르거나(`impl_review_sha_mismatch`),
   영수증이 없으면(`impl_review_missing`) `quickfix_landing_failed:delivery_unproven:<토큰>`
   (individual). 기록만 하는 hook이므로 `head_mismatch`가 지키는 "미리뷰 커밋 착지
   금지"는 약해지지 않는다 — 영수증 SHA ≠ push SHA는 여전히 실패다.

`premature_close`·`head_mismatch`·`push_not_contained`·`invalid_impl_review`는
2026-08-19 spec 판정 그대로다(individual, 큐 계속).

## 6. attempt 기록 필드

- `status`에 `parked`, `retry_wait`, `superseded` 추가. (`retry_pending`은 dotfiles
  계약이 repo-operation 사다리 상태로 이미 쓰는 이름이라 피한다.)
- `retry: {cause, attempts, max, next_at, origin_attempt_id}` — 재시도는 같은 bead의
  새 attempt이고 `origin_attempt_id`로 첫 attempt를 가리킨다. 소진 시 마지막
  attempt만 `failed`이고 앞선 것들은 `retry_wait`→`superseded`로 정리한다.
- `awaiting_user_present`, `parked_resumed_at` (§3.1).
- `cause_detail`:
  - `session_failed:*`·`session_ended_unresolved` → `{summary, subtype, is_error, env_pattern}`.
    `summary` 추출 규칙(200자, 첫 비어있지 않은 줄): **claude** — 마지막 `result`
    이벤트의 `result` 텍스트, `is_error`면 그 오류 문장; **codex** — 우선순위
    `turn.failed`의 `error.message` → 마지막 `agent_message` 텍스트 → 없으면 리터럴
    `no_result`. `runner/claude.js`·`codex.js`의 verdict가 `summary`를 함께 돌려준다.
  - `session_parked` → `{summary, awaiting_user, bead_status}`.
  - 환경성 → 기존 `{reason, detail}` 유지 + `summary`.

## 7. completion-intent `needs_human` 5종

`COMPLETION_FAILURE_POLICY`와 kernel의 reason 생성을 다음 5종으로 접는다.

| 토큰 | 흡수하는 기존 토큰 | hold |
|---|---|---|
| `verify_red` | 그대로 | systemic |
| `cleanup_failed:<원인>` | `completionFailureReason(fact)` 결과, `cleanup_replay_unavailable`, `cleanup_journal_conflict`, `cleanup_completion_unrecorded` | systemic |
| `retry_exhausted:<원인>` | 그대로 | 없음 |
| `conflict_unresolved:<세부>` | `resolution_*` 7종, `resolution_round_cap` | 없음 |
| `internal_record_failed:<세부>` | `*_prerecord_failed`, `*_settlement_record_failed`, `root_cleanup_*`, `merge_subject_pin_failed`, `reconciliation_ambiguous`, `auto_resolution_invalid`, `intent_state_invalid`, `ownership_undecidable` | 없음 |

폐기: `auto_review_retired`, `repair_lane_retired`(마이그레이션 잔재 — 로드 시
`internal_record_failed:migration:<원토큰>`으로 읽음), `completion_needs_human`(도달
불가 fallback 제거). `queue-store.js`의 `needs_human ⇔ terminal_reason` 불변식은
유지한다. `failure-sentences.js`에 5종 문장을 등록한다.

## 8. 표면(UI)

- 큐 상단 정지 표시 두 종류. **환경 보류**: 회색, "환경 보류: <원인 문장> —
  재시도 대기 · 다음 HH:MM(가장 이른 lineage)", 버튼 `지금 재시도`. **체계적
  정지**: 경고색, "<원인 문장> — bead X, Y", 버튼 `재개`. 사용자 ⏸ 표시는 지금
  그대로. 두 버튼은 §4의 CAS 메시지를 보낸다.
- `parked` 타일: 뱃지 `세션 대기`, 본문에 `cause_detail.summary`, 버튼
  `재시도`·`폐기`.
- `failed` 타일(UI-rj02 결정 표면 유지): 원인 뱃지 + 팝오버에
  `cause_detail.summary`, 재시도 이력("자동 재시도 3회 — 같은 오류"), 로그 경로.
- `재시도/폐기`(dismiss)는 auto_advance 복원 역할을 잃고 타일 정리 역할만 남는다.
- `needs_human` 5종은 `확인 필요` 뱃지 + 문장, 출구는 지금처럼 `[머지]`.
- 카드 줄 순서·슬롯은 `2026-08-25-card-header-grammar-unify-design.md` §2·§5.1을
  따른다(새 뱃지 `세션 대기`는 판정 칩 슬롯).

## 9. 경계·후속

어휘 소유권: 이 spec의 attempt status·`queue.hold`·cause 토큰·`needs_human` 토큰은
**beads-ui 내부 큐 상태**(`queue.json`)이며 Bead 메타데이터·라벨이 아니다. dotfiles
계약(`workflow-state.yaml`)은 이 중 어느 것도 정의하지 않는다(확인: 2026-08-28
grep, 유일한 접점은 repo-operation 사다리의 `retry_pending`뿐이라 §6에서 이름을
피했다). 계약이 소유하는 것은 `awaiting_user`(존재 여부만 읽음, 이미 계약 항목)와
`impl_review` 형식뿐이므로 이 Bead는 dotfiles에 **선행 의존이 없다**. 단 §5.3의
`skipped@` 인정은 dotfiles-01no가 닫힌 뒤에만 켜지는 분기로 구현한다(닫히기 전엔
`<reviewer>@` 형식만).

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|
| 형제 | beads-ui | user_request | 로그 구조(bead별 `events.jsonl` 타임라인·실패 요약 추출·세션 로그 보존 정책)는 별개 표면·별개 검증 묶음이며 이 Bead의 분류 규칙과 독립적으로 착지 가능 | 없음 | UI-8wpb |
| 형제 | dotfiles | user_request | 계약 변경: quick_fix `skip` 예외 제거·plan `self` 허용·REVISE는 파킹 사유 아님·impl 자동 리뷰 dispatch(UI-d7fy 결정 3 supersede)·세션의 `bd close` 차단·완료 보고 첫 줄 규칙. 다른 저장소 소유 | 없음 | dotfiles-01no |
| 형제 | beads-ui | user_request | 머지 큐의 `impl_review` 보류 시 리뷰 lineage 자동 1회 dispatch 구현 — 계약(dotfiles-01no)이 먼저 닫혀야 착지. spec은 선행 closed 후 작성 | dotfiles-01no | UI-qksl |

- 관찰: hook 우회 kill 오탐 후보 2건(`git config --get core.hooksPath`,
  `git -c core.hooksPath=.git/hooks status`)이 현재 규칙(UI-1xcd 읽기 allowlist)에서도
  잡히는지 — 이 Bead 구현 중 재현 확인만 하고, 잡히면 command-guard 규칙 정정 Bead를
  beads-ui에 별도 제기한다(guard 규칙 변경은 이 Bead 범위 밖).

## 10. 구현 unit 후보

1. `failure-class` — `failure-class.js`(분류·환경 패턴) + `queue-hold.js`(reducer).
2. `queue-hold-wiring` — `queue-store.js` 필드·`attempt-failure.js` predicate 한정·
   `scheduler.js`(`failAttempt`→분류, `runPass`, 재시도 디스패치)·`worker-handlers.js`
   3 메시지·`protocol.js`·`attach.js` 배선.
3. `session-outcome` — `runner/claude.js`·`codex.js` verdict summary, `verify.js`
   `pr_missing` 대체(§3.1·§3.2·§3.3), `guard-hook.js` record 모드 + `quickfix-landing.js` §5.
4. `completion-policy` — `completion-intent.js` 5종 + `failure-sentences.js`.
5. `worker-ui` — `app/views/worker/` 정지 표시·parked 타일·팝오버, 번들.

## 11. 테스트 범위

- `failure-class.test.js`: cause→tier/retry 표 전수; `is_error` 환경 패턴 일치/불일치
  반대 사례(`API Error: 529 Overloaded` → env, `permission denied` → individual);
  parked 네 조건 각각 미충족 시 non-parked(특히 `awaiting_user` 부재 →
  `session_ended_unresolved`); codex summary 우선순위(`turn.failed` → agent_message →
  `no_result`).
- `queue-hold.test.js`: 첫 env 실패가 hold.env / lineage 성공이 그 lineage만 제거 /
  서로 다른 원인 lineage 둘 중 하나 성공 시 hold 유지 / 3회 소진 승격 / 타 bead 같은
  원인 승격 / 30분 규칙 경계값 29분·31분 / `재개`가 lineage·bead_ids 재디스패치 목록
  산출.
- `scheduler` 테스트: 개별 실패가 `auto_advance`를 건드리지 않음 / hold 중 `runPass`
  무디스패치(armed 예외 유지) / hold와 `auto_advance`가 독립 / parked 자동 재개는
  `awaiting_user_present=true`→부재 전이에서만 1회(처음부터 부재·반복 알림·실제 소거
  세 사례).
- `attempt-failure.test.js`: individual 실패가 있어도 과거 `halted_auto_advance` dismiss와
  `auto-advance-restore` 복원이 통과(회귀).
- ws 핸들러: 3 메시지의 CAS 불일치 no-op, 중복 클릭 멱등, 응답 후 snapshot fanout.
- `guard-hook.test.js`: record 모드가 base push를 통과시키고 ref/SHA를 기록; 일반 모드
  거부 유지; `quickfix-landing` 통합 테스트에서 실제 dispatch가 push log를 남김.
- `quickfix-landing` 테스트: push 기록+영수증 일치 → Worker resolved 기록·진행 /
  `push_log_absent`·`impl_review_sha_mismatch`·`impl_review_missing` → `delivery_unproven:*`
  / `skipped@` 분기는 dotfiles-01no 플래그 전후.
- `completion-intent` 테스트: 정책표 5종 매핑, `verify_red`·`cleanup_failed`가
  `hold.systemic` 발화, 마이그레이션 토큰 읽기.
- 프런트: 정지 표시 2종·parked 타일·팝오버 summary 렌더 스냅샷.
- 회귀: `moot-repair`·`auto-advance-restore`·`repair-lane-retirement` 기존 테스트
  통과 유지(호환 경로).

## 12. 결정 (ADR 후보)

- **실패의 큐 정지 권한은 `systemic` 계층만 갖는다; 개별 실패는 bead에 머문다.**
  되돌리기 어려움: 있음 — 정지 의미가 `queue.hold` durable 필드·복원 경로·타일
  UI·운영 습관("타일이 있으면 큐가 멈춘 것")에 박혀 되돌리면 저장 형식과 화면을
  둘 다 다시 바꿔야 한다 / 맥락 없이 놀라움: 있음 — 실패 타일이 떠 있는데 큐가
  계속 도는 것은 지금 관성과 반대라 통계(§1)를 모르면 "정지가 고장났다"로 읽힌다 /
  실제 trade-off: 있음 — 장애 중 세션 낭비(보류 없이 계속 디스패치) vs 사람 호출
  빈도(모든 실패에 정지). **세 조건 충족.** summary: "Worker 큐 정지는 다음 bead에도
  재발할 체계적 실패에만 걸고, 개별 실패는 bead 단위로 기록하고 큐를 계속 돌린다.
  환경성 실패는 보류→재시도→승격의 사다리를 탄다."
- **`awaiting_user`를 남기고 정상 종료한 세션 결말은 `parked`이며 자동 재디스패치하지
  않는다.** 되돌리기 어려움: 있음 — 자동 재시도를 붙이면 `awaiting_user`의 계약
  의미("사용자 결정 대기")가 Worker 쪽에서 깨지고, 파킹 attempt의 `parked` status와
  전이 기록이 재해석돼야 한다 / 맥락 없이 놀라움: 있음 — "성공으로 끝났는데 PR도
  없고 실패도 아님"은 UI-7tme 같은 사례를 모르면 버그로 보인다 / 실제 trade-off:
  있음 — 환경 회복 시 자동 재개 편의 vs 5분짜리 빈 세션 반복(UI-7tme 3회). **세
  조건 충족.** summary: "성공 종료 + 미resolved + PR 없음 + `awaiting_user`는
  `parked`다. 재개는 사용자 클릭 또는 `awaiting_user` 소거 전이 관측뿐이다."
- **착지 판정은 세션 자기보고보다 hook push 기록·영수증 증거를 우선한다.**
  되돌리기 어려움: 없음 — 판정 함수 교체와 record 모드 제거로 복귀 / 놀라움: 있음
  — Worker가 `resolved`를 대신 쓴다 / trade-off: 있음 — 세션 프로토콜 이탈 허용
  범위 vs 착지 실패 빈도. 두 조건만 충족 → 후보 아님, spec 기록으로 충분.
