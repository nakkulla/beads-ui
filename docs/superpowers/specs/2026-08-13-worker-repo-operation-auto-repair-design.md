# Worker 단일 RepoOperation과 자동 repair 재설계 (UI-vobi)

- Bead: `UI-vobi`
- Route: `full_plan`
- 날짜: 2026-08-13
- canonical prerequisite: `dotfiles-b2yx`
- enclosed foreign units: `dotfiles/main`, `train_bot/main`, `TRACE-ICI/ilsun/dev`
- 대체 대상: 이 문서의 이전 버전인
  `2026-08-12-post-merge-static-verification-design.md`와 `UI-x7fi`,
  `UI-q1hs`, `UI-oj2f`, reverted `UI-qero`의 분리된 merge/cleanup recovery 설계

## 1. 현재 정책을 사람이 보는 방식

Worker의 새 정책은 아래 여섯 문장으로 설명할 수 있어야 한다.

1. GitHub CI/check는 사용하지 않는다.
2. `repo-ops/config.toml`에 없는 verify/deploy는 실행하지 않는다.
3. verify가 있으면 실제 merge candidate tree를 한 번만 검증한다.
4. deploy가 있으면 fetched `origin/<base>` tip을 Worker 전용
   `.worktrees/.repo-ops-deploy` detached worktree에 정렬하고, repo script가 apply와
   live readback을 끝낼 때까지 기다린다.
5. Worker가 안전하게 확정할 수 있는 fetch/checkout/restart-adoption 문제는
   자동으로 복구한다.
6. script가 실패하면 workspace의 `auto_repair` 설정에 따라 같은 Bead의 repair
   session을 최대 한 번 자동 시작하고, 그래도 실패하면 사람이 버튼으로 이어간다.

첫 rollout의 네 저장소는 모두 verify를 선언하지 않고 deploy만 선언한다.

| 저장소 | base | verify | deploy | 이유 |
| --- | --- | --- | --- | --- |
| beads-ui | `main` | 없음 | 있음 | `npm run all`은 Test scope와 중복; shared server exact restart/readback 필요 |
| dotfiles | `main` | 없음 | 있음 | static checks는 Test scope/deploy preflight로 이동; install/runtime readback 필요 |
| train_bot | `main` | 없음 | 있음 | full unittest에 HOME lock·환경 의존; remote bot exact restart/status 필요 |
| TRACE-ICI | `ilsun/dev` | 없음 | 있음 | 변경별 CPU/GPU/data 검증 범위가 다름; Fisher exact sync/readback 필요 |

verify가 없다는 것은 테스트를 하지 않는다는 뜻이 아니다. 각 이슈의 approved
spec/plan `Test scope`, implementation review, focused verification은 그대로
필수다. repo-wide generic gate만 두지 않는다는 뜻이다.

## 2. 배경과 root cause

현재 Worker completion flow에는 서로 겹치는 권위가 있다.

- `merge-gate.js`와 `pr-poller.js`가 GitHub checks, local exact-head verify, no-signal
  tier를 함께 관리한다.
- `pr-actions.js`는 `base_sync → post_merge_verify → deployment_request → closure`
  cursor를 가진다.
- `deployment-job.js`는 `repo-deployctl` JSON을 다시 parse하고 repo/base/SHA/
  generation binding을 검증한다.
- `deployment-recovery.js`와 `queue-store.js`는 provider status 위에 retry budget,
  recovery Bead/session, confirmation fence를 다시 저장한다.
- `completion-intent.js`, scheduler attempt, cleanup failure cursor가 같은 completion
  진행을 서로 다른 record로 표현한다.

과거 실패는 이 복잡성이 단순 안전장치 이상으로 커졌음을 보여 준다.

- read-only git command를 destructive merge로 잘못 잡은 guard false positive
- detached verify worktree collision, 출력 유실, runtime marker 오염
- base에서도 같은 date/socket/network failure를 durable verify failure로 처리
- shared checkout dirty/behind 상태가 deploy를 막음
- provider request가 authoritative remote SHA를 stale local clone으로 다시 검증해
  `candidate_unavailable`
- request 실패 후 provider status는 이전 성공을 계속 보여 주는 이중 상태 해석
- cleanup/recovery 경로마다 수동 retry와 repair Bead가 추가됨

새 설계는 하나의 깊은 `RepoOperation` Module로 verify candidate와 deploy permanent
detached worktree 실행을 감추고, repo-specific 동작은 표준 script Interface 뒤에 둔다.
Module을 삭제해 안전성을 분산하지 않고, provider와 Worker가 나누어 가진 중복
상태를 하나로 합친다.

## 3. 목표와 비목표

### 목표

1. `[ci]`, GitHub checks 관측, CI gate/cache/polling을 완전히 제거한다.
2. `repo-ops/config.toml`의 optional verify/deploy만 실행한다.
3. pre/post verify를 하나의 candidate-tree evidence로 통합한다.
4. `repo-deployctl` daemon/provider와 Worker deployment adapter/recovery를 제거한다.
5. authoritative `origin/<base>` pin, Worker-owned permanent detached worktree, dirty
   user-checkout isolation, self-restart survival, repo serial ordering,
   timeout/log/readback은 보존한다.
6. operation 상태를 Worker의 durable journal 하나로 표현한다.
7. 실패를 안전한 executor recovery와 repair session으로 분리한다.
8. workspace별 `auto_repair` toggle과 현재 자동 정책 설명을 UI에서 제공한다.
9. legacy cleanup/provider record를 한 번만 migration하고 dual state reader를 끝낸다.
10. beads-ui, dotfiles, train_bot, TRACE-ICI를 같은 layout으로 rollout한다.
11. 관련 열린 Beads를 이 구현과 canonical contract 두 개로 통합한다.

