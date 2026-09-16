---
scope:
  - app/data/closed-range.js
  - app/data/closed-range.test.js
  - app/views/compare/index.js
  - app/views/compare/index.test.js
  - app/styles.css
  - app/protocol.md
  - server/ws/compare-handlers.js
  - server/ws/compare-handlers.test.js
  - server/worker/compare-projection.js
  - server/worker/compare-projection.test.js
---

# 비교 탭 기간 필터 — 최근 2·3일과 직접 지정 구간

## 문서 상태

- Bead: `UI-7rga`
- 경로: `spec_backed`; beads-ui 안에서 하나의 구현·검증·인도 묶음으로 처리한다.
- 기준: `origin/main` / `50a6d67a8970464a8dcd4e17d8fd4c09bed088a6`

## 1. 사용자 결과와 확인한 현재 상태

비교 탭에서 최근 2일·3일처럼 짧은 구간을 고를 수 있고, 시작일과 종료일을 직접
지정한 구간으로도 표를 좁힐 수 있게 한다.

지금 상태:

- 비교 탭 기간 select는 `app/data/closed-range.js`의 `CLOSED_RANGE_OPTIONS`
  (`오늘`·`최근 7일`·`최근 30일`·`전체`)를 그대로 그린다
  (`app/views/compare/index.js` 조작 줄). 이 목록은 보드 `완료` 열 드롭다운
  (`app/views/board/column.js`)이 함께 읽는 공유 어휘다.
- 서버는 `server/ws/compare-handlers.js`의 `compareRangeSince`가 `range` 문자열
  하나를 하한(`since`) 하나로 바꿔 `prepareCompareSnapshot`에 넘긴다. 상한을
  표현할 수단이 없다.
- 투영에서 하한이 걸리는 곳은 둘이다: 행 필터 `rowPassesFilters`와,
  `prepareCompareSnapshot`이 이력 관측을 미리 준비할 때 쓰는 앞선 거르기.
  실험 행(`bench_rows`)은 필터와 무관하게 실린다.
- 같은 모듈에 이미 화면별 기간 어휘가 둘 있다: 보드 `완료` 열의
  `CLOSED_RANGE_OPTIONS`와 완료 레인의 `DONE_RANGE_OPTIONS`.

따라서 더할 것은 (1) 비교 탭 전용 기간 어휘, (2) 요청 payload의 상한, (3) 투영의
상한 비교, (4) 날짜 두 개를 받는 조작 줄이다.

## 2. 검토한 접근과 선택

**기간 어휘를 어디에 둘지.** 공유 `CLOSED_RANGE_OPTIONS`에 `2d`·`3d`를 넣으면
어휘는 하나로 남지만 요청하지 않은 보드 `완료` 열 드롭다운이 함께 길어진다.
비교 탭 전용 목록을 두면 보드는 그대로다 — **전용 목록을 택한다**(사용자 결정
2026-09-17). 새 모듈을 만들지 않고 `app/data/closed-range.js` 안에 세 번째
어휘로 넣는다: `DONE_RANGE_OPTIONS`가 이미 같은 방식으로 살고 있고, 서버
(`server/ws/compare-handlers.js`)가 이 모듈을 직접 읽으므로 기간 의미가 한
파일에 모인다.

**직접 지정 구간의 표현.** `range` 문자열 안에 날짜를 넣어 보내면 파서가 늘고
기존 값과 섞인다. `range`를 없애고 늘 두 경계만 보내면 프리셋의 "지금 기준
N일"이 클라이언트 시계로 굳는다. **`range`는 그대로 모드 식별자로 두고
`custom` 값 하나를 더한 뒤, `custom`일 때만 읽는 선택 필드 `since`·`until`
(epoch ms)을 payload에 더한다.** 프리셋은 지금처럼 서버가 계산하므로 동작이
바뀌지 않고, 옛 클라이언트의 payload는 그대로 유효하다.

**날짜를 누가 epoch으로 바꾸는지.** 프리셋은 서버 시계로 계산하던 것을
유지한다. 직접 지정은 사람이 브라우저에서 고른 날짜이므로 **클라이언트가 자기
로컬 자정으로 epoch을 계산해 보낸다** — 그래야 화면에 적힌 날짜와 걸러진 구간이
어긋나지 않는다.

**조작 줄 형태.** 날짜 입력을 늘 보이게 두면 클릭이 하나 줄지만 조작 줄이 항상
길어지고 모바일에서 한 줄을 더 먹는다. **기간 select에 `직접 지정` 항목을 두고
고를 때만 날짜 입력 두 개를 드러낸다**(사용자 결정 2026-09-17).

## 3. 화면

