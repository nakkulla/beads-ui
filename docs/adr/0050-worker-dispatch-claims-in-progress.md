---
id: 50
title: Worker가 구현 attempt dispatch 시점에 in_progress를 선점하고 attempt 종료·재조정에서 되돌린다
status: accepted
date: 2026-09-09
summary: "Worker는 구현 attempt를 dispatch할 때 durable attempt 기록 뒤 open인 Bead만 in_progress로 선점하고 worker_claim 전이를 attempt 기록에 남기며, 해제는 attempt 종료와 기존 reconcile 정산이 한다; session_ref는 쓰지 않고 resolved Bead를 다루는 경로는 제외한다"
spec: docs/superpowers/specs/2026-09-09-worker-runner-harness-reduction-design.md
bead: UI-cvwo
---

# Worker가 구현 attempt dispatch 시점에 in_progress를 선점하고 attempt 종료·재조정에서 되돌린다

## Context

dotfiles workflow 계약은 "구현 실행 진입에서 `in_progress`를 claim한다"고 말하고,
dotfiles impl-gate 훅은 `status ≠ in_progress`인 Bead에 대한 구현 쓰기를 막는다.
Worker가 dispatch한 세션은 이 claim을 스스로 써야 했는데, 2026-09-09 Worker 세션
73건 감사에서 15세션이 첫 턴부터 훅의 claim 차단에 걸려 `bd update --status`와
재시도를 왕복했고, 한 세션(UI-ushh)은 그 차단을 다른 원인으로 오진해 9턴을 썼다.
Worker는 dispatch 시점에 이미 Bead 상태를 읽고 attempt를 durable하게 기록하므로,
그 claim을 세션 대신 쓸 수 있는 위치에 있다.

같은 감사에서 대안 두 가지를 검토했다. (1) 세션이 지금처럼 claim한다 — 왕복이
사라지지 않는다. (2) 훅에서 status 검사를 제거한다 — 대화형 세션이 다른 세션의
Bead를 무단으로 쓰는 것을 막는 검사이므로 Worker 하나를 위해 뺄 수 없다.

## Decision

- Worker는 **구현 attempt의 dispatch 경로에서만**, durable `prerecordAttempt`가
  성공한 뒤, 직전에 읽은 status가 정확히 `open`일 때 `bd update <id> --status
  in_progress`를 1회 쓰고 readback한다. `open`이 아니면 쓰지 않는다(fail-quiet).
  bd 오류도 쓰지 않고 dispatch는 계속된다 — 세션이 지금처럼 스스로 claim한다.
- `session_ref`는 쓰지 않는다. 계약은 Worker runner의 `session_ref` 기록을
  금지하고, attempt 기록이 이미 runner 세션을 담는다.
- `resolved` Bead를 다루는 경로(`dispatchExternalConflict`,
  `relaunchResolvedAttempt`)와 재개·처분·리뷰·stale-work 이어하기 경로에는 넣지
  않는다. `resolved`를 `in_progress`로 되돌리면 인도 lifecycle이 깨진다.
- 선점은 attempt 기록에 `worker_claim: pending → written → released`로 남긴다.
  `pending`은 prerecord와 함께, `written`은 쓰기·readback 뒤, `released`는 Bead가
  `open`으로 돌아간 뒤다. 이 필드가 있어야 "해제할 의무가 있는지"를 재시작 뒤에도
  알 수 있다.
- 해제는 기존 종료 경로(`releaseBeadClaim`)와 기존 `reconcile` 정산이 한다.
  `worker_claim=written`인 채 terminal이 된 attempt(같은 Bead의 살아 있는 attempt
  없음·`pr_url` 없음·Bead가 여전히 `in_progress`)는 정산에서 `open`으로 되돌리고
  `released`를 기록한다. 기록 없는 Bead를 스캔하는 별도 재조정은 두지 않는다 —
  소유권 근거가 없다.
- readiness 술어(route·spec_review·impl_entry·의존성)는 status와 무관하게
  그대로 판정한다. 이 결정은 claim을 누가 쓰는지만 바꾼다.

## Consequences

- Worker 세션은 이미 claim된 상태로 시작하므로 impl-gate의 `status ≠
  in_progress` 차단이 첫 턴부터 사라진다. 프리앰블 `## 시도 사실`은 이 attempt에서
  실제로 `written`이 기록된 경우에만 `status=in_progress(선점: Worker)`를 말한다.
- claim 직후 프로세스가 죽거나 종료 시 bd가 닿지 않으면 Bead가 `in_progress`로
  남는 창이 생기고, 그 창은 다음 `reconcile`이 닫는다. 그 사이 사람이 같은 Bead를
  직접 claim하면 정산이 그 claim을 `open`으로 되돌릴 수 있다 — 정산은 attempt
  기록의 증거만 보고 사람 세션의 존재를 알 수 없기 때문이다. 이 위험은 좁은 창의
  대가로 받아들인다.
- dotfiles impl-gate 훅의 전제("세션이 claim한다")와 프리앰블 문구, 재조정 경로가
  함께 움직이므로 되돌리려면 세 곳을 같이 고쳐야 한다. 그것이 이 기록이 있는
  이유다.
