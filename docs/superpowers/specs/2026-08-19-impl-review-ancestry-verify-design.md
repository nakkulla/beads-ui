---
scope:
  - server/workflow-enrich.js
  - server/worker/merge-gate.js
  - server/worker/merge-queue.js
  - server/worker/head-review.js
  - server/worker/pr-actions.js
  - server/worker/pr-poller.js
  - server/worker/scheduler.js
  - repo-ops/
  - app/views/worker/
  - AGENTS.md
---

# impl_review 신선도를 ancestry 결속으로 바꾸고 재리뷰 정지를 verify로 대체한다 (UI-vzyh)

- Bead: `UI-vzyh`
- Route: `spec_backed`
- 배경 사건: UI-c00b(PR #167)가 리뷰 사이클(외부 리뷰 → 지적 반영 →
  self 마감, `impl_review=self@4e991c58`) 완결 후 clean base-sync 머지 커밋
  하나로 tip이 움직이자 `review_receipt_stale`이 되어 "최종 변경 리뷰 필요"
  정지가 떴다. 병렬 레인에서는 형제 PR이 머지될 때마다 base 동기화가 생기므로
  이 정지가 반복되며, 사용자 판정은 "얻는 것 없이 흐름만 깬다"이다.

## 1. 문제

`impl_review` 영수증이 **정확한 head SHA**에 결속되어 있어, 코드 내용과 무관한
head 이동(base 동기화 머지, rebase 아닌 큐 `base_update`)마다 영수증이
stale이 되고 재리뷰가 요구된다. 현행 워크플로우에서 리뷰 마감 후 브랜치에
붙는 커밋은 base 동기화와 충돌 해소뿐이므로, SHA 결속이 잡아내는 "리뷰 안
받은 새 코드"는 실제로 발생하지 않는 케이스다. 반면 SHA 결속이 놓치는 진짜
위험(새 base 조합의 의미 충돌 — 타입 깨짐·테스트 실패)은 리뷰로도 잡기
어렵고 기계 검증이 잡는 영역이다.

## 2. 결정 — 판정 규칙

`impl_review` 신선도 판정을 다음 한 규칙으로 대체한다.

> **영수증 SHA가 현재 branch head와 같거나 head의 조상(ancestor)이면
> 유효하다.** (`git merge-base --is-ancestor <receipt-sha> <head>`)

- base 동기화 머지가 몇 번 끼어도 영수증 SHA는 조상이므로 무정지 통과.
  carry 재부착 절차 자체가 불필요해진다.
- **resolver 예외 — ancestry보다 우선한다.** 현재 head가 큐 authority의
  `resolver:<attempt>` mutation 산물이면, ancestry 성립 여부와 무관하게
  해소 세션의 exact-delta self-review가 merge 전 필수조건이다:
  `resolver:<attempt>`의 prior/result SHA 결속, `resolver-self:` 영수증
  기록·readback, `APPROVE` verdict(`head-review.js`의 기존
  `resolver_self_review_not_approved` 강제점 유지). 외부 리뷰어는
  디스패치하지 않는다. 충돌 해소 세션 프롬프트에 exact-delta self-review
  지시가 없으면 함께 추가한다.
- 영수증 SHA가 조상이 아니면(히스토리 재작성·브랜치 리셋 등 비정상)
  현행 fail-closed를 유지한다: manual continuation의 observed final head
  전체 외부 리뷰가 복구 경로다. 정상 흐름에서는 도달하지 않는다.
- **ancestry probe는 관측된 head 객체를 로컬에 확보한 뒤 판정한다.**
  poller가 관측하는 PR head SHA는 로컬 저장소에 없을 수 있으므로, 공유
  probe가 head를 exact fetch/증명하고 equality·ancestor·non-ancestor·
  fetch/git 오류를 구분해 반환한다. 오류는 **머지 게이트에서 fail-closed**
  (stale 취급, 진행 거부)이고, 표시 프로브(§4.1)에서만 기존 fail-quiet
  (undetermined=stale 아님)를 유지한다.
- head 이동을 이유로 한 **재리뷰 디스패치는 제거**한다. 리뷰는 공식 게이트
  1회(REVISE 시 반영 + self 마감 포함)로 끝난다.
- `spec_review` 신선도(스펙 문서 경로 프로브)는 변경하지 않는다.

최종 head의 실질 검증은 `[verify]`(§4)가 맡는다: 머지 자격은 exact merge
head에 결속된 verify green 영수증을 요구한다(계약의 기존 verify 판정 규칙
그대로, 이 저장소가 이제 선언할 뿐이다).

수용하는 잔여 리스크: 리뷰 마감 후 사용자가 의도적으로 새 코드를 push하면
tsc/test 통과만으로 머지된다. 현행 워크플로우에서 그런 push는 발생하지
않으며, 발생 시에도 본인 판단의 push다.

