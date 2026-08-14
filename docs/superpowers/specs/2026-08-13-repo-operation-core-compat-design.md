# Worker RepoOperation core compat 선반영 설계 (UI-1lmv)

- Bead: `UI-1lmv`
- Route: `spec_backed`
- 날짜: 2026-08-13
- master spec: `docs/superpowers/specs/2026-08-13-worker-repo-operation-auto-repair-design.md`
  @ `ee5905ff62fe91f1b8f134f9c020c999532aea81` — 이 문서는 그 §15-2(Phase A)를
  독립 Bead로 발췌한 실행 단위 스펙이다. 계약 의미의 canonical 소유권은 master
  spec과 `dotfiles-b2yx` spec(@`2c5243961c06e8f20be48dd6e387e7822e4391d6`)에
  남고, 이 문서는 발췌 범위와 이 단위 고유 결정만 소유한다.
- 순서: `UI-1lmv` → `dotfiles-b2yx` → `UI-vobi` (blocks 체인). 이 단위는
  dotfiles-b2yx **이전**에 land·deploy돼야 하는 runtime 전부다.

## 1. 배경과 경계

`dotfiles-b2yx`의 bootstrap rollout operation(b2yx spec §12-5)은 beads-ui에
이미 배포된 새 RepoOperation runtime을 소비한다. 따라서 resolver·store·
runner·bootstrap 입구는 b2yx보다 먼저 도착해야 하고, 그 배포는 아직 살아 있는
legacy provider lane으로 이뤄진다.

이 단위의 경계는 다음과 같다.

- **포함**: RepoOpsResolver v2, operation store 필드, 영구 deploy worktree 관리,
  one-shot Runner + Coordinator 최소 표면(`ensureDeploy`/`observe`/`reconcile`),
  approved bootstrap CLI, transition ephemeral launcher.
- **제외 (UI-vobi 잔류)**: merge flow 연결(`ensureVerify` 포함 no-CI merge
  eligibility), RepairSessionAdapter와 auto repair dispatch, policy projection과
  operation/설정 UI, legacy migration, legacy reader/provider 제거, foreign
  rollout.
- **불변**: `repo-ops/config.toml`이 없는 workspace는 기존 동작이 바뀌지 않는다.
  legacy `docs/agents/repo-ops.toml` reader(`server/worker/repo-ops.js`),
  `deployment-job.js`, `deployment-recovery.js`, merge-gate/pr-poller는 수정하지
  않는다. UI·protocol 변경이 없다. 별도 feature flag를 만들지 않는다 — config
  존재 자체가 활성 경계다.

## 2. 목표와 비목표

### 목표

1. master spec §4.1~§4.3, §5, §6의 RepoOperation core를 compat mode로 구현한다.
2. approved bootstrap rollout operation의 durable entrypoint를 제공한다.
3. config/script identity가 바뀌는 transition delivery의 previous-base script
   실행을 ephemeral launcher로 구현한다.
4. 실행 중 beads-ui self-restart에도 operation이 생존함을 실측으로 증명한다.

### 비목표

- verify candidate materialization과 merge flow 재작성 (UI-vobi)
- repair session dispatch·UI·migration (UI-vobi)
- legacy 코드 제거 (UI-vobi §15-8)
- 어떤 repo의 `repo-ops/config.toml` 선언 추가 (dotfiles는 b2yx, 나머지는
  UI-vobi 소유)

## 3. Module 설계

구현 파일명은 강제하지 않고 observable Interface와 상태 전이만 소유한다.
schema·실행 순서·거부 조건의 정본은 master spec §5·§6이다.

### 3.1 RepoOpsResolver v2

fetched exact target blob의 `repo-ops/config.toml`을 parse한다(`smol-toml`
재사용). missing → `{base:'main', verify:null, deploy:null}`, invalid/unknown
key → `repo_ops_config_invalid` fail-closed. script identity는 object type·
executable mode·blob SHA이며 `git ls-tree` 기반으로 취득한다. PR delivery에는
previous target-base SHA의 declaration/script를 effective policy로 pin하고,
결과를 `일반`/`transition`(identity 불일치)/`bootstrap`(이전 policy에 해당
operation 없음)으로 분류해 반환한다.

### 3.2 operation store

