---
scope:
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/views/worker/workspace-adapter.js
  - app/views/worker/workspace-adapter.test.js
  - app/views/worker/placement.js
  - app/views/worker/placement.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/views/detail-panel/index.js
  - app/views/detail-panel/index.test.js
  - app/views/detail-panel/session-history.js
  - app/views/detail-panel/session-history.test.js
  - app/utils/resume-flow.js
  - app/utils/resume-flow.test.js
  - app/utils/resume-instructions-dialog.js
  - app/utils/resume-instructions-dialog.test.js
  - app/utils/continuation-dialog.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - AGENTS.md
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-6g3t — 워커 조작 표면 정비: 대기로·✕·이어하기 형태 통일, 이슈 상세 [대기로], 워커 탭 검색

## 1. 배경과 관측 (HEAD `0e79482`)

세 조작은 자리는 카드 문법(`2026-08-25-card-header-grammar-unify-design.md`
§5.1)대로인데 **형태**가 전부 다르다.

- `대기로 ↴`는 후보 카드 foot(슬롯 6)에만 있다 — `app/views/worker/lanes.js`
  `candidateCard`의 `.worker-card__place`. 칩 크기(`--fs-chip`, 세로 패딩 2px)의
  알약이고, 직렬 레인이 있으면 인라인 `.worker-card__place-menu`가 열려 `✕`로
  닫는다.
- 대기에서 빼는 `✕`는 행 1번 줄 조작 슬롯 끝의 `.worker-mini__rowops-remove`다.
  Worker 탭(`app/views/worker/index.js` `queueRowActions`)은 `✕`만, Monitor 탭
  (`app/views/monitor/index.js` `rowActions`)은 병렬 행에만 `↑ ↓ ✕`를 그리고
  **직렬 행에는 `✕`가 없다** — `nudgeable=false`이면 묶음 전체가 빈다. `↑↓`는
  coarse pointer·640px 이하에서만 보이므로 같은 줄의 조작 밀도가 폭에 따라
  달라진다. 두 탭이 같은 조각을 따로 들고 있다.
- `↻ 이어하기`는 실행 타일 헤더(`app/views/worker/running-grid.js`
  `.rtile__resume`, 테두리 없는 텍스트 버튼)와 상세 패널 세션 이력 행
  (`app/views/detail-panel/session-history.js` `.detail-session__resume`, 테두리
  있는 캡션 버튼)에 있다. 일시정지 타일의 재개는 라벨 없는 `▶`다.
- 이어하기 흐름 — `requestResumeInstructions()` → `worker-attempt-resume` 전송 →
  충돌 1회 재시도 → `resolveContinuationMismatch()` → 거부 토스트 — 를 Worker
  (`index.js` `resumeAttempt`), Monitor(`index.js` `.rtile__resume` 분기), 상세
  패널(`index.js` `resumeAttempt`) 세 곳이 각자 복제하고 있다. 첫 다이얼로그는
  제목 「세션 이어하기」·textarea·이어하기/취소뿐이라 **무엇을** 이어가는지
  말하지 않는다.
- 이슈 상세 패널에는 큐 배치 진입점이 없다. 후보 카드의 배치 자격
  (`queue_placeable`)은 `app/views/worker/workspace-adapter.js` `runnableRows`가
  이슈 페이로드(labels·metadata·description·spec evidence·route)와 큐 구성원
  집합만으로 계산하는 순수 판정이고, 상세 패널은 같은 재료(이슈 스토어와
  `queueStore`)를 이미 받는다. 큐 채널은 Board 탭과 상세 패널이 열린 동안에도
  구독된다(`app/main.js` `ensureWorkerQueueChannel`).
- 워커 탭에는 검색이 없다. 후보 필터 strip(`candidateControlsTemplate`, UI-ki09)은
  후보 페인 안의 `controls` 슬롯에 살고, 그 카운트는 후보 페인 헤더와 짝이다. 대기
  레인의 순번(`#n`)과 드래그 좌표는 행 위치에 걸려 있어 행을 **숨기면** 의미가
  흔들린다.

## 2. 사용자 확정 결정

1. **자리 유지 + 형태 통일.** 세 조작의 슬롯은 §5.1 배정 그대로다(카드형은 foot,
   한 줄 행·실행 타일은 1번 줄 끝). 바뀌는 것은 버튼의 형태 토큰이고, `✕`는
   Monitor 직렬 행에도 상시로 선다. `↑↓`는 드래그 대체재라 coarse 전용을
   유지한다 — `✕`가 묶음의 오른쪽 끝에 고정되므로 `✕`의 자리는 폭과 무관하다.
