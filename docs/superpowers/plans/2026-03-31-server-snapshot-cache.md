# Server Snapshot Cache Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** subscribe-list 요청 시 서버 메모리 캐시에서 즉시 snapshot을 반환하여 초기 로딩 성능을 개선한다.

**Architecture:** `SubscriptionRegistry`의 Entry에 `cachedSnapshot` (immutable array reference)을 추가하고, 새 구독자에게 캐시된 데이터를 즉시 전송한 뒤 백그라운드에서 bd를 호출해 delta를 반영한다. workspace 전환 시 generation counter로 stale refresh를 방지한다.

**Tech Stack:** Node.js, vitest, WebSocket (ws)

**Spec:** `docs/superpowers/specs/2026-03-31-server-snapshot-cache-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `server/subscriptions.js` | Entry에 `cachedSnapshot` 추가, eviction 정책 변경, generation counter |
| Modify | `server/ws.js` | 캐시 히트 분기, `setCachedSnapshot`, `scheduleBackgroundRefresh`, generation guard |
| Modify | `server/subscriptions.test.js` | `cachedSnapshot`, eviction 변경, generation counter 테스트 |
| Create | `server/ws.snapshot-cache.test.js` | 캐시 히트/미스, 백그라운드 refresh, generation guard 통합 테스트 |

---

### Task 1: Entry에 `cachedSnapshot` 필드 추가

**Files:**
- Modify: `server/subscriptions.js:41-47` (`createEntry` 함수)
- Modify: `server/subscriptions.test.js`

- [ ] **Step 1: `cachedSnapshot` 필드 존재 확인 테스트 작성**

`server/subscriptions.test.js` 끝에 추가:

```js
test('createEntry includes cachedSnapshot initialized to null', () => {
  const reg = new SubscriptionRegistry();
  const spec = { type: 'test-cache' };
  const { entry } = reg.ensure(spec);
  expect(entry.cachedSnapshot).toBeNull();
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run server/subscriptions.test.js -t "cachedSnapshot"`
Expected: FAIL — `entry.cachedSnapshot` is `undefined`

- [ ] **Step 3: `createEntry`에 `cachedSnapshot: null` 추가**

`server/subscriptions.js`의 `createEntry` 함수를 수정:

```js
function createEntry() {
  return {
    itemsById: new Map(),
    cachedSnapshot: null,
    subscribers: new Set(),
    lock: Promise.resolve()
  };
}
```

JSDoc typedef도 업데이트:

```js
/**
 * @typedef {{
 *   itemsById: Map<string, ItemMeta>,
 *   cachedSnapshot: Array<Record<string, unknown>> | null,
 *   subscribers: Set<WebSocket>,
 *   lock: Promise<void>
 * }} Entry
 */
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run server/subscriptions.test.js -t "cachedSnapshot"`
Expected: PASS

- [ ] **Step 5: 전체 subscriptions 테스트 통과 확인**

Run: `npx vitest run server/subscriptions.test.js`
Expected: 모든 테스트 PASS (기존 테스트가 깨지지 않아야 함)

- [ ] **Step 6: Commit (optional checkpoint)**

```bash
git add server/subscriptions.js server/subscriptions.test.js
git commit -m "feat: Entry에 cachedSnapshot 필드 추가"   # 수동 checkpoint가 필요할 때만
```

---

### Task 2: Eviction 정책 변경 — `onDisconnect`에서 entry 유지

**Files:**
- Modify: `server/subscriptions.js:201-213` (`onDisconnect` 메서드)
- Modify: `server/subscriptions.test.js`

- [ ] **Step 1: 새 eviction 동작 테스트 작성**

`server/subscriptions.test.js`에 추가:

```js
test('onDisconnect removes subscriber but preserves entry for caching', () => {
  const reg = new SubscriptionRegistry();
  /** @type {any} */
  const ws = { OPEN: 1, readyState: 1, send: vi.fn() };
  const spec = { type: 'cache-test' };
  const { key } = reg.attach(spec, ws);

  // entry가 존재하고 subscriber가 있는지 확인
  expect(reg.get(key)?.subscribers.size).toBe(1);

  // disconnect 후에도 entry가 유지되어야 함
  reg.onDisconnect(ws);
  const entry = reg.get(key);
  expect(entry).not.toBeNull();
  expect(entry?.subscribers.size).toBe(0);
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run server/subscriptions.test.js -t "preserves entry"`
Expected: FAIL — 현재 `onDisconnect`가 subscriber가 0이 되면 entry를 삭제함

- [ ] **Step 3: `onDisconnect` 수정 — entry 삭제 제거**

`server/subscriptions.js`의 `onDisconnect` 메서드를 수정:

```js
onDisconnect(ws) {
  for (const [, entry] of this._entries) {
    entry.subscribers.delete(ws);
  }
}
```

기존 코드에서 `empties` 배열과 삭제 루프를 완전히 제거한다.

- [ ] **Step 4: 새 테스트 통과 확인**

Run: `npx vitest run server/subscriptions.test.js -t "preserves entry"`
Expected: PASS

- [ ] **Step 5: 기존 eviction 테스트 업데이트**

기존 `'attach/detach and disconnect-driven eviction'` 테스트의 마지막 4줄 (lines 99-102)을 교체:

교체 대상 (old):
```js
    // Disconnecting B should sweep it and remove empty entry
    reg.onDisconnect(ws_b);
    const entry3 = reg.get(key);
    expect(entry3).toBeNull();
```

교체 내용 (new):
```js
    // Disconnecting B should sweep it but preserve entry for caching
    reg.onDisconnect(ws_b);
    const entry3 = reg.get(key);
    expect(entry3).not.toBeNull();
    expect(entry3?.subscribers.size).toBe(0);
```

- [ ] **Step 6: 전체 테스트 통과 확인**

Run: `npx vitest run server/subscriptions.test.js`
Expected: 모든 테스트 PASS

- [ ] **Step 7: ws.list-subscriptions 테스트도 확인**

Run: `npx vitest run server/ws.list-subscriptions.test.js`
Expected: 모든 테스트 PASS (eviction 관련 assertion이 깨질 수 있으므로 확인 필수)

> **주의**: `server/ws.list-subscriptions.test.js`의 `'unsubscribe-list detaches and disconnect sweep evicts entry'` 테스트는 현재 entry 삭제를 직접 assert하지 않지만 (`// Do not assert full eviction here due to global registry`) 다른 테스트와의 간접적 의존성을 확인해야 한다.

- [ ] **Step 8: Commit (optional checkpoint)**

```bash
git add server/subscriptions.js server/subscriptions.test.js
git commit -m "feat: onDisconnect에서 entry 삭제 제거 (캐시 보존)"   # 수동 checkpoint가 필요할 때만
```

---

### Task 3: Generation counter 추가

**Files:**
- Modify: `server/subscriptions.js` (constructor, `clear`, getter)
- Modify: `server/subscriptions.test.js`

- [ ] **Step 1: generation counter 테스트 작성**

`server/subscriptions.test.js`에 추가:

```js
test('generation counter starts at 0 and increments on clear', () => {
  const reg = new SubscriptionRegistry();
  expect(reg.generation).toBe(0);

  reg.clear();
  expect(reg.generation).toBe(1);

  reg.clear();
  expect(reg.generation).toBe(2);
});

test('clear removes all entries and increments generation', () => {
  const reg = new SubscriptionRegistry();
  /** @type {any} */
  const ws = { OPEN: 1, readyState: 1, send: vi.fn() };
  const { key } = reg.attach({ type: 'gen-test' }, ws);
  expect(reg.get(key)).not.toBeNull();

  const gen_before = reg.generation;
  reg.clear();
  expect(reg.get(key)).toBeNull();
  expect(reg.generation).toBe(gen_before + 1);
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run server/subscriptions.test.js -t "generation"`
Expected: FAIL — `reg.generation` is `undefined`

- [ ] **Step 3: SubscriptionRegistry에 generation counter 구현**

`server/subscriptions.js`의 `SubscriptionRegistry` class를 수정:

```js
export class SubscriptionRegistry {
  constructor() {
    /** @type {Map<string, Entry>} */
    this._entries = new Map();
    /** @type {number} */
    this._generation = 0;
  }

  /** @returns {number} */
  get generation() {
    return this._generation;
  }

  // ... 기존 메서드들 유지 ...

  clear() {
    this._entries.clear();
    this._generation++;
  }
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run server/subscriptions.test.js -t "generation"`
Expected: PASS

- [ ] **Step 5: 전체 테스트 통과 확인**

Run: `npx vitest run server/subscriptions.test.js`
Expected: 모든 테스트 PASS

- [ ] **Step 6: Commit (optional checkpoint)**

```bash
git add server/subscriptions.js server/subscriptions.test.js
git commit -m "feat: SubscriptionRegistry에 generation counter 추가"   # 수동 checkpoint가 필요할 때만
```

---

### Task 4: `setCachedSnapshot` 헬퍼 및 `refreshAndPublish` 캐시 갱신

**Files:**
- Modify: `server/ws.js:337-390` (`refreshAndPublish`, 새 헬퍼 함수)
- Create: `server/ws.snapshot-cache.test.js`

- [ ] **Step 1: setCachedSnapshot + refreshAndPublish 캐시 갱신 테스트 작성**

새 파일 `server/ws.snapshot-cache.test.js` 생성:

```js
import { createServer } from 'node:http';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { fetchListForSubscription } from './list-adapters.js';
import { keyOf, registry } from './subscriptions.js';
import { attachWsServer, handleMessage, scheduleListRefresh } from './ws.js';

vi.mock('./list-adapters.js', () => ({
  fetchListForSubscription: vi.fn(async () => ({
    ok: true,
    items: [
      { id: 'A', updated_at: 1, closed_at: null },
      { id: 'B', updated_at: 1, closed_at: null }
    ]
  }))
}));

describe('snapshot cache', () => {
  afterEach(() => {
    registry.clear();
  });

  test('subscribe-list populates cachedSnapshot on cold path', async () => {
    const server = createServer();
    attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });

    const sock = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) { this.sent.push(String(msg)); }
    };

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(JSON.stringify({
        id: 'sub-cold',
        type: /** @type {any} */ ('subscribe-list'),
        payload: { id: 'c-cold', type: 'all-issues' }
      }))
    );

    const key = keyOf({ type: 'all-issues' });
    const entry = registry.get(key);
    expect(entry?.cachedSnapshot).not.toBeNull();
    expect(entry?.cachedSnapshot?.length).toBe(2);
  });

  test('refreshAndPublish updates cachedSnapshot', async () => {
    vi.useFakeTimers();
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });

    const sock = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) { this.sent.push(String(msg)); }
    };
    wss.clients.add(/** @type {any} */ (sock));

    // Cold subscribe
    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(JSON.stringify({
        id: 'sub-refresh',
        type: /** @type {any} */ ('subscribe-list'),
        payload: { id: 'c-refresh', type: 'ready-issues' }
      }))
    );

    const key = keyOf({ type: 'ready-issues' });

    // Mock changed data
    const mock = /** @type {import('vitest').Mock} */ (fetchListForSubscription);
    mock.mockResolvedValueOnce({
      ok: true,
      items: [
        { id: 'A', updated_at: 2, closed_at: null },
        { id: 'C', updated_at: 1, closed_at: null }
      ]
    });

    // Trigger refresh
    scheduleListRefresh();
    await vi.advanceTimersByTimeAsync(60);

    const entry = registry.get(key);
    expect(entry?.cachedSnapshot?.length).toBe(2);
    const ids = entry?.cachedSnapshot?.map((it) => it.id).sort();
    expect(ids).toEqual(['A', 'C']);

    vi.useRealTimers();
  });
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js`
Expected: FAIL — `cachedSnapshot`이 `null`로 남아 있음

- [ ] **Step 3: `setCachedSnapshot` 헬퍼 구현**

`server/ws.js`에서 `refreshAndPublish` 함수 바로 위에 추가:

```js
/**
 * Replace the cachedSnapshot for a registry entry via atomic reference swap.
 * Safe to read without locks because the reference is replaced, not mutated.
 *
 * @param {string} key
 * @param {Array<Record<string, unknown>>} items
 */
function setCachedSnapshot(key, items) {
  const entry = registry.get(key);
  if (!entry) return;
  entry.cachedSnapshot = items.filter((it) => it && typeof it.id === 'string');
}
```

- [ ] **Step 4: `refreshAndPublish`에서 `setCachedSnapshot` 호출 추가**

`server/ws.js`의 `refreshAndPublish` 함수에서 `registry.applyItems(key, items)` 직후에 추가:

```js
const delta = registry.applyItems(key, items);

// cachedSnapshot 갱신 (같은 lock 안에서 applyItems 직후)
setCachedSnapshot(key, items);
```

- [ ] **Step 5: subscribe-list cold path에서도 `setCachedSnapshot` 호출 추가**

`server/ws.js`의 subscribe-list 핸들러 (line 666-673)에서, `withKeyLock` 콜백 안에 `setCachedSnapshot` 호출을 추가한다. `items` 변수는 이 콜백 스코프 안에서 선언되어 있다:

교체 대상 (old — `withKeyLock` 블록 전체):
```js
      await registry.withKeyLock(attached_key, async () => {
        const items = applyClosedIssuesFilter(
          spec,
          initial ? initial.items : []
        );
        void registry.applyItems(attached_key, items);
        emitSubscriptionSnapshot(ws, client_id, attached_key, items);
      });
```

교체 내용 (new):
```js
      await registry.withKeyLock(attached_key, async () => {
        const items = applyClosedIssuesFilter(
          spec,
          initial ? initial.items : []
        );
        void registry.applyItems(attached_key, items);
        setCachedSnapshot(attached_key, items);
        emitSubscriptionSnapshot(ws, client_id, attached_key, items);
      });
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js`
Expected: PASS

- [ ] **Step 7: 기존 ws 테스트 통과 확인**

Run: `npx vitest run server/ws.list-subscriptions.test.js server/ws.test.js server/ws.mutation-window.test.js server/ws.list-refresh.coalesce.test.js`
Expected: 모든 테스트 PASS

- [ ] **Step 8: Commit**

```bash
git add server/ws.js server/ws.snapshot-cache.test.js
git commit -m "feat: setCachedSnapshot 헬퍼 및 refreshAndPublish 캐시 갱신"
```

---

### Task 5: Generation guard를 `refreshAndPublish`에 추가

**Files:**
- Modify: `server/ws.js:337-390` (`refreshAndPublish`)
- Modify: `server/ws.snapshot-cache.test.js`

- [ ] **Step 1: generation guard 테스트 작성**

`server/ws.snapshot-cache.test.js`에 추가:

```js
test('refreshAndPublish discards in-flight result when generation changes', async () => {
  vi.useFakeTimers();
  const server = createServer();
  const { wss } = attachWsServer(server, {
    path: '/ws',
    heartbeat_ms: 10000,
    refresh_debounce_ms: 50
  });

  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) { this.sent.push(String(msg)); }
  };
  wss.clients.add(/** @type {any} */ (sock));

  // Cold subscribe to populate entry
  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({
      id: 'sub-gen',
      type: /** @type {any} */ ('subscribe-list'),
      payload: { id: 'c-gen', type: 'in-progress-issues' }
    }))
  );

  const key = keyOf({ type: 'in-progress-issues' });

  const mock = /** @type {import('vitest').Mock} */ (fetchListForSubscription);
  /** @type {(value: { ok: true, items: Array<{ id: string, updated_at: number, closed_at: null }> }) => void} */
  let resolve_refresh = () => {};
  mock.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolve_refresh = resolve;
      })
  );

  // Trigger refresh and let refreshAndPublish enter the adapter call
  scheduleListRefresh();
  await vi.advanceTimersByTimeAsync(60);
  await Promise.resolve();

  // Simulate workspace switch while the refresh is still in flight
  registry.clear();

  // Complete the stale refresh after generation changed
  resolve_refresh({
    ok: true,
    items: [{ id: 'STALE', updated_at: 99, closed_at: null }]
  });
  await Promise.resolve();

  // Entry should remain cleared because the stale in-flight refresh was discarded
  const entry = registry.get(key);
  expect(entry?.cachedSnapshot ?? null).toBeNull();

  vi.useRealTimers();
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js -t "generation changes"`
Expected: FAIL — generation guard가 아직 없어서 clear 이전에 시작된 stale refresh 결과가 다시 기록될 수 있음

- [ ] **Step 3: `refreshAndPublish`에 generation guard 추가**

`server/ws.js`의 `refreshAndPublish` 함수 (line 337-390) 전체를 아래로 교체한다. 변경 포인트는 3곳: (1) `gen` 캡처, (2) bd 호출 전 guard, (3) bd 호출 후 guard. 나머지 delta 전파 로직은 그대로 유지:

```js
async function refreshAndPublish(spec) {
  const gen = registry.generation;                    // (1) generation 캡처
  const key = keyOf(spec);
  await registry.withKeyLock(key, async () => {
    if (registry.generation !== gen) return;           // (2) bd 호출 전 guard
    const res = await fetchListForSubscription(spec, {
      cwd: CURRENT_WORKSPACE?.root_dir
    });
    if (!res.ok) {
      log('refresh failed for %s: %s %o', key, res.error.message, res.error);
      return;
    }
    if (registry.generation !== gen) return;           // (3) bd 호출 후 guard
    const items = applyClosedIssuesFilter(spec, res.items);
    const prev_size = registry.get(key)?.itemsById.size || 0;
    const delta = registry.applyItems(key, items);
    setCachedSnapshot(key, items);
    const entry = registry.get(key);
    if (!entry || entry.subscribers.size === 0) {
      return;
    }
    /** @type {Map<string, any>} */
    const by_id = new Map();
    for (const it of items) {
      if (it && typeof it.id === 'string') {
        by_id.set(it.id, it);
      }
    }
    for (const ws of entry.subscribers) {
      if (ws.readyState !== ws.OPEN) continue;
      const s = ensureSubs(ws);
      const subs = s.list_subs || new Map();
      /** @type {string[]} */
      const client_ids = [];
      for (const [cid, v] of subs.entries()) {
        if (v.key === key) client_ids.push(cid);
      }
      if (client_ids.length === 0) continue;
      if (prev_size === 0) {
        for (const cid of client_ids) {
          emitSubscriptionSnapshot(ws, cid, key, items);
        }
        continue;
      }
      for (const cid of client_ids) {
        for (const id of [...delta.added, ...delta.updated]) {
          const issue = by_id.get(id);
          if (issue) {
            emitSubscriptionUpsert(ws, cid, key, issue);
          }
        }
        for (const id of delta.removed) {
          emitSubscriptionDelete(ws, cid, key, id);
        }
      }
    }
  });
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js -t "generation changes"`
Expected: PASS

- [ ] **Step 5: 전체 snapshot-cache 테스트 통과 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js`
Expected: 모든 테스트 PASS

- [ ] **Step 6: Commit (optional checkpoint)**

```bash
git add server/ws.js server/ws.snapshot-cache.test.js
git commit -m "feat: refreshAndPublish에 generation guard 추가"   # 수동 checkpoint가 필요할 때만
```

---

### Task 6: 캐시 히트 경로 구현 — subscribe-list 핸들러

**Files:**
- Modify: `server/ws.js:607-688` (subscribe-list 핸들러)
- Modify: `server/ws.snapshot-cache.test.js`

- [ ] **Step 1: 캐시 히트 테스트 작성**

`server/ws.snapshot-cache.test.js`에 추가:

```js
test('subscribe-list serves cached snapshot without bd call on cache hit', async () => {
  const server = createServer();
  attachWsServer(server, {
    path: '/ws',
    heartbeat_ms: 10000,
    refresh_debounce_ms: 50
  });

  const sock1 = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) { this.sent.push(String(msg)); }
  };

  // First subscribe: cold path (populates cache)
  await handleMessage(
    /** @type {any} */ (sock1),
    Buffer.from(JSON.stringify({
      id: 'sub-first',
      type: /** @type {any} */ ('subscribe-list'),
      payload: { id: 'c-first', type: 'epics' }
    }))
  );

  const mock = /** @type {import('vitest').Mock} */ (fetchListForSubscription);
  /** @type {(value: { ok: true, items: Array<{ id: string, updated_at: number, closed_at: null }> }) => void} */
  let resolve_refresh = () => {};
  mock.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolve_refresh = resolve;
      })
  );

  // Second subscribe on different socket: should be cache hit
  const sock2 = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) { this.sent.push(String(msg)); }
  };

  await handleMessage(
    /** @type {any} */ (sock2),
    Buffer.from(JSON.stringify({
      id: 'sub-cached',
      type: /** @type {any} */ ('subscribe-list'),
      payload: { id: 'c-cached', type: 'epics' }
    }))
  );

  // sock2 should receive the cached snapshot immediately even while
  // background refresh is still pending
  const snapshot = sock2.sent
    .map((m) => { try { return JSON.parse(m); } catch { return null; } })
    .find((o) => o && o.type === 'snapshot');
  expect(snapshot).toBeTruthy();
  expect(snapshot.payload.id).toBe('c-cached');
  expect(Array.isArray(snapshot.payload.issues)).toBe(true);
  expect(snapshot.payload.issues.length).toBe(2);

  // OK reply should also be present
  const ok_reply = sock2.sent
    .map((m) => { try { return JSON.parse(m); } catch { return null; } })
    .find((o) => o && o.ok === true && o.type === 'subscribe-list');
  expect(ok_reply).toBeTruthy();

  // Cleanup the deferred background refresh so the test does not leave work pending
  resolve_refresh({
    ok: true,
    items: [
      { id: 'A', updated_at: 2, closed_at: null },
      { id: 'B', updated_at: 1, closed_at: null }
    ]
  });
});

