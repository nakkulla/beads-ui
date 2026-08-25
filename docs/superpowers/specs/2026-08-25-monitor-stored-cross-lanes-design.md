---
scope:
  - server/worker/state-paths.js
  - server/worker/cross-lanes-store.js
  - server/ws/monitor-handlers.js
  - server/ws/connection.js
  - app/views/monitor/lanes.js
  - app/views/monitor/drop-plan.js
  - app/views/monitor/index.js
  - app/views/worker/lanes.js
  - app/styles.css
  - app/protocol.md
---

# 모니터 연결 레인 — 자동 파생에서 저장형 레인 멤버십으로

- Bead: `UI-j92s` (route `spec_backed`)
- 선행: `2026-08-24-monitor-wait-lane-unify-design.md`(UI-e6hw) §4.2 연결 레인·§5
  드래그 의미, `2026-08-23-monitor-redesign-design.md`(UI-eey2) §6.4 체인,
  `2026-08-24-monitor-scope-overlap-chips-design.md`(UI-qm12) 겹침 칩.
- 사용자 결정(2026-08-25): 아래 §3.

## 1. 문제

직렬 영역의 `연결 n · 레포 간` 레인은 bd `blocks` 성분에서 자동 파생된다
(`app/views/monitor/lanes.js buildChains`). 그 결과:

- 대기에 적재되지 않은 이슈까지 레인에 떠 있어 "대기 중"으로 오독된다.
- 같은 레포 성분도 "레포 간"으로 표시된다(라벨이 거짓).
- 행마다 route·위치·겹침 칩이 겹쳐 3~4줄이 되어 가독성이 나쁘다.
- 사용자가 만든 레인(`+ 연결 레인`)은 세션 메모리라 새로고침에 사라지고, 두
  번째 드롭 뒤에는 파생 체인에 흡수되어 "내가 만든 레인"이라는 정체가 없다.

## 2. 검증된 전제

- 서버 전역(워크스페이스 밖) 상태 파일 선례: `server/worker/state-paths.js`의
  `visibleWorkspacesFilePath()`·`execPresetsFilePath()`·
  `parallelAnalysisSettingsPath()` → `$XDG_STATE_HOME/bdui/*.json`.
- 워크스페이스 큐 스토어(`server/worker/queue-store.js`)는 프로세스 캐시 +
  tmp→rename 원자 쓰기 + `revision` CAS(`applyMutation`)다.
- 모니터 채널 op는 `server/ws/connection.js`에 type별로 등록되며 성공 시
  `schedulePush()`(250ms 디바운스)로 스냅샷을 다시 민다.
- 클라이언트 op 전송: `worker-queue-*`는 `sendCas`(revision CAS, 1회 재시도),
  `dep-add`/`dep-remove`는 `send`. 서버 `handleDepAdd`는 `bd dep add a b`를
  `root_dir`에서 실행하고 `recalibrateSerialLaneAfterDepAdd`를 호출한다.
- `app/views/monitor/drop-plan.js planDrop`은 임시 그래프 위에서 이어 붙이기·
  삽입 규칙·사이클 검사를 수행하고 `netDepOps`로 왕복 op를 상쇄한다(UI-e6hw
  §5). 대상 `chain`의 삽입 규칙과 원천 `chain`의 이어 붙이기는 그대로 재사용한다.
- 배치 메뉴(`대기로 ↴`)는 `app/views/worker/lanes.js candidateCard`가 그리며
  Worker 탭과 모니터가 공유한다(`worker-card__place-menu`, 가로 스크롤 알약).
- 스냅샷 `bead_blocked_by`는 열린 blocker만 싣는다(`app/protocol.md`). 이 맵은
  🔒 칩·drop-plan 임시 그래프·Worker 탭이 소비하며 이 스펙은 생성 규칙을 바꾸지
  않는다.
- 실행가능 필터는 `MONITOR_CANDIDATE_FILTER_KEY`로 localStorage에 보존된다.

## 3. 사용자 결정

1. 자동 파생을 없앤다. 연결 레인은 **서버에 저장된 레인 멤버십**만 그린다.
   bd `blocks` 의존은 실행 진실로 유지한다.
