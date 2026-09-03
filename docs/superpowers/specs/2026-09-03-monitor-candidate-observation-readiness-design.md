---
scope:
  - server/worker/runnable-cache.js
  - server/ws/monitor-handlers.js
  - app/views/worker/lane-model.js
  - app/views/worker/placement.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
---

# 모니터 후보 레인 관측 집합 정렬과 준비도 세그먼트 (UI-ff10)

## 1. 문제

사용자가 2026-09-03에 관측한 두 가지다.

1. 모니터 탭 후보 레인에 스펙 미발행 `spec_backed`/`full_plan` 이슈가 나타나지
   않는다. 필터가 감추는 것이 아니라 모집단에 없다. 후보 원천인
   `server/worker/runnable-cache.js`의 `qualify()`는 "지금 Worker가 dispatch
   가능한가"를 판정하므로, `RUNNABLE_ROUTES` 통과에 더해
   `spec_backed`/`full_plan`은 spec 경로와 형식 유효한 `spec_review` 영수증을
   요구한다(`:85`, `:396`). 미발행 행은 `null`이 되어 배열에 실리지 않는다.
2. `spec 있음` 세그먼트로 "지금 착수 가능한 것"을 보려 하면 `quick_fix`가
   빠진다. `published` 판정은 route와 무관하게 "spec 경로 + `spec_review`
   영수증"이므로 판정 자체는 정확하고(`app/views/worker/lane-model.js:92`,
   UI-vb7u), 어긋난 것은 **세그먼트가 답하는 질문**이다. `quick_fix`는 스펙
   없이도 admission을 통과하므로 "발행된 스펙이 있나"와 "지금 착수 가능한가"가
   갈라진다. 결과적으로 지금 `spec 없음` 세그먼트는 사실상 "스펙 없는
   `quick_fix`"만 담는다.

### 1.1 Worker 탭은 이미 넓다

이 일은 새 개념을 만드는 것이 아니라 **Monitor를 UI-8881이 이미 정한 자리로
맞추는 것**이다. `app/views/worker/workspace-adapter.js:365`의 `runnableRows()`는
Board live store의 ready+blocked 열 전부를 관측 행으로 그리고 "`worker-ineligible`도
spec 미발행도 제외 사유가 아니다 — 워커 탭은 후보를 **관측**하는 화면이고, 실행
안전은 서버 admission이 지킨다"고 명시한다. 제외는 이미 어느 레인에 선 bead와
phase child뿐이다.

Monitor가 좁은 것은 원천이 다르기 때문이다. Worker는 레포 하나의 live store를
쓰고, Monitor는 레포 N개를 서버 `runnable` 투영으로 받는다. 그 투영을 만드는
`runnable-cache`가 admission 사전필터를 겸하면서 두 탭의 후보 레인이 다른 집합을
말하게 되었다.

### 1.2 확장의 안전성

`runnable-cache.js`는 헤더(`:18`)가 선언한 대로 **표시 전용 사전필터**다. 소비자는
monitor 투영(`server/ws/monitor-handlers.js`), 모니터 레인 카운트, 그리고
worker-handlers의 scope 장식(`runnablePeek`, UI-f3ma)뿐이고, Worker 스케줄러의
dispatch 경로는 이 캐시를 읽지 않는다(`bd ready`가 원천). 따라서 모집단을 넓혀도
실행 안전에 영향이 없다. 큐 진입 자격은 그대로 서버 admission
(`server/worker/admission.js`)이 권위 있게 판정한다.

## 2. 사용자 확정 결정 (2026-09-03)

