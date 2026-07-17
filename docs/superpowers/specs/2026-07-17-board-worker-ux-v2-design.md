# beads-ui Board/Worker UX 개편 v2 — 수동 순서·child 통합·무인증

- 날짜: 2026-07-17
- 상태: 설계 확정 (브레인스토밍 세션, ASCII 목업 기반 사용자 승인)
- 라우트: full_plan
- 관계: `2026-07-15-beads-ui-redesign-mac-studio-canonical-design.md`의 **증분 개편** — §4(Board 카드), §5.1(후보 레인), §7(인증) 결정을 본 문서가 대체. 나머지(토폴로지·Worker 수명주기·러너·디자인 시스템)는 그대로 유효.

## 1. 배경과 목표

UI-lo1k 재설계 가동 후 실사용에서 나온 개선 요구를 반영한다.

1. Board Closed 컬럼: 오늘 닫힌 것만 기본 표시, 과거분은 기간 드롭다운으로.
2. child(phase) 이슈를 parent 카드 안으로 통합 — 컬럼 중복 카드 제거, 컴팩트 표시, 순서 정렬.
3. Board 컬럼 내 / Worker 후보 레인 드래그 순서 변경 + 영속화.
4. 표시할 프로젝트(워크스페이스) 선택 기능.
5. Sync 버튼 제거(중앙 dolt 직결로 무의미 — 실측: `bd dolt remote list` → "No remotes configured"), Git Pull은 축소 유지, 주기 폴링으로 원격 writer 변경 자동 반영.
6. Worker 탭에서도 상세 보기/편집 완전 동등 + 상세 패널 풀 편집.
7. 토큰 인증 제거 — Tailscale 바인드 신뢰(완전 무인증, 사용자 확정 2026-07-17).

**비목표:** 멀티 유저/권한 모델, parent 카드 내 child 드래그 재정렬, 터치(모바일) DnD 폴리필(현행 데스크톱 드래그 기준과 동일), Closed 컬럼 수동 순서, dolt 리플리케이션/백업 경로 변경.

## 2. 수동 순서 시스템 (공통 기반)

- **저장소**: 워크스페이스별 서버 로컬 상태 `$XDG_STATE_HOME/bdui/<slug>/ui-order.json` — `{revision: number, order: {<bead_id>: number}}`. `server/worker/queue-store.js`의 CAS·원자적 쓰기(temp+rename) 패턴 재사용.
- **유효 rank**: `effective_rank(issue) = order[id] ?? -created_at_ms`. 정렬은 `effective_rank asc → id asc`. rank 미기록 이슈(신규 포함)는 자동으로 최신 생성순 상단 배치 — 현행 `cmpCreatedDescThenPriority`의 최신순 동작을 보존하며 priority 2차 키는 제거(수동 순서와 충돌).
- **드래그 기록**: 드롭 위치의 앞뒤 카드 유효 rank 중간값. 맨 위 = `first - STEP`, 맨 아래 = `last + STEP` (STEP=2^20). 인접 rank 간격이 1e-6 미만으로 좁아지면 해당 목록의 기록된 rank를 STEP 간격으로 재정규화(단일 `ui-order-set` 배치로 원자 반영).
- **프로토콜**: worker-queue 패턴 미러 — `subscribe-ui-order`/`ui-order-snapshot {revision, order}` push, mutation `ui-order-set {expected_revision, entries: [{bead_id, rank}, ...]}` → `{ok, revision}` 또는 `{conflict, snapshot}`(클라이언트는 adopt 후 1회 재시도, `app/views/worker/index.js`의 기존 재시도 관례). 평상시 entries는 1건, 재정규화 시에만 해당 목록의 기록된 rank 전체를 배치로 전송(재정규화 판단·계산은 정렬된 목록을 아는 클라이언트 소유).
- **적용 범위**: Board의 Blocked/Ready/In progress/Resolved 컬럼 + Worker 후보 레인이 **하나의 rank 맵을 공유**(어디서 드래그하든 동일 순서 갱신). Closed 컬럼은 `closed_at desc` 유지. Worker Serial/Parallel 레인 순서는 기존 queue.json CAS 그대로(별개 시스템).
- **정리**: 이슈가 closed 전이될 때 해당 id의 order 엔트리를 서버가 제거(맵 무한 성장 방지).

## 3. Board 탭

### 3.1 드래그 2종