2. **이어하기는 2단계 유지·형태·흐름 통일.** provider 불일치는 서버 응답에만
   실리므로 두 번째 다이얼로그로 남긴다. 첫 다이얼로그가 대상을 말하고, 세 화면의
   흐름을 유틸 하나로 통합한다. textarea는 기본 노출이다.
3. **상세 패널 `[대기로]`는 후보 카드 판정을 공유하고 disabled 사유를 보인다.**
   큐 스냅샷이 있고 bead가 open이면 항상 그리고, 자격 미달·이미 배치됨은 사유
   title과 함께 disabled, closed·스냅샷 없음은 그리지 않는다.
4. **검색은 탭 상단 하나, 전 레인 공통, 비일치는 흐림(숨김 아님), 저장 없음.**
   Bead 본문의 "기존 필터 strip과 한 자리"는 이 결정으로 **대체**됐다: 그 strip은
   후보 페인 안의 컨트롤이고 카운트가 후보 헤더와 짝이라, 전 레인에 걸리는 검색을
   거기 두면 자리와 범위가 어긋난다. 후보 필터를 탭 상단으로 끌어올리는 안(공용
   strip)과 후보 전용 숨김 필터 안을 함께 제시했고, 사용자가 탭 상단 검색과 strip
   유지를 골랐다(2026-09-02).
5. **transcript/문서 패널 높이는 이 스펙에서 제외**한다(재현 화면 미확인).

## 3. 조작 형태 토큰 `.op-btn`

슬롯 표는 **자리**를 정하고, 이 토큰은 **모양**을 정한다. 둘을 분리해야 다음에
버튼을 다는 사람이 자리도 모양도 고르지 않는다.

### 3.1 정의 (`app/styles.css`)

```css
.op-btn {
  display: inline-flex; align-items: center; gap: var(--sp-3);
  min-height: 24px; padding: 2px var(--sp-6);
  border: 1px solid var(--border-chip); border-radius: var(--r-5);
  background: transparent; color: var(--text-muted);
  font: inherit; font-size: var(--fs-small); line-height: 1.2;
  white-space: nowrap; cursor: pointer;
}
.op-btn:hover:not(:disabled) { color: var(--accent); border-color: var(--accent); }
.op-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.op-btn--primary { border-color: var(--stage-plan-dim); color: var(--stage-plan-on); }
.op-btn--icon { min-width: 24px; padding: 2px; justify-content: center; }
@media (any-pointer: coarse), (max-width: 640px) {
  .op-btn { min-height: 32px; }
  .op-btn--icon { min-width: 32px; }
}
```

- 색 의미가 있는 기존 버튼(`.rtile__discard`의 danger, `.worker-mini__merge`의
  success)은 자기 색 규칙을 유지한다. 토큰이 정하는 것은 크기·테두리 두께·글자
  크기·hover·disabled이고, 색은 변형 클래스나 기존 클래스가 덮어쓴다.
- `.op-btn`은 기존 클래스에 **덧붙인다**(`class="op-btn worker-card__place"`).
  기존 클래스는 이벤트 위임과 테스트 셀렉터의 계약이므로 이름을 바꾸지 않는다.
  기존 클래스에서 토큰이 정한 속성과 겹치는 선언(크기·테두리·글자 크기)은 지운다
  — 한 속성을 두 자리에서 정하면 다음 사람이 어느 쪽이 이기는지 알 수 없다.

### 3.2 적용 대상

| 표면 | 버튼 | 클래스 | 비고 |
|---|---|---|---|
| 후보 카드 foot | `↴ 대기로` | `op-btn op-btn--primary worker-card__place` | 문구가 `대기로 ↴`에서 아이콘 앞으로 바뀐다 |
| 후보 카드 레인 메뉴 | `✕` | `op-btn op-btn--icon worker-card__place-cancel` | |
| 대기 행 (Worker·Monitor) | `↑` `↓` `✕` | `op-btn op-btn--icon worker-mini__rowops-*` | §4 |
| 실행 타일 헤더 | `↻ 이어하기` · `↻ 정산 재개` · `▶ 재개` | `op-btn rtile__resume` | `▶`에 라벨 `재개`가 붙는다 |
| 상세 세션 이력 행 | `↻ 이어하기` · 재개 명령 복사 | `op-btn detail-session__resume` · `op-btn detail-session__resume-cmd` | |

