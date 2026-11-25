---
scope:
  - server/worker/runner-catalog.js
  - server/worker/runner/
  - server/worker/policy.js
  - server/worker/exec-enums.js
  - server/worker/agy-model-list.js
  - server/worker/provider-health.js
  - server/worker/provider-holds.js
  - server/worker/spec-authoring.js
  - server/worker/tmux-launcher.js
  - server/worker/session-lane.js
  - server/routes/agy-usage.js
  - server/routes/account-login.js
  - server/routes/account-switch.js
  - server/routes/account-remove.js
  - server/auto-pool-store.js
  - server/worker/session-ref.js
  - server/worker/session-ref-transcript.js
  - server/worker/scheduler.js
  - server/worker/guard-hook.js
  - server/worker/runner/guard-pre-tool.js
  - server/conversation-settings.js
  - server/worker/usage-pricing.js
  - server/worker/usage-receipts.js
  - app/views/usage-meter.js
  - app/views/settings-dialog/
  - app/views/detail-panel/
  - app/protocol.md
  - generated/contracts/
---

# agy(Antigravity CLI)를 세 번째 실행 런타임으로 더한다

Bead: `UI-ufgo` (형제: `dotfiles-uop05`) · 2026-11-26

## 1. 목표

beads-ui가 Claude·Codex와 같은 자리에 `agy`(Gemini)를 둔다. dotfiles 스펙 `docs/superpowers/specs/2026-11-26-agy-full-runtime-design.md`(Bead `dotfiles-uop05`)가 계약 값, 가드 훅, 세션 허브 `--agent agy`, 계정 도구 `agy-auth`를 만들고, 이 설계는 그것을 소비한다.

| 기능 | Claude·Codex | 이 설계의 agy |
| --- | --- | --- |
| Worker가 Bead를 총괄 실행 | `claude -p`, `codex exec` | `agy -p --output-format stream-json` |
| 구현 런타임·리뷰어 선택지 | `auto/claude/codex`, 리뷰어 여섯 | `agy`, 리뷰어 `neon` 추가 |
| 모델 선택지 | Claude 고정 목록, Codex는 CLI 목록 | `agy models` 목록 |
| 사용량 표시 | `cswap list`, `codex-auth list` | `agy -p "/usage"`와 `agy-auth list` |
| 로그인·재인증·계정 추가·전환 | tmux 창 로그인과 코드 중계 | 같은 화면, `agy` 로그인 창과 `agy-auth` |
| 한도 대응 | 보류, 계정 자동 전환 | 실행 전 잔량 확인, 보류, 자동 전환 |
| 머지 금지 등 실행 전 가드 | 실행기별 훅 | dotfiles agy 훅이 같은 판정 스크립트를 부름 |
| 저장소별 설정, 프리셋, 대화 | 런타임·모델 고정값 | `agy` 값 수용 |
| 세션 참조·재개·기록 보기 | `claude:`, `codex:`, `hermes:` | `agy:` 추가 |

사용자 결정(2026-11-26): 범위는 전부이고 Google 약관 위험(Worker의 `agy` 실행, 계정 자동 전환)을 감수한다. 모델 선택지는 계정에서 실제로 열린 목록을 쓴다.

## 2. 검증된 전제

base: beads-ui `a04b79a1d5138dfbc94e674aa6d281af95373566`

저장소:

- 넘기기 전 검증은 `npm run tsc`, `npm run lint`, `npx prettier --write <파일>`, `npx vitest run --reporter=dot`이다 — `AGENTS.md:64-66`
- beads-ui는 dotfiles 계약을 실행 중에 읽지 않고 필요한 부분만 코드와 `generated/contracts/`에 복제한다 — `AGENTS.md:12-16`, `docs/adr/README.md:11`
- 활성 실행기는 `['claude','codex']`이고 그 밖의 `[runner.X]` 설정은 경고와 함께 버려진다 — `server/worker/runner-catalog.js:78`, `:669-674`
- 모르는 실행기 이름은 Claude 어댑터로 떨어진다 — `server/worker/runner/index.js:110-117`, `:148-171`; `server/worker/policy.js:62`, `:272`
- 모델 이름은 전체에서 유일해야 하고 실행기는 모델 이름에서 거꾸로 찾는다 — `server/worker/runner-catalog.js:584-627`, `:693-698`
- 어댑터의 필수 구성원은 `name`, `buildArgv`, `normalize`, `liftUsage`, `detectQuestion`, `verdict`이고 세션 ID 추출·명령 추출·장애 분류는 선택이다 — `server/worker/runner/session.js:179-212`
- 엔진은 줄 단위 JSON만 읽고 자식 출력을 기록 파일에 붙인다 — `server/worker/runner/session.js:653-664`, `:412-419`
- Claude 판정은 마지막 `result` 이벤트, Codex는 마지막 `turn.completed`·`turn.failed`다 — `server/worker/runner/claude.js:810-835`, `server/worker/runner/codex.js:424-437`
- 재개·분기는 `buildArgv`가 설정값으로 만들고 Claude·Codex 모두 분기를 받는다 — `server/worker/runner/claude.js:857-876`, `server/worker/runner/codex.js:471-478`
- 사용량 값은 보고된 비용, 모델 단가, 추정 순으로 매기고 Claude·Codex가 아닌 제공자의 위임 영수증은 버린다 — `server/worker/usage-pricing.js:194-260`, `server/worker/usage-receipts.js:158-195`
- Codex 모델 목록은 시작 때와 매시간 CLI에서 읽어 상태 폴더에 보관하고 읽기 실패 때 마지막 목록을 쓴다 — `server/worker/codex-model-list.js:34`, `:435-447`, `:564-572`
- 열거값: 구현 런타임, quick_fix 구현 런타임, 리뷰 모델, 계획 리뷰 모델, 계정 키 — `server/worker/exec-enums.js:89`, `:413`, `:53-60`, `:68`, `:151`; 화면 쪽 복사본 — `app/views/settings-dialog/session-model.js:291`, `:299-307`
- 모르는 `impl_runtime`은 `invalid_impl_runtime`으로 실행이 거부되고, 모르는 리뷰 모델은 조용히 무시된다 — `server/worker/exec-enums.js:672-678`, `server/worker/scheduler.js:16261-16264`, `server/worker/policy.js:297-314`
- `session_ref` 항목은 `claude|codex|hermes`만 읽고 모르는 제공자 항목은 버려져 그 앞의 항목이 현재 세션이 된다 — `server/worker/session-ref.js:68`, `:118-121`, `:381`
- 자동 풀 저장은 모르는 런타임이 하나라도 있으면 쓰기 전체를 거부한다 — `server/auto-pool-store.js:39`, `:260-269`
- `quick-fix-handoff.json` 복제본은 로컬 dotfiles 체크아웃과 대조하는 테스트가 있고 불일치면 실패한다. 그 파일에는 런타임 열거가 없어 dotfiles의 agy 값 추가만으로는 바뀌지 않는다 — `server/worker/quick-fix-handoff.cross-runtime.test.js:135-175`; dotfiles `dfc3ee2f0fc018d8fa55d47874d2e8613d4ac8d5`에서 `grep -n runtime generated/contracts/quick-fix-handoff.json`(결과 없음)
- 사용량 경로는 Claude 30초, Codex 180초 보관이고 실패하면 `{available:false}`다 — `server/routes/claude-usage.js:17-18`, `:297-311`; `server/routes/codex-usage.js:20-21`
- 화면의 제공자 표와 제공자별 분기 — `app/views/usage-meter.js:449-466`, `:179`, `:986`, `:1034`, `:1059`; 설정의 계정 목록은 두 주소를 직접 적는다 — `app/views/settings-dialog/account-catalog.js:66-71`
- 로그인 제공자는 `'claude'|'codex'`이고 코드 중계는 Claude 전용이다 — `server/routes/account-login.js:42`, `:1815-1817`, `:1920-1922`; Claude 로그인은 tmux 창에서 돈다 — `:747-775`
- 전환은 제공자 표로, 삭제는 제공자 조건 분기로 외부 도구를 부른다 — `server/routes/account-switch.js:30-38`, `server/routes/account-remove.js:185-203`
- 실행별 계정은 스케줄러가 고르고 Claude는 `cswap run`, Codex는 계정별 홈 사본으로 넘긴다 — `server/worker/scheduler.js:4976-5063`, `:18280-18295`
- 한도 때 자동 전환 판단, 보류 키, 건강 점검의 제공자 고정 — `server/worker/scheduler.js:2542-2594`, `server/worker/provider-holds.js:211`, `server/worker/provider-health.js:428-437`
- 실행 환경 변수와 표지 — `server/worker/scheduler.js:18154-18161`, `server/worker/runner/claude.js:967`, `server/worker/runner/codex.js:527`
- push 전 가드는 실행기와 무관하고 PreToolUse 가드는 실행기별로 넣는다. 그 훅은 `<훅 스크립트 경로> <실행기 이름>` 명령이고 판정기는 실행기 이름을 인자로 받는다 — `server/worker/guard-hook.js:15-21`, `:106-114`; `server/worker/runner/guard-pre-tool.js:4`
- 단가가 없는 모델의 비용은 없음으로 둔다 — `server/worker/usage-pricing.js:194-260`
- 대화 설정의 런타임 값과 대화 실행 — `server/conversation-settings.js:59-63`, `:71-84`, `:260-263`; `server/worker/spec-authoring.js:405-408`; `server/worker/tmux-launcher.js:217-219`, `:868-898`
- 값이 정확히 두 런타임과 같기를 기대하는 테스트 — `server/worker/runner-catalog.test.js:239`, `:569`; `server/worker/runner/index.test.js:58`; `server/worker/exec-enums.test.js:404`, `:791`

