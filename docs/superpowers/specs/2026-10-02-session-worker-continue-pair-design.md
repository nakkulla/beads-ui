---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/resolve-session.js
  - server/worker/external-wait/session-resume.js
  - server/worker/scheduler.js
  - server/worker/wait-judgment.js
  - server/worker/notify.js
  - server/worker/queue-store.js
  - server/worker/interactive-progress.js
  - server/worker/pr-actions.js
  - server/worker/discard-coordinator.js
  - server/ws/worker-handlers.js
  - app/views/worker/
  - app/views/monitor/
  - generated/contracts/
---

# 세션·Worker 이어가기 짝으로 대화형 세션 표면 통합 (UI-18a5)

선행이자 형제: dotfiles `dotfiles-xto5b`(§6). 그 정본이 대화 계약을 세 종류(확인 필요·실패·외부 작업 완료)로 넓히고, 버튼 어휘·실패 대화의 인계 권한·진입 블록 바이트·Discord 스레드 이름표를 정한다. 이 스펙은 beads-ui가 그것을 어떻게 띄우고 관측하고 이어가는지 정한다.

## 1. 배경과 목표

beads-ui가 띄우는 대화형 세션은 세 종류이고, 사용자에게 보이는 이름·버튼·끝맺음이 종류마다 다르다.

| 종류 | 여는 버튼 | 세션 | 끝맺음 | Discord 이름표 |
| --- | --- | --- | --- | --- |
| 문의(확인 필요) | 자동 또는 `[세션에서 해결]` | 같은 세션 재개 | `인계`·`인수`·`보류` | `🙋 Worker 대화` |
| 해결(실패) | `[세션에서 해결]` | fork | 없음 — 고친 뒤 사람이 `[정리 재시도]`·push | `🛠 Worker 해결` |
| 외부 작업 이어가기 | `[세션에서 이어가기]` | 같은 세션 재개 | 없음 — 지시 대기 | `↪ 외부 작업 이어가기` |

같은 `[세션에서 해결]`이 카드 상태에 따라 다른 세션을 열어 사용자가 두 세션을 다른 유형으로 오해했다(2026-10-02 대화). 같은 이름 `[워커로 이어가기]`도 확인 필요에서는 대화 인계, 외부 작업에서는 fork attempt로 다르게 동작한다. 세 경로 모두 드물게 쓰여(§2 실측), 규칙이 다르면 쓸 때마다 다시 헷갈린다.

사용자 결정(2026-10-02):
1. 버튼은 어디서나 한 쌍이다 — `[세션에서 이어가기]`(사람이 대화로 잇는다) / `[워커로 이어가기]`(대화 없이 Worker가 잇는다).
2. 모든 대화형 세션은 `인계`·`인수`·`보류`로 끝나고, `인계`는 그 행의 `[워커로 이어가기]`를 누른 것과 같다.
3. 실패 대화의 `인계`는 사람 클릭과 같은 권한이다 — 결과 미상 머지 후 잡의 재실행도 포함한다.
4. 실패 카드의 `[정리 재시도]`와 폐기 실패의 `[재시도]`는 `[워커로 이어가기]`로 합친다. `[머지]`·`[폐기 포기]`는 남는다.
5. Discord 스레드 이름표는 하나다.
6. 자동 기동은 사람 판단이 필요한 멈춤에만 둔다(현행). fork와 같은 세션 재개의 내부 차이는 바꾸지 않는다.

목표: 확인 필요·실패·외부 작업 완료 카드 어디서나 같은 두 버튼, 같은 끝맺음, 같은 Discord 이름표를 본다.

## 2. 검증된 전제

beads-ui 기준은 `ecddf5c7`, dotfiles 기준은 `f0542a1c`이다.

