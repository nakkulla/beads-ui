---
scope:
  - server/worker/pr-actions.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/queue-store.js
  - app/views/worker/
---

# post-merge 잡 러너 — repo-ops/post-merge.d 원장 실행 스텝과 저장소작업 행

Bead: `UI-i60a` · 2026-09-01

설계 정본: dotfiles
`docs/superpowers/specs/2026-09-01-fullplan-phase-carryover-contract-design.md`
§3·§5 (커밋 `a12ad7b42701345d458d5fd2da9b712278a6f7e5`, Bead `dotfiles-hlns`).
잡 파일 형식·원장 키·입장 3조건·실행 결속 규칙은 정본이 소유하고, 이 문서는
beads-ui 러너·원장·UI의 소비 구현만 정한다.

## §0 목적

머지 한정 일회성 작업(마이그레이션·재색인 등)은 deploy(정적·매 머지)에도 후속
Bead(장시간·판정)에도 맞지 않는다. PR에 커밋되는
`repo-ops/post-merge.d/<이름>` 잡 파일(리뷰 결속 자동)을 Worker 정리 cursor의
상시 스텝이 원장 기반으로 파일당 1회 실행한다. `repo-ops/config.toml` 스키마는
불변 — 디렉터리 존재로 활성화한다(ADR 0024 정합, supersede 하지 않는다).

## §1 정리 cursor 새 스텝 `post_merge_jobs`

- `CLEANUP_STEPS`(`server/worker/pr-actions.js:99`)를
  `base_containment → repo_operations → post_merge_jobs → child_sweep →
  branch_cleanup → parent_close` 6단계로 확장한다.
- 스텝은 `closeCoveredRow`(:1530)의 **closure 첫 단계**로 들어간다
  (`closure_start`가 `post_merge_jobs`로 이동). deploy가 있든 없든
  (`runCleanup`의 config 부재 경로 :1925 포함) 항상 지나며, pending 잡이 없으면
  no-op이다. 재개는 기존 이름 기반 `cleanup_failed.step` 매칭 그대로 —
  기존 기록(`child_sweep` 등)은 자기 단계부터 재개된다.
- 스텝 입력은 머지 커밋 `merge_sha`(cursor 기록 또는 `cleanupMergeSha` 재관측).
  부재 시 `failCleanup('post_merge_jobs', 'merge_sha_unobserved')`.
- `repo-ops-timeline.js`의 정리 stepper는 5→6단계가 된다.

## §2 잡 발견·실행 — RepoOperation 봉투 재사용

- **발견**: `merge_sha` 트리에서 `git ls-tree`로 `repo-ops/post-merge.d/`를
  읽는다. 디렉터리 부재 = no-op. 항목별 blob SHA가 원장 키
  `<파일명>@<blob SHA>`의 재료다. 실행 순서는 파일명 사전순(run-parts 관례).
  일반 파일이 아닌 항목(디렉터리·symlink)은
  `failCleanup('post_merge_jobs', 'post_merge_job_invalid:<이름>')` — 조용히
  건너뛰지 않는다.
- **실행**: `repo-operation-coordinator.js`에 새 kind **`job`**을 추가해
  verify/deploy와 같은 봉투를 탄다 — durable 선기록(`ensureRepoOperation`),
  `.worktrees/.repo-ops-deploy` 정렬(`bindTarget`/`ensureAligned`) ·
  deploy lock(`deploy-lock.js`) · timeout(deploy와 같은 해석: `[deploy]`
  선언값, 없으면 기본값) · 로그 디렉터리 · 종료 후 `verifyAligned`의
  tracked-clean 검증. 정렬 target은 `merge_sha`다(리뷰된 그 트리에서 실행;
  base 포함은 `base_containment`가 이미 검증). 성공 판정은 exit 0 +
  tracked-clean이며, 산출 존재 검증은 잡 스크립트 자신의 책임이다(정본 §3
  입장 3조건의 "기계 판정").
