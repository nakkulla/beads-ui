---
scope:
  - server/ws/worker-handlers.js
  - server/ws/mutation-handlers.js
  - server/ws/connection.js
  - server/worker/bd-metadata.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/pr-poller.js
  - server/worker/pr-actions.js
  - app/protocol.js
  - app/protocol.md
  - app/views/worker/pr-wait-row.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/worker/defer-dialog.js
  - app/views/detail-panel/index.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md
  - docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md
---

# 「보관 N」에서 [보류로 전환], 「보류 N」에서 [되살리기] (UI-0d9i)

Bead: UI-0d9i. 선행: dotfiles-mae0i(보류 상태 계약, 착지 `7d0902fcd`), dotfiles-49rio(배치 철회 범위 정정, §3.7). 기준 base:
beads-ui `996e28ad36f1a4d7b64625fefabd6000350a354c`, dotfiles origin/main
`f301fd04ff31433cbf500ea196cb45730284fdc4`.

## 1. 목표

[보관]은 PR을 머지 대기열에서만 빼는 표시라 이슈는 `resolved`로 남는다. 그래서 다른
설계의 범위 겹침 검사와 선행(`blocks`) 판정이 보관한 이슈를 계속 "진행 중"으로
읽는다(2026-10-06 UI-dbn6 사고, 손으로 `deferred`로 바꿔 해소). 이 스펙은 보관한
PR 행에 [보류로 전환]을 두어, 확인 한 번으로 이슈를 계약대로 `deferred`(더 이상
고려하지 않음)로 바꾸게 한다. 보류한 이슈는 Worker 탭 「보류 N」에서
[되살리기]로 되돌린다. [보관]의 의미는 바꾸지 않는다.

`deferred`의 뜻·전이·쓰는 주체는 dotfiles 계약이 정의하고 beads-ui는 그 소비자다
(ADR UI-u6ud-2). 이 스펙은 계약이 beads-ui에 맡긴 것 — 버튼 위치, 확인 문구,
보관 기록 처리, 화면 모양 — 만 정한다.

## 2. 검증된 전제

**계약(dotfiles origin/main)**
- `deferred`는 사용자 지시(대화형 요청 또는 beads-ui 버튼)만 쓴다; 출발은 `open` 또는 `pr_url` 있는 `resolved`; `bd defer <id> --reason '<사유>'`(`--until` 없음) 뒤 readback — `docs/contracts/workflow-contract.md:208`, `docs/contracts/workflow-state.yaml` `lifecycle.transitions.defer`
- 쓰기 전 같은 rig `blocks` 후행을 `bd dep list <id> --direction up --type blocks --json`으로 나열하고 간선마다 「끊기」를 기본 선택, 확인 한 번이 목록 전체의 답이며 다른 rig 후행은 확인하지 못했다고 알린다; 끊은 간선마다 notes에 `deferred-unblocked: <후행 ID>`를 덧붙인다 — `workflow-contract.md:208`
- PR·브랜치·worktree·metadata·notes·영수증은 보존한다 — 같은 곳, `workflow-state.yaml` `defer.preserves`
- 되살리기도 사용자 지시만; `pr_url`의 PR이 열려 있거나 머지됐으면 `resolved`, 아니면 `open`(`bd undefer`); PR 조회 실패는 쓰지 않고 오류; `deferred-unblocked:` 간선 복원은 제안만 하고 자동 복원하지 않는다 — `workflow-contract.md:208`, `workflow-state.yaml` `lifecycle.transitions.revive`
- [보관](`merge_shelved`)은 `deferred`와 자동 연동하지 않는다 — `workflow-contract.md:208` 마지막 문장
- 쓰기 전에 notes의 `lane_placed:` 배치를 `### Withdraw a placement`로 철회하고, 그 절차는 `POST /api/worker/queue/remove` 뒤 대상이 대기 레인과 `pr_wait`에 없음을 확인한다 — `workflow-contract.md:208`, dotfiles `src/shared/skills/flow/workflow/references/execution-worker-lane.md` `### Withdraw a placement` 2–3단계

