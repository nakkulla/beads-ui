---
scope:
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/worker/failure-labels.js
  - app/views/monitor/index.js
  - app/styles.css
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
| 배너 | `app/views/worker/running-grid.js` `bannersTemplate`(240행) — `state.failure`는 `index.js` 3976–3998행이 `latest_failed` **하나**로 조립 | `⛔ <레포> 세션 실패 — <원인 문장>. 자동 진행을 껐습니다, 수동 ▶ 필요.` + `↻ 이어하기`·`폐기`·`✕` + `세부` 접기(raw cause) |
| 실패 타일 | 같은 파일 `runningTile`(498행), `failed_running`(index.js 3758–3865행)이 실행 중 레인에 합침 | 라벨 `실패`/`중단됨`만; **원인 없음**; 조작 `↻ 이어하기`·`폐기`·`✕` |

문제 세 가지.

1. `✕`는 정리(폐기)도 재개(이어하기)도 아닌 제3의 상태를 만든다. `dismissed_at`는 "처리됨"으로
   읽혀(`server/worker/attempt-failure.js` `createUnhandledFailurePredicate`, `app/utils/active-attempts.js`
   150–155행) 타일·배너·점유에서 빠지지만, 실제로는 아무것도 처리되지 않는다.
2. 원인은 배너에만 있고, 배너는 레포당 마지막 실패 하나만 보여준다. 실패가 둘이면 하나는 원인
   없이 `실패` 라벨만 남는다. "자동 진행을 껐습니다" 문장은 attempt의 `halted_auto_advance`와
   무관한 고정 문구다.
3. 타일의 `폐기`는 `discardBead(bead_id, att, 'unmerged', …)`로 확인 모드를 하드코딩한다
   (`index.js` 6177–6193행, Monitor `app/views/monitor/index.js` 3644–3646행). PR이 이미 머지된
   실패에도 unmerged 문구가 뜬다. 또 PR 없는 quick_fix 착지 실패에 `폐기`를 누르면 서버
   `discard-coordinator`가 `cleanup_failed_pr_not_merged`로 거부한다(288–290행) — 할 수 없는 조작이
   노출돼 있다.

## 2. 사용자 결정 (2026-08-27)

1. 실패는 알림이 아니라 **카드 상태**다. 배너를 없애고 실패 타일이 원인을 싣는다.
2. 실패 타일은 사용자가 `↻ 이어하기`·`폐기`를 고르거나 Bead가 다른 attempt로 대체/`done`될
   때까지 남는다. `✕`(dismiss)는 없앤다.
3. 방치된 실패 타일은 접이식 "실패 N" 묶음으로 숨기지 않고 접힌 한 줄 형태로 레인에 둔다.
4. 원인은 칩으로 짧게, 칩을 누르면 팝오버로 상세.

## 3. 표면 설계

### 3.1 배너 삭제

- `running-grid.js` `bannersTemplate`(240–291행)와 `causeDetailLine`·`rawFailureBlock`의 배너
  전용 사용, `index.js`의 `state.failure`/`latest_failed` 조립(3870·3976–3998행),
  `.worker-banner__resume/__discard/__dismiss` 클릭 라우팅(5936–5959행) 삭제.
- `failureText`·`FAILURE_CATEGORIES`·`FAILURE_SENTENCES`(`app/views/worker/failure-labels.js`)는
  타일 칩·팝오버가 그대로 재사용한다.

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

뱃지 텍스트는 `FAILURE_CATEGORIES[cause]`(예 `착지 실패`, `세션 실패`, `검증 실패`)이고, 분류가
없는 cause는 `실패`다. `.rtile__elapsed`의 `실패`/`중단됨` 라벨은 그대로 둔다(조작 영역의 상태
라벨). 타일 폭이 좁아 뱃지가 wrap되는 것은 §2 규칙대로 허용한다(조작은 오른쪽 끝 유지).

### 3.3 상세 팝오버

패턴은 겹침 팝오버(`app/views/worker/lanes.js` `overlapPopoverTemplate` 706–782행,
`.mon-overlap__popover`, `app/styles.css` 7181–7200행)를 따른다. 데스크톱은 타일 아래 absolute,
`(max-width: 640px)`에서는 타일 아래 in-flow 전폭 블록(`styles.css` 7278–7287행). 이 저장소는
별도 시트 컴포넌트를 두지 않는다는 결정을 그대로 따른다. 열림 상태는 뷰 상태
`open_failure_detail: attempt_id|null` 하나이고, 바깥 클릭·다른 타일 뱃지 클릭·Esc로 닫힌다
(`monitor/index.js` 3959행의 겹침 팝오버 닫기와 같은 라우팅).

