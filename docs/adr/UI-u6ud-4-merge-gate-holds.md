---
id: UI-u6ud-4
title: 머지 게이트 보류
status: accepted
date: 2026-09-23
summary: "impl_review 영수증은 head와 같거나 조상이면 유효하고 head 이동만으로 재리뷰하지 않는다; 영수증 부재·stale·invalid·undetermined는 terminal이 아니라 보류이며 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch하고 소진 뒤 출구는 [리뷰 후 머지] resume이다; 자동 해소 주체가 없는 위조 3종만 즉시 terminal needs_human이다; verify_cmd red는 비종단 verify_hold이고 머지 후 정리 실패는 카드에만 남고 알림하지 않는다"
supersedes: [19, 31, 40, "UI-a5l2-3"]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# 머지 게이트 보류

## Context

- `0019`: 영수증 보류에서 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch하고 소진 뒤 출구는 `[리뷰 후 머지]` resume이다.
- `0031`: `impl_review` 영수증은 head와 같거나 조상이면 유효하고, 부재·stale은 terminal이 아니라 merge-gate hold다.
- `0040`: 자동 해소 주체가 없는 위조 3종만 즉시 terminal needs_human이고 나머지는 `metadata_watch` 보류다.
- `UI-a5l2-3`: `verify_cmd` red는 비종단 `verify_hold`이고 머지 후 정리 실패는 카드에만 남고 알림하지 않으며, UI-g0lk·UI-3vvi-2의 승계 조항을 싣는다.

## Decision

영수증 신선도

- `impl_review` 영수증 SHA가 관측된 head와 같거나 그 조상이면(`git merge-base --is-ancestor`) 유효하다. 조상이 아니면 계보가 끊긴 stale 영수증이다. 큐가 만든 `resolver:` 커밋에도 이 규칙 하나를 예외 없이 적용한다. head 이동만으로 재리뷰하지 않는다.
- ancestry probe가 실패하면 머지 게이트는 fail-closed로 보류하고 보드 표시는 fail-quiet로 `unknown`을 보인다.
- 리뷰 뒤 push된 델타를 사람이 다시 읽지 않을 수 있는 잔여 위험은 수용하고, ancestry가 통과시킨 조합의 의미 충돌은 `[verify]` 영수증이 검사한다.

영수증 보류와 자동 리뷰 dispatch

- 영수증 부재·stale·invalid·undetermined(`review_receipt_missing`·`stale`·`invalid`·`undetermined`)는 terminal이 아니라 merge-gate hold다. 머지는 계속 큐가 소유한다.
- 보류에서 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch한다. 판정 자리는 게이트가 보류 사유를 낸 그 턴(`merge-queue.js` `holdEntry`)이고 매 `kick()`이 재판정하므로 별도 감시자·타이머는 없다.
- 주체는 lineage다. 행의 durable claim `review_dispatch={head_sha, attempt_id, state, at}`을 자동 dispatch와 클릭이 함께 쓴다.
- claim 뒤의 dispatch 실패는 원인 구분 없이 `exhausted`이고 보류는 유지되며 자동으로 다시 뜨지 않는다. `exhausted` head의 출구는 `[리뷰 후 머지]` 하나이고 그 클릭은 같은 lineage의 resume이다.
- 자동 dispatch는 authority를 부여하거나 source를 바꾸지 않는다. authority 없는 행의 출구도 버튼이다.
- 자동(enrollment) authority 행에는 머지 큐의 슬롯 fence를 적용하고 수동 authority는 면제다.

위조 3종 terminal

- 보류 분류의 정본은 `server/worker/receipt-check.js`의 `RECEIPT_HOLD_RESOLUTION`이다. `unresolvable`(위조 3종)과 `resolvable`(나머지 3종)은 서로소이고 합집합은 `EXEC_RECEIPT_MERGE_GATE.hold`와 같다.
- `receipt_unbacked:<code>`의 코드가 `unresolvable`이면 대기 없이 terminal needs_human이다. 저장 이유는 `receipt_unresolvable:<code>`, `failure_key.stage`는 `merge_gate`, `evidence`는 위반 detail이다. 게이트의 `receipt_unbacked:<code>` 문자열은 바꾸지 않는다.
- `resolvable`은 `metadata_watch`이고 대기 상한이 없으며, PR 대기 행의 자동 해소 배지를 「영수증 대기 — <code>」로 보인다.
- terminal의 출구는 `[머지]` 재클릭(그 head의 receipt tier를 waive)과 `[세션에서 해결]` 둘이다. 알림 클래스 「머지 게이트 보류」(dotfiles `failure_classes.receipt_hold.notify_label`의 바이트 복사)와 `next_action` `'[머지] 재클릭 또는 [세션에서 해결]'`로 안내한다.
- `receipt_baseline`은 재포착하지 않고 불변식·위조 판정 규칙·hold/badge 표·`[머지]` 클릭의 waive 권한은 바꾸지 않는다.

