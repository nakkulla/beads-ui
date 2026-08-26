---
scope:
  - server/ws/worker-handlers.js
  - server/ws/monitor-handlers.js
  - server/worker/foreign-blocker-status.js
  - server/worker/title-cache.js
  - app/views/worker/lanes.js
  - app/views/worker/queue-blockers.js
  - app/views/worker/index.js
  - app/main.js
---

# Worker blocked 칩 — 닫힌 타 레포 blocker 정리와 blocker 이슈 열기

Bead: UI-u6zf · route: `spec_backed`

## 1. 배경

사용자가 Worker 탭 후보 카드에서 `UI-06ku`의 `⛓ blocked: dotfiles-15y7` 칩을
보고 두 가지를 지적했다.

1. `dotfiles-15y7`는 이미 `closed`인데 칩이 남아 있다.
2. 칩을 눌러도 아무 일도 일어나지 않는다.

### 1.1 관측된 사실

- `dotfiles-15y7` = `closed` (dotfiles rig에서 `bd show --json`으로 확인).
- `UI-06ku`는 `bd ready`에 나온다 — bd 자신은 막혀 있지 않다고 판정한다.
- `bd ready --explain`의 `blocked` 목록에도 `UI-06ku`는 없다. 따라서 Board는
  이미 옳다: Board의 `blocked_info.blockers`는 `bd ready --explain`에서 오고
  (`server/list-adapters.js` `attachBlockedInfo`), bd가 foreign 의존의 종결을
  반영하기 때문이다.
- 낡은 사실을 말하는 것은 **Worker 채널 투영 하나**다.

### 1.2 문제 1의 원인

`server/worker/title-cache.js` `recordFromIssue()`는 `dep.status !== 'closed'`로
blocker를 거른다. 그러나 `bd show --json`은 foreign 의존에 `status`를 싣지
않는다(관측: `{"external": true, "title": "", "priority": 0}`). 그래서 타 레포
blocker는 그대로 남고, 그 자리의 주석은 정리를 "cross-rig resolver"에 위임한다.

그 resolver인 `pruneClosedForeignBlockers`는 `server/ws/monitor-handlers.js`에만
있다. 구조는 이렇다:

```
decorateQueue(root)                  ← Worker 채널이 스냅샷을 만든다
  └ bead_blocked_by                    (닫힌 foreign blocker가 남아 있다)
      ↓
buildMonitorPipeline()               ← Monitor가 그 스냅샷을 받아
  └ pruneClosedForeignBlockers(...)     후처리로 정리한다
```

정리가 **소비자 쪽**에 있다. 소비자가 하나 늘었을 때 — UI-anna가 Worker 탭에도
같은 칩을 세웠을 때 — 정리가 따라오지 않았고, 그것이 이 버그다.

### 1.3 문제 2의 현황

`docs/superpowers/specs/2026-08-26-lane-agnostic-dependency-chips-design.md`
§5.3a가 Worker의 blocked 칩을 표시 전용으로 정했다. 근거는 "Worker 탭에는
의존성 패널이 없고, 패널 도입은 그 스펙의 비목표"였다 — 즉 **패널**을 열 수
없기 때문이지, 칩이 아무것도 하지 말아야 한다는 판단이 아니었다.

같은 카드의 출처 칩(`.ctl-chip--from`)은 이미 클릭하면 `gotoIssue(from_id)`로
그 이슈를 연다(`app/views/worker/index.js`). 칩마다 클릭 가능 여부가 갈려 있다.

### 1.4 두 건을 묶는 이유

타 레포 blocker를 열려면 "이 blocker는 어느 레포 것인가"를 알아야 한다. 그
`prefix → root_dir` 매핑은 `pruneClosedForeignBlockers`가 정리를 위해 **이미
계산하는 것**이다. 두 건은 같은 데이터를 필요로 한다.

## 2. 결정

| # | 결정 | 근거 |
|---|------|------|
| 1 | Worker의 blocked 칩 클릭은 **blocker 이슈 상세를 연다** | Worker의 `gotoIssue`가 곧 상세 오버레이 경로이고, 같은 카드의 출처 칩이 이미 쓰는 관용이다 |
| 2 | 타 레포 blocker는 **workspace를 전환한 뒤** 연다 | 전환 없이는 못 연다 — §2.1 |
| 3 | Monitor의 칩 클릭(의존성 패널)은 **그대로 둔다** | 패널은 의존 해제를 하는 유일한 진입로다. §5.3a가 "그 탭에 실제로 존재하는 동작으로 갈라지는 것"을 이미 허용한다 |
| 4 | Board 카드의 blocked 칩은 **이번 범위 밖** | Board 칩은 여러 blocker를 한 칩에 접어(`A, B +2`) 클릭 대상이 정해지지 않는다. 쪼개려면 카드 문법 슬롯 표까지 건드려야 한다. 그리고 §1.1대로 Board는 문제 1에 해당하지 않는다 |
| 5 | 정리를 **생성 지점으로 올린다**(안 A) | 이번 버그의 원인이 "정리가 소비자 쪽에 있다"는 구조 자체다. 소비자마다 호출하는 안 B는 그 구조를 유지한다 |

