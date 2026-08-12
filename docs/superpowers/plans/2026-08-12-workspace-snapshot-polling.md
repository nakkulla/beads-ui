# Workspace snapshot 기반 Dolt polling 구현 계획

## Context

- 승인 spec: `docs/superpowers/specs/2026-08-12-workspace-snapshot-polling-design.md@58677baeb7533dff8391c12275ea3d730b711994`
- parent Bead: `UI-we9f`
- 구현 기준은 실행 진입 시 fetch한 `origin/main` tip이며 `.worktrees/UI-we9f`에서 작업한다.
- 현재 운영 증상은 전체 TCP `TIME_WAIT` 38,534개 중 Dolt `127.0.0.1:13307` 대상 24,554개다. `beads-ui`가 subscription과 monitor별로 새 `bd` child를 반복 spawn하고 각 process가 자기 Dolt pool을 열고 닫는 것이 직접 원인이다.
- Beads core와 driver는 변경하지 않는다. worker Codex runner의 `codex exec --json`도 유지한다.
- 정상 supported fork의 workspace generation은 `bd list --json --tree=false --all --limit 0`과 `bd ready --explain --limit 0 --json` 두 read를 사용한다.

## Phase 1: Atomic workspace snapshot coordinator

1. workspace별 `generation`, normalized raw rows/ID index, ready explanation, `in_flight`, `pending_mutation`, request epoch, success/failure timestamps, retry attempt와 `next_retry_at`을 소유하는 coordinator module과 injectable `runBdJson`/fake clock seam을 추가한다.
2. idle request는 두-command generation을 시작하고, poll/background/monitor 요청은 existing in-flight에 join하며, in-flight 중 watcher/성공 mutation은 정확히 한 trailing generation을 예약하도록 구현한다.
3. all과 ready-explain이 모두 성공하고 subject-ID validation을 통과할 때만 snapshot을 atomic commit한다. `blocked_by` external/missing ID는 local row 부재를 허용하고, partial 또는 full failure는 commit하지 않는다. warm failure는 stale snapshot을 유지하고 cold failure는 structured error를 반환한다.
4. 실패 시 지수 backoff를 기존 poll interval 이하로 bounded하고 success에서 reset한다. backoff 동안 반복 warm request는 child를 만들지 않으며, mutation evidence는 `pending_mutation`을 보존해 deadline에서 정확히 한 trailing generation을 예약한다. request epoch와 mutation epoch가 뒤처진 completion은 publish/closed sweep에 사용하지 않는다.
5. embedded dependency capability를 real CLI boundary에서 확인한다. supported fork는 two-command path를 쓰고 legacy capability fixture는 batched `bd dep list`를 generation당 한 번만 사용하는 compatibility fallback과 command-count telemetry를 사용한다.

Verification: fake clock으로 concurrent cold/background/poll single-flight, mutation burst one trailing generation, warm backoff 중 zero spawn·deadline one refresh·success reset을 검증하고, workspace isolation, all/ready partial failure, cold structured error, stale completion/newer-mutation fence, external blocker 보존, supported 2-command/legacy 3-command tests를 실행한다.

## Phase 2: Snapshot projection과 WebSocket publication

1. raw all+ready snapshot에서 기존 `all`, `ready`, stored+dependency `blocked`, `in_progress`, `resolved`, `deferred`, closed range projection을 만들고 기존 ordering/filter/`blocked_info` fixture와 parity를 고정한다.
2. supported path의 embedded `discovered-from` edge로 `from_id`를 만들고 malformed edge를 fail-quiet로 생략한다. legacy path만 batched provenance fallback을 사용한다.
3. initial subscribe, cache-hit background refresh, poll/watcher/mutation refresh가 `(workspace,spec)`별 fetch 대신 workspace generation을 요청하도록 변경한다. 한 commit된 snapshot에서 active spec별 registry delta를 계산하고 key lock은 publish 순서와 workspace isolation에만 사용한다.
4. projection과 publish는 active spec별 error boundary를 둔다. 한 spec의 projection/publish 실패는 그 spec의 이전 snapshot을 유지하고 structured error/telemetry만 남기며, 다른 spec publication과 committed workspace snapshot을 막거나 무효화하지 않는다.
5. `issue-detail`의 direct `bd show`, mutation command, inclusive closed `since` 계약은 유지하고 성공 mutation이 coordinator dirty signal을 보내게 한다.

Verification: list-adapter projection parity, same-key concurrent cold subscribe one generation, different workspace isolation, warm failure no delete/upsert, mutation trailing refresh, one projection/publish failure가 sibling spec delivery를 막지 않음, issue-detail direct path tests를 실행한다.

