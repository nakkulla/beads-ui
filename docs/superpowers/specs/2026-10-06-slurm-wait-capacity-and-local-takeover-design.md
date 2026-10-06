---
scope:
  - server/worker/external-wait/
  - server/worker/wait-judgment.js
  - server/worker/attach.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - server/external-wait-settings.js
  - app/protocol.js
  - app/protocol.md
  - app/views/worker/
  - app/views/monitor/
  - app/views/detail-panel/index.js
  - app/views/settings-dialog/
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# Slurm 대기 카드는 막힌 이유와 클러스터 용량을 보이고, 사람이 확인하면 워크플로 전체를 Slurm 밖에서 바로 실행한다

- Bead: UI-qbgj (`spec_backed`)
- 작성: 2026-10-06 · r0
- 사용자 결정: 2026-10-06 대화 — 바로 실행은 워크플로 전체(하위 단계 포함)를 Slurm 밖으로 꺼낸다. 자원 기본값은 실제 남는 자원의 80%이고 비율은 beads-ui 설정에서, 값은 실행마다 확인 창에서 고친다.

## 1. 목표

PROSTATE-c3o의 head job 249043(wallace, 2 CPU·8G)은 `Reason=Resources`로 4시간 넘게 대기했다. 카드에는 `대기 중`만 보여 왜 막혔는지, 언제 풀릴지, 다른 길이 있는지 판단할 재료가 없었다. 실측(2026-10-06 14:54, `ssh wallace squeue/sinfo/scontrol/free`): 단일 노드 112 CPU가 모두 다른 사용자 작업에 배정(`sinfo` 112/0/0/112)됐다. 배정한 쪽의 실제 부하는 ~61코어, 쓸 수 있는 메모리는 ~900G다. 다른 사용자의 16코어 배열 작업 39개가 앞에 있어(`priority/basic`, FIFO) Slurm 예상 시작(2026-10-08 13:38)보다도 늦어질 수 있다.

1. 대기 중인 Slurm 등록 잡 카드가 대기 이유, 앞의 대기 작업 수, Slurm 예상 시작, 파티션의 Slurm 배정 현황, 그 서버의 실제 부하·쓸 수 있는 메모리를 보인다.
2. 사람이 `▶ 바로 실행`을 눌러 확인하면, 같은 서버에서 그 작업을 Slurm 밖에서 실행하고 원 Slurm 작업을 취소한다. 워크플로 head job이면 하위 단계까지 모두 정한 코어·메모리 안에서 로컬로 돈다. 대기 관찰은 그 로컬 프로세스를 이어받아 끝나면 평소처럼 재개한다.
3. 기본 자원은 그 서버의 실제 여유 × 설정 비율(기본 80%)이고, 비율은 서버 전역 설정에서 바꾼다.

## 2. 검증된 전제

