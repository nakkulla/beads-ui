---
id: 30
title: post-merge 잡은 RepoOperation kind job 봉투로 실행하고 원장은 queue.json 맵이다
status: accepted
date: 2026-09-01
summary: 'post-merge 잡은 RepoOperation kind `job`으로 deploy 봉투를 재사용해 실행하고 적용 원장은 `queue.json`의 `<파일명>@<blob SHA>` 맵이다'
spec: docs/superpowers/specs/2026-09-01-post-merge-job-runner-design.md
bead: UI-i60a
---

# post-merge 잡은 RepoOperation kind job 봉투로 실행하고 원장은 queue.json 맵이다

## Context

마이그레이션이나 재색인처럼 특정 머지 뒤 한 번만 해야 하는 작업은 기존 두 경로에
맞지 않았다. `deploy`는 정적이며 매 머지에 적용되고, 후속 Bead는 오래 실행되거나
사람의 판단이 필요한 별도 작업을 위한 단위다. 어느 쪽에 넣어도 일회성 실행이라는
성질을 잃는다.

잡 파일을 `repo-ops/post-merge.d/<name>`에 커밋하면 실행 내용과 활성화가 PR 리뷰에
함께 결속된다. 남은 문제는 Worker가 그 파일을 어떤 실행 경계에서 돌리고, 결과가
불명인 중단 뒤에도 중복 실행하지 않도록 어떤 원장을 남길지였다.

## Decision

정리 cursor에 `post_merge_jobs` 단계를 둔다. 이 단계는 머지 트리에서
`git ls-tree`로 `repo-ops/post-merge.d/`를 발견하고 파일명 순서로 pending 잡을
실행한다. `repo-ops/config.toml` 스키마는 바꾸지 않으며, 디렉터리의 존재가 단계의
활성화 신호다.

각 잡은 새 `RepoOperation` kind `job`으로 실행하고 deploy 봉투를 재사용한다. 이
봉투는 실행 전 durable 기록, `.worktrees/.repo-ops-deploy` 정렬, deploy lock,
timeout, 로그 디렉터리, 종료 뒤 tracked-clean `verifyAligned` 검사를 제공한다.

적용 원장은 `queue.json`의 맵이다. 키는 `<파일명>@<blob SHA>`이고 값은
`{state:'intent'|'applied', operation_id, repo_id, at}`다. 실행 전에 `intent`를
기록하고, terminal success와 tracked-clean 확인을 모두 통과한 뒤에만 `applied`를
기록한다. 따라서 같은 내용의 파일은 머지 횟수와 관계없이 한 번만 실행되고, 파일
내용이 바뀌어 blob SHA가 달라지면 새 작업으로 한 번 실행된다.

kind `job`은 deploy의 descendant coverage 의미론을 따르지 않는다. 더 새로운 HEAD가
대상 커밋을 포함한다는 사실은 잡이 실행됐다는 증거가 아니다. spawn 시점에 정렬된
워크트리 HEAD가 `merge_sha`와 정확히 같아야 한다. 다르면
`post_merge_job_target_moved:<key>` 실패로 단계를 멈추고 `applied`를 쓰지 않으며
공유 런타임 소스를 되감지 않는다. terminal 증거가 없는 `intent`는 결과 불명으로
남기고 자동 재실행하지 않는다.

## Considered Options

- **전용 잡 runner와 별도 원장 파일을 만든다.** 잡에 맞춘 구조를 얻지만 저장소 작업
  행, 재시도 사다리, `needs_human` 종단을 각각 두 번째로 구현해야 한다. 같은 안전
  봉투를 복제하므로 기각했다.
- **`repo-ops/config.toml` 스키마에 잡을 선언한다.** 설정에서 명시적으로 보이지만,
  리뷰되는 디렉터리와 파일의 존재가 이미 충분한 활성화 신호다. 같은 사실을 두 곳에
  중복 선언하게 되어 기각했다.

## Consequences

- 기존 저장소 작업의 기록·잠금·timeout·로그·재시도 경로를 일회성 잡에도 재사용할
  수 있다. 잡의 실행과 적용 여부는 한 원장에서 함께 감사할 수 있다.
- 원장 키 형식과 kind `job` operation 레코드는 durable 상태가 된다. 이후 모양이나
  의미를 바꾸려면 기존 `queue.json` 기록을 위한 마이그레이션이 필요하다.
- 배제되는 것: 일반 파일이 아닌 항목(디렉터리·symlink)을 조용히 건너뛰지 않는다.
  이름 있는 실패로 정리를 멈춘다.
- 배제되는 것: 결과를 알 수 없는 중단은 자동으로 다시 실행하지 않는다. 원장에
  `intent`만 남은 상태는 중복 효과를 피하기 위한 사람 재진입 경계다.