2. 레인은 `draft`로 시작한다. draft는 순서 편집만 하고 dep·큐를 만들지 않는다.
   `확정` 버튼이 인접 `dep-add` + 각 레포 **병렬 큐 끝** 적재를 한 번에 낸다.
3. 확정 레인 편집은 **즉시 반영**한다. 실행중·PR 대기·완료 멤버는 **고정 행**
   이다(드래그 불가, 그 앞에 삽입 거부).
4. 실행가능 카드 위 카드 드롭은 하지 않는다. 의존 편집은 **의존성 버튼 →
   인라인 패널**(방향 세그먼트 + 검색 목록)로 한다.
5. 버튼 위치: 실행가능 카드 + 대기(병렬·레포 직렬) 행.
6. 후속은 **개별 칩**(`→ 후속 <id>`, 다른 레포면 배지)으로 그린다.
7. 배치 메뉴는 **세로 그룹 목록**으로 바꾼다.
8. 기존 파생 체인의 마이그레이션은 하지 않는다. `의존 있음` 필터를 넣는다.
9. 구조: 서버 전역 파일 + 모니터 채널 op, dep·큐 op는 클라이언트가 현행 경로로
   이어서 보낸다(§4 A안).

## 4. 데이터 모델과 서버

### 4.1 저장 파일

`crossLanesFilePath()` → `$XDG_STATE_HOME/bdui/cross-lanes.json`
(`server/worker/state-paths.js`에 추가).

```json
{
  "revision": 7,
  "lanes": [
    {
      "id": "cl_<ulid>",
      "status": "draft",
      "created_at": "2026-08-25T00:00:00.000Z",
      "entries": [
        { "bead_id": "UI-vb7u", "root_dir": "/abs/beads-ui" },
        { "bead_id": "dotfiles-t735", "root_dir": "/abs/dotfiles" }
      ]
    }
  ]
}
```

- `status ∈ {draft, confirmed}`. `entries` 순서가 레인 순서다. 저장 레인은
  항상 선형 목록이다(분기·들여쓰기 없음).
- 같은 `bead_id`는 전체 파일에서 레인 하나에만 속한다. 위반 쓰기는 서버가
  `conflict_membership` 오류(`이미 연결 N에 있습니다`, N은 현재 배열 순번)로
  거부한다.
- 표시 번호 `연결 n`은 `lanes` 배열 순서에서 1부터 매기며 저장하지 않는다.
- `id`는 서버가 발급하며 불변이다.

### 4.2 스토어 `server/worker/cross-lanes-store.js`

`createCrossLanesStore({ filePath?, fs? })` → `{ read(), mutate(expected_revision,
mutator) }`.

- 로드: 프로세스당 1회, `JSON.parse` 후 정규화. 파일 없음 → `{revision:0,
  lanes:[]}`. 파싱 실패·형식 위반 → `unreadable` 상태를 기억하고 `read()`가
  `null`을 돌려준다; `mutate`는 `state_unreadable`로 거부한다. **빈 상태로
  덮어쓰지 않는다** — 사용자 레인을 지우지 않기 위해서다.
- 쓰기: `mkdir -p` → `<file>.tmp` 기록 → `rename`. `expected_revision !==
  revision`이면 `conflict`(현재 revision 동봉). 성공 시 `revision += 1`.
- 정규화: `entries[]`는 `bead_id`·`root_dir` 둘 다 비어 있지 않은 문자열인
  항목만 남긴다. 중복 `bead_id`는 첫 것만 남긴다.

### 4.3 모니터 채널 op

`server/ws/monitor-handlers.js`에 핸들러 4개, `server/ws/connection.js`에 등록.
모든 op는 `expected_revision`(정수)을 받고 성공 응답에 `{ revision }`을 담는다.