- `[세션에서 해결]` 클릭 하나가 파킹·복구 대기는 문의 런처로, 그 밖은 해결 런처로 가른다 — server/ws/worker-handlers.js:6792
- 실패 행이 아닌 클릭은 `no_terminal_failure`로 거절한다 — server/ws/worker-handlers.js:6778
- 해결 세션 재료는 머지 전 검증 보류·`needs_human`·`cleanup_failed`·실패한 폐기다 — server/worker/resolve-session.js:127-228
- 해결 세션 첫 입력은 beads-ui 소유 `buildResolvePrompt`이고 "고친 뒤 [정리 재시도]"를 안내한다 — server/worker/resolve-session.js:235
- 해결 세션 창 이름은 `resolve-<bead>`이고 레코드 kind는 `resolve`다 — server/worker/resolve-session.js:478,490
- 외부 작업 재개는 같은 세션을 `claude --resume`로 열고 기동 뒤 대기 키를 지운다. 레코드 kind는 `external_resume`이다 — server/worker/external-wait/session-resume.js:42,256,286
- 외부 `[세션에서 이어가기]`·`[워커로 이어가기]`·`[새 세션으로]`는 서버 투영 action이고 세션 소유 `completing` 행에만 선다 — server/worker/wait-judgment.js:451-477
- 문의 레코드만 `conversation`을 갖는다 — server/worker/direction-inquiry.js:592
- 결과 줄 관측은 `conversation`이 있는 문의 레코드에만 돈다 — server/worker/scheduler.js:9480,9980; server/worker/interactive-progress.js:35
- 인계 이어가기는 최신 implementation attempt가 대기·파킹일 때만 재개한다 — server/worker/scheduler.js:9633
- `[세션에서 해결]` 타일 술어는 파킹·복구·폐기 실패만 자격으로 보고, 살아 있는 세션은 `inquiry`·`resolve`만 센다 — app/views/worker/tile-resolve.js:12-18,102-106
- PR 대기 행은 별도 술어(정리 실패·`needs_human`·`holding`·폐기 실패)를 쓴다 — app/views/worker/index.js:1489
- PR 대기 행의 주 버튼은 정리 실패 때 `정리 재시도`·`배포 재시도 후 정리`·`검증 재시도 후 정리`로 바뀐다 — app/views/worker/index.js:1694-1701
- 폐기 실패의 재시도 라벨은 `재시도`, 잔재 백업이면 `백업 정리 재시도`다 — app/views/worker/lanes.js:600-603
- 저장소 작업 타임라인은 `정리 재시도 — <단계> 단계부터`와 `[세션에서 해결]`을 한 묶음으로 그린다 — app/views/worker/repo-ops-timeline.js:514,569
- 정리 재시도는 사람 클릭에만 결과 미상 머지 후 잡의 재실행 권한(`job_retry_authorized`)을 준다 — server/worker/pr-actions.js:2208-2222,3702,3729
- 폐기 재시도는 `retry(operation_id)`다 — server/worker/discard-coordinator.js:2569
- 대화형 세션 배지는 kind별로 `재개`·`해결`·`문의` 세션이라 쓴다 — app/views/worker/lanes.js:1797; server/worker/scheduler.js:1290
- 사용자에게 보이는 옛 버튼 이름 인용 — server/worker/notify.js:727,914; app/views/worker/lane-model.js:816
- 자동 수리 세션 dispatch는 핀 정책이 금지한다 — generated/contracts/repo-operation-policy.json:60,73-82
- Discord 이름표는 브리지가 pane 마커 셋을 읽어 붙인다(이 저장소 밖) — dotfiles src/claude/scripts/discord-bridge/bridge.py:608-622
- 대화 계약(진입 블록·결과 줄·금지)은 문의 종류에만 정의돼 있다 — dotfiles src/shared/skills/flow/workflow/references/execution-common.md:27-110
- 버튼 이름의 정본은 dotfiles 계약이다 — dotfiles docs/contracts/workflow-contract.md:154,261; docs/contracts/external-wait.md:191-193; docs/contracts/workflow-state.yaml:845,1209
- 사용 실측(bead별 `events.jsonl`의 `interactive_session` 시작 이벤트, `event_id` 중복 제거): 문의 4회(2026-09-29부터), 해결 1회, 외부 이어가기 2회 — `~/.local/state/bdui/*/beads/*/events.jsonl` 집계 명령으로 확인
- 미확인: 외부 작업 대화가 `인수` 전에 Bead 상태를 바꾸지 않으면 인계 뒤 admission이 `open`을 읽는다 — 현행 외부 재개 첫 입력은 작업 시작 때 `in_progress`를 쓰라고 하고, 새 진입 블록의 금지 범위는 dotfiles 형제가 정한다

