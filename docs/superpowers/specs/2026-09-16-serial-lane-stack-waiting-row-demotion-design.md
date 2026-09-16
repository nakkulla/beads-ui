---
scope:
  - server/worker/scheduler.js
  - server/worker/wait-judgment.js
  - app/protocol.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/queue-blockers.js
  - app/views/worker/wait-vocabulary.js
  - app/views/monitor/index.js
  - app/views/detail-panel/
  - app/styles.css
  - server/list-adapters.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 직렬 레인 순서 고정과 선행 대기 표면 정합 — prerequisite_unmet waiting attempt의 대기 행 강등, 복귀 대기·return_overdue 제거, 직렬 레인 선행 우회 폐지 (UI-cmx3)

- 작업: UI-cmx3
- 기준: `origin/main` `aa4107ac2d2d0bb5b8777c52073f8f953ecbd772` (UI-8gem #300 머지 직후). 아래 줄 번호는 이 커밋의 것이다.
- 선례: `2026-09-04-waiting-tile-stale-disposition-reach-design.md`(ADR 0038, 대기 행 강등), `2026-09-14-monitor-remove-connected-lanes-design.md` §3.2(ADR UI-wc67, 직렬 레인 선행 우회), `2026-09-15-wait-reason-unify-blocked-summary-design.md`(UI-n99w, 대기 사유 모델·`return_overdue`), `2026-09-16-wait-surface-density-vocabulary-design.md`(UI-8gem, 대기 어휘 표·`⏸ 수동 출발`).

## 1. 문제 (2026-09-16 관측, microbiome_bile 워크스페이스)

워커가 2026-09-15 새벽 직렬 레인 s1(`Analysis-xz9d → Analysis-c312 → Analysis-wq0w`)에 세 세션을 차례로 띄웠고, 세 세션 모두 선행 미충족으로 착수를 거부해 `status=waiting, cause=prerequisite_unmet`으로 끝났다(`queue.json` attempts `Analysis-xz9d-1789414422869-1`·`Analysis-c312-1789416654103-1`·`Analysis-wq0w-1789418437077-1`). 하루 뒤 xz9d·wq0w의 선행은 모두 닫혔고 `bd ready`에도 올라왔다. 그런데 Worker 탭은 세 bead를 **실행 중 그리드**의 held 타일로 그렸다.

- xz9d·wq0w: `🔓 복귀 대기 · ⚠ 지연 28분`(관측 시점에 따라 51분). 선행 칩은 전부 `🔓`.
- c312: `⛓ 선행 대기`, `⛓ Analysis-xz9d`.

실제로 진행을 막은 것은 하나다. beads-ui 서버가 13:25에 재시작돼 `auto_advance`가 OFF로 강제됐고(`queue-store.js` load 규칙), `runPass`는 `auto_advance !== true`면 명시적 대상만 본다(`scheduler.js:14418`). 그래서 xz9d를 다시 후보로 세우는 dispatch가 일어나지 않았다. 화면은 이 큐 단위 사정을 **bead 세 개의 실행 중 상태와 행별 지연 판정**으로 표현했다. 사용자의 판단(2026-09-16):

1. 실행 중이 아닌 것이 실행 중 레인에 있다. 세션이 아무것도 하지 않고 끝난 attempt는 실행 흔적이 아니라 큐 순서 정보다.
2. `복귀 대기`는 워커 내부 사정("다음 스캔이 아직 안 돌았다")을 사용자에게 노출한 이름이다. 사용자가 알아야 할 것은 "대기 중"과 "막던 선행이 해제됐다" 둘뿐이다.
3. `⚠ 지연 n분`은 그 원인이 사실상 `auto_advance` OFF 하나라서 같은 정보의 중복이다. 시각 정보는 이슈 상세의 참고 줄로 충분하다.
4. 직렬 레인의 "선행 대기 항목만 건너뛰기"(ADR UI-wc67)는 직렬 배치 의도(산출물·문서 겹침, 착지 순서)를 스케줄러가 뒤집고, 착지 순서를 바꿔 rebase 비용을 겹침이 큰 곳에서 발생시키며, 시스템 전체 in-flight를 늘린다. 직렬 레인은 순서대로 쌓아야 한다.

## 2. 사용자 결정 (2026-09-16)

| # | 결정 | 기각한 대안 |
| --- | --- | --- |
| D1 | `cause=prerequisite_unmet`으로 끝난 `waiting` attempt는 실행 중 held 타일을 만들지 않고 그 bead의 **기존 대기 행**(병렬 큐·직렬 레인 entry)이 대표한다. 실행 중 그리드에는 running·paused·failed·parked·retry_wait·provider_hold와 `base_moved`·recovery `waiting`만 남는다 | 타일 유지 + 뱃지 문구 개선(실행 중이 아닌 것이 실행 중 레인에 남는 문제가 그대로); 별도 "선행 대기" 레인 신설(UI-n99w §2-4 "레인 밖으로 옮기지 않는다"와 충돌) |
| D2 | `복귀 대기` 어휘와 `return_overdue` 지연 판정을 제거한다. 막던 선행이 해제된 사실은 대기 행 4b의 기존 `🔓 <ID>` 칩이 말한다. 외부 작업·공급자 보류의 지연 판정은 유지한다 | `복귀 대기` 라벨만 바꾸기(내부 사정 노출은 그대로); 지연 임계 연장(원인이 `auto_advance`라 임계와 무관) |
| D3 | 시각 정보는 이슈 상세 의존성 절의 참고 줄 하나로 옮긴다: 선행 대기 시작 시각 · 해제 시각 · 해제 후 경과. 판정(정상/지연)을 붙이지 않고 알림도 없다 | 참고 줄 없음(사용자 선택 아님); 대기 시작 시각만 |
| D4 | 직렬 레인은 **순서대로 쌓는다**. 선두가 어떤 이유로든 못 가면 레인은 기다린다. 선행 대기만 건너뛰는 예외(ADR UI-wc67, ADR UI-lmqu의 유지 조항)를 폐지한다. 병렬 큐 규칙은 불변 | UI-wc67 유지; 기본 쌓기 + 레인 단위 우회 옵트인(설정 저장·UI가 늘어 범위가 커진다) |
| D5 | 선두가 멈춰 있어 기다리는 뒤 항목의 행에는 **새 칩을 만들지 않는다**. 직렬 순번(슬롯 1)과 선두 행의 `⛓ 선행 대기` 배지·흐림 표시가 순서와 원인을 이미 말한다 | `⏳ 앞 순서 대기` 게이트 칩 추가(슬롯 표·어휘 표·범례 갱신이 따른다) |

세션이 정한 것(사용자 확인 없이 진행, 이 스펙이 근거): 강등 판정 재료는 attempt의 `cause` 하나다(§5.1); 대기 행이 `🔓` 칩을 얻는 범위는 선행 대기 기록이 있는 행으로 한정한다(§5.3); `[지금 시작]`은 직렬 선두에만 서고(유예·게이트·서버 제안 어느 생성 경로든) 선두 아닌 행의 명시적 시작 요청은 `runPass`가 후보 수집 시점에 `serial_lane_not_head`로 거절·기록한다(§8.3); 상세 참고 줄의 재료는 상세 의존성 투영에 `closed_at`을 실어 공급한다(§7).

## 3. 검증된 전제

- **held 타일의 산지.** `lane-model.js activeByBead`(:564-609)가 `heldAttemptStates`(:1542)의 `parked`·`retry_wait`·`waiting`·`provider_hold`를 타일로 승격한다. `waiting`이고 `staleDisposition(input.admission, bead_id)`(:570)면 타일을 만들지 않고 넘어가며, map에 없는 bead는 `claimed`에 들지 않아 `waitingItem`이 대기 행을 그린다 — ADR 0038의 강등 경로 그대로다. `activeBeadIds`(`app/utils/active-attempts.js:203-210`)는 running·paused·failed만 세므로 `waiting`은 슬롯도 `counts.running`도 잡지 않는다(`server/ws/monitor-handlers.js:902-925`).
- **`waiting` 기록은 불변이다.** `queue-store.js`는 `status: 'waiting'` 레코드를 rewrite하지 않는다(`supersedeRetryAttempts` :9320-9335는 `retry_wait`만). 새 attempt가 dispatch되면 `latestImplementationAttempts`가 더 늦은 attempt를 고르고 옛 `waiting` 레코드는 이력으로 남는다(ADR 0029). 강등은 기록을 바꾸지 않고 화면 대표만 바꾼다(ADR UI-lmqu·0038과 같은 원칙).
- **선행 칩 재료.** `blockedByFields`(:3040-3087)는 타일의 `wait.blockers`(동결 목록, `cause_detail.blockers`에서 옴)와 admission `prerequisite_unmet` record의 `blockers`, 서버 `bead_blocked_by`(지금 열린 선행)를 합친다. 키가 있으면 `open = bead_blocked_by[bead]`, `resolved = frozen − open`을 `resolved_blockers_by_key`에 넣고 `wait.returning = open.length === 0`을 쓴다(:3064). `resolved`는 실행 중 항목 조립(:4490 근처 `resolvedBlockerChip`)에서만 4b `🔓` 칩이 되고, 대기 행은 UI-d13v §5.3("해제 칩은 후보 행만 얻는다", :3863 주석)에 따라 얻지 않는다.
- **대기 행의 선행 대기 표시는 이미 있다.** UI-n99w §7.7: 큐·직렬 레인 행에 `prerequisite` 사유가 붙으면 `worker-mini--prerequisite`(흐림 + 왼쪽 테두리, `lanes.js:3196`, `styles.css:2924-2931`)와 슬롯 1 `⛓ 선행 대기` 배지(`waitStatusBadge`, `lanes.js:2830`)가 선다. 재료는 서버 `bead_blocked_by`라 attempt 유무와 무관하다.
- **`returning`·`return_overdue`의 전 소비자.** 서버 `wait-judgment.js:18`(`return_ms`), `:25`(`VerdictCode`), `:61`(문구), `:200-215`(`prerequisiteHeadline(items, returning)`), `:448-457`(판정·`return_observed_at`), `:470-476`(`open`), `:491-493`(`since`), `:517-523`(`judge`), `:528`(headline), 반환 `observed_at.return_observed_at`(:796). 클라이언트 `lane-model.js:3064,3073,3085`, `running-grid.js:211`(`WaitTile.returning`), `lanes.js:2020`(`held.returning` typedef)·`:2037-2060`(`heldRowId`가 `wait.returning`으로 `prerequisite-returning` 행을 고르는 분기), `wait-vocabulary.js:30`(`context.returning`), `:72-82`(`prerequisite-returning` 행), `:265-267`(`waitKindRow` 분기), `queue-blockers.js:200`(툴팁 `· 복귀 대기`), `app/protocol.js:117`(`VerdictCode`). 범례(`help-dialog/index.js:104,143`)는 `WAIT_KINDS`를 읽으므로 행이 빠지면 따라 사라진다. `return_observed_at`은 호출자가 불투명한 `observed_at`으로 되돌려줄 뿐 다른 소비자가 없다.
- **알림 억제 키.** `notify.js:108-131`이 `[bead_id, kind, code]` 키로 1회 알림하고, `claimWaitNotifications`(`queue-store.js:6038-6050`)는 **활성 키만** 다시 저장한다. 판정이 사라진 키(`["Analysis-xz9d","prerequisite","return_overdue"]` 등)는 다음 판정 tick에서 저절로 빠진다. 이력은 타임라인(ADR 0027).
- **큐 단위 사정의 표시는 이미 행에 있다.** UI-8gem §7.2·§10.2: `auto_advance=false`이고 실행이 없을 때 **다른 사유가 없는** 큐·직렬 레인 항목에 `auto_advance_off` 사유(`wait-judgment.js:775-793`)가 붙고, 행 4a에 `⏸ 수동 출발` 게이트 칩과 `[지금 시작]`이 선다(`lane-model.js:4400-4416`). 상단 배너는 없다(ADR UI-a8rq). 선행이 전부 해제된 대기 행은 다른 사유가 없으므로 이 칩을 자동으로 받는다 — "왜 안 움직이나"는 이미 답이 있다.
- **직렬 레인 우회의 구현.** `runPass`(:14463-14595)는 점유되지 않은 직렬 레인의 **전 entry**를 후보에 넣고, `!ready || blocked`인 항목이 `recordNotReady`로 `prerequisite_unmet`이 증명되면 `bypassed_by_lane`에 넣고 다음 항목으로 넘어간다(:14572-14582); 그 밖의 거부는 `stopSerialLane()`. `dispatch()`는 `verifySerialBypass`(:6581-6678, 앞 항목 전수를 두 번 재조회)를 실행 전(:8859)과 실행 직전(:9296) 두 번 통과해야 하고, `laneLaunchRefusal`(:4721-4775)은 `bypassed_before` 목록이 레인 prefix와 정확히 같아야 통과시킨다. `serialBypassLocallyBlocked`(:6558-6570)가 로컬 실격 조건이다. `serial_lane_not_head`는 `scheduler.js` 안에서만 나고, UI `admissionBadge`(`lane-model.js:1590-1622`)는 이 문자열에 특별 취급이 없어 `⛔ serial_lane_not_head`로 그대로 그린다.
- **레인 점유는 lineage 하나.** `laneOccupiedByOther`(:1033-1041). 우회가 있어도 한 레인에서 둘이 동시에 돌지는 않는다 — 우회의 비용은 동시성이 아니라 착지 순서와 시스템 전체 in-flight다.
- **순서 자동 보정.** `lane-order.js orderLaneByBlocks`가 레인 안 `blocks` 간선에 맞춰 순서를 보정한다. 세션이 분리한 선행 quick_fix는 workflow 배치 절차가 원 이슈 **앞** index에 넣고(dotfiles `execution-spec-backed.md` Worker lane placement 3-4), 레인 보정도 같은 결과를 낸다. 순서대로 쌓아도 "선행이 같은 레인 뒤에 있어 영원히 막히는" 경우는 생기지 않는다.
- **복귀 재스캔.** ADR 0034: 복귀 트리거는 이벤트 구독이고 후보는 `waiting` attempt ∪ `prerequisite_unmet` admission 항목이며 직렬 선두가 아닌 멤버도 후보다("다시 물을 가치가 있나"만 답한다). 발차 규칙은 `tickPass`가 소유한다. 이 스펙은 발차 규칙만 바꾼다.
- **ADR 충돌.** ADR UI-wc67 결정 2항("비어 있는 직렬 레인은 저장 순서로 살피되 실제 미해결 선행을 확인한 `prerequisite_unmet`만 건너뛴다")과 4항(`[지금 시작]`의 같은 순서 예외), ADR UI-lmqu 결정 2항의 "직렬 레인의 확인된 선행 대기만 추월하는 규칙을 유지한다"가 D4와 정면으로 어긋난다 → supersede(§결정). `복귀 대기` 뱃지는 2026-09-04 스펙 §결정이 "표시 어휘이며 슬롯 표가 소유 → ADR 아님"으로 판정했으므로 슬롯 표 정정(§9)만 필요하다. UI-8gem §결정의 "전제: ADR UI-lmqu — 배지 라벨 `복귀 대기`·`반영 대기`는 그 구분을 유지한다"는 그 스펙의 전제 진술이고 ADR UI-lmqu 본문은 `반영 대기`만 명한다 — `반영 대기`는 이 스펙이 건드리지 않는다.

## 4. 설계 원칙

1. **화면 대표는 "무엇을 기다리나"가 정한다.** 실행 중 그리드는 세션이 돌거나 사람이 attempt 자체를 처리해야 하는 것만 담는다(ADR 0038의 확장). 선행을 기다리는 bead는 대기 행이다.
2. **새 어휘·새 칩·새 레인 없음.** 기존 `⛓ <ID>`·`🔓 <ID>`·`⛓ 선행 대기`·`⏸ 수동 출발`로 모든 상태를 말한다. 어휘 표(`wait-vocabulary.js`)와 슬롯 표에서는 **빼기만** 한다.
3. **기록은 바꾸지 않는다.** `waiting` attempt·admission·`wait_notified`·타임라인은 불변이다. 서버 판정 모듈은 판정 하나(`return_overdue`)를 빼는 것 외에 형태를 유지한다.
4. **직렬은 순서다.** 스케줄러는 사용자의 순서를 재해석하지 않는다. 선두가 못 가면 레인이 기다리고, 옮기는 것은 사람이다(드래그·재정렬·병렬로 이동).
5. **fail-quiet.** 재료가 없는 줄은 그리지 않고, 판정할 수 없는 것은 판정하지 않는다.

## 5. 범위 1 — 대기 행 강등 (`app/views/worker/lane-model.js`, 두 탭 공유)

### 5.1 판정식

```
prerequisiteWaiting(held) :=
  held.run_state === 'waiting'
  ∧ held.attempt.cause === 'prerequisite_unmet'
```

`activeByBead`의 held 루프(:564-575)에서 이 판정이 참이면 `staleDisposition` 갈래와 같이 `continue`한다 — `map.set` 생략, `claimed` 미등록, `waitingItem`이 행을 그린다. 재료는 `cause` 하나다: `cause_detail.blockers`의 유무·형태는 보지 않는다(비어 있으면 §5.3이 칩을 그리지 않을 뿐 강등은 그대로다). `cause`가 `base_moved`·recovery 계열이거나 미상이면 현행대로 타일이다 — 그 둘은 `↻ 이어하기`·폐기 조작을 타일에 두고(ADR UI-lmqu·UI-3vvi) 이 스펙의 대상이 아니다.

`parked`·`retry_wait`·`provider_hold`는 손대지 않는다. Monitor 탭은 같은 `buildLanes`를 쓰므로 함께 바뀐다(ADR 0014). Monitor `status_label`의 `waiting` 갈래(`monitor/index.js:1326-1331`)는 그대로 둔다 — `'선행 대기'` 폴백은 `cause` 미상 타일(fail-closed로 남는 것)의 라벨로 계속 쓰인다. 남는 `waiting` 타일은 세 가지다: `base_moved`, recovery, `cause` 미상.

### 5.2 강등된 행의 모양

강등된 bead의 행은 자기 레인·순번·진입 시각을 그대로 지킨다(UI-n99w §2-4, UI-wc67 §3.1). 표시는 전부 기존 규칙이다.

- 열린 선행이 남아 있으면: 4a `⛓ <ID>`(서버 `bead_blocked_by`), 슬롯 1 `⛓ 선행 대기` 배지, `worker-mini--prerequisite` 흐림(UI-n99w §7.7). 선행이 `blocked`·`deferred`·`worker-ineligible`이면 배지 판정 `⛔ 조치 필요`(§5.2 규칙 유지).
- 열린 선행이 없으면: `⛓` 칩도 배지도 흐림도 없다(사유 자체가 나지 않는다, §6.1). 4b에 `🔓 <ID>`(§5.3). `auto_advance=false`이고 이 행이 병렬 항목이거나 직렬 선두면 `⏸ 수동 출발` 게이트 칩 + `[지금 시작]`(UI-8gem §7.2·§8.3의 대상 축소). `auto_advance=true`면 이벤트 구독 재스캔이 `tickPass`를 부르고 선두라면 dispatch된다(ADR 0034) — 이 행은 잠깐 뒤 실행 중 타일이 된다.
- 폐기 출구는 없다. `waiting/prerequisite_unmet` 레코드는 조작 대상이 아니라 이력이며(§3), 다음 attempt가 dispatch되면 저절로 대표에서 물러난다. 대기 행의 기존 조작(드래그·제거·`[지금 시작]`)은 그대로다.

### 5.3 대기 행의 `🔓` 칩 — UI-d13v §5.3의 예외

`blockedByFields`(:3040-3087)는 지금 `wait`를 타일 조립에서만 받는다. 강등 뒤에는 **대기 행 조립**에서도 그 bead의 마지막 구현 attempt가 `waiting/prerequisite_unmet`이면 `waitProjection(attempt)`의 `blockers`를 `frozen`으로 쓴다(`heldAttemptStates`가 이미 고른 attempt를 그대로 재사용하고 새 조회는 없다). 판정은 현행 그대로다.

```
if Object.hasOwn(bead_blocked_by, bead_id):
  open     = bead_blocked_by[bead_id]
  resolved = frozen.filter(id ∉ open)          // 더 이상 막지 않는 동결 선행
  blocked_by = open
else:
  blocked_by = decorated ∪ frozen ∪ proven     // 모름 → 전부 ⛓ (현행)
  resolved = []
```

`resolved`는 `resolved_blockers_by_key`에 들어간다. `resolvedBlockerChip`을 붙이는 루프(:4473 근처)는 이미 대기 행을 포함하므로 부착 코드는 바뀌지 않는다 — 바뀌는 것은 대기 행 조립이 그 맵에 **재료를 공급**하게 되는 것뿐이다. 위치는 4b, 규칙은 `openTarget`·foreign 색·툴팁 그대로다. UI-d13v §5.3의 "대기 행은 이미 출발해 '왜 이제 갈 수 있나'가 의미 없다"는 이 행에는 맞지 않는다: 이 행은 출발하지 않았고 바로 그 질문에 답해야 한다. 후보 행의 `release_info` 기반 `🔓`(7일 창, `closed_at` 보유)와는 재료가 다르므로 섞지 않는다 — §6.0(2026-09-04 스펙)의 증명 한계대로 이 칩은 "해제"만 말한다. 툴팁은 `해제 — 더 이상 이 이슈를 막지 않는다`로 바꾼다(`queue-blockers.js:200`의 `· 복귀 대기` 삭제).

admission `prerequisite_unmet` record만 있는 행(attempt 없이 큐에서 거부된 항목)도 같은 식이 적용된다: `frozen`이 비고 `proven`이 그 자리를 채우며, ADR 0034가 ready에서 admission을 지우므로 해제 뒤에는 `proven`도 비어 칩이 서지 않는다. 그 행의 "해제" 사실은 후보 레인의 `release_info` 칩이 아니라 행 자체의 부재(dispatch됨)로 나타난다 — 현행과 같다.

### 5.4 `returning` 제거

`:3064`·`:3073`·`:3085`의 `returning` 쓰기, `running-grid.js:211`의 `WaitTile.returning`, `lanes.js:2020`의 `held.returning` typedef와 `heldRowId`(:2037-2060)의 `wait.returning` 분기(`prerequisite-returning` 행 선택), `wait-vocabulary.js:30`의 `context.returning`을 지운다. `waitKindRow`(:265-267)의 `prerequisite-returning` 분기도 함께다. `heldRowId`는 `prerequisite` 행만 돌려준다. `open.length === 0`이라는 사실은 §5.2대로 칩·배지의 **부재**로 나타나며 별도 플래그가 필요 없다.

## 6. 범위 2 — `복귀 대기`·`return_overdue` 제거 (`server/worker/wait-judgment.js` 외)

### 6.1 서버 판정

`prerequisite`(`_foreign`) 사유 판정(:440-528)에서:

- `returning`(:448-452), `return_key`·`prior_return`·`return_observed_at` 쓰기(:453-457), `WAIT_THRESHOLDS.return_ms`(:18), `return_overdue` 문구(:61), `judge(result, 'overdue', 'return_overdue')`(:517-523)를 지운다. `VerdictCode`(:25)와 `app/protocol.js:117`에서 `'return_overdue'`를 뺀다.
- `open`(:470-476)은 `status !== 'closed' ∧ (blocked_by 키 부재 ∨ blocked_by[bead].includes(id))`만 남는다. 열린 선행이 하나도 없으면 `groups`가 비고 **사유가 나지 않는다** — 이것이 "선행 해제"의 서버 표현이다.
- `since`(:491-493)는 `attempt?.finished_at || record?.at`만 쓴다(선행 대기가 시작된 시각).
- `prerequisiteHeadline(items, returning)`(:200-215)은 `returning` 인자를 잃고 "완료를 기다림" 한 형태만 남는다.
- 반환 `observed_at`은 `{ settle_observed_at }`만 싣는다. 호출자는 이 객체를 불투명하게 되돌려주므로 변경이 없다.
- `blocker_needs_human` 판정, `external_job`·`provider_hold`·`queue_hold`·`retry_wait`·`awaiting_user`·`stale_work`·`recovery`·`auto_advance_off` 사유는 그대로다. 임계 상수 표(UI-n99w §5.2)에서 `prerequisite`의 `overdue` 칸이 `—`가 된다.

### 6.2 `auto_advance_off`의 대상 축소 (§8.3과 한 몸)

`:775-793`의 `idle_ids`는 "사유가 없는 pending 항목"이다. 여기에 **직렬 레인이면 선두만**이라는 조건을 더한다: 선두가 아닌 직렬 항목은 자동 진행이 켜져도 출발하지 않으므로(§8) "출발 안 함"의 원인이 `auto_advance`가 아니고, `[지금 시작]`도 거절될 자리다(UI-8gem §10.2의 같은 논리). 병렬 항목은 현행 그대로다. `pending_ids`의 산지가 큐·직렬 entry 목록이므로 레인 정보는 `queue.serial_lanes`에서 읽는다.

클라이언트 `startNowButtonTemplate`(`lanes.js:1857-1880`)은 지금 세 경로 — 유예 중, `item.gate` 있음, 서버 `requested` — 어느 것이든 버튼을 만들고 선두 여부를 보지 않는다. 여기에 **직렬 레인 항목이면 선두일 때만**이라는 조건을 세 경로 모두에 앞서 건다(`item.lane`이 `s1`~`s5`이고 그 레인 entries의 첫 `bead_id`가 아니면 `''`). 재료는 `miniRow`가 이미 받는 `lane`과 레인 entry 순서다. 유예 칩·게이트 칩 자체는 그대로 그린다 — 사라지는 것은 누를 수 없는 버튼뿐이다.

### 6.3 어휘 표·범례·툴팁

- `wait-vocabulary.js`: `prerequisite-returning` 행(:72-82) 삭제. `prerequisite` 행의 "풀리는 조건" 문장 `선행이 닫히면 bd ready 재스캔으로 자동 복귀`는 유지한다. 행 `id` 목록(UI-8gem §5.2)에서 `prerequisite-returning`이 빠진다.
- 범례(`help-dialog/index.js`)는 `WAIT_KINDS`를 읽으므로 코드 변경 없이 행이 사라진다. 테스트만 갱신한다.
- `queue-blockers.js:200` 툴팁에서 `· 복귀 대기`를 뗀다(§5.3).
- `resolvedBlockerChip`의 이름·재료는 그대로다(§6.0의 "해제" 증명 한계).

### 6.4 알림·억제 키·타임라인

`return_overdue` 판정이 사라지므로 새 알림은 없다. 기존 `wait_notified` 키는 `claimWaitNotifications`가 활성 키만 재저장하므로 다음 판정 tick에 저절로 빠진다(§3). 타임라인의 과거 `wait_notified` 이벤트는 이력으로 남는다(ADR 0027). 마이그레이션 코드는 없다.

## 7. 범위 3 — 이슈 상세의 참고 줄 (`app/views/detail-panel/index.js`)

의존성 절 `depsTemplate`(:2264-2360)의 칩 목록 아래에 **한 줄**을 더한다. 자리는 상세 패널(UI-n99w §7.5)이며 카드 슬롯 표의 대상이 아니다.

- **조건**: 이 bead의 마지막 구현 attempt가 `waiting/prerequisite_unmet`이거나 admission record가 `prerequisite_unmet`이고, 지금 running·paused attempt가 없다. 재료는 `queueStore` 스냅샷(`attempts`·`admission`)이며 새 조회는 없다(ADR 0043).
- **재료**
  - 대기 시작 `t0` = attempt `finished_at`(세션이 손을 뗀 시각), attempt가 없으면 admission `at`. 둘 다 `queueStore` 스냅샷에 있다.
  - 해제 시각 `t1` = 동결 선행(`cause_detail.blockers` 또는 admission `blockers`) 중 지금 `bead_blocked_by[bead]`에 없는 것들의 `closed_at` 최댓값. 상세 패널은 이슈 구독 결과(`data.dependencies`)를 읽는데, 그 간선을 만드는 `compactDependency`(`server/list-adapters.js:407-420`)는 `title`·`status`·`issue_type`·`priority`·`created_at`·`updated_at`만 싣고 `closed_at`을 싣지 않는다. 이 스펙은 그 투영에 `closed_at: issue.closed_at ?? null`을 **더한다** — 원천 이슈 행은 이미 `closed_at`을 가진다(`:112-142`, ADR 0025의 투영 세대). 그래서 `t1`은 `data.dependencies` 중 `dependency_type === 'blocks'`이고 id가 동결 선행 목록에 있으며 `bead_blocked_by`에 없는 간선의 `closed_at`에서 읽는다. 옛 서버(필드 부재)·간선 삭제로 해제된 경우·`closed_at` null이면 `t1`은 없다. 두 탭 어느 쪽에서 연 상세든 같은 구독을 읽으므로 탭별 차이는 없다.
  - 경과 = `now − t1`, `t1`이 없으면 `now − t0`. 기존 `app/utils/relative-time.js` 형식이며 판정 글리프·색·임계는 없다.
- **문장**: `선행 대기 시작 <t0> · 해제 <t1> · 해제 후 <경과>` — 재료가 없는 조각은 뺀다(`t1`이 없으면 `선행 대기 시작 <t0> · <경과> 경과`). 클래스 `detail-dep__ref`, 저채도(`detail-dep__wait`와 같은 톤, `styles.css`에 규칙 하나). 툴팁 없음, 클릭 없음.
- **아닌 것**: 배지·verdict·알림·요약 집계·카드 표시. 조건이 거짓이면 줄 자체가 없다.

## 8. 범위 4 — 직렬 레인 순서 고정 (`server/worker/scheduler.js`)

### 8.1 `runPass` 후보 수집 (:14463-14500)

점유되지 않은 직렬 레인에서 **`lane.entries[0]`만** 후보에 넣는다. `bypassed_by_lane`(:14503, :14576-14580)을 지우고, 선두가 `!ready || blocked`이면 `dequeueIfClosed` → `recordNotReady`(선행 대기 진단 기록은 유지, ADR 0034의 재료) → `stopSerialLane()`이다. "선행 대기면 다음 항목" 갈래는 없다. 그 밖의 `stopSerialLane()` 갈래(cleanup_pending·claimed·paused·유예·fence·조회 실패·worker_ineligible·awaiting_user·admission 실패)는 현행 그대로다.

명시적 시작 요청(`worker-queue-start-now` → `requestStartNow` → `tickWorkerQueue`, `server/ws/worker-handlers.js:4642-4645`)은 큐에 요청을 등록하고 tick만 부르므로, 선두가 아닌 직렬 항목을 지정한 요청은 후보 수집에서 **거절·기록**해야 흔적이 남는다. 후보 수집 시 각 직렬 레인에서 `isStartNowEntry`가 참인 entry가 `entries[0]`이 아니면 그 entry에 `refuseDispatch(workspace, bead_id, 'serial_lane_not_head')`를 기록하고(요청 소비), 레인은 현행 규칙대로 선두만 본다. `explicit_only`(자동 진행 꺼짐·hold)일 때도 같다: `explicit_index === 0`인 레인만 선두를 넣고, 0이 아닌 명시적 대상은 같은 거절을 기록한다. 그래서 §8.3의 `serial_lane_not_head` admission은 `dispatch()`가 아니라 이 지점에서 난다.

### 8.2 `dispatch()`의 선두 검사 (:8859, :9296, :4721-4775)

`verifySerialBypass`(:6581-6678)와 `serialBypassLocallyBlocked`(:6558-6570)를 삭제하고 동기 `serialHeadOf(q, bead_id)`로 바꾼다: `waitingLaneOf`가 null이면 `{ ok: true, lane_id: null }`, 레인이 있으면 `entries[0].bead_id === bead_id`일 때만 `{ ok: true, lane_id }`, 아니면 `{ ok: false, reason: 'serial_lane_not_head' }`. 실행 전(:8859)과 실행 직전(:9296) 두 자리가 같은 함수를 쓴다 — 비동기 준비 중 드래그로 선두가 바뀌면 직전 검사가 `abortPreparedLaunch('serial_lane_not_head')`한다(UI-wc67의 "최신 상태로 재판정" 경계 유지). `lane_input.bypassed_before`(:8869)와 `laneLaunchRefusal`의 prefix 대조(:4757-4771)는 `bead_index === 0`(continuation 아님) 하나로 준다. `recordNotReady`·`prerequisiteBlockersOf`는 선두 자신의 판정에 쓰이므로 남는다. `laneOccupiedByOther`·`orderLaneByBlocks`·`runWaitingRescan`·유예·fence는 바꾸지 않는다.

### 8.3 `[지금 시작]`과 `serial_lane_not_head`

`[지금 시작]`은 지정한 이슈 하나의 실행 권한이다(ADR UI-wc67 4항의 앞부분 유지). 선두가 아닌 직렬 항목을 지정하면 `runPass`가 후보 수집 시점에 `serial_lane_not_head`를 기록하고 요청을 소비한다(§8.1) — 뒤 항목으로 권한을 넘기지 않고 `dispatch()`에도 이르지 않는다. UI는 §6.2로 그 행에 `[지금 시작]`을 내놓지 않으므로(서버 `auto_advance_off` 대상 축소 + 클라이언트 `startNowButtonTemplate` 선두 조건) 보통은 이 거절이 일어나지 않는다. WS·HTTP로 직접 부른 경우를 위해 `admissionBadge`(`lane-model.js:1590-1622`)에 `serial_lane_not_head → ''` 매핑을 더한다(`grace_period`와 같은 처리): 순번이 이미 말하는 사실이라 `⛔ serial_lane_not_head` 원문 배지를 그리지 않는다.

### 8.4 결과와 절충

- `A → B → C`에서 A가 외부 선행 X를 기다리면 B·C는 X가 닫힐 때까지 기다린다. 레인이 놀지 않게 하는 것은 사람이다: B를 병렬로 끌어내거나 A를 뒤로 옮긴다. 대기 행의 `⛓ 선행 대기`(A)와 순번(B·C)이 그 판단의 근거다(D5).
- 세션이 분리한 선행 quick_fix는 원 이슈 앞 index에 놓이고 레인 보정도 같은 결과를 내므로(§3) 순서대로 쌓아도 흐른다: 선행 → 원 이슈 → 나머지.
- 레인당 동시 실행 1은 전과 같다. 줄어드는 것은 착지 순서 뒤집힘과 시스템 전체 in-flight다.
- `recordNotReady`는 **변경 후** 선두에만 기록된다. 지금은 우회 중 뒤 항목(`:14579`)과 우회 대상 앞 항목들(`:6620`)에도 기록되며, 그렇게 이미 남은 뒤 항목의 `prerequisite_unmet` admission 기록은 ADR 0034의 재스캔이 계속 소비하고 ready에서 지운다 — 옛 기록을 손대지 않는다. 선두가 아닌 항목의 선행 대기 **표시**는 어느 쪽이든 UI-n99w §5.1의 `bead_blocked_by` 재료가 맡는다.

## 9. 문서 정정 (ADR 0014)

`2026-08-25-card-header-grammar-unify-design.md` §5.1 끝에 **정정(UI-cmx3)** 문단을 더한다.

- 슬롯 1 held 판정 뱃지 목록에서 `복귀 대기`를 뺀다(`⛓ 선행 대기`·`반영 대기`·`⏸ 세션 대기`·`↻ 재시도 대기`는 그대로). `prerequisite_unmet` `waiting` attempt는 held 타일이 아니라 대기 행이 대표하므로 그 뱃지가 설 타일이 없다(ADR 0038의 확장, 이 스펙 §5).
- 슬롯 4b `🔓 <ID>`의 각주 "선행 대기 타일의 해제된 선행(복귀 대기)도 이 칩"을 "선행 대기 기록(`waiting/prerequisite_unmet` attempt 또는 `prerequisite_unmet` admission)이 있는 **대기 행**의 해제된 동결 선행도 이 칩 — UI-d13v §5.3 '후보 행만'의 예외"로 바꾼다.
- 정정(UI-yue8)·정정(UI-8gem) 문단의 `복귀 대기` 언급은 이력으로 두고 이 정정이 뒤를 잇는다고 한 줄로 밝힌다.

`2026-08-28-chip-grammar-unify-design.md`는 바꾸지 않는다 — `🔓 <ID>`의 클릭 의미(이슈 열기)는 같다. `AGENTS.md` 카드 배치 문법 절도 정본 경로만 가리키므로 그대로다.

## 10. 에러·경계

- `cause`가 없거나 미상인 `waiting` attempt: 강등하지 않고 현행 타일이다(fail-closed). 옛 `queue.json`의 `waiting` 레코드는 전부 `cause`를 가진다(ADR UI-lmqu가 승계한 `settleFailureTier` 정산 경로가 쓴다).
- `bead_blocked_by` 키 부재(재시작 직후, 장식 미도착): `frozen ∪ proven`을 전부 `⛓`로 그린다(현행). `🔓`는 키가 있을 때만 선다.
- 강등된 행의 bead가 새 attempt로 dispatch되면 `latestImplementationAttempts`가 그 attempt를 고르고 행은 실행 중 타일로 바뀐다. 옛 `waiting` 레코드는 이력이다.
- `waiting/prerequisite_unmet` attempt가 있는데 그 bead가 어느 레인 entry에도 없는 경우(사용자가 제거함): 대표할 행이 없어 화면에서 사라진다. 후보 레인은 `bd ready`에 따라 다시 보여 준다(ADR 0033). ADR 0038의 "행이 없는 점유자는 강등하지 않는다"는 점유(ghost) 조항이고, 이 attempt는 점유가 아니라 해당하지 않는다.
- 직렬 레인 순서 보정이 순환(`cycle: true`)이면 보정 없이 저장 순서다(현행). 선두가 자기 뒤 항목에 막혀 있으면 사람이 풀어야 한다 — 레인 헤더의 기존 `corrections` 제안이 그 사실을 말한다(UI-n99w §7.7 "건드리지 않는다" 유지).
- `[지금 시작]` HTTP 직접 호출로 선두 아닌 항목을 지정: `serial_lane_not_head` admission이 기록되고 배지는 그리지 않는다(§8.3). 다음 pass에서 선두가 ready면 선두가 간다.
- 코디네이터 `launches`의 `bypassed_before`는 메모리 상태라 마이그레이션이 없다. `queue.json` 스키마 변경 없음.
- `return_observed_at`은 저장되지 않는 메모리 값이라 재시작 뒤 잔여가 없다. `wait_notified`의 옛 키는 §6.4.

## 11. 재현 (microbiome_bile, 2026-09-16)

전: s1 `xz9d → c312 → wq0w`, 세 bead 모두 `waiting/prerequisite_unmet` attempt, `auto_advance=false`, xz9d·wq0w의 선행은 닫힘, c312는 xz9d에 막힘. 실행 중 그리드에 타일 3개(`🔓 복귀 대기 · ⚠ 지연`, `⛓ 선행 대기`, `🔓 복귀 대기 · ⚠ 지연`).

후(이 스펙):

- 실행 중 그리드는 빈 메시지다.
- s1 대기 행 3개, 순번 1·2·3 그대로.
  - xz9d(선두): `⛓` 없음, 배지 없음, 4b `🔓 Analysis-ph3a` `🔓 Analysis-5dbb`, 4a `⏸ 수동 출발` + `[지금 시작]`.
  - c312: `⛓ Analysis-xz9d`, 슬롯 1 `⛓ 선행 대기`(xz9d는 open이고 정상 판정은 문구를 붙이지 않는다, UI-8gem §5.1), 흐림. `⏸`·`[지금 시작]` 없음(다른 사유가 있고 선두가 아니다).
  - wq0w: `⛓` 없음, 배지 없음, 4b `🔓 Analysis-1l46` `🔓 Analysis-x0cr`. `⏸` 없음(선두가 아니다, §6.2).
- 상세(xz9d): 의존성 절 아래 `선행 대기 시작 9/15 04:56 · 해제 <ph3a·5dbb 중 늦게 닫힌 closed_at> · 해제 후 <경과>` — 꺾쇠는 스냅샷에서 읽는 실제 값의 자리다.
- 자동 진행 ▶: 다음 tick에 xz9d가 dispatch돼 실행 중 타일이 된다. c312·wq0w는 그대로 대기(선두 아님). xz9d가 닫히면 이벤트 재스캔 → c312 선두 → dispatch. wq0w는 c312 뒤.
- `wait_notified`의 `return_overdue` 키 2개는 다음 판정 tick에 사라진다.

## 12. 검증 bundle

`npm run tsc` · `npm run lint` · `npx prettier --write <변경 파일>` · `npx vitest run --reporter=dot`(AGENTS.md Pre-Handoff Validation). 게이트 앞 전체 1회.

| 파일 | 바뀌는 단정 |
| --- | --- |
| `app/views/worker/lane-model.test.js` | `waiting/prerequisite_unmet` attempt가 있는 bead는 `lanes.running`에 없고 자기 레인 행에 있다(병렬·직렬 각 1); `cause=base_moved`·recovery·`cause` 미상은 타일 유지; 대기 행이 `resolved`(`frozen − open`)를 4b `🔓`로 얻고 키 부재면 전부 `⛓`; `wait.returning` 단정(:2590, :2761-2848)을 `open/released` 두 값으로 고침; `admissionBadge('serial_lane_not_head') === ''` |
| `app/views/worker/running-grid.test.js` | `'badges a returning waiting attempt as 복귀 대기'`(:2576) 삭제; `waiting` 타일은 `base_moved`·recovery·`cause` 미상만(미상 타일의 배지는 `⛓ 선행 대기`) |
| `app/views/worker/wait-vocabulary.test.js`·`app/views/help-dialog/index.test.js` | `prerequisite-returning` 행 부재, `waitKindRow({kind:'prerequisite'}, {returning:true})`가 `prerequisite` 행 |
| `app/views/worker/queue-blockers.test.js` | :317 툴팁 `해제 — 더 이상 이 이슈를 막지 않는다` |
| `app/views/worker/lanes.test.js` | :365·:392의 `return_overdue` fixture를 남는 코드(`settle_overdue`)로 교체; `heldRowId`가 `returning`과 무관하게 `prerequisite` 행; `startNowButtonTemplate`이 직렬 선두 아닌 행에서는 유예 중·`gate` 있음·`requested` 세 경우 모두 `''`이고 선두·병렬 행에서는 현행 그대로 |
| `app/views/monitor/index.test.js` | :258 근처 fixture 교체; Monitor도 강등; `cause` 미상 타일의 `status_label`은 `선행 대기` 유지 |
| `app/views/detail-panel/index.test.js` | 참고 줄 세 조각·`t1` 부재 형태(`closed_at` 없는 간선·옛 서버 필드 부재)·조건 거짓이면 줄 없음 |
| `server/list-adapters.test.js` | `compactDependency`가 `closed_at`(닫힌 이슈는 epoch ms, 열린 이슈·미상은 null)을 싣고 나머지 필드는 불변 |
| `server/worker/wait-judgment.test.js` | :641-701 `return_*` 테스트 삭제; 열린 선행이 없으면 `prerequisite` 사유가 나지 않음; `since = finished_at`; `auto_advance_off`가 직렬 선두·병렬 항목에만 |
| `server/worker/scheduler.test.js` | seam D(:19239-19620) 우회 테스트 삭제 → "선행 대기 선두 뒤 항목은 dispatch되지 않는다", "선두가 ready가 되면 선두가 간다"(:19259 유지), "선두 아닌 항목의 start_now는 후보 수집에서 `serial_lane_not_head` admission을 남기고 요청을 소비하며 선두는 영향 없다"(auto_advance on·off 각 1), "준비 중 드래그로 선두가 바뀌면 직전 검사가 abort"; seam B 뮤텍스(:18985) 유지 |
| `server/ws/worker-handlers` 관련 테스트 | `worker-queue-start-now`로 선두 아닌 직렬 항목을 지정한 뒤 스냅샷의 `admission[bead].reason === 'serial_lane_not_head'` |
| `server/worker/notify.test.js` | 변화 없음(키 형식 불변) |

수용 기준: (1) `waiting/prerequisite_unmet` attempt만 있는 bead는 어느 탭에서도 실행 중 그리드에 없고 자기 레인 행에 있다; (2) `복귀 대기`·`return_overdue` 문자열이 `app/`·`server/`에 남지 않는다(테스트 fixture 포함); (3) 직렬 레인에서 선두가 `!ready`일 때 뒤 항목은 어떤 경로(`runPass`·`start_now`·직전 검사)로도 dispatch되지 않는다; (4) 선행이 전부 해제된 대기 행에 `🔓` 칩이 서고 `⛓`·배지는 없다; (5) 상세 참고 줄은 조건·재료·형식이 §7과 같다; (6) 카드 문법 스펙 §5.1 정정 문단이 있다.

## 13. 구현 unit 후보

1. `server/worker/scheduler.js` — §8(선두만 후보, `serialHeadOf`, `bypassed_before`·`verifySerialBypass`·`serialBypassLocallyBlocked` 삭제) + `scheduler.test.js` seam D 재작성.
2. `server/worker/wait-judgment.js` + `app/protocol.js` — §6.1·§6.2 + 테스트.
3. `app/views/worker/lane-model.js`·`running-grid.js`·`queue-blockers.js`·`wait-vocabulary.js`·`app/views/monitor/index.js` — §5·§6.3 + 테스트.
4. `server/list-adapters.js`(`compactDependency` `closed_at`)·`app/views/detail-panel/index.js`·`app/styles.css`·카드 문법 스펙 §5.1 정정 — §7·§9 + 테스트.

## 14. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 관찰: dotfiles workflow의 Worker lane placement(`execution-spec-backed.md` 3-4, 선행은 원 이슈 앞 index)는 순서대로 쌓기와 정합하므로 바뀌지 않는다. UI-wc67 ADR을 인용하는 dotfiles 문장은 없다(그 ADR은 이 저장소 것이다).
- 관찰: microbiome_bile `queue.json`의 `wait_notified` `return_overdue` 키 2개는 §6.4대로 저절로 빠진다. 손으로 고치지 않는다.
- 관찰: 선두가 아닌 직렬 항목의 선행 대기 **표시**는 지금도 `bead_blocked_by`(UI-n99w §5.1)가 맡는다. `recordNotReady`는 지금 우회 경로에서 뒤 항목에도 기록되지만 변경 후에는 선두에만 기록되고, 이미 남은 기록은 ADR 0034의 재스캔이 계속 소비한다(§8.4).
- 관찰: 레인 헤더의 `corrections`(선행이 뒤에 있는 항목의 순서 정정 제안)는 순서대로 쌓기에서 더 중요해지지만 표시는 바꾸지 않는다.
- 비목표: `auto_advance` 토글·기본값(ADR 0011), 선행 대기 항목의 레인 이동·자동 재배치(UI-n99w §11 유지), `bd ready` 판정·재스캔 트리거(ADR 0034), 병렬 큐 규칙, `external_job`·`provider_hold`·`queue_hold`의 판정·임계·알림, 상세 패널 구조, `wait_notified` 스키마, 후보 레인의 `release_info` `🔓` 규칙, `base_moved`·recovery `waiting` 타일, Discord 알림 문장.
- 결정: 선행 대기 항목은 레인 밖으로 옮기지 않는다 — 순서 정보는 항목의 자리에만 있다(UI-n99w §2-4 재확인).
- 결정: 직렬 레인 우회의 옵트인 설정을 두지 않는다 — 우회가 필요하면 사람이 항목을 병렬로 옮긴다. 설정면은 규칙을 둘로 만든다.
- 결정: 선두 대기 중인 뒤 항목에 새 칩을 만들지 않는다(D5).

## 결정 (ADR 후보)

- 전제: ADR 0014 — 단일 `buildLanes`와 공유 슬롯 표를 유지하고 §9가 슬롯 표를 먼저 정정한다(빼기만 한다).
- 전제: ADR UI-lmqu(0028을 승계) — `waiting`은 종료된 attempt의 기계 사실 대기이고 사유별로 갈리며, `prerequisite_unmet`의 유일한 fence는 `bd ready` 부재이고 선행 해소 뒤 새 attempt로 복귀한다; `base_moved`는 보존 후보와 `↻ 이어하기`다. 강등은 이 기록을 바꾸지 않고 화면 대표만 바꾼다. 같은 ADR의 "직렬 레인의 확인된 선행 대기만 추월하는 규칙을 유지한다" 조항 하나는 후보 1이 뒤집는다.
- 전제: ADR 0034 — 복귀 트리거는 이벤트 구독이고 재스캔 후보에 직렬 선두 아닌 멤버도 들어가며 발차 규칙은 `tickPass`가 소유한다; §8은 발차 규칙만 바꾼다.
- 전제: ADR 0038 — 대기 행이 held 타일을 이길 수 있고 강등은 "타일 대신 행"이며 `claimed`에 들지 않는다; §5는 같은 경로를 쓴다.
- 전제: ADR UI-a8rq — 큐 단위 사정의 표시는 상단 배너가 아니라 막힌 행의 4a 게이트 칩이다; §5.2·§6.2는 `⏸ 수동 출발`을 그 자리에 둔다.
- 전제: ADR 0011 — 자동 진행과 자동 머지는 별개이고 이 설계는 둘을 바꾸지 않는다.
- 전제: ADR 0029 — 살아 있는 `queue.attempts`는 이력의 최신 접미이고 "마지막 구현 attempt" 판정은 라이브 큐만 본다; §5.1·§7이 그 판정을 재사용한다.
- 전제: ADR 0027 — 판정·알림 이력은 타임라인이 소유하고 `queue.json`에는 억제 키 상태만 둔다; §6.4는 키를 손대지 않는다.
- 전제: ADR 0043 — 투영은 준비된 비동기 자료만 읽는다; §7의 참고 줄은 스냅샷만 읽는다.
- 후보 1: 직렬 레인은 선두만 실행 후보이고 선두가 어떤 이유로든 실행 불가면 레인이 기다린다 — 확인된 선행 대기를 건너뛰는 예외를 두지 않는다.
  - 되돌리기 어려움: 스케줄러의 후보 수집·두 번의 실행 전 검사·`[지금 시작]` 경계·`auto_advance_off` 대상·seam D 테스트가 "선두만"에 묶이고, 되돌리면 UI-wc67의 두 번 재조회 우회 검사를 다시 지어야 한다.
  - 맥락 없이 의외: 이틀 전 같은 사용자가 반대 방향(UI-wc67)을 결정했고, 코드만 보면 "선두가 놀고 있는데 왜 뒤가 가지 않는가"가 설명되지 않는다 — 직렬 배치 자체가 순서 의도라는 판단은 코드에 없다.
  - 실제 절충: 선두가 외부 선행에 오래 묶이면 레인이 놀고 사람이 옮겨야 한다; 대신 착지 순서가 뒤집히지 않고 겹치는 항목의 rebase 비용과 시스템 전체 in-flight가 줄며 규칙이 하나다.
  - 대체 범위: ADR UI-wc67 결정 2항(선행 대기만 건너뛰기)과 4항의 순서 예외, ADR UI-lmqu 결정 2항의 "직렬 레인의 확인된 선행 대기만 추월하는 규칙을 유지한다" 조항을 뒤집는다. 한 조항이라도 뒤집히면 그 ADR 전체가 대체되므로 새 ADR은 두 ADR의 **유지 조항을 승계해 함께 싣는다** — UI-wc67에서: 연결 레인 폐기와 저장소별 대기열·`blocks` 의존만 사용, 대기 이슈의 레인·순서·진입 시각 보존, 직렬 실행 한 번에 하나와 점유 보존, `[지금 시작]`은 지정 이슈 하나의 권한, ADR 0034 재검사 경로 사용, 과거 간선·큐·이력·`cross-lanes.json`·arm 필드 처리; UI-lmqu에서: `waiting`의 사유별 분기, `prerequisite_unmet`의 `bd ready` fence와 자동 복귀, `base_moved`의 검증된 보존 후보·`↻ 이어하기`·`반영 대기` 배지, 새 Beads 상태·metadata·가짜 의존성 없음.
  - `summary`: "직렬 레인은 선두만 실행 후보이고 선두가 실행 불가면 사유와 무관하게 레인이 기다리며 선행 대기 우회 예외는 없다" → ADR, supersede UI-wc67·UI-lmqu
- 후보 2: `prerequisite_unmet`으로 끝난 `waiting` attempt가 있는 bead는 held 타일이 아니라 대기 행이 대표한다 — 실행 중 그리드는 세션이 돌거나 attempt 자체에 사람의 조작이 필요한 것만 담는다.
  - 되돌리기 어려움: 두 탭·`blockedByFields`·4b 칩 부착·Monitor 라벨·어휘 표·슬롯 표·테스트가 "행 대표"에 묶이고, 되돌리면 `복귀 대기` 어휘와 지연 판정을 다시 살려야 한다.
  - 맥락 없이 의외: `waiting` attempt 레코드가 큐에 살아 있는데 타일이 없다 — 0038이 admission으로 대표를 정했듯 이 결정은 attempt의 `cause`로 대표를 정하며, 코드만 읽으면 왜 `base_moved` `waiting`은 타일이고 `prerequisite_unmet` `waiting`은 행인지 드러나지 않는다.
  - 실제 절충: 선행 대기 attempt 기록에 대한 폐기·재시도 조작 표면이 사라지고(이력만 남는다) 대신 실행 중 그리드가 실제 실행과 사람 조작 대기만 담는다.
  - `summary`: "prerequisite_unmet waiting attempt가 있는 bead는 held 타일이 아니라 대기 행이 대표하고 실행 중 그리드는 실행·사람 조작 대기만 담는다" → ADR
- 후보 3: `복귀 대기` 어휘·`return_overdue` 판정 제거와 상세 참고 줄 — 표시 어휘·판정 표·상세 패널 구성이며 슬롯 표와 어휘 표가 소유한다(2026-09-04 스펙 §결정의 같은 판정) → ADR 아님
- 후보 4: `auto_advance_off` 대상을 직렬 선두로 좁히는 것 — UI-8gem §10.2 "다른 사유로 이미 멈춘 항목에는 붙지 않는다"의 적용이지 새 원칙이 아니다 → ADR 아님
