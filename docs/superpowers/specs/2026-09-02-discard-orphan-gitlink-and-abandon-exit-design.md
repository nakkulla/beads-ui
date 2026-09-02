---
scope:
  - server/worker/recovery-archive.js
  - server/worker/discard-phase.js
  - server/worker/discard-coordinator.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/pr-actions.js
  - server/worker/pr-poller.js
  - server/worker/resolve-session.js
  - server/worker/attach.js
  - server/ws/
  - app/protocol.js
  - app/views/worker/
  - app/views/monitor/
---

# 폐기 아카이브의 고아 gitlink 분류와 영구 실패 폐기 작업의 [폐기 포기] 출구

Bead: `UI-b93d` (UI-3si1 통합) · 2026-09-02

발단은 2026-08-31 `PROSTATE-0yz`의 [폐기]가 두 번 연속
`submodule_observation_failed`로 실패한 사건이다. 원인은 둘로 갈린다.
**진입** — `recovery-archive.js`가 `.gitmodules` 매핑 없는 gitlink(고아
gitlink)를 "관측 실패"로 뭉뚱그려 fail-closed한다. **출구** — 아카이브가 영구
실패한 discard operation에는 terminal 경로가 없어 그 bead는 모든 조작에서
영구 차단된다. 이 문서는 둘을 한 번에 정한다. 실패 알림은 `UI-jw27`·`UI-e98l`이
이미 넣었고(ADR 0022), 이 스펙은 그 알림이 도달한 뒤 사람이 누를 출구다.

사용자 결정(2026-09-02, 이 세션):

1. 고아 gitlink는 **매핑 부재 + 워크트리 경로 부재 또는 빈 디렉터리**일 때만
   "서브모듈 아님"으로 판정해 아카이브 대상에서 제외한다. 안에 무엇이든 있으면
   fail-closed다.
2. 출구는 **[폐기 포기] 클릭 → terminal phase `abandoned`**다. 재시도 한도
   자동 종단과 백업 없는 폐기는 채택하지 않는다.
3. 포기는 **`requested`(아카이브 단계) 실패에서만** 허용한다.

## §0 현행 결함과 실측

### §0.1 분류 없음 (`recovery-archive.js`)

`assertSubmodulesClean(worktree)`는 `git submodule status --recursive`를 인자
없이 돌리고, 그 명령이 throw하면 `ArchiveError('submodule_observation_failed')`다.
인벤토리 단계의 `assertNotSubmodule`은 변경 파일이 mode `160000`이면
`dirty_submodule`이다.

실험(git 2.50.1, 이 세션의 scratchpad 저장소)으로 확인한 사실:

| 상황 | `git submodule status --recursive` | `git status` / `git diff HEAD` | 인벤토리에 잡히나 |
| --- | --- | --- | --- |
| 고아 gitlink, 워크트리 경로 부재 | fatal (rc 128) | ` D <path>` | 예 → `dirty_submodule` |
| 고아 gitlink, 빈 디렉터리 (checkout이 만드는 형태) | fatal | 깨끗 | 아니오 |
| 고아 gitlink, `.git` 없는 일반 파일 포함 | fatal | 깨끗 — git은 그 파일을 **보지 못한다** | 아니오 (백업 없이 사라질 파일) |
| 고아 gitlink, 중첩 저장소 포함 | fatal | ` M <path>` | 예 → `dirty_submodule` |
| 고아 + 매핑된 서브모듈 공존, pathspec 없음 | fatal | — | — |
| 고아 + 매핑된 서브모듈 공존, `-- <매핑 경로>` | 정상 (rc 0), 줄 형식 동일 | — | — |
| 매핑됨, 가리키는 객체 부재 | 접두사 `+` | — | 현행 `dirty_submodule` |
| 매핑됨, 미초기화 | 접두사 `-` | — | 현행 `dirty_submodule` |

prostate 사건은 두 번째 줄이다. 워크트리의 자기 HEAD(`e60d1b0`)가 gitlink를
갖고 있어 `origin/main`을 고쳐도(`PROSTATE-nm3`) 그 워크트리는 그대로 죽는다.

### §0.2 출구 없음

- `queue-store.js`의 `discard_operations`는 `set`만 있고 terminal은
  `completeDiscardOperation`의 `phase: 'done'` 하나다. `failDiscardOperation`은
  `last_error`만 채우고 같은 phase에 둔다.
