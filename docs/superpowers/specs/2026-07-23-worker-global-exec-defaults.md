# Worker 실행 설정 전역 기본값 (UI-ve6z)

## 목적

상세 패널의 per-bead 실행 설정 5키(worker_runner / orchestration_model /
orchestration_effort / review_model / impl_model)를 워크스페이스 전역
기본값으로도 설정할 수 있게 한다. 자동 실행마다 bead에 일일이 metadata를
심지 않아도 원하는 runner/모델/리뷰 모델로 dispatch되게 하는 것이 목적.

## 해석 순서

bead metadata > 워크스페이스 전역 기본값 > 하드코딩 기본(runner='claude',
나머지 키는 미설정). 전역 기본값은 워크스페이스(큐) 단위다.

> **superseded (부분)**: `orchestration_model`의 하드코딩 기본은 이제
> 미설정이 아니라 `opus`다 —
> [2026-07-27-worker-orchestration-model-default-opus.md](2026-07-27-worker-orchestration-model-default-opus.md).
> 나머지 3키의 미설정 폴백은 그대로다.

키별 독립 해석이 아니라 runner를 먼저 확정한다: `worker_runner`를 위
순서로 resolve한 뒤, `orchestration_model`은 계층 순서(bead → 전역)에서
확정된 runner의 카탈로그(RUNNER_MODELS)와 호환되는 첫 값만 채택하고,
호환 값이 없으면 unset으로 귀결한다(비호환 계층 값은 건너뛴다).
review_model/impl_model/effort는 runner 비의존 enum이므로 계층 순서만
적용한다.

## 변경 사항

1. queue-store: 큐 스냅샷에 `exec_defaults` 객체(5키 부분집합; unset 키는
   부재) 추가. `setExecDefault(key, value|null)` 뮤테이션 — merge_policy와
   동일한 revision CAS·persist 규칙, null=unset.
2. protocol/ws: `worker-queue-set-exec-default {key, value|null,
   expected_revision}` 메시지 추가. 서버 validators는 키별 union enum만
   검증한다(runner-model 교차 키 호환성은 set 시점에 검증하지 않는다 —
   runner가 나중에 바뀔 수 있어 라이스하므로, 강제는 dispatch resolve의
   호환성 규칙과 UI 옵션 필터가 담당). 핸들러 응답·fanout·conflict 계약은
   set-policy와 동일.
3. scheduler dispatch: snapshotBead 후 exec 5키를 위 해석 순서(runner 우선
   확정 + 호환성 규칙)대로 resolve.
   - `BeadSnapshot`/`createLiveBd().snapshotBead()`에 `review_model`·
     `impl_model` 필드를 추가해 per-bead 설정 존재 판정을 authoritative
     metadata 읽기로 수행한다.
   - runner/model/effort는 기존 snap 필드 경로로 세션 spawn에 반영하며,
     resolve는 assertRunnerAllowed 이전에 수행한다.
   - bead에 미설정이고 전역 기본이 있는 키는 dispatch 시 bd metadata에
     스탬핑(set+readback; 실패 계약은 workflow_mode 스탬핑과 동일 — 해당
     dispatch만 실패 처리). 스탬핑 키 목록(`exec_stamped_keys`)은 첫
     metadata 쓰기 전에 큐 attempt record에 durable 기록해 재시작을
     넘겨서도 남는다(in-memory running 레지스트리만으로는 orphan 원복
     불가).
   - revert(스탬핑 키 unset)는 done/fail/stop 경로와 orphan 검출 경로
     (재시작 후 orphan.js reap 포함) 모두에서 attempt record의
     `exec_stamped_keys`를 근거로 수행한다. 스탬핑 도중 일부 키만 성공하고
     실패하면 이미 스탬핑된 키를 unset으로 정리한 뒤 해당 dispatch를 실패
     처리한다.
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
- bead `worker_runner=claude` + 전역 `orchestration_model=gpt-5.6`처럼
  비호환 교차 계층 조합은 model unset으로 귀결(claude 기본 모델 경로),
  스탬핑 없음.
  (superseded: 이제 `opus`로 귀결한다 —
  [2026-07-27-worker-orchestration-model-default-opus.md](2026-07-27-worker-orchestration-model-default-opus.md).
  스탬핑 없음은 유지.)
- 스탬핑된 attempt가 서버 재시작 후 orphan으로 reap되면 attempt record의
  `exec_stamped_keys` 근거로 metadata가 원복된다.

## 비-목표

- workflow_mode 전역화(디스패치 fast_track 스탬핑 계약은 그대로).
- 서버 config(worker_verify) 편집 UI, display-policy 다이얼로그와의 통합.
- Board/상세 패널 per-bead 편집 UI 변경.

## 테스트 범위

- queue-store: setExecDefault CAS/persist/enum 검증, attempt record의
  `exec_stamped_keys` persist.
- ws 핸들러: 메시지 검증·fanout·conflict 계약.
- scheduler: resolve 우선순위(runner 우선 + 비호환 교차 계층), 스탬핑
  readback·부분 실패 계약, done/fail/stop revert.
- orphan: 재시작 후 reap 시 `exec_stamped_keys` 원복.
- worker view: 다이얼로그 렌더·전송·CAS 재시도(jsdom).
