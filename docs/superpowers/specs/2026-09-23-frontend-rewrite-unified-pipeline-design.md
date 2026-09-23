---
scope:
  - app/
  - server/worker/runnable-cache.js
  - server/worker/title-cache.js
  - server/ws/monitor-handlers.js
  - server/ws/display-policy-handlers.js
  - server/display-policy-store.js
  - server/ws/bench-handlers.js
  - server/worker/bench-runs.js
  - server/worker/compare-projection.js
  - server/ws/connection.js
  - server/ws/index.js
  - server/app.js
  - scripts/build-frontend.js
  - scripts/ui-shots.mjs
  - docs/adr/
---

# beads-ui 프런트엔드 재작성 — 통합 파이프라인 화면과 모바일 우선 (UI-dbn6)

- Bead: UI-dbn6 · route: full_plan — 같은 저장소 안의 Phase 4개(§7).
- 형제: UI-j2h3(서버 핫픽스) · UI-7xrf(스냅샷·이벤트루프, 이 Bead 뒤). §8.
- 선행 의존: UI-j2h3(`blocks`) — §3.7이 그 설계의 병렬 일괄 러너와 §4.5 압축
  빌드 규칙을 소비한다. 엣지는 구현 진입만 막고 이 문서와 계획서 작성은 병행한다.
- 기준: `main` / `4d5cef234269ccbcdd7f5ef458ac7a26e43e8174`
- 미리보기: `http://100.122.98.8:9000/2026-09-23-beads-ui-redesign.html`
  (파일 `~/tmp/mockups/2026-09-23-beads-ui-redesign.html`). 예시 데이터를 쓴 시각
  산출물이며 동작의 정본은 이 문서다.
- 상태: 사용자 검토용 완성 초안. 구현·스펙 게이트 승인 전이다.

## 1. 사용자 결과와 확인한 원인

사용자가 얻는 것: 데스크톱과 휴대폰에서 같은 일을 하는 하나의 파이프라인 화면.
전 레포를 한눈에 보다가 레포 하나로 좁히고, 카드에서 바로 조작하며, 설정과 상세는
시트로 연다. 느린 것·안 쓰는 것·깨지는 것이 없다.

현재 상태(2026-09-23 조사):

| 항목 | 현재 |
| --- | --- |
| 화면 | Worker(레포)·Monitor(전 레포)·비교·ADR 4탭, 같은 5레인을 두 탭이 따로 조립 |
| 코드 | `app/` 비테스트 약 4만 줄(뷰 3만·utils 5천·data 2천), CSS 1만 3,708줄 |
| Monitor | 1초 `setInterval`마다 `buildLanes` 전체 재계산 + 전체 재렌더(시각 라벨 갱신용) |
| Worker 구독 | 목록 구독 6개(ready·blocked·in-progress·resolved·closed·deferred) + worker-queue |
| Monitor 구독 | monitor-pipeline 하나(상세 패널이 열려도 구독) |
| 전송 | 번들 842KB·CSS 283KB 비압축(압축은 UI-j2h3) |
| 모바일 | 640px 이하 단일 열 스택은 있으나 드래그 재배치 불가, 헤더 3줄, 설정 창 비좁음 |
| 안 쓰는 것 | 도움말 범례, 실험 벤치, 표시 정책 탭, 정렬 체인 편집기(사용자 확인) |

사용자 결정(2026-09-23): 위 네 가지 제거; 비교표·ADR 탭(단순화)·여러 저장소
일괄 설정·칩 바인딩·드래그 앤 드롭(모바일 지원 추가) 유지; Worker와 Monitor를
범위 선택(전체/레포) 하나의 화면으로 통합; 모바일에서 데스크톱 작업 대부분 수행;
가드·차단 동작 현행 유지; 서버 코어는 다시 쓰지 않음.

## 2. 검토한 접근과 선택

1. **프로토콜을 유지한 채 `app/`를 새 정보 구조로 다시 쓰고, 프로토콜 의미를 담은
   순수 모듈은 옮겨서 재사용한다** — 선택. `buildLanes`(5,200줄)·대기 어휘·배치
   판정·사용량 집계·전사 파서는 계약 의미와 8천 줄 넘는 테스트를 이미 갖고 있어
   다시 쓰면 의도가 새기 쉽다. 렌더·레이아웃·상태 배선·CSS는 전부 새로 쓴다.
2. 기존 뷰를 두고 CSS와 레이아웃만 정리 — 두 탭의 이중 조립과 5천 줄 뷰 파일이
   남고, 통합 화면·모바일 조작은 결국 다시 쓰게 된다.
3. 서버까지 전면 재작성 — 20만 줄, 운영 중 자동화 중단 위험. 사용자도 배제했다.

## 3. 정보 구조

### 3.1 화면과 오버레이

| 종류 | 이름 | 해시 | 내용 |
| --- | --- | --- | --- |
| 화면 | 파이프라인(기본) | `#/pipeline` | 5레인 + 범위 선택 + 툴바 |
| 화면 | 비교 | `#/compare` | 프리셋·오케스트레이션·구현자 비교표 |
| 화면 | ADR | `#/adr` | 레포별 현재 결정 목록 |
| 오버레이 | 이슈 상세 | `?issue=<id>` | 어느 화면 위에서든 |
| 오버레이 | 전사 드로어 | — | attempt·session_ref 전사 |
| 오버레이 | 설정 | — | 레포 모드 / 일괄 모드 |
| 오버레이 | 새 이슈, 문서 뷰어, 재개·계속 다이얼로그, 복구 선택 다이얼로그 | — | 현행 유지 |

