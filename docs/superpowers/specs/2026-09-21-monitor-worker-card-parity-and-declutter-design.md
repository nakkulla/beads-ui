---
scope:
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/workspace-adapter.js
  - app/views/worker/placement.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/utils/token-usage.js
  - app/protocol.md
  - app/styles.css
  - app/styles/tokens.css
  - server/worker/runnable-cache.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 모니터·워커 카드 표시 통일 — 후보 사유 어휘 단일화, 세션 권장 칩 양쪽 표시, 사용량 각주 툴팁화, ✕·재리뷰 배지 슬롯 정비와 카드 시각 정비

- 작업: UI-mfm1
- 작성: 2026-09-21
- 상태: 사용자 검토용 초안, 구현 미착수
- 조사 기준: `origin/main`의 `50902e0bae6b48f8c84e813652bb00465d887224`
- 형제: UI-p7s2(Board 탭 퇴역·기능 이전) — 이 스펙의 카드 문법(§5)과 사유 어휘(§3.2)를 전제하고, `blocks`로 이 Bead 뒤에 선다

## 1. 요구와 확인된 현재 동작

모니터 탭은 여러 저장소의 워커 탭 이슈를 한 화면에 모은 면이다. 같은 이슈는 두 탭에서 같은 카드로 읽혀야 하는데, 지금은 다르다. 2026-09-21 공유 서버(`http://<ts-ip>:3000`)의 두 탭을 헤드리스 Chrome으로 렌더해 DOM을 세어 확인한 사실은 다음과 같다.

**렌더러는 같고 재료가 다르다.** `app/views/monitor/index.js`는 `candidateCard`·`miniRow`·`paneTemplate`·`runningTile`을 `app/views/worker/lanes.js`·`running-grid.js`에서 그대로 import하고, 레인 조립도 같은 `buildLanes`(`app/views/worker/lane-model.js`)다. 그러나 후보 행의 입력이 다르다.

| | 워커 탭 | 모니터 탭 |
|---|---|---|
| 후보 행 원천 | `app/views/worker/workspace-adapter.js runnableRows()` — `tab:worker:ready`/`blocked` 구독 행에 클라이언트가 판정을 끝내 `eligible`·`route_ok`·`placement_spec`·`reason`(조각 문자열)·`session_preferred`·`spec_after_blocker`를 실음 | `server/worker/runnable-cache.js qualify()` — `route`·`spec_state`·`has_description`·`awaiting_user`·`worker_ineligible`·`labels`만 실은 원시 사실 행 |
| `buildLanes` 분기 | `observation_row = Object.hasOwn(entry, 'eligible')` 참 → 실어 온 판정을 그대로 씀 | 거짓 → `placementFromFacts`로 판정을 만들고 `placementTitle(placement)` 문장을 `reason_parts`에 넣음 |
| 카드 본문 `.worker-card__reason` | `spec 없음` · `spec 미발행(draft)` · `missing_description` 같은 조각 | `spec이 발행되지 않아 대기 큐에 넣을 수 없습니다`(실측 8장) · `route가 정해지지 않아 대기 큐에 넣을 수 없습니다`(2장) 같은 문장 |
| 슬롯 4a 준비도 칩(`readinessJudgement`) | `스펙 미발행`·`라우팅 필요` 칩이 **같은 사실을 한 번 더** 말함 | 같음 |
| `세션 권장` 칩 재료 | 어댑터가 `sessionPreferredReason(labels, metadata)`로 계산 | 서버 행에 `session_preferred_reason` 키 없음 → 칩이 설 수 없음 |
| 숨김 개수 산식 | `candidate_hidden_counts: 'per_control'` | 기본값 `'sequential'` |