같은 묶음의 이웃 — 실행 타일의 `⏸`·`▤ 세션`·`폐기`·`세션에서 해결`, 행·foot의
`머지`·`취소`·`폐기` — 는 **높이만** 맞춘다: 묶음 컨테이너(`.rtile__hd-actions`,
`.worker-mini__rowops`, `.worker-mini__actions`, `.worker-card__foot`)의 직계
`button`에 `min-height`를 토큰과 같은 값으로 준다. 색·테두리·문구는 손대지
않는다. 한 묶음 안에서 높이가 갈리면 줄이 들쭉날쭉해 어느 것이 버튼인지 다시
읽어야 하고, 반대로 색까지 통일하면 `폐기`의 danger 신호가 사라진다.

### 3.3 라벨 규칙

- **아이콘 앞·글자 뒤**로 통일한다: `↴ 대기로`, `↻ 이어하기`, `↻ 정산 재개`,
  `▶ 재개`. 지금 이미 그 순서인 `▤ 세션`·`⏸ 자동 머지`와 같은 방향이다.
- 아이콘만 허용되는 것은 범용 글리프 `✕ ↑ ↓ ⏸`뿐이고, 그때 `title`과
  `aria-label`이 필수다. `▶`는 `▤`·`⏸` 옆에서 홀로 서면 뜻이 갈리므로 라벨을
  얻는다.
- 글자 크기는 세 조작 모두 `--fs-small`이다. `--fs-chip`은 칩의 크기이지 조작의
  크기가 아니다 — 지금 `대기로 ↴`가 칩과 같은 크기라 칩 줄에 섞여 읽힌다.

## 4. 대기 행 조작 묶음 하나

Worker `queueRowActions`와 Monitor `rowActions`를 `app/views/worker/lanes.js`의
`queueRowOps(item, { nudgeable })` 하나로 합친다.

- `✕`(`data-action="queue-remove"`, `.worker-mini__rowops-remove`)는 **모든** 대기
  행 — 병렬·직렬, 두 탭 — 에 선다. 그리지 않는 조건은 지금 Worker의 판정 그대로
  `item.draggable !== true || item.done === true`(이미 출발한 행)다.
- `↑ ↓`는 `nudgeable === true`일 때만 마크업에 있고, 표시 여부는 지금처럼 CSS
  (coarse pointer·640px 이하)가 소유한다. Worker 탭은 nudge 핸들러가 없으므로
  `nudgeable`을 넘기지 않는다 — 조작을 추가하는 것이 아니라 조각을 공유하는 것이다.
- 순서는 `↑ ↓ ✕` 고정이고 `✕`가 항상 오른쪽 끝이다. 묶음은 `margin-left: auto`로
  오른쪽에 붙으므로 `↑↓`가 나타나도 `✕`의 자리는 움직이지 않는다.
- Monitor의 클릭 핸들러(`runRowAction`)는 클래스로 분기하므로 바뀌지 않는다.
  Worker의 `[data-action="queue-remove"]` 분기도 그대로다. 두 탭이 같은 마크업을
  쓰면서 핸들러는 각자 남는 것은 드래그 컨트롤러가 이미 그렇게 나뉘어 있는 것과
  같은 경계다.

## 5. 이어하기 흐름 하나 (`app/utils/resume-flow.js`)

### 5.1 유틸

```js
/**
 * @param {{
 *   context: { bead_id: string, kind: 'session'|'settlement', tuple?: string },
 *   transport: (payload: Record<string, unknown>) => Promise<any>,
 *   adopt?: (res: any) => void
 * }} options
 * @returns {Promise<any|null>}  null = 사용자가 취소
 */
export async function runResumeFlow(options)
```

- **payload 규칙 — 모든 전송이 같은 기본 payload를 싣는다.** 유틸은 첫
  다이얼로그의 답으로 `base = instructions === '' ? {} : { instructions }`를 만들고,
  이 흐름의 **모든** `transport` 호출 — 최초 전송, 충돌 재시도, continuation
  재전송(`{ ...base, continuation, decision_token }`), mismatch `refresh`
  재전송(`{ ...base }`) — 에 `base`를 합쳐 보낸다. 지금 세 화면이 클로저·spread로
  각자 지키고 있는 사실을 유틸 하나가 지킨다.
