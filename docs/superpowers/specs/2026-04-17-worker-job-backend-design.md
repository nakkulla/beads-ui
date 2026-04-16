# Worker Jobs backend 도입 — durable supervisor + job management UI

## 문제 정의

현재 `beads-ui`의 Worker jobs 기능은 `server/worker/jobs.js` 안의 in-memory job manager가
`spawn('codex', ['exec', ...])`로 child process를 직접 띄우는 구조다. 이 구조는
Worker 탭의 첫 실행 UX를 빠르게 제공하는 데는 충분했지만, 실제 운영용 job manager로 쓰기에는
다음과 같은 한계가 있다.

1. **job 상태가 durable하지 않다**
   - job 목록이 메모리에만 존재하므로 `beads-ui` 서버 재시작 시 상태가 사라진다.
   - 이미 실행 중인 프로세스와 UI 상태를 다시 연결하는 recovery/reconcile 경로가 없다.

2. **job lifecycle 정보가 너무 얕다**
   - 현재 상태는 사실상 `queued`, `running`, `done`, `failed` 수준에 가깝다.
   - `started_at`, `finished_at`, `cancel_requested_at`, `exit_code`, `error_summary`, 최근 event 같은
     운영상 필요한 정보가 없다.

3. **취소(cancel)가 불가능하다**
   - 사용자는 Worker 탭에서 job을 시작할 수는 있지만, 실행 중 job을 중단하거나 상태를 관찰하는
     control plane 기능을 사용할 수 없다.

4. **로그와 최근 실행 맥락이 없다**
   - stdout/stderr를 durable하게 저장하지 않으므로, 실패 원인 확인이나 최근 실행 이력 조회가 어렵다.
   - UI에서 “지금 무엇이 돌고 있는지”, “얼마나 오래 돌았는지”, “왜 실패했는지”를 충분히 설명할 수 없다.

5. **web server가 실행 owner 역할까지 떠안고 있다**
   - 현재 구조에서는 `beads-ui` 웹 서버가 API, UI, job ownership, process lifecycle을 함께 담당한다.
   - job manager를 키울수록 하나의 프로세스에 책임이 과도하게 집중된다.

## 목표

- Worker jobs의 source of truth를 **durable backend**로 옮긴다.
- `beads-ui` 서버 재시작 후에도 active job을 계속 추적할 수 있어야 한다.
- Worker 탭에서 실행 중 job의 **status / elapsed time / recent history / log preview / cancel**을 제공한다.
- cancel은 **graceful → timeout → force** 순서를 따르는 공통 정책으로 제공한다.
- 동일 workspace/issue/PR 대상에 대한 active job 중복 실행을 방지한다.
- 첫 버전은 **로컬 단일 사용자 환경**을 기본 전제로 한다.

## 비목표

다음 항목은 이번 설계 범위에서 의도적으로 제외한다.

- 머신 재부팅 후 resume/restart 보장
- multi-user 권한 모델
- websocket/SSE 기반 push 상태 전송
- queue priority / concurrency tuning UI
- workflow별 정교한 cancel hook (`bd-ralph-v2` 전용 cleanup orchestration 등)
- full transcript viewer
- retry policy / retry button
- `tmux`를 기본 runner로 채택하는 것

`tmux`는 향후 optional attach/debug layer로 붙일 수 있지만, 첫 버전의 중심 설계는 아니다.

## 현재 상태

현재 구현은 다음과 같은 구조다.

- `server/routes/worker-jobs.js`
  - `GET /api/worker/jobs`
  - `POST /api/worker/jobs`
- `server/worker/jobs.js`
  - in-memory array 기반 job manager
  - `spawn('codex', ['exec', '$bd-ralph-v2 ...'])` 또는 `spawn('codex', ['exec', '$pr-review ...'])`
  - `error`/`close` event를 받아 `running` → `done`/`failed` 정도만 갱신
- `app/main.js`
  - Worker 탭 active 시 3초 polling
- `app/views/worker-detail.js`
  - 현재 parent 기준 active badge 정도만 보여줌