- 다른 컬럼 드롭 = 상태 변경(현행 `update-status` 유지).
- **같은 컬럼 드롭 = 순서 변경**(신규): 드롭 인덱스 계산은 Worker `onDrop`의 인덱스 계산 관례 재사용, 낙관적 로컬 반영 후 `ui-order-set` 전송.
- 구현 위치: `app/views/board/index.js` DnD 핸들러 확장, comparator는 `app/data/sort.js`·`app/data/list-selectors.js`.

### 3.2 Closed 컬럼 — 오늘만 + 기간 드롭다운

- 기본: 오늘(클라이언트 로컬 자정 이후) 닫힌 이슈만. 서버 기존 `closed-issues` 구독 `params.since`(epoch ms) 필터(`server/ws/context.js applyClosedIssuesFilter`) 그대로 사용 — 클라이언트가 since를 계산해 구독.
- 헤더 기간 드롭다운: **오늘(기본) / 최근 7일 / 최근 30일 / 전체**. 변경 시 재구독(since 변경, 전체는 since 생략). 표시 상한 200개(클라이언트 슬라이스). 선택값은 localStorage 저장.
- 기존 "접힘 토글 + CLOSED_LIMIT 50 슬라이스"(`app/views/board/index.js:20-21,74-80`)는 본 메커니즘으로 대체(접힘 토글 삭제).
- 날짜 경계는 클라이언트 로컬 타임존 기준. 자정 경과 후 첫 재구독 시점에 자연 갱신(실시간 자정 감지는 비목표).

### 3.3 Child 통합 표시 (사용자 확정 목업)

- **분류**: `parent` 평탄화 필드(bd JSON, `rebuildChildrenIndex`가 이미 소비) 보유 이슈 = child.
- **컬럼 제외**: parent 이슈 객체가 5개 보드 구독 중 어디든 존재하면, 그 child는 **모든 컬럼에서 풀 카드 제외**. parent 카드 안 compact 행(상태점 + 순번 + 제목)으로만 표시, 행 클릭 = 상세 패널. 스테퍼·칩·rollup 배지 없음. 기본 펼침 + 카드별 접기 토글(현행 rollup 토글 계승).
- **child 정렬**: `metadata.task_order`(숫자 문자열) asc → 제목 `/^(?:Task|Phase)\s*(\d+)/i` 캡처 asc → `created_at` asc.
- **폴백**: parent가 어떤 보드 구독에도 없는 child(예: parent만 closed)는 일반 카드로 자기 컬럼에 표시.
- in_progress child 한 줄 상시 표시 + `children N/M` 카운트는 유지(2026-07-15 §4 child rollup의 계승·확장).

## 4. Worker 탭

- **후보 레인 재정렬**: ready+blocked 합산 목록을 유효 rank로 정렬(§2 공유 맵). 후보 레인 내 드래그 = `ui-order-set`. 큐 진입/레인 간 이동/큐 내 재정렬은 현행 worker-queue 메시지 불변.
- **Running 타일 상세 진입**: 타일에 ⓘ 버튼 추가 — 클릭 시 공용 상세 패널. 타일 본체 클릭 = 트랜스크립트 드로어(현행).
- child 이슈는 후보 레인에 **개별 표시 유지**(실행 단위). Board 통합 규칙은 Board 전용.

## 5. 상세 패널 풀 편집 (사용자 확정)

- 편집 가능 확대: **제목·설명(markdown textarea)·상태·우선순위·라벨 추가/제거** + 기존 exec-settings(5키+workflow_mode).
- 서버 mutation은 기존 것 사용: `edit-text`(제목/설명), `update-status`, `update-priority`, `label-add`/`label-remove`. 신규 서버 mutation 없음(부재 확인 시에만 추가).
- Board/Worker 공용 패널(`app/views/detail-panel/`) 단일 구현이므로 양 탭 자동 동등.

## 6. 프로젝트 선택 필터

- 워크스페이스 피커에 "프로젝트 관리" 팝오버: 발견된 전체 워크스페이스 + 체크박스.
- **저장**: 서버 로컬 상태 `$XDG_STATE_HOME/bdui/visible-workspaces.json` — `{hidden: [<path>...]}` (**hidden 집합** 저장: 신규 발견 워크스페이스가 기본 표시되도록). 모든 접속 기기에 동일 적용.
- 신규 ws 메시지 `set-workspace-visibility {path, visible}` → 워크스페이스 목록 push 갱신. 피커 드롭다운은 hidden 제외 목록만 표시. 현재 워크스페이스를 숨겨도 즉시 전환하지 않음(다음 전환부터 목록에서 제외).