| type | payload | 의미 |
|---|---|---|
| `monitor-lane-create` | `{ entries?: Entry[], expected_revision }` | 빈 draft 또는 seed가 든 draft를 배열 끝에 추가. 응답 `{ lane_id, revision }`. `entries`가 비어 있고 이미 빈 draft가 있으면 `conflict_empty_lane` 거부 |
| `monitor-lane-update` | `{ lane_id, entries: Entry[], expected_revision }` | 멤버·순서 전체 교체. 고정 행 규칙(§5.3)은 클라이언트 규칙이며 서버는 형식·소속 유일성만 검증한다 |
| `monitor-lane-confirm` | `{ lane_id, expected_revision }` | `status=confirmed`로 전환만. `entries.length < 2`면 `bad_request`. dep·큐 op는 클라이언트가 이어서 보낸다 |
| `monitor-lane-remove` | `{ lane_id, expected_revision }` | 레인 삭제. dep 제거는 클라이언트가 이어서 보낸다 |

- `Entry.root_dir`는 등록된 워크스페이스여야 한다(숨김 여부는 보지 않는다 —
  숨긴 레포 멤버는 `외부` 칩으로 남는다). 닫힌·존재하지 않는 bead도 저장을
  막지 않는다: 재배포 직후 캐시 콜드 구간에서 서버가 오판해 레인을 훼손하지
  않기 위해서다.
- 성공 시 `schedulePush()`.
- 오류 코드: `bad_request`, `not_found`(lane_id), `conflict`(revision),
  `conflict_membership`, `conflict_empty_lane`, `state_unreadable`.

### 4.4 스냅샷

`monitor-pipeline-snapshot`에 최상위 키 추가:

```
cross_lanes: { revision: number, lanes: Lane[] } | null   // null = 저장소 읽기 실패
```

`bead_blocked_by`는 그대로 싣는다. `app/protocol.md` "Monitor pipeline channel"
절에 위 필드와 op 4개를 기록한다.

### 4.5 제거

- 클라이언트 `buildChains`, `MonitorChain`, 파생 체인 → 연결 레인 경로,
  `pending_lanes` 세션 메모리와 그 흡수 규칙(UI-e6hw §4.2 빈 연결 레인 절은
  이 스펙으로 대체된다).
- 서버 `pruneClosedForeignBlockers`와 UI-fz4f 로직은 유지한다(🔒 칩이 쓴다).

## 5. 연결 레인 UI와 드래그 의미

### 5.1 레인 pane

헤더 `연결 n · 레포 간` 오른쪽:

- draft: `draft` 배지 · `확정` 버튼(멤버 2개 이상일 때만 활성) · `✕`(즉시 삭제,
  확인 없음 — dep가 없으니 되돌릴 게 없다).
- confirmed: `확정` 배지 · `✕`. 삭제는 확인 1회(`의존 N개를 함께 제거합니다`)
  뒤 `monitor-lane-remove` → 인접 쌍마다 `dep-remove entries[i+1] ← entries[i]`
  (현재 `bead_blocked_by`에 있는 것만).
- 멤버 전원이 완료면 `모두 완료` 배지. 자동 삭제는 하지 않는다(재배포 직후
  상태 미확정 구간의 오삭제 방지).
- `재적용` 버튼: §5.2 어긋남이 하나라도 있을 때만 보인다.

`+ 연결 레인`(영역 헤더)은 `monitor-lane-create { entries: [] }`. 빈 draft가
이미 있으면 버튼 비활성.

### 5.2 행

순번 `①②③` · 레포 배지 · ID · 제목 한 줄 · 위치 칩 · 행 `✕`.

- 위치 칩은 현행 규칙: `● 실행중` / `PR 대기` / `완료` / `실행가능` / `미적재` /
  `외부` / 병렬 큐 `#n` / 직렬 `s1 #n`(`chainRowLocationLabel` 재사용).
- route 칩·겹침 칩·`← 선행` 칩은 연결 레인 행에 그리지 않는다. 레인 순서가 곧
  의존이다.
- 어긋남 칩(confirmed만): 인접 쌍 `(i, i+1)`에서 `bead_blocked_by[entries[i+1]]`
  에 `entries[i]`가 없으면 `i+1` 행에 `⚠ 의존 없음`. 큐·실행중·PR 대기·완료
  어디에도 없는 멤버는 위치 칩 `미적재`가 어긋남을 겸한다.