**beads-ui 현재 동작**
- 보관 기록은 `merge_shelved: { bead_id: { at } }`이고, 보관된 Bead는 머지 대기열에 들어가지 않는다 — `server/worker/queue-store.js:717`, `:2514-2516`, `:5716-5724`
- 보관·해제 조작은 `handleWorkerMergeShelve`가 bd를 부르지 않고 큐만 쓴다 — `server/ws/worker-handlers.js:6363`
- 큐 제거(`store.remove`)는 `removeFromLanes`로 대기 레인·`pr_wait` 자리와 보관 기록을 함께 지운다 — `server/worker/queue-store.js:5602-5620`, `:8725-8752`
- PR 관측은 저장된 `pr_wait`를 계속 순회하고, PR이 MERGED면 완료 정리(`cleanupMerged`)로 넘긴다 — `server/worker/pr-poller.js:404-426`, `:735-739`; 완료 정리는 브랜치·worktree를 정리하고 Bead를 `closed`로 쓴 뒤 완료로 옮기며 `deferred`를 따로 보지 않는다 — `server/worker/pr-actions.js:1485-1487`, `:2345-2386`
- 세션이 전달한 바깥 PR 레지스트리는 `bd list` 행 중 `resolved`+`pr_url`만 다시 읽어 교체한다 — `server/worker/bd-metadata.js:794-827`(`scanRows`), `server/worker/attach.js:1887-1891`
- Bead 단위 잠금이 있다 — `server/worker/locks.js:79`
- 보관 기록은 Bead가 `closed`이고 PR 대기 행이 없을 때만 sweep이 지운다; sweep은 Bead 상태(`statuses`)를 읽는다 — `server/worker/scheduler.js:4986-4999`
- 대기 레인의 `deferred` Bead는 sweep이 이미 물린다 — `server/worker/scheduler.js:4950-4985`(`statuses[bead_id] !== 'deferred'`); PR 대기·완료는 순회하지 않는다 — ADR UI-jbl1(대기 레인 퇴장 조항)
- 「보관 N」 묶음은 `shelvedSectionTemplate`이 그리고 Worker·Monitor 두 탭이 같은 행 투영(`pr-wait-row.js`)을 쓴다 — `app/views/worker/lanes.js:5451`, `app/views/worker/index.js:2755-2760`, `app/views/monitor/index.js:1956-1960`, `app/views/worker/pr-wait-row.js:1160-1195`, `:1460`
- 「보류 N」은 Worker 탭에만 있고(후보 pane 아래 `<details class="worker-deferred">`), 보류 카드는 `candidateCard`의 `variant:'deferred'`이며 foot에 되살리기 조작이 없다 — `app/views/worker/index.js:2060-2090`, `app/views/worker/lanes.js:4836-4930`, `:5028-5046`
- 모니터에 보류 선반이 없는 것은 의도된 차이다 — `docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md:177`
- 이슈 상세의 상태 선택은 `update-status`로 `deferred`를 사유·후행 안내 없이 바로 쓴다 — `app/views/detail-panel/index.js:92-97`, `server/ws/mutation-handlers.js:28-34`, `:635-703`
- `bd defer`·`bd undefer`·`bd dep list --direction up --type blocks`를 부르는 서버 경로는 없다 — `grep -rn "'defer'\|'undefer'\|'--direction'" server --include='*.js'` 0건(테스트 제외)
- PR 상태 조회 `prDetail`이 있다 — `server/worker/gh.js:604`
- 카드 foot 슬롯 6에 새 버튼을 달려면 슬롯 표를 먼저 갱신한다 — `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:262`, `AGENTS.md` 워커·모니터 카드 배치 문법; 버튼은 `.op-btn` 부품으로만 그린다 — `docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md:125-145`, `docs/design-system.md`

## 3. 설계

### 3.1 [보류로 전환] 버튼 (보관 행)

- 결정: 「보관 N」 묶음의 행에만 둔다(대안: 모든 PR 대기 행. 이유: 보관된 행은 이미
  머지 대기열 밖이라 진행 중 머지와 충돌하지 않고, [머지] 옆에 되돌리기 어려운
  버튼이 붙지 않는다 — 사용자 결정 2026-10-07).