| # | 결정 | 근거 |
|---|---|---|
| 1 | 모니터 후보 레인의 모집단을 `status=open`의 미착수 이슈 전체로 넓힌다 — 스펙 미발행, route 미핀, 본문 없는 `quick_fix`, `worker-ineligible`을 모두 포함한다 | 레포 간 계획을 세우려면 아직 못 가는 것도 보여야 한다. blocked 기본값을 "표시"로 둔 2026-08-24 결정과 같은 논리 |
| 2 | 세그먼트 축을 `전체 / 착수 가능 / 준비 필요`로 바꾸고, 구체 사유는 카드 판정 칩이 말한다 | 확장 범위가 넓어 "스펙 필요" 하나로는 사유를 담을 수 없다. 세그먼트는 "지금 대기열에 넣으면 실행되나" 이분법만 답한다 |
| 3 | 세그먼트 축 변경은 **두 탭 모두**에 적용한다 | Worker 후보 레인에도 이미 미발행·`worker-ineligible` 행이 섞여 있어 같은 어긋남이 존재한다. 같은 자리에 다른 어휘가 서면 카드·칩 문법 통일 원칙이 깨진다 |
| 4 | '준비 필요' 행은 대기 배치 조작(`↴ 대기로`·드래그)을 차단하고 사유를 말한다 | 후보 레인 조작의 의미("큐에 넣으면 실행된다")를 유지한다 |
| 5 | '준비 필요' 행은 흐리게 그린다 | blocked 카드가 이미 흐리다. "지금은 못 간다"는 같은 사실을 같은 모양으로 말한다 |
| 6 | 레인 카운트·레포 섹션 생략 판정·데크 타일 후보 수에 확장 행을 포함한다 | "모두 보이게"라는 결정 1과 일관된다 |
| 7 | 모니터 후보 레인의 기본 세그먼트는 `전체` | 결정 1과 같은 논리. 옛 저장값 `with`/`without`은 읽지 않고 `all`로 시작한다 |

## 3. 서버 — 모집단 확장과 opt-in 진입

### 3.1 `qualify()`를 채택과 판정으로 가른다

지금 `qualify(row, blocked_by, enrich)`는 하나의 `null` 반환으로 두 가지를 함께
결정한다: 이 행을 실을 것인가, 그리고 이 행이 admission을 통과하는가. 이 둘을
가른다.

- **채택 조건 (넓은 쪽)** — `bead_id`가 있고, `row.status === 'open'`이며,
  `isPhaseChild(row)`가 아니다. 그 외에는 아무것도 보지 않는다. route 미핀,
  스펙 미발행, `worker-ineligible`, 본문 없는 `quick_fix`, `spec_id` 충돌은 모두
  채택된다.
- **판정 (좁은 쪽)** — 지금의 조건을 그대로 계산해 행에 싣는다. 값이 아니라 **사실**로
  싣는다(§3.2). `admitted: boolean`은 그 사실들로 접은 결과이며, 지금
  `qualify()`가 행을 돌려주던 조건과 정확히 같다.

`RUNNABLE_ROUTES`의 의미는 "admission이 받는 route"로 유지한다. route 미핀 행은
`route: ''`로 실리고 `admitted: false`다.

### 3.2 행이 싣는 사실

`RunnableItem`에 다음을 더한다. 모두 **판정이 아니라 재료**다.

| 필드 | 값 | 뜻 |
|---|---|---|
| `admitted` | `boolean` | 지금의 `qualify()`가 이 행을 돌려주었을 조건 전부를 만족하는가 |
| `spec_state` | `'published'｜'draft'｜'none'｜'conflict'｜'n/a'` | `resolveSpecEvidence`/`resolveSpecId` 판정. `n/a`는 spec을 자격 입력으로 쓰지 않는 route(`quick_fix`) |
| `has_description` | `boolean` | `row.description`이 비어 있지 않은가 |
| `awaiting_user` | `boolean` | `metadata.awaiting_user`가 있는가 |
| `worker_ineligible` | `boolean` | `worker-ineligible` 라벨이 있는가 |

`spec_state`의 다섯 값은 `app/views/worker/placement.js`의 `Placement.spec`과 같은
어휘다. 두 벌이 되지 않도록 이름과 값을 그대로 쓴다.

기존 필드의 의미는 바꾸지 않는다.

- `spec_id`는 admission 의미를 유지한다: `quick_fix` 행과 미발행 행에서 `''`.
- `published`는 route 무관 판정 그대로다(UI-vb7u).
- `scope_spec_id`는 artifact-first 규칙 그대로다(UI-f1qy §4.4). 미발행 행도 spec
  경로가 해석되면 그 값을 갖는다.
- `plan_state`·`spec_reviewer`는 미발행 행에서 각각 `'none'`·`''`이다.
- `description_scope`는 지금 규칙대로 `scope_spec_id`가 빈 행에서만 채운다.

`workflow`(enrich)·`exec_pins`·`rec`·`blocked_by`·`labels`·시각 필드는 확장 행도
같은 방식으로 채운다. 재료를 만들 수 없으면 키를 싣지 않는다(fail-quiet).

### 3.3 진입은 opt-in

캐시는 넓은 목록 하나를 담고, 좁히기는 읽는 쪽이 한다.

```js
runnableFor(workspace, exclude_ids, { include_unadmitted = false } = {})
runnablePeek(workspace, exclude_ids, { include_unadmitted = false } = {})
```