- 대기 등록은 `POST /api/worker/external-wait` 하나이고 body는 `validRegistration`이 검증하며, 같은 Bead에 살아 있는 레코드가 있으면 409 `wait_exists`다 — server/worker/external-wait/service.js:28, server/worker/external-wait/service.js:211
- 서비스 공개 메서드에 등록 뒤 잡을 바꾸는 것은 없고(`register`·`check`·`stop` 등), `store.update`는 `jobs` 변경 자체는 막지 않는다 — server/worker/external-wait/service.js:460, server/worker/external-wait/store.js:350
- 관찰기는 ssh를 기다린 뒤 시작 시점의 `record.jobs`로 저장 레코드를 통째로 덮어쓰고, 진행 중 관찰 맵은 내부에만 있다 — server/worker/external-wait/observer.js:242, server/worker/external-wait/observer.js:360
- 어댑터 어휘는 `slurm`·`process` 둘이고 slurm 관찰 기본 주기는 120초다 — server/worker/external-wait/contract.js:18, server/worker/external-wait/contract.js:40
- slurm 어댑터는 ssh 한 번에 `squeue -h -j <id> -o '%T'`와 `scontrol show job` 전체를 읽고, `key=value`를 모두 뽑지만 `Reason`·대기 중 `StartTime`·`Partition`은 버린다. 하위 잡 조회는 잡을 바꾸지 않는다 — server/worker/external-wait/adapters/slurm.js:168, server/worker/external-wait/adapters/slurm.js:239, server/worker/external-wait/adapters/slurm.js:542, server/worker/external-wait/adapters/slurm.js:643
- 하위 잡 조회는 항목별 `timeout`으로 감싼다 — server/worker/external-wait/adapters/slurm.js:159
- process 어댑터는 Worker 호스트 로컬 `ps -p`·로컬 파일 읽기이고 종료 코드는 로그의 `^rc=N$` 줄로만 읽는다 — server/worker/external-wait/adapters/process.js:65
- 투영은 `projectExternalWait`이고 클라이언트는 최상위 키를 `EXTERNAL_WAIT_FIELDS`로 엄격히 거른다. 잡 단위 선택 필드는 따로 검사한다 — server/worker/attach.js:133, app/protocol.js:227, app/protocol.js:249
- 카드 조작은 서버가 `actions[]`로 내리고(`external_wait_check`, `confirm` 문구 포함), 클라이언트 공용 실행기가 WS로 보낸다 — server/worker/wait-judgment.js:458, server/worker/wait-judgment.js:473, app/views/worker/external-wait-action.js:126, app/protocol.js:433
- 입력이 있는 모달 패턴이 있다 — app/views/worker/provider-resume-dialog.js
- 카드 슬롯 3 잡 줄은 `externalJobLinesTemplate`, 줄 상한은 4다 — app/views/worker/lanes.js:4158, app/views/worker/wait-vocabulary.js:566
- 카드 동일성 테스트 고정 자료 `SHARED_BEADS`에 외부 대기 Bead가 없다 — app/views/monitor/card-parity.test.js:701
- 서버 전역 타이밍 설정은 모든 값을 정수 초로 저장하는 표다 — server/timing-settings.js:1, server/timing-settings.js:52
- 외부 대기 레코드의 어댑터 형태는 dotfiles 계약이 정의한다 — dotfiles docs/contracts/external-wait.md:31-35, dotfiles docs/contracts/workflow-state.yaml:1177
- `sjob run --local`은 Linux에서 `SJOB_LOCAL=1`·`SJOB_CPUS`·`SJOB_MEM`(GB)을 export하고, `~/.sjob/local/<Lnnn>.exitcode`에 종료 코드를 남기며 로그엔 `Exit code: N`만 쓴다 — dotfiles src/shell/bin/sjob:309, dotfiles src/shell/bin/sjob:764, dotfiles src/shell/bin/sjob:768
- sjob은 원 명령을 따로 기록하지 않는다. 생성 wrapper를 거꾸로 읽는 `parse_wrapper_script`는 runner로 시작하는 줄만 복원한다 — dotfiles src/shell/bin/sjob:1980, dotfiles src/shell/bin/sjob:1998
- 원격 비대화형 ssh의 PATH에 `sjob`이 없고 `~/.local/bin/sjob`에 있다 — `ssh wallace|fisher 'command -v sjob; ls -l ~/.local/bin/sjob'` (2026-10-06)
- `scontrol show node`의 `FreeMem`은 캐시를 빼서 실제로 쓸 수 있는 메모리보다 작다(wallace 59G 대 `free` available 902G) — 같은 날 `ssh wallace` 실측
- 연구 저장소 head job은 `scripts/run_workflow.sh`가 `SNAKEMAKE_PROFILE`(기본 `profiles/slurm`)로 snakemake를 띄우고, slurm 프로필이 rule마다 `sbatch`를 낸다. `profiles/local`은 Mac용(cores 4, conda 배포 없음)이다 — research-repo-template `template/{% if remote_host %}scripts{% endif %}/run_workflow.sh.jinja`, `template/profiles/local/config.yaml`, prostate `scripts/run_workflow.sh`(wallace 실측)
- 미확인: 다중 노드 파티션에서 ssh 호스트가 계산 노드가 아닐 때의 표시 — 현재 두 클러스터 모두 단일 노드라 실측할 수 없다(§3.1의 노드 일치 조건으로 막는다).

