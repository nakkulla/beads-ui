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
- 형제: dotfiles-p0xk — 계약 어휘·세션 절차·`bead-wait` CLI·레거시 도구 제거
  (`## 경계·후속` 표, 이 Bead의 `blocks` 선행)
- 작성: 2026-09-21 · r2(리뷰 r1 반영)

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

대안과 기각 사유 — 이 절충이 `## 결정`의 후보 근거다:

- *세션이 그냥 계속 기다린다.* Bash 상한 10분마다 폴링 턴이 생겨 8시간이면 약 48턴,
  32시간이면 약 190턴이 컨텍스트 캐시 읽기를 반복한다. 재개 1회(전체 재읽기 1회)는
  캐시 읽기 약 10회분이라 순수 토큰만 봐도 100분이 손익분기이고, 슬롯 점유·헤드리스
  대기 상한 2시간·공급자 장애·`bdui-shared restart`가 세션을 죽인다. 짧은 대기에만
  맞다 — 그래서 hold 예산이다.
- *게이트 Bead·`blocks` 엣지를 유지하고 재개만 fork로 바꾼다.* 재개는 나아지지만
  등록 의식·게이트 카드 이중 표면·`bd ready` 복귀 판정이 남는다. 신호를 키 하나로
  줄이는 대신 ADR UI-3pu9의 "새 metadata를 만들지 않는다" 조항을 뒤집는 비용을
  치른다.
- *Python `bead-job-monitor`를 관찰 전용으로 축소해 beads-ui가 호출한다.* 검증된
  파싱을 재사용하지만 두 리포 런타임 결합과 Python 의존이 남는다. 관찰 어댑터는
  200~300줄이라 JS 재구현이 싸다. 사용자 결정(2026-09-21): beads-ui가 전부 소유.
- *fork 자격이 없으면 자동으로 fresh 세션을 연다.* 클릭 한 번을 아끼지만 사용자가
  "fork로 잇는다"고 결정한 맥락 없는 새 세션이 소리 없이 일한다. 자격 실패는 launch
  없이 사유를 남기고 사람이 `[새 세션으로]`를 고른다.

## 3. 계약 표면 (dotfiles가 정의, beads-ui가 소비)

ADR 0012에 따라 아래 어휘의 정본은 dotfiles `docs/contracts/workflow-state.yaml`의
새 `external_wait` 블록(형제 스펙 §2.1)이며, beads-ui는 field registry 사본으로 읽는다.

| 표면 | 값 | 쓰는 쪽 | 읽는 쪽 |
|---|---|---|---|
| Bead metadata `external_wait` | `<wait_id>` (형식 `w-<12hex>`) | beads-ui Worker(`detached` 전환 시 set; 재개 launch 성공·`stop` 시 unset) | Worker 입장(`admission.js`, 존재만으로 fail-closed, §6.2의 재개 진입 하나만 예외) · 세션(`bd show`) |
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
패턴을 따르며, 모든 라우트가 `root_dir`를 받는다(본문 또는 쿼리).

| 라우트 | 본문 | 응답 |
|---|---|---|
| `POST /api/worker/external-wait` | `root_dir`, `bead_id`, `owner` (`worker`: `attempt_id` / `session`: `session_ref`, `session_pid`, `session_start`), `worktree`(절대경로), `execution_sha`, `jobs[]` | `{wait_id, decision: 'hold'\|'detached'\|'done', budget: {turns_total, turns_used}, jobs[]}` |
| `POST /api/worker/external-wait/<id>/hold` | `root_dir` | 최대 `hold_turn_seconds` 동안 롱폴. `{state: 'running'\|'done'\|'detached', jobs[], budget}` |
| `GET /api/worker/external-wait/<id>?root_dir=` | — | 레코드 전체(§5 스키마) |
| `POST /api/worker/external-wait/<id>/check` | `root_dir` | 즉시 관찰 1회 후 레코드 (`[지금 확인]`) |
| `POST /api/worker/external-wait/<id>/stop` | `root_dir` | 관찰 중단·키 unset·`stage='stopped'` (`[관찰 중단]`; 잡은 건드리지 않는다) |
| `POST /api/worker/external-wait/<id>/resume` | `root_dir`, `mode: 'fork'\|'fresh'` | §6.3의 수동 재개 (`[이어하기]` = fork, `[새 세션으로]` = fresh) |

`jobs[]` 원소는 어댑터별로 둘 중 하나다.

