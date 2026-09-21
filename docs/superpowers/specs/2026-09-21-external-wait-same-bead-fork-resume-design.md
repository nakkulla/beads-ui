---
scope:
  - server/worker/
  - server/routes/worker-queue.js
  - server/external-job-observations.js
  - server/ws/worker-handlers.js
  - app/views/worker/
  - app/views/detail-panel/
---

# 외부 작업 대기는 같은 Bead의 상태이고 완료는 보존 세션의 fork 재개다

- Bead: UI-z437 (`spec_backed`)
- 형제: dotfiles 리그의 계약·스킬·CLI unit (`## 경계·후속` 표, 이 스펙의 선행)
- 작성: 2026-09-21

## 1. 요구와 확인한 원인

세션이 Slurm 잡이나 분리된 로컬 프로세스처럼 오래 걸리는 외부 작업을 제출하면 그
작업이 끝날 때까지 기다려야 한다. 지금은 dotfiles의 `bead-job-monitor`가 (1) 네이티브
human gate Bead를 만들어 소비자 Bead에 `blocks` 엣지를 걸고, (2) 워크트리를 스냅샷
ref로 저장·잠그고, (3) launchd 15분 tick으로 관찰하며, (4) 게이트가 닫히면 소비자가
`bd ready`에 다시 나타나 **새 attempt·새 세션**으로 디스패치된다(ADR 0034,
`server/worker/queue-store.js:99`). beads-ui는 그 상태 디렉터리를 읽어 게이트 Bead
자체의 읽기 전용 행(`externalWaitRow`)에 job id와 `[지금 확인]`을 그리고, 소비자
카드에는 `⛓ 선행 대기` 배지와 `⛓ <gate>` 칩만 그린다.

실측(2026-09-14~18 워치 7건, 모두 정산됨):

| 항목 | 값 |
|---|---|
| 대기 길이 | 5h · 7h · 8h · 16h · 32h |
| 제출→등록 완료(세션이 의식에 쓴 시간) | 2.5분~14분 |
| 완료 감지 지연 | 최대 15분(tick) + 오류 백오프 15/30/60분 |
| 한 Bead가 동시에 기다린 잡 수 | 최대 2 (Analysis-xz9d, Analysis-wq0w) |

비효율의 원인은 세 가지다.

1. **재진입이 새 세션이다.** 워크트리 스냅샷 말고는 작업 기억이 없고, 새 세션이
   워치 JSON을 읽고 워크트리를 되찾는 절차를 다시 수행한다. 이어하기 메커니즘은
   이미 있다: `base_moved` 보존 후보의 `↻ 이어하기`(`resume_session_id`, ADR
   UI-lmqu-2)와 사용자 세션의 fork(`fork_session`, `qualifySessionFork`,
   2026-08-26 스펙).
2. **등록 의식이 무겁다.** 인자 15개짜리 CLI, 스냅샷·잠금, 게이트 Bead, `blocks`
   엣지 readback. bd 네이티브 게이트에는 slurm 타입이 없어 게이트 Bead가 주는 것이
   없다.
3. **표면이 엉뚱한 카드에 있다.** 사용자가 보고 싶은 것(job id·경과·지금 확인)은
   게이트 Bead의 행에 있고, 정작 일하는 Bead의 카드는 선행 대기로만 보인다.

## 2. 선택한 방식과 대안

**선택.** 외부 대기를 소비자 Bead 자신의 상태(`external_wait` 키 + beads-ui Worker의
대기 레코드)로 두고, 관찰·완료 인식·알림·재개를 beads-ui Worker가 한 런타임에서
소유한다. 완료되면 Worker가 보존된 세션을 **fork**해 이어간다(Worker 디스패치
세션은 자동, 사용자 세션은 알림 뒤 `[이어하기]` 클릭). 세션 안에서 얼마나 기다릴지는
예측이 아니라 **hold 예산**(턴 수)으로 코드가 판정한다.

대안과 기각 사유:

