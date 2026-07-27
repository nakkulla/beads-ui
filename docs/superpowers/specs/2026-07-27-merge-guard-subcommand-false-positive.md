# 워커 머지 가드: git merge 하위 명령 오탐 수정 (UI-zcrq)

## 문제 (실측)

`server/worker/runner/session.js:96`의 머지 가드
`BASE_INTO_BRANCH_RE = /git\s+merge\b/i`는 `\b`가 `merge`와 `-` 사이에서도
매치되므로, 머지 커밋·ref 갱신을 일으키지 않는 별도 하위 명령
`git merge-base`/`merge-tree`/`merge-file`(각각 조상 조회, 트리 수준 머지
시뮬레이션, 파일 3-way 병합 — 어느 것도 브랜치/ref를 움직이지 않음)을 실제
머지로 오인한다. 워커 세션의 workflow 스킬 드리프트 검사가 쓰는 표준 도구가
`git merge-base --is-ancestor`라서, 규정대로 행동하는 세션일수록 blocker +
SIGTERM으로 죽고 attempt는 `loud_fail_blocker`, 워크스페이스 `auto_advance`는
OFF가 된다.

실사례: dotfiles-nwr8 attempt `1785112180704-2` — `bypassPermissions` 세션이
`git merge-base --is-ancestor <spec-sha> HEAD` 실행 26초 만에 종료,
`permission_denials` 빈 배열(권한 문제 아님), node 실측으로 정규식이
`merge-base`/`merge-tree`에 매치함을 재현.

## 변경

`BASE_INTO_BRANCH_RE`를 **명시 허용목록** 방식으로 조정한다 — 허용목록에 없는
모든 `git merge*` 형태는 지금처럼 차단을 유지한다(fail-closed 범위 보존):

```js
const BASE_INTO_BRANCH_RE = /git\s+merge(?!-(?:base|tree|file)\b)/i;
```

- 계속 차단: `git merge`, `git merge origin/main`, `git merge --ff-only x`,
  대소문자 변형, 다중 공백, 그리고 허용목록 밖 하위 명령
  (`git merge-index`, `git merge-resolve`, `git merge-octopus` 등 —
  index/worktree를 변경할 수 있으므로 열지 않는다).
- 통과: `git merge-base ...`, `git merge-tree ...`, `git merge-file ...`
  (머지 커밋·ref 갱신 없음).
- conflict-resolution attempt 예외 게이트(기존 `!conflict_resolution` 분기)는
  변경하지 않는다.
- 가드 상수의 JSDoc에 허용목록 의도(하위 명령 세 개만, 그 외 merge-*는 계속
  차단)를 반영한다.

## 비목표

- `BASE_LANDING_RE`(`gh pr merge`/`git push ... main`)의 인접 오탐 표면
  (`[\s\S]*?`가 복합 명령을 가로지르는 문제)은 이번 실패의 원인이 아니므로
  건드리지 않는다 — 관찰만 Bead에 기록.
- 프리앰블 고지 문구 변경 없음(가드 의미는 "머지 금지" 그대로).
- 프런트엔드/번들 변경 없음.

## 수용 기준

1. `git merge-base --is-ancestor A HEAD`를 포함한 Bash tool_use가 blocker 없이
   통과한다(session 단위 테스트). `git merge-tree`/`git merge-file`도 통과한다.
2. `git merge origin/main`(및 `--ff-only` 변형)은 여전히
   `base_merge_blocked`로 차단된다.
3. 허용목록 밖 하위 명령 `git merge-index`/`git merge-resolve`는 여전히
   차단된다(허용 범위가 세 명령을 넘지 않음을 증명).
4. conflict-resolution attempt의 `git merge`는 여전히 허용된다(기존 테스트
   유지).
5. `npm run all` green.
