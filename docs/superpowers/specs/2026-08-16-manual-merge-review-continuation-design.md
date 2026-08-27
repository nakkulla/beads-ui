# 수동 머지의 review·repair·merge 연속 실행 설계

> **부분 은퇴 (UI-d7fy, 2026-08-28).** 이 문서가 설계한 head-review 큐 계층은
> 제거됐다. `### 2. durable head review continuation`,
> `### 3. automatic implementation reviewer`,
> `### 4. bounded REVISE repair와 self-review`와 그에 딸린 `## UI projection`
> 및 `## Test scope` 항목은 실행되지 않으며, §5의 `head_review.receipt` 입력과
> §6의 reviewer/repair attempt 규칙도 함께 사라졌다. 머지 자격의 리뷰 판정은
> 머지 게이트의 `impl_review` ancestry 하나뿐이고, 영수증 부재·비조상은 게이트
> 보류로 남아 `[리뷰 후 머지]` 클릭이 유일한 출구다.
> `### 1. per-item merge authority`와 §5의 나머지 재-게이트 규칙은 그대로
> 유효하다. 제거 근거는
> `docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`
> 이다.

## 문서 상태

- owning Bead: `UI-58w8`
- route: `full_plan`
- workflow mode: `standard`
- 사용자 설계 승인: 2026-08-16
- 기준 브랜치/SHA: `main` / `a0a8310057a6abc4aae4648680759ca3270ece76`
- 발견 출처: `UI-wv97`, PR #142
- canonical contract owner: dotfiles `docs/contracts/workflow.{md,yaml}`

## 배경과 live incident

사용자가 PR 대기 행의 `[충돌 해소 후 머지]`를 눌렀지만 `UI-wv97`은 충돌 해소
세션이 끝난 뒤 다음 상태에 멈췄다.

| 항목 | 관측값 |
|---|---|
| resolver attempt | `UI-wv97-1786876163443-1`, `done` |
| old reviewed head | `4127536c7d2e70cb27f0469ba9f35bc3eabc2536` |
| resolved PR head | `12b188bca289024d4de503c904767b54c964d980` |
| PR gate | `MERGEABLE` / `CLEAN` / base 최신 |
| merge queue | position 1, `resolution.state=ready` |
| workflow gate | `review_receipt_stale` |
| global setting | `auto_merge=false` |

현재 구현에는 서로 독립적으로는 타당하지만 결합하면 진행 불가능한 두 규칙이 있다.

1. 모든 merge는 현재 PR head에 결속된 `impl_review` receipt가 있어야 한다.
2. conflict resolver와 base update는 새 head를 만든다.

resolver는 충돌을 해소하고 검증한 뒤 branch를 push하지만 implementation reviewer를
dispatch하거나 receipt를 갱신하지 않는다. 따라서 실제 head 변경이 있으면 full re-gate가
항상 `review_receipt_stale`에서 멈춘다. 또한 `merge-queue.js`는
`resolution.state=ready`에서 global `auto_merge !== true`이면 driver를 pause한다. 수동
`[머지]` 클릭이 이미 존재해도 이 global 토글을 per-item continuation authority보다
우선한다.

dotfiles의 현재 workflow 계약도 첫 review 이후 automatic external follow-up dispatch를
금지한다. 따라서 beads-ui consumer만 우회 수정할 수 없다. manual merge continuation이라는
좁은 예외와 reviewer·repair 안전 경계를 canonical contract에 먼저 정의해야 한다.

## 사용자 결과

1. global `auto_merge=false`여도 사용자가 개별 `[머지]`를 누른 항목은 충돌 해소,
   queue-owned head 변경 검증, implementation review, 필요한 1회 repair, fresh re-gate,
   merge와 cleanup까지 계속 진행한다.
2. global `auto_merge`는 eligible PR의 자동 편입 여부만 결정한다. 이미 사용자가 승인한
   개별 항목의 continuation을 중단하지 않는다.
3. conflict resolution, base update 또는 bounded repair가 head를 바꾸면 selected
   implementation reviewer가 자동으로 최신 최종 PR diff를 검토한다.
4. `APPROVE`이면 current-head receipt를 기록하고 자동 merge한다.
5. `REVISE`이면 findings를 한 번 자동 수정하고 controller-owned exact-delta self-review가
   통과한 경우에만 merge한다.
