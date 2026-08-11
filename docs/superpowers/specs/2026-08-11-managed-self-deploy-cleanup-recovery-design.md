# AI 정리 제거와 managed self deploy 자동복구 설계

## 상태

- 사용자 설계 승인: 2026-08-11
- owning Bead: `UI-ckgr`
- 원인 incidents: `UI-yup9`, `UI-309b`, External/beads `beads-1nj`
- 선행 provider: `UI-16ep` / PR #118 (closed·merged)
- 선행 consumer: dotfiles `dotfiles-we2r`
- 독립 consumer: External/beads `beads-loy`

## 문제

세 incident의 PR merge와 pinned post-merge verify는 성공했지만 cleanup은 모두
`deploy:deploy_base_not_synced`, detail `checkout_dirty`에서 멈췄다. 현재 workspace
Adapter의 `syncBase`는 사용자 작업을 보존하기 위해 dirty checkout을 fetch-only 성공으로
취급하지만, `runDeploy`는 실제 command가 읽을 shared checkout을 target branch·clean·exact
verified SHA로 다시 요구한다. 이 guard를 없애면 검증하지 않은 uncommitted/untracked bytes나
local-only commit을 배포할 수 있다.

UI의 `[AI 정리]`는 이 문제를 해결하지 못한다. client가 보내는
`worker-cleanup-diagnose`는 `app/protocol.js`의 `MESSAGE_TYPES`에 없어서 `app/ws.js`에서
전송 전에 거부되고, 상위 transport가 오류를 빈 응답으로 삼아 버튼이 아무 동작도 하지 않는
것처럼 보인다. server 쪽 diagnosis session도 실행되더라도 failure를
flake/environment/regression으로 분류하고 bounded cleanup retry를 지시할 뿐
`checkout_dirty`를 안전하게 복구하지 않는다.

한편 `UI-x9tu`가 구현한 `completion-intent`는 이미 저장소가 고칠 수 있는 tracked
code/config regression을 bounded Codex/Claude session과 repair PR로 복구한다.
`deploy_base_not_synced`는 사용자 shared checkout의 소유권 문제이므로 의도적으로 즉시 사람
인계 allowlist에 남아 있다. generic diagnosis를 고치는 대신, 배포 입력을 exact managed
release로 옮기고 기존 code-repair coordinator의 경계를 유지한다.

## 사용자 결과

1. cleanup failure banner에 동작하지 않는 `[AI 정리]`가 나타나지 않는다.
2. beads-ui merge 후 deploy는 shared `main`의 dirt·branch·HEAD와 무관하게 verified candidate
   release에서 실행된다.
3. self restart 뒤 새 server가 exact candidate에서 실행 중임을 확인한 뒤 동일 reconcile과
   cleanup을 자동 재개한다.
4. 실제 tracked regression만 기존 completion intent가 같은 issue session 또는 linked repair
   session/PR로 고친다.
5. 자동 복구가 끝난 terminal failure에는 실제 시도 횟수·stage·evidence와 기존 `[정리]`
   재시도 경로만 남는다.

## 목표

1. `[AI 정리]`의 UI, WebSocket, scheduler dispatch, runner prompt surface를 제거한다.
2. legacy queue의 diagnosis record를 손실 없이 읽되 새 diagnosis attempt는 만들거나 resume하지
   않는다.
3. beads-ui self deploy를 existing managed Adapter protocol v1에 맞는 candidate-local Adapter로
   전환한다.
4. restart를 process termination이 아니라 durable handoff로 취급해 새 server가 exact receipt를
   완성한다.
5. operational reconcile과 code-repair session의 failure ownership을 섞지 않는다.
6. 자동 retry 문구를 실제 durable retry state와 일치시킨다.

## 비목표

- shared checkout 자동 stash/reset/clean/checkout/commit
- `deploy_base_not_synced`를 completion repair allowlist에 추가
- 이미 merged된 source branch/session을 다시 열어 같은 PR을 재머지
- credentials, launchd/projectmgr 권한, 외부 서비스 장애를 agent가 수정
- generic AI diagnosis 버튼을 다른 이름으로 그대로 복원
- managed release GC 또는 rollback UI
- External/beads Adapter 구현(`beads-loy`가 소유)

