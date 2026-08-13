# 닫힌 PR 대기 정리 실패의 안전한 수동 복구 설계

- Bead: `UI-q1hs`
- Route: `spec_backed`
- 승인 근거: 2026-08-13 대화에서 수동 정리 유지, 상태·화면·검증 설계 승인

## 배경과 진단

Worker가 소유한 정상 머지 경로는 `base_sync → post_merge_verify →
deployment_request → child_sweep → branch_cleanup → parent_close` 순서다. 이
경로가 `closed`까지 도달했다면 앞선 정리는 끝나 있어야 한다.

하지만 GitHub, Beads, `queue.json`은 하나의 transaction이 아니다. 실제
`UI-f17c`/PR #128에서는 `post_merge_verify`가 실패해 durable
`cleanup_failed`와 `pr_wait`가 남은 뒤, 별도 세션이 main 검증·배포 확인을 근거로
Bead를 `closed`했다. 그 결과 화면에는 `머지됨 · 정리 미완`과 `정리 실패`가
보이지만 early-stage 실패에는 `[정리]` 동선이 없어 복구할 수 없다. 같은 화면에서
외부 세션 PR #127은 GitHub 상태가 `MERGED`인데도 이유가 `PR 대기`로 표시된다.

현재 server의 `retryCleanupLocked`는 closure 실패만 단계 재개하고 다른 실패는
`runCleanup`으로 보낼 수 있다. 그러나 UI가 `base_sync`와
`post_merge_verify`를 retry 가능 상태로 분류하지 않으며, 기존 early-stage 실패
레코드를 보존한 채 성공 경계를 넘기는 server 계약도 없다. 단순히 버튼만 켜면
재검증 후 `closeCoveredRow`가 기존 early-stage 실패를 다시 보고 중단하므로 root
cause가 해결되지 않는다.

## 목표

1. `closed + pr_wait/cleanup_failed`를 자동으로 숨기지 않고 복구 가능한 비정상
   상태로 보존한다.
2. `base_sync`·`post_merge_verify` 실패는 전체 cleanup을 안전하게 다시 실행하고,
   closure 실패는 현재처럼 실패 단계부터 재개한다.
3. 기존 실패 증거는 새 실행이 성공 경계를 통과할 때까지 보존하고, 재실패하면 최신
   원인과 로그로 교체한다.
4. 외부 `MERGED` 행과 closed cleanup-failure 행의 문구를 실제 상태에 맞춘다.
5. repo-level deployment recovery와 수동 cleanup retry의 소유권을 섞지 않는다.

## 제외 범위

- `closed` 관측만으로 cleanup을 자동 실행하거나 Done으로 이동
- `cleanup_failed`만 지우는 관리 동작
- `deployment_request`·`deploy` 실패를 카드 `[정리]`로 우회
- `queue.json` schema migration 또는 새 durable status/metadata key
- dotfiles workflow 계약, Bead status 어휘, merge/cleanup 순서 변경
- 새 UI component, 색상, layout 또는 자동 external PR cleanup

## 권위와 불변식

- GitHub의 click-time PR 재조회가 cleanup 실행 권위다. UI의 durable
  `cleanup_failed`는 버튼 노출 근거일 뿐, server는 클릭 때 PR이 `MERGED`인지 다시
  확인한다.
- `queue.json.cleanup_failed`가 cleanup 실패의 durable evidence다. 수동 재시도 중
  evidence를 먼저 삭제하지 않는다.
- `deployment_request`와 provider 상태는 repo-level deployment job/recovery가
  소유한다. 카드 retry는 이 경로를 대신하지 않는다.
- parent `closed`는 이미 완료된 lifecycle write일 수 있다. 정리 재개는 child/branch
  residue를 마친 뒤 parent가 `closed`임을 확인하면 성공으로 끝나야 하며, reopen이나
  receipt 변경을 만들지 않는다.
- Bead status는 화면 설명에만 쓰는 partial projection이다. status cache miss가 action
  authority나 cleanup 실행을 막거나 허용하지 않는다.

## 설계

### 1. Cleanup retry 분류

Cleanup failure를 세 범주로 나눈다.

| 범주 | 단계 | 동작 |
| --- | --- | --- |
| early retry | `base_sync`, `post_merge_verify` | 전체 `runCleanup` 재실행 |
| closure retry | `child_sweep`, `branch_cleanup`, `parent_close` | 기존 실패 단계부터 재개 |
| deployment-owned | `deployment_request`, legacy `deploy` | 카드 retry 차단, deployment recovery 유지 |

UI와 server는 같은 문자열 집합을 테스트로 고정한다. server가 최종 실행 권위이며,
알 수 없는 단계는 fail-closed로 retry를 제공하지 않는다.

### 2. Early-stage 수동 재시도

`merge()`는 지금처럼 클릭 시점에 GitHub를 다시 조회한다. PR이 `MERGED`이고 해당
Bead에 early-stage `cleanup_failed`가 있으면 `retryCleanupLocked`가 수동 retry
표시와 함께 `runCleanup`을 호출한다.

