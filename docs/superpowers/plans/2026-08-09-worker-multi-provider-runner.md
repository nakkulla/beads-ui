# UI-jrb3: 워커 멀티 프로바이더 runner 구현 계획

## Context

beads-ui 워커는 bead당 단일 claude 헤드리스 세션만 스폰한다(`server/worker/runner/index.js:15` `RUNNERS=['claude']`). 승인·리뷰된 스펙 `docs/superpowers/specs/2026-08-09-worker-multi-provider-runner-design.md` @ `90e59fae`(spec_review=codex@90e59fa)가 codex runner 부활·카탈로그 config화·스텝별 모델/effort 설정·codex 세션 라이브/resume 연동을 확정했다. 이 계획은 그 스펙의 실행 순서를 phase로 고정한다 — 설계 결정은 스펙이 소유하고 여기서는 반복하지 않는다.

핵심 배선 사실(탐색 확정):
- `attempt.runner` 필드는 이미 존재(`queue-store.js:576`)하고 scheduler가 이미 기록한다(`scheduler.js:2684,3080,3317`) — 값이 `'claude'` 리터럴 3곳(`scheduler.js:2192,3027,3240`)에서 하드코딩될 뿐이다.
- `relaunchFromAttempt`(`scheduler.js:3236`)는 주석상 runner를 "inherited verbatim"이라 주장하지만 실제로는 `prior.runner`를 무시한다.
- usage 복구는 `attach.js:966`(`recoverRunningAttempts` → `replayUsage`)이고, `usage-replay.js:19`·`session-monitor.js:21`이 claude 전용 `liftUsage`를 직접 import한다.
- `createSessionMonitors`는 워크스페이스당 1회 생성되므로(`attach.js:466-475`) spec 선택을 생성 시점에서 `.start()`(attempt별) 시점으로 옮겨야 한다.
- bead 메타데이터의 exec 키는 `attach.js`의 `snapshotBead`가 `BeadSnapshot`으로 읽어 policy에 공급한다(`attach.js:233-243`) — 새 키는 여기도 확장해야 층위·`stamped_keys`가 성립한다.
- 스냅샷은 `decorateQueue`(`ws/worker-handlers.js:577-669`)가 조립하고 프론트 `worker-queue-store`는 새 top-level 키를 무가공 통과시킨다.
- 프론트 transcript 렌더러는 이미 codex 라인 셰이프를 파싱한다(`transcript-render.js:16,324,366`); `__fixtures__/codex-failure.jsonl`이 이미 존재한다.

**선행 조건(크로스-repo)**: dotfiles-mqcj(스텝별 계약 키 착륙 + `repo-deploy` 런타임 전파, 사용자 별도 세션 진행)가 완료돼야 **Phase 4(계약 키 소비 전환·UI)** 진입이 유효하다. Phase 1~3은 계약 키를 건드리지 않는다 — orchestration 축(기존 키)과 워커 내부 배선만 다룬다. 머지는 mqcj 착륙 확인 후에 한다.

비-목표: app-server JSON-RPC 전환(UI-jyqb), `workflow_mode` 축 변경, 세션 내 workflow 스킬 동작(dotfiles 소유), 제3 프로바이더 어댑터.

## Phase 1: codex CLI 실측·카탈로그 기반

