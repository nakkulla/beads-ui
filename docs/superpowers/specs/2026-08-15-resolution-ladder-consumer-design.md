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
allowlist로 남아 있다.

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

- `isRepairEligible(operation)` — `superseded_by`와 `dismissed`가 아닌 **모든
  terminal failure에 `true`**. allowlist 조회가 사라진다.
- `classifyRepoOperationFailure(operation)` — 표시·packet용 토큰만 낸다.
  `interrupted === true`면 `interrupted_without_terminal_exit`, script 실패면
  `verify_script_failure`/`deploy_script_failure`, **그 외에는
  `failure.code`를 그대로 반환**한다.
- `scriptRetryApplicable(operation)` — §3.4의 적용 조건.

fallback 토큰을 새로 만들지 않는 것이 핵심이다. `other`를 다른 이름으로
되살리면 이번에 없애는 사각지대가 그대로 재생산된다. UI는 알려진 세 토큰에
라벨을 주고, 나머지 코드는 기존 `operationFailureText(kind, code)` 경로가
문장을 만든다. 라벨 맵에 없는 토큰은 기본 라벨로 떨어진다(§3.7).

### 3.4 `script_retry` 상태 머신

**적용 조건.** `failure.code ∈ {script_failed, timeout}`일 때만 성립한다. 이 두
코드만 runner marker에서 나온 "스크립트를 실제로 실행하고 실패"다. 나머지
실패는 스크립트 실행 전이거나(`base_fetch_failed`,
`repo_ops_worktree_unowned`) 실행 후 정렬 검사 실패(`verify_candidate_mismatch`,
`deploy_worktree_residue`)여서 같은 명령을 다시 돌릴 대상이 없다. 계약 §3.6의
정규화 표도 이 넷을 `auto_repair_session` 직행으로 명시한다. 적용되지 않는
subject는 `script_retry: not_applicable` 증거를 남기고 즉시 2단계로 내려간다.

**상태 어휘.** `RepoOperation.state`에 `retry_pending`을 추가한다:
`queued|running|succeeded|failed|repairing|retry_pending`.

**전이.**

```
running --script 실패--> retry_pending   (first_failure 보존, 자격 미소비)
retry_pending --자격 남음--> [소비 기록] --> queued --> running --> 정착
retry_pending --자격 소진--> failed      (보존한 first_failure로 terminal)
```

**소비 키.** `(attempt_id, target_sha, script_identity)`를 operation 레코드의
`retry.consumed_key`에 durable하게 쓴다. `script_identity`는 레코드에 이미 있는
`script_blob_sha`와 `script_mode`를 결합한 값이다. 소비 기록 시점은 **재실행
spawn 직전**이지 `retry_pending` 진입 시점이 아니다. 이 순서가 계약 §3.3의
재시작 복구 규칙을 그대로 만족시킨다.

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

**레코드 스키마.** `RepoOperation.schema`는 `1`을 유지하고 `retry`를 optional로
정규화한다(부재 시 기본값). `normalizeRepoOperation`은 `schema !== 1`인 레코드를
거부하므로, 값을 올리면 기존 durable 레코드의 관측 이력이 전부 사라진다.

**chain 정합.** `retry_pending`은 비terminal이므로
`completion_chain.identity: first_terminal_failure_operation`이 그대로 성립한다.
chain은 재시도가 끝나 terminal이 확정된 뒤에 열린다.

### 3.5 fingerprint guard의 적용 시점

계약 §3.4는 guard가 chain의 **최초 자동 세션을 절대 억제하지 않는다**고
규정한다. `script_retry`는 같은 입력을 재실행하므로 같은 fingerprint를 낼
가능성이 높고, guard를 순진하게 적용하면 그 반복이 최초 `auto_repair_session`을
삼킨다.

현재 `reproducedWithoutNewEvidence`는 같은 fingerprint와 같은 evidence key를 가진
다른 레코드의 `auto_used > 0`을 조건으로 하므로 이미 "chain 자동 세션 소비
이후"에만 참이 된다. 이 판정은 유지하되, `retry_pending` 재실행이 만든 레코드가
그 비교 대상에 끼지 않도록 재시도는 별도 레코드를 만들지 않고 같은 operation
안에서 일어난다(§3.4).

자동 세션 실패 후 사용자 단계로의 전이는 durable하게 기록된다
(`repair.ladder_stage = 'user_triggered_session'`). 기록이 없으면 재시작 후
자동 세션이 다시 소비될 수 있다. `ladder_stage`의 어휘는 계약의 사다리 id와
같다: `script_retry` · `auto_repair_session` · `user_triggered_session`.

### 3.6 두 표면의 해결 입구 통합

`resolution-ladder.js`가 정규화하는 subject는 두 종류다.

| 출처 | subject id | owner_bead | script identity |
| --- | --- | --- | --- |
| `repo_operations[id]`, `state=failed`, `superseded_by`·`dismissed` 아님 | `op:<operation_id>` | `repair.owner_bead` | 있으면 사용 |
| `cleanup_failed[bead_id]` 중 결속된 operation subject가 없는 행 | `cleanup:<bead_id>` | `bead_id` | 없음 → `not_applicable` |

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

`completion-repair-policy.js`의 `isRepairableCleanupFailure`는 삭제하고
`merge-candidates.js`의 호출부를 사다리 판정으로 교체한다. legacy allowlist가
남아 있으면 이번에 없애는 사각지대가 그 파일에 그대로 살아남는다.

### 3.7 UI

**타임라인.** 해결 버튼의 `?disabled=${spent}`를 제거한다. 부제는 남은 자동
횟수를 계속 보여주되 문구가 바뀐다.

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

RED-GREEN seam은 `server/worker/resolution-ladder.test.js`(신설)다.

- 실패 코드 5종(`script_failed`, `timeout`, `verify_candidate_mismatch`,
  `base_fetch_failed`, `repo_ops_worktree_unowned`)이 전부 `repair_eligible=true`이고
  분류가 `other`를 내지 않음
- `script_retry`가 앞 둘에만 적용되고 나머지는 `not_applicable` 증거를 남김
- 같은 소비 키로 두 번째 재시도 자격이 없음 (재시작 시뮬레이션 포함)
- `retry_pending`으로 중단된 레코드가 자격 유무에 따라 재시도 또는 terminal
  정착으로 갈림
- `cleanup_failed(step=repo_operations)` 행이 subject로 정규화되어
  `auto_repair_session` 입구를 가짐
- `schema_version=1` 아티팩트에서 자동 단계는 거부되고 사용자 트리거는 허용됨

기존 `server/worker/repo-operation-policy.test.js`는 v1 토큰(`eligible` 3종,
`whole_command_retry`)과 digest를 직접 고정하므로 재핀 시점에 진짜 RED가 된다.
이 테스트를 v2 구조로 갱신한다.

`server/worker/repo-operation-repair.test.js`와
`server/worker/repo-operation-protocol.test.js`는 사다리 전이와 새 투영 shape를
반영하도록 갱신한다.

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
- 저장소 전체 검색으로 `수동으로 해결` 계열 문구와 `other` 분류 토큰이 남지
  않음을 확인
- 머지 후 `repo-ops/config.toml` 배포 operation이 terminal success에 도달하고,
  프로세스 경로·포트·HTTP 응답을 확인

## 7. 위험과 완화

**`retry_pending`이 기존 durable 레코드를 깨뜨린다.** `RepoOperation.schema`를
`1`로 유지하고 `retry`를 optional로 정규화한다. 기존 레코드는 `retry` 부재로
읽히며 재시도 자격이 미소비 상태로 시작한다.

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
