# worker scheduler 중복 dispatch 수정 — tickPass 재진입 가드

- Bead: UI-2hc5
- Route: spec_backed
- 작성일: 2026-08-03

## 배경 — 관측된 사고

2026-08-03, `microbiome_bile` 워크스페이스에서 같은 bead(`Analysis-1p6`)에 워커 세션 두 개가 동시에 `running` 상태로 떴다. 두 프로세스의 cwd 가 동일한 워크트리(`.worktrees/Analysis-1p6`)였고, 그 워크트리에 미커밋 변경이 쌓인 채 두 에이전트가 같은 브랜치에서 작업했다. 동시에 `slots = 2` 인데 `running` 이 3개(`Analysis-imn` + `Analysis-1p6` x2)로 동시 실행 cap 도 초과했다.

관측 증거 (`~/.local/state/bdui/microbiome_bile-*/queue.json`):

| attempt | dispatch 진입 | spawn | pid |
| --- | --- | --- | --- |
| `Analysis-1p6-1785744296068-3` | 17:04:56 | 17:06:09 | 82478 |
| `Analysis-1p6-1785744370424-4` | 17:06:10 | 17:06:17 | 83393 |

- `queue` lane 에 `running` 인 `imn`·`1p6` 가 그대로 남아 있었다.
- `#3` 은 dispatch 진입부터 spawn 까지 73초가 걸렸다(워크트리 준비 등 git 작업).

## 근본 원인

`server/worker/scheduler.js` 의 dispatch 스캔에 재진입 직렬화가 없다. 아래 네 조건이 겹치면 중복 dispatch 는 논리적으로 필연이다.

1. `tick()` 에 재진입 락이 없고, `server/ws/worker-handlers.js:976,1035` 에서 `await` 없는 fire-and-forget 으로 호출된다. 앞선 pass 가 스캔 중이어도 새 pass 가 시작된다.
2. `tickPass()` 의 후보 스캔은 bead 마다 `await deps.bd.snapshotBead()` 와 `await checkAdmission()` 로 멈춘다. admission 은 `gh` 프로브 + `git cat-file`/`git log` 를 실행하므로(`server/worker/admission.js`) 느린 저장소에서 수십 초가 걸린다.
3. claim 은 스캔 종료 후 일괄로 잡히는데, 직전 재확인이 `live_queue.has(bead_id)` 즉 큐 멤버십뿐이고 `claimed.has()` 재확인이 없다 (`scheduler.js:3512-3522`).
4. dispatch 는 bead 를 큐 lane 에서 제거하지 않으므로 3번의 재확인은 항상 통과한다.

겹친 두 pass 는 각자 스캔 시점에 "claim 없음"을 보고 각각 `claimed.add` → `dispatch` 한다. `free` 슬롯도 pass 별로 독립 계산되어 cap 을 넘는다.

같은 워커 모듈의 `server/worker/auto-merge.js:144` 에는 이미 동일 문제를 해결한 coalesced pass 패턴(`scanning` 플래그 + `rescan` 재실행 마크)이 있다. scheduler 에만 이 가드가 없다.

## 변경 내용

### 1. `tickPass()` coalesce 재진입 가드

`auto-merge.js:144` 패턴을 async 로 옮기되, 그 패턴의 `scan()` 이 동기 void 함수라는 점에서 오는 차이를 반영한다. `tickPass` 는 호출자가 `await` 하는 async 함수이고, 호출자들은 그 완료를 **슬롯 refill 완료**로 취급한다(`scheduler.js:3611`·`3669`·`3710` 의 stop/pause/정리 경로는 `await tick(workspace)` 뒤에 `{ ok: true }` 를 반환하고, 기존 테스트도 `await scheduler.tick(WS)` 직후 `runningCount()` 를 단언한다). 그래서 겹친 호출을 "즉시 반환"으로 처리하면 그 계약이 깨진다.

