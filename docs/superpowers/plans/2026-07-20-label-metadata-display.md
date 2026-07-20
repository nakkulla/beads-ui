# 라벨/메타데이터 표시 정합화 구현 계획 (UI-8nuz)

## Context

- 근거 스펙: `docs/superpowers/specs/2026-07-20-label-metadata-display-design.md` @104bbf9 (spec 게이트 codex APPROVE-after-REVISE, `spec_review: codex@104bbf9…`). Bead: **UI-8nuz** (full_plan).
- 문제: 보드 카드가 bead 라벨을 전혀 렌더하지 않고, 라벨 가시성 배관(`config.toml [labels]` → `app/utils/label-badge.js`)은 소비처 없는 죽은 코드이며, 라벨 필터 축이 없고, blocked 사유(외부 대기 vs 의존)가 구분되지 않는다.
- 결정된 설계: 라벨 기본표시+숨김목록(서버 상태 파일·CAS·`display-policy` 구독 전파), `visible_labels` exact override(우선순위 visible > hidden exact > hidden prefix), 통합형 설정 패널(⚙), from 칩은 discovered-from 엣지 파생(라벨 미도입), blocked 사유 칩 ⏸(status=blocked+`metadata.blocked_reason`)/⛓(의존 파생), PR 칩 CI 제거, 라벨 multi-select 필터(OR), 기본 seed `hidden_labels=['has:spec','pr']`·`hidden_prefixes=['reviewed:','skipped:']`.
- 짝 스펙: dotfiles 어휘 개정(미러 기록 중단·`blocked_reason` 키·status=blocked 재정의)은 별도 진행 — 이 구현은 키 부재 시에도 동작(사유 생략 `⏸ blocked`).
- 실행: worktree `.worktrees/UI-8nuz`(브랜치 UI-8nuz). UI-aruw(§6 UI)와 card.js·detail-panel 파일 겹침 있으나 의미 독립 — 먼저 머지되는 쪽 기준으로 나중 쪽이 rebase.
- 검증 이력: 계획 초안을 advisor(읽기 전용, bd CLI 실측 포함)가 adversarial 검증 — unsubscribe 채널 누락·mergeIssueLists shallow-merge 소실·detail deps 흐름 부재(현재 항상 빈 렌더)·PR ci 이미 null·config_changed 보존 범위·dep list 방향 미확정 6건을 본 계획에 반영 완료.
- 재사용 전례(탐색 확정): 스토어+CAS=`server/ui-order-store.js`(applyMutation·revision)·`server/visible-workspaces-store.js`(atomic persist·cold-load), 구독 fanout=`server/ws/ui-order-handlers.js`(SUBSCRIBERS map·detach), 클라 구독=ui-order 싱글턴 패턴(`app/main.js:684-745` clearAndResubscribe), 클라 CAS=worker queue `expected_revision`+conflict 시 silent 1회 재시도(`app/views/worker/index.js:140-252`), 모달=`app/views/new-issue-dialog.js`, popover=`app/views/workspace-picker.js:195-239`, 칩 클릭 내비=`onChildClick` 패턴(stopPropagation→`gotoIssue`), enrich 부착점=`server/list-adapters.js:156 fetchListForSubscription`·`server/workflow-enrich.js` fail-quiet 방어 map, bd 실행=`runBdJsonInWorkspace`(`server/ws/context.js:174`)·`server/bd.js runBdJson`.

## Phase 1: 서버 — 표시 정책 스토어 + display-policy 채널

