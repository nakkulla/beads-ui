---
scope:
  - server/ws/monitor-handlers.js
  - server/ws/monitor-handlers.test.js
  - server/ws/monitor-handlers.cross-lanes.test.js
  - server/ws/worker-handlers.js
  - server/ws.worker-queue.test.js
  - server/ws.monitor-pipeline.test.js
  - server/worker/runnable-cache.js
  - server/worker/runnable-cache.test.js
  - server/worker/compare-projection.js
  - server/worker/compare-projection.test.js
  - app/utils/carryover-index.js
  - app/utils/carryover-index.test.js
  - app/views/worker/workspace-adapter.js
  - app/views/worker/workspace-adapter.test.js
  - app/views/worker/blocker-ids.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/utils/exec-settings-chip.js
  - app/protocol.js
  - app/protocol.md
  - app/main.bundle.js
  - app/main.bundle.js.map
  - docs/superpowers/specs/2026-09-01-sweep-carryover-conversion-design.md
  - docs/superpowers/specs/2026-09-03-monitor-exec-material-queue-grace-design.md
---

# UI-ys18 — 모니터 이월 정보와 완료·연결 레인의 실행 재료 연결

- 상태: 사용자 검토용 초안. 2026-09-08 세 이슈의 스펙을 함께 작성하기로 한 요청에 따른다.
- 기준 코드: `ed3ce09185bcac1ee756c2fbacee8efeb0bea081`.
- 소유: beads-ui, 기존 `route=spec_backed`, 하나의 구현·검증 단위.
- 함께 작성하는 스펙: [UI-kyky](2026-09-08-worker-feedback-readability-design.md), [UI-qce9](2026-09-08-running-session-instructions-restart-design.md).
- 작업 순서는 UI-kyky → UI-ys18 → UI-qce9다. 각 스펙은 독립적으로 검토할 수 있으며, 이번 문서 작성은 추가 의존 간선을 만들지 않는다.

## 1. 문제와 근거

같은 이슈가 Worker에서는 이월 후속을 보여 주지만 Monitor에서는 빠진다. 완료 행의 워커 칩도 실제 실행 기록 대신 현재 설정을 요구해 표시되지 않는다. 연결 레인에 넣었으나 아직 실행하지 않은 항목은 큐 밖에 있는 것이 정상인데, 서버가 그 항목의 설정을 전달하지 않아 칩이 빠진다.

| 근거 | 현재 동작 |
| --- | --- |
| `workspace-adapter.js`의 `buildCarryoverIndex` | Worker 구독 열에서만 `carried_to` 생성 |
| `monitor-handlers.js`의 `beadOverlayFor` | route는 레인 멤버와 done, 실행 핀은 레인 멤버만 전달 |
| `title-cache.js`의 `recordFromIssue` | `blocked_by`에서 닫힌 선행을 제외하므로 이월 부모와의 원본 관계로 사용할 수 없음 |
| `runnable-cache.js`의 `fetchRunnable` | 기존 비동기 스캔에서 이미 전체 원본 이슈 집합을 읽음 |
| `lane-model.js`의 완료 칩 파생 | 오케는 attempt 기록, 워커는 현재 overlay metadata에 의존 |
| `lane-model.js`의 `chain_material` | 기존 레인 행에서만 복사하므로 overlay만 있는 큐 밖 항목은 누락 |
| `compare-projection.js`의 `implActorOf` | attempt가 보존한 실행 영수증으로 실제 구현 주체를 이미 파생 |

## 2. 선택과 불변식

완료 행이 말하는 것은 ‘무엇으로 돌았나’, 실행 전 연결 레인이 말하는 것은 ‘무엇으로 돌 예정인가’다. 이 둘의 재료를 분리한다.

| 대상 | 재료 | 정보가 없을 때 |
| --- | --- | --- |
| 완료 항목의 이월 후속 | 아직 닫히지 않은 후속의 `carried_from` 존재와 원본 `blocks` 간선 | 이월 칩 생략 |
| 완료 항목의 오케·워커 | 그 완료를 만든 마지막 구현 attempt의 기록·보존 영수증 | 없는 칩만 생략 |
| 큐 밖 연결 레인의 예정 실행 | 해당 워크스페이스의 현재 실행 핀과 기존 전역 기본값 | 모르는 재료는 생략 |

대안인 ‘완료 bead에도 현재 핀 전송’은 구현은 쉬우나 과거 실행 주체를 나중 설정으로 바꿔 표시하므로 ADR 0037에 어긋난다. 카드마다 직접 이슈를 추가 조회하는 대안은 구독 수만큼 읽기가 늘어난다. 기존 서버 스캔과 공통 레인 모델에 누락된 재료를 연결한다.