## 핵심 불변식

1. **verify/deploy 동일 SHA**: receipt의 deployment source와 runtime readback은 Reconciler가
   verify한 candidate `D`와 같다.
2. **shared checkout 무변경**: managed Adapter는 source repo를 fetch, checkout, reset, stash,
   clean하거나 status 기반 배포 입력으로 사용하지 않는다.
3. **effect 전 journal**: pointer 전진과 restart launch 전에 attempt-bound handoff state를
   원자적으로 기록한다.
4. **success 전 readback**: 새 process의 source path·HEAD·PID와 health가 `D`에 bind되기 전에는
   terminal success receipt와 Parent close가 없다.
5. **merge 권한 단일화**: repair PR도 기존 merge driver만 merge하며 agent는 push/PR 제출까지만
   수행한다.
6. **코드 복구 예산 유지**: completion repair 총 2회 cap과 conflict/flake retry budget은 서로
   섞이지 않는다.

## Architecture

### 1. AI 정리 active surface retirement

다음 active path를 끝에서 끝까지 제거한다.

- Worker/Board cleanup failure의 `[AI 정리]` button, pending state, diagnosis result projection
- `worker-cleanup-diagnose` dispatch와 revision-CAS handler
- attach/scheduler의 diagnosis prompt, parse, settle, retry callback
- Claude/Codex runner의 `cleanup_diagnosis` launch flag와 preamble 분기

기존 merged card의 `[정리]` action은 유지한다. 이 action은 AI session이 아니라
`pr-actions.retryCleanup`으로 동일 cleanup/Reconciler를 처음부터 재실행하는 수동 recovery다.
auto-merge completion intent와 conflict resolution도 변경하지 않는다.

`queue.json.cleanup_failed[*].diagnosis`와 attempt의 `cleanup_diagnosis` field는 historical-read
compatibility로 normalize·serialize한다. UI와 새 policy는 이를 authority로 사용하지 않는다.
legacy diagnosis attempt는 다음처럼 처리한다.

- terminal record: 보존만 하고 후속 effect를 만들지 않는다.
- running/paused record가 실제 process/session과 일치하면 자연 settlement까지만 관측한다.
- process가 없는 legacy record: `legacy_cleanup_diagnosis_retired` evidence로 orphan 정산하고
  cleanup retry, repair budget, 새 resume를 시작하지 않는다.

새 active writer가 diagnosis field를 추가하거나 `cleanup_diagnosis=true` attempt를 만드는 것은
금지한다. schema field 삭제와 old queue rewrite는 하지 않는다.

### 2. dotfiles runtime-source prerequisite

`dotfiles-we2r`는 installed `bdui-shared serve`에 다음 source 선택 계약을 먼저 배포한다.

1. explicit non-empty `BDUI_REPO_DIR`
2. `$XDG_DATA_HOME/bdui/runtime/beads-ui/current`
3. pointer가 없을 때만 기존 shared checkout

pointer가 존재하지만 invalid/dangling/escape/missing dependency이면 fallback하지 않고 fail
closed한다. dotfiles는 source 선택만 소유하고 pointer 전진, restart, runtime marker, receipt는
이 Bead가 소유한다. `UI-ckgr`는 `dotfiles-we2r`에 foreign `blocks` dependency를 가진다.

### 3. Candidate-local self deploy Adapter

`docs/agents/repo-ops.toml`은 선행 dotfiles unit이 closed·installed 된 뒤 다음 managed
declaration으로 전환한다.

```toml
[deploy]
adapter = "managed"
cmd = ["scripts/managed-self-deploy.js"]
timeout_ms = 600000
```

`detached=true`는 선언하지 않는다. Reconciler는 기존 protocol v1 env와 exact candidate release
cwd로 Adapter를 실행한다. Adapter는 다음을 수행한다.

1. protocol env, repo/remote/base/floor/candidate/attempt, release containment, `HEAD == D`, clean
   tracked status를 다시 확인한다.
2. candidate `package-lock.json`으로 `npm ci --omit=dev`를 실행한다. `node_modules`는 ignored
   runtime artifact이며 install marker와 lockfile digest를 readback한다.