- 활성 판정이 서버 여러 곳(`queue-store.js` `hasActiveDiscardOperation`,
  `scheduler.js`·`pr-actions.js`의 `discardActive`, `pr-poller.js`,
  `resolve-session.js`, coordinator 자신 등 — 전수는 §2.1 표)과 UI(`lanes.js`
  `discardProjection`)에서 각각 `phase !== 'done'`으로 구현되어, 실패한
  작업이 계속 "진행 중"이다.
  재디스패치·드래그·resume·pause·stop·stale-work 액션·merge·cleanup이 전부
  막힌다.
- WS 액션은 `worker-discard` 하나이며 `operation_id`를 실으면
  `discardCoordinator.retry()`다. 취소·포기 핸들러는 없다.
- `discard-coordinator.js` `recover()`는 `!record.last_error` 조건으로 실패한
  작업을 명시적으로 건너뛴다. 재시작으로도 풀리지 않는다.
- `archiveDiscardSource()`는 owned runner에 **SIGSTOP**을 보낸 뒤 아카이브하며,
  실패 시 의도적으로 CONT를 보내지 않는다(같은 id 재시도를 위해). 즉 실패한
  작업의 runner는 얼어 있다.

## §1 고아 gitlink 분류 (`server/worker/recovery-archive.js`)

### §1.1 정의

- **gitlink**: index의 mode `160000` 항목.
- **매핑**: `.gitmodules`의 `submodule.<name>.path` 값. 비교 전
  `path.posix.normalize`로 정규화하고 끝의 `/`를 뗀다.
- **고아 gitlink**: 매핑이 없는 gitlink. 다음 둘 중 하나일 때만 "서브모듈
  아님"으로 확정한다.
  - 워크트리에 그 경로가 없다(`lstat` ENOENT).
  - 그 경로가 빈 디렉터리다(`readdir`이 0개).
- 그 밖(파일·심볼릭 링크·비어 있지 않은 디렉터리·중첩 저장소)은 **내용 있는
  고아**이며 fail-closed다. git이 보지 못하는 파일을 백업 없이 잃지 않기
  위해서다.

가리키는 커밋 객체의 존재 여부는 판정에 쓰지 않는다. 매핑 없이는 어차피
서브모듈이 아니고, 객체가 부모 저장소에 있으면 이미 보존된 것이다.

### §1.2 절차 — `classifySubmodules(worktree)`

`assertSubmodulesClean`을 다음 절차로 바꾸고, 이름은
`classifySubmodules`로 한다. 반환은 `{ orphan_gitlinks: string[] }`(정렬).

1. `git ls-files --stage -z`로 gitlink 경로를 모은다. 실패는 기존
   `git_index_observation_failed`.
2. `.gitmodules`가 워크트리에 없으면 매핑 0개. 있으면
   `git config --file .gitmodules --list -z`로 읽어 `submodule.*.path` 값을
   모은다(`--list`는 항목이 없어도 rc 0이라 "없음"과 "실패"가 갈린다). 명령
   실패는 `submodule_observation_failed`.
3. 매핑 없는 gitlink마다 §1.1 판정을 한다. 내용이 있으면
   `orphan_gitlink_content:<path>`, `lstat`/`readdir`이 ENOENT 외 오류로
   실패하면 `submodule_observation_failed`.
4. 매핑된 gitlink(매핑 ∩ gitlink)가 하나라도 있으면
   `git submodule status --recursive -- <그 경로들>`을 돌린다. 줄 검사(접두사
   `' '` 외 → `dirty_submodule`, 서브모듈 안 `git status --porcelain=v1
   --untracked-files=all` 비어 있지 않음 → `dirty_submodule`, 명령 실패 →
   `submodule_observation_failed`)는 현행 그대로다. 매핑된 gitlink가 없으면
   이 단계는 건너뛴다.

pathspec을 매핑된 경로로 한정하는 것이 고아와 공존하는 서브모듈 검사를 살리는
핵심이다(§0.1 표 6행).

### §1.3 인벤토리와 manifest

- `create()`는 `classifySubmodules`의 `orphan_gitlinks`를 인벤토리 루프에
  넘긴다. 루프는 그 경로를 **`assertNotSubmodule` 전에 건너뛴다**(경로 부재
  시 ` D`로 잡히는 항목이 이것이다). 다른 경로의 `assertNotSubmodule`은 불변.
- manifest에 `orphan_gitlinks: string[]`를 항상 넣는다(빈 배열 포함). "무엇을
  백업하지 않았는가"를 archive가 스스로 말하게 하기 위해서다.
- `ARCHIVE_SCHEMA_VERSION`은 올리지 않는다. `verify()`는 이 키를 요구하지
  않으므로 기존 archive와 새 archive를 같은 코드가 읽는다.
- `createBranch`·`createCommittedSource`는 원래 서브모듈 검사를 하지 않는다
  (`excluded`에 `submodule-and-special-file-checks`). 불변.

