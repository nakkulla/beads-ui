# 화면 리디자인·가독성 — Board 시각 어휘 통일·세션 드로어·완료 레인 (UI-rkly)

- Bead: UI-rkly
- Route: spec_backed
- 날짜: 2026-08-03

## 배경

Board와 Worker는 색 토큰(`app/styles/tokens.css`)은 공유하지만 컴포넌트 어휘가
다르다: Board는 클래식 칸반 카드 룩(`app/styles/base.css`의 `.board-*`), Worker는
스테이지 색·타일 서페이스·KPI를 쓰는 관제탑 룩(`app/styles.css` "Worker console"
섹션, `app/styles.worker-theme.test.js`가 토큰 전용을 가드). 세션 드로어
(`app/views/worker/transcript-drawer.js`)는 진행 여부가 한눈에 안 보이고, Worker
완료 레인 행은 한 줄에 욱여넣어 제목이 잘린다.

관련: UI-ww8x(대기 레인 파킹 행 제목 세로 쪼개짐, deferred)와 related — 이
스펙의 레인 행 개선과 같은 계열이나 범위는 완료 레인으로 한정.

## 목표

1. 칸반 구조를 유지한 채 Board의 시각 어휘를 Worker 관제탑 룩으로 통일.
2. 세션 드로어에서 "지금 진행되고 있는지"가 한눈에 보이게.
3. Worker 완료 레인 행을 2줄 레이아웃으로 가독성 개선.

## 설계

### 1. Board 시각 어휘 통일

- 구조 불변: 칸반 컬럼, 드래그 앤 드롭, reorder, Closed 접힌 스트립, `.board-*`
  클래스와 DOM 구조는 그대로 둔다. 변경은 스타일 계층에 한정.
- 적용 어휘:
  - 컬럼 헤더: 스테이지색 스파인 + 카운트(Worker 레인 헤더·KPI와 호응).
    컬럼→토큰 매핑은 다음 표로 고정한다(Worker 5단계 색과 Board 6컬럼은
    일대일이 아니므로 명시 매핑):

    | 컬럼        | 스파인 토큰        |
    | ----------- | ------------------ |
    | Blocked     | `--accent-warn`    |
    | Ready       | `--stage-plan-on`  |
    | In progress | `--stage-impl-on`  |
    | Resolved    | `--stage-merge-on` |
    | Deferred    | `--text-dim`       |
    | Closed      | `--stage-merge-dim`|
  - 카드: Worker 타일과 같은 서페이스/보더/호버 문법, 칩·타이포·간격 통일.
  - In progress 컬럼은 실행중 타일 서페이스(`--bg-tile-run` 계열)로 활성감 부여.
- 픽셀 수준 결정(간격·크기·호버 디테일)은 구현 시 `frontend-design` 스킬로
  잡는다. 스펙은 "Worker 어휘로 통일"이라는 방향과 구조 불변 제약만 고정.
- 가드: base.css board 블록의 토큰 전용(raw hex 금지) 검사는 **회귀 가드**로
  추가한다(현재도 통과하는 상태 유지 가드임을 명시). 변경 전 실패하는 RED
  assertion은 새 CSS 계약 쪽에 둔다 — 컬럼 헤더 스파인 존재와 위 표의 스테이지
  토큰 사용, In progress 컬럼의 `--bg-tile-run` 계열 서페이스 등.

### 2. 세션 드로어 진행 가시성

- 상단 바(`.sv__bar`): 라이브 하트비트 점 + 마지막 이벤트 경과시간(예: "3초
  전"). 라이브 attempt가 아니면(스냅샷 전용) 표시 생략.
- `last_event_at` 원천: 세션 로그 payload에는 이벤트 시각이 보장되지 않으므로
  세션 로그 스토어(`app/data/session-log-store.js`)에 `last_event_at`을
  도입한다 — snapshot 수신 시 서버가 로그 파일 mtime을 함께 실어 보내고,
  append는 클라이언트 수신 시각으로 갱신한다.
- 드로어는 열려 있는 attempt를 추적해 큐 스냅샷 갱신마다 라이브 여부 메타를
  갱신한다 — 실행 중에 연 세션이 완료(running→done)되면 하트비트가 사라져야
  한다(현재 drawer open 시점 status만 전달되는 구조를 교정).
- phase/gate 라인을 구분선 수준의 시각 계층으로 승격(현재는 일반 라인과 구분
  약함).
- 진행 중인 tool 라인(마지막 미완료 tool)을 드로어 하단에 sticky로 고정 —
  스크롤 위치와 무관하게 "지금 뭘 하는지"가 보인다. 완료되면 sticky 해제.
- 연속 tool 라인 묶음 접기: 같은 종류가 5개 이상 연속되면 접힌 그룹으로
  렌더하고 클릭 시 펼침. 기존 라이브 따라가기(`follow`) 동작은 유지.

### 3. Worker 완료 레인 2줄 행

- 완료 레인 행을 2줄 레이아웃으로, 줄별 내용 계약을 고정한다(현재도 조건부로
  두 줄이 렌더되므로 "2줄 존재"가 아니라 내용 배치가 계약):
  - 1줄: Bead id + 제목만(가로 전체 사용, usage 배지 금지)
  - 2줄: τ·비용, `added_at` 기반 완료 시각, 액션 버튼 등 메타
- 행 높이 증가로 렌더 개수가 부담되면 기존 표시 상한 정책을 따른다(새 상한
  도입 없음).

## Test scope

- board CSS: 새 계약 RED assertion(컬럼 스파인 토큰 매핑 표·In progress
  서페이스) + 토큰 전용(raw hex 금지) 회귀 가드.
- 기존 테마 전환 테스트(`app/main.theme.test.js`)·워커 테마 가드 회귀 통과.
- 드로어: 하트비트 표시/생략(라이브·스냅샷), snapshot mtime/append 수신 시각
  기반 `last_event_at` 갱신(fake timer), running→done 전환 시 하트비트 제거,
  sticky 현재 tool 라인 고정/해제, 연속 tool 접기 단위 테스트.
- 완료 레인 행: 1줄에 usage 부재·2줄에 메타 배치를 검증하는 단위 테스트
  (vacuous "2줄 존재" 검사 금지).

## 비범위

- Board 레이아웃 재구성(칸반 유지 — 사용자 결정으로 시각 어휘 통일만).
- 대기 레인 파킹 행 수정(UI-ww8x 별도).
- 모바일 리본 재설계.
- 드로어의 이벤트 파싱 규칙(`transcript-render.js`) 의미 변경.

## 완료 기준

- Board가 Worker와 같은 시각 어휘로 보이되 칸반 상호작용은 회귀 없음.
- 드로어에서 라이브 여부·현재 작업이 스크롤 없이 파악된다.
- 완료 레인 제목이 일반적인 길이에서 잘리지 않는다.
- Pre-Handoff Validation(lint/tsc/test/prettier/build) 통과.