## 3. 설계

### 3.1 대상 행

`[세션에서 이어가기]`가 설 수 있는 행은 세 가지다.

- **확인 필요** — 파킹, 복구 대기(현행 타일 술어의 파킹·복구 자격 그대로).
- **실패** — 머지 전 검증 보류, `needs_human` 종단, `cleanup_failed`, 실패한 폐기(현행 해결 세션 재료 그대로).
- **외부 작업 완료** — 세션 소유 외부 대기의 `completing` 행(현행 `[세션에서 이어가기]` 조건 그대로).

결정: 내부 종류(`inquiry`·`resolve`·`external_resume`), pane 마커 셋, 창 이름, fork·같은 세션 재개 방식, 자동 기동 게이트는 바꾸지 않는다 — 사용자가 범위 밖으로 정했고 사용자에게 보이지 않는다.

### 3.2 두 버튼

**`[세션에서 이어가기]`**
- 대상 행에 서고, 그 Bead의 살아 있는 대화형 세션이 종류와 상관없이 하나라도 있으면 서지 않는다(`external_resume` 포함).
- 클릭 op는 하나이고 서버가 행 상태로 런처를 고른다: 확인 필요 → 문의 런처, 외부 작업 완료 → 외부 재개 런처, 실패 → 해결 런처.
- 자격과 유무는 `tileResolveFields` 하나가 정한다. 외부 작업 완료 자격은 서버 `wait-judgment`가 행에 투영하고 그 함수가 읽는다. PR 대기 행의 별도 술어는 같은 함수로 합친다.

**`[워커로 이어가기]`** — 대화 없이 Worker가 잇는다. 하는 일은 기존 op이고 이름만 맞춘다.

| 행 | 서는 조건 | 하는 일 |
| --- | --- | --- |
| 확인 필요 | 대화가 살아 있고 답 대기, 또는 결과 줄 없이 창이 사라짐(현행) | 대화 인계(현행) |
| 외부 작업 완료 | 현행 | Worker attempt로 fork 재개(현행) |
| 실패 — 머지 후 정리 | 현행 `정리 재시도`·`배포 재시도 후 정리`·`검증 재시도 후 정리` 자리·조건 | 정리 재시도(현행 op) |
| 실패 — 폐기 | 현행 폐기 `재시도` 조건 | 폐기 재시도(현행 op) |

- 머지 전 검증 보류와 `needs_human` 머지 게이트 행은 `[워커로 이어가기]`를 그리지 않는다 — 그 행에서 Worker가 잇는 조작은 `[머지]`다(§3.4 인계 표).
- 저장소 작업 타임라인 묶음도 같은 짝으로 그리고, 단계 꼬리(`— <단계> 단계부터`)는 `[워커로 이어가기]` 툴팁으로 옮긴다.
- 그대로 두는 조작: `[머지]`, `[폐기 포기]`, `[새 세션으로]`, `[지금 확인]`, `[관찰 중단]`, `[대기 해제]`, `폐기`.
- 결정: 실패 attempt 타일의 슬롯 1 재개 조작(`↻ 이어하기`·`↻ 정리 재시도`)은 바꾸지 않는다 — 세션 버튼이 서지 않는 행의 같은-attempt 재개 조작이고 짝의 대상이 아니다.
- 결정: 잔재 백업 폐기의 `백업 정리 재시도`·`백업 포기`는 바꾸지 않는다 — Bead 폐기 실패가 아니라 잔재 정리다.

