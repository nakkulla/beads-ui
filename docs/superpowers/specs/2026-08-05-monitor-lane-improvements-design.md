# 모니터 레인 개선: 실행중 정렬·대기로 버튼 PC 노출·실행가능 리뷰 진행 칩

- Bead: `UI-fmwh`
- Route: `spec_backed`
- 날짜: 2026-08-05
- 의존: `UI-lzfa`(실행가능 카드 라벨 표시) — §4.3이 같은 프로젝션·카드 함수를
  확장하므로 UI-lzfa를 먼저(또는 같은 구현에서 함께) 반영한다. `blocks` 의존
  등록됨.

## 1. 문제

1. **실행중 카드가 계속 움직인다** — `app/views/monitor/lanes.js:606`이
   `last_event_at` 내림차순으로 정렬해, 이벤트가 올 때마다 카드 순서가 바뀐다.
   보던 카드가 시야에서 이탈한다.
2. **PC에서 실행가능 카드를 큐에 넣을 버튼이 없다** — `대기로 ↴`
   (`.worker-card__place`)는 `app/styles.css:4427`에서 `display: none`이고
   `(any-pointer: coarse), (max-width: 640px)`(styles.css:5010)에서만 나타난다.
   데스크톱은 드래그가 유일한 수단인데, 드래그 가능함이 화면에 드러나지 않는다.
3. **실행가능 카드가 리뷰 진행 상태를 말하지 않는다** —
   `server/worker/runnable-cache.js` `RunnableItem`은
   `bead_id·title·route·spec_id·created_at·updated_at` 6필드뿐. 큐잉하는 사람이
   spec 리뷰가 어떤 형태로 수령됐는지(codex 승인인지 skip인지), full_plan의
   plan이 작성·승인됐는지를 카드에서 알 수 없다.

## 2. 목표

실행중 레인을 안정된 순서로 보이게 하고, 데스크톱에서 버튼 큐잉을 열고,
실행가능 카드에 리뷰 진행 칩을 단다.

## 3. 비목표

- 서버 측 정렬 변경 — 정렬은 표시 문제이므로 클라이언트에서 끝낸다.
- 대기·완료·PR 대기 레인의 정렬 정책 변경.
- qualify() 판정 조건 변경 — 칩은 투영에만 실린다 (UI-lzfa §비목표와 동일
  원칙).
- 계약 표면 변경 — `spec_review`/`plan_review`/`plan_check` 키의 canonical
  정의는 dotfiles 계약 소유(AGENTS.md). 키 부재·형식 이탈은 fail-quiet으로
  표시 생략.

## 4. 설계

### 4.1 실행중 정렬: 시작순 기본 + 레포순 토글

- `lanes.js:606`의 comparator를 `started_at` 오름차순으로 교체 — 먼저 시작한
  세션이 위, 새 세션은 아래에 붙는다. `started_at` 부재(null)는 맨 뒤,
  동률/부재 tie-break은 `bead_id` 사전순 (결정적 순서 보장).
- 모니터 헤더(KPI 줄 옆)에 정렬 토글 `시작순 | 레포순` 추가. `레포순`은
  `queue_groups`가 도는 `workspaces_state` 순서로 레포를 그룹핑하고 그 안에서
  시작순. 알 수 없는 `root_dir`은 맨 뒤.
- 선택은 `localStorage` 키 `bdui.monitor.running_sort`(`'started'|'repo'`)로
  유지, 기본 `'started'`. 읽기 실패·미지 값은 기본값 (fail-quiet).
- `done.sort`(lanes.js:607)는 그대로 둔다.

### 4.2 대기로 버튼 상시 노출

- `styles.css:4427`의 `display: none`을 기본 `inline-block`으로 바꾸고,
  styles.css:5010 미디어 블록의 `.worker-card__place` 항목을 제거한다.
- 템플릿·핸들러(`lanes.js:858`, `monitor/index.js:717`)는 변경 없음. 드래그는
  병행 유지.

### 4.3 실행가능 카드 리뷰 진행 칩

- `RunnableItem` 프로젝션에 2필드 추가 (`runnable-cache.js` `qualify()`):
  - `spec_reviewer: string` — `meta.spec_review`의 `@` 앞 토큰(예 `codex`,
    `skipped`, `triage`, `self`). qualify()가 이미 수령 형식을 검증하므로
    (runnable-cache.js:152-158) 항상 존재한다.
  - `plan_state: 'approved'|'authored'|'none'` — full_plan 전용 파생값:
    `meta.plan_review` 존재 = `approved`, 없고 `meta.plan_check` 존재 =
    `authored`(무인 작성·미승인), 둘 다 없으면 `none`. spec_backed 행은
    `none` 고정.
- 카드 표시 (`lanes.js` `monitorRunnableCard()`, route 칩 옆):
  - `spec:<reviewer>` 칩 — `skipped`는 흐린 스타일로 구분(리뷰 없이 진행
    승인된 것임을 드러낸다).
  - full_plan일 때만 plan 칩: `plan ✓`(approved) / `plan ✎`(authored) /
    `plan –`(none, 흐림). spec_backed는 plan 칩 없음.
- 블록 상태는 추가 표시 없음 — `blocked` Bead는 실행가능 레인에 들어오지
  않고, 파킹 처분은 대기 레인 REVISE 표시(lanes.js:520-526)가 담당한다. 기존
  `⛔ reason` 표시도 그대로.

## 5. Test scope

- `app/views/monitor/lanes.js` 정렬: 시작순 기본 정렬, started_at 부재 맨 뒤,
  레포순 그룹핑, 미지 root_dir 맨 뒤 — comparator 단위 테스트 (RED→GREEN).
- `server/worker/runnable-cache.js` `qualify()`: `spec_reviewer` 토큰 추출,
  `plan_state` 3상태 파생(spec_backed는 `none`) — 단위 테스트 (RED→GREEN).
- `monitorRunnableCard()` 칩 렌더: spec/plan 칩 유무·skipped 흐림 —
  기존 lanes 테스트 패턴으로 추가 (RED→GREEN).
- 정렬 토글 localStorage 유지는 기존 monitor/index 테스트 관례에 맞춰 확인.
