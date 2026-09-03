---
scope:
  - server/worker/runner-catalog.js
  - server/worker/usage-pricing.js
  - server/worker/exec-enums.js
  - server/worker/compare-projection.js
  - server/worker/bench-runs.js
  - server/worker/queue-store.js
  - server/worker/admission.js
  - server/worker/session-monitor.js
  - server/workflow-enrich.js
  - server/config.js
  - server/ws/connection.js
  - server/ws/compare-handlers.js
  - app/utils/token-usage.js
  - app/utils/report-marker.js
  - app/router.js
  - app/state.js
  - app/views/nav.js
  - app/views/compare/
  - app/views/detail-panel/session-history.js
  - app/views/detail-panel/comments.js
  - app/protocol.md
---

# 모델 프리셋 실사용 비교 — 가격 계산·리뷰 지적 기록·비교 탭·클론 실행

Bead: `UI-n28d`. 작성 2026-09-03.

## 0. 배경과 목표

### 0.1 배경

실행 프리셋(오케스트레이션 모델·강도, 구현 런타임·모델·강도, 리뷰어 세 단계)은
서버 전역 저장소에 있고, 어떤 프리셋으로 돌았는지는 attempt에 `exec_values`,
`model`, `effort`, `speed`로 스냅샷된다. attempt에는 시작·종료 시각, 종료 코드와
실패 원인, `usage`(입출력·캐시 토큰, Claude만 `total_cost_usd`),
위임 leg 합산이 가능한 `usage_legs`, Worker 독립 검증 `verify_result`가 이미
기록되며, 큐를 떠난 attempt도 bead 상태 디렉터리
`beads/<bead_id>/attempts/<attempt_id>.json`에 전체 기록이 남는다(ADR 0027·0029).

비어 있는 것은 둘이다.

- **Codex 가격**: Codex CLI는 비용을 보고하지 않고(`server/worker/runner/codex.js`는
  토큰 분해만 lift), 합산 규칙이 "모든 leg가 가격을 보고할 때만 `$`를 붙인다"라
  Codex leg가 하나라도 섞이면 attempt 전체 가격이 사라진다
  (`app/utils/token-usage.js`).
- **리뷰 지적**: Bead에는 `<리뷰어>@<sha>` 영수증만 남고(`server/workflow-enrich.js`
  `parseReceipt`) 지적 수·판정·라운드는 구조화되지 않는다.

외부 방법론 조사 결과(SWE-bench Verified의 fail-to-pass/pass-to-pass 채점,
tau-bench의 pass^k, HAL의 비용 Pareto·비용 통제, Inspect AI의
dataset/solver/scorer + epochs)에서 이 설계가 가져오는 것은 넷이다: 결정적
채점(검증 통과), 비용을 정확도와 나란히 놓기, 반복 시 pass^k, 격자(이슈 ×
프리셋 × 반복)의 사용자 조정. 숨은 테스트 하네스와 LLM 판정 채점은 가져오지
않는다.

### 0.2 목표

실사용 판단에 필요한 여섯 가지 — 걸린 시간, 실패·재시도, 검증 통과, 리뷰 지적 수와
라운드, 토큰, 가격 — 를 프리셋별로 나란히 보고, 필요하면 이슈 하나를 프리셋
여러 개로 돌려 같은 표로 비교한다.

### 0.3 비목표

- 헤맴(과정) 지표 — 도구 오류 수, 테스트 왕복 수, 편집 churn — 는 이번 범위에서
  뺀다(사용자 결정 2026-09-03). 결과 지표에 그 영향이 이미 반영되며 세션 로그가
  보존되는 동안은 나중에 백필할 수 있다.
- 숨은 테스트 하네스, LLM 판정 품질 점수, 정확도 대 비용 점 그래프.
- 리뷰 지적의 종류(정확성/스코프) 구분. 리뷰 스킬 출력에 종류 필드가 없다.
- spec_backed 원본의 클론 실행(§4.1).
- 헤맴 지표를 위한 어댑터·저장 변경.

## 1. 가격 계산

### 1.1 단가표

config.toml `[runner]` 절의 모델 항목에 `price` 객체를 둔다. 단위는 백만 토큰당
USD다.

```toml
[runner.codex.models.sol.price]
input = 2.5
output = 10.0
cache_read = 0.25
cache_write = 0.0
```

