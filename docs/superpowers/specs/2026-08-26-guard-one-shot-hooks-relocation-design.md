---
scope:
  - server/worker/runner/command-guard.js
  - server/worker/runner/command-guard.test.js
  - server/worker/runner/preamble.js
  - server/worker/runner/preamble.test.js
---

# 가드 hook_bypass — 1회성 재배치의 kill 범위를 근거에 맞춘다

- 날짜: 2026-08-26
- Bead: `UI-iw28`
- route: `spec_backed`
- 출처: `UI-jaua` (`discovered-from`) — 그 Bead의 attempt가 이 판정으로 죽었다.
- 선행: `2026-08-04-worker-guard-kill-scope-reduction-design.md` (`UI-1xcd`) — kill을
  "비가역 원격 변경"에만 남기고 `hook_bypass`에서 순수 읽기를 제외했다. 이 Bead는 그때
  손대지 않고 남긴 **1회성 재배치**를 같은 기준으로 다시 판정한다.

## 왜

`hook_bypass`가 kill인 근거는 코드에 문장으로 적혀 있다(`command-guard.js:234-235`):

> `hook_bypass` — 그 자체는 아무것도 바꾸지 않지만, **다음 push**가 원격 base를 실제로
> 옮긴다(측정, UI-8mvc).

이 근거는 **지속되는** 재배치에만 성립한다. `git config core.hooksPath <값>`은 config 파일에
남고, `export GIT_CONFIG_COUNT=…`는 셸 프로세스에 남는다 — 둘 다 나중의 push에 닿는다.
그런데 `git -c core.hooksPath=…`는 그 명령 한 번에만 적용된다. 판정은 이 차이를 보지 않고
argv 위치만으로 둘을 같게 다룬다.

### 관측된 사고

2026-08-26 12:05:44Z, `UI-jaua` attempt `1787744724984-1`. 세션이 첫 유닛 커밋 직전에
실행한 Bash 한 줄이다:

```
git add app/protocol.md server/worker/queue-store.js … && \
  git -c core.hooksPath=.git/hooks status --short
```

`hook_bypass_blocked` kill → `loud_fail_blocker`, 자동 진행 off, 사람의 ▶ 필요. 잃은 것은
약 15분의 구현 컨텍스트다(`git add`는 `&&` 앞이었으나 kill이 실행 전에 들어와 스테이징도
남지 않았다).

이 명령이 무엇을 무너뜨릴 수 있었는지 세 가지로 확인했다.

1. **hook을 돌리지 않는다.** `git status`는 pre-push를 실행하지 않는다.
2. **재배치 대상이 비어 있다.** 이 저장소 `.git/hooks`에는 `.sample` 외 파일이 없고
   `core.hooksPath` 설정도 없다. 가리킨 값이 곧 기본값이다.
3. **필요하지도 않았다.** 18초 전 같은 세션이 평범한 `git status --short`를 성공적으로
   실행했다(transcript 라인 622). 오류도, hook 잡음도 없었다.

즉 아무것도 우회할 수 없고 아무 이유도 없는 명령에 최대 처벌이 떨어졌다. UI-1xcd가 닫은
것과 같은 종류의 비대칭이며, 그 스펙이 남긴 잔여분이다.

### 측정: `-c`는 자식 프로세스로 전파된다

완화의 방향을 정하는 사실이다. git 2.50.1에서 측정했다:

```
$ git -c core.hooksPath=/tmp/xx -c alias.showenv='!env' showenv | grep GIT_CONFIG
GIT_CONFIG_PARAMETERS='core.hooksPath'='/tmp/xx' 'alias.showenv'=''\!'env'
```

`-c`는 `GIT_CONFIG_PARAMETERS`로 내보내지고 자식 git이 그것을 읽는다. 따라서
"서브커맨드가 `push`일 때만 kill" 같은 deny-list 완화는 안전하지 않다 —
`git -c core.hooksPath=X submodule foreach 'git push …'`가 그대로 뚫린다. 완화는
**allow-list** 위에 서야 한다.

### 효과는 이진이다

