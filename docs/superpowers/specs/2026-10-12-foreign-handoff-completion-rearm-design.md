---
scope:
  - server/worker/completion-intent.js
  - server/worker/queue-store.js
  - server/worker/auto-merge.js
  - server/worker/foreign-handoff.js
  - server/worker/pr-actions.js
---

# 완료 처리 중 생긴 외부 PR 사람 처리 필요를 자기 분류로 기록하고, 원인이 풀리면 자동 머지가 다시 건다

Bead: UI-gsba · route: spec_backed · 작성 2026-10-12 · pinned base
`d70992e92424598170ea5cd33fab93eac1cedb38` · 출처: UI-k467(구현 리뷰 r1 지적 1 수리 중 잔여)

## 1. 목표

- 자동 머지가 진행하던 완료 처리(completion intent)가 외부 PR 관문에서 `foreign_handoff`
  원인을 만나 멈추면, 종료 사유가 `foreign_handoff:<원인>`으로 기록된다. 지금처럼
  `internal_record_failed:foreign_handoff:<원인>`으로 접히지 않는다.
- 그 원인이 충돌(`foreign_conflict_needs_human`)이나 base 불일치(`foreign_pr_base_mismatch`)이고
  사람이 고쳐서 원인이 사라지면, 다음 자동 등록 턴이 클릭 없이 머지를 다시 건다
  (UI-k467 스펙 §4-7 「클릭 없이 다음 관측 턴에 풀린다」를 등록 뒤 경합에서도 충족).
- 머지 뒤 `foreign_deploy_unsupported`로 멈춘 경우에도 알림은 「외부 PR 사람 처리 필요」
  한 번뿐이다. 「배포 실패」 알림과 `[워커로 이어가기]` 안내가 함께 나가지 않는다.

사용자 결정(2026-10-12, 이 세션):
- 종단 후 자동 재등록 방식으로 한다. 보류로 큐 자리를 유지하는 방식(대안)은 순차
  드라이버에 건너뛰기 규칙을 새로 넣어야 해서 택하지 않는다.
- 머지 뒤 deploy 원인의 이중 알림도 같은 원인(완료 처리가 `foreign_handoff`를 자기
  분류로 모름)에서 나온 결함이라 이 Bead에서 함께 고친다.

## 2. 검증된 전제

