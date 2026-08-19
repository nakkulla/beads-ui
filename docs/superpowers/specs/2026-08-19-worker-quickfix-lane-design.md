---
scope:
  - server/worker/admission.js
  - server/worker/scheduler.js
  - server/worker/quickfix-landing.js
  - server/worker/merge-gate.js
  - server/workflow-enrich.js
  - app/views/worker/
---

# Worker quick_fix 실행 레인 설계 (UI-7tme)

- 작성일: 2026-08-19
- 상태: 초안 (spec gate 대기)
- Bead: `UI-7tme`
- route: `spec_backed`
- 관련: `docs/superpowers/specs/2026-08-10-quickfix-route-display-design.md`
  (현행 3중 배제의 원설계), dotfiles `docs/contracts/workflow.{md,yaml}`
  (계약 표면 소유)

## 1. 문제와 관측

`route=quick_fix` Bead는 Board에 표시되지만 Worker에 넣을 수 없다. 배제는 세
겹으로 의도적으로 설치되어 있다:

- `server/worker/admission.js:56` — `ADMISSIBLE_ROUTES = ['spec_backed',
  'full_plan']`이라 `invalid_route`로 거부.
- `app/views/worker/index.js:2510`, `app/views/worker/lanes.js:995` — 후보
  카드 `eligible = !is_quick_fix && has_spec && !spec.conflict`, 드래그·"대기로
  ↴" 비활성("quick_fix · 워커 비대상").
- `server/worker/merge-gate.js:106` — `reviewReceiptState()`가 quick_fix를
  `'current'`로 즉시 통과 처리(검사할 영수증이 없으므로).

이 배제의 근거는 dotfiles workflow 계약이다: quick_fix는 PR·머지 테일 없이
`claim → verify → base push → deploy_evidence → completion_report → close`로
직접 `closed`가 되고(`workflow.yaml lifecycle.transitions.quick_fix`), 리뷰
영수증 요구가 없으며, execution.md가 "bare base push는 push한 세션이 배포
증거까지 소유하고, **unreviewed ref push에 자동 배포를 넓히지 말라**"고
명시한다. 즉 "리뷰 없는 직접 push를 무인 자동화에 넣지 않는다"는 계약 결정이
Worker 배제의 원인이다.

한편 cross-repo 처분 경로는 대상 rig에 self-sufficient description을 가진
quick_fix Bead를 정기적으로 만들고 있고(예: UI-7s3e의 `dotfiles-g7wz`), 이런
Bead는 사람이 세션을 열어 처리하는 수밖에 없다. 작은 닫힌 작업일수록 무인
실행의 이득이 큰데 정확히 그 라우트만 Worker 밖에 있다.

## 2. 목표와 불변식

- **reviewed lane으로 금지 해소**: 계약의 금지는 "unreviewed push에 자동 배포
  확대 금지"다. Worker가 dispatch한 quick_fix 실행에 한해 push 전
  implementation review 1회를 계약으로 요구하면, push는 reviewed가 되어 금지와
  충돌 없이 배포 관측을 Worker로 수렴할 수 있다. 이것이 이 설계의 축이다.
- **대화형 quick_fix 불변**: 사용자가 세션에서 직접 수행하는 quick_fix는 현행
  그대로다(무리뷰, 세션이 배포 증거까지 소유, 직접 `closed`). 이 설계는
  Worker-dispatched 실행에만 새 의무를 붙인다.
- **pr_wait 미진입**: quick_fix attempt의 파이프라인은 대기 → 실행 중 →
  완료다. PR 관측·머지 게이트·머지 드라이버(`pr-poller`/`merge-queue`/
  `auto-merge`)는 전혀 관여하지 않는다.
- **신규 durable 키 0**: 리뷰 영수증은 기존 `impl_review`, 실행 영수증은 기존
  `exec_receipt`, landing head는 `impl_review`의 40hex를 재사용한다. 신규
  metadata 키·라벨을 만들지 않는다.
- **계약 소유권**: worker-dispatched quick_fix 레인의 canonical 문구는 dotfiles
  `docs/contracts/workflow.{md,yaml}`과 workflow skill references가 소유한다.
  beads-ui는 소비자다. dotfiles 변경은 대상 rig의 quick_fix Bead + foreign
  `blocks` 의존으로 분리한다(§9).
