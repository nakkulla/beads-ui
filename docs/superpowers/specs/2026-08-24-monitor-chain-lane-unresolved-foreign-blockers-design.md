---
scope:
  - server/ws/monitor-handlers.js
  - app/views/monitor/lanes.js
  - app/protocol.md
---

# 모니터 연결 레인 — 재배포 직후 깜빡임 제거 (미확정 foreign blocker fail-quiet)

- Bead: `UI-fz4f` (route `spec_backed`)
- 선행: `2026-08-24-monitor-wait-lane-unify-design.md`(UI-e6hw) §4.2 연결 레인,
  `2026-08-23-monitor-redesign-design.md`(UI-eey2) §10 foreign blocker 상태 해석,
  quick_fix `ec9508a`(연결 레인 파생에서 `done` 노드 제외 — 이미 랜딩·배포).
- 스펙 게이트(codex, 2026-08-24) REVISE 5건 반영: status 확정 시 push 예약,
  미확정 범위를 워크스페이스 단위로 보존, `statusFor` 예외 간선별 처리, `closed`
  제거와 맵 불변 문구 정합, `app/protocol.md` 범위 추가.
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
  뒤에는 깜빡임이 없다 — 문제는 콜드 구간뿐이다. 조회가 끝나면 **`closed`일
  때만** `schedulePush`를 호출한다 — `open` 확정은 다음 무관한 push까지 스냅샷에
  반영되지 않는다(§4에서 고친다).
- `pruneClosedForeignBlockers`의 `statusFor` 호출은 간선별로 잡혀 있지 않다 —
  예외가 나면 pruning 전체가 바깥 `catch`로 빠지고 새 키도 빠진다(§4·§7에서
  고친다).
- title cache `collect`의 COLD MISS는 bead를 `bead_blocked_by`에서 누락시켜
  체인이 **늦게 나타나게** 하지만 사라지게 하지는 않는다(단조 변화). 이 스펙은
  이를 다루지 않는다.
- 클라이언트 `buildChains(blocked_by_map, locations, states)`는 이미 `done`
  위치 노드를 간선 수집에서 제외한다(`ec9508a`). 미확정 제외는 `buildChains`가
  아니라 그 입력 맵을 만드는 `buildLanes`에서 끝낸다(§5).
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
- `bead_blocked_by`는 현행 `closed` 제거 외에는 미확정 투영 때문에 추가로
  바꾸지 않는다(내용·순서·키 집합 그대로).
- `statusFor`/`issuePrefixFor` 호출은 **간선별 `try/catch`**로 감싸 예외를
  `null`(= 미확정)로 다룬다. 한 blocker의 예외가 같은 워크스페이스의 다른
  간선이나 새 키 자체를 잃게 하지 않는다.
- 키는 추가 전용이며 항상 배열이다. 소비자가 없어도 오류가 아니다.
- 스케줄링 입력이 아니다(display-only, UI-eey2 §10과 같은 층).

status 확정 시 push: `foreignBlockerStatusFor`의 조회 완료 콜백은 새 status가
`null`이 아니고 **이전 캐시 값과 다를 때** `schedulePush`를 호출한다(현행
`closed`만 → `null → open`도 포함). 그래야 §6의 "확정 후 등장"이 다음 무관한
갱신을 기다리지 않는다. 실패(`null` 유지)는 push하지 않는다.

`app/protocol.md`의 `workspaces[].bead_blocked_by` 단락 바로 뒤에 새 키의
의미(상태 미확정 foreign blocker id 집합, 정렬·중복 제거, 항상 배열)와 소비
규칙(연결 레인만 제외, 🔒 칩 불변, 구버전 서버에서 키 부재 시 빈 집합)을
기록한다.

## 5. 클라이언트 — 연결 레인만 fail-quiet

`buildLanes` (`app/views/monitor/lanes.js`):
- 미확정은 **워크스페이스 단위**다. 워크스페이스 W의
  `foreign_blockers_unresolved`는 W의 `bead_blocked_by`에서 읽은 간선에만
  적용된다 — 같은 blocker id가 다른 워크스페이스(예: 그 id를 소유한 rig 자신)의
  간선에서는 확정일 수 있으므로 전역 집합으로 합치지 않는다.
