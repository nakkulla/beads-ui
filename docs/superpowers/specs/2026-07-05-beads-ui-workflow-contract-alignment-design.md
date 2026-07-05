# beads-ui 신 workflow 계약 정합 + 전면 개선 — 설계 스펙

- **날짜:** 2026-07-05
- **상태:** 설계 승인됨 (브레인스토밍 세션, 목업 기반 확정)
- **정본 계약:** dotfiles `docs/contracts/workflow.yaml` (PR2 `d3998ef6`에서 도입, 2026-07-05 기준 최신 확인)
- **참고:** `docs/superpowers/plans/2026-07-02-workflow-contract-slim-re-registration.md`
  (구 실행 플랜 — 탐색 결과·배포 절차 참고용. 본 스펙이 설계를 대체하며, 구 플랜의
  "설계 확정안"은 전면 재설계로 폐기됨)
- **목업:** `.superpowers/brainstorm/45713-1783261227/content/` (board-card-v3, detail-workflow-v2,
  board-columns, gate-children)

## 1. 배경과 목표

dotfiles 워크플로우 재편 PR2가 계약을 슬림화했다: 레인/토폴로지(route)/리뷰 프로필/followup
분류 제거, `next_gate`·reviewed 증거 중심 재편. beads-ui는 폐기 스키마를 5개 파일에
하드코딩하고 있고(`app/utils/workflow-fields.js`, `app/state.js`, `app/main.js`,
`server/config.js`, `server/ws.js`), `update-workflow-settings` 핸들러가 폐기 키 6종과
`lane:*` 라벨을 중앙 dolt에 계속 재기입한다(능동 드리프트, 현재 진행형).

**목표:**

1. 능동 드리프트 즉시 차단 — UI가 폐기 어휘를 다시 쓰지 못하게 한다.
2. 신 계약 기준 렌더링 — `next_gate`·리뷰 증거 중심으로 보드/상세를 재구성한다.
3. 재발 방지 아키텍처 — 계약이 또 바뀌어도 표시가 조용히 사라지지 않는 구조(제네릭 우선).
4. 사용자 요구 UX 개선 — 게이트 보드, 보드 필터, 마지막 워크스페이스 기억, Sync/Git Pull
   정리, 워크스페이스 등록 UI, server-mode 라이브 갱신(폴링).
5. NAS 운영성 — `/healthz` 심화, 배포→재시작 자동화, 로그 회전(뒤 2건은 dotfiles 소유).
6. NAS 재배포 — 배포 직전 사용자 확인 게이트 하에 릴리스 갱신·재구동.

**비범위(명시적 제외):** assignee 보드 표시, 상세 편집 모드 상호배제, ntfy 재알림 강화,
Legacy 정리 쓰기 액션(CLI 몫), `next_gate` 편집(계약상 display-only), 구 bead 마이그레이션
(dotfiles 스펙 의도: 마이그레이션 없음).

## 2. 등록부 아키텍처 — 제네릭 우선 + 큐레이션 오버레이

### 2.1 공유 등록부 모듈 `shared/workflow-registry.js`

클라이언트(esbuild 번들)와 서버(node ESM)가 동일 파일을 import하는 단일 정의 지점.
내용은 정본 계약(workflow.yaml)의 재기술이다:

- `GATES`: `['spec_review','plan_review','execution','implementation_review','pr_delivery','pr_finish']`
  — 순서 = 진행 순서. `NEXT_GATE_VALUES = [...GATES, 'blocked']`.
- `METADATA_KEYS`: 키 → `{ section, label, kind }`. `kind`는 `sha | hash | path | url | enum |
  int | flag`. enum 키는 `values` 포함(`review_runtime: ['codex','claude']`,
  `*_review_verdict: ['APPROVE','APPROVE_WITH_CHANGES']`, `*_review_final_source:
  ['external','self']`, flag 3종: `['yes','no']`).
