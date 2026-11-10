---
scope:
  - server/limit-policy-settings.js
  - server/codex-active-return.js
  - server/claude-active-return.js
  - server/index.js
  - server/codex-credit-store.js
  - server/routes/codex-switch-candidate.js
  - server/ws/limit-policy-settings-handlers.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/notify.js
  - server/worker/state-paths.js
  - app/main.js
  - app/protocol.js
  - app/data/limit-policy-settings-store.js
  - app/utils/
  - app/views/settings-dialog/
  - app/views/usage-meter.js
  - app/views/worker/gate-labels.js
  - app/views/worker/provider-resume-dialog.js
  - app/views/detail-panel/exec-accounts.js
  - app/views/monitor/
  - docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md
  - docs/adr/
---

# 설정 창을 하나로 합치고 계정 전환을 저장소별·활성 계정 두 갈래로 나눈다 (UI-32oq)

## 1. 배경

2026-11-10 사용자 지적:
- 전역 한도 대응이 저장소 설정을 덮어쓰는 구조(UI-giog의 "적용 범위: 저장소별/전역")가 헷갈린다.
- 원하는 구조는 두 갈래다. 하나는 저장소별 전환이고, 다른 하나는 beads-ui에서 고르는 현재 로그인을 자동으로 바꾸는 활성 계정 자동 전환이다.
- default 계정이 차면 다른 계정을 쓰다가, 리셋되면 default 계정으로 돌아와야 한다.
- 설정 창의 탭 역할이 직관적이지 않다. 같은 헤더 ⚙가 어느 탭에서 누르느냐에 따라 다른 창을 연다. `세션` 탭의 값은 뜻을 알기 어렵다.
- 계정은 번호가 아니라 로그인 이메일로 보여야 한다.

같은 대화에서 정한 것:
- 두 갈래는 서로 덮어쓰지 않는다. 모든 저장소에 같은 값을 넣는 일은 "여러 저장소" 일괄 적용(값을 각 저장소에 실제로 적음)으로 한다.
- 전역 덮어쓰기를 없앨 때 각 저장소는 저장해 둔 값을 따른다.
- default 계정은 처음에 비워 두고 사용자가 직접 지정한다.
- 고정 계정이 빈 "기다림" 저장소는 활성 로그인을 따라가게 두고 경고만 한다.
- 세션 탭은 없앤다. 모드는 화면에서 빼고, Worker 주소는 저장소별 예외 칸을 없애고, base 동기화는 저장소 탭으로 옮긴다.
- 이름은 로그인 쪽이 "default 계정", 저장소 쪽이 "저장소 고정 계정"이다.

목업: `~/tmp/mockups/2026-11-10-beads-settings-reorg.html`. 목업과 이 스펙이 다르면 스펙이 정본이다(§4.6 이탈 목록).

## 2. 검증된 전제

기준 커밋: beads-ui `9db1d17e32207680f329a16e70b340bc44242803`, dotfiles `afc18441678b30a63b1ae68061bec69d03275e37`.

설정 창
- 헤더 ⚙는 보기가 모니터면 일괄 창(`scope: 'monitor'`), 아니면 연결 저장소 창을 연다 — app/main.js:1742-1747. 레포 띠 ⚙는 `scope: 'repo'`로 그 저장소 창을 연다 — app/main.js:1828. 프리셋 진입은 `open('execution')`이다 — app/main.js:1947
- 탭 배열이 셋이다. 연결 저장소는 워커·quick fix·세션·계정·표시, 레포 띠는 앞의 넷과 저장소, 일괄은 앞의 넷과 전역이다 — app/views/settings-dialog/index.js:44-50, :67-70, :79-82
- `전역` 탭은 프리셋 관리·판정 칩·활성 모델·대기·주기·외부 작업·한도 대응·대화 세션 일곱 절을 그린다 — app/views/settings-dialog/index.js:474-539
- 세션 탭은 모드(standard/fast_track, "Worker는 항상 fast_track"), Worker 주소(적용 주소·저장소 예외·공통 기본값), base 동기화를 그린다 — app/views/settings-dialog/execution-pane.js:2637-2708, :570-630. 일괄 창 세션 탭도 같은 세 행이다 — app/views/settings-dialog/bulk-pane.js:133-150
- 계정 탭은 `실행 계정` 두 행, 러너별 한도 대응, Codex 크레딧이다 — app/views/settings-dialog/execution-pane.js:2735-2746. 전역 적용 중이면 한도 대응 행이 잠긴다 — app/views/settings-dialog/limit-policy-editor.js:40
- 표시 정책은 연결된 워크스페이스에 묶인다 — server/ws/display-policy-handlers.js:55
- 레포 띠의 `저장소` 탭(동시 실행·직렬 레인·base·저장소 작업)은 Worker 탭에 같은 조작이 인라인으로 있어 레포 띠 창에만 있다 — app/views/settings-dialog/index.js:62-70; app/views/settings-dialog/repo-pane.js:223-305
- 모니터·Worker 의도된 차이 표에 "저장소별 조작: 모니터는 ⚙ `저장소` 탭" 행이 있다 — docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md:174
- 부품 규칙: 버튼은 `.op-btn`(+`--ghost`·`--icon`), 칩은 `.ui-chip`, 켜짐은 `is-active`다 — docs/design-system.md:92-109, :158

