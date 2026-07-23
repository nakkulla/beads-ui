# worker 뷰 개선: 모바일 최적화 · 세션 ID 기록 · exec 기본값 라벨 (UI-azj6)

사용자 요청 3건 배치. 같은 worker 표면을 다루며 단일 PR로 귀결된다.

- 라우팅 ledger: (1) 모바일 최적화 → bead:UI-azj6 §1 · (2) 세션 ID 기록 → bead:UI-azj6 §2 · (3) 기본값 라벨 → bead:UI-azj6 §3. quick_fix/deferred/dropped 없음.

## §1 모바일 최적화

현황 실측(app/styles.css·app/styles/base.css): worker 뷰에는 640px 쿼리가 이미 있어
rungrid 1열·lanes 세로 전환은 동작하나, 아래 지점이 좁은 화면(≤640px, 특히 <480px)에서
잘림/겹침을 일으킨다.

문제 지점과 수정:

1. **앱 셸 헤더 미대응** (styles.css:136 `.app-header` — `flex-wrap` 없음, 관련 미디어
   쿼리 0건): 타이틀+워크스페이스 피커+탭+아이콘 4개+"New issue"가 한 줄 강제 배치.
   → `@media (max-width: 640px)`: `.app-header{flex-wrap:wrap}`, `.header-left`/
   `.header-actions` 축소 배치(타이틀·피커·탭 줄바꿈 허용, 버튼/아이콘 크기 유지).
   햄버거 등 구조 변경은 하지 않는다 — wrap + 여백 축소만.
2. **worker ctrl 바 verify_cmd 라인** (styles.css:2503 — overflow 처리 없음): 긴 argv가
   바를 밀어낸다. → 전 해상도 공통 `max-width` + `text-overflow:ellipsis`(전체 텍스트는
   기존 title 속성 유지). ≤640px에서는 argv 본문을 숨기고 상태 배지만 표시:
   설정됨 `verify_cmd ✓` / 미설정 `verify_cmd 미설정 ⤵pr_stop`.
3. **정보 축약(“필요한 것만”)** — ≤640px에서:
   - `.worker-stat`·`.worker-tgl`(실행 n · serial 다음 · parallel slot)은 유지하되
     한 줄 축약 표기.
   - 전역 merge/drift `<select>` 2개는 숨긴다 — 동일 설정이 ⚙ 다이얼로그에서 편집
     가능해야 하므로, ⚙ 다이얼로그 하단에 merge_policy/drift_policy 2행을 추가한다
     (기존 `worker-queue-set-policy` 전송 경로 재사용, CAS 재시도 관례 동일).
     데스크톱 ctrl 바의 두 select는 유지(변경 없음).
   - lanes 4패널: 세로 스택은 유지하되 `.worker-pane__body`에 `max-height`(예 40vh)를
     부여해 페이지가 무한정 길어지지 않게 한다.
4. **transcript drawer(라이브 따라가기) 모바일** — worker 탭 인탭 `.sv`(styles.css:2760,
   비 session-log-root)는 640px 오버라이드가 없다:
   - `.sv__bar`: `flex-wrap` 허용, attempt id `min-width:0`+ellipsis.
   - meta(runner·model·effort·worktree) 중 **worktree 경로는 ≤640px에서 숨김**(전체는
     title 속성), runner·model·effort는 유지.
   - 팔로우 버튼 라벨은 ≤640px에서 `⇣ ON/OFF`로 축약(aria-label에 전체 문구 유지).
   - `.sv__body` `max-height`를 ≤640px에서 60vh로 확대(가로폭은 유동이므로 유지).
   - `.sv__tool-line`의 detail(`command`/`path`)에 `min-width:0`+ellipsis 보강.
5. **exec-defaults 다이얼로그** (styles.css:2535 `min-width:320px`, :2595 select
   `min-width:160px`): <360px 기기에서 좌우 잘림. → `width:min(480px, calc(100vw - 32px))`,
   `min-width` 제거, select `min-width` 축소(예 120px)+`max-width:100%`.
6. **새 이슈 다이얼로그 폼** (styles.css:1992 `grid-template-columns:120px 1fr`,
   오버라이드 없음): ≤640px에서 1열(라벨 위/입력 아래)로 전환.

비목표: 햄버거 내비, 터치 드래그앤드롭(모바일에서 큐 배치는 기존 HTML5 DnD 한계
그대로 둔다), Board 카드 내용 축약.

