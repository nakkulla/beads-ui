---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/wait-judgment.js
  - server/worker/session-stall.js
  - server/timing-settings.js
  - app/utils/failure-sentences.js
  - app/protocol.md
---

# 보류로 바뀌지 않은 provider 대기의 시간 기반 재개 (UI-v4cc)

## 1. 목표

Worker 세션이 `대기 · recovery:provider`로 끝났는데 Worker가 그 한도를 공급자 보류로 바꾸지 못하면, 그 대기는
지금 풀어 줄 장치도 사람에게 묻는 장치도 없다. 이 스펙은 그 대기에 출구를 준다.

- Worker가 같은 세션을 1시간 뒤, 다시 같은 결말이면 5시간 뒤에 자동으로 이어 간다.
- 두 번의 자동 재개가 모두 같은 결말로 끝나면 기존 "같은 원인 반복" 규칙이 그 대기를 `no_progress`로 올리고,
  같은 세션 대화가 자동으로 열려 사람에게 묻는다.
- 카드는 다음 자동 재개 시각을 보여 준다.

사례(2026-11-12): dotfiles-j4c1x attempt `dotfiles-j4c1x-1794409618084-9`는 Codex 러너였고, 재현용으로 셸에서
띄운 Claude Code 세션이 HTTP 429(`You've hit your 5-hour limit · resets 1am`)를 받았다. 세션은
`대기 · recovery:provider`로 끝났고, 한도는 01시에 풀렸지만 attempt는 `waiting`으로 6시간 넘게 남았다. 자동 재개,
Discord 알림, 대화 기동, 일반 디스패치 가운데 어느 것도 일어나지 않았다. 사용자는 이것이 무산인지 대기인지 알 수
없었다.

비목표: 셸에서 띄운 다른 공급자 프로세스의 한도 문장을 보류 증거로 읽는 일, Codex 러너에 복구 대기 분류기를
더하는 일, 대화 대상 사유 집합에 `provider`를 넣는 일.

## 2. 검증된 전제

- 세션의 `recovery:provider` 결말은 러너 어댑터의 복구 분류기가 증거를 줄 때만 보류가 되고, 분류기가 없으면 판정
  없이 끝난다 — server/worker/scheduler.js:3180, server/worker/scheduler.js:3196
- 복구 분류기는 Claude 어댑터에만 있고 Codex 어댑터에는 없다. 그래서 Codex 러너 attempt의 `recovery:provider`는
  보류가 될 길이 없다 — server/worker/runner/claude.js:946, server/worker/runner/codex.js:526
- 보류가 되지 않은 복구 결말은 `session_recovery_wait`로 기록되고 사유 토큰을 그대로 싣는다 —
  server/worker/scheduler.js:7974, server/worker/failure-class.js:543
- 대화 대상 복구 사유는 `authority`·`no_progress`·`credential` 셋이고 `provider`는 없다 —
  server/worker/session-stall.js:18
- 복구 대기는 일반 큐 디스패치에서 제외되고, 사람의 `worker-attempt-resume`도 거절된다 — app/protocol.md:717,
  app/protocol.md:742
- 공급자 보류 해제 receipt의 자동 재개는 복구 대기 레코드를 `recovery_wait`로 거절한다 —
  server/worker/scheduler.js:18413
- 스케줄러의 재개 함수는 복구 대기 레코드를 재개 대상으로 받고, 자동 재개 표지가 붙은 호출은 같은 원인 반복 수가
  2 이상이면 `no_progress`로 거절한다 — server/worker/scheduler.js:17534, server/worker/scheduler.js:17547
- 같은 원인 반복은 `resumed_from` 조상 한 단계와 진행 키(원인·분류·요약·head·검증·PR·실행 프리셋)를 비교해 세고, 2회째에
  `two_no_progress_repeats`로 올린다. 사람 대화를 거친 재개는 그 수를 잇지 않는다 —
  server/worker/scheduler.js:6618, server/worker/scheduler.js:6643, server/worker/scheduler.js:6666
- 살아 있는 세션 레인 창은 `recovery_wait` 결말에도 창·claim·슬롯을 유지한다 — server/worker/session-lane.js:158
- attempt 레코드의 재개 종류 필드는 `provider_outage`·`account_switch` 밖의 값을 저장 때 `null`로 지운다 —
  server/worker/queue-store.js:4341