결정: 이월 metadata·간선의 의미, 큐 적재·실행 판정, attempt 보존 기간은 바꾸지 않는다 — 이번 작업은 관측 정보의 전달과 표시를 고친다.

## 3. 이월 색인의 원천과 전달

### 3.1 파생 규칙

기존 이월 스펙 §3의 규칙을 그대로 사용한다. 후속 `S`에 비어 있지 않은 `metadata.carried_from`이 있고, 원본 `blocks` 간선이 완료 항목 `P`를 향하면 `P`의 `carried_to`에 `S.id`를 넣는다.

`carried_from`의 값은 원본 Phase 자식 ID일 수 있다. 그 값과 완료 부모 `P.id`가 같아야 한다는 조건을 추가하지 않는다. 동일 후속은 한 번만 표시하고 ID순으로 정렬한다. 원본 간선이 닫힌 부모를 향해도 관계를 보존한다. 현재 열려 있는 blocker 목록이나 `bd ready` 결과로 관계를 대체하지 않는다.

후속 집합은 현행 Worker의 Ready·Blocked·In-progress·Resolved 열에 대응하는 `open`, `blocked`, `in_progress`, `resolved`다. `closed`·`deferred` 후속은 포함하지 않는다. 종료된 부모가 화면에 없어도 색인을 만들 수 있지만, snapshot에는 실제 done 항목이 필요로 하는 결과만 보낸다. 각 워크스페이스의 원본 집합에서만 파생하고 다른 root의 같은 ID를 합치지 않는다.

### 3.2 한 번 읽은 원본 사용

`runnable-cache.js`의 성공한 `fetchRunnable`이 이미 읽은 전체 원본 rows에서 후보 필터링 전에 이월 색인을 만든다. 기존 캐시 항목과 같은 갱신·무효화·실패 수명을 쓰며, 이월 전용 타이머·파일·추가 `bd` 호출은 만들지 않는다. 유효한 새 스캔 결과가 없으면 이월 사실을 새로 확정하지 않는다.

`buildCarryoverIndex`의 순수 계산을 `app/utils/carryover-index.js`로 추출해 Worker 어댑터와 서버 캐시가 공유한다. 기존 순수 `blockerIdsOf`에 `{ dependencies: issue.dependencies }`만 전달해 원본 간선 정규화를 재사용한다. 전체 issue를 그대로 넣으면 `blocked_info`가 원본 dependencies보다 우선해 닫힌 부모의 관계를 삼킬 수 있으므로, 이월 파생에서는 그 활성 blocker 사다리를 사용하지 않는다. 서버에서 브라우저 렌더러나 구독 store를 import하지 않는다. 닫힌 부모의 간선을 제거하는 `titleCache.blocked_by`도 입력으로 사용하지 않는다.

캐시에 `carriedToFor(workspace, parent_ids)`라는 읽기 전용 투영을 둔다. 이 함수는 이미 만든 색인을 필요한 done ID로 좁혀 반환한다. cold·실패 캐시는 빈 결과를 내며, 기존 후보 캐시의 비동기 채움과 갱신 알림이 다음 snapshot을 보낸다. Monitor만 열고 Worker 탭을 한 번도 열지 않은 경우도 채워져야 한다.

`beadOverlayFor`가 이 결과를 기존 `bead_overlay[P].carried_to`로 싣는다. Worker의 로컬 구독 파생도 같은 helper를 사용하므로 원천이 달라도 규칙은 하나다. 후속 close·defer·간선 삭제·`carried_from` 제거가 새 스캔에 반영되면 이전 칩을 제거한다. 빈 배열을 지난 비어 있지 않은 결과와 합쳐 보존하지 않는다.

## 4. 큐 밖 연결 레인의 재료

### 4.1 같은 연결 레인 스냅샷 사용

Monitor의 최초 구독과 push 경로는 `safeCrossLanes()`를 한 번 읽어 그 결과를 `buildMonitorPipeline`과 최종 envelope에 함께 사용한다. 각 워크스페이스에 대해 이 snapshot의 entries 중 `root_dir`가 일치하는 ID를 모은다. 숨긴 워크스페이스를 그 때문에 새로 노출하지 않는다.

| overlay 필드 | 대상 ID |
| --- | --- |
| route | 기존 레인 멤버 ∪ done ∪ 보이는 해당 root의 연결 레인 entries |
| 예정 실행 metadata | 기존 레인 멤버 ∪ 해당 root의 미완료·미실행 연결 레인 entries |
| carried_to | 해당 root의 done |

