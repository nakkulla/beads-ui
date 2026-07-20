# 복원 가드: 숨긴 워크스페이스는 복원하지 않는다

날짜: 2026-07-20 · 대상: beads-ui `app/main.js` · 라우트: spec_backed

## 문제

2026-07-17 last-workspace-restore 스펙의 규칙 4는 "`hidden` 여부는 판정에 관여하지
않는다"로 고정했다. 그 결과 픽커에서 숨긴 워크스페이스도 저장값이면 새로고침마다
복원된다. 2026-07-19 실사고: 아카이브 사본 dotfiles(stale 포트 3307 메타데이터)를
잘못 클릭 → `localStorage['beads-ui.workspace']`에 저장 → 새로고침마다 죽은
워크스페이스가 복원되어 "계속 로딩중" 고착. 픽커 숨김 처리로 목록에서는 사라졌지만
복원 경로(`app/main.js:913-925`)는 `hidden`을 보지 않아 방어가 뚫려 있다.

## 결정

숨김(hidden)은 "이 워크스페이스를 쓰지 않겠다"는 사용자 의사표시이므로 복원 대상에서
제외한다. 2026-07-17 스펙의 규칙 4를 의도적으로 개정한다: saved가 hidden 집합에
있으면 available 부재와 동일하게 무효 처리한다.

## 변경: `loadWorkspaces()` 복원 판정

`app/main.js:913-925`의 판정을 다음으로 개정한다(번호는 2026-07-17 스펙 규칙 기준):

1. (유지) saved가 available에 있고 **hidden에 없으며** saved !== current.path → 복원.
2. (개정) saved가 available에 없거나 **hidden 배열에 포함** → localStorage
   `beads-ui.workspace` 제거, current 유지, 복원 호출 없음.
3. (유지) saved 없음 → current 유지, 선기록 없음.
4. (개정) hidden 여부가 판정에 관여한다 — 위 1·2에 반영.
5. (유지) 루프 안전성 구조 변화 없음.

hidden 판정은 이미 수신하는 `result.hidden`(절대경로 문자열 배열, 서버
visible-workspaces-store가 resolve해 전달)을 사용한다. 서버·프로토콜·픽커 변경 없음.
소스 수정은 `app/main.js` 단일 파일이며, git 추적 빌드 산출물
`app/main.bundle.js`·`app/main.bundle.js.map`을 `npm run build`로 재생성해 같은
커밋에 포함한다.

## Test scope

- `app/main.workspace-default.test.js` (유일 seam):
  - 추가: saved가 available에 존재하지만 hidden에도 포함 → `set-workspace` 미호출 +
    localStorage `beads-ui.workspace` 제거.
  - 유지: 기존 복원/폴백/stale 제거 테스트 전부 통과.

## 검증

`npm run build` 후 `npm run all` (lint + tsc + vitest + prettier). 머지 후 공유
서비스 마감: 머지된 체크아웃에서 번들 최신 여부 재확인 → `bdui-shared restart` +
프로세스/HTTP 검증.

## 비범위

- discovery scan 제외(scan_exclude) 기능 — 아카이브 디렉토리 이동(별도 유닛 A)으로 대체.
- 픽커 동명 항목의 상위 경로 표시, 깨진 워크스페이스 에러 다이얼로그 — 별도 유닛.
- 서버측 hidden 검증(set-workspace가 hidden 경로를 거부) — 복원 경로 가드로 충분,
  수동 선택 의미는 유지.