런타임(`agy` 1.5.14, 2026-11-26 실측, dotfiles 스펙 §2와 같은 명령):

- `agy -p … --output-format json`의 결과는 `conversation_id`, `status`, `response`, `error`, `usage{input_tokens,output_tokens,thinking_tokens,cache_read_tokens,total_tokens}`다. 비용 값은 없다
- `agy -p "/usage" --output-format json`은 토큰을 쓰지 않고 묶음 둘의 주간·5시간 `remaining_fraction`, `reset_time`을 낸다. 계정 이름은 이 출력에 없다
- 대화형 화면 머리말에 계정과 요금제가 한 줄로 나온다(`<이메일> (Google AI Pro)`)
- `agy models`는 `<id>\t<이름>` 27줄을 내고 id에 노력 수준이 붙어 있다. Claude 계열 id(`claude-opus-5-5-high` 등)는 beads-ui의 Claude 모델 이름과 겹치지 않는다
- `gemini-pro-orchestrator`는 다른 모델(`gemini-4-neon-xhigh`)로 답했다
- dotfiles의 전역 agy 훅은 `-p`, 권한 생략 모드, 하위 에이전트 안에서 모두 돈다. 워크스페이스 훅 자리는 `.agents/hooks.json`이다

- `--output-format stream-json`은 줄마다 JSON 하나다: 첫 줄 `event: init`(`conversation_id`, `init.model`), 이어서 `event: step_update`(`step_update.step_type`이 `user_input`·`agent_response`·`tool`, 도구 줄에 `tool_name`과 `tool_info.parameters`, 끝난 도구 줄에 `tool_info.output`, 응답 줄에 `usage`), 마지막 줄 `event: result`(`result.status`, `response`, `usage`, `num_turns`)

- 미확인: 하위 에이전트가 낀 실행에서 stream-json 줄이 본 대화와 하위 대화를 어떻게 섞어 내는지 — 도구 호출 하나짜리 실행만 채집했다
- 미확인: 한도에 닿았을 때의 `status`·`error` 문구 — 한도를 소진해 보지 않았다
- 미확인: 자격 교체로 계정 전환이 되는지 — dotfiles 스펙 §3.9의 첫 단계가 확인한다
- 미확인: 대화 기록(`transcript_full.jsonl`)에서 토큰 수를 읽을 수 있는 범위 — `PLANNER_RESPONSE` 줄에 `input_tokens`·`output_tokens`가 있는 것만 보았다

## 3. 설계

### 3.1 값 수용과 닫힌 기본값 (U1)

- 값만 받는다: 구현 런타임과 quick_fix 구현 런타임의 `agy`, 리뷰·계획 리뷰 모델의 `neon`, `session_ref` 제공자 `agy`. 화면 쪽 복사본과 `generated/contracts/` 복제본을 dotfiles 착지본에 맞춘다. 이 묶음은 agy를 활성 실행기로 올리지 않는다(실행기와 실행 전 잔량 조회가 들어오는 U2에서 올린다). 구현 런타임 `agy`는 총괄 세션이 dotfiles 전송으로 위임할 때 쓰는 값이라 beads-ui 실행기 없이도 뜻이 있다.
- 결정: 등록되지 않은 실행기 이름은 Claude로 돌리지 않고 실행을 거부한다(`unknown_runner`) (대안: 지금처럼 Claude로 대체; 이유: 설정이 어긋났을 때 다른 계정·모델로 조용히 도는 것을 막는다). 대화 실행기의 "Codex가 아니면 Claude" 접기도 같은 규칙으로 바꾼다.
- `session_ref`가 `agy:<id>@<host>`를 읽는다. 재개 명령은 `agy --conversation '<id>'`, 대화 기록 자리는 `~/.gemini/antigravity-cli/brain/<id>/.system_generated/logs/transcript_full.jsonl`이고 기록 보기는 `USER_INPUT`·`PLANNER_RESPONSE` 줄을 화면용 이벤트로 바꾼다.
- 계정 키는 더하지 않는다(§3.5).

