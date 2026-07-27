# 워커 머지 가드 argv 기반 재작성 + blocker/verify 실패 진단 기록 (UI-2o4z)

## 문제 (실측)

1. **가드 오탐 재발.** 2026-07-27 15:45 KST, dotfiles-h3z2 attempt
   `1785133571486-1`이 아래 읽기 전용 명령 실행 시점에 죽었다:

   ```
   rg -n "permissions|contents:|pull-requests:|gh pr merge|merge" .github/workflows/ai-pr-review.yml
   ```

   `BASE_LANDING_RE`(`server/worker/runner/session.js:84`)가 rg **검색 패턴
   문자열 안의** 리터럴 `gh pr merge`에 substring 매치 → blocker +
   SIGTERM(exit 143) → `loud_fail_blocker`, `auto_advance` OFF. UI-zcrq(#35)가
   비목표로 기록해 둔 "BASE_LANDING_RE 인접 오탐 표면"의 실제 발병이다. 근본
   원인은 개별 정규식이 아니라 **명령 문자열 전체에 substring 정규식을 돌리는
   방식 자체** — 인용 토큰(검색 패턴·커밋 메시지·문서 인용)과 실제 명령 위치를
   구분하지 못한다.

2. **blocker 사망의 진단 불가.** attempt에는 `cause: 'loud_fail_blocker'`만
   남아, 어떤 명령이 어떤 가드에 걸렸는지는 세션 JSONL을 수동으로 뒤져야만
   알 수 있다.

3. **verify 실패의 진단 불가.** 같은 날 dotfiles-k61b의 post_merge_verify가
   `verify_worktree_failed`로 멈췄지만, `runVerifyAtSha`의
   catch(`server/worker/verify-cmd.js:345`)가 `addDetached`가 던진 git stderr를
   버려서 원인 확정이 불가능했다(2분 뒤 재시도는 성공 — 일시 장애로 추정만
   가능했다).

## 변경

### ① command-guard 모듈 (신규 `server/worker/runner/command-guard.js`)

머지 가드를 "문자열 정규식 매치"에서 "토큰화 기반 argv 위치 검사"로 바꾼다.
의존성 추가 없음(자체 구현, 사용자 결정 2026-07-27).

- **토크나이저**: POSIX 인용 3종(`'…'`, `"…"`(+`\` 이스케이프), 맨몸 `\`)을
  처리해 단어 목록을 만들고, 구분자(`;`, `&&`, `||`, `|`, `&`, 개행)로 단순
  명령들로 나눈다. `$(…)`/백틱 내용은 중첩 명령 문자열로 따로 추출한다.
  **heredoc**: `<<[-]?['"]?DELIM` 리다이렉션을 인식해 본문을 delimiter 행까지
  데이터로 소비한다(명령 위치 검사 대상 아님). heredoc이 인터프리터
  (`bash|sh|zsh`) 명령의 stdin이면 본문을 중첩 명령 문자열로 추출해 재귀
  검사한다. 비대칭 인용, 미종결 heredoc, 함수 정의 등 해석이 확정되지 않는
  입력은 `null`을 반환한다(폴백 트리거) — "판정 불가"는 언제나 폴백이지
  통과가 아니다.
- **`findMergeViolation(cmd, { conflict_resolution })`** →
  `{ reason: 'merge_to_base_blocked'|'base_merge_blocked', command }` 또는
  `null`. 단순 명령마다:
  - **argv 선두 정규화**: 선행 `VAR=값` 할당 토큰(래퍼와 무관하게), 셸
    예약어(`if`, `then`, `else`, `elif`, `fi`, `do`, `done`, `while`, `until`,
    `for`, `case`, `esac`, `{`, `}`, `!`), 리다이렉션 토큰을 스킵하고,
    argv[0]은 **basename으로 정규화**한다(`/usr/bin/gh` → `gh`).
  - 래퍼 프리픽스를 스킵한다 — `env`(뒤따르는 `VAR=값` 할당 토큰 포함),
    `command`, `nohup`, `time`, `timeout <n>`, `xargs`(플래그 스킵 후 나머지를
    argv로 재검사). 제한 목록이며, 목록 밖 래퍼는 스킵하지 않는다.
  - argv 선두가 `gh pr merge` → `merge_to_base_blocked`.
  - argv 선두가 `git push` → 옵션 토큰은 소비하고(값을 갖는 `-o`/
    `--push-option`/`--repo`/`--receive-pack`/`--exec`는 다음 토큰까지,
    `--x=y` 형태는 그 토큰만), **첫 positional은 repository로 소비해 검사하지
    않으며**, 이후 refspec 토큰의 **destination**(콜론 뒤; 콜론이 없으면 토큰
    전체)이 `(^|/)(main|master)$`에 걸리면 `merge_to_base_blocked`.
    (기존 정규식은 push 뒤 아무 데나 `main`이 보이면 차단했다 — argv 기준은
    도착 브랜치가 main/master인 경우만 본다. `git push origin main:feature`,
    `git push main feature`(remote 이름이 `main`)는 base 착지가 아니므로
    통과. 의도된 의미 강화다.)
  - argv 선두가 `git merge` → `merge-base`/`merge-tree`/`merge-file` 허용목록
    제외 후, `conflict_resolution` attempt가 아니면 `base_merge_blocked`
    (기존 예외 게이트 유지).
  - **인터프리터 재귀**: `bash|sh|zsh -c <문자열>`의 문자열 인자,
    `eval <인자…>`(공백 join), 추출된 `$(…)`/백틱 내용은 각각 재귀 검사한다.
    rg/grep 등 비인터프리터의 인자는 재귀하지 않는다 — 이것이 오탐/미탐의
    경계선이다.
  - **폴백(fail-closed 보존)**: 토큰화 실패 시 기존 정규식
    `BASE_LANDING_RE`/`BASE_INTO_BRANCH_RE`로 판정한다. 두 정규식 상수는
    session.js에서 이 모듈로 이동하고 JSDoc에 폴백 용도를 명시한다.
- `session.js:236-268`은 정규식 직접 test 대신 이 모듈을 호출한다. blocker
  이벤트 구조(`kind/reason/message/raw`)와 SIGTERM 경로는 그대로 유지하고,
  `message`에는 매치된 단순 명령을 담는다.

### ② blocker 진단 기록

- `RunnerVerdict`에 `blocked_detail: { reason, command }|null` 추가 — 머지
  가드는 둘 다 채우고, 대화형 질문 blocker(`detectQuestion`)는 `command` 없이
  `reason`만 채운다(`command: null`).
- `scheduler.onSessionDone`의 blocker 실패 경로: `failAttempt` 시 attempt
  patch에 `cause_detail: { reason, command }`를 저장한다(명령은 512자
  truncate). 다른 실패 경로는 `cause_detail` 없음(기존과 동일).
- **round-trip**: `updateAttempt`는 `makeAttempt` 재구성을 거치므로
  `Attempt` typedef와 `makeAttempt`(queue-store.js:276)에 `cause_detail`
  필드를 추가해야 patch가 유실되지 않는다 — object(`isRecord` 검사) 아니면
  `null`로 정규화. `normalizeQueue`의 attempts 로드도 같은 `makeAttempt`
  경로라 재시작 후에도 보존된다.
- 실패 배너: `app/views/worker/index.js`의 failure 조립(:813-821)에
  `cause_detail`을 전달하고, `running-grid.js` 배너에 **guard reason과 매치
  명령을 모두** 표시한다(명령은 `<code>` 한 줄, truncate; `command`가 null인
  질문 blocker는 reason만). lit-html 텍스트 바인딩이므로 이스케이프는
  자동이다.
- 디스코드 알림 정합: 미구현 스펙
  `2026-07-27-worker-discord-notify-design.md`의 실패 알림 본문 명세에
  "`cause_detail`이 있으면 포함" 한 줄을 정정으로 추가한다(구현은 UI-2yoq
  소유).

### ③ verify 실패 stderr 보존

- `runVerifyAtSha`의 `addDetached` catch: 던져진 에러 메시지(git stderr 포함)
  를 `detail`(512자 truncate)로 보존해
  `{ ok: false, reason: 'verify_worktree_failed', exit: null, detail }`을
  반환한다. `VerifyCmdResult` typedef에 optional `detail` 추가.
- `pr-actions.js`: `postMergeVerify`가 `detail`을 함께 반환하고,
  `failCleanup(bead_id, step, reason, base_sync, restore_bd, detail?)` →
  `recordCleanupFailure`에 전달한다.
- `queue-store.js recordCleanupFailure`: 레코드에 optional `detail` 저장.
  기존 레코드에 없는 필드이므로 하위호환(fail-quiet 표시).
- **round-trip**: `CleanupFailure` 계열 typedef, `normalizeQueue`의
  `cleanup_failed` 로드(:405-417), `app/views/worker/index.js`의
  `cleanup_failures` projection(:648)이 모두 고정 필드 복사라 세 곳 모두에
  `detail`을 명시적으로 추가해야 서버 재시작·배너 조립에서 유실되지 않는다.
- cleanup 배너(`running-grid.js`)에 `detail`이 있으면 한 줄 표시.
- pre-merge verify 경로는 같은 결과 객체를 `verify_cmd_result`로 저장하므로
  `detail`이 자연 전파된다(별도 배선 없음).

## 비목표

- PATH shim·pre-push 훅 등 실행 지점 차단 — 후속 UI-p4c7 소유.
- `verify_sha_unavailable` 경로(fetch 실패)의 detail 보존 — 이번 실패의
  원인이 아니므로 범위 밖(관찰만).
- 워커 세션 프리앰블 고지 문구 변경 없음(가드 의미는 "머지 금지" 그대로).
- `detectQuestion` 계열 blocker의 판정 로직 변경 없음(②의 기록만 추가).

## 수용 기준

1. 실측 오탐 명령(위 rg 패턴)이 blocker 없이 통과한다(session 단위 테스트).
   `git commit -m "gh pr merge 관련 수정"` 같은 인용 토큰 케이스, 그리고
   `cat <<'EOF' … gh pr merge … EOF` 같은 **비인터프리터 heredoc 본문**도
   통과한다.
2. `gh pr merge 311`, `git push origin main`, `git push origin HEAD:main`,
   `git merge origin/main`(+`--ff-only` 변형)은 여전히 차단된다.
   `FOO=1 gh pr merge 311`(할당 프리픽스), `/usr/bin/gh pr merge 311`(절대
   경로), `if true; then gh pr merge 311; fi`(예약어 프리픽스)도 차단된다.
3. `bash -c "gh pr merge 311"`, `eval 'git merge x'`, `$(gh pr merge 311)`,
   `bash <<'EOF' … gh pr merge … EOF`(인터프리터 heredoc)은 차단된다(재귀
   검사).
4. 비대칭 인용·미종결 heredoc 등 토큰화 실패 입력은 기존 정규식과 동일하게
   판정된다(폴백).
5. `git merge-base --is-ancestor A HEAD` 통과와 conflict-resolution attempt의
   `git merge` 허용은 기존 테스트 그대로 green. `git push main feature`
   (remote 이름이 `main`, 도착 브랜치는 `feature`)는 통과한다.
6. loud_fail_blocker attempt에 `cause_detail { reason, command }`가 저장되고
   실패 배너에 **reason과 매치 명령이 모두** 표시된다. `updateAttempt` →
   `makeAttempt` 재구성과 queue.json 리로드를 거쳐도 보존된다(round-trip
   테스트).
7. `verify_worktree_failed` 시 `cleanup_failed` 레코드에 git stderr `detail`이
   저장되고 cleanup 배너에 표시된다. 서버 재시작(`normalizeQueue` 리로드)
   후에도 배너에 남는다(round-trip 테스트).
8. Pre-Handoff Validation 전체 green(tsc/test/lint/prettier) + `npm run build`
   번들(`app/main.bundle.js`(.map)) 포함.
