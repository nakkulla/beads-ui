---
scope:
  - server/worker/scheduler.js
  - server/worker/failure-class.js
  - server/worker/quickfix-landing.js
  - server/worker/queue-store.js
  - server/worker/foreign-blocker-status.js
  - server/worker/attach.js
  - server/worker/discard-coordinator.js
  - app/utils/quickfix-resume-kind.js
  - app/views/worker/index.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/failure-labels.js
  - app/views/monitor/index.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# Worker `waiting` 계층 설계 — 세션의 선행 미충족 착수 거부를 착지 실패와 구분하고, 선행이 닫히면 보통 후보로 자동 복귀시킨다

- Bead: `UI-8jau` (route `spec_backed`)
- 선행: dotfiles `dotfiles-mq6f` (blocks) — **`closed`**(2026-08-28, 계약 착지
  `095fe30731b25c8cca668af879054f9ace596574`). 계약 정본은
  `docs/superpowers/specs/2026-08-28-prerequisite-gate-session-refusal-design.md` @
  `28cbcd1ea3a321cedbf8aaf87f30097028ae5894` (`spec_review=codex@28cbcd1e`)이고, 착지한
  `workflow-state.yaml prerequisite_gate` 블록이 그 §5.2·§5.4를 그대로 담고 있다. 이 스펙은
  §5.4 "소비자" 절의 구현이며, 판정식·신호·결과줄은 그쪽이 소유하고 여기서는 인용만 한다.
- 출처: 2026-08-28 `dotfiles-6qc7`(attempt `dotfiles-6qc7-1787919923296-1`, $2.99)·`dotfiles-fifo`(2회)

## 1. 문제

세션이 착수 전에 선행 미충족을 확인하고 push 없이 정상 종료하면, Worker는 quick_fix 착지
정산으로 들어가 push 기록 부재만 보고 `quickfix_landing_failed:delivery_unproven:push_log_absent`
로 실패 타일(`⛔ 착지 실패`)을 만든다(`server/worker/quickfix-landing.js:321`,
`scheduler.js onSessionDone` → `settleQuickfixLanding`). `base-drift.js:175` 주석이 이미 이
코드가 "진짜 사유를 묻는다"고 적고 있다. 실패 타일은 `settledAttemptFence`로 재디스패치를
막고 사람의 처분(`이어하기`/`폐기`)을 기다리는데, 이 결말에는 처분할 것이 없다 — 선행이
닫히면 그냥 다시 돌면 된다.

계약(`dotfiles-mq6f` 스펙)은 이 결말의 신호를 **이 Bead에서 나가는 미해결 `blocks` 엣지**
하나로 정했다. status·metadata·`awaiting_user`는 쓰지 않는다. Worker 판정 소유자는 beads-ui다.

## 2. 목표와 비목표

목표

- `onSessionDone`이 quick_fix settle **앞에서** 계약 §5.4의 네 조건을 판정해 성립하면
  attempt를 새 계층 **`waiting`**(cause `prerequisite_unmet`)으로 마감한다. 실패 아님·큐
  계속·자동 재디스패치 없음.
- 선행이 `closed`되어 Bead가 `bd ready`에 돌아오면 **보통 후보로 자동 dispatch**된다
  (새 attempt). 클릭도 전이 관측도 필요 없다.
- Worker/Monitor 화면에서 `waiting` attempt를 parked·retry_wait와 같은 **held 타일**로
  그린다: 상태 라벨 `선행 대기`, 본문 한 줄, 슬롯 4a `⛓ <blocker>` 칩, foot `폐기`만.
- 판정 조건 하나라도 관측 실패·모호이면 기존 정산으로 fail-quiet(옛 attempt·신호 없는
  결말은 그대로 `delivery_unproven:*`).

비목표

- 계약 신호·결과줄·세션 절차의 정의(dotfiles 소유). 결과줄 `대기 ·`는 판정 입력이 아니다.
- proxy gate Bead의 자동 close.
- spec_backed/full_plan 세션의 같은 결말 — 계약 §4.1은 같은 절차를 적용하지만, 그 경로는
  `settleQuickfixLanding`이 아니라 PR 검증 경로로 가서 `endedWithoutDelivery` →
  `session_ended_unresolved`가 된다. 이 스펙은 quick_fix 레인만 다루고, 다른 레인은 §8 관찰.

## 3. 결정 요약

