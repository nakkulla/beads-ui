---
scope:
  - app/utils/placement/compute.js
  - app/utils/placement/apply.js
  - app/views/worker/placement.js
  - app/views/monitor/
  - app/protocol.js
  - server/placement/relations.js
  - server/ws/worker-handlers.js
  - server/worker/queue-store.js
  - server/worker/queue-place-bundle.js
  - server/worker/scheduler.js
  - server/app.js
---

# 배치안은 부딪히는 대기·점유 상대를 후보와 같은 직렬 레인에 세운다 (UI-blx2)

## 1. 목표

출처는 2026-11-07 사용자 보고(Telegram Hermes, beads-ui 토픽)다. dotfiles 배치안 표가 `dotfiles-l62k9`를 `병렬 · 대기 #2`에
두고 "⚠ dotfiles-83ss0(병렬)과 동시에 돌 수 있음 — 상대를 직렬 레인으로 옮기면 피할 수 있음"만 달았다. 직렬 1·2는
비어 있었다. 사용자 말: "배치안 만들 때부터 직렬 레인에 배치해서 안 겹치게", "근본 원인을 고쳐야지. 배치안 만드는 기준부터".

원인은 자리 계산 기준이다. 이미 대기열에 있거나 레인을 점유한 상대(K)의 자리를 고칠 수 없는 입력으로 보고, K가
병렬에만 있으면 혼자인 후보를 병렬에 두고 경고만 단다. 부딪힘을 알면서 둘 다 병렬에 두고 사람에게 옮기라고 미룬다.

목표는 다음과 같다.

- 부딪힘·순서 관계(`conflict`·`c_first`·`x_first`, `blocks` 제외)가 있는 후보와 상대는 배치안을 적용한 뒤 같은 직렬
  레인에 서서 동시에 돌지 않는다. 상대가 대기 중이면 옮기고, 직렬 레인 없이 실행·PR 대기 중이면 그 lineage를 레인에 묶는다.
- `[추천 배치]`→`[적용]`, `[전체 배치안]`→`[전체 적용]`, 모니터 저장소 카드 적용이 모두 같은 계획을 수행한다.
- `uncovered` 경고는 옮기거나 묶을 수 없는 상대에만 남고, 그 이유를 말한다.

## 2. 검증된 전제

기준은 origin/main `46fdb521`다.