1. `server/display-policy-store.js` 신설 — `ui-order-store.js` 모델: per-workspace `{revision, hidden_labels, hidden_prefixes, visible_labels, chips:{route,fast_track,pr,from,blocked,stepper}}`, `applyMutation(workspace, expected_revision, mutate)` CAS(불일치 → `{ok:false, conflict:true, revision, policy}`), 기본 seed 적용, `state-paths.js`에 `displayPolicyFilePath()` 추가(`workspaceStateDir` 하위 `display-policy.json`), atomic tmp+rename·cold-load 캐시(`visible-workspaces-store.js` 보일러플레이트). mutation은 동일 라벨의 `visible_labels`/`hidden_labels` 동시 존재를 정규화로 차단.
2. `server/ws/display-policy-handlers.js` 신설 — `ui-order-handlers.js` 미러: `subscribe-display-policy`(snapshot 응답+SUBSCRIBERS 등록), **`unsubscribe-display-policy`**(`handleUnsubscribeUiOrder` :139-158 미러 — set-workspace가 먼저 연결을 전환한 뒤 도착하므로 **전체 workspace 레지스트리를 순회해 제거**; 없으면 구 workspace fanout이 새 정책을 clobber), `display-policy-set`(payload `{expected_revision, policy patch}` 검증→store CAS→응답 `{applied, conflict, revision, policy}`→성공 시 workspace 구독자 fanout `display-policy-snapshot`), `detachDisplayPolicy`(close 전용), `__resetDisplayPolicyForTest`. `server/ws/connection.js` switch·close 정리·`server/ws/index.js` re-export, `app/protocol.js` MessageType/MESSAGE_TYPES에 3개 요청 타입+push 타입 등록.
3. `config.toml [labels]` 서버 측 제거 — `server/config.js`(`DEFAULT_VISIBLE_*`·normalize 함수들·`readRuntimeConfig` label 블록·typedef), `server/app.js`(`toBootstrapPayload` label 구성·중복 normalize 헬퍼·bootstrap 주입의 label 필드 — `/api/config` 라우트 자체와 `workspace_config`는 유지), 잔존 `[labels]` 감지 시 `console.warn` 1회(`[auth]` deprecation 전례 `config.js:204-208`).
4. 테스트 — `server/display-policy-store.test.js`(cold-load 기본값·round-trip·CAS conflict 시 디스크 불변·seed·visible/hidden 정규화), `server/ws.display-policy.test.js`(`ws.ui-order.test.js` 모델: subscribe snapshot·set 성공 fanout·conflict 응답·detach·**set-workspace 후 unsubscribe가 구 workspace 등록을 제거해 stale fanout이 없는 케이스**), `server/config.test.js`·`server/app.test.js`의 labels 케이스 제거/치환.

검증: `npx vitest run server/display-policy-store.test.js server/ws.display-policy.test.js server/config.test.js server/app.test.js` green.

## Phase 2: 서버 — enrich 파생 (from·blocked 사유·PR 칩·deps 타입)

1. blocked 사유 표면화 — `server/list-adapters.js fetchBlockedIssues`(:238): `bd ready --explain` 분기 항목에 blocker id 배열 태깅, stored 분기(`bd list --status blocked`) 항목에 external 표식 부여. **`mergeIssueLists`(:318-328)는 shallow spread라 both 케이스에서 한쪽이 소실됨 — 병합 후 두 출처 맵을 조합하는 별도 pass로 `blocked_info: {external: boolean, reason: string|null, blockers: string[]}`를 합성**(reason은 `metadata.blocked_reason`, 부재 시 null; 일반 mergeIssueLists 의미는 불변).
2. from 파생 — `fetchListForSubscription`(:156)에 `enrichIssuesProvenance(items, cwd)` 추가: 항목 id 벌크(한정된 목록)로 `bd dep list <ids...> --json` 1회 실행, `discovered-from` 엣지를 `issue.from_id`로 부착. per-issue try/catch fail-quiet 방어 map, bd 실패 시 원본 반환. **구현 첫 단계에서 실제 discovered-from 엣지로 레코드 shape·방향을 핀**(기본 방향 down: 조회 이슈가 의존하는 쪽 → `from_id`는 엣지의 **to**; fail-quiet가 방향 오류를 가리지 않도록 픽스처에 `from_id === edge.to` 단언 포함).
3. PR 칩 ci 죽은 필드 정리 — `workflow-enrich.js:321`이 이미 `ci: null` 하드코딩이라 카드의 `· CI` 절(:133-136)은 현재도 도달 불가. `chips.pr.ci` 필드와 카드의 불가지 절을 함께 삭제(관측 동작 변화 없음 — 테스트는 shape만 단언).
4. detail deps 흐름 신설 — 현재 `data.dependencies`는 어디서도 채워지지 않아 상세가 항상 "의존성 없음"을 렌더(`bd show --json`에 deps 배열 없음 실측). detail 조회 경로에 `bd dep list <id> --json` 결과를 `type` 포함 `dependencies`로 부착하는 흐름을 **필수 경로로 신설**. 클라(`edgeId`)는 Phase 3에서 소비.
5. 테스트 — blocked 3케이스 픽스처(stored-only/dep-only/both — both에서 external+blockers 모두 보존, reason 유무), from 파생(엣지 있음/없음/방향/bd 실패 fail-quiet), pr 칩 shape, detail deps 부착. `runBd*` inline `vi.mock` 컨벤션.