레거시 해시 `#/worker`·`#/monitor`·`#/board`·`#/issues`·`#/epics`·`#/issue/<id>`는
`#/pipeline`(+`?issue=`)로 정규화한다. `#/monitor`는 범위를 전체로, `#/worker`는
저장된 레포로 둔다.

헤더는 한 줄: 브랜드 · 범위 선택기 · 화면 nav · (오른쪽) 요청 진행 표시(지금의
헤더 스피너, `activity-indicator.js` 그대로) · 사용량 미터 · 테마 · ⚙ · 새 이슈.
모바일은 브랜드·범위·사용량·⚙만 남기고 nav는 범위 선택기 안의 목록으로
들어간다.

새 이슈 다이얼로그는 전체 범위에서 **대상 저장소 선택**을 갖는다(기본값은 연결
저장소). 다른 저장소를 고르면 `set-workspace` 뒤 `create-issue`를 보낸다.

### 3.2 범위(전체 / 레포)

- 범위는 화면이 아니라 필터다. `전체`는 가시 워크스페이스 전부, `레포`는 하나.
- 표시 범위와 연결 저장소는 **별개 상태**다. `localStorage beads-ui.scope`는
  `*` 또는 root_dir(표시 범위), 기존 `beads-ui.workspace`는 언제나 실제 root_dir
  (연결 저장소)이며 지금의 "숨김·미등록이면 지운다" 규칙은 후자에만 적용한다.
  부팅은 두 값을 읽어 `set-workspace`(연결)를 한 번 보내고 monitor 채널을 연다;
  목록 구독을 먼저 열고 다시 여는 이중 로드는 없다.
- 레포 범위 진입과 상세 열기는 연결 저장소를 그 레포에 맞춘다. `root_dir`를 받지
  않는 이슈 변경(`edit-text`·`update-status`·`label-add` 등)이 연결 저장소를 쓰기
  때문이다. 전체 범위에서 다른 레포의 카드를 열면 상세를 열기 전에
  `set-workspace`를 보내고 범위 표시는 전체로 둔다. 상세 해시는
  `#/pipeline?issue=<id>&root=<encodeURIComponent(root_dir)>`로 root를 보존해
  재로드 때 같은 저장소로 연결한 뒤 연다(`root` 없는 레거시 해시는 연결 저장소).
- `set-workspace`는 서버가 그 연결의 목록 구독을 모두 해제하므로, 전환 응답
  `changed: true` 뒤에 열려 있는 표면의 구독(상세 `issue-detail`, 레포 범위의 완료·
  보류 목록)을 다시 연다. monitor·impl-presets 채널은 서버 전역이라 그대로다.
- 워커 조작(`worker-queue-*`·`worker-attempt-*`·머지·폐기·외부 대기·프로브)은 항상
  `root_dir`를 명시한다(서버 `targetWorkspaceOf`가 검증).

### 3.3 파이프라인 화면

레인 5개는 두 범위에서 같다: 후보 · 대기(병렬 영역 + 직렬 레인) · 실행 중 ·
PR 대기 · 완료. 레포 범위는 후보 아래 접힌 `보류 <N>` 선반과 완료 기간 선택
(오늘/7일/30일/전체)이 추가된다. 레인 접힘 상태는 범위별 localStorage.

전체 범위에서는 각 레인 안을 **레포별 묶음**으로 그리고(묶음 머리: 레포 이름 ·
개수 · 접기), 접힘 상태는 지금의 `beads-ui.monitor.sections`처럼 레포별로
저장한다(사용자 결정 2026-09-23). 레포 범위는 묶음 없이 평면이다.

레인 머리의 조작: 후보 레인은 필터 줄(route · 준비도 `착수 가능/준비 필요` ·
우선순위 · 타입 · 라벨 · `blocked 표시` 체크 · `표시된 것만` 체크)과 정렬 선택
(지금의 프리셋 4종, 체인 편집기 없음), 실행 중 레인은 정렬 선택(시작순·경과순),
PR 대기 레인은 `[일괄 머지]`/`[일괄 머지 중단]`, 완료 레인은 기간 선택(레포 범위).

툴바(레인 위 한 줄):

| 범위 | 왼쪽 | 오른쪽 |
| --- | --- | --- |
| 전체 | 레포 띠(레포 칩: 이름 · 실행 n/슬롯 · 자동화 점 · ⚙) | 실행·PR 대기·오늘 완료 수, 누적 사용량 |
| 레포 | 자동화 ▶/⏸ · 자동 머지 · 동시 실행 · 직렬 레인 수 · 검색 | 저장소 작업 줄(배포 SHA·검증 상태·[배포 실행]·타임라인 열기·검증/배포 스크립트 보기·`이 workspace에서 실행` 토글) |

레포 띠는 지금의 데크를 한 줄 칩으로 줄인 것이다: 칩 클릭은 그 레포로 범위
전환, 점 클릭은 자동화 토글(`worker-automation-toggle`), ⚙는 그 레포 설정. 두 줄
타일·부하 레일·비영 카운트 나열은 없앤다. 모바일에서는 가로 스크롤 띠다.

