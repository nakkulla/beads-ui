---
scope:
  - server/worker/repo-operation-coordinator.js
  - server/worker/resolution-ladder.js
  - server/worker/operation-recovery.js
  - server/worker/quickfix-landing.js
  - server/worker/pr-actions.js
  - server/worker/scheduler.js
  - server/worker/wait-judgment.js
  - server/worker/queue-store.js
  - generated/contracts/
  - app/utils/failure-sentences.js
  - app/views/worker/failure-labels.js
  - app/views/worker/running-grid.js
---

# 배포 조건 대기 — 종료 코드 75면 수정 Bead 없이 기다리고 Worker가 자동으로 다시 확인한다

Bead: UI-ksi6 · 선행: UI-2wnv(quick_fix [정리 재시도]의 배포 재실행), dotfiles-rnyd9(계약 형제, §3.5) · 출처: 2026-11-08 Cortex-n5y·Cortex-io3 카드

## 1. 목표

2026-11-07 Cortex-n5y·Cortex-io3는 코드 착지까지 마쳤지만 착지 단계의 배포(Cortex `repo-ops/script/deploy`)가 exit 1로 끝났다. n5y는 라이브 볼트 main이 매시 자동 커밋과 갈라져 rebase가 충돌했고, io3는 라이브 작업 트리의 미커밋 편집을 git이 덮어쓰지 않으려 했다. 둘 다 스크립트가 사용자 편집을 지키려고 설계대로 거부한 것이다. Worker는 몇 초 간격 두 번의 같은 실패를 코드 결함으로 증명했다고 보고 수정 Bead(Cortex-604)를 만들었다. 그 Bead는 "refuted: 설계대로 거부"로 닫혔다. 이튿날 10:00 매시 자동 커밋이 따라잡아 라이브가 두 착지 SHA를 담았는데도 카드는 6시간 넘게 「실패 · 착지 실패」로 남았다.

2026-11-08 사용자 결정:

- (가) quick_fix [정리 재시도]가 배포를 다시 돌리지 못하는 결함은 UI-2wnv로 따로 먼저 고친다.
- (나) "기다리면 풀리는" 배포 실패는 스크립트가 신호로 알리고, Worker는 수정 Bead 없이 대기로 두며 스스로 다시 확인해 정리까지 끝낸다. dotfiles 계약과 Cortex 스크립트도 함께 바꾼다.

수용 기준:

- 배포 스크립트가 종료 코드 75로 끝나면 수정 Bead가 생기지 않는다. 카드는 실패가 아니라 대기로 보이고, 다음 자동 재확인 시각을 보인다.
- 조건이 풀리면 사람 클릭 없이 다음 재확인에서 배포가 성공하고, 남은 정리(post-merge 잡 → 브랜치 정리 → 닫기)가 이어진다.
- 같은 대기 사슬의 반복 75는 실패 댓글·알림을 다시 남기지 않는다. 기한이 지나면 자동 재확인을 멈추고 사람에게 한 번 묻는다.
- 75가 아닌 실패의 분류·수정 Bead 인계는 지금과 같다.

## 2. 검증된 전제

기준: beads-ui `a4057ef4aa6fd2d8ca27808753b9538602dc6219`, Cortex `a87ffcf44317f4b1297d5d4a514ae2bb8a657f6d`, dotfiles 작업 트리(2026-11-08).

- 스크립트 종료는 124면 `timeout`, 그 밖은 모두 `script_failed`로 기록된다 — `server/worker/repo-operation-coordinator.js:1394`
- `script_retry`는 스크립트 정체가 있고 아직 소비되지 않은 기록에 한 번 걸린다 — `server/worker/resolution-ladder.js:259-264`
- 같은 fingerprint의 `script_failed`가 재시도 뒤에도 반복되고 요약이 스크립트 실패 줄이면 `local_code_defect`이고, 정책이 repair면 코드 결함 인계다 — `server/worker/operation-recovery.js:44-72`, `:91`, `:97`
- 계약은 코드 결함 인계에 `proven_owned_code_defect`를 요구하고 그 밖은 `wait_on_condition`이다. `bounded_single_script_retry_exceeded`는 `never_automatic`이다 — dotfiles `docs/contracts/workflow-state.yaml:921-957`, 핀 사본 `generated/contracts/repo-operation-policy.json`
- 사람 재시도는 실패 tip을 잇는 `retry_of` 후계 하나를 만들고, 권한이 없으면 실패 tip을 채택한다 — `server/worker/repo-operation-coordinator.js:2232-2257`(UI-btsr §3.2)
- quick_fix 착지의 배포 호출은 `retry_authorized`를 넘기지 않는다(UI-2wnv가 고침) — `server/worker/quickfix-landing.js:1417-1425`, `:1086-1090`
- 수정 Bead가 있으면 대기 행은 「수정 작업 대기」, 없으면 action_required로 사람에게 묻는다 — `server/worker/wait-judgment.js:959-996`
- PR 정리 경로에는 이미 관측형 예약 재시도(`retry_count`·`next_retry_at`, 3회)가 있다. `base_containment`·`branch_cleanup` 한정이다 — `server/worker/resolution-ladder.js:133-145`, `server/worker/queue-store.js:709`
- 착지 실패 칩과 타일 상태 문구 — `app/views/worker/failure-labels.js:56`, `app/views/worker/running-grid.js:1177`, `:1362`
- Cortex 배포의 거부 지점(index lock·staged·sync 거부·바뀐 스킬 파일 미커밋 편집)은 모두 exit 1이다 — Cortex `repo-ops/script/deploy:73`, `:75`, `:77`, `:101`
- [정리 재시도]를 눌러도 새 배포 로그 없이 0.15초 만에 같은 실패가 재보고됐다 — `~/.local/state/bdui/Cortex-609851f1fa3d/beads/Cortex-n5y/events.jsonl` 마지막 4줄(2026-11-08)

