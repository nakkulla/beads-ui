---
scope:
  - server/worker/wait-judgment.js
  - server/worker/failure-class.js
  - server/worker/scheduler.js
  - server/worker/session-monitor.js
  - server/worker/runner/command-guard.js
  - server/worker/runner/claude.js
  - server/worker/runner/codex.js
  - server/worker/runner/guard-mirror.js
  - server/worker/guard-hook.js
  - server/worker/discard-coordinator.js
  - server/worker/verify-cmd.js
  - server/worker/completion-intent.js
  - server/worker/pr-actions.js
  - server/worker/direction-inquiry.js
  - server/worker/queue-hold.js
  - server/worker/queue-store.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/lane-model.js
  - app/views/help-dialog/index.js
  - app/utils/failure-sentences.js
  - app/protocol.md
---

# Worker 자동화는 사람 결정이 필요한 곳에서만 멈춘다 — 대기 어휘 4종, 미분류 실패의 재시도 사다리, 잔재 자동 처분, 가드의 실행 전 거부 전환, 큐 정지·정리 실패 알림 제거

Bead: UI-a5l2 · route: spec_backed · 2026-09-21

## 1. 배경 — 30일 실측

2026-09-21 사용자가 워커 카드의 `⛔ 확인 대기 · 조치 필요`, `처분 대기`, `조건 대기` 칩의
뜻과 필요성을 물었다. 모든 저장소의 `events.jsonl`(2026-08-22~09-21)과 Discord 워커
채널을 대조한 결과다.

| 표시 | 30일 건수 | 실제 원인 | 사람이 할 일 |
| --- | --- | --- | --- |
| 공급자 보류 알림(한도·429) | 33 | 같은 한도에 걸린 Bead마다 알림 | 없음 |
| `⚠ 선행 대기 · 지연` 알림 | 19 (Bead 2) | 이미 코드에서 제거된 판정의 잔존 기록 | 없음 |
| `확인 대기`(recovery `unclassified`) | 3 | 전부 토큰 갱신 창의 일시 인증 실패 — dotfiles-w8r0 Codex `401 Missing bearer`, UI-g0lk·dotfiles-p0xk cswap 회전창 `OAuth session expired` | 없음 (재시도면 됨) |
| `조건 대기`(recovery `authority`·`verification`) | 5 | 재검토 도구 `artifact_missing`·`anchor_missing` 3, Bead 본문 재현 명령 자리표시자 1, dotfiles main 기존 빨간불 1 | 있음(사람 답) 또는 하네스 결함 |
| 정리 실패 → `🚨 사람 필요`·큐 systemic 정지 | 8 | 전부 하네스 결함. UI-g0lk 15:09 알림은 충돌 해결 세션이 PR head를 `13e239d`→`7dd43fa`로 바꾼 뒤 완료 정리가 옛 head와 identity를 대조해 `identity_changed`를 낸 거짓 경보; dotfiles-gyno(9/15)는 같은 사유로 큐 전체 정지 | 없음 |
| `loud_fail_blocker` 세션 kill | 8 | 실제 base 훼손 0건. dotfiles-muao(9/8)는 읽기 전용 `git -c core.hooksPath=/dev/null diff --stat`로 4유닛 착지 뒤 세션 kill + 큐 정지 | 없음 |
| `verify_red` terminal | 2 | 머지 게이트의 검증 명령 실패(`verify_cmd_failed`) | 있음(환경) |
| `처분 대기`(stale_work) | 1 | ops-a4z: 세션 takeover 뒤 남은 브랜치 5커밋, Worker가 이어갈 기록 없음 | 있음(커밋 보호) |

사람이 결정해야 했던 정지는 9건 중 3건이고, 그중 2건(재현 명령 자리표시자·재검토 오류
중단)은 사용자가 정한 세션 규칙의 결과다. 나머지는 하네스가 자기 결함을 사람에게
넘긴 것이다.

## 2. 사용자 결정 (2026-09-21)

1. 훅 차단은 종결이 아니라 피드백이다. 에이전트는 "이 명령은 안 된다"를 보고 다른
   방법으로 이어간다. 세션을 죽이지 않고 큐를 세우지 않는다.
2. 자동 큐 정지는 어떤 경우에도 걸지 않는다. `⛔ 정지`는 사람이 자동화 토글을 껐을 때만
   존재하는 상태이며 대기 사유가 아니다.
3. 대기 어휘는 `선행 대기`·`공급자 보류`·`재시도 대기`·`세션이 멈춤` 넷이다.
4. 세션이 `authority`·`verification` 사유로 스스로 멈추면 파킹과 같은 출구 — 문의
   세션 자동 기동 — 로 통일한다.
5. 이전 워크트리 잔재는 이어갈 수 있으면 자동으로 이어가고, 이어갈 수 없으면 자동
   백업 뒤 새로 시작한다. 사람에게 묻지 않는다.
6. 공급자 보류·회복 알림은 현행 유지한다.

## 3. 설계

### 3.1 대기 어휘 — 13종에서 4종으로

`app/views/worker/wait-vocabulary.js`의 `WAIT_KINDS`는 아래 4행이 되고, 서버
`wait-judgment.js`의 `WaitKind`는 `prerequisite`·`prerequisite_foreign`·`provider_hold`·
`retry_wait`·`awaiting_user`·`recovery`·`external_job`을 유지하되 카드 라벨은 4종으로
접는다. `stale_work`·`base_moved`·`queue_hold` 종류는 사라진다(§3.4·§3.8·§3.5).

| 라벨 | 글리프 | 접히는 서버 종류 | 판정 |
| --- | --- | --- | --- |
| 선행 대기 | ⛓ | `prerequisite`, `prerequisite_foreign` | `normal`; 선행이 `blocked`·`deferred`·worker-ineligible이면 `action_required`(`blocker_needs_human`) |
| 공급자 보류 | ⏳ | `provider_hold`(usage_limit·outage·429), 큐 행의 provider 게이트 | ADR UI-inge·2026-09-09 보류 해제 설계의 현행 판정(`reset_passed`·`probe_stalled`; `probe_needed`는 UI-inge가 상한과 함께 없앴다) 그대로 |
| 재시도 대기 | ↻ | `retry_wait`(그 Bead의 env 사다리 예약) | `normal`; 예약 시각 + `grace_ms` 경과면 `overdue`(`retry_stalled`) |
| 세션이 멈춤 | ⏸ | `awaiting_user`, `recovery`(`authority`·`verification`·`no_progress`·`reconcile`, 세션이 선언한 `unclassified`, 선행 목록 없는 `prerequisite`) | 항상 `action_required`(`decision`) |

