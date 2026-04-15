# Shared Beads UI Server Live Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** shared `beads-ui` 서버를 로컬 repo checkout에서 직접 실행하도록 정리하고, 프론트 변경이 refresh만으로 반영되는 live frontend mode와 shared restart 표준 명령을 도입한다.

**Architecture:** `beads-ui` repo에서는 `BDUI_FRONTEND_MODE=live` 설정이 켜졌을 때 `app/main.bundle.js` 존재 여부와 무관하게 on-demand bundling을 우선하는 서버 분기를 추가한다. `dotfiles` repo에서는 `launchd`가 호출하는 `bdui-server`를 repo-pinned wrapper로 단순화하고, `bdui-shared` 관리 스크립트를 추가한 뒤 obsolete 스크립트를 제거한다.

**Tech Stack:** Node.js, Express, esbuild, vitest, bash, launchd, Beads (`bd`)

**Spec:** `docs/superpowers/specs/2026-04-15-shared-server-live-mode-design.md`

---

## Working Context

이 계획은 **두 레포를 함께 수정**한다.

- `beads-ui` repo root: 현재 작업 디렉터리
- `dotfiles` repo root: `$HOME/Documents/GitHub/dotfiles`

이 계획 안의 `../dotfiles/...` 경로는 `beads-ui` repo 기준 sibling repo를 의미한다.

## File Structure

| Action | File | Responsibility |
| ------ | ---- | -------------- |
| Modify | `server/config.js` | `BDUI_FRONTEND_MODE` 설정 해석 추가 |
| Modify | `server/app.js` | live mode일 때 on-demand bundle 우선 서빙 |
| Create | `server/app.live-mode.test.js` | live/static bundle 우선순위와 cache header 검증 |
| Modify | `README.md` | live mode와 shared restart 운영 규칙 반영 |
| Modify | `../dotfiles/shell/bin/bdui-server` | repo 직접 실행 wrapper로 단순화 |
| Create | `../dotfiles/shell/bin/bdui-shared` | shared server restart/status/logs 표준 명령 |
| Modify | `../dotfiles/shell/launchd/com.beads-ui.server.plist` | 새 wrapper/운영 규칙과 일치하는 launchd 설정 유지 |
| Delete | `../dotfiles/shell/bin/bdui-deploy` | 전역 재설치 기반 deploy 흐름 제거 |
| Delete | `../dotfiles/shell/bin/bdui-dolt-sync` | background sync 유틸 제거 |
| Modify | `../dotfiles/CLAUDE.md` | shared restart canonical command와 live mode 정책 문서화 |

---

### Task 1: `beads-ui` 서버 설정에 live frontend mode 추가

**Files:**
- Modify: `server/config.js`
- Modify: `server/app.js`
- Create: `server/app.live-mode.test.js`

- [ ] **Step 1: live mode 우선순위 테스트 작성**

`server/app.live-mode.test.js`를 새로 만들고 다음 테스트를 추가한다.

```js
import fs from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createApp } from './app.js';

vi.mock('node:fs', async () => {
  const actual = await vi.importActual('node:fs');
  return {
    ...actual,
    statSync: vi.fn(actual.statSync)
  };
});

describe('createApp live frontend mode', () => {
  const app_dir = path.resolve('app');

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('serves on-demand bundle when frontend_mode is live even if bundle file exists', async () => {
    vi.spyOn(fs, 'statSync').mockReturnValue({ isFile: () => true });

    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'live'
    });
    const server = createServer(app);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = /** @type {import('node:net').AddressInfo} */ (server.address());

    const res = await fetch(`http://127.0.0.1:${address.port}/main.bundle.js`);
    const text = await res.text();

    server.close();

    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(res.headers.get('content-type')).toContain('application/javascript');
    expect(text).toContain('createHashRouter');
  });

  test('uses static bundle when frontend_mode is static and bundle file exists', async () => {
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = /** @type {import('node:net').AddressInfo} */ (server.address());

    const res = await fetch(`http://127.0.0.1:${address.port}/main.bundle.js`);

    server.close();

    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).not.toBe('no-store');
  });
});
```

- [ ] **Step 2: 새 테스트가 실패하는지 확인**

Run: `npx vitest run server/app.live-mode.test.js`
Expected: FAIL — `createApp()`이 `frontend_mode`를 받지 않거나 live mode 분기가 아직 없어서 첫 테스트가 실패한다.

- [ ] **Step 3: config에 `frontend_mode` 추가**

`server/config.js`의 반환값에 `frontend_mode`를 추가한다.

```js
export function getConfig() {
  // ...existing code...
  const frontend_mode_env = process.env.BDUI_FRONTEND_MODE;
  const frontend_mode = frontend_mode_env === 'live' ? 'live' : 'static';

  return {
    host: host_value,
    port: port_value,
    app_dir: path.resolve(package_root, 'app'),
    root_dir,
    frontend_mode,
    url: `http://${host_value}:${port_value}`
  };
}
```

`createApp` JSDoc도 함께 갱신한다.

```js
 * @param {{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode?: 'live' | 'static' }} config