`GUARD_EFFECTS`(`command-guard.js:245-250`)와 소비 측(`session.js:546-590`)이 아는 값은
둘뿐이다 — `warn`은 명령이 **실제로 실행되고** 발생 사실만 attempt 레코드에 남는 것이고,
`kill`은 SIGTERM이다. "명령만 거부하고 세션은 살린다"는 효과가 없다. 그러므로 `hook_bypass`
종류 전체를 `warn`으로 강등하는 선택지는 존재하지 않는다 — 그러면 진짜 push 우회가
실행된다.

## 무엇을

### §1 판정 술어 — pre-push에 닿을 수 있는가

1회성 재배치의 생사는 "hook을 하나라도 돌리는가"가 아니라 **"attempt의 pre-push hook에
닿을 수 있는가"**로 정한다.

이 구분이 필요하다. attempt guard hook 디렉터리에 설치되는 것은 `pre-push` 하나뿐이고
(`guard-hook.js`), UI-1xcd §1이 세운 kill 기준도 "원격 상태를 되돌릴 수 없게 바꾸는가,
또는 그렇게 만들 **예방층**을 무너뜨리는가"였다. 그 예방층이 pre-push다. 반면 "hook을 하나도
돌리지 않는다"는 서술은 정확하지 않다 — `git status`는 인덱스를 다시 쓰면서
`post-index-change`를 돌릴 수 있다. 그 hook은 가드가 설치한 것이 아니고, 저장소가 자기 hook을
어떻게 쓰는지는 이 가드의 관할이 아니다.

**면제 조건은 넷이 모두 성립할 때다:**

- (a) 재배치 뒤에 오는 명령이 `git`이다.
- (b) 재배치가 **`core.hooksPath` 하나만** 지정한다(§1.1).
- (c) 접두에 그 재배치 말고 **다른 환경변수 할당이 없다**(§1.1).
- (d) 그 서브커맨드가 pre-push를 돌릴 수 없고, git 설정으로 외부 프로그램을 실행하는 경로를
  열지 않는다 — 아래 닫힌 열거 안에 있다.

#### §1.1 재배치의 순수성 — 같은 명령이 여는 헬퍼 경로를 닫는다

git은 자기 설정으로 임의의 외부 프로그램을 실행한다. 그 프로그램은 git이 낳은 자식이므로
`GIT_CONFIG_PARAMETERS`를 상속하고, 따라서 `git push`를 실행하면 attempt의 pre-push hook을
**우회한다**. 측정으로 확인했다 — `GIT_EXTERNAL_DIFF=/usr/bin/env git -c core.hooksPath=/tmp/xx
diff --no-index a b`는 그 헬퍼를 실제로 실행했고, 상속은 이 스펙 앞머리의
`GIT_CONFIG_PARAMETERS` 측정과 같은 기전이다.

그러므로 **같은 명령이 헬퍼 경로를 여는 두 형태를 면제에서 제외한다.**

- (b) `-c`가 `core.hooksPath` 외의 키를 지정하면 kill이다. 열거 **안**의 서브커맨드여도
  그렇다 — `git -c core.hooksPath=X -c core.fsmonitor=<명령> status`가 그 형태다. env 접두도 같다: `GIT_CONFIG_KEY_n`이
  `core.hooksPath`가 아닌 키를 지정하면 kill이다 — `GIT_CONFIG_KEY_0=diff.external
  GIT_CONFIG_VALUE_0=<명령> git status`는 두 번째 채널조차 필요 없는 직행로다.
- (c) 접두에 `GIT_EXTERNAL_DIFF`·`GIT_PAGER`·`GIT_SSH_COMMAND` 같은 다른 할당이 있으면
  kill이다. 면제는 접두가 재배치**만** 실을 때 성립한다.

이것은 "위험한 config 키의 2차 열거"가 아니다. 반대 방향의 판정 — **`core.hooksPath`만
허용하고 나머지 전부를 거부**하므로, git이 키를 추가해도 드리프트하지 않는다.

**`ONE_SHOT_SAFE_SUBCOMMANDS` (10종, 닫힌 열거):**

