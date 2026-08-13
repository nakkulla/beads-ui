# Worker 선택 검증과 direct/enclosed rollout 재설계

## 상태

- Bead: `UI-vobi`
- route: `spec_backed`
- 사용자 재설계 승인: 2026-08-13
- canonical provider: dotfiles `dotfiles-b2yx`
- downstream merge consumer: `UI-x7fi`
- host repository landing: beads-ui `main` direct
- enclosed repositories: `train_bot/main`, `TRACE-ICI/ilsun/dev`
- expected route promotion: spec gate에서 `independent_phases_2_plus`를 관측하면 `full_plan`

이 문서는 기존 “PR static required + post-merge static + scheduled full” 설계를 폐기하고 같은
spec path를 새 사용자 결정으로 완전히 재작성한다. 기존 `spec_review` receipt는 이 개정 이전
lineage이며, 새 artifact publish 뒤 fresh spec gate가 필요하다.

## 진단된 현재 상태

### Verify가 반복 실패하는 직접 원인

현재 active cleanup failure는 `UI-f17c`의 `post_merge_verify/verify_cmd_failed`다. Lint와
TypeScript는 통과했지만 Vitest의 다음 test가 실패했다.

```text
scripts/build-frontend.test.js
  keeps symlinked dependencies relative to checkout
  Could not resolve "ms"
```

test는 `process.cwd()/node_modules`가 있다고 가정한다. Worker의 exact-SHA detached verify
worktree에는 dependency가 materialize되지 않으므로 source regression이 없어도 실패한다. 같은
focused test는 dependency가 있는 shared `main` checkout에서는 통과한다. 따라서 root cause는
baseline product failure가 아니라 `npm run all`과 detached execution topology의 부적합이다.

Current Worker는 baseline comparison을 하지 않는다. post-merge에서 whole command를 한 번 자동
retry한 뒤 두 번째 red도 final failure로 기록하므로, pinned base에서 같은 실패가 있어도 cleanup은
항상 멈춘다.

### CI가 오류처럼 보이는 원인

`nakkulla/beads-ui`의 `Build` workflow는 push/PR check suite 실행 이력이 0회이고 repository
instruction도 이 fork에서 GitHub CI를 사용하지 않는다고 선언한다. 하지만 Worker는 checks를
항상 관측하고 empty result와 local verify fallback을 하나의 merge-gate tier로 투영한다. 실제로
없는 CI를 기다리거나 오류처럼 표시할 이유가 없다.

### Deploy가 오류처럼 보이는 원인

현재 external deployment provider의 exact-SHA generation과 live `/healthz`는 terminal success다.
화면에 남은 deploy error는 active provider failure가 아니라 legacy `last_deploy` residue다. 이
Bead는 verification source 선택을 고치고 provider status를 canonical projection으로 사용한다.
과거 residue의 일괄 reconciliation은 `UI-oj2f`, closed/pr_wait cleanup의 안전한 수동 재개는
`UI-q1hs`가 소유하므로 여기서 별도 자동 mutation을 만들지 않는다.

## 사용자 결정

1. GitHub CI와 local verify를 하나의 `none|checks|local` enum으로 합치지 않는다.
2. `[ci]`, `[verify].pre_merge`, `[verify].post_merge`, `[deploy]`를 독립 선언한다.
3. local pre/post verify의 기본값과 현재 managed repository 값은 모두 `false`다.
4. 필요해지는 repository만 나중에 phase별 command를 설계하고 true로 켠다.
5. beads-ui의 사용되지 않는 `.github/workflows/ci.yml`은 삭제한다.
6. beads-ui consumer는 PR 없이 reviewed exact candidate를 `main`에 직접 반영하고 즉시 배포한다.
7. `train_bot`과 `TRACE-ICI`는 새 Bead/PR을 만들지 않고 `UI-vobi`의 enclosed unit으로 각 target
   base에 직접 반영한다.