### 3.1 기간 select

`COMPARE_RANGE_OPTIONS`를 순서대로 그린다.

| 값 | 라벨 |
| --- | --- |
| `today` | 오늘 |
| `2d` | 최근 2일 |
| `3d` | 최근 3일 |
| `7d` | 최근 7일 |
| `30d` | 최근 30일 |
| `all` | 전체 |
| `custom` | 직접 지정 |

기본값은 지금과 같은 `30d`다. 다른 필터·정렬 select와 `새로고침`의 자리는
바뀌지 않는다.

### 3.2 직접 지정 입력

`range`가 `custom`일 때만, 기간 select 바로 뒤 같은 `.cmp-filters` 흐름에 한
덩이(`.cmp-filter.cmp-filter--dates`)를 그린다:

```
기간 [직접 지정 ▾] [2026-09-01] ~ [2026-09-10]
```

- 입력 둘은 `<input type="date" class="cmp-filter__date">`이고 `aria-label`은
  각각 `시작일`·`종료일`, 사이 구분자는 `~`다.
- 값은 `YYYY-MM-DD` 또는 빈 문자열이다. 빈 쪽은 경계가 없다는 뜻이다: 시작만
  채우면 그 날 이후 전부, 종료만 채우면 그 날까지 전부, 둘 다 비면 전체.
- 한쪽을 바꿀 때마다 판정한다. 유효하면 곧바로 `get-compare`를 다시 부르고,
  시작일이 종료일보다 늦으면 **요청하지 않고** 덩이 아래 `.cmp-filter__error`에
  `시작일이 종료일보다 늦습니다`를 쓴다. 이때 표는 직전 결과를 그대로 둔다 —
  빈 표는 "기록이 없다"로 읽혀 오류와 구별되지 않는다.
- 프리셋으로 되돌아가면 입력은 사라지지만 고른 날짜는 이 세션 화면 상태에
  남는다. 다시 `직접 지정`을 고르면 그대로 돌아온다.

### 3.3 머리 요약 줄

머리 요약(`최근 30일 · 전체 저장소 · 세션 n건 · 이슈 m건`)의 첫 토큰은
`COMPARE_RANGE_OPTIONS`의 라벨이되 `custom`은 고른 날짜로 적는다.

| 상태 | 첫 토큰 |
| --- | --- |
| 프리셋 | 그 라벨(`최근 2일` 등) |
| 시작·종료 둘 다 | `2026-09-01 ~ 2026-09-10` |
| 시작만 | `2026-09-01 이후` |
| 종료만 | `2026-09-10까지` |
| 둘 다 빔 | `전체 기간` |

### 3.4 모바일 (≤640px)

`.cmp-filters`는 지금처럼 2열 격자다. 날짜 덩이는 `grid-column: 1 / -1`로 한 줄
전폭을 쓰고, 그 안에서 입력 둘이 `minmax(0, 1fr)`씩 나눠 가진다. 오류 문구도
같은 전폭 줄 아래에 붙는다. 가로 스크롤은 생기지 않는다.

## 4. 기간 어휘와 경계 의미

### 4.1 `app/data/closed-range.js`에 더하는 것

- `CompareRange` 타입: `'today'|'2d'|'3d'|'7d'|'30d'|'all'|'custom'`.
- `COMPARE_RANGE_OPTIONS` — §3.1의 일곱 항목.
- `isCompareRange(value)` — 타입 가드.
- `compareRangeSince(range, now)` — 프리셋을 하한 epoch ms로 바꾼다. `today`는
  로컬 하루의 시작, `2d`·`3d`·`7d`·`30d`는 `now`에서 N일 전, `all`과 `custom`과
  모르는 값은 `null`. 지금 `server/ws/compare-handlers.js`에 있는 같은 이름의
  함수를 이 모듈로 옮기고 그쪽은 이것을 읽는다.
- `localDayStartMs(date_string)` — `YYYY-MM-DD`를 그 날 로컬 자정 epoch ms로
  바꾼다. 형식이 아니거나 빈 문자열이면 `null`.

`CLOSED_RANGE_OPTIONS`·`DONE_RANGE_OPTIONS`·`closedRangeSince`·`isClosedRange`·
`normalizeDoneRange`는 바꾸지 않는다. 모듈 머리말에 세 어휘가 각각 어느 화면의
것인지 적는다.

### 4.2 경계 의미

- `since`는 **포함**하는 하한이다: `finished_at >= since`. 지금 규칙 그대로다.
- `until`은 **제외**하는 상한이다: `finished_at < until`. 클라이언트는 종료일
  다음 로컬 자정을 보내므로, 사람이 고른 종료일 당일은 온전히 포함된다.
