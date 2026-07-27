# 워커 탭 UX 개선 4종 구현 계획 (UI-raqh)

- 날짜: 2026-07-27
- Bead: UI-raqh
- 라우트: full_plan (spec_backed에서 승급 — `independent_phases_2_plus`)
- 스펙: `docs/superpowers/specs/2026-07-27-worker-tab-ux-design.md`
  (spec 게이트 통과: `codex@12a44d617ef89b93123f3d480278e7fe52211a06`)
- 시각 디자인 근거: `~/tmp/mockups/2026-07-27-ui-raqh-worker-ux-v2.html`
  (frontend-design 스킬 적용 v2 — 자동 진행은 조용하게, 머지 진행 한 곳만 대담하게)

## Context

워커 탭은 지금 세 가지를 말하지 못한다. (1) 세션이 토큰을 얼마나 쓰는지 —
`server/worker/runner/claude.js` `normalize()`가 stream-json의 `usage`를 그대로
버린다. (2) 폴러가 실제로 무엇을 하는 중인지 — `pr_wait` 행은 `관측 대기`
배지만 보여주고, gh 관측 중인지 로컬검증을 돌리는 중인지 구분이 없다.
(3) 머지 클릭 후 수 분간 무슨 단계인지 — `pr-actions.js`의 7단계 정리 시퀀스가
클라이언트에 전혀 노출되지 않는다. 여기에 후보 페인 정렬이 `cmpEffectiveRank`
고정이라는 네 번째 불편이 더해진다.

승인된 설계는 **스냅샷 일원화(A안)**다. 새 서버 상태(토큰 usage · 폴러 활동 ·
머지 진행)를 전부 기존 `worker-queue-snapshot` fanout에 실어 보내고, 클라이언트는
스냅샷만 보고 렌더링한다. 새 WS 메시지 타입을 만들지 않는다는 뜻이며, 새로고침과
다중 클라이언트에서 같은 상태가 보인다는 뜻이기도 하다. 정렬만 순수 클라이언트
기능이다.

구조적으로 새 상태를 담을 자리는 두 곳이다.

- attempt별 usage → 실행 중은 프로세스-와이드 인메모리(`usage-store.js`),
  종료 시 `Attempt.usage`로 `queue.json`에 영속화. `decorateQueue()`가 둘을
  합쳐 내보낸다.
- bead별 폴러 활동 + 머지 진행 → 프로세스-와이드 비영속 인메모리
  (`activity-store.js`). `pr-observations.js`와 같은 성격(원격/진행 관측이지 큐
  배치가 아님)이라 영속화하지 않고, 재시작 시 사라지는 것이 옳다.

두 스토어 모두 `runtime.js`의 싱글턴에 등록해 쓰는 쪽(scheduler / pr-poller /
pr-actions)과 읽는 쪽(`decorateQueue()`)이 같은 인스턴스를 본다. **두 스토어의
모든 API는 `pr-observations.js`와 동일하게 workspace로 먼저 스코프한다** —
`path.resolve(workspace)` 레인 아래에 attempt_id / bead_id를 둔다. 프로세스가
여러 workspace를 동시에 담당하므로, 전역 키잉은 다른 workspace의 상태를
스냅샷에 노출시킬 수 있다.

계약 영향은 없다. bd metadata 키·라벨 어휘는 건드리지 않고, 새 상태는 전부 워커
내부(queue.json · 메모리 · 스냅샷)다.

### 시각 표현의 권위 (스펙 §3/§4 "스피너"에 대한 정정)

스펙 §3/§4는 활동 배지와 머지 진행에 "+ 스피너"를 적었으나, 그 뒤 사용자 지시로
frontend-design 스킬을 적용해 v2 목업이 승인되었다(UI-raqh bead notes,
2026-07-27). 확정된 위계는 다음과 같고, **이 계획은 v2를 따른다**.

- 자동 진행 작업(폴러 `checking`/`verifying`)은 색 강조·스피너 없이 중립 배지 +
  숨쉬는 점(`.act-dot`).
- 사람의 결정을 기다리는 것(머지 가능·관측 오류)만 기존 강조 유지.
- 대담한 표현은 머지 진행 한 곳에만 — 행 좌측 레일 + 바닥 진행선 + 단계명/카운터
  `n/7`, **스피너 없음**.
- `prefers-reduced-motion`에서 모션 정지.

