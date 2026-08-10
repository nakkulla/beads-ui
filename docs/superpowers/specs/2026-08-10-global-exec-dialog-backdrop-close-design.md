# 전역 실행 설정 팝업 바깥 클릭 닫기 설계

- 날짜: 2026-08-10
- 사용자 확정: 프리셋 편집 중을 포함해 바깥 영역 클릭은 기존 `×`/`Escape`와
  동일하게 팝업을 닫는다.

## 1. 문제

Worker 탭의 「전역 실행 설정」은 native `<dialog>`로 열리지만 현재 닫기 동작이
`×` 버튼과 `Escape`에만 연결돼 있다. 이슈 상세, 세션 drawer, deferred popup 등
다른 modal 표면은 backdrop 클릭으로 닫히므로 같은 UI 안에서 동작이 일관되지
않는다.

## 2. 목표와 비목표

목표:

1. 전역 실행 설정 dialog 바깥 영역을 클릭하면 팝업을 닫는다.
2. dialog 내부의 select, button, input을 클릭할 때는 닫히지 않는다.
3. 바깥 클릭은 프리셋 편집 중에도 `×`/`Escape`와 같은 닫기 의미를 가진다.

비목표:

- 팝업의 레이아웃, 색상, 크기 또는 DOM 구조 변경.
- 프리셋 draft의 저장·초기화 정책 변경.
- 다른 dialog의 닫기 동작 변경.

## 3. 설계

`app/views/worker/exec-defaults-dialog.js`의 native `<dialog>`에 click listener를
등록한다. handler는 저장소의 deferred popup 선례처럼
`event.target === event.currentTarget`일 때만 기존 `close()`를 호출한다.

native dialog의 backdrop 클릭은 dialog 자체를 target으로 전달하지만 내부
컨테이너의 클릭은 자식 요소를 target으로 전달한다. 따라서 별도 backdrop DOM,
좌표 기반 경계 계산, CSS 변경 없이 두 경우를 구분할 수 있다. 닫기는 기존
`close()`를 통하므로 `is_open` 상태와 jsdom fallback도 현재 동작을 유지한다.
생명주기 누수를 막기 위해 `destroy()`에서 listener를 제거한다.

## 4. Test scope

`app/views/worker/exec-defaults-dialog.test.js`에 다음 동작을 각각 검증하는 단위
테스트를 추가한다.

1. 열린 dialog 자체에 click을 전달하면 `open` 상태가 제거된다.
2. 열린 dialog의 내부 container에 click을 전달하면 `open` 상태가 유지된다.

기존 `×`/`Escape`, 설정 변경, 프리셋 편집 동작은 변경하지 않는다.

## 5. 검증

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- frontend source 변경이므로 `npm run build` 후
  `app/main.bundle.js`, `app/main.bundle.js.map` 갱신 확인
- 머지 후 merged `main`에서 `npm run build` → `bdui-shared restart` → 실행
  프로세스 경로·포트·HTTP 응답 확인
