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

`auto-merge.js:144` 패턴의 async 버전을 도입한다.

- 현재 `tickPass` 본문을 `runPass()` 로 추출한다.
- `tickPass` 는 가드 래퍼가 된다: `scanning` 이면 `rescan = true` 후 즉시 반환하고, 아니면 `rescan` 이 서지 않을 때까지 `do { rescan = false; await runPass(ws); } while (rescan)` 로 반복한다.
- 상태는 인스턴스 스코프 플래그 `scanning`/`rescan` 두 개다. `createScheduler` 는 워크스페이스별 인스턴스이므로(`server/worker/attach.js:938` 루프에서 워크스페이스마다 attachment 생성) 워크스페이스 키 Map 은 두지 않는다 — 기존 `claimed`/`running` 과 같은 스코프다.
- `finally` 에서 `scanning = false` 를 보장해, pass 내부 예외가 가드를 영구 점유하지 못하게 한다.

### 2. claim 확정 직전 재확인

`to_launch` 필터에 `!claimed.has(d.bead_id)` 를 추가한다. 가드가 pass 겹침을 없앤 뒤에도 남는 얇은 방어선이다.

```js
const to_launch = to_dispatch.filter(
  (d) => live_queue.has(d.bead_id) && !claimed.has(d.bead_id)
);
```

### 영향받는 기존 경로

- `tick()` 은 그대로 `dispatch_refused.clear()` 후 `tickPass()` 를 부른다. 가드를 `tick` 이 아니라 `tickPass` 에 두는 이유가 이것이다 — refuse 리셋은 즉시 일어나고 스캔만 합쳐진다.
- `dispatch()` 의 refuse 경로(`scheduler.js:2206`)가 부르는 `await tickPass(workspace)` 는 rescan 마크로 바뀐다. 현재 pass 의 `Promise.all` 이 끝난 뒤 do-while 이 한 번 더 돌아 다음 후보를 집으므로, 즉시성만 달라지고 anti-starvation 결과는 보존된다.

### 종료 보장

`rescan` 을 세우는 주체는 외부 `tick` 과 refuse 재귀뿐이다. refuse 된 bead 는 `dispatch_refused` 에 누적되어 다음 회차에 스킵되므로 루프는 유한하게 수렴한다. 외부 tick 이 계속 도착하는 경우는 정상 부하이며, 매 회차가 실제 스캔이므로 진전 없는 회전은 생기지 않는다.

## 수용 기준

1. 겹친 두 `tick` 이 같은 bead 를 두 번 dispatch 하지 않는다.
2. 겹친 두 `tick` 이 `slots` cap 을 넘겨 dispatch 하지 않는다.
3. pass 도중 도착한 `tick` 이 유실되지 않는다 — 스캔 중 큐에 들어온 bead 가 같은 사이클에서 집힌다.
4. refuse 경로의 재귀가 여전히 다음 후보로 진행한다(기존 anti-starvation 동작 회귀 없음).
5. 기존 `server/worker/scheduler.test.js` 전량이 통과한다.

## Test scope

seam 은 모두 `server/worker/scheduler.test.js` 에 추가한다. 기존 `setup()` 의 fake `bd.snapshotBead`/`admission` 에 지연 훅을 넣어 pass 겹침을 결정론적으로 재현한다(실제 타이머 대기 없이 promise 제어로).

| # | seam | RED 조건 |
| --- | --- | --- |
| 1 | 겹친 두 tick 이 같은 bead 를 한 번만 dispatch | 현재 코드에서 spawn 2회 |
| 2 | 겹친 두 tick 이 slots cap 을 넘기지 않음 | 현재 코드에서 cap 초과 |
| 3 | 스캔 중 도착한 tick 이 유실되지 않음 | 가드 도입 시 회귀 방지 |
| 4 | refuse 재귀가 다음 후보로 진행 | 가드 도입 시 회귀 방지 |

seam 3·4 는 가드가 만들어내는 새 동작을 고정하는 것이므로, 가드 도입 전에는 RED 가 아니라 기존 동작으로 통과할 수 있다. 이 둘은 회귀 고정용이며 red-first 대상은 seam 1·2 다. seam 4 가 고정하는 것은 refuse 직후의 즉시성이 아니라 최종 결과다 — refuse 된 bead 다음의 runnable 후보가 같은 tick 호출이 반환되기 전에 결국 dispatch 되는지를 본다.

## Non-goals

- dispatch 시 bead 를 큐 lane 에서 제거하는 구조 변경. 큐 표시·순서·재큐잉·복귀 의미가 모두 바뀌어 이번 버그 범위를 크게 벗어난다.
- `dispatch_refused` 리셋 의미 변경.
- 크로스 프로세스 락. `server/worker/locks.js` 주석이 명시한 단일 서버 토폴로지 전제를 유지한다.
- 이번 사건의 잔여 런타임 상태 정리(paused attempt `Analysis-1p6-…-4`, 공유 워크트리). 코드 수정과 분리된 운영 조치로 뺀다.
- `server/worker/locks.js` 의 미사용 `dupRunLock` 배선. 이번 수정은 in-process 플래그로 충분하며, 미사용 API 정리는 별건이다.

## 검증

`npm run all` (lint · tsc · test · prettier · build). 프런트엔드 소스 변경이 없으므로 번들 재생성 산출물은 나오지 않아야 한다.
