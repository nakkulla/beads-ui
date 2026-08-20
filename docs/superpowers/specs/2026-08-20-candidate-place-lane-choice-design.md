---
scope:
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/styles.css
---

# 후보 [대기로 ↴]의 대기 레인 선택 설계 (UI-16b8)

- 작성일: 2026-08-20
- 상태: 설계 확정 (선택 UI·레인 0 동작은 사용자 승인)
- Bead: `UI-16b8`
- route: `spec_backed`
- 관련: `docs/superpowers/specs/2026-08-13-worker-mobile-control-first-design.md`
  계열의 `[대기로 ↴]` 도입(UI-58y2/UI-fmwh), 직렬 레인 원설계(UI-04vo)

## 1. 문제와 관측

후보 카드의 `[대기로 ↴]`는 언제나 병렬 대기 큐 말미로만 적재한다 —
`app/views/worker/index.js:4535`의
`placeBead(id, 'parallel', queueTailIndex())`가 레인을 상수로 못박고 있다.

직렬 레인(`s1`..`s5`)으로 넣는 경로는 드래그가 유일하다
(`app/views/worker/index.js:4143`~`4152`). 그런데 `[대기로 ↴]` 버튼 자체가
"드래그가 어려운 환경의 보완재"로 도입된 것이라(`app/styles.css:6539`의
`any-pointer: coarse`/`max-width: 640px`), **버튼이 필요한 환경에서는 직렬
배치가 불가능하다**는 모순이 남아 있다. 모바일에서 직렬 레인에 넣으려면
데스크톱을 열어야 한다.

서버는 이미 준비되어 있다. `worker-queue-place`는
`lane?: 'parallel'|'s1'..'s5'`를 받고(`server/ws/worker-handlers.js:2180`),
`index`를 생략하면 `clampIndex(index ?? arr.length, arr.length)`로 해당 레인
말미에 붙인다(`server/worker/queue-store.js:3358`). 즉 이 작업은 프런트엔드
전용이며 새 프로토콜·새 durable 키가 없다.

## 2. 목표와 불변식

- **드래그와 동일한 자격**: 버튼과 그 선택 칩의 활성 조건은 드래그와 완전히
  같다(`item.draggable && !item.done`). 이 설계는 어디로 넣을지만 넓히고,
  누가 들어갈 수 있는지는 건드리지 않는다.
- **한 번에 하나**: 열려 있는 선택 칩 행은 보드 전체에서 최대 하나다. 다른
  카드의 버튼을 누르면 메뉴가 그 카드로 옮겨간다.
- **탭 수 보존**: 직렬 레인이 하나도 없으면(`serial_lane_count === 0`) 선택
  UI를 띄우지 않고 지금과 똑같이 한 번의 탭으로 병렬 말미에 적재한다.
  선택지가 하나뿐인 선택은 선택이 아니다.
- **드래그 계약 불변**: 카드 바깥의 `draggable`/`data-bead-id`/`data-lane`,
  카드 클릭 시 상세 열기, 드래그 드롭 인덱스 계산은 그대로 둔다. 선택 행은
  카드 푸터 안에서만 교체된다.
- **적재 의미 = 말미**: 버튼 경로의 의미는 드롭 위치가 아니라 "그 레인의
  맨 뒤"다. 병렬은 기존과 같이 `queueTailIndex()`, 직렬은 서버 스냅샷
  `serial_lanes[i].entries.length`를 쓴다 — 뷰모델 `rows`는 ghost 점유 행을
  포함하므로 인덱스 계산에 쓰지 않는다.
- **fail-quiet**: `serial_lanes`/`serial_lane_count`가 없는 구버전 서버
  스냅샷에서는 직렬 칩이 하나도 생기지 않고, 그 결과 §2의 "레인 0" 규칙에
  따라 현행 동작(즉시 병렬 적재)으로 수렴한다.

## 3. 화면 설계

후보 카드 푸터는 두 상태를 가진다. 닫힘이 기본이다.

```
닫힘                            열림
┌ UI-16b8 ──────────────┐      ┌ UI-16b8 ──────────────┐
│ 후보 제목              │      │ 후보 제목              │
│ ● spec ─ ○ impl ─ ○ pr │      │ ● spec ─ ○ impl ─ ○ pr │
│ (이유)     [대기로 ↴]  │      │ [병렬 3][직렬1 0][✕]   │
└───────────────────────┘      └───────────────────────┘
```

- 칩 라벨은 `병렬`, `직렬 1`..`직렬 N`이고 각 칩은 그 레인의 현재 대기
  항목 수를 함께 보여준다 — "어디가 비었나"가 이 선택의 유일한 판단
  근거이기 때문이다. 개수는 대기 entries만 세며 ghost 점유 행은 제외한다.