- `external_job`은 UI-z437(외부 대기 재설계, ADR UI-z437로 착지)이 소유한다. 이 스펙은 그
  종류의 라벨·판정·버튼을 바꾸지 않고, 4행 표 아래 z437이 정한 행 하나를 그대로 둔다.
- 판정은 `normal`·`overdue`·`action_required` 세 값이 남지만, `overdue`는 다음 확인
  시각이 있는 종류(공급자 보류·재시도 대기·외부 작업)에만 난다. `세션이 멈춤`은
  기다려서 풀리는 것이 아니므로 `settle_overdue`를 만들지 않는다.
- 배지 모양은 UI-z437이 UI-8gem에서 승계한 규칙 그대로다: `<글리프> <라벨>`, `⚠ <라벨> · 지연[ n분]`,
  `⛔ <라벨> · 조치 필요`. 대표 사유 순서는 `awaiting_user`/`recovery`(=세션이 멈춤) >
  `provider_hold` > `prerequisite_foreign` > `prerequisite` > `retry_wait`다.
- `세션이 멈춤` 카드 본문(슬롯 3)은 세션이 남긴 문장 한 줄이다: 파킹은 `awaiting_user`
  값별 현행 문장, recovery는 attempt `cause_detail.summary`의 첫 줄(결과 줄의
  `blocker:` 뒤). `RECOVERY_WAIT_LABELS`·`RECOVERY_WAIT_SENTENCES`의 `조건 대기`/
  `확인 대기` 두 낱말은 없어지고, `RECOVERY_WAIT_SENTENCES`는 팝업의 해제 조건 줄로만
  남는다.
- 도움말 범례(`help-dialog`)는 4행 + z437 행을 그린다. 요약 칩 `막힘 N · ⛔ M`은
  그대로다.

### 3.2 알 수 없는 실패는 같은 세션 재시도 사다리를 탄 뒤 실패 타일이 된다

**분류.** `failure-class.js classifyFailure`에서 정본 복구 정책 키
`finished_without_result_line`·`past_failure_line`·`environment_line`·`unknown_error`로
떨어지는 종료는 `env` 티어로 분류한다. `matchEnvPattern`이 그룹을 찾으면 그 그룹
(`api`·`runtime`·`provider_capacity`)을 그대로 쓰고,
어떤 패턴도 맞지 않을 때만 그룹 `unknown`을 붙인다. `unknown`은 `ENV_ERROR_PATTERNS`에
넣지 않는다 — 패턴 부재와 "정책이 `unclassified`를 줄 키"라는 두 사실이 그룹을 정한다.
인증 실패(`credential`)는 ADR UI-inge대로 러너 어댑터의 공급자 분류가 먼저 잡아 계정
단위 공급자 보류가 되므로 이 사다리에 오지 않는다.
기존 `RETRY_DELAYS_MS`(2·5·15분)와 `RETRY_MAX`(3)를 그대로 쓴다.
`session_failed:turn_failed`도 이 경로를 탄다(현재는 정책 부재 시 `individual`).

**재시도 선택.** 현행 `runDueRetries`는 `prior_attempt` 선택이나 보존 작업이 있을 때만
`resume`하고 그 밖에는 새 `dispatch`를 한다. 이 스펙이 사다리에 새로 올리는 종료(위
네 키와 `turn_failed`)는 재시도 선택을 명시한다: 실패 attempt에 이 호스트의 세션 기록
(`session_id`, Claude는 전사 존재·Codex는 thread)이 있으면 `resume(…, { continuation:
'auto', retry })`로 같은 세션·같은 러너·모델·effort·계정을 잇고, 세션 기록이 없으면
같은 실행 설정을 승계한 새 `dispatch(…, { retry })`다. 보존 커밋의 유무는 조건이
아니다 — 커밋 없는 종료도 같은 규칙을 탄다. 사다리 소진 판정은 두 경로 모두 같은
계보(`lineages`)의 `attempts` 수로 한다.

**소진.** 사다리를 다 쓰면 attempt는 `status:'failed'`, `cause`는 원래 토큰, `retry`
객체에 소진 기록이 남는다. `❌ 실패` 알림 1회, 카드는 실패 타일(`↻ 재시도`·`폐기`),
Bead는 `open`이다. `transient_retry_exhausted → wait provider`로 `waiting`을 만들던
현행 경로는 모든 env 그룹에서 없어진다. 계약의 `fatal`은 이 상태가 아니다: 아무것도
Bead를 닫지 않고, 재시도 예산 리셋도 하지 않으며(`retry_budget_reset: forbidden`),
사람이 `↻`를 누르면 새 계보가 아니라 같은 계보의 수동 재개다.

**동일 원인 반복과 큐 단위 실패.** 큐 단위 보류(`queue.hold`)는 종류를 불문하고
사라진다(§3.5). 같은 원인이 여러 Bead에서 반복되면 각 Bead가 자기 사다리를 돌 뿐이다.
`gh_unavailable`·`bd_unreachable`은 그 attempt의 개별 env 실패(그룹 `api`)로 같은
사다리를 탄다 — 그동안 다른 Bead의 자동 출발을 막지 않는다.

**세션이 선언한 대기.** 결과 줄 `대기 · recovery:<reason>`은 계속 읽고, 허용 토큰은
정본 `wait_reasons` + `reconcile` 그대로다(`unclassified` 포함 — 정책의 `wait_reasons`에
있고 preamble이 세션에 전달한다). 세션이 선언한 `authority`·`verification`·`no_progress`·
`reconcile`·`unclassified`는 §3.3이다 — 세션이 스스로 "모르겠다"고 선언한 것은 재시도가
아니라 사람 질문의 대상이다(분류 키 `session_recovery_wait`로 구분). `provider`·
`credential`은 공급자 보류·env 사다리의 현행 경로, `prerequisite`는 `blocks` 목록이
있으면 선행 대기, 없으면 §3.3이다. 정책 분류 결과의 `unclassified`(위 네 키)만 사다리로
가고 카드에 나타나지 않는다.

### 3.3 `세션이 멈춤` — 파킹과 복구 대기의 출구 통일

