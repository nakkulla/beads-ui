# 구형 managed 배포 실패 residue 수렴 설계

## 상태

- 사용자 설계 승인: 2026-08-13
- route: `spec_backed`
- owning Bead: `UI-oj2f`
- affected incident: `dotfiles-3vb8` / PR #378

## 문제

retired managed deployment protocol에서 생성된 PR cleanup failure가 현재
external deployment job으로 전환된 뒤에도 `queue.json`에 남는다. 확인된 residue는
다음 exact signature를 가진다.

```text
step=deploy
reason=managed_failure_record_invalid
detail=failure_absent
retryable=false
```

현재 loader는 이 레코드와 `completion_intent.phase=paused`를 그대로 보존한다. cold
cutover 자동 수렴은 `deploy_not_detached_for_self`만 허용하므로, 이후 external
provider가 더 최신 SHA를 성공적으로 배포하고 그 SHA가 PR merge commit을 포함해도
해당 행은 `정리 실패`, `자동복구 일시정지`, `머지됨 · 정리 미완`으로 남는다.

구형 managed Adapter와 `managed_failure_record_invalid` active writer는 이미 제거되어
같은 failure가 신규 배포에서 생성되지는 않는다. 문제는 retired protocol의 durable
residue를 현재 provider authority로 수렴하는 compatibility gap이다.

## 사용자 결과

1. exact legacy residue는 현재 external provider의 성공 배포가 PR merge를 포함하면
   자동으로 기존 closure 순서를 완료하고 PR 대기 행에서 사라진다.
2. pending, running, failed, binding mismatch, ancestry mismatch, provider read failure에서는
   failure evidence와 Bead 상태를 그대로 보존한다.
3. 다른 `step=deploy` failure와 exact signature의 near-miss는 자동으로 지우지 않는다.
4. 기존 `deploy_not_detached_for_self` cold-cutover 복구는 동일한 증거 기준을 사용한다.

## 목표

1. 두 active consumer가 공유하는 좁은 pure predicate로 지원 대상 legacy residue를
   정의한다.
2. subscriber가 없어도 poller가 지원 대상 residue를 deployment observation demand로
   인식하게 한다.
3. GitHub의 authoritative merge SHA와 provider의 successful `deployed_sha` ancestry를
   모두 확인한 뒤에만 residue를 수렴한다.
4. 성공 시 기존 `closeCoveredRow`를 재사용해 child sweep, branch cleanup, parent close,
   Done 이동과 completion intent 완료를 한 choreography로 유지한다.

## 비목표

- 모든 과거 `step=deploy` failure의 일반 자동 삭제
- `queue.json` load 시 signature만 보고 evidence 없이 삭제
- provider request 또는 deployment effect 재실행
- 새 버튼, badge, 색상, WebSocket field 추가
- current deployment provider contract나 durable schema 변경
- `dotfiles-3vb8`의 과거 failure 원인 복원

## 설계

### Shared legacy predicate

`server/worker/completion-repair-policy.js`에 pure predicate를 추가한다. 지원 대상은
다음 두 경우뿐이다.

1. 기존 cutover residue: `step=deploy`, `reason=deploy_not_detached_for_self`
2. 이번 retired managed residue: `step=deploy`,
   `reason=managed_failure_record_invalid`, `detail=failure_absent`,
   `retryable=false`

두 번째 조건의 필드 하나라도 다르면 false다. `retry_count`는 retry 횟수에 따라 달라질
수 있는 evidence이므로 identity 조건으로 사용하지 않는다.

이 predicate를 다음 두 active consumer가 함께 사용한다.

- `server/worker/pr-poller.js`: subscriber-independent deployment observation demand
- `server/worker/pr-actions.js`: merged cleanup에서 legacy adoption 허용 여부

이로써 demand와 effect gate의 vocabulary가 갈라지지 않는다.

poller 안에서는 repo-level status-only demand와 legacy GitHub-observation demand를
구분한다. 두 demand 모두 subscriber 없이 poller를 깨우지만, `onDeployment`가 provider
status를 읽은 뒤의 조기 return은 status-only demand에만 적용한다. 지원 대상 legacy
residue가 있으면 subscriber가 0이어도 durable `pr_wait`를 계속 순회해 `prDetail`에서
authoritative merge SHA를 얻고 `onMerged`까지 전달한다. near-miss는 legacy demand를
만들지 않는다.

### Evidence-gated adoption

poller가 GitHub에서 PR을 `MERGED`로 관측하고 merge SHA를 얻으면 기존
`adoptLegacyDeployment`를 호출한다. 이 함수는 external provider에 새 request를 보내지
않고 `status`만 읽는다. 수렴 조건은 모두 충족해야 한다.