1. **실측 선행**(스펙 §6 — 카탈로그 확정의 입력): 설치된 codex CLI로 `codex exec --json` 이벤트 스키마·무인 플래그 조합·`exec resume` 동작·effort 허용값(**luna `max` 지원 여부 포함**)·훅 비활성 플래그 존부를 실측하고, fixture JSONL을 `server/worker/__fixtures__/`에 캡처한다(기존 `codex-failure.jsonl` 갱신 포함). 실측 결과가 카탈로그의 codex effort 어휘와 어댑터 argv를 확정한다.
2. `server/worker/runner-catalog.js` 신설 — 실측으로 확정된 내장 카탈로그(claude: opus/sonnet/haiku/fable + low~xhigh; codex: sol/terra/luna 단축명→`gpt-5.6-*` id, 모델별 efforts), `~/.config/bdui/config.toml` `[runner.<name>]` 딥 머지 오버라이드, 머지 후 모델명 전역 유일성 검증(충돌 무시+경고), 파싱 실패 fail-quiet, **resolved catalog는 등록된 어댑터가 있는 runner만 포함**(어댑터 없는 config 선언 runner는 비활성).
3. `server/worker/policy.js` — `orchestration_model`→카탈로그 역참조 runner 파생, 파생 runner(모델별 efforts 우선) 어휘로 `orchestration_effort` 검증·fall-through, 최종 폴백 opus/claude 유지, stamped_keys 불변. **스텝별 계약 키는 여기서 다루지 않는다(Phase 4).**

검증: 카탈로그(내장/머지/유일성/비활성 runner 제외)·policy(codex 모델 파생·effort 검증) 유닛 테스트 RED→GREEN + `npm run tsc`.

## Phase 2: codex 어댑터

1. `server/worker/runner/codex.js` 신설 — `codexSpec(catalog_entry)`: **카탈로그 entry(command·모델 id 맵·efforts)를 입력으로** `buildArgv`(단축명→전체 id, `-c model_reasoning_effort`, 실측 확정 무인 플래그, resume 분기, 계약 프롬프트 접두 결합, env `CODEX_SILENT=1`, 실측된 훅 비활성 플래그 존재 시 포함), `normalize`/`liftUsage`/`extractSessionId`(thread id)/`detectQuestion`(승인 요청 fail-closed)/`extractShellCommand`/`verdict`, `spawnCodex`.
2. `liftUsage`를 `AdapterSpec` required 멤버로 승격 — `session.js` 타입 갱신, `claude.js` 기존 구현을 spec 멤버로 노출.
3. `server/worker/runner/index.js` — `RUNNERS=['claude','codex']`, `createRunner(name)`가 **resolved catalog entry를 어댑터에 전달**(command/모델 id override가 argv까지 관통), 미지 이름 claude 폴백(카탈로그 비활성 규칙과 정합 — 같은 판정 소스).

검증: fixture 기반 어댑터 순수 함수 테스트(**`extractShellCommand`·훅 플래그 argv·모델별 effort 우선순위 케이스 포함**) + `fixture-spawn.js` 패턴 codex 스트림 재생 통합 1본 + config command/모델 id override가 argv에 반영되는 테스트 GREEN.

## Phase 3: scheduler·복구 배선

1. scheduler 하드코딩 3곳 교체 — `dispatch`(`:2192`)=resolved runner; `dispatchExternalConflict`(`:3027`)=**`prior.runner ?? resolved runner`**(스펙 §C-2: 직전 attempt 우선, 없으면 exec 해석); `relaunchFromAttempt`(`:3240`)=`prior.runner ?? 'claude'`(주석의 verbatim 상속 주장과 실제를 일치).
2. usage seam 소비 — `usage-replay.js`가 runner 인자로 어댑터 `liftUsage` 선택, `attach.js` `recoverRunningAttempts`(`:951-981`)가 `a.runner` 전달.
3. session-monitor spec 선택 이동 — 생성 시 `deps.spec` 고정(`session-monitor.js:62`)을 `.start()` 시 `attempt.runner` 기반 선택으로 변경(무기록 attempt는 claudeSpec 폴백).
4. `notify.js` `attemptStarted`에 runner 포함(입력·표시 형식) — 스펙 §C 요구.

검증: scheduler 3경로(일반 dispatch codex 기대, **external conflict prior=codex·전역 default=claude 케이스**, relaunch 상속)·usage replay·monitor 선택·notify 표시 RED→GREEN + 전체 `npm test`.

