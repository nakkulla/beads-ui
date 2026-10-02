---
scope:
  - server/worker/external-wait/adapters/slurm.js
  - server/worker/external-wait/observer.js
  - server/worker/external-wait/store.js
  - server/worker/external-wait/completion-prompt.js
  - server/worker/attach.js
  - app/protocol.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/lanes.js
  - app/views/detail-panel/index.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 외부 작업은 등록 잡이 던진 하위 Slurm 잡까지 이름으로 보인다 — 카드는 요약, 이슈 상세는 전체 표

- Bead: UI-q15q (`spec_backed`)
- 작성: 2026-10-02 · r1 (spec_review r1 astra REVISE b4/m2 반영 — 개수는 원격에서 자르기 전에 센다, 행 상한은 완료 행에만, 완료 기록 지원 안 함과 읽기 실패를 구분, ADR UI-nuwy supersede, 전제 정정·보강)
- 사용자 결정: 2026-10-02 대화
  - snakemake·sjob 로그에 기대지 않고 Slurm 정보만 쓴다. 번호 대신 이름으로 보인다.
  - 카드는 요약만 보이고 전체는 이슈 상세 외부 작업 섹션에 둔다.
  - 실행 방식(작은 머리 잡 + 하위 잡)은 바꾸지 않는다.
  - 카드 요약 줄은 개수와 이름 1~2개를 보이고, 실패가 있으면 실패 이름을 먼저 보인다.
  - 하위 잡 실패는 화면 표시만 한다. 알림·판정 배지는 바꾸지 않는다.
  - 상세 표의 완료 하위 잡은 접어 둔다.

## 1. 목표

1. 외부 작업 카드에서 등록된 잡을 번호 대신 이름으로 읽는다. 그 잡이 실행 도중 던진 하위 Slurm 잡에 대해 다음을 한눈에 본다.
   - 몇 개를 던졌고 몇 개가 끝났는지
   - 지금 무엇이 돌거나 실패했는지
2. 이슈 상세 외부 작업 섹션에서 하위 잡 전체를 이름·상태·경과/제한·자원·번호로 본다.
3. 하위 잡 판정은 Slurm 정보(사용자 큐, 잡 정보, Slurm 작업 완료 기록 파일)만 쓴다. snakemake가 아닌 sbatch 하위 잡도 같은 규칙으로 붙는다.
4. 대기 판정·완료·digest·재개·알림은 지금과 같다. 하위 잡은 표시 재료일 뿐이다.

용어:
- **등록 잡**: `bead-wait register`로 등록된 잡이다. 지금은 sjob으로 던진 머리 잡이다.
- **하위 잡**: 등록 잡이 실행 도중 던진 Slurm 잡이다.

## 2. 검증된 전제

기준: `origin/main` `d96dc22d`.