- **fail-closed 게이트**: landing은 유효한 `<reviewer>@<40hex>` `impl_review`
  없이는 진행하지 않는다. `skipped@`, malformed, base 미포함 SHA는 전부
  terminal failure다.

## 3. 계약 확장 (dotfiles 소유, canonical 문구는 §9 unit이 반영)

worker-dispatched quick_fix 레인을 다음과 같이 정의한다:

- **lifecycle 변형**: `in_progress → resolved → closed`. `resolved`는 "base
  push containment + push head에 결속된 유효 `impl_review` + completion report"
  상태이며 `pr_url` 없음이 허용된다. `closed`는 Worker의 배포 확인 후다.
  세션 단독 quick_fix의 기존 `in_progress → closed` 직행은 그대로 남는다.
- **게이트**: 세션 내 implementation gate 1회 필수. 리뷰어 선택은 기존 formal
  gate selector(현재 사용자 부재 → Bead metadata → workspace kv → harness
  default) 그대로다. 무인 실행이므로 `skip` 선택은 무효이고 `skipped@` 영수증은
  landing에서 fail-closed다. push 이후 head가 바뀌면(§6 race) 기존 follow-up
  규칙대로 controller exact-delta self-review로 영수증을 새 SHA로 갱신한다.
- **소유 이관**: worker-dispatched 실행에서 배포 실행·증거·close·잔여물 정리는
  Worker가 소유한다. execution.md의 "bare base push는 세션이 배포 증거까지
  소유" 문구는 "Worker가 추적하지 않는 bare push"로 한정한다.
- **worktree**: 세션은 `resolved`에서 멈추므로 spec_backed PR delivery와
  동일하게 worktree/브랜치를 보존하고, 정리는 Worker close 후 cleanup이 맡는다
  (현행 quick_fix tail의 "세션이 잔여물 0으로 종료"는 세션 단독 실행에만 남는다).

## 4. admission 확장 (`server/worker/admission.js`)

`ADMISSIBLE_ROUTES`에 `quick_fix`를 추가하고 라우트 분기를 넣는다:

| 검사 | spec_backed / full_plan | quick_fix |
| --- | --- | --- |
| `worker-ineligible` 라벨 | 거부 (현행) | 거부 (동일) |
| `gh` 사용 가능 | 거부 (현행) | 동일 유지 — 분기 최소화, 운영 전제 점검 |
| `spec_id_conflict` / spec 존재 | 거부 (현행) | **검사 안 함** (spec 없음) |
| `spec_review` 영수증 + freshness | 거부/stale (현행) | **검사 안 함** |
| description | — | **비어 있으면 거부** (`missing_description`) |

- 계약이 quick_fix Bead에 요구하는 self-sufficient description(범위·검증
  번들·delivery tail·SoT 포인터)이 admission의 유일한 실질 입력이다. 내용
  검증은 하지 않고 비어 있지 않음만 본다 — 내용의 질은 dispatch된 세션의
  workflow 스킬이 판단한다.
- freshness probe는 앵커(spec)가 없으므로 quick_fix에 존재하지 않는다. stale
  payload도 생성하지 않는다.
- 신규 거부 사유는 `missing_description` 하나다. 기존 사유 enum 소비처
  (프런트 배지, 테스트)에 추가한다.

## 5. dispatch와 세션 레인 (`server/worker/scheduler.js`)

- dispatch 경로는 공용이다: `resolveForDispatch`의 orchestration 3키
  (`orchestration_model/effort/speed`) → runner 파생 → 세션 spawn. 세션 내
  selector(`impl_runtime`/`impl_speed`/`impl_dispatch` 등)도 라우트 무관하게
  기존 정확도로 동작한다. **변경 없음.**
- dispatch 프롬프트에 quick_fix 전용 블록을 추가한다: worker-dispatched
  quick_fix 레인(§3)을 지시 — 구현 → impl gate(영수증을 push head에 결속,
  skip 금지) → base push + containment 확인 → completion report → `resolved`
  기록 후 종료. 배포·close·정리는 Worker 소유이므로 수행하지 말 것. 계약
  문구를 복제하지 않고 dotfiles 계약 §를 가리킨다.
