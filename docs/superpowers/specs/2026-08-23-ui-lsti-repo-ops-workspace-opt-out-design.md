---
scope:
  - server/worker/queue-store.js
  - server/worker/repo-operation-coordinator.js
  - server/ws/connection.js
  - server/ws/worker-handlers.js
  - app/protocol.js
  - app/views/worker/repo-ops-settings.js
  - app/views/worker/repo-ops-timeline.js
  - app/views/worker/index.js
  - app/styles.css
---

# UI-lsti — 저장소 작업 verify/deploy를 workspace 단위로 opt-out하고 타임라인은 최근 항목만 펼친다

Bead: UI-lsti · route: spec_backed · 날짜: 2026-08-23

## 배경

Worker는 대상 base의 `repo-ops/config.toml`이 `[verify]`/`[deploy]`를 선언하면
머지 전 검증과 머지 후 배포를 항상 수행한다(UI-q0uy, UI-exua). 선언은 저장소가
소유하므로 "이 workspace에서는 검증/배포 없이 바로 머지·close하고 싶다"는 요구는
config를 지우는 커밋 말고는 방법이 없고, 그 커밋은 다른 workspace와 canonical
선언까지 바꿔 버린다. 사용자는 저장소 작업 선언 패널의 "머지 전 검증"·"머지 후
배포" 행에 체크박스를 두고, 해제된 쪽은 건너뛰고 머지가 진행되기를 원한다.

또 저장소 작업 타임라인은 `TIMELINE_LIMIT = 20`개를 한꺼번에 펼쳐 최근 상태를
읽기 어렵다. 최근 몇 개만 기본으로 보이고 나머지는 접혀 있어야 한다.

계약 위치: workspace 단위 opt-out은 dotfiles `docs/contracts/workflow-state.yaml`
`repo_operations`의 새 키 `workspace_opt_out`으로 정의된다(이 spec §6이 그
문안의 설계 SoT). beads-ui는 소비자다. `automation_policy`(projection
`generated/contracts/repo-operation-policy.json`)는 바뀌지 않으므로 재핀은 없다.

## 목표

1. 저장소 작업 선언 패널의 verify/deploy 행에 각각 체크박스가 있다. 기본값은
   체크(실행). 해제하면 그 workspace에서 해당 kind를 **선언 부재처럼** 취급한다.
2. verify 해제: 머지 게이트가 verify 단계를 만들지 않고(`verify_attempted=false`)
   PR/base/head 신선도·mergeability·리뷰 영수증만으로 판정한다. PR 행 배지는
   선언 없음일 때와 같다(검증 배지 없음).
3. deploy 해제: 머지 후 정리 cursor가 `repo_operations` 단계에서 배포 작업을 만들지
   않고 곧바로 close로 진행한다. Worker-dispatched quick_fix 랜딩도 같다.
4. 선언 자체(스크립트·timeout)는 계속 보이고, 해제 상태는 행을 흐리게 하고
   "이 workspace에서 건너뜀" 배지를 붙여 명시한다.
5. 타임라인은 최근 5개만 기본 펼침, 미해결 행은 항상 노출, 나머지는
   "이전 n개 더 보기"로 펼친다.

## 비목표

- `repo-ops/config.toml` 스키마·해석(`repo-ops-resolver.js`) 변경.
- 자동 해결 사다리·`auto_repair`·해결 필요 계산 변경.
- 이미 만들어진(queued/running/failed) 작업의 취소나 supersede. opt-out은 **새
  작업 생성**만 막는다.
- 전역(모든 workspace) 기본값, workspace kv(`bd kv`) 저장. 값은 Worker
  `queue.json`에만 산다(`auto_repair`와 같은 층).
- beads-ui 자기 저장소의 배포 정책 완화: AGENTS.md "Post-Merge Runtime Validation"은
  그대로다. 이 workspace에서는 체크박스를 해제하지 않는 것이 운영 규칙이다.

## 설계

### 1. 저장 — `server/worker/queue-store.js`

- `Queue`에 `repo_ops_opt_out: { verify: boolean, deploy: boolean }` 추가.
  `emptyQueue()` 기본 `{ verify: false, deploy: false }`, persisted key 목록에
  등록, 로더는 `raw.repo_ops_opt_out?.verify === true` 식으로 불리언만 채택
  (키 부재·비객체 → 둘 다 `false`).
- setter `setRepoOpsOptOut(workspace, { expected_revision, kind, opted_out })`:
  `toggleAutoRepair`와 같은 CAS 변이. `kind ∉ {verify, deploy}`면 `false` 반환.

### 2. 적용 — `server/worker/repo-operation-coordinator.js`

- `hasConfig(sha, options)`: 반환에 `verify_opted_out`, `deploy_opted_out`
  불리언을 더하고, verify가 opt-out이면 `verify_script_path: null`,
  `verify_timeout_ms: null`로 돌려 `pr-actions.gateNow`·`pr-poller`가 현행
  "verify 선언 없음" 분기를 그대로 탄다. `present`는 선언 사실이므로 불변.