팝오버 재료(있는 것만 그린다 — fail-quiet):

| 항목 | 출처 |
|---|---|
| 원인 문장 | `FAILURE_SENTENCES[cause]` 또는 `failureText(cause)` |
| raw cause | `attempt.cause` (`<code>`) |
| 가드/명령 | `attempt.cause_detail.reason`·`.command` |
| 착지 단계 | `attempt.quickfix_landing.cursor`·`.head_sha`(7자)·`.reason` — quick_fix 착지 실패만 |
| 실패 시각 | `attempt.finished_at` (절대 시각 + 경과) |
| 실행 | `runner`·`model`·`observed_effort ?? effort`·`speed` |
| attempt id | `attempt.attempt_id` (복사 버튼: 기존 SHA 복사 패턴) |
| 비용 | `usage.total_cost_usd` |
| 재개 가능 여부 | `failureResumeState(attempt)` — 불가면 그 사유 문장 |
| 세션 로그 | `▤ 세션` 버튼(기존 세션 드로어 열기). 경로 문자열은 싣지 않는다 — 클라이언트에 `log_path`가 없고 드로어가 그 소비자다 |

### 3.4 조작 규칙

- `↻ 이어하기`: 현행(`resume_eligible`·`resume_reason`) 유지.
- `폐기`: 확인 모드를 하드코딩하지 않고 `discardProjection`이 정한 `confirmation`
  (`merged|unmerged`)을 타일 `data-confirmation`으로 싣고 핸들러가 읽는다. 타일 조립
  (`index.js` 3812–3814·3854–3856행)은 `discardProjection`에 `merged` 힌트로 "이 attempt의 PR이
  머지됨"(`attempt.merge_sha` 존재 또는 관측 PR `state === 'MERGED'`)을 넘긴다. Monitor 핸들러
  (`monitor/index.js` 3644–3646행)도 같은 규칙.
- **`폐기` 숨김**: `attempt.quickfix_lane === true`이고 `quickfix_landing !== null`(착지 단계
  진입 후 실패)이면 `폐기`를 그리지 않는다. 그 작업은 이미 base에 착지돼 있고 서버 discard는
  PR 없는 착지를 거부한다(`cleanup_failed_pr_not_merged`). 팝오버 하단에
  `이미 base에 착지됨 — 이어하기로 배포·정리를 재개` 안내 한 줄.
- `✕` 제거: `.rtile__dismiss`(running-grid.js 653–676행)와 클릭 라우팅(`index.js` 6193–6201행,
  `monitor/index.js` 3636–3641행), `dismissAttempt()`(`index.js` 2313–2333행) 삭제.

## 4. "처리됨" 판정 — dismiss의 대체

`✕`가 하던 "이 실패는 더 이상 unhandled가 아니다"를 다음이 대신한다.

| 경로 | 오늘 | 변경 후 |
|---|---|---|
| `↻ 이어하기` | child attempt가 부모를 supersede | 그대로 |
| `done` 진입 | `resolved_by_done` | 그대로 |
| `폐기` | attempt는 `failed` 그대로, `dismissed_at` 없음 → discard 후에도 unhandled로 남음(기존 결함) | discard 오퍼레이션이 `done`에 도달하면 `discard-coordinator`가 같은 CAS write에서 source attempt에 `dismissed_at`(의미: handled)를 찍는다 |
| `✕` | `dismissed_at` 스탬프 | 제거 |

- 필드 `dismissed_at`는 이름을 바꾸지 않는다(저장 호환, `settleMootRepairFailures`·scheduler의
  moot 스탬프 그대로). 소비자(`createUnhandledFailurePredicate`, `activeAttemptStates`,
  detail-panel session-history)는 변경 없음.
- `worker-attempt-dismiss` RPC: 클라이언트 전송 제거, `app/protocol.js`의 타입 삭제,
  `server/ws/connection.js` 라우팅과 `server/ws/worker-handlers.js` `handleWorkerAttemptDismiss`
  (4163–4206행) 삭제. `queue-store.dismissAttempt`(5197–5220행)는 discard-coordinator의 새
  호출자가 쓰므로 유지한다.
