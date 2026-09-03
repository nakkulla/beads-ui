---
id: 34
title: 복귀 재스캔 후보는 waiting attempt와 prerequisite_unmet admission 큐 항목이다
status: accepted
date: 2026-09-03
summary: "Worker의 복귀 트리거는 이벤트 구독이며 재스캔 후보는 waiting attempt와 `prerequisite_unmet` admission 큐 항목이다 — 판정은 요청 rig의 `bd ready` 한 번, 복귀는 `tickPass`, not-ready에는 쓰지 않고 ready에서만 그 admission을 지운다"
supersedes: [23]
spec: docs/superpowers/specs/2026-09-03-cross-repo-queue-prerequisite-wait-design.md
bead: UI-d3i1
---

# 복귀 재스캔 후보는 waiting attempt와 prerequisite_unmet admission 큐 항목이다

## Context

ADR 0023은 Worker의 waiting 복귀를 cadence 타이머가 아니라 이벤트 구독으로 정했다 —
같은 rig는 bd 변경 감시, foreign은 owner rig의 활동 버스가 요청 rig의 재스캔을 부르고,
재스캔은 워크스페이스당 `bd ready` 한 번으로 판정해 `tickPass`를 돌린다. 그 결정의
후보 조항은 "레인에 있는 최신 `waiting` 행만"이었다. `waiting`은 세션이 떴다가 선행
미충족으로 정산된 attempt의 결말이므로, 후보는 언제나 attempt를 가진 행이었다.

2026-09-03 연결 레인 `dotfiles-12su → UI-n28d`에서 그 조항의 구멍이 관측됐다. 확정
직후 tick의 admission이 UI-n28d를 `not_ready:open`으로 거부했고, 거부된 큐 항목은
attempt가 없다. 선행 dotfiles-12su가 06:21에 닫혀 dotfiles attachment가 활동 버스에
publish했지만, beads-ui의 `holdsWaitingOn`은 `waiting` attempt의
`cause_detail.blockers[].rig`만 보므로 거짓이었고 재스캔은 돌지 않았다. 60초 reconcile은
dispatch pass를 돌리지 않는다. 같은 rig 직렬 체인은 선행의 세션 종료·머지·정리가 같은
워크스페이스의 `tick`이라 안 보이던 문제이고, 연결 레인 없는 cross-repo `blocks` 의존도
정확히 같은 이유로 막힌다.

같은 관측에서 `not_ready:open` 토큰이 진단이 아니라는 것도 드러났다. `bd ready` 부재에
`bd show`의 status를 붙인 상태 복사라 사용자가 무엇을 기다리는지 읽을 수 없다.

## Decision

복귀 트리거는 그대로 **이벤트 구독**이며 cadence 타이머는 두지 않는다. 0023의 이벤트
구독·`bd ready` 한 번·`tickPass`·throttle·"not-ready에 아무것도 쓰지 않는다"·재시작 시
재스캔 1회를 전부 계승하고, **후보 조항 하나**를 바꾼다.

- **admission 거부는 선행 대기를 진단으로 기록한다.** `runPass`와 `dispatch()`의
  not-ready 거부 지점은 `snap.status === 'open'`일 때 `readIssue` →
  `unresolvedBlockersOf`로 미해결 `blocks` 선행을 읽고, 있으면
  `prerequisite_unmet` + `blockers: [{ id, rig, status }]`를 기록한다. 같은 rig와
  foreign 선행이 모두 실린다. 조회 실패나 선행 부재는 현행 `not_ready:<status>` 토큰으로
  떨어진다(fail-quiet). `open`이 아닌 status는 의존이 원인이 아니므로 현행 토큰이 맞다.
- **재스캔 후보는 waiting attempt ∪ `prerequisite_unmet` admission 큐 항목이다.**
  `runWaitingRescan`은 큐·직렬 레인 엔트리 중 admission reason이 `prerequisite_unmet`이고
  `claimed`·active·paused·`dispatch_refused`·`cleanup_pending`이 아닌 bead를 후보에
  더한다. 직렬 레인 head가 아닌 멤버도 후보다 — 발차 규칙은 `tickPass`가 그대로 소유하고
  재스캔은 "다시 물을 가치가 있나"만 답한다.
- **foreign 트리거 매칭도 그 record를 읽는다.** `holdsWaitingOn(root)`는 `waiting`
  attempt에 더해 `queue.admission`의 `prerequisite_unmet` blockers 중 `rig`가 발신 root의
  prefix와 같은 항목(prefix 미상은 일치)이 있으면 참이다. 같은 rig 선행(`rig: null`)은
  자기 `fire()`가 재스캔을 부르므로 여기서 보지 않는다.
- **ready에서만 admission을 지운다.** `bd ready` 교집합으로 복귀가 확인된 bead의
  `prerequisite_unmet` 기록은 `tickPass` **전에** `clearAdmission`으로 지운다. 슬롯이 없어
  그 pass에서 발차되지 않아도 닫힌 선행을 가리키는 뱃지가 남지 않게 하기 위해서다.
  지우는 대상은 reason이 `prerequisite_unmet`인 기록뿐이며, `spec_review_stale`·stale-work
  등 사람의 처분을 기다리는 기록은 건드리지 않는다.
- **새 트리거는 없다.** `fire()`, 활동 버스, attachment 시작 시 1회 — 셋 다 0023 그대로다.

## Consequences

비용 상한은 0023과 같다: 이벤트당 `bd ready` 1회, 무이벤트 0회, 판정자는 요청 rig의
`bd ready` 하나. 대신 거부 1건당 `bd show` 몇 회가 더 든다 — 거부된 bead 1회 + 같은 rig
blocker당 1회 + foreign blocker당 `bd -C <root> show` 1회. `bd show`는 `last-touched`를
써서 자기 감시를 울리지만 그 이벤트는 재스캔(`bd ready` 1회, 후보가 다시 not-ready)과
parked 스캔으로 끝나며 이 결정 이전의 `runPass`가 이미 만들던 이벤트와 같은 종류다.
재스캔은 admission을 쓰지 않으므로 새 루프는 없다.

실재한 대안 셋을 기각했다. cadence 재도입은 0023의 비용 상한을 깨고 두 트리거를 공존시킨다.
레포별 크로스레포 직렬 영역은 순서 정본을 셋(cross-lanes·의존·레포 레인)으로 늘리고 arm
전파 경로를 다시 깔아야 한다. 연결 레인 전용 트리거는 레인 없는 cross-repo 의존을 버린다 —
레인은 순서를 적고 발차를 켜는 도구이고 실행 진실은 의존 그래프다.

되돌리기 어려운 이유는 record shape와 후보 집합이 세 소비자에 걸치기 때문이다:
scheduler의 거부·재스캔, attach의 활동 매칭, 클라이언트의 `⛓ 선행 대기` 뱃지와 슬롯 4a
`⛓ <ID>` 칩(`blockedByFields`)·연결 레인 행 위치 칩. 상태 복사 토큰 대신 증명된
blockers를 쓰고 ready에서만 지우는 규칙은 코드만 보면 이유가 없다.

ADR 0028(`waiting`은 터미널 결말, fence는 `bd ready` 부재뿐)과 충돌하지 않는다 — attempt
없는 큐 항목의 복귀를 같은 fence로 판정하는 것이다. ADR 0033(후보 레인은 관측 집합)이
"admission의 거부 사유·순서와 dispatch 경로는 건드리지 않는다"고 한 것과도 충돌하지
않는다 — 그 결정은 표시 집합을 넓혔고 이 결정은 거부 사유 하나를 진단으로 바꾼다.