### 비목표

- GitHub Actions를 다른 이름으로 다시 만드는 것
- verify를 모든 저장소나 모든 issue에 강제하는 것
- generic Worker가 npm, uv, SSH, projectmgr, SLURM을 이해하는 것
- script failure를 같은 command의 automatic flaky retry로 숨기는 것
- failure를 agent 자기보고만으로 성공 처리하는 것
- repair session이 config를 지워 gate/deploy를 우회하는 것
- credential/destructive/history rewrite를 자동 승인하는 것
- closed historical specs/plans/receipts를 삭제하는 것

## 4. 아키텍처

### 4.1 `RepoOpsResolver` Module

fetched exact target blob의 `repo-ops/config.toml`을 parse한다. missing config는 base
`main`, operations 없음이다. invalid config는 fail-closed다. legacy
`docs/agents/repo-ops.toml`, home worker config, `deploy.json` fallback은 최종 상태에서
읽지 않는다.

resolver output은 다음 normalized value다.

```js
{
  base: 'main',
  verify: null | { script, timeout_ms, blob_sha },
  deploy: null | { script, timeout_ms, blob_sha },
  config_blob_sha: null | '<40-hex>'
}
```

PR delivery에는 이전 target-base SHA의 declaration/script를 effective policy로
pin하여 PR이 자기 operation을 끄거나 바꾸지 못하게 한다. 새 declaration은 해당
delivery가 끝난 뒤 다음 candidate부터 활성화한다.

일반 delivery에서는 previous-base와 target tree의 effective script blob이 같음을
확인한 뒤 target worktree의 `repo-ops/script/deploy`를 실행한다. config 또는 script
자체가 바뀌는 transition delivery는 previous-base에서 pin한 exact script bytes와
executable mode를 Worker-owned ephemeral launcher에 materialize한다. launcher는
target `.worktrees/.repo-ops-deploy`를 cwd/`REPO_OPS_REPO_ROOT`로 사용하고 repo
worktree를 수정하지 않으며, terminal success 뒤 회수된다. 새 policy는 그 성공 뒤
다음 operation부터 활성화한다. repo script는 `$0` 위치가 아니라
`REPO_OPS_REPO_ROOT`를 기준으로 helper를 찾는다. 이전 deploy가 없던 bootstrap은
approved rollout operation만 새 script를 처음 실행할 수 있다.

### 4.2 `RepoOperationCoordinator` Module

merge request, external merged observation, startup reconciliation, repair completion이
모두 이 Module의 같은 Interface를 호출한다.

```text
ensureVerify(candidate)
ensureDeploy(subject)
observe(operation_id)
startRepair(operation_id, mode)
reconcile(workspace)
```

caller는 process, checkout path, provider generation, retry journal을 알지 못한다.
coordinator는 하나의 operation record와 terminal exit/log evidence만 돌려준다.

### 4.3 `RepoOperationRunner` Implementation

authoritative remote에서 operation checkout을 준비하고 표준 script를 shell 없이
실행하는 one-shot executor다. daemon이나 desired-state provider가 아니다. verify는
temporary synthetic merge candidate를, deploy는 Worker-owned permanent detached
worktree를 사용한다.

- operation 하나를 받아 checkout, process group, timeout, stdout/stderr log와
  terminal exit marker를 소유한다.
- stdio는 operation log file로 보내고 server socket/stdio를 상속하지 않는다.
- detached process를 unref하여 beads-ui self-restart 뒤에도 계속 실행한다.
- helper가 script exit code/signal/timestamps를 작은 terminal marker에 atomic
  rename으로 쓴다. 이 marker는 Worker 내부 crash recovery이고 repo script JSON
  protocol이 아니다.
- process가 살아 있으면 restart 후 같은 operation으로 adoption한다.
- terminal marker 없이 process가 사라지면 duplicate spawn하지 않고 `interrupted`로
  실패시킨다.

self-restart 중 실제 생존을 증명하지 못하면 implementation을 완료로 보지 않는다.
필요한 것은 one-shot process boundary이지 별도 polling daemon/service가 아니다.

### 4.4 `RepairSessionAdapter`

기존 scheduler의 단일 `launchSession`/resume/log/monitor Interface를 재사용한다.
verify/deploy마다 새로운 agent runner를 만들지 않는다. operation failure evidence를
정규화해 같은 Bead의 repair attempt를 dispatch하고, session 결과가 아니라 fresh
Git/operation readback으로 다음 상태를 판정한다.

### 4.5 UI projection

`dotfiles-b2yx`가 `workflow.yaml`에서 render한 exact
`repo-operation-policy.json`과 source commit을 generated runtime copy로 반영한다.
backend가 그 copy와 operation state를 전달한다. UI는 그 value를 표시하고
toggle/button mutation만 보낸다. policy 문장을 frontend에 별도 hard-code하지
않는다. generated copy의 digest/source commit이 approved dotfiles artifact와
다르면 build/contract test가 실패한다.

이 분리는 Adapter가 repo script와 scheduler를 연결하고, 깊은 Module이 crash와
process/exit 복잡성을 숨기며, UI가 projection만 소비하도록 한다. 기존 provider 삭제
후에도 같은 책임이 여러 caller로 되돌아가지 않는 것이 architecture acceptance다.