- 복구 정책 준비 판정(`workRecoveryReady`)은 복구 계약과 저장소 작업 정책 둘 다 지원될 때만 참이고, 보존 실패 재분류는
  준비되지 않으면 아무것도 하지 않는다. 스케줄러의 `resume()`은 이 판정을 보지 않는다 —
  server/worker/work-recovery-policy.js:215, server/worker/scheduler.js:13728
- `no_progress`로 기록된 복구 대기는 기록 직후 대화 기동을 부르고, `🙋 확인 필요`는 멈춘 attempt당 한 번 보낸다 —
  server/worker/scheduler.js:6878, server/worker/scheduler.js:6497
- 소급 리프 한도 판정은 판정 표식이 없는 provider 대기를 reconcile에서 한 번 읽어 보류로 바꿀 수 있다 —
  server/worker/scheduler.js:13835, server/worker/scheduler.js:10785
- 카드의 복구 대기 행은 대화 대상이 아니면 판정 없이 세션 조작만 붙이고, 시계는 `since`만 싣는다. `next_check_at`
  시계는 이미 다른 대기 종류가 쓴다 — server/worker/wait-judgment.js:835, server/worker/wait-judgment.js:854,
  server/worker/wait-judgment.js:496
- provider 대기의 카드 문장은 "공급자·사용량 조건 해제를 기다리며, 회복이 확인되면 이어갈 수 있습니다."다 —
  app/utils/failure-sentences.js:158
- 재시도 사다리 지연은 서버 타이밍 설정이 소유하고 사다리마다 단 수·최소·최대가 고정돼 있다 —
  server/timing-settings.js:66, server/timing-settings.js:86
- 배포 조건 대기는 레코드에서 다음 재확인 시각을 유도해 reconcile 패스가 시작한다 —
  server/worker/scheduler.js:10828
- 현행 ADR은 "공급자 보류로 바뀌지 않은 세션 선언 `provider`는 대화 대상이 아니다"라고 정하고, 그 대기의 처리는
  2026-10-10 사용자 결정으로 범위 밖에 두었다 — docs/adr/UI-7gv4-worker-url-common-only.md:917,
  docs/adr/UI-7gv4-worker-url-common-only.md:380
- 교차 멤버 설계는 "정해진 간격의 맹목 재시도"를 재개 비용과 같은 실패 반복을 이유로 기각했다. 그 자리에는 해제를
  판정할 프로브 target이 있었다 — docs/adr/UI-d9c1-limit-policy-under-limit-candidates.md:482
- dotfiles 계약은 결과 줄을 대기 의도로만 읽고 재개 자격의 증거로 보지 않으며, 복구는 기존 attempt 계보와 재시도
  예산을 재사용하고 별도 상태 기계를 두지 않는다 — dotfiles `docs/contracts/workflow-state.yaml`의 `work_recovery`
  블록을 `awk '/^work_recovery:/{f=1} f' docs/contracts/workflow-state.yaml`로 읽음
- 지금 저장된 큐에는 보류 없는 provider 대기 행이 없다(dotfiles-j4c1x는 2026-11-12에 사람 클릭으로 재개됐다) —
  `~/.local/state/bdui/*/queue.json` 전부에서 최신 구현 attempt가 `waiting`·`recovery.reason=provider`이고 어느 보류
  멤버·target에도 없는 행을 세는 스크립트 실행 결과 0건
- 미확인: Codex 세션이 셸에서 띄운 다른 공급자 프로세스의 한도를 구조화된 이벤트로 남기는지 — 사례의 영속 로그에는
  셸 출력의 산문 429 문장만 있었고 다른 형태는 조사하지 않았다

## 3. 설계

### 3.1 대상

대상은 "보류 없는 provider 대기"다. 다음을 모두 만족하는 Bead의 최신 구현 attempt를 말한다.

- `status`가 `waiting`이고 `cause`가 `session_recovery_wait`이며 `cause_detail.recovery.reason`이 `provider`다.
- 어느 공급자 보류의 멤버도 target도 아니다.
- 소급 리프 한도 판정이 쓰는 제외 조건에 걸리지 않는다: 철회·정리(✕)·완료 레인·폐기 진행·Worker claim·진행 중인
  재개·같은 Bead의 실행 중이거나 그 레코드에서 이어진 다른 attempt.

