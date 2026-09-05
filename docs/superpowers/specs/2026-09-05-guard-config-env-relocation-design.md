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
  보지 못하던 두 채널과 그 지속형 철자(`export`)를 같은 술어의 입력으로 들인다.

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
| `GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'"` (bare 할당, 명령 없음) | **kill** — 지속 |
| `export GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'"` | **kill** — §2.1 |

`GIT_CONFIG_COUNT`/`KEY_n`/`VALUE_n` 접두의 면제 판정은 **바뀌지 않는다**.

#### §2.1 `export` 형태 — 지속 할당의 두 번째 철자

UI-iw28 §1은 "명령 없는 `GIT_CONFIG_*` 할당(`export`, bare)"을 kill로 적었지만, 실제로 잡히는
것은 bare 형태만이다(측정: `GIT_CONFIG_COUNT=0` → `hook_bypass`, `export GIT_CONFIG_COUNT=0` →
null). `export NAME=value`에서 할당은 접두가 아니라 `export`의 **인자**라 `normalizeArgv`가
접두로 떼지 않고, `argv[0]`이 `git`이 아니어서 `env_relocation` 없이 통과한다. 폴백 정규식은
잡지만 토큰화가 실패한 입력에서만 돈다. 즉 `export`는 파싱 성공 경로의 구멍이고, 이 스펙이
`GIT_CONFIG_PARAMETERS`를 그 규칙에 들이면 같은 구멍을 함께 물려받는다.

그러므로 규칙 하나를 더한다: `argv[0]`이 셸 변수 내보내기 builtin — `export`·`declare`·
`typeset` — 이고 그 인자 중 `NAME=value` 할당의 `NAME`이 `GIT_CONFIG_ENV_RE`(§2에서
`PARAMETERS`가 더해진 것)에 맞으면 kill이다. 값·키·옵션 플래그(`-x` 등)는 보지 않는다 —
내보내진 할당은 이후 모든 명령에 남으므로 UI-iw28 §1의 "지속되는 재배치"이고, 그 판정은
원래부터 키에 무관하다. `export GIT_CONFIG_GLOBAL=…`처럼 정규식 밖의 이름은 현행대로 통과다.

| 명령 | 판정 |
| --- | --- |
| `export GIT_CONFIG_COUNT=0` | **kill** — 현행 null, 이 스펙으로 닫힌다 |
| `export GIT_CONFIG_PARAMETERS="'core.hooksPath'='/dev/null'"` | **kill** |
| `export FOO=1; git status` | 통과 — 이름이 정규식 밖 |
| `export GIT_CONFIG_GLOBAL=/dev/null` | 통과 — 판정 대상 아님(§5) |

이 규칙은 Bead가 적은 범위(`--config-env`) 밖이지만, §2가 세우는 shape의 지속형 철자가 같은
파일의 같은 술어에서 새는 것을 스펙이 알고도 남기면 §2의 "면제 없이 kill"이 텍스트로만 참이다.
같은 저장소·같은 파일·같은 검증 번들이라 별도 Bead 근거가 없다(`bead_split`).

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

`preamble.js`의 `guardContractDirective()`는 disposition 세션에는 hook 무력화 판정이 적용되지
않는다고 고지하고(`즉시 종료`의 hook 항목들이 non-disposition 분기에만 있다), `허용됨`의 1회성
재배치 문장은 분기 없이 모든 세션에 나간다. 금지를 더하는 문장은 그러므로 non-disposition
분기에만 들어가야 한다 — 그렇지 않으면 disposition 세션이 "판정이 적용되지 않는다"와 "면제가
없다"를 한 프롬프트에서 읽는다.

- **즉시 종료**(non-disposition 분기)의 1회성 재배치 항목: 괄호 안 shape 목록에
  `--config-env=core.hooksPath=…`를 `-c` 옆에 더하고, `GIT_CONFIG_PARAMETERS` 접두를 env 접두
  목록에 더한다. 그 항목에 문장 하나를 덧붙인다 — `GIT_CONFIG_PARAMETERS` 접두는 뒤따르는
  명령이 무엇이든 면제가 없고, `export`로 내보낸 `GIT_CONFIG_*` 할당은 bare 할당과 같은 지속
  재배치다. "열거 밖인 것" 서술은 그대로다.
- **허용됨**(공통)의 1회성 재배치 항목: 면제가 `-c`와 `--config-env` 두 철자에 같이 적용된다는
  것만 덧붙인다. 허용을 넓히는 말이라 disposition 세션과 모순이 없다.
