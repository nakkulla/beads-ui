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

`warn` 이면 세션이 계속 진행한다는 것은 `session.js:416-429` 에 이미 구현돼 있다. 그러나
**그 사실이 durable 하게 남지는 않는다.** live 경로에서 `sessionLog.attach()` 는 `raw`
이벤트만 재전송하고(`session-log.js`), 가드가 emit 하는 `guard_warning` 은 `event` 로 나가
아무 데도 저장되지 않는다. 재시작 감시 경로(`session-monitor.js:267-284`)의 `publish()` 도
메모리 broker 전송이라 파일이나 attempt 레코드에 닿지 않는다 — 그 자리의 주석이 직접
인정한다("the live path never actually forwards this shape today").

승인된 결정은 "merge 를 허용하되 나중 진단을 위해 기록을 남긴다" 이므로, **기록이 남는 것이
이 절의 요구사항이다.** live 와 재시작 양쪽에서 같은 구조의 경고를 attempt 레코드에 durable
하게 쓰고 readback 한다. `base_merge` 는 이 경로로 옮겨가므로 **merge 는 실제로 실행되고,
발생 사실은 세션 종료 후에도 조회된다.**

브랜치가 base 를 흡수하는 것은 의도된 동작이다. 현행 `base-drift.js` 도 흡수를
`branch_contains_observed` 로 배제하려 하지만 그 배제는 조건부이고(§4 참조) 08-03 오탐이
바로 그 틈에서 났다. **이 절이 merge 를 허용하는 이상 흡수는 예외가 아니라 정상 경로가
되므로, 사후 검출층이 그것을 확실히 구별하는 것은 §4 의 책임이다** — 두 절은 함께 적용
되어야 하며, §1 만 적용하면 흡수한 attempt 가 남의 랜딩을 뒤집어쓰는 빈도가 오히려 늘어난다.

### §2 `hook_bypass` 에서 읽기를 위반에서 제외한다

훅을 **옮기는 것**과 훅이 어디 있는지 **묻는 것**은 다르다. 현재 판정은 둘을 구분하지 않는다
(`command-guard.js:1421-1423`):

```js
if (subcommand === 'config') {
  return args.some((token) => HOOKS_PATH_RE.test(configKeyOf(token)));
}
```

주석(`:1372-1374`)은 이 선택을 "읽기와 쓰기를 가리려면 인자 개수가 필요하고, 이 키를 쓰는
다른 용도가 없으니 fail-closed 를 유지한다" 로 정당화했다. 인자 개수가 필요하다는 것은
맞다. 그것이 판정을 포기할 이유가 되지 않을 뿐이다 — `git config` 의 **연산은 argv 위치로
분류할 수 있고**, 이 가드는 이미 그렇게 판정하는 코드다.

읽기는 세 가지 형태로 쓰인다. 셋 다 훅을 옮기지 않으므로 셋 다 위반이 아니다.

| 형태 | 예 |
| --- | --- |
| modern 하위 명령 | `git config get core.hooksPath`, `git config list` |
| legacy 명시 플래그 | `git config --get\|--get-all\|--get-regexp\|--list core.hooksPath` |
| legacy 암묵 읽기 | `git config core.hooksPath` (키만 있고 값이 없다) |

암묵 읽기가 인자 개수를 요구하는 바로 그 경우다 — `git config <key>` 는 읽기,
`git config <key> <value>` 는 쓰기다. 이 하나를 세지 않아 08-04 오탐이 났다.

kill 은 그대로 유지된다:

- `git config core.hooksPath <경로>` / `git config set core.hooksPath <경로>` (쓰기)
- `git config --unset core.hooksPath` / `git config unset core.hooksPath`
- `git -c core.hooksPath=…` (1회 재배치)
- `git push --no-verify`
- `GIT_CONFIG_COUNT`/`GIT_CONFIG_KEY_n`/`GIT_CONFIG_VALUE_n` 주입

**폴백 경로의 우선순위.** `HOOK_BYPASS_RE`(`:102-103`) 는 토큰화가 실패했을 때만 쓰인다.
거기서는 명령 경계를 신뢰할 수 없으므로 읽기 면제를 무조건 적용하면 안 된다 — 한 덩어리
안에 `git config --get core.hooksPath` 와 `git push --no-verify …:main` 이 함께 있으면
면제가 진짜 무력화를 가릴 수 있다.

순서를 고정한다: **`--no-verify`·`git -c core.hooksPath=`·`GIT_CONFIG_*` 주입을 먼저
독립적으로 판정해 하나라도 걸리면 kill**, 그 뒤에만 `git config` 읽기 면제를 적용하되
**같은 `git config` 명령 구간 안에서만** 적용한다. 즉 폴백에서 면제는 kill 을 이길 수 없다.