**자리**: 짝은 슬롯 6 조작 줄에 `[세션에서 이어가기]` · `[워커로 이어가기]` 순서로 붙어 선다. PR 대기 행은 정리 실패 때 주 버튼 자리에 `[워커로 이어가기]`를 그리고 `[세션에서 이어가기]`를 바로 앞에 둔다. 2026-08-25 카드 문법 스펙 §5.1 슬롯 표에 `정정(UI-18a5)`을 단다.

### 3.3 첫 입력

- 세 종류 모두 dotfiles 형제가 정한 진입 블록의 바이트 사본을 첫 입력으로 쓴다. beads-ui는 블록이 정한 슬롯(멈춤·실패·완료 표기, 세션 문장 또는 진단, 경로, 외부 작업 완료 블록)만 채운다.
- 블록마다 sha256을 테스트로 고정한다(현행 문의 블록과 같은 방식).
- `buildResolvePrompt`와 외부 재개 리드 문장은 은퇴한다.

### 3.4 관측과 끝맺음

- 세 런처 모두 레코드에 `conversation`을 쓴다. 결과 줄 관측, 답 대기 판정, `❓ 답 대기`·`🙋 사람 인수` 알림이 종류와 상관없이 같은 규칙으로 돈다.
- `🙋 확인 필요`는 자동 기동에만 보낸다(현행). 실패의 `🚨 사람 필요`·`⏸️ 머지 보류`, 외부 작업의 `✅ 외부 작업 완료`는 그대로다.
- `인수 ·`: 창을 두고 Worker는 관찰만 한다. 정산은 현행(`bd_closed`·`done`·폐기). 그동안 짝 두 버튼만 숨기고 행의 나머지 조작은 그대로다.
- `보류 ·`: 창을 닫고 행은 그대로 남는다. 짝이 다시 선다. 알림은 없다.
- 결과 줄 없이 창이 사라짐: 확인 필요는 현행(`pane_gone`). 실패·외부 작업 완료는 행이 그대로 남고 짝이 다시 선다.

**`인계 ·`** — 창을 닫고 소멸을 확인한 pass가 그 행의 Worker 출구를 한 번 실행한 뒤 레코드를 지운다(현행 예약·재시작 규칙 그대로).

| 행 | 인계가 실행하는 것 |
| --- | --- |
| 확인 필요 | 현행 — 같은 attempt를 같은 세션으로 재개 |
| 실패 — 머지 후 정리 | 정리 재시도. 사람 클릭과 같은 권한(`job_retry_authorized`) |
| 실패 — 폐기 | 폐기 재시도 |
| 실패 — 머지 전 검증 보류 | 머지 큐 재등록(현행 `[머지]`와 같은 op) — 현재 head에서 검증이 다시 돈다 |
| 실패 — `needs_human` 머지 게이트 | 실행하지 않는다 — `보류`와 같이 끝나고 `[머지]`가 남는다 |
| 외부 작업 완료 | 그 대화 세션을 원천으로 Worker attempt 하나를 dispatch한다. fork·admission·실행 설정 규칙은 현행 외부 `[워커로 이어가기]`와 같고, 재개 프롬프트 첫머리에 `## 대화 결과` 블록을 둔다 |

- 결정: 머지 게이트 `needs_human`의 인계는 `[머지]`를 실행하지 않는다 — `[머지]` 재클릭은 그 head의 영수증 tier를 waive하고, 핀 정책은 영수증 보류 출구를 사람 전용으로 둔다(`receipt_hold`).
- 인계 실행 한 번은 사람 클릭 한 번이다. 자동 사다리 단계가 아니며 `script_retry` 횟수를 쓰지 않는다.
- 타임라인에 `대화 인계 · <행 종류> · <결과 줄>`을 남긴다.
- 실행 전 거절(행이 이미 정산됨·op 사전조건 실패·진행 중 조작)은 레코드를 지우고 이유를 카드(`이어가기 거절: <사유>`)와 타임라인에 남긴다. 행은 그대로이고 짝이 다시 선다.
- `↪ Worker가 이어감`은 인계가 실행을 시작했을 때 한 번 보낸다(`결정:`·`실행: <정리 재시도|폐기 재시도|머지 큐 재등록|attempt 재개>`).