세션 탭 값의 의미와 현재 값
- `workflow_mode` 기본값은 standard다 — dotfiles docs/contracts/workflow-state.yaml:760. standard 대화형 세션만 진입 질문을 묻고 fast_track은 묻지 않는다 — dotfiles docs/contracts/workflow-contract.md:28
- Worker 주소는 저장소 `bdui_url` 예외가 공통값보다 우선한다 — dotfiles docs/contracts/workflow-contract.md:398
- base 동기화(`base_sync_accept_local_commits=true`)일 때만 로컬 main의 사용자 커밋을 새 base 위로 rebase해 push한다 — dotfiles docs/contracts/workflow-contract.md:189
- 2026-11-10 등록 저장소 22곳(WS `list-workspaces`)의 `bd -C <root> kv get workflow_session_defaults` 실측:
  - `workflow_mode`를 둔 곳은 없다.
  - `bdui_url` 예외는 4곳이고, 넷 다 공통값(`~/.config/dotfiles/worker.json`)과 같다.
  - base 동기화는 2곳만 켜져 있다.

한도 정책과 활성 계정 전환
- 전역 설정 파일은 러너별 `{ scope, mode, accounts, preempt_pct }`이다. `effectiveLimitPolicy`는 `scope: global`이면 전역 값으로 덮는다 — server/limit-policy-settings.js:1-37, :514-527. 소비자는 큐 저장소, 스케줄러, 후보 조회 API다 — server/worker/queue-store.js:6959; server/worker/scheduler.js:4207; server/routes/codex-switch-candidate.js:123
- 2026-11-10 `~/.local/state/bdui/limit-policy-settings.json` 실측: Claude는 `scope: repo`·`wait`, Codex는 `scope: global`·`switch`·계정 3개다.
- 2026-11-10 각 큐의 `provider_limit_policy.codex` 실측: 저장된 Codex 모드가 `wait`인 저장소는 Hippocampus·beads·design-system·oliveyoung 네 곳이다.
- 보류 판정 재결속 `rebindProviderSwitchVerdicts`는 지금 전역 설정 쓰기 처리에서만 부른다 — server/worker/queue-store.js:9734; server/ws/limit-policy-settings-handlers.js:110
- 활성 전환 패스는 다음처럼 동작한다 — server/codex-active-return.js:138-149, :200-252
  - `scope: global`·`switch`·허용 목록이 비지 않았을 때만 판정한다.
  - 활성 계정이 트리거 미만이면 `clear`로 끝낸다.
  - 활성 계정이 허용 목록에 없으면 바꾸지 않는다.
  - 잠금 아래에서 새 목록으로 다시 판정한 뒤 전환한다.
- Codex 타이머는 트리거 관측 중에만 돌고(`always_on: false`), Claude는 상시다 — server/codex-active-return.js:449; server/claude-active-return.js:136
- 후보 정렬: Codex는 허용 목록의 사용자 순서다 — server/worker/codex-switch-candidate.js:118-161. Claude는 상태 `ok`이고 판정 창이 있는 계정 중 주간 사용률 낮은 순이다 — server/claude-active-return.js:91-115
- 자동 전환과 수동 전환은 같은 `performAccountSwitch`를 쓰고, 수동은 HTTP 핸들러를 거친다 — server/index.js:254-260, :292-298; server/routes/account-switch.js:432
- 저장소 dispatch 계정은 이슈 핀 → 저장소 기본 → 활성 로그인(null) 순이다 — server/worker/scheduler.js:1301-1318. 한도 전환은 그 attempt 재개의 `exec_override`로만 실린다 — server/worker/scheduler.js:17525-17547. 그래서 보류가 풀린 뒤의 새 attempt는 저장소 고정 계정으로 돌아간다.
- 사용량 창은 `resetsAt`을 싣는다. Claude는 없는 창이 있고, Codex는 늘 있다 — server/routes/claude-usage.js:10, :58-62; server/routes/codex-usage.js:9, :97-101

