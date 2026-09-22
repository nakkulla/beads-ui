---
id: UI-6pif
title: beads-ui가 띄운 대화형 세션은 큐 레코드로 투영되고 생존·종료는 reconcile이 소유한다
status: accepted
date: 2026-09-22
summary: "beads-ui가 띄운 대화형 세션은 큐 레코드로 투영되고 생존·종료는 reconcile이 소유하며, fork 원천은 attempt 세션 → session_ref → fresh 순이고, Bead 정산 write 뒤 idle pane을 닫아 브리지가 Discord 스레드를 아카이브하게 한다"
spec: docs/superpowers/specs/2026-09-22-interactive-session-projection-fork-source-and-exit-design.md
bead: UI-6pif
---

# beads-ui가 띄운 대화형 세션은 큐 레코드로 투영되고 생존·종료는 reconcile이 소유한다

## Context

`[세션에서 해결]`과 파킹·복구 문의는 tmux 창에 사람의 대화형 세션을 띄운다.
2026-09-22 UI-7nhi 실측에서 세 가지가 드러났다. 첫째, `resolve-session.js`의
fork 원천이 bd `session_ref`뿐이어서 Worker attempt Bead는 항상 새 세션이 됐다
— dotfiles 계약상 Worker 러너 세션은 `session_ref`를 쓰지 않고 attempt 기록이
그 세션을 갖는다. 둘째, 기동 응답은 토스트 하나로 끝나고 큐 스냅샷·타임라인·
transcript 서랍 어디에도 세션이 없었다. 셋째, 종료가 없어 Bead가 머지·close된
뒤에도 tmux 창과 Discord 스레드가 남았고, 브리지는 SessionEnd 훅의
`session_end` 이벤트로만 스레드를 아카이브한다.

대안은 셋이었다. (A) 큐 레코드 + reconcile 소유 생존. (B) 무상태 — 매
decorate마다 tmux 마커를 읽어 파생. (C) 대화형 세션을 Worker attempt로 등록.

## Decision

- beads-ui가 띄운 대화형 세션(해결·문의, claude·codex)은 큐 스냅샷의 durable
  레코드 `interactive_sessions[<bead_id>:<kind>]`로 투영된다. 기동 직후 런처가
  레코드를 쓰고, 클라이언트 CAS op는 없다(모두 서버 소유 write).
- 생존·복구·종료는 scheduler reconcile이 소유한다(ADR 0021과 같은 소유). pane
  마커·pane id로 살아 있음을 판정하고, 레코드 없는 마커 pane은 복구 레코드로
  재구성하며, tmux에 닿지 못하면 그 pass는 아무것도 판정하지 않는다.
- fork 원천은 한 함수(`qualifyInteractiveForkSource`)가 정하고 순서는 최신
  implementation attempt의 러너 세션(transcript가 local일 때) → bd `session_ref`
  마지막 항목 → fresh다. fresh의 provider는 기록된 provider를 보존한다(ADR 0046).
- 정산은 정적 술어가 아니라 전이 시점의 write다: 머지 뒤 `done` 이동, 일반 폐기
  완료, 이슈 스냅샷의 `closed` 관측. 정산된 세션은 idle일 때만 닫는다 — claude는
  `/exit` 주입 뒤 90초 유예, codex는 `kill-window`; 턴 중·대화상자 대기는 미루되
  30분 상한 뒤 `kill-window`. 스레드 아카이브는 브리지 소유다(`/exit`는
  SessionEnd, 강제 종료는 dead-pane 스윕).
- 끝난 세션의 레코드는 지우고 타임라인 `interactive_session` 이벤트만 남긴다
  (ADR 0027).

## Consequences

- 세 소비자(큐 스키마·타임라인 kind·계약 문구와 브리지 레코드 형식)가 함께
  바뀌어 되돌리기 어렵다. 맥락 없이 보면 「닫힌 Bead의 세션이 저절로 끝난다」와
  「Worker attempt 세션을 사람 세션이 fork한다」가 놀랍다.
- (B)를 버렸다: fanout마다 `tmux list-panes`를 돌려야 하고(ADR 0043 위반),
  세션 id·fork 여부·정산 시각처럼 tmux에 없는 사실을 실을 곳이 없다.
- (C)를 버렸다: 슬롯·admission·usage 집계·정산 규칙이 전부 딸려오고 ADR 0005/
  0022의 「자동 수리 세션이 아니라 사람의 세션」 경계가 흐려진다.
- `/exit` 주입은 입력창 조작이다. 초안이나 대화상자 위에 얹지 않도록 idle 술어
  (`@agent_running`·`@agent_attention`·프롬프트 줄)와 30분 상한으로 위험을
  감수한다.
- 클라이언트는 이 레코드로 슬롯 1 정체성 뱃지·Discord 링크·`세션 닫는 중`
  라벨을 그리고, transcript 서랍 인가가 `session_ref` 외에 이 레코드로도
  통과한다.