- 머지 전 외부 관문은 원인을 `foreign_handoff:<원인>` 사유로 돌려준다 — server/worker/pr-actions.js:1217, 1636-1639
- 관문 거절은 `undecidable` 사실이 되고, 완료 처리는 그 사유 그대로 비종단 `needs_human`을 낸다 — server/worker/completion-intent.js:1900-1906, 554-558
- 종료 사유 접기는 family 목록 첫 토큰으로 판정하고, 목록에 없는 사유는 `internal_record_failed:`로 접는다. 목록은 6종이고 `foreign_handoff`는 없다 — server/worker/completion-intent.js:64-75, 120-147
- family 목록은 UI-5ym8 스펙 §7이 정한 닫힌 목록이고 테스트가 정확히 고정한다. 목록을 기록한 ADR은 없다(0040은 history) — docs/superpowers/specs/2026-08-28-worker-failure-tiers-queue-hold-design.md:219-234, server/worker/completion-intent.test.js:3289-3299, `grep -l 5ym8 docs/adr/*.md` 결과 없음
- 종단 기록은 `phase=needs_human`으로 바꾸고 머지 큐에서 행을 뺀다. `pr_wait` 행은 남는다 — server/worker/queue-store.js:12783-12800
- 자동 등록은 기존 intent가 `needs_human`이면 건너뛴다 — server/worker/queue-store.js:12968-12979
- `[머지]` 수동 등록은 `needs_human` intent를 `resumed_terminal` 기록, `gating`(머지 전)·`cleaning`(머지 뒤) 단계, `terminal_reason=null`로 되살리고 `auto_merge_skips`를 지운다 — server/worker/queue-store.js:11714-11726, 11737-11738
- 자동 등록 후보 판정은 `foreign_handoff`를 보지 않는다. 충돌인 비외부 행은 관문이 닫혀도 후보이고, base 불일치는 관문이 열려 있으면 후보다 — server/worker/merge-candidates.js:218, 264, 279-285, server/worker/merge-gate.js:352
- PR 관측은 매 턴 `foreign.handoff`를 비우고 다시 판정한다 — server/worker/pr-poller.js:683, 813-821
- 자동 머지가 꺼진 순차 드라이버는 같은 원인을 큐 자리를 지키는 보류로 다루고 다음 드레인에서 다시 판정한다 — server/worker/merge-queue.js:946-961, 2246-2250
- 카드의 「외부 PR 사람 처리 필요」 배지·원인 문장은 PR 관측의 `foreign.handoff`나 정리 기록 `cleanup_failed.reason`에서 온다. 완료 처리 종료 사유에서 오지 않는다 — app/views/worker/pr-wait-row.js:977-982
- 외부 PR 행의 `[머지]`는 관측이나 정리 기록에 원인이 있으면 비활성이고, PR 관측은 머지 뒤 정리 기록을 지우지 않는다 — app/views/worker/pr-wait-row.js:1446-1450, server/worker/pr-poller.js:713-741
- 해결 대화의 실패 맥락은 머지 뒤 원인을 정리 기록에서 먼저 읽고, 완료 로그 경로는 종료 사유의 `log_path`·정리 기록·관측만 읽는다(사유 문자열을 해석하지 않는다) — server/worker/resolve-session.js:283-300, server/worker/completion-log-path.js:99-124
- 외부 PR 완료 관문은 호출마다 PR을 새로 관측하고, 관문 통과 시 완료 처리가 관측한 subject를 기록한다 — server/worker/pr-actions.js:1162-1166, 1632-1639, server/worker/completion-intent.js:2481-2497
- 완료 처리 알림 클래스 맵의 `foreign_handoff` 항목은 완료 처리 안에서 그 stage로 종료 기록을 만드는 곳이 없다(종료 stage는 관문 거절의 `coordinator`, 정리 실패의 `repo_operations`) — server/worker/completion-intent.js:853, 870, 2645-2686
- 외부 PR 알림 담당(announcer)은 (원인, identity)마다 타임라인 기록을 한 번 남기고 해결 대화 기동과 「외부 PR 사람 처리 필요」 푸시를 보낸다 — server/worker/foreign-handoff.js:86-140
- 머지 뒤 deploy 원인은 `cleanup_failed`에 `foreign_handoff:foreign_deploy_unsupported`로 기록된 뒤 announcer가 알린다 — server/worker/pr-actions.js:3368-3384
- 완료 처리의 `needs_human` 푸시는 종료 기록의 stage로 클래스를 고른다. 머지 전 경로의 stage `coordinator`는 클래스 맵에 없어 푸시가 없고, 머지 뒤 경로의 stage `repo_operations`는 「배포 실패」와 `[워커로 이어가기]` 안내로 나간다. 그래서 머지 뒤에는 푸시가 두 번 간다 — server/worker/completion-intent.js:843-854, 1648-1680
- 계약은 `foreign_handoff`의 출구를 원인별로 정한다. 충돌은 PR head 푸시로, base 불일치는 PR base나 핀 수정으로 다음 턴에 풀리고, deploy는 세션에서만 풀린다. `[머지]`는 풀지 못한다 — dotfiles docs/contracts/workflow-state.yaml:850-861

## 3. 설계

### 3.1 종료 사유 분류

- `foreign_handoff`를 완료 처리 `needs_human`의 일곱째 family로 더한다. UI-5ym8 §7 표에
  행 하나를 더하는 것이고 나머지 여섯은 그대로다.
- 사유 안 어디에 `foreign_handoff:<원인>`이 들어 있든(맨 앞이든 `cleanup_failed:` 뒤든)
  접기 결과는 `foreign_handoff:<원인>`이다. 원인은 계약의 세 토큰만 인정한다. 그 밖의
  꼬리는 지금 규칙대로 접는다.
- 접기의 멱등성은 유지한다. 이미 `foreign_handoff:<원인>`인 사유는 그대로 돌아온다.
- 결정: 머지 뒤 deploy 원인도 이 family로 기록한다(대안: `cleanup_failed:` 접두를 유지하고
  알림만 따로 끄기; 이유: 알림 억제와 재등록이 같은 판정 하나를 쓰고, 계약상 같은 분류다).
  카드 배지와 해결 대화 맥락은 정리 기록과 관측을 읽으므로 이 변경으로 움직이지 않는다.
- 결정: `cleanup_failed` 정리 기록 자체(`reason`, 단계 `repo_operations`)는 바꾸지 않는다 —
  카드·해결 대화·repo-ops 로그가 그 기록을 읽는다.

### 3.2 알림 한 번