기존 failure record는 `base_sync`와 `post_merge_verify` 동안 유지한다.

- 재실행이 다시 실패하면 `recordCleanupFailure`가 같은 key를 최신 step, reason,
  detail, output tail, log path로 교체한다.
- early 단계와 `deployment_request`가 성공해 closure로 넘어갈 때만 기존 early
  failure를 소비한다.
- 그 뒤 `child_sweep → branch_cleanup → parent_close`를 정상 순서로 실행한다.
- 프로세스가 early 단계 중 종료되면 이전 failure record가 남아 다시 수동 복구할 수
  있다.

이를 위해 `runCleanup`/`closeCoveredRow` 사이에 “사람이 승인한 early retry”를
나타내는 내부 boolean 또는 동등한 bounded 신호를 전달한다. 이 신호가 없으면 기존
failure가 있는 자동/poller 경로는 계속 `merged_cleanup_failed`로 멈춘다. 별도 retry
policy나 background loop를 추가하지 않는다.

### 3. Closure 재시도와 이미 closed인 parent

Closure 단계는 기존 `resume_index` 의미를 유지한다. 해당 단계 전의 완료 작업을
반복하지 않고 실패 단계부터 진행하며, failure record는 closure 진입 시 소비한다.

parent close는 같은 status 쓰기와 readback이 반복돼도 terminal success여야 한다.
이미 `closed`인 Bead는 reopen하지 않고 `closed` readback을 확인한 뒤 Done 이동과
failure 제거를 완료한다. child sweep과 branch/worktree cleanup 성공 전에는 Done으로
옮기지 않는다.

### 4. Bead status의 display-only projection

기존 title cache가 `bd show` 한 번에서 title, timestamps, labels를 읽는다. 같은
record에 normalized `status`를 추가하고 `statusesFor` projection을 제공한다.
`decorateQueue`는 `bead_statuses`를 additive wire field로 싣는다.

- 추가 `bd` process를 만들지 않는다.
- cache miss나 malformed status는 key를 생략한다.
- 기존 title/timestamp/label partiality와 TTL을 그대로 따른다.
- client는 missing status를 추측하지 않는다.

이 값은 문구 선택에만 사용하고 server action guard에는 사용하지 않는다.

### 5. PR 대기 카드 문구와 버튼

기존 카드 구조와 badges를 유지하면서 reason과 `[정리]` eligibility만 바꾼다.

- external + GitHub `MERGED` + failure 없음:
  `머지됨 · 정리 대기`, `[정리]` 활성
- cleanup failure + Bead status `closed`:
  `닫힘 · 정리 미완`, `정리 실패` badge 유지
- cleanup failure + status가 `closed`가 아니거나 unknown:
  `머지됨 · 정리 미완`, `정리 실패` badge 유지
- ordinary open PR:
  기존 `PR 대기` 유지

Early/closure failure는 GH observation cache가 아직 비어 있는 재시작 직후에도
`[정리]`를 표시한다. durable failure는 이미 머지 후 cleanup이 시작됐다는 근거이고,
실제 클릭은 server의 GitHub 재조회가 fail-closed로 보호한다.

Tooltip은 동작 차이를 드러낸다.

- early retry: `base sync부터 검증과 정리를 다시 실행`
- closure retry: `남은 정리를 실패 단계부터 재개`
- external merged: `클릭하면 머지 후 정리를 수행`

`deployment_request`/`deploy` failure, active discard, merge queue activity,
completion recovery lock은 기존 차단 조건을 유지한다.

## 오류 처리

- GitHub 재조회가 실패하거나 PR이 `MERGED`가 아니면 mutation 없이 기존 refusal을
  반환한다.
- early retry가 재실패하면 기존 record를 최신 evidence로 교체하고 `pr_wait`에
  남긴다.
- status projection 실패는 문구를 `머지됨 · 정리 미완` fallback으로 표시하며 action
  semantics에는 영향이 없다.
- deployment recovery가 pending/running/failed이면 기존 recovery surface가 계속
  actions를 잠근다.
- cleanup 성공 전에는 `cleanup_failed`, `pr_wait`, branch/worktree residue를 숨기지
  않는다.

## Test scope

### RED-GREEN seams

1. `server/worker/pr-actions.test.js`
   - `post_merge_verify`와 `base_sync` failure의 수동 retry가 전체 cleanup을 재실행한다.
   - 기존 failure는 early 단계 동안 유지되고, 재실패 시 최신 evidence로 교체된다.
   - 성공한 수동 retry는 closure를 진행해 failure를 제거하고 Done으로 이동한다.
   - 이미 closed인 parent도 readback-confirmed success로 끝난다.
   - deployment-owned failure와 자동/poller 경로는 early retry authority를 얻지 않는다.