## Phase 3: Monitor와 worker의 snapshot 재사용

1. runnable cache의 periodic `bd list --status open` fill을 snapshot projection으로 바꾸고 기존 `status=open`/route/spec receipt/phase-child/label qualification과 lane exclusion, visible/hidden monitor gate를 유지한다.
2. external PR registry의 Beads metadata/status scan이 fresh snapshot generation을 사용하도록 바꾸되 `gh` observation은 기존 PR poller에 남긴다.
3. closed queue sweep은 자기 request 뒤 성공한 latest generation만 사용하고 newer mutation/generation이 시작됐으면 generation fence로 stale status 적용을 막는다.
4. active list subscription, visible Monitor, worker external/closed sweep demand를 workspace refresh demand로 합치고 demand가 없는 connected socket은 periodic `bd` read를 만들지 않게 한다. title decoration은 기존 cache/direct fallback을 유지해 scope를 늘리지 않는다.

Verification: Board+Worker+Monitor 한 workspace의 supported poll generation이 detail/gh/write 제외 두 `bd` child만 만드는 integration test, runnable parity, external scan reuse, closed sweep fence, visible/hidden/no-demand tests를 실행한다.

## Phase 4: 관측성, 전체 검증, managed delivery

1. workspace, cause, generation, join/trailing, retry/backoff, command duration/exit, projection count, command-count mode만 남기고 issue body나 credential data는 기록하지 않는 debug telemetry를 추가한다.
2. focused tests 뒤 `npm run all`로 test/lint/typecheck/format/build를 통과시키고 full diff/status를 검토한다.
3. managed deploy adapter와 existing `scripts/managed-self-deploy.js` contract test로 exact candidate release, pointer cutover, service restart handoff, process path/bind/HTTP readback을 검증한다.
4. merge 후 managed release를 배포하고 같은 관측 창에서 service owner/path/HTTP, 한 generation command count, Dolt `TIME_WAIT` absolute count와 30초 증가량을 최소 60초 관찰한다. sysctl과 port range는 변경하지 않는다.

Verification: `npm run all`, managed deploy focused tests, deployed release SHA/process/bind/HTTP readback, supported generation 2-command log, 배포 전후 60초 Dolt TIME_WAIT 증가율 비교를 완료한다.

## Test scope

- Phase 1 RED→GREEN: 현재 coordinator가 없어 concurrent same-workspace request와 mutation burst가 여러 `bd` process를 만들고, all/ready partial failure가 atomic commit 경계로 격리되지 않으며, cold structured error·warm bounded backoff·stale completion/newer-mutation fence가 없다. fake-clock coordinator tests로 각각 먼저 실패시킨 뒤 single-flight, atomic commit, retry state, epoch fence 구현으로 통과한다.
- Phase 2 RED→GREEN: 기존 spec별 adapter 호출 수와 batch provenance가 snapshot projection/parity/count tests에서 실패하고, 한 projection/publish 예외가 sibling delivery를 격리하지 못하는 상태를 먼저 고정한 뒤 shared generation과 per-spec error boundary로 통과한다.
- Phase 3 RED→GREEN: 현재 runnable/external scan이 별도 `bd list`를 만드는 command-count test와 stale closed-sweep fence test를 먼저 실패시킨다.
- Phase 4 RED→GREEN: existing managed/runtime verification에 generation count와 network-rate evidence가 없는 상태를 contract/runtime check로 드러낸 뒤 추가한다.
- 실제 CLI boundary probe는 synthetic dependency fixture만으로 대체하지 않고 supported `bd`의 known `discovered-from` edge payload를 확인한다.
- 제외: Beads CLI/driver/schema, GitHub API real-network state, macOS kernel networking, worker Codex transport는 변경하거나 테스트 범위를 확장하지 않는다.

## Delivery constraints

- 각 Phase는 parent plan anchor에 연결된 execution child 하나로 추적하고 Phase 1→2→3→4 순서로 진행한다.
- current PR과 `docs/agents/repo-ops.toml` managed deploy가 모든 required unit을 운반하므로 `worker-ineligible` residue가 없다.
- runtime service를 ad-hoc daemon으로 띄우지 않고 managed adapter와 `bdui-shared` owner를 사용한다.
- deploy 성공 판정은 기존 TIME_WAIT absolute count가 즉시 0이 되는 것이 아니라 새 증가율이 유의하게 감소하고 서비스가 정상인지를 함께 본다.
