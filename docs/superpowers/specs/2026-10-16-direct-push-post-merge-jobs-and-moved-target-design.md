---
scope:
  - server/worker/quickfix-landing.js
  - server/worker/quickfix-landing.test.js
  - server/worker/pr-actions.js
  - server/worker/pr-actions.test.js
  - server/worker/post-merge-job
  - server/worker/repo-operation-coordinator.js
  - server/worker/repo-operation-coordinator.test.js
  - server/worker/queue-store.js
  - server/worker/queue-store.test.js
  - server/worker/scheduler.js
  - app/views/worker/lanes.js
  - server/e2e/worker-flow.test.js
  - docs/adr/
---

# 직접 push 착지도 머지 후 잡을 돌리고, 앞선 배포 트리에서 원래 행이 잡을 끝낸다

작성일: 2026-10-16 · Bead: `UI-1eag` · 상태: 승인 전 설계

## 1. 목적과 배경

2026-10-16 dotfiles-gqsok(PR #607)의 정리가 `post_merge_job_target_moved:dotfiles-79429-retire-discord.py@32aa369e…`에서
멈춰 직렬 레인 s1과 뒤의 5건을 막고 있다. 원인은 두 결함이 겹친 것이다.

- **(a) 직접 push 착지에 잡 단계가 없다.** Worker quick_fix 착지 정산은 `base_containment → repo_operations →
  branch_cleanup → parent_close`이고 `post_merge_jobs`가 없다. 그래서 ptx3h·79429가 커밋한 잡은 다음 PR 행(gqsok)이
  떠안았다. 머지 후 결함의 자동 인계는 quick_fix 수리 Bead로 가므로(ADR UI-5chz) 수리본(41zm2의
  `79429@604204c3`, `repo-ops-replaces` 선언 포함)도 이 경로로 착지했고, 실행될 행이 없었다. 이것은 우연이 아니라
  구조적인 공백이다.
- **(b) 원래 행은 앞으로 이동한 배포 트리에서 잡을 돌리지 못한다.** gqsok 재시도는 자기 머지 SHA 6a59ee4 트리에서
  잡을 찾아 그 SHA로 정렬한다. 그런데 배포 워크트리는 41zm2 배포로 이미 c50e34c에 있고, 되감기 금지 때문에 매번
  거부된다. (a)만 고치면 지금의 gqsok은 풀리지 않는다. dotfiles s2 레인·머지 큐·실행 중 작업이 모두 비어 있어 "다음
  착지가 대신 돌린다"는 출구도 당장 생기지 않는다.

목표는 두 가지다. 직접 push 착지 행도 자기 머지 후 잡을 정확히 한 번 실행·기록한다. 그리고 원래 행 재시도는
앞선 배포 트리에서 승계 잡과 남은 잡을 실행해 옛 키를 `superseded`로 닫은 뒤 정리를 끝낸다. 이 Bead 배포 뒤
gqsok `[정리 재시도]` 한 번으로 Discord 수정본과 ptx3h oracle 잡이 순서대로 돌고 레인이 풀려야 한다.

이 저장소는 소비자다(ADR UI-u6ud-2). §3.2의 실행 위치 규칙은 dotfiles 정본 문구를 넓혀야 하므로 dotfiles
quick_fix(§7)가 구현 진입 전 선행이다.

## 2. 검증된 전제

pinned base: beads-ui `origin/main` 03d9ca42(인용 파일은 8de2aa19와 같음), dotfiles `origin/main` c50e34cd.

- Worker quick_fix 착지 정산의 단계는 넷이고 `post_merge_jobs`가 없다 — server/worker/quickfix-landing.js:1136, :1247, :1346, :1367
- 착지 단계 이름표·durable 커서 어휘에도 없다 — server/worker/quickfix-landing.js:63-69, server/worker/queue-store.js:3632-3638, :3648-3660(모르는 커서는 null로 읽음)
- `quickFixLanded`가 착지 완료로 보는 커서는 `repo_operations`·`branch_cleanup`·`parent_close`다 — app/views/worker/lanes.js:666-677
- PR 정리 커서는 `repo_operations` 뒤에 `post_merge_jobs`를 둔다 — server/worker/pr-actions.js:119-125
- 잡 목록은 행의 머지 SHA 트리에서 읽고 디렉터리 전체를 실행 전에 판정한다 — server/worker/pr-actions.js:2236-2313
- 실행 target은 언제나 행의 머지 SHA다 — server/worker/pr-actions.js:2597-2604
- 배포 워크트리 HEAD가 target과 다르면 HEAD가 target의 엄격한 조상일 때만 정렬하고, 나머지는 `post_merge_job_target_moved`로 거부한다 — server/worker/repo-operation-coordinator.js:2458-2472, :2487-2493
- 정렬 거부는 기록 전이라 원장이 그대로 남고, 실행 전 실패(`started` 없음)는 사람 권한 없이 다시 기록된다 — server/worker/repo-operation-coordinator.js:2503-2509, :2560-2566, server/worker/pr-actions.js:2571-2595
- 수정본 entry(`replaces`)는 이전 intent를 조정해 실패면 예약하고, 성공이면 `superseded`로 확정하며, 원래 행은 유효한 `superseded`를 충족으로 본다 — server/worker/pr-actions.js:2412-2438, :2488-2539, :2367-2393
- 새 키의 첫 claim은 키가 없을 때만 성공한다(동시 두 행 중복 실행 방지) — server/worker/queue-store.js:8762-8781
- 결과 미상 잡 재실행 권한은 사람 재시도에서만 온다(PR 행) — server/worker/pr-actions.js:2715-2721, :2814-2821
- quick_fix 착지 실패 사유 중 세션 계열이 아닌 것은 모두 정산 재실행(`settlement`)으로 분류된다 — app/utils/quickfix-resume-kind.js:34-44, :75-91; 그 재실행은 `worker-attempt-resume`에서 `settleQuickfixLanding`으로 간다 — server/ws/connection.js:683, server/worker/scheduler.js:14148-14153, :14226-14243
- 현재 ADR이 머지 후 결함 자동 인계를 quick_fix 수리 Bead로 하고, 잡 원장·`replaces` 승계·CAS 확정을 승계한다 — docs/adr/UI-5chz-conversation-answer-wait-thread-only.md:886-887
- 정본은 러너를 Worker 정리 커서의 `repo_operations`와 `branch_cleanup` 사이 상시 단계로 두고, 머지 SHA 트리를 읽는다 — dotfiles docs/contracts/workflow-state.yaml:712-717
- 정본은 수정본을 수정 PR 자신의 정리 단계에서 실행하고, 원래 행은 검증된 승계만 따른다 — dotfiles docs/contracts/workflow-state.yaml:763, docs/contracts/workflow-contract.md:268, docs/superpowers/specs/2026-09-15-post-merge-job-repair-succession-design.md §4
- 실측 상태(`~/.local/state/bdui/dotfiles-fdf036ac32f8/queue.json`을 python으로 읽음): `dotfiles-79429-retire-discord.py@32aa369e`가 `intent`이고 그 operation f07f5e1f는 `failed`(`script_failed`, target 6a59ee4)다. `@604204c3`과 `dotfiles-ptx3h-retire-oracle.py@6d045412`의 원장 키는 없다. 41zm2 배포 7c96a5b2는 c50e34c에서 `succeeded`다. 세 착지 행은 `done`에 `merge_sha: null`이다. gqsok `cleanup_failed`는 `post_merge_jobs`/`post_merge_job_target_moved:…@32aa369e…`다.
- 세 착지는 Worker 디스패치 quick_fix였다(Bead별 `events.jsonl`에 `landing_step` 4개, `impl_review` 있음) — `bd show <id> --json`과 `~/.local/state/bdui/dotfiles-fdf036ac32f8/beads/<id>/events.jsonl`로 확인
- dotfiles c50e34c 트리에는 `79429@604204c3`(첫 줄 다음에 `# repo-ops-replaces: …@32aa369e…`)와 `ptx3h@6d045412`가 있다 — `git ls-tree origin/main -- repo-ops/post-merge.d/`

## 3. 설계

### 3.1 직접 push 착지의 `post_merge_jobs` 단계 — (a)

- Worker quick_fix 착지 정산은 `base_containment → repo_operations → post_merge_jobs → branch_cleanup → parent_close`다.
  잡 단계의 머지 SHA는 영수증에 결속된 착지 head(`quickfix_landing.head_sha`, 배포 단계와 같은 SHA)다. `done` 행에
  `merge_sha`를 새로 쓰지 않는다.
- 결정: 잡 판정·실행은 PR 정리와 같은 구현 하나를 쓴다(대안: quick_fix 전용 복제; 이유: 원장·예약·승계·재채택
  규칙이 두 벌이면 어긋난다). 예: `runPostMergeJobs`를 행 종류와 무관한 모듈로 옮기고 두 정산이 머지 SHA·권한·결과
  콜백만 넘긴다.
- 실패는 PR 행과 같은 사유 토큰으로 `post_merge_jobs` 단계에 기록한다. 진행 중(pending)은 배포 단계의 pending과
  같은 처리(`repo_operation_pending`)다. 이 사유들은 이미 `settlement` 계열이라 분류표는 바꾸지 않는다.
- 결과 미상 잡 재실행 권한(`job_retry`)은 사람 조작(`worker-attempt-resume` 클릭)과 같은 행 실패 대화의 `인계`에서만
  온다. 재시도 사다리·공급자 자동 재개·부팅 재개는 권한을 싣지 않는다. PR 행의 `retryCleanupLocked`와 같은 경계다.
- 정산 재실행은 멱등이다. 앞 단계(포함 확인·배포)는 다시 지나도 같은 결과이고, 잡은 원장이 1회성을 지킨다.
  durable 커서 어휘·이름표·`quickFixLanded`에 `post_merge_jobs`를 더한다.
- 외부(foreign) 착지는 바꾸지 않는다. rig Worker는 대상 저장소의 원장을 소유하지 않는다.

### 3.2 앞선 배포 트리에서의 잡 해석 — (b)

모든 잡 단계(PR 정리, quick_fix 착지, 첫 실행과 재시도 모두)에 적용한다. M은 행의 머지 SHA, H는 공유 배포
워크트리 HEAD다.

- H가 없거나 M과 같거나 M의 조상이면 지금과 같다(M으로 정렬해 M에서 실행).
- H가 M의 엄격한 후손이고 새로 받은 target base에 포함되면, M 트리의 각 잡 이름 n(사전순)을 H 트리에서 해석한다.
  - H의 n이 같은 blob이면 그 키를 H에서 실행한다.
  - H의 n이 다른 blob이고 그 첫 32줄의 선언이 정확히 M의 키를 대체하면, 그 수정본 키를 H에서 기존 예약·승계
    경로로 실행한다. 선언 검사는 M 트리 항목과 같은 엄격함이다.
  - 그 밖(H에 없음, 선언 없는 다른 blob, 다른 키를 가리키는 선언, 일반 파일이 아님)은 지금처럼
    `post_merge_job_target_moved:<M의 키>`로 멈춘다.
- H가 M과 무관하거나(서로 조상이 아님) base에 포함되지 않으면 지금처럼 거부한다.
- 원장 판정이 해석보다 먼저다. M 키가 `applied`이거나 유효한 `superseded`면 건너뛰고, `repair` 예약이 있으면 그
  수정본 operation을 조정한다(지금과 같음). 해석은 실행이 필요할 때만 한다.
- 실행 권한은 target만 바뀌고 규칙은 그대로다. 같은 blob 재실행은 지금의 재시도 규칙을 따른다(결과 미상은 사람
  권한, 실행 전 실패는 자동). 수정본 실행은 지금처럼 이전 operation의 실패 종료만 확인해 예약한다.
- H는 판정용 관측이다. 권위는 실행 직전 정렬이다. target H의 정렬은 이동이 없고, 정확한 HEAD 확인과 spawn은 잠금
  안에서 지금처럼 한다. prepare와 launch 사이에 H가 움직이면 launch가 `target_moved`로 거부한다. 그 기록은 실행 전
  실패라 다음 판정이 새 H로 다시 해석한다.
- 지키는 불변식: 되감기 없음, 정확한 target, 후손 커버를 실행 증거로 쓰지 않음(실제로 실행한다), 키당 1회, 예약 뒤
  옛 blob 미실행, 실패 operation·로그 보존.
- 안전 근거: 실행 입력은 H 자신의 착지가 잡 단계를 돌렸을 때와 같다(같은 SHA, 같은 blob). 늦은 행이 앞선 트리에서
  남은 잡을 집어 실행하는 것은 이미 허용된 출구다(2026-09-01 러너 스펙 §2). 바뀌는 것은 어느 행이 실행을
  일으키느냐뿐이다.

### 3.3 떠안은 잡의 소유와 1회성 — (c)

새 원장 필드는 없다. 키를 먼저 claim한 행의 operation이 실행을 소유한다(`subjects`의 bead). 첫 claim은 키가 없을
때만 성공하므로 두 행이 같은 키를 동시에 실행하지 않는다. 앞선 착지가 남긴 키는 그 착지의 단계(§3.1 이후)가
먼저 가져가고, 놓친 키는 그 이름을 트리에 가진 뒤 행이 가져간다.

### 3.4 기존 상태의 처리

- 마이그레이션은 없다. `merge_sha: null`로 끝난 `done` 행은 다시 열지 않는다. 그 행들의 잡 키는 원장에서 내용
  주소로 남아 있으므로 §3.2가 뒤 행에서 처리한다.
- 배포 뒤 gqsok `[정리 재시도]` 한 번은 이렇게 흘러야 한다(M=6a59ee4, H=c50e34c 또는 그 뒤 배포 SHA).
  1. `79429@32aa369e`는 `intent`이고 operation은 실패로 끝났다. H의 `79429@604204c3`이 이 키를 대체하므로 예약
     CAS 뒤 H에서 실행하고, 성공하면 옛 키는 `superseded`, 새 키는 `applied`가 된다.
  2. `ptx3h@6d045412`는 키가 없고 H에서 같은 blob이므로 H에서 실행해 `applied`가 된다.
  3. 정리는 `branch_cleanup → parent_close`로 이어져 레인이 풀린다.
- 이 재시도는 사용자가 이미 정한 조치(결함 수정 뒤 gqsok 재시도)다. 이 Bead의 배포를 확인한 세션이 보내고 결과를
  readback한다.

## 4. 경계·결정

- 결정: 공유 배포 워크트리를 옛 SHA로 되감지 않는다 — 옛 트리 배포가 부수효과로 생긴다(러너 스펙 §2).
- 결정: 원래 행의 머지 SHA·실패 operation·로그는 바꾸지 않는다 — 실패 이력이 감사 근거다(승계 스펙 §3).
- 결정: 새 버튼·새 상태·임의 스크립트 API·원장 필드를 더하지 않는다 — 기존 `[정리 재시도]`와 원장으로 충분하다.
- 비목표: 세션 소유 quick_fix 착지(Worker 행 없음)는 여전히 잡을 돌리지 않고 다음 Worker 행에 맡긴다. 그 뒤 행의
  처리는 §3.2로 견고해진다. 정책 사본 v3 사다리, 카드 문법, 알림 문구는 바꾸지 않는다.

## 5. 검증과 완료 조건

- quick_fix 착지:
  - `post-merge.d`가 없으면 no-op이고 단계가 다섯이다.
  - 대기 잡은 착지 head에서 실행돼 `applied`가 된다.
  - 실패는 `post_merge_jobs`/같은 토큰으로 기록되고, `settlement` 재실행이 멱등이다.
  - `job_retry`는 사람 재개에서만 실린다.
  - 외부 착지는 잡을 실행하지 않는다.
  - 커서 `post_merge_jobs`가 디스크 왕복에서 보존된다.
- 앞선 트리 해석:
  - H=M, H가 M의 조상, H가 M의 후손에서 같은 blob, 수정본 대체, H에 없음, 선언 없는 다른 blob, 다른 키 선언,
    H가 M과 무관, H가 base 밖인 경우를 각각 검증한다.
  - prepare·launch 사이에 H가 움직이면 실행 전 실패 뒤 재해석된다.
  - 거부된 경우에는 spawn이 0회이고 원장이 변하지 않는다.
- 재현 회귀(실측 형태): K1 `intent` + 실패한 `started` operation(target M), H 트리의 `79429@604204c3`·
  `ptx3h@6d045412`, M 트리의 `79429@32aa369e`·`ptx3h@6d045412`, 세 착지 행 `merge_sha: null`. 사람 재시도 한 번으로
  다음을 확인한다.
  - K1이 `superseded`가 되고, 수정본 키와 ptx3h 키가 `applied`가 된다.
  - 옛 blob spawn은 0회이고, f07f5e1f의 failed·exit·로그가 그대로다.
  - 커서가 `post_merge_jobs`를 지나 close까지 간다.
- 관련 WS·retention·Worker 흐름 테스트를 포함한다.
- Pre-Handoff Validation: 새 워크트리 Node engine 확인과 `npm ci`, `npm run tsc`, `npm run lint`, 변경 파일
  Prettier, `npx vitest run --reporter=dot`(120초).
- 완료는 공유 서비스 배포 SHA·프로세스 경로·포트·HTTP 응답 확인과 §3.4 gqsok 재시도 결과 readback(원장 세 키,
  gqsok 행 close)까지다.

## 6. 구현 unit 후보

- unit A: 잡 러너 공유화와 §3.2 해석 — scope anchor `server/worker/pr-actions.js`·`server/worker/repo-operation-coordinator.js`
- unit B: quick_fix 착지 단계와 권한 — scope anchor `server/worker/quickfix-landing.js`·`server/worker/scheduler.js`

## 7. 경계·후속

- 크로스 리포 unit: dotfiles — `workflow-contract.md`의 일회성 잡 문단과 `workflow-state.yaml
  repo_operations.post_merge_jobs`에 두 조항을 더하고 체커·계약 테스트를 옮기는 quick_fix Bead dotfiles-nsvwk.
  dotfiles Worker 병렬 레인에 배치되어 있다. (1) Worker 직접 push 착지의 머지 SHA는 영수증에 결속된 착지 head이고, 그 정산은 같은 단계를 지난다.
  (2) 배포 워크트리 HEAD가 행의 머지 SHA를 엄격히 앞서고 base에 포함되면, 행은 자기 잡 이름을 그 HEAD 트리에서
  해석한다. 같은 blob은 그대로, 그 키를 대체 선언한 수정본은 기존 예약·승계로 HEAD에서 실행하고, 그 밖은 멈춘다.
  `runner.source`와 `corrective_succession.original_cleanup`의 기계 어휘도 함께 갱신한다. UI-1eag 구현 진입 전
  선행(`blocks`)이다.
- 관찰: 세션 소유 quick_fix 착지는 잡을 돌리지 않는다 — 정본의 러너 소유자가 Worker 정리 커서라서 결함이 아니고,
  §3.2가 뒤 행의 처리를 견고하게 한다.
- 관찰: 외부 quick_fix push 착지는 `[deploy]` 선언만 보고 `post-merge.d`는 보지 않는다 — 정본의 push 토큰이
  `deploy_declared` 하나라 정본과 어긋나지 않는다.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 실행 위치 규칙은 dotfiles 정본 조항(§7)이 정하고, 이 저장소는 그 소비 구현이다.
- 전제: ADR UI-u6ud-5 — 잡은 배포와 같은 durable operation 봉투·잠금·워크트리를 쓴다.
- 직접 push 착지도 같은 머지 후 잡 단계를 지나고, 배포 워크트리가 행의 머지 SHA를 앞서면 행은 잡 이름을 그 HEAD
  트리에서 해석해 같은 blob 또는 그 키를 대체 선언한 수정본을 HEAD에서 실행한다.
  - 되돌리기 어려움: durable `quickfix_landing.cursor` 어휘, PR·quick_fix 두 정산의 공유 러너, 코디네이터 잡
    target 판정, dotfiles 정본 조항과 체커가 함께 움직인다.
  - 맥락 없이 놀라움: 원래 행이 자기 머지 SHA가 아닌 트리에서 잡을 실행하고, 다른 Bead가 착지시킨 수정본도
    실행한다.
  - 실제 대안: 옛 SHA로 되감기(옛 트리 배포 부수효과라 기각), `done` 행 일괄 재정산(착지 SHA가 행에 없고 닫힌
    Bead에 실패를 둘 곳이 없어 기각), (a)만 고치기(지금 gqsok이 풀리지 않아 기각, 사용자 2026-10-16).
  - 통합: ADR UI-5chz가 잡 원장·`replaces` 승계·CAS 확정과 머지 후 결함 인계 조항을 갖고, 소비자(`pr-actions.js`
    정리, `queue-store.js` 원장)를 공유하므로 새 주제가 아니다.
  - `summary`: "Worker 직접 push 착지도 영수증 결속 착지 head에서 repo_operations와 branch_cleanup 사이의 같은 머지 후 잡 단계를 지나고, 공유 배포 워크트리 HEAD가 행의 머지 SHA를 엄격히 앞서며 base에 포함되면 행은 자기 잡 이름을 그 HEAD 트리에서 해석해 같은 blob 또는 그 키를 대체 선언한 수정본을 기존 예약·승계로 HEAD에서 실행하고 그 밖은 target_moved로 멈춘다 — 되감기 금지·정확한 target·키당 1회와 UI-5chz의 나머지 조항은 그대로다" → ADR, supersede UI-5chz
- 떠안은 잡의 소유는 첫 claim CAS와 operation `subjects`로 정한다 — 기존 원장 결정의 적용이라 되돌리기 어려움이 없다 → ADR 아님
