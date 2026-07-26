# 워커 실패 attempt 재개 가능 상태 + 조용한 스킵 사유 노출 (UI-pvqz)

## 배경 (실측)

실패한 attempt 뒤에 사람이 큐를 재개해도 아무 일이 일어나지 않고, 왜 안 되는지도 보이지 않는다.

2026-07-26 실사고 경로(UI-2wa9):

1. attempt `UI-2wa9-1785066918311-1` 이 `session_failed:result_count` 로 종료. 세션은 구현을 마쳤지만 implementation 게이트 codex 레그가 워커 세션 PATH 결손으로 실패해 PR 을 못 만들었다.
2. `failAttempt`(`server/worker/scheduler.js:268-283`)가 `setAutoAdvance(workspace, false)` 로 큐를 멈춤 — **설계된 halt** 다.
3. 사람이 UI 에서 `auto_advance` 를 다시 켬(revision 18, slots 2, running 0).
4. **아무 일도 일어나지 않음.** bead 는 큐에 그대로 보이고 배지도 없다.

원인: 세션이 워크플로 계약에 따라 claim 해둔 `status=in_progress` 가 그대로 남아 `bd ready` 목록에서 빠졌고, `tickPass`(`scheduler.js:1151`)는 `if (snap.ready && !snap.blocked)` 일 때만 dispatch 하므로 그 bead 를 `continue` 로 조용히 스킵한다.

진단 비용: admission 조건, 워커 attachment 등록, `scan_roots` 발견, lock, worktree 잔여물을 차례로 배제한 뒤에야 원인에 도달했다. `admission` 거부는 `recordAdmission` + `notifyChanged` 로 사유가 기록·fanout 되는데, `ready` 아님으로 스킵되는 경로는 아무 흔적도 남기지 않기 때문이다.

## 설계 사실 (코드 실측 — 초기 추정 정정)

이 스펙을 쓰기 전 세운 "실패 종결 직후 tick 이 없다"는 추정은 **틀렸다**. 정확한 사실:

1. `failAttempt` 직후 `await tick(workspace)` 가 **이미 호출된다**(`scheduler.js:330·363·387`).
2. 그러나 `failAttempt` 마지막 줄이 `setAutoAdvance(workspace, false)` 이므로, 그 tick 은 `tickPass` 첫 줄 `if (!q.auto_advance) return` 으로 즉시 빠진다. 실패 시 큐를 멈추고 사람 개입을 기다리는 것이 의도다(주석: "the halt below already stops the queue").
3. 워커는 bead 를 `in_progress` 로 만들지 않는다. `setStatus` 호출처는 `closed`/`resolved`/`open` 뿐이고(`pr-actions.js:574·598·1098`, `verify.js:126`), `in_progress` 는 세션이 스스로 claim 한 것이다.
4. `clearAdmission` 은 dispatch 성공 시점(`scheduler.js:713`)에 호출되므로, 새로 기록하는 사유도 dispatch 되면 자동으로 걷힌다.
5. UI 배지는 `admission[bead_id] ? '⛔ ' + reason : ''`(`app/views/worker/index.js:635-636`)로 **사유 문자열을 그대로** 노출한다.

따라서 목표는 "자동 재개"가 아니다. **의도된 halt 는 유지하고, 사람이 재개할 때 실제로 재개되게** 만드는 것이다.

## 결정

### 단위 ①: 실패 종결 시 claim 해제

`failAttempt` 에서 bead status 가 `in_progress` 일 때만 `open` 으로 되돌린다. `auto_advance` OFF 는 그대로 둔다.

`in_progress` 조건이 안전장치다. 세션이 작업을 마쳐 `resolved` 로 만든 뒤 verify 가 실패한 경우(`verify_failed:*`)까지 `open` 으로 되돌리면, PR 이 열려 있는 실제 상태와 기록이 어긋난다. 되돌릴 대상은 "claim 한 채로 끝난 것"뿐이다.

복구는 `pr-actions.js` `rerunTransition`(1085-1110)이 이미 확립한 패턴을 준용한다 — `setStatus('open')` 후 `readStatus` 로 readback.

실패 경로에서의 오류 처리는 `failAttempt` 의 기존 성격을 따른다: `revertWorkflowMode` 와 마찬가지로 best-effort 로 두고, 실패 시 로그를 남기되 `onSessionDone` 밖으로 예외를 던지지 않는다. 이미 halt 된 큐를 bd 장애가 더 망가뜨리게 두지 않는다는 것이 그 경로의 기존 계약이다.

계약 주의: `status` 어휘와 `resolved`/`closed` 의미는 dotfiles `docs/contracts/workflow.md` 소유이고 beads-ui 는 소비자다(AGENTS.md). 이 단위는 그 어휘를 바꾸지 않고, 이미 워커가 쓰고 있는 `open` 전이를 실패 경로에 대칭으로 추가할 뿐이다.