실행 방식(headless·세션 레인)과 러너는 가리지 않는다. 다만 세션 레인 attempt는 창이 살아 있는 동안
`recovery_wait` 결말에도 정산되지 않고 그 창에서 사람 답을 기다리므로, 창이 닫혀 `waiting`으로 정산된 뒤에만 대상이
된다. `no_progress`로 올라간 레코드는 사유가 `provider`가 아니므로 대상이 아니다.

결정: 대상 판정은 소급 리프 한도 판정의 후보 규칙에서 "판정 표식 없음" 조건만 뺀 것과 같은 술어를 쓴다 — 두 판정이
같은 행을 다르게 보면 보류로 바뀐 행을 다시 재개하는 경합이 생긴다.

### 3.2 재개 시각

재개 시각은 레코드에서 유도한다. 저장하는 새 필드는 없다.

- 재개 시각 = `finished_at` + 사다리[단]. 단은 그 레코드의 같은 원인 반복 수(`cause_detail.recovery.no_progress.count`,
  없으면 0)다.
- 사다리는 서버 타이밍 설정의 새 키 하나다. 2단이고 기본값은 3600초·18000초, 최소 60초·최대 21600초로 다른 재시도
  사다리와 같은 범위를 쓴다. 예: `provider_wait_resume_delays_seconds`.
- 반복 수가 2 이상인 레코드는 §3.1에서 이미 대상이 아니므로 세 번째 단은 없다.

결정: 대기 문장의 초기화 시각(`resets 1am` 같은 산문)은 읽지 않는다 — 형식이 공급자·버전마다 다르고, 부분 문자열
증거는 ADR UI-d9c1이 이미 기각했다.
결정: 기본 지연은 1시간·5시간이다 — 일시 과부하는 1시간 안에 풀리는 일이 많고, 둘을 더한 6시간은 5시간 사용량 창이
어디서 시작했든 한 번의 초기화를 넘긴다.
결정: 재개 시각을 레코드에 저장하지 않는다 — 유도 값이면 서버 재시작과 이 변경 이전에 저장된 행이 이행 없이 같은
규칙을 따르고, dotfiles 계약이 금지한 별도 복구 상태가 생기지 않는다.

### 3.3 재개 실행

재개 시각이 지난 대상은 Worker가 같은 세션으로 한 번 재개한다.

- 시점: reconcile 패스가 대상을 훑어 만기를 재개하고, 가장 이른 미래 재개 시각에 워크스페이스 타이머 하나를 건다.
  타이머는 메모리에만 있고 재시작 뒤에는 reconcile 패스가 다시 건다.
- 경로: 사람 대화 복귀가 쓰는 스케줄러 재개 함수를 그대로 쓴다. 기록된 세션·러너·실행 설정을 잇는 `prior_attempt`
  이어하기이고, 자동 재개 표지를 달아 기존 `no_progress` 거절이 그대로 적용된다. 새 attempt는 `resumed_from`으로
  조상을 가리키고 `conversation_return`을 싣지 않으므로 반복 수가 이어진다.
- 재개 종류 표지는 기존 `provider_outage`·`account_switch`와 구분되는 새 값이다. 예: `provider_wait`. 보류 해제
  receipt가 아니므로 계정 override·전환 출처·receipt 소비는 없고, 계정은 일반 재개와 같은 규칙으로 해석한다.
- 재개 프롬프트의 첫 문장은 조상이 실패가 아니라 `대기 · recovery:provider`로 끝났고 예약된 대기 시간이 지났음을
  말한다. 이어서 조건이 풀렸는지 먼저 확인하고, 여전히 막혀 있으면 같은 결과 줄로 끝내라고 적는다.
- 재개가 거절되면(세션 ID 없음, 워크트리 없음, Bead 실행 중, 러너 보류, `auto_advance` 꺼짐 등) 레코드는 그대로 두고
  다음 reconcile 패스에서 다시 본다. 거절은 단을 쓰지 않는다. 반복 수는 실제로 끝난 attempt만 올린다.
- `auto_advance`가 꺼진 워크스페이스에서는 재개하지 않는다. 다시 켜지면 그때 만기인 대상이 재개된다.
- 복구 정책 준비 판정(`workRecoveryReady`)이 거짓이면 만기 재개를 하지 않고 타이머도 걸지 않는다. dotfiles 계약의
  `work_recovery.unknown_schema: hold_automatic_resume` — 지원되지 않는 계약에서는 자동 재개를 보류한다 — 을 따른다.
