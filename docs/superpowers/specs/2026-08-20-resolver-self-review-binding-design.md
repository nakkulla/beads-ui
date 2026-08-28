---
scope:
  - server/worker/head-review.js
  - server/worker/merge-queue.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/pr-actions.js
---

# resolver 무디스패치 self-review 결속 성립 (UI-ww5s)

> **은퇴 (UI-d7fy, 2026-08-28).** 이 문서가 설계한 `resolver-self:` 영수증
> 결속은 그 검증기(`head-review.js`)와 함께 제거됐다. 큐가 소유한 `resolver:`
> 해소 커밋도 다른 커밋과 같이 머지 게이트의 `impl_review` ancestry 하나로
> 판정하며, 영수증 부재·비조상은 게이트 보류로 남아 `[리뷰 후 머지]` 클릭이
> 유일한 출구다. `resolver-self:`는 `carry:`와 함께 폐기된 영수증 형식이다(과거
> 기록만 읽는다). 제거 근거는
> `docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`
> 이며, 이 파일은 기록으로만 남는다.

## 1. 문제

계약(dotfiles `docs/contracts/workflow.md` Worker manual merge continuation,
185–186행)은 큐 authority의 `resolver:<attempt>` mutation 산물 head에 대해
"해소 세션의 exact-delta self-review가 머지 전 필수조건이고 external
reviewer는 디스패치하지 않는다"고 규정한다. `head-review.js`의
`relaxQueueMutation` resolver 갈래는 이 강제점을 이미 구현했지만
(`resolver-self:<attempt>:<prior>@<result>` exact 대조, lineage 증명,
post-head readback, `resolver_self_review_not_approved`), 세 입력이 끊겨
있어 항상 우회된다:

1. `merge-queue.js`가 resolver ready 시점에 `vouched.result_head_sha=null`을
   의도적으로 쓴다(UI-vkk8 §4 — 당시 resolver attempt가 authoritative pushed
   head를 노출하지 않았다). resolver 갈래는 result 결속이 없으면 `null`을
   반환하고 관측 head 전체 외부 리뷰로 떨어진다.
2. `scheduler.js`의 `conflictPrompt`는 exact-delta self-review를 지시하지만
   attempt id·prior SHA·영수증 형식·`bd update` 절차를 세션에 전달하지
   않으므로, 영수증을 쓰는 주체가 코드에 없다.
3. resolver 갈래가 요구하는 `starting_approval`(드레인 진입 시
   `impl_review`가 authority requested head에 유효하다는 스냅샷,
   head-review.js `relaxQueueMutation` 초입 검증)은 의도적으로
   caller-local이다(UI-vkk8 §4). 세션이 `resolver-self:` 영수증을 같은
   `impl_review` 키에 쓰면 원 승인 증거가 덮어써지므로, 드레인이 yield
   (`RESOLUTION_WAIT_MS` 30분 초과)·재시작·halt 후 재진입하면 재캡처가
   실패하고 — 영수증을 제대로 썼어도 — 외부 리뷰로 떨어진다.

결과: 안전 손실은 없으나(외부 리뷰가 self-review보다 강한 게이트) 계약이
약속한 무디스패치가 성립하지 않는다.

## 2. 원칙 — 검증기는 무변경, 입력을 성립시킨다

UI-vzyh가 리뷰·착지시킨 `head-review.js`의 resolver 강제점 semantics는
바꾸지 않는다. 이번 작업은 그 검증기에 끊긴 입력들을 공급한다.
`starting_approval` 요구 자체도 존치한다 — 충돌 PR은 리뷰 게이트(clean
probe에서만 실행) 전에 해소로 빠질 수 있어, resolver self-review(해소
델타만 커버)만으로 머지하면 원 구현 델타가 미리뷰인 채 통과할 수 있기
때문이다. 판정 의미의 canonical 소유자인 dotfiles 계약도 개정하지 않는다
— 185–187행이 정상 경로(영수증 성립 → 무디스패치)와 부재 처분
(missing/malformed → observed head 전체 외부 리뷰)을 이미 함께 규정하며,
이 변경은 계약의 미실현 약속을 코드가 따라가는 방향이다. authority와
resolution 대기 레코드는 beads-ui queue 내부 state이므로(계약 193행) 새
Bead metadata 키 없이 확장할 수 있다.

