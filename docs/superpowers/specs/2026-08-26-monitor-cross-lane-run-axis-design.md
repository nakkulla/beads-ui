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
6. 연결 레인 행의 위치 칩을 "지금 막혀 있나"를 답하도록 바꾼다(§8). 사용자가 `#2`·`#1`을
   전역 실행 순서로 오독한 것이 §1.4의 관측이며, 설계 제시에서 네 축과 함께 승인됐다.

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

쓰는 자리는 **병렬 큐 엔트리**다. 직렬 레인 엔트리는 대상이 아니다 — 연결 레인
멤버는 확정 시 각 레포 **병렬** 큐에 적재되기 때문이다(UI-j92s §5.4).

**전파 (§5.4가 의존한다).** 병렬 큐 엔트리는 PR 대기 전환에서 새 `pr_wait` 엔트리로
교체되므로, arm을 병렬 엔트리에만 두면 전환 직후 머지 등록 판정의 재료가 사라진다.
따라서 같은 값을 두 곳에 함께 싣는다.

- 디스패치 시점에 `Attempt`에 스냅샷한다: `armed_by_lane: string|null`. `base_oid`·
  `runner`·`model`이 그렇듯 그 attempt가 무엇으로 출발했는지의 기록이며, §5.5의 실패
  판정과 §5.4의 등록이 이것을 읽는다. attempt 스냅샷은 나중에 큐가 바뀌어도 변하지
  않는다.
- PR 대기 엔트리를 만들 때 그 attempt의 `armed_by_lane`을 엔트리에 옮겨 싣는다.
  `merge_sha`·`pr_url`·`head_ref`가 이미 그 레인에서 사는 것과 같은 자리다.

`disarm`은 병렬 엔트리의 필드만 지운다. attempt 스냅샷은 이력이므로 지우지 않는다.

**재시작 (§4).** `load()`는 `auto_advance`와 같은 이유로 모든 `armed_by_lane`을
해제한다 — 병렬 엔트리와 PR 대기 엔트리 양쪽에서. 해제만 하면 "재시작으로 멈춤"과
"한 번도 진행하지 않음"을 구별할 수 없으므로, 같은 `load()`가 해제한 lane id를 store
소유 transient 집합에 남긴다.

```
disarmed_on_load: string[]   // 프로세스 수명 동안만. 디스크에 쓰지 않는다
```

이 집합은 **workspace 스냅샷마다** 실린다 — store가 workspace 단위이므로 한 레인의
멤버가 여러 레포에 걸치면 그 lane id가 여러 스냅샷에 나타난다. 클라이언트는 보이는
workspace들의 집합을 합집합으로 읽는다: 한 레포에서라도 해제됐으면 그 레인은 재시작으로
멈춘 것이다.

스냅샷에 실어 레인 헤더가 `⏸ 재시작으로 진행이 멈췄습니다`를 그린다. 그 레인의
`▶ 진행`이 성공하면 그 workspace의 집합에서 제거하고, 모든 workspace에서 빠지면 표시가
사라진다. 디스크에 쓰지 않는 이유는 값이 재시작마다 그 자리에서 다시 계산되기 때문이다.

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

`lane_id`의 실재는 이 핸들러가 **검증하지 않는다**. workspace 핸들러가 서버 전역
`cross-lanes.json`에 의존하게 되기 때문이다. 대신 arm의 수명을 레인의 수명에 두 겹으로
묶는다.

**(1) 해제는 레인을 바꾸는 조작이 함께 낸다.** 레인에서 멤버가 빠지는 모든 경로가
그 멤버의 `worker-queue-disarm`을 계획에 포함한다 — 레인 `✕`, 행 `✕`, 다른 레인·다른
영역으로의 드래그. 전송 순서는 §7.2의 삭제 계획과 같은 블록에서 정한다. 이것이
"레인은 사라졌는데 항목은 계속 발차된다"를 막는 1차 방어다.

**(2) 남은 고아 arm은 숨기지 않고 드러낸다.** 조작이 실패하거나 레인이 다른 경로로
사라져 `armed_by_lane`이 존재하지 않는 레인을 가리키면, 그 병렬 대기 행에
`▶ 진행 중 · 레인 없음` 칩과 그 자리의 해제 버튼을 그린다(슬롯 4, §5.6). 스케줄러는
`armed_by_lane`이 비어 있지 않은지만 보므로 발차는 계속되며, **그 사실이 화면에
보이는 것**이 이 설계가 요구하는 안전이다. 조용히 발차하지도, 조용히 멈추지도
않는다(fail-visible).