```

- [ ] **Step 4: `createApp()`에 live mode 분기 추가**

`server/app.js`에서 `bundle_missing` 여부만 보지 말고 `config.frontend_mode === 'live'` 일 때 on-demand bundle 라우트를 우선 등록한다.

```js
const bundle_missing = !fs.statSync(path.resolve(config.app_dir, 'main.bundle.js'), {
  throwIfNoEntry: false
});
const use_live_bundle = config.frontend_mode === 'live';

if (use_live_bundle || bundle_missing) {
  app.get('/main.bundle.js', async (_req, res) => {
    try {
      const esbuild = await import('esbuild');
      const entry = path.join(config.app_dir, 'main.js');
      const result = await esbuild.build({
        entryPoints: [entry],
        bundle: true,
        format: 'esm',
        platform: 'browser',
        target: 'es2020',
        sourcemap: 'inline',
        minify: false,
        write: false
      });
      const out = result.outputFiles && result.outputFiles[0];
      if (!out) {
        res.status(500).type('text/plain').send('Bundle failed: no output');
        return;
      }
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.send(out.text);
    } catch (err) {
      res
        .status(500)
        .type('text/plain')
        .send('Bundle error: ' + (err && /** @type {any} */ (err).message));
    }
  });
}
```

정적 `express.static(config.app_dir)`는 그대로 유지한다. live mode에서는 `/main.bundle.js` 라우트가 먼저 잡혀 최신 bundle을 반환하고, 나머지 asset은 정적 제공한다.

- [ ] **Step 5: live mode 테스트 재실행**

Run: `npx vitest run server/app.live-mode.test.js`
Expected: PASS

- [ ] **Step 6: 관련 서버 테스트도 회귀 확인**

Run: `npx vitest run server/cli/*.test.js server/ws*.test.js`
Expected: PASS — config/app 변경이 다른 서버 동작을 깨지 않아야 한다.

- [ ] **Step 7: Commit (optional checkpoint)**

```bash
git add server/config.js server/app.js server/app.live-mode.test.js
git commit -m "feat: live frontend mode 지원 추가"   # 수동 checkpoint가 필요할 때만
```

---

### Task 2: `beads-ui` 문서에 live mode 운영 규칙 반영

**Files:**
- Modify: `README.md`

- [ ] **Step 1: README 운영 문구 테스트처럼 점검할 문장 초안 작성**

`README.md`의 Setup / Developer Workflow / Environment variables 섹션에 아래 정보를 반영할 위치를 정한다.

추가해야 할 핵심 문장:

```md
- `BDUI_FRONTEND_MODE=live` enables on-demand bundling for `/main.bundle.js` even when `app/main.bundle.js` exists.
- In live mode, frontend changes apply on browser refresh.
- Server-side changes still require a shared server restart.
```

- [ ] **Step 2: README 수정**

아래 형태로 문서를 반영한다.

```md
## Environment variables

- `BDUI_FRONTEND_MODE`: `live` forces on-demand bundling for `/main.bundle.js`; default is `static`.
```

Developer Workflow 섹션에는 아래 예시를 추가한다.

```md
### Shared server live mode

When the shared launchd-managed server runs with `BDUI_FRONTEND_MODE=live`:
- changes under `app/**` apply on browser refresh
- changes under `server/**` or `bin/**` require a shared server restart
```

- [ ] **Step 3: formatting 확인**

Run: `npm run prettier:check`
Expected: PASS

- [ ] **Step 4: Commit (optional checkpoint)**

```bash
git add README.md
git commit -m "docs: live frontend mode 운영 규칙 추가"   # 수동 checkpoint가 필요할 때만
```

---

### Task 3: `dotfiles`의 `bdui-server`를 repo-pinned wrapper로 단순화

**Files:**
- Modify: `../dotfiles/shell/bin/bdui-server`

- [ ] **Step 1: 현재 스크립트 백업 diff를 읽고 제거 대상 블록 표시**

제거 대상 로직:
- global npm root 탐색
- nvm global install 탐색
- global install 부재 시 install 안내

남길 로직:
- `HOME` / `PATH` 정리
- default workspace 결정
- foreground 실행

- [ ] **Step 2: `bash -n` 기준으로 새 wrapper 초안 작성**

`../dotfiles/shell/bin/bdui-server`를 아래 구조로 정리한다.

```bash
#!/bin/bash
set -euo pipefail

export HOME="${HOME:-$(eval echo ~)}"
export PATH="$HOME/.local/bin:$HOME/bin:/usr/local/bin:/usr/bin:/bin"

if [ -d "$HOME/.nvm/versions/node" ]; then
    NVM_NODE="$(ls -1d "$HOME/.nvm/versions/node/"v* 2>/dev/null | sort -V | tail -1)"
    [ -n "$NVM_NODE" ] && export PATH="$NVM_NODE/bin:$PATH"
fi

NODE_BIN="${NODE_BIN:-$(command -v node || true)}"
REPO_DIR="${BDUI_REPO_DIR:-$HOME/Documents/GitHub/beads-ui}"
SERVER_ENTRY="$REPO_DIR/server/index.js"
DEFAULT_WORKSPACE_CONFIG="${BDUI_DEFAULT_WORKSPACE_CONFIG:-$HOME/.config/bdui-default-workspace}"
WORKSPACES_CONFIG="${BDUI_WORKSPACES_CONFIG:-$HOME/.config/bdui-workspaces.conf}"

if [ -z "$NODE_BIN" ]; then
    echo "$(date -Iseconds) ERROR: node not found in PATH" >&2
    exit 1
fi

if [ ! -f "$SERVER_ENTRY" ]; then
    echo "$(date -Iseconds) ERROR: beads-ui repo entry not found: $SERVER_ENTRY" >&2
    exit 1
fi
```

기존 default workspace 선택 로직은 유지하되, 마지막 실행은 아래로 고정한다.

```bash
export BDUI_FRONTEND_MODE="${BDUI_FRONTEND_MODE:-live}"
cd "${DEFAULT_WORKSPACE:-$HOME}"
exec "$NODE_BIN" "$SERVER_ENTRY" --host 0.0.0.0 --port 3000
```

- [ ] **Step 3: shell syntax 검증**

Run: `bash -n ../dotfiles/shell/bin/bdui-server`
Expected: PASS

- [ ] **Step 4: missing repo path 에러 동작 확인**

Run: `BDUI_REPO_DIR=/tmp/does-not-exist ../dotfiles/shell/bin/bdui-server`
Expected: stderr에 `repo entry not found`가 출력되고 non-zero exit

- [ ] **Step 5: live mode 기본값 확인**

Run: `BDUI_REPO_DIR=$(pwd) BDUI_FRONTEND_MODE=live ../dotfiles/shell/bin/bdui-server`
Expected: 서버가 foreground로 뜨고 `/healthz` 응답 가능

별도 터미널에서:

```bash
curl -fsS http://127.0.0.1:3000/healthz
```

Expected: `{"ok":true}`

검증 후 서버를 종료한다.

- [ ] **Step 6: Commit (optional checkpoint)**

```bash
git -C ../dotfiles add shell/bin/bdui-server
git -C ../dotfiles commit -m "feat: bdui-server를 repo 직접 실행 wrapper로 단순화"   # 수동 checkpoint가 필요할 때만
```

---

### Task 4: `bdui-shared` shared service 관리 스크립트 추가

**Files:**
- Create: `../dotfiles/shell/bin/bdui-shared`

- [ ] **Step 1: 관리 인터페이스 스크립트 작성**

`../dotfiles/shell/bin/bdui-shared`를 새로 만든다.

```bash
#!/bin/bash
set -euo pipefail

LABEL="com.beads-ui.server"
DOMAIN="gui/$(id -u)"
SERVICE="$DOMAIN/$LABEL"
BASE_URL="${BDUI_SHARED_URL:-http://127.0.0.1:3000}"
LOG_OUT="${BDUI_SHARED_LOG_OUT:-${TMPDIR:-/tmp}/beads-ui.log}"
LOG_ERR="${BDUI_SHARED_LOG_ERR:-${TMPDIR:-/tmp}/beads-ui.err}"
CMD="${1:-}"

case "$CMD" in
  restart)
    launchctl kickstart -k "$SERVICE"
    ;;
  status)
    launchctl print "$SERVICE" >/dev/null
    curl -fsS "$BASE_URL/healthz"
    ;;
  logs)
    tail -f "$LOG_OUT" "$LOG_ERR"
    ;;
  *)
    echo "Usage: bdui-shared {restart|status|logs}" >&2
    exit 1
    ;;
esac
```

- [ ] **Step 2: shell syntax 검증**

Run: `bash -n ../dotfiles/shell/bin/bdui-shared`
Expected: PASS

- [ ] **Step 3: usage 동작 확인**

Run: `../dotfiles/shell/bin/bdui-shared`
Expected: non-zero exit with `Usage: bdui-shared {restart|status|logs}`

- [ ] **Step 4: status 동작 확인**

Run: `../dotfiles/shell/bin/bdui-shared status`
Expected: launchd service가 실행 중이면 health JSON 출력 (`{"ok":true}`)

- [ ] **Step 5: restart 동작 확인**

Run: `../dotfiles/shell/bin/bdui-shared restart`
Expected: exit code 0

그 직후:

```bash
../dotfiles/shell/bin/bdui-shared status
```

Expected: service 정상 + healthz 응답

- [ ] **Step 6: executable bit와 commit 준비**

Run: `chmod +x ../dotfiles/shell/bin/bdui-shared`
Expected: 파일 실행 가능

- [ ] **Step 7: Commit (optional checkpoint)**

```bash
git -C ../dotfiles add shell/bin/bdui-shared
git -C ../dotfiles commit -m "feat: shared beads-ui 관리 스크립트 추가"   # 수동 checkpoint가 필요할 때만
```

---

### Task 5: launchd 설정을 새 wrapper 정책에 맞게 유지 확인

**Files:**
- Modify: `../dotfiles/shell/launchd/com.beads-ui.server.plist`

- [ ] **Step 1: plist가 계속 `bdui-server` wrapper를 호출하는지 확인**

확인할 핵심 내용:

```xml
<key>ProgramArguments</key>
<array>
    <string>__HOME__/bin/bdui-server</string>
</array>
```

wrapper가 canonical entrypoint이므로 이 구조는 유지한다.

- [ ] **Step 2: 로그 경로 문구가 `bdui-shared logs` 기본값과 충돌하는지 확인**

현재 plist의 로그 파일 예시:

```xml
<key>StandardOutPath</key>
<string>__TMP_DIR__/beads-ui.log</string>
<key>StandardErrorPath</key>
<string>__TMP_DIR__/beads-ui.err</string>
```

`bdui-shared` 기본값이 같은 경로 규칙을 따르도록 필요 시 주석/문구를 맞춘다.

- [ ] **Step 3: plist 수정이 필요하면 최소 수정 적용**

예를 들어 주석 또는 이름 정렬만 필요한 경우에만 최소 수정한다. launchd label `com.beads-ui.server`는 바꾸지 않는다.

- [ ] **Step 4: plist lint 확인**

Run: `plutil -lint ../dotfiles/shell/launchd/com.beads-ui.server.plist`
Expected: `OK`

- [ ] **Step 5: launchd 재적용 후 restart 확인**

Run:

```bash
launchctl unload ~/Library/LaunchAgents/com.beads-ui.server.plist 2>/dev/null || true
launchctl load ~/Library/LaunchAgents/com.beads-ui.server.plist
../dotfiles/shell/bin/bdui-shared restart
```

Expected: reload 성공 후 service 정상 기동

- [ ] **Step 6: Commit (optional checkpoint)**

```bash
git -C ../dotfiles add shell/launchd/com.beads-ui.server.plist
git -C ../dotfiles commit -m "chore: launchd shared server 설정 정리"   # 수동 checkpoint가 필요할 때만
```

---

### Task 6: obsolete 스크립트 제거와 운영 문서 정리

**Files:**
- Delete: `../dotfiles/shell/bin/bdui-deploy`
- Delete: `../dotfiles/shell/bin/bdui-dolt-sync`
- Modify: `../dotfiles/CLAUDE.md`

- [ ] **Step 1: obsolete 스크립트 참조 검색**

Run: `rg -n "bdui-deploy|bdui-dolt-sync|launchctl kickstart|bdui restart" ../dotfiles`
Expected: 어떤 문서/스크립트가 옛 흐름을 참조하는지 목록 확인

- [ ] **Step 2: 운영 지침을 새 canonical flow로 수정**

문서에는 아래 정책을 반영한다.

```md
- Shared `beads-ui` server is managed by `launchd`.
- Use `bdui-shared restart` as the canonical shared-service restart command.
- In live mode, changes under `app/**` apply on browser refresh.
- Changes under `server/**` and `bin/**` require shared restart.
- `bdui restart` is not the canonical shared-service restart path.
```

- [ ] **Step 3: obsolete 스크립트 삭제**

Run:

```bash
rm -f ../dotfiles/shell/bin/bdui-deploy
rm -f ../dotfiles/shell/bin/bdui-dolt-sync
```

Expected: 두 파일이 제거됨

- [ ] **Step 4: 삭제 후 참조 재검사**

Run: `rg -n "bdui-deploy|bdui-dolt-sync" ../dotfiles`
Expected: 의도된 역사 문서 외에는 active reference가 남지 않음

- [ ] **Step 5: dotfiles 변경 상태 확인**

Run: `git -C ../dotfiles status --short`
Expected: 삭제/문서 수정/새 스크립트 추가만 표시

- [ ] **Step 6: Commit (optional checkpoint)**

```bash
git -C ../dotfiles add -A
git -C ../dotfiles commit -m "chore: beads-ui shared server 운영 흐름 정리"   # 수동 checkpoint가 필요할 때만
```

---

### Task 7: 전체 검증과 최종 정리

**Files:**
- Modify: none (verification task)

- [ ] **Step 1: `beads-ui` 정적 검증 실행**

Run:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

Expected: all PASS

- [ ] **Step 2: shared server live mode 수동 검증**

Run:

```bash
../dotfiles/shell/bin/bdui-shared restart
open "http://100.122.98.8:3000/#/board"
```

Expected: board 접근 가능

그 다음 `app/main.js` 또는 작은 UI 문구를 임시로 수정하고 브라우저 refresh로 반영되는지 확인한다.

- [ ] **Step 3: server-side restart 검증**

`server/index.js` 또는 `server/app.js`에 식별 가능한 로그/문구를 임시 추가한 뒤 아래 실행:

```bash
../dotfiles/shell/bin/bdui-shared restart
../dotfiles/shell/bin/bdui-shared status
```

Expected: restart 후 변경 반영 + healthz 정상

검증이 끝나면 임시 변경은 최종 구현 상태에 맞게 정리한다.

- [ ] **Step 4: dotfiles side 검증 요약 기록**

아래 항목을 작업 노트/PR 설명에 남긴다.

```md
- live mode refresh verified
- shared restart command verified
- launchd auto-recovery path verified or scheduled for manual reboot check
- obsolete scripts removed
```

- [ ] **Step 5: final checkpoint 확인**

Run:

```bash
git status --short
git -C ../dotfiles status --short
```

Expected: 변경 범위가 plan과 일치

## Self-Review Checklist

### Spec coverage

- shared server를 local repo checkout에서 직접 실행 → Task 3, Task 5
- live frontend mode 도입 → Task 1
- shared restart 표준 명령 `bdui-shared` → Task 4
- `bdui-deploy` / `bdui-dolt-sync` 제거 → Task 6
- 운영 지침 갱신 → Task 2, Task 6
- 전체 검증 → Task 7

### Placeholder scan

- `TODO` / `TBD` 없음
- 모든 삭제/추가/수정 파일 경로 명시
- 각 task에 명령과 기대 결과 포함

### Type / interface consistency

- config key는 일관되게 `frontend_mode`
- env key는 일관되게 `BDUI_FRONTEND_MODE`
- shared 관리 명령은 일관되게 `bdui-shared`

### Scope check

- 이번 plan은 spec 범위 안에 있는 두 레포 변경만 포함
- background sync 기능 재설계나 HMR 같은 비목표 작업은 포함하지 않음