## 5. durable data model

workspace queue에 `auto_repair`와 `repo_operations`를 추가한다.

```js
{
  auto_repair: true,
  repo_operations: {
    '<operation-id>': {
      schema: 1,
      repo_id: '<canonical-realpath-derived-id>',
      kind: 'verify' | 'deploy',
      subjects: [{ bead_id: 'UI-...', merged_sha: '<40-hex>' }],
      effective_base_sha: '<40-hex>',
      target_base: 'main',
      target_sha: null | '<fetch 뒤 pin한 origin/<base> tip 40-hex>',
      target_tree: null | '<40-hex>',
      deploy_worktree: null | '<repo>/.worktrees/.repo-ops-deploy',
      script_blob_sha: '<40-hex>',
      state: 'queued' | 'running' | 'succeeded' | 'failed' | 'repairing',
      attempt_id: '<opaque-id>',
      requested_at: 0,
      started_at: null,
      finished_at: null,
      process_identity: null,
      log_path: null,
      log_digest: null,
      exit_code: null,
      signal: null,
      failure: null | {
        code: '<stable-code>',
        fingerprint: '<sha256>',
        detail: '<sanitized>',
        interrupted: false
      },
      repair: {
        auto_budget: 1,
        auto_used: 0,
        session_id: null,
        attempt_id: null
      },
      superseded_by: null
    }
  }
}
```

verify operation identity는 repo/kind/effective policy/candidate input에서
결정적으로 만든다. deploy는 repo/base/effective policy별 queued operation에 아직
coverage되지 않은 subject SHA를 coalesce하고, repo lock을 얻어 fetch한 순간
`target_sha`를 한 번만 bind한다. bind 뒤 remote에 새 commit이 생기면 다음 queued
operation이 처리한다. 같은 exact input은 같은 record를 adoption하고, remediation 뒤
새 실행은 같은 operation의 새 attempt다. provider generation, repo-level
desired/status copy, repo script result JSON은 없다.

모든 mutation은 기존 queue CAS/atomic write를 사용한다. operation success와 Bead
coverage/cleanup cursor 반영은 한 mutation 또는 재시작해도 같은 결과가 되는
순서로 저장한다. process spawn 전에 durable `queued`/attempt prerecord를 완료한다.

## 6. authoritative operation checkout

runner는 사용자의 canonical checkout HEAD나 local `main` branch를 deploy source로
쓰지 않는다. 배포 source of truth는 bounded fetch로 갱신한
`refs/remotes/origin/<base>` 하나다.

### 6.1 공통 remote proof

1. workspace의 canonical `origin` URL과 target base를 normalize한다.
2. `origin/<base>` remote-tracking ref를 bounded fetch한다.
3. fetched tip을 operation의 immutable target SHA로 pin하고, coverage할 merged SHA가
   모두 그 target에 포함됨을 증명한다.
4. effective script blob/path/executable mode를 exact policy SHA에서 검증한다.
5. user checkout의 HEAD/index/worktree/untracked files를 전후 비교해 불변임을
   확인한다.

fetch는 bounded timeout, process-group termination, stdout/stderr tail을 가진다.
완전히 회수된 pre-execution timeout만 1회 자동 재시도한다. retry 후에도 실패하면
operation failure로 session에 넘긴다. 이 Seam이 `UI-9f54`와
`dotfiles-ji9f`를 흡수한다.

### 6.2 verify checkout

verify가 opt-in된 경우 exact base/head로 synthetic merge candidate를 temporary clean
checkout에 materialize한다. verify가 없는 현재 네 repo에는 이 candidate를 만들지
않는다.

### 6.3 deploy permanent detached worktree

deploy는 canonical repo의 고정 경로 `.worktrees/.repo-ops-deploy`에 등록한 worktree
하나를 쓴다. 이 worktree는 Git common object/ref store만 canonical repo와 공유하고
별도 HEAD·index·working tree를 가지며 항상 detached HEAD다. `deploy` branch는
만들지 않는다. path가 영구적이므로 dotfiles installed symlink나 beads-ui runtime
source가 이 root를 가리켜도 다음 operation에서 경로가 사라지지 않는다.

최초 준비는 repo lock 안에서 다음 의미로 수행한다.

```text
bounded fetch origin <base> → refs/remotes/origin/<base>
target_sha = rev-parse refs/remotes/origin/<base>^{commit}
git worktree add --detach .worktrees/.repo-ops-deploy <target_sha>
```

매 deploy는 다음 순서다.

1. repo별 serial lock을 얻는다.
2. `origin/<base>`를 bounded fetch하고 tip을 operation의 immutable target SHA로
   bind한다. operation subjects의 merged SHA가 모두 target의 ancestor인지 확인한다.
3. canonical path equality, `git worktree list` registration, canonical repo와 같은
   `--git-common-dir`, Worker journal의 repo/path identity, detached HEAD를 함께
   확인한다.
4. 위 소유권이 전부 증명된 worktree만 target SHA로 강제 정렬하고 non-ignored
   residue를 회수하거나 안전하게 recreate한다. 소유권이 모호한 경로나 사람의
   파일은 삭제·reset하지 않는다.
5. unmerged/staged/tracked dirtiness와 non-ignored untracked residue가 없고
   `HEAD == target_sha`인지 확인한다.
6. cwd와 `REPO_OPS_REPO_ROOT`를 이 checkout으로 설정해 effective policy에 pin된
   deploy executable을 shell 없이 실행한다.
