# Global label display policy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 서버 전역 config로 Board / Issues / Epics 요약 영역의 label 표시 prefix 정책을 제어하고, bootstrap + reconnect refresh를 통해 같은 서버 인스턴스의 모든 클라이언트에 동일한 policy snapshot을 적용한다.

**Architecture:** `server/config.js`가 global config file을 읽어 `label_display_policy` snapshot을 반환하고, `server/app.js`는 `/` bootstrap HTML과 `GET /api/config`에서 같은 schema를 전달한다. `app/main.js`와 `app/state.js`는 이 snapshot을 canonical `config` branch로 유지하며, reconnect 후 재조회된 config가 rerender를 일으키도록 한다. `app/utils/label-badge.js`와 Board/List/Epics renderer는 store에서 받은 visible prefixes를 공통 filtering contract로 주입받아 같은 규칙으로 badge를 렌더링한다.

**Tech Stack:** Node.js, Express, lit-html, Vitest, esbuild

---

### Task 1: Add server-global label policy loading with safe fallback

**Files:**
- Modify: `server/config.js`
- Modify: `server/config.test.js`

- [ ] **Step 1: Write the failing config tests**

```js
import { afterEach, describe, expect, test } from 'vitest';
import { getConfig } from './config.js';

afterEach(() => {
  delete process.env.BDUI_CONFIG_PATH;
});

test('returns default visible prefixes when config file is missing', () => {
  const config = getConfig();

  expect(config.label_display_policy.visible_prefixes).toEqual([
    'has:',
    'reviewed:'
  ]);
});

test('reads visible prefixes from global config file', () => {
  process.env.BDUI_CONFIG_PATH = fixture_path;

  const config = getConfig();

  expect(config.label_display_policy.visible_prefixes).toEqual([
    'has:',
    'reviewed:',
    'area:',
    'component:'
  ]);
});

test('falls back when config contains only invalid prefixes', () => {
  process.env.BDUI_CONFIG_PATH = fixture_path;

  const config = getConfig();

  expect(config.label_display_policy.visible_prefixes).toEqual([
    'has:',
    'reviewed:'
  ]);
});

test('preserves explicit empty array to hide summary labels', () => {
  process.env.BDUI_CONFIG_PATH = fixture_path;

  const config = getConfig();

  expect(config.label_display_policy.visible_prefixes).toEqual([]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- server/config.test.js`
Expected: FAIL because `getConfig()` does not return `label_display_policy` yet.

- [ ] **Step 3: Implement config parsing in `server/config.js`**

```js
const DEFAULT_VISIBLE_PREFIXES = ['has:', 'reviewed:'];

function normalizeVisiblePrefixes(raw_value) {
  if (!Array.isArray(raw_value)) {
    return DEFAULT_VISIBLE_PREFIXES.slice();
  }

  const normalized = raw_value.filter(
    (value) => typeof value === 'string' && value.length > 0
  );

  return raw_value.length === 0
    ? []
    : normalized.length > 0
      ? normalized
      : DEFAULT_VISIBLE_PREFIXES.slice();
}

function readGlobalConfig(config_path) {
  try {
    const raw = fs.readFileSync(config_path, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      label_display_policy: {
        visible_prefixes: normalizeVisiblePrefixes(
          parsed?.labels?.visible_prefixes
        )
      }
    };
  } catch {
    return {
      label_display_policy: {
        visible_prefixes: DEFAULT_VISIBLE_PREFIXES.slice()
      }
    };
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- server/config.test.js`
Expected: PASS with default fallback, env override, invalid config fallback, and explicit `[]` coverage.

- [ ] **Step 5: Commit**

```bash
git add server/config.js server/config.test.js
git commit -m "계획: 전역 label policy config 로더 추가"
```

### Task 2: Bootstrap and refresh the server config snapshot into the client state

**Files:**
- Modify: `server/app.js`
- Modify: `server/app.test.js`
- Modify: `server/app.live-mode.test.js`
- Modify: `app/state.js`
- Modify: `app/state.test.js`
- Modify: `app/main.js`
- Create: `app/main.config-refresh.test.js`

