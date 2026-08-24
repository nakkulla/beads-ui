---
scope:
  - server/worker/completion-intent.js
  - server/worker/head-review.js
  - server/worker/head-review-transport.js
  - server/worker/pr-poller.js
  - server/worker/queue-store.js
  - app/views/worker/index.js
  - app/views/monitor/
---

# needs_human 사유별 자동 해소 정책 — 설계 (UI-hk74)

## 1. 배경과 문제

2026-08-24 UI-e6hw(#192)에서 자동 머지 코디네이터가 `receipt_unbacked:unit_plan_mismatch`로
completion intent를 `needs_human`으로 종결했다. 원인(Bead `unit_plan` 형식 오류)은
메타데이터 정정으로 풀렸지만, 종결된 intent를 다시 관측하는 경로가 없어 사람의 [머지]
클릭이 유일한 재개 트리거였고, 그 클릭마저 CAS 결함(별도 수정 `ca36f7f3`)으로 막혀
교착됐다. 그 사이 poller는 base가 움직일 때마다 머지될 수 없는 행에 verify를 5회 띄웠다.

조사에서 확인한 사실:

- `needs_human` 진입 사유는 네 부류다: 게이트의 비대기성 거부(`undecidable`), 수리
  사다리 실패, 머지 후 정리 장부 실패, 재시작 후 복원 불능. 이 중 사람만 풀 수 있는 것은
  "증거로 lineage를 확정할 수 없는" 소수이며, 나머지는 자동화가 시도하지 않았거나 1회
  실패에 바로 종결하는 것이다.
- `review_receipt_missing/stale`은 [리뷰 후 머지] 클릭이 독립 리뷰어 세션을 dispatch해
  푸는데, 클릭 자체가 형식적 단계다. PR을 가진 Bead 135건 중 영수증 없는 건은 1건(키
  도입 전)으로 빈도는 매우 낮다.
- head review의 리뷰어 선택(`head-review-transport.js selectReviewer`)은 Bead
  메타데이터만 읽고 워크스페이스 kv 층을 건너뛰어 코드 기본값 `codex/xhigh`로 떨어진다.
  dotfiles `harness.yaml`은 preset을 "Worker manual-continuation 레인의 결정적
  fallback"으로 명시하므로 정합이 어긋나 있다.
- head review·repair 시도는 `head-review-attempts/*.json|.log.jsonl`에만 남고 Worker
  attempt 이력·토큰 합계·모니터에는 나오지 않는다(이 워크스페이스에 review 6·repair 4건이
  보이지 않게 실행됐다).
- 큐가 소유한 base update는 `relaxQueueMutation`이 ancestry(`coversHead`)로 덮어 기존
  영수증으로 승인한다 — 재리뷰 결함은 없다.

## 2. 목표와 비목표

목표

- `needs_human`을 "사람만 푼다"는 의미로 되돌린다. 자동으로 풀 수 있는 사유는 종결하지
  않고 비종결 phase에서 스스로 해소를 시도하며, 시도가 소진·거부됐을 때만 종결한다.
- head review를 클릭 없이도 dispatch하되, 리뷰어 선택을 Worker impl 게이트와 같은
  사다리로 정합하고, 상류 위반(영수증 없이 PR 대기 진입)은 흔적을 남긴다.
- head review·repair 시도를 일반 attempt와 같은 이력 표면에 올린다.
- 머지될 수 없는 행에 사전 verify를 띄우지 않는다.

비목표

- Bead 메타데이터를 자동으로 쓰는 정정(`spec_id`를 `spec_path`에서 복사 등)은 하지 않는다.
- 라벨 어휘·durable 키 등 dotfiles 소유 계약 표면은 바꾸지 않는다. 새 phase와
  `auto_resolution`은 beads-ui 큐(`queue.json`) 내부 상태다.
- base 연속 이동에 대한 verify 디바운스는 넣지 않는다. 관측된 낭비는 전부 terminal 행에서
  났고, 살아 있는 후보는 최신 base로 검증돼야 한다.
- 과거 head-review 마커 10건의 이력 마이그레이션은 하지 않는다(attempt 스키마 필수 필드를
  추정해야 하므로).

## 3. 사유별 정책 표

종결 사유(`terminal_reason.reason`의 첫 `:` 앞 토큰으로 매칭)를 네 부류로 고정한다. 표에
없는 사유는 `human`이다(fail-closed).

| 부류 | 사유 | 다음 phase | 해소 조건 |
|---|---|---|---|
| `metadata_watch` | `receipt_unbacked`, `spec_id_missing` | `waiting_metadata` | 해당 root Bead의 메타데이터 변경 관측 → 검사 재실행(`checkReceipts` / native `spec_id` 존재) → 통과 시 `gating`. 실패면 머무른다(무한 대기 허용). |
| `auto_review` | `review_receipt_missing`, `review_receipt_stale` | `reviewing` | `auto_merge=ON`이고 이 root에 자동 리뷰 이력이 없을 때 head review를 1회 자동 dispatch. 승인 → `gating`; 리뷰 실패(REJECT, REVISE 후 수리 실패, 리뷰어 선택 오류, head 불일치) → `needs_human`. |
| `retry` | `repair_bead_create_failed`, `repair_bead_readback_failed`, `repair_bead_record_failed`, `repair_dispatch_failed`, `continuation_persist_failed`, `cleanup_prerecord_failed`, `cleanup_settlement_record_failed`, `completion_gate_spawn_failed`, `verify_cmd_failed` | `retrying` | 지연 재시도 1분 → 5분 → 15분, 최대 3회. 성공 → 원래 phase 복귀. 소진 → `needs_human`(`retry_exhausted:<원사유>`). |
| `human` | `reconciliation_ambiguous`, `resolution_lineage_ambiguous`, `repair_resume_lineage_ambiguous`, `repair_attempt_missing`, `cleanup_journal_conflict`, `cleanup_completion_unrecorded`, `repair_session_budget_exhausted`, `intent_state_invalid`, `ownership_undecidable`, 그 외 전부 | `needs_human` | 사람 클릭([머지] / [정리]). |

판단 근거

- `verify_cmd_failed`(verify 스크립트 자체 오류)는 대개 환경 문제(의존성 설치·디스크)라
  재시도로 풀리고, 3회 실패는 진짜 고장이므로 사람.
- `spec_id_missing`은 사람이 `bd update --spec-id`로 쓰면 관측해 재개만 한다.
- `auto_merge=OFF`면 정책과 무관하게 기존대로 `paused`다.

## 4. 상태 머신

`CompletionPhase`에 `waiting_metadata | reviewing | retrying`을 추가한다. 세 phase 공통으로
intent에 다음을 기록한다.

```
auto_resolution: {
  class: 'metadata_watch' | 'auto_review' | 'retry',
  origin_reason: string,      // 원 종결 사유 전체 문자열
  origin_stage: string,       // terminalize가 받던 stage
  return_phase: CompletionPhase, // retry가 성공했을 때 돌아갈 phase
  attempts: number,
  next_at: number | null,     // retrying 전용
  last_error: string | null
}
```

불변식(`queue-store.js` 정규화)

- `terminal_reason`은 `needs_human`에서만 non-null이다(기존 유지).
- `auto_resolution`은 세 새 phase에서만 non-null이다. 다른 phase에서 값이 있으면 정규화가
  버린다.
- `needs_human`의 `terminal_reason`에 `resumed_terminal`이 붙는 기존 클릭 재개 경로는
  그대로다.

전이

- 진입: 지금 `terminalize(reason, stage, failure_key, evidence)`를 부르던 모든 자리가
  `settleFailure(...)` 하나를 부르고, 정책 표가 phase를 정한다. `terminalize`는
  `settleFailure`의 `human` 분기로만 남는다.
- `waiting_metadata` → `gating`: 검사 통과. `waiting_metadata`는 verify를 띄우지 않는다.
- `reviewing` → `gating`(head-review 저널 `approved`) / `needs_human`(저널 `failed`,
  `terminal_reason = <failure_reason>`). `attempts`는 1로 고정: 재개 뒤 게이트가 다시
  `review_receipt_*`를 내면 `needs_human`(`auto_review_exhausted:<사유>`).
- `retrying` → `return_phase`(성공) / `needs_human`(`retry_exhausted:<원사유>`).
- 사람의 [머지] 클릭은 세 phase 모두에서 지금의 `needs_human` 재개와 같이 `gating`으로
  되돌리고 `auto_resolution`을 비운다(수동 authority가 우선).

재시작 복원(reconcile)

- 세 phase는 `auto_resolution`만으로 복원된다. 외부 세션 lineage는 필요 없다.
- `reviewing`은 head-review 저널(`merge_queue[].head_review`)이 진실이다. 저널이 없으면
  중복 리뷰를 막기 위해 재dispatch하지 않고 `needs_human`(`auto_review_journal_missing`).
- `retrying`의 `next_at`이 이미 지났으면 즉시 실행한다.

`decideCompletionAction`은 순수 함수를 유지하고 새 action을 낸다:
`resume_metadata_check`, `dispatch_auto_review`, `retry_failed_op`. 효과 소유자는 기존
`onAction`에 붙는다.

## 5. 재관측 트리거

- `waiting_metadata`: 서버가 이미 구독하는 bd 이슈 변경 이벤트에서 `waiting_metadata` root의
  Bead ID만 골라 `metadata_check`를 실행한다. 재시작으로 이벤트를 놓친 경우는 reconcile
  1회 검사가 덮는다. 폴링은 없다.
- `retrying`: 코디네이터 pass가 `now >= next_at`인 것만 실행한다(기존 pass 코얼레싱
  유지). wake는 큐 변경 이벤트 + 최대 1분 타이머.
- `reviewing`: head-review 저널 전이가 이미 큐 변경 이벤트를 내므로 그것으로 진행한다.

## 6. head review 정합

리뷰어 사다리

- `selectReviewer`를 Worker impl 게이트와 같은 해석기로 교체한다: Bead
  `impl_review_model` / `impl_review_effort` → 워크스페이스 kv `workflow_session_defaults`의
  같은 키 → harness `review.default`(`codex`) / effort 기본 `xhigh`(harness에 리뷰 effort
  기본값이 없는 동안).
- `self` / `skip`은 어느 층에서 왔든 `reviewer_selection_<값>` 실패다. 리뷰 증거가 아니다.
- 해석 출처(`bead | kv | harness`)를 head-review 저널과 attempt 이력에 기록한다.
- 클릭 dispatch와 자동 dispatch는 같은 함수를 지난다. 다른 것은 `origin: 'click' | 'auto'`
  기록뿐이다.

상류 위반 기록

- 자동 dispatch 진입 시 root Bead에 코멘트 1건을 남긴다:
  `## ⚠️ 상류 위반 관측 — impl_review <missing|stale>@<head-sha>`, 관측 시각, 이전 영수증
  값(있으면), 게이트 사유. 라벨은 쓰지 않는다(라벨 어휘는 dotfiles 소유).
- 같은 (root, head)에 코멘트는 한 번만 쓴다. 기록 실패는 dispatch를 막지 않고 로그만 남긴다.

수리 continuation

- REVISE 뒤 수리는 `prior_session`을 기본으로 한다. provider가 바뀌었을 때만 기존
  `continuation_action` 질문이 뜬다.

## 7. head review·repair를 attempt 이력에 올리기

- head review / repair 시도를 `queue.attempts`에 `kind: 'head_review' | 'head_repair'`로
  등록한다. 기존 attempt 스키마(bead_id, model, effort, started_at/finished_at, status,
  tokens, log_path)를 그대로 쓰고, `log_path`는 기존 `head-review-attempts/<id>.log.jsonl`을
  가리킨다(중복 저장 없음). 추가 필드: `origin: 'click' | 'auto'`,
  `reviewer_source: 'bead' | 'kv' | 'harness'`, `authority_id`, `head_sha`.
- 등록 시점은 head-review-transport가 마커를 쓰는 곳과 같다(pre-record → dispatch →
  settle). 마커와 attempt는 같은 attempt_id를 쓴다.
- Worker 완료 레인·토큰 합계·모니터 세션 타일은 이 kind를 일반 attempt와 같이 보이되
  `리뷰` / `수리` 배지와 `자동` 표시로 구분한다.

## 8. 사전 verify 억제

- `pr-poller`의 verify 시작 조건에 "root intent phase가 `needs_human` · `waiting_metadata`
  · `retrying`이면 건너뜀"을 추가한다. `reviewing`은 승인 직후 게이트가 verify를 요구하므로
  유지한다.
- 억제된 행이 `gating`으로 돌아오면 게이트가 verify를 띄우므로 추가 지연은 verify 1회
  시간이다.

## 9. 화면

Worker PR 대기 행 배지

- `waiting_metadata`: `정정 대기` — 툴팁에 원 사유와 "메타데이터 정정이 관측되면 자동 재개".
- `reviewing`(자동): `자동 리뷰 중` — 툴팁에 리뷰어·effort·출처.
- `retrying`: `재시도 n/3` — 툴팁에 원 사유·다음 시각·마지막 오류.
- `needs_human`: 기존 배지 유지. `retry_exhausted:*` / `auto_review_exhausted:*`는 원 사유를
  툴팁에 함께 보인다.

[머지] 버튼은 세 phase에서 활성이며 라벨은 기존 규칙(`다시 머지` 등)을 따른다.

## 10. 오류 처리

- 정책 표 밖의 사유, `auto_resolution` 손상, phase-필드 불일치는 모두 `needs_human`으로
  떨어진다(fail-closed).
- 자동 리뷰 dispatch 자체가 실패(transport 오류)하면 `retry` 부류로 보내지 않고
  `needs_human`(`auto_review_dispatch_failed`)이다 — 리뷰 dispatch 중복은 lineage 위험이다.
- `metadata_check`의 bd 읽기 실패는 phase를 유지하고 다음 이벤트를 기다린다.

## 11. 테스트

- `server/worker/completion-intent.test.js`: 정책 표 매핑 전수(사유 → phase), 미지 사유 →
  `needs_human`, 각 phase 전이(성공 / 소진 / 거부), `auto_merge=OFF` → `paused`, reconcile
  복원(저널 없는 `reviewing` → `needs_human`, 지난 `next_at` 즉시 실행), 클릭 재개가
  `auto_resolution`을 비움.
- `server/worker/head-review-transport.test.js`: 사다리 3층 해석과 출처 기록, kv 값 반영,
  `self` / `skip` 거부, 위반 코멘트 1회 기록·실패 시 dispatch 진행.
- `server/worker/pr-poller.test.js`: 억제 phase에서 `ensureVerify` 미호출, `gating` 복귀 시
  호출, `reviewing`은 호출.
- `server/worker/queue-store.test.js`: 새 phase 정규화·불변식, attempt `kind` 왕복.
- `app/views/worker/index.test.js`: 새 phase 배지 3종과 툴팁, 이력 레인의 리뷰/수리
  attempt 표시와 `자동` 구분.

## 12. 구현 unit 후보 (advisory)

- `policy` — `server/worker/completion-intent.js`, `server/worker/queue-store.js`,
  `server/worker/pr-poller.js`: 정책 표·상태 머신·트리거·verify 억제.
- `review` — `server/worker/head-review.js`, `server/worker/head-review-transport.js`:
  리뷰어 사다리·위반 코멘트·attempt 이력 등록·자동 dispatch.
- `view` — `app/views/worker/index.js`, `app/views/monitor/`: 배지·이력 표시.

`policy`와 `review`는 `auto_resolution`·attempt `kind` 스키마를 공유하므로 `policy`가
먼저다.
