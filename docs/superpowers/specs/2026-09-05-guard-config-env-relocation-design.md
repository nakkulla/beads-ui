---
scope:
  - server/worker/runner/command-guard.js
  - server/worker/runner/command-guard.test.js
  - server/worker/runner/preamble.js
  - server/worker/runner/preamble.test.js
  - server/worker/runner/__snapshots__/preamble.test.js.snap
---

# 가드 hook_bypass — `--config-env`·`GIT_CONFIG_PARAMETERS` 재배치를 판정에 들인다

- 날짜: 2026-09-05
- Bead: `UI-yjn9`
- route: `spec_backed`
- 출처: `UI-iw28` (`discovered-from`) — 그 Bead의 구현 리뷰가 범위 밖으로 판정해 남긴 잔여다.
- 선행: `2026-08-26-guard-one-shot-hooks-relocation-design.md` (`UI-iw28`) — 1회성 재배치의
  판정 술어(§1 네 조건)와 열거 10종을 세웠다. 이 스펙은 그 술어를 **바꾸지 않고**, 술어가
  보지 못하던 두 채널을 같은 술어의 입력으로 들인다.

## 왜

attempt 전용 pre-push hook은 `guard-hook.js`의 `envFor()`가 `GIT_CONFIG_COUNT` /
`GIT_CONFIG_KEY_n=core.hooksPath` / `GIT_CONFIG_VALUE_n=<dir>`로 세션 환경에 싣는다. git의
설정 우선순위에서 이 층(command-line 층)을 이기는 것은 같은 층의 **나중** 항목뿐이다. `-c`가
그 자리에 있어 kill이고, UI-iw28이 그 kill을 열거 10종에서만 풀었다.

같은 층에 서는 채널이 둘 더 있다. 둘 다 현행 가드가 재배치로 인식하지 않는다.

### 측정 (git 2.50.1, 2026-09-05)

attempt hook을 Worker와 같은 방식(`GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath
GIT_CONFIG_VALUE_0=<거부 pre-push 디렉터리>`)으로 환경에 설치한 실험 저장소에서 측정했다.

| 명령 | pre-push | 현행 `findMergeViolation` | 폴백 `HOOK_BYPASS_STRICT_RE` |
| --- | --- | --- | --- |
| `git push origin main` (기준) | 거부(HOOK-RAN) | — | — |
| `git -c core.hooksPath=/dev/null push …` | **우회, push 성공** | `hook_bypass` | 잡음 |
| `HP=/dev/null git --config-env=core.hooksPath=HP push …` | **우회, push 성공** | **null** | 잡음 (`core\.hookspath\s*=`) |
| `GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'" git push …` | **우회, push 성공** | **null** | **놓침** |
| `GIT_CONFIG_GLOBAL=<hooksPath 설정 파일> git push …` | 거부 | 대상 아님 | — |
| `git --exec-path=<가짜 git-push 디렉터리> push …` | 거부 | 대상 아님 | — |

`--config-env`는 `-c`와 같은 경로로 자식에 전파된다 — `git --config-env=core.hooksPath=HP
-c alias.x='!git push origin main:child' x`의 자식 push가 hook 없이 성공했고, 자식 환경에
`GIT_CONFIG_PARAMETERS='core.hooksPath'='/dev/null'`이 실려 있었다. 그러므로 UI-iw28의
"완화는 allow-list 위에 선다" 논리가 이 채널에 그대로 성립한다.

### 왜 kill을 넓히는가 — UI-iw28과 반대 방향인데

UI-iw28의 근거는 "무해한 명령에 세션 SIGTERM을 내리는 비대칭이 비싸다"였다. 이 스펙은 그
비대칭을 다시 만들지 않는다.

- 닫는 구멍은 **실현됐다**: 위 측정에서 두 채널 모두 실제 attempt hook을 지나 원격에 ref를
  썼다. 가설이 아니라 재현이다.
