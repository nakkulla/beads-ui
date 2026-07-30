# UI-lhwp — 워커 base 적용 범위 정합

## Context

`target_base` 가 워크트리 cut 과 admission 만 지배하고 PR 생성·머지는 지배하지 않는다. beads-ui 에는 `gh pr create` 가 없어 PR 은 워커 세션이 만드는데 프리앰블에 base 정보가 없고, 머지는 GitHub 이 보고한 `base_ref` 를 그대로 따른다. base 가 `main` 이 아닌 repo(TRACE-ICI = `ilsun/dev`)에서 브랜치는 `ilsun/dev` 에서 잘렸는데 PR base 는 `main` 이 되어, 머지하면 커밋 전체가 `main` 에 들어간다.

동시에 base 판정 주어가 세 곳에서 어긋나 있다 — `attach.js` 가 repo 선언이 아니라 전역 config 를 읽고, bead `metadata.target_base` 층이 그 위에 얹혀 있으며, `command-guard.js` 가 push 목적지 **이름만** 보고 저장소를 보지 않는다. 마지막 것 때문에 `Cortex-j3v` 워커 세션이 2일 연속 2회 죽었다(2026-07-29 Hippocampus, 2026-07-30 thalamus — 둘 다 정상 발행이었다).

의도한 결과: base 의 출처를 repo 선언 하나로 만들고, 그 값이 워크트리 cut·admission·PR 생성·머지 게이트·가드 판정 **전부**를 지배하게 한다.

승인된 스펙: `docs/superpowers/specs/2026-07-30-worker-base-scope-alignment-design.md` @ `bb01e38049123362a949e7dfe88196f940dc0ebc` (spec 게이트 `codex@bb01e380…`). Phase 0 이 그 스펙을 한 군데 정합시키므로 실행 중 SHA 와 `spec_review` 가 한 번 갱신된다.

## Phase 0: 스펙 §6 확장 규칙 정합

`plan_check` 이 승인된 스펙 안의 모순을 찾았고, 사용자가 넓히는 쪽으로 결정했다(2026-07-30). 실행의 첫 단계로 스펙을 정합시킨다 — 모순을 남긴 채 구현하면 완료 조건 #8 과 §6 조건 3 중 하나는 반드시 위반된다.

모순: §6 조건 3 이 이동 대상 해석을 "리터럴 · `~` · 리터럴 단일 대입 1단계"로 한정하고 "그 밖의 확장은 해석하지 않는다"고 못박는데, 2026-07-29 사고 명령은 `H="$HOME/Library/Mobile Documents/…/Hippocampus"; cd "$H"` 로 **대입의 값이 `$HOME` 을 품어** 탈락한다. 그런데 완료 조건 #8 은 사고 2건을 모두 통과시키라고 요구한다.