- Worker·Monitor 두 탭 모두 같은 행에 같은 버튼을 단다(공유 `pr-wait-row.js` +
  `miniRow`). 머지 관측·정리 단계 행에는 서지 않는다([보관]이 서지 않는 행과 같다).
- 버튼: `.op-btn` 부품, 라벨 `⏸ 보류로 전환`, foot 슬롯 6의 `보관 해제` 뒤.

### 3.2 보류 확인 대화상자

- 결정: Worker·Monitor가 공유하는 대화상자 모듈 하나(선례:
  `external-wait-takeover-dialog.js`). 열 때 서버에 미리보기를 요청한다.
- 내용:
  - 제목 `<ID> 보류로 전환 — 더 이상 고려하지 않음`
  - 사유 입력칸(필수, `bd defer --reason`에 그대로 들어간다).
  - 같은 rig `blocks` 후행 목록. 각 행에 「끊기」 체크(기본 선택), 닫힌 후행은 뺀다.
    후행이 없으면 목록 대신 `이 이슈를 기다리는 같은 저장소 이슈 없음`.
  - 고정 안내 두 줄: `다른 저장소의 후행은 확인하지 않았습니다.` /
    `PR·브랜치·worktree는 그대로 두고, 「보류 N」에서 되살릴 수 있습니다.`
  - 버튼 `[보류로 전환]`(확인) · `[취소]`.
- 미리보기 응답이 실패하면 대화상자는 오류를 보이고 확인 버튼을 끈다.

### 3.3 서버 조작 (새 WS op 두 쌍)

- 결정: 계약 절차를 갖춘 전용 op를 새로 둔다(대안: 기존 `update-status` 재사용.
  이유: 사유·후행 안내·출발 상태 검사가 없어 계약과 맞지 않는다). 예:
  `worker-bead-defer-preview` · `worker-bead-defer` · `worker-bead-revive-preview` ·
  `worker-bead-revive`. Monitor용 `root_dir` 대상 지정은 기존 다저장소 op와 같다.
- **defer-preview** `{bead_id}`: `bd show`로 상태·`pr_url`을 읽는다. 버튼은 보관 행에만
  있으므로 이 op의 출발 상태는 `pr_url` 있는 `resolved` 하나다(계약의 `open` 출발은
  이 버튼의 대상이 아니다). 아니면 거부한다. `bd dep list <id> --direction up
  --type blocks --json`으로 같은 rig 후행을 돌려준다.
- **defer** `{bead_id, reason, remove_edges[]}`: 같은 Bead의 보관·보관 해제·머지 대기열
  진입과 직렬화한 상태에서(예: 기존 Bead 단위 잠금) 다음을 다시 확인한다 — Bead가
  `pr_url` 있는 `resolved`이고, 보관 기록이 **지금도** 있고, 머지 대기열 항목·진행 중
  머지·머지 관측·정리 단계가 없다. 하나라도 어긋나면 쓰지 않고 이유(`not_shelved`·
  `merge_active` 등)를 돌려준다. 그다음 순서대로
  1. `bd defer <id> --reason '<reason>'` → `bd show` readback(`deferred`).
  2. `remove_edges`의 후행마다 간선 제거 → `--append-notes 'deferred-unblocked:
     <후행 ID>'` → readback.
  - 1의 **쓰기**가 실패하면 아무것도 바뀌지 않았다고 보고한다. 쓰기는 성공했는데
    readback이 실패하면 "적용 여부 확인 불가"로 보고하고, 무변경 실패로 표시하거나
    요청을 자동으로 다시 실행하지 않는다. 2의 일부가 실패하면 Bead는 보류된 채
    남고(남은 간선은 계약상 계속 막는다 — 안전한 기본값), 응답이 실패한 간선을
    나열한다.
- 결정: 보류된 Bead의 [보관 해제]는 서버가 거부한다(`deferred`). 보류 중 보관 기록이
  머지 대기열을 막는 유일한 장치이기 때문이다. 해제는 되살리기(§3.5)가 한다.