- [ ] **Step 1: Write the failing bootstrap/state tests**

```js
test('serves bootstrapped root html with escaped config payload', async () => {
  const response = await fetch('/');
  const text = await response.text();

  expect(text).toContain('window.__BDUI_BOOTSTRAP__');
  expect(text).toContain('label_display_policy');
  expect(text).not.toContain('</script><script>');
});

test('returns the same config schema from GET /api/config', async () => {
  const response = await fetch('/api/config');
  const payload = await response.json();

  expect(payload).toEqual({
    label_display_policy: {
      visible_prefixes: ['has:', 'reviewed:', 'area:']
    }
  });
});

test('emits when config.visible_prefixes changes', () => {
  const store = createStore();
  const seen = [];
  const off = store.subscribe((state) => seen.push(state.config));

  store.setState({
    config: { label_display_policy: { visible_prefixes: ['has:', 'area:'] } }
  });

  off();
  expect(seen).toHaveLength(1);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- server/app.test.js server/app.live-mode.test.js app/state.test.js app/main.config-refresh.test.js`
Expected: FAIL because `/` still serves static `index.html`, `/api/config` does not exist, and `AppState` ignores `config` changes.

- [ ] **Step 3: Implement bootstrapped config delivery and reconnect refresh**

```js
function toBootstrapPayload(config) {
  return {
    label_display_policy: {
      visible_prefixes: config.label_display_policy.visible_prefixes.slice()
    }
  };
}

function escapeBootstrapJson(json) {
  return json
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

app.get('/api/config', (_req, res) => {
  res.json(toBootstrapPayload(config));
});

app.use(express.static(config.app_dir, { index: false }));
app.get('/', (_req, res) => {
  const html = fs.readFileSync(index_path, 'utf8');
  const payload = escapeBootstrapJson(JSON.stringify(toBootstrapPayload(config)));
  res.type('html').send(
    html.replace('</head>', `<script>window.__BDUI_BOOTSTRAP__=${payload};</script></head>`)
  );
});
```

```js
const store = createStore({
  config: window.__BDUI_BOOTSTRAP__ ?? {
    label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] }
  }
});

let had_disconnect = false;
client.onConnection(async (state) => {
  if (state === 'reconnecting' || state === 'closed') {
    had_disconnect = true;
    return;
  }
  if (state === 'open' && had_disconnect) {
    had_disconnect = false;
    const response = await fetch('/api/config');
    const config = await response.json();
    store.setState({ config });
  }
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- server/app.test.js server/app.live-mode.test.js app/state.test.js app/main.config-refresh.test.js`
Expected: PASS with bootstrapped `/`, schema-identical `/api/config`, and `config` state rerender coverage.

- [ ] **Step 5: Commit**

```bash
git add server/app.js server/app.test.js server/app.live-mode.test.js app/state.js app/state.test.js app/main.js app/main.config-refresh.test.js
git commit -m "계획: bootstrap config와 reconnect refresh 연결"
```

### Task 3: Replace hard-coded label filtering with policy-driven rendering

**Files:**
- Modify: `app/utils/label-badge.js`
- Modify: `app/utils/label-badge.test.js`
- Modify: `app/views/board.js`
- Modify: `app/views/list.js`
- Modify: `app/views/epics.js`
- Modify: `app/views/issue-row.js`
- Modify: `app/views/board.test.js`
- Modify: `app/views/list.test.js`
- Modify: `app/views/epics.test.js`
- Create: `app/views/issue-row.test.js`

- [ ] **Step 1: Write the failing label-policy tests**

```js
test('filters labels with configured visible prefixes', () => {
  expect(
    filterVisibleLabels(
      ['has:spec', 'reviewed:plan', 'area:auth', 'component:api'],
      ['area:', 'component:']
    )
  ).toEqual(['area:auth', 'component:api']);
});

test('board uses store config prefixes for card badges', async () => {
  const store = createStore({
    config: {
      label_display_policy: { visible_prefixes: ['area:'] }
    }
  });

  await view.load();

  expect(mount.textContent).toContain('area:auth');
  expect(mount.textContent).not.toContain('has:spec');
});

test('issue row renderer reads getVisibleLabelPrefixes', () => {
  const row = renderRow({ labels: ['agent:codex', 'has:plan'] });

  expect(row_html).toContain('agent:codex');
  expect(row_html).not.toContain('has:plan');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/utils/label-badge.test.js app/views/board.test.js app/views/list.test.js app/views/epics.test.js app/views/issue-row.test.js`