계정 표시
- Claude 계정 키는 이메일이고, Codex 키는 `account_key`(user::workspace)다 — server/routes/claude-usage.js:137; server/routes/codex-usage.js:235
- 설정 창 선택지는 이미 이메일(`email (alias)`, Codex `email · plan`)이다 — app/views/detail-panel/exec-accounts.js:79-97; app/views/settings-dialog/account-catalog.js:108-112. 사용량 카드는 별칭이 있으면 이메일 대신 별칭을 보인다 — app/views/usage-meter.js:799-800
- 번호(`계정 #n`)나 원시 키가 나오는 곳은 다음과 같다.
  - 활성 전환 알림 — server/claude-active-return.js:139; server/codex-active-return.js:452
  - 크레딧 알림 — server/codex-credit-store.js:410
  - 보류 알림의 `계정:` 줄과 `계정 전환:` 줄 — server/worker/notify.js:901, :986
  - 실행 중 선제 전환 알림의 `계정 전환:` 줄 — server/worker/notify.js:999-1009
  - 보류 카드의 `전환 예정 <키>` — app/views/worker/gate-labels.js:146
  - 재개 대화상자의 목록 밖 계정과, 별칭을 먼저 보이는 목록 안 계정 — app/views/worker/provider-resume-dialog.js:418-419, :428
- 서버 전역 편집을 모니터 일괄 창의 전역 탭에 두는 조항이 ADR 셋에 있다: 칩 바인딩(ADR UI-rd2m `바인딩 편집 위치`), 활성 모델(ADR UI-gpac-2 `편집 위치`), 대화 세션 설정(ADR UI-57us) — docs/adr/UI-rd2m-exec-presets-and-chips-by-route.md:40; docs/adr/UI-gpac-2-model-visibility-hides-new-codex-pinned.md:58; docs/adr/UI-57us-session-preferred-default-session-lane.md:527
- "기본값 사용"·"실행 계정" 문구가 계정 선택에 쓰인다 — app/views/settings-dialog/account-catalog.js:125-131; app/views/settings-dialog/execution-pane.js:2739; app/views/settings-dialog/bulk-pane.js:1988; app/views/detail-panel/exec-accounts.js:118

## 3. 목표와 비목표

목표:
- 저장소 Worker의 한도 판정은 언제나 그 저장소에 저장된 정책을 쓴다.
- 서버 전역 설정은 러너별 활성 계정 자동 전환만 정한다: 켬/끔, default 계정, 옮겨 갈 계정, 옮기는 시점.
- 자동 전환이 default 계정에서 떠났으면, default 계정이 리셋된 뒤 default로 돌아온다.
- 모든 ⚙가 같은 창과 같은 탭 목록을 열고, 위쪽 대상만 다르다.
- 세션 탭을 없앤다.
- 계정은 모든 화면과 알림에서 이메일로 보인다.

비목표:
- 저장소 정책의 저장 형식과 Worker 후보 기준(80/90), 크레딧 규칙.
- dotfiles 계약의 키·기본값(`workflow_mode` 키는 계약에 남는다).
- 카드 슬롯과 보류 문구 체계. 계정 이름만 바뀐다.
- 대화형 세션이 몇 개 도는지 관측하는 일.

## 4. 설계

### 4.1 계정 전환 두 갈래