6. unresolved blocking finding, dispatch 실패, head drift, receipt write/readback 실패,
   반복 failure는 merge하지 않고 durable하게 사람에게 돌려준다.
7. `[취소]`는 해당 개별 authority를 폐기하며 늦게 끝난 resolver/reviewer/repair가 merge를
   재개하지 못하게 한다.

## 목표

1. manual merge click을 durable per-item authority로 모델링한다.
2. manual authority와 automatic enrollment authority를 구분한다.
3. queue-owned head mutation 이후 head-bound review continuation을 restart-safe하게 실행한다.
4. 기존 reviewer selection과 `impl_review` receipt 형식을 재사용한다.
5. `REVISE`에 exactly one bounded repair-controller round를 제공한다.
6. 최종 merge는 항상 authoritative PR observation, current review receipt, optional verify
   receipt와 pinned head를 다시 확인한다.
7. 현재 `UI-ffeu`와 `UI-wv97` residue를 현행 안전 절차로 먼저 마감한 뒤 최신 main에서
   영구 수정을 구현한다.

## 비목표

- review를 생략하거나 stale receipt를 current로 간주하는 compatibility path
- resolver 또는 writer의 단순 self-report를 review 증거로 채택
- blocking finding이 남은 상태에서 receipt를 forge하거나 merge 강행
- unlimited review/repair loop
- global `auto_merge`를 개별 사용자 click의 대체 권한으로 확대
- GitHub review decision이나 CI checks를 workflow receipt로 재도입
- `[verify]`가 없는 저장소에서 legacy verify 실행
- parallel merge 또는 queue 순서 재배열
- external head mutation을 queue-owned mutation으로 추측
- 기존 provenance 없는 queue entry를 manual authority로 자동 migration

## canonical 소유권과 영향 표면

### dotfiles canonical owner

다음 의미는 dotfiles `docs/contracts/workflow.md`와 machine-readable
`docs/contracts/workflow.yaml`이 소유한다.

- manual merge action은 한 queue item의 full continuation authority다.
- automatic enrollment toggle은 새 항목 편입만 소유한다.
- queue-owned head mutation은 current implementation review를 자동 재취득한다.
- automatic reviewer는 선택된 reviewer를 exactly once dispatch한다.
- `REVISE` 후 automatic external second reviewer는 없으며, exactly one repair-controller가
  findings를 적용하고 controller-owned exact-delta self-review를 수행한다.
- manual continuation은 `skipped@<head>`를 review evidence로 인정하지 않으며, automatic
  reviewer selection의 `self`와 `skip`도 사람 개입이 필요한 terminal failure다.
- final merge gate는 bare `impl_review` 문자열이 아니라 같은 authority/head의 durable review
  journal에 결속된 exact receipt를 요구한다.
- current receipt가 없거나 어떤 증거도 불확실하면 merge는 fail closed한다.

기존 metadata keys `impl_review_model`, `impl_review_effort`, `impl_review`,
`exec_receipt`를 재사용한다. 새 workflow metadata key를 추가하지 않는다. harness의 reviewer
우선순위와 model/effort table도 유지한다.

semantic contract와 함께 다음 active instruction source를 같은 dotfiles change에서 갱신한다.

- `src/shared/skills/workflow/SKILL.md`: 기존 "automatic second reviewer 없음"을 유지하되,
  manual merge continuation의 selected reviewer exactly-once dispatch와 bounded
  repair-controller 예외를 가리킨다.
- `src/shared/skills/beads/bd-usage/references/bd-usage.md`: 기존 "automatic external follow-up
  dispatch 금지"에 manual merge continuation의 좁은 canonical 예외를 추가한다.
- `src/shared/skills/review/review/SKILL.md`: target drift 뒤 automatic external re-dispatch 금지
  규칙에 manual authority/head lineage별 exactly-once reviewer 예외, `self`/`skip` invalid
  selection, receipt notes/readback을 추가한다. ordinary formal gate의 single-pass cap은 바꾸지
  않는다.
- renderer가 만드는 Codex/Claude runtime copies와 contract checker output: source와 동일 의미인지
  생성·diff 검증한다.

`docs/contracts/harness.yaml`의 reviewer table은 의미 변경 없이 read-only owner로 사용한다.
consumer가 reviewer alias나 effort를 별도로 복제하지 않는다.