| # | 결정 | 근거 |
| --- | --- | --- |
| D1 | 판정은 `onSessionDone`의 `quickfixLaneOf` 분기 **직전**, `recordReceiptCheck` 뒤에 둔다 | settle에 들어가면 `push_log_absent`가 먼저 잡힌다. 영수증 관측은 성공 경로 전부에 앞서야 한다는 기존 규칙(UI-bu6d)을 지킨다 |
| D2 | `waiting`은 `classifyFailure`의 다섯 번째 tier. `settleFailureTier`가 `parked`처럼 별도 분기로 attempt를 `status='waiting'`으로 쓴다 | 실패 계층 분류의 단일 진입점을 유지한다(ADR 0016·0017의 같은 자리). tier 판정 입력은 호출자가 이미 증명한 `blockers`이지 텍스트가 아니다 |
| D3 | `settledAttemptFence`는 `waiting`을 막지 **않는다** | 재디스패치 억제는 `bd ready` 부재가 이미 한다. fence에 넣으면 선행이 닫혀도 사람이 눌러야 한다 — 계약 `candidate_return: bd_ready_after_blocker_closed`와 어긋난다 |
| D4 | `waiting`은 `TERMINAL_ATTEMPT_STATUSES`에 들어가고 직렬 레인을 해제한다 | attempt는 끝났다. 레인을 잡고 있으면 선행을 닫는 형제가 같은 레인에서 못 돈다 |
| D5 | foreign blocker 상태는 `foreign-blocker-status.js`의 prefix→rig 해소를 재사용하되, 판정은 **새 awaited export `queryForeignBlockerStatus`** 로 읽는다 | 이미 있는 유일한 cross-rig 해소기. 기존 `foreignBlockerStatusFor`는 캐시 반환+백그라운드 조회라 완료된 결과와 실패를 판정 시점에 구분하지 못한다(§4.2) |
| D6 | `resumeKindOf`·`quickfix-resume-kind.js`는 변경 없음. `waiting` attempt는 `quickfix_landing=null`이라 그 함수가 `session`을 답하지만, `lane-model`은 `run_state='waiting'`에서 그 답을 읽지 않고 `can_resume=false`·`failure` 없음을 직접 쓴다 | 정산이 시작되지 않은 결말이다. 렌더러(`runningTile`)가 held 타일에도 이 함수를 호출하지만 결과를 쓰지 않으므로 "호출 부재"를 요구하지 않는다 — 요구는 **재개 버튼과 실패 팝오버가 그려지지 않는 것**이다 |

## 4. 서버

### 4.1 판정 위치 (`scheduler.js onSessionDone`)

```
await recordReceiptCheck(...)
if (quickfixLaneOf(workspace, attempt_id)) {
  const wait = await judgePrerequisiteWait(workspace, attempt_id, bead_id, prior, verdict);
  if (wait) { return; }          // attempt는 waiting으로 마감됨
  await settleQuickfixLanding(...); return;
}
```

`judgePrerequisiteWait`는 성립 시 `failAttempt(..., 'prerequisite_unmet', { blockers }, { verdict, bead_status, tier_hint: 'waiting' })`를 부르고, 이어서 **`notifyChanged(workspace)`와 `await tick(workspace)`** 을 호출한 뒤 `true`를 돌려준다 — `failAttempt` 자체는 둘 다 부르지 않으므로(`settleQuickfixLanding`의 실패 갈래가 매번 직접 부르는 것과 같은 이유) 빠지면 화면 갱신과 빈 슬롯 재충전이 다음 외부 이벤트까지 멈춘다. 성립하지 않으면 아무것도 쓰지 않고 `false`다 — 기존 settle이 그대로 이어진다.

### 4.2 판정식 (계약 §5.4 인용 — 전부 성립해야 한다)

