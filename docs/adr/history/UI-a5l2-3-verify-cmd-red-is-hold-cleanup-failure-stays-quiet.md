---
id: UI-a5l2-3
title: 머지 게이트의 verify_cmd red와 머지 후 정리 실패는 종단·알림 없이 그 Bead에 머문다
status: superseded
superseded_by: UI-u6ud-4
date: 2026-09-21
summary: "머지 게이트 verify_cmd red는 terminal verify_red가 아니라 g0lk의 verify_hold이고 spawn 오류·timeout만 1회 재평가를 거치며, 머지 후 정리 실패는 카드의 정리 재시도 행에만 남고 Discord 사람 필요 알림을 보내지 않는다"
supersedes: ["UI-g0lk", "UI-3vvi-2"]
spec: docs/superpowers/specs/2026-09-21-worker-wait-guard-simplification-design.md
bead: UI-a5l2
---

# 머지 게이트의 verify_cmd red와 머지 후 정리 실패는 종단·알림 없이 그 Bead에 머문다

## Context

30일 실측(스펙 §1)에서 정리 실패로 인한 `🚨 사람 필요` 알림·큐 systemic 정지 8건은 전부
하네스 결함이었다. UI-g0lk 15:09 알림은 충돌 해결 세션이 PR head를 바꾼 뒤 완료 정리가
옛 head와 identity를 대조해 `identity_changed`를 낸 거짓 경보였다. `verify_red` terminal
2건은 머지 게이트의 워크스페이스 검증 명령이 **실행된 뒤** 0이 아닌 코드로 끝난
`verify_cmd_failed`였다 — repo-ops `[verify]` 스크립트 red와 같은 코드 질문인데 한쪽은
비종단 보류(ADR UI-g0lk), 한쪽은 terminal `needs_human`으로 갈렸다.

ADR UI-g0lk는 "`verify_cmd_failed → verify_red` terminal 종단은 그대로 둔다"를, ADR
UI-3vvi-2는 0024에서 "기계가 durable terminal 기록을 쓰는 순간 자동 알림 1건"을
승계했다(정리 단계 포함). 두 조항이 이 결정과 어긋나므로 이 ADR이 둘을 승계한다.

## Decision

**머지 게이트의 `verify_cmd` red는 UI-g0lk의 `verify_hold`(비종단 holding)이고, 머지 후
정리 실패는 카드의 `[정리 재시도]` 행에만 남으며 Discord `🚨 사람 필요`를 보내지 않는다.**

- `verify_cmd_failed`(실행 뒤 비정상 종료)는 재평가 없이 곧바로 `verify_hold`로 들어간다.
  배지·본문·출구는 g0lk 그대로(`검증 실패 — 수정 push 대기`, `[세션에서 해결]`, 수정
  push가 자동 해제)이고 Discord는 「머지 전 검증 실패」 라벨을 head당 1회 쓴다. 실패 키
  stage는 `verify`, reason은 `verify_cmd_failed`로 남겨 repo-ops red와 구분한다.
- `verify_cmd_spawn_error`·`verify_cmd_timeout`(환경 증거가 있는 경우)은 `auto_resolution`
  (`class:'retry'`)으로 5분 뒤 게이트를 한 번 재평가하고, 다시 같은 코드면 같은
  `verify_hold`에 사유 코드를 싣고 배지만 `검증 명령 실패 — 환경 확인`으로 그린다.
- terminal `needs_human('verify_red')`, `needsHumanHoldKind`의 systemic 판정,
  `ALWAYS_SYSTEMIC_CAUSES`의 `verify_red`는 없다.
- `failCleanup`은 「정리 중단」 알림(`announceCleanupStop`)을 보내지 않는다 — 첫 실패,
  관측형 자동 재실행 소진, `[정리 재시도]` 재실패 모두 같다. 정리 실패는 Bead 카드의
  `cleanup_failed` 행·timeline·Bead 댓글에만 남는다. 남는 `needs_human` 알림 클래스는
  머지 게이트 보류(ADR 0040의 위조 3종), 배포 실패(사다리 소진 뒤 terminal, 계약 소유),
  post-merge 잡 실패, 수동 배포 실패, 폐기 실패다.
