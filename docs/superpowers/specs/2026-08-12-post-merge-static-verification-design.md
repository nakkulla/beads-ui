# Beads UI 단계별 required verification 축소 설계

- Bead: `UI-vobi`
- Route: `spec_backed`
- 선행: `UI-lb58`, dotfiles `dotfiles-b2yx`
- 후속 consumer: `UI-x7fi`
- 상태: 사용자 방향 수정 반영, amended spec review 대기

## 배경

`UI-lb58`은 승인된 plan 그대로 구현·배포를 완료한다. 따라서 이 Bead는 `UI-lb58`의
구현이나 cutover를 선행 차단하지 않으며, landed final `main`의 repo-level deployment job과
최종 `docs/agents/repo-ops.toml`을 입력으로 삼아 검증 단계만 후속 정리한다.

현재 PR CI는 Node 22와 24에서 전체 `npm test`를 실행하고, post-merge `[verify]`는
`npm run all`을 다시 실행한다. 구현 session도 focused tests 뒤에 `npm test`와
`npm run all`을 중복 실행한다. 이 구조에서는 변경 범위 밖 Vitest 한 건이 실패해도 PR,
post-merge cleanup, Bead close가 모두 멈추고 동일 실패 재실행·baseline 비교·repair가 시작된다.

전체 Vitest inventory는 repository health에는 유효하지만 모든 PR과 merge의 required gate일
필요는 없다. 변경과 직접 결합된 behavior tests는 승인된 spec/plan의 `Test scope`에서 실행하고,
PR과 post-merge는 배포 가능한 artifact의 정적 invariant만 확인한다. 전체 suite는
nightly/manual health lane으로 이동한다.

## 목표

1. `UI-lb58` 완료 뒤 post-merge `[verify]`를 TypeScript 검사와 frontend bundle drift 검사로
   축소한다.
2. 구현 required verification을 승인된 `Test scope`의 focused commands와 정적 invariant로
   한정하고 implicit `npm test`/`npm run all`을 제거한다.
3. PR CI에서 전체 Vitest를 제거하고 stable required check 하나만 제공한다.
4. 전체 `npm run all`/Node compatibility suite를 daily/manual advisory workflow로 이동한다.
5. advisory failure가 merge, cleanup, Bead close, baseline 조사 또는 repair session을 만들지
   않게 한다.
6. `UI-x7fi`가 dotfiles `dotfiles-b2yx`의 required-check declaration만 소비하게 한다.

## 비목표

- `UI-lb58`의 승인 spec/plan, implementation worktree 또는 desired-state deployment semantics를
  수정하지 않는다.
- Vitest inventory, active retirement test, lint, Prettier 또는 orphan source를 이 Bead에서
  삭제하지 않는다.
- GitHub branch protection을 우회하거나 required check 실패를 무시하지 않는다.
- runtime restart, health, exact deployed SHA readback을 source `[verify]`에 넣지 않는다. 이
  evidence는 external deployment job이 소유한다.
- advisory full failure를 자동으로 수정하거나 별도 Bead로 전환하지 않는다.

## 단계별 verification contract

### 1. Implementation required

구현 session의 required set은 다음 합집합뿐이다.

1. 승인된 spec/plan `Test scope`에 이름이 고정된 focused tests
2. `npm run lint`, `npm run tsc`, `npm run prettier:check`
3. frontend source를 바꿨을 때 `npm run build`와 committed bundle/map diff 확인
4. deployment/runtime source를 바꿨을 때 해당 focused readback

`npm test`, `npm run all`, unrelated test file, 전체 Vitest collection은 implicit completion
gate가 아니다. Required command가 실패하면 차단하지만 required set 밖의 suite를 추가 실행해
confidence를 쌓지 않는다.

### 2. PR required

`.github/workflows/ci.yml`은 stable aggregator `beads_ui_required` 하나를 PR merge check로
제공한다.

- Node 22와 24에서 dependency install과 `npm run verify:post-merge`를 실행해 supported engine의
  type/build artifact compatibility를 확인한다.
- Node 24에서만 `npm run lint`와 `npm run prettier:check`를 추가 실행한다.
- `npm test`, `vitest run`, `npm run all`은 PR event에서 호출하지 않는다.
- aggregator는 required worker의 `failure|cancelled|timed_out|skipped`를 모두 실패로 처리한다.

dotfiles `dotfiles-b2yx`가 제공하는 repo-ops schema가 landed된 뒤
`docs/agents/repo-ops.toml`은 exact required check identifier만 선언한다. Advisory workflow 이름은
이 allowlist에 들어갈 수 없다.

### 3. Post-merge required

`scripts/verify-post-merge.js`와 package entry를 추가한다.

```json
"verify:post-merge": "node scripts/verify-post-merge.js"
```

command는 다음 순서만 실행한다.

