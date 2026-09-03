---
id: 36
title: 파킹의 출구는 문의 세션뿐이고 해제 전이 재디스패치는 stale 두 값에만 걸린다
status: accepted
date: 2026-09-03
summary: "Worker 파킹(`awaiting_user` 존재)의 출구는 값별 문의 세션의 자동 기동과 파킹 타일 `[세션에서 해결]` 클릭뿐이고 새 attempt `[재시도]`는 없으며, `awaiting_user` 해제 전이의 자동 재디스패치는 문의 세션이 구현을 착수하지 않는 stale 두 값에만 걸리고 구현 충돌 값은 PR 관측으로만 정산한다 — parked 분류와 '자동 재디스패치 없음'은 0017에서 승계한다"
supersedes: [17]
spec: docs/superpowers/specs/2026-09-03-parked-exit-inquiry-session-design.md
bead: UI-gjp2
---

# 파킹의 출구는 문의 세션뿐이고 해제 전이 재디스패치는 stale 두 값에만 걸린다

## Context

ADR 0017은 `awaiting_user`를 남기고 정상 종료한 attempt를 `parked`로 분류하고 자동
재디스패치를 금지했다. 그때 정한 재개 경로는 둘이었다 — 타일 `재시도`(ws
`worker-parked-retry`)와 `awaiting_user` 소거 전이 관측. 2026-09-03 `UI-91fl`이
`awaiting_user=impl_review_conflict:design`으로 파킹되면서 그 둘이 모두 통하지
않는다는 것이 실측으로 드러났다.

`재시도`는 같은 세션을 잇지 않는 **새 attempt**다. 파킹한 세션이 워크트리에 후보
커밋을 남겨 두었으므로 새 attempt는 `worktree_stale_work` admission에 먼저 막히고,
응답은 사유 없는 `dispatch_refused`였다. 이벤트 로그에 `[재시도] 클릭 · 파킹 해제`
2회, 후속 `dispatched`는 없다. 설령 admission을 통과했더라도 결정이 들어오지 않은
자리에서 같은 리뷰가 같은 갈래를 다시 만나 다시 파킹될 뿐이다.

소거 전이 재디스패치도 값에 따라 의미가 갈린다. stale 두 값
(`spec_review_stale:revise`·`plan_approval_stale:revise`)의 문의 세션은 아티팩트를
발행만 하고 구현을 착수하지 않으므로, Worker 재디스패치가 바로 그 구현이다. 반면
`impl_review_conflict:design`의 문의 세션은 계약 정본(dotfiles
`2026-09-03-parking-contract-spec-deviation-and-inquiry-design.md` §3.3)대로 해제
뒤 구현을 finish까지 잇는다. 그 값에 소거 전이 재디스패치를 그대로 두면 세션이
`awaiting_user`를 지우는 순간 Worker가 같은 Bead에 두 번째 attempt를 띄워 두 실행이
같은 워크트리를 다툰다.

파킹은 "다시 굴리면 풀리는 실패"가 아니라 "결정이 들어와야 풀리는 대기"다. 그래서
출구도 실행을 다시 시작하는 버튼이 아니라 결정을 넣는 대화여야 한다.

## Decision

`parked` 분류 자체와 "자동 재디스패치 없음"은 ADR 0017에서 그대로 승계한다:
verdict `success` ∧ bead status ∉ {resolved, closed} ∧ `pr_url` 없음 ∧
`awaiting_user` 키 존재일 때 attempt는 `status='parked'`, `cause='session_parked'`
이고, 실패가 아니므로 큐는 계속 가며 Worker는 스스로 새 attempt를 만들지 않는다.

바뀌는 것은 출구다.

1. **모든 파킹이 문의 세션으로 이어진다.** `awaiting_user`가 문자열이면 값이 계약
   어휘 안이든 밖이든 `parked` 기록 직후 문의 세션을 기동한다. 값별 분기는 셋이다 —
   stale 두 값, `impl_review_conflict:design`, 그 밖의 값(일반 파킹 블록). 프롬프트
   원문은 dotfiles가 소유하고 beads-ui는 그 블록의 바이트 복사를 다이제스트로
   고정한다(ADR 0012).
2. **파킹 타일의 출구는 `[세션에서 해결]`·`[폐기]` 둘이다.** `[세션에서 해결]`은
   살아 있는 문의 세션이 있으면 그 pane을 가리키고(`already_running`), 없으면 기록된
   세션을 fork해 띄운다. 이 진입은 자동 기동 게이트(`worker_direction_inquiry.enabled`)
   를 읽지 않는다 — 그 플래그는 자동 기동의 게이트이고 이것은 클릭이다.
3. **새 attempt `[재시도]`는 없다.** ws op `worker-parked-retry`, `scheduler.retryParked`,
   그 어댑터·버튼·CSS·이벤트를 제거한다.
4. **해제 전이 자동 재디스패치는 stale 두 값에만 걸린다.** 후보 판정은 파킹
   레코드의 `cause_detail.awaiting_user`로 하고, `impl_review_conflict:design`과 어휘
   밖 값은 후보가 아니다. `impl_review_conflict:design`은 그 문의 세션이 해제 뒤
   구현을 finish까지 잇기 때문에 Worker가 PR 관측(`resolved` + `pr_url`)으로만
   정산한다. 어휘 밖 값은 그 값을 정의한 계약이 없으므로 Worker가 해제·정산 규칙을
   스스로 정하지 않는다 — 문의 세션은 답을 기록하고, 그 뒤 무엇이 정산인지는 그
   값을 정의하는 계약이 소유한다. stale 경로의 "attempt당 1회" fence
   (`parked_resumed_at`)는 유지한다.

## Consequences

- 문의 세션이 뜰 수 없는 호스트(tmux·브리지 없음)에서는 알림 뒤 사람이 직접 세션을
  여는 수밖에 없다. `[재시도]`가 주던 "일단 다시" 출구를 잃는 대가다. 알림은 세션
  기동 결과(`launched · fork …` / `not_launched · <reason>`)와 처분
  `Worker 탭 [세션에서 해결] · [폐기]`를 함께 싣는다.
- `impl_review_conflict:design` 파킹의 해제 뒤 세션이 죽으면 `parked` 레코드와 타일이
  그대로 남고, 재진입은 `[세션에서 해결]`(fork 재기동)뿐이다. Worker는 그 자리에서
  아무것도 자동으로 하지 않는다.
- 되살리기가 어렵다: ws op·핸들러·버튼이 제거되고 알림 어휘가 바뀐다. 되돌리면 구현
  충돌 파킹에서 두 attempt가 같은 워크트리를 다투는 상태가 돌아온다.
- ADR 0019(head당 리뷰 1회 자동 dispatch)·ADR 0024(사용자 개시 작업 실패의 재진입은
  자동 알림 뒤 사람 클릭)와 정합한다 — 자동은 관측과 알림까지, 재진입은 클릭이다.
- ADR 0017의 재개 경로 두 항목은 이 결정이 대체한다. 0028·0019·0023이 0017을
  인용하며 대조한 `parked` 분류의 의미는 바뀌지 않았으므로 그 대조는 그대로 읽힌다.
