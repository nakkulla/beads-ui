# UI-f17c: PR부터 배포·정리까지 자동 완주하는 단일 completion saga 설계

- 날짜: 2026-08-12
- 저장소: `beads-ui`
- route: `full_plan`
- 선행 구현: `UI-lbqw`
- 대체 범위: 이 경로에 있던 기존 UI-f17c 설계 전체

## 1. 배경

Worker는 PR 생성, merge gate, GitHub merge, target-base 동기화, candidate
materialization, 검증, 배포, runtime readback, child/branch 정리, Bead close를 여러
owner에 나누어 실행한다. 각 owner에는 개별 durable record가 있지만 사용자가 시작한
“이 PR을 완료한다”는 의도를 끝까지 소유하는 단일 권한이 약하다.

실제 `dotfiles-3vb8`은 PR #378이 이미 merged이고 merge SHA도 관측됐지만 root
completion은 `merging`, active operation은 `merge_subject:prepared`, deployment
reconcile은 `pinned`에 남아 있다. managed adapter의 `timeout_ms`는 뒤쪽 adapter
command에만 적용되고 `materializeRelease()`의 `git fetch`에는 timeout이 전달되지
않아 child process가 수 시간 동안 끝나지 않았다. 실패 record가 만들어지지 않으니
bounded retry, recovery session, 사람 확인 중 어느 경로도 시작하지 못했다.

UI는 이 하나의 사실을 `머지됨`, `root 머지 중`, `배포 후보 고정`, `PR 대기`처럼
서로 경쟁하는 badge로 표시한다. 사용자는 현재 단계, 실제 정지 지점, 자동 조치,
남은 일을 한눈에 알 수 없다.

이 설계는 `UI-f17c`를 전면 재정의한다. PR이 제출된 뒤부터 완료될 때까지 root
completion saga 하나가 다음 effect를 결정하고, 모든 유한 실패는 결정적 재시도 또는
자동 recovery session으로 이어진다. 새 credential·광범위 권한·판정 불가능한 외부
effect만 실제 mutation 직전에 확인을 요구한다.

## 2. 목표

1. PR 제출 이후 merge, post-merge verify/deploy/readback, child/branch cleanup,
   Bead close, Done 진입까지 root completion saga 하나가 연속 소유한다.
2. 모든 blocking subprocess와 외부 control operation이 유한한 deadline 또는
   authoritative readback을 가진다.
3. retryable transient failure는 같은 effect identity로 bounded retry하고, 유한 실패가
   되면 current preset의 recovery session을 자동으로 시작하거나 재개한다.
4. 같은 provider recovery는 기존 provider session을 현재 tuple로 이어가고, provider가
   다르면 같은 owned worktree에 current-preset fresh session을 자동 생성한다.
5. recovery session이 credential/permission/ambiguous external effect를 안전하게 자동
   해결하면 bounded audit를 Done 카드에 보존한다.
6. UI는 primary 상태 하나, 사용자 진행 경로 하나, 세부 evidence 한 곳만 표시한다.
7. 현재 멈춘 `dotfiles-3vb8`을 새 runtime 시작 후 중복 merge/restart 없이 adopt하고
   끝까지 완주한다.

## 3. 비목표

- credential 생성·회전·폐기 또는 secret 값 표시·복사·저장
- `sudo`, `chown`, 광범위 recursive permission 변경
- authoritative readback 없는 외부 effect의 추측성 반복
- cross-provider transcript 또는 session ID 변환
- Bead workflow label/metadata에 completion recovery audit 추가
- `auto_advance`를 자동 completion 스위치로 재해석
- `docs/agents/repo-ops.toml`의 verify/deploy declaration schema 변경
- 진행 중인 `UI-lbqw` worktree나 구현을 UI-f17c에서 병합·대체

## 4. 선행 조건과 issue 경계

`UI-lbqw`는 먼저 자체 구현, PR, merge, post-merge deploy를 완료한다. `UI-f17c`
implementation worktree는 그 landed `main` SHA에서만 만든다.

UI-f17c는 UI-lbqw의 current-preset continuation resolver와 attempt provenance를
호출한다. resolver의 내부 구현이나 preset precedence를 복제하지 않는다. plan의 첫
implementation 단계는 landed SHA에서 다음 semantic contract를 readback한다.