- `재적용` = 빠진 인접 dep `dep-add` + `미적재` 멤버를 각자 레포 병렬 큐 끝에
  `worker-queue-place`. 순서는 dep 먼저.
- 행 클릭 = `openRow`(현행).

### 5.2a 다른 영역과의 관계

- confirmed 레인 멤버가 병렬 큐에 있으면 병렬 영역에서 숨긴다(UI-e6hw §4.1 현행
  숨김 규칙을 저장 레인 기준으로 적용). 실행중·PR 대기 타일은 그대로 둔다.
- draft 레인 멤버는 대기가 아니므로 **어디에서도 숨기지 않는다**. 그 이슈의
  실행가능 카드·대기 행에 `연결 n (draft)` 칩을 달아 소속을 알린다. 칩 클릭 =
  그 레인으로 스크롤.
- confirmed 레인 멤버 중 실행가능·미적재 상태인 것(어긋남)도 같은 방식으로
  `연결 n` 칩을 달고 숨기지 않는다.

### 5.3 고정 행

위치가 실행중·PR 대기·완료인 멤버는 고정 행이다.

- `draggable=false`. 드롭 마커가 고정 행 앞(또는 고정 행 사이)에 놓이면 계획
  전체 거부: `이미 진행 중인 이슈 앞에는 넣을 수 없습니다`.
- 레인의 실제 순서가 "고정 행이 편집 가능 행 뒤"인 경우(외부에서 dep가 바뀐
  경우)는 그대로 그리고 어긋남 칩으로만 알린다. 재배열은 마지막 고정 행 뒤에서만
  가능하다.
- 고정 행 `✕`는 허용한다: 현행 이어 붙이기로 후속의 dep를 풀고 앞 행에 다시
  잇는다. 확인 없이 즉시, 토스트로 결과를 알린다.

### 5.4 드래그 표

`planDrop`의 대상 `chain`은 저장 레인(`lane_id = cl_*`)을 가리킨다. 원천 4종
(`candidate`·`parallel`·`chain`·`repo-serial`)과 다른 대상의 의미는 UI-e6hw §5.2를
유지한다. `DropModel`에 `cross_lanes`(id → `{status, entries}`)와 `owner_lane_of`
(bead_id → lane_id)를 더한다. 계획 결과는 `{ lane_ops: LaneOp[], ops: Op[] }`이며
`LaneOp`는 §4.3 op 하나다.

| 상황 | 레인 op | dep/큐 op |
|---|---|---|
| draft 레인에 드롭(원천 무관) | `update` (마커 위치에 삽입) | 없음. candidate 원천도 적재하지 않는다 |
| draft 안 재배열 / 행 `✕` | `update` | 없음 |
| `확정` | `confirm` | 인접 쌍마다 `dep-add entries[i+1] ← entries[i]`(이미 있으면 생략; 임시 그래프 사이클 검사, 사이클이면 전체 거부하고 `confirm`도 보내지 않음) → 큐·실행중·PR 대기·완료 어디에도 없는 멤버를 각자 레포 병렬 큐 끝에 `place` |
| confirmed 레인에 드롭 | `update` | 원천 `chain`이면 먼저 이어 붙이기 → 현행 삽입 규칙(`up`/`down`) → candidate 원천이면 자기 레포 병렬 끝 `place` |
| confirmed 안 재배열 | `update` | 이어 붙이기 → 삽입 규칙(현행; 같은 자리면 op 없음) |
| confirmed 행 `✕` / 다른 대상으로 드래그 | `update`(제거) | 이어 붙이기 → 대상별 큐 op는 현행 표(candidate 대상 `remove`, parallel 대상 없음, repo-serial 대상 `place`) |
| `repo-serial` 원천 → 어느 레인 | 거부 `Worker 탭 직렬 레인에서 먼저 빼 주세요`(현행) | — |
| 다른 레인에 이미 속한 bead 드롭 | 거부 `이미 연결 N에 있습니다` | — |
| 고정 행 앞 삽입 | 거부(§5.3) | — |

배치 메뉴의 `연결 n 끝에`는 그 레인 맨 아래 드롭과 같고, `+ 새 연결 레인`은
`create { entries: [seed] }`(draft, dep·큐 없음)다.