- 정본 규칙 §4.6 「묶음의 레인」이 K를 고정 자리로 보고, 덮지 못한 X에 `uncovered`를 단다 — `docs/superpowers/specs/2026-10-16-jev-queue-placement-preview-design.md:160`, `:170`
- 구현: 묶음 레인 선택과 `uncovered` 생성 — `app/utils/placement/compute.js:662`, `:689`, `:800`; 가장 빈 직렬 레인 — `:576`; 선행 후보 집합 — `:489`
- 이 동작을 고정한 테스트 — `app/utils/placement/compute.test.js:280`
- 경고 문구 — `app/views/worker/placement.js:535`; 점선 카드는 덧그림이고 드래그 좌표가 없다 — `:929`
- 자리 찾기(`locate`)는 대기 배열을 점유보다 먼저 본다 — `app/utils/placement/compute.js:425`; 점유는 `pr_wait`(보관 제외)와 실행중 승자, 직렬 레인 밖이면 `parallel` — `:410`
- Worker가 시작한 실행 중 Bead는 대기 배열 항목을 유지한다(세션이 시작한 것은 없음) — `server/ws/worker-handlers.js:2371`; 화면은 running > pr_wait > 대기 순으로 배타 판정 — `app/views/worker/lane-model.js:11`
- store `place`는 모든 배열(대기·`pr_wait`·`done`)에서 빼고 넣은 뒤 lineage 레인을 다시 묶는다 — `server/worker/queue-store.js:8002`, `:6030`, `:5909`
- 여러 Bead를 한 CAS로 한 직렬 레인에 넣는 선례(이미 대기 중인 것 재배치, 새로 넣기) — `server/worker/queue-store.js:8112`(`applySerialGroup`), `:8178`(`placeSerialGroup`)
- 레인 점유는 attempt의 `serial_lane_id`와 보관 안 된 `pr_wait` 항목의 `serial_lane_id`로 계산하고, 한 레인에 점유자가 여럿일 수 있다(Set) — `server/worker/scheduler.js:1256`, `:1289`, `:1316`
- 끝난 attempt는 Bead의 최신일 때만 레인을 잡는다 — `server/worker/queue-store.js:2428`
- 디스패치·재시도는 Bead의 레인을 대기 항목(`serialHeadOf`→`waitingLaneOf`)에서만 읽는다. 대기 항목이 없는 Bead의 새 attempt는 `serial_lane_id: null`이다 — `server/worker/scheduler.js:1042`, `:12966`, `:13407`
- 배치 투영은 대기·점유 항목의 `blocked_by`를 받지만, 항목끼리의 `blocks` 간선은 직렬 레인 안 것만 싣는다 — `server/ws/worker-handlers.js:2040`, `:2056`; `server/placement/relations.js:313`
- 적용: 한 자리 전송과 CAS 재시도 — `app/utils/placement/apply.js:191`; 차례 전송과 멈춤 — `:284`; 모니터 저장소 카드도 같은 `sendPlacementBatch`를 부른다 — `app/views/monitor/placement-panel.js:279`
- 모르는 WS 메시지 유형에 서버는 `unknown_type`을 돌려준다 — `server/ws/connection.js:800`
- HTTP place 경로 — `server/app.js:177`; `queue-place.js`는 레인을 판단하지 않는다 — `server/worker/queue-place.js:1`
- 세션 배치 절차도 "남의 자리는 옮기지 않는다" — dotfiles `src/shared/skills/flow/workflow/references/execution-worker-lane.md:91`
- 현장: `GET /api/worker/queue?root_dir=<dotfiles>`에서 `parallel=[dotfiles-83ss0]`, `s1=[]`, `s2=[]`, `running=[]`(2026-11-07 실행)

## 3. 설계

### 3.1 상대 분류

각 후보 c의 K 항목 X는 c와의 관계가 제약(`conflict`·`c_first`·`x_first`)인 대기·점유 항목이다. X를 다음 넷 중 하나로 나눈다.
점유 판정이 대기 배열보다 먼저다. 실행·PR 대기 중인 Bead가 대기 배열에 항목을 남겨 두어도 점유로 본다.

1. **옮김(move)**: 대기 중(병렬 또는 직렬)이고 점유가 아니다.
2. **묶음(bind)**: 점유이고 `serial_lane_id`가 없다(실행 중·일시정지·최신 실패·보관 안 된 PR 대기).
3. **고정**: 직렬 레인을 점유한다. 레인을 바꿀 수 없다.
4. **제외**: 아래 중 하나에 해당한다. 그 자리에 그대로 둔다.
   - X가 다른 대기·점유 항목의 직접 `blocks` 선행이다. 줄에 묶이면 UI-ey6v의 교착이 다시 생긴다.
   - 묶음 대상인 X가 고른 레인 L에서 기다리는 항목을 `blocks` 선행으로 기다린다. X가 L을 잡으면 그 선행이 시작하지 못한다.
   - 묶음 대상인 X를 묶을 L에 이미 다른 점유자가 있거나, 같은 L에 묶을 다른 X가 앞서 정해졌다. 한 레인에 점유자가 둘이면
     scheduler는 서로를 "다른 점유"로 보고 둘 다의 이어 실행을 거절한다. 그래서 묶음은 레인당 하나, 빈 레인에만 한다.

c와 X 사이 관계가 `basis: 'blocks'`뿐이면 X는 분류하지 않는다. 간선이 순서를 지키므로 동시에 돌지 않는다(UI-ey6v 그대로).