- **revive-preview** `{bead_id}`: 상태가 `deferred`인지 확인하고, notes의
  `deferred-unblocked:` 후행 중 닫히지 않은 것을 돌려준다. `pr_url`이 있으면 PR
  상태를 조회해 되살릴 목표(`resolved`/`open`)를 함께 돌려준다. PR 조회가 실패하면
  목표 없이 오류를 돌려준다.
- **revive** `{bead_id, restore_edges[]}`: 목표를 다시 판정해 `bd update --status
  resolved` 또는 `bd undefer` → readback. PR 조회 실패면 쓰지 않는다. 그다음
  `restore_edges`마다 `blocks` 간선을 다시 걸고 `bd dep list <후행> --json`으로
  readback한다. 이어서 §3.5 보관 해제.
- 쓰기는 기존 bd 쓰기 경로(`requireBdJsonCapabilityForWorkspace('write')`)를 지난다.

### 3.4 보류 중 PR 대기 행 처리

- 결정: PR 대기 행·정리 상태·보관 기록은 그대로 두고, Bead가 `deferred`인 행은
  PR 대기와 「보관 N」에서 숨긴다(대안: 대기열에서 제거, 보관 기록만 정리. 이유:
  되살리면 원래 행이 그대로 돌아오고, 보관 기록이 남아 있는 동안 머지 대기열이
  그 PR을 다시 잡지 않는다 — 사용자 결정 2026-10-07).
- 숨김은 서버 투영이 한다: PR 대기 행 투영이 Bead 상태가 `deferred`인 행을 뺀다.
  상태는 sweep이 이미 읽는 권위 있는 Bead 상태를 쓴다(예: 같은 sweep이 보관·대기
  행 Bead의 상태를 투영 재료로 남긴다). 상태를 모르면 숨기지 않는다(fail-quiet).
- 세션이 전달한 바깥 PR 행(overlay)은 레지스트리가 `resolved`+`pr_url`만 다시 읽으므로
  보류 동안 저절로 빠진다. 그 보관 기록은 되살릴 때 §3.5로 정리된다.
- 대기 레인의 Bead는 기존 sweep이 보류를 보고 물린다(변경 없음).
- 결정: 보류 중에는 그 PR 대기 행의 **완료 처리를 멈춘다**. PR 관측은 계속하지만, PR이
  바깥에서 MERGED가 돼도 완료 정리의 첫 부작용(브랜치·worktree 정리, `closed` 쓰기,
  완료 이동) 직전에 Bead 상태를 다시 읽어 `deferred`면 이번 관측에서 아무것도 하지
  않는다. 상태 읽기가 실패해도 이번 관측은 건너뛴다(다음 관측에 다시 본다).
  되살리면 Bead는 `resolved`(PR 머지됨)가 되고, 다음 관측이 기존 완료 경로를 그대로
  탄다. 보류는 사용자가 "고려하지 않음"으로 둔 상태라 그 동안 자동으로 닫지 않는다.

### 3.5 되살리기

- 결정: 「보류 N」의 보류 카드 foot(슬롯 6)에 `.op-btn` `↺ 되살리기`. Worker 탭에만
  있다(모니터에는 보류 선반이 없다 — 의도된 차이, 사용자 결정 2026-10-07).
  PR 대기에서 온 이슈뿐 아니라 「보류 N」의 모든 이슈에 선다.
- 확인 대화상자(§3.2와 같은 모듈의 되살리기 모드): 되살릴 목표
  (`resolved — PR 열림` / `resolved — PR 머지됨` / `open`), 복원할 간선 목록(기본
  선택, 닫힌 후행 제외), 보관 기록이 있으면 `보관도 해제되어 PR 대기로 돌아갑니다`.
  PR 조회 실패면 오류를 보이고 확인을 끈다.