- 결정 — **전역 덮어쓰기 제거**: `scope`와 그 덮어쓰기를 없앤다. 큐 저장소·스케줄러·후보 조회 API는 저장소 정책을 정규화해 쓴다 (대안: 스위치 유지; 이유: 사용자 결정 — 덮어쓰기가 화면의 값과 실제 값을 갈라 놓았다).
- 결정 — **모든 저장소에 같은 값**: 일괄 창의 "여러 저장소" 적용으로 각 저장소에 적는다. 새 기능은 두지 않는다.
- 결정 — **전역 설정 모양**: 러너별 `{ auto_switch: boolean, default_account: string|null, accounts: string[], preempt_pct: number|null }`이다. 파일·revision CAS·fail-quiet 읽기·WS 채널은 UI-giog 선례를 잇는다. 예: 파일 이름과 채널 이름은 그대로 둔다.
- 결정 — **이전**: 서버가 시작할 때 옛 모양(`scope` 있음)을 읽으면, 새 모양으로 바꿔 CAS로 한 번 다시 쓴다.
  - `auto_switch`는 `scope === 'global' && mode === 'switch' && accounts.length > 0`이다.
  - `accounts`와 `preempt_pct`는 옮기고, `default_account`는 `null`이다.
  - 같은 쓰기에 `rebind_pending: [<scope: global이던 러너>]`를 함께 적는다. 해당 러너가 없으면 빈 배열이다.
  - 이전 쓰기가 실패하면 읽은 값을 새 모양으로 해석해 동작하고, 다음 시작 때 다시 시도한다.
- 결정 — **재결속은 끝날 때까지 이어 간다**: 시작할 때 `rebind_pending`이 비어 있지 않으면, 그 러너마다 모든 등록 저장소에서 `rebindProviderSwitchVerdicts`와 재평가를 부른다. 다 끝나면 CAS 쓰기로 그 러너를 목록에서 뺀다.
  - 재결속은 저장소 정책 값을 쓰지 않고 판정만 다시 묶으므로, 몇 번 되풀이해도 결과가 같다.
  - 중간에 멈추면(저장 직후, 일부 저장소 뒤) 다음 시작이 목록을 보고 처음부터 다시 한다.
  - 저장소 하나의 재결속이 실패하면 그 러너를 목록에 남기고 로그를 한 줄 쓴다. 다음 시작에 다시 한다.
  - 실측 기준 결과: Claude는 자동 전환 끔(지금과 같음), Codex는 자동 전환 켬(계정 3개)이고 `rebind_pending: ['codex']`다. Codex Worker는 저장소 값으로 돌아가며, Hippocampus·beads·design-system·oliveyoung은 기다림이 된다.
- 결정 — **default 계정**: 자동 전환이 출발·복귀하는 기준 계정이다. 허용 목록에 넣지 않아도 출발하고 돌아온다. 활성이 default도 허용 목록 안 계정도 아니면 바꾸지 않는다(지금 `active_not_allowed` 유지).

### 4.2 활성 계정 자동 전환과 default 복귀

떠남(지금 규칙 + default):
1. 자동 전환이 꺼졌거나 옮겨 갈 계정이 없으면 판정하지 않는다.
2. 활성 계정의 판정 창 중 트리거(`preempt_pct`, 없으면 100) 이상인 창이 있으면, 허용 목록에서 공급자 규칙으로 후보를 고른다. Codex는 사용자 순서, Claude는 주간 사용률 낮은 순이다. default가 복귀 조건을 채우면 default가 첫 후보다.
3. **떠남 기록** `{ default_account, to_account, until }`은 자동 전환이 성공한 뒤(전환 결과 `ok`)에만 쓴다. 쓰는 경우는 둘이다.
   - **생성:** 전환 전 활성이 default였을 때 새 기록을 쓴다. `to_account`는 옮겨 간 계정이다.
     - `until`은 트리거 이상이던 default 창들의 `resetsAt` 중 가장 늦은 시각이다.
     - 그 창 중 하나라도 `resetsAt`이 없으면 `until: null`이다.
   - **갱신:** 기록이 있고 전환 전 활성이 기록의 `to_account`였을 때(예: default A → B 뒤 B가 차서 C로) `to_account`만 새 계정으로 바꾼다. `default_account`와 `until`은 그대로 둔다.
   - 전환이 실패하면 기록을 건드리지 않는다.

복귀:
4. 떠남 기록이 있고 다음 조건을 모두 채우면 default로 바꾼다. 활성이 트리거 미만인 `clear` 상태에서도 판정한다.
   - 관측한 활성이 `to_account`다.
   - 기록의 `default_account`가 지금 설정의 default다.
   - `until`이 없거나 지났다.
   - 계정 목록에서 default 행의 상태가 `ok`이고, 판정 창이 하나 이상 보고됐으며, 그 창이 모두 트리거 미만이다.
   - default 행이 없거나 상태가 `ok`가 아니거나 판정 창이 없으면 복귀하지 않고 기록을 유지한다. 다음 주기에 다시 본다.