- **충돌 1회 재시도의 단일 소유자는 유틸이다.** 순서: `requestResumeInstructions(
  context)` → `null`이면 종료 → `transport(base)` → `adopt(res)` → `res.conflict`면
  **정확히 한 번** `transport(base)`를 다시 보내고 `adopt` → `resolveContinuationMismatch(
  res, (continuation, decision_token) => transport({ ...base, continuation,
  decision_token }), { onResult: adopt, refresh: () => transport(base) })` →
  `res.resumed === false && !res.conflict && res.reason`이면 `showToast(`${라벨}
  거부: ${res.reason}`, 'error', 2400)`. 라벨은 `kind`가 정한다(`이어하기` /
  `정산 재개`). mismatch 경로의 충돌은 `resolveContinuationMismatch`의 `refresh`
  루프가 이미 새 사실로 다이얼로그를 다시 여는 것으로 처리하므로, 유틸은 그
  안에서 별도 재시도를 하지 않는다.
- **`transport`는 재시도 없는 전송 하나다.** 화면이 넘기는 `transport(payload)`는
  `attempt_id`와 **호출 시점에 새로 읽은** `expected_revision`을 payload에 더해 WS
  로 한 번 보내고 응답을 그대로 돌려준다 — 내부 재시도 없음. revision 원천은 화면이
  안다(Worker `currentRevision()`, 상세 패널 `queueStore.get().revision`, Monitor는
  `casOf(bead_id)`/`exec_adopted`의 root_dir별 값). Monitor는 이 경로에서
  `sendCas(type, payload, root_dir, revision, false)`(재시도 끔)를 `transport`로
  감싸고, `sendContinuationAction`은 이 경로에 더 쓰지 않는다 — 그 함수의 내부
  재시도와 유틸의 재시도가 겹치면 소유자가 둘이 된다.
- `adopt(res)`는 응답의 `queue`를 그 화면의 스토어에 채택한다(Worker `adopt`, 상세
  패널 `queueStore.set`, Monitor `exec_adopted`). 충돌 응답의 큐를 먼저 채택해야
  다음 `transport`의 `expected_revision`이 새 값이 된다.

### 5.2 첫 다이얼로그 (`resume-instructions-dialog.js`)

`requestResumeInstructions(context, doc)` 시그니처로 확장한다. `context`가 없으면
지금 모양 그대로다(fail-quiet).

- 제목: `kind === 'settlement'`면 「착지 정산 재개」, 아니면 「세션 이어하기」.
- 제목 아래 한 줄 `.resume-instructions-dialog__target`: `<bead_id> · <tuple>`.
  `tuple`은 호출 측이 `formatAttemptTuple(attempt)`로 만들어 넘기며, 없으면 ID만.
  실행 타일과 세션 이력 행 모두 attempt 레코드를 갖고 있다.
- 확인 버튼 문구는 제목과 같은 분기(「이어하기」/「정산 재개」). textarea·
  placeholder·Ctrl/⌘+Enter·취소는 그대로다.

### 5.3 두 다이얼로그의 형태

`.resume-instructions-dialog`와 `.continuation-dialog`는 같은 기본 토큰
`.op-dialog`(폭·패딩·테두리·backdrop·제목 크기·버튼 줄)를 공유하고, 각자 남는
것은 본문(textarea / 튜플 문장과 두 선택 버튼)뿐이다. 버튼은 §3의 `.op-btn`이며
확인 버튼만 `--primary`다.

### 5.4 세 화면

- Worker `resumeAttempt(attempt_id, resume_kind)`와 상세 패널
  `resumeAttempt(attempt_id)`는 본문이 `runResumeFlow` 호출 하나로 준다. Monitor
  `.rtile__resume` 분기도 같다 — 지금 Monitor만 없던 거부 토스트가 유틸을 통해
  생긴다. 상세 패널의 세션 이력 행은 `kind`를 항상 `'session'`으로 넘긴다 — 그
  행의 버튼은 착지 정산과 무관하다.

## 6. 이슈 상세 `[↴ 대기로]`

### 6.1 판정 모듈 `app/views/worker/placement.js`