8. `post_merge_verify` failure 하나만으로 새 issue를 만들지 않는다. same-Bead diagnosis/recovery가
   기본이고 concrete blocker만 canonical follow-up admission을 쓴다.

## 목표

1. pinned `repo-ops.toml`에서 CI, local phase, deploy를 별도 object로 resolve한다.
2. checks absence가 local verify를 자동 활성화하지 않게 한다.
3. local post verify off를 silent success가 아닌 exact-SHA `declared_none` evidence로 남긴다.
4. whole-command automatic retry와 automatic baseline/repair inference를 제거한다.
5. legacy cleanup row를 잃지 않으면서 active UI와 cursor를 새 disposition semantics로 전환한다.
6. beads-ui → train_bot → TRACE-ICI 순서로 새 contract와 declarations를 배포한다.
7. direct/enclosed push 전에 exact-candidate verification을 별도로 통과한다.

## 비목표

- 새 generic verify script를 네 repository에 즉시 만들지 않는다.
- Worker가 `npm ci`, venv, uv, GPU/data dependency를 자동 추측하지 않는다.
- full test inventory를 삭제하거나 모든 실패를 advisory로 재분류하지 않는다.
- GitHub branch protection, `UI-x7fi`의 pinned merge decision, deployment provider protocol을
  이 Bead에서 재설계하지 않는다.
- legacy failure history를 삭제하거나 current provider success로 덮어쓰지 않는다.
- merge rollback, force push, history rewrite를 사용하지 않는다.

## Final repository declarations

### dotfiles

Canonical provider `dotfiles-b2yx`가 먼저 다음 declaration을 land한다.

```toml
[ci]
required_checks = ["dotfiles_smoke"]

[verify]
pre_merge = false
post_merge = false

[deploy]
cmd = ["src/shell/bin/repo-deploy", "--candidate"]
timeout_ms = 600000
```

`dotfiles_smoke`는 실제 PR CI다. 기존 `scripts/verify-post-merge.py`는 그 check 안에서 계속
실행하지만 generic Worker pre/post hook에는 쓰지 않는다.

### beads-ui

```toml
[verify]
pre_merge = false
post_merge = false

[deploy]
cmd = ["scripts/deploy-self.js"]
timeout_ms = 600000
```

`[ci]`는 선언하지 않고 `.github/workflows/ci.yml`을 삭제한다. `[deploy]`와 exact runtime
readback은 유지한다.

### train_bot

```toml
[verify]
pre_merge = false
post_merge = false

[deploy]
cmd = ["bash", "scripts/deploy.sh"]
timeout_ms = 600000
```

CI workflow는 만들지 않는다. Existing unittest inventory는 implementation/publication focused
verification에만 사용하고 Worker hook으로 실행하지 않는다. Deploy는 candidate HEAD를
`expected_sha`로 remote에 전달하고 fetch/ff-only/exact final HEAD/readback을 검증하도록 고친다.

### TRACE-ICI

```toml
base = "ilsun/dev"

[verify]
pre_merge = false
post_merge = false

[deploy]
cmd = ["bash", "scripts/deploy_fisher.sh"]
timeout_ms = 600000
```

CI workflow와 generic pytest hook은 만들지 않는다. Existing deploy script의 expected-SHA,
SLURM guard, ff-only sync와 final HEAD readback을 declaration으로 활성화한다.

## Worker architecture

### 1. Pinned declaration resolver

`server/worker/repo-ops.js`는 하나의 `resolveVerify` fallback result 대신 다음 independent result를
반환한다.

```text
ci: absent | invalid | resolved(required_checks)
verify: absent | invalid | resolved(pre_merge, post_merge, cmd?, timeout_ms?)
deploy: absent | invalid | resolved(cmd, timeout_ms)
```