팔레트·타이포·5열 IA·스펙 문구는 불변이며, 바뀐 것은 신규 요소의 형태 판단뿐이다.

## Phase 1: 토큰 사용량 파이프라인

스펙 §1 전체(추출 → 누적 → 영속화 → 스냅샷 → 표시).

1. **추출** — `server/worker/runner/claude.js` `normalize()`가
   `type:'assistant'` 이벤트에 `message.usage`(+ `message.id`)를,
   `type:'result'` 이벤트에 `usage`·`total_cost_usd`를 정규화 이벤트의 `usage`
   필드로 실어 올린다. 필드 결손·형태 불일치는 생략(fail-quiet).
   `RunnerEvent` typedef(`runner/session.js`)에 선택 필드 `usage`를 추가한다.
2. **누적** — 새 `server/worker/usage-store.js`: attempt별로 `message.id` → usage
   맵을 유지하고 **같은 id는 교체 저장**한다(스트리밍 중 동일 id가 반복
   전달되므로 이벤트 단위 합산은 중복 집계 — spec 리뷰 blocking 1). `result`
   도착 시 그 이벤트의 usage를 권위값으로 삼아 맵을 대체한다. 조회는
   `{ input_tokens, output_tokens, cache_read_input_tokens,
   cache_creation_input_tokens, total_cost_usd }` 합계 1건. 모든 API는
   `(workspace, attempt_id)`로 스코프한다. `runtime.js`에 `usageStore`로 등록.
3. **영속화 + 스로틀 fanout** — `scheduler.js`가 `handle.events`의 usage 이벤트를
   스토어에 넣고, 종료 경로(성공·실패·일시정지·중단)에서 `updateAttempt`로
   `Attempt.usage`를 기록한 뒤 스토어 항목을 정리한다. `queue-store.js`의
   `Attempt` typedef + `makeAttempt()`에 선택 필드 `usage`를 추가(부재는 null).
   실행 중 usage 변화만으로는 workspace별 **3초 trailing 스로틀**로
   `notifyChanged`를 호출하고, attempt 종료 시 타이머를 정리한다(큐 변경 fanout은
   기존대로 즉시).
4. **전송** — `server/ws/worker-handlers.js` `decorateQueue()`가 attempts를
   투영하며 실행 중 attempt에는 라이브 카운터를, 종료된 attempt에는 영속
   usage를 싣는다.
5. **표시** — `app/views/worker/`: 실행 중 타일 메타줄(`running-grid.js`)과
   PR 대기·완료 행(`lanes.js` `miniRow`)에 `τ 12.3k` 축약(입력+출력, 캐시 제외,
   k/M), `title` 툴팁에 입력/출력/캐시읽기/캐시생성/비용. usage 없는 행은 표시
   생략. `buildModel()`이 bead별 **마지막 attempt**의 usage를 행에 붙인다.
   CSS는 목업 v2의 `.worker-usage`(위계 최하, dim·mono·tabular-nums)를
   `app/styles.css`에 반영.

검증: `npm test -- server/worker/usage-store.test.js server/worker/runner
server/worker/queue-store.test.js server/ws app/views/worker` 통과 +
`npm run tsc`.

## Phase 2: 후보 카드 정렬 옵션

스펙 §2. 클라이언트 전용, 서버 변경 없음.

1. `app/data/sort.js`에 spec 우선 분할 comparator를 추가하지 않고, 정렬 모드
   적용을 `app/views/worker/index.js`의 순수 함수
   `applyCandidateSort(issues, mode, order)`로 만든다. `board`는 현행
   `cmpEffectiveRank(order)` 그대로, `created`는 기존
   `cmpCreatedDescThenPriority` 재사용, `spec`은 `cmpEffectiveRank` 정렬 결과를
   `metadata.spec_id` 유무로 **안정 분할**(있음 먼저).
2. 후보 페인 헤더에 `<select class="worker-sort">` 3옵션(spec 우선 기본 / Board
   순서 / 최신 생성순)을 추가한다. `paneTemplate`에 헤더 우측 슬롯을 하나
   추가하되, 넘기지 않는 페인은 기존과 동일하게 렌더된다.
3. localStorage `bdui.worker.candidate_sort`에 저장/복원. 부재·미지의 값은
   기본값(`spec`)으로 폴백하고, storage 접근 실패는 삼킨다(기존 필터와 동일
   방어).
