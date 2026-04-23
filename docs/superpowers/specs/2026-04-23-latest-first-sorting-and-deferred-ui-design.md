# 최신순 정렬과 Deferred UI 정합성 정리

## 문제 정의

현재 `beads-ui`의 issue 정렬과 `Deferred` UI는 다음 세 가지 문제를 동시에 갖고 있다.

1. **정렬 정책이 사용자 기대와 다르다.**
   - 현재 open 계열 list/board/epics children은 공통 comparator를 사용해
     `priority asc -> created_at asc -> id asc` 순으로 정렬한다.
   - 사용자는 "최신일수록 위"를 기대한다.
   - `docs/subscription-issue-store.md`는 기본 정렬을 `created_at desc`로 설명하고
     있어 문서와 코드도 어긋나 있다.

2. **이슈 상세의 status select에서 `Deferred`가 신뢰성 있게 보이지 않는다.**
   - canonical status source 자체에는 이미 `deferred`가 포함되어 있다.
   - 사용자가 겪는 문제는 status model 부재라기보다, 실제 detail select에서의
     렌더 반영 / status badge-select 스타일 / 최신 bundle 반영 여부가 일치하지
     않는 데 가깝다.
   - 따라서 이번 작업은 data source 추가가 아니라, 실제 사용자 surface에서
     `Deferred`가 보이고 동작한다는 계약을 다시 고정하는 작업으로 본다.

3. **Board에서 Deferred 컬럼을 켜면 폭이 재분배되지 않는다.**
   - 현재 board는 `show_deferred_column`이 켜질 때 column count만 5→6으로 바꾸고,
     각 컬럼은 여전히 큰 최소폭을 유지한다.
   - 그 결과 Deferred 컬럼이 등장해도 기존 컬럼 폭이 줄어들지 않고, `Closed`
     컬럼이 오른쪽으로 밀려난다.

이번 작업의 목표는 이 세 가지를 하나의 UI 정책으로 묶어 정리하는 것이다.

## 목표

- `issues list`, `board`, `epics children`의 기본 정렬을 **최신 생성일 우선**으로
  통일한다.
- `closed`는 기존처럼 `closed_at desc` 예외 정책으로 유지한다.
- issue detail의 status select에서 `Deferred`가 항상 보이도록 한다.
- 같은 canonical status를 쓰는 list inline status select / issues filter dropdown도
  함께 회귀 점검한다.
- board에서 Deferred 컬럼이 켜질 때 전체 폭이 자동 재분배되어 `Closed` 컬럼이
  화면 밖으로 밀리지 않도록 한다.
- 코드와 문서의 정렬 설명을 일치시킨다.

## 비목표

다음은 이번 설계 범위에서 제외한다.

- `updated_at desc` 기반 활동순 정렬로의 전환
- 사용자별 정렬 preference 저장
- drag/drop 동작 자체의 정보구조 재설계
- board column order 변경 (`Deferred` 위치 자체는 유지)
- `defer_until` 날짜 편집 UX 추가
- detail panel 외의 새로운 status 편집 surface 추가

## 현재 상태

### 1. 공용 정렬기

`app/data/sort.js`의 공용 comparator는 현재 다음 규칙을 사용한다.

- `cmpPriorityThenCreated`
  - `priority asc`
  - `created_at asc`
  - `id asc`
- `cmpClosedDesc`
  - `closed_at desc`
  - `id asc`

이 comparator는 `app/data/list-selectors.js`를 통해 다음 view에 재사용된다.

- issues list
- board open / in_progress / deferred / resolved columns
- epics children

즉, 정렬 정책 변경은 개별 화면 패치가 아니라 **shared selector policy 변경**이다.

### 2. Deferred status source와 실제 UX 인식 간 괴리

현재 코드상 canonical status source는 이미 `deferred`를 포함한다.

- `app/utils/status.js`
- `app/views/detail.js`
- `app/views/issue-row.js`
- `app/views/list.js`

하지만 사용자는 issue detail에서 status를 바꾸는 실제 select에서 `Deferred`가
안 보인다고 인지하고 있다. 따라서 이번 작업은 "canonical source가 없다"가 아니라
"실제 사용자 surface에 올바르게 렌더/스타일링/배포되지 않는다"는 문제로 정의하고,
다음 세 가지를 함께 검증 대상으로 본다.

