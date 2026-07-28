# 워커 슬롯 회계 — 재시작 생존 세션 점유 반영 (UI-97qo)

- 날짜: 2026-07-28
- Bead: UI-97qo
- 대상: `server/worker/scheduler.js` (`tickPass` 점유 계산)

## 1. 배경·문제

2026-07-28 09:52Z, beads-ui 워크스페이스가 `slots=2` 설정인데 세 세션이 동시
실행됐다(UI-5v7d/UI-w0hi/UI-yp64 실측).

`tickPass`의 자유 슬롯 계산(`scheduler.js:2481`)이 인메모리 Set만 센다.

```js
let free = slotsOf(q) - claimed.size;
```

`claimed`(`scheduler.js:225`)는 프로세스 메모리라 서버 재시작 시 비워진다.
반면 디스패치된 세션은 detached라 서버 재시작을 넘어 생존한다. 복구를 맡는
`reconcile()`의 `isDeadAttempt()`(`scheduler.js:1219`)는 **죽은** attempt만
선별하므로, 살아있는 고아 attempt는 아무 처리도 받지 않고 `claimed`로 복원되지도
않는다(`claimed.add`는 `:1328`/`:2191`/`:2529` 신규 dispatch 경로뿐).

결과: 재시작 후 첫 tick에서 `free = slots - 0`이 되어 실행 중인 세션이 회계에서
통째로 누락된다. 이번 사례에서 UI-5v7d는 bd상 `in_progress`(not-ready)라
재디스패치는 면했지만 슬롯도 점유하지 않아, 남은 2칸에 두 건이 추가로 들어갔다.

`scheduler.js:2478` 주석은 `Occupancy is claimed, NOT running`이라고 의도를
명시한다. 그 등식은 **서버 생애가 attempt 생애를 포함할 때만** 성립하며, detached
세션은 정확히 그 전제를 깬다.

### 재현 조건

일회성 사고가 아니다. 머지 후 deploy 훅이 서버를 재시작하는 경로에서 구조적으로
재현된다. 이번 트리거도 UI-9rrk 머지 후 deploy였다(`last_deploy.at`
= 1785232019459 = 새 서버 프로세스 시작 시각과 일치).

## 2. 목표·비목표

**목표**: `slots` 상한이 서버 재시작을 넘어 유지된다. 재시작을 생존한 실행 중
세션이 자유 슬롯 계산에서 점유로 집계된다.

**비목표**:

- `reconcile`/`disposeDeadAttempt` 경로 변경 — 고아의 **완료** 처리는 이미
  동작한다(60초 주기, `attach.js:75`). 누락된 것은 실행 중 **점유** 회계뿐이다.
- `claimed`에 고아 재등록 — `reconcile`의 dispose 펜스(`:1467`, `:1479`)가
  `claimed`를 검사하므로, 재등록하면 고아 정리가 영구 불가능해진다. 오버부킹이
  데드락으로 뒤집히는 교환은 받지 않는다(사용자 확정).
- `runningCount()`/healthz `running_count` 정합 — 소비처가 healthz뿐이고
  (`health.js:70`) UI 카드는 durable `attempts`로 그리므로 이번 버그와 인과가
  없다(사용자 확정).
- 현재 실행 중인 3개 세션의 강제 정리 — 그대로 두고 다음 재시작부터 새 회계가
  적용된다.

## 3. 설계

`tickPass`의 점유 계산 한 곳만 바꾼다.

```js
// 이 프로세스가 소유를 주장하는 attempt는 claimed가 이미 대표한다.
// 남는 것 — 이 프로세스가 전혀 모르는 durable running — 이 재시작을 생존한 고아다.
const occupied = new Set(claimed);
for (const [attempt_id, a] of Object.entries(q.attempts || {})) {
  if (!a || a.status !== 'running') {
    continue;
  }
  if (
    running.has(attempt_id) ||
    settling.has(attempt_id) ||
    claimed.has(a.bead_id)
  ) {
    continue;
  }
  if (!isDeadAttempt(a)) {
    occupied.add(a.bead_id);
  }
}
let free = slotsOf(q) - occupied.size;
```

### 3.1 `reconcile`과 동일한 세 펜스

`running` / `settling` / `claimed`(bead 기준)는 `reconcile`이 고아 후보를 고를 때
쓰는 펜스(`scheduler.js:1464-1470`)와 정확히 같다. 그래서 "reconcile이 고아
후보로 보는 집합"과 "회계가 추가로 세는 집합"이 일치한다.

이 일치가 설계의 핵심이다. 두 곳이 서로 다른 기준으로 고아를 정의하면 이후 한쪽만
수정될 때 반드시 어긋난다. 판정 기준을 하나로 묶어 그 발산 가능성을 없앤다.