### §1.4 오류 어휘

| reason | 의미 | 사용자가 할 일 |
| --- | --- | --- |
| `orphan_gitlink_content:<path>` | 매핑 없는 gitlink 경로에 내용이 있다 | 저장소에서 그 경로를 정리한 뒤 재시도, 또는 포기 |
| `dirty_submodule` | 매핑된 서브모듈이 dirty·미초기화·객체 부재 | 서브모듈 정리 후 재시도 (현행) |
| `submodule_observation_failed` | git 명령 자체가 실패해 판정 불능 | git 환경 확인 (현행) |
| `git_index_observation_failed` | index를 읽지 못함 | (현행) |

새 토큰은 `orphan_gitlink_content` 하나다. 형식은 기존
`pr_state_invalid:<state>`처럼 `:` 뒤에 경로를 붙인다.

## §2 terminal phase `abandoned`

### §2.1 공유 헬퍼 `server/worker/discard-phase.js`

Node 의존 없는 순수 모듈이다(app이 server의 순수 모듈을 import하는 선례:
`app/views/monitor/drop-plan.js` → `server/worker/lane-order.js`).

```js
export const DISCARD_TERMINAL_PHASES = Object.freeze(['done', 'abandoned']);
/** @param {{ phase?: unknown }|null|undefined} operation */
export function discardOperationActive(operation) { ... }
```

`phase !== 'done'` / `phase === 'done'`을 직접 비교하는 자리를 **전부** 이
헬퍼로 바꾼다. 아래 표는 `grep "phase [!=]== 'done'"`(테스트·번들 제외)로
열거한 현행 전수이며, 구현은 같은 grep이 0건이 될 때까지 바꾼다.

| 파일 | 자리 | 의미 |
| --- | --- | --- |
| `server/worker/queue-store.js` | `hasActiveDiscardOperation`, `createDiscardOperation`의 기존 작업 탐색 2곳, held 집합(`discard_operations` 순회), active 집합(`discard_operations` 순회), `activeDiscardBeadIds` | 활성 판정 |
| `server/worker/scheduler.js` | 직렬 레인 점유 계산(`discard_operations` 순회로 `occupy`), `activeBeadIdsFrom`, `discardActive`, `recoverControls`의 `discard_attempts` | 활성 판정 |
| `server/worker/pr-actions.js` | `discardActive` | 활성 판정 |
| `server/worker/pr-poller.js` | `active_discard` (PR 관측을 coordinator로 넘길지) | 활성 판정 |
| `server/worker/resolve-session.js` | 폐기 실패 행의 `failure_class` 판정 | 활성 판정 — `abandoned`는 [세션에서 해결] 대상이 아니다 |
| `server/worker/attach.js` | `discardWorkerBead`의 `operation_id` 재시도 판정 | 활성 판정 |
| `server/worker/discard-coordinator.js` | `discard()`의 기존 작업 재사용 탐색, 생성 실패 뒤 `concurrent` 탐색, `backupFresh`의 stale-work 진행 중 판정, `recover`, `recoverFences`, `observeBead`, `retry` | 활성 판정 |
| `server/worker/discard-coordinator.js` | `driveOperation`의 `phase === 'done'` 분기 | terminal 분기 — `abandoned`면 아무것도 하지 않고 `{ ok: false, reason: 'operation_abandoned' }` |
| `server/ws/worker-handlers.js` | `publicDiscardOperations` | 공개 투영 — `abandoned`는 `done`처럼 투영에서 제외 |
| `app/views/worker/lanes.js` | `discardProjection`의 활성 작업 선택 | 활성 판정 |

`worker-handlers.js` `handleWorkerDiscard`의 `discarded: phase === 'done'`은
"폐기 완료" 판정이라 그대로 둔다(`abandoned`는 완료가 아니다).
`record-retention.js`는 레코드를 통째로 보존하므로 불변이다.

`abandoned`는 `done`과 똑같이 비활성이다. 따라서 포기 뒤에는 같은 bead에 새
[폐기]가 새 `operation_id`로 새 작업을 만든다(`createDiscardOperation`과
`discard()`의 재사용 탐색이 비활성 작업을 보지 않으므로).

### §2.2 `queue-store.js` — `abandonDiscardOperation`

```
abandonDiscardOperation(workspace, { operation_id, resume })
  → QueueOpResult (& reason)
```

- CAS 조건: 작업 존재(`operation_not_found`), `phase === 'requested'`
  (`phase_not_abandonable`), `last_error`가 문자열(`operation_not_failed`).