7. 종료 후에도 HEAD equality와 cleanliness를 확인하고 terminal evidence를
   기록한 뒤 lock을 해제한다.

이 worktree에서는 사람이 작업하지 않고 branch·commit·push를 만들지 않는다.
Worker만 fetched exact SHA로 정렬한다. ignored dependency cache는 보존할 수 있다.
user checkout의 HEAD/index/tracked/untracked files는 reset/stash/clean하지 않는다.
이미 성공한 deploy SHA의 descendant가 아닌 remote tip은 자동 rollback하지 않고
`remote_history_not_monotonic` failure로 전환한다.

### 6.4 deploy script contract

Worker가 repo-defined protocol로 전달하는 환경은 다음 세 개뿐이다.

```text
REPO_OPS_TARGET_SHA=<fetch 뒤 pin한 origin/<base> tip 40-hex SHA>
REPO_OPS_TARGET_BASE=<main, ilsun/dev 등>
REPO_OPS_REPO_ROOT=<canonical repo>/.worktrees/.repo-ops-deploy
```

cwd는 `REPO_OPS_REPO_ROOT`다. script는 시작과 끝의 local HEAD equality, install/
restart/remote sync, 실제 적용 readback을 직접 수행하고 모두 성공한 뒤 exit 0을
반환한다. nonzero/signal/timeout은 failure다. 같은 SHA replay는 idempotent하고,
stdin 질문이나 background-only success는 금지한다. 별도 JSON, generation, health
schema를 Worker에 노출하지 않는다.

## 7. merge와 verify 흐름

GitHub checks를 제거한 merge eligibility는 다음뿐이다.

- PR이 open이고 target base/head identity가 fresh하다.
- mergeability가 clean이며 conflict/dirty 상태가 아니다.
- workflow spec/implementation review receipt가 current하다.
- `[verify]`가 있으면 current merge candidate receipt가 green이다.

### 7.1 일반 PR

```text
fresh PR/base/head
  → 실제 merge 방식의 candidate tree materialize
  → verify absent: 즉시 merge eligibility
  → verify present: effective base script로 candidate tree 한 번 실행
  → merge 직전 base/head 재확인
  → merge
  → remote merged tree 비교
      동일: receipt 승계
      다름: final merged tree에서 한 번 실행
```

receipt key는
`(effective_base_sha, candidate_tree_sha, verify_script_blob_sha)`다. 단순 head commit
SHA cache가 아니다. base가 움직이거나 squash result tree가 달라지면 stale다.

### 7.2 외부에서 이미 merge된 PR

pre-merge receipt가 없고 verify가 선언된 경우에만 exact merged tree에서 한 번
실행한다. verify absent면 post-merge verify stage도 failure state도 만들지 않는다.

### 7.3 verify failure

pre-merge failure는 merge를 중지하고 operation/log/fingerprint를 보존한다. 원래
manual merge click 또는 auto-merge intent를 durable continuation으로 보존한다.
repair가 fresh head/review/verify를 통과하면 그 intent에 한 번만 재진입한다.

post-merge failure는 merge를 rollback/rewrite하지 않는다. Bead는
`resolved/pr_wait`에 남고 deploy/closure를 시작하지 않는다. repair가 corrective PR을
만들 수 있으며, metadata `pr_url`은 active repair PR을 가리키고 기존 PR URL은
operation/notes history에 보존한다.

## 8. deploy와 closure 흐름

post-merge owner는 하나뿐이다.

```text
remote merged containment
  → effective operation resolution
  → verify success adoption 또는 필요한 final-tree verify
  → deploy absent: skip
  → deploy present: repo lock + fetch origin/<base> + detached worktree exact alignment
                    + one-shot script + exit/log
  → child sweep
  → worktree/branch cleanup
  → parent close/readback
```

기존 `post_merge_verify`, `deployment_request`, `deploy` cursor를 새 active enum으로
유지하지 않는다. cleanup cursor는 `base_containment`, `repo_operations`,
`child_sweep`, `branch_cleanup`, `parent_close`만 표현한다.

deploy는 repo별 serial이다. operation이 lock을 얻기 전에는 같은 policy의 pending
subject를 coalesce한다. lock을 얻은 뒤 `origin/<base>`를 fetch해 target A를 bind하고
실행하는 동안 새 merged SHA B가 생기면 B는 다음 operation에 queued된다. 다음
operation은 다시 fetch하므로 더 최신 target을 적용한다. 새 target이 이전 subject를
포함하고 exit 0이면 그 predecessor를 coverage할 수 있다. 앞 operation failure가
뒤의 descendant operation을 막지 않으며, 뒤 commit이 원인을 고쳤다면 자동으로
수렴한다. 오래된 target이 최신 runtime 뒤에 실행되거나 non-ancestor remote tip으로
자동 rollback되는 순서는 없다.

Worker가 보는 성공 조건은 timeout 없는 script exit 0과 final permanent worktree
`HEAD == target_sha`·tracked-clean readback이다. 실제 install/restart/remote
HEAD/health 확인은 script가 exit 전에 직접 수행한다. Worker는 health JSON이나
repo-specific output을 parse하지 않고 target SHA, exit code, stdout/stderr log만
terminal evidence로 기록한다. success 전에는 Bead를 close하지 않는다. deploy
absent면 가짜 provider pending/succeeded record 없이 바로 다음 cleanup 단계로 간다.

## 9. 실패 분류와 자동 대응

### 9.1 Worker가 session 없이 자동 복구

