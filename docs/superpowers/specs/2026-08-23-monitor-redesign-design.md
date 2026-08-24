---
scope:
  - app/views/monitor/
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/transcript-drawer.js
  - app/views/worker/transcript-render.js
  - app/views/settings-dialog/
  - app/views/settings-dialog/execution-pane.js
  - app/utils/transcript-lines.js
  - app/main.js
  - app/styles.css
  - app/protocol.md
  - server/ws/monitor-handlers.js
  - server/ws/worker-handlers.js
  - server/ws/session-defaults-handlers.js
  - server/ws/exec-preset-handlers.js
  - server/session-defaults.js
  - server/worker/runnable-cache.js
  - server/worker/title-cache.js
  - server/worker/session-log.js
  - server/workflow-enrich.js
---

# 모니터 탭 전면 재설계 — 레포 데크 · 세로 5레인 · 실행 진행 상세 · 레포별 설정 통합 (UI-eey2)

- 작성일: 2026-08-23
- 소유 Bead: `UI-eey2` (route `full_plan` — 사용자 확정 2026-08-24)
- 목업: `~/tmp/mockups/2026-08-23-monitor-redesign.html`
  (tailnet: `http://100.122.98.8:9000/2026-08-23-monitor-redesign.html`). 실제 앱
  CSS(`tokens.css`/`base.css`/`styles.css`)를 그대로 인라인했으므로 색·타이포·
  카드 형태는 구현 결과와 같다. 창을 좁히면 모바일 배치, `#rs`로 열면 레포 설정
  패널, `#light`는 라이트 테마.
- 선행 spec: UI-qrfo(모니터 신설), UI-2gi1(직렬 레인·blocker 칩),
  UI-fmwh(정렬·대기로), 2026-08-23 header-monitor-scope-split(헤더 구조),
  2026-08-23 per-issue-exec-account(UI-24ow, 계정 핀).

## 1. 문제

현재 모니터 탭은 Worker 탭의 크로스 레포 상위집합이지만, 세 가지 면에서 제 몫을
못 한다.

1. **정보 부족.** 실행가능 카드에 stepper가 없고(`runnable` 투영에 `workflow`가
   없음) 대신 `spec:codex`·`plan ✓` 같은 파생 칩이 자리를 차지한다. 실행중 카드는
   heartbeat·경과·토큰만 있어 "무엇을 하고 있는지"가 보이지 않는다 — 서버 세션
   투영에 단계/활동 필드 자체가 없다(`server/worker/queue-store.js Attempt`,
   `worker-handlers.js attemptsWithUsage`).
2. **배치.** 좌 2단(실행가능/대기)·중앙 실행중·우 2단(PR/완료)의 3열 그리드는
   Worker 탭의 세로 5레인과 달라 두 탭을 오가면 눈이 다시 찾는다. 실행가능이 레포
   구분 없이 평평하고, 여러 레포의 큐와 자동화 옵션·모델 설정을 한 화면에서 다룰
   자리가 없다(설정은 ⚙ 다이얼로그가 연결 workspace 한 곳만 다룬다).
3. **상호작용 결함.** ID 클릭 복사가 Worker에는 있고 모니터에는 없다
   (`monitor/lanes.js idChip`은 "클릭하면 상세로 이동"). `[대기로 ↴]`가 데스크톱
   에도 항상 보인다(Worker는 coarse pointer/좁은 화면에서만). 레포 라벨은 클릭
   동작이 없다. blocker 경고 `⚠ 선행 X가 어느 레인에도 없고 실행 중도 아님`이
   닫힌 선행에 대해 영구히 남았다(§10으로 착지 완료) — `bead_blocked_by`가 blocker의 `status`를
   보지 않고 모든 `blocks` 의존을 싣고(`title-cache.js recordFromIssue`), 워커
   큐를 거치지 않고 닫힌 Bead는 `done` 배열에 없어 클라이언트 위치 맵에서
   "내부인데 미적재"로 판정되기 때문이다(UI-2gi1 §6.4의 맹점).

## 2. 목표와 원칙

- **Worker 탭과 같은 테마·같은 카드·같은 레인.** 모니터는 Worker 템플릿
  (`paneTemplate`/`candidateCard`/`miniRow`/`runningTile`)을 그대로 쓰고, 모니터
  전용 `mon-*` 카드 템플릿은 폐기한다. 같은 사실은 같은 모양으로 그린다.
- **모니터만의 축 = 레포.** 레포는 카드의 부가 정보가 아니라 좌표다. 레포 데크
  (§4)가 필터·KPI·자동화 스위치·모델 요약·설정 진입을 한 자리에서 맡고, 레인
  안에서는 레포 섹션이 카드를 묶는다.
- **"다음에 무엇이 일어나는가"를 보이게.** 실행중 카드는 단계(stepper)·최근
  활동·위임 상태를 말하고, 대기 레인의 순번·슬롯 레일·연결 체인이 출발 순서를
  말한다.
- **서버가 사실을, 클라이언트가 표시를.** 단계·활동·blocker 상태는 서버 투영
  으로 싣고 클라이언트는 분류 판단 없이 그린다(stepper spec §3.1의 규약 그대로).
- **신규 ws op 없음.** 기존 `worker-*` 변경 op는 이미 `root_dir`을 받는다
  (`mutationWorkspaceOf`). 추가는 `get/set-session-defaults`·
  `subscribe-session-log`·`get-attempt-prompt`의 선택적 `root_dir`과
  `apply-impl-preset-global`의 `root_dir` 의미 확장(kv까지)뿐이다(§9.5).
- **기본은 접고, 중요한 것만 펼친다**(사용자 결정 2026-08-23). 첫 화면에
  보이는 것은 "지금 돌고 있는 것·다음에 출발할 것·손이 필요한 것"이다. 부차
  정보는 접힘(완료된 위임 칩, 빈 직렬 레인, 토큰 누적),
  조건부(실행 설정 칩은 이슈 핀이 레포 기본값과 다를 때만), 또는 툴팁으로 물러
  난다. 접힘 상태는 사용자가 펼친 것을 기억한다(§4.3·§5).
- fail-quiet: 새 투영 필드 부재(구버전 서버)는 해당 표시 생략으로 수렴한다.

## 3. 화면 구조