## Phase 4: 계약 키 전환·스냅샷·UI (선행: dotfiles-mqcj 착륙+repo-deploy 전파 확인)

1. 계약 키 일괄 전환(서버) — `exec-enums.js`에 스텝 키 6개+`impl_effort` 추가·`review_model` 제거; `queue-store.js` exec_defaults 수용 확장·레거시 `review_model` normalize 드롭; **`attach.js` `BeadSnapshot`/`snapshotBead`(`:233-243`)에 신규 키 읽기 추가·legacy `review_model` 읽기 제거**(bead 우선·stamped_keys 성립); `policy.js` 스텝 키 층위 해석 추가; `ws/mutation-handlers.js`·`worker-queue-set-exec-default` 어휘 확장.
2. `decorateQueue`(`:631-668`)에 top-level `runner_catalog` 추가(resolved 카탈로그 전달) + ws 테스트.
3. 프론트 재구성 — `exec-settings.js` 로컬 enum(`:11-17`) 삭제·`runner_catalog` 기반 optgroup 모델 셀렉터(runner 파생 표시)·runner별 effort 필터·스텝별 셀렉터 4조(spec/impl/plan 리뷰+impl 위임, 각 +effort)·self/skip 시 effort 비활성(mqcj §4.4)·`(비호환)` 관례 유지; `exec-defaults-dialog.js` `EXEC_ROWS` 동일 재구성.

검증: 서버 유닛(BeadSnapshot 신규 키·stamped_keys·normalize 드롭)+ws 스냅샷+**UI focused 테스트(optgroup 구성·effort 필터 전환·스텝 키 4조 mutation·self/skip effort 비활성)** + `npm run lint`·`tsc`·`npm test`·`npm run build` GREEN.

## Phase 5: 통합 검증·PR·배포

1. Pre-Handoff 번들 전체(`tsc`/`test`/`lint`/`prettier:write`/`build`), `app/main.bundle.js`(+map) 포함 커밋 시리즈 정리.
2. PR 생성(`origin` nakkulla/beads-ui, base main) → implementation 게이트(통합 diff, 1회) → 머지(beads-ui 머지 클릭 또는 pr-finish).
3. 머지 후: `docs/agents/repo-ops.toml` `[deploy]` 자동 경로(`bdui-shared restart`) 확인 + 프로세스 경로·포트·HTTP 응답 검증 + codex 디스패치 스모크 1건(sol 모델 attempt → 세션 라이브·usage 배지·세션 id·resume 확인).

검증: 배포 3종 검증과 codex 스모크 결과를 Bead 보고서에 기록.

## Test scope

RED→GREEN seam(스펙 §8 매핑):
- Phase 1: 카탈로그 내장/머지/유일성/fail-quiet/**어댑터 없는 runner 비활성**, policy codex 모델 파생·effort 검증(현행 어휘에 codex 모델 부재로 변경 전 실패).
- Phase 2: codex 어댑터 순수 함수 — normalize/세션id/질문/판정/usage/**extractShellCommand**, buildArgv/env(`CODEX_SILENT=1`·**실측 훅 플래그**·**모델별 effort 우선순위**·config command/모델 id override 관통).
- Phase 3: scheduler 3경로(일반 dispatch, **external conflict의 prior 우선**, relaunch 상속)가 codex attempt 기대로 스폰(현행 무조건 claude), usage-replay·monitor의 runner별 seam 선택, notify runner 표시.
- Phase 4: exec-enums/queue-store/**BeadSnapshot 신규 키·stamped_keys**, ws 스냅샷 `runner_catalog`, **UI focused — optgroup 구성·effort 필터 전환·스텝 키 mutation·self/skip effort 비활성**.

제외(characterization, RED 아님): attempt `runner` 왕복, 무기록/미지 runner의 claude 폴백, 레거시 `review_model` 드롭 — 현행 동작 보존 확인만.
