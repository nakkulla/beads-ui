---
scope:
  - server/worker/runner/command-guard.js
  - server/worker/runner/command-guard.test.js
  - server/worker/runner/guard-mirror.js
  - server/worker/runner/guard-mirror.test.js
  - server/worker/runner/claude.js
  - server/worker/runner/claude.test.js
  - server/worker/runner/codex.js
  - server/worker/runner/codex.test.js
  - server/worker/runner/session.js
  - server/worker/runner/session.merge-guard.test.js
  - server/worker/session-monitor.js
  - server/worker/session-monitor.test.js
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/worker/attach.js
  - server/worker/attach.test.js
  - server/worker/queue-store.js
  - server/worker/queue-store.test.js
  - server/worker/runner/preamble.js
  - server/worker/runner/preamble.test.js
  - server/worker/runner/__snapshots__/preamble.test.js.snap
---

# 가드 hook_bypass — 예방층이 검증된 Claude 세션에서 1회성 재배치는 실행 증거로 판정한다

- 날짜: 2026-09-08
- Bead: `UI-ushh` · route `spec_backed`
- 출처: dotfiles `dotfiles-muao` attempt `dotfiles-muao-1788857704669-1` kill 분석. 프롬프트 계층 짝은
  dotfiles `dotfiles-5z28`(착지 완료, 758e3c0c).
- 선행 스펙: `2026-08-04-worker-guard-kill-scope-reduction-design.md`(UI-1xcd),
  `2026-08-26-guard-one-shot-hooks-relocation-design.md`(UI-iw28),
  `2026-09-05-guard-config-env-relocation-design.md`. 이 스펙은 셋을 supersede하지 않는 addendum이다
  (§7).
- 개정: r1 리뷰(astra, anchor 25a102cc) 지적 6건 반영 — §1 우선순위, §2 env 조립 위치, §2·§3 영구
  저장 경로(`scheduler.js`), §3·§4 보류의 durable 인계와 재부착, Test scope의 RED/회귀 분리, ADR 후보
  판정.
- 개정 r3: stale 재리뷰 정정(anchor bd788f19 → base 61954784, UI-mn5u·UI-5cf0 착지 반영) — Codex runner의
  `--disable hooks` 제거 사실, `session.js` env 조립이 `inheritedEnv()`를 쓰는 사실, 줄 번호 갱신. 결정
  불변.

## 왜

### 관측된 사고

2026-09-08 09:06:33Z, dotfiles `dotfiles-muao` attempt 1(runner claude). h1h3 유닛 서브에이전트가
`render-output-stale` 실패를 조사하며 실행한 한 줄:

```
git stash list >/dev/null; git -c core.hooksPath=/dev/null diff --stat generated/ | head; grep -n … | head
```

`hook_bypass_blocked` kill(exit 143, `loud_fail_blocker` → systemic tier → 큐 hold). `tool_use` 출현
09:06:33.669Z, `finished_at` 09:06:37Z, `tool_result` 줄 없음. 같이 돌던 review 유닛 서브에이전트도
죽었고 두 유닛의 미커밋 작업이 워크트리에 남았다. 명령은 읽기 전용이었고(`git diff`는 hook을 돌리지
않는다), 저장소 `.git/hooks`는 비어 있었으며, 직전까지 hook 간섭도 없었다 — UI-iw28이 적은
`git status` 사고와 같은 종류다.

### 전제가 바뀌었다 — 이제 "거부만 하고 세션은 살리는 층"이 있다

UI-iw28 §"효과는 이진이다"는 `warn`(실행됨·기록만)과 `kill`(SIGTERM) 둘뿐이라 "명령만 거부하고
세션은 살린다"는 효과가 없다고 적었고, 그래서 `diff`·`log`·`show`를 열거 밖 kill로 두었다. 그 뒤
dotfiles PR #483(2026-09-04)이 `src/claude/hooks/destructive-guard-hook.sh`에 같은 네 형태의
PreToolUse(Bash) 사전 차단을 넣었다. 목적은 정확히 "Worker kill을 PreToolUse 거부로 전환"이다.

그런데 Worker 세션에서는 그 전환이 일어나지 않는다. `session-monitor.js` `handleLine`(L495-603)과
`runner/session.js` `onLine`(L529-643)은 둘 다 스트림의 **`tool_use` 출현 줄**에서
`extractShellCommand → findMergeViolation → guardKill`을 실행한다. PreToolUse 훅이 거부해도 그
거부는 뒤따르는 `tool_result`에만 남고, Worker는 그 줄을 보기 전에 이미 죽였다. #483은 대화형
세션에서만 성립한다 — 이 스펙을 쓰던 대화형 세션에서 위 코드 블록을 heredoc으로 파일에 쓰려던
Bash 호출이 같은 훅에 거부되었고, 세션은 계속되어 다른 도구로 파일을 썼다. 그것이 #483이 의도한
효과이고, Worker 세션에 없는 효과다.

