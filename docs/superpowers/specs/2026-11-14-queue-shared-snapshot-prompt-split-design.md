---
scope:
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/record-retention.js
  - server/worker/attach.js
  - server/ws/worker-handlers.js
  - server/ws/snapshot-retention.js
---

# Worker 큐 읽기 비용 축소: 공유 읽기 전용 스냅샷·프롬프트 분리·배포 기록 보관 (UI-j5jj)

## 1. 배경과 측정

2026-11-14 공유 서버가 멈춘 사고(UI-j8r7)를 조사하다가, 멈춤과 별개로 평상시에도
서버가 무겁다는 것을 확인했다. 측정은 배포본 `0d6ae62c`, 보이는 워크스페이스
12개 기준이다.

| 상태                               | 방법                         | 결과                              |
| ---------------------------------- | ---------------------------- | --------------------------------- |
| 실행 중인 attempt 없음             | `ps` CPU 시간 차이 30초·20초 | 4.47초·3.5초 (15~17%)             |
| attempt 2개 실행 중(Codex, Claude) | 30초 CPU 프로파일            | 11.7초 (35%), 바쁜 시간의 약 2/3가 `clone` 자체(전체의 22.8%) |
| 같은 상태, 몇 분 뒤                | `ps` CPU 시간 차이 10초      | 7.7초 (77%), `/healthz` 5초 타임아웃 1회 |

- `clone`은 큐 전체를 JSON으로 왕복 복사한다. 1회 비용은 beads-ui 큐(4.25MB)
  7.5ms, dotfiles 큐(3.68MB) 6.3ms다. 한 번은 싸지만 호출이 초당 수십 번이다.
- 호출자는 한두 곳이 아니다. 프로파일에서 `clone`의 호출자는 타이머 점검, 모니터
  갱신, 머지 큐, 자동 머지 스캔 등 20곳 넘게 얇게 퍼져 있었다.
- 큐 파일의 절반은 attempt에 보관된 프롬프트 원문이다(beads-ui 2.13MB,
  dotfiles 1.90MB). 프롬프트를 빼면 복사 1회가 7.5ms에서 6.1ms로 줄 뿐이라
  CPU 효과는 작고, 효과는 파일 크기와 저장 때마다 전체를 다시 쓰는 양에 있다.
- 30일 지난 성공 배포 기록이 beads-ui 561건(684KB), dotfiles 349건(421KB)이다.

## 2. 검증된 전제

기준 커밋 `dc18903ccfdeb1fbf2748f3341c3d63ceb9346bb`.

- 큐는 워크스페이스별로 메모리에 한 번 적재되고, 캐시 교체는 적재와 두 변이
  경로뿐이다 — server/worker/queue-store.js:6970, server/worker/queue-store.js:7116,
  server/worker/queue-store.js:7827, server/worker/queue-store.js:7861
- `snapshot`은 `exportQueue`를 거쳐 호출마다 큐 전체를 JSON 왕복 복사한다 —
  server/worker/queue-store.js:3372, server/worker/queue-store.js:7443,
  server/worker/queue-store.js:8091
- `exportQueue`는 복사본의 `provider_hold`를 전역 보류 저장소에서 계산한 값으로
  덮어쓴다. 계산은 시계를 읽지 않는 순수 함수다 —
  server/worker/queue-store.js:7129, server/worker/provider-holds.js:261
- 변이는 현재 큐를 복사해 고친 뒤 개정 번호를 올리고 파일 전체를 들여쓰기해
  동기 저장한다 — server/worker/queue-store.js:7806, server/worker/queue-store.js:7852,
  server/worker/queue-store.js:7455
- 개정 번호만 필요한 모니터 판정도 전체 스냅샷을 받는다 —
  server/ws/monitor-handlers.js:1300
- `system_prompt`·`task_prompt`를 attempt에 쓰는 곳은 두 실행 경로다 —
  server/worker/scheduler.js:15953, server/worker/scheduler.js:16368
