---
id: UI-a5l2-2
title: 사람 결정이 필요한 곳에서만 멈춘다 — 대기 어휘 4종, 알 수 없는 실패는 같은 세션 재시도 사다리 뒤 실패 타일, 복구 대기의 출구는 문의 세션, 잔재는 자동 처분
status: accepted
date: 2026-09-21
summary: "Worker 대기 어휘는 선행 대기·공급자 보류·재시도 대기·세션이 멈춤 넷이고, 정책이 unclassified를 주는 종료는 같은 세션 재시도 사다리를 탄 뒤 실패 타일이 되며, 세션이 선언한 복구 대기와 base 반복 이동의 출구는 파킹과 같은 문의 세션이고, base_moved는 보존 세션을 자동 재개하며, 잔재 워크트리는 이어가기·백업 후 새로 시작으로 자동 처분한다"
supersedes: ["UI-3vvi", "UI-z437", 38, "UI-lmqu-2"]
spec: docs/superpowers/specs/2026-09-21-worker-wait-guard-simplification-design.md
bead: UI-a5l2
---

# 사람 결정이 필요한 곳에서만 멈춘다 — 대기 어휘 4종, 알 수 없는 실패는 같은 세션 재시도 사다리 뒤 실패 타일, 복구 대기의 출구는 문의 세션, 잔재는 자동 처분

## Context

30일 실측(스펙 §1)에서 `⛔ 확인 대기 · 조치 필요`(recovery `unclassified`) 3건은 전부
토큰 갱신 창의 일시 인증 실패였고 재시도면 됐다. `조건 대기` 5건 중 사람 답이 필요한
것은 세션 규칙의 결과였다. `처분 대기`(stale_work) 1건은 세션 takeover 뒤 남은 브랜치
였고 이어갈 수 있는 것이었다. 사람이 결정해야 했던 정지는 9건 중 3건이었다. 사용자
결정(2026-09-21): 대기 어휘는 넷이다; 세션이 스스로 멈추면 파킹과 같은 출구(문의 세션
자동 기동)로 통일한다; 잔재는 이어갈 수 있으면 자동으로 이어가고 아니면 자동 백업 뒤
새로 시작하며 사람에게 묻지 않는다.

ADR UI-3vvi는 정책 `unclassified` 종료를 `waiting`으로 보존하고 `↻ 이어하기`를 두었고,
ADR UI-z437은 UI-8gem·UI-lmqu에서 배지 종류 순서(`stale_work`·`base_moved` 포함)와
"기준 이동 대기는 `↻ 이어하기`만 재개한다"를 승계했으며, ADR 0038은 처분 대기 admission이
화면 대표를 정한다고, ADR UI-lmqu-2는 base_moved에 "별도 사다리·재시도 예산·자동
재디스패치 없음"을 정했다. 넷 다 이 결정과 어긋나는 조항을 담으므로 이 ADR이 승계한다.

## Decision

**Worker는 사람 결정이 필요한 곳에서만 멈춘다.**

1. **대기 어휘는 넷이다.** `선행 대기 ⛓`(`prerequisite`·`prerequisite_foreign`; 선행이
   `blocked`·`deferred`·worker-ineligible이면 `action_required`), `공급자 보류 ⏳`
   (`provider_hold`; UI-inge·보류 해제 설계의 현행 판정 그대로), `재시도 대기 ↻`
   (`retry_wait`; 예약 + `grace_ms` 경과면 `overdue`), `세션이 멈춤 ⏸`(`awaiting_user`와
   `recovery`; 항상 `action_required`·코드 `decision`). `external_job` 행은 UI-z437 그대로
   나란히 선다. 판정은 `normal`·`overdue`·`action_required`이고 `overdue`는 다음 확인
   시각이 있는 종류(공급자 보류·재시도 대기·외부 작업)에만 난다. `세션이 멈춤` 카드
   본문(슬롯 3)은 세션이 남긴 문장 한 줄이며, `조건 대기`·`확인 대기`·`반영 대기`·
   `처분 대기`·`정지`·`환경 보류` 라벨과 `stale_work`·`base_moved`·`queue_hold` 종류,
   verdict `disposition`·`hold`·`recovery_confirm`·`settle_overdue`(recovery)는 없다. 대표
   사유 순서는 `awaiting_user`/`recovery` > `provider_hold` > `prerequisite_foreign` >
   `prerequisite` > `retry_wait`다.
