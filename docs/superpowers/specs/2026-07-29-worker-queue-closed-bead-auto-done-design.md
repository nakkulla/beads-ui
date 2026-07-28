# 종료된 Bead의 대기열 자동 정리

- Bead: UI-m6bg
- 작성일: 2026-07-29

## 배경

worker 실행 대기열(`queue.json`의 `queue`)에 투입된 Bead가 worker를 거치지
않고 일반 세션에서 완료되면, 대기열 엔트리가 durable 상태에 남는다.

실측 사례 — UI-yk55는 2026-07-28 22:57 대기열에 투입됐으나 `auto_advance`가
꺼져 있어 dispatch되지 않았고, 그 사이 세션에서 직접 PR #72를 만들어 머지했다.
Bead는 `closed`가 됐지만 대기열 행은 그대로 남아 "완료했는데 왜 아직 대기
레인에 있냐"는 관측을 낳았다.

## 기존 코드가 이미 하는 일

`scheduler.js`의 `dequeueIfClosed`(503행)가 이미 종료 Bead를 감지한다.
`snap.status !== 'closed'`면 아무것도 하지 않고, `closed`면
`dropFromQueue`(`queue-store.js:1511`)로 큐에서 제거한다. 주석이 그 판단을
이미 적어 두었다 — "Only `closed` qualifies — `resolved`/`in_progress` are
states work can still move out of".

따라서 이 스펙은 종료 감지를 새로 만들지 않는다. 기존 감지의 **두 가지 결함**만
고친다.

### 결함 1 — 처분이 완료가 아니라 소멸이다

`dropFromQueue`는 `removeFromLanes` + `admission` 삭제만 한다. 그 Bead는 완료
레인에 들어가지 않고, 후보 레인이 `ready − (queue ∪ pr_wait ∪ done)`으로
합성되는데(`queue-store.js:1310-1313`) `closed` Bead는 `ready`가 아니므로
후보에도 나타나지 않는다. 결과적으로 화면에서 그냥 사라진다. 끝난 일은 완료
레인에 남아야 한다.

### 결함 2 — 트리거가 `auto_advance`에 묶여 있다

`dequeueIfClosed`는 두 곳에서만 불린다: `dispatch()`(1655행)와 scan
pass(2933행). 둘 다 scheduler tick 경로이고, scheduler는 `auto_advance`가
켜져 있을 때만 scan을 돈다. `auto_advance`가 꺼진 워크스페이스에서는 이 정리가
**영원히 실행되지 않는다**. UI-yk55가 남은 정확한 원인이 이것이다.

## 접근

두 결함을 각각 고친다.

**처분 교체** — `dequeueIfClosed`가 큐 소속 Bead를 `moveToDone`
(`queue-store.js:1201`)으로 보낸다. `removeFromLanes` + `done.push`를 한 번의
persist로 처리하고 `cleanup_failed` 기록도 같은 변이에서 정리한다.
scheduler-owned이므로 CAS가 없다. 큐 소속이 아닌 Bead(`pr_wait` 등)에 대한
기존 `dropFromQueue` 처분은 그대로 둔다 — 이 스펙의 대상이 아니다.

`dropFromQueue`가 지우던 `admission` 기록은 `moveToDone`이 지우지 않는다.
완료로 보낸 Bead의 admission 잔여는 다음 대기열 투입 시 재평가되므로 표시상
문제를 만들지 않지만, 두 경로의 차이를 구현에서 의식적으로 확인한다.

**확정 트리거 추가** — `auto_advance`와 무관하게 도는 정리 패스를 둔다.
external PR registry가 이미 `bd list --json --all --limit 0`을 구독자 게이트
안에서 poller cadence로 돌린다(`attach.js` `refreshExternalPrs`,
`pr-poller.js:492-498`). 같은 호출의 응답이 모든 Bead의 status를 들고 있으므로,
큐 소속 Bead의 종료 여부를 **추가 `bd` 프로세스 없이** 같은 패스에서 알 수
있다.

정리 자체는 scheduler에 둔다. 활성 판정에 필요한 집합(아래)을 scheduler가
소유하므로, 판정과 변이를 그 모듈 안에 두어야 경합이 생기지 않는다. poller
패스는 그 스캔이 읽어 온 status를 **인자로 넘겨** scheduler가 노출하는 sweep을
호출한다. sweep이 스스로 `bd`를 다시 읽지 않는다는 뜻이며, 이것이 bead당 추가
프로세스를 띄우지 않는다는 요구를 만족시키는 방식이다.

대안으로 검토한 두 가지는 채택하지 않았다. `title-cache` fill에 얹는 방식은
캐시가 만료 refresh 실패 시 stale record를 유지해 재개방된 Bead를 이동시킬 수
있고, fill이 cold miss/TTL 만료에만 시작되므로 warm cache 뒤에 닫힌 Bead는
무기한 정리되지 않는다. 스냅샷 생성(`decorateQueue`)에서 판정하는 방식은 순수해야
할 읽기 경로에 durable 변이를 섞는다.