- 두 필드를 읽는 서버 코드는 화면 조회 두 처리기뿐이고, 화면 푸시는 세 프롬프트
  필드를 지운다 — server/ws/worker-handlers.js:2448, server/ws/worker-handlers.js:4779,
  server/ws/worker-handlers.js:4810, server/ws/worker-handlers.js:4854
- `disposition_prompt`는 스케줄러가 이전 attempt 기록에서 다시 읽는다 —
  server/worker/scheduler.js:9647, server/worker/scheduler.js:18768
- 처리 끝난 attempt는 attempt 전체를 Bead별 기록 파일로 옮긴다(프롬프트 포함) —
  server/worker/queue-store.js:7617, server/worker/queue-store.js:7652
- 화면 투영은 완료 7일·최신 배포 기록 20건으로 자르지만 저장된 큐는 자르지
  않는다 — server/ws/snapshot-retention.js:27, server/ws/snapshot-retention.js:30
- 완료 목록은 서버 판정이 "이미 착지한 Bead"의 증거로 읽는다 —
  server/worker/scheduler.js:5758, server/worker/scheduler.js:13937,
  server/worker/wait-judgment.js:149, server/worker/attempt-failure.js:32,
  server/worker/pr-poller.js:115
- 배포 기록 전체를 훑는 조회 중 성공 기록에 기대는 것은 네 가지다: 수정 대기의
  착지 판정, 저장소별 최신 수동 배포, 재시도 사슬의 끝 찾기(`retry_of`), 실패를
  덮는 성공 찾기(커버리지 정리) — server/worker/scheduler.js:12788,
  server/worker/scheduler.js:12671, server/worker/resolution-ladder.js:46,
  server/worker/repo-operation-coordinator.js:257,
  server/worker/repo-operation-coordinator.js:3500,
  server/worker/repo-operation-coordinator.js:598,
  server/worker/repo-operation-coordinator.js:682
- 커버리지 정리는 기록이 끝날 때와 서버 시작 때 돈다 —
  server/worker/repo-operation-coordinator.js:1156,
  server/worker/repo-operation-coordinator.js:3982
- `paused`·`stopped`·`waiting`·처리 안 된 `failed`는 처리 끝난 기록이 아니어서
  큐에 남는다 — server/worker/queue-store.js:6627, server/worker/queue-store.js:6646
- 기존 기록 보관 점검은 서버 시작 때와 24시간마다 돈다 —
  server/worker/attach.js:436, server/worker/attach.js:1032
- 화면 푸시는 남기는 Bead마다 이관 attempt 기록 디렉터리를 동기로 다시 읽는다 —
  server/ws/worker-handlers.js:3757, server/worker/queue-store.js:7758
- 얼린 실제 큐 세 개로 화면 투영 규칙을 돌려도 예외가 없다 — 명령:
  `Object.freeze`를 재귀 적용한 `queue.json`에 `trimQueueProjection`·`doneAtByBead`
  실행(beads-ui, dotfiles, Cortex)
- 스냅샷에 직접 대입·삭제·정렬하는 호출자는 스크립트 탐색 448개 바인딩에서
  찾지 못했다 — 명령: `.snapshot(` 바인딩 뒤 120~150줄의 변이 패턴 탐색
- 미확인: 큐를 통째로 받는 도우미 함수 약 140곳의 내부 변이 — 호출 지점
  탐색으로는 함수 안쪽 별칭 변이를 볼 수 없다
- 미확인: 캐시된 큐 객체를 복사 없이 제자리에서 고치는 저장소 내부 코드 —
  `ensureLoaded` 호출 27곳을 전부 읽지 않았다
- 미확인: 이관된 attempt 기록의 프롬프트가 타임라인 응답으로 브라우저에
  나가는지 — server/ws/worker-handlers.js:4922 의 응답 조립부를 끝까지 읽지 않았다