### 2.1 전환 없이 열 수 없는 이유

상세 오버레이의 데이터는 **연결의 현재 workspace**를 기준으로 서버가 해석한다.
세 군데가 그 위에 서 있다.

- 구독 스펙은 `{ type: 'issue-detail', params: { id } }`이고,
  `server/validators.js`가 파라미터를 `params = { id }`로 좁힌다. root_dir을
  실어 보내도 지워진다.
- `server/list-adapters.js`가 그것을 `bd show <id> --json`으로 바꿔 연결의
  workspace를 cwd로 실행한다.
- `app/views/detail-panel/index.js`의 캐시 키가 `workspace::id`이고, 그 주석이
  "the reply is resolved server-side against the connection's workspace"라고
  명시한다.

게다가 상세 패널이 그리는 것의 상당 부분 — 실행 설정, 세션 목록, workspace
계정, `bd kv` 세션 기본값 — 이 연결 workspace 종속이다. 전환 없이 dotfiles
이슈를 열면 그 카드들이 beads-ui의 값을 dotfiles 이슈 옆에 그린다. 조용히 틀린
화면이 된다.

Monitor는 이 제약을 `openRow()`에서 `switchWorkspace → gotoIssue` 순서로 이미
풀었다. Worker도 같은 길을 쓴다.

## 3. 서버 — 정리를 생성 지점으로

### 3.1 새 모듈

`server/worker/foreign-blocker-status.js`를 만든다. `server/ws/monitor-handlers.js`가
`server/ws/worker-handlers.js`를 단방향으로 import하므로, 공유 로직을 그보다 아래
계층에 두면 순환이 생기지 않는다.

monitor-handlers에서 옮겨 오는 것:

- `foreignBlockerStatusFor(bead_id, owner_root)`와 그 캐시(TTL 상수 포함)
- `pruneClosedForeignBlockers(...)`
- `cachedIssuePrefixFor(root_dir)`와 그 캐시
- `visibleWorkspaceRoots(options)`

monitor-handlers는 이 모듈에서 import해 쓰고, 자기 안의 정의는 지운다.

### 3.2 적용 지점

`decorateQueue()`(`server/ws/worker-handlers.js`)가 `bead_blocked_by`를 만든
직후 정리를 적용한다. `buildMonitorPipeline()`의 `pruneClosedForeignBlockers`
호출은 **제거한다** — Monitor는 이미 정리된 스냅샷을 받는다.

판정 규칙은 지금 것을 그대로 옮긴다. 새로 정하지 않는다.

- 같은 레포 blocker: 손대지 않는다 (title-cache가 이미 `status`로 걸렀다).
- status 미상: **남긴다**. 조회가 도착할 때까지 fail-visible이다.
- 보이는 어느 rig의 prefix에도 맞지 않는 id: 손대지 않는다.

### 3.3 늦게 도착하는 status

`foreignBlockerStatusFor`는 캐시가 비었으면 `null`을 돌려주고 async `bd show`를
건다. 그 조회가 끝났을 때 **누구를 다시 그릴 것인가**가 이 이동의 핵심이다.

지금 Monitor 캐시는 완료 시 자기 `schedulePush()`만 부른다. 모든 workspace를 한
화면에 그리므로 그것으로 충분했다. Worker 채널은 workspace별 fanout이라, 깨워야
할 대상이 **blocker를 소유한 workspace가 아니라 그 blocker에 막힌 bead가 있는
workspace**다.

그래서 캐시 엔트리가 요청자를 기억한다.

```js
// 캐시 엔트리
{ status, until, in_flight, requesters: Set<string> }  // requesters = 요청한 workspace root
```

- `foreignBlockerStatusFor(bead_id, owner_root, requester_root)`로 요청자를 함께
  받아 엔트리에 더한다.
- 조회가 `closed`로 끝나면 등록된 콜백에 요청자 집합을 넘긴다.
- worker-handlers는 그 콜백에서 각 요청자 workspace의 `fanout`을 부른다 —
  title-cache의 `setOnFilled` 배선과 같은 모양이다.
- monitor-handlers는 지금처럼 자기 `schedulePush()`를 등록한다. 요청자 집합은
  무시한다 (한 화면이 전부를 그리므로).

`closed`가 아닌 결과로는 아무도 깨우지 않는다 — 화면이 이미 그 사실을 그리고
있다.

### 3.4 prefix prewarm의 소유권