### 사실 — 스트림에 남는 거부의 모양

Claude runner는 `--permission-mode bypassPermissions`로 기동하지만 사용자 `~/.claude/settings.json`의
훅을 상속한다(`claude.js:636`, 헤더 주석 "permission_denials … hook/policy denials the session
observes as tool errors"). PreToolUse 훅이 `exit 2`로 거부하면 명령은 실행되지 않고 스트림에는
다음 `user` 줄이 남는다(이 세션 transcript에서 실측):

```json
{"type":"user","message":{"role":"user","content":[{"type":"tool_result",
  "tool_use_id":"toolu_01Jj4n…","is_error":true,
  "content":"PreToolUse:Bash hook error: [${HOME}/.claude/hooks/bd-create-guard-hook.py]: …"}]}}
```

`tool_use_id`는 assistant 줄의 `tool_use.id`와 짝이다. 서브에이전트의 명령도 같은 스트림에
`parent_tool_use_id`를 달고 흐르며 그 `tool_result`도 같은 파일에 남는다(muao 로그 L948·953).
`session-log.js`는 이미 이 짝(`pending_commands`, L433-530)으로 bd write 완료를 관측한다.

Codex runner는 UI-mn5u(codex-orchestration-parity §3.1) 이후 사용자 codex 훅을 켠 채 기동한다
(`codex.js:445-456`, `--disable hooks` 제거). 그 훅은 dotfiles가 소유하는 Codex 정책 경로이고, §2가
검증하는 Claude PreToolUse(Bash) 거부 미러가 아니다 — 이 스펙은 Codex 세션에 "거부 층"이 있다고 보지
않는다. `item.completed`도 어댑터가 의도적으로 버린다(`codex.js:193`).

### 사실 — 판정과 저장의 실제 위치

- `isHookBypass`(`command-guard.js:1790-1887`)는 arm 3(1회성)을 arm 1(`push --no-verify`)·arm 2
  (`config` 쓰기)보다 **먼저** 검사해 `true`를 돌려주고, `scanCommand`(L2196-2225)는 명령열의 **첫
  위반**에서 검색을 끝낸다.
- 자식의 최종 환경은 `session.js:371-379`에서 `{ ...inheritedEnv(), ...settings.env, ...adapter.env }`로
  조립된다(`inheritedEnv()`는 UI-mn5u §3.1이 `WORKFLOW_*` 키를 벗긴 부모 env다). 어댑터 `buildArgv`가
  돌려주는 `env`는 그 일부다.
- attempt 레코드의 spawn 시점 기록은 `scheduler.js:8334-8367`가 쓴다(`system_prompt`/`task_prompt`를
  runner의 spawn 결과에서 복사해 `store.updateAttempt`). live runner(`session.js`)는 store를 갖지 않고
  이벤트·verdict(`blocked_detail`)로 돌려준다; monitor(`session-monitor.js`)는 store를 직접 쓴다.
- Worker 재시작 뒤 `attach.js:2027` 부근은 usage replay를 끝낸 **로그 끝 boundary**에서 monitor를
  시작한다. monitor `stop()`은 서버 종료에도 호출되므로 세션 종단과 같지 않다.

### 왜 프롬프트 계층만으로 끝내지 않는가

UI-iw28 잔여 위험 4는 재관측 시 프롬프트 계층으로 다루라고 했고, dotfiles-5z28이 leaf-only 위임
접미에 금지 형태와 대안을 실었다. 그러나 접미는 컨트롤러가 붙여야 리프에 닿는다 — muao 컨트롤러는
ad-hoc 프롬프트를 썼고 접미가 없었다. 프롬프트 계층은 자문이고, 누락 한 번이 읽기 전용 한 줄로
세션 전체와 병렬 유닛을 잃는 비대칭을 그대로 남긴다. 예방층(#483)이 이미 있는데 Worker가 그것을
믿지 않는 것이 남은 결함이다.

## 무엇을

### §1 판정 대상 — 1회성 재배치 팔만 "보류 가능"이고, 즉시 종료가 항상 이긴다

`isHookBypass`의 네 팔 중 **arm 3(1회성 재배치)** 만 보류 대상이다. UI-iw28의 분류를 그대로 쓴다:

| 팔 | 형태 | 이 스펙 뒤 |
| --- | --- | --- |
| 1 | `git push --no-verify` | 현행 즉시 kill. 같은 명령 안에서 원격 base를 옮기는 비가역 shape라 실행 뒤 kill은 늦다 (ADR 0007 "정확한 원격 변경 명령의 kill 유지") |
| 2 | `git config … core.hooksPath` 쓰기 | 현행 즉시 kill (지속 재배치) |
| 3 | `git -c core.hooksPath=…`, `git --config-env=core.hooksPath=…`, `GIT_CONFIG_COUNT`/`KEY_n`/`VALUE_n`/`PARAMETERS` 접두 — 열거 면제(`exemptOneShot`)에 들지 않는 것 전부, git 아닌 명령 앞의 접두 포함 | **보류 가능**: §3 |
| 4 | `export`/`declare`/`typeset`된 `GIT_CONFIG_*`, 명령 없는 bare 할당 | 현행 즉시 kill (지속 재배치) |

`MergeViolation`에 필드를 하나 더한다: `deferrable: true`는 **그 호출(`findMergeViolation`에 들어온
문자열 전체)에 즉시 종료 위반이 하나도 없고** 발견된 위반이 모두 arm 3일 때만 붙는다. 다른 팔·다른
`kind`·폴백 경로(`fallbackViolation`, 토큰화 실패 — UI-1xcd §4 "폴백은 파싱 경로보다 엄격하다")에는
없다(`undefined`). `kind`/`reason`은 그대로 `hook_bypass`/`hook_bypass_blocked`다 — consumer의 실패
분류(`failure-class.js` `SYSTEMIC_BLOCKER_REASONS`)는 바뀌지 않는다.

**우선순위 규칙(r1 지적 1).** 현행 코드는 arm 3에서 먼저 반환하고 첫 위반에서 검색을 끝내므로, 그대로
두면 `git -c core.hooksPath=X push --no-verify`(한 명령에 arm 3 + arm 1)와 `git -c core.hooksPath=X
diff; git config core.hooksPath Y`(arm 3 뒤에 arm 2)가 보류된다. 바꾼다:

- `isHookBypass`는 한 단순 명령 안에서 arm 1·2·4를 **먼저** 판정하고, 그중 하나라도 성립하면
  `{ bypass: true, one_shot: false }`를, 그렇지 않고 arm 3만 성립하면 `{ bypass: true, one_shot: true }`를
  돌려준다(boolean 호출처는 `.bypass`를 읽는다).
- `scanCommand`는 첫 위반에서 멈추지 않고 명령열(`parsed.commands`)과 중첩(`parsed.nested`)을 **끝까지**
  훑어, 즉시 종료 위반(one_shot이 아닌 hook_bypass, `gh_pr_merge`)이 하나라도 있으면 그것을 돌려주고,
  전부 arm 3일 때만 첫 arm 3 위반에 `deferrable: true`를 붙여 돌려준다. `warn` 종류(`git_push_base`,
  `base_merge`)는 현행처럼 즉시 종료보다 뒤에, arm 3보다 앞에 온다 — `warn`은 실행되며 기록만 남고
  `kill`을 막지 않으므로, arm 3과 `warn`이 함께 있으면 `warn`을 기록하고 arm 3은 보류한다(둘 다
  소비자에게 전달: §3).
- 열거(`ONE_SHOT_SAFE_SUBCOMMANDS`)와 §1.1 순수성 조건은 손대지 않는다. 열거 안은 여전히 위반이 아니고
  (UI-iw28 §2), 열거 밖은 위반이되 **실행됐을 때** kill이다.

### §2 예방층 검증 — `guard_mirror`

보류는 "이 세션에는 PreToolUse 미러가 실제로 걸려 있다"가 증명된 attempt에서만 한다. 검증은
spawn 직전에 한 번, **자식이 실제로 받는 최종 환경 객체**로 한다.

- 새 모듈 `server/worker/runner/guard-mirror.js`, 순수 함수
  `probeGuardMirror({ env, cwd, fs })` → `'verified' | 'absent'`.
- **조립 위치(r1 지적 2).** 어댑터가 아니라 `session.js`가 부른다: `runSession`은 `session.js:371-379`의
  spawn 직전에 `final_env = { ...inheritedEnv(), ...(settings?.env || {}), ...(env || {}) }`를 한 번 만들고,
  그 **같은 객체**를 `spawn`에 넘기고 `spec.probeGuardMirror ? spec.probeGuardMirror({ env: final_env,
  cwd, fs }) : 'absent'`에 넘긴다. 어댑터 spec은 선택 메서드 `probeGuardMirror`를 노출한다 — claude spec은
  `guard-mirror.js`의 함수를 그대로, codex spec은 노출하지 않는다(→ `'absent'`; Codex 훅은 §5).
  두 갈래가 다른 환경을 볼 수 없게 하는 것이 이 배치의 목적이다.
- 설정 파일: `env.CLAUDE_CONFIG_DIR`가 있으면 `<그 값>/settings.json`, 없으면
  `<env.HOME>/.claude/settings.json`. `env.HOME`이 없으면 `absent`.
- `verified` 조건 전부:
  1. 파일이 읽히고 JSON 객체다.
  2. `hooks.PreToolUse[]` 중 `matcher`가 `Bash`를 덮는 항목이 있다 — 문자열을 `|`로 나눈 토큰 중
     하나가 정확히 `Bash`이거나 `*`. 정규식 평가는 하지 않는다(문자열 토큰 매칭만; `Bash`를
     `Ba.*` 같은 패턴으로 등록한 설정은 `absent`로 읽힌다 — fail-closed).
  3. 그 항목의 `hooks[]` 중 `type === 'command'`이고 `command`의 basename(선행 `${HOME}`/`~`를
     `env.HOME`으로 치환한 뒤)이 정확히 `destructive-guard-hook.sh`인 것이 있다.
  4. 그 경로가 존재하고 실행 가능하다(`fs.accessSync(path, X_OK)`).
  5. 같은 사용자 settings에, 그리고 attempt cwd의 `.claude/settings.json`·`.claude/settings.local.json`에
     `disableAllHooks: true`가 없다(파일 부재는 통과, 파싱 실패는 `absent`).
- 어떤 예외든 `absent`. 로그 한 줄(`guard mirror probe failed: …`)만 남긴다.
- **영구 저장(r1 지적 3).** `runSession`의 spawn 결과(지금 `system_prompt`/`task_prompt`가 실리는 그
  자리, `session.js:729-732`)에 `guard_mirror`를 싣고, `scheduler.js:8334-8367`의 spawn 기록 patch가
  두 프롬프트 필드와 같은 방식으로 `guard_mirror`를 attempt 레코드에 복사한다. `queue-store.js`
  Attempt에 `guard_mirror: 'verified'|'absent'|null` 필드와 bound 함수를 더한다(미기록 attempt는
  `null` = 미검증). live runner는 자기 spawn 직전 값(`final_env` probe 결과)을, restart monitor는
  attempt 레코드의 durable 값을 읽는다 — 같은 값이다. monitor의 `entry`는 `specForAttempt`와 함께
  `attempt.guard_mirror`를 싣는다.
- 결합은 파일명 하나(`destructive-guard-hook.sh`)뿐이다. dotfiles가 훅 파일명을 바꾸면 이 판정은
  `absent`로 떨어져 현행 즉시 kill로 돌아간다 — 미탐이 아니라 과잉 차단 방향이다.

### §3 보류와 확정

`guard_mirror === 'verified'`인 attempt에서 `deferrable` 위반이 나오면 kill 대신 **보류**한다.
`guard_mirror`가 `absent`/`null`이거나 위반이 `deferrable`이 아니면 현행 그대로 즉시 kill이다.

- `extractShellCommand`(claude)가 명령과 함께 `tool_use.id`를 돌려주도록 반환을
  `{ command, id }`로 넓힌다(codex는 `item.id`; 지금은 소비처가 없지만 같은 모양). 기존 호출처는
  `.command`를 읽는다.
- **보류는 durable하다(r1 지적 4).** attempt 레코드에 `guard_pending: { tool_use_id, command, at,
  log_offset }[]|null`을 더한다(`queue-store.js` 필드·bound 함수). `log_offset`은 그 `tool_use` 줄이
  끝나는 로그 바이트 오프셋이다.
  - monitor 경로: `handleLine`이 보류를 만들거나 지울 때 `store.updateAttempt`로 `guard_pending`을 갱신
    한다(`guard_warnings`와 같은 방식).
  - live runner 경로: `session.js`는 store가 없으므로 `{ kind: 'guard_pending', op: 'add'|'clear',
    entry }` 이벤트를 emit하고, `scheduler.js`의 세션 이벤트 소비처가 `guard_pending`을 갱신한다.
    실행 확정 kill은 `blocked_detail`에 `confirmed_by: 'tool_result'`를 싣고, `scheduler.js`가
    `cause_detail`/`guard_kill`에 그 값을 그대로 복사한다 — live runner의 `guard_kill.confirmed_by`
    저장 경로는 이 복사다.
  - 메모리 Map은 durable 레코드의 캐시일 뿐이며, 스트림을 넘어 짝을 맞추지 않는다(`session-log.js`와
    같은 이유).
- 확정은 같은 스트림의 `user` 줄 `tool_result` 블록 중 `tool_use_id`가 일치하는 것에서 한다:
  - **거부**: `is_error === true` 이고 `content`(문자열이면 그대로, 배열이면 `text` 블록 연결)가
    `PreToolUse:Bash hook error:`로 시작한다 → 명령은 실행되지 않았다. 보류를 지우고(`guard_pending`
    갱신 포함) **위반을 기록하지 않는다** — UI-iw28 §2와 같은 처분이다. 어떤 훅이 거부했든 무관하다
    (dotfiles 훅의 `BLOCKED:` 문구에 결합하지 않는다).
  - **실행**: 그 밖의 모든 `tool_result`(성공, 명령 자체의 비영 exit, 훅 아닌 오류) → 명령은
    실행됐다. 보류를 지우고 현행 `guardKill`/`kill('SIGTERM')`을 같은 `reason`/`command`로 실행한다.
    `cause_detail`은 현행과 같고, `guard_kill`에 `confirmed_by: 'tool_result'`를 더한다.
  - `tool_use_id`가 일치하지 않는 `tool_result`는 보류를 건드리지 않는다.
- **재부착(r1 지적 4).** Worker 재시작 뒤 `attach.js`가 monitor를 시작할 때 attempt의
  `guard_pending`이 비어 있지 않으면, monitor는 boundary에서 tail을 시작하기 **전에** 각 보류의
  `log_offset`부터 boundary까지 기존 로그를 한 번 읽어 짝이 되는 `tool_result`를 찾는다(one-time
  backfill). 찾으면 위 거부/실행 규칙으로 즉시 확정하고(실행이면 kill — 프로세스가 살아 있을 때만
  신호, 죽었으면 §4), 못 찾으면 보류를 유지한 채 boundary부터 tail을 계속한다. usage replay와
  backfill은 같은 boundary를 공유하므로 겹치지 않는다.
- 보류 중 다른 위반은 독립적으로 현행대로 판정한다. 보류가 다른 판정을 막지 않는다.
- 보류는 판정 **시점**만 옮긴다. `guardEffect` 표, `SYSTEMIC_BLOCKER_REASONS`, 배너 문장
  (`disabling the git hooks is never permitted: …`), 큐 hold 동작은 실행 확인 뒤 kill에 그대로
  적용된다.

### §4 세션이 끝나도 짝이 오지 않은 보류 — 종단과 monitor 종료를 가른다

**세션 종단**은 스트림의 종단 `result` 줄을 읽었거나 프로세스가 사라졌음(`pidStillOurs`가
거짓)이 확인된 때다. monitor `stop()`은 서버 종료에도 호출되므로 종단이 아니다(r1 지적 4).

- 종단 시 보류가 남아 있으면 죽일 대상이 없다. kill하지 않고 `guard_warnings`에
  `{ reason: 'hook_bypass_unresolved', command, at }`를 남기고 `guard_pending`을 비운다 — 진단 증거이지
  실패 분류가 아니다(`failure-class.js`는 이 reason을 모르고, 알 필요도 없다: warnings는 tier를 바꾸지
  않는다). live runner는 verdict 산출 직전에(`result` 줄을 읽은 뒤) 이벤트로, monitor는 종단을
  확인한 drain 뒤에 store로 정리한다.
- monitor `stop()`이 종단 없이 호출되면(서버 종료) 보류는 `guard_pending`에 그대로 남고, §3 재부착이
  이어받는다.

### §5 Codex와 미검증 세션은 그대로다

Codex 세션(`guard_mirror: 'absent'`)과 검증에 실패한 Claude 세션은 §1의 `deferrable` 필드가
붙어 있어도 §3에 들어가지 않는다 — 현행 `tool_use`/`item.started` 즉시 kill. 이 스펙은 Codex에
미러를 만들지 않는다. UI-mn5u 이후 켜진 codex 훅은 dotfiles Codex 정책 경로이며 UI-58w8·UI-mn5u가
소유한다 — §2의 미러 검증 대상이 아니고, 그 훅이 Bash 명령을 거부하는지는 이 스펙이 판단하지 않는다.

### §6 프리앰블을 바뀐 계약에 맞춘다

`preamble.js` `guardContractDirective`의 두 블록을 고친다. 금지는 그대로다 — 바뀌는 것은
결과 서술뿐이다.

- 즉시 종료 항목의 **1회성 재배치** 줄 끝에 한 문장: "Claude 세션에서는 PreToolUse 훅이 이 형태를
  먼저 거부하고 세션은 계속된다; 훅을 지나 실제로 실행되면 그때 종료다. 훅이 없는 세션(Codex,
  훅 미등록 호스트)은 명령이 보이는 즉시 종료다."
- 허용됨 절의 열거 면제 줄은 그대로 둔다("붙일 이유도 없다" 포함).
- 스냅샷(`__snapshots__/preamble.test.js.snap`) 갱신.

### §7 선행 스펙과의 관계

- UI-iw28 §2(열거 면제는 기록 없음)·§1(면제 조건 넷)·잔여 위험 2(열거는 사람이 관리)는 그대로
  유효하다. 열거는 Codex·미검증 세션의 유일한 완화이고, Claude 검증 세션에서는 "열거 밖 = 실행 시
  kill"로 의미가 좁아진다. 잔여 위험 4("재관측 시 프롬프트 계층")는 dotfiles-5z28로 이행됐고, 이
  스펙은 그 위에 Worker 측 정합을 더한다 — supersede가 아니라 addendum이다.
- UI-1xcd §4(폴백은 파싱 경로보다 엄격)는 §1 폴백 무보류로 유지된다.
- ADR 0007 Decision 1(pre-push 훅 예방층)과 "정확히 식별되는 가드 무력화 명령의 kill 유지"는
  유지된다: kill은 여전히 일어나되 **실행 증거** 위에서 일어나고, 거부된 명령은 애초에 실행되지
  않은 것이라 kill할 사건이 없다. Consequences "추론만으로 세션을 죽이는 권한 배제"와도 같은
  방향이다.

## Test scope

RED→GREEN 시임(현행 코드에서 실제로 실패하는 조건)과 회귀 유지 검증(현행에서도 성립하며 변경 뒤에도
성립해야 하는 조건)을 가른다(r1 지적 5). 회귀 유지 검증은 RED 증거가 아니다.

| 파일 | RED→GREEN 시임 | 회귀 유지 검증 |
| --- | --- | --- |
| `server/worker/runner/command-guard.test.js` | arm 3 위반(`git -c core.hooksPath=/dev/null diff`, `--config-env=`, `GIT_CONFIG_COUNT=… go test`) 단독 호출은 `deferrable: true`; 한 명령의 복합 형태 `git -c core.hooksPath=X push --no-verify`는 `deferrable` 없음(arm 1 우선); 연속 명령 `git -c core.hooksPath=X diff; git config core.hooksPath Y`는 arm 2 위반을 돌려주고 `deferrable` 없음; `git -c core.hooksPath=X diff && gh pr merge …`는 `gh_pr_merge`; arm 3 + `git push origin HEAD:main`(warn)은 arm 3에 `deferrable`이 붙고 warn도 보고된다 | arm 1·2·4 단독과 `gh_pr_merge`/`git_push_base`/`base_merge`에 `deferrable` 없음; 폴백 경로 hook_bypass에 `deferrable` 없음; 열거 면제는 `null` |
| `server/worker/runner/guard-mirror.test.js` (신설) | tmp HOME + settings 픽스처: 등록+실행비트 → `verified`; 파일 없음/JSON 아님/`matcher`에 `Bash` 없음/basename 다름/실행비트 없음/`disableAllHooks: true`(사용자·프로젝트·local 각각) → `absent`; `Edit\|Write\|Bash` matcher → `verified`; `CLAUDE_CONFIG_DIR` 우선; `${HOME}`·`~` 치환; `HOME` 없음 → `absent` | — |
| `server/worker/runner/claude.test.js`·`codex.test.js` | claude spec이 `probeGuardMirror`를 노출하고 codex spec은 노출하지 않는다; `extractShellCommand`가 `{ command, id }` | 기존 `buildArgv` argv·프롬프트 조립 불변 |
| `server/worker/runner/session.merge-guard.test.js` | (a) verified + arm 3 `tool_use` 뒤 `is_error` PreToolUse `tool_result` → `kill_impl` 미호출, `verdict.blocked === false`, `guard_pending` add/clear 이벤트 2건, `guard_warnings` 없음; (b) verified + 같은 `tool_use` 뒤 정상 `tool_result` → `kill_impl(-pid,'SIGTERM')`, `blocked_detail.reason === 'hook_bypass_blocked'`, `blocked_detail.confirmed_by === 'tool_result'`; (e) verified + 보류 뒤 `result`로 종단 → kill 없음, `hook_bypass_unresolved` warning 이벤트; (g) probe가 `final_env`(부모 env + `settings.env` + 어댑터 env, 어댑터 env 우선)를 받는다 — `settings.env.HOME`/어댑터 `CLAUDE_CONFIG_DIR`가 probe 입력에 그대로 보인다; (f) 다른 `tool_use_id`의 `tool_result` 뒤에도 보류가 남아 있다 | (c) `absent` + arm 3 → 즉시 kill; (d) verified + arm 1 → 즉시 kill |
| `server/worker/session-monitor.test.js` | (a)(b)(e)를 tail 경로로(attempt `guard_mirror`/`guard_pending` 픽스처, `sessionWrites` 두 줄, `guard_kill.confirmed_by`); (h) 보류 add/clear가 `store` attempt `guard_pending`에 반영; (i) `stop()`(종단 없음) 뒤 `guard_pending` 유지·warning 없음; (j) 재부착: `guard_pending` 1건 + `log_offset`, boundary 전 로그에 짝 `tool_result`(거부) → 보류 해소·kill 없음 / (실행) → kill; 짝 없음 → 보류 유지 후 tail에서 확정 | (c) `absent`·`null` → 즉시 kill |
| `server/worker/scheduler.test.js` | spawn 기록 patch가 `guard_mirror`를 복사; `guard_pending` 이벤트가 attempt에 반영; `blocked_detail.confirmed_by`가 `cause_detail`/`guard_kill`로 복사 | 프롬프트 두 필드 복사 불변 |
| `server/worker/attach.test.js` | 재부착 시 `guard_pending`이 monitor `start` 옵션으로 전달되고 backfill 범위가 `log_offset..boundary` | 기존 boundary 인계 불변 |
| `server/worker/queue-store.test.js` | Attempt `guard_mirror`·`guard_pending` 필드 bound/기본값 `null` | `guard_kill` 객체(추가 필드 포함) 그대로 보존 |
| `server/worker/runner/preamble.test.js` + snap | §6 문장 존재, 스냅샷 갱신 | 나머지 지시문 불변 |

## 검증

- `npm run tsc` exit 0; `npm run lint` exit 0.
- `npx vitest run server/worker/runner/command-guard.test.js server/worker/runner/guard-mirror.test.js server/worker/runner/claude.test.js server/worker/runner/codex.test.js server/worker/runner/session.merge-guard.test.js server/worker/session-monitor.test.js server/worker/scheduler.test.js server/worker/attach.test.js server/worker/queue-store.test.js server/worker/runner/preamble.test.js --reporter=dot` (timeout 120초).
- `npx vitest run --reporter=dot` 전체(timeout 120초, AGENTS.md 교착 주의).
- 실측 1건(구현 세션이 수행, 기계 판정): 이 저장소 `.worktrees/<id>`에서 `probeGuardMirror`를 실제
  `process.env`(HOME 포함)에 대해 호출해 `verified`가 나오는지(dotfiles가 설치된 이 호스트) 확인하고
  결과를 완료 보고서에 적는다.

## 배포 처분

`repo-ops/config.toml`이 `[deploy]`를 선언하므로 머지 후 배포는 자동 경로가 소유한다. Worker
서버 코드라 재시작 없이는 반영되지 않는다. 배포 operation이 terminal success에 도달하고
프로세스 경로·포트·HTTP 응답 검증까지 통과한 뒤 완료를 선언한다. `worker-ineligible`은 붙이지
않는다 — interactive-only 검증이 없다.

## 잔여 위험

1. **예방층이 조용히 fail-open하면 실행 뒤 kill이다.** 훅 스크립트는 python 부재·stdin 파싱 불가에
   `exit 0`으로 통과한다(#483 설계). 그 경우 arm 3 명령은 실행된 뒤 kill되고, `git -c
   core.hooksPath=X submodule foreach 'git push …'` 같은 같은-명령 push shape는 실행을 막지 못한다.
   §2가 검증하는 것은 등록·실행비트이지 훅의 런타임 성공이 아니다. 이 구멍은 arm 1을 즉시 kill로
   남긴 이유와 같은 성질이며, 훅의 인프라 폴백을 좁히는 것은 dotfiles 소유다.
2. **파일명 결합.** `destructive-guard-hook.sh` 이름이 dotfiles에서 바뀌면 판정은 `absent`로
   떨어져 현행으로 돌아간다(과잉 차단 방향). dotfiles 쪽 이름 변경 시 이 상수를 함께 바꾸는 것은
   두 저장소 사이의 사람 계약이다.
3. **`disableAllHooks` 외의 비활성 경로는 보지 않는다.** managed settings, `--settings` 플래그,
   훅 신뢰 거부 등으로 훅이 안 도는 경우 §2는 `verified`를 낼 수 있다. Worker는 그 플래그를 쓰지
   않고 managed settings는 이 호스트에 없다. 나타나면 §2의 조건을 늘린다.
4. **거부 판정이 Claude Code의 오류 문구에 의존한다.** `PreToolUse:Bash hook error:` 접두는 CLI
   버전 계약이 아니다. 문구가 바뀌면 거부가 "실행"으로 읽혀 kill이 난다 — 미탐이 아니라 현행
   동작으로의 회귀다. 실측 픽스처(§"사실")를 테스트에 고정해 두고, 회귀가 관측되면 접두 목록을
   넓힌다.
5. **보류 중 세션이 다음 명령을 낸다.** 보류는 세션을 멈추지 않으므로 거부→재시도 사이에 다른
   명령이 흐른다. 그 명령들은 독립 판정이며, 실행 확인 뒤 kill은 최대 한 `tool_result` 지연만큼
   늦다 — 실행 확인 시점에 이미 실행된 명령은 되돌리지 못한다. 이것이 §1이 arm 1을 제외하고 즉시
   종료 위반을 항상 우선하게 한 이유다.
6. **재부착 backfill은 로그가 남아 있을 때만 성립한다.** 로그 회전·삭제로 `log_offset` 구간이 없으면
   보류는 유지되고 이후 tail에서만 확정되므로, 그 사이 실행된 위반은 §4의 `hook_bypass_unresolved`로
   끝난다 — 미탐이지만 세션이 이미 끝난 뒤의 진단 손실이며, 그 attempt의 push는 pre-push 훅이 막는다.

## 경계·후속

- 관찰: 종단 `result` 이벤트의 `permission_denials` 배열은 거부의 2차 증거가 될 수 있으나 세션이
  끝난 뒤에만 오므로 이 스펙은 쓰지 않는다 — §4가 필요한 이유이기도 하다.
- 관찰: Codex 세션에 미러를 두는 일(codex 훅 정책 경로)은 UI-mn5u·dotfiles Codex 훅 계약 소유이며 이
  스펙 밖이다.

## 구현 unit 후보

- `guard`: §1 `deferrable`·우선순위 + §2 `guard-mirror.js`·어댑터 `probeGuardMirror`·`queue-store` 필드
  (`guard_mirror`, `guard_pending`) — `command-guard.js`, `guard-mirror.js`, `claude.js`, `codex.js`,
  `queue-store.js` + 각 테스트.
- `consume`: §2 spawn 조립·기록, §3·§4 보류/확정/재부착을 `session.js`·`scheduler.js`·`session-monitor.js`·
  `attach.js`에, §6 프리앰블 — + 테스트·스냅샷. `guard` 뒤에 온다.

## 결정 (ADR 후보)

- 전제: ADR 0007 — 머지 금지는 pre-push 훅 예방과 사후 ref 불변식이 강제하고, 텍스트 판정은
  추론성 판정을 경고로 강등하되 정확히 식별되는 원격 변경·가드 무력화 명령의 kill은 유지한다. 이
  스펙은 그 kill을 없애지 않고 판정 입력을 "명령 텍스트"에서 "명령 텍스트 + 실행 증거"로 옮긴다;
  arm 1(같은 명령 안의 비가역 원격 변경)은 텍스트 즉시 kill로 남긴다. supersede 대상이 아니다.
- 예방층(PreToolUse 미러)이 검증된 Claude 세션에서 텍스트 가드는 1회성 hook 재배치를 `tool_use`
  출현이 아니라 `tool_result`의 실행 증거로 판정하고, 훅이 거부한 명령은 기록하지 않는다.
  되돌리기 어려움: 아니다 — attempt 필드 둘(`guard_mirror`, `guard_pending`)과 보류 판정 분기이며,
  되돌리면 UI-iw28 시점 코드로 돌아가고 durable 필드는 `null`로 남아 무해하다. 맥락 없는 의외성:
  있다 — 같은 한 줄이 Codex 세션에서는 즉시 kill이고 Claude 세션에서는 훅 거부 뒤 계속되는 것은 이
  문서 없이는 설명되지 않는다. 실제 절충: 있다 — 예방층을 믿고 오탐을 없애는 것 대 텍스트 판정
  단독 fail-closed; 잔여 위험 1이 그 값이다. 세 조건 중 하나(되돌리기 어려움)가 성립하지 않으므로
  → ADR 아님. 판정 근거는 이 스펙 §1–§4가 소유한다.
- `git push --no-verify`는 검증 세션에서도 텍스트 즉시 kill로 남긴다.
  되돌리기 어려움: 아니다 — `isHookBypass` arm 1 반환값의 `one_shot: false` 하나이며, 되돌리면 arm 1이
  arm 3과 같은 보류 대상이 될 뿐 다른 코드가 바뀌지 않는다. 맥락 없는 의외성: 아니다 — ADR 0007이
  이미 이 명령을 유지 kill로 적었다. 실제 절충: 없다 — 미러가 같은 형태를 거부하므로 정상 경로에서
  실행되지 않고, 남는 차이는 훅 fail-open 때뿐이다. → ADR 아님
- `guard_mirror` 검증은 settings 등록·실행비트·`disableAllHooks` 부재이며 파일명 하나에 결합한다.
  되돌리기 어려움: 아니다 — 조건 목록. 맥락 없는 의외성: 아니다 — "훅이 걸려 있는가"의 가장
  직접적인 증거다. 실제 절충: 있다 — 런타임 성공 증명(불가) 대 정적 등록 증명; 잔여 위험 1·3에
  적었다. 한 조건만 성립 → ADR 아님