- 현재 `tickPass` 본문을 `runPass()` 로 추출한다.
- 진행 중인 drain 을 인스턴스 스코프 변수 하나(`draining`, 진행 중이면 Promise·아니면 null)로 들고, 재실행 요청은 `rescan` 플래그로 둔다. `createScheduler` 는 워크스페이스별 인스턴스이므로(`server/worker/attach.js:938` 루프에서 워크스페이스마다 attachment 생성) 워크스페이스 키 Map 은 두지 않는다 — 기존 `claimed`/`running` 과 같은 스코프다.
- **외부 진입(`tick()`)**: drain 이 진행 중이면 `rescan = true` 를 세우고 **그 drain Promise 를 반환**한다. 호출자는 rescan 까지 끝난 뒤에 resolve 를 받으므로 refill 완료 계약이 보존된다. 진행 중이 아니면 새 drain 을 시작한다.
- **내부 재요청(`requestRescan()`)**: `rescan = true` 만 세우고 **아무것도 await 하지 않는** 별도 함수. `dispatch()` 의 refuse 경로는 이것을 부른다.
- 두 진입을 나누는 것은 편의가 아니라 **데드락 회피**다. refuse 경로의 `dispatch()` 는 `runPass()` 안에서 `Promise.all` 로 await 되는 중이므로, 그 안에서 drain Promise 를 `await` 하면 자기 자신의 완료를 기다리는 순환 대기가 된다.
- `finally` 에서 `draining = null` 을 보장해, pass 내부 예외가 가드를 영구 점유하지 못하게 한다.

```js
let draining = null;
let rescan = false;

function requestRescan() {
  rescan = true;
}

function tickPass(ws) {
  if (draining) {
    rescan = true;
    return draining;
  }
  draining = (async () => {
    try {
      do {
        rescan = false;
        await runPass(ws);
      } while (rescan);
    } finally {
      draining = null;
    }
  })();
  return draining;
}
```

### 2. claim 확정 직전 재확인

`to_launch` 필터에 `!claimed.has(d.bead_id)` 를 추가한다. 가드가 pass 겹침을 없앤 뒤에도 남는 얇은 방어선이다.

```js
const to_launch = to_dispatch.filter(
  (d) => live_queue.has(d.bead_id) && !claimed.has(d.bead_id)
);
```

### 영향받는 기존 경로

- `tick()` 은 그대로 `dispatch_refused.clear()` 후 `tickPass()` 를 부르고, 그 반환 Promise 를 await 한다. 가드를 `tick` 이 아니라 `tickPass` 에 두는 이유가 이것이다 — refuse 리셋은 즉시 일어나고 스캔만 합쳐진다.
- `dispatch()` 의 refuse 경로(`scheduler.js:2206`)의 `await tickPass(workspace)` 는 `requestRescan()` 호출로 바뀐다. 현재 pass 의 `Promise.all` 이 끝난 뒤 do-while 이 한 번 더 돌아 다음 후보를 집으므로, refuse 직후의 즉시성만 달라지고 anti-starvation 결과는 보존된다 — 그 tick 호출이 반환되기 전에 다음 runnable 후보가 dispatch 된다.

### 종료 보장

`rescan` 을 세우는 주체는 외부 `tick` 과 refuse 재요청 두 가지다.

- refuse 재요청은 유한하다. refuse 된 bead 는 `dispatch_refused` 에 누적되어 같은 drain 의 다음 회차에서 스킵되므로, 재요청은 큐 길이를 상한으로 소진된다.
- 외부 `tick` 은 상한이 없다. 따라서 종료 보장은 **외부 입력이 quiescent 해진 뒤 유한 회차 내 수렴**으로 한정된다. 외부 tick 이 계속 도착하는 동안 drain 이 이어지는 것은 결함이 아니라 coalescing 의 정의된 동작이다 — 도착한 tick 하나하나가 별도 pass 를 만들지 않고 진행 중 drain 의 다음 회차로 합쳐지며, 매 회차가 실제 스캔이므로 각 회차는 그 시점 큐 상태를 반영한다.
- 이 한정 아래에서도 진행 보장은 유지된다: 외부 tick 이 `dispatch_refused` 를 지우더라도 그 회차는 최신 큐를 다시 스캔하므로, 관측 없는 회전이 아니라 매번 유효한 dispatch 판정이 일어난다.

## 수용 기준

1. 겹친 두 `tick` 이 같은 bead 를 두 번 dispatch 하지 않는다.
2. 겹친 두 `tick` 이 `slots` cap 을 넘겨 dispatch 하지 않는다.
3. pass 도중 도착한 `tick` 이 유실되지 않는다 — 스캔 중 큐에 들어온 bead 가 같은 사이클에서 집힌다.
4. 겹친 두 번째 `tick` 의 Promise 는 편승한 rescan 회차가 끝난 뒤에 resolve 된다 — stop/pause 경로가 의존하는 "await 완료 == 슬롯 refill 완료" 계약이 보존된다.
5. refuse 경로의 재요청이 여전히 다음 후보로 진행한다(기존 anti-starvation 동작 회귀 없음). 데드락이 없다.
6. 기존 `server/worker/scheduler.test.js` 전량이 통과한다.

## Test scope

