# Server Snapshot Cache — 초기 로딩 성능 개선

## 문제 정의

### 증상

1. **모바일 초기 로딩 느림**: 앱을 처음 열었을 때 데이터가 표시되기까지 오래
   걸림
2. **변경 후 새로고침 느림**: 이슈를 업데이트하고 F5 새로고침하면 로딩이 계속됨

### 근본 원인

- `subscribe-list` 요청 시 매번 `bd` CLI subprocess를 새로 spawn하여 데이터 조회
- 모든 bd 호출이 `bd_run_queue`에서 **직렬 실행** (Dolt 동시 접근 방지)
- Board 뷰는 5개 구독이 필요 → 5번의 순차 bd 호출 → 총 지연 = 5 × (spawn + Dolt
  초기화 + 쿼리)
- F5 새로고침 시 기존 WebSocket 끊김 → `onDisconnect`가 entry를 삭제 → 캐시 소실
  → bd를 처음부터 다시 호출
- 번들 크기(~49KB gzip)나 네트워크는 병목이 아님

### 데이터 규모

- 활성 이슈: ~50개 이하
- 전체 이슈: 다수 (closed 포함)

## 설계

### 핵심 아이디어

서버의 `SubscriptionRegistry`가 이미 delta 계산용으로 항목별
메타데이터(`itemsById`)를 메모리에 보관 중이다. 여기에 **캐시된 결과
스냅샷(`cachedSnapshot`)**을 추가하여, 새 구독자에게 bd 호출 없이 즉시 응답한다.

> **`cachedSnapshot`의 의미**: "이 spec key의 현재 결과 집합"이다.
> `closed-issues` spec의 경우 `applyClosedIssuesFilter`를 거친 필터링된 결과가
> 저장되며, raw 전체 이슈가 아님에 주의.

### 변경 1: Entry 구조 확장

**파일**: `server/subscriptions.js`

```js
// 현재
function createEntry() {
  return {
    itemsById: new Map(),    // Map<id, { updated_at, closed_at }>
    subscribers: new Set(),
    lock: Promise.resolve()
  };
}

// 변경 후
function createEntry() {
  return {
    itemsById: new Map(),      // Map<id, { updated_at, closed_at }> — delta 계산용
    cachedSnapshot: null,       // Array<IssueObject> | null — 이 spec key의 결과 스냅샷 (신규, null = 미초기화)
    subscribers: new Set(),
    lock: Promise.resolve()
  };
}
```

**`cachedSnapshot`은 immutable array reference**로 관리한다. 갱신 시 기존 배열을
mutate하지 않고 새 배열로 교체(단일 원자적 할당)하여, lock 없이도 안전하게 읽을
수 있다. JavaScript는 single-threaded이므로 reference 할당은 원자적이다.

### 변경 2: Eviction 정책 완화

**파일**: `server/subscriptions.js` — `onDisconnect` 메서드

```js
// 현재: 구독자 0이면 entry 삭제
onDisconnect(ws) {
  for (const [key, entry] of this._entries) {
    entry.subscribers.delete(ws);
    if (entry.subscribers.size === 0) {
      empties.push(key);           // ← 삭제 대상
    }
  }
  for (const key of empties) {
    this._entries.delete(key);     // ← entry + 캐시 소실
  }
}

// 변경 후: 구독자 0이어도 entry 유지 (캐시 보존)
onDisconnect(ws) {
  for (const [key, entry] of this._entries) {
    entry.subscribers.delete(ws);
    // entry는 삭제하지 않음 — cachedSnapshot 캐시로 활용
  }
}
```

entry 정리는 `registry.clear()` (workspace 전환 시)에서만 수행한다. 활성 이슈
~50개 기준으로 entry 당 수 KB 수준이므로 메모리 우려 없음.

#### Workspace 전환 시 stale refresh 방지 (generation counter)

`registry.clear()`와 in-flight background refresh 사이의 race condition을
방지하기 위해 **generation counter**를 도입한다:

```js
class SubscriptionRegistry {
  constructor() {
    this._entries = new Map();
    this._generation = 0; // workspace generation (신규)
  }

  get generation() {
    return this._generation;
  }

  clear() {
    this._entries.clear();
    this._generation++; // generation 증가
  }
}
```

`refreshAndPublish`와 `scheduleBackgroundRefresh`는 호출 시점의 generation을
캡처하고, bd 결과 반영 전에 generation이 변경되었으면 결과를 폐기한다:

```js
async function refreshAndPublish(spec) {
  const gen = registry.generation;   // 캡처
  const key = keyOf(spec);
  await registry.withKeyLock(key, async () => {
    if (registry.generation !== gen) return;  // workspace 전환됨 → 폐기
    const res = await fetchListForSubscription(spec, { cwd: ... });
    if (!res.ok) return;
    if (registry.generation !== gen) return;  // bd 호출 중 전환됨 → 폐기
    // ... 기존 로직 ...
  });
}
```

> **주의**: 이 guard가 올바르게 동작하려면, workspace 전환 시
> `registry.clear()`가 `scheduleListRefresh()`보다 **먼저** 호출되어야 한다.
> 현재 소스(`ws.js` lines 543, 1324)에서 이 순서는 이미 보장되어 있다.

### 변경 3: subscribe-list 캐시 히트 경로

**파일**: `server/ws.js` — `subscribe-list` 핸들러

현재 흐름:

```
subscribe-list → fetchListForSubscription (bd spawn) → applyItems → emitSnapshot
```

변경 후 흐름:

```
subscribe-list
  → registry.ensure(spec)
  → entry.cachedSnapshot !== null ?
    YES (cache hit):
      → attach subscriber
      → emitSnapshot(ws, client_id, key, entry.cachedSnapshot)
      → reply ok
      → 백그라운드: scheduleBackgroundRefresh(spec)
    NO (cache miss / cold start):
      → 기존 동작: fetchListForSubscription → applyItems + setCachedSnapshot → emitSnapshot
```

의사 코드:

```js
if (req.type === 'subscribe-list') {
  // ... validation ...
  const spec = validation.spec;
  const key = keyOf(spec);
  const { entry } = registry.ensure(spec);
  const s = ensureSubs(ws);

  // Cache hit: entry에 이미 데이터가 있으면 즉시 응답
  // Cache hit: null이 아니면 캐시됨 (빈 배열도 유효한 캐시)
  if (entry.cachedSnapshot !== null) {
    const { key: attached_key } = registry.attach(spec, ws);
    s.list_subs?.set(client_id, { key: attached_key, spec });

    try {
      // cachedSnapshot은 immutable reference이므로 lock 없이 안전하게 읽을 수 있음
      emitSubscriptionSnapshot(ws, client_id, attached_key, entry.cachedSnapshot);
    } catch (err) {
      // Error rollback: cold path와 동일한 패턴
      s.list_subs?.delete(client_id);
      try { registry.detach(spec, ws); } catch { /* ignore */ }
      replyWithError('bd_error', 'Failed to publish cached snapshot', { key });
      return;
    }

    ws.send(JSON.stringify(makeOk(req, { id: client_id, key: attached_key })));

    // 백그라운드에서 최신 데이터로 갱신
    scheduleBackgroundRefresh(spec);
    return;
  }

  // Cache miss: 기존 동작 (bd 호출)
  const initial = await fetchListForSubscription(spec, { cwd: ... });
  // ... 기존 로직 유지 ...
  // + cachedSnapshot 갱신
  setCachedSnapshot(key, items);
}
```

### 변경 4: cachedSnapshot 갱신 시점

`cachedSnapshot`은 다음 시점에 갱신된다. **`applyItems`와 `setCachedSnapshot`은
반드시 같은 lock 안에서 호출되어 `itemsById`와 `cachedSnapshot` 간 일관성을
보장**한다.

#### 4a. refreshAndPublish 내부

