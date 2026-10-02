---
id: UI-6mpl
title: Worker 머지 큐·머지 자격과 독립 자동화 스위치
status: accepted
date: 2026-10-02
summary: "PR 랜딩 작업의 머지는 Worker의 단일 순차 큐만 실행하고 완료는 MERGED 관측이다; 머지 자격은 저장소 안의 입력(PR·base·head identity, mergeability, 리뷰·실행 영수증, [verify])만 보고 GitHub checks는 읽지 않는다; auto_merge와 auto_advance는 독립 스위치이고 어떤 클릭도 둘을 함께 바꾸지 않는다; 30분은 실패가 아니라 queue-yield deadline이고 충돌 해소 fence는 수동 권한 면제·슬롯 여유로 판정한다"
supersedes: ["UI-u6ud-3"]
spec: docs/superpowers/specs/2026-10-01-automation-auto-merge-toggle-split-design.md
bead: UI-6mpl
---

# Worker 머지 큐·머지 자격과 독립 자동화 스위치

## Context

- `UI-u6ud-3`(Worker 머지 큐와 머지 자격)을 대체한다. 그 결정의 "`자동화` 버튼을 켜거나 끄는 클릭만 두 플래그를 같은 값으로 맞추는 단일 원자 mutation" 조항 하나를 뒤집고, 단일 순차 큐·저장소 안 자격 입력·queue-yield deadline·fence 조항은 그대로 승계한다.
- 뒤집는 이유: UI-u6ud-3이 흡수한 `0011`은 "단일 자동화 스위치"를 되돌릴 수 없는 머지를 되돌릴 수 있는 자동 진행과 한 클릭에 묶는다는 이유로 기각했는데, 남은 예외(자동화 클릭이 `auto_merge`도 켠다)가 그 논리와 어긋났다. 사용자는 머지하지 않고 보류하려는 PR이 있는 상태에서 자동 진행만 켜고 싶었고(2026-10-01), 켠 직후 `자동 머지`를 끄는 우회는 서버가 PR 관측·등록을 비동기로 시작해 경합이 남았다.
- 모니터 전체 스위치 `monitor-auto-toggle`은 UI-yu2o가 이미 지웠으므로 이 결정이 다룰 다중 저장소 스위치는 없다.
- UI-u6ud-3이 흡수한 네 ADR(`0006`·`0003`·`0011`·`0015`)의 나머지 조항은 아래 결정에 그대로 남는다.

## Decision

- PR로 랜딩하는 작업에서 세션은 PR 배달까지만 한다. 워크스페이스의 모든 머지는 하나의 순차 드라이버가 실행하고 드라이버만이 실제 머지 호출의 단일 caller다. `[머지]` 클릭은 큐에 넣을 뿐이고, `auto_merge`가 켜져도 드라이버를 우회하지 않고 같은 자격 판정과 같은 큐를 쓴다.
- 리뷰를 마친 `quick_fix`가 base ref를 직접 push하는 lane은 별개의 계약 경로이며 이 결정의 대상이 아니다.
- 완료는 세션 보고가 아니라 MERGED 관측으로 판정한다. squash 명령이 0으로 끝나도 merged로 관측되지 않으면 항목은 큐 머리를 유지하고 다시 관측된다.
- 세션이 직접 `gh pr merge`를 부르는 것은 허용하지 않는다.
- 머지 자격 판정의 입력은 저장소 안에서 관측된다: fresh PR/base/head identity, clean mergeability, current workflow review 영수증, 실행 영수증 backing(`receipt_state`), `repo-ops/config.toml`의 `[verify]` 영수증. checks·Actions·status rollup은 읽지 않는다.
- `.github/workflows/`는 비어 있고 워크플로가 다시 생기면 테스트가 실패한다.
- `[verify]`는 base에 PR head를 squash-merge한 일회용 candidate 체크아웃에서 돌며 Pre-Handoff Validation을 대체하지 않는 별개의 안전망이다.
- `auto_advance`와 `auto_merge`는 독립 필드이고 한쪽이 다른 쪽의 전제가 아니며 마스터 스위치로 접지 않는다.
- `자동화` 버튼(`worker-automation-toggle`)은 켜기·끄기 모두 `auto_advance`만 바꾸고, `자동 머지` 버튼(`worker-merge-auto-toggle`)만 `auto_merge`를 바꾼다. 어떤 클릭도 두 플래그를 함께 바꾸지 않는다. 자동화 켜기의 부수효과는 dispatch tick 하나이고 PR 관측·머지 등록을 시작하지 않으며, 자동화 끄기는 머지 대기열을 건드리지 않는다. 여러 저장소의 자동 머지를 한 클릭으로 켜는 경로는 두지 않는다.
- 머지 큐 항목의 authority(사용자가 직접 등록한 항목의 continuation)는 전역 `auto_merge` 토글과 별개의 축이다.
- 30분은 queue-yield deadline이다. 그 시점에 해소 세션은 머지 큐의 턴만 양보하고 세션도 큐 항목도 종료되지 않는다. deadline은 절대 시각이라 재시작이 시계를 되감지 않고, 늦게 끝난 해소는 다음 턴에 다시 게이트를 통과한다.
- 실패 예산은 시간이 아니라 횟수(해소 라운드 상한과 큐가 유발한 재충돌 상한)와 실패한 head SHA에 핀된 durable exclusion이 맡는다.
- 충돌 해소 fence는 수동 권한으로 등록된 항목을 면제하고 자동 항목만 워크스페이스 실행 슬롯 여유로 판정한다. 슬롯 계산에서 subject Bead는 빼되 큐 root는 면제하지 않는다. 슬롯이 없어 보류된 상태는 화면의 보류 사유로 투영한다.

## Consequences

- 머지 권한은 `자동 머지` 한 곳에서만 켜지고, 한 클릭으로 둘 다 켜던 편의는 사라진다. 머지를 멈추는 길은 `자동 머지` 끄기(자동 등록된 대기 항목만 비우고 활성 항목·해소 journal·수동 항목은 남긴다)와 항목 `[취소]`다.
- 이미 저장된 `auto_merge` 값은 옮기지 않는다. 과거 `자동화` 클릭으로 켜진 워크스페이스는 사용자가 `자동 머지`를 끌 때까지 켜진 채 남는다.
- WS op 이름과 payload는 그대로다 — `worker-automation-toggle`은 의미만 `worker-queue-toggle`과 같아졌다.
- 되돌리려면 queue-store의 자동화 mutation(결합 mutation `toggleAutomation`은 지웠다), `worker-automation-toggle` 핸들러, `app/protocol.md`, `server/worker/queue-store.test.js`·`server/ws.worker-queue.test.js`가 함께 움직인다. 승계 조항은 UI-u6ud-3과 같은 소비자(merge-queue 드라이버·admission·fence·`.github/workflows` 부재 테스트)를 가진다.
- 폐기: UI-u6ud-3의 "`자동화` 버튼을 명시적으로 켜거나 끄는 클릭만 두 플래그를 같은 값으로 맞추는 단일 원자 mutation을 쓰고, 그 뒤 `자동 머지`는 독립 토글이다".