### 3.2 agy 실행기 (U2)

- 활성 실행기, 자동 풀 런타임, 한도 정책 대상에 `agy`를 더한다.
- 실행 명령은 launcher(`~/.local/bin/agy`)로 `agy -p <작업 프롬프트> --output-format stream-json --model <id> --dangerously-skip-permissions`이고 재개는 `--conversation <id>`를 붙인다. agy 실행기는 분기(fork)와 `fast` 속도를 받지 않으며 요청하면 오류다.
- 환경: 공통 셋(`BDUI_ATTEMPT_ID`, `WORKFLOW_REPO_ROOT`, `WORKFLOW_BEAD_ID`)과 `AGY_SILENT=1`, `BDUI_PRETOOL_HOOK`.
- 세션 ID는 `init` 이벤트의 `conversation_id`, 판정은 마지막 `result` 이벤트의 `status`가 `SUCCESS`인지로 한다. `result` 줄 없이 끝난 실행은 실패다. 종료 코드는 쓰지 않는다(권한이 조용히 거부돼도 0으로 끝난다). 종단 결과 줄 문법(`성공 · …`)은 다른 실행기와 같이 읽는다.
- 사용량은 `result`의 `usage`에서 올린다: `thinking_tokens`는 `reasoning_output_tokens`로 옮긴다. agy는 비용을 보고하지 않으므로 모델 단가가 없으면 토큰 수만 보이고 비용은 지금 규칙대로 없음이다. 위임 영수증의 제공자 `agy`를 받는다.
- 시스템 프롬프트 자리: `agy -p`에 따로 넘기는 인자가 없으므로 작업 프롬프트 앞에 붙인다.
- 실행 전 가드: Worker는 지금 Claude·Codex 실행에 넣는 것과 같은 훅 스크립트 경로를 `BDUI_PRETOOL_HOOK`으로 넘긴다. dotfiles의 agy 가드가 셸 명령마다 그 스크립트를 `<경로> agy`로 띄워 같은 입력 형태로 판정을 받고 거부를 따른다(dotfiles 스펙 §3.4). 그래서 머지 큐를 건너뛰는 `gh pr merge` 같은 명령은 agy 실행에서도 실행 전에 거부된다. 시도 worktree에 `.agents/hooks.json`은 쓰지 않는다.
- 줄 기록에서 셸 명령을 뽑는 글 가드는 `tool_name`이 `run_command`인 `step_update` 줄의 `tool_info.parameters`에서 명령을 읽어 다른 실행기와 같이 건다.
- 실행 전 잔량: 실행을 띄우기 전에 `agy -p "/usage" --output-format json`(10초 한도, 180초 보관)을 읽어 Gemini 묶음의 잔량이 0이면 띄우지 않고 한도 보류(재설정 시각까지)로 둔다. 읽기에 실패하면 실행은 그대로 띄운다. 실행 중 실패 문구의 분류는 한도에 닿은 기록이 채집된 뒤에 더하고 그 전에는 일반 실패다.

### 3.3 모델 목록 (U2)

