# 재시작 안전 repo operation 정리 설계 (UI-pmfr / dotfiles-ia4p)

## 배경

`dotfiles-wn55`의 PR #404는 정상적으로 머지됐고 deploy operation도 exit 0으로
끝났다. 그러나 deploy script가 실행 중인 `beads-ui` 서비스를 재시작하는 동안
post-merge cleanup이 중단됐고, 새 서버가 같은 행을 복구하는 사이
`base_fetch_failed`와 `action_in_flight`가 durable cleanup 실패로 기록됐다. 이후
자동 해결 세션이 이미 성공한 deploy operation을 채택해서 정리는 끝났지만, 성공한
배포가 불필요한 실패·복구 경로를 거친 셈이다.

현재 구조에는 재시작을 안전하게 넘길 기반이 이미 있다.

- repo operation runner는 서비스 프로세스와 분리된 detached child로 실행된다.
- runner는 launch marker와 terminal marker를 durable spool에 기록한다.
- coordinator의 startup reconcile은 marker를 읽어 `running` operation을
  `succeeded` 또는 `failed`로 정착시킨다.
- PR 대기 행은 `cleanup_cursor=repo_operations`, `merge_sha`와 exact operation의
  `subjects`를 보존한다.
- startup은 coordinator reconcile, cleanup resume, PR poller 시작 순서다.

결함은 새 상태나 복구 시스템의 부재가 아니다. 기존 사실을 기다리고 채택해야 할
두 경로가 너무 일찍 끝난다.

1. `runCleanup`은 deploy operation을 한 번만 조회하고 nonterminal이면 곧바로
   `pending`을 반환한다. 그러면 다음 poll이 동일 cleanup을 다시 시작할 수 있다.
2. 재시작 뒤 `resumeRepoOperations`는 `repo_operations` cursor에서도 base fetch부터
   전체 cleanup을 재실행한다. 이미 exact deploy operation이 실행 중이거나 성공했는데도
   네트워크 작업을 반복한다.
3. 그 사이의 정상 중복 방지 응답 `action_in_flight`를 PR poller가 일반 실패와
   똑같이 `cleanup_failed`로 기록한다.
4. dotfiles deploy script는 fleet의 현재 running 서비스를 받은 순서대로 재시작해
   자신을 구동한 `beads-ui`를 중간에 끊을 수 있다.

## 목표

- 기존 `repo_operations` 상태와 marker를 사용해 deploy terminal을 기다린다.
- 서버가 재시작되면 exact subject에 결속된 operation부터 채택하고, 이미 끝난
  base containment를 불필요하게 반복하지 않는다.
- 정상적인 중복 cleanup은 coalescing으로 처리하고 durable 실패를 만들지 않는다.
- 실제 terminal failure와 timeout 이후 nonterminal 상태를 구분한다.
- dotfiles가 여러 running 서비스를 재시작할 때 `beads-ui`를 마지막에 처리한다.
- 재시작 뒤에도 성공한 정리는 자식 sweep부터 parent close까지 정확히 한 번 수렴한다.

## 비목표

- `restart_pending` 같은 새 workflow enum, queue state, metadata, label 추가
- repo operation runner, spool 파일 형식, queue schema의 교체
- 자동 해결 사다리나 retry budget 변경
- 배포 선언 또는 서비스 재시작 요구 삭제
- `UI-20gk`가 소유한 Worker·Monitor 진행 표시와 frontend bundle 변경
- 일반적인 Git fetch retry 정책 확대

## 결정

### 기존 상태를 재사용한다

사용자에게 보이는 상태는 계속 `repo_operations: running`이다. 재시작은 별도의 실패나
대기 상태가 아니라 detached operation의 정상 실행 구간이다. terminal marker가 아직
없으면 running을 유지하고, marker exit 0을 읽으면 succeeded, 실제 non-zero·signal·
marker 불일치가 있으면 기존 failed 경로로 간다.

`restart_operation_adoption`은 다음 의미로 고정한다.

- cleanup을 구동한 서비스가 재시작돼도 detached runner의 terminal evidence가
  operation의 종료 근거다.
- 새 서버는 coordinator reconcile을 먼저 끝낸 뒤 cleanup을 재개한다.
- exact subject의 기존 deploy operation이 있으면 그것을 먼저 기다리거나 소비한다.
- 같은 cleanup authority의 `action_in_flight`는 terminal failure가 아니다.

### beads-ui가 정확성을, dotfiles 순서가 중단 창을 줄인다

정확성은 beads-ui의 wait·adoption·coalescing으로 보장한다. dotfiles에서
`beads-ui`를 마지막에 재시작하는 것은 다른 서비스의 restart와 readiness 확인을 먼저
끝내 중단 뒤 남는 작업을 최소화한다. 순서 변경만으로 성공을 추정하거나 marker 확인을
생략하지 않는다.