### 5.5 전송 순서와 실패

뷰는 **레인 op → dep op → 큐 op** 순서로 보낸다.

- 레인 op는 `cross_lanes.revision`으로 CAS, `conflict`면 최신 revision으로 1회
  재시도(현행 `sendCas` 방식). 재시도도 실패하면 토스트 `레인이 다른 곳에서
  바뀌었습니다`, 이후 op는 보내지 않는다.
- 레인 op 성공 뒤 dep·큐 op가 실패하면 중단·토스트(현행 §5.4). 그 결과는 다음
  스냅샷에서 어긋남 칩으로 드러나고 `재적용`이 복구 경로다. 트랜잭션은 없다.

## 6. 의존성 패널·칩·필터·배치 메뉴

### 6.1 의존성 버튼과 패널

버튼 `⛓`(툴팁 `의존성`)은 실행가능 카드·병렬 대기 행·레포 직렬 행의 조작 버튼
묶음 안에 둔다. 실행중·PR 대기·완료·연결 레인 행에는 두지 않는다. 클릭하면 그 행
아래에 인라인 패널이 열린다(한 번에 하나; 다른 행을 열면 이전 것은 닫힌다;
`Esc`·바깥 클릭으로 닫힌다).

패널 구조:

1. 현재 의존 줄: `🔒 선행 <id>` 칩들(`bead_blocked_by[id]`)과 `→ 후속 <id>`
   칩들(역방향 맵). 각 칩 `✕` → `dep-remove`. 열린 이슈만 그린다.
2. 방향 세그먼트: `← 앞에 (선행 추가)` / `→ 뒤에 (후속 추가)`. 기본 `← 앞에`.
3. 검색창(ID·제목 부분 일치, 대소문자 무시) + 후보 목록(레포 배지 · ID · 제목).
4. 항목 클릭 = `dep-add` 1건. 선행 추가: `dep-add <this> ← <cand>`(root_dir =
   this의 레포). 후속 추가: `dep-add <cand> ← <this>`(root_dir = cand의 레포).
   패널은 열린 채 유지되고 다음 스냅샷이 1번 줄을 갱신한다.

후보 규칙(`app/views/monitor/dep-candidates.js`, 순수 함수 `depCandidates(this_id,
direction, model)`):

- 모집단 = 스냅샷의 실행가능·대기(병렬·직렬)·실행중·PR 대기 이슈 전체, 보이는
  모든 레포. 완료 이슈는 제외.
- 자기 자신과 이미 그 방향으로 연결된 이슈 제외.
- `← 앞에`: 실행중·PR 대기 후보 허용(선행이 진행 중인 것은 정상).
- `→ 뒤에`: 실행중·PR 대기 후보 제외(진행 중 이슈에 선행을 붙이는 모순 방지).
- 임시 그래프에서 사이클이 생기는 후보는 `disabled: true` + 사유 `사이클`(회색,
  클릭 불가).
- 결과 정렬: 같은 레포 먼저, 그 다음 ID 오름차순.

### 6.2 칩

실행가능 카드와 대기 행(병렬·직렬):

- `🔒 선행 <id>` 현행 유지.
- `→ 후속 <id>` 개별 칩 추가(`bead_blocked_by` 역방향 맵, 열린 이슈만). 상대가
  다른 레포면 칩 안에 레포 배지.
- 칩 클릭 = 그 행의 의존성 패널 열기.
- 연결 레인 행에는 두 칩 모두 그리지 않는다.

### 6.3 `의존 있음` 필터

실행가능 필터(`MONITOR_CANDIDATE_FILTER_KEY`)에 토글 `의존 있음`: 열린 선행 또는
열린 후속이 1개 이상인 카드만. 다른 필터와 AND, localStorage 보존.

### 6.4 배치 메뉴 재구성

`app/views/worker/lanes.js candidateCard`의 `worker-card__place-menu`를 세로 그룹
목록으로 바꾼다(Worker 탭·모니터 공통):

```
병렬                          3
연결 레인
  연결 1 (확정) 끝에           3
  연결 3 (draft) 끝에          1
  + 새 연결 레인
beads-ui 직렬
  직렬 1                       2
  직렬 2                       0
```

