---
id: UI-u6ud
title: 데이터 계층과 스냅샷 투영
status: accepted
date: 2026-09-23
summary: "데이터 계층은 bd CLI shell-out(스냅샷 세대당 기본 2회 read, legacy 3회)이고 DB 직결·daemon·batch RPC는 없다; issue-detail을 포함한 모든 목록은 같은 워크스페이스 스냅샷 세대에서 투영하고 상세 전용 bd read는 없다; 워크스페이스·후보 투영은 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스는 title-cache 외에 띄우지 않는다; 구독별 store는 전체 issue push를 받아 내용 변경만 통지하고 registry가 구독 출처를 전달한다"
supersedes: [8, 25, 43, 44]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# 데이터 계층과 스냅샷 투영

## Context

- `0008`: 데이터 계층은 bd CLI shell-out이고 스냅샷 세대는 기본 2회 read(legacy 3회)이며 세대는 원자적이다.
- `0025`: issue-detail을 포함한 모든 목록은 같은 워크스페이스 스냅샷 세대에서 투영하고 상세 전용 bd read는 없다.
- `0043`: 워크스페이스·후보 투영은 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스는 title-cache 외에 없다.
- `0044`: 구독별 store는 revision 수신과 내용 변경 통지를 구분하고 registry는 변경을 낸 구독 출처를 전달한다.

## Decision

- 데이터 계층은 `bd` CLI를 자식 프로세스로 실행해 `--json` 출력을 읽는다. DB 직결·daemon·batch RPC는 없다.
- 한 세대의 워크스페이스 스냅샷은 `bd list --json --all`과 `bd ready --explain --json` 2회 read로 만들고, 의존성이 목록 payload에 없는 legacy 모드에서만 `bd dep list --json`을 더해 3회다.
- 세대는 원자적이다. 어느 단계든 프로토콜·검증 실패면 그 세대를 실패로 기록하고 백오프 후 다시 만들며 부분 결과를 섞지 않는다.
- `issue-detail`은 다른 모든 목록과 같은 스냅샷 세대에서 투영한다. 상세 전용 `bd` read·raw 상세 경로는 없고, raw 경로에 `issue-detail`이 오면 `Unknown subscription type` badRequest다.
- 코디네이터는 세대당 한 번 모든 type의 역방향 인덱스 `edges_in`을 만들며 `id_index`가 아는 issue_id만 넣는다.
- 상세 투영은 `dependencies`와 `dependents`를 같은 compact 형태로 하이드레이션하고, 스냅샷에 없는 대상은 `{ id, dependency_type, title: '' }` 스텁이며, `dependents`는 `id` 오름차순이다.
- 상세 투영 순서는 선택 → provenance 부착(`attachSnapshotProvenance`) → compact 하이드레이션 → enrich다.
- 스냅샷에 없는 id의 상세는 `{ code: 'not_found' }`다.
- 후보 투영도 워크스페이스 투영과 같은 비동기 준비 컨텍스트만 읽는다. `runnable-cache`의 한 번의 채우기는 그 스냅샷 세대로 `warmWorkflowProbes`를 한 번 기다리고 그 컨텍스트를 모든 행의 `enrichIssueWorkflow`에 명시 전달하며, 행마다 HEAD를 다시 읽지 않고 진행 중 채우기의 컨텍스트를 바꾸지 않는다.
- 준비 실패는 빈 미판정 컨텍스트로 대체하고 동기 `gitHead` 분기로 되돌아가는 fallback은 없다. 동기 자식 프로세스 예외는 `title-cache`뿐이다.
- 워크스페이스 문자열은 `path.resolve`로 한 번 정규화해 스냅샷 요청과 준비 단계에 같은 값을 준다. 같은 workspace·세대의 준비는 공유 in-flight Promise를 재사용하고, 불변 사실의 키·상한·동시성 상한, 미판정의 세대 한정, 캡처한 HEAD 기준 경로 변경 조회 규칙을 따른다.
- 준비 대상 행은 후보·세션 자격 판정이 이미 고른 행이다. 자격·라벨·차단 의존 판정을 준비 단계에서 복제하지 않는다.
- 테스트는 실제 스냅샷 형태의 `requestSnapshot` 주입으로 하고 테스트 전용 `runJson` 분기·가짜 세대 계층을 두지 않는다.
- `title-cache`의 동기 호출, bd 명령 의미, admission·머지 자격의 실행 직전 재확인은 이 결정이 바꾸지 않는 별도 책임이다.
- 구독별 store와 서버의 전체 issue push, 봉투 형태(`snapshot`·`upsert`·`delete`), revision 순서와 같거나 낮은 revision 무시, 재연결 시 새 store와 새 snapshot, 결정적 정렬과 같은 id의 객체 identity 유지를 따른다.
- store 리스너는 렌더링 내용이 바뀔 때만 한 번 호출된다. 더 새로운 숫자 `updated_at` 때문에 거절되는 upsert와 store에 없는 id의 delete는 revision 수신으로만 기록하고 정렬·통지하지 않는다. 같은 timestamp의 upsert는 적용한다.
- `updated_at`은 숫자 epoch ms이고 freshness의 정본은 revision이다. ISO 문자열 호환 확대, 깊은 동등성 비교, 동일 내용 snapshot 추정 생략은 하지 않는다.
- registry의 전역 리스너는 변경을 낸 subscription id를 받고, 개별 store 리스너는 인자 없는 알림으로 남는다. register/unregister는 초기 알림을 만들지 않는다.
- `createListSelectors`는 자신이 그리는 id 집합의 알림만 전달하고 UI 정렬 저장소 알림은 그대로 전달한다. 상세 패널은 현재 `detail:<id>` 구독의 알림만 읽는다.
- `snapshotFor`는 소비자 소유 배열을 돌려주고 selector는 그 배열을 다시 복사하지 않으며, 공유 배열 노출이나 별도 selector 캐시는 없다.

## Consequences

- 데이터 계층·상세 투영·후보 준비 컨텍스트·구독 통지가 한 행으로 읽힌다. 되돌리려면 서버 스냅샷 코디네이터·구독 registry·상세 투영·후보 캐시가 함께 움직인다.
- 흡수한 네 ADR의 조항은 전부 승계했고 폐기한 조항은 없다.