즉, 첫 버전 Worker 탭은 “실행 버튼 + 얕은 상태 표시” 수준이고,
job lifecycle과 운영 제어는 아직 별도 시스템으로 분리되어 있지 않다.

## 결정 요약

### 선택한 방향

**repo-local companion supervisor를 도입하고, Worker jobs의 durable source of truth를
supervisor + SQLite job store로 옮긴다.**

이 구조에서:

- `beads-ui`는 **control plane UI + API gateway** 역할을 한다.
- 별도 supervisor 프로세스가 **job lifecycle owner** 역할을 한다.
- SQLite가 job metadata와 lifecycle event를 durable하게 저장한다.
- 첫 버전 runner는 detached local process를 기본으로 하며,
  optional `tmux` attach/debug layer는 향후 확장 지점으로 남긴다.

### 왜 이 방향인가

- job 생존성을 `beads-ui` 서버 lifecycle과 분리할 수 있다.
- cancel / recovery / elapsed time / log / history 기능을 구조적으로 추가하기 쉽다.
- Worker UI를 확장해도 web server가 process owner까지 떠안지 않게 된다.
- 장기적으로 `spawn`, `tmux`, 또는 다른 local runner로 확장하더라도 UI/API 경계를 유지할 수 있다.

## 설계

## 1. 아키텍처

### 1.1 구성요소

첫 버전의 Worker jobs backend는 세 구성요소로 나눈다.

1. **`beads-ui` web server**
   - 브라우저 UI 제공
   - Worker jobs HTTP API 제공
   - workspace/command/request validation 담당
   - supervisor 호출 및 UI-friendly response shaping 담당
   - job의 source of truth를 직접 보유하지 않음

2. **repo-local companion supervisor**
   - 같은 repo 환경에서 실행되는 별도 로컬 프로세스
   - job enqueue / cancel / reconcile / log / event 기록 담당
   - 실제 runner process의 owner 역할

3. **durable job store (SQLite)**
   - job row, lifecycle events, cancel metadata, log path 저장
   - 서버 재시작 후 state recovery의 기준점 역할

### 1.1.1 repo-local state 경로

첫 버전 backend state는 repo root 아래의 hidden 디렉터리에 둔다.

- state root: `.bdui/worker-jobs/`
- SQLite DB: `.bdui/worker-jobs/jobs.sqlite`
- log dir: `.bdui/worker-jobs/logs/`

이 경로는 다음 성질을 만족해야 한다.

- repo-local companion이라는 설계 의도와 맞게 repo 단위로 분리된다.
- `git` tracked artifact가 아니므로 `.gitignore`에 포함한다.
- `beads-ui` 서버와 supervisor가 동일한 canonical 경로를 공유하기 쉽다.

### 1.2 경계 원칙

- **truth source는 supervisor + SQLite**다.
- `beads-ui`의 메모리 상태는 어디까지나 cache/view-model이며 authoritative source가 아니다.
- `beads-ui`가 내려가더라도 active job은 계속 돌 수 있어야 한다.
- supervisor가 내려간 뒤 다시 올라오면 SQLite와 실제 process 상태를 reconcile해야 한다.

### 1.3 실행 흐름

1. 사용자가 Worker 탭에서 `Run bd-ralph-v2` 또는 `Run pr-review` 클릭
2. `beads-ui`가 요청 유효성 검사 후 supervisor에 job create 요청
3. supervisor가 conflict 검사 후 SQLite에 `queued` job row와 `job.created` event 기록
4. supervisor가 detached runner process 시작
5. status를 `starting` 또는 `running`으로 전이하고 `job.started` event 기록
6. `beads-ui`는 polling으로 상태를 읽어 row/detail에 반영
7. 사용자가 cancel 클릭 시 `beads-ui` → supervisor cancel 요청
8. supervisor가 `graceful → timeout → force` 순서로 종료 시도 후 final state 기록

### 1.4 supervisor lifecycle

첫 버전 supervisor는 **repo-local companion daemon**으로 동작한다.

