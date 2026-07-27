# 워커 claude 판정: permission_denials 오탐 — 회복된 훅 거부를 인터랙티브 차단으로 오판 (UI-hje0)

## 문제 (실측)

1. claude 러너는 `--permission-mode bypassPermissions`로 무인 실행되지만, 이
   모드에서도 PreToolUse 훅 거부(예: 대용량 unbounded Read 가드)와 settings deny
   규칙은 여전히 적용되고, 거부된 호출은 stream-json `result` 이벤트의
   `permission_denials` 배열에 기록된다.
2. 현재 두 경로가 이 배열을 인터랙티브 차단으로 취급한다:
   - `detectQuestion()`(`server/worker/runner/claude.js`)의 result-이벤트 분기 —
     non-empty면 blocker 이벤트 + SIGTERM + `loud_fail_blocker`.
   - `verdict()` 3규칙 — 마지막 result의 `permission_denials !== []`를 실패로.
3. 실측: attempt `UI-ki09-1785142766809-2` — 훅이 unbounded Read 1건을 거부,
   세션은 청크 Read로 자가 회복해 `subtype: "success"`, `is_error: false`,
   exit 0으로 완료하고 PR #46까지 열었는데, blocker 판정으로 attempt failed +
   자동 진행 off(수동 ▶ 요구). 세션 로그
   `~/.local/state/bdui/beads-ui-*/sessions/UI-ki09-1785142766809-2.jsonl`의
   최종 result가 증거.
4. 판정 의도 오류: bypassPermissions 무인 세션에서 "사람 승인 대기"는 발생하지
   않는다. denial은 세션에 tool error로 전달되고 세션은 계속 진행한다. 진짜
   인터랙티브 신호는 질문 도구 사용(mid-stream `tool_use`, `QUESTION_TOOL_RE`)
   이며 별도 경로로 이미 감지된다.

## 변경: permission_denials를 차단 신호에서 제거

1. `detectQuestion()`의 result-이벤트 `permission_denials` 분기를 제거한다 —
   질문 도구 감지(`QUESTION_TOOL_RE`)만 남긴다.
2. `verdict()`에서 `permission_denials === []` 규칙을 제거한다 — 마지막 result의
   `subtype === 'success' ∧ is_error === false` 2규칙으로 판정한다.
3. 파일 헤더 주석의 3규칙 서술을 동반 갱신한다.

## 안전성 논거 (fail-closed 그물 유지)

- 질문 도구 blocker와 merge 가드 blocker는 변경 없음.
- denial 때문에 실제 작업이 안 됐다면 세션 자가 보고가 아니라 독립 검증
  (`verifyPrSubmitted` PR 관측, verify_cmd)이 잡는다 — 성공 오인 경로 없음.
- denial 증거는 per-attempt 세션 로그의 result 이벤트에 이미 durable하게
  남는다 — 관측성 손실 없음.

## 비목표

- attempt 스키마/큐 스토어/UI 변경 없음 — 과거 attempt의
  `permission_denials non-empty` cause_detail 표시는 역사적 기록으로 유지.
- 프리앰블·merge 가드 변경 없음. 프런트엔드 변경 없음(서버 전용, 번들 재빌드
  불요).

## 수용 기준

1. 마지막 result가 `subtype success ∧ is_error false`이면서
   `permission_denials`가 non-empty인 세션이 성공으로 판정된다(기존 rule-4
   테스트를 새 의미로 교체).
2. result 이벤트의 `permission_denials`는 mid-stream에서도 더 이상 blocker를
   발생시키지 않는다(`session.merge-guard.test.js`의 해당 케이스 교체).
3. 질문 도구·merge 가드 blocker, `no_result`/`subtype`/`is_error` 실패 판정의
   기존 테스트는 그대로 green.
4. Pre-Handoff Validation green(tsc/test/lint/prettier; 서버 전용이라 번들
   diff 없음).
