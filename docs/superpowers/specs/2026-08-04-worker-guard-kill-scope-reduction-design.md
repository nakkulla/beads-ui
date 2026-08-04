# 워커 가드 kill 범위 축소 — 비가역 원격 변경만 차단한다

- Bead: `UI-1xcd`
- route: `spec_backed`
- 선행: `UI-8mvc` (PR #80, `5fd4934`, 2026-08-03 11:06 머지) — 강제를 3층으로 분업했다.
  이 Bead 는 그 3층이 배포된 **뒤에도 남은 오탐과 과잉 처벌**을 닫는다.

## 왜

가드가 지키려는 것보다 가드가 부수는 것이 크다.

전체 워크스페이스 큐의 가드 발동을 전수 집계하면 **소실 비용이 $143.97** 이다.
비용은 전부 같은 메커니즘에서 나온다 — 판정이 서면 세션 전체가 SIGTERM 되고,
그때까지의 컨텍스트와 작업이 통째로 버려진다.

| 판정 | 건수 | 소실 |
| --- | --- | --- |
| `merge_to_base_blocked` | 3 | $64.88 |
| `base_merge_blocked` | 3 | $55.79 |
| `hook_bypass_blocked` | 2 | $15.02 |
| `base_landing_detected` | 4 | $8.29 |
| **합계** | **12** | **$143.97** |

선행 스펙도 이 비용 구조를 문제로 적었다(`2026-07-30-guard-enforcement-layer-replacement-design.md`
"오판의 비용은 세션 전체 SIGTERM 이다(실측: `Cortex-j3v` 21분·$11 손실)"). 3층 분업은
`git_push_base` 를 `warn` 으로 강등해 그 축의 비용을 실제로 없앴다. 남은 축은 손대지 않았다.

### 3층 배포 이후의 발동만 보면 오탐이 5/6 이다

`5fd4934`(08-03 11:06) 를 경계로 가르면 판단 대상이 달라진다. 그 이전 6건은 이미
구조가 교체된 아키텍처의 기록이므로 근거로 쓰지 않는다. **이후 6건이 현행 계약의 성적표다.**

| 시각 | 판정 | 명령 / 지목 커밋 | 실체 |
| --- | --- | --- | --- |
| 08-03 12:19 · 12:28 | `base_landing_detected` ×2 | `51e4b79` | **PR #81 머지 커밋**(`UI-j6wa`). `UI-53es` 는 만든 적이 없다 |
| 08-03 14:34 · 14:51 | `base_landing_detected` ×2 | `58a6eb2` | **사람이 base 에 직접 올린 `UI-b6qs` 스펙 수정 커밋**. `UI-nprg` 는 만든 적이 없다 |
| 08-03 12:44 | `hook_bypass_blocked` | `git -c core.hooksPath=/dev/null` | **진짜 위반** — 유일하게 정당한 발동 |
| 08-04 11:33 | `hook_bypass_blocked` | `git config --get core.hooksPath 2>/dev/null` | 순수 읽기. 출력조차 `head -c0` 으로 버렸다 |

`base_landing_detected` 4건은 서로 다른 4건이 아니라 **2쌍의 중복**이다. 같은 `pinned`·같은
`shas` 가 후속 attempt 에 그대로 재전가됐고, 두 번째 건은 `exit: 0` 으로 정상 종료했는데도
`failed` 로 기록됐다.

여기에 스펙 작성 중 실시간으로 한 건이 더 발생했다 — 08-04 11:48, `dotfiles-v05o`,
`git merge origin/main --no-edit`, `exit 143`, **$11.67 소실**. 현행 계약에서 살아 있는
결함이라는 뜻이다.

### 세션에게 base 를 동기화할 수단이 없다

`base_merge_blocked` 3건은 전부 `git merge origin/main` 계열이다. 그런데 판정은 대상
브랜치를 보지 않는다 — `command-guard.js:1642-1653` 은 `merge-base`/`merge-tree`/`merge-file`
만 빼고 **모든 `git merge` 를 차단**한다. `git merge --ff-only origin/main` 도,
`git merge feature-x` 도, `git merge --abort` 도 같다.

그리고 대안이 막혀 있다. `2026-07-26-worker-phase2-pr-queue.md:77` 은 충돌 해소 세션이
**"rebase 가 아니라 merge-into-branch"** 를 쓰는 이유를 이렇게 적었다 — "rebase 는
force-push 가 필요한데 push 안전 규칙상 금지". 즉 merge 는 가드가 죽이고 rebase 는 push
안전 규칙이 막는다. 정당한 base 동기화를 수행할 경로가 남아 있지 않다.

### 금지의 근거를 추적하면 관성뿐이다

`2026-07-26-worker-phase2-pr-queue.md:20`:

> `gh pr merge` 와 base(main/master)로의 push 는 모든 attempt 에서 계속 차단하고,
> base-into-branch `git merge` 는 충돌 해소 attempt(§6)에 한해 허용한다 —
> 일반 attempt 에서는 `git merge` 도 **현행대로** 차단.

"현행대로" 가 근거의 전부다. 원래 위험 근거였던 무인 머지(`auto_merge` 레인 제거)는
`gh pr merge` 와 base push 가 이미 각각 막고 있고, base 를 브랜치로 들이는 merge 와는
무관하다. 게다가 같은 명령이 충돌 해소 attempt 에서는 **본업**이다. 명령의 위험도가 아니라
attempt 의 꼬리표가 생사를 가르고 있다.

## 무엇을

### §1 kill 은 비가역 원격 변경에만 남긴다

판단 기준은 하나다 — **그 명령이 원격 상태를 되돌릴 수 없게 바꾸는가, 또는 그렇게 만들
예방층을 무너뜨리는가.** 로컬에서 끝나고 `git reset` 으로 복구되는 것은 kill 대상이 아니다.

`command-guard.js:208-213` `GUARD_EFFECTS` 를 재판정한다.

| kind | 현재 | 변경 후 | 근거 |
| --- | --- | --- | --- |
| `gh_pr_merge` | kill | **kill** | 원격 base 가 즉시 이동하고 pre-push 훅이 개입할 수 없는 경로다 |
| `hook_bypass` | kill | **kill** | 그 자체는 아무것도 바꾸지 않지만 예방층을 무너뜨려 다음 push 가 원격 base 를 실제로 옮긴다(선행 스펙 실측) |
| `base_merge` | kill | **warn** | 로컬 브랜치만 바뀐다. 원격은 움직이지 않고 `git reset` 으로 되돌아간다 |
| `git_push_base` | warn | warn (유지) | pre-push 훅이 실제 push 를 거부한다 |

`warn` 의 의미는 `session.js:416-429` 에 이미 구현돼 있다 — 세션은 계속 진행하고 사실만
`error` 이벤트로 기록된다. `base_merge` 는 이 경로로 옮겨가므로 **merge 는 실제로 실행되고,
발생 사실은 attempt 로그에 한 줄 남는다.**

브랜치가 base 를 흡수하는 것은 의도된 동작이며 사후 검출층과 충돌하지 않는다.
`base-drift.js` 는 이미 `merge-base --is-ancestor observed <ref>` 로 흡수 케이스를
`branch_contains_observed` 로 배제한다.

### §2 `hook_bypass` 에서 읽기를 위반에서 제외한다

훅을 **옮기는 것**과 훅이 어디 있는지 **묻는 것**은 다르다. 현재 판정은 둘을 구분하지 않는다
(`command-guard.js:1421-1423`):

```js
if (subcommand === 'config') {
  return args.some((token) => HOOKS_PATH_RE.test(configKeyOf(token)));
}
```

주석(`:1372-1374`)은 이 선택을 "읽기와 쓰기를 가리려면 인자 개수가 필요하고, 이 키를 쓰는
다른 용도가 없으니 fail-closed 를 유지한다" 로 정당화했다. 앞의 전제는 참이 아니다 —
`--get`/`--get-all`/`--get-regexp`/`--list` 는 **읽기를 명시하는 토큰**이므로 인자 개수를
세지 않고도 판정된다.

`git config` 의 인자에 이 읽기 플래그가 하나라도 명시되면 위반이 아니다. 나머지는 그대로 kill 이다:

- `git config core.hooksPath <경로>` (쓰기)
- `git -c core.hooksPath=…` (1회 재배치)
- `git push --no-verify`
- `GIT_CONFIG_COUNT`/`GIT_CONFIG_KEY_n`/`GIT_CONFIG_VALUE_n` 주입

같은 완화를 `HOOK_BYPASS_RE`(`:102-103`) 폴백 경로에도 적용한다. 폴백은 토큰화가 실패했을
때만 쓰이므로 읽기 플래그 판정도 정규식 수준으로만 수행한다 — 토큰화가 가능한 입력은 §2 의
argv 경로가 이미 처리한다.

### §3 `conflict_resolution` 예외 구조를 제거한다

`conflict_resolution` 은 오직 `base_merge` 판정 한 곳을 위해 존재한다 —
`command-guard.js:1579`, `:1647` 이 전부이고 다른 소비자가 없다. `base_merge` 가 `warn` 이
되면 이 플래그가 가리는 대상이 사라진다.

제거 범위: `GuardContext` 의 `conflict_resolution` 필드(`:187`), `findMergeViolation` 의
옵션 처리(`:1744`), `session.js` 의 전달 경로, 그리고 이 분기를 검증하던 테스트.
`scheduler.js` 가 attempt 레코드에 기록하는 `conflict_resolution` 필드 자체는 충돌 해소
attempt 의 식별자로 다른 곳에서도 쓰이므로 **건드리지 않는다** — 제거 대상은 가드로 가는
경로뿐이다.

### §4 사후 검출의 시작점을 사실로 교정한다

`base-drift.js` 의 오탐은 판정 근거가 **추정**이기 때문이다. 지금은 "이 커밋을 누가 먼저
가졌나" 를 reflog 획득 시각으로 재구성한다. 그런데 답을 추정할 필요가 없다 — attempt 가
커밋을 만들었는지는 **관측 가능한 사실**이다.

문제는 그 사실이 지금 기록되지 않는다는 데 있다. spawn 직후 런타임 스냅샷을 채우는
`scheduler.js:2565-2575` 가 `head_oid: base_oid` 로 쓰기 때문에, `head_oid` 는 브랜치 tip 이
아니라 `base_oid` 의 복사본이다(`Analysis-ex0` 레코드에서 두 값이 동일한 이유).

**교정**: 같은 지점에서 `head_oid` 를 그 attempt 가 실제로 시작하는 브랜치 tip
(`git rev-parse refs/heads/<bead_id>`) 으로 채운다. 신규 브랜치면 결과적으로 `base_oid` 와
같고, resume 이면 기존 브랜치 tip 이 들어간다. 이 시점에는 워크트리 pre-flight 가 이미
끝나 브랜치가 존재한다. rev-parse 가 실패하면 `base_oid` 로 폴백하되 그 사실을 레코드에
남긴다 — 시작점을 모르는 채로 랜딩을 판정하지 않기 위해서다.

이 값이 채워지면 종료 시점 판정이 사실 위에 선다. `observeBaseDrift` 는 이미
`git rev-parse refs/heads/<bead_id>` 로 종료 시점 tip 을 읽으므로 별도 기록이 필요 없다.

- `head_oid == 종료 시점 tip` → **이 attempt 는 커밋을 하나도 만들지 않았다.** 만들지 않은
  커밋을 base 에 올렸을 수 없으므로 랜딩 판정 대상이 아니다. 08-03 오탐 4건이 여기서 닫힌다.
- 그렇지 않으면 `rev-list <head_oid>..<종료 시점 tip>` 이 이 attempt 가 만든 커밋이고,
  그 집합과 base 이동분의 교집합만 랜딩 후보가 된다.

`head !== observed` 조건부 containment 분기(`base-drift.js`)와 reflog precedence 비교는
이 사실 판정으로 대체된다. 판정이 관측 실패로 흐르는 `precedence_observe:*` 경로가 함께
사라지므로, "reflog 를 읽을 수 없으면 위반도 오탐과 함께 사라진다" 던 선행 설계의 절충도
해소된다.

진짜 랜딩에 대한 처벌(attempt `failed`)은 그대로 둔다. 이 절은 판정 근거만 바꾼다.

### §5 프리앰블을 바뀐 계약에 맞춘다

`runner/preamble.js:70` 은 세션에게 "`git merge` 절대 금지 — 충돌 해소 attempt 를 제외하고
세션 엔진이 `git merge` 실행 즉시 세션을 종료한다" 고 고지한다. 이 고지가 세션이 base
동기화를 시도조차 못 하게 만든 직접 원인이다.

바뀐 계약으로 갱신한다 — base 를 브랜치로 들이는 merge 는 허용되고 기록만 남으며, 즉시
종료되는 것은 `gh pr merge` 와 훅 무력화(쓰기·주입)뿐이고, 훅 경로를 **읽는 것**은 위반이
아니다.

## Test scope

RED → GREEN 을 적용할 seam 은 아래로 한정한다.

| seam | 파일 | 검증 대상 |
| --- | --- | --- |
| `GUARD_EFFECTS` 재판정 | `server/worker/runner/command-guard.test.js` | `base_merge` 가 `warn`, 나머지 3종의 효과가 표대로인지 |
| `hook_bypass` 읽기 제외 | `server/worker/runner/command-guard.test.js` | 읽기 4종(`--get`/`--get-all`/`--get-regexp`/`--list`) 통과, 쓰기·`-c`·`--no-verify`·`GIT_CONFIG_*` 는 위반 유지 |
| 폴백 경로 정합 | `server/worker/runner/command-guard.test.js` | 토큰화 실패 입력에서도 읽기/쓰기 판정이 argv 경로와 어긋나지 않는지 |
| `conflict_resolution` 제거 | `server/worker/runner/session.merge-guard.test.js` | 충돌 해소 여부와 무관하게 merge 가 `warn` 인지 |
| `head_oid` 교정 | `server/worker/scheduler.test.js` | dispatch 시 실제 브랜치 tip 이 기록되는지(신규·resume 양쪽) |
| 사실 기반 랜딩 판정 | `server/worker/base-drift.test.js` | 커밋 없는 attempt 는 랜딩 아님, 커밋을 base 에 올린 attempt 는 랜딩 |

**회귀 고정**: 08-03 `base_landing_detected` 2쌍과 08-04 `git config --get`,
08-04 `git merge origin/main --no-edit` 을 각각 재현하는 케이스를 추가한다. 이 네 입력이
현재 코드에서 위반, 변경 후 무위반이어야 한다.

## 검증

`npm run all` (= `lint` → `tsc` → `test` → `prettier:check`) 이 green 이어야 한다.
프런트엔드 소스를 건드리지 않으므로 번들 재생성은 대상이 아니다.

CI 는 이 fork 에서 돌지 않는다(`AGENTS.md`). 로컬 검증이 CI 를 대신하며, `gh pr checks` 가
비면 vacuous pass 로 처리한다.

## 배포 처분

이 저장소는 머지가 완료가 아니다 — `AGENTS.md` 의 Post-Merge Runtime Validation 은 머지 후
`bdui-shared restart` 와 실행 경로·포트·HTTP 응답 확인까지를 완료 조건으로 요구한다.
이 변경은 서버 측 워커 코드이므로 재시작 없이는 실 서비스에 반영되지 않는다.

이 저장소에는 `deploy.json` 이 없다. 워크플로 계약이 요구하는 세 처분 중
**`worker-ineligible` 라벨**을 선택한다 — 이 Bead 의 머지 후 작업은 공유 서비스 재시작이며,
그 실행은 무인 워커가 아니라 사람이 주관하는 세션에 속한다. `deploy.json` 신규 도입은 이
Bead 의 범위가 아니고, 별도 단위로 다루는 것이 맞다.

### 적용 순서

1. PR 머지 (`main` 으로).
2. 머지된 `main` 체크아웃에서 `~/.config/bdui/config.toml` 런타임 설정 정합 확인.
3. `bdui-shared restart`.
4. 프로세스 실행 경로·리스닝 포트·HTTP 응답 확인. 세 가지가 모두 머지된 체크아웃을
   가리킬 때만 완료로 선언한다.

## 잔여 위험

1. **`base_merge` 가 `warn` 이 되면 merge 가 실제로 실행된다.** 세션이 base 를 브랜치로
   들이면 PR diff 에 머지 커밋이 남는다. 이는 충돌 해소 세션이 이미 하던 일과 같고, squash
   머지 시 중간 머지 커밋은 사라진다(`2026-07-26-worker-phase2-pr-queue.md:77`).
2. **훅 무력화는 여전히 클라이언트 측 방어다.** 세션은 훅 스크립트 파일에 접근할 수 있고,
   우회 의지가 있는 세션을 막지 못한다. 우회 불가능한 방어는 GitHub 브랜치 보호(서버 측)뿐이며
   이 저장소 코드 범위 밖이다 — 선행 스펙의 잔여 위험 4 를 그대로 승계한다.
3. **§4 는 `head_oid` 가 정확히 기록된다는 전제에 선다.** 기록 지점은 한 곳이지만 그곳을
   통과하는 dispatch 종류가 신규·resume·충돌 해소로 갈리고, 판정을 소비하는
   `settleBaseDrift` 호출 지점은 4곳(`scheduler.js:1193`, `:1218`, `:1767`, `:3763`)이다.
   rev-parse 폴백이 발동한 attempt 는 시작점이 옛 의미(`base_oid`)로 남으므로, 그 레코드
   표시가 사후 진단의 유일한 단서가 된다. Test scope 가 신규·resume 양쪽을 요구하는 이유다.
4. **읽기 플래그 목록은 열거 방식이다.** `git config` 에 새로운 읽기 형태가 추가되면 목록이
   따라가야 한다. 누락 시 증상은 오탐(과잉 차단)이지 미탐이 아니므로 fail-closed 방향이다.
