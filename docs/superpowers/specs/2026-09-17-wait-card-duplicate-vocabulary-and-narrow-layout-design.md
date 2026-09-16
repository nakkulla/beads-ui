---
scope:
  - app/views/worker/
  - app/views/monitor/
  - app/utils/relative-time.js
  - app/styles.css
  - server/worker/wait-judgment.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-16-wait-surface-density-vocabulary-design.md
---

# 대기 카드 표면 정리 2차 — 선행 대기 이중 배지·사족 문장 제거, 시각 줄 종류별 라벨, 좁은 화면 배치 교정 (UI-0bvr)

## 1. 문제 (2026-09-17 관측, origin/main `df42f7b`)

사용자가 공유 서버 모바일(390px) 워커 탭 스크린샷 3장으로 제기했다. 큐 파일 실측으로
원인을 확정했다.

**같은 사실을 두 번 말한다.** Analysis-1u8o 카드에 `⛓ 선행 대기`가 두 번 선다. 실측한
큐의 admission은 `{reason: "prerequisite_unmet", blockers: [{id: "Analysis-c312",
status: "open"}]}`이고, 이 한 기록에서 두 렌더가 각자 배지를 만든다.
`lane-model.js:1627` `admissionBadge`가 문자열 `⛓ 선행 대기`를 만들어 사유 줄
(`.worker-mini__reason`, `flex: 1 0 100%`)로 보내고, `lanes.js:2841`
`waitStatusBadge`가 서버 `wait_reasons`의 같은 사실로 판정 배지를 또 만든다.
PROSTATE-67r에 배지가 하나뿐인 것은 규칙이 달라서가 아니라 그 bead에 admission 기록이
아예 없어 앞쪽이 발화하지 않기 때문이다.

**칩이 말한 것을 문장이 되풀이한다.** `wait-judgment.js:206` `prerequisiteHeadline`이
`<ID> "<제목>" 완료를 기다림 (open)`을 만든다. 같은 카드의 슬롯 1 배지가 `선행 대기`를,
슬롯 4a 칩이 `⛓ Analysis-c312`를 이미 말한다. 사용자 표현으로 "블로킹 되어 있는 것만
으로도 알 수 있는" 사실이다.

**자동 정렬의 근거가 카드 상태인 척한다.** `worker/index.js:3056`이
`🔗 <ID> 뒤 (blocks 자동)` 배지를 대기 행 맨 앞에 붙인다. 카드 왼쪽 순번과 선행 칩이
이미 순서와 이유를 말하므로 세 번째 진술이다.

**시각 줄의 라벨이 값과 다르다.** `lanes.js:2383`이 `확인 <t>`를 그린다. 그 값은
`options.last_observed_at`이 없을 때 `reason.since`로 떨어지고, 그 인자를 넘기는 호출부는
상세 패널뿐이다(`detail-panel/index.js:3001`). 워커·모니터의 모든 행과 타일은 따라서
"대기가 시작된 시각"을 "확인"이라고 적는다. 둘째 조각 `다음 <t>`도 종류마다 다른 일을
가리킨다: 외부 작업은 다음 관측, 공급자 보류는 다음 프로브, 재시도 대기는 다음 재시도다.

**막힘 집계가 막힌 행을 빠뜨린다.** prostate 큐 실측에서 직렬 레인 s1은
`[PROSTATE-u53, PROSTATE-67r, PROSTATE-6rh]`이고 셋 다 `open`이며, admission에는
`PROSTATE-6rh: {reason: "spec_review_stale", stale: true}` 하나만 있다.
`wait-judgment.js:429`의 선행 사유 생성은 세 갈래(`held`·`admitted`·`bare`)인데
`bare`가 `!attempt && !record`를 요구한다. 6rh는 선행과 무관한 `spec_review_stale`
기록 하나 때문에 `bare`에서 탈락해 선행 사유를 얻지 못하고, 배지도 집계도 없다.

**좁은 화면에서 조작이 흩어진다.** 대기 행은 한 줄 변형(`.worker-mini__line`,
`flex-wrap: wrap`)이라 390px에서 서너 줄로 접히고, `margin-left: auto`인 조작 묶음
(`.worker-mini__rowops`)이 소스 순서상 마지막이라 자기 줄로 떨어진다. 그 안의 `✕`는
`.op-btn--icon`의 32px 정사각 테두리라 빈 상자에 작은 글리프만 남는다.

