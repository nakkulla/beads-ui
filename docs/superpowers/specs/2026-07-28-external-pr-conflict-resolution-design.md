# 외부 세션 PR 충돌 해소 — attempt-less fresh 해소 세션 디스패치 (UI-w0hi)

## 배경

UI-7agi가 도입한 pr_wait 외부 행(일반 세션이 배달한 PR)은 충돌 시 배지만
표시하고 [충돌 해소] 버튼이 비활성이다. 기존 해소 경로
`scheduler.resolveConflict()`가 워커 attempt의 `session_id`·스냅샷을 소스로
`relaunchFromAttempt()`를 태우기 때문에, attempt가 없는 외부 행에서는 항상
`no_session_id`로 거부된다. UI-0x54(PR #57) 충돌에서 실사용 불편이 확인됐다.

핵심 관찰:

- 해소 태스크 프롬프트(`conflictPrompt()`)는 자기완결적이다 — fetch,
  `git merge origin/<base>`, 양쪽 의도 보존 해소, 검증 통과 후 push, PR 머지
  금지. 원 세션 맥락은 품질 보강이지 필수 입력이 아니다.
- 워크트리 경로 규약이 워커·일반 세션 모두 `<repo>/.worktrees/<bead-id>`로
  동일해서, PR Delivery가 보존한 외부 PR 워크트리는 `worktree.exists()`를
  그대로 통과한다.
- `dispatchReviseFix()`가 이미 "fresh 세션(`resume_session_id: null`) + cwd
  지정" 선례를 갖고 있다.

## 스코프

- 외부 행 충돌에 대해 attempt 없이 fresh headless 해소 세션을 디스패치하는
  경로 신설(서버) + 외부 행 [충돌 해소] 버튼 활성화(프론트).
- 외부 행 카드 톤 구분 표시(수식 클래스).
- UI-7agi·UI-5v7d 스펙 문서의 상충 조항 개정.

제외(2차 보강으로 기록만):

- PR Delivery 시 `session_id` 메타데이터 기록과 resume 승격 — 계약
  표면(dotfiles `docs/contracts/workflow.{md,yaml}`) 변경이 필요하고
  cross-machine 한계가 있어 1차에서 제외.
- 워크트리 부재 시 원격 브랜치에서 워크트리 재생성 — 워크트리 매니저에 기존
  브랜치 checkout add 신기능이 필요해 제외. 1차는 비활성 + 사유 툴팁.
- 충돌 해소 세션 자체의 동작 변경(UI-dxgz 현행 유지), poller/cleanup 경로
  변경 없음.

## 설계

### §1 서버 — `dispatchExternalConflict` (server/worker/scheduler.js)

`dispatchExternalConflict(workspace, bead_id)`를 신설한다.

- 가드(즉시 거부, 실패 attempt 기록 없음):
  - claimed 또는 running attempt 존재 → `bead_running`.
  - external 레지스트리(`externalPrs.get`)에 행 없음 → `not_external`.
  - `worktree.exists(repo, bead_id)` 실패 → `worktree_missing`.
- `repo`는 workspace의 대상 저장소, `target_base`는 클릭 시점 gh 관측의
  `base_ref`(pr-actions가 전달)로 하고 없으면 `main`.
- exec 4키는 큐 디스패치와 동일하게 `resolveExecSettings`(bead metadata >
  workspace `exec_defaults` > 하드코드 fallback)로 해석한다.
- `workflow_mode=fast_track` 스탬프 + readback + 종료 시 revert 계약을 기존
  dispatch/relaunch와 동일하게 따른다. 스탬프 실패는 기존 계약대로 failed
  attempt(`workflow_mode_record_failed` 등)를 기록한다.
- attempt 레코드: 신규 `attempt_id`, `resumed_from` 없음,
  `conflict_resolution: true`, `base_oid: null`(admission 없음),
  runner/model/effort는 exec 해석 결과.
- `launchSession` 호출: `wt_path = worktree.pathFor(repo, bead_id)`,
  `resume_session_id: null`, `launch_kind: 'conflict'`, 프롬프트는 기존
  `conflictPrompt(bead_id, target_base)` 재사용. command-guard의
  `conflict_resolution` 허용(merge-into-branch만, force-push·PR 머지 금지)도
  그대로 적용된다.
- 기록 정직성: 이 attempt는 워커가 실제로 실행하는 세션의 기록이므로
  external-pr.js의 "합성 attempt 금지" 원칙과 충돌하지 않는다. 단
  **queue.json 레인 멤버십은 계속 external overlay 소유**다 — attempt가
  기록되어도 bead는 durable 레인(items/pr_wait)에 들어가지 않고, attempt
  종결(성공·실패·폐기) 시에도 레인 이동·dequeue가 없어야 한다(§5 회귀
  테스트).
- cap-exempt: 사람 클릭 기원 디스패치이므로 기존 resolveConflict와 동일하게
  슬롯 cap을 기다리지 않는다.

### §2 서버 — 머지 클릭 분기 (server/worker/pr-actions.js)

`merge()`의 `is_external && isConflicting` 두 분기(첫 게이트, BEHIND
update-branch 후 재확인)의 `refuse('external_conflict_needs_session')`을
`dispatchExternalConflict` 호출로 교체한다. `in_flight` 보호·step 해제(`clearStep`)·결과
형태(`action: 'conflict_resolution'`)는 기존 `dispatchResolution`과 동일하게
유지한다. 관측된 `base_ref`를 디스패치에 전달한다.

### §3 서버 — 스냅샷 데코레이션 (server/ws/worker-handlers.js)

`withExternalPrWait` overlay 행에 `wt_present: boolean`을 추가한다
(`worktree.exists` 동기 확인). 그 외 변경 없음 — 해소 attempt가 running
목록에 실리면 클라이언트 `conflict_sessions` 맵, "충돌 해소 중" 배지, 머지
잠금은 기존 로직이 자동 동작한다.

### §4 프론트 (app/views/worker/index.js, lanes.js, CSS)

- `prWaitRow`의 `external_conflict` 무조건 거부를 제거한다. 외부 행 충돌 시:
  - `wt_present !== false` → [충돌 해소] 활성. 라벨·툴팁은 워커 행과 동일
    ("충돌 — 클릭하면 충돌 해소 세션을 띄웁니다 (머지하지 않음)").
  - `wt_present === false` → 비활성 + 툴팁 "워크트리 없음 — 세션에서 직접
    해소하세요".
  - 해소 세션 존재 시 잠금·배지는 기존 `conflict_session` 로직 그대로.
- 외부 행 구분 표시: 카드에 `worker-mini--external` 수식 클래스를 추가하고
  좌측 액센트 보더 + 미세 배경 틴트를 준다. '세션' 배지는 유지, 레인
  정렬(durable 뒤에 외부, 오래된 순)은 현행 유지.
- [폐기] 숨김, MERGED 외부 행의 [정리] 버튼 등 UI-7agi의 나머지 동작은
  변경하지 않는다.

### §5 테스트

- scheduler 단위: 가드 3종(`bead_running`/`not_external`/`worktree_missing`),
  attempt 필드(`resumed_from` 없음·`conflict_resolution`·`base_oid: null`),
  fast_track 스탬프/revert, cap-exempt.
- attempt 종결 시 durable 레인 불이동·dequeue 없음 회귀.
- pr-actions: 두 분기 교체(첫 게이트·BEHIND 후), `in_flight` 보호, `base_ref`
  전달.
- worker-handlers: overlay `wt_present` 존재/부재.
- 프론트 `prWaitRow`: 활성/비활성/툴팁/수식 클래스, 해소 세션 중 잠금.

### §6 스펙 정합 개정 (본 유닛 diff에 포함)

- `2026-07-28-external-pr-wait-lane-design.md`(UI-7agi): "충돌 시 외부 행은
  충돌 해소 버튼을 비활성화" 조항을 본 경로 기준으로 개정 — attempt-less
  디스패치로 활성화, 워크트리 부재 시에만 비활성.
- `2026-07-28-pr-wait-merge-queue-design.md`(UI-5v7d, 미구현): "충돌 해소가
  불가능한 외부 행은 드라이버의 거부→skip 경로" 조항을 개정 — 외부 행도 동일
  자동 해소 대상이며, `worktree_missing` 거부만 skip으로 남는다.
- 두 문서의 receipt 델타는 본 유닛 spec 게이트 리뷰가 커버한다.

## 오류 처리

- 디스패치 거부는 기존 refuse 사유 문자열 채널로 UI에 반환된다.
- 해소 세션이 실패해도(충돌 미해결 종료) 머지는 여전히 사람 클릭이며, 게이트
  재관측이 진실 소스다. 재클릭은 새 해소 세션을 디스패치한다(단 기존
  running/claimed 가드가 중복 디스패치를 막는다).