### beads-ui active consumers

- `server/worker/queue-store.js`: per-item authority와 review continuation journal
- `server/worker/merge-queue.js`: continuation state machine과 final re-gate
- `server/worker/scheduler.js`: conflict/base/repair session lifecycle와 attempt adoption
- `server/worker/pr-actions.js`: authoritative probe, update, pinned-head merge, cleanup
- `server/worker/merge-gate.js`: current-head receipt 판정; 의미 변경 없음
- `server/worker/attach.js`: Beads metadata writer/readback와 reviewer/repair adapter wiring
- `server/ws/worker-handlers.js`: manual enqueue/cancel mutation의 authority identity 연결
- `app/views/worker/index.js`: review/repair progress와 terminal failure projection

frontend source 변경은 `app/main.bundle.js`와 `app/main.bundle.js.map`에 함께 반영한다.

## 선택한 설계

### 1. per-item merge authority

`merge_queue` entry에 다음 operational journal을 추가한다. 이름은 workflow metadata가
아니며 queue schema v2 안의 server-owned state다.

```text
authority: null | {
  id: string,
  source: 'manual' | 'automatic',
  granted_at: number,
  requested_head_sha: string,
  target_base: string
}
```

manual `[머지]` mutation은 authoritative PR head와 target base를 읽은 뒤 새 `authority.id`를
한 queue persist에 기록한다. 같은 nonterminal current authority에 대한 duplicate click만 새 id나
budget을 만들지 않는다. PR head나 base를 읽을 수 없으면 queue effect도 만들지 않는다.

automatic enroller가 넣은 entry는 `source=automatic`이다. global `auto_merge` OFF는 automatic
entry의 기존 pause/clear 정책을 적용하지만 manual entry의 continuation에는 영향을 주지 않는다.
사용자가 global toggle을 언제 껐는지로 provenance를 추측하지 않는다.

`[취소]`는 queue entry와 authority를 같은 mutation에서 폐기한다. running reviewer/repair에는
stop을 요청하지만 stop 성공을 merge 안전성으로 사용하지 않는다. 모든 늦은 result는
`authority.id` CAS가 실패해 no-op이어야 한다.

`failed` authority에 대한 재클릭은 retry가 아니다. old authority/head review를 terminal attempt
lineage에 그대로 봉인한 뒤, 새 observed head/base와 새 manual `authority.id`로 current slot을
원자 교체한다. cancel 뒤 re-enqueue도 항상 새 authority다. 따라서 각 authority의
`repair_rounds`는 재설정되지 않으며, old review/repair result는 새 id에 결코 채택되지 않는다.

legacy entry에 `authority`가 없으면 자동 merge하지 않는다. current `UI-wv97`처럼 배포 전에
생긴 entry는 현행 controller가 별도로 마감한다. 새 runtime에서는 사용자가 다시 클릭해 explicit
manual authority를 만들 수 있다.

### 2. durable head review continuation

> **은퇴 (UI-d7fy).** 이 절은 실행되지 않는다 — 근거는
> `docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`
> 이다.

queue entry에 authority와 분리된 review journal을 둔다.

```text
head_review: null | {
  authority_id: string,
  head_sha: string,
  state: 'pending' | 'reviewing' | 'revising' | 'approved' | 'failed',
  reviewer: string,
  effort: string,
  review_attempt_id: string | null,
  findings_digest: string | null,
  repair_attempt_id: string | null,
  repair_rounds: 0 | 1,
  approval_source: null | 'existing_current' | 'external_review' | 'bounded_repair',
  receipt: string | null,
  failure_reason: string | null,
  updated_at: number
}
```

queue-owned head mutation은 다음 세 종류로 제한한다.

- conflict resolver가 base를 branch에 merge하고 push
- Worker의 approved base update가 branch head를 변경
- 이 journal의 bounded repair-controller가 findings를 수정하고 push

manual enqueue 시 이미 current인 ordinary workflow `impl_review`는 actor가 `skipped`가 아니고
Beads exact readback이 일치할 때만 `approval_source=existing_current`인 `approved` journal에
결속할 수 있다. bare metadata receipt만으로 journal을 생략하지 않는다. queue-owned head
mutation 뒤에는 이 shortcut을 허용하지 않고, authoritative PR observation으로 remote head를
다시 읽어 exact authority/head의 `pending` journal을 만든다. 이후 독립적으로 나타난 receipt도
recorded review/repair attempt와 맞지 않으면 채택하지 않는다.