저장소 작업 줄과 스크립트 뷰어(`GET /api/repo-ops-script`, SHA 고정 본문·복사),
타임라인 드로어, `[배포 실행]`, opt-out 토글의 재료는 레포 범위에서 여는
`worker-queue` 채널 스냅샷(`workspace_info.repo_ops`·`repo_operations`·
`repo_operation_policy`·`declared_base`)이다(§4.2). 이슈가 하나도 없는 저장소도
그 채널이 스냅샷을 주므로 배포 실행·선언 표시가 유지된다.

### 3.4 카드 문법

`2026-08-25-card-header-grammar-unify-design.md` §2 줄 순서와 §5.1 슬롯 표,
`2026-08-28-chip-grammar-unify-design.md` 칩 클릭 의미, `2026-09-02-worker-
operation-surface-unify-design.md` §3.2 `.op-btn` 자리 규칙, 대기 어휘 4종(UI-a5l2
§3.1)을 승계한다. 바꾸는 것은 셋뿐이며 각각 이 문서가 슬롯을 정한다.

1. **진행 띠**: 슬롯 3의 stepper는 카드 상단 가장자리의 5칸 띠로 그린다(spec·
   plan·구현·PR·머지, 산출물 있음 = 어두운 단계색, 리뷰·현재 = 밝은 단계색,
   없음 = 선색). 슬롯 3에는 활동 줄·위임 접기·자식 롤업만 남는다. 라벨 달린
   stepper는 이슈 상세 상단에만 있다. 띠는 카드 전체를 묶는 유일한 시각 장치다.
2. **대기 행 조작**: 굵은 포인터(터치)에서는 `↑ ↓ ✕` 대신 `⋯` 하나가 이동 시트를
   연다(§3.6). 가는 포인터(마우스)에서는 `✕`와 드래그가 지금처럼 남고 `↑↓`는
   없다.
3. **시각 줄**(슬롯 7)과 상대 시각·경과 라벨은 렌더가 아니라 1초 티커가
   `data-ts` 텍스트만 갱신한다. 시간이 **가시성**을 바꾸는 요소 — 유예 칩
   `⏳ n초`(`graceChipTemplate`)와 `[지금 시작]`(`startNowButtonTemplate`)의 유예
   조건 — 는 텍스트 갱신으로 끝나지 않으므로, 레인 조립이 다음 시간 경계(가장
   이른 유예 만료 시각)를 함께 돌려주고 화면은 그 시각에 한 번 해당 레인만 다시
   렌더한다. 매초 전체 재렌더는 없다.

칩·배지의 뜻은 `title` 툴팁(모바일은 길게 눌러 팝업)으로 보인다. 도움말 다이얼로그는
없고, 범례 문장은 `wait-vocabulary.js`의 표를 그대로 쓴다.

### 3.5 이슈 상세

데스크톱은 오른쪽 패널(폭 560px, 레인 위 오버레이), 모바일은 전체 화면 시트.
순서: 머리(ID·route·판정 칩·닫기) → 제목 → 라벨 stepper → 실행 설정(유효값 + 층
표시, 편집은 행별 시트, 프리셋 적용 바) → 의존 → 속성(상태·우선순위·라벨) → 설명
(markdown) → 외부 작업(있을 때) → Worker 이력(세션 행: 전사·이어하기·재개 명령
복사·토큰 사용량 상세 펼치기; 문의·해결 세션 배지의 Discord 링크) → 댓글 →
과업 프롬프트(펼침). 3층 유효 설정 편집기의 값 해석은 `execution-defaults.js`를
그대로 쓴다.

### 3.6 모바일

- 레인 = 화면. 하단 레인 바(후보·대기·실행 중·PR·완료, 각 카운트와 단계색 점)로
  레인 하나씩 본다. 데스크톱 폭(≥ 1100px)에서는 5열, 그 사이(720~1099px)는 레인
  2열 + 세로 완료.
- 카드 조작 버튼은 높이 44px, foot 한 줄. 두 개를 넘는 조작은 `⋯` 시트로 접는다
  (폐기·폐기 포기·처분 등 파괴적 조작은 항상 시트 안, 확인 문구 유지).
- 드래그 앤 드롭: 포인터 이벤트로 다시 쓴다. 마우스는 바로 끌고, 터치·펜은 350ms
  길게 누른 뒤 끌며 가장자리에서 자동 스크롤한다. 드롭 대상은 병렬 영역·직렬
  레인·행 사이. 다른 레포 직렬 레인 드롭 거부는 유지.
- 이동 시트(`⋯`): `↑ 위로`·`↓ 아래로`·`맨 앞으로`, `병렬로`·`직렬 n`, `지금 시작`,
  `대기에서 빼기`. 각 버튼은 기존 op(`worker-queue-reorder`·`-place`·`-start-now`·
  `-remove`) 하나다.
- 상세·설정·전사는 전체 화면 시트, 헤더 ✕와 뒤로가기(hash)로 닫는다.
- 사용량 미터는 헤더의 작은 막대 셋, 탭하면 계정·전환 팝업.

### 3.7 설정

| 모드 | 진입 | 탭 |
| --- | --- | --- |
| 레포 | 레포 범위 ⚙, 레포 띠 ⚙, 상세의 프리셋 바꾸기 | 워커 프리셋 · 세션 · 계정 |
| 일괄 | 전체 범위 ⚙ | 워커 프리셋 · 세션 · 계정 · 칩 바인딩(서버 전역) + 대상 레포 체크 |