- 오탐 비용은 **UI-iw28이 이미 지불한 것을 넘지 않는다**: `--config-env` 재배치는 `-c`와
  같은 네 조건으로 면제되므로, 무해한 `… status`는 통과한다. kill이 새로 생기는 곳은 `-c`로
  썼다면 이미 kill이었을 자리뿐이다.
- 비대칭 자체가 우회 레시피다: 프리앰블이 `git -c core.hooksPath=…`만 이름 붙여 금지하면,
  같은 일을 하는 다른 철자를 찾는 세션에게 `--config-env`는 **고지된 허용**으로 읽힌다.
  `2026-08-06-worker-preamble-system-prompt-design.md`가 적은 "강제와 고지가 어긋나면 세션이
  우회를 발명한다"는 기전이 그대로 적용된다.

`GIT_CONFIG_PARAMETERS`는 오탐 비용이 사실상 0이다. git 문서가 내부 전달용으로 분류한
변수이고, 세션이 손으로 쓸 정당한 이유가 없다.

## 무엇을

### §1 `--config-env`는 `-c`의 다른 철자다

`isHookBypass()`의 선행 옵션 훑기가 이미 `--config-env`의 두 형태를 읽는다 — 붙인
`--config-env=<key>=<envvar>`와 뗀 `--config-env <key>=<envvar>`. 지금은 그 키가
`core.hooksPath`가 **아닐 때만** 쓰고(`inline_other_key`), `core.hooksPath`일 때는 아무것도
세우지 않는다. UI-iw28 구현 리뷰가 "승인 범위(kill 축소) 반대 방향"으로 되돌린 자리다.

이 스펙이 그 결정을 뒤집는다: `--config-env`가 `core.hooksPath`를 지정하면 `-c`와 똑같이
`inline_relocation`을 세운다. 다른 키를 지정하면 현행대로 `inline_other_key`다. 판정과 면제는
그 뒤 기존 흐름 — `exemptOneShot()`의 (b)·(c)·(d) — 을 그대로 지난다. **새 판정 함수·새 상수는
없다.**

| 명령 | 판정 | 이유 |
| --- | --- | --- |
| `git --config-env=core.hooksPath=HP status --short` | 통과 | 1회성 면제 (d) — 열거 안 |
| `git --config-env core.hooksPath=HP rev-parse HEAD` | 통과 | 같음, 뗀 형태 |
| `git --config-env=core.hooksPath=HP push origin UI-1` | **kill** | 열거 밖 — `-c` 동형과 같은 판정 |
| `git --config-env core.hooksPath=HP push origin UI-1` | **kill** | 같음, 뗀 형태 |
| `git --config-env=core.hooksPath=HP -c core.hooksPath=Y status` | 통과 | 두 채널 모두 `core.hooksPath`만 — (b) 성립 |
| `git --config-env=core.fsmonitor=W -c core.hooksPath=X status` | **kill** | (b) — 현행 유지 |
| `git --config-env=core.hooksPath=HP` | **kill** | 서브커맨드 없음 — `-c` 동형과 같은 판정 |

`--config-env`의 값은 환경변수 **이름**이라 명령 텍스트만으로는 hook이 어디로 가는지 알 수
없다(`HP`가 비어 있으면 git이 `fatal: missing environment variable`로 죽는다). 가드는 어차피
`-c`의 값도 보지 않는다 — 재배치 shape의 판정은 값에 무관하다. 그러므로 값 해석은 하지 않는다.

### §2 `GIT_CONFIG_PARAMETERS` 접두는 재배치 shape이고 면제가 없다

`GIT_CONFIG_PARAMETERS`는 git이 `-c`·`--config-env`를 자식에게 전달할 때 쓰는 변수다. 세션이
이 변수를 접두로 직접 쓰면 `-c`와 같은 층에 같은 값을 넣는 것이므로 hook을 지난다(측정).

**shape 판정**: 접두 할당 이름을 보는 `GIT_CONFIG_ENV_RE`에 `PARAMETERS`를 더한다. 그러면
`env_relocation`이 서고, 기존 세 갈래가 그대로 적용된다 — 명령 없는 할당은 kill(프로세스에
남는다), 비git 명령 앞의 할당은 kill(자식 git이 상속한다), git 명령 앞의 할당은
`exemptOneShot()`으로 간다. UI-iw28이 세운 "env 접두의 위반 판정은 키에 무관하다"는 그대로다.