- serial lane 의미는 변경 없다: quick_fix attempt도 lane 배정 가능하고, lane
  해제는 기존 `LANE_RELEASING_STATUSES`(`done`/`stopped`/`discarded`) 그대로
  landing 종결 시점이다.

## 6. landing settlement (Worker 소유, 신규 `server/worker/quickfix-landing.js`)

세션 종료 관측 후 스케줄러 settlement가 라우트 분기한다. `pr_url` 기반 pr_wait
이동 대신 quick_fix는 landing으로 간다:

1. **readback**: `bd show --json`으로 `status=resolved`,
   `impl_review=<reviewer>@<40hex>` 파싱. `skipped@`·malformed·부재는 terminal
   failure(`invalid_impl_review`). 세션이 `closed`까지 직접 간 경우(계약 위반
   또는 레거시 세션)는 있는 그대로 관측하고 landing을 건너뛴 뒤
   `done`으로만 이동한다 — Worker는 증거를 위조하지도, 이미 닫힌 Bead를 다시
   열지도 않는다.
2. **containment**: fetch 후 `git merge-base --is-ancestor <impl_review 40hex>
   <fetched base>`로 push containment을 검증한다. 미포함은 terminal failure
   (`push_not_contained`).
3. **배포**: 기존 `repoOperations.ensureDeploy`를 target=`<impl_review 40hex>`
   로 호출한다. coordinator의 lock 프로토콜·monotonicity(`superseded` 포함)·
   `descendant_success_covers_ancestor_rows`·restart adoption이 그대로
   적용되고, 실패는 기존 v2 사다리
   `script_retry → auto_repair_session → user_triggered_session`으로 수렴한다.
4. **close + cleanup**: 배포 terminal success 후 `closeBead`(`closed` readback)
   → owned worktree 제거·로컬 브랜치 삭제. base 직접 push라 remote 브랜치는
   존재하지 않는다(정리 대상 아님). 이후 `moveToDone`.

- **정리 cursor 정합**: 기존 cursor
  `base_containment → repo_operations → child_sweep → branch_cleanup →
  parent_close`를 재사용하되 quick_fix는 child_sweep가 공집합이고
  base_containment의 입력이 merged SHA가 아니라 `impl_review` head다. 실패
  기록·`[정리]` 재개·restart reconciliation은 기존 체계 그대로다.
- **base race**: 같은 repo의 sequential merge driver와 세션 push가 경쟁할 수
  있다. 신규 직렬화는 도입하지 않는다 — 세션 push 안전 계약(fetch-pin-verify,
  regular push, drift 1회 재수렴)과 배포 monotonicity가 순서를 흡수하고,
  재수렴으로 head가 바뀌면 §3의 follow-up 영수증 갱신 레인이 적용된다. 잦은
  경쟁이 관측되면 quick_fix의 serial lane 배정을 운영 지침으로 안내한다(코드
  강제 없음).

## 7. 프런트엔드 (`app/views/worker/`)

- 후보 eligible: `!worker_ineligible && (is_quick_fix ? has_description :
  (has_spec && !spec.conflict))`. 드래그·"대기로 ↴" 활성화, "워커 비대상"
  배지·툴팁 제거. description 부재 시 사유 배지 `missing_description`.
- 파이프라인 표시: quick_fix attempt는 pr_wait 컬럼에 나타나지 않는다. 세션
  종료 후 landing(containment/배포) 진행은 **실행 중 컬럼의 attempt 카드**에
  기존 repo-ops progress 컴포넌트를 재사용해 표시하고, 종결 시 완료 컬럼으로
  이동한다. 새 컬럼·새 레인 UI는 만들지 않는다.
- Board 스테퍼 `quick_fix: ['impl', 'close']`는 유지한다. `workflow-enrich.js`
  에서 quick_fix `resolved`(push 완료·close 대기)의 close 스테이지를 `dim`으로
  표시하는 소폭 보정만 한다.

## 8. 비관여 고정

- merge 계열(`pr-poller`, `merge-queue`, `auto-merge`, `pr-actions` merge 경로,
  manual merge continuation/head-review)은 quick_fix attempt를 절대 집지
  않는다 — `pr_url` 부재로 자연 배제되지만 테스트로 고정한다.
  `merge-gate.js:106`의 quick_fix short-circuit은 도달 불가 방어로 유지한다.
