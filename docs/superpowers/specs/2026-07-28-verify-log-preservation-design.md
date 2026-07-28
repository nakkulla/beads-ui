# post_merge_verify 실패 증거 보존 — 전체 로그 파일 (UI-0x54)

## 배경

2026-07-28 dotfiles-fvkk post_merge_verify 실패에서 `cleanup_failed.output_tail`
(마지막 100줄/8KB 캡)만 남아 shell 테스트 실패 1건의 정체가 복구 불가였다.
dotfiles 러너는 shell FAIL 상세를 pytest 출력보다 앞에 인쇄하므로 tail 캡에서
항상 잘리고, 러너의 로그 디렉터리도 EXIT trap으로 삭제된다. verify 실패의
사후 진단에 충분한 증거가 harness 측에 남아야 한다.

## 목표

verify 실행의 전체 출력(stdout+stderr)을 상태 디렉터리에 파일로 보존하고,
실패 레코드와 UI에서 그 경로를 찾을 수 있게 한다. queue.json의 tail 캡은
그대로 둔다 (queue.json 크기 한도는 기존 설계 의도).

## 설계

`server/worker/verify-cmd.js` `runVerifyCmd`:

- `runVerifyCmd`는 현재 `cwd/cmd/timeout_ms`만 받고 cwd는 임시 detached
  worktree라 로그 경로를 스스로 결정할 수 없다. 명시적 옵셔널 파라미터
  **`log_context: { workspace_root, bead_id, sha, started_at_ms }`**를
  추가하고, `runVerifyAtSha`가 자기 입력(repo·bead_id·sha)에서 채워
  전달한다. `log_context` 부재 시 로깅 없음 — 같은 러너를 공유하는
  deploy 호출 경로는 `log_context`를 전달하지 않아 명시적으로 제외된다.
- 스트리밍 캡처(기존 16KB 윈도우)와 병행으로 전체 출력을
  `$XDG_STATE_HOME/bdui/<slug>/verify-logs/verify-<bead_id>-<sha7>-<ts>.log`
  에 tee한다 (`<slug>`는 `log_context.workspace_root`를 state-paths.js
  슬러그로 변환 — cwd가 아님, `<ts>`는 `started_at_ms`).
- 파일당 **10MB 캡**: 초과분은 버리고 파일 끝에 절단 마커 한 줄을 남긴다.
- 회전: 쓰기 시작 시 디렉터리에서 mtime 오래된 순으로 **최신 20개**만
  남기고 삭제한다.
- 로그 쓰기 실패는 어느 단계든(open/write/close) verify 결과에 영향을
  주지 않는다 (fail-quiet, debug 로그만). 로그 스트림의 flush·close가
  완료된 뒤에만 결과에 `log_path`를 확정하고, open 이후 어떤 단계에서든
  오류가 나면 판정은 유지한 채 `log_path`를 생략한다 — 불완전한 파일을
  가리키는 경로를 남기지 않는다. 성공 verify도 로그는 남긴다 (다음
  실패의 비교 기준이 되고, 회전이 총량을 통제).

레코드/표시:

- `runVerifyAtSha` 결과 객체에 옵셔널 `log_path`(절대 경로)를 추가하고,
  `postMergeVerify` 실패 시 `cleanup_failed` 레코드에 저장한다. cleanup
  재시도는 새 verify 실행의 새 로그 파일 경로로 `log_path`를 덮어쓴다.
  attempt 기록(`attempts[*].verify_result`)으로의 전파는 스코프에서
  제외한다 — local verify 결과는 현재 attempt에 영속되지 않으며 연결
  규칙 신설은 이 Bead의 목적(실패 증거 보존) 밖이다. queue.json 내부
  스키마의 옵셔널 키 추가이므로 구버전 queue.json 로드는 영향 없음
  (키 부재 허용).
- worker 탭의 cleanup 실패 배너에 `전체 로그: <경로>` 한 줄을 추가한다.
  `log_path` 부재 시 표시 생략 (fail-quiet).

워크플로 계약 표면(라벨·durable metadata·status 어휘)은 건드리지 않는다 —
`log_path`는 queue.json 내부 키로, dotfiles 계약 문서 대상이 아니다.

## 테스트 범위

- 전체 출력이 로그 파일에 보존된다 (tail 캡보다 큰 출력에서 앞부분 포함).
- 10MB 초과 시 절단 마커가 남는다.
- 디렉터리가 20개를 넘으면 오래된 파일이 삭제된다.
- `log_path`가 결과 객체와 `cleanup_failed`에 기록되고, deploy 경로
  (`log_context` 부재)에서는 로그 파일이 생기지 않는다.
- 로그 open 실패와 **중간 write/close 실패** 각각에서 verify 결과가
  변하지 않고 `log_path`가 생략된다.
- 배너 렌더: `log_path` 유/무 각각.

## 비범위

- dotfiles run-tests.sh 요약 줄 개선(실패 이름 명시)은 dotfiles-lvc8 소유.
- 성공 로그의 별도 UI 노출, 로그 뷰어 — 파일 경로 제공까지만.

## 검증

`npm run tsc` / `npm test` / `npm run lint` / `npm run prettier:write` /
`npm run build` (번들 포함 커밋).