## 3. 설계

### 3.1 용량 재료 (관찰, 표시 전용)

slurm 등록 잡의 상태가 `PENDING`일 때만, 기존 관찰 ssh 한 번 안에서 읽기 전용 조회를 더해 잡 표시 필드 `capacity`를 채운다. 상태가 바뀌면 다음 관찰에서 지운다.

- `reason`: `scontrol show job`의 `Reason`. 표시어는 `Resources`→자원 부족, `Priority`→우선순위, `JobArrayTaskLimit`→배열 동시 제한, `Dependency`→선행 대기이고 나머지는 원문이다.
- `est_start`: 대기 중 `StartTime`이 ISO 시각이고 지금 이후면 그 값, 아니면 없음.
- `partition`과 `ahead`: 같은 파티션의 대기 잡(배열 태스크 펼침) 중 우선순위가 더 높거나, 같고 먼저 제출된 잡의 수와 CPU 합이다. `Dependency*`·`JobHeld*`·`BeginTime` 사유 잡은 세지 않는다.
- `slurm`: 파티션 노드 합의 `CPUAlloc/CPUTot`, `AllocMem/RealMemory`.
- `host`: ssh 호스트 자신의 CPU 수·1분 부하(`/proc/loadavg`)·`MemAvailable`이다. 호스트 이름이 파티션 노드 중 하나일 때만 채운다. 바로 실행이 도는 곳이 이 호스트라서 이 숫자만 의미가 있다.
- `observed_at`: 재료를 읽은 시각.

규칙(ADR UI-18a5 하위 잡 조항과 같은 방식):

- 표시 재료일 뿐이다. 등록 판정·hold 판정·`completion`·`completionDigest`·판정 배지·알림에 들어가지 않는다.
- 각 조회는 `timeout`(5초)으로 감싼다. 재료 실패는 저장된 `capacity`를 그대로 두고, 레코드의 `error_count`·`last_error`·백오프에 닿지 않는다.
- 투영은 잡 단위 선택 필드 `capacity`를 더한다. `EXTERNAL_WAIT_FIELDS`(최상위 키)는 바꾸지 않는다.

### 3.2 `sjob takeover` (dotfiles, 이 스펙이 계약을 정함)

```
sjob takeover <slurm-job-id> -c <cpus> -m <mem_gb> --json
sjob takeover <slurm-job-id> --result --json
```

- 묻지 않는다. stdout에는 JSON 한 객체만 쓴다. 성공하면 exit 0, 거부·실패하면 exit 1이고 그때도 `{ok:false, reason, message}`를 쓴다.
- **실행 기록**: 이제부터 `sjob run`(Slurm 제출)은 wrapper 옆에 `<wrapper>.launch.json`을 남긴다. 담는 값은 `script_path`·`script_args`·`wrapper`(`--wrapper`)·`cwd`·`name`·`project`·`workflow`·`notify`다. takeover는 이 기록으로만 원 명령을 재구성하고 wrapper를 거꾸로 읽지 않는다. 기록이 없으면 `no_launch_record`로 거부한다.
- 거부 조건과 사유 어휘:
  - `not_found`, `not_owner`(UserId≠$USER), `not_pending`
  - `no_launch_record`
  - `workflow_local_profile_missing`: workflow head(`workflow: true` 또는 `script_path`가 `<cwd>/scripts/run_workflow.sh`)인데 `<cwd>/profiles/server-local/config.yaml`이 없음
  - `insufficient_host_capacity`: 요청 CPU > CPU 수 − 1분 부하(내림), 또는 요청 메모리 > `MemAvailable`
  - `local_start_failed`, `busy`(같은 잡 takeover 진행 중; flock)
