---
id: 40
title: 머지 게이트의 영수증 보류는 자동 해소 주체 유무로 나뉘고 위조 3종은 즉시 terminal needs_human이다
status: accepted
date: 2026-09-07
summary: "머지 게이트의 영수증 보류는 자동 해소 주체가 있는지로 나뉘고, 사람의 baseline 원상복원으로만 풀리는 위조 3종은 대기 없이 terminal needs_human으로 종단해 알림과 두 클릭으로 넘긴다"
spec: docs/superpowers/specs/2026-09-04-takeover-continuation-receipt-hold-visibility-design.md
bead: UI-jxs3
---

# 머지 게이트의 영수증 보류는 자동 해소 주체 유무로 나뉘고 위조 3종은 즉시 terminal needs_human이다

## Context

머지 게이트는 `exec_receipt` 검사가 hold 등급 코드를 내면 이유
`receipt_unbacked:<code>`로 머지를 보류한다(`EXEC_RECEIPT_MERGE_GATE.hold`, 6코드).
보류의 소비 경로는 `COMPLETION_FAILURE_POLICY`의 `receipt_unbacked: metadata_watch`
하나였다 — bd 이벤트가 올 때마다 게이트를 다시 돌리고 여전히 보류면 `last_error`만
갱신한 채 상한 없이 기다린다. terminal이 아니므로 needs_human 이벤트도, 알림도,
`auto_merge_skips` 기록도 남지 않는다.

2026-09-04 UI-91fl 실측에서 이 침묵이 문제가 됐다. Worker가 무인 dispatch한
attempt를 `[세션에서 해결]`로 이어받은 대화형 세션이 계약대로 `impl_entry`를 썼고,
dispatch 시점에 얼어붙은 `receipt_baseline` 대비 그 이동이 `approval_forged`가
되었다. 「머지 게이트 통과」 이벤트 뒤 약 2시간 동안 아무 기록 없이 대기가 이어졌고,
사용자는 `[머지]` 클릭 두 번이 needs_human으로 끝난 뒤 세 번째 클릭이 receipt
tier를 waive해서야 머지를 얻었다.

hold 6코드는 해소 주체가 다르다.

- `approval_forged`·`dispatch_forged`·`mode_authority_forged`는 baseline 대비
  **이동**으로만 난다. 판정은 이력 없이 현재 metadata와 baseline 스냅샷의 차만 보므로
  사람이 baseline 키를 원상복원하면 위반은 사라지지만, 그 편집을 할 **자동 주체가
  없다** — 무인 attempt는 baseline 키를 쓰지 못하고, 새 커밋·새 영수증·probe
  재관측은 baseline 차를 바꾸지 못한다.
- `unit_plan_mismatch`·`non_ancestor`·`ancestry_probe_error`(그리고 게이트 밖에서
  같은 이유 형식으로 도착하는 `probe_error`)는 새 커밋·새 영수증·재관측으로 관측이
  실제로 바뀔 수 있다.

승계 세션이 권한 키를 쓰지 않는 규칙은 dotfiles 계약이 소유한다(`ADR dotfiles/0064`,
형제 Bead `dotfiles-xk12`). 같은 분류를 계약 쪽 실패 클래스 `receipt_hold`로 기록한
대응 결정은 `ADR dotfiles/0065`이며, 이 ADR은 그 결정을 소비자 beads-ui의 각도에서
적는다. 그 규칙이 서면 위조 3종은 "정상 흐름에서는 다시
나지 않는 위반"이 되고, 그래도 났다면 사람이 봐야 할 사건이다.

## Decision

**머지 게이트의 영수증 보류는 자동 해소 주체가 있는지로 분류하고, 없는 위조 3종은
대기 없이 즉시 terminal needs_human으로 종단한다.**

- 분류의 정본은 `server/worker/receipt-check.js`의 `RECEIPT_HOLD_RESOLUTION`
  레지스트리다. `unresolvable`(위조 3종)과 `resolvable`(나머지 3종)은 서로소이고
  합집합은 `EXEC_RECEIPT_MERGE_GATE.hold`와 정확히 같다. 이름의 뜻은 "자동으로는
  해소 불가"이지 "영구"가 아니다.
- `factFromGate`가 `receipt_unbacked:<code>`의 코드가 `unresolvable`이면 terminal
  fact를 만든다 — 저장 이유는 `receipt_unresolvable:<code>`(needs_human family로
  등록해 fold가 멱등), `failure_key.stage`는 `merge_gate`, `evidence`는 위반
  detail(`impl_entry (absent) -> user@…` 형태)이다. 게이트가 만든
  `receipt_unbacked:<code>` 이유 문자열은 바꾸지 않는다 — 큐 실패 문구와 자동 제외
  기록이 이미 쓰는 값이다.
- `resolvable`은 현행 `metadata_watch` 그대로이고 대기 상한을 두지 않는다. 대신 PR
  대기 행의 자동 해소 배지를 「영수증 대기 — <code>」로 특수화해 대기를 보이게 한다.
- terminal의 출구는 기존 두 클릭이다 — `[머지]` 재클릭(그 head의 receipt tier를
  waive)과 `[세션에서 해결]`. 새 출구를 만들지 않고 알림 클래스 「머지 게이트 보류」
  (dotfiles `failure_classes.receipt_hold.notify_label`의 바이트 복사)와
  `next_action` `'[머지] 재클릭 또는 [세션에서 해결]'`로 그 두 클릭을 1차 클릭 전에
  안내한다.
- `receipt_baseline`은 재포착하지 않는다. 불변식·위조 판정 규칙·hold/badge 표·
  `[머지]` 클릭의 waive 권한은 그대로다.

기각한 대안: `metadata_watch` 유지 + 배지. 사람이 baseline을 원상복원하면 자동
재개되지만 알림이 없고 무엇을 편집해야 하는지 화면이 말하지 못한다 — 실측의 2시간
침묵이 정확히 그 상태였다. terminal + 알림 + 클릭은 편집 뒤에도 클릭이 한 번 더
필요하지만, 즉시 보이고 재진입 경로가 ADR 0024의 기존 두 클릭과 같다.

## Consequences

- 영수증 검사 레지스트리·completion 실패 정책·알림 클래스·배지·dotfiles 계약
  어휘(`receipt_hold` 클래스)가 한 판정에 묶인다. 분류를 되돌려도 그 사이에 종단된
  intent는 자동으로 대기로 돌아가지 않는다.
- ADR 0031(`impl_review` 부재·비조상은 보류이며 큐가 자동 리뷰 lineage를 띄운다)과
  겹치지 않는다 — 그 결정의 대상은 큐가 스스로 띄울 자동 해소 주체가 **있는**
  영수증이고, 이 결정은 그 주체가 없는 `exec_receipt` 위조 3종만 옮긴다.
- 위조 3종에서 사람이 baseline을 원상복원했더라도 terminal이라 `metadata_watch`가
  다시 돌지 않는다. 출구는 같은 `[머지]` 재클릭이며, 그 클릭은 어차피 receipt tier를
  waive하므로 편집 여부와 무관하게 통과한다.
- `resolvable` 셋의 대기 상한과 Monitor 탭 반영은 실측 뒤 판단한다. 관측 전에 정책을
  늘리지 않는다.