- `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null` 대안 권고는 그대로다 — 이번
  측정이 그 두 변수가 env 설치 hook을 이기지 못함을 확인했다.

스냅샷은 `즉시 종료` 변경으로 non-disposition 조합 6개, `허용됨` 변경으로 전 조합 10개가
바뀐다. disposition 조합 4개에는 `GIT_CONFIG_PARAMETERS`·`export` 문구가 나타나면 안 된다.

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

모든 seam은 변경 전 실패(RED)해야 한다 — 아래 각 행의 "현행" 열이 그 측정이다.

| seam | 파일 | 검증 대상 | 현행 |
| --- | --- | --- | --- |
| `--config-env` 재배치 인식 | `command-guard.test.js` | 붙인·뗀 두 형태 `… push origin UI-1` kill; 서브커맨드 없음 `git --config-env=core.hooksPath=HP` kill — 현행 `leaves a --config-env hooks-path override alone` 테스트가 뒤집힌다 | null → RED |
| `GIT_CONFIG_PARAMETERS` shape | `command-guard.test.js` | 접두 + `git push` kill, 접두 + `git status` kill(면제 없음), 접두 + `go test` kill, bare 할당 kill | 전부 null → RED |
| `GIT_CONFIG_PARAMETERS` 폴백 | `command-guard.test.js` | 토큰화 실패 입력 `f() { :; }; GIT_CONFIG_PARAMETERS=… git push` kill; `HOOK_BYPASS_STRICT_RE`·`HOOK_BYPASS_RE`가 `GIT_CONFIG_PARAMETERS=`에 match | strict_re false → RED |
| `export` 지속 할당 (§2.1) | `command-guard.test.js` | `export GIT_CONFIG_COUNT=0` kill, `export GIT_CONFIG_PARAMETERS=…` kill, `declare`·`typeset` 동형 kill | null → RED |
| 계약 문구 | `preamble.test.js` | non-disposition 즉시 종료 항목에 `--config-env=core.hooksPath=…`·`GIT_CONFIG_PARAMETERS`·`export`가 있고, 공통 허용됨 항목에 두 철자 면제가 있고, disposition 출력에는 `GIT_CONFIG_PARAMETERS`·`export` 문구가 없다 | 문구 부재 → RED |

**회귀 고정과 대조군** — 확대가 UI-iw28의 완화를 되돌리지 않고, 폴백이 이미 잡는 것을 그대로
잡는다는 것을 대조군이 맡는다. 변경 전에도 통과하는 행은 seam이 아니라 여기다.

1. **대조군 A — UI-iw28 관측 사고**: `git add … && git -c core.hooksPath=.git/hooks status
   --short` → 양쪽 모두 **무위반** (기존 테스트).
2. **대조군 B — 다른 키 `--config-env`**: `git --config-env=core.fsmonitor=WATCH -c
   core.hooksPath=/dev/null status` → 양쪽 모두 **kill** (기존 테스트 유지).
3. **대조군 C — env 접두 면제 불변**: `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath
   GIT_CONFIG_VALUE_0=.git/hooks git status --short` → 양쪽 모두 **무위반** (기존 테스트).
4. **대조군 D — `--config-env` 폴백 불변**: `f() { :; }; git --config-env=core.hooksPath=HP push
   origin UI-1` → 양쪽 모두 **kill**. 변경 전에도 `core\.hookspath\s*=`가 잡으므로 RED가
   아니다.
5. **대조군 E — 값 미해석**: `git --config-env=core.hooksPath=NOPE push origin UI-1`(빈
   변수라 git이 fatal로 죽는 명령) → **kill**. 가드는 값을 보지 않는다.
6. **대조군 F — `--config-env` 면제**: 붙인·뗀 두 형태 `… status --short`·`… rev-parse HEAD`,
   그리고 `--config-env=core.hooksPath=HP -c core.hooksPath=Y status` → 양쪽 모두 **무위반**.
   현행은 shape를 인식하지 않아 통과하고, 변경 후는 면제로 통과한다 — 결과가 같아 RED가 아니지만,
   §1이 넓히는 kill이 열거 안까지 번지지 않음을 고정하는 자리다.