- `server/worker/runner-catalog.js`의 병합기는 지금 `id`·`efforts`·
  `orchestration_efforts`·`speed_tiers`만 받아들인다. `price`를 허용 키에 더한다.
  네 필드는 모두 선택이고, 유한한 0 이상 숫자가 아닌 필드는 그 필드만 버린다.
  `price` 객체가 통째로 없거나 객체가 아니면 그 모델은 단가 없음이다.
- 내장 기본 단가는 두지 않는다. 단가는 외부 사실이라 금방 낡고, 없으면 "단가 없음"
  으로 조용히 비운다.
- `price`는 클라이언트가 이미 받는 `runner_catalog`에 그대로 실려 간다.

### 1.2 계산 규칙 (`server/worker/usage-pricing.js`)

순수 함수 하나 `priceUsage(record, model, catalog)`가 leg 하나의 가격을 낸다.
반환은 `{ usd, basis }`이며 `basis`는 `reported`·`computed`·`estimated`·`none`
중 하나다.

1. `record.total_cost_usd`가 유한한 숫자면 그 값을 쓰고 `basis=reported`.
   Claude CLI 보고값이다.
2. 아니면 모델을 카탈로그 이름으로, 실패하면 카탈로그 `id`로 대조한다. 둘 다
   실패하거나 대조한 모델에 `price`가 없으면 `basis=none`.
3. 분해가 있으면 `input_tokens × input + output_tokens × output +
   cache_read_input_tokens × cache_read + cache_creation_input_tokens ×
   cache_write`(백만 토큰당 단가이므로 1e6으로 나눈다). `basis=computed`.
   Codex의 `reasoning_output_tokens`는 출력의 부분집합이라 따로 곱하지 않는다.
   없는 필드는 0이다.
4. 분해 없이 `total_tokens`만 있으면(Claude 백그라운드 서브에이전트 leg) 전부
   `input` 단가로 계산하고 `basis=estimated`.

가격은 저장하지 않고 표시 시점에 계산한다. 토큰 분해가 기록에 있으므로 단가를
바꾸면 과거 attempt도 새 단가로 다시 보인다.

### 1.3 합산과 표기

- 지금의 "모든 leg가 보고했을 때만 `$`"를 "가격이 있는 leg의 합 + 단가 없는 leg
  수"로 바꾼다. 표기는 `$1.23`이고 `basis=none`인 leg가 있으면
  `$1.23 (+2 leg 단가 없음)`이다. 부분 합계를 완전한 것처럼 보이게 하지 않는
  원칙은 이 표기가 이어받는다.
- 하나라도 `estimated`가 섞이면 툴팁에 `총량만 보고된 leg 포함 — 입력 단가로
  추정`을 붙인다.
- 모든 계산값의 툴팁에 `API 환산 단가 기준`을 붙인다. Claude 보고값도 API 환산
  이므로 같은 문구다. ChatGPT 구독으로 도는 Codex의 실제 한계비용이 0이라는
  사실은 이 문구가 담당한다.
- 소비처는 셋이고 모두 같은 모듈을 쓴다: Worker 탭 토큰 칩과 완료 KPI, Monitor
  상단 KPI(`app/views/monitor/usage.js`), 상세 패널 세션 이력
  (`app/views/detail-panel/session-history.js`). 클라이언트는
  `server/worker/usage-pricing.js`를 직접 import한다 — 선례는
  `app/views/monitor/drop-plan.js`가 `server/worker/lane-order.js`를 쓰는 것.
- **leg별 가격**: 상세 패널 세션 이력이 leg마다 펼쳐 보이는 토큰 분해 옆에 그 leg의
  가격과 `basis`를 붙인다(`reported`는 표기 없음, `computed`는 `계산`,
  `estimated`는 `추정`, `none`은 `단가 없음`).

## 2. 리뷰 결과 기록과 읽기

쓰는 쪽은 dotfiles 리뷰 스킬(controller)이며, Worker가 띄우는 자동 리뷰
세션(ADR 0019·0021)도 같은 스킬을 쓴다. beads-ui는 읽기만 한다(ADR 0012).
계약 정의는 dotfiles `docs/contracts/workflow-state.yaml`이 소유하고, 이 절은
beads-ui가 소비할 형태를 적는다. dotfiles 쪽 작업은 §5.

### 2.1 metadata 키