- **문의 세션 자동 기동.** `scheduler.js`가 `waiting` + `cause_detail.recovery`를 기록한
  직후, 그 `reason`이 `authority`·`verification`·`no_progress`·`reconcile`이거나, 세션이
  선언한(`classification: 'session_recovery_wait'`) `unclassified`이거나, `blocks` 목록이
  비어 있는 `prerequisite`이면 `fireDirectionInquiry`와 같은 게이트
  (`worker_direction_inquiry.enabled`, tmux 존재, Bead당 1개)로 문의 세션을 띄운다. 이
  여섯 조건이 §3.1 표의 `세션이 멈춤` 판정 집합과 같으며, 하나의 술어 함수가 둘을 공유한다. `direction-inquiry.js`에 넷째 처분 `recovery`가 생기고 프롬프트 블록은
  dotfiles `execution-common.md` Direction inquiry 절이 소유하는 `recovery` 블록의 바이트
  복사를 다이제스트로 고정한다(ADR 0036·0012 방식). 슬롯은 `<bead-id>`·`<reason>`·
  `<blocker 문장>`·`<기록 세션>`·`<구현 워크트리>`·`<target_base 체크아웃>`이다. 블록의
  절차는 "attempt 기록·Bead 댓글·결과 줄을 읽어 무엇이 멈췄는지 요약 → `AskUserQuestion`
  1회(이어가기 지시 자유 입력 / 폐기 / 사람이 직접 본다) → 답 원문을 notes
  `recovery-inquiry: <reason> — 사용자 답: <원문>` 줄로 남김 → 이어가기 지시면 그
  세션이 기록 세션을 fork해 지시대로 계속하고 `↻ 이어하기`와 같은 `resume` 경로로
  Worker에 넘기지 않는다(문의 세션이 곧 작업 세션이다)"이며, 금지는 파킹 블록과 같다
  (`awaiting_user` 단독 해제·Bead 상태 직접 변경·외부 리뷰어 dispatch).
- **카드.** 슬롯 1 `⛔ 세션이 멈춤 · 조치 필요`, 슬롯 3 세션 문장, 조작은 `[세션에서
  해결]`(살아 있는 문의 세션 pane 또는 fork)·`폐기`. 기존 `↻ 이어하기`는 recovery
  타일에서 사라진다 — 문의 세션이 그 자리를 대신하고, 원인 확인 없는 맹목 재개를 두지
  않는다는 UI-3vvi 5항의 취지는 유지된다.
- **알림.** 현행 `waitActionRequired` 1회(`(bead, recovery, decision)` 키). 문의 세션
  기동 결과 한 줄(`질의 세션: launched · fork <sid8>` 등)은 파킹 알림과 같은 형식으로
  그 알림에 붙는다.
- **`awaiting_user` 파킹**은 ADR 0036 그대로다(값별 세 블록·`[세션에서 해결]`·`[폐기]`).
  이 스펙은 recovery를 같은 출구에 붙일 뿐 파킹의 쓰기·해제 규칙을 바꾸지 않는다.
- 사용자가 정한 세션 규칙(재현 명령 자리표시자 금지, 재검토 오류 시 중단) 때문에
  세션이 `authority`로 멈추는 것 자체는 이 설계 밖이다(§7).

### 3.4 잔재 자동 처분 — `처분 대기`를 없앤다

디스패치가 `worktree_stale_work` admission을 기록하던 세 지점(`scheduler.js` 2899·
9451·9473 부근)은 admission을 기록하는 대신 같은 자리에서 처분을 실행한다. 현행
`staleWorkAction`(`scheduler.js:2909`)과 `discardCoordinator.backupFresh`
(`discard-coordinator.js:2277`)는 저장된 admission·`action_id`·revision을 필수로 검사하므로
그대로 부를 수 없다. 새 내부 계약 `disposeStaleResidue(workspace, bead_id, observation,
resume_attempt, cut_base)`가 관측 직후 손에 있는 **검증된 잔재 identity**
(`staleWorkAdmission`이 만들던 `identity`·`state`·`cause`·capability 네 플래그)를 인자로
받아 아래 순서로 처분하고, `staleWorkContinue`·`backupFresh`·`staleWorkRecheck`의 본체는
admission 조회 대신 그 identity를 받는 내부 함수로 나뉜다(`discard-coordinator.js`의
`backupFresh`는 `backupFreshResidue(identity, …)`를 노출하고 기존 WS 진입은 없어진다).

1. `can_resume` — 잔재 identity와 맞는 재개 가능 attempt가 있으면
   `resume(…, { preclaimed: true })`로 같은 세션을 잇는다.
2. 아니고 `can_continue` — `dispatch(workspace, bead_id, null, { stale_work: identity })`로
   잔재 워크트리·브랜치를 새 attempt의 작업 공간으로 삼는다(커밋 보존, `head_oid`는
   잔재 head).
3. 아니고 `can_backup_fresh` — `backupFreshResidue(identity)`로 `discard-backups`에
   보관한 뒤 같은 tick에서 새 attempt를 디스패치한다. 백업이 `identity_changed`로
   거부되면 관측을 한 번 다시 해 1~3을 재판정한다.
4. 그 밖(`state:'unknown'`, `observe_failed`, 소유 아님) — 재관측(`removeIfDiscardable`
   without `preserve`, 현행 `staleWorkRecheck` 본체)을 한 번 돌리고, 여전히 처분할 수
   없으면 attempt를 `failed`·`cause:'stale_work_unresolved'`(개별, 실패 타일 `↻ 재시도`·
   `폐기`)로 기록한다. 큐는 계속 간다.

- 자동 처분은 `bead_timeline` `stale_work_auto`(summary `잔재 자동 처분 · <resume|continue|
  backup_fresh> · <cause>`)를 남기고 알림은 내지 않는다. 백업 경로는 timeline detail에
  기록한다.
- WS op `worker-stale-work-continue`·`-backup-fresh`·`-recheck`, 클라이언트 처분 버튼,
  `WaitKind 'stale_work'`, verdict `disposition`, admission `reason:'worktree_stale_work'`,
  `staleWorkAction`의 admission·`action_id`·revision 검사는 제거한다. 로드 시 남아 있는
  `worktree_stale_work` admission은 지우고 그 Bead는 다음 디스패치 패스에서 위 절차를
  탄다.
- ADR 0038(처분 대기 admission이 대표 행)은 그 admission이 사라지므로 supersede한다.

