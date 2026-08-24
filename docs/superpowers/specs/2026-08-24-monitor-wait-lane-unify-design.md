---
scope:
  - app/views/monitor/
  - app/views/worker/lanes.js
  - app/styles.css
---

# 모니터 대기 레인 레포 통합 — 병렬 통합 큐 + 연결(blocks 체인) 직렬 레인

- Bead: `UI-e6hw` (route `spec_backed`, discovered-from `UI-thwe`)
- 선행 스펙: `2026-08-23-monitor-redesign-design.md`(UI-eey2) §6 대기 레인,
  `2026-08-19-monitor-serial-lanes-design.md`(UI-2gi1) §6.4·§6.5. 이 문서는 그
  두 스펙의 대기 레인 정의를 **대체**한다. 다른 레인(실행가능·실행중·PR 대기·
  완료)·데크·포커스 필터는 건드리지 않는다.
- 사용자 결정(2026-08-24): 대기 레인을 레포 섹션으로 나누지 않는다. 병렬 영역
  하나에 모든 레포의 병렬 큐를 합쳐 보이고, 직렬 영역에는 **연결 레인**(blocks
  의존 체인, 레포 무관, 파생 + 빈 레인 추가)과 **레포 직렬 레인**(Worker 탭
  소유 s1..s5)을 이름으로 구분해 함께 둔다. 연결 레인 드롭은 의존 + 자기 레포 큐
  적재, 이탈은 이어 붙이기(splice).

## 1. 문제

UI-eey2 대기 레인은 레포 섹션(`▾ beads-ui`, `▾ dotfiles`) 안에 병렬 pane +
직렬 sublane pane을 두었다. 사용자는 "레포가 처음부터 고정된" 구조가 불필요하다고
봤다 — 카드는 자기 레포를 이미 알고 있으므로 드롭할 때 레포를 고를 이유가 없고,
레포 간 순서(🔗 연결 체인 블록)는 읽기 전용 투영이라 드래그로 만들 수 없었으며,
🔗 검색 팝오버는 별도 UI였다.

## 2. 검증된 전제

- 서버 직렬 레인 `s1..s5`는 **workspace 큐 단위**다(`server/worker/queue-store.js`
  `Queue.serial_lanes`·`serial_lane_count`). 슬롯·자동 출발·CAS revision이 전부
  레포 단위라, 레포를 섞은 서버 직렬 레인은 존재하지 않는다.
- 레포 간 순서는 bd foreign `blocks` 엣지뿐이다(UI-2gi1 §2): `bd ready`는 선행이
  **closed**일 때까지 후속을 내지 않고, 후속이 자기 레포 큐에 있으면 선행 close
  후 다음 재판독에서 자동 출발한다. 닫힌 선행은 집계 투영에서 이미 제외된다
  (`server/worker/title-cache.js` `dep.status !== 'closed'`).
- `dep-add`/`dep-remove` op는 `{ a, b, root_dir }`를 받아 `a`가 `b`에 blocked되는
  엣지를 쓴다(`server/ws/mutation-handlers.js`, UI-2gi1 §6.6). `worker-queue-place`
  `{ bead_id, lane?, index, root_dir, expected_revision }`, `worker-queue-reorder`,
  `worker-queue-remove`는 현행 그대로다.
- 클라이언트는 `bead_blocked_by`(대기·직렬·실행·PR 대기 멤버)와
  `runnable[].blocked_by`로 살아 있는 의존 그래프를 이미 가진다
  (`app/views/monitor/lanes.js` `blocked_by_map` → `buildChains`).
- Worker `miniRow`는 선행/후속 의존 칩(`worker-dep--pred`/`--succ`)과 레포
  배지(`worker-mini__repo`, 값이 있을 때만)를 그린다.

## 3. 설계 원칙

- **서버 변경 없음.** 기존 op만 조합한다. 새 투영 필드도 없다.
- **보이는 순서 = 실제 순서.** 연결 레인은 의존 그래프에서만 파생된다. 순서가
  없는데 있는 것처럼 보이는 표시(레포 다른 s1끼리 겹쳐 그리기)는 하지 않는다.
