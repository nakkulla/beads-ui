---
id: UI-nuwy-2
title: Worker 이력 기록·세션 생존과 대화 세션 원천
status: superseded
superseded_by: UI-18a5-2
date: 2026-09-30
summary: "Worker 이력의 SoT는 bead별 append-only events.jsonl이고 queue.json은 살아 있는 상태만 담으며 살아 있는 queue.attempts는 bead 이력의 최신 접미다; 구현·리뷰 attempt의 생존·슬롯 점유·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다; beads-ui가 띄운 대화형 세션은 슬롯을 점유하지 않는 별도 큐 레코드로 투영되고 그 생존·종료만 reconcile이 소유하며, 문의(대화) 세션은 attempt 러너 세션을 fork 없이 재개하고 그 정산에 인계(창 소멸 뒤 재개 경로 하나)·보류가 더해진다; Worker는 구현 attempt dispatch에서만 open Bead를 in_progress로 선점하고 session_ref는 쓰지 않는다"
supersedes: ["UI-u6ud-6"]
spec: docs/superpowers/specs/2026-09-30-worker-session-conversation-return-design.md
bead: UI-nuwy
---

# Worker 이력 기록·세션 생존과 대화 세션 원천

## Context

- `UI-u6ud-6`(Worker 이력 기록과 세션 생존 소유)을 대체한다. 그 결정의 "대화형 세션의 fork 원천"과 "대화형 세션의 정산" 조항을 문의 종류에 한해 뒤집고, 이력 SoT·`queue.json`·생존/종료 reconcile 소유·in_progress 선점 조항은 그대로 승계한다.
- 뒤집는 이유는 ADR UI-nuwy(사람 대화는 같은 Worker 세션에서 하고 인계 뒤 Worker가 이어간다)다: 사람이 필요한 멈춤은 fork 문의 세션이 아니라 같은 세션의 대화로 풀고, 결정의 적용은 Worker가 같은 세션을 무인 재개해 가드 아래에서 한다. 그 ADR과 소비자 집합(판정·알림·타일 술어)이 달라 둘째 ADR로 둔다 — 이 ADR의 소비자는 대화형 레코드와 reconcile 정산이다.
- UI-u6ud-6이 흡수한 다섯 ADR(`0027`·`0029`·`0021`·`UI-6pif`·`0050`)의 조항은 아래 결정에 그대로 남는다.

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
- 해결(resolve) 세션의 fork 원천은 `qualifyInteractiveForkSource` 하나가 정하고 순서는 최신 implementation attempt의 러너 세션(transcript가 local일 때) → bd `session_ref` 마지막 항목 → fresh다. fresh의 provider는 기록된 provider를 보존한다.
- 문의(대화) 세션의 원천은 fork가 아니라 attempt 러너 세션의 fork 없는 재개다(UI-nuwy가 뒤집음). 자격은 `qualifyAttemptSession`(러너·세션 ID·로컬 transcript)과 워크트리 존재가 정하고, 자격이 없으면 같은 provider의 fresh에 `fallback_reason`을 남긴다. 레코드는 `mode: 'resume'`(또는 `fresh`)과 `conversation`(멈춤 표기·처리한 메시지 식별자·발췌·결과·`handoff` 예약·인수 알림 시각)을 갖고, 한 세션 ID에는 프로세스 하나다 — 러너가 살아 있으면 기동하지 않고 Worker 재개는 창 소멸 확인 뒤에만 한다.
- 대화형 세션의 정산은 전이 시점의 write(머지 뒤 `done` 이동, 일반 폐기 완료, 이슈 스냅샷의 `closed` 관측)다. 정산된 세션은 idle일 때만 닫는다 — claude는 `/exit` 주입 뒤 90초 유예, codex는 `kill-window`; 턴 중·대화상자 대기는 미루되 30분 상한 뒤 `kill-window`. 스레드 아카이브는 브리지 소유다.
- 문의(대화) 세션의 정산 write에 `인계`와 `보류`가 더해진다(UI-nuwy가 뒤집음): `인계`(또는 `[워커로 이어가기]`)는 `handoff` 예약을 쓰고 창을 닫으며, 소멸을 확인한 pass가 재개 경로 하나를 실행한 뒤에야 레코드를 지운다; `보류`는 창을 닫는다; `인수`는 창을 두고 기존 정산(`bd_closed`·`done`)을 기다린다. 대화의 끝은 attempt `cause_detail.conversation`(`pane_gone`·`hold`·`handoff`·`takeover`, 거절 사유)로 남는다. `conversation` 없는 옛 fork 레코드는 옛 규칙으로 정산한다.
- 끝난 대화형 세션의 레코드는 지우고 타임라인 `interactive_session` 이벤트만 남긴다.

in_progress 선점

- Worker는 구현 attempt의 dispatch 경로에서만, `prerecordAttempt` 성공 뒤 직전에 읽은 status가 정확히 `open`일 때 `bd update <id> --status in_progress`를 1회 쓰고 readback한다. `open`이 아니거나 bd 오류면 쓰지 않고 dispatch는 계속된다.
- Worker는 `session_ref`를 쓰지 않는다.
- `resolved` Bead를 다루는 경로(`dispatchExternalConflict`, `relaunchResolvedAttempt`)와 재개·처분·리뷰·stale-work 이어하기 경로에는 선점을 넣지 않는다.
- 선점은 attempt 기록에 `worker_claim: pending → written → released`로 남긴다.
- 해제는 기존 종료 경로(`releaseBeadClaim`)와 `reconcile` 정산이 한다. `worker_claim=written`인 채 terminal이 된 attempt(같은 Bead의 살아 있는 attempt 없음·`pr_url` 없음·Bead가 여전히 `in_progress`)는 정산에서 `open`으로 되돌리고 `released`를 기록한다. 기록 없는 Bead를 스캔하는 별도 재조정은 없다.
- readiness 술어(route·spec_review·impl_entry·의존성)는 status와 무관하게 판정한다.

## Consequences

- 되돌리기 어렵다: `direction-inquiry.js` 기동 명령, `scheduler.js` `reconcileInteractivePass`의 정산·종료와 인계 이어가기, `queue-store.js` 대화형 레코드 필드(`mode: 'resume'`, `conversation`, `handoff` 예약, 처리한 메시지 식별자)가 함께 움직인다.
- 맥락 없이는 놀랍다: 대화형 세션인데 fork가 아니라 무인 attempt와 같은 세션 ID를 번갈아 쓴다 — 창 소멸 확인과 러너 생존 확인이 그 순서를 지킨다. 무인 세션 이력에 대화가 섞이는 것은 감수한다.
- 대안: 현행 fork 원천 유지 — 결정 맥락이 원래 세션과 갈리고 fork 세션 ID 포착이 취약하다.
- UI-u6ud-6의 조항은 뒤집은 둘(문의 종류의 fork 원천·정산) 외에 전부 승계했고 폐기한 조항은 없다.