- 외부 대기 레코드 17건(4 워크스페이스)이 모두 slurm 어댑터이고 잡을 1개씩만 등록했다 — 명령: `~/.local/state/bdui/*/external-wait.json` 읽기
- 연구 저장소 세 곳의 등록 잡 로그 `Script:`·`Command:`는 모두 2코어·8G 머리 잡 안의 `snakemake --profile profiles/slurm`이다. ops 3건(hamilton)은 snakemake가 아니다 — 명령: wallace `grep -m3 -E "^(Script|CPUs):|Command:"` 4개 로그
- 관찰 ssh 한 번이 `squeue -j`·`scontrol show job`·로그 tail 200줄 투영·기대 산출물 `stat`을 실행한다 — server/worker/external-wait/adapters/slurm.js:27-69, server/worker/external-wait/adapters/slurm.js:248-273
- scontrol 출력은 `key=value` 전체를 읽지만 쓰는 값은 `JobId`·`SubmitTime`·`TimeLimit`·`RunTime`·`JobState`·`ExitCode`뿐이다 — server/worker/external-wait/adapters/slurm.js:152-177
- 관찰기는 종결된 잡을 다시 관찰하지 않고, slurm 잡에는 시간 필드만 더 저장한다 — server/worker/external-wait/observer.js:81-117
- 레코드 검증은 잡의 필수 필드만 보고 추가 필드를 막지 않는다 — server/worker/external-wait/store.js:139-186
- 완료 digest는 잡별 `adapter`·`job_id`(process는 `pid`)·exit·근거·기대 산출물·`recovery_needed`만 해시한다 — server/worker/external-wait/decision.js:75-94
- 등록 판정은 등록 잡 집합만 본다 — server/worker/external-wait/decision.js:9-40
- 투영은 잡마다 정해진 필드만 복사한다. 클라이언트 검증은 최상위 키만 엄격하고 잡의 추가 필드는 막지 않는다 — server/worker/attach.js:133-166, app/protocol.js:115-173
- 카드 슬롯 3은 `externalJobRows`가 고른 등록 잡 줄(최대 4줄, `<글리프> <호스트> <잡 번호> <상태어> <경과>`)이고, 모든 카드 표면이 `waitReasonLines`의 `card` 갈래로 같은 함수를 쓴다 — app/views/worker/wait-vocabulary.js:409-475, app/views/worker/lanes.js:2741, app/views/worker/lanes.js:2841-2842, app/views/worker/lanes.js:4126-4167
- 배지는 등록 잡 수로 `⏳ 외부 작업 · a/n 완료`를 만든다 — app/views/worker/lanes.js:4097-4113
- 이슈 상세 외부 작업 섹션은 등록 잡마다 잡·상태·exit·기대 산출물·로그 열의 표를 그린다 — app/views/detail-panel/index.js:2387-2483
- 재개 완료 블록은 등록 잡별 번호·state·exit·근거·기대 산출물을 쓴다. Worker fork와 세션 재개가 같은 바이트를 쓴다 — server/worker/external-wait/completion-prompt.js:5-35
- 서버 headline과 완료 알림 문장은 등록 잡으로 만든다 — server/worker/wait-judgment.js:332-360, server/worker/notify.js:320, server/worker/notify.js:763
- ADR UI-nuwy는 결정 조항으로 "카드에 ssh·잡 번호·log 칩이 없고 상세 패널 `externalJobsTemplate`이 잡·상태·exit·expected·로그 표를 갖는다"와 "대기 레코드 투영 `projectExternalWait`·`EXTERNAL_WAIT_FIELDS`, `/resume` fork·fresh와 `/stop`의 서버 동작, 관찰기 주기·hold 예산·admission의 `external_wait` 거절은 바꾸지 않는다"를 두고, 외부 작업 대기의 관찰·완료·재개도 다룬다 — docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:239-241, docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:251-253, docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:438-446
- 열린 스펙 UI-18a5·UI-ny0h도 ADR UI-nuwy를 supersede하고, Finish의 ADR 단계에서 현재 표를 다시 읽어 먼저 착지한 쪽을 대상으로 삼는다 — docs/superpowers/specs/2026-10-02-session-worker-continue-pair-design.md:207, docs/superpowers/specs/2026-10-02-worker-timing-settings-design.md:148
- 레코드 형식과 Slurm 관찰 프로그램의 정본은 dotfiles 계약이다. 관찰은 잡을 바꾸지 않는다 — dotfiles docs/contracts/external-wait.md:64-92, dotfiles docs/contracts/external-wait.md:109-125, dotfiles docs/contracts/workflow-state.yaml:1171-1212(`mutates_job: never`)
- 레코드 GET은 레코드 전체를 돌려주고 `bead-wait`가 그 소비자다 — server/app.js:170, dotfiles docs/contracts/external-wait.md:26
- wallace·hamilton 모두 `AccountingStorageType = accounting_storage/none`, `JobCompType = jobcomp/filetxt`, `JobCompLoc = /var/log/slurm_jobcomp.log`(누구나 읽기), `MinJobAge = 300`이다 — 명령: `scontrol show config`, `ls -la`
- 완료 기록 한 줄에는 `JobId`·`UserId`·`Name`·`JobState`·`TimeLimit`·`StartTime`·`EndTime`·`ProcCnt`·`WorkDir`·`Tres`(cpu·mem)·`SubmitTime`·`ExitCode`가 있고 comment는 없다. 최근 2000·5000줄에서 `EndTime`이 내림 없이 이어진다 — 명령: 두 호스트 `tail` + awk 순서 검사
- 248075·248076(PROSTATE-u6u의 하위 잡)은 등록 잡 248074와 같은 사용자·같은 `WorkDir`이고, 248074 시작 뒤에 제출됐다 — 명령: `squeue -o "%i|%u|...|%Z"`, 완료 기록 grep
- snakemake-executor-plugin-slurm 2.8.0은 하위 잡 이름을 실행 ID(`[<접두어>_]<uuid>`)로 쓰고, rule 이름을 comment `rule_<rule>[_wildcards_<w>]`에 둔다 — 명령: wallace prostate venv 설치 소스 grep(`submit_string.py`, `__init__.py:840-847,1101-1103`)
- snakemake는 실행 중 작업 폴더에 입력·출력 잠금(`.snakemake/locks/0.input.lock`·`0.output.lock`)을 두어 산출물이 겹치는 두 실행을 막는다 — 명령: wallace prostate `ls .snakemake/locks`(PROSTATE-u6u 실행 중)
- 설치된 플러그인 2.8.0 소스에는 Slurm 의존성(`--dependency`)·immediate submit 경로가 없다. wallace는 `DependencyParameters = (null)`이라, 앞 잡이 실패한 `afterok` 의존 잡은 취소되지 않고 대기로 남는다 — 명령: 플러그인 소스 `grep -i -E "dependency|immediate"` 무출력, `scontrol show config`
- sjob은 잡 이름 끝에 생성 꼬리 `__YYYYmmdd_HHMMSS_<hex>`를 붙인다 — dotfiles src/shell/bin/sjob:124
- 미확인: `squeue -t all`이 `MinJobAge` 안의 완료 잡을 comment와 함께 보이는지 — 조회 시점에 최근 완료 잡이 없었다. 안 보여도 §3.3의 이름 대체 규칙으로 동작한다