- **레포는 좌표가 아니라 배지.** 드롭 대상은 영역/레인이고, 레포는 카드가
  들고 온다.
- **트랜잭션 없음, 낙관적 투영 없음.** 드롭 하나가 여러 op가 되면 정해진 순서로
  보내고 첫 실패에서 멈춘다. 다음 집계 스냅샷이 실제 상태를 그린다.

## 4. 화면 구조

```
─ 대기 ───────────────────────────────────────────────  n
▾ 병렬 영역                                            5
  #1 [beads-ui] UI-ww5s  resolver 충돌 해소…  🔒 ← dotfiles-3vb8
  #2 [beads-ui] UI-efkj  워커 API 오류…
  #1 [dotfiles] dotfiles-p22l  GitHub 전송…
▾ 직렬 영역                                  [+ 연결 레인]
  ┌ 연결 1 · 레포 간 ────────────────────────────────┐
  │ ① [dotfiles] dotfiles-3vb8            ● 실행중    │
  │ ② [beads-ui] beads-1nj                ← 3vb8      │
  │ ③ [beads-ui] UI-5arl                  ← 1nj       │
  └──────────────────────────────────────────────────┘
  ┌ beads-ui · 직렬 1 · Worker ↗ ────────────────────┐
  │ ① UI-onx9   점유                                   │
  └──────────────────────────────────────────────────┘
```

### 4.1 병렬 영역

- 모든 visible 레포의 병렬 큐 entry를 한 목록으로. 행 = Worker `miniRow`(순번 ·
  레포 배지 · ID · 제목 · 배지 · 의존 칩 · exec 핀 칩). 순번 `#n`은 **자기 레포
  큐 안의 순서**다(서버 `queue_index` 그대로).
- 정렬: 레포명 오름차순으로 같은 레포 행을 붙이고, 레포 안에서는 큐 순서.
  섹션 헤더는 없다 — 레포 배지가 경계를 말한다.
- **연결 레인에 들어 있는 항목은 숨긴다**(§4.2). 숨긴 수는 영역 카운트에 넣지
  않는다(카운트 = 보이는 행 수).
- 실행 중으로 빠진 항목은 UI-eey2와 같이 DOM에 없되 `data-lane-length`는 서버
  raw 길이를 유지한다(드롭 인덱스 산식 유지).
- 레포 자동/수동 상태는 섹션 헤더가 사라지므로 레포 배지 툴팁으로 옮긴다:
  `beads-ui · 자동화 켜짐` / `· 꺼짐`. 토글은 데크 타일(UI-eey2 §4.2)이 소유한다.

### 4.2 직렬 영역

두 종류 레인을 **이름**으로 구분한다. 영역 헤더 오른쪽에 `+ 연결 레인` 버튼.

#### 연결 레인 `연결 n · 레포 간`

- 원천 = `buildChains`가 만드는 체인(blocks 의존으로 이어진, 노드 2개 이상인
  연결 성분; 같은 레포 같은 직렬 레인 안에 전부 있는 성분 제외 — UI-2gi1 §6.4
  규칙 유지). 체인 하나 = 레인 하나. 번호 `n`은 체인 `key`(정렬된 노드 id
  결합) 오름차순으로 1부터 매긴 **표시 번호**다 — 체인이 생기고 사라지면 번호가
  바뀔 수 있고, 어디에도 저장하지 않는다.
- 행 = 위상 순서(선행 → 후속)의 세로 목록. 행 하나 = 순번 `①②③` · 레포 배지 ·
  ID · 제목 · `← <앞 이슈 id>` 의존 칩(그 행의 직접 선행 전부, `worker-dep--pred`
  재사용) · 위치 칩. 위치 칩은 큐에 없는 노드에만 그린다: `● 실행중` / `PR 대기`
  / `실행가능` / `미적재` / `외부`(`blockerLocationLabel`/`chainScopeLabel`
  현행). 병렬 큐에 있는 노드는 위치 칩 대신 `#n`(자기 레포 큐 순번)을, 레포
  직렬 레인에 있는 노드는 `s1 #n`을 보인다.