- 서버가 시작 때와 매시간 `agy models`를 읽어 상태 폴더에 보관한다. 읽기 실패는 마지막 목록을 유지한다(Codex 목록과 같은 규칙). 목록이 한 번도 없으면 agy 모델 선택지는 비어 있고 agy 실행은 거부된다.
- 보관한 목록은 읽을 때의 활성 계정에 묶인다. 로그인·재인증·계정 추가·전환(수동·자동)이 성공하면 모델 목록과 사용량 보관값, 진행 중인 조회 결과를 버리고 새로 읽으며, 새 목록이 올 때까지 agy 실행을 띄우지 않는다. 마지막 성공 목록은 같은 계정일 때만 다시 쓴다.
- 세션 모델(Worker 총괄 실행의 모델, 대화 창의 모델)은 `agy models`의 id 그대로다. 노력 수준이 id에 들어 있으므로 따로 노력 선택지를 두지 않는다.
- 워크플로우 모델(`impl_model`·`quick_fix_impl_model`과 `impl_effort`)은 dotfiles 계약의 모양으로 저장한다: 화면에서 고른 id `gemini-4-<계열>-<노력>`을 계열(`neon`·`carbon`·`argon`·`hydrogen`)과 노력으로 나눠 쓰고, 읽을 때 다시 합쳐 보인다. 이 자리의 선택지는 그 네 계열의 id뿐이다. 프리셋을 적용한 값도 같은 변환을 거친다.
- 결정: 세션 모델로 기본으로 보이는 것은 `gemini-4-neon-high`, `gemini-4-neon-xhigh`, `gemini-4-carbon-high`, `gemini-4-carbon-medium`, `gemini-4-hydrogen-medium`이고 기본 모델은 `gemini-4-neon-high`다. 나머지는 모델 보이기 설정에서 켠다 (대안: 27개 모두 보임; 이유: 선택 창이 길어지고 Orchestrator는 다른 모델로 답한다).
- 자동 풀: agy 후보는 dotfiles 계약의 계열·노력(`carbon`, `neon`, medium~high)을 id로 풀어 목록과 대조한다.

### 3.4 사용량 화면 (U3)

- `GET /api/agy-usage`: §3.2의 잔량 조회와 같은 읽기를 쓴다. 응답은 다른 두 경로와 같은 틀(`available`, `windows`, `accounts[]`)이고 창은 묶음마다 `5h`·`7d`다(Gemini 묶음이 기본, Claude·GPT 묶음은 범위 창). 실패는 `{available:false}`다.
- 활성 계정의 값은 방금 읽은 것이고, 다른 자리의 값은 `agy-auth list`가 보관한 마지막 관측값과 그 시각이다.
- 화면: 사용량 표시줄과 설정의 계정 목록에 agy 행을 더한다. 제공자 표에 주소 넷(사용량, 전환, 삭제, 로그인 도구)을 채운다.

### 3.5 로그인·계정 (U3)

- 지원 여부: 화면은 `agy-auth list --json`의 `capabilities`를 읽는다. `save`·`switch`·`remove` 가운데 거짓인 동작의 화면(계정 추가·전환·삭제)은 숨기고, `switch`가 거짓이면 자동 전환도 끈다. 로그인·재인증·사용량은 그대로 둔다.
- 로그인·재인증·계정 추가: tmux 창에서 launcher로 `agy`를 띄워 로그인 화면의 OAuth 주소를 화면에 보여 주고, 사용자가 붙여 넣은 코드를 기존 코드 중계 경로로 그 창에 넣는다(코드 중계를 Claude 전용에서 agy까지 넓힌다). 코드는 기록에 남기지 않는다.
- 성공 판정: 코드를 넣은 그 창이 로그인 화면을 벗어나 머리말에 계정 줄(이메일과 요금제)을 보이는 것이다. 그 이메일이 이번 로그인의 계정이다. 시간 안에 그 줄이 나오지 않으면 실패이고 아무것도 저장하지 않는다. 성공 뒤 그 창의 `agy`를 끝내고 사용량을 새로 읽는다.
- 계정 추가는 성공 판정 뒤 `agy-auth save <이름> --account <이메일>`로 자리를 만든다. 전환은 `agy-auth switch`, 삭제는 `agy-auth remove`다.
- 결정: agy 계정은 머신 전역 활성 계정 하나다. 저장소·Bead별 계정 고정과 실행별 계정 지정은 두지 않는다 (대안: `agy_account` 키; 이유: 자격이 홈 폴더 한 자리에 있어 동시에 도는 실행이 서로 덮어쓴다 — dotfiles 스펙 §3.9와 같은 결정).
- 조정: 자격을 바꾸는 동작(로그인, 재인증, 계정 추가, 전환, 삭제)은 하나씩만 돌고, 도는 동안 스케줄러는 agy 실행을 새로 띄우지 않는다. 돌고 있는 agy 실행이나 agy 대화 창이 있으면 그 동작은 시작하지 않고 `busy`를 보인다(`agy-auth`의 잠금이 같은 규칙을 한 번 더 지킨다). 자동 전환(한도 도달)은 돌던 실행이 끝난 뒤 대기열이 다음 agy 실행을 띄우기 전에 한다. 후보 규칙은 ADR UI-d9c1(모든 창이 100% 미만)을 그대로 쓴다.