표시 정책 탭은 없다. 워커 프리셋 탭은 UI-7yh2 설계(2026-09-10)의 **배치와
모양**(맨 위 적용 바, 구분선 기반 그룹, 접힌 리뷰·지침)만 승계하고, 프리셋 의미는
현행 서버 그대로다: 프리셋은 `applies_to` 계열(일반 17키 / quick_fix 8키) 하나에
속하고 적용 바는 계열별로 하나씩(일반 프리셋 선택·적용, Quick fix 프리셋 선택·
적용)이며 각각 `apply-impl-preset-global` 한 번이다(ADR UI-u6ud-10). 폼 값과
적용 프리셋의 차이 판정(`applied_exec_preset`·`applied_quick_fix_preset` 대비)도
계열별로 지금처럼 한다. 세션·계정 탭의 필드와 저장 의미(strict 거절, per-key
마지막 쓰기)는 현행 그대로다. 일괄 모드의 세션 탭은 지금의 `SESSION_ROWS`
세 필드(`workflow_mode`·`bdui_url`·`base_sync_accept_local_commits`)를 여러
저장소에 쓰는 기능을 그대로 갖는다. 일괄 적용 러너는 UI-j2h3가 병렬로 바꾼
`bulk-preset-apply.js`·`bulk-account-apply.js`를 옮겨 쓴다(선행 의존).

### 3.8 ADR

레포마다 머리줄(이름 · 현재 n · 이력 n · 신호 배지 둘: 색인, 인용) 아래 현재 결정만
한 줄씩(ID · 제목 · 요약 · 날짜). 클릭은 문서 뷰어. 이력은 `이력 n건 보기`로 접고,
배지 클릭은 체커 오류 목록 팝업(`CheckerError` 그대로). 후보 스펙 신호
(`candidates`)와 교차 인용은 팝업 안에서만 보인다. 데이터는 `adr-snapshot` 그대로.

### 3.9 비교

표·필터(기간·레포·route·묶기)·판정 기준(접힘)은 유지하고 실험 섹션·`새 실험`은
없앤다. `get-compare`는 `include_bench: false`로 고정하고 `runs`·`bench_rows`는
읽지 않는다.

## 4. 설계

### 4.1 코드 구조

```
app/
  index.html  main.js               부트: ws·store·router·shell
  core/       ws.js protocol.js router.js state.js
  model/      순수 모듈(DOM 없음): lane-model(buildLanes) placement wait-vocabulary
              queue-blockers blocker-scope token-usage execution-defaults
              exec-settings-chip chip-preset-binding transcript-lines report-marker
              relative-time sort closed-range active-attempts failure-labels
              failure-sentences merge-steps child-rollup carryover-index scope-overlap
              keyed-patch stores(subscription-issue-store·subscriptions-store·
              monitor-pipeline-store·worker-queue-store·exec-preset-store·
              session-log-store) session-model bulk-observation bulk-preset-apply
              bulk-account-apply blockers dep-candidates
  ui/         tokens.css base.css primitives(button chip sheet popover toast dialog
              ticker viewport)
  screens/    pipeline/ (shell scope toolbar repo-strip lanes card mini-row
              running-tile lane-bar move-sheet drag) detail/ transcript/ settings/
              adr/ compare/ new-issue/ doc-viewer/
```

규칙: `model/`은 브라우저 전역을 읽지 않고 입력→출력만 한다(기존 파일을 옮기며
서명은 유지, 테스트 동반). `screens/`는 store 구독 + `model` 호출 + lit-html
템플릿만 갖고, 요청 전송은 `core/ws.js`의 `send` 하나를 옵션으로 받는다. 한 파일
1,000줄을 넘기지 않는다(`buildLanes`는 예외로 두되 분할은 UI-7xrf 이후 별도).

**서버가 import하는 모듈은 경로를 옮기지 않는다.** `app/protocol.js`,
`app/data/keyed-patch.js`, `app/data/closed-range.js`와 `app/utils/`의
`active-attempts`·`worker-eligibility`·`execution-defaults`·`session-preferred`·
`spec-after-blocker`·`compare-problem-criteria`·`token-usage`·`failure-sentences`·
`transcript-lines`·`awaiting-user-reason`·`carryover-index`·`complex-judgement`·
`quickfix-lane`·`quickfix-resume-kind`는 `server/`(`scheduler.js`·`title-cache.js`·
`worker-handlers.js` 등 30여 곳)가 그 경로로 import하므로 제자리에 남고, 새
`model/`은 그 경로를 import한다. Phase 4의 삭제 대상에서도 제외한다. 그 밖의
순수 모듈만 `model/`로 옮긴다.

### 4.2 데이터 계층과 구독

| 화면·상태 | 구독 |
| --- | --- |
| 파이프라인(전체·레포 공통) | `subscribe-monitor-pipeline` 하나 |
| 레포 범위 | 추가로 그 레포의 `subscribe-worker-queue` 하나 |
| 레포 범위 완료 레인 펼침 | `subscribe-list closed-issues`(params.since = 기간) |
| 레포 범위 보류 선반 펼침 | `subscribe-list deferred-issues` |
| 이슈 상세 | `subscribe-list issue-detail`(`detail:<id>`) + 요청형 읽기(댓글·프롬프트·이력·세션 참조) |
| 설정·상세 | `subscribe-impl-presets`(부팅 시 1회, 5KB) |
| 비교·ADR | 현행(`get-compare` 요청형, `subscribe-adr` 화면 표시 중만) |
| 전사 | `subscribe-session-log` 드로어 표시 중만 |

