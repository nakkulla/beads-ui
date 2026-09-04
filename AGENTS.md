# Agents

## 설계 결정 기록 (ADR)

- 설계 결정 정본: `docs/adr/README.md` "현재 유효한 결정" — 설계 변경 전 확인,
  충돌 시 supersede ADR 필요 (`adr` 스킬; 인덱스는 생성물이라 직접 편집 금지).

## Beads (bd) — Work Tracking

Use MCP `beads` (bd) as our dependency‑aware issue tracker. Run
`beads/quickstart` to learn how to use it.

### Issue Types

- `bug` - Something broken that needs fixing
- `feature` - New functionality
- `task` - Work item (tests, docs, refactoring)
- `epic` - Never create; existing `epic` issues are historical-read only
- `chore` - Maintenance work (dependencies, tooling)

### Priorities

- `0` - Critical (security, data loss, broken builds)
- `1` - High (major features, important bugs)
- `2` - Medium (nice-to-have features, minor bugs)
- `3` - Low (polish, optimization)
- `4` - Backlog (future ideas)

### Dependency Types

- `blocks` - Hard dependency (issue X blocks issue Y)
- `related` - Soft relationship (issues are connected)
- `parent-child` - full_plan Phase children only (owned by dotfiles
  `docs/contracts/workflow-contract.md`)
- `discovered-from` - Track issues discovered during work

Only `blocks` dependencies affect the ready work queue.

### Structured Fields and Labels

- Use issue `type` and `priority` fields.
- Never create `epic` issues; `parent-child` only for full_plan Phase children;
  group sibling issues with `blocks`/`related` only.
- Use `related` or `discovered-from` dependencies.
- Area pointers are labels, e.g.: `frontend`, `backend`

### Agent Workflow

If no issue is specified, run `bd ready` and claim an unblocked issue.

1. Open issue with `bd show <id>` and read all linked docs.
2. Assign to `agent`, update status as you work (`in_progress` → `closed`);
   maintain dependencies, and attach notes/links for traceability.
3. Discover new work? Create linked issue with dependency
   `discovered-from:<parent-id>` and reference it in a code comment.
4. Land the change; run tests/lint; update any referenced docs.
5. Close the issue with `bd close <id>`.

Never update `CHANGES.md`.

### Workflow 계약의 canonical 소유권

이 저장소가 읽고 표시하는 workflow 계약 표면 — 라벨 어휘(`has:spec`, `pr`,
`reviewed:*`, `skipped:*` 등), durable metadata 키(`route`, `spec_id`,
`plan_path`, `spec_review`/`impl_review`, `pr_url`, `blocked_reason` 등),
Worker가 소비하는 키, `status` 어휘 — 의 canonical 정의는 dotfiles의
`docs/contracts/workflow-contract.md`와 `docs/contracts/workflow-state.yaml`에
있다. beads-ui는 그 계약의 **소비자**이며 정의자가 아니다(ADR 0012).

따라서 계약 표면을 바꾸는 변경(키 추가·의미 변경·라벨 폐기 등)은 beads-ui 코드만
고쳐서는 안 되고, dotfiles 계약 문서와 이를 쓰는 스킬을 함께 정합해야 한다.
반대로 beads-ui에서 계약 키의 부재를 관측하면 표시를 생략(fail-quiet)하고 계약
쪽 정정을 별도로 제기한다.

## Coding Standards

- Use **ECMAScript modules**.
- Use `PascalCase` for **classes** and **interfaces**.
- Use `camelCase` for **functions** and **methods**.
- Use `lower_snake_case` for **variables and parameters**.
  - Use `camelCase` for variables referencing functions or callable objects.
  - Use `PascalCase` only for class constructors or imported class symbols.
- Use `UPPER_SNAKE_CASE` for **constants**.
- Use `kebab-case` for **file and directory names**.
- Use `.js` files for all runtime code with JSDoc type annotations (TypeScript
  mode).
- Use `.ts` files **only** for interface and type definitions. These files must
  not contain runtime code or side effects.
- Place a JSDoc type import block at the top of each file when needed:
  ```js
  /**
   * @import { X, Y, Z } from './file.js'
   */
  ```
  Omit this block if the symbol is already defined within the file.