기본값 `false`는 `admitted === true`만 돌려주므로 기존 소비자의 관측은 바뀌지
않는다. `true`를 넘기는 곳은 두 군데뿐이다.

- `server/ws/monitor-handlers.js`의 모니터 투영(`:392`) — 후보 레인의 원천.
- 같은 파일의 `laneCountsFor()`(`:507`) — 결정 6.

worker-handlers의 scope 장식(`runnablePeek`, UI-f3ma)은 기본값을 그대로 쓴다.
겹침 칩의 재료가 미발행 이슈까지 넓어지는 것은 이 스펙의 범위가 아니다.

TTL·무효화·stale-while-revalidate·`exclude_ids` 계약은 바꾸지 않는다. 넓어진
목록은 같은 스캔의 같은 레코드에 담기므로 fill 횟수도 그대로다.

### 3.4 `hasPipeline`의 파급

`hasPipeline()`(`monitor-handlers.js:248`)은 `runnable` 길이를 본다. 확장 행이
카운트에 들어가면(결정 6) 준비 필요 후보만 있는 레포도 모니터 집계에 남는다.
이는 결정 1이 의도한 결과다 — 스펙을 아직 쓰지 않은 레포가 계획 화면에서
사라지지 않는다.

## 4. 판정 소유권 — `placement.js` 한 벌

`app/views/worker/placement.js`는 머리말이 선언한 대로 대기 배치 판정과 사유
문장의 단독 소유자다. 서버가 사유를 다시 판정하면 같은 식이 두 벌이 되고, 한
벌은 반드시 낡는다.

그래서 서버는 §3.2의 사실만 싣고, 접는 것은 `placement.js`가 한다.

```js
// 새 진입점: 사실 → 판정
placementFromFacts(facts, location)
// 기존 진입점은 페이로드에서 사실을 뽑아 위 함수로 접는다
candidatePlacement(issue, queue)
```

`facts`는 `{ route, spec, has_description, awaiting_user, worker_ineligible }`이고
`location`은 지금의 `locationOf()` 결과다. 자격 식은 지금 것을 그대로 옮긴다:
`!worker_ineligible && !awaiting_user && (quick_fix ? has_description : spec === 'published')`.
`placeable`은 거기에 `location === null`을 더한 것이다.

`Placement.missing_description`은 지금 이름을 유지한다(`quick_fix`인데 본문이
없다). `placementTitle()`이 만드는 사유 문장도 그대로다.

모니터 쪽에서는 `app/views/worker/lane-model.js`의 runnable 투영(`:3296` 이하)이
서버 행의 사실로 `placementFromFacts`를 불러 `eligible`·`worker_ineligible`·
`reason`을 만든다. 그 아래는 손대지 않는다 — `observation_row`,
`draggable: !observation_row`, `queue_placeable: eligible && !worker_ineligible`가
이미 결정 4를 실행한다(`:3343`~`:3375`, `lanes.js:2306`~`:2311`). 즉 Monitor는
Worker와 같은 코드 경로로 차단된다.

`lanes.js`의 `↴ 대기로` 버튼은 이미 `?disabled=${!queue_placeable}` + `placementTitle`
툴팁이다(`:2453`). 새로 더하는 것은 판정 칩과 그 팝업(§6)뿐이다.

## 5. 세그먼트 — 준비도 축

### 5.1 어휘

```js
/** @typedef {{ show_blocked: boolean, readiness: 'all'|'ready'|'not_ready' }} CandidateFilter */
export const READINESS_FILTER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'ready', label: '착수 가능' },
  { value: 'not_ready', label: '준비 필요' }
];
```

`SPEC_FILTER_OPTIONS`와 `CandidateFilter.spec`은 사라진다. 판정은 행의
`queue_placeable`이다 — "지금 대기열에 넣으면 실행되나". 이 판정은 §4의 한 벌에서
나오므로 세그먼트와 버튼이 같은 답을 낸다.

`ready` = `queue_placeable === true`. `not_ready` = 그 외.

### 5.2 저장값

키는 두 탭 모두 지금 것을 유지한다(Monitor `beads-ui.monitor.candidate-filter`,
Worker의 기존 키). 저장된 객체에 `readiness`가 없으면 기본값을 쓴다. 옛 `spec`
값은 읽지 않는다 — `with`는 `ready`와 다른 집합이고(published만 vs `quick_fix`
포함), `without`은 새 어휘에 대응이 없다. 마이그레이션 코드를 두지 않고 한 번
기본값으로 떨어지게 한다(fail-quiet).