## 3. 목표와 비목표

목표는 큐를 읽는 비용이 큐 보관량과 호출 횟수에 비례하지 않게 하는 것이다.

- A. 읽기에서 복사를 없앤다(CPU 효과의 대부분).
- B. 프롬프트 원문을 큐 밖 파일로 옮긴다(파일 크기와 저장 비용).
- C. 30일 지난 성공 배포 기록을 보관 파일로 옮긴다(파일 크기와 전체 훑기 비용).

비목표:

- 완료 목록(`done`) 정리. 서버 판정이 착지 증거로 읽고 크기도 약 77KB다.
- `paused`·`failed`·`waiting` attempt 정리. 처리 끝난 기록이 아니어서 화면과
  재개 판정이 계속 읽는다.
- 재전송 횟수 줄이기와 `decorateQueue` 내부 비용. 배포 뒤 다시 재어 판단한다.
- 프롬프트 파일의 수명 규칙.
- UI-j8r7의 무한 재전송 수리(`dc18903c`로 착지).

## 4. 설계

### 4.1 A — 공유 읽기 전용 스냅샷

- `snapshot`과 `load`, 변이 결과가 돌려주는 큐는 깊게 얼린 읽기 전용 객체다.
- 큐 개정과 공급자 보류 계산값이 둘 다 그대로면 연속 호출은 같은 객체를
  돌려준다. 읽기 경로에서 큐 전체 복사는 0회다.
- 스냅샷의 `provider_hold`는 호출 시점의 전역 보류 상태와 항상 같다. 전역
  보류가 바뀌면 개정이 그대로여도 다음 호출이 새 값을 본다.
- 개정이 오르지 않는 내부 변경이 스냅샷에 빠지는 일이 없다. 캐시된 큐를
  제자리에서 고치는 코드가 발견되면 복사 후 교체로 바꾸거나 스냅샷 무효화에
  묶는다.
- 고쳐 쓸 사본이 필요한 호출자는 명시적 복사 경로를 쓴다(예:
  `snapshot(workspace, { copy: true })`).
- 결정: 운영에서도 얼린다. 얼린 스냅샷에 쓰면 그 자리에서 `TypeError`가 난다 —
  조용한 공유 상태 오염보다 드러나는 실패가 낫고, 숨은 변이는 배포 전에 6절의
  검사로 잡는다. 얼리지 않는 설정 스위치는 두지 않는다.

### 4.2 B — 프롬프트를 실행별 파일로

- 실행이 시작될 때 `system_prompt`·`task_prompt`를 그 attempt의 프롬프트 파일에
  쓴다(예: 워크스페이스 상태 디렉터리의 `beads/<bead_id>/prompts/<attempt_id>.json`).
  임시 파일에 쓰고 이름을 바꿔 반쯤 쓰인 파일이 남지 않게 한다.
- 결정: 큐의 attempt와 이관되는 attempt 기록에는 두 필드를 쓰지 않는다.
  `disposition_prompt`는 그대로 attempt에 둔다 — 스케줄러가 다시 읽는다.
- 화면 조회 두 가지(attempt 프롬프트, Bead 프롬프트)는 프롬프트 파일을 먼저
  읽고, 없으면 attempt에 남아 있는 옛 필드로 답한다. 파일이 있으면 이관된
  attempt도 답한다. 응답 모양은 바뀌지 않는다.
- 브라우저로 나가는 어떤 attempt에도 두 필드가 실리지 않는다(이관 기록을 읽어
  보내는 경로 포함).
- 기존 기록 이관: 서버 시작 때 워크스페이스마다 큐 안의 attempt 중 두 필드가
  남은 것을 "파일 쓰기 → 필드 제거" 순서로 옮긴다. 파일이 이미 있으면 다시 쓰지
  않는다. 한 attempt의 파일 쓰기가 실패하면 그 attempt의 필드는 남기고 다음
  시작 때 다시 시도한다. 이미 이관된 attempt 기록 파일은 고치지 않는다.