5. 관측한 활성이 default면 기록을 지운다(어떤 경로로 돌아왔든). 관측한 활성이 `to_account`도 default도 아니면 사람이 바꾼 것으로 보고 기록을 지운다. 터미널의 `cswap switch`도 여기에 해당한다. 단, 이 판정은 3의 갱신 뒤에 한다. 그래서 자동 전환으로 생긴 새 활성은 늘 `to_account`다. 설정에서 default를 바꾸거나 자동 전환을 끄면 기록을 지운다.

공통:
- 결정 — **떠남 기록은 재시작을 넘는다**: 서버 상태 파일에 둔다. 예: `$XDG_STATE_HOME/bdui/active-login-return.json`. 읽기는 fail-quiet이고, 깨졌거나 없으면 기록 없음이라 복귀하지 않는다 (대안: 메모리; 이유: 머지마다 재배포되어 복귀가 사라진다).
- 결정 — **안전장치는 복귀에도 같다**: 공급자 잠금, 새 목록으로 잠금 아래 재판정, 보류 계정·실행 중 계정 제외(Claude `sessionLoginOwn` 예외), Codex `accountless_run` 거름, Claude 전환 직후 오류 귀속.
- 결정 — **Codex 타이머**: 떠남 기록이 있는 동안에도 돈다.
- 결정 — **복귀 시점은 하나**: "리셋되면 바로"만 둔다 (대안: 목업의 "실행 중 세션이 없을 때"; 이유: beads-ui가 띄우지 않은 대화형 세션은 관측할 수 없다). Claude 복귀는 실행 중 세션도 곧 새 계정을 쓰게 한다. 알림에 그렇게 적는다.
- 알림(`ops`):
  - 떠남은 `🔁 Claude 활성 계정 자동 전환 — <from 이메일> → <to 이메일>`이다.
  - 기록이 있으면 복귀 안내를 덧붙인다. `until`이 있으면 `default 리셋 <HH:MM> 뒤 복귀`이고, `until: null`이면 `default 사용량 회복 확인 뒤 복귀`다.
  - 복귀는 `↩ Claude default 계정으로 복귀 — <from> → <default>`다.

### 4.3 계정 표시

- 결정 — **표시 이름 하나**: 한 포맷터가 서버 알림과 화면을 모두 맡는다.
  - 기본은 이메일이다. 별칭이 있으면 `이메일 (별칭)`이다.
  - Codex는 같은 목록에 같은 이메일이 둘 이상이면 `이메일 · plan`이고, 그래도 같으면 뒤에 `#번호`를 붙인다.
  - 키로 목록에서 행을 찾지 못하면 지금처럼 키나 번호를 그대로 보인다(fail-quiet).
- 적용할 곳: §2 "번호나 원시 키가 나오는 곳" 전부(알림 여섯 곳: 활성 전환 둘·크레딧·보류 `계정:`·보류 `계정 전환:`·실행 중 선제 전환, 보류 카드, 재개 대화상자의 목록 안·밖 계정)와 사용량 카드. 카드와 대화상자는 별칭만 보이지 않고 위 규칙을 쓴다.
- 카드 줄의 이메일은 줄여 쓰지 않는다. 지역부만 쓰면 도메인만 다른 두 계정이 같아 보인다. 넘치면 그 토큰 안에서 줄바꿈한다.
- 설정 화면 문구는 `실행 계정`을 `저장소 고정 계정`으로 바꾼다. 선택지 `기본값 사용 — 현재 로그인(…)`은 `비움 — 활성 로그인(…)`으로 바꾼다. 이슈 상세의 `레포 기본값 사용(…)`은 `저장소 고정 계정(…)`이다.

### 4.4 설정 창 하나

- 결정 — **같은 창·같은 탭**: 어느 ⚙든 탭 목록이 같다. 처음 열리는 대상만 다르다.
  - 헤더 ⚙(모니터 밖) → 연결 저장소
  - 레포 띠 ⚙ → 그 저장소
  - 모니터 헤더 ⚙ → 여러 저장소
  - 처음 탭은 `실행`이다. `open('execution')`도 `실행`이다.
- 창 위쪽에 `대상: [저장소 하나 | 여러 저장소]`와 저장소 선택을 둔다. 대상을 바꾸면 대상 탭 패널을 그 대상으로 다시 묶는다. 저장 전 입력은 창을 닫을 때와 같이 버린다.
- 탭(레일을 두 묶음으로 나눈다):

