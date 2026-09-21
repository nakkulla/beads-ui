---
id: UI-3vvi-2
title: 머지 후 결함은 일반 workflow 수정 Bead로 자동 인계하되 기존 원장·원자적 예약·원본 실패 보존과 검증된 수정 성공 후 최종 정리를 유지한다
status: superseded
superseded_by: UI-a5l2-3
date: 2026-09-16
summary: "머지 후 결함은 일반 workflow 수정 Bead로 자동 인계하되 기존 원장·원자적 예약·원본 실패 보존과 검증된 수정 성공 후 최종 정리를 유지한다"
supersedes: ["UI-j9j5", 24]
spec: docs/superpowers/specs/2026-09-15-worker-recovery-continuation-design.md
bead: UI-3vvi
---

# 머지 후 결함은 일반 workflow 수정 Bead로 자동 인계하되 기존 원장·원자적 예약·원본 실패 보존과 검증된 수정 성공 후 최종 정리를 유지한다

## Context

정본 계약의 대응 결정은 dotfiles-9z2u가 `repo_operations.automation_policy`를 schema
4로 올린 `generated/contracts/repo-operation-policy.json`의
`after_ladder: preserve_failed_operation_then_classify_wait_or_workflow_repair_handoff`와
`after_ladder_recovery`다. 이 결정은 그 소비자인 beads-ui의 after-ladder 구현을
기록하며 ADR UI-j9j5와 ADR 0024를 대체한다.

ADR UI-j9j5는 post-merge 잡의 명시적 `replaces` 선언과 원자적 예약으로 원래 실패를
완료하는 승계를 정했고, ADR 0024는 사용자 개시 작업 실패의 재진입을 자동 알림 뒤
사람 클릭으로만 닫았다. 두 결정은 `script_retry` 1회 소진 뒤의 operation을 사람이
다시 누를 때까지 terminal `failed`로 두었다. 그 사이 소유 저장소 코드의 결정적 결함은
사람이 눈으로 읽고 새 Bead를 손으로 만들어야 했다.

되돌리기 어려움: 수정 Bead와 원래 operation의 연결이 원장·정리·재시작 판단에 남는다.
맥락 없이 의외: 원래 operation은 failed로 남아도 검증된 수정 성공으로 원래 작업을
마칠 수 있다. 실제 절충: 전용 수리 레인·원장 덮어쓰기 대신 일반 PR·배포·명시적 수정
선언을 통과한다. 세 조건이 모두 성립한다.

## Decision

### 바뀌는 조항

1. **원시 operation은 그대로 남고 복구 분류만 더한다.** `script_retry` 소진(또는
   부적용) 뒤 operation은 `state:'failed'`·failure·exit·log·retry·부분 효과를 그대로
   둔 채 `recovery {classification, disposition, reason, code_defect, prover, handoff}`를
   얻는다. 분류는 핀된 두 계약이 모두 검증된 경우에만 정본 키로 하고, 미지원 schema는
   `unknown_error` 대기로 보존하며 어떤 자동 인계도 시작하지 않는다.
2. **소유 코드 결함의 자동 증명은 한 가지다.** 같은 `target_sha`·script blob·mode에서
   `script_failed`가 재시도 뒤 같은 fingerprint(exit·log digest)로 재현되고,
   스크립트 자체 실패 줄이 있으며 요약·상세에 환경·인증 오류 패턴이 없는 경우만
   `local_code_defect`(disposition `repair`)이며 prover는
   `deterministic_owned_script_failure`다. 중단(`interrupted`)·결과 불명은
   `unknown_outcome`, worktree 소유권·ancestry·정렬·bootstrap·수동 대상 부재는
   `ownership_uncertain`, fetch 실패·timeout·그 외는 `unknown_error`, 재현되지 않은
   스크립트 실패는 `verification_failure`로 조건 대기다. 인증·소유권·결과 불명에는
   수정 Bead를 추측 생성하지 않는다.
3. **수정 인계는 operation 원장이 소유하는 단일 예약이다.** 예약 키는
   `{repo_id, kind, target_sha, script_blob_sha, script_mode, failure_code, fingerprint}`의
   SHA-256이며 `recovery.handoff`에 `reserved → bead_recorded|reused`로 남는다. 같은
   키의 열린 수정 Bead가 원장에 있으면 재사용하고 새로 만들지 않으며, 닫힘이 확인된
   뒤에만 다른 operation이 새 예약을 한다. 생성 응답이 유실되면 `repair_key`
   메타데이터 조회로 재채택하고, 반환된 id는 의존성 쓰기 전에 저장한다. bd 오류는
   예약을 남긴 채 `error`로 기록되어 다음 재조정이 같은 예약을 이어간다.
4. **생성되는 수정 Bead는 일반 workflow의 입구다.** `type:bug`·P1, 설명은 quick_fix
   handoff 계약의 네 절(`출처/배경`·`기대 효과`·`영향 surface와 경계`·`검증 bundle`)과
   `## scope`, `baseline_red` 줄을 갖추고 metadata는 `worker_created_from`·`repair_of`·
   `repair_key`를 생성 시 쓴다. 설명을 재조회해 정본 checker의 절·scope·baseline_red
   검사를 통과한 뒤 `route=quick_fix`와 `quick_fix_review=worker@<digest>`를 한 번의
   bd update로 기록한다. 재조회한 설명·영수증이 `reviewed`이고 route가 일치해야
   기존 Worker의 parallel 대기열에 배치하고 원장에 placement를 남긴다. 이미
   검토·배치된 수정 Bead는 재사용하며, 실패·응답 유실은 같은 예약으로 이어간다.
   배치 확인 전 인계는 미완료이며 사용자 승인 키는 쓰지 않는다. 원래 Bead에는
   `discovered-from` 의존을 한 번만 건다.