```text
source attempt + current Bead/workspace preset + continuation policy
  -> immutable effective exec tuple/provenance
  -> same provider: prior session resume
  -> provider mismatch: current-preset fresh session
```

함수명·파일 이동만 생겼으면 plan의 seam 경로를 갱신한다. precedence, rollback,
session lineage 의미가 달라졌으면 구현 전에 plan을 다시 검토한다.

기존 `UI-f17c` Bead ID와 spec 경로는 유지한다. 이 문서의 게시 SHA가 이전
`spec_review`, `impl_entry`, plan lineage를 모두 대체한다.

## 5. 단일 authority

### 5.1 소유권

`completion_intents[root_bead_id]`만 다음 phase와 effect를 결정한다.

- `queue.reconcile`: candidate/deploy 하위 effect journal과 evidence
- managed journal/receipt/runtime pointer: deploy effect readback
- scheduler attempt: recovery session execution record
- merge queue: root 순서와 merge mutual exclusion
- PR observation: GitHub authoritative fact cache

위 record는 스스로 다음 작업을 시작하는 authority가 아니다. startup과 live path 모두
completion coordinator가 같은 reducer를 거쳐 하위 adapter를 호출한다. startup에서
persisted reconcile을 무기한 `await`한 뒤 saga를 시작하는 순서를 금지한다. saga를 먼저
복원하고, runnable effect를 coordinator가 schedule한다.

### 5.2 effect journal

모든 state-changing effect는 실행 전에 root intent에 prerecord한다.

```js
{
  op_id,
  kind,
  status: 'prepared' | 'running' | 'settling' | 'observed' | 'consumed',
  binding: {
    root_bead_id,
    subject_bead_id,
    subject_sha,
    base_sha,
    candidate_sha,
    attempt_id
  },
  started_at,
  deadline_at,
  retry_count,
  last_heartbeat_at,
  recovery_attempt_id,
  confirmation
}
```

`binding`에서 해당하지 않는 값은 `null`이다. unknown field를 버려 새 budget/op를
만드는 fail-open migration은 금지한다. malformed/contradictory binding은 자동
session이 진단하되 mutation 전 `awaiting_confirmation`으로 수렴한다.

외부 effect의 exactly-once는 물리적 호출 횟수가 아니라 authoritative readback 기준의
logical exactly-once다. timeout/crash 뒤에는 먼저 readback하고 `already_applied`이면
adopt, `not_applied`이면 같은 `op_id`로 retry, `unknown`이면 confirmation을 요구한다.

## 6. lifecycle

fine phase는 durable하게 유지하고 UI용 primary state/progress를 server에서 함께
projection한다.

| fine phase | primary state | 사용자 단계 |
| --- | --- | --- |
| `gating`, `waiting_pr` | `running` | PR 제출 |
| `merging` | `running` | PR 머지 |
| `materializing` | `running` | 배포 준비 |
| `verifying`, `deploying`, `runtime_readback` | `running` | 검증·배포 |
| `child_sweep`, `branch_cleanup`, `parent_close` | `running` | 정리 완료 |
| `recovering`, `waiting_repair_pr` | `recovering` | 원래 단계 유지 |
| `awaiting_confirmation` | `needs_human` | 원래 단계 유지 |
| `needs_human` | `needs_human` | 원래 단계 유지 |
| `paused` | `paused` | 원래 단계 유지 |
| `completed` | `completed` | 정리 완료 |
| `cancelled` | `cancelled` | 중단 |

기존 schema의 `gating`, `repairing`, `cleaning`은 startup normalize에서 확정 가능한
세부 phase로 변환한다. evidence가 부족하면 phase를 추측하지 않고 recovery
classification으로 보낸다. 기존 `needs_human`에 exact recovery attempt/session과
resumable operation이 결합돼 있으면 `awaiting_confirmation`으로 채택한다. 그런
lineage가 없으면 새 session이나 authority를 발명하지 않고 terminal `needs_human`을
보존한다. `cancelled`는 사용자 취소에만 사용한다.

`awaiting_confirmation`은 terminal discard가 아니다. 동일 `op_id`, failure key,
recovery attempt/session, worktree, preset provenance를 보존한다. 사용자가 세션을
resume해 필요한 판단이나 외부 준비를 마치면 coordinator가 authoritative readback 후
원래 phase로 돌아간다.