- Add JSDoc to all functions and methods:
  - Declare all parameters with `@param`.
  - Add `@returns` only when the return type is **not self-evident** from the
    code (e.g., complex conditionals, unions, or context-dependent types). Omit
    it when the return value is **clear and unambiguous** from the function body
    or signature.
- If a local variable’s type may change, or is initialized as an empty
  collection (`{}`, `[]`, `new Set()`, `new Map()`), add a `@type` JSDoc
  annotation to specify the intended type. This applies to both `let` and
  `const` when inference is ambiguous.
- Use braces for all control flow statements, even single-line bodies.
- Use optional chaining (`?.`, `??`, etc.) only when a value is **intentionally
  nullable**. Prefer explicit type narrowing to guarantee value safety.

## 워커·모니터 카드 배치 문법

`candidateCard` · `miniRow` · `runningTile`은 Worker 탭과 Monitor 탭이 공유하는
같은 렌더러다. 근거·예외·슬롯 표는
`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md`가
소유하며, 여기에는 결정만 싣는다.

- 줄 순서는 그 스펙 §2 표를 따른다: 정체성+조작 → 제목 → 진행 → 의존 칩(상단) →
  정보 칩(하단) → 좌표·실행 사실 칩 → 액션 foot → 시각.
- 열리는 칩(`⛓`·`→`·`🔓`·`⧉`)의 클릭은 그 이슈 상세, 판정 칩(`복잡`·`세션 권장`·
  `worker-ineligible`·`리뷰`·`스펙 대기`)의 클릭은 사유 팝업이다. 카드 위의 칩은
  상태를 쓰지 않는다 — 근거는
  `docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md`가 소유한다.
- 새 라벨·칩·뱃지·버튼의 자리는 고르지 않는다. 그 요소가 답하는 질문으로 스펙
  §5.1 슬롯 표가 정한다(ADR 0014).
- 조작은 1번 줄 오른쪽 끝이거나 액션 foot이다. 그 사이에 칩을 끼우지 않는다 —
  칩이 끼면 조작이 다음 줄로 밀리고, 사용자가 버튼을 찾는 자리가 폭에 따라
  달라진다.
- `↴ 대기로`·`✕ ↑ ↓`(대기 행)·`↻ 이어하기`/`▶ 재개` 계열 조작과 **새로 다는**
  조작 버튼은 공통 토큰 `.op-btn`으로 만든다. 같은 묶음에 이미 있는 다른
  버튼(`⏸`·`폐기`·`머지` 등)은 높이만 토큰에 맞추고 색·문구는 그대로다.
  크기·테두리·글자 크기를 카드마다 고르지 않는다 — 적용 표와 근거는
  `docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md`
  §3.2가 소유한다.
- 재료가 없는 줄은 그리지 않는다(fail-quiet). 판정은 그 줄의 재료 전부로 한다.
- 타 레포 blocker 칩은 `<workspace>/<ID>`로 rig를 문자로 보이고 색은 그대로다.
  사람의 처분을 기다리는 admission이 선 bead는 held 타일·점유 ghost가 아니라
  대기 행이 대표한다 — 근거는
  `docs/superpowers/specs/2026-09-04-waiting-tile-stale-disposition-reach-design.md`다.
- 슬롯 표로 배정되지 않는 요소를 달아야 한다면, 칩을 추가하기 전에 그 스펙을
  갱신해 슬롯을 먼저 정한다. 카드마다 자기 자리를 고르는 것이 통일 전 상태를
  만든 원인이다.

## Unit Testing Standards

- Write short, focused test functions asserting **one specific behavior** each.
- Name tests using **active verbs** that describe behavior, e.g.
  `returns correct value`, `throws on invalid input`, `emits event`,
  `calls handler`. Avoid starting names with “should …”.
- Follow the structure: **setup → execution → assertion**, separating each block
  with a blank line for readability.

  ```js
  const store = createStore();

  const result = store.addItem('x');

  expect(result).toEqual('x');
  ```

- Do not modify implementation code to make tests pass; adjust the test or fix
  the underlying issue instead.

## Pre‑Handoff Validation

- Before the first validation in a new worktree, confirm `node --version`
  satisfies `package.json#engines` and `npm ls --depth=0` succeeds from that
  worktree. If dependencies are missing, install them in that worktree; do not
  borrow or symlink another checkout's `node_modules`, because frontend source
  maps must remain checkout-path independent.
