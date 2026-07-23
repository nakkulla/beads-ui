# Worker 실행 설정 전역 기본값 (UI-ve6z)

## Context

Worker 자동 실행에서 runner/모델/리뷰 모델을 쓰려면 매 bead에 metadata를
심어야 한다. 승인 스펙
`docs/superpowers/specs/2026-07-23-worker-global-exec-defaults.md`
@ `84465bafaf942ddbed09489b54f1a28e0d9dd248` (spec_review:
codex@84465ba, REVISE 3건 수용 반영)은 exec 5키(worker_runner /
orchestration_model / orchestration_effort / review_model / impl_model)의
워크스페이스 전역 기본값을 도입한다: 해석 순서 bead > 전역 > 하드코딩
기본(runner='claude'), runner 우선 확정 후 orchestration_model은 확정
runner 카탈로그와 호환되는 첫 계층 값만 채택, dispatch 시 bead 미설정
키만 metadata 스탬핑(`exec_stamped_keys`를 attempt record에 durable 기록)
후 종료/orphan 경로에서 unset 원복, Worker 탭 ⚙ 다이얼로그로 설정.

실행: `.worktrees/UI-ve6z` (branch `UI-ve6z`), phase당 위임 실행
후 컨트롤러 diff 검토. 구현 완료 후 implementation 게이트 1회.

핵심 제약(탐색으로 실측):
- `queue-store.js` `normalizeQueue()`는 화이트리스트 복사 — 새 필드
  `exec_defaults`/`exec_stamped_keys`는 `emptyQueue()`·`normalizeQueue()`·
  `makeAttempt()`에 명시 추가해야 재시작을 살아남는다.
- `updateAttempt` patch는 `makeAttempt` shape을 거치므로 Attempt typedef에
  없는 필드는 침묵 드롭된다.
- `server/validators.js`는 worker 뮤테이션 체인에 관여하지 않는다 — enum
  검증은 queue-store의 `POLICY_KEYS` 패턴(스토어 레벨)이 정본.
- orphan 검출은 startup reap 전용이라 dispatch 중 pid null 창이 오검출될
  일이 없다.

## Phase 1: 서버 기반 — enum 공유 모듈·queue-store·resolve

1. `server/worker/exec-enums.js` 신설: `RUNNERS`, `RUNNER_MODELS`,
   `ALL_ORCHESTRATION_MODELS`, `EFFORTS`, `REVIEW_MODELS`, `IMPL_MODELS`,
   `EXEC_SETTING_ENUMS`(5키; workflow_mode 제외)를 단일 소스로 추출.
   `server/ws/mutation-handlers.js:77-101`의 로컬 복사본을 이 모듈 소비로
   전환(기존 `EXEC_SETTING_ENUMS`의 workflow_mode 항목은 mutation-handlers
   측에서 5키 테이블에 합성 유지).
2. `server/worker/queue-store.js`: `Queue` typedef·`emptyQueue()`·
   `normalizeQueue()`에 `exec_defaults`(유효 enum 값만 생존) 추가;
   `Attempt` typedef·`makeAttempt()`에 `exec_stamped_keys`(string[]|null)
   추가; `setExecDefault(workspace, {expected_revision, key, value})` —
   `setPolicy`(578-596행)와 동일 CAS·persist, null/''=unset(키 삭제).
3. `server/worker/policy.js`: `resolveExecSettings({bead, defaults})` 추가 —
   runner 먼저 `firstValid([bead.runner, defaults.worker_runner], 'claude')`,
   model은 `RUNNER_MODELS[runner]` 호환 첫 계층 값(비호환 계층 건너뜀, 없으면
   undefined), effort/review_model/impl_model은 enum 계층 해석. 반환:
   해석값 5종 + `stamped_keys`(bead 키 부재 && 전역 값이 채택된 키 목록).

검증: `npx vitest run server/worker/queue-store.test.js
server/worker/policy.test.js server/ws.mutations.test.js` green (신규:
setExecDefault CAS/enum/reload 생존, resolveExecSettings 우선순위·비호환
교차 계층·stamped_keys 판정).

## Phase 2: 프로토콜/ws 핸들러

1. `app/protocol.js`: `MessageType` typedef union + `MESSAGE_TYPES` 배열에
   `worker-queue-set-exec-default` 추가.
2. `server/ws/worker-handlers.js`: `handleWorkerQueueSetExecDefault` —
   `handleWorkerQueueSetPolicy`와 동일 골격(workspaceKeyOf/revisionOf/
   replyMutation/fanout), store `setExecDefault` 호출.
3. `server/ws/connection.js`: import + case 라우팅 추가.

검증: `npx vitest run server/ws.worker-queue.test.js app/protocol.test.js`
green (신규 핸들러 테스트: 정상 set/unset·비enum 거부·CAS conflict·fanout —
place/toggle 테스트 형태 미러).

## Phase 3: scheduler 스탬핑/원복 + orphan

