# 토큰 배지 헤드라인을 4개 필드 총합으로 교정

- Bead: UI-tq13
- 작성일: 2026-07-30

## 왜

배지 헤드라인이 `input_tokens + output_tokens` 만 더하고 캐시를 제외한다
(`app/utils/token-usage.js` `formatUsageTotal`, 모듈 헤더 주석이 "cache
excluded" 를 설계 의도로 명시). Claude 세션은 컨텍스트 대부분이 캐시 히트로
흐르기 때문에 비캐시 input 이 거의 잡히지 않는다.

실측 — `dotfiles-1ub0` 워커 세션, 시작 43분 경과 시점, 세션 로그 923줄을
`usage-store` 와 동일한 규칙(message_id 별 replace, `result` 는 authoritative
대체)으로 재집계:

| 필드 | 값 |
| --- | --- |
| 입력(비캐시) | 267 |
| 출력 | 2,407 |
| 캐시 읽기 | 13,655,022 |
| 캐시 생성 | 446,503 |
| 현재 배지값 (입력+출력) | 2,674 → `τ 2.7k` |
| 4필드 총합 | 14,104,199 |

배지가 실제 소비의 약 0.02% 만 표시한다. 주석이 밝힌 의도("how much did this
cost")를 현재 산식이 달성하지 못한다.

부차 관측 — 같은 실측에서 assistant 메시지 137개(유니크)가 모두 tally 에 살아
있었고 파싱 실패는 0건이었다. 2026-07-30 11:05:47 의 beads-ui 재시작을 사이에
두고도 누락 구간이 없다. 즉 이 Bead 가 고치는 대상은 집계 경로가 아니라 표시
산식이다.

## 무엇을 바꾸는가

### 1. 헤드라인 산식

`formatUsageTotal` 의 헤드라인을 `input_tokens + output_tokens +
cache_read_input_tokens + cache_creation_input_tokens` 합으로 바꾼다. 모듈에
이미 있는 `SUM_FIELDS` 를 재사용한다. 축약 규칙(`k`/`M`)과 `τ` 접두는 그대로
둔다.

모듈 헤더 주석의 "input + output, cache excluded" 문단을 새 정의와 위 실측
근거로 교체한다.

### 2. `hasTokens` 판정 범위

4개 필드 중 하나라도 유한한 숫자면 `true`(현행: input/output 필드 존재만
검사). `usage-store.get()` 이 항상 4필드를 0으로 초기화해 반환하므로 실동작
변화는 없고, 산식과 판정 기준을 일치시키는 정합 조치다.

"보고된 0" 과 "아예 보고되지 않음" 을 가르는 기존 원칙은 유지한다 — usage 가
없는 attempt 는 여전히 배지를 그리지 않는다.

### 3. 툴팁

`usageTooltip` 의 맨 앞에 `총 <합계>`(`toLocaleString('en-US')`) 를 추가하고
기존 4필드 분해와 비용 표기는 유지한다. `replayed` 안내 줄도 그대로 둔다.

```
총 14,104,199
입력 267 · 출력 2,407 · 캐시읽기 13,655,022 · 캐시생성 446,503 · $12.34
```

### 4. detail-panel 문구

`app/views/detail-panel/session-history.js` 의 총합 `title` 을
`"이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"` 로 교정한다. `τ 총 `
접두 표기는 유지한다.

### 5. 툴바 토큰 KPI 정합

`app/views/worker/index.js` 의 완료 레인 KPI 는 `token_in`/`token_out` 두
변수만 누적하고 `formatUsageTotal` 에 그 둘만 넘긴다. 4필드 누적으로 확장하고,
"보고 안 함 vs 0" 판정(`token_reported`)도 4필드 기준으로 넓힌다. 이 항목을
빼면 행 배지와 툴바가 서로 다른 정의를 표시한다.

KPI 가 "선택 기간에 완료된 이슈들의 생애 전체 토큰"(코호트 합계)이라는 기존
의미는 바뀌지 않는다.

### 6. 레인·타일 비용 병기

`app/views/worker/lanes.js` 와 `app/views/worker/running-grid.js` 는 현재
`usage_label` 만 표시하고 비용을 툴팁에만 둔다. `detail-panel` 은 이미
`τ 총 14.1M · $12.34` 형태로 병기하고 있으므로, 레인·타일을 같은 표기로
맞춘다.

```
진행 중:  τ 14.1M
완료 후:  τ 14.1M · $12.34
```

비용은 토큰을 대체하지 않는다. 같은 열의 숫자가 세션 상태에 따라 척도를 바꾸면
행끼리 비교가 불가능해지기 때문이다. 비용이 없으면 토큰만 찍던 기존 모습을
유지한다.

### 7. 부분 비용 억제

`sumAttemptUsage` 는 현재 비용을 보고한 attempt 만 합산하고 하나라도 보고했으면
`total_cost_usd` 를 채운다(`any_cost`). 한 이슈에 완료 attempt 2개와 진행 중
attempt 1개가 섞이면 토큰 총합은 3개분인데 금액은 2개분만 반영되어, 배지 안에서
두 숫자의 모집단이 갈린다.

판정을 "합산된 attempt **전부**가 cost 를 보고했는가" 로 바꾼다. 하나라도
빠지면 `total_cost_usd` 를 생략한다.

진행 중 attempt 는 `result` 이벤트가 없어 애초에 cost 를 갖지 않으므로, 이
규칙의 실제 효과는 "끝난 이슈에만 금액이 뜬다" 이다. 완료 attempt 가 비정상
종료로 `result` 를 남기지 못한 이슈도 금액이 뜨지 않는데, 이는 비용을 모르는
상태를 정직하게 표시한 것이므로 의도된 동작이다.

## 수용 기준

1. `formatUsageTotal({input:10, output:5, cache_read:999_999,
   cache_creation:999_999})` 이 `τ 2.0M` 을 반환한다.
2. 4필드가 모두 없고 `total_cost_usd` 만 있는 레코드는 여전히 `null` 을
   반환한다(배지 없음).
3. 캐시 필드만 있는 레코드가 배지를 그린다(함수 수준 계약. `usage-store`
   경유 값은 항상 4필드를 채우므로 실제 화면 동작은 바뀌지 않는다).
4. `usageTooltip` 첫 줄이 `총 <합계>` 이고 이어서 기존 4필드 분해가 온다.
5. 워커 레인·타일 배지가 비용이 있을 때 `τ … · $…` 로 병기한다.
6. 합산 대상 attempt 중 하나라도 cost 를 보고하지 않으면 `sumAttemptUsage` 가
   `total_cost_usd` 를 생략한다. 전부 보고하면 합산한다.
7. 툴바 KPI 와 행 배지가 같은 이슈에 대해 같은 정의의 숫자를 표시한다.

## 테스트 범위

계약이 바뀌었으므로 기존 기대값을 새 계약으로 옮긴다. 구현을 테스트에 맞추는
방향이 아니다.

- `app/utils/token-usage.test.js` — `'excludes the cache fields from the
  headline total'` 은 현재 정확히 반대 계약을 못박고 있으므로 포함 계약으로
  뒤집는다(`τ 15` → `τ 2.0M`). 캐시 필드가 있는 다른 케이스의 기대값을
  재계산하고, `hasTokens` 확장(캐시만 있는 레코드)과 부분 비용 억제(완료 2 +
  진행 1 → 금액 없음, 완료 2 → 금액 합산) 케이스를 추가한다.
- `app/views/detail-panel/session-history.test.js` — 픽스처가 캐시 필드를
  들고 있는 케이스의 기대 라벨을 재계산한다.
- `app/views/worker/index.test.js` — 타일·레인 배지와 툴바 KPI 기대값을
  재계산하고, 레인·타일 비용 병기 케이스를 추가한다.

RED-GREEN 을 강제하는 seam 은 두지 않는다. 기존 테스트가 이미 계약을 덮고
있어, 기대값 갱신과 신규 케이스 추가로 충분하다.

## 검증

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build` 후 `app/main.bundle.js` 와 `app/main.bundle.js.map` 을 함께
  커밋
- 머지 후 `bdui-shared restart` 로 공유 서버 반영, 프로세스 경로·포트·HTTP
  응답 확인

## 비목표

- `usage-store` 집계 경로 변경. 실측상 재시작을 사이에 두고도 누락 없이
  집계되고 있다.
- `replayed` "부분 집계" 배지 표기 조정. 별건이다.
- 비용 가중합 산식(모델별 계수 필요) 및 `total_cost_usd` 의 헤드라인 승격
  (세션 종료 전 미제공). 둘 다 검토 후 기각했다.