- *세션이 그냥 계속 기다린다.* Bash 상한 10분마다 폴링 턴이 생겨 8시간이면 약 48턴,
  32시간이면 약 190턴이 컨텍스트 캐시 읽기를 반복한다. 재개 1회(전체 재읽기 1회)는
  캐시 읽기 약 10회분이라 순수 토큰만 봐도 100분이 손익분기이고, 슬롯 점유·헤드리스
  대기 상한 2시간·공급자 장애·`bdui-shared restart`가 세션을 죽인다. 짧은 대기에만
  맞다 — 그래서 hold 예산이다.
- *Python `bead-job-monitor`를 관찰 전용으로 축소해 beads-ui가 호출한다.* 검증된
  파싱을 재사용하지만 두 리포 런타임 결합과 Python 의존이 남는다. 관찰 어댑터는
  200~300줄이라 JS 재구현이 싸다. 사용자 결정(2026-09-21): beads-ui가 전부 소유.
- *도구는 두고 closer만 이벤트로 교체한다.* 15분 tick·등록 의식·두 런타임이 그대로
  남아 원인 2를 못 없앤다.

## 3. 계약 표면 (dotfiles가 정의, beads-ui가 소비)

ADR 0012에 따라 아래 어휘의 정본은 dotfiles `docs/contracts/workflow-state.yaml`의
새 `external_wait` 블록이며, beads-ui는 field registry 사본으로 읽는다. 형제 스펙이
정의를 소유하고 이 절은 beads-ui가 읽는 표면만 적는다.

| 표면 | 값 | 쓰는 쪽 | 읽는 쪽 |
|---|---|---|---|
| Bead metadata `external_wait` | `<wait_id>` (형식 `w-<12hex>`) | beads-ui Worker(`detached` 전환 시 set, 재개 launch 성공·중단 시 unset) | Worker 입장(`admission.js`, 존재만으로 fail-closed) · 세션(`bd show`) |
| 세션 결과 줄 | `대기 · external:<wait_id>` | 세션 | Worker `terminalResultOf` → `waiting_external` |
| Worker attempt 종결 | `status=waiting`, `cause=external_job`, `cause_detail={wait_id, jobs}` | Worker | 카드·타임라인 |
| hold 예산 상수 | `hold_budget_turns=3`, `hold_turn_seconds=540`(Bash 상한 600초 아래) | 계약 상수 | Worker(판정 주체) · CLI(표시) |
| 관찰 간격 | slurm 120초 · process 30초 · 오류 백오프 60/120/300/900초 | 계약 상수 | Worker |

`external_wait`는 한 Bead에 하나뿐이다(레코드 하나가 잡 N개를 품는다). 키가 있는데
레코드가 없으면 카드는 `⛔ 조치 필요 · 대기 레코드 없음`을 그리고 `[관찰 중단]`이
키를 지운다 — 어느 쪽이 남아도 fail-closed다.

## 4. Worker API와 세션 CLI 프로토콜

세션 쪽 CLI(`bead-wait`, dotfiles unit)는 얇은 HTTP 클라이언트이고 판정은 전부
서버가 한다. 라우트는 `server/routes/worker-queue.js`의 `workspaceKeyOf` 허용 목록
패턴을 따른다.

| 라우트 | 본문 | 응답 |
|---|---|---|
| `POST /api/worker/external-wait` | `root_dir`, `bead_id`, `owner` (`worker`: `attempt_id` / `session`: `session_ref`, `session_pid`, `session_start`), `worktree`(절대경로), `execution_sha`, `jobs[]` | `{wait_id, decision: 'hold'\|'detached'\|'done', budget: {turns_total, turns_used}, jobs[]}` |
| `POST /api/worker/external-wait/<id>/hold` | 없음 | 최대 `hold_turn_seconds` 동안 롱폴. `{state: 'running'\|'done'\|'detached', jobs[], budget}` |
| `GET /api/worker/external-wait/<id>` | — | 레코드 전체(§5 스키마) |
| `POST /api/worker/external-wait/<id>/check` | 없음 | 즉시 관찰 1회 후 레코드 (`[지금 확인]`) |
| `POST /api/worker/external-wait/<id>/stop` | 없음 | 관찰 중단·키 unset·attempt `waiting→stopped` (`[관찰 중단]`; 잡은 건드리지 않는다) |
| `POST /api/worker/external-wait/<id>/resume` | 없음 | 세션 소유 대기의 수동 재개 (`[이어하기]`, §6.3) |