1. `server/worker/attach.js` `snapshotBead`: `review_model`·`impl_model`
   필드 추가(metadata 존재 판정의 authoritative 소스). `scheduler.js`
   `BeadSnapshot` typedef 동기화.
2. `server/worker/scheduler.js` dispatch 재구성(560-737행):
   `resolveExecSettings`를 `assertRunnerAllowed` 이전에 호출해
   `runner_name`/spawn `model`/`effort`를 해석값으로 교체. workflow_mode
   스탬핑 성공 직후 `appendAttempt`+`updateAttempt`를 스탬핑 이전으로
   이동(patch: repo/target_base/base_oid/workflow_mode_prior/
   `exec_stamped_keys`/status 'running'/pid null) → exec 키 스탬핑
   (키별 set+readback) → 성공 시 token 발급·spawn·`updateAttempt`
   {pid, started_at, runner, model, effort}. 스탬핑 부분 실패 시 이미
   스탬핑된 키 unset 정리 + attempt failed(cause `exec_stamp_failed`) +
   workflow_mode revert + claim 해제. spawn throw 경로도 동일 정리 추가.
3. 종료 원복: `revertWorkflowMode` 호출 3경로(onSessionDone/stop/
   tripFailed)에 attempt record의 `exec_stamped_keys` 기반 unset 원복을
   동반(헬퍼 `revertExecStamps`); `server/worker/orphan.js` reap 단계에
   `a.exec_stamped_keys` unset 추가(기존 workflow_mode revert와 동일
   fire-and-forget).

검증: `npx vitest run server/worker/scheduler.test.js
server/worker/orphan.test.js server/worker/attach.test.js` green (신규:
전역만 설정된 bead의 spawn 반영+스탬핑+종료 원복, bead 설정 키 비스탬핑,
비호환 교차 계층 model unset, 부분 실패 정리, orphan reap 원복 — 기존
'bead metadata beats the workspace global' 테스트 형태 미러).

## Phase 4: Worker 탭 ⚙ 다이얼로그

1. `app/views/worker/exec-defaults-dialog.js` 신설:
   `display-settings-dialog.js`의 native `<dialog>` 패턴(showModal/jsdom
   폴백, close/cancel 처리, destroy) 미러. 내용은
   `detail-panel/exec-settings.js` 카탈로그 재사용 — 5키 셀렉트,
   `modelsForRunner`(유효 전역 runner 기준, 미설정=claude) 필터,
   '(기본)'=unset. 변경 즉시 `worker-queue-set-exec-default` 전송 + CAS
   conflict 1회 재시도(큐 reply adopt) — worker view `setPolicy` 계약 미러.
2. `app/views/worker/index.js` `topTemplate` ctrl bar에 ⚙ 버튼
   (`aria-haspopup="dialog"`), `createWorkerView`에서 다이얼로그
   생성·open 위임·`destroy()` 연결. `queueStore` 구독으로 열림 중 재렌더.
3. `app/styles.css`에 다이얼로그 스타일(토큰 기반, light/dark) 추가,
   `npm run build`로 번들 재생성.

검증: `npx vitest run app/views/worker/` green (신규: ⚙ 클릭 → 다이얼로그
열림·셀렉트 변경 → `worker-queue-set-exec-default` {key,value,
expected_revision} 전송·conflict 재시도) 후 `npm run all` 전체 green.

## 마무리

implementation 게이트(통합 diff, 1회) → 머지 경로는 finishing 규칙 →
메인 체크아웃에서 `npm run build` 산출물 커밋 확인 + `bdui-shared restart`
+ `curl /healthz` ok + Worker 탭에서 수용 기준 수동 확인(다이얼로그 설정
→ 다른 클라이언트 반영, 재시작 후 유지).

## Test scope

- `server/worker/queue-store.test.js` (Phase 1): `setExecDefault`
  CAS·enum 거부·unset·reload 생존, `exec_stamped_keys` persist. RED→GREEN.
- `server/worker/policy.test.js` (Phase 1): `resolveExecSettings` 계층
  우선순위·runner 우선 호환성·stamped_keys 판정. RED→GREEN.
- `server/ws.worker-queue.test.js` (Phase 2): set-exec-default 핸들러
  set/unset·거부·conflict·fanout. RED→GREEN.
- `server/worker/scheduler.test.js` (Phase 3): 전역 기본 spawn 반영·스탬핑·
  종료 원복·비스탬핑 조건·부분 실패 정리. RED→GREEN.
- `server/worker/orphan.test.js` (Phase 3): reap 시 `exec_stamped_keys`
  원복. RED→GREEN.
- `server/worker/attach.test.js` (Phase 3): snapshotBead
  review/impl_model 필드. RED→GREEN.
- `app/views/worker/index.test.js` 또는 신규 dialog 테스트 (Phase 4):
  다이얼로그 렌더·전송·CAS 재시도. RED→GREEN.
- 제외: `server/ws/mutation-handlers.js` enum 공유 모듈 전환은 기존
  `ws.mutations.test.js`가 동작 불변을 이미 커버(리팩터 회귀 확인만,
  신규 seam 아님).