### 3.5 큐 정지와 정리 실패 — 큐 단위 보류를 없앤다

- **큐 보류는 종류를 불문하고 사라진다.** `runPass`는 `q.hold !== null`이면 다른 Bead의
  자동 출발까지 막으므로(`scheduler.js:15348` `explicit_only`), `env` 보류를 남겨도 사용자
  결정 2를 위반한다. 따라서 `applyQueueHold` 호출 전부 — `systemic_failure` 세 곳(5421
  `loud_fail_blocker`, 5679 systemic 티어, 13691 relaunch의 `base_landing_detected`)과
  `env_failure`(5536) — 를 제거하고, `queue-hold.js`의 보류 리듀서(승격 규칙 포함)와
  `queue.hold`·`hold_history` 필드, WS op `worker-queue-hold-resume`·
  `worker-queue-hold-retry-now`, 4a 게이트 칩 `⛔ 정지`·`↻ 환경 보류`, `WaitKind
  'queue_hold'`를 없앤다. `explicit_only`는 `q.auto_advance !== true`만 본다. 재시도
  예약은 오직 그 Bead의 `retry_wait`(계보 `lineages`)이며 다른 Bead의 출발을 막지 않는다.
  로드 시 남아 있는 `hold`(systemic이든 env든)는 지우고 `hold_history`는 버린다 — 큐
  보류가 존재할 수 없는 기록이다. `queue-hold.js`는 계보·재시도 예약 리듀서만 남는다.
- `ALWAYS_SYSTEMIC_CAUSES`와 `SYSTEMIC_BLOCKER_REASONS`는 사라진다. 처분:
  `base_landing_detected` → 개별 `failed`(그 Bead만, `❌ 실패` 알림, §3.6);
  `gh_unavailable`·`bd_unreachable` → 그 attempt의 개별 env 실패(그룹 `api`, §3.2 사다리);
  `verify_red` → §3.7. `failure-class.js`의 `systemic` 티어 자체가 없어진다.
- **정리 실패.** 「정리 중단」 알림의 실제 발신 지점은 `completion-intent`의
  `NEEDS_HUMAN_NOTIFY_CLASSES`(정리 토큰이 이미 없다)가 아니라 `pr-actions.js`
  `failCleanup`이 부르는 `announceCleanupStop`(2326·3501행)이다. 그 호출을 제거해 정리
  실패는 Bead 카드의 `cleanup_failed` 행(`[정리 재시도]`)과 timeline·Bead 댓글에만 남고
  Discord `🚨 사람 필요`를 보내지 않는다 — 첫 실패, UI-a8rq 관측형 자동 재실행 소진,
  `[정리 재시도]` 재실패 모두 같다. 남는 `needs_human` 알림 클래스는 `머지 게이트 보류`
  (ADR 0040의 위조 3종), `배포 실패`(사다리 소진 뒤 terminal, 계약 소유), `post-merge 잡
  실패`, `수동 배포 실패`, `폐기 실패`다 — 전부 사람의 손이 아니면 풀리지 않는 것들이다.
- **완료 정리의 identity.** `pr-actions.js cleanupCompletedBranches`가 넘기는
  `expected_head`는 완료 intent가 머지를 실행할 때 기록한 그 머지 op의 head(§5 `merge op
  head`, UI-g0lk의 verify op가 쓴 `verify_head_sha`와 같은 값)이며, 게이트 시점 subject나
  캐시된 gh 관측이 아니다. 잔재 워크트리 HEAD가 그 head와 같으면 제거하고, 다르면
  `identity_changed`다. 충돌 해결 세션이 head를 바꾼 뒤에는 `merge_subject`가 subject를
  재핀하므로(현행) 머지 op head가 곧 최종 head다.

### 3.6 가드 — 실행 전 거부와 사후 착지 감지만 남긴다

강제층은 ADR 0007의 예방(`pre-push` 훅)과 사후 ref 불변식을 그대로 두고, 텍스트
판정의 kill을 없앤다.

- **Claude 러너: 실행 전 거부.** `WORKER_SETTINGS_OVERRIDE`에 `hooks.PreToolUse`
  (`matcher: 'Bash'`) 한 항목을 더해 attempt별 가드 스크립트(현행 `guard-hooks/<attempt>`
  디렉터리에 함께 설치, base·target 리터럴을 구움)를 부른다. 스크립트는
  `command-guard.js`와 같은 토크나이저로 명령을 판정해 `gh_pr_merge`와 **쓰기 동반**
  `hook_bypass`(같은 명령줄에 `git push`·`git commit`·`git merge`·`git rebase`·`git tag`·
  `gh pr merge`가 있을 때의 `--no-verify`·`core.hooksPath`·`GIT_CONFIG_COUNT`·
  `GIT_CONFIG_KEY_n`·`GIT_CONFIG_VALUE_n`·`GIT_CONFIG_PARAMETERS`)에
  `permissionDecision: "deny"`와 현행 `guardKillMessage` 문장을 돌려준다. 읽기 전용
  명령(`diff`·`log`·`status`·`show`·`rev-parse` 등)에 붙은 hooksPath는 판정하지 않는다.
  `git_push_base`·`base_merge`는 현행대로 경고 기록이다. 세션은 거부 사유를 보고 다음
  턴을 이어간다.
- **Codex 러너: 같은 실행 전 거부.** Codex CLI도 `hooks.json`의 `pre_tool_use` 훅으로
  명령 거부를 지원하고, Worker 세션은 사용자 훅을 활성 상태로 돈다(`codex.js`
  `codexSpec`, 467~470행 주석). `codex.js`가 준비하는 프로세스별 `CODEX_HOME` 미러
  (`guard-mirror.js`)의 `hooks.json`에 같은 가드 스크립트를 `pre_tool_use` 항목으로
  싣고, Codex가 훅 신뢰 상태를 `config.toml`의 `hooks.state`로 관리하므로 미러의
  `config.toml`에 그 항목의 승인 상태를 함께 쓴다. 거부 응답은 Codex 훅 규격의 거부
  결정과 같은 사유 문장이며, 세션은 그 출력을 보고 이어간다. 훅이 전달되지 않는
  Codex 버전(세션 시작 이벤트에 훅 로드 흔적이 없을 때)에서는 `codex.js`의 스트림 판정이
  `guard_warning`으로 기록만 남기고, 예방은 `pre-push`가, 우회 push는 §3.6 마지막 항의
  사후 감지가 잡는다. 검증(§6)은 훅 전달·신뢰·거부 결과 확인을 포함한다.
