---
scope:
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/cross-lanes-store.js
  - server/worker/attach.js
  - server/ws/monitor-handlers.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - app/views/monitor/drop-plan.js
  - app/views/monitor/lanes.js
  - app/views/monitor/index.js
  - app/protocol.md
---

# 모니터 연결 레인 — 진행 축·의존 자동 교정·삭제 provenance

- Bead: `UI-jaua` (route `spec_backed`)
- 작성일: 2026-08-26
- 선행: `2026-08-25-monitor-stored-cross-lanes-design.md`(UI-j92s) 저장형 레인
  멤버십·드래그 표·확정 절차, `2026-08-24-monitor-wait-lane-unify-design.md`
  (UI-e6hw) §4.2 연결 레인·§5 드래그 의미,
  `2026-08-25-card-header-grammar-unify-design.md` §5.1 슬롯 표.
- 사용자 결정(2026-08-26): §3.

## 1. 문제

연결 레인은 순서를 적는 곳에 머물러 있고, 지울 때는 적지 않은 것까지 지운다.

### 1.1 확정해도 굴러가지 않는다

`확정`은 인접 `dep-add`와 각 레포 병렬 큐 적재까지만 한다(UI-j92s §5.4). 실제
발차는 각 레포의 `auto_advance`가 소유하고, 스케줄러 `runPass`는 그 축이 OFF면
즉시 반환한다(`server/worker/scheduler.js:8152`). 따라서 확정한 사용자는 멤버가
속한 레포마다 Worker 자동 진행을 따로 켜야 하고, 그러면 그 레포의 **레인과 무관한
대기 이슈까지 함께 발차된다**.

머지 축은 한 겹 더 막혀 있다. 후행 멤버는 선행이 `closed`가 되어야 `bd ready`에
올라오고(UI-2gi1 §2 foreign 의존 계약), `closed`는 PR 머지 뒤에 온다. `auto_merge`가
OFF면 레인은 첫 멤버의 PR 대기에서 멈추고, 멤버 수만큼 수동 머지 클릭이 남는다.

### 1.2 순서와 의존이 어긋나도 아무도 고치지 않는다

레포 직렬 레인은 `blocks` 엣지로 순서를 topo 자동 교정한다
(`server/worker/queue-store.js:3236` `applyLaneBlocksOrder`). 연결 레인에는 그
경로가 없다. `entries` 순서가 곧 SoT이고, 확정이 그 순서대로 `dep-add`를 낸다
(`app/views/monitor/drop-plan.js` `linkAdjacent`).

그래서 이미 `blocks` 의존이 있는 두 이슈를 역순으로 담으면 자동 교정이 아니라
확정 전체가 거부된다 — `의존 사이클이 생깁니다 — A가 이미 B를 막고 있습니다`
(`drop-plan.js:345`). draft 드롭 시점에는 dep op가 없어 검사조차 돌지 않으므로,
순서가 틀렸다는 사실을 `확정` 버튼을 누를 때 처음 알게 된다.

### 1.3 삭제가 레인이 만들지 않은 의존을 지운다 (관측된 사고)

`planLaneRemove`는 confirmed 레인의 인접 쌍 **전부**에 `dep-remove`를 낸다
(`drop-plan.js:759`).

```js
for (let i = 1; i < lane.entries.length; i += 1) {
  planner.removeDep(lane.entries[i].bead_id, lane.entries[i - 1].bead_id);
}
```

`removeDep`는 그래프에 엣지가 있으면 지운다 — 누가 만들었는지 묻지 않는다.
`cross-lanes.json`의 `Entry`는 `bead_id`·`root_dir` 둘뿐이라(UI-j92s §4.1) 구별할
데이터 자체가 없다.

2026-08-26 실제로 일어났다. 확정 레인의 `✕`가 `UI-vb7u ← dotfiles-t735` foreign
의존을 지웠고, `bd show UI-vb7u --json`의 `dependencies`가 `null`이 되어 UI-vb7u가
`bd ready`에 재노출됐다. 레인 확정이 만들지 않은 의존이었다. `bd dep add`로
복구했다.

행 `✕`의 이어 붙이기도 같은 뿌리다. 레인은 "이 순서로 굴리자"는 뷰인데, 지울 때
실행 진실을 파괴한다.

### 1.4 위치 칩이 순서로 읽힌다