- 완료 정리의 `expected_head`는 완료 intent가 머지를 실행할 때 기록한 머지 op의 head
  (`merge_head_sha`)이며 관측 head·subject head가 아니다. 머지 op head를 읽을 수 없는
  오래된 intent는 관측 head → subject head 순으로 폴백한다.

### ADR UI-g0lk에서 승계하는 조항

머지 전 verify 실패는 completion intent의 비종단 phase `holding`이 소유하는 보이는
보류다(등록 자격은 「verify 영수증이 있고 실패했다」). 보류 중인 행은 `merge_queue`에서
빠지고 뒤의 PR이 선두에 오른다. 알림 이력의 단위는 head다 — 타임라인 `merge_step
hold:<head_sha>`, Bead 댓글 `## 🤖 완료 보류 기록`, Discord 「머지 보류」 각 head당 한
번, 재관측·재시작은 침묵. 수정 커밋 push가 보류를 자동으로 풀고 `[머지]` 재클릭은
무해하다. `[세션에서 해결]`은 PR 대기 행 하나에만 서고 재료는 넷(머지 후 정리 실패·
needs_human·폐기 실패·holding)이며 프롬프트는 보류형이다. 투영은 `phase === 'holding'`
일 때만 `hold`를 싣고 같은 head의 terminal 증거가 우선한다. `receipt_baseline` 불변식·
위조 3종 terminal 판정·`[머지]` 클릭 의미(ADR 0040)는 바꾸지 않는다. 알림 라벨은
dotfiles 계약의 바이트 복사다(ADR 0012). 뒤집는 것은 "`verify_cmd_failed → verify_red`
terminal 종단은 그대로 둔다" 한 조항이다.

### ADR UI-3vvi-2에서 승계하는 조항

머지 후 결함의 자동 인계 전부 — 원시 operation 보존과 복구 분류, 소유 코드 결함의 단일
자동 증명(`deterministic_owned_script_failure`), operation 원장이 소유하는 단일 예약과
재채택, 일반 workflow 입구인 수정 Bead(`type:bug`·quick_fix handoff 네 절·
`quick_fix_review=worker@<digest>`·parallel 배치), 수정 PR 생성만으로 원래 작업을
완료시키지 않음, UI-j9j5에서 승계한 post-merge 잡 원장·`replaces` 승계·CAS 확정, 0024에서
승계한 `[정리 재시도]`·`[세션에서 해결]`·폐기 실패의 세 출구·`[폐기 포기]`·자동 인계는
폐기나 사람 결정을 대신하지 않음 — 은 그대로다. 뒤집는 것은 0024 승계 조항 "기계가
durable terminal 기록을 쓰는 순간 자동 알림 1건" 가운데 **정리 단계**(`cleanup_failed:*`)
에 대한 부분이다. 배포 실패·post-merge 잡 실패·폐기 실패의 알림은 유지한다.

기각한 대안: `verify_cmd_failed`를 환경 오류로 1회 재평가(실행 뒤 비정상 종료는 코드
red라 재평가가 같은 결과를 낼 뿐이고 "환경 확인" 문구가 거짓이 된다 — 스펙 r1 리뷰 F6);
정리 알림을 `NEEDS_HUMAN_NOTIFY_CLASSES`에서만 제거(실제 발신 지점은 `announceCleanupStop`
이라 알림이 계속 나온다 — 스펙 r1 리뷰 F4); 정리 알림을 첫 실패에만 유지(30일 8건이
전부 거짓 경보였다).

## Consequences

- 되돌리기 어렵다: `verify_red` terminal 가족과 정리 단계 Discord 알림 경로가 사라지고,
  `verify_hold`의 사유 코드 집합이 넓어진다.
- 맥락 없이는 놀랍다: 검증 명령이 빨간데 큐가 서지 않고 알림도 g0lk 보류 1회뿐이며,
  정리가 실패해도 채널에 아무것도 오지 않는다.
- 트레이드오프: 정리 잔재를 사람이 카드에서 발견해야 하는 대신, 30일 8건이 전부 하네스
  결함이던 거짓 경보를 없앤다.
- 머지 op head를 기록하지 않은 옛 완료 intent는 폴백 경로를 타므로 충돌 해결 뒤 head가
  바뀐 옛 기록은 여전히 `identity_changed`가 날 수 있다.