### 적용 순서는 beads-ui 후 dotfiles다

두 저장소는 독립 상위 Bead와 PR을 사용한다.

1. `UI-pmfr`이 restart-safe wait와 adoption을 배포한다.
2. UI PR의 merge containment, deploy terminal, 실제 공유 서비스 readback을 확인하고
   `UI-pmfr`을 닫는다.
3. foreign `blocks` dependency가 풀린 뒤 `dotfiles-ia4p`가 restart-last와 계약 설명을
   배포한다.

UI 단계 뒤 멈추면 기존 dotfiles 순서는 남지만 새 Worker가 재시작을 안전하게 채택한다.
dotfiles 단계가 시작된 뒤 `beads-ui` 재시작에서 끊겨도 detached marker와 새 Worker가
동일 cursor를 재개한다. 따라서 어느 경계에서 중단돼도 사용자 데이터나 operation을
삭제하지 않고 다시 시작할 수 있다.

## beads-ui 변경

### coordinator terminal wait

`server/worker/repo-operation-coordinator.js`에 deploy 전용 terminal wait를 둔다.

- 입력은 `operation_id`, exact `target_base`·`merged_sha`, 필수 finite
  `timeout_ms`, 선택적 `poll_ms`다. 호출자가 timeout을 증명하지 못하면 임의 기본값으로
  기다리지 않는다.
- 각 poll은 먼저 `reconcile(workspace)`을 실행한 뒤 기존
  `deploymentEvidence`를 읽는다.
- succeeded 또는 failed면 즉시 기존 evidence를 반환한다.
- 기한은 declaration timeout에 작은 reconcile grace를 더한 bounded deadline이다.
- 기한까지 nonterminal이면 마지막 nonterminal evidence를 반환한다. 이를 failure로
  발명하지 않는다.
- `ensureDeploy`가 기존 operation을 채택하거나 queued 상태를 반환할 때도 해석한
  declaration의 `timeout_ms`를 함께 반환해 최초 실행과 채택의 wait bound를 같게 한다.

coordinator는 exact subject로 기존 deploy operation을 찾는 read-only helper도
소유한다. 후보는 같은 repo, `kind=deploy`, 같은 target base, exact
`bead_id`+`merged_sha` subject로 제한한다. 요청 시각으로 결정적으로 origin operation을
고르되 `superseded_by`가 있어도 origin을 버리지 않고 기존 `deploymentEvidence`가 successor
또는 descendant success coverage를 판정하게 한다. unrelated successor를 exact subject로
승격하지 않는다.

재시작 채택은 `ensureDeploy`를 다시 호출하지 않으므로 helper가 wait bound도 함께
복원한다. 선택한 operation의 durable `effective_base_sha`에서 deploy 선언을 읽기 전용으로
재해석하고, operation에 저장된 script path·mode·blob identity와 정확히 일치하는 선언의
`timeout_ms`만 사용한다. bootstrap 계보처럼 effective base와 target이 같은 경우에도 같은
pinned SHA의 선언과 identity를 검증한다. config를 읽을 수 없거나 deploy 선언이 없거나
identity·timeout이 맞지 않으면 `{ code: 'repo_operation_timeout_unresolved' }`로 반환한다.
현재 target tip이나 home config, 상수 600000으로 추정하지 않는다.

### cleanup의 최초 실행과 재시작 채택

`server/worker/pr-actions.js`의 최초 `runCleanup`은 `ensureDeploy` 뒤 한 번 조회하고
빠지지 않고 deploy terminal wait를 호출한다.

- succeeded: 기존 `closeCoveredRow`로 진행한다.
- failed: 기존 `failCleanup(repo_operations, ...)`에 failure evidence와 log path를
  전달한다.
- deadline 뒤 nonterminal: cursor와 operation을 그대로 두고 `pending`을 반환한다.

`resumeRepoOperations`가 `cleanup_cursor=repo_operations` 행을 만나면 base fetch를
재실행하기 전에 exact subject deploy operation을 찾는다.

- 찾았고 pinned declaration에서 timeout까지 복원했으면 그 timeout을 사용한 terminal
  wait로 성공 시 closure, 실패 시 기존 실패 기록, deadline 뒤 nonterminal이면 현 상태
  유지를 수행한다.
- exact operation은 찾았지만 timeout을 증명하지 못하면
  `repo_operation_timeout_unresolved`로 fail closed한다. base fetch replay나 기본 timeout으로
  우회하지 않는다.
- 찾지 못했으면 재시작이 verify 이전 또는 deploy prerecord 이전에 일어난 경우이므로
  기존 전체 `runCleanup` replay를 사용한다.
- `child_sweep` 이후 cursor는 현재처럼 closure-only replay를 유지한다.