## 3. 설계

### 3.1 하위 잡 소속

- 기준은 등록 slurm 잡의 사용자(`UserId`), 작업 폴더(`WorkDir`), 시작 시각(`StartTime`)이다.
  - 등록 잡이 `scontrol`에 보이는 관찰에서 읽어 잡에 저장한다.
  - 등록 잡이 scontrol에서 사라진 뒤에는 저장값을 쓴다.
  - 기준 중 하나라도 없으면 하위 잡을 판정하지 않는다.
- 하위 잡은 다음을 모두 만족하는 Slurm 잡이다.
  - 등록 잡과 같은 호스트, 같은 사용자, 같은 `WorkDir`
  - `SubmitTime`이 기준 `StartTime` 이상
  - 같은 레코드의 등록 잡이 아님
- 한 하위 잡은 한 등록 잡에만 속한다. 같은 호스트·같은 폴더의 등록 잡이 여럿이면, 하위 잡 제출 시각 이전에 시작한 등록 잡 중 가장 늦게 시작한 잡에 붙인다.
- 결정: 다른 Bead의 외부 대기가 같은 폴더를 동시에 쓰는 경우는 구분하지 않는다. snakemake는 같은 폴더에서 산출물이 겹치는 두 실행을 잠그고(§2), 그 밖의 동시 실행은 표시만 섞일 뿐 판정·완료에는 영향이 없다.
- 판정 시점:
  - 등록 잡이 종결될 때까지 관찰마다 판정한다.
  - 등록 잡이 종결된 관찰에서도 한 번 더 판정해 마지막 상태를 남긴다.
  - 그 뒤로는 관찰기의 "종결 잡은 다시 보지 않는다" 규칙을 그대로 따른다.

### 3.2 관찰 재료

지금의 관찰 ssh 한 번 안에서 읽는다. ssh 호출 수는 늘지 않는다.

