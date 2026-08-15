# repo-ops verify authority 단일화 (UI-wv97)

## 1. 배경

Worker의 repository operation 계약은 fetched target-base SHA의
`repo-ops/config.toml`이 소유한다. 그러나 현재 pre-merge verify에는 별도의
`~/.config/bdui/config.toml [worker.verify."<workspace>"]` 경로가 남아 있다.
`server/config.js`가 홈 설정을 파싱하고, poller·auto-merge·WebSocket·click-time
gate가 그 값을 직접 읽는다. 반면 click-time gate 일부와 post-merge cleanup은 이미
`RepoOpsResolver`와 `RepoOperationCoordinator`를 사용한다.

이 이중 경로는 같은 PR을 서로 다른 정책으로 판정하고, poller의 legacy command와
RepoOperation verify가 병렬 실행될 수 있게 한다. 또한 UI가 저장소 declaration이
없을 때 홈 설정을 fallback으로 보여 주므로, 실제 authority가 사용자에게도
불분명하다.

## 2. 목표와 비목표

목표는 verify의 active authority를 `repo-ops/config.toml` 하나로 제한하고 모든
pre-merge 소비자가 같은 pinned resolution과 같은 durable RepoOperation receipt를
사용하게 하는 것이다.

- config 또는 `[verify]`가 없으면 verify는 **OFF**다. process, receipt, failure를
  만들지 않는다.
- config·script identity·mode·timeout을 해석할 수 없으면 **fail-closed**다.
- `[verify]`가 있으면 fetched previous target-base SHA의 executable blob만 후보 tree를
  검증한다. PR이 자기 command를 정의할 수 없다.
- poller와 click-time gate가 겹쳐도 하나의 deterministic operation만 spawn한다.
- 기존 `verify_cmd_failed`, `post_merge_verify`, `verify_cmd_result` historical record와
  log 표시·migration reader는 보존한다. 이는 execution authority가 아니다.

다음은 비목표다.

- beads-ui에 `[verify]`를 이번 변경으로 추가하지 않는다.
- 홈 설정을 repository 설정으로 복사하거나 변환하지 않는다.
- GitHub Actions/check gate를 다시 추가하지 않는다.
- dotfiles가 소유한 workflow vocabulary나 repo-operation automation policy를 바꾸지
  않는다.

## 3. Authority와 상태 모델

모든 consumer는 target base를 먼저 resolve하고 그 exact SHA에서
`RepoOpsResolver`를 호출한다. 상태는 다음 하나로 정규화한다.

| resolver 결과 | verify declaration | gate 상태 | 실행 |
| --- | --- | --- | --- |
| config proven absent | 없음 | `absent` | 없음 |
| valid config | `[verify]` 없음 | `absent` | 없음 |
| valid config | valid `[verify]` | `present` | RepoOperation 1회 |
| probe/parse/path/mode/identity 오류 | 판정 불가 | `invalid` | 없음, fail-closed |
| sync display cache `pending`/`error` | 판정 불가 | `invalid` | 없음, fail-closed |

`resolved config`와 `verify present`를 혼동하지 않는다. 현재 beads-ui처럼 deploy만
선언한 config는 verify `absent`다. `config_blob_sha` 존재 여부는 deploy/전체 config
표시에 사용할 수 있지만 verify gate의 선언 상태가 아니다.

## 4. Runtime 설계

### 4.1 설정과 resolver

`server/config.js`는 `[worker.verify]`를 파싱하거나 `worker_verify` runtime field를
반환하지 않는다. 홈 config는 다른 서버 설정을 위해 계속 존재할 수 있지만, repository가
실행할 verify command를 공급하지 않는다.

`server/worker/verify-cmd.js`의 `resolveVerifyCmd`와
`resolveConfiguredVerify`를 제거한다. `runVerifyCmd`와 `runVerifyAtSha`는 기존
rollback/completion compatibility를 위해 이번 변경에서는 유지하되, 이미
`RepoOpsResolver`가 검증한 explicit declaration만 입력으로 받고 policy를 읽거나
fallback을 선택하지 않는다. poller, auto-merge, click-time gate는 이 primitive를 직접
호출하지 않는다.