`CANDIDATE_FILTER_DEFAULT`는 `{ show_blocked: true, readiness: 'all' }`(Monitor,
결정 7). Worker의 blocked 기본값(숨김)은 바꾸지 않는다.

### 5.3 숨김 카운트

`LaneModel.runnable_hidden`은 `{ blocked: number, spec: number }`에서
`{ blocked: number, readiness: number }`로 바뀐다. 두 규칙은 지금 것을 그대로
유지한다.

- Worker(`per_control`): 두 필터에 **모두** 걸린 행은 어느 수에도 넣지 않는다.
- Monitor(순차): 앞 단계인 `blocked`가 겹친 행을 가져간다.

필터 스트립의 `숨김 N` 표시도 같은 자리에 그대로 선다.

## 6. 카드 — 판정 칩과 흐림

### 6.1 칩

'준비 필요' 행은 슬롯 4a에 판정 칩 하나를 단다. 칩은 카드당 최대 하나이고,
사유는 아래 표를 **위에서 아래로 훑어 첫 일치 하나**만 단다 — 순서는 §4의 자격
식과 같다.

| 사유 | 칩 문구 | 조건 |
|---|---|---|
| 세션 전용 | (칩 없음) | `worker_ineligible` — 슬롯 1의 기존 `worker-ineligible` 칩이 이미 말한다 |
| 사용자 대기 | (칩 없음) | `awaiting_user` — 기존 `reason` 문장이 말한다 |
| 본문 없음 | `본문 필요` | `quick_fix`인데 `has_description === false` |
| 스펙 충돌 | `스펙 충돌` | `spec === 'conflict'` |
| 스펙 미발행 | `스펙 미발행` | `spec_backed`/`full_plan`인데 `spec !== 'published'` |
| 라우팅 미핀 | `라우팅 필요` | `route`가 `RUNNABLE_ROUTES` 밖(빈 값 포함) |

칩 이름을 `스펙 미발행`으로 둔 것은 기존 `스펙 대기`(UI-svh6 §4.3 — 선행 결과가
설계 전제라 스펙을 선행 뒤에 쓴다)와 섞이지 않게 하기 위해서다. 두 칩은 같은 슬롯
4a에 함께 설 수 있고, 그때 `스펙 대기`가 먼저다(기존 §4.3 순서 유지).

칩의 형태는 기존 `judgement-chip`(`ctl-chip--label`) 그대로이며, 클릭은 사유
팝업이다(`app/views/chip-popover.js`, 2026-08-28 chip-grammar-unify). 팝업 문구는
`placementTitle()`이 이미 만드는 문장을 쓴다 — 버튼 툴팁과 팝업이 같은 문장이어야
두 표면이 같은 말을 한다.

### 6.2 슬롯 표 개정

