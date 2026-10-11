---
scope:
  - server/worker/verify.js
  - server/worker/gh.js
  - server/worker/quickfix-landing.js
  - server/worker/external-pr.js
  - server/worker/pr-poller.js
  - server/worker/pr-actions.js
  - server/worker/merge-candidates.js
  - server/worker/merge-queue.js
  - server/worker/auto-merge.js
  - server/worker/merge-gate.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/discard-coordinator.js
  - server/worker/completion-intent.js
  - server/worker/notify.js
  - server/worker/review-session.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/attach.js
  - server/worker/bd-metadata.js
  - server/ws/worker-handlers.js
  - app/views/worker/pr-wait-row.js
  - app/views/worker/lanes.js
  - app/views/worker/tile-resolve.js
  - app/utils/failure-sentences.js
  - app/styles/
  - app/views/monitor/
  - app/protocol.md
---

# 외부 저장소 PR로 전달된 Bead를 Worker가 머지·마감까지 처리한다

Bead: UI-k467 · route: spec_backed · 작성 2026-10-11 · pinned base
`04f6231eca7db4b94937158fce495914b5c44b81` · 계약: dotfiles-8k8yf(ADR
dotfiles/dotfiles-8k8yf, dotfiles PR #581 `a2c6a418`)

## 1. 목표

- rig가 없는 대상 저장소의 PR로 전달된 Bead(계약 `enclosed_foreign_landing.delivery.pr`)는
  세션이 성공하면 실패 카드가 아니라 PR 대기 카드가 된다.
- 그 PR은 작업 공간 PR과 같은 `auto_merge` 스위치·순차 머지 큐·`[머지]` 클릭으로
  머지되고, 머지 뒤 대상 저장소에서 포함 증명·소유 잔여물 정리·Bead close까지 Worker가
  한다. GitHub에서 직접 머지돼도 같은 마감을 한다.
- 계약이 사람에게 넘기라고 정한 세 경우는 `foreign_handoff`로 멈추고 카드와 알림으로
  알린다.

배경: 2026-10-11 dotfiles-s6vnr(research-repo-template PR #4)는 세션이 `성공 · PR #4`로
끝났는데 Worker가 `no_pr`로 읽어 `⛔ 실패`로 표시했고, 실패 카드가 직렬 레인을 잡았다.

사용자 결정(2026-10-11, Bead 본문과 이 세션):
- 대상 저장소에 rig나 이슈를 만들지 않는다. 외부 PR 전용 스위치는 두지 않는다.
- `[머지]` 자리에 대상 저장소 이름이 붙은 버튼을 두고, 의미는 기존 `[머지]`와 같다.
- 외부 PR 대기 행도 작업 공간 PR처럼 직렬 레인을 점유한다(머지·`[보관]`까지).
- 외부 PR의 `[폐기]`는 머지 전 PR만 지원한다.
- 구현은 별도 모듈이 아니라 기존 감시·머지·검증·정리 경로에 대상 정보를 넘겨 한 벌의
  관문으로 처리한다.

## 2. 검증된 전제

- 세션 뒤 확인은 기록된 `pr_url`의 slug를 작업 공간 origin slug와만 비교해 외부 PR을 `no_pr`로 읽는다 — `server/worker/verify.js:353`
- `no_pr`에 `bead_status=resolved`면 원인이 `unknown`으로 떨어진다 — `server/worker/failure-class.js:179`, `:395`, `:605`
- 세션 뒤 확인을 부르는 곳은 두 곳이다(`onSessionDone`, 죽은 detached attempt 처분) — `server/worker/scheduler.js:7255`, `:9162`
- gh 호출은 `repo_dir`의 origin push URL에서 `--repo` slug를 만든다. 명시 slug 입구는 없다 — `server/worker/gh.js:170`, `:604`, `:922`, `:961`, `:1039`
- quick_fix push 착지는 이미 foreign 핀 세 개를 읽고 검증하며, 대상 체크아웃에서 `foreign_repo`와 URL이 정확히 같은 remote를 찾는다 — `server/worker/quickfix-landing.js:522`, `:594`
- PR 감시는 foreign으로 표시된 외부 등록 행을 gh 호출 없이 `pr_repo_foreign`으로 멈춘다 — `server/worker/pr-poller.js:341`; foreign 판정 — `server/worker/external-pr.js:110`
- 전체 목록 스캔은 `pr_url`이 있는 모든 `resolved` Bead를 한 번에 읽지만 metadata는 영수증 키만 싣는다(foreign 핀 없음) — `server/worker/bd-metadata.js:692`, `:810`, `:824`, `:840`
- `[verify]` 후보 워크트리는 지금 `os.tmpdir()` 아래에 만든다 — `server/worker/repo-operation-coordinator.js:3644`
- `.op-btn`은 줄바꿈하지 않는다 — `app/styles/components.css:46`
- 모니터는 Worker와 같은 PR 대기 행 투영을 쓴다 — `app/views/monitor/index.js:2318`
- ADR UI-9w5l(UI-jbl1의 후계, UI-jbl1 조항 승계)은 남는 `needs_human` 알림 클래스와 `[세션에서 이어가기]`가 서는 실패 행을 닫힌 목록으로 적는다 — `docs/adr/UI-9w5l-action-required-resolvable-by-button.md:123`, `:733`, `:738`
- `resolvePrRef`는 attempt·durable 행을 "이 Worker의 PR"로 가정한다. 외부 PR 번호가 그대로 작업 공간 저장소에서 읽힌다 — `server/worker/pr-poller.js:135`; `pr-actions.js`·`discard-coordinator.js`의 호출부도 같다 — `server/worker/discard-coordinator.js:297`
- `[verify]` 후보 검증은 코디네이터의 `deps.repo`와 `origin`에 묶여 있다 — `server/worker/repo-operation-coordinator.js:1274`
- 리뷰 ancestry 프로브는 `{repo, remote}`를 받는다 — `server/worker/merge-gate.js:153`
- 머지 큐 충돌은 해소 attempt를 만든다(상한 2회) — `server/worker/merge-queue.js:52`, `:1760`, `server/worker/pr-actions.js:3471`
- base 판정은 불일치를 거절하고 재지정하지 않는다 — `server/worker/pr-actions.js:714`
- 머지 뒤 단계는 `base_containment → repo_operations → post_merge_jobs → branch_cleanup → parent_close`이고 모두 작업 공간 `repo`·`origin`을 쓴다 — `server/worker/pr-actions.js:105`, `:2412`, `:3533`
- `pr_wait` 행은 `merge_shelved` 기록이 없으면 직렬 레인을 점유한다 — `server/worker/scheduler.js:1193`
- `[폐기]`는 PR 닫기·`merged_revert`·`resetParent`를 작업 공간 저장소 기준으로 한다 — `server/worker/discard-coordinator.js:297`, `:1902`
- needs-human 알림 분류는 닫힌 맵이고 맵에 없는 stage는 알림을 보내지 않는다. 계약 `failure_classes`는 투영되지 않아 손으로 복사한다 — `server/worker/completion-intent.js:60`, `:839`; `docs/superpowers/specs/2026-10-06-failure-conversation-auto-launch-design.md:75`
- `needs_human` 행에서도 `[머지]`는 눌린다(`receipt_hold` 면제 경로) — `app/views/worker/pr-wait-row.js:215`
- `[세션에서 이어가기]` 행 종류에 `merge_gate`가 있고 그 제목은 "사람의 [머지]만 풀린다"이다 — `app/views/worker/tile-resolve.js:173`, `:205`
- 외부 등록 행의 foreign 표시와 `[보관]` 숨김 — `app/views/worker/pr-wait-row.js:907`, `:1179`
- 기존 `foreign_deploy_unsupported` 문장은 quick_fix push 착지용이다 — `app/utils/failure-sentences.js:76`, `:158`
- 리뷰 세션은 `head_ref`로 rig 워크트리를 복원해 띄운다 — `server/worker/review-session.js:396`, `server/worker/scheduler.js:16938`
- dotfiles-s6vnr은 이미 `closed`이고, 그 attempt는 ✕로 레인에서 내렸다 — `bd -C ~/GitHub/dotfiles show dotfiles-s6vnr --json`, UI-k467 notes
- 계약 어휘(`delivery.pr`, `failure_classes.foreign_handoff`, 실패 토큰)는 dotfiles `docs/contracts/workflow-state.yaml` `enclosed_foreign_landing`·`failure_classes`에 있다 — dotfiles `a2c6a418`

## 3. 설계

### 3.1 외부 PR 대상(PR target)

외부 PR 대상인 Bead란 계약 detection을 모두 만족하는 Bead다. `foreign_repo`·`foreign_path`·
`foreign_base` 핀이 있고, `pr_url`의 host/owner/repo가 `foreign_repo`와 같아야 한다.
비교는 `.git`을 떼고 대소문자를 무시한다.

- 핀 판독과 대상 remote 찾기는 quick_fix 착지 함수를 공유 모듈로 옮겨 재사용한다
  (예: `server/worker/foreign-target.js`). quick_fix 착지의 동작은 바뀌지 않는다.
- URL 정규화는 `parseOriginRepo`(scp·ssh·https 형식)와 PR URL 파서를 공유해 쓴다.
- 결정: 외부 대상에 대한 gh 호출은 모두 핀에서 만든 slug를 `--repo`로 넘긴다.
  체크아웃의 `origin`에서 slug를 유도하지 않는다. 대상 체크아웃에서 `foreign_repo`와
  일치하는 remote가 `origin`이 아닐 수 있기 때문이다.
- 결정: 관측(감시·표시·보류 재판정)은 전체 목록 스캔이 싣는 핀으로 대상을 매번 다시
  만든다. 스캔은 `pr_url`이 있는 모든 `resolved` Bead를 이미 한 번에 읽으므로 Worker가
  전달한 `pr_wait` Bead도 덮는다. 스캔의 metadata 조각에 foreign 핀 세 키를 더한다.
  상태를 바꾸는 조작(머지, 머지 뒤 마감, 폐기, 리뷰 dispatch)은 시작할 때 그 Bead의 핀을
  `readMetadata`로 한 번 더 읽는다(대안: 수락 때 행에 대상 스냅샷 저장; 이유: 사람이
  `foreign_base` 핀만 고쳐도 클릭 없이 다음 스캔 턴에 보류가 다시 판정돼야 하고, 행마다
  `bd show`를 따로 부르지 않는다).
- 실패 토큰은 계약 것을 그대로 쓴다. `foreign_landing_unpinned:<key>`,
  `foreign_checkout_unavailable`, `foreign_pr_repo_mismatch`이다.

### 3.2 세션 뒤 확인

- 핀이 있는 Bead는 rig 브랜치 PR 검색을 건너뛰고 기록된 `pr_url`로 바로 판정한다.
  계약상 rig와 대상에 나눠 착지하는 것이 금지돼 있기 때문이다.
- `pr_url`이 `foreign_repo` 소속이면 대상 slug로 PR을 읽는다. OPEN이면 지금처럼
  `pr_url`·`resolved`를 기록하고 성공으로 끝난다. MERGED도 지금 경로와 같다.
- 핀이 있는데 `pr_url`이 다른 저장소 소속이면 `foreign_pr_repo_mismatch`로 실패한다.
  핀이 일부만 있으면 `foreign_landing_unpinned:<key>`로 실패한다. 둘 다 `unknown`이
  아니라 그 토큰이 실패 원인으로 보인다.
- 핀이 없는 Bead는 지금과 같다.
- 성공하면 지금처럼 `pr_wait`로 옮기고 레인을 점유한다.

### 3.3 PR 관측

- detection이 성립한 행(Worker가 전달한 `pr_wait`, 세션이 전달한 외부 등록 행)은
  `gh pr view --repo <대상>`으로 관측한다. 리뷰 영수증 ancestry는 `foreign_path`와 대상
  remote로 판정한다.
- 핀이 없는 외부 등록 행은 지금처럼 `pr_repo_foreign`·`외부 저장소 PR`로 남는다.
- MERGED로 관측되면 3.6의 마감으로 간다.

### 3.4 머지 자격과 큐

- 큐는 하나다. 작업 공간 PR과 외부 PR을 구분하지 않고 등록 순서대로 처리한다.
  `auto_merge` 자동 등록에 외부 행도 들어간다.
- 관문 입력은 작업 공간 PR과 같다. fresh PR·base·head identity, mergeability, 리뷰
  영수증(ancestry), `exec_receipt` 관문, `[verify]` 결과를 본다.
- 외부 PR에만 더하는 조건이 셋 있다. detection 성립, 대상 체크아웃 사용 가능,
  `foreign_handoff` 원인 없음이다. 앞의 둘이 깨지면 그 토큰을 머지 거절 사유로 보이고,
  매 턴 다시 판정한다.
- 기대 base는 `foreign_base`다. 작업 공간 `resolveTargetBase`를 쓰지 않는다.
  PR base가 다르면 `foreign_handoff(foreign_pr_base_mismatch)`이고 재지정하지 않는다.
- `base_behind` 정렬은 작업 공간과 같은 조건에서 `gh … --repo <대상>`으로 한다.
- 충돌(CONFLICTING·DIRTY)은 `foreign_handoff(foreign_conflict_needs_human)`다. 해소
  attempt를 만들지 않는다. 큐 드라이버, `dispatchConflict`, `[머지]` 클릭 세 입구 모두에서
  막는다.
- 대상 base tip이 `[deploy]`를 선언했거나 후보 트리에 `repo-ops/post-merge.d/` 파일이
  있으면 머지 전에 `foreign_handoff(foreign_deploy_unsupported)`다.
- 머지는 `gh pr merge <n> --repo <대상> --squash --match-head-commit <head>`이고, 성공 판정은
  지금처럼 MERGED 관측이다.

### 3.5 대상 `[verify]`

- 정책은 fetch한 `foreign_base` tip의 선언을 쓴다. 선언이 없으면 관문도 없다.
- 결정: 후보는 대상의 common git dir 아래 Worker 소유 디렉터리
  `<git -C foreign_path rev-parse --git-common-dir>/bdui-verify/<operation-id>`에 만드는
  detached 워크트리다(대안: 지금처럼 `os.tmpdir()`; 이유: 계약 `verify.worktree`가 대상
  common git dir 아래를 요구한다). fetch한 base tip 위에 PR head를 합친다. 기존 후보
  생성·정리 함수에 repo, remote, 후보 상위 디렉터리를 매개변수로 넘기고, 작업 공간 후보는
  지금 위치 그대로 둔다. 정리와 재시작 복구는 이 디렉터리 아래 Worker가 만든 워크트리만
  지운다(`worktree remove --force` 후 `worktree prune`).
- 결과는 (PR head, base tip)과 기존 스크립트 identity에 묶인다. 하나라도 바뀌면
  다시 돌린다. 세션의 `verify_receipt`는 입력이 아니다.
- operation id에 대상 저장소 identity를 넣어 작업 공간 operation과 겹치지 않게 한다.
  대상의 deploy lock과 deploy 워크트리는 잡지도 만들지도 않는다.
- 실패는 작업 공간과 같은 `pre_merge_hold`의 verify failure다.

### 3.6 머지 뒤 마감 (Worker 머지·GitHub 직접 머지 공통)

기존 정리 커서 단계에 대상 분기를 둔다.

1. `base_containment`: `foreign_path`에서 대상 remote의 `foreign_base`를 다시 fetch하고,
   머지 SHA가 tip과 같거나 조상인지 증명한다. 증명하지 못하면 close하지 않는다.
2. `repo_operations`: 머지 SHA의 첫 부모 선언과 머지 SHA 트리로 판정한다.
   `[deploy]`나 `post-merge.d/` 파일이 있으면 `foreign_handoff(foreign_deploy_unsupported)`이고
   `resolved`로 남긴다. 첫 부모가 `[verify]`를 선언했으면 (PR head, 첫 부모)에 묶인
   Worker 결과가 필요하고, 없으면 지금 돌린다. 실패하면 작업 공간 머지 꼬리처럼
   close하지 않는다.
3. `post_merge_jobs`: 외부 대상에서는 실행하지 않는다(2에서 사람에게 넘어간다).
4. `branch_cleanup`: 소유 잔여물만 지운다. 대상 `.worktrees/<bead-id>`와 로컬
   `<bead-id>` 브랜치, 고정된 head와 같을 때만 원격 head 브랜치, verify 후보 워크트리,
   rig attempt 워크트리와 브랜치다. 모르는 상태나 dirty 상태는 남긴다. 실패는 경고이고
   close를 막지 않는다.
5. `parent_close`: `closed`를 쓰고 다시 읽는다. `foreign_path` base 동기화는 하지 않는다.
   계약상 선택 사항이고, 그 체크아웃은 사용자의 작업 트리다.

### 3.7 `foreign_handoff`

- 새 needs-human 분류다. 원인 토큰은 세 개다. 알림 라벨은 계약 `notify_label`
  「외부 PR 사람 처리 필요」를 바이트 그대로 복사한다. 알림은 진입할 때 한 번 보내고,
  기존 원자 기록을 따른다.
- 상태는 `resolved`로 유지한다. 카드 배지는 「외부 PR 사람 처리 필요」이고, 원인 문장은
  title에 둔다. PR 흐름용 문장 세 개를 새로 두고, quick_fix의
  `foreign_deploy_unsupported` 문장과는 분류로 구분한다.
- `[머지]`는 비활성이고 title에 「[머지]로 풀리지 않습니다」를 둔다. `needs_human`의
  `[머지]` 면제 경로가 이 분류를 풀지 못하게 한다.
- 탈출구는 `[세션에서 이어가기]` 하나다. `tileResolveFields`에 새 행 종류를 두고
  `merge_gate` 제목을 물려받지 않는다. 대화의 첫 입력에는 분류, 원인, Bead,
  `foreign_path`, 그리고 "대상 저장소에서 `pr-finish` Foreign-pinned Bead 절차로
  처리"를 싣는다. `[워커로 이어가기]`는 두지 않는다.
- 자동으로 풀리는 경우도 있다. conflict 원인은 PR head가 바뀌면, base 원인은 PR base나
  핀이 고쳐지면 다음 관측 턴에 다시 판정해 풀린다(3.1의 스캔 핀 재판정, 클릭 불필요).
  deploy 원인은 세션에서만 풀린다.

### 3.8 카드와 버튼

- 외부 PR 행의 머지 버튼 라벨은 기존 라벨 뒤에 ` ↗ <저장소 이름>`을 붙인다(예:
  `머지 ↗ research-repo-template`, `리뷰 후 머지 ↗ …`). 전체 `owner/repo`는 title에 둔다.
  `.op-btn`은 줄바꿈하지 않으므로 이 버튼은 `max-width`와 말줄임으로 자른다.
- 슬롯 1의 `↗ owner/repo` 표시는 그대로다. 핀이 있는 행의 tooltip은 "다른 저장소의
  PR입니다. 대상 저장소 절차로 이 Worker가 머지합니다"로 바꾼다. `외부 저장소 PR`
  배지는 핀이 없는 행에만 붙인다.
- 핀이 있는 외부 행에는 `[보관]`을 연다. 서버의 foreign 보관 거절도 핀이 없는 행에만
  적용한다.
- 모니터는 같은 행 투영을 쓰므로 같은 카드를 그린다. parity §9 표에 추가할 행은 없다.
- 스펙 정정: card-header-grammar §5.1 뒤에 `정정(UI-k467)` 문단을 둔다. 슬롯 6 `머지/취소`는
  라벨 변경, 슬롯 1 상태 뱃지에는 「외부 PR 사람 처리 필요」를 더한다.
  `2026-09-08-worker-feedback-readability-design.md` §6 뒤에도 정정 문단을 둔다.
  "외부 PR은 관측·머지·정리하지 않는다"는 이제 핀 없는 행에만 해당한다.

### 3.9 `[폐기]`

- 핀이 있는 외부 행에서 PR은 대상 slug로 읽는다. OPEN이면 `--repo`로 닫고 다시 읽는다.
  그다음 3.6-4의 소유 잔여물을 지우고, 지금처럼 `resetParent`한다.
- MERGED면 아무것도 바꾸기 전에 거절한다(`foreign_merged_discard_unsupported`). 안내
  문장은 "대상 저장소에서 사람이 되돌리세요"다. CLOSED는 머지 안 된 경로로 간다.
- 핀이 없는 외부 등록 행의 `[폐기]`는 지금처럼 숨긴다.

### 3.10 리뷰 세션 (`[리뷰 후 머지]`·자동 리뷰 dispatch)

외부 행의 리뷰 세션은 대상 `.worktrees/<bead-id>`에서 일한다. 이 워크트리가 없으면 대상
remote의 head ref로 복원한다. 외부 `head_ref`로 rig 워크트리를 복원하려 하지 않는다.
prompt에 대상 경로와 slug를 싣는다. 세션이 쓰는 것은 계약대로 PR head push와
`impl_review`다.

## 4. 수용 기준

1. 핀과 대상 소속 `pr_url`이 있는 Bead의 성공 세션은 `pr_wait` 카드가 되고 실패 카드가 생기지 않는다.
2. 핀은 있는데 `pr_url`이 다른 저장소 소속이면 `foreign_pr_repo_mismatch` 원인으로 실패한다.
3. 외부 행의 모든 gh 호출은 `--repo <핀 slug>`이고, 작업 공간 저장소의 같은 번호 PR을 읽거나 바꾸지 않는다.
4. `auto_merge`가 켜져 있으면 외부 PR은 같은 큐에서 머지되고, 대상 remote의 `foreign_base`에 머지 SHA 포함을 증명한 뒤 close된다.
5. GitHub 직접 머지도 같은 마감으로 close된다.
6. 대상 `[verify]`는 (PR head, base tip)에 묶이고, 하나라도 바뀌면 다시 돈다.
7. 충돌, base 불일치, `[deploy]`·`post-merge.d` 선언은 `foreign_handoff`가 되고 해소 attempt가 생기지 않는다. 「외부 PR 사람 처리 필요」 알림이 한 번 간다. `[머지]`로 풀리지 않는다. base 불일치는 핀이나 PR base를 고치면 클릭 없이 다음 관측 턴에 풀린다.
8. 대상 `[verify]` 후보는 대상 common git dir 아래 `bdui-verify/`에 생기고 끝나면 지워진다.
9. 외부 행 머지 버튼 라벨은 `… ↗ <저장소 이름>`이고, Worker와 모니터 카드가 같다.
10. 외부 행 `[폐기]`는 OPEN PR을 대상 저장소에서 닫고 Bead를 open으로 되돌린다. MERGED면 아무것도 바꾸지 않고 거절한다.
11. 핀이 없는 외부 등록 행과 quick_fix push 착지의 동작은 바뀌지 않는다.

## 5. Test scope

- `server/worker/verify.test.js`: 대상 소속 수락, `foreign_pr_repo_mismatch`, 핀 일부 누락. 기존 "refuses a pr_url pointing at another repository"는 핀 없는 경우로 좁힌다.
- 공유 대상 모듈 테스트: scp·https·PR URL과 `.git`·대소문자 정규화, remote 판정. `quickfix-landing.test.js`는 그대로 통과해야 한다.
- `server/worker/gh.test.js`: 명시 slug 입구가 `--repo <slug>`를 넘긴다.
- `server/worker/pr-poller.test.js`: 핀 있는 행 관측, 핀 없는 행 `pr_repo_foreign` 유지.
- `server/worker/merge-queue.test.js`·`pr-actions.test.js`: 충돌, base 불일치, deploy 선언이 handoff로 가고 해소 attempt 없음. 대상 verify 정책과 결속. `--repo` 머지. `[머지]` 클릭이 handoff를 풀지 못함. 머지 뒤 포함 증명, 첫 부모 재판정, 소유 잔여물만 정리, close.
- `server/worker/pr-poller.test.js`(또는 머지 큐 테스트): `foreign_pr_base_mismatch` 보류 행에서 스캔 핀의 `foreign_base`만 PR base와 같게 바꾸면 클릭 없이 다음 관측 턴에 보류가 풀린다.
- `server/worker/repo-operation-coordinator.test.js`: 대상 후보가 `<대상 common git dir>/bdui-verify/<operation-id>`에 생기고 정리·재시작 복구가 그 아래만 지운다. 작업 공간 후보 위치는 그대로다. operation id가 분리된다.
- `server/worker/discard-coordinator.test.js`: OPEN 외부 PR 닫기, MERGED 거절 시 무변경.
- `server/worker/completion-intent.test.js`: `foreign_handoff` 분류와 알림 라벨.
- `server/worker/scheduler.test.js`: 외부 성공이 `pr_wait`로 가는지(두 호출부).
- `app/views/worker/pr-wait-row.test.js`·`tile-resolve` 테스트: 핀 있는 외부 행의 `merge_label`이 `머지 ↗ research-repo-template`(리뷰 보류면 `리뷰 후 머지 ↗ research-repo-template`)이고 title이 `owner/repo`다. `foreign_handoff` 행은 배지 「외부 PR 사람 처리 필요」, `merge_enabled === false`, `[보관]` 있음, `[세션에서 이어가기]` 있음·`[워커로 이어가기]` 없음, 세션 제목이 `merge_gate` 것과 다르다. 핀 없는 외부 행은 지금 기대값 그대로다.
- 회귀 확인(변경 전에도 통과할 수 있음): `app/views/monitor/card-parity.test.js`에 핀 있는 외부 행과 `foreign_handoff` 행 fixture를 더해 두 탭이 같은 부품을 그리는지 본다. `app/styles.design-system.test.js` 변형 렌더에 긴 외부 라벨을 더해 부품 클래스를 확인한다.
- 레이아웃 실측(테스트 파일 아님, 구현 검증 단계): Playwright로 공유 서버의 `#/worker`·`#/monitor`를 390px·1280px로 열고 `routeWebSocket`으로 긴 외부 라벨 행과 handoff 행을 주입한다. 버튼 오른쪽 끝이 카드 오른쪽 끝을 넘지 않고, 말줄임이 적용(`scrollWidth > clientWidth`)되는지 측정한다.

## 6. 경계·비목표

- 머지된 외부 PR의 되돌리기(`merged_revert`)는 하지 않는다.
- 대상의 `[deploy]`와 post-merge 작업은 실행하지 않는다(계약).
- 결정: quick_fix push 착지(`quickfix-landing.js`)의 판정은 바꾸지 않는다 — 계약이 push 전달을 그대로 두었다.
- 결정: 대상 저장소에 rig나 이슈를 만들지 않는다 — 사용자 결정.
- `foreign_path` 핀 자동 보정은 하지 않는다.
- 관찰: dotfiles-s6vnr의 `foreign_path`는 저장소 루트 이전 전 경로(`~/Documents/GitHub/…`)다. 이미 closed라 조치하지 않는다 — 같은 대상의 새 Bead는 새 경로로 핀된다.
- 관찰: UI-9w5l(`b1b5ae04`)이 먼저 착지해 UI-jbl1의 후계 ADR UI-9w5l이 생겼다. 이 스펙의 supersede 대상을 UI-9w5l로 바꾸고 그 summary 조항(조치 필요·살아 있는 대화 포커스)을 승계한다. `foreign_handoff`는 대기 사유가 아니라 실패 종단이라 UI-9w5l의 조치 필요 불변식과 겹치지 않는다.
- 관찰: UI-c74x 스펙도 같은 소비자 집합의 ADR을 supersede한다. 먼저 착지하는 쪽의 후계 id로 다른 쪽의 supersede 대상을 바꾼다(인용 갱신은 correction).

## 결정 (ADR 후보)

- 전제: ADR dotfiles/dotfiles-8k8yf — 외부 PR의 머지 권한·대상 `[verify]`·`foreign_handoff`·머지 뒤 마감 조항을 그대로 소비한다.
- 전제: ADR UI-u6ud-2 — beads-ui는 계약 소비자다. `failure_classes.foreign_handoff`는 손 복사한 레지스트리로 읽는다.
- 전제: ADR UI-ny0h — 단일 순차 드라이버, `[머지]`는 등록만, `auto_merge` 독립. 머지 자격 입력은 "저장소 안 관측"이며, 외부 PR은 대상 저장소 안에서 관측한다.
- 전제: ADR UI-9w5l(UI-jbl1 승계 조항 포함) — 슬롯 표, 새 요소는 스펙 먼저, 알림 제목 `🙋 확인 필요 · <클래스>`, `[세션에서 이어가기]` 유무는 `tileResolveFields`가 정한다, 살아 있는 대화는 Discord 링크가 없을 때만 버튼을 두고 클릭은 그 창 포커스다(알림 클래스·실패 행 목록 조항은 아래 후보가 supersede한다).
- `foreign_handoff`를 남는 `needs_human` 알림 클래스와 `[세션에서 이어가기]` 실패 행에 더하고, 그 행은 `[머지]`로 풀리지 않으며 `[워커로 이어가기]`를 그리지 않는다.
  - 되돌리기 어려움: `completion-intent.js` 분류·알림 맵, `notify.js` 다음 행동 문구, `tile-resolve.js` 행 종류, `pr-wait-row.js` `[머지]` 술어, `failure-sentences.js`, dotfiles `failure_classes.foreign_handoff.notify_label` 복사본이 함께 움직인다.
  - 맥락 없이 놀라움: 같은 PR 대기의 `needs_human` 행인데 머지 게이트 보류와 달리 `[머지]`가 출구가 아니다.
  - 실제 트레이드오프: 대상 저장소 배포·충돌을 rig Worker가 자동 처리하는 편의와, 대상의 deploy lock·post-merge 원장을 소유하지 않는 Worker가 손대지 않는 안전 사이의 선택이다.
  - 통합 판정: UI-9w5l(UI-jbl1의 후계)과 소비자 집합이 같다(알림 클래스·실패 행 출구). 그 목록 조항만 바꾸고 나머지는 승계한다.
  - `summary`: "실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 외부 PR 사람 처리 필요, 폐기 실패, 수동 배포 실패)은 공용 대화 자동 기동 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 실패당 한 번 자동으로 열고, 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일해 「🚨 사람 필요」를 없앤다; 외부 PR 사람 처리 필요 행은 [머지]로 풀리지 않고 [세션에서 이어가기]만 출구다; 수동 배포 실패는 「저장소 작업」 서랍의 [세션에서 이어가기]와 작업 식별자 키의 대화 레코드를 가지며 인계는 그 작업 1회 재실행이다; 조치 필요는 beads-ui 버튼으로 해결할 수 있는 대기 사유에만 서고 버튼 이름을 담은 해결 문장을 함께 실으며 선행 대기는 늘 normal이고 대기 사유 판정은 Discord로 알리지 않는다; 살아 있는 대화가 있는 행은 Discord 링크가 없을 때만 [세션에서 이어가기]를 그리고 그 클릭은 새로 띄우지 않고 그 대화 창을 앞으로 부른다" → ADR, supersede UI-9w5l
- 외부 PR을 Worker가 머지·마감한다 — 결정 자체는 ADR dotfiles/dotfiles-8k8yf가 기록했고 이 스펙은 소비 구현이다 → ADR 아님
- 외부 PR 대기 행도 직렬 레인을 점유한다 — 되돌리기 쉬움(점유 판정 한 곳) → ADR 아님
- 외부 PR `[폐기]`는 머지 전만 지원한다 — 되돌리기 쉬움(폐기 코디네이터 한 곳) → ADR 아님
- 대상 정보를 스캔 핀과 조작 시 핀 재판독으로 다룬다 — 구현 구조(기본 제외 목록) → ADR 아님