- 기본 원칙: `beads-ui`가 직접 job owner가 되지 않는다.
- `beads-ui`는 Worker jobs API 요청을 처리하기 전에 supervisor health를 확인한다.
- supervisor가 떠 있지 않으면 `beads-ui`가 repo-local companion을 자동 기동하고 재시도한다.
- supervisor가 이미 떠 있으면 그 인스턴스에 재연결한다.

즉, 사용자 입장에서는 Worker 탭이 job manager를 제공하지만,
실제 실행 ownership은 항상 companion supervisor에 있다.

## 2. 데이터 모델

### 2.1 jobs 테이블

첫 버전 `jobs` row는 최소 아래 필드를 가진다.

- `id`
- `command` (`bd-ralph-v2` | `pr-review`)
- `issue_id` nullable
- `pr_number` nullable
- `workspace_path`
- `status`
- `runner_kind` (`process` 기본)
- `pid` nullable
- `started_at`
- `finished_at` nullable
- `cancel_requested_at` nullable
- `grace_deadline_at` nullable
- `exit_code` nullable
- `log_path`
- `last_heartbeat_at` nullable
- `created_by` nullable
- `error_summary` nullable

UI에서 바로 쓰기 좋은 derived field는 API 레이어에서 계산한다.

- `elapsed_ms`
- `is_cancellable`
- `final_result` (`succeeded` | `failed` | `cancelled`)
- `display_stage` optional

### 2.2 상태 모델

첫 버전 canonical job 상태는 아래처럼 단순화한다.

- `queued`
- `starting`
- `running`
- `cancelling`
- `succeeded`
- `failed`
- `cancelled`
- `unknown`

`unknown`은 recovery/reconcile 과정에서만 짧게 사용하는 복구용 상태다.

### 2.3 cancel 메타데이터

cancel은 별도 boolean보다 **상태 + 시각 필드**로 표현한다.

- 사용자가 cancel 요청
- `cancel_requested_at` 기록
- 상태를 `cancelling`으로 전이
- `grace_deadline_at` 계산
- deadline 전 종료되면 `cancelled`
- deadline 초과 후 force kill되면 `cancelled` 또는 failure reason에 따라 `failed`

### 2.4 elapsed time 계산

elapsed time은 timestamp 기반으로 계산한다.

- active 상태(`starting`, `running`, `cancelling`)에서는 `now - started_at`
- final state에서는 `finished_at - started_at`

즉, elapsed 자체를 지속적으로 DB에 기록하지 않고 API/UI에서 파생 계산한다.

### 2.5 job_events 테이블

별도의 `job_events` 테이블을 둔다.

최소 컬럼:
- `id`
- `job_id`
- `event_type`
- `created_at`
- `payload_json`

예상 event type:
- `job.created`
- `job.started`
- `job.cancel_requested`
- `job.grace_timeout`
- `job.killed`
- `job.exited`
- `job.reconciled`
- `job.failed`

이벤트 테이블은 첫 버전 UI에서 전부 노출하지 않더라도,
최근 이력/디버깅/감사 추적의 기반으로 유지한다.

### 2.6 active conflict 규칙

같은 대상의 active job 중복 실행을 막는다.

- 같은 `workspace_path + issue_id`에 active job이 있으면 새 job 생성 거부
- 같은 `workspace_path + pr_number`에 active job이 있으면 새 job 생성 거부
- final state(`succeeded`, `failed`, `cancelled`)는 충돌 검사에서 제외

## 3. API와 supervisor 인터페이스

## 3.1 UI-facing API (`beads-ui`)

첫 버전 `beads-ui`는 아래 API를 제공한다.

- `GET /api/worker/jobs?workspace=/absolute/path/to/workspace`
  - workspace 기준 job 목록
  - 최신순 정렬
  - row 표시용 상태/elapsed/isCancellable 포함

- `GET /api/worker/jobs/:jobId`
  - selected job 상세
  - 최근 event 일부, error summary, log preview metadata 포함

