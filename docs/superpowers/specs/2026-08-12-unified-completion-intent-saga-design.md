# UI-f17c: 이슈 완료와 repo-level 배포 복구를 분리하는 completion 설계

> **부분 은퇴 (UI-8w4t, 2026-08-27).** `## 9. Repo-level recovery Bead와
> session`(§9.1~9.3)은
> post-merge 완료 자동 AI 수리 레인에 의존하므로 은퇴했다. 그 레인의 제거
> 근거는 `docs/superpowers/specs/2026-08-27-completion-repair-lane-removal-design.md`
> 이며, 나머지 절은 그대로 유효하다.

- 작성일: 2026-08-12
- owning Bead: `UI-f17c`
- route: `full_plan`
- workflow mode: `fast_track`
- provider predecessor: dotfiles `dotfiles-uib7`
- consumer cutover predecessor: beads-ui `UI-lb58`
- contract-retirement predecessor: dotfiles `dotfiles-j8e6`
- relaunch contract: beads-ui `UI-lbqw`

## 1. 배경

`dotfiles-uib7 → UI-lb58 → dotfiles-j8e6`은 배포 authority를 PR별 Worker
effect에서 repo-level external deployment job으로 옮긴다.

- `dotfiles-uib7`은 `repo-deployctl request|status|retry`와 독립
  `repo-deployer` process를 제공한다.
- `UI-lb58`은 verified exact SHA를 desired state로 요청하고 provider status를
  관측하는 Worker consumer와 repo 상단 deployment strip을 제공한다.
- `dotfiles-j8e6`은 managed Adapter, receipt, detached self-restart와 runtime marker
  compatibility를 active 계약에서 제거한다.

기존 `UI-f17c` spec과 plan은 이 선행 체인보다 먼저 작성되어 Worker가 candidate
materialization, managed deploy adapter, restart journal, runtime pointer와 cleanup
receipt까지 직접 소유한다고 가정했다. 선행 체인 이후에는 그 module과 계약이
존재하지 않으므로 기존 문서를 실행할 수 없다.

사용자에게 필요한 결과도 달라졌다. 개별 이슈는 merge, post-merge verify와 durable
deployment request까지 끝나면 배포 process의 장시간 실패와 무관하게 lifecycle을
마감해야 한다. 실제 배포는 저장소 하나의 최신 desired SHA로 coalesce되어 별도로
자동 재시도하고, 반복 실패하면 repo-level recovery session이 복구와 재배포를
끝까지 소유해야 한다.

## 2. 사용자 결과

1. 개별 이슈는 merge, post-merge verify와 exact deployment request readback 뒤
   `closed`가 된다.
2. deployment가 pending, running, failed 또는 recovering이어도 이미 닫힌 이슈를
   다시 열거나 PR 대기로 되돌리지 않는다.
3. 여러 이슈의 merge가 겹치면 latest verified descendant SHA 하나가 저장소 전체
   desired target이 되고 한 번의 배포가 이 merge들을 함께 포함한다.
4. terminal deployment failure는 같은 exact binding으로 두 번 자동 재시도한다.
5. 자동 재시도를 소진하면 repo-level recovery Bead와 fresh recovery session을
   정확히 한 번 만들고, session이 복구 근거를 반환하면 배포를 자동 재개한다.
6. Worker 상단에는 deployment 상태를 기본 한 줄로만 표시한다. 사용자가 그 줄을
   누르면 retry history, recovery session, log와 필요한 action이 펼쳐진다.
7. 자동 recovery가 시작되거나 confirmation이 필요해지면 durable UI 상태와 한 번의
   사용자 알림으로 알려준다.

## 3. 목표

1. issue completion lifecycle과 repository deployment lifecycle의 authority를
   분리한다.
2. individual issue close를 durable `requestDeployment()` acceptance/readback에
   결합하고 provider terminal success와 분리한다.
3. repo별 deployment retry와 recovery를 restart-safe한 하나의 coordinator로
   직렬화한다.
4. external deployer만 materialize, install, activate, restart와 live readback effect를
   실행하게 한다.
