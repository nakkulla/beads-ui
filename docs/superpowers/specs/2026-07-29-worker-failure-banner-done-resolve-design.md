# 해소된 실패의 워커 배너 자동 해소 — done 레인 소속을 세 번째 조건으로

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

## done 레인 소속이 곧 "끝났다"인 이유

`moveToDone` / `moveToDoneWithDeploy` 호출부는 6곳뿐이고, 전부 종료를 이미 확정한
뒤에 부른다:

| 호출부 | 선행 확정 |
| --- | --- |
| `scheduler.js:545` `dequeueIfClosed` | `snap.status !== 'closed'`면 즉시 반환 |
| `scheduler.js:689` `sweepClosedQueue` | `statuses[bead_id] !== 'closed'`면 skip |
| `scheduler.js:1173` `onSessionDone` | `vr.already_finished` — verify가 MERGED PR + bd `closed` 관측(UI-b8n8) |
| `scheduler.js:1747` reconcile | 같은 `already_finished` 분기 |
| `pr-actions.js:1219` post-merge cleanup | step 6 `parent_close`(bd close) 성공 후의 마지막 단계 |
| `pr-actions.js:1232` `moveToDoneWithDeploy` | 같은 cleanup 경로, deploy 동반 |

따라서 done 레인 소속은 bd `closed`를 함의한다. 그리고
`removeFromLanes`(`queue-store.js:758`)가 재큐잉·PR 대기 재진입 시 `done` 항목을
지우므로, 재실행한 Bead의 새 실패가 낡은 "해소됨"을 물려받는 경로도 없다.

반면 클라이언트는 done 레인 Bead의 bd status를 **받지 않는다**. 서버 decoration은
`bead_titles` / `bead_times`뿐이고(`server/ws/worker-handlers.js:528-532`), status를
조건에 넣으려면 새 wire 키와 그 캐시의 partiality(캐시 미스 시 status 누락 →
배너가 안 내려감)를 떠안아야 한다. 같은 사실을 두 번 묻는 대가로 새 실패 모드를
들이는 셈이라, 이 스펙은 **done 레인 소속만**을 조건으로 쓴다.

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

### 1. done 레인 소속 집합

`buildModel`의 attempt 순회(`app/views/worker/index.js:1665` 이후) 앞에서 만든다.

```js
/** @type {Set<string>} */
const done_bead_ids = new Set(
  (Array.isArray(q.done) ? q.done : []).map(
    (/** @type {any} */ e) => e.bead_id
  )
);
```

**기간 필터가 걸린 `done_entries`(1871행)가 아니라 raw `q.done`을 쓴다.** 툴바
기간 선택은 완료 레인의 표시 범위일 뿐이고, 필터 밖으로 밀려난 Bead도 끝난 것은
마찬가지다. `done_entries`를 쓰면 "최근 1일"을 고른 순간 이틀 전에 끝난 Bead의
배너가 되살아난다.

`Array.isArray` 가드는 1871행의 방어 스타일을 따른다. `q.done`이 없거나 배열이
아니면 빈 집합이 되어 현행 동작이 그대로 유지된다(fail-quiet).

### 2. 판정 조건 추가

`app/views/worker/index.js:1759-1762`:

```js
const superseded = last_attempt_by_bead.get(a.bead_id) !== a.attempt_id;
const finished = done_bead_ids.has(a.bead_id);
if (!superseded && !finished && typeof a.dismissed_at !== 'number') {
  latest_failed = a;
}
```

기존 주석("only an UNHANDLED one: a later attempt … supersedes it, and a ✕
dismisses it")에 세 번째 조건을 함께 기술한다.

## 거동

`latest_failed`는 순회 중 마지막 미처분 실패를 잡는다. done으로 걸러진 attempt는
후보에서 빠지고, **다른 Bead의 미처분 실패가 있으면 그것이 배너가 된다** — ✕를
눌렀을 때와 같은 "다음 것으로 내려간다" 동작이다. 남은 미처분 실패가 없으면
`failure`가 `null`이 되어 실패 배너만 사라지고, cleanup / ship 배너는 각자의
durable 레코드대로 남는다.

재큐잉된 경우 `removeFromLanes`가 done 항목을 지우므로 배너가 다시 뜬다. 이것은
정확한 관측이다 — Bead가 다시 대기 레인에 있고 아직 안 돌았으면 과거 실패는
여전히 미처분이고, 새 attempt가 뜨는 순간 supersede가 덮는다.

attempt 레코드는 손대지 않는다. `cause` / `cause_detail` / `dismissed_at` 전부
그대로이므로 상세 패널 세션 이력에서 실패 사유는 계속 읽힌다. 이력이 지워지는
것이 아니라 상단 배너만 내려간다.

## 테스트 범위

`app/views/worker/index.test.js`의 `worker view — failure banner lifecycle
(UI-dcw7)` describe(3689행)에 추가한다. 기존 `mountWithAttempts` 헬퍼는
`queueOf({ attempts })`만 넘기므로, `done` 엔트리를 함께 실을 수 있도록 헬퍼에
선택 인자를 더하거나 같은 패턴의 지역 헬퍼를 둔다.

- done 레인에 있는 Bead의 실패 attempt는 배너를 만들지 않는다
- done에 없는 Bead의 실패는 그대로 배너를 만든다 (회귀 방지)
- done 레인 Bead의 실패가 걸러진 뒤 다른 Bead의 미처분 실패가 배너가 된다
- 완료 레인 기간 필터가 표시 행을 줄여도 배너 해소는 유지된다
- `q.done`이 없는 스냅샷에서는 현행 동작이 유지된다 (fail-quiet)

## 비스코프

- **`auto_advance` 자동 복구.** 배너만 내린다. ▶/⏸ 토글(`index.js:1998-2000`)이
  이미 레인이 멈춰 있음을 보여주고, 자동 재개는 사람이 일부러 세워둔 레인을 다시
  굴릴 수 있다.
- **attempt 이력 변경.** durable 레코드는 읽기만 한다.
- **cleanup / ship 배너.** 각각 `cleanup_failed` · `ship_failure` durable 레코드
  소관이고, `moveToDone`은 정리가 실제로 완주했을 때만 `cleanup_failed[bead_id]`를
  지운다. 진짜 잔재는 묻히지 않는다.
- **배너에 bead_id 표시.** 현재 배너는 repo와 cause만 보여준다. 별건이다.
- **서버 `bead_statuses` decoration.** 위 "done 레인 소속이 곧 끝났다인 이유"에서
  기각했다.

## 마감 조건

프런트엔드 소스 변경이므로 `npm run build` 후 `app/main.bundle.js` ·
`app/main.bundle.js.map`을 함께 커밋한다. 머지 후 `bdui-shared restart` 및
프로세스 경로 · 포트 · HTTP 응답 실측까지가 완료 조건이다(AGENTS.md
Post-Merge Runtime Validation).