`jobs[]` 원소는 어댑터별로 둘 중 하나다.

- `{adapter: 'slurm', ssh_host, job_id, submitted_at, log_path, expected: [<remote path>...]}`
  — `ssh_host`는 검증된 비옵션 alias, `expected`는 한 개 이상.
- `{adapter: 'process', pid, submitted_at, workdir, log_path, expected: [<workdir 상대>...]}`
  — `expected`는 선택. 래퍼는 지금과 같이 로그 끝에 `rc=<n>` 줄을 남긴다.

**등록 시 판정(`decision`).** 서버가 첫 관찰을 동기로 한 번 수행한 뒤:

1. 어느 잡이든 이미 terminal이면 그 잡은 완료로 기록하고, 전부 terminal이면
   `decision='done'`을 돌려 세션이 대기 없이 계속한다(현행 `continue_original`).
2. slurm 잡 중 `PENDING`이 하나라도 있으면 `detached` — 큐 대기는 상한이 없다.
3. 모든 slurm 잡이 `RUNNING`이고 `TimeLimit − RunTime`(`scontrol show job`)이 전부
   `turns_total × turn_seconds` 이하이면 `hold`, 하나라도 넘으면 `detached`.
4. process 잡과 상태를 알 수 없는 잡은 `hold` — 예산이 상한이다.

**hold 루프.** `hold` 호출 하나가 턴 하나다. 서버는 `turns_used`를 세고, 호출 시점에
`turns_used ≥ turns_total`이면 관찰하지 않고 즉시 `detached`를 돌려준 뒤 소유권을
가져간다. 롱폴 중 전부 terminal이 되면 `done`을 즉시 돌려준다. 세션은 `done`이면
계속하고 `detached`이면 §6의 종료 줄로 끝난다. 이 루프가 dotfiles-xrdr의 "무인
세션의 자체 명령은 포그라운드가 붙든다"를 그대로 만족한다: CLI 호출은 포그라운드
Bash이고 백그라운드 셸이 없다.

`detached` 전환 시 서버는 같은 처리에서 `external_wait=<wait_id>`를 쓰고 readback한다.
세션이 그 뒤 종료 줄을 쓰지 않고 죽어도 Bead는 입장에서 제외된 채 관찰이 계속된다.

## 5. 대기 레코드와 관찰기 (`server/worker/external-wait/`)

**저장.** 워크스페이스별 `external-wait.json`을 queue-store와 같은 상태 디렉터리에
두고 같은 원자 쓰기 규칙을 쓴다. 레코드:

```
{ wait_id, root_dir, bead_id, owner: {kind:'worker', attempt_id} | {kind:'session', session_ref, session_pid, session_start},
  worktree, execution_sha, registered_at, stage: 'hold'|'detached'|'done'|'stopped'|'resumed',
  budget: {turns_total, turns_used}, next_observation_at, error_count, last_error,
  jobs: [{adapter, ..., state, observed_at, terminal: null | {exit_code, evidence, expected_results, recovery_needed, completed_at}}],
  completion: null | {digest, completed_at, recovery_needed}, resume: null | {attempt_id, session_id, launched_at, error} }
```

로그 내용·환경·SSH 설정은 저장하지 않는다(현행 계약과 같다). `expected_results`는
경로·존재·크기·mtime뿐이다.

**관찰기.** `createExternalWaitObserver`가 워크스페이스 attach 시 `createPoller`로
돌며 `next_observation_at`이 지난 레코드를 오래된 순으로 관찰한다. 한 레코드의 오류는
격리하고 백오프한다. 어댑터:

- `slurm`: `ssh -o BatchMode=yes -o ConnectTimeout=10 <alias>`로 고정 원격 프로그램
  하나를 인자로 넘긴다 — `squeue -h -j <id> -o '%T'`, `scontrol show job <id>`
  (JobState·ExitCode·TimeLimit·RunTime), 로그 마지막 블록 bounded tail, `expected`
  `stat`. 판정은 현행 계약과 같다: `PENDING`/`RUNNING`은 대기, `scontrol` terminal
  상태 + ExitCode가 terminal 증거, `squeue` 빈 결과 단독은 unknown, 로그 트레일러
  (`Job ID` 일치 + `Job Finished`/`Exit code`, 시작 시각이 제출 시각 이후)는 보조
  증거. exit 0이고 `expected` 전부 존재해야 `recovery_needed=false`.
- `process`: `env LC_ALL=C ps -p <pid> -o lstart=`로 생존·시작 시각 일치를 보고, 로그
  마지막 4096바이트의 `^rc=(-?\d+)$` 줄로 exit code를 읽는다. 사라졌는데 rc가 없으면
  `VANISHED`(`recovery_needed=true`). 프로브 뒤 로그를 읽는 순서는 유지한다.

관찰기는 잡을 제출·취소·재시도하지 않고 자원을 바꾸지 않는다. 사용자 `[관찰 중단]`도
잡에 신호를 보내지 않는다.

**완료.** 잡 전부가 terminal이면 `completion`을 먼저 기록(digest = 잡별 terminal
투영의 SHA-256)하고, 그 뒤 §6의 재개를 시작한다. 재시작 뒤에는 `completion` 유무로
재관찰 없이 이어간다.

## 6. 세션 종료와 재개

### 6.1 세션 종료 (detached)

세션의 마지막 메시지 첫 줄은 `대기 · external:<wait_id>`다. 완료 보고서는 쓰지 않고
notes에 `external-wait: <wait_id> — <잡 요약>` 한 줄을 append한다. 워크트리는 그대로
둔다 — 스냅샷·잠금은 없다.

- Worker 디스패치 세션: 상태를 쓰지 않는다. Worker는 `provePrerequisiteWait`와 같은
  자리(`scheduler.js:6636`)에 `proveExternalWait`를 두어 레코드가 `detached`이고
  `bead_id`·`attempt_id`가 일치함을 서버 자신의 store로 증명한 뒤
  `failAttempt(..., 'external_job', {wait_id, jobs}, {tier_hint: 'waiting'})`로
  종결한다. `failure-class.js`의 `NON_PROMOTING_CAUSES`에 `external_job`을 더한다.
  `session_id`는 이미 attempt에 있다(`:10271`). 클레임은 attempt 종료 때 지금처럼
  `in_progress → open`으로 풀린다(`releaseBeadClaim`); `external_wait` 키가 입장을
  막으므로 `bd ready` 복귀가 새 디스패치를 만들지 않는다.
- 사용자 세션: 현행 선행 게이트 종료의 클레임 해제와 같이 세션이 `in_progress → open`
  을 쓰고 route pin과 다른 metadata는 유지한다. `session_ref`는 등록 본문에 실려
  레코드에 있다.

**워크트리 보존.** attempt 종료에 워크트리 즉시 삭제는 없고(`removeIfDiscardable`은
다음 디스패치·정리·stale 재확인이 호출), 새 디스패치는 키가 막는다. 남는 경로는
`staleWorkRecheck`와 waiting 재스캔 폐기 검사(`scheduler.js:13975`)이며, 둘 다
`cause=external_job`인 waiting attempt의 워크트리를 `base_moved`처럼 `preserve`
대상으로 본다. 재스캔 자체(ADR 0034)는 `external_job` waiting attempt를 후보에서
제외한다 — 복귀 신호는 `bd ready`가 아니라 §6.2의 완료다.

### 6.2 Worker 자동 재개 (owner=worker)

완료 기록 직후 Worker는 `relaunchFromAttempt` 계열(`relaunchResolvedAttempt`,
`scheduler.js:12516`)의 `continuation_mode='session'` 경로로 같은 세션을 잇는다.
차이는 두 가지뿐이다.

1. `launchSession` 입력에 `resume_session_id: prior.session_id`와 함께
   `fork_session: true`를 싣는다(2026-08-26 스펙 §4의 조합 규칙: 두 값은 함께
   간다). 원 전사는 불변으로 남고 새 attempt(`resumed_from: <prior>`)가 fork id를
   `session_id`로 받는다. `launch_kind: 'resume'`라 Discord `🚀 재개` 알림은 기존
   `attemptStarted`가 그대로 낸다.
