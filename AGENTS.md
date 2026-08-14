# Agents

## Beads (bd) — Work Tracking

Use MCP `beads` (bd) as our dependency‑aware issue tracker. Run
`beads/quickstart` to learn how to use it.

### Issue Types

- `bug` - Something broken that needs fixing
- `feature` - New functionality
- `task` - Work item (tests, docs, refactoring)
- `epic` - Large feature composed of multiple issues
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
- `parent-child` - Epic/subtask relationship
- `discovered-from` - Track issues discovered during work

Only `blocks` dependencies affect the ready work queue.

### Structured Fields and Labels

- Use issue `type` and `priority` fields.
- Use issue type "epic" and `parent-child` dependencies.
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
`docs/contracts/workflow.{md,yaml}`에 있다. beads-ui는 그 계약의 **소비자**이며
정의자가 아니다.

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
- Run tests: `npm test`
- Run eslint: `npm run lint`
- Run prettier: `npm run prettier:write`
- After frontend source edits, run `npm run build` and include the updated
  `app/main.bundle.js` and `app/main.bundle.js.map`.

## Post‑Merge Runtime Validation

- **필수 마감 단계 — 머지는 완료가 아니다**: 이 저장소의 코드 수정은 공유 서비스
  배포까지 마쳐야 완료다. 머지 후 배포 operation이 terminal success에 도달하고
  아래 검증(프로세스 경로·포트·HTTP 응답)을 통과한 다음에만 작업 완료를
  선언한다.
- **배포 선언의 SoT이자 실행 표면은 `repo-ops/config.toml`의 `[deploy]`다.**
  Worker는 이 선언을 워킹트리가 아니라 **핀된 base SHA의 git blob**에서 읽으므로
  PR이 자기 검증·배포 명령을 정의할 수 없다 — 머지 전은 fetch된 target-base tip,
  머지 후는 `base_containment`가 확정한 SHA가 핀이다. 선언이 있으나 해석 불가면
  폴백 없이 fail-closed다.
- **실행 위치는 Worker가 소유한 영구 detached 워크트리
  `.worktrees/.repo-ops-deploy`**이며, 그 워크트리가 안정 런타임 소스다.
  candidate release 디렉터리나 `current` release symlink는 만들지 않는다.
  Worker는 fetch로 target SHA를 pin하고 그 워크트리를 exact 정렬한 뒤
  `repo-ops/script/deploy`를 one-shot으로 한 번 실행한다. 성공 조건은 script
  exit 0과 워크트리 `HEAD == target_sha`·tracked-clean readback뿐이며, Worker는
  health JSON이나 repo-specific 출력을 파싱하지 않는다.
- script는 `REPO_OPS_TARGET_SHA`·`REPO_OPS_TARGET_BASE`·`REPO_OPS_REPO_ROOT` 세
  변수만 받고, local HEAD 확인 → `npm ci` → `npm run build` →
  `bdui-shared restart` → bounded `/healthz`에서 source SHA와 realpath가 각각
  target SHA와 `REPO_OPS_REPO_ROOT`인지 확인 → exit 0 순서로 스스로 검증한다.
  재시작이 이 서버 자신을 죽이지만 one-shot executor는 detached라 살아남아 exit
  code와 log marker를 남기고, 재시작된 Worker가 같은 operation을 adoption한다.
- **정리 cursor**는
  `base_containment → repo_operations → child_sweep → branch_cleanup → parent_close`다.
  deploy operation이 succeeded가 되기 전에는 Bead를 close하지 않는다.
  `repo-ops/config.toml`이 없는 저장소는 legacy lane을 그대로 탄다(그 코드
  제거는 별도 단계).
- **자동 경로는 이 서버의 [머지] 클릭으로 머지된 PR에만 걸린다**: github.com에서
  직접 머지한 PR은 external row로 **관측만 기록되고 정리가 자동으로 돌지
  않는다** — 레인에 `머지됨 · 정리`가 뜨고 [정리] 클릭이 단일 트리거다.
- **실패했을 때**: verify script 실패·deploy script 실패·terminal exit 없는
  중단은 workspace 설정의 **`자동 해결`**(기본 ON) 아래에서 completion chain당
  **1회** 자동 repair session을 받는다. budget을 다 썼거나 같은 fingerprint가 새
  증거 없이 재현되면 자동은 멈추고 operation card의 실패 kind별 해결 버튼이
  입구다. 무엇이 자동이고 무엇이 아닌지는 설정 화면의 세 목록에 그대로 있으며,
  그 목록은 dotfiles가 소유한 정책 아티팩트에서 온다(문장 하드코딩 아님).
- **자동 배포는 재시작을 대신할 뿐 확인을 대신하지 않는다**: 자동 경로가
  돌았어도 아래 검증과 완료 선언 책임은 그대로 남는다. 자동 경로가 성립하지
  않았거나 정리가 멈췄다면 수동 절차로 직접 재시작·검증한다.
- 이 저장소의 실제 동작을 찾을 때 볼 곳: canonical `repo-ops/config.toml`,
  Worker/Monitor 설정 화면의 `자동 해결` 섹션과 세 목록, 그리고 dotfiles의
  workflow 계약(`docs/contracts/workflow.{md,yaml}`).
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
- **머지 자격 판정은 checks를 아예 보지 않는다.** 판정 입력은 네 가지뿐이다:
  fresh PR/base/head identity, clean mergeability, current workflow review
  영수증(`spec_review`·`impl_review`가 현재 head SHA에 결속), 그리고
  `repo-ops/config.toml`에 `[verify]`가 선언된 경우에만 그 verify 영수증. 이
  저장소는 `[verify]`를 선언하지 않는다.
- 따라서 `gh pr checks`를 기다리거나 폴링하지 마라. 빈 checks를 즉시 통과로
  취급하던 예전 특례는, 판정에서 checks 자체가 사라지면서 함께 없어졌다.
- 머지 전 검증은 Pre‑Handoff Validation(lint/tsc/test/prettier/build)으로
  수행한다.

## Pull Request Target

- When creating a PR from this repository, target the writable fork on `origin`
  by default.
- In this repo, that means creating PRs against `nakkulla/beads-ui`, not the
  read-only `upstream` remote.
- Treat `upstream` as a reference/sync remote unless the user explicitly asks to
  open a PR there.