- **kill 제거.** `session-monitor.js guardKill`의 위반 kill 경로(즉시 kill과 `guard_pending`
  tool_result 확정 kill)를 제거한다. `guard_pending` 기록·`hook_bypass_unresolved` 경고
  정리는 유지한다. `GUARD_EFFECTS`는 전부 `warn`이 되고, `loud_fail_blocker` cause는
  대화형 질문 감지 kill(`question_reason`)에만 남으며 `individual`이다.
  `blockerCauseDetail`·`guardKillMessage`는 거부 문장 생성에 재사용한다.
- **사후 감지.** `base_landing_detected`는 그 attempt를 `failed`(개별)로 기록하고
  `❌ 실패` 알림을 낸다. 큐는 계속 간다. 이것이 예방층이 실제로 뚫린 유일한 증거이며,
  텍스트 판정은 증거가 아니다.
- `pre-push` 훅의 `guard`·`record`·`deny` 모드와 선택 규칙(bench=deny, quick_fix
  lane=record, 그 외 guard)은 바꾸지 않는다.

### 3.7 `verify_red` — 워크스페이스 검증 명령의 red는 종단이 아니라 보류다

`verify_red`는 머지 게이트의 워크스페이스 `verify_cmd`(`verify-cmd.js runVerifyCmd`)가
**실행된 뒤 0이 아닌 코드로 끝난** 결과(`reason: 'verify_cmd_failed'`)를 `factFromGate`
(`completion-intent.js:1853`)가 분류한 것이다. 실행 불가와 timeout은 별도 코드
`verify_cmd_spawn_error`·`verify_cmd_timeout`이다. 따라서 `verify_cmd_failed`는 repo-ops
`[verify]` 스크립트 red와 같은 **코드 질문**이며 처분도 같다:

1. `verify_cmd_failed`는 재평가 없이 곧바로 UI-g0lk의 `verify_hold`(비종단 holding)로
   들어간다. 배지·본문·출구는 g0lk 그대로(`검증 실패 — 수정 push 대기`, `[세션에서 해결]`,
   수정 push가 자동 해제). Discord는 g0lk의 `머지 전 검증 실패` 라벨을 head당 1회 쓴다.
   실패 키 stage는 `verify`, reason은 `verify_cmd_failed`로 남겨 repo-ops red와 구분한다.
2. `verify_cmd_spawn_error`·`verify_cmd_timeout`은 환경 증거가 있는 경우다.
   `completion-intent`가 `auto_resolution`(`class:'retry'`)으로 5분 뒤 게이트를 한 번
   재평가하고(`COMPLETION_RETRY_MAX` 안의 1회), 다시 같은 코드면 같은 `verify_hold`에
   사유 코드를 그대로 싣고 배지만 `검증 명령 실패 — 환경 확인`으로 그린다. 현재 이 두
   코드가 `factFromGate`에서 어떤 상태로 가든 이 규칙이 대신한다.
3. terminal `needs_human('verify_red')`, `needsHumanHoldKind`의 systemic 판정,
   `ALWAYS_SYSTEMIC_CAUSES`의 `verify_red`는 사라진다.

repo-ops `[verify]` red는 g0lk 그대로이고, 머지 뒤 배포·검증 op 실패는 계약(UI-3vvi-2)의
수정 Bead 자동 인계 그대로다. 이 스펙은 그 두 경로를 만들지도 바꾸지도 않는다.

### 3.8 `base_moved` — 보존 세션 자동 이어하기

`대기 · base_moved:<candidate>:<base>`로 끝난 attempt는 지금 `↻ 이어하기`를 기다린다.
새 규칙: 기록 직후 §3.2의 env 사다리와 같은 지연(2분)으로 같은 세션을 자동 재개한다
(UI-lmqu-2가 정한 "보존 세션 이어하기" 그대로, 방아쇠만 자동). 같은 계보에서
`base_moved`가 세 번 반복되면 base가 계속 움직이는 것이므로 §3.3의 `세션이 멈춤`
(`reason: no_progress`, 문장 `base가 반복 이동함 · 후보 <sha7>`)이 된다. `WaitKind
'base_moved'`와 `반영 대기` 라벨은 없어진다.

### 3.9 알림 표 (변경 뒤)

| 알림 | 남는가 | 근거 |
| --- | --- | --- |
| `⏳ 공급자 보류` / `✅ 공급자 회복` / `🚨 자동 재개 중단` | 현행 유지 | 사용자 결정 6 |
| `⚠ … 지연` (공급자 프로브·재시도·외부 작업) | 유지, `(bead, kind, code)` 1회 | 2026-09-15 대기 사유 통일 후보 2 |
| `⛔ 세션이 멈춤 · 조치 필요` + 문의 세션 결과 줄 | 유지 | §3.3 |
| `❌ 실패` (사다리 소진·`base_landing_detected`·`stale_work_unresolved`) | 유지 | 자동 수리까지 실패한 사실 |
| `🚨 사람 필요` — 머지 게이트 보류·배포 실패·post-merge 잡·수동 배포·폐기 실패 | 유지 | 사람 손이 아니면 안 풀림 |
| `🚨 사람 필요` — 정리 중단 | 제거 | 카드 `[정리 재시도]`로 충분 |
| `🚀 충돌 해결` / `🚀 재개` / `📬 PR 제출` / `✅ 머지 완료` | 현행 유지 | 범위 밖 |

## 4. 인터페이스·데이터 변경

- `app/protocol.md`: `wait_reasons[].kind`에서 `stale_work`·`base_moved`·`queue_hold` 제거,
  `verdict_code`에서 `disposition`·`hold`·`settle_overdue`(recovery)·`recovery_confirm`
  제거·`decision`으로 통합, `queue.hold`·`hold_history` 필드 제거, WS op
  `worker-stale-work-continue`·`-backup-fresh`·`-recheck`·`worker-queue-hold-resume`·
  `worker-queue-hold-retry-now` 제거. attempt 기록에 `cause:'stale_work_unresolved'`,
  timeline kind `stale_work_auto`·`guard_denied`(실행 전 거부 기록: runner·reason·command)
  추가.