```
┌ 레포 데크 ───────────────────────────────────────────────────────────────┐
│ [실행3·대기6·PR2·완료21·τ] [dotfiles 타일][beads-ui 타일][microbiome 타일]…        │
├ (⚙ 클릭 시) 레포 실행 설정 패널 ─────────────────────────────────────────┤
├ 실행가능 ──┬ 대기 ─────┬ 실행중 ──────────┬ PR 대기 ──┬ 완료 ────┤
│ ▾ dotfiles 6│ ▾ dotfiles │ [tile dotfiles-drnw] │ [card]    │ [row]     │
│  [card]     │  병렬 ①②  │  stepper · 활동 · 위임│           │           │
│  [card]     │  직렬1 ●①  │ [tile UI-24ow]       │           │           │
│ ▾ beads-ui 3│ ▾ beads-ui │ …                    │           │           │
└─────────────┴───────────┴─────────────────────┴───────────┴──────────┘
```

- DOM 순서는 생애주기(실행가능→대기→실행중→PR 대기→완료) 그대로. 데스크톱은
  Worker와 같은 `.worker-lanes` flex 5열 **균등폭**(UI-thwe 개정 — 실행중
  `1.35`·실행가능 `1.05` 가중치는 같은 카드가 레인마다 다른 폭으로 잘려 폐기). 모바일(≤640px)은 Worker 모바일과 같은 세로 스택이되
  CSS `order`로 실행중→대기→실행가능→PR 대기→완료 순으로 둔다(현행 모니터의
  "관제 우선" 순서 유지). 기존 3열 grid·가로 스와이프 칸반 CSS(`.mon-lanes`)는
  제거한다.
- 레인 헤더는 `paneTemplate`의 헤더(점·제목·카운트·header_control)를 쓴다.
  실행가능: 정렬 select(§5). 실행중: 정렬 select(시작순/레포순, 키
  `bdui.monitor.running_sort` 유지). PR 대기: `일괄 머지`. 완료: 기간 select
  (키 `bdui.monitor.done-range` 유지).

## 4. 레포 데크 (signature)

모든 visible 레포를 한 줄에 세운다. 소스는 `workspaces_state[]`(§9.4)다.

### 4.1 합계 칸

- 전 레포 합계만: `실행 n · 대기 n · PR n · <기간> 완료 n` + `Claude τ <합>` ·
  `Codex τ <합>`(`crossRepoTokenTotal` 현행 산식, 상세 내역은 툴팁). 제공자
  구분은 남긴다 — Claude/Codex 소모를 따로 보는 것이 사용자 요구(2026-08-23).
- 계정 사용량(5h/7d 비율·계정 수)은 헤더 공통 사용량 미터(UI-rewk)가 모든
  탭에서 보여 주므로 모니터가 다시 그리지 않는다(변경 없음).
- **`전체 자동화 n/N` 마스터 토글은 없앤다**(사용자 결정 2026-08-23) — 자동화는
  레포별 스위치(§4.2·§4.3)가 유일한 제어다. 서버 op `monitor-auto-toggle`은
  계약을 건드리지 않고 남겨 두며(UI 미사용), 제거는 별도 chore.

### 4.2 레포 타일

**모든 visible 레포**(프로젝트 관리에서 고른 레포, §9.4 행 전부)를 같은 타일로
그린다 — UI-thwe 개정: 파이프라인 유무로 타일/접힌 pill을 가르던 분류는 폐기.
지금 조용한 레포도 자동화·머지 스위치는 같은 자리에 있어야 하고, 상태는 빈
슬롯 레일과 `0/n 실행 · 대기 0 · PR 0`이 이미 말한다. 한 타일(236px 고정폭,
가로 스크롤 strip)에:

| 줄 | 내용 | 동작 |
|---|---|---|
| 1 | 레포명(mono) · `Worker ↗` | `Worker ↗` = 그 레포로 `switchWorkspace` 후 `gotoView('worker')` |
| 2 | **슬롯 레일** `▮▮▯` + `n/슬롯 실행 · 대기 n · PR n` | 레일 한 칸 = 슬롯 1개. 실행 중 칸은 impl 보라(`--stage-impl-on`), 빈 칸은 점선 — 빈 칸이 있고 자동화가 켜져 있으면 그 레포 큐의 앞 행이 출발한다 |
| 3 | 스위치 `▶/⏸ 자동화` · `🔀 머지` · `⚙` | 각각 `worker-automation-toggle` / `worker-merge-auto-toggle` + `root_dir` + 그 레포 revision(CAS 1회 재시도). 자동 해결(`auto_repair`)은 부차 설정이라 타일에 두지 않고 §4.4 패널 안에만 둔다(사용자 결정 2026-08-23). `⚙`은 §4.4 |
| 4 | `오케 <runtime · model(· effort)>` · `워커 <runtime · model · effort>` exec 칩 | `resolveExecutionSettings`(app/utils/execution-defaults.js)에 그 레포의 `session_defaults`+orchestration 값을 `global`로 넣어 해석. 툴팁은 Worker 칩과 동일 |

타일 클릭(스위치·링크 제외) = **포커스 필터** 토글: 그 레포의 섹션·카드만
선명하고 나머지는 `opacity .38 · saturate(.6)`로 흐려진다(숨기지 않는다 — 다른
레포에서 지금 무엇이 도는지는 흐려도 보여야 한다). 다시 클릭·`Esc`로 해제.
상태는 세션 메모리(새로고침 시 해제).

### 4.3 조용한 레포 (폐기 — UI-thwe)

`▸ 파이프라인 없음 N` 접힌 줄·pill·`beads-ui.monitor.deck` 기억은 폐기했다;
조용한 레포도 §4.2 타일이다. 대기 레인의 빈 레포 그룹 헤더(현행 `mon-group`
빈 그룹)는 없앤다 —
설정 제어가 데크로 옮겨 가므로 대기 레인은 큐나 실행가능 후보가 있는 레포만
보인다(§6).

### 4.4 레포 실행 설정 패널 (`⚙`)

데크 바로 아래 인라인 패널(목업 `#rs`). 새 폼을 만들지 않고 **통합 설정
다이얼로그의 `실행` 탭 본문을 재사용 가능한 pane으로 떼어 내** 두 곳(다이얼로그
·모니터 패널)이 같은 코드를 마운트한다(spec gate finding 4 — 현행
`createSettingsDialog`는 고정 id의 native `<dialog>` 전체를 만들고 open/close만
돌려주므로 그대로는 인라인 재사용이 불가능하다).