- `section` 분류: `core`(next_gate, execution_base_sha, review_runtime) /
  `evidence.spec|plan|impl`(reviewed_at_sha, spec_reviewed_sha(spec 한정 legacy 대체 키),
  content_hash, freshness_checked_at_sha, handoff 계열, verdict, final_source,
  external_attempts, impl_reviewed_diff_range) / `artifacts`(spec_id, plan, pr_url) /
  `flags`(human_decision_required, brainstorming_required, skill_creator_required).
- `OBSOLETE_KEYS`: `execution_lane, execution_mode, workspace_policy, branch_policy,
  finish_action, review_profile, followup_kind, source_repo, source_bead, source_artifact,
  source_pr, target_repo, target_paths, required_action, handoff` — Legacy 표시 전용.
- `OBSOLETE_LABEL_PREFIXES`: `['lane:']`.
- `EVENT_LABELS`(`reviewed:spec/plan/impl`, `skill-related`)·`DERIVED_LABELS`(has:spec,
  has:plan, needs:* 3종, pr — 계약의 derived 정의 재기술).
- `EDITABLE_KEYS = ['review_runtime']` — UI 쓰기 허용 유일 키.

### 2.2 렌더링 3계층 (핵심 불변조건)

메타데이터 키는 반드시 셋 중 하나로 표시되며, **어떤 키도 조용히 사라지지 않는다**:

1. 등록 키(`METADATA_KEYS`) → 큐레이션 섹션(§4 상세 뷰).
2. 폐기 키(`OBSOLETE_KEYS`) + `lane:*` 라벨 → **Legacy 접힘 섹션**(read-only, 개수 표시).
3. 그 외 미등록 키 → **"기타 메타데이터" 접힘 섹션**(키명 자동 라벨화, 값 그대로).

### 2.3 사본 해소

- `app/utils/workflow-fields.js`: 등록부 소비형으로 재작성. `FIELD_LABELS`·구 enum·
  `ROUTE_TUPLES`·`deriveRouteTuple`·`deriveReviewProfile`·`workflowSettingsMutationValues`
  제거. 신규 빌더: 게이트 트랙 모델, S/P/I 요약 모델, evidence/artifacts/flags/legacy/other
  row 빌더.
- `server/config.js`: `WORKFLOW_SECTION_FIELDS`/`EDITABLE_WORKFLOW_FIELDS` 하드코딩 제거,
  등록부에서 유도. TOML의 `detail.workflow_summary` 섹션 allowlist는 신 섹션 id 기준으로
  유지(구 섹션명 `route`/`followup` 등은 무시).
- `app/state.js`·`app/main.js` `DEFAULT_CONFIG`: workflow 부분을 등록부 유도값으로 교체
  (중복 리터럴 제거).
- `server/ws.js`: 쓰기 검증 enum을 등록부 import로 교체.
- `app/utils/workflow-summary.js`(미사용 사본) 삭제 + 참조 스윕.

### 2.4 계약 동등성 테스트 (드리프트 경보)

vitest `test/workflow-registry.contract.test.js`: dotfiles 계약 파일을
`BDUI_WORKFLOW_CONTRACT`(env) 또는 기본 경로 `~/Documents/GitHub/dotfiles/docs/contracts/workflow.yaml`
에서 읽어, 존재할 때만 다음을 검증하고 없으면 skip(CI/NAS 안전):

- 계약 `metadata.keys` 키셋 == 등록부 `METADATA_KEYS` 키셋.
- 계약 enum 값 == 등록부 enum 값 (`next_gate`, verdict, final_source, review_runtime, flag).
- 계약 라벨(event/derived) == 등록부 라벨 정의.

계약이 바뀌면 이 테스트가 로컬에서 즉시 실패해 의도적 등록부 갱신을 강제한다.

## 3. 쓰기 경로 — 차단과 축소 (구현 1순위)

