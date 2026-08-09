# 워커 멀티 프로바이더 runner 지원 설계 (UI-jrb3)

- 날짜: 2026-08-09
- Bead: UI-jrb3 (route: spec_backed)
- 크로스-repo 관련 유닛: dotfiles-mqcj — 스텝별 모델/effort 계약 키 어휘의 canonical 정의는 dotfiles `docs/contracts/workflow.{md,yaml}`이 소유하고, 본 스펙은 그 소비 측 구현을 정의한다.

## 1. 배경과 목적

워커는 현재 bead당 단일 claude 헤드리스 세션 하나만 스폰한다. 세션 엔진(`server/worker/runner/session.js`)은 `AdapterSpec` 인터페이스(`buildArgv`/`normalize`/`detectQuestion`/`extractShellCommand`/`extractSessionId`/`verdict`)를 소비하는 어댑터 구조지만, 레지스트리는 `RUNNERS = ['claude']`(`server/worker/runner/index.js:15`)로 봉인돼 있다. 과거 codex/ccx 어댑터는 worker-phase1 §4(2026-07-25)에서 retire됐다 — 당시 사유는 plan-save 훅이 claude 전용이라는 것이었고, 워커가 모든 런치에 `fast_track: true`를 강제(`server/worker/scheduler.js:2566-2569`)하는 현재 구조에서는 실질 차단 요인이 아니다(§7에서 재확인 절차 명시).

목적: 워커를 프로바이더 확장 가능 구조로 전환한다 — codex runner 부활, 모델/effort 카탈로그의 config화, codex 세션 라이브/resume 연동, 스텝별 모델·effort 설정 UI.

## 2. 확정된 설계 결정 (사용자 승인)

1. **codex 통합은 1단계 `codex exec --json`, 2단계 app-server JSON-RPC는 후속 Bead.** 기존 세션 엔진(스폰→fd transcript→tail→WS 라이브→재시작 복구)을 그대로 재사용하기 위함. app-server 전환 비용은 어댑터 1파일에 국한된다.
2. **카탈로그는 코드 내장 기본값 + `~/.config/bdui/config.toml` `[runner.<name>]` 오버라이드.** zero-config 첫 실행이 그대로 동작하고, 새 모델은 config 추가만으로 반영된다.
3. **runner 선택 UX는 그룹된 단일 모델 셀렉터.** 모델명은 카탈로그 전체에서 유일하므로 모델 선택이 runner를 확정하고, runner는 파생돼 메타데이터에 명시 저장된다. effort 셀렉터는 해당 runner의 어휘로 자동 전환.
4. **스텝별 완전 분리 + 폴백 없는 일괄 정합 + codex 단축명.** `review_model`은 폐기하고 하위 호환 폴백을 남기지 않는다. codex 모델은 메타데이터/UI에서 `sol`/`terra`/`luna` 단축명을 쓰고, 어댑터가 argv 조립 시 전체 ID(`gpt-5.6-sol` 등)로 변환한다.

## 3. 스코프

### 포함

- (A) runner 레지스트리 확장과 `runner/codex.js` 어댑터 신설
- (B) `runner-catalog.js` 신설 — 내장 카탈로그 + config 오버라이드 + WS 스냅샷 제공
- (C) exec 키 확장 소비 — 스텝별 리뷰 모델/effort 키, runner 파생 해석(`policy.js`), `exec-enums.js` 대체
- (D) codex 세션 라이브·세션 id·resume·재시작 복구 연동
- (E) preamble/env의 claude 전용 가정 분기
- (F) UI: per-bead exec 설정·워크스페이스 전역 기본값 다이얼로그 재구성

### 비-목표

- app-server JSON-RPC 전환 (후속 Bead로 분리)
- 스텝별 키 어휘의 계약 정의 (dotfiles-mqcj 소유 — 본 스펙은 소비만)
- claude/codex 외 제3 프로바이더 어댑터 (구조만 열어둔다)
- 세션 내부 workflow 스킬의 동작 변경 (dotfiles 소유)
- `workflow_mode` 축 변경 (fast_track 강제는 현행 유지)

## 4. 아키텍처

### A. Runner 레지스트리와 codex 어댑터

