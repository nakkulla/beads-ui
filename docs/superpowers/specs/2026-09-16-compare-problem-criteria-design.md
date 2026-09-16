---
scope:
  - server/worker/compare-projection.js
  - server/worker/compare-projection.test.js
  - server/ws/compare-handlers.js
  - server/ws/compare-handlers.test.js
  - app/utils/compare-problem-criteria.js
  - app/utils/compare-problem-criteria.test.js
  - app/views/compare/
  - app/styles.css
  - app/protocol.md
---

# 비교 탭 문제율 기준 조절 — 서버 기본 기준, 팝오버 조절, 환경 요인 분리와 신규 기준

## 문서 상태

- Bead: `UI-8f1h`
- 경로: `spec_backed`; beads-ui 안에서 하나의 구현·검증·인도 묶음으로 처리한다.
- 기준: `origin/main` / `3f839ad214aa4f8fef2fbbb7d92798f3c77db089`
- 상태: 사용자 검토용 완성 초안. 구현·스펙 게이트 승인 전이다.
- 화면 미리보기: 없음. 팝오버 항목·범례 문구는 §3에 텍스트로 확정한다.
- 선행 스펙: `2026-09-15-compare-tab-redesign-design.md`(UI-4g7p, 이하 "선행
  스펙"). 이 문서는 그 §4.3(문제 신호)을 대체하고 §3.1의 조작 줄·요약 띠·범례와
  §3.2 문제 내역 칩, §3.3 세션 행 칩, §5 payload를 확장한다. §4.2(결과·착지)·
  §4.4(프리셋 대조)·§4.5(묶기 축)·§6(기록)은 그대로다.

## 1. 사용자 결과와 확인한 원인

사용자는 워커 세션이 "잘 진행됐는지"를 프리셋·모델별로 비교하고 싶다.
2026-09-16 논의에서 세션이 PR 시점에 스스로 매기는 점수는 채점자가 비교 대상
(모델·프리셋)과 겹쳐 비교 축으로 부적합하다고 판정했고, 대신 관측 가능한 신호를
합산하는 **문제율**을 기본 기준 + 사용자 조절로 개선하기로 했다.

현행(선행 스펙 §4.3, `server/worker/compare-projection.js` `row.problems`)의
한계는 다음과 같다.

1. **기준이 고정이다.** 실패·재시도·리뷰(`round ≥ 2` 또는 `blocking ≥ 1`)·사람
   개입 네 불리언이 코드 상수이고, 사용자가 항목을 끄거나 임계값을 바꿀 수 없다.
2. **환경 요인이 세션 몫으로 섞인다.** `is_retry`는 재개 출처를 가리지 않아
   공급자 장애 뒤 자동 재시도(`attempt.retry` env 사다리)와 자동 재개
   (`auto_resume_kind`)가 세션의 재시도로 센다. `queue_hold` 이벤트는 `환경
   보류`·`시스템 보류` 둘 다 사람 개입으로 센다.
3. **이미 기록된 신호를 쓰지 않는다.** 리뷰 `minor`, 머지 후보 `[verify]` 실패
   (`row.verify === 'fail'`), 프리셋 핀 조정(`preset.deviated_keys`), 세션
   시간·비용의 이상치는 행에 있지만 문제 신호에 오르지 않는다.
4. **기준이 화면에 없다.** 범례는 문장 하나로 고정돼 있어 기준이 바뀌면 두
   사람이 같은 탭에서 다른 숫자를 보고도 알 수 없다.

사용자 결정(2026-09-16): 기본 기준은 서버 상수, 조절은 비교 탭 조작 줄의 팝오버,
집계는 서버 한 곳, 저장은 뷰 로컬(localStorage), 기본값과 다르면 범례·요약 띠에
드러낸다. 시간·비용 초과의 기준선은 **필터 결과 전체 중앙값의 N배**다. 사후 수정
(사람 추가 커밋·후속 fix Bead·revert)은 새 수집이 필요해 범위 밖이다.

## 2. 검토한 접근과 선택

1. **요청 payload로 기준을 보내고 서버가 판정·집계**(선택). 기준 스키마·기본값·
   정규화는 서버와 클라이언트가 함께 import하는 의존성 없는 leaf에 두고, 판정은
   필터 뒤로 옮겨 필터 결과의 중앙값을 기준선으로 쓴다. 응답이 유효 기준을 되돌려
   주므로 범례는 서버가 실제로 쓴 기준을 그대로 적는다.
2. 클라이언트 재계산. 응답 한 번으로 즉시 반응하지만 판정과 그룹 집계 로직이 두
   곳이 되고 `best`·정렬까지 다시 계산해야 한다.
3. 워크스페이스 kv에 기준 저장(모든 뷰어 공유). 화면 간 숫자가 일치하지만 서버
   쓰기 op가 늘고 사용자가 뷰 로컬 저장을 택했다. 공유는 §경계·후속의 관찰로
   남긴다.

선택 1은 같은 저장소의 한 설계다. 공유 leaf·서버 투영·화면은 호환을 맞춘 하나의
PR로 검증한다.

## 3. 화면

### 3.1 조작 줄과 `문제 기준` 팝오버

선행 스펙 §3.1의 조작 줄에서 정렬 select 뒤, `새로고침` 앞에 `<details
class="cmp-criteria">`를 둔다. `<summary class="op-btn">`의 문구는 `문제 기준`이고
유효 기준이 기본값과 다르면 `문제 기준 ●`(점은 `.cmp-criteria__dot`)다. 패널
(`.cmp-criteria__panel`)은 데스크톱에서 버튼 아래에 뜨는 폭 320px 절대 배치이고,
항목은 §4.1의 키 순서대로 한 줄씩이다.

| 줄 | 체크박스 라벨 | 같은 줄의 보조 조작 |
| --- | --- | --- |
| 1 | `실패·폐기` | 없음 |
| 2 | `재시도·재개` | `☐ 환경 요인 포함` |
| 3 | `리뷰 지적` | `라운드 ≥ [2]` `blocking ≥ [1]` `minor ≥ [ ]`(빈칸 = 안 봄) |
| 4 | `사람 개입` | `☐ 환경 이벤트 포함` |
| 5 | `verify 실패` | 없음 |
| 6 | `시간 초과` | `중앙값 × [3]` |
| 7 | `비용 초과` | `중앙값 × [3]` |
| 8 | `핀 조정` | 없음 |
| 끝 | `[기본값으로]` 버튼(`.op-btn`) | 기본값이면 비활성 |

- 체크박스를 끄면 그 줄의 보조 조작은 비활성(값은 유지)이다.
- 숫자 입력은 `<input type="number">`이며 `change`에서 §4.1 허용 범위로 자른
  뒤 저장·재요청한다. 체크박스·토글도 `change`마다 저장·재요청한다. 재요청은 기존
  `fetchSnapshot`이고 `request_seq`가 늦은 응답을 버린다.
- `[기본값으로]`는 저장값을 지우고 재요청한다.
- 패널 안 조작은 `<details>`를 닫지 않는다(`<summary>` 클릭만 닫는다).

### 3.2 요약 띠·카드·범례

- **요약 띠** `문제 세션` 타일: 유효 기준이 기본값과 다르면 보조 줄 끝에
  `· 기준 조정됨`(`.cmp-note`)을 붙인다.
- **카드 문제 내역 칩**: 유효 기준에서 켜진 키만, §4.1 순서로 그린다. 라벨은
  `실패·폐기` `재시도` `리뷰 지적` `사람 개입` `verify 실패` `시간 초과` `비용 초과`
  `핀 조정`. 0은 기존처럼 흐리게(`is-zero`).
- **범례** 한 줄은 응답의 유효 기준으로 조립한다. 형식:
  `착지율 = ...(기존 문장 그대로). 문제 세션 = 다음 중 하나라도 해당: <켜진 기준을
  ` · `로 이어 쓴 것>. 평균은 ...(기존 문장 그대로).` 기준별 문구:
  - `실패·폐기`
  - `재시도·재개(환경 제외)` / 포함이면 `재시도·재개(환경 포함)`
  - `리뷰 r≥2 또는 b≥1`(설정된 임계값만 나열, minor가 있으면 `m≥k` 추가)
  - `사람 개입(환경 이벤트 제외)` / 포함이면 `사람 개입(환경 이벤트 포함)`
  - `verify 실패`
  - `시간 > 중앙값 42분 ×3`(중앙값은 `formatDuration`) / 표본 부족이면
    `시간 초과(표본 5건 미만으로 비활성)`
  - `비용 > 중앙값 $2.10 ×3`(중앙값은 `formatCostMedian`) / 표본 부족이면
    `비용 초과(표본 5건 미만으로 비활성)`
  - `핀 조정`
  켜진 기준이 하나도 없으면 `문제 세션 = 기준 없음(문제율 —)`.

### 3.3 세션 행 칩

선행 스펙 §3.3의 칩에 더한다. 칩은 `row.problems`가 참인 키만 그린다(핀 조정
예외는 아래).

| 키 | 칩 문구 | title |
| --- | --- | --- |
| `retry` | `재시도` / 환경 재시도가 포함되어 참이면 `재시도(환경)` | `<origin attempt id> · <종류: env 사다리 <cause> / 자동 재개 <auto_resume_kind> / 재개>` |
| `review` | 기존 `리뷰 r2`·`리뷰 b1`에 `리뷰 m3`(minor로만 걸렸을 때) 추가 | 기존 |
| `verify` | `verify 실패` | `merge_verify` → `머지 후보 [verify] 실패`, `bench_verify` → `bench 검증 실패` |
| `duration` | `시간 ×3.4`(값 ÷ 중앙값, 소수 1자리) | `<formatDuration(값)> · 중앙값 <formatDuration(기준)> × <factor>` |
| `cost` | `비용 ×4.1` | `<formatPrice> · 중앙값 <formatCostMedian(기준)> × <factor>`; 부분 집계면 ` · 부분` |
| `pin` | 기존 `핀 조정` 칩은 `preset.deviated_keys`가 있으면 기준과 무관하게 계속 그린다(정보 칩) | 기존 |

### 3.4 모바일 (≤640px)

- `.cmp-criteria`와 `.cmp-refresh`는 필터 격자 아래 2열 격자 한 줄(`문제 기준 |
  새로고침`)이다.
- 패널은 절대 배치를 풀고(`position: static`) 조작 줄 아래 전폭으로 펼쳐진다.
  각 줄은 `체크박스+라벨` 한 줄, 보조 조작은 그 아래 들여쓴 줄로 접힌다(2행
  격자). 숫자 입력 폭은 `4ch`.
- 범례·칩·요약 띠는 선행 스펙 §3.4 규칙을 따른다. 가로 스크롤 요소는 없다.

## 4. 데이터 정의

### 4.1 기준 스키마 (`problem_criteria`)

공유 leaf `app/utils/compare-problem-criteria.js`(의존성 없음; 선례
`app/utils/quickfix-resume-kind.js`)가 정본이다.

```
PROBLEM_KEYS = ['failed','retry','review','human','verify','duration','cost','pin']

DEFAULT_PROBLEM_CRITERIA = {
  failed:   { on: true },
  retry:    { on: true,  include_env: false },
  review:   { on: true,  round_min: 2, blocking_min: 1, minor_min: null },
  human:    { on: true,  include_env_events: false },
  verify:   { on: true },
  duration: { on: true,  factor: 3 },
  cost:     { on: true,  factor: 3 },
  pin:      { on: false }
}

PROBLEM_CRITERIA_LIMITS = {
  round_min:    { min: 1, max: 9 },
  blocking_min: { min: 1, max: 99 },
  minor_min:    { min: 1, max: 99 },
  factor:       { min: 1.5, max: 10 }
}
PROBLEM_BASELINE_MIN_SAMPLE = 5
```

`normalizeProblemCriteria(raw)`는 어떤 입력이든 **완전한** 기준 객체를 돌려준다:
`raw`가 객체가 아니면 기본값; 알 수 없는 키는 버린다; `on`·`include_env`·
`include_env_events`는 `=== true`일 때만 참; 정수 임계값은 유한한 정수가 아니거나 범위 밖이면 그 필드의 기본값
(`minor_min`은 `null`도 유효); `factor`는 유한수가 아니거나 범위 밖이면 기본값.
`review`의 세 임계값이 모두 `null`이면 `review.on`은 `false`로 정규화한다.
`isDefaultProblemCriteria(criteria)`는 정규화 결과와 기본값의 깊은 동등이다.

### 4.2 판정 규칙

판정은 **필터 뒤**(§4.4)에 행마다 한 번 하며, 꺼진 기준의 키는 항상 `false`다.
`problems`는 `PROBLEM_KEYS` 여덟 불리언과 `evidence`를 가진다.

| 키 | 참인 조건 | `evidence` |
| --- | --- | --- |
| `failed` | `outcome.kind ∈ {failed, aborted}` | 기존(`cause` 또는 `status`) |
| `retry` | `is_retry`이고 (`include_env`이거나 `retry_kind !== 'env_ladder' && retry_kind !== 'auto_resume'`) | `{ origin, kind, cause, env }` — `origin`은 origin/resumed_from attempt id, `kind`는 §4.3의 `retry_kind`, `cause`는 env 사다리의 `retry.cause` 또는 `auto_resume_kind`, `env`는 §4.3 판정 |
| `review` | 대표 attempt의 `review`가 있고 (`round_min !== null && round ≥ round_min`) 또는 (`blocking_min !== null && blocking ≥ blocking_min`) 또는 (`minor_min !== null && minor ≥ minor_min`) | 기존 `{ round, blocking, minor }` |
| `human` | 기존 attempt 지역 플래그(`halted_auto_advance`·`awaiting_user_present`·`status = parked`) 또는 귀속된 이벤트 요약이 하나 이상 — 귀속 대상 이벤트 집합은 §4.3의 H, `include_env_events`면 H ∪ E | 요약 문자열 목록(기존) |
| `verify` | `row.verify === 'fail'` | `verify_source`(`merge_verify`·`bench_verify`) |
| `duration` | 기준선 활성이고 `duration_ms !== null`이고 `duration_ms > baseline.duration_ms.median × factor` | `{ value_ms, baseline_ms, factor }` |
| `cost` | 기준선 활성이고 `usage?.total_cost_usd`가 수이고 `> baseline.cost_usd.median × factor` — `usage.partial`이어도 하한이 이미 넘으면 참 | `{ value_usd, baseline_usd, factor, partial }` |
| `pin` | `preset?.deviated_keys.length > 0` | `deviated_keys` |

- **문제 세션** = 여덟 키 중 하나라도 참. **문제 세션 비율** = 문제 세션 ÷ n
  (기존). 켜진 기준이 하나도 없으면 `problem_rate`는 `null`이다.
- `review`는 선행 스펙 §4.2의 대표 attempt에만 붙는 Bead 단위 사실이며 이 문서는
  그 귀속을 바꾸지 않는다.
- **결정: 성공(착지) 정의와 대표 attempt 규칙은 바꾸지 않는다** — 선행 스펙 §4.2의
  ADR 후보이며 이 문서의 범위는 문제 신호다.

### 4.3 환경 요인의 정의

기록으로 기계 판정한다. 문자열 추론은 이 저장소가 스스로 쓰는 요약 접두 하나만
쓴다.

- **재시도 종류 `retry_kind`**(행의 원시 사실, 기준과 무관하게 항상 실린다):
  - `env_ladder`: `attempt.retry.origin_attempt_id`가 있다 — env 실패 등급의
    재시도 사다리(`queue-store.js` typedef `retry`, `failure-class.js` `tier ===
    'env'`). `cause`는 `retry.cause`.
  - `auto_resume`: `resumed_from`이 있고 `auto_resume_kind ∈ {provider_outage,
    account_switch}`.
  - `resume`: `resumed_from`이 있고 위에 해당하지 않는다(사용자 재개, 리뷰 정정,
    정체 처분, 기준 이동 재개 등).
  - `null`: 재시도가 아니다. `is_retry`는 `retry_kind !== null`과 같다(기존 정의
    유지).
  - 환경 재시도 = `env_ladder` 또는 `auto_resume`.
- **사람 개입 이벤트 집합**:
  - H(기본) = `needs_human` · `queue_hold` 중 요약이 `시스템 보류:`로 시작하는 것 ·
    `session_ended` 중 `attempt_id`가 있고 요약이 `파킹 ·`으로 시작하는 것.
  - E(환경) = `provider_hold` · `provider_recovered` · `account_preempt` ·
    `queue_hold` 중 요약이 `환경 보류:`로 시작하는 것.
  - `guard_warning`은 어느 집합에도 넣지 않는다(사람 개입도 환경도 아니다).
  - 현행은 `queue_hold` 전부를 H로 세므로, `환경 보류:` 접두의 `queue_hold`가 기본
    E로 옮겨 가는 것은 이 문서의 정정이다. 두 접두는 `queue-store.js`가 같은 줄에서
    쓰는 저장소 내부 계약이며 테스트는 생산 형태 그대로의 줄로 검증한다.
  - 귀속 규칙(attempt_id 우선, 없으면 구간 안 → 구간 뒤 → 가장 먼저 시작)은 선행
    스펙 §4.3 그대로 E에도 적용한다.
- 수집부(`collectCompareWorkspaces`)는 타임라인을 읽을 때 H ∪ E의 종류를 모두
  남긴다(현행은 세 종류만). bead당 파일 하나를 `get-compare` 때만 읽는 규칙은
  그대로다.

### 4.4 판정 위치와 기준선

- `workspaceRows`는 원시 사실(`outcome`·`retry_kind`·`review`·`verify`·`usage`·
  `duration_ms`·`preset`·귀속된 이벤트 요약을 H/E로 나눈 `human_summaries: {
  human: string[], env: string[] }`)까지만 만든다. `problems`는 여기서 만들지 않는다.
- `buildCompareModel`이 필터를 적용한 뒤 **기준선**을 만든다:
  `baselines = { duration_ms: { median, sample, active }, cost_usd: { median,
  sample, active } }`. 중앙값은 필터 결과 `rows` 전체에 대해 기존 `medianOf`로,
  `active = sample ≥ PROBLEM_BASELINE_MIN_SAMPLE`이다. 비용 표본은
  `usage.total_cost_usd`가 수인 행이다(부분 집계 포함, ADR UI-mscc와 같은 값).
- 그 다음 `judgeProblems(row, criteria, baselines)`(순수 함수, export)를 `rows`와
  `bench_rows`의 모든 행에 같은 기준·같은 기준선으로 적용한다. `bench_rows`는
  필터를 받지 않지만(선행 스펙 §4.7) 기준선은 본 표의 것을 쓴다 — 실험 행은
  본 표와 같은 잣대로 읽히는 것이 목적이다.
- 기준선이 비활성이면 `duration`·`cost`는 모든 행에서 `false`이고 응답의
  `baselines`의 해당 `active === false`가 범례 문구(§3.2)를 정한다.
- `aggregateRows`의 `problem_keys`는 `PROBLEM_KEYS`를 쓰고 `problems` 건수 객체도
  여덟 키다. `problem_rate`는 켜진 기준이 없으면 `null`.

### 4.5 응답의 기준 표시

응답 payload에 `criteria: { effective, is_default, baselines }`를 더한다.
`effective`는 서버가 실제로 판정에 쓴 정규화 결과, `is_default`는
`isDefaultProblemCriteria(effective)`, `baselines`는 §4.4의 값이다. 클라이언트는
범례·칩·`기준 조정됨`·팝오버의 현재값을 모두 `effective`에서 읽는다(저장값이
아니라).

## 5. 데이터 경로와 프로토콜

- op은 그대로 `get-compare` → `compare-snapshot` 한 쌍이며 새 op은 없다.
- 요청 payload: `{ range?, root_dirs?, routes?, include_bench?, group_by?,
  problem_criteria? }`. `problem_criteria`는 §4.1의 부분 객체이며 서버가
  `normalizeProblemCriteria`로 완전한 기준으로 만든다. 부재·비객체·잘못된 필드는
  모두 기본값으로 읽는다(fail-quiet; `bad_request` 없음).
- 응답 payload: `{ summary, groups, rows, workspaces, runs, bench_rows, warnings,
  criteria }`. `rows[]`·`bench_rows[]`의 `problems`는 §4.2의 여덟 키와 `evidence`,
  행은 `retry_kind`를 더한다. `groups[]`·`summary`의 `problems`는 여덟 키 건수다.
- `compare-handlers.js`는 `payload.problem_criteria`를 그대로 `filters`에 얹고
  `normalizeCompareFilters`가 `problem_criteria: normalizeProblemCriteria(...)`로
  정규화한다(정규화 위치는 투영 한 곳).
- `app/protocol.md`의 `get-compare` 절을 이 형태로 다시 쓴다.
- 서버 모듈 경계: `compare-projection.js`의 순수 부분(`buildCompareModel`)이 §4
  전부를 계산한다. `judgeProblems`·`retryKindOf`는 export한 순수 함수로 단위
  테스트한다.

## 6. 저장과 공유 모듈

- 공유 leaf `app/utils/compare-problem-criteria.js`: `PROBLEM_KEYS`,
  `PROBLEM_LABELS`(카드 칩 라벨), `DEFAULT_PROBLEM_CRITERIA`,
  `PROBLEM_CRITERIA_LIMITS`, `PROBLEM_BASELINE_MIN_SAMPLE`,
  `normalizeProblemCriteria`, `isDefaultProblemCriteria`. 서버(`compare-projection.js`)
  와 클라이언트(`app/views/compare/`)가 같은 사본을 import한다.
- 클라이언트 저장: localStorage 키 `bdui.compare.problem_criteria`, 값은 사용자가
  조절한 기준 객체의 JSON. 읽기·쓰기는 `try/catch`로 감싸고(선례
  `candidate-sort.js` `loadCandidateSort`/`saveCandidateSort`) 읽기 실패·부재는
  `{}`(= 기본값)이다. 요청에는 저장값이 있을 때만 `problem_criteria`를 싣는다.
- `[기본값으로]`는 키를 지운다(`removeItem`).
- 범례 조립·칩 배수 표기는 `app/views/compare/format.js`에 `formatCriteriaLegend
  (effective, baselines)`·`formatFactorChip(value, baseline)`으로 둔다.

## 7. 오류 처리

- 표시는 fail-quiet: 잘못된 저장값·payload는 기본값으로 읽히고 오류를 내지 않는다.
  타임라인·영수증·usage·프리셋 부재는 그 키가 `false`가 될 뿐이다.
- 기준선 표본 부족은 오류가 아니라 비활성이며 범례가 그 사실을 적는다.
- `get-compare` 실패는 현행대로 오류 한 줄과 `새로고침`. 팝오버는 실패 뒤에도
  마지막 유효 기준(`effective`)을 보여 준다.
- 서버는 조절값을 저장하지 않으므로 기준은 요청마다 payload에 있어야 한다.
  클라이언트가 저장값을 잃으면(사설 모드·다른 기기) 기본값으로 돌아간다 — 의도된
  범위다.

## 8. 테스트

- `app/utils/compare-problem-criteria.test.js`: 비객체·빈 객체 → 기본값; 알 수
  없는 키 제거; `on`은 `true`만 참; 임계값 범위 밖·비정수·문자열 → 필드 기본값;
  `minor_min: null` 유효; 세 임계값 모두 `null` → `review.on === false`; `factor`
  경계(1.5·10) 포함과 밖; `isDefaultProblemCriteria`의 참·거짓.
- `compare-projection.test.js`:
  - `retryKindOf`: `retry.origin_attempt_id` → `env_ladder`; `resumed_from` +
    `auto_resume_kind` 두 값 → `auto_resume`; `resumed_from`만 → `resume`; 둘 다
    없음 → `null`; `is_retry`가 `retry_kind !== null`과 일치.
  - `retry` 기준: 기본은 `env_ladder`·`auto_resume` 제외, `include_env`면 포함,
    `resume`은 항상 포함; `evidence.retry`의 네 필드.
  - `review` 임계값: `round_min`·`blocking_min`·`minor_min` 각각 단독 성립, `null`
    임계값은 무시, 기존 세 케이스(`r2`·`b1`·`m9 미판정`)는 기본값에서 그대로.
  - `human`: `queue_hold` `시스템 보류:`는 기본 H, `환경 보류:`는 기본 제외·
    `include_env_events`면 포함; `provider_hold`·`provider_recovered`·
    `account_preempt`는 기본 제외·토글 포함; `guard_warning`은 토글에도 제외;
    `attempt_id` 없는 E 이벤트의 시각 귀속(구간 안·구간 뒤·구간 전); 기존 지역
    플래그 케이스 유지.
  - `verify`: `merge_verify` 실패·`bench_verify` 실패 → 참, `pass`·`null` → 거짓,
    evidence가 source.
  - `duration`·`cost`: 표본 5 미만 → 전부 `false`·해당 `baselines` 항목의
    `active === false`;
    표본 5 이상에서 `median × factor` 경계(같으면 거짓, 초과면 참); `factor` 변경
    반영; 비용은 `partial`이어도 판정; 필터가 바뀌면 기준선이 필터 결과로 바뀌는
    것; `bench_rows`가 본 표 기준선을 쓰는 것.
  - `pin`: 기본 꺼짐에서 거짓, 켜면 `deviated_keys` 비어 있지 않을 때 참.
  - 꺼진 기준은 어떤 행에서도 거짓이고 건수 0; 켜진 기준이 없으면
    `problem_rate === null`; 겹치는 키는 문제 세션 분자에 한 번(기존 테스트 확장).
  - `criteria.effective`·`is_default`·`baselines`가 응답에 실리는 것; `filters.
    problem_criteria` 부재·잘못된 값이 기본값과 같은 결과를 내는 것.
  - 기존 종단 status 전수 단언(`TERMINAL_ATTEMPT_STATUSES` `test.each`)은 그대로
    통과해야 한다 — 이 문서는 결과 사다리를 건드리지 않는다.
- `compare-handlers.test.js`: `problem_criteria`가 그대로 전달되는 것, 부재 시
  전달값이 `undefined`인 것(정규화는 투영 몫).
- `app/views/compare/index.test.js`: 팝오버가 `effective`의 현재값을 그리는 것,
  체크박스·숫자 `change`가 저장 후 `problem_criteria`를 실어 재요청하는 것, 범위
  밖 입력이 잘려서 저장되는 것, `[기본값으로]`가 저장을 지우고 `problem_criteria`
  없이 재요청하는 것, `is_default === false`에서 `문제 기준 ●`과 `기준 조정됨`,
  꺼진 기준의 카드 칩이 사라지는 것, 범례가 켜진 기준·표본 부족 문구를 조립하는
  것, 세션 행의 `재시도(환경)`·`verify 실패`·`시간 ×n`·`비용 ×n` 칩과 title,
  localStorage 읽기 실패에서 기본값으로 동작하는 것(`getItem`이 throw).
- 모바일은 Pre-Handoff에서 headless Chrome 스크린샷(390px iframe)으로 §3.4 배치를
  눈으로 확인한다.
- 프론트 편집 뒤 `npm run build`(prettier → build 순서).

## 구현 unit 후보

참고용이며 구속하지 않는다.

1. 공유 leaf — `app/utils/compare-problem-criteria.js`(§4.1·§6).
2. 투영 — `server/worker/compare-projection.js`·`server/ws/compare-handlers.js`·
   `app/protocol.md`(§4.2~§4.5·§5).
3. 화면 — `app/views/compare/`·`app/styles.css`(§3).

## 결정 (ADR 후보)

- 전제: ADR 0025 — 이슈 `impl_review_stats`는 워크스페이스 스냅샷 투영에서 읽고
  상세 전용 bd read를 두지 않는다.
- 전제: ADR 0027 — 사람 개입·환경 이벤트는 bead별 `events.jsonl` 타임라인에서
  읽는다.
- 전제: ADR 0029 — 행의 재료는 살아 있는 큐 attempt와 이관된 기록의 합이다.
- 전제: ADR UI-mscc — 비용은 검증된 직접 사용량 합이며 불완전한 범위는 부분
  집계로 표시한다; 비용 초과 판정도 같은 값을 읽는다.
- 전제: ADR 0012 — `impl_review_stats` 어휘는 계약을 코드 field registry로 복제해
  소비한다.
- 문제 기준의 조절값은 요청 payload로 전달하고 판정·집계는 서버 투영 한 곳에서
  한다 — 되돌리기 어려움: 성립 안 함(표시 경로이며 저장 형식이 없다). 맥락 없이
  놀라움: 약함(선행 스펙 §5의 요청·응답 한 쌍 안에 머문다). 실제 트레이드오프:
  성립(응답 왕복 vs 로직 단일화) → ADR 아님
- 환경 요인(env 재시도 사다리·`auto_resume_kind` 자동 재개·`환경 보류:`
  `queue_hold`·`provider_hold`·`provider_recovered`·`account_preempt`)은 기본 문제
  신호에서 제외하고 토글로만 포함한다 — 선행 스펙이 문제 신호 정의를 "언제든
  되돌릴 수 있는 표시 정의"로 둔 것과 같은 지위다. 되돌리기 어려움: 성립 안 함.
  맥락 없이 놀라움: 성립(재시도가 왜 안 세어지는지) — 그러나 범례가 매 화면에
  적는다. 실제 트레이드오프: 성립 안 함(토글로 양쪽 다 본다) → ADR 아님
- 시간·비용 초과의 기준선은 필터 결과 전체 중앙값의 배수이고 표본 5건 미만이면
  비활성이다 — 표시 정의이며 팝오버에서 바꿀 수 있다 → ADR 아님

## 경계·후속

- 관찰: 사후 수정 신호(워커 마지막 커밋 뒤 사람이 PR에 더한 커밋 수·같은 이슈를
  가리키는 후속 fix Bead·revert) — 착지 뒤 품질을 가장 잘 말하지만 git·bd 어댑터와
  저장이 새로 필요해 별도 스펙이 맞다(사용자 결정 2026-09-16, 범위 밖).
- 관찰: 조절한 기준을 다른 사람과 같은 숫자로 공유하려면 URL 해시(`#/compare?
  criteria=...`)나 워크스페이스 kv가 필요하다 — 사용자가 뷰 로컬 저장을 택했고
  범례가 기준을 적으므로 지금은 만들지 않는다.
- 관찰: `guard_warning` 이벤트(가드 훅이 세션 쓰기를 막은 기록)는 세션 행동 신호일
  수 있으나 빈도·의미가 확인되지 않아 기준에 넣지 않는다.
- 관찰: `resume` 종류 안의 기준 이동(`base_moved`)·정체 처분 재개는 세션 몫으로
  세지만 환경에 가까운 경우가 있다 — 기록에 종류 필드가 없어 지금은 나누지
  않으며, 필요해지면 `disposition`·`continuation_choice` 필드로 세분한다.
- 관찰: 선행 스펙(UI-4g7p)의 ADR 후보 둘(`applied_exec_preset` 그룹 단위·착지
  관측 성공 정의)은 아직 `docs/adr/`에 없다 — 이 문서는 그 정의를 전제로 하되
  바꾸지 않는다.
