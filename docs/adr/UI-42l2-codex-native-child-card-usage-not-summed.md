---
id: UI-42l2
title: Codex native child의 개별 사용량과 환산 비용은 카드에 표시하고 부모 합계에서는 제외한다
status: accepted
date: 2026-09-11
summary: "Codex native child의 개별 사용량과 환산 비용은 카드·상세에 표시하고 중복 여부가 미확인된 값은 부모 합계에 더하지 않는다"
supersedes: [47]
spec: docs/superpowers/specs/2026-09-11-session-card-delegation-usage-cost-parity-design.md
bead: UI-42l2
---

# Codex native child의 개별 사용량과 환산 비용은 카드에 표시하고 부모 합계에서는 제외한다

## Context

ADR 0047은 Codex native child를 내부 rollout에서 관측하고 부모와 중복 여부가
확인되지 않은 사용량을 합계에서 제외했다. 다만 child 사용량의 표시 장소를 상세
행으로 한정해, 실행 카드는 현재 위임의 모델·토큰·비용을 설명하지 못했다.

## Decision

- attempt의 선택적 `codex_children`은 UI 소유 관측 기록이며 workflow metadata,
  실행 영수증, gate 판정에 쓰지 않는다. 과거 attempt의 필드 부재는 빈 관측이다.
- 원천은 해당 attempt의 root rollout과 `parent_thread_id` 연결이 root까지 확인된
  child rollout뿐이다. exec JSONL이나 hook으로 관계·usage를 추정하지 않고 관계없는
  글로벌 transcript를 수집하지 않는다.
- `codex_children`은 검증된 부모 연결, thread별 한 행, 누적값 교체, 미관측값 보존
  규칙을 계속 따른다.
- child의 토큰과 현재 모델 단가로 계산한 비용은 상세 행과 카드의 해당 위임
  표시에서 제공한다.
- 부모와 child 사용량의 중복 여부가 입증되지 않은 동안 native child 값은 attempt
  총합, headline, 워크스페이스 비용 합계에 더하지 않는다.
- spawn 도구 완료는 child 완료가 아니며 성공·실패·중단은 관측된 수명 증거로만
  구분한다.

## Consequences

child 비용은 보이지만 부모 합계와 별개이므로 카드가 그 범위를 함께 설명해야 한다.
완전한 총비용 대신 검증된 개별 관측과 중복 방지를 택한다. 나중에 합산하려면
provider와 버전별 포함 관계를 입증하고 이 결정을 다시 대체해야 한다.