- **진행 중 하위 잡**: 사용자 큐에서 읽는다(`squeue -u <user> -t all`). `-t all`이 `MinJobAge` 안의 완료 잡까지 comment와 함께 보이면, 그 잡의 rule 이름도 여기서 얻는다(§2 미확인 전제). 읽는 값은 번호·이름·comment·상태·제출 시각·실행 시간·제한·CPU·메모리·`WorkDir`이다.
- **끝난 하위 잡**: `JobCompType`이 `jobcomp/filetxt`일 때 `JobCompLoc` 파일에서 읽는다.
  - 파일 끝에서 거꾸로 읽다가 `EndTime`이 기준 `StartTime`보다 이른 줄에서 멈춘다. 그래서 읽는 양은 등록 잡 시작 이후 끝난 잡 수에 비례한다(hamilton 파일 418MB를 매번 다 읽지 않는다).
  - 읽는 값은 번호·이름·상태·제출·시작·종료·CPU·메모리·`ExitCode`다.
- 개수는 자르기 전에 센다. 원격 프로그램이 두 재료를 잡 번호로 합치고(같은 잡이 두 곳에 있으면 완료 기록의 종결 상태가 우선), 소속 필터·중복 제거·상태별 집계를 먼저 한 뒤 표시 행을 고른다.
- 표시 행은 완료가 아닌 행 전부와, 가장 최근에 끝난 완료 행 300개다. 서버가 넘긴 "지난 관찰의 비종결 하위 잡 번호"는 찾으면 상한과 무관하게 행으로 돌려준다. 그래야 상태 전이를 놓치지 않는다.
- 경과는 Slurm이 준 실행 시간(큐)이나, 같은 원격 시계의 시작·종료 시각 차(완료 기록)로 계산한다. 원격과 서버의 시간대 차이에 기대지 않는다.
- 관찰은 잡을 바꾸지 않는다(`mutates_job: never` 유지).

### 3.3 이름

- **등록 잡**: `JobName`에서 sjob 생성 꼬리를 뗀 값이다.
- **하위 잡**은 다음 순서로 정한다.
  1. comment가 `rule_<rule>[_wildcards_<w>]`이면 `<rule>`이다. wildcards는 `title`에 둔다.
  2. 아니면 `JobName`에서 sjob 꼬리를 뗀 값이다.
  3. 그 값이 비었거나 UUID형 실행 ID를 담고 있으면, 이름 없이 번호로 보인다.
- 한 번 본 이름은 레코드에 남는다. 완료 기록에는 comment가 없기 때문에, 큐에서 본 rule 이름을 그대로 유지한다.
- 이름 판정은 순수 함수 하나(예: `externalJobDisplayName`)가 한다. 카드·상세·완료 블록이 같은 결과를 쓴다.

### 3.4 레코드와 투영

- 등록 slurm 잡에 관찰 필드를 더한다(예).
  - `name`: 원래 `JobName`
  - `anchor`: `{user, workdir, started_at}`
  - `spawned`: `{total, counts, rows, omitted}`
- `counts`는 `running`·`pending`·`completed`·`failed`·`unknown`이다. 앞의 넷은 매 관찰의 원격 집계(§3.2; 완료 기록을 지원하지 않으면 §4)이고, `unknown`은 서버가 저장 행과 비교해 센다. 그래서 `rows` 상한과 무관하게 정확하다.
- `rows` 항목은 번호·원래 이름·rule·상태·제출·시작·종료(또는 실행 시간)·제한·CPU·메모리·exit다.
  - 상한은 완료 행에만 적용하고 300개다. 완료가 아닌 행(실행·대기·실패·확인 중)은 모두 남긴다.
  - 완료 행이 넘치면 오래 끝난 순으로 빼고, 뺀 수를 `omitted`에 둔다.
- 상태 분류:

| 분류 | 조건 |
| --- | --- |
| `running` | `RUNNING`·`COMPLETING` |
| `pending` | `PENDING`·`CONFIGURING`·`REQUEUED`·`SUSPENDED` |
| `completed` | `COMPLETED`이고 exit가 0 또는 없음 |
| `failed` | 그 밖의 종결 상태, 또는 exit ≠ 0 |
| `unknown` | 지난 관찰에서 비종결이었는데, 이번 관찰의 두 재료 어디에도 없음(§4 조건 아래) |

- 하위 잡은 다음 어디에도 들어가지 않는다: 등록 판정, hold 판정, `completion`, `completionDigest`, 판정 배지(verdict), 알림.
- 투영(`projectExternalWait`)은 이 필드를 싣는다. 이것은 ADR UI-nuwy의 "투영을 바꾸지 않는다" 조항을 바꾼다(결정 (ADR 후보)). 최상위 키 `EXTERNAL_WAIT_FIELDS`는 그대로다. 새 필드가 없는 옛 레코드도 지금처럼 그려진다.
- 로그 내용은 여전히 저장하지 않는다.