연결 레인 행의 위치 칩은 자기 레포 병렬 큐 순번을 `#n`으로 그린다
(`app/views/monitor/lanes.js` `chainRowLocationLabel`). 레인 순번 `①②` 바로 옆에
`#2`·`#1`이 서면 서로 다른 큐의 자리를 전역 실행 순서로 읽게 된다. 실제 관측된
오독이다.

## 2. 검증된 전제

- `runPass`의 후보는 병렬 큐 전 엔트리 + 미점유 직렬 레인 head이고, blocked·
  admission 거부 엔트리는 **스캔을 멈추지 않고 건너뛴다**(anti-starvation,
  `scheduler.js` `runPass` 주석). 후보를 좁혀도 이 성질은 유지된다.
- `QueueEntry`는 이미 선택 필드를 갖는다: `serial_lane_id`·`external`·`merge_sha`
  등(`queue-store.js:22`).
- 머지 축에는 **항목별 권한**이 이미 있다. `merge_queue` 엔트리의
  `authority.source === 'manual'`이면 전역 `auto_merge`가 OFF여도 그 항목은
  진행한다 — "글로벌 토글은 자동 **등록**만 소유한다"(`merge-queue.js:319-329`,
  UI-58w8 §1). 판정은 `manualContinuation()` 하나이고 소비처는
  `merge-queue.js:329,882`와 `queue-store.js:6623,7910`이다.
- 수동 등록 mutation `enqueueMergeManual`이 있고, authority 레코드는
  `{ id, source, granted_at, requested_head_sha, target_base }`다
  (`queue-store.js:6547,6654`).
- `orderLaneByBlocks`는 레인 순서와 `blocks` 엣지를 받아 안정 topo 순서와
  `cycle` 여부를 돌려주는 순수 함수다(`queue-store.js:3093`). 사이클이면 순서를
  바꾸지 않는다(`applyLaneBlocksOrder`, 3246).
- `load()`는 **재시작 시 `auto_advance`를 무조건 `false`로 강제한다**
  (`queue-store.js:15,3609`). 서버가 죽은 동안의 변화를 모르는 채 세션을 띄우지
  않기 위한 규약이다.
- 확정 레인의 고정 행(실행중·PR 대기·완료)은 드래그 불가이고 재배열은 마지막
  고정 행 뒤에서만 가능하다(UI-j92s §5.3).
- `addDep`는 이미 있는 엣지를 건너뛴다(`drop-plan.js` `addDep`) — 확정 시점에
  "이 쌍의 dep를 레인이 만들었는가"를 판별할 정보가 존재하며, 저장하지 않을 뿐이다.
- `cross-lanes.json`은 서버 전역(`$XDG_STATE_HOME/bdui/cross-lanes.json`)이고
  큐·스케줄러는 workspace 단위다(UI-j92s §4.1·§2).

## 3. 사용자 결정

1. `진행`은 `auto_advance`를 켜지 않는다. 레인 멤버만 발차하는 별도 축을 만든다.
2. `진행`은 **머지까지** 굴러간다. PR 대기에서 멈추지 않는다.
3. 자동 교정에서 **기존 `blocks` 의존이 사용자 드롭 순서를 이긴다**. 드롭 즉시
   교정한다.
4. 확정 레인도 교정하되 **마지막 고정 행 뒤 구간에서만** 한다.
5. 삭제는 **레인이 만든 의존만** 되돌린다.

## 4. 설계 원칙

- 전역 토글은 자동 등록만 소유하고, 항목별 권한이 그것을 이긴다. 발차 축은 머지
  축이 이미 쓰는 이 규약의 대칭이며, 새 정지·재개 의미를 만들지 않는다.
- 스케줄러는 workspace 큐만 읽는다. 전역 `cross-lanes.json`을 알지 못한다.
- 정렬 규칙은 하나다. 연결 레인 교정은 레포 직렬 레인과 같은 `orderLaneByBlocks`를
  쓴다.
- 되돌리는 것은 만든 것뿐이다. 만들지 않은 durable 상태는 어떤 삭제 경로도
  건드리지 않는다.
- 재시작은 사용자 의도가 아니라 상태 상실이다. 사용자가 켠 것은 재시작이 끈다.
- 재료가 없는 표시는 그리지 않고(fail-quiet), 위험은 드러낸다(fail-visible).

## 5. 범위 1 — 발차 축 (`arm`)

### 5.1 저장

`QueueEntry`에 선택 필드를 더한다.

```
armed_by_lane?: string | null   // 연결 레인 id (`cl_*`), 없으면 부재
```