- `wait-vocabulary.js`: `WAIT_KINDS` 4행 + z437 행, `REPRESENTATIVE_KIND_ORDER` 축소,
  `RECOVERY_WAIT_LABELS` 제거. `gate-labels.js`의 `자동 재개 소진 · 수동 조치 필요`는
  UI-inge가 상한을 없애 재료가 사라졌으므로(착지 d9ccb52) 함께 제거한다.
- `failure-sentences.js`: `RECOVERY_WAIT_SENTENCES`는 팝업 해제 조건으로 유지, 라벨 제거.
- `queue.json` 1회 이행(로드 시, `queue-store.js` 정규화): `admission[bead].reason:
  'worktree_stale_work'` 항목 삭제(다음 디스패치 패스가 §3.4 처분); `hold`·`hold_history`
  삭제; 기존 `status:'waiting'` + `cause_detail.recovery.reason:'unclassified'` 기록은
  분류 키가 `session_recovery_wait`(세션 선언)이면 그대로 두고 §3.3의 `세션이 멈춤`으로
  읽으며, 정책 분류(네 키)였으면 `status:'failed'`로 바꾸고 `retry`에 `{ migrated:
  'unclassified_wait', attempts: 0 }`을 남긴다 — 자동 재개는 하지 않고(예산 소모 없이 사람
  `↻`로 새 사다리 시작) 실패 알림도 내지 않는다.
- dotfiles 크로스 리포 unit(§경계): `execution-common.md` Direction inquiry 절에 `recovery`
  블록 추가. beads-ui는 그 바이트 다이제스트를 `direction-inquiry.js`에 고정한다. 정본
  복구 정책(`work_recovery`)의 표는 바꾸지 않는다 — beads-ui가 `unclassified`를 주는 키를
  정책 조회 전에 env 티어로 보내는 것은 분류 순서의 선택이지 키 의미의 재정의가 아니다.

## 5. 오류 처리

- 문의 세션 기동 실패(tmux 없음·fork 실패·브리지 없음)는 파킹과 같다: 알림에 `질의 세션:
  not_launched · <사유>` 한 줄, 카드 `[세션에서 해결]`은 클릭 시 재시도.
- 자동 백업 실패(`backupFresh` 오류)는 잔재를 건드리지 않고 `stale_work_unresolved`
  실패 타일로 간다. 잔재는 사람이 폐기하기 전까지 남는다.
- 실행 전 거부 스크립트 자체의 오류(비정상 종료)는 Claude·Codex 모두 훅 기본 동작대로
  허용 통과이며 `guard_warning`(`reason:'guard_hook_error'`)을 남긴다 — 예방층은
  `pre-push` 훅이므로 fail-open이 안전하다. Codex 미러에 훅 신뢰 상태를 쓰지 못하면
  세션 시작 로그에 훅 로드 흔적이 없으므로 §3.6의 "기록만" 경로로 떨어지고 시작 이벤트에
  `guard_warning`(`reason:'codex_hook_not_loaded'`)을 남긴다.
- 재시도 `resume`이 `prior_session_unavailable`로 거부되면(전사 소실) 같은 계보의 다음
  회차를 새 `dispatch`로 잇고 `retry.attempts`는 그대로 센다.
- `merge op head`를 읽을 수 없는 오래된 완료 intent(이행 전 기록)는 현행대로 관측
  head → subject head 순으로 폴백한다.
- 사다리 중 재시도 세션이 다시 알 수 없는 오류로 끝나면 같은 계보의 `attempts`만
  늘고 예산은 리셋되지 않는다(`retry_budget_reset: forbidden`).

## 6. 테스트·검증

`vitest` 단위 테스트(각 한 동작):

1. `failure-class`: 정책이 `unclassified`를 주는 네 키가 `env_group === null`이면 `env`
   티어·그룹 `unknown`으로, 패턴이 맞으면(예: `api`·`runtime`) 그 그룹으로 분류된다;
   `session_failed:turn_failed`도 같다; `systemic` 티어를 내는 입력이 없다.
2. `scheduler` 재시도 선택: 세션 기록이 있는 실패는 `resume`(같은 러너·모델·effort·
   계정), 없는 실패는 실행 설정을 승계한 `dispatch`로 재시도되고, 보존 커밋이 없어도
   같다; 사다리 소진 뒤 attempt가 `failed`가 되고 `waiting`·`recovery:provider`를 만들지
   않는다; 실패 알림이 1회 난다.
3. 큐 보류 부재: `applyQueueHold` 호출 지점이 코드에 없고(정적 grep 테스트),
   `gh_unavailable`·`bd_unreachable`·`base_landing_detected`가 큐 보류를 만들지 않으며,
   `explicit_only`가 `auto_advance`만 본다; 로드 시 저장된 `hold`·`hold_history`가 지워진다.
4. `wait-judgment`: `recovery authority` 행이 `decision`·`action_required`이고
   `settle_overdue`가 나지 않는다; `stale_work`·`base_moved`·`queue_hold` 행이 나지 않는다;
   선행 목록 없는 `recovery prerequisite`와 세션 선언 `unclassified`가 `세션이 멈춤`이다.
5. `direction-inquiry`: `recovery` 처분이 블록 다이제스트를 고정하고 슬롯을 채운다;
   여섯 조건(`authority`·`verification`·`no_progress`·`reconcile`·세션 선언 `unclassified`·
   선행 목록 없는 `prerequisite`) 각각에서 `onParkedAttempt`가 호출되고 정책 분류
   `unclassified`에서는 호출되지 않는다.
6. `scheduler` 잔재: admission 없이 `disposeStaleResidue`가 `can_resume`→resume,
   `can_continue`→stale dispatch, `can_backup_fresh`→`backupFreshResidue` 뒤 dispatch,
   unknown→재관측 1회 뒤 `stale_work_unresolved`를 수행한다. 각각 `stale_work_auto`
   timeline이 남고 `worktree_stale_work` admission이 기록되지 않는다;
   `backupFreshResidue`가 identity 인자만으로 동작한다(`stale_work_conflict` 없음).
7. `session-monitor`·`runner/codex`: `gh_pr_merge`·`hook_bypass` 관측이 `guard_warning`만
   남기고 SIGTERM을 보내지 않는다; 질문 감지 kill은 유지된다.
8. 실행 전 거부: `runner/claude`의 `--settings`에 PreToolUse 훅이 실리고, `runner/codex`의
   `CODEX_HOME` 미러 `hooks.json`·`config.toml` 신뢰 상태에 같은 훅이 실린다; 거부 스크립트가
   `gh pr merge`와 쓰기 동반 hooksPath에 deny를, 읽기 전용 hooksPath와 `git push origin
   <feature>`에 allow를 돌려준다; 훅 미로드 세션은 `codex_hook_not_loaded` 경고를 남긴다.