- 분기(한 선행에 후속 여럿)는 들여쓰기 한 단계(현행 `--indent`). 사이클은 행
  대신 `⛔ 의존 사이클 — 자동 교정 불가` 한 줄 + 정렬 없는 노드 목록(현행).
- 실행 중·PR 대기 노드는 자기 레인(실행중 타일·PR 카드)에도 그대로 있다 —
  연결 레인은 그 노드의 **위치를 보여 주는 투영**이고, 병렬 영역만 숨김 규칙을
  갖는다(§4.1).
- 행 클릭 = `openRow`(현행 체인 노드와 같음). 드래그 = §5.

#### 빈 연결 레인 (`+ 연결 레인`)

- 클릭하면 빈 레인 하나를 직렬 영역 맨 아래에 그린다. 상태는 **세션 메모리**
  (`pending_lanes: Array<{ seed: string|null }>`) — 새로고침 시 사라진다.
  localStorage에 쓰지 않는다: 빈 레인은 드롭 타깃일 뿐 사실이 아니다.
- 첫 드롭(§5.2)은 그 항목을 `seed`로 잡아 레인에 한 행으로 보이고(의존은 아직
  없음), 둘째 드롭에서 `seed ← X` 의존이 생기면 다음 스냅샷의 `buildChains`가
  체인을 만든다. 파생 체인 중 `seed`를 포함하는 것이 나타나는 순간 그 pending
  레인을 버린다(중복 방지). seed가 실행 중으로 빠지거나 집계에서 사라져도 레인은
  남되 seed 행은 `실행가능`/`미적재` 위치 칩으로 표시한다.
- `seed`가 없는 빈 레인은 하나만 허용한다(버튼은 빈 레인이 이미 있으면 비활성).

#### 레포 직렬 레인 `<레포> · 직렬 n · Worker ↗`

- 원천 = 각 레포 큐의 `serial_lanes[n]`(현행 `MonitorSerialSublane`). 비어 있지
  않은 레인만 pane으로 그리고, 빈 레인은 UI-eey2 §6과 같이 드래그 중에만 드롭
  타깃으로 펼친다(힌트 한 줄 `beads-ui 직렬 2 비어 있음`).
- 헤더 `Worker ↗`는 그 레포로 `switchWorkspace` 후 Worker 탭(데크 타일과 같은
  경로). 레인 수 조절(`worker-queue-set-serial-lane-count`)은 모니터에 두지
  않는다.
- 행·점유 ghost·`점유` 배지·사이클/상호 정지 경고는 현행 그대로.
- 드래그는 **같은 레포 안에서만**(현행 `dropTarget`의 root_dir 일치 규칙 유지):
  병렬↔직렬·직렬↔직렬 `worker-queue-place`, 레인 내 `worker-queue-reorder`.
  다른 레포 카드는 드롭 표시조차 뜨지 않는다.

### 4.3 제거

- 레포 섹션(`mon2-sec[data-section="queue"]`·`queueSection`·`sectionHeader`의
  queue 분기)·`🔗 연결 체인` 블록(`chainsBlock`·`mon2-chains*` CSS)·🔗 검색
  팝오버(`serialLinkControl`·`mon-link*` CSS·`buildSerialLinkCandidates`·
  `populateLinkCandidates`·`updateLinkSearch`·`placePopover`·`onScroll`)를 없앤다.
  실행가능 카드의 🔗도 함께 사라진다(`itemShell`의 `mon2-item__ops`). 다른 레포
  이슈를 검색해 의존을 거는 경로는 이슈 상세의 의존 편집이 남는다.
- `beads-ui.monitor.sections`의 queue 섹션 접힘 키와 `chains` 키는 읽지 않는다
  (남아 있어도 무시, fail-quiet). 실행가능 섹션 접힘은 그대로 쓴다.

## 5. 드래그 의미