- **순서**:
  1. `scontrol hold <id>`를 한다. 실패하면(이미 시작·종료됨) `not_pending`으로 거부한다.
  2. `sjob run --local`과 같은 경로(같은 레지스트리 `Lnnn`, exitcode 파일, 새 로그, `SJOB_*` env)로 `cwd`에서 같은 script·인자를 띄운다. 알림은 실행 기록의 `notify`를 따른다.
  3. 프로세스가 살아 있는지 확인한다.
  4. `scancel <id>`를 한다.
  - 2·3이 실패하면 `scontrol release <id>`를 하고 `local_start_failed`로 거부한다.
  - 4가 실패해도 로컬 실행은 유지한다. hold된 원 잡은 시작하지 않는다. 결과에 `slurm_cancel_failed: true`를 남긴다.
- **성공 JSON**: `{ok:true, slurm_job_id, local_id, pid, process_start, host, workdir, log_path, exitcode_path, cpus, mem_gb, slurm_overcommit, slurm_cancel_failed}`
  - `process_start`는 `LC_ALL=C ps -p <pid> -o lstart=`이다.
  - `slurm_overcommit`은 요청이 노드의 Slurm 미배정 CPU·메모리를 넘었는지다. 거부 사유가 아니다(사람이 확인 창에서 이미 봤다).
- **결과 보존**: 결과 JSON을 `~/.sjob/local/takeover-<slurm-job-id>.json`에 남기고, `--result`는 그것을 다시 출력한다(§3.4 결과 불명 복구).

### 3.3 서버 로컬 프로필 (research-repo-template, 감싼 외부 unit)

- 템플릿은 scheduler가 slurm인 프로젝트에 `profiles/server-local/config.yaml`을 렌더한다. executor 없음(로컬), `software-deployment-method: conda`, `printshellcmds`, `rerun-incomplete`, `default-resources: mem_mb=8000`.
- `run_workflow.sh`는 `SJOB_LOCAL=1`이고 `SNAKEMAKE_PROFILE`이 비어 있으면 `profiles/server-local`을 쓴다. 그리고 `--cores "$SJOB_CPUS" --resources "mem_mb=$((SJOB_MEM*1024))"`를 더한다. 그래서 바로 실행이 아니어도 `sjob run --local --workflow`가 같은 방식으로 돈다.
- 기존 프로젝트는 `copier update`로 받는다(§8 prostate unit).

### 3.4 바로 실행 조작 (beads-ui)

- **노출**: 레코드 stage가 `hold`·`detached`이고 잡이 정확히 하나이며 그 잡이 `PENDING`인 slurm이면, 서버가 카드 조작 `external_wait_takeover`(`▶ 바로 실행`, placement `card`)를 내린다. owner 종류(worker·session)는 가리지 않는다.
- **확인 창**: 누르면 모달(`provider-resume-dialog` 패턴)이 열린다. 창의 구성은 다음과 같다.
  - CPU 칸: 기본값은 `floor((host.cpus − host.load1) × 비율)`이다.
  - 메모리(G) 칸: 기본값은 `floor(host.mem_available × 비율)`이다.
  - `capacity.host`가 없으면 두 칸을 비워 두고, 사람이 채워야 실행 버튼이 켜진다.
  - 안내 문구에는 다음이 들어간다.
    - Slurm 배정 현황과 실제 여유
    - 요청이 Slurm 미배정분을 넘으면 `공용 서버: Slurm이 다른 사용자에게 배정한 자원을 나눠 쓴다` 경고
    - `원 Slurm 작업 <id>는 취소되고, 워크플로면 하위 단계까지 이 서버에서 <c>코어 안에서 돈다`