## 판정 규칙

네 조건을 **모두** 만족할 때만 완료 레인으로 이동한다.

1. status가 정확히 `closed`일 것.
   `resolved`는 제외한다 — PR Delivery는 끝났지만 머지 전이므로 완료가 아니고,
   external overlay가 그 Bead를 PR 대기 레인에 그리고 있다. 기존
   `dequeueIfClosed`의 판단과 동일하다.
2. status를 권위 있는 읽기로 확인했을 것.
   판정 근거는 이번 패스가 실제로 읽어 온 값이어야 한다. 캐시된 값이나 실패 시
   fallback으로 남은 값은 근거가 되지 않는다. 읽기에 실패하면 아무것도 하지
   않고 다음 패스로 넘긴다(fail-quiet).
3. durable `queue` 소속 행일 것.
   `running` · `pr_wait` · `merge_queue` 소속은 건드리지 않는다.
4. 활성이 아닐 것.
   기준은 scheduler가 소유한 집합이다 — `claimed`(attempt 기록 전 dispatch
   선점), `paused_beads`, `dispatch_refused`, 그리고 종료되지 않은 attempt를
   가진 Bead. 클라이언트의 `active_bead_ids`는 pre-attempt claim을 포함하지
   않으므로 판정 근거로 쓰지 않는다. 판정과 변이 사이에 dispatch가 끼어들 수
   없도록 변이 직전에 활성 여부를 재확인한다.

## 데이터 흐름

```
poller 패스 (구독자 게이트, 기존 cadence)
  → bd list --json --all (external scan이 이미 도는 호출)
  → scheduler sweep 호출
  → 큐 소속 · closed · 비활성 판정 (변이 직전 재확인)
  → moveToDone
  → notifyChanged → 스냅샷 재발행
  → 행이 대기 레인에서 완료 레인으로 이동
```

`dequeueIfClosed`가 이미 `notifyChanged`를 호출하므로 화면 갱신 경로는 새로
만들지 않는다.

## external overlay와의 우선순위

`withExternalPrWait`(`worker-handlers.js:139-155`)는 durable `pr_wait`
소속만으로 중복을 제거하고 `done`은 보지 않는다. external registry는
`status=resolved` + `pr_url` Bead만 잡으므로 `closed`로 이동한 Bead는 원칙적으로
overlay 대상이 아니지만, registry가 한 스캔 stale인 창에서는 같은 Bead가 완료
레인과 PR 대기 레인에 동시에 보일 수 있다.

이 창은 이번 변경이 만드는 것이 아니라 `moveToDoneWithDeploy` 경로에도 이미
존재하는 선재 조건이다. 다만 이번 스코프에서 함께 닫는다 — overlay 합성 시
durable `done` 소속 Bead도 제외 집합에 넣는다.

## 되돌리기

완료 레인 행은 `draggable: lane !== 'done'`이라 드래그로 되돌릴 수 없다.
되돌리기가 어려운 만큼 판정을 위 네 조건으로 좁게 잡았다. 잘못 옮겨진 경우의
복구는 `queue.json`을 직접 고치는 운영 작업이며, 이번 스코프에 자동 복구
경로는 두지 않는다.

## 테스트 범위

판정 규칙:

- `closed` 큐 행 → 완료 레인으로 이동한다 (기존 `dropFromQueue` 기대를 갱신)
- `resolved` 큐 행 → 대기열에 남는다
- `open` / `in_progress` 큐 행 → 대기열에 남는다
- status 읽기 실패 → 아무 변이도 일어나지 않는다
- `pr_wait` · `merge_queue` 소속 `closed` Bead → 큐 이동 대상이 아니다

활성 가드:

- `claimed`(attempt 기록 전 선점) 상태의 `closed` Bead → 대기열에 남는다
- leaf `paused` 상태의 `closed` Bead → 대기열에 남는다
- 종료되지 않은 attempt를 가진 `closed` Bead → 대기열에 남는다

트리거:

- `auto_advance`가 꺼진 워크스페이스에서도 정리가 실행된다
- 정리 패스가 bead당 추가 `bd` 프로세스를 띄우지 않는다

overlay:

- stale external row가 있는 상태에서 `closed` Bead를 이동해도 완료 레인과 PR
  대기 레인에 동시에 나타나지 않는다

## 비스코프

- 대기열 행의 제거 버튼. 데스크톱 드래그(`queue` → `candidate`)가 이미
  경로이고, 이번 문제는 "안 할 일 빼기"가 아니라 "끝난 일 정리"다.
- `resolved` Bead의 처분. PR 머지 시점에 worker의 post-merge cleanup이 이미
  완료 레인으로 보낸다.
- 완료 레인에서 되돌리는 UI.
- `pr_wait` 소속 종료 Bead에 대한 `dropFromQueue` 처분 변경.