- **`app/views/settings-dialog/execution-pane.js`** `createExecutionPane(
  mount_element, binding)`를 새로 둔다. 다이얼로그 `실행` 탭의 상태·렌더·
  저장 로직(세션 기본값 draft/baseline, orchestration draft, runtime filter,
  preset diff/apply, slots)을 이 모듈로 옮기고 `createSettingsDialog`는 자기
  탭 영역에 이 pane을 마운트한다(동작·DOM 클래스·기존 테스트 보호 — id 충돌을
  피하려 pane 내부는 id 대신 클래스·`data-*`만 쓴다). 반환:
  `{ load(), render(), destroy() }`.
- `binding = { root_dir: string|null, queue: () => QueueLike|null, transport,
  implPresetStore, notify }`. `root_dir`이 `null`이면 현행(연결 workspace,
  payload에 `root_dir` 없음). 문자열이면 **pane이 보내는 모든 op**에
  `root_dir`을 싣고, 그 레포 revision으로 CAS 1회 재시도한다:
  `get-session-defaults` · `set-session-defaults` · `worker-queue-set-orchestration-defaults`
  · `worker-queue-set-slots` · `worker-queue-set-serial-lane-count` ·
  `worker-automation-toggle` · `worker-merge-auto-toggle` ·
  `worker-auto-repair-toggle` · `apply-impl-preset-global`(§9.5). CAS revision·
  `runner_catalog`·`execution_defaults`·orchestration·`auto_advance`·`auto_merge`·
  `auto_repair`·`slots`·`serial_lane_count`는 `binding.queue()`에서 읽는다 —
  다이얼로그는 `queueStore.get()`, 모니터는 그 레포의 `workspaces_state` 행(§9.4).
- pane에 **자동화 섹션**을 추가한다: 자동화/머지/자동 해결 토글, 동시 실행,
  직렬 레인 — 다이얼로그에 이미 있는 slots는 이 섹션으로 옮기고, 없던 항목은
  여기서 한 번 추가한다(Worker/Board ⚙에서도 같이 보인다).
- 모니터 패널은 pane 하나를 마운트하고(`표시` 탭은 레포 무관 표시 정책이라
  모니터에서 열지 않는다) 헤더에 `<레포명> 실행 설정 · Worker 탭 ⚙ 실행 탭과
  같은 저장소`를 쓴다. 한 번에 한 레포만 연다 — 다른 `⚙`을 누르면 기존 pane을
  `destroy()`하고 새 binding으로 다시 마운트한다.

## 5. 실행가능 레인

- 소스: `workspaces[].runnable[]`(§9.1로 `workflow`·`exec_pins` 재료 추가).
- **레포 섹션**으로 묶는다(`.mon2-sec`): sticky 헤더 = 접기 캐럿 · 레포명 ·
  건수 · `Worker ↗`. 섹션 순서 = 데크 순서(= `workspaces_state` 순서). 빈 섹션은
  그리지 않는다. 접힘 상태는 `localStorage` `beads-ui.monitor.sections`
  (`{ [root_dir]: { runnable: bool, queue: bool } }`).
- 카드 = Worker `candidateCard` 그대로: 그립 · ID(클릭 복사) · route 칩 · 제목 ·
  **stepper**(`item.workflow`, `stepperTemplate`) · 생성·수정 메타.
  `spec:<reviewer>`·`plan ✓/✎/–` 칩과 `mon-c__repo`는 없앤다(섹션 헤더가
  레포를 말한다). admission 배지(`⛔ …`/`♻️ stale→재리뷰`)는 Worker와 같은
  `reason` 칩 자리에 남긴다.
- **오케/워커 exec 칩은 이슈 핀이 레포 기본값과 다를 때만** 그린다(핀 색
  `--layer-pin*`, 툴팁 `이슈 핀 — 레포 기본값과 다름`). 레포 기본값 자체는 데크
  타일이 말하므로 카드마다 반복하지 않는다. 같은 규칙을 대기 행(§6)에도
  적용한다. 실행 타일(§7)은 세션이 고정한 값이 사실이므로 항상 그린다. Worker
  탭의 "항상 표시"는 바꾸지 않는다(`candidateCard`에 `exec_chips_mode:
  'always'|'pinned_only'` 옵션을 더해 모니터만 후자를 쓴다).
- 필터 행(Worker `worker-filter` 재사용): `🔒 blocked` 토글 + `전체 / spec 있음
  / spec 없음` 세그먼트. **모니터의 blocked 기본값은 "표시"**(Worker는 숨김) —
  레포 간 계획을 세우려면 막힌 후보가 보여야 한다(사용자 결정 2026-08-24).
  blocked 카드는 흐리게 + §5.1 선행 칩. 키 `beads-ui.monitor.candidate-filter`
  유지(저장값이 있으면 그것을 따른다). spec 유무 판정은 runnable 투영의 `spec_id` 유무(§9.1). 필터는
  모든 섹션에 공통 적용되고 섹션 건수는 필터 후 수다.
- 정렬 select(헤더): `레포 · spec 우선`(기본) / `레포 · 최신 수정` /
  `최신 수정(레포 무시)`. 셋째는 섹션 없이 평평하게 수정 시각순 — 레포 묶음이
  방해될 때의 탈출구. 키 `bdui.monitor.candidate_sort`.
- 적재: 데스크톱 = 드래그만(대기 레인의 어느 레포 섹션·어느 서브레인에든 —
  단 **같은 레포**로만, 현행 `dropTargetGroup` 규약). `[대기로 ↴]`+레인 선택
  메뉴는 Worker와 같은 CSS 조건(`any-pointer: coarse` 또는 ≤640px)에서만
  보인다 — 템플릿이 Worker 것이므로 자동으로 따라온다. 기존 모니터 전용
  `.mon-place__popover`는 제거한다.
- 🔗(직렬로 연결)·🔒 칩의 ✕(연결 해제)는 UI-2gi1 §6.5 그대로 유지하되 칩 표기는
  §5.1·§10의 새 의미를 따른다.

### 5.1 의존 칩 — 방향을 이름으로 말한다

한 이슈에 걸린 blocks 의존은 두 방향이 있고, 둘을 한 칩 모양으로 섞으면 "내가
막혔나, 내가 막고 있나"가 안 읽힌다(사용자 지적 2026-08-24). 실행가능 카드·대기
행·실행 타일 모두 같은 두 칩을 쓴다.

| 칩 | 뜻 | 색 | 소스 |
|---|---|---|---|
| `🔒 선행 <id> (<위치>)` + ✕ | **이 이슈는** `<id>`가 close될 때까지 출발하지 않는다 | amber(`--chip-blocked`) | `blocked_by` / `bead_blocked_by` |
| `→ 후속 <id> (<위치>)` | **이 이슈가** close되면 `<id>`가 자기 레포 큐에서 출발한다 | blue(`--stage-plan-*`) | 전 레포 `blocked_by` 맵을 뒤집은 역방향 간선(클라이언트 파생) |