즉 사용자가 본 "모니터에만 있는 칩"은 코드상 존재할 수 없고(2026-09-21 실측 두 탭 모두 `worker-card__session-preferred` 0개; `session-preferred` 라벨 Bead는 UI-1dtr 하나뿐이고 `deferred`라 어느 탭에도 없음), 실제 차이는 위 표의 사유 문장·중복 칩·산식이다. 반대로 직접 세션이 잡은 실행 타일에는 `▤ 세션` 버튼(조작) 바로 옆에 `세션` 배지(정체성)가 서서 같은 글자가 두 번 보인다 — 워커 탭에 직접 세션 타일이 없을 때만 "모니터에만 있는" 것으로 읽힌다.

**필요 없는 글자.** 실행 타일 `.rtile__meta`의 `.rtile__usage-scope` 두 줄(`running-grid.js` 1241–1273, 1531–1563 두 분기): `USD 환산 · Standard · short context · 5분 cache write 기준`, `부모·자식 합계` / `자식 사용량 · 부모 합계 제외` / `현재 대화 기준 · 워크스페이스 합계 제외`. `app/utils/token-usage.js formatCost()`의 `(+N leg 단가 없음)`과 `· 부분 집계` 접미는 카드 `worker-usage` 배지와 워커 탭 상단 KPI(`누적 Claude τ 6.7M · $6.10 (+1 leg 단가 없음) · 부분 집계`)에 함께 붙는다. 사용자 결정(2026-09-21): 이 글자들은 카드·KPI에서 지우고 툴팁으로 내린다.

**자리가 흐트러진 조작·배지.** 대기 행의 `✕`(`queueRowOps`의 `.worker-mini__rowops-remove`)는 `miniRow`의 세 레이아웃마다 다른 자리에 끼워진다 — 두 줄 변형은 `__row1` 끝, 카드 변형은 `__head`의 `wait_badge` 뒤·`reason_el` 앞, 한 줄 변형은 `__line` 맨 끝. 카드 변형에서 사유(`flex: 1 0 100%`)와 배지가 줄바꿈되면 `✕`가 카드 중간 오른쪽에 뜬다(실측 스크린샷). `♻️ stale→재리뷰`(`lane-model.js admissionBadge`)는 구조화 필드가 아니라 `reason` 문자열로 본문에 찍힌다.

## 2. 선택한 방식과 대안

**재료 통일의 깊이 — 선택: 두 탭이 같은 사실 키를 싣고 `lane-model`이 한 경로로 판정한다(§3).** 대안 (a) 두 분기를 두고 모니터 분기의 문장만 조각으로 바꾸기: 작지만 `session_preferred`처럼 한쪽에만 실리는 키가 또 생길 때마다 같은 어긋남이 재발한다. 대안 (b) 워커 탭이 서버 `runnable` 스냅샷을 소비해 어댑터 후보 경로를 없애기: 원천 자체를 합치지만 워커 탭의 후보 원천은 `tab:worker:ready/blocked` 구독이고(ADR 0033의 관측 집합), 서버 `runnable` 캐시는 `status=open`·Phase child 제외 같은 admission 전제를 이미 접은 집합이라 관측 집합이 좁아진다. 선택안은 어댑터를 "판정 계산기"에서 "사실 수집기"로 바꾸는 것이므로 원천은 그대로 두고 판정 벌만 하나로 줄인다.

**사유 표시 — 선택: 배치 불가 사유는 슬롯 4a 준비도 칩 하나가 말한다(§3.3).** 지금은 칩과 본문 조각이 같은 사실을 두 번 말한다. 본문 `reason` 줄은 배치 판정이 아닌 관측(⛔ 거절, 사용자 결정 대기 사유, ID 없는 blocked)만 남긴다.

**사용량 각주 — 선택: 툴팁 이동(사용자 결정).** 완전 삭제는 ADR UI-mscc(부분 집계 표시)·UI-42l2-2(직접 세션 현재 대화 기준)를 뒤집어 supersede가 필요하고, 집계 범위를 잃으면 합계가 전체처럼 읽힌다. 툴팁은 정보를 남기되 카드 본문에서 뺀다.

**시각 정비 — 선택: 토큰만 쓰는 규칙 집합(§6)을 스펙이 정하고, 구현이 `frontend-design` 지침으로 그 안에서 마감한다.** 새 색·새 크기 체계를 만들지 않는다(`app/styles/tokens.css` 머리말: 뷰 스타일은 토큰만 참조).