```js
async function refreshAndPublish(spec) {
  const gen = registry.generation;
  const key = keyOf(spec);
  await registry.withKeyLock(key, async () => {
    if (registry.generation !== gen) return;  // stale refresh 폐기
    const res = await fetchListForSubscription(spec, { cwd: ... });
    if (!res.ok) return;
    if (registry.generation !== gen) return;  // bd 호출 중 workspace 전환 → 폐기

    const items = applyClosedIssuesFilter(spec, res.items);
    const delta = registry.applyItems(key, items);

    // 신규: cachedSnapshot 갱신 (같은 lock 안에서 applyItems 직후)
    setCachedSnapshot(key, items);

    // ... 기존 delta 전파 로직 유지 ...
  });
}
```

#### 4b. subscribe-list cold path

```js
// 기존 subscribe-list에서 bd 호출 후 (withKeyLock 안에서):
void registry.applyItems(attached_key, items);
setCachedSnapshot(attached_key, items); // 신규: 같은 lock 안에서 호출
emitSubscriptionSnapshot(ws, client_id, attached_key, items);
```

#### 4c. setCachedSnapshot 헬퍼

```js
/**
 * cachedSnapshot을 새 배열 reference로 교체 (immutable replacement).
 * 기존 배열을 mutate하지 않으므로, 동시에 읽는 코드에 영향 없음.
 */
function setCachedSnapshot(key, items) {
  const entry = registry.get(key);
  if (!entry) return; // withKeyLock 안에서 호출되므로 entry는 항상 존재하지만, 방어적 guard
  // 원자적 reference 교체 — lock 없이 읽는 코드에 안전
  entry.cachedSnapshot = items.filter((it) => it && typeof it.id === 'string');
}
```

### 변경 5: 백그라운드 refresh

캐시 히트 후 최신 데이터를 가져오는 비동기 refresh:

```js
function scheduleBackgroundRefresh(spec) {
  // refreshAndPublish가 이미 per-key lock과 delta 전파를 처리하므로
  // 단순히 호출만 하면 됨
  refreshAndPublish(spec).catch((err) => {
    log('background refresh failed for %s: %o', keyOf(spec), err);
  });
}
```

`refreshAndPublish`는 이미:

- `withKeyLock`으로 직렬화
- `computeDelta`로 변경분 계산
- 변경이 있으면 upsert/delete 전송
- 변경이 없으면 아무것도 안 함

따라서 별도 로직 없이 기존 함수를 재활용한다.

## 변경 범위 요약

| 파일                      | 변경 내용                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server/subscriptions.js` | Entry에 `cachedSnapshot` 필드 추가, `onDisconnect` eviction 제거, generation counter 추가                                                                                       |
| `server/ws.js`            | subscribe-list에 캐시 히트 분기 추가 (error rollback 포함), refreshAndPublish에서 cachedSnapshot 갱신 + generation guard, `setCachedSnapshot` 헬퍼, `scheduleBackgroundRefresh` |

## 기대 효과

### 초기 로딩 (최우선)

- **Cache hit 시**: bd 호출 0회 → 즉시 snapshot 전송 (수 ms)
- Board 뷰: 5개 구독 모두 캐시 히트 → bd 5회 순차 호출 제거
- F5 새로고침: entry가 살아있으므로 캐시 히트

### Cold start (서버 재시작 직후)

- 첫 번째 구독은 기존과 동일 (bd 호출 필요)
- 두 번째 이후 같은 spec 구독은 캐시 히트

### 데이터 정합성

- 캐시 히트 후 백그라운드 refresh가 delta를 전송하므로, 잠시 stale 데이터가
  보이더라도 곧 최신으로 업데이트됨
- 기존 subscription delta 메커니즘(snapshot → upsert/delete)을 그대로 활용

## 제외 범위 (YAGNI)

- 클라이언트 영속 캐시 (IndexedDB): 서버 캐시로 충분, 추후 필요시 별도 설계
- 렌더 디바운싱/가상화: 별도 성능 이슈로 분리
- bd CLI 프로세스 풀링: 현재 데이터 규모에서는 불필요
- TTL 기반 eviction: 활성 이슈 ~50개 수준에서 메모리 우려 없음