## 7. deadline과 deterministic retry

deadline은 실행 promise 경주만 종료해서는 안 된다. child/process tree를 terminate하고
close/error settlement까지 관측한 뒤 `timed_out` outcome을 durable하게 기록해야 한다.

| effect | deadline source | retry |
| --- | --- | --- |
| candidate materialization 전체 | Worker internal bounded policy | 기존 reconcile backoff 3회 안에서 같은 attempt |
| Git/GitHub/Beads control operation | Worker internal bounded policy | commit 전 또는 readback `not_applied`일 때만 |
| verify command | pinned `[verify].timeout_ms` | 기존 verify policy |
| deploy adapter | pinned `[deploy].timeout_ms` | adapter result/readback policy |
| runtime restart | managed journal identity + runtime readback deadline | 추측성 두 번째 restart 금지 |
| recovery session spawn | scheduler spawn/attempt monitor deadline | 동일 prerecord attempt adopt 또는 finite failure |

materialization의 `init`, remote 설정, fetch, checkout, readback 모두 deadline이 있는
`gitRun`을 사용한다. fetch timeout은 `materialize_timeout`으로 분류하고 기존 reconcile
retry budget과 backoff를 소비한다. budget 소진 뒤에도 saga loop는 반환해야 하며 바로
recovery classification을 시작한다.

내부 deadline 숫자는 repo declaration의 verify/deploy timeout 의미를 바꾸지 않는다.
사용자 설정 없이 모든 workspace에 적용하고 UI evidence에서 deadline source와 retry
count를 보여준다.

## 8. recovery session policy

### 8.1 공통 launch

유한 실패마다 stable failure key를 만들고 그 key에 recovery lineage를 하나만 허용한다.
session prerecord와 budget 소비를 한 durable mutation으로 처리한다. crash/restart는 같은
attempt/session을 adopt하며 duplicate session이나 새 budget을 만들지 않는다.

background automatic recovery는 UI-lbqw resolver를 다음처럼 호출한다.

- same provider: current effective model/effort/speed로 prior session resume
- provider mismatch: `resume_session_id=null`, 같은 owned worktree, current preset과
  provenance로 fresh session
- current preset invalid/unavailable: state mutation이나 fallback 없이
  `awaiting_confirmation:current_preset_unavailable`

수동 `이어하기`의 provider mismatch dialog는 UI-lbqw 동작을 유지한다. completion
background path만 `fresh_current`를 자동 선택한다. prior attempt snapshot은 불변이고 새
attempt가 `resumed_from`, continuation mode, actual tuple/provenance를 기록한다.

### 8.2 자동 허용 범위

recovery session은 다음을 자동 제안할 수 있다. issue-owned worktree 안의 code/config
수정은 session이 기존 runner 경계에서 수행한다. credential/permission/external effect는
session이 직접 shell mutation을 실행하지 않고 structured disposition을 durable하게
제출한다.

```js
{
  failure_key,
  action:
    'retry_original_effect' |
    'repair_worker_owned_mode' |
    'adopt_external_effect' |
    'request_confirmation',
  category,
  target_digest,
  expected_readback_digest,
  sanitized_evidence
}
```

coordinator는 source attempt, failure key, current op/binding, allowlisted action, exact target
ownership을 검사한 뒤 좁은 effect adapter만 실행한다. agent가 임의 command를
성공했다고 self-report한 것은 audit 또는 completion evidence가 아니다. 성공은
coordinator-owned authoritative readback으로만 확정한다.

1. issue-owned worktree의 code/config 수정, 검증, commit, PR 생성
2. 이미 존재하고 유효함을 tool/readback이 증명한 credential의 재사용
3. exact Worker-owned path이며 owner와 expected mode가 증명된 파일/디렉터리의 좁은
   mode 복구
4. authoritative readback으로 외부 effect가 적용됐음을 adopt하거나 적용되지 않았음을
   증명한 뒤 같은 effect를 retry
5. Worker-owned incomplete release의 recoverable quarantine과 재materialization

credential 값, raw auth output, secret-bearing config container는 prompt, log, queue,
audit, UI에 저장하지 않는다. credential probe는 key path/type/status만 사용한다.

### 8.3 confirmation hard stop