- canonical status source가 detail/list/filter에 동일하게 반영되는지
- status select/badge 스타일이 `deferred`를 정상적으로 표현하는지
- runtime bundle이 최신 소스를 실제로 반영하는지

### 3. Board 레이아웃

현재 board는 CSS grid를 사용한다.

- `app/views/board.js`
  - `--board-column-count`를 5 또는 6으로 설정
- `app/styles.css`
  - `.board-root`는 `repeat(var(--board-column-count), minmax(380px, 1fr))`
  - `.board-column`은 `min-width: 380px`

따라서 6번째 컬럼이 생겨도 각 컬럼 최소폭이 유지되어, 작은/보통 폭 화면에서는
자동 재분배보다 horizontal overflow가 먼저 발생한다.

## 결정 요약

### 선택한 방향

1. **open 계열 기본 정렬을 `created_at desc` 중심으로 통일한다.**
2. **`closed`만 `closed_at desc` 예외를 유지한다.**
3. **Deferred status UI는 detail select를 기준으로 다시 고정하고, 같은 source를
   쓰는 list/filter도 함께 회귀 검증한다.**
4. **Board는 Deferred 컬럼 표시 시 6컬럼이 다시 배치되도록 컬럼 최소폭 정책을
   조정한다.**

### 왜 이 방향인가

- 사용자가 요구한 표현은 "최신일수록 위"이며, 이는 priority-first 정렬보다 날짜
  중심 정책이 더 직접적이다.
- `updated_at desc`는 사소한 수정에도 카드/행 위치가 과하게 흔들릴 수 있어 이번
  요구에는 과하다.
- 정렬기가 shared selector에 묶여 있으므로 list/board/epics를 함께 바꾸는 것이
  더 단순하고 일관된다.
- Deferred 문제는 단일 select 옵션 추가보다 **공용 source + 스타일 + runtime
  반영 확인**까지 포함해야 재발을 막을 수 있다.
- board width 문제는 JS 토글 문제가 아니라 **CSS layout contract 문제**이므로,
  column count와 min-width 정책을 함께 다뤄야 한다.

## 설계

## 1. 정렬 정책

### 1.1 open 계열 공통 규칙

다음 상태/뷰는 같은 기본 정렬 정책을 사용한다.

- issues list의 기본 목록
- board의 `Blocked`, `Ready`, `In Progress`, `Deferred`, `Resolved`
- epics children

정렬 규칙은 다음으로 바꾼다.

1. `created_at desc`
2. `priority asc`
3. `id asc`

즉, **최신 생성 이슈가 먼저 오고**, 동일 시점대에서 priority가 보조 정렬 역할을
한다.

### 1.2 closed 예외

`Closed`는 현재 정책을 유지한다.

1. `closed_at desc`
2. `id asc`

이 예외를 유지하는 이유는, 닫힌 목록에서는 생성 시점보다 닫힌 시점이 사용자의
회상 모델과 더 잘 맞기 때문이다.

### 1.3 invalid timestamp fallback

`created_at` 또는 `closed_at`가 비어 있거나 파싱 불가능하면 `0`으로 정규화한다.
이 fallback은 현재 구조를 유지하되, 정렬 방향만 새 정책으로 맞춘다.

즉:

- invalid `created_at` issue는 open 계열에서 가장 오래된 항목처럼 뒤로 간다.
- invalid `closed_at` issue는 closed 목록에서 가장 오래전에 닫힌 것처럼 뒤로 간다.

### 1.4 shared source of truth

정렬 정책은 `app/data/sort.js`에서만 정의한다.

- `app/data/list-selectors.js`는 comparator를 재사용만 한다.
- 개별 view 파일에서 별도 최신순 정렬을 중복 구현하지 않는다.

이렇게 해야 list/board/epics 간 규칙 drift를 막을 수 있다.

## 2. Deferred status UI 정합성

### 2.1 canonical status source 유지

canonical status source는 계속 `app/utils/status.js`의 `STATUSES`를 사용한다.
이번 작업은 새로운 status source를 만들지 않는다.

canonical order는 유지한다.

- `open`
- `in_progress`
- `deferred`
- `resolved`
- `closed`

### 2.2 detail status select를 기준 동작으로 고정

사용자가 직접 지적한 surface는 issue detail의 status select다. 따라서 이번 작업의
기준 acceptance는 다음과 같다.

