---
scope:
  - server/worker/exec-enums.js
  - server/worker/exec-enums.test.js
  - app/views/detail-panel/exec-settings.js
  - app/views/detail-panel/exec-settings.test.js
  - app/views/settings-dialog/session-model.js
  - app/views/settings-dialog/session-model.test.js
  - app/utils/execution-defaults.js
  - app/utils/execution-defaults.test.js
  - generated/contracts/execution-defaults.json
  - server/workflow-enrich.js
  - server/workflow-enrich.test.js
  - server/ws/exec-settings-mutation.test.js
  - app/views/detail-panel/effective-card.test.js
  - app/protocol.md
---

# Astra 리뷰어 설정 선택·저장·실행 정보 표시

- Bead: UI-ulfb
- 사용자 요청: 2026-09-08, 기존 Sol과 새 Astra를 구분해 선택한다.
- 기준: 867b3e990b93cc85d55347a0bfcb2ccc7e8658a3
- 공통 계약 형제: dotfiles-2lw8, dotfiles의 같은 이름 설계가 reviewer 토큰·preset을 소유한다.
- 한 저장소·한 구현 단위. 원래 UI-tjus 레인 위치 보존 작업과 결정 대상이 다르다.

## 목표

설정에서 Codex · Sol 또는 Codex · Astra를 선택하고 저장한 뒤 다시 열어도 같은 선택과
실제 실행 모델이 표시된다. 기존 codex 값은 계속 Sol이다. 새 선택은 astra이며 공통
preset의 실제 모델은 gpt-6-astra/xhigh다. 기본 리뷰어는 바꾸지 않는다.

## 결정

1. spec·impl·plan 리뷰의 기존 Codex 허용 위치에 astra를 추가한다. server의 허용값과
   설정 dialog·이슈 상세의 허용값을 함께 갱신한다. 다른 검토자와 plan의 기존 제한을
   이번 변경으로 넓히거나 줄이지 않는다.
2. 옵션 label은 Codex · Sol / Codex · Astra, value는 codex / astra다. 기존 저장
   데이터를 마이그레이션하거나 codex를 새 토큰으로 바꾸지 않는다. 기존 Opus·Fable·
   직접 검토·생략의 저장 값과 표시 의미도 유지한다.
3. 실제 모델·effort는 dotfiles에서 생성한 execution-defaults 사본의 reviewer preset을
   읽는다. astra도 Codex 검토 경로의 speed/effort 규칙을 따른다. 알 수 없는 토큰이나
   누락된 preset을 Sol로 바꿔 표시하지 않고 기존 invalid/fail-quiet 규칙을 유지한다.
   speed는 exact gpt-6-astra catalog entry가 제공하는 tiers만 사용한다. 해당 entry가
   없으면 기존처럼 speed 편집을 비활성화하고 기본 속도로 실행한다. Sol의 tiers를
   빌리거나 구현 모델 catalog에 Astra를 추가하지 않는다.
4. 기존 preset 저장·일괄 적용·Bead metadata 변경·서버 validation·readback 경로를
   사용한다. 새 API, 새 metadata key, 새 설정 페이지나 모델 검색기를 만들지 않는다.
5. codex@와 astra@ 영수증은 실제 검토자를 구분한다. 영수증 형식·ancestry freshness는
   유지하고 해당 토큰에 대한 active allowlist가 있다면 정본에 맞춘다. 새 12자리 plan
   review 영수증과 리뷰 glyph만 astra를 허용하고 legacy plan approval와 user 승인
   영수증은 변경하지 않는다.
6. request_user_input 질문 절차와 실제 reviewer dispatch는 dotfiles-2lw8가 소유한다.
   beads-ui는 해당 계약의 소비자이며 질문 도구나 실행 모델 선택기를 복제하지 않는다.

## 선행과 적용 순서

UI-ulfb는 dotfiles-2lw8의 closed를 기다리는 foreign blocks 의존을 갖는다. 공통 계약
배포 뒤 정본의 핀된 execution-defaults 사본을 저장소의 기존 동기화 절차로 갱신한다.
구현·검증·PR 인도 뒤 머지하면 기존 repo-ops [deploy]가 공유 서버를 배포한다.
완료 주장은 deploy terminal success와 merged SHA의 프로세스 경로·포트·HTTP 응답 확인을
포함한다. 기존 UI-tjus 실행과 독립된 작업이며 그 레인 로직은 여기서 수정하지 않는다.

## Test scope

`npx vitest run server/worker/exec-enums.test.js server/workflow-enrich.test.js
server/ws/exec-settings-mutation.test.js app/utils/execution-defaults.test.js
app/views/detail-panel/exec-settings.test.js app/views/settings-dialog/session-model.test.js
app/views/detail-panel/effective-card.test.js --reporter=dot`을 실행한다.

## 검증

- 서버가 astra의 spec/impl/plan 설정을 허용하고 저장·조회 결과를 보존한다.
- 이슈 상세와 설정 dialog가 두 Codex 옵션을 구분하고 codex의 기존 선택을 유지한다.
- preset/effective 설정의 astra 실제 모델과 xhigh effort가 공통 사본과 일치한다.
  override와 기존 speed 규칙을 보존하며 없는 preset에 Sol fallback을 추가하지 않는다.
- 기존 Sol 영수증과 새 Astra 영수증이 같은 형식/freshness 규칙으로 해석된다.
- 관련 설정·enum·유효값 focused 테스트를 실행한다. 구현 시작 전 node>=22와
  npm ls --depth=0 확인, npm run tsc, npx vitest run --reporter=dot(120초),
  npm run lint, npm run prettier:write, npm run build를 실행한다.
- app/main.bundle.js·app/main.bundle.js.map을 함께 갱신하고 무관한 사용자 변경은 보존한다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|
| 형제 | dotfiles/dotfiles | user_request | 공통 계약 정본과 설치본을 소유하는 별도 저장소 | 없음 | dotfiles-2lw8 |

## 결정 (ADR 후보)

- 전제: ADR 0012 — workflow 계약은 dotfiles가 정의하고 이 저장소는 검증된 사본을 소비한다.
- 전제: ADR dotfiles/0030 — 영수증이 검토자를 나타내며 실행 레인별 별도 금지 목록을 만들지 않는다.
- 없음 — 새 reviewer 의미·질문·실행 정책은 dotfiles-2lw8가 소유하고 이 작업은 기존 설정 표면에 그 선택값을 소비한다.