- 현행 `blocked_by_map`(🔒 칩·`item.blockers`·drop-plan이 쓰는 원천)은 그대로
  두고, 연결 레인 전용 `chain_blocked_by_map`을 하나 더 만든다: W의
  `bead_blocked_by[bead]`에서 W의 미확정 집합에 든 blocker를 뺀 목록. 실행가능
  행의 `blocked_by`(서버 미확정 정보 없음)는 현행대로 그대로 넣는다. 키가 없거나
  배열이 아니면 빼는 것이 없다(fail-quiet — 구버전 서버와 호환).
- `buildChains(chain_blocked_by_map, locations, states)`를 호출한다. `buildChains`
  시그니처는 바꾸지 않는다.

`buildChains`: 변경 없음 — 미확정 제외는 입력 맵에서 이미 끝난다. 그 결과 성분이
2노드 미만이면 현행대로 체인이 생기지 않는다.

변경하지 않는 것: `item.blockers`/`describeBlocker`(🔒 칩은 미확정 blocker를
계속 "외부"/"위치 미확인"으로 표시), `drop-plan.js`, `buildChainLanes`, pending
레인.

## 6. 동작 시나리오

1. 재시작 → 첫 스냅샷: prefix 콜드 → 비자기 blocker 전부 미확정 → 연결 레인
   없음, 🔒 칩은 보임.
2. prefix 도착 → push: 소유 rig 있는 blocker는 status 조회 시작 → 여전히
   미확정 → 연결 레인 없음.
3. status 도착 → push(§4: `closed`·`open` 모두 push): `closed`면 제거(레인 없음
   유지), 아니면 확정 → 연결 레인 **등장**. 이후 TTL 만료 시엔 이전 값을 계속
   내보내므로 변화 없음.
4. 소유 rig 없는 고아 blocker(예: prefix가 어느 rig에도 없음)는 1에서 미확정,
   2부터 확정 — 대기 중인 blockee와 함께면 연결 레인이 2에서 등장하고 유지된다.
5. 워크스페이스 B의 `B-1`이 `A-1`에 막혀 있고 `A-1`의 status가 미확정이면 B의
   간선 `A-1 → B-1`만 제외된다. A 워크스페이스의 같은-rig 간선 `A-1 → A-2`는
   확정이라 그대로 체인이 된다.

## 7. 오류 처리

- `issuePrefixFor`/`statusFor` 예외는 §4대로 간선별로 잡아 `null`(미확정)로
  취급한다. 예외 하나가 같은 워크스페이스의 다른 판정이나 새 키를 잃게 하지
  않는다.
- 그래도 pruning 전체가 throw하면 현행 바깥 `catch`에서 로그만 남고 새 키가 없다
  → 클라이언트는 빼는 것 없이 현행 동작(fail-quiet).

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
- `statusFor`가 한 blocker에서 throw → 그 blocker만 미확정, 같은 워크스페이스의
  다른 blocker 판정과 새 키는 정상.
- `foreignBlockerStatusFor` 조회가 `null → open`으로 끝나면 push가 예약된다;
  `null → null`(실패)은 예약되지 않는다.

`app/views/monitor/lanes.test.js`:
- 미확정 blocker 간선은 `chains`·`chain_lanes`에 없고 해당 큐 행의
  `blockers`(🔒 칩)에는 남는다.
- 키 부재 시 현행과 동일하게 체인이 생긴다.
- 같은 blocker가 확정된 스냅샷에서는 체인이 생긴다.
- 같은 blocker id가 워크스페이스 B에서는 미확정, A에서는 확정 간선일 때 B의
  간선만 빠지고 A의 체인은 남는다(§6-5).

검증: `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
`npm run build`(번들 포함).

## 9. 구현 unit 후보

단일 unit — 서버 투영(§4) + 클라이언트 파생(§5) + `app/protocol.md` + 테스트(§8).
같은 레포.
