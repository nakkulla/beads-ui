# 가드 강제층 교체 — 텍스트 판정에서 git 수준 예방 + 사후 ref 불변식으로

- Bead: `UI-8mvc`
- route: `spec_backed`
- 선행: `UI-lhwp` (closed, PR #78) — 가드 주어를 `(repo, target_base)` 쌍으로 교정하고 `resolveTargetBase` 공용 해석기를 신설했다. 이 Bead 는 그 위에서 **강제 층 자체를 옮긴다.**

## 왜

강제가 한 층에 몰려 있고, 그 층은 자기가 볼 수 없는 것을 판정한다.

`runner/command-guard.js` 는 세션이 실행한 **명령 문자열 하나**만 받는다(`runner/session.js:396`). cwd 도 remote 도 없다. 그런데 정책이 말하려는 것은 "이 attempt 가 맡은 저장소의 base ref 를 세션이 직접 움직이지 못한다"이다. 주어가 저장소에서 브랜치 이름으로 바뀌어 있으니, 이름만 같으면 남의 저장소도 걸리고, 이름이 안 보이면 자기 저장소도 통과한다.

`UI-lhwp` 가 주어를 `(repo, target_base)` 로 교정하고 좁은 allowlist 를 도입했지만, **판정 층위는 그대로다.** 텍스트에서 cwd 를 정적으로 증명하는 구조라 증명이 안 되는 입력은 전부 fail-closed 이고, 그 오판의 비용은 세션 전체 SIGTERM 이다(실측: `Cortex-j3v` 21분·$11 손실).

남은 미탐 3건은 전부 같은 층위의 구멍이다.

| # | 구멍 | 근거 |
| --- | --- | --- |
| 1 | `INTERPRETERS = {bash, sh, zsh}` 밖의 실행 경로는 argv 스캔 대상이 아니다 | `runner/command-guard.js` `INTERPRETERS` |
| 2 | fallback 정규식이 python subprocess 형태(`subprocess.run(['git','push',…])`)를 놓친다 | `runner/command-guard.js:41` `BASE_LANDING_RE` |
| 3 | 명시적으로 자기 repo 루트로 `cd` 한 뒤 자기 base 로 push 하는 경로가 열려 있다 | `UI-lhwp` 가 채택한 allowlist 조건 — 이동이 push 를 지배하면 판정 대상에서 빠진다 |

스펙 이력이 그 궤적이다: `2026-07-27-merge-guard-subcommand-false-positive` → `2026-07-27-worker-merge-guard-argv-design` → `2026-07-30-worker-base-scope-alignment`. 세 번 다 같은 층위의 패치였고, 이 층위에서는 정밀도가 수렴하지 않는다.

### 실측 (2026-07-30, 임시 repo)

설계 판단의 근거는 전부 재현으로 확인했다.

| 관측 | 방법 | 결과 |
| --- | --- | --- |
| 워크트리 전용 `core.hooksPath` 격리 | `extensions.worktreeConfig=true` + `git -C <wt> config --worktree core.hooksPath <dir>` | 워크트리 push 만 hook 실행, main checkout push 는 hook 없이 통과 |
| hook 의 판정 입력 | pre-push hook stdin | `<local_ref> <local_oid> <remote_ref> <remote_oid>` — 목적지가 명령 모양과 무관하게 확정됨 |
| **`--no-verify` 우회** | `git push --no-verify origin HEAD:main` | **hook 미실행, remote `main` 이 실제로 이동함** |
| env 주입 방식 | `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath GIT_CONFIG_VALUE_0=<dir>` | 동작하며, **모든 저장소에 적용된다** — 전혀 다른 repo 의 push 도 같은 hook 을 탐 |

`--no-verify` 우회가 실증됐다는 것이 예방 층 하나로 끝낼 수 없는 이유이고, env 주입이 전역이라는 것이 hook 안에서 repo 를 판정해야 하는 이유다.

### 발견 — disposition 세션은 현재 자기 본업을 수행할 수 없다

`revise-disposition.js:62` 는 REVISE-disposition 세션에게 "수정은 resolved target_base 체크아웃에서 하고 거기서 커밋·퍼블리시한다(fetch, ff-only 동기화, push, ahead == 0)"를 지시한다. **base 로 직접 push 하는 것이 그 세션의 본업이다.**

그런데 `runner/session.js:399-401` 이 가드에 넘기는 예외는 `conflict_resolution` 하나뿐이고 `settings.disposition`(`scheduler.js:2270` 에서 이미 설정됨)은 가드가 보지 않는다. cwd 가 repo 루트라 이동이 없어 allowlist 도 걸리지 않는다. 코드상 disposition 세션은 본업을 실행하는 순간 SIGTERM 당한다.

이 Bead 가 만든 문제는 아니지만, 세 층을 설계하면서 같은 함정을 반복할 수는 없다. §4 의 강등이 이 결함을 부수적으로 해소하고, §2·§3 은 처음부터 disposition 을 제외한다.

## 무엇을

### §1 세 층의 분업

| 층 | 무엇을 보는가 | 정확도 | 우회 |
| --- | --- | --- | --- |
| **예방** — pre-push hook (§2) | git 이 계산한 목적지 ref | 정확 (명령 모양 무관) | `--no-verify`, `-c core.hooksPath=` |
| **차단** — 텍스트 가드 재배치 (§4) | argv 위치의 hook 무력화 플래그, `gh pr merge` | 정확 (플래그·서브커맨드는 텍스트로 확정) | — |
| **검출** — 사후 base 불변식 (§3) | 원격 base tip 과 attempt 브랜치의 도달 관계 | 사후이며, PR 경유 랜딩을 배제해야 오탐이 없고 브랜치 밖 커밋에는 미탐이 남는다 | — |

예방 층의 판정 주어는 **저장소 자신**이다. hook 은 그 push 가 실제로 어느 ref 로 가는지를 git 에게서 받으므로, "명령 문자열에서 cwd 를 추정한다"는 문제가 성립하지 않는다. 남의 저장소로 향하는 push 는 hook 이 스스로 자기 repo 가 아님을 확인하고 통과시킨다 — 오탐이 줄어드는 게 아니라 판정 대상이 아니게 된다.

**위협 모델.** 이 설계가 막는 것은 *규칙을 모르거나 실수로 base 를 밟는 세션*이지 *우회 의지가 있는 세션*이 아니다. 클라이언트 측 hook 은 원리상 `--no-verify` 로 뚫리고 hook 스크립트 자체도 세션이 파일로 접근할 수 있다. 우회 불가능한 방어는 GitHub 브랜치 보호(서버 측)뿐이며 이 저장소 코드 범위 밖이다(§5 잔여 위험 4).

### §2 예방 층 — pre-push hook

**자산 위치**: `$XDG_STATE_HOME/bdui/<slug>/guard-hooks/<attempt_id>/pre-push`. `state-paths.js` 에 경로 함수를 추가하고 기존 per-workspace 상태 디렉터리 관용구를 따른다.

attempt 별 디렉터리인 이유는 `(repo, target_base)` 를 **스크립트에 리터럴로 박아 넣기** 위해서다. 환경변수로 전달하면 세션이 변수만 덮어써도 판정이 무너진다. 동시 실행 attempt 간 간섭도 없어진다.

**배선**(자산 생성과 별개다 — 아래 "설치 시점"은 디렉터리·스크립트를 만드는 행위를 가리키고, 여기는 이미 만들어진 경로를 세션에 전달하는 행위다. 전달은 상태를 만들지 않으므로 `launchSession` 안에서 해도 무방하다): `scheduler.js` 의 `launchSession` 에서 `settings.env` 에 세 키를 싣는다.

```
GIT_CONFIG_COUNT=<n+1>
GIT_CONFIG_KEY_<n>=core.hooksPath
GIT_CONFIG_VALUE_<n>=<guard-hooks/<attempt_id> 절대 경로>
```

`runner/session.js:291` 이 `{ ...process.env, ...(settings?.env || {}), ...(env || {}) }` 로 병합하고, `claude.js` 의 `routing_env` 는 이 키들을 쓰지 않으므로 충돌이 없다. 상속된 `GIT_CONFIG_COUNT` 가 이미 있으면 덮어쓰지 않고 그다음 인덱스(`n`)에 이어 붙인다.

워크트리 config 방식(`extensions.worktreeConfig`)이 아니라 env 방식을 택한 이유는 두 가지다. ① 미탐 #3(자기 repo main checkout 으로 `cd` 후 push)은 워크트리 한정 hook 으로 닫히지 않는다 — env 는 프로세스 전체에 적용되므로 어느 디렉터리에서 실행하든 hook 을 탄다. ② 대상 repo 의 공유 config 를 영구적으로 바꾸지 않는다.

**hook 의 판정 두 단계** (`/bin/sh`, 실행 권한 필요):

1. **자기 repo 인가** — `git rev-parse --path-format=absolute --git-common-dir` 를 절대 경로로 정규화해 스크립트에 박힌 attempt repo 의 값과 비교한다. 워크트리든 main checkout 이든 같은 값이 나오므로 미탐 #3 이 여기서 닫힌다. 다른 저장소면 즉시 `exit 0`(통과) — cross-repo enclosed 레인이 구조적으로 보존된다.
2. **목적지가 base 인가** — stdin 의 각 줄에서 `remote_ref` 가 `refs/heads/<target_base>` 와 **정확히 일치**하면 `exit 1`. remote 이름은 보지 않는다(어느 remote 로 가든 base ref 면 거부). 삭제 push(`local_oid` 가 all-zero)도 base 면 거부한다.

이 두 조건 밖은 전부 통과다. allowlist 를 증명하는 구조가 아니라 판정에 필요한 사실을 git 이 직접 주므로, fail-closed 여부를 따질 자리가 없다.

**적용 범위**: `disposition` attempt 를 제외한 모든 세션(첫 dispatch·resume·conflict). disposition 은 base publish 가 본업이므로 hook 을 설치하지 않는다.

**설치 시점 — 상태 변경보다 앞**: base 재해석 직후, `worktree.removeIfDiscardable`/`worktree.add` 보다 **앞**에서 설치한다(`scheduler.js` 의 base 재해석 `:1912-1938` 과 워크트리 pre-flight `:1947` 사이). 그 지점에서는 아직 워크트리도 attempt 레코드도 workflow_mode/exec 스탬프도 만들어지지 않았으므로, 설치 실패가 `refuseDispatch` 만으로 잔재 없이 끝난다. resume·conflict 경로도 같은 규칙을 따른다 — 상태를 만들기 전에 설치한다.

`launchSession` 안에서 설치할 수 없다는 뜻이다. 거기서 실패하면 워크트리·`running` attempt·스탬프가 이미 존재하는데 `refuseDispatch` 는 배지와 claim 만 처리하므로 잔재가 남는다(spec 리뷰 F5). 구조상 그 지점에서 설치할 수밖에 없는 경로가 발견되면, 그 경로의 실패 처리는 `spawn_failed` 와 **동일한** rollback(attempt `failed` 기록 + 스탬프 되돌림 + claim 해제 + 워크트리 제거)을 수행한다.

### §3 검출 층 — 사후 base 불변식

**대상**: `base_oid` 가 pin 되고 브랜치가 `<bead_id>` 인 일반 dispatch/resume attempt 만.

- disposition attempt 는 base publish 가 본업이므로 제외한다.
- external-conflict attempt 는 `scheduler.js:2808` 이 `base_oid: null` 로 dispatch 하므로 비교 기준점 자체가 없다(실측). 제외는 정책이 아니라 관측 불가에 따른 것이다.

제외한 경우 **제외했다는 사실 자체를 기록**한다 — `base_drift = { skipped: 'disposition' | 'no_base_oid' }`. 조용한 미적용과 구별되어야 나중에 이 공백이 문제가 될 때 근거가 남는다.

**실행 지점 — 공통 settlement 단계**: `observeBaseDrift(workspace, attempt_id)` 하나를 만들고, attempt 가 종료되는 **모든** 경로가 프로세스 종료 후·브랜치 정리 전에 그것을 호출한다.

| 경로 | 지점 | 현재 상태 |
| --- | --- | --- |
| 정상 종료 | `onSessionDone` | disposition 분기(`:1065`)와 PR 관측(`:1140`) 사이 |
| 사용자 ⏸/■ | `onSessionDone` 의 `stopped` 조기 반환(`:1041-1055`) | 이 경로는 `return` 으로 빠져나가므로 별도 호출이 필요하다 |
| 서버 재시작 후 정리 | dead attempt 정리(reconcile) 경로 | 종료를 서버가 뒤늦게 관측하는 경로 |

`onSessionDone` 한 곳에만 두면 위 두 경로가 통째로 빠진다(spec 리뷰 F3). 또한 disposition 분기는 `return` 하므로, 그 자리 뒤에 두면 `base_drift.skipped='disposition'` 기록조차 남길 수 없다 — skip 기록도 이 공통 단계가 수행한다.

`verdict.success` 여부와 **무관하게** 실행한다 — SIGTERM 당한 세션도 죽기 전에 push 했을 수 있고, 그 경우 실패 원인이 `base_landing_detected` 로 대체되는 편이 정직하다.

**절차**:

1. `deps.resolveBase({ force: true })` 로 base 를 재해석해 현재 원격 tip 을 얻는다(fetch 포함). 강제 재해석 wrapper 는 attach 층이 소유하고 raw `resolveTargetBase({ repo, gitRun })` 는 그 아래에 있다 — 검출 층은 `pr-actions.js` 가 머지 직전에 쓰는 것과 **같은 dependency seam**을 쓴다(spec 리뷰 F6). 단위 테스트도 이 seam 을 주입한다.
2. 새 tip == pin 된 `base_oid` → 이동 없음, 종료.
3. 이동이 있으면 두 집합을 비교한다.
   - A = `git rev-list <base_oid>..refs/heads/<bead_id>` — 이 attempt 가 만든 커밋
   - B = `git rev-list <base_oid>..<새 tip>` — base 가 움직인 구간
   - `A ∩ B = ∅` → 위반 아님. 4 로 간다.
4. 교집합이 있으면 **PR 머지 경유인지 먼저 배제한다.** 이 브랜치의 PR 을 관측해 `MERGED` 이면 정상 랜딩이다 — `base_drift = { …, landed: true, via: 'pr_merge' }` 로 기록하고 위반으로 삼지 않는다. GitHub 의 merge-commit 방식은 브랜치 커밋 SHA 를 그대로 base 에 넣고, 사람이 로컬에서 attempt 브랜치를 base 로 ff push 하는 것도 허용된 행위다 — 이 배제가 없으면 둘 다 오탐이다(spec 리뷰 F4). PR 관측이 실패하면 **위반으로 삼지 않고** 관측 실패로 기록한다: 오탐의 비용이 미탐보다 크다.
5. 배제되지 않은 교집합이 **위반**이다. 교집합 SHA 를 증거로 기록한다.
6. 위반도 배제도 아니면 **관측 기록**이다. `base_drift = { pinned, observed, landed: false }` 를 남긴다. 남이 움직인 base(사람의 머지 클릭, 다른 워커의 머지, 사용자 push)는 여기까지다.

A 가 비어 있으면(세션이 브랜치에 커밋하지 않음) 3단계는 자동으로 위반이 아니다. 이것이 이 판정의 미탐 경계다 — 세션이 브랜치를 거치지 않고 base 에 커밋해 push 하면 A 가 비어 검출되지 않는다(§5 잔여 5).

**관측 실패**(fetch 실패, base 재해석 실패, `rev-list` 실패)는 위반으로 취급하지 않는다. `base_drift` 에 실패 step 을 기록하고 정상 경로를 계속한다 — 검출 층은 사후 증거이지 실행 권한이 아니고, 관측이 안 됐다고 세션을 죽이면 이 Bead 가 없애려는 오탐을 다른 이름으로 되살리는 것이다.

**위반 시**: `failAttempt(cause='base_landing_detected', cause_detail={ reason, command: null })` — 큐 정지(`auto_advance` OFF) + 배너 + workflow_mode/exec 스탬프 되돌림. 기존 fail-closed 경로를 그대로 재사용하며 새 처분 층을 만들지 않는다.

**되돌림은 하지 않는다.** force push 도 자동 revert 도 없다. 원격 base 를 자동으로 되감는 것은 파괴적이며 사람이 판단할 일이다.

저장은 `queue-store.js` 의 attempt patch 를 쓴다(`verify_result` 와 같은 자리). 새 저장 층을 만들지 않는다.

### §4 텍스트 가드 재배치

**선행 — 위반에 `kind` 를 도입한다.** 현재 `command-guard.js` 는 `git push` base-landing(`:1371`)과 `gh pr merge`(`:1362`)에 **같은** `reason: 'merge_to_base_blocked'` 를 돌려준다. reason 만으로는 한쪽만 강등하는 것이 불가능하다(spec 리뷰 F1). `MergeViolation` 에 `kind` 를 추가하고 **효과는 `kind` 가 지배**한다.

| `kind` | 판정 대상 | 효과 |
| --- | --- | --- |
| `git_push_base` | `git push` 가 자기 repo 의 base 로 랜딩 | 경고 |
| `gh_pr_merge` | `gh pr merge` | kill |
| `hook_bypass` | hook 무력화 4형태 (아래) | kill |
| `base_merge` | `git merge` (현행 `base_merge_blocked`) | kill (현행 유지) |

`reason` 은 기존 attempt 레코드 표시와의 호환을 위해 유지하되, 효과 결정에는 쓰지 않는다.

- **`git push` base-landing 판정은 경고로 강등** — `runner/session.js` 가 `kind='git_push_base'` 를 받으면 kill 없이 경고 이벤트만 남기고 세션을 계속 진행시킨다. 판정 로직(`command-guard.js` 의 토크나이저·allowlist·회귀 테스트)은 **그대로 둔다.** 근거: 정확한 판정은 이제 hook 이 하고, 이 층의 오판 비용은 세션 전체 SIGTERM 이다.
- **`gh pr merge` 는 kill 유지** — 강등 대상이 아니다. hook 은 git push 만 보고(GitHub API 호출은 hook 을 타지 않음), 검출 층은 이 저장소가 squash 머지를 쓰므로 SHA 가 바뀌어 `A ∩ B = ∅` 이 되어 못 잡는다. 어느 층도 커버하지 못한다. 그리고 `git push` 와 달리 `gh pr merge` 는 **명령 자체가 목적지를 담고 있어** argv 위치만으로 정확히 판정된다 — 이 Bead 가 없애려는 것은 부정확한 판정의 kill 권한이지 kill 자체가 아니다.
- **새 kill 대상: hook 무력화 시도** (`kind='hook_bypass'`, `reason='hook_bypass_blocked'`) — 네 형태를 argv 위치로 판정한다.
  1. `git push --no-verify`
  2. `git -c core.hooksPath=… …`
  3. `git config … core.hooksPath …`
  4. 명령 앞 대입으로 `GIT_CONFIG_COUNT`/`GIT_CONFIG_KEY_*`/`GIT_CONFIG_VALUE_*` 를 재정의하는 형태

  `git push -n` 은 `--dry-run` 이지 `--no-verify` 가 아니므로 대상이 아니다.
- **`git merge` 가드(`base_merge_blocked`)는 현행 유지** — 이 Bead 의 범위가 아니다.
- **disposition 세션은 세 층 모두에서 제외** — hook 미설치(§2), 검출 미적용(§3), base-landing 경고와 hook 무력화 kill 도 미적용. `settings.disposition` 을 `runner/session.js` 의 가드 컨텍스트에 넘겨 판정 주어에 포함시킨다. 이것이 "왜" 절에서 발견한 결함의 계약적 수정이다.
- **재시작 후 감시 경로(`session-monitor.js`)를 같은 효과 표에 정합시킨다** — 현재 `session-monitor.js:255-258` 은 `findMergeViolation(cmd, { conflict_resolution })` 만 호출한다. `repo` 도 `target_base` 도 `disposition` 도 넘기지 않으므로, 서버 재시작 후 detached 세션을 이어 감시하는 이 경로는 **legacy `main|master` 이름 매칭으로 모든 위반을 kill 한다.** 강등도, cross-repo 허용도, disposition 제외도 재시작 한 번이면 전부 무너진다(spec 리뷰 F2). 이것은 `UI-lhwp` 가 주어를 교정하면서 남긴 공백이기도 하다.

  monitor entry 에 attempt 의 `repo`·`target_base`·`disposition` 을 실어 live runner 와 **같은 typed effect 표**(위 `kind` 표)를 쓰게 한다. 두 경로가 같은 판정 함수를 공유하는 것이 이 항목의 완료 조건이다.
- **프리앰블 고지 갱신** — `runner/preamble.js:62` `GUARD_CONTRACT_DIRECTIVE` 의 (3)번 항은 base push 가 "즉시 종료"된다고 고지하는데, 강등 후에는 사실이 아니다. hook 이 거부한다는 것과 `gh pr merge` 는 여전히 종료된다는 것으로 정정한다. 세션이 자기가 밟을 지뢰를 정확히 알아야 한다는 원래 취지는 유지된다.

### §5 오류 처리와 잔여 위험

**hook 설치 실패는 dispatch 거부** — `refuseDispatch(…, 'guard_hook_install_failed')`. 검출 층이 있으니 그냥 진행할 수도 있지만, 안전 장치 없이 무인 세션을 조용히 돌리는 것이 이 Bead 가 없애려는 종류의 침묵이다. 기존 refusal 배지 관용구를 그대로 쓴다. §2 의 설치 시점 규칙(상태 변경보다 앞)이 이 거부를 잔재 없이 성립시키는 전제다 — 그 순서가 지켜지지 않으면 거부만으로는 워크트리·attempt·스탬프가 남는다.

**hook 디렉터리 정리**는 attempt 종료 시 best-effort 삭제, 실패는 로그만. 다음 attempt 는 새 `attempt_id` 를 쓰므로 잔재가 판정을 오염시키지 않는다.

**`GIT_CONFIG_COUNT` 상속 충돌** — 부모 환경에 이미 있으면 덮어쓰지 않고 그다음 인덱스에 이어 붙인다(§2).

**`--git-common-dir` 의 경로 형태** — hook 실행 컨텍스트에서 상대 경로가 나올 수 있으므로 `--path-format=absolute` 로 받고 비교 전에 정규화한다. 실제 동작은 완료 조건 #5 에서 실측으로 고정한다.

**잔여 위험**:

1. `--no-verify` 와 hook 파일 직접 수정으로 예방 층은 우회 가능하다 — 위협 모델상 방어 대상이 아니며, 우회 시도 자체는 §4 가 kill 한다.
2. 검출 층은 **PR 을 경유해 base 에 들어간 경우를 잡지 않는다.** squash·rebase 는 SHA 가 바뀌어 교집합이 생기지 않고, merge-commit 방식은 교집합이 생기지만 §3-4 가 명시적으로 배제한다(그 배제가 없으면 사람의 정상 머지가 오탐이 된다). 즉 세션이 `gh pr merge` 로 자기 PR 을 머지해도 검출되지 않으며, 이 구멍의 유일한 실질적 방어는 `gh pr merge` kill 유지다.
3. external-conflict attempt 는 검출 대상 밖이다 — `scheduler.js:2808` 이 `base_oid: null` 로 dispatch 하므로 비교 기준점이 없다. 제외 사실은 `base_drift.skipped` 에 기록된다.
4. 우회 불가능한 방어는 GitHub 브랜치 보호(서버 측)이며 이 저장소 코드 범위 밖이다. 후속 관측으로만 기록하고 이 Bead 에서 다루지 않는다.
5. **검출 층의 미탐 경계** — 세션이 attempt 브랜치를 거치지 않고(main checkout 이나 detached HEAD 에서) 커밋해 base 로 push 하면 A 가 비어 검출되지 않는다. 이 경로는 §2 의 hook 이 예방으로 닫는 것이 정본이고(hook 은 어느 디렉터리에서 실행하든 적용된다), 검출 층은 그 뒤를 받치지 못한다. 문서화된 한계로 테스트에 고정한다(§6·완료 조건 #7).

### §6 테스트 범위

**hook 스크립트 — 통합 테스트** (`worktree.integration.test.js`·`target-base.integration.test.js` 선례). 임시 repo 와 bare remote 를 만들어 실제 push 로 검증한다.

| # | 케이스 | 기대 |
| --- | --- | --- |
| 1 | base ref 로 push | 거부 |
| 2 | 비-base 브랜치로 push | 통과 |
| 3 | 다른 저장소로 push (같은 env) | 통과 — cross-repo enclosed 보존 |
| 4 | base 삭제 push | 거부 |
| 5 | main checkout 에서 자기 base 로 push | 거부 — 미탐 #3 이 실제로 닫혔는지 |
| 6 | `--no-verify` | 통과 — 문서화된 한계의 명시적 검증 |

**배선 — 단위 테스트** (`session.env.test.js` 선례): `settings.env` 에 `GIT_CONFIG_*` 가 실려 spawn env 까지 도달하는지, 상속된 `GIT_CONFIG_COUNT` 가 있을 때 이어 붙는지, disposition attempt 에는 실리지 않는지.

**검출 층 — 단위 테스트** (fake git runner + 주입된 `resolveBase` seam):

| # | 케이스 | 기대 |
| --- | --- | --- |
| 1 | base 이동 없음 | 아무 기록도 위반도 없음 |
| 2 | 남이 base 를 움직임 (교집합 없음) | 관측 기록만, 위반 아님 |
| 3 | attempt 커밋이 base 에 랜딩, PR 은 미머지 | **위반** |
| 4 | attempt 커밋이 base 에 있으나 PR 이 `MERGED` (merge-commit 방식 오탐 반례) | 위반 아님, `via: 'pr_merge'` |
| 5 | 사람이 attempt 브랜치를 base 로 ff push (오탐 반례) | #4 와 같은 배제 경로로 위반 아님 |
| 6 | 세션이 브랜치 밖에서 커밋해 base 로 push (미탐 반례) | 검출되지 않음 — 문서화된 한계로 고정 |
| 7 | base 재해석/`rev-list`/PR 관측 실패 | 기록 후 정상 경로 진행 |
| 8 | disposition · `base_oid` 없음 | `base_drift.skipped` 기록 |

**세 종료 경로 커버 — 단위 테스트**: 정상 종료 · 사용자 ⏸/■(`stopped` 조기 반환) · 서버 재시작 후 dead attempt 정리에서 `observeBaseDrift` 가 각각 호출되는지. F3 이 지적한 공백이므로 경로별 케이스가 필요하다.

**텍스트 가드 — 기존 회귀 유지 + 신규**: `kind='git_push_base'` 가 kill 이 아닌 경고가 되는지, `kind='gh_pr_merge'` kill 이 유지되는지, hook 무력화 4형태가 kill 되는지, disposition 세션에서 세 층이 모두 미적용인지. `UI-lhwp` 가 고정한 실측 사고 2건과 allowlist 반례 3종은 **경고 판정으로서** 그대로 유지한다(판정 로직을 지우지 않으므로 회귀 가치가 남는다).

**재시작 후 감시 경로 — 단위 테스트**: `session-monitor.js` 가 `repo`·`target_base`·`disposition` 을 실은 컨텍스트로 판정하는지, live runner 와 같은 효과 표를 적용하는지. 최소 3케이스 — 자기 base push 는 경고, 다른 repo base push 는 무판정, disposition 세션은 미적용.

### §7 완료 조건

| # | 조건 | 검증 |
| --- | --- | --- |
| 1 | 워커 세션의 base push 가 hook 에서 거부된다 | §6 통합 테스트 1 |
| 2 | 다른 저장소 push 가 hook 판정 대상이 아니다 | §6 통합 테스트 3 |
| 3 | main checkout 경유 자기 base push 가 닫혔다 | §6 통합 테스트 5 — 미탐 #3 |
| 4 | 미탐 #1·#2 가 닫혔다 | python subprocess 형태와 비-`INTERPRETERS` 실행 경로의 base push 가 hook 에서 거부되는 통합 테스트 |
| 5 | hook 이 실제 워커 세션 환경에서 동작한다 | 실 dispatch 1회로 `GIT_CONFIG_*` 주입·hook 설치·`--git-common-dir` 절대 경로 비교를 실측 확인 |
| 6 | 검출 층이 위반만 잡는다 | §6 검출 층 단위 테스트 1·2·3·8 |
| 7 | 오탐 반례 2종이 배제되고 미탐 경계가 고정된다 | §6 검출 층 4·5(배제) + 6(문서화된 미탐) |
| 8 | 검출 층이 관측 실패로 세션을 죽이지 않는다 | §6 검출 층 7 — attempt 가 정상 경로를 마치고 `base_drift` 에 실패 step 이 남는다 |
| 9 | 검출이 세 종료 경로 전부에서 실행된다 | 정상 종료 · `stopped` · 재시작 후 정리 각각의 호출 테스트 |
| 10 | 위반 효과가 `kind` 로 결정된다 | `git_push_base` 경고 / `gh_pr_merge`·`hook_bypass`·`base_merge` kill 을 한 테이블 테스트로 고정 |
| 11 | base-landing 이 kill 하지 않는다 | 실측 사고 2건이 경고로만 기록되고 세션이 계속된다 |
| 12 | `gh pr merge` kill 이 유지된다 | 기존 테스트 green + `--repo` 지정 형태도 kill |
| 13 | hook 무력화 4형태가 kill 된다 | §6 텍스트 가드 신규 테스트 |
| 14 | 재시작 후 감시 경로가 같은 효과 표를 쓴다 | §6 재시작 감시 3케이스 + 두 경로가 같은 판정 함수를 공유함을 코드로 확인 |
| 15 | disposition 세션이 본업을 수행할 수 있다 | disposition 컨텍스트에서 `git push origin <base>` 가 violation 도 경고도 아니고, hook 도 설치되지 않는다 |
| 16 | 프리앰블 고지가 강등 후 사실과 일치한다 | 생성된 프리앰블 문자열 검증 테스트 |
| 17 | hook 설치 실패가 잔재 없이 거부된다 | `guard_hook_install_failed` refusal 배지 + 워크트리·attempt 레코드·workflow_mode/exec 스탬프가 남지 않음(zero-residue) |
| 18 | 정본 검증 묶음 green | `npm run all` (= `lint && tsc && test && prettier:check`) |
| 19 | 배포 후 런타임이 새 코드로 돈다 | 머지 후 `bdui-shared restart` → 프로세스 경로가 머지된 체크아웃, 포트, HTTP 응답 확인 |

## 비목표

- **`gh pr merge` 판정을 정밀화하지 않는다.** `--repo` 로 남의 저장소를 가리킬 수 있다는 결함은 남지만, 현행 kill 을 유지하는 것이 이 Bead 의 선택이며 별도 관측으로 남긴다.
- **`git merge` 가드를 건드리지 않는다.**
- **텍스트 base-landing 판정 로직을 삭제하지 않는다.** kill 권한만 회수하고 코드와 테스트는 증거 층으로 유지한다.
- **GitHub 브랜치 보호를 설정하지 않는다.** 서버 측 방어는 이 저장소 코드 범위 밖이다.
- **원격 base 를 되돌리지 않는다.** 위반 검출은 보고하고 멈춘다.
- **beads-ui 를 multi-repo 로 만들지 않는다.**

## 잔여

- **squash 머지 경유 base 랜딩은 검출되지 않는다**(§5 잔여 2). `gh pr merge` kill 이 유일한 방어다.
- **`gh pr merge --repo <다른 저장소>`** 는 여전히 kill 되며, cross-repo enclosed 레인이 남의 PR 머지를 필요로 하게 되면 재검토 대상이다. 현재 enclosed 처분은 PR 없는 직접 착지이므로 충돌하지 않는다.
- **external-conflict attempt 의 검출 공백**(§5 잔여 3).