외부 actor가 head를 변경하면 queue-owned identity를 증명할 수 없으므로 `failed`로 정지하고
재클릭을 요구한다. queue-owned mutation도 expected ancestor, target base, remote containment를
증명하지 못하면 외부 변경과 같이 다룬다.

### 3. automatic implementation reviewer

> **은퇴 (UI-d7fy).** 이 절은 실행되지 않는다 — 근거는
> `docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`
> 이다.

reviewer selection은 current user override가 없는 background continuation이므로 다음 순서다.

1. Bead `impl_review_model` / `impl_review_effort`
2. harness implementation gate default `codex` / `xhigh`

`impl_review_model=self|skip`, unknown model, unsupported effort, transport unavailable은 fallback하지
않고 사람 개입이 필요한 `failed`로 정지한다. `self`는 bounded repair의 recorded controller
self-review 결과에서만 approval source가 될 수 있고 reviewer 선택값으로는 사용할 수 없다.

review adapter는 writable implementation runner와 분리된 read-only attempt를 dispatch한다.
packet은 다음 exact identity를 포함한다.

- workspace와 Bead id
- target base와 observed base SHA
- authority id와 exact current head SHA
- approved spec path와 reachable spec SHA
- latest target-base 기준 최종 PR diff
- prior implementation receipt와 queue-owned head mutation lineage
- prohibited bypass와 required structured verdict

review result는 `APPROVE` 또는 `REVISE`와 structured findings만 허용한다. malformed result,
attempt failure, timeout 또는 missing result는 success가 아니다. result 수신 후 Worker는 PR head,
authority id, attempt id를 다시 비교한다.

`APPROVE`이면 controller adapter가 `impl_review=<reviewer>@<head_sha>`를 Beads에 쓰고
`bd show --json` equivalent readback으로 exact value를 확인한다. write/readback 전후 head가
바뀌면 receipt를 사용하지 않고 정지한다. 승인 후 journal은 같은 review attempt에 결속된
`approval_source=external_review`, exact `receipt`, `state=approved`를 한 persist로 기록하고 fresh
full re-gate를 실행한다.

### 4. bounded REVISE repair와 self-review

> **은퇴 (UI-d7fy).** 이 절은 실행되지 않는다 — 근거는
> `docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`
> 이다.

`REVISE`이면 findings 전체와 canonical digest를 journal에 기록하고 `repair_rounds=1`,
`state=revising`으로 prerecord한 뒤 한 writable repair-controller를 dispatch한다. prerecord가
실패하면 writer를 시작하지 않는다.

repair packet은 reviewed head, approved spec, structured findings, queue-owned mutation lineage,
owned worktree, required repository validation을 포함한다. repair-controller는 다음 순서만 수행한다.

1. exact reviewed head와 clean owned worktree 확인
2. findings를 한 batch로 수정
3. repository-required validation 실행
4. full diff/status 검토
5. commit과 normal push
6. exact repair delta controller self-review
7. `exec_receipt=delegated:<model>@<new-head>`와 `impl_review=self@<new-head>` 기록 제안

Worker가 remote head containment, old-head ancestry, receipt write/readback과 self-review 결과를
독립적으로 확인한 뒤에만 같은 repair attempt에 결속된 `approval_source=bounded_repair`, exact
`receipt`, `state=approved`로 전환한다. repair session의 단순 완료나 자연어 "통과" 보고는
증거가 아니다.

repair failure, head 무변화, unresolved blocking finding, 같은 fingerprint의 무진전 반복,
receipt mismatch 또는 budget 소진은 `failed`다. automatic second external reviewer나 second
repair round를 만들지 않는다.

### 5. final re-gate와 merge

`approved` item은 resolver 시작 전 observation을 재사용하지 않는다. 다음을 모두 다시 읽는다.

- current PR/base/head identity
- mergeability와 current base containment
- current `impl_review` receipt와 같은 authority/head/attempt에 결속된 `head_review.receipt`
- `[verify]` 선언이 있을 때만 latest required verify receipt
- queue authority와 cancel generation

