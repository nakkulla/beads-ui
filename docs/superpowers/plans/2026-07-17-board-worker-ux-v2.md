# beads-ui Board/Worker UX 개편 v2 실행 계획 (UI-gr7m)

## Context

- 스펙: `docs/superpowers/specs/2026-07-17-board-worker-ux-v2-design.md` (spec 게이트 codex@9fe0a354ee1ecf277b72c95077722e735e19ee39, REVISE 2건 반영 완료).
- Bead: UI-gr7m (route=full_plan). 2026-07-15 재설계(UI-lo1k) 가동 후 실사용 개선 7건: 전역 rank 수동 순서, Board child parent-카드 통합, Closed 오늘만+기간 드롭다운, Worker 후보 재정렬·Running 상세 진입, 상세 패널 풀 편집, 프로젝트 표시 선택, Sync 제거+주기 폴링, 토큰 인증 제거(완전 무인증, Origin 검사 유지).
- 실행 워크트리: `.worktrees/UI-gr7m` (basename == branch == UI-gr7m). 검증 번들: `npm run all`.
- Phase 의존: 1→2→3 (rank 기반→소비자), 4→5 (child의 parent 존재 판정이 "렌더된 closed 목록" 규칙에 의존), 6·7·8·9 상호 독립, 10 마감. 실행은 순차.

핵심 재사용 사실 (탐색 확정, file:line):
- 편집 mutation 전부 기존재: `edit-text {id, field: title|description|acceptance|notes|design, value}`(`server/ws/mutation-handlers.js:307`), `update-status`(:208), `update-priority`(:255), `label-add`(:516)/`label-remove`(:561). 응답=`makeOk(req, <bd show 이슈>)`, `req.id` 상관(`app/protocol.js:114`).
- CAS 미러 원본: `server/worker/queue-store.js` `applyMutation`(:298-311)·persist temp+rename(:280-286); fanout: `server/ws/worker-handlers.js` `SUBSCRIBERS`(:59)+`fanout`(:88-92)+`replyMutation`(:287-300, `{applied, conflict, queue}`); envelope: `server/ws/context.js emitWorkerQueueSnapshot`(:333-349). 경로: `server/worker/state-paths.js`.
- 구독 키에 `params.since` 포함(`server/subscriptions.js:57-70 keyOf`) — 런타임 params 변경은 **기존 client_id `unsubscribe-list` → 새 spec `register`+`subscribeList`** (클라 재구독 메커니즘 기존재: `app/data/subscription-issue-stores.js register`가 spec 키 변경 시 store 재생성 :43-82, `subscriptions-store.js subscribeList` :112-180; 동작 예시는 detail 구독 `app/main.js:405-438`).
- 클라 send는 `app/protocol.js MESSAGE_TYPES`(:38-82)로 타입 검증 — 신규 메시지는 여기 등재 필수.
- transport(`app/main.js:882-888`)는 오류 삼킴 래퍼; Worker CAS 재시도 관례: `placeBead/reorderBead/removeBead + adopt + currentRevision`(`app/views/worker/index.js:106-195`), 드롭 인덱스 계산(:478-523).
- 테스트 패턴: 서버 ws=`server/ws.worker-queue.test.js`(fakeSocket/send/replyFor+`__resetRegistriesForTest`), 보드 뷰=`app/views/board/index.test.js`(createTestIssueStores/seed), e2e=`app/main.push-stores.e2e.test.js`(vi.mock ws + `_trigger` push). vitest 프로젝트: node(서버)/jsdom(app).
- 스타일: `app/styles/tokens.css`(토큰 단일 소스, raw hex 금지 — `styles.worker-theme.test.js`가 가드), board/detail=`app/styles/base.css`, Worker=`app/styles.css` 말미 섹션 마커.

## Phase 1: ui-order 서버 기반

