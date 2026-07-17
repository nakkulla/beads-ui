# 새로고침 시 마지막 확인 워크스페이스 유지

날짜: 2026-07-17 · 대상: beads-ui `app/main.js` · 라우트: spec_backed

## 문제

새로고침하면 항상 `default_workspace`(현재 config: dotfiles)로 돌아간다. 원인 체인:

1. 새 WebSocket 연결은 서버 전역 `DEFAULT_WORKSPACE`(=`~/.config/bdui/config.toml`의
   `default_workspace`)로 시드된다 (`server/ws/connection.js:200-209`). 서버 변경은 불필요.
2. 클라이언트는 수동 워크스페이스 전환 성공 시 `localStorage['beads-ui.workspace']`에
   저장하고 (`app/main.js:767`), 부트스트랩의 `loadWorkspaces()`에 복원 분기가 있다
   (`app/main.js:923-933`).
3. 그러나 `app/main.js:915-921`의 선행 분기가 `configuredDefault`가 설정되어 있고
   현재(=서버 기본)와 같으면 **저장값을 default로 덮어쓰고 조기 반환**하므로,
   default가 설정된 한 복원 분기는 절대 실행되지 않는다.
4. 이 우선순위("default가 저장값을 이긴다")는 `app/main.workspace-default.test.js:34`에
   의도된 계약으로 고정되어 있다. 본 스펙은 그 계약을 **의도적으로 개정**한다
   (원 출처: 2026-04-23 bdui-config-toml 스펙의 default_workspace 의미).

## 결정

마지막으로 확인한(수동 선택해 저장된) 워크스페이스가 새로고침 후에도 유지된다.
`default_workspace`는 "저장값이 없거나 무효일 때의 폴백"으로 의미가 좁아진다.

## 변경: `loadWorkspaces()` 복원 우선순위

`app/main.js:915-921`의 configuredDefault 조기 반환 블록을 제거하고, 복원 규칙을
다음으로 통일한다:

1. `saved`가 있고 `available`에 존재하며 `saved !== current.path` →
   `handleWorkspaceChange(saved)` (성공 시 자체적으로 localStorage 재기록).
2. `saved`가 있으나 `available`에 없음 → `localStorage` 제거, current 유지 (현행 유지).
3. `saved` 없음 → current(=서버 기본) 유지. localStorage에 default를 선기록하지
   않는다 — 기록은 수동 전환(`handleWorkspaceChange`) 성공 시에만 발생.
4. `hidden` 여부는 판정에 관여하지 않는다 (현행 유지).
5. 루프 안전성: 복원 후 `workspace-changed` 이벤트로 `loadWorkspaces()`가 재진입해도
   `saved === current.path`가 되어 규칙 1이 발화하지 않는다 (현행 구조 그대로).

서버·config·프로토콜 변경 없음. 클라이언트 단일 파일 수정.

## Test scope

- `app/main.workspace-default.test.js` (유일 seam):
  - 기존 "does not restore a saved workspace over configured default" 테스트를
    반전: saved(`/repo-b`)가 available에 있으면 default(`/repo-a`)가 설정되어 있어도
    `set-workspace {path:'/repo-b'}`가 호출된다.
  - 추가: saved 없음 + default 설정 → `set-workspace` 미호출, localStorage 비어 있음.
  - 유지: stale saved 제거 테스트 (default null 케이스 → default 설정 케이스도 동일
    동작 확인으로 보강 가능).

## 검증

`npm run all` (lint + tsc + vitest + prettier). 머지 후 공유 서비스 마감 단계:
`bdui-shared restart` + 프로세스/HTTP 검증.

## 비범위

- 깨진 워크스페이스(ResearchVault 등) 복원 시 보드 에러 다이얼로그가 뜨는 문제
  (수동 선택과 동일 동작; 별도 유닛).
- 서버측 last-workspace 저장(멀티 브라우저 동기화) — localStorage per-browser로 충분.