- 쓰기: `phase: 'abandoned'`, `abandoned_at: now()`,
  `abandon_resume: resume`. **`last_error`는 보존한다** — 무엇 때문에
  포기했는지가 기록이다.
- `completeDiscardOperation`과 달리 레인·`admission`·`cleanup_failed`·attempt
  레코드는 **건드리지 않는다**. 폐기가 수행되지 않았으므로 bead는 폐기 이전
  자리에 그대로 있다. 작업 생성 시 `merge_queue`에서 뺀 항목은 되돌리지
  않는다(사용자가 다시 넣는다).
- `DiscardOperation` typedef와 `normalizeDiscardOperation`에
  `abandoned_at: number|null`, `abandon_resume:
  'continued'|'gone'|'recycled'|null`을 더한다. 재시작 후에도 남는다.

### §2.3 `discard-coordinator.js` — `abandon(operation_id)`

순서가 핵심이다. 시그널을 write보다 먼저 두는 이유는 "포기됐는데 runner는
얼어 있음"이 "runner는 풀렸는데 작업은 실패 상태"보다 나쁘기 때문이다.

1. `operationOf(operation_id)`. 없으면 `operation_not_found`,
   `phase !== 'requested'`면 `phase_not_abandonable`, `last_error` 없으면
   `operation_not_failed`. 이 셋은 store CAS와 같은 어휘다.
2. `process_identity`가 있으면: `deps.processController`가 없으면
   `process_controller_missing`으로 거부. `probe(identity)`가 `owned`면
   `signal(identity, 'SIGCONT')` — 실패하면 `continued.reason ||
   identity_<state>`로 거부하고 **아무것도 쓰지 않는다**(`last_error`도
   그대로). `gone`·`recycled`면 재개할 대상이 없으므로 그 상태를 `resume`으로
   들고 진행한다. `unknown`은 "대상 없음"이 아니라 **소유권 판정 불능**이다
   (`inspect_failed`·`leader_gone_group_alive`·`group_probe_failed` 등) —
   SIGSTOP된 runner가 남아 있을 수 있으므로 `identity_unknown:<reason>`으로
   거부하고 아무것도 쓰지 않는다. 사용자는 원인이 걷힌 뒤 다시 누른다.
   identity가 없으면 `resume = null`.
3. `deps.store.abandonDiscardOperation(workspace, { operation_id, resume })`.
   `ok`가 아니면 그 `reason`으로 거부.
4. `deps.scheduler.unfenceDiscardAttempt?.(operation.attempt_id)` (§2.4).
5. `notifyChanged(workspace)`. 반환
   `{ ok: true, operation_id, phase: 'abandoned', resume }`.

Discord 알림은 **없다**. 사용자 클릭의 결과이고 ADR 0022의 알림은 "기계가
terminal 기록을 쓰는 순간"만 대상이다.

동시성: `retry()`는 drive 전에 `last_error`를 지우므로 재시도 중 포기는
`operation_not_failed`로 자연히 거부된다. 반대로 포기 뒤 뒤늦게 도는
`failDiscardOperation`/`advanceDiscardOperation`은 `expected_phase:
'requested'` CAS가 `phase_mismatch`로 막는다. 새 락은 없다.

### §2.4 `scheduler.js` — `unfenceDiscardAttempt`

`fenceDiscardAttempt`는 attempt를 `stopped`에 넣어 runner의 exit를 "이미
정리된 attempt"로 처리하게 한다. 같은 집합을 사용자의 ⏸/■도 쓴다. 포기가
남의 fence를 지우지 않도록:

- `fenceDiscardAttempt`는 **자기가 새로 넣은** attempt만 `discard_fenced`
  집합에 기록한다(이미 `stopped`에 있던 attempt는 기록하지 않는다).
- `unfenceDiscardAttempt(attempt_id)`는 `discard_fenced`에 기록이 있는
  attempt만 두 집합에서 뺀다. 기록이 없으면 아무것도 하지 않고 `false`.
- fence 상태에서 runner가 이미 exit했다면 exit 핸들러가 `stopped`에서 이미
  뺐다. 그 뒤 unfence는 no-op이다(fail-quiet).
- `finalizeDiscardAttempt`(정상 폐기 완료)는 `discard_fenced` 기록도 지운다.

### §2.5 WS 액션 `worker-discard-abandon`

- payload `{ bead_id, operation_id, expected_revision }`. 검증·revision
  CAS·attachment 경유는 `handleWorkerCleanupRetry`와 같은 형태다.
  `attach.js`에 `abandonWorkerDiscard(workspace_root, input)`을 더해
  `att.discardCoordinator.abandon(operation_id)`로 잇는다. 작업의
  `bead_id`가 payload와 다르면 `operation_not_found`.
