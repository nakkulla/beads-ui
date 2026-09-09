---
id: 51
title: 프런트엔드 번들은 tracked 생성물이 아니고 배포·verify·패키징이 빌드한다
status: accepted
date: 2026-09-09
summary: "app/main.bundle.js와 소스맵은 tracked가 아니며 deploy·verify·prepack이 빌드한다; 정적 모드 서버는 번들 부재 시 빌드 안내로 종료하고 자동 빌드하지 않는다"
spec: docs/superpowers/specs/2026-09-09-untracked-bundle-parallel-landing-design.md
bead: UI-47y7
---

# 프런트엔드 번들은 tracked 생성물이 아니고 배포·verify·패키징이 빌드한다

## Context

`app/main.bundle.js`와 `app/main.bundle.js.map`은 `app/` 소스에서 esbuild가 만드는
생성물인데 저장소에 커밋돼 있었다. 병렬로 도는 Worker attempt는 각자 소스를 고치고
번들을 다시 빌드해 커밋하므로, 두 PR이 열리면 GitHub의 mergeability 판정이 곧바로
CONFLICTING이 되고 충돌 해소 세션이 재빌드·전체 재검증을 반복했다 — 2026-09-09
워커 하네스 감사에서 UI-hhn9(≈7턴), UI-rj02(20턴), UI-6g3t(25턴), UI-s582(충돌
3파일 중 2개가 번들) 등 8건이 관측됐다. 소스맵이 빌드 위치에 따라 달라져 배포의
tracked-clean 검사가 실패하는 함정(prettier → build 순서)도 같은 뿌리였다.

한편 배포 스크립트 `repo-ops/script/deploy`는 이미 `npm ci && npm run build`를
실행하고(ADR 0010), `package.json`의 `prepack`도 `npm run build`라 npm 패키지에는
번들이 항상 들어간다. 커밋된 번들을 실제로 읽는 소비자는 로컬 정적 모드
(`BDUI_FRONTEND_MODE` 기본)로 뜨는 개발 서버뿐이었다.

검토한 대안: (1) `.gitattributes`에 `merge=ours` — GitHub의 PR mergeability 판정은
로컬 merge driver를 쓰지 않으므로 CONFLICTING이 그대로다. (2) 번들을 tracked로 두고
머지 큐의 resolver 세션이 항상 재빌드한다 — 현행이며 비용이 그대로다. (3) 정적 모드
서버가 번들 부재 시 스스로 빌드한다 — 서버 프로세스가 빌드 도구를 spawn하는 책임을
갖게 되고, 배포 워크트리에서 조용히 빌드가 돌아 배포의 tracked-clean 검사와 경합한다.

## Decision

- `app/main.bundle.js`·`app/main.bundle.js.map`은 tracked가 아니다(`.gitignore`).
  `package.json#files`의 두 항목은 유지한다 — `prepack`이 만든 파일이 패키지에 들어간다.
- 빌드 소유자는 셋이다: 배포(`repo-ops/script/deploy`, 기존), 머지 직전 안전망
  `repo-ops/script/verify`(`npm run tsc` 뒤·`npm test` 앞에 `npm run build`), 패키징
  (`prepack`). 번들이 untracked이므로 verify의 빌드는 candidate 체크아웃의 tracked
  파일을 바꾸지 않고, 커밋된 번들이 없으니 "이 PR이 여전히 번들되는가"는 verify의
  빌드가 증명한다.
- 정적 모드 서버(`server/app.js`)는 시작 시 `app/main.bundle.js`가 없으면 `npm run
  build`와 `BDUI_FRONTEND_MODE=live`를 안내하는 오류로 종료한다. 자동 빌드도, live
  모드로의 조용한 fallback도 하지 않는다. on-demand 번들은 live 모드에만 있다.
- 이 저장소의 어떤 테스트도 커밋된 번들의 존재에 의존하지 않는다. 정적 모드 응답은
  임시 `app_dir`의 자체 번들 fixture로 검증한다.
- 번들 커밋이 남은 기존 PR·워크트리는 base 동기화의 modify/delete 충돌에서 삭제를
  채택한다(`git rm -q -- app/main.bundle.js app/main.bundle.js.map`). 별도 마이그레이션
  스크립트는 두지 않는다.

## Consequences

- 병렬 PR이 생성물 때문에 충돌하지 않고, prettier → build 순서 함정과 소스맵 위치
  정규화의 배포 실패 원인이 사라진다.
- 로컬 정적 모드 개발은 `npm run build`를 전제한다. 첫 착지 직후의 기존 워크트리는
  한 번 D5 절차로 충돌을 해소해야 한다.
- 첫 착지의 `[verify]`는 변경 전 base SHA의 스크립트를 실행하므로(ADR 0010) 빌드
  없이 돈다 — 그래서 이 PR의 테스트가 번들에 의존하지 않는 것이 착지 조건이었다.
- 배포 소유권 분할(ADR 0010)과 머지 자격의 checks 배제(ADR 0003)는 전제이며 바꾸지
  않는다.