- 결정: 다른 직렬 레인에서 기다리는 상대도 옮긴다(대안: 그대로 두고 경고; 이유: 직렬 레인끼리는 동시에 돈다. 원래 레인 안
  순서의 이유를 화면이 모른다는 비용은 감수한다. 사용자 선택, 2026-11-07).
- 결정: 직렬 레인 없이 실행 중인 상대는 그 lineage를 후보의 직렬 레인에 묶고 후보를 그 뒤에 둔다(대안: 보류 행으로 빼기,
  병렬+경고 유지; 이유: 사람이 다시 열지 않아도 겹치지 않는다. 대가로 후보는 상대가 착지하거나 사람이 정리할 때까지 기다린다.
  사용자 선택, 2026-11-07).

### 3.2 레인 고르기

옮김·묶음 항목은 그 후보의 묶음 구성원이 된다. 한 항목이 두 묶음에 걸리면 두 묶음은 하나가 된다. 선행 후보(UI-ey6v)는 지금처럼
혼자 병렬에 둔다. 다른 묶음의 레인 L은 다음 순서로 고른다.

1. 고정 항목(직렬 점유자, 직렬 레인의 제외 항목)이 있으면 그들이 선 레인 중 K 항목을 가장 많이 담은 레인을 고른다. 동률이면 낮은 번호다.
2. 고정 항목이 없고 K 항목이 직렬 레인에서 기다리면, K 대기 항목을 가장 많이 담은 레인을 고른다. 옮김이 가장 적다. 동률이면 낮은 번호다.
3. 그 밖이면 지금 규칙이다. 구성원이 하나이고 K·바깥 제약이 없으면 병렬, 아니면 가장 빈 직렬 레인이다(`s1`~`s5`, 증설 포함).
   짐(대기 수+점유 수)이 0인 레인이 점유 없는 레인이므로, 묶음 항목이 있는 묶음도 이 규칙으로 빈 레인을 얻는다.

L 밖의 옮김 항목은 L로 옮기고, 묶음 항목은 §3.1 조건 안에서 L에 묶는다. 고정·제외 항목이 L 밖이면 §3.7의 경고를 단다.

- 결정: 구성원 하나·K 없음의 첫 배치는 지금처럼 병렬이다(대안: 미리 직렬; 이유: 나중에 부딪히는 후보가 오면 그때 상대를 옮긴다).

### 3.3 묶음 순서와 자리

- 묶음 순서는 지금처럼 `c_first`·`x_first`로 위상 정렬한다. 두 대기 항목 사이에는 투영된 `blocks`만 안다. 같은 순위에서는 옮김
  항목이 먼저 오고(대기열 순서: 병렬, 이어서 직렬 번호·index), 후보는 표시 순서를 따른다.
- 옮김 항목과 후보의 L 안 자리는 지금 규칙을 따른다. 묶음 순서대로 하나씩 넣는다. `x_first`·`conflict` 상대 중 마지막 것 뒤,
  `c_first` 상대 중 첫 것 앞, 아니면 맨 뒤다. 그다음 `orderLaneByBlocks`를 적용한다. 묶음 항목은 L의 점유자가 되어 모든 대기 항목 앞에 선다.
- **묶음이 전송 단위다.** 한 묶음의 묶기·옮기기·후보 넣기는 §3.4 조작 하나로 한 CAS 안에서 확정된다. 그래서 단계 사이에
  상대나 후보가 먼저 시작하는 틈이 없고, 일부만 적용된 묶음도 없다. 구성원이 후보 하나뿐인 묶음(병렬·선행 포함)은 지금처럼 `place`로 보낸다.
- 적용 순서는 묶음 순서이고 화면 번호도 그렇다. 계획은 묶음마다 레인, 단계 목록(종류 `bind`·`move`·`place`, id, 원래 자리, 넣을 index)을 싣는다.
- 묶음끼리는 상대를 공유하지 않는다(공유하면 하나로 합친다). 앞 묶음을 적용해도 뒤 묶음 상대의 분류는 바뀌지 않고 레인 짐만 바뀐다.
  이 짐 변화는 지금 규칙(앞 묶음을 넣은 결과로 다시 센다)이 이미 계획에 반영한다.