## 3. 후보 행 재료 통일

### 3.1 공통 사실 키 — `CandidateFacts`

두 원천이 후보 행에 싣는 판정 재료를 한 집합으로 정한다. `app/views/worker/placement.js`가 typedef를 소유한다.

| 키 | 타입 | 워커 어댑터 | 서버 `qualify()` |
|---|---|---|---|
| `route` | string | 핀된 route(기존 `candidatePlacement`의 규칙 — `route_source: 'explicit'`일 때만 `workflow.route`) | 기존 |
| `spec_state` | `'n/a'\|'published'\|'draft'\|'none'\|'conflict'` | `placement.spec` 값을 이 이름으로 | 기존 |
| `has_description` | boolean | `!placement.missing_description` | 기존 |
| `awaiting_user` | boolean | 기존 | 기존 |
| `awaiting_user_reason` | string | `awaitingUserReason(metadata)` 결과(값 없으면 키 없음) | `meta.awaiting_user` 값에 같은 함수를 적용해 실음(함수는 `app/utils/`로 옮겨 서버도 import) |
| `worker_ineligible` | boolean | 기존 | 기존 |
| `session_preferred_reason` | string | 기존 계산 그대로(`worker_ineligible`이면 빈 문자열) | **추가**: `worker_ineligible ? '' : sessionPreferredReason(row.labels, meta)` — `app/utils/session-preferred.js`는 서버가 이미 import하는 파일이다 |
| `spec_after_blocker` | boolean | 기존 | **추가**: `specAfterBlockerActive(row.labels, blocked_by)` (`app/utils/spec-after-blocker.js`) |
| `observation` | `true` | **추가**: 어댑터 행임을 말하는 유일한 표지 | 없음 |

어댑터는 `eligible`·`route_ok`·`missing_description`·`placement_spec`·`session_preferred`(boolean)·조각 `reason`을 **더 이상 싣지 않는다**. `blocked`·`blocked_by`·`labels`·`release_info`·`dependents_info`·`scope`·`exec_pins`·`rec`·`worker_created_from`·`worker_created_from_root_dir`·시각은 그대로다.

`lane-model.js`의 후보 조립은 한 경로가 된다.

- `placement = placementFromFacts(facts, null)` — 두 원천 모두. `has_placement_facts` 가드는 남기되 사실 키가 없는 구 서버 행만 기존 허용 폴백(`eligible: true`)으로 간다.
- `draggable = entry.observation !== true && queue_placeable` — 지금의 `!observation_row && queue_placeable`을 표지 키로 바꾼 것. 워커 탭 후보 카드는 드래그 소스가 아니고(`[대기로 ↴]`), 모니터 후보 카드는 드래그 소스인 현행 동작 유지.
- `session_preferred = entry.session_preferred_reason`이 비어 있지 않을 때 `true`, `session_preferred_reason`은 그 값. 어느 원천이든 같은 규칙이라 모니터 후보 카드에도 `세션 권장` 칩이 선다.
- `spec_after_blocker`는 두 원천의 boolean을 그대로 옮긴다.
- 준비도 칩 재료(`route_ok`·`awaiting_user`·`missing_description`·`placement_spec`)는 항상 `placement`에서만 만든다. 어댑터 행에서 되살리던 두 번째 분기는 지운다.
- `candidate_hidden_counts`의 두 산식은 `'per_control'` 하나로 통일한다: 모니터 호출도 이 값을 넘기고 `'sequential'` 분기와 옵션은 지운다. 두 탭에서 같은 필터가 같은 "숨김 N"을 말해야 한다는 것이 이 스펙의 요구이며, 순차 산식은 더 이상 소비자가 없다.

`groups`·`candidate_sort`·`search`·`running_sort`는 탭의 성격(단일 저장소 vs 여러 저장소)에서 오는 옵션이라 그대로 둔다. 모니터의 저장소 구역·실행 정렬 셀렉트·실행 타일의 좌표 칩(`monitorTileChips`)도 이 스펙이 건드리지 않는다.