### 4.3 C — 30일 지난 성공 배포 기록 보관

- 대상은 `repo_operations` 중 `state`가 `succeeded`이고 끝난 지 30일이 지난
  기록이다. 다음 중 하나라도 해당하면 남긴다.
  - 화면 투영 규칙이 남기는 기록(최신 20건, 머지 후 잡이 가리키는 기록, 보존
    Bead의 기록, 대체 사슬 한 단계).
  - 큐의 다른 컬렉션이 그 operation id를 값으로 갖고 있는 기록.
  - 대상 Bead를 큐의 다른 컬렉션(완료 목록 제외)이 가리키는 기록. 수정 대기의
    착지 판정이 여기에 든다.
  - 저장소·종류·출처 조합마다 가장 최근 기록. 최신 수동 배포 조회가 여기에 든다.
  - `recovery` 기록이 붙은 기록.
  - 같은 저장소·종류에 대체되지 않고 처리되지 않은 `failed` 기록이 하나라도 있으면,
    그 저장소·종류의 성공 기록 전부. 커버리지 정리가 그 실패를 덮을 성공을 찾을 수
    있어야 한다.
- 결정: 연결된 기록은 함께 남거나 함께 옮긴다. 남기는 기록과 `retry_of` 또는
  `superseded_by`로 어느 방향이든 이어진 기록은 남기고, 이 규칙을 더 늘어나지
  않을 때까지 반복 적용한다 — 오래된 `실패 A → 성공 재시도 B`에서 B만 옮기면
  재시도 사슬의 끝이 A의 실패로 바뀐다.
- 옮길 기록은 워크스페이스별 보관 파일에 한 줄씩 덧붙인 뒤(예:
  `repo-operations-archive.jsonl`), 한 번의 큐 변이로 뺀다. 덧붙이기가 실패하면
  빼지 않는다. 중간에 죽어 같은 기록이 두 번 덧붙어도 id로 구분된다.
- 서버 시작 때와 24시간마다, 기존 기록 보관 점검과 같은 주기로 돈다.
- 실행 로그와 표식 파일은 건드리지 않는다.
- 결정: 완료 목록은 옮기지 않는다 — 서버 판정이 착지 증거로 읽는다.

## 5. 오류 처리

- 프롬프트 파일 쓰기 실패는 실행을 막지 않는다. 로그를 남기고, 그 attempt의
  프롬프트 조회는 지금의 "기록 없음" 응답을 한다.
- 프롬프트 파일이 깨졌거나 읽을 수 없으면 옛 필드로 넘어가고, 그것도 없으면
  "기록 없음"이다.
- 보관 점검 실패는 로그만 남기고 다음 주기에 다시 한다. 큐는 그대로다.
- 얼린 스냅샷 쓰기 예외는 숨기지 않는다. 운영에서 나면 그 호출 지점을
  명시적 복사로 바꾸는 수정이 뒤따른다.

## 6. 테스트

- 변이 없이 `snapshot`을 두 번 부르면 같은 객체가 돌아온다.
- 변이 뒤에는 다른 객체가 돌아오고 이전 객체는 내용이 그대로다.
- 전역 공급자 보류를 넣고 풀면 개정이 그대로여도 `provider_hold`가 따라 바뀐다.
- 스냅샷과 그 안쪽 객체에 대입하면 예외가 난다.
- 얼린 스냅샷 순회 검사: 실제 저장소로 만든, 모든 컬렉션이 채워진 큐를 두고
  화면 장식(`decorateQueue`), 모니터 집계, 스케줄러 재조정 한 바퀴, 배포 기록
  재조정, 머지 큐 스캔을 돌려 쓰기 예외가 없음을 본다.
- 실행 시작 뒤 큐 attempt에 두 필드가 없고 프롬프트 파일이 있다. 두 조회가
  같은 내용을 돌려준다.