- **WS `external_wait_takeover`** `{root_dir, wait_id, cpus, mem_gb}`:
  1. 입력을 검증한다(`cpus`·`mem_gb` 정수 ≥1).
  2. 레코드별 조작 잠금을 잡는다. 진행 중 관찰은 끝나기를 기다리고, 잠금 동안 그 레코드 관찰을 건너뛴다. 이미 잡혀 있으면 `busy`다.
  3. 현재 레코드로 노출 조건을 다시 판정한다.
  4. `ssh -o BatchMode=yes <ssh_host> '$HOME/.local/bin/sjob takeover <id> -c .. -m .. --json'`를 실행한다(60초).
  5. 결과에 따라 처리한다.
     - `ok:true`면 `store.update`로 그 잡을 제자리에서 `sjob_local` 잡으로 바꾼다(§3.5). `next_observation_at=지금`으로 두고, timeline `user_action`을 남기고, 변경을 통지한다.
     - `ok:false`면 레코드를 바꾸지 않고 사유 문구로 오류를 돌려준다.
     - ssh 실패·시간 초과·해석 불가면 결과 불명이다. 레코드 `last_error='takeover_unknown'`을 쓰고, 다음 관찰 차례에 `--result --json`을 한 번 읽어 성공이면 위와 같이 바꾼다. 결과 파일도 없으면 원 slurm 관찰을 그대로 잇는다(hold된 잡은 카드의 대기 이유가 `JobHeldUser`로 드러난다).
- bd `external_wait` 키와 `wait_id`, stage, owner, hold 예산은 바뀌지 않는다.

### 3.5 `sjob_local` 어댑터

- 잡 형태: `{adapter:'sjob_local', ssh_host, local_id, pid, process_start, workdir, log_path, exitcode_path, submitted_at, expected, name, takeover_from:{job_id, at}}`
  - `expected`·`name`은 원 slurm 잡에서 그대로 옮긴다.
  - `bead-wait register`는 이 어댑터를 받지 않는다. takeover만 만든다.
- 관찰은 ssh 한 번이다. `LC_ALL=C ps -p <pid> -o lstart=`, `cat <exitcode_path>`, `expected` 원격 `stat`(slurm 어댑터와 같은 방식)을 읽는다.
  - `lstart`가 `process_start`와 같으면 `RUNNING`이다.
  - 프로세스가 사라졌고 exitcode가 정수면 0은 `COMPLETED`, 아니면 `FAILED`이고 evidence는 `exitcode`다.
  - 프로세스가 사라졌는데 exitcode가 없으면 `VANISHED`, `recovery_needed`다.
  - 주기는 slurm 관찰 주기 설정을 쓴다(원격 ssh 비용이 같다).
- 완료 digest의 잡 식별자는 `<ssh_host>:<local_id>`다. 완료 프롬프트는 `Slurm <id>에서 바로 실행으로 전환(<at>)` 한 줄을 더한다. 재개된 세션이 결과가 로컬 실행에서 나왔음을 안다.
- 하위 잡(`spawned`)은 slurm 잡에만 있다. 전환 때 마지막 값을 표시용으로 보존하고 더 갱신하지 않는다.

### 3.6 표시 (카드·상세·설정)

- **카드 슬롯 3**(어디까지 왔나): `PENDING` slurm 잡 줄 바로 뒤에 최대 두 줄이 온다.
  - `대기 사유 자원 부족 · 앞 39건 · Slurm 예상 10/08 13:38`
  - `debug CPU 112/112 배정 · 실제 부하 61 · 쓸 수 있는 메모리 902G`
    - `host`가 없으면 `debug CPU 112/112 배정`까지만 보인다.
  - 재료가 없는 항목·줄은 그리지 않는다.
  - 레코드에 잡이 둘 이상이면 카드에는 그리지 않고 상세에만 보인다.
  - `sjob_local` 잡 줄은 `<글리프> <호스트> <이름> 로컬 <상태어> <경과>`다.