- 응답 `{ bead_id, operation_id, abandoned: boolean, conflict: boolean,
  reason: string|null, resume, queue }`.
- 타임라인 두 건, 역할이 다르다.
  - 클릭 기록: `recordUserAction(key, bead_id, 'discard_abandon', '[폐기 포기]
    클릭')` — 거부된 클릭도 남는다([정리 재시도]와 같은 관행).
  - **결과 기록(성공에만)**: 응답이 `abandoned: true`일 때만
    `recordTimelineEvent`로 `kind: 'user_action'`, `seq:
    'discard_abandoned:<revision>'`, `summary: '폐기 포기 — 폐기 미수행 (원인:
    <last_error>)'`를 쓴다. 거부된 포기는 이 이벤트를 쓰지 않는다. 기존 closed
    kind 어휘(`bead-timeline.js` `TIMELINE_KINDS`)는 늘리지 않는다.
- 알림 문구: `discard-coordinator.js` `announceDiscardFailure`의
  `next_action`을 `'재클릭·[폐기 포기]·[세션에서 해결]'`로 바꾼다. 실패 알림이
  사용자에게 출구 집합을 말해 주는 자리이므로 출구가 늘면 문구도 는다.
- `server/ws/connection.js` dispatch와 `app/protocol.js` `MessageType`에
  등록한다.

### §2.6 `recover()`와 재시작

`recover()`는 불변이다. 실패한 작업은 재시작 후에도 사용자의 [재시도]·[폐기
포기] 클릭을 기다린다. `recoverFences()`는 §2.1 헬퍼로 `abandoned`를
건너뛰므로 재시작이 포기된 attempt에 fence를 다시 세우지 않는다.

## §3 화면 (`app/views/worker/lanes.js`, Worker·Monitor 공유)

### §3.1 `discardProjection` — `abandon` 슬롯

반환에 `abandon: { action: boolean, label: string, title: string }`를 더한다.

- `action`: 활성 작업이 있고 `operation.phase === 'requested'`이며 `error`가
  있을 때만 `true`.
- `label`: `stale_work_backup_fresh`면 `백업 포기`, 아니면 `폐기 포기`.
- `title`: discard — `실패한 폐기 작업을 포기합니다 — 백업·폐기는 수행되지
  않았고 bead는 폐기 이전 상태로 돌아갑니다`; stale — `실패한 백업 작업을
  포기합니다 — 원본은 그대로 남고 새로 시작하지 않습니다`.

버튼(`worker-mini__discard-abandon`, `data-bead-id`·`data-operation-id`)의
자리는 액션 foot이다. 실패한 폐기 행(폐기 버튼이 `재시도`/`백업 정리 재시도`
라벨인 행)의 순서는 정확히 **`[재시도] → [폐기 포기] → [세션에서 해결]`**이다.
같은 실패 행이 내는 출구들이고 재시도가 먼저 읽혀야 한다는 UI-jw27 §4의
규칙을 따르되, 현행 `lanes.js`가 `[세션에서 해결]`을 폐기 버튼 앞에 그리는
순서는 이 행에서만 바뀐다(되돌리는 정도가 약한 것부터: 재시도 → 포기 →
세션). 폐기 버튼이 `폐기`/`백업 후 새로 시작` 라벨인 행(실패 없음)은 현행
순서 그대로다.

### §3.2 문구

- 확인(discard): `<bead_id>: 실패한 폐기 작업을 포기합니다. 백업과 폐기는
  수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다. 계속할까요?`
- 확인(stale): `<bead_id>: 실패한 백업 작업을 포기합니다. 백업은 만들어지지
  않았고 기존 작업은 그대로 남습니다. 계속할까요?`
- 성공 토스트: `폐기 포기됨 · 폐기는 수행되지 않았습니다 (원인:
  <last_error>)`. stale은 `백업 포기됨 · 기존 작업은 그대로 남습니다 (원인:
  <last_error>)`.
- 거부 토스트: `폐기 포기 거부: <reason>`.
- `discardPhaseLabel('abandoned')` → `폐기 포기됨`. projection은 비활성
  작업을 고르지 않으므로 카드에는 보통 나타나지 않지만, raw phase를 그리는
  독자가 "완료"로 오독하지 않게 둔다.

문구 함수(`discardAbandonConfirmationMessage`,
`discardAbandonCompletionMessage`)는 `lanes.js`에 두고 Worker·Monitor가
verbatim 공유한다(기존 `discardConfirmationMessage`와 같은 위치).