- 새 재개 종류 값은 attempt 레코드의 재개 종류 필드가 받는 값에 더해, 저장·재로딩 뒤에도 남는다.

타임라인에는 재개마다 한 줄을 남긴다. 예: `provider 대기 자동 재개 · 1/2`. Discord 알림은 보내지 않는다.

결정: 재개는 새 세션이 아니라 기록된 세션을 잇는다 — 한도로 멈춘 세션은 작업 맥락을 그대로 갖고 있고, dotfiles 계약의
재개 전제(`same_work_path_and_approval`, `existing_execution_selection`)가 같은 실행 선택을 요구한다.

### 3.4 반복 뒤 사람에게 넘김

새 판정은 없다. 두 번째 자동 재개가 다시 같은 진행 키로 `recovery:provider`를 남기면 기존 규칙이 그 레코드를
`two_no_progress_repeats`·사유 `no_progress`로 기록한다. 그 뒤는 현행 그대로다: 같은 세션 대화 자동 기동, attempt당 한
번의 `🙋 확인 필요`, 살아 있는 대화가 없을 때의 `action_required`와 `[세션에서 이어가기]`.

진행이 있는 경우(head가 움직였거나 검증 결과가 달라진 경우)는 진행 키가 달라 반복 수가 0에서 다시 시작하고, 재개도
1시간 단부터 다시 선다.

결정: 재개 횟수의 별도 상한을 두지 않는다 — 멈춤 조건은 기존 "같은 원인 2회 반복" 하나이고, 진행이 있는 재개를 막을
이유가 없다. 기본 설정에서는 최소 간격이 1시간이라 헛재개가 하루 24회를 넘지 않는다. 설정 최솟값(60초)으로 낮추면 그만큼
잦아지며, 이는 다른 재시도 사다리와 같은 운영자 선택이다.

### 3.5 보류·사람 조작과의 관계

- 소급 리프 한도 판정이 대상을 보류로 바꾸면 그 행은 §3.1의 "보류 멤버가 아님"에서 빠지고 보류 해제 경로만 따른다.
  reconcile 패스 안에서 소급 판정이 이 스펙의 만기 재개보다 먼저 돈다.
- 사람이 `[세션에서 이어가기]`로 대화를 열면 살아 있는 대화가 그 Bead를 점유하므로 재개하지 않는다. 대화가
  `워커가 이어감`으로 끝나면 기존 대화 복귀가 재개하고 반복 수는 0이 된다.
- 폐기와 ✕ 정리는 대상을 없앤다.

### 3.6 카드 표시와 프로토콜

- 대상 행의 대기 사유는 `next_check_at`에 재개 시각을 싣고, 해제 문장은 자동 재개를 말한다. 예: "공급자·사용량 조건
  해제를 기다리며, 예정 시각에 자동으로 이어갑니다(1/2)." 조작은 지금과 같이 `[세션에서 이어가기]`·`폐기`다.
- 판정은 `normal`이다. 재개 시각이 지났는데 `auto_advance` 꺼짐이나 재개 거절로 남아 있는 행도 `action_required`로
  올리지 않는다 — 그 원인은 각자의 표시(자동 진행 토글, 러너 보류 카드)가 이미 말한다.
- `app/protocol.md`의 복구 대기 절에 대상·유도 규칙·새 타이밍 키·새 재개 종류 값을 적고, "provider는 공급자 보류
  경로"라는 문장을 이 규칙으로 고친다.

## 4. 호환

- 이 변경 이전에 저장된 대상 행은 이행 없이 같은 유도 규칙을 따른다. `finished_at`이 오래된 행은 배포 뒤 첫 reconcile
  패스에서 만기로 재개된다. 지금 저장된 큐에는 그런 행이 없다(§2).
- 새 타이밍 키가 없는 설정 파일은 기본값으로 읽는다.
- dotfiles 계약·핀 투영·진입 블록 사본·대화 대상 사유 집합은 바꾸지 않는다.

## 5. 테스트

Test scope:

- 대상 술어: `waiting`·`provider`·보류 없음이면 대상, 보류 멤버·철회·정리·폐기 진행·실행 중 형제·`no_progress` 승격
  레코드는 대상 아님.