### §3 `conflict_resolution` 예외 구조를 제거한다

가드 **판정 로직** 안에서 `conflict_resolution` 을 읽는 곳은 `command-guard.js:1579` 와
`:1647` 두 곳뿐이고, 둘 다 `base_merge` 를 위한 것이다. `base_merge` 가 `warn` 이 되면 이
플래그가 가드 안에서 가리는 대상이 사라진다 — 그러면 그 값을 가드까지 실어나르던 전달
경로도 함께 목적을 잃는다.

**제거하는 것** — 가드로 들어가는 입력 경로뿐이다:

- `GuardContext` 의 `conflict_resolution` 필드(`command-guard.js:187`)와 `findMergeViolation`
  의 옵션 처리(`:1744`)
- `session.js` 의 가드 호출 인자
- `scheduler.js:3320` 이 runner settings 로 실어 보내는 전달
- `session-monitor.js:257-262` 가 재시작 감시 경로에서 가드에 넘기는 전달

**유지하는 것** — `scheduler.js:2493` 이 attempt 레코드에 쓰는 `conflict_resolution` 필드와
`:2726`·`:2826`·`:2966`·`:3090`·`:3185` 의 사용처. 이 필드는 충돌 해소 attempt 의 식별자로
가드 밖에서도 쓰이므로 건드리지 않는다.

기존 테스트 세 곳이 현행 동작을 명시적으로 고정하고 있어 함께 갱신 대상이다 —
`scheduler.test.js`(전달 여부), `session-monitor.test.js`(일반 attempt 의 merge kill),
`preamble.test.js`(`git merge` 절대 금지 문구). 이 셋을 갱신하지 않으면 제거와
`npm run all` green 을 동시에 만족할 수 없다.

### §4 랜딩 판정을 push 사실 위에 세운다

`base-drift.js` 의 오탐은 판정 근거가 **추정**이기 때문이다. 지금은 "이 커밋을 누가 먼저
가졌나" 를 reflog 획득 시각으로 재구성한다.

**커밋 그래프만으로는 provenance 를 알 수 없다.** `rev-list <시작점>..<종료 tip>` 은 "이
attempt 가 만든 커밋" 이 아니라 "그 구간에서 새로 도달 가능해진 커밋" 이다. attempt 가
로컬 커밋 `A` 를 만든 뒤 외부 base 커밋 `B` 를 흡수하면 구간에는 `A`·`B`·머지 커밋이 모두
들어간다. 그 상태에서 원격 base 에 `B` 만 반영돼 있으면 — 남이 올린 정상 이동인데 —
교집합이 비지 않아 랜딩으로 오판한다. §1 이 `base_merge` 를 허용하므로 이 혼합 상태는
드문 경우가 아니라 **정상 경로**가 된다. 시작점만 교정해서는 닫히지 않는다.

답을 추정할 필요가 없다. push 는 이 시스템에서 이미 가로채이고 있다.

**§4.1 pre-push hook 이 push 를 사실로 기록한다.** 선행 설계가 설치한 attempt 전용
pre-push hook(`$XDG_STATE_HOME/bdui/<slug>/guard-hooks/<attempt_id>/pre-push`)은 stdin 으로
`<local_ref> <local_oid> <remote_ref> <remote_oid>` 를 받는다 — git 이 계산한 목적지이며
명령 모양과 무관하다. 이 hook 이 판정을 내리기 전에 받은 줄을 같은 디렉터리의
`pushes.jsonl` 에 append 한다. 거부하는 push 도 기록한다(시도 자체가 증거다).

기록은 추정이 아니다. **`pushes.jsonl` 에 `remote_ref == refs/heads/<target_base>` 인 줄이
있는 attempt 만 랜딩 후보**이고, 없으면 base 가 아무리 움직였어도 이 attempt 의 손이 아니다.
08-03 오탐 4건은 push 기록이 아예 없으므로 여기서 닫힌다. 혼합 상태(`A` 생성 + `B` 흡수,
push 없음)도 같은 이유로 무위반이다.

**§4.2 시작점 기록을 사실로 바로잡는다 — 진단용이다.** 지금 `scheduler.js:2565-2575` 가
spawn **직후** 런타임 스냅샷에서 `head_oid: base_oid` 로 쓴다. 두 가지가 잘못돼 있다 — 값이
브랜치 tip 이 아니라 `base_oid` 의 복사본이고(`Analysis-ex0` 에서 두 값이 같은 이유), 읽는
시점이 자식 프로세스가 이미 커밋할 수 있는 시점이라 무엇을 재도 race 다.