**툴바 입력이 라벨 아래로 떨어진다.** `동시 실행`·`직렬 레인`은 글자와 입력을 함께 담은
`<label>`인데 줄바꿈 금지가 `styles.css:8419`의 `min-width: 1401px` 안에만 있다.

**막힘 팝오버가 잘린다.** `.wait-summary__popover`는 `position: absolute`인데 모바일
리본 `.worker-ribbon`에 `overflow-x: auto`가 걸려 클리핑 문맥이 된다.

## 2. 사용자 결정 (2026-09-17)

1. **시각 줄은 지우지 말고 이름을 붙인다.** 다만 선행 대기에서는 그리지 않는다. 대화
   과정에서 "시간만 띡 보여주는 게 아니라 그 시간이 무슨 뜻인지 알 수 있어야 한다"가
   먼저 정해졌고, 그 뒤 "선행 대기에서는 굳이 안 보여줘도 될 듯"이 정해졌다.
2. **대기 행의 카드 구조는 좁은 화면(≤640px)에서만.** 데스크톱의 한 줄 밀도는 유지한다.
3. **막힘 숫자는 늘리지 않는다.** 막힌 행에 배지는 세우되 집계는 지금 크기를 지킨다.
4. 선행 대기 이중 배지·`완료를 기다림` 문장·`(blocks 자동)` 배지는 없앤다. `✕`는 모양을
   고치고, 툴바 라벨 줄바꿈 금지는 모든 폭으로 올리며, 막힘 팝오버는 최상위 층으로
   옮긴다.

세션이 정한 것(사용자 확인 없이 진행, 이 스펙이 근거): 3번을 원칙으로 만드는 규칙은
"간접 선행은 세지 않는다"이고(§6.2), 시각 줄의 낱말은 렌더가 아니라 어휘 표가
소유하며(§5.1), 팝오버 전환은 네이티브 modal `<dialog>`다(§8).

## 3. 검증된 전제