| # | 조건 | 읽는 곳 | 실패 시 |
| --- | --- | --- | --- |
| 1 | `verdict.success === true` ∧ push 기록 부재 ∧ bead status ∉ {resolved, closed} | `deps.readPushLog({attempt_id})` (quickfix-landing과 같은 dep), `deps.bd.readStatus` | 불성립 → settle |
| 2 | claim 해제 뒤 `bd ready --json`이 성공·정상 파싱되고 이 Bead 부재 | `releaseBeadClaim` 후 `deps.bd.snapshotBead(bead_id).ready === false` — 이 스냅샷은 `bd show`+`bd ready` 둘 다 throw-on-failure다 | throw/`ready=true` → 판정 불가 → settle |
| 3 | outgoing `blocks` 엣지 ≥1, 그중 미해결 ≥1 | `deps.bd.readIssue(bead_id).dependencies[]` 중 `dependency_type==='blocks'`. 이 `readIssue`는 `bd-metadata.js`에 이미 있고 `attach.js`가 pr-poller에 넘기고 있지만 **scheduler의 `bd` dep typedef에는 없다** — `comment`와 같은 optional 속성으로 더하고 `attach.js`에서 주입한다. 없으면 판정 불가(→ settle)다. 같은 rig(`external!==true`): `readStatus(target) !== 'closed'`. foreign(`external===true`): `foreign-blocker-status.js`에 **새 export `queryForeignBlockerStatus(bead_id, requester_root)`** — 캐시를 거치지 않는 awaited 조회로, `prefixOfBeadId` → `visibleWorkspaceRoots` 중 `cachedIssuePrefixFor`(없으면 즉시 `bd config` 조회)가 맞는 root → `bd -C <root> show <id> --json`을 끝까지 기다려 `{ok:true, status}` 또는 `{ok:false, reason: 'no_rig'\|'bd_failed'\|'unparsable'}`를 돌려준다. 기존 `foreignBlockerStatusFor`는 캐시 값을 돌려주고 백그라운드 조회만 시작하므로 판정에 쓰지 않는다. `ok:false`는 "미해결 추정"이 아니라 판정 불가 | 판정 불가 → settle |
| 4 | 비의존 제외 원인 부재 | `readIssue`의 `defer`가 비어 있음(필드 없으면 비어 있는 것으로 본다) ∧ 2의 readback status가 `open` | 불성립 → settle |

순서는 1→2→3→4다. 2에서 claim 해제를 먼저 하는 이유는 `bd ready`가 `in_progress`를 제외하므로 해제 전 부재는 증거가 못 되기 때문이다. 해제 뒤 settle로 떨어져도 문제 없다 — `failAttempt`의 `releaseBeadClaim`은 `in_progress`가 아니면 no-op이다.

### 4.3 `failure-class.js`

- `FailureTier`에 `'waiting'` 추가. 입력 `FailureInput`에 `tier_hint?: 'waiting'`과 `cause_detail.blockers`를 받는다.
- `classifyFailure`: `cause === 'prerequisite_unmet'` ∧ `tier_hint === 'waiting'` ∧ `Array.isArray(cause_detail.blockers) && blockers.length > 0` → `classification('waiting', 'prerequisite_unmet', summary, null)`. `tier_hint` 없이 온 `prerequisite_unmet`은 fail-quiet 기본(`individual`)이다 — 호출자가 증명 없이 이 cause를 쓸 수 없게 한다.
- `causeKey`: `prerequisite_unmet`은 queue-hold 승격 비교에서 제외(실패가 아니다).

### 4.4 `scheduler.js settleFailureTier`

`tier === 'waiting'` 분기(`parked` 분기 옆):

```
status: 'waiting', cause: 'prerequisite_unmet',
cause_detail: { summary, blockers: [{ id, rig, status }], bead_status },
finished_at: at
```

이어서 **`closeRetryLineage(workspace, bead_id)`** 를 부른다 — 환경 재시도 사다리의 attempt가 선행 대기로 끝나면 `queue.hold`가 남아 자동 후보 복귀를 막기 때문이다(성공 착지가 같은 함수를 부르는 것과 같은 이유). lifecycle 알림은 **추가하지 않는다**(production notifier에 소비자가 없고 승인된 의도에도 없다). `fireDirectionInquiry`도, `postAttemptFailureComment`도 부르지 않는다 — 둘 다 `parked` 분기 **안에** 있는 호출이지 공통 꼬리가 아니고, 사람이 처분할 것이 없는 결말에 bd 댓글을 남길 이유도 없다. 이후 공통 꼬리(workflow_mode revert·exec stamp revert·`disarmEntry`·`releaseBeadClaim`)는 그대로 탄다.