모든 gate가 current면 pinned-head squash merge를 실행하고 기존 cleanup/deploy cursor로 이어간다.
head가 다시 queue-owned 방식으로 바뀌면 새 head review journal을 시작한다. 외부 drift면 정지한다.
`skipped@<head>` 또는 journal 없이 independently written `self@<head>`는 current SHA가 맞아도 이
manual continuation gate를 통과하지 못한다.

manual authority는 global `auto_merge=false`여도 이 단계까지 유효하다. automatic authority는
global toggle 정책을 따른다. merge API 직전 authority가 취소됐거나 head가 바뀌면 effect를
실행하지 않는다.

### 6. restart와 concurrency

- review/repair dispatch 전에 journal과 attempt identity를 한 persist에 prerecord한다.
- restart는 exact active attempt를 채택하며 같은 authority/head에 duplicate attempt를 만들지
  않는다.
- duplicate terminal event는 state/attempt/head CAS로 no-op이다.
- reviewer와 repair가 동시에 writable owner가 되지 않는다. reviewer는 read-only이고 repair는
  해당 worktree의 유일한 writer다.
- 다른 queue item의 merge와 겹치면 기존 repo/merge serial fence를 유지한다.
- cancel, dequeue 또는 terminal merge 뒤 journal late result는 항상 no-op이다.
- 같은 failure가 진전 없이 두 번 관측되면 retry가 아니라 root-cause reassessment 상태로
  terminalize한다.

## UI projection

기존 `충돌 해소 완료 · 재검증 대기`만으로는 실제 실행 여부를 구분할 수 없으므로 optional
`head_review` projection을 다음처럼 표시한다.

- `pending`: `implementation review 대기`
- `reviewing`: `implementation review 중`
- `revising`: `review 수정 중 · 1회`
- `approved`: 별도 badge 없이 current merge gate 표시
- `failed`: `review 자동 진행 실패: <sanitized reason>`

`세션` usage는 running 여부가 아니라 attempt usage라는 기존 의미를 유지한다. live badge는 실제
attempt가 running/paused일 때만 activity style을 사용한다. global auto-merge OFF는 manual item에
정지 badge를 추가하지 않는다.

## 현재 residue와 실행 순서

`UI-58w8`은 다음 세 prerequisite를 `blocks` dependency로 소유한다.

- `UI-ffeu`: current readback은 `closed`; stale cleanup residue가 다시 나타나지 않는지 Done 상태를
  재확인한다.
- `UI-wv97`: `resolved`, PR #142. current head review, pinned-head merge, cleanup/deploy 뒤 `closed`
  readback이 dependency 해제 조건이다.
- `dotfiles-vzlm`: 이 spec의 dotfiles canonical owner unit. pinned `main`에서 contract/source/checker를
  변경하고 remote-contained merge와 previous-base `[deploy]` terminal success, installed
  Codex/Claude `workflow`·`review` skill exact readback 뒤에만 `closed`한다.

영구 수정은 다음 순서로 수행한다.

1. `UI-ffeu`: 이미 `closed`인 readback과 current deployed descendant coverage를 재확인하며,
   terminal row에 cleanup retry를 다시 실행하지 않는다.
2. `UI-wv97`: current head `12b188bca289024d4de503c904767b54c964d980`을 별도 reviewer가
   검토한다. APPROVE receipt, pinned-head PR #142 merge, cleanup/deploy와 shared runtime을
   확인한다.
3. `dotfiles-vzlm`을 수정·검증·머지하고, previous-base deploy와 installed runtime readback까지
   완료한다.
4. latest beads-ui main에서 durable authority/review pipeline을 구현한다.
5. implementation review, PR merge, shared deploy와 queue/runtime readback을 완료한다.

현재 residue 마감은 영구 기능의 acceptance를 위조하지 않는다. 영구 기능은 focused state-machine
tests와 실제 deployed runtime의 schema/readback으로 별도 증명한다.

formal spec-review receipt를 쓰는 동일한 Beads mutation에서 `worker-ineligible`을 추가하고 두 값을
`bd show --json`으로 함께 확인한다. `UI-wv97`과 `dotfiles-vzlm`이 위 terminal evidence로 closed된
뒤, beads-ui implementation dispatch 직전에 같은 label을 제거하고 readback한다. 이 label은 남은
direct deploy/install residue를 Worker가 PR-only work로 오인하지 못하게 하는 실행 fence다.