```js
/**
 * @param {any} issue  bd 페이로드 (labels·metadata·description·workflow·status)
 * @param {any} queue  worker-queue 스냅샷
 * @returns {{
 *   placeable: boolean,
 *   worker_ineligible: boolean,
 *   awaiting_user: boolean,
 *   missing_description: boolean,
 *   spec: 'published'|'draft'|'none'|'conflict'|'n/a',
 *   location: null|{ lane: 'parallel'|'s1'|'s2'|'s3'|'s4'|'s5', index: number }
 *           |{ lane: 'running' }|{ lane: 'pr_wait' }|{ lane: 'done' }
 * }}
 */
export function candidatePlacement(issue, queue)
export function placementTitle(placement)  // 후보 카드 title 문구 그대로
```

- `placeable`은 어댑터의 `eligible` 식과 **같은 식**이다: `!worker_ineligible &&
  !awaiting_user && (quick_fix ? has_description : published && !conflict)`, 그리고
  `location === null`. 어댑터 `runnableRows`는 이 함수를 불러 `eligible`·
  `worker_ineligible`과 사유 파트(`awaiting_user` 문장·`missing_description`·
  `spec_id_conflict`·`spec 없음`·`spec 미발행(draft)`)를 채운다. blocked 파트
  (`BLOCKED_WITHOUT_IDS`)는 배치 자격이 아니라 어댑터가 지금처럼 앞에 붙인다.
- `location`은 스냅샷의 `queue`·`serial_lanes[].entries`·`pr_wait`·`done` 구성원과
  `attempts`의 실행중 판정(`lane-model.js`가 실행중 레인을 세우는 같은 술어를
  export해서 쓴다)으로 정한다. 어댑터의 `queued` 집합도 이 함수의 결과로 바꾼다.
- `placementTitle`은 `candidateCard`가 지금 인라인으로 고르는 문장을 옮긴 것이다:
  배치 가능 → 「대기 큐 맨 뒤에 추가」, `worker_ineligible` → 「worker-ineligible
  label로 워커에서 실행할 수 없습니다」, `awaiting_user` → 「사용자 리뷰를 기다리는
  중이라 대기 큐에 넣을 수 없습니다」, `missing_description` → 「description이 없어
  대기 큐에 넣을 수 없습니다」, 그 외 spec 미달 → 「spec이 없어 대기 큐에 넣을 수
  없습니다」. 여기에 `location`용 문장이 더해진다: 「이미 대기 중 · 병렬 #n」,
  「이미 대기 중 · 직렬 N #n」, 「실행 중이라 대기 큐에 넣을 수 없습니다」,
  「PR 대기 중이라 대기 큐에 넣을 수 없습니다」, 「완료 레인에 있어 대기 큐에 넣을
  수 없습니다」(`done` — 스냅샷의 완료 레인에 아직 남아 있는 bead는 status와 무관하게
  이 문장이다). `candidateCard`는 `reason`
  파싱으로 얻던 값 대신 이 함수를 쓴다 — 두 표면이 같은 문장을 쓰는 것이 이
  절의 목적이다.

### 6.2 자리와 마크업

- `.detail-overlay__bar`의 오른쪽, 닫기 `✕` 왼쪽이다. 바는 카드 1번 줄과 같은
  문법 — 왼쪽 정체성(ID), 오른쪽 조작 — 이고 `[↴ 대기로]`는 그 조작 자리다.
  제목 줄(`✎`)이 아닌 이유는 제목 편집이 이 이슈의 내용을 바꾸는 편집이고, 대기
  배치는 이 이슈의 처분이기 때문이다.
- `<button class="op-btn op-btn--primary detail-overlay__place" data-bead-id>`.
  직렬 레인이 있으면 바 바로 아래 `.detail-overlay__place-menu`에 `placeMenuList`
  (lanes.js에서 export)를 같은 `.worker-card__place-lane` 마크업으로 그리고, 취소
  `✕`도 같다. 메뉴 CSS는 `.worker-card__place-menu` 규칙을 `.place-menu`로
  옮겨 두 표면이 나눠 쓴다(`.worker-card__place-menu`는 별칭으로 남긴다).
- 레인 선택지는 Worker `placeMenuLanes()`와 같은 계산(스냅샷의 `serial_lane_count`·
  `serial_lanes`)이다. 그 함수를 `placement.js`의 `placeMenuLanes(queue)`로 옮기고
  Worker 탭이 그것을 부른다.

### 6.3 그리는 조건과 상태