- `WaitReason`의 시각 칸은 `since`·`next_check_at`·`resets_at` 셋뿐이고
  (`wait-judgment.js` `addClocks`), `since`의 뜻은 모든 종류에서 "이 대기가 시작된
  시각"이다: 외부 작업은 `registered_at`, 선행 대기는 `attempt.finished_at ??
  record.at`, 공급자 보류는 `hold.since`, 재시도 대기와 반영 대기·복구는
  `attempt.finished_at`/`operation.finished_at`. `next_check_at`을 싣는 종류는 외부
  작업·공급자 보류·재시도 대기 셋이고 `resets_at`은 한도 보류만 싣는다.
- 배지 팝업은 이미 `관측 시작 <t>`를 evidence 줄로 싣는다(`lanes.js` `waitReasonLines`
  의 `evidence`). 시각 줄을 지워도 값은 남는다.
- `admissionBadge`가 `⛓ 선행 대기`를 만드는 조건은
  `reason === 'prerequisite_unmet' && Array.isArray(record.blockers) &&
  record.blockers.length > 0`이고, 서버가 같은 사유를 내는 조건은
  `record.reason === 'prerequisite_unmet' && Array.isArray(record.blockers)`에 더해
  그 blocker 중 하나 이상이 열려 있는 것이다. 클라이언트가 그리는 경우는 blocker가
  전부 닫힌 순간을 빼면 서버 조건의 부분집합이다. 그 예외는 해제된 막힘의 잔상이다.
- `.worker-mini--card`는 PR 대기 전용이 아니라 일반적인 세로 카드 껍데기다
  (`styles.css:6078`: `flex-direction: column`, `.worker-mini__head`/`__foot`는 flex
  한 줄). 대기 행이 그대로 쓸 수 있다.
- 두 탭 모두 `matchMedia` 기반 `is_mobile`을 이미 들고 있다(`worker/index.js:1812`,
  `monitor/index.js:420`). `matchMedia`가 없는 런타임은 데스크톱으로 남는다.
- 보드 탭 팝업은 이미 네이티브 modal `<dialog>`로 브라우저 최상위 층에 뜨고 ESC를
  `cancel`로, 배경 클릭을 "이벤트 target이 dialog 자신일 때"로 판정한다
  (`board/index.js:669`·`729`·`763`).
- `app/utils/relative-time.js`에는 경과 시간을 "N시간째"로 적는 함수가 없다.
  `formatRelativeTime`은 "N시간 전", `formatClockLocal`은 `HH:MM`이다.
- `lane_states[].corrections`는 서버가 내는 계약 필드이고, 소비처는
  `worker/index.js`의 `waitingFacts`/`waitingRowOf` 하나뿐이다.

## 4. 선행 대기를 말하는 층을 하나로 줄인다

### 4.1 admission 배지에서 선행 갈래를 걷는다

`admissionBadge`의 `prerequisite_unmet` 갈래는 `⛓ 선행 대기`를 반환하는 대신 빈
문자열을 반환한다. 이미 `grace_period`와 `serial_lane_not_head`가 같은 모양으로 서 있고,
"이 사유는 뱃지를 만들지 않는다" 목록에 한 줄이 느는 것이다.

빈 문자열이어야 하고 갈래 삭제여서는 안 된다. 갈래를 지우면 함수 끝의
`` return `⛔ ${reason}` ``로 떨어져 `⛔ prerequisite_unmet`이 뜬다.

`waitingItem`의 `prerequisites_released` 분기(열린 선행이 비면 `reason`을 빈 문자열로
덮는 갈래)도 함께 지운다. 그 분기가 막으려던 잔상이 §4.1로 사라지므로 남으면 선행과
무관한 다른 사유(`♻️ stale→재리뷰`, `⛔ …`)까지 덮는 부작용만 남는다.

### 4.2 선행 대기는 headline을 싣지 않는다

`prerequisiteHeadline`을 없애고 `prerequisite`·`prerequisite_foreign` 사유의 `headline`은
빈 문자열로 둔다. `waitReasonLines`의 본문은 `reason.headline`이 비면 이미 그리지
않으므로(fail-quiet) 카드 렌더는 그대로다. 외부 작업·공급자 보류·재시도 대기의 headline은
칩이 말하지 않는 사실이므로 바꾸지 않는다.

한 곳이 연쇄된다. 막힘 요약 팝오버의 항목 줄이 `${reason.headline}`을 그대로 쓰므로
(`lanes.js` `blockedSummaryTemplate`) 선행 항목의 문장이 빈다. 항목 줄은 전용 조립
함수를 쓴다: `headline`이 있으면 그것, 없으면 `targets` 중 `kind === 'issue'`인 것들로
`선행 <ID>` 또는 `선행 <ID> 외 <N-1>`을 만든다.

blocker별 상태(`open`/`blocked`)는 `targets[].status`에 이미 실려 있다. 슬롯 4a 선행 칩의
`title`이 `<ID> · <status>`를 싣는다. 상태가 없으면 ID만 싣는다(fail-quiet).

### 4.3 `(blocks 자동)` 배지를 없앤다

`worker/index.js`의 `` `🔗 ${correction} 뒤 (blocks 자동)` `` 배지와, 그 값을 모으는
`waitingFacts`의 `correction_after` 맵을 함께 지운다. 서버의
`lane_states[].corrections` 필드는 그대로 두고 소비만 멈춘다. 순번 툴팁으로 옮기지
않는다 — 자동 정렬의 시점은 카드가 답하는 질문이 아니다.

## 5. 시각 줄은 종류가 자기 낱말을 고른다

### 5.1 어휘 표가 낱말을 소유한다

`wait-vocabulary.js`의 `WAIT_KINDS` 행에 두 칸을 더한다.

| 칸 | 뜻 | 없을 때 |
| --- | --- | --- |
| `elapsed_word` | 경과 조각의 낱말 (`5시간째 <낱말>`) | 경과 조각을 그리지 않는다 |
| `next_word` | `next_check_at` 조각의 낱말 (`<낱말> 11:55`) | 다음 조각을 그리지 않는다 |

렌더 쪽 매핑이 아니라 표여야 한다. 도움말 범례가 같은 표를 읽으므로(UI-8gem이 세운
구조) 낱말이 한 곳에만 있어야 범례와 카드가 갈라지지 않는다.

| 대기 종류 | `elapsed_word` | `next_word` |
| --- | --- | --- |
| `prerequisite` | 없음 | 없음 |
| `prerequisite_foreign` | 없음 | 없음 |
| `external_job` | 대기 | 다음 확인 |
| `provider_hold` | 보류 | 다음 프로브 |
| `retry_wait` | 대기 | 다음 재시도 |
| `base_moved` | 대기 | 없음 |
| `recovery` | 대기 | 없음 |
| `awaiting_user` | 대기 | 없음 |
| `stale_work` | 대기 | 없음 |

선행 대기 두 종류는 두 칸이 모두 없으므로 시각 줄 자체가 서지 않는다. 그 대기의 시작
시각은 배지 팝업의 `대기 시작 <t>` 줄에 남는다. `stale_work`는 `since`를 싣지 않으므로
칸이 있어도 실제로는 그려지지 않는다(fail-quiet) — 칸은 나중에 `since`가 실릴 때를
위한 것이 아니라, 재료가 생기면 낱말이 이미 정해져 있게 하기 위한 것이다.

### 5.2 조립과 형식

```
<경과>[ · <다음 조각>]
```

- 경과: `formatElapsedSince(reason.since, now)` + ` ` + `elapsed_word`. 새 함수를
  `app/utils/relative-time.js`에 더한다. 60분 미만은 `<n>분째`, 48시간 미만은
  `<n>시간째`, 그 이상은 `<n>일째`. 값이 없거나 미래면 빈 문자열이다.
- 다음 조각: `resets_at`이 있으면 `리셋 <HH:MM>`, 없고 `next_check_at`과 `next_word`가
  있으면 `<next_word> <HH:MM>`. 시각은 기존 `formatClockLocal`이다.
- 두 조각 다 비면 줄을 그리지 않는다.
- 줄의 `title`에 `대기 시작 <formatTimestampLocal(since)>`를 싣는다. 절대 시각은
  `timesMeta`가 하는 것과 같은 자리에 둔다.

리셋은 라벨이 앞에 선다(`리셋 14:00`). 대화에서 스케치한 `14:00 리셋`과 어순이 다르지만,
같은 줄의 다른 조각이 전부 라벨 선행이라 한 줄 안에서 어순이 갈리지 않는 쪽을 택한다.

예시:

| 대기 종류 | 지금 | 이 설계 |
| --- | --- | --- |
| 선행 대기 | `확인 01:29` | 줄 없음 |
| 외부 작업 | `확인 23:03 · 다음 11:55` | `3시간째 대기 · 다음 확인 11:55` |
| 공급자 한도 | `리셋 14:00` | `40분째 보류 · 리셋 14:00` |
| 재시도 대기 | `확인 08:12 · 다음 08:27` | `9분째 대기 · 다음 재시도 08:27` |

### 5.3 팝업 낱말도 맞춘다

배지 팝업 evidence의 `관측 시작 <t>`를 `대기 시작 <t>`로 바꾼다. 같은 값을 카드와 팝업이
다른 말로 부르면 이번에 고치는 이유가 그대로 남는다. `다음 확인 <t>`·`리셋 <t>` 줄은
그대로다.

## 6. 서버 선행 사유와 막힘 집계

### 6.1 무관한 admission 기록이 선행 사유를 막지 않는다

`bare` 갈래의 조건에서 `!record`를 뺀다. 판정 문장은 "attempt도 admission도 blocker를
싣지 않았으면 `blocked_by`를 읽는다"가 된다. 구현은 `held`·`admitted` 두 갈래가
`sources`에 아무것도 넣지 않았을 때 `blocked_by[bead_id]`를 넣는 것이다.

`!attempt` 조건은 남긴다. 실행 이력이 있는 bead의 대기 사유는 그 attempt의
`cause_detail`이 소유하고, 그 경로는 `held`가 이미 판정한다.

효과는 관측된 그대로다. PROSTATE-6rh가 `spec_review_stale` 기록을 가진 채로 열린 선행
PROSTATE-67r을 얻어 `⛓ 선행 대기` 배지를 세운다.

그 카드에는 `⛓ 선행 대기` 배지와 `♻️ stale→재리뷰` 사유가 함께 선다. 겹치는 진술이
아니다. 앞은 못 가는 이유이고 뒤는 갈 때 세션이 할 일이다. `stale`은 차단이 아니라
비-차단 관측이라는 기존 판정(UI-dlim)을 그대로 따른다.

### 6.2 막힘 집계는 간접 선행을 세지 않는다

`blockedSummary`는 어떤 이슈의 열린 선행이 **전부** 같은 워크스페이스의 다른 막힌 대기
행이면 그 이슈를 세지 않고 팝오버 목록에도 넣지 않는다. 카드 배지는 그대로 선다.

근거는 그 숫자가 답하는 질문이다. `막힘 N`은 "지금 손댈 곳이 몇 군데인가"다. 선행이
그 자신 막혀 있는 이슈는 상류를 풀면 함께 풀리므로 손댈 곳이 아니고, 상류 행이 이미
그 막힘을 대표한다.

판정 재료는 이미 있다. `blockedSummary`가 받는 `wait_reasons` 집합에서 선행 사유의
`subject.bead_id` 전체가 "막힌 행"의 집합이고, 각 사유의 `targets`가 그 이슈의 열린
선행이다. 한 사유의 `targets`가 전부 그 집합 안에 있으면 그 사유의 subject를 세지
않는다. 다른 저장소 선행(`prerequisite_foreign`)은 그 집합에 들어올 수 없으므로 언제나
셈에 남는다.

관측 대조: prostate에서 PROSTATE-67r의 선행 PROSTATE-u53은 막힌 행이 아니므로 67r을
세고, PROSTATE-6rh의 선행 PROSTATE-67r은 막힌 행이므로 6rh를 세지 않는다. 결과는
`막힘 1`로 지금과 같다.

이 규칙은 선행 사유에만 건다. 다른 종류(외부 작업·공급자 보류·사람 대기·복구·기준
이동·재시도)의 집계 방식은 바꾸지 않는다.

## 7. 좁은 화면 배치

### 7.1 대기 행은 ≤640px에서 카드 변형을 쓴다

`miniRow`에 `options.card` 불리언을 더한다. 기존 `card` 판정(PR 대기·REVISE 파킹·처분
카드)에 `|| options.card === true`를 더하는 한 줄이다. 두 탭이 자기 `is_mobile`을
넘긴다. 데스크톱은 지금의 한 줄 변형 그대로다.

카드 변형에서 머리 줄은
`grip · seq · id · priority · pr · foreign · badges · reason · wait_badge · actions`,
본문은 제목이다. 조작 묶음은 머리 줄의 `margin-left: auto` 자리에 고정되므로 접힌
줄로 떨어지지 않는다.

### 7.2 대기 행 조작 아이콘

`.op-btn--ghost` 변형을 더하고 `.worker-mini__rowops`의 세 버튼(`↑`·`↓`·`✕`)이 쓴다.
테두리와 배경이 없고 글리프는 `--fs-body`이며, `:hover`·`:focus-visible`·`:active`에만
배경이 든다. 최소 표적 크기(좁은 화면 32px)는 지금 그대로 유지한다 — 보이는 상자만
걷고 누를 수 있는 넓이는 줄이지 않는다.

`✕`는 대기에서 후보로 되돌리는 유일한 경로이므로(기존 주석) 상시 표시도 그대로다.

### 7.3 툴바 라벨

`.worker-play`·`.worker-tgl`의 `white-space: nowrap`을 `min-width: 1401px` 블록 밖으로
옮겨 모든 폭에 적용한다. `.worker-tgl`에 `display: inline-flex; align-items: center;
gap: var(--sp-4)`를 준다. 라벨과 입력이 한 줄에 서고 알약이 두 줄이 되지 않는다.

## 8. 막힘 팝오버는 최상위 층으로 간다

`blockedSummaryTemplate`의 `<details>` + `.wait-summary__popover` 구조를 네이티브 modal
`<dialog>`로 바꾼다.

- 칩은 `<button class="worker-kpi__chip">`이고 클릭이 `showModal()`을 부른다.
- 닫기는 ESC(`cancel` 이벤트)와 배경 클릭이다. 배경 판정은 보드 탭과 같다 — 이벤트
  target이 dialog 자신일 때만 배경이다.
- 항목 클릭은 dialog를 닫고 기존 `scrollToWaitCard`를 그대로 부른다. 그 함수의
  `popup.open = false` 갈래는 dialog `close()`로 바뀐다.
- 내용(그룹·항목·`큐:` 줄)과 집계 규칙은 §6.2 말고는 그대로다.

최상위 층이므로 리본의 `overflow-x: auto`와 무관해진다. Monitor 탭의 같은 템플릿도 함께
바뀐다.

## 9. 슬롯 표와 어휘 표 갱신 (ADR 0014)

라벨·칩·버튼의 자리는 슬롯 표가 정하므로 코드보다 먼저 두 스펙을 고친다.

- `2026-08-25-card-header-grammar-unify-design.md` §5.1: 대기 행이 좁은 화면에서 카드
  변형을 쓴다는 것과, 슬롯 1의 admission 사유 목록에서 `prerequisite_unmet`이 빠진다는
  것을 적는다.
- `2026-09-16-wait-surface-density-vocabulary-design.md` §9: 슬롯 7 정의를 이 스펙 §5가
  대체한다. 그 절에 이 스펙 경로를 승계 인용으로 적는다.
- `wait-vocabulary.js` `WAIT_KINDS`에 §5.1의 두 칸을 더하고 범례가 같이 읽는다.

## 10. 테스트

- `lanes.test.js`: 선행 사유 하나만 실린 대기 행에 `선행 대기` 문자열이 정확히 한 번
  나타난다. 선행 대기 행에 `.wait-reason__times`가 없다. 외부 작업·공급자 한도·재시도
  대기 행의 시각 줄 문자열이 §5.2의 형식과 같다. 요약 팝오버의 선행 항목 줄이
  `선행 <ID>` 조립을 쓴다.
- `lane-model.test.js`: `prerequisite_unmet` admission이 있는 대기 항목의 `reason`이 빈
  문자열이다. 선행이 전부 닫힌 admission 기록이 남아 있어도 `⛔ prerequisite_unmet`이
  뜨지 않는다. `(blocks 자동)` 배지가 더는 만들어지지 않는다.
- `wait-judgment.test.js`: 선행과 무관한 admission 기록(`spec_review_stale`)을 가진
  대기 항목이 `blocked_by`에서 선행 사유를 얻는다. `prerequisite` 사유의 `headline`이
  빈 문자열이다. 실행 중 attempt가 있는 bead는 여전히 `held` 갈래로만 판정된다.
- `wait-vocabulary.test.js`: 두 새 칸이 모든 행에 정의되어 있고 선행 두 종류는 비어
  있다. 범례가 그 칸을 읽는다.
- 막힘 집계: 선행이 막힌 행인 이슈가 집계와 팝오버에서 빠지고 카드 배지는 남는다.
  다른 저장소 선행은 빠지지 않는다.
- `relative-time` 단위 테스트: 분·시간·일 경계와 미래 시각.
- 좁은 화면: `is_mobile`이 참일 때 대기 행이 `.worker-mini--card`를 얻고 거짓일 때
  `.worker-mini__line`을 얻는다.
- `styles.*.test.js` 계열: `.worker-tgl`의 `white-space`가 미디어 쿼리 밖에 있고
  `.op-btn--ghost`가 테두리를 갖지 않는다.
- 캡처 검증: 390px iframe 래퍼로 워커 탭 대기 레인과 막힘 팝오버를 찍어 카드 접힘과
  팝오버 잘림이 사라졌는지 본다.

## 11. 경계·비목표

- Monitor 탭은 `miniRow`·`blockedSummaryTemplate`을 그대로 부르므로 별도 작업이 아니라
  같은 변경의 결과다. 두 탭의 스냅샷 테스트만 갱신한다.
- 상세 패널이 `last_observed_at`을 넘기는 경로는 바꾸지 않는다. 그 화면에서는 `확인`이
  실제로 마지막 관측 시각이다.
- 결정: `lane_states[].corrections` 서버 계약은 바꾸지 않는다 — 소비를 멈추는 것과 계약을
  없애는 것은 다른 일이고, 스케줄러의 자동 정렬 기록은 타임라인이 여전히 쓴다.
- 결정: `serial_lane_not_head` 판정과 후보 수집 규칙은 바꾸지 않는다 — 이 설계는 표시
  층만 다루고 실행 자격은 건드리지 않는다.
- `worker-queue-start-now`·유예 칩·`manual_only`는 UI-3pu9가 방금 정리했으므로 손대지
  않는다.
- 관찰: UI-1l3a의 스펙(`2026-09-17-provider-gate-verdict-coherence-design.md` §3.3)이 같은
  `admissionBadge`에 `provider_gate → ''` 갈래를 더한다. §4.1의 `prerequisite_unmet → ''`와
  형태가 같고 의미는 독립이라 전제 의존이 아니다. 나중에 착지하는 쪽이 같은 함수에서
  rebase하면 된다 — 두 갈래를 한쪽이 삼키지 않게만 본다.
- 후속 Bead 후보 없음. 이 스펙의 여덟 항목이 한 사람의 한 벌이다.

## 12. 결정 (ADR 후보)

- 전제: ADR 0014 — 단일 `buildLanes`와 공유 슬롯 표를 유지하고, 대기 행의 카드 변형과
  admission 사유 목록 변경을 §9에서 슬롯 표에 먼저 반영한다.
- 전제: ADR 0038 — 처분 대기 admission은 대기 행이 대표한다. 이 설계는 그 행에 선행
  배지를 더할 뿐 대표를 바꾸지 않는다.
- 전제: ADR 0034 — 복귀 재스캔 후보는 `waiting` attempt와 `prerequisite_unmet`
  admission 큐 항목이다. §6.1은 표시용 사유 생성만 넓히고 그 후보 집합은 건드리지
  않는다.
- 전제: ADR 0012 — dotfiles 계약의 확인된 필드만 소비하고 부재 시 표시를 생략한다.
- 후보 1: 선행 대기는 서버 판정 한 층만 말한다. 클라이언트 admission 투영은 선행
  사유에 배지도 문장도 만들지 않고, 선행 대기 사유는 headline을 싣지 않는다(본문 줄이
  비면 그리지 않는 기존 fail-quiet 규칙을 그대로 탄다).
  - 되돌리기 어려움: 두 탭의 대기 행·요약 팝오버·테스트가 "선행은 서버 사유만"에
    묶이고, 서버가 선행 사유를 내지 못하는 상태에서는 카드가 침묵한다 — 되돌리려면
    클라이언트 투영을 다시 세우고 두 층의 우선순위를 새로 정해야 한다.
  - 맥락 없이 의외: 같은 admission 기록을 두 곳이 읽는데 한쪽만 그린다는 것은 코드만
    보면 드러나지 않는다. `admissionBadge`가 선행에만 빈 문자열을 돌려주는 이유가
    서버 사유의 존재라는 사실은 함수 안에 없다.
  - 실제 절충: 서버 사유가 없는 순간에는 카드가 선행 사정을 말하지 않는다. 대신 해제된
    막힘의 잔상이 사라지고 카드당 진술이 하나가 된다.
  - `summary`: "선행 대기는 서버 판정 한 층만 말하고 클라이언트 admission 투영은 선행
    사유에 배지도 문장도 만들지 않는다" → ADR
- 후보 2: `막힘 N`은 지금 손댈 곳의 수다. 열린 선행이 전부 같은 워크스페이스의 다른
  막힌 행인 이슈는 집계와 요약 목록에서 빠지고 카드 배지만 얻는다.
  - 되돌리기 어려움: 집계·요약 팝오버·알림이 같은 술어를 공유하게 되고, 무관한
    admission 기록이 선행 사유를 막지 않게 넓힌 §6.1과 짝이라 한쪽만 되돌리면
    숫자가 뛴다.
  - 맥락 없이 의외: 카드에 배지가 있는데 막힘 목록에 그 이슈가 없다. 규칙을 모르면
    누락으로 읽힌다.
  - 실제 절충: 막힌 이슈의 총수를 한눈에 보지 못한다. 대신 숫자가 사람이 지금 처리할
    수 있는 건수와 일치하고, 직렬 레인이 길어져도 숫자가 레인 길이만큼 부풀지 않는다.
  - `summary`: "막힘 집계는 지금 손댈 곳의 수이며 열린 선행이 전부 다른 막힌 행인
    이슈는 집계에서 빠지고 카드 배지만 얻는다" → ADR, supersede UI-3pu9
- 후보 3: 대기 시각 줄의 낱말은 어휘 표가 종류별로 소유하고 재료가 없는 조각은 그리지
  않는다.
  - 되돌리기 쉬움: 표에 칸 둘을 더하고 조립 함수 하나를 고치는 일이며 계약 필드는
    바뀌지 않는다.
  - 맥락 없이 의외 아님: 범례가 같은 표를 읽는 구조가 코드에 이미 있다.
  - 실제 절충 없음: 낱말을 렌더에 두는 다른 선택지는 범례와 카드의 어긋남만 낳는다.
  → ADR 아님
- 후보 4: 대기 행은 ≤640px에서 머리·본문 카드 변형을 쓴다.
  - 되돌리기 쉬움: `miniRow` 옵션 하나와 두 탭의 호출 인자다.
  - 맥락 없이 의외 아님: 폭에 따라 변형을 바꾸는 것은 이 저장소의 기존 패턴이다.
  - 실제 절충 없음: 데스크톱 밀도를 그대로 두는 선택을 사용자가 이미 했다.
  → ADR 아님