## 3. Cross-repo 단위 — dotfiles 계약 개정 (선행)

판정 의미의 canonical 소유자는 dotfiles `docs/contracts/workflow.{md,yaml}`다.
설계 승인 후 dotfiles rig에 quick_fix Bead를 만들고 이 Bead(UI-vzyh)에서
foreign `blocks` edge로 연결한다.

**닫힌 compact contract** — 실행 세션이 이 스펙 없이도 독립 수행 가능하도록
quick_fix Bead 설명에 다음을 고정한다:

- 대상 저장소: `~/Documents/GitHub/dotfiles` 경로의 checkout이 가리키는
  `origin` remote. base resolver: fetch한 `origin`의 default branch
  (`git remote show origin` HEAD).
- 소유 파일: `docs/contracts/workflow.md`(`## Worker manual merge
  continuation`, freshness 정의부), `docs/contracts/workflow.yaml`과 생성
  v2 projection(해당 의미가 인코딩된 경우), workflow·review 스킬 source의
  게이트 문구, 그리고 각 runtime manifest가 설치하는 runtime 사본.
- 개정 내용: "세 binding + vouched `base_update`/`resolver` 예외" 구조를
  §2 규칙(ancestry + resolver 필수 예외)으로 대체. `carry:` 영수증
  형식·절차 폐기. `resolver-self:` 형식·강제 절차는 §2대로 필수 유지.
  head 이동 재리뷰 디스패치 문구 제거, non-ancestor fail-closed만 잔존.
- 검증 bundle: 계약 문서·yaml의 소유 checker/테스트(존재 시), projection
  재생성 diff 확인, 스킬 문구와 계약 문구의 정합 대조.
- 적용 순서(각 단계 실패 시 그 단계에서 중단하고 UI-vzyh를
  `blocked_reason`으로 남긴 뒤 같은 단계부터 재개):
  1. 검증 bundle green
  2. base push + remote containment 확인
  3. runtime 사본 설치(runtime-home) 후 설치 결과 readback — dotfiles에
     `[deploy]` 선언이 있으면 그 terminal success로, 없으면 설치 파일
     내용 대조로 확인
  4. quick_fix Bead close + `bd show --json` readback
  5. UI-vzyh에서 foreign dependency readback — 이때부터 beads-ui 구현이
     `bd ready`가 된다.
- 이 개정은 모든 rig에 적용되는 전역 계약 변경이다. `[verify]` 미선언
  저장소는 ancestry 규칙만으로 판정하게 되며, verify 선언은 지금처럼
  저장소별 정책으로 남는다 — 의식적으로 수용한다.

## 4. beads-ui 구현

### 4.1 신선도 프로브 — `server/workflow-enrich.js`

`implFreshness`를 "tip이 영수증 SHA를 지나쳐 움직였는가"에서 ancestry 검사로
교체한다. 조상이면 fresh, 조상이 아니면 stale, git 오류·객체 부재는 기존
fail-quiet 규칙대로 undetermined(=stale 아님) 유지. 보드 카드 배지가 게이트
판정과 일치하게 된다.

### 4.2 머지 게이트 — `server/worker/merge-gate.js`, `pr-actions.js`, `pr-poller.js`, `head-review.js`, `merge-queue.js`

- 판정의 실소유자는 `merge-gate.js`의 `reviewReceiptState(issue, head_sha)`
  (exact-SHA 비교)이며 `pr-actions.js`와 `pr-poller.js:375`가 함께
  소비한다. 이 함수를 §2의 공유 ancestry probe 결과를 받는 형태로
  교체한다: equality·ancestor → current, non-ancestor → stale,
  fetch/git 오류 → 게이트 소비자는 fail-closed(stale 취급). probe는
  관측된 PR head 객체를 로컬에 exact fetch/증명한 뒤 판정한다.
- `review_receipt_stale` 거부는 non-ancestor(비정상 히스토리)에만 남고,
  현행 fail-closed 복구 경로(manual continuation → `ensureHeadReview`
  observed head 외부 리뷰)를 유지한다.
- 큐-owned `base_update`의 vouched carry 스탬프 절차를 제거한다.
  `resolver:<attempt>` mutation은 §2대로 merge 전 필수조건을 유지한다:
  `head-review.js:387-416`의 `resolver_self_review_not_approved` 강제점과
  prior/result SHA·readback 검사를 존치하고, `scheduler.js`의 충돌 해소
  프롬프트에 exact-delta self-review 지시를 추가한다.
- `[verify]` 선언에 따라 머지 자격이 exact head의 verify green 영수증을
  요구하는 것은 기존 판정 기계(`ensureVerify`/`verifyReceipt`) 그대로다.
  verify red는 기존 v2 사다리(`script_retry` → `auto_repair_session` →
  `user_triggered_session`)를 탄다.

