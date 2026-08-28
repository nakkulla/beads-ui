---
id: 3
title: 머지 자격 판정에서 GitHub checks·Actions를 입력에서 제거
status: accepted
date: 2026-08-13
summary: '머지 자격은 저장소 안에서 관측되는 입력(PR/base/head identity·mergeability·리뷰 영수증·실행 영수증·[verify])만으로 판정하고 GitHub checks는 보지 않는다'
spec: docs/superpowers/specs/2026-08-13-worker-repo-operation-auto-repair-design.md
bead: UI-vobi
---

# 머지 자격 판정에서 GitHub checks·Actions를 입력에서 제거

## Context

이 저장소에는 CI 워크플로가 없고 branch protection의 required check도 0개다.
그런데 머지 게이트가 checks를 입력으로 두면, 빈 checks 목록을 "모두 통과"로 읽는
특례가 필요해진다. 그 특례는 워크플로가 하나라도 추가되는 순간 의미가 뒤집히고,
반대로 워크플로가 삭제되면 조용히 게이트를 무력화한다 — 즉 판정의 안전성이
저장소 바깥의 설정 상태에 매달린다.

동시에 "리뷰는 끝났지만 base가 움직인 조합"을 기계가 확인할 자리는 여전히
필요했다. 그 자리를 GitHub이 아니라 저장소 자신이 선언하는 검증 스크립트로
가져오는 것이 이 결정의 다른 반쪽이다.

## Decision

머지 자격 판정의 입력은 전부 저장소 안에서 관측된다: fresh PR/base/head
identity, clean mergeability, current workflow review 영수증, 실행 영수증
backing(`receipt_state`), 그리고 `repo-ops/config.toml`의 `[verify]` 영수증.
GitHub에서 오는 입력은 하나도 없다 — checks·Actions·status rollup은 읽지 않는다.
`.github/workflows/`는 비어 있고, 워크플로가 다시 생기면 테스트가 실패한다.

`[verify]`는 base에 PR head를 squash-merge한 일회용 candidate 체크아웃에서 돌기
때문에, 머지 직후의 실제 조합을 머지 직전에 확인한다. 이것은 Pre-Handoff
Validation을 대체하지 않는 별개의 안전망이다.

## Considered Options

- **GitHub Actions를 다시 도입해 checks를 게이트 입력으로 쓴다.** 명시적으로
  기각했다. 워크플로가 생기면 아무도 읽지 않는 신호가 만들어지고, 제거했던 "빈
  checks는 통과" 특례가 되살아난다. 판정 입력을 저장소 밖 설정에 다시 묶는
  대가가 얻는 것보다 크다.
- **검증 없이 리뷰 영수증만으로 머지한다.** ancestry 결속(ADR 0004)이 통과시키는
  "리뷰된 델타 + 움직인 base" 조합을 아무도 확인하지 않게 되므로 기각했다.

## Consequences

- 쉬워지는 것: `gh pr checks`를 기다리거나 폴링할 이유가 없다. 판정이 네 입력의
  순수 함수라 재현 가능하고, 관측 실패는 fail-closed로 일관되게 처리된다.
- 어려워지는 것: 저장소 밖에서 도는 검증(보안 스캔, 매트릭스 빌드)을 게이트에
  붙이려면 `[verify]` 스크립트 안으로 들여와야 한다.
- 배제되는 것: checks 기반 머지 게이팅, required check를 통한 branch protection
  강제, 그리고 워크플로 유무에 따라 의미가 달라지는 판정.