5. retry budget, recovery Bead/session, repair PR, confirmation과 deployment resumption을
   exact repo/base/SHA/generation/failure identity에 결합한다.
6. 현재 Worker control-tower의 toolbar, token, font, chip, lane density를 유지하는
   compact disclosure UI를 제공한다.
7. managed deploy active reader/writer를 되살리지 않고 final external deployment
   contract만 소비한다.

## 4. 비목표

- external `repo-deployer` process나 `repo-deployctl` provider contract 재구현
- `workspace|managed` Adapter, receipt, restart journal, runtime marker 복원
- issue별 deploy button 또는 issue별 deployment execution
- 배포 실패 때문에 closed Bead를 reopen하거나 기존 PR을 다시 여는 동작
- recovery session이 provider status를 직접 쓰거나 deployment success를 선언하는 동작
- credential 생성·회전·폐기 또는 secret 값 표시·복사·저장
- broad permission 변경, `sudo`, `chown` 또는 추측성 external-effect 반복
- historical specs/plans와 inert managed state file 삭제
- 여러 environment 또는 여러 deploy target UI
- `dotfiles-3vb8` 하나를 위한 managed receipt/pointer migration

## 5. 선행 조건과 issue 경계

implementation entry 전에 다음을 모두 authoritative readback한다.

1. `dotfiles-uib7`이 `closed`이고 installed `repo-deployctl`과 `repo-deployer`
   process가 live다.
2. `UI-lb58`이 `closed`이며 external deployment job consumer, compact repo status
   projection, simplified `[deploy]` declaration과 exact-SHA live cutover가 landed됐다.
3. `dotfiles-j8e6`이 `closed`이고 installed Workflow Contract와 runtime이 automatic
   external deployment job 하나만 설명한다.
4. `repo-deployctl status --repo <beads-ui> --json`의 repo/base/SHA/generation binding을
   읽을 수 있다.
5. shared beads-ui runtime의 process path, port, HTTP `/healthz.runtime` readback이
   provider status와 일치한다.

위 조건이 하나라도 false면 `UI-f17c` parent를 claim하거나 phase child/worktree를
만들지 않는다. 구현 base는 세 predecessor가 포함된 fetched `origin/main` SHA다.

이 spec은 `UI-lb58`의 external deployment Interface를 유지하면서 completion boundary를
후속 변경한다. `UI-lb58`에서 deployment success 뒤에 놓였던 `child_sweep →
branch_cleanup → parent_close`를 durable deployment request readback 뒤로 옮긴다.

## 6. Authority와 lifecycle

### 6.1 개별 issue completion

root completion intent는 다음 경계까지만 개별 이슈를 소유한다.

```text
PR merge(M)
  → target-base sync
  → latest verified candidate D, M ancestor of D
  → detached post-merge verify(D)
  → requestDeployment(repo, base, D)
  → accepted|noop + exact status binding readback
  → record merge floor M / target D / generation G
  → child sweep
  → branch cleanup
  → Parent Bead close
  → Done
```

`requestDeployment()` command가 실패하거나 returned/status binding이 malformed,
wrong-repo, wrong-base, wrong-SHA 또는 wrong-generation이면 request가 durable하지
않으므로 이슈를 닫지 않는다. 같은 operation identity로 authoritative status를 먼저
읽고 `applied|not_applied|unknown`에 따라 adopt, retry, confirmation 중 하나로
수렴한다.

정상 `accepted|noop`과 matching status를 기록한 뒤 provider가 `pending`, `running`,
`failed` 또는 `recovering`이 되어도 issue close를 되돌리지 않는다. issue의 Done row는
`deployment requested · generation G`를 audit meta로 표시할 수 있지만 deploy action을
소유하지 않는다.

### 6.2 repository deployment

repo-level deployment coordinator는 workspace의 canonical repo key별로 정확히 하나다.
이 coordinator만 provider observation, automatic retry budget, recovery lifecycle과
UI projection의 다음 state를 결정한다.

external deployer는 다음 effect의 유일한 owner다.

- exact candidate release materialization
- candidate `[deploy].cmd` 실행
- install, pointer activation, restart와 live health readback
- terminal provider status write