### 4.3 UI — `app/views/worker/index.js`

배지는 게이트 reason을 소비하므로 큰 변경이 없다. "최종 변경 리뷰 필요"는
non-ancestor(비정상 히스토리) 케이스에만 남는다. 정지 배지의 툴팁 문구가
새 의미(히스토리 재작성 복구)를 설명하도록 조정한다.

### 4.4 verify 등록 — `repo-ops/`, `AGENTS.md`

- `repo-ops/script/verify` 신설: verify checkout에서 `npm ci` 후
  `npm run tsc && npm test`를 실행하고 exit code로 판정을 전달한다.
  (사용자 선택: tsc + test. lint/build는 Pre-Handoff에서 이미 강제되므로
  중복 제외.)
- `repo-ops/config.toml`에 선언 추가:

  ```toml
  [verify]
  script = "repo-ops/script/verify"
  timeout_ms = 600000
  ```

  "`[verify]`는 두지 않는다" 주석을 새 판정 서술로 교체한다.
- `AGENTS.md`의 머지 자격 서술("이 저장소는 `[verify]`를 선언하지 않는다",
  review 영수증의 head SHA 결속 문구)을 §2 규칙과 verify 선언에 맞게
  동기 수정한다.
- Worker는 config를 핀된 base SHA blob에서 읽으므로 **이 PR 자체는
  verify 대상이 아니다**(이전 base 정책 적용). 선언은 머지 후부터
  효력이 생긴다.

### 4.5 Delivery tail — 머지 후 수용 조건

이 PR의 완료 선언은 다음 post-merge 확인을 모두 통과해야 한다:

1. previous-base `repo-ops/config.toml`의 `[deploy]` identity 확인 후
   deploy operation terminal success — 실제 runtime이
   `.worktrees/.repo-ops-deploy`의 merged SHA에서 떠 있는지 프로세스
   경로·포트·HTTP 응답으로 검증(기존 Post-Merge Runtime Validation 계약
   그대로).
2. fetched merged base에서 `[verify]` 선언과 `repo-ops/script/verify`의
   executable(`100755`) identity를 해석·readback — 이후 PR부터 exact-head
   verify 게이트가 실제로 활성화되었음을 확인한다.

## 5. 테스트 범위

각 seam의 단위 테스트를 추가·개정한다. 기존 인접 테스트 파일 구조를 따른다.

- **프로브(§4.1)**: 영수증 SHA == head → fresh; 조상 → fresh(base 동기화
  머지 커밋 시나리오); 비조상 → stale; git 오류 → undetermined.
- **공유 ancestry probe·게이트(§4.2)**: `reviewReceiptState` 교체 후 —
  equality·ancestor → current; 비조상 → stale 거부 + 기존 외부 리뷰 복구
  경로; head 객체 로컬 부재 시 fetch 후 판정; fetch/git 오류 →
  게이트 fail-closed(표시 프로브만 fail-quiet); poller 소비 경로 회귀.
- **resolver 필수조건(§2)**: resolver mutation head는 `resolver-self:`
  APPROVE + readback 없이는 merge 거부(`resolver_self_review_not_approved`
  회귀); carry 스탬프 미기록; 해소 프롬프트의 exact-delta self-review 지시.
- **verify(§4.4)**: config 해석(`[verify]` 유효 선언); verify green 영수증
  요구·red의 사다리 진입은 기존 repo-operation 테스트 커버리지에 위임.
- Pre-Handoff 번들: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(번들 포함).

## 6. 비범위

- "자동복구 중" 배지가 completion phase 전체를 뒤집어쓰는 표시 버그
  (`prStatusBadge`) — 별도 quick_fix, UI-75xw 착지 후.
- UI-75xw의 fence 완화·레인 정합 — 독립 진행.
- `spec_review` 신선도 규칙 — 변경 없음.
- 다른 저장소의 `[verify]` 선언 — 저장소별 정책으로 각자 판단.

## 구현 unit 후보

- `contract:dotfiles/docs/contracts/workflow.md` — 계약 개정 + 스킬 runtime
  사본 정합 (foreign quick_fix Bead, 선행, §3 compact contract)
- `probe:server/worker/merge-gate.js` — 공유 ancestry probe(`reviewReceiptState`
  교체) + `workflow-enrich.js` 표시 프로브
- `gate:server/worker/pr-actions.js` — 거부 판정·carry 제거·resolver 필수
  존치 (head-review.js, merge-queue.js, pr-poller.js, scheduler.js 프롬프트)
- `verify:repo-ops/config.toml` — script 신설·선언·AGENTS.md 동기화·§4.5
  delivery tail
- `ui:app/views/worker/index.js` — 툴팁 문구