- **deploy 채택 의미론과의 차이 (kind `job` 한정)**: deploy의
  descendant coverage(더 새로운 HEAD가 target을 포함하면 실행 없이 성공
  채택)는 잡의 **실행 증거가 아니다** — 커버는 잡을 돌리지 않는다. spawn
  직전 정렬된 워크트리 HEAD가 `merge_sha`와 같음을 검증하고, 다르면(공유
  워크트리가 이미 더 새 SHA에 결속돼 monotonicity가 되감기를 거부하는 경우
  포함) 실행하지 않고 이름 있는 실패
  `failCleanup('post_merge_jobs', 'post_merge_job_target_moved:<키>')`로
  중단한다 — `applied`를 쓰지 않고, 공유 런타임 소스를 되감지도 않는다.
  이 상태의 출구는 두 가지다: 나중 머지의 정리가 자기 `merge_sha` 트리에서
  같은 pending 잡을 발견해 실행하거나(원장 키가 content-addressed라 1회성
  유지), 정리 재시도 시점의 재판정이 `applied`를 관측해 skip한다.
- **실패**: `script_retry` 1회(`resolution-ladder`) → 소진 시
  `completion-intent.terminalize`로 needs_human 종단. 실패는 close를 막는다 —
  cursor가 `post_merge_jobs`에서 멈추고 부모는 닫히지 않는다.

## §3 적용 원장 `queue.post_merge_jobs`

`queue.json`에 키 `<파일명>@<blob SHA>` →
`{ state: 'intent'|'applied', operation_id, repo_id, at }` 맵을 둔다. 기존
`queue.repo_operations` 맵과 같은 CAS mutator 패턴(`queue-store.js`)이다.

- 실행 **전** `intent`(잡 identity + operation id)를 기록하고, terminal
  success + tracked-clean 검증 뒤에만 `applied`를 쓴다.
- `applied` 키는 skip — 파일당 1회, 머지 횟수 무관(파일은 히스토리에 남거나
  후속 PR이 자유로이 제거).
- 같은 키의 exit 0 terminal 증거가 있는 정확한 실행은 재실행 대신
  **재채택**한다(핀 정책 `exact_input_exit_zero_evidence_adoption`과 같은 꼴 —
  `intent`가 가리키는 operation 기록의 terminal 증거로 판정).
- `intent`만 있고 terminal 증거가 없는 결과 불명 중단은 자동 재실행하지 않고
  `failCleanup('post_merge_jobs', 'post_merge_job_outcome_unknown:<키>')`로
  종단한다. 재진입은 정리 재시도 클릭이다 — 잡 효과와 원장 기록 사이의
  중단이 이중 실행을 만들지 않는다(정본 §3 실행 결속).
- **재시도의 operation 재기록 규칙**: terminal에 도달한 `RepoOperation`은
  다시 열리지 않으므로, 정리 재시도가 `post_merge_jobs` 스텝을 다시 지날 때
  원장 `intent`가 가리키는 기존 operation을 먼저 **reconcile**한다:
  ① 프로세스가 살아 있으면 새 실행을 거부하고 대기(중복 spawn 금지),
  ② terminal success + tracked-clean 증거가 있으면 재채택해 `applied`를 쓰고,
  ③ terminal 실패이거나 죽은 결과 불명이면 새 kind `job` operation을
  선기록한 뒤 원장 항목의 `operation_id`를 **같은 CAS mutation에서** 새
  id로 교체하고 실행한다 — 이전 operation 기록은 supersede 계보
  (`superseded_by`)로 보존한다(감사 기록). 이 규칙 없이는 실패한 잡이 영영
  재실행되지 않거나, 살아 있는 실행 위에 중복 실행이 생긴다.

## §4 저장소작업 행 UI

kind `job` 행이 기존 저장소 작업 strip(`lanes.js repoOpsStripModel`)과
timeline drawer(`repo-ops-timeline.js`)에 verify·deploy와 같은 문법으로
나타난다(표기는 잡 파일명). 실패 행의 재진입 버튼 개칭(`[정리 재시도]`)과
`[세션에서 해결]` 추가는 `UI-jw27` 소유다 — 이 Bead는 행 표시와 기존
`worker-cleanup-retry` 재개 경로 연결까지만 한다.

