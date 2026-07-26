# 워커 세션 진행상황·이슈 상세를 모달 팝업으로 전환 (UI-89q5)

사용자 피드백: 우측 사이드패널은 가시성이 낮고, 워커 탭 인라인 드로어는 레인을
밀어내 진행상황이 눈에 안 들어온다. 둘 다 화면 중앙 모달 팝업으로 전환한다.

## 변경 1 — 이슈 상세: 우측 슬라이드 패널 → 중앙 모달

- 현재: `.detail-overlay`가 `justify-content: flex-end`로 우측 정렬, 패널 폭
  `min(420px, 92vw)` (`app/styles/base.css`).
- 변경: 데스크톱(>640px)에서 중앙 정렬 모달로 표시.
  - 오버레이: `justify-content: center; align-items: center`.
  - 패널: 폭 `min(720px, 94vw)`, `max-height: 88vh`, 라운드 보더, 내부 스크롤
    유지.
- 유지: backdrop 클릭 닫기, `role="dialog" aria-modal="true"`, 열기 진입점
  (보드 카드 클릭, 워커 실행 타일 ⓘ, 워커 mini/card 행 클릭 — ID 영역은
  복사 동작이라 제외), md-viewer 중첩 오버레이.
- 모바일(≤640px): 기존 전체화면 동작 그대로.

## 변경 2 — 워커 탭 세션 진행상황 드로어: 인라인 → 모달 오버레이

- 현재: `createTranscriptDrawer`가 워커 탭에서는 컨트롤 바와 레인 사이 인라인
  마운트(레인을 아래로 밀어냄), 상세 패널에서는 `.session-log-root .sv`
  fixed 오버레이로 이미 동작 (`app/views/worker/transcript-drawer.js`,
  `app/views/worker/index.js`).
- 변경: 워커 탭 마운트도 fixed 모달 오버레이로 전환 — 동일 컴포넌트 재사용,
  마운트 루트에 오버레이 클래스 부여 + backdrop 추가.
  - backdrop 클릭 또는 기존 ✕ 버튼으로 닫기.
  - 데스크톱: 중앙 모달(폭 `min(860px, 94vw)`, `max-height: 85vh`).
  - 모바일: 기존 `.session-log-root` 하단 시트 스타일 재사용.
- 열기 진입점(현행 유지): 실행 타일 본문 클릭 → transcript 드로어. 타일 ⓘ는
  이슈 상세, mini/card ID는 복사 — 진입점 자체는 바꾸지 않는다.
- 유지: follow 토글 등 드로어 내부 기능, 실행 타일의 ⏸/▶/■ 컨트롤(드로어와
  별개, 변경 없음), 상세 패널 쪽 세션 로그 오버레이 동작.

## 수용 기준

1. 워커 탭에서 실행 타일 본문 클릭 시 레인 레이아웃이 밀리지 않고 모달로
   진행상황이 뜨고, backdrop/✕로 닫힌다.
2. 이슈 상세가 데스크톱에서 중앙 모달로 뜨고, 모바일에서는 전체화면 유지.
3. 기존 드로어·상세 패널 기능(팔로우, 타일 ⏸/▶/■, 편집, md-viewer) 회귀
   없음 —
   `npm run tsc`·`npm test`·`npm run lint` 통과, 번들 재생성 포함.

## 비목표

- md-viewer 등 중첩 오버레이의 구조 변경.
- 서버/프로토콜 변경, 드로어 내부 기능 추가.
- 애니메이션/트랜지션 신규 도입.
