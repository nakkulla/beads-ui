---
scope:
  - server/worker/compare-projection.js
  - server/worker/compare-projection.test.js
  - server/ws/compare-handlers.js
  - server/ws/compare-handlers.test.js
  - server/ws/exec-preset-handlers.js
  - server/ws/mutation-handlers.js
  - server/ws/session-defaults-handlers.js
  - server/ws/worker-handlers.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/exec-preset-coordinator.js
  - app/views/compare/
  - app/styles.css
  - app/protocol.md
---

# 비교 탭 전면 재설계 — 프리셋·모델별 세션 묶음의 착지율·문제율·시간·비용

## 문서 상태

- Bead: `UI-4g7p`
- 경로: `spec_backed`; beads-ui 안에서 하나의 구현·검증·인도 묶음으로 처리한다.
- 기준: `origin/main` / `5767cee10dea8168e2f09eae0019618622db2fe4`
- 상태: 사용자 검토용 완성 초안. 구현·스펙 게이트 승인 전이다.
- 화면 미리보기: `http://100.122.98.8:9000/2026-09-15-compare-redesign.html`
  (첫 카드를 펼친 상태는 `#open`). 파일은
  `~/tmp/mockups/2026-09-15-compare-redesign.html`. 값은 실측 기록을 바탕으로
  한 예시이며 실제 데이터가 아니다. 동작의 정본은 이 문서다.