### 3.5 표면 문구

- 대화형 세션 배지·대기 팝업·시각 줄의 종류 이름(`재개`·`해결`·`문의` 세션)은 `대화 세션` 하나로 쓴다. fork·같은 세션·새 세션 구분은 툴팁에만 둔다.
- 화면·알림·토스트·타임라인 사용자 행동 줄의 옛 이름 `[세션에서 해결]`과 실패 재시도 라벨을 새 짝 이름으로 바꾼다(§2 인용 위치 포함).
- 툴팁은 종류마다 그 행에서 일어날 일을 한 줄로 쓴다. 예: 실패 `[세션에서 이어가기]` "기록된 세션을 대화로 엽니다 — 인계하면 Worker가 실패한 단계를 다시 돌립니다".

### 3.6 Discord

- 스레드 이름표 하나는 dotfiles 형제가 브리지에서 바꾼다. beads-ui는 마커 셋을 그대로 쓴다.
- 알림 제목은 바꾸지 않는다.

### 3.7 정본 동기화와 적용 순서

1. **선행 확인**: dotfiles 형제가 closed이고 설치 증거가 readback된 뒤다. foreign `blocks` 때문에 그 전에는 이 Bead가 dispatch되지 않는다.
2. **이 PR**: 형제가 착지한 SHA에서 진입 블록 바이트와 바뀐 핀 사본(`generated/contracts/`)을 복사하고 다이제스트 테스트를 둔다. 핀과 런타임 변경은 한 PR이다 — 블록만 먼저 들어가면 현행 런처가 새 슬롯을 채우지 못한다.
3. **머지 → `[deploy]`**: `bdui-shared restart` 뒤 프로세스 경로·포트·`healthz` 소스 identity(target SHA)를 readback한다.
4. **배포 뒤 첫 reconcile**: 배포 시점에 살아 있던 `conversation` 없는 해결·외부 재개 레코드는 옛 규칙으로 정산한다.

## 4. 수용 기준

1. 확인 필요·실패·외부 작업 완료 행에 `[세션에서 이어가기]`가 서고, 살아 있는 대화형 세션(종류 무관)이 있으면 서지 않는다. 화면 어디에도 `[세션에서 해결]`·실패 카드의 `[정리 재시도]`·폐기 실패의 `[재시도]` 라벨이 없다.
2. 세 종류 세션이 dotfiles 진입 블록 바이트로 열리고, 다이제스트가 정본과 같다.
3. 세 종류 모두 결과 줄이 아닌 새 메시지마다 답 대기 판정과 `❓ 답 대기`가 한 번 나온다.
4. 실패 대화의 `인계 ·`는 창 소멸 뒤 §3.4 표의 실행을 한 번 하고, 머지 후 정리는 결과 미상 잡도 다시 돈다. 머지 게이트 `needs_human`은 아무것도 실행하지 않는다.
5. 외부 작업 완료 대화의 `인계 ·`는 창 소멸 뒤 Worker attempt 하나를 dispatch하고, 재개 프롬프트에 `## 대화 결과` 블록이 있다.
6. 확인 필요의 인계·인수·보류는 현행과 같다(UI-nuwy 회귀 없음).
7. `인수 ·`는 짝만 숨기고 `🙋 사람 인수`를 한 번 보낸다. `보류 ·`는 짝이 다시 서고 알림이 없다.
8. 인계 실행 전 거절은 카드와 타임라인에 이유를 남기고 짝이 다시 선다.
9. 대화형 세션 배지가 `대화 세션`으로 보인다. Worker·Monitor 화면이 같은 표면을 그리고, 390px·1280px 폭 넘침 탐침이 0이다.
10. 머지 뒤 §3.7 3단계 증거가 readback된다.

## 5. Test scope

