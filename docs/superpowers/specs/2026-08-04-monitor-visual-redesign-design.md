# 모니터 탭 시각 재설계 — 관제 삼단·타이포 카드·모바일 스와이프 (UI-gwkl)

- 상태: 사용자 승인 대기 (디자인 대화 승인 완료, 2026-08-04)
- 경로: spec_backed
- 관련: UI-qrfo(모니터 탭 원 스펙) · UI-ic20(세션 간헐 미표시 버그, 별도 유닛) ·
  실행가능 레인 깜빡임 수정(커밋 ad19208, 완료·배포됨)

## 1. 문제

현재 모니터 탭은 기능 우선으로 조립되어 시각 완성도가 낮고 모바일 대응이
사실상 없다. 관찰된 구체 결함:

1. **제목 세로 붕괴**: 실행중·대기 카드가 Worker의 한 줄 변형
   (`worker-mini__line`)을 재사용하는데, 모니터에는 레포 칩 + 긴 크로스레포
   ID(`dotfiles-ygcy` 등, nowrap) + 사용량·배지가 같은 줄에 실린다. 고정폭
   요소가 좁은 레인 폭을 소진하면 제목(`overflow-wrap:anywhere`)이 1~4글자
   폭으로 쥐어짜져 세로로 흐른다.
2. **컨트롤 우세**: 대기 레인 레포 그룹 헤더의 이모지 컨트롤 4개(▶🔀⧉⚙)가
   내용보다 시각적으로 우세하고, 역할·상태가 읽히지 않는다.
3. **위계 부재**: 다섯 레인 등폭 나열이라 「지금 도는 것」에 시선이 모이지
   않는다. 타이포·간격 미정돈.
4. **모바일**: `flex-direction: column` 단순 스택뿐.

## 2. 확정 디자인 결정 (사용자 시각 승인)

시각 컴패니언에서 목업으로 승인된 결정. 디자인 토큰(`app/styles/tokens.css`)은
무변경 — 기존 control-tower 어휘 안에서 조합만 바꾼다.

### §2.1 데스크톱 레이아웃 — 관제 삼단

`.mon-lanes`를 flex 5열에서 **grid 3영역** `1fr · 2.2fr · 1fr`로 전환.

- 좌측 레일(세로 스택): 실행가능 → 대기
- 중앙(주인공): 실행중
- 우측 레일(세로 스택): PR 대기 → 완료

생애주기 좌→우 독해와 레인 스파인 색(teal→blue→violet→pink→green),
`paneTemplate` 골격·`data-lane` 계약 유지. 3영역 최소폭 합이 창을 넘으면
기존 어휘대로 레인 영역만 가로 스크롤.

### §2.2 카드 문법 — 타이포그래피 (제목 우선)

모니터의 모든 카드는 **「제목 첫 줄(전폭) + 흐린 메타 한 줄」**로 통일한다.
제목이 항상 전폭 블록 줄을 가지므로 세로 붕괴가 구조적으로 사라진다.

- **실행중 타일**: 제목(fs-body, text-title) → 메타 줄(하트비트 점 · mono ID ·
  레포명 · 모델 · 경과 `MM:SS` tabular-nums · τ 사용량 · 조작 아이콘 우측 끝).
  실패는 메타 줄 선두 `⚠ 실패`(accent-warn) + 카드 테두리 warn 톤.
  paused → `⏸ 일시정지` 동일 문법.
- **실행가능 카드**: 제목 → 메타(⠿그립 · mono ID · route 칩 · 레포 · 수정 시각).
- **대기 행**: 부속이 적어 한 줄 유지 — ⠿그립 · `#순번` · mono ID · 제목(flex:1).
  REVISE 파킹 배지·처분 버튼(`worker-mini__revise-*`)은 기존 계약 유지.