병렬 큐 엔트리에만 쓴다. 직렬 레인 엔트리는 대상이 아니다 — 연결 레인 멤버는
확정 시 각 레포 **병렬** 큐에 적재되기 때문이다(UI-j92s §5.4).

`load()`는 `auto_advance`와 같은 이유로 모든 `armed_by_lane`을 해제한다(§4). 재시작
후 레인 헤더는 `⏸ 재시작으로 진행이 멈췄습니다`를 표시하고 `진행` 버튼을 다시
활성화한다.

### 5.2 스케줄러

`runPass`의 전체 차단을 후보 필터로 바꾼다.

```
현행:  if (!q.auto_advance) { return; }
변경:  const armed_only = q.auto_advance !== true;
       // armed_only일 때 후보에서 armed_by_lane 부재 엔트리를 제외한다.
       // 아무 후보도 남지 않으면 현행과 동일하게 즉시 반환한다.
```

- `auto_advance`가 ON이면 후보 집합은 현행과 **완전히 동일**하다(armed 여부를 보지
  않는다).
- `armed_only`에서 직렬 레인 head는 후보가 아니다. 직렬 레인은 `auto_advance`가
  소유하는 축이고, 연결 레인 멤버는 병렬 큐에 있다.
- 슬롯·점유(`occupiedBeadIds`)·skip-don't-stop·admission·`bd ready` 재판독은 전부
  현행 경로를 그대로 지난다. armed 엔트리도 blocked면 `not_ready:<status>` 배지를
  달고 건너뛰어진다 — 레인 순서를 강제하는 것은 여전히 bd 의존 그래프다.

### 5.3 op

`worker-queue-arm` / `worker-queue-disarm`을 `server/ws/worker-handlers.js`에 더하고
`server/ws/connection.js`에 등록한다. 기존 `worker-queue-*` op와 같은 workspace
결속(`workspaceKeyOf(ws)`)과 revision CAS를 쓴다.

| type | payload | 의미 |
|---|---|---|
| `worker-queue-arm` | `{ bead_ids: string[], lane_id, expected_revision }` | 그 workspace 병렬 큐에서 `bead_ids`에 해당하는 엔트리에 `armed_by_lane = lane_id`를 쓴다. 큐에 없는 id는 조용히 무시(fail-quiet) |
| `worker-queue-disarm` | `{ bead_ids?: string[], lane_id?, expected_revision }` | `bead_ids`가 있으면 그 엔트리만, `lane_id`만 있으면 그 workspace 안에서 그 레인에 armed된 모든 엔트리를 해제 |

`lane_id`의 실재는 **검증하지 않는다**. 이 핸들러는 workspace 결속이고
`cross-lanes.json`은 서버 전역이므로, 검증하면 workspace 핸들러가 전역 스토어에
의존하게 된다. 존재하지 않는 레인 id가 들어가면 §5.5의 파생이 그 레인을 찾지 못해
`진행 중` 표시가 뜨지 않을 뿐이고, 스케줄러는 `armed_by_lane`이 **비어 있지 않은지**만
보므로 발차 자체는 정상 동작한다 — 표시가 조용히 빠지는 쪽으로 수렴한다(fail-quiet).

성공 시 현행 `worker-queue-place`와 같이 그 workspace의 디스패치를 즉시 발화한다
(`tickWorkerQueue(key)`).

### 5.4 머지

새 권한 종류를 만들지 않는다. armed 멤버가 PR 대기에 도달하면 `enqueueMergeManual`
경로로 등록하고 authority는 `source: 'manual'`을 **그대로** 쓴다. 유래만
`authority.via = 'lane'`(선택 필드)로 남긴다.

근거: `manualContinuation()`의 소비처가 네 곳에 흩어져 있고(§2), 새 source를 넣으면
넷을 모두 고쳐야 하며 하나라도 빠지면 레인이 머지 직전에 조용히 멈춘다. `진행`은
실제 사람의 클릭이므로 `manual`이 의미상으로도 맞다.

등록 판정은 armed 여부 하나다. `auto_merge`가 ON인 레포에서 자동 등록이 이미 그
항목을 잡았다면, `enqueueMergeManual`의 현행 승격 분기가 기존 엔트리의
`authority.source`를 `manual`로 올리고 `promoteAttemptOrigins`를 부른다
(`queue-store.js:6642-6650`) — 중복 엔트리를 만들지 않는다. 이 스펙은 그 분기를
그대로 쓰며 새 중복 방지 규칙을 만들지 않는다.

