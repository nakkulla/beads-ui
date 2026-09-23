---
id: UI-u6ud-3
title: Worker 머지 큐와 머지 자격
status: accepted
date: 2026-09-23
summary: "PR 랜딩 작업의 머지는 Worker의 단일 순차 큐만 실행하고 완료는 MERGED 관측이다; 머지 자격은 저장소 안의 입력(PR·base·head identity, mergeability, 리뷰·실행 영수증, [verify])만 보고 GitHub checks는 읽지 않는다; auto_merge와 auto_advance는 독립 스위치이고 자동화 클릭만 둘을 원자적으로 맞춘다; 30분은 실패가 아니라 queue-yield deadline이고 충돌 해소 fence는 수동 권한 면제·슬롯 여유로 판정한다"
supersedes: [6, 3, 11, 15]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# Worker 머지 큐와 머지 자격

## Context

- `0006`: PR 랜딩 작업의 머지는 Worker의 단일 순차 드라이버만 실행하고 완료는 MERGED 관측이다.
- `0003`: 머지 자격은 저장소 안의 입력만 보고 GitHub checks·Actions는 읽지 않는다.
- `0011`: `auto_merge`와 `auto_advance`는 독립 스위치이고 자동화 클릭만 둘을 원자적으로 맞춘다.
- `0015`: 30분은 queue-yield deadline이고 충돌 해소 fence는 수동 권한 면제·슬롯 여유로 판정한다.

## Decision

- PR로 랜딩하는 작업에서 세션은 PR 배달까지만 한다. 워크스페이스의 모든 머지는 하나의 순차 드라이버가 실행하고 드라이버만이 실제 머지 호출의 단일 caller다. `[머지]` 클릭은 큐에 넣을 뿐이고, `auto_merge`가 켜져도 드라이버를 우회하지 않고 같은 자격 판정과 같은 큐를 쓴다.
- 리뷰를 마친 `quick_fix`가 base ref를 직접 push하는 lane은 별개의 계약 경로이며 이 결정의 대상이 아니다.
- 완료는 세션 보고가 아니라 MERGED 관측으로 판정한다. squash 명령이 0으로 끝나도 merged로 관측되지 않으면 항목은 큐 머리를 유지하고 다시 관측된다.
- 세션이 직접 `gh pr merge`를 부르는 것은 허용하지 않는다.
- 머지 자격 판정의 입력은 저장소 안에서 관측된다: fresh PR/base/head identity, clean mergeability, current workflow review 영수증, 실행 영수증 backing(`receipt_state`), `repo-ops/config.toml`의 `[verify]` 영수증. checks·Actions·status rollup은 읽지 않는다.
- `.github/workflows/`는 비어 있고 워크플로가 다시 생기면 테스트가 실패한다.
- `[verify]`는 base에 PR head를 squash-merge한 일회용 candidate 체크아웃에서 돌며 Pre-Handoff Validation을 대체하지 않는 별개의 안전망이다.
- `auto_advance`와 `auto_merge`는 독립 필드이고 한쪽이 다른 쪽의 전제가 아니며 마스터 스위치로 접지 않는다.
- `자동화` 버튼을 명시적으로 켜거나 끄는 클릭만 두 플래그를 같은 값으로 맞추는 단일 원자 mutation을 쓰고, 그 뒤 `자동 머지`는 독립 토글이다.
- 머지 큐 항목의 authority(사용자가 직접 등록한 항목의 continuation)는 전역 `auto_merge` 토글과 별개의 축이다.
- 30분은 queue-yield deadline이다. 그 시점에 해소 세션은 머지 큐의 턴만 양보하고 세션도 큐 항목도 종료되지 않는다. deadline은 절대 시각이라 재시작이 시계를 되감지 않고, 늦게 끝난 해소는 다음 턴에 다시 게이트를 통과한다.
- 실패 예산은 시간이 아니라 횟수(해소 라운드 상한과 큐가 유발한 재충돌 상한)와 실패한 head SHA에 핀된 durable exclusion이 맡는다.
- 충돌 해소 fence는 수동 권한으로 등록된 항목을 면제하고 자동 항목만 워크스페이스 실행 슬롯 여유로 판정한다. 슬롯 계산에서 subject Bead는 빼되 큐 root는 면제하지 않는다. 슬롯이 없어 보류된 상태는 화면의 보류 사유로 투영한다.

## Consequences

- 머지 큐의 소유·자격 입력·스위치·시간 의미가 한 행으로 읽힌다. 되돌리려면 merge-queue 드라이버·admission·자동화 mutation·fence·`.github/workflows` 부재 테스트가 함께 움직인다.
- 흡수한 네 ADR의 조항은 전부 승계했고 폐기한 조항은 없다. `0006`의 "세션의 직접 머지는 실행 가드가 kill로 차단한다"는 현행 가드 결정(`UI-a5l2`)이 강제 방식을 소유하므로 여기서는 "허용하지 않는다"로만 재진술한다.