### 3.2 bead 단위 합집합

`occupied`는 bead_id를 담는 Set이고 `claimed`로 초기화된다. 같은 bead가 양쪽에
있어도 이중 계산되지 않는다. 슬롯 상한이 bead 단위 동시성 제한이므로 회계 단위도
bead가 맞다.

### 3.3 정상 경로에서 `probePid` 호출 0회

이 서버가 띄운 세션은 전부 3.1의 펜스에서 걸러지므로 `isDeadAttempt`까지 가지
않는다. `probePid`(`attach.js:266`)의 `ps -o lstart=` 동기 스폰은 재시작 직후 실제
고아가 있을 때만, 고아 수만큼 발생한다.

### 3.4 오판 방향의 비대칭

`isDeadAttempt`는 `deps.probePid`가 함수가 아니면 `false`(=죽지 않음)를 반환한다.
회계에서 이 기본값은 "의심스러우면 점유"가 되어 오버부킹 대신 슬롯을 아끼는 쪽으로
틀어진다.

같은 판정이 두 소비처에서 각자 안전한 방향을 가리킨다는 점이 중요하다:

| 소비처 | 잘못 "살아있다" 판정 | 잘못 "죽었다" 판정 |
| --- | --- | --- |
| dispose (`reconcile`) | 정리 지연(다음 패스가 회수) | 실행 중 세션 강제 종결 — 사고 |
| 슬롯 회계 (본 변경) | 슬롯 하나 덜 씀 — 보수적 | 오버부킹 — 본 버그 |

두 소비처의 위험이 반대 방향이고, 기존 기본값이 양쪽 모두에서 안전한 쪽이다.

### 3.5 깨지지 않는 기존 계약

- **`pause`의 슬롯 해제**(`:2583` "pausing one session must not stall the whole
  lane") — `pause`는 durable status를 `'paused'`로 쓰므로(`:2612`)
  `status !== 'running'` 필터에서 제외된다.
- **`reconcile` dispose 경로** — 읽기만 하고 변경하지 않는다.
- **`free` 음수**(고아 3 > slots 2) — 기존 `free <= 0` break(`:2483`)가 흡수한다.
- **stop 직후 창** — durable이 아직 `'running'`이고 프로세스가 죽는 중이면 점유로
  집계된다. 실제로 자원을 쥐고 있는 상태이므로 회계상 옳고, durable이 종결 상태로
  갱신되면 다음 tick에 해제된다.

## 4. 수용 기준

1. durable `attempts`에 `status: 'running'`이고 PID가 살아있는 attempt가 있으나
   `running`/`settling`/`claimed` 어디에도 없을 때, 그 bead가 자유 슬롯 계산에서
   점유로 집계된다.
2. 같은 조건에서 PID가 죽어 있으면 점유로 집계되지 않는다.
3. `paused` attempt는 슬롯을 점유하지 않는다(기존 동작 유지).
4. 이 서버가 띄운 세션만 있는 정상 경로에서 `probePid`가 호출되지 않는다.
5. 기존 슬롯 정책 테스트(`scheduler slot policy` describe 블록)가 전부 통과한다.

## 5. 테스트 범위

`server/worker/scheduler.test.js`에 4건 추가한다. 기존 `setup()`이 `probePid`를
주입 옵션으로 이미 받으므로(`scheduler.test.js:320`) 별도 하네스가 필요 없다.

| # | 테스트 | 수용 기준 |
| --- | --- | --- |
| 1 | 재시작 생존 고아가 슬롯을 점유한다 | 1 |
| 2 | 죽은 고아는 슬롯을 점유하지 않는다 | 2 |
| 3 | `paused` attempt는 슬롯을 푼다 | 3 |
| 4 | 정상 경로에서 `probePid`를 호출하지 않는다 | 4 |

1번이 이번 버그의 직접 회귀 테스트다. 재시작은 "store에 running attempt를 심고
스케줄러를 새로 만든다"로 시뮬레이션한다 — 새 스케줄러의 인메모리 Set이 비어 있는
것이 재시작 후 상태와 동일하다.

## 6. 검증

`npm run all`(lint/tsc/test/prettier/build). 이 저장소는 GitHub CI가 돌지 않으므로
(`AGENTS.md`) 로컬 검증이 CI 역할을 대신한다.

머지 후에는 `bdui-shared restart`로 공유 서버를 재시작하고 프로세스 경로·포트·HTTP
응답을 확인한다. 이 변경은 재시작 경로 자체의 동작을 고치는 것이라, 재시작 후
`slots` 상한이 유지되는지가 실질 확인 지점이다.