- 레인은 두 범위 모두 모니터 채널의 `workspaces[]` 행으로 조립한다. 그 행은 같은
  `decorateQueue` 결과(큐·attempts·bead_workflow·bead_scope·bead_titles·
  bead_labels·wait_reasons·external_waits)와 `runnable`·`session_active`를 싣는다.
  레포 범위는 그 레포의 `subscribe-worker-queue`를 **추가로** 연다: 저장소 작업
  재료(`workspace_info.repo_ops`·`repo_operations`·`repo_operation_policy`·
  `declared_base`·`merge_queue_state`·`lane_states`·`pr_observations`)와 변경
  응답의 채택은 그 채널의 `worker-queue-store`(낮은 revision 응답을 버리는 `set()`
  규칙)가 맡고, 기존 상세 컴포넌트가 기대하는 `queueStore` 데이터·통지도 이것이
  공급한다. `hasPipeline()`이 거짓인 빈 저장소는 모니터 행이 없어도 이 채널이
  스냅샷을 준다.
- 전체 범위의 변경 응답 `queue`는 모니터 행에 덮어쓴다(`adopted-queue.js`). 규칙을
  명시한다: 저장소별로 마지막에 관측(모니터 행)하거나 채택한 `revision`보다 낮은
  응답은 버리고, 채택은 모니터 store의 `seq`를 바꾸지 않으며, 그 저장소의 모니터
  행 revision이 채택분 이상이 되면 채택분을 지운다(`pruneAdopted`).
- 목록 구독 6개(ready·blocked·in-progress·resolved·closed·deferred)는 부팅에서
  없어지고, 지금 `workspace-adapter.js` `beadOverlay()`가 그 다섯 열에서 만들던
  재료를 서버 투영이 대신 싣는다. 허용하는 **추가 프로토콜 필드**(모두 fail-quiet,
  부재 시 클라이언트가 칩·필터를 생략):
  - `runnable[]`·`session_active[]`: `priority: number|null`, `issue_type:
    string|null`(`bd list` 행 값).
  - `bead_overlay[id]`(모니터 행): `priority`, `issue_type`, `labels`, `from_id`
    — title-cache의 같은 `bd show` 페이로드에서 읽어 `BeadRecord`에 더한다. 대상
    id 집합은 지금과 같다(레인 구성원 ∪ done ∪ runnable ∪ pr_wait ∪ session_active).
  - `bead_children: Record<parent_id, { ids: string[], closed: string[] }>`(모니터
    행): 자식 롤업 재료. `bead_dependents`와 같은 워크스페이스 목록 스냅샷에서
    `parent`로 색인하며 `runnable-cache`가 그 스냅샷을 이미 갖는다.
  - `worker_created_from`·`carried_to`는 지금 서버 투영에 이미 있다.
  후보 필터(route·준비도·우선순위·타입·라벨·blocked·표시된 것만)와 정렬은
  클라이언트가 이 행들에서 한다. 서버 변경 파일: `server/worker/runnable-cache.js`,
  `server/worker/title-cache.js`, `server/ws/monitor-handlers.js`, `app/protocol.md`.
- `subscribe-display-policy`는 없다. 라벨 표시는 **고정 규칙**으로 지금 저장된
  정책과 같게 둔다(사용자 결정 2026-09-23): 접두 `reviewed:`·`skipped:`(퇴역
  미러 라벨, 서버 `RETIRED_MIRROR_LABEL_PREFIXES`)·`export:`·`provides:`와 라벨
  `has:spec`·`pr`은 숨기고, `frontend`·`backend`·`complex`·`session-preferred`·
  `worker-ineligible`·`spec-after-blocker`는 판정 칩으로, 나머지는 라벨 칩으로
  보인다. 칩 6종(route·fast_track·pr·from·blocked·stepper)은 모두 보인다. 규칙은
  `model/label-policy.js` 상수 하나다.
- 상대 시각·경과 시간은 `ui/ticker.js`가 1초마다 `[data-ts]` 요소의 텍스트만 바꾼다.
  `buildLanes`는 입력 키 — 모니터 store `seq`, 저장소별 채택 revision, 워커 큐
  store 세대, 완료·보류 목록 store 세대, 범위·검색·필터·정렬·완료 기간 값, 시간
  경계 통과 — 로 메모하고 그중 하나가 바뀔 때만 다시 계산한다. lit-html 재렌더는
  그 재계산과 시간 경계(§3.4) 때만 일어난다.
- 채널 재구독·`seq` 규칙·keyed patch 조립은 `model/keyed-patch.js`와 두 store를
  그대로 쓴다.

### 4.3 조작 보존

부록 A(§9)의 조작 인벤토리 — 조사한 현재 프런트엔드의 사용자 조작 전부 — 가 새
화면에서 같은 WS 메시지·payload·확인 조건으로 도달 가능해야 한다. 자리만 §3의
규칙에 따라 옮긴다. 도달 불가한 조작이 하나라도 남으면 Phase는 끝나지 않는다.
`delete-issue`·`update-assignee`·`worker-queue-toggle`·`monitor-auto-toggle`은
지금도 UI에 없으므로 만들지 않는다.