## 3. 설계

### 3.1 신호: 종료 코드 75

결정: `[deploy]` 스크립트가 "외부 조건이 아직 안 맞아 거부했고, 다시 돌려도 안전하다"를 알리는 신호는 종료 코드 75(`EX_TEMPFAIL`, sysexits)다 (대안: stderr 표지 줄 — 로그 문구가 계약이 되어 깨지기 쉽다; 같은 fingerprint 재시도에 시간 간격을 두는 판정 강화 — 스크립트만 아는 차이를 Worker가 추측한다; 이유: 표준 관례이고 스크립트 소유자가 재실행 안전성을 선언한다).

- 적용은 `[deploy]`만이다. `[verify]`의 75는 지금처럼 `script_failed`다.
- 75로 끝난 배포 기록의 실패 코드는 `condition_wait`다(예: 이름. 계약 어휘는 dotfiles 형제가 정한다). 마지막 stderr 줄은 기존처럼 요약으로 남는다.
- `condition_wait`에는 `script_retry`를 걸지 않고, 걸지 않은 근거를 기존 skip evidence로 남긴다. 몇 초 안의 재실행은 조건을 바꾸지 못한다.
- `condition_wait`는 코드 결함 증명이 아니다. 분류는 계약의 대기 분류이고, 수정 Bead 인계는 일어나지 않는다.
- 75로 끝났어도 스크립트가 만든 부분 효과와 로그는 보존한다. 배포 작업 트리 tracked-clean 검사 등 기존 사후 검사는 그대로 한다.

### 3.2 자동 재확인

결정: Worker는 `condition_wait` tip을 계약이 정한 간격마다 사람 재시도와 같은 `retry_of` 후계로 다시 실행하고, 사슬 첫 실패부터 계약 기한이 지나면 멈춘다 (대안: 다른 경로의 성공을 관측만 하는 읽기 확인 — 저장소마다 배포 증거 정의가 새로 필요하다; base tip 이동 때만 재실행 — 조건이 원격 이동 없이 풀리는 경우를 놓친다; 이유: 스크립트 자체가 가장 정확한 확인이고 UI-btsr 사슬을 그대로 쓴다).

- 기본값(계약에 둔다): 간격 30분, 기한 24시간.
- 재확인 시각은 tip 기록의 `finished_at` + 간격이다. 기한은 사슬 머리(첫 `condition_wait`)의 `finished_at` + 기한이다. 둘 다 내구 기록에서 계산하므로 재시작해도 같은 답이 나오고, 새 상태 기계나 Bead metadata 사본을 두지 않는다.
- 자동 재확인 권한은 이 경우에만 생긴다: tip이 `failed`이고 실패 코드가 `condition_wait`이며 기한 안이고 시각이 됐다. 그 밖의 실패 tip은 지금처럼 채택만 한다.
- 진입 경로는 둘이다. 사람 재시도와 같은 정산 진입을 자동 권한으로 탄다.
  - quick_fix 착지: `repo_operations` 커서에서 실패한 attempt의 착지 정산(UI-2wnv가 연결한 배포 재실행 경로).
  - PR 정리: `repo_operations` 단계 정리 실패 행의 정리 재실행.
- 후계는 UI-btsr 규칙 그대로다. 배포 작업 트리 HEAD가 이미 대상이어도 스크립트를 실제로 돌리고, 사전기록 때 옛 tip에 `superseded_by`를 쓴다. 한 tip에 후계는 하나다. 그래서 겹친 tick·재시작·사람 클릭이 동시에 와도 실행은 하나다.
- 결과:
  - 성공 → 남은 정리를 잇고 Bead를 닫는다.
  - 다시 75 → 새 tip이 되고 다음 시각을 기다린다.
  - 다른 실패 → 일반 분류를 탄다. 이때 코드 결함 인계도 일어날 수 있다.
