---
id: 17
title: awaiting_user를 남기고 정상 종료한 세션 결말은 parked이며 자동 재디스패치하지 않는다
status: accepted
date: 2026-08-28
summary: '성공 종료 + 미resolved + PR 없음 + awaiting_user는 parked다. 재개는 사용자 클릭 또는 awaiting_user 소거 전이 관측뿐이다'
spec: docs/superpowers/specs/2026-08-28-worker-failure-tiers-queue-hold-design.md
bead: UI-5ym8
---

# awaiting_user를 남기고 정상 종료한 세션 결말은 parked이며 자동 재디스패치하지 않는다

## Context

Worker는 세션이 exit 0으로 끝나면 서버가 PR을 관측해 `resolved`+`pr_url` 외의 결말을
전부 `verify_failed:pr_missing`으로 실패 처리했다. 그러나 workflow 계약상 세션은
impl gate REVISE 처리 대기나 codex 환경 장애 같은 사용자 결정 사안을 만나면 Bead에
`awaiting_user`를 기록하고 **정상 종료**한다. UI-7tme는 이 결말이 세 번 연속
실패로 분류돼 큐가 멈추고, 다시 켜면 5분짜리 빈 세션이 같은 자리에서 반복됐다.

`awaiting_user`는 dotfiles 계약이 소유하는 키로 "사용자 결정 대기"라는 의미가
고정돼 있다. Worker가 그 키를 무시하고 자동 재시도하면 계약 의미가 Worker 쪽에서
깨진다.

## Decision

verdict `success` ∧ bead status ∉ {resolved, closed} ∧ `pr_url` 없음 ∧
`awaiting_user` 키 존재 — 네 조건 전부일 때 attempt는 `status='parked'`,
`cause='session_parked'`이며 `cause_detail={summary, awaiting_user, bead_status}`와
park 시점 사실 `awaiting_user_present=true`를 영속한다. 실패가 아니므로 큐는
계속 가고, **자동 재디스패치는 하지 않는다**.

재개 경로는 둘뿐이다.

1. 타일 `재시도`(ws `worker-parked-retry`) — 그 attempt가 bead의 마지막
   implementation attempt일 때만.
2. bd 변경 구독에서 그 bead의 `awaiting_user`가 **있던 것이 없어진 전이**를 관측한
   경우. 처음부터 키가 없던 bead는 이 규칙에 들지 않고(`session_ended_unresolved`로
   분류), 같은 전이는 attempt당 한 번만 발화한다(`parked_resumed_at`).

두 경로 모두 새 attempt로 디스패치하고 `parked` 레코드는 보존한다.
`awaiting_user` 없이 같은 조건으로 끝난 세션은 `session_ended_unresolved`이며
환경 패턴 일치 여부로 `env`/`individual`이 갈린다.

## Consequences

- "성공으로 끝났는데 PR도 없고 실패도 아님"인 타일이 생긴다. 타일은 `세션 대기`
  뱃지와 세션 마지막 보고 첫 줄(`cause_detail.summary`)로 그 상태를 설명한다.
- 환경이 회복돼도 사용자가 결정을 내리거나 키를 지우기 전에는 세션이 다시 뜨지
  않는다. 이는 빈 세션 반복(UI-7tme 3회)을 없애는 대가로 자동 재개 편의를 포기한
  것이다.
- `verify_failed:pr_missing` 토큰은 폐기된다. 이 결말의 하위 원인은
  `session_parked` / `session_ended_unresolved`로 구분해 표시한다.
