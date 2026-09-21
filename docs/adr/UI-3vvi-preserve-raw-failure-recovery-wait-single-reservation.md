---
id: UI-3vvi
title: Worker는 원시 실패를 보존하면서 정본 복구 분류와 동일 계보의 단일 예약으로 미완료 단계만 수정·대기·재개한다
status: superseded
superseded_by: UI-a5l2-2
date: 2026-09-16
summary: "Worker는 원시 실패를 보존하면서 정본 복구 분류와 동일 계보의 단일 예약으로 미완료 단계만 수정·대기·재개한다"
spec: docs/superpowers/specs/2026-09-15-worker-recovery-continuation-design.md
bead: UI-3vvi
---

# Worker는 원시 실패를 보존하면서 정본 복구 분류와 동일 계보의 단일 예약으로 미완료 단계만 수정·대기·재개한다

## Context

정본 계약의 대응 결정은 dotfiles-9z2u가 `workflow-state.yaml`의 `work_recovery`로
게시한 `generated/contracts/work-recovery-policy.json` schema 1이다. 이 결정은 그
계약을 소비하는 beads-ui Worker의 종료 판정·재개·표시 구현을 기록한다.

2026-09-15 전 저장소 실패 감사에서 두 사례가 같은 결함을 드러냈다. dotfiles-oeo1은
Codex의 구조화 `error`·`turn.failed` 레코드에 실린 평문 “You've hit your usage
limit.” 안내를 공급자 분류기가 놓쳐 `session_failed`로 종단됐고, 검증된 구현 후보와
중단된 리뷰가 실패 행 뒤에 묻혔다. Analysis-hkit는 고칠 수 있는 형식 오류에서 세션이
끝났고 그 종료가 곧 작업 실패로 읽혔다. 두 경우 모두 프로세스 종료·명령 실패라는
사실과 이슈의 최종 결과가 한 값(`failed`)으로 뭉쳐 있었다.

되돌리기 어려움: 큐 계보·재개 예약·재시작 fence·실패 필터가 같은 결과 의미를 읽는다.
맥락 없이 의외: raw failed 이력이 있어도 현재 작업은 재개 가능한 대기다. 실제 절충:
단순 종단 대신 종료·효과·승인·단일 예약을 확인하는 비용을 들여 중복 실행을 막는다.
세 조건이 모두 성립한다.

## Decision

1. **계약은 핀된 사본으로 소비한다.** `generated/contracts/work-recovery-policy.json`을
   dotfiles 원본과 바이트 동일하게 핀하고 provenance(source commit·blob·SHA-256·bytes)로
   검증한다. schema가 1이 아니거나 provenance·구조가 맞지 않으면 `supported:false`이며,
   그때는 기존 실패 분류가 그대로 동작하고 새 자동 동작은 보류된다. disposition·wait
   reason·분류 키는 계약이 정의하고 이 저장소는 다른 뜻으로 재정의하지 않는다.
2. **미완료 종료는 실패가 아니라 분류된 대기다.** 결과 줄 없는 exit 0 종료, `실패 ·`
   줄, env 패턴이 없는 `환경 ·` 줄, 일반 세션 오류, guard 차단(`loud_fail_blocker`),
   env 재시도 사다리 소진은 정본 분류 키(`finished_without_result_line`,
   `past_failure_line`, `environment_line`, `unknown_error`, `authority_required`,
   `transient_retry_exhausted`)로 `status:'waiting'`이 된다. 원래 `cause` 토큰, summary,
   env 패턴, guard 세부는 그대로 남고 `cause_detail.recovery`에
   `{classification, disposition, reason, policy_schema}`만 더한다. `attempt_failed`
   이벤트·실패 알림·실패 댓글은 내지 않으며 타임라인 종료 요약은
   `대기 · recovery:<reason> — <cause>`다. env 패턴이 있는 오류는 기존 재시도 사다리를
   그대로 타고, 파킹·선행 대기·기준 이동·착지 관측·정리 실패·base 착지 감지 등 다른
   결말은 바뀌지 않는다.