5. **수정 PR 생성만으로 원래 작업을 완료시키지 않는다.** 원래 operation의 완료는
   기존 `descendant_success_covers_ancestor_rows` 승계·explicit `replaces`의 검증된
   성공·`[정리 재시도]`로만 이어진다. 완료 실패 댓글과 공용 wait_reasons는 수정 Bead
   참조(`수정 작업 대기 · <id>`)와 조건 확인 문구를 보이고, 타임라인은
   `operation_recovery`(seq=operation id)와 `repair_handoff`(seq=예약 키)로 재생 안전하게
   남긴다. 일반 코드 결함의 승인된 자동 인계만이 사람 클릭 전용 재진입 규칙의 예외다.

### UI-j9j5에서 유지하는 조항

- 정리 cursor `post_merge_jobs`, `repo-ops/post-merge.d/` 발견과 파일명 순서 처리,
  디렉터리 존재가 활성화 신호이며 config 스키마 불변, 비일반 파일은 명명된 실패.
- 각 잡은 `RepoOperation` kind `job`으로 실행 전 durable 기록·전용 배포 worktree
  정렬·deploy lock·timeout·로그·tracked-clean 검증을 재사용하고 spawn 시 HEAD는 merge
  SHA와 정확히 같다.
- 원장은 `<파일명>@<blob SHA>` 맵이며 `intent`는 실행 전, `applied`는 정확한 terminal
  success와 산출물·tracked-clean 검증 뒤에만; 결과 불명 intent는 자동 재실행하지 않는다.
- 수정 잡의 `# repo-ops-replaces: <name>@<old-blob>` 단일 선언과 malformed 거부, 이전
  intent의 정확한 terminal failed만 예약, 살아 있거나 결과 불명·신원 불일치면 미실행.
- 새 intent의 `replaces`와 이전 intent의 `repair`를 같은 CAS로 예약하고 재시도 제한을
  늘리지 않으며, 정확한 수정 성공 뒤 `applied`·`superseded`·`superseded_by`를 하나의
  CAS로 확정하고 원래 failed 상태·exit·로그를 보존한다.
- normalization은 복구 필드와 관계를 보존하고 손상 행은 원본을 보존하는 읽기 실패로
  멈춘다. 원래 정리는 검증된 승계로 다음 단계를 진행하고 최종 close를 확인한다.
  새 API·버튼·Worker 상태·자동 AI 수리 세션 dispatch는 추가하지 않는다.

### 0024에서 유지하는 조항

- 기계가 durable terminal 기록을 쓰는 순간 자동 알림 1건(클래스·원인·다음 행동·링크),
  재관측·재시작 시 같은 알림을 반복하지 않는다. 기존 수동 재진입 `[정리 재시도]`와
  기록 세션 resume 기반 `[세션에서 해결]`(fork·fresh 사유와 notes 계보), 살아 있는
  해결 세션의 단일 소유, 설정 토글 없음.
- 폐기 실패의 출구는 재클릭·`[폐기 포기]`·`[세션에서 해결]` 셋이고, `[폐기 포기]`는
  `requested`(아카이브 단계) 실패에서만 진입하는 terminal `abandoned`이며 소유권 판정
  불능에서는 거부하고 owned runner의 SIGCONT를 먼저 보낸다. 포기는 남의 fence(사용자
  ⏸/■)를 지우지 않고, 포기 기록·이력은 보존하며 포기 알림은 없다.
- 자동 인계는 폐기나 사람의 결정을 대신 실행할 권한을 주지 않는다. 영수증 위조·사용자
  결정 대기·폐기 실패는 자동 수정 인계를 시작하지 않는다(ADR 0036·0040 유지).

## Considered Options

- **전용 수리 세션을 자동 dispatch한다.** 승인·리뷰 없이 공유 배포 worktree를 고치는
  writer가 생겨 ADR 0024가 은퇴시킨 수리 레인을 되살린다. 기각.
- **원장을 성공으로 덮어써 정리를 끝낸다.** 실행 이력을 위조하고 원인이 남은 채
  원래 작업이 닫힌다. 기각.
- **사람 클릭 전용을 유지한다.** 결정적 결함마다 사람이 새 Bead를 손으로 만들어야
  하고, 같은 원인의 여러 operation이 각자 실패 행으로 남는다. 기각.

## Consequences

- 쉬워지는 것: 재현된 스크립트 결함이 자동으로 일반 workflow의 후보가 되고, 같은
  원인은 하나의 수정 Bead로 모인다. 원본 실패·로그·부분 효과는 감사 가능하게 남는다.
- 어려워지는 것: 원장은 `recovery.handoff`의 예약·재사용·닫힘 확인 규칙을 계속
  지켜야 하며, 새 failure code를 추가하는 코드는 `operation-recovery.js`의 분류표를
  함께 정해야 한다. 수정 Bead의 checker·영수증 재조회·배치가 확인되기 전에는
  인계 오류와 미완료 상태를 보존하고 다음 재조정에서 이어가야 한다.
- 배제되는 것: 자동 수리 세션, 원장 덮어쓰기, 결과 불명·소유권 불명·인증 실패에서의
  Bead 생성, 수정 PR 생성만으로의 원래 정리 완료, 사람 전용 출구의 변경.