```
status  rev-parse  ls-files  ls-tree  cat-file  describe
shortlog  merge-base  for-each-ref  config
```

`cat-file`은 `--filters`·`--textconv`를 달면 제외된다 — 그 두 옵션이 하는 일이 설정된
드라이버를 실행하는 것이다.

목록 밖은 전부 kill이다(fail-closed). 빠진 것들의 이유는 세 갈래다 —
`submodule`·`subtree`·`rebase`·`pull`·`bisect`는 git을 다시 부르므로 앞의 전파 측정에
걸리고, `commit`·`merge`·`checkout`·`am`은 자기 hook을 돌리며,
**`diff`·`show`·`log`·`blame`·`grep`은 본래 동작이 설정된 콘텐츠 헬퍼를 실행하는 것이다**
(`diff.external`, `diff.<driver>.textconv`, `.gitattributes`가 할당한 filter driver).
그 헬퍼는 (b)·(c)로 닫히지 않는다 — 저장소 설정에 이미 있으면 맨 명령으로도 돌기 때문이다.
서브커맨드가 아예 없는 `git -c core.hooksPath=X` 역시 목록에 없으므로 kill이다.

이 제외의 대가는 명시한다: `git -c core.hooksPath=… diff|log|show`는 여전히 세션을 죽인다.
관측된 사고(`status`)는 닫히지만, 그 계열을 면제하려면 실행 채널이 없음을 명령 텍스트만으로
증명해야 하고 그럴 방법이 없다.

**두 shape는 같은 성질로 다룬다.** `-c`와 `VAR=… <명령>` 접두는 둘 다 그 한 명령(과 그
자식)에만 적용된다 — 전자는 git의 `-c` 의미로, 후자는 셸의 할당 접두 의미로. 그러므로 같은
술어로 판정한다. `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath … git status`는
면제이고, `GIT_CONFIG_COUNT=1 … go test ./...`는 (a)에서 걸려 kill이다 — 2026-08-06 사고
(`2026-08-06-worker-preamble-system-prompt-design.md` 배경)가 그 형태였고, `go test`가
git 자식을 낳으므로 판정이 바뀌지 않는다.

env 접두의 **위반 판정 자체는 키에 무관한 현행 의미를 유지한다**: `GIT_CONFIG_COUNT`/`KEY_n`/
`VALUE_n` 재정의는 그 값이 어느 키를 가리키든 재배치 shape다. 키를 보는 것은 그 shape를
**면제할지**를 정할 때뿐이다((b)).

**arm은 합성된다.** 1회성 면제는 "재배치 shape 자체로는 위반이 아니다"만 말하며, 같은
명령에 대한 다른 arm의 판정을 건너뛰지 않는다. `config`이 열거에 있는 것은 이 합성 덕분에
안전하다:

| 명령 | 판정 | 이유 |
| --- | --- | --- |
| `git -c core.hooksPath=X config --get foo` | 통과 | 1회성 면제 + config 읽기(UI-1xcd §2) |
| `git -c core.hooksPath=X config core.hooksPath Y` | **kill** | 1회성 면제를 지나도 config **쓰기** arm이 잡는다 |
| `git -c core.hooksPath=X push origin b` | **kill** | 목록 밖 |
| `git -c core.hooksPath=X status --short` | 통과 | 관측 사고 |

**kill로 남는 전부:**

| 형태 | 근거 |
| --- | --- |
| `git config core.hooksPath <값>` / `set` / `unset` / `--unset` | 지속된다 — 다음 push에 닿는다 |
| 명령 없는 `GIT_CONFIG_*` 할당 (`export`, bare) | 프로세스에 남는다 |
| `GIT_CONFIG_*=… <non-git>` | 자식 git이 상속한다(측정) |
| `git -c core.hooksPath=X <열거 밖>` | pre-push를 돌리거나 헬퍼를 실행한다 |
| `git -c core.hooksPath=X -c <다른 키>=… <열거 안>` | (b) — 같은 명령이 헬퍼 채널을 연다 |
| `GIT_CONFIG_KEY_n=<core.hooksPath 아닌 키> … git <열거 안>` | (b) — 같은 직행로 |
| `GIT_EXTERNAL_DIFF=… GIT_CONFIG_*=… git <열거 안>` | (c) — 접두가 재배치만 싣지 않았다 |
| `git push --no-verify` | 변경 없음 |

