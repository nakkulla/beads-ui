---
id: UI-u6ud-5
title: 배포 실행과 프런트엔드 빌드
status: accepted
date: 2026-09-23
summary: "배포는 Worker의 저장소 지식 없는 durable operation 실행이고 저장소별 적용·확인은 핀된 base의 repo-ops [deploy] 스크립트가 소유한다; 자동 해소 사다리는 script_retry 한 단계 상시이고 수동 [배포 실행] 버튼이 있으며 병렬성 분석·reconciler·release 디렉터리는 없다; 프런트엔드 번들은 tracked가 아니고 배포·verify·prepack이 빌드하며 정적 모드 서버는 번들 부재 시 안내 종료하고 자동 빌드하지 않는다"
supersedes: [10, 9, 51]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# 배포 실행과 프런트엔드 빌드

## Context

- `0010`: 배포는 Worker의 저장소 지식 없는 durable operation 실행이고 저장소별 적용·확인은 핀된 base의 repo-ops `[deploy]` 스크립트가 소유한다.
- `0009`: 병렬성 분석 제거는 끝났고, 남는 조항인 수동 `[배포 실행]` 버튼과 `script_retry` 한 단계 상시 사다리만 가져온다.
- `0051`: 프런트엔드 번들은 tracked가 아니고 배포·verify·prepack이 빌드하며 정적 모드 서버는 번들 부재 시 안내 종료한다.

## Decision

- Worker는 저장소 지식이 없는 실행기만 소유한다: 큐 안의 durable `repo_operations` journal, 락 아래 직렬화되는 bind → prerecord → align → spawn 경로, 전용 detached 워크트리 `.worktrees/.repo-ops-deploy`, detached 일회성 자식 프로세스의 exit·timeout 관측.
- 저장소별 apply와 readback은 핀된 base SHA에서 읽은 `repo-ops/config.toml`의 `[deploy]` 스크립트가 전부 소유한다. 이 저장소에서는 그 스크립트가 self-flock, HEAD 검증, 빌드, 재시작, health identity readback을 수행한다.
- reconciler, 외부 deployment job, candidate release 디렉터리와 `current` symlink, runtime marker 읽기·쓰기, self-restart helper는 없고 retirement checker가 그 토큰의 재등장을 막는다.
- 스크립트의 restart marker 파일은 진단용 흔적이지 성공 판정의 authority가 아니다. 성공 조건은 health identity readback이다.
- 병렬성 분석 기능은 없다. 수동 `[배포 실행]` 버튼이 저장소 작업 화면에 있다.
- 배포 해소 사다리는 `script_retry` 한 단계이고 토글 없이 상시다.
- `app/main.bundle.js`·`app/main.bundle.js.map`은 tracked가 아니다(`.gitignore`). `package.json#files`의 두 항목은 유지해 `prepack`이 만든 파일이 패키지에 들어간다.
- 빌드 소유자는 배포(`repo-ops/script/deploy`), 머지 직전 `repo-ops/script/verify`(`npm run tsc` 뒤·`npm test` 앞에 `npm run build`), 패키징(`prepack`) 셋이다.
- 정적 모드 서버(`server/app.js`)는 시작 시 번들이 없으면 `npm run build`와 `BDUI_FRONTEND_MODE=live`를 안내하는 오류로 종료한다. 자동 빌드도 live 모드로의 조용한 fallback도 없고, on-demand 번들은 live 모드에만 있다.
- 어떤 테스트도 커밋된 번들의 존재에 의존하지 않고 정적 모드 응답은 임시 `app_dir`의 번들 fixture로 검증한다.
- 번들 커밋이 남은 PR·워크트리는 base 동기화의 modify/delete 충돌에서 삭제를 채택한다. 별도 마이그레이션 스크립트는 없다.

## Consequences

- 배포 실행 소유·사다리·빌드 소유가 한 행으로 읽힌다. 되돌리려면 repo-ops 스크립트·operation journal·verify·prepack·정적 모드 서버가 함께 움직인다.
- `0009`의 병렬성 분석 제거는 완료된 실행이라 승계 대상이 아니다(폐기한 조항이 아니다). 스펙이 선언한 대로 상시 조항만 승계했다. 그 밖에 폐기한 조항은 없다.