- `update-workflow-settings` 핸들러(`server/ws.js:1274` 부근)와
  `validateWorkflowSettingsPayload`·`LANE_LABELS`·lane 라벨 재부착 로직 **삭제**.
  클라이언트의 6-select 편집 패널·드래프트 상태·`workflowSettingsMutationValues`도 삭제.
- 신규 `update-review-runtime` 메시지: `{ id, value: 'codex' | 'claude' | null }`.
  서버는 등록부 enum으로 검증, `bd update <id> --set-metadata review_runtime=<v>`
  (null이면 `--unset-metadata review_runtime`), 성공 시 `bd show <id> --json` readback 반환.
  다른 어떤 workflow 키도 이 경로로 쓸 수 없다.
- 프로토콜(`app/protocol.js`)에서 `update-workflow-settings` 제거, `update-review-runtime` 추가.
- 일반 필드 편집(제목·설명·상태·우선순위·라벨·의존성·댓글·삭제)은 현행 유지.

## 4. 상세 뷰 — Workflow 카드 재구성 (목업 detail-workflow-v2 B안)

기존 "Workflow settings" 카드를 **Workflow 카드**로 교체. 사이드 패널 내 구성(위→아래):

1. **게이트 트랙**: 6점 + 현재 게이트명. 채색 규칙 —
   - `next_gate`가 게이트값이면: 진행 순서상 커서 이전 게이트 = 초록(done), 커서 = 보라(cur),
     이후 = 회색.
   - `next_gate=blocked`이면: done 판정을 증거로 유도(reviewed:spec → spec_review done,
     reviewed:plan → plan_review done, reviewed:impl → execution·implementation_review done,
     pr_url → pr_delivery done), 첫 미완 게이트 점을 빨강 + 게이트명 자리에 빨간 "blocked".
   - `next_gate` 부재(구 bead·일반 bead): 트랙 미표시.
2. **게이트별 evidence 블록** (Spec/Plan/Impl 서브카드, 전부 상시 노출):
   - 헤더: 게이트명 + 상태(✓ 초록 = reviewed:* 라벨) + verdict 배지
     (APPROVE 초록 / APPROVE_WITH_CHANGES 주황 / 미리뷰 회색).
   - 행: `final_source · external_attempts`, `reviewed_at_sha`(Spec은
     `spec_reviewed_at_sha` 우선, 없으면 `spec_reviewed_sha`), `content_hash`,
     `freshness_checked_at_sha`, Spec 한정 `spec_handoff_at_sha`·`spec_handoff_content_hash`,
     Impl 한정 `impl_reviewed_diff_range`. 값 없는 행은 생략.
   - SHA/hash 값은 7자 축약 + 전체값 title 툴팁 + 복사 버튼(기존 copy 토스트 패턴).
3. `execution_base_sha` 행(있을 때).
4. **Artifacts**: `spec_id`·`plan` 경로(축약 표시 + 복사 버튼), `pr_url` → **PR #번호** 링크
   (URL 끝 숫자 파싱, 실패 시 "PR" 텍스트; `safeWorkflowUrl` 검증 유지). bare `handoff`
   행은 폐기 키로 Legacy행.
5. **Flags**: `human_decision_required`·`brainstorming_required`·`skill_creator_required`가
   `yes`일 때만 경고 톤 행 표시.
6. **Review runtime** 편집 셀렉트(default(config)/codex/claude) — 유일한 쓰기. 저장은
   `update-review-runtime`, 실패 시 기존 토스트 + 드래프트 유지 패턴.
7. **Legacy 접힘**: 폐기 키·`lane:*` 라벨의 key=value 나열(read-only, 개수 뱃지).
8. **기타 메타데이터 접힘**: 미등록 키 제네릭 행(개수 뱃지).

workflow 관련 메타데이터·라벨이 전혀 없으면 카드 자체를 렌더하지 않음(현행과 동일).

**내부 품질 수정:** `onDescSave`의 전역 셀렉터(`#detail-root textarea`)를 다른 섹션과 같은
섹션 스코프 셀렉터로 수정(섹션 리오더 시 파손 방지).

