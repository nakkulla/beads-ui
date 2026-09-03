---
id: 25
title: issue-detail은 워크스페이스 스냅샷 세대에서 투영한다
status: accepted
date: 2026-09-03
summary: 'issue-detail은 워크스페이스 스냅샷 세대에서 투영하며 dependents·provenance는 세대의 간선 인덱스로 만들고 상세 전용 bd read는 없다'
spec: docs/superpowers/specs/2026-09-02-issue-detail-snapshot-projection-design.md
bead: UI-wbjx
---

# issue-detail은 워크스페이스 스냅샷 세대에서 투영한다

## Context

ADR 0008이 데이터 계층을 `bd` CLI shell-out으로 고정하고, 그 위에 워크스페이스
스냅샷 코디네이터가 세대당 read 2회(legacy fallback 3회)를 모든 구독자가 나눠 쓰는
구조를 세웠다. 목록 구독은 모두 그 세대에서 투영되지만 `issue-detail` 하나만
의도적으로 예외로 남아 있었다. 상세를 열 때마다 `bd show <id> --include-dependents
--json` 한 번, provenance 칩을 위해 `bd dep list <id> --json` 한 번, 프로세스 두 개를
새로 띄웠다. 상세가 열려 있는 동안 30초 폴링마다 같은 두 프로세스가 반복됐다.

예외의 근거는 상세만 쓰는 두 필드였다. `dependents`(역방향 간선)는 `bd list`가 주지
않고, `dependencies`도 `bd show`는 대상 이슈 전체를, `bd list`는 bare edge
`{issue_id, depends_on_id, type}`만 준다. 즉 상세를 스냅샷으로 옮기려면 그 두 필드를
세대 안에서 만들어 낼 수 있어야 했다.

기준 HEAD에서 실측한 결과 그 조건은 이미 갖춰져 있었다. 스냅샷의 `bd list --all`은
811건 전부에 `metadata`·`dependencies`를 싣고, `bd show`에만 있는 필드는
`schema_version` 하나이며 소비자가 없다. 상세 패널이 간선에서 읽는 것은
`id`·`dependency_type`·`title`·`status`뿐이다. 그리고 코디네이터는 이미 세대당 한 번
간선을 walk해 `blocks_out`/`blocks_in`을 만들고 있었다.

## Decision

`issue-detail`은 다른 모든 목록과 같은 워크스페이스 스냅샷 세대에서 투영한다.
상세 전용 `bd` read는 없다.

- `subscription-handlers`·`refresh`의 `workspace_snapshot` 분기를 없애고,
  `mapSubscriptionToBdArgs`의 `show` arm과 raw 상세 경로를 제거한다. raw 경로에
  `issue-detail`이 들어오면 `Unknown subscription type` badRequest다.
- 코디네이터의 간선 walk를 모든 type으로 확장해 역방향 인덱스
  `edges_in: Map<depends_on_id, Array<{ issue_id, type }>>`를 세대당 한 번 만든다.
  `blocks_in`과 같은 규칙으로 `id_index`가 아는 issue_id만 넣는다.
- 상세 투영은 `dependencies`(이 이슈의 bare edge)와 `dependents`(`edges_in`)를 같은
  compact 형태 `{ id, dependency_type, title, status, issue_type, priority,
  created_at, updated_at }`로 하이드레이션한다. 스냅샷에 없는 대상(외부 rig)은
  `{ id, dependency_type, title: '' }` 스텁이며, `dependents`는 `id` 오름차순으로
  정렬한다 — `deps_signature`가 배열 순서에 민감하기 때문이다.
- `from_id`(provenance)는 목록과 같은 `attachSnapshotProvenance`로 온다. 그 함수의
  embedded 모드 collector는 bare edge를 읽으므로 **하이드레이션보다 먼저** 실행한다.
  순서는 선택 → provenance 부착 → compact 하이드레이션 → enrich다.
- 스냅샷에 없는 id는 `{ code: 'not_found' }`다. 오늘 `bd show` 실패가 `bd_error`로
  가던 자리이며 클라이언트 표시는 같다.

## Consequences

상세 열기와 폴링 재조회의 상세 전용 프로세스가 2회에서 0회가 된다. 세대당 read
2회(legacy 3회)라는 ADR 0008의 수치는 그대로이고, 코디네이터가 새로 얻는 것은 순수
계산 인덱스 하나뿐이다. 새 데이터 계층은 없다.

대신 상세는 목록과 같은 세대를 본다 — `bd show`가 늘 최신을 읽던 자리에 한 세대의
신선도 차이가 생긴다. 이는 실제로는 차이가 아니다: UI 변경은
`triggerMutationRefreshOnce`가, 외부 `bd` 변경은 watcher가 세대를 만들므로 갱신
트리거가 같다. 대가로 얻는 것은 상세를 열 때마다 붙던 프로세스 2회와 그 반복이다.

`dependents`가 코디네이터 인덱스에서 오게 되므로, 되돌리려면 `bd show` arm과 raw
상세 경로를 되살리고 `edges_in` 소비자를 걷어내야 한다.

`workspace_snapshot:false` raw 경로 자체(목록 arm·`enrichIssuesProvenance`)는 옵션
계약과 그 테스트를 위해 남지만, 프로덕션 호출자는 없어진다.