- `{adapter: 'slurm', ssh_host, job_id, submitted_at, log_path, expected: [<remote path>...]}`
  — `ssh_host`는 검증된 비옵션 alias, `expected`는 한 개 이상.
- `{adapter: 'process', pid, submitted_at, workdir, log_path, expected: [<workdir 상대>...]}`
  — `expected`는 선택. 래퍼는 지금과 같이 로그 끝에 `rc=<n>` 줄을 남긴다.

**등록 시 판정(`decision`).** 서버가 첫 관찰을 동기로 한 번 수행한 뒤, terminal인
잡을 완료로 기록하고 **아직 terminal이 아닌 잡의 집합 J**에 아래를 위에서부터 첫
번째로 맞는 규칙 하나로 판정한다.

1. J가 비어 있으면 `done` — 세션이 대기 없이 계속한다(현행 `continue_original`).
2. J의 slurm 잡 중 `PENDING`(또는 `CONFIGURING`·`SUSPENDED` 등 RUNNING 이전 상태)이
   하나라도 있으면 `detached` — 큐 대기는 상한이 없다.
3. J의 slurm 잡 중 `RUNNING`인데 `TimeLimit`이 `UNLIMITED`이거나 파싱 불가이거나
   `TimeLimit − RunTime > turns_total × turn_seconds`인 잡이 하나라도 있으면
   `detached`.
4. 그 밖(남은 잡이 전부 예산 이내의 slurm `RUNNING`, process 잡, 또는 첫 관찰이
   상태를 못 읽은 slurm 잡)은 `hold` — 예산이 상한이다.

**hold 루프.** `hold` 호출 하나가 턴 하나다. 서버는 `turns_used`를 세고, 호출 시점에
`turns_used ≥ turns_total`이면 관찰하지 않고 즉시 `detached`를 돌려준 뒤 소유권을
가져간다. 롱폴 중 J가 비면 `done`을 즉시 돌려주고 레코드는 `stage='done'`으로 닫힌다
— **hold 완료는 응답일 뿐이며 재개를 시작하지 않는다**(원 세션이 그대로 계속한다).
롱폴이 시간 상한에 닿으면 `running`을 돌려주고 세션은 다음 hold를 부른다. 세션은
`done`이면 계속하고 `detached`이면 §6의 종료 줄로 끝난다. 이 루프는 dotfiles-xrdr의
"무인 세션의 자체 명령은 포그라운드가 붙든다"를 그대로 만족한다: CLI 호출은
포그라운드 Bash이고 백그라운드 셸이 없다.

`detached` 전환 시 서버는 같은 처리에서 `external_wait=<wait_id>`를 쓰고 readback한다.
세션이 그 뒤 종료 줄을 쓰지 않고 죽어도 Bead는 입장에서 제외된 채 관찰이 계속된다.

## 5. 대기 레코드와 관찰기 (`server/worker/external-wait/`)

**저장.** 워크스페이스별 `external-wait.json`을 queue-store와 같은 상태 디렉터리에
두고 같은 원자 쓰기 규칙을 쓴다. 레코드:

```
{ wait_id, root_dir, bead_id,
  owner: {kind:'worker', attempt_id} | {kind:'session', session_ref, session_pid, session_start},
  worktree, execution_sha, registered_at,
  stage: 'hold'|'done'|'detached'|'completing'|'resumed'|'stopped',
  budget: {turns_total, turns_used}, next_observation_at, error_count, last_error,
  jobs: [{adapter, ..., state, observed_at,
          terminal: null | {exit_code, evidence, expected_results, recovery_needed, completed_at}}],
  completion: null | {digest, completed_at, recovery_needed},
  resume: null | {mode:'fork'|'fresh', attempt_id, reserved_at, launched_at, session_id, error} }
```

단계 전이: `hold → done`(hold 중 완료) · `hold → detached`(예산 소진 또는 등록 판정)
· `detached → completing`(잡 전부 terminal, §6.2 재개 대기) · `completing → resumed`
(재개 launch 성공·키 unset) · 어느 단계에서든 `stop` → `stopped`. `done`·`resumed`·
`stopped`는 종단이며 관찰기가 다시 보지 않는다.

로그 내용·환경·SSH 설정은 저장하지 않는다(현행 계약과 같다). `expected_results`는
경로·존재·크기·mtime뿐이다.

**관찰기.** `createExternalWaitObserver`가 워크스페이스 attach 시 `createPoller`로
돌며 `stage ∈ {hold, detached}`이고 `next_observation_at`이 지난 레코드를 오래된
순으로 관찰한다. 한 레코드의 오류는 격리하고 백오프한다. 어댑터:

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

