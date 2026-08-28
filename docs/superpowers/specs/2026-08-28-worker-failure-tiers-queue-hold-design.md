---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/attempt-failure.js
  - server/worker/failure-class.js
  - server/worker/verify.js
  - server/worker/quickfix-landing.js
  - server/worker/completion-intent.js
  - server/worker/runner/claude.js
  - server/worker/runner/codex.js
  - app/views/worker/
  - app/utils/failure-sentences.js
---

# Worker 실패 2계층·큐 보류/정지·세션 파킹 결말 설계

Bead: UI-5ym8 · route: spec_backed · 2026-08-28

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
2. 세션이 스스로 파킹하고 정상 종료한 결말은 실패가 아니라 `parked`다. 자동
   재디스패치는 하지 않는다(Q1=A).
3. 환경성 실패는 첫 발생부터 새 디스패치를 **보류**(사람 개입 없음)하고, 재시도
   성공 시 자동 해제, 3회 소진 또는 다른 bead에서 같은 원인 재발 시 **체계적
   정지**로 승격한다. 체계적 정지 해제는 사용자 `재개`다(Q2=A).
4. `session_failed:*`는 유지하되 마지막 `result` 이벤트의 오류 문장을
   `cause_detail.summary`로 끌어올려 타일에 싣는다.
5. quick_fix 착지의 `not_resolved`는 폐기한다. hook push 기록과 `impl_review`
   영수증이 push head 결속으로 검증되면 Worker가 `resolved`를 대신 쓰고 착지를
   잇는다. 증거가 모자라면 `delivery_unproven:<빠진 증거>`다.
6. completion-intent `needs_human` 토큰을 5종으로 접는다.
7. 이미 warn 전용인 텍스트 guard(`base_merge`, `git push main`)와 pre-push hook,
   hook 우회·`gh pr merge` kill은 그대로 둔다. 세션 쪽 규칙 강화는 dotfiles
   Bead(§9)로 넘긴다.

## 3. 분류표

`server/worker/failure-class.js`(신규, 순수 함수)가 소유한다. 입력은
`{cause, cause_detail, session_exit, bead_status, pr_url}`; 출력은
`{tier, retry}`.

### 3.1 `parked`

판정: 세션 exit 성공(runner verdict `success`) ∧ `bead_status ∉ {resolved, closed}`
∧ `pr_url` 없음. 지금의 `verify_failed:pr_missing`이 이 판정으로 대체된다.

- attempt `status='parked'`, `cause='session_parked'`,
  `cause_detail={summary, awaiting_user, bead_status}`.
  `summary`는 마지막 `result` 텍스트의 첫 줄 200자.
- 큐는 계속 간다. 자동 재디스패치 없음.
- 재개 경로 둘: 타일 `재시도` 클릭, 또는 bd 변경 구독에서 그 bead의
  `awaiting_user`가 지워진 것을 관측(completion-intent `metadata_watch`와 같은
  `onIssuesChanged` 구독). 두 경로 모두 새 attempt로 디스패치하고 `parked` 레코드는
  보존한다.

### 3.2 `individual`

bead만 `failed`. `auto_advance`와 `queue.hold`를 건드리지 않는다.

| 즉시 실패 | 비고 |
|---|---|
| `session_failed:subtype`, `session_failed:no_result`, `session_failed:turn_failed` | 세션이 비정상 종료. `cause_detail.summary`에 마지막 result/오류 문장 |
| `quickfix_landing_failed:*` (`premature_close`, `head_mismatch`, `push_not_contained`, `invalid_impl_review`, `delivery_unproven:*`, …) | 2026-08-19 quick_fix 레인 spec의 판정 유지(미리뷰 코드 착지 방지). `not_resolved`만 §5로 대체 |
| `workflow_mode_record_failed`, `workflow_mode_revert_failed`, `disposition_failed:*` | 그 bead의 bd 기록 문제 |
| `verify_failed:bd_not_resolved`, `verify_failed:bd_record_failed` | 그 bead의 bd 기록 문제 |

