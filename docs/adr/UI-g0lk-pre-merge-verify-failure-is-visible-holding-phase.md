---
id: UI-g0lk
title: 머지 전 검증 실패는 completion intent의 비종단 holding 보류다
status: accepted
date: 2026-09-21
summary: "머지 전 검증 실패는 completion intent의 비종단 holding 보류로 보이게 남기고, 수정 push가 자동으로 풀며 [세션에서 해결]이 사람 출구다 — terminal 종단·baseline 위조 판정·[머지] 의미는 바꾸지 않는다"
spec: docs/superpowers/specs/2026-09-21-pre-merge-verify-hold-visible-exit-design.md
bead: UI-g0lk
---

# 머지 전 검증 실패는 completion intent의 비종단 holding 보류다

## Context

PR 관측 poller는 관측된 (bead, head)마다 repo-ops verify를 자동 실행하고, 머지
게이트는 그 영수증이 `ok=false`면 tier `verify`·배지 「검증 실패」·원인 코드
(`script_failed` 등)를 낸다. 그런데 자동 머지 등록기의 등록 자격은 구형
verify-cmd 경로의 코드 `verify_cmd_failed`만 알았다. repo-ops 경로의 실패 행은
completion intent가 생기지 않았고, intent가 없으니 타임라인·Bead 댓글·Discord
알림·`[세션에서 해결]`의 재료도 전부 없었다. 2026-09-16(UI-3vvi)에는 이 침묵이
3시간 17분 이어졌고, 그 사이 사용자가 직접 연 세션이 표준 입구 절차대로
`impl_entry`를 써서 ADR 0040이 정한 `approval_forged` terminal이 재발했다.

ADR 0040은 머지 게이트의 보류를 **자동 해소 주체가 있는지**로 나눈다. 머지 전
verify 실패는 수정 커밋 push → poller 재verify라는 자동 해소 주체가 **있는**
보류다. 그러나 그 사실을 아무 표면도 말하지 않았고, 사람이 이어받을 출구도
없었다.

## Decision

- 머지 전 verify 실패(verify 영수증이 있고 `ok=false`, 코드 무관)는 completion
  intent의 새 비종단 phase **`holding`**이 소유하는 보이는 보류다. 등록 자격은
  「verify 영수증이 있고 실패했다」로 넓히고, `verify_cmd_failed → verify_red`
  terminal 종단은 그대로 둔다.
- 보류 중인 행은 `paused`처럼 `merge_queue`에서 빠진다. 뒤의 정상 PR과 다른 실패
  PR이 선두에 올라 각각 판정·머지·보류된다. `merge-queue.js`는 바꾸지 않는다.
- 알림 이력의 단위는 **head**다. 타임라인 `merge_step hold:<head_sha>` 한 줄, Bead
  댓글 `## 🤖 완료 보류 기록`한 건, Discord 알림 「머지 보류」 한 건이 head당 한
  번 나간다. 같은 head에서 operation·코드만 바뀌거나 base만 이동해 재핀되면
  내용만 갱신하고 `comment_at`을 보존하며 효과는 없다. 재시작·재관측은 침묵한다.
- 수정 커밋 push가 보류를 **자동으로** 푼다. 새 head는 기존 `stale → gate` 경로로
  `gating`에 복귀하고 그때 `hold`가 비워진다. `[머지]` 재클릭은 같은 head를 다시
  넣지만 코디네이터가 같은 실패 영수증을 관측해 다시 `hold`(효과 없음, 행
  제거)로 돌아온다 — 클릭은 무해하고 verify를 재실행하거나 waive하지 않는다.
- `[세션에서 해결]`은 PR 대기 행 하나에만 서고 재료는 셋에서 넷(머지 후 정리
  실패·needs_human·폐기 실패·**holding**)이 된다. 그 세션은 계약 `pre_merge_hold`
  의 `resolve_in_session` 출구이며 프롬프트는 보류형(수정 push → 자동 재검증·머지)
  이고 승계 세션 안내 한 줄을 싣는다 — 안내는 판정 근거가 아니다(ADR
  dotfiles/0064).
- 투영은 `phase === 'holding'`일 때만 `hold`를 싣고, 같은 head에서 terminal로
  종단하면 terminal 증거가 우선한다. `receipt_baseline` 불변식·위조 3종 terminal
  판정·`[머지]` 클릭 의미(ADR 0040)는 바꾸지 않는다. 알림 라벨 「머지 전 검증
  실패」는 dotfiles 계약 `failure_classes.pre_merge_hold.notify_label`의 바이트
  복사다(ADR 0012).

## Consequences

- 검토한 대안: (1) verify 실패를 terminal needs_human으로 종단 — 즉시 보이지만
  재클릭이 필요하고 계약 클래스를 재정의해야 해 기각. (2) poller가 별도 보류 맵을
  두는 안 — 상태 주인이 둘이 되고 관측기에 부작용이 생겨 기각. (3) 위조 판정의
  값 기반 완화 — 사람 세션과 무인 세션의 쓰기를 값만으로 가를 수 없어 ADR
  dotfiles/0064가 기각한 통로라 기각.
- 되돌리기 어려움: phase 어휘·투영 필드·계약 출구·알림 클래스가 한 판정에 묶인다.
  맥락 없이 놀라움: terminal 실패 행에만 있던 `[세션에서 해결]`이 비종단 행에
  서고, 그 행은 사람이 누르지 않아도 자동으로 풀린다.
- 직접 연 세션의 `impl_entry` 재발 방지는 계약·훅(dotfiles-wism)이 소유하고
  beads-ui는 위조 판정을 완화하지 않는다.
- Monitor 탭 PR 대기 행은 `completion_intents`를 싣지 않아 `holding`도 보이지
  않는다 — 관찰로 남긴다.