2. **알 수 없는 실패는 같은 세션 재시도 사다리를 탄 뒤 실패 타일이 된다.** 정본 복구
   정책 키 `finished_without_result_line`·`past_failure_line`·`environment_line`·
   `unknown_error`로 `unclassified`가 되는 종료와 `session_failed:turn_failed`는 `env`
   티어다 — env 패턴이 맞으면 그 그룹, 아니면 그룹 `unknown`. 재시도는 실패 attempt에
   이 호스트의 세션 기록이 있으면 같은 세션·러너·모델·effort·계정을 `resume`하고,
   없으면 같은 실행 설정을 승계한 새 `dispatch`다(보존 커밋 유무는 조건이 아니다).
   사다리(2·5·15분, 3회)를 다 쓰면 attempt는 `failed`, 카드는 실패 타일(`↻`·`폐기`),
   `❌ 실패` 알림 1회, Bead는 `open`이다. `transient_retry_exhausted → wait`는 없다.
   예산은 리셋되지 않고 사람의 `↻`는 같은 계보의 수동 재개다. 저장된 정책 분류
   `waiting/unclassified` 기록은 로드 시 `failed`(`retry.migrated:'unclassified_wait'`)로
   이행하고 알림·자동 재개는 없다.
3. **세션이 선언한 복구 대기의 출구는 문의 세션이다.** 결과 줄 `대기 · recovery:<reason>`
   은 계속 읽고, `authority`·`verification`·`no_progress`·`reconcile`, 세션이 선언한
   `unclassified`(`session_recovery_wait`), `blocks` 목록이 비어 있는 `prerequisite` —
   하나의 술어 `isSessionStalledRecovery`가 판정과 기동을 공유한다 — 는 `waiting` 기록
   직후 파킹과 같은 게이트(`worker_direction_inquiry.enabled`·tmux·Bead당 1개)로 문의
   세션을 띄운다. 프롬프트는 dotfiles `execution-common.md` Direction inquiry 절의
   `recovery` 블록 바이트 복사이고 다이제스트를 고정한다. 카드 조작은 `[세션에서 해결]`·
   `폐기`이며 recovery 타일의 `↻ 이어하기`는 없다(원인 확인 없는 맹목 재개를 두지 않는다는
   UI-3vvi의 취지 유지). 알림은 `waitActionRequired` 1회에 문의 세션 결과 한 줄을 붙인다.
   `provider`·`credential`은 공급자 보류의 현행 경로, `prerequisite`는 `blocks` 목록이
   있으면 선행 대기다.
4. **`base_moved`는 보존 세션을 자동 재개한다.** 기록 직후 env 사다리와 같은 지연(2분)으로
   같은 세션을 재개하고(방아쇠만 자동), 같은 계보에서 세 번 반복되면 `세션이 멈춤`
   (`reason: no_progress`, `base가 반복 이동함 · 후보 <sha7>`)이다.
5. **잔재는 자동 처분한다.** 디스패치가 `worktree_stale_work` admission을 기록하던 자리에서
   `disposeStaleResidue`가 검증된 잔재 identity(`identity`·`state`·`cause`·capability
   플래그)로 순서대로 처분한다: `can_resume` → 같은 세션 `resume`; `can_continue` → 잔재
   워크트리·브랜치를 새 attempt의 작업 공간으로 `dispatch`(커밋 보존); `can_backup_fresh` →
   `backupFreshResidue(identity)`로 `discard-backups`에 보관 뒤 같은 tick에서 새 attempt
   (백업이 `identity_changed`면 재관측 뒤 재판정); 그 밖은 재관측 1회 뒤 `failed`·
   `stale_work_unresolved`(개별 실패 타일). 다른 소유자의 PR·원격 브랜치가 확인된 잔재는
   `preserve:true`로 재관측해 자동 정리하지 않는다. timeline `stale_work_auto`만 남기고
   알림은 없다. WS op `worker-stale-work-*`, admission `worktree_stale_work`, `staleWorkAction`
   의 admission·`action_id`·revision 검사는 없고 로드 시 남은 admission은 지운다.

### ADR UI-3vvi에서 승계하는 조항

계약은 핀된 사본 `generated/contracts/work-recovery-policy.json`으로 소비하고 provenance로
검증하며 `supported:false`면 새 자동 동작을 보류한다; disposition·wait reason·분류 키는
계약이 정의하고 이 저장소가 재정의하지 않는다(분류 순서 — `unclassified`를 주는 키를
정책 조회 뒤 env 티어로 보내는 것 — 만 이 저장소가 정한다). 세션이 선언한 대기 줄은
계약의 wait reason과 `reconcile`만 허용하고 대기 의도일 뿐 승인·종료·효과·재개 자격을
입증하지 않으며, `BDUI_WORK_RECOVERY_SCHEMA=1`과 preamble 결과 줄은 검증된 구현·
quick_fix 세션에만 전달된다. 실제 usage-limit는 구조화 증거로만 보류가 된다. 재개
fence는 복구 대기를 실패 행과 같이 막아 새 attempt를 자동 디스패치하지 않고, 재개는
기록된 runner·model·effort·speed·세션을 보존하며, 같은 계보의 같은 원인 반복은
`no_progress`로 승격한다. 자동 fatal 목록은 비어 있으며 모델의 실패 주장·retry 소진·PR
부재만으로 최종 실패를 만들지 않는다. 뒤집는 것은 2항(정책 `unclassified` 네 키와 guard
차단·사다리 소진을 `waiting`으로 보존)과 6항(`⏳ 조건 대기`/`⏳ 확인 대기`·
`recovery_confirm`·`↻ 이어하기`)이다.