3. attempt-bound self-deploy journal을 worker state root에 `prepared`로 원자 기록한다.
4. data home의 `bdui/runtime/beads-ui/current` symlink를 임시 link + atomic rename으로 exact
   release `D`에 전진시키고 target containment를 다시 읽는다.
5. journal을 `restart_launched`로 전진시킨 뒤 `bdui-shared restart`를 별도 process group으로
   detached spawn한다. Adapter parent는 terminal success나 receipt 없이 종료하지 않고 old
   server termination을 기다린다.

Adapter의 stdout은 authority가 아니다. journal은 protocol version, attempt, candidate, release,
pointer target, restart child PID/start time, stage와 last error만 비-secret 값으로 보존한다.
같은 attempt의 재호출은 live helper PID와 runtime marker를 먼저 읽고 중복 restart를 만들지
않는다. helper가 사라지고 runtime이 아직 `D`가 아니면 Reconciler의 기존 retryable adapter
timeout budget 안에서만 새 launch를 허용한다.

### 4. Runtime identity와 restart 후 resume

server는 listen 완료 뒤 `$XDG_STATE_HOME/bdui/runtime/beads-ui.json`을 mode `0600`으로 atomic
write한다. marker는 다음 exact readback만 가진다.

- protocol version, PID, started timestamp
- `server/index.js`에서 계산한 source repo realpath
- source `git rev-parse HEAD` 40-hex SHA
- bound host/port와 health path

secret, 전체 environment, workspace path 목록은 기록하지 않는다. marker의 source는 process cwd가
아니라 실행 중인 module path에서 계산한다.

restart된 candidate server는 startup에서 기존 nonterminal reconcile을 발견한다. 같은 Adapter를
재호출했을 때 journal의 candidate/attempt와 runtime marker가 모두 `D`에 bind되고 `/healthz`가
성공하면 Adapter가 protocol v1 terminal receipt를 worker-owned path에 atomic write한다.
receipt action outcomes는 dependency install, pointer cutover, restart handoff, exact runtime
readback을 포함한다. Reconciler는 기존 validator로 receipt를 수락하고 child sweep, branch
cleanup, Parent close를 이어간다.

new server가 이미 `D`에서 실행 중이면 restart를 다시 호출하지 않는다. receipt rename 전 crash는
같은 runtime readback으로 receipt만 복구한다. marker가 old SHA, PID 불일치, health red, pointer
escape이면 success를 쓰지 않는다.

### 5. Failure ownership과 자동 세션

두 복구 machine의 경계는 유지한다.

| failure | owner | action |
|---|---|---|
| release fetch/materialize/spawn timeout | Deployment Reconciler | same candidate/attempt bounded retry |
| pointer/helper transient failure | self Adapter + Reconciler | journal reconcile, existing retry budget |
| runtime source/SHA/health mismatch | Deployment Reconciler | terminal evidence, deploy 금지/close 금지 |
| tracked deploy declaration/Adapter code regression | completion intent | merged-base linked repair Bead/session/PR |
| pre-merge PR-owned verify/CI regression | completion intent | same issue latest session resume |
| post-merge/base-owned verify regression | completion intent | fresh linked repair Bead/session/PR |
| legacy workspace `checkout_dirty` | manual migration boundary | guard 유지, shared checkout 자동 변경 금지 |
| credentials/ownership ambiguity/external service | human terminal | evidence 보존 |

이미 merge된 root는 원 session/branch를 resume하거나 같은 PR을 재머지하지 않는다. linked repair
PR merge 뒤 root의 기존 `runCleanup` 전체를 다시 실행한다. `deploy_base_not_synced`는 repair
allowlist에 추가하지 않는다.

## 상태와 UI

- `[AI 정리]`, diagnosis spinner/result/chip을 제거한다.
- managed progress는 기존 `정리 중 · 검증`, `정리 중 · 배포`, `정리 중 · readback`을 사용한다.
- self handoff 중에는 `정리 중 · 재시작`을 durable reconcile/journal projection으로 표시한다.
- failure banner는 실제 `cleanup_failed.step/reason/detail`, log path와 Reconciler retry count를
  표시한다.
- `1회 자동 재시도 후 실패` 문구는 post-merge verify의 실제 bounded retry가 소비됐을 때만
  쓴다. deploy retry count가 0이면 재시도했다고 말하지 않는다.