seam 은 모두 `server/worker/scheduler.test.js` 에 추가한다. 기존 `setup()` 의 fake `bd.snapshotBead`/`admission` 에 지연 훅을 넣어 pass 겹침을 결정론적으로 재현한다(실제 타이머 대기 없이 promise 제어로).

| # | seam | RED 조건 |
| --- | --- | --- |
| 1 | 겹친 두 tick 이 같은 bead 를 한 번만 dispatch | 현재 코드에서 spawn 2회 |
| 2 | 겹친 두 tick 이 slots cap 을 넘기지 않음 | 현재 코드에서 cap 초과 |
| 3 | 스캔 중 도착한 tick 이 유실되지 않음 | 가드 도입 시 회귀 방지 |
| 4 | 겹친 두 번째 tick 의 Promise 가 rescan 회차 완료 후 resolve | 가드 도입 시 회귀 방지 |
| 5 | refuse 재요청이 다음 후보로 진행 | 가드 도입 시 회귀 방지 |

seam 3·4·5 는 가드가 만들어내는 새 동작을 고정하는 것이므로, 가드 도입 전에는 RED 가 아니라 기존 동작으로 통과할 수 있다. 이 셋은 회귀 고정용이며 red-first 대상은 seam 1·2 다.

- seam 4 는 두 번째 `tick` Promise 의 **완료 시점**을 본다. 편승한 rescan 회차에서 dispatch 되는 bead 가, 그 Promise 가 resolve 된 시점에 이미 running 인지를 단언한다.
- seam 5 가 고정하는 것은 refuse 직후의 즉시성이 아니라 최종 결과다 — refuse 된 bead 다음의 runnable 후보가 같은 tick 호출이 반환되기 전에 결국 dispatch 되는지를 본다. 데드락 회귀는 이 seam 이 타임아웃 없이 완료되는 것으로 드러난다.

## Non-goals

- dispatch 시 bead 를 큐 lane 에서 제거하는 구조 변경. 큐 표시·순서·재큐잉·복귀 의미가 모두 바뀌어 이번 버그 범위를 크게 벗어난다.
- `dispatch_refused` 리셋 의미 변경.
- 크로스 프로세스 락. `server/worker/locks.js` 주석이 명시한 단일 서버 토폴로지 전제를 유지한다.
- 이번 사건의 잔여 런타임 상태 정리(paused attempt `Analysis-1p6-…-4`, 공유 워크트리). 코드 수정과 분리된 운영 조치로 뺀다.
- `server/worker/locks.js` 의 미사용 `dupRunLock` 배선. 이번 수정은 in-process 플래그로 충분하며, 미사용 API 정리는 별건이다.

## 검증

`npm run prettier:write && npm run all`.

`npm run all` 은 `lint && tsc && test && prettier:check` 이며 `build` 를 포함하지 않는다. 이 변경은 `server/` 아래 서버 코드만 건드리고 프런트엔드 소스를 건드리지 않으므로 `npm run build` 와 `app/main.bundle.js` 재생성은 대상이 아니다.

## 적용 절차 (post-merge)

`AGENTS.md` 의 Post-Merge Runtime Validation 상 이 저장소의 런타임 동작 변경은 공유 서비스 재배포까지 마쳐야 완료다. 이 변경은 워커 dispatch 루프의 런타임 동작을 바꾸므로 해당된다. 아래 순서를 고정하고, 각 단계의 결과를 확인한 뒤에만 다음으로 넘어간다. 중간에 멈추면 이전 단계까지의 상태가 그대로 유지되며(재시작 전이면 구 코드가 계속 서비스), 처음부터 다시 실행해도 안전하다.

1. 머지된 `main` 체크아웃 확인 — `git -C <repo> log --oneline -1` 이 머지 커밋인지, 작업 트리가 clean 한지 확인한다.
2. 런타임 설정 정합 확인 — `~/.config/bdui/config.toml` 이 이 변경으로 바뀐 키를 쓰지 않음을 확인한다(이 스펙은 설정 스키마를 바꾸지 않으므로 변경 없음이 기대값이다).
3. `bdui-shared restart` 로 공유 서버를 재시작한다.
4. 재시작 검증 — 프로세스 실행 경로가 머지된 체크아웃(`<repo>/server/index.js`)인지, listening port 가 기대값인지, HTTP 응답이 정상인지 세 가지를 모두 확인한다. 하나라도 어긋나면 완료로 보고하지 않는다.

재시작 후 워커 큐가 살아 있는지(`auto_advance` 상태와 running attempt 수가 재시작 전과 정합적인지)도 함께 확인한다 — 이 변경이 dispatch 루프를 건드리기 때문이다.