session은 자동으로 시작해 진단하지만 다음 mutation 직전에 멈춘다.

- credential 발급·회전·폐기 또는 새로운 auth authority 획득
- `sudo`, `chown`, Worker ownership이 증명되지 않은 path, broad recursive permission
- authoritative readback으로 결과를 판정할 수 없는 외부 effect 반복
- user data 삭제, remote history 변경, scope 밖 외부 시스템 mutation
- source-of-truth/ownership 충돌

durable confirmation에는 category, 요청 action, exact bounded target, sanitized evidence,
session/attempt ID, created time만 기록한다. secret이나 실행용 credential은 기록하지
않는다. UI는 `세션 이어하기`를 제공하고, 승인 또는 사용자의 외부 해결 뒤 같은
session/op에서 계속한다.

## 9. recovery audit와 Done badge

root completion intent는 bounded `recovery_audit`를 가진다. 최대 16개 event를 오래된
순서로 보존하고 초과분은 category별 count/digest summary로 접는다.

```js
{
  category:
    'credential_reuse' |
    'worker_owned_permission_repair' |
    'ambiguous_effect_reconciled',
  resolution: 'reused' | 'repaired' | 'adopted' | 'retried',
  effect_digest,
  readback_digest,
  attempt_id,
  at
}
```

event는 자동 action과 후속 readback이 모두 성공한 뒤 append한다. diagnosis만 했거나
사람이 실제 mutation을 수행한 경우에는 자동 해결 badge를 만들지 않는다. completion
`completed` 전환과 final audit seal, Done lane 진입은 crash-safe 순서로 수행하고
restart 후 중복 event/badge를 만들지 않는다.

UI projection은 category를 다음 badge로 접는다.

- `자동복구 · 자격증명 재사용`
- `자동복구 · 권한 복구`
- `자동복구 · 외부 결과 확인`

audit SoT은 Worker-owned `queue.json` completion record다. Bead label/metadata/notes에는
audit를 쓰지 않는다. Done 기간 필터가 행을 숨기기 전까지 restart 후에도 badge와
sanitized tooltip을 유지한다.

## 10. UI

사용자가 선택한 card 방향은 “primary 상태 하나 + 진행 경로”다.

```text
[자동 복구 중]
배포 준비가 멈춰 자동으로 복구하고 있어요

PR 제출 → PR 머지 → 배포 준비 → 검증·배포 → 정리 완료
                    ^ 현재

최근 조치: git fetch timeout · process 종료 · retry 1/3
```

primary 상태는 `진행 중`, `자동 복구 중`, `확인 필요`, `완료` 중 하나다. `머지됨`,
`root 머지 중`, `candidate_pinned`, `정리 중`을 독립 top-level badge로 동시에 표시하지
않는다. machine phase, SHA, op/attempt ID, retry/deadline, log path는 expandable evidence
또는 tooltip에 둔다.

`awaiting_confirmation`이면 category와 필요한 판단을 주 문장으로 표시한다.

```text
[확인 필요 · 권한]
Worker 소유 범위를 넘는 권한 변경이 필요해 자동 실행 전에 멈췄어요
[세션 이어하기]
```

repair child는 별도 root card로 중복 표시하지 않는다. linked repair PR은 root card의
evidence/link로만 표시한다. 완료 뒤에는 active recovery 문구를 지우고 recovery audit
badge만 Done 카드에 남긴다.

## 11. 현재 설정의 의미

자동 completion의 사용자-facing switch는 `auto_merge`다.

- 현재 `beads-ui`: `auto_merge=true`, `auto_advance=false`, slots 2,
  `pr_wait_holds_slot=false`, default preset `sol/ultra/Fast`
- 현재 `dotfiles`: `auto_merge=true`, `auto_advance=false`, slots 10,
  `pr_wait_holds_slot=false`, default preset `sol/xhigh/Standard`

설정 해석은 다음과 같다.

- `auto_merge=true`: PR 이후 root completion saga가 자동으로 계속된다.
- `auto_merge=false`: 다음 safe checkpoint에서 pause하고 재활성화 시 같은 intent를
  재개한다.
- `auto_advance`: 후보를 최초 실행으로 자동 dispatch할지 결정할 뿐 PR 이후 completion과
  무관하다. 현재처럼 `false`여도 된다.
