---
scope:
  - app/main.bundle.js
  - app/main.bundle.js.map
  - .gitignore
  - scripts/build-frontend.js
  - repo-ops/script/verify
  - repo-ops/script/deploy
  - server/app.js
  - server/config.js
  - bin/
  - package.json
  - AGENTS.md
---

# 커밋된 번들이 병렬 착지 충돌을 만든다 — 생성물을 tracked에서 빼고 배포·verify가 빌드한다

- Bead: `UI-47y7` (`route=spec_backed`, 사용자 요청 2026-09-09; 워커 하네스 감사 `UI-cvwo`의 형제).
- 상태: 사용자 승인 전 초안.
- 근거: 병렬 Worker attempt가 각자 `app/main.bundle.js`·`.map`을 커밋해 PR이 열리자마자 CONFLICTING이 되고, 충돌 해소 세션이 재빌드·전체 재검증을 반복한다 — UI-hhn9(≈7턴), UI-rj02(20턴), UI-6g3t(25턴), UI-s582(충돌 3파일 중 2개가 번들), UI-jr8v-4, UI-b93d, UI-i60a-2, UI-iv7l. `repo-ops/script/deploy:99`는 이미 `npm ci && npm run build`를 실행하므로 배포는 커밋된 번들을 쓰지 않는다. `package.json`의 `prepack`도 `npm run build`라 npm 패키지에는 번들이 항상 들어간다.

## 목표와 비목표

목표: 생성물 때문에 PR이 충돌하지 않게 한다. 배포·패키지 산출물은 지금처럼 빌드로 만든다.

비목표: 프런트엔드 빌드 도구·번들 형식·`BDUI_FRONTEND_MODE=live` 동작·ADR 0010의 배포 소유권 분할은 바꾸지 않는다. ADR 파일명 충돌은 `dotfiles-60u8`이 다룬다.

## 접근 비교

1. `.gitattributes`에 `app/main.bundle.js merge=ours` — GitHub의 PR mergeability 판정은 로컬 merge driver를 쓰지 않으므로 CONFLICTING은 그대로다. 기각.
2. 번들을 tracked로 두고 머지 큐의 resolver 세션이 항상 재빌드 — 현행이며 비용이 그대로. 기각.
3. 번들을 tracked에서 제거하고 `.gitignore`에 넣는다(채택). 배포는 이미 빌드하고, 패키지는 `prepack`이 빌드하며, `[verify]`는 candidate 체크아웃에서 빌드해도 tracked 파일을 바꾸지 않게 된다.

## 결정

D1. `git rm --cached app/main.bundle.js app/main.bundle.js.map`, `.gitignore`에 두 경로 추가. `package.json#files`의 두 항목은 유지한다(`prepack`이 만든 파일이 패키지에 들어간다).

D2. `repo-ops/script/verify`에 `npm run build || fail`을 `npm run tsc` 뒤에 더한다. 번들이 untracked이므로 candidate 체크아웃의 tracked-clean 규약을 어기지 않는다(`scripts/build-frontend.js`가 두 파일 외에 tracked 파일을 쓰지 않음을 테스트로 고정). 배포 스크립트는 변경 없음.

D3. 정적 모드 서버(`server/app.js`, `BDUI_FRONTEND_MODE` 기본)는 시작 시 `app/main.bundle.js`가 없으면 명확한 오류로 종료한다: "번들이 없다 — `npm run build`를 먼저 실행하거나 `BDUI_FRONTEND_MODE=live`로 시작하라". 자동 빌드는 하지 않는다(서버 프로세스가 빌드 도구를 spawn하는 책임을 갖지 않게). `bdui-shared`는 배포 워크트리에서 뜨고 배포가 빌드하므로 영향이 없다.

D4. `AGENTS.md` Pre-Handoff의 "갱신된 `app/main.bundle.js`/`.map`을 포함한다" 문장을 "번들은 tracked가 아니다; 로컬 정적 모드 확인이 필요하면 `npm run build`"로 바꾼다(`UI-cvwo` D7의 축약 본문 위에 적용). Post-Merge 절의 live 모드 안내는 그대로다.

D5. 기존 PR·워크트리에 남은 번들 커밋은 이번 변경 머지 뒤 base 동기화 시 자연히 충돌한다 — 해소는 "번들 파일을 삭제 상태로 채택"이며 `UI-cvwo` D6 재개 문장의 ff 확인이 그 경로를 안내한다. 별도 마이그레이션 스크립트는 만들지 않는다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | user_request | 독립 착지 가능한 검증 묶음 — Worker 러너·프리앰블 변경과 별도 검토 | 없음 | UI-cvwo |
| 형제 | dotfiles | user_request | 다른 저장소 — ADR 식별자 규칙 | 없음 | dotfiles-60u8 |

- 관찰: `UI-cvwo`와 `AGENTS.md` 같은 문단을 만진다(D4) — 머지 순서는 큐가 정하고 뒤에 착지하는 쪽이 base 동기화에서 문장을 맞춘다.

## Test scope

```bash
npx vitest run --reporter=dot server/app.live-mode.test.js server/config.test.js server/worker/repo-ops-deploy-script.integration.test.js
node scripts/build-frontend.js && git status --porcelain   # 두 번들 파일 외 변경 없음(빈 출력)
npm run tsc && npm run lint
npx vitest run --reporter=dot
```

회귀 사례: 번들 부재 + 정적 모드 → 시작 실패 메시지; 번들 부재 + live 모드 → 정상; `build-frontend.js` 실행 뒤 `git status --porcelain`이 빈 출력(ignored); `repo-ops/script/verify`가 빌드를 포함하고 통합 테스트가 통과. 실제 확인: 머지·배포 뒤 `bdui-shared`가 배포 워크트리에서 뜨고 HTTP 응답이 정상, 그 뒤 첫 병렬 PR 두 건이 번들로 충돌하지 않음을 관측한다.

## 실행·인도

한 저장소·한 Bead·한 패킷의 `spec_backed`. PR 하나로 `resolved` 인도. 머지 뒤 `[deploy]`가 빌드·재시작하고 프로세스 경로·포트·HTTP 응답을 확인한다.

## 결정 (ADR 후보)

- 전제: ADR 0010 — 저장소별 적용은 repo-ops 스크립트가 소유한다; 빌드는 이미 deploy에 있고 D2는 verify에도 둔다.
- 전제: ADR 0003 — 머지 자격에 GitHub checks는 없다; 빌드 검증은 `[verify]`로 들어간다.
- 프런트엔드 번들은 tracked 생성물이 아니고 배포·verify·패키징이 빌드한다: 되돌림 어려움=충족(gitignore·verify·서버 시작 검사·지침이 함께 움직이고 기존 PR 충돌 해소 방식이 바뀜), 맥락 없으면 의외=충족(왜 정적 모드가 빌드를 전제하는지 설명 필요), 실제 대안=충족(merge=ours·resolver 재빌드). `summary`: "app/main.bundle.js와 소스맵은 tracked가 아니며 deploy·verify·prepack이 빌드한다; 정적 모드 서버는 번들 부재 시 빌드 안내로 종료하고 자동 빌드하지 않는다" → ADR