드롭 대상은 네 종류다: `candidate`(실행가능 pane), `parallel`(병렬 영역),
`chain`(연결 레인 또는 pending 레인), `repo-serial`(레포 직렬 레인 `s1..s5`).
드래그 원천도 같은 네 종류 + 원천 레포·`queue_index`·revision을 든다(현행
`dragging` 확장).

### 5.1 순수 변환 함수

`app/views/monitor/drop-plan.js`(신규): `planDrop(drag, target, graph) →
{ ops: Op[] } | { refused: string }`. `Op`는 `{ type: 'dep-add'|'dep-remove', a, b,
root_dir }` 또는 `{ type: 'worker-queue-place'|'worker-queue-reorder'|
'worker-queue-remove', payload, root_dir }`. `graph`는 `blocked_by_map`
(살아 있는 직접 엣지)와 레인별 위상 순서다. 이 함수만 단위 테스트한다; 뷰는
결과를 순서대로 `send`한다.

### 5.2 표

| 원천 → 대상 | ops (순서대로) |
|---|---|
| candidate → parallel | `worker-queue-place { bead_id, index }` (자기 레포). `index` = 삽입 좌표 `k`(아래 정의) |
| parallel → parallel | `worker-queue-reorder` — 현행 `s > k ? k : k - 1` 산식, `k`는 아래 정의. 같은 레포 행이 하나도 없으면 no-op |
| candidate/parallel → chain (①과 ② 사이) | `dep-add X←①`; ②가 ①에 **직접** 의존하고 있었으면 `dep-remove ②←①` 후 `dep-add ②←X`; 원천이 candidate면 마지막에 `worker-queue-place { bead_id, index: raw_length }`(자기 레포 병렬 끝). 맨 위에 놓으면 ①만 후속(`dep-add ①←X`), 맨 아래면 마지막 행만 선행 |
| candidate/parallel → chain (pending, seed 없음) | seed = X (op 없음; 원천이 candidate면 `worker-queue-place` 끝 적재만) |
| candidate/parallel → chain (pending, seed 있음) | `dep-add X←seed` (+ candidate면 적재) |
| chain → parallel | **이어 붙이기**: 그 레인 안에서 X의 직접 선행 P들과 직접 후속 S들에 대해 `dep-remove X←P` 전부, `dep-remove S←X` 전부, 그리고 모든 (P, S) 쌍에 `dep-add S←P`(이미 있으면 생략). 큐 op 없음(이미 병렬 큐에 있음). X가 큐에 없는 노드(실행중·PR 대기·실행가능)면 이어 붙이기만 하고 큐 op는 없다 |
| chain → candidate | 이어 붙이기 + X가 자기 레포 큐에 있으면 `worker-queue-remove` |
| chain → chain (같은 레인 안 재배치) | 이어 붙이기 후 새 위치의 삽입 규칙(위 행) |
| chain → chain (다른 레인) | 이어 붙이기 후 대상 레인 삽입 규칙 |
| chain ↔ repo-serial, parallel ↔ repo-serial, repo-serial 내부 | 현행 같은 레포 규칙(`worker-queue-place`/`reorder`), 레포가 다르면 거부 |
| repo-serial → chain | 거부 — 한 항목이 레포 직렬과 연결 레인 두 곳의 순서를 가질 수 없다. 토스트 `Worker 탭 직렬 레인에서 먼저 빼 주세요` |
| 실행중·PR 대기·레포 직렬 레인·외부·미적재 노드를 chain 안에서 드래그 | 거부(병렬 큐에 없는 행은 `draggable=false`). 끌어내기(이어 붙이기)는 그 행의 `✕`(§6)로만 |

**삽입 좌표 `k`(병렬 영역, 레포가 섞인 목록)**: 드롭 마커 바로 아래 행(`over`)이
같은 레포면 `k = over.queue_index`(그 앞에 삽입). 아니면 마커 위쪽에서 가장
가까운 같은 레포 행 `above`가 있으면 `k = above.queue_index + 1`(그 뒤에 삽입);
위쪽에 없고 아래쪽에 있으면 그 첫 행의 `queue_index`; 같은 레포 행이 하나도
없으면 그 레포의 raw 길이(끝). 서버 좌표는 언제나 자기 레포 큐의 raw 인덱스다.

