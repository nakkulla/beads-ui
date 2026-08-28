---
scope:
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/worker/failure-labels.js
  - app/views/monitor/index.js
  - app/views/monitor/lanes.js
  - app/styles.css
  - app/main.bundle.js
  - app/main.bundle.js.map
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - server/worker/discard-coordinator.js
  - server/worker/queue-store.js
  - app/protocol.js
---

# Worker 실패 타일을 결정 표면으로 — 배너 제거·✕ dismiss 폐기·실패 원인 뱃지와 상세 팝오버 (UI-rj02)

## 1. 배경과 문제

dotfiles-u3xn이 `quickfix_landing_failed:head_mismatch`로 실패했을 때 사용자가 모바일에서
상단 배너의 `✕`를 눌렀다. 그 결과 attempt에 `dismissed_at`만 찍혀 배너와 타일이 사라졌고,
워크트리·브랜치·`resolved` Bead는 그대로 남았다. 서버 `worker-attempt-resume`는
`dismissed_at`가 찍힌 attempt도 재개할 수 있지만 UI에 진입점이 없어, 사람이 손으로 배포·정리·
close를 해야 했다(세션 인계 기록: dotfiles-u3xn notes).

지금 실패 표면은 두 겹이다.

| 표면 | 위치 | 내용 |
|---|---|---|
| 배너 | `app/views/worker/running-grid.js` `bannersTemplate`(240행) — `state.failure`는 `index.js` 3866–3895행이 `latest_failed` **하나**로 조립 | `⛔ <레포> 세션 실패 — <원인 문장>. 자동 진행을 껐습니다, 수동 ▶ 필요.` + `↻ 이어하기`·`폐기`·`✕` + `세부` 접기(raw cause) |
| 실패 타일 | 같은 파일 `runningTile`(498행), `failed_running`(index.js 3654–3769행)이 실행 중 레인에 합침 | 라벨 `실패`/`중단됨`만; **원인 없음**; 조작 `↻ 이어하기`·`폐기`·`✕` |

문제 세 가지.

1. `✕`는 정리(폐기)도 재개(이어하기)도 아닌 제3의 상태를 만든다. `dismissed_at`는 "처리됨"으로
   읽혀(`server/worker/attempt-failure.js` `createUnhandledFailurePredicate`, `app/utils/active-attempts.js`
   149–155행) 타일·배너·점유에서 빠지지만, 실제로는 아무것도 처리되지 않는다.
2. 원인은 배너에만 있고, 배너는 레포당 마지막 실패 하나만 보여준다. 실패가 둘이면 하나는 원인
   없이 `실패` 라벨만 남는다. "자동 진행을 껐습니다" 문장은 attempt의 `halted_auto_advance`와
   무관한 고정 문구다.
3. 타일의 `폐기`는 `discardBead(bead_id, att, 'unmerged', …)`로 확인 모드를 하드코딩한다
   (`index.js` 6070–6086행, Monitor `app/views/monitor/index.js` 3646–3662행). PR이 이미 머지된
   실패에도 unmerged 문구가 뜬다. 또 PR 없는 quick_fix 착지 실패에 `폐기`를 누르면 서버
   `discard-coordinator`가 `cleanup_failed_pr_not_merged`로 거부한다(296–298행) — 할 수 없는 조작이
   노출돼 있다.

## 2. 사용자 결정 (2026-08-27)

1. 실패는 알림이 아니라 **카드 상태**다. 배너를 없애고 실패 타일이 원인을 싣는다.
2. 실패 타일은 사용자가 `↻ 이어하기`·`폐기`를 고르거나 Bead가 다른 attempt로 대체/`done`될
   때까지 남는다. `✕`(dismiss)는 없앤다.
3. 실패 타일은 접이식 "실패 N" 묶음으로 숨기지 않는다. 미처리 실패 타일은 **모두** 기본적으로
   닫힌 변형(§3.2 "닫힌 실패 타일")으로 그린다 — "오래 방치된" 것과 새 실패를 구분하지 않는다.
4. 원인은 칩으로 짧게, 칩을 누르면 팝오버로 상세.

## 3. 표면 설계

### 3.1 배너 삭제

- `running-grid.js` `bannersTemplate`(240–295행)와 `causeDetailLine`·`rawFailureBlock`의 배너
  전용 사용, `index.js`의 `state.failure`/`latest_failed` 조립(3679·3866–3895행),
  `.worker-banner__resume/__discard/__dismiss` 클릭 라우팅(5819–5856행) 삭제.
