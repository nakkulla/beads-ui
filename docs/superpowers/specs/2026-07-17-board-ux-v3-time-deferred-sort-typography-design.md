# Board UX v3: 시각 표시 · Deferred 가시화 · 정렬 선택 · 타이포 확대

## 배경과 목표

컨트롤타워 Board(v2, PR #18)에 대한 사용자 요구 5건을 한 번에 반영한다.

1. 카드·상세 패널에서 이슈 생성/수정 시각이 보여야 한다.
2. deferred 이슈를 Board에서 볼 수 있어야 한다.
3. 기본 정렬은 생성순(최신이 위), 정렬 규칙은 필터바 우측 드랍다운으로 변경
   가능해야 한다.
4. 전체 폰트 크기를 키워 가독성을 높인다.
5. 디자인 스킬(frontend-design 등)을 활용해 전반 폴리시를 다듬는다.

## 1. 생성/수정 시각 표시

- Board 카드 하단 메타 행을 `생성 {상대시각} · 수정 {상대시각}`으로 교체
  (`formatRelativeTime`), hover 툴팁에 로컬 절대시각(`YYYY-MM-DD HH:mm`).
  기존 단일 elapsed(수정∥생성 축약)는 이 행으로 대체.
- 로컬 절대시각 포맷터: 기존 `formatTimestampTitle`은 UTC ISO를 반환하므로
  재사용하지 않는다. `relative-time.js`에 로컬 타임존 `YYYY-MM-DD HH:mm`을
  반환하는 헬퍼(예: `formatTimestampLocal`)를 추가해 툴팁·상세 패널이 공유한다.
- 상세 패널 속성 영역에 생성/수정 로컬 절대시각 표시(읽기 전용 행, 동일 헬퍼).

## 2. Deferred 가시화

- 서버: `list-adapters`에 `deferred-issues`
  (`bd list --json --tree=false --status deferred --limit 1000`) 추가,
  `validators` 허용 타입에 등록.
- 클라: `BOARD_SUBS`에 `['tab:board:deferred', 'deferred-issues']` 추가.
  필터바 우측에 `Deferred N` 토글 — 켜면 Resolved와 Closed 사이에 Deferred
  컬럼 렌더(2026-04-21 구 설계의 "기본 숨김 + 토글 펼침" UX 계승, 세션 로컬
  상태, 영구 저장 없음).
- 드래그: Deferred 컬럼으로 드롭 시 status `deferred`(mutation은 기존 허용
  목록에 이미 포함), Deferred에서 타 컬럼으로 상태 변경도 동일 경로.
- 정렬·재정렬 일관성: Deferred는 Blocked/Ready/In progress/Resolved와 완전히
  동일하게 취급한다 — 선택된 정렬 규칙의 적용 대상이며, `수동(드래그)`
  모드에서는 REORDER 대상(`REORDER_COLS`)에 포함되어 같은 컬럼 내 드래그
  재정렬을 허용한다(공유 랭크 맵 사용).
- 레이아웃 계약(5→6컬럼): `.board-root`는 고정
  `repeat(4, minmax(260px,1fr)) auto` 트랙이므로 Deferred 표시 시 Closed가
  다음 행으로 밀린다. Deferred 표시 상태에서 `board-root--deferred` 수정자
  클래스로 `repeat(5, minmax(220px, 1fr)) auto`로 전환한다(모바일 1열 스택은
  기존 미디어쿼리 유지). 데스크톱 뷰포트에서 6트랙이 한 행에 렌더되는지
  시각 점검한다.

## 3. 정렬 선택 드랍다운

- `sort.js`에 비교자 추가: 생성 오래된순, 수정 최신순, 우선순위순(P0 우선,
  동순위는 생성 최신순). 생성 최신순은 기존 `cmpCreatedDescThenPriority` 재사용.
- 필터바 우측(새 이슈 버튼 왼쪽) 정렬 드랍다운:
  `생성 최신순(기본) / 생성 오래된순 / 수정 최신순 / 우선순위순 / 수동(드래그)`.
  선택은 `localStorage('beads-ui.board.sort')`에 저장.
- 적용 대상: Blocked/Ready/In progress/Resolved/Deferred 컬럼.
  Closed는 `closed_at desc` 유지.
- Worker 격리 seam: `createListSelectors`는 Worker 후보 레인도 공유하므로
  기본 동작(수동 rank = `cmpEffectiveRank`)은 바꾸지 않는다.
  `selectBoardColumn(client_id, mode, sort_mode?)`에 선택적 `sort_mode`
  파라미터를 추가하고 Board만 이를 주입한다. 미지정(기존 호출부 = Worker)은
  현행 그대로. Worker 후보 레인이 종전 수동 rank 정렬을 유지함을 회귀
  테스트로 고정한다.
- `수동(드래그)` 모드에서만 같은 컬럼 내 드래그 재정렬 허용(기존 ui-order 랭크
  경로 그대로). 다른 모드에서 same-column 드롭은 토스트 안내 후 무시.
  크로스 컬럼 드롭(상태 변경)은 모든 모드에서 허용.
- 기본값 변경의 의미: 기존 v2의 "수동 순서 기본"을 Board 탭에 한해 사용자
  지시로 대체한다(수동 랭크 데이터는 보존, `수동` 모드 선택 시 그대로 재사용;
  Worker는 영향 없음).

## 4. 타이포 확대

- `tokens.css`의 `--fs-*` 스케일을 전 단계 +2px (8→10 … 15→17).
- 파생 레이아웃(스테퍼 bar 높이/line-height, 칩 패딩, 컬럼 최소폭 등)을 시각
  점검하고 필요한 곳만 미세 조정. 새 raw hex 금지(토큰만 사용).

## 5. 디자인 폴리시

- 사용 스킬 확정: `frontend-design@claude-plugins-official` 플러그인을 설치
  완료(user scope, 2026-07-17). 이 스킬의 지침(타이포 위계·구조적 장치·절제된
  시그니처·포커스/모션 기준)으로 Board/필터바/카드의 계층·간격·호버/포커스
  상태를 다듬는다. 스킬 지침 적용 없이 자체 폴리시로 대체하는 것은 완료
  조건을 충족하지 않는다 — 스킬을 사용할 수 없게 되면 blocker로 보고한다.
- 색은 tokens.css 변수만 사용, 라이트/다크 모두 점검.

## 테스트 · 검증

- 단위: sort 비교자, `deferred-issues` 어댑터 매핑/validators, Board 렌더
  (Deferred 토글·정렬 변경·비수동 모드 재정렬 차단), 카드 시각 표시 —
  생성·수정 두 상대시각 렌더와 로컬 `YYYY-MM-DD HH:mm` 툴팁 형식 검증,
  `formatTimestampLocal` 단위 테스트, 상세 패널 생성/수정 읽기 전용 행 렌더,
  Worker 후보 레인 수동 rank 정렬 유지 회귀 테스트.
- `npm run all`(lint + tsc + vitest + prettier) 그린, `npm run build` 번들
  재생성 포함 커밋.
- 머지 후 공유 서비스 마감(저장소 정책): config 정합 확인 → `bdui-shared`
  재시작 → 프로세스·HTTP 응답 검증.

## 비목표

- Worker 탭 정보구조 변경, `defer_until` 편집 UX, 정렬 설정의 서버 저장,
  Closed 컬럼 정렬 정책 변경.