## Test scope

### RED→GREEN seam 1 — authority

- `auto_merge=false`에서 manual enqueue는 `source=manual` authority를 기록한다.
- automatic enroller는 `source=automatic`을 기록한다.
- toggle OFF는 manual item을 pause/clear하지 않는다.
- cancel은 authority와 pending continuation을 원자적으로 폐기한다.
- failed authority 재클릭과 cancel 뒤 re-enqueue는 새 authority id를 만들고 old attempt late result를
  CAS no-op으로 만든다.
- legacy authority-less entry는 자동 continuation하지 않는다.

### RED→GREEN seam 2 — reviewer continuation

- resolver가 새 head를 push하면 stale receipt를 관측하고 reviewer를 exactly once dispatch한다.
- base update가 head를 바꾼 경우도 같은 path를 사용한다.
- `APPROVE` receipt write/readback 후 `auto_merge=false`에서도 merge가 exactly once 실행된다.
- stale reviewer result, malformed verdict, unavailable selected transport, receipt mismatch는 merge를
  실행하지 않는다.
- automatic reviewer selection의 `self`/`skip`, `skipped@<current-head>`, journal과 무관한
  `self@<current-head>`는 merge를 실행하지 않는다.
- restart와 duplicate terminal event가 reviewer를 중복 dispatch하지 않는다.

### RED→GREEN seam 3 — bounded repair

- `REVISE` findings를 durable 기록하고 repair-controller를 exactly once dispatch한다.
- repair와 self-review가 current new head receipt를 만들면 fresh re-gate 후 merge한다.
- second REVISE/failure/no-progress/head 무변화는 needs-human failure로 끝난다.
- repair budget은 같은 authority에서 reset되지 않으며, failed 재클릭/cancel 후 re-enqueue의 새
  authority가 old repair 결과를 채택하지 않는다.
- external head drift는 queue-owned repair로 채택되지 않는다.

### RED→GREEN seam 4 — end-to-end and UI

- manual click → conflict resolver → reviewer APPROVE → merge → cleanup saga
- manual click → base update → reviewer APPROVE → merge
- manual click → resolver → reviewer REVISE → repair/self-review → merge
- cancel/restart/head drift/failure paths에서 duplicate session/merge 없음
- optional journal field 부재의 legacy projection은 fail-quiet
- 실제 running 상태와 ready/pending badge 구분
- frontend source 변경 후 bundle/map deterministic rebuild

### Verification bundle

- focused queue-store, merge-queue, scheduler, pr-actions, merge-gate, ws, Worker UI tests
- end-to-end Worker flow tests
- dotfiles contract checker와 generated projection 정합성 검증
- dotfiles `scripts/render.py` 결과와 workflow/review/bd-usage source/runtime instruction copy의 exact
  의미 정합성 검증
- dotfiles pinned merge의 previous-base deploy terminal success와 installed Codex/Claude
  workflow/review skill exact readback
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`와 generated byte/readback
- `git diff --check`
- shared deploy exact SHA, process path, port, `/`와 `/healthz` HTTP readback

## 완료 경계

완료는 다음 증거를 모두 요구한다.

1. current `UI-ffeu`와 `UI-wv97`가 `pr_wait`/`cleanup_failed` 없이 Done이다.
2. PR #142가 reviewed current head로 merge되고 shared deploy가 그 merge SHA를 포함한다.
3. `dotfiles-vzlm` canonical contract와 active/generated copies가 검증·remote-contained이고,
   previous-base deploy와 installed runtime readback 뒤 closed다.
4. beads-ui의 manual authority, reviewer, repair, cancel/restart state machine RED seams가 통과한다.
5. final implementation review가 integrated head에 결속된다.
6. beads-ui PR이 pinned-head로 merge되고 shared deploy operation이 terminal success다.
7. deployed Worker가 global `auto_merge=false`와 manual continuation을 별개로 읽는다.
8. Bead/phase children, worktree/branch, completion report와 runtime residue sweep가 canonical close
   순서로 끝난다.
9. `UI-58w8` dependency readback에서 `UI-ffeu`, `UI-wv97`, `dotfiles-vzlm`가 모두 closed이고,
   implementation dispatch 전에 `worker-ineligible` 제거 readback이 남는다.