- `finished_at`이 없는 행은 어느 한쪽 경계라도 걸려 있으면 제외한다 — 지금
  하한의 규칙과 같다.
- 두 경계가 뒤집힌 요청(`since > until`)은 자연히 빈 결과가 된다. UI가 막으므로
  화면에서는 도달하지 않고, 서버는 따로 오류로 만들지 않는다.

## 5. 데이터 경로와 프로토콜

op은 그대로 `get-compare` → `compare-snapshot` 한 쌍이고 새 op은 없다
(`app/protocol.js`의 `MESSAGE_TYPES`는 바뀌지 않는다).

### 5.1 요청 payload

`{ range?, since?, until?, root_dirs?, routes?, include_bench?, problem_criteria?, group_by? }`

- `range`는 `COMPARE_RANGE_OPTIONS`의 값이며 기본은 `30d`. 모르는 값은 지금처럼
  전체 이력으로 읽는다(fail-open).
- `since`·`until`은 epoch ms 정수이고 **`range`가 `custom`일 때만 읽는다**.
  프리셋일 때 실려 와도 무시하므로, 남아 있는 값이 프리셋 구간을 조용히 좁히는
  일은 없다.
- `custom`인데 둘 다 없으면 경계 없는 전체다. 한쪽만 있으면 그쪽만 경계가 된다.
- 유한한 수가 아닌 값은 그 경계만 `null`이 된다(`num` 규칙 그대로).

`app/protocol.md`의 `Preset comparison channel` 절에 위 규칙과 `until`의
제외 의미, 클라이언트가 로컬 자정으로 계산한다는 점을 적는다.

### 5.2 `server/ws/compare-handlers.js`

`compareRangeSince` 한 값을 만들던 자리를 `compareRangeBounds(payload, now)`로
바꾼다. 반환은 `{ since: number|null, until: number|null }`이며:

- `range === 'custom'`이면 `{ since: num(payload.since), until: num(payload.until) }`.
- 그 밖이면 `{ since: compareRangeSince(range, now), until: null }`.

두 값을 `prepareCompareSnapshot` 입력에 그대로 싣는다. `compareRangeSince`를
읽는 기존 export 이름은 테스트가 쓰고 있으므로 재export로 유지한다.

### 5.3 `server/worker/compare-projection.js`

- `CompareFilters`에 `until: number|null`(제외하는 상한)을 더하고
  `normalizeCompareFilters`가 `num(input.until)`로 채운다.
- `rowPassesFilters`의 하한 비교 바로 뒤에 상한 비교를 더한다.
- `prepareCompareSnapshot`이 이력 관측을 미리 준비할 때 쓰는 앞선 거르기에도
  같은 상한을 더한다 — 창 밖 attempt의 관측을 준비할 이유가 없다. 실험
  attempt가 조건 없이 통과하는 지금 규칙은 그대로다.
- `bench_rows`는 필터와 무관하게 싣는 기존 결정을 유지한다: 기간을 좁혀도 고른
  실험의 셀은 사라지지 않는다.

## 6. 저장

프리셋만 기억한다(사용자 결정 2026-09-17).

- 키는 `bdui.compare.range`이고, 같은 화면의 `bdui.compare.problem_criteria`와
  같은 `try`/`catch` fail-quiet 헬퍼 모양을 따른다.
- 쓰기: 기간 select가 프리셋으로 바뀔 때만 그 값을 쓴다. `custom`을 고르면
  쓰지도 지우지도 않는다 — 마지막으로 본 프리셋이 다음 방문의 시작점으로
  남는다.
- 읽기: 화면을 만들 때 한 번 읽어 `isCompareRange(raw)`이고 `custom`이 아닐
  때만 채택하고, 아니면 기본 `30d`.
- 고른 날짜는 저장하지 않는다. 절대 날짜가 복원되면 한참 뒤 다시 열었을 때 옛
  구간이 살아나 기록이 사라진 것처럼 보인다.
- 저장소 접근이 막힌 브라우저에서도 화면은 기본값으로 정상 동작한다.

## 7. 오류 처리

| 상황 | 처리 |
| --- | --- |
| 시작일 > 종료일 | 요청하지 않고 인라인 오류 문구, 직전 표 유지 |
| 날짜 입력이 빈 값 | 그 경계 없음(오류 아님) |
| 저장소 읽기·쓰기 실패 | 무시하고 기본값으로 진행 |
| payload의 `since`·`until`이 수가 아님 | 그 경계만 `null` |
| 프리셋인데 `since`·`until`이 실려 옴 | 무시 |

`compare_projection_failed` 오류 경로와 진행 중 표시는 바뀌지 않는다.