`server/worker/runner/index.js`:

- `RUNNERS = ['claude', 'codex']`. `createRunner(runner_name, deps)`는 이름으로 spec을 해석하고, 미지/누락 이름은 `claude`로 폴백한다(기존 호출부 호환).
- 반환 shape `{ name, spawn(bead, workspace, settings) }`는 유지한다.

`server/worker/runner/codex.js` (신설) — `AdapterSpec` 구현:

- `buildArgv(bead, workspace, settings)`:
  - 기본: `codex exec --json -m <full_model_id>` + `-c model_reasoning_effort=<effort>`(effort 지정 시).
  - 무인 실행: claude `--permission-mode bypassPermissions`의 등가물로 `--dangerously-bypass-approvals-and-sandbox`(또는 동등한 `-c approval_policy=never -c sandbox_mode=danger-full-access` 조합 — 구현 시 설치된 CLI 버전에서 실측해 하나로 고정, §6 검증 항목).
  - resume 분기: `settings.resume_session_id` 존재 시 `codex exec resume <session_id> --json ...` (스펙 §D).
  - 시스템 프롬프트 채널: codex에는 `--append-system-prompt`가 없으므로 `applyPreamble()`의 계약 텍스트를 task 프롬프트 앞에 접두한 단일 positional 인자로 전달한다. claude 어댑터와 동일하게 조립 결과(`system_prompt`/`task_prompt`)를 argv와 함께 반환해 기록 경로가 재조립 없이 동일 소스를 읽게 한다(UI-rxp3 §3와 같은 원칙).
  - env: `CLAUDE_HOOK_SUPPRESS`는 넣지 않는다. codex 쪽 훅 억제 필요가 실측되면 대응 키를 카탈로그 config `[runner.codex.env]`로 선언한다.
- `normalize(raw)` — codex JSONL 이벤트를 기존 `RunnerEvent`(`text`/`tool`/`result`)로 매핑:
  - 어시스턴트 메시지 아이템 → `{kind:'text'}`
  - 커맨드 실행 아이템 → `{kind:'tool', name:'shell', input:{command}}` (merge 가드가 소비)
  - 턴 종료 이벤트 → `{kind:'result', usage}` — usage는 codex 토큰 필드를 기존 집계 필드(`input_tokens`/`output_tokens`/`cache_read_input_tokens`)로 투영하고, 매핑 불가 필드는 드롭(fail-quiet, claude 어댑터 §pickUsage와 동일 원칙).
  - 정확한 이벤트/필드명은 구현 착수 시 설치된 codex CLI로 fixture를 실측 캡처해 고정한다(§6). 웹 문서 기준 후보: `thread.started`, `turn.completed`, `item.*`.
- `extractSessionId(raw)`: 스레드 시작 이벤트의 thread/session id. 최초 1회만 attempt에 기록(기존 `session_id` 이벤트 경로 재사용).
- `detectQuestion(raw)`: 승인 요청(approval request) 계열 이벤트를 감지하면 blocker — 기존 fail-closed 경로(SIGTERM·group kill)를 그대로 탄다. 무인 플래그로 승인 요청이 원천 차단되는 구성이라면 이 감지는 안전망이다.
- `extractShellCommand(raw)`: 커맨드 실행 아이템의 command 문자열 — `command-guard.js`(gh pr merge 킬, base push 경고)가 runner 무관하게 작동한다.
- `verdict(ctx)`: 마지막 턴 종료 이벤트 기준 — 실패 이벤트(turn.failed 계열)나 종료 이벤트 부재는 실패(`no_result`), 정상 종료는 성공. claude의 2-rule 판정과 동형의 "마지막 이벤트 판정" 원칙.

### B. 카탈로그 (`server/worker/runner-catalog.js` 신설)

내장 기본값:

```
claude: {
  command: 'claude',
  models: { opus:{}, sonnet:{}, haiku:{}, fable:{} },
  efforts: [low, medium, high, xhigh],
  default_model: 'opus'
}
codex: {
  command: 'codex',
  models: {
    sol:   { id: 'gpt-5.6-sol',   efforts: [low, medium, high, xhigh] },
    terra: { id: 'gpt-5.6-terra', efforts: [low, medium, high, xhigh] },
    luna:  { id: 'gpt-5.6-luna',  efforts: [low, medium, high, xhigh, max] }
  },
  efforts: [minimal, low, medium, high, xhigh]   // 모델별 efforts가 우선
}
```