`cachedIssuePrefixFor`는 **동기 캐시 조회**다. 캐시가 비면 `null`을 돌려주고,
채우는 것은 별도의 `prewarmIssuePrefix()`(async `bd config list --json`)다.

지금 그 prewarm을 부르는 것은 `prewarmVisibleIssuePrefixes()` 하나이고, **Monitor만
그것을 부른다.** 정리를 `decorateQueue`로 옮기면 Monitor를 한 번도 열지 않은
세션에서는 prefix 캐시가 비어 있어 owner rig를 찾지 못하고, 정리가 아예 동작하지
않는다. 문제 1이 그대로 남는다.

따라서 prewarm도 Worker 경로가 함께 소유한다.

- 정리를 적용할 때 owner를 찾지 못한 foreign 후보가 있으면, 보이는 workspace들의
  `prewarmIssuePrefix`를 건다.
- prefix 조회가 끝나면 §3.3과 같은 경로로 그 workspace의 fanout을 깨운다.
- 그때까지 blocker는 남는다 — status 미상과 같은 fail-visible이다.

### 3.5 매 스냅샷 비용

`decorateQueue`는 모든 reply와 fanout에서 돈다. `visibleWorkspaceRoots()`는
레지스트리와 hidden 목록을 읽으므로 무조건 부르면 안 된다.

정리는 **`bead_blocked_by`에 이 레포 prefix가 아닌 blocker id가 하나라도 있을
때만** workspace 목록을 계산한다. 대부분의 스냅샷은 그 판정에서 끝난다 — 자기
prefix 비교는 문자열 하나다.

## 4. 서버 — blocker의 owner workspace 싣기

정리에 쓴 `prefix → root_dir` 맵에서 파생해 스냅샷에 **별도 키**로 싣는다.

```js
blocker_workspaces: { 'dotfiles-t735': '/Users/.../GitHub/dotfiles' }
```

`bead_blocked_by`를 `{id, root_dir}` 객체 배열로 바꾸지 않는다: `laneStatesFor`를
비롯한 기존 소비자가 전부 문자열 배열을 가정하고, 계약을 넓히면 이 스펙과 무관한
자리가 함께 흔들린다. `bead_titles`·`bead_times`가 이미 쓰는 별도 키 관용을
따른다.

부분성도 그 관용과 같다. **없는 키는 "모름"이고, 추론하지 않는다.**

- 같은 레포 blocker는 이 맵에 넣지 않는다. 클라이언트가 현재 workspace로 안다.
- 보이지 않는 workspace의 rig에 속한 blocker는 owner를 알 수 없으므로 키가 없다.

## 5. 클라이언트

### 5.1 칩 단위 `openable`

`DependencyChip`(`app/views/worker/lanes.js`)에 두 필드를 더한다.

```js
 * @property {string} [root_dir] - blocker를 소유한 workspace. 같은 레포면 생략.
 * @property {boolean} [openable] - 이 칩을 눌러 blocker 이슈를 열 수 있다.
```

묶음 수준 `interactive`를 **칩 단위 `openable`로 대체한다.** 같은 카드 안에서도
열 수 있는 blocker(현재 레포이거나 owner root_dir을 아는 타 레포)와 열 수 없는
blocker(보이지 않는 workspace의 rig)가 섞이기 때문이다. 묶음 플래그로는 그것을
표현할 수 없다.

`interactive`를 렌더러 인자가 아니라 투영이 싣는 값으로 둔 §6의 이유 —
`candidateCard`·`miniRow`를 두 탭이 함께 부른다 — 는 `openable`에도 그대로
적용된다. 자리만 칩으로 내려온다.

렌더러 `dependencyChipsTemplate`은 `openable`인 칩에만 지금의
`<button class="worker-dep__label worker-dep__open" data-dep-id=...>`를 그리고,
`data-root-dir`을 함께 싣는다. 아니면 표시 전용 요소다. 라벨·툴팁·색·자리는 두
경우가 같다.

Monitor 투영은 모든 predecessor 칩에 `openable: true`를 실어 지금 동작
(`toggleDepPanel`)을 유지한다 — §5.3의 경계를 그대로 지킨다.

### 5.2 Worker 투영

`app/views/worker/index.js`의 `dependencyChipsFor`에서 `interactive: false`를
없앤다. `deriveWorkerBlockers`(`queue-blockers.js`)가 `blocker_workspaces`를 더
받아 칩마다 판정한다.

```
blocker_id의 prefix가 이 이슈와 같은 레포     → openable: true, root_dir 없음
blocker_workspaces에 키가 있다                → openable: true, root_dir = 그 값
그 외 (타 레포인데 owner 미상)                → openable 없음 (표시 전용)
```

### 5.3 클릭 동작