- 완료 처리의 `needs_human` 알림 경로는 접힌 사유의 family가 `foreign_handoff`이면 해결
  대화 기동과 푸시를 하지 않는다. 이 분류의 알림 소유자는 announcer 하나다.
- 종단 타임라인 기록(once-record)은 지금처럼 남긴다. 알림만 빠진다.
- 재등록 뒤 같은 원인이 같은 identity로 다시 생기면 announcer의 기록 때문에 다시 알리지
  않는다. 원인이나 identity가 달라지면(예: 다른 head에서 다시 충돌) 한 번 더 알린다.
  이것이 Bead가 물은 「알림 1회 규칙과의 관계」의 답이다.

### 3.3 자동 재등록

자동 등록 턴(`auto_merge` 켜짐)은 다음을 모두 만족하는 행의 `needs_human` intent를
`[머지]` 수동 등록과 같은 방식으로 되살리고 머지 큐에 넣는다.

1. 행이 지금처럼 자동 등록 후보이고 완료 처리 seed가 만들어진다.
2. intent의 종료 사유 원인이 `foreign_conflict_needs_human`이나 `foreign_pr_base_mismatch`다.
   `foreign_handoff:<원인>`와 이 스펙 이전 형태 `internal_record_failed:foreign_handoff:<원인>`
   둘 다 인정한다.
3. 그 행의 최신 PR 관측에 외부 PR 대상이 있고 `foreign.handoff`가 비어 있다. 관측이 없거나
   읽을 수 없으면 되살리지 않는다(fail closed).

- 결정: 조건 3은 필수다. 후보 판정이 `foreign_handoff`를 보지 않으므로(§2), 조건 3이 없으면
  원인이 남은 행이 매 턴 되살아났다가 다시 종단하는 반복이 된다.
- 결정: `foreign_deploy_unsupported`는 자동으로 되살리지 않는다. 계약상 세션에서만 풀리는
  원인이고, 출구는 `[세션에서 이어가기]`로 대상 저장소의 `pr-finish` Foreign-pinned Bead
  절차를 밟아 마감하는 것이다. 머지 뒤 deploy 원인은 정리 기록이 남아 있는 동안 `[머지]`가
  계속 비활성이므로 `[머지]` 재진입을 출구로 두지 않는다.
- 다른 family의 `needs_human`은 지금처럼 건너뛴다.
- 되살린 기록은 수동 경로와 같다. `resumed_terminal`에 직전 종료 사유와 시각이 남고,
  `auto_merge_skips` 항목도 지운다. head가 바뀐 경우(충돌을 푸시로 고침)의 처리는 수동
  `[머지]` 뒤와 같이 완료 처리 관문이 PR을 새로 읽어 판단한다.
- 되살린 뒤 관문이 같은 원인을 다시 보면 §3.1·§3.2대로 다시 종단하고 알림은 announcer
  기록이 막는다. 조건 3 때문에 이 경우는 관측과 관문 사이 경합에서만 생기고, 다음 관측이
  원인을 다시 실을 때까지 재등록하지 않는다.

### 3.4 카드

- 카드 표시 규칙은 바꾸지 않는다. 원인이 남은 동안 배지는 관측에서 오는 「외부 PR 사람
  처리 필요」이고 `[머지]`는 비활성이다. 원인이 사라지면 다음 자동 등록 턴에 intent가
  되살아나 「확인 필요」 완료 배지도 사라진다.
- `failureSentence`에 `foreign_handoff` 문장을 더하지 않는다. 카드는 외부 원인 문장을 이미
  관측·정리 기록에서 싣는다(UI-k467 §3.7).

## 4. 수용 기준

1. 자동 머지 completion 진행 중 외부 관문이 충돌이나 base 불일치를 보면 intent의 종료
   사유가 `foreign_handoff:<원인>`이다.
2. 그 뒤 PR 관측에서 원인이 사라지면 다음 자동 등록 턴에 클릭 없이 intent가 `gating`으로
   되살아나 머지 큐에 들어간다.
3. 관측에 원인이 남아 있으면 자동 등록은 되살리지 않는다.
4. `foreign_deploy_unsupported`로 끝난 intent와 다른 family의 `needs_human` intent는 자동
   등록이 되살리지 않는다.
5. 이 스펙 이전에 저장된 `internal_record_failed:foreign_handoff:<원인>` intent도 2·3대로
   처리된다.
