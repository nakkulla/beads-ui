# 해소된 실패의 워커 배너 자동 해소 — done 진입을 세 번째 조건으로

- Bead: UI-a9ys
- 작성일: 2026-07-29

## 배경

워커 탭 상단의 실패 배너(`bannersTemplate`, `app/views/worker/running-grid.js:243`)는
두 조건으로만 사라진다(`app/views/worker/index.js:1759-1762`):

1. **supersede** — 같은 Bead의 더 나중 attempt가 존재한다
2. **dismiss** — 사람이 ✕를 눌러 `dismissed_at`을 찍었다

"이 Bead의 일이 실제로 끝났다"는 해소 조건에 없다.

실측(2026-07-29, dotfiles workspace) — `dotfiles-z0oj` / `dotfiles-e6k6`는 PR
머지 · `bd closed` · 정리(브랜치·워크트리 삭제·배포)까지 끝나고 UI-m6bg 스윕으로
완료 레인까지 이동했는데도, `verify_failed:pr_missing` 배너가 그대로 남아
"자동 진행을 껐습니다, 수동 ▶ 필요"라고 표시하고 ↻ 이어하기를 권했다. 그 버튼을
누르면 닫힌 Bead를 다시 굴린다 — 배너가 현실보다 뒤처진 상태에서 유일하게 눈에
띄는 버튼이 잘못된 행동을 유도한다.

이 결함은 UI-b8n8과 층이 다르다. UI-b8n8은 "완료를 실패로 오판정한다"이고 이것은
"해소된 실패의 배너가 안 내려간다"라, UI-b8n8을 고쳐도 사람이 일반 세션에서 끝낸
Bead 등 다른 경로로 재현된다.

## 결함의 성격

이것은 **관측이 현실보다 뒤처진 문제**이지 **상태를 잃어버린 문제**가 아니다.
"이 Bead의 일이 끝났다"는 사실은 이미 durable하게 스냅샷 안에 있다 —
`queue.json`의 `done` 배열이 그것이다. 배너 판정이 그걸 읽지 않을 뿐이다.

## 조건은 "done 소속"이 아니라 "이 실패보다 나중에 done으로 들어갔다"이다

`moveToDone` / `moveToDoneWithDeploy` 호출부는 6곳뿐이고, 이 코드가 만드는 done
항목은 전부 종료를 이미 확정한 뒤에 들어간다:

| 호출부 | 선행 확정 |
| --- | --- |
| `scheduler.js:545` `dequeueIfClosed` | `snap.status !== 'closed'`면 즉시 반환 |
| `scheduler.js:689` `sweepClosedQueue` | `statuses[bead_id] !== 'closed'`면 skip |
| `scheduler.js:1173` `onSessionDone` | `vr.already_finished` — verify가 MERGED PR + bd `closed` 관측(UI-b8n8) |
| `scheduler.js:1747` reconcile | 같은 `already_finished` 분기 |
| `pr-actions.js:1219` post-merge cleanup | step 6 `parent_close`(bd close) 성공 후의 마지막 단계 |
| `pr-actions.js:1232` `moveToDoneWithDeploy` | 같은 cleanup 경로, deploy 동반 |

`removeFromLanes`(`queue-store.js:758`)가 재큐잉·PR 대기 재진입 시 `done` 항목을
지우므로, 그 경로로 돌아온 Bead의 새 실패는 낡은 "해소됨"을 물려받지 않는다.

### 소속만으로는 부족한 두 구멍

**재개(↻)는 레인을 건드리지 않는다.** `resume()`(`scheduler.js:2376-2422`)의
거부 사유는 `not_failed` · `no_session_id` · `worktree_missing` · `bead_running` ·
`already_resumed` 다섯 가지뿐이고 레인 소속은 보지 않는다.
`relaunchFromAttempt`(`scheduler.js:2789-2853`)도 새 attempt를 만들 뿐
`removeFromLanes`를 부르지 않는다. 상세 패널 세션 이력의 재개는
`dismissed_at`을 자격에서 의도적으로 제외하므로(`app/views/detail-panel/session-history.js:204`)
done 레인에 앉은 Bead의 실패 attempt도 워크트리만 남아 있으면 재개된다. 그
child가 다시 실패하면 — 낡은 done 항목이 **새 실패까지** 숨긴다. 소속만 보는
규칙의 실제 구멍이다.

**legacy done 항목은 종료를 함의하지 않는다.** 로더는 pr_stop 시절
queue.json의 done 항목을 의도적으로 그대로 유지한다(`queue-store.js:578-582`,
"never rewrite a queue the user built"). 그 시절 done의 의미는 PR 전달 + bd
`resolved`였지 `closed`가 아니었다.

### 규칙