Worker coordinator는 `repo-deployctl request|status|retry --json`만 사용하고 provider
state file, release directory, process lock 또는 service marker를 직접 읽거나 쓰지
않는다.

### 6.3 lifecycle 분리

| lifecycle | terminal boundary | terminal 뒤 동작 |
| --- | --- | --- |
| issue completion | deployment request binding 기록과 cleanup/close | deployment failure로 reopen하지 않음 |
| repository deployment | terminal `succeeded`와 exact live readback | deployed SHA와 history 유지 |
| recovery operation | retry adoption 또는 repair PR/new desired handoff | provider observation으로 복귀 |

repo deployment는 execution slot과 browser subscriber를 점유하지 않는다. pending,
running, retrying, recovering 또는 confirmation state 자체가 poller demand이며 server
restart 뒤에도 observation과 recovery를 재개한다.

## 7. Durable deployment recovery state

`queue.json`의 repo deployment record는 provider observation과 Worker-owned recovery를
구분한다. 구현 시 landed `UI-lb58` schema의 실제 key/path를 사용하되 semantic shape는
다음과 같다.

```js
{
  repo,
  target_base,
  target_sha,
  generation,
  provider: {
    state: 'idle' | 'pending' | 'running' | 'succeeded' | 'failed',
    deployed_sha,
    error_code,
    log_path
  },
  automatic_retry_count,
  automatic_retry_limit: 2,
  failure_key,
  recovery: null | {
    operation_id,
    status:
      'prepared' |
      'running' |
      'waiting_repair_pr' |
      'awaiting_confirmation' |
      'retrying' |
      'completed',
    recovery_bead_id,
    attempt_id,
    repair_pr_url,
    outcome,
    confirmation
  },
  updated_at
}
```

`failure_key`는 다음 exact identity를 가진다.

```text
canonical repo + target base + target SHA + generation
  + provider error code + bounded log digest
```

같은 failure가 poll/restart마다 새 budget이나 operation을 만들지 않는다. higher valid
generation이 도착하면 old generation recovery는 `superseded` evidence로 정산하고 새
generation에 독립 budget을 부여한다. 더 낮거나 divergent generation은 adoption,
retry, coverage, UI success에 사용하지 않는다.

## 8. Automatic retry

matching terminal `failed`를 관측하면 coordinator는 다음 순서로 처리한다.

1. provider response의 repo/base/SHA/generation이 current desired와 정확히 일치하는지
   확인한다.
2. malformed/wrong-binding이면 effect를 내지 않고 `awaiting_confirmation`으로
   fail closed한다.
3. 같은 failure key에 nonterminal retry/recovery operation이 있으면 adopt한다.
4. automatic retry count가 2보다 작으면 operation을 prerecord한 뒤
   `retryDeployment(repo)`를 호출한다.
5. returned generation과 status binding을 즉시 readback한다.
6. 첫 retry는 30초, 두 번째 retry는 120초의 durable `next_retry_at` 뒤 실행한다.
7. server restart는 남은 deadline과 같은 operation identity를 복원하며 count를
   reset하지 않는다.
8. count 2를 소진한 matching failure만 recovery creation으로 넘어간다.

`repo-deployctl` 자체의 crash replay는 provider-owned same-generation behavior다.
Worker automatic retry는 terminal failed generation을 새 retry generation으로 전환하는
control operation이며 둘을 한 budget으로 섞지 않는다.

## 9. Repo-level recovery Bead와 session

> **은퇴 (UI-8w4t).** 이 절은 실행되지 않는다 — 근거는
> `docs/superpowers/specs/2026-08-27-completion-repair-lane-removal-design.md`
> 이다.

### 9.1 identity와 creation

자동 retry 소진 뒤 recovery Bead identity는 `(repo, generation, failure_key)`의 stable
digest로 만든다. 같은 failure를 여러 이슈가 포함하거나 server가 재시작해도 한
Bead/session만 존재한다.

- type: `bug`
- priority: `1`
- title: `<repo> 배포 실패 자동복구`
- description source: `repo-deployment:<canonical-repo>@generation:<G>`
- provenance: source Bead가 없는 repo-level operation이므로 no-source provenance를
  description에 기록한다.