### §3.3 실패 원인 안내 — `discardFailureGuidance(error)`

닫힌 목록이다. 목록 밖 원인은 현행 문구 그대로(fail-quiet).

| `last_error` | 안내 |
| --- | --- |
| `orphan_gitlink_content:<path>` | `매핑 없는 gitlink 경로 <path>에 내용이 있습니다 — 저장소에서 그 경로를 정리한 뒤 재시도하거나 포기하세요` |
| `dirty_submodule` | `서브모듈에 미커밋 변경이나 미초기화 항목이 있습니다 — 정리 후 재시도하세요` |
| `submodule_observation_failed` | `서브모듈 상태를 읽지 못했습니다 (git 오류) — 워크트리에서 git 명령을 직접 확인하세요` |

안내는 두 곳에 붙는다: [재시도] 버튼 `title`(`폐기 실패: <error> — <안내>`)과
`discardReceiptTemplate`의 실패 줄.

### §3.4 포기 뒤 화면

카드는 폐기 이전 모습으로 돌아간다(활성 작업이 없으므로 영수증 줄이
사라지고 [폐기]가 다시 보인다). 카드에 영구 배지를 남기지 않는다 — 폐기
이전 상태로의 복귀가 곧 정직한 표시다.

"실제로 폐기가 수행되지 않았다"는 사실이 **영구적으로** 보이는 자리는
§2.5의 결과 이벤트가 닿는 두 표면이다. 성공 토스트는 보조일 뿐이다.

- 이슈 상세(bead 페이지)의 "Worker 이력" 섹션(`get-bead-timeline`,
  `app/views/detail-panel/index.js`) — bead가 어느 레인(후보·대기·실행·PR
  대기)으로 돌아가든 같은 자리에서 읽힌다.
- 실패·파킹 타일의 최근 이력 5줄(`bead_timelines` → `lane-model.js`
  `timelineFields`) — bead가 그 상태로 돌아갔을 때.

durable 근거는 `queue.json`의 `abandoned` 레코드(`last_error`·`abandoned_at`·
`abandon_resume` 보존)다.

Worker(`app/views/worker/index.js`)와 Monitor(`app/views/monitor/index.js`)
모두 클릭을 `worker-discard-abandon`으로 보낸다. revision 충돌 시 1회
재전송은 기존 `discardBead`와 같다.

## §4 수용 기준

1. `.gitmodules` 매핑 없는 gitlink만 있고 그 경로가 부재이거나 빈
   디렉터리인 워크트리에서 `create()`가 성공하고, manifest
   `orphan_gitlinks`에 그 경로가 기록된다.
2. 고아 gitlink 경로에 내용(파일·심볼릭 링크·비어 있지 않은 디렉터리·중첩
   저장소)이 있으면 `orphan_gitlink_content:<path>`로 실패한다.
3. 매핑된 dirty·미초기화·객체 부재 서브모듈은 고아 gitlink 동반 여부와
   무관하게 `dirty_submodule`이다. 안전 완화 없음.
4. 관측 자체의 실패는 단계별 토큰으로 fail-closed다: `ls-files` 실패는
   `git_index_observation_failed`, `.gitmodules` 읽기·고아 경로
   `lstat`/`readdir`(ENOENT 외)·`submodule status`·서브모듈 안 `status` 실패는
   `submodule_observation_failed`.
5. `requested` phase에서 `last_error`가 있는 작업에 [폐기 포기]를 누르면
   `phase: 'abandoned'`가 되고, 그 bead의 재디스패치·직렬 레인 점유·대기 행
   드래그·resume·pause·stop·stale-work 액션·merge·cleanup·PR 관측 위임이
   풀리며(§2.1 표의 모든 활성 판정이 `false`), 공개 투영과 [세션에서 해결]
   판정에서 사라진다. 이어지는 [폐기]는 새 `operation_id`의 새 작업을 만든다.
6. SIGSTOP된 owned runner는 포기 시 SIGCONT로 재개된다. SIGCONT가 실패하거나
   probe가 `unknown`이면 작업은 실패 상태 그대로 남고 응답에 사유가 실린다.
7. `requested` 밖 phase, `last_error` 없는 작업, `done`·`abandoned` 작업의
   포기는 거부된다.
8. `abandoned` 레코드는 재시작 후에도 `last_error`·`abandoned_at`·
   `abandon_resume`를 유지하며 `recover()`·`recoverFences()`가 건드리지
   않는다.
