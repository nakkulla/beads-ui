# 워커 탭 레인 카드 UX 개선 (UI-k59y)

## 문제

1. **pr_wait 행 제목 잘림**: `miniRow`는 한 줄 플렉스에 grip·ID·제목·PR 링크·뱃지·reason·usage·[머지]/[폐기]를 전부 싣는다. pr_wait 행은 부속 요소가 가장 많아 `.worker-mini__title`(nowrap+ellipsis)이 몇 글자만 남는다.
2. **다른 레인도 동일 계열 잘림**: 대기/완료 레인 제목 nowrap+ellipsis, 후보 카드 `line-clamp: 2`, 실행 타일 `.rtile__title` nowrap+ellipsis.
3. **실행 타일 클릭 방향이 반대**: `.rtile` 기본 클릭 = 라이브 세션 드로어, 이슈 상세는 ⓘ 버튼. 다른 모든 레인은 기본 클릭 = 이슈 상세(`gotoIssue`)라 타일만 규칙이 뒤집혀 있다.

## 변경

### 1. pr_wait 행을 다단 카드로 재배치 (`app/views/worker/lanes.js`, `app/styles.css`)

`miniRow`에 pr_wait 전용 카드 변형(`.worker-mini--card`, `lane === 'pr_wait'`에서 적용)을 추가해 세로 3단으로 재배치한다:

- **머리행**: ID(복사) · PR 링크 `#N ↗` · 뱃지들 · reason 칩(우측 끝)
- **제목행**: 전체 표시 — nowrap/ellipsis 없이 줄바꿈 (카드 높이는 내용대로 늘어남)
- **꼬리행**: usage · merge-step(진행 시) · 우측 정렬 [머지]/[폐기]

머지 진행 시각화(왼쪽 레일·하단 진행선·n/7 카운터)와 드래그 계약(`data-bead-id`/`data-lane`)은 그대로 유지한다. 데스크톱 PR 대기 레인과 모바일 「지금」 패널이 같은 템플릿을 쓰므로 둘 다 적용된다. 대기/완료 레인은 한 줄 miniRow를 유지한다(부속 요소가 적어 카드화가 과함).

### 2. 전 레인 제목 잘림 제거 (`app/styles.css`)

- `.worker-mini__title`: `white-space: nowrap`/`text-overflow` 제거 → 줄바꿈 허용 (`overflow-wrap: anywhere` 계열로 긴 토큰 방어)
- `.worker-card__title`: `line-clamp: 2` 제거 → 전체 표시
- `.rtile__title`: nowrap/ellipsis 제거 → 줄바꿈 허용

### 3. 실행 타일 클릭 = 이슈 상세, 라이브 세션은 전용 버튼 (`app/views/worker/running-grid.js`, `app/views/worker/index.js`)

- `.rtile` 기본 클릭 → `gotoIssue(bead_id)` (다른 레인과 동일 규칙으로 통일)
- ⓘ(`rtile__info`, 상세 보기) 버튼은 제거하고 그 자리에 **세션 버튼**(`rtile__session`, 라벨 `▤ 세션`, title "라이브 세션 열기")을 두어 `openDrawerForAttempt(attempt_id)`를 호출. `app/styles.css`의 기존 `.rtile__info`/`.rtile__info:hover` 규칙을 `.rtile__session`으로 교체(이관)해 조용한 버튼 스타일을 유지한다
- 드로어가 열린 attempt의 `.rtile--sel` 링, ⏸/▶/■ 버튼 동작은 그대로
- `index.js` onClick 분기: `.rtile__session` 분기를 타일 기본 분기보다 먼저 처리, 기존 `.rtile__info` 분기 제거, `.rtile` 기본 분기를 `gotoIssue`로 교체

### 4. 클릭 어포던스 정리 (`app/styles.css`)

클릭 = 상세보기인 표면 전체(`.worker-mini`, `.worker-card`, `.rtile`)에 hover 시 `border-color`를 한 단계 밝히는 절제된 공통 피드백을 추가한다. 기준은 드래그 가능 여부(`--static`)가 아니라 상세 클릭 여부다 — pr_wait 행은 `draggable: false`라 `--static`이지만 클릭하면 상세를 열므로 hover 피드백 대상이고, `cursor: pointer`도 함께 부여한다. 기존 토큰만 사용, 새 색·모션 없음.

## 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` · `npm run build`(번들 커밋 포함)
- `app/views/worker/index.test.js`: 타일 기본 클릭 → `gotoIssue` 호출, `rtile__session` 클릭 → 드로어 열림으로 기존 단언 갱신
- **시각 검증**: 로컬 라이브 서버(`BDUI_FRONTEND_MODE=live`, 별도 포트)에서 긴 제목·뱃지·버튼을 모두 가진 pr_wait 카드를 ① 데스크톱 PR 대기 레인, ② 모바일 폭(≤640px) 「지금」 패널에서 확인 — 제목 전체 표시·꼬리행 버튼 정렬·머지 진행 시각화 유지. 후보·대기·실행·완료 레인에서도 긴 제목이 잘리지 않고 레이아웃이 깨지지 않는지 확인

## 범위 제외

- 서버/프로토콜/레인 IA 변경 없음. 후보 정렬·필터, 드래그 규칙, 머지 게이트 로직 불변.