검증: `npx vitest run server/list-adapters.test.js server/workflow-enrich.test.js` (+신규 테스트 파일) green.

## Phase 3: 클라 — 정책 소비 + 카드/상세 렌더

1. 구독 wiring — `app/main.js`: `display-policy` 구독을 ui-order 싱글턴 패턴으로(부트스트랩 구독 :1134 옆, `clearAndResubscribe` :728-729에 `clearDisplayPolicySubscription()`+`subscribeDisplayPolicy()` 삽입 — **clear는 `unsubscribe-display-policy` 송신**, `clearUiOrderSubscription` :709-715 미러, reconnect 경로 포함), `display-policy-snapshot` push를 신규 스토어(`app/data/` 소형 스토어)로 수신. 기존 `label_display_policy` 배관 제거 — `app/main.js:29-149` 중복 normalize/`readBootstrapConfig` label 처리·`refreshConfigSnapshot`의 label 의존, `app/state.js` typedef·기본값·normalize와 `config_changed` diff 중 **label 비교만 삭제(`workspace_config.default_workspace` 비교 :290-291은 보존)**. 관련 테스트(`app/state.test.js`·`app/main.config-refresh.test.js` 등 4개) 갱신.
2. 정책 모듈 — `app/utils/label-policy.js` 신설: `isLabelVisible(label, policy)`(우선순위 visible exact > hidden exact > hidden prefix > 표시), `visibleLabels(labels, policy)`. `app/utils/label-badge.js`+test 삭제(전 뷰 무소비 확인 완료된 죽은 코드).
3. 카드 렌더 — `app/views/board/card.js`: `chipsTemplate`에 라벨 칩(정책 필터)·`↩ from <id>` 칩(`card_ctx`에 `onFromChipClick` 추가, `onChildClick` 패턴 stopPropagation→`gotoIssue`)·blocked 칩(⏸ `blocked: <reason>`/⛓ `blocked: <ids 최대2+n>`) 추가, PR 라벨의 `· CI` 절 삭제(:133-136), `policy.chips.*` 토글로 각 파생 칩·stepper 렌더 가드. 정책은 board ctx로 전달.
4. 상세 렌더 — `app/views/detail-panel/index.js` `depsTemplate`(:497-520): Phase 2.4가 신설한 `dependencies`(type 포함)를 소비해 ⛓ blocks / ↩ discovered-from 아이콘 표시(미지 타입은 아이콘 없이 id만). 라벨 영역은 전체 표시 유지.
5. 테스트 — `label-policy.test.js`(우선순위 표), `card.test.js`(라벨 필터·from 클릭 내비·blocked 두 형태·PR 번호만·토글 off), `detail-panel/index.test.js` deps 타입 케이스.