1. 스펙 §6 조건 3 에 `$HOME` 을 `~` 와 같은 등급으로 추가한다 — 워커가 소유하는 결정적 값이며 임의 확장이 아니다. "그 밖의 확장은 해석하지 않는다"는 유지한다.
2. 단일 파일 커밋 후 즉시 발행(`ahead == 0`).
3. **영수증 갱신** — 이 델타는 gate 를 닫은 같은 세션에서 나왔고, 국소적·결정적이며 승인된 의도(완료 조건 #8)를 **보존하는 방향의 정합**이므로 controller delta self-review 경로에 해당한다. `spec_review` 를 `self@<새 40-hex SHA>` 로 갱신하고, 같은 `bd update` 에 notes 계보(원 영수증 `codex@bb01e380…`, plan_check 발견, 사용자 결정)와 actor 결합(세션 식별자)을 실어 readback 한다.

**검증**: 스펙 §6 조건 3 과 완료 조건 #8 이 서로를 모순하지 않는지 직접 대조, `bd show UI-lhwp --json` 으로 `spec_review` readback, `ahead == 0`.

## Phase 1: TRACE-ICI 선언 착지 (enclosed)

스펙 §7. 다른 저장소에 PR·Bead·워크트리 없이 직접 착지하는 enclosed 단위이며, **Phase 6 의 config 항목 제거보다 반드시 먼저** 착지해야 한다. 지금 TRACE-ICI 워커 admission 을 뚫어주는 유일한 수단이 그 임시 config 항목이므로 순서가 뒤집히면 `spec_missing_at_base:main` 거부가 되돌아온다.

1. `/Users/isy_macstudio/Documents/GitHub/TRACE-ICI/docs/agents/repo-ops.toml` 신설 — 최상위 `base = "ilsun/dev"` 와 출처 주석만. `[verify]` 테이블은 넣지 않는다(dotfiles `repo_ops_check.py` 가 그것을 요구하지만 그 도구는 verify 드리프트 체커이고 warn-only 라 게이트가 아니다; 계약상 `base` 는 최상위 키이고 `[verify]` 는 별개 층이다).
2. `ilsun/dev` 에서 원자 커밋 후 즉시 발행 — fetch → `--ff-only` → push → `ahead == 0`.
3. 실제 착지 범위 `<base-tip>..<landed-tip>` 를 실측해 스펙 §7 표의 placeholder 를 실값으로 갱신하고 함께 발행한다.

**검증**: TRACE-ICI 에서 ① `python3 -c "import tomllib; d=tomllib.load(open('docs/agents/repo-ops.toml','rb')); assert d['base']=='ilsun/dev'"` ② `git check-ref-format --branch ilsun/dev` ③ 값이 `git remote` 의 어느 이름으로도 시작하지 않음 ④ `git fetch --no-tags <remote> ilsun/dev && git rev-parse --verify refs/remotes/<remote>/ilsun/dev^{commit}` ⑤ `git rev-list --left-right --count <remote>/ilsun/dev...HEAD` 가 `0 0`.

## Phase 2: 공용 base 해석기

스펙 §1·§2. base 의 출처를 하나로 만든다.

1. `server/worker/attach.js` 에 `resolveTargetBase(repo)` 신설 — 계약 `## Target base` 5단계 전부: ① 대상 repo 의 `docs/agents/repo-ops.toml` 최상위 `base` 를 `smol-toml` 로 파싱(`server/config.js:5` 가 이미 쓰는 `import { parse as parseToml } from 'smol-toml'` 재사용) ② `git check-ref-format --branch` ③ repo 의 `git remote` 목록 접두어 거부 ④ upstream remote 결정 ⑤ `git fetch --no-tags <remote> <base>` 후 `refs/remotes/<remote>/<base>^{commit}` 존재. 선언 부재만 `main`, 나머지 실패는 전부 폴백 없는 실패.
2. **해석 결과는 이름이 아니라 레코드다** — `{ base, remote, remote_ref, base_oid }`. 이름만 돌려주면 5단계 검증이 무의미해진다: `worktree.add({ base })` 는 그 문자열을 `git worktree add -B <br> <wt> <base>` 에 그대로 넣어 **로컬** 브랜치에서 자르고, `admission.js` 도 로컬 `<base>^{commit}` 을 본다. 원격이 전진했거나 로컬이 stale 하면 검증을 통과한 채 옛 커밋에서 워크트리가 잘린다. 워크트리 cut 과 admission 이 `base_oid`(fetch 된 remote tip)를 쓰도록 바꾸고, 해석은 attachment 생성 시점이 아니라 **dispatch 시점에 재해석**한다.
3. `attach.js:330-333` 의 `options.target_base ?? configTargetBase(workspace_root) ?? DEFAULT_TARGET_BASE` 체인을 `resolveTargetBase` 로 교체하고 `configTargetBase`(`:91`)·`DEFAULT_TARGET_BASE`(`:63`) 제거.
4. `attach.js:230-234` 의 `md.target_base` 우선 처리 삭제 — 설계 스펙도 사용처도 없는 SoT 중복 층이다.

4·5단계를 사용 시점에 위임할 수 없다는 것이 이 Phase 의 근거다(실측): `worktree.js` 의 `add` 는 `git worktree add -B <branch> <wt> <base>` 만 실행해 **fetch 하지 않고**, `admission.js` 는 `git rev-parse --verify --quiet <base>^{commit}` 로 로컬 ref 만 보며, external PR 머지 게이트는 워크트리를 아예 거치지 않는다.

**검증**: `npx vitest run server/worker/attach.test.js server/worker/admission.test.js`, stale 로컬 `<base>` + 전진한 remote 를 만든 통합 테스트에서 `wt.base_oid` 가 remote tip 과 일치, 그리고 `rg -n 'metadata\.target_base|md\.target_base|configTargetBase|DEFAULT_TARGET_BASE' server/` 0건.

## Phase 3: 소비자 배선 — 프리앰블과 머지 게이트

스펙 §4·§5·§8. Phase 2 의 값을 실제 소비자에 흘린다. Phase 4 와 파일이 겹치지 않는다.

1. **배선이 실제 누락 지점이다(실측).** `scheduler.js:2180` 의 `launchSession(input)` 은 이미 `repo`·`target_base`·`base_oid` 를 구조분해하지만, 바로 아래에서 만드는 `settings` 객체(`:2200-2210`)가 그 셋을 **담지 않는다.** 그래서 `claude.js:305` 의 `applyPreamble(...)` 과 `session.js:386` 의 `findMergeViolation(...)` 에 값이 도달할 수 없다. `settings` 에 `repo`·`target_base` 를 실어 배선을 잇는다 — 함수 시그니처만 넓히면 단위 테스트는 통과해도 실제 세션에는 전달되지 않는다.
2. `server/worker/runner/preamble.js` — `applyPreamble(base_prompt, options)` 에 `target_base` 를 받아 세션이 `gh pr create --base <target_base>` 로 열도록 고지하는 지시문 추가. `GUARD_CONTRACT_DIRECTIVE`(`:61`)에 base push 가드 고지 한 줄 추가(§8). 두 변경 모두 `parts.push` 순서를 유지한다.
3. `server/worker/pr-actions.js` 의 `targetBaseFor(q, bead_id, hint)` — **기대 base 와 실제 base 의 피연산자를 분리**한다. 기대값은 유효한 attempt 의 `attempt.target_base` 또는 `resolveTargetBase(repo)` 둘뿐이고, `hint` 와 관측 `base_ref` 는 기대값 체인에서 **완전히 제거**한다(그 함수 문서가 `hint` 를 `base_ref as the click-time gate observed it` 로 정의하므로 남기면 관측값을 관측값과 비교하게 된다). 하드코딩 `'main'` 종단도 제거 — 해석 실패는 fail-closed.
4. 머지 직전 `baseRefName` 을 기대 base 와 대조하고 불일치면 fail-closed. **external PR 에도 적용한다** — 세션이 `--base` 없이 PR 을 여는 그 경로가 원래 버그가 사는 곳이다. 자동 재타겟은 하지 않는다.

**검증**: `npx vitest run server/worker/merge-gate.test.js server/worker/external-pr.test.js server/worker/pr-actions.test.js` (있는 것만), 프리앰블 문자열 단언 테스트, 그리고 **scheduler→runner 통합 테스트**로 실제 attempt 의 `repo`·`target_base` 가 프리앰블과 가드까지 도달함을 검증.

## Phase 4: 가드 주어 교정

스펙 §6. 가장 위험한 Phase 다 — `command-guard.js` 는 이미 두 번의 수정 스펙을 거친 안전 임계 코드이고, 이번엔 토크나이저 자체를 넓힌다.

1. **토크나이저 확장** — `tokenize()` 의 `ParsedCommand`(`:71-75`)는 현재 `{ commands: SimpleCommand[], nested: string[] }` 로 **연산자도 서브셸 그룹핑도 보존하지 않는다.** 각 simple command 에 선행 연산자와 **고유 scope ID(조상 경로)** 를 싣는다. **깊이(depth)로는 부족하다** — `( cd /foreign ) && ( git push origin <base> )` 는 두 서브셸의 깊이가 같지만 cwd 를 공유하지 않는다. 같은 scope ID 일 때만 allowlist 를 적용한다. 기존 argv 위치 판정 의미론은 보존하고 필드만 추가한다.
2. **allowlist 판정** — 면제는 네 조건을 **모두** 만족할 때뿐: ① 이동이 push 와 같은 scope ID(서브셸 안이거나 sibling 서브셸이면 탈락) ② 이동이 최상위 `&&` 로 push 를 지배(`;`·`||`·조건절이 끼면 탈락, 단 이동 **앞**의 리터럴 대입은 항상 실행되므로 지배를 깨지 않음) ③ 이동 대상이 리터럴·`~`·**`$HOME`**·같은 명령 앞부분의 단일 대입 1단계로 해석됨(Phase 0 이 스펙에 반영) ④ 해석된 경로가 attempt repo 밖. 증명 실패는 전부 fail-closed(오늘과 동일).
3. **주어 주입** — `session.js:386` 의 `findMergeViolation(cmd, { conflict_resolution })` 에 attempt 의 repo 와 해석된 base 를 함께 넘겨, `BASE_REF_RE` 의 `main|master` 이름 매칭을 **선언된 base 와의 일치**로 교체한다. fallback `BASE_LANDING_RE`(`:27`)도 같은 allowlist 를 쓰되 파싱 불가 입력은 조건을 증명할 수 없어 사실상 항상 fail-closed 다 — 불변식은 "argv 와 같은 결론"이 아니라 **"fallback 은 argv 보다 결코 더 관대하지 않다"** 이다.

**검증**: `npx vitest run server/worker/runner/command-guard.test.js` 전건 green, 특히 기존 케이스 무회귀.

## Phase 5: config 코드 은퇴와 인도

스펙 §3 의 **머지 전** 절반. 이 세션의 실행은 여기서 끝난다.

1. `server/config.js` 의 `normalizeWorkerTargetBase`(`:237`) 경로 제거. `~/.config/bdui/config.toml` 의 항목은 **아직 건드리지 않는다** — 구 코드가 도는 동안 지우면 TRACE-ICI 가 `main` 으로 폴백한다.
2. `npm run all` green.
3. **implementation 게이트** — 대상은 beads-ui 통합 diff **와** TRACE-ICI 착지 범위(`<base-tip>..<landed-tip>`) **둘 다**(완료 조건 #15). enclosed 커밋은 beads-ui PR diff 에 없으므로 함께 지목하지 않으면 작업의 일부만 리뷰된다.
4. PR 생성 후 **PR Delivery stop** — URL·CI·게이트 적격성·남은 조치를 보고하고 브랜치·워크트리를 보존한 채 멈춘다. 머지하지 않는다.

**검증**: `npm run all` (= `lint && tsc && test && prettier:check`), `rg -n 'worker_target_base|worker\.target_base' server/` 0건, PR 의 `baseRefName` 이 해석된 base 와 일치.

## Phase 6: post-merge continuation (별도 크로싱)

스펙 §3 의 **머지 후** 절반. 실행 주체가 다르다 — 명시적 `pr-finish` 또는 beads-ui 사람 머지 클릭 **이후**에 시작하며, 이 세션의 작업이 아니다.

1. **머지된 체크아웃에서** 서비스 재시작.
2. 런타임 실측 — `projectmgr status` 가 `running`, 실행 경로가 머지된 체크아웃, bind host/port 와 HTTP 응답, TRACE-ICI 해석 base 가 `ilsun/dev`.
3. 그 **뒤에** `~/.config/bdui/config.toml` 의 `[worker.target_base]` 항목 제거 + readback.
4. 런타임 재확인.

2 를 건너뛰고 3 으로 가면 구 코드가 도는 동안 TRACE-ICI 가 `main` 으로 폴백한다. 재시작이 stale 체크아웃을 가리켜도 같은 결과다.

**검증**: 위 2·4 의 런타임 실측 기록.

## Test scope

RED → GREEN 승인 seam. 이 목록에 없는 것은 통상 구현이다.

| seam | 파일 | RED 케이스 |
| --- | --- | --- |
| base 해석 positive | `server/worker/attach.test.js` | 유효한 TRACE-ICI 선언을 읽어 `ilsun/dev` 를 반환 — 오늘은 전역 config 를 읽으므로 failing-first 다 (완료 조건 #1) |
| base 해석 5단계 실패 | `server/worker/attach.test.js` | 형식 위반(`ilsun..dev`) · remote 접두어(`origin/main`) · TOML 파싱 실패 · remote 결정 실패 · **존재하지 않는 원격 브랜치(`ilsun/dv`)** · **stale 로컬 ref**. 마지막 둘이 4~5단계를 해석기로 끌어온 이유다 |
| 배선 도달 | scheduler/runner 통합 | 실제 attempt 의 `repo`·`target_base` 가 프리앰블과 가드까지 도달 — 오늘 `settings` 가 셋을 담지 않으므로 failing-first 다 |
| 머지 게이트 피연산자 분리 | `server/worker/merge-gate.test.js` | worker attempt PR · external PR · `target_base` 없는 legacy attempt — 세 경우 모두 기대값이 관측값과 같아지는 경로가 없음 |
| 가드 allowlist — 통과 | `server/worker/runner/command-guard.test.js` | 실측 사고 2건을 **축약 없이 fixture 로 고정**: `cd ~/GitHub/thalamus && git push origin main` (2026-07-30), `H="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Hippocampus"; cd "$H" && git push origin main` (2026-07-29, Phase 0 의 `$HOME` 확장에 의존) |
| 가드 allowlist — violation | `server/worker/runner/command-guard.test.js` | 워크트리 cwd 의 `git push origin <base>`, `( cd /foreign ) && git push origin <base>`, **`( cd /foreign ) && ( git push origin <base> )`(sibling subshell — 깊이는 같지만 cwd 미공유)**, `false && cd /foreign; git push origin <base>`, `f(){ cd /foreign; }; git push origin <base>` |
| fallback 보수성 | `server/worker/runner/command-guard.test.js` | 위 케이스를 파싱 불가 형태(따옴표 불균형)로도 넣어 fallback 이 argv 보다 관대하지 않음을 고정 |
| 프리앰블 | `server/worker/runner/preamble.test.js` | `--base <target_base>` 고지와 base push 가드 고지가 출력에 포함 |

## 잔여

- **`UI-8mvc` 소유**: 세션이 자기 repo 루트로 명시적 `cd` 한 뒤의 base push. Phase 4 의 allowlist 는 이를 fail-closed 로 두지만, 근본 차단은 pre-push hook 이다. 후속 Bead 를 새로 만들지 않는다 — 그 Bead 노트에 기록됨.
- **dotfiles 관측**: `scripts/repo_ops_check.py` 가 `base`-only 선언을 스키마 위반으로 보는 것이 계약(`base` 최상위, `[verify]` 별개 층)과 어긋난다. 이 Bead 범위 밖.
- **병렬 금지**: `UI-8mvc` 는 `command-guard.js`·`preamble.js` 를 공유하므로 이 Bead 완료 후에 착수한다.