- `ensureVerifyLocked`: 정책 해석 직후 `queue.repo_ops_opt_out.verify === true`면
  `{ ok: true, inert: true, opted_out: true }` 반환(candidate checkout을 만들지
  않는다). `ensureDeployLocked`도 대칭으로 `{ ok: true, inert: true, opted_out: true }`.
  기존 callers(`pr-actions`, `quickfix-landing`)는 `inert`를 이미 처리한다.
- 표시 캐시(`repo-ops-display.js`)는 건드리지 않는다. 선언은 선언대로 보인다.

### 3. 전송 — `server/ws/connection.js`, `server/ws/worker-handlers.js`, `app/protocol.js`

- 요청 `worker-repo-ops-opt-out-toggle` payload
  `{ kind: 'verify'|'deploy', opted_out: boolean, expected_revision }`.
  핸들러는 `worker-auto-repair-toggle`과 같은 CAS/충돌 응답 형식, 성공 시 fanout.
- `decorateQueue`가 `public_queue.repo_ops_opt_out`을 그대로 내보낸다.
- `decorateQueue`의 PR 행 투영: `prObservationsFor(workspace_key, queue,
  verify_policy)`에 넘기는 `verify_policy`는 `repoOpsVerifyPolicy(repo_ops)` 결과를
  `queue.repo_ops_opt_out.verify === true`일 때 `declaration_state: 'absent'`로
  바꾼 값이다(`base_sha`는 유지). 표시용 `repo_ops`(선언 캐시)는 그대로 내보내므로
  선언 패널은 스크립트를 계속 보이고, PR 행만 "verify 선언 없음"과 같은 배지
  상태가 된다(검증 배지 없음). 서버 유틸 `effectiveVerifyPolicy(repo_ops, queue)`
  한 곳이 이 규칙을 소유하고 직접 테스트한다.
- `app/protocol.js` 요청 enum에 이름 추가.

### 4. 선언 패널 — `app/views/worker/repo-ops-settings.js`

- `repoOpsDeclarationSection`의 각 lane(`data-lane=verify|deploy`)에, 선언이
  있을 때만 `<label><input type="checkbox" class="worker-repo-ops__lane-run">이
  workspace에서 실행</label>`을 둔다. checked = `!opt_out[kind]`.
- 변경 시 `saveRepoOpsOptOut(kind, !checked)` → 전송 → 충돌이면 1회 재시도
  (`saveAutoRepair`와 같은 패턴).
- opt-out 상태 lane은 `worker-repo-ops__lane--skipped` 클래스로 흐리게, 설명
  문장을 verify는 "이 workspace에서는 검증 없이 판정합니다.", deploy는 "이
  workspace에서는 배포 없이 곧바로 정리로 넘어갑니다."로 바꾸고
  `badge('skipped', '이 workspace에서 건너뜀')`을 붙인다.
- 선언 없음(`repo_ops.verify === null`)이면 체크박스를 그리지 않는다(건너뛸 것이
  없다).
- 스타일(`app/styles.css`): `.worker-repo-ops__lane--skipped`는 lane 값·설명을
  `opacity: .55`로 흐리고, `.worker-repo-ops__lane-run`(체크박스 label)은 기존
  `.worker-repo-ops__repair-toggle`과 같은 인라인 라벨 규칙을 재사용한다.
  `badge('skipped', …)`는 기존 `absent` 배지 색을 쓴다. 타임라인 "더 보기" 버튼은
  기존 `.worker-ev__btn` 클래스를 재사용하고 rail 아래 여백만 추가한다.

### 5. 타임라인 — `app/views/worker/repo-ops-timeline.js`

- `RECENT_LIMIT = 5` 추가. 새 순수 함수
  `timelineView(operations, cleanup_failures, { expanded })`가 **전체** 이벤트
  목록(`timelineEvents(..., Infinity)` — 선행 20개 자르기 없음)에서 표시 집합을
  고른다:
  - `unresolved` = operation `state ∈ {failed, repairing, running, queued,
    retry_pending}`이며 `dismissed` 아님·`superseded_by` 없음인 행 + cleanup 항목
    전체. **나이에 관계없이 항상 표시**(20개보다 오래돼도 포함).
  - `expanded=false`: `visible` = 최신 `RECENT_LIMIT`개 ∪ `unresolved`(시간순 유지),
    `hidden` = 전체 − visible 수.
  - `expanded=true`: `visible` = 최신 `TIMELINE_LIMIT`(20)개 ∪ `unresolved`,
    `hidden` = 그 밖의 수(0이면 버튼 없음).
  - `hidden > 0`이면 rail 아래 `<button data-seam="repo-ops-more">이전 ${hidden}개
    더 보기</button>`, 펼친 상태에서는 같은 seam이 `접기`.
- drawer 모델에 `expanded: boolean`을 둔다. `open()`은 `false`로 초기화,
  `refresh()`는 이벤트만 갱신하고 `expanded`를 **보존**한다(큐 스냅샷 갱신으로
  접히지 않는다), `close()`는 모델을 비운다. 더 보기 클릭은 `expanded`를 토글하고
  재렌더한다.