레인 자체가 지워진 뒤 그 멤버를 찾는 일은 클라이언트 파생으로 충분하다: 스냅샷의
`cross_lanes.lanes`에 없는 `armed_by_lane` 값이 곧 고아다.

`arm` 성공은 현행 `worker-queue-place`와 같이 그 workspace의 디스패치를 즉시 발화한다
(`tickWorkerQueue(key)`). `disarm`은 발화하지 않는다 — 후보를 줄이는 조작이므로 다음
tick이 반영하면 된다.

### 5.4 머지

새 권한 종류를 만들지 않는다. armed 멤버가 PR 대기에 도달하면 `enqueueMergeManual`
경로로 등록하고 authority는 `source: 'manual'`을 **그대로** 쓴다. 유래만
`authority.via = 'lane'`(선택 필드)로 남긴다.

근거: `manualContinuation()`의 소비처가 네 곳에 흩어져 있고(§2), 새 source를 넣으면
넷을 모두 고쳐야 하며 하나라도 빠지면 레인이 머지 직전에 조용히 멈춘다. `진행`은
실제 사람의 클릭이므로 `manual`이 의미상으로도 맞다.

**소유자와 절차.** 등록을 소유하는 것은 PR 대기 진입을 이미 관측하는 경로
(`server/worker/auto-merge.js`의 후보 수집 패스)다. 새 driver를 만들지 않는다. 그
패스는 `auto_merge` 여부와 무관하게 armed 후보를 한 벌 더 본다:

1. 후보 판정 — `pr_wait` 엔트리의 `armed_by_lane`이 비어 있지 않고(§5.1 전파), 그
   bead가 아직 머지 큐에 `manual` 권한으로 있지 않다.
2. head/base 재판독 — 현행 패스가 이미 쓰는 `headSha(bead_id)`와 `baseRef(bead_id)`를
   그대로 쓴다. `headSha`가 읽히지 않으면 현행대로 **등록하지 않고 다음 관측을
   기다린다**(fail-closed, `auto-merge.js`의 첫 규칙).
3. 등록 — `enqueueMergeManual`에 그 head/base로 넘긴다. authority는
   `{ source: 'manual', via: 'lane', requested_head_sha, target_base }`.
4. 기동 — 등록 성공 시 현행 머지 큐 driver가 그대로 집어간다. 별도 기동 신호를
   만들지 않는다.
5. readback — 등록 결과는 다음 스냅샷의 `merge_queue`에 나타나고, 레인 행은 그것을
   `머지 대기`로 그린다. 등록이 실패했으면 행은 `PR 대기`에 머물고 사용자가 수동
   머지할 수 있다.

**중복 등록.** `auto_merge`가 ON인 레포에서 자동 등록이 이미 그 항목을 잡았다면,
`enqueueMergeManual`의 현행 승격 분기가 기존 엔트리의 `authority.source`를 `manual`로
올리고 `promoteAttemptOrigins`를 부른다(`queue-store.js:6642-6650`) — 중복 엔트리를
만들지 않는다. 이 스펙은 그 분기를 그대로 쓰며 새 중복 방지 규칙을 만들지 않는다.

**재시작 복구.** `load()`가 arm을 해제하므로(§5.1) 재시작 뒤에는 새 등록이 일어나지
않는다. 이미 머지 큐에 등록된 항목의 authority는 durable하므로 그대로 진행한다 —
발급된 권한을 회수하지 않는 현행 계약이다. 등록 전에 재시작했다면 그 레인은
`⏸ 재시작으로 진행이 멈췄습니다`를 달고 사용자의 `▶ 진행`을 기다린다. 즉 재시작은
**등록되지 않은 것만** 되돌린다.

머지 자격 판정 — fresh PR/base/head identity, clean mergeability, `impl_review`
ancestry 영수증, `repo-ops/config.toml [verify]` — 은 **하나도 우회하지 않는다**.

### 5.5 레인 상태와 조작

레인 상태는 저장하지 않고 파생한다. 상태가 한 곳에만 있어야 두 표시가 어긋나지
않는다. 판정은 **배타 우선순위**로 위에서 아래로 한 번만 한다.

