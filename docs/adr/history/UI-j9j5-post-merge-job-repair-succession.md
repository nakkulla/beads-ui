---
id: UI-j9j5
title: 수정 잡의 원자적 예약과 실제 성공으로 원래 실패를 완료한다
status: superseded
superseded_by: UI-3vvi-2
date: 2026-09-15
summary: "post-merge 잡은 기존 RepoOperation 봉투를 유지하고 명시적 수정 선언의 원자적 예약과 성공 승계로 원래 실패를 완료한다"
supersedes: [30]
spec: docs/superpowers/specs/2026-09-15-post-merge-job-repair-succession-design.md
bead: UI-j9j5
---

# 수정 잡의 원자적 예약과 실제 성공으로 원래 실패를 완료한다

## Context

정본 계약의 대응 결정은 ADR dotfiles/dotfiles-2mpr이다. 이 결정은 그 의미를
소비하는 beads-ui의 원장·실행·정리 구현을 기록하며 ADR 0030을 대체한다.

기존 정리는 원래 PR의 merge SHA에서 같은 잡 blob만 재시도한다. 따라서 실패 원인을
고친 PR을 배포해도 원래 실패는 남는다. 임의로 최신 파일을 실행하면 검토된 복구
의도와 부분 효과의 안전성을 잃고, 원래 실패를 성공으로 덮으면 실행 이력을 위조한다.

원장과 재시작 호환을 바꾸므로 되돌리기 어렵다. 실패한 실행을 보존하면서 원래 PR은
완료할 수 있다는 점은 맥락 없이 의외다. 최신 코드 대체와 직접 성공 기록 대신
명시적 선언과 검증된 성공을 택하는 실제 절충이므로 세 ADR 조건을 모두 충족한다.

## Decision

- 기존 정리 cursor `post_merge_jobs`를 유지한다. merge 트리의 `git ls-tree`로
  `repo-ops/post-merge.d/`를 발견하고 파일명 순서로 처리한다. 디렉터리 존재가
  활성화 신호이며 config 스키마를 바꾸지 않는다. 일반 파일이 아닌 항목은 전체
  디렉터리 검사에서 명명된 실패로 멈추며 조용히 건너뛰지 않는다.
- 각 잡은 기존 `RepoOperation` kind `job`으로 실행한다. 실행 전 durable 기록,
  전용 배포 worktree 정렬, deploy lock, timeout, 로그, 종료 후 tracked-clean
  검증을 재사용한다. spawn 때 HEAD는 해당 merge SHA와 정확히 같아야 한다.
  더 최신 커밋의 ancestry는 실행 증거가 아니며 공유 런타임을 옛 SHA로 되감지 않는다.
- 원장은 `queue.json`의 `<파일명>@<blob SHA>` 맵이고 기존 `operation_id`,
  `repo_id`, `at`를 유지한다. 동일 key는 한 번 적용하고 새로운 blob은 별도 key다.
  `intent`는 실행 전, `applied`는 정확한 terminal success와 산출물·tracked-clean
  검증 뒤에만 기록한다. 결과 불명인 intent를 자동으로 재실행하지 않는다.
- 수정 잡은 첫 32줄 안에 같은 이름의 이전 blob을 지정하는
  `# repo-ops-replaces: <name>@<old-blob>`를 하나만 선언할 수 있다. 커밋된 실제
  잡 bytes에서 읽으며 malformed 접두, 중복, 자기 blob, 다른 이름, 경로, 잘못된
  SHA와 읽기 실패는 어떤 잡도 시작하기 전에 거부한다. 선언 없는 잡은 기존대로다.
- 선언은 이전 완료 조건의 충족과 부분 효과의 안전한 확인·재사용을 의미하며
  구현 리뷰에서 검증한다. 이전 key가 없거나 이미 유효하게 완료됐으면 새 잡만
  정상 실행하고 이전 기록을 만들거나 덮지 않는다. 이전 intent의 정확한 terminal
  failed 실행만 예약한다. 살아 있거나 결과 불명·조회 실패·신원 불일치면 실행하지
  않는다. 성공 operation만 남은 intent는 그 성공부터 재채택한다.
- 새 intent의 `replaces`와 이전 intent의 `repair`를 같은 CAS로 예약한다.
  같은 수정 blob의 재시도도 두 operation pointer를 원자적으로 갱신하며 기존
  재시도 제한을 늘리지 않는다. 예약 뒤 원래 재시도는 수정 operation을 따라가고
  옛 blob을 실행하지 않는다.
- 정확한 수정 성공 뒤 새 key의 `applied`, 이전 key의 `superseded`, 일치하는
  참조와 원래 operation의 `superseded_by`를 하나의 CAS로 확정한다. 원래
  operation의 failed 상태·exit·로그는 보존한다. 응답 유실과 재시작은 같은 성공
  증거를 재채택하며 이미 확정된 다른 연결을 덮지 않는다.
- normalization과 디스크 저장은 복구 필드와 관계를 보존한다. 인식한 손상 행을
  삭제해 미실행 key로 바꾸지 않고 원본을 보존하는 읽기 실패로 멈춘다. 누락 대상,
  다른 repo, 자기 참조, 앞으로 향하는 repair 순환은 거부한다. superseded는
  정확한 applied 대상과 성공 증거가 있어야 하며 retention은 참조 증거를 보존한다.
- 원래 정리는 검증된 승계로 해당 잡을 충족하고 다음 단계를 진행한다. 원래 merge
  SHA는 바꾸지 않는다. 새 성공이 다른 PR의 실패 행을 지우지는 않으며 복구 세션이
  기존 `worker-cleanup-retry`로 재진입해 최종 close를 확인한다. 새 API·버튼·
  Worker 상태·자동 AI 수리 레인은 추가하지 않는다.

## Consequences

수정 코드와 복구 의도를 한 PR에서 검토하면서 기존 실행 봉투를 재사용할 수 있다.
실패 이력과 정확한 후속 성공이 함께 남아 원래 작업의 완료 근거를 감사할 수 있다.
대신 원장 관계, 원자성, 증거 retention과 재시작 호환은 지속적으로 유지해야 한다.

소비자 공유 서비스를 먼저 배포한 다음 수정 선언을 가진 dotfiles 잡을 배포한다.
새 기능의 테스트·병합만으로 완료하지 않고 배포 SHA·프로세스 경로·포트·HTTP를
확인한다. 실제 원래 실패의 복구 완료는 대응 dotfiles 작업의 운영 증거로 별도 확인한다.