| 조건 | 표시 |
|---|---|
| `queueStore.get()`이 null · bead `status`가 `closed` | 그리지 않음 |
| `placeable` | 활성, title 「대기 큐 맨 뒤에 추가」 |
| 자격 미달 | disabled, title = `placementTitle` |
| `location`이 있음 | disabled, title = `placementTitle`의 자리 문장 |

blocked 이슈는 후보 카드와 같이 spec만 있으면 배치할 수 있다 — admission은 blocked를
보지 않는다(UI-ki09).

### 6.4 전송

- `transport('worker-queue-place', { bead_id, lane?, expected_revision })`.
  `lane`은 병렬이면 생략(append), `root_dir`는 싣지 않는다 — 상세 패널은 구독 중인
  워크스페이스의 bead만 보이므로 서버가 세션의 선택을 쓴다(세션 이력 열기와 같은
  규칙).
- 결과 처리는 상세 패널 `resumeAttempt`와 같은 규율이다: 응답의 `queue`를
  `queueStore.set`으로 채택, `conflict`면 그 revision으로 1회 재시도,
  `applied:false`에 `admission_reason`이면 토스트 「대기 적재 거부:
  <admission_reason>」, `reason:'rejected'`면 「대기 적재 거부: rejected」, 성공이면
  토스트 「<lane 라벨> 대기 #<index+1>에 추가」(`lane`·`index`는 응답이 준 실제
  자리). 성공 뒤 버튼은 채택된 스냅샷으로 「이미 대기 중 · …」 disabled가 된다.
- admission은 지금처럼 Worker(서버 `checkWorkerQueueAdmission`)가 소유한다. 이
  절은 진입점을 하나 더 두는 것이지 자격 규칙을 옮기는 것이 아니다.

## 7. 워커 탭 검색

- 입력 `<input type="search" class="worker-search" placeholder="ID·제목 검색">`을
  데스크톱 `.worker-ctrl__ops` 끝, 모바일 `.worker-ctrl--mobile .worker-ctrl__ops`
  끝(⚙ 옆)에 둔다. 조작 묶음에 두는 이유는 "누르는 곳"과 "읽는 곳"을 가르는
  UI-58y2 툴바 규칙에서 검색은 누르는 쪽이기 때문이다. 후보 필터 strip
  (`candidateControlsTemplate`)은 **바뀌지 않는다** — Bead 본문의 "필터 strip과 한
  자리"를 대체한 §2.4의 결정이다: strip은 후보 페인의 표시 조건이고 검색은 탭
  전체의 강조라 답하는 질문이 다르다.
- 상태 `search_query`는 `index.js`의 메모리에만 있다. localStorage에 쓰지 않는다 —
  새로고침 뒤 남은 검색어는 화면을 이유 없이 흐리게 한다. Esc는 비우고 `input`
  이벤트마다 `doRender()`한다.
- 일치: `query.trim().toLowerCase()`가 비어 있지 않을 때, `item.id`나 `item.title`
  의 소문자에 포함되면 일치. `buildLanes(…, { search })` 옵션으로 넘기고 모델의
  **모든 레인 항목**(후보·병렬·직렬·실행중·PR 대기·완료·세션 타일)에
  `search_match: boolean`을 단다. 검색이 비어 있으면 키를 달지 않는다(fail-quiet).
- 렌더: `search_match === false`인 `.worker-card`·`.worker-mini`·`.rtile`에
  `is-dimmed`(opacity 0.35, `pointer-events` 유지)를 붙인다. 숨기지도 빼지도
  않으므로 순번·드래그 좌표·헤더 카운트·필터 카운트·겹침 비교 집합은 그대로다.
- 페인 헤더: 검색 중이면 `.worker-pane__count` 뒤에 `.worker-pane__match`
  「일치 n」을 덧붙인다(`pane.match_count`, 검색이 비면 키 없음). `paneTemplate`은
  키가 없으면 지금 그대로 그린다.
- Monitor 탭은 이 검색을 받지 않는다 — 옵션이 없으면 `buildLanes`는 키를 달지
  않는다.

## 8. 슬롯 표·`AGENTS.md` 갱신

`2026-08-25-card-header-grammar-unify-design.md` §5.1 끝에 다음 정정 문단을 더한다.