타임라인 이벤트는 **`parked` 분기가 이미 쓰는 형식을 그대로 따른다**(UI-8wpb 착지
`43e2f257` §5): 선행 대기는 세션이 어떻게 **끝났는지**이지 실패가 아니므로 새 kind를 만들지
않고 `appendTimeline({bead_id, attempt_id, kind: 'session_ended', seq: 'waiting', summary:
'대기 · blocks:<id>[, <id>...]', at})` 한 줄이다. 그 summary 문자열은 §4.2가 이미 증명한
`blockers[]`로 **서버가 조립**하는 것이지 세션 결과줄을 읽어 온 것이 아니다 — §2 비목표의
"결과줄은 판정 입력이 아니다"는 그대로다(`parked`가 `파킹 · <awaiting_user>`를 같은 방식으로
쓰는 것과 같다). `appendFailedEvent`(kind `attempt_failed`)는
`individual`·`env` 종단 분기의 것이며 `waiting`에서는 부르지 않는다. `bead-timeline.js`의
`TIMELINE_KINDS`는 **손대지 않는다** — 그 집합은 닫혀 있고, `session_ended`가 이 결말이
답하는 질문에 이미 맞다.

### 4.5 재디스패치와 레인

- `settledAttemptFence`: `latest.status === 'waiting'` → `null`(fence 없음). 그 함수의 주석에 "waiting은 bd ready 부재가 fence다"를 적는다.
- `queue-store.js`: `TERMINAL_ATTEMPT_STATUSES`와 직렬 레인 해제 집합 둘 다에 `'waiting'` 추가(D4). `Attempt.status` 문서 갱신.
- `scheduler.js`에도 **별도의 터미널 status 집합**(`'parked'`·`'retry_wait'`·`'superseded'`를 나열한 그 상수, 약 241행)이 있다. 여기에도 `'waiting'`을 넣는다 — 빠지면 스케줄러가 그 Bead를 아직 활성으로 보고 선행이 닫혀도 재디스패치하지 않는다. 두 집합이 갈리지 않도록 테스트가 둘 다 고정한다(§7 (e)).
- `queue-store.js`의 `PROCESSED_TERMINAL_STATUSES`(= `transferableAttempts`의 이관 대상)에는
  `waiting`을 **넣지 않는다**. UI-8wpb §7이 `queue.json`에 남기는 집합(`running`·`retry_wait`·
  `parked`·미dismiss `failed`)과 같은 이유다 — held 타일과 재디스패치 판정이 이 레코드를 계속
  읽는다. 그 집합은 이관 대상 whitelist이므로 코드 변경은 없고, 테스트가 "`waiting`은 이관되지
  않는다"를 고정한다(§7 (h)).
- `latestImplementationAttempt`가 `waiting`을 "마지막 attempt"로 세는 것은 그대로 — held 타일이 그것을 읽는다. 새 attempt가 뜨면 `lane-model`의 `map.has(bead_id)` 규칙으로 타일이 밀린다(parked와 같음).
- `attach.js`의 `onIssuesChanged` 구독은 손대지 않는다. 복귀 트리거는 별도 관측이 아니라 다음 tick의 보통 후보 선택이다.

### 4.6 `quickfix-landing.js`

변경 없음. `QuickfixLandingReason`에 새 토큰을 더하지 않는다 — `waiting`은 착지 정산의 결과가 아니라 정산 **앞**의 결말이다. 헤더 주석에 그 사실과 이 스펙 참조를 한 단락 더한다.

## 5. 프런트

### 5.1 `lane-model.js`

- `run_state` union에 `'waiting'`. `HELD_STATUSES`에 `'waiting'` 추가 → `heldAttemptStates`가 접는다.
- held 루프에서 `run_state === 'waiting'`이면 `failure` 투영 대신 **`wait`** 투영:
  `{ summary, blockers: [{id, rig, status}], since: finished_at }`. `can_pause=false`,
  `can_resume=false`. `failure`를 쓰지 않는 이유: 실패 팝오버(실패 코드·착지 단계·재개 행)는
  이 결말에 답할 질문이 없다.
- 슬롯 4a 의존 칩: `blockers[]`를 기존 `bead_blocked_by` 투영과 같은 모양(`⛓ <ID>`, 타 rig는
  색만 다름, 클릭=그 이슈 상세)으로 싣는다. 이미 `bead_blocked_by`가 같은 ID를 싣고 있으면
  중복하지 않는다(집합 합침).

### 5.2 `running-grid.js`