- **카드 슬롯 6**(foot): `▶ 바로 실행` `.op-btn`이 `[지금 확인]` 뒤에 선다.
- **상세 패널**: 잡 표 아래에 같은 용량 줄을 보인다. `sjob_local` 행의 번호 칸은 `L003 · Slurm 249043에서 전환`, 자원 칸은 `16 CPU · 64G`다.
- 카드 문법 스펙 §5.1에 UI-qbgj 정정 문단을 더한다(슬롯 3 용량 줄, 슬롯 6 `▶ 바로 실행`, `sjob_local` 잡 줄).
- **Monitor·Worker 동등**: 두 탭이 같은 재료 함수를 쓴다. `card-parity.test.js` 고정 자료에 용량 재료가 있는 외부 대기 Bead를 더한다. §9 의도된 차이 행은 없다.
- **설정**: 서버 전역 `외부 작업` 그룹에 `바로 실행 기본 자원 비율(%)`을 둔다. 기본 80, 범위 10–100.
  - 결정: 타이밍 설정 표에 넣지 않고 같은 패턴(`{revision, overrides}`, 읽기 fail-quiet, 쓰기 strict, subscribe/set/snapshot WS)의 별도 저장소로 둔다 — 타이밍 표는 모든 값이 정수 초라는 불변식을 갖는다.

## 4. 오류와 대체

- 용량 재료 조회가 실패하거나 시간을 넘기면 저장된 재료와 시각을 그대로 보인다(§3.1). 오래된 재료는 시각으로 드러난다.
- takeover 거부는 사유 문구를 보이는 오류 하나다. 레코드는 그대로다.
- 결과 불명은 §3.4 복구 한 번이다. 반복 클릭은 `busy`로 막는다.
- `sjob_local` 관찰 실패는 기존 오류 백오프를 따른다.

## 5. 수용 기준

1. PROSTATE-c3o 같은 `PENDING` 단일 slurm 잡 카드에 대기 사유·앞 건수·예상 시작·Slurm 배정·실제 부하·쓸 수 있는 메모리가 보이고, 재료 조회 실패가 대기 판정·알림·백오프를 바꾸지 않는다.
2. `▶ 바로 실행`은 위 조건에서만 서고, 확인 창 기본값이 실제 여유 × 설정 비율이다.
3. takeover 성공 뒤 같은 `wait_id` 레코드의 잡이 `sjob_local`로 바뀌고, 원 Slurm 잡은 취소되며, 로컬 종료 시 기존 완료·재개 경로가 돈다.
4. workflow head는 `profiles/server-local`이 있는 프로젝트에서만 실행되고, 하위 단계가 Slurm에 제출되지 않는다.
5. Worker 탭과 모니터 탭의 같은 Bead 카드가 같은 줄·버튼을 갖는다.

## 6. 테스트

- `adapters/slurm.test.js`: 가짜 `scontrol`·`squeue`·`/proc` 출력으로 `capacity` 파싱, 비 PENDING이면 비움, 조회 실패 시 보존·`error_count` 불변.
- `adapters/sjob-local.test.js`(새): RUNNING·COMPLETED·FAILED·VANISHED, `lstart` 불일치(pid 재사용).
- `service.test.js`·`observer.test.js`: takeover 성공 시 제자리 교체와 `wait_id` 불변, 진행 중 관찰과 겹칠 때 교체가 사라지지 않음, `ok:false` 무변경, 결과 불명 → `--result` 복구.
- `wait-judgment.test.js`: 노출 조건 4가지 경계.
- `lanes.test.js`·`running-grid.test.js`·`detail-panel/index.test.js`: 용량 줄, 다중 잡이면 카드에서 생략, `sjob_local` 줄.
- `card-parity.test.js`: 새 고정 자료.
- 설정: 저장소 읽기 fail-quiet·쓰기 strict, 다이얼로그 기본값 계산.
- dotfiles(형제 unit): `sjob takeover` 거부 사유별 테스트와 hold→start→cancel 순서·release 보상.

## 7. 대안

