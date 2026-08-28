---
id: 10
title: 배포 실행은 Worker generic execution, 저장소 지식은 repo-ops 스크립트
status: accepted
date: 2026-08-13
summary: 'Worker는 배포를 durable operation journal·전용 워크트리·프로세스 실행으로만 다루고, 저장소별 적용과 확인은 repo-ops [deploy] 스크립트가 소유한다'
spec: docs/superpowers/specs/2026-08-13-worker-repo-operation-auto-repair-design.md
bead: UI-vobi
---

# 배포 실행은 Worker generic execution, 저장소 지식은 repo-ops 스크립트

## Context

머지 후 배포를 누가 소유하는지가 두 번 뒤집혔다. 2026-08-10
`one-click-deployment-reconciler` 설계는 클릭한 머지 SHA를 포함하는 candidate를
핀하고 검증·배포·readback까지 수행하는 Reconciler를 Worker 안에 두었고, managed
Adapter·candidate release 디렉터리·runtime marker·self-restart helper가 함께
딸려왔다. 2026-08-12 `repo-deployment-job` 설계는 그 Reconciler를 저장소 밖의
외부 deployment job으로 옮겼다. 2026-08-13 `worker-repo-operation-auto-repair`
설계가 두 층을 모두 걷어냈다.

두 번의 실패가 가리킨 경계는 하나다. "배포가 성공했다"의 뜻(어느 SHA가 어느
경로에서 살아 있어야 하는가)은 저장소마다 다르므로 Worker가 알면 저장소 수만큼
분기가 자란다. 반대로 durable 상태(언제 시작했고 재시작을 견디는가)는 저장소가
알 수 없다.

## Decision

Worker는 저장소 지식이 없는 실행기만 소유한다: 큐 안의 durable `repo_operations`
journal, 락 아래에서 직렬화되는 bind → prerecord → align → spawn 경로, 전용
detached 워크트리 `.worktrees/.repo-ops-deploy`, 그리고 detached 일회성 자식
프로세스의 exit·timeout 관측.

저장소별 apply와 readback은 핀된 base SHA에서 읽은 `repo-ops/config.toml`의
`[deploy]` 스크립트가 전부 소유한다. 이 저장소에서는 그 스크립트가 self-flock,
HEAD 검증, 빌드, 재시작, health identity readback까지 수행한다.

Reconciler, 외부 deployment job, candidate release 디렉터리와 `current` symlink,
runtime marker의 읽기·쓰기, self-restart helper는 폐기했고, 두 개의 retirement
checker가 그 토큰의 재등장을 막는다. 스크립트가 남기는 restart marker 파일은 그
operation을 보지 못한 소비자를 위한 진단용 흔적이지 성공 판정의 authority가
아니다 — 성공 조건은 health identity readback이다.

## Considered Options

- **Reconciler 유지** — 기각. Worker가 candidate pin·검증·readback을 직접 알면
  저장소가 늘 때마다 Worker가 커지고, 두 번의 재설계가 그 비용을 이미 지불했다.
- **외부 deployment job 유지** — 기각. journal과 재시작 복구가 Worker 밖으로
  나가면 Worker가 관측만 하고 소유하지 못하는 상태가 생겨, 실패 재개의 주체가
  사라진다.

## Consequences

- 쉬워지는 것: 새 저장소는 스크립트 하나를 선언하면 배포에 참여한다. 실패 재개와
  재시작 복구는 journal 한 곳에서 본다.
- 어려워지는 것: 실패 이유가 스크립트 안에 있어 Worker 로그만으로는 원인을 알 수
  없다. 스크립트가 안정된 reason 문자열을 찍는 것이 계약의 일부가 된다.
- 배제되는 것: Worker가 배포 결과를 저장소별로 재해석하는 경로, 그리고 파일
  marker를 배포 성공의 근거로 삼는 경로.