이 분기로 이미 실행 중인 deploy를 채택할 때 base fetch를 다시 하지 않는다. 새로운
checkpoint나 operation id 필드를 PR 행에 쓰지 않는다.

### 중복 cleanup coalescing

`server/worker/pr-poller.js`는 `onMerged`가 `reason=action_in_flight`를 반환하면 동일
Bead의 cleanup이 이미 owner를 가진 것으로 해석한다. 알림은 갱신할 수 있지만
`recordCleanupFailure`를 호출하지 않는다. 다음 poll 또는 startup resume가 durable
cursor에서 계속한다.

그 외 `ok=false`와 예외는 기존 실패 기록을 유지한다. `discard_in_progress`,
`not_in_pr_wait`, 실제 cleanup failure의 의미를 넓혀 무시하지 않는다.

### startup ordering

`server/worker/attach.js`의 현 순서인

`repoOperationCoordinator.reconcile → repoOperationMigration →
prActions.resumeRepoOperations → prPoller.start`

를 유지한다. 구현 변경이 필요하지 않으면 회귀 테스트만 이 순서를 고정한다. poller가
resume보다 먼저 같은 행을 소비하는 순서는 허용하지 않는다.

## dotfiles 변경

### `beads-ui` restart-last

`repo-ops/script/deploy`는 `projectmgr active-services` 결과 중 현재 running인 서비스만
재시작한다는 기존 조건을 유지한다. 다만 두 pass로 실행한다.

1. `beads-ui`가 아닌 running 서비스를 원래 열거 순서로 restart하고 각각 running을
   poll한다.
2. `beads-ui`가 active이고 현재 running일 때만 마지막으로 restart하고 running을
   poll한다.

중복 코드는 작은 shell 함수로 묶되 `sh` 호환을 유지한다. stopped 서비스와 scheduled
job을 시작하지 않으며, 어떤 restart 또는 readiness 확인이 실패해도 기존처럼 fail closed다.

### 계약 설명

canonical `docs/contracts/workflow.md`의 repo operation 절차에
`restart_operation_adoption`의 위 의미를 짧게 명시한다. machine enum은 이미
`docs/contracts/workflow.yaml`에 있으므로 새 token이나 projection schema를 추가하지
않는다. focused contract test는 YAML token과 prose가 함께 남는지 확인한다.

## 오류 처리와 관측성

- terminal failed evidence는 operation failure code, fetch failure·elapsed time,
  log path를 기존 cleanup failure에 전달한다.
- bounded wait 만료는 operation이 여전히 running이라는 사실이지 실패 증거가 아니므로
  `cleanup_failed`를 만들지 않는다.
- restart adoption의 pinned declaration·script identity에서 timeout을 복원할 수 없으면
  `repo_operation_timeout_unresolved` terminal cleanup failure로 남기고 추정값으로
  진행하지 않는다.
- marker가 없거나 process identity가 모순되면 coordinator의 기존 interrupted/failure
  판정이 그대로 적용된다.
- startup resume 중 exact operation을 찾지 못한 경우에만 기존 replay를 사용하므로,
  deploy prerecord 전에 끊긴 행도 정체되지 않는다.
- `action_in_flight` 외의 실패 reason을 일반적으로 숨기지 않는다.

## Test scope

### UI-pmfr RED → GREEN seams

1. `server/worker/repo-operation-coordinator.test.js`
   - running deploy와 지연된 terminal marker를 만들고 deploy wait가 marker 전에는
     끝나지 않으며 reconcile 뒤 exit 0 evidence를 반환하는 테스트는 현재 deploy wait
     API가 없어 RED다.
   - adopted·queued `ensureDeploy`가 declaration timeout을 반환하는 테스트는 현재 해당
     반환값이 없어 RED다.
   - exact subject lookup이 다른 Bead와 다른 merge SHA를 고르지 않고, superseded origin은
     기존 successor/descendant coverage 판정에 넘기며, 선택한 origin operation의 pinned
     `effective_base_sha`와 script identity에서 timeout을 복원하는 테스트를 추가한다.
   - pinned config 부재, script identity 불일치, 잘못된 timeout이
     `repo_operation_timeout_unresolved`를 반환하는 fail-closed 테스트를 추가한다.
2. `server/worker/pr-actions.test.js`
   - 최초 cleanup 한 번이 running evidence에서 곧바로 pending으로 끝나지 않고 terminal
     success 뒤 close하는 테스트는 현재 동작에서 RED다.
   - `repo_operations` cursor와 exact deploy operation을 seed한 boot resume가 fetch를
     다시 호출하지 않고 복원된 declaration timeout으로 terminal success 뒤 closure로
     가는 테스트는 현재 전체 replay 때문에 RED다.
   - 같은 boot-resume wait가 deadline까지 nonterminal이면 `pending`으로 남고
     `cleanup_failed`를 만들지 않는 테스트를 추가한다.
   - terminal failure의 code·fetch 진단·log path가 기존 cleanup failure에 남는 경로도
     함께 고정한다.
