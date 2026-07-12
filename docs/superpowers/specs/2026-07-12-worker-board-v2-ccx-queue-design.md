# Worker 보드 v2: ccx 기반 머지까지 자동 큐 (UI-ufkg)

## 목적

Worker 탭을 카드형 lane 보드로 재설계하고, 실행 엔진을 `ccx`(claude-code-proxy
경유 Claude Code headless, Codex 백엔드) 2단계 파이프라인으로 교체한다. 사용자가
waiting 큐에 올린 parent Bead 들을 **머지 완료가 검증될 때까지** 무인 실행하고,
검증 통과 시 다음 작업을 자동 시작한다.

본 spec 은 [2026-05-13 spec](2026-05-13-worker-board-redesign-design.md)
(UI-l3c3, PR #16 미머지) 을 **supersede** 한다. 폐기 사유: 실행 러너 변경, 완료
기준 변경(PR Delivery → 머지 검증), 병렬 분석 추가, 2개월 경과. **승계 규칙은
두지 않는다** — 본 문서가 lane/큐/전이/복구의 유일한 권위이며, 구 spec 참조는
배경 설명 용도로만 쓴다.

## 결정 근거 (2026-07-12 dry-run 실측)

| ID | 검증 항목 | 결과 |
| --- | --- | --- |
| D-1 | `ccx -p --output-format stream-json --verbose --model opus` | exit 0. `system/init` 에 `session_id`(UUID) + `model: gpt-5.6-sol` — alias 매핑 검증 |
| D-2 | `result` 이벤트 필드 | `subtype`, `is_error`, `stop_reason`, `permission_denials`, `terminal_reason`, `api_error_status`, `num_turns`, `usage` 존재 |
| D-3 | 사용자 훅 이벤트 혼입 | `system/hook_started`, `hook_response`, `thinking_tokens` 가 stdout JSONL 에 섞임 |
| D-4 | `ccx -p "/goal"` | **Claude Code 의 `/goal` 은 조건 설정 명령** (`No goal set. Usage: /goal <condition>`). Codex 의 `/goal <이슈>` 실행 의미가 **아니다** → 단계1 명령 재설계 필요 |
| D-5 | `ccx -p "/pr-finish"` (인자 없음) | 슬래시 스킬 호출은 **인식·실행됨**. 그러나 인자가 없으면 스킬이 `find` 로 **사용자 실제 repo 를 스스로 탐색**해 라이브 PR 워크트리에서 `git merge` 를 실행함(실측, 이후 `git merge --abort` 로 복구). → 인자 없는 호출 금지 + 실행 격리가 **필수 안전 요건** |
| D-6 | `--permission-mode` 선택지 | `acceptEdits`, `auto`, `bypassPermissions`, `manual`, `dontAsk`, `plan` |

D-5 는 본 설계의 격리·결정성 요구사항의 실증 근거다.

## 비목표

- NAS 인스턴스에서의 worker 실행 (조회 전용).
- child 이슈 단위 실행 (parent 세션이 일괄 진행).
- PR 없이 main 직접 push 로 끝나는 작업 흐름 (완료 = 머지 검증이므로 지원하지
  않는다; 그런 Bead 는 큐 대상이 아니다).
- 큐 다중 우선순위 (FIFO + sort_key 만).
- 병렬 분석 hint 의 자동 `worker_parallel` 설정 (hint 는 표시 전용).
- fast-track 무인 모드 계약 본문 (`dotfiles-10zx` 소유).
- 샌드박스 수준의 실행 격리 (worktree 격리이지 OS 샌드박스가 아니다).

## 실행 격리 (안전 기반)

**모든 잡은 전용 git worktree 에서 실행한다. 공유 체크아웃에서 실행하지 않는다.**

- 잡 시작 시 `<workspace>/.worktrees/<bead-id>` 를 브랜치 `<bead-id>` 로 생성
  (이미 있으면 재사용, 잠긴/더러운 상태면 loud-fail).
- 세션 cwd = 해당 worktree. 사용자의 main 체크아웃과 다른 잡의 worktree 는 다른
  경로이므로 index/HEAD 공유가 없다 → `worker_parallel=true` 카드의 동시 실행이
  구조적으로 안전하다.
- 단계2(`/pr-finish`) 도 같은 worktree 에서, **명시적 PR 번호 인자와 함께만**
  실행한다 (D-5).
- 머지 검증 통과 후 worktree 제거 + 브랜치 정리. 실패 시 worktree 를 남기고
  카드에 경로를 표시한다 (사람이 조사할 수 있도록).

## 배치 / 런타임 토폴로지

- **Mac Studio 로컬 worker 인스턴스**: `127.0.0.1:3002`, 중앙 dolt(3307) 직결.
  projectmgr 서비스 등록과 fleet manifest 는 **`dotfiles-7xcx`** 가 소유한다.
- NAS 인스턴스는 조회 전용. `[worker].enabled` 게이트의 범위:
  - `enabled=false`: 보드 **렌더링과 읽기 API 는 정상 동작** (lane 분류, 카드,
    children, hint 배지 표시). 큐/실행 **mutation·spawn API 는 403**
    (lane 이동, 큐 순서, pause/resume, 분석 실행, 잡 spawn/cancel).
  - `enabled=true`: 전체 기능. Mac 인스턴스만 true.
- supervisor 기동 preflight (하나라도 실패 → 보드 경고 배너 + 실행 차단):
  1. claude-code-proxy `GET /healthz` 200
  2. `ccx` 실행 파일 존재
  3. `gh auth status` 성공
  4. `pr-finish` 스킬 설치 (`~/.claude/skills/pr-finish/`)
  5. **capability sentinel**: fast-track 계약 버전
     (`workflow.yaml` 의 `worker_fasttrack_contract_version`) ≥ `1`.
     미설치/구버전이면 실행 차단 — 배포 순서를 문서 제약이 아니라 기계 게이트로
     강제한다 (계약 키 정의는 `dotfiles-10zx` 소유).

## Lane 모델

| Lane | 정의 | 입주 조건 |
| --- | --- | --- |
| `inbox` | 모든 active parent (open/in_progress, epic/feature/task) | 자동 (기본 lane) |
| `waiting` | 자동 실행 대기 큐 | `spec_id` + `worker_queue_sort_key` + **유효한 merge-consent 마커** |
| `progress` | 파이프라인 실행 중 | active job 또는 review-wait 타이머 |
| `done` (파생) | 최근 종료 카드 | `status in (resolved, closed)` 또는 마지막 job terminal. toolbar filter `today`(기본)/`3`/`7` |

- lane 우선순위: `progress` > `waiting` > `inbox`(명시) > `done`(파생) >
  `inbox`(기본). `done` 은 metadata 에 저장하지 않는다.
- **parent 카드만 표시**. children 은 `▸` 펼치기로만, 카드에는 진행률
  (`resolved+closed`/전체) 만.

## 머지 동의 모델 (versioned consent)

큐잉 = 머지 자동 진행 동의이지만, **동의는 저장 상태에서 검증 가능해야 한다.**

- UI 가 카드를 waiting/progress 로 올릴 때 API 가
  `worker_merge_consent = "v1|<ISO8601>|<attempt_id>"` 를 기록한다.
- 스케줄러는 **현재 계약 버전(`v1`)과 현재 `worker_attempt_id` 가 일치하는
  consent 마커**가 있을 때만 실행한다. 불일치/부재 → 카드를 inbox 로 격리하고
  실행하지 않는다.
- **레거시 격리**: 기존 `worker_*` lane/sort_key 키가 남아 있어도 consent 마커가
  없으면 자동 큐잉되지 않는다 (마이그레이션 시 재동의 필요). 보드 밖에서 쓰인
  metadata 가 자동 머지 권한으로 해석되는 경로를 차단한다.
- 잡이 terminal 상태가 되면 consent 마커를 제거한다 (재큐잉 시 새 동의 필요).

## 실행 파이프라인

```
waiting head → worktree 준비 (.worktrees/<bead-id>, 브랜치 <bead-id>)
            → 단계1: ccx 무인 세션 (프롬프트 템플릿, PR 생성까지)
            → PR 결정적 조회 (--head <bead-id>)
            → 봇 리뷰 대기 (기본 5분)
            → 단계2: ccx "/pr-finish <pr_number>"
            → 머지 postcondition 검증
            → 통과 시 60초 카운트다운 → 다음 waiting head
```

### 단계 1 명령 (D-4 반영: 슬래시 아님, 서버 소유 프롬프트)

```bash
BDUI_WORKER=1 \
BDUI_WORKER_CONTRACT=v1 \
CLAUDE_CODE_EFFORT_LEVEL=<effort> \
  ccx -p --output-format stream-json --verbose \
      --model <opus|sonnet|haiku> \
      --permission-mode bypassPermissions \
      "<STAGE1_PROMPT>"
# cwd = <workspace>/.worktrees/<bead-id>
```

`STAGE1_PROMPT` 템플릿 (서버 소유, beads-ui repo 에서 버전 관리):

```text
[BDUI_WORKER v1 무인 실행 세션]
대상 Bead: <issueId>
작업 디렉터리: 이 세션의 cwd (전용 worktree, 브랜치 <issueId>)

지시:
- workflow 스킬 라우팅을 따라 이 Bead 를 구현하고 PR 생성까지 완료한다.
- 무인 세션이므로 사용자에게 질문하지 않는다. 선택이 필요하면 계약의 문서화된
  기본값을 쓴다 (finish = PR).
- 진행 불가 blocker 를 만나면 임의 판단으로 우회하지 말고 즉시 실패로 종료한다.
- 이 worktree 밖의 경로, 다른 worktree, 다른 repo 를 수정하지 않는다.
- 머지하지 않는다. PR 생성까지가 이 세션의 범위다.

완료 조건: 브랜치 <issueId> 가 push 되고 그 브랜치를 head 로 하는 PR 이 존재한다.
```

- 모델: `metadata.worker_model`(alias `sol`/`terra`/`luna`) → toolbar default →
  `sol`. runner 가 CLI 인자로 변환: `sol→opus`, `terra→sonnet`, `luna→haiku`
  (D-1 로 alias→백엔드 매핑 검증).
- effort: `metadata.worker_effort` → toolbar default → `high`. env 로 잡 단위
  지정 (전역 settings.json 오염 금지).
- **권한 모드**: `bypassPermissions`. 근거: 무인 세션에서 미허용 도구는 자동
  거부되어 작업이 조용히 실패하므로 무인 자동화와 양립하지 않는다. 안전은 권한
  프롬프트가 아니라 **worktree 격리 + preflight + 프롬프트 범위 제약 + 머지
  postcondition 검증**으로 확보한다. 이것이 OS 샌드박스가 아님을 비목표에 명시.

### 단계 2 명령 (D-5 반영: 명시적 PR 번호 필수)

```bash
BDUI_WORKER=1 BDUI_WORKER_CONTRACT=v1 CLAUDE_CODE_EFFORT_LEVEL=<effort> \
  ccx -p --output-format stream-json --verbose \
      --model <...> --permission-mode bypassPermissions \
      "/pr-finish <pr_number>"
# cwd = 같은 worktree
```

- `<pr_number>` 가 없으면 **spawn 자체를 거부한다** (D-5: 인자 없는 pr-finish 는
  대상을 스스로 탐색해 무관한 라이브 상태를 변경한다).
- 두 단계는 같은 model/effort 를 공유한다.

### PR 결정적 조회 (finding: PR 식별 비결정성)

단계1 종료 후:

```bash
gh pr list --repo <owner>/<repo> --head <bead-id> --state open \
           --json number,url,headRefOid,baseRefName,state
```

- 브랜치명을 우리가 생성했으므로 `--head` 로 **결정적 조회**한다
  (`--search` 금지 — 오탐/무관 PR 위험).
- 조회 **오류**(네트워크/인증/rate limit): 지수 백오프 3회 재시도 → 그래도
  실패하면 **loud-fail + 큐 정지**. 0건과 구분한다.
- **0건**: 단계1 이 완료 조건(PR 존재)을 만족하지 못한 것 → **잡 실패, 큐 정지**.
  "main 직접 push 로 간주하고 진행"하지 않는다.
- **다건**: 같은 head 브랜치에 open PR 이 2개 이상인 비정상 상태 → loud-fail
  (첫 항목 임의 선택 금지).
- 1건: `headRefOid` 가 로컬 브랜치 tip 과 일치하는지 확인 후
  `pr_url`/`pr_number`/`pr_head_sha` 캐시.

### 머지 postcondition 검증 (finding: 완료 판정 증명 부재)

단계2 성공 후, 다음을 **모두** 통과해야 카드가 완료되고 큐가 진행한다:

1. `gh pr view <n> --json state,mergedAt,mergeCommit` → `state == "MERGED"`.
2. `git fetch origin <base>` 후
   `git merge-base --is-ancestor <mergeCommit> origin/<base>` → 0.
3. `bd show <bead-id> --json` → `status in (resolved, closed)`.
4. worktree 정리 가능 (미커밋 변경 없음).

하나라도 실패 → 잡 실패, 큐 정지, worktree 보존, 카드에 실패 사유 표시.

### stream-json 성공 판정 (D-2/D-3 반영)

- **stdout 만** JSONL 로 파싱한다. stderr(ccx 배너 포함)는 로그 파일에만 남기고
  판정에 쓰지 않는다.
- 성공 조건 (**전부** 충족):
  - 프로세스 exit code 0
  - stdout 에 `type=="result"` 이벤트가 **정확히 1개**
  - `subtype == "success"` && `is_error == false`
  - `stop_reason` ∈ allowlist `{"end_turn"}`
  - `permission_denials == []`
  - `api_error_status` 없음
- `result` 누락/복수/malformed JSON → **실패** (성공으로 오인 금지).
- 무시 이벤트: `system/hook_*`, `system/thinking_tokens` (D-3).
- 로그 라인: `assistant` 이벤트의 text 블록 최신 1줄.
- 세션 ID: `system/init` 의 `session_id`.

## 단계 상태와 원자성 (finding: atomicity/idempotency 부재)

durable 필드: `worker_attempt_id`(UUID), `worker_phase`.

`worker_phase` 값: `queued` → `worktree_ready` → `goal_starting` →
`goal_running` → `pr_linked` → `pr_review_wait` → `pr_finish_starting` →
`pr_finish_running` → `verifying` → `done` | `failed`.

- **write-ahead**: 모든 spawn 전에 `worker_phase=*_starting` 과
  `worker_attempt_id` 를 먼저 기록하고 readback 한다. 기록 실패 시 spawn 하지
  않는다.
- **CAS**: 상태 전이는 read → expected 값 비교 → write → readback. 타이머 만료와
  `[Finish now]` 버튼이 경합해도 `pr_review_wait → pr_finish_starting` CAS 승자만
  spawn 하고 패자는 no-op → **중복 `/pr-finish` 불가**.
- **idempotency key**: `<bead-id>:<attempt_id>:<phase>`. job-store 에 이미 있는
  키로는 spawn 하지 않는다.
- **crash reconciliation** (supervisor 재시작 시 phase 별):
  - `*_starting`: 대응 프로세스 존재 여부 확인 → 없으면 `failed` + 큐 정지.
  - `goal_running` / `pr_finish_running`: 기록된 pid+start_time 이 살아있으면
    process group 을 kill 하고 종료를 확인한 뒤 `failed`; 없으면 바로 `failed`.
    어느 경우든 **큐 정지**.
  - `pr_review_wait`: `worker_pr_review_wait_started_at` 기준 잔여 시간으로 타이머
    복원 (만료됐으면 즉시 단계2 spawn; `cancelled` 면 사용자 액션 대기).
  - `verifying`: postcondition 검증을 처음부터 재실행 (멱등).

## 프로세스 생명주기 / durable halt (finding: detached child, 메모리 halt)

- spawn 은 **자체 process group** 으로 실행하고 supervisor 가 pid + start_time 을
  durable 기록한다 (pid 재사용 오판 방지). detached-unref 로 방치하지 않는다.
- cancel/kill 은 process group 전체(`kill(-pgid)`)에 보내고 **종료를 확인**한다.
- **큐 정지 상태는 durable** (`.bdui/worker-jobs/queue-state.json` 의
  `halted: true` + 사유 + 시각). supervisor 재시작으로 자동 해제되지 않으며,
  **사람이 명시적으로 Resume** 해야 큐가 다시 진행한다. 실패 후 재시작만으로
  대기 카드가 자동 실행되는 경로를 차단한다.

## 권위 전이 표 (승계 없음)

| 현재 | 이벤트 | 다음 lane/phase | serial slot | 큐 |
| --- | --- | --- | --- | --- |
| waiting head | 조건 충족 + 60초 만료 | progress / `goal_starting` | 점유(비parallel) | 진행 |
| `goal_running` | 성공 + PR 1건 | `pr_review_wait` | 유지 | 대기 |
| `goal_running` | 성공 + PR 0건/다건/조회오류 | `failed` → done | 해제 | **정지** |
| `goal_running` | 실패/취소/kill | `failed` → done | 해제 | **정지** |
| `pr_review_wait` | 타이머 만료 또는 `[Finish now]` (CAS 승자) | `pr_finish_starting` | 유지 | 대기 |
| `pr_review_wait` | `[Cancel auto pr-finish]` | `pr_review_wait(cancelled)` | **유지(무기한)** | 대기 |
| `pr_review_wait(cancelled)` | `[Run pr-finish]` | `pr_finish_starting` | 유지 | 대기 |
| `pr_review_wait(cancelled)` | `[Cancel job]` | `failed` → done | 해제 | **정지 아님**(사용자 명시 액션) → auto-advance |
| `pr_finish_running` | 성공 | `verifying` | 유지 | 대기 |
| `pr_finish_running` | 실패/취소/kill | `failed` → done | 해제 | **정지** |
| `verifying` | postcondition 전부 통과 | `done` (worktree 제거) | 해제 | **auto-advance** |
| `verifying` | 하나라도 실패 | `failed` → done (worktree 보존) | 해제 | **정지** |

- **auto-advance 트리거**: non-parallel 카드의 serial slot 해제 + 정상 종결
  (`verifying` 통과 또는 `[Cancel job]`). **parallel 카드의 종료는
  auto-advance 를 트리거하지 않는다.**
- auto-advance 는 strict FIFO: waiting head 만 평가한다. head 가 non-parallel 이고
  slot 이 점유 중이면 뒤의 parallel 카드를 건너뛰어 실행하지 않는다.
- head 평가 조건: 큐 미정지 + `spec_id` + 유효 consent + (parallel 이거나 slot
  비어있음). 미충족 시 사유를 broadcast 하고 대기한다.

## Beads metadata 스키마

| Key | Value | 비고 |
| --- | --- | --- |
| `worker_lane` | `inbox`\|`waiting`\|`progress` | `done` 은 파생 |
| `worker_queue_sort_key` | 정수 문자열 | 최초 max+1000, 사이 평균, 충돌 시 lane rebalance |
| `worker_parallel` | `true`\|`false` | 기본 false, 수동 확정 |
| `worker_merge_consent` | `v1\|<ISO8601>\|<attempt_id>` | 없으면 큐 진입 불가 |
| `worker_attempt_id` | UUID | 큐잉마다 새로 발급 |
| `worker_phase` | 위 phase enum | write-ahead + CAS |
| `worker_model` / `worker_effort` | `sol`\|`terra`\|`luna` / `low`\|`medium`\|`high` | 미설정 시 전역 default |
| `worker_worktree_path` | 경로 | 실패 시 조사용으로 보존 |
| `worker_last_goal_job_id` / `worker_last_goal_session_id` | string | |
| `worker_last_pr_finish_job_id` / `worker_last_pr_finish_session_id` | string | |
| `worker_pr_review_wait_started_at` / `worker_pr_review_wait_cancelled` | ISO8601 / `true` | |
| `pr_url` / `pr_number` / `pr_head_sha` | string | `--head` 결정적 조회 결과 |
| `worker_parallel_hint` | `parallel_safe`\|`serial_recommended` | 표시 전용 |
| `worker_parallel_hint_reason` | string | |
| `worker_conflicts_with` | `"UI-a,UI-b"` | |
| `worker_parallel_hint_spec_sha` | spec 파일 blob SHA | freshness |
| `worker_parallel_hint_scope_sha` | 분석 대상 ID 집합 해시 | freshness |
| `worker_parallel_hint_prompt_version` | `v1` | |
| `worker_parallel_hint_at` | ISO8601 | |

## 병렬 분석 (서버 소유 프롬프트)

- toolbar `[병렬성 분석]` → 서버가 분석 잡 1회 spawn:
  `ccx -p --output-format stream-json --verbose --model <default>` + 서버 소유
  프롬프트(top-level JSON 스키마 명시, 출력은 JSON 만).
- 입력: spec 있는 active parent ID 목록. 각 spec 을 읽고 pairwise 충돌(같은
  파일/디렉터리/계약 접점) 판정.
- 서버가 출력 JSON 을 **스키마 검증 후 직접** metadata 기록 (모델은 판정만).
  파싱/스키마 실패 → 기록 없음 + 토스트 (큐 동작 무영향).
- **freshness**: hint 는 `spec_sha` + `scope_sha` + `prompt_version` 과 함께
  기록된다. 카드의 현재 spec blob SHA 가 `worker_parallel_hint_spec_sha` 와
  다르면 hint 를 **stale** 로 표시하고, 그 카드의 `worker_parallel=true` 는
  **serial 로 강등**한다 (fail-safe). 사용자가 재분석 또는 수동 재확정해야 병렬
  실행이 복원된다.

## Config 스키마

`~/.config/bdui/config.toml [worker]`:

- `enabled`: bool, 기본 `false` (범위는 배치 섹션 참조)
- `default_model`: `"sol"`
- `default_effort`: `"high"`
- `pr_review_wait_ms`: 기본 `300000`
- `advance_delay_ms`: 기본 `60000`
- `required_contract_version`: 기본 `1` (capability sentinel 최소 버전)

toolbar 의 model/effort 변경은 `PATCH /api/config/worker` (보존형 TOML write).
duration/enabled/contract 키는 toolbar 로 바꾸지 않는다.

## WS 이벤트

`job.started` / `job.session_id` / `job.log_line` / `job.exited`(usage 포함) /
`job.pr_linked` / `job.pr_review_wait` / `job.pr_review_wait_cancelled` /
`job.verifying` / `queue.countdown` / `queue.advanced` / `queue.halted`(사유
포함) / `queue.resumed`. 모든 job 이벤트는 `phase` 필드를 포함한다.

## dotfiles 계약 인터페이스 (dotfiles-10zx)

본 spec 이 소유하는 것은 인터페이스뿐이다:

- 마커: env `BDUI_WORKER=1`, `BDUI_WORKER_CONTRACT=v1` + STAGE1_PROMPT preamble.
- 기대 행동: 질문 없이 진행, finish 기본값 = PR, blocker 는 즉시 실패 종료,
  worktree 밖 수정 금지, 단계1 은 머지 금지.
- capability sentinel: `workflow.yaml` 의 `worker_fasttrack_contract_version`
  (계약 소유) — preflight 가 `required_contract_version` 이상인지 검사.

## 파일 변경 계획

신규: `app/views/worker-board.js`, `worker-card.js`, `worker-card-progress.js`,
`worker-card-children.js`, `app/data/worker-board-selectors.js`,
`app/utils/queue-sort.js`, `server/worker/queue-scheduler.js`,
`server/worker/queue-state.js`(durable halt 포함),
`server/worker/ccx-runner.js`(stream-json 파서 + 성공 판정),
`server/worker/worktree-manager.js`, `server/worker/pr-resolver.js`,
`server/worker/merge-verifier.js`, `server/worker/parallel-analyzer.js`(+프롬프트
템플릿), `server/worker/preflight.js`, `server/worker/worker-config-writer.js`,
`server/routes/worker-queue.js`.

수정: `server/worker/process-runner.js`(ccx 빌더 + process group),
`server/worker/supervisor.js`(reconciliation), `server/config.js`, `server/app.js`,
`server/ws.js`, `app/views/worker.js`, `app/views/worker-detail.js`,
`app/main.js`, `app/state.js`, `app/ws.js`.

제거: `worker-tree.js`, `worker-parent-row.js`, `worker-child-row.js`,
`worker-pr-panel*.js`, `worker-pr-summary*.js`, `pr-target-resolver.js`,
`pr-reader.js`, `server/routes/worker-prs.js`.

배포(별도 Bead): `dotfiles-7xcx` — projectmgr `beads-ui-worker` 서비스 + fleet
등록. 계약: `dotfiles-10zx`.

## 마이그레이션

- 기존 `worker_*` 키는 consent 마커 부재로 자동 큐잉되지 않는다 (재동의 필요).
- 기존 worker 탭(tree UI)은 board 로 대체.
- PR #16 / UI-l3c3 는 본 spec 승인 후 close (머지하지 않음) — **사용자 확인 후**.

## 검증 / 테스트 전략

### 단위 / 통합

- `ccx-runner`: stream-json 성공 판정 전 조건(exit, 단일 result, subtype,
  is_error, stop_reason allowlist, permission_denials, api_error_status), result
  누락/복수/malformed → 실패, hook 이벤트 무시, stdout-only(stderr 배너 무시),
  env/alias/permission-mode 조립.
- `worktree-manager`: 생성/재사용/더러운 상태 loud-fail/정리.
- `pr-resolver`: `--head` 조회 1건/0건/다건/오류(재시도 후 loud-fail), headRefOid
  대조.
- `merge-verifier`: MERGED + ancestor + bead status + clean 4조건, 각 실패 케이스.
- `queue-scheduler`: 전이 표 전 행, CAS 경합(타이머 vs 버튼) → 단일 spawn,
  idempotency key 중복 spawn 거부, strict FIFO, parallel 종료가 auto-advance
  트리거 아님, durable halt 는 재시작으로 해제되지 않음.
- `queue-state`: write-ahead + readback, crash reconciliation 각 phase.
- `preflight`: 5종 체크(sentinel 포함), 실패 시 실행 차단.
- `config`: `enabled=false` → 읽기 API/렌더 정상, mutation/spawn 403.
- `parallel-analyzer`: 스키마 검증, 실패 시 무해, freshness 키 기록.
- selectors: lane 분류, consent 없는 레거시 카드가 waiting 으로 분류되지 않음,
  stale hint → parallel 강등.

### Acceptance matrix — worker 서비스 활성화의 필수 조건

샌드박스 repo 에서 **fault injection 포함 e2e** 를 통과해야
`dotfiles-7xcx` 활성화가 허용된다:

| # | 시나리오 | 기대 |
| --- | --- | --- |
| A1 | 정상 경로: 큐 → 단계1 → PR → 대기 → pr-finish → 머지 검증 → 다음 카드 | 통과 |
| A2 | 단계1 세션이 permission_denial 남기고 success 로 종료 | 실패 판정, 큐 정지 |
| A3 | PR 조회 rate-limit 오류 | 재시도 후 loud-fail, 0건과 구분 |
| A4 | PR 0건 | 실패, 큐 정지 (자동 진행 금지) |
| A5 | 같은 head 에 open PR 2건 | loud-fail |
| A6 | pr-finish 성공했으나 PR 이 MERGED 아님 | postcondition 실패, 큐 정지 |
| A7 | 타이머 만료와 `[Finish now]` 동시 발생 | `/pr-finish` 정확히 1회 |
| A8 | 각 durable write 전후 supervisor kill | reconciliation 후 중복 실행 없음, 큐 halted 유지 |
| A9 | supervisor kill 후 자식 프로세스 생존 | process group kill 로 종료 확인 |
| A10 | 재시작 2회 | 대기 카드 자동 재개 안 됨 (durable halt) |
| A11 | 동일 workspace 에서 parallel 카드 2개 동시 실행 | 서로의 worktree/HEAD 침범 없음 |
| A12 | consent 마커 없는 레거시 `worker_*` 카드 | 자동 실행 안 됨 |
| A13 | capability sentinel 미충족 | preflight 차단, spawn 없음 |
| A14 | spec 변경으로 hint stale | parallel → serial 강등 |

## Execution lane

- **execution_lane**: `plan`
- **rationale**: 신규 16 파일, 실행 러너 교체, 격리·검증·복구 상태머신, 계약
  연동, fault-injection acceptance — task 분해와 sequencing 필요.
- **의존성**: `dotfiles-10zx`(계약) → preflight sentinel; `dotfiles-7xcx`(배포)는
  본 Bead + 계약 + acceptance matrix 통과가 선행.