- pre-merge는 fetched target-base SHA, post-merge는 `base_sync` exact SHA의 blob을 읽는다.
- `[verify]` absence와 explicit false/false는 execution off다.
- active true인데 cmd가 없거나 schema가 invalid하면 fail closed한다.
- false/false에 stale cmd/timeout이 있으면 invalid로 거부해 dead command를 남기지 않는다.
- `~/.config/bdui/config.toml [worker.verify]`는 execution fallback에서 제거한다.
- `[deploy]` resolution은 verify declaration의 유무와 독립이다. Provider request는 selected post
  disposition이 `local_pass|declared_none`일 때만 시작하며 active local failure를 건너뛰지 않는다.

### 2. Pre-merge observation/gate

`pr-poller.js`와 click/auto gate는 declaration을 먼저 resolve한다.

- `[ci]` absent: `gh.prChecks`를 verification gate로 조회하지 않고 CI row/error를 만들지 않는다.
- `[ci]` resolved: declared exact names만 rollup한다. known red는 차단하고 fast path의
  pending/missing은 remote policy에 맡긴다.
- `pre_merge=false`: local verify process 0회다.
- `pre_merge=true`: clean detached PR-head worktree에서 command를 explicit attempt당 한 번 실행한다.
- CI와 local pre는 동시에 true일 수 있으며 둘 다 independent required predicate다.

Implementation receipt, draft/base/head identity, mergeability/conflict는 그대로 별도 safety predicate다.
Checks absence가 receipt나 local command를 대체하지 않는다.

### 3. Post-merge verification disposition

`base_sync` 뒤 exact SHA에서 다음 둘 중 하나를 기록한다.

```text
local_pass:
  verification_sha=<sha>
  verification_disposition=local_pass
  command_digest=<sha256>

declared_none:
  verification_sha=<sha>
  verification_disposition=declared_none
```

`post_merge=true`만 command를 실행한다. Automatic whole-command retry, pinned-base comparison,
automatic repair child를 만들지 않는다. 실패는 same cursor에 command/log/SHA를 보존하고 explicit
manual resume 전까지 deploy를 시작하지 않는다.

`post_merge=false`는 command를 실행하지 않고 `declared_none`을 남긴 뒤 deploy로 진행한다. 이는
post-merge verification phase를 deploy에 합치는 것이 아니다. verification policy disposition과
runtime effect를 분리한 것이다.

### 4. Durable compatibility

`cleanup_failed.step=post_merge_verify`와 기존 queue/UI consumers를 즉시 삭제하지 않는다.

- compatibility reader는 legacy step을 candidate-verification phase로 normalize한다.
- active cleanup order는 내부적으로 disposition semantics를 사용한다.
- UI label은 `local 검증 통과`, `local 검증 사용 안 함`, `legacy local 검증 실패`를 구분한다.
- old `verify_cmd_failed` row의 history/log path는 보존한다.
- `UI-q1hs`가 old row를 explicit retry할 때 exact current declaration이 false면 process 없이
  `declared_none`을 기록하고 next deployment/cleanup step으로 진행한다.
- closed Bead를 자동 reopen하거나 startup에서 cleanup을 자동 재실행하지 않는다.

### 5. Deploy projection

`deployment-job.js`의 external provider binding은 유지한다. UI와 completion은 provider
`{target_base,target_sha,generation,state}`를 canonical로 읽고 legacy `last_deploy`를 active error로
승격하지 않는다. Verify off가 deploy off를 뜻하지 않으며, provider terminal failure/retry는 기존
deployment recovery policy가 소유한다.

## Cleanup order와 failure semantics

```text
MERGED/merge SHA readback
  -> base_sync
  -> verification disposition(local_pass | declared_none)
  -> deployment_request/status binding
  -> deployment terminal readback
  -> child_sweep
  -> branch_cleanup
  -> parent_close
  -> final_readback
```

- declaration/config/identity error는 해당 step에서 fail closed한다.
- local command red는 자동 retry 없이 멈춘다.
- `declared_none`은 green command를 위조하지 않고 policy가 off였음을 기록한다.
- accepted/pending deployment request는 existing durable continuation을 사용하고 child/branch/parent
  closure를 terminal success까지 보류한다.
- terminal success로 닫힌 뒤의 별도 runtime regression은 historical Bead를 reopen하지 않고 owning
  deployment recovery policy로 처리한다.