- route는 creation 시 추측해 pin하지 않는다.

creation prerecord, `bd create`, authoritative `bd show`, queue binding과 session dispatch는
각 crash window에서 같은 operation을 adopt한다. duplicate Bead, worktree, attempt와 retry
budget 소비를 금지한다.

### 9.2 launch와 `UI-lbqw` 정합

최초 `dispatch_repair`는 truly fresh recovery Bead dispatch다.

- current recovery Bead preset > workspace default preset을 해석한다.
- fresh recovery Bead worktree를 만들고 current runner/model/effort/speed를 stamp한다.
- prior provider transcript나 closed issue worktree를 resume하지 않는다.

같은 recovery attempt를 수동 또는 restart recovery로 이어갈 때만 `UI-lbqw`의
current-preset continuation resolver를 사용한다. same runner는 current tuple로 existing
session을 resume하고 runner mismatch는 `prior_session|fresh_current|cancel`의 structured
decision을 요구한다. `dispatch_repair`를 same-worktree relaunch로 재분류하지 않는다.

### 9.3 recovery outcome

recovery session은 다음 bounded structured outcome 하나를 기록한다.

| outcome | coordinator action |
| --- | --- |
| `retry_same` | exact environment/service repair evidence를 확인하고 same desired binding을 retry |
| `repair_pr_open` | recovery Bead/PR을 기존 merge driver로 진행하고 merged descendant를 new desired로 request |
| `awaiting_confirmation` | credential, broad permission, ambiguous external effect를 사용자에게 인계 |
| `unrecoverable` | evidence와 reason을 보존하고 repo strip을 `확인 필요`로 유지 |

session은 `repo-deployctl` state file을 직접 쓰거나 success를 선언하지 않는다.
`retry_same`도 coordinator의 exact status readback 뒤에만 실행된다. code/config 수정은
failed exact SHA를 변조하지 않고 recovery PR의 새 commit을 기존 merge driver로 land한
뒤 latest desired generation으로 coalesce한다.

## 10. UI와 사용자 알림

### 10.1 compact strip

Worker desktop toolbar/KPI 바로 아래, lane row 바로 위에 repo deployment strip 하나를
둔다. current control-tower의 `tokens.css`, flat panel, chip, mono SHA, font scale과
6–10px spacing을 그대로 사용한다. sidebar, dashboard card 또는 별도 visual vocabulary를
추가하지 않는다.

기본 collapsed 한 줄은 다음만 표시한다.

- semantic dot와 primary state: `배포 대기|배포 중|재시도 N/2|복구 중|확인 필요|배포 완료`
- repo name
- desired short SHA
- 짧은 현재 설명
- 포함된 merge count
- disclosure caret

`idle`에서 desired가 한 번도 없으면 strip을 생략한다. `succeeded`는 current deployed SHA를
한 줄로 유지한다. nonterminal 또는 failure/recovery state는 항상 표시한다.

### 10.2 expanded detail

strip click은 같은 위치에서 아래 detail을 펼친다. expansion state는 browser-local이며
deployment authority가 아니다.

왼쪽에는 request, provider attempt, automatic retry와 recovery transition의 bounded
timeline을 표시한다. 오른쪽에는 recovery Bead/session ID, runner/model/effort, attempt,
최근 sanitized update를 표시한다.

action visibility는 다음과 같다.

- automatic pending/running/retrying: log와 session view만 표시
- recovering: `세션 보기`, `배포 로그`
- automatic path가 terminal/confirmation으로 멈춤: `지금 재시도`, `복구 이어가기`,
  필요한 confirmation action만 표시
- issue/PR별 deploy action: 없음

### 10.3 notification

`automatic retry exhausted → recovery prepared`, `recovery running →
awaiting_confirmation`, `recovery → deployment succeeded` 전환마다 queue revision에 묶인
durable notification key를 기록한다. browser toast는 같은 key를 session당 한 번만
표시하며 reconnect/restart가 duplicate toast를 만들지 않는다. strip은 durable state를
항상 표시하므로 toast delivery 실패가 lifecycle을 막지 않는다.

## 11. 오류와 convergence