- parallel-analysis·lane-scheduling 분석의 quick_fix 배제(spec 부재 근거)는
  유지한다.

## 9. dotfiles unit 분리 (Bead ID: 승인 후 생성·기입)

계약·스킬 반영은 dotfiles rig의 quick_fix Bead가 소유하고, `UI-7tme`는 foreign
`blocks` 의존으로 그것을 기다린다(workflow `references/execution.md` Cross-repo
units). 설계 SoT는 이 spec이며, 그 Bead는 아래 범위의 닫힌 실행만 수행한다:

- `docs/contracts/workflow.yaml`: `process_routes.quick_fix`에
  `worker_dispatch` 절(impl gate 필수, 영수증 push-head 결속, `skipped` 무효,
  배포·close·정리의 Worker 소유), `lifecycle.transitions`에 worker-dispatched
  변형(`in_progress → resolved(push+review) → closed(deploy)`), `pr_url` 없는
  `resolved` 허용 명시. 신규 키·라벨 없음.
- `docs/contracts/workflow.md`: Route/lifecycle 문구 개정 — "quick_fix는 PR이
  없으므로 직접 closed" 문장을 세션 단독/worker-dispatched로 분리.
- workflow skill `references/execution.md`: "bare base push는 push한 세션이
  배포 증거까지 소유" 문구를 Worker 비추적 push로 한정하고, reviewed
  worker-dispatched push 예외를 추가.
- workflow skill `references/finishing.md`: quick_fix tail에 worker-dispatched
  변형(§3 — `resolved` 정지, worktree 보존, Worker가 배포·close·정리)을 추가.

delivery는 그 rig의 quick_fix 절차다: 검증(`run-tests.sh --tier required` +
계약 checker) → main push → deploy 실행·확인 → `closed`. 그 close가
`UI-7tme`의 `bd ready`를 푼다. 의존 readback이 residue를 운반하므로
`worker-ineligible`은 붙이지 않는다.

## 10. beads-ui AGENTS.md 정합 (이 unit 범위)

Post-Merge Runtime Validation의 "Bead/PR 없는 quick_fix ref push는 관측 대상이
아니므로 배포 실행과 그 증거 확인까지 push한 세션이 소유한다"를 "**Worker가
추적하지 않는** quick_fix ref push"로 한정하고, Worker-dispatched quick_fix의
배포·close가 Worker 소유임을 한 줄로 가리킨다(계약 문구 복제 없이 dotfiles
계약 참조).

## 11. 검증

- `admission.test.js`: quick_fix admit(라우트 추가), spec 계열 검사 생략,
  `missing_description` 거부, `worker-ineligible`/gh 거부 유지. 기존 "quick_fix
  → invalid_route" 고정 테스트 반전.
- 신규 `quickfix-landing` 단위 테스트: 영수증 파싱(유효/`skipped@`/malformed),
  containment 판정, ensureDeploy 위임, close+cleanup 순서, 이미 `closed`인
  Bead의 관측-후-통과, terminal failure 사유 2종.
- `scheduler` settlement 분기: quick_fix `resolved` → landing 진입, pr_wait
  미진입.
- merge 비관여: `pr-actions`/`merge-queue`/`auto-merge`/`pr-poller` 테스트에
  quick_fix attempt 미포집 고정.
- 프런트: `lanes.test.js`/`index.test.js` eligible 반전·배지·landing 진행 표시,
  `workflow-enrich.test.js` resolved-dim 보정.
- `server/e2e/worker-flow.test.js`: quick_fix 시나리오(대기 → 실행 →
  resolved 관측 → landing → done) 1건.
- Pre-Handoff bundle: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` / `npm run build` (+ bundle 산출물 포함).

## 12. 비범위

- 대화형(비-Worker) quick_fix 절차 변경 — 무리뷰·세션 소유 배포 그대로.
- pr_wait 일반화, 새 레인/컬럼 UI, push-승인 대기 상태(세션 일시정지 프로토콜).
- Worker background head-review(`head-review-transport.js`)의 quick_fix 재사용
  — 게이트는 세션 내 formal gate로만 수행한다.
- 신규 metadata 키·라벨, quick_fix의 spec/freshness 도입.
- quick_fix push의 코드 수준 직렬화(머지 드라이버와의 lock 공유).
- parallel-analysis의 quick_fix 대상화.