### §2 면제의 효과 — 위반이 아니다

열거 안에 든 1회성 재배치는 **위반으로 기록되지 않는다.** `warn`으로 강등하지 않고, attempt
레코드에도 남기지 않는다.

근거는 UI-1xcd §2가 순수 읽기에 내린 처분과 같다 — 위반이 아닌 것을 가드가 기록하면 그 기록이
다음 오판의 재료가 된다. 보드에 배너가 뜨고, 실패 사유를 읽는 사람이 무해한 명령을 사건으로
읽는다. 무엇을 금지하는지는 §5의 고지가 맡는다.

### §3 `isHookBypass()` 재배열

지금 두 재배치 루프는 각각 즉시 `return true`한다(`command-guard.js:1584-1626`). 재배치가
있었다는 **사실만 모으고** 판정을 서브커맨드까지 미루는 형태로 바꾼다.

```js
const env_relocation = /* prefix 의 GIT_CONFIG_* 할당 */;
if (env_relocation && argv.length === 0) { return true; }   // 명령 없는 할당 = 지속
if (argv.length === 0) { return false; }
const is_git = basename(argv[0]).toLowerCase() === 'git';
if (env_relocation && !is_git) { return true; }             // GIT_CONFIG_… go test
if (!is_git) { return false; }
/* 선행 옵션 훑기 → c_relocation, c_other_key, subcommand, args (현행 루프 확장) */
const one_shot = env_relocation || c_relocation;
if (one_shot && !exemptOneShot(prefix, c_other_key, subcommand, args)) {
  return true;
}
/* 기존 push / config arm 을 이어서 판정 — §1 의 합성 */
```

`exemptOneShot()`이 §1의 (b)·(c)·(d)를 한자리에서 판정한다:

```js
function exemptOneShot(prefix, c_other_key, subcommand, args) {
  if (c_other_key) { return false; }                        // (b) -c 가 다른 키를 지정
  if (!prefixIsHooksPathOnly(prefix)) { return false; }     // (b)(c) 접두가 재배치만
  if (!ONE_SHOT_SAFE_SUBCOMMANDS.has(subcommand)) { return false; }   // (d)
  if (subcommand === 'cat-file') {
    return !args.some((t) => t === '--filters' || t === '--textconv');
  }
  return true;
}
```

`prefixIsHooksPathOnly()`는 접두의 모든 할당이 `GIT_CONFIG_COUNT`/`KEY_n`/`VALUE_n`이고,
모든 `KEY_n` 값이 `core.hooksPath`일 때만 참이다. 다른 이름의 할당이 하나라도 있으면
거짓 — 그것이 (c)다. **빈 접두는 참이다**: 접두 없는 순수 `-c` 형태가 (c)에 걸려서는
안 된다.

명령 없는 할당을 `argv.length === 0` 탈출보다 **먼저** 보는 현행 순서를 지킨다. 그 자리의
주석이 이유를 적어두었다 — bare `GIT_CONFIG_COUNT=0`은 argv가 없는 하나의 simple command다.

### §4 폴백은 손대지 않는다

토큰화가 실패했을 때 쓰는 `HOOK_BYPASS_STRICT_RE`(`command-guard.js:105`)와
`fallbackViolation()`의 우선순위는 그대로 둔다. UI-1xcd §2가 고정한 이유가 그대로 성립한다 —
명령 경계를 믿을 수 없는 입력에서는 면제가 kill을 이기면 안 되고, 한 덩어리 안에
`git -c core.hooksPath=X status`와 진짜 무력화가 함께 있을 수 있다.

결과적으로 폴백은 파싱 성공 경로보다 엄격하다. 의도된 비대칭이며, 증상은 오탐(과잉 차단)이지
미탐이 아니다.