9. `completion-intent`·`pr-actions`: `verify_cmd_failed`가 곧바로 `verify_hold`가 되고
   `verify_cmd_spawn_error`·`verify_cmd_timeout`은 1회 재평가 뒤 `verify_hold`가 되며,
   어느 쪽도 terminal `needs_human`·큐 보류를 만들지 않는다; `failCleanup`이
   `announceCleanupStop`을 부르지 않아 첫 실패·자동 재실행 소진·`[정리 재시도]` 재실패
   모두 Discord 알림이 없다.
10. `pr-actions`: `cleanupCompletedBranches`가 머지 op head를 `expected_head`로 쓴다;
    충돌 해결로 head가 바뀐 시나리오에서 정리가 성공한다.
11. `wait-vocabulary`·`help-dialog`·`lanes`: 4행 범례, recovery 타일에 `↻ 이어하기`가 없고
    `[세션에서 해결]`이 있다; 4a 게이트 칩에 `정지`·`환경 보류`가 없다.
12. `queue-store` 이행: 로드 시 잔재 admission·`hold`·`hold_history`가 지워지고, 정책 분류
    `waiting/unclassified` 기록이 `failed`(`retry.migrated`)로, 세션 선언 기록은 그대로
    남는다.

절차: Pre-Handoff Validation(`npm run tsc`, `npm run lint`, prettier, `npx vitest run
--reporter=dot`). 배포 뒤 공유 서버에서 (a) Claude Worker 세션 하나에서 `gh pr merge`
를 시도하게 해 거부 문장이 세션 로그에 남고 세션이 계속되는 것, (b) 임의 Bead의
워크트리에 커밋을 남기고 재디스패치해 `stale_work_auto`가 남는 것, (c) 30일 Discord
채널에서 `정리 중단`·systemic 정지 알림이 더 나지 않는 것을 확인한다.

## 7. 비목표

- 공급자 보류·회복·전환 알림의 묶음·축소(사용자 결정 6).
- 외부 작업 대기(`external_job`)의 어휘·판정·버튼 — UI-z437 소유.
- 사용자가 정한 세션 규칙(재현 명령 자리표시자 금지, 재검토 오류 시 중단)과 그로
  인한 `authority` 정지 자체.
- 정본 복구 정책 `work_recovery` 표와 `fatal` 규칙의 변경.
- `pre-push` 훅의 모드·설치 규칙(ADR 0007 예방층)의 변경.
- 머지 게이트 위조 3종의 terminal `needs_human`(ADR 0040)과 배포 실패 사다리·수정 Bead
  인계(UI-3vvi-2, 계약 소유)의 변경.
- 대화형 질문 감지 kill과 파킹의 쓰기·해제 규칙(ADR 0036).
- 공급자 보류 자체의 판정(UI-inge·2026-09-09 설계).

## 8. 구현 unit 후보 (advisory)

- unit-01: 실패 분류·사다리·큐 보류 제거 — §3.2·§3.5·§3.7·§3.8 (`failure-class.js`,
  `scheduler.js` 종료 정산·재시도 선택, `queue-hold.js`, `queue-store.js` 이행,
  `completion-intent.js`, `pr-actions.js`, `verify-cmd.js`).
- unit-02: 가드 — §3.6 (`command-guard.js`, `session-monitor.js`, `runner/claude.js`
  PreToolUse 스크립트·설치, `runner/codex.js`·`runner/guard-mirror.js` 미러 훅).
- unit-03: 잔재 자동 처분과 문의 세션 — §3.3·§3.4 (`scheduler.js` 디스패치 지점,
  `discard-coordinator.js`, `direction-inquiry.js`, `ws/worker-handlers.js`).
- unit-04: 표시 — §3.1 (`wait-judgment.js` 판정 코드, `wait-vocabulary.js`, `lanes.js`,
  `running-grid.js`, `lane-model.js`, `help-dialog`, `failure-sentences.js`, `protocol.md`).

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 크로스 리포 unit: dotfiles quick_fix — `src/shared/skills/flow/workflow/references/execution-common.md`
  Direction inquiry 절에 `recovery` 프롬프트 블록(슬롯 `<bead-id>`·`<reason>`·`<blocker 문장>`·
  `<기록 세션>`·`<구현 워크트리>`·`<target_base 체크아웃>`, 절차 3단계, 금지 3항)을 추가하고
  설치 사본을 배포한다. UI-a5l2가 그 Bead에 foreign `blocks` 의존을 건다(블록 바이트가
  `direction-inquiry.js` 다이제스트의 전제). 라우터 hand-off에서 생성·연결한다.
- 관찰: UI-inge — d9ccb52로 먼저 착지했고 ADR UI-inge가 UI-1l3a·0052·UI-6icf를 승계했다.
  `credential`은 `ENV_ERROR_PATTERNS`가 아니라 러너 어댑터의 공급자 분류 그룹으로 들어가
  계정 단위 공급자 보류가 되므로 §3.2의 env 사다리와 겹치지 않는다. 이 스펙의 전제·supersede
  인용은 2026-09-21 재검토(correction)에서 후계 ADR UI-inge로 갱신했다. 같은 재검토에서
  UI-z437(ADR UI-z437, UI-3pu9·0034 승계) 착지를 반영해 후보 2의 supersede 대상도
  UI-3pu9에서 UI-z437로 옮겼다.
- 관찰: UI-z437 — `wait-judgment.js`의 `external_job` 행을 재정의한다. 이 스펙은 그 행을
  건드리지 않으며 4행 표는 z437 행과 나란히 선다.
- 관찰: UI-pw2g — 대기 행 줄 배치. 슬롯은 그 설계를 따르고 이 스펙은 라벨 어휘만 바꾼다.
- 관찰: dotfiles main의 기존 빨간 테스트(배포 잠금·셸 런타임 검증기·Beads 규칙 문구 등)와
  `known-baselines.yaml` 등록 — dotfiles 운영 항목이며 이 설계의 전제가 아니다.
- 관찰: dotfiles 배포 전환 스크립트의 `bead-job-monitor` 잔재 호출 — dotfiles 운영 항목.

## 결정 (ADR 후보)