### 3.5 카드 슬롯 3

- **등록 잡 줄**은 `<글리프> <호스트> <이름> <상태어> <경과>`다.
  - 이름이 없으면 지금처럼 번호를 쓴다.
  - 번호·원래 state·exit는 `title`로 간다.
  - 4줄 상한·정렬·`외 n건` 규칙은 등록 잡 줄에 그대로 적용한다.
- **하위 잡 요약 줄**은 등록 잡 줄 뒤에 둔다.
  - 개수 줄: `하위 잡 <n>개 · 완료 a · 실행 b · 대기 c · 실패 d · 확인 중 e`
    - 0인 항목은 뺀다.
    - `실패 d`는 위험 tone이다.
  - 이름 줄:
    - 실패가 있으면 `✕ <이름>[ · <이름>][ 외 k]`(가장 최근에 끝난 실패 2개).
    - 실패가 없고 실행 중이 있으면 `◐ <이름>[ · <이름>][ 외 k]`(가장 최근에 시작한 2개).
    - 둘 다 없으면 그리지 않는다.
    - 이름이 없는 잡은 번호로 쓴다.
  - 등록 잡이 1건이면 개수 줄과 이름 줄을 모두 그린다.
  - 등록 잡이 2건 이상이면 모든 등록 잡의 하위 잡을 합친 개수 줄 하나만 그린다.
  - 하위 잡이 없으면 아무것도 그리지 않는다.
- 슬롯 1 배지는 지금처럼 등록 잡만 센다.
- 줄 판정은 순수 함수(예: `externalJobRows`를 넓히거나 짝 함수 하나)가 한다. 렌더러는 그리기만 하고, Worker·Monitor의 모든 카드 표면이 같은 결과를 쓴다.

### 3.6 이슈 상세 외부 작업 섹션

- 열은 이름 · 상태 · 경과 / 제한 · 자원 · 번호 · exit · 기대 산출물 · 로그다.
  - 등록 잡 행의 이름 칸은 `<호스트> <이름>`이다.
  - 기대 산출물과 로그 열은 등록 잡 행만 채운다.
- 등록 잡 행 밑에 하위 잡 행을 들여 쓴다(`├`/`└`).
  - 실행 중 → 대기 → 실패 → 확인 중 순서로 항상 펼친다.
  - 완료는 `완료 <n>개 ▸` 한 줄로 접는다. 누르면 제출 순으로 펼친다.
  - `omitted`가 있으면 `완료 중 <n>개는 목록에서 생략` 줄을 둔다.
- 경과/제한:

| 상태 | 표시 |
| --- | --- |
| 실행 중 | 실행 시간 `/` 제한 |
| 종결 | 종료 − 시작 |
| 대기 중 | `대기 <제출 뒤 경과>` |

  - 제한이 `UNLIMITED`면 `/ 제한` 부분을 뺀다.
- 자원은 `<CPU>코어 <메모리>`다.
- 표는 지금처럼 같은 투영(큐 스냅샷의 `external_waits`)에서 그린다. 새 조회 경로는 없다.
- 좁은 폭에서는 표 영역 안에서만 가로 스크롤을 허용한다. 페이지는 가로로 넘치지 않는다.

### 3.7 재개 완료 블록

하위 잡이 있는 등록 잡 아래에 두 가지를 더한다.
- 한 줄: `하위 잡 <n>개 · 완료 a · 실패 d …`
- 실패 하위 잡마다 한 줄: `✕ <번호> <이름> · <state> · exit=<n>` (최대 10줄)

Worker fork와 세션 재개가 같은 바이트를 쓰는 규칙은 그대로다.

### 3.8 dotfiles 계약 정정 (선행)

