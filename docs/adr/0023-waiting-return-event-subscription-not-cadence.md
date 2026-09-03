---
id: 23
title: waiting 복귀 트리거는 cadence가 아니라 이벤트 구독이다
status: superseded
superseded_by: 34
date: 2026-09-03
summary: "Worker의 waiting 복귀는 cadence가 아니라 이벤트 구독이다 — 같은 rig는 bd 변경 감시, foreign은 owner rig의 활동 버스가 요청 rig의 재스캔을 부르고, 재스캔은 워크스페이스당 leading+cover throttle 안에서 `bd ready` 한 번으로 판정한다"
spec: docs/superpowers/specs/2026-09-02-worker-waiting-return-trigger-design.md
bead: UI-978d
---

# waiting 복귀 트리거는 cadence가 아니라 이벤트 구독이다

## Context

선행 대기 계층(`docs/superpowers/specs/2026-08-28-worker-prerequisite-wait-tier-design.md`)은
선행 blocker가 열려 있어 착수를 거부한 세션의 attempt를 `waiting`으로 정산한다. 그 계층은
`waiting`에 fence를 두지 않았다 — 다음 dispatch pass에서 bead가 `bd ready`에 있으면 보통
후보로 돌아온다는 것이 설계였고, 복귀 트리거는 "별도 관측이 아니라 다음 tick"이라고 못박았다.

문제는 그 다음 tick을 부르는 원천이 없었다는 것이다. `attach.js`의 bd 변경 감시
(`beadsChanges.fire()`)는 completion-intent 재관측, parked 재개 스캔, merge queue kick만 부르고
dispatch pass를 돌리지 않는다. 실제로 pass가 도는 자리는 같은 워크스페이스의 세션 종료, 사람의
UI 액션, 재시작 시 죽은 attempt 처분뿐이었다. 게다가 foreign rig의 blocker가 닫히는 사건은 이
워크스페이스에 아무 신호도 보내지 않는다 — 그 rig의 `.beads`를 보는 것은 그 rig의 attachment다.

실측이 뒤따랐다. 2026-08-30 `dotfiles-6qc7`은 foreign blocker `Analysis-2zly`가 02:34Z에 닫힌
뒤 약 하루 동안 재디스패치되지 않았고, admission 기록은 blocker가 닫히기 전 시각에 멈춰 있었다.
`PROSTATE-0yz`도 같은 결말이었다. 계약
(`workflow-state.yaml prerequisite_gate.worker_judgment.candidate_return`)은 blocker가 닫히면
요청 rig의 `bd ready`가 복귀를 판정한다고 정하는데, 그 판정을 다시 묻는 사건이 없어서 계약
경로가 실행되지 않았다.

## Decision

복귀 트리거는 **이벤트 구독**이며 cadence 타이머는 두지 않는다. 구체적으로:

- **판정은 요청 rig의 `bd ready` 한 번.** scheduler의 `rescanWaiting(workspace)`는 레인에 있는
  최신 `waiting` 행만 후보로 삼고, 후보가 비면 bd를 아예 읽지 않는다. 후보가 있으면 워크스페이스당
  `bd ready --json` 한 번(`deps.bd.readyBeadIds`)으로 판정하고, 교집합이 비지 않으면 내부
  `tickPass` 한 번을 돌린다. not-ready에는 아무것도 쓰지 않는다 — `bd ready` 부재만으로는
  status를 모르므로 admission에 남길 참인 토큰이 없다.
- **`tick`이 아니라 `tickPass`.** 외부 개시 tick은 `dispatch_refused`를 비워 거부를 재시도시키는
  데, 그 거부는 사람의 처분을 기다리는 durable 상태다. 재스캔은 그 집합을 비우지 않고 거부된
  bead를 후보에서도 뺀다.
- **같은 rig 트리거는 bd 변경 fs 감시.** `beadsChanges.fire()`가 `rescanWaiting`을 더 부른다.
  사람의 CLI든 워크트리 세션이든 `bd close`가 잡히는 자리다.