### 6. 계약 문안 (dotfiles, 별도 quick_fix Bead)

`docs/contracts/workflow-state.yaml` `repo_operations`에 sibling 키:

```yaml
  workspace_opt_out:
    keys: [verify, deploy]
    surface: worker_workspace_setting
    trigger: user_action_only
    default: declared_operations_run
    semantics: opted_out_kind_treated_as_undeclared_for_new_operations
    scope: one_workspace_only_declaration_and_other_workspaces_unchanged
    existing_operations: unaffected
```

`workflow-contract.md` "Repo operations and deployment"에 한 문장: 사용자 행위로
workspace가 선언된 verify/deploy를 opt-out할 수 있고, opt-out된 kind는 그
workspace의 새 작업에서만 선언 부재로 취급되며 선언·다른 workspace·기존 작업은
바뀌지 않는다. `never_automatic.config_or_script_deletion_to_bypass_gate`와
충돌하지 않는다(자동 우회가 아니라 사용자 설정).

beads-ui는 이 Bead가 foreign `blocks`로 막히는 dotfiles Bead가 closed된 뒤 구현에
진입한다.

## 오류 처리 요약

| 상황 | 서버 | 클라이언트 |
|---|---|---|
| `kind` 무효 / `opted_out` 비불리언 | 변이 거부(`false`), revision 불변 | 체크 상태 원복 |
| CAS 충돌 | `conflict` 응답 + 최신 queue | 최신 revision으로 1회 재시도 |
| opt-out 상태에서 verify/deploy 작업이 이미 running | 영향 없음(계속 실행·settle) | 타임라인에 그대로 보임 |
| 선언 없음 + opt-out 값 true | 무해(어차피 inert) | 체크박스 없음 |

## 테스트 계획

RED → GREEN seam:

1. `server/worker/queue-store.test.js` — 기본값 `{verify:false, deploy:false}`,
   `setRepoOpsOptOut` CAS 성공/충돌/무효 kind, 디스크 round-trip.
2. `server/worker/repo-operation-coordinator.test.js` — verify opt-out 시
   `ensureVerify`가 `{ok:true, inert:true, opted_out:true}`이고 materialize가
   호출되지 않음; `hasConfig`가 `verify_script_path:null`·`verify_opted_out:true`;
   deploy opt-out 시 `ensureDeploy` inert·runner 미호출; opt-out 해제 후 정상 생성.
3. `server/worker/pr-actions.test.js` — verify opt-out workspace에서 `gateNow`가
   `verify_attempted:false`로 eligible; deploy opt-out에서 머지 후 cleanup이
   `ensureDeploy`로부터 `{ok:true, inert:true, opted_out:true}`를 받아
   `waitForDeployTerminal` 호출 없이 `closeCoveredRow`로 간다(호출부는 현행 inert
   분기 그대로, 생략하지 않는다).
4. `server/ws/*` — `worker-repo-ops-opt-out-toggle` 왕복과 fanout의
   `repo_ops_opt_out` 노출; `effectiveVerifyPolicy`가 opt-out 시
   `declaration_state:'absent'`를 돌려 `pr_observations[].verify_receipt_state`에
   검증 배지가 없고, 표시용 `repo_ops.verify`는 그대로인 단언.
5. `app/views/worker/repo-operations.test.js` — 체크박스 렌더·클릭 → 전송
   payload, opt-out lane의 `--skipped` 클래스와 배지, 선언 없음이면 체크박스
   없음.
6. `app/views/worker/repo-ops-timeline.test.js` — `timelineView`: 8개 이벤트 중
   5개만 보이고 "이전 3개 더 보기"; 25개 중 가장 오래된(21번째 이후) failed
   미해결 행이 접힌 상태와 펼친 상태 모두에서 보임; 더 보기 클릭 후 20개+미해결;
   `refresh()` 뒤에도 `expanded`가 유지됨.

회귀: Pre-Handoff Validation(`npm run tsc`·`npm test`·`npm run lint`·
`npm run prettier:write`·`npm run build`).

## 구현 unit 후보 (advisory)

단일 유닛. 저장·적용·전송·표시가 한 필드를 공유하므로 나누지 않는다.

## 수용 기준

1. dotfiles workspace에서 verify 체크를 해제하고 머지를 누르면 verify 작업이
   생기지 않고 PR이 리뷰 영수증만으로 머지된다; deploy 체크를 해제하면 머지 후
   배포 작업 없이 Bead가 closed된다. 다시 체크하면 현행 동작으로 돌아온다.
2. 선언 패널이 해제된 행을 흐림 + "이 workspace에서 건너뜀"으로 보여 주고
   스크립트·timeout 표시는 유지된다.
3. 타임라인이 기본 5개 + 미해결 행만 펼치고 "이전 n개 더 보기"로 나머지를 연다.
4. Pre-Handoff Validation 통과, PR → merge → `bdui-shared` 배포 증거 → closed.