| 관측 | 처리 |
| --- | --- |
| request command timeout + applied readback | generation을 adopt하고 issue cleanup/close 진행 |
| request command timeout + not-applied readback | 같은 operation identity로 request retry |
| request result unknown | issue close 금지, confirmation |
| provider pending/running | poller demand 유지, issue는 이미 closed 가능 |
| matching provider failed, retry budget 남음 | durable backoff 뒤 automatic retry |
| matching provider failed, retry budget 소진 | one recovery Bead/session dispatch |
| newer valid desired generation | old recovery supersede, latest generation 관측 |
| malformed/wrong provider binding | retry/close/coverage 금지, confirmation |
| environment/service repair | evidence 소비 뒤 same desired retry |
| code/config regression | recovery PR merge, descendant desired request |
| credential/permission/ambiguous effect | mutation 없이 confirmation |
| recovery session crash | same operation/attempt/worktree/session adopt |
| recovery output malformed | success 추측 금지, `확인 필요` |

같은 failure key의 automatic retry, Bead create, session spawn, repair PR, provider request,
close와 notification은 logical exactly-once다. authoritative readback 없는 물리 effect
횟수를 추측하지 않는다.

## 12. Migration과 rollout

1. 세 predecessor의 close, installed external contract와 live runtime readback을 확인한다.
2. landed `UI-lb58` deployment schema와 active module/file names를 readback하고 이 spec의
   logical fields를 실제 seam에 mapping한다.
3. old managed reader/writer identifier가 active beads-ui source에서 0인지 선행 checker로
   확인한다.
4. existing repo deployment row에 retry/recovery field를 additive normalize한다.
5. current matching provider status가 `succeeded`면 새 recovery를 만들지 않는다.
6. current matching provider status가 `failed`면 기존 generation과 failure evidence를
   보존한 채 automatic retry count 0에서 새 policy를 시작한다.
7. old managed reconcile, receipt, runtime pointer와 `dotfiles-3vb8` 전용 partial release를
   읽는 compatibility를 추가하지 않는다. 그 migration은 `UI-lb58` cutover 이전 책임이다.
8. 한 PR에서 issue close boundary, deployment recovery coordinator, compact UI와 tests를
   land한다.
9. post-merge external deployment job이 `UI-f17c` merged SHA를 desired로 받아 provider
   `succeeded`와 live `/healthz.runtime` exact SHA/path를 기록하는지 확인한다.

중간 failure는 recoverable하다. request가 durable한 issue는 닫힌 상태를 유지하고 repo
deployment row가 남은 retry/recovery를 계속 소유한다. request가 durable하지 않은 issue는
닫지 않는다.

## 13. Test scope

### RED-GREEN seam 1 — issue completion boundary

- `accepted|noop` + matching status binding 뒤 provider가 pending이어도 child/branch/Parent
  cleanup과 close가 끝난다.
- provider terminal failed가 closed Bead를 reopen하거나 PR 대기로 되돌리지 않는다.
- request failure, malformed/wrong binding과 unknown outcome은 close하지 않는다.
- two merge floors가 같은 desired generation을 기록하고 서로 독립적으로 close된다.

### RED-GREEN seam 2 — automatic retry

- matching failed generation은 durable 30s/120s backoff로 정확히 두 번 retry한다.
- restart, repeated poll과 duplicate status가 retry count/generation을 중복 증가시키지 않는다.
- higher generation은 old retry를 supersede하고 lower/divergent binding은 fail closed한다.
- malformed provider response는 retry effect 0회다.

### RED-GREEN seam 3 — recovery Bead와 session

- retry 소진 시 stable identity의 recovery Bead/worktree/attempt가 정확히 하나 생긴다.
- create prerecord, `bd create`, readback, queue bind, spawn 각 crash point에서 duplicate가 없다.
- fresh `dispatch_repair`와 repeated recovery continuation이 `UI-lbqw` 계약에 맞는
  cwd/session/current-preset semantics을 사용한다.
- recovery session 시작이 durable strip state와 one-shot toast에 표시된다.

### RED-GREEN seam 4 — recovery outcome