1. `server/worker/state-paths.js`에 `uiOrderFilePath(workspace_root)` 추가(`<state_dir>/ui-order.json`).
2. 신규 `server/ui-order-store.js`: `createUiOrderStore({filePathFor?, fs?})` — `load/snapshot/setRanks(ws, {expected_revision, entries:[{bead_id, rank}]})/pruneIds(ws, ids)`. queue-store의 `applyMutation`/`persist`/캐시 패턴 미러, 스키마 `{revision, order:{id:rank}}`. entries 검증: 유한수 rank·비공백 bead_id, 위반 시 ok:false.
3. 신규 `server/ws/ui-order-handlers.js` + `connection.js` dispatch 3 case: `subscribe-ui-order`/`unsubscribe-ui-order`(payload `{id: client_id}`)/`ui-order-set {expected_revision, entries}`. worker-handlers의 SUBSCRIBERS(root_dir 키)/fanout/replyMutation 구조 미러; 스냅샷 push `ui-order-snapshot {revision, order}`(context.js에 emit 헬퍼 추가).
4. prune 배선: `ui-order-handlers.js`가 `pruneUiOrderForClose(ws, ids)`를 export(내부에서 `getConnWorkspace(ws)`로 workspace 해석 + pruneIds + fanout) → `handleUpdateStatus` 성공 경로에서 `status==='closed'`일 때 호출. **범위 한정**: WS 발 close만 prune — 외부 writer(bd CLI/worker) close의 잔존 엔트리는 무해(closed 컬럼은 closed_at 정렬, reopen 시 이전 rank 복원은 오히려 자연스러움)하므로 허용, 플랜상 명시적 스코프.
5. `app/protocol.js`: **`MessageType` typedef union(:12)과 `MESSAGE_TYPES` 배열(:38-82) 양쪽에** 4종(`subscribe-ui-order`/`unsubscribe-ui-order`/`ui-order-set`/`ui-order-snapshot` — snapshot은 `client.on` 타입 검사용) 등재, `types/subscriptions.ts`에 메시지 형 추가. (union 누락 시 checkJs+strict tsc가 즉시 실패 — 이후 Phase 7 추가·8/9 제거도 항상 union+배열 동시 갱신.)

검증: 신규 `server/ui-order-store.test.js`(CAS/persist/prune) + `server/ws.ui-order.test.js`(snapshot/set/conflict/fanout/prune-on-close) green.

## Phase 2: rank 정렬 클라 공통 + Board 컬럼 내 재정렬

1. `app/data/sort.js`: `effectiveRank(issue, order)`(= `order[id] ?? -created_at_ms`)와 `cmpEffectiveRank(order)`(rank asc→id asc) 추가; `computeDropRank(sorted_list, drop_index, order)` — 중간값 `m=(a+b)/2`, 맨 위 `first-STEP`/맨 아래 `last+STEP`(STEP=2^20), `!(a<m<b)`이면 `{renormalize: entries[]}`(목록 전체를 `index*STEP`으로, 드롭 이슈 목표 위치 삽입) 반환. 순수 함수로 두어 유닛 직격.
2. 신규 `app/data/ui-order-store.js`: `worker-queue-store.js`(:16-51) 미러 — `{get,set,clear,subscribe}`, `{revision, order}` 통짜 캐시.
3. `app/main.js`: `subscribe-ui-order`(client_id `'ui:order'`) 배선 — **탭 무관 부트스트랩 싱글턴**(Board/Worker가 공유하므로 worker-queue처럼 탭 clear에 묶으면 안 됨 — `clearBoardSubscriptions`/`clearWorkerSubscriptions`에서는 건드리지 않고, `clearAndResubscribe`(:593-613, 워크스페이스 전환)에서만 store.clear+재구독). push `ui-order-snapshot`→store.set(:292-301 관례). 뷰 옵션에 `uiOrderStore` 전달.
4. `app/data/list-selectors.js`: `createListSelectors(issue_stores, ui_order_store?)`로 시그니처 확장(옵션 파라미터 — 미전달 시 기존 동작 유지로 Phase 2 시점 worker 호출부 무변경 컴파일 유지). closed 외 모드는 `cmpEffectiveRank(order)` 사용(우선순위 2차 키 제거 — 스펙 §2), closed는 `cmpClosedDesc` 유지. **selectors.subscribe가 ui_order_store 변경도 구독**해 board/worker 양쪽 re-render를 selectors 한 곳에서 상속(뷰별 개별 구독 불요). 호출부는 뷰 내부 생성(board/index.js:53, worker/index.js:56) — board는 본 Phase에서, worker는 Phase 3에서 store 전달.
5. `app/views/board/index.js`: 같은 컬럼 드롭 분기 추가 — 드롭 인덱스 계산(worker :478-523 미러), `computeDropRank` → 낙관적 로컬 반영(store set) 후 `transport('ui-order-set', {expected_revision, entries})`, conflict 시 adopt+1회 재시도(worker :130-149 관례). `DROP_STATUS_BY_COL` 상태 변경 경로 불변. 재렌더는 selectors.subscribe 경유(4항), 뷰 `clear()`에서 selectors unsub에 함께 정리.

검증: `app/data/sort.test.js`(comparator·midpoint·epoch 규모 반복 삽입 충돌→전체 재정규화·ranked/unranked 혼합) + board 뷰 재정렬 테스트(같은 컬럼 드롭→ui-order-set 호출·낙관 반영) green.