- 옛 필드만 있는 attempt, 파일만 있는 이관 attempt, 둘 다 없는 attempt의 조회.
- 이관: 필드가 남은 큐를 적재하면 파일이 생기고 필드가 사라진다. 다시 돌려도
  결과가 같다. 파일 쓰기가 실패한 attempt는 필드가 남는다.
- 타임라인 응답과 큐 푸시에 두 필드가 없다.
- 보관: 30일 지난 성공 기록만 빠지고, 4.3의 보존 조건 여섯 가지 각각이 기록을
  남긴다. 덧붙이기 실패 때 큐가 그대로다.
- 보관 전후로 재시도 사슬의 끝(`currentTipOf`·`verifyReceipt`)과 커버리지 정리
  결과가 같다: 오래된 `실패 A → 성공 재시도 B`, 오래된 성공이 덮는 미처리 실패,
  `superseded_by`로 이어진 오래된 쌍.
- 기존 전체 테스트 묶음이 얼린 스냅샷으로 통과한다.

## 7. 수용 기준

1. 6절의 테스트와 `npm run tsc`, `npm run lint`, 전체 vitest가 통과한다.
2. 배포 뒤 beads-ui·dotfiles 큐 파일의 attempt에 `system_prompt`·`task_prompt`가
   없고, 두 화면 조회가 이관 전과 같은 내용을 보인다.
3. 배포 뒤 1절과 같은 방법(`ps` CPU 시간 차이 60초, `sample` 20초,
   `scripts/ws-latency-probe.mjs`)으로 두 상태를 다시 재어 완료 보고서에 적는다.
   공유 서버에 inspector는 붙이지 않는다.
   - 실행 중인 attempt가 없을 때 CPU 5% 이하.
   - `sample`의 상위 함수에 JSON 파싱·직렬화가 큐 복사 때문에 올라오지 않는다.
4. 3의 CPU 목표에 못 미치면 `sample` 내역으로 남은 원인을 이름 붙여 후속
   판정에 올린다. 그 경우에도 1·2가 충족되면 이 스펙의 구현은 끝난 것이다.

## 8. 구현 unit 후보

- A: `server/worker/queue-store.js`의 내보내기 경로와 얼린 스냅샷 순회 검사.
- B: 두 실행 경로의 프롬프트 쓰기, 두 조회 처리기, 시작 때 이관.
- C: 보관 점검과 보존 규칙.

A가 CPU 효과를 내므로 먼저 한다. B와 C는 A와 독립이다.

## 9. 경계·후속

- 관찰: 이관 attempt 기록을 푸시마다 동기로 다시 읽는 비용(프로파일 3.3%) —
  A 배포 뒤 다시 재어 남으면 판단한다.
- 관찰: 프롬프트 파일은 attempt마다 평균 14KB쯤 쌓인다 — 차가운 파일이라
  서버 부하와 무관해 수명 규칙을 두지 않았다.
- 관찰: `repo-operation-markers` 디렉터리에 표식 파일 1,024개가 남아 있다 —
  이 스펙 범위 밖이다.

## 결정 (ADR 후보)

- 큐 스냅샷은 개정마다 하나의 얼린 읽기 전용 객체를 공유한다 — 첫 조건 실패:
  `exportQueue` 한 곳을 복사로 되돌리면 원복된다 → ADR 아님
- 프롬프트 원문은 큐 밖 실행별 파일에 둔다 — 첫 조건 실패: 쓰는 두 곳과 읽는 두
  처리기를 고치는 quick_fix 하나로 되돌린다 → ADR 아님
- 30일 지난 성공 배포 기록은 보관 파일로 옮긴다 — 기본 제외 목록: 기간·상한 수치
  → ADR 아님
- 완료 목록은 큐에 그대로 둔다 — 기본 제외 목록: 한 파일 안의 구현 선택 → ADR 아님