리뷰 단계마다 하나씩, 영수증과 같은 이름 규칙으로 `spec_review_stats`,
`impl_review_stats`, `plan_review_stats`.

```
<step>_review_stats = r<라운드>:b<blocking 수>/m<minor 수>:<APPROVE|REVISE>@<40hex sha>
예: impl_review_stats=r2:b0/m3:APPROVE@1a2b…(40hex)
```

- 리뷰가 끝날 때마다 덮어쓴다. 항상 마지막 라운드가 남고 `r`이 그 lineage의
  라운드 수다.
- 라운드는 같은 단계에서 APPROVE가 나올 때까지 센 횟수다. APPROVE 뒤 같은 단계에
  다시 리뷰가 걸리면(stale 재리뷰 등) r1부터 다시 센다.
- 영수증을 쓰는 같은 `bd update`에 넣고 함께 readback한다. REVISE 라운드는
  영수증 없이 stats 키와 댓글만 쓴다.

### 2.2 라운드별 댓글

리뷰마다 댓글 하나. 첫 줄은 고정 헤더 `## 🔎 리뷰 결과 · <step> · r<n>`
(`<step>`은 `spec`·`impl`·`plan`), 둘째 줄은 `VERDICT: APPROVE|REVISE`, 그 뒤에
리뷰 스킬 출력의 지적 목록을 형식 그대로(`severity | 위치 | 문제 | 최소 수정`)
옮긴다. 지적이 없으면 `- 지적 없음` 한 줄.

### 2.3 beads-ui 읽기

- `server/workflow-enrich.js`에 `parseReviewStats(value)`를 더한다. 영수증 파서와
  같은 꼴이며 정규식에 맞지 않는 값과 부재는 `null`이다. 이슈 투영에
  `review_stats: { spec, impl, plan }`로 노출하고 각 값은
  `{ round, blocking, minor, verdict, sha }|null`이다.
- 계약 키 세 개는 코드의 field registry에 복제한다(ADR 0012).
- 카드에는 새 칩을 달지 않는다. 소비처는 비교 표(§3)와 상세 패널뿐이다.
- 상세 패널 댓글은 `app/utils/report-marker.js`의 작업 보고서 헤더 인식과 같은
  방식으로 리뷰 결과 헤더를 알아보고, 작업 보고서와 같은 접힌 카드 꼴로 그린다
  (`app/views/detail-panel/comments.js`). 인식 실패는 보통 댓글이다.
- 신선도: 표시용이라 ancestry 판정을 하지 않는다. `sha`는 그대로 보여 주고 영수증
  쪽 stale 표시가 그 역할을 이미 한다.

## 3. 비교 탭 — 실작업 보기

### 3.1 탭

Board·Worker·Monitor 옆 네 번째 탭 `비교`, 해시 `#/compare`. `app/router.js`,
`app/state.js`의 `ViewName`, `app/views/nav.js`를 넷으로 넓힌다. 프리셋이 서버
전역이므로 Monitor처럼 보이는 저장소 전체를 한 표에 놓고 저장소 필터로 좁힌다.

### 3.2 행

종단에 도달한 구현 attempt(`kind=implementation`, status가 terminal) 하나가 행
하나다. `review_session`과 `retired_kind`는 제외한다. 재료는 큐에 살아 있는
attempt와 이관된 attempt 기록이며 Worker 핸들러가 쓰는 같은 읽기 함수
(`server/ws/worker-handlers.js`의 `transferredAttemptsFor` 계열)를 재사용한다.

| 열 | 재료 | 비어 있을 때 |
| --- | --- | --- |
| 시간 | `finished_at − started_at` | 둘 중 하나 없으면 `—` |
| 실패·재시도 | `status`·`cause`·`retry.attempts` | 실패 아니면 `—`, 재시도 0이면 생략 |
| 검증 | `verify_result` → 통과/실패/없음 | 없음 |
| 리뷰 지적·라운드 | Bead `impl_review_stats` (`b/m`, `r`) | `—` |
| 토큰 | `usage` + `usage_legs` 제공자별 소계 (기존 projection) | `—` |
| 가격 | §1 합산 | `—` 또는 `(+n leg 단가 없음)` |

리뷰 열은 Bead 단위 값이라 그 Bead의 **마지막 성공 attempt**에만 붙이고 같은
Bead의 다른 attempt 행은 비운다.

### 3.3 서명과 묶기