- owned `.worktrees/.repo-ops-deploy` fetch/detached alignment/recreate
- 완전히 회수된 fetch timeout 1회 retry
- repo serial lock queueing
- restart 후 live detached process adoption
- same exact input의 terminal exit-0 evidence adoption
- newer successful descendant SHA의 predecessor coverage
- owned verify temp candidate cleanup

소유권 proof가 전부 맞는 worktree만 자동 정렬·recreate한다. path 충돌, common-dir
mismatch, journal identity mismatch처럼 사람의 파일일 가능성이 있는 상태는 자동
삭제하지 않고 operation failure evidence와 repair session으로 넘긴다.

이 목록은 runtime code의 hidden behavior가 아니다. dotfiles
`workflow.yaml` canonical enum을 generated policy JSON으로 render하고 beads-ui
backend가 exact pinned copy를 읽는다. cross-repo contract test가 digest/source
commit drift를 막는다.

### 9.2 script/interrupted failure

script가 시작된 뒤 Worker는 whole command를 자동 재시도하지 않는다. side effect가
어디까지 적용됐는지 generic runner가 알 수 없기 때문이다. repo script가 아는
idempotent preflight, dependency 준비, ff-only sync, restart, health poll은 script
내에서 bounded하게 처리한다.

terminal failure는 다음 UI/action을 만든다.

| 상태 | UI | continuation |
| --- | --- | --- |
| pre-merge verify failure | `검증 실패 해결 후 머지` | fresh repair 뒤 original merge intent 1회 |
| post-merge verify failure | `검증 실패 해결` | corrective PR 또는 same-input remediation |
| deploy failure | `배포 실패 해결` | same SHA replay 또는 corrective PR 뒤 closure |
| interrupted/no exit marker | kind에 맞는 해결 버튼 | duplicate spawn 없이 diagnosis |

### 9.3 `auto_repair`

- workspace durable boolean, 새 schema 기본값 true
- 기존 `자동화(auto_advance + auto_merge)`와 독립
- 기존 전체 자동화/워크스페이스 자동화 toggle이 값을 바꾸지 않음
- OFF는 새 repair dispatch만 막고 running repair를 stop하지 않음
- ON 전환은 eligible failed operation을 즉시 reconcile
- legacy cleanup failures에는 소급하지 않음
- completion chain당 automatic repair session 1회
- 같은 fingerprint가 tree/script/environment evidence 변화 없이 재현되면 budget을
  더 쓰지 않고 manual button 상태 유지
- scheduler workspace slot과 exec preset을 그대로 사용

repair session은 같은 Bead에 붙고 기본적으로 새 Bead를 만들지 않는다. failure exact
input, sanitized output/log, spec/plan Test scope, current review/PR facts를 받는다.

session이 할 수 있는 일:

- 코드 또는 repo operation script를 고치고 focused tests를 실행
- 필요한 review를 갱신하고 commit/push/corrective PR을 만든다
- 환경/service를 안전하게 고친 뒤 같은 target operation의 새 attempt를 요청

session이 할 수 없는 일:

- verify/deploy section이나 script를 삭제해 현재 failure를 성공으로 바꾸기
- credential을 출력·저장·추측하기
- destructive action/history rewrite를 질문 없이 실행하기
- 자기보고로 operation/Bead를 success/closed 처리하기
- 실패한 자신을 자동으로 다시 dispatch하기

## 10. workspace 설정과 정책 가시성

Worker/Monitor workspace 설정에 독립 `자동 해결` toggle을 추가한다. 기본 ON이며
현재 `auto_repair` 값, 남은 automatic budget, active repair session을 표시한다.

설정 화면에는 backend가 보낸 다음 세 목록을 쉬운 문장으로 함께 표시한다.

```text
Worker가 자동 처리
  전용 detached worktree 복구 · fetch 1회 복구 · lock 대기 · restart adoption
  exact exit-0 evidence adoption · 최신 SHA coverage

자동 repair session
  verify 실패 · deploy 실패 · interrupted operation
  completion chain당 최대 1회

자동으로 하지 않음
  whole-command retry · baseline 무시 · config 삭제 우회
  credential/destructive action · 무한 session 반복
```

각 operation card는 kind, target SHA/tree, script path/blob, elapsed time, state,
sanitized output tail, 전체 log link, exit code, target SHA, repair session link를
표시한다.
generic `재시도` 버튼은 두지 않는다. manual 해결 버튼도 repair evidence를 만든 뒤
coordinator가 새 attempt를 생성한다.

protocol/API 문서에는 `auto_repair` mutation, policy projection, operation states를
기록한다. project AGENTS는 사용자가 실제 동작을 찾을 수 있도록 canonical
`repo-ops/config.toml`, 설정 UI, dotfiles workflow contract를 가리킨다.

## 11. legacy state migration

새 runtime 첫 부팅에서 versioned `repo_operation_migration_v1`을 한 번 실행한다.
legacy record를 계속 dual-read하지 않는다.

1. PR/remote facts에서 canonical subject SHA를 `merge_sha` 우선, 없으면 current
   `head_sha`로 계산하고 remote containment을 확인한다. reverted `UI-qero`의 stale
   subject bug를 여기서 흡수한다.
2. legacy `base_sync` failure는 new bounded remote materialization으로 다시
   분류한다.
3. legacy `post_merge_verify` failure는 effective new config에 verify가 있으면 new
   verify operation으로 변환하고, 없으면 failure를 retire하고 다음 단계로 간다.