- Run type checks: `npm run tsc`
- Run tests: `npm test`. 전체 스위트는 약 45초에 끝난다. 에이전트 세션에서는
  `npx vitest run --reporter=dot`을 timeout 120초로 돌려라 — vitest fork-pool이
  시작 직후 드물게 교착(CPU 0%, 출력 없음)하므로, 진행을 가리는 `| tail`과 긴
  timeout은 "느림"과 "멈춤"을 10분 넘게 구분하지 못한다. 멈추면 죽이고 다시
  돌린다.
- Run eslint: `npm run lint`
- Run prettier: `npm run prettier:write`
- After frontend source edits, run `npm run build` and include the updated
  `app/main.bundle.js` and `app/main.bundle.js.map`.

## Post‑Merge Runtime Validation

- **필수 마감 단계 — 머지는 완료가 아니다**: 이 저장소의 코드 수정은 공유 서비스
  배포까지 마쳐야 완료다. 머지 후 배포 operation이 terminal success에 도달하고
  프로세스 경로·포트·HTTP 응답 검증까지 통과한 다음에만 완료를 선언한다.
- 배포 선언의 SoT은 핀된 base SHA에서 읽는 `repo-ops/config.toml`의
  `[deploy]`다(ADR 0010). 선언이 없으면 배포 단계를 생략하고, 선언이 있으나
  해석할 수 없으면 fail-closed다.
- 안정 런타임 소스는 공유 detached 워크트리 `.worktrees/.repo-ops-deploy`다.
  Worker와 세션 등 외부 executor는 `.worktrees/.repo-ops-deploy.lock`의 같은
  `fcntl.flock` 계약을 사용한다. 정렬 executor는 lock 안에서 target을 다시
  bind하고 단조성을 확인한 뒤 정렬하며 script spawn 전에 해제한다. deploy
  script는 실행 전체를 self-flock하고 진입 시 HEAD, 종료 시 HEAD와
  tracked-clean을 검증한다.
- 정리 cursor는
  `base_containment → repo_operations → child_sweep → branch_cleanup → parent_close`다.
  [머지] 클릭, 세션 직접 머지, 외부 머지는 모두 관측 후 같은 자동 정리 경로로
  수렴한다 — 단, 관측 단위는 Worker가 추적하는 bead의 PR 머지다. Worker가
  추적하지 않는 quick_fix ref push는 관측 대상이 아니므로 배포 실행과 그 증거
  확인까지 push한 세션이 소유한다. Worker-dispatched quick_fix의 배포·close는
  dotfiles `docs/contracts/workflow-contract.md`와
  `docs/contracts/workflow-state.yaml`에 따라 Worker가 소유한다.
  `[정리 재시도]`는 `cleanup_failed`가 기록된 행의 실패 재개 전용이다.
- 실패 해결 사다리는 상시 단발 `script_retry` 하나뿐이다(ADR 0009). 그 뒤로
  post-merge 실패는 원인을 기록한 채 `needs_human`으로 종단하고 자동 AI 수리
  세션 dispatch는 없다. 그 종단은 Discord 푸시로 자동 관측되고 재진입은
  `[정리 재시도]`와 `[세션에서 해결]` 두 클릭뿐이다(ADR 0024). 사다리·자동 처리
  항목·자동으로 하지 않는 것의 정본은 dotfiles가 소유하고, 이 저장소가 읽는 것은
  핀된 사본 `generated/contracts/repo-operation-policy.json`이다 — 문장을 여기에
  복제하지 않는다.
- 실제 소비자 표면은 canonical `repo-ops/config.toml`, `repo-ops/script/deploy`,
  Worker/Monitor의 저장소 작업·자동 해결 화면이다. 계약 문구와 automation enum은
  dotfiles가 소유하며 이 문서에 복제하지 않는다.
- If the merged change affects runtime behavior, verify that the real server
  process comes up from `.worktrees/.repo-ops-deploy` at the merged SHA, not a
  stale worktree or pre-merge checkout.
- For the canonical shared server path, prefer:
  ```bash
  bdui-shared restart
  ```
- Use `bdui` directly only for exceptional ad-hoc repo-local development servers
  on a different localhost port that are not the shared service.
- For an ad-hoc repo-local live-mode server, prefer:
  ```bash
  BDUI_FRONTEND_MODE=live bdui restart --host 127.0.0.1 --port 3001
  ```