## 3. 결속 — 영수증 유도 (승인된 설계 선택)

세션이 쓴 영수증 자체를 결속의 유일한 SoT로 쓴다. 관측 결속(ready 시점
원격 tip을 result로 채택)은 resolver push 이후 외부 커밋이 끼면 남의
head를 resolver 산물로 오결속해 외부 리뷰 fallback 대신 하드 정지를
소모하므로 기각. 세션 보고 채널(marker 라인 → attempt 기록)은 attempt
스키마·파싱·재시작 내구성이 추가되는 이중 채널이라 기각.

- **`head-review.js`**: 부수효과 없는 메서드
  `captureResolverBinding(subject_bead_id, { attempt_id, prior_head_sha })`를
  추가하고 `createHeadReview` 반환 객체(`{ captureStartingApproval,
  ensureApproved }`)에 함께 노출한다. `deps.readReceipt`로 `impl_review`를
  읽고 기존 `RESOLVER_RECEIPT_RE`로 raw를 파싱해, `<attempt>`가
  `attempt_id`와, `<prior>`가 `prior_head_sha`와 (소문자 정규화 후) 일치할
  때만 `<result>` SHA(소문자)를 반환한다. 부재·malformed·불일치는 전부
  `null`. 영수증 형식 지식은 head-review 한 모듈에 남는다.
- **`merge-queue.js`** 수동 continuation 드레인(`driveManual`의
  `resolution.kind === 'ready'` 분기, 현행 1638행 부근): mutation 결속과
  함께 `vouched.result_head_sha = await
  deps.headReview.captureResolverBinding(bead_id, { attempt_id:
  resolution.attempt_id, prior_head_sha: entry.authority.requested_head_sha })`.
  authority 부재, helper 미배선, 파싱 실패는 `null` 그대로 두어 현행과
  동일하게 외부 전체 리뷰로 떨어진다. UI-vkk8 §4를 인용하는 주변 주석을
  이 설계로 갱신한다.
- 이후는 기존 기계 그대로: `relaxQueueMutation` resolver 갈래가 observed
  head == result, lineage(prior→head ancestry + 원격 tip 일치), 영수증
  exact 재대조, post-head readback을 강제한다.

## 4. 프롬프트 계약 — 세션이 영수증을 쓸 수 있게

`conflictPrompt(bead_id, target_base, receipt_ctx)`로 확장한다.
`receipt_ctx = { attempt_id, prior_head_sha }`가 있으면 기존 지시에 다음을
추가한다:

- **self-review 범위는 영수증이 주장하는 범위와 정확히 같다**: 큐가 준
  `prior_head_sha`부터 push한 결과 head까지의 exact delta를 검토할 것.
  자신의 워크트리가 기억하는 해소 전 head가 아니라 큐가 준 prior를 쓴다 —
  queue-owned `base_update`가 끼었으면 둘이 다르고, 그 경우 base_update
  머지 커밋을 포함한 전 범위가 검토 대상이다.
- self-review verdict가 **APPROVE일 때만**, push한 결과 head SHA로
  `bd update <bead_id> --set-metadata
  impl_review=resolver-self:<attempt_id>:<prior_head_sha>@<결과 head 40hex>`를
  기록하고 `bd show <bead_id> --json`으로 readback할 것. attempt id와
  prior는 큐가 준 값을 그대로 쓰고 자신이 관측한 값으로 대체하지 말 것.
- verdict가 REVISE면 push 전에 스스로 고친 뒤 다시 self-review할 것.
  영수증 없이 종료하면 이 PR은 관측 head 전체 외부 리뷰로 떨어진다는
  사실 고지.