- `RunningTile`에 `waiting?: boolean`, `wait?: WaitTile|null`. `status_label` `선행 대기`.
- `heldBodyTemplate`을 `heldBodyTemplate(kind, held, discard_button)`로 일반화: `parked`는
  지금 그대로(요약 + `재시도` + 폐기), **`waiting`은 요약 한 줄 + foot `폐기`만**. `재시도`
  버튼을 두지 않는 이유는 §3 D3 — 선행이 닫히면 저절로 돈다. 요약은 세션 결과줄
  (`대기 · blocks:...`)이 아니라 `cause_detail.summary`(세션 마지막 문장)이며 비어 있으면
  줄을 그리지 않는다(fail-quiet).
- 슬롯 배정(카드 문법 §5.1): `선행 대기` 뱃지 = 1번 정체성(상태 뱃지), `⛓` 칩 = 4a, `폐기` =
  6번 foot. 새 슬롯은 없다. 뱃지는 `running-grid.js`의 `held_badge`가 서는 그 배타 자리이며
  (`⏸ 세션 대기`·`↻ 재시도 대기`와 상호배제), 실패 원인 뱃지와도 배타다.
  카드 문법 스펙 §5.1 표 1번 정체성 행의 "지금 실려 있는 것"에 그 배타 자리를 한 항목으로
  적는다: `held 판정 뱃지(⏸ 세션 대기 · ↻ 재시도 대기 · ⛓ 선행 대기)`. 자리 변경이 아니라
  이미 렌더되던 두 뱃지가 표에 없던 것을 함께 채우는 것이므로 UI-svh6가 4a에 남긴 것 같은
  별도 `정정` 문단은 두지 않는다.
- **정정(rev5, 구현 리뷰 REVISE 반영).** 4a 의존 칩은 held 본문 **안에서** 그린다.
  `runningTile`의 슬롯 4 칩(`monitor_deps`)은 held도 failed도 아닌 갈래에서만 emit되므로
  held 본문을 타는 `waiting` 타일은 그 자리를 그냥 잃는다. 요약 줄과 `폐기` foot 사이에
  같은 `dependencyChipsTemplate` 출력을 싣는다 — 카드 문법 §2의 줄 순서 그대로다.
  `parked`·`retry_wait` 본문은 건드리지 않는다(그 둘에는 이 칩을 요구하는 스펙이 없다).
- **정정(rev5).** foot `폐기`가 실제로 동작하려면 `server/worker/discard-coordinator.js`의
  `DISCARDABLE_ATTEMPT_STATUSES`에 `waiting`이 있어야 한다. 없으면 `captureSource`가
  `attempt_not_discardable`로 답해 이 타일의 **유일한** 조작이 죽는다. `parked`·`retry_wait`가
  같은 집합에 없는 것은 이 스펙보다 앞선 결함이므로 여기서 고치지 않고 §8에 후속으로 남긴다.

### 5.3 `failure-labels.js`

`FAILURE_CATEGORIES`에 `prerequisite_unmet: '선행 대기'`. 실패 팝오버 경로에는 오지 않지만,
attempt 이력·로그 라인이 cause를 사람 말로 바꿀 때 쓴다.

### 5.4 타일 어댑터 — `worker/index.js`와 `monitor/index.js`

Worker 탭의 어댑터 `app/views/worker/index.js`(약 2755행, `parked:`·`retry_wait:`·
`status_label` 투영)와 Monitor의 같은 자리(`app/views/monitor/index.js` 약 1485행) **둘 다**에
parked·retry_wait와 같은 네 키 규칙(ADR 0014)으로 `waiting: item.run_state === 'waiting'`, `wait: item.wait || null`,
`status: item.status`, `status_label` `선행 대기`를 싣는다. Worker 어댑터를 빠뜨리면 `waiting`
타일이 실행 중 타일로 그려져 시계와 세션 조작을 얻는다. 렌더러는 같은 `runningTile`이다.

### 5.5 `quickfix-resume-kind.js`

변경 없음(D6). 테스트는 "`waiting` held 타일에 `↻ 이어하기`·실패 팝오버·`재시도`가 그려지지
않는다"를 `running-grid` 쪽에서 고정한다. `resumeKindOf` 호출 부재는 요구하지 않는다.

## 6. 6qc7·fifo 재현