- **PR 대기 카드**: 제목 → 메타(ID·PR 링크·배지) → 꼬리(usage·머지 진행·액션).
  버튼은 기존 클래스 계약(`worker-mini__merge`/`__merge-cancel`/`__discard`)을
  그대로 발행해 `index.js` 클릭 위임이 무변경으로 동작한다.
- **완료 행**: 제목 → 메타(ID·완료 종류 라벨·τ·완료 상대시각). 종류 색 규약
  (성공=accent-success, 그 외=accent-warn) 유지.

구현: 모니터는 `miniRow`/`candidateCard` 재사용을 접고 **모니터 전용 카드
템플릿**(`app/views/monitor/lanes.js` 내)을 갖는다. Worker 탭 렌더는 무변경.
버튼 class·`data-*` 계약만 공유한다. `monitorLiveTemplate`의 경과·하트비트
산식과 1초 tick 규약은 유지하되 출력 위치가 새 메타 줄로 이동한다.

### §2.3 컨트롤 — 라인 아이콘 + 라벨

이모지 전폐. `app/views/monitor/icons.js`(신규)에 인라인 SVG 라인 아이콘
(play·pause·stop·close·merge·slots·gear·play-all) lit-html 템플릿을 둔다.

- **레포 그룹 헤더**: `[▶ 진행] [⛙ 머지] [⧉ 슬롯 N] [⚙ 설정]` — 네 개 모두
  아이콘+라벨. 켜짐=녹색(accent-success) 테두리·글자, 꺼짐=text-dim.
  슬롯은 기존 number input 유지(라벨+아이콘으로 감쌈). CAS 계약
  (`data-root-dir`/`data-revision`/`data-on`, `mon-ctl--*` 클래스) 무변경.
- **그룹 헤더 자체**: 마이크로 라벨 줄(소형 uppercase 톤, 얇은 구분선)로
  내려앉고, 빈 큐 레포는 이름을 한 단계 더 흐리게.
- **상단 바**: `[⏵⏵ 전체 자동화 2/8]` / 전부 켜짐 시 `[⏹ 전체 자동화 멈춤]` —
  같은 아이콘 문법. KPI 칩(실행/대기/PR)·완료 기간 select·토큰 합계 칩은
  유지하되 간격·정렬 정돈.
- **실행중 카드 조작**: 일시정지·중단·이어하기·닫기 = 라인 아이콘 + 툴팁
  (라벨 없음, 기존 `mon-op--*` 클래스 유지).

### §2.4 드래그앤드롭 (신규)

Worker 탭의 네이티브 HTML5 드래그 규약(`app/views/worker/index.js`)을
모니터에 이식한다. 라이브러리 없음.

- **실행가능 → 대기 적재**: 실행가능 카드를 끌어 같은 레포의 대기 그룹에
  놓으면 `worker-queue-place`(드롭 인덱스 반영). **다른 레포 그룹은 드롭
  불가** — dragover에서 레포 불일치 시 하이라이트·drop 허용을 주지 않는다
  (크로스레포 적재는 서버에 없는 개념).
- **대기 그룹 내 재정렬**: 같은 그룹 안 드래그로 `worker-queue-reorder`.
  그룹 간 이동은 불허(레포가 다르다).
- 드롭 대상 하이라이트는 기존 `--drag-over` 어휘 재사용. CAS·1회 재시도
  규약은 기존 `sendCas` 경로 그대로.
- 기존 ↑/↓/✕ 버튼과 [대기로 ↴]는 유지 — HTML5 드래그는 터치에서 동작하지
  않으므로 이 버튼들이 모바일 수단이다(표시 조건은 기존 CSS 규약 유지).

### §2.5 모바일 (≤640px)

레인 네비 버튼·아코디언 없이 **가로 스와이프 칸반**:

- 다섯 페인이 각 `85vw`(상한 `420px`) 폭으로 가로 나열, `scroll-snap-type: x
  mandatory` + 페인 `scroll-snap-align: start`로 페인 단위 정착.