- terminal merged card의 기존 `[정리]` action은 full cleanup replay로 남긴다.
- managed lane에서 legacy checkout guard detail은 새 failure로 생성되지 않는다.

## Rollout

1. dotfiles `dotfiles-we2r`가 managed `repo-deploy`와 pointer-aware `bdui-shared`를 land·install하고
   exact receipt로 close한다.
2. `UI-ckgr`는 AI cleanup active surface, self Adapter, runtime marker/readback, declaration과
   tests를 한 candidate에 포함한다.
3. 현재 active server의 landed `UI-16ep` Reconciler가 candidate-local Adapter를 실행한다.
4. Adapter가 dependencies와 pointer를 준비하고 installed `bdui-shared restart`를 handoff한다.
5. candidate server가 marker·health를 기록하고 startup reconcile로 receipt와 cleanup을 끝낸다.
6. process path, source SHA, port, `/healthz`, receipt digest, Parent `closed`, shared checkout
   HEAD/status 불변을 live readback한다.

dotfiles 선행 unit이 installed 되지 않았으면 declaration을 merge하지 않는다. 첫 self cutover가
실패해 shared service가 뜨지 않으면 pointer target과 launchd log를 보존하고 operator가 pointer를
임의로 shared checkout으로 돌리는 rollback은 별도 명시 승인 없이 수행하지 않는다.

## Test scope

### RED-GREEN seams

1. AI cleanup retirement
   - Worker/Board render에 diagnosis action/result가 없고 merged `[정리]` retry는 남는다.
   - `worker-cleanup-diagnose` route/handler/scheduler dispatch가 없다.
   - legacy diagnosis fields를 가진 queue가 손실 없이 load/save되며 새 attempt를 만들지 않는다.
   - missing-process legacy attempt가 orphan evidence로 정산되고 cleanup retry를 호출하지 않는다.
2. self Adapter unit
   - invalid env/floor/release/HEAD/containment에서 pointer·journal·receipt 무변경.
   - exact lockfile install 뒤 pointer atomic cutover와 `restart_launched` prerecord.
   - 같은 attempt/helper가 살아 있을 때 duplicate restart 없음.
   - exact runtime marker+health에서 receipt complete, old SHA/PID/path/health red에서 거부.
3. restart reconciliation
   - adapter launch 직후 old server termination을 주입하고 새 store/Reconciler가 기존 attempt를
     receipt로 recover한다.
   - pointer 전진/receipt 전 crash, restart 후/receipt rename 전 crash가 budget reset이나
     duplicate close 없이 수렴한다.
   - dirty/feature shared checkout의 HEAD/status가 처음부터 끝까지 불변이다.
4. completion ownership regression
   - tracked Adapter failure만 existing `deploy_failed` linked repair로 들어간다.
   - `deploy_base_not_synced`와 pointer/runtime identity failure는 repair session을 만들지 않는다.

### Verification bundle

- focused Adapter/runtime marker/Reconciler/queue/scheduler/UI tests
- real-git + fake projectmgr restart integration fixture
- `npm run tsc`
- `npm run lint`
- `npm run prettier:write`
- `npm test`
- `npm run build`
- `npm run all`

## Acceptance criteria

1. `[AI 정리]` active surface가 UI부터 runner까지 제거되고 old queue record는 계속 열린다.
2. `worker-cleanup-diagnose`가 client/server public action으로 남지 않는다.
3. beads-ui self deploy가 exact managed candidate release에서 실행되고 shared checkout은 읽기
   편의 source 외에 deployment authority가 아니다.
4. restart 뒤 새 process source realpath와 SHA가 candidate `D`에 정확히 bind된 receipt가
   있어야 cleanup과 Parent close가 진행된다.
5. duplicate restart, duplicate receipt consume, retry budget reset이 crash/restart fixture에서 없다.
6. 실제 code/config regression만 기존 bounded Codex/Claude repair session을 사용한다.
7. retry 안내 문구가 durable retry count와 일치한다.
8. live rollout에서 process path, port, HTTP, candidate SHA, receipt, Parent close와 shared checkout
   불변을 모두 확인한다.