- `POST /api/worker/jobs`
  - job create 요청
  - body 예:
    ```json
    { "command": "bd-ralph-v2", "issueId": "dotfiles-fzn", "workspace": "/repo" }
    ```

- `POST /api/worker/jobs/:jobId/cancel`
  - cancel request accepted 여부, grace deadline 반환

- `GET /api/worker/jobs/:jobId/log?tail=200`
  - 최근 N줄 tail 반환

첫 버전은 polling 기반으로 충분하며 websocket/SSE는 도입하지 않는다.

## 3.2 `beads-ui` ↔ supervisor 인터페이스

첫 버전은 **local HTTP** 기반 supervisor 인터페이스를 채택한다.

이유:
- 로컬 단일 사용자 환경에서 구현/디버깅이 단순하다.
- component 경계를 명확히 유지할 수 있다.
- health/status endpoint를 자연스럽게 추가할 수 있다.

제약:
- loopback/local-only bind를 사용한다.
- 외부 네트워크에서 직접 접근 가능한 public service로 설계하지 않는다.

## 3.3 create 흐름

1. `beads-ui`가 workspace/command/body 검증
2. supervisor가 conflict 검사
3. SQLite에 `queued` row + `job.created` event 기록
4. detached runner process 시작
5. pid 확보 후 status를 `starting`/`running`으로 전이
6. `job.started` event 기록
7. `beads-ui`는 accepted 응답을 받고 polling으로 이후 상태를 읽는다

create는 synchronous completion이 아니라 **accepted/queued semantics**로 본다.

## 3.4 cancel 흐름

cancel 정책은 **graceful → timeout → force**로 고정한다.

1. UI에서 cancel 요청
2. supervisor가 active job인지 확인
3. `cancel_requested_at` 기록, `status=cancelling`
4. runner에 graceful stop 신호 전달
5. `grace_deadline_at` 설정
6. deadline 전 종료되면 `cancelled`
7. deadline 초과 시 force kill
8. final state와 관련 event 기록

첫 버전은 workflow-specific cancel hook 없이 공통 cancel policy만 제공한다.

## 3.5 recovery / reconcile 흐름

서버 재시작 후에도 job을 추적해야 하므로 reconcile은 필수다.

### `beads-ui` 재시작

- `beads-ui`는 다시 떠도 supervisor 상태를 읽기만 하면 된다.
- `beads-ui` 자체는 job owner가 아니므로 추가 recovery가 필요 없다.

### supervisor 재시작

startup 시:

1. SQLite에서 final state가 아닌 job 조회
2. 각 job의 pid/process 상태 확인
3. 살아 있으면 `running`/`cancelling` 상태 복구
4. 죽었으면 `failed` 또는 `unknown` 처리 후 정리
5. `job.reconciled` event 기록

## 3.6 로그 수집

첫 버전부터 stdout/stderr를 durable하게 저장한다.

- runner stdout/stderr를 `log_path` 파일에 append
- job row에는 `log_path`만 저장
- UI는 tail endpoint로 최근 일부만 읽음

첫 버전 목표는 full transcript viewer가 아니라 **plain text log + tail API**다.

## 4. Worker UI 변경

## 4.1 parent row

parent row는 실행 가능 여부뿐 아니라 active job 상태를 직접 보여줘야 한다.

추가 요소:
- active job status chip (`Queued`, `Starting`, `Running`, `Cancelling`)
- elapsed time (`4m 12s` 등)
- recent failure가 있으면 작은 `Failed` badge
- active job이 있을 때 `Run ...` 대신 또는 함께 `View job`, `Cancel` action 제공

목표는 row만 보고도 다음을 파악하는 것이다.

- 지금 돌고 있는가
- 얼마나 오래 돌았는가
- 바로 취소 가능한가

## 4.2 detail panel

Worker detail panel은 job management의 중심이 된다.

추가 구성:

1. **Current Job card**
   - command
   - status
   - elapsed
   - started time
   - workspace
   - cancel button
   - log 보기 버튼

2. **Recent Jobs list**
   - 최근 실행 이력
   - status / started_at / duration / result
   - row 클릭 시 상세 보기