- `app/views/worker/tile-resolve.test.js`: 세 자격, 종류 무관 살아 있는 세션 억제, PR 대기 행 같은 술어, 두 버튼 라벨.
- `server/ws/worker-handlers.resolve-session.test.js`: 클릭 하나가 행 상태로 세 런처를 고르는 것, 외부 작업 완료 행 수용.
- `server/worker/resolve-session.test.js`·`server/worker/external-wait/session-resume.test.js`: dotfiles 블록 바이트·다이제스트, `conversation` 기록.
- `server/worker/scheduler.test.js`: 종류별 결과 줄 처리, 인계 실행 표(정리 재시도 권한 포함, 머지 게이트 무실행, 외부 dispatch), 거절, 인수·보류, 옛 레코드 정산.
- `server/worker/wait-judgment.test.js`: 외부 완료 자격 투영, 세 종류 답 대기 verdict.
- `server/worker/notify.test.js`: 세 종류의 `❓`·`🙋 사람 인수`·`↪` 문구와 억제 키, 바뀐 버튼 이름.
- 렌더러 테스트(`running-grid`·`lanes`·`index`·`repo-ops-timeline`·Monitor): 짝 자리와 순서, 옛 라벨 부재.
- 저장소 기본 검증은 `AGENTS.md` Unit Testing Standards·Pre-Handoff Validation 그대로다. 폭 넘침은 `scripts/ui-overflow-probe.mjs`.

## 6. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다음 소유자가 앞 결과의 수용을 필요로 함 — 이 저장소가 소비할 정본(대화 계약 세 종류·진입 블록·버튼 어휘·실패 인계 권한·브리지 이름표)을 착지 | 없음 | dotfiles-xto5b |

- 형제가 정할 것: 세 종류의 진입 블록과 금지 범위, 실패·외부 작업 완료의 `인계` 의미와 권한(정책 핀의 사람 클릭 권한 포함), 버튼 어휘(`[세션에서 해결]` → `[세션에서 이어가기]`, needs-human 재진입 두 클릭의 이름), 브리지 이름표 하나, 거울 ADR `dotfiles-dolcw` 처분.
- 결정: 이 Bead의 구현은 형제 착지 뒤에만 시작한다(foreign `blocks`) — 진입 블록 바이트와 어휘의 정본이 형제다(ADR UI-u6ud-2).
- 관찰: 외부 작업 완료 대화의 `보류`는 현행처럼 대기 키가 이미 풀린 `open` Bead를 남긴다 — 그 뒤 처리는 현행 잔재 규칙이고 이 스펙은 바꾸지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — dotfiles 계약 subset을 핀 사본으로 소비한다.
- 전제: ADR UI-u6ud-4 — 실패 출구(`[머지]` 재클릭·세션·정리 재시도·`[폐기 포기]`)와 보류형 첫 입력의 의미를 따르고 버튼 이름만 바뀐다. 영수증 위조 판정의 출구는 사람 `[머지]`에 남긴다.
- 전제: ADR UI-u6ud-5 — `script_retry` 한 단계 사다리는 그대로이고 인계 실행은 사다리 단계가 아니다.
- beads-ui가 여는 대화형 세션(확인 필요·실패·외부 작업 완료)은 모두 `[세션에서 이어가기]` 하나로 열고 `인계`·`인수`·`보류`로 끝난다. `[워커로 이어가기]`는 대화 없이 Worker가 잇는 짝이며, `인계`는 그 행의 Worker 출구를 사용자 답의 권한으로 한 번 실행한다. 자동 기동은 사람 판단 멈춤에만 둔다.
  - 되돌리기 어려움: dotfiles 계약 어휘·진입 블록 핀, `tile-resolve.js` 술어, 클릭 라우팅, `scheduler.js` 인계 실행, `notify.js` 대화 알림, 카드 슬롯 표가 함께 움직인다.
  - 맥락 없이 놀라움: 실패 대화의 결과 줄 하나가 결과 미상 머지 후 잡을 다시 돌릴 수 있다. 같은 이름의 버튼이 행마다 다른 op를 부른다(뜻은 같다).
  - 실제 절충:
    - 얻는 것: 카드 어디서나 같은 두 버튼과 같은 끝맺음. 실패를 고친 뒤 사람이 다시 누를 필요가 없다.
    - 감수하는 것: 세션이 쓴 결과 줄을 사람 클릭으로 보는 권한 위임. 머지 게이트 위조 판정은 예외로 남는다.
    - 대안 둘과 기각 이유:
      - 종류별 표면 유지: 같은 이름이 다른 세션을 열어 혼동이 남는다.
      - 실패 인계는 창만 닫고 재시도는 사람이 누름: 버튼을 합쳐도 끝맺음이 종류마다 달라진다.
  - ADR UI-nuwy를 supersede한다. 소비자 집합(`wait-judgment` verdict·`notify` 대화 알림·`tile-resolve` 술어)을 공유하며, 그 결정의 대화 대상(멈춤만)과 `[세션에서 해결]`·`[워커로 이어가기]` 출구 조항을 넓히고 나머지는 승계한다.
  - `summary`: "beads-ui가 여는 대화형 세션(확인 필요·실패·외부 작업 완료)은 모두 [세션에서 이어가기] 하나로 열고 인계·인수·보류로 끝난다; [워커로 이어가기]는 대화 없이 Worker가 잇는 짝이고 인계는 그 행의 Worker 출구(같은 세션 재개·정리 재시도·폐기 재시도·머지 큐 재등록·attempt dispatch)를 사용자 답의 권한으로 한 번 실행하며 머지 게이트 위조 판정은 예외다; 자동 기동은 사람 판단 멈춤에만 두고 알림은 확인 필요·답 대기·Worker가 이어감·사람 인수 넷이다" → ADR, supersede UI-nuwy