### 3.3 환경성(`individual` + backoff + 큐 보류)

| cause | 재시도 |
|---|---|
| `session_failed:is_error` | 3회, 지연 2·5·15분 |
| `verify_failed:gh_observation_failed`, `verify_failed:bd_read_failed` | 3회, 지연 2·5·15분 |
| `verify_cmd_spawn_error` | 3회, 지연 2·5·15분 |
| 러너 spawn 실패(`spawn_failed`, `codex_home_prepare_failed`) | 3회, 지연 2·5·15분 |

- 첫 발생: 그 attempt는 `failed`가 아니라 `retry_pending`(§6 attempt 필드)으로
  기록되고, `queue.hold={kind:'env', cause, since, bead_ids:[…], next_at}`가 켜진다.
  hold 중 `runPass`는 새 디스패치를 하지 않는다(UI-jaua §5.2의 armed 행 예외는
  그대로). 진행 중 세션·머지 큐·PR 폴링은 계속 간다.
- `next_at` 도달 시 같은 bead의 새 attempt로 재시도. 성공(세션 verdict success
  또는 관측 성공)하면 `hold=null`.
- 승격 조건(둘 중 하나): 3회 소진 / hold 중 **다른** bead의 attempt가 같은
  `cause`(콜론 앞 두 세그먼트 기준)로 실패. 승격하면 소진된 attempt는 `failed`,
  `hold={kind:'systemic', cause, since, bead_ids, halted_by_attempt_id}`.
- 30분 규칙: hold가 없는 상태에서 서로 다른 bead 2개가 30분 안에 같은 환경성
  cause로 실패하면(첫 실패가 hold를 켜기 전에 동시에 끝난 경우) 바로 systemic.

### 3.4 `systemic` (즉시 정지)

| cause | 이유 |
|---|---|
| `base_landing_detected` | base가 실제로 움직임(비가역). 예방층이 뚫린 증거 |
| `loud_fail_blocker` (`hook_bypass_blocked`, `merge_to_base_blocked`의 `gh pr merge`) | 예방층 우회 시도 |
| gh 미인증·bd 접속 불가가 프로브로 확정(`gh_unavailable`, `bd_unreachable`) | 모든 bead가 같은 벽 |
| completion `verify_red`, `cleanup_failed:*` | 머지 후 공유 서버 배포 파이프라인 실패 |

`hold={kind:'systemic', …}`를 켠다. 해제는 사용자 `재개`만이다. 재개 시
`hold=null`이고, `hold.bead_ids`에 있던 bead 중 `retry_pending`/`failed`(미
dismiss)인 것은 새 attempt로 재디스패치한다.

## 4. 큐 정지 상태 모델

- `queue.hold: null | {kind:'env'|'systemic', cause, since, bead_ids, next_at?, halted_by_attempt_id?}`
  — 신규 durable 필드. 실패가 켜는 유일한 정지다.
- `queue.auto_advance`는 **사용자 ⏸/▶ 전용**으로 돌아간다. 실패 경로는 더는
  `setAutoAdvance(false)`를 호출하지 않는다.
- 호환: 기존 `queue.json`의 `halted_auto_advance:true` 레코드와
  `settleMootRepairFailures`·`auto-advance-restore.js`의 복원 경로는 그대로
  둔다(과거 레코드 dismiss용). 새 실패는 `halted_auto_advance`를 쓰지 않는다.
- `runPass` 진입 판정: `hold !== null` → armed 행만(기존 `armed_only` 분기 재사용).
  `auto_advance !== true` → 기존과 같음.

## 5. quick_fix 착지: 증거 우선

`quickfix-landing.js`의 `not_resolved` 두 분기(`:348`, `:380`)를 다음으로 바꾼다.

1. 세션 verdict success이고 bead status가 `resolved`가 아닐 때, 먼저
   `guard-hook.js`의 push 기록(attempt hook 디렉터리의 push log)에서 이 attempt가
   base로 push한 ref·SHA를 읽는다.