## §2 worker 세션 ID 기록

현황: runner 스트림에 세션 식별자가 오지만(아래) attempt 기록으로 추출되지 않아
세션 종료 후 `claude --resume`·transcript 추적이 불가능하다. raw jsonl은 세션 로그
파일에 남지만 구조화 필드가 없다.

- claude/ccx: 첫 이벤트 `{type:'system', subtype:'init', session_id}` (runner/claude.js).
- codex: `{type:'thread.started', thread_id}` (runner/codex.js — 현재 lifecycle으로 drop).

수정:

1. `AdapterSpec`에 선택 훅 `extractSessionId(raw) => string|null` 추가
   (runner/session.js typedef). claude 어댑터: system/init의 `session_id`. codex 어댑터:
   `thread.started`의 `thread_id`. fixture 어댑터는 미구현(null) 허용.
2. session.js 엔진: raw 수신 시 훅이 처음으로 non-null을 반환하면
   `events.emit('session_id', id)` 1회(이후 무시).
3. scheduler.js: `deps.sessionLog.attach` 시점에 `handle.events.on('session_id')`를
   구독해 `store.updateAttempt(workspace, {attempt_id, patch:{session_id}})`.
   Attempt typedef(queue-store.js)에 `session_id: string|null` 추가 — queue.json에
   영속, 스냅샷 fanout으로 클라이언트 자동 전파.
4. UI 표시:
   - transcript drawer `.sv__bar`: attempt id 옆에 세션 ID를 짧게 표시(앞 8자,
     title=전체), 클릭 시 전체 값 클립보드 복사(Board `복사됨/복사 실패` 토스트 관례).
     open() 시점 meta에 `session_id` 전달(worker/index.js `openDrawerForAttempt`).
   - detail-panel 세션 이력 행(session-history.js): meta에 세션 ID 앞 8자 추가
     (title=전체).
   - rtile에는 표시하지 않는다(공간).

비목표: bead metadata로의 세션 ID 스탬핑(attempt 기록이 소유), resume 실행 버튼.

## §3 exec 기본값 라벨

현황: ⚙ 전역 실행 설정(exec-defaults-dialog.js:165)과 detail-panel 실행 설정
(exec-settings.js `toOptions`)의 미설정 옵션이 `(기본)`으로만 표기되어 실제 무엇이
쓰이는지 보이지 않는다. ctrl 바의 merge/drift는 이미 `(기본 auto_merge)` 식으로 표기.

수정: 실제 해석 결과(server/worker/policy.js + 각 runner argv 빌더 + workflow harness
기본)를 라벨에 표기한다. 공유 맵 `DEFAULT_LABELS`를 exec-settings.js에 두고 두 표면이
같이 쓴다(미러 커밍아웃 주석: policy.js·workflow harness 기본과 동기 유지).

| key | 미설정 시 실제 동작 | 라벨 |
|---|---|---|
| worker_runner | 하드코딩 `claude` (policy.js:153) | `(기본: claude)` |
| orchestration_model | `--model` 미전달 → runner CLI 자체 기본 | `(기본: CLI 기본 모델)` |
| orchestration_effort | `--effort` 미전달 → CLI 기본 | `(기본: CLI 기본)` |
| review_model | 세션 워크플로 게이트 기본 `codex` | `(기본: codex)` |
| impl_model | 워크플로 위임 티어 자동(복잡=opus·경계=sonnet) | `(기본: 티어 자동)` |

workflow_mode는 이미 `standard`가 명시 옵션이므로 변경 없음. ⚙ 다이얼로그 hint 문구의
"'(기본)'은 미설정(하드코딩 기본)입니다"도 라벨 변화에 맞게 갱신.

## Test scope

- §2: runner claude/codex 어댑터 `extractSessionId` 단위 테스트, session.js `session_id`
  1회 emit, scheduler attempt patch(세션 id 영속) — 기존 *.test.js 파일에 추가.
- §2/§3 UI: worker index.test.js(드로어 meta 전달), transcript-drawer.test.js(세션 ID
  표시·복사), session-history 렌더, exec-defaults-dialog/detail-panel 라벨 스냅샷 갱신.
- §1 CSS는 시각 변경으로 자동 테스트 비대상 — 기존 뷰 테스트 그린 유지가 기준.

## 검증

`npm run all` (lint + tsc + vitest + prettier). 모바일 확인은 데스크톱 브라우저 반응형
모드(360px·640px) 실측으로 갈음.