`receipt_ctx`가 없으면 현행 문구 그대로 — 영수증 지시를 전혀 싣지 않는다.

### prior의 SoT는 큐 authority다

영수증의 `<prior>`는 `head-review.js`가 기대하는
`authority.requested_head_sha`여야 한다. 디스패치 시점 관측 head는 중간에
queue-owned `base_update`가 끼면 이 값과 다르다. 전달 경로:

- `merge-queue.js` `runLatestMerge`의 dirty 분기 `deps.dispatchConflict`
  payload(`{ head_sha, base_ref }`)에 `receipt_prior_sha:
  entry.authority.requested_head_sha`를 추가하되, `authority.source ===
  'manual'`일 때만 싣는다(automatic·부재 시 null) — resolver 무디스패치
  결속은 manual continuation에서만 소비되고, automatic 항목의 파생
  영수증도 아래와 같은 `existing_current` 위험을 만들기 때문이다.
- `pr-actions.js` `dispatchResolution` / `dispatchExternalResolution`이
  scheduler 호출로 통과.
- `scheduler.js` `resolveConflict` / `dispatchExternalConflict` 인자로 수령.

**`receipt_ctx`는 manual-authority 큐가 `receipt_prior_sha`를 명시적으로
전달한 디스패치에서만 생성한다.** 큐 밖 디스패치(클릭 관측 head만 있는
경로)는 현행 프롬프트를 그대로 유지하고 영수증 지시를 싣지 않으며, 그
항목의 머지 자격은 현행 외부 전체 리뷰 경로로만 성립한다. 근거: 클릭 관측
head를 prior로 삼은 파생 `resolver-self:` 영수증은 이후 그 결과 head에서
authority가 발급될 때 enqueue-time `existing_current` 결속(`validApproval`은
`skipped`만 거부)에 걸려, 원 구현 승인을 보존하지 않은 exact-delta
self-review만으로 전체 구현 승인 행세를 할 수 있다 — §2의
`starting_approval` 필요성과 정면 충돌하므로 금지한다.

### attempt id 배선 — 프롬프트가 attempt 발급 전에 고정되는 문제

영수증의 `<attempt>`는 이번에 발급될 세션 attempt id다. 세 디스패치 경로:

1. `resolveConflict` → `relaunchFromAttempt`: `new_attempt_id`가
   `relaunchResolvedAttempt` 내부(현행 6208행)에서 발급되므로,
   `options.prompt`를 `string | ((new_attempt_id: string) => string)`
   팩토리로 확장하고 발급 직후 한 번 해석해 이후 소비점(현행
   6265·6430행)에는 문자열만 흐르게 한다.
2. `dispatchExternalConflict`의 relaunch 갈래(현행 5644행): 같은 팩토리.
3. `dispatchExternalConflict`의 프레시 갈래: `attempt_id`가 프롬프트 사용
   전에 이미 발급되므로(현행 5696행) `conflictPrompt`에 직접 전달.

`options.prompt`를 함수로 넘기는 호출자는 이 두 충돌 경로뿐이며, 다른
`relaunchFromAttempt` 호출자(resume·repair·disposition)는 문자열 그대로다.
`disposition_prompt`(현행 6265행)는 `options.disposition`일 때만 읽히므로
충돌 경로와 교차하지 않지만, 해석을 소비점보다 앞에 두어 함수가 저장되는
일이 없게 한다.

## 5. starting_approval durable 보존 (승인된 설계 선택)

§1 입력 3의 스냅샷 소실을 막기 위해, 디스패치한 드레인 호출이 resolution
결속 직후 진입 시 캡처한 스냅샷을 durable하게 영속화한다:

스냅샷은 캡처 순간의 authority id와 한 쌍으로만 의미가 있다. 캡처와 쓰기
사이, 쓰기와 사용 사이 어디서든 취소·재클릭으로 authority가 바뀔 수
있으므로(비동기 디스패치 경주), 캡처 시점에 authority id를 스냅샷과 함께
고정하고 이후 모든 단계가 그 쌍을 검증한다:

- **`merge-queue.js` 캡처**: 드레인 진입 시 `captureStartingApproval`
  결과를 캡처 순간의 `entry.authority.id`와 쌍으로 보관한다
  (`vouched.starting_approval` + 캡처 authority id). 이후 이 스냅샷을
  사용하는 모든 지점(영속화·ready 시점 로컬 사용)은 현재
  `entry.authority.id`가 캡처 id와 일치할 때만 쓰고, 불일치면 스냅샷을
  폐기해 null로 취급한다.
- **`queue-store.js`**: `ResolutionWait` 레코드에 선택 필드
  `approval: { authority_id: string, starting_approval: { actor: string,
  head_sha: string, raw: string } } | null`을 추가하고, 이를 쓰는 amend op
  `bindResolutionApproval(workspace, { bead_id, attempt_id, authority_id,
  starting_approval })`을 추가한다. op는 현재 resolution 레코드의
  `attempt_id` **그리고** 현재 `entry.authority?.id`가 인자의
  `authority_id`(캡처 시점 id)와 모두 정확히 일치할 때만 쓴다(이중 CAS) —
  attempt만 CAS하면 디스패치 중 authority 재발급 시 이전 스냅샷이 새
  authority 소유로 기록되는 경주가 남는다. 기존 영속 레코드와의 하위호환:
  `approval` 부재·malformed는 필드만 absent 취급하고 레코드 자체의
  유효성(`InvalidResolutionWait` 판정)은 바꾸지 않는다.
- **`merge-queue.js` 디스패치 드레인**: `action === 'conflict_resolution'`
  성공 분기에서 `ensureResolutionBound` 성공 직후, 캡처 쌍이 유효하면
  (스냅샷 non-null, 캡처 authority id == 현재 `entry.authority.id`)
  `bindResolutionApproval`을 호출한다. 캡처가 null이었으면(클릭 시점에
  유효 영수증이 없던 PR) 쓰지 않는다 — 그 항목은 현행대로 외부 리뷰로
  간다.
- **`merge-queue.js` 재진입 드레인**: `resolution.kind === 'ready'` 분기에서
  재캡처된 `vouched.starting_approval`이 null이고, resolution 레코드의
  `approval.authority_id`가 현재 `entry.authority.id`와 일치하면
  `vouched.starting_approval = approval.starting_approval`로 채운다.
  불일치(재클릭으로 새 authority)·부재는 현행 그대로 — 외부 리뷰 fallback.
  스냅샷은 항상 resolver 세션보다 앞서 캡처된 값이므로 증거 순서가
  깨지지 않는다. adoption 경로(`prepareResolution`의
  `restorableResolutionAttempt` → `bindResolution`)에서는 스냅샷을 새로
  만들지 않는다 — 디스패치 호출만이 쓴다.

이는 UI-vkk8 §4의 "caller-local" 선택을 좁게 개정하는 것이다: 당시 근거는
"재시작·후속 진입이 grant 시점 증거를 재구성할 수 없다"였고, 이 설계는
재구성이 아니라 캡처 시점 증거의 영속화이므로 그 근거와 충돌하지 않는다.
head-review.js는 여전히 caller가 준 스냅샷을 검증할 뿐 저장을 모른다.

## 6. 영수증 부재 처분 — 계약이 이미 답함

dotfiles 계약 187행대로 **외부 전체 리뷰 fallback을 유지**한다:
부재·malformed·attempt/prior 불일치 → 결속 없음 → observed head 전체 외부
리뷰. self-review보다 강한 게이트라 안전 손실이 없고, 세션 실수 하나가
PR을 영구 차단하지 않는다. `resolver_self_review_not_approved` 하드 fail은
결속 성립 후 영수증이 바뀐 race/rewrite 가드로 존치한다(결속 시점과 게이트
재대조 사이의 변조 방지). `head_drift_during_receipt` readback도 그대로다.