- 구현 축 서명은 핀된 설정이 아니라 **실제 실행자**로 만든다. Bead의
  `exec_receipt`(`parseExecReceipt`)에서 `delegated:<model>:<effort>` 또는
  `main:<label>`을 얻고, attempt의 `model`·`effort`(오케스트레이션 스냅샷)와
  합쳐 서명 `<orch_model>/<orch_effort> → <impl_actor>`를 만든다.
  `exec_receipt`가 없는 Bead는 `impl_actor=미기록`으로 묶는다. quick_fix에서
  main이 직접 구현한 attempt는 `exec_values.impl_model`이 무엇이든
  `main`으로 묶인다 — 설정값이 아니라 실행이 비교 대상이기 때문이다.
- 서명이 저장된 프리셋 하나와 그 프리셋이 가진 키에서 정확히 일치하면 그룹
  이름은 프리셋 이름, 둘 이상이면 첫 일치(저장 순), 없으면 서명 문자열이다.
- 리뷰어 세 키(`impl_review_model/effort/speed`)는 열로만 보이고 묶는 기준이
  아니다.

### 3.4 집계·정렬·필터

- 그룹 집계: 건수 `n`, 성공률(종료 성공이면서 `verify_result`가 실패가 아닌
  비율), 실패 건수, 재시도 합, 시간·토큰·가격·blocking·minor·라운드는 중앙값.
  값이 없는 행은 그 열의 표본에서 빼고 표본 수를 `n=3/5`처럼 적는다.
- 그룹을 펼치면 개별 attempt 행이 나온다. 행 클릭은 기존 이슈 상세 딥링크
  (`#/compare?issue=<id>`; 라우터의 `issue` 파라미터 규칙을 그대로 따른다).
- 필터: 기간(`CLOSED_RANGE_OPTIONS`, attempt `finished_at` 기준), 저장소,
  이슈 유형, route(`quick_fix`·`spec_backed`·`full_plan`), bench 실험 포함 여부
  (기본 제외 — §4의 클론은 실험 보기에서 본다).
- 기본 정렬: 성공률 내림차순, 같으면 가격 중앙값 오름차순.

### 3.5 데이터 경로

- 새 서버 모듈 `server/worker/compare-projection.js`: 입력은 워크스페이스 목록·
  필터·프리셋 목록·카탈로그, 출력은 `{ rows, groups }`. 순수 함수와 파일 읽기를
  나눠 순수 부분을 단위 테스트한다.
- ws는 요청·응답 한 쌍 `get-compare` → `compare-snapshot`
  (`server/ws/compare-handlers.js`, `app/protocol.md`에 등록). 탭을 열 때와
  필터를 바꿀 때 요청하고 `새로고침` 버튼을 둔다. 실시간 push는 하지 않는다 —
  파일 수십 개를 Worker 갱신마다 다시 읽을 이유가 없다.
- 이슈 제목·유형·route·`review_stats`·`exec_receipt`는 워크스페이스 스냅샷
  투영에서 가져온다(ADR 0025). 스냅샷에 없는 Bead(닫힌 지 오래됨)는 ID만 보인다.

### 3.6 표만

정확도 대 비용 점 그래프는 넣지 않는다. 그룹 수가 서너 개면 표로 충분하고,
필요해지면 같은 `groups` 데이터로 붙인다.

## 4. 클론 실행

### 4.1 대상 제한

원본은 `route=quick_fix`인 이슈만 받는다. 결정적이고 닫힌 일이어야 비교가 되고,
spec_backed는 스펙 영수증 복제와 PR 억제가 따로 필요하다.

결정: 이번 버전의 원본은 `route=quick_fix`뿐이다 — spec_backed 원본은 필요해질 때
확장한다(§경계·후속).

### 4.2 실험 입력

| 입력 | 값 | 기본 |
| --- | --- | --- |
| 원본 이슈 | quick_fix Bead 하나 | — |
| 프리셋 | 전역 프리셋 저장소에서 여러 개 | — |
| 반복 | 1~5 | 1 |
| 리뷰어 | `고정` 또는 `프리셋 값` 토글 | 고정 |
| 고정 리뷰어 | `impl_review_model/effort/speed` | 직전 실험 값, 없으면 `fable`·`xhigh`·`default` |
| base | 워크스페이스 선언 base의 현재 tip SHA | 실험 생성 시점에 읽어 핀 |