3. **세션은 대기 의도를 선언할 수 있다.** 결과 줄 `대기 · recovery:<reason>`은 계약의
   wait reason과 `reconcile`만 허용하고 알 수 없는 토큰은 `unclassified`로 보존한다.
   이 줄은 대기 의도일 뿐 승인·종료·효과·재개 자격을 입증하지 않는다. 준비 env
   `BDUI_WORK_RECOVERY_SCHEMA=1`과 preamble의 여섯째 결과 줄은 핀된 계약이 검증된
   구현·quick_fix 세션에만 전달되고, 리뷰·처분 세션과 기존 실행 환경에는 주입하지
   않는다. 구 문구(`환경 ·`, `실패 ·`, blocks, base_moved)는 계속 읽는다.
4. **실제 usage-limit는 구조화 증거로만 보류가 된다.** “You've hit your usage limit.”로
   시작하는 top-level `error`·`turn.failed.error.message`는 계정 `usage_limit` 보류이며
   `resets_at`은 시각 문구에서 추정하지 않고 null로 두어 기존 프로브가 해제를 판정한다.
   agent_message 인용·stderr·“Failed to fetch workspace credits.”는 증거가 아니다.
5. **복구 대기 행은 새 writer를 만들지 않는다.** 재개 fence는 복구 대기를 실패 행과
   같이 막아 큐가 새 attempt를 자동 디스패치하지 않는다. 재개는 기존 `resume` 경로로
   기록된 runner·model·effort·speed·세션을 보존해 이어가며, 새 자동 재개 트리거를
   추가하지 않는다. 같은 계보에서 같은 원인·분류·summary의 종료가 두 번 반복되면
   `no_progress`로 승격해 공급자 자동 재개를 거부하고 사람의 결정(수동 이어하기·폐기)만
   남긴다. 자동 fatal 목록은 비어 있으며 모델의 실패 주장·retry 소진·PR 부재만으로
   최종 실패를 만들지 않는다.
6. **표시는 기존 슬롯에서 대기로 읽힌다.** 복구 대기는 실패 투영·실패 집계 없이 held
   배지 슬롯의 `⏳ 조건 대기`/`⏳ 확인 대기`로 그리고, 공용 wait_reasons 모델의
   `recovery` kind와 `recovery_confirm` 판정으로 Worker·Monitor가 같은 문장을 읽는다.
   기록된 세션이 있으면 기존 `↻ 이어하기`, 없으면 불가 사유를 숨기지 않는다. 복구
   대기에서 재개된 실행은 `복구 중`으로 읽힌다.

## Considered Options

- **표시 문구만 대기로 바꾼다.** 화면은 정직해지지만 scheduler는 여전히 종단하고
  재개 fence·계보가 실패 의미를 유지해 작업이 실제로 멈춘 채 남는다. 기각.
- **모든 종료를 새 attempt로 재실행한다.** 중복 writer·배포·외부 잡을 만들고 재시도
  예산을 초기화해 무진전 반복을 감지할 수 없다. 기각.
- **별도 recovery 상태 기계·Beads status·승인 metadata를 도입한다.** 기존
  `resumed_from`·`retry`·provider hold·`cause_detail`로 표현 가능한 사실을 두 곳에
  복제해 재시작 호환과 정본 소유(ADR 0012)를 깨뜨린다. 기각.

## Consequences

- 쉬워지는 것: 사용량 제한·형식 오류·결과 줄 누락으로 끝난 세션의 검증된 후보와
  리뷰 문맥이 보존되고, 사람은 원인과 다음 조건을 읽은 뒤 같은 단계에서 이어간다.
- 어려워지는 것: 종료 결말을 새로 쓰는 코드는 `failed`가 아니라 정본 분류 키를 먼저
  물어야 하고, `waiting` 행을 다루는 코드는 `cause_detail.recovery`의 존재로 선행
  대기·기준 이동과 구분해야 한다. 계약 재핀은 provenance 테스트가 강제한다.
- 배제되는 것: 자동 fatal 분류, 결과 줄만으로 재개 자격 부여, 준비 env로 승인·리뷰·
  예산을 바꾸는 것, 공급자·모델 자동 전환(ADR 0046·0052 유지), 영수증 위조·폐기·
  사용자 결정 대기의 사람 전용 출구 변경(ADR 0036·0040 유지).