- verify/deploy failure만으로 follow-up을 만들지 않는다. read-only diagnosis와 same-scope fix/redeploy를
  먼저 수행하고 concrete external/authority/destructive/unreachable blocker만 `unsafe_now`다.

## Beads-ui implementation surface

Landed code에서 exact caller를 다시 확인하되 다음 owned semantics를 한 integrated change로 다룬다.

- `server/worker/repo-ops.js`와 attach wiring: separated resolver/schema, no legacy verify fallback
- `server/worker/pr-poller.js`, `merge-gate.js`, `pr-actions.js`: independent CI/pre/post selection
- `server/worker/verify-cmd.js`: explicit-attempt single run, exact SHA/log preservation
- `server/worker/completion-repair-policy.js`: verify failure automatic repair 제거
- queue store/protocol/UI projection: verification disposition와 legacy read compatibility
- `docs/agents/repo-ops.toml`: beads-ui final declaration
- `.github/workflows/ci.yml`: 삭제
- `AGENTS.md`: repository-local active CI/verify/deploy guidance 정합
- focused unit/integration/UI tests와 frontend bundle

`UI-x7fi`의 pure pinned merge decision은 이 Bead의 schema를 소비한다. `UI-x7fi` implementation
entry 전에 해당 spec의 formal review와 final provider freshness self-review를 닫고, 이전
“required-check allowlist + local verify fallback + 항상 post_merge_verify” 가정을 다음으로
정합한다.

- `[ci]` declared names만 CI input
- `[ci]` absent는 no-CI, not error
- `pre_merge=true`만 additional local predicate
- post tail은 `local_pass|declared_none` 뒤 deploy
- 새 parser나 duplicate schema를 만들지 않고 `UI-vobi` resolver를 호출

Repository-local `AGENTS.md`의 Post-Merge Runtime Validation과 GitHub Actions 문구도 active
consumer다. `[worker.verify]` fallback, whole-command retry, detached self-deploy와 vacuous-pass
설명을 제거하고 다음 final 사실만 남긴다.

- `[ci]` absence이므로 GitHub checks는 이 repository의 gate가 아님
- `[verify]` pre/post false이므로 Worker local command가 없음
- implementation/publication Test scope는 별도 required evidence임
- `[deploy]` external provider와 exact live readback은 계속 required임

Historical specs/plans는 수정하지 않는다.

## Host direct-main landing

Old Worker가 `UI-vobi` PR을 merge하면 현재 broken `npm run all` post-merge hook을 다시 실행해
bootstrap cleanup을 막는다. 사용자는 이 consumer change를 PR 없이 beads-ui `main`에 직접
반영하도록 승인했다.

Implementation은 ordinary `UI-vobi` worktree에서 이루어지고 spec/implementation gate를 닫는다.
그 뒤 latest fetched `origin/main` 위 clean integration candidate를 만들고 다음 exact bundle을
candidate에서 통과시킨다.

```text
npm ci
npm run tsc
npm test
npm run lint
npm run prettier:write + clean diff confirmation
npm run build + bundle/map ownership confirmation
focused repo-ops/gate/cleanup/queue/UI suites
git diff --check
```

Controller는 publish range와 owned paths를 self-review한 뒤 non-force fast-forward로 `main`에
push하고 exact remote containment을 확인한다. 이어 durable synced `main` checkout을 landed SHA로
ff-only sync하고 `HEAD == landed_sha`를 readback한다. 그 checkout에서 repository-owned direct/manual
path인 `bdui-shared restart`를 실행한 뒤 runtime config, process release path/source SHA, port와
`/healthz`를 확인한다. Durable checkout이 target-base branch가 아니거나 ahead/diverged 상태이거나,
ff-only sync가 locally modified tracked file 또는 colliding untracked path를 덮어써야 하면 external
provider로 우회하지 않고 hard stop한다. 무관한 user work는 그대로 보존한다. Generic
implementation worktree에서 live install/restart를 직접 실행하지 않는다.