`docs/contracts/external-wait.md`를 고친다.
- Record 절: slurm 잡의 관찰 표시 필드(`name`·`anchor`·`spawned`)를 넣는다. "하위 잡은 판정·완료·digest·알림에 들어가지 않는다"를 적는다.
- Slurm/sjob observation 절: 원격 프로그램 목록에 사용자 큐 조회와 Slurm 작업 완료 기록 파일 읽기를 더한다. 둘 다 읽기 전용이고, 등록 잡 시작 이후로 한정한다.

레코드 형식의 정본은 dotfiles이고(ADR UI-u6ud-2), 레코드 GET은 레코드 전체를 `bead-wait`에 돌려준다. 그래서 이 정정이 이 Bead 구현보다 먼저 착지한다.

### 3.9 카드 문법 스펙 정정

`2026-08-25-card-header-grammar-unify-design.md` §5.1에 `**정정(UI-q15q).**` 문단을 더한다.
- 외부 작업 슬롯 3의 잡 줄은 번호 대신 이름이다(없으면 번호).
- 하위 잡 요약 줄(개수 줄 + 이름 줄)이 붙는다. 답하는 질문은 여전히 "어디까지 왔나"다.
- 슬롯 5에 번호 칩을 되살리지 않는다(UI-l48z 유지).
- 배지는 등록 잡만 센다.
- 근거는 이 문서 §3.5가 소유한다.

### 3.10 ADR UI-nuwy 대체 순서

- 결정: ADR UI-nuwy를 대체하는 열린 스펙이 둘 더 있다. UI-18a5(대화 대상·출구 조항)와 UI-ny0h(재시도 사다리·재개 지연 조항)다(§2). 바꾸는 조항이 이 문서와 겹치지 않으므로 순서만 맞춘다.
  - Finish의 ADR 단계에서 `docs/adr/README.md` 현재 표를 다시 읽는다.
  - 둘 중 먼저 착지한 ADR이 있으면 그 ADR을 supersede 대상으로 삼고, 그 ADR이 바꾼 조항까지 승계한다.
  - 대상 id가 바뀌면 결정 (ADR 후보)의 후보 줄을 정정해 재게시한다(staleness 재검토 경로).

## 4. 오류와 대체

모두 fail-quiet다.

| 상황 | 동작 |
| --- | --- |
| 기준 부재 | 하위 잡 없음. 화면은 지금과 같다 |
| 완료 기록을 지원하지 않음(`JobCompType`이 `jobcomp/filetxt`가 아니거나 `JobCompLoc` 파일이 없음) | 큐 재료만으로 판정한다. `-t all`에서 종결 상태로 보인 잡은 그 상태로 저장되고, 종결을 못 본 채 큐에서 사라진 지난 비종결 잡은 `unknown`(`확인 중`)이 된다. 큐에서 사라진 종결 잡도 개수에 남도록, 개수는 서버가 저장 행(`omitted` 포함)과 이번 큐를 합쳐 센다 |
| 이번 관찰에서 큐 조회 실패, 또는 지원되는 완료 기록의 읽기·파싱 실패 | 그 관찰은 저장된 하위 잡(`counts`·`rows`)을 바꾸지 않는다. `unknown` 전이도 하지 않는다 |
| 위 어느 경우든 | 레코드의 `error_count`·`last_error`·백오프는 등록 잡 관찰 결과만으로 정한다 |
| 이름 재료 없음 | 번호로 보인다 |

## 5. 수용 기준

1. PROSTATE-u6u 같은 snakemake 머리 잡 외부 대기에서 하위 잡이 레코드에 붙는다. 개수가 같은 시점 사용자 큐 + 완료 기록의 소속 잡 수와 일치한다(wallace 실측 1회).
2. 카드 등록 잡 줄이 sjob 꼬리를 뗀 이름을 보이고, 번호는 `title`에 있다.
3. 개수 줄은 0 항목을 빼고, 이름 줄은 실패를 먼저 보인다. 등록 잡이 2건 이상이면 합친 개수 줄 하나다.
4. 상세 표는 실행·대기·실패·확인 중을 펼치고, 완료는 접었다 펼칠 수 있다. 열 구성은 §3.6과 같다.
5. 하위 잡 실패가 판정 배지·알림·`completion`·digest를 바꾸지 않는다.
6. 하위 잡 재료 실패가 `error_count`·`last_error`·다음 관찰 시각을 바꾸지 않는다.
7. comment 없는 sbatch 하위 잡은 `JobName` 규칙으로 붙는다.
8. 새 필드가 없는 옛 레코드가 지금과 같은 카드·상세로 그려진다.
9. 390px 뷰포트에서 하위 잡이 있는 카드와 상세 섹션이 페이지 가로 스크롤 없이 보인다(스크린샷).
10. 카드 문법 스펙 §5.1에 정정(UI-q15q) 문단이 있고, dotfiles 계약 정정이 원격 base에 있다.