| 우선순위 | 상태 | 판정 재료 |
|---|---|---|
| 1 | `⛔ 실패로 멈춤` | 멤버 중 terminal-failed attempt를 가진 것이 있고, 그 attempt의 `armed_by_lane`이 이 레인이다 |
| 2 | `⏸ 재시작으로 멈춤` | `disarmed_on_load`에 이 레인 id가 있다 (§5.1) |
| 3 | `▶ 진행 중` | 멤버 중 `armed_by_lane === lane.id`인 큐 엔트리가 하나라도 있다 |
| 4 | `모두 완료` / `확정` / `draft` | 현행 |

1번의 `armed_by_lane` 결속이 §5.1의 attempt 스냅샷을 쓰는 자리다. 이것 없이는 그
실패가 이 레인의 발차에서 왔는지 사용자가 직접 켠 `auto_advance`에서 왔는지 구별할 수
없고, 무관한 실패가 레인을 멈춘 것처럼 보인다.

레인 헤더(UI-j92s §5.1 자리):

| 상태 | 헤더 오른쪽 |
|---|---|
| draft | `draft` 배지 · `확정` · `✕` (현행) |
| confirmed, 진행 전 | `확정` 배지 · **`▶ 진행`** · `재적용`(어긋남 시) · `✕` |
| confirmed, 진행 중, 미발차 멤버 있음 | `▶ 진행 중` 배지 · **`▶ 이어서 진행`** · `⏸ 정지` · `✕` |
| confirmed, 진행 중, 전원 발차됨 | `▶ 진행 중` 배지 · `⏸ 정지` · `✕` |
| 실패로 멈춤 | `⛔ 실패` 배지 · **`▶ 다시 진행`** · `✕` |
| 재시작으로 멈춤 | `⏸ 재시작` 배지 · **`▶ 진행`** · `✕` |
| 멤버 전원 완료 | `모두 완료` 배지 · `✕` (현행) |

**미발차 멤버**는 완료·실행중·PR 대기·머지 대기 어디에도 없고 `armed_by_lane`도 없는
멤버다. 진행 재개 조작이 상태와 무관하게 **항상 자리에 있는 것**이 §9의 복구 경로가
성립하는 조건이다 — 부분 성공으로 레인이 `진행 중`이 되어도 남은 멤버를 올릴 버튼이
사라지지 않는다.

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

  남은 후행 arm은 상태를 모순시키지 않는다. §5.5 표의 배타 우선순위에서 실패(1)가
  진행 중(3)을 이기므로 레인은 `⛔ 실패`로 그려지고, 그 자리의 조작은
  `▶ 다시 진행`이다. 후행 멤버가 armed로 남아 있는 것은 오히려 정확하다 — 실패한
  선행이 다시 돌아 `closed`되면 후행은 사용자의 추가 조작 없이 이어서 출발한다.

  `auto_advance` 회로차단기(`queue-store.js:6406`)는 **건드리지 않는다** — armed
  실패가 그 레포의 다른 자동화를 끄면 안 된다. 배너 원문은 기존 실패 배너가 소유하고
  레인은 요약만 그린다.

### 5.6 표시

- 병렬 대기 행·실행중 타일에 `▶ 연결 n` 칩(그 엔트리가 armed일 때). 자리는
  `2026-08-25-card-header-grammar-unify-design.md` §5.1 슬롯 표의 **슬롯 4
  "의존·겹침"**이다 — 그 표가 `연결 레인 칩`을 이미 슬롯 4에 배정해 두었고, 이 칩이
  답하는 질문도 "지금 갈 수 있나"다. 슬롯 5(좌표·실행 사실)에는 직렬 레인 칩이 있고
  이 칩은 그것이 아니다. §5.3의 `▶ 진행 중 · 레인 없음` 칩도 같은 슬롯이다. 새 슬롯을
  발명하지 않는다.
- `auto_advance` OFF인 레포의 Worker 탭 헤더에 armed 멤버가 있으면 `⏸ 자동 진행 꺼짐
  · 연결 레인 N건 진행 중` — 레포가 멈춰 보이는데 세션이 뜨는 이유를 화면이 말해야
  한다.

## 6. 범위 2 — 의존 자동 교정

### 6.1 교정 함수

`orderLaneByBlocks`를 그대로 쓴다. 연결 레인 전용 정렬을 새로 쓰지 않는다.

입력 엣지의 원천은 **둘**이고, 멤버가 어느 레인에 있느냐에 따라 갈린다. 하나만
쓰면 기존 `blocks`를 놓치고 잘못된 순서를 그대로 저장한다.