### 4.2 Poller와 click-time gate

`pr-poller.js`는 open PR과 current review receipt를 관측한 뒤 attachment의 target-base
resolver와 `RepoOperationCoordinator`를 사용한다. valid `[verify]`가 있으면 candidate를
`ensureVerify`에 전달하고 terminal receipt를 `prObservations`에 투영한다. 선언이 없으면
즉시 끝나며 legacy command를 시작하지 않는다.

`pr-actions.js#gateNow`도 config file 존재 여부와 무관하게 같은 coordinator 경로를
사용한다. config-absent에서 `resolveVerify`로 내려가던 legacy fallback은 제거한다.
coordinator가 없거나 resolution이 invalid이면 통과를 추측하지 않고 fail-closed한다.

operation identity는 기존 coordinator 계약인
`(effective_base_sha, candidate_tree_sha, script object type/mode/blob)`를 유지한다.
poller와 click이 동시에 `ensureVerify`를 호출해도 prerecord와 repo-operation lock이 같은
operation을 coalesce한다. 먼저 온 caller만 spawn하고 다른 caller는 기존 queued/running/
terminal operation을 adopt한 뒤 같은 receipt를 읽는다.

### 4.3 Auto-merge와 WebSocket projection

auto-merge candidate 판정과 `worker-handlers.js`는 홈 config를 동기 조회하지 않는다.
attachment/coordinator가 채운 repo-ops resolution cache를 위 표의
`present|absent|invalid`로 투영한다. auto-enrollment는 advisory cache를 사용하되 실제 merge
직전에는 `gateNow`가 exact base/head/policy를 다시 pin한다.

`pr_observations[*].gate`도 같은 declaration state와 coordinator receipt를 사용한다.
따라서 UI, bulk enrollment, automatic enrollment, click-time merge가 서로 다른 verify
정책을 표시하거나 적용하지 않는다.

### 4.4 Legacy compatibility

active writer/executor에서 홈 verify를 제거하는 것과 durable history를 읽는 것은 분리한다.
queue migration, repair classification, failure labels가 기존
`verify_cmd_failed`/`post_merge_verify`/`verify_cmd_result`를 읽는 코드는 유지한다. 이
record는 새 command를 선택하거나 current merge eligibility를 green으로 만들 수 없다.

rollback·completion compatibility 경로는 exact pinned repo declaration을 사용하며,
config absent는 inert, invalid는 fail-closed다. historical `verify_cmd_failed`에 대응하는
RepoOperation subject가 이미 있으면 raw runner를 시작하지 않고 repo-operation repair로
넘긴다. 홈 설정과 legacy resolver로 돌아가는 fallback은 허용하지 않는다.

## 5. Protocol과 UI

`workspace_info.verify_cmd`를 active snapshot protocol에서 제거한다. settings dialog의
legacy verify row, `[worker.verify."<workspace>"]` 안내, repo-ops absent일 때 legacy row로
돌아가는 fallback도 제거한다.

verify 표시는 `workspace_info.repo_ops` 하나로 구성한다.

- `resolved + verify`: script와 timeout 표시
- `resolved/absent + no verify`: `선언 없음` 또는 `verify 없이 판정`
- `pending`: `선언 확인 중`
- `error`: resolver error 표시, merge action disabled

auto-merge control의 `verify_cmd_present` tooltip과 model field는 repo-ops declaration
state로 대체하거나 불필요하면 제거한다. UI source 변경 후 `app/main.bundle.js`와
`app/main.bundle.js.map`을 rebuild한다.

## 6. 저장소 정책

beads-ui의 `repo-ops/config.toml`은 이번 변경 뒤에도 `[deploy]`만 유지한다. 이는 검증을
생략한다는 뜻이 아니라 Worker merge gate에서 repository command를 추가로 실행하지 않는다는
뜻이다. 변경 자체의 lint, typecheck, test, formatting, frontend build는 Pre-Handoff
Validation에서 계속 수행한다.

나중에 자동 merge verify가 실제로 필요해지면 별도 repository change로 다음을 모두
review한다.