**면제 판정**: `prefixIsHooksPathOnly()`는 `GIT_CONFIG_PARAMETERS` 할당을 보면 즉시 거짓이다.
어떤 서브커맨드에도 면제가 없다.

이유는 둘이다. 첫째, 값이 git의 sq-quote 목록(`'key'='value' 'key2'='value2'`)이라
`core.hooksPath` **하나만** 실렸음을 증명하려면 그 파서를 들여야 하고, 이 변수를 쓰는 정당한
사례가 없어 그 비용을 정당화할 오탐이 없다. 둘째, UI-iw28 §1.1의 원칙은 "허용은
`core.hooksPath`만, 증명할 수 없으면 거부"다 — 파싱하지 않는 것은 그 원칙의 fail-closed
쪽이다.

| 명령 | 판정 |
| --- | --- |
| `GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'" git push origin UI-1` | **kill** |
| `GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'" git status` | **kill** — 면제 없음 |
| `GIT_CONFIG_PARAMETERS="'user.name'='x'" git status` | **kill** — 키 무관 shape |
| `GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'" go test ./...` | **kill** — 비git |
| `export GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'"` / bare 할당 | **kill** — 지속 |

`GIT_CONFIG_COUNT`/`KEY_n`/`VALUE_n` 접두의 면제 판정은 **바뀌지 않는다**.

### §3 폴백 — `--config-env`는 손대지 않고, `PARAMETERS`만 더한다

`--config-env=core.hooksPath=HP`와 `--config-env core.hooksPath=HP`는 둘 다 텍스트에
`core.hooksPath=`를 담으므로 `HOOK_BYPASS_STRICT_RE`·`HOOK_BYPASS_RE`의 기존 대안
`core\.hookspath\s*=`가 이미 잡는다(측정: 토큰화 실패 입력 `f() { :; }; git --config-env=…
push`는 현행에서도 `hook_bypass`). 정규식은 바꾸지 않고 대조군 테스트로 잠근다.

`GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'"`은 `core.hooksPath`와 `=` 사이에 따옴표가
있어 그 대안을 지나치고, `\bGIT_CONFIG_(?:COUNT|KEY_\d+|VALUE_\d+)\s*=` 대안에도 없다. 두
정규식의 그 대안에 `PARAMETERS`를 더한다:

```
\bGIT_CONFIG_(?:COUNT|KEY_\d+|VALUE_\d+|PARAMETERS)\s*=
```

UI-iw28 §4의 비대칭(폴백은 파싱 경로보다 엄격하고, 면제가 kill을 이기지 못한다)은 그대로다.
`f() { :; }; git --config-env=core.hooksPath=HP status`는 폴백에서 kill이다 — 의도된 과잉 차단.

### §4 프리앰블을 바뀐 계약에 맞춘다

`preamble.js`의 `GUARD_CONTRACT_DIRECTIVE` 두 줄을 고친다. 스냅샷 5곳이 따라 바뀐다.

- **즉시 종료**의 1회성 재배치 항목: 괄호 안 shape 목록에 `--config-env=core.hooksPath=…`를
  `-c` 옆에 더하고, `GIT_CONFIG_PARAMETERS` 접두를 env 접두 목록에 더한다. 뒤의 "열거 밖인 것"
  서술은 그대로다.
- **허용됨**의 1회성 재배치 항목: 면제가 `-c`와 `--config-env` 두 철자에 같이 적용된다는 것과,
  `GIT_CONFIG_PARAMETERS` 접두는 열거 안이어도 면제가 없다는 것을 문장 하나로 덧붙인다.
- `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null` 대안 권고는 그대로다 — 이번
  측정이 그 두 변수가 env 설치 hook을 이기지 못함을 확인했다.

### §5 손대지 않는 것 — 측정으로 닫은 질문

Bead가 스펙에서 정하라고 남긴 "다른 1회성 채널" 질문에 측정으로 답한다.