### 4.3 클론 Bead

- 제목 `[bench] <원 제목> · <프리셋명> #<k>`.
- 본문은 원본과 **바이트 단위로 같게** 복사한다. quick_fix 자기 리뷰 영수증
  `quick_fix_review=self@<digest>`는 본문 sha256 앞 12자리에 묶여 있으므로
  (`check-quick-fix-handoff.py body_digest`), 본문을 그대로 두고 영수증 값을
  함께 복사하면 Worker 입장 검사를 그대로 통과한다.
- 유형·우선순위·area 라벨을 복사하고 `bench` 라벨을 단다.
- metadata:
  - `route=quick_fix`, `quick_fix_review=<원본 값>`
  - 프리셋의 실행 키 전부(`IMPL_PRESET_KEYS` 중 프리셋이 가진 것). 리뷰어 토글이
    `고정`이면 `impl_review_model/effort/speed` 세 키를 고정값으로 덮어쓴다.
  - `impl_dispatch=delegated` — quick_fix의 기본 dispatch는 `main`이라 이 핀이
    없으면 프리셋의 구현 런타임·모델이 쓰이지 않는다. 클론은 항상 위임한다.
  - `bench_run=<run_id>`, `bench_cell=<preset_id>:<k>`, `bench_source=<원 ID>`
  - `landing=none` (§5.2)
- 의존 간선은 만들지 않는다. `related`는 형제 금지 규칙과 부딪히고
  `discovered-from`은 후속 의미가 붙는다. 연결은 `bench_source`가 맡는다.
- 생성 경로는 기존 `create-issue`와 `update-exec-settings` 뮤테이션을 서버 안에서
  순서대로 부르는 새 핸들러 `bench-run-create`다.

### 4.4 배치와 실행

- 생성한 클론을 기존 레인 배치 경로로 병렬 큐에 넣는다. 동시 실행 상한은 슬롯
  수 그대로다.
- 실행은 보통 quick_fix와 같다. 구현 리뷰 게이트도 그대로 돌아 §2의 stats가
  남는다. 다만 위임이 강제되므로 평소 quick_fix 실행(main)과는 다르다는 사실을
  실험 표 머리에 `구현 위임 강제`로 적는다.

### 4.5 착지 금지 — beads-ui 쪽 강제

계약(§5.2)을 지키는 세션은 push하지 않는다. 다음 두 겹은 사고 방지다.

1. **완료 판정**: `landing=none`인 Bead가 PR 없이 `closed`로 관측되면 성공이다.
   `done_kind=bench`를 무변경 종결 계열(`refuted`·`no_delta`)에 더한다
   (`server/worker/admission.js`·`queue-store.js`의 완료 판정).
2. **push 가드**: bench attempt(Bead metadata에 `bench_run`이 있는 attempt)의
   세션에서 `git push`를 잡는 kill 규칙을 Worker 가드에 더한다
   (`server/worker/session-monitor.js`, ADR 0007의 패턴). 발동하면 그 셀은
   `guard_kill`로 failed이고 실험은 계속된다.

### 4.6 정리

- 셀이 전부 종단하면 서버가 클론 워크트리와 로컬 브랜치를 기존 `branch_cleanup`
  경로로 지운다. 클론은 push한 적이 없으므로 원격 정리는 없다.
- 세션이 닫지 못한 채 실패한 셀은 서버가 `bd close --reason bench:failed`로
  닫는다. 클론 생성 도중 실패하면 이미 만든 클론을 `bench:aborted`로 닫고 실험을
  만들지 않는다.
- attempt 기록·세션 로그·타임라인은 그대로 남아 비교 표가 읽는다.

### 4.7 실험 기록과 보기

- 워크스페이스 상태 디렉터리에 `bench/<run_id>.json` 매니페스트
  (`server/worker/bench-runs.js`):
  `{ run_id, source_bead_id, base_sha, presets: [{ id, name }], repeats,
  reviewer_mode, reviewer, delegate_forced: true, cells: [{ preset_id, k,
  bead_id, attempt_id, status }], created_at }`. 셀의 `attempt_id`·`status`는
  큐 관측으로 갱신한다.
- 비교 탭 위쪽에 실험 목록(원본 제목·프리셋 수·반복·생성 시각·진행 `3/9`)을
  두고, 실험을 고르면 §3과 같은 여섯 열을 프리셋별로 묶어 보인다. 반복이 2 이상이면
  성공률 옆에 `pass^k`(k번 모두 성공한 비율)를 함께 쓴다.