3. **Job detail subpanel**
   - selected job metadata
   - 최근 event 요약
   - log tail preview
   - error summary

## 4.3 workspace summary

Worker 탭 상단 또는 detail 상단에 workspace-wide summary를 둔다.

예:
- `1 running`
- `2 queued`
- `1 cancelling`
- `3 failed today`

첫 버전은 counts summary만 제공하고, workspace-wide full jobs pane은 후속 확장으로 둔다.

## 4.4 cancel UX

cancel은 상태가 명확하게 보이는 것이 중요하다.

- `Cancel` 클릭 시 lightweight confirm
- confirm 후 즉시 `Cancelling…` 반영
- grace 기간 동안 cancel 버튼 비활성
- force kill까지 간 경우 detail의 event/log에서 단서를 확인할 수 있어야 함

## 4.5 log UX

첫 버전은 full transcript viewer를 만들지 않는다.

대신 detail panel에:
- 최근 50~200줄 tail preview
- `Open full log`
- `Copy log path`

정도를 제공한다.

## 4.6 polling 정책

첫 버전은 polling을 유지한다.

- Worker 탭 active일 때만 polling
- active job이 있으면 2~3초 주기
- active job이 없으면 더 느린 주기 또는 selection 변화 시 재조회
- create/cancel 직후는 즉시 refresh

## 5. rollout 전략

구현은 3단계 rollout을 전제로 한다.

### Phase 1 — backend foundation

- supervisor skeleton
- SQLite schema
- create/list/detail/log API
- detached runner start
- startup reconcile

### Phase 2 — cancel + UI integration

- cancel endpoint
- graceful/force timeout 처리
- row/detail active job 표시
- elapsed time 표시
- recent jobs/log preview 연결

### Phase 3 — polish

- error summary 개선
- recovery edge case 정리
- optional `tmux` attach/debug hook을 위한 확장 지점 정리

## 6. 에러 처리 원칙

이 기능은 실패하더라도 **상태를 거짓으로 말하면 안 된다.**

핵심 원칙:

1. create accepted 전에는 `running`처럼 보이면 안 된다.
2. cancel accepted 전에는 `cancelling`를 확정하지 않는다.
3. reconcile 실패는 조용히 숨기지 않고 `unknown` 또는 오류 단서로 드러낸다.
4. log 조회 실패와 execution state를 혼동하지 않는다.
5. UI는 active/final/unknown 상태를 명확히 구분한다.

## 7. 테스트 전략

### 7.1 supervisor 단위 테스트

- job create 시 row/event 생성
- active conflict 검사
- status transition
- cancel transition
- reconcile logic
- final result classification

### 7.2 runner integration 테스트

- dummy long-running process 실행
- graceful cancel 성공
- timeout 후 force kill
- exit code 반영
- log file append 확인

### 7.3 API 테스트

- create/list/detail/cancel/log routes
- workspace validation
- invalid state cancel rejection
- tail 파라미터 처리

### 7.4 UI 테스트

- row에 running/cancelling/elapsed 표시
- detail에서 current/recent jobs 렌더
- cancel 버튼 상태 변화
- polling 결과 반영
- active job 시 action disable 규칙

### 7.5 end-to-end smoke

- job 생성
- running 상태 확인
- elapsed 증가 확인
- cancel 요청
- cancelled 전이 확인
- log tail 노출 확인

## 수용 기준

다음 조건을 만족하면 이번 설계의 구현 목표가 달성된 것으로 본다.

1. `bd-ralph-v2` 또는 `pr-review` job을 Worker UI에서 실행할 수 있다.
2. `beads-ui` 서버 재시작 후에도 active job이 계속 추적된다.
3. Worker row와 detail에서 job status와 elapsed time이 보인다.
4. UI에서 cancel 요청을 보낼 수 있다.
5. cancel은 graceful → timeout → force 규칙을 따른다.
6. 최근 로그 일부와 최근 job 이력을 UI에서 볼 수 있다.
7. 동일 대상 중복 실행이 방지된다.