4. 정렬은 Ready+Blocked 병합 목록 전체에 적용하고, 드래그 재정렬이 쓰는
   `candidate_issues`는 **렌더된 순서**와 일치시킨다(rank 계산이 화면 순서를
   전제하므로).

검증: `npm test -- app/views/worker` 로 3모드 정렬 테스트 통과 + `npm run tsc`.

## Phase 3: 확인중 / 로컬검증 실행 중 상태

스펙 §3. Phase 4가 재사용할 공유 스토어를 여기서 만든다.

1. 새 `server/worker/activity-store.js`: `(workspace, bead_id)` 스코프로
   `{ checking, verifying }` **독립 카운터 2개** + (Phase 4용) `merge_progress`를
   보관한다. 단일 enum은 장시간 로컬검증과 다음 관측 패스가 겹칠 때 `checking`의
   `finally`가 `verifying`을 덮어쓰는 경합이 있어 쓰지 않는다(spec 리뷰
   blocking 2). 두 플래그가 boolean이 아니라 **refcount**인 이유도 같다: 폴러는
   같은 bead의 서로 다른 head SHA에 대한 검증을 동시에 허용하므로
   (`verifying` Set의 키가 `bead_id\0sha`), boolean이면 먼저 끝난 SHA의
   `finally`가 아직 돌고 있는 다른 SHA의 표시를 지운다. `begin*`/`end*`가
   증감하고 0이 될 때만 꺼진다. 스냅샷 시 `verifying > checking > null`로 축약.
   `prune`/`clear` 제공. `runtime.js`에 `activityStore`로 등록.
2. `server/worker/pr-poller.js`: `observeBead` 시작 시 `beginChecking`, 그
   `finally`에서 `endChecking`; `startVerify`에서 `beginVerifying`, 그
   `finally`에서 `endVerifying`. 각 카운터는 자기 작업의 `finally`만 감소시킨다.
   전이 시 `notifyChanged`.
3. `decorateQueue()`가 `pr_activity`로 노출하고, `prObservationsFor`와 같은
   순수 읽기로 둔다. `pr_wait` 이탈 bead는 폴러의 기존 prune 지점에서 함께
   정리한다.
4. `app/views/worker/index.js` `prWaitRow`: 배지가 `관측 대기`이고 `checking`이면
   `확인중`으로, `로컬검증 대기`이고 `verifying`이면 `로컬검증 실행 중`으로
   **대체**한다. 그 외 상태(CI ✓/✗ 등)에서는 폴러가 돌아도 표시 불변(깜빡임
   방지). 목업 v2대로 색 강조·스피너 없이 중립 배지 + 숨쉬는 점(`.act-dot`),
   `prefers-reduced-motion`에서 모션 정지.

검증: `npm test -- server/worker/activity-store.test.js
server/worker/pr-poller.test.js server/ws app/views/worker` 통과 (겹침 테스트
포함) + `npm run tsc`.

## Phase 4: 머지 진행 표시

스펙 §4. Phase 3의 `activity-store`를 그대로 쓴다.

1. `server/worker/pr-actions.js`: bead별 `merge_progress { step, started_at }`를
   기록한다. 단계 순서는 `merging`(재게이트 + 머지, BEHIND의 update-branch
   재관측 포함) → `CLEANUP_STEPS`(`base_sync → post_merge_verify → deploy →
   child_sweep → branch_cleanup → parent_close`) = 총 7단계. 각 전이마다
   `notifyChanged`, 완료·실패 시 `finally`에서 해제. DIRTY(충돌) 경로는 해소
   세션을 띄우기 전에 progress를 해제해 기존 동작으로 되돌린다. 기존 `in_flight`
   중복 가드는 유지(서버 최종 방어선).
2. `decorateQueue()`의 `pr_activity`에 `merge_progress`를 함께 실어 보낸다.
3. `app/views/worker/`: PR 대기 행에 한국어 단계명 + `n/7` 카운터
   (`머지 중 / base 동기화 / 머지 후 검증 / 배포 / 자식 정리 / 브랜치 정리 /
   부모 close`). 진행 중에는 [머지]·[폐기] 모두 비활성. 목업 v2대로 스피너 대신
   행 좌측 레일 + 바닥 진행선(`--progress`)으로 표현한다.
4. 클릭 직후 스냅샷 도착 전 공백은 클라이언트 로컬 pending으로 즉시 커버하고,
   서버 progress가 도착하면 그쪽이 이긴다. 실패 시 progress 해제 + 기존
   토스트/`정리 실패` 배너 동작 그대로.