4. legacy `deployment_request`/`deploy` failure는 old provider status를 migration
   중 딱 한 번 읽는다. exact repo/base/target/deployed SHA terminal success면
   migrated terminal evidence로 adoption하고, 아니면 fetched `origin/<base>` tip을
   쓰는 새 deploy operation을 만든다.
5. `child_sweep`/`branch_cleanup`/`parent_close` failure는 operations success 뒤
   기존 idempotent closure를 재개한다.
6. ambiguity, missing subject, mismatched old status는 fake success로 만들지 않고
   `legacy_manual` evidence와 해결 버튼을 남긴다.
7. migration result와 schema version을 atomic하게 저장한다. 재시작하면 같은 input을
   adoption하고 duplicate provider request/session을 만들지 않는다.

legacy failure에는 automatic repair budget을 소급 소비하지 않는다. 사용자가 버튼을
누르거나 새 operation failure가 발생한 뒤부터 새 policy를 적용한다.

이 migration이 `UI-q1hs`의 cleanup 재개, `UI-oj2f`의 exact old-provider adoption,
`UI-qero`의 SHA reentry를 하나의 path로 통합한다.

## 12. CI와 merge consumer 제거

다음 active runtime surface를 제거하거나 새 no-CI flow로 단순화한다.

- `gh.prChecks`/`gh.commitChecks` check rollup consumers
- `pr-poller`의 checks 관측·empty/pending/error cache와 checks 수요 poll
- `merge-gate`의 CI tier, local fallback tier, no-signal tier
- auto-merge/completion-repair의 CI ownership probe
- CI state/reason/badge/protocol/UI/tests
- beads-ui `.github/workflows/ci.yml`
- AGENTS의 “빈 checks는 vacuous pass” 특례

GitHub API는 PR identity, base/head, mergeability/conflict, merge/containment 관측에만
사용한다. branch protection에 required check가 남아 있으면 제거하고 API/UI
readback으로 0개임을 확인한다. 권한이 없으면 credential/external hard stop으로
보고하며 silent partial completion하지 않는다.

## 13. provider와 중복 completion state retirement

새 operation runner와 migration이 live/readback된 뒤 다음을 제거한다.

- beads-ui `deployment-job.js`
- beads-ui `deployment-recovery.js`
- queue-store의 provider generation/binding/retry/recovery journals
- pr-actions의 request/status/adoption/provider observer
- completion-intent의 deployment provider facts와 별도 repair ownership probe
- repo-deployctl invocation/config path
- dotfiles `repo-deployctl` CLI/serve daemon
- repo-deployer launchd/projectmgr service와 installer/runtime verifier
- desired/status/state/execution lock files의 active writer/reader
- provider 전용 tests와 active instruction/contract prose

공통 scheduler launcher, session monitor, queue CAS, cleanup coordinator 자체는
삭제하지 않는다. 이들은 여러 session/closure caller에 Leverage를 제공하며 새
RepoOperation/RepairSessionAdapter가 재사용한다.

historical specs/plans에는 삭제 대신 “이 설계로 superseded” 링크를 추가한다. runtime
검색은 historical docs/fixture를 allowlist하고 active provider vocabulary reader/writer
0개를 요구한다.

## 14. 저장소별 rollout

모든 foreign change는 새 Bead/PR을 만들지 않고 `enclosed:UI-vobi`로 resolved target
base에 direct landing한다. 각 repo는 별도 detached enclosed worktree, exact changed
paths, focused verification, direct commit/push, actual remote containment과 deploy
readback을 가진다. user checkout은 변경하지 않는다.

### 14.1 beads-ui

```toml
base = "main"

[deploy]
script = "repo-ops/script/deploy"
timeout_ms = 600000
```

- `[verify]`와 CI workflow를 제거한다.
- `scripts/deploy-self.js`의 install/build/restart/readback을
  `repo-ops/script/deploy` Interface로 이동한다.
- `.worktrees/.repo-ops-deploy`가 stable runtime source다. candidate release와
  `current` release symlink를 만들지 않는다.
- wrapper는 local HEAD 확인, `npm ci`, `npm run build`, `bdui-shared restart`, bounded
  `/healthz` 조회를 순서대로 수행하고 health의 source SHA와 realpath가 각각 target
  SHA와 `REPO_OPS_REPO_ROOT`인지 확인한 뒤 exit 0을 반환한다.
- self-deploy script가 new one-shot executor를 실행 중인 server를 restart하고도
  executor가 exit code/log marker를 남기는 실제 E2E를 통과한다.
- project AGENTS의 Post-Merge Runtime Validation을 새 path/operation/auto repair로
  갱신한다.

### 14.2 dotfiles

`dotfiles-b2yx`가 config와 `repo-ops/script/deploy`, CI removal, canonical contract를
land한다. 새 Worker가 durable dotfiles deploy exit/log와 installed runtime
readback을 성공시킨 뒤
UI-vobi enclosed retirement unit이 provider binary/service/install references를
제거한다.

dotfiles의 installed symlink/service path는 영구
`.worktrees/.repo-ops-deploy` root를 가리킬 수 있다. dotfiles wrapper는 installer를
glob으로 찾지 않는다. approved plan이 current
canonical install completion bundle의 literal 순서를 pin하고 wrapper가 그 순서대로
shell/Claude/Codex installer와 installed-copy/service verifier를 호출한다. 새 helper
파일이 디렉터리에 추가됐다는 이유만으로 자동 실행되지 않는다. local HEAD와
installed runtime 검증이 끝난 뒤 exit 0을 반환한다.