## 5. 보드 — 카드·컬럼 재구성

### 5.1 카드 (목업 board-card-v3 확정)

위→아래: 제목 → 게이트 트랙(§4와 동일 채색 규칙, 소형) → 요약 행 → 라벨 행 → 메타 행.

- **S/P/I 3단계 요약**: 글자 = 산출물 존재, ✓ = 리뷰 통과.
  - S: 흐림 = spec 없음 / 보통 = `has:spec`(또는 spec_id) / 초록 `S✓` = `reviewed:spec`.
  - P: 동일 규칙(`metadata.plan` / `reviewed:plan`).
  - I: 2단계 — 흐림 = 미리뷰 / 초록 `I✓` = `reviewed:impl` (`has:impl` 라벨은 계약에 없음).
- **PR 칩**: `pr_url` 유효 시 **PR #번호**, 클릭하면 새 탭으로 PR 열기
  (카드 클릭 내비게이션과 이벤트 분리 — stopPropagation).
- **라벨 행**: `has:*`·`reviewed:*`는 요약에 흡수되므로 보드 카드에서 숨김.
  `needs:*`·일반 라벨만 기존 표시 정책으로 렌더. (List·상세의 라벨 표시는 현행 유지.)
- workflow 메타데이터 없는 bead: 트랙·요약 행 생략(카드 낮게 유지).
- lane/route 칩·`LANE_CHIP_LABELS`·route 칩 로직 제거.

### 5.2 컬럼 모드 토글 (목업 board-columns B안)

툴바에 **상태 | 게이트** 토글(localStorage `beads-ui.board.mode` 영속).

- **상태 모드**: 현행 6컬럼(Blocked/Ready/In Progress/Deferred/Resolved/Closed)·드래그 유지.
  단 Blocked↔Ready 간 드래그는 불가 처리(둘 다 status=open이라 무의미 — 드롭 타깃에서 제외,
  시각 피드백 없음).
- **게이트 모드**: 컬럼 = 6게이트 + blocked(빨강 톤). 표시 대상 = `next_gate` 보유 &&
  status ≠ closed. 컬럼 배정 = `next_gate` 값. **드래그 없음**(read-only — next_gate는
  계약상 display-only 커서).
- **child 처리(목업 gate-children A+전개 하이브리드)**: child = ID가 `<parent-id>.` 접두인
  계층 이슈(bd `--parent` 점 표기). 게이트 모드에서 자기 `next_gate`가 없는 child는 자기
  카드를 갖지 않는다. 대신 parent 카드 하단에 진행 바 + `닫힘 n/전체 m` 카운트를 표시하고,
  그 영역 클릭 시 카드 안에 child 목록(제목·상태)이 인라인 전개/접힘된다(카드 내비게이션과
  이벤트 분리). child가 자기 `next_gate`를 가지면 일반 규칙대로 자기 카드로 표시된다.
- 게이트 모드 정렬: 컬럼 내 `created_at` desc(상태 모드와 동일 비교기 재사용).

### 5.3 보드 필터·영속화

- List 뷰의 `store.filters` 중 **search(텍스트)·type**을 보드에도 적용(두 뷰가 상태 공유,
  localStorage `beads-ui.filters` 기존 경로 재사용). status 필터는 보드에 부적용(보드 자체가
  status 파티션; 게이트 모드도 무관).
- 보드 툴바에 검색 입력·타입 필터 노출(List와 동일 컴포넌트 재사용).
- Deferred 컬럼 토글을 localStorage `beads-ui.board`에 영속화(현재 session-local인
  `show_deferred_column`을 `closed_filter`와 같은 경로로).

## 6. 워크스페이스 / 멀티디바이스

### 6.1 마지막 워크스페이스 기억

- 부트스트랩 복원 우선순위를 **localStorage(`beads-ui.workspace`) > 서버 default_workspace**로
  수정(현재는 서버 default가 이겨서 NAS 접속 시 항상 dotfiles로 시작).