- issue detail의 status select에 `Deferred` option이 항상 보인다.
- 현재 issue status가 `deferred`일 때 select의 value/class가 올바르게 반영된다.
- `update-status` mutation 경로에서 `deferred`를 정상 전송한다.

### 2.3 list/filter 회귀 점검

같은 canonical source를 쓰는 다음 surface도 함께 회귀 점검한다.

- issues filter dropdown의 `Deferred`
- list inline status select의 `Deferred`

이 둘은 사용자가 직접 지목한 대상은 아니지만, source 정합성을 보장하려면 같은
작업에 포함하는 것이 맞다.

### 2.4 status style contract

`app/styles.css`에 `deferred`용 status badge/select style을 추가한다.

의도:

- `badge-select badge--status is-deferred`가 시각적으로 구분된다.
- source에는 option이 있으나 style이 빠져 "없는 것처럼 느껴지는" 상황을 줄인다.
- list/detail에서 현재 status가 `deferred`일 때 기존 상태들과 동일한 시각 규칙을
  따른다.

색상 자체는 기존 palette와 조화되는 단일 tone을 사용하고, 새 status만 과도하게
  강조하지 않는다.

## 3. Board Deferred 컬럼 레이아웃

### 3.1 desired behavior

- Deferred 컬럼이 숨겨져 있으면 기본 5컬럼 배치.
- Deferred 컬럼이 보이면 6컬럼 배치.
- 이때 전체 grid는 **현재 viewport 안에서 가능한 범위까지 컬럼 폭을 재분배**해야
  한다.
- 결과적으로 `Closed` 컬럼이 "기존 5컬럼 폭을 유지한 채 오른쪽으로 밀리는"
  동작은 버그로 본다.

### 3.2 layout strategy

board는 계속 CSS grid를 사용한다. 다만 column minimum policy를 조정한다.

첫 버전의 정량 목표는 다음과 같다.

- 현재 `380px`인 board column 최소폭을 **`300px`** 기준으로 완화한다.
- `.board-root`와 `.board-column`이 서로 다른 최소폭을 갖지 않도록, 같은 source of
  truth(예: shared CSS variable)로 묶는다.
- Deferred column이 켜진 6컬럼 상태에서는 **약 `1800px` 이상의 viewport/container
  폭에서 min-width 자체 때문에 즉시 overflow가 발생하지 않는 것**을 목표로 한다.
- 이보다 좁은 폭에서는 horizontal scroll fallback을 허용한다.

핵심 방향:

- `.board-root`의 `minmax()` 최소값을 `300px` 기준으로 낮춘다.
- `.board-column`의 `min-width`도 같은 `300px` 기준으로 맞춘다.
- 작은 화면에서는 기존처럼 horizontal scroll이 가능해야 한다.
- 큰 화면에서는 5→6컬럼 전환 시 전체 폭이 다시 분배되는 것이 우선이다.

즉, "scroll을 완전히 없애는 것"이 목표가 아니라, **불필요한 overflow를 줄이고
정상 폭 재분배를 먼저 일어나게 하는 것**이 목표다.

### 3.3 no JS measurement requirement

첫 버전은 JS로 컨테이너 폭을 측정해 컬럼 너비를 계산하지 않는다.

이유:

- 현재 문제는 CSS min-width contract만 완화해도 해결 가능한 수준이다.
- JS measurement는 resize sync / observer / hydration timing 복잡도를 늘린다.
- 이번 요구는 정책 정리와 버그 수정이 목적이지, board layout engine 재설계가 아니다.

## 4. 문서 정합성

`docs/subscription-issue-store.md`의 기본 정렬 설명을 실제 코드 정책과 맞춘다.

수정 후 문서 설명:

- open 계열 기본 정렬은 `created_at desc` 중심
- closed는 `closed_at desc`

문서와 구현이 어긋난 채 남으면 이후 selector/store 관련 작업에서 잘못된 전제가
재주입될 수 있으므로 이번 범위에 포함한다.

## 변경 범위

### 클라이언트

- `app/data/sort.js`
  - open 계열 comparator를 `created_at desc -> priority asc -> id asc`로 변경
- `app/data/list-selectors.js`
  - 새 comparator 재사용 (필요 시 주석/JSDoc 정합성 수정)
- `app/views/detail.js`
  - detail status select의 `Deferred` 회귀 고정
