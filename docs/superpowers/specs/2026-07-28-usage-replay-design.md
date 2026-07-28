# 세션 로그 재생 기반 usage-store 복구 (UI-ediw)

## 배경

bdui 서버가 attempt 실행 도중 재시작되면 in-memory `usage-store`의 라이브 토큰
집계가 사라진다. detached 세션 프로세스는 살아 있어도(orphan) 새 서버는 그
stdout 파이프에 재접속할 수 없으므로 이후 usage 이벤트도 수신하지 못하고, UI
배지는 사라지며 attempt 처분 시에도 `usage: null`로 영속된다(실측:
`dotfiles-fvkk-1785204240698-2` — attempt 시작 11:04, 서버 재시작 11:46).

세션 로그(`session-log.js`, `$XDG_STATE_HOME/bdui/<slug>/sessions/<attempt_id>.jsonl`)는
raw 러너 이벤트 스트림을 이미 attempt별로 영속하고 있으므로, 재시작 시점까지의
집계 재료는 전부 디스크에 있다. 이를 재생(replay)해 복구한다.

기각한 대안: 주기적 usage-store 스냅샷 영속화(쓰기 증폭 + 어차피 undercount,
세션 로그 재생에 완전히 지배됨), claude transcript 백필(전량 복구 가능하나 외부
포맷 결합 — 후속 후보, 본 작업 범위 외).

## 목표

1. 서버 재시작 후 기동 시, 영속된 `status === 'running'` attempt의 토큰 집계가
   세션 로그 재생으로 usage-store에 복원되어 UI 배지에 다시 표시된다.
2. 죽은 detached attempt를 reconcile이 처분할 때 복원된 집계가
   `Attempt.usage`로 영속된다.
3. 복구된 집계는 재시작 이후 이벤트가 빠진 부분값이므로 `replayed` 플래그로
   구분하고 툴팁에 한 줄로 표기한다(usage-store의 "관측 없음 ≠ 0" 철학 유지).

## 비목표

- 재시작 이후 이벤트 복구(파이프 유실 — 수용).
- claude transcript 백필(2차 안, 별도 제기 시 후속 Bead).
- 이미 터미널 상태로 `usage=null`이 영속된 과거 attempt의 백필.
- usage-store 스냅샷 영속화.

## 변경 사항

### 1) `server/worker/runner/claude.js` — usage 리프팅 헬퍼 export

`liftUsage(raw)`를 export: raw 스트림 이벤트 1건에서
`{ kind: 'message'|'result', usage }` 또는 `null`(usage 없음)을 리프팅한다.
`normalize()`가 내부에서 이 헬퍼를 재사용하도록 리팩터해 라이브 경로와 재생
경로의 의미 드리프트를 방지한다. 리프팅 의미는 기존과 동일: assistant 이벤트는
`message.usage` + `message_id`(동일 id 반복은 대체), `result` 이벤트는
`usage` + `total_cost_usd`(권위 총계).

### 2) 신규 `server/worker/usage-replay.js` — 재생 루틴

`replayUsage({ session_log, usage_store, workspace, attempt_id })`:

- `session_log.read(workspace, attempt_id)`로 파싱된 raw 이벤트를 순회(파일
  부재·빈 로그 → 빈 배열, malformed 라인은 read가 이미 스킵).
- 각 이벤트를 `liftUsage`에 통과시켜 `message`는 `usage_store.record`,
  `result`는 `usage_store.recordResult`로 기록. 로그에 `result`가 있으면 권위
  총계로 완전 복구된다.
- 1건 이상 기록했으면 `usage_store.markReplayed(workspace, attempt_id)` 호출
  후 true, 아니면 false 반환.
- 예외는 삼키고 false(재생 실패가 기동을 막지 않는다).

### 3) `server/worker/usage-store.js` — `replayed` 플래그

- `markReplayed(workspace, attempt_id)` 추가: 해당 attempt 엔트리에
  `replayed = true`를 기록.
- `get()` 반환 객체에 플래그가 있으면 `replayed: true`를 포함(권위 총계·합산
  양쪽 경로 모두). 라이브 세션 경로는 플래그를 만들지 않으므로 기존 동작 불변.
- 플래그는 기존 데코레이션(`ws/worker-handlers.js`)과 `usagePatch` 영속 경로를
  그대로 타고 프런트·`queue.json`에 도달한다(추가 배선 없음).

### 4) `server/worker/attach.js` — 기동 시 1회 재생

`registerWorkerAttachments`의 워크스페이스별 attachment 등록 시점(기동
reconcile 호출 직전)에, 영속 스냅샷의 `status === 'running'` attempt 각각에
대해 `replayUsage`를 실행한다. 기동 시점에는 이 프로세스가 소유한 세션이 없어
모든 running 레코드가 대상이다. 주기 reconcile 패스에서는 재실행하지 않는다
(일회성 — 로그 재읽기 낭비 방지; 이후 라이브 세션은 스트림이 직접 기록).

### 5) `server/worker/scheduler.js` — `disposeDeadAttempt`에 usage 영속

`verify_result`를 기록하는 기존 `updateAttempt` 호출에
`...usagePatch(workspace, attempt_id)`를 포함한다(`onSessionDone`이 exit를
기록하는 패턴의 미러). 효과: 죽은 detached attempt 처분 시(성공/실패 양 분기
공통) 재생된 집계가 영속되고, in-memory 엔트리도 `usagePatch`의 clear로
정리된다. 재생값이 없으면 기존처럼 빈 패치(`usage: null` 유지).

### 6) `app/views/worker/usage.js` — 툴팁 표기

`usageTooltip`: usage 레코드에 `replayed`가 참이면 "서버 재시작 복구 — 부분
집계" 한 줄을 추가한다. 배지 숫자 포맷(`formatUsageTotal`)은 변경하지 않는다.

## 동작 시나리오

- **살아있는 orphan**(fvkk 케이스): 기동 재생 → running 타일 배지에 재시작
  이전까지의 집계가 즉시 복원(툴팁에 부분 집계 표기) → 프로세스 사망 시 주기
  reconcile의 `disposeDeadAttempt`가 그 값을 영속.
- **재시작 직전에 이미 끝난 세션**(서버가 종료 관측 전에 죽음): 로그의
  `result` 이벤트로 권위 총계까지 완전 복구.
- **로그가 없거나 usage 이벤트가 없는 attempt**: no-op — 배지 없음(기존
  fail-quiet 유지).

## 테스트

- `usage-replay.test.js`(신규): 기존 `__fixtures__/claude-tools.jsonl` 재사용 —
  message-id 반복 대체 합산, `result` 권위 대체, 파일 부재/빈 로그 no-op,
  `replayed` 플래그 기록.
- `usage-store.test.js`: `markReplayed` → `get()` 플래그 포함, 라이브 경로
  플래그 부재.
- `scheduler.test.js`: `disposeDeadAttempt`가 재생된 tally를 attempt에
  영속하고 store를 비움.
- `attach.test.js`: 기동 등록 시 running attempt에 대한 재생 호출 와이어링.
- `usage.test.js`: `usageTooltip`이 replayed 레코드에 부분 집계 라벨 포함.

검증: Pre-Handoff 번들(`npm run tsc` / `npm test` / `npm run lint` /
`npm run prettier:write` / `npm run build` + 번들 커밋).