9. 화면: §3.3의 안내 3종이 [재시도] `title`과 영수증 줄에 붙고, `requested`
   실패 행에만 `[재시도] → [폐기 포기]/[백업 포기] → [세션에서 해결]` 순으로
   나타나며, 포기 뒤 카드가 폐기 이전 모습으로 돌아간다. 성공한 포기만
   `폐기 포기 — 폐기 미수행 (원인: …)` 이벤트를 남기고, 그 이벤트가 이슈
   상세 "Worker 이력"에서 bead의 레인과 무관하게 읽힌다. 거부된 포기는 클릭
   기록만 남긴다. 폐기 실패 알림의 `다음:` 줄이 세 출구를 말한다.
10. 정상 폐기 흐름과 실패 없는 진행 중 작업의 차단 동작은 불변이다.
11. Pre-Handoff Validation(tsc/test/lint/prettier/build) 통과, `npm run
    build`로 `app/main.bundle.js`·`.map` 갱신.

## §5 Test scope

- `server/worker/recovery-archive.test.js`: (a) 고아 gitlink + 빈 디렉터리 →
  `ok`·manifest `orphan_gitlinks`; (b) 고아 + 경로 부재 → `ok`(인벤토리
  건너뜀); (c) 고아 + 일반 파일 → `orphan_gitlink_content:<path>`; (d) 고아 +
  중첩 저장소 → 같은 실패; (e) 고아 + 매핑된 clean 서브모듈 → `ok`; (f) 고아
  + 매핑된 dirty 서브모듈 → `dirty_submodule`; (g1) 주입한 `git`이
  `ls-files`에서 throw → `git_index_observation_failed`; (g2) 주입한 `git`이
  `.gitmodules`가 있는 저장소에서 `config --file .gitmodules`에서 throw →
  `submodule_observation_failed`; (g3) 매핑된 서브모듈이 있는 저장소에서
  `submodule status`에서 throw → `submodule_observation_failed` (g1~g3는
  인자를 보고 골라 throw하는 `git` 목으로 나누어, 각각이 변경 전 구현에서는
  다른 토큰이 나와 실패하는 seam이어야 한다); (h) 기존 `dirty_submodule`
  테스트 불변. 고아 gitlink는 `git update-index --add --cacheinfo
  160000,<oid>,<path>`로 만든다.
- `server/worker/discard-phase.test.js`: `done`·`abandoned` 비활성, 그 밖
  활성, 비정상 입력 활성 아님.
- `server/worker/queue-store.test.js`: `abandonDiscardOperation` CAS 3종
  거부, 성공 시 필드·`last_error` 보존·레인 불변, 재시작 정규화,
  `hasActiveDiscardOperation`·`activeDiscardBeadIds`·held/active 집합이
  `abandoned`를 제외, 포기 뒤 `createDiscardOperation`이 새 작업 생성.
- `server/worker/discard-coordinator.test.js`: SIGCONT → write → unfence
  순서, SIGCONT 실패 시 무변경, probe `unknown` 거부·무변경, `gone`의
  `resume` 기록, phase·`last_error` 게이트, `recover`가 `abandoned`를
  건너뜀, 포기 뒤 `discard()`가 재사용하지 않고 새 작업을 만듦,
  `driveOperation`이 `abandoned`에서 `operation_abandoned`, 알림
  `next_action` 문구.
- `server/worker/scheduler.test.js`·`pr-actions.test.js`: `abandoned` 작업이
  있는 bead의 launch·직렬 레인 점유·pause·stop·merge·cleanup이 막히지 않음;
  `unfenceDiscardAttempt`가 ⏸/■의 fence를 지우지 않음.
- `server/worker/pr-poller.test.js`·`resolve-session.test.js`: `abandoned`
  작업이 PR 관측을 coordinator로 넘기지 않음; 폐기 실패 `failure_class`
  판정에서 제외됨.
- `server/ws/worker-handlers.discard-abandon.test.js`(신규, 기존
  `worker-handlers.<topic>.test.js` 패턴): `worker-discard-abandon` 검증·
  revision 충돌·성공 응답, 성공에만 결과 이벤트(`discard_abandoned:*`)가
  남고 거부에는 클릭 기록만 남음, `publicDiscardOperations`가 `abandoned`를
  제외.
- `app/views/worker/lanes.test.js`: `discardProjection.abandon`의 `action`
  조건 4종(활성 없음·진행 중·`requested` 실패·다른 phase 실패), 라벨 2종,
  `abandoned` 작업 제외, `discardFailureGuidance` 3종+미등록, 확인·완료 문구,
  실패 행의 버튼 렌더링 순서 `[재시도] → [폐기 포기] → [세션에서 해결]`과
  실패 없는 행의 현행 순서 유지.

## 구현 unit 후보