route·metadata는 기존 `titleCache.workflowFor`·`execPinFor`를 사용한다. 같은 캐시 조회에서 값이 없는 항목은 부분 결과에서 빠지고, 기존 비동기 채움이 재투영한다. 새로운 항목을 `queue`에 쓰거나 arm하지 않는다.

### 4.2 공통 레인 모델의 빈자리 채우기

현재 `chain_material`은 queue·running·pr_wait·done·runnable 행을 우선 복사한다. 그 목록에 없는 연결 레인 entry에 한해서, `(root_dir, bead_id)`로 찾은 overlay와 해당 root의 설정을 기존 `overlayExecChips`에 전달한다.

이미 만들어진 실제 실행·완료 행의 칩을 예정 설정으로 덮어쓰지 않는다. overlay만 있는 항목의 `added_at`을 현재 시각으로 만들지 않고, 유예·대기열 위치·진행 상태를 합성하지 않는다. 이 항목은 계속 큐 밖의 연결 레인 항목이다. root가 다른 동일 ID도 서로의 설정을 사용하지 않는다.

이월과 예정 실행은 기존 4b·5번 슬롯을 사용하므로 새 칩 자리나 카드 줄을 추가하지 않는다. UI-kyky가 정한 색은 기존 route 값의 소비 결과일 뿐, 이 작업이 색 규칙을 다시 정하지 않는다.

## 5. 완료 행의 실제 구현 주체

### 5.1 서버에서 기존 해석기 재사용

완료 행의 마지막 구현 attempt 선택은 현행 `latestTerminalAttempt` 규칙을 유지한다. 큐와 이관 파일을 새로 합집합 조회하거나 지난 attempt를 동기 파일 읽기로 되살리지 않는다.

실행 영수증 해석 정본은 `compare-projection.js`의 공개 순수 함수 `implActorOf`다. `worker-handlers.js`의 attempt snapshot 투영에서 이 함수를 호출해 선택적 표시 필드 `impl_actor`를 붙인다. Monitor도 같은 장식된 attempt를 받는다. 이 필드는 서버가 보존된 `receipt_check`에서 계산하는 전송용 파생값이며, Bead metadata·저장된 attempt·workflow 상태 enum을 추가하지 않는다.

기존 `implActorOf`를 호출하면 다음 의미가 프리셋 비교 화면과 같아진다.

- 보존된 `checks.exec_receipt`의 파싱 결과 또는 지원하는 과거 raw 문자열을 읽는다.
- 다중 unit은 모든 unit의 실제 구현 주체가 같을 때만 하나의 칩으로 표현한다.
- `main`은 컨트롤러가 직접 구현한 사실이다. 존재하지 않는 위임 모델을 만들지 않는다.
- 서로 다른 구현 주체·손상·미기록은 `missing`으로 남긴다.

서버의 파싱 모듈을 브라우저 번들에 가져오거나 같은 영수증 정규식을 클라이언트에 복제하지 않는다.

### 5.2 렌더링

완료 행의 오케 칩은 기존 attempt의 runner·model·effort·speed 기록을 그대로 사용한다. 워커 칩은 `impl_actor`만 읽어 기존 `ExecChip` 형태로 표현한다. `delegated`는 기록된 모델·effort를, `main`은 기존 직접 구현 표현을 사용한다. 값이 없는 effort·speed·runtime을 현재 설정으로 채우지 않는다. `missing` 또는 선택 필드 부재는 워커 칩만 생략한다.

완료 행 호출에서 현재 overlay metadata를 워커 칩의 대체 재료로 사용하는 경로를 없앤다. 실행 중 행의 예정 위임 표시 규칙은 이번 작업에서 바꾸지 않는다. 완료 항목의 실행 이후 핀·전역 기본값·프리셋을 바꿔도 과거 칩은 변하지 않아야 한다.

새 `impl_actor` 필드의 타입·snapshot 설명·누락 호환성을 기존 프로토콜 문서에 반영한다. 옛 서버 payload에는 필드가 없으므로 글자 칩을 생략하는 것이 호환 동작이다.

## 6. 정본 반영 문구

구현 PR에서 다음 두 정정 문단을 각 소유 스펙에 넣는다. 이번 초안 작성은 기존 정본을 변경하지 않는다.

이월 스펙 `2026-09-01-sweep-carryover-conversion-design.md` §3:

> 정정(UI-ys18). 같은 파생 규칙을 Worker 구독 집합과 Monitor의 기존 비동기 원본 이슈 스캔에 함께 적용한다. 닫힌 부모를 향한 원본 blocks 간선도 관계 재료이며, 현재 blocker 목록으로 대체하지 않는다. Monitor는 결과를 done 항목의 bead_overlay.carried_to로 전송하고 기존 4b 이월 칩을 사용한다.