2. `server/worker/title-cache.test.js`, `server/ws.worker-queue.test.js`
   - status가 기존 한 번의 `bd show` 결과와 같은 cache record에 저장된다.
   - `bead_statuses`는 partial additive projection이며 miss/malformed 입력을 생략한다.
3. `app/views/worker/index.test.js`
   - external MERGED는 `머지됨 · 정리 대기`를 표시한다.
   - closed cleanup failure는 `닫힘 · 정리 미완`, unknown/non-closed는
     `머지됨 · 정리 미완`을 표시한다.
   - early retry는 observation 없이 `[정리]`가 활성화되고 전체 재실행 tooltip을 쓴다.
   - closure retry tooltip과 deployment-owned 차단은 유지된다.

### Regression verification

- focused tests
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`
- `git diff --check`
- frontend source 변경 후 `app/main.bundle.js`와
  `app/main.bundle.js.map` 갱신 확인

새 worktree에서 첫 검증 전에 `node --version`이 `package.json#engines`를 만족하고
`npm ls --depth=0`이 성공하는지 확인한다. 의존성이 없으면 해당 worktree에 설치하며
다른 checkout의 `node_modules`를 빌리거나 symlink하지 않는다.

## 수용 기준

1. `base_sync`·`post_merge_verify` cleanup failure 카드에서 `[정리]`를 눌러 안전하게
   전체 cleanup을 재실행할 수 있다.
2. early retry 중 crash/재실패가 기존 evidence를 조용히 삭제하지 않는다.
3. closure failure는 실패 단계부터 재개하고 성공해야만 Done으로 이동한다.
4. 이미 closed인 parent와 남은 branch/worktree cleanup이 함께 안전하게 정산된다.
5. external MERGED 행은 `PR 대기`로 거짓 표시되지 않는다.
6. closed cleanup failure와 일반 merged cleanup failure를 화면 문구로 구분한다.
7. deployment recovery 소유 단계와 기존 discard/merge/recovery lock은 변하지 않는다.
8. queue durable schema와 dotfiles workflow 계약은 변하지 않는다.
9. focused/full 검증과 rebuilt bundle이 모두 통과한다.

## 배포와 완료

변경은 현재 Bead의 PR에 server, frontend source, tests, rebuilt bundle을 함께 싣는다.
required no-PR residue는 없으며, merge 후 live apply는
`docs/agents/repo-ops.toml`의 `[deploy]` 선언이 소유한
`scripts/deploy-self.js`를 exact candidate release에서 실행하는 경로만 사용한다.

적용 순서와 각 성공 경계는 다음과 같다.

1. provider는 `BDUI_DEPLOY_TARGET_SHA`로 고정된 candidate에서 실행하고, 현재
   checkout의 `HEAD`가 target SHA와 같으며 tracked worktree가 clean인지 확인한다.
   불일치하면 runtime pointer를 건드리지 않고 중단한다.
2. 같은 candidate에서 `npm ci`와 `npm run build`를 순서대로 실행한다. 어느 명령이든
   실패하면 pointer publish 전에 중단하며, 기존 shared runtime은 유지된다.
3. 검증된 candidate를 임시 symlink에 준비한 뒤 `rename`으로 runtime `current`
   pointer를 atomic publish한다. publish 전 중단은 기존 pointer를 보존한다. 임시
   pointer 준비나 rename이 실패하면 임시 항목을 정리하고 실패를 반환한다.
4. publish 후 `bdui-shared restart`를 실행한다. restart 실패 시 성공으로 기록하지
   않으며 pointer는 같은 candidate를 가리킨다. 이 상태는 같은 target SHA로 1단계부터
   재실행해 안전하게 복구한다.
5. restart 후 bounded `/healthz` polling으로 선언된 endpoint와 port의 HTTP 응답을
   확인하고, 응답의 `runtime.source_sha`가 target SHA인지와
   `runtime.source_repo`의 realpath가 candidate release path인지 검증한다. timeout,
   HTTP 실패, SHA/path 불일치는 모두 terminal deploy failure이며 같은 candidate
   replay가 복구 절차다.

중단 시점이 pointer publish 전이면 이전 runtime이 그대로 남고, publish 이후라면
pointer가 exact candidate를 유지한다. restart 이후 health readback 전에 실행이
끊겨도 같은 candidate 적용을 다시 시작할 수 있다. provider는 bounded health 검증까지
통과하기 전에는 deploy 성공을 기록하지 않으며, 실패 상태와 recovery evidence를
durable하게 남긴다.

provider 성공 뒤 controller의 최종 완료 검증은 `~/.config/bdui/config.toml` runtime
설정 정합, 실제 shared process가 merged candidate 경로에서 실행되는지, 선언된
listening port를 소유하는지, 해당 port의 `/healthz`가 target SHA/path와 함께
응답하는지를 다시 읽는다. process 확인 출력은 PID, PPID, state와 sanitized executable
name으로 제한한다. 이 readback을 모두 통과해야 작업 완료를 선언한다.