1. provider status가 `succeeded`다.
2. provider binding의 `target_base`가 해당 row의 expected base와 같다.
3. provider parser가 보장한 `deployed_sha == target_sha` binding이 존재한다.
4. `git merge-base --is-ancestor <merge_sha> <deployed_sha>`가 성공한다.

기존 구현의 ancestry 대상은 `target_sha`였고 provider가 아직 pending이어도 binding만
있으면 closure로 진행할 수 있었다. 이를 `succeeded`의 `deployed_sha`로 강화해 배포
완료 전 Bead close를 금지한다.

조건이 충족되면 기존 `recordDeploymentBinding`으로 row와 repo observation을 함께
기록한 뒤 `closeCoveredRow`를 실행한다. `closeCoveredRow`가 legacy
`cleanup_failed`를 지우고 다음 순서를 소유한다.

```text
child sweep -> branch cleanup -> parent close -> Done
```

`moveToDone`이 completion intent를 `completed`로 전환하므로 별도 saga 삭제나
`queue.json` 직접 수정은 하지 않는다.

### Failure preservation

다음 경우에는 row, cleanup failure, completion intent, Bead status를 변경하지 않는다.

- provider가 `idle`, `pending`, `running`, `failed`
- provider status read 실패 또는 malformed response
- expected base와 provider target base 불일치
- merge SHA 또는 deployed SHA ancestry 확인 실패
- exact predicate near-miss
- child sweep, branch cleanup, parent close의 후속 실패

후속 closure failure는 기존 `recordCleanupFailure` 계약으로 새 단계와 원인을 기록한다.
poller는 supported legacy residue가 남아 있는 동안만 demand를 유지하므로 provider가
나중에 성공하면 다음 bounded poll에서 다시 증거를 확인할 수 있다.

`onDeployment`가 연결된 실제 runtime에서도 legacy demand가 status-only 조기 return에
막히지 않아야 한다. 이 경계는 helper 단위 판정만이 아니라 subscriber 0의 poller pass로
검증한다.

## 영향 범위

- `server/worker/completion-repair-policy.js`
- `server/worker/pr-poller.js`
- `server/worker/pr-actions.js`
- 위 동작을 고정하는 focused tests

frontend source와 bundle, provider CLI, workflow contract, durable JSON schema는 바꾸지
않는다.

## Test scope

RED-GREEN seam은 다음으로 고정한다.

- pure policy test: exact managed signature와 기존 cutover signature는 true, field별
  near-miss와 다른 deploy failure는 false
- `server/worker/pr-poller.test.js`: `onDeployment`가 연결되고 subscriber가 0인 실제
  runtime 조건에서 exact managed residue와 기존 cutover residue가 status observation
  뒤에도 `prDetail`과 `onMerged`까지 도달함. near-miss는 `onDeployment`, `prDetail`,
  `onMerged` 어느 것도 호출하지 않음
- `server/worker/pr-actions.test.js`: provider `succeeded`의 `deployed_sha`가 merge SHA를
  포함할 때 `deploymentStatus`를 호출하지만 request는 보내지 않고 binding, cleanup,
  close, Done을 완료함
- `server/worker/pr-actions.test.js`: exact managed residue의 pending/failed status에서
  `deploymentStatus`까지 호출했지만 binding, closure, Done은 발생하지 않고 cleanup
  failure와 `resolved` 상태를 보존함
- `server/worker/pr-actions.test.js`: exact managed residue의 deployed non-ancestor에서
  ancestry check까지 도달했지만 binding과 closure는 발생하지 않음
- 기존 `deploy_not_detached_for_self` succeeded adoption test는 회귀 test로 유지함
- 기존 cutover residue의 pending/failed status가 변경 전처럼 조기 close되지 않는
  RED seam을 추가함

pure predicate와 exact managed positive, subscriber 0 poller, 기존 cutover pending/failed
seam은 변경 전 실패해야 한다. 기존 cutover succeeded positive는 새 동작의 RED 증거가
아니라 호환성 회귀 증거로만 취급한다.

Focused verification:

```bash
npm test -- server/worker/completion-repair-policy.test.js server/worker/pr-poller.test.js server/worker/pr-actions.test.js
```

Pre-handoff verification:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

frontend source를 수정하지 않으므로 `npm run build`와 bundle 갱신은 필요하지 않다.

## 완료 조건

1. exact legacy residue만 shared predicate로 두 consumer에서 동일하게 판정된다.
2. provider success와 deployed ancestry 없이는 어떤 durable cleanup/Bead 상태도 지워지지
   않는다.
3. 성공 evidence가 있으면 기존 choreography로 Bead가 closed/Done에 도달하고 paused
   completion intent가 완료된다.
4. focused 및 pre-handoff verification이 모두 통과한다.