### 14.3 train_bot

```toml
base = "main"

[deploy]
script = "repo-ops/script/deploy"
timeout_ms = 600000
```

- 기존 full unittest declaration은 제거한다.
- 기존 `scripts/deploy.sh`를 표준 entrypoint로 이동한다.
- 시작 시 local `.worktrees/.repo-ops-deploy` HEAD가 fetched `origin/main` target
  SHA인지 확인한다.
- `REPO_OPS_TARGET_SHA`를 remote host에 전달하고 `git fetch` 후 exact commit으로
  ff-only sync한다. 단순 remote tip `git pull`은 쓰지 않는다.
- dependency install, `projectmgr restart trainbot`, remote HEAD exact SHA,
  `projectmgr status trainbot`을 모두 확인한 뒤 exit 0을 반환한다.
- SSH/remote/projectmgr/credential failure는 secret-free log와 repair session으로
  넘긴다.

### 14.4 TRACE-ICI

```toml
base = "ilsun/dev"

[deploy]
script = "repo-ops/script/deploy"
timeout_ms = 600000
```

- `[verify]`는 추가하지 않는다.
- `scripts/deploy_fisher.sh`의 expected SHA, SLURM running-job fail-closed, remote
  branch/fetch/ff-only exact sync, `uv sync`, final SHA readback을 표준 entrypoint로
  이동한다.
- 시작과 끝에 local `.worktrees/.repo-ops-deploy` HEAD도 fetched
  `origin/ilsun/dev` target SHA인지 확인한다.
- active SLURM job, unavailable SSH/uv/index는 명확한 failure code와 session
  evidence를 남긴다. success exit 전 Fisher remote HEAD exact SHA를 확인한다.

## 15. 두 Bead rollout 순서

issue-level 순환 dependency 대신 두 approved plans가 exact commit/readback gate를
공유한다.

1. `dotfiles-b2yx`와 `UI-vobi` 새 specs written review/formal gate 완료
2. UI-vobi Phase A: backward-compatible new resolver/store/runner를 land·deploy한다.
   새 config가 없는 legacy workspace는 old reader/provider를 계속 쓰고, 별도
   long-lived feature flag는 만들지 않는다.
3. dotfiles-b2yx: canonical contract/skills/checker, dotfiles repo-ops, CI removal land;
   new runner exact dotfiles deploy/readback
4. UI-vobi: no-CI merge flow, operation coordinator, auto repair setting/UI, legacy
   migration land
5. beads-ui config/script 전환 후 new one-shot self-deploy/readback
6. train_bot `main` enclosed direct landing + new operation deploy/readback
7. TRACE-ICI `ilsun/dev` enclosed direct landing + new operation deploy/readback
8. legacy reader/provider consumer 제거
9. dotfiles enclosed provider binary/service/install retirement + absence readback
10. 두 repo full verification, generated artifacts, runtime health, exact remote tips 확인
11. superseded Bead disposition과 `worker-ineligible` 제거, completion reports, close

각 gate는 이전 단계 exact commit과 terminal exit/log·repo readback evidence를 다음 plan phase input으로
pin한다. 실패하면 현재 단계에서 멈추고 이미 작동 중인 이전 runtime path를 보존한다.
provider를 먼저 삭제하거나 dual reader를 무기한 남기지 않는다.

## 16. 관련 Bead 통합

새 두 specs의 formal gate 뒤 다음처럼 정리한다.

- `UI-vobi`: Worker/runtime/auto repair/rollout host로 유지
- `dotfiles-b2yx`: canonical contract/dotfiles owner로 유지
- `UI-x7fi`: no-CI candidate-tree merge flow에 흡수되어 superseded close
- `UI-q1hs`: unified operation/closure migration에 흡수되어 superseded close
- `UI-oj2f`: one-time exact provider adoption migration에 흡수되어 superseded close
- `UI-qero`: resolved 상태와 historical receipt/PR/revert를 보존하고 notes에 새 owner를
  기록; reverted implementation은 landed behavior로 세지 않음
- `UI-9f54`: bounded fetch/process cleanup에 흡수되어 superseded close
- `UI-yjc2`: generic verify 제거와 operation-isolated TMP/runtime 계약에 흡수되어
  superseded close
- `dotfiles-ji9f`: authoritative remote materialization과 provider retirement에 흡수되어
  superseded close

closed historical UI-lb58/UI-f17c/UI-ckgr와 dotfiles-uib7/j8e6/lsyn/hdid/1jbu/we2r의
specs/plans/receipts는 immutable evidence로 유지한다.

## 17. Test scope

아래 Seam에 RED→GREEN 실행 권한을 둔다.

1. **resolver/schema**
   - missing config와 absent section은 no-op이다.
   - invalid config/path/mode/timeout은 fail-closed다.
   - previous-base declaration이 PR bytes보다 우선한다.
   - legacy config/home fallback을 최종 상태에서 읽지 않는다.
2. **operation checkout**
   - stale/dirty/behind user checkout과 무관하게 fetched `origin/<base>` tip을
     target으로 pin한다.
   - fetch timeout이 child process를 회수하고 한 번만 retry한다.
   - `.worktrees/.repo-ops-deploy`가 registered worktree/common-dir/journal/detached
     ownership proof를 모두 요구한다.
   - deploy branch를 만들지 않고 owned worktree만 exact target으로 정렬한다.
   - ownership mismatch와 non-ancestor remote rewind는 자동 삭제·deploy하지 않는다.
   - verify candidate와 deploy worktree의 repo/origin/base/SHA/script path mismatch를
     거부한다.