## Enclosed cross-repo ledger

사용자는 `train_bot`과 `TRACE-ICI`에 새 Bead/PR을 만드는 split proposal을 명시적으로 거부하고
`UI-vobi` 아래 enclosed direct-target-base landing을 승인했다.

```text
dotfiles canonical provider = split + bead:dotfiles-b2yx
beads-ui runtime host       = bead:UI-vobi, direct main
train_bot unit              = enclosed:UI-vobi
TRACE-ICI unit              = enclosed:UI-vobi
UI-x7fi merge adapter       = existing downstream bead:UI-x7fi
```

두 enclosed unit은 new beads-ui runtime deployment 뒤 같은 interactive session에서 순차 실행한다.
각 landing은 foreign shared checkout을 건드리지 않고 target repo 아래
`.worktrees/.enclosed-UI-vobi` detached worktree를 사용하며 모든 exit path에서 제거한다.

### Enclosed declaration — train_bot

- target repo absolute path: `/Users/isy_macstudio/Documents/GitHub/train_bot`
- resolved target_base: `main`
- base evidence: `docs/agents/repo-ops.toml`에 `base`가 없어 canonical default `main`
- fetched remote base tip at declaration: `92d087458dcca288d8bf4f1c4d73728faf268c54`
- owned paths:
  - `docs/agents/repo-ops.toml`
  - `scripts/deploy.sh`
  - `tests/test_repo_ops_contract.py`
- self-verification bundle:
  - detached candidate cwd에서 durable checkout `.venv/bin/python`으로
    `tests.test_deadline_policy`, `tests.test_display_filter`,
    `tests.test_normalize_datetime`, `tests.test_process_lifecycle`,
    `tests.test_repo_ops_contract` 실행
  - `PYTHONDONTWRITEBYTECODE=1`, candidate 내부 bytecode/cache 생성 금지
  - `bash -n scripts/deploy.sh`
  - exact candidate `git diff --check`
  - post-landing durable target-base checkout `HEAD==landed_sha`
  - 그 checkout에서 `bash scripts/deploy.sh` exit 0, remote `HEAD==landed_sha`,
    `projectmgr status trainbot` readback
- why_not_split: user refused the split proposal on 2026-08-13 and explicitly chose
  `enclosed:UI-vobi` direct `main` landing.

`tests/test_run_bot_daemon.py`는 `$HOME/.pm/locks`를 만질 수 있으므로 이 bounded contract change의
required bundle에 넣지 않는다. Full unittest hook을 끄는 이유이기도 하다. Future command를
도입하려면 isolated HOME을 가진 repo-owned wrapper를 별도 설계한다.

Landing 뒤 durable `main` checkout을 ff-only로 exact landed SHA에 sync하고 HEAD를 확인한 다음 그
checkout에서 `bash scripts/deploy.sh`를 실행한다. Checkout이 안전하게 exact sync될 수 없으면 external
provider로 우회하지 않고 hard stop한다. `scripts/deploy.sh`는 실행 checkout에서
`expected_sha=$(git rev-parse HEAD)`를 구하고 그 값을 SSH
argument로 전달한다. Remote script는 canonical checkout/branch를 확인하고 `origin/main`을 fetch한
뒤 expected commit 존재와 current HEAD의 ancestor 관계를 증명하고 `git merge --ff-only
<expected_sha>`한다. Dependency install/restart 뒤 final `HEAD == expected_sha`와
`projectmgr status trainbot`을 readback한다. Remote가 expected SHA보다 앞서 있거나 diverged하면
latest tip을 조용히 배포하지 않고 fail closed한다. Credential이나 token 값은 argv/log에 넣지
않는다.

### Enclosed declaration — TRACE-ICI

- target repo absolute path: `/Users/isy_macstudio/Documents/GitHub/TRACE-ICI`
- resolved target_base: `ilsun/dev`
- base evidence: `docs/agents/repo-ops.toml`의 `base = "ilsun/dev"`
- fetched remote base tip at declaration: `71125b4aa8a759b74ff97cfbdf8722c885e00ca8`
- owned paths:
  - `docs/agents/repo-ops.toml`
  - `tests/test_repo_ops_contract.py`