2. push 기록의 SHA와 `impl_review` 영수증 SHA가 같고 영수증이 유효(`<reviewer>@<40hex>`)하면
   Worker가 `bd update --status resolved`를 쓰고 readback한 뒤 기존 착지 순서를
   잇는다. attempt 기록에 `landing.resolved_by='worker:evidence'`를 남긴다.
3. push 기록이 없거나(`push_log_absent`), SHA가 다르거나(`impl_review_sha_mismatch`),
   영수증이 없으면(`impl_review_missing`) `quickfix_landing_failed:delivery_unproven:<토큰>`
   (individual).

`premature_close`·`head_mismatch`·`push_not_contained`·`invalid_impl_review`는
2026-08-19 spec 판정 그대로다(individual, 큐 계속).

## 6. attempt 기록 필드

- `status`에 `parked`, `retry_pending` 추가.
- `retry: {cause, attempts, max, next_at, origin_attempt_id}` — 재시도는 같은 bead의
  새 attempt이고 `origin_attempt_id`로 첫 attempt를 가리킨다. 소진 시 마지막
  attempt만 `failed`이고 앞선 것들은 `retry_pending`→`superseded`로 정리한다(기존
  supersede 규칙 재사용).
- `cause_detail`:
  - `session_failed:*` → `{summary, subtype, is_error}` (`runner/claude.js`·`codex.js`
    verdict가 마지막 result 텍스트를 함께 돌려준다).
  - `session_parked` → `{summary, awaiting_user, bead_status}`.
  - 환경성 → 기존 `{reason, detail}` 유지.

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
  재시도 대기 · 다음 HH:MM", 버튼 `지금 재시도`. **체계적 정지**: 경고색,
  "<원인 문장> — bead X, Y", 버튼 `재개`. 사용자 ⏸ 표시는 지금 그대로.
- `parked` 타일: 뱃지 `세션 대기`, 본문에 `cause_detail.summary`, 버튼
  `재시도`·`폐기`.
- `failed` 타일(UI-rj02 결정 표면 유지): 원인 뱃지 + 팝오버에
  `cause_detail.summary`, 재시도 이력("자동 재시도 3회 — 같은 오류"), 로그 경로.
- `재시도/폐기`(dismiss)는 auto_advance 복원 역할을 잃고 타일 정리 역할만 남는다.
- `needs_human` 5종은 `확인 필요` 뱃지 + 문장, 출구는 지금처럼 `[머지]`.
- 카드 줄 순서·슬롯은 `2026-08-25-card-header-grammar-unify-design.md` §2·§5.1을
  따른다(새 뱃지 `세션 대기`는 판정 칩 슬롯).

## 9. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|
| 형제 | beads-ui | user_request | 로그 구조(bead별 `events.jsonl` 타임라인·실패 요약 추출·세션 로그 보존 정책)는 별개 표면·별개 검증 묶음이며 이 Bead의 분류 규칙과 독립적으로 착지 가능 | 없음 | UI-8wpb |
| 형제 | dotfiles | user_request | 계약 변경: quick_fix `skip` 예외 제거·plan `self` 허용·REVISE는 파킹 사유 아님(ADR/spec 충돌만 `awaiting_user`)·impl 자동 리뷰 dispatch(UI-d7fy 결정 3 supersede)·세션의 `bd close` 차단 hook·실패 어휘 등록. 다른 저장소 소유 | 없음 | dotfiles-01no |
| 형제 | beads-ui | user_request | 머지 큐의 `impl_review` 보류 시 리뷰 lineage 자동 1회 dispatch 구현 — 계약(dotfiles-01no)이 먼저 닫혀야 착지. spec은 선행 closed 후 작성 | dotfiles-01no | UI-qksl |