- **WS 재연결 시**: 클라이언트가 재구독 전에 `store.workspace.current`로 `set-workspace`를
  재선언(현재 서버가 연결을 DEFAULT_WORKSPACE로 재시드하는데 클라이언트가 침묵 — 모바일/탭
  복귀 시 dotfiles로 되돌아가는 주원인).

### 6.2 Sync / Git Pull 정리 (모드 인지 버튼)

- `list-workspaces` 응답 엔트리 확장: `{ path, name, backend: 'sqlite' | 'dolt-server',
  has_git: boolean }`. `backend`는 `resolveWorkspaceDatabase` 결과(metadata 소스 =
  dolt-server)로, `has_git`은 워크스페이스 루트 `.git` 존재로 판정.
- **Git Pull 버튼**: `has_git=false`면 숨김(NAS 스텁 워크스페이스는 git 체크아웃이 아니라서
  현재 에러 — 구조적 원인 제거).
- **Sync 버튼**: `backend='dolt-server'`(중앙 직결)면 숨김 — 중앙 서버 모드에서 dolt
  pull/push는 무의미하며 Beads 운영 규칙(routine pull/push 금지)과도 상충.
- 남는 조합에서 실제 에러가 재현되면 구현 단계에서 systematic-debugging으로 근본 원인 수정.

### 6.3 워크스페이스 등록 UI

- 피커에 "+ 등록" 버튼 → 다이얼로그: (a) 서버가 `scan_roots` 재스캔으로 찾은 미등록
  워크스페이스 목록에서 선택, (b) 절대경로 직접 입력.
- 신규 WS 메시지 `register-workspace { path }`: 서버가 `resolveWorkspaceDatabase`로 `.beads`
  유효성 검증 후 registry 등록(기존 `registerWorkspace()` 재사용), 갱신된 목록 반환.
  실패 시 사유 메시지(경로 없음/beads 아님). 기존 HTTP `/api/register-workspace`는 유지.

### 6.4 server-mode 라이브 갱신 — 주기 폴링

- 서버가 **구독자가 있는 워크스페이스**의 활성 리스트 구독을 주기적으로 refresh
  (기본 30초, env `BDUI_POLL_INTERVAL_MS`로 조정, `0` = 비활성).
  기존 `refreshAllActiveListSubscriptions` 경로 재사용.
- 스냅샷 비교로 변경 없으면 push 생략(기존 SubscriptionRegistry 스냅샷/서명 비교를 publish
  경로에서 보장 — 구현 시 확인·보강). 폴링 주기 오류는 로그만 남기고 다음 주기 계속.
- 파일 watcher(시작 워크스페이스 한정)와 뮤테이션 트리거는 현행 유지 — 폴링은 보완 계층.

### 6.5 정리·문서화

- 죽은 `workspace-changed` 프로토콜 경로 제거(서버 미발신, 클라 핸들러 잔존).
- `docs/`에 `BDUI_ALLOWED_ORIGINS`, `workspace_config` TOML 스키마
  (default_workspace/scan_roots/workspaces), 멀티디바이스 동작(연결 단위 워크스페이스) 문서화.

## 7. NAS 운영성

### 7.1 beads-ui 소유 (이 레포)

- **`/healthz` 심화**: `{ ok, checks: { bd: {ok}, db: {ok} } }` — 기본 워크스페이스에서
  경량 `bd` 호출로 중앙 DB 접근을 검증. 결과 10초 캐시(폭주 방지), 실패 시 HTTP 503.
  기존 정적 `{ok:true}` 대체.

### 7.2 dotfiles 소유 (요구사항만 — 구현은 dotfiles 레포 별도 커밋)

- `beads-ui-supervise.sh`·`beads-ui-expose.sh`의 준비/상태 판정을 `/healthz` 호출로 일원화
  (현행: `/` 200 + 셸 `bd list` 사이드채널).