거부 사유는 `refused`로 돌려주고 뷰가 토스트로 보인다.

### 5.3 사이클 검사

`dep-add X←Y`를 만들기 전에 `graph`에서 Y가 X에 (전이적으로) blocked되어 있는지
확인하고, 그러면 드롭 전체를 거부한다(`의존 사이클이 생깁니다 — X가 이미 Y를
막고 있습니다`). 서버(bd)가 거부하면 그 메시지를 토스트로 보이고 남은 op는
보내지 않는다.

### 5.4 실행

뷰는 `ops`를 순서대로 `send(type, payload, root_dir)`(현행 `sendCas` 계열)로
보낸다. `worker-queue-*`는 원천 레포 revision으로 CAS 1회 재시도(현행). 하나라도
실패하면 멈추고 토스트; 스냅샷이 실제 상태를 그린다. 드래그 중에는 `is-dragging`
클래스(현행)로 빈 레인을 펼친다.

## 6. 모바일 (≤640px)

- 실행가능 카드 `[대기로 ↴]` 메뉴 항목: `병렬` · `연결 n 끝에`(체인마다) ·
  `새 연결 레인`(pending seed) · `<레포> 직렬 n`(자기 레포 것만). 각각 §5.2의
  candidate → 대상 규칙(끝 삽입).
- 연결 레인 행의 `✕` = 이어 붙이기(chain → parallel 규칙). 병렬 영역 행의 `✕` =
  `worker-queue-remove`(현행). `↑ ↓`는 병렬 영역에서 같은 레포 행 사이 재정렬,
  연결 레인에서는 없음.

## 7. 에러 처리

- 의존 op 실패(권한·bd 오류·사이클): 토스트에 서버 메시지, 후속 op 중단.
- 부분 실패 후 화면: 스냅샷이 실제 그래프/큐를 그리므로 "반쯤 옮겨진" 상태가
  그대로 보인다. 사용자가 다시 드래그하면 §5 규칙이 현재 상태에서 다시 계산된다.
- 집계에 없는 노드(외부 rig·미적재)를 선행으로 갖는 행은 현행처럼 `외부`/
  `미적재` 위치 칩으로 보이고, 그 노드는 드래그 원천이 될 수 없다.

## 8. 테스트 계획

- `lanes.test.js`: `parallel_rows`(전 레포 평면·레포 정렬·순번·연결 레인 멤버
  숨김), `chain_lanes`(번호·순번·직접 선행 목록·위치 칩·pending 레인 병합).
- `drop-plan.test.js`(신규): §5.2 표의 각 행, 사이클 거부, 다른 레포 거부,
  repo-serial → chain 거부, 이어 붙이기의 (P, S) 곱, 이미 있는 엣지 생략.
- `index.test.js`: 두 영역 렌더·레인 이름·`+ 연결 레인` 상태·드롭 → send 순서·
  첫 실패 중단·🔗 팝오버 부재·모바일 메뉴 항목.
- `styles.monitor-theme.test.js`: `.mon2-sec[data-section="queue"]`·
  `.mon2-chains`·`.mon-link` 규칙 부재, 새 영역/레인 클래스 존재.
- `main.monitor.e2e.test.js`: 실행가능 → 연결 레인 드롭이 `dep-add` + `place`를
  이 순서로 보내는 경로.

## 9. 비범위

- 서버 op·투영 변경, bd fork 변경.
- Worker 탭 변경(레포 직렬 레인 수·순서는 그대로 Worker 탭 소유).
- 연결 레인 번호의 영속화, 레인 이름 짓기.
- 실행가능 레인 안에서 다른 레포 이슈를 검색해 의존을 거는 UI(이슈 상세가 담당).

## 10. 구현 unit 후보 (advisory)

1. `lanes.js` 투영 + `drop-plan.js` 순수 함수 + 테스트 — 뷰 없이 닫힘.
2. `index.js` 렌더(두 영역·레인 pane·pending 레인·모바일 메뉴) + 제거(§4.3) +
   CSS + 렌더/e2e 테스트.