- 그룹 헤더는 섹션 제목 톤, 항목은 라벨 왼쪽·건수 오른쪽, 한 줄에 하나.
- 연결 레인 그룹은 모니터에서만 그린다(Worker 탭은 그룹 자체가 없다).
- `placeMenuFor`의 choice id는 `lane:<lane_id>`(배열 인덱스가 아닌 서버 id)로
  바꾼다.
- 모바일(≤640px)에서도 같은 세로 목록.

### 6.5 모바일

의존성 패널은 카드 폭 전체, 후보 목록 최대 높이 40vh 스크롤. 드래그가 어려운
환경에서는 배치 메뉴의 연결 레인 항목과 의존성 패널이 드래그의 대체 경로다.

## 7. 에러 처리

- 레인 저장소 읽기 실패: 스냅샷 `cross_lanes: null`. 직렬 영역에 `연결 레인
  저장소를 읽을 수 없음` 한 줄, `+ 연결 레인`·배치 메뉴의 연결 항목 비활성,
  레인 op는 서버가 `state_unreadable`로 거부.
- 워크스페이스가 등록 해제되거나 숨겨진 멤버: 레인에 남고 위치 칩 `외부`. 그
  멤버가 관련된 dep op는 `root_dir` 해석 불가로 계획 전체 거부(현행 §5.1).
- 확정·삽입 중 사이클: 임시 그래프 검사로 계획 전체 거부, 레인 op도 보내지
  않는다.
- 서버 `bd dep add` 거부: 메시지 토스트, 남은 op 중단(현행).

## 8. 테스트 계획

- `server/worker/cross-lanes-store.test.js`: 파일 없음 → 빈 상태, 원자 쓰기,
  revision CAS 충돌, 손상 파일 → `read()===null`·`mutate` 거부·파일 미변경,
  중복 `bead_id` 정규화.
- `server/ws/monitor-handlers.cross-lanes.test.js`: op 4개 응답·`schedulePush`
  호출, `conflict_membership`, `conflict_empty_lane`, `confirm` 멤버 부족
  `bad_request`, `state_unreadable`, 스냅샷 `cross_lanes` 투영.
- `app/views/monitor/lanes.test.js`: 파생 체인 테스트 13건 제거 → 저장 레인
  투영(번호·위치 칩·고정 행·`⚠ 의존 없음`·`모두 완료`·`외부`), 후속 역방향 맵,
  `의존 있음` 필터, 연결 레인 행에 route·겹침·선행 칩 없음.
- `app/views/monitor/drop-plan.test.js`: draft/confirmed 대상 표 각 행, 고정 행
  앞 거부, 타 레인 소속 거부, 확정 op 열(생략·사이클 거부·미적재만 place), 삭제
  dep-remove 열, 결과 `lane_ops`/`ops` 순서.
- `app/views/monitor/dep-candidates.test.js`: 방향별 제외, 사이클 disabled,
  정렬, 검색 일치.
- `app/views/worker/lanes.test.js`: 배치 메뉴 그룹 렌더(연결 그룹 유무).
- protocol 문서 검사 스크립트가 있으면 `cross_lanes`·op 4개 반영.

## 9. 비범위

Worker 탭 직렬 레인 의미와 Worker 스케줄러, UI-fz4f 미확정 blocker 로직,
`bead_blocked_by` 서버 생성 규칙, 기존 파생 성분 마이그레이션, 레인 순서의 서버
측 강제.

## 10. 구현 unit 후보 (advisory)

1. `server`: `state-paths` 경로 + `cross-lanes-store` + 모니터 op 4개 + 스냅샷
   `cross_lanes` + `app/protocol.md`.
2. `app/views/monitor/lanes.js`·`drop-plan.js`·`dep-candidates.js`: 파생 제거,
   저장 레인 투영, 드래그 표, 확정/삭제 op 열, 후보 규칙.
3. `app/views/monitor/index.js`·`app/views/worker/lanes.js`·`app/styles.css`:
   레인 pane 조작, 의존성 패널, 칩, 필터, 배치 메뉴.