- 실험 만들기 폼은 같은 탭의 `새 실험` 버튼이 연다. 원본 이슈는 검색 입력(제목·ID)
  이며 `route=quick_fix`가 아닌 이슈는 고를 수 없고 그 사유를 보인다.

### 4.8 Board 숨김

`bench` 라벨 Bead는 Board 목록에서 기본 제외하고 표시 설정 다이얼로그에
`bench 포함` 토글을 둔다. Worker 탭은 실행 주체라 그대로 보이며, 새 칩 없이
라벨로만 구분한다(카드 슬롯 표 변경 없음).

## 5. dotfiles 계약 변경 (Bead A)

beads-ui는 소비자다(ADR 0012, AGENTS.md "Workflow 계약의 canonical 소유권").
아래는 dotfiles rig의 Bead 하나 `dotfiles-12su`로 뗀다(같은 저장소·소유자·검증
묶음). `bench:` close 접두가 dotfiles ADR 0037(무변경 close는 두 접두, 세션이
닫는다)과 충돌해 supersede ADR이 필요하므로 그쪽 route는 `spec_backed`이고, 이
절은 요구 사항이지 그쪽 설계의 확정이 아니다. 이 Bead(`UI-n28d`)가 그 Bead를
`blocks`로 기다리며, §1과 §3은 그 Bead 없이 착지 가능하고 §2 읽기는 부재를
fail-quiet로 처리하므로 실제로 막히는 것은 §4뿐이다.

### 5.1 리뷰 결과 기록 (A1)

- `docs/contracts/workflow-state.yaml`에 `spec_review_stats`·`impl_review_stats`·
  `plan_review_stats` 키(형식은 §2.1)와 댓글 헤더 `## 🔎 리뷰 결과 · <step> · r<n>`
  등록.
- 리뷰 스킬의 영수증 쓰기 절차에 stats 키(같은 `bd update`)와 라운드 댓글 추가,
  readback 포함. REVISE 라운드는 영수증 없이 stats·댓글만.

### 5.2 착지 금지 (A2)

- metadata 키 `landing=none` 등록. 있으면 workflow 마무리는 검증까지만 하고
  push·PR·배포를 하지 않는다. `impl_review`와 stats는 평소처럼 쓴다.
- 세션은 `bd close <id> --reason bench:<run_id>`로 닫고 결과 줄
  `성공 · bench`로 끝난다. `close_reason` 접두 `bench:` 등록.
- 완료 보고서 댓글 의무는 그대로다.

## 6. 오류 처리

- 표시는 fail-quiet: 단가·stats·usage·`exec_receipt` 부재는 빈 칸 또는
  `미기록` 그룹이다.
- 실행은 fail-closed: base tip을 못 읽으면 실험을 시작하지 않는다. 클론 생성
  중 하나라도 실패하면 §4.6대로 중단한다. 원본이 quick_fix가 아니거나
  `quick_fix_review`가 없으면 폼이 막는다.
- `get-compare` 실패는 표 자리에 오류 한 줄과 `새로고침`이다.

## 7. 테스트

- `usage-pricing.test.js`: 보고값 우선, 분해 계산, 총량만 추정, 대조 실패, 필드
  일부 누락, 카탈로그 이름 vs `id` 대조.
- `token-usage.test.js`: 부분 단가 표기 `(+n leg 단가 없음)`, 추정 툴팁.
- `runner-catalog.test.js`: `price` 병합·불량 필드 버림.
- `workflow-enrich.test.js`: `parseReviewStats` 정상·불량·부재.
- `compare-projection.test.js`: 서명(`exec_receipt` 우선·미기록), 프리셋 이름
  대조, 중앙값·표본 수, `pass^k`, 필터, 리뷰 열의 마지막 성공 attempt 귀속.
- `bench-runs.test.js`: 클론 본문 바이트 동일·영수증 복사·metadata 핀·리뷰어
  덮어쓰기·`impl_dispatch=delegated`, 생성 중 실패 시 aborted, 셀 상태 갱신.
- `admission`/`queue-store`: `done_kind=bench` 완료 판정.
- `session-monitor.test.js`: bench attempt의 `git push` kill.
- 프론트: 라우터·nav 4번째 탭, Board `bench` 숨김·토글, 상세 패널 리뷰 결과
  댓글 카드, leg별 가격.