검증: `npm test -- server/worker/pr-actions.test.js server/ws
app/views/worker` 통과 (성공·실패·DIRTY 라이프사이클) + `npm run tsc`.

## 통합 및 마감

Phase 4 종료 후 한 번 수행한다.

- Pre-Handoff Validation 전체: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(갱신된 `app/main.bundle.js`,
  `app/main.bundle.js.map` 포함 커밋).
- `implementation` 게이트(통합 diff 1회, fast_track 기본 codex 자동 디스패치).
- PR 생성 후 PR Delivery 정지 — 머지는 사람의 클릭이다.

### 머지 이후 (이 세션의 범위 밖, 완료 조건의 일부)

스펙 §검증 계획의 후반부이자 `AGENTS.md`의 Post‑Merge Runtime Validation이다.
이 세션은 PR 제출에서 멈추므로 여기서 수행하지 않지만, **완료 조건에서 빠지지
않는다**: 머지를 수행하는 쪽(`pr-finish` 또는 후속 세션)이 (1)
`~/.config/bdui/config.toml` 런타임 설정 정합 확인, (2) 병합된 체크아웃에서
`npm run build`, (3) `bdui-shared restart`, (4) 실행 프로세스 경로·리스닝
포트·HTTP 응답 확인을 마쳐야 이 작업이 완료다. 그 전 어떤 시점에도 "배포 완료"를
선언하지 않는다.

## Test scope

기존 테스트 스타일(단위, active-verb 이름, setup→execution→assertion)로 작성한다.
아래 시임은 순수 함수 또는 주입 가능한 스토어라 구현 전에 RED로 세울 수 있다.

**RED→GREEN 시임**

- Phase 1 — `normalize()` usage 추출(assistant/result, 필드 결손 시 생략);
  `usage-store` 중복 방지(같은 `message.id` 반복 이벤트가 중복 집계되지 않음,
  `__fixtures__/claude-tools.jsonl` 회귀), `result` 권위 교체;
  `makeAttempt()` usage 라운드트립.
- Phase 2 — `applyCandidateSort` 3모드(spec 우선 분할 안정성, Board 순서 불변,
  최신 생성순); 정렬 모드의 localStorage 저장·복원과 부재/미지의 값 폴백.
- Phase 3 — `activity-store` 축약 규칙(`verifying > checking > null`), 겹침
  독립성(장시간 verifying 중 checking 시작·종료가 verifying 표시를 되돌리지
  않음), **같은 bead의 서로 다른 SHA 검증 중첩**(먼저 끝난 쪽이 표시를 끄지
  않음), **workspace 격리**(같은 bead_id/attempt_id가 다른 workspace로 새지
  않음); `prWaitRow` 배지 대체 규칙(unobserved+checking,
  verify_pending+verifying, 그 외 불변).
- Phase 4 — `merge_progress` 라이프사이클(성공 단계 전이·해제, 실패 해제,
  DIRTY 해제); 진행 중 [머지]·[폐기] 두 버튼이 모두 비활성이고 단계명·`n/7`
  카운터가 표시되는 행 렌더링.

**통합 지점(구현과 함께 작성, RED 선행 불필요)**

- `decorateQueue()`의 라이브/영속 usage 및 `pr_activity` 노출.
- `buildModel()`의 실행 중 타일·PR 대기·완료 행 usage 매핑(마지막 attempt).
- usage-only fanout 3초 스로틀 병합과 종료 시 타이머 정리(fake timers).
- 머지 클릭의 로컬 pending이 스냅샷 도착 전에 즉시 표시되고, 서버
  `merge_progress`가 도착하면 서버 값이 이기며, 실패 응답에서 pending이
  해제되는 전이.

**제외**

- 이슈별 전체 attempt 토큰 누적 합산·비용 중심 표시 — 스펙 비범위.
- 폐기(discard) 진행 표시 — 스펙 비범위(기존 `in_flight` 거부 토스트 유지).
- 트랜스크립트 드로어 내 usage 렌더링, Board 탭 정렬 변경 — 스펙 비범위.
- 실제 `gh`/`claude` 프로세스를 띄우는 E2E — 이 저장소의 테스트는 전부 주입된
  더블 기반이며, 새 코드도 같은 경계를 지킨다.