`app/main.js`가 Worker 뷰에 `switchWorkspace`를 넘긴다 — Monitor에 이미 넘기는
`handleWorkspaceChange`와 같은 함수다.

Worker의 클릭 핸들러가 `.worker-dep__open`을 잡아 Monitor의 `openRow()`와 같은
순서로 동작한다.

```
root_dir 없음 또는 현재 workspace와 같음  → gotoIssue(dep_id)
그 외                                      → switchWorkspace(root_dir)
                                               .then(() => gotoIssue(dep_id))
                                               .catch(→ 토스트 '레포 전환에 실패했습니다')
```

이 처리는 카드 기본 동작(`gotoIssue(카드 자신의 id)`)보다 **먼저** 일어나고 거기서
멈춘다. 출처 칩(`.ctl-chip--from`)이 이미 같은 자리에서 같은 방식으로 처리된다.

### 5.4 열 수 없는 blocker

`openable`이 없는 칩은 지금처럼 표시 전용이다. 누를 수 없는 버튼을 만들지
않는다 — §5.3a가 원래 막으려던 것이 정확히 "눌러도 아무 일도 하지 않는 버튼"이고,
그 원칙은 유지된다.

## 6. 선행 스펙 정정

`docs/superpowers/specs/2026-08-26-lane-agnostic-dependency-chips-design.md`
§5.3a에 정정 문단을 덧붙인다. 이 저장소의 관용대로 원문을 지우지 않고 후속
결정을 명시한다(같은 문서 §5.1의 `**정정(UI-anna).**` 문단과 같은 모양).

정정의 요지: Worker 탭에 의존성 패널이 없다는 사실은 그대로다. 그러나 그것이
막는 것은 **패널을 여는 클릭**이지 칩의 모든 클릭이 아니다. Worker의 칩은
blocker 이슈를 열고, 열 수 없는 blocker만 표시 전용으로 남는다. `interactive`
묶음 플래그는 칩 단위 `openable`로 바뀐다.

`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md`는 갱신하지
않는다. 칩이 서는 줄은 슬롯 4 그대로이고, 바뀌는 것은 그 칩의 조작 가능성뿐이다.
슬롯 표가 정하는 것은 자리이지 조작 여부가 아니다.

## 7. 비목표

- Worker 탭에 의존성 패널을 도입하지 않는다.
- Monitor의 칩 클릭 동작을 바꾸지 않는다.
- Board 카드의 blocked 칩을 쪼개거나 클릭 가능하게 만들지 않는다.
- 상세 오버레이를 cross-workspace로 확장하지 않는다(§2.1).
- 계약 표면(라벨 어휘·durable metadata 키)을 건드리지 않는다. dotfiles 계약
  변경이 필요 없다.

## 8. 검증

1. `decorateQueue` 단위 테스트
   - 닫힌 foreign blocker가 `bead_blocked_by`에서 빠진다
   - status 미상 foreign blocker는 남는다
   - 같은 레포 blocker는 status와 무관하게 손대지 않는다
   - 보이는 어느 rig의 prefix에도 맞지 않는 id는 손대지 않는다
2. 늦게 도착한 `closed` status가 **요청한 workspace**의 fanout을 깨운다
3. prefix 캐시가 빈 상태(Monitor를 열지 않은 세션)에서도 정리가 결국 동작한다 —
   prewarm이 걸리고, 완료가 fanout을 깨우고, 다음 스냅샷에서 blocker가 빠진다
4. foreign 후보가 없는 스냅샷은 `visibleWorkspaceRoots()`를 부르지 않는다
5. `buildMonitorPipeline`이 후처리 없이도 같은 결과를 낸다 (회귀)
6. `blocker_workspaces`가 타 레포 blocker에만 실리고, owner 미상이면 키가 없다
7. 칩 클릭 세 경우
   - 같은 레포 → `gotoIssue`만 불린다
   - 타 레포 → `switchWorkspace` 후 `gotoIssue`
   - `openable` 없음 → 버튼이 그려지지 않는다
8. Monitor의 predecessor 칩이 여전히 `toggleDepPanel`을 연다 (회귀)
9. `npm run tsc` · `npm test` · `npm run lint` exit=0, `npm run build` 산출물 포함
10. 배포 후 실물 확인: `UI-06ku` 카드에서 칩이 사라졌는지, 살아 있는 blocker 칩
   클릭이 의도한 대상을 여는지

## 9. 구현 unit 후보

하나의 packet으로 봉인 가능하다. 순서만 적는다.

1. `server/worker/foreign-blocker-status.js` 추출 + monitor-handlers 정리 (§3.1)
2. `decorateQueue` 적용 + 요청자 기반 재렌더 (§3.2·§3.3)
3. `blocker_workspaces` 투영 (§4)
4. 칩 단위 `openable`과 클릭 동작 (§5)
5. 선행 스펙 정정 (§6)