**완료.** 잡 전부가 terminal이면 `completion`을 먼저 기록한다(digest = 잡별 terminal
투영의 SHA-256). `stage='hold'`면 §4대로 `done`이고 여기서 끝난다. `stage='detached'`면
`completing`으로 옮기고 §6.2의 재개 조건을 기다린다. 재시작 뒤에는 `completion`
유무로 재관찰 없이 이어간다.

## 6. 세션 종료와 재개

### 6.1 세션 종료 (detached)

세션의 마지막 메시지 첫 줄은 `대기 · external:<wait_id>`다. 완료 보고서는 쓰지 않고
notes에 `external-wait: <wait_id> — <잡 요약>` 한 줄을 append한다. 워크트리는 그대로
둔다 — 스냅샷·잠금은 없다.

- Worker 디스패치 세션: 상태를 쓰지 않는다. Worker는 `provePrerequisiteWait`와 같은
  자리(`scheduler.js:6636`)에 `proveExternalWait`를 두어 레코드가 `detached` 이후
  단계이고 `owner.attempt_id`가 이 attempt와 같음을 서버 자신의 store로 증명한 뒤
  `failAttempt(..., 'external_job', {wait_id, jobs}, {tier_hint: 'waiting'})`로
  종결한다. 결과 줄이 없거나 다른 줄로 끝난 attempt도 그 레코드가 있으면 같은
  종결이다 — 레코드가 서버의 진실이다. `failure-class.js`의 `NON_PROMOTING_CAUSES`에
  `external_job`을 더한다. `session_id`는 이미 attempt에 있다(`:10271`). 클레임은
  attempt 종료 때 지금처럼 `in_progress → open`으로 풀린다(`releaseBeadClaim`);
  `external_wait` 키가 입장을 막으므로 `bd ready` 복귀가 새 디스패치를 만들지 않는다.
- 사용자 세션: 현행 선행 게이트 종료의 클레임 해제와 같이 세션이 `in_progress → open`
  을 쓰고 route pin과 다른 metadata는 유지한다. `session_ref`는 등록 본문에 실려
  레코드에 있다.

**워크트리 보존.** attempt 종료에 워크트리 즉시 삭제는 없다. 삭제가 가능한 경로는
다음 fresh 디스패치의 preflight(`scheduler.js:9040`, `removeIfDiscardable`), `■` 정지의
`cleanupStopResidue`(`:4264`), `staleWorkRecheck`(`:9615`), discard-coordinator이며,
preflight와 stale 재확인은 `resumableResidueAttempts`(`:2651`, 지금은 failed·orphaned·
paused만)의 후보에 `preserve: true`를 넘긴다. `cause=external_job`인 waiting attempt를
그 후보 집합에 더해 세 경로가 모두 보존으로 읽게 한다. `attemptHasPreservedWork`
(`:13946`)는 이미 `preserve: true`라 바꾸지 않는다. `runWaitingRescan`(`:13359`)은
`prerequisite_unmet`만 후보로 보고 워크트리를 지우지 않으므로 그대로 두되, ADR 0034의
재스캔 후보 정의에 `external_job`이 들어가지 않음을 명시한다 — 복귀 신호는 `bd ready`
가 아니라 §6.2의 완료다.

### 6.2 Worker 자동 재개 (owner=worker)

레코드가 `completing`이고 다음이 모두 참일 때만 자동 재개를 시작한다.

1. 원 attempt(`owner.attempt_id`)가 종단 상태(`waiting`/`external_job`)이고 그 종료
   처리(클레임 해제 포함)가 끝났다 — 세션이 아직 살아 있으면 attempt 종료 이벤트를
   기다린다.
2. Bead가 `open`이고 `closed`·`deferred`가 아니며 `awaiting_user`가 없다 — 종료·
   보류된 Bead는 재개하지 않고 `stage='stopped'`, `resume.error='bead_<status>'`로 키를
   지운다(UI-tqqp와 같은 처분).
3. `resume`이 null이거나 `launched_at` 없는 예약이 §6.4로 정산됐다.

재개는 `relaunchFromAttempt` 계열(`relaunchResolvedAttempt`, `scheduler.js:12516`)의
`continuation_mode='session'` 경로를 쓰되 새 진입 함수 `resumeExternalWait(wait_id,
{mode})`가 감싼다. 차이는 다음과 같다.

