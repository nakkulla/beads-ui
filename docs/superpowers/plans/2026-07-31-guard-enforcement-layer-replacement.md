# UI-8mvc 가드 강제층 교체 — 구현 계획

## Context

워커 세션이 base 브랜치에 직접 랜딩하는 것을 막는 강제가 한 층(`runner/command-guard.js`)에 몰려 있고, 그 층은 자기가 볼 수 없는 것을 판정한다. 가드가 받는 것은 명령 문자열 하나뿐이라(`runner/session.js:396`) cwd 도 remote 도 모른 채 "어느 저장소의 base 인가"를 텍스트로 추정한다. 선행 `UI-lhwp`(PR #78)가 판정 주어를 `(repo, target_base)` 로 교정했지만 **층위는 그대로**여서, 증명 실패가 곧 세션 SIGTERM 이고(실측 21분·$11 손실) 미탐 3건이 남았다 — 비-`INTERPRETERS` 실행 경로, python subprocess 형태, 자기 repo 루트로 `cd` 후의 base push.

이 계획은 강제 층 자체를 옮긴다. **예방**은 git 이 목적지 ref 를 알려주는 pre-push hook 이, **검출**은 attempt 종료 시 원격 base 와 attempt 커밋의 도달 관계를 보는 사후 불변식이 맡고, 텍스트 가드는 자기가 정확히 볼 수 있는 것(hook 무력화 시도, `gh pr merge`)만 kill 한다.

- 승인 스펙: `docs/superpowers/specs/2026-07-30-guard-enforcement-layer-replacement-design.md` @ `042bfc5752db1438def27d21fb670880a3cd0a37` (spec_review `codex@042bfc57…`, 발행 완료)
- 실측 전제: `--no-verify` 로 hook 이 우회되고 remote base 가 실제로 이동함(예방만으로 닫히지 않는 근거) · `GIT_CONFIG_*` 주입은 **모든 저장소**에 적용됨(hook 이 스스로 repo 를 판정해야 하는 근거)
- 배선 지점은 전부 실측 확인됨: attempt 레코드가 이미 `repo`·`target_base`·`disposition`·`external_conflict`·`base_oid` 를 durable 하게 들고 있어(`queue-store.js` `makeAttempt`), 세 층 모두 새 상태 저장소 없이 그 레코드에서 판정 주어를 읽는다.

**이 세션의 종료점은 계획 확정(Plan Delivery)이다.** Bead 는 `open` 으로 남고, parent claim·phase child·구현 편집은 실행 진입 크로싱의 몫이다.

## Phase 1: 가드 효과를 `kind` 로 분리하고 hook 무력화를 kill 대상에 넣는다

`command-guard.js:1362`(`gh pr merge`)와 `:1371`(`git push` base 랜딩)이 **같은** `reason: 'merge_to_base_blocked'` 를 돌려주므로 reason 기준으로는 한쪽만 강등할 수 없다. 효과 결정을 `kind` 로 옮기는 것이 나머지 전부의 선행이다.

1. `MergeViolation` 에 `kind: 'git_push_base'|'gh_pr_merge'|'hook_bypass'|'base_merge'` 를 추가하고 argv 경로의 반환 지점(`:1362`·`:1371`·`git merge` 분기)에 부여한다. `reason` 은 기존 attempt 레코드 표시 호환으로 유지하되 효과 결정에 쓰지 않는다.
   **fallback 정규식도 함께 분리해야 한다** — `baseLandingRegex(:56-70)` 는 `gh pr merge` 와 `git push <base>` 를 하나의 alternation 으로 판정하므로 반환 지점 하나에 단일 kind 를 줄 수 없다. 잘못 주면 파싱 불가한 `gh pr merge` 가 경고로 강등되거나 파싱 불가한 base push 가 계속 kill 된다. 두 형태를 별개 정규식으로 나눠 각각 `gh_pr_merge`/`git_push_base` 를 돌려준다.
2. hook 무력화 4형태를 argv 위치로 판정해 `kind: 'hook_bypass'` 를 돌려준다 — `git push --no-verify` · `git -c core.hooksPath=…` · `git config … core.hooksPath` · 명령 앞 대입으로 `GIT_CONFIG_COUNT`/`KEY_*`/`VALUE_*` 재정의. `git push -n` 은 `--dry-run` 이므로 대상이 아니다.
3. `GuardContext` 에 `disposition` 을 추가한다. disposition 세션은 base publish 가 본업이므로(`revise-disposition.js:62`) `git_push_base` 와 `hook_bypass` 를 적용하지 않는다 — 현재 코드에서 disposition 이 본업 수행 시 SIGTERM 당하는 결함의 수정이다.
4. 효과 표를 한 곳(`command-guard.js` 의 export 헬퍼)에 두고 `session.js` 가 그것을 쓴다: `git_push_base` → kill 없이 경고 이벤트, 나머지 셋 → 기존 blocker+SIGTERM 경로. `session.js:246-255` 의 컨텍스트 구성에 `settings.disposition` 을 더한다.

**검증**: `npm test -- command-guard session` — 효과 표 테이블 테스트(4 kind), hook 무력화 4형태 kill, 실측 사고 2건과 allowlist 반례 3종이 **경고**로 판정, disposition 컨텍스트에서 미적용, 파싱 불가 입력의 두 형태(`gh pr merge` → kill / base push → 경고)가 갈리는지, `gh pr merge --repo <다른 저장소>` 도 kill 되는지(완료조건 #12).

## Phase 2: 재시작 후 감시 경로를 같은 효과 표에 정합시킨다

`session-monitor.js:255-258` 은 `findMergeViolation(cmd, { conflict_resolution })` 만 호출한다 — `repo`·`target_base`·`disposition` 을 넘기지 않으므로, 서버 재시작 후 detached 세션을 이어 감시하는 경로는 legacy `main|master` 이름 매칭으로 **모든** 위반을 kill 한다. 재시작 한 번이면 Phase 1 이 무너진다. `UI-lhwp` 가 주어를 교정하며 남긴 공백이다.

1. monitor entry(`:296-302`)에 `repo`·`target_base`·`disposition` 을 추가한다. `start(workspace, attempt)` 가 이미 attempt 레코드를 통째로 받으므로 새 배선 없이 그 자리에서 읽는다.
2. `handleLine` 의 가드 호출이 Phase 1 의 효과 표를 그대로 쓰게 한다 — 경고는 `sessionLog.publish` 로 내보내고 kill 은 기존 `guardKill` 을 탄다.

**검증**: `npm test -- session-monitor` — 자기 base push 는 경고, 다른 repo base push 는 무판정, disposition 세션은 미적용. live runner 와 같은 판정 함수를 공유함을 코드로 확인.

## Phase 3: 예방 층 — pre-push hook 자산·설치·배선

1. `state-paths.js` 에 `guardHookDir(workspace_root, attempt_id)` 를 추가한다(`$XDG_STATE_HOME/bdui/<slug>/guard-hooks/<attempt_id>`, 기존 `sessionLogPath` 관용구와 동형).
2. 새 모듈 `server/worker/guard-hook.js` — `install({ workspace, attempt_id, repo, target_base })` 가 디렉터리와 `/bin/sh` `pre-push`(실행 권한)를 쓰고 `envFor()` 가 `GIT_CONFIG_*` 세 키를 돌려준다. `remove()` 는 best-effort 정리. `repo`·`target_base` 는 **스크립트에 리터럴로 박는다**(환경변수 전달은 세션이 덮어쓸 수 있다).
   hook 판정 두 단계: ① `git rev-parse --path-format=absolute --git-common-dir` 를 정규화해 attempt repo 와 비교, 불일치면 `exit 0` ② stdin 각 줄의 `remote_ref` 가 `refs/heads/<target_base>` 와 정확히 일치하면 `exit 1`(삭제 push 포함, remote 이름은 보지 않음).
3. `scheduler.js` 배선 — 설치는 **base 재해석 직후·워크트리 pre-flight 앞**(`:1938`과 `:1947` 사이). 그 지점에는 워크트리도 attempt 레코드도 스탬프도 없으므로 실패가 `refuseDispatch(…, 'guard_hook_install_failed')` 만으로 잔재 없이 끝난다. `launchSession` 에서는 `settings.env` 에 `envFor()` 를 병합만 한다(전달은 상태를 만들지 않는다). 상속된 `GIT_CONFIG_COUNT` 가 있으면 덮어쓰지 않고 다음 인덱스에 이어 붙인다. disposition attempt 는 설치도 배선도 하지 않는다. resume·conflict 경로도 같은 "상태 변경 전" 규칙을 따른다.
4. 정리를 **잔재가 남을 수 있는 모든 지점**에서 보장한다 — attempt 정상 종료뿐 아니라 `install()` 자신의 부분 실패, 그리고 설치 후 spawn 전에 조기 반환하는 모든 경로(pre-flight 거부·admission 거부·workflow_mode 기록 실패·spawn 실패)에서 `remove()` 를 호출한다. 완료조건 #17 이 요구하는 것은 배지가 아니라 zero-residue 다.

**검증**: `npm test -- guard-hook session.env` + 새 통합 테스트(임시 repo + bare remote) 8케이스 — base 거부 · 비-base 통과 · 다른 저장소 통과 · base 삭제 거부 · **main checkout 에서의 자기 base push 거부**(미탐 #3) · **`python3` subprocess 가 수행한 base push 거부**(미탐 #2) · **`node` 등 비-`INTERPRETERS` 자식이 수행한 base push 거부**(미탐 #1) · `--no-verify` 우회(문서화된 한계). 뒤의 두 케이스가 완료조건 #4 의 증명이며, Phase 1 의 경고 강등 테스트는 그 증명이 아니다.
**zero-residue 검증**: `guard_hook_install_failed` 경로와 `install()` 부분 실패에서 refusal 배지가 뜨고 hook 자산·워크트리·attempt 레코드·workflow_mode/exec 스탬프가 **전부** 남지 않음을 확인한다(완료조건 #17).

## Phase 4: 검출 층 — 사후 base 불변식

1. `gh.js` 에 `mergedPrForBranch(repo_dir, branch)` 를 추가한다 — `openPrForBranch(:436)` 와 같은 모양에 `--state merged`. 기존 3-state 계약(`ok`/`empty`/`error`)을 그대로 따른다.
2. `queue-store.js` `makeAttempt` 에 `base_drift` 필드를 추가한다(`{ pinned, observed, landed, via, skipped, error }` 중 해당 항목만).
3. 새 모듈 `server/worker/base-drift.js` — `observeBaseDrift({ attempt, resolveBase, git, gh })`:
   - 대상 밖(`disposition` · `base_oid` 없음 = external-conflict `scheduler.js:2808`)이면 `{ skipped }` 만 기록하고 끝낸다.
   - `resolveBase({ force: true })` 로 현재 원격 tip 을 얻는다(`pr-actions.js` 가 머지 직전에 쓰는 **같은 dependency seam**; raw `resolveTargetBase` 가 아니다).
   - tip 이 `base_oid` 와 같으면 종료. 다르면 A = `rev-list <base_oid>..refs/heads/<bead_id>`, B = `rev-list <base_oid>..<tip>` 의 교집합을 본다.
   - 교집합이 있으면 **PR 머지 경유를 먼저 배제**한다 — `mergedPrForBranch` 가 머지를 보고하면 `landed:true, via:'pr_merge'` 로 기록하고 위반이 아니다(merge-commit 방식 머지와 사람의 ff push 오탐 차단). PR 관측 실패도 위반으로 삼지 않는다.
   - 배제되지 않은 교집합이 위반. 교집합 SHA 를 증거로 남긴다. 관측 실패(fetch·rev-list·PR)는 실패 step 기록 후 정상 경로 진행.
4. **의존성 배선** (모듈과 같은 phase 안에서, 모듈이 실제로 호출되기 전에 확정한다) — `createScheduler` 의 `SchedulerDeps` 에는 현재 `gh` 도 `gitRun` 도 없다(`verify`·`worktree` 만 자체적으로 갖고 있다). `attach.js` 가 이미 만들어 둔 `gitRun` 과 `gh` 인스턴스를 scheduler(또는 주입되는 observer 객체)에 연결하고, production 배선이 실제로 연결되었는지 확인하는 live-wiring 테스트를 둔다. 이 배선 없이는 `observeBaseDrift` 가 단위 테스트에서만 도는 코드가 된다.
5. `scheduler.js` 의 **세 종료 경로**가 프로세스 종료 후·브랜치 정리 전에 호출한다 — 정상 종료(`onSessionDone` 의 disposition 분기 `:1065`와 PR 관측 `:1140` 사이) · 사용자 ⏸/■(`stopped` 조기 반환 `:1041-1055`) · 재시작 후 정리(`disposeDeadAttempt:1550`). 위반이면 `failAttempt(cause='base_landing_detected')` 로 큐 정지+배너. 되돌림(force push/revert)은 하지 않는다.

**검증**: `npm test -- base-drift scheduler gh` — 검출 8케이스(이동 없음 · 남이 이동 · 랜딩 위반 · PR MERGED 배제 · ff push 배제 · 브랜치 밖 커밋 미탐 · 관측 실패 · skip 기록) + 세 종료 경로 각각의 호출 테스트 + `gh.test.js` 에서 `mergedPrForBranch` 의 argv(`--state merged`)와 3-state 변환(`ok`/`empty`/`error`) + attach live-wiring 테스트.

## Phase 5: 프리앰블 정합·통합 검증·PR

1. `preamble.js:62` `GUARD_CONTRACT_DIRECTIVE` (3)번 항을 정정한다 — base push 는 hook 이 거부하고, 즉시 종료되는 것은 `gh pr merge` 와 hook 무력화 시도다.
   **기존 회귀 테스트도 같은 커밋에서 교체해야 한다** — `preamble.test.js:185-188` 이 `'다른 저장소의 base'` 와 `'증명'` 을 단언한다. 그 문구는 텍스트 가드가 kill 권한을 쥐던 시절의 계약이므로, 프리앰블만 고치면 테스트가 깨지고 테스트만 남기면 계약이 어긋난다. 새 계약(hook 이 거부 · `gh pr merge` 와 hook 무력화는 즉시 종료)을 단언하도록 바꾼다(완료조건 #16).
2. `npm run all`(lint·tsc·test·prettier:check) green.
3. 실 dispatch 1회로 hook 이 실제 워커 환경에서 동작함을 실측한다(`GIT_CONFIG_*` 주입 · hook 설치 · `--git-common-dir` 절대 경로 비교).
4. `implementation` 게이트 → PR 생성(`gh pr create --base main`) → **PR Delivery stop**. 머지하지 않는다.

**검증**: `npm test -- preamble` + `npm run all` green + 실 dispatch 실측 기록 + implementation 게이트 영수증.

## Phase 6: 머지 후 배포 (별도 크로싱)

머지 클릭 또는 `pr-finish` 이후에만 실행한다. `bdui-shared restart` → 프로세스 실행 경로가 머지된 체크아웃인지, 포트, HTTP 응답을 확인한다. 완료 조건 #19 가 여기에 걸려 있다.

**검증**: `bdui-shared status`(또는 `projectmgr status beads-ui` — `projectmgr status` 는 name positional 이 필수라 인자 없이는 실행되지 않는다) 로 running 확인 → `ps -o command= -p <pid>` 로 실행 경로가 머지된 체크아웃인지 대조 → `lsof -nP -iTCP -sTCP:LISTEN | grep <pid>` 로 포트 → `curl -sS -o /dev/null -w '%{http_code}' http://<host>:<port>/` 로 HTTP 응답.

## Test scope

RED→GREEN 으로 진행하는 seam:

| seam | 위치 | phase |
| --- | --- | --- |
| 위반 `kind` 별 효과 결정 | `command-guard.js` 효과 표 + `session.js` 적용 | 1 |
| fallback 두 형태 분리(파싱 불가 입력) | `command-guard.js` `baseLandingRegex` | 1 |
| hook 무력화 4형태 판정 | `command-guard.js` argv 판정 | 1 |
| `gh pr merge --repo` kill 유지 | `command-guard.js` argv 판정 | 1 |
| disposition 제외 | `command-guard.js` `GuardContext` | 1 |
| 재시작 감시 경로 판정 컨텍스트 | `session-monitor.js` entry + `handleLine` | 2 |
| hook 스크립트 판정(2단계) | `guard-hook.js` + 통합 테스트 | 3 |
| 미탐 #1·#2 차단(비-`INTERPRETERS`·python subprocess) | hook 통합 테스트 | 3 |
| 설치 실패 zero-residue | `guard-hook.js` + `scheduler.js` 거부 경로 | 3 |
| `GIT_CONFIG_*` 배선 | `scheduler.js` → `session.js:291` | 3 |
| `mergedPrForBranch` argv·3-state | `gh.js` | 4 |
| observer 의존성 live wiring | `attach.js` → `createScheduler` | 4 |
| `observeBaseDrift` 판정 | `base-drift.js` | 4 |
| 세 종료 경로 호출 | `scheduler.js` | 4 |
| 프리앰블 고지 계약 교체 | `preamble.js` + `preamble.test.js:185-188` | 5 |

제외:

- **`--no-verify` 우회**는 고칠 수 없는 한계라 RED 가 아니라 **문서화된 동작**으로 고정한다(통과를 단언하는 테스트).
- **브랜치 밖 커밋의 검출 미탐**도 같다 — 예방 층이 닫는 대상이고 검출 층은 못 잡는다는 것을 테스트가 명시한다.
- **`git merge` 가드(`base_merge`)** 는 효과가 바뀌지 않으므로 기존 회귀 테스트만 유지하고 새 RED 를 만들지 않는다.
- **Phase 6 배포 검증**은 런타임 실측이며 자동 테스트 대상이 아니다.
