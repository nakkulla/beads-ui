---
id: 27
title: Worker 이력의 SoT는 bead별 events.jsonl 타임라인이고 queue.json은 상태 전용이다
status: accepted
date: 2026-08-28
summary: 'Worker의 실행·실패 이력은 bead별 append-only 타임라인이 소유하고, 상태 파일은 진행 중·미처리 것만 담는다.'
spec: docs/superpowers/specs/2026-08-28-worker-record-timeline-retention-design.md
bead: UI-8wpb
---

# Worker 이력의 SoT는 bead별 events.jsonl 타임라인이고 queue.json은 상태 전용이다

## Context

이 ADR은 2026-08-28에 내려진 결정을 뒤늦게 기록한 것이다. 당시 `queue.json`은
1.8MB까지 커져 있었고, 모든 과거 attempt의 `cause`·`cause_detail`·`usage`를
안은 채 변경할 때마다 파일 전체를 다시 썼다. 이 파일은 유일하게 계속 커지는
파일인 동시에 실패 이력의 유일한 SoT였다.

그럼에도 한 bead의 이력을 읽으려면 `queue.json`, 세션 원문 로그, 별도 상태를
세 곳에서 이어 붙여야 했다. 실패 타일에는 사용자가 곧바로 읽을 수 있는 “무엇이
실패했는가” 한 줄도 없었다. 상태 저장과 사람용 이력이 한 파일에 섞였지만, 어느
한쪽의 요구도 제대로 만족하지 못한 셈이다.

Airflow, GitHub Actions, Temporal, Kubernetes, Sentry의 관행을 비교했을 때 공통점은
세 가지였다. 시도별 원문 파일을 두고, 짧은 사람용 타임라인을 기계 원문과 분리하며,
원문에는 보존 정책을 적용한다. 이 구조를 로컬 워크스페이스 안에서 유지하면서
상태 파일의 무한 증가를 끊을 저장 경계가 필요했다.

## Decision

Worker의 실행·실패 이력 SoT는 bead마다 하나씩 두는 append-only `events.jsonl`
타임라인이다. 쓰기는 Worker 서버 프로세스 하나가 소유한다. 같은 사실을 다시
기록해도 중복되지 않도록 각 이벤트는 생산자가 안정적으로 구성한 `event_id`를
가지며, 읽는 쪽은 그 ID로 멱등 처리한다.

`queue.json`은 살아 있는 attempt와 아직 처리되지 않은 상태만 보유한다. 처리가
끝난 terminal attempt는 terminal 이벤트가 기록된 뒤 bead 디렉터리의 attempt
레코드로 이관한다. 따라서 상태 파일에서 과거 attempt가 보이지 않는 것은 정상이며,
이력의 부재를 뜻하지 않는다.

각 실패에서는 한 줄짜리 `summary`를 한 번 추출해 타임라인 이벤트와 attempt
레코드 양쪽에 싣는다. 세션 원문 로그도 bead 디렉터리로 옮겨 보존 정책의 적용을
받는다. 닫힌 bead의 원문 로그는 정해진 시점에 압축·삭제할 수 있지만,
`events.jsonl` 타임라인은 영구 보존한다.

## Considered Options

- **`queue.json`을 유일한 이력 SoT로 유지한다.** 구현은 익숙하지만 이력이 늘수록
  매 변경의 전체 파일 재작성 비용도 계속 증가한다. 상태와 이력의 수명이 달라지는
  문제도 해소하지 못해 기각했다.
- **이력을 외부 DB로 옮긴다.** 조회 기능은 강해지지만 ADR 0008의 bd CLI shell-out
  데이터 계층 옆에 두 번째 저장 계층이 생긴다. 워크스페이스 디렉터리를 복사하면
  상태도 함께 따라간다는 운영 특성도 잃으므로 기각했다.

## Consequences

- 한 bead의 사람용 이력은 한 타임라인에서 읽히고, 큰 원문 로그와 상태 파일은 각자
  다른 수명과 보존 규칙을 가질 수 있다. `queue.json`의 쓰기 비용은 과거 전체
  이력과 함께 계속 자라지 않는다.
- 단일 writer, 안정적인 `event_id`, terminal 이벤트와 attempt 이관의 순서 보장은
  데이터가 둘로 갈린 대가로 지켜야 하는 영속 불변식이 된다.
- 배제되는 것: 과거 attempt를 찾기 위해 `queue.json`을 여는 읽기 경로는 없다.
  그 파일에 오래된 레코드가 없는 것은 삭제된 이력이 아니라 상태 전용화의 정상
  결과다.
- 이 결정을 되돌리려면 bead 디렉터리의 이력을 다시 상태 파일로 합치는 역마이그레이션과
  타임라인을 읽는 소비자 전체의 재작성이 필요하다.