- 마지막 칩은 취소(`✕`)다. 되돌릴 방법 없이 뜬 메뉴는 잘못 누른 사람을
  가둔다.
- 열림 상태에서는 이유 배지를 감춘다. 좁은 카드에서 이유와 칩 행이 함께
  줄바꿈하면 칩이 두 줄로 흩어져 오탭을 만든다. 이유는 메뉴를 닫으면 다시
  보인다.
- 표시 조건(coarse pointer / 좁은 화면)은 지금처럼 CSS의
  `.worker-card__foot--actions-only`가 소유한다. 이유 배지가 있는 카드는
  데스크톱에서도 푸터가 보이므로 거기서도 같은 선택이 동작한다.

## 4. 상태와 이벤트

- 뷰 로컬 상태 `place_menu_bead_id: string|null` 하나를 추가한다. durable
  저장(localStorage/metadata)은 하지 않는다 — 메뉴는 한 번의 탭 사이에만
  사는 상태다.
- `lanes.js`
  - `candidateCard(item, place_menu)`로 두 번째 선택 인자를 받는다.
    `place_menu`가 없거나 `place_menu.bead_id !== item.id`면 현재와 바이트
    동일한 닫힘 렌더다(기존 호출부·테스트 무변경).
  - `paneTemplate`의 pane 객체에 선택 필드 `place_menu`를 추가하고, 후보
    레인 렌더에서만 `candidateCard(it, pane.place_menu)`로 전달한다.
  - 칩은 `.worker-card__place-lane[data-bead-id][data-lane]`,
    취소는 `.worker-card__place-cancel[data-bead-id]`.
- `index.js` 클릭 핸들러(기존 `.worker-card__place` 분기 자리)
  - `.worker-card__place`: `disabled`면 아무것도 하지 않는다. 직렬 레인
    수가 0이면 `placeBead(id, 'parallel', queueTailIndex())`, 아니면
    `place_menu_bead_id = id` 후 재렌더.
  - `.worker-card__place-lane`: `data-lane`이 `parallel` 또는 `s1`..`s5`일
    때만 `placeBead(id, lane, laneTailIndex(lane))`를 부르고, 응답을
    기다리지 않고 메뉴를 닫는다(적재된 카드는 후보에서 사라진다).
  - `.worker-card__place-cancel`: 메뉴만 닫는다.
  - 세 분기 모두 상세 패널 기본 동작보다 앞에서 `return`한다.
- 메뉴가 열린 bead가 후보 목록에서 사라지면 렌더가 자연히 닫힘 상태를
  그린다. 별도 정리 코드를 두지 않는다.
- `queueTailIndex()`는 `laneTailIndex(lane)`으로 일반화한다. `parallel`은
  기존 동작 그대로이므로 접힌 스트립 드롭(`UI-58y2`)의 호출부 의미는
  변하지 않는다.

## 5. 검증

`app/views/worker/index.test.js`, `app/views/worker/lanes.test.js`에 추가한다.

1. 직렬 레인이 있는 큐에서 `[대기로 ↴]` 탭은 transport를 부르지 않고 칩
   행을 연다.
2. `직렬 2` 칩 탭은 `worker-queue-place`를 `{ bead_id, lane: 's2', index:
   <s2 대기 수>, expected_revision }`로 부른다.
3. `병렬` 칩 탭은 기존과 같은 payload(`lane` 키 없음, 병렬 말미 index)를
   보낸다.
4. 직렬 레인 수가 0이면 탭 한 번에 곧바로 병렬 적재한다(현행 테스트가
   그대로 통과한다).
5. 취소 칩은 transport를 부르지 않고 닫힘 렌더로 되돌린다.
6. 다른 카드의 버튼을 누르면 열린 메뉴는 하나로 유지된다.
7. 칩 클릭은 상세 패널을 열지 않는다.
8. 자격 없는(spec 없는) 후보의 버튼은 여전히 `disabled`이고 메뉴를 열지
   않는다.

`npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, 그리고
프런트 수정이므로 `npm run build`로 번들 갱신까지 포함한다.

## 6. 비목표

- 직렬 레인 개수 변경 UI, 레인 자동 배정(가장 비어 있는 레인 추천), 큐
  중간 삽입은 다루지 않는다. 버튼 경로의 의미는 말미 적재로 고정한다.
- 대기 레인 행(`.worker-mini`)에서의 레인 이동 버튼은 이번 범위가 아니다.
  기존 드래그 경로가 그대로 유일하다.
- 서버·프로토콜·durable metadata 변경 없음.