- **foreign 트리거는 프로세스 내 워크스페이스 활동 버스**(`server/worker/workspace-activity.js`).
  publish 지점은 owner rig attachment의 `fire()`와 scheduler 외부 `tick()` 진입 두 곳이고,
  수신 attachment는 자기 `waiting` 행의 `cause_detail.blockers[].rig`가 발신 root의 prefix와
  같을 때만 재스캔한다. prefix를 아직 모르면 일치로 읽는다.
- **재스캔은 워크스페이스당 leading + trailing cover throttle 안에서 돈다.** 호출 시 실행 중도
  아니고 cover도 예약돼 있지 않으면 즉시 1회 실행하고, 모든 호출이 cover를 `now + 2초`로 다시
  건다. 연속 호출 아래에서도 leading 이후 30초가 지나면 cover가 강제로 돈다.
- **재시작 복구는 attachment 시작 시 재스캔 1회.**

## Consequences

`bd ready`가 판정자라는 선택이 비용 상한과 자기 루프 부재를 동시에 준다. bd의 fs 감시는
`.beads/last-touched`를 보는데 `bd show <id>`는 읽기여도 그 파일을 쓰는 반면 `bd ready`는 쓰지
않는다. 그래서 재스캔이 자기 감시를 울리지 않고, 비용은 waiting 행 수와 무관하게 재스캔 1회당
`bd ready` 프로세스 하나다. 이벤트 burst당 2회(leading + cover), 연속 활동 아래 30초당 2회,
이벤트가 없으면 0회다.

foreign을 활동 버스로 푸는 대신 그 rig의 DB를 직접 구독할 수도 있었다. 그렇게 하지 않은 이유는
그 rig의 attachment가 이미 그 DB를 보고 있기 때문이다 — 두 번째 구독은 같은 사실을 두 번
관측한다. 팬아웃(어떤 워크스페이스의 변경이든 foreign waiting을 가진 전부를 tick) 대신 prefix
매칭을 쓴 것도 같은 이유다: 무관한 rig의 활동은 in-memory 비교 하나로 끝난다.

받아들인 대가는 지연이다. cover 2초와 max-wait 30초만큼 복귀가 늦어질 수 있다. cover 자체가
그 대가를 지불하는 이유는 감시의 cooldown(기본 1초)이 그 창에 도착한 fs 이벤트를 버리기
때문이다 — 어떤 이벤트로 재스캔이 not-ready를 본 직후 blocker가 닫히면 그 변경은 어디에도
통지되지 않고, cover만이 그 창을 덮는다. cooldown 쪽을 고쳐 후행 통지하게 만드는 대안은
같은 신호를 타는 parked 스캔이 자기 읽기로 다시 울려 1초 주기 루프가 되므로 배제했다.

cadence 타이머를 배제한 것이 이 결정을 되돌리기 어렵게 만든다. 활동 버스와 `tick` publish
지점이 attachment 수명에 결속돼 있고, 나중에 cadence를 더하면 두 트리거가 공존해 위의 비용
상한 서술이 그대로 깨진다.

관측되지 않는 경로는 남는다. 다른 머신이 central dolt에 직접 쓴 변경은 이 프로세스의 어느 fs
감시에도 오지 않고, `waiting` 정산 뒤 owner rig가 레지스트리에서 빠지면 활동 신호가 없다. 두
경우 모두 요청 rig의 `bd ready`는 여전히 맞으므로 다음 외부 tick에 돌아온다(fail-quiet).

선행 대기 계층의 결정("`waiting`은 터미널 결말이며 복귀는 보통 후보 dispatch")과 충돌하지
않는다 — 그 결정의 "다음 tick"을 이 결정이 공급한다. ADR 0017(parked 비자동 복귀)과도 충돌하지
않는다 — 이 트리거는 `waiting` 행만 후보로 삼고 `awaiting_user` 파킹은 건드리지 않는다.
