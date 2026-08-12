# post-merge 정적 artifact 검증 축소 설계

- Bead: `UI-vobi`
- Route: `spec_backed`
- 상태: 사용자 설계 승인 완료

## 배경

현재 `docs/agents/repo-ops.toml`의 `[verify]`는 `npm run all`을 호출해 lint, TypeScript 검사, Vitest 전체, Prettier 검사를 post-merge detached checkout에서 다시 수행한다. 전체 suite는 implementation/release acceptance에는 유효하지만, merged checkout에서 deploy 직전에 반복할 필요는 없다.

정적 audit에서 전체 Vitest inventory는 약 205개 파일이며 server·Worker·public UI·deploy contract 대부분이 active source를 보호한다. production bundle에서 빠진 일부 orphan utility가 있었지만 test 시간 절감 효과가 작고 historical document ownership 판단이 필요하므로 이 Bead에서는 삭제하지 않는다.

## 목표

1. post-merge `[verify]`를 TypeScript 정적 검사와 committed frontend bundle drift 검사로 축소한다.
2. `npm run all`과 Vitest inventory는 implementation/release acceptance용으로 유지한다.
3. `UI-lb58`의 deploy declaration 전환이 새 verify command를 보존하게 한다.

## 비목표

- Vitest, lint, Prettier 또는 orphan source를 삭제하지 않는다.
- `[verify]` schema나 Worker verify lifecycle을 제거하지 않는다.
- runtime restart, health, exact deployed SHA readback을 `[verify]`에 넣지 않는다. 이 증거는 `[deploy]`가 소유한다.
- `UI-lb58`의 desired-state deployment semantics를 변경하지 않는다.

## 설계

### 1. post-merge 전용 command

`scripts/verify-post-merge.js`를 추가하고 `package.json`에 다음 entry를 둔다.

```json
"verify:post-merge": "node scripts/verify-post-merge.js"
```

script는 repo root를 자기 위치에서 계산하고 다음 순서를 고정한다.

1. `npm run tsc`로 tracked JavaScript/TypeScript surface를 `checkJs` 포함 정적 검사한다.
2. `npm run build`로 `app/main.bundle.js`와 source map을 재생성한다.
3. `git diff --exit-code -- app/main.bundle.js app/main.bundle.js.map`으로 committed bundle drift가 없는지 확인한다.

lint, Prettier, Vitest는 호출하지 않는다. command 실패 exit code를 그대로 전달하고 성공 시 단계와 elapsed time을 한 줄로 출력한다. network, live service, Beads state에는 접근하지 않는다.

`docs/agents/repo-ops.toml`은 다음으로 바꾼다.

```toml
[verify]
cmd = ["npm", "run", "verify:post-merge"]
timeout_ms = 120000
```

### 2. full acceptance 유지

`npm run all = lint && tsc && test && prettier:check`, `preversion`, Vitest config와 test inventory는 변경하지 않는다. 구현 작업은 기존 focused tests와 `npm run all`을 계속 사용한다.

### 3. UI-lb58 정합

`UI-lb58`는 이 Bead를 선행 dependency로 가진다. 이후 base를 동기화할 때 `[deploy]` section만 desired-state command로 전환하고 새 `[verify]` command와 timeout을 보존한다. managed deploy 전용 test 삭제는 `UI-lb58`의 승인된 cutover phase가 새 replacement coverage를 만든 뒤에만 수행한다.

## 오류와 복구

- `tsc` 실패는 source/type drift로, bundle diff는 generated artifact drift로 구분해 출력한다.
- build가 bundle을 바꿨으면 verifier는 변경물을 commit하지 않고 실패한다. 구현 branch에서 build 결과를 검토·commit한 뒤 재실행한다.
- detached checkout에 dependency가 없으면 현재 `npm run all`과 같은 환경 전제 실패로 보고하며 자동 install이나 network bootstrap은 하지 않는다.

## Test scope

### Seam A — command order와 failure propagation

- Target: 새 `scripts/verify-post-merge.test.js`가 exported verifier에 injectable command runner를 넣어 검사한다.
- RED: target module과 package entry가 현재 없으므로 focused test가 module resolution에서 실패하며, 구현 전에는 `tsc → build → bundle diff` 순서와 첫 실패 중단을 제공하는 owner가 없다.
- GREEN: injectable command runner를 가진 최소 script가 순서와 실패 의미를 만족한다.

### Seam B — declaration wiring

- Target: `scripts/verify-post-merge.test.js`가 `package.json`과 `docs/agents/repo-ops.toml` wiring을 검사한다.
- RED: 현재 package entry가 없고 `[verify]`가 `npm run all`과 600초 timeout을 가리키므로 실패한다.
- GREEN: declaration은 `npm run verify:post-merge`와 120초 timeout을 가리킨다.

### GREEN acceptance — repository artifact

- GREEN: repository root에서 `npm run verify:post-merge`가 성공하고 build 뒤 bundle/map diff가 없다.

## 완료 조건

- 전용 verifier contract와 repository-root 실행이 green이다.
- `[verify]`는 full Vitest/lint/format을 호출하지 않는다.
- `npm run all`, `preversion`, Vitest config와 기존 test에는 삭제·완화 diff가 없고 새 focused verifier test만 추가된다.
- `UI-lb58`가 `UI-vobi`를 dependency로 가지며 새 declaration 보존 조건을 충족한다.