- 결정: 되살리기가 성공하면 그 Bead의 보관 기록도 지운다(사용자 결정 2026-10-07).
  PR은 보관 전처럼 일반 PR 대기 행이 되고, 머지는 기존 자동 머지 스위치 규칙을
  따른다. 보관 기록 삭제가 실패해도 되살리기는 성공으로 보고하고 [보관 해제]가 남는다.
- 되살린 이슈를 대기열에 자동으로 다시 넣지 않는다(ADR UI-jbl1: 다시 `open`이 돼도
  자동 재배치 없음).

### 3.6 이슈 상세의 상태 선택

- 결정: 상세 패널 상태 선택과 `update-status`는 `deferred`로 들어가거나 거기서 나오는
  전이를 더 이상 직접 쓰지 않는다. 서버는 그 요청을 거부하고(`use_defer_dialog`),
  선택 목록은 `deferred`가 아닌 이슈에서 `deferred`를 빼며, 보류된 이슈에서는
  선택을 끄고 `보류 전환·되살리기는 Worker 탭에서` 안내를 보인다. 계약의 쓰기
  경로를 하나로 모은다(대안: 상세에도 같은 대화상자. 이유: 범위가 커지고 보류 정리는
  Worker 탭이 담당한다는 기존 구분과 맞다).

### 3.7 계약 정정 선행 (dotfiles-49rio)

- 계약은 `lane_placed:` 배치를 deferred 쓰기 전에 철회하라고 하고, 그 절차의 큐 제거는
  PR 대기 자리와 보관 기록까지 지운다. 이것은 §3.4의 보존 결정(사용자 결정
  2026-10-07)과 충돌한다. 사용자 결정(2026-10-07)으로 계약을 고친다: `pr_url` 있는
  `resolved` 출발은 큐 제거를 부르지 않고 PR 대기 자리를 보존하며, 철회는 `open`
  출발에만 적용한다. 이 정정은 dotfiles quick_fix Bead dotfiles-49rio가 하고,
  UI-0d9i는 그 Bead에 `blocks`로 묶여 구현 진입 전에 착지를 기다린다.
- 정정 뒤 이 버튼(출발이 `resolved`+`pr_url`뿐)은 배치 철회를 하지 않는다. 대기 레인
  자리가 남아 있으면 기존 sweep이 보류를 보고 물린다.

### 3.8 스펙·디자인 문서 갱신 (같은 구현 PR)

- 카드 문법 §5.1 슬롯 6: 보관 행 `⏸ 보류로 전환`, 보류 카드 `↺ 되살리기`.
- 조작 표면 §3.2 표: 두 버튼 행.
- 모니터·Worker 동일성 §9: 기존 「보류 선반 — Worker만」 행 비고에 "되살리기 포함;
  [보류로 전환]은 두 탭 공통" 추가.

## 4. 오류 처리

- 출발 상태가 아니면(`open`, `in_progress`, `pr_url` 없는 `resolved`, 이미 `deferred`) 미리보기·
  쓰기 모두 거부하고 이유를 토스트로 보인다.
- 다른 세션이 그 사이 상태를 바꿨으면 쓰기 전 재확인이 거부한다.
- bd 쓰기 실패는 그 단계에서 멈추고, 이미 쓴 단계와 실패 단계를 응답에 담는다.

## 5. 수용 기준

1. 보관 행에 [보류로 전환]이 두 탭에서 같은 자리에 서고, 보관되지 않은 PR 대기 행과
   머지 관측·정리 행에는 서지 않는다.
2. 확인하면 Bead가 `deferred`가 되고 사유가 notes에 남으며, 선택한 간선이 끊기고
   `deferred-unblocked:` 줄이 남는다. 선택 해제한 간선은 그대로다.
3. 보류된 Bead의 PR 대기 행은 PR 대기·「보관 N」에서 사라지고 Worker 「보류 N」에 보인다.
   PR·브랜치·worktree·보관 기록은 남는다.
4. [되살리기]는 PR이 열림·머지면 `resolved`, 아니면 `open`으로 쓰고, PR 조회 실패면
   아무것도 쓰지 않는다. 선택한 간선이 복원되고, 보관 기록이 지워져 PR 대기 행이
   돌아온다.