### 3.6 저장소별 설정·프리셋·대화 (U4)

- 저장소 기본값(kv `workflow_session_defaults`)과 Bead 고정값이 `agy`, `neon`, agy 모델을 받는다(세션 모델은 id, 워크플로우 모델은 §3.3의 변환). 프리셋은 런타임에 묶이지 않으므로 agy 모델을 담은 프리셋을 그대로 만들 수 있다.
- 대화 설정에 `fresh_runtime: agy`와 `agy_model`을 더한다.
- 대화 창은 지금처럼 세션 허브의 실행 인자 방식으로 연다: 새 대화는 `session-hub open … -- <launcher> --model <id> --dangerously-skip-permissions`, 재개는 같은 인자에 `--conversation <id>`를 붙인다. 허브는 이 실행 인자를 agy 런타임으로 기록하고 신뢰 화면과 로그인 화면을 시작 화면 판독(`--runner agy`)으로 읽는다(dotfiles 스펙 §3.7). Hermes용 `--agent agy` 열기는 쓰지 않는다.
- 스펙 작성 대화와 Worker 세션 레인이 agy 실행기를 받는다. agy는 세션 ID를 미리 정할 수 없으므로 Codex처럼 뒤에 잡는다.
- `app/protocol.md`의 런타임·제공자 표기를 고친다(지금 `claude|codex`로 적힌 `session_ref` 설명 포함).

## 4. 수용 기준과 테스트 (Test scope)

채집 단계(U2의 PR 전, U2 구현 세션이 Mac Studio의 설치된 launcher와 로그인된 계정으로 실행): 도구 호출과 하위 에이전트가 낀 stream-json 실행 하나의 줄 기록을 고정 입력으로 저장하고, §2의 미확인 가운데 하위 대화가 낀 줄 형태를 확인해 `채집: <항목> — <결과>` 줄을 `UI-ufgo` 본문에 적는다.

자동 테스트는 고정 입력과 가짜 실행 파일만 쓴다. 새 사례를 먼저 쓰고 base에서 실패를 확인한다.

- U1 — `server/worker/exec-enums.test.js`, `server/worker/session-ref.test.js`, `server/worker/session-ref-transcript.test.js`, `server/worker/runner/index.test.js`, `server/worker/policy.test.js`: 값 수용과 여전히 모르는 값(`gemini`)의 거부 / `agy:` 항목 파싱, 재개 명령, 최신 `agy:` 항목이 현재 세션이 됨 / agy 대화 기록 입력이 사용자 입력·응답 이벤트로 바뀜 / 모르는 실행기 이름은 Claude가 아니라 `unknown_runner`.
- U2 — `server/worker/runner/agy.test.js`(새): 명령 조립(launcher, 재개, 분기 거부, 속도 거부), 세션 ID 추출, `SUCCESS`가 아니거나 `result` 줄이 없으면 실패, 종료 코드 0이어도 `status`가 실패면 실패, 사용량 대응, 깨진 줄 무시, 환경에 `BDUI_PRETOOL_HOOK`과 `AGY_SILENT`. `server/worker/runner/guard-pre-tool.test.js`: 실행기 인자 `agy`로 불린 가드가 `gh pr merge`를 거부. `server/worker/agy-model-list.test.js`(새): 목록 파싱, 보관, 읽기 실패 때 마지막 목록, 목록 없음이면 실행 거부, 계정이 바뀌면 보관값을 버림, 기본 보이기 집합, id와 (계열, 노력)의 양방향 변환. `server/worker/runner-catalog.test.js`, `server/auto-pool-store.test.js`: agy 수용. 스케줄러·보류 테스트: 잔량 0이면 실행을 띄우지 않고 재설정 시각까지 보류, 잔량 읽기 실패는 실행을 막지 않음.
- U3 — `server/routes/agy-usage.test.js`(새): 응답 틀, 보관 시간, 실패 때 `available:false`. `server/routes/account-login.test.js`, `account-switch.test.js`, `account-remove.test.js`: agy 흐름, 머리말 계정 줄이 없으면 실패하고 저장하지 않음, 코드가 기록에 없음, 실행 중이면 `busy`, 자격 변경 중 agy 실행이 시작되지 않음, `capabilities`에 따라 숨김과 자동 전환 끔, 성공 뒤 보관값 무효화. 자동 전환이 실행 사이에서만 일어남. 화면 테스트: 사용량 행, 계정 목록.
- U4 — 대화 실행 테스트(가짜 허브): 새 대화와 재개의 실행 인자, 저장소 기본 런타임 `agy`, 워크플로우 모델 저장값이 (계열, 노력) 모양. 화면 테스트: 설정 창의 agy 값.
- 호환성 검사(변경 전에도 통과): `quick-fix-handoff.cross-runtime.test.js`가 dotfiles 착지본과 맞는다.