- 선행 스펙: `2026-09-03-preset-compare-tab-design.md`(UI-n28d, 이하 "선행
  스펙"). 이 문서는 그 §3(비교 탭)과 §3.5의 응답 형태를 대체하고 §1(가격)·§2
  (리뷰 stats 읽기)·§4(bench 클론 실행)는 그대로 둔다.

## 1. 사용자 결과와 확인한 원인

사용자는 워커가 돌린 세션들이 제대로 진행됐는지, 실수나 잘못된 진행이 있었는지,
얼마나 걸리고 얼마가 들었는지를 **프리셋별·모델별 평균**으로 한눈에 비교하고
싶다. 휴대폰에서도 같은 화면을 읽을 수 있어야 한다.

현행 비교 탭(선행 스펙 §3)은 이 목적을 이루지 못한다. 2026-09-15 기준 공유
서버의 종단 구현 attempt 512건을 실측한 원인은 다음과 같다.

1. **그룹이 흩어진다.** 그룹 키가 `<오케스트레이션 모델/강도> → <구현 실행자> ·
   리뷰 <모델/강도/속도>`인데, 구현 실행자(`receipt_check.checks.exec_receipt`)는
   최근 기록에만 있고 리뷰어 세 키는 attempt `exec_values`에 거의 기록되지
   않는다(2026-09 129건 중 3건). 결과는 `미기록`이 섞인 서명 40여 개이며 저장된
   프리셋 7개 중 어느 것과도 이름이 대조되지 않는다.
2. **성공률이 비어 있다.** 검증 열은 머지 후보의 `[verify]` 영수증과 bench
   `bench_verify`만 원천이라 거의 전부 `미상`이고, 성공률 표본이 0이라 기본 정렬
   (성공률 내림차순)이 사실상 가격 오름차순이 된다.
3. **문제 신호가 실패·재시도 둘뿐이다.** 리뷰 REVISE 라운드·blocking 지적,
   파킹·needs_human 같은 사람 개입은 기록에 있지만 표에 오르지 않는다.
4. **프리셋 식별이 기록되지 않는다.** `resolveForDispatch`는 항상
   `preset_id: null`을 돌려주고(UI-7yh2 이후 워크스페이스 기본 프리셋 개념이
   없어졌다), 전역 적용 핸들러(`apply-impl-preset-global`)는 큐 오케스트레이션
   키와 kv 프로필만 바꾸고 어떤 프리셋을 적용했는지 남기지 않는다. attempt의
   `exec_default_preset_id`는 512건 중 29건에만 있다(2026-08 잔재).
5. **모바일 규칙이 없다.** `.cmp-*` 선택자 51개 중 `@media` 안에 있는 것이 없고
   표는 `width:100%`·헤더 `nowrap`뿐이라 390px에서 가로로 넘친다. 앱의 모바일
   분기점은 `≤640px`(11곳)이다.

사용자 결정(2026-09-15): 문제 신호는 네 가지(실패·폐기, 재시도·재개, 리뷰
REVISE/blocking, 사람 개입)를 모두 합산한다; 성공 판정은 `[verify]` 영수증이
아니라 **착지 관측**이다; bench 실험은 주 기능이 아니므로 이미 구현된 폼과
목록을 살려 두되 뒤로 물린다.

## 2. 검토한 접근과 선택

1. **카드 배치 + 프리셋 대조를 기록·추론 두 층으로**(선택). 그룹의 단위를 세션이
   실제로 돈 프리셋으로 바꾸고, 앞으로의 attempt에는 적용 시점의 프리셋 식별을
   기록하며(§6), 과거 attempt는 기록된 축으로 관대하게 추론한다(§4.4). 화면은
   그룹당 카드 하나에 네 KPI를 놓고 펼치면 세션 목록이 나오는 꼴이라 640px
   이하에서는 세로로 쌓기만 하면 된다.
2. 표를 유지하고 열만 줄이기. 구현이 가장 작지만 그룹 분산(원인 1)이 그대로
   남고, 8열 표는 모바일에서 어떤 규칙을 써도 두 줄 이상으로 접혀 비교가 안 된다.
3. 프리셋 대조를 기록에만 의존하기(추론 없음). 형식은 깨끗하지만 지금까지의
   512건이 전부 `미대조`가 되어 당장 비교할 것이 없다. 추론은 기록이 없는
   attempt에만 쓰고 기록이 있으면 기록이 이긴다.

선택 1은 같은 저장소의 한 설계다. 서버 투영·기록 스탬프·화면은 호환을 맞춘
하나의 PR로 검증하며 파일 수만으로 Phase를 나누지 않는다.

## 3. 화면

### 3.1 구성 (위에서 아래로)

1. **머리**: 제목 `프리셋 비교`와 요약 한 줄(`최근 30일 · 전체 저장소 · 세션 n건
   · 이슈 m건`).
2. **조작 줄**: 묶기 축 segmented control(`프리셋` 기본 · `오케스트레이션 모델` ·
   `구현 실행자`), 필터 select(기간 `CLOSED_RANGE_OPTIONS`·저장소·route), 정렬
   select(`착지율` 기본 · `문제율` · `평균 시간` · `평균 비용`), `새로고침`.
   유형 필터는 뺀다 — 실측에서 유형별 비교 요구가 없고 조작 줄이 모바일에서
   길어진다. `bench 실험 포함` 체크박스는 §3.5의 실험 절로 옮긴다.
3. **전체 요약 띠**: 필터 결과 전체의 다섯 값 — 전체 세션(이슈 수·진행 중 수
   보조), 착지율, 문제 세션 비율, 평균 시간(중앙값 보조), 평균 비용(표본 `n=a/b`
   보조). 카드의 값을 읽을 기준선이다.
4. **그룹 카드 격자**: `grid-template-columns: repeat(auto-fill, minmax(320px,
   1fr))`. 카드 하나가 그룹 하나다(§3.2).
5. **범례 한 줄**: 착지율·문제 세션·평균의 정의(§4)를 그대로 적는다.
6. **실험 절**: `<details>`로 접힌 `실험 (bench 클론 실행) · n건`. 안에는 기존
   `새 실험` 폼·실험 목록·실험 표(선행 스펙 §4.7)와 `실사용 표에 실험 세션 포함`
   체크박스가 그대로 들어간다. 기본은 접힘이고 실험이 0건이어도 절은 보인다.

### 3.2 그룹 카드

- 머리: 그룹 이름, 배지(`프리셋` — 대조된 프리셋 / `미대조` — §4.4 미확정 /
  묶기 축이 모델·실행자일 때는 배지 없음), `세션 n · 이슈 m`.
- 구성 줄(모노스페이스, 회색): `<orch_model>/<orch_effort> → <impl_actor>`. 묶기
  축이 프리셋일 때 한 카드 안에 구성이 둘 이상이면 `외 k` 를 붙이고 툴팁에
  전부 나열한다. `미대조` 카드의 구성 줄은 판별 불가 사유(후보 프리셋 이름)를
  잇는다.
- KPI 2×2: `착지율`(막대, `착지/판정 · 진행 중 k`), `문제 세션`(빨간 막대,
  `문제/n`), `평균 시간`(보조 `중앙값`), `평균 비용`(보조 `중앙값 · n=a/b ·
  부분 k`). 값이 없으면 `—`.
- 문제 내역 칩 넷: `실패·폐기 a` `재시도 b` `리뷰 지적 c` `사람 개입 d`. 0은
  흐리게.
- 최고 표시: 필터 결과의 카드 중 `n ≥ 3`이고 판정 `≥ 3`인 카드만 후보로, 착지율
  최고(`최고`), 평균 시간 최단(`최단`), 평균 비용 최저(`최저`)인 KPI 타일을
  초록 배경으로 강조한다. 동률이면 표시하지 않는다. 후보가 하나뿐이어도 표시한다
  (그 카드가 기준선이 된다).
- 바닥: `세션 n건 보기 ▾` 토글. 펼치면 카드가 격자 전체 폭(`grid-column: 1 /
  -1`)이 되고 세션 목록(§3.3)이 이어진다. 펼침 상태는 뷰 상태이며 새로고침에도
  유지된다(그룹 키 기준).

### 3.3 세션 행

한 행이 attempt 하나다. 결과 점(착지 초록 · 실패/폐기 빨강 · 문제 있음 주황 ·
진행 중/대체됨 회색), `ID 제목`(한 줄 말줄임), 결과 문구(`착지 · PR #291`,
`착지 · push 4633cda`, `착지 · 무변경`, `실패 · <cause>`, `폐기`, `진행 중 · PR
open`, `대체됨`), 문제 칩(`실패`·`재시도`·`리뷰 r2`/`리뷰 b1`·`개입`), 시간과
종료 시각, 비용. `[verify]` 판정이 있으면 결과 문구 뒤에 `· verify 통과/실패`를
붙인다(보조 표기, 사용자 결정). 행 클릭은 기존 이슈 상세 딥링크
(`#/compare?issue=<id>`)다.

### 3.4 모바일 (≤640px)

- 조작 줄: segmented control은 전폭 3등분, 필터·정렬 select는 2열 격자로 전폭,
  `새로고침`은 그 아래 오른쪽.
- 요약 띠: 2열 격자, `전체 세션` 타일만 전폭.
- 카드 격자: 1열. KPI는 2×2 유지.
- 세션 행: 3행 격자 — `점 | 제목 | 비용` / `점 | 결과 문구 | 시간·종료` / `점 |
  문제 칩(있을 때만)`.
- `body` 좌우 여백 12px, 하단은 `env(safe-area-inset-bottom)`을 더한다. 표·코드
  블록이 없으므로 가로 스크롤 요소는 없다.

### 3.5 없애는 것

선행 스펙 §3의 8열 표·`유형` 필터·`bench 실험 포함` 조작 위치·정렬 규칙
(성공률→가격)·`n=3/5` 표기 방식은 이 문서가 대체한다. `app/views/compare/`의
`format.js`(`formatDuration`·`formatTokens`·`formatPrice`·`sampleNote`)와
`bench-form.js`·`bench-model.js`는 재사용하고, `formatOutcome`·`formatVerify`·
`formatReview`·`formatRate`는 §3.3 결과 문구·§3.2 KPI 포맷터로 바꾼다.

## 4. 데이터 정의

### 4.1 행

선행 스펙 §3.2와 같다: 종단(`TERMINAL_ATTEMPT_STATUSES`)에 도달한 구현 attempt
(`kind=implementation`) 하나가 행 하나이고 `review_session`·`retired_kind`는
제외한다. 재료는 큐에 살아 있는 attempt와 이관된 attempt 기록(ADR 0029), 이슈
제목·상태·route·`impl_review_stats`는 워크스페이스 스냅샷 투영(ADR 0025;
`bd list --all`이므로 닫힌 이슈도 있다; `compareIssueIndex`에 이슈의
`close_reason`을 더 싣는다), 사람 개입 이벤트는 bead별 `events.jsonl` 타임라인
(ADR 0027)이다.

### 4.2 결과 (`outcome`)

attempt마다 아래 사다리를 위에서부터 적용한다.

| 순서 | 조건 | `outcome.kind` | 착지율 표본 |
| --- | --- | --- | --- |
| 1 | `status=failed` | `failed` (`evidence: cause`) | 판정 |
| 2 | `status=discarded` | `discarded` | 판정 |
| 3 | `status=done`이고 같은 Bead에 더 늦게 끝난 `done` attempt가 있다 | `superseded` | 제외 |
| 4 | `status=done`이고 `done_kind`가 `no_delta`·`bench`이거나 이슈 `close_reason`이 `refuted:`·`no-delta:`로 시작 | `landed` (`evidence: no_change`) | 판정 |
| 5 | `status=done`이고 `quickfix_landing`이 있으며 `reason === null` | `landed` (`evidence: push`, `head_sha`) | 판정 |
| 6 | `status=done`이고 이슈 상태가 `closed` | `landed` (`evidence: closed`, `pr_url` 있으면 함께) | 판정 |
| 7 | `status=done`이고 이슈가 스냅샷에 없다 | `unknown` | 제외 |
| 8 | 그 밖의 `status=done` | `in_flight` (`pr_url` 있으면 `PR open`) | 제외 |

- **착지율** = `landed ÷ (landed + failed + discarded)`. `superseded`·`in_flight`
  ·`unknown`은 분모에 들어가지 않으며 카드에 `진행 중 k`로 따로 적는다
  (`superseded`와 `unknown`은 세션 행에서만 보인다).
- 3의 "더 늦게 끝난"은 `finished_at` 비교다. 한 Bead의 마지막 `done` attempt만
  Bead 단위 사실(착지·리뷰 stats·`[verify]`)을 물려받는 선행 스펙 §3.2의 규칙을
  결과에도 그대로 쓴다.
- 6이 머지 관측을 대신하는 이유: 머지 완료는 큐 `merge_queue`·`done` 항목과
  타임라인 요약에 흩어져 있고 Worker와 세션이 모두 닫기 뒤에 이슈를 `closed`로
  만든다(ADR 0006·pr-finish). 이슈 `closed`는 스냅샷 한 곳에서 읽히는 가장
  일관된 착지 증거다. 사람이 PR 없이 닫은 이슈도 `landed`로 세는 것은 이 정의의
  한계이며 범례에 적지 않고 §7의 관찰로 남긴다.

### 4.3 문제 신호 (`problems`)

attempt마다 네 불리언과 근거를 둔다. 하나라도 참이면 문제 세션이다.

| 키 | 참인 조건 | 근거 필드 |
| --- | --- | --- |
| `failed` | `outcome.kind ∈ {failed, discarded}` | `cause` |
| `retry` | `retry.origin_attempt_id` 또는 `resumed_from`이 있다(선행 스펙 `isRetryAttempt`) | 그 ID |
| `review` | Bead `impl_review_stats`의 `round ≥ 2` 또는 `blocking ≥ 1`. Bead 단위이므로 그 Bead의 마지막 `done` attempt에만 붙는다 | `{ round, blocking, minor }` |
| `human` | attempt 기록의 `halted_auto_advance`·`awaiting_user_present`가 참이거나, 그 bead 타임라인에서 `attempt_id`가 같은 `needs_human`·`queue_hold` 이벤트가 있거나, `session_ended` 요약이 `파킹 ·`으로 시작 | 이벤트 `summary` 목록 |

- `provider_hold`·`provider_recovered`·`account_preempt`·`guard_warning`은 환경
  요인이라 세지 않는다.
- **문제 세션 비율** = 문제 세션 수 ÷ n. 내역 칩은 각 키의 참 개수다(한 세션이
  여러 키에 걸리면 각각 센다).
- 타임라인 읽기는 bead당 파일 하나이며 `get-compare` 요청 시에만 읽는다(push
  없음). 파일이 없거나 줄이 깨지면 그 bead의 `human`은 attempt 기록 필드로만
  판정한다(fail-quiet).

### 4.4 프리셋 대조 (`preset`)

행마다 `preset: { id, name, basis } | null`을 둔다.

1. **기록 우선**: attempt에 §6의 `exec_preset`이 있으면 그대로 쓴다.
   `basis = recorded`. 이름은 현재 프리셋 저장소에서 `id`로 다시 찾고, 삭제된
   프리셋이면 기록된 이름에 `(삭제됨)`을 붙인다. 기록의 `deviated_keys`가 비어
   있지 않으면 세션 행에 `핀 조정` 칩을 단다(그룹은 그대로 그 프리셋).
2. **추론**: 기록이 없으면 기록된 축으로 현재 프리셋 저장소와 대조한다.
   - 오케스트레이션: attempt `model`·`effort`(511/512 기록). 프리셋의
     `orchestration_model`은 반드시 같아야 하고, `orchestration_effort`는
     attempt `effort`가 있을 때만 비교한다.
   - 구현 실행자: `receipt_check.checks.exec_receipt`(선행 스펙 `implActorOf`).
     `delegated`면 프리셋의 `impl_runtime`은 실행자 모델이 속한 런타임
     (`runner_catalog`에서 역매핑; `auto`는 모두 허용)과 같아야 하고 `impl_model`은
     `auto`이거나 실행자 모델과 같아야 한다. `main`이거나 영수증이 없으면 구현
     키는 비교하지 않는다.
   - 리뷰어·plan/spec 리뷰 키·속도는 비교하지 않는다(기록이 거의 없다).
   - 후보가 하나면 그 프리셋, `basis = inferred`. 둘 이상이면 구체 점수(비교에
     실제로 쓰인 `orchestration_effort`·`impl_runtime`·`impl_model` 중 `auto`가
     아닌 값으로 일치한 개수)가 가장 큰 하나를 고르고, 최고 점수가 둘 이상이면
     `null`이다.
3. `null`인 행은 묶기 축 `프리셋`에서 구성 서명(`<model>/<effort> → <impl_actor>`)
   으로 묶이고 배지 `미대조`, 구성 줄에 `프리셋 미확정 — <후보 이름들> 중 판별
   불가` 또는 후보가 없으면 `일치하는 프리셋 없음`을 적는다.

리뷰어 축을 그룹 키에서 빼는 것은 선행 스펙 §3.3의 결정을 뒤집는다. 그 결정은
ADR로 남지 않았으므로 supersede 없이 이 문서가 새 결정을 적는다(§결정).

### 4.5 묶기 축과 집계

- `group_by=preset`: 키 `preset:<id>` 또는 `sig:<구성 서명>`(미대조).
- `group_by=orchestration`: 키 `<model>/<effort ?? '미기록'>`.
- `group_by=impl_actor`: 키 `main` · `<actor>/<effort>` · `미기록`.
- 그룹 집계 `group`: `key`, `name`, `badge`(`preset`|`unmatched`|`none`),
  `n`, `issue_count`(고유 bead), `compositions[]`(구성 서명과 건수, 건수 내림),
  `landed`, `judged`, `in_flight`, `landing_rate`(`judged=0`이면 `null`),
  `problem_count`, `problem_rate`, `problems: { failed, retry, review, human }`
  (각 건수), `duration_ms`·`cost_usd`·`tokens`: `{ mean, median, sample, total,
  partial_count? }`, `best: string[]`(`landing`·`duration`·`cost` 중 §3.2 규칙에
  든 것), `attempt_ids[]`.
- **평균이 머리값이다**(사용자 요청). 중앙값은 보조로 함께 싣는다. 값이 없는
  행은 표본에서 빼고 `sample/total`로 적는다. 비용은 `projectAttemptUsage`의
  `total_cost_usd`이며 `partial`인 행 수를 `partial_count`로 싣고 카드에
  `부분 k`로 적는다(ADR UI-mscc의 부분 집계 표시를 잇는다).
- 전체 요약 `summary`: 같은 필드를 필터 결과 전체에 대해 한 번 더 계산한다
  (`best` 없음).
- 정렬(`sort`): `landing`(기본; `landing_rate` 내림, `null`은 맨 뒤, 같으면
  `cost_usd.mean` 오름), `problem`(오름), `duration`(오름), `cost`(오름). 정렬은
  클라이언트가 한다 — 응답의 `groups`는 서버가 `landing` 순으로 준다.

### 4.6 필터

기간(`finished_at`, 기본 30일), 저장소(`root_dirs`), route, `include_bench`
(기본 제외). 유형 필터는 없앤다.

## 5. 데이터 경로와 프로토콜

- op은 그대로 `get-compare` → `compare-snapshot` 한 쌍이며 새 op은 없다
  (`app/protocol.js`·`MESSAGE_TYPES` 변경 없음).
- 요청 payload: `{ range?, root_dirs?, routes?, include_bench?, group_by? }`.
  `group_by`는 `preset`(기본)·`orchestration`·`impl_actor`; 그 밖의 값은 기본으로
  읽는다. `issue_types`는 받아도 무시한다(호환).
- 응답 payload: `{ summary, groups, rows, workspaces, runs, bench_rows }`.
  `rows[]`는 기존 필드에 `outcome`, `problems`, `preset`, `orchestration:
  { model, effort }`, `impl_actor: { kind, label, model, effort }`,
  `composition`(구성 서명)을 더하고 `signature`·`success_rate` 관련 필드를
  없앤다. `verify`·`review`·`usage`·`duration_ms`·`is_retry`·`is_bench`·
  `finished_at`는 그대로다. `groups[]`는 §4.5의 새 형태로 바뀐다. `runs`·
  `bench_rows`는 선행 스펙 §4.7 그대로이며 실험 표는 기존 `benchPresetGroups`
  를 계속 쓴다.
- `app/protocol.md`의 `get-compare` 절을 이 형태로 다시 쓴다.
- 서버 모듈 경계: `compare-projection.js`의 순수 부분(`buildCompareModel`)이
  §4 전부를 계산하고, 수집부(`collectCompareWorkspaces`)가 타임라인 읽기를
  더한다. 프리셋 추론(§4.4)은 `presetMatch(attempt_facts, presets, catalog)`
  순수 함수 하나로 떼어 단위 테스트한다.

## 6. 프리셋 식별 기록

앞으로의 attempt가 §4.4의 추론 없이 프리셋을 알도록 두 곳에 기록한다.

1. **적용 시점**: `apply-impl-preset-global`(kv 프로필 + 큐 오케스트레이션 키를
   한 번에 바꾸는 경로)이 같은 큐 쓰기에 `applied_exec_preset: { id, name,
   revision, applied_at }`를 워크스페이스 큐 저장소(`queue.json`)에 남긴다.
   전역 실행 설정을 프리셋 없이 바꾸는 경로 — `update-exec-settings`
   (`mutation-handlers.js`), `set-session-defaults`
   (`session-defaults-handlers.js`), `worker-queue-set-orchestration-defaults`
   (`worker-handlers.js`), 그리고 `impl-preset-update`
   (`exec-preset-handlers.js`)가 현재 적용된 프리셋 자체를 바꿀 때 — 는 같은
   쓰기에서 `applied_exec_preset`를 `null`로 지운다. 이슈별 프리셋 적용
   (`apply-impl-preset`, UI-00lf)은 Bead 핀이지 전역 상태가 아니므로 건드리지
   않는다.
2. **dispatch 시점**: `prerecordAttempt`가 `exec_preset: { id, name, revision,
   deviated_keys: string[] } | null`을 durable 필드로 더한다. 값은 큐의
   `applied_exec_preset`이고, `exec_stamped_keys`(Bead 핀으로 덮인 키) 중 그
   프리셋이 선언한 키와 값이 다른 것을 `deviated_keys`에 적는다.
   `applied_exec_preset`이 없으면 `null`이다. `exec_default_preset_id`·
   `exec_default_preset_revision` 두 잔재 필드는 그대로 두되 더 쓰지 않는다.
- `queue-store.js`의 attempt typedef와 큐 typedef에 두 필드를 더하고, 없는
  기록은 `null`로 읽는다(과거 파일 호환).
- 기록은 UI 소유 관측값이며 workflow metadata·영수증·게이트 입력이 아니다
  (ADR UI-mscc의 `codex_children`과 같은 지위).

## 7. 오류 처리

- 표시는 fail-quiet: 타임라인·영수증·usage·프리셋 저장소 부재는 빈 값·`미대조`·
  `—`다. 프리셋 저장소를 못 읽으면 모든 행이 추론 불가 → `일치하는 프리셋 없음`
  으로 묶이고 응답에 `warnings: ['preset_store_unreadable']`를 실어 카드 격자
  위에 한 줄로 보인다.
- `get-compare` 실패는 현행대로 오류 한 줄과 `새로고침`.
- 기록(§6)은 fail-closed가 아니다: 적용 시점 기록 실패는 적용 자체를 실패시키지
  않고(같은 쓰기이므로 원자적이다) dispatch의 `exec_preset`은 읽지 못하면
  `null`이다.

## 8. 테스트

- `compare-projection.test.js`: 결과 사다리 8단계(특히 `superseded`가 같은 Bead의
  마지막 `done`만 남기는 것, `quickfix_landing.reason === null`, `closed`, 스냅샷
  부재 `unknown`), 착지율 분모, 문제 신호 넷과 타임라인 부재 fail-quiet, `review`
  가 마지막 `done`에만 붙는 것, 프리셋 대조(기록 우선·삭제된 프리셋·`deviated_
  keys`·추론의 `auto` 와일드카드·런타임 역매핑·구체 점수·동률 `null`·후보 없음),
  묶기 축 셋의 키, 평균·중앙값·표본, `partial_count`, `best` 규칙(`n ≥ 3`·동률
  없음), `summary`, 서버 기본 정렬.
- `compare-handlers.test.js`: `group_by` 정규화와 `issue_types` 무시.
- `queue-store.test.js`·`scheduler.test.js`·`exec-preset-handlers.test.js`
  (또는 `exec-preset-apply.test.js`): 전역 적용이 `applied_exec_preset`를 같은
  쓰기에 남기고, 직접 편집 경로 넷이 지우며, dispatch가 `exec_preset`과
  `deviated_keys`를 기록하고, 과거 기록은 `null`로 읽히는 것.
- `app/views/compare/index.test.js`: 카드 렌더(배지·KPI·칩·최고 표시), 펼침이
  새로고침 뒤 유지, 정렬 select, 묶기 축 변경이 `group_by`로 재요청, 세션 행
  딥링크, 실험 절이 접힌 채 폼·목록을 담는 것, `format.js` 새 포맷터.
- 모바일은 Pre-Handoff에서 headless Chrome 스크린샷(390px iframe)으로 §3.4 배치를
  눈으로 확인한다(레이아웃은 단위 테스트 대상이 아니다).
- 프론트 편집 뒤 `npm run build`(prettier → build 순서).

## 구현 unit 후보

참고용이며 구속하지 않는다.

1. 기록 — `server/ws/exec-preset-handlers.js`·`mutation-handlers.js`·
   `session-defaults-handlers.js`·`worker-handlers.js`·`queue-store.js`·
   `scheduler.js`(§6).
2. 투영 — `server/worker/compare-projection.js`·`server/ws/compare-handlers.js`
   ·`app/protocol.md`(§4·§5).
3. 화면 — `app/views/compare/`·`app/styles.css`(§3).

## 결정 (ADR 후보)

- 전제: ADR 0025 — 이슈 제목·상태·`impl_review_stats`는 워크스페이스 스냅샷
  투영에서 읽고 상세 전용 bd read를 두지 않는다.
- 전제: ADR 0027 — 사람 개입 신호는 bead별 `events.jsonl` 타임라인에서 읽는다.
- 전제: ADR 0029 — 행의 재료는 살아 있는 큐 attempt와 이관된 기록의 합이다.
- 전제: ADR UI-mscc — 비용은 검증된 직접 사용량 합이며 불완전한 범위는 부분
  집계로 표시한다.
- 전제: ADR 0012 — `impl_review_stats`·`close_reason` 어휘는 계약을 코드 field
  registry로 복제해 소비한다.
- **비교의 그룹 단위는 세션이 실제로 돈 프리셋이며, 적용 시점에 기록한
  `applied_exec_preset`을 dispatch가 attempt에 스탬프하고 기록이 없는 과거
  attempt만 오케스트레이션·구현 실행자 축으로 추론하되 리뷰어 축은 대조하지
  않는다** — 되돌리기 어려움: 성립(큐·attempt 기록 형식이 늘고 그룹의 의미가
  바뀐다). 맥락 없이 놀라움: 성립(quick_fix main 실행이 `미대조`로 묶이는 이유,
  리뷰어만 다른 프리셋이 한 그룹이 되는 이유). 실제 트레이드오프: 성립(정확한
  기록 vs 과거 기록의 즉시 활용; 리뷰어 축의 정밀도 vs 표본 유지).
  `summary`: "프리셋 비교의 그룹은 적용 시점에 기록한 applied_exec_preset을
  dispatch가 스탬프한 값이고 기록 없는 attempt만 오케스트레이션·구현 실행자
  축으로 추론하며 리뷰어 축은 대조하지 않는다"
  → ADR
- **비교의 성공은 착지 관측(이슈 closed·quick_fix 착지 기록·무변경 close)이고
  머지 후보 `[verify]` 영수증은 보조 표기다** — 되돌리기 어려움: 성립(성공률의
  의미가 바뀌어 과거 표와 비교할 수 없다). 맥락 없이 놀라움: 성립(검증 스크립트
  통과가 아닌 것이 성공인 이유, 사람이 닫은 이슈도 착지로 세는 이유). 실제
  트레이드오프: 성립(결정적 채점 vs 표본 확보).
  `summary`: "프리셋 비교의 성공은 이슈 closed·quick_fix 착지 기록·무변경 close의
  착지 관측이며 머지 후보 [verify] 영수증은 보조 표기다"
  → ADR
- 문제 신호 네 종 합산, 평균 머리값·중앙값 보조, 카드 배치·최고 표시, 유형 필터
  제거, 실험 절 접기 — 표시 정의이며 언제든 되돌릴 수 있다 → ADR 아님

## 경계·후속

- 관찰: 사람이 PR 없이 닫은 이슈가 `landed`로 세어지는 한계 — 머지 관측
  (`merge_queue`·`done` 항목의 `merge_sha`)이 일관되게 남게 되면 6단계 증거를
  그것으로 좁힌다.
- 관찰: 리뷰 세션(`review_session`)의 비용은 행에 들어가지 않는다 — Bead 단위
  총비용이 필요해지면 같은 `usage` 투영으로 더한다.
- 관찰: 프리셋 revision별 값 이력이 없어 같은 프리셋의 과거 값 변화는 추적하지
  못한다 — `exec_preset.revision`이 쌓인 뒤 필요하면 저장소에 이력을 둔다.
- 관찰: 실험 폼의 원본 이슈·프리셋·반복 선택은 이미 구현돼 있어(선행 스펙 §4.7)
  이번 범위에서 바꾸지 않는다 — 사용자 결정(2026-09-15).