### 3.4 서버: 묶음 배치 조작

새 큐 조작 하나를 더한다. WS `worker-queue-place-bundle`과 HTTP `POST /api/worker/queue/place-bundle`은 한 몸체 모듈을 쓴다(`queue-place.js`와
같은 모양). 페이로드는 `{ root_dir, expected_revision, lane, binds: string[], steps: [{ bead_id, index }] }`이다. `steps`는 넣을 차례이고,
대기 중인 Bead면 옮김, 대기열에 없는 Bead면 새로 넣기다.

- 새로 넣는 Bead마다 지금 `place`와 같은 admission을 먼저 돈다. 하나라도 거절되면 아무것도 쓰지 않고 그 id와 사유를 돌려준다.
  옮김·묶음은 이미 대기열에 있거나 실행 중이므로 admission을 다시 돌지 않는다.
- 그 뒤 한 CAS 변경으로 쓴다. 하나라도 어긋나면 revision을 올리지 않고 `rejected`와 사유를 돌려준다(`applySerialGroup`과 같은 전부-아니면-무).
  - `lane`은 설정된 직렬 레인이다.
  - `binds`의 Bead: 지금 직렬 레인을 잡지 않고, `attemptHoldsSerialLane` 기준으로 레인을 잡을 수 있는 구현 attempt나 보관 안 된 `pr_wait` 항목이 있다.
    L에 그 lineage 말고 다른 점유자가 없고, `binds`는 많아야 하나다.
  - `steps`의 옮김 Bead는 대기 중이고 점유가 아니다. 새로 넣는 Bead는 대기열에도 점유에도 없다.
- 쓰는 것: 묶음 Bead의 풀리지 않은 구현 attempt `serial_lane_id`(`rebindLineageLane`과 같은 범위)와 `pr_wait` 항목의 `serial_lane_id`.
  묶음 Bead가 대기 배열에 항목을 남겼으면 그 항목을 L 맨 앞으로 옮긴다. 자리와 점유가 같게 남는다(rebind 주석의 불변식). 이어서
  `steps`를 차례대로 L의 index에 넣고(`place`처럼 다른 배열에서 빼고 lineage 레인을 다시 묶는다), 마지막에 `orderLaneByBlocks`를 적용한다.
- 성공하면 fanout하고 Worker를 한 번 깨운다. 레인을 판단하지 않고 받은 레인만 쓴다(ADR UI-hf8v 조항 승계).
- 결정: 기존 `place`로 묶지 않는다 — `place`는 `pr_wait`·`done` 항목을 지우고 대기 항목을 새로 만든다(§2).

### 3.5 서버: 레인 상속

디스패치·재시도가 Bead의 레인을 정할 때, 대기 항목이 없으면 그 lineage가 지금 잡은 직렬 레인을 쓴다. 지금 잡은 레인은
`attemptHoldsSerialLane`이 참인 구현 attempt나 보관 안 된 `pr_wait` 항목의 `serial_lane_id`다. 대기 항목이 있으면 지금처럼 그 레인이다.
대기 항목이 없고 잡은 레인도 없으면 지금처럼 `null`이다. 같은 lineage는 자기 레인에 막히지 않는다(`laneOccupiedByOther`).
묶인 lineage가 재개·수리·재시도로 새 attempt를 만들어도 레인이 풀리지 않는다. 같은 구멍이 있던 기존 직렬 lineage(대기 항목을 떠난 PR
대기 뒤 재디스패치)도 같은 규칙으로 닫힌다.

### 3.6 서버: 대기·점유 항목끼리의 `blocks` 투영

`placement_relations`에 대기·점유 항목 사이의 직접 `blocks` 간선을 모든 레인에 대해 고정 관계로 싣는다(`source: 'fixed'`,
`basis: 'blocks'`, jev 호출 없음). 두 끝이 같은 직렬 레인이면 `in_lane: true`로 둔다. 화면은 이것으로 §3.1의 제외를 판정한다.
이미 받는 `blocked_by`에서 만든다. 새 bd 호출은 없다. 판정 상태·진행 수는 jev 쌍만 세므로 바뀌지 않는다.

