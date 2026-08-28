---
scope:
  - server/worker/scheduler.js
  - server/worker/failure-class.js
  - server/worker/quickfix-landing.js
  - server/worker/queue-store.js
  - server/worker/foreign-blocker-status.js
  - server/worker/attach.js
  - app/utils/quickfix-resume-kind.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/failure-labels.js
  - app/views/monitor/index.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# Worker `waiting` 계층 설계 — 세션의 선행 미충족 착수 거부를 착지 실패와 구분하고, 선행이 닫히면 보통 후보로 자동 복귀시킨다

- Bead: `UI-8jau` (route `spec_backed`)
- 선행: dotfiles `dotfiles-mq6f` (blocks) — 계약 정본
  `docs/superpowers/specs/2026-08-28-prerequisite-gate-session-refusal-design.md` @
  `28cbcd1ea3a321cedbf8aaf87f30097028ae5894` (`spec_review=codex@28cbcd1e`). 이 스펙은 그
  §5.4 "소비자" 절의 구현이며, 판정식·신호·결과줄은 그쪽이 소유하고 여기서는 인용만 한다.
- 출처: 2026-08-28 `dotfiles-6qc7`(attempt `dotfiles-6qc7-1787919923296-1`, $2.99)·`dotfiles-fifo`(2회)

## 1. 문제