### 4.4 시각 체계

- 토큰: `app/ui/tokens.css`는 지금의 표면·글자·5단계·layer·chip 토큰을 유지하고
  쓰지 않는 값을 지운다. 밝은 테마 오버라이드도 유지(`data-theme`).
- 글꼴: 기기 기본 한글 산세리프(`-apple-system, "Apple SD Gothic Neo", …`)와
  ID·명령용 모노 하나. 크기 11·12·13.5·15·17·22px, 굵기 500/600/700.
- 면: 카드에 테두리 대신 면 명도 차이(바탕 < 패널 < 카드). 색이 있는 곳은 진행 띠,
  상태 점, 조작 강조(`--accent`) 셋. 대기·실패는 배지 색으로만 말한다.
- CSS 구조: `tokens.css` → `base.css`(리셋·원시 요소) → 화면별 스타일시트 하나씩,
  모바일 우선(`min-width: 720px`, `1100px` 두 분기 + `pointer: coarse`). 전체 CSS
  4,000줄 이하. 클래스 이름은 화면 접두(`pl-`·`dt-`·`st-`…)로 충돌을 막는다.
- 모션: 시트 열림·카드 이동 확인만 200ms, `prefers-reduced-motion`은 즉시.

### 4.5 서버 정리(마지막 Phase)

- 제거: `display-policy-handlers.js`·`display-policy-store.js`와
  `subscribe-display-policy`/`display-policy-set`; `bench-handlers.js`·
  `bench-runs.js`와 `bench-run-create`; `compare-projection.js`의 `runs`·
  `bench_rows` 조립; `monitor-auto-toggle` 라우트; `connection.js` 디스패치 표와
  `protocol.js` `MESSAGE_TYPES`·`protocol.md`(Removed 목록에 기재).
- 남김: 서버가 `include_bench`를 받으면 무시한다(구 클라이언트 호환은 필요 없지만
  `bad_request`로 바꾸지 않는다).
- 기존 `app/` 파일 중 `model/`로 옮기지 않은 뷰·유틸·테스트와 `app/styles.css`
  전부 삭제 — 단 §4.1의 서버 import 모듈은 제자리에 남긴다. UI-j2h3의 압축
  빌드는 빌드 시점에 존재하는 `.js`·`.css`를 찾으므로 삭제·이동에 영향이 없다.

### 4.6 빌드·배포

`scripts/build-frontend.js`의 진입점은 그대로 `app/main.js`. 번들 예산은
minify 350KB 이하(gzip 120KB 이하, 압축은 UI-j2h3). 라이브 모드
(`BDUI_FRONTEND_MODE=live`) 동작 불변.

## 5. 데이터 흐름 요약

1. 부팅 → `beads-ui.scope`·`beads-ui.workspace` 읽기 → `set-workspace`(연결
   저장소) → `subscribe-monitor-pipeline`(+ 레포 범위면 `subscribe-worker-queue`)
   → 첫 스냅샷으로 `buildLanes` 1회 → 렌더.
2. 패치 도착 → store가 바뀐 키만 갱신 → `buildLanes` 재계산 → 바뀐 레인만
   재렌더(lit-html 키 지정 `repeat`).
3. 카드 조작 → `send(op, {…, root_dir, expected_revision})` → 응답 `queue`를
   레포 범위면 워커 큐 store `set()`, 전체 범위면 §4.2 채택 규칙으로 반영 → CAS
   충돌 1회 재시도(현행) → 토스트.
4. 상세 열기 → (다른 레포면 `set-workspace` → 열린 구독 재개) → `issue-detail`
   구독 + 요청형 읽기; 해시에 `root` 보존.
5. 1초 티커 → `[data-ts]` 텍스트만 갱신; 다음 시간 경계에 그 레인만 재렌더.

## 6. 오류 처리와 검증 조건

오류 처리는 현행 의미를 그대로 옮긴다: 서버 오류는 토스트(`PROPAGATED_ERROR_TYPES`
는 상세·설정이 그대로 보여줌), 치명 오류 다이얼로그, 재연결 시 재구독과 `seq` 갭
재구독, `continuation_mismatch`·`prior_session_unavailable` 다이얼로그.

수용 기준

| 항목 | 기준 |
| --- | --- |
| 조작 보존 | 부록 A의 모든 행이 새 화면에서 도달 가능(체크리스트를 PR에 첨부) |
| 모바일 | 390px에서 모든 화면·시트의 `scrollWidth === innerWidth`, 조작 버튼 높이 ≥ 44px, 드래그·이동 시트로 대기열 재배치 가능 |
| 렌더 | 패치·입력 변화·시간 경계가 없는 유휴 60초 동안 lit-html 렌더 0회(티커만), 8개 레포 첫 스냅샷 렌더 100ms 이하(데스크톱) |
| 구독 | 기본 상태(전체 범위, 아무 표면도 열지 않음)의 WS 구독은 monitor-pipeline + impl-presets 둘; 레포 범위는 worker-queue 하나 추가, 열린 표면마다 그 표면의 구독(완료·보류 목록, issue-detail, session-log, adr)만 추가 |
| 코드 | `app/` 비테스트 2만 줄 이하, CSS 4,000줄 이하, 파일당 1,000줄 이하(`buildLanes` 예외) |
| 제거 | 도움말·벤치·표시 정책·정렬 체인의 클라이언트·서버 코드와 프로토콜 항목 없음 |