`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §5.1
슬롯 표의 4a 행에 이 칩들을 더한다(ADR 0014 — 새 요소의 자리는 슬롯 표가 정한다).
개정문은 이 스펙의 구현에 포함한다.

### 6.3 흐림

'준비 필요' 행은 blocked 카드와 같은 흐림을 쓴다(결정 5). 두 사실이 겹친 행은
흐림이 한 번만 적용된다 — 흐림은 "지금은 못 간다"는 하나의 사실을 말하고, 왜
못 가는지는 칩과 `reason`이 말한다.

## 7. 카운트와 정렬

- 레인 헤더 수는 지금처럼 **필터 후 보이는 행 수**다. 세그먼트를 바꾸면 따라
  움직인다.
- `laneCountsFor()`·`hasPipeline()`·레포 섹션 생략 판정·데크 타일 후보 수는 확장
  행을 포함한다(결정 6). `lane-model.js`의 `roots_with_candidates`도 필터 이전
  목록(`runnable_all`)에서 나오므로 자동으로 확장 행을 센다.
- 정렬 옵션 세 가지의 이름과 키는 바꾸지 않는다. `repo_spec`(레포 · spec 우선)은
  레포 그룹 안에서 `queue_placeable === true`인 행을 앞에 세우고, 그 안에서는
  지금의 spec 우선 비교를 유지한다. `repo_updated`·`updated_flat`은 시각 기준
  그대로이며 준비도를 보지 않는다.

## 8. 경계와 비목표

- **결정: 서버 admission 판정은 바꾸지 않는다** — `server/worker/admission.js`의
  거부 사유와 순서는 그대로다. 이 스펙은 표시 집합만 넓힌다.
- **결정: Worker dispatch 경로는 바꾸지 않는다** — 스케줄러는 `runnable-cache`를
  읽지 않으며, 이 변경으로 읽게 되지도 않는다.
- **결정: phase child는 후보가 아니다** — 부모 카드의 자식 롤업이 이미 말한다.
  두 탭 모두 지금처럼 제외한다.
- `status`가 `open`이 아닌 행(진행 중·resolved·closed)은 후보가 아니다. 다른
  레인과 완료 행이 소유한다.
- worker-handlers의 scope 장식(`runnablePeek`) 관측 범위는 바꾸지 않는다(§3.3).
- 보드 탭의 열 구성·필터는 이 스펙의 범위 밖이다.

## 9. 검증

- **서버 단위** — `server/worker/runnable-cache.test.js`: 미발행 `spec_backed`·
  route 미핀·본문 없는 `quick_fix`·`worker-ineligible` 행이 `include_unadmitted`
  에서만 실리고 각각 `admitted:false`와 기대한 `spec_state`/`has_description`을
  갖는다. 기본 호출의 목록이 변경 전과 동일하다(회귀 fence). phase child와
  `status!=='open'`은 두 모드 모두에서 빠진다.
- **파이프라인** — `server/ws/monitor-pipeline.test.js`: 모니터 투영과
  `laneCountsFor`가 확장 행을 포함하고, 준비 필요 후보만 있는 레포가
  `hasPipeline`을 통과한다.
- **판정** — `app/views/worker/placement.test.js`: `placementFromFacts`와
  `candidatePlacement`가 같은 입력에서 같은 `Placement`를 낸다.
- **레인 모델** — `app/views/worker/lane-model.test.js`: `readiness` 세그먼트
  세 값의 분할, `runnable_hidden.readiness`의 두 규칙(per_control·순차), 옛
  저장값이 기본값으로 떨어지는 것, `repo_spec` 정렬의 ready 우선.
- **카드** — `app/views/worker/lanes.test.js`: 사유별 칩 하나와 그 우선순위,
  `worker-ineligible`·`awaiting_user` 행에 새 칩이 서지 않는 것, 칩 클릭이 사유
  팝업을 여는 것, 흐림 클래스.
- **e2e** — `app/main.monitor.e2e.test.js`: 모니터 후보 레인에 준비 필요 행이
  그려지고, 그 행의 `↴ 대기로`가 비활성이며 드래그 소스가 아니다.
- Pre-Handoff Validation 전체(`npm run tsc`, `npm test`, `npm run lint`,
  `npm run prettier:write`, `npm run build`).

## 10. 구현 unit 후보 (구속력 없음)

1. 서버 — `qualify()` 분해, 사실 필드, `include_unadmitted` 진입, monitor 투영과
   레인 카운트 배선.
2. 판정 — `placementFromFacts` 도입과 `candidatePlacement` 재배선, Monitor
   runnable 투영에서의 호출.
3. UI — `readiness` 세그먼트(두 탭), 숨김 카운트, 정렬 규칙, 저장값 처리.
4. 카드 — 판정 칩과 사유 팝업, 흐림, 슬롯 표 개정.

## 11. 경계·후속

없음 — 이 스펙의 범위 안에서 닫힌다.

## 12. 결정 (ADR 후보)

- **모니터 후보 레인도 admission 통과 집합이 아니라 관측 집합이다** — 되돌리기
  비용이 크고(서버 투영·필터 어휘·카드 조작이 함께 움직인다), 소비자가 여럿이며
  (Monitor·Worker·레포 타일·scope 장식), "후보 레인에 왜 이게 보이나"는 앞으로도
  반복해서 물어볼 지점이다. UI-8881이 Worker에서 정한 결정을 Monitor로 넓히면서
  두 탭의 후보 레인 의미가 하나가 된다. `summary`: "후보 레인은 Worker가 지금
  집을 수 있는 집합이 아니라 미착수 이슈의 관측 집합이고, 실행 안전은 서버
  admission이 지킨다" → ADR
- **세그먼트 축을 준비도로 재정의한다** — 화면 어휘의 선택이고, 되돌리는 비용이
  필터 상수와 그 테스트에 그친다. 이 스펙이 소유한다 → ADR 아님
- **판정은 `placement.js` 한 벌이 소유한다** — 이미 그 모듈의 머리말이 소유권을
  선언하고 있고, 이 스펙은 진입점을 하나 더할 뿐이다 → ADR 아님