| 묶음 | 탭 | 내용 | 지금 위치 |
| --- | --- | --- | --- |
| 대상 저장소 | 실행 | 워커 블록(일반 프리셋 바·행·워커 지침 접힘), quick fix 블록(quick fix 프리셋 바·8행, 기본 접힘·요약 한 줄) | 워커·quick fix 탭 |
| 대상 저장소 | 계정 | 저장소 고정 계정, 러너별 "차면"(기다림/다른 계정으로·옮겨 갈 계정·미리 옮기기), 크레딧, 활성 로그인 상태 한 줄과 `활성 계정` 탭 링크 | 계정 탭 |
| 대상 저장소 | 저장소 | 동시 실행 수·직렬 레인·base, main 동기화, 저장소 작업, 저장만 된 값 | 레포 띠 창, 세션 탭 |
| 대상 저장소 | 표시 | 라벨·칩 표시 | 연결 저장소 창 |
| 서버 전체 | 활성 계정 | 러너별 자동 전환·default 계정·옮겨 갈 계정·옮기는 시점, 지금 상태 한 줄 | 전역 탭 한도 대응 |
| 서버 전체 | 프리셋·모델 | 프리셋 관리, 판정 칩 프리셋, 활성 모델 | 전역 탭 |
| 서버 전체 | 운영 | Worker 공통 주소, 대기·주기, 외부 작업, 대화 세션 | 전역 탭, 세션 탭 |

- 여러 저장소 대상:
  - `실행`·`계정`은 지금 일괄 편집면 그대로다.
  - `저장소`·`표시`는 "저장소 하나를 고르세요"를 보인다.
  - main 동기화의 일괄 편집은 두지 않는다. 켠 저장소가 2곳뿐이다.
- `표시`는 대상이 연결 저장소일 때만 편집하고, 아니면 "연결된 저장소(<이름>)에서만 바꿀 수 있습니다"를 보인다.
- 계정 탭 경고: 그 러너의 모드가 기다림이고, 고정 계정이 비었고, 그 러너의 활성 계정 자동 전환이 켜져 있으면 다음 경고를 단다. "고정 계정이 비어 있어 활성 계정 자동 전환을 따라갑니다. 기다림을 지키려면 고정 계정을 고르세요." 잠금은 없다.
- `활성 계정` 상태 한 줄: 지금 활성 계정, 떠남 기록이 있으면 "default <이메일> 리셋 <HH:MM> 뒤 복귀"(`until: null`이면 "default <이메일> 사용량 회복 확인 뒤 복귀"). 고정 계정이 없는 저장소의 Worker도 이 로그인을 쓴다는 안내를 단다.
- 사용량 카드:
  - 계정 행마다 ★ 버튼(`.op-btn--ghost --icon`)을 둔다. 누르면 그 러너의 default 계정이 되고, default 행을 다시 누르면 비운다.
  - 머리 한 줄에 `자동 전환 켬/끔 · default <이메일>`과, 복귀 대기 중이면 복귀 시각을 보인다.
  - 쓰기는 같은 설정 채널(CAS)이다. 충돌이면 토스트를 띄우고 다시 그린다.

### 4.5 세션 탭 제거

- 결정 — **모드 행 제거**: 화면에서 뺀다 (이유: 어느 저장소도 쓰지 않고, 필요하면 세션에서 말로 바꾼다).
- 결정 — **Worker 주소**: 저장소별 예외 입력을 없앤다. 공통 주소의 조회·편집은 `운영` 탭에 둔다. 상태와 resolver 경고만 보이고, 연결 점검 API는 두지 않는다.
- 결정 — **저장만 된 값**: 대상 저장소에 편집 칸이 없어진 값(`bdui_url` 예외, `workflow_mode`)이 저장돼 있으면, `저장소` 탭에 읽기 전용 한 줄과 `지우기`(`.op-btn`)를 보인다. 없으면 그리지 않는다 (이유: 예외 주소는 공통값보다 우선해, 보이지 않으면 공통값을 바꿔도 그 저장소만 옛 주소로 남는다).
- base 동기화는 `저장소` 탭의 `main 동기화` 묶음으로 옮긴다. 행 이름은 `main에 직접 한 커밋`, 선택은 `위에 다시 쌓아 push` / `손대지 않음`이다.
- 서버의 세션 기본값 읽기·쓰기 경로는 그대로다(화면만 줄인다).