`server/worker/queue-store.js`의 기존 revision-CAS·temp+rename persist·
prerecord write-ahead 패턴 위에 master spec §5 스키마를 추가한다:
`auto_repair`(기본 true — 이 단위에서는 필드와 readback만, dispatch 없음)와
`repo_operations{}`(subjects·`target_sha`·`script_mode`/`script_blob_sha`·state
enum·`failure{code,fingerprint,detail,interrupted}`·
`repair{chain_id,owner_bead,auto_budget,auto_used,session_id,attempt_id}`·
`superseded_by`). 이 단위는 여기에 `bootstrap_provenance: null |
{approved_source_path, approved_source_sha, requested_by, requested_at}` 필드를
추가한다(§3.5). `chain_id`/`owner_bead`/`auto_used`의 successor 계승 mutation을
store API로 제공한다. process spawn 전에 durable `queued`/attempt prerecord를
완료한다. queue 파일의 writer는 실행 중인 Worker 프로세스 하나뿐이다 — 외부
프로세스는 §3.5의 spool을 통해서만 요청을 전달한다.

### 3.3 영구 deploy worktree 관리

`server/worker/worktree.js`를 확장해 고정 경로 `.worktrees/.repo-ops-deploy`를
관리한다. master spec §6.3의 소유권 증명(canonical path·`git worktree list`
등록·`--git-common-dir` 일치·Worker journal identity·detached HEAD)을 전부
통과한 worktree만 bounded fetch(`FETCH_ATTEMPT_TIMEOUT_MS` 재사용, 완전 회수된
pre-execution timeout 1회 retry)로 pin한 `origin/<base>` tip에 강제 정렬하거나
recreate한다. 소유권이 모호한 경로는 삭제하지 않고 failure로 전환하며, 이미
성공한 deploy SHA의 descendant가 아닌 remote tip은
`remote_history_not_monotonic` failure다. repo별 serial lock은 기존 topology
lock과 별도의 repo-operation lock으로 둔다.

### 3.4 one-shot Runner와 Coordinator 최소 표면

Runner는 master spec §4.3 그대로: shell 없이 `REPO_OPS_TARGET_SHA`/
`REPO_OPS_TARGET_BASE`/`REPO_OPS_REPO_ROOT` 3개 protocol env로 script를 실행하고,
stdio를 `state-paths.js` 파생 log file로 보내며, detached+unref로 self-restart를
생존하고, helper가 exit code/signal/timestamps를 terminal marker에 atomic
rename으로 기록한다. 살아 있는 process는 `process-controller.js` identity로
adoption하고, marker 없이 사라진 process는 duplicate spawn 없이 `interrupted`
실패다.

Coordinator는 이 단위에서 `ensureDeploy(subject)`/`observe(operation_id)`/
`reconcile(workspace)`만 노출한다. `ensureVerify`/`startRepair`는 UI-vobi가
추가한다. 재시작 reconciliation은 기존 `attach.js` 부팅 순서에 연결하며,
§3.5 bootstrap spool 소비도 같은 reconcile 경로가 담당한다.

### 3.5 approved bootstrap CLI

이전 policy에 deploy가 없던 repo의 첫 실행은 자동 감지하지 않는다. 서버
호스트에서 운영자/controller가 실행하는 작은 CLI가 유일한 입구다.

- 입력: repo 경로, target base, approved source(승인 spec/plan의
  workspace-상대 경로와 40-hex commit SHA), 요청자 식별.
- 전달 경로: CLI는 Worker의 queue 파일을 직접 쓰지 않는다. Worker-owned spool
  디렉터리에 요청 파일을 temp+rename으로 atomic하게 놓고, 실행 중인 Worker의
  reconcile이 그것을 소비해 자신의 단일-writer CAS로 durable prerecord를 만든
  뒤 요청 파일을 receipt와 함께 processed로 이동한다. CLI는 receipt와 operation
  상태를 bounded polling으로 출력한다. 서버가 내려가 있으면 spool 요청은 서버
  기동 후 reconcile이 소비한다.
- provenance 결속과 검증: `bootstrap_provenance`는 operation record에 durable로
  저장되고 그 record의 repo/target base에 결속된다. Worker는 소비 시
  `approved_source_sha` commit이 대상 repo에 존재하고 그 commit tree가
  `approved_source_path`를 포함함을 검증한다. 검증 실패는 prerecord를 만들지
  않고 `bootstrap_provenance_invalid` receipt로 거부한다.