- 기한이 지나면 자동 재확인을 멈춘다. 행은 action_required(`decision`)가 되고 [세션에서 이어가기]·[정리 재시도]가 출구다.
- 사람 [정리 재시도]는 언제든 즉시 후계를 만든다. 기한 안팎과 무관하다.
- 다른 착지가 같은 base에서 이후 SHA를 배포해 성공하면 기존 `descendant_success_covers_ancestor_rows`가 행을 덮는다. 바꾸지 않는다.
- Bead 없는 수동 [배포 실행] 행은 분류·표시만 바뀌고 자동 재확인은 없다.
- 검사 주기는 기존 scheduler tick에 얹는다. 새 타이머를 두지 않는다.

### 3.3 기록·알림과 표시

- 기한 전의 사슬은 종단 실패가 아니다(dotfiles-rnyd9 §3.2). 첫 `condition_wait`에는 대기 알림·대기 댓글을 한 번 남기고, 「세션 실패 기록」 댓글·실패 알림·실패 대화 자동 기동은 기한이 지날 때 사슬당 한 번이다. 사슬의 반복 75는 아무것도 새로 남기지 않는다.
- 대기 행(`wait-judgment`)은 verdict `normal`이다.
  - headline: `배포 조건 대기 · <스크립트 마지막 줄>`
  - release: `다음 자동 재확인 HH:MM · 기한 MM/DD HH:MM — 지금 다시 돌리려면 [정리 재시도]`
  - 기한이 지나면 `action_required`(`decision`)이고, release는 `기한 지남 — [세션에서 이어가기]로 원인을 보거나 [정리 재시도]`다.
- 실행 타일: 상태 문구는 `실패` 대신 `대기`, 실패 칩은 `⛔ 착지 실패` 대신 `⏳ 배포 조건 대기`(danger 아님)다. 기존 상태 문구·칩 슬롯에 값만 더한다. 새 슬롯은 없다.
- 카드 재료는 공유 함수 한 곳에서 만든다. 모니터와 Worker 두 탭은 같은 칩·문구·버튼을 갖는다. 문구는 `app/utils/failure-sentences.js` 계열의 기존 실패 문장 표에 `condition_wait` 행으로 더한다.

### 3.4 Cortex 스크립트 (크로스 리포 unit)

- 라이브 체크아웃 상태 때문에 거부하는 지점은 `fail` 대신 75로 끝낸다. 대상은 index lock, staged 변경, `cortex-vault-sync` 거부, 바뀐 계약·스킬 파일의 미커밋 편집이다(`deploy:73`, `:75`, `:77`, `:101`).
- 설치 누락·읽기 실패·대상 SHA 불일치·작업 트리 dirty 등 그 밖의 실패는 1로 둔다.
- 거부 메시지의 "the hourly auto-commit retries the live sync"는 Worker 자동 재확인과 겹치므로 문구를 사실대로 고친다.
- 이 변경은 계약 형제가 75의 의미를 정의한 뒤에 착지한다. 그 전에 착지하면 75가 지금처럼 `script_failed`로 읽혀 현행과 같으므로, 순서가 틀려도 해롭지는 않다.

### 3.5 계약 형제 (dotfiles)

정본은 dotfiles 계약이다(ADR UI-u6ud-2). 형제 Bead가 다음을 정하고, beads-ui는 핀 사본을 갱신해 소비한다.

- `repo_operations`에 `[deploy]` 종료 코드 75의 의미와 스크립트 의무를 정한다. 의무는 재실행 안전·부분 효과 없는 거부·stderr 마지막 줄의 사유다.
- `automation_policy`에서 75에는 `script_retry`를 적용하지 않는다.
- `worker_automatic`에 조건 대기 자동 재확인을 더한다. 간격·기한 값은 계약에 두고, `never_automatic`의 `bounded_single_script_retry_exceeded`에 이 경우를 예외로 명시한다.
- `work_recovery.classification`에 `condition_wait`(disposition `wait`)를 둔다. 필요하면 reason 어휘도 더한다.
- `after_terminal_record_once_per_failure_identity`에서 같은 사슬의 반복 75는 같은 정체로 본다.
- 스키마 버전을 올린다. beads-ui는 새 핀 사본의 `consumer_schema_required`를 맞추고, 낮은 스키마를 읽으면 지금 동작을 유지한다(fail-quiet).

결정: 이 Bead의 구현은 계약 형제가 닫힌 뒤에 시작한다(foreign `blocks`) — 어휘와 자동 실행 허가의 정본이 형제이고, 이 Bead는 그것을 소비한다.