3. `server/worker/pr-poller.test.js`
   - `onMerged`가 `action_in_flight`를 반환해도 `cleanup_failed`가 생성되지 않는 테스트는
     현재 일반 실패 기록 때문에 RED다.
   - 다른 `ok=false`는 계속 실패로 기록되는 회귀 테스트를 유지한다.
4. `server/worker/attach.test.js`와
   `server/worker/repo-operation-runner.integration.test.js`
   - startup reconcile → resume → poller 순서와 detached marker 재채택은 이미 존재하는
     기반의 회귀 검증이다. 새 RED seam으로 가장하지 않고 이번 변경과 함께 실행한다.

UI 검증:

```bash
node --version
npm ls --depth=0
npx vitest run server/worker/repo-operation-coordinator.test.js server/worker/pr-actions.test.js server/worker/pr-poller.test.js server/worker/attach.test.js server/worker/repo-operation-runner.integration.test.js
npm run tsc
npm test
npm run lint
npm run prettier:write
git diff --check
```

frontend source는 변경하지 않으므로 bundle을 갱신하지 않는다. exact diff에서 frontend
변경이 생기면 별도 소유 충돌로 멈추고 재판정한다.

### dotfiles-ia4p RED → GREEN seams

1. `tests/repo_ops_deploy_adapter_test.py`
   - active list에서 `beads-ui`가 먼저 와도 다른 running 서비스의 restart·readiness가
     먼저이고 `beads-ui` restart·readiness가 마지막인 테스트는 현재 열거 순서 실행 때문에
     RED다.
   - stopped `beads-ui`를 시작하지 않고, 다른 service failure가 있으면 beads-ui까지
     진행하지 않는 기존 fail-closed 동작을 고정한다.
2. `tests/contracts/test_workflow_contract.py`
   - `restart_operation_adoption` token과 canonical prose의 결속을 확인한다.

dotfiles 검증:

```bash
.venv/bin/python -m pytest tests/repo_ops_deploy_adapter_test.py tests/contracts/test_workflow_contract.py -q
.venv/bin/python src/shared/skills/flow/workflow/scripts/check-workflow-contract.py
.venv/bin/python scripts/render.py
.venv/bin/python scripts/check-rendered.py
scripts/run-tests.sh --tier required
git diff --check
```

## 배포 및 live 검증

### UI-pmfr

1. UI PR을 pinned head로 merge하고 remote containment를 확인한다.
2. fetched previous-base `[deploy]` operation이 terminal success인지 확인한다.
3. `.worktrees/.repo-ops-deploy`가 merged SHA 또는 descendant이며 tracked-clean인지 확인한다.
4. 공유 `beads-ui` 프로세스가 그 durable deploy checkout에서 실행되는지, 선언 포트를
   listen하는지, 기본 HTTP 응답이 성공하는지 확인한다.
5. 재시작을 거친 cleanup 행에 `cleanup_failed`나 새 repair session이 없고 parent가
   closed인지 확인한다.

### dotfiles-ia4p

1. UI-pmfr closed readback 뒤에만 implementation entry를 시작한다.
2. dotfiles PR을 pinned head로 merge하고 remote containment를 확인한다.
3. deploy log에서 다른 running 서비스의 restart/readiness 뒤 `beads-ui`가 마지막으로
   restart/readiness를 통과했는지 확인한다.
4. deploy operation terminal success, deploy worktree HEAD/clean, broken runtime symlink 0을
   확인한다.
5. `projectmgr status beads-ui`, 실제 process checkout, listening port, 기본 HTTP 응답을
   확인하고 cleanup parent close readback까지 마친다.

## 수용 기준

1. deploy가 nonterminal인 동안 cleanup은 기존 running 상태를 유지하고 durable failure나
   repair session을 만들지 않는다.
2. 서비스 재시작 뒤 exact subject operation을 채택할 때 base fetch를 반복하지 않는다.
3. terminal marker exit 0 뒤 child sweep부터 parent close까지 한 번 수렴한다.
4. 실제 terminal failure는 기존 code·진단·log evidence와 함께 실패로 남는다.
5. PR poller의 `action_in_flight`가 `cleanup_failed`로 승격되지 않는다.
6. 새 workflow/queue/UI 상태나 schema가 추가되지 않는다.
7. dotfiles의 모든 다른 running service가 먼저 검증되고 `beads-ui`가 마지막에 재시작된다.
8. 두 저장소의 focused·required 검증과 각 post-merge live 검증이 통과한다.