- 어휘: 메타데이터/UI/카탈로그 키는 단축명(`sol` 등), 어댑터가 `models[<name>].id`로 전체 ID를 조립한다. claude 모델은 alias가 곧 CLI 값이므로 `id` 생략 시 키를 그대로 쓴다.
- 모델별 `efforts`가 있으면 runner 전역 `efforts`보다 우선한다(luna의 `max` 지원 등 — 실측 검증 §6).
- config 오버라이드: `~/.config/bdui/config.toml`의 `[runner.<name>]`/`[runner.<name>.models.<model>]`이 내장 값을 딥 머지로 오버라이드/확장한다(`server/config.js` 기존 smol-toml 파싱 경로에 편입). 파싱 실패·부분 비정합은 내장 카탈로그로 fail-quiet + 서버 로그 경고. 새 runner 섹션 선언만으로는 어댑터가 없으므로 디스패치 대상이 되지 않는다(어댑터 존재가 활성 조건).
- 스냅샷 제공: 워커 큐 WS 스냅샷(`workspace_info` 계열)에 resolved 카탈로그를 포함해 프론트가 셀렉터를 렌더한다. `app/views/detail-panel/exec-settings.js:11-15`의 로컬 enum 배열은 삭제한다(서버/프론트 이중 하드코딩 제거).

### C. exec 키와 해석 (`policy.js`, `exec-enums.js` 대체)

dotfiles-mqcj가 계약으로 확정할 키 어휘(본 스펙의 소비 전제):

- `orchestration_model` / `orchestration_effort` — 크로스-프로바이더(카탈로그 전체 모델 어휘).
- `spec_review_model` / `spec_review_effort`, `impl_review_model` / `impl_review_effort` — 각각 `[codex, opus, fable, self, skip]`(= harness `review.options`) + effort.
- `plan_review_model` / `plan_review_effort` — `[codex, fable, skip]`(= harness `plan_review.options`; `self`/`opus`는 계약 어휘에 없음) + effort. (`codex` 토큰의 의미·리뷰어 매핑은 계약 소유.)
- `impl_model` / `impl_effort` — 구현 위임 tier.
- **`review_model`은 폐기, 폴백 없음**: `EXEC_SETTING_ENUMS`에서 제거하고, `queue-store.js` normalize가 레거시 `worker_runner`/`gpt-5.6` 값과 같은 방식(`server/worker/queue-store.js:701-711`)으로 기존 저장값을 드롭한다. 기존 bead의 `review_model` 메타데이터는 무시된다(세션 내 스킬 소비도 계약 변경과 함께 종료 — dotfiles-mqcj).

해석(`resolveExecSettings`):

- 층위(bead 메타데이터 > 워크스페이스 전역 > 최종 폴백)와 `stamped_keys` 의미는 현행 유지.
- `orchestration_model` 해석 후 **runner는 카탈로그 역참조로 파생**한다(모델명 → 소속 runner). 최종 폴백은 현행 `opus`(=claude) 유지.
- `orchestration_effort`는 파생된 runner(모델별 efforts 우선)의 어휘로 검증하고, 비정합 값은 다음 층으로 fall-through, 최종 미해석 시 unset(현행과 동일: unset이면 effort 플래그 미전달).
- 리뷰 3스텝·impl 키는 세션 내 스킬 소비용 pass-through로 현행 `review_model`/`impl_model`과 같은 지위를 유지하되 키 수만 늘어난다. 워커 launcher는 소비하지 않는다.
- `launchSession`은 resolved `{runner, model, effort}`를 settings로 넘기고 `createRunner(runner)`로 스폰한다. attempt 레코드와 알림(`notify.js` attemptStarted)에 runner를 포함한다.

### D. 세션 라이브·세션 id·복구