### 3.2 서버 행과 프로토콜

`server/worker/runnable-cache.js qualify()`가 §3.1의 두 키(`session_preferred_reason`·`spec_after_blocker`)와 `awaiting_user_reason`을 `RunnableItem`에 더한다. `RunnableItem` typedef와 `app/protocol.md`의 runnable 행 문단이 이 세 키를 적는다. 스케줄러·admission·`ws.worker-queue`는 읽지 않는다 — UI-49mc §5가 적은 "admission은 이 라벨을 보지 않는다"는 그대로다.

dotfiles 계약(`workflow-state.yaml labels.scheduling.session-preferred`)은 `consumer: beads-ui-worker-only`다. 이 스펙은 소비자를 늘리지 않는다: 칩을 그리는 것은 여전히 beads-ui의 워커 후보 카드 하나이고, 모니터 탭은 그 카드를 여러 저장소에 걸쳐 보여줄 뿐이다. Worker 스케줄러는 계속 읽지 않는다. 계약 문구를 "워커 **탭**만"으로 읽어야 한다면 그것은 dotfiles 쪽 정정 대상이며(ADR 0012: beads-ui는 소비자), 이 스펙은 그 해석을 관찰로 남긴다(§9).

### 3.3 사유 어휘 — 준비도 칩 하나, 본문 줄은 관측만

배치 불가의 이유는 슬롯 4a의 준비도 칩(`readinessJudgement` → `라우팅 필요` / `본문 필요` / `스펙 충돌` / `스펙 미발행`, 클릭·title = `placementTitle` 문장)이 **유일하게** 말한다. `worker-ineligible`·`세션 권장`은 머리줄 칩, `사용자 결정 대기`는 기존 `⏸` 배지·사유가 맡는다.

따라서 `.worker-card__reason` 줄에는 배치 판정 문장·조각이 서지 않는다.

- `lane-model.js`: `if (!observation_row && placement && !placement.placeable) reason_parts.push(placementTitle(placement))` 를 지운다.
- `workspace-adapter.js`: `parts`에 `spec 없음`·`spec 미발행(draft)`·`missing_description`·`spec_id_conflict`를 넣던 분기를 지운다. 남는 것은 `BLOCKED_WITHOUT_IDS`(ID 없는 blocked)뿐이고, 이것도 조각이 아니라 `facts`가 아닌 관측이므로 `reason`이 아닌 `blocked_without_ids: true` 키로 싣고 `lane-model`이 문장을 만든다.
- `awaiting_user` 사유 문장은 `lane-model`이 `facts.awaiting_user_reason`에서 만든다(기존 `AWAITING_USER_REASON_PREFIX` 규칙 그대로). 두 탭이 같은 문장을 얻는다.
- `⛔` 거절(`admissionBadge`의 `stale !== true` 분기)은 지금처럼 `reason`에 남는다 — 이것은 관측이며 `worker-card__reason--danger`가 그 자리다.
- `placementTitle`의 문장은 `[↴ 대기로]` 버튼 title·준비도 칩 title·이슈 상세 place 버튼 title에만 남는다(변경 없음).

결과: 워커·모니터 두 탭의 후보 카드가 같은 재료·같은 칩·같은 본문을 얻는다. "spec이 발행되지 않아 대기 큐에 넣을 수 없습니다"는 카드 본문에서 사라지고 툴팁에만 남는다.

## 4. 사용량 각주와 미가격 leg — 툴팁으로

### 4.1 실행 타일

`running-grid.js runningTile()`의 두 분기에서 `.rtile__usage-scope` span 세 종류를 모두 지운다. 같은 정보는 `worker-usage` 배지의 title(`usageTooltip(tile.usage)`, `app/utils/token-usage.js`)에 줄로 들어간다. 툴팁의 줄 순서는 다음과 같이 고정한다.

