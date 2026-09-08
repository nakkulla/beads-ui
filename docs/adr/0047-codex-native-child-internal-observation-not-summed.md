---
id: 47
title: Codex native child는 검증된 내부 관측으로 표시하고 부모와의 중복이 미확인된 사용량은 합계에 더하지 않는다
status: accepted
date: 2026-09-08
summary: "Codex native child는 검증된 내부 관측으로 표시하고 부모와의 중복이 미확인된 사용량은 합계에 더하지 않는다"
spec: docs/superpowers/specs/2026-09-08-codex-orchestration-parity-design.md
bead: UI-mn5u
---

# Codex native child는 검증된 내부 관측으로 표시하고 부모와의 중복이 미확인된 사용량은 합계에 더하지 않는다

## Context

Codex CLI의 native 하위 에이전트(`spawn_agent`)는 `codex exec --json` stdout에
나타나지 않는다. UI-9xs2가 codex-cli 0.153.4로 실측한 결과, root↔child 연결은 child
rollout 파일의 `session_meta.parent_thread_id`로만 확인되고, child 사용량은 child
rollout의 `token_usage_record.thread_token_usage`에만 있다. root의 `turn.completed`
사용량은 child를 포함하지 않았다(57181 대 114343).

기존 위임 관측(`delegation_sessions`·`usage_legs`·외부 receipt)은 dotfiles producer
계약을 소비하는 external 스키마이고, 별도 monitor v2 작업이 그 의미를 소유한다.
여기에 Codex subagent 역할을 덧붙이면 계약을 beads-ui가 독자 확장하는 셈이 된다.

## Decision

- attempt에 선택적 `codex_children` 배열을 둔다. 이는 **UI 소유 관측 기록**이며
  workflow metadata·실행 영수증·gate 판정에 쓰지 않는다. 배열이 없는 과거 attempt는
  빈 관측으로 읽는다.
- 원천은 해당 attempt의 root rollout과 `parent_thread_id`로 root까지 연결이 확인된
  child rollout뿐이다. exec JSONL·hook만으로 관계나 usage를 추정하지 않으며, 글로벌
  세션 디렉터리나 관계없는 transcript를 수집하지 않는다.
- 동일 attempt·thread_id는 한 행이다. 누적 usage는 마지막 검증값으로 **교체**하며
  turn마다 더하지 않는다. spawn 도구 호출 완료는 child 완료가 아니고, 부모가
  끝났는데 종료 증거가 없는 child는 `interrupted`로 표시하되 성공을 합성하지 않는다.
  미관측 값은 null이며 0이나 추정값으로 채우지 않는다.
- child usage는 child 상세 행에만 표시하고 attempt 총합·headline·비용 합산에서
  제외한다. 외부 receipt validator와 external 스키마는 그대로 엄격하게 유지한다.

## Consequences

- 되돌리기 어렵다: 영속 attempt 레코드와 회계 의미가 정해지며, 나중에 합산하려면
  parent total이 child를 제외하고 자식끼리 중복이 없다는 버전별 증거와 별도 스펙
  수정이 필요하다.
- 맥락 없이는 놀랍다: 자식 행에 사용량이 보이는데 attempt 합계는 커지지 않는다.
  화면은 "전체 합계에 별도 가산하지 않음"을 설명한다.
- 실제 절충: 전체 비용의 완전한 합산 보장을 포기하고 정확한 관측과 중복 방지를
  택한다. 외부 schema 혼합이나 근거 없는 합산 대신 내부 관측 레코드를 따로 둔다.
- child의 failed/interrupted 종료와 depth 2 이상 spawn은 미관측 상태로 설계됐다.