1. `[verify]`에 `repo-ops/script/verify`와 bounded `timeout_ms`를 선언한다.
2. script blob을 mode `100755`로 commit한다.
3. detached candidate worktree에서 필요한 dependencies를 script가 스스로 준비한다.
4. 준비가 끝난 뒤 `npm run all`을 실행한다.

홈 설정 자동 복사, 상위 checkout의 `node_modules` 차용, 환경별 숨은 command는 허용하지
않는다.

## 7. 문서와 ownership

canonical schema와 automation policy owner는 dotfiles의
`docs/contracts/workflow.{md,yaml}`이다. 그 계약은 이미 `repo-ops/config.toml`의
`base|verify|deploy`와 pinned resolver를 정의하므로 이번 변경은 vocabulary semantic
change가 아니다. 따라서 dotfiles canonical 문서와
`generated/contracts/repo-operation-policy.json`을 재생성하지 않는다.

beads-ui의 active consumer 문서인 `app/protocol.md`, runtime comments, UI 도움말과 tests를
새 snapshot에 맞춘다. `AGENTS.md`의 현재 no-verify 정책은 그대로 맞으므로 중복 규칙을
추가하지 않는다. historical specs/plans는 immutable evidence로 보존한다.

## 8. Test scope

다음 seam에 RED→GREEN 실행 권한을 둔다.

1. **config parser**
   - `[worker.verify]`가 있어도 runtime config에 `worker_verify`가 생기지 않는다.
   - missing/invalid home config의 다른 설정 fallback은 유지된다.
2. **repo declaration state**
   - config absent와 deploy-only config는 verify `absent`다.
   - declared verify는 `present`, probe/schema/path/mode/identity 오류는 `invalid`다.
   - pending/error display cache는 merge eligibility에서 fail-closed한다.
3. **poller/coordinator**
   - absent verify는 process·operation·receipt·failure를 만들지 않는다.
   - declared verify는 current base/head candidate에 대한 RepoOperation을 시작하고 terminal
     receipt를 관측 cache에 기록한다.
   - poller와 click이 겹치면 deterministic operation 하나만 spawn한다.
   - base/head/tree/script identity 변화는 이전 receipt를 재사용하지 않는다.
4. **click/auto gate**
   - config-absent에서 legacy resolver나 runner를 호출하지 않는다.
   - auto-merge candidate와 click-time gate가 `present|absent|invalid`를 동일하게 해석한다.
   - invalid policy는 bulk/automatic/click 경로 모두 거부한다.
5. **protocol/UI**
   - snapshot에 `workspace_info.verify_cmd`가 없다.
   - settings와 auto-merge UI에 legacy row·fallback·홈 설정 안내가 없다.
   - repo-ops verify `resolved|absent|pending|error` 표시가 유지된다.
6. **compatibility**
   - 대표 historical `verify_cmd_failed`, `post_merge_verify`, `verify_cmd_result` record와
     log/failure label은 계속 읽힌다.
   - historical record가 active verify declaration이나 green receipt로 승격되지 않는다.
7. **retirement guard**
   - active source에서 `getConfig().worker_verify`, `resolveConfiguredVerify`,
     `[worker.verify]` UI/help text가 다시 추가되지 않음을 검사한다.

## 9. 수용 기준

1. active runtime이 verify command를 홈 config에서 읽지 않는다.
2. poller, auto-merge, WebSocket, click-time gate가 pinned repo-ops policy 하나를 사용한다.
3. config/[verify] absent는 OFF이고 invalid는 fail-closed다.
4. declared verify는 exact candidate identity당 하나의 durable RepoOperation으로 실행된다.
5. `workspace_info.verify_cmd`와 legacy UI fallback이 사라진다.
6. historical queue/log compatibility는 유지된다.
7. beads-ui의 repository declaration은 `[verify]` 없이 유지된다.
8. 변경은 하나의 non-empty PR로 전달되며, merge 후 기존 `[deploy]` operation이 shared
   runtime 배포와 exact SHA/path/port/HTTP readback을 담당한다. 별도 no-PR residue는 없다.
