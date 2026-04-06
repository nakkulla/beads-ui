# 카드 Labels 및 생성 날짜 표시

## 목적

보드 카드와 목록 행에 `has:`, `reviewed:` 접두사 label과 이슈 생성 날짜(상대
시간)를 표시하여, 이슈의 워크플로우 상태와 나이를 한눈에 파악할 수 있게 한다.

## 범위

프론트엔드만 수정. 서버/프로토콜 변경 없음.

## 현재 상태

| 뷰                                   | 표시 필드                                         |
| ------------------------------------ | ------------------------------------------------- |
| 보드 카드 (`board.js:cardTemplate`)  | title, type 배지, priority 배지, short ID         |
| 목록 행 (`issue-row.js:rowTemplate`) | ID, type, title, status, assignee, priority, deps |

- `labels: string[]`와 `created_at: number`는 서버에서 이미 전달됨
  (`normalizeIssueList`의 `...it` 스프레드)
- `IssueLite` typedef에 `labels` 없음, `IssueRowData` typedef에 `labels`와
  `created_at` 없음

## 디자인

### Label 배지

**표시 대상**: `has:` 접두사와 `reviewed:` 접두사 label만 카드/행에 표시.
나머지(`area:`, `component:`, `agent:` 등)는 상세 뷰에서만 확인.

**필터링 로직**: `label.startsWith('has:') || label.startsWith('reviewed:')`

**컬러 코딩**:

| 접두사      | 의미                              | 색상      | CSS 변수 이름                                    |
| ----------- | --------------------------------- | --------- | ------------------------------------------------ |
| `has:`      | 산출물 연결 (spec, plan, handoff) | 초록 계열 | `--label-has-fg`, `--label-has-border`           |
| `reviewed:` | 리뷰 통과 (plan, code, spec)      | 파랑 계열 | `--label-reviewed-fg`, `--label-reviewed-border` |

**스타일**: 기존 `.badge`보다 작은 크기 (font-size: 10px, line-height: 18px).
테두리 있고 배경 반투명. label 전체 텍스트 표시 (접두사 포함).

### 보드 카드 레이아웃

```
┌──────────────────────────┐
│ WebSocket 재연결 로직 구현  │  ← title
│ [has:spec] [has:plan]     │  ← label 행 (해당 label 있을 때만 표시)
│                           │
│ feature  🔼P1  abc1234  3일전│  ← meta 행 (날짜 우측 정렬)
└──────────────────────────┘
```

- label 행은 title 아래, meta 위에 위치
- 해당 접두사 label이 없으면 label 행 자체를 렌더링하지 않음 (공간 절약)

### 목록 행 레이아웃

기존 7컬럼에 Labels, Created 2개 컬럼 추가 → 총 9컬럼:

```
ID | Type | Title | Labels | Status | Assignee | Priority | Created | Deps
```

- Labels 컬럼: Title 바로 옆. `has:`/`reviewed:` 배지 가로 나열, 줄바꿈 허용
- Created 컬럼: Deps 바로 앞. 상대 시간 텍스트, muted 색상

### 날짜 표시

- **형식**: 상대 시간 — "방금", "3분 전", "2시간 전", "3일 전", "2주 전", "1개월
  전", "1년 전"
- **tooltip**: `title` 속성으로 절대 날짜/시간 (ISO 형식)
- **입력**: `created_at` (epoch ms, number)
- **업데이트**: 렌더링 시점 기준 계산 (매 re-render마다 갱신됨)

## 수정 대상 파일

### 새 파일

| 파일                         | 역할                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `app/utils/label-badge.js`   | `filterCardLabels(labels)` — `has:`/`reviewed:` 필터링, `createLabelBadge(label)` — 접두사별 색상 배지 DOM 생성 |
| `app/utils/relative-time.js` | `formatRelativeTime(epochMs)` — epoch ms를 상대 시간 문자열로 변환                                              |

### 수정 파일

| 파일                     | 변경                                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `app/views/board.js`     | `IssueLite` typedef에 `labels?: string[]` 추가. `cardTemplate()`에 label 행과 날짜 렌더링 추가                                      |
| `app/views/issue-row.js` | `IssueRowData` typedef에 `labels?: string[]`, `created_at?: number` 추가. `rowTemplate()`에 Labels 컬럼과 Created 컬럼 추가         |
| `app/views/list.js`      | 테이블 헤더에 Labels, Created 컬럼 추가. `<colgroup>` width 정의도 업데이트 (현재 7 `<col>` → 9 `<col>`)                            |
| `app/views/epics.js`     | 자체 테이블 헤더 보유 (6컬럼, Deps 없음). Labels, Created 컬럼 추가 (6 → 8컬럼). `<colgroup>` width도 업데이트                      |
| `app/styles.css`         | `.board-card__labels`, `.label-badge`, `.label-badge--has`, `.label-badge--reviewed`, `.board-card__date`, `.date-cell` 스타일 추가 |

## 엣지 케이스

- **labels가 undefined/null**: 빈 배열로 처리, label 행 숨김
- **created_at가 0 또는 없음**: 날짜 표시하지 않음
- **label이 많은 경우**: `has:`/`reviewed:` 필터로 이미 제한됨. 동일 접두사
  label이 4개 이상이면 flex-wrap으로 줄바꿈
- **미래 날짜**: "방금"으로 표시 (clock skew 방어)

## 테스트

- `relative-time.js` 단위 테스트: 경계값 (0, 59초, 1분, 59분, 1시간, 23시간,
  1일, 6일, 1주, 4주, 1개월, 11개월, 1년, 복수년)
- `label-badge.js` 단위 테스트: 필터링 (has:/reviewed: 통과, area:/component:
  제외, 빈 배열, undefined)
- 보드/목록 뷰의 수동 확인: label 있는/없는 이슈, 다양한 날짜의 이슈