7. **대조군 G — `export` 이름 경계**: `export FOO=1; git status`·`export GIT_CONFIG_GLOBAL=/dev/null`
   → 양쪽 모두 **무위반**. §2.1의 규칙이 이름 정규식 밖으로 번지지 않음을 고정한다.

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
4. **§2.1은 내보내기 builtin 셋만 본다.** `set -a; GIT_CONFIG_COUNT=0`, `env GIT_CONFIG_COUNT=0
   git push`, `eval`, 함수 본문 안의 할당 같은 다른 지속·간접 철자는 파싱 성공 경로에서 여전히
   통과한다(`env … git push`는 `argv[0]`이 `env`라 비git 분기에서 `env_relocation`이 없다).
   이 스펙은 UI-iw28 §1이 문장으로 약속한 `export`만 코드와 맞추고, 셸 지속 철자 일반을 열거하지
   않는다 — 그 열거는 토크나이저 층의 일이고, 관측된 사고가 없다.
5. **git이 새 command-line 층 채널을 추가하면 같은 구멍이 다시 난다.** 이 스펙은 git 2.50.1이
   가진 세 채널(`-c`·`--config-env`·`GIT_CONFIG_PARAMETERS`)을 전부 닫는다. `git help git`의
   개요(synopsis)에 새 `--config-*` 옵션이 생기면 그 옵션이 같은 층인지를 §1의 측정 방법으로
   확인하는 것이 관리 절차다.

## 결정 (ADR 후보)

- 전제: ADR 0007 — 텍스트 판정 중 **추론성** 판정(base로 향하는 것처럼 보이는 push 등)은
  경고로 강등하고, **정확히 식별되는** 가드 무력화 명령의 kill은 유지한다. 이 스펙의 세 판정은
  모두 뒤쪽이다: 판정 입력은 명령이 무엇을 하려는지에 대한 추측이 아니라 attempt hook을 싣는
  바로 그 설정 채널(ADR 0007 Decision 1이 "`core.hooksPath`를 실은 `GIT_CONFIG_COUNT`로
  전달"이라 적은 층)에 쓰는 **정확한 shape**다. 키 무관 kill은 UI-iw28 §1.1 (b)가 같은 ADR
  아래에서 이미 세운 규칙(`GIT_CONFIG_KEY_0=user.name … git status`는 현행 kill)이고, 이 스펙은
  그 규칙의 이름 목록에 `PARAMETERS`를 더할 뿐이다. 재배치 여부를 값 파싱 없이 부정할 수 없는
  shape를 fail-closed로 두는 것은 ADR 0007이 "토크나이저가 해석하지 못한 입력은 fail-closed
  폴백"으로 이미 택한 방향이다. 그러므로 supersede 대상이 아니다.
- `--config-env`가 `core.hooksPath`를 지정하면 `-c`와 같은 재배치 shape다.
  되돌리기 어려움: 아니다 — 옵션 훑기의 분기 하나이고, 되돌리면 UI-iw28 구현 리뷰 시점의
  코드로 돌아간다. 맥락 없는 의외성: 아니다 — `-c`가 kill인 것을 아는 사람에게 같은 층의 다른
  철자가 kill인 것은 의외가 아니다. 실제 절충: 없다 — 같은 면제가 적용되므로 kill이 새로 생기는
  자리는 `-c`로 썼다면 이미 kill이었을 자리뿐이다. → ADR 아님
- `GIT_CONFIG_PARAMETERS` 접두는 면제 없이 kill이다.
  되돌리기 어려움: 아니다 — 잔여 위험 2가 적은 대로, 사용 사례가 나타나면 sq-quote 파서를 들여
  면제를 넓히는 것이 이 스펙 안에서 열린 경로다. 맥락 없는 의외성: 있다 — 훅과 무관한
  `GIT_CONFIG_PARAMETERS="'user.name'='x'" git status`가 죽는 것은 §2를 읽지 않은 사람에게
  의외다. 그러나 그 의외성은 UI-iw28 §1.1 (b)의 `GIT_CONFIG_KEY_0=user.name` kill과 같은
  종류이고 그 결정이 ADR이 아니었다. 실제 절충: 있다 — 파서 비용 대 오탐, 그러나 이 변수를
  손으로 쓰는 사용 사례가 관측된 적이 없어 오탐 쪽 무게가 0이다. 되돌리기가 쉽고 나머지 두
  조건도 UI-iw28 (b)의 선례와 관측 0건으로 약하게만 성립하므로 → ADR 아님
- `export`·`declare`·`typeset`으로 내보낸 `GIT_CONFIG_*` 할당은 bare 할당과 같은 지속 재배치다.
  되돌리기 어려움: 아니다 — builtin 이름 셋을 보는 분기 하나다. 맥락 없는 의외성: 아니다 —
  UI-iw28 §1이 이미 `export`를 kill 목록에 적었고, 이 스펙은 그 문장을 코드와 일치시킨다. 실제
  절충: 없다. → ADR 아님