- 위치 표기는 UI-2gi1 §6.3 어휘(`같은 레인 앞/뒤` · `<repo> · <lane> #n` ·
  `실행중` · `PR 대기` · `실행가능` · `미적재` · `외부` · `위치 미확인`).
- 후속 칩은 역방향이라 해제 ✕가 없다(해제는 후속 쪽 카드의 선행 칩 ✕). 후속이
  어느 레인/실행가능에도 없는 이슈(비자격 open Bead)는 알 수 없으므로 생략
  (fail-quiet) — 그 이슈가 자격을 얻어 나타나면 칩도 나타난다.
- 툴팁: 선행 `이 이슈는 <id>가 close될 때까지 출발하지 않는다`, 후속 `이 이슈가
  close되면 <id>가 자기 레포 큐에서 출발한다`.

## 6. 대기 레인

- 레포 섹션은 **큐가 비어 있지 않거나 실행가능 후보가 있는** 레포마다 하나씩
  그린다(spec gate finding 1): 데스크톱은 드래그가 유일한 적재 수단이므로 후보가
  있는 레포에는 비어 있어도 같은 레포 드롭 타깃이 있어야 한다. 빈 큐 섹션은
  `병렬` pane 하나에 `비어 있음 — 드래그로 배치` 문구만 보인다. 둘 다 없는
  레포는 섹션을 그리지 않는다(§4.3 한 줄 요약으로 충분).
- 레포 섹션(§5와 같은 헤더) 안에 Worker와 같은 `.worker-wait` 스택: `병렬`
  pane + 비어 있지 않은 직렬 레인 pane(`s1..sN`). **빈 직렬 레인은 평소엔
  한 줄 힌트(`직렬 2 비어 있음`)로 접혀 있다가 드래그가 시작되면 드롭 타깃
  pane으로 펼쳐진다**(`dragstart`에 루트에 `is-dragging` 클래스, `dragend`/
  `drop`에 해제 — CSS가 표시를 소유). 설정된 레인 수가 1이고 그마저 비었으면
  힌트도 생략한다. 섹션 헤더 오른쪽에 `● 자동`/`○ 수동` 상태 점(읽기 전용,
  툴팁 `자동화 켜짐 — 슬롯이 비면 다음 행이 출발`; 토글은 데크가 소유).
- 행 = Worker `miniRow`: 순번 · ID · 제목 · 배지(REVISE 파킹 등) · 의존 칩
  (§5.1 선행/후속) · exec 칩(핀만). 직렬 레인 점유 lineage는 Worker처럼 **ghost 행**으로, 레인
  헤더 배지는 `점유` 한 단어.
- **드래그**: 같은 레포 안에서 병렬↔직렬·직렬↔직렬 이동(`worker-queue-place`
  lane+index)·레인 내 재정렬(`worker-queue-reorder`)·실행가능 섹션으로 끌어
  제거(`worker-queue-remove`)를 Worker 드래그 컨트롤러와 같은 좌표 산식으로
  한다(모니터는 raw `queue_index`/`place_index` 데이터 속성 규약 유지 — 실행
  중으로 빠진 버드가 DOM에 없어도 서버 인덱스와 맞아야 한다). UI-2gi1 §5.4
  "모니터는 레인 간 이동 없음"을 뒤집는다.
- `↑ ↓ ✕` 버튼은 Worker와 같은 CSS 조건에서만 보인다(데스크톱 숨김).

### 6.3 출발 순서 = 순번

`다음 ▶` 같은 예측 배지는 두지 않는다(사용자 결정 2026-08-24). 병렬 큐·직렬
레인의 순번(`#1`, `#2`)이 곧 그 레포의 출발 순서이고, 출발 가능 여부는 데크의
슬롯 레일(빈 칸)·섹션 헤더의 `● 자동`/`○ 수동`·행의 🔒 칩(blocked)이 이미 말한다.
디스패치 판정은 서버(`bd ready` 재판독)가 한다. 레포 간 직렬 진행(UI-2gi1:
foreign `blocks` 엣지 + 선행 `closed` 시 후속 자동 출발)은 §6.4 체인 블록이
보여 준다.

### 6.4 `🔗 연결 체인` 블록 — 레포 간 순서 (클라이언트 파생, 표시 전용)