### 3.7 화면

- 후보 행의 배치안 칸과 `[추천 배치]` 근거 상자에 이동 줄을 더한다. 예:
  - `↪ dotfiles-83ss0: 병렬 #1 → 직렬 1 #1 (옮김)`
  - `⛓ UI-x: 실행 중 → 직렬 1 점유로 묶음`
- 옮김·묶음 단계는 끌어온 후보 행 아래 딸린 줄로 보이고, 체크는 후보 행에만 있다. 후보 체크를 빼면 그 후보만 끌어온 이동도 빠진다(고른 집합으로 다시 계산).
- 미리보기: 옮김 항목은 목적 레인에 점선 카드(번호·id·제목·`옮김` 태그)로 그린다. 원래 카드는 적용 전까지 제자리에 둔다.
  묶음 항목은 대기 카드가 없다. 줄로만 보인다.
- `[적용]`은 그 후보의 묶음을 보낸다. `[전체 적용]`과 같은 함수·멈춤 규칙이다. 묶음마다 직전 응답의 스냅샷으로 다시 계산하고,
  그 묶음의 레인과 모든 단계(종류·id·바로 앞 항목)가 보인 것과 같을 때만 보낸다. 다르거나 거절·두 번째 충돌·오류면 멈추고 넣은
  묶음 수와 이유를 보인다. 레인 증설은 그 묶음 전송 전에 지금처럼 한다.
- 모니터 저장소 카드 적용은 같은 `sendPlacementBatch`를 쓰므로 그대로 따라온다(§2). parity §9 표는 바뀌지 않는다.
- 부품은 `docs/design-system.md` 것만 쓴다. 점선 카드는 지금처럼 드래그 대상이 아니다(§2).

### 3.8 남는 경고

`uncovered`는 L 밖에 남는 고정·제외 항목에만 단다. 경고는 `reason`을 싣고 문구는 이유를 말한다. 상대를 옮기라는 안내는 없앤다.

- `occupied_other_lane`: `⚠ <X>(직렬 n)과 동시에 돌 수 있음 — 상대가 다른 직렬 레인을 잡고 있음`
- `predecessor`: `⚠ <X>(<자리>)과 동시에 돌 수 있음 — 상대가 다른 일의 선행이라 옮기지 않음`
- `waits_in_lane`: `⚠ <X>(<자리>)과 동시에 돌 수 있음 — 상대가 이 레인의 대기 항목을 기다려 묶지 않음`
- `lane_occupied`: `⚠ <X>(<자리>)과 동시에 돌 수 있음 — 레인에 이미 다른 점유가 있어 묶지 않음`

`predecessor_parallel`·`order_cycle`·`order_unsatisfiable`·`blocks_reordered`는 그대로다.

### 3.9 오류 처리

- 묶음 전송이 거절되면(admission 거절, CAS 밖 조건 위반) 아무것도 쓰이지 않는다. 그 묶음에서 멈추고 사유를 보인다. 앞서 적용된 묶음은 되돌리지 않는다.
- 상대가 계산 뒤 시작하면 revision이 바뀐다. 재계산은 그를 묶음으로 바꾸고, 단계 종류가 달라졌으므로 `moved`로 멈춘다.
- 구서버는 `worker-queue-place-bundle`에 `unknown_type`을 돌려준다(§2). 그 묶음에서 멈추고 "서버가 묶음 배치를 지원하지 않음"을 보인다.

## 4. 문서 정정

구현 때 정본 스펙에 정정 문단을 더한다.

- `2026-10-16-jev-queue-placement-preview-design.md` §4.6 — 정정(UI-blx2): K의 대기 항목은 옮기고 직렬 레인 없는 점유는 묶는다.
  `uncovered`는 옮길 수 없는 상대에만 단다(이 스펙 §3).
