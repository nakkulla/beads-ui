# Worker 보드 재설계 (codex exec /goal 기반 큐)

## 목적

기존 `Worker` 탭의 트리·badge UI를 4-lane Kanban 보드로 전면 재설계한다.
실행 엔진을 `bd-ralph` / `pr-review` 호출에서 **`codex exec /goal <issueId>`
→ 5분 PR 리뷰 대기 → `codex exec /pr-finish <pr#>`** 두 단계 자동 파이프라인으로
통합하고, **server-owned 큐 스케줄러**를 도입해 두 단계가 모두 성공으로 종료되면
다음 작업을 자동으로 실행한다. 두 단계 분리는 CLAUDE.md 워크플로 계약 ("PR
Delivery 는 stop boundary; PR Finish 는 별도") 과 Copilot/Gemini 봇 리뷰 대기
시간 확보를 위한 것이다.

운영자는 큰 카드로 정보 밀도를 높여서 spec 유무, 자식 진행률, 모델/effort
override, parallel 여부, 그리고 실행 중인 codex 세션 ID와 라이브 로그를 한 화면에서
볼 수 있다.

## 문제 정의

[2026-04-16 Worker 탭 spec](2026-04-16-worker-tab-design.md) 이 도입한 트리 UI는
parent 단위 운영 화면을 도입했지만, 다음 한계가 굳어졌다.

1. **실행 흐름이 두 갈래 (`bd-ralph`, `pr-review`)** 로 갈라져 있어 UI에 액션
   버튼이 늘어났고, 새 워크플로 (`/goal`) 추가 시 더 복잡해진다.
2. **실행 순서 / 큐 개념이 없다**. parent를 한 번에 한 개씩 수동 실행해야 하며
   다음 작업을 자동으로 잇는 흐름이 없다.
3. **parallel 가능성 표시가 없다**. 자원 충돌이 없는 작업도 사용자가 직접 한 개씩
   띄워야 한다.
4. **live 진행 상황 (모델, effort, 세션 ID, 마지막 로그 라인) 이 보이지 않는다**.
   현재는 elapsed 와 status badge 뿐.
5. **child 트리가 항상 노출**되어 lane 시각이 무너진다. 운영자는 parent 단위
   summary 만 보고 필요할 때만 child 를 펼치는 흐름을 원한다.

## 목표

- 워크플로를 두 단계 `codex exec /goal <issueId>` (PR Delivery) → 5분 review-wait
  → `codex exec /pr-finish <pr#>` (PR Finish) 자동 파이프라인으로 통합 (기존
  `$bd-ralph`, `$pr-review` 빌더 제거). 두 단계는 supervisor 가 자동으로 잇고
  하나의 serial slot 점유를 공유한다.
- 4-lane Kanban: `inbox` / `waiting` / `progress` / `done`.
- 드래그드롭으로 lane 이동 + waiting lane 내 순서 변경.
- spec 존재가 waiting/progress 진입의 hard gate.
- server-owned 큐 스케줄러:
  - `/goal` succeeded + PR 캐시 1건 이상 → 5분 PR review-wait (Copilot/Gemini
    봇 리뷰 시간 확보, 설정 가능) → `/pr-finish` 자동 spawn → succeeded 시
    60초 큐 카운트다운 → 다음 카드 spawn (`/goal`).
  - `/goal` succeeded + PR 0건 (main 직접 push/merge 로 간주) → review-wait /
    `/pr-finish` 건너뛰고 즉시 60초 큐 카운트다운.
  - 어느 단계든 failed / cancelled → 큐 정지.
- parallel 슬롯: `worker_parallel=true` 카드는 serial slot 점유와 무관하게 다중
  실행. parallel 카드도 동일하게 `/goal` → 5분 review-wait → `/pr-finish` 파이프라인을
  자기 타임라인으로 진행한다 (다른 카드 진행에 영향 없음).
- model / thinking effort 를 이슈별 override (기본값은 toolbar 전역 default).
  `/goal` 과 `/pr-finish` 는 같은 model / effort 를 공유한다.
- 카드에 spec 배지, 자식 진행률, parallel 테그, override 테그를 정적으로 표시.
  progress 카드는 sub-state (`goal_running` / `pr_review_wait` / `pr_finish_running`)
  별로 표시를 전환하며 blink, elapsed, codex 세션 ID, 마지막 stdout 1줄, cancel /
  open log / finish now / cancel auto pr-finish 액션, 펼친 children 트리를 표시.
- 모든 lane / 큐 순서 / parallel / override 는 **beads metadata** 에 영구
  저장. 라이브 정보 (세션 ID, 마지막 stdout, elapsed) 는 server 메모리 +
  WebSocket 으로 frontend 에 push.

## 비목표

- multi-workspace 보드 동시 표시 (workspace 전환은 유지).
- child 이슈 단위 실행 (child 는 parent 가 codex /goal 으로 일괄 진행한다고 본다).
- 다른 codex 명령어 (`bd-ralph`, `pr-review`, custom prompt) 의 lane 진입 — 이번
  버전은 `/goal` + 자동 `/pr-finish` 단계 파이프라인 단일.
- `/goal` + `/pr-finish` 외 codex 슬래시 명령 wrapper.
- 큐 다중 우선순위 (FIFO + sort_key 만 사용).
- 세션 ID 기반 cross-tool deep link (단순 클립보드 복사까지만).
- spec 작성 wizard (drop 차단 시 안내만, 작성 자체는 별도 brainstorming 흐름).

## 핵심 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│  app/views/worker.js (mount)                                │
│    └─ worker-board.js  (4 lane grid + DnD)                  │
│         ├─ worker-toolbar.js (search, filter, pause toggle, │
│         │                     default model select)         │
│         └─ worker-card.js (large card)                      │
│             ├─ worker-card-progress.js (blink, log line…)   │
│             └─ worker-card-children.js (inline expand)      │
│                                                             │
│  state (app/state.js)                                       │
│    worker: {                                                │
│      paused: boolean,                                       │
│      live_jobs: { [issueId]: LiveJob },                     │
│      countdown: { issueId, remaining_ms, next_issue_id }    │
│    }                                                        │
│                                                             │
│  WS (app/ws.js) ─ subscribes to:                            │
│    job.started, job.session_id, job.log_line,               │
│    job.exited, queue.countdown, queue.advanced              │
└─────────────────────────────────────────────────────────────┘
                            ▲ WS
                            │
┌─────────────────────────────────────────────────────────────┐
│  server/worker/supervisor.js (기존 확장)                    │
│    ├─ process-runner.js (codex exec /goal + --json 파싱)    │
│    ├─ queue-scheduler.js (NEW) — countdown + auto spawn     │
│    ├─ queue-state.js (NEW)     — bd metadata 읽기·쓰기      │
│    └─ job-store.js  (기존)     — job 영속화                 │
└─────────────────────────────────────────────────────────────┘
```

## 4-lane 모델

| Lane | 정의 | 입주 조건 |
|---|---|---|
| `inbox` | 모든 active parent (open/in_progress, type=epic/feature/task) | 자동. metadata 없는 parent 도 inbox 로 간주 |
| `waiting` | 자동 실행을 대기 중인 카드 | `spec_id` 보유 필수, `worker_queue_sort_key` 정수 보유 |
| `progress` | codex 단계 실행 중이거나 PR review-wait 중인 카드 (sub-state: `goal_running` / `pr_review_wait` / `pr_finish_running`) | server-owned job active 또는 review-wait 타이머 active |
| `done` | 최근 종료된 카드 (파생, metadata 미사용) | `status in (resolved, closed)` 또는 마지막 job 이 failed/cancelled. 표시 범위는 toolbar 의 done filter (`today` / `3` / `7`) 가 결정 |

- `inbox` 의 후보 산정은 기존 `buildWorkerParents` 의 parent 정의를 재사용한다.
- `done` 은 진짜 영구 lane 이 아니라 **파생 view 분류**이다. metadata 에
  `worker_lane=done` 을 쓰지 않는다. status / 마지막 job 결과만 보고 자동
  분류한다.
- `done` 표시 범위는 toolbar 의 done filter 가 결정:
  - `today` (기본): 오늘 (local day start 이후) 종료된 카드
  - `3` : 최근 3일
  - `7` : 최근 7일
- 기존 board view 의 `closed_filter` 패턴을 그대로 따른다
  (`state.worker.done_filter`, 값 `today` / `3` / `7`).
- 사용자가 done → inbox 로 카드를 드래그하면 그때만 `worker_lane=inbox` 를
  명시 기록하여 done 분류에서 빠진다 (status 가 resolved/closed 라도 inbox 로
  나타남).
- 같은 카드가 동시에 두 lane 에 나타나지 않는다. lane 결정 우선순위:
  `progress` > `waiting` (metadata) > `inbox` (metadata override) >
  `done` (status/job 결과) > `inbox` (default).

## Beads metadata 스키마

다음 키를 parent bead 의 metadata 로 사용한다. 모든 값은 `bd` 가 강제하는 string
타입을 따른다.

| Key | Value | 의미 / 비고 |
|---|---|---|
| `worker_lane` | `"inbox" \| "waiting" \| "progress" \| "done"` | 명시적 lane 배치. 없으면 derive 규칙 적용 |
| `worker_queue_sort_key` | 정수 문자열 (`"1000"`, `"2000"` …) | waiting lane 정렬. 없으면 0 으로 간주 (정렬 맨 앞) |
| `worker_parallel` | `"true" \| "false"` | 기본 `false`. parallel slot 분류 |
| `worker_model` | 모델 ID (예: `"gpt-5.5"`) | 없으면 전역 default 사용 |
| `worker_effort` | `"low" \| "medium" \| "high"` | 없으면 전역 default 사용 |
| `worker_last_goal_job_id` | string | 마지막 `/goal` supervisor job id (UI hint 용) |
| `worker_last_goal_session_id` | string | 마지막 `/goal` codex `thread_id` (디버깅용, UI 복사 보조) |
| `worker_last_pr_finish_job_id` | string | 마지막 `/pr-finish` supervisor job id |
| `worker_last_pr_finish_session_id` | string | 마지막 `/pr-finish` codex `thread_id` |
| `pr_url` | string | 연결된 open PR 의 GitHub URL. supervisor 가 `/goal` job 종료 직후 `gh pr list --search <issueId>` 1회 호출 후 캐시. 없으면 PR 미연결 (main 직접 push/merge 로 간주) |
| `pr_number` | string | 위와 한 쌍. 카드 배지에 `PR #<number>` 로 표시. `/pr-finish` spawn 시 인자로 사용 |

라벨 mirror 는 **추가하지 않는다**. lane 은 metadata 가 source of truth 이며,
검색용 라벨이 추후 필요하면 별도 contract 변경으로 도입한다.

### sort_key 정책

- 최초 insert: 해당 lane 의 max + 1000 (lane 비어있으면 1000).
- 사이 insert: prev / next sort_key 의 산술 평균.
- 사이 평균이 (prev, next) 와 같아지면(차이가 1 이하) → 해당 lane 의 모든 카드의
  sort_key 를 1000 단위로 재배열 (rebalance).
- 또한 안전장치로 `max > 10^9` 도달 시 lane 전체 rebalance.

### lane 이동 시 metadata 쓰기

- `inbox → waiting`: `worker_lane=waiting` + `worker_queue_sort_key=<max+1000>`.
- `waiting → inbox`: `worker_lane=inbox`, `worker_queue_sort_key` 제거 (또는 `""`
  로 설정 후 무시 처리).
- `inbox/waiting → progress`: supervisor 가 큐 픽업하면서 `worker_lane=progress`
  로 기록 (`worker_queue_sort_key` 제거).
- `progress → done`: 작업 종료 hook 에서 `worker_lane=done` (그리고 자동 정리
  rule 에 따라 24h 후 inbox 로 복귀하거나, status 변화에 위임).
- `done → inbox`: 수동 drag 시 `worker_lane=inbox`.

## 큐 정책 (server-owned)

큐는 `server/worker/queue-scheduler.js` 가 단독으로 다룬다. UI 는 명령(Pause /
Skip wait / Cancel auto-start) 을 보낼 뿐, 상태 결정은 서버가 한다.

### 동시 실행 규칙

- **serial slot 1개** : `worker_parallel=false` 카드는 progress lane 에 동시
  1개만.
- **parallel slot 무제한** : `worker_parallel=true` 카드는 serial slot 점유
  여부와 무관하게 즉시 실행.
- progress 인원 합산 한도는 두지 않는다. 사용자 책임.

### 카드 sub-state 와 단계 흐름

progress lane 에 진입한 카드는 다음 sub-state 를 거친다. 세 sub-state 모두
같은 serial slot 을 점유한다 (`worker_parallel=true` 면 점유 무관, 자기
타임라인 진행).

```
goal_running  →  pr_review_wait  →  pr_finish_running  →  (큐 auto-advance)
     ↓ (PR 0건)
     └──────────────────────────────────────────────────────→ (큐 auto-advance)
```

### 단계 1: `/goal` 종료 후 처리

`/goal` 종료 시 supervisor 가 즉시 `gh pr list --state open --search <issueId>
--json number,url,title,state` 1회 호출하여 PR 캐시 (자세한 흐름은 "PR 데이터
흐름" 섹션 참고).

- `/goal` succeeded **+ PR 1건 이상**:
  1. 카드 sub-state 를 `pr_review_wait` 로 전환.
  2. 5분 PR review-wait 카운트다운 시작 (설정값
     `bdui-config.toml [worker].pr_review_wait_ms`, 기본 300000). Copilot /
     Gemini 코드 리뷰 봇이 PR 리뷰를 마칠 시간을 확보하는 게 목적.
  3. `job.pr_review_wait` WS 이벤트로 매 1초 broadcast
     (`{ jobId, issueId, prNumber, remainingMs }`).
  4. 카운트다운 중 사용자 액션:
     - `[Finish now]` → 즉시 `/pr-finish` spawn (대기 건너뜀).
     - `[Cancel auto pr-finish]` → 이 1회 자동 spawn 만 취소. 카드는 progress
       lane 의 `pr_review_wait` 상태 유지, 사용자가 다시 `[Run pr-finish]` 클릭
       전까지 멈춤. 전역 `paused` 토글과 별개.
  5. 카운트다운 만료 → `/pr-finish <pr_number>` spawn (같은 supervisor / serial
     slot 유지), 카드 sub-state 를 `pr_finish_running` 으로 전환.
- `/goal` succeeded **+ PR 0건** (main 직접 push/merge 로 간주):
  - review-wait / `/pr-finish` 단계 건너뛰고 단계 3 (큐 auto-advance) 로 진입.
- `/goal` succeeded **+ PR 다건** (예외 케이스):
  - 첫 항목 사용 (PR 데이터 흐름 정책과 동일).
- `/goal` failed / cancelled / killed → 큐 정지. PR 캐시 호출은 종료 상태와
  무관하게 1회 시도 (실패 PR 추적용).

### 단계 2: `/pr-finish` 종료 후 처리

- `/pr-finish` succeeded → 단계 3 (큐 auto-advance) 로 진입.
- `/pr-finish` failed / cancelled / killed → 큐 정지. 카드는 progress lane 의
  `pr_finish_running` 상태로 남아 사용자 개입 대기 (수동 재시도 또는 carve out).

### 단계 3: waiting 카드 auto-advance

직전 카드가 정상 종결되면 다음 조건을 모두 만족할 때 큐 자동 진행:

1. 전역 `paused === false`.
2. waiting lane 의 `worker_queue_sort_key` 가 가장 작은 카드가 존재.
3. 그 카드가 `spec_id` 보유.
4. 카드가 serial slot 점유 가능 (serial 비어있음) 또는 `worker_parallel=true`.

위 조건 모두 통과 시:

1. queue-scheduler 가 60초 카운트다운 시작 (설정값 `worker.advance_delay_ms`,
   기본 60000).
2. `queue.countdown` WS 이벤트로 매 1초 broadcast (`remaining_ms`).
3. 카운트다운 중 사용자가 `Skip wait` 클릭 → 즉시 spawn.
4. 카운트다운 중 사용자가 `Cancel auto-start` 클릭 → **이 1회의 자동 진행만
   취소**. 토글 `paused` 는 그대로. 다음 progress 카드가 정상 종결되면 위 1~4
   단계가 다시 평가된다.
5. 카운트다운 만료 → `/goal <issueId>` spawn (manual spawn 과 동일 경로).

### 큐 정지 / 재개

- 토글 `paused=true` 일 때는 어떤 자동 진행도 일어나지 않는다.
- `paused=false` 로 전환 시: 진행 중 job 종료 후 위 auto-advance 규칙 재적용.
  진행 중 job 이 없으면 즉시 다음 카드 평가 후 60초 카운트다운으로 진입.
- 큐 정지는 metadata 가 아닌 server 메모리 상태이다 (re-start 시 default
  `false`). 필요 시 추후 영속화.

### spec gate

- waiting lane 의 picked 카드가 `spec_id` 비었으면 즉시 자동 진행 정지 (큐
  정지). UI 는 ‘spec required’ 토스트.
- inbox → waiting drop 시점에서도 사전에 spec_id 검사 → 없으면 drop 차단.

## Codex 실행 명령

`server/worker/process-runner.js` 는 단계별로 다음 두 명령을 spawn 한다.
공통 플래그 (`--json`, `-m`, `-c model_reasoning_effort=`, `-C <workspace>`) 는
양쪽 동일.

### 단계 1: `/goal`

```bash
codex exec \
  --json \
  -m <model> \
  -c model_reasoning_effort=<effort> \
  "/goal <issueId>"
```

### 단계 2: `/pr-finish`

```bash
codex exec \
  --json \
  -m <model> \
  -c model_reasoning_effort=<effort> \
  "/pr-finish <pr_number>"
```

- `<model>` 우선순위: `metadata.worker_model` → toolbar default → `gpt-5.5` (시드).
- `<effort>` 우선순위: `metadata.worker_effort` → toolbar default → `high`.
- `<issueId>` 는 parent bead 의 `id`. `<pr_number>` 는 단계 1 종료 후 캐시된
  `metadata.pr_number`.
- 두 단계는 같은 model / effort 를 공유 (단계별 override 는 비목표).
- 추가 플래그: `-C <workspace>` (작업 디렉터리), `--skip-git-repo-check` 불필요
  (workspace 가 항상 git repo 가정).

### 세션 ID / 라이브 로그 캡처 (dry-run 으로 확정)

`codex exec --json --ephemeral` dry-run (2026-05-13) 으로 stdout JSONL 이벤트
스키마를 확정했다:

| 이벤트 `type` | 추가 필드 | supervisor 처리 |
|---|---|---|
| `thread.started` | `thread_id` (UUIDv7) | 즉시 `metadata.worker_last_session_id` 기록 + WS `job.session_id` broadcast |
| `turn.started` | — | (no-op, 디버그용 로그만) |
| `item.completed` | `item.type`, `item.id`, `item.text` (agent_message), `item.tool` 등 | `item.type==='agent_message'` 의 `item.text` 를 마지막 stdout 라인으로 → WS `job.log_line` broadcast |
| `turn.completed` | `usage.input_tokens`, `cached_input_tokens`, `output_tokens`, `reasoning_output_tokens` | 종료 시 토큰 통계 store + WS `job.exited` payload 에 동봉 |

운영 시 `--ephemeral` 은 **사용하지 않는다** (세션 rollout 영구 저장은 디버깅에
유용하므로 그대로 둠). dry-run 검증 외에는 아래 옵션 조합만 사용:

```bash
codex exec --json -m <model> -c model_reasoning_effort=<effort> "/goal <issueId>"
```

`/goal <issueId>` 는 codex 바이너리 내장 슬래시 명령으로, **bd issue body 와
관련 context 를 자동으로 prompt 에 끼워 넣는다** (dry-run 에서 input_tokens 약
22k 소비 확인). 따라서 supervisor 는 별도 prompt 조립 / issue body 첨부를 하지
않는다. `/pr-finish <pr#>` 도 동일하게 PR 메타·diff·review 코멘트를 자동
context 화 한다고 가정하며, JSONL 이벤트 스키마는 `/goal` 과 동일 (`thread.started`
/ `turn.started` / `item.completed` / `turn.completed`) — 구현 시 dry-run 으로
재확인한다.

## 카드 UI

### 공통 카드 (`worker-card.js`)

```
[ ID | type badge ]
[ Title (1~2 lines) ]
[ Spec✓/No spec | ⚡ parallel | ⚙ model/effort | PR #123 ↗ ]
[ ▰▰▰▱▱ 3/7 children ]
```

- spec 배지: `spec_id` 있으면 ✓ + 파일 열기 링크 (기존 spec viewer 재사용).
- parallel 테그: `worker_parallel=true` 일 때만.
- model/effort 테그: `worker_model` 또는 `worker_effort` 가 default 와 다를 때만.
- 자식 진행률: `resolved + closed` / 전체 children. children 없으면 영역 생략.
- **PR 배지**: `metadata.pr_number` + `metadata.pr_url` 보유 시 `PR #<number>`
  표시 + 클릭 시 새 탭으로 `pr_url` 열기. PR 메타는 supervisor 가 job 종료 시
  1회 `gh pr list --search <issueId>` 호출 결과를 캐시 (아래 PR 데이터 흐름).

### Progress 카드 (`worker-card-progress.js`)

공통 영역 아래에 sub-state 별로 다음 영역을 분기 표시한다.

**sub-state: `goal_running`**

```
─────────────────────────────────────
● /goal running   02:14   sess: ab12cd34 📋
> Editing app/views/worker.js…
[ Cancel ] [ Open log ]
─────────────────────────────────────
```

**sub-state: `pr_review_wait`**

```
─────────────────────────────────────
⏳ PR review wait   03:42 / 05:00   PR #123 ↗
> Waiting for Copilot / Gemini review
[ Finish now ] [ Cancel auto pr-finish ] [ Open PR ]
─────────────────────────────────────
```

**sub-state: `pr_finish_running`**

```
─────────────────────────────────────
● /pr-finish running   00:48   sess: ef34ab56 📋   PR #123 ↗
> Resolving review threads…
[ Cancel ] [ Open log ] [ Open PR ]
─────────────────────────────────────
```

**children expand (sub-state 무관)**

```
▾ children
  ✓ bd-202  Lane state schema
  ▶ bd-203  Card template
  ▢ bd-204  Inline expand
```

- `●` blink: 1초 주기 opacity 1 ↔ 0.25 CSS keyframe.
- `⏳` 는 blink 없이 정적, 옆 카운트다운만 1초 단위 갱신.
- elapsed: server 에서 `started_at` 기준 frontend 가 1초마다 계산. `pr_review_wait`
  는 `wait_started_at` 과 `wait_total_ms` 로 표시.
- 세션 ID: 8자 truncate (full ID 는 hover/copy). `/goal` 과 `/pr-finish` 는 서로
  다른 thread_id 를 가지므로 sub-state 별로 별도 표시.
- log line: 최신 1줄. 너무 길면 ellipsis.
- Cancel: 기존 `POST /jobs/:id/cancel` 재사용. 진행 중인 단계 job 만 취소
  (review-wait 중에는 비활성, 대신 `[Cancel auto pr-finish]` 사용).
- Open log: 기존 `GET /jobs/:id/log` 재사용. `/goal` / `/pr-finish` 로그는 각자
  분리된 job id 로 조회.
- Finish now: review-wait 카운트다운 즉시 만료시켜 `/pr-finish` spawn.
- Cancel auto pr-finish: 자동 spawn 만 취소 (카드는 progress lane 의 review-wait
  상태로 유지). 사용자가 다시 [Run pr-finish] 클릭하기 전까지 멈춤.

### Inline children expand (`worker-card-children.js`)

- 카드 어디든 클릭(=select)이 아닌 `▸` 토글로 펼침. expand 상태는 컴포넌트 로컬
  (페이지 새로고침 시 초기화).
- children list 는 기존 `bd` snapshot 에서 derive (별도 fetch 불필요).
- 각 child 행: `[status icon] [id] [title]`. status icon 매핑:
  - `open` → ▢ , `in_progress` → ▶ , `resolved` → ✓ , `closed` → ✓ (회색).
- progress 카드의 expand 는 spec 단계 default = expanded (구현 시 사용성 검토 후 옵션화 가능).

## 인터랙션 / Drag-Drop

| From → To | 허용 | 처리 |
|---|---|---|
| inbox → waiting | ✅ (spec 있을 때만) | metadata 쓰기 (lane + sort_key) |
| inbox → progress | ✅ (spec 있을 때만, parallel/serial slot 규칙) | 즉시 spawn |
| waiting → inbox | ✅ | sort_key 제거 |
| waiting ↔ waiting | ✅ | drop 위치 prev / next 의 평균 sort_key |
| waiting → progress | ✅ (spec 있을 때만, parallel/serial slot 규칙) | 카운트다운 건너뛰고 즉시 spawn |
| progress → inbox/waiting | ❌ | "Cancel first" 토스트 |
| done → inbox | ✅ | metadata 쓰기 |
| spec 없는 카드 → waiting/progress | ❌ | "Spec required to enter queue" 토스트 |
| serial 슬롯 점유 중 non-parallel → progress | ❌ | "Serial slot busy. Mark as parallel or wait." 토스트 |

토스트는 기존 `ws-toast` 패턴 재사용. drop 차단 시 카드는 시각적으로 원위치
스냅백 (CSS transition).

### Toolbar 액션

- 검색 input (기존 filter 재사용).
- 상태 필터 dropdown (open/in_progress/resolved+closed).
- **Default model / effort 선택 dropdown** — `bdui-config.toml` 의
  `[worker]` 섹션에 `default_model` / `default_effort` 키로 저장
  (기존 `bdui-config.toml` 처리 패턴 재사용; 2026-04-23 spec 참조).
  변경 시 즉시 토스트 + 새 spawn 부터 적용.
- **Done filter** dropdown — `today` / `3` / `7`. `state.worker.done_filter`
  에 저장. 기존 board `closed_filter` 와 같은 패턴.
- `⏸ Pause queue` 토글 (server 에 POST, 서버가 broadcast).

## PR 데이터 흐름

새 디자인은 PR 정보를 **bd metadata 캐시 단일 source** 로 통일하고, 캐시
결과가 `/pr-finish` 자동 단계 분기를 결정한다.

1. supervisor 의 codex `/goal` job 이 종료된 직후 (성공 / 실패 무관)
   `gh pr list --state open --search <issueId> --json number,url,title,state`
   를 1회 호출.
2. 결과 처리:
   - 정확히 1건 → `metadata.pr_number` + `metadata.pr_url` 을 bd 에 기록.
     `/goal` succeeded 면 단계 1 (5분 review-wait) 로 분기.
   - 0건 → 두 키를 제거 (또는 빈 문자열). `/goal` succeeded 면 main 직접
     push/merge 로 간주하여 review-wait / `/pr-finish` 단계를 건너뛰고 단계 3
     (큐 auto-advance) 로 즉시 진입.
   - 다건 → 첫 항목 사용 (예외 케이스).
3. `job.pr_linked` WS 이벤트로 frontend 에 알림. frontend 는 bd snapshot 만
   읽어 카드 PR 배지를 렌더. 별도 `worker-prs` route 호출 없음.
4. `/pr-finish` spawn 시 `metadata.pr_number` 를 인자로 사용.

이로써 `pr-target-resolver`, `pr-reader`, `server/routes/worker-prs.js`,
`worker-pr-panel`, `worker-pr-summary` 가 모두 불필요해진다. supervisor 안의
가벼운 `gh pr list` 1회 호출만 남는다 (수십 줄).

## WS 이벤트 스키마 (초안)

기존 `job.*` 이벤트에 `phase: "goal" | "pr_finish"` 필드를 추가하여 frontend 가
sub-state 라우팅에 사용한다. PR review-wait 단계는 별도 이벤트로 분리.

| 이벤트 | payload | 송신 시점 |
|---|---|---|
| `job.started` | `{ jobId, issueId, phase, parallel, startedAt }` | supervisor spawn 직후 (`/goal` 또는 `/pr-finish`) |
| `job.session_id` | `{ jobId, issueId, phase, sessionId }` | JSONL `thread.started` 파싱 시 (`thread_id` 추출) |
| `job.log_line` | `{ jobId, issueId, phase, line, at }` | JSONL `item.completed` 의 `item.type==='agent_message'` 의 `item.text` |
| `job.exited` | `{ jobId, issueId, phase, status, exitCode, finishedAt, usage? }` | child close. 정상 종료 시 마지막 `turn.completed.usage` 동봉 |
| `job.pr_linked` | `{ jobId, issueId, prNumber, prUrl }` | `/goal` 종료 직후 `gh pr list` 결과로 metadata 캐시한 직후. `prNumber === null` 이면 PR 0건 (직접 main push 로 간주) |
| `job.pr_review_wait` | `{ jobId, issueId, prNumber, remainingMs, totalMs }` | `/goal` succeeded + PR 1건 이상일 때 5분 카운트다운, 1초 주기 |
| `job.pr_review_wait_cancelled` | `{ jobId, issueId, prNumber, reason }` | 사용자가 `[Cancel auto pr-finish]` 클릭 시 (`reason: "user_cancel"`) |
| `queue.countdown` | `{ remainingMs, nextIssueId }` | waiting → next spawn 60초 카운트다운, 1초 주기 |
| `queue.advanced` | `{ spawnedIssueId, jobId }` | 카운트다운 만료 후 spawn 직후 |
| `queue.paused` | `{ paused }` | 토글 시 |

`job.pr_review_wait` 와 `queue.countdown` 은 서로 다른 카운트다운임에 주의
(전자는 "현재 카드의 `/pr-finish` 자동 spawn 까지", 후자는 "현재 카드 종결 후
다음 waiting 카드 `/goal` spawn 까지").

자세한 필드는 구현 시 ws.js 패턴 (`type`, `payload`) 에 맞춰 직렬화.

## 파일 변경 계획

### 신규

- `app/views/worker-board.js` — 4-lane grid 레이아웃, DnD root.
- `app/views/worker-card.js` — 공통 카드 템플릿.
- `app/views/worker-card-progress.js` — progress 전용 섹션.
- `app/views/worker-card-children.js` — inline children list.
- `app/data/worker-board-selectors.js` — 카드 → lane 매핑, sort_key 정렬, parallel
  파생 (`buildWorkerParents` 와 분리).
- `app/utils/queue-sort.js` — sort_key insert / rebalance 유틸.
- `server/worker/queue-scheduler.js` — `/goal` 종료 → review-wait 타이머 →
  `/pr-finish` spawn → 큐 auto-advance 의 3단계 상태 머신 + skip / cancel
  분기. `worker.pr_review_wait_ms` 와 `worker.advance_delay_ms` 모두 관리.
- `server/worker/queue-state.js` — bd metadata read/write helpers (lane,
  sort_key, parallel, model, effort, 단계별 last_job_id / last_session_id,
  pr_url / pr_number).
- `server/routes/worker-queue.js` — Pause toggle, skip-wait, cancel auto-start,
  finish-now (review-wait 즉시 만료), cancel auto pr-finish (이 1회만),
  drag-drop persist 엔드포인트.

### 수정

- `server/worker/process-runner.js` — `buildWorkerExecTarget` 제거,
  `codex exec --json -m … -c … "/goal <id>"` / `"/pr-finish <pr#>"` 두 가지
  빌더로 교체. `phase` 인자로 분기.
- `server/worker/supervisor.js` — queue-scheduler 인스턴스화, parallel slot 규칙,
  JSONL 파서, 추가 WS 이벤트 broadcast (`phase` 동봉). `/goal` 종료 직후
  `gh pr list` 캐시 → review-wait 타이머 set → 만료 시 `/pr-finish` spawn 흐름
  추가. PR 0건 시 review-wait / `/pr-finish` 건너뛰는 분기 처리.
- `app/views/worker.js` — tree 마운트 → board 마운트.
- `app/views/worker-detail.js` — model / effort / parallel override 컨트롤 추가,
  기존 bd-ralph / pr-review 버튼 제거.
- `app/state.js` — `worker` slice 에 `paused`, `live_jobs` (sub-state·phase
  포함), `countdown` (queue auto-advance), `pr_review_waits` (issueId 별
  review-wait 카운트다운 맵) 추가.
- `app/ws.js` — 위 신규 이벤트 핸들러 (`job.pr_review_wait`,
  `job.pr_review_wait_cancelled`, `phase` 분기 포함).

### 제거

- `app/views/worker-tree.js`
- `app/views/worker-parent-row.js`
- `app/views/worker-child-row.js`
- `app/views/worker-pr-panel.js` + 테스트
- `app/views/worker-pr-summary.js` + 테스트
- `server/worker/pr-target-resolver.js` + 테스트
- `server/worker/pr-reader.js` (workspace-level PR 목록 사용처 없으면 함께 제거.
  `worker-prs` route 와 한 묶음)
- `server/routes/worker-prs.js` + 테스트

> supervisor 안에서 `gh pr list --search <issueId>` 를 1회 호출하는 가벼운
> 로직만 추가한다 (`pr-reader` 와 별개로, supervisor-local 헬퍼 또는 inline).

## 마이그레이션 / 데이터 호환성

- 기존 metadata 키 (`workflow_*`, `bdui-config`) 와 충돌하지 않음.
- `worker_*` prefix 새로 도입. 기존 worker 탭이 쓰던 `show_closed_children` 등
  store-only 상태는 board view 에서 사용하지 않음 (제거).
- 진행 중인 supervisor job 이 있는 상태에서 새 버전이 처음 마운트되면:
  - lane derive: job.status 가 running 이면 progress lane.
  - lane metadata 없으면 inbox 로 표시.
- 대기열은 새 시스템 시작 시 비어있다고 가정. 기존 사용자 데이터에 `worker_*` 가
  존재할 가능성 낮음.

## 검증 / 테스트 전략

### 단위 테스트

- `app/utils/queue-sort.js`: insert middle, insert tail, rebalance 트리거 임계.
- `app/data/worker-board-selectors.js`: lane 분류 (status/metadata/job 결합),
  parallel/serial 분류.
- `server/worker/queue-scheduler.js`:
  - `/goal` succeeded + PR 1건 → 5분 review-wait → `/pr-finish` spawn.
  - `/goal` succeeded + PR 0건 → review-wait 건너뛰고 큐 60초 카운트다운.
  - `/goal` failed → 큐 정지, review-wait / `/pr-finish` 미발생.
  - `/pr-finish` succeeded → 큐 60초 카운트다운.
  - `/pr-finish` failed → 큐 정지.
  - review-wait 중 `[Finish now]` → 즉시 `/pr-finish` spawn.
  - review-wait 중 `[Cancel auto pr-finish]` → 이 1회만 취소 (paused 와 별개).
  - paused → 모든 단계 / 카운트다운 진행 안 함.
- `server/worker/queue-state.js`: bd metadata read/write 라운드트립 (모킹된
  bd 인터페이스), 단계별 last_*_job_id / last_*_session_id 분리 확인.

### 통합 테스트

- `server/worker/supervisor.integration.test.js` 확장: codex 명령 인자 확인
  (`-m`, `-c`, `/goal` 및 `/pr-finish` 양쪽), JSONL stdin 모킹으로 단계별
  session_id / log_line 캡처. `/goal` 종료 → `gh pr list` 모킹 → review-wait
  진입 → `/pr-finish` spawn 까지 단일 시나리오로 통합 검증.
- `app/views/worker.test.js` 대체: board 마운트, drag-drop 모킹, drop 차단
  토스트 발화 검증, progress 카드 sub-state 전환 (goal_running →
  pr_review_wait → pr_finish_running) 렌더 검증.

### 수동 검증 체크리스트

- inbox → waiting drag 후 새로고침해도 sort_key 보존.
- spec 없는 카드를 waiting drop → 스냅백 + 토스트.
- serial 카드 실행 중 non-parallel drop → 차단 토스트, parallel drop → 즉시
  spawn.
- `/goal` 종료 (PR 생성) → 5분 PR review-wait 진입 → 만료 시 자동 `/pr-finish`
  spawn → `/pr-finish` 종료 → 큐 60초 카운트다운 → 다음 카드 spawn.
- `/goal` 종료 (PR 미생성, 직접 main push) → review-wait 건너뛰고 즉시 큐
  60초 카운트다운.
- review-wait 중 `[Finish now]` → 즉시 `/pr-finish` spawn.
- review-wait 중 `[Cancel auto pr-finish]` → 카드 review-wait 상태 유지, 큐
  진행 안 함.
- parallel 카드: 자기 타임라인으로 `/goal` → review-wait → `/pr-finish` 진행,
  serial 카드와 무관.
- `Pause queue` 토글 후 종료 → review-wait / `/pr-finish` / 큐 카운트다운 모두
  미발생.
- `/goal` 또는 `/pr-finish` failed 종료 → 큐 정지 + 카운트다운 미발생.
- children 펼치기 / 접기.

## 해결된 항목 (2026-05-13)

본 spec 작성 과정에서 사전에 확정한 항목들. plan / 구현에서 그대로 사용.

- **codex exec JSONL 스키마** — dry-run 으로 확정 (`thread.started` /
  `turn.started` / `item.completed` / `turn.completed`). 본문 "세션 ID / 라이브
  로그 캡처" 표 참고.
- **`/goal` 명령 prompt 처리** — dry-run 확인. codex 바이너리 내장 슬래시
  명령이며 bd issue body 를 자동 context 화. supervisor 별도 조립 불필요.
- **pr-target-resolver / pr-reader / worker-prs / worker-pr-* 잔존 여부** —
  모두 제거. PR 정보는 `metadata.pr_url` + `metadata.pr_number` 로 통일.
  supervisor 가 job 종료 시 `gh pr list --search <issueId>` 1회 호출로 캐시
  (본문 "PR 데이터 흐름" 섹션).
- **default model / effort 저장 위치** — `bdui-config.toml` 의 `[worker]`
  섹션에 `default_model` (기본 `gpt-5.5`), `default_effort` (기본 `high`).
  toolbar dropdown 으로 사용자가 변경 가능. 2026-04-23 `bdui-config.toml`
  spec 의 처리 파이프라인을 그대로 재사용.
- **done lane 자동 정리 정책** — 시간 기준 파생 필터로 통일. toolbar 의
  done filter dropdown 이 `today` / `3` / `7` 중 하나를 선택하고, 그
  범위 안의 종료된 카드만 표시한다. 별도 자동 archive / cleanup 없음.
- **worker_lane=done 영속 vs 파생** — 파생 으로 확정. metadata 에
  `worker_lane=done` 을 쓰지 않는다. status / 마지막 job 결과만 보고
  자동 분류한다. 사용자가 done → inbox 로 drag 한 경우에만 그때
  `worker_lane=inbox` 를 명시 기록하여 done 파생에서 빠진다.

## 해결된 항목 (2026-05-14)

본 spec 초안의 `/goal` 단일 단계 흐름을 두 단계 파이프라인으로 갱신하면서
확정한 항목.

- **PR Finish 분리** — `codex exec /goal <issueId>` 는 PR Delivery (PR 생성)
  까지만 담당하고, PR Finish 는 별도 `codex exec /pr-finish <pr_number>` 로
  분리. CLAUDE.md 의 "PR Delivery 는 stop boundary; PR Finish 는 별도" 계약과
  정합. supervisor 가 두 단계를 자동으로 이어준다.
- **PR review-wait 5분 지연** — `/goal` succeeded 직후 바로 `/pr-finish` 를
  spawn 하지 않고 5분 (`bdui-config.toml [worker].pr_review_wait_ms`, 기본
  300000) 대기한다. 이유: Copilot / Gemini 코드 리뷰 봇이 PR 리뷰를 진행할
  시간을 확보하기 위함. 사용자는 `[Finish now]` 로 즉시 spawn 하거나
  `[Cancel auto pr-finish]` 로 이번 1회만 취소할 수 있다.
- **PR 미생성 시 자동 진행** — `/goal` succeeded 인데 `gh pr list` 결과가
  0건이면 main 직접 push/merge 로 간주하여 review-wait / `/pr-finish` 단계를
  건너뛰고 바로 큐 auto-advance 60초 카운트다운으로 진입한다.
- **parallel 카드의 두 단계 흐름** — parallel 카드도 동일하게 `/goal` → 5분
  review-wait → `/pr-finish` 파이프라인을 자기 타임라인으로 진행한다 (serial
  슬롯과 무관, 다른 카드 진행에 영향 없음).
- **serial slot 점유 범위** — progress lane 의 3개 sub-state (`goal_running`,
  `pr_review_wait`, `pr_finish_running`) 모두 같은 serial slot 을 공유 점유한다.
  즉 `/goal` 이 끝나도 슬롯은 풀리지 않고, `/pr-finish` 까지 완료해야 다음
  waiting 카드가 spawn 가능하다.
- **단계별 sub-state 와 단계별 session/job 메타데이터 분리** — `worker_last_job_id`,
  `worker_last_session_id` 한 쌍 대신 `worker_last_goal_*` / `worker_last_pr_finish_*`
  로 분리하여 디버깅 추적성을 확보. WS 이벤트도 `phase: "goal" | "pr_finish"`
  필드로 분기한다.
- **`/pr-finish` 단계 실패 처리** — `/goal` 실패와 동일하게 큐 정지. 카드는
  progress lane 의 `pr_finish_running` 상태로 남아 사용자 개입 대기.

## Execution lane

- **execution_lane**: `plan`
- **rationale**: 다수 신규 파일과 server-side queue scheduler 신설, WS 이벤트
  스키마 추가, drag-drop 인터랙션, child orchestration 등 design + 실행
  choreography 가 필요하다. spec 단독으로 single-PR 실행 권한이 충분하지 않다.
- **spec replaces plan?**: 아니오. 별도 `writing-plans` 단계에서 task 분해 및
  sequencing 을 작성한다.
- **child generation / logging policy**: plan 단계에서 task 분해. 본 spec 의
  파일 변경 계획은 plan 의 task 분해 입력으로 사용된다.

## 부록 — 큐 시나리오 예시

### 시나리오 1: 정상 흐름 (PR 생성됨)

```
state:
  serial slot: bd-A (sub-state=goal_running, parallel=false)
  parallel slot: bd-X (sub-state=goal_running, parallel=true)
  waiting: [#1 bd-B parallel=false, #2 bd-C parallel=true, #3 bd-D parallel=false]
  paused=false

bd-A /goal succeeded
  supervisor: gh pr list --search bd-A → PR #42 → metadata.pr_url, pr_number 캐시
  serial slot 유지 (bd-A 가 계속 점유)
  sub-state: goal_running → pr_review_wait, 5분 카운트다운 시작

5분 경과 (사용자 미개입)
  serial slot 유지 (bd-A 계속 점유)
  sub-state: pr_review_wait → pr_finish_running
  spawn: codex exec --json -m … "/pr-finish 42"

bd-A /pr-finish succeeded
  serial slot 해제
  queue auto-advance 60초 카운트다운 시작
  pick = #1 bd-B (sort_key 1000), spec 있음, serial 비어있음
  60초 만료 또는 Skip wait → spawn bd-B (sub-state=goal_running)
```

### 시나리오 2: PR 미생성 (직접 main push)

```
bd-A /goal succeeded
  gh pr list 결과 0건 → metadata.pr_url/pr_number 제거
  review-wait / /pr-finish 단계 건너뜀
  serial slot 해제
  queue auto-advance 60초 카운트다운 → 다음 카드 spawn
```

### 시나리오 3: review-wait 중 사용자 개입

```
bd-A pr_review_wait 03:30 / 05:00
  사용자 [Finish now] 클릭
  → 카운트다운 즉시 만료, /pr-finish spawn
```

```
bd-A pr_review_wait 02:00 / 05:00
  사용자 [Cancel auto pr-finish] 클릭
  → 자동 spawn 1회 취소, 카드는 pr_review_wait 상태 유지
  → 사용자가 [Run pr-finish] 클릭하기 전까지 멈춤
  → paused 토글과 별개 (전역 일시정지 아님)
```

### 시나리오 4: 단계 실패

```
bd-A /goal failed → 큐 정지, review-wait / /pr-finish 미발생
  카드는 progress lane 의 goal_running 상태로 남아 사용자 개입 대기

bd-A /pr-finish failed (예: CI fail, merge conflict)
  → 큐 정지. 카드는 progress lane 의 pr_finish_running 상태로 남음
  사용자가 PR 수정·재실행 후 재개해야 함
```

### parallel 카드

bd-X 는 위 모든 흐름을 자기 타임라인으로 진행한다 (`/goal` → 5분 review-wait →
`/pr-finish`). serial slot 과 무관하므로 bd-A 의 어느 단계와도 충돌하지 않고,
bd-X 종료가 큐 auto-advance 트리거가 되지 않는다 (auto-advance 는 serial slot
해제에만 연동).
