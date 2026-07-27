# worker gh 호출에 --repo 명시 — fork PR 미관측(pr_missing) 근본 수정

- Bead: UI-no11 · route: spec_backed · 날짜: 2026-07-27

## 문제

worker의 gh 어댑터(`server/worker/gh.js`)는 모든 PR 명령을 `--repo` 없이
`cwd=repo_dir`로 실행해 gh의 default-repo 해석에 의존한다. beads-ui처럼
origin(fork) + upstream 두 remote가 있고 `gh repo set-default`가 미설정이면 gh가
upstream(mantoni/beads-ui)을 조회한다. 실사고(2026-07-27, UI-kzxz): 세션이
fork에 PR #39를 정상 생성했는데 `openPrForBranch`가 `[]`(exit 0)를 받아
`pr_missing`으로 fail-closed → attempt 실패 + auto_advance 자동 꺼짐.
`gh repo set-default`는 환경별 우회일 뿐이라 다른 체크아웃/새 clone에서 재발한다.

## 변경 사항

1. `createGh`에 repo_dir → `--repo` 값 해석기를 추가한다:
   `git remote get-url --push origin`을 repo_dir에서 실행해
   `git@HOST:OWNER/REPO(.git)` / `ssh://git@HOST/OWNER/REPO(.git)` /
   `https://HOST/OWNER/REPO(.git)` 세 형태를 파싱한다. HOST가 `github.com`이면
   `OWNER/REPO`, 그 외 호스트는 `HOST/OWNER/REPO` 형태로 만든다.
2. 해석 결과는 repo_dir별로 메모이즈하되 `checkAvailability`와 같은 60초 TTL을
   둔다(remote 교체가 영구히 안 보이는 상태를 금지).
3. PR 오퍼레이션 6개(`openPrForBranch`, `prDetail`, `prChecks`, `mergeSquash`,
   `updateBranch`, `closePr`) 전부 argv에 `--repo <해석값>`을 추가한다.
   `checkAvailability`는 저장소 무관이므로 제외.
4. 해석 실패(origin 부재, 파싱 불가, git 실패)는 조용한 폴백이 아니라 3-state
   `error`(`reason: 'origin_unresolvable'`)로 반환한다 — verify는 이를
   `gh_observation_failed`(관측 불능)로 읽으므로 `pr_missing`(작업 실패)과
   구분된다. 조용히 `--repo` 없이 실행하는 폴백은 이 버그의 재발 경로라 금지.

## 비목표

- git 명령(`fetch`/`worktree` 등) 경로 변경 없음 — origin을 이미 명시한다.
- UI/프런트엔드 변경 없음(서버 전용, 번들 재생성 불필요).
- 기존 `gh repo set-default` 설정 제거/의존 없음(있어도 무해, 없어도 동작).

## 수용 기준

1. 주입된 `run` 스텁으로 6개 오퍼레이션 argv에 `--repo OWNER/REPO`가 포함됨을
   테스트로 확인(ssh/https/GHE 호스트 파싱 케이스 포함).
2. 해석 실패 시 `{ state: 'error', reason: 'origin_unresolvable' }` 반환 테스트.
3. 메모이즈: 동일 repo_dir 연속 호출에서 git 스폰 1회(TTL 내) 테스트.
4. `npm run tsc` / `npm test` / `npm run lint` / `npm run prettier:write` 통과.
5. 머지 후 `bdui-shared restart` + 실제 워커 관측 정상(공유 서버 검증).