실제 `agy` 확인(묶음별):

| 묶음 | 확인 | 누가·언제 | 기록 | 완료 전 필수 |
| --- | --- | --- | --- | --- |
| U2 | worktree의 실행기로 짧은 작업 하나를 실제 `agy`로 돌려 세션 ID·판정·사용량이 잡힘 | PR 전 U2 구현 세션 | 완료 보고의 검증 줄 | 예 |
| U2 | Worker가 agy 모델로 고정한 quick_fix Bead 하나를 끝냄 | 운영자 인계(배포 뒤) | `UI-ufgo` 댓글 | 아니오 — 실패하면 결함 Bead |
| U3 | 화면에 agy 사용량이 보임 | 배포 뒤 U3 구현 세션 또는 Worker (`GET /api/agy-usage`) | 완료 보고의 검증 줄 | 예 |
| U3 | 화면에서 agy 재로그인(사람이 코드 입력) | 운영자 인계 | `UI-ufgo` 댓글 | 아니오 — 실패하면 결함 Bead |
| U4 | 저장소 기본 런타임을 agy로 둔 저장소의 새 실행이 agy로 돎 | 운영자 인계 | `UI-ufgo` 댓글 | 아니오 — 실패하면 결함 Bead |

## 5. 구현 unit 후보

착지 묶음 후보(각각 PR 하나). D1~D5는 dotfiles 스펙 §5의 묶음이다.

| 묶음 | 내용 | 선행 |
| --- | --- | --- |
| U1 | 값 수용, `session_ref`의 agy 읽기, 닫힌 기본값(§3.1), 생성 계약 맞추기 | D1(값 수용) |
| U2 | agy 실행기, 실행 전 잔량 조회, 모델 목록과 변환, 활성 실행기로 올리기(§3.2, §3.3) | U1, D2(런타임 자산·가드) |
| U3 | 사용량 화면, 로그인·계정, 자동 전환(§3.4, §3.5) | U2, D5(`agy-auth`) |
| U4 | 저장소별 설정·대화·세션 연결 화면(§3.6) | U2, D4(세션 허브) |

각 묶음은 앞 묶음이 배포된 뒤에 구현에 들어간다. dotfiles의 D2는 U1을 기다린다(agy 세션이 `session_ref`에 `agy:` 항목을 쓰기 전에 beads-ui가 그 항목을 읽어야 한다). 묶음 사이의 `blocks`는 두 저장소의 계획 등록 때 묶음 이슈끼리 적는다.

## 6. 비목표