### 4.6 목업과 다른 점 (스펙이 정본)

- 프리셋 바: 목업은 한 바가 워커와 quick fix를 함께 채웠지만, 계열별 프리셋(UI-rd2m) 그대로 두 블록에 각자 바를 둔다.
- 복귀 시점: 세 선택이 아니라 "리셋되면 바로" 하나다.
- `표시`: 서버 전체가 아니라 대상 저장소 묶음이다.
- Worker 주소의 "응답 정상" 칩: 두지 않는다.
- 계정 이름: `#n`과 "평소 계정"이 아니라 이메일과 "default 계정"이다.
- `세션` 탭: 목업 2판에서 이미 뺐고, 1판의 "세션 모델" 행은 실재하지 않는다.

### 4.7 오류 처리

- 설정 파일 읽기 실패: 두 러너 모두 자동 전환 끔으로 읽는다. 저장소 정책에는 영향이 없다.
- 계정 목록 읽기 실패, 또는 default 행의 상태·판정 창이 부족함: 판정하지 않고 떠남 기록을 유지한다.
- 이전·재결속 실패: §4.1대로 `rebind_pending`에 남겨 다음 시작에 다시 한다.
- 전환 실패: 로그만 남기고 기록은 그대로 둔다. 다음 주기에 다시 판정한다.
- 표시 이름을 찾지 못하면 키나 번호로 보인다.

## 5. 테스트

- 설정 모양 이전: 옛 모양 → 새 모양 매핑과 `rebind_pending`, `scope: global` 러너만 목록에 오름, 이전 쓰기 실패 시 다음 시작에 재시도.
- 재결속 재개: 이전 저장 직후 중단, 일부 저장소 처리 뒤 중단, 저장소 하나 실패 — 각각 다음 시작이 목록대로 다시 하고 끝나면 목록에서 뺀다.
- 덮어쓰기 제거: 큐 저장소·스케줄러·후보 API가 전역 설정과 무관하게 저장소 정책을 읽는다.
- 활성 전환:
  - default에서 떠날 때 `until`(최대 `resetsAt`, 없으면 null)을 기록한다.
  - A→B→C 자동 전환에서 `to_account`가 C로 갱신되고 C를 수동 선택으로 보지 않는다. A→B→C→A 전체가 통한다.
  - 전환 실패 시 기록이 그대로다.
  - `clear` 상태에서 복귀하고, 리셋 전에는 복귀하지 않는다.
  - default 행이 `ok`가 아니거나 판정 창이 없으면 복귀하지 않고 기록을 유지한다.
  - 관측 활성이 제3 계정이면 기록을 지우고, 활성이 default면 기록을 지운다. default를 바꾸거나 끄면 기록을 지운다.
  - 재시작 뒤 기록이 유지된다.
  - 보류·실행 중·`accountless_run` 거름이 복귀를 막는다.
  - Codex 타이머가 기록이 있는 동안 돈다.
  - `until: null`의 알림·상태 줄 문구가 맞다.
- 표시 이름: 이메일, 별칭, Codex 같은 이메일 구분, 찾지 못한 키. 알림 여섯 곳과 보류 카드·재개 대화상자(목록 안·밖)·사용량 카드가 그 포맷터를 쓴다.
- 설정 창: 세 진입점의 탭 목록이 같고 처음 대상이 다르다, 대상 전환, 여러 저장소에서 `저장소`·`표시` 안내, 세션 탭 없음, 저장만 된 값 줄과 지우기, 계정 탭 경고 조건, 잠금 없음, 사용량 카드 ★ 쓰기와 충돌.
- 의도된 차이 표 행 갱신 뒤 카드 동일성 테스트가 그대로 통과한다.

## 6. 구현 unit 후보

