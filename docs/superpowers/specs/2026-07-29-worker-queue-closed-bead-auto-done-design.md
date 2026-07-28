# 종료된 Bead의 대기열 자동 정리

- Bead: UI-m6bg
- 작성일: 2026-07-29

## 배경

worker 실행 대기열(`queue.json`의 `queue`)에 투입된 Bead가 worker를 거치지
않고 일반 세션에서 완료되면, 대기열 엔트리가 durable 상태에 무기한 남는다.
`bd` status와 worker 레인은 연동되지 않으므로 큐 엔트리는 dispatch 성공이나
명시적 제거로만 빠진다.

실측 사례 — UI-yk55는 2026-07-28 22:57 대기열에 투입됐으나 `auto_advance`가
꺼져 있어 dispatch되지 않았고, 그 사이 세션에서 직접 PR #72를 만들어 머지했다.
Bead는 `closed`가 됐지만 대기열 행은 그대로 남아 "완료했는데 왜 아직 대기
레인에 있냐"는 관측을 낳았다.

이 행을 `worker-queue-remove`로 빼면 완료 레인에도 후보 레인에도 나타나지
않고 그냥 사라진다. 후보 레인이 `ready − (queue ∪ pr_wait ∪ done)`으로
합성되는데(`queue-store.js:1310-1313`) `closed` Bead는 `ready`가 아니기
때문이다. 즉 "아직 안 한 일을 큐에서 뺀다"는 제거의 의미론이 "이미 끝난 일"인
이 상황과 맞지 않는다. 끝난 일은 완료 레인으로 가야 한다.

## 문제

종료된 Bead가 대기열에 남아, 실행될 일이 없는데도 대기 중인 작업으로 계속
표시된다.

## 접근

`title-cache`는 큐 · PR 대기 · 완료 레인의 각 Bead에 대해 이미
`bd show <id> --json`을 돌려 제목과 시각을 캐시한다(`title-cache.js:166`).
status는 같은 payload에 들어 있으므로 **추가 `bd` 호출 없이** 읽을 수 있다.
그 fill이 끝나는 시점에 판정하고, 자격을 갖춘 행만 완료 레인으로 옮긴다.

대안으로 검토한 두 가지는 채택하지 않았다. 스냅샷 생성(`decorateQueue`)에서
판정하면 순수해야 할 읽기 경로에 durable 변이가 섞인다. 전용 주기 스캔은 이미
도는 fill에 얹는 것에 비해 별도 `bd list` 호출과 구독자 게이트만 늘린다.

## 판정 규칙

네 조건을 **모두** 만족할 때만 이동한다.

1. bd status가 정확히 `closed`일 것.
   `resolved`는 제외한다 — PR Delivery는 끝났지만 머지 전이므로 완료가 아니고,
   external overlay가 그 Bead를 PR 대기 레인에 그리고 있다.
2. durable `queue` 소속 행일 것.
   `running` · `pr_wait` · `merge_queue` 소속은 건드리지 않는다.
3. 활성 attempt가 없을 것.
   실행 중인 작업을 완료로 보내면 안 된다. "활성"의 기준은 대기 레인이
   렌더링에서 행을 감추는 기준과 같다 — 종료되지 않은 attempt를 가진 Bead
   (클라이언트의 `active_bead_ids`가 같은 사실을 쓴다).
4. status를 알 때만 판정할 것.
   캐시 미스나 `bd show` 실패는 아무것도 하지 않고 다음 기회로 넘긴다
   (fail-quiet — 계약 키 부재 시 표시를 생략하는 이 저장소의 규율과 같다).

## 변이

`moveToDone(workspace, { bead_id })` (`queue-store.js:1201`)를 그대로 쓴다.
`removeFromLanes` + `done.push`를 한 번의 persist로 처리하고 `cleanup_failed`
기록도 같은 변이에서 정리한다. scheduler-owned이므로 CAS가 없다.

새 durable 키는 추가하지 않는다. 완료 레인 엔트리의 `added_at`은 레인 진입
시각이라는 기존 의미(`UI-d7pw §3`)를 그대로 따른다.

## 데이터 흐름

```
title-cache fill (bd show)
  → status를 캐시에 추가
  → queue 소속 + closed + attempt 없음 판정
  → moveToDone
  → 기존 fill 완료 콜백이 스냅샷 재발행
  → 행이 대기 레인에서 완료 레인으로 이동
```

fill 완료 콜백이 이미 스냅샷을 다시 쏘므로 화면 갱신 경로는 새로 만들지
않는다.

판정과 변이는 worker 런타임 쪽에 둔다. `title-cache`는 캐시로 남고 큐 레인의
처분을 알지 못한다 — 캐시가 status를 싣고, 그 status를 읽어 `moveToDone`을
호출하는 책임은 fill 완료를 이미 구독하는 worker 쪽 콜백이 진다.

## 되돌리기

완료 레인 행은 `draggable: lane !== 'done'`이라 드래그로 되돌릴 수 없다.
되돌리기가 어려운 만큼 판정을 위 네 조건으로 좁게 잡았다. 잘못 옮겨진 경우의
복구는 `queue.json`을 직접 고치는 운영 작업이며, 이번 스코프에 자동 복구
경로는 두지 않는다.

## 테스트 범위

- `closed` 큐 행 → 완료 레인으로 이동한다
- `resolved` 큐 행 → 대기열에 남는다
- `open` / `in_progress` 큐 행 → 대기열에 남는다
- 활성 attempt가 있는 `closed` 행 → 대기열에 남는다
- status 캐시 미스 → 아무 변이도 일어나지 않는다
- `pr_wait` · `merge_queue` 소속 `closed` Bead → 건드리지 않는다

## 비스코프

- 대기열 행의 제거 버튼. 데스크톱 드래그(`queue` → `candidate`)가 이미
  경로이고, 이번 문제는 "안 할 일 빼기"가 아니라 "끝난 일 정리"다.
- `resolved` Bead의 처분. PR 머지 시점에 worker의 post-merge cleanup이 이미
  완료 레인으로 보낸다.
- 완료 레인에서 되돌리는 UI.
