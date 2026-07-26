# 워커 claude 판정: 복수 result 오판 수정 + 프리앰블 가드 계약 고지 (UI-t3wk)

## 문제 (실측)

1. `server/worker/runner/claude.js`의 `verdict()`는 stream-json `result` 이벤트가
   **정확히 1개**일 때만 성공으로 본다(`results.length !== 1 → 'result_count'`).
   그런데 headless `claude -p` 세션이 백그라운드 태스크(예: codex 리뷰 브리지)를
   쓰면 task-notification 재기동으로 턴마다 result가 1개씩 쌓여, 실제로 성공한
   세션도 무조건 `session_failed:result_count`가 된다. 실측: attempt
   `UI-2wa9-1785066918311-1` — 구현·검증·push(d96e62a)까지 성공, result 2개
   (두 번째 origin `task-notification`), 최종 판정 failed.
2. 세션 엔진의 fail-closed merge 가드(`session.js` `BASE_INTO_BRANCH_RE`: 모든
   `git merge`를 즉시 SIGTERM)가 세션에 사전 고지되지 않는다. 실측: attempt
   `UI-2wa9-1785076768091-1` — 백업 브랜치를 `git merge --ff-only`로 이어받으려다
   즉사. 또한 세션이 백그라운드 태스크를 대기 상태로 둔 채 턴을 끝내면 headless
   프로세스가 종료되며 대기 태스크가 kill된다(리뷰 유실).

## 변경 ①: verdict 판정 대상을 마지막 result로

- `verdict()`의 판정 대상을 "유일한 result"에서 **마지막 result**로 바꾼다.
- result 0개 → `no_result` 유지. `result_count` 사유는 제거한다.
- 나머지 3규칙(`subtype === 'success'`, `is_error === false`,
  `permission_denials`가 빈 배열)은 마지막 result에 적용한다.
- 중간 result의 `permission_denials`는 기존 `detectQuestion` 경로가 스트림 중에
  이미 blocker로 처리하므로(모든 result 이벤트 검사) 안전성 저하는 없다.
- 파일 헤더 주석의 "single result" 4-rule 서술을 동반 갱신한다.

## 변경 ②: 프리앰블 가드 계약 고지

- `server/worker/runner/preamble.js`에 **모든 세션**에 주입되는 가드 고지 상수를
  추가한다. 내용 두 가지:
  - `git merge` 절대 금지(충돌 해소 attempt 제외) — 위반 시 엔진이 세션을 즉시
    종료한다는 사실 고지.
  - 백그라운드 태스크를 대기 상태로 둔 채 턴을 끝내지 말 것(headless 종료 시
    태스크 유실).
- `applyPreamble` 조합에 고정 포함한다(fast_track처럼 조건부가 아님). 삽입
  위치는 구현 재량.

## 비목표

- merge 가드 자체의 완화·변경(가드는 유지; 고지만 추가).
- conflict-resolution attempt별 프리앰블 분기(고지 문구에 예외를 명시하는 것으로
  충분).
- codex 러너 대응(현 워커의 러너는 claude 단일).
- 프런트엔드 변경 없음(서버 전용) — 번들 재빌드 불요.

## 수용 기준

1. result가 복수이고 마지막 result가 규칙을 만족하는 세션이 성공으로 판정된다.
2. 마지막 result가 `subtype`/`is_error`/`permission_denials` 위반이면 여전히
   실패로 판정된다.
3. result 0개는 여전히 `no_result` 실패다.
4. 모든 세션 프롬프트에 merge 금지·백그라운드 태스크 고지가 포함된다
   (`preamble.test.js` 동반 갱신).
5. 기존 verdict 테스트 갱신(2-result 실패 케이스 → 새 의미로 교체) + 신규
   복수-result 성공/실패 케이스 포함 `npm run all` green.