verify 보류

- 머지 전 verify 실패는 completion intent의 비종단 phase `holding`이 소유하는 보이는 보류(`verify_hold`)다. 등록 자격은 「verify 영수증이 있고 실패했다」다. 보류 중인 행은 `merge_queue`에서 빠지고 뒤의 PR이 선두에 오른다.
- `verify_cmd_failed`는 재평가 없이 곧바로 `verify_hold`다. 배지 `검증 실패 — 수정 push 대기`, 출구 `[세션에서 해결]`, 수정 push가 자동 해제하며, Discord는 「머지 전 검증 실패」를 head당 1회 쓴다. 실패 키 stage는 `verify`, reason은 `verify_cmd_failed`다.
- `verify_cmd_spawn_error`·`verify_cmd_timeout`(환경 증거가 있는 경우)은 `auto_resolution`(`class:'retry'`)으로 5분 뒤 한 번 재평가하고, 다시 같은 코드면 같은 `verify_hold`에 사유 코드를 싣고 배지만 `검증 명령 실패 — 환경 확인`이다.
- terminal `needs_human('verify_red')`와 그 systemic 판정은 없다.
- 알림 이력의 단위는 head다. 타임라인 `merge_step hold:<head_sha>`, Bead 댓글 `## 🤖 완료 보류 기록`, Discord 「머지 보류」가 head당 한 번이고 재관측·재시작은 침묵이다. `[머지]` 재클릭은 무해하다.
- `[세션에서 해결]`은 PR 대기 행 하나에만 서고 재료는 넷(머지 후 정리 실패·needs_human·폐기 실패·holding)이며 프롬프트는 보류형이다. 투영은 `phase === 'holding'`일 때만 `hold`를 싣고 같은 head의 terminal 증거가 우선한다. 알림 라벨은 dotfiles 계약의 바이트 복사다.

머지 후 정리와 자동 인계

- `failCleanup`은 「정리 중단」 알림을 보내지 않는다(첫 실패, 관측형 자동 재실행 소진, `[정리 재시도]` 재실패 모두). 정리 실패는 Bead 카드의 `cleanup_failed` 행·timeline·Bead 댓글에만 남는다.
- 남는 `needs_human` 알림 클래스는 머지 게이트 보류(위조 3종), 배포 실패(사다리 소진 뒤 terminal), post-merge 잡 실패, 수동 배포 실패, 폐기 실패다.
- 완료 정리의 `expected_head`는 머지 op의 head(`merge_head_sha`)이고, 읽을 수 없는 오래된 intent는 관측 head → subject head 순으로 폴백한다.
- 머지 후 결함의 자동 인계는 원시 operation 보존과 복구 분류, 소유 코드 결함의 단일 자동 증명(`deterministic_owned_script_failure`), operation 원장이 소유하는 단일 예약과 재채택, 일반 workflow 입구인 수정 Bead(`type:bug`·quick_fix handoff 네 절·`quick_fix_review=worker@<digest>`·parallel 배치)로 한다. 수정 PR 생성만으로 원래 작업을 완료시키지 않는다.
- post-merge 잡 원장·`replaces` 승계·CAS 확정, `[정리 재시도]`·`[세션에서 해결]`·폐기 실패의 세 출구와 `[폐기 포기]`를 두며, 자동 인계는 폐기나 사람 결정을 대신하지 않는다.

## Consequences

- 머지 게이트의 보류·terminal·알림 규칙이 한 행으로 읽힌다. 되돌리려면 receipt-check 레지스트리·review lineage claim·completion intent phase·알림 클래스가 함께 움직인다.
- 흡수한 네 ADR과 `UI-a5l2-3`이 승계하던 UI-g0lk·UI-3vvi-2 조항은 전부 승계했고 폐기한 조항은 없다.