- 6qc7: 세션이 `Analysis-2zly`(microbiome_bile)에 blocks를 걸고 종료. Worker: 1 성립(push
  없음) → claim 해제 → ready 부재 → 엣지 `external=true` → `prefixOfBeadId('Analysis-2zly')`
  → microbiome_bile rig가 visible이면 `bd -C` 조회 `open` → 미해결 → defer 없음 → `waiting`.
  rig가 visible이 아니면 판정 불가 → 기존 `delivery_unproven`(fail-quiet). 타일: `선행 대기` ·
  `⛓ Analysis-2zly`(타 rig 색) · 폐기.
- fifo: 세션이 proxy gate Bead(같은 rig)에 blocks → `readStatus(proxy) === 'open'` → `waiting`.
  proxy가 닫히면 다음 tick에 보통 후보로 dispatch.

## 7. 검증 bundle

- `server/worker/failure-class.test.js`: `prerequisite_unmet`+`tier_hint`+blockers → `waiting`;
  hint 없음 → `individual`; `causeKey` 제외.
- `server/worker/scheduler.test.js`: (a) 네 조건 성립 → attempt `waiting`, settle 미호출, claim
  `open`, `notifyChanged`·`tick` 호출됨; (b) ready에 있음 → settle 호출; (c) foreign 조회
  `ok:false` → settle; (d) defer 있음 → settle; (e) `waiting` 뒤 bead가 ready에 다시 오면 다음
  tick이 새 attempt dispatch(fence 없음 — `scheduler.js`·`queue-store.js` 두 터미널 집합 모두
  고정); (f) `waiting`이 직렬 레인을 해제; (g) 환경 재시도 attempt가 `waiting`으로 끝나면
  `queue.hold`가 해제된다; (h) `waiting` 마감이 `session_ended`/`seq='waiting'` 타임라인
  이벤트를 한 줄 남기고 `attempt_failed`는 남기지 않는다.
- `server/worker/foreign-blocker-status.test.js`: `queryForeignBlockerStatus` — rig 매핑 있음
  → `{ok:true,status}`; 매핑 없음 → `no_rig`; `bd` 실패 → `bd_failed`; 캐시를 채우거나 읽지 않음.
- `app/views/worker/index.test.js`: Worker 어댑터가 `waiting`·`wait`·`status_label`을 Monitor와
  같은 값으로 싣는다.
- `server/worker/queue-store.test.js`: `waiting` attempt는 `transferableAttempts`에 들지
  않는다(= `queue.json`에 남는다).
- `server/worker/discard-coordinator.test.js`: `waiting` attempt가 폐기 가능하다
  (`attempt_not_discardable` 아님).
- `server/worker/quickfix-landing.test.js`: 기존 `push_log_absent` 케이스 불변(신호 없는 결말).
- `app/views/worker/lane-model.test.js`: `waiting` held 투영 — `wait` 있음·`failure` 없음·
  `can_resume=false`·`⛓` 칩 합집합. `running-grid.test.js`: `선행 대기` 라벨, foot에 `재시도`
  없음·`폐기` 있음, 요약 없으면 줄 없음. `monitor` 테스트: 같은 타일 키.