test('cache hit triggers background refresh that updates cachedSnapshot', async () => {
  vi.useFakeTimers();
  const server = createServer();
  const { wss } = attachWsServer(server, {
    path: '/ws',
    heartbeat_ms: 10000,
    refresh_debounce_ms: 50
  });

  const sock1 = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) { this.sent.push(String(msg)); }
  };
  wss.clients.add(/** @type {any} */ (sock1));

  // Cold subscribe
  await handleMessage(
    /** @type {any} */ (sock1),
    Buffer.from(JSON.stringify({
      id: 'sub-bg',
      type: /** @type {any} */ ('subscribe-list'),
      payload: { id: 'c-bg', type: 'resolved-issues' }
    }))
  );

  // Mock returns updated data for background refresh
  const mock = /** @type {import('vitest').Mock} */ (fetchListForSubscription);
  mock.mockResolvedValueOnce({
    ok: true,
    items: [
      { id: 'A', updated_at: 5, closed_at: null },
      { id: 'D', updated_at: 1, closed_at: null }
    ]
  });

  // Cache hit triggers background refresh
  const sock2 = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) { this.sent.push(String(msg)); }
  };
  wss.clients.add(/** @type {any} */ (sock2));

  await handleMessage(
    /** @type {any} */ (sock2),
    Buffer.from(JSON.stringify({
      id: 'sub-bg2',
      type: /** @type {any} */ ('subscribe-list'),
      payload: { id: 'c-bg2', type: 'resolved-issues' }
    }))
  );

  // Flush microtasks for background refreshAndPublish to complete
  // withKeyLock chains nested promises, so advance by 1ms to drain the full chain
  await vi.advanceTimersByTimeAsync(1);

  const key = keyOf({ type: 'resolved-issues' });
  const entry = registry.get(key);
  const ids = entry?.cachedSnapshot?.map((it) => it.id).sort();
  expect(ids).toEqual(['A', 'D']);

  vi.useRealTimers();
});