- 재개 시각 유도: 반복 수 0이면 1단, 1이면 2단, 타이밍 설정 변경이 유도 값에 반영됨.
- 만기 재개: 만기 대상은 `prior_attempt` 재개 한 번(자동 재개 표지·새 재개 종류·`resumed_from`), 만기 전 대상은 재개
  없음, 재시작 뒤 reconcile 패스가 같은 결과를 냄.
- 반복 승격: 재개된 attempt가 같은 진행 키로 `recovery:provider`를 두 번 남기면 `no_progress`로 기록되고 대화 기동
  경로가 호출됨, 진행 키가 다르면 반복 수가 0으로 돌아감.
- 거절 보존: 재개 거절과 `auto_advance` 꺼짐은 레코드와 반복 수를 바꾸지 않음.
- 정책 미준비: `workRecoveryReady`가 거짓이면 만기 대상도 재개하지 않고 타이머를 걸지 않음.
- 저장: 새 재개 종류 값을 가진 attempt가 queue-store 저장·재로딩 뒤에도 그 값을 유지함.
- 소급 판정 우선: 같은 패스에서 보류로 바뀐 행은 재개되지 않음.
- 카드: 대상 행의 `next_check_at`·해제 문장·`normal` 판정, 대화 대상 술어와 사유 집합 다이제스트 테스트는 그대로 통과.
- Codex 러너 사례 회귀: Codex 러너 attempt가 `recovery:provider`로 끝나 보류 없이 `waiting`이 된 뒤 1시간 유도 시각을
  갖는다.

## 6. 경계·후속

후속 Bead 후보 없음.

- 관찰: 셸에서 띄운 다른 공급자 프로세스의 한도를 보류 증거로 읽는 일 — 구조화된 증거가 확인되지 않았고(§2 미확인)
  이 스펙의 시간 기반 출구가 같은 사례를 덮는다.
- 관찰: `[세션에서 이어가기]` 클릭으로 연 대화 창이 붙어 있는 tmux 세션에 열리는 동작 — 2026-11-12 사용자 결정으로
  그대로 둔다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-d9c1 — 공급자 보류의 해제는 프로브만 판정하고 교차 멤버 증거는 구조화된 매니페스트뿐이다. 이 스펙은
  보류가 된 행을 건드리지 않고, 보류가 되지 못한 행에만 출구를 더한다.
- 전제: ADR dotfiles/dotfiles-6sc5i — 같은 원인 반복 멈춤의 대화와 결과 줄 계약. 이 스펙은 `no_progress` 승격 뒤를
  그 계약 그대로 둔다.
- 공급자 보류로 바뀌지 않은 세션 선언 provider 대기는 Worker가 같은 세션을 1시간·5시간 뒤 두 번 자동 재개하고, 같은
  결말이 반복되면 기존 `no_progress` 대화로 넘긴다.
  - 되돌리기 어려움: 스케줄러의 만기 재개와 타이머, 재개 종류 값과 그 저장 정규화(queue-store), 재개 프롬프트, 대기 판정의 시계와 해제 문장, 서버
    타이밍 설정 키, `app/protocol.md` 복구 대기 절, 그 테스트가 함께 움직인다.
  - 맥락 없이는 의외: 아무도 해제를 확인하지 않은 대기가 스스로 재개되고, ADR UI-d9c1이 교차 멤버에서 기각한 "정해진
    간격 재시도"가 이 자리에서는 허용된다. 프로브할 보류 target이 없는 행이라는 점이 다르다.
  - 실제 절충: 고아 대기를 없애는 대신 최대 두 번의 헛재개 비용을 낸다. 기각한 대안은 즉시 알림만(매번 사람 클릭이
    필요), 즉시 대화 기동(dotfiles 계약의 사람 멈춤 종류를 먼저 바꿔야 함), 초기화 시각 파싱(§3.2)이다.
  - `summary`: "공급자 보류로 바뀌지 않은 세션 선언 provider 대기는 Worker가 같은 세션을 1시간·5시간 뒤 두 번 자동 재개하고 같은 결말이 두 번 반복되면 기존 no_progress 대화로 넘기며, 대화 대상 사유 집합과 공급자 보류 해제 규칙은 그대로다 — 나머지 조항은 UI-7gv4 그대로다"
  → ADR, supersede UI-7gv4
- 사다리 기본값 3600초·18000초와 타이밍 키 이름 — 숫자 한도와 이름 → ADR 아님
- 카드 해제 문장과 타임라인 요약 문구 — 표시 형식 → ADR 아님