- transcript 경로·fd 직결 기록·tail-reader·WS(`subscribe-session-log`) 파이프라인은 **무변경 재사용**. codex 어댑터의 `normalize`가 같은 `RunnerEvent`를 내므로 라이브 드로어·usage 배지가 동일하게 동작한다.
- attempt 레코드(`queue-store.js`)에 `runner` 필드를 추가한다(스냅샷 필드로 노출). `session_id`는 codex thread id를 같은 필드에 저장한다.
- resume: `scheduler.js`의 resume 경로가 attempt의 `runner`로 어댑터를 선택하고, codex는 `codex exec resume <id>` argv 분기를 탄다. `session_id` 부재 시 거부(`no_session_id`) 로직은 현행 유지.
- `session-monitor.js`: 재시작 복구 시 attempt의 `runner` 기록으로 spec을 선택한다. `runner` 기록이 없는 레거시 attempt만 `claudeSpec()` 기본값(`server/worker/session-monitor.js:61-62`의 고정 해소).

### E. preamble·env 분기

- `applyPreamble()`의 계약 텍스트는 런타임 중립을 유지한다(이미 한국어 지시문 — codex 오케스트레이션이면 세션 내 workflow 스킬이 dotfiles의 Codex 런타임 지침·Sol/Terra/Luna tier로 동작하며, 이는 dotfiles에 이미 준비돼 있다).
- 시스템 프롬프트 전달 채널만 어댑터별로 다르다: claude `--append-system-prompt`, codex 접두 결합(§A).
- `CLAUDE_HOOK_SUPPRESS=1`은 claude 어댑터 내부로 한정한다(현행 위치 그대로 — codex argv에는 미포함).
- PR 지시문(`gh pr create --base ...`)은 양 런타임 공통 CLI(`gh`)라 분기 불요.

### F. UI

- **per-bead exec 설정**(`app/views/detail-panel/exec-settings.js`)과 **전역 기본값 다이얼로그**(`app/views/worker/exec-defaults-dialog.js`)를 스냅샷 카탈로그 기반으로 재구성:
  - 모델 셀렉터: optgroup으로 runner 그룹 표시(claude: opus/sonnet/haiku/fable, codex: sol/terra/luna). 선택 시 runner가 파생·표시된다.
  - effort 셀렉터: 선택된 모델의 effort 어휘로 옵션 갱신. 현재 저장값이 새 어휘에 없으면 "(unset)" 표시.
  - 스텝별 리뷰 셀렉터 3조(spec/impl/plan) + effort, impl 위임 셀렉터 + effort. 옵션은 스냅샷 카탈로그와 계약 어휘에서 렌더.
- `DEFAULT_LABELS`의 `opus` 폴백 미러 주석(`server/worker/policy.js:23-25`)은 카탈로그 참조로 갱신.

### G. 오류 처리

- config 카탈로그 파싱 실패 → 내장 카탈로그 + 로그 경고(fail-quiet).
- codex 바이너리 부재/스폰 실패 → 기존 spawn 실패 경로로 attempt 실패 표시(레인에 노출). 사전 프리플라이트는 도입하지 않는다(단순성 우선).
- 미지 모델/effort 메타데이터 값 → 기존 enum fall-through 패턴 유지.
- codex 스트림에 판정 가능한 종료 이벤트가 없으면 `no_result` 실패(fail-closed).

## 5. 데이터 흐름 요약

```
bead 메타데이터 + 전역 기본값
  → resolveExecSettings() — 모델 해석, runner 카탈로그 역참조, effort 검증
  → launchSession(settings{runner, model, effort, fast_track, ...})
  → createRunner(runner).spawn() — claudeSpec | codexSpec
  → buildArgv() — runner별 CLI argv (+시스템 프롬프트 채널 분기)
  → spawn(detached, fd→transcript jsonl)
  → tail-reader → normalize() → RunnerEvent 스트림
  → 세션 라이브 WS / usage 집계 / command-guard / question blocker / verdict
  → attempt 기록(session_id, runner) → resume/복구
```

## 6. 구현 착수 시 실측 검증 항목 (스펙 전제의 고정)

웹 문서 기반 전제는 설치된 codex CLI에서 실측해 fixture로 고정한 뒤 어댑터를 구현한다:

1. `codex exec --json`의 이벤트/필드 스키마(스레드 시작·아이템·턴 종료·usage 필드) — 실측 JSONL을 `server/worker/__fixtures__`에 캡처.
2. 무인 실행 플래그 조합(`--dangerously-bypass-approvals-and-sandbox` vs `-c` 조합)과 승인 요청 이벤트의 실제 형태.
3. `codex exec resume <id> --json` 동작과 resume 시 프롬프트 전달 방식.
4. `-c model_reasoning_effort=` 허용 값, 특히 luna의 `max` 지원 여부(미지원이면 카탈로그에서 제외).
5. worker-phase1 retire 사유(plan-save 훅 claude 전용)의 현재 영향: fast_track 강제 하에서 full_plan 진입 경로가 워커 세션에 존재하는지 확인하고, 존재하면 codex runner에서의 동작을 스펙 리뷰 시점에 dotfiles-mqcj와 정합.

## 7. 마이그레이션과 크로스-repo 순서

1. **dotfiles-mqcj 선행**: 스텝별 키 어휘(`spec_review_model` 등)와 `review_model` 폐기를 계약(workflow.yaml)·workflow 스킬·drift-check에 먼저 반영한다. beads-ui는 그 어휘를 소비한다.
2. **beads-ui(본 스펙)**: A~F 구현. `review_model`은 enum·UI·normalize에서 제거(폴백 없음, 일괄 정합 — 사용자 결정 §2-4).
3. 배포는 현행 규약(머지 → `docs/agents/repo-ops.toml [deploy]` → `bdui-shared restart` → 프로세스/포트/HTTP 검증) 그대로.
4. **후속 Bead(별도)**: codex app-server JSON-RPC 전환.

## 8. Test scope

RED-GREEN seam은 아래 경계로 한정한다(`tdd` 스킬 소비용):

1. **codex 어댑터 순수 함수** (`runner/codex.js`): 실측 fixture JSONL 입력 → `normalize`/`extractSessionId`/`extractShellCommand`/`detectQuestion`/`verdict`/usage 투영 출력. `claude.test.js` 패턴 재사용.
2. **buildArgv**: 모델 단축명→전체 ID 변환, effort 플래그, resume 분기, 시스템 프롬프트 접두 결합, 무인 플래그.
3. **카탈로그** (`runner-catalog.js`): 내장 기본값, config 딥 머지 오버라이드, 파싱 실패 fail-quiet, 모델별 efforts 우선.
4. **policy 해석**: 모델→runner 파생, runner별 effort 검증·fall-through, `review_model` 부재(드롭) 확인, stamped_keys 불변.
5. **queue-store**: attempt `runner` 필드 왕복, 레거시 `review_model` normalize 드롭.
6. **session-monitor**: attempt runner 기록 기반 spec 선택, 레거시 폴백.
7. **레지스트리**: `createRunner('codex')` 해석, 미지 이름 claude 폴백.
8. 스폰 통합은 `fixture-spawn.js` 패턴으로 codex 가짜 스트림 재생 테스트 1본.

프론트 셀렉터 렌더는 기존 테스트 관례(있는 범위)에 따르고, 스냅샷 카탈로그 전달은 ws 테스트로 검증한다.

## 9. 참조

- `server/worker/runner/{index,claude,session,session-monitor,preamble,command-guard}.js`
- `server/worker/{exec-enums,policy,queue-store,scheduler}.js`
- `app/views/detail-panel/exec-settings.js`, `app/views/worker/exec-defaults-dialog.js`
- retire 이력: `docs/superpowers/specs/2026-07-25-worker-phase1-pause-claude-only.md` §4
- 과거 codex 어댑터 argv: `docs/superpowers/specs/2026-07-24-worker-attempt-resume-verify-autodetect.md:49`
- dotfiles: `docs/contracts/harness.yaml`(model_tiers·review 테이블), `docs/contracts/workflow.yaml`(실행 선호 키), Bead dotfiles-mqcj
- 사례 조사: Vibe Kanban executor 구조(어댑터=코드/카탈로그=메타데이터 분리, capability enum, resume 이형), Codex CLI 공식 문서(exec/--json/resume/profiles)