머지 자격 판정 — fresh PR/base/head identity, clean mergeability, `impl_review`
ancestry 영수증, `repo-ops/config.toml [verify]` — 은 **하나도 우회하지 않는다**.

### 5.5 레인 상태와 조작

레인의 `진행 중` 여부는 저장하지 않고 파생한다: 그 레인 멤버 중 하나라도
`armed_by_lane === lane.id`인 큐 엔트리를 가지면 진행 중이다. 상태가 한 곳에만
있어야 두 표시가 어긋나지 않는다.

레인 헤더(UI-j92s §5.1 자리):

| 상태 | 헤더 오른쪽 |
|---|---|
| draft | `draft` 배지 · `확정` · `✕` (현행) |
| confirmed, 진행 전 | `확정` 배지 · **`▶ 진행`** · `재적용`(어긋남 시) · `✕` |
| confirmed, 진행 중 | `▶ 진행 중` 배지 · **`⏸ 정지`** · `✕` |
| 멤버 전원 완료 | `모두 완료` 배지 · `✕` (현행) |

- `▶ 진행` = 큐 어디에도 없는 멤버를 먼저 각자 레포 병렬 큐 끝에 `place`하고(§5.2
  `재적용`과 같은 index 규칙), 그다음 멤버 레포마다 `worker-queue-arm`을 보낸다.
  적재가 arm보다 앞서야 한다 — 큐에 없는 엔트리에는 쓸 자리가 없다. 같은 레포 op가
  여럿이면 각 성공 응답의 `revision`을 다음 op의 `expected_revision`으로 넘긴다
  (UI-j92s §5.5 현행 규약).
- `⏸ 정지` = 멤버 레포마다 `worker-queue-disarm`. **이미 실행 중인 세션은 끝까지
  간다** — `auto_advance` OFF의 현행 의미와 같다. 머지 큐에 이미 등록된 항목도
  그대로 진행한다(발급된 권한을 회수하지 않는 현행 계약).
- 실패 처리: armed 멤버의 세션이 실패하면 스케줄러는 **자기 workspace 안에서** 그
  엔트리의 `armed_by_lane`을 해제한다. 다른 레포 멤버의 arm은 건드리지 않는다 —
  스케줄러는 workspace 단위이고(§4), 레인을 가로질러 쓰려면 전역 스토어 의존이
  생긴다. 그래도 레인은 실제로 멈춘다: 후행 멤버는 실패 멤버가 `closed`되지 않는
  한 `bd ready`에서 빠지고, 선행 멤버는 이미 끝났다. 즉 **dep 게이트가 이미 정지
  장치**이며 arm 해제는 실패한 자리의 재발차만 막으면 된다.
  레인 헤더에는 `⛔ <bead> 실패로 진행이 멈췄습니다`를 표시한다(파생: 멤버 중
  terminal-failed attempt를 가진 것이 있고 그 멤버가 armed가 아닐 때). 배너 원문은
  기존 실패 배너가 소유하고 레인은 요약만 그린다. `auto_advance` 회로차단기
  (`queue-store.js:6406`)는 **건드리지 않는다** — armed 실패가 그 레포의 다른
  자동화를 끄면 안 된다.

### 5.6 표시

- 병렬 대기 행·실행중 타일에 `▶ 연결 n` 칩(그 엔트리가 armed일 때). 자리는
  `2026-08-25-card-header-grammar-unify-design.md` §5.1 슬롯 표의 "좌표·실행 사실"
  줄이다. 새 슬롯을 발명하지 않는다.
- `auto_advance` OFF인 레포의 Worker 탭 헤더에 armed 멤버가 있으면 `⏸ 자동 진행 꺼짐
  · 연결 레인 N건 진행 중` — 레포가 멈춰 보이는데 세션이 뜨는 이유를 화면이 말해야
  한다.

## 6. 범위 2 — 의존 자동 교정

### 6.1 교정 함수

`orderLaneByBlocks`를 그대로 쓴다. 연결 레인 전용 정렬을 새로 쓰지 않는다.

입력 엣지는 스냅샷 `bead_blocked_by`(열린 blocker만)에서 만든다. 레인 멤버가 여러
레포에 걸치므로 워크스페이스별 맵을 합쳐 하나의 그래프로 넘긴다. 멤버가 아닌
blocker는 그래프에서 제외한다 — 레인 안의 상대 순서만 판정한다.

### 6.2 적용 시점과 구간