- workspace default preset: 해당 workspace recovery session의 runner/model/effort/speed를
  결정한다.
- `slots`: recovery session도 일반 attempt처럼 slot을 사용한다.
- `pr_wait_holds_slot=false`: PR 대기 자체는 slot을 점유하지 않는다. completion root와
  merge queue ordering은 별도로 유지된다.
- pinned `[verify]/[deploy].timeout_ms`: verify/deploy command timeout이다. materialization과
  control-plane deadline은 Worker internal policy라 별도 설정이 필요 없다.

legacy `~/.config/bdui/config.toml`의 per-workspace verify/deploy section은 pinned repo
declaration이 없을 때만 fallback이다. beads-ui의 SoT은 pinned
`docs/agents/repo-ops.toml`이며 현재 `[verify] npm run all`, `[deploy]
scripts/managed-self-deploy.js`, 각 600000ms다.

## 12. `dotfiles-3vb8` migration

새 runtime startup은 다음 순서로 기존 durable state를 처리한다.

1. GitHub readback으로 PR #378 merged와 merge SHA `e3b3b224...`를 확인하고 prepared
   root merge op를 adopt한다.
2. pinned deployment reconcile attempt와 candidate/floor binding을 root effect에
   연결하고 attempt ID와 retry count를 보존한다.
3. managed receipt, failure journal, runtime pointer/process identity를 먼저 검사한다.
4. post-commit evidence가 있으면 release를 건드리지 않고 adopt/readback한다.
5. 현재처럼 `HEAD`가 없고 post-commit evidence도 없는 exact Worker-owned partial
   release는 삭제하지 않고 같은 filesystem의 quarantine 경로로 atomic rename한다.
6. 같은 reconcile attempt를 deadline이 있는 새 release materialization으로 재개한다.
7. retry가 성공하면 verify/deploy/readback/cleanup/close/Done까지 이어간다.
8. finite failure면 current-preset recovery session을 자동 시작한다. confirmation 경계가
   아니면 사용자의 추가 클릭을 기다리지 않는다.

quarantine은 candidate/repo/attempt binding과 timestamp를 이름 또는 receipt에 남긴다.
활성 runtime pointer, successful receipt, 다른 attempt가 참조하는 release는 quarantine
대상이 아니다.

## 13. 오류 수렴표

| 관측 | 처리 |
| --- | --- |
| materialization timeout, commit 전 증명 | process tree 종료, 같은 op bounded retry |
| transient network/lock, commit 전 증명 | 같은 op bounded retry |
| code/config regression | 자동 recovery session, same-Bead 또는 linked repair PR |
| same-provider prior session | current tuple로 resume |
| provider mismatch | 같은 worktree에 current-preset fresh session |
| existing valid credential | 값 노출 없이 reuse, readback 뒤 audit |
| exact Worker-owned mode drift | 좁은 repair, readback 뒤 audit |
| external effect already applied | adopt, readback digest audit |
| external effect not applied | 같은 op retry, 성공 뒤 audit |
| credential acquisition/rotation | 진단 후 awaiting confirmation |
| broad/unknown permission | 진단 후 awaiting confirmation |
| external effect outcome unknown | 반복 없이 awaiting confirmation |
| invalid current preset | mutation 없이 awaiting confirmation |
| malformed/contradictory durable binding | 진단 후 mutation 전 awaiting confirmation |
| user cancel | durable cancelled |

repair budget 소진만으로 조용히 버리지 않는다. 같은 failure key에 기존 recovery
session이 있으면 새 budget을 만들지 않고 그 session을 diagnostic continuation으로
resume한다. 안전하게 재개할 session lineage가 없으면 새 authority를 발명하지 않고
evidence와 operation을 `awaiting_confirmation` 또는 legacy `needs_human`에 보존한다.

## 14. Test scope

### RED-GREEN seam 1 — effect deadline과 settlement

1. 영원히 resolve되지 않는 materialization `git fetch`가 deadline 뒤 child/process tree를
   종료하고 `materialize_timeout`을 기록한다.
2. timeout promise가 coordinator loop를 막지 않고 기존 reconcile backoff/attempt를
   보존한다.
3. control-plane timeout 뒤 authoritative readback이 applied/not-applied/unknown으로 각각
   adopt/retry/confirmation에 수렴한다.