- **입장 예외.** 기존 `resume()`은 `checkAdmission`(`:10824`)을 거치고 그 안의
  `external_wait` 존재 검사에 막힌다. `resumeExternalWait`는 그 검사 하나만 우회하고
  — 우회 조건은 "이 레코드의 `bead_id`·`owner.attempt_id`와 prior attempt가 일치하고
  `completion`이 있다"는 것 — 나머지 admission(Bead 상태·`awaiting_user`·공급자
  게이트·환경 프로브)은 그대로 적용한다. 다른 어떤 경로도 `external_wait`를 우회하지
  않는다.
- **예약 → launch → 정산.** `makeAttemptId`로 새 attempt id를 먼저 만들고 레코드에
  `resume={mode, attempt_id, reserved_at}`를 원자 기록한 뒤 `launchSession`을 부른다.
  입력은 `resume_session_id: prior.session_id`와 `fork_session: true`(2026-08-26 스펙
  §4의 조합 규칙: 두 값은 함께 간다), `launch_kind: 'resume'`, `resumed_from: prior`.
  launch 성공 readback 뒤 같은 처리에서 `resume.launched_at`·`session_id`(fork id)를
  기록하고 `bd update --unset-metadata external_wait`를 쓰고 readback하며
  `stage='resumed'`로 닫는다. Discord `🚀 재개` 알림은 기존 `attemptStarted`가 낸다.
- **프롬프트.** `resumePrompt(...)` 뒤에 완료 페이로드 블록 `## 외부 작업 완료`를
  붙인다: 잡별 `job_id · state · exit_code · evidence`, `expected` 경로별
  존재·크기·mtime, `recovery_needed`, 로그 경로, `completion.digest`, 그리고
  "관찰 완료는 구현 완료가 아니다 — 아티팩트의 의미 검증·복구·커밋·완료는 이
  세션이 한다" 한 줄. Codex 세션은 같은 입력으로 `codex exec fork`가 된다(2026-08-26
  스펙 §4).
- **fork 자격 실패.** `prior.session_id` 부재, 전사 부재(`transcriptPresent`), 워크트리
  부재(`deps.worktree.exists`), 러너 불일치 중 하나면 **launch 없이** 예약을 지우고
  `resume.error=<사유>`를 기록한다. 키는 남고 카드는 `⛔ 조치 필요 · 재개 실패 ·
  <사유>`와 두 출구 `[이어하기]`(fork 재시도)·`[새 세션으로]`(mode `fresh`)를 그린다.
  fresh는 사람의 클릭으로만 열리며 같은 완료 페이로드를 받는다. 이 처분은 형제 계약
  `external_wait.completion.resume.fork_unqualified`와 같다.

### 6.3 사용자 세션 재개 (owner=session)

완료 시 Worker는 `notifyWaitReasons`의 `notify_plan.on_complete` 갈래(지금 선언만
되고 소비되지 않는 자리, `wait-judgment.js:261`)로 Discord `✅ 외부 작업 완료 ·
<bead> · <잡 요약>`을 한 번 보내고(`claimWaitNotifications` 중복 제거), 카드는
`⏳ 외부 작업` 배지를 `✅ 완료 · 이어하기 대기`로 바꾼다. 자동 재개는 하지 않는다 —
사용자가 그 세션을 아직 쓰고 있을 수 있어 소유자가 둘이 된다(사용자 결정 2026-09-21).

`[이어하기]`(= `POST .../resume {mode:'fork'}`)는 `qualifySessionFork(metadata, null)`
로 `session_ref`의 마지막 항목을 판정해 §6.2와 같은 `resumeExternalWait`(예약 →
fork launch → 정산, 완료 페이로드)를 레코드의 `worktree` 경로에서 연다. 이때 Worker가
Bead를 `in_progress`로 클레임하며 이후 소유는 Worker다. 자격이 서지 않으면
(`no_session_ref`·`unsafe_session_id`·`provider_mismatch`·`not_local`) §6.2와 같이
launch 없이 `resume.error`를 기록하고 `[새 세션으로]`가 유일한 자동 출구다.

`/resume`의 허용 조건: `stage='completing'`이고, `owner.kind='session'`이거나
`owner.kind='worker'`이면서 `resume.error`가 있을 때. `mode='fork'`는 예약이 없을
때만, `mode='fresh'`는 언제나 새 fresh attempt를 연다(같은 예약·정산 규칙).

### 6.4 재시작 정산