| 레인 | 교정 구간 |
|---|---|
| draft | `entries` 전체 |
| confirmed | **마지막 고정 행 다음 위치부터 끝까지**. 고정 행과 그 앞은 불변 |

적용 시점: 드롭(`planDrop`) 성공 계획, `확정`, `재적용`, 그리고 `⛓` 패널의
`dep-add`가 같은 레인 멤버 쌍을 바꿨을 때(UI-2gi1 §6.5가 레포 직렬 레인에 이미 쓰는
재교정 트리거와 같은 성질).

교정은 레인 op(`monitor-lane-update`)의 `entries`에 반영되어 나간다 — 별도 op를
만들지 않는다.

### 6.3 결과 표시

- 교정이 실제로 순서를 바꾸면 레인 헤더에 `의존에 맞춰 N건 자동 교정` 배지. 사용자가
  놓은 자리와 다른 곳에 카드가 앉는 이유를 화면이 말한다. 배지는 다음 사용자 조작이나
  10초 뒤 사라진다.
- 사이클이면 순서를 바꾸지 않고 `⛔ 의존 사이클 — 자동 교정 불가`를 헤더에 남긴다
  (레포 직렬 레인과 같은 문구·같은 계약). `확정`은 현행대로 거부한다.
- 고정 행이 dep와 어긋나면(이미 실행된 뒤 dep가 바뀐 경우) 교정할 수 없으므로 해당
  행에 `⚠ 의존 순서와 다름`만 단다.

### 6.4 확정 시 dep 생성과의 관계

교정 뒤의 `entries` 순서로 인접 `dep-add`를 낸다. 이미 있는 엣지는 `addDep`가
건너뛰므로, 기존 의존과 일치하는 쌍에는 새 쓰기가 나가지 않는다. 교정이 성공한
레인에서는 §1.2의 사이클 거부가 원리적으로 발생하지 않는다.

## 7. 범위 3 — 삭제 provenance

### 7.1 저장

`cross-lanes.json`의 `Entry`에 선택 필드를 더한다.

```
dep_created_by_lane?: boolean   // 이 엔트리와 바로 앞 엔트리 사이의 blocks 엣지를
                                // 레인이 만들었는가. entries[0]에는 의미 없음
```

`확정`·`재적용`이 그 쌍에 **실제로 `dep-add`를 낸 경우에만** `true`를 쓴다.
`addDep`가 기존 엣지를 건너뛴 쌍은 `false`다. 즉 판별 정보는 이미 계획 단계에
존재하며, 이 스펙은 그것을 저장할 뿐이다.

인접 관계가 바뀌는 조작(재배열·삽입·제거)은 바뀐 자리의 `dep_created_by_lane`을
다시 계산한다: 새로 `dep-add`를 낸 자리는 `true`, 그 밖에는 `false`.

### 7.2 삭제 경로

레인 `✕`·행 `✕`·이어 붙이기·다른 대상으로 드래그 — 모든 `dep-remove` 발행 지점에서
`dep_created_by_lane === true`인 쌍만 대상으로 삼는다.

필드가 없는 기존 확정 레인은 `false`로 읽혀 **아무 의존도 지우지 않는다**.
마이그레이션 없이 안전한 쪽으로 수렴한다(UI-j92s §3.8 무마이그레이션 방침과 같은
성질).

### 7.3 확인 대화

현행 `의존 N개를 함께 제거합니다`를 실제 문장으로 바꾼다.

```
연결 3을 지웁니다.
함께 제거할 의존:
  UI-vb7u ← dotfiles-t735
그대로 두는 의존:
  UI-abcd ← UI-efgh (레인이 만들지 않음)
```

지울 의존이 없으면 `의존은 그대로 둡니다` 한 줄. draft 레인은 현행대로 확인 없이
즉시 삭제한다(만든 dep가 없다).

## 8. 범위 4 — 위치 칩

연결 레인 행의 위치 칩이 답하는 질문을 "어디 있나"에서 "지금 막혀 있나"로 바꾼다.

| 현행 | 변경 |
|---|---|
| `#2` / `s1 #3` | `🔒 대기` (blocked) |
| `#1` | `대기` (ready, 미발차) |
| `● 실행중` | `▶ 실행중` (유지) |
| `PR 대기` / `완료` | 유지 |
| `미적재` / `외부` / `위치 미확인` | 유지 |