- `app/views/worker/failure-labels.js`의 공개 함수 `failureCategory`·`failureSentence`·`failureText`를
  타일 뱃지·팝오버가 재사용한다. 내부 표 `FAILURE_CATEGORIES`는 그 파일에 남아 export되지 않고,
  `FAILURE_SENTENCES`는 UI-8w4t §4가 서버와 공유하려고 `app/utils/failure-sentences.js`로 옮겨
  export한다 — 그래도 뱃지·팝오버는 어느 표도 직접 인덱싱하지 않고 공개 함수만 쓴다. 이 스펙이
  추가하는 category 토큰은 `failure-labels.js`의 `FAILURE_CATEGORIES`에 들어간다.

### 3.2 실패 타일 — 카드 문법 슬롯

`runningTile`의 실패 변형(`tile.failed === true`)에 다음을 싣는다. 자리는
`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §5.1로 정한다.

| 요소 | 슬롯 | 근거 |
|---|---|---|
| `⛔ <분류>` 실패 원인 뱃지 | 1 정체성 — 상태 뱃지 | "어떤 상태인가"에 답하고 다음 행동을 바꾼다. `충돌 해소`·base 예외 뱃지와 같은 부류 |
| `자동 진행 꺼짐` 뱃지 | 1 정체성 — 상태 뱃지 | attempt `halted_auto_advance === true`일 때만. 워크스페이스 전체 `auto_advance`가 이 실패로 꺼졌다는 상태 |
| 상세 팝오버 | 뱃지 자체가 트리거(`button`) | 별도 버튼을 조작 영역에 추가하지 않는다 — 원인 뱃지를 누르는 것이 "왜"를 묻는 조작 |
| `↻ 이어하기` · `폐기` | 1 조작 (오른쪽 끝) | 현행 유지 |
| `✕` | — | **삭제** |

뱃지 텍스트는 `failure-labels.js`의 공개 함수 `failureCategory(cause)`로 얻는다(composite cause
`quickfix_landing_failed:head_mismatch`처럼 `:` 뒤가 붙은 코드도 그 함수가 접두로 판정한다).
이 스펙이 추가하는 category 토큰: `quickfix_landing_failed:*` → `착지 실패`, 세션 비정상 종료류
(`runner_exit`·`session_*`) → `세션 실패`. 분류가 없는 cause는 `실패`다. `.rtile__elapsed`의
`실패`/`중단됨` 라벨은 그대로 둔다(조작 영역의 상태 라벨). 타일 폭이 좁아 뱃지가 wrap되는 것은
§2 규칙대로 허용한다(조작은 오른쪽 끝 유지).

**닫힌 실패 타일.** 실패 변형은 카드 문법 §2의 1번 줄(정체성 + 뱃지 + 조작)과 2번 줄(제목)만
그린다. 3번(진행·활동 줄·위임 칩·롤업)·4번(의존·겹침)·5번(좌표·실행 사실)·7번(시각)은 그리지
않는다 — 그 재료는 §3.3 팝오버로 옮긴다. 이것이 사용자 결정 3의 "접힌 한 줄 형태"의 정의이며,
열기/펼치기 상태는 없다(팝오버가 유일한 상세 표면). DOM은 `.rtile.rtile--failed.rtile--compact`,
테스트는 이 변형에 `.rtile__meta`·`.worker-deps`·`.rtile__activity`가 없음을 단언한다.

### 3.3 상세 팝오버

패턴은 겹침 팝오버(`app/views/worker/lanes.js` `overlapPopoverTemplate` 783–814행,
`.mon-overlap__popover`, `app/styles.css` 7210–7230행)를 따른다. 데스크톱은 타일 아래 absolute,
`(max-width: 640px)`에서는 타일 아래 in-flow 전폭 블록(`styles.css` 7306–7314행). 이 저장소는
별도 시트 컴포넌트를 두지 않는다는 결정을 그대로 따른다.

배치 기준: 겹침 팝오버의 absolute는 `.worker-deps { position: relative }`에 기대는데 `.rtile`·
`.rtile__hd`에는 positioned ancestor가 없다. 따라서 팝오버 `.rtile__failure-pop`은 **`.rtile`의
직접 자식**으로 두고 `.rtile { position: relative }`를 명시한다(`top: calc(100% + var(--sp-4))`
기준이 타일). 640px 이하에서는 `position: static; width: 100%`로 타일 아래 흐름에 들어간다.
테스트는 팝오버 노드가 `.rtile`의 직접 자식임을 단언하고, 스타일 검증은 §8의 스크린샷이 맡는다. 열림 상태는 뷰 상태
`open_failure_detail: attempt_id|null` 하나이고, 바깥 클릭·다른 타일 뱃지 클릭·Esc로 닫힌다
(`monitor/index.js` 3959행의 겹침 팝오버 닫기와 같은 라우팅).

팝오버 재료(있는 것만 그린다 — fail-quiet):

| 항목 | 출처 |
|---|---|
| 원인 문장 | `failureSentence(cause)`, 없으면 `failureText(cause)` |
| raw cause | `attempt.cause` (`<code>`) |
| 가드/명령 | `attempt.cause_detail.reason`·`.command` |
| 착지 단계 | `attempt.quickfix_landing.cursor`·`.head_sha`(7자)·`.reason` — quick_fix 착지 실패만 |
| 실패 시각 | `attempt.finished_at` (절대 시각 + 경과) |
| 실행 | `runner`·`model`·`observed_effort ?? effort`·`speed` |
| attempt id | `attempt.attempt_id` (복사 버튼: 기존 SHA 복사 패턴) |
| 비용 | `usage.total_cost_usd` |
| 재개 가능 여부 | `failureResumeState(attempt)` — 불가면 그 사유 문장 |
| 세션 로그 | `▤ 세션` 버튼(기존 세션 드로어 열기). 경로 문자열은 싣지 않는다 — 구현 attempt 레코드에는 세션 로그 경로가 실리지 않고(그 필드는 리뷰 세션 lane의 것) 드로어가 그 소비자다. UI-8w4t가 만든 `logPathTemplate`(`app/views/worker/log-path.js`)는 RepoOperation 완료 실패의 로그 경로용이며 attempt 세션 로그와 다른 값이다 |

### 3.4 조작 규칙

- `↻ 이어하기`: 현행(`resume_eligible`·`resume_reason`) 유지.
- `폐기`: 확인 모드를 하드코딩하지 않고 `discardProjection`이 정한 `confirmation`
  (`merged|unmerged`)을 타일 `data-confirmation`으로 싣고 핸들러가 읽는다. 타일 조립
  (`index.js` 3750–3752·3891–3893행)은 `discardProjection`에 `merged` 힌트로 "이 attempt의 PR이
  머지됨"(`attempt.merge_sha` 존재 또는 관측 PR `state === 'MERGED'`)을 넘긴다. Monitor 핸들러
  (`monitor/index.js` 3646–3662행)도 같은 규칙.
- **`폐기` 숨김**: `attempt.quickfix_lane === true`이고
  `quickfix_landing.cursor ∈ {repo_operations, branch_cleanup, parent_close}`일 때만 `폐기`를
  그리지 않는다. 그 cursor들은 `base_containment`(영수증 SHA ⊂ fetched base)를 **통과한 뒤**에만
  기록되므로 착지의 증거다. `quickfix_landing`이 `null`이거나 `cursor`가 `null`
  (`not_resolved`·`invalid_impl_review`·`head_mismatch` — 착지 판정 전 실패) 또는
  `base_containment`(`push_not_contained`·`containment_unobservable`)이면 착지가 증명되지 않았으므로
  `폐기`를 유지한다. 숨긴 경우 팝오버 하단에 `이미 base에 착지됨 — 이어하기로 배포·정리를 재개`
  안내 한 줄. 서버 discard가 PR 없는 착지를 거부하는 사실(`cleanup_failed_pr_not_merged`)은 이
  판정의 근거이지 조건이 아니다.
- `✕` 제거: `.rtile__dismiss`(running-grid.js 668–675행)와 클릭 라우팅(`index.js` 6087–6096행,
  `monitor/index.js` 3637–3645행), `dismissAttempt()`(`index.js` 2198–2221행) 삭제.

## 4. "처리됨" 판정 — dismiss의 대체

`✕`가 하던 "이 실패는 더 이상 unhandled가 아니다"를 다음이 대신한다.

| 경로 | 오늘 | 변경 후 |
|---|---|---|
| `↻ 이어하기` | child attempt가 부모를 supersede | 그대로 |
| `done` 진입 | `resolved_by_done` | 그대로 |
| `폐기` | attempt는 폐기 진행 중 `discarded`로 바뀌지만 `dismissed_at`은 없음 → `createUnhandledFailurePredicate`가 status가 아니라 `dismissed_at`을 보는 경로에서 unhandled로 남음(기존 결함) | `queue-store.completeDiscardOperation`의 **기존 최종 mutation 안에서** `operation.attempt_id`가 가리키는 attempt에 `dismissed_at`을 idempotent하게 기록한다(이미 숫자면 유지). attempt status는 그 시점에 이미 `discarded`이므로 `failed|orphaned`만 받는 `dismissAttempt()`는 쓰지 않는다 — 별도 write도 아니다 |
| `✕` | `dismissed_at` 스탬프 | 제거 |

- 필드 `dismissed_at`는 이름을 바꾸지 않는다(저장 호환, `settleMootRepairFailures`·scheduler의
  moot 스탬프 그대로). 소비자(`createUnhandledFailurePredicate`, `activeAttemptStates`,
  detail-panel session-history)는 변경 없음. `completeDiscardOperation` 스탬프는 `queue-store.test.js`에서
  단일 persist·`discarded` 상태 유지·idempotent를 단언한다.
- `worker-attempt-dismiss` RPC: 클라이언트 전송 제거, `app/protocol.js`의 타입 삭제,
  `server/ws/connection.js` 라우팅과 `server/ws/worker-handlers.js` `handleWorkerAttemptDismiss`
  (4102–4135행) 삭제. `queue-store.dismissAttempt`(5153–5178행)는 `settleMootRepairFailures`가 쓰므로
  유지한다(UI 호출자는 사라진다).
- 점유: `activeAttemptStates`는 이미 `dismissed_at`/supersede/done으로 판정하므로 그대로다.
  직렬 레인 `occupied_by`는 서버 레인 상태이며 이 스펙의 비목표(§7).
- attempt `kind`: UI-d7fy가 `implementation`/`review_session`/`retired_kind`로 어휘를 바꾸면서
  Worker(`index.js` 3564행 `filter(isImplementationAttempt)`)·`createUnhandledFailurePredicate`
  (`kind === 'implementation'`만 판정)·Monitor `activeAttemptStates`가 모두 구현 attempt만 본다.
  실패 타일에는 이미 리뷰 세션이 섞이지 않으므로 이 스펙은 `kind` 가드를 추가하지 않는다.

## 5. Monitor

`runningTile`을 공유하므로 뱃지·팝오버·조작 규칙은 Monitor 실행 중 타일에도 같이 적용된다.
Monitor의 `.rtile__dismiss`·`.rtile__discard` 핸들러를 Worker와 같은 규칙으로 정정하고, 팝오버
열림 상태는 Monitor 뷰에도 같은 이름으로 둔다.

**투영.** 렌더러만 고쳐서는 Monitor에 아무것도 나타나지 않는다: `app/views/monitor/lanes.js`
`activeByBead()`(425–469행)가 attempt를 타일 모델로 옮기며 `cause`·`cause_detail`·`finished_at`·
`observed_effort`·`halted_auto_advance`·`quickfix_lane`·`quickfix_landing`·`merge_sha`를 버린다.
Worker(`index.js` `failed_running` 조립)와 Monitor(`activeByBead`) 둘 다 실패 타일에 다음을
명시적으로 싣는다: `failure: { cause, cause_detail, finished_at, runner, model, effort,
observed_effort, speed, attempt_id, usage, halted_auto_advance, quickfix_lane, quickfix_landing,
resume_eligible, resume_reason, landed: boolean, confirmation: 'merged'|'unmerged' }`. `landed`는
§3.4의 cursor 판정, `confirmation`은 `discardProjection`에 `merged` 힌트(`attempt.merge_sha` 존재
또는 이 Bead의 관측 PR `state === 'MERGED'`)를 넘긴 결과다. `runningTile`은 `tile.failure`만 읽는다.

## 6. 카드 문법 스펙 정정

`2026-08-25-card-header-grammar-unify-design.md` §5.1 표에 정정 각주를 추가한다:
슬롯 1 정체성 상태 뱃지에 `실패 원인 뱃지(클릭 = 상세 팝오버)`·`자동 진행 꺼짐` 추가, 슬롯 1
조작 목록에서 `✕` 삭제, §3.1의 "실패 변형은 `↻ 이어하기` · `✕`" 문구를 "`↻ 이어하기` · `폐기`
(착지된 quick_fix는 `↻`만)"로.

그 표에는 이미 UI-8w4t의 정정 문단이 있다(슬롯 1을 `PR 링크` 하나로, 슬롯 5에 실패 로그 경로
추가). 이 스펙의 정정은 표 셀을 직접 고치고 그 문단 **뒤에** 별도 `**정정(UI-rj02).**` 문단으로
붙인다 — 앞 정정을 지우거나 합치지 않는다.

## 7. 비목표

- 직렬 레인 `occupied_by`(서버 상태)의 해제 규칙.
- `settleMootRepairFailures`·scheduler의 moot 실패 스탬프 로직.
- PR 없는 착지된 quick_fix에 대한 revert 경로 신설(서버 discard 확장). 이 스펙은 그 버튼을 숨길 뿐이다.
- 세션 로그 경로의 클라이언트 투영(`▤ 세션` 드로어가 소비자).
- 실패 타일의 접기/펼치기 상태 저장.

## 8. 테스트

- `running-grid.test.js`: 실패 타일이 `⛔ <분류>` 뱃지를 그리고 `✕`를 그리지 않는다; `halted_auto_advance`에만 `자동 진행 꺼짐`; `landed`(cursor `repo_operations|branch_cleanup|parent_close`)에만 `폐기` 없음, cursor `null`·`base_containment`에는 `폐기` 유지; `data-confirmation`이 `tile.failure.confirmation`을 싣는다; 닫힌 변형에 `.rtile__meta`·`.worker-deps`·`.rtile__activity` 없음; 팝오버가 `.rtile` 직접 자식; 배너 템플릿 없음.
- `failure-labels.test.js`: `failureCategory('quickfix_landing_failed:head_mismatch') === '착지 실패'`, 알 수 없는 코드 → `실패`.
- `monitor/lanes.test.js`: `activeByBead()`가 실패 attempt의 `failure` 투영(위 필드 전부)을 싣는다.
- `worker/index.test.js`: `state.failure` 미조립; 뱃지 클릭으로 팝오버 열림/바깥 클릭 닫힘; 팝오버 재료 fail-quiet(cause_detail·quickfix_landing 없는 경우); `폐기` 클릭이 `confirmation`을 읽어 `discardBead`에 전달; dismiss 전송 없음.
- `monitor/index.test.js`·`monitor/lanes.test.js`: 같은 규칙.
- `server/worker/discard-coordinator.test.js`: 오퍼레이션 `done`에서 source attempt `dismissed_at` 스탬프(같은 write), 이미 찍혀 있으면 no-op.
- `server/ws.worker-queue.test.js`: `worker-attempt-dismiss`가 알 수 없는 메시지로 거부된다.
- `attempt-failure.test.js`·`active-attempts.test.js`: discard-done 스탬프 뒤 unhandled/점유에서 빠진다.
- 스타일: `.rtile__failure-badge`·`.rtile__failure-pop` 데스크톱 absolute / 640px in-flow 규칙. 배포 후 Worker 탭 스크린샷(데스크톱·모바일 폭)으로 뱃지·팝오버·`✕` 부재 확인(session-preferred=visual_verification).

## 구현 unit 후보

- `tile`: §3–§5 전부 — 배너 삭제·뱃지·팝오버·스타일·`폐기` 확인/숨김·✕/RPC 제거·discard-done
  스탬프·Worker/Monitor 투영 (`running-grid.js`, `worker/index.js`, `worker/lanes.js`,
  `failure-labels.js`, `monitor/index.js`, `monitor/lanes.js`, `styles.css`, `discard-coordinator.js`,
  `queue-store.js`, `worker-handlers.js`, `connection.js`, `protocol.js`). `worker/index.js`의
  소유자는 이 unit 하나다.
- `docs`: §6 카드 문법 스펙 정정

프론트 소스가 바뀌므로 `npm run build` 산출물 `app/main.bundle.js`·`app/main.bundle.js.map`을
같은 PR에 포함한다(배포 스크립트가 build 뒤 tracked-clean을 요구한다).

## 경계·후속

형제 유닛 없음(단일 레포·단일 Bead). 실행 중 발견 항목은 Finish admission으로만 들어온다.

- 관찰: PR 없는 착지된 quick_fix의 discard(revert) 경로는 서버에 없다 — 필요가 생기면 별도 설계.