두 구멍을 하나의 조건이 닫는다 — **done 항목의 `added_at`이 그 실패의
`finished_at` 이상일 때만** 해소한다.

- `failAttempt`가 실패 attempt에 `finished_at`을 쓴다(`scheduler.js:965`).
- done 항목은 `moveToDone`이 `{ bead_id, added_at: now() }`로 push하고,
  `removeFromLanes` 뒤에 push하므로 done 재진입은 타임스탬프를 갱신한다.
- 비교 불가능한 값은 **해소하지 않는다**(현행 동작 유지). `finished_at`이
  `null`인 구 attempt(`queue-store.js:496`), `added_at`이 없어 `0`으로
  정규화된 legacy 항목(`queue-store.js:446`)이 여기 해당한다. legacy pr_stop
  done 항목은 예외 처리 없이 이 규칙의 귀결로 억제 대상에서 빠진다.

실측 사례에 적용하면: 실패가 `finished_at=T1`, UI-m6bg 스윕의 done 이동이
`added_at=T2 > T1` → 해소된다. 재개 사례: done 이동 `T2`, child 실패
`finished_at=T3 > T2` → 해소되지 않고 배너가 뜬다.

### bd status를 조건에 넣지 않는 이유

클라이언트는 done 레인 Bead의 bd status를 **받지 않는다**. 서버 decoration은
`bead_titles` / `bead_times`뿐이고(`server/ws/worker-handlers.js:528-532`), status를
조건에 넣으려면 새 wire 키와 그 캐시의 partiality(캐시 미스 시 status 누락 →
배너가 안 내려감)를 떠안아야 한다. 위 표가 보이듯 done 진입 자체가 이미 종료
확정 뒤에 일어나므로 새 진실이 없고, 소속만으로 생기는 두 구멍은 status를 읽어도
닫히지 않는다 — 재개한 child의 실패는 Bead가 여전히 `closed`인 상태에서 일어나기
때문이다. 타임스탬프 비교만이 그 구멍을 닫는다.

## 접근

배너 판정에 세 번째 해소 조건을 추가한다. 순수 표시 레이어 파생값이며, 서버
변경도 durable 스키마 변경도 없다.

### 대안과 기각 사유

- **서버에서 `moveToDone` 때 `dismissed_at`을 스탬프한다** — 기존 "처리됨"
  마커를 재사용하지만 그 필드의 의미가 "사람이 ✕를 눌렀다"에서 오염된다.
  상세 패널 세션 이력이 이 필드를 그대로 실어 나르므로(`app/views/detail-panel/index.js:130-131`)
  사람이 안 누른 처분이 눌린 것처럼 보인다. 호출부 6곳이 전부 영향을 받고,
  과거 `queue.json`에는 소급되지 않아 이미 쌓인 잔재 배너는 그대로 남는다.
- **새 durable 필드 `auto_resolved_at`** — 의미는 가장 깨끗하지만, 화면상 결과가
  채택안과 완전히 동일한데 새 durable 키 + attempt 스키마 변경 + 비소급을
  지불한다.

채택안만이 **이미 쌓인 잔재에도 즉시 적용된다** — 서버 재시작 없이 다음 렌더에서
내려간다.

## 구현

### 1. done 진입 시각 맵

`buildModel`의 attempt 순회(`app/views/worker/index.js:1665` 이후) 앞에서 만든다.

```js
/** @type {Map<string, number>} */
const done_at_by_bead = new Map();
for (const e of /** @type {any[]} */ (q.done)) {
  if (e && typeof e.bead_id === 'string' && typeof e.added_at === 'number') {
    done_at_by_bead.set(e.bead_id, e.added_at);
  }
}
```

**기간 필터가 걸린 `done_entries`(1871행)가 아니라 raw `q.done`을 쓴다.** 툴바
기간 선택은 완료 레인의 표시 범위일 뿐이고, 필터 밖으로 밀려난 Bead도 끝난 것은
마찬가지다. `done_entries`를 쓰면 "최근 1일"을 고른 순간 이틀 전에 끝난 Bead의
배너가 되살아난다.

`Array.isArray` 가드는 두지 않는다. 같은 함수 1525행이 이미 `q.done`을 무가드로
역참조하므로 `q.done` 부재는 도달 가능한 상태가 아니고 — 서버 로더가 항상
배열로 정규화하며(`queue-store.js:583`), 클라이언트 폴백도 `done: []`을
들고 있다(`index.js:940`) — 여기에만 가드를 두면 1525행에서 이미 던진 뒤라
아무것도 막지 못한다. 그런 상태를 가정하는 테스트도 두지 않는다.

### 2. 판정 조건 추가

`app/views/worker/index.js:1759-1762`:

```js
const superseded = last_attempt_by_bead.get(a.bead_id) !== a.attempt_id;
// 이 실패가 난 뒤에 done으로 들어갔을 때만 해소한다. 비교 불가능한 값
// (구 attempt의 null finished_at, 정규화로 0이 된 legacy added_at)은
// 해소하지 않는다 — 재개한 child의 새 실패를 낡은 done이 숨기는 것을 막는
// 것이 이 비교의 목적이다.
const done_at = done_at_by_bead.get(a.bead_id);
const resolved_by_done =
  typeof done_at === 'number' &&
  done_at > 0 &&
  typeof a.finished_at === 'number' &&
  done_at >= a.finished_at;
if (!superseded && !resolved_by_done && typeof a.dismissed_at !== 'number') {
  latest_failed = a;
}
```

기존 주석("only an UNHANDLED one: a later attempt … supersedes it, and a ✕
dismisses it")에 세 번째 조건을 함께 기술한다.

## 거동

`latest_failed`는 순회 중 마지막 미처분 실패를 잡는다. 해소된 attempt는
후보에서 빠지고, **다른 Bead의 미처분 실패가 있으면 그것이 배너가 된다** — ✕를
눌렀을 때와 같은 "다음 것으로 내려간다" 동작이다. 남은 미처분 실패가 없으면
`failure`가 `null`이 되어 실패 배너만 사라지고, cleanup / ship 배너는 각자의
durable 레코드대로 남는다.

재큐잉된 경우 `removeFromLanes`가 done 항목을 지우므로 배너가 다시 뜬다. 이것은
정확한 관측이다 — Bead가 다시 대기 레인에 있고 아직 안 돌았으면 과거 실패는
여전히 미처분이고, 새 attempt가 뜨는 순간 supersede가 덮는다.

done 상태에서 재개(↻)한 경우는 레인이 그대로 남으므로 위 타임스탬프 비교가
유일한 방어선이다. child가 성공하면 `moveToPrWait`/`moveToDone`이 레인을
정리하고, 실패하면 `finished_at`이 done `added_at`보다 뒤이므로 배너가 뜬다.

attempt 레코드는 손대지 않는다. `cause` / `cause_detail` / `dismissed_at` 전부
그대로이므로 상세 패널 세션 이력에서 실패 사유는 계속 읽힌다. 이력이 지워지는
것이 아니라 상단 배너만 내려간다.

## 테스트 범위

`app/views/worker/index.test.js`의 `worker view — failure banner lifecycle
(UI-dcw7)` describe(3689행)에 추가한다. 기존 `mountWithAttempts` 헬퍼는
`queueOf({ attempts })`만 넘기므로, `done` 엔트리를 함께 실을 수 있도록 헬퍼에
선택 인자를 더하거나 같은 패턴의 지역 헬퍼를 둔다.

- 실패보다 나중에 done에 들어간 Bead의 실패 attempt는 배너를 만들지 않는다
- done에 없는 Bead의 실패는 그대로 배너를 만든다 (회귀 방지)
- done 진입(`added_at`)보다 **나중에** 실패한 attempt는 배너를 만든다 — done
  상태에서 재개한 child가 실패한 경우
- 해소된 실패가 걸러진 뒤 다른 Bead의 미처분 실패가 배너가 된다
- 완료 레인 기간 필터가 표시 행을 줄여도 배너 해소는 유지된다
- `finished_at`이 `null`인 구 attempt는 done 항목이 있어도 배너를 만든다
- `added_at`이 `0`인 legacy done 항목은 해소하지 않는다

## 비스코프

- **`auto_advance` 자동 복구.** 배너만 내린다. ▶/⏸ 토글(`index.js:1998-2000`)이
  이미 레인이 멈춰 있음을 보여주고, 자동 재개는 사람이 일부러 세워둔 레인을 다시
  굴릴 수 있다.
- **attempt 이력 변경.** durable 레코드는 읽기만 한다.
- **cleanup / ship 배너.** 각각 `cleanup_failed` · `ship_failure` durable 레코드
  소관이고, `moveToDone`은 정리가 실제로 완주했을 때만 `cleanup_failed[bead_id]`를
  지운다. 진짜 잔재는 묻히지 않는다.
- **배너에 bead_id 표시.** 현재 배너는 repo와 cause만 보여준다. 별건이다.
- **서버 `bead_statuses` decoration.** 위 "bd status를 조건에 넣지 않는 이유"에서
  기각했다.

## 마감 조건

프런트엔드 소스 변경이므로 `npm run build` 후 `app/main.bundle.js` ·
`app/main.bundle.js.map`을 함께 커밋한다. 머지 후 `bdui-shared restart` 및
프로세스 경로 · 포트 · HTTP 응답 실측까지가 완료 조건이다(AGENTS.md
Post-Merge Runtime Validation).