## 6. 테스트

- `server/worker/external-wait/adapters/slurm.test.js`:
  - 기준 필드 파싱
  - 큐·완료 기록 줄 파싱
  - 소속 필터(사용자·폴더·제출 시각·등록 잡 제외)
  - 자르기 전 집계(표시 행보다 많은 잡의 정확한 개수), 완료 행 300 상한, 지난 비종결 번호의 행 반환
  - 완료 기록 지원 안 함·읽기 실패
- `server/worker/external-wait/observer.test.js`:
  - 하위 잡 병합(이름 유지)
  - `unknown` 전이는 완료 기록 지원 안 함에서만, 읽기 실패에서는 저장값 유지
  - 여러 등록 잡 사이 귀속
  - 종결 관찰의 마지막 판정
  - 재료 실패가 `error_count`·백오프를 바꾸지 않음
- `server/worker/external-wait/decision.test.js`: `spawned`가 있어도 digest가 같음
- `server/worker/external-wait/completion-prompt.test.js`(새 파일 또는 기존 위치): 요약 줄과 실패 줄, 10줄 상한
- `app/protocol` 검증·`attach` 투영 테스트: 새 필드 투영, 옛 레코드 통과
- `app/views/worker/wait-vocabulary.test.js`:
  - 이름 판정(꼬리 제거·`rule_`·wildcards·UUID 대체)
  - 개수 줄(0 생략)
  - 이름 줄(실패 우선·`외 k`)
  - 2건 이상 합산
- `app/views/worker/lanes.test.js`·`running-grid.test.js`·`app/views/monitor/index.test.js`: 슬롯 3 요약 줄, 배지 불변
- `app/views/detail-panel` 테스트: 행 순서, 완료 접힘·펼침, `omitted` 줄, 열 구성
- 수동:
  - Playwright 390px 캡처(수용 기준 9)
  - wallace 실레코드 대조(수용 기준 1)

## 7. 대안

- **채택**: 기존 관찰 ssh에 사용자 큐·완료 기록 읽기를 더하고, 결과를 등록 잡에 저장한다. 수명·백오프·투영 경로를 그대로 쓴다.
- **별도 감시 루프와 별도 파일**: 레코드 계약은 그대로 둘 수 있다. 하지만 ssh·수명·정리가 두 갈래가 되어 기각했다.
- **snakemake 진행 줄(`N of M steps`) 파싱**: 전체 대비 진행률을 줄 수 있다. 하지만 snakemake 전용이라 사용자가 기각했다.
- **실행 방식을 의존성 일괄 제출로 바꾸기**: 등록 시점에 모든 잡을 알 수 있다. 하지만 플러그인 2.8.0이 지원하지 않고, 실패하면 의존 잡이 대기로 남는다. 대화에서 기각했다.

## 8. 비목표

- 전체 단계 수, 퍼센트, 진행 막대(Slurm은 아직 던지지 않은 잡을 모른다)
- 하위 잡 조작(취소·재시도), 하위 잡 로그 표시
- process 어댑터, 서버 headline·알림 문장
- sjob 이름 규칙(dotfiles-n9f8z)과 템플릿 단계 잡 접두어(dotfiles-er58j). 이 설계는 둘 없이도 동작하고, 둘이 착지하면 이름이 더 좋아진다.

## 경계·후속