검증 방법

- 단위: `model/` 테스트는 경로만 바꿔 그대로 통과. 화면별 jsdom 테스트는 (1) 스냅샷
  fixture(`server/ws/keyed-frames-fixture.js` 재사용)로 레인·카드 렌더, (2) 조작
  클릭이 정확한 WS 타입·payload를 보내는지, (3) 모바일 뷰포트 분기.
- 화면: `scripts/ui-shots.mjs <url>`이 npx 캐시의 Playwright로 390·1280 폭에서
  파이프라인(전체·레포)·상세·설정·ADR·비교를 캡처하고 `scrollWidth` 초과를
  보고한다(의존성 추가 없음, Playwright 부재 시 안내 종료). 각 Phase PR은 캡처를
  첨부하고 사용자가 확인한다.
- Pre-Handoff Validation 전부(`tsc`·`lint`·`prettier`·`vitest`).

## 7. Phase 후보(full_plan)

각 Phase는 배포 가능한 완결 상태로 착지한다. 새 shell이 아직 안 바꾼 표면은 기존
컴포넌트를 같은 옵션으로 마운트해 유지한다(기존 CSS는 마지막 Phase까지 남긴다).

| Phase | 내용 | 검증 |
| --- | --- | --- |
| 1 기반과 파이프라인 | `core/`·`ui/`·`model/` 이동(서버 import 모듈 제외), 새 shell(헤더·범위·라우터·티커), 파이프라인 화면(레인·레포별 묶음·카드·툴바·레포 띠·모바일 레인 바·드래그·이동 시트), 서버 투영 추가(`runnable` 필드·`bead_overlay` 필드·`bead_children`), Worker·Monitor 탭 제거. 상세·설정·전사·ADR·비교는 기존 컴포넌트를 같은 옵션(연결 저장소의 워커 큐 store 포함)으로 마운트 | 부록 A의 파이프라인·데크·Worker 툴바 행, 모바일 캡처 |
| 2 상세와 전사 | 이슈 상세(패널·시트), 전사 드로어, 새 이슈, 문서 뷰어 | 부록 A의 상세·전사 행 |
| 3 설정·ADR·비교 | 설정(레포·일괄), 사용량 팝업, ADR 목록, 비교표(실험 없음) | 부록 A의 설정·ADR·비교 행 |
| 4 정리 | §4.5 서버 정리, 옛 뷰·CSS 삭제, protocol.md, ADR 착지, 코드 예산 확인 | §6 코드·제거 기준 |

## 8. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | user_request | 독립 착지 검증 묶음(프로토콜 불변 서버 단일 unit; 이 Bead가 그 러너·압축 규칙을 소비하므로 UI-dbn6 ← UI-j2h3 `blocks`, 문서·계획 작성은 병행) | 없음 | UI-j2h3 |
| 형제 | beads-ui | user_request | 독립 착지 검증 묶음(스냅샷 축소는 새 프런트엔드가 소비하는 키를 전제) spec-after-blocker | UI-dbn6 | UI-7xrf |

- 관찰: `buildLanes` 5,200줄 분할 — 이 설계는 옮기기만 하며, 분할은 UI-7xrf가
  스냅샷 키를 정한 뒤가 안전하다(미생성 사유: 전제 미확정).
- 관찰: `bd kv` 기반 세션 기본값의 dotfiles 어휘 변경은 이 설계 밖(ADR UI-u6ud-11).

## 9. 부록 A — 조작 인벤토리(보존 대상)

파이프라인(카드·행·타일·툴바): 헤더 요청 진행 표시 · `worker-queue-place`(대기로,
레인 선택·상세·이동 시트) · `worker-queue-reorder`(드래그·이동 시트) ·
`worker-queue-remove`(✕·이동 시트)
· `worker-queue-start-now` · `worker-queue-set-slots` · `worker-queue-set-serial-
lane-count` · `worker-queue-set-orchestration-defaults`(설정) · `worker-automation-
toggle`(툴바·레포 띠) · `worker-merge-auto-toggle` · `worker-merge-queue-add`(머지) ·
`worker-merge-queue-add-all`(일괄 머지) · `worker-merge-queue-remove`(취소·일괄 중단)
· `worker-cleanup-retry` · `worker-resolve-in-session` · `worker-discard` ·
`worker-discard-abandon` · `worker-revise-fix` · `worker-revise-approve` ·
`worker-attempt-pause` · `worker-attempt-resume`(이어하기·⋯ 다른 방법으로·지시 입력)
· `worker-provider-probe-now` · `external_wait_check`/`_stop`/`_resume` ·
`worker-repo-operation-dismiss` · `worker-repo-operation-deploy-run` ·
`worker-repo-ops-opt-out-toggle` · 검증/배포 스크립트 뷰어(`GET /api/repo-ops-
script`, 복사) · `chip-preset-toggle` · 판정 칩 사유 팝업 · 의존 칩 이동(타 레포는
`set-workspace` 선행) · ID 복사 · 실패 배지 상세 · 자식 롤업 · 검색·필터(route·
준비도·우선순위·타입·라벨·blocked 표시·표시된 것만)·정렬 프리셋 4종·실행 중
정렬·완료 기간·보류 선반·레인 접힘·레포별 묶음 접기 · 세션 배지 → 전사(Discord
링크 포함).

