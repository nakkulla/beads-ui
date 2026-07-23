# Worker 실행 설정 전역 기본값 (UI-ve6z)

## 목적

상세 패널의 per-bead 실행 설정 5키(worker_runner / orchestration_model /
orchestration_effort / review_model / impl_model)를 워크스페이스 전역
기본값으로도 설정할 수 있게 한다. 자동 실행마다 bead에 일일이 metadata를
심지 않아도 원하는 runner/모델/리뷰 모델로 dispatch되게 하는 것이 목적.

## 해석 순서

bead metadata > 워크스페이스 전역 기본값 > 하드코딩 기본(runner='claude',
나머지 키는 미설정). 전역 기본값은 워크스페이스(큐) 단위다.

## 변경 사항

1. queue-store: 큐 스냅샷에 `exec_defaults` 객체(5키 부분집합; unset 키는
   부재) 추가. `setExecDefault(key, value|null)` 뮤테이션 — merge_policy와
   동일한 revision CAS·persist 규칙, null=unset.
2. protocol/ws: `worker-queue-set-exec-default {key, value|null,
   expected_revision}` 메시지 추가. 허용 키/값은 exec-settings.js 카탈로그와
   동일 enum(runner별 모델 제약 포함, 서버 validators에서 검증); 핸들러
   응답·fanout·conflict 계약은 set-policy와 동일.
3. scheduler dispatch: snapshotBead 후 exec 5키를 해석 순서대로 resolve.
   - runner/model/effort는 기존 snap 필드 경로로 세션 spawn에 반영하며,
     resolve는 assertRunnerAllowed 이전에 수행한다.
   - bead에 미설정이고 전역 기본이 있는 키는 dispatch 시 bd metadata에
     스탬핑(set+readback; 실패 계약은 workflow_mode 스탬핑과 동일 — 해당
     dispatch만 실패 처리). attempt 종료(done/fail/stop/orphan) 시 스탬핑한
     키만 unset으로 revert하며, 스탬핑 키 목록은 running 레지스트리에
     attempt 단위로 기록한다.
   - bead에 이미 설정된 키는 스탬핑/revert 대상이 아니다.
4. UI(Worker 탭): ctrl bar에 ⚙ 버튼 → '전역 실행 설정' 다이얼로그.
   - exec-settings.js의 RUNNERS/RUNNER_MODELS/EFFORTS/REVIEW_MODELS/
     IMPL_MODELS 카탈로그 재사용, 키별 셀렉트 + '(기본)'=unset.
   - 변경 즉시 `worker-queue-set-exec-default` 전송, CAS conflict 1회
     재시도(기존 setPolicy 계약과 동일), 스냅샷 push로 동기화.

## 수용 기준

- 전역 orchestration_model 설정 후 metadata 없는 bead를 큐에 넣고
  auto_advance → spawn 반영 + dispatch 중 bead metadata 스탬핑 + 종료 후
  해당 키 unset 원복.
- bead metadata에 이미 설정된 키(예: review_model)는 전역 기본과 무관하게
  유지되고 스탬핑/revert가 일어나지 않는다.
- 다이얼로그에서 값 변경 → 다른 구독 클라이언트의 큐 스냅샷에
  `exec_defaults` 반영.
- 서버 재시작 후에도 `exec_defaults` 유지(큐 파일 persist).

## 비-목표

- workflow_mode 전역화(디스패치 fast_track 스탬핑 계약은 그대로).
- 서버 config(worker_verify) 편집 UI, display-policy 다이얼로그와의 통합.
- Board/상세 패널 per-bead 편집 UI 변경.

## 테스트 범위

- queue-store: setExecDefault CAS/persist/enum 검증.
- ws 핸들러: 메시지 검증·fanout·conflict 계약.
- scheduler: resolve 우선순위, 스탬핑 readback 실패 계약, 종료 시 revert.
- worker view: 다이얼로그 렌더·전송·CAS 재시도(jsdom).
