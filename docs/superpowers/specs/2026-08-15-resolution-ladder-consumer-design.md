# AI 세션 단일 해결 경로의 소비자 구현

- Bead: `UI-iptm` (`route=spec_backed`) — 소비자 구현 unit
- 계약 unit: `dotfiles-s6pi` (closed, PR #398 머지 `739fb757`)
- 계약 스펙: dotfiles `docs/superpowers/specs/2026-08-14-repo-operation-resolution-ladder-design.md`
- 날짜: 2026-08-15

## 1. 배경

beads-ui는 dotfiles가 소유한 repo operation automation policy의 **소비자**다.
계약이 v2로 바뀌면서 해결 경로가 3단 사다리(`script_retry` →
`auto_repair_session` → `user_triggered_session`)로 재정의되었고,
`auto_repair.eligible` allowlist와 "사람이 직접 고치는" 종착이 계약에서
사라졌다. 이 unit은 그 계약을 beads-ui 런타임과 UI에 반영한다. 계약 문장을
새로 쓰지 않는다.

핀된 아티팩트가 v1인 동안 런타임 동작은 v1 그대로다. 계약 unit의 스펙 §4가
명시한 대로 이 재핀과 배포 이후에야 실제 사다리가 동작한다.

현재 소비자 표면의 사각지대는 두 층이다.

**분류 층.** `server/worker/repo-operation-policy.js`의
`classifyRepoOperationFailure`는 `failure.code`가 `script_failed` 또는
`timeout`일 때만 `verify_script_failure`/`deploy_script_failure`로 분류하고
나머지를 `other`로 떨어뜨린다. `isRepairEligible`이 그 토큰을 v1 allowlist와
대조하므로 `other`는 해결 세션 대상에서 제외된다. 관측된
`verify_candidate_mismatch`·`base_fetch_failed`·`repo_ops_worktree_unowned`가
모두 여기에 걸려 있다.

**표면 층.** `cleanup_failed[bead_id]` 행 중 `step=repo_operations`는
`repo-operation-migration.js`의 `LEGACY_OPERATION_STEPS`에도
`LEGACY_CLOSURE_STEPS`에도 없어 마이그레이션 대상이 아니고, 결속된 repo
operation 레코드도 없다. 그래서 해결 버튼이 렌더될 대상 자체가 없다
(`UI-f17c`). 별도로 `completion-repair-policy.js`의
`isRepairableCleanupFailure`는 `step=post_merge_verify`만 인정하는 legacy
allowlist로 남아 있고, 소비자가 둘이다 — `merge-candidates.js`의 `repairable`
판정과, `completion-intent.js`가 cleanup failure를 `cleanup_repairable`과
`cleanup_red`로 가르는 분기다. 후자의 `cleanup_red`는 계약이 없앤 "사람이 직접
고치는" 종착이 코드에 남아 있는 자리다.

UI 층에서는 `app/views/worker/repo-ops-timeline.js`가 budget 소진 시
(`remaining <= 0`) 해결 버튼을 `disabled`로 만들고 `수동으로 해결하세요`를
띄운다. 이는 계약이 없앤 종착을 그대로 표시하는 것이다.

## 2. 목표와 비목표

### 목표

1. 핀된 아티팩트를 v2로 재핀하고, 소비자가 v2 의미를 이해하지 못하는 상태를
   decoder guard로 드러낸다.
2. 해결되지 않은 모든 terminal failure가 기록 표면과 무관하게 같은 해결 입구를
   갖는다. 분류에서 `other`가 사라진다.
3. `script_retry`를 terminal 정착 이전 단계로 구현하고, 재시도 자격을 durable
   idempotent 키에 묶는다.
4. budget 소진 뒤에도 해결 트리거가 활성 상태로 남고, `수동으로 해결하세요`
   계열 문구가 사라진다.
5. repair session packet이 앞 단계 결과와 fingerprint를 실어 세션이 이미 실패한
   경로를 다시 밟지 않게 한다.

### 비목표

- 계약 문장을 beads-ui에 다시 쓰지 않는다. 정책 판정의 근거는 핀된 아티팩트
  하나이며, 이 저장소는 그 토큰을 렌더할 뿐 멤버십을 결정하지 않는다.
- durable 상태를 마이그레이션하지 않는다. 계약 §3.6이 "읽는 시점에 정규화"를
  명시했고, 기존 레코드는 그대로 둔 채 새 규칙이 재해석한다.
- `completion_chain`의 `identity`·`inheritance`·`closure`·`coalesced_owner`
  의미를 바꾸지 않는다.
- verify/deploy operation의 실행 계약(성공 판정, worktree 소유권, previous-base
  신뢰 경계)을 바꾸지 않는다.

## 3. 설계

### 3.1 모듈 경계

| 파일 | 책임 | 변경 |
| --- | --- | --- |
| `generated/contracts/repo-operation-policy.json` + `.provenance.json` | 핀된 계약 아티팩트 | v2 재핀 |
| `server/worker/repo-operation-policy.js` | 아티팩트 로드·투영, decoder guard | v2 판독, `eligible` 소멸 |
| `server/worker/resolution-ladder.js` | subject 정규화 + 사다리 단계 판정 (순수) | **신설** |
| `server/worker/repo-operation-coordinator.js` | `retry_pending` 전이·재실행, 자동 디스패치 | 사다리 질의로 교체 |
| `server/worker/queue-store.js` | `retry_pending` 상태, 소비 키, cleanup subject repair 필드 | durable 스키마 확장 |
| `server/worker/repair-session-adapter.js` | packet에 앞 단계 결과·fingerprint | 확장 |
| `server/ws/worker-handlers.js` | 두 표면을 같은 해결 카드로 투영 | 확장 |
| `app/views/worker/repo-ops-timeline.js` | 버튼 상시 활성, cleanup 행 해결 입구 | 수정 |
| `app/views/worker/exec-defaults-dialog.js` | 3목록 → 사다리 구조 | 수정 |
| `server/worker/completion-repair-policy.js` | legacy allowlist | **삭제** |
| `server/worker/merge-candidates.js` | 위 allowlist 호출부 | 사다리 판정으로 교체 |
| `server/worker/completion-intent.js` | 같은 allowlist로 `cleanup_repairable`/`cleanup_red`를 가르는 분기 | 사다리 판정으로 교체 |
| `app/protocol.md` | `repo_operation_policy` shape 문서 | v2 shape로 갱신 |

새 모듈을 두는 이유는 판정의 소비자가 셋이기 때문이다. coordinator의 자동
디스패치, ws handler의 카드 투영, adapter의 packet 구성이 모두 "이 subject는
사다리 몇 단계인가"를 물어야 한다. 이미 1600줄이 넘는 coordinator에 상태
머신을 더 얹는 대신, 순수 함수 모듈이 그 질문 하나를 소유한다.

### 3.2 decoder guard

`loadRepoOperationPolicy`가 읽은 `schema_version`이 `2`가 아니면 그 로드 결과에
`supported: false`를 붙인다. provenance digest는 byte 변경만 드러낼 뿐 소비자가
새 의미를 이해하는지 보장하지 않으므로, 이 guard가 조용한 오독을 막는 실제
지점이다.

`supported === false`의 효과는 **자동 사다리 단계만 정지**다.

- `script_retry`와 `auto_repair_session`은 거부된다. coordinator의 자동
  디스패치 경로가 이 플래그를 먼저 본다.
- `user_triggered_session`은 계속 동작한다. 사용자 클릭이 사다리의 종착이므로
  이것까지 막으면 계약 목표(정지 상태로 남지 않음)에 정면으로 반한다.
- verify/deploy operation의 실행 자체는 영향받지 않는다. 실행 여부는
  `repo-ops/config.toml` 선언이 정하며 이 아티팩트와 무관하다.
- UI는 사다리 목록 자리에 스키마 불일치를 표시한다(§3.7).

이 조합은 workspace 토글 OFF(`off_semantics`)와 같은 처리이므로 의미가
일관된다. 정상 경로에서는 이 unit의 재핀으로 `schema_version=2`가 맞춰지며,
guard는 아티팩트를 잘못 갱신한 사고에 대한 방어선이다.

### 3.3 분류에서 `other` 소멸

현재 `classifyRepoOperationFailure`는 eligibility 판정과 표시 라벨 선택을
겸하고 있고, `other`는 "eligible 목록에 없음"을 뜻한다. v2에는 목록 자체가
없으므로 두 책임을 분리한다.

- `isRepairEligible(operation)` — `superseded_by`가 아닌 **모든 terminal
  failure에 `true`**. allowlist 조회가 사라진다. `superseded_by`는 후속
  operation이 그 실패를 대체했다는 사실이므로 제외가 맞지만, `dismissed`는
  제외 조건이 아니다(§3.3-1).
- `classifyRepoOperationFailure(operation)` — 표시·packet용 토큰만 낸다.
  `interrupted === true`면 `interrupted_without_terminal_exit`,
  `failure.code ∈ {script_failed, timeout}`이면
  `verify_script_failure`/`deploy_script_failure`, **그 외에는 `failure.code`를
  그대로 반환**한다.
- `scriptRetryApplicable(operation)` — §3.4의 적용 조건.

**표시 토큰과 retry 자격은 다른 축이다.** 위 분류는 사람이 읽을 라벨을 고르는
것이고, retry 자격은 §3.4의 invocation 증거가 정한다. 둘은 일치하지 않는다 —
예컨대 `interrupted_without_terminal_exit`는 표시 토큰이 하나지만 spawn 흔적
유무에 따라 retry 자격이 갈리고, `verify_candidate_mismatch`는 표시 토큰이
같은 채로 두 단계에서 발생한다. 이 둘을 한 함수에 묶었던 것이 `other`를 낳은
구조적 원인이므로, 다시 묶지 않는다.

**3.3-1 `dismissed`의 재정의.** `dismissRepoOperation`은 표시 플래그만 세운다 —
레코드는 `failed` 상태 그대로이고 정리 커서도 전진하지 않는다. 따라서 dismissed
실패는 여전히 unresolved terminal failure이며, 여기서 해결 입구를 없애면 계약의
`resolution_entry_surface: every_unresolved_terminal_failure_regardless_of_record_surface`와
`manual_human_fix: absent`를 함께 위반한다. 사람이 ✕를 눌렀다는 사실이 실패를
고치지는 않는다.

dismissal의 원래 의도(조용히 접수해 `해결 필요` 집계에서 뺀다)는 유지하되,
효과를 **자동 단계 제외로 한정**한다.

| 축 | dismissed의 효과 |
| --- | --- |
| `해결 필요` 집계 | 빠진다 (기존 동작 유지) |
| 자동 사다리(`script_retry`, `auto_repair_session`) | 대상에서 빠진다 — 사람이 접수한 실패를 자동이 다시 열지 않는다 |
| `user_triggered_session` | **유지된다** — 해결 버튼은 계속 렌더되고 동작한다 |

이는 workspace 토글 OFF(`off_semantics`)와 같은 모양이므로 어휘가 일관된다.
UI에서 dismissed 행은 `접수됨` 칩을 유지한 채 해결 버튼을 함께 보여준다.

fallback 토큰을 새로 만들지 않는 것이 핵심이다. `other`를 다른 이름으로
되살리면 이번에 없애는 사각지대가 그대로 재생산된다. UI는 알려진 세 토큰에
라벨을 주고, 나머지 코드는 기존 `operationFailureText(kind, code)` 경로가
문장을 만든다. 라벨 맵에 없는 토큰은 기본 라벨로 떨어진다(§3.7).

### 3.4 `script_retry` 상태 머신

**적용 조건은 계약의 `script_identity_present` 하나다.** 실패 코드로 된 예외
목록을 만들지 않는다 — 코드별 allowlist는 이번에 없애는 사각지대를 다른
이름으로 재생산하고, 계약에 없는 disposition을 소비자가 발명하는 일이다.

`script_identity`는 **실제 runner invocation 증거**에서만 만들어진다. 레코드의
`script_blob_sha`는 operation prerecord 시점에 결정되므로 spawn 이전에 실패한
subject에도 존재하며, 그 필드의 존재를 identity로 읽으면 pre-spawn 실패까지
재시도 대상이 된다. 판정 기준은 `startRepoOperation`이 성공해 남긴 흔적이다:
`started_at`과 `log_path`가 모두 있으면 script가 실제로 spawn되었고, 그때만
`script_identity = script_blob_sha + script_mode`가 성립한다.

이 기준은 계약 §3.6의 정규화 표와 일치한다. 관측된 다섯 건은 모두 spawn 이전
실패(`base_fetch_failed`, `repo_ops_worktree_unowned`, materialize 단계의
`verify_candidate_mismatch`)여서 `started_at`이 없고, 표가 명시한 대로
`not_applicable`로 2단계에 직행한다. 반대로 `interrupted_without_terminal_exit`는
spawn 이후 중단일 수 있으므로 흔적이 있으면 identity가 성립한다 — 실패 코드로
잘라냈다면 이 경우를 잘못 배제했을 것이다.

`verify_candidate_mismatch`는 코드 상 두 곳에서 난다: verify 후보 materialize
실패(spawn 이전)와 exit 0 이후 정렬 검사 실패(spawn 이후)다. 같은 코드가 두
단계에서 나오는 것이 바로 코드 기반 판정이 성립하지 않는 이유이며,
invocation 증거 기준은 두 경우를 자동으로 옳게 가른다.

적용되지 않는 subject는 `script_retry: not_applicable` 증거를 남기고 즉시
2단계로 내려간다.

**상태 어휘.** `RepoOperation.state`에 `retry_pending`을 추가한다:
`queued|running|succeeded|failed|repairing|retry_pending`.

**전이.**

```
running --script 실패--> retry_pending   (first_failure 보존, 자격 미소비)
retry_pending --자격 남음--> [소비 기록] --> queued --> running --> 정착
retry_pending --자격 소진--> failed      (보존한 first_failure로 terminal)
```

**소비 키.** 위에서 성립한 `script_identity`를 써서
`(attempt_id, target_sha, script_identity)`를 operation 레코드의
`retry.consumed_key`에 durable하게 쓴다. 소비 기록 시점은 **재실행 spawn
직전**이지 `retry_pending` 진입 시점이 아니다. 이 순서가 계약 §3.3의 재시작
복구 규칙을 그대로 만족시킨다.

- 재시작이 `retry_pending` 기록과 소비 기록 사이에 일어나면 자격이 남아 있으므로
  재시도를 실행한다.
- 소비 기록과 결과 정착 사이에 일어나면 자격이 소비되었으므로 보존한
  `first_failure`로 terminal 정착시키고 2단계로 넘어간다.

두 경우 모두 재시도는 at-most-once이며, 이 결속이
`bounded_single_script_retry_exceeded` 금지의 실제 집행 지점이다.

**flake 흡수 증거.** 재시도로 통과하면 `succeeded`이되
`retry.absorbed = { first_failure, first_fingerprint, at }`를 남긴다. 이 증거가
없으면 간헐 실패가 조용히 초록불이 되며, 그것은 `baseline_failure_ignore`
금지가 막으려는 결과와 같다.

**자동이 비활성인 경우.** decoder guard가 `supported=false`이거나 workspace
`auto_repair`가 OFF면 script 실패는 `retry_pending`으로 가지 **않는다**.
`retry_pending`은 자동 재시도를 기다리는 상태인데 그 자동이 꺼져 있으면 아무도
그 상태를 해소하지 않고, 사용자 해결 버튼은 `failed` 상태에만 붙으므로 트리거
없는 정지가 된다. 이 경우 실패는 곧바로 terminal `failed`로 정착하고
`ladder_stage = 'user_triggered_session'`을 durable하게 기록하며, 자동이 막힌
이유(`schema_unsupported` 또는 `auto_repair_off`)를 앞 단계 결과로 남겨 packet에
실린다. 이미 실행 중인 세션은 이 전이가 건드리지 않는다.

**레코드 스키마와 legacy 호환.** `RepoOperation.schema`는 `1`을 유지하고
`retry`를 optional로 정규화한다. `normalizeRepoOperation`은 `schema !== 1`인
레코드를 거부하므로, 값을 올리면 기존 durable 레코드의 관측 이력이 전부
사라진다.

`retry` 부재를 일률적으로 "자격 미소비"로 기본화하지는 않는다. 상태별로 나눈다.

| 기존 레코드 | `retry` 정규화 |
| --- | --- |
| `state=failed`, `retry` 부재 | 자격 **소진**으로 읽는다. v1에서 이미 terminal로 정착한 실패이므로 재시도 자격을 새로 주면 terminal 안정성과 계약의 `timing: before_terminal_settlement`를 함께 깬다. 곧바로 2단계 입구를 갖는다 |
| `state=succeeded`, `retry` 부재 | 해당 없음. `absorbed` 증거 없이 성공한 것으로 읽는다 |
| `state ∈ {queued, running}`, `retry` 부재 | 자격 미소비. 앞으로 날 script 실패만 `retry_pending` 자격을 만든다 |
| `retry`가 있으나 malformed | fail-closed — 자격 소진으로 읽고 2단계로 보낸다 |

전이가 `running → retry_pending` 하나뿐이므로 이미 `failed`인 레코드가 자격을
되찾는 경로는 구조적으로 없지만, 정규화 규칙을 명시해 두어야 `retry` 부재를
미소비로 읽는 구현이 나중에 그 경로를 여는 것을 막는다.

**chain 정합.** `retry_pending`은 비terminal이므로
`completion_chain.identity: first_terminal_failure_operation`이 그대로 성립한다.
chain은 재시도가 끝나 terminal이 확정된 뒤에 열린다.

### 3.5 fingerprint guard의 적용 시점

계약 §3.4는 guard가 chain의 **최초 자동 세션을 절대 억제하지 않는다**고
규정한다. `script_retry`는 같은 입력을 재실행하므로 같은 fingerprint를 낼
가능성이 높고, guard를 순진하게 적용하면 그 반복이 최초 `auto_repair_session`을
삼킨다.

현재 `reproducedWithoutNewEvidence`는 이 요구를 만족하지 **못한다**. 그 함수는
같은 `repo_id`의 다른 어떤 레코드든 fingerprint와 evidence key가 같고
`auto_used > 0`이면 참을 반환하며, **`chain_id`를 전혀 검사하지 않는다**.
따라서 과거의 다른 chain이 자동 세션을 쓴 적이 있으면, 같은 fingerprint를 가진
독립된 새 chain의 **최초** 자동 세션까지 억제된다. 이는 계약 §3.4가 명시적으로
금지한 경로다.

guard를 현재 subject의 chain에 결속하도록 고친다.

- 비교 대상을 같은 `chain_id`를 가진 레코드로 한정한다.
- 그 chain의 자동 세션이 이미 소비되었는지(`ladder_stage`가
  `auto_repair_session`을 지났는지)를 durable 상태로 먼저 확인하고, 소비 이후의
  자동 재진입에만 guard를 적용한다.
- `retry_pending` 재실행은 별도 레코드를 만들지 않고 같은 operation 안에서
  일어나므로(§3.4) 비교 대상에 끼지 않는다.

자동 세션 실패 후 사용자 단계로의 전이는 durable하게 기록된다
(`repair.ladder_stage = 'user_triggered_session'`). 기록이 없으면 재시작 후
자동 세션이 다시 소비될 수 있다. `ladder_stage`의 어휘는 계약의 사다리 id와
같다: `script_retry` · `auto_repair_session` · `user_triggered_session`.

### 3.6 두 표면의 해결 입구 통합

`resolution-ladder.js`가 정규화하는 subject는 두 종류다.

| 출처 | subject id | owner_bead | script identity |
| --- | --- | --- | --- |
| `repo_operations[id]`, `state=failed`, `superseded_by` 없음 | `op:<operation_id>` | `repair.owner_bead` | 있으면 사용 |
| `cleanup_failed[bead_id]` 중 정리 커서를 멈춘 채 결속된 operation subject가 없는 행 | `cleanup:<bead_id>` | `bead_id` | 없음 → `not_applicable` |

계약의 `resolution_subject`는
`unresolved_terminal_failure_blocking_cleanup_cursor`다. `cleanup_failed`의 모든
행이 아니라 **정리 커서가 그 행에서 멈춰 있는** 행만 subject가 된다. 판정은
기존 `CLEANUP_STEPS` 커서 위치를 그대로 읽으며, 이 저장소가 새 판정을 발명하지
않는다.

**중복 방지.** 같은 bead에 결속된 operation subject가 이미 있으면 그 bead의
`cleanup_failed` 행은 subject로 승격하지 않는다. operation 레코드가 더 구체적인
실패 사실(script identity, exit code, fingerprint)을 갖기 때문이며, 이 규칙이
한 실패에 두 개의 해결 입구가 생기는 것을 막는다. 결속 판정은 operation의
`subjects[].bead_id`로 한다.

cleanup subject의 durable repair 상태는
`cleanup_failed[bead_id].repair = { chain_id, auto_used, attempt_id, session_id, mode, ladder_stage }`로
그 레코드 안에 둔다. 별도 맵을 만들면 실패 기록과 그 해결 상태가 두 곳으로
갈라진다.

`startRepair`는 `operation_id` 대신 subject id를 받도록 넓힌다. cleanup
subject의 packet은 operation 필드 자리에 legacy 실패 사실(`step`, `reason`,
`log_path`, `output_tail`)과 `script_retry: not_applicable`을 싣는다.

durable 마이그레이션은 하지 않는다. 이미 정지한 다섯 건은 재핀·배포 직후 읽는
시점 정규화로 사다리 2단계 입구를 갖는다. 자동 세션 자격이 남아 있지 않은
chain은 곧바로 `user_triggered_session` 입구를 가지므로, 어느 경우든 트리거 없는
정지 상태로 남지 않는다.

`completion-repair-policy.js`의 `isRepairableCleanupFailure`는 삭제한다.
소비자는 둘이다.

- `merge-candidates.js` — merge candidate의 `repairable` 판정에 쓴다.
- `completion-intent.js` — 같은 allowlist로 cleanup failure를
  `cleanup_repairable`과 `cleanup_red`로 가른다. `cleanup_red`는 별도
  `needs_human` 계열 경로로 흐른다.

두 호출부 모두 사다리 판정으로 교체한다. `completion-intent.js`를 남겨두면
import가 깨질 뿐 아니라, 계약이 없앤 "사람이 직접 고치는" 종착이
`cleanup_red` 경로로 그대로 살아남는다. `cleanup_red`는 폐기하고 모든
unresolved cleanup failure가 `cleanup_repairable`과 같은 통합 subject로
흐르게 한다. `CompletionFactState` 어휘에서 `cleanup_red`가 사라지므로
`completion-intent.test.js`의 해당 기대도 함께 교체한다.

### 3.7 UI

**타임라인.** 해결 버튼의 `?disabled=${spent}`를 제거한다.
`operationActionsTemplate`은 현재 `dismissed`면 액션 블록 전체를 반환하지 않는데,
§3.3-1에 따라 dismissed 행도 해결 버튼을 갖는다. 조기 반환 조건에서 `dismissed`를
빼고 `superseded_by`만 남긴다. 부제는 남은 자동 횟수를 계속 보여주되 문구가
바뀐다.

| 상태 | 부제 |
| --- | --- |
| 자동 여유 있음 | `자동 해결 ${remaining}회가 남아 있습니다` |
| 자동 소진 | `자동 해결을 다 썼습니다 · 눌러서 해결 세션을 엽니다` |

`수동으로 해결하세요` 계열 문구는 전부 사라진다. `RESOLVE_LABELS`의 `other`
키는 제거하고, 라벨 맵에 없는 토큰은 `실패 해결 세션 시작`으로 떨어진다.

cleanup 행에는 기존 `정리 재개` 옆에 같은 해결 버튼이 붙는다. 재개는 멈춘
단계부터 다시 밟는 것이고 해결은 실패 원인을 고치는 것이라 서로 대체하지
않는다.

`retry_pending` 상태의 상태 칩은 `재시도 중`으로 표시한다.

**설정 화면.** 3목록 중 가운데를 플랫 리스트에서 3단 사다리로 바꾼다.

```
해결 사다리
  1. 스크립트 재시도    자동 · operation당 1회 · 스크립트가 있을 때만
  2. 자동 해결 세션      자동 · 완료 체인당 1회
  3. 사용자 해결 세션    사용자 클릭 · 횟수 제한 없음
```

각 행의 트리거와 한도는 `resolution_ladder` 항목의 키에서 읽는다. 라벨 맵에
없는 키는 토큰 그대로 나온다 — 계약이 항목을 추가해도 이 저장소에 문장을
써넣지 않아도 되게 하는 기존 규약을 그대로 따른다. `never_automatic`은 토큰
3개가 교체되므로(`whole_command_retry` 제거,
`bounded_single_script_retry_exceeded` 추가) `POLICY_TOKEN_LABELS`도 함께
갱신한다.

**decoder guard 표시.** `schema_version ≠ 2`면 사다리 목록 자리에
`계약 스키마 불일치 — 자동 해결이 정지되었습니다 (v<n>)`가 뜬다. 타임라인의
해결 버튼은 사용자 트리거로 계속 동작한다.

### 3.8 packet 확장

계약 `repair_session_packet` 다섯 항목 중 beads-ui가 아직 싣지 않는 것은
`prior_ladder_step_outcomes_and_failure_fingerprints`다. packet에
`ladder` 필드를 추가한다.

```js
ladder: {
  script_retry: 'not_applicable' | 'consumed' | 'absorbed',
  script_retry_evidence: { first_fingerprint, at } | null,
  auto_repair_session: 'unused' | 'consumed',
  stage: 'auto_repair_session' | 'user_triggered_session',
  prior_fingerprints: [{ operation_id, code, fingerprint }]
}
```

`prior_fingerprints`는 같은 chain에 속한 terminal 레코드에서 모은다.
`repairSessionPrompt`는 이 필드를 앞 단계 요약 문단으로 렌더해, 세션이 이미
실패한 경로를 다시 밟지 않게 한다.

## 4. 실패 처리

- 아티팩트나 provenance를 읽을 수 없으면 기존 동작대로 예외가 오른다. 이 파일은
  저장소에 커밋된 자산이므로 부재는 배포 사고이지 런타임 조건이 아니다.
- `schema_version`이 `2`가 아니면 §3.2대로 자동 단계만 정지한다.
- `retry_pending` 재실행 spawn이 실패하면 소비는 이미 기록되었으므로 보존한
  `first_failure`로 terminal 정착시키고 2단계로 내려간다. 소비를 되돌리는 것은
  계약이 금지하는 무한 재시도의 입구다.
- cleanup subject의 owner bead를 해석할 수 없으면 기존 `repair_owner_unresolved`
  경로를 그대로 쓴다. 이 경우 prerecord 이전에 거부되므로 budget을 태우지 않는다.

## 5. Test scope

순수 판정과 상태 전이와 UI 동작이 각각 다른 파일에서 깨질 수 있으므로 seam을
세 층으로 나눈다. 어느 한 층만으로는 핵심 요구가 빠져도 전부 통과할 수 있다.

**층 1 — `server/worker/resolution-ladder.test.js` (신설).** 순수 판정.

- 실패 코드 5종(`script_failed`, `timeout`, `verify_candidate_mismatch`,
  `base_fetch_failed`, `repo_ops_worktree_unowned`)이 전부
  `repair_eligible=true`이고 분류가 `other`를 내지 않음
- `script_identity`가 `started_at`+`log_path` 흔적에서만 성립하고, 같은
  `verify_candidate_mismatch`라도 spawn 이전 레코드는 `not_applicable`,
  spawn 이후 레코드는 identity 성립으로 갈림
- `interrupted_without_terminal_exit`가 흔적이 있으면 identity를 가짐
- `dismissed` 레코드가 자동 단계에서는 빠지고 `user_triggered_session`
  입구는 유지함
- `cleanup_failed(step=repo_operations)` 행이 subject로 정규화되어
  `auto_repair_session` 입구를 갖고, 같은 bead에 operation subject가 있으면
  승격하지 않음
- fingerprint guard가 **다른** chain의 최초 자동 세션을 억제하지 않고, 같은
  chain의 자동 세션 소비 이후 재진입만 사용자 단계로 내림
- `schema_version=1` 아티팩트에서 자동 단계는 거부되고 사용자 트리거는 허용됨
- legacy 정규화 표(§3.4)의 네 행이 각각 기대한 자격으로 읽힘

**층 2 — coordinator/store 전이.** `repo-operation-coordinator.test.js`와
`repo-operation-store.test.js`를 확장한다. 순수 함수가 옳아도 전이 순서가
틀리면 at-most-once가 깨지므로 이 층이 따로 필요하다.

- 소비 기록이 **spawn 직전**에 일어남을 순서로 고정
- crash point별 복구: ① `retry_pending` 기록 후 소비 전 중단 → 재시도 실행
  ② 소비 후 spawn 전 중단 → 보존한 `first_failure`로 terminal 정착
  ③ spawn 후 결과 전 중단 → terminal 정착
- 재시도 성공 시 `retry.absorbed` 증거가 남고 `succeeded`가 됨
- 자동 비활성(`supported=false` / `auto_repair=OFF`)에서 script 실패가
  `retry_pending`을 거치지 않고 곧바로 `failed` +
  `ladder_stage=user_triggered_session`으로 정착하고, 실행 중인 세션은
  영향받지 않음
- packet에 앞 단계 결과와 `prior_fingerprints`가 실림

**층 3 — UI 동작.** `app/views/worker/repo-ops-timeline.test.js`,
`app/views/worker/repo-operations.test.js`,
`app/views/worker/exec-defaults-dialog.test.js`를 확장한다.

- budget 소진 후에도 해결 버튼이 활성이고 `수동으로 해결` 문구가 없음
- dismissed 행이 `접수됨` 칩과 해결 버튼을 함께 보여줌
- cleanup 행에 `정리 재개`와 해결 버튼이 함께 렌더됨
- `retry_pending` 상태 칩이 `재시도 중`으로 나옴
- 설정 화면이 사다리 3단을 순서대로 렌더하고, `schema_version≠2`에서 스키마
  불일치 표시로 대체됨

**RED 순서.** 기존 `server/worker/repo-operation-policy.test.js`는 v1 digest와
v1 토큰을 정확히 기대하므로 **현재 상태에서 통과한다**. 아티팩트를 먼저 재핀한
뒤 실패하는 것은 변경의 일부가 만든 compatibility failure이지 pre-change RED가
아니다. 진짜 RED는 위 세 층의 새 기대를 **먼저** 쓰는 것이며, 그 다음에 재핀과
구현이 GREEN으로 만든다. `repo-operation-policy.test.js`는 재핀과 같은 배치에서
v2 구조로 갱신한다.

`server/worker/repo-operation-repair.test.js`,
`server/worker/repo-operation-protocol.test.js`,
`server/worker/completion-intent.test.js`는 사다리 전이, 새 투영 shape,
`cleanup_red` 폐기를 반영하도록 갱신한다.

## 6. 검증

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build` (갱신된 `app/main.bundle.js`와 `.map` 포함)
- 재핀된 아티팩트의 `schema_version == 2`, `auto_repair.eligible` 부재,
  `resolution_ladder` 3단계 순서를 readback으로 확인
- provenance의 `source_commit`·`source_blob_sha`·`sha256`이 dotfiles 최신
  아티팩트와 정확히 일치함을 확인
- 저장소 전체 검색으로 `수동으로 해결` 계열 문구, `other` 분류 토큰,
  `isRepairableCleanupFailure`, `cleanup_red`가 남지 않음을 확인
- 머지 후 `repo-ops/config.toml` 배포 operation이 terminal success에 도달하고,
  프로세스 경로·포트·HTTP 응답을 확인

## 7. 위험과 완화

**`retry_pending`이 기존 durable 레코드를 깨뜨린다.** `RepoOperation.schema`를
`1`로 유지하고 `retry`를 optional로 정규화하되, 부재를 일률적으로 미소비로 읽지
않는다. §3.4의 상태별 정규화 표가 이미 terminal인 v1 실패에 재시도 자격이 새로
생기는 경로를 막는다.

**자동이 꺼진 상태에서 실패가 갇힌다.** `retry_pending`은 자동 재시도를
기다리는 상태이므로 자동이 비활성일 때는 아예 진입하지 않는다(§3.4). 그 경우
실패는 곧바로 terminal로 정착해 사용자 해결 버튼이 붙는 `failed` 상태가 된다.

**재시도가 간헐 실패를 감춘다.** durable 소비 키로 1회에 묶고, 재시도로 통과한
건은 `retry.absorbed` 증거를 남긴다. 증거 없이 통과시키는 것은
`baseline_failure_ignore` 금지에 걸린다.

**모든 실패가 eligible이 되어 세션이 낭비된다.** 이는 계약이 의도한 비용이다.
무엇이 "고칠 수 있는 실패"인지 열거하면 그 목록이 다시 allowlist가 되어 이번에
없애는 사각지대를 재생산한다. packet의 앞 단계 증거와
`script_retry: not_applicable` 기록이 반복 소모를 줄인다.

**두 표면 정규화가 중복 세션을 만든다.** cleanup subject와 operation subject가
같은 bead를 가리킬 수 있다. §3.6의 중복 방지 규칙이 이 경우 operation subject
하나만 남긴다.

**decoder guard가 정상 배포를 막는다.** guard는 자동 단계만 멈추고 operation
실행과 사용자 트리거는 살린다. 재핀이 정상적으로 랜딩하면 `supported=true`가
되므로 정상 경로에서는 발동하지 않는다.