- `archive-classify`: `server/worker/recovery-archive.js` §1 + 그 테스트.
- `abandon-server`: `server/worker/discard-phase.js`, `queue-store.js`,
  `discard-coordinator.js`, `scheduler.js`, `pr-actions.js`, `pr-poller.js`,
  `resolve-session.js`, `attach.js`, `server/ws/` §2 + 테스트.
- `abandon-ui`: `app/protocol.js`, `app/views/worker/lanes.js`,
  `app/views/worker/index.js`, `app/views/monitor/index.js` §3 + 테스트 +
  build.

## 경계·후속

- 관찰: `requested` 밖 phase(runner 종료·PR 정리·revert·rollback)의 실패
  포기는 부분 수행 상태의 되돌리기 계약이 따로 필요해 이 스펙 밖이다 —
  그 실패는 현행대로 [재시도]·[세션에서 해결]만 갖는다.
- 관찰: 백업 없는 폐기(잃을 고유 내용이 없음을 증명하고 아카이브를 건너뛰는
  경로)는 "무엇을 잃지 않는가"의 판정 계약이 별도 설계라 채택하지 않았다.
- 관찰: prostate 저장소의 `origin/main` 고아 gitlink 제거는 `PROSTATE-nm3`이
  이미 마쳤다. 이 스펙은 그 수정 이전 HEAD를 가진 워크트리에서도 성립한다.
- 관찰: `stale_work_backup_fresh` 작업의 [백업 포기]는 같은 `requested`
  phase·같은 코드 경로라 이 스펙 안이다(형제 Bead 아님).
- 관찰: process probe가 지속적으로 `unknown`인 identity(그룹 프로브 실패
  등)는 §2.3에 따라 포기도 거부되어 남는다 — 안전 우선의 대가이며, 그 경우의
  출구는 이 스펙 밖이다.
- 관찰: 타임라인 kind 어휘(`bead-timeline.js` `TIMELINE_KINDS`)는
  `2026-08-28-worker-record-timeline-retention-design.md` §5 표가 소유하므로
  늘리지 않고 `user_action`의 `seq`·`summary`로 결과를 구분한다.
- 관찰: 리뷰(codex, 2026-09-02) 1차 REVISE 6건을 이 판에 반영했다 — 활성
  판정 전수 표, `unknown` 거부, 성공 전용 결과 이벤트와 이슈 상세 표면,
  git 실패 토큰 분리, ADR 0022 supersede, 실패 행 버튼 순서.

## 결정 (ADR 후보)

- **폐기 실패의 출구는 재클릭·[폐기 포기]·[세션에서 해결] 셋으로 닫히고,
  [폐기 포기]는 `requested` 실패에서만 진입하는 terminal `abandoned`다
  (ADR 0022 supersede)** — ADR 0022는 사용자 개시 작업 실패의 재진입을
  "재클릭·[세션에서 해결] 두 클릭뿐"으로 닫았다. 이 결정은 폐기 실패에 한해
  세 번째 출구를 더하므로 0022와 모순이며, 0022의 나머지(알림 자동·자동 수리
  dispatch 금지·[정리 재시도]·설정 토글 없음)는 그대로 승계한다. 되돌리기
  어려움: 성립(`queue.json`의 durable phase 어휘·§2.1 표의 활성 판정 전수·
  알림 문구·버튼을 UI와 운영 습관이 소비). 맥락 없이 놀라움: 성립(실패한 폐기가
  왜 자동 종단되지 않는지, 왜 뒤 phase에서는 포기할 수 없는지, 왜 포기가
  "재진입"이 아니라 "출구"인지). 실제 트레이드오프: 성립(재시도 한도 자동
  종단·백업 없는 폐기 기각; ADR 0016의 "자동 종단은 systemic 실패만" 유지;
  `unknown` 소유권에서 포기 거부라는 안전 우선). `summary`: "사용자
  개시 작업 실패의 재진입은 자동 알림 뒤 사람 클릭뿐이라는 0022를 승계하되,
  폐기 실패의 출구는 재클릭·[폐기 포기]·[세션에서 해결] 셋으로 닫힌다.
  [폐기 포기]는 아카이브 단계 실패에서만 runner를 되살리고 bead를 폐기 이전
  자리로 돌려놓는 terminal `abandoned`이며, 뒤 phase의 실패와 소유권 판정
  불능에서는 허용하지 않는다" → ADR, supersede 0022
- 고아 gitlink 판정 기준(매핑 부재 + 경로 부재/빈 디렉터리)은 되돌리기
  어려움이 성립하지 않는다(순수 검사 함수 하나의 규칙). ADR 없이 §1.1이
  정본이다. → ADR 아님