- **`--exec-path`**: `push`는 builtin이라 exec-path 조회 없이 내부에서 실행된다. 가짜
  `git-push`를 둔 디렉터리를 `--exec-path`로 줘도 hook이 그대로 돌았다. UI-iw28의 "열거 10종이
  전부 builtin이라 조회 경로 없음" 판단은 push 쪽에서도 성립한다. 판정 대상에 넣지 않는다.
- **`GIT_CONFIG_GLOBAL` / `GIT_CONFIG_SYSTEM`**: 파일 층이라 command-line 층의 attempt hook을
  이기지 못한다. 판정 대상에 넣지 않고, 프리앰블의 대안 권고를 유지한다.
- **`-C` / `--git-dir` / `--work-tree`**: 다른 저장소를 가리킬 뿐 hook 경로를 옮기지 않는다.
  env 설치 hook은 프로세스 환경이라 어느 저장소에서든 붙는다. 이 가드의 관할이 아니다.

결정: `--exec-path`는 판정 대상에 넣지 않는다 — builtin 서브커맨드는 exec-path를 조회하지
않음이 측정으로 확인됐고, 비builtin 실행은 셸이 임의 프로그램을 실행하는 것과 다르지 않다.

## Test scope

RED → GREEN을 적용할 seam은 아래로 한정한다. 모두 기존 파일이다.

| seam | 파일 | 검증 대상 |
| --- | --- | --- |
| `--config-env` 재배치 인식 | `command-guard.test.js` | 붙인·뗀 두 형태 `… push origin UI-1` kill; 서브커맨드 없음 kill — 현행 `leaves a --config-env hooks-path override alone` 테스트가 뒤집힌다 |
| `--config-env` 면제 | `command-guard.test.js` | 붙인·뗀 두 형태 `… status --short`·`… rev-parse HEAD` 통과; `--config-env=core.hooksPath=HP -c core.hooksPath=Y status` 통과 |
| `GIT_CONFIG_PARAMETERS` shape | `command-guard.test.js` | 접두 + `git push` kill, 접두 + `git status` kill(면제 없음), 접두 + `go test` kill, bare 할당 kill |
| `GIT_CONFIG_PARAMETERS` 폴백 | `command-guard.test.js` | 토큰화 실패 입력 `f() { :; }; GIT_CONFIG_PARAMETERS=… git push` kill; `HOOK_BYPASS_STRICT_RE`·`HOOK_BYPASS_RE` 직접 대조 |
| 계약 문구 | `preamble.test.js` | 즉시 종료 항목에 `--config-env=core.hooksPath=…`·`GIT_CONFIG_PARAMETERS`가, 허용됨 항목에 두 철자 면제와 `PARAMETERS` 무면제가 있다 |

**회귀 고정과 대조군** — 확대가 UI-iw28의 완화를 되돌리지 않고, 폴백이 이미 잡는 것을 그대로
잡는다는 것을 대조군이 맡는다.

1. **대조군 A — UI-iw28 관측 사고**: `git add … && git -c core.hooksPath=.git/hooks status
   --short` → 양쪽 모두 **무위반** (기존 테스트).
2. **대조군 B — 다른 키 `--config-env`**: `git --config-env=core.fsmonitor=WATCH -c
   core.hooksPath=/dev/null status` → 양쪽 모두 **kill** (기존 테스트 유지).
3. **대조군 C — env 접두 면제 불변**: `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath
   GIT_CONFIG_VALUE_0=.git/hooks git status --short` → 양쪽 모두 **무위반** (기존 테스트).
4. **대조군 D — `--config-env` 폴백 불변**: `f() { :; }; git --config-env=core.hooksPath=HP push
   origin UI-1` → 양쪽 모두 **kill**. 변경 전에도 `core\.hookspath\s*=`가 잡으므로 RED가
   아니다 — seam이 아니라 대조군이다.
5. **대조군 E — 값 미해석**: `git --config-env=core.hooksPath=NOPE push origin UI-1`(빈
   변수라 git이 fatal로 죽는 명령) → **kill**. 가드는 값을 보지 않는다.