레포별 큐 순번은 칩의 `title` 툴팁으로 내린다(`beads-ui 병렬 #1`). blocked 판정은
스냅샷 `bead_blocked_by`에 그 멤버의 항목이 있고 그 blocker가 열려 있는지로 하며,
재료가 없으면 순번 없는 `대기`로 수렴한다(fail-quiet).

## 9. 에러 처리

- `worker-queue-arm`이 일부 레포에서 실패하면 중단하고 토스트로 알린다. 성공한
  레포의 arm은 유지된다 — 다음 스냅샷에서 레인은 `진행 중`으로 그려지고, 발차되지
  않은 멤버는 `대기`로 남아 `▶ 진행` 재클릭이 복구 경로다. 트랜잭션은 없다.
- `enqueueMergeManual` 실패는 현행 머지 큐 실패 규약을 그대로 따른다. 레인은 그
  멤버의 PR 대기에서 멈추고 사용자가 수동 머지할 수 있다.
- 교정 입력(`bead_blocked_by`)이 없거나 부분적이면 교정을 건너뛴다 — 잘못된 그래프로
  순서를 바꾸지 않는다(fail-quiet).
- `cross-lanes.json`이 `unreadable`이면 현행대로 레인 op 전체가 비활성이고
  `진행`·`정지`도 비활성이다.
- 레인 op의 revision CAS 충돌은 현행 §5.5 재계획·1회 재시도 규약을 그대로 쓴다.

## 10. 테스트 계획

- `scheduler`: `auto_advance` ON에서 후보 집합이 현행과 동일 / OFF에서 armed 엔트리만
  후보 / OFF에서 armed가 없으면 즉시 반환 / armed blocked 엔트리가 스캔을 멈추지
  않음 / OFF에서 직렬 레인 head가 후보가 아님.
- `queue-store`: `arm`/`disarm` mutation과 CAS / `load()`가 `armed_by_lane`을 해제 /
  큐에 없는 bead_id fail-quiet.
- 머지 등록: armed 멤버가 PR 대기 도달 시 `authority.source === 'manual'`로 등록되고
  `auto_merge` OFF에서 `manualContinuation()`이 true / `auto_merge` ON에서 중복 등록
  없음.
- 실패 경로: armed 멤버 실패 시 **그 workspace의 그 엔트리만** disarm / 다른 레포
  멤버의 arm 불변 / `auto_advance` 불변(회로차단기 미발동) / 레인 헤더 `⛔` 파생.
- 교정 순수 함수: draft 전체 교정 / confirmed는 마지막 고정 행 뒤만 / 고정 행이 dep와
  어긋나도 움직이지 않음 / 사이클 시 순서 불변 + fail-visible / 엣지 부재 시 교정
  생략.
- provenance: 확정이 실제로 낸 쌍만 `true` / 기존 엣지 쌍은 `false` / 필드 없는 레인의
  삭제가 어떤 `dep-remove`도 내지 않음 / 재배열 후 재계산.
- 삭제 계획: 레인 `✕`·행 `✕`·이어 붙이기 각각에서 `true` 쌍만 `dep-remove`.
- 위치 칩 투영: blocked/ready/실행중 3분기와 `bead_blocked_by` 부재 fail-quiet.
- Pre-Handoff Validation 전체(`tsc`/`test`/`lint`/`prettier`/`build` + 번들 포함).

## 11. 비범위

- `auto_advance`/`auto_merge` 축의 의미 변경 없음. 새 자동화 축을 UI에 노출하지
  않는다 — `armed`는 레인이 소유하는 내부 상태다.
- 머지 자격 판정 변경 없음.
- 레포 직렬 레인(`s1..s5`)의 발차·정렬 계약 변경 없음.
- `bead_blocked_by` 생성 규칙 변경 없음.
- bd fork 변경 없음.
- 레포 간 공유 큐·공유 스케줄러 없음. 스케줄러는 workspace 단위를 유지한다.

## 구현 unit 후보

- `arm` 축: `server/worker/queue-store.js`, `server/worker/scheduler.js`,
  `server/ws/worker-handlers.js`, `server/ws/connection.js`
- 머지 등록: `server/worker/attach.js`, `server/worker/queue-store.js`
  (`enqueueMergeManual` 호출 경로)
- 교정·provenance·삭제: `app/views/monitor/drop-plan.js`,
  `server/worker/cross-lanes-store.js`, `server/ws/monitor-handlers.js`
- 표시: `app/views/monitor/lanes.js`, `app/views/monitor/index.js`,
  `app/protocol.md`