6. 머지 뒤 deploy 원인은 「외부 PR 사람 처리 필요」 푸시 한 번만 나가고, 「배포 실패」
   푸시와 `[워커로 이어가기]` 안내가 없다.
7. 자동 머지가 꺼진 경로(순차 드라이버 보류)와 카드 표시는 바뀌지 않는다.

## 5. Test scope

- `server/worker/completion-intent.test.js`
  - family 목록이 일곱 개다(기존 「six families」 고정 테스트 갱신, 멱등 테스트에 새 family 포함).
  - `foreign_handoff:<원인>`, `cleanup_failed:foreign_handoff:<원인>`이 `foreign_handoff:<원인>`으로
    접히고, 모르는 원인 꼬리는 지금 규칙대로 접힌다.
  - 머지 전 경로: 관문이 `foreign_handoff:foreign_pr_base_mismatch`를 돌려주면 종료 사유가
    그 값이고 `needs_human` 푸시·대화 기동이 없다.
  - 머지 뒤 경로: `repo_operations` 정리 기록이 deploy 원인이면 종료 사유가
    `foreign_handoff:foreign_deploy_unsupported`이고 완료 처리 푸시가 없다.
- `server/worker/queue-store.test.js` 또는 `server/worker/auto-merge.test.js`
  - 두 원인(새 형태·이전 형태)의 `needs_human` intent가 재등록 표시와 함께 오면 수동 경로와
    같은 기록으로 되살아나고 큐에 들어간다.
  - 관측에 원인이 남은 행, deploy 원인, `verify_red` 같은 다른 family는 되살아나지 않는다.
  - 관측이 없는 행은 되살아나지 않는다.
- `server/worker/pr-actions.test.js`(또는 attach 통합): 머지 뒤 deploy 원인에서 needs_human
  푸시 호출이 announcer의 한 번뿐이다.

## 6. 경계·비목표

- 결정: 자동 머지가 꺼진 순차 드라이버의 `foreign_handoff` 보류는 바꾸지 않는다 — 이미
  큐 자리를 지키며 매 드레인 다시 판정한다.
- 결정: dotfiles 계약은 바꾸지 않는다 — `failure_classes.foreign_handoff`의 출구 정의를
  그대로 구현하는 것이다(ADR UI-u6ud-2, 소비자).
- 결정: 이미 남은 `needs_human` intent를 일괄 고쳐 쓰는 마이그레이션은 두지 않는다 —
  §3.3 조건 2가 이전 형태를 읽는다.
- 관찰: `NEEDS_HUMAN_FAMILIES` 주석이 「five causes」라고 적혀 있으나 이미 여섯이다. 이 변경에서
  주석을 일곱에 맞춘다.
- 관찰: `NEEDS_HUMAN_NOTIFY_CLASSES`의 `foreign_handoff` stage 항목은 완료 처리에 생산자가
  없다. §3.2 뒤에도 쓰이지 않으면 구현에서 지우거나 남기는 판단은 구현 리뷰에 맡긴다.

## 결정 (ADR 후보)

- 전제: ADR UI-c74x — 외부 PR 사람 처리 필요 행은 `[머지]`로 풀리지 않고 사람의 출구는
  `[세션에서 이어가기]`다. 원인이 사라져 자동으로 다시 거는 것은 계약의 `clears_next_turn`
  출구이고 사람의 조작이 아니므로 이 조항과 충돌하지 않는다. 알림은 「🙋 확인 필요 · 외부
  PR 사람 처리 필요」 하나로 둔다.
- 전제: ADR UI-ny0h — 단일 순차 큐와 `auto_merge` 스위치가 자동 등록을 소유한다. 재등록은
  그 자동 등록 안에서 일어난다.
- 전제: ADR UI-u6ud-2 — 계약 `failure_classes.foreign_handoff`를 소비한다.
- `foreign_handoff`를 완료 처리 `needs_human` family에 더한다 — 되돌리기 쉬움(접기 함수와
  목록 한 곳, 저장 형태는 문자열 사유이고 이전 형태도 읽음) → ADR 아님
- 원인이 사라진 `foreign_handoff` intent를 자동 등록이 되살린다 — 계약 출구의 구현이고
  결정 자체는 ADR dotfiles/dotfiles-8k8yf와 계약이 기록했다 → ADR 아님
- 이 분류의 알림 소유자를 announcer 하나로 둔다 — 되돌리기 쉬움(알림 경로 한 곳의 분기) → ADR 아님