Expected: FAIL because the filter is still hard-coded to `has:` / `reviewed:` and row renderers do not accept policy input.

- [ ] **Step 3: Implement the policy-driven filter contract**

```js
export function filterVisibleLabels(labels, visible_prefixes) {
  if (!Array.isArray(labels) || !Array.isArray(visible_prefixes)) {
    return [];
  }

  return labels.filter((label) =>
    visible_prefixes.some((prefix) => label.startsWith(prefix))
  );
}
```

```js
const row_renderer = createIssueRowRenderer({
  navigate,
  onUpdate,
  requestRender,
  getSelectedId,
  getVisibleLabelPrefixes: () =>
    store.getState().config.label_display_policy.visible_prefixes
});
```

```js
const card_labels = filterVisibleLabels(
  it.labels,
  store.getState().config.label_display_policy.visible_prefixes
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/utils/label-badge.test.js app/views/board.test.js app/views/list.test.js app/views/epics.test.js app/views/issue-row.test.js`
Expected: PASS with Board / Issues / Epics all honoring the same prefix policy and neutral badge rendering for non-`has:` / non-`reviewed:` labels.

- [ ] **Step 5: Commit**

```bash
git add app/utils/label-badge.js app/utils/label-badge.test.js app/views/board.js app/views/list.js app/views/epics.js app/views/issue-row.js app/views/board.test.js app/views/list.test.js app/views/epics.test.js app/views/issue-row.test.js
git commit -m "계획: 전역 label policy로 요약 badge 렌더링 통합"
```

### Task 4: Regenerate static assets and run end-to-end verification

**Files:**
- Modify: `app/main.bundle.js`
- Modify: `app/main.bundle.js.map`
- Verify: `server/config.js`
- Verify: `server/app.js`
- Verify: `app/main.js`
- Verify: `app/utils/label-badge.js`

- [ ] **Step 1: Write the final regression assertions before bundling**

```js
test('bootstrapped non-default policy reaches board, issues, and epics consistently', async () => {
  expect(board_labels).toEqual(['area:auth']);
  expect(issue_row_labels).toEqual(['area:auth']);
  expect(epic_child_labels).toEqual(['area:auth']);
});

test('reconnect refresh updates rendered labels after config change', async () => {
  await simulateReconnectWithConfig(['agent:']);

  expect(rendered_labels).toEqual(['agent:codex']);
});
```

- [ ] **Step 2: Run the focused verification suite**

Run: `npm test -- server/config.test.js server/app.test.js server/app.live-mode.test.js app/state.test.js app/main.config-refresh.test.js app/utils/label-badge.test.js app/views/board.test.js app/views/list.test.js app/views/epics.test.js app/views/issue-row.test.js`
Expected: PASS for the full label-policy regression slice.

- [ ] **Step 3: Rebuild the static frontend bundle**

```bash
npm run build
```

Expected: `app/main.bundle.js` and `app/main.bundle.js.map` are regenerated from the updated source without build errors.

- [ ] **Step 4: Run full repo verification**

Run: `npm run tsc && npm test && npm run lint && npm run prettier:write`
Expected: all commands succeed; `prettier:write` may touch generated or legacy files, so review the resulting diff before the final commit.

- [ ] **Step 5: Commit**

```bash
git add app/main.bundle.js app/main.bundle.js.map server/config.js server/config.test.js server/app.js server/app.test.js server/app.live-mode.test.js app/state.js app/state.test.js app/main.js app/main.config-refresh.test.js app/utils/label-badge.js app/utils/label-badge.test.js app/views/board.js app/views/list.js app/views/epics.js app/views/issue-row.js app/views/board.test.js app/views/list.test.js app/views/epics.test.js app/views/issue-row.test.js
git commit -m "계획: 전역 label 표시 정책 구현 완료"
```