Worker 부팅 시 `stage='completing'`이고 `resume.attempt_id`가 있는 레코드를 본다.
`launched_at`이 있으면 정산 미완이다: 키를 unset하고 `stage='resumed'`로 닫는다.
`launched_at`이 없으면 그 attempt id가 queue store에 존재하는지 본다 — 존재하면
launch는 됐던 것이므로 같은 정산을 하고, 없으면 예약을 지우고 §6.2를 한 번 다시
시도한다. `completion` 하나만으로 재개 여부를 추정하지 않는다.

## 7. 소비자 카드 표면 (`app/views/worker/`)

카드 문법 스펙(2026-08-25 §5.1)의 슬롯 배정 — 새 요소는 여기서 슬롯을 정한다:

| 슬롯 | 요소 | 재료 |
|---|---|---|
| 1 정체성 | 배지 `⏳ 외부 작업` · `completing`은 `✅ 완료 · 이어하기 대기`(session) / `↻ 재개 중`(worker) · 이상 시 `⚠ 지연 · <사유>` / `⛔ 조치 필요 · <사유>` (기존 대기 판정 배지 어휘, 클릭 = 근거 팝업) | `queue.external_waits` 행 (§5 레코드 투영) |
| 1 조작 | `[지금 확인]` (`check`) · `[관찰 중단]` (`stop`) · `[이어하기]` (`resume` fork; §6.3 허용 조건) · `[새 세션으로]` (`resume` fresh; `resume.error`가 있을 때만) — 넷 다 `.op-btn` | 레코드 `stage`·`owner`·`resume` |
| 3 진행 | `headline`: `<host> 작업 <job_id> · RUNNING · 경과 3h12m` (잡이 여럿이면 `잡 2건 · 완료 1 · 실행 1`) · `release`: `완료되면 같은 세션을 이어간다` / `완료 · [이어하기]를 누르면 세션을 fork해 이어간다` · 오류 줄 `관찰 오류 n회 · <last_error>` | 레코드 |
| 5 좌표 | `ssh <host>` 칩 · 잡 번호 칩(클릭 = 복사) · `log <path>` 복사 | 레코드 |
| 7 시각 | `제출 <t> · 마지막 확인 <t> · 다음 <t>` → 완료 뒤 `완료 <t>` | 레코드 |

경과 시간은 `submitted_at` 기준으로 클라이언트가 그린다(기존 `elapsed_word` 슬롯을
`external_job` kind에서만 채운다). `WAIT_KINDS`의 `external_job` 종류 라벨을 `외부
계산`에서 `외부 작업`으로 바꾸고 재료를 게이트 행이 아니라 §5 레코드로 바꾼다;
대표 사유 순서·판정 글리프·중복 억제 키 등 `wait-vocabulary.js`의 나머지 규칙은
그대로다. `⛓ 선행 대기`·`⛓ <ID>`는 이 대기에 그리지 않는다 — `blocks` 엣지가 없기
때문이다(재료가 없는 줄은 그리지 않는다).

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
  제거한다(형제 스펙 §5).
- `preamble.js`의 결과 줄 문법과 `terminalResultOf`는 `대기 · external:<wait_id>`를
  `waiting_external`로 읽고, `대기 · blocks:` 처리는 선행 게이트용으로 그대로 남는다.

## 9. 검증과 수용 기준

- 단위: (a) 등록 판정 — J 비어 있음→done, PENDING→detached, RUNNING 잔여 ≤ 예산→hold,
  잔여 > 예산·UNLIMITED→detached, 혼합(terminal 1 + RUNNING 1)은 J만으로 판정,
  process→hold. (b) hold 예산 — 세 번째 호출까지 hold, 네 번째 호출은 관찰 없이
  detached이고 `external_wait` 키가 쓰인다; hold 중 완료는 `done`이고 재개가 시작되지
  않는다. (c) slurm/process 어댑터 파서 — 현행 Python 테스트 케이스(터미널 scontrol,
  빈 squeue + 로그 트레일러, 오래된 같은 번호 블록 무시, VANISHED)를 JS로 옮긴다.
  (d) `proveExternalWait` — 레코드 불일치는 waiting이 아니라 실패; 결과 줄 없는
  종료도 레코드가 있으면 waiting. (e) 자동 재개 — 원 attempt 종단 전에는 시작하지
  않고, 예약이 launch보다 먼저 기록되며, `launchSession` 입력에 `resume_session_id`와
  `fork_session:true`가 함께 실리고 프롬프트에 완료 블록이 있으며, launch 성공 뒤
  키 unset·`resumed`; 자격 실패는 launch 없이 `resume.error`. (f) 입장 —
  `external_wait` 존재만으로 `validateAdmission`이 거절하고 `resumeExternalWait`의
  일치 조건에서만 우회된다. (g) `/resume` — 허용 조건 밖은 409, `mode='fresh'`는
  fork 자격과 무관하게 연다. (h) 재시작 정산 — `launched_at` 있음/없음·attempt 존재
  여부 네 조합. (i) 보존 — `external_job` waiting attempt는 `resumableResidueAttempts`
  후보이며 preflight·stale 재확인이 preserve로 읽는다.
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
   `terminalResultOf`, `admission.js` 제외(+재개 우회 조건), `failure-class.js` cause.