5. 상세 패널에서 `deferred`로 들어가거나 나오는 상태 변경은 거부된다.
6. 카드 동일성 테스트가 통과한다(되살리기는 §9 의도된 차이 안).
7. 대화상자를 연 뒤 다른 탭에서 보관을 해제했으면 [보류로 전환]은 쓰지 않고
   `not_shelved`로 거부된다. 보류된 Bead의 [보관 해제]는 거부된다.
8. 보류 중 PR이 바깥에서 머지돼도 브랜치·worktree·Bead 상태가 그대로이고, 되살린 뒤
   다음 관측에서 기존 완료 처리가 실행된다.
9. `bd defer` 쓰기 성공 뒤 readback만 실패하면 "적용 여부 확인 불가"로 보고된다.

## 6. 테스트

- 서버: `server/ws.worker-queue.test.js` 또는 새 핸들러 테스트 — 출발 상태 거부, defer
  순서와 부분 실패, revive 목표 판정(열림·머지·닫힘·`pr_url` 없음·조회 실패), 간선
  복원 readback, 되살린 뒤 보관 기록 삭제; 재확인 거부(`not_shelved`·`merge_active`),
  보류 중 보관 해제 거부, readback 실패 보고;
  `server/worker/pr-poller.test.js`·`server/worker/pr-actions.test.js` — 보류 중 MERGED는
  정리·`closed` 없음, 되살린 뒤 완료, 상태 읽기 실패 시 이번 관측 건너뜀; `server/ws/worker-handlers.workspace-target.test.js`
  — Monitor `root_dir` 대상; `update-status`의 `deferred` 거부.
- 투영: `deferred` Bead의 PR 대기 행 숨김, 상태 미상이면 표시.
- 프런트: `app/views/worker/lanes.test.js`(버튼 위치·`.op-btn`), 대화상자 모듈 테스트
  (기본 선택·후행 0건·오류 시 확인 끔), `app/views/monitor/card-parity.test.js`,
  `app/styles.design-system.test.js`(부품·390px 폭 넘침).

## 7. 대안

- [보관]과 `deferred` 자동 연동 — 나중에 머지할 PR까지 검사에서 빠져 기각(계약도 금지).
- 보류 시 PR 대기 행 제거 — 되살리면 정리 상태 등 기존 기록 없이 새로 잡혀 기각.

## 8. 비목표

- 모니터 보류 선반, 상세 패널의 보류 대화상자, 다른 rig 후행 조회, `--until`.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — `deferred` 계약을 런타임에 읽지 않고 출발 상태·되살리기 목표 규칙을 코드에 복제하며, 계약 쪽 변경은 계약에서 먼저 바꾼다.
- 전제: ADR UI-jbl1 — 대기 레인의 `deferred` 퇴장과 "다시 `open`이 돼도 자동 재배치 없음"을 그대로 따른다.
- 보관 행 [보류로 전환]·보류 카드 [되살리기] 버튼과 대화상자 — UI 레이아웃·표시 형식(기본 제외 목록) → ADR 아님
- 보류 중 PR 대기 행 보존·숨김과 되살릴 때 보관 기록 삭제 — 되돌리기 쉬움: 투영 필터 하나와 되살리기 op의 한 단계이고 저장 형식이 바뀌지 않는다 → ADR 아님
- 상세 상태 선택의 `deferred` 전이 차단 — 되돌리기 쉬움: 허용 집합과 선택 목록 두 곳 → ADR 아님
- 보류 중 PR 대기 행의 완료 처리 정지와 보류 Bead의 보관 해제 거부 — 되돌리기 쉬움: 완료 경로의 상태 확인 하나와 보관 해제 op의 거부 조건 하나 → ADR 아님

## 경계·후속

- 크로스 리포 unit: dotfiles — `deferred` 전환의 `lane_placed:` 철회를 `open` 출발로 한정하고 `resolved`+`pr_url`의 PR 대기 자리를 보존하도록 계약·상태 정의·세션 절차를 정정; quick_fix Bead dotfiles-49rio(UI-0d9i가 `blocks`로 기다림)