레포 큐를 하나의 전역 큐로 합치는 표시는 하지 않는다 — 슬롯·디스패치·CAS
revision이 전부 workspace 단위라 레포 간 전역 순서는 존재하지 않고, 존재하는
순서는 **blocks 의존**뿐이다(UI-2gi1 §3). 그 순서를 대기 레인 맨 위에 접을 수
있는 블록으로 드러낸다(사용자 요구 2026-08-23: "어떤 이슈와 어떤 이슈가 순차로
진행되는지").

- 입력: `bead_blocked_by`(대기·직렬·실행·PR 대기 멤버), `runnable[].blocked_by`,
  그리고 `blockers.js`가 이미 만드는 위치 맵. 간선 = `blocker → blockee`.
  §10 정정 후에는 닫힌 선행이 입력에 없으므로 체인은 살아 있는 작업만 담는다.
- 체인 = 간선으로 이어진 연결 성분 중 **노드가 2개 이상**인 것. 단, 모든
  노드가 같은 레포의 같은 직렬 레인 안에 있으면 제외한다(레인 순서가 이미
  보여 준다). 같은 레포의 병렬 큐 안 체인(`같은 레인 앞`)은 포함한다 — 순서가
  드래그로 바뀔 수 있으므로 근거를 보이는 편이 낫다.
- 렌더: 체인마다 위상 순서(선행 → 후속)의 세로 목록. 노드 한 줄 = 레포 배지 ·
  ID(클릭 복사) · 현재 위치 칩(`● 실행중` / `병렬 #n` / `s1 #n` /
  `PR 대기` / `실행가능` / `미적재` / `외부`). 분기(한 선행에 후속 여럿)는
  들여쓰기 한 단계. 사이클은 `⛔ 의존 사이클` 한 줄로 대체(정렬하지 않는다).
  노드 클릭 = `openRow`. 드래그 없음.
- 블록 헤더 `🔗 연결 체인 n · 레포 간 순서`(툴팁에 성립 원리 한 문장). 기본
  펼침, 접힘 상태는 `beads-ui.monitor.sections`의 `chains` 키. 체인이 0이면
  블록을 그리지 않는다.
- 이것은 투영이지 제어가 아니다. **체인은 큐 적재로 생기지 않는다** — bd
  `blocks` 의존이 있어야 생기고, 의존은 카드의 🔗(직렬로 연결: 다른 레포 이슈
  검색·선택 → `dep-add`(root_dir), UI-2gi1 §6.5)·이슈 상세·`bd dep add`로
  만들고 선행 칩의 ✕(`dep-remove`)로 푼다. 블록 헤더 힌트 문구:
  `blocks 의존 · 카드의 🔗로 연결`. 적재는 각 레포 큐 안의 자리만 정한다.

## 7. 실행중 레인 — 진행 상세

타일 = Worker `runningTile`에 모니터 전용 줄 네 개를 더한 형태(running-grid.js의
타일을 옵션으로 확장; Worker 탭 렌더는 옵션 미사용으로 불변).

| 줄 | 내용 | 소스 |
|---|---|---|
| 헤더 | ● · ID(복사) · **레포 배지**(클릭 → Worker 탭) · 직렬 레인 칩 `s1` · 경과 · `▤ 세션` · `⏸/▶` · 폐기 | 현행 + `serial_lane_id` |
| 제목 | | |
| **stepper** | `stepperTemplate(bead_workflow[bead_id], 'in_progress')` — 현재 칸 깜빡임 | §9.2 |
| **활동 줄** | `● <최근 활동 요약> <n초 전>` — 예: `⚡ npm test — 통과 41 · 41초 전`, `구현 리뷰 통과 → PR 생성 중`, `✓ spec 게이트 — codex APPROVE`. 일시정지면 회색 점 | §9.3 `last_activity` |
| **위임 칩** | 진행 중인 위임만 펼쳐 `⟳ 구현 unit 3 · codex`; 끝난 위임은 `✓ n` 한 칩으로 접고 툴팁에 목록(`완료된 위임: review-consult · codex, 구현 unit 1 · codex …`). 진행 중도 끝난 것도 없으면 줄 생략 | §9.3 `legs` |
| **후속 칩** | `→ 후속 <id> (<repo> · <lane> #n)` — 이 이슈가 close되면 출발할 이슈(§5.1; 세션 종료가 아니라 close다 — PR·머지가 남을 수 있다). 없으면 줄 생략 | 역방향 간선 |
| meta | 오케/워커 exec 칩 · 계정 칩(있으면) · 토큰/비용 | 현행 |

- `▤ 세션`은 모니터 안에서 `createTranscriptDrawer`를 연다(Worker 드로어 재사용).
  `open({ …, root_dir })`로 `subscribe-session-log`·`get-attempt-prompt` 둘 다에
  `root_dir`을 싣는다(§9.5). 드로어는 모니터 루트 하단에 한 개 마운트.
- 정렬·heartbeat·운영 버튼(일시정지/재개/폐기/실패 닫기/이어하기 대화상자)은
  현행 op·CAS 규약 유지.

## 8. PR 대기 · 완료

- PR 대기 = Worker `miniRow` card 변형(`pr_wait`) + 레포 배지(클릭 → Worker 탭).
  머지 게이지·`머지/취소/정리 재개/충돌 해소 후 머지`·폐기·receipt는 현행 op
  그대로.
- 완료 = 3줄 행: (레포 배지 · ID · `완료 n 전`) / 제목 / (토큰 · `작업 n`).
  Worker의 2줄 변형은 레포 배지가 추가되면 좁은 레인에서 제목이 12ch로 접히므로
  모니터에서만 제목을 독립 줄로 내린다(`mon2-done` 수식 클래스).

## 9. 서버 투영 변경 (`app/protocol.md` 동시 갱신)

### 9.1 `runnable[]` — `workflow`·`spec_id`·exec 재료

`server/worker/runnable-cache.js qualify()`가 돌려주는 `RunnableItem`에:
- `workflow: WorkflowSummary` — `enrichIssueWorkflow(row, workspace_root)`
  (`server/workflow-enrich.js`). 같은 `bd list` 행을 입력으로 쓰므로 추가 bd
  호출 없음; git 프로브는 모듈의 기존 stale 캐시를 탄다. 실패 시 `null`.
- `spec_id`는 이미 있다(`string|null`) — spec 필터의 판정 키로 문서화.
- `metadata`의 실행 관련 키(`exec-enums.js BEAD_APPLY_KEYS` + 계정 핀 2키)만
  추린 `exec_pins: Record<string,string>` — 클라이언트가
  `resolveExecutionSettings({ pin: exec_pins, global: <레포 session_defaults +
  orchestration>, ... })`로 오케/워커 칩을 해석한다. 전체 metadata는 싣지
  않는다(현행 "백로그 전체를 싣지 않는다" 결정 유지).
- `spec_reviewer`·`plan_state`는 더 이상 카드가 쓰지 않지만 필드는 남긴다
  (다른 소비자·테스트 보호). 제거는 비범위.

### 9.2 `bead_workflow` — 레인 멤버의 stepper

`worker-queue-snapshot`(따라서 모니터 `workspaces[]`)에
`bead_workflow: Record<bead_id, WorkflowSummary>`를 더한다. 대상 = `queue` ∪
`serial_lanes[].entries` ∪ running attempts ∪ `pr_wait`(완료 레인 제외).
- 소스: `title-cache.js`의 `BeadRecord`에 `workflow`를 추가한다 — 같은
  `bd show` fill에서 `enrichIssueWorkflow(issue, workspace_root)`를 계산한다.
  `bead_titles`/`bead_labels`와 같은 partial-cache 규약(없으면 키 생략, 다음
  스냅샷에 도착).
- **신선도**: 실행 중 세션이 metadata를 쓰면 5분 TTL은 길다. 두 갱신 훅을 더한다.
  (a) 서버 자신의 Bead metadata 쓰기(`server/worker/bd-metadata.js` 경유)
  readback을 `titleCache.refreshFromIssue`로 흘린다. (b) 세션 로그에서 그 bead를
  대상으로 한 `bd update|close|dep` 명령의 **완료**(Claude: `Bash` tool_use의 짝
  `tool_result` 도착 / Codex: `command_execution` `item.completed`, §9.3)를
  관측하면 해당 레코드를 만료시켜(`titleCache.expire(workspace, bead_id)`) 다음
  스냅샷 fill을 유도한다. 둘 다 실패해도 TTL이 따라잡는다.
- 실행 중 카드의 `status` 인자는 `'in_progress'`로 고정해 현재 칸이 깜빡이게
  한다(stepper `currentStageKey` 규약).

### 9.3 실행 attempt overlay — `last_activity`·`legs`

`worker-handlers.js attemptsWithUsage()`가 RUNNING attempt에 얹는 비영속 필드에
추가한다(둘 다 `last_event_at`과 같은 live-only·재시작 시 소실·fail-quiet):

- `last_activity: { at: number, kind: 'assistant'|'tool'|'gate'|'phase'|'result'|'error', text: string, tool?: string, command?: string, path?: string, result?: string } | null`
  — attempt마다 **상태를 가진 reducer**가 만든다(spec gate finding 6: Claude의
  `tool_use`는 뒤따르는 `tool_result`와 짝을 맞춰야 `npm test — 통과 41` 같은
  결과 요약이 나오므로 이벤트 1건 → 줄 변환으로는 부족하다).
  `app/views/worker/transcript-render.js`의 순수 파서를 **`app/utils/
  transcript-lines.js`로 옮기며** 증분 API를 만든다: `createTranscriptReducer()`
  → `{ push(event): DisplayLine[] }`(내부 `toolsById` 짝맞춤 보존);
  `parseTranscript(events)`는 reducer를 돌려 같은 결과를 내고
  transcript-render.js는 둘 다 re-export한다(드로어 무변경, 기존 파서 테스트
  전부 통과). `parseCodex`는 main-session `item.completed` 중 `command_execution`
  항목도 `tool` 줄(command + exit/결과 요약)로 투영하도록 넓힌다 — 현행은
  버린다. 서버 `session-log.js`는 attempt(+delegation `launch_id`)별 reducer를
  들고 `publish()`마다 `push`해 마지막 비-`thinking` 줄을 `last_activity`로
  보관한다(`text` 160자 절단, 재시작 시 소실 — live-only). §9.2 (b)의 캐시
  만료는 **명령 완료 시점**에 건다: Claude는 `bd update|close|dep` 명령
  `tool_use`의 짝 `tool_result`가 도착했을 때, Codex는 그 `command_execution`
  `item.completed`일 때 — 시작 시점에 만료하면 명령이 끝나기 전 옛 값을 다시
  채울 수 있다.
- `legs: Array<{ role: 'implementation'|'review-consult'|null, runtime: string|null, model: string|null, state: 'live'|'done'|'failed', ordinal: number, label: string }>`
  — 기존 `delegation_sessions[]`(위임 런치)와 `usage_legs[]`(role 태그)만으로
  파생한다(spec gate finding 7 — 새 producer 계약·durable 어휘를 만들지
  않는다). 현행 role 어휘는 `implementation`·`review-consult` 둘뿐이고 총
  unit 수는 알 수 없으므로 라벨은 `구현 unit 3 · codex`, `review-consult ·
  codex`처럼 **순번만** 적는다(총수 없음). 위임 런치가 끝나지 않았으면
  `live`. spec/plan/impl 리뷰 구분은 stepper(§9.2)가 맡는다.

### 9.4 `workspaces_state[]` 확장

현행 `{ root_dir, name, issue_prefix, auto_advance, auto_merge, slots, revision,
runner_catalog }`에 더한다:
`serial_lane_count, auto_repair, orchestration_model, orchestration_effort,
orchestration_speed, execution_defaults, session_defaults: Record<string,string>,
session_defaults_warnings: string[], counts: { running, pr_wait, queue, runnable }`.
- `session_defaults`는 `server/session-defaults.js` 읽기를 레포별로 캐시
  (`set-session-defaults` 성공 시 그 레포만 무효화, 그 외 5분 TTL). 읽기 실패는
  `{}` + warning. **읽기는 비동기이고 `workspaces_state` 생성은 동기이므로**
  cold/expired 캐시는 빈 값(`{}`)을 싣고 fill을 큐잉하며, fill 완료가 모니터
  집계 rebuild(`schedulePush`)를 예약한다 — `issue_prefix` 캐시와 같은 규약
  (spec gate finding 5). 첫 스냅샷이 빈 기본값이면 다음 스냅샷이 채운다.
- `counts`는 클라이언트 `buildLanes()`와 **같은 배타 우선순위**로 센다(spec
  gate finding 2): `running`(live attempt) > `pr_wait` > `queue`(병렬 `queue`
  ∪ `serial_lanes[].entries`, 실행 중으로 빠진 버드 제외) > `runnable`(runnable
  cache 중 앞 레인에 없는 것). 한 버드는 한 칸에만 센다. 완료 수는 기간에
  따르므로 서버가 싣지 않는다 — 데크 합계의 `<기간> 완료 n`은 클라이언트가
  `workspaces[].done[]`을 `done_since`로 걸러 센다(현행 KPI 산식 그대로).

### 9.5 ws op의 `root_dir`

- `get-session-defaults` / `set-session-defaults`: 선택적 `root_dir`. 존재 시
  `targetWorkspaceOf(ws, payload)`로 검증(미등록/숨김 → `bad_request`), 그 루트의
  bd kv를 읽고/쓴다. 부재 시 현행(연결 workspace). `set` 성공 시 §9.4 캐시
  무효화 + 모니터 집계 rebuild 트리거.
- `apply-impl-preset-global`(`server/ws/exec-preset-handlers.js`): 현행은
  `root_dir`을 **queue 변경에만** 쓰고 kv 읽기·쓰기·readback은 연결 workspace에서
  한다(spec gate finding 3) — 다른 레포 패널에서 적용하면 대상 레포 queue와
  현재 레포 session defaults가 갈라진다. `root_dir`이 있으면 kv read/write/
  readback 전부를 검증된 대상 root(`cwd`)에서 수행하도록 고치고, 성공 시 §9.4
  캐시 무효화를 그 root에 건다. 연결 레포 A에서 `root_dir=B`로 적용했을 때 B의
  queue·kv만 바뀌고 A는 불변인 테스트를 둔다. workspace-bound kv helper
  (`server/session-defaults.js`의 읽기/쓰기)는 `cwd` 인자를 받는 형태로
  일반화한다.
- `subscribe-session-log` / `get-attempt-prompt`: 선택적 `root_dir`. 존재 시 그
  workspace의 attempt를 구독·조회한다(검증·권한 규약은 현행 "connection
  workspace의 exact attempt" 문장을 "대상 workspace의 exact attempt"로 일반화).
  구독 레지스트리 키는 이미 client_id라 충돌 없음. 드로어 `open()` 입력에
  `root_dir?`를 더해 두 op에 같은 값을 싣는다(spec gate finding 8 — 프롬프트
  토글이 다른 레포 세션에서 `기록 없음`으로 오답하지 않게).

### 9.6 모니터 집계 rebuild 트리거

§9.2/9.3 갱신은 기존 queue-changed/usage-tick/last_event fanout을 타므로 새
트리거가 필요 없다. 새 rebuild 원인은 둘이다: §9.4 `session_defaults` 캐시의
async fill 완료와 `set-session-defaults` 성공(해당 레포 무효화 → 즉시 push).

## 10. blocker 경고 정정 — 착지 완료 기록

**이미 quick_fix로 착지했다**(2026-08-24, `ddb55ee898eb37b5c976fd68d0f76174d3f1aed5`
main 직접 push·배포). 이 절은 설계의 일부가 아니라 완료 기록이며 Phase·테스트
계획에 다시 들어가지 않는다(spec gate finding 9).

- `server/worker/title-cache.js recordFromIssue`: `dependencies[]` 중
  `dependency_type === 'blocks'`이고 **`status !== 'closed'`인 것만** `blocked_by`에
  넣는다(같은 rig 의존은 `bd show`가 `status`를 싣는다). foreign 의존(status
  없음)은 그대로 `blocked_by`에 남는다 — 별도 필드는 없다.
- `server/ws/monitor-handlers.js pruneClosedForeignBlockers`: 집계 시
  `bead_blocked_by`의 각 blocker id 중 prefix가 **다른** visible workspace의
  `issue_prefix`와 일치하면 그 루트에서 `bd show <id> --json`으로 status를 읽어
  (프로세스 캐시, 성공 5분/실패 1분 TTL, closed 판명 시 push 예약) `closed`면
  뺀다. 같은 rig·미소유 prefix·미확인은 그대로(fail-visible).
- `app/protocol.md`: `bead_blocked_by` = 열린 blocker만.
- 결과: 클라이언트(`blockers.js`) 3분기(내부/외부/판정 불가)는 그대로이되 닫힌
  선행이 입력에서 사라져 "내부인데 미적재" 경고는 **진짜 열려 있고 어느
  레인에도 없는** 선행에만 남고, `(완료)` 표기는 나오지 않는다.
- `runnable[].blocked_by`(`bd ready --explain` 출처)는 열린 blocker만 싣는 것이
  `bd ready` 의미이므로 변경 없음.

## 11. 공통 상호작용

- **ID 클릭 = 복사**: Worker와 같은 클래스(`.worker-card__id` / `.worker-mini__id`
  / `.rtile__id`)를 쓰므로 모니터 클릭 위임이 같은 분기(`copyToClipboard` +
  토스트 `복사됨`)를 갖는다. 카드 본문 클릭 = 현행 `openRow`(필요 시
  `switchWorkspace` 후 `gotoIssue`).
- **레포 배지/섹션 `Worker ↗`/데크 `Worker ↗` 클릭** = `switchWorkspace(root)`
  → `router.gotoView('worker')`. 전환 실패 시 토스트, 이동 없음.
- 드래그는 `pointer-events`가 fine한 환경의 1차 수단, 버튼은 coarse/좁은 화면의
  수단 — 표시 조건은 CSS 한 곳(`styles.css`의 기존 `@media (any-pointer: coarse),
  (max-width: 640px)` 블록)이 소유한다.
- 키보드: 데크 타일은 `role=button tabindex=0`, Enter/Space로 포커스 토글,
  `Esc`로 해제. 섹션 접기는 `<button>`.

### 11.1 헤더 사용량 리본 — 모바일 폭 맞춤 (CSS만, 전 탭 공통)

현행 `≤900px` 규칙(`.usage-meter` 그룹 단위 줄바꿈 + 막대 숨김)으로도 좁은
화면에서 Claude 그룹(5h·7d·모델 창 3개 + 배지)과 Codex 그룹이 한 줄에 남아
뷰포트 밖으로 잘린다(사용자 보고 2026-08-24, 실기기). `≤640px`에서 리본을
**헤더 아래 전폭 행**으로 바꾼다:

- `.header-actions` 안의 `.usage-meter-mount`를 `flex: 1 1 100%; order: 1;
  min-width: 0`으로 두어 Dark·⚙·New issue 다음 줄에 혼자 내려오게 한다.
- `.usage-meter { display:flex; flex-direction:column; width:100%; gap: var(--sp-3) }`,
  `.usage-meter__group { display:flex; width:100%; min-width:0; gap: var(--sp-6) }`
  — provider당 한 행. 그룹 사이 세로 구분선은 없앤다(현행 ≤900 규칙 유지).
- `.usage-meter__provider { flex: 0 0 44px }`, `.usage-meter__window { flex: 1 1 0;
  min-width: 0 }`, **막대는 숨기지 않고** `.usage-meter__track { display:block;
  flex: 1 1 20px; min-width: 16px; width: auto }`로 남는 폭을 창끼리 나눠 갖는다.
  라벨·%는 `nowrap` 유지. `.usage-meter__badge { flex: 0 0 auto }`.
- 다계정 카드(`.usage-meter__card`)의 모바일 전폭 규칙은 현행 유지.
- `app/views/usage-meter.js` 마크업은 바꾸지 않는다 — `styles.css`의 해당
  블록만 추가하고, 900px 규칙은 641–900px에서 그대로 살아 있다.
- 검증: CSS 가드 테스트(≤640 블록에 `.usage-meter__track { display: block }`
  존재·raw hex 없음) + 실기기/iframe 390px에서 리본이 두 행으로 들어오고 가로
  스크롤이 생기지 않는지 수동 확인.

## 12. 에러 처리

- CAS 충돌: 현행 규약(응답의 최신 revision으로 1회 재시도, 재실패 토스트).
- `root_dir` 거부(`bad_request`): 토스트 + 상태 불변.
- 새 투영 필드 부재: stepper·활동 줄·위임 칩·데크 모델 칩·연결 체인을 각각
  생략. 레인 렌더 자체는 깨지지 않는다.
- `bead_workflow` 계산 실패(bd show 실패/enrich 예외): 그 bead만 키 생략(다른
  bead의 fill은 계속).
- `last_activity` 요약 실패(파서 예외): 마지막 성공 값 유지.
- 포커스 필터 중 그 레포가 visible에서 빠지면 필터 자동 해제.

## 13. 테스트 계획

서버
- `runnable-cache`: `workflow`·`exec_pins` 투영 / enrich 실패 시 `null` /
  `spec_id` 유무.
- `title-cache`: `workflow` 레코드, `expire` 후 재fill(닫힌 의존 제외는 §10으로
  착지 완료).
- `session-log`: reducer 기반 `last_activity`(Claude tool_use→tool_result 짝맞춤
  결과 요약, assistant, Codex agent_message·main-session command_execution,
  delegation monitor), thinking 무시, 160자 절단, bd 쓰기 명령의 **완료**
  관측(Claude tool_result / Codex item.completed) → expire 콜백.
- `transcript-lines`: `createTranscriptReducer().push` 누적 결과 ==
  `parseTranscript` 결과(기존 fixture 전부), `command_execution` 투영.
- `worker-handlers attemptsWithUsage`: `last_activity`/`legs` overlay, 비실행
  attempt에는 없음.
- `monitor-handlers`: `workspaces_state` 확장 필드와 `counts` 배타 집계(실행 중
  버드 중복 없음·직렬 레인 포함·runnable), `session_defaults` async fill → push
  예약(첫 빈 스냅샷 뒤 채워진 스냅샷), `set-session-defaults` 무효화.
- `session-defaults-handlers`/`worker-handlers`/`exec-preset-handlers`: `root_dir`
  검증·cwd 전달·부재 시 현행 동작 불변; `apply-impl-preset-global`은 연결 레포 A
  에서 `root_dir=B` 적용 시 B의 queue·kv만 바뀌고 A 불변; `subscribe-session-log`·
  `get-attempt-prompt` 대상 workspace 일반화.
- `app/utils/transcript-lines` 이동 후 기존 transcript-render 테스트 전부 통과.

클라이언트
- `monitor/lanes.test.js`: 선행/후속 칩 파생(역방향 간선·위치 표기·레인 밖 후속 생략), blocked 기본 표시, 연결 체인 파생(2노드 이상·같은 직렬 레인만의 체인
  제외·분기 들여쓰기·사이클·닫힌 선행 부재·위치 칩), 레포 섹션 투영(빈 섹션 생략·순서), 필터(spec/blocked)
  와 섹션 건수, 정렬 3종, 완료 3줄 행, 실행 타일 stepper·활동·legs 필드 매핑(끝난 위임 접기), exec 칩
  `pinned_only` 판정(핀=기본값이면 생략), 빈 직렬 레인 힌트/드래그 중 펼침,
  조용한 레포 토글 기본 접힘·기억, 구버전 payload fail-quiet.
- `monitor/index.test.js` / e2e: ID 클릭 복사(상세 안 열림), 레포 배지 →
  `switchWorkspace`+`gotoView('worker')`, 드래그 place/reorder/remove 좌표
  (실행 중으로 빠진 버드 포함), `[대기로 ↴]`·`↑↓✕` 표시 조건(CSS 가드 테스트),
  데크 토글 op + root_dir + CAS 재시도, 포커스 필터 클래스, ⚙ 패널 마운트/교체,
  `▤ 세션` 드로어 `root_dir` 구독.
- `settings-dialog/execution-pane`: `root_dir` null이면 payload 불변(기존
  다이얼로그 테스트 보호), 문자열이면 열거된 모든 op에 `root_dir` + CAS 재시도,
  자동화 섹션 토글/slots/직렬 레인, `destroy()` 후 리스너·타이머 없음.
- CSS 가드(`styles.*-theme.test.js` 방식): 새 블록에 raw hex 없음, `.mon-lanes`
  3열 grid·스와이프 규칙 제거, 모바일 order 규칙 존재.
- Pre-Handoff Validation 전체(`tsc`/`test`/`lint`/`prettier`/`build` + 번들).

수동
- 1440/1600px에서 5레인 폭·데크 스크롤, 포커스 필터, ⚙ 패널로 다른 레포의
  orchestration 모델 변경 후 그 레포 Worker 탭 ⚙에서 같은 값 확인.
- 모바일(실기기): 스택 순서, `대기로 ↴`/`↑↓✕` 노출, 데크 스와이프, 드로어.

## 14. 비범위

- 스케줄러·큐 스토어 계약 변경 없음.
- Worker 탭 렌더 변경 없음(템플릿 옵션 추가·다이얼로그 `자동 해결/직렬 레인`
  행 추가·§11.1 헤더 리본 모바일 CSS는 예외로 명시).
- 새 ws op 없음(`root_dir` 선택 필드 추가·확장과 snapshot 필드 추가만).
- 레포 간 드래그(다른 레포 큐로 이동) 없음 — 서버에 개념이 없다.
- 이슈별 계정 핀 편집은 상세 패널(UI-24ow) 소유; 모니터는 칩 표시만.
- `exec-preset` 편집 UI는 다이얼로그 소유(모니터 패널은 적용만).
- `spec_reviewer`/`plan_state` 필드 제거, `mon-*` CSS 완전 삭제 이후의 정리
  (별도 chore).

## 15. 구현 unit 후보 (full_plan Phase 제안 — 구속력 없음)

1. **Phase 1 — 서버 투영·계약** (§9): runnable `workflow/exec_pins`,
   `bead_workflow`, `last_activity/legs`(reducer), `workspaces_state` 확장
   (`counts`·`session_defaults` async fill), `root_dir`(session-defaults 2 ·
   exec-preset apply · session-log · attempt-prompt), `transcript-lines` 추출,
   `protocol.md`. 검증: 서버 단위 테스트 + 기존 스냅샷·파서 테스트.
   (scope: `server/`, `app/utils/transcript-lines.js`, `app/protocol.md`)
2. **Phase 2 — 모니터 레인 재구성** (§3·§5–§8·§11): Worker 템플릿 재사용,
   레포 섹션, 필터/정렬, 드래그/모바일, ID 복사, 레포 배지 이동, 실행 타일 진행
   상세, 드로어, 연결 체인, 구 `mon-*` 카드·3열 CSS 제거.
   (scope: `app/views/monitor/`, `app/views/worker/{lanes,running-grid,
   transcript-drawer}.js`, `app/styles.css`(§11.1 헤더 리본 포함), `app/main.js`)
3. **Phase 3 — 레포 데크·설정 패널** (§4): 데크·조용한 레포·포커스 필터·
   스위치·⚙ 패널(`settings-dialog/execution-pane.js` 추출 + binding·자동화
   섹션·다이얼로그 재마운트).
   (scope: `app/views/monitor/deck.js`, `app/views/settings-dialog/`,
   `app/styles.css`)

§10(blocker 정정)은 quick_fix로 이미 착지했다(`ddb55ee`). Phase 1은 그 결과
위에서 시작한다.