- 파서로 wrapper에서 원 명령 복원: 기존 파서가 `--wrapper`·확장자 없는 실행을 놓친다 — 실행 기록 채택.
- beads-ui가 `scancel`·`sjob run --local`을 직접 조합: sjob 형식 지식이 beads-ui로 새고 hold 보상 순서를 둘이 나눠 갖는다 — sjob 한 명령 채택.
- head job만 로컬: 하위 단계가 다시 같은 큐 뒤에 선다 — 사용자 결정으로 워크플로 전체.

## 8. 비목표

- 다른 서버로 옮겨 실행(데이터 마운트가 서버마다 다르다; fisher에 `/BiO3` 없음).
- 자동 바로 실행이나 대기 시간 기준 알림.
- 다중 잡 레코드의 takeover.
- 실제 자원 사용 강제(cgroup) — snakemake `--cores`·`--resources`가 경계다.

## 경계·후속

- 크로스 리포 unit: dotfiles — `sjob takeover`·실행 기록(`<wrapper>.launch.json`)·`docs/contracts/external-wait.md` 정정(`sjob_local` 어댑터 형태, slurm 잡 표시 필드 `capacity`, takeover 제자리 교체 조항)과 `workflow-state.yaml external_wait` 갱신(§3.1·§3.2·§3.5) quick_fix Bead dotfiles-kslis. UI-qbgj 구현 진입 전 선행(`blocks`)이다. dotfiles-k62bk(`--time`·Slurm 인지 `--local` 산정)와는 독립이다. 같은 파일을 만지므로 Worker 레인이 순서를 정한다.
- 감싼 외부 unit: research-repo-template(rig 없음) — `template/profiles/server-local/config.yaml`(slurm scheduler 조건부)와 `run_workflow.sh.jinja`의 `SJOB_LOCAL` 분기(§3.3). UI-qbgj 구현 안에서 착지한다. 검증은 `copier copy`로 렌더한 임시 프로젝트에서 `bash -n scripts/run_workflow.sh`와 `SJOB_LOCAL=1 SJOB_CPUS=2 SJOB_MEM=4`를 넣은 dry-run(`snakemake -n`)이 server-local 프로필을 쓰는지 확인한다.
- 크로스 리포 unit: prostate — `copier update`로 server-local 프로필·`run_workflow.sh` 분기 채택 quick_fix Bead PROSTATE-pbo. 선행은 UI-qbgj(템플릿 착지)다. 출처 provenance만 남기고 UI-qbgj를 막지 않는다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — beads-ui는 dotfiles 계약의 소비자다. `sjob_local` 어댑터와 `capacity` 필드는 계약 정정과 함께 움직인다(§8 dotfiles unit).
- ADR UI-18a5를 supersede해 다시 쓴다(새 id UI-qbgj).
  - 더하는 조항 1: Slurm 등록 잡이 대기 중이면 관찰은 같은 ssh 안의 읽기 전용 조회로 대기 사유·앞 대기 수·예상 시작·파티션 배정·ssh 호스트의 실제 부하와 쓸 수 있는 메모리를 표시 재료로 갖는다. 하위 잡처럼 대기 판정·완료·digest·알림에 들어가지 않는다.
  - 더하는 조항 2: 외부 잡을 바꾸는 유일한 경로는 사람이 확인한 `▶ 바로 실행`이다. 단일 PENDING slurm 잡을 `sjob takeover`(hold → 로컬 실행 → 취소, 실패 시 release) 한 명령으로 같은 호스트의 로컬 실행으로 옮긴다. 레코드는 같은 `wait_id`로 그 잡을 `sjob_local`로 제자리 교체한다. 관찰 자체는 여전히 잡을 바꾸지 않는다.
  - 더하는 조항 3: "실행 방식(작은 머리 잡 + 하위 잡)은 바꾸지 않는다"는 기본 실행 방식에 관한 것으로 유지한다. 바로 실행만 프로젝트의 `profiles/server-local`로 워크플로 전체를 정한 코어 안에서 로컬로 돌린다.
  - 나머지 조항은 모두 승계한다.
  - 되돌리기 어렵다: dotfiles `docs/contracts/external-wait.md`·`workflow-state.yaml`, `sjob takeover`·실행 기록, 연구 템플릿 `profiles/server-local`·`run_workflow.sh`와 그것을 받은 프로젝트, `adapters/slurm.js`·새 `sjob_local` 어댑터·`observer.js`·`service.js`, `attach.js` 투영, 카드·상세 렌더러, 완료 프롬프트가 함께 움직인다.
  - 맥락 없이는 의외다: 관찰 전용이던 외부 대기에 잡을 취소·실행하는 조작이 왜 하나 있는지, 왜 head job만이 아니라 워크플로 전체를 옮기는지.
  - 실제 트레이드오프가 있다: 큐 정체를 우회하는 대신 공용 서버에서 다른 사용자에게 배정된 자원을 나눠 쓰고, sjob 실행 기록이 없는 옛 작업은 대상에서 빠진다.
  - 통합: ADR UI-18a5와 소비자(`projectExternalWait`, 외부 대기 카드 표면, 상세 패널, 완료 프롬프트)를 공유한다. 그래서 새 주제가 아니라 UI-18a5의 다시 쓰기다.
  - `summary`: "beads-ui가 여는 대화형 세션(확인 필요·실패·외부 작업 완료)은 모두 [세션에서 이어가기] 하나로 열고 인계·인수·보류로 끝난다; [워커로 이어가기]는 대화 없이 Worker가 잇는 짝이고 인계는 그 행의 Worker 출구(같은 세션 재개·정리 재시도·폐기 재시도·머지 큐 재등록·attempt dispatch)를 사용자 답의 권한으로 많아야 한 번 실행하며 머지 게이트 위조 판정은 예외다; 외부 작업 완료 대화가 인수·인계 없이 끝나면 대기 키를 다시 써 완료 행으로 되돌린다; 자동 기동은 사람 판단 멈춤에만 두고 알림은 확인 필요·답 대기·Worker가 이어감·사람 인수 넷이다; 외부 작업의 하위 잡은 등록 잡과 같은 사용자·WorkDir에서 등록 잡 시작 이후 제출된 Slurm 잡이고 사용자 큐와 Slurm 작업 완료 기록만으로 관찰하며, 표시 재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다; 대기 중인 Slurm 등록 잡의 대기 사유·앞 대기 수·예상 시작·파티션 배정·호스트 실제 여유도 같은 관찰 ssh 안의 읽기 전용 조회로 얻는 표시 재료일 뿐 같은 자리에 들어가지 않는다; 외부 잡을 바꾸는 유일한 경로는 사람이 확인한 바로 실행으로, 단일 대기 Slurm 잡을 sjob takeover로 같은 호스트 로컬 실행(워크플로면 server-local 프로필로 하위 단계까지)으로 옮기고 같은 대기 레코드에서 sjob_local 잡으로 제자리 교체한다; 미분류 실패 재시도 사다리와 base_moved 재개 지연의 길이는 서버 전역 타이밍 설정이 정한다" → ADR, supersede UI-18a5
- 카드 용량 줄 두 줄·대기 사유 표시어 — UI 레이아웃·표시 형식(기본 제외 목록) → ADR 아님
- 바로 실행 기본 자원 비율 80%와 범위 10–100 — 값 조정(기본 제외 목록) → ADR 아님
- 비율 설정을 타이밍 표가 아닌 별도 서버 전역 저장소에 둠 — 되돌리기 쉬움: 저장 파일 하나와 설정 그룹 하나 → ADR 아님

## 구현 unit 후보

- 관찰: `capacity` 재료(`adapters/slurm.js`·투영·protocol) — anchor §3.1
- takeover: 조작 잠금·WS·`sjob_local` 어댑터·완료 프롬프트 — anchor §3.4·§3.5
- 표시·설정: 카드·상세·확인 창·설정 그룹·카드 문법 정정·동등 고정 자료 — anchor §3.6
- 감싼 외부 unit: research-repo-template — anchor §3.3