### §5 프리앰블을 바뀐 계약에 맞춘다

강제와 고지가 어긋나면 세션이 우회를 발명한다 —
`2026-08-06-worker-preamble-system-prompt-design.md`가 그 기전을 적었다. `preamble.js`의
`GUARD_CONTRACT_DIRECTIVE`를 함께 고친다.

- **즉시 종료** 항목에서 `git -c core.hooksPath=…`를 무조건 금지 목록에서 빼고, 1회성 재배치
  중 **뒤따르는 명령이 §1의 열거에 없는 것**으로 다시 쓴다. `git config core.hooksPath <값>`
  계열은 이 항목에 그대로 남는다 — 열거의 `config`은 재배치 shape만 면제하며, config **쓰기**
  금지는 별도 항목으로 계속 고지된다.
- **허용됨** 절에 한 줄을 더한다: §1의 열거에 든 git 명령 하나에만 붙는 1회성 재배치는
  위반이 아니다 — **다만 붙일 이유도 없다.** 그 명령들은 pre-push를 타지 않는다.
- `GIT_CONFIG_…=… go test` 오답/정답 쌍은 그대로 둔다. 여전히 kill이다.

## Test scope

RED → GREEN을 적용할 seam은 아래로 한정한다. 모두 기존 파일이다.

| seam | 파일 | 검증 대상 |
| --- | --- | --- |
| `-c` 1회성 면제 | `command-guard.test.js` | 열거 10종 통과, 목록 밖(`commit`·`push`·`submodule`·`diff`·`log`) kill, 서브커맨드 없음 kill |
| env 접두 1회성 면제 | `command-guard.test.js` | `GIT_CONFIG_KEY_0=core.hooksPath … git status` 통과, `… go test ./...` kill, 명령 없는 할당 kill |
| 재배치 순수성 (b) | `command-guard.test.js` | `-c core.hooksPath=X -c diff.external=… status` kill, `GIT_CONFIG_KEY_0=diff.external … git status` kill |
| 재배치 순수성 (c) | `command-guard.test.js` | `GIT_EXTERNAL_DIFF=… GIT_CONFIG_…=… git status` kill |
| `cat-file` 옵션 | `command-guard.test.js` | 맨 `cat-file` 통과, `--filters`/`--textconv` kill |
| arm 합성 | `command-guard.test.js` | `-c … config core.hooksPath <값>` kill, `-c … config --get core.hooksPath` 통과 |
| 계약 문구 | `preamble.test.js` | 바뀐 고지를 고정 |

**회귀 고정과 대조군** — 완화가 진짜 우회까지 놓치지 않는다는 것을 대조군이 맡는다.

1. **회귀**: `git add … && git -c core.hooksPath=.git/hooks status --short` (관측 원문)
   → 현재 kill, 변경 후 **무위반**.
2. **대조군 A**: `git -c core.hooksPath=/dev/null push origin UI-1` → 양쪽 모두 **kill**
   (기존 테스트 `command-guard.test.js:920`).
3. **대조군 B**: `git config --global core.hooksPath /tmp/empty-hooks` → 양쪽 모두 **kill**.
4. **대조군 C**: `GIT_CONFIG_KEY_0=core.hooksPath GIT_CONFIG_VALUE_0=/tmp/x git push origin UI-1`
   → 양쪽 모두 **kill**.
5. **대조군 D — child-push 반례, `-c` shape**: `git -c core.hooksPath=/dev/null
   -c diff.external='sh -c "git push origin HEAD:main"' diff` → 양쪽 모두 **kill**.
6. **대조군 E — child-push 반례, env shape**: `GIT_CONFIG_COUNT=1
   GIT_CONFIG_KEY_0=diff.external GIT_CONFIG_VALUE_0='sh -c "git push origin HEAD:main"'
   git status` → 양쪽 모두 **kill**.
7. **폴백 불변**: 토큰화 실패 입력은 면제 없이 kill → 양쪽 모두 **kill**. 변경 전에도
   `HOOK_BYPASS_STRICT_RE`가 통과시키므로 RED가 아니다 — seam이 아니라 대조군이다.