## Phase 3: Worker 후보 재정렬 + Running 타일 상세 진입

1. `app/views/worker/index.js`: `createListSelectors`에 `uiOrderStore` 전달(Phase 2.4 시그니처 — order push 재렌더 상속). `buildModel`(:236-347) 후보 조립 재구성: **ready+blocked 원본 이슈(created_at 보유)를 먼저 병합·`cmpEffectiveRank` 정렬 후** queued 제외·행 투영(현행은 ready/blocked 블록별 append + 행에 created_at 미보존이라 그대로 정렬 불가 — 병합 정렬이 스펙 §4 "합산 목록 유효 rank 정렬"의 요건).
2. `onDrop`(:478-523): `from_lane==='candidate' && to_lane==='candidate'` 분기 신설 → 후보 목록 기준 `computeDropRank` → `ui-order-set`(adopt+재시도). 큐 제거/배치/큐 내 재정렬 경로 불변.
3. `app/views/worker/running-grid.js runningTile`(:82-107): `.rtile__hd`에 ⓘ 버튼(`.rtile__info`) 추가; `onClick` 델리게이션(:551-593)에서 `.rtile__info`를 `.rtile` 기본(트랜스크립트)보다 먼저 처리 → `gotoIssue(bead_id)`. 스타일은 `app/styles.css` Worker 섹션 마커 관례.

검증: worker 뷰 테스트 — 후보 rank 정렬 반영·후보 내 드래그→ui-order-set·ⓘ 클릭→gotoIssue(트랜스크립트 미개방) green.

## Phase 4: Closed 오늘 필터 + 기간 드롭다운

1. `app/main.js`: closed 구독을 동적 spec으로 — `closedRangeSince(range)`(오늘=로컬 자정 epoch, 7d/30d=now-N*864e5, all=undefined) 순수 함수(신규 `app/data/closed-range.js`), localStorage `beads-ui.board.closed-range`(기본 'today'). **초기 구독부터 since 적용**: `ensureBoardSubscriptions`(:465-499)가 closed client_id를 특례 처리해 저장된 range의 `params:{since}`로 등록(BOARD_SUBS 정적 튜플은 paramless — 그대로 두면 첫 로드·워크스페이스 전환마다 전체 closed가 옴), `clearAndResubscribe` 경유 재구독에도 동일 적용. `setClosedRange(range)`: 기존 closed unsub fn 호출(`unsubscribe-list` 전송) → `sub_issue_stores.register('tab:board:closed', {type:'closed-issues', params:{since}})` + `subscribeList` 재호출(서버 stale attach 방지 — `handleSubscribeList`가 재구독 시 구 키 detach 없이 덮어쓰므로 unsubscribe 선행 필수, 탐색 확정). 보드 뷰 옵션으로 `closedRange`/`onClosedRangeChange` 전달.
2. `app/views/board/index.js`/`column.js`: Closed 헤더의 접힘 토글(`CLOSED_COLLAPSE_KEY`/`onClosedToggle` :20,74-80,321-332)과 `CLOSED_LIMIT=50` 슬라이스 제거 → 헤더에 기간 `<select>`(오늘/최근 7일/최근 30일/전체), 표시 cap 200 슬라이스.
3. 렌더 cap 200은 refreshFromStores의 closed 목록 산출에서 적용(Phase 5의 parent 존재 판정 입력과 동일 목록).

검증: closed-range 유닛(자정 경계·epoch 계산) + e2e-스타일 테스트(기간 변경 시 unsubscribe→새 since로 subscribe 전송, vi.mock ws `sent` 검사) green.

## Phase 5: Board child 통합 표시

1. `app/views/board/index.js refreshFromStores`(:124-177) 2-pass 재구성: pass1 — 5개 렌더 목록(closed는 기간 필터+200 cap 적용 후) 산출, top-level(=`parent` 필드 없음) 카드 id로 `rendered_parents` Set 구성; pass2 — `parent`가 `rendered_parents`에 있는 child를 모든 컬럼에서 제외, 나머지 child는 일반 카드 폴백(스펙 §3.3). **보드 로컬 필터(search/priority/type, `applyFilters` :99-119가 template 단계 적용) 활성 시 child 제외를 일시 해제** — 필터가 parent만 숨기면 child가 증발하는 모순 방지 + 검색으로 child 직접 찾기 지원. `rebuildChildrenIndex`(:186-211)를 `{id,title,status,metadata,created_at}` 보존으로 확장.
2. `app/data/sort.js`에 `cmpChildOrder`: `metadata.task_order`(숫자 문자열) asc → 제목 `/^(?:Task|Phase)\s*(\d+)/i` 캡처 asc → `created_at` asc. (parent-id 프리픽스 제목 "UI-x T3:" 패턴도 캡처하도록 정규식에 `(?:^|:\s*)` 변형 검토 — 실데이터 제목 "UI-l3c3 Task 10: ..." 기준 테스트 고정.)
3. `app/views/board/card.js rollTemplate`(:164-216) 대체: compact child 행(상태점 `statusDotClass` 재사용 + 순번 + 제목, 클릭=`onChildClick`→상세) 기본 펼침 + 접기 토글 유지, `children N/M`·in_progress 한 줄 유지, 스테퍼/칩 없음. 스타일 `app/styles/base.css`(토큰만).