- 규칙: 승인 근거가 없는 요청은 CLI가 기록을 만들지 않고 거부한다. Worker는
  provenance가 없는 bootstrap-분류 operation을 실행하지 않는다(failure
  `bootstrap_not_approved`). 같은 exact target의 승인 재요청은 새 record 대신
  기존 record를 adoption한다 — 대상이 provenance 없이 실패한 record라면
  검증된 provenance를 부착하고 같은 operation의 새 attempt로 전이한다. spool
  요청과 prerecord는 restart를 생존하며, CLI 프로세스 종료는 operation에 영향을
  주지 않는다.

### 3.6 transition ephemeral launcher

config 또는 script identity가 바뀌는 transition delivery에서 Worker는
previous-base에서 pin한 exact script bytes와 executable mode를 소유권이 검증된
Worker-owned 임시 경로에 materialize해 실행한다. launcher는 target
`.worktrees/.repo-ops-deploy`를 cwd/`REPO_OPS_REPO_ROOT`로 사용하고 repo
worktree를 수정하지 않으며 terminal 후 회수된다. 새 policy는 그 terminal
success 뒤 다음 operation부터 활성화된다. PR bytes가 current delivery의
정책·script를 바꾸지 못한다.

## 4. compat 경계와 실패 처리

- 활성 경계는 workspace의 fetched `repo-ops/config.toml` 존재다. 현재 4개 repo
  모두 config가 없으므로 land·deploy 직후 어떤 runtime 동작도 바뀌지 않는다.
- 이 단위의 operation failure는 durable failure evidence(state·failure record·
  log)로만 남는다. repair dispatch·UI 노출·manual 버튼은 UI-vobi가 붙인다.
  운영자는 log path와 store readback으로 진단한다.
- 이 단위의 배포 자체는 기존 legacy provider lane([머지] → repo-deployctl)으로
  수행한다.

## 5. Test scope

아래 Seam에 RED→GREEN 실행 권한을 둔다. master spec §17에서 이관·구체화한
것으로, verify candidate mismatch seam(§17.2 일부·§17.3)은 UI-vobi에 남는다.

1. **resolver v2** (master §17.1 전체): missing/absent no-op, invalid
   fail-closed, previous-base 우선, mode-only 변경의 transition 분류.
2. **deploy checkout** (master §17.2의 deploy 몫): fetched tip pin, fetch
   timeout 회수·1회 retry, `.repo-ops-deploy` 소유권 증명 4종 거부,
   non-descendant rewind 거부, deploy branch 미생성.
3. **operation store/coordinator** (master §17.4): prerecord-before-spawn, CAS,
   restart adoption, terminal settlement idempotency, chain_id/owner_bead/
   auto_used successor 계승, duplicate spawn 금지.
4. **one-shot runner** (master §17.5): shell=false·3 env·timeout/process
   group·log/exit-marker atomicity, 실제 beads-ui server restart 중 생존 E2E,
   missing marker → `interrupted`.
5. **bootstrap 승인 게이트** (신규): 승인 근거 없는 CLI 요청 거부, spool
   temp+rename atomicity와 서버 재시작 후 소비, invalid/mismatched approved
   source의 `bootstrap_provenance_invalid` 거부, provenance 없는 bootstrap-분류
   operation의 `bootstrap_not_approved`, provenance-less 실패 record에 대한
   승인 재요청의 provenance 부착·새 attempt 전이, exact 재요청 adoption,
   CLI·Worker 동시 동작에서 queue 단일-writer 보존, spool/prerecord restart
   생존.
6. **transition launcher** (신규): previous-base bytes/mode materialization과
   회수, PR bytes의 current delivery 변경 불가, terminal success 후에만 새
   policy 활성화.

제외: merge flow·verify candidate·auto repair dispatch·migration·legacy 제거
seam은 UI-vobi Test scope 소유. 기존 legacy suite는 수정하지 않는다.

## 6. 수용 기준

1. `npm run all`과 신규 focused suites가 green이고 기존 suite 수정이 없다.
2. legacy lane으로 merge·배포한 뒤 4개 workspace의 runtime 동작이 불변이다
   (`/healthz` source SHA/path exact readback 포함).
3. config를 선언한 repo가 나타나면(b2yx 이후 dotfiles) bootstrap CLI → spool
   → 검증된 provenance prerecord → 새 runner 실행 → terminal exit/log
   evidence까지 사람 개입이 CLI 실행 한 번뿐인 상태다.
4. 실행 중 beads-ui self-restart에도 operation process가 생존해 exit code/log
   marker를 남기고, 재시작된 Worker가 같은 operation을 adoption한다.
5. 사용자 checkout·legacy provider state·기존 UI/protocol 표면이 변경되지
   않는다.
