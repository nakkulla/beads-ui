# 세션 로그 드로어 가독성 개선 — 마크다운 렌더링·thinking 표시·멀티라인 커맨드

- Bead: UI-dixx · Route: spec_backed · Base: main
- 작성일: 2026-08-04

## 배경 (실측 근거, 2026-08-04, UI-qrfo 세션 로그 4.1MB)

실시간 세션 로그 드로어(`app/views/worker/transcript-drawer.js` +
`transcript-render.js`)는 진행 중 세션의 원시 러너 이벤트 스트림을
표시 라인으로 변환해 보여준다. 최근 실제 세션(UI-qrfo, 약 1.5시간)의
스트림 구성을 실측하면:

```
assistant text 블록 =   5개  (그중 1개가 2093자 마크다운 최종 보고)
tool_use          = 475개  (Bash 243 · Edit 113 · Read 96 · Write 14 · Agent 5 · Skill 4)
thinking 블록      =  64개  (현재 파서가 전부 드랍)
```

## 문제

**1. 진행 단계 파악 불가.** 표시 스트림의 99%가 모노스페이스 tool
라인이고, "지금 무슨 단계를 왜 하는지"를 말해주는 내러티브 소스인
thinking 블록 64개는 `parseClaude`가 의도적으로 버린다. gate/phase
재분류는 assistant 텍스트에만 걸리는데 그 텍스트가 세션당 5개뿐이다.

**2. 마크다운 미렌더링.** assistant 텍스트와 최종 `result` 본문이
`white-space: pre-wrap` 원문으로 나온다. `##` 헤딩, `| |` 표, `**` 굵게,
백틱 코드가 마커 그대로 보이는 2000자 벽이 된다.

**3. 멀티라인 커맨드 뭉개짐.** heredoc 등 여러 줄 Bash 커맨드가
`white-space: nowrap` 한 줄로 접혀 말줄임되고, 클릭 확장도 커맨드를
JSON 이스케이프된 `input` 덩어리로 보여준다.

## 변경 1 — thinking 라인 (`transcript-render.js` 파싱)

새 라인 kind `thinking`을 추가한다.

- claude: `assistant` 메시지 `content[].type === 'thinking'` 블록의
  `thinking` 텍스트 → `{kind:'thinking', text}`. 공백뿐인 텍스트는 드랍.
- codex: `item.completed` + `item.type === 'reasoning'`의 `text` → 동일
  kind. 로컬에 codex 형식 로그가 없어 방어적 한 분기만 추가하고, 형식이
  다르면 fail-quiet(기존 드랍 동작 유지).
- 파서는 순수성을 유지한다: 첫 줄 추출·줄 수 계산 같은 표시 로직은
  드로어가 담당. gate/phase 재분류(`classifyText`)는 변경 없음.
- `DisplayLine` typedef의 `kind` 유니언에 `'thinking'` 추가.

## 변경 2 — 드로어 렌더링 (`transcript-drawer.js` + `styles.css`)

- **assistant 마크다운**: `line.text`를 기존 `app/utils/markdown.js`의
  `renderMarkdown`(marked + DOMPurify)으로 렌더. `.sv__as` 하위 컴팩트
  스타일을 추가한다(축소 헤딩, 표 보더, 인라인 코드 배경, 리스트 마진,
  긴 URL용 `overflow-wrap: anywhere`). 세션 로그는 신뢰 불가 입력이며
  DOMPurify 새니타이즈가 XSS를 차단한다.
- **result 마크다운**: claude 최종 `result` 이벤트 본문은 최종 보고
  전문이라 동일한 벽 문제 — ✓/✗ 글리프와 성공/실패 색은 유지하고
  본문만 마크다운 렌더.
- **thinking 라인 표시**: `💭 + 첫 비어있지 않은 줄`, dim italic.
  클릭 시 전문을 pre-wrap으로 확장(기존 `expanded` Set 인덱스 재사용).
  tool fold 그룹(`segmentsOf`)에는 참여하지 않는다.
- **"지금" 바 확장**: 표시 조건을 `live && (미완료 tool || 최신
  thinking)`으로 넓힌다. 최신 thinking = 파싱된 스트림의 마지막
  thinking 라인. 미완료 tool이 있으면 tool 정보 옆에 최신 thinking
  첫 줄을 dim으로 병기하고, tool이 없으면 thinking만 표시한다.
- **Bash 멀티라인**: 커맨드가 여러 줄이면 tool 라인에 첫 비어있지 않은
  줄 + `⋯ N줄` 배지를 표시. 클릭 확장(`expandBody`)은 Bash에 한해
  input JSON 대신 커맨드 원문 verbatim + output을 보여준다.
- thinking 원문은 대부분 영어 — 번역·요약 없이 원문 표시.

## 변경 3 — 현재 단계 칩, 3층 소스 (사용자 추가 승인, 2026-08-04)

드로어 상단 바에 현재 단계 칩을 표시한다. 소스는 우선순위 3층이며 위
층이 있으면 아래 층은 평가하지 않는다:

1. **정확 감지 (파란 칩)** — 스트림에서 phase 또는 gate kind로 감지된
   라인 중 가장 나중 것의 텍스트. 기존 `classifyText` 분류 결과만
   소비하고 새 패턴을 추가하지 않는다.
2. **task 도구 선언 (파란 칩)** — 세션이 TaskCreate/TaskUpdate 도구를
   쓰는 경우, taskId별 마지막 상태를 추적해 가장 최근에
   `in_progress`가 되었고 이후 완료되지 않은 task의
   `activeForm`(없으면 `subject`)을 표시한다. 세션이 스스로 선언한
   단계이므로 정확 감지와 같은 톤을 쓴다. tool 라인의 `input`은 이미
   보존되므로(`DisplayLine.input`) 새 파싱 없이 드로어 쪽 파생으로
   구현한다.
3. **활동 fallback (흐린 노란 칩, `~` 접두)** — 1·2층 신호가 없으면
   최근 tool 라인 윈도(마지막 10개)를 버킷 다수결(동률 시 더 최근
   신호)로 분류해 추정 단계를 표시한다: `gh pr create`/`git push`성
   Bash → `~ PR/게시 중` · `npm test|tsc|lint|build`/`vitest`성 Bash →
   `~ 검증 중` · Edit/Write/MultiEdit → `~ 구현 중` · Read/Grep/Glob →
   `~ 탐색 중`. 어느 버킷에도 없으면 칩을 숨긴다. 추정임을 색과 `~`
   접두로 정직하게 구분한다.

- 좁은 화면(≤640px)에서는 worktree 경로와 같은 방식으로 숨긴다(`title`
  속성은 전체 텍스트 유지).
- 완료/실패 세션(비 live)은 스냅숏의 마지막 상태를 그대로 보여준다 —
  칩은 "지금" 바와 달리 live 전용이 아니다.

## 엣지 케이스

- `expanded`/`unfolded`는 라인 인덱스 기반인데, 파싱 규칙 변경이 스트림
  전체에 일관 적용되므로 같은 스트림 → 같은 인덱스가 유지된다(append는
  뒤에만 추가).
- 매 append마다 `parseTranscript` 전체 재실행하는 기존 구조는 그대로
  둔다(범위 밖). 마크다운 파싱 추가 비용은 assistant/result 라인 수
  (실측 5~6개) 수준으로 무시 가능.
- 스냅숏 전용(완료 세션) 뷰어도 같은 렌더 경로를 쓰므로 동일하게
  개선된다. "지금" 바는 기존대로 live에서만 나온다.

## 범위 밖

- 진행 관제 헤더의 집계 요소(경과시간·tool 카운트)와 phase 구간
  접기(브레인스토밍 C안 잔여분 — 현재 단계 칩은 변경 3으로 편입) — B안
  사용 후 별도 판단.
- `parseTranscript` 증분 파싱 등 성능 재구조화.
- 모니터 탭 레인 표시 변경.

## Test scope

RED-GREEN seam (변경 전 실제 실패를 확인해야 하는 항목):

- `app/views/worker/transcript-render.test.js`
  - claude `thinking` 블록 → `{kind:'thinking', text}` 방출
  - codex `item.completed`/`reasoning` → thinking 방출
- `app/views/worker/transcript-drawer.test.js`
  - assistant 라인이 마크다운 DOM으로 렌더됨(굵게/헤딩 요소 존재)
  - result 라인 본문 마크다운 렌더
  - thinking 라인 첫 줄 표시·클릭 확장
  - Bash 멀티라인 첫 줄 + `⋯ N줄` 배지, 확장 시 커맨드 원문
  - "지금" 바: 미완료 tool + 최신 thinking 병기 / thinking 단독 표시
  - 상단 바 현재 단계 칩 1층: 마지막 phase/gate 라인 표시
  - 단계 칩 2층: TaskUpdate `in_progress` → `activeForm` 표시, 이후
    완료되면 다음 층으로 강하
  - 단계 칩 3층: Edit 연속 → `~ 구현 중`, 검증 Bash → `~ 검증 중`,
    무신호 → 칩 숨김

RED-GREEN 제외 — 회귀 검증 (현 구현에서도 통과해 vacuous RED이므로
seam이 아니라 GREEN 구현 후 에지 검증으로 추가):

- 공백뿐인 thinking 드랍
- result 성공/실패 글리프 유지

## 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write`
- `npm run build` 후 `app/main.bundle.js`(.map 포함) 갱신 커밋
- 머지 후: `bdui-shared restart` + 프로세스 경로·포트·HTTP 응답 확인
  (AGENTS.md Post-Merge Runtime Validation)
- post-merge continuity 처분: 이 레포에는 `deploy.json`이 없어
  sessionless merge-click 경로는 머지 후 재시작 필요를 발견하지 못한다.
  본 유닛은 UI-dixx에 `worker-ineligible` 라벨을 기록해 unattended
  worker 디스패치에서 제외하고, 위 머지 후 런타임 검증은 interactive
  lane에서 수행한다.