| 멤버의 위치 | blocker 원천 |
|---|---|
| 대기(병렬·직렬)·실행중·PR 대기 | 워크스페이스 스냅샷 `bead_blocked_by` |
| 실행가능(미적재) | runnable projection의 `blocked_by` (UI-2gi1 §6.1) |

레인 멤버가 여러 레포에 걸치므로 워크스페이스별 자료를 합쳐 하나의 그래프로 넘긴다.
멤버가 아닌 blocker는 그래프에서 제외한다 — 레인 안의 상대 순서만 판정한다.

**완전성 판정과 보류.** `bead_blocked_by`는 partial cache다. 키 부재는 "의존 없음"이
아니라 "이 스냅샷에서 아직 모름"일 수 있고, 그 둘을 구별하지 못한 채 교정하면 실재하는
`blocks`를 무시한 순서를 durable하게 저장하게 된다. 따라서 교정은 **모든 멤버의 자료가
확정일 때만** 돈다.

한 멤버의 자료가 확정이라는 것은, 그 멤버가 위 표의 자기 원천에서 자기 항목을 갖는다는
뜻이다(항목이 빈 배열이면 "blocker 없음"으로 확정). 하나라도 원천에 항목이 없으면 교정
전체를 보류하고 레인 헤더에 `의존 자료 미확정 — 교정 보류`를 그린다. 다음 스냅샷이
자료를 채우면 그때 교정한다.

보류는 `확정` 버튼도 막는다 — 교정되지 않은 순서로 `dep-add`를 내면 §1.2의 사이클
거부로 되돌아간다. 보류 중에는 `확정`이 비활성이고 그 이유가 헤더에 있다(fail-visible).

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

`true`의 뜻은 "이 쌍의 `dep-add`가 **성공했다**"이지 "낼 계획이었다"가 아니다. 그런데
전송 순서는 레인 op가 `dep-add`보다 앞이고(UI-j92s §5.5), 레인 op를 보내는 시점에는
성공 여부를 모른다. 미리 `true`를 쓰면 실패한 의존을 소유했다고 기록하고, `false`를
쓰면 성공한 의존의 소유권을 잃는다. 그래서 **두 단계로 쓴다**.

1. 레인 op(`create`/`update`/`confirm`)에서 새로 생긴 인접 자리는 `false`로 저장한다.
   기존 자리의 값은 **보존한다** — 인접 상대가 그대로면 그 관계도 그대로다.
2. `dep-add`가 성공한 뒤, 성공한 쌍만 모아 `monitor-lane-provenance`
   `{ lane_id, pairs: Array<{ bead_id, value: true }>, expected_revision }`로 갱신한다
   (`pairs[].bead_id`는 쌍의 뒤쪽 멤버 = `entries[i+1]`). CAS 실패 시 최신 레인 위에서
   여전히 인접인 쌍만 남겨 1회 재시도하고, 실패하면 토스트 없이 넘어간다 — 값이
   `false`로 남는 쪽은 "지우지 않는다"는 안전한 방향이며 `재적용`이 복구 경로다.

**보존 규칙.** `재적용`은 변하지 않은 `true` 관계를 `false`로 덮지 않는다. 그 실행에서
`addDep`가 건너뛴 쌍(이미 엣지가 있음)은 값을 그대로 두고, 새로 성공한 쌍만 2단계에서
`true`로 올린다.

**정규화.** `entries[0]`의 `dep_created_by_lane`은 의미가 없으므로 스토어가 항상
부재로 정규화한다(UI-j92s §4.2 정규화와 같은 자리).

### 7.2 삭제 경로

레인 `✕`·행 `✕`·이어 붙이기·다른 대상으로 드래그 — 모든 `dep-remove` 발행 지점에서
`dep_created_by_lane === true`인 쌍만 대상으로 삼는다.

같은 계획이 **빠지는 멤버의 `worker-queue-disarm`도 함께 낸다**(§5.3 (1)). 전송
순서는 `dep-remove` → `disarm` → 레인 op다. `disarm`을 레인 op 앞에 두는 이유는
UI-j92s §5.5가 `dep-remove`를 앞에 두는 이유와 같다 — 레인이 사라진 뒤에는 어느
멤버가 그 레인 것이었는지 알 수 없다. `disarm`이 실패하면 그 항목은 §5.3 (2)의
`▶ 진행 중 · 레인 없음` 칩으로 드러나고 그 자리에서 해제할 수 있다.

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
  레포의 arm은 유지된다. 다음 스냅샷에서 레인은 `▶ 진행 중`으로 그려지지만, 미발차
  멤버가 남아 있으므로 §5.5 표에 따라 헤더에 `▶ 이어서 진행`이 서 있다 — 그 재클릭이
  복구 경로다. 트랜잭션은 없고, 진행 재개 조작이 사라지는 상태는 만들지 않는다.
