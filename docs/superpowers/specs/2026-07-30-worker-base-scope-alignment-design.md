# 워커 base 적용 범위 정합 — 선언 읽기·PR base 주입·머지 게이트 검증·가드 주어 교정

- Bead: `UI-lhwp`
- route: `spec_backed`
- 선행: dotfiles `dotfiles-28dy` (closed, PR #331) — 선언 스키마와 `## Target base` 해석 규칙이 거기서 확정됐다. `external:dotfiles:repo-base-declaration` 엣지 해소 확인.

## 왜

`target_base` 가 워크트리 cut base 와 admission 기준만 지배하고 **PR 생성·머지는 지배하지 않는다.** beads-ui 에는 `gh pr create` 가 없고(`server/worker/gh.js` 는 list·view·checks·merge·update-branch·close 만 수행) PR 은 워커 세션이 만드는데, 프리앰블(`runner/preamble.js`)에는 base 정보가 한 글자도 없다. 머지는 GitHub 이 보고한 `base_ref` 를 그대로 따른다.

결과: 세션이 `--base` 없이 PR 을 열면 GitHub 기본 브랜치로 열리고, 머지 클릭이 그대로 그쪽에 스쿼시 머지한다. base 가 `main` 이 아닌 repo(TRACE-ICI = `ilsun/dev`)에서 브랜치는 `ilsun/dev` 에서 잘렸는데 PR base 는 `main` 이 되어, 머지하면 커밋 전체가 `main` 에 들어간다.

그리고 base 판정 주어가 세 곳에서 어긋나 있다.

- `attach.js:91` `configTargetBase()` 는 repo 선언이 아니라 전역 `~/.config/bdui/config.toml` 의 `[worker.target_base]` 맵을 읽는다.
- `attach.js:230-234` 는 bead `metadata.target_base` 를 그 위에 우선 적용한다 — 설계 스펙도 사용처도 없는 층이다.
- `runner/command-guard.js:158` `BASE_REF_RE = /(^|\/)(main|master)$/` 는 push refspec 의 **목적지 이름만** 판정하고 어느 저장소인지는 보지 않는다.

마지막 항목은 실측 사고다. `Cortex-j3v` 워커 세션이 2일 연속 2회 같은 지점에서 죽었다.

| 시각 (UTC) | 명령 | 결과 |
| --- | --- | --- |
| 2026-07-29 07:15:30 | `H="$HOME/…/Hippocampus"; cd "$H" && git push origin main` | `merge_to_base_blocked` → 세션 종료 |
| 2026-07-30 03:36:40 | `cd ~/GitHub/thalamus && git push origin main` | 동일 |

세션 `dcf29e1d-d2e9-4fec-9afd-1f1a60860d75` 전사. 둘 다 Cortex Bead 가 다른 저장소로 하는 **정상 발행**이었다.

## 무엇을

### §1 선언 읽기

`attach.js` 의 `configTargetBase(workspace_root)` 를 대상 repo 의 `docs/agents/repo-ops.toml` 최상위 `base` 키 읽기로 교체한다. 해석 우선순위는 **repo 선언 > `main`** 이며 그 사이에 아무것도 두지 않는다.

파서는 신규 도입이 아니다 — `smol-toml` 이 이미 `package.json:41` 의 의존성이고 `server/config.js:5` 가 `parse as parseToml` 로 쓰고 있다. 같은 것을 재사용한다.

**검증 범위 — 5단계 전부를 공용 해석기가 수행한다.**

`resolveTargetBase(repo)` 하나를 신설하고 base 를 읽는 모든 소비자(워크트리 cut·admission·프리앰블 주입·머지 게이트·머지 후 sync)가 그것을 쓴다. 5단계는 dotfiles 계약 `## Target base` 의 것을 그대로 구현한다 — 1 대상 repo, 2 `git check-ref-format --branch`, 2b repo 의 `git remote` 목록과 대조해 접두어 거부, 4 upstream remote 결정, 5 `git fetch --no-tags <remote> <base>` 후 `refs/remotes/<remote>/<base>^{commit}` 존재 검증.

**4~5단계를 사용 시점에 위임할 수 없다 — 위임할 대상이 없기 때문이다(실측).**

- `worktree.js` 의 `add` 는 `git worktree add -B <branch> <wt> <base>` 만 실행하고 **fetch 하지 않는다.** stale 한 로컬 `<base>` 로 그대로 워크트리를 만든다.
- `admission.js` 는 `git rev-parse --verify --quiet <base>^{commit}` 로 **로컬 ref 만** 확인한다.
- external PR 머지 게이트(§5)는 워크트리를 아예 거치지 않는다.

즉 어느 소비자도 fetch 에 도달하지 않으므로, 해석기가 직접 하지 않으면 stale 로컬 ref 와 원격 부재가 영원히 검증되지 않는다.

**파싱 실패·형식 위반·remote 접두어·remote 결정 실패·ref 부재는 전부 폴백 없는 실패로 처리한다.** 선언 없음(파일 부재 또는 키 부재)만 `main` 이고, 오타를 `main` 으로 삼키면 이 작업이 고치려는 사고가 그대로 재발한다.

**4단계에 대한 명시** — "설정된 upstream 없음"과 "설정됐지만 그 remote 가 없음"은 다른 사건이다. 전자만 단일 remote 규칙으로 내려가고, 후자는 깨진 선언이므로 `remote` 실패다. 둘을 합치면 4단계 실패를 조용히 삼킨다(구현 게이트 2026-07-30).

**계약 5단계에 더하는 fail-closed 검사 1건** — 해석된 base 가 셸 메타문자를 품으면 거부한다. `check-ref-format` 은 `;`·`$`·backtick·`&`·`|`·`(`·`)`·`<`·`>`·인용부호·`!`·`#`·`{`·`}` 를 유효한 브랜치명으로 허용하는데, §4 가 그 값을 세션이 실행할 `gh pr create --base <base>` 지시문에 보간한다. 허용 문자는 `[A-Za-z0-9._/-]` 로 제한한다. 이 검사는 계약이 통과시키는 것을 추가로 거부할 뿐, 계약이 거부하는 것을 통과시키지 않는다.

### §2 bead 단위 층 제거

`attach.js:230-234` 의 `metadata.target_base` 우선 처리를 삭제한다. 설계 스펙이 없고 사용처도 없으며, 같은 값을 쓸 수 있는 곳을 둘로 만들어 SoT 를 중복시킨다. 삭제 후 base 의 출처는 repo 선언 하나다.

### §3 `[worker.target_base]` 은퇴

`server/config.js` 의 `normalizeWorkerTargetBase` 경로와 `~/.config/bdui/config.toml` 의 해당 항목을 제거한다.

**선행이 있다 — §7 의 enclosed 단위가 먼저 착지해야 한다.** 현재 TRACE-ICI 워커 admission 을 뚫어주는 유일한 수단이 이 임시 항목이고(실측: TRACE-ICI 에 `docs/agents/repo-ops.toml` 없음, 체크아웃 브랜치 `ilsun/dev`), 선언보다 먼저 은퇴시키면 base 가 `main` 으로 폴백해 `spec_missing_at_base:main` 거부가 되돌아온다.

### §4 PR base 주입

`applyPreamble`(`runner/preamble.js`)에 해석된 base 를 실어, 세션이 `gh pr create --base <target_base>` 로 열게 한다. 프롬프트는 계약 고지이고 강제는 별도 층이라는 이 repo 의 기존 구조(`preamble.js:7-9`)를 따른다 — 강제는 §5 가 맡는다.

### §5 머지 게이트 검증

머지 직전에 PR 의 `baseRefName` 을 해석된 `target_base` 와 대조하고, 불일치면 **fail-closed** 로 멈춘다. 자동 재타겟은 하지 않는다 — base 변경은 diff 범위와 리뷰 대상을 바꾸므로 사람 판단이다.

**external PR 에도 적용한다.** 이것이 이 스펙에서 확정하는 범위 결정이며, 근거는 실패 모드의 분포다.

- 워커 attempt PR 은 브랜치를 이미 pin 된 base 에서 잘랐으므로 불일치가 드물다.
- **external PR(`external-pr.js` — 일반 세션이 워커 스케줄러를 거치지 않고 만든 PR)이 바로 원래 버그가 사는 곳이다.** 인터랙티브 세션이 `--base` 없이 `gh pr create` 를 하면 GitHub 기본 브랜치로 열린다. external 을 제외하면 주된 실패 모드가 그대로 열려 있다.

**대조의 두 피연산자를 분리하는 것이 이 절의 핵심이다.** `pr-actions.js` 의 `targetBaseFor(q, bead_id, hint)` 체인은 `attempt.target_base > hint > 관측된 PR 의 base_ref > 'main'` 인데, **`hint` 자체가 관측값이다** — 그 함수의 문서가 `@param {string|null} [hint] - base_ref as the click-time gate observed it` 라고 명시한다(실측). external PR 은 attempt 가 없어 `hint` 로 떨어지므로, 체인의 마지막 두 항만 교체하면 **여전히 관측값을 관측값과 비교하는 공허한 대조**가 남는다.

그래서 이렇게 고정한다.

| 피연산자 | 출처 |
| --- | --- |
| **기대 base** | 유효한 worker attempt 의 `attempt.target_base`, **또는** §1 의 `resolveTargetBase(repo)`. 이 둘뿐이다 |
| **실제 base** | PR 의 `baseRefName`(관측). `hint` 와 관측 `base_ref` 는 **여기에만** 쓴다 |

`hint` 는 기대값 체인에서 완전히 제거한다. 하드코딩 `'main'` 종단도 제거한다 — 해석 실패는 `main` 폴백이 아니라 fail-closed 다.

**해석은 이 시점에 강제 재수행한다**(구현 게이트 2026-07-30). 머지는 되돌릴 수 없으므로 기대 base 를 스캔 경로용 단기 메모에서 읽으면 안 된다 — 마지막 스캔 이후 선언이 바뀌었을 때 낡은 기대값과 대조하게 된다.

회귀 위험은 낮다: 선언이 없는 repo 는 §1 해석이 `main` 을 돌려주므로 오늘과 동일하게 동작한다. 위험은 `target_base` 를 갖지 않는 legacy attempt 인데, 그 경우도 §1 해석으로 떨어지므로 기대값이 관측값이 되는 일은 없다.

### §6 가드 주어 교정

`runner/command-guard.js` 의 base-landing 판정 주어를 **"이 attempt 가 맡은 저장소의 base"** 로 바꾼다. 두 층을 함께 고친다 — argv 스캔 경로(`:758`)와 파싱 실패 시 쓰이는 fallback 정규식(`:27` `BASE_LANDING_RE`) 둘 다이며, 한쪽만 고치면 다른 쪽이 그대로 죽인다.

**판정 규칙은 넓은 예외가 아니라 좁은 allowlist 다. 기본값은 오늘과 같은 fail-closed 이며, 증명된 경우에만 면제한다.**

면제 조건은 네 가지를 **모두** 만족할 때뿐이다.

1. 디렉터리 이동이 `git push` 와 **같은 셸 스코프**에 있다 — 서브셸 `( … )` 안의 이동은 push 에 미치지 않으므로 면제가 아니다.
2. 이동이 실행 경로상 push 를 **지배**한다. 세 부분으로 나뉘며 각각 별개의 우회로를 막는다(뒤의 둘은 구현 게이트 2026-07-30 에서 추가됐다).

   - **이동 자신이 무조건 실행된다** — 이동의 선행 연산자가 `;`·개행·스코프 시작일 때만 성립한다. 이동 **앞**에 오는 리터럴 대입(`H="/abs/path"; cd "$H" && git push …`)은 항상 실행되므로 이 관계를 깨지 않는다. 반대로 `true || cd /foreign && git push origin main` 은 `||` 가 단축평가로 이동을 건너뛰고도 `&&` 가 push 에 도달한다 — 이동과 push 사이의 연산자는 이동이 실행됐는지에 대해 아무 말도 하지 않는다.
   - **이동이 부정되지 않았다** — `! cd /missing && git push origin main` 은 이동이 **실패했을 때** 정확히 push 를 실행한다.
   - **이동부터 push 까지 최상위 `&&` 로 이어지고, 그 사이에 셸의 cwd 를 바꿀 수 있는 명령이 없다** — `;`·`||`·`|`·조건절이 끼면 면제가 아니다. 그리고 `cd`·`pushd`·`popd`·`eval`·`source`·`.` 가 끼면 이동은 낡은 전제가 된다(`cd /tmp && eval 'cd <repo>' && git push origin main`). 자식 프로세스는 부모의 cwd 를 바꿀 수 없으므로 인터프리터(`bash -c '…'`)는 이 목록에 없고, 셸 함수는 정의 자체가 파싱 불가라 이미 fail-closed 다.
3. 이동 대상이 **리터럴로 해석된다** — 리터럴 경로, `~` 확장, **`$HOME`/`${HOME}` 확장**, 또는 같은 셸 스코프에서 **이동 직전에 무조건 실행되는 별도 대입 명령** 하나의 1단계 확장(`H="/abs/path"; cd "$H"`)까지만. 대입의 값 자체도 리터럴·`~`·`$HOME` 조합까지 해석한다(`H="$HOME/…"; cd "$H"`). 그 밖의 확장은 해석하지 않는다.

   대입에 붙는 제약이 세 개이며 각각 **거짓 증명**을 하나씩 막는다.

   - **같은 명령의 선행 대입은 해석하지 않는다**(`H=/abs cd "$H"`). POSIX 2.9.1 이 단순 명령의 단어 확장을 그 명령 자신의 대입보다 **먼저** 수행하므로 그 형태는 실제로 `cd ""` 이 되어 repo 를 떠나지 않는다.
   - **무조건 실행되어야 한다.** 선행 연산자가 `;`·개행·스코프 시작일 때만 성립하고 `&&`·`||` 뒤의 대입은 성립하지 않는다 — `true || H=/foreign; cd "$H" && git push origin main` 은 대입이 건너뛰어져 `$H` 가 이전 값(repo 자신일 수 있다)을 유지하는데, 건너뛴 `/foreign` 을 목적지로 읽으면 진짜 자기 base 랜딩이 면제된다.
   - **이동의 직전 명령이어야 한다.** 사이에 낀 무엇이든 정적으로 볼 수 없는 방식으로 변수를 다시 묶을 수 있어(`eval`·`read`·`export`·source), 그 경우 보이는 대입은 낡은 전제다.

   `$HOME` 을 `~` 와 같은 등급에 두는 이유: 워커 프로세스가 소유하는 결정적 값이고 셸 상태에 의존하지 않으므로, `~` 를 해석하면서 `$HOME` 을 거부하는 것은 같은 경로의 두 표기를 다르게 판정하는 것뿐이다. 2026-07-29 사고 명령이 정확히 그 형태(`H="$HOME/…/Hippocampus"; cd "$H"`)이며, 이 확장 없이는 완료 조건 #8 이 §6 조건 3 과 모순한다. 임의 변수 확장은 여전히 해석하지 않는다.

   **그 등급에 붙는 조건 두 개**(구현 게이트 2026-07-30):

   - **`HOME` 이 재바인딩되지 않았다.** `$HOME`·`~` 는 워커 프로세스의 환경에서 읽는 값이므로 세션이 `HOME` 을 다시 묶으면 무효다 — `HOME=<repo>; cd "$HOME" && git push origin main` 은 워커의 홈으로 해석되어 repo 밖 이동처럼 보이지만 실제로는 repo 안에 머문다. 같은 스코프에서 `HOME` 대입이 한 번이라도 보이면 확장을 거부한다(리터럴 경로 해석은 그대로 유효하다).
   - **인용 출처를 본다.** 셸은 단일 인용 안의 `$HOME` 을 확장하지 않고, 어떤 인용 안에서도 `~` 를 확장하지 않는다. 토크나이저가 인용을 벗기므로, 셸이 수행하지 않는 확장을 해석된 경로로 읽지 않도록 단어별 인용 출처를 보존해 판정한다(`cd '$HOME/x'`·`cd "~/x"` 는 전부 해석 불가).
4. 해석된 경로가 **attempt 가 맡은 repo 밖**이다.

하나라도 증명되지 않으면 **판정한다(=오늘과 동일하게 죽인다).** 이동 토큰의 존재는 면제 사유가 아니다.

이 형태를 고른 이유는 넓은 예외가 우회 가능하기 때문이다. 리뷰에서 지적된 세 반례가 전부 **진짜 자기 base 랜딩**인데 "이동이 선행하면 면제" 규칙에서는 통과한다.

```bash
( cd /foreign ) && git push origin <base>      # 서브셸 → cwd 안 바뀜 → 조건 1 위반
false && cd /foreign; git push origin <base>   # cd 미실행 → 조건 2 위반
f(){ cd /foreign; }; git push origin <base>    # 함수 정의 → 파싱 불가 → fail-closed
```

allowlist 아래에서는 셋 다 죽고, 실측 사고 2건은 조건 1~4 를 만족해 통과한다.

fallback 정규식(`:27`)도 같은 allowlist 를 쓰되, 파싱 불가 입력에서는 조건 1~3 을 증명할 수 없으므로 **사실상 항상 fail-closed** 다. 따라서 두 층의 불변식은 "같은 결론"이 아니라 **"fallback 은 argv 경로보다 결코 더 관대하지 않다"** 이며, 이것이 완료 조건 #10 이 고정하는 것이다. 같은 명령이 파싱 가능하면 면제되고 파싱 불가능하면 죽는 것은 설계대로다 — 안전한 쪽으로만 갈린다.

이 형태를 고른 이유는 cwd 를 텍스트로 확정할 수 **일반적으로** 없기 때문이다. `findMergeViolation(cmd, options)`(`:889`)이 받는 것은 명령 문자열과 `conflict_resolution` 불린뿐이고(`session.js:386`), repo·cwd·base 가 없다. 조건 3 이 열어주는 것은 결정적 표기(리터럴·`~`·`$HOME`·리터럴 단일 대입 1단계)뿐이며, 그 밖의 변수·명령 치환·다단 확장은 셸을 시뮬레이션하지 않는 한 해석 불가다. 그래서 판정은 allowlist 이고 증명 실패는 fail-closed 다.

이 규칙의 효과:

- 실측 사고 2건 모두 통과한다(둘 다 `cd` 가 선행).
- 워크트리 cwd 에서의 `git push origin main`(진짜 자기 base 랜딩)은 여전히 잡힌다. 워크트리 HEAD 는 bead 브랜치이므로 이 형태가 자기 base 를 미는 정상적 방법이다.
- attempt 가 맡은 repo 와 그 repo 의 해석된 base 를 `findMergeViolation` 에 주입해, `main|master` 이름 매칭이 아니라 **선언된 base 와의 일치**로 판정한다. TRACE-ICI 에서 진짜 base 인 `ilsun/dev` push 를 잡고, base 가 아닌 `main` push 는 잡지 않는다.
- **목적지 대조는 정확 일치다**(구현 게이트 2026-07-30): refspec 목적지가 `<base>`·`refs/heads/<base>`·`heads/<base>` 일 때만 base 랜딩이다. 접미사 일치로 두면 base 이름으로 끝나기만 하는 별개 브랜치(base 가 `ilsun/dev` 일 때의 `feature/ilsun/dev`)까지 오탐하는데, 그것은 안전 여유가 아니라 오탐이다.
- fallback 정규식의 경계도 `\b` 가 아니다 — base 는 비단어 문자로 끝날 수 있고(`foo-`) 그때 `\b` 는 매치하지 않아 fallback 이 조용히 통과한다. 이름 **앞**에는 `/` 를 허용해 `refs/heads/<base>` 를 계속 잡고, **뒤**에는 금지해 base `ilsun` 이 브랜치 `ilsun/dev` 를 잡지 않게 한다.

**남는 구멍은 `UI-8mvc` 소유다** — 세션이 명시적으로 자기 repo 루트로 `cd` 한 뒤 base 에 push 하는 경로. 기존 미탐 2건(`INTERPRETERS = {bash,sh,zsh}` 한정, fallback 정규식이 python subprocess 형태를 놓침)과 같은 층위이며 pre-push hook 예방이 닫는다. 2026-07-30 에 그 Bead 노트에 기록했다. **후속 Bead 를 새로 만들지 않는다 — 소유자가 이미 있다.**

### §7 TRACE-ICI 선언 — enclosed 단위

`docs/agents/repo-ops.toml` 에 `base = "ilsun/dev"` 를 TRACE-ICI 에 신설한다. dotfiles `dotfiles-iymy` 가 신설하는 **enclosed 처분**(같은 Bead 안에서 다른 repository 의 해석된 base 에 PR·Bead·워크트리 없이 직접 착지)의 선언이다.

| 항목 | 값 |
| --- | --- |
| 대상 repo | `/Users/isy_macstudio/Documents/GitHub/TRACE-ICI` |
| 해석된 `target_base` | `ilsun/dev` — 그 repo 의 상주 브랜치이자 현재 체크아웃 브랜치(실측). 선언 신설 전이므로 이 커밋 자체가 그 선언이 된다 |
| 소유 경로 | `docs/agents/repo-ops.toml` (신규 1파일) |
| 파일 내용 | 최상위 `base = "ilsun/dev"` 와 주석뿐. `[verify]` 테이블은 **넣지 않는다**(아래) |
| 검증 묶음 | ① `python3 -c "import tomllib,sys; d=tomllib.load(open('docs/agents/repo-ops.toml','rb')); assert d['base']=='ilsun/dev'"` — TOML 파싱과 값 ② `git check-ref-format --branch ilsun/dev` 종료코드 0 ③ `git remote` 목록의 어느 이름으로도 시작하지 않음 ④ `git fetch --no-tags <remote> ilsun/dev && git rev-parse --verify refs/remotes/<remote>/ilsun/dev^{commit}` 성공. 넷 다 실패 시 non-zero |
| 착지 커밋 범위 | `305ea827880417722340b24569cffc2ecb2e2686..aa52b731809ca4407f38f5da3f87940b52af7649` (실측, 2026-07-30 착지·발행). 단일 커밋 `aa52b731` — `docs/agents/repo-ops.toml` 1파일 13줄 추가 |
| split 하지 않은 이유 | 파일 1개, 실질 내용은 최상위 `base` 선언 한 줄과 출처 주석뿐이라 quick_fix 5 hard criteria 를 전부 통과한다. 별도 Bead·spec·PR·verify 를 세우는 비용이 작업 자체보다 크다 |

**검증에 `dotfiles` 의 `scripts/repo_ops_check.py` 를 쓰지 않는다.** 실측으로 그 도구는 이 용도에 맞지 않는다 — `:330` 이 `return 0  # warn-only` 로 위반에도 항상 0 을 돌려주어 게이트가 될 수 없고, `parse_declaration` 이 `[verify]` 테이블을 **필수로 요구**한다(`:150-152` `SchemaError("[verify] 테이블이 없다")`). 그 스크립트는 이름 그대로 *verify 선언 드리프트* 체커이지 base 선언 검증기가 아니다.

그래서 TRACE-ICI 파일에는 `[verify]` 를 넣지 않는다. 계약상 `base` 는 최상위 키이고 `[verify]` 는 별개 층이며, beads-ui 가 읽는 것은 `base` 하나다. TRACE-ICI 의 verify 명령을 여기서 발명하지 않는다 — 그건 그 repo 의 온보딩 사안이다.

**잔여로 기록**: `repo_ops_check.py` 가 `base`-only 선언을 스키마 위반으로 보는 것은 dotfiles 계약(`base` 최상위, `[verify]` 별개 층)과 어긋난다. 이 Bead 의 범위가 아니며 dotfiles 쪽에서 판단할 관측이다.

**커밋돼야 한다 — ignore 는 성립하지 않는다.** `git worktree add` 는 ignored 파일을 복사하지 않으므로, gitignore 된 선언은 워커 워크트리에 도달하지 않는다. TRACE-ICI 는 동료와 공유하는 GitHub repo 이며 이 커밋이 상대에게 보이는 것은 사용자 승인 사항이다(2026-07-30).

**배포 통지 대상 아님**: TRACE-ICI 에 repo-root `deploy.json` 이 없다.

**실행 순서**: §7 착지 → 발행(fetch → ff-only → push → `ahead == 0`) → 그 다음에 §3 은퇴.

§3 은 두 개의 서로 다른 시점을 갖는다. **코드 제거(`normalizeWorkerTargetBase` 경로)는 구현 시점**이지만, **`~/.config/bdui/config.toml` 항목 제거는 새 코드가 실제로 도는 것을 확인한 뒤**다 — 구 코드가 아직 도는 동안 항목을 지우면 TRACE-ICI base 가 `main` 으로 폴백해 지금 막고 있는 거부가 되돌아온다. 재시작이 stale 체크아웃을 가리켜도 같은 결과다.

순서를 이렇게 고정한다.

1. §7 TRACE-ICI 선언 착지 + 발행(`ahead == 0`)
2. beads-ui 코드 변경 머지
3. **머지된 체크아웃에서** 서비스 재시작
4. **런타임 실측** — `projectmgr status` 가 `running`, 실행 경로가 머지된 체크아웃, bind host/port 와 HTTP 응답 정상, 그리고 TRACE-ICI 의 해석된 base 가 `ilsun/dev` 로 나오는 것
5. `~/.config/bdui/config.toml` 의 `[worker.target_base]` 항목 제거 + readback
6. 5 이후 런타임 재확인

4 를 건너뛰고 5 로 가면 이 절이 막으려는 실패가 그대로 일어난다.

### §8 프리앰블 base push 가드 고지

`GUARD_CONTRACT_DIRECTIVE`(`runner/preamble.js:61`)가 `git merge` 금지만 고지하고 base push 가드는 고지하지 않는다. 세션이 자기가 밟을 지뢰를 모르는 상태다 — 2026-07-29 attempt 가 그 상태에서 죽었다. §4 가 이미 같은 파일에서 base 를 주입하므로 함께 처리한다. (원래 `UI-8mvc` 항목이었고 선행이 필요 없어 이 Bead 로 이동됐다)

## 완료 조건

| # | 조건 | 확인 방법 |
| --- | --- | --- |
| 1 | 선언 있는 repo 의 base 가 선언대로 해석된다 | TRACE-ICI 선언 착지 후 워커 attach 경로가 `ilsun/dev` 를 반환하는 것을 단위 테스트로 고정 |
| 2 | 선언 없는 repo 는 `main` 으로 동작한다(무회귀) | dotfiles·beads-ui 로 기존 동작 유지 확인 |
| 3 | 잘못된 선언이 폴백 없이 실패한다 | 5단계 각각의 실패 케이스 테스트 — 형식 위반(`ilsun..dev`)·remote 접두어(`origin/main`)·TOML 파싱 실패·remote 결정 실패·**형식은 맞지만 존재하지 않는 원격 브랜치(`ilsun/dv`)**·**stale 로컬 ref**. 마지막 둘이 §1 이 4~5단계를 해석기로 끌어온 이유이므로 반드시 포함한다 |
| 4 | bead `metadata.target_base` 층이 사라졌다 | `rg -n 'metadata\.target_base\|md\.target_base' server/` 0건 |
| 5 | `[worker.target_base]` 가 사라졌다 | `rg -n 'worker_target_base\|worker\.target_base' server/` 0건, `~/.config/bdui/config.toml` 에서 항목 제거 |
| 6 | 프리앰블이 base 와 push 가드를 고지한다 | 생성된 프리앰블 문자열에 `--base <target_base>` 와 가드 고지가 포함되는 테스트 |
| 7 | 머지 게이트가 `baseRefName` 불일치를 fail-closed 로 막는다 | worker attempt PR · external PR · `target_base` 없는 legacy attempt 3케이스 테스트. 기대값이 관측값과 같아지는 경로가 없음을 각 케이스가 보인다 |
| 8 | 가드가 실측 사고 명령 2건을 통과시킨다 | `command-guard.test.js` 에 두 명령을 그대로 케이스로 추가 |
| 9 | 가드가 자기 base 랜딩을 여전히 잡는다 | 워크트리 cwd 에서의 `git push origin <base>` 에 더해 **allowlist 반례 3종** — `( cd /foreign ) && git push origin <base>` · `false && cd /foreign; git push origin <base>` · `f(){ cd /foreign; }; git push origin <base>` — 이 전부 violation |
| 10 | argv 경로와 fallback 정규식이 같은 판정을 한다 | 위 5케이스를 파싱 불가 형태(따옴표 불균형)로도 넣어 결과가 일치. fallback 은 증명 불가라 전부 violation 이어야 한다 |
| 11 | TRACE-ICI 선언이 착지·발행됐다 | TRACE-ICI 에서 `git log -1 -- docs/agents/repo-ops.toml` 로 **실제 SHA 확인**, `ahead == 0`, 그리고 §7 표의 착지 커밋 범위가 실값으로 채워짐 |
| 12 | 정본 검증 묶음 green | `npm run all` (= `lint && tsc && test && prettier:check`). `npm test` 하나로는 부족하다 |
| 13 | 배포 후 런타임이 새 코드로 돈다 | §3 순서 4단계 — `projectmgr status` `running`, 실행 경로가 머지된 체크아웃, HTTP 응답 정상, TRACE-ICI 해석 base 가 `ilsun/dev` |
| 14 | config 항목 제거가 런타임 확인 뒤에 일어났다 | §3 순서 5~6단계의 readback 과 재확인 기록 |
| 15 | enclosed 커밋 범위가 implementation 게이트 대상에 포함됐다 | 게이트 디스패치 패킷이 beads-ui 통합 diff 와 TRACE-ICI 착지 범위를 **둘 다** 지목 |

## 비목표

- **가드 강제층을 옮기지 않는다.** pre-push hook 예방과 `base_oid` 사후 ref 불변식, 텍스트 가드 kill→경고 강등은 `UI-8mvc` 소유다. 이 Bead 는 기존 텍스트 층의 **주어만** 고친다.
- **beads-ui 를 multi-repo 로 만들지 않는다.** `(repo, bead_id)` 워크트리 단수 전제와 `verify.js` 의 동일 `--repo` strict-parse 는 그대로 둔다.
- **`gh pr create` 를 beads-ui 에 도입하지 않는다.** PR 생성은 세션이 계속 맡고, 이 Bead 는 base 를 프리앰블로 전달할 뿐이다.
- **자동 재타겟 없음.** `baseRefName` 불일치는 보고하고 멈춘다.
- **TRACE-ICI 의 다른 무엇도 건드리지 않는다.** enclosed 소유 경로는 `docs/agents/repo-ops.toml` 하나다.

## 잔여

- **`UI-8mvc` 로 넘어가는 구멍**: 자기 repo 루트로 명시적 `cd` 후의 base push. 후속 Bead 를 새로 만들지 않으며 그 Bead 노트에 기록됐다.
- **`UI-8mvc` 전제 정정**: dotfiles `dotfiles-iymy` 는 cross-repo push 를 없애지 않는다 — enclosed 처분이 그것을 허용된 레인으로 만들므로 오탐 동기는 유효하고 상시화된다. 2026-07-30 에 그 Bead 노트에 기록됐다.
- **`UI-8mvc` 는 이 Bead 에 `blocks` 로 연결돼 있고 같은 파일(`command-guard.js`·`preamble.js`)을 건드린다.** 병렬 실행 금지.
