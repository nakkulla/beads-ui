---
id: UI-u6ud-6
title: Worker 이력 기록과 세션 생존 소유
status: accepted
date: 2026-09-23
summary: "Worker 이력의 SoT는 bead별 append-only events.jsonl이고 queue.json은 살아 있는 상태만 담으며 살아 있는 queue.attempts는 bead 이력의 최신 접미다; 구현·리뷰 attempt의 생존·슬롯 점유·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다; beads-ui가 띄운 대화형 세션은 슬롯을 점유하지 않는 별도 큐 레코드로 투영되고 그 생존·종료만 reconcile이 소유한다; Worker는 구현 attempt dispatch에서만 open Bead를 in_progress로 선점하고 session_ref는 쓰지 않는다"
supersedes: [27, 29, 21, "UI-6pif", 50]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# Worker 이력 기록과 세션 생존 소유

## Context

- `0027`: Worker 이력의 SoT는 bead별 append-only `events.jsonl`이고 `queue.json`은 살아 있는 상태만 담는다.
- `0029`: 살아 있는 `queue.attempts`는 bead 이력의 최신 접미라는 불변식으로 이관을 판정한다.
- `0021`: 구현·리뷰 attempt의 생존·슬롯 점유·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다.
- `UI-6pif`: beads-ui가 띄운 대화형 세션은 슬롯을 점유하지 않는 큐 레코드로 투영되고 생존·종료는 reconcile이 소유한다.
- `0050`: Worker는 구현 attempt dispatch에서만 open Bead를 in_progress로 선점하고 session_ref는 쓰지 않는다.

## Decision

이력 기록

- Worker의 실행·실패 이력 SoT는 bead마다 하나인 append-only `events.jsonl` 타임라인이다. 쓰기는 Worker 서버 프로세스 하나가 소유하고, 각 이벤트는 생산자가 안정적으로 구성한 `event_id`를 가져 읽는 쪽이 멱등 처리한다.
- `queue.json`은 살아 있는 attempt와 미처리 상태만 보유한다. 처리가 끝난 terminal attempt는 terminal 이벤트 기록 뒤 bead 디렉터리의 attempt 레코드로 이관한다. 상태 파일에 과거 attempt가 없는 것은 정상이다.
- 실패마다 한 줄 `summary`를 한 번 추출해 타임라인 이벤트와 attempt 레코드 양쪽에 싣는다. 세션 원문 로그는 bead 디렉터리로 옮겨 보존 정책을 받고, 닫힌 bead의 원문 로그는 압축·삭제할 수 있지만 `events.jsonl`은 영구 보존한다.
- 살아 있는 `queue.attempts`는 각 bead 전체 이력의 최신 접미다. 한 attempt는 처리 완료 terminal이고 직렬 레인을 점유하지 않을 때 이관 가능하며, 같은 bead의 더 오래된(`q.attempts` 삽입 순서) attempt가 모두 같은 pass에서 이관 가능할 때만 큐를 떠난다.
- reader는 라이브 큐만 보고 이관된 파일과의 합집합 조회를 쓰지 않는다.

생존 소유

- `isSchedulerOwned`는 lifecycle 소유 predicate다. `kind ∈ {implementation, review_session}`이면 참이고 `retired_kind`와 미지의 kind는 거짓이다.
- 살아 있는가(pid probe), 슬롯을 점유하는가, 죽었을 때 정산을 시작하는가는 scheduler(`reconcile`·`occupiedBeadIds`)가 소유한다. 죽은 세션의 결과(영수증이 current인가, claim이 어느 head에 exhausted인가)는 큐(`review-session.js complete()` → `settleReviewSession`)가 소유한다.
- `reconcile`의 후보 선별(`running`/`settling`/`claimed` fence와 pid + start time 기반 `isDeadAttempt`)은 두 kind에 같고 처분만 kind로 가른다. 죽은 `review_session`은 로그를 EOF까지 drain해 usage·guard 증거를 확정한 뒤 `exit: null` verdict로 `complete()`를 호출한다.
- 자동 리뷰 전용 동시성 한도는 없다. 부팅 복구(`recoverReviewSessions`)는 살아 있거나 probe가 `unknown`인 기록을 그대로 두고 reconcile에 맡긴다.
- beads-ui가 띄운 대화형 세션(해결·문의, claude·codex)은 큐 스냅샷의 durable 레코드 `interactive_sessions[<bead_id>:<kind>]`로 투영되고 슬롯을 점유하지 않는다. 기동 직후 런처가 레코드를 쓰고 클라이언트 CAS op는 없다.
- 대화형 세션의 생존·복구·종료는 scheduler reconcile이 소유한다. pane 마커·pane id로 생존을 판정하고, 레코드 없는 마커 pane은 복구 레코드로 재구성하며, tmux에 닿지 못하면 그 pass는 아무것도 판정하지 않는다.
- 대화형 세션의 fork 원천은 `qualifyInteractiveForkSource` 하나가 정하고 순서는 최신 implementation attempt의 러너 세션(transcript가 local일 때) → bd `session_ref` 마지막 항목 → fresh다. fresh의 provider는 기록된 provider를 보존한다.
- 대화형 세션의 정산은 전이 시점의 write(머지 뒤 `done` 이동, 일반 폐기 완료, 이슈 스냅샷의 `closed` 관측)다. 정산된 세션은 idle일 때만 닫는다 — claude는 `/exit` 주입 뒤 90초 유예, codex는 `kill-window`; 턴 중·대화상자 대기는 미루되 30분 상한 뒤 `kill-window`. 스레드 아카이브는 브리지 소유다.
- 끝난 대화형 세션의 레코드는 지우고 타임라인 `interactive_session` 이벤트만 남긴다.

in_progress 선점

- Worker는 구현 attempt의 dispatch 경로에서만, `prerecordAttempt` 성공 뒤 직전에 읽은 status가 정확히 `open`일 때 `bd update <id> --status in_progress`를 1회 쓰고 readback한다. `open`이 아니거나 bd 오류면 쓰지 않고 dispatch는 계속된다.
- Worker는 `session_ref`를 쓰지 않는다.
- `resolved` Bead를 다루는 경로(`dispatchExternalConflict`, `relaunchResolvedAttempt`)와 재개·처분·리뷰·stale-work 이어하기 경로에는 선점을 넣지 않는다.
- 선점은 attempt 기록에 `worker_claim: pending → written → released`로 남긴다.
- 해제는 기존 종료 경로(`releaseBeadClaim`)와 `reconcile` 정산이 한다. `worker_claim=written`인 채 terminal이 된 attempt(같은 Bead의 살아 있는 attempt 없음·`pr_url` 없음·Bead가 여전히 `in_progress`)는 정산에서 `open`으로 되돌리고 `released`를 기록한다. 기록 없는 Bead를 스캔하는 별도 재조정은 없다.
- readiness 술어(route·spec_review·impl_entry·의존성)는 status와 무관하게 판정한다.

## Consequences

- Worker 이력·생존·claim 소유가 한 행으로 읽힌다. 되돌리려면 events.jsonl 기록기·queue.json 이관·reconcile·claim 경로가 함께 움직인다.
- 흡수한 다섯 ADR의 조항은 전부 승계했고 폐기한 조항은 없다.