- `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120s) · `npm run lint` ·
  `npm run prettier:write` → `npm run build`(bundle·map 포함).
- 실제 화면: 대기 레인에 `waiting` 타일이 실패 레인이 아닌 held 자리에 그려진 스크린샷, 선행
  close 후 새 attempt가 뜨며 타일이 밀리는 스크린샷.

## 8. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | awaited_by_consumer | different_repository — 신호·절차·결과줄은 계약 소유 | 없음 | dotfiles-mq6f |

겹침(rev4 재리뷰 시점에 **셋 다 착지했다** — 엣지는 걸지 않았고 걸 필요도 없었다. 이 스펙이
나중에 착지하는 쪽이므로, 아래 표가 예고한 조정은 전부 이 스펙이 흡수한다):

| Bead | 착지 | 공유 경로 | 해소 |
| --- | --- | --- | --- |
| `UI-svh6` | `77863d7c` (#234) | `lane-model.js`, `running-grid.js`, 카드 문법 스펙 §5.1 | 예고대로 다른 절이었다. svh6는 후보 카드 4a에 『스펙 대기』 판정 칩을 세우고 §5.1 4a 행과 `정정(UI-svh6)` 문단을 더했다. 이 스펙은 held 타일의 `wait` 투영과 슬롯 1 `⛓ 선행 대기` 뱃지이므로 자리가 겹치지 않는다(§5.2) |
| `UI-qksl` | `de7137e7` (#232) | `scheduler.js`, `queue-store.js`, `attach.js` | 예고대로 다른 함수였다. `onSessionDone`은 리뷰 세션을 `failAttempt` 앞에서 분기하므로 `waiting` 판정이 리뷰 attempt에 닿지 않는다. 판정 삽입 위치(`recordReceiptCheck` 뒤 · `quickfixLaneOf` 분기 직전)는 그대로 유효하다 |
| `UI-8wpb` | `43e2f257` (#233) | `scheduler.js`, `failure-class.js`, `queue-store.js`, `attach.js`, `lane-model.js`, `running-grid.js`, `failure-labels.js` | **예고한 교차 1곳을 이 스펙이 흡수했다.** (i) `queue.json`에 남는 집합 — 착지 구현은 이관 대상 whitelist `PROCESSED_TERMINAL_STATUSES`이므로 `waiting`을 넣지 않는 것으로 충족되고, 테스트만 더한다(§4.5·§7 (h)). (ii) 타임라인 — 착지한 `TIMELINE_KINDS`는 닫힌 집합이고, 같은 성격의 `parked`가 새 kind 없이 `session_ended`+`seq='parked'`로 기록된다. 따라서 예고했던 새 kind `attempt_waiting`은 **쓰지 않고** `session_ended`+`seq='waiting'`을 따른다(§4.4) |

- 관찰: spec_backed/full_plan 레인의 같은 결말은 PR 검증 경로에서 `session_ended_unresolved`로
  남는다. 계약이 그 레인에도 같은 절차를 적용하므로 같은 판정식을 그 경로의
  `endedWithoutDelivery` 앞에 두는 것이 자연스럽지만, 이 Bead의 출처 둘이 모두 quick_fix라
  범위를 quick_fix로 한정했다. — 2026-08-30 `Analysis-ez8l`로 재관측되어 `UI-8kvi`(quick_fix)가
  같은 `judgePrerequisiteWait`를 PR 검증 경로의 `no_pr` 갈래 앞에 두었다. 죽은 attempt 복구
  경로(`disposeDeadAttempt`)는 세션 verdict가 없어 그대로 `session_ended_unresolved`다.
- 관찰: `foreign-blocker-status.js`는 표시 전용이라는 헤더 주석을 달고 있다. 이 설계가 판정에
  쓰는 것은 즉시 조회 경로 하나이며, 캐시·TTL·정리 로직은 판정에 관여하지 않는다 — 헤더
  주석의 "Display only" 문장을 그 경계로 고쳐 쓴다.
- 관찰: `waiting` attempt의 비용은 usage에 그대로 남는다(슬롯 5). 별도 집계는 하지 않는다.
- 후속(defect): `discard-coordinator.js`의 `DISCARDABLE_ATTEMPT_STATUSES`에 `parked`·
  `retry_wait`가 없어 그 두 held 타일의 `폐기` 버튼도 `attempt_not_discardable`로 실패한다.
  이 집합은 held 계층(UI-5ym8)보다 앞선 #120에서 굳었고, 이 스펙이 리뷰한 적 없는 두 결말의
  동작을 바꾸는 일이라 별도 Bead로 낸다.

## 결정 (ADR 후보)

- Worker의 `waiting`은 실패 계층이 아니라 `bd ready` 부재가 fence인 **터미널 결말**이며, 복귀
  경로는 클릭도 전이 관측도 아닌 보통 후보 dispatch다 — 되돌리기 어려움: 성립(fence 집합과
  held 타일의 출구가 이 결정에 결속되고, 나중에 클릭 출구를 더하면 parked와 같은 두 경로가
  생긴다) / 맥락 없이 놀라움: 성립(parked는 자동 복귀하지 않는데 waiting은 왜 하는가 — 사람
  결정 대기와 기계 사실 대기의 차이) / 실제 트레이드오프: 성립(자동 복귀는 판정 오류 시 세션
  비용을 다시 쓰고, 그 위험을 "ready 부재" 조건 하나로 막는다). `summary`: "Worker의 waiting
  계층은 선행 미충족으로 정상 종료한 attempt의 터미널 결말이며 실패도 파킹도 아니다 — fence는
  bd ready 부재뿐이고 선행이 닫히면 보통 후보로 자동 dispatch된다". beads-ui ADR 0017(parked
  비자동 복귀)과 충돌하지 않는다: 0017은 `awaiting_user`가 있는 결말에만 적용된다.