## 7. 테스트 범위

- `head-review`: `captureResolverBinding` 단위 — 일치 반환, 부재/`null`
  raw, malformed, attempt 불일치, prior 불일치, 대소문자 정규화.
- `queue-store`: `bindResolutionApproval` — attempt·authority 모두 일치 시
  기록, attempt 불일치 거부, authority 불일치 거부(디스패치 중 재발급
  경주), malformed `approval` 필드의 fail-quiet 하위호환(레코드 유효성
  유지).
- `merge-queue`: ready 시점 결속이 `ensureHeadReview`의
  `mutation_result_sha`로 전달되는 것; 영수증 부재 시 `null` 전달(현행
  외부 리뷰 경로 회귀 유지); `dispatchConflict` payload의
  `receipt_prior_sha`; 디스패치 직후 스냅샷 영속화; 캡처와 사용 사이
  authority가 바뀐 경우 로컬 스냅샷 폐기(ready 시점 사용 거부); 재진입
  드레인의 스냅샷 채택(authority 일치)과 거부(불일치·부재); yield 후
  재진입 end-to-end — 영수증이 쓰인 상태에서 무디스패치 approved;
  base_update가 끼어 `receipt_prior_sha ≠ 디스패치 시점 head`인 경우의
  결속 end-to-end(영수증 prior=authority requested로 approved).
- `scheduler`: `conflictPrompt`가 receipt_ctx로 정확한 영수증 문자열,
  `bd update`/readback 절차, 그리고 self-review 범위가 큐가 준 prior부터
  결과 head까지임을 포함하는 것; receipt_ctx 없는 큐 밖 디스패치의
  프롬프트에 영수증 지시가 전혀 없는 것(회귀); 프롬프트 팩토리가 새
  attempt id로 해석되는 것(두 relaunch 경로), 프레시 외부 경로의 직접
  전달.
- `pr-actions`: `receipt_prior_sha` 통과.
- 기존 resolver 갈래·ancestry carry·`resolver_self_review_not_approved`
  테스트는 무변경 통과해야 한다.

## 8. 비범위

- `head-review.js` 강제점 semantics 변경(helper 추가만 허용).
- dotfiles 계약 개정, workflow/review 스킬 문구 변경.
- UI 표시 변경 — Worker 보드가 resolver 결속 상태를 새로 소비하지 않는다.
- 큐 밖 충돌 해소 흐름의 구조 변경.
- `base_update` 경로의 스냅샷 처리 변경 — 세션 없이 in-loop로 끝나므로
  소실 문제가 없다.

## 구현 unit 후보

- binding:server/worker/head-review.js — `captureResolverBinding` helper와
  단위 테스트.
- store:server/worker/queue-store.js — `ResolutionWait.approval` 필드와
  `bindResolutionApproval` op.
- queue-wiring:server/worker/merge-queue.js — ready 시점 결속, 스냅샷
  영속화·채택, `receipt_prior_sha` payload.
- prompt:server/worker/scheduler.js — `conflictPrompt` receipt_ctx, 프롬프트
  팩토리, 세 디스패치 경로 배선.
- threading:server/worker/pr-actions.js — prior 통과.

(advisory — 실행 시 `unit_plan`이 별도로 기록되며, 기본은 한 패스다.)

## 참조

- Bead: UI-ww5s. 선행 설계 SoT:
  `docs/superpowers/specs/2026-08-19-impl-review-ancestry-verify-design.md` §2.
- 계약: dotfiles `docs/contracts/workflow.md` Worker manual merge
  continuation(185–187행), queue 내부 state 조항(193행).
- 착지 이력: UI-vzyh PR #170(ancestry 결속·resolver 강제점), UI-vkk8 §4
  (null 결속·caller-local 스냅샷의 당시 근거).