- 순서는 관제 우선: **실행중 → 실행가능 → 대기 → PR 대기 → 완료** (DOM 순서
  재배열은 모바일 미디어 쿼리의 grid/order로만 처리 — 데스크톱 DOM·독해
  순서는 §2.1 유지).
- 상단 바는 sticky 한 줄(마스터 버튼 + KPI 칩, 완료 select·토큰 칩은 줄바꿈
  허용).
- 세로 스크롤은 각 페인 body가 소유(기존 pane body 스크롤 규약).

## 3. 구현 범위

| 파일 | 변경 |
| --- | --- |
| `app/views/monitor/lanes.js` | 모니터 전용 카드 템플릿(실행중·실행가능·대기·PR·완료), 그룹 헤더·상단 바를 새 문법으로 재작성. `buildLanes` 데이터 산식 무변경. |
| `app/views/monitor/icons.js` (신규) | 인라인 SVG 라인 아이콘 템플릿 셋. |
| `app/views/monitor/index.js` | 레인 배치(삼단 grid 마운트), 드래그 컨트롤러(§2.4), 클릭 위임에 드래그 예외 추가. `MONITOR_LANES` 메타·구독·CAS 경로 무변경. |
| `app/styles.css` | `.mon-*` 블록 재작성 + 신규 카드·아이콘·모바일 스와이프 규칙. `worker-*` 규칙 무변경. |
| `app/views/monitor/*.test.js` | 템플릿 구조 변화분 갱신 + 드래그 대상 판정 테스트 추가. |
| `app/main.bundle.js`(+map) | `npm run build` 산출물 커밋 (기존 규약). |

서버·프로토콜·데이터 계약 무변경. `tokens.css` 무변경.

## 4. Test scope

- **기존 유지**: `lanes.test.js`(buildLanes 산식 — 무변경이므로 통과 유지),
  `index.test.js`·`main.monitor.e2e.test.js`의 조작 위임·CAS 계약 테스트는
  셀렉터가 유지되므로 원칙 통과, 템플릿 구조 단언만 새 마크업으로 갱신.
- **신규 RED→GREEN 시임**:
  1. 드래그 적재 대상 판정 — 같은 레포 대기 그룹만 드롭 허용, 타 레포
     그룹 거부 (`index.test.js`).
  2. 드래그 재정렬 — 같은 그룹 내 drop이 `worker-queue-reorder`를 올바른
     `to_index`로 전송 (`index.test.js`).
  3. 카드 템플릿 — 실행중 타일이 제목 블록과 메타 줄을 분리 렌더하고 실패
     상태를 메타 선두에 싣는다 (`lanes.test.js`).
  4. 그룹 컨트롤 — 라벨 텍스트(진행/머지/슬롯/설정)와 `data-on`/CAS 속성
     공존 (`lanes.test.js`).
- 시각 회귀(간격·색)는 자동화하지 않는다 — 수동 확인으로 갈음.

## 5. 검증·적용 절차

1. Pre-Handoff: `npm run tsc` · `npm test` · `npm run lint` ·
   `npm run prettier:write`.
2. `npm run build` 후 번들 포함 커밋.
3. 머지 후: `~/.config/bdui/config.toml` 정합 확인 → `bdui-shared restart` →
   프로세스 경로·포트·HTTP 200 검증 (AGENTS.md 규약).
4. 수동 확인: 데스크톱 삼단 렌더, 실행중 타일 실패 상태, 드래그 적재·재정렬,
   모바일(폭 640px 이하) 스와이프 스냅·sticky 상단 바.

## 6. 명시적 비범위

- 세션 간헐 미표시 버그(UI-ic20) — 별도 유닛, systematic-debugging 선행.
- Worker 탭 렌더·템플릿 변경, 서버 측 변경, 신규 의존성.
- 터치 전용 드래그(포인터 이벤트 기반) 구현 — 버튼이 터치 수단.
