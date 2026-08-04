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

- Run type checks: `npm run tsc`
- Run tests: `npm test`
- Run eslint: `npm run lint`
- Run prettier: `npm run prettier:write`
- After frontend source edits, run `npm run build` and include the updated
  `app/main.bundle.js` and `app/main.bundle.js.map`.

## Post‑Merge Runtime Validation

- **필수 마감 단계 — 머지는 완료가 아니다**: 이 저장소의 코드 수정은 공유 서비스
  배포까지 마쳐야 완료다. 머지 후 (1) `~/.config/bdui/config.toml` 런타임 설정
  정합을 확인하고, (2) `bdui-shared restart`로 공유 서버를 재시작한 뒤, (3) 아래
  검증(프로세스 경로·포트·HTTP 응답)을 통과한 다음에만 작업 완료를 선언한다.
- **배포 등록처는 루트 `deploy.json`이 아니다 — 재시작은 등록돼 있다**: 이
  저장소의 머지 후 재시작은 `~/.config/bdui/config.toml`의
  `[worker.deploy."<이 저장소 절대경로>"]`에 `cmd = ["bdui-shared", "restart"]`,
  `detached = true`로 등록돼 있고, 워커의 머지 후 정리 sweep이 실행한다. 단
  `detached = true`라 `CLEANUP_STEPS`의 `deploy` 단계에서 바로 뜨지 않는다 — 그
  단계는 명령을 `pending`으로 넘기기만 하고, 실제 `bdui-shared restart`는 나머지
  정리 단계가 모두 성공하고 durable 기록이 끝난 뒤 마지막에 launch된다
  (`server/worker/pr-actions.js` THE TERMINAL LAUNCH). 재시작이 이 서버 자신을
  죽이기 때문이다.
- **자동 경로는 이 서버의 [머지] 클릭으로 머지된 PR에만 걸린다**: github.com에서
  직접 머지한 PR은 external row로 **관측만 기록되고 정리가 자동으로 돌지
  않는다** (`server/worker/pr-poller.js` — 레인에 `머지됨 · 정리`가 뜨고 [정리]
  클릭이 단일 트리거다). 그리고 정리가 어느 단계에서든 멈추면 detached 배포는
  launch되지 않으므로 재시작도 일어나지 않는다. 그때 bead는 `pr_wait`에
  `resolved`로 남고 배너가 뜨며 자동 재시도는 없다 — 조용히 유실되지는 않지만,
  사람이 이어받아야 한다.
- 루트 `deploy.json`은 없고, 이 저장소에는 그 파일을 읽는 코드도 없다 — 새로
  만들어도 아무도 읽지 않는다. 따라서 workflow 계약의 post-merge continuity
  판정에서 `test -f deploy.json` 결과만으로 "커버리지 없음"을 결론짓지 마라.
  등록 위치가 다를 뿐 restart 커버리지는 존재한다. 이를 놓쳐 `worker-ineligible`
  라벨이 잘못 붙은 사례가 있다(UI-1xcd · UI-dixx · UI-u7hh; 계약 문구 정정은
  dotfiles `dotfiles-1tif`가 소유).
- **자동 배포는 재시작을 대신할 뿐 확인을 대신하지 않는다**: 자동 경로가
  돌았어도 위 (3)의 검증(프로세스 경로·포트·HTTP 응답)과 완료 선언 책임은 그대로
  남는다. 자동 경로가 성립하지 않았거나 정리가 멈췄다면 아래 수동 절차로 직접
  재시작·검증한다.
- After merging code changes into `main`, restart the actual server from the
  merged checkout before claiming the work is fully finished.
- If the merged change affects runtime behavior, re-run the modified program and
  verify that the real server process comes up from the merged workspace, not a
  stale worktree or pre-merge checkout.
- For frontend source changes, rebuild the static bundle from the merged
  checkout with `npm run build` before restarting or claiming the shared UI is
  current.
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

## GitHub Actions — 이 fork에서는 CI가 돌지 않는다

- `nakkulla/beads-ui` fork에서 `Build`(ci.yml) 워크플로는 push/PR 어느
  이벤트로도 트리거되지 않는다(2026-07-27 기준 실행 이력 0회, PR head 커밋에
  check-suite 미생성). GitHub CI를 활성화하지 않고 로컬 검증이 CI 역할을
  대신하는 것이 이 저장소의 결정이다.
- 따라서 PR 체크를 기다리지 마라: `gh pr checks` 결과가 비어 있으면 "체크 없음 =
  즉시 통과(vacuous pass)"로 처리하고 다음 단계로 진행한다.
- 체크 상태를 폴링해야 할 때도 반드시 유한 타임아웃을 두고, "체크가 1개 이상
  생길 때까지"(`length > 0`) 같은 존재 조건으로 대기하지 마라 — 이 저장소에선
  영원히 충족되지 않는다.
- 머지 전 검증은 Pre‑Handoff Validation(lint/tsc/test/prettier/build, 전체 약
  12초)으로 수행한다.

## Pull Request Target

- When creating a PR from this repository, target the writable fork on `origin`
  by default.
- In this repo, that means creating PRs against `nakkulla/beads-ui`, not the
  read-only `upstream` remote.
- Treat `upstream` as a reference/sync remote unless the user explicitly asks to
  open a PR there.
