---
scope:
  - server/worker/runner-catalog.js
  - server/worker/runner/
  - server/worker/policy.js
  - server/worker/exec-enums.js
  - server/worker/agy-model-list.js
  - server/worker/scheduler.js
  - server/worker/guard-hook.js
  - server/worker/provider-health.js
  - server/worker/provider-holds.js
  - server/worker/session-ref.js
  - server/worker/session-ref-transcript.js
  - server/worker/usage-pricing.js
  - server/worker/usage-receipts.js
  - server/worker/spec-authoring.js
  - server/worker/tmux-launcher.js
  - server/worker/session-lane.js
  - server/routes/agy-usage.js
  - server/routes/account-login.js
  - server/routes/account-switch.js
  - server/routes/account-remove.js
  - server/auto-pool-store.js
  - server/conversation-settings.js
  - server/app.js
  - server/ws/
  - repo-ops/post-merge.d/
  - app/views/usage-meter.js
  - app/views/settings-dialog/
  - app/views/detail-panel/
  - app/protocol.md
  - generated/contracts/
  - docs/adr/
---

# agy를 세 번째 실행 런타임으로 더하는 구현 계획 (beads-ui)

Bead: `UI-ufgo` · 스펙: `docs/superpowers/specs/2026-11-26-agy-runtime-design.md` @ `f00784b69df533746660176b57549027dc924f0d`

## Context

beads-ui는 Claude·Codex 두 런타임만 안다. 사용자가 2026-11-26에 `agy`(Antigravity CLI)를 같은 자리에 두기로 했고 Google 약관 위험을 수용했다. 설계와 `결정:` 줄은 위 스펙이 정본이고 이 계획은 그 스펙 §5의 묶음 U1~U4를 Phase 넷으로 옮긴 것이다. 설계를 새로 정하지 않는다.

새 세션이 알아야 할 것:

- Phase 하나가 PR 하나다. 묶음 이슈는 계획 등록 때 만들어지고 `UI-ufgo`가 마지막 묶음(Phase 4)을 맡는다.
- dotfiles 쪽은 별도 계획(`dotfiles-uop05`, 묶음 D1~D5)이다. 저장소 사이의 선행은 묶음 이슈끼리의 `blocks`로 건다: Phase 1은 `dotfiles-c5jko`(D1 값 수용), Phase 2는 `dotfiles-tede7`(D2 런타임 자산·가드), Phase 3은 `dotfiles-uop05`(D5 `agy-auth`), Phase 4는 `dotfiles-8171c`(D4 세션 허브)와 `dotfiles-h85sk`(D3 위임 전송과 계약 행)를 기다린다. 거꾸로 `dotfiles-tede7`은 Phase 1의 이슈를 기다린다. 각 Phase는 선행 묶음이 배포된 뒤에 구현에 들어간다.
- 구현 세션은 실제 `agy`를 실행해도 된다(스펙 §1의 사용자 결정). 자동 테스트는 고정 입력과 가짜 실행 파일만 쓴다.
- `agy`는 항상 launcher `~/.local/bin/agy`로 띄운다.
- `agy-auth` 방식 확인(2026-11-28, `dotfiles-uop05`의 추가): agy 1.5.14는 로그인 토큰을 macOS 열쇠고리에 두므로 `agy-auth list --json`의 `capabilities`는 셋 다 거짓이고 `save`·`switch`·`remove`는 `not_supported`다. Phase 3(`UI-qlxsw`, PR #422)은 이 값으로 계정 추가·전환·삭제 화면과 자동 전환을 끄고 로그인 창을 `agy-auth exec-locked -- …`로 띄워 이미 착지했다. Phase 2의 자격 지문은 그대로 둔다: 토큰 파일이 없어 지문은 사실상 `credential-user-scope` 하나를 따르고 그 파일은 대화형 시작마다 다시 쓰이므로, Phase 4의 agy 대화 열기는 지문을 움직여 모델 목록을 한 번 더 읽게 한다. 토큰 갱신과 같은 허용된 비용이고, 계정 변경 때의 무효화는 Phase 3의 직접 호출이 맡는다.
- Bead 본문·댓글 쓰기는 위임받은 잎이 하지 않고 그 Phase의 총괄이 한다.
- 넘기기 전 검증은 `AGENTS.md`의 네 명령이다: `npm run tsc`, `npm run lint`, `npx prettier --write <바꾼 파일>`, `npx vitest run --reporter=dot`. 각 Phase의 집중 검증은 아래 검증 줄의 테스트 파일이다(`npx vitest run <파일…> --reporter=dot`).
- ADR 파일은 `adr` 스킬로 쓰고 인덱스는 생성기로 다시 만든다.

## Phase 1: 값 수용과 닫힌 기본값

실행: delegated
착지: 단독

스펙 §3.1. 선행: `dotfiles-c5jko`.

- `server/worker/exec-enums.js`: 구현 런타임·quick_fix 구현 런타임의 `agy`, 리뷰·계획 리뷰 모델의 `neon`을 읽을 때 유효한 값으로 받는다(이미 저장된 값을 버리거나 거부하지 않는다). 화면의 선택지와 새로 저장하는 경로는 이 Phase에서 열지 않는다 — dotfiles 선택기가 그 값을 받는 것은 D3(`dotfiles-h85sk`) 뒤이므로 Phase 4에서 연다. 활성 실행기 목록도 이 Phase에서 건드리지 않는다.
- `server/worker/session-ref.js`: 제공자 `agy`, 재개 명령 `agy --conversation '<id>'`. `server/worker/session-ref-transcript.js`: agy 대화 기록(`USER_INPUT`·`PLANNER_RESPONSE` 줄)을 화면용 이벤트로. 세션 기록 요청을 받는 `server/ws/worker-handlers.js`의 제공자 검사도 `agy`를 받는다.
- 닫힌 기본값: `server/worker/runner/index.js`와 `server/worker/policy.js`에서 등록되지 않은 실행기 이름을 Claude로 돌리지 않고 `unknown_runner`로 거부. `server/worker/spec-authoring.js`의 "Codex가 아니면 Claude" 접기도 같은 규칙으로.
- `generated/contracts/` 복제본을 dotfiles D1 착지본에 맞춘다. `app/protocol.md`의 `session_ref` 제공자 표기.

검증: `npx vitest run server/worker/exec-enums.test.js server/worker/session-ref.test.js server/worker/session-ref-transcript.test.js server/worker/runner/index.test.js server/worker/policy.test.js server/worker/spec-authoring.test.js server/ws/worker-handlers.session-ref.test.js --reporter=dot` 통과(새 사례는 base에서 실패 확인)와 넘기기 전 네 명령.

## Phase 2: agy 실행기와 모델 목록

실행: delegated
착지: 단독

스펙 §3.2, §3.3, §4의 채집 단계. 선행: Phase 1, `dotfiles-tede7`.

- 채집 단계를 먼저 한다: 설치된 launcher와 로그인된 계정으로 도구 호출과 하위 에이전트가 낀 stream-json 실행 하나를 돌려 줄 기록을 테스트 고정 입력으로 저장한다(계정 식별 값은 지운다). 잎은 채집 결과를 보고로 돌려주고 총괄이 `채집: <항목> — <결과>` 줄을 `UI-ufgo` 본문에 적는다.
- 새 어댑터 `server/worker/runner/agy.js`: `session.js`의 어댑터 계약(`buildArgv`, `normalize`, `liftUsage`, `detectQuestion`, `verdict`, `extractSessionId`, `extractShellCommand`, 장애 분류)을 구현한다. 명령 조립, `init`의 세션 ID, 마지막 `result`의 `status` 판정, 사용량 대응, 환경(`AGY_SILENT`, `BDUI_PRETOOL_HOOK`), 분기·`fast` 거부.
- 실행 전 가드: `server/worker/guard-hook.js`가 agy 실행에 훅 스크립트 경로를 환경 변수로 넘기고, `server/worker/runner/guard-pre-tool.js`가 실행기 인자 `agy`를 받는다.
- 등록: `server/worker/runner-catalog.js`의 활성 실행기와 내장 정의, `runner/index.js`의 agy 가지, `server/auto-pool-store.js`의 런타임, 한도 정책 대상, 사용량 영수증의 제공자 `agy`(`server/worker/usage-receipts.js`), `server/worker/usage-pricing.js`는 단가 없는 모델의 비용을 지금 규칙대로 둔다.
- 모델 목록 `server/worker/agy-model-list.js`(`codex-model-list.js`의 구조를 본뜸): 시작 때와 매시간 `agy models`, 보관, 기본 보이기 집합, id ↔ (계열, 노력) 변환(변환 함수와 그 테스트는 여기서 만들고, 워크플로우 모델 저장 자리에 거는 것은 Phase 4).
- 계정 묶기: 이 시점에는 계정 이름을 읽을 수단이 없으므로(`agy models`·`/usage` 출력에 계정이 없고 `agy-auth`는 D5) 보관값을 자격 지문에 묶는다 — 자격 파일 둘(`~/.gemini/antigravity-cli/antigravity-oauth-token`, `~/Library/Application Support/antigravity/credential-user-scope`)의 수정 시각과 크기이고 내용은 읽지 않는다. 지문이 바뀌면 모델 목록·사용량 보관값과 진행 중인 조회 결과(이전 지문으로 시작한 늦은 응답 포함)를 버리고, 새 목록이 올 때까지 agy 실행을 띄우지 않는다. 토큰 갱신으로 지문이 바뀌어 한 번 더 읽는 것은 허용한다. Phase 3이 로그인·전환 성공 때 같은 무효화를 직접 부른다.
- 실행 전 잔량 조회(스케줄러와 보류): `agy -p "/usage" --output-format json`을 읽는 모듈 하나(10초 한도, 180초 보관)를 두고 Gemini 묶음의 잔량이 0이면 재설정 시각까지 한도 보류, 읽기 실패는 실행을 막지 않음. `server/worker/provider-health.js`·`provider-holds.js`의 agy 값.
- ADR: 스펙 §7의 `→ ADR, supersede UI-gpac` 후보를 실체화한다.

검증: `npx vitest run server/worker/runner/agy.test.js server/worker/runner/guard-pre-tool.test.js server/worker/runner/index.test.js server/worker/agy-model-list.test.js server/worker/runner-catalog.test.js server/auto-pool-store.test.js server/worker/exec-enums.test.js server/worker/scheduler.test.js server/worker/provider-holds.test.js --reporter=dot` 통과(새 사례는 base에서 실패 확인), 넘기기 전 네 명령. PR 전에 이 Phase의 총괄이 worktree의 실행기로 짧은 작업 하나를 실제 `agy`로 돌려 세션 ID·판정·사용량이 잡히는 것을 확인해 완료 보고의 검증 줄에 적는다.

## Phase 3: 사용량 화면과 로그인·계정

실행: delegated
착지: 단독

스펙 §3.4, §3.5. 선행: Phase 2, `dotfiles-uop05`(D5 `agy-auth`).

- `server/routes/agy-usage.js`와 `server/app.js`의 경로 등록: Phase 2의 잔량 조회 모듈을 쓰고 다른 두 사용량 경로와 같은 틀로 답한다. 다른 자리의 값은 `agy-auth list --json`에서.
- 화면: `app/views/usage-meter.js`의 제공자 표와 `app/views/settings-dialog/account-catalog.js`에 agy 행.
- 잠금: 로그인·재인증·계정 추가의 `agy`는 일반 launcher가 아니라 D5 착지본의 잠금 소유 실행 진입점(`agy-auth`가 배타 잠금을 쥔 채 `agy`를 띄우는 명령)으로 띄운다. 잠금을 잡지 못하면 로그인 창을 열지 않고 `busy`를 보인다.
- `server/routes/account-login.js`: 제공자 `agy`, tmux 창의 `agy` 로그인, OAuth 주소 표시, 코드 중계(지금 Claude 전용인 경로를 agy까지), 머리말 계정 줄로 성공 판정, `agy-auth save`. 코드는 기록에 남기지 않는다.
- `server/routes/account-switch.js`·`account-remove.js`: `agy-auth switch`·`remove`.
- 지원 여부: `agy-auth list --json`의 `capabilities`로 계정 추가·전환·삭제 화면을 숨기고 `switch`가 거짓이면 자동 전환을 끈다.
- 조정: 자격을 바꾸는 동작은 하나씩만, 그 동안 스케줄러가 agy 실행을 띄우지 않음, 돌고 있는 agy 실행·대화 창이 있으면 `busy`. 자동 전환은 실행 사이에서만(`server/worker/scheduler.js`의 전환 판단에 agy 가지, 후보 규칙은 ADR UI-d9c1 그대로). 성공 뒤 모델·사용량 보관값 무효화.
- ADR: 스펙 §7의 `→ ADR, supersede UI-xj50` 후보를 실체화한다.

검증: `npx vitest run server/routes/agy-usage.test.js server/routes/account-login.test.js server/routes/account-switch.test.js server/routes/account-remove.test.js app/views/usage-meter.test.js app/views/settings-dialog/account-catalog.test.js server/worker/scheduler.test.js --reporter=dot` 통과(새 사례는 base에서 실패 확인), 넘기기 전 네 명령. 배포 뒤 확인은 이 PR에 `repo-ops/post-merge.d/`의 일회성 확인 하나로 넣는다: 재시작된 서버의 `GET /api/agy-usage`가 `available: true`와 창 값을 내는지 보고 결과를 배포 기록에 남긴다(단계 분류는 `repo-onboarding` 스킬의 `references/repo-ops-steps.md`로 정한다).

## Phase 4: 저장소별 설정·대화·세션 연결

실행: delegated
착지: 단독

스펙 §3.6. 기능상 선행은 Phase 2, `dotfiles-8171c`(D4 세션 허브), `dotfiles-h85sk`(D3 — 선택기가 `agy`·`neon`을 받게 되는 묶음)다. 다만 이 묶음은 계획의 마지막 묶음이라 등록 때 `UI-ufgo`가 Phase 1~3의 이슈 모두를 기다린다.

- 화면의 선택지와 저장 경로를 연다: 구현 런타임 `agy`, 리뷰어 `neon`(`app/views/settings-dialog/session-model.js` 등 화면 쪽 복사본), 저장소 기본값(`server/ws/session-defaults-handlers.js`)·Bead 고정값·프리셋 적용이 `agy`, `neon`, agy 모델을 받는다. 세션 모델은 id 그대로, 워크플로우 모델(`impl_model`·`quick_fix_impl_model`·`impl_effort`)은 Phase 2의 변환으로 (계열, 노력)을 저장한다.
- `server/worker/scheduler.js`의 세션 레인 진입(`launchSessionLane`)이 agy 실행기를 받는다.
- `server/conversation-settings.js`: `fresh_runtime: agy`, `agy_model`. 화면의 대화 설정과 실행 설정 창.
- `server/worker/tmux-launcher.js`: agy 실행기 찾기, 새 대화와 재개의 실행 인자(`session-hub open … -- <launcher> --model <id> --dangerously-skip-permissions [--conversation <id>]`), 시작 화면 판독 `--runner agy`.
- `server/worker/spec-authoring.js`와 `server/worker/session-lane.js`가 agy 실행기를 받는다(세션 ID는 뒤에 잡는다).
- `app/protocol.md`의 런타임 표기.

검증: `npx vitest run server/worker/tmux-launcher.test.js server/conversation-settings.test.js server/worker/spec-authoring.test.js server/worker/exec-enums.test.js server/worker/scheduler.test.js server/ws/session-defaults-handlers.test.js server/ws/exec-preset-apply.test.js --reporter=dot` 와 이 Phase가 사례를 더한 설정 화면 테스트 파일 통과(새 사례는 base에서 실패 확인), 넘기기 전 네 명령.

## Test scope

RED→GREEN 이음매는 스펙 §4의 묶음별 사례 목록 그대로이고 Phase마다 아래 파일에 둔다.

- Phase 1 — `server/worker/exec-enums.test.js`(저장된 `agy`·`neon` 값을 유효로 읽음, 여전히 모르는 값 `gemini` 거부), `server/worker/session-ref.test.js`(`agy:` 파싱, 재개 명령, 최신 `agy:` 항목이 현재 세션), `server/worker/session-ref-transcript.test.js`(agy 기록 → 화면 이벤트), `server/ws/worker-handlers.session-ref.test.js`(제공자 `agy`의 기록 구독이 거부되지 않음), `server/worker/runner/index.test.js`·`server/worker/policy.test.js`(모르는 실행기는 `unknown_runner`).
- Phase 2 — `server/worker/runner/agy.test.js`(새 파일: 스펙 §4 U2의 실행기 사례 전부), `server/worker/runner/guard-pre-tool.test.js`(실행기 인자 `agy`에서 `gh pr merge` 거부), `server/worker/agy-model-list.test.js`(새 파일: 파싱, 보관, 읽기 실패 때 마지막 목록, 목록 없음이면 실행 거부, 자격 지문이 바뀌면 보관값을 버림, 이전 지문으로 시작한 늦은 응답을 버림, 새 목록이 올 때까지 실행 거부, 기본 보이기 집합, 양방향 변환, 잔량 조회의 10초 한도와 180초 보관), `server/worker/runner-catalog.test.js`·`server/auto-pool-store.test.js`(agy 수용), `server/worker/scheduler.test.js`·`server/worker/provider-holds.test.js`(Gemini 묶음 잔량 0이면 재설정 시각까지 보류하고 그 시각 뒤 풀림, 잔량 읽기 실패는 실행을 막지 않음).
- Phase 3 — `server/routes/agy-usage.test.js`(새 파일: 응답 틀 `available`·`windows`·`accounts[]`, 묶음별 `5h`·`7d` 창, 180초 보관, 실패 때 `available: false`), `server/routes/account-login.test.js`(agy 흐름, 잠금을 못 잡으면 로그인 창이 열리지 않음, 머리말 계정 줄이 없으면 실패하고 저장하지 않음, 코드가 기록에 없음, 성공 뒤 보관값 무효화), `server/routes/account-switch.test.js`·`account-remove.test.js`(실행 중이면 `busy`), `app/views/settings-dialog/account-catalog.test.js`(`capabilities`에 따른 단추 숨김), `app/views/usage-meter.test.js`(agy 행), `server/worker/scheduler.test.js`(자동 전환이 실행 사이에서만, `switch` 미지원이면 자동 전환 끔, 자격 변경 중 실행이 시작되지 않음).
- Phase 4 — `server/worker/tmux-launcher.test.js`(새 대화와 재개의 실행 인자), `server/conversation-settings.test.js`, `server/worker/spec-authoring.test.js`, `server/worker/scheduler.test.js`(세션 레인이 agy 실행기로 열림), `server/ws/session-defaults-handlers.test.js`(저장소 기본 런타임 `agy` 저장), `server/ws/exec-preset-apply.test.js`(프리셋 적용 때 워크플로우 모델이 (계열, 노력)으로 저장), 설정 화면 테스트(선택지에 `agy`·`neon`).

제외: `server/worker/quick-fix-handoff.cross-runtime.test.js`는 변경 전에도 통과하는 호환성 검사다. 값이 정확히 두 런타임과 같기를 기대하던 기존 단언은 고치는 대상이고 RED 사례가 아니다. 실제 `agy`를 부르는 자동 테스트는 만들지 않는다. 운영자 인계 확인(Worker의 agy quick_fix 한 건, 화면 재로그인, 저장소 기본 런타임 agy)은 완료 조건이 아니고 결과를 `UI-ufgo` 댓글로 받는다.