1. `npm run tsc`
2. `npm run build`
3. `git diff --exit-code -- app/main.bundle.js app/main.bundle.js.map`

`docs/agents/repo-ops.toml`의 `[verify]`는 다음 final declaration을 사용한다.

```toml
[verify]
cmd = ["npm", "run", "verify:post-merge"]
timeout_ms = 120000
```

lint, Prettier, Vitest, network, live service와 Beads state는 호출하지 않는다. Static command이므로
`postMergeVerify()`는 `retry_flaky: false`를 사용한다. 실패는 동일 full command를 자동 재실행하지
않고 exact stage와 log를 보존한 required failure로 반환한다.

### 4. Scheduled/manual advisory full

새 `.github/workflows/full-test-scheduled.yml`은 daily schedule과 `workflow_dispatch`에서만
실행한다. `pull_request`와 `push` trigger는 두지 않는다.

- Node 22: `npm test`
- Node 24: `npm run all`
- failure log/artifact와 exact SHA를 보존한다.
- failure는 해당 workflow conclusion만 red로 남긴다.

이 failure는 즉시 retry, pinned-base comparison, `systematic-debugging`, completion repair,
follow-up Bead, PR blocker, source Bead close blocker를 만들지 않는다. 이후 별도 사용자 요청이나
독립 intake가 있을 때만 health 문제로 다룬다. 다음 daily run은 새로운 schedule 실행이지 실패
retry budget이 아니다.

## UI-lb58 이후 적용 순서

1. `UI-lb58`의 PR merge, external deployment success, shared runtime exact readback과 Bead close를
   확인한다.
2. landed final `main`에서 deployment job, repo-ops declaration, active tests를 다시 inventory한다.
3. 이 Bead의 worktree를 그 final base에서 만들고 verification files만 수정한다.
4. static verifier와 PR/scheduled workflows를 먼저 focused test로 검증한다.
5. `UI-x7fi`는 이 Bead와 `dotfiles-b2yx` close 뒤 final required-check declaration을 소비한다.

`UI-lb58`의 historical spec/plan은 backfill하지 않는다. 이 문서가 final landed surface를
후속 변경하는 유일한 authority다.

## 오류와 복구

- `tsc` 실패는 source/type drift, build diff는 generated artifact drift로 구분한다.
- build가 bundle을 바꾸면 verifier는 commit하지 않고 실패한다. implementation branch에서
  artifact를 검토·commit한 뒤 focused command만 다시 실행한다.
- dependency 부재나 spawn failure는 environment/launch failure로 fail closed하며 full suite
  fallback을 실행하지 않는다.
- required PR check가 실패하면 merge를 차단한다. Advisory full red는 PR check rollup에 없으므로
  merge actor가 분류할 대상 자체가 아니다.

## Test scope

### Seam A — post-merge command

- Target: `scripts/verify-post-merge.test.js`
- RED: module/package entry가 없고 `[verify]`가 `npm run all`을 가리킨다.
- GREEN: `tsc → build → bundle diff` 순서, first-failure propagation, 120초 declaration과
  `retry_flaky: false` wiring이 고정된다.

### Seam B — PR required workflow

- Target: `.github/workflows/ci.yml` contract test
- RED: 현재 두 Node leg가 `npm test`를 실행하고 stable required aggregator가 없다.
- GREEN: PR workflow에 `npm test|vitest|npm run all` 호출이 0이고 supported-node static workers와
  `beads_ui_required` aggregator만 존재한다.

### Seam C — advisory full workflow

- Target: 새 scheduled workflow contract test
- RED: daily/manual full owner와 PR-trigger absence contract가 없다.
- GREEN: Node 22 `npm test`, Node 24 `npm run all`, daily/manual-only trigger, exact-SHA artifact와
  PR required allowlist 부재가 고정된다.

### Seam D — final dependency/consumer wiring

- Target: repo-ops/merge contract tests와 Beads dependency readback
- RED: `UI-lb58`가 `UI-vobi`에 의존하고 `UI-x7fi`는 `UI-vobi`를 prerequisite로 요구하지 않는다.
- GREEN: `UI-vobi`가 `UI-lb58`와 `dotfiles-b2yx`에 의존하고 `UI-x7fi`가 `UI-vobi`를 의존하며,
  merge decision은 declared required check만 소비한다.

## 완료 조건

- `UI-lb58`가 먼저 close되고 deployed final surface가 확인된다.
- implementation/PR/post-merge required set 어디에도 full Vitest implicit command가 없다.
- PR CI는 stable required aggregator만 제공하고 full workflow는 daily/manual-only다.
- scheduled full failure는 retry/baseline/debug/repair/Bead/merge/close effect를 만들지 않는다.
- `[verify]`는 static verifier 한 번만 실행하고 deployment readback은 external job에 남는다.
- `UI-x7fi`가 final required-check declaration을 소비하며 advisory check를 판정하지 않는다.
