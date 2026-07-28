# 워커 Discord 알림 — 알림센터 푸시 미리보기에 bead 식별 정보 노출 (UI-vb0t)

- 날짜: 2026-07-28
- Bead: UI-vb0t
- 대상: `server/worker/notify.js`, `server/worker/title-cache.js`,
  `server/worker/attach.js`

## 1. 배경·문제

워커 알림이 도착해도 알림센터(모바일·데스크탑 푸시)에는 멘션(`@linenon`)만
보인다. 어떤 bead의 어떤 전이인지 알려면 Discord 앱을 열어야 한다.

원인은 beads-ui가 아니라 페이로드 구조에 있다. `notify.js`의 `send()`
(`notify.js:139`)는 네 전이 모두 `-t <제목>`을 붙여 `discord` CLI를 호출한다.
CLI(`~/bin/discord`, 버전관리 밖의 개인 스크립트)는 `-t`가 있으면 **embed**로
전송하며, 멘션 모드에서 `content`에 넣는 것은 멘션 문자열 하나뿐이다.

```bash
# ~/bin/discord send_message() — 제목이 있을 때
json_data="{\"content\":\"$DISCORD_USER_MENTION\",\"allowed_mentions\":{...},\"embeds\":[$embed]}"
```

Discord 푸시 알림은 message `content`만 미리보기로 사용하고 embed의
`title`/`description`은 싣지 않는다. 따라서 `TITLE` 상수(`notify.js:34`)를
어떻게 다듬어도 알림센터에는 나타나지 않는다.

`-q`(quiet) 경로는 더 나쁘다. 시작(`notify.js:218`)과 머지 완료
(`notify.js:268`)는 멘션조차 없어 `content`가 비고, 채널 알림 설정이
"@멘션만"이면 푸시 자체가 오지 않는다. 정작 사용자가 가장 알고 싶은
"어떤 이슈의 작업이 끝났는가"가 무음인 셈이다.

## 2. 목표·비목표

**목표**: 네 전이(시작·실패·PR 제출·머지 완료) 모두 알림센터 미리보기 첫 줄에서
전이 종류와 bead(id + 제목)를 읽을 수 있고, 채널 알림 설정과 무관하게 푸시가
도달한다.

**비목표**:

- `~/bin/discord` CLI 수정. 이 저장소 밖의 공유 도구이며, 사용자 결정에 따라
  건드리지 않는다.
- 알림 대상 전이의 추가·삭제. 네 전이 구성은 그대로다.
- embed 색상 구분 유지. 아래 §3.1이 의도적으로 포기한다.

## 3. 설계

### 3.1 embed 폐기 — 평문 `content` 전송

`send()`가 붙이던 `-t`/`-c`/`-q`를 모두 제거하고 메시지 본문만 인자로 넘긴다.
`-t`가 없으면 CLI는 평문 경로를 타고, 멘션 모드에서 `content`는
`"<멘션> <본문>"`이 되어 미리보기에 그대로 실린다.

`-c`(색상)는 embed 전용이므로 함께 제거한다. 채널에서 색상 막대가 사라지는
것은 이 설계가 받아들이는 대가이며, 전이 구분은 각 문구의 선두 이모지
(🚀 ❌ 📬 ✅)가 대신한다.

`-q` 제거로 네 전이 모두 멘션이 붙는다. UI-9rrk가 "사람이 행동해야 하는 두
전이만 멘션"으로 설계했던 것을 뒤집는 변경이며, 근거는 멘션 없는 메시지가
사용자 환경에서 푸시로 도달하지 않는다는 점이다. 알림 빈도는 attempt당 2~4회로
늘어난다.

`send()`의 나머지 계약(shell 없는 spawn, detached + unref, `error` 이벤트
로깅, 전 구간 no-throw)은 그대로 유지한다.

### 3.2 메시지 포맷

첫 줄에 전이와 bead를 함께 싣는다. 미리보기가 한 줄만 보여도 식별이 되도록
하는 것이 이 배치의 목적이다.

```
🚀 beads worker · 시작 — UI-vb0t 워커 Discord 알림 개선
리포: beads-ui
실행: opus / high

❌ beads worker · 실패 — UI-vb0t 워커 Discord 알림 개선
사유: verify_failed
리포: beads-ui
가드: <reason>
명령: <command>

📬 beads worker · PR 제출 — UI-vb0t 워커 Discord 알림 개선
리포: beads-ui
https://github.com/nakkulla/beads-ui/pull/64

✅ beads worker · 머지 완료 — UI-vb0t 워커 Discord 알림 개선
리포: beads-ui
https://github.com/nakkulla/beads-ui/pull/64
```

규칙:

- 첫 줄 = `<TITLE> — <bead_id>[ <bead 제목>]`. 제목을 얻지 못하면 bead id까지만
  쓰고 구분자 없이 끝낸다(fail-quiet).
- bead 제목은 60자를 넘으면 60자에서 자르고 `…`를 붙인다. 첫 줄이 미리보기
  예산을 독점하는 것을 막는다.
- 둘째 줄 이하는 기존 필드 순서를 유지한다. 실패는 `사유` → `리포` →
  `가드`/`명령`, PR 계열은 `리포` → PR URL. 값이 없는 필드는 생략한다.
- `kindLabel`(`notify.js:187`)의 `[재개]`/`[충돌 해결]` 접두는 전이 문구로
  흡수한다: `🚀 beads worker · 재개`, `🚀 beads worker · 충돌 해결`. 기본
  dispatch는 `🚀 beads worker · 시작` 그대로다.

### 3.3 bead 제목 공급