## 8. 테스트

`app/data/closed-range.test.js`

- `COMPARE_RANGE_OPTIONS`가 §3.1의 일곱 값을 그 순서로 담는다
- `CLOSED_RANGE_OPTIONS`에는 `2d`·`3d`·`custom`이 없다(보드 불변)
- `compareRangeSince`가 `2d`·`3d`에서 각각 이틀·사흘 전 ms를 뺀다
- `compareRangeSince`가 `all`·`custom`·모르는 값에서 `null`을 준다
- `localDayStartMs`가 날짜 문자열을 로컬 자정으로 바꾼다
- `localDayStartMs`가 빈 문자열과 형식이 아닌 값에서 `null`을 준다

`server/ws/compare-handlers.test.js`

- `custom`과 두 경계를 받아 그대로 투영 입력에 싣는다
- `custom`인데 경계가 없으면 두 값 모두 `null`이다
- 프리셋 요청에 실린 `since`·`until`을 무시한다
- `range`가 없으면 `30d` 하한과 `until: null`을 쓴다

`server/worker/compare-projection.test.js`

- 상한과 같은 `finished_at`인 행을 제외한다(제외 경계)
- 상한 직전 행을 남긴다
- 상한만 있고 하한이 없는 구간을 거른다
- `finished_at`이 없는 행을 상한만 있을 때도 제외한다
- 실험 행은 상한이 걸려도 `bench_rows`에 남는다

`app/views/compare/index.test.js`

- 기간 select가 최근 2일·최근 3일·직접 지정 항목을 그린다
- `직접 지정`을 고르면 날짜 입력 둘을 그린다
- 프리셋에서는 날짜 입력을 그리지 않는다
- 시작일이 종료일보다 늦으면 요청하지 않고 오류 문구를 그린다
- 유효한 두 날짜가 `custom` 경계로 요청에 실린다
- 종료일 경계가 그 날 다음 자정으로 계산된다
- 머리 요약이 고른 구간을 §3.3 표대로 적는다
- 저장된 프리셋을 다시 열 때 복원하고 저장된 `custom`은 기본값으로 읽는다

## 구현 unit 후보

- `data-and-server`: `app/data/closed-range.js`, `server/ws/compare-handlers.js`,
  `server/worker/compare-projection.js`와 각 테스트, `app/protocol.md`
- `view`: `app/views/compare/index.js`, `app/views/compare/index.test.js`,
  `app/styles.css`

## 결정 (ADR 후보)

- 비교 탭은 전용 기간 어휘를 갖고 보드 `완료` 열의 `CLOSED_RANGE_OPTIONS`는
  바꾸지 않는다. 되돌리기 어려움: 성립 안 함(표시 목록이며 저장되는 것은 문자열
  하나뿐이다). 맥락 없이 놀라움: 약함(세 어휘가 한 모듈에 있고 머리말이 각자의
  화면을 적는다). 실제 트레이드오프: 약함(어휘 중복 vs 요청하지 않은 화면 변경 —
  후자가 분명히 크다) → ADR 아님
- 직접 지정 구간의 epoch은 클라이언트가 자기 로컬 자정으로 계산해 보내고
  프리셋은 서버가 계산한다. 되돌리기 어려움: 성립 안 함(요청·응답 한 쌍 안에
  머물고 기록에 남지 않는다). 맥락 없이 놀라움: 성립(한 payload 안에서 두 시계가
  쓰인다) — `app/protocol.md`가 그 규칙을 적는다. 실제 트레이드오프: 성립(서버
  계산은 일관되지만 다른 시간대의 브라우저가 고른 날짜와 걸러진 구간이
  어긋난다) → ADR 아님
- `until`은 제외하는 상한이고 사람이 고른 종료일 당일은 온전히 포함한다.
  되돌리기 어려움: 성립 안 함(요청·응답 한 쌍 안에서만 쓰이는 비교 규칙이라 저장
  형식·기록·마이그레이션에 남지 않는다 — 경계 방향을 뒤집어도 다음 요청부터 곧바로
  새 규칙으로 답하고 되돌릴 과거 데이터가 없다). 맥락 없이 놀라움: 성립(경계 방향은 코드를 읽어야
  드러난다) — `app/protocol.md`와 §4.2가 적는다. 실제 트레이드오프: 성립 안 함
  (포함 상한은 날짜 단위 선택과 맞지 않는다) → ADR 아님

## 경계·후속

없음 — 이 설계는 비교 탭 기간 필터 하나를 닫는다. 보드 `완료` 열과 완료 레인의
기간 어휘는 사용자 결정으로 범위 밖이며 되돌릴 일이 아니다.