- `2026-11-07-lane-occupancy-latest-attempt-design.md` §3.4 「상대의 배치는 옮기지 않는다」 — 정정(UI-blx2): 선행 후보 자신은 그대로 병렬이다.
  선행이 아닌 후보의 상대는 이 스펙 §3에 따라 옮긴다.

## 5. 경계·후속

- 크로스 리포 unit: dotfiles — `execution-worker-lane.md` Worker lane placement 4단계를 §3.1~§3.3에 맞추는 quick_fix(target rig Bead).
  겹치는 대기 상대와 직렬 레인 없는 점유 상대를 자기 Bead와 함께 `POST /api/worker/queue/place-bundle` 한 번으로 넣는다.
  "남의 자리를 옮기지 않는다"와 그 관찰 줄은 지운다. place-bundle 경로가 착지해야 쓸 수 있다. 그래서 Finish에서 만들고 UI-blx2를
  `blocks` 선행으로 잇는다. beads-ui 구현의 선행은 아니다.
- 관찰: UI-ymcx 스펙도 배치 ADR 계열(UI-ey6v)을 supersede 대상으로 지명할 수 있다. 그쪽이 먼저 착지하면 이 스펙의 supersede 대상을
  그 새 ADR로 옮겨 적는다(재검토 때 `adr_current`로 확인한다).
- 결정: 수동 `[↴ 대기로]`·`orderLaneByBlocks`·`queue-place.js`는 바꾸지 않는다 — 사람의 선택을 막지 않고, 레인 판단은 화면 계산이 한다.

## 6. 테스트

- `compute.test.js`
  - 280행 테스트를 뒤집는다. 혼자인 후보와 병렬 대기 상대(`conflict`)가 가장 빈 직렬 레인에 한 묶음으로 선다. 상대가 먼저이고 `uncovered`는 없다.
  - `c_first` 상대: 단계 순서에서 후보가 먼저, 옮김 상대가 뒤다.
  - 다른 직렬 레인 대기 상대를 옮긴다(K 대기 수가 많은 레인으로).
  - 직렬 레인 없는 실행 중 상대는 `bind` 단계가 된다. 대기 배열에 항목을 남긴 실행 중 Bead도 점유로 분류한다.
  - 묶을 상대가 둘이면 하나만 묶고 다른 하나는 `lane_occupied`, 고른 레인에 점유가 있으면 묶지 않고 `lane_occupied`.
  - 다른 직렬 레인 점유자 두 곳: 많이 담은 레인을 고르고 다른 쪽에 `uncovered`(`occupied_other_lane`)를 단다.
  - 다른 대기 항목의 `blocks` 선행인 상대는 옮기지 않고 `uncovered`(`predecessor`)를 단다.
  - 묶음 상대가 L의 대기 항목을 기다리면 묶지 않고 `waits_in_lane`을 단다.
  - 한 상대를 두 후보가 끌면 두 묶음이 하나가 된다.
  - 선행 후보(UI-ey6v)는 여전히 혼자 병렬이고 상대를 옮기지 않는다. K 없는 혼자 후보는 병렬 그대로다.
- `apply.test.js`
  - 묶음 하나가 `worker-queue-place-bundle` 한 번으로 나간다(`binds`·`steps` 내용 확인).
  - 실제 `computePlacement`와 응답 스냅샷을 이어 두 묶음 이상의 `[전체 적용]`이 멈추지 않고 끝난다.
  - 묶음 전 상대가 시작한 스냅샷에서 `moved`로 멈춘다. 거절·`unknown_type`에서 멈추고 넣은 수를 보인다.
  - 단일 `[적용]`이 묶음을 보낸다. 레인 증설은 묶음 전송 전에 한 번 한다.
- `queue-store.test.js`(묶음 배치)
  - 옮김·새로 넣기·묶기를 한 revision으로 쓰고, 묶은 lineage의 attempt·`pr_wait` 레인과 대기 항목이 L 맨 앞에 온다.
  - 조건 하나가 어긋나면 아무것도 쓰지 않는다: 점유 있는 레인, `binds` 둘, 이미 직렬인 lineage, 점유 중인 옮김 대상, 범위 밖 레인, revision 불일치.
  - 묶은 뒤 `activeLaneLineages`가 L을 그 lineage 하나의 점유로 본다.