- `beads-ui-deploy.sh`에 재시작 옵션(예: `--restart`): symlink 교체 후 supervisor pidfile의
  node 프로세스 그룹 TERM → supervisor 루프가 신 릴리스로 재기동. 기본은 현행(재시작 없음).
- `beads-ui-supervise.sh`(·가능하면 `dolt-supervise.sh`) 로그 회전 — tunnel supervisor의
  `rotate_log()` 패턴(1MB/2000행) 재사용.

## 8. 에러 처리

- WS 뮤테이션 실패: 기존 토스트 + 드래프트 유지 패턴 유지(`update-review-runtime` 포함).
- `register-workspace` 실패: 다이얼로그 내 사유 표시(경로 검증 실패/이미 등록됨).
- PR 번호 파싱 실패: 칩 텍스트 "PR"로 폴백(링크는 유지).
- 폴링 bd 오류: 해당 주기 skip + debug 로그(연쇄 재시도로 부하 증폭 금지).
- `/healthz` 실패: 503 + checks 상세 — supervisor가 재시작 판단에 사용.
- 등록부에 없는 enum 값(예: 구 bead의 이상값): invalid 스타일 행으로 표시(숨기지 않음).

## 9. 테스트 전략

- **신규**: 등록부-계약 동등성(§2.4), 게이트 트랙 채색(커서/blocked 유도/부재), S/P/I 3단계,
  PR #번호 파싱·폴백, 게이트 모드 그룹핑(next_gate 배정·closed 제외·미보유 제외),
  child 판별(점 ID)·rollup 카운트·인라인 전개, Legacy/기타 접힘 분류(3계층 불변조건),
  `update-workflow-settings` 제거 확인(unknown type 에러), `update-review-runtime`
  검증/readback/unset, 폐기 키 어떤 경로로도 미기입, 보드 필터 공유, Deferred 영속화,
  Blocked↔Ready 드롭 불가, 재연결 `set-workspace` 재선언, 부트스트랩 복원 우선순위,
  `list-workspaces` backend/has_git, `register-workspace` 검증, 폴링(변경 없음 push 생략·
  주기 오류 무시), `/healthz` 캐시·503.
- **갱신**: `board.test.js`(lane/route 칩 테스트 제거→트랙/요약), `detail.test.js`
  (workflow settings 편집 스위트 제거→신 카드), `ws.mutations.test.js`(settings 스위트 교체),
  `config.test.js`(allowlist→등록부), persist/navigation 테스트.
- **최종**: `npm run all`(lint·typecheck·vitest·build) green. 로컬 서버로 구 bead
  (폐기 값 보유 — Legacy 표시)·신 bead(`next_gate`·증거 — 트랙/카드 표시) 양쪽 렌더 확인.
  UI 편집 경로에서 폐기 키가 중앙 dolt에 기입되지 않음을 `bd show --json` readback으로 확인.

## 10. 구현 순서(플랜 지침)와 배포

구현 플랜은 다음 순서를 따른다: **(1) 쓰기 차단(§3) → (2) 공유 등록부 + 사본 해소(§2) →
(3) 상세 뷰(§4) → (4) 보드(§5) → (5) 워크스페이스(§6) → (6) healthz(§7.1) → (7) 죽은 코드
삭제·문서화 → (8) 테스트 정비 → (9) 배포. dotfiles 측 3건(§7.2)은 병행 가능한 별도 트랙.**

**배포(NAS 게이트):**

1. `npm run all` green + 로컬 렌더 확인 후 origin push.
2. NAS: `beads-ui-deploy.sh <ref>` (+재시작 옵션 구현 시 `--restart`, 아니면 runbook의
   수동 재시작 절차).
3. **배포 직전 사용자 확인 필수** — tailnet 노출 공유 서비스(9 워크스페이스) 라이브 반영.
4. 배포 후: `https://mong-nas.<tailnet>.ts.net` 응답, `/healthz` ok, 구/신 bead 렌더,
   워크스페이스 기억·폴링 동작 확인.
