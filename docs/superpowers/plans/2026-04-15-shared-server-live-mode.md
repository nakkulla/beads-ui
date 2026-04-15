# Shared Beads UI Server Live Mode Implementation Plan

Parent bead: UI-vefj

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** `beads-ui` repo 안에서 `BDUI_FRONTEND_MODE=live`를 지원해 `app/**`
변경이 browser refresh만으로 반영되도록 만들고, 관련 운영 문서를 현재 repo
범위에서 truthfully 정리한다.

**Architecture:** `server/config.js`가 `BDUI_FRONTEND_MODE`를 해석하고,
`server/app.js`는 `frontend_mode === 'live'`일 때 `app/main.bundle.js` 존재
여부와 무관하게 on-demand bundle route를 우선 등록한다. `README.md`는
live/static 모드와 shared 운영 규칙을 현재 repo 관점에서 설명한다.

**Tech Stack:** Node.js, Express, esbuild, vitest, Beads (`bd`)

**Spec:** `docs/superpowers/specs/2026-04-15-shared-server-live-mode-design.md`

---

## Repo Boundary Note

이 parent scope는 원래 `beads-ui` + `dotfiles`를 함께 포함했지만, 현재
`bd-ralph-v2` 실행은 **단일 execution repo만** 허용한다. 따라서 이번 런은
`beads-ui` repo 범위만 실행한다.

### 이번 런에 포함하는 범위

- `BDUI_FRONTEND_MODE=live` 설정 해석 추가
- live mode일 때 `/main.bundle.js`를 on-demand bundle로 우선 서빙
- live/static 동작을 고정하는 테스트 추가
- `README.md`에 live mode 운영 규칙 반영

### 이번 런에서 의도적으로 제외하는 범위

- `dotfiles` repo의 shared wrapper / launchd / restart command / obsolete script
  정리

### Durable follow-up

- dotfiles 후속 bead: `dotfiles-6ch`
  (`shared beads-ui 운영 wrapper/launchd 정리 후속`)
- parent issue `UI-vefj`는 이 beads-ui slice와 dotfiles follow-up을 함께 봐야
  전체 scope가 완료된다.

## Working Context

- execution repo root: 현재 작업 디렉터리 (`beads-ui`)
- canonical worktree: `.worktrees/bd-ralph-v2-UI-vefj`
- sibling repo 변경은 이번 런에서 수행하지 않는다.

## File Structure

| Action | File                           | Responsibility                                        |
| ------ | ------------------------------ | ----------------------------------------------------- |
| Modify | `server/config.js`             | `BDUI_FRONTEND_MODE` 설정 해석 추가                   |
| Modify | `server/app.js`                | live mode일 때 on-demand bundle 우선 서빙             |
| Create | `server/app.live-mode.test.js` | live/static route 우선순위와 cache header 검증        |
| Modify | `README.md`                    | live mode 운영 규칙과 shared restart 기대 동작 문서화 |

---

### Task 1: `beads-ui` 서버 설정에 live frontend mode 추가

**Files:**

- Modify: `server/config.js`
- Modify: `server/app.js`
- Create: `server/app.live-mode.test.js`

- [ ] **Step 1: live/static 동작을 고정하는 테스트 작성**

`server/app.live-mode.test.js`를 새로 만들고 아래 두 상황을 분리해 검증한다.

1. `frontend_mode: 'live'` + bundle file exists → `/main.bundle.js`가 on-demand
   bundle route를 타며 `Cache-Control: no-store`를 반환한다.
2. `frontend_mode: 'static'` + bundle file exists → 정적 파일이 응답되고
   `Cache-Control: no-store`를 강제하지 않는다.

테스트 작성 원칙:

- 현재 `server/app.js`는 route 등록 시점에 bundle file 존재 여부를 읽으므로,
  file existence stub은 **route registration 조건을 명확히 제어하는 최소
  mock**으로 제한한다.
- 첫 테스트는 응답 body가 실제 bundle route 결과인지 확인하기 위해
  `application/javascript`와 `no-store`를 함께 본다.
- 둘째 테스트는 실제 repo의 `app/main.bundle.js`를 그대로 사용해 static
  fallback이 유지되는지 확인한다.

- [ ] **Step 2: 새 테스트가 실패하는지 확인**

Run:

```bash
npx vitest run server/app.live-mode.test.js
```

Expected: FAIL — 아직 `frontend_mode`가 config/app에 연결되지 않아 live-mode
assertion이 깨진다.