> **정정(UI-6g3t).** 슬롯은 자리를 정하고 형태 토큰 `.op-btn`이 모양을 정한다
> (`2026-09-02-worker-operation-surface-unify-design.md` §3). 토큰의 적용 대상은
> 그 §3.2 표의 조작(`↴ 대기로`·대기 행 `✕ ↑ ↓`·`↻ 이어하기`/`▶ 재개`)과 앞으로
> 새로 다는 조작 버튼이고, 같은 묶음의 기존 이웃은 높이만 맞춘다. 세 조작의 자리는
> 그대로다 — `↴ 대기로`는 6번 foot, `✕`(대기에서 빼기)와 `↻ 이어하기`·`▶ 재개`는
> 1번 조작 — 이고 바뀐 것은 형태와 라벨 순서(아이콘 앞)뿐이다. `✕`는 병렬·직렬
> 모든 대기 행에 상시로 서고 `↑↓`만 coarse 전용이다. 이슈 상세 패널의 상단 바는
> 카드 1번 줄과 같은 문법(왼쪽 정체성 · 오른쪽 조작)이며 `[↴ 대기로]`는 그 조작
> 자리다. 검색 흐림(`is-dimmed`)은 슬롯이 아니라 카드 전체의 상태라 이 표 밖이다.

`AGENTS.md` 「워커·모니터 카드 배치 문법」 절에 결정 한 줄을 더한다.

> - `↴ 대기로`·`✕ ↑ ↓`(대기 행)·`↻ 이어하기`/`▶ 재개` 계열 조작과 **새로 다는**
>   조작 버튼은 공통 토큰 `.op-btn`으로 만든다. 같은 묶음에 이미 있는 다른 버튼
>   (`⏸`·`폐기`·`머지` 등)은 높이만 토큰에 맞추고 색·문구는 그대로다. 크기·
>   테두리·글자 크기를 카드마다 고르지 않는다 — 적용 표와 근거는
>   `docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md`
>   §3.2가 소유한다.

## 9. 비목표

- 서버·WS 핸들러·admission·계약 표면(라벨·metadata 키·status 어휘)은 건드리지
  않는다. `POST /api/worker/queue/place`(세션용)도 그대로다.
- Worker 탭에 `↑↓` nudge를 추가하지 않는다.
- 판정 문장·색상·실패 팝업의 다음 행동은 UI-kyky가 소유한다. 이 스펙이 옮기는
  문장은 후보 카드 title 다섯 개와 새 자리 문장뿐이다.
- transcript/문서 패널 높이(§2.5)는 다루지 않는다.
- 이어하기 다이얼로그를 하나로 합치지 않는다(서버 사전 조회가 필요).

## 10. 검증

- `npm run tsc` · `npx vitest run --reporter=dot` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(`app/main.bundle.js`·`.map` 포함).
- `lanes.test.js`: 후보 카드 foot 버튼 문구가 `↴ 대기로`이고 `op-btn
  op-btn--primary`를 가진다; `queueRowOps`가 `nudgeable` 없이 `✕`만, 있으면
  `↑ ↓ ✕` 순으로 그리고 출발한 행(`done`/비draggable)에는 아무것도 그리지 않는다.
- `monitor/index.test.js`: 직렬 레인 행에 `.worker-mini__rowops-remove`가 있다.
- `running-grid.test.js`: 일시정지 타일의 재개 버튼 문구가 `▶ 재개`, 실패 타일의
  `.rtile__resume`이 `op-btn`을 가진다.
- `placement.test.js`: `candidatePlacement`가 어댑터의 `eligible`과 같은 판정을
  내는 표(worker-ineligible · awaiting_user · quick_fix+description 없음 ·
  spec_backed+draft · conflict · published)와 `location` 다섯 종류(병렬·직렬·
  실행 중·PR 대기·완료); `placementTitle` 문장 다섯 + 자리 문장 다섯.
  `workspace-adapter.test.js`의 기존 자격 사례가 그대로 통과한다.
- `detail-panel/index.test.js`: 스냅샷 null이면 버튼 없음; closed면 없음;
  placeable이면 활성; 자격 미달이면 disabled와 title; 이미 병렬 #2면 disabled와
  「이미 대기 중 · 병렬 #2」; 직렬 레인이 있으면 클릭이 메뉴를 열고 레인 선택이
  `worker-queue-place`를 `lane`과 `expected_revision`으로 보낸다; `applied:false`
  응답이 토스트를 낸다.