`runner.spawn()` **이전에** `git rev-parse refs/heads/<bead_id>` 로 브랜치 tip 을 읽어
기록한다. 워크트리 pre-flight 가 이미 끝난 뒤이므로 브랜치는 존재한다. rev-parse 가
실패하면 `base_oid` 로 폴백하지 않는다 — 틀린 값을 사실인 척 남기지 않기 위해서다. 실패는
관측 불가(필드 부재)로 기록한다.

**이 값은 §4.3 의 판정에 쓰이지 않는다.** 판정은 push 기록만으로 선다. 이 절이 필요한
이유는 따로다 — 랜딩이 실제로 검출됐을 때 "그 attempt 가 어디서 출발했는가" 가 조사의
출발점이고, 지금 그 자리에는 `base_oid` 의 복사본이 사실인 양 들어 있다. 잘못된 진단
데이터를 남겨두는 것이 이 스펙이 고치려는 문제와 같은 종류다.

**§4.3 판정 절차.** 원격 base 가 pin 된 값에서 움직였을 때. 시작점은 여기 등장하지 않는다:

1. `pushes.jsonl` 에 base 를 향한 push 기록이 없다 → **무위반.** 여기서 대부분이 끝난다.
2. 기록이 있다 → 그 줄의 `local_oid` 가 원격 base 에서 도달 가능한지 확인한다. 도달 가능하면
   **랜딩**이고, 그 SHA 가 증거다.
3. hook 이 설치되지 않은 attempt(disposition 등 선행 설계의 제외 대상)는 지금처럼 관측
   대상이 아니다 — `skipped` 사유를 그대로 기록한다.

`head !== observed` 조건부 containment 분기와 reflog precedence 비교(`acquisitionTimes`,
`precedence_observe:*` 경로)는 이 사실 판정으로 대체되어 사라진다. "reflog 를 읽을 수 없으면
위반도 오탐과 함께 사라진다" 던 선행 설계의 절충도 함께 해소된다.

진짜 랜딩에 대한 처벌(attempt `failed`)은 그대로 둔다. 이 절은 판정 근거만 바꾼다.

**미탐 경계**: hook 을 타지 않은 경로로 base 가 움직이면 기록이 남지 않는다 — hook 무력화,
그리고 `gh` API 나 웹 UI 를 경유한 머지가 그렇다. 전자는 §1 에서 여전히 kill 이고, 후자는
사람의 행위이므로 애초에 이 판정의 대상이 아니다. 이는 추정 기반 판정이 오탐과 맞바꿔
갖고 있던 미탐과 성격이 다르다 — 어디가 비어 있는지 명시적으로 안다.

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
| `hook_bypass` 읽기 제외 | `server/worker/runner/command-guard.test.js` | 읽기 3형태(modern `config get`/`list`, legacy 명시 플래그, 암묵 `config <key>`) 통과, 쓰기·`set`/`unset`·`-c`·`--no-verify`·`GIT_CONFIG_*` 는 위반 유지 |
| 폴백 kill 우선순위 | `server/worker/runner/command-guard.test.js` | 토큰화 실패 입력에 읽기와 진짜 무력화가 섞이면 kill 이 이기는지 |
| `conflict_resolution` 가드 입력 제거 | `server/worker/runner/session.merge-guard.test.js` | 충돌 해소 여부와 무관하게 merge 가 `warn` 인지 |
| 전달 경로 제거 | `server/worker/scheduler.test.js` | runner settings 로 `conflict_resolution` 을 더는 싣지 않는지 |
| 재시작 경로 정합 | `server/worker/session-monitor.test.js` | 재시작 감시에서도 일반 attempt 의 merge 가 kill 이 아닌지 |
| 프리앰블 문구 | `server/worker/runner/preamble.test.js` | 바뀐 가드 계약을 고지하는지 |
| warn durable 기록 | `server/worker/session-monitor.test.js`, `server/worker/scheduler.test.js` | live·재시작 양쪽에서 경고가 attempt 레코드에 남고 세션 종료 후 조회되는지 |
| push 기록 | `server/worker/guard-hook.test.js` | hook 이 stdin 의 push 줄을 `pushes.jsonl` 에 남기는지(거부 케이스 포함) |
| 시작점 캡처 시점 | `server/worker/scheduler.test.js` | `spawn()` **이전**에 브랜치 tip 을 읽는지, rev-parse 실패 시 `base_oid` 로 폴백하지 않는지(신규·resume 양쪽) |
| push 사실 기반 랜딩 판정 | `server/worker/base-drift.test.js` | push 기록 없으면 무위반, base 를 향한 push 기록이 있고 도달 가능하면 랜딩 |

**회귀 고정** — 관측된 사건과 리뷰가 지적한 혼합 케이스를 각각 재현한다:

1. 08-03 `base_landing_detected` 2쌍 (커밋을 만들지 않은 attempt 가 남의 랜딩을 뒤집어쓴 건)
2. 08-04 `git config --get core.hooksPath` (순수 읽기)
3. 08-04 `git merge origin/main --no-edit` (정당한 base 동기화)
4. **mixed**: attempt 가 로컬 커밋을 만들고 **동시에** base 를 흡수했으나 push 하지 않은 상태
   에서 원격 base 가 남의 손으로 움직인 경우 → 무위반
5. **mixed 대조군**: 같은 상태에서 attempt 가 자기 커밋을 base 로 push 한 경우 → 랜딩

1–4 는 현재 코드에서 위반, 변경 후 무위반이어야 한다. 5 는 양쪽 모두 위반이어야 한다 —
완화가 진짜 랜딩까지 놓치지 않는다는 것이 이 대조군의 역할이다.

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

각 단계는 앞 단계가 확인된 뒤에만 진행한다. 중간에 멈춰도 상태는 회복 가능하다 — 4단계
이전에 멈추면 실행 중인 서버는 머지 이전 코드 그대로이고, 재개는 1단계 확인부터 다시 하면
된다.

1. **PR 머지 확인** — `gh pr view` 로 `MERGED` 와 머지 SHA 를 확보한다.
2. **공유 체크아웃이 안전한지 확인** — `git status --porcelain` 이 비어 있고 현재 브랜치가
   `main` 인지. 사용자 작업이 남아 있으면 여기서 멈춘다.
3. **base 동기화** — `git fetch --no-tags origin main` 후 `git merge --ff-only origin/main`.
   ff 가 불가능하면 하드 스톱이다(발산).
4. **머지된 코드인지 검증** — `HEAD == origin/main == 1단계의 머지 SHA`. 세 값이 일치할
   때만 다음으로 간다. 이 검증이 없으면 stale 체크아웃을 재시작하고도 성공으로 오인한다.
5. **런타임 설정 정합 확인** — `~/.config/bdui/config.toml`.
6. **재시작** — `bdui-shared restart`.
7. **실측 확인** — 프로세스 실행 경로가 이 체크아웃인지, 리스닝 포트, HTTP 응답. 셋이 모두
   머지된 체크아웃을 가리킬 때만 완료로 선언한다.

## 잔여 위험

1. **`base_merge` 가 `warn` 이 되면 merge 가 실제로 실행된다.** 세션이 base 를 브랜치로
   들이면 PR diff 에 머지 커밋이 남는다. 이는 충돌 해소 세션이 이미 하던 일과 같고, squash
   머지 시 중간 머지 커밋은 사라진다(`2026-07-26-worker-phase2-pr-queue.md:77`).
2. **훅 무력화는 여전히 클라이언트 측 방어다.** 세션은 훅 스크립트 파일에 접근할 수 있고,
   우회 의지가 있는 세션을 막지 못한다. 우회 불가능한 방어는 GitHub 브랜치 보호(서버 측)뿐이며
   이 저장소 코드 범위 밖이다 — 선행 스펙의 잔여 위험 4 를 그대로 승계한다.
3. **§4 의 랜딩 판정은 hook 의 push 기록에 의존한다.** 기록이 없는 attempt 는 판정할 수
   없고 무위반으로 흐른다. 이는 의도된 방향이다 — 이 검출층은 사후 관측이고, 예방은 hook
   자신이 이미 수행한다. 다만 hook 설치가 조용히 실패하면 검출층이 통째로 눈을 감으므로,
   설치 실패는 선행 설계대로 dispatch 실패로 다뤄져야 하며 이 스펙은 그 계약을 바꾸지 않는다.
4. **시작점 기록은 진단 품질에만 영향을 준다.** 신규·resume·충돌 해소가 모두 `spawn()`
   이전 캡처를 거치지 않으면 그 종류만 옛 값을 갖지만, 판정은 push 기록으로 서므로 오탐이나
   미탐으로 이어지지는 않는다. 증상은 조용하다 — 랜딩을 조사할 때만 드러난다. Test scope 가
   신규·resume 양쪽을 요구하는 이유이고, 이 항목이 blocking 이 아닌 이유이기도 하다.
5. **읽기 형태 판정은 열거에 기반한다.** `git config` 가 새로운 읽기 문법을 추가하면 목록이
   따라가야 한다. 누락 시 증상은 오탐(과잉 차단)이지 미탐이 아니므로 fail-closed 방향이다.
6. **`pushes.jsonl` 은 세션이 쓸 수 있는 파일이다.** 세션이 그 파일을 지우면 자기 랜딩을
   지울 수 있다. 잔여 위험 2 와 같은 성질이며 — 우회 의지가 있는 세션은 이 층의 대상이
   아니다 — 파일 삭제로 예방층 자체가 무력화되지는 않는다. hook 은 여전히 실행되고 push 를
   거부한다.