2. 프롬프트는 `resumePrompt(...)` 뒤에 완료 페이로드 블록 `## 외부 작업 완료`를
   붙인다: 잡별 `job_id · state · exit_code · evidence`, `expected` 경로별
   존재·크기·mtime, `recovery_needed`, 로그 경로, `completion.digest`, 그리고
   "관찰 완료는 구현 완료가 아니다 — 아티팩트의 의미 검증·복구·커밋·완료는 이
   세션이 한다" 한 줄. Codex 세션은 같은 입력으로 `codex exec fork`가 된다(2026-08-26
   스펙 §4).

재개 진입 조건은 `base_moved_resume`(`:10788`)과 같은 모양이다: `prior.session_id`,
전사 존재(`transcriptPresent`), 워크트리 존재(`deps.worktree.exists`), 레코드
`completion` 존재. 하나라도 빠지면 fresh 디스패치로 대체하지 않고 레코드에
`resume.error`를 기록해 `⛔ 조치 필요 · 재개 실패 · <사유>`와 `[이어하기]`로 넘긴다
(사람이 fresh를 고르는 다이얼로그는 기존 재개 다이얼로그의 갈래다). launch 성공
readback 뒤에만 `bd update --unset-metadata external_wait`를 쓰고 readback하며
레코드 `stage='resumed'`로 닫는다.

### 6.3 사용자 세션 재개 (owner=session)

완료 시 Worker는 `notifyWaitReasons`의 `notify_plan.on_complete` 갈래(지금 선언만
되고 소비되지 않는 자리, `wait-judgment.js:261`)로 Discord `✅ 외부 작업 완료 ·
<bead> · <잡 요약>`을 한 번 보내고(`claimWaitNotifications` 중복 제거), 카드는
`⏳ 외부 작업` 배지를 `✅ 완료 · 이어하기 대기`로 바꾼다. 자동 재개는 하지 않는다 —
사용자가 그 세션을 아직 쓰고 있을 수 있어 소유자가 둘이 된다(사용자 결정 2026-09-21).

`[이어하기]`(= `POST .../resume`)는 `qualifySessionFork(metadata, null)`로
`session_ref`의 마지막 항목을 판정해 §6.2와 같은 `launchSession`(fork, resume
프롬프트 + 완료 페이로드)을 레코드의 `worktree` 경로에서 연다. 이때 Worker가 Bead를
`in_progress`로 클레임하며, 이후 소유는 Worker다. 자격이 서지 않으면(`no_session_ref`
등 네 사유) `resolve-session.js`처럼 **fresh 세션으로 열되 사유를 응답과 타임라인에
남긴다**.

## 7. 소비자 카드 표면 (`app/views/worker/`)

카드 문법 스펙(2026-08-25 §5.1)의 슬롯 배정 — 새 요소는 여기서 슬롯을 정한다:

| 슬롯 | 요소 | 재료 |
|---|---|---|
| 1 정체성 | 배지 `⏳ 외부 작업` · 완료 뒤 `✅ 완료 · 이어하기 대기`(session) / `↻ 재개 중`(worker) · 이상 시 `⚠ 지연 · <사유>` / `⛔ 조치 필요 · <사유>` (기존 대기 판정 배지 어휘, 클릭 = 근거 팝업) | `queue.external_waits` 행 (§5 레코드 투영) |
| 1 조작 | `[지금 확인]` (`check`) · `[관찰 중단]` (`stop`) · `[이어하기]` (session 완료·재개 실패 시만, `resume`) — 셋 다 `.op-btn` | 레코드 `stage`·`owner`·`resume.error` |
| 3 진행 | `headline`: `<host> 작업 <job_id> · RUNNING · 경과 3h12m` (잡이 여럿이면 잡 수와 terminal 수: `잡 2건 · 완료 1 · 실행 1`) · `release`: `완료되면 같은 세션을 이어간다` / `완료 · [이어하기]를 누르면 세션을 fork해 이어간다` · 오류 줄 `관찰 오류 n회 · <last_error>` | 레코드 |
| 5 좌표 | `ssh <host>` 칩 · 잡 번호 칩(클릭 = 복사) · `log <path>` 복사 | 레코드 |
| 7 시각 | `제출 <t> · 마지막 확인 <t> · 다음 <t>` → 완료 뒤 `완료 <t>` | 레코드 |