1. 기존 첫 줄들(`<provider> subtotal = …`, `총 N`, 입력·출력·캐시 내역)
2. **집계 범위** — 정확히 하나: `집계: 부모·자식 합계` / `집계: 자식 사용량 · 부모 합계 제외` / `집계: 현재 대화 기준 · 워크스페이스 합계 제외`(직접 세션). 재료(`has_native_usage`·`has_included_native_usage`·`direct_session`)가 없으면 줄 자체가 없다(fail-quiet).
3. **단가 기준** — `환산: USD · Standard · short context · 5분 cache write 기준`. 기존 `API 환산 단가 기준` 줄을 이 한 줄로 대체한다.
4. 기존 `단가 없음`·`부분 집계 — …`·`부모 직접 τ …` 줄.

`provider_badges`(`providerUsageBadges`) 경로의 배지 툴팁도 같은 줄 순서를 쓴다. `usageTooltip`이 범위·기준 줄을 만드는 단일 함수가 되도록 `{ scope, direct_session }` 인자를 받는다.

### 4.2 `formatCost`와 KPI

`formatCost(summary)`는 compare 탭이 `(+N leg 단가 없음)`을 "정확히 한 곳"에서 얻는 함수라(`app/views/compare/format.js` §1.3) 시그니처와 출력을 유지한다. 카드·KPI용으로 두 함수를 더한다.

- `formatCostCompact(summary)` → `$6.10` / `≈$6.10`(`partial === true` 또는 `unpriced_leg_count > 0`) / `단가 없음`(총액 없음·미가격 leg만) / `null`. `≈`가 "부분 집계"의 보이는 표지다 — UI-mscc가 요구하는 "부분 집계로 표시"를 한 글자로 지킨다.
- `costDetailLines(summary)` → 툴팁 줄: `단가 없는 leg N개`(N>0일 때) · `부분 집계 — 미확정 범위 제외`(partial일 때). 없으면 빈 배열.

소비자: 대기·완료 행 `worker-usage` 배지(`lanes.js` `provider_badges`), 실행 타일 배지(`running-grid.js`), 워커 탭 상단 KPI(`summaryChipsTemplate`/`tokenChipTemplate`의 누적 비용)와 모니터 상단 합계(`monitor/usage.js crossRepoTokenTotal`)가 `formatCostCompact`를 쓰고 `title`에 `costDetailLines`를 합친다. compare 탭은 그대로 `formatCost`.

## 5. 슬롯 정비 — `✕`, 재리뷰 배지, 직접 세션 배지

