---
scope:
  - app/views/settings-dialog/bulk-pane.js
  - app/views/settings-dialog/bulk-pane.test.js
  - app/views/settings-dialog/bulk-worker-form.js
  - app/views/settings-dialog/bulk-worker-form.test.js
  - app/views/settings-dialog/session-model.js
  - app/views/settings-dialog/index.js
  - app/views/settings-dialog/index.test.js
  - app/views/monitor/bulk-preset-apply.js
  - app/views/monitor/bulk-preset-apply.test.js
  - app/views/monitor/bulk-account-apply.js
  - app/views/monitor/bulk-account-apply.test.js
  - app/styles.css
  - docs/superpowers/specs/2026-09-17-monitor-header-settings-bulk-mode-design.md
  - docs/adr/
---

# 여러 저장소 설정은 프리셋을 시작점으로 한 실행 프로필 편집면이고 계정은 명시 선택이다

## 문서 상태

- Bead: `UI-628r`
- 경로: `spec_backed`. beads-ui 안에서 구현·검증·인도를 한 묶음으로 처리한다.
- 기준: `main` / `fd65a5b5379a5d1d1a658ee162cce551ebd947ff`
- 상태: 사용자 검토용 완성 초안. 스펙 게이트 승인 전이다.
- 선행 설계: `2026-09-17-monitor-header-settings-bulk-mode-design.md`(UI-nu43,
  #304 착지). 이 스펙은 그 설계의 **결정 2**(일괄 `워커` 탭은 프리셋 적용만)와
  **결정 4**(계정은 모든 항목이 `변경 안 함`에서 시작하는 일괄 편집 폼)를
  대체한다. 모드 진입(모니터 탭 헤더 ⚙만 일괄), 두 탭 구성, 연결 저장소를
  편집하지 않는 원칙, 저장소별 순차 호출, 기본 선택, 저장소별 결과·재적용은
  그대로 이어받는다. 그 앞 설계 `2026-09-16-monitor-bulk-preset-apply-design.md`
  (UI-8ncz, #302 착지)의 프리셋 적용 판정 규칙도 이어받는다.
- 사용자 결정(2026-09-21):
  1. 일괄 `워커` 탭에서 프리셋이 담는 25키 전부를 세세하게 편집할 수 있어야
     한다. 시스템 프롬프트는 범위 밖이다.
  2. 프리셋은 폼의 **시작점**이다. 고르면 폼이 그 값으로 채워지고, 몇 행을 고쳐
     한 번의 `[적용]`으로 선택한 저장소에 쓴다.
  3. 프리셋을 고르지 않아도 폼을 편집하고 적용할 수 있다. 손대지 않은 행도
     화면의 값 그대로 쓰인다.
  4. `계정` 탭은 탭 전체에서 `변경 안 함`을 없앤다. 실행 계정도 한도 대응도
     매번 값을 고른다.
  5. 일괄 창은 각 저장소의 현재 설정을 **보여주는 화면이 아니다**. 여러 저장소에
     한 벌을 적용하기 위한 도구이므로, 저장소별 현재 값을 읽어 채우지 않고
     값이 갈리는 것도 표시하지 않는다.
- 화면 미리보기: `http://100.122.98.8:9000/2026-09-21-bulk-settings-detail.html`
- 미리보기 파일: `~/tmp/mockups/2026-09-21-bulk-settings-detail.html`. 저장하지
  않는 설계 산출물이며 예시 계정·프리셋을 쓴다. 동작의 정본은 이 문서이고 실제
  선택지는 설치된 카탈로그를 따른다.

## 1. 문제와 확인한 사실

### 1.1 일괄 `워커` 탭은 프리셋 한 줄뿐이다

`createBulkPane`의 `workerTemplate()`(`app/views/settings-dialog/bulk-pane.js`)은
프리셋 `select` 하나와 `[적용]` 버튼만 그린다. 저장소 하나를 여는
`createExecutionPane`의 `workerSection()`
(`app/views/settings-dialog/execution-pane.js`)은 프리셋 스트립에 더해
`orchestrationGroup`·`implGroup`·`reviewGatesGroup`·`quickFixGroup`·
`systemPromptSection`을 그린다. 그래서 프리셋으로 표현되지 않는 조합 —
프리셋의 한 행만 다른 값 — 을 여러 저장소에 맞추려면 저장소마다 레포 카드 ⚙를
열고 같은 편집을 반복해야 한다.

### 1.2 프리셋이 담는 키와 저장 위치

`IMPL_PRESET_KEYS`(`server/worker/exec-enums.js`,
`app/views/settings-dialog/session-model.js`)는 25키다: `BEAD_APPLY_KEYS` 14 +
`ORCHESTRATION_KEYS` 3 + `QUICK_FIX_ORCHESTRATION_KEYS` 3 + `QUICK_FIX_KV_KEYS`
5. 저장 위치는 둘로 갈린다.

- **kv 18키** = `PRESET_KV_KEYS`. `bd kv workflow_session_defaults`에 있고
  `set-session-defaults`가 쓴다.
- **큐 6키** = `ORCHESTRATION_KEYS` 3 + `QUICK_FIX_ORCHESTRATION_KEYS` 3.
  `worker-queue-set-orchestration-defaults`가 쓴다.
- 나머지 1키 `impl_dispatch`는 워크스페이스 전역 저장이 계약상 없다
  (`write_rule: user_write_only`). `WORKSPACE_KV_KEYS`가 이 키를 제외하고,
  단일 저장소 `implGroup`도 `실행 방식` 행을 그리지 않는다.

따라서 이 화면이 편집할 수 있는 키는 **24키**다.

### 1.3 개별 키 저장 op는 이미 저장소를 지정할 수 있다

- `set-session-defaults { values, root_dir? }`: 보낸 키만 얕게 병합하고 `null`은
  키 삭제다. CAS가 없고 응답은 `{ values, warnings, worker_url }`이다
  (`server/ws/session-defaults-handlers.js`).
- `worker-queue-set-orchestration-defaults { values, root_dir?,
  expected_revision }`: `mutationWorkspaceOf`가 다른 큐 mutation과 같은 규칙으로
  `root_dir`을 받고, 빈 문자열을 `null`로 바꾼 뒤 CAS로 쓴다. 응답은
  `replyMutation`의 `{ applied, conflict, queue }`다
  (`server/ws/worker-handlers.js:5208`).
- 두 핸들러 모두 쓰기 전에
  `execPresetCoordinator.changesAppliedExecPreset`으로 판정해, 결과가 기록된
  프리셋과 달라지면 큐의 `applied_exec_preset`을 `null`로 지운다
  (`worker-handlers.js:5229`, `session-defaults-handlers.js:224`). 즉 "프리셋을
  고치면 프리셋 표시가 풀린다"는 규칙은 **서버가 이미 소유**한다.
- `apply-impl-preset-global { preset_id, expected_revision,
  expected_queue_revision, root_dir? }`은 kv와 큐를 함께 쓰고
  `applied_exec_preset`을 기록한다. 개별 op에는 그 기록을 **세우는** 경로가
  없다.

### 1.4 폼이 옵션을 그리는 데 필요한 재료는 모니터 행에 이미 있다

`buildMonitorWorkspacesState`(`server/ws/monitor-handlers.js:1119`)의 행은
`root_dir`·`name`·`revision`·오케스트레이션 6키·`provider_limit_policy`에 더해
`execution_defaults`·`runner_catalog`·`session_defaults`·
`session_defaults_warnings`를 싣는다. `buildExecutionOptionView`
(`session-model.js:686` → `app/utils/execution-defaults.js buildOptionView`)는
`layer: 'global'`과 `execution_defaults`·`runner_catalog`만 있으면
`기본값 사용 — <해석값> (<층>)` 라벨과 선택지를 만든다. **서버 변경이 필요
없다.**

`session-model.js`는 키 목록·옵션 계산(`implModelOptions`·`implEffortOptions`·
`orchestrationModelOptions`·`orchestrationEffortOptions`·
`orchestrationRuntimeOptions`·`speedVisible`·`narrowImplTarget`)·패치 빌더
(`buildSessionDefaultsPatch`·`buildOrchestrationPatch`)를 모두 내보내는 순수
모듈이라, 일괄 폼이 pane을 거치지 않고 그대로 쓸 수 있다.

### 1.5 `계정` 탭의 `변경 안 함`

`accountTemplate()`의 세 자리에 `변경 안 함`이 있다.

- 실행 계정 `select`: `변경 안 함`(`KEEP = ''`) · `기본값 사용`
  (`USE_DEFAULT`, `null`로 전송) · 계정 목록.
- `limitGroupTemplate`의 `대응 방식` 세그먼트: `변경 안 함` · `기다림` ·
  `자동 전환`.
- 같은 그룹의 `선제 전환` `select`: `변경 안 함` · `끔` · `사용량 기준`.
- `전환 허용 계정`은 `변경 안 함`이 아니라 `바꾸기` 체크박스로 같은 일을 한다.
  꺼져 있으면 `accounts`를 보내지 않는다.

`countEditFields`(`app/views/monitor/bulk-account-apply.js`)는 이 "바뀐 항목"
개수를 세어 `바꿀 항목 N개`로 보이고, `planBulkAccountApply`는 바뀐 항목이
없으면 요청을 만들지 않는다.

쓰기 op는 `set-workspace-accounts { root_dir?, values }`(얕은 병합, `null`은
키 삭제, CAS 없음)와 `worker-provider-limit-policy-set { root_dir?, runner,
patch, expected_revision }`(patch의 `mode`·`accounts`·`preempt_pct` 가운데 있는
필드만 검사·기록, `accounts`는 집합 전체 교체)다.

## 2. 검토한 접근과 선택

### 2.1 세부 편집면 — 일괄 폼 전용 모듈

- **선택 — 일괄 폼이 자기 값 한 벌을 들고, `session-model.js`의 옵션 계산을
  그대로 써서 단일 저장소 `워커` 탭과 같은 그룹을 그린다.** 새 모듈
  `app/views/settings-dialog/bulk-worker-form.js`가 값·프리셋 채우기·적용
  payload를 소유하고, `bulk-pane.js`는 그것을 마운트한다. 서버·프로토콜을 바꾸지
  않고, 어휘와 옵션 규칙이 한 곳(`session-model.js`)에 남는다.
- 기각 — `createExecutionPane`을 일괄 모드에 재사용: pane은 저장소 하나의
  `session_baseline`·`session_draft`·`session_save_chain`·프로젝션·즉시 저장에
  묶여 있다. 일괄 폼은 baseline이 없고 저장 시점이 `[적용]` 한 번이라, 재사용은
  pane 안에 두 번째 상태 기계를 만드는 일이 된다.
- 기각 — 서버에 다중 저장소 op 신설: UI-8ncz §2.1 선택 1(클라이언트 순차 호출)을
  뒤집을 이유가 이번 요청에 없다. 부분 실패 보고 형식도 이미 있다.
- **시스템 프롬프트는 범위 밖이다**(사용자 결정 1). 프리셋에 없는 자유
  텍스트이고 저장소마다 내용이 다른 것이 정상이라, 한 벌 덮어쓰기의 대상이
  아니다.
- **`impl_dispatch`는 폼에 없다.** §1.2의 계약상 워크스페이스 전역 저장이 없다.

### 2.2 프리셋과 폼의 관계

**선택 — 프리셋은 폼을 채우는 시작점이고, 적용은 언제나 한 번이다**(사용자 결정
2·3). 프리셋을 고르면 그 `settings`의 값으로 24행을 덮어쓰고, 프리셋이 비워 둔
키는 `기본값 사용`이 된다. 고르지 않아도 폼은 열려 있고 편집·적용할 수 있다.

적용 요청은 폼이 프리셋과 같은지로 갈린다(§4.2).

- 프리셋을 골랐고 그 뒤 한 행도 고치지 않았으면 `apply-impl-preset-global` 한
  번. 지금과 같은 경로라 큐에 `applied_exec_preset`이 기록된다.
- 그 밖에는 `set-session-defaults`(kv 18키)와
  `worker-queue-set-orchestration-defaults`(큐 6키) 두 번. 프리셋 기록을 풀지
  말지는 §1.3의 서버 판정에 맡긴다. 클라이언트는 그 기록을 스스로 세우거나
  지우지 않는다.

기각 — 언제나 개별 op 두 번: 프리셋만 고른 흔한 경우에 `applied_exec_preset`
기록이 서지 않아 단일 저장소 화면의 프리셋 표시가 사라진다.

### 2.3 폼의 출발점

**선택 — 24행 모두 `기본값 사용`에서 출발한다**(사용자 결정 3·5). 저장소별 현재
값을 읽지 않고, 값이 갈리는 것도 표시하지 않는다. `기본값 사용`은 `변경 안 함`이
아니라 **"이 저장소에 값을 두지 않는다"는 실제 설정**이며, 적용하면 해당 키가
kv·큐에서 지워져 harness 기본으로 해석된다. 라벨은
`buildExecutionOptionView`가 만드는 `기본값 사용 — <해석값> (harness)`라, 고르지
않은 행에서도 실제로 어떤 값으로 돌아가는지 화면에 보인다.

기각 — 선택한 저장소들의 현재 값으로 채우고 갈리는 행에 배지: 사용자 결정 5.
기각 — 값이 갈리는 행만 비워 두기: `변경 안 함`이 그 행에만 되살아난다.

### 2.4 계정 탭의 `변경 안 함` 제거

**선택 — 탭 전체에서 없앤다**(사용자 결정 4). 실행 계정은
`기본값 사용 — 현재 로그인`이나 계정 하나를 고르고, `대응 방식`은 `기다림`·
`자동 전환` 둘 중 하나, `선제 전환`은 `끔`·`사용량 기준` 둘 중 하나다.
`전환 허용 계정`의 `바꾸기` 체크박스는 사라지고 화면의 집합이 언제나 그대로
쓰인다.

그 결과 이 탭의 적용은 **언제나 전부를 쓴다**. `countEditFields`가 세던 "바꾼
항목 수"는 뜻을 잃으므로 푸터 문구를 대상 규모(`저장소 N곳에 계정 2개 · 한도
정책 2벌`)로 바꾼다.

## 3. 화면

`2026-09-17-monitor-header-settings-bulk-mode-design.md` §3의 진입·레일·탭·
`적용 대상` fieldset·결과 줄·재적용 버튼은 그대로다. 아래는 그 위의 차이다.

### 3.1 공통 — 적용 경고 배너

두 탭 모두 `적용 대상` 바로 아래에 한 줄을 둔다.

> 화면에 보이는 값이 그대로 쓰입니다 — 손대지 않은 행도 함께 적용됩니다.

`변경 안 함`이 없다는 사실의 화면 표현이다. `settings-dialog__banner`를 쓴다.

### 3.2 `워커` 탭

배너 아래 순서는 프리셋 줄 → 오케스트레이션 → 구현 → 리뷰 게이트 → quick_fix
레인 → 푸터 → 결과다.

- **프리셋 줄**: 기존 `select`를 그대로 두고 오른쪽에 힌트
  `고르면 아래 24행이 그 프리셋 값으로 채워집니다`를 단다. 비호환 프리셋의
  `disabled`·`title` 처리는 그대로다.
- **오케스트레이션**: `런타임`(저장 키가 아닌 보조 축, `orchestrationRuntimeOptions`)
  · `모델` · `effort` · `속도`. 속도 행은 `speedVisible`이 참일 때만 그린다.
- **구현**: `위임 대상`(`impl_runtime`) · `모델` · `effort` · `속도`. 단일 저장소
  탭과 같이 `실행 방식` 행은 없다.
- **리뷰 게이트**: `사양 리뷰` · `계획 리뷰` · `구현 리뷰` 각 모델 · effort ·
  속도. 모델 어휘는 `REVIEW_STEP_MODELS`와 `PLAN_REVIEW_MODELS`를 그대로 쓴다.
- **quick_fix 레인**: `실행 방식`(`quick_fix_impl_dispatch`) · 오케스트레이션
  모델·effort·속도 · 위임 대상·모델·effort·속도. 단일 저장소 탭과 같이 해석된
  실행 방식이 `main`이면 위임 행들을 **그리지 않는다**(재료가 없는 줄은 그리지
  않는다). 서버가 quick_fix 레인을 지원하지 않으면
  (행에 `quick_fix_orchestration_model` 키가 없으면) 그룹 전체를 비활성으로 두고
  기존 문구 `서버가 quick_fix 레인을 지원하지 않습니다`를 단다.
- **푸터**: 왼쪽에 `저장소 N곳에 24개 항목`, 오른쪽에 `[적용]`. 대상이 없거나
  실행 중이면 비활성이다.

### 3.3 `계정` 탭

- **실행 계정**: `Claude`·`Codex` 각 `select`. 선택지는
  `기본값 사용 — 현재 로그인`과 계정 목록이며 `변경 안 함`은 없다. 초기 선택은
  `기본값 사용`이다. 계정 카탈로그를 읽지 못하면 기존 문구
  `계정 목록을 불러올 수 없습니다`를 두고 그 러너의 계정 행과 허용 목록을
  비활성으로 둔다.
- **러너별 한도 대응**: `대응 방식` 세그먼트는 `기다림`·`자동 전환` 둘,
  `전환 허용 계정`은 체크박스 집합만(‘바꾸기’ 없음), `선제 전환`은 `끔`·
  `사용량 기준`과 숫자 상자다. 초기값은 큐 기본과 같은 `자동 전환` · 빈 허용
  목록 · `끔` · `80`이다. `사용량 기준`이 아닐 때 숫자 상자는 비활성이고 값은
  그대로 남는다.
- **푸터**: `저장소 N곳에 계정 2개 · 한도 정책 2벌`과 `[적용]`.

### 3.4 값이 화면을 좁히는 규칙

단일 저장소 탭과 같다. 오케스트레이션 `런타임`을 바꾸면 그 provider가 낼 수 없는
모델·effort 선택은 `기본값 사용`으로 되돌린다(`narrowImplTarget`과 같은 좁히기).
`위임 대상`을 바꿀 때도 같다. 속도 행은 `speedVisible`이 거짓이면 그리지 않고, 그
키는 폼 값에서 지운다.

## 4. 모듈과 흐름

### 4.1 `bulk-worker-form.js` — 폼 값과 템플릿

- `createBulkWorkerForm({ rows, queueOf, onChange })`는 폼 값
  `Record<string, string|null>`(24키의 sparse map, `null`·부재는 `기본값 사용`)과
  그룹 템플릿을 소유한다. 옵션·좁히기·표시 여부는 전부 `session-model.js`를
  호출해 얻는다.
- `applyPreset(settings)`는 프리셋의 `settings`에서 24키만 골라 폼 값을 통째로
  바꾸고, 프리셋이 비운 키는 폼에서도 지운다.
- `kvValues()`는 `PRESET_KV_KEYS` 18키를, `queueValues()`는 큐 6키를 `{ key:
  value|null }`로 낸다. 두 함수 모두 **폼의 모든 키를 담는다** — 값이 없는 키는
  `null`(삭제)로 실린다.
- `equalsPreset(settings)`는 폼 값이 프리셋과 같은지를 24키 기준으로 답한다.
  `[적용]`이 어느 경로를 쓸지 판정하는 유일한 근거다.
- `runner_catalog`·`execution_defaults`는 선택한 저장소 가운데 첫 행의 것을
  쓴다. 같은 서버의 모든 저장소에서 같은 카탈로그·harness 기본이므로 저장소마다
  갈리지 않는다(UI-8ncz §1.2와 같은 근거). 행이 아직 없으면 폼을 `불러오는 중`
  으로 두고 그리지 않는다.

### 4.2 `bulk-preset-apply.js` — 적용 계획과 실행

`planBulkApply`를 두 갈래로 넓힌다. 저장소마다 요청 목록을 만들고 순차로 보내는
구조는 그대로다.

- **프리셋 경로**(프리셋을 골랐고 `equalsPreset`이 참): 지금과 같이
  `apply-impl-preset-global { preset_id, expected_revision,
  expected_queue_revision, root_dir }` 한 번. 판정 규칙(`applied`·`queue_applied`
  ·1회 재시도)도 그대로다.
- **폼 경로**(그 밖): 저장소마다 두 요청을 순서대로 보낸다.
  1. `set-session-defaults { values: kvValues(), root_dir }`
  2. `worker-queue-set-orchestration-defaults { values: queueValues(),
     root_dir, expected_revision }`
- 순서는 프리셋 핸들러와 같이 **kv 먼저, 큐 나중**이다. 두 쓰기는 원자적이지
  않고 그 비원자성은 기존 계약이다(UI-8ncz §1.1).
- 큐 요청이 `applied: false`로 오면 응답 `queue`의 revision으로 **한 번** 다시
  보낸다. 기존 `sendQueueCas` 규칙과 같다.
- 저장소별 결과는 기존 세 값을 그대로 쓴다. 둘 다 성공이면 `applied`, kv만
  성공이면 `partial`, kv가 실패하면 `failed`다. `formatBulkResult`의 문구에
  폼 경로의 부분 적용 사유(`큐 충돌, 실행 설정만 저장`)를 더한다.
- 응답의 `queue`는 지금처럼 `adopted`에 채택해 다음 저장소 계획이 최신 revision을
  읽게 한다(`adopted-queue.js`).

### 4.3 `bulk-account-apply.js` — 언제나 전부 쓰기

- `countEditFields`를 지우고, `planBulkAccountApply`는 폼 상태에서 언제나 세
  요청을 만든다: `set-workspace-accounts { root_dir, values: { claude_account,
  codex_account } }`와 러너별
  `worker-provider-limit-policy-set { root_dir, runner, patch: { mode, accounts,
  preempt_pct }, expected_revision }` 둘.
- `기본값 사용`은 지금과 같이 `null`로 보낸다. `선제 전환`이 `끔`이면
  `preempt_pct: null`, `사용량 기준`이면 1~99의 정수다. 숫자가 범위를 벗어나면
  `[적용]`을 비활성으로 두고 그 행에 문구를 단다.
- 결과 판정은 `set-workspace-accounts`가 실패하면 `failed`, 러너 정책 가운데
  하나만 실패하면 `partial`이다. 큐 CAS 1회 재시도는 §4.2와 같다.

### 4.4 `bulk-pane.js`

- `workerTemplate()`은 프리셋 줄 + `bulk-worker-form`의 그룹 + 푸터를 조립한다.
- `accountTemplate()`에서 `KEEP` 선택지와 `바꾸기` 체크박스를 지우고 푸터 문구를
  바꾼다.
- 탭 전환·실행 중 취소·`destroy`의 기존 규칙은 그대로다. 폼 값은 탭을 오가도
  살아 있고 다이얼로그를 닫으면 사라진다.

## 5. 정본 반영

- `2026-09-17-monitor-header-settings-bulk-mode-design.md`의 결정 2·4가 있는
  자리에 이 스펙이 대체했다는 한 줄을 단다. 나머지 결정은 그대로 둔다.
- `app/protocol.md`는 바꾸지 않는다. 새 op도, 기존 op의 payload 변경도 없다.
- 서버는 바꾸지 않는다.

## 6. 테스트 범위와 인도 조건

- `bulk-worker-form.test.js`(새 파일)
  - 프리셋을 적용하면 24키가 그 값이 되고 프리셋이 비운 키는 폼에서 사라진다.
  - `kvValues`·`queueValues`가 값 없는 키를 `null`로 싣는다.
  - `equalsPreset`이 한 행을 고친 뒤 거짓이 된다.
  - 오케스트레이션 런타임을 바꾸면 그 provider가 못 내는 모델·effort가 폼에서
    지워진다.
  - quick_fix 실행 방식이 `main`이면 위임 행을 그리지 않는다.
- `bulk-preset-apply.test.js`
  - 프리셋만 고른 적용이 저장소마다 `apply-impl-preset-global` 한 번을 보낸다.
  - 폼을 고친 적용이 저장소마다 `set-session-defaults` → 큐 op 순서로 보낸다.
  - 큐 op의 `applied:false`에 응답 revision으로 한 번만 재시도한다.
  - kv 성공·큐 실패가 `partial`로 보고된다.
- `bulk-account-apply.test.js`
  - 아무것도 고치지 않아도 세 요청을 모두 보낸다.
  - `기본값 사용`이 `null`로, `끔`이 `preempt_pct: null`로 실린다.
  - 허용 목록이 화면 집합 그대로 실린다.
- `bulk-pane.test.js`
  - `워커` 탭에 네 그룹이 그려지고 `계정` 탭 어디에도 `변경 안 함` 선택지가
    없다.
  - 두 탭에 적용 경고 배너가 있다.
  - 대상이 없으면 `[적용]`이 비활성이다.
- 인도 조건: `npm run tsc`, `npm run lint`,
  `npx prettier --write <변경 파일>`, `npx vitest run --reporter=dot` 전부 통과.
  모니터 탭 헤더 ⚙를 열어 두 탭의 1280·390 폭 스크린샷으로 배치를 확인한다.

## 결정 (ADR 후보)

- 전제: ADR UI-nu43 — 모니터 탭 헤더 설정은 연결 저장소를 편집하지 않는 여러
  저장소 일괄 적용 창이고 레포 카드 설정은 그 저장소만 편집한다. 이 설계는 그
  진입·경계를 그대로 두고 일괄 창 **안의 편집면**만 바꾼다.
- 전제: ADR UI-00lf — 프리셋은 25키 sparse 프로필이고 오케스트레이션 3키를
  포함한다. 이 폼은 그 어휘를 그대로 소비하며 새 키를 만들지 않는다.
- 전제: ADR 0052 — 한도 자동 전환은 러너별 허용 계정 집합 안에서만 일어난다.
  일괄 폼의 `accounts`는 그 집합 전체를 바꾼다.
- 여러 저장소 일괄 창은 저장소들의 현재 설정을 보여주는 화면이 아니라 한 벌을
  만들어 쓰는 편집면이다. 프리셋은 그 한 벌의 시작점이고, `변경 안 함`은 두
  탭 어디에도 없으며, `[적용]`은 화면의 값 전부를 선택한 저장소에 쓴다. 세 조건
  판단은 다음과 같다. 되돌림 비용이 있다(폼 모듈·두 적용 경로·계정 폼 계약·
  `countEditFields` 제거). 배경 없이 보면 의외다(같은 창이 편집면인데 그 저장소의
  현재 값을 보여주지 않고, 손대지 않은 행도 쓴다). 실재 대안이 있다(프리셋 적용
  전용 유지, 현재 값으로 채우고 갈림 표시, 바뀐 항목만 쓰기).
  `summary`: "모니터 탭의 여러 저장소 설정은 현재 값을 보여주지 않고 프리셋을
  시작점으로 한 벌을 만들어 쓰는 편집면이며, 두 탭 어디에도 변경 안 함이 없고
  적용은 화면의 값 전부를 쓴다" → ADR, supersede UI-nu43

## 경계·후속

다른 저장소에서 할 필수 작업과 형제 Bead는 없다. 서버·프로토콜, 프리셋의 키
집합과 적용 의미, 레포 카드 ⚙의 단일 저장소 편집, 모드 진입 규칙, 기본 선택,
저장소별 순차 호출과 결과·재적용 형식은 바꾸지 않는다. 시스템 프롬프트,
`impl_dispatch`, 자동화·동시 실행 수·직렬 레인·워크플로우 모드의 일괄 적용은
이번 범위 밖이다.

- 관찰: 일괄 `워커` 탭에 시스템 프롬프트를 더하는 안 — 사용자 결정 1로 범위
  밖이고, 저장소마다 내용이 다른 것이 정상이라 결함이 아니다.