### ADR UI-z437에서 승계하는 조항

외부 작업 대기의 결정 전부 — 소비자 Bead 자신의 `external_wait` 상태, Worker 한 런타임의
관찰·완료·알림·재개 소유, hold 예산 판정, `대기 · external:<wait_id>` 종결, 보존 세션의
fork 재개와 `[이어하기]`·`[새 세션으로]`, 소비자 카드 표면, 0034에서 승계한 이벤트 구독
복귀·admission 진단 기록·재스캔 후보(`external_job` 제외)·foreign 트리거 매칭, UI-3pu9에서
승계한 자동 진행 꺼짐 무표시·`manual_only`·`[지금 시작]` 게이트 조건·직렬 레인 선두
규칙·연결 레인 폐기·`waiting`의 기계 사실 대기 의미·`external_wait` 외 새 상태 금지·
`prerequisite_unmet` 증명·화면 대표는 "무엇을 기다리나"가 정하고 `복귀 대기` 배지는 두지
않음 — 는 그대로다. 뒤집는 것은 UI-8gem 승계 조항의 종류 라벨·순서 목록(`반영 대기`·
`처분 대기`·`한도 대기`·`공급자 장애`와 `stale_work`·`base_moved`의 자리)과 "큐 단위
사유는 슬롯 4a 게이트 칩 하나로만 선다"의 큐 보류 부분(공급자 게이트 칩은 남는다),
그리고 UI-lmqu 승계 조항의 "기준 이동 대기는 자동 새 구현을 막고 `↻ 이어하기`만 기록된
세션을 재개한다 · 카드는 슬롯 1 `반영 대기`와 `↻ 이어하기`다"이다. `막힘 N`은 이슈 단위
사유가 하나라도 있는 원래 이슈 수이고 새 대기 종류는 어휘 표에 행을 더한다는 규칙은
유지한다.

### ADR 0038에 대해

처분 대기 admission이 사라지므로 "admission이 화면 대표를 정하고 stale-work 처분 조작은
대기 행에만 산다"는 결정 전체를 뒤집는다. 강등 없이 attempt의 생사와 레인 점유가 대표를
정한다는 원래 규칙으로 돌아간다.

### ADR UI-lmqu-2에서 승계하는 조항

재개 종류는 `resumeKindOf(quickfix_landing)`이 사유 문자열로 정하고 `session` 목록에
`base_moved`가 있다; 기계 정산은 같은 attempt의 착지 후 단계 재실행이며 버튼은
`↻ 정리 재시도`, 세션 실행은 `↻ 이어하기`다; `settlement`의 세션 참조 면제와
`bd_read_failed` 기록, 폐기의 `parent_reset` 파괴성 경계, 기존 재개 이벤트·조작 클래스·
슬롯은 유지한다. 뒤집는 것은 base_moved에 대한 "별도 사다리·재시도 예산·자동 재디스패치
없음"과 사람 클릭 방아쇠다 — 재개 경로는 같고 방아쇠가 자동이며 세 번 반복은 `세션이
멈춤`이다.

기각한 대안: 라벨만 넷으로 접고 판정·조작은 그대로(카드에 `↻ 이어하기`가 남아 원인 확인
없는 재개와 사람 확인 대기가 함께 남는다); 미분류 실패를 즉시 실패 타일로(일시 인증
실패 3건이 전부 사람 클릭을 요구한다); 잔재를 항상 백업 뒤 새로 시작(이어갈 수 있는
세션·커밋을 버린다).

## Consequences

- 되돌리기 어렵다: `WaitKind`·verdict 코드·WS op·admission 기록이 사라지고, `waiting`
  대신 `failed`로 끝나는 계보와 자동 백업이 durable 기록에 남는다.
- 맥락 없이는 놀랍다: 원인 모를 종료가 사람 확인 없이 세 번 재개되고, 남은 커밋이 사람
  질문 없이 이어지거나 백업된다.
- 트레이드오프: 세션 비용(재개 3회·문의 세션)과 자동 처분의 판단 위험을 지고, 30일 9건
  중 6건이던 하네스 결함성 정지를 없앤다.
- 문의 세션은 tmux·브리지가 있는 호스트에서만 뜨고, 없으면 알림에 `질의 세션:
  not_launched · <사유>`가 붙고 `[세션에서 해결]` 클릭이 재시도다.