- `enqueueMergeManual` 실패는 현행 머지 큐 실패 규약을 그대로 따른다. 레인은 그
  멤버의 PR 대기에서 멈추고 사용자가 수동 머지할 수 있다.
- 교정 입력이 한 멤버라도 미확정이면 §6.1대로 교정을 보류하고 그 사실을 헤더에
  드러낸다(fail-visible). 잘못된 그래프로 순서를 바꾸지 않으며, 보류를 조용히 넘기지도
  않는다 — 사용자가 "왜 안 고쳐지나"를 묻지 않아도 되어야 한다.
- `cross-lanes.json`이 `unreadable`이면 현행대로 레인 op 전체가 비활성이고
  `진행`·`정지`도 비활성이다.
- 레인 op의 revision CAS 충돌은 현행 §5.5 재계획·1회 재시도 규약을 그대로 쓴다.

## 10. 테스트 계획

- `scheduler`: `auto_advance` ON에서 후보 집합이 현행과 동일 / OFF에서 armed 엔트리만
  후보 / OFF에서 armed가 없으면 즉시 반환 / armed blocked 엔트리가 스캔을 멈추지
  않음 / OFF에서 직렬 레인 head가 후보가 아님.
- `queue-store`: `arm`/`disarm` mutation과 CAS / `load()`가 병렬·PR 대기 양쪽에서
  `armed_by_lane`을 해제하고 `disarmed_on_load`에 lane id를 남김 / 큐에 없는 bead_id
  fail-quiet / attempt 스냅샷과 PR 대기 엔트리로의 전파 / `disarm`이 attempt 스냅샷을
  지우지 않음.
- 머지 등록: armed 멤버가 PR 대기 도달 시 `authority.source === 'manual'`·`via: 'lane'`
  으로 등록되고 `auto_merge` OFF에서 `manualContinuation()`이 true / `auto_merge` ON에서
  중복 엔트리 없이 승격 / `headSha` 미판독 시 등록하지 않고 다음 관측 대기 / 재시작 후
  등록된 항목은 계속 진행하고 미등록 항목은 진행하지 않음.
- 실패 경로: armed 멤버 실패 시 **그 workspace의 그 엔트리만** disarm / 다른 레포
  멤버의 arm 불변 / `auto_advance` 불변(회로차단기 미발동) / 실패 attempt의
  `armed_by_lane`이 이 레인일 때만 `⛔` 파생 / 무관한 레포 실패는 레인 상태 불변.
- 레인 상태 파생: 배타 우선순위 4단계 / 부분 성공에서 `▶ 이어서 진행`이 남음 /
  고아 arm(`cross_lanes`에 없는 lane id)이 `▶ 진행 중 · 레인 없음`으로 드러남.
- 교정 순수 함수: draft 전체 교정 / confirmed는 마지막 고정 행 뒤만 / 고정 행이 dep와
  어긋나도 움직이지 않음 / 사이클 시 순서 불변 + fail-visible.
- 교정 입력 완전성: 실행가능 멤버의 blocker를 runnable `blocked_by`에서 읽음 / 한
  멤버라도 자기 원천에 항목이 없으면 교정 보류 + `확정` 비활성 / 빈 배열은 확정으로
  취급 / 자료가 채워진 다음 스냅샷에서 교정이 돎.
- provenance: 레인 op는 새 인접 자리를 `false`로 저장하고 기존 값을 보존 /
  `dep-add` 성공 후 `monitor-lane-provenance`가 그 쌍만 `true`로 갱신 / `dep-add`
  실패 쌍은 `false`로 남음 / `재적용`이 변하지 않은 `true`를 덮지 않음 / `entries[0]`
  정규화 / 필드 없는 레인의 삭제가 어떤 `dep-remove`도 내지 않음.
- 삭제 계획: 레인 `✕`·행 `✕`·이어 붙이기 각각에서 `true` 쌍만 `dep-remove` / 같은
  계획이 빠지는 멤버의 `disarm`을 `dep-remove` → `disarm` → 레인 op 순서로 냄.
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