- After restart, verify the running process path, listening port, and a basic
  HTTP response before reporting success.

## Local `bdui` Development Workflow

- For local development, prefer `npm link` from this repository so the `bdui`
  command resolves to the current checkout instead of a published global package
  snapshot.
- The canonical control path for the normal shared server is `bdui-shared`.
- Use `bdui` directly only when you intentionally start an ad-hoc repo-local
  development server outside the shared service flow, ideally on a different
  localhost port.
- For temporary ad-hoc local servers, do not treat a printed listening URL as
  success; verify the process is still alive, the intended checkout owns it, and
  HTTP still responds after a short delay.
- When you need the browser UI to reflect the latest source changes immediately,
  run the server with `BDUI_FRONTEND_MODE=live`.
  - Example start:
    ```bash
    BDUI_FRONTEND_MODE=live bdui start --host 127.0.0.1 --port 3001
    ```
  - Example restart:
    ```bash
    BDUI_FRONTEND_MODE=live bdui restart --host 127.0.0.1 --port 3001
    ```
- If you run without `BDUI_FRONTEND_MODE=live`, the server may serve the static
  `app/main.bundle.js`; after frontend source edits, run `npm run build` before
  expecting UI changes to appear.

## GitHub Actions — 이 저장소에는 CI 워크플로가 없다

- `.github/workflows/`는 비어 있고, 다시 추가하면 테스트가 실패한다
  (`scripts/ci-workflow-retired.test.js`). branch protection의 required check도
  0개다(`gh api repos/<owner>/<repo>/branches/main/protection` →
  `Branch not protected`).
- **머지 자격 판정은 checks를 아예 보지 않는다**(ADR 0003). 판정 입력은 다섯
  가지뿐이다: fresh PR/base/head identity, clean mergeability, current workflow
  review 영수증, 실행 영수증 backing(`receipt_state`), 그리고
  `repo-ops/config.toml`의 `[verify]` 영수증.
- review 영수증의 결속은 두 가지로 갈린다. `spec_review`는 스펙 문서 경로
  프로브가 판정하고, `impl_review`는 **exact head가 아니라 ancestry** 결속이다:
  영수증 SHA가 관측된 head와 같거나 그 조상이면 유효하고, 조상이 아니면(히스토리
  재작성·브랜치 리셋) stale이다(ADR 0031). ancestry probe 오류는 머지 게이트에서
  fail-closed(stale 취급)·보드 표시에서만 fail-quiet다. 큐가 소유한 `resolver:`
  충돌 해소 커밋도 다른 커밋과 똑같이 이 ancestry 규칙 하나로 판정한다.
  `resolver-self:`는 `carry:`와 함께 폐기된 영수증 형식이다(과거 기록만 읽는다).
- `impl_review`가 없거나 조상이 아니면 머지 게이트 **보류**다. terminal 실패가
  아니다. 큐는 그 head에 같은 리뷰 lineage를 1회 자동 dispatch한다(ADR 0019). 그
  1회가 소진되면 출구는 `[리뷰 후 머지]` 클릭이다 — 클릭은 `[머지]`와 같은
  authority를 주고 새 lineage가 아니라 기록된 세션의 같은 lineage를 resume한다.
  머지는 그대로 큐가 소유한다(ADR 0006).
- 이 저장소는 `[verify]`를 선언한다(`repo-ops/script/verify` — ADR 인덱스·인용
  검사와 `npm ci`, `npm run tsc`, `npm test`). base에 PR head를 squash-merge한
  일회용 candidate 체크아웃에서 돌기 때문에 tracked 파일을 쓰면 안 된다.
- 따라서 `gh pr checks`를 기다리거나 폴링하지 마라.
- 머지 전 검증은 Pre‑Handoff Validation(lint/tsc/test/prettier/build)으로
  수행한다. `[verify]`는 그것을 대체하지 않는다 — 머지 후보의 base 조합을 머지
  직전에 다시 확인하는 별개의 안전망이다.

## Pull Request Target

- When creating a PR from this repository, target the writable fork on `origin`
  by default.
- In this repo, that means creating PRs against `nakkulla/beads-ui`, not the
  read-only `upstream` remote.
- Treat `upstream` as a reference/sync remote unless the user explicitly asks to
  open a PR there.