- self-verification bundle:
  - detached candidate cwd에서 durable checkout `.venv/bin/python`으로
    `pytest -q -p no:cacheprovider`와 다음 tests 실행:
    `test_paths.py`, `test_gitignore.py`, `test_data_links.py`, `test_kg.py`,
    `test_rules.py`, `test_validate_kg_fail_closed.py`, `test_repo_ops_contract.py`
  - `PYTHONDONTWRITEBYTECODE=1`
  - `scripts/diag/verify_prereg.py --repo . --quiet`
  - `bash -n scripts/deploy_fisher.sh`
  - exact candidate `git diff --check`
  - post-landing durable target-base checkout `HEAD==landed_sha`
  - 그 checkout에서 `bash scripts/deploy_fisher.sh` exit 0과 fisher canonical checkout
    `HEAD==landed_sha` readback
- why_not_split: user refused the split proposal on 2026-08-13 and explicitly chose
  `enclosed:UI-vobi` direct `ilsun/dev` landing.

Landing 뒤 durable `ilsun/dev` checkout을 ff-only로 exact landed SHA에 sync하고 HEAD를 확인한 다음
그 checkout에서 `bash scripts/deploy_fisher.sh`를 실행한다. Checkout이 안전하게 exact sync될 수
없으면 external provider로 우회하지 않고 hard stop한다. GPU, real data, `.env`, SLURM job execution과
full scientific pipeline은 이 declaration-only change의 required verification이 아니다. Existing
deploy script의 `squeue` guard가 active job이 있으면 deployment를 fail closed한다.

### Enclosed publication evidence

각 foreign landing은 reviewed bytes를 latest fetched base tip에 replay하고 다음을 `UI-vobi` notes에
readback한다.

```text
repo
declared_fetched_tip
actual_fetched_parent
landed_tip
owned_commit_shas
owned changed-path list
verification result
durable target-base checkout path/base/HEAD
direct/manual deploy command and exit status
remote exact-SHA readback
runtime/readback result
helper result(landed | already_contained)
```

`land-reviewed-artifact.py`는 exact path 한 개를 운반하므로 각 owned path마다 실행한다. Active
declaration은 항상 마지막에 land한다.

- train_bot: contract test → deploy script → `repo-ops.toml`
- TRACE-ICI: contract test → `repo-ops.toml`

이 순서로 중간 remote tip은 새 mode를 활성화하지 않는다. Combined detached candidate를 먼저
검증하고, 마지막 declaration landing 뒤 actual remote tip에서 같은 bundle을 다시 실행해 helper
replay 중 base advance까지 검증한다. Push 전 controller self-review와 push 후 exact containment은
각 path에 대해 기록한다.

Remote tip이 declaration 뒤 전진해도 spec을 backfill하지 않는다. Actual parent와 landed evidence를
notes에 기록한다. Enclosed commit은 host implementation gate 뒤 생기므로 각 pre-push exact diff를
controller가 self-review하고, 두 landing 뒤 union range에 controller follow-up self-review를 수행한다.
Host `impl_review` receipt는 host SHA 형식을 유지하고 foreign range는 notes evidence로 결합한다.

`UI-vobi`는 required interactive enclosed residue가 있으므로 spec gate에서 `worker-ineligible`을
추가한다. beads-ui direct/manual deployment와 두 enclosed landing/direct-manual deploy/readback,
follow-up self-review가 모두 끝난 뒤에만 label을 제거하고 Bead를 close한다.

## Ordered rollout

1. `dotfiles-b2yx`, `UI-vobi`, `UI-x7fi` 세 스펙을 final schema/ownership/order에 정합하고 각 formal
   spec gate를 먼저 닫는다.