- 크로스 리포 unit: dotfiles — `docs/contracts/external-wait.md` Record·Slurm/sjob observation 절 정정(§3.8) quick_fix Bead dotfiles-5ov1y. UI-q15q 구현 진입 전 선행(`blocks`)이다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — beads-ui는 dotfiles 계약의 소비자이고, 레코드 형식 정본은 dotfiles다. 새 필드는 계약 정정과 함께 움직인다(§3.8).
- ADR UI-nuwy를 supersede해 다시 쓴다(새 id UI-q15q; §3.10의 순서 규칙에 따라 대상이 바뀔 수 있다).
  - 바뀌는 조항 1: "대기 레코드 투영 `projectExternalWait`·`EXTERNAL_WAIT_FIELDS` … 는 바꾸지 않는다"(UI-nuwy:251-253). `projectExternalWait`는 slurm 잡의 관찰 표시 필드(`name`·`anchor`·`spawned`)를 더 싣는다. `EXTERNAL_WAIT_FIELDS`(최상위 키), `/resume` fork·fresh와 `/stop`의 서버 동작, 관찰기 주기·hold 예산·admission의 `external_wait` 거절은 그대로다.
  - 바뀌는 조항 2: 상세 패널 `externalJobsTemplate` 표(UI-nuwy:239-241). 열은 이름·상태·경과/제한·자원·번호·exit·expected·로그이고, 등록 잡 아래에 하위 잡 행이 붙는다(완료는 접힘). 카드에 ssh·잡 번호·log 칩을 두지 않는 조항은 그대로다.
  - 더하는 조항: 외부 작업의 하위 잡은 등록 잡과 같은 사용자·같은 `WorkDir`에서 등록 잡 시작 이후 제출된 Slurm 잡이다. 사용자 큐와 Slurm 작업 완료 기록만으로 관찰하고 로그는 읽지 않는다. 하위 잡은 표시 재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다.
  - 나머지 조항은 모두 승계한다.
  - 되돌리기 어렵다: dotfiles `docs/contracts/external-wait.md` Record·관찰 절, `server/worker/external-wait/adapters/slurm.js` 원격 프로그램, `observer.js`·`store.js` 저장, `server/worker/attach.js` 투영, 카드 렌더러(`app/views/worker/wait-vocabulary.js`·`lanes.js`), 상세 패널(`app/views/detail-panel/index.js`), `completion-prompt.js`가 함께 움직인다.
  - 맥락 없이는 의외다: 왜 snakemake 진행률이나 로그가 아니라 `WorkDir`·제출 시각으로 찾는지, 왜 하위 잡 실패가 알림을 내지 않는지.
  - 실제 트레이드오프가 있다: 일반성과 로그 비의존을 얻고, 전체 단계 수와 같은 폴더 동시 실행의 구분을 잃는다.
  - 통합: ADR UI-nuwy와 소비자(`projectExternalWait`, 상세 패널 `externalJobsTemplate`, 외부 대기 카드 표면)를 공유한다. 그래서 새 주제가 아니라 UI-nuwy의 다시 쓰기다.
  - `summary`: "사람이 필요한 멈춤(파킹, recovery authority·no_progress, 옛 사유 읽기 호환)은 같은 Worker 세션을 fork 없이 tmux 대화형으로 열어 해결한다; 대화 턴 종료는 답 대기(action_required)이고 첫 줄 인계를 관측하면 창 소멸 확인 뒤 같은 attempt를 같은 세션·기록 실행 설정으로 재개하며(parked·awaiting_user 예외는 이 경로뿐, 사람 ↻·자동 재디스패치는 없음) 인수면 관찰만, 보류면 대기로 남는다; 알림은 확인 필요·답 대기·Worker가 이어감·사람 인수 넷이다; 외부 작업의 하위 잡은 등록 잡과 같은 사용자·WorkDir에서 등록 잡 시작 이후 제출된 Slurm 잡이고 사용자 큐와 Slurm 작업 완료 기록만으로 관찰하며, 표시 재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다" → ADR, supersede UI-nuwy
- 카드 요약 줄(개수 + 실패 우선 이름)과 상세 표 완료 접힘 — UI 레이아웃·표시 형식(기본 제외 목록) → ADR 아님
- 이름 규칙(sjob 꼬리 제거, comment rule 이름, UUID면 번호) — 되돌리기 쉬움: 순수 함수 하나 → ADR 아님
- 완료 행 상한 300 — 값 조정(기본 제외 목록) → ADR 아님