2. `wait-store-observer` — `server/worker/external-wait/` store·단계 전이·어댑터·관찰기·
   완료 기록.
3. `api-routes` — `server/routes/worker-queue.js` 옆 `external-wait` 라우트(등록
   판정·롱폴 hold·check·stop·resume).
4. `worker-resume` — `proveExternalWait`, 보존 후보 추가, `resumeExternalWait`(예약·
   fork·정산·재시작 정산)·완료 페이로드 프롬프트, `on_complete` 알림.
5. `card-surface` — `WAIT_KINDS.external_job` 재료 교체와 라벨, 배지·조작·헤드라인·
   슬롯 5·7, 상세 패널 잡 표, 레거시 행·오버레이·수집기 삭제.

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
  `external_job`을 두 번째 보존 세션 사유로 더하고 그 경로를 fork로 연다.
- 전제: ADR 0014 — 새 배지·조작은 카드 문법 스펙의 슬롯을 먼저 정한 뒤 단다(§7).
- 전제: ADR UI-6icf — 재개 조작은 ⏸·▶ 둘이고 실패 타일의 이어하기는 유지된다; §7의
  네 조작은 대기 카드의 슬롯 1 조작이며 실행 중 attempt의 조작을 바꾸지 않는다.
- 외부 작업 대기는 별도 게이트 Bead·`blocks` 엣지가 아니라 소비자 Bead의 `external_wait`
  상태이고, 관찰·완료 인식·알림·재개는 beads-ui Worker가 한 런타임에서 소유하며,
  완료는 보존 세션의 fork 재개(Worker 소유는 자동, 세션 소유는 알림 뒤 `[이어하기]`,
  자격 실패는 launch 없이 사람의 `[새 세션으로]`)다. **되돌리기 어렵다**: 레거시
  관찰 경로·게이트 카드를 지우고 계약 키를 더해 이전 인계로 돌아가려면 두 리포를
  함께 되돌려야 한다. **맥락 없이는 놀랍다**: 대기 Bead가 `bd ready`에 나열되는데
  Worker가 집지 않고, `bd dep list`에 아무 엣지가 없다. **실제 절충**: §2의 네 대안
  — 세션 유지(토큰·슬롯·수명), 게이트 유지+fork(이중 표면·metadata 금지 조항 유지),
  Python 어댑터 재사용(두 런타임), 자동 fresh(맥락 없는 세션) — 를 각각 기각했다.
  이 결정은 ADR 0034의 "재스캔 후보는 waiting attempt와 `prerequisite_unmet`
  admission"·"복귀 판정은 `bd ready` 한 번" 조항을 `external_job` waiting attempt에
  대해 뒤집고(복귀 신호는 완료 이벤트, 재스캔 후보에서 제외; 이벤트 구독·throttle·
  not-ready 무기록은 승계), ADR UI-3pu9가 승계한 "새 Beads 상태·metadata·가짜
  의존성은 만들지 않는다" 조항을 `external_wait` 한 키에 대해 뒤집으며 종류 라벨
  `외부 계산`을 `외부 작업`으로 바꾼다(슬롯 1 배지 하나·대표 사유 순서·`manual_only`·
  자동 진행 꺼짐 비표시는 승계).
  `summary`: "외부 작업 대기는 게이트 Bead가 아니라 소비자 Bead의 external_wait 상태이고 관찰·완료·재개는 beads-ui Worker가 소유하며 완료는 보존 세션의 fork 재개다 — Worker 소유는 자동, 세션 소유는 알림 뒤 [이어하기], fork 자격 실패는 launch 없이 [새 세션으로]" → ADR, supersede 0034·UI-3pu9