### 단위 ②: 조용한 스킵의 사유 기록

`tickPass` 의 스캔 루프에서 조용히 `continue` 하는 두 경로에 `recordAdmission` 을 추가한다.

| 경로 | 위치 | 기록할 reason |
| --- | --- | --- |
| `snapshotBead` throw | `scheduler.js:1146-1150` | `bd_snapshot_failed` |
| `ready` 아님 / `blocked` | `scheduler.js:1151` | `not_ready` / `blocked` |

`snap.ready` 가 false 면 `not_ready`, `snap.blocked` 가 true 면 `blocked` 로 구분한다(둘 다면 `blocked` 가 더 구체적이므로 우선). 기록 후 `notifyChanged(workspace)` 로 fanout 하는 것까지 admission 거부 경로와 동일하게 맞춘다.

`claimed`/`dispatch_refused`/`paused_beads` 스킵은 대상이 아니다 — 각각 실행 중·직전 거부 기록됨·사용자가 명시적으로 일시정지한 상태라 이미 UI 에 드러난다.

UI 는 사유 문자열을 그대로 렌더하므로 배지 코드 변경이 필요 없다.

## 변경 (예상 4개 파일)

1. `server/worker/scheduler.js` — `failAttempt` 에 조건부 claim 해제 추가; `tickPass` 스캔 루프의 두 조용한 `continue` 에 `recordAdmission` + `notifyChanged` 추가.
2. `server/worker/scheduler.test.js` — ① 실패 종결 후 bead 가 `open` 으로 복구되고 `resolved`/`closed` 는 건드리지 않음, ② 각 스킵 사유가 기록되고 dispatch 성공 시 걷힘, ③ skip-don't-stop 유지(한 bead 의 스킵이 뒤 entry dispatch 를 막지 않음).
3. `server/worker/bd-metadata.js` — `readStatus` 가 없으면 추가(`pr-actions.js` 가 쓰는 것과 같은 것을 재사용; 있으면 변경 없음).
4. `app/main.bundle.js`(+`.map`) — 프런트 소스를 건드리게 되면 `npm run build` 산출물 동반(현 설계상 배지 코드 변경은 불필요하므로 변경 없을 전망).

## 비목표

- **주기적 tick 도입.** 위 설계 사실 1·2 로 불필요해졌다. 실패 종결 직후 tick 은 이미 있고, 멈춰 있는 것은 `auto_advance` 다.
- **`auto_advance` 자동 재개.** 실패 시 halt 는 의도된 설계다. 사람이 상황을 보고 켜는 흐름을 유지한다.
- **`worktree add -B` 의 조용한 브랜치 리셋.** `worktree.js:125-132` 가 `-B` 로 브랜치를 base 에 강제 리셋하므로, 이전 attempt 가 남긴 커밋이 말없이 떨어져 나간다(2026-07-26 실측: `UI-2wa9` 의 `d96e62a`, 11파일 +418/-80 을 수동 백업해 보존). 사용자 판단으로 이번 범위에서 제외한다. **재진입 조건**: 워커 재실행이 이전 attempt 산출물을 덮어 실제 유실이 관측되거나, attempt 재개(resume) 기능을 손볼 때 이 스펙과 함께 다시 라우팅한다.

## 검증

1. `npm run tsc` / `npm test` / `npm run lint` PASS
2. `npm run all` green
3. 프런트 소스 변경이 발생한 경우에만 `npm run build` 후 번들 동반
4. 재현 시나리오 회귀: 실패로 종결된 attempt 의 bead 가 `open` 이 되고, `auto_advance` 를 켜면 그 bead 가 dispatch 대상이 되는지 단위 테스트로 고정

## 수용 기준

1. 실패로 종결된 attempt 의 bead 가 `in_progress` 였다면 `open` 으로 복구된다. `resolved`/`closed` 였다면 건드리지 않는다.
2. 실패 시 `auto_advance` 는 여전히 OFF 로 남는다(의도된 halt 보존).
3. 사람이 `auto_advance` 를 켰을 때, 실패 복구된 bead 가 추가 조작 없이 dispatch 대상이 된다.
4. `ready` 아님 / `blocked` / `bd_snapshot_failed` 로 스킵된 bead 는 그 사유가 큐 상태에 기록되고 UI 배지로 관측된다.
5. 그 사유는 해당 bead 가 dispatch 되면 걷힌다.
6. skip-don't-stop 안티 기아 보장이 유지된다 — 한 bead 의 스킵이 뒤 entry 의 dispatch 를 막지 않는다.
7. `npm run all` green.