## 4. Test scope

배포 테스트는 base tip과 배포 작업 트리 HEAD를 대상 SHA에 고정한다(UI-btsr §4와 같은 이유).

- `server/worker/repo-operation-coordinator.test.js`:
  - exit 75 배포는 실패 코드 `condition_wait`로 끝나고 `script_retry`를 소비하지 않는다(skip evidence 기록).
  - 자동 권한 + tip `condition_wait` + 시각 도래면 `retry_of` 후계 하나를 만들고 스크립트를 실제로 실행한다.
  - 시각 전·기한 후·tip이 다른 실패면 후계를 만들지 않는다.
  - 같은 tip에 자동 tick과 사람 클릭이 겹쳐도 후계는 하나다.
- `server/worker/operation-recovery.test.js`: 같은 fingerprint로 반복된 `condition_wait`는 `code_defect`가 아니고 handoff key가 없다.
- `server/worker/quickfix-landing.test.js`: `repo_operations` 커서 실패가 75 → (조건 해소) 0으로 바뀌면 자동 재확인이 정리·닫기까지 잇는다. 사슬 반복 75는 실패 기록을 새로 쓰지 않는다.
- `server/worker/pr-actions.test.js`: PR 정리 `repo_operations` 단계에서 같은 동작을 한다.
- `server/worker/wait-judgment.test.js`: 기한 안 행은 `normal`이고 다음 시각을 싣는다. 기한 후 행은 `action_required`(`decision`)다.
- 카드: 모니터·Worker 카드 동일성 테스트가 `⏳ 배포 조건 대기` 칩과 `대기` 상태 문구를 함께 본다.
- 재시작: 사슬 tip이 `condition_wait`인 상태로 서버를 다시 시작해도 다음 재확인 시각이 같다.

## 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | next_owner_requires_prior_acceptance_and_handoff — 75 어휘·자동 재실행 허가의 정본이 계약이고 이 Bead가 소비한다 | 없음 | dotfiles-rnyd9 |

- 크로스 리포 unit: Cortex — Cortex-lpl, `repo-ops/script/deploy`의 라이브 상태 거부 지점을 75로 바꾸는 quick_fix(§3.4). 선행은 dotfiles-rnyd9다(foreign `blocks`).
- 제외: Cortex `vault-sync.sh`·매시 자동 커밋 동작, `[verify]`의 75, 수동 [배포 실행]의 자동 재확인, 이미 닫힌 Cortex-604.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 종료 코드 어휘·자동 실행 허가는 dotfiles 계약이 정의하고 beads-ui는 핀 사본으로 소비하며, 낮은 스키마면 표시와 동작을 지금대로 둔다(fail-quiet).
- 전제: ADR UI-ymcx — 배포는 머지된 대상 커밋의 선언·스크립트로 돌고, 재시도 후계도 같은 규칙으로 실행한다.
- 배포 스크립트의 종료 코드 75는 수정 Bead 없는 조건 대기이고, Worker는 계약 간격·기한 안에서 실패 tip을 잇는 재시도 후계로 자동 재실행해 성공하면 정리를 끝낸다. 같은 사슬의 반복 75는 기록·알림을 한 번만 남긴다. 되돌리기 어렵다: coordinator·operation-recovery·quickfix-landing·pr-actions·wait-judgment·카드 표시, 그리고 75를 쓰기 시작한 저장소 스크립트(Cortex)가 함께 움직여야 한다. 횡단적이다: 모든 저장소의 배포 실패 처리와 사람 확인 지점을 바꾼다. 놀랍다: 지금은 "자동 재실행은 `script_retry` 1회뿐"이 불변식이다. 새 주제: 가장 가까운 현행 ADR UI-ymcx는 배포를 어느 커밋의 스크립트로 돌리느냐를 정하고, 이 결정은 실패 뒤 복구·분류·표시를 정한다. 소비자 집합이 다르다(operation-recovery·wait-judgment·quickfix-landing·카드). `summary`: "배포 스크립트가 종료 코드 75로 끝나면 Worker는 수정 Bead 없이 조건 대기로 두고 계약 간격·기한 안에서 실패 기록을 잇는 재시도 후계로 자동 재실행해 성공하면 정리를 끝내며, 같은 사슬의 반복 실패는 기록·알림을 한 번만 남긴다" → ADR
- 대기 행·타일의 문구와 칩 값(`⏳ 배포 조건 대기`, `대기`) — 기존 슬롯의 값 추가로 되돌리기 쉽다 → ADR 아님
- 간격 30분·기한 24시간 — 계약 값이라 dotfiles 형제가 소유하고, 조정은 값 변경이다 → ADR 아님
