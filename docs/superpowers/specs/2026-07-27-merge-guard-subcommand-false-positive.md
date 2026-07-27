# 워커 머지 가드: git merge 하위 명령 오탐 수정 (UI-zcrq)

## 문제 (실측)

`server/worker/runner/session.js:96`의 머지 가드
`BASE_INTO_BRANCH_RE = /git\s+merge\b/i`는 `\b`가 `merge`와 `-` 사이에서도
매치되므로 읽기 전용 하위 명령 `git merge-base`/`merge-tree`/`merge-file`을
실제 머지로 오인한다. 워커 세션의 workflow 스킬 드리프트 검사가 쓰는 표준
도구가 `git merge-base --is-ancestor`라서, 규정대로 행동하는 세션일수록
blocker + SIGTERM으로 죽고 attempt는 `loud_fail_blocker`, 워크스페이스
`auto_advance`는 OFF가 된다.

실사례: dotfiles-nwr8 attempt `1785112180704-2` — `bypassPermissions` 세션이
`git merge-base --is-ancestor <spec-sha> HEAD` 실행 26초 만에 종료,
`permission_denials` 빈 배열(권한 문제 아님), node 실측으로 정규식이
`merge-base`/`merge-tree`에 매치함을 재현.

## 변경

`BASE_INTO_BRANCH_RE`를 하위 명령을 배제하도록 조정한다:

```js
const BASE_INTO_BRANCH_RE = /git\s+merge(?![\w-])/i;
```

- 계속 차단: `git merge`, `git merge origin/main`, `git merge --ff-only x`,
  대소문자 변형, 다중 공백.
- 통과: `git merge-base ...`, `git merge-tree ...`, `git merge-file ...`.
- conflict-resolution attempt 예외 게이트(기존 `!conflict_resolution` 분기)는
  변경하지 않는다.
- 가드 상수의 JSDoc에 하위 명령 배제 의도를 한 줄 반영한다.

## 비목표

- `BASE_LANDING_RE`(`gh pr merge`/`git push ... main`)의 인접 오탐 표면
  (`[\s\S]*?`가 복합 명령을 가로지르는 문제)은 이번 실패의 원인이 아니므로
  건드리지 않는다 — 관찰만 Bead에 기록.
- 프리앰블 고지 문구 변경 없음(가드 의미는 "머지 금지" 그대로).
- 프런트엔드/번들 변경 없음.

## 수용 기준

1. `git merge-base --is-ancestor A HEAD`를 포함한 Bash tool_use가 blocker 없이
   통과한다(session 단위 테스트).
2. `git merge origin/main`(및 `--ff-only` 변형)은 여전히
   `base_merge_blocked`로 차단된다.
3. conflict-resolution attempt의 `git merge`는 여전히 허용된다(기존 테스트
   유지).
4. `npm run all` green.