- [ ] **Step 3: config에 `frontend_mode` 추가**

`server/config.js`의 반환값에 `frontend_mode`를 추가한다.

```js
const frontend_mode_env = process.env.BDUI_FRONTEND_MODE;
const frontend_mode = frontend_mode_env === 'live' ? 'live' : 'static';
```

반환 객체와 `createApp` JSDoc에 `'live' | 'static'` 타입을 반영한다.

- [ ] **Step 4: `createApp()`에 live mode 분기 추가**

`server/app.js`에서 다음 원칙으로 route 등록 조건을 정리한다.

- `const bundle_missing = !fs.statSync(..., { throwIfNoEntry: false })`
- `const use_live_bundle = config.frontend_mode === 'live'`
- `if (use_live_bundle || bundle_missing)` 일 때 `/main.bundle.js` on-demand
  bundle route를 등록한다.

정적 `express.static(config.app_dir)`는 유지한다. 따라서 live mode에서는
`/main.bundle.js`만 최신 bundle을 반환하고 나머지 asset은 그대로 정적 제공한다.

- [ ] **Step 5: live mode 테스트 재실행**

Run:

```bash
npx vitest run server/app.live-mode.test.js
```

Expected: PASS

- [ ] **Step 6: 관련 서버 테스트 회귀 확인**

Run:

```bash
npx vitest run server/app.test.js server/cli/*.test.js server/ws*.test.js
```

Expected: PASS — config/app 변경이 server wiring과 CLI/WS 동작을 깨지 않는다.

---

### Task 2: `README.md`에 live mode 운영 규칙 반영

**Files:**

- Modify: `README.md`

- [ ] **Step 1: 삽입 위치를 현재 README 구조에 맞게 고정**

현재 README에서 다음 위치를 사용한다.

- `## Environment variables` 아래: `BDUI_FRONTEND_MODE` 설명 추가
- `## Developer Workflow` 아래: shared server live mode 운영 규칙 추가

- [ ] **Step 2: README 수정**

반영할 핵심 내용:

```md
- `BDUI_FRONTEND_MODE`: `live` forces on-demand bundling for `/main.bundle.js`;
  default is `static`.
```

그리고 `Developer Workflow` 아래에 새 subsection을 추가한다.

```md
### Shared server live mode

When the shared launchd-managed server runs with `BDUI_FRONTEND_MODE=live`:

- changes under `app/**` apply on browser refresh
- changes under `server/**` or `bin/**` require a shared server restart
- the canonical shared-service restart flow is managed outside this repo and is
  tracked separately in `dotfiles-6ch`
```

- [ ] **Step 3: formatting 확인**

Run:

```bash
npx prettier --check README.md server/config.js server/app.js server/app.live-mode.test.js
```

Expected: PASS

---

### Task 3: beads-ui slice 검증과 범위 정리

**Files:**

- Modify: none (verification + scope accounting)

- [ ] **Step 1: beads-ui 검증 실행**

Run:

```bash
npm run tsc
npm test
npm run lint
npx prettier --check README.md server/config.js server/app.js server/app.live-mode.test.js
```

Expected: PASS

- [ ] **Step 2: excluded scope를 최종 요약에 반영**

최종 요약에는 반드시 아래를 포함한다.

- completed scope: `beads-ui` repo live frontend mode + README updates
- intentionally excluded scope: `dotfiles` shared wrapper / launchd / restart
  command work
- follow-up bead: `dotfiles-6ch`

## Self-Review Checklist

### Spec coverage

- `BDUI_FRONTEND_MODE=live` 도입 → Task 1
- live mode에서 refresh 반영 → Task 1
- 운영 규칙 문서화(`app/**` vs `server/**`) → Task 2
- cross-repo excluded scope truthfulness → Task 3

### Placeholder scan

- `TODO` / `TBD` 없음
- 실제 execution repo 밖 작업은 follow-up bead로 분리됨
- 최종 요약에 completed/excluded/follow-up이 모두 남음

### Type / interface consistency

- config key는 `frontend_mode`
- env key는 `BDUI_FRONTEND_MODE`
- live/static 문자열은 `'live' | 'static'`

### Scope check

- 이번 plan은 현재 repo(`beads-ui`) 변경만 포함
- `dotfiles` 변경은 `dotfiles-6ch`로 추적
- HMR, shared launcher 교체, launchd reload 자동화는 이번 런 비포함