- 계약 값·가드 훅·세션 허브·`agy-auth` 본체(dotfiles 소유).
- 실행별·Bead별 agy 계정 지정, agy 실행의 분기(fork), 속도 단계.
- Antigravity 앱·IDE 연동, API 키 경로.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — dotfiles 계약은 코드 registry로 복제하고 키 부재는 표시 생략이다; agy 값도 복제본으로 들인다.
- 전제: ADR UI-d9c1 — 자동 전환 후보는 모든 창이 100% 미만인 계정이다; agy 자리에도 같은 규칙을 쓴다.
- 전제: ADR UI-u6ud-9 — 입증된 직접 사용량만 합산한다; 비용 보고가 없는 agy 값에 비용을 지어내지 않는다.
- 전제: ADR UI-ny0h — 머지는 Worker의 단일 순차 큐만 실행한다; agy 실행도 같은 실행 전 가드로 머지 명령을 거부한다.
- agy 모델 선택지의 원천은 `agy models` 목록이다. ① 되돌리기 어려움: 모델 보이기 설정, 프리셋, 자동 풀, dotfiles 선택기의 id 풀이가 같은 id 집합에 묶인다(성립) ② 맥락 없이 놀라움: Claude는 고정 목록인데 agy는 CLI 목록이고 노력 선택지가 없는 이유가 id 형식이라는 점은 코드만으로 알기 어렵다(성립) ③ 진짜 트레이드오프: 고정 목록을 코드에 두는 안이 있었고 사용자가 "실제로 열린 목록"을 골랐다(성립). `summary`: "beads-ui의 Codex 모델 선택지는 서버가 Codex CLI 목록(codex debug models)을 비동기로 읽어 dotfiles와 같은 규칙(계열별 최신 list·v2 → 별칭, 모든 적격 버전 → <계열>-<버전> 고정 이름)으로 만들고, 규칙은 JS로 복제해 dotfiles 해석기와 교차 테스트로 묶는다; 마지막 성공 목록을 영속해 읽기 실패가 카탈로그를 줄이지 않으며, effort·speed는 계열 템플릿을, 단가는 별칭이 해석된 고정 이름의 것을 상속하며, 목록에서 빠진 고정 이름의 저장값은 원문을 보존하고 실행은 기본값으로 대신한다 — agy 모델 선택지도 서버가 agy models 목록을 읽어 보관한 것이고 보관값은 읽을 때의 활성 계정에 묶여 계정이 바뀌면 버리며, 세션 모델은 id 그대로, 워크플로우 모델은 계열과 노력으로 나눠 저장한다" → ADR, supersede UI-gpac
- 화면의 agy 로그인·계정 추가는 머신 전역 활성 자격을 바꾼다(Claude·Codex 로그인은 지금처럼 격리 로그인이다). ① 되돌리기 어려움: 로그인 경로, 계정 목록 화면, 전환·자동 전환 시점 규칙, dotfiles `agy-auth`의 자리 보관이 "agy 자격은 한 자리"에 함께 묶인다(성립) ② 맥락 없이 놀라움: 같은 화면의 로그인 단추가 제공자에 따라 활성 계정을 바꾸기도 하고 안 바꾸기도 하는 이유가 agy의 자격 저장 방식이라는 점은 코드만으로 알기 어렵다(성립) ③ 진짜 트레이드오프: 임시 홈 폴더에서 로그인해 자격만 옮기는 안이 있었으나 자격 파일 교체가 동작하는지가 확인되지 않았다(성립). `summary`: "화면 로그인·계정 추가는 Claude·Codex에서 활성 계정을 바꾸지 않는 격리 로그인이고, Claude 계정 추가는 cswap login 뒤 같은 창에서 cswap session login까지 이어 세션 전용 로그인을 만들며 그 성공은 종료 코드와 계정 목록의 sessionLoginOwn으로 확인한다 — agy만 자격이 머신에 한 자리라 화면 로그인이 활성 계정을 바꾸고 그 성공은 로그인 창 머리말의 계정 줄로 확인하며, 자격을 바꾸는 동작은 agy 실행이 없을 때 하나씩만 돈다; 나머지 조항은 UI-xm29 그대로다" → ADR, supersede UI-xj50
- 등록되지 않은 실행기 이름은 거부한다 — 되돌리기 쉬움(대체 한 줄) → ADR 아님
- agy 계정은 전역 하나이고 전환은 실행 사이에서만 한다 — 위 로그인 ADR의 조항으로 적는다(소비자 집합이 같다) → ADR 아님
- agy 실행의 실행 전 가드는 dotfiles 훅이 beads-ui 스크립트를 부르는 방식이다 — 되돌리기 쉬움(환경 변수 하나와 호출 한 곳) → ADR 아님
- 기본으로 보이는 모델 다섯과 기본 모델 — 기본 제외 목록(표시 형식·숫자 한도) → ADR 아님

## 8. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소의 최상위 단위 — 계약 값, 가드 훅(`BDUI_PRETOOL_HOOK` 호출 포함), 세션 허브, `agy-auth`를 dotfiles가 소유한다. 두 저장소의 묶음이 서로 엇갈려 기다리므로(§5의 묶음별 선행) Bead 사이가 아니라 묶음 이슈 사이에 선행을 걸고, 각 묶음은 선행 묶음의 배포를 확인한 뒤 구현에 들어간다. 스펙: dotfiles `docs/superpowers/specs/2026-11-26-agy-full-runtime-design.md` | 없음 | dotfiles-uop05 |