- `scheduler` 테스트(§3.5)
  - 대기 항목 없는 묶인 Bead의 재디스패치·재시도가 L을 물려받는다.
  - PR 대기에서 재디스패치된 직렬 lineage가 레인을 물려받는다.
  - 대기 항목 있는 Bead는 지금처럼 대기 항목의 레인을 쓴다.
- WS·HTTP `place-bundle`이 같은 몸체를 쓰고, admission 거절 시 쓰지 않으며, 성공 시 fanout한다(`server/ws.worker-queue.test.js`).
- `relations.test.js`: 병렬 대기 항목끼리의 `blocks` 간선이 고정 관계로 실리고 판정 진행 수는 바뀌지 않는다.
- `placement.js` 문구: 이동 줄 두 가지와 `uncovered` 이유 네 가지.
- 모니터 카드 동일성 테스트(`card-parity`)는 바뀌지 않아야 한다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-ey6v — 선행 후보 병렬 배치, `queue-place.js`의 무판단, 수동 배치 비차단, 사람의 `[적용]`만 레인에 쓴다는 조항을 그대로 따른다
- 전제: ADR UI-u6ud-2 — dotfiles 세션 배치 절차의 변경은 dotfiles가 소유한다
- 대기·점유 항목끼리의 `blocks` 간선을 고정 관계로 투영한다 — 투영 함수 하나와 그 소비자만 고치면 되돌릴 수 있다(되돌리기 어려움 조건 실패) → ADR 아님
- 대기 항목 없는 Bead의 새 attempt가 lineage가 잡은 직렬 레인을 물려받는다 — 레인 해석 함수 하나로 되돌릴 수 있다(되돌리기 어려움 조건 실패) → ADR 아님
- 배치안은 후보와 부딪히는 대기 상대를 같은 직렬 레인으로 옮기고, 직렬 레인 없는 점유 상대는 빈 레인에 하나만 묶어, 한 묶음을 한 CAS로 적용하며, `uncovered`는 옮길 수 없는 상대에만 단다.
  - 조건 1(되돌리기 어려움): 함께 움직이는 것은 다음과 같다. 한쪽만 되돌리면 같은 쌍이 경로마다 다른 자리에 놓인다.
    - beads-ui: `app/utils/placement/compute.js` 분류·레인 선택, `app/utils/placement/apply.js` 묶음 전송, `app/views/worker/placement.js` 표·문구,
      `server/worker/queue-store.js`와 새 `place-bundle` WS·HTTP 조작
    - dotfiles: `execution-worker-lane.md` 세션 배치 절차
  - 조건 2(맥락 없이 의외): 한 후보의 배치가 이미 대기 중인 다른 이슈의 자리를 바꾸고, 실행 중인 이슈를 직렬 레인 점유자로 만든다.
  - 조건 3(실제 트레이드오프): 겹쳐 돌아 충돌 해소 세션을 쓰는 비용과, 상대가 줄에 묶여 늦게 시작하거나 후보가 상대 착지까지 기다리는 비용 사이의 선택이다.
  - UI-ey6v에서 바뀌는 조항: §3.4 「상대의 배치는 옮기지 않는다」와 승계된 `uncovered` 규칙(K는 고정 입력)이다. 선행 예외와 나머지 조항은 재진술한다.
  - `summary`: "배치안은 후보와 부딪히는 대기 상대를 같은 직렬 레인으로 옮기고 직렬 레인 없는 실행·PR 대기 상대는 빈 레인 점유로 묶어 한 묶음을 한 번에 적용하며 uncovered는 옮길 수 없는 상대에만 남긴다 — 선행 병렬 예외 등 나머지는 UI-ey6v 그대로다" → ADR, supersede UI-ey6v