## 7. Sync 제거 · Git Pull 축소 · 주기 폴링

- `sync-workspace` 메시지·핸들러(`server/ws/workspace-handlers.js handleSyncWorkspace`)·버튼(`app/views/workspace-picker.js`)·관련 토스트/테스트 삭제.
- Git Pull 버튼은 피커 옆 아이콘 버튼으로 축소 유지(핸들러 불변).
- **주기 폴링**: 서버 setInterval(기본 30초, config.toml `poll_interval_seconds`, 0=off) → ws 접속 클라이언트 ≥1일 때만 `scheduleListRefresh()` 호출. 원격 writer(wallace/fisher)의 중앙 dolt 쓰기가 로컬 fs.watch에 안 잡히는 갭의 대체 메커니즘.

## 8. 인증 제거 (완전 무인증, 사용자 확정 2026-07-17)

- 2026-07-15 §7 "토큰 인증" 결정 대체: Tailscale 인터페이스 바인드 + tailnet 신뢰 모델(현재 tailnet에 타인 공유 기기 없음 전제).
- 제거: `requireAuthToken` 기동 강제(`server/index.js`), WS 첫 프레임 인증(`server/ws/connection.js`), `/api/doc`·`/api/register-workspace`의 `requireBearer`(`server/app.js`), 클라이언트 auth 프레임(`app/ws.js`)·토큰 다이얼로그(`app/views/token-dialog.js`)·localStorage 토큰·md-viewer Bearer 헤더. config.toml `[auth]` 섹션은 무시(존재 시 기동 로그 경고 1줄).
- **유지**: Origin 허용 목록 검사(`isOriginAllowed`) — 무인증 전환 후 유일한 브라우저 CSRF 방어선. Worker 머지 락의 세션별 토큰(`/api/worker/merge-lock`)은 별개 시스템, 불변.
- REST mutation(`/api/register-workspace` 등)은 `application/json` Content-Type 필수(express.json 기본)를 유지해 cross-origin form CSRF를 차단하고, 응답에 CORS 허용 헤더를 추가하지 않는다(교차 출처 읽기 차단 유지).
- 배포 시 runtime copy 정합: 설치 인스턴스 config.toml에서 `[auth]` 제거 + projectmgr 서비스 재시작을 딜리버리 체크리스트에 포함.

## 9. 테스트/검증

- 유닛: 유효 rank comparator·중간값·재정규화, ui-order CAS 충돌/adopt-재시도, closed since 경계(자정), child 분류(parent 유무)·정렬(task_order/제목 파싱/폴백), visible-workspaces hidden 집합, 폴링 게이트(접속 0이면 미실행).
- 인증 테스트 재편: `ws.auth.test.js`·`auth.test.js` 토큰 케이스·token-dialog 테스트 삭제, 무인증 기동·Origin 검사 유지 테스트 존치.
- 프론트 뷰 렌더 테스트: child 통합 카드, Closed 기간 드롭다운, 후보 레인 rank 정렬 — 기존 vitest 패턴.
- 검증 번들: `npm run all` (lint + tsc + vitest + prettier).

## 10. 승인 기준

1. Board: 같은 컬럼 드래그로 순서 변경·새로고침/재접속 후 유지, 다른 기기에서 동일 순서 관찰.
2. Closed 컬럼 기본 오늘분만, 드롭다운으로 7일/30일/전체 조회.
3. child가 컬럼 풀 카드로 나오지 않고 parent 카드 내 task_order 순 compact 행으로 표시, 클릭 시 상세 패널. parent 부재 child는 일반 카드 폴백.
4. Worker 후보 레인 드래그 순서가 Board Ready 순서와 상호 반영.
5. 상세 패널에서 제목·설명·상태·우선순위·라벨 편집이 Board/Worker 양쪽에서 동작.
6. 프로젝트 관리에서 숨긴 워크스페이스가 모든 기기 피커에서 사라짐.
7. Sync 버튼 부재, Git Pull 동작 유지, 폴링으로 타 머신 bd 변경이 30초 내 자동 반영.
8. 토큰 입력 UI 전무 — 폰(Tailscale)에서 접속 즉시 사용 가능, config.toml `[auth]` 없이 기동.
9. `npm run all` 통과.