경과 시간은 `submitted_at` 기준으로 클라이언트가 그린다(기존 `elapsed_word` 슬롯을
`external_job` kind에서만 채운다). `WAIT_KINDS`에 `external_job`을 두고
`wait-vocabulary.js`의 표를 따른다. `⛓ 선행 대기`·`⛓ <ID>`는 이 대기에 그리지
않는다 — `blocks` 엣지가 없기 때문이다(재료가 없는 줄은 그리지 않는다).

상세 패널은 같은 재료를 잡별 표로 편다(잡 · 상태 · exit · expected 경로별 결과 · 로그).
게이트 전용 오버레이(`detail-panel/index.js:2978`)는 삭제한다.

## 8. 삭제와 마이그레이션

- 삭제: `server/external-job-observations.js`, `externalWaitRow`(`lanes.js:3624`),
  게이트 상세 오버레이, `monitor_tick_now` op와 `bead-job-monitor tick` 호출
  (`attach.js:3334-3459`), `wait-judgment.js`의 gate 기반 `external_job` 판정과
  `WAIT_JUDGE_INTERVAL_SECONDS` 수집(레코드가 서버 자신의 것이므로 5분 재수집이
  필요 없다). `runnable-cache.js:863`의 `issue_type === 'gate'` 제외는 유지한다 —
  네이티브 게이트는 bd의 다른 용도로 남는다.
- 마이그레이션: 2026-09-21 기준 모든 리그에 열린 게이트 0건, 워치 7건 모두
  `complete`. 레거시 `~/.local/state/bead-job-monitor`는 읽지도 지우지도 않는다.
  dotfiles unit이 `bead-job-monitor` 도구·launchd 서비스·활성화 ledger job을
  제거한다(형제 스펙).
- `preamble.js`의 결과 줄 문법과 `terminalResultOf`는 `대기 · external:<wait_id>`를
  `waiting_external`로 읽고, `대기 · blocks:` 처리는 선행 게이트용으로 그대로 남는다.

## 9. 검증과 수용 기준

- 단위: (a) 등록 판정 — PENDING→detached, RUNNING 잔여 ≤ 예산→hold, >예산→detached,
  전부 terminal→done, process→hold. (b) hold 예산 — 세 번째 호출까지 hold, 네 번째
  호출은 관찰 없이 detached이고 `external_wait` 키가 쓰인다. (c) slurm/process
  어댑터 파서 — 현행 Python 테스트 케이스(터미널 scontrol, 빈 squeue + 로그 트레일러,
  오래된 같은 번호 블록 무시, VANISHED)를 JS로 옮긴다. (d) `proveExternalWait` —
  레코드 불일치는 waiting이 아니라 실패. (e) 자동 재개 — `launchSession` 입력에
  `resume_session_id`와 `fork_session:true`가 함께 실리고 프롬프트에 완료 블록이
  있으며, launch 실패 시 키가 남고 `resume.error`가 기록된다. (f) 입장 —
  `external_wait` 존재만으로 `validateAdmission`이 거절한다. (g) 재스캔 —
  `external_job` waiting attempt는 후보가 아니고 워크트리는 preserve다.
- 통합(수동, 배포 뒤): process 어댑터로 `sleep 20; rc=0` 래퍼를 실제 Worker attempt
  안에서 등록 → hold 1턴에 `done` → 세션 계속. `sleep 2000` 래퍼로 예산 소진 →
  `detached` → 세션이 `대기 · external:` 줄로 끝남 → 카드 배지·경과·`[지금 확인]`
  확인 → 완료 뒤 `🚀 재개` 알림과 fork된 attempt(`resumed_from`)가 완료 블록을
  받는지 세션 로그로 확인. Slurm 어댑터는 실제 클러스터 잡 1건으로 같은 경로를
  확인한다.