## 검증

`npm run all` (= `lint` → `tsc` → `test` → `prettier:check`)이 green이어야 한다.
프런트엔드 소스를 건드리지 않으므로 번들 재생성은 대상이 아니다. 스냅샷 갱신은 `vitest run
-u`가 아니라 바뀐 두 줄의 파생분만 담아야 한다 — UI-iw28 구현 리뷰가 그 범위를 이미
허용했다.

이 저장소에는 CI 워크플로가 없고 머지 자격 판정이 checks를 보지 않는다(`AGENTS.md`).
`gh pr checks`를 기다리지 않는다.

## 배포 처분

`repo-ops/config.toml`이 `[deploy]`를 선언하고 있으므로 머지 후 배포는 자동 경로가 소유한다.
서버 측 워커 코드라 재시작 없이는 실 서비스에 반영되지 않는다. 배포 operation이 terminal
success에 도달하고 프로세스 경로·포트·HTTP 응답 검증까지 통과한 뒤에 완료를 선언한다.
`worker-ineligible`은 붙이지 않는다 — interactive-only 검증이 없다.

## 잔여 위험

1. **폴백이 `--config-env`를 텍스트 우연으로 잡는다.** `core\.hookspath\s*=` 대안이 잡는 것은
   `--config-env` 문법이 우연히 `key=envvar`를 붙여 쓰기 때문이다. git이 `--config-env` 문법을
   바꾸면(예: 공백 허용) 폴백이 조용히 놓친다. 대조군 D가 그 우연을 고정하고, 깨지면 그때
   `--config-env` 전용 대안을 더한다. 지금 더하지 않는 이유는 UI-1xcd·UI-iw28이 폴백 정규식에
   면제나 세부 shape를 넣는 것을 금지한 방향과, 이미 잡히는 것을 두 번 적는 중복이다.
2. **`GIT_CONFIG_PARAMETERS` 무면제는 과잉 차단이다.** `GIT_CONFIG_PARAMETERS="'user.name'='x'"
   git status`는 hook과 무관한데 kill이다. 이 변수를 손으로 쓰는 세션이 관측되면 그때 sq-quote
   파서를 들여 `core.hooksPath`만 실린 접두를 면제하는 쪽으로 넓힌다 — §2의 결정은 그 확대를
   막지 않는다. 지금은 사용 사례가 없어 비용을 내지 않는다.
3. **UI-iw28 잔여 위험 1·2를 그대로 승계한다.** 저장소 설정에 이미 있는 헬퍼 프로그램은 닫지
   못하고, 열거는 사람이 관리한다. 우회 불가능한 방어는 GitHub 브랜치 보호뿐이다.
4. **git이 새 command-line 층 채널을 추가하면 같은 구멍이 다시 난다.** 이 스펙은 git 2.50.1이
   가진 세 채널(`-c`·`--config-env`·`GIT_CONFIG_PARAMETERS`)을 전부 닫는다. `git help git`의
   개요(synopsis)에 새 `--config-*` 옵션이 생기면 그 옵션이 같은 층인지를 §1의 측정 방법으로
   확인하는 것이 관리 절차다.

## 결정 (ADR 후보)

- 전제: ADR 0007 — 텍스트 판정은 정확한 원격 변경 명령의 kill을 유지한다. 이 스펙은 그
  kill의 shape 열거를 같은 층의 채널 둘로 채운다.
- `--config-env`를 `-c`와 같은 재배치 shape로 판정한다 — 새 결정이 아니라 UI-iw28 §1.1의
  "허용은 `core.hooksPath`만, 채널 무관" 원칙의 적용 범위 확대다. 되돌릴 이유가 생기면 그
  스펙이 아니라 이 스펙을 supersede한다. → ADR 아님
- `GIT_CONFIG_PARAMETERS` 접두는 면제 없이 kill이다 — 파싱 비용 대비 오탐이 없는 국소 결정이며
  잔여 위험 2가 확대 경로를 이미 적었다. → ADR 아님