- `app/views/issue-row.js`
  - inline status select 회귀 고정
- `app/views/list.js`
  - issues filter dropdown 회귀 고정
- `app/views/board.js`
  - Deferred column count/layout contract 유지, 필요 시 style 변수만 최소 조정
- `app/styles.css`
  - `is-deferred` status style 추가
  - board column min-width/grid minmax를 `300px` shared contract로 조정

### 문서

- `docs/subscription-issue-store.md`
  - 기본 정렬 설명 갱신

### 테스트

- `app/data/list-selectors.test.js`
- `app/views/board.test.js`
- `app/views/detail.test.js`
- `app/views/list.test.js`
- 필요 시 `app/data/subscription-issue-store.test.js`

## 테스트 전략

### 1. 정렬 회귀 테스트

- list selector가 open 계열을 `created_at desc`로 정렬하는지 확인
- board ready/blocked/in_progress/deferred/resolved가 새 정책을 따르는지 확인
- epics children도 같은 shared policy를 따르는지 확인
- closed는 여전히 `closed_at desc`인지 확인
- invalid timestamp fallback이 안정적으로 동작하는지 확인

### 2. Deferred status UI 테스트

- detail status select options에 `deferred`가 존재하는지
- detail에서 현재 status가 `deferred`일 때 select value/class가 올바른지
- list inline status select options에 `deferred`가 존재하는지
- issues filter dropdown에 `Deferred`가 보이는지

### 3. Board layout contract 테스트

JSDOM에서 실제 픽셀 layout을 완전하게 검증할 수 없으므로, 테스트는 contract 수준으로
고정한다.

- Deferred 컬럼 hidden 시 column count 관련 style/structure가 5컬럼 기준인지
- Deferred 컬럼 shown 시 6컬럼 기준 style/structure가 적용되는지
- CSS contract가 `380px` 기반이 아니라 `300px` shared minimum으로 바뀌었는지
  selector/snapshot 수준으로 고정
- `.board-root`와 `.board-column`이 서로 다른 최소폭 상수를 갖지 않는지 확인

실제 가시성/overflow는 implementation 단계의 runtime verification으로 확인한다.

### 4. Runtime verification

구현 후에는 다음을 확인한다.

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- 필요 시 frontend bundle/build 반영
- merged runtime 또는 ad-hoc live server에서
  - detail status select에 `Deferred`가 보이는지
  - board에서 Deferred column toggle 시 `Closed`가 비정상적으로 밀리지 않는지

## 리스크와 대응

### 리스크 1. priority 기반 작업 흐름이 약해 보일 수 있음

날짜 우선 정책으로 바꾸면 기존 priority-first 정렬을 선호하던 사용자는 다르게 느낄
수 있다.

대응:

- priority는 제거하지 않고 secondary key로 유지한다.
- closed는 기존 예외를 유지해 변경 폭을 줄인다.
- 문서와 테스트를 함께 갱신해 정책을 명시적 contract로 만든다.

### 리스크 2. CSS 최소폭 완화가 작은 화면에서 카드 readability를 해칠 수 있음

대응:

- min-width를 무제한 축소하지 않고, 현재보다만 완화한다.
- 모바일/좁은 화면에서는 horizontal scroll fallback을 그대로 유지한다.
- runtime verification에서 실제 card readability를 확인한다.

### 리스크 3. source에는 있는데 runtime bundle이 구버전일 수 있음

사용자 체감 문제는 소스 코드보다 bundle/서버 재시작 상태일 가능성도 있다.

대응:

- spec 단계에서 runtime verification을 acceptance에 포함한다.
- 구현 완료 주장 전에는 실제 서버 경로/포트/응답 기준으로 확인한다.

## Acceptance Criteria

- open 계열 list/board/epics가 최신 생성일 기준으로 위에 온다.
- closed는 여전히 최근 닫힘 순으로 위에 온다.
- issue detail status select에 `Deferred`가 보인다.
- issues filter dropdown과 inline status select도 `Deferred`를 계속 노출한다.
- Deferred 컬럼을 켜면 board 폭이 재분배되고, 최소폭 contract가 `300px` 기준으로
  완화되어 `Closed` 컬럼이 기존처럼 즉시 밀려나는 현상이 줄어든다.
- 정렬 관련 문서 설명이 코드와 일치한다.