모니터 실행 재료 스펙 `2026-09-03-monitor-exec-material-queue-grace-design.md` §3.1·3.4·3.5:

> 정정(UI-ys18). route 대상은 기존 레인 멤버와 done에 더해 같은 snapshot의 연결 레인 entries를 포함한다. 예정 실행 핀은 큐 밖 미완료·미실행 연결 레인 멤버에도 전달한다. 완료 행은 현재 핀을 사용하지 않고 마지막 구현 attempt의 보존 영수증에서 해석한 실제 구현 주체를 사용한다. 기존 레인 행이 없는 연결 레인 entry만 overlay로 예정 칩을 보충한다. 어느 경우도 큐 적재·arm을 발생시키지 않는다.

ADR 0037의 ‘완료는 기록값’ 결정을 구현하므로 대체 ADR은 필요하지 않다. 카드 슬롯은 기존 4b와 5를 그대로 사용한다.

## 7. 검증과 수용 기준

1. Monitor만 구독한 상태에서 닫힌 부모 `P`, 살아 있는 후속 `S`, `carried_from=<원본 자식>`, `S blocks P`를 입력하면 `이월 → S`가 보인다. `carried_from !== P.id`여도 보여야 한다. `blocked_info.blockers=[]`여도 원본 blocks가 있으면 두 탭 모두 표시해야 한다.
2. 표시 대상은 open·blocked·in_progress·resolved 후속이며, closed·deferred 후속, 이월 표식 없음, blocks 없음은 제외한다. 후속 close·관계 제거 뒤 이전 칩이 없어져야 한다.
3. 하나의 원본 스캔으로 후보와 이월 색인을 함께 만들고, 반복 snapshot 투영에서 추가 `bd`·동기 자식 프로세스 호출이 없어야 한다. cold cache가 이후 정상 push로 채워지는 것도 검증한다.
4. queue·runnable 밖의 연결 레인 멤버도 route·예정 오케/워커 칩을 얻는다. 같은 envelope의 연결 레인 revision을 사용하고, 다른 root·숨긴 workspace에는 영향을 주지 않는다. 큐 항목 수와 arm 상태는 불변이다.
5. 현재 핀이 A, 과거 영수증이 B일 때 완료 워커 칩은 B다. 현재 핀·프리셋 변경 후에도 동일하다. 직접 구현·동일 다중 unit·상이한 다중 unit·영수증 누락·구형 raw 영수증을 대조한다.
6. Worker 2줄 완료 행과 Monitor 3줄 완료 행에서 같은 칩과 이월 링크 대상이 나온다. 재료가 없으면 줄·칩을 추가하지 않는다.
7. 구현 전 환경 확인 후 `npm run tsc`, `npx vitest run --reporter=dot`(120초 상한), `npm run lint`, 변경 경로 Prettier 검사, `npm run build`를 통과하고 번들 두 파일을 포함한다.
8. 머지 후 공유 서비스에서 양쪽 탭의 이월·완료·연결 레인 표시를 확인한다. 배포 절차와 완료 증거는 저장소 계약을 따른다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 기존 workflow metadata·영수증을 소비하며 새 정의를 만들지 않는다.
- 전제: ADR 0014 — 레인 모델과 렌더러를 공유하고 기존 4b·5 슬롯을 사용한다.
- 전제: ADR 0026 — 기존 비동기 스캔에서 재료를 만들고 동기 투영은 메모리만 읽는다.
- 전제: ADR 0029 — 마지막 구현 attempt의 판정에 이관 기록 합집합 조회를 추가하지 않는다.
- 전제: ADR 0035 — 연결 레인 멤버의 표시가 큐 적재나 arm으로 이어지지 않는다.
- 전제: ADR 0037 — 완료 실행 주체는 현재 핀이 아니라 그 완료를 만든 attempt의 기록이다.
- 이월 색인 공유와 연결 레인 ID 합집합: 되돌리기 어려움 불성립(기존 전달 경로의 배선), 맥락 없이는 놀라움 불성립(이미 요구된 표시 재료), 실질 트레이드오프 성립(추가 조회와 기존 스캔 재사용) → ADR 아님
- 완료 `impl_actor` 투영: 되돌리기 어려움 불성립(선택적 표시 필드), 맥락 없이는 놀라움 불성립(ADR 0037의 구현), 실질 트레이드오프 성립(브라우저 파서 복제와 서버 해석기 재사용) → ADR 아님