test('subscribe-list cache hit serves empty array as valid cache (not a miss)', async () => {
  const mock = /** @type {import('vitest').Mock} */ (fetchListForSubscription);
  mock.mockResolvedValueOnce({ ok: true, items: [] });

  const sock1 = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) { this.sent.push(String(msg)); }
  };

  // Cold path with empty result
  await handleMessage(
    /** @type {any} */ (sock1),
    Buffer.from(JSON.stringify({
      id: 'sub-empty',
      type: /** @type {any} */ ('subscribe-list'),
      payload: { id: 'c-empty', type: 'blocked-issues' }
    }))
  );

  /** @type {(value: { ok: true, items: [] }) => void} */
  let resolve_refresh = () => {};
  mock.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolve_refresh = resolve;
      })
  );

  // Second subscribe: empty snapshot is still a valid cache hit
  const sock2 = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) { this.sent.push(String(msg)); }
  };

  await handleMessage(
    /** @type {any} */ (sock2),
    Buffer.from(JSON.stringify({
      id: 'sub-empty-2',
      type: /** @type {any} */ ('subscribe-list'),
      payload: { id: 'c-empty-2', type: 'blocked-issues' }
    }))
  );

  const snapshot = sock2.sent
    .map((m) => { try { return JSON.parse(m); } catch { return null; } })
    .find((o) => o && o.type === 'snapshot');
  expect(snapshot).toBeTruthy();
  expect(snapshot.payload.id).toBe('c-empty-2');
  expect(snapshot.payload.issues).toEqual([]);

  resolve_refresh({ ok: true, items: [] });
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js -t "cache hit"`
Expected: FAIL — 캐시 히트 분기가 없어 cached snapshot을 즉시 전송하지 못하고 background refresh와 동작이 섞임

- [ ] **Step 3: subscribe-list 핸들러에 캐시 히트 분기 구현**

`server/ws.js`의 subscribe-list 핸들러에서, validation 이후 `fetchListForSubscription` 호출 전에 캐시 히트 분기를 추가:

```js
const client_id = validation.id;
const spec = validation.spec;
const key = keyOf(spec);