- 점유: `activeAttemptStates`는 이미 `dismissed_at`/supersede/done으로 판정하므로 그대로다.
  직렬 레인 `occupied_by`는 서버 레인 상태이며 이 스펙의 비목표(§7).

## 5. Monitor

`runningTile`을 공유하므로 뱃지·팝오버·조작 규칙은 Monitor 실행 중 타일에도 같이 적용된다.
Monitor의 `.rtile__dismiss`·`.rtile__discard` 핸들러를 Worker와 같은 규칙으로 정정하고, 팝오버
열림 상태는 Monitor 뷰에도 같은 이름으로 둔다.

## 6. 카드 문법 스펙 정정

`2026-08-25-card-header-grammar-unify-design.md` §5.1 표에 정정 각주를 추가한다:
슬롯 1 정체성 상태 뱃지에 `실패 원인 뱃지(클릭 = 상세 팝오버)`·`자동 진행 꺼짐` 추가, 슬롯 1
조작 목록에서 `✕` 삭제, §3.1의 "실패 변형은 `↻ 이어하기` · `✕`" 문구를 "`↻ 이어하기` · `폐기`
(착지된 quick_fix는 `↻`만)"로.

## 7. 비목표

- 직렬 레인 `occupied_by`(서버 상태)의 해제 규칙.
- `settleMootRepairFailures`·scheduler의 moot 실패 스탬프 로직.
- PR 없는 착지된 quick_fix에 대한 revert 경로 신설(서버 discard 확장). 이 스펙은 그 버튼을 숨길 뿐이다.
- 세션 로그 경로의 클라이언트 투영(`▤ 세션` 드로어가 소비자).
- 실패 타일의 접기/펼치기 상태 저장.

## 8. 테스트

- `running-grid.test.js`: 실패 타일이 `⛔ <분류>` 뱃지를 그리고 `✕`를 그리지 않는다; `halted_auto_advance`에만 `자동 진행 꺼짐`; 착지 실패(`quickfix_lane && quickfix_landing`)에 `폐기` 없음; `data-confirmation`이 projection 값을 싣는다; 배너 템플릿 없음.
- `worker/index.test.js`: `state.failure` 미조립; 뱃지 클릭으로 팝오버 열림/바깥 클릭 닫힘; 팝오버 재료 fail-quiet(cause_detail·quickfix_landing 없는 경우); `폐기` 클릭이 `confirmation`을 읽어 `discardBead`에 전달; dismiss 전송 없음.
- `monitor/index.test.js`·`monitor/lanes.test.js`: 같은 규칙.
- `server/worker/discard-coordinator.test.js`: 오퍼레이션 `done`에서 source attempt `dismissed_at` 스탬프(같은 write), 이미 찍혀 있으면 no-op.
- `server/ws.worker-queue.test.js`: `worker-attempt-dismiss`가 알 수 없는 메시지로 거부된다.
- `attempt-failure.test.js`·`active-attempts.test.js`: discard-done 스탬프 뒤 unhandled/점유에서 빠진다.
- 스타일: `.rtile__failure-badge`·`.rtile__failure-pop` 데스크톱 absolute / 640px in-flow 규칙. 배포 후 Worker 탭 스크린샷(데스크톱·모바일 폭)으로 뱃지·팝오버·`✕` 부재 확인(session-preferred=visual_verification).

## 구현 unit 후보

- `surface`: §3.1–§3.3 배너 삭제·뱃지·팝오버·스타일 (`running-grid.js`, `index.js`, `styles.css`, `failure-labels.js`)
- `actions`: §3.4·§4·§5 폐기 확인 모드·숨김·✕/RPC 제거·discard-done 스탬프·Monitor 정합 (`index.js`, `monitor/index.js`, `discard-coordinator.js`, `worker-handlers.js`, `connection.js`, `protocol.js`)
- `docs`: §6 카드 문법 스펙 정정

## 경계·후속

형제 유닛 없음(단일 레포·단일 Bead). 실행 중 발견 항목은 Finish admission으로만 들어온다.

- 관찰: PR 없는 착지된 quick_fix의 discard(revert) 경로는 서버에 없다 — 필요가 생기면 별도 설계.