검증: board 뷰 테스트 — child 컬럼 제외·parent 카드 내 정렬 표시·폴백(parent가 closed 기간 밖)·cap 경계에서 증발 없음(스펙 §3.3 규칙) green.

## Phase 6: 상세 패널 풀 편집

1. `app/views/detail-panel/index.js`: 제목(:345)·설명(:351-353)에 편집 토글(연필 버튼→input/textarea, 저장 시 `edit-text {id, field, value}`); 상태·우선순위 `<select>`(exec-settings `selectRow` :56-79 패턴 미러 → `update-status`/`update-priority`); 라벨 chips + 추가 input + 제거 × (`label-add`/`label-remove`). 낙관 반영은 exec_local(:210-221) 관례 또는 mutation 응답(bd show 이슈)+push 재렌더(refreshFromStore :144-154) 활용 — 후자 우선(단순).
2. mutation 실패 토스트는 기존 `showToast` 관례.

검증: detail-panel 뷰 테스트 — 각 편집 컨트롤이 올바른 transport 메시지 발사·응답 후 재렌더 green.

## Phase 7: 프로젝트 표시 선택

1. 신규 `server/visible-workspaces-store.js`: 전역 단일 파일 `$XDG_STATE_HOME/bdui/visible-workspaces.json` `{hidden:[abs path]}`(atomic persist 재사용, CAS 불요 — 단일 키 토글), `listHidden/setVisibility(path, visible)`.
2. ws `set-workspace-visibility {path, visible}`: `handleSetWorkspace`(`server/ws/workspace-handlers.js:117-197`) 검증 구조 미러(절대경로+`getAvailableWorkspaces` 허용목록), 성공 시 `makeOk(req,{changed, hidden})`. `handleListWorkspaces`(:86-97) 응답에 `hidden` 배열 추가. `connection.js` dispatch + `protocol.js` MessageType union·MESSAGE_TYPES 배열 동시 등재.
3. 클라: `app/state.js workspace`에 `hidden:[]` 추가; `app/main.js` 워크스페이스 목록 수신부에서 저장; `app/views/workspace-picker.js`에 "프로젝트 관리" 버튼+팝오버(전체 available 체크박스, 토글→`set-workspace-visibility` 후 목록 재요청), 드롭다운 옵션은 hidden 제외(현재 워크스페이스는 항상 표시).

검증: 서버 store+handler 테스트, 피커 뷰 테스트(hidden 필터·팝오버 토글 메시지) green.

## Phase 8: Sync 제거 + 주기 폴링 + Git Pull 축소

1. 삭제: `handleSyncWorkspace`(`workspace-handlers.js:199-307`)+dispatch(`connection.js:452`)+import, `app/main.js handleWorkspaceSync`(:654-697)+피커 배선(:894-903 인자 축소), `workspace-picker.js renderSyncButton`(:118-134)+시그니처 축소, `protocol.js` union·배열의 `sync-workspace`, `server/ws.sync-workspace.test.js`·`app/main.workspace-sync.test.js`.
2. 폴링: `server/config.js`에 `poll_interval_seconds` normalizer(기본 30, 0=off, readRuntimeConfig 반환+fallback+JSDoc — :197-239 구조); 신규 `server/poller.js` `createPoller({intervalSeconds, getClientCount, onTick})`(unref 타이머, count>0일 때만 tick) 유닛 직격; `server/index.js:77-91`에서 `attachWsServer` 반환에 `wss` destructure 추가 → `createPoller({getClientCount:()=>wss.clients.size, onTick:scheduleListRefresh})`.
3. Git Pull 버튼 아이콘 축소(`workspace-picker.js` 라벨/스타일만, 핸들러 불변).

검증: poller 유닛(게이트·간격·0=off) + config normalizer 유닛 + sync 관련 테스트 제거 후 `npm test` green.

## Phase 9: 인증 제거