- `retry_same`은 coordinator readback 뒤 same desired retry로 이어진다.
- `repair_pr_open`은 recovery PR merge, descendant desired request와 provider observation으로
  이어진다.
- credential, broad permission, ambiguous effect와 malformed outcome은 confirmation 전
  mutation 0회다.
- recovery session crash/restart가 budget, Bead, attempt, PR, retry를 중복하지 않는다.

### RED-GREEN seam 5 — compact current-UI projection

- Worker toolbar와 lanes 사이에 collapsed one-line strip이 렌더된다.
- click/keyboard disclosure가 timeline, session, logs와 context-valid action만 펼친다.
- issue/PR별 deploy button은 없다.
- current `tokens.css`, control-tower density와 responsive layout을 재사용한다.
- reconnect/restart 뒤 durable state는 유지되고 browser-local expansion과 toast dedupe가
  authority에 영향을 주지 않는다.

### RED-GREEN seam 6 — repo-level E2E

- 두 issue가 merge/request/close된 뒤 coalesced desired SHA 하나가 배포된다.
- provider fail → auto retry 2회 → recovery session → environment repair → retry → success를
  추가 click 없이 완주한다.
- code/config failure는 recovery PR merge와 newer desired success로 완주한다.
- crash를 request, retry, recovery create/spawn, outcome consume, repair merge와 success
  observation 사이에 주입해 duplicate logical effect가 0회인지 검증한다.

### Regression과 완료 검증

- focused Worker/provider/recovery/UI tests
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`
- `npm run all`
- generated `app/main.bundle.js`와 map 포함
- active managed reader/writer scan 0
- external provider status와 live process path/port/HTTP `/healthz.runtime` exact SHA/path readback

## 14. Post-merge continuity와 Worker eligibility

모든 beads-ui code와 UI 변경은 현재 `UI-f17c` PR에 포함된다. merge 후 배포는 predecessor가
land한 `docs/agents/repo-ops.toml [deploy]` external job declaration이 운반한다. repo-level
recovery Bead/PR은 runtime failure 때 생성되는 product behavior이며 current session의
required no-PR residue가 아니다.

따라서 `UI-f17c`에는 required no-PR residue가 없고 `worker-ineligible` label은 없어야 한다.
post-merge provider status가 pending/failed인 동안 Bead는 product policy에 따라 이미 닫힐 수
있지만 controller 완료 보고는 `issue_closed`와 `deployment_pending|recovering|succeeded`를
구분한다. 실제 shared runtime 검증 전에는 “배포까지 완료”라고 선언하지 않는다.

## 15. Acceptance criteria

1. `dotfiles-uib7 → UI-lb58 → dotfiles-j8e6` close와 final external deployment contract
   readback 뒤에만 구현을 시작한다.
2. individual issue는 deployment request acceptance/readback 뒤 close되고 later provider
   failure로 reopen되지 않는다.
3. multiple merge floor가 latest desired SHA로 coalesce되며 issue close와 deployment
   execution이 서로 slot/authority를 점유하지 않는다.
4. matching terminal failure는 durable retry budget으로 정확히 두 번 자동 재시도한다.
5. retry 소진 뒤 repo-level recovery Bead와 fresh session이 한 번 생성되고 UI가 그 사실을
   알린다.
6. recovery outcome이 same-SHA retry 또는 repair PR/new desired로 이어져 external provider
   success까지 자동 수렴한다.
7. sensitive/ambiguous mutation은 confirmation 없이 실행되지 않고 secret이 queue/log/UI/Bead에
   남지 않는다.
8. Worker 상단은 current UI에 맞는 compact collapsed strip 하나만 보이고 click 시에만 상세
   history/session/action을 표시한다.
9. managed Adapter/reconciler/receipt/journal/runtime-marker active reader/writer가 다시 생기지
   않는다.
10. crash/restart matrix에서 duplicate retry, Bead, session, PR, request, close와 notification이
    없다.
11. full validation과 frontend build가 green이며 generated bundle/map이 포함된다.
12. `UI-f17c` merge SHA가 external provider `succeeded`와 shared runtime exact
    process/path/SHA/HTTP readback에 정합한다.