- `server`: 설정 모양·이전·재결속, 덮어쓰기 제거, 떠남 기록과 복귀(두 패스 공유 흐름) — `server/limit-policy-settings.js`, `server/codex-active-return.js`.
- `labels`: 표시 이름 포맷터와 알림·카드·대화상자 적용 — `app/utils/`, `server/worker/notify.js`.
- `settings`: 창 하나·탭 재구성·세션 탭 제거·저장소/운영/활성 계정 탭·사용량 카드 ★·의도된 차이 표 — `app/views/settings-dialog/`.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — beads-ui는 계약 키를 정의하지 않는 소비자다. 화면에서 `workflow_mode` 행을 빼도 키·기본값은 dotfiles가 정한다.
- 한도 대응 덮어쓰기를 없애고 전역 설정을 활성 계정 자동 전환과 default 복귀로 바꾼다. 되돌리기 어렵다: 큐 저장소·스케줄러·후보 API의 정책 읽기, 두 활성 패스, 설정 파일 모양과 이전(`rebind_pending`), 보류 재결속, 떠남 기록 상태 파일이 함께 움직인다. 소비자 집합은 서버 판정과 설정 파일이다. 아래 설정 창 후보와는 계정 탭·활성 계정 탭이 그리는 값만 겹치고, 탭 배치·편집 위치는 건드리지 않는다. 맥락 없이는 놀랍다: 같은 파일이 어제는 Worker를 덮었고 오늘은 로그인만 바꾼다. 실제 맞교환이 있다: 일괄 적용(값 복사)과 덮어쓰기 중 하나를 골랐다. `summary`: "한도 대응은 Worker 판정에 저장소 정책만 쓰고 전역 덮어쓰기는 없으며, 서버 전역 설정은 러너별 활성 계정 자동 전환(켬/끔·default 계정·허용 목록·트리거)만 정한다; 활성 계정이 트리거에 닿으면 허용 목록 후보로 옮기고, default에서 떠난 기록은 재시작을 넘어 남아 그 소진 창의 리셋 시각이 지나고 default의 창이 모두 트리거 미만이면 default로 돌아오며, 관측한 활성 계정이 기록과 다르면 사람이 바꾼 것으로 보고 복귀하지 않는다 — 나머지 조항은 UI-giog 그대로다" → ADR, supersede UI-giog
- 모든 ⚙가 같은 창·같은 탭 목록을 열고, 서버 전역 편집(칩 바인딩·활성 모델·대화 세션 설정·Worker 공통 주소)이 어느 창에서나 대상과 무관한 서버 전체 탭에 있으며, Worker 주소의 저장소별 예외 입력은 없애고 저장된 예외는 읽기 전용 줄과 지우기로만 다룬다. 되돌리기 어렵다: 세 진입점, 탭 배열, 일괄 편집면, 칩 바인딩·활성 모델·대화 세션 절의 편집 위치, Worker 주소 세 값 화면, 의도된 차이 표가 함께 움직인다. 이 소비자 집합은 설정 창 배치이고, UI-rd2m·UI-gpac-2·UI-57us·UI-u6ud-11이 각각 "모니터 일괄 창 전역 탭에만"이나 "저장소 예외를 따로 보인다"로 같은 화면을 정했으므로 넷을 함께 대체한다. 맥락 없이는 놀랍다: 네 ADR은 저장소 하나 창에 서버 전역 값을 섞지 않고, 계약이 허용하는 예외를 화면에서 편집하게 했다. 실제 맞교환이 있다: 레일을 대상 묶음과 서버 전체 묶음으로 나눠 섞임을 막는 대신 진입점별 창을 버리고, 예외 편집 자유 대신 공통값과 같은 예외가 숨어 남는 일을 막는다. `summary`: "설정 창은 어느 ⚙에서 열든 같은 탭 목록이고 처음 대상(연결 저장소·그 저장소·여러 저장소)만 다르며, 레일은 대상 저장소 탭과 서버 전체 탭으로 나뉘어 칩 바인딩·활성 모델·대화 세션 설정·Worker 공통 주소는 서버 전체 탭에서 대상과 무관하게 편집하고, Worker 주소의 저장소 예외는 저장돼 있을 때만 그 저장소 탭에 읽기 전용으로 보이며 지우기만 허용한다 — 프리셋 정체성·판정 칩 규칙(UI-rd2m), 모델 활성 규칙(UI-gpac-2), 세션 레인·대화 규칙(UI-57us), 적용값 분리·CLI 전용 공통 쓰기·fail-quiet 읽기(UI-u6ud-11)는 그대로다" → ADR, supersede UI-rd2m · UI-gpac-2 · UI-57us · UI-u6ud-11
- 계정을 이메일로 보이는 표시 이름 규칙 — 되돌리기 쉬운 표시 규칙 → ADR 아님
- 세션 탭 모드 행 제거와 base 동기화 행 이동 — 기본 제외 목록: 화면 배치 → ADR 아님