- `resume-flow.test.js`: 취소 시 `transport` 미호출; 최초 전송·충돌 재시도·
  continuation 재전송·`refresh` 재전송 **네 호출 모두**의 payload에 같은
  `instructions`가 실리고, 빈 지시면 네 호출 모두에 키가 없다; 첫 응답이
  `conflict`면 정확히 한 번 더 보내고 두 번째도 `conflict`면 더 보내지 않는다;
  `continuation_mismatch` 응답이 두 번째 다이얼로그를 거쳐 최종 전송에
  `continuation`·`decision_token`·`instructions`를 함께 싣는다; `resumed:false`가
  `kind`별 라벨 토스트를 낸다. 세 화면의 `transport` 래퍼 테스트: 호출마다
  `expected_revision`을 새로 읽고 내부 재시도가 없다(Monitor는 `sendCas`의 재시도
  인자 `false`).
  `resume-instructions-dialog.test.js`: `context` 유무에 따른 제목·대상 줄·확인
  버튼 문구.
- `index.test.js`(worker): 검색어가 있으면 비일치 카드에 `is-dimmed`, 헤더에
  `일치 n`; 행 수·순번·드래그 속성은 불변; 검색어가 비면 두 키 모두 없음; Esc가
  비운다; localStorage에 아무 키도 쓰지 않는다.
- 배포 뒤 공유 서버에서 Worker 탭(후보 foot·대기 행 조작·검색), Monitor 직렬 행
  `✕`, 실행 타일 헤더, 이슈 상세 상단 바와 레인 메뉴, 이어하기 다이얼로그를
  스크린샷으로 확인한다(fine·coarse 둘 다).

## 11. 구현 unit 후보

한 저장소 한 Phase다. 단위를 가른다면 앵커는 다음과 같다(advisory).

- `op-token`: §3·§4 — `styles.css` 토큰, `lanes.js` `queueRowOps`, `running-grid.js`
  라벨, Worker·Monitor 호출 교체.
- `resume-flow`: §5 — `utils/resume-flow.js`, 다이얼로그 확장, 세 화면 교체.
- `detail-place`: §6 — `placement.js` 추출, 어댑터 교체, 상세 패널 버튼·메뉴·전송.
- `search`: §7 — `index.js` 상태·입력, `lane-model.js` `search` 옵션, `paneTemplate`
  `match_count`, 렌더러 `is-dimmed`.
- `docs`: §8 — 슬롯 표 정정 문단, `AGENTS.md` 한 줄.

## 경계·후속

scope가 겹치는 열린 Bead 둘은 같은 파일의 **다른 절**이며 새 Bead를 만들지 않는다.
먼저 착지한 쪽 위에 나중 쪽이 rebase한다.

- `UI-jr8v`(`2026-08-24-worker-provider-outage-hold-resume-design.md` §9·held 타일
  표면): held 타일에 `⋯ 다른 방법으로` 버튼과 러너·모델·계정 선택기 다이얼로그를
  더하고 수동 이어하기에 `exec_override`를 싣는다. 그 버튼은 이 스펙 §3의
  `.op-btn`, 그 다이얼로그는 §5.3의 `.op-dialog` 토큰을 쓰며, `exec_override`는
  §5.1 `runResumeFlow`의 기본 payload(`base`)에 얹어 모든 전송에 함께 실리는
  값이다. 이 스펙은 그 값을 만들지
  않고, 그 스펙은 흐름을 복제하지 않는다.
- `UI-b93d`(`2026-09-02-discard-orphan-gitlink-and-abandon-exit-design.md` §3.1):
  실패한 폐기 행의 액션 foot에 `[폐기 포기]`/`[백업 포기]`를 더한다. §3.2의 "이웃
  버튼은 높이만 맞춘다" 규칙이 그 버튼에도 적용되고, 자리·문구·색은 그 스펙이
  소유한다.

- 관찰: transcript/문서 패널 높이 고정 — 어느 화면(인라인 46vh · 전체 drawer ·
  md 뷰어)이 문제였는지 확인되지 않아 이 스펙에 싣지 않는다. 확인되면 별도
  quick_fix로 다룬다.

## 결정 (ADR 후보)

- 없음 — 이 스펙의 결정(형태 토큰 분리, 진입점 추가, 흐림 검색)은 모두 CSS·클라이언트
  안에서 되돌릴 수 있고, ADR 0014가 이미 "자리는 공유 슬롯 표가 정한다"를 기록했으며
  이 스펙은 그 결정을 따를 뿐 새 trade-off를 만들지 않는다.