카드 헤더 문법 스펙(`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §5.1)의 슬롯 표를 이 스펙과 같은 변경에서 갱신한다(ADR 0014: 새 요소는 슬롯 표가 자리를 정한 뒤 단다).

### 5.1 `✕ 대기에서 빼기` — 슬롯 1 조작, 카드 오른쪽 끝 고정

`queueRowOps`가 만드는 `.worker-mini__rowops`는 세 레이아웃 모두에서 **첫 줄의 마지막 자식**이고, 첫 줄은 줄바꿈하지 않는다.

- 카드 변형(`.worker-mini--card`): `__head`는 정체성(grip·순번·ID·P·PR·외부 레포·배지·wait 배지)과 `rowops`만 싣고 `flex-wrap: nowrap`, `align-items: center`, `min-height: 28px`. 정체성이 넘치면 배지 묶음이 `min-width: 0`으로 줄어들고 `rowops`는 `flex: none; margin-left: auto`로 오른쪽 끝을 지킨다. 사유(`reason_el`)는 `__head`에서 나와 바로 아래 자기 줄 `.worker-mini__reason-line`으로 간다.
- 한 줄 변형(`.worker-mini__line`): 지금처럼 맨 끝. `title_el`이 `min-width: 0; text-overflow: ellipsis`로 양보하고 `rowops`는 `flex: none`.
- 두 줄 변형(`__row1`): 지금처럼 `__row1` 끝, 같은 `flex: none`.
- 시각: 기본 `opacity: .55`, 행 hover·focus-within에서 1. 포인터가 coarse(모바일)이면 항상 1. 크기는 `.op-btn--icon` 그대로.

슬롯 표 §5.1 "1 조작 (오른쪽 끝)" 셀에 `✕ 대기에서 빼기 · ↑/↓`를 명시한다(지금은 `queueRowOps` 산출물이 표에 없다).

### 5.2 `재리뷰 필요` — 슬롯 1 상태 배지

`admissionBadge`의 `stale === true` 분기는 문자열 `♻️ stale→재리뷰`를 돌려주는 대신 `item.rereview_required: true`를 싣는다(`lane-model`의 후보·대기 두 자리 모두). `miniRow`·`candidateCard`의 `badge_els`가 이 키로 배지를 그린다.

- 문안: `♻ 재리뷰 필요`. 클래스 `worker-mini__badge worker-mini__badge--rereview`(카드는 `worker-card__badge--rereview`), 색은 `--accent-warn` 계열(`--border-warn` 테두리, 채움 없음).
- title: `stale 판정 — 디스패치가 세션 내 재리뷰를 요구합니다. 실행은 admit됐고 거절이 아닙니다`.
- 슬롯 표 §5.1 "1 정체성" 셀의 held 판정 뱃지 목록에 `♻ 재리뷰 필요`를 더한다. `reason`에는 더 이상 실리지 않는다.

### 5.3 직접 세션 타일 — 배지 하나, 버튼 하나

`runningTile`의 세션 분기에서 `rtile__session-badge`(`세션`)는 `rtile__hd-actions`(조작 자리)에서 나와 **정체성 쪽**(ID·P 뒤, `status_badges` 앞)으로 옮기고 문안을 `직접 세션`으로 바꾼다. title은 그대로(`Worker가 아닌 세션이 in_progress로 잡은 이슈`). `▤ 세션` 버튼(라이브 세션 열기)은 조작 자리에 남는다. 두 요소는 자리와 뜻이 갈라져 같은 글자 둘로 읽히지 않는다. 슬롯 표 §3.1·§5.1의 상태 뱃지 목록에 `직접 세션`을 적는다.

## 6. 시각 정비 규칙 — 두 탭 카드 공통

구현은 `frontend-design` 지침을 이 규칙 안에서 적용한다. 규칙 밖의 새 색·새 크기·새 폰트는 만들지 않는다.

1. **토큰만.** 색은 `app/styles/tokens.css` 변수만, 간격은 `--sp-*`, 반경은 `--r-*`. hex 리터럴을 `styles.css`의 카드 규칙에 새로 넣지 않는다.
2. **머리줄 한 줄.** `.worker-card__head`·`.worker-mini__head`·`.rtile__hd`는 `min-height: 28px`, `align-items: center`, 줄바꿈 없음. 정체성은 왼쪽, 조작은 오른쪽 끝(§5.1).
3. **두 크기.** 머리줄 배지·칩은 11px/`--r-3`, 본문 칩(4a·4b·5)은 11px/`--r-4`, 제목 13px `--text-title`, 사유·메타 12px `--text-muted`. 카드 규칙에 남아 있는 다른 글자 크기 변형은 이 값들로 접는다.
4. **줄 수 상한.** 후보 카드는 머리줄·제목·stepper·4a·4b·5·foot·시각 순서 그대로 두되, 재료가 없는 줄은 그리지 않는다(기존 fail-quiet). 실행 타일 `.rtile__meta`는 좌표·실행 사실 한 줄과 사용량 배지 한 줄, 최대 두 줄.
5. **사유 줄.** `.worker-card__reason`·`.worker-mini__reason-line`은 `--text-muted` 12px, `⛔`만 `--accent-danger`. 배치 사유는 §3.3에 따라 여기 서지 않는다.
6. **여백 리듬.** 카드 안쪽 `--sp-3`(세로)·`--sp-4`(가로), 줄 사이 `--sp-2`, 카드 사이 `--sp-3`. 모니터의 `.mon2-item` 래퍼는 여백을 더하지 않는다(카드가 자기 여백을 가진다).
7. **hover.** 카드 hover는 테두리만 `--border-chip` → `--accent` 20% 혼합(`color-mix`), 배경은 route tint 유지. 조작 버튼은 §5.1의 불투명 규칙.
8. **모바일(≤ 500px).** 후보 카드 foot의 `[↴ 대기로]`는 전폭, `rowops`는 항상 보임, 배지는 줄바꿈 대신 가로 스크롤 없이 `min-width: 0`으로 줄어든다.

라이트 테마는 같은 토큰의 `[data-theme='light']` 값을 자동으로 받으므로 별도 규칙이 없다.

## 7. 검증과 완료 기준

- `app/views/worker/lane-model.test.js`: (1) 어댑터 사실 행과 서버 사실 행에 같은 `facts`를 주면 후보 항목의 `queue_placeable`·`route_ok`·`placement_spec`·`session_preferred`·`spec_after_blocker`·`reason`이 같다; (2) `placementTitle` 문장이 어느 원천의 `reason`에도 없다; (3) `stale` admission이 `rereview_required: true`를 싣고 `reason`에 `stale`이 없다; (4) `candidate_hidden_counts` 옵션 없이도 `per_control` 산식이다.
- `app/views/worker/workspace-adapter.test.js`: 후보 행에 `eligible`·`reason` 조각 키가 없고 `observation: true`·`spec_state`·`awaiting_user_reason`이 있다.
- `server/worker/runnable-cache.test.js`: `session-preferred` 라벨 + enum 사유 metadata → `session_preferred_reason`; `worker-ineligible` 동반 시 빈 문자열; `spec-after-blocker` + blocked → `spec_after_blocker: true`.
- `app/views/worker/lanes.test.js`: 모니터 옵션(`exec_chips_mode: 'pinned_only'`)과 워커 옵션으로 같은 항목을 그린 `candidateCard`가 같은 칩 집합을 가진다; `rowops`가 세 레이아웃 모두 첫 줄의 마지막 자식이다; `rereview_required`가 배지로 서고 `.worker-mini__reason`에 없다.
- `app/views/worker/running-grid.test.js`: `.rtile__usage-scope`가 없다; 사용량 배지 title에 `집계:`·`환산:` 줄이 있다; 직접 세션 타일에 `직접 세션` 배지가 정체성 쪽에 하나, `▤ 세션` 버튼이 하나다.
- `app/utils/token-usage.test.js`: `formatCostCompact`·`costDetailLines` 표; `formatCost` 기존 케이스 불변.
- `app/main.monitor.e2e.test.js`: 모니터 후보 카드 본문에 `대기 큐에 넣을 수 없습니다`가 없다.
- 스크린샷: 공유 서버 또는 로컬 `bdui`에서 `#/worker`·`#/monitor`를 1280px과 390px(iframe 래퍼)로 캡처해 `~/tmp/mockups/`에 두고 완료 보고서에 경로를 적는다. DOM 검사: `.rtile__usage-scope` 0개, `.worker-card__reason` 안에 `대기 큐` 0개, `.worker-mini__rowops`의 부모가 `__head`/`__line`/`__row1`.
- Pre-Handoff Validation 전체(`npm run tsc`·`lint`·`prettier`·`vitest`)와 `npm run build` 뒤 정적 모드 확인.

## 8. 비목표

- compare 탭의 비용 문안(`formatCost` 원형)·기준선 표시.
- 모니터의 저장소 구역·실행 정렬·검색 부재·`groups` 옵션 — 탭 성격의 차이.
- 서버 admission·스케줄러·`ws.worker-queue`의 판정 변경.
- Board 탭·deferred 표면·필터 축 — 형제 UI-p7s2.
- 라이트 테마 토큰 값 조정, 새 아이콘 세트.

## 9. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| ---- | ---------- | ---------------- | --------- | ---------------- | ------- |
| 형제 | beads-ui | user_request | 라우팅·구독·탭 퇴역이라는 다른 계약 표면(nav·router·main 구독·Board CSS·테스트)이며 이 스펙의 슬롯 표(§5)와 사유 어휘(§3.3) 위에 deferred 구역·필터 줄을 얹으므로 리뷰 관점이 다르다 | UI-mfm1 | UI-p7s2 |

- 관찰: dotfiles 계약 `session-preferred.consumer: beads-ui-worker-only`의 "worker"가 워커 탭만을 뜻한다면 계약 문구 정정 대상 — 이 스펙은 카드 소비자를 늘리지 않는다는 해석(§3.2)으로 진행하고, 계약 리뷰에서 반대 판정이 나오면 dotfiles 쪽 정정으로 제기한다(ADR 0012).
- 관찰: `candidate_hidden_counts: 'sequential'` 산식의 근거였던 UI-4tud §4.3은 이 스펙으로 소비자가 없어진다 — 스펙 문서는 이력으로 남긴다.

## 구현 unit 후보

- unit-01 재료·사유·서버 행: `server/worker/runnable-cache.js` · `app/views/worker/workspace-adapter.js` · `app/views/worker/placement.js` · `app/views/worker/lane-model.js` · `app/protocol.md` (§3)
- unit-02 슬롯·툴팁·시각: `app/views/worker/lanes.js` · `app/views/worker/running-grid.js` · `app/utils/token-usage.js` · `app/views/worker/index.js` · `app/views/monitor/index.js` · `app/styles.css` · 카드 헤더 문법 스펙 §5.1 (§4–§6)

## 결정 (ADR 후보)

- 전제: ADR 0014 — Worker와 Monitor는 하나의 `buildLanes`로 레인을 만들고 새 요소의 자리는 공유 슬롯 표가 정한다; §5의 `✕`·재리뷰 배지·직접 세션 배지는 그 표를 갱신해 자리를 받는다.
- 전제: ADR 0033 — 후보 레인은 관측 집합이고 실행 안전은 서버 admission이 지킨다; §3은 관측 재료의 형태만 통일하고 admission을 건드리지 않는다.
- 전제: ADR UI-mscc — 부모·자식 직접 사용량 합산과 불완전 범위의 부분 집계 표시; §4는 그 표시를 `≈`와 툴팁 줄로 옮길 뿐 뒤집지 않는다.
- 전제: ADR UI-42l2-2 — 직접 세션 카드는 현재 대화 전체 사용량이며 워크스페이스 합계에 가산하지 않는다; §4.1의 `집계: 현재 대화 기준 · 워크스페이스 합계 제외` 툴팁 줄이 그 표시다.
- 후보 행의 판정 재료를 두 원천이 같은 사실 키로 싣고 `lane-model` 한 경로가 접으며 배치 불가 사유는 준비도 칩 하나가 말한다. 되돌리기 어려움: 서버 `RunnableItem`·프로토콜·어댑터 행 형태가 함께 바뀌고 `eligible` 판정 키가 사라진다. 맥락 필요: 왜 어댑터가 판정을 싣던 관행을 버렸는지(한쪽에만 실리는 키가 생길 때마다 두 탭이 어긋난 이력)가 코드만으로 드러나지 않는다. 실제 절충: 어댑터가 로컬 스냅샷으로 알던 `location`(이미 레인에 있음) 판정은 후보 제외에만 쓰고 카드 사유로는 쓰지 않는다. `summary`: "Worker와 Monitor의 후보 행은 같은 사실 키를 싣고 lane-model 한 경로가 자격을 접으며 배치 불가 사유는 슬롯 4a 준비도 칩 하나가 말한다" → ADR
- 사용량 각주·미가격 leg 수의 툴팁 이동과 `≈` 표지. 되돌리기 쉬움: 표시 위치 변경이고 집계 규칙은 그대로다. 맥락은 UI-mscc·UI-42l2-2가 이미 담는다 → ADR 아님
- `✕`·재리뷰·직접 세션 배지의 슬롯 배정. 슬롯 표 갱신이 정본이고 되돌리기 쉽다 → ADR 아님