- 대화형 레코드는 세 종류 모두 `conversation`을 갖고 정산 write에 `인계`(창 소멸 뒤 그 행의 Worker 출구 하나)·`보류`가 더해진다. 해결 세션의 fork 원천과 이력·생존·선점 조항은 승계한다.
  - 되돌리기 어려움: `queue-store.js` 레코드 필드, `scheduler.js` `reconcileInteractivePass` 정산, 세 런처의 레코드 쓰기가 함께 움직인다.
  - 맥락 없이 놀라움: fork로 연 해결 세션도 대화 레코드이고, 그 인계는 세션 재개가 아니라 행의 조작을 실행한다.
  - 실제 절충: 얻는 것은 정산 규칙 하나, 감수하는 것은 옛 레코드 읽기 호환 기간. 대안(종류별 정산 유지)은 끝맺음 통합을 막는다.
  - ADR UI-nuwy-2를 supersede한다. 소비자 집합(대화형 레코드·reconcile 정산)을 공유하며, "문의 종류만 `conversation`·인계·보류 정산" 조항을 세 종류로 넓히고 나머지는 승계한다. 위 후보와 소비자 집합이 달라 둘째 ADR(-2)로 둔다.
  - `summary`: "Worker 이력의 SoT는 bead별 append-only events.jsonl이고 queue.json은 살아 있는 상태만 담으며 살아 있는 queue.attempts는 bead 이력의 최신 접미다; 구현·리뷰 attempt의 생존·슬롯 점유·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다; beads-ui가 띄운 대화형 세션은 슬롯을 점유하지 않는 별도 큐 레코드로 투영되고 그 생존·종료만 reconcile이 소유하며, 세 종류(문의·해결·외부 재개) 모두 conversation을 갖고 정산에 인계(창 소멸 뒤 그 행의 Worker 출구 하나)·보류가 더해진다; Worker는 구현 attempt dispatch에서만 open Bead를 in_progress로 선점하고 session_ref는 쓰지 않는다" → ADR, supersede UI-nuwy-2
- 버튼·배지 이름(`[세션에서 이어가기]`·`[워커로 이어가기]`·`대화 세션`)과 슬롯 자리 — 기본 제외 목록(UI 배치·칩·버튼) → ADR 아님
- Discord 스레드 이름표 하나 — 이 저장소의 소비자가 없음(브리지는 dotfiles 소유) → ADR 아님