상세: `edit-text`(제목·설명) · `update-status` · `update-priority` · `label-add`/
`-remove` · `dep-add`/`-remove`(확인) · `update-workflow-meta`(route, full_plan 이탈
확인) · `update-exec-settings` · `update-impl-target` · `apply-impl-preset` ·
`get-comments`/`add-comment` · `get-bead-prompt` · `get-session-refs` ·
`get-bead-timeline` · `get-session-defaults`/`get-workspace-accounts`(전역 층 표시) ·
문서 열기(`GET /api/doc`) · 경로 복사 · 대기로 · 외부 대기 조작 · 세션 이력의
토큰 사용량 상세 펼치기.

전사: `subscribe-session-log`/`unsubscribe-session-log`(attempt·launch_id·
session_ref) · `get-attempt-prompt` · 따라가기 · 접기 · 복사.

설정: `set-session-defaults` · `set-worker-url-common` · `set-workspace-accounts` ·
`worker-provider-limit-policy-set` · `impl-preset-create`/`-update`/`-delete` ·
`apply-impl-preset-global`(계열별) · `impl-preset-bind`(일괄 모드 칩 탭) ·
`get-worker-system-prompt` · 계정 카탈로그(`GET /api/claude-usage`·`/api/codex-
usage`) · 일괄 대상 선택·실패만 재선택·취소 · 일괄 세션 탭(`workflow_mode`·
`bdui_url`·`base_sync_accept_local_commits`).

전역: `set-workspace` · `git-pull-workspace` · `set-workspace-visibility` ·
`list-workspaces` · `create-issue`(Ctrl/Cmd+N) · 테마 · 계정 전환(`POST /api/
claude-account/switch`·`/api/codex-account/switch`) · 사용량 폴링(화면 표시 중만).

비교: `get-compare`(기간·레포·route·묶기·기준·새로고침) · 행 클릭 → 상세. ADR:
문서 열기 · Bead로 이동 · 필터·검색.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud — 데이터 계층은 bd CLI shell-out이고 구독별 store는 전체
  issue push를 받아 내용 변경만 통지한다. 이 설계는 store를 옮겨 쓰고 채널을 줄일
  뿐 데이터 계층을 바꾸지 않는다.
- 전제: ADR UI-u6ud-10 — 프리셋 정체성·칩 클릭 의미·칩 바인딩 편집 위치(일괄 창의
  서버 전역 탭)를 그대로 따른다.
- 전제: ADR UI-u6ud-9 — 사용량 집계 규칙은 `token-usage.js`를 옮겨 그대로 쓴다.
- 전제: ADR UI-u6ud-2 — ADR 화면 신호는 설치본 체커 결과를 그리기만 한다.
- 전제: ADR UI-u6ud-11 — Worker 주소·저장소 defaults 화면의 세 값 분리 표시 유지.
- 전제: ADR UI-u6ud-3, UI-u6ud-4, UI-u6ud-5 — 머지·게이트·배포 조작의 의미와 버튼
  집합은 바꾸지 않는다.
- 전제: ADR UI-a5l2 — 가드·대기 어휘 4종은 그대로다.
- 파이프라인 화면은 하나이고 범위(전체·레포)는 필터이며, 두 범위 모두
  monitor-pipeline 채널의 같은 행으로 레인을 조립하고 레포 범위만 worker-queue
  채널을 더한다; 카드는 슬롯 표를 승계하되 진행은 상단 5칸 띠로 그리고 대기 행
  조작은 굵은 포인터에서 이동 시트 하나다; 모바일은 레인 하나씩 보인다. 되돌리기
  어려움: 라우터·구독·카드 렌더러·설정 진입·모바일 조작이 함께 움직이고 Worker
  탭의 목록 구독 6개가 서버 투영(`bead_overlay` 필드·`bead_children`)으로
  대체된다. 맥락 필요: 왜 두 탭을 합쳤는지(같은 5레인의 이중 조립, 사용자 결정)와
  왜 목록 구독 대신 서버 투영인지가 코드에 남지 않는다. 실제 절충: 레포 전용
  재료(완료 기간·보류)를 펼칠 때만 목록 구독으로 보충하는 대신 부팅 구독을
  줄였다. `summary`: "파이프라인 화면은 하나이고 범위(전체·레포)는 필터이며 두
  범위 모두 monitor-pipeline 채널의 같은 행으로 5레인을 조립하고 레포 범위만
  worker-queue 채널을 더한다; 카드는 슬롯 표를 승계하되 진행은 상단 5칸 띠이고
  굵은 포인터의 대기 행 조작은 이동 시트 하나이며 모바일은 레인 하나씩 보인다"
  → ADR, supersede UI-l48z
- 도움말 범례·실험 벤치·표시 정책·정렬 체인 편집기 제거. 되돌리기 쉬움: 사용자
  결정이며 프로토콜 Removed 목록과 git 이력이 근거를 남긴다. 맥락 필요 낮음
  → ADR 아님
- `app/`의 `model/`(순수)·`screens/`(렌더) 분리 규칙. 되돌리기 쉬움: 디렉터리
  관례이고 AGENTS.md Coding Standards가 소유한다. 맥락 필요 낮음 → ADR 아님