검증: `npx vitest run app/utils/label-policy.test.js app/views/board/card.test.js app/views/detail-panel/index.test.js app/state.test.js` green.

## Phase 4: 클라 — 라벨 필터 + 설정 패널 + 문서

1. 라벨 필터 — `app/views/board/filter-bar.js`에 라벨 multi-select popover(workspace-picker manage 체크박스 패턴: 버튼+outside-click/Escape), `board/index.js` `filters`에 `labels: []` 추가(:161), `applyFilters` OR 절(:180-200)·`filterActive`(:209-215)에 라벨 축 반영, 옵션 목록은 로드된 이슈 라벨 합집합(숨김 정책 무관 전체). 변경은 `refreshFromStores()` 경유.
2. 설정 패널 — ⚙ 버튼을 `.header-actions`(`app/index.html`)에 추가, `new-issue-dialog.js` 패턴의 `<dialog>`: 라벨 pill 목록(합집합+정책 상태, 클릭 토글: 표시중→hidden 추가 / exact 숨김→hidden 제거 / prefix 숨김→visible 추가), 숨김 prefix 추가·제거, 칩/stepper 토글 6개. 저장은 `display-policy-set`+`expected_revision`, 응답 adopt, conflict 시 silent 1회 재시도(worker 패턴), 실패 toast.
3. 문서 — `AGENTS.md`에 dotfiles 계약 정합 단락(canonical=dotfiles `docs/contracts/workflow.{md,yaml}`, beads-ui=소비자, 계약 표면 변경 시 동반 정합).
4. 테스트 — `board/index.test.js`에 라벨 필터 시나리오(선택/해제/OR/child-folding 상호작용), 설정 패널 테스트(pill 3분기 시맨틱·CAS retry·toggle 반영).

검증: `npx vitest run app/views/board/index.test.js` (+설정 패널 테스트) green.

## Phase 5: 통합 검증·번들·전달

1. `npm run tsc && npm run lint && npm test && npm run prettier:write` (= `npm run all` 상당) 전체 green, `npm run build`로 `app/main.bundle.js`(+map) 재생성·커밋 포함.
2. ad-hoc live 서버(`BDUI_FRONTEND_MODE=live bdui start --host 127.0.0.1 --port 3001` 별도 포트)로 수동 스모크: 라벨 칩 기본표시/숨김 seed, from 칩 내비, blocked ⏸/⛓, 라벨 필터, 설정 패널 저장·타 클라이언트 반영, config.toml `[labels]` 잔존 경고 1회.
3. PR 생성 → implementation 게이트(통합 diff 1회) → finish 경로(공유 서버 `bdui-shared restart`+검증은 머지 후 AGENTS.md 규칙대로).

검증: `npm run all` green + 스모크 체크리스트 증거 + 번들 포함 커밋.

## Test scope

RED→GREEN 시임(각 Phase 매핑):

- Phase 1: display-policy-store CAS/seed/정규화 · ws display-policy subscribe/set/fanout/conflict
- Phase 2: blocked 사유 3케이스 파생 · from 벌크 파생(fail-quiet 포함) · chips.pr shape
- Phase 3: label-policy 가시성 우선순위 · card 렌더(필터·from 내비·blocked·토글)
- Phase 4: applyFilters 라벨 OR · 설정 패널 pill 3분기·CAS retry

제외(사유): 마크업/스타일 세부(시각 확인으로 충분), main.js 배선(기존 통합 테스트 갱신으로 커버), 삭제되는 label-badge/config labels 테스트(대체 시임이 커버).

## 비목표

기존 bead 라벨 데이터 청소 · dotfiles 계약 문언(짝 스펙) · UI-aruw 범위(route 추론 칩·metadata 편집) · 검색 토큰 문법 · 라벨 색상 커스텀 · 의존 그래프 시각화(타입 아이콘 이상).