2. `dotfiles-b2yx`가 canonical schema, resolver, checker/tests/generated output과 dotfiles declaration을
   PR로 land/deploy하고 close한다.
3. `UI-vobi`가 final provider contract 위에서 beads-ui consumer를 구현하고 implementation gate를
   닫는다.
4. reviewed beads-ui candidate를 direct `main`에 push하고 durable synced `main` checkout에서
   `bdui-shared restart`와 exact live readback을 완료한다.
5. new runtime이 `[ci]`/phase booleans/`declared_none`을 읽는 것을 focused live probe로 확인한다.
6. train_bot enclosed unit을 latest `origin/main`에 land하고 exact deploy/readback한다.
7. TRACE-ICI enclosed unit을 latest `origin/ilsun/dev`에 land하고 exact deploy/readback한다.
8. foreign ranges를 controller follow-up self-review하고 `UI-vobi`의 worker-ineligible residue를
   해소한 뒤 completion report와 close readback을 완료한다.
9. `UI-x7fi`는 final provider commits에 대한 spec freshness self-review 뒤 pinned merge adapter를
   구현한다.

## Test scope

### Seam A — separated resolver

- `[ci]` absent/resolved/invalid와 `[verify]` absent/off/pre/post/both/invalid를 독립 fixture로 고정한다.
- invalid declaration은 legacy fallback으로 내려가지 않는다.
- pinned pre/post SHA source와 cache invalidation을 고정한다.

### Seam B — pre-merge gate

- no CI + local off는 checks/local process 모두 0회이고 ordinary merge predicates만 남는다.
- CI only는 exact declared check만 판정한다.
- local pre only와 CI+local pre는 current head-bound result를 요구한다.
- stale/error observation과 active command failure는 fail closed한다.

### Seam C — post-merge disposition

- post false는 spawn 0회, exact SHA `declared_none`, deploy request 1회를 만든다.
- post true는 explicit attempt당 command 1회이고 red 뒤 deploy 0회다.
- deploy pending은 continuation을 남기고 closure 0회이며 terminal success 뒤에만 sweep을 계속한다.
- whole-command automatic retry, baseline comparison, automatic repair child는 0회다.
- legacy `post_merge_verify` row를 읽고 current false policy로 safe resume한다.

### Seam D — UI/protocol compatibility

- CI absent, local disabled, local failed, deploy pending/failed/succeeded를 서로 다른 projection으로
  표시한다.
- provider success가 legacy `last_deploy` failure에 가려지지 않는다.
- historical log/detail은 유지하고 new active state와 섞지 않는다.

### Seam E — repository declarations

- beads-ui CI workflow deletion과 repo-ops false/false/deploy declaration을 고정한다.
- train_bot exact-SHA deploy contract와 false/false declaration을 고정한다.
- TRACE-ICI target base, false/false, existing exact deploy declaration을 고정한다.

## Acceptance criteria

1. `[ci]` absence가 no-check CI error/wait/badge를 만들지 않는다.
2. local pre/post command는 explicit true일 때만 실행되며 현재 네 repository 값은 모두 false다.
3. beads-ui의 unused CI workflow와 `npm run all` Worker hook이 제거된다.
4. post local off는 exact SHA `declared_none` evidence 뒤 deploy/cleanup을 계속한다.
5. local failure는 automatic retry/baseline compare/repair Bead를 만들지 않는다.
6. legacy `post_merge_verify` failure/log를 읽고 explicit recovery할 수 있다.
7. beads-ui consumer가 reviewed exact candidate로 direct `main`에 반영되고 durable synced `main`
   checkout의 direct/manual deployment와 live readback이 exact landed SHA와 일치한다.
8. train_bot과 TRACE-ICI는 새 Bead/PR 없이 declared target base에 enclosed landing되고 각
   exact deploy/readback이 terminal이다.
9. shared checkouts의 unrelated dirty/untracked work와 existing user specs를 건드리지 않는다.
10. `UI-x7fi`가 새 separated resolver를 소비하며 old required/static-postmerge assumptions를
    복제하지 않는다.