### RED-GREEN seam 2 — single authority와 restart

1. startup이 root completion coordinator를 복원한 뒤 persisted reconcile을 effect로
   schedule하며 unresolved child promise가 다른 intent를 막지 않는다.
2. effect prerecord/run/settle/consume 각 crash point에서 duplicate merge, restart, close,
   Done이 없다.
3. 같은 failure key의 recovery attempt/session과 budget이 restart 후 정확히 한 번 유지된다.

### RED-GREEN seam 3 — UI-lbqw continuation integration

1. landed resolver를 completion recovery의 모든 relaunch caller가 우회하지 않는다.
2. same provider는 같은 worktree/session + current tuple이다.
3. provider mismatch background recovery는 prompt 없이 같은 worktree의 current-preset
   fresh session을 한 번 만든다.
4. manual resume mismatch dialog와 prior attempt immutability는 유지된다.
5. invalid/unavailable current preset은 spawn/metadata mutation 없이 confirmation에 멈춘다.

### RED-GREEN seam 4 — 민감 자동복구와 audit

1. existing valid credential reuse는 secret을 queue/log/UI에 남기지 않고 readback 뒤
   `credential_reuse` audit를 만든다.
2. exact Worker-owned permission repair만 허용하고 broad path, `sudo`, `chown`은 effect
   0회로 confirmation에 멈춘다.
3. ambiguous external effect 세 readback이 adopt/retry/confirmation으로 정확히 나뉜다.
4. audit append/final seal/Done 전환 사이 crash 후 event와 badge가 중복되지 않는다.
5. restart 후 Done 카드 badge가 유지되고 Bead label/metadata write가 0회다.
6. agent self-report만으로 민감 action 성공이나 audit가 생성되지 않고, structured
   disposition의 identity/target drift는 effect 0회로 거부된다.

### RED-GREEN seam 5 — UI projection

1. 모든 fine phase가 primary 상태 하나와 다섯 단계 progress에 정확히 매핑된다.
2. `머지됨`, `root 머지 중`, `candidate_pinned`가 top-level badge로 중복되지 않는다.
3. active recovery, confirmation, completed audit가 서로 배타적인 주 문구를 가진다.
4. unknown optional field는 fail-quiet하되 malformed durable intent는 visible confirmation
   evidence를 만든다.
5. Worker와 Monitor가 같은 projection/label을 사용한다.

### RED-GREEN seam 6 — `dotfiles-3vb8` startup fixture

현재 queue snapshot과 partial release shape를 fixture로 고정한다.

1. merged PR readback과 prepared merge op adopt
2. pinned reconcile attempt/retry budget 보존
3. post-commit evidence 없음 + `HEAD` 없음 release만 atomic quarantine
4. deadline 있는 rematerialization
5. verify/deploy/runtime readback/cleanup/close/Done 완주
6. restart를 중간마다 주입해 duplicate effect 0회

### Regression과 완료 검증

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`
- generated `app/main.bundle.js`와 map 포함
- local full worker flow fixture
- UI-f17c PR merge 후 pinned managed deploy
- merged checkout의 process path, listening port, HTTP response readback
- 실제 `dotfiles-3vb8`이 `completed`/Done으로 수렴하고 stale root/merge/reconcile badge가
  사라졌는지 확인

## 15. 완료 조건

1. UI-lbqw가 먼저 merge·deploy되고 UI-f17c가 그 landed resolver를 사용한다.
2. PR 제출 뒤 confirmation hard stop이 아니면 사용자 click 없이 root completion이
   Done까지 진행한다.
3. 모든 blocking effect가 deadline/readback 중 하나를 가지며 무기한 promise가 없다.
4. 모든 finite failure가 bounded retry 또는 automatic recovery session으로 이어진다.
5. 민감 자동복구 성공은 secret 없는 durable audit와 Done badge로 남는다.
6. 확인이 필요한 경우 동일 session/op에서 resume 후 flow가 계속된다.
7. UI는 primary 상태 하나와 다섯 단계 progress를 표시한다.
8. 현재 `dotfiles-3vb8`이 새 startup migration으로 완주한다.
9. Bead workflow label/metadata contract를 변경하지 않는다.
10. merge 후 managed deploy와 실제 shared runtime readback을 통과한다.