1. 서버: `server/index.js:34-39`(requireAuthToken 호출)+import(:3)·`auth_token` 전달(:83-91) 제거; `server/ws/connection.js` 첫 프레임 인증 전부 제거(:153-155, :211-225, :232-260, :264-268 타이머 정리, `verifyToken` import :9, `attachWsServer` options의 auth 항목); `server/app.js:139`(requireBearer 생성)·:177(/api/doc)·:185(/api/register-workspace)·`bearerAuthMiddleware` import(:7) 제거; `server/auth.js`·`server/auth.test.js` 파일 삭제; `server/config.js`: `[auth]` 파싱을 "존재 시 기동 경고 로그 1줄 + 무시"로 교체(config 반환에서 auth 제거).
2. 클라: `app/ws.js` `AUTH_TOKEN_KEY`(:37)·`readToken`(:40-49)·`sendAuthFrame`(:111-117)·onOpen 호출(:171)·4401 분기(:234-239)·`notifyAuthFailure`(:96-104)·`onAuthFailure`(:332-337) 제거; `app/main.js:19,265-280`(token-dialog 배선) 제거; `app/views/token-dialog.js`+`token-dialog.test.js` 삭제; `app/views/detail-panel/md-viewer.js` `AUTH_TOKEN_KEY`(:15)·`defaultToken`(:20-29)·`getToken`(:49)·Bearer 헤더(:136-139) 제거.
3. 테스트 재편: `server/ws.auth.test.js` 삭제, `app/ws.test.js` auth/4401 케이스 제거, `server/routes/doc.test.js` 401 케이스 제거, `ws.origin-allowlist.test.js` 존치, 신규 — auth_token 없이 attachWsServer 기동+첫 프레임 일반 메시지 정상 처리, `[auth]` 존재 config 경고 로그.
4. REST CSRF 자세 유지: `express.json` Content-Type 요구 불변, CORS 헤더 미추가 (스펙 §8).

검증: `npm run all` green + `[auth]` 없는 config.toml로 `node server/index.js` 기동 스모크(HTTP 200 + ws echo).

## Phase 10: 통합 검증·번들·PR delivery

1. `npm run all` + `npm run build`(main.bundle.js 재생성 — 번들에 신기능 포함 확인), `.worktrees/**` 미수집 확인.
2. 수동 스모크(로컬 기동): Board 재정렬→재접속 지속·다른 클라이언트 반영, closed 드롭다운, child 통합/폴백, Worker 후보 드래그↔Board Ready 순서 상호 반영, Running ⓘ, 상세 풀 편집, 프로젝트 숨김, 폴링(외부 bd update 30초 내 반영), 토큰 UI 부재.
3. PR 생성(base main) + UI-gr7m `pr_url` 기록. 딜리버리 노트에 runtime copy 정합: 설치 인스턴스 config.toml `[auth]` 제거(+`poll_interval_seconds` 선택 기재) + projectmgr 서비스 재시작.

검증: CI green + PR Delivery 영수증(UI-gr7m `pr_url` readback).

## Test scope

RED→GREEN seam (해당 Phase에서만 테스트 작성 권한):
- Phase 1: `server/ui-order-store.js`(CAS·persist·prune) / ws `ui-order` 채널(구독·set·conflict·fanout·close-prune).
- Phase 2: `app/data/sort.js` effectiveRank·computeDropRank(중간값·표현 불가 경계·전체 재정규화·ranked/unranked 혼합) / board 같은-컬럼 드롭→`ui-order-set` / ui-order 싱글턴이 Board↔Worker 탭 전환에 살아남는 수명주기.
- Phase 3: worker 후보 rank 정렬(병합)·후보 내 드래그·ⓘ 델리게이션 / order 전용 push에 worker 재렌더.
- Phase 4: `app/data/closed-range.js` 자정 경계 / **초기 구독이 오늘 since를 싣는지** + 기간 변경 재구독 메시지 시퀀스 / cap 200 렌더.
- Phase 5: child 분류·폴백(렌더 목록 기준, closed 기간·cap 경계)·`cmpChildOrder` 파싱 / parent 카드 compact 행 렌더.
- Phase 6: detail-panel 편집 컨트롤→mutation 메시지 매핑.
- Phase 7: visible-workspaces store·handler / 피커 hidden 필터·팝오버.
- Phase 8: `server/poller.js` 게이트 / `poll_interval_seconds` normalizer.
- Phase 9: 무인증 기동·첫 프레임 일반 메시지 / `[auth]` 경고 로그. (기존 인증 테스트 삭제는 테스트 작성이 아니라 제거.)
- 제외: 터치 DnD(비목표), Worker 세션 수명주기 e2e(무변경 영역), `main.bundle.js`(생성물).