3. **verify flow**
   - absent verify가 process/evidence/failure를 만들지 않는다.
   - candidate tree receipt가 동일 merged tree에 승계된다.
   - base/head/tree/script change가 receipt를 stale로 만든다.
   - different final tree는 post-merge 한 번만 실행한다.
4. **operation store/coordinator**
   - prerecord-before-spawn, CAS, restart adoption, terminal settlement이 idempotent다.
   - lock-acquisition fetch/bind, repo serial ordering, newer descendant coverage가
     stale 역전을 막는다.
   - failed/interrupted operation을 duplicate spawn하지 않는다.
5. **one-shot runner**
   - shell=false, 세 protocol env, timeout/process group/log/exit-marker atomicity를
     검증한다.
   - 실제 beads-ui restart 중 child가 살아 exit code/log marker를 쓴다.
   - missing exit marker, nonzero, signal, final HEAD/clean mismatch를 실패시킨다.
6. **auto repair**
   - default ON, durable toggle, OFF no-new-dispatch, running preservation을 검증한다.
   - chain당 1회 budget과 same-fingerprint loop 차단을 검증한다.
   - repair result가 아닌 fresh repo/operation facts만 continuation을 연다.
   - config-disable 우회를 거부한다.
7. **UI/protocol**
   - setting toggle, policy 세 목록, operation card/log/exit/session link를 검증한다.
   - verify/deploy absent stage는 `안 함`으로 표시하고 오류 badge를 만들지 않는다.
   - 실패 kind별 해결 버튼과 automatic repairing 상태를 검증한다.
8. **legacy migration**
   - q1hs/oj2f/qero 대표 record가 exact new state로 한 번만 수렴한다.
   - exact old success만 adoption하고 near-miss는 보존한다.
   - legacy failures가 auto repair budget을 소급 소비하지 않는다.
9. **CI/provider deletion**
   - checks consumer/state/UI/workflow가 active tree에 없다.
   - deployment-job/recovery/repo-deployctl service/state reader/writer가 없다.
   - shared scheduler/session/cleanup owners는 유지된다.
10. **repo scripts**
    - beads-ui self restart/live SHA/path
    - dotfiles install/runtime SHA
    - train_bot remote exact HEAD/projectmgr
    - TRACE Fisher exact HEAD/SLURM/uv
    - 각 script의 idempotent same-SHA replay와 secret-free failure
11. **instructions/generated/runtime**
    - dotfiles workflow/skills/checker/render/install tests
    - beads-ui AGENTS/protocol/bundle/source map
    - 네 repo config/path/executable checks

## 18. 수용 기준

1. 네 repo 모두 `repo-ops/config.toml`과 `repo-ops/script/deploy`를 사용하고
   `[verify]`는 없다.
2. GitHub CI workflow/check gate가 네 repo 운영 흐름에 없다.
3. PR merge는 fresh identity/mergeability/review와 optional verify만 본다.
4. verify가 향후 opt-in되면 candidate tree당 최대 한 번이고 pre/post 중복 실행이
   없다.
5. deploy는 repo lock 안에서 fetched `origin/<base>` tip으로 정렬한 영구 detached
   worktree에서 직렬 실행되고 script exit 0과 local/readback evidence 전에는
   close하지 않는다.
6. beads-ui self-restart 중 one-shot operation이 살아서 exit code와 log를 남긴다.
7. `auto_repair` 기본 ON/OFF/readback, chain당 1회, manual fallback이 UI와 durable
   state에서 일치한다.
8. 사용자가 설정 UI와 canonical contract에서 Worker 자동 처리/자동 session/자동
   금지 목록을 같은 내용으로 확인할 수 있다.
9. legacy cleanup/provider records가 one-time migration 뒤 dual-read 없이 수렴한다.
10. repo-deployctl binary/service/provider state와 Worker deployment adapter/recovery가
    active runtime에서 제거된다.
11. train_bot과 TRACE-ICI는 새 Bead 없이 각각 target base에 enclosed direct
    landing되고 exact remote deploy/readback을 통과한다.
12. user checkout의 branch/index/tracked/untracked 상태가 rollout 전후 보존된다.
13. 어떤 repo에도 deploy branch, candidate release, provider generation이 생기지
    않으며 `.repo-ops-deploy`는 Worker만 정렬한다.
14. 관련 superseded Beads와 receipts가 authoritative readback으로 정리된다.
15. focused/full contract tests, generated artifacts, shared runtime health가 모두
    green이다.

## 19. 완료와 worker eligibility

`UI-vobi`는 host runtime, dotfiles provider retirement, train_bot/TRACE-ICI enclosed
landing·deploy/readback이라는 required no-PR residue를 포함하므로 implementation
중 `worker-ineligible`을 유지한다. 다음 증거를 모두 얻은 뒤 spec follow-up
self-review와 같은 logical write에서 label을 제거한다.

- beads-ui new one-shot self-deploy exit/log와 script-owned live health
- dotfiles new operation deploy와 provider absence readback
- train_bot target-base containment/deploy exit/status log
- TRACE-ICI target-base containment/deploy exit/status log
- union follow-up inventory와 superseded Bead disposition readback

merge나 session 자기보고만으로 완료하지 않는다. parent close는 exact remote
containment, applicable operation terminal evidence, enclosed foreign tips/readbacks와
completion report 뒤 마지막에 수행한다.