- 프론트 편집 뒤 `npm run build` 산출물 포함(prettier → build 순서).

## 구현 unit 후보

참고용이며 구속하지 않는다. ①②③은 dotfiles 없이 착지 가능하고 ④만 A2를
기다린다. 스펙 승인 뒤 router가 full_plan으로 재판정할 수 있다.

1. 가격 계산과 표기 — `server/worker/usage-pricing.js`, `runner-catalog.js`,
   `app/utils/token-usage.js`, 세션 이력 leg별 가격.
2. 리뷰 stats 읽기와 댓글 카드 — `server/workflow-enrich.js`,
   `app/views/detail-panel/comments.js`, field registry.
3. 비교 탭과 투영 — `server/worker/compare-projection.js`,
   `server/ws/compare-handlers.js`, `app/views/compare/`, 라우터·nav·state.
4. 클론 실행·가드·정리·실험 보기 — `server/worker/bench-runs.js`, 완료 판정,
   push 가드, Board 숨김.

## 결정 (ADR 후보)

- **가격은 저장하지 않고 표시 시점에 config 단가표로 계산하며 Claude 보고값이
  있으면 그것을 우선한다** — 되돌리기 어려움: 성립(저장으로 바꾸면 과거 attempt
  재계산 경로와 두 값의 충돌 규칙이 필요하다). 맥락 없이 놀라움: 성립(같은
  attempt의 가격이 단가 변경 뒤 달라 보이는 이유). 실제 트레이드오프: 성립(단가
  변경의 즉시 반영 vs 그 시점 실제 청구액의 보존).
  `summary`: "토큰 가격은 저장하지 않고 표시 시점에 config [runner] 단가표로
  계산하며 CLI 보고값이 있는 leg는 그 값을 우선한다"
  → ADR
- **비교의 구현 축 서명은 핀된 실행 설정이 아니라 exec_receipt의 실제 실행자다**
  — 되돌리기 어려움: 성립(그룹 이름·과거 실험 표의 의미가 바뀐다). 맥락 없이
  놀라움: 성립(`impl_model`을 핀했는데 `main` 그룹에 묶이는 이유). 실제
  트레이드오프: 성립(설정 의도 vs 실제 실행; quick_fix의 main 기본값이 둘을
  갈라놓는다).
  `summary`: "프리셋 비교의 구현 축은 핀된 exec_values가 아니라 exec_receipt가
  기록한 실제 실행자로 묶는다"
  → ADR
- **bench 클론은 landing=none으로 착지하지 않고 세션이 bench: 사유로 닫으며
  Worker는 PR 없는 closed를 성공으로 판정한다** — 되돌리기 어려움: 성립(계약
  키와 완료 판정 계열이 늘어난다). 맥락 없이 놀라움: 성립(PR 없이 닫힌 Bead가
  실패가 아닌 이유). 실제 트레이드오프: 성립(리뷰까지 실제 경로를 태우되 착지만
  막는 것 vs 별도 실행 모드).
  `summary`: "bench 클론은 landing=none으로 push·PR·배포 없이 리뷰까지만 돌고
  세션이 bench: 사유로 닫으며 Worker는 그 closed를 성공으로 판정한다"
  → ADR
- 헤맴 지표 제외, 표만(그래프 없음), quick_fix 원본 제한 — 범위 결정이며 언제든
  되돌릴 수 있다 → ADR 아님

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | awaited_by_consumer | different_repository — §5 A1·A2 계약 변경(리뷰 stats 키·댓글, `landing=none`·`bench:` close 사유). `bench:` 접두가 dotfiles ADR 0037(무변경 close 두 접두)과 충돌해 supersede가 필요하므로 그쪽 route는 `spec_backed` | 없음 | dotfiles-12su |

- 관찰: spec_backed 원본의 클론 실행 — 스펙 영수증 복제와 PR 억제 규칙이 더
  필요해 이번엔 빼며, 실작업 보기로 부족할 때 확장한다.
- 관찰: 헤맴 지표(도구 오류·테스트 왕복·편집 churn) — 사용자 결정으로 제외.
  세션 로그가 보존되는 동안은 백필 가능.
- 관찰: 정확도 대 비용 점 그래프 — §3.6.
