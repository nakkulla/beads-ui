---
scope:
  - server/ws/monitor-handlers.js
  - app/views/monitor/lanes.js
---

# 모니터 연결 레인 — 재배포 직후 깜빡임 제거 (미확정 foreign blocker fail-quiet)

- Bead: `UI-fz4f` (route `spec_backed`)
- 선행: `2026-08-24-monitor-wait-lane-unify-design.md`(UI-e6hw) §4.2 연결 레인,
  `2026-08-23-monitor-redesign-design.md`(UI-eey2) §10 foreign blocker 상태 해석,
  quick_fix `ec9508a`(연결 레인 파생에서 `done` 노드 제외 — 이미 랜딩·배포).
- 사용자 결정(2026-08-24): 선택지 A. 상태 미확정 간선만 연결 레인 파생에서
  제외한다. 🔒 칩은 UI-eey2 §10대로 fail-visible을 유지하고, 첫 푸시 지연(prewarm)
  이나 캐시 디스크 지속은 하지 않는다.

## 1. 문제

재배포는 서버 재시작이고, monitor 채널의 프로세스 로컬 캐시는 모두 콜드로
시작한다. `buildMonitorPipeline` → `pruneClosedForeignBlockers`는 콜드 상태에서
blocker를 "살아 있음"으로 내보내고, 비동기 조회가 끝나면 `schedulePush`로 다시
스냅샷을 밀어 `closed`인 것을 뺀다.

| 캐시 | 콜드 시 | 조회 완료 후 |
|---|---|---|
| `issue_prefix_cache` | `owner_by_prefix`가 비어 pruning 자체를 건너뜀 → 전부 유지 | prefix 도착 시 push, 이후 status 조회 시작 |
| `foreign_blocker_status_cache` | `statusFor()`가 `null` → 유지 | `closed`면 push → 제거 |

두 스냅샷 사이에서 클라이언트 `buildChains`는 2노드 이상 성분을 `연결 N · 레포 간`
레인으로 그렸다가 지운다. 사용자는 이를 "새로고침·재배포마다 cross-repo 이슈가
떴다 사라진다"로 관측했다.

## 2. 검증된 전제

- `pruneClosedForeignBlockers` (`server/ws/monitor-handlers.js`): 자기 prefix
  blocker는 그대로, `owner_by_prefix`가 비면 조기 반환, 소유 rig가 없는 prefix는
  유지, 소유 rig가 있으면 `statusFor(blocker, owner_root) !== 'closed'`로 필터.
- `foreignBlockerStatusFor`: 콜드/만료 시 비동기 `bd show`를 띄우고 캐시 값
  (`null`이면 `null`)을 돌려준다. 만료 시엔 이전 status를 계속 돌려주므로 워밍
  뒤에는 깜빡임이 없다 — 문제는 콜드 구간뿐이다.
- title cache `collect`의 COLD MISS는 bead를 `bead_blocked_by`에서 누락시켜
  체인이 **늦게 나타나게** 하지만 사라지게 하지는 않는다(단조 변화). 이 스펙은
  이를 다루지 않는다.
- 클라이언트 `buildChains(blocked_by_map, locations, states)`는 이미 `done`
  위치 노드를 간선 수집에서 제외한다(`ec9508a`). 미확정 제외는 같은 자리에 추가한다.
- `bead_blocked_by`의 다른 소비자: 🔒 칩(`item.blockers` → `describeBlocker`),
  `drop-plan.js` 임시 그래프, 서버 `laneStatesFor`, Worker 탭. 모두 변경하지
  않는다.

## 3. 목표와 비목표

목표: 연결 레인은 상태가 **확정된** 간선으로만 파생되어, 한 서버 수명 안에서
`없음 → (확정 후) 등장`의 단조 변화만 갖는다.

비목표: 🔒 칩 의미 변경, title cache pop-in 제거, prewarm/첫 푸시 지연, 캐시
지속, `bd ready`·스케줄링 입력 변경.

## 4. 서버 — 미확정 blocker 투영

`pruneClosedForeignBlockers`가 워크스페이스 스냅샷에 새 키를 쓴다.

```
foreign_blockers_unresolved: string[]   // blocker id, 중복 제거·오름차순 정렬
```

판정은 `bead_blocked_by`에 등장하는 blocker id마다:

| 조건 | 결과 |
|---|---|
| prefix == `self_prefix` | 확정(같은 rig — title cache가 closed를 이미 제거) |
| `self_prefix === null` 또는 `owner_by_prefix.size === 0` (prefix 캐시 콜드) | 자기 prefix가 아닌(또는 자기 prefix를 모르는) **모든** blocker를 미확정 |
| 소유 rig 있음, `statusFor() === null` | 미확정(유지) |
| 소유 rig 있음, `statusFor() === 'closed'` | 제거(현행), 미확정 아님 |
| 소유 rig 있음, 그 외 status | 확정(유지) |
| 소유 rig 없음(고아 foreign) | 확정(유지, 현행) — 안정 상태라 깜빡이지 않는다 |

규칙:
- 현행 조기 반환(`owner_by_prefix.size === 0`)은 **새 키를 쓴 뒤에** 반환한다.
  `bead_blocked_by`가 없거나 객체가 아니면 키를 `[]`로 쓴다.
- `bead_blocked_by`의 내용·순서·키 집합은 바꾸지 않는다.
- 키는 추가 전용이며 항상 배열이다. 소비자가 없어도 오류가 아니다.
- 스케줄링 입력이 아니다(display-only, UI-eey2 §10과 같은 층).

## 5. 클라이언트 — 연결 레인만 fail-quiet

`buildLanes` (`app/views/monitor/lanes.js`):
- 워크스페이스마다 `foreign_blockers_unresolved`가 문자열 배열이면 그 원소를
  하나의 `Set<string>`(`unresolved_blockers`)에 모은다. 키가 없거나 배열이
  아니면 아무것도 넣지 않는다(fail-quiet — 구버전 서버와 호환).
- `buildChains(blocked_by_map, locations, states, unresolved_blockers)`로 넘긴다.
  네 번째 인자는 선택이며 기본값은 빈 `Set`.

`buildChains`:
- 간선 수집에서 `unresolved_blockers.has(blocker)`이면 그 간선을 건너뛴다
  (`done` 제외와 같은 자리, 같은 규칙: 노드도 추가하지 않는다).
- 그 결과 성분이 2노드 미만이면 현행대로 체인이 생기지 않는다.

변경하지 않는 것: `item.blockers`/`describeBlocker`(🔒 칩은 미확정 blocker를
계속 "외부"/"위치 미확인"으로 표시), `drop-plan.js`, `buildChainLanes`, pending
레인.

## 6. 동작 시나리오

1. 재시작 → 첫 스냅샷: prefix 콜드 → 비자기 blocker 전부 미확정 → 연결 레인
   없음, 🔒 칩은 보임.
2. prefix 도착 → push: 소유 rig 있는 blocker는 status 조회 시작 → 여전히
   미확정 → 연결 레인 없음.
3. status 도착 → push: `closed`면 제거(레인 없음 유지), 아니면 확정 → 연결 레인
   **등장**. 이후 TTL 만료 시엔 이전 값을 계속 내보내므로 변화 없음.
4. 소유 rig 없는 고아 blocker(예: prefix가 어느 rig에도 없음)는 1에서 미확정,
   2부터 확정 — 대기 중인 blockee와 함께면 연결 레인이 2에서 등장하고 유지된다.

## 7. 오류 처리

- `issuePrefixFor`/`statusFor` 예외는 현행처럼 잡아 `null`로 취급 → 미확정.
- 서버 pruning 전체가 throw하면 현행 `catch`에서 로그만 남고 새 키가 없다 →
  클라이언트는 빈 집합으로 현행 동작(fail-quiet).

## 8. 테스트

`server/ws/monitor-handlers.test.js` (`buildMonitorPipeline` seam 사용):
- prefix 콜드(`issuePrefixFor` → `null`)면 비자기 blocker 전부가
  `foreign_blockers_unresolved`에 들어가고 `bead_blocked_by`는 불변.
- 소유 rig 있고 status `null` → 미확정에 포함·유지.
- status `closed` → `bead_blocked_by`에서 제거되고 미확정에 없음.
- status `open` → 유지되고 미확정에 없음.
- 고아 prefix → 유지되고 미확정에 없음.
- `bead_blocked_by` 부재 → 키는 `[]`.
- 정렬·중복 제거.

`app/views/monitor/lanes.test.js`:
- 미확정 blocker 간선은 `chains`·`chain_lanes`에 없고 해당 큐 행의
  `blockers`(🔒 칩)에는 남는다.
- 키 부재 시 현행과 동일하게 체인이 생긴다.
- 같은 blocker가 확정된 스냅샷에서는 체인이 생긴다.
- `buildChains` 4번째 인자 생략 시 현행과 동일.

검증: `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
`npm run build`(번들 포함).

## 9. 구현 unit 후보

단일 unit — 서버 투영(§4) + 클라이언트 파생(§5) + 테스트(§8). 같은 레포, 두 파일.
