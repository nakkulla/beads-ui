---
scope:
  - server/worker/pr-actions.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/queue-store.js
  - server/worker/completion-intent.js
  - server/worker/operation-recovery.js
  - server/ws/worker-handlers.js
  - app/views/worker/pr-wait-row.js
  - app/views/worker/repo-ops-timeline.js
  - app/views/worker/pr-wait-progress.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/utils/failure-sentences.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 정리 재시도는 멈춘 저장소 작업을 한 번 다시 실행한다 — 배포·검증 재실행과 `[정리 재시도]` 이름

Bead: UI-btsr · 출처: dotfiles-3hflz(PR nakkulla/dotfiles#586) 머지 후 배포 실패

## 1. 목표

2026-10-12 사고: 볼트 접근 허가 부족으로 배포가 실패했다(04:39). 사람이 07:01에 허가한 뒤 해결 세션이 두 번 인계했고(07:02·07:51), 그 뒤에도 배포는 한 번도 다시 돌지 않았다. 카드는 「정리 5단계 중 2단계에서 멈춤 · 배포 실패」로 남았다.

2026-10-12 사용자 결정:

- (가) 머지된 카드에서 정리가 멈춘 행의 Worker 버튼 이름은 `[정리 재시도]`다. 진단 입구 `[세션에서 이어가기]`는 그 바로 앞에 그대로 둔다(3.5).
- (나) "사람 재시도 = 멈춘 작업을 한 번 다시 실행"은 저장소 작업 단계의 배포와 머지 후 검증 둘 다에 적용한다(3.1–3.3).

수용 기준:

- 외부 원인(허가·자격 증명·환경)을 고친 뒤에는 `[정리 재시도]` 클릭 한 번이나 해결 세션 인계 한 번으로 충분하다. 실패한 배포·검증이 새 실행으로 한 번 돌고, 성공하면 남은 정리(post-merge 잡 → 브랜치 정리 → 닫기)를 이어 Bead가 닫힌다.
- 같은 실패에 클릭이 겹치거나 실행 중 서버가 재시작돼도 새 실행은 하나다.
- 사람 권한이 없는 경로(부팅 재개, 코디네이터 재실행, 관측형 자동 재시도)는 지금처럼 실패 기록을 다시 열지 않는다.

## 2. 검증된 전제

기준: beads-ui `001e08bf64ace6d2d7d9aa2496d2188dfc27ce23`, dotfiles 작업 트리(2026-10-12).

- 정리 단계와 closure 절반 — `server/worker/pr-actions.js:119-125`, `:136-138`
- 사람 재시도 진입이다. closure 단계 실패만 `closeCoveredRow(…, true, true)`로 사람 권한을 넘기고, `repo_operations` 실패는 권한 없이 `runCleanup`으로 다시 들어간다 — `server/worker/pr-actions.js:4731-4747`
- 이 진입의 호출자는 `[정리]` 클릭과 이미 머지된 PR의 `[머지]` 클릭이다 — `server/worker/pr-actions.js:2715-2716`, `:4010`
- 실패 대화 인계(cleanup 종류)도 같은 `retryCleanup`을 부른다 — `server/worker/scheduler.js:10234`
- 정리 경로의 배포 호출은 막 fetch한 base tip(`synced.sha`)을 대상으로 준다 — `server/worker/pr-actions.js:3171-3175`
- 정리 경로의 검증 호출 — `server/worker/pr-actions.js:3127`
- 자동 배포 식별자는 repo·base·target·이전 성공 base·스크립트만으로 해시한다. 수동 실행만 `manual_run_id`를 더한다 — `server/worker/repo-operation-coordinator.js:190-208`, `:2063-2073`
- 그 식별자의 기록이 `queued`가 아니면 실행 없이 채택한다(failed 포함) — `server/worker/repo-operation-coordinator.js:2120-2126`
- 자동 배포는 정책·스크립트를 마지막 성공 배포 base에서 읽고, tip에서 읽는 것은 수동 경로뿐이다 — `server/worker/repo-operation-coordinator.js:2010-2023`
- 검증 식별자도 입력 해시이고, 기존 기록은 채택한다 — `server/worker/repo-operation-coordinator.js:219-240`, `:1536-1548`
- 결과 판정은 그 기록이 실패여도, 같은 base의 성공 배포가 머지를 덮으면 성공으로 본다 — `server/worker/repo-operation-coordinator.js:3270-3328`
- 부팅 재개는 정리 실패 기록이 없는 행만 잇고, 정확 조회는 같은 주체의 가장 오래된 기록을 고른다 — `server/worker/pr-actions.js:4627-4632`, `:4656-4663`, `server/worker/repo-operation-coordinator.js:3236-3245`
- `script_retry`는 `retry === null`인 running 기록에 한 번 걸린다 — `server/worker/repo-operation-coordinator.js:815-829`, `server/worker/resolution-ladder.js:259-264`, `:293-301`
- 기록 대체 표시 `superseded_by`가 있고 서랍·진행 표시가 그것을 읽는다 — `server/worker/queue-store.js:8474-8481`, `app/views/worker/repo-ops-timeline.js:218`, `app/views/worker/pr-wait-progress.js:52`
- 인계 한 번 규칙의 정체성은 `cleanup:<step>:<at>`이다 — `server/worker/resolve-session.js:583-587`, `server/worker/scheduler.js:10153-10175`
- 머지된 정리 실패 행의 버튼 라벨과, 지금 지켜지지 않는 툴팁 약속("배포를 다시 돌린 뒤 저장소 작업부터 정리를 잇습니다") — `app/views/worker/pr-wait-row.js:1349-1352`, `:1371`
- 같은 클릭을 가리키는 다른 문구 — `app/views/worker/pr-wait-row.js:599`, `app/views/worker/pr-wait-progress.js:13`, `app/views/worker/repo-ops-timeline.js:570`, `server/worker/completion-intent.js:873`, `:1035-1037`, `server/worker/operation-recovery.js:150`, `app/utils/failure-sentences.js:41`, `server/ws/worker-handlers.js:7462`, `app/views/monitor/index.js:1223`, `app/views/worker/index.js:1260`
- 현행 ADR UI-c74x는 정리 실패 행의 Worker 출구를 `[워커로 이어가기]`로 부르고, 실행 타일 `↻ 정리 재시도`는 그대로 둔다 — `docs/adr/UI-c74x-credential-wait-conversation.md:174`, `:194`, `:790`
- 카드 문법 정본의 짝 정정(UI-18a5) — `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:618-631`
- 배포 러너는 실행 출처(수동/Bead)를 스크립트에 넘기지 않는다 — `server/worker/repo-operation-runner.js:58-62`(프로토콜 env는 target·base·root 셋뿐)
- dotfiles 볼트 점검의 재실행 안내 `[배포 실행]` — dotfiles `scripts/check-beads-ui-vault-access.py:43`, `src/shell/lib/dotfiles_install/reconciler.py:214`, `scripts/mac-canonical/RUNBOOK.md:336`
- 지금 쓸 수 있는 우회로다. 「저장소 작업」 `[배포 실행]`이 성공한 뒤 정리를 재시도하면 위 덮음 판정으로 풀린다. 다만 두 번 눌러야 하고 화면에 드러나지 않는다 — 위 `:3270-3328` 인용에서 유도함

## 3. 설계

### 3.1 사람 권한

- 사람 권한은 `retryCleanupLocked`로 들어오는 진입에만 있다. 정리 실패 행 `[정리 재시도]` 클릭, 이미 머지된 PR의 `[머지]` 클릭, 실패 대화 `인계`가 그 진입이다. post-merge 잡의 `job_retry_authorized`와 같은 경계다.
- 실패 단계가 `repo_operations`면 `runCleanup`이 이 권한을 받아, 그 단계의 정리 경로 검증 호출과 배포 호출에 넘긴다. 부팅 재개, `resumeCompletionCleanup`, 관측형 자동 재시도, 첫 정리 실행은 권한을 넘기지 않는다.

### 3.2 재실행 식별

결정: 끝난 기록은 다시 열지 않는다 — 사람 재시도는 실패한 기록 X를 잇는 새 기록을 만들고, 그 식별자는 자동 식별 입력에 `retry_of: X`를 더해 해시한다 (대안: 수동 배포(`manual_run_id`)로 대신 실행 — 정책·스크립트를 tip에서 읽어 자동 배포의 이전 base 규칙을 깨고 주체가 `manual`로 바뀌어 Bead 조회와 정리 잇기가 끊긴다; 실패 기록 재개방(bootstrap attach 류) — 종단 기록 불변과 `script_retry` 소비 키를 흔든다; 이유: 식별이 사실에서 결정되므로 재시작·중복 클릭에도 같은 답이 나온다).

- 키는 있을 때만 더한다(`manual_run_id`와 같은 방식). 그래서 기존 자동·수동 식별자는 바이트 그대로다. 배포(`operationId`)와 검증(`verifyOperationId`)에 똑같이 적용한다.
- 체인: 계산한 자동 식별자의 기록이 실패이면 `retry_of`로 이어진 후계를 따라 끝(tip)까지 간다. tip 상태별 처리:
  - `queued`·`running`·`retry_pending`이면 채택하고 기다린다.
  - `succeeded`면 채택하고 정리를 잇는다.
  - `failed`이고 사람 권한이 있으면 tip을 잇는 새 기록 하나를 사전기록하고 실행한다. 권한이 없으면 그 실패를 채택한다(현행).
- 새 기록을 만들 때 대체된 실패 기록에 기존 대체 표시(`superseded_by`)를 쓴다. 서랍과 진행 표시는 그것을 현재 실패로 읽지 않는다.
- 나머지 입력은 자동 실행 그대로다. 대상은 `runCleanup`이 막 fetch한 base tip이고, 배포 정책·스크립트는 마지막 성공 배포의 base에서 읽는다. 스크립트 자체가 고장이면 수정 커밋이 착지한 뒤 「저장소 작업」 `[배포 실행]`(tip 정책)이 길이다.
- 새 기록은 `retry === null`로 시작하므로 `script_retry` 한 단계를 새로 갖는다. "한 번 재실행"은 그 사다리를 포함한 한 실행이다.
- 이 버그가 드러나는 조건은 머지 뒤 base tip이 움직이지 않은 경우다. tip이 움직였으면 대상이 달라 지금도 새 식별자가 나온다. 체인은 그 경우에도 같은 규칙으로 동작한다.
- 검증은 정리 경로의 호출에만 적용한다. 머지 전 게이트 검증과 외부 대상 검증의 식별·채택은 바꾸지 않는다.

### 3.3 진행 표시와 재시작

- 새 기록이 사전기록되면 그 Bead의 정리 실패 기록을 지우고 커서를 `repo_operations`에 둔다. 카드는 실패가 아니라 진행 중으로 보인다. beads-ui 자기 배포처럼 실행 중에 서버가 재시작돼도 부팅 재개가 행을 이어받는다.
- 부팅 재개의 정확 조회와 결과 대기는 3.2 체인의 tip을 읽는다. 대체된 옛 실패를 읽고 실행 중인 재시도를 실패로 적지 않는다.
- 재실패는 새 실패다. `failCleanup`이 새 시각으로 정리 실패를 쓰고, 다음 사람 재시도는 그 tip을 잇는 새 기록을 만든다. 실패 대화의 자동 기동·알림은 기존 "실패당 한 번" 규칙을 따른다.
- 정리 실패 기록을 지우면 관측형 자동 재시도 예산도 새로 시작한다. 사람 클릭은 새 권한이다.

### 3.4 실패 대화 인계

- 인계는 이미 같은 진입(`retryCleanup`)을 탄다. 그래서 3.1–3.3만으로 인계도 배포·검증을 한 번 다시 돌린다.
- 한 번 규칙: 새 실행이 정리 실패를 지우거나 새 실패를 쓰면 정체성 `cleanup:<step>:<at>`이 바뀌고, 인계는 "실행됨"으로 끝난다. 판정은 바꾸지 않는다.
- 10-06 스펙(`2026-10-06-failure-conversation-auto-launch-design.md`) §3.3의 인계 표는 Bead 없는 수동 배포 행만 다룬다. Bead 카드 배포·검증 단계의 인계는 이 스펙이 정하고, 그 파일은 고치지 않는다.

### 3.5 `[정리 재시도]` 이름

결정: 머지된 행에서 정리가 멈췄을 때(`cleanup_retry`·`external_cleanup`) Worker 버튼의 라벨·`aria-label`은 `정리 재시도`다 (대안: `[워커로 이어가기]` 유지 + 단계별 툴팁; `[정리 재시도]` 하나만 두고 세션 버튼 제거; 이유: 사용자 결정 — 클릭이 하는 일을 이름이 말하고, 원인을 모를 때의 진단 입구는 남긴다).

- 자리와 유무 판정은 그대로다. 슬롯 6 짝 자리에 `[세션에서 이어가기]`가 바로 앞에 서고, `tileResolveFields`의 `pair_anchor`도 그대로다. 모니터·Worker 두 탭은 같은 공유 렌더러를 쓴다.
- 같은 클릭을 가리키는 문구도 함께 바꾼다:
  - 요청 중 배지 `정리 재시도 요청 중`
  - 「저장소 작업」 서랍의 정리 중단 행 버튼
  - 진행 표시 `완료 · 정리 재시도 대기`
  - 알림·댓글 `다음:` 문장: post-merge 클래스는 `[세션에서 이어가기] 또는 [정리 재시도]`이고, 복구 대기·수정 Bead 문장도 `[정리 재시도]`
  - 첫 `[deploy]` 선언 문장
  - 사용자 조작 기록 `[정리 재시도] 클릭`
  - 거부 토스트
- 툴팁의 단계별 문장은 유지한다. 이제 약속대로 동작한다. 배포는 "배포를 새로 한 번 돌린 뒤 저장소 작업부터 정리를 잇습니다", 검증은 같은 형태다.
- 바꾸지 않는다:
  - 확인 필요 대화 인계, 외부 작업 완료 fork, 폐기 실패 재시도의 `[워커로 이어가기]`
  - 실행 타일 `↻ 정리 재시도`(이미 같은 낱말)
- 카드 문법 정본(`2026-08-25-card-header-grammar-unify-design.md`)에 `정정(UI-btsr)` 단락을 더해, 정리 실패 행의 짝 이름이 `[세션에서 이어가기]` · `[정리 재시도]`임을 기록한다.

### 3.6 dotfiles 볼트 점검 문구 (enclosed foreign unit)

결정 — 재실행 안내는 `[정리 재시도](수동 배포면 [배포 실행])`로 쓴다 (대안: 버튼 이름 없는 "배포 다시 실행"; 이유: 배포 러너가 실행 출처를 스크립트에 넘기지 않아 스크립트는 어느 입구에서 돌았는지 모른다 — 두 입구를 다 적되 Bead 카드 쪽을 앞에).

- 대상: `scripts/check-beads-ui-vault-access.py`의 `RERUN`, `src/shell/lib/dotfiles_install/reconciler.py`의 대체 문구, `scripts/mac-canonical/RUNBOOK.md` §8.3 4단계, 그리고 문구를 고정한 테스트 `tests/check_beads_ui_vault_access_test.py`·`tests/install_bundle_profile_test.py`·`tests/repo_ops_deploy_adapter_test.py`다.
- 알림 200자 상한(`NOTICE_LIMIT`)을 지킨다.

## 4. Test scope

새 동작(변경 전에는 실패해야 하는 경계). 모두 base tip을 고정한다 — tip이 움직이면 수정 없이도 통과한다.

- `server/worker/pr-actions.test.js`:
  - 배포 실패로 멈춘 행에 사람 재시도를 하면 새 배포 기록이 하나 생기고 스크립트가 한 번 실행된다. 성공하면 post-merge 잡·브랜치 정리·닫기까지 이어진다.
  - 머지 후 검증 실패로 멈춘 행에도 같은 동작을 한다.
  - 재시도가 새 기록을 사전기록하면 정리 실패 기록이 지워지고 커서가 `repo_operations`다.
  - 재시도 실행 중에 재시작하면 부팅 재개가 tip(실행 중인 재시도)을 기다린다. 옛 실패로 다시 실패를 적지 않는다.
- `server/worker/repo-operation-coordinator.test.js`:
  - 권한이 있고 tip이 실패이면 `retry_of`로 이어진 새 기록 하나를 만들고, 옛 기록에 `superseded_by`를 쓴다.
  - 같은 실패에 두 번째 요청이 오면 그 새 기록을 채택한다(실행은 하나).
  - 권한이 없으면 실패를 채택한다.
  - 새 기록은 `script_retry` 한 단계를 갖는다.
- `server/worker/scheduler.test.js`: cleanup 종류 실패 대화의 인계가 배포 단계 실패에서 새 배포를 한 번 실행한다. `started_at` 뒤 재시작해도 다시 실행하지 않는다.
- `app/views/worker/pr-wait-row.test.js`·`app/views/worker/repo-ops-timeline.test.js`: 정리 실패 행(`cleanup_retry`·`external_cleanup`)의 라벨·`aria-label`이 `정리 재시도`이고 `[세션에서 이어가기]`가 그 앞에 선다. 요청 중 배지 문구도 확인한다.
- 모니터·Worker 카드 동일성 테스트: 정리 실패 카드의 두 탭 버튼이 같다.
- `server/worker/completion-intent.test.js`·`server/worker/notify.test.js`: post-merge 클래스 `다음:` 문장이 `[정리 재시도]`를 쓴다.
- dotfiles 테스트 3개: 새 안내 문구와 200자 상한.

보존(현행 유지 확인):

- 자동 배포·검증·수동 배포 식별자의 해시가 바이트 그대로다(`retry_of`가 없을 때).
- 부팅 재개, `resumeCompletionCleanup`, 관측형 자동 재시도, 첫 정리 실행은 실패 기록을 채택하고 다시 실행하지 않는다.
- 확인 필요·폐기 실패·외부 작업 완료의 `[워커로 이어가기]`와 실행 타일 `↻ 정리 재시도`는 그대로다.

## 5. 경계·후속

- **enclosed foreign unit: dotfiles** — 3.6의 문구·RUNBOOK·테스트 정정. 같은 Bead 안에서 dotfiles 기본 브랜치에 착지하고 분리 Bead를 만들지 않는다. beads-ui 쪽 이름 변경과 같은 배포 묶음으로 끝낸다.

비목표:

- 머지 전 게이트 검증과 외부 대상 검증의 재실행
- post-merge 잡 재실행(이미 `job_retry_authorized`가 소유)
- 배포 러너가 실행 출처 env를 스크립트에 넘기는 일
- 10-06 스펙 파일 수정
- 다른 실패 행(폐기 실패 등)의 버튼 이름

## 6. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-5 — 배포 실행 소유, 상시 `script_retry` 한 단계, 수동 `[배포 실행]`을 그대로 쓴다. 사람 재시도는 사다리를 바꾸지 않고, 새 실행이 사다리를 새로 갖는다.
- 전제: ADR UI-c74x — 실패 대화 자동 기동, `인계`는 그 행의 Worker 출구를 사람 권한으로 많아야 한 번 실행한다는 조항을 따른다. 아래 후보가 그 ADR의 정리 실패 행 이름 조항을 바꾼다.
- 머지 후 정리가 멈춘 행의 Worker 출구 이름은 `[정리 재시도]`다. 사람 재시도(클릭·인계)는 저장소 작업 단계의 실패한 배포·검증을 `retry_of`로 이은 새 실행으로 한 번 다시 돌리고, 끝난 기록은 다시 열지 않는다.
  - 되돌리기 어렵다. 함께 움직이는 소비자:
    - `queue.json` `repo_operations`에 저장되는 식별자 해시와 `retry_of`·`superseded_by` 체인
    - 체인을 읽는 정확 조회·부팅 재개·결과 대기
    - `pr-actions.js` 정리 재시도 권한
    - 두 탭의 공유 카드 렌더러와 동일성 테스트
    - 알림·댓글 `다음:` 문장, 카드 문법 정본, dotfiles 안내 문구
  - 맥락 없이 보면 놀랍다. 같은 날 Accepted인 UI-c74x가 이 행을 `[워커로 이어가기]`로 불렀다(짝 문법). 또 "종단 기록은 다시 열지 않는다"와 "사람이 누르면 다시 돈다"는 함께 읽혀야 한다.
  - 실제 절충이다. 대안은 둘이었다:
    - 수동 배포로 대신 실행: 이전 base 정책 규칙과 Bead 주체를 잃는다.
    - 실패 기록 재개방: 종단 불변과 사다리 소비 키를 잃는다.
    - 이름 쪽에서는 짝 문법의 균일함을 내주고 클릭 의미가 드러나는 이름을 얻었다.
  - 통합: 소비자 집합(`pr-actions.js` 정리 재시도 권한, `pr-wait-row.js` 술어·버튼, `scheduler.js` 인계, 알림 다음 문구)이 UI-c74x의 Consequences(`docs/adr/UI-c74x-credential-wait-conversation.md:884`)와 같다. 그래서 UI-c74x를 대체한다.
    - 뒤집는 조항은 정리 실패 행 출구 이름 하나다(`:174`, `:194`, `:790`의 "실패의 머지 후 정리는 정리 재시도 = `[워커로 이어가기]`").
    - 나머지 조항은 모두 승계한다.
  - `summary`: "실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 외부 PR 사람 처리 필요, 폐기 실패, 수동 배포 실패)은 공용 대화 자동 기동 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 실패당 한 번 자동으로 열고, 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일해 「🚨 사람 필요」를 없앤다; 외부 PR 사람 처리 필요 행은 [머지]로 풀리지 않고 [세션에서 이어가기]만 출구다; 수동 배포 실패는 「저장소 작업」 서랍의 [세션에서 이어가기]와 작업 식별자 키의 대화 레코드를 가지며 인계는 그 작업 1회 재실행이다; 머지 후 정리가 멈춘 행의 Worker 출구는 [정리 재시도]이고 사람 재시도(클릭·인계)는 저장소 작업 단계의 실패한 배포·검증을 retry_of로 이은 새 실행으로 한 번 다시 돌리며 끝난 기록은 다시 열지 않는다; 조치 필요는 beads-ui 버튼으로 해결할 수 있는 대기 사유에만 서고 버튼 이름을 담은 해결 문장을 함께 실으며 선행 대기는 늘 normal이고 대기 사유 판정은 Discord로 알리지 않는다; 살아 있는 대화가 있는 행은 Discord 링크가 없을 때만 [세션에서 이어가기]를 그리고 그 클릭은 새로 띄우지 않고 그 대화 창을 앞으로 부른다; 같은 세션 대화를 여는 복구 대기는 세션이 선언한 `authority`·`no_progress`·`credential`이고, 공급자 보류로 바뀌지 않은 `provider`는 대상이 아니다" → ADR, supersede UI-c74x
- dotfiles 볼트 점검 안내를 `[정리 재시도](수동 배포면 [배포 실행])`로 바꾼다 — 되돌리기 쉬움(문자열 상수 하나와 그 테스트) → ADR 아님