세션이 착수 전에 선행 미충족을 확인하고 push 없이 정상 종료하면, Worker는 quick_fix 착지
정산으로 들어가 push 기록 부재만 보고 `quickfix_landing_failed:delivery_unproven:push_log_absent`
로 실패 타일(`⛔ 착지 실패`)을 만든다(`server/worker/quickfix-landing.js:249`,
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
| D5 | foreign blocker 상태는 `foreign-blocker-status.js`의 prefix→rig 해소를 재사용한다 | 이미 있는 유일한 cross-rig 상태 리더. 표시 전용이던 모듈을 판정에도 쓰되, 캐시 값이 아니라 **즉시 조회**로 읽는다(§4.2) |
| D6 | `resumeKindOf`는 `prerequisite_unmet`을 어느 쪽도 아닌 것으로 답하지 않는다 — `waiting` attempt는 `quickfix_landing`이 `null`이라 그 함수에 도달하지 않는다 | 정산이 시작되지 않은 결말이다. `lane-model`은 `run_state='waiting'`에서 `can_resume=false`를 직접 쓴다 |

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

`judgePrerequisiteWait`는 성립 시 `failAttempt(..., 'prerequisite_unmet', { blockers }, { verdict, bead_status, tier_hint: 'waiting' })`를 부르고 `true`를 돌려준다. 성립하지 않으면 아무것도 쓰지 않고 `false`다 — 기존 settle이 그대로 이어진다.

### 4.2 판정식 (계약 §5.4 인용 — 전부 성립해야 한다)

| # | 조건 | 읽는 곳 | 실패 시 |
| --- | --- | --- | --- |
| 1 | `verdict.success === true` ∧ push 기록 부재 ∧ bead status ∉ {resolved, closed} | `deps.readPushLog({attempt_id})` (quickfix-landing과 같은 dep), `deps.bd.readStatus` | 불성립 → settle |
| 2 | claim 해제 뒤 `bd ready --json`이 성공·정상 파싱되고 이 Bead 부재 | `releaseBeadClaim` 후 `deps.bd.snapshotBead(bead_id).ready === false` — 이 스냅샷은 `bd show`+`bd ready` 둘 다 throw-on-failure다 | throw/`ready=true` → 판정 불가 → settle |
| 3 | outgoing `blocks` 엣지 ≥1, 그중 미해결 ≥1 | `deps.bd.readIssue(bead_id).dependencies[]` 중 `dependency_type==='blocks'`. 같은 rig(`external!==true`): `readStatus(target) !== 'closed'`. foreign(`external===true`): `foreignBlockerStatusFor(target, owner_root, requester_root)`의 **즉시 조회** — `prefixOfBeadId` → `visibleWorkspaceRoots` 중 `cachedIssuePrefixFor`가 맞는 root → `bd -C <root> show <id> --json`. 매핑 없음·조회 실패는 "미해결 추정"이 아니라 판정 불가 | 판정 불가 → settle |
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

`notifyLifecycle('attemptWaiting', { bead_id, blockers, repo })`. `fireDirectionInquiry`는 부르지 않는다. 이후 공통 꼬리(workflow_mode revert·exec stamp revert·`disarmEntry`·`releaseBeadClaim`)는 그대로 탄다.

### 4.5 재디스패치와 레인

- `settledAttemptFence`: `latest.status === 'waiting'` → `null`(fence 없음). 그 함수의 주석에 "waiting은 bd ready 부재가 fence다"를 적는다.
- `queue-store.js`: `TERMINAL_ATTEMPT_STATUSES`와 직렬 레인 해제 집합 둘 다에 `'waiting'` 추가(D4). `Attempt.status` 문서 갱신.
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
- 슬롯 배정(카드 문법 §5.1): `선행 대기` 라벨 = 1번 정체성(상태 뱃지), `⛓` 칩 = 4a, `폐기` =
  6번 foot. 새 슬롯은 없다. 카드 문법 스펙 §5.1 표의 "지금 실려 있는 것"에 `선행 대기`를 한
  단어 추가한다(자리 변경 없음).

### 5.3 `failure-labels.js`

`FAILURE_CATEGORIES`에 `prerequisite_unmet: '선행 대기'`. 실패 팝오버 경로에는 오지 않지만,
attempt 이력·로그 라인이 cause를 사람 말로 바꿀 때 쓴다.

### 5.4 `monitor/index.js`

parked·retry_wait와 같은 네 키 규칙(ADR 0014)으로 `waiting: item.run_state === 'waiting'`,
`wait: item.wait || null`, `status_label` `선행 대기`를 싣는다. 렌더러는 같은 `runningTile`이다.

### 5.5 `quickfix-resume-kind.js`

변경 없음(D6). 테스트에 "`quickfix_landing: null`인 waiting attempt는 이 함수에 오지 않는다"
는 사실을 `lane-model` 쪽에서 고정한다.

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
  `open`, `attemptWaiting` 알림; (b) ready에 있음 → settle 호출; (c) foreign 매핑 없음 → settle;
  (d) defer 있음 → settle; (e) `waiting` 뒤 bead가 ready에 다시 오면 다음 tick이 새 attempt
  dispatch(fence 없음); (f) `waiting`이 직렬 레인을 해제.
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

겹침(`stale-rereview-inputs.py` in_flight 3건, 엣지는 걸지 않는다 — 어느 쪽도 상대의 산출물을
전제하지 않고, 먼저 착지한 쪽 위에 나중 쪽이 rebase한다):

| Bead | 상태 | 공유 경로 | 관계 |
| --- | --- | --- | --- |
| `UI-svh6` | open | `lane-model.js`, 카드 문법 스펙 §5.1 | 같은 파일의 다른 절 — svh6는 후보 카드의 『스펙 대기』 예외 칩(슬롯 4a), 이 스펙은 held 타일의 `wait` 투영과 `선행 대기` 라벨(슬롯 1). §5.1 표에 각자 한 단어를 더한다 |
| `UI-qksl` | in_progress | `scheduler.js`, `queue-store.js`, `attach.js` | 다른 함수 — qksl은 머지 큐의 `review_dispatch` claim·`review-session` 경로, 이 스펙은 `onSessionDone`의 quick_fix 분기·`settleFailureTier`·`settledAttemptFence`. `onSessionDone`은 리뷰 세션을 `failAttempt` 앞에서 분기하므로 `waiting` 판정이 리뷰 attempt에 닿지 않는다 |
| `UI-8wpb` | in_progress | `scheduler.js`, `failure-class.js`, `queue-store.js`, `attach.js`, `lane-model.js`, `running-grid.js`, `failure-labels.js` | **실제 교차 1곳**: 8wpb §7 "queue.json에 남는 attempt" 집합(`running`·`retry_wait`·`parked`·미dismiss `failed`)과 §5 타임라인 이벤트 어휘에 `waiting`이 들어가야 한다. 나중에 착지하는 쪽이 그 집합에 `waiting`을(8wpb가 먼저면 이 스펙이, 이 스펙이 먼저면 8wpb가) 더하고, 타임라인 이벤트 `attempt_waiting`은 8wpb 이벤트 표의 열 형식을 따른다. 그 밖의 파일은 다른 절이다 |

- 관찰: spec_backed/full_plan 레인의 같은 결말은 PR 검증 경로에서 `session_ended_unresolved`로
  남는다. 계약이 그 레인에도 같은 절차를 적용하므로 같은 판정식을 그 경로의
  `endedWithoutDelivery` 앞에 두는 것이 자연스럽지만, 이 Bead의 출처 둘이 모두 quick_fix라
  범위를 quick_fix로 한정했다. 재관측 시 admission 재판정.
- 관찰: `foreign-blocker-status.js`는 표시 전용이라는 헤더 주석을 달고 있다. 이 설계가 판정에
  쓰는 것은 즉시 조회 경로 하나이며, 캐시·TTL·정리 로직은 판정에 관여하지 않는다 — 헤더
  주석의 "Display only" 문장을 그 경계로 고쳐 쓴다.
- 관찰: `waiting` attempt의 비용은 usage에 그대로 남는다(슬롯 5). 별도 집계는 하지 않는다.

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