## §5 수용 기준

1. `post-merge.d` 부재·빈 디렉터리에서 스텝이 no-op이고 정리는 현행과 동일하게
   진행된다.
2. pending 잡이 사전순으로 실행되고, 각 실행 전 `intent`·성공 후 `applied`가
   원장에 기록되며 readback된다.
3. `applied` 키는 이후 어떤 머지에서도 재실행되지 않는다; 파일 내용이 바뀌면
   (blob SHA 변경) 새 키로 1회 실행된다.
4. exit 0 terminal 증거가 있는 같은 키의 실행은 재채택되고 스크립트가 다시
   spawn되지 않는다.
5. `intent`만 남은 결과 불명 중단은 자동 재실행 없이 정리 중단으로 종단하고,
   정리 재시도 클릭이 증거 판정을 다시 거친다.
5-1. 정리 재시도의 reconcile 3분기가 각각 성립한다: 살아 있는 실행은 새
   spawn을 거부하고, terminal success 증거는 재채택되며, terminal 실패·죽은
   결과 불명은 새 operation 선기록과 원장 `operation_id`의 CAS 교체 후
   재실행되고 이전 operation은 `superseded_by` 계보로 남는다.
6. 잡 실패는 `script_retry` 1회 뒤 needs_human으로 종단하고 부모 close를 막는다;
   tracked-clean 위반은 실패다.
6-1. 정렬된 워크트리 HEAD가 `merge_sha`와 다르면 잡은 실행되지 않고
   `post_merge_job_target_moved:*`로 중단하며 `applied`가 기록되지 않는다 —
   descendant coverage는 kind `job`의 실행 증거로 채택되지 않는다.
7. 저장소 작업 화면에 잡 행이 파일명으로 표시된다.
8. Pre-Handoff Validation(tsc/test/lint/prettier/build) 통과.

## 구현 unit 후보

- unit A: cursor 스텝·발견·원장 — scope anchor `server/worker/pr-actions.js`·
  `server/worker/queue-store.js`
- unit B: coordinator kind `job` 실행 봉투 — scope anchor
  `server/worker/repo-operation-coordinator.js`
- unit C: 저장소작업 행 표시 — scope anchor `app/views/worker/`

## 경계·후속

- 관찰: 실패 행의 알림·`[정리 재시도]` 개칭·`[세션에서 해결]`은 `UI-jw27`이
  소유한다(이 Bead에 `blocks`로 결속 — 핸드오프에서 router가 기록).
- 관찰: 이 Bead 자신은 `UI-btj6`에 `blocks`로 결속된다(같은 정리 cursor 순차
  수정).
- 관찰: scope 교차 — `UI-iv7l`
  (`docs/superpowers/specs/2026-08-31-review-gate-speed-design.md`)과
  `server/worker/queue-store.js`를 공유하나 다른 절이다: iv7l은 리뷰 속도
  키, 이 스펙은 `post_merge_jobs` 맵을 추가한다. 의존 관계 없음.

## 결정 (ADR 후보)

- **post-merge 잡은 RepoOperation 봉투를 재사용하고 원장은 queue.json 맵이다** —
  되돌리기 어려움: 성립(원장 키와 kind `job` operation 기록이 durable 상태에
  남아 이후 변경은 마이그레이션이 필요). 맥락 없이 놀라움: 성립(config 스키마
  불변·디렉터리 존재 활성화인 이유, 별도 러너를 만들지 않은 이유). 실제
  트레이드오프: 성립(전용 러너/별도 원장 파일 기각 — 저장소작업 행·retry
  사다리·needs_human 경로 정합을 위해). → summary 초안: "post-merge 잡은
  RepoOperation kind `job`으로 deploy 봉투를 재사용해 실행하고 적용 원장은
  `queue.json`의 `<파일명>@<blob SHA>` 맵이다"