`prWaitEntered`(`scheduler.js:935`, `:1398`)와
`mergeCompleted`(`pr-actions.js:1060`)는 현재 `bead_id`만 넘긴다.
`attemptStarted`만 최초 dispatch의 큐 스냅샷에서 `title`을 받으며
(`scheduler.js:1759`), resume/conflict 재기동에는 그마저 없다.

제목은 `title-cache.js`에서 가져온다. 기존 동기 API `titlesFor`
(`title-cache.js:185`)는 캐시 미스를 그냥 생략하므로, 브라우저가 큐를 보고
있지 않았던 구간에서는 제목이 계속 빠진다. 그래서 비동기 접근자를 추가한다.

```js
// title-cache.js
/**
 * @param {string} workspace
 * @param {string} bead_id
 * @returns {Promise<string|null>}
 */
async ensureTitle(workspace, bead_id) { ... }
```

동작:

- 캐시 히트면 즉시 그 값으로 resolve한다.
- 미스면 기존 `fetchTitle`(`title-cache.js:114`) 경로로 `bd show`를 한 번
  태우고, 결과를 캐시(성공) 또는 negative 캐시(실패)에 반영한 뒤 resolve한다.
  negative TTL(`NEGATIVE_TTL_MS`)이 살아 있는 동안은 `bd`를 다시 부르지 않고
  `null`을 반환한다.
- 같은 bead의 조회가 이미 진행 중이면 **그 조회 결과를 공유한다**. 이를 위해
  `in_flight`를 `Set<string>`에서 `Map<string, Promise<string|null>>`로 바꾸고,
  키는 지금과 같은 `<resolved workspace>\0<bead_id>`를 쓴다. `titlesFor`는
  기존처럼 미스를 즉시 생략하되(동기 계약 불변) 중복 억제는 같은 Map을 본다.
  이 자료구조 교체가 `titlesFor`의 외부 동작을 바꿔서는 안 된다.
- 실패는 모두 `null`로 수렴한다. throw하지 않는다.
- 채워진 제목은 `onFilled` 콜백을 통해 기존 스냅샷 재fanout에도 그대로
  기여한다 — 알림이 캐시를 데우면 UI 카드도 함께 이득을 본다.

`notify.js`는 새 선택적 의존성 `resolveTitle?: (bead_id: string) =>
Promise<string|null>`을 받는다. `attach.js`가 이미 보유한 `runtime`
(`attach.js:320`)과 `workspace_root`로 워크스페이스를 바인딩해 주입한다
(`attach.js:401`). 같은 notifier 인스턴스가 scheduler(`attach.js:437`)와
prActions(`attach.js:582`) 양쪽에 주입되므로 주입 지점은 한 곳이다.

각 알림 메서드는 지금처럼 `void`를 반환한다. 내부에서 제목 조회를 await한 뒤
전송하며, 조회 실패·부재는 제목 없는 메시지로 전송한다. `attemptStarted`는
호출자가 준 `title`이 있으면 조회를 건너뛴다. `resolveTitle`이 주입되지 않은
구성(기존 테스트, notifier 단독 생성)은 제목 없이 동작한다.

**부수 효과**: 캐시 미스 시 알림이 `bd show` 한 번(수백 ms)만큼 늦고, 이론상
근접한 두 전이의 도착 순서가 뒤바뀔 수 있다. 실제 전이 간격은 초~분 단위이므로
수용한다.

## 4. 변경 범위

- `server/worker/notify.js` — `TITLE` 문구 확장(재개/충돌 해결 포함), `send()`
  플래그 제거, 네 메서드의 본문 조립, 제목 병합·절단, `resolveTitle` 의존성.
- `server/worker/title-cache.js` — `ensureTitle` 추가, `in_flight`를 Map으로
  교체. 기존 `titlesFor`/`clear`/`setOnFilled`의 외부 동작은 불변.
- `server/worker/attach.js` — `createNotifier`에 `resolveTitle` 주입 (1개소).
- `server/worker/notify.test.js` — 전송 인자에서 `-t`/`-c`/`-q` 부재 검증, 네
  전이의 첫 줄 포맷, 제목 부재·절단, `resolveTitle` 실패 시 무해성.
- `server/worker/title-cache.test.js` — `ensureTitle` 히트/미스/실패/negative
  TTL/`in_flight` 중복 억제.

`scheduler.js`와 `pr-actions.js`는 호출 인자를 바꾸지 않는다.

## 5. 검증

- `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`.
- 프런트엔드 소스 변경이 없으므로 번들 재빌드는 불필요하다.
- 머지 후 `bdui-shared restart`로 공유 서버를 재시작하고 프로세스 경로·포트·HTTP
  응답을 확인한다(AGENTS.md Post-Merge Runtime Validation).
- 실제 푸시 도달은 다음 워커 attempt에서 사용자가 알림센터로 확인한다. 이
  세션에서 실 전송을 임의로 트리거하지 않는다.

## 6. 리스크

- **알림 소음 증가**: 멘션이 attempt당 2~4회로 늘어난다. 과하면 시작 전이만
  `-q`로 되돌리는 것이 최소 복구 경로다.
- **색상 구분 상실**: 채널을 눈으로 훑을 때 embed 막대가 사라진다. 이모지가
  대신하지만 동등하지는 않다.
- **CLI 결합**: 이 설계는 `~/bin/discord`가 "제목 없으면 평문 content" 경로를
  유지한다는 데 의존한다. CLI가 바뀌면 포맷이 깨진다. 계약을 문서로만 고정하고
  코드로 강제하지는 않는다.