- 관찰: hook 우회 kill 오탐 후보 2건(`git config --get core.hooksPath`,
  `git -c core.hooksPath=.git/hooks status`)이 현재 규칙(UI-1xcd 읽기 allowlist)에서도
  잡히는지 — 이 Bead 구현 중 재현 확인만 하고, 잡히면 dotfiles 형제 Bead에 관찰로
  넘긴다(guard 규칙 변경은 이 Bead 범위 밖).

## 10. 구현 unit 후보

1. `failure-class` — `server/worker/failure-class.js` + `attempt-failure.js`: 분류·승격·backoff 순수 로직.
2. `queue-hold` — `queue-store.js`·`scheduler.js`(`failAttempt`, `runPass`, 재시도 디스패치, `재개`/`지금 재시도` ws 핸들러).
3. `session-outcome` — `runner/claude.js`·`codex.js` verdict summary, `verify.js` `pr_missing` 대체, `quickfix-landing.js` §5.
4. `completion-policy` — `completion-intent.js` 5종 + `failure-sentences.js`.
5. `worker-ui` — `app/views/worker/` 정지 표시·parked 타일·팝오버, 번들.

## 11. 테스트 범위

- `failure-class.test.js`: cause→tier/retry 표 전수; 반복 승격(2 bead/30분 경계값
  29분·31분); parked 판정 세 조건 각각 미충족 시 non-parked.
- `scheduler` 테스트: 개별 실패가 `auto_advance`를 건드리지 않음 / 환경성 첫 발생이
  `hold.env` / 재시도 성공이 `hold=null` / 소진·타 bead 재발이 `hold.systemic` /
  hold 중 `runPass` 무디스패치(armed 예외 유지) / `재개`가 `bead_ids` 재디스패치.
- `quickfix-landing` 테스트: push 기록+영수증 일치 → Worker resolved 기록·진행 /
  `push_log_absent`·`impl_review_sha_mismatch`·`impl_review_missing` → `delivery_unproven:*`.
- `completion-intent` 테스트: 정책표 5종 매핑, `verify_red`·`cleanup_failed`가
  `hold.systemic` 발화, 마이그레이션 토큰 읽기.
- `runner/claude` 테스트: verdict가 마지막 result 텍스트 summary를 동반.
- 프런트: 정지 표시 2종·parked 타일·팝오버 summary 렌더 스냅샷.
- 회귀: `moot-repair`·`auto-advance-restore`·`repair-lane-retirement` 기존 테스트
  통과 유지(호환 경로).

## 12. 결정 (ADR 후보)

- **실패의 큐 정지 권한은 `systemic` 계층만 갖는다; 개별 실패는 bead에 머문다.**
  되돌리기 어려움: 있음(정지 의미가 UI·복원 경로·운영 습관에 박힘) / 맥락 없이
  놀라움: 있음(실패 타일이 있는데 큐가 도는 것은 지금 관성과 반대) / 실제
  trade-off: 있음(장애 중 세션 낭비 vs 사람 호출 빈도). **세 조건 충족.**
  summary: "Worker 큐 정지는 다음 bead에도 재발할 체계적 실패에만 걸고, 개별 실패는
  bead 단위로 기록하고 큐를 계속 돌린다. 환경성 실패는 보류→재시도→승격의 사다리를
  탄다."
- **세션이 파킹한 결말은 실패가 아니며 자동 재디스패치하지 않는다.** 되돌리기
  어려움: 있음 / 놀라움: 있음 / trade-off: 있음(환경 회복 시 자동 재개 편의 vs 빈
  세션 반복). **세 조건 충족.** summary: "성공 종료 + 미resolved + PR 없음은
  `parked`다. 재개는 사용자 클릭 또는 `awaiting_user` 소거 관측뿐이다."
- **착지 판정은 세션 자기보고보다 hook push 기록·영수증 증거를 우선한다.**
  되돌리기 어려움: 없음(판정 함수 교체) / 놀라움: 있음 / trade-off: 있음. 두
  조건만 충족 → 후보 아님, spec 기록으로 충분.