- 스크린샷: 대기 중·완료·조치 필요 세 상태의 소비자 카드(데스크톱·390px iframe).
- Pre-Handoff Validation 전 항목.

## 10. 구현 unit 후보

1. `contract-registry` — field registry에 `external_wait`·결과 줄·예산 상수 복제,
   `terminalResultOf`, `admission.js` 제외, `failure-class.js` cause.
2. `wait-store-observer` — `server/worker/external-wait/` store·어댑터·관찰기·완료 기록.
3. `api-routes` — `server/routes/worker-queue.js` 옆 `external-wait` 라우트(등록
   판정·롱폴 hold·check·stop·resume).
4. `worker-resume` — `proveExternalWait`, 재스캔 제외·preserve, 자동 재개(fork)·
   완료 페이로드 프롬프트, `on_complete` 알림.
5. `card-surface` — `WAIT_KINDS.external_job`, 배지·조작·헤드라인·슬롯 5·7, 상세
   패널 잡 표, 레거시 행·오버레이·수집기 삭제.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|
| 형제 | dotfiles | user_request | different_repository — `external_wait` 어휘·결과 줄·예산 상수(`workflow-state.yaml`·`workflow-contract.md`), `external-job-monitor.md` 폐기와 `external-wait.md` 신설, 워크플로우 스킬 절차 교체, `bead-wait` CLI, `bead-job-monitor` 도구·서비스 제거는 dotfiles 소유 | 없음 | dotfiles-p0xk |

이 Bead(UI-z437)는 위 형제 dotfiles-p0xk를 `blocks` 선행으로 둔다 — beads-ui는
계약 소비자라 어휘가 먼저 정의돼야 한다(ADR 0012). 형제 스펙
`docs/superpowers/specs/2026-09-21-external-wait-contract-and-bead-wait-cli-design.md`
(dotfiles)는 이 세션이 함께 작성했다.

- 관찰: sjob 래퍼 종료 훅이 Worker API를 push로 찌르는 가속 — 클러스터→tailnet
  도달성이 확인되지 않아 이번 범위 밖. 폴링 120초로 충분하다.
- 관찰: 잡 취소(`scancel`)·재제출 조작 — 관찰기는 잡을 건드리지 않는다는 현행 경계를
  유지한다. 필요해지면 별도 설계.
- 결정: `blocks` 엣지·네이티브 게이트를 외부 대기 신호로 다시 쓰지 않는다 — 대기
  신호는 `external_wait` 키 하나다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 계약 어휘는 dotfiles가 정의하고 beads-ui는 field registry
  사본으로 소비한다.
- 전제: ADR UI-lmqu-2 — 보존 세션 이어하기는 `resume_session_id` 경로다; 이 설계는
  `external_job`을 두 번째 보존 세션 사유로 더한다.
- 전제: ADR 0034 — 복귀 트리거는 이벤트 구독이다; `external_job` waiting attempt는
  `bd ready` 재스캔 후보에서 빠지고 완료 이벤트가 복귀 신호다.
- 전제: ADR 0014 — 새 배지·조작은 카드 문법 스펙의 슬롯을 먼저 정한 뒤 단다(§7).
- 외부 작업 대기는 별도 게이트 Bead·`blocks` 엣지가 아니라 소비자 Bead의 `external_wait`
  상태이고, 관찰·완료 인식·알림·재개는 beads-ui Worker가 한 런타임에서 소유하며,
  완료는 보존 세션의 fork 재개(Worker 소유는 자동, 세션 소유는 알림 뒤 `[이어하기]`)
  다. 되돌리기 어렵고(레거시 관찰 경로 삭제), 여러 표면(입장·재개·카드·계약 사본)에
  걸치며, 재개 방식의 근거(소유자 이중화 회피)는 코드에 안 보인다.
  `summary`: "외부 작업 대기는 게이트 Bead가 아니라 소비자 Bead의 external_wait 상태이고 관찰·완료·재개는 beads-ui Worker가 소유하며 완료는 보존 세션의 fork 재개다 — Worker 소유는 자동, 세션 소유는 알림 뒤 [이어하기]" → ADR
