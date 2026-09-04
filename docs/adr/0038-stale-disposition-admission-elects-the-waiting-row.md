---
id: 38
title: 처분 대기 admission이 화면 대표를 정한다 — 대기 행이 held 타일·점유 ghost를 이긴다
status: accepted
date: 2026-09-04
summary: "처분 대기 admission이 선 bead는 held 타일·점유 ghost가 아니라 대기 행이 대표하고 stale-work 처분 조작은 대기 행에만 산다"
spec: docs/superpowers/specs/2026-09-04-waiting-tile-stale-disposition-reach-design.md
bead: UI-yue8
---

# 처분 대기 admission이 화면 대표를 정한다 — 대기 행이 held 타일·점유 ghost를 이긴다

## Context

Worker·Monitor 레인에서 한 bead가 어느 자리에 그려지는지는 지금까지 두 가지가
정했다. attempt의 생사 — 터미널 attempt는 실행 중 그리드의 held 타일이 되고 — 그리고
직렬 레인 점유 — 점유를 놓지 않은 lineage는 그 레인의 ghost 행이 된다. 두 규칙 모두
`claimed` 집합을 잡아 같은 bead가 대기 행으로 다시 그려지는 것을 막는다. "한 bead는
한 자리"는 이 보드의 오래된 불변식이고, 그것을 조건 검사가 아니라 구조로 지켜 온 것이
`claimed`다.

그런데 `worktree_stale_work` admission의 처분 카드 — `[기존 작업 이어가기]` ·
`[백업 후 새로]` · `[다시 확인]` — 는 **대기 행에만** 붙는다. 그래서 위 두 규칙 중
하나라도 걸리면 처분이 필요한 bead가 조작 없는 자리에 갇힌다. 실운영에서 두 경로가
모두 관측됐다.

- prostate `PROSTATE-0yz`(2026-08-30): 선행 대기(`waiting`)로 정산된 뒤 blocker가
  닫혔고 재디스패치 패스가 `worktree_stale_work`로 거부했다. held `waiting` 타일이
  섰고 그 타일의 조작은 `[폐기]` 하나뿐이라 `can_continue: true`인 처분에 도달할 수
  없었다. 선행 대기 타일은 설계상 출구가 없다 — "blocker가 닫히는 것이 이 타일을
  옮긴다"는 전제가 재디스패치 성공만 가정했다.
- dotfiles `dotfiles-thqc`(2026-09-04): systemic hold의 `재개` 클릭이 마지막 `failed`
  attempt에 `dismissed_at`을 찍어 실패 타일을 지웠는데, 그 직후 패스가 같은 admission
  으로 거부했다. `failed`는 레인을 놓는 상태가 아니라 점유는 유지됐고, 점유 bead는
  ghost 행(`실패 · 점유 유지`)으로만 그려진다. ghost 행에는 조작이 하나도 없다.

두 경로는 원인 연쇄가 다르지만 결말이 같다: 서버는 처분 권한을 이미 성립시켜 두었고
(`staleWorkAction`은 bead가 큐 또는 직렬 레인 entry에 있고 admission이
`worktree_stale_work`이며 `action_id`가 일치하면 받는다) 결함은 화면 투영에만
있었다.

## Decision

**사람의 처분을 기다리는 admission(`worktree_stale_work`)이 선 bead는 held 타일·점유
ghost 행이 아니라 대기 행이 대표하고, stale-work 처분 조작은 대기 행에만 산다.**

지금까지 화면 대표를 정한 것은 attempt의 생사와 레인 점유였다. 이 결정은 그 둘을
제치고 **admission**이 대표를 정하게 한다. 강등 판정은 처분 카드가 실제로 설 수 있는
조건과 같은 재료를 쓴다 — admission `reason`, `stale_work` 객체, 그리고 비어 있지 않은
`action_id` — 이므로 카드가 서지 못할 admission으로 타일을 지우는 일이 없다.

세 가지가 함께 성립한다.

- **강등은 "타일 또는 ghost 대신 행"이지 "행도"가 아니다.** 강등된 bead는 held 타일을
  만들지 않고 `claimed`에도 들어가지 않으므로, "한 bead는 한 자리"는 새 조건 검사가
  아니라 구조로 그대로 지켜진다.
- **점유 사실은 잃지 않는다.** 강등된 행의 슬롯 1 뱃지 맨 앞에 점유 뱃지(경로 2에서는
  `실패 · 점유 유지`)가 서고, 그 bead는 레인의 `occupants` 목록에서만 빠진다. 서버
  상태와 `dismissed_at`의 단조 계약은 건드리지 않는다 — 이 결정은 화면 대표만 바꾼다.
- **행이 없는 점유자는 강등하지 않는다.** entry가 아닌 점유자(PR 대기 등)는 대신 그릴
  행이 없으므로 현행 ghost 그대로다.

## Consequences

- 처분 카드가 사는 자리는 대기 행 하나로 유지된다. held 타일과 ghost 행에 같은 버튼을
  다는 것은 이 결정이 배제한다 — 카드 배치 문법 슬롯 표의 6번 foot 정정(UI-yue8)이
  같은 문장을 싣는다.
- Worker와 Monitor가 같은 `buildLanes`를 쓰므로(ADR 0014) 두 탭이 함께 바뀐다. Monitor는
  타일·ghost 대신 행을 그리지만 처분 카드는 얻지 않는다 — Monitor는 cross-repo 관측
  화면이고 처분은 Worker 탭이 소유한다는 기존 결정을 그대로 따른다.
- 되돌리기 비용이 실재한다. 되돌리면 처분 카드가 대기 행·held 타일·점유 ghost 세 자리에
  다시 살아야 하고, 조작 표면이 그만큼 흩어진다.
- 기각한 대안 둘. (1) 타일·ghost 행에 처분 카드를 추가 — 같은 결과를 얻지만 조작 표면이
  세 자리로 분산되고, 새 조작이 생길 때마다 세 곳을 함께 고쳐야 한다. (2) `재개`의
  `dismissed_at` 기록 시점을 옮기거나 admission 거부 관측 시 되돌리기 — `dismissed_at`의
  단조 계약("UI hide, 해제 아님")이 깨지고, 경로 1은 그것으로 해결되지 않아 별도 해법이
  여전히 필요하다.
- 코드만 읽는 사람에게는 의외다. "`waiting` attempt가 있는데 왜 대기 행인가"를 설명할
  근거가 투영 코드 안에는 없다 — 이 ADR과 승인 스펙 §5가 그 근거다.