5·6이 이 스펙의 blocking 리뷰 지적을 고정하는 자리다: 열거 안의 서브커맨드라도 같은 명령이
헬퍼 채널을 열면 kill이어야 한다.

## 검증

`npm run all` (= `lint` → `tsc` → `test` → `prettier:check`)이 green이어야 한다.
프런트엔드 소스를 건드리지 않으므로 번들 재생성은 대상이 아니다.

이 저장소에는 CI 워크플로가 없고 머지 자격 판정이 checks를 보지 않는다(`AGENTS.md`).
`gh pr checks`를 기다리지 않는다.

## 배포 처분

`repo-ops/config.toml`이 `[deploy]`(`repo-ops/script/deploy`)를 선언하고 있으므로 머지 후
배포는 자동 경로가 소유한다. UI-1xcd 때 `worker-ineligible`을 붙였던 이유(선언 부재)는
해소됐고, 이 Bead는 그 라벨을 붙이지 않는다.

이 변경은 서버 측 워커 코드이므로 재시작 없이는 실 서비스에 반영되지 않는다. 배포 operation이
terminal success에 도달하고 프로세스 경로·포트·HTTP 응답 검증까지 통과한 뒤에 완료를
선언한다.

## 잔여 위험

1. **저장소에 이미 설정된 프로그램 실행은 닫지 못한다.** §1.1의 (b)·(c)는 **같은 명령이 여는**
   헬퍼 채널을 닫고, 열거 제외는 **본래 동작이 헬퍼를 실행하는** 서브커맨드를 닫는다. 남는
   것은 저장소 설정에 이미 들어 있는 프로그램이다 — `core.fsmonitor`가 가리키는 프로그램이
   `git status` 중에 돌고, 그 자식이 재배치를 상속한다. 이 경로는 이 변경이 만드는 것이
   아니라 그 설정을 쓴 행위가 만드는 것이고, `core.hooksPath` 아닌 키의 `git config` 쓰기는
   이 가드가 애초에 관할한다고 주장한 적이 없다. 경계를 여기 명시해 둔다. UI-1xcd 잔여 위험
   2("훅 무력화는 여전히 클라이언트 측 방어다. 우회 불가능한 방어는 GitHub 브랜치 보호뿐이다")를
   그대로 승계한다.
   **위험한 config 키의 2차 열거는 만들지 않는다** — 그 목록은 git이 키를 추가할 때마다
   드리프트한다. (b)가 반대 방향(`core.hooksPath`만 허용)인 이유가 그것이다.
2. **열거는 사람이 관리한다.** git이 새 읽기 서브커맨드를 추가하거나 세션이 목록 밖 읽기
   명령을 쓰면 오탐이 다시 난다. `diff`·`log`·`show`·`blame`·`grep`이 목록 밖이므로 그
   빈도는 낮지 않다. 증상은 과잉 차단(fail-closed)이지 미탐이 아니며, 같은 성질의 위험을
   UI-1xcd 잔여 위험 5가 이미 안고 있다. 열거를 넓힐 때의 기준은 §1의 네 조건 —
   특히 (d)의 "설정으로 외부 프로그램을 실행하는 경로를 열지 않는다" — 이고, 그 판단은 이
   스펙을 갱신해서 한다.
3. **폴백이 파싱 경로보다 엄격하다.** §4의 의도된 비대칭이다. 토큰화가 실패하는 복잡한 한
   줄에 무해한 1회성 재배치가 섞이면 여전히 kill이 난다. 관측되면 폴백 정규식이 아니라
   토큰화 실패의 원인을 먼저 본다 — 면제를 폴백으로 내리는 것은 UI-1xcd가 금지한 방향이다.
4. **가드는 세션이 명령을 쓰는 이유를 고치지 못한다.** 이번 세션은 필요도 없는 재배치를
   붙였다. §5의 고지가 그 동기를 줄이는 유일한 층이고, 고지는 자문이다. 같은 형태가 다시
   관측되면 그때는 가드가 아니라 프롬프트 계층의 문제로 다룬다.