- 전제: ADR 0012 — dotfiles 계약의 확인된 필드만 소비하고 부재 시 표시를 생략한다. 복구
  정책 표는 바꾸지 않고 분류 순서만 이 저장소가 정한다.
- 전제: ADR 0027 — 판정·알림·자동 처분 이력은 bead별 `events.jsonl`에 남기고 `queue.json`
  에는 중복 억제 키 상태만 둔다.
- 전제: ADR 0036 — 파킹의 출구는 문의 세션뿐이다. 이 스펙은 복구 대기를 같은 출구에
  붙이고 파킹 규칙은 그대로 둔다.
- 전제: ADR 0040 — 머지 게이트 위조 3종은 terminal `needs_human`이다. 유지한다.
- 전제: ADR UI-3vvi-2 — 머지 후 결함은 수정 Bead로 자동 인계한다. 인계·원장·예약은
  유지하고, "terminal 기록 시 자동 알림"을 승계한 조항 가운데 정리 단계 알림만 후보 3이
  뒤집는다.
- 전제: ADR UI-g0lk — 머지 전 검증 실패는 비종단 holding이다. 그 보류·출구·알림은 유지하고,
  "`verify_cmd_failed → verify_red` terminal은 유지한다" 조항만 후보 3이 뒤집는다.
- 전제: ADR UI-lmqu-2 — `base_moved`는 보존 세션 이어하기다. 재개 경로는 유지하고,
  "별도 사다리·재시도 예산·자동 재디스패치 없음" 조항만 후보 2가 뒤집는다.
- 전제: ADR UI-inge(UI-1l3a 승계) — 공급자 게이트 판정은 서버가 러너 무관 사다리로 내리고
  `provider_gate` admission 기록으로 공개하며, 보류 해제는 프로브만이 판정하고, 인증 실패는
  계정 단위 공급자 보류다. 공급자 보류 행과 그 판정은 바꾸지 않는다. 이 ADR이
  UI-1l3a·UI-a8rq에서 승계한 "큐 정지 권한은 `verify_red`와 기존 systemic 원인에만 남고
  `▶ 재개`는 체계적 정지의 사람 승인이다" 조항만 후보 1이 뒤집는다.
- 후보 1: 가드는 실행 전 거부와 사후 착지 감지로만 강제하고 세션을 죽이거나 큐를 세우지
  않는다.
  - 되돌리기 어려움: 있음 — `loud_fail_blocker`의 systemic 의미, `GUARD_EFFECTS`의 kill,
    `queue_hold systemic`이 함께 사라지고 저장된 보류가 env로 이행된다.
  - 맥락 없이 놀라움: 있음 — `gh pr merge`를 친 세션이 죽지 않고 거부 문장을 보고 계속
    돌며, 큐를 세우는 자동 경로가 코드에 없다.
  - 실제 트레이드오프: 있음 — 예방층을 우회한 push를 사후에만 알게 되는 대신, 30일간
    0건이던 실제 훼손을 이유로 8건의 세션 kill과 2건의 큐 정지를 없앤다.
  - `summary`: "Worker 가드는 Claude·Codex 세션의 실행 전 거부 훅과 pre-push 예방, 사후
    base 착지 감지로만 강제하며 텍스트 판정으로 세션을 죽이지 않고, 큐 단위 보류는
    어떤 종류도 만들지 않으며, 뚫린 착지는 그 Bead의 개별 실패다" → ADR, supersede 0007 · UI-inge
- 후보 2: 사람 결정이 필요한 곳에서만 멈춘다 — 대기 어휘 4종, 알 수 없는 실패는 같은
  세션 재시도 사다리 뒤 실패 타일, 복구 대기의 출구는 문의 세션, 잔재는 자동 처분.
  - 되돌리기 어려움: 있음 — `WaitKind`·verdict 코드·WS op·admission 기록이 사라지고,
    `waiting` 대신 `failed`로 끝나는 계보와 자동 백업이 durable 기록에 남는다.
  - 맥락 없이 놀라움: 있음 — 원인 모를 종료가 사람 확인 없이 세 번 재개되고, 남은
    커밋이 사람 질문 없이 이어지거나 백업된다.
  - 실제 트레이드오프: 있음 — 세션 비용(재개 3회·문의 세션)과 자동 처분의 판단 위험을
    지고, 30일 9건 중 6건이던 하네스 결함성 정지를 없앤다.
  - `summary`: "Worker 대기 어휘는 선행 대기·공급자 보류·재시도 대기·세션이 멈춤 넷이고,
    정책이 unclassified를 주는 종료는 같은 세션 재시도 사다리를 탄 뒤 실패 타일이 되며,
    세션이 선언한 복구 대기와 base 반복 이동의 출구는 파킹과 같은 문의 세션이고,
    base_moved는 보존 세션을 자동 재개하며, 잔재 워크트리는 이어가기·백업 후 새로
    시작으로 자동 처분한다" → ADR, supersede UI-3vvi · UI-z437 · 0038 · UI-lmqu-2
- 후보 3: 머지 게이트의 `verify_cmd` red와 머지 후 정리 실패는 종단·알림 없이 그 Bead에
  머문다.
  - 되돌리기 어려움: 있음 — `verify_red` terminal 가족과 정리 단계 Discord 알림 경로가
    사라지고, `verify_hold`의 사유 코드 집합이 넓어진다.
  - 맥락 없이 놀라움: 있음 — 검증 명령이 빨간데 큐가 서지 않고 알림도 g0lk 보류 1회뿐이며,
    정리가 실패해도 채널에 아무것도 오지 않는다.
  - 실제 트레이드오프: 있음 — 정리 잔재를 사람이 카드에서 발견해야 하는 대신, 30일 8건이
    전부 하네스 결함이던 거짓 경보를 없앤다.
  - `summary`: "머지 게이트 verify_cmd red는 terminal verify_red가 아니라 g0lk의
    verify_hold이고 spawn 오류·timeout만 1회 재평가를 거치며, 머지 후 정리 실패는 카드의
    정리 재시도 행에만 남고 Discord 사람 필요 알림을 보내지 않는다" → ADR, supersede UI-g0lk · UI-3vvi-2
- 완료 정리의 `expected_head`를 머지 op head로 고정하는 것 — 되돌리기 어려움: 낮음 /
  맥락 없이 놀라움: 없음 / 실제 트레이드오프: 없음. → ADR 아님