// --- Cache hit path ---
const { entry: existing_entry } = registry.ensure(spec);
if (existing_entry.cachedSnapshot !== null) {
  const s = ensureSubs(ws);
  const { key: attached_key } = registry.attach(spec, ws);
  s.list_subs?.set(client_id, { key: attached_key, spec });

  try {
    emitSubscriptionSnapshot(ws, client_id, attached_key, existing_entry.cachedSnapshot);
  } catch (err) {
    log('cache hit snapshot send failed for %s: %o', attached_key, err);
    s.list_subs?.delete(client_id);
    try { registry.detach(spec, ws); } catch { /* ignore */ }
    ws.send(JSON.stringify(makeError(req, 'bd_error', 'Failed to publish cached snapshot', { key })));
    return;
  }

  ws.send(JSON.stringify(makeOk(req, { id: client_id, key: attached_key })));

  // Background refresh
  scheduleBackgroundRefresh(spec);
  return;
}
// --- End cache hit path ---

// Existing cold path continues below...
```

`scheduleBackgroundRefresh` 함수 추가 (subscribe-list 핸들러 외부):

```js
/**
 * Schedule a background refresh for a subscription spec.
 * Uses existing refreshAndPublish which handles locking and delta propagation.
 *
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 */
function scheduleBackgroundRefresh(spec) {
  refreshAndPublish(spec).catch((err) => {
    log('background refresh failed for %s: %o', keyOf(spec), err);
  });
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js -t "cache hit"`
Expected: PASS

- [ ] **Step 5: 전체 테스트 통과 확인**

Run: `npx vitest run server/ws.snapshot-cache.test.js server/ws.list-subscriptions.test.js server/ws.test.js server/ws.mutation-window.test.js`
Expected: 모든 테스트 PASS

- [ ] **Step 6: Commit (optional checkpoint)**

```bash
git add server/ws.js server/ws.snapshot-cache.test.js
git commit -m "feat: subscribe-list 캐시 히트 경로 구현"   # 수동 checkpoint가 필요할 때만
```

---

### Task 7: 전체 통합 테스트 및 최종 검증

**Files:**
- Modify: `server/ws.snapshot-cache.test.js` (필요시)

- [ ] **Step 1: 전체 서버 테스트 실행**

Run: `npx vitest run server/`
Expected: 모든 서버 테스트 PASS

- [ ] **Step 2: 전체 테스트 스위트 실행**

Run: `npm test`
Expected: 모든 테스트 PASS

- [ ] **Step 3: 수동 검증 (선택)**

1. `npm start`로 서버 시작
2. 브라우저에서 접속 → 초기 로딩 확인
3. F5 새로고침 → 캐시 히트로 즉시 로딩되는지 확인
4. 서버 콘솔에서 `subscribe-list` 로그 확인 — 두 번째 연결부터는 `fetchListForSubscription` 호출 없이 바로 snapshot 전송

- [ ] **Step 4: Commit (optional checkpoint, 필요시)**

```bash
git add -A
git commit -m "test: 서버 스냅샷 캐시 통합 테스트 보완"   # 수동 checkpoint가 필요할 때만
```
