# 통합 설정 다이얼로그와 세션 전역 기본값 실행 계획 (UI-qeiz)

## Context

- 승인 스펙:
  `docs/superpowers/specs/2026-08-16-unified-settings-session-defaults-design.md`
  @ `2742ce7dd2e3d2f5bf0b3add636b57b1abeaea3a`
  (`spec_review=self@2742ce7dd2e3d2f5bf0b3add636b57b1abeaea3a`).
- 목표: 세션 전역 기본값을 `bd kv` 키 `workflow_session_defaults` 단일 소스로
  이전해 대화형·Worker 세션 모두에 도달시키고, Worker의 9키 스탬프와 workspace
  프리셋 참조를 제거하며, 통합 설정 다이얼로그(세션/Worker/표시 탭)와 이슈
  상세 한눈 요약을 재설계한다. 구현 프리셋
  (`impl_dispatch/runtime/model/effort/speed`)은 Bead별·전역 적용을 지원한다.
- **선행 유닛(이 계획의 Phase 아님)**: dotfiles Bead `dotfiles-7g1c` —
  workflow.yaml kv 스키마·`impl_dispatch`, harness.yaml v7 우선순위, 소비자
  전수 갱신, 런타임 복사본 동기화. `UI-qeiz`가 blocks 의존(readback 확인).
  이 계획의 실행은 `dotfiles-7g1c` 머지·런타임 동기화 검증(스펙 "적용 순서"
  1–2단계) 후에만 시작한다.
- beads-ui 작업은 **하나의 sealable 유닛**이다: 서버 리팩터(마이그레이션이
  legacy 프리셋·필드를 정리)와 UI 전환은 같은 저장소·같은 검증 묶음·순차
  의존이며, 서버만 먼저 seal하면 기존 exec-defaults UI가 깨지므로 유효한 분리
  사유가 없다. 시각 디자인은 승인 스펙의 정보 구조(D·E절)와 frontend-design
  지침만 구현 기준으로 삼는다.
- 배포·마이그레이션은 스펙 "적용 순서와 재개 지점"·"F. 마이그레이션" 절을
  따른다. 최종 산출은 parent 브랜치 누적 커밋의 단일 non-empty PR이다.

## Phase 1: beads-ui — kv 세션 기본값·구현 프리셋·마이그레이션·통합 설정 UI·이슈 상세

작업 내용 (서버):

- `server/bd.js`(`deps.bd`)에 kv get/set 어댑터 추가 — 부재/파싱 실패 시
  undefined + 경고. 파싱 실패·쓰기 실패는 WS 응답으로 클라이언트에 오류
  전달(스펙 F의 UI 경고 배너·저장 실패 상태의 데이터 소스).
- `server/ws/`에 session-defaults 조회/변경 메시지 신설(enum 검증, 저장 직전
  재조회 last-write-wins, 실패 시 오류 응답). Bead별 세션 키 편집의 **3상태
  literal 의미**를 서버 mutation에서 보장: 명시값은 literal 기록
  (`workflow_mode=standard` 포함), `(기본)`만 metadata 삭제 — 기존 삭제-변환
  결함 수정.
- `server/exec-preset-store.js`·`server/worker/exec-preset-coordinator.js`:
  프리셋을 구현 프리셋(`impl_dispatch/runtime/model/effort/speed`)으로 재편.
  적용 API 둘(Bead metadata 일괄 기록, kv 기록).
- 멱등 마이그레이션(스펙 F): destination별 fill-only-empty(kv 세션 키 / queue
  orchestration 3키 / 구현 프리셋 사본), 3곳 readback 성공 후에만 workspace별
  완료 표식·원본 정리(`default_exec_preset_id`·legacy `exec_defaults`·12키
  프리셋). 부분 성공은 다음 시작에 재수렴.
- `server/worker/policy.js`: 세션 키 9개의 `ExecDefaultsLayer` 제거,
  orchestration 3키 fail-closed 검증 유지.
- `server/worker/scheduler.js`: spawn 전 9키 `stamped_keys` 스탬프 제거,
  `workflow_mode=fast_track` 강제·orchestration CLI 전달 유지.
- `server/worker/queue-store.js`: orchestration 3키 직접 값 저장 setter 추가,
  `default_exec_preset_id`·legacy `exec_defaults` 필드 제거(직렬화에서 소거).
- `server/worker/exec-enums.js`: `impl_dispatch` enum·`auto` 리터럴 반영(계약
  소비자로서 dotfiles 어휘와 일치).
- legacy WS 메시지 제거: `worker-queue-set-default-exec-preset`·12키
  `exec-preset-*` 계열을 수용하지 않고 오류 응답, `app/protocol.js` 타입 정리.

작업 내용 (프론트엔드):

- 통합 설정 다이얼로그 신설(`app/views/settings-dialog/`): 좌측 레일 탭
  세션/Worker/표시. 세션 탭 = 워크플로우 모드, 리뷰 게이트 3행, 구현 그룹
  (실행 방식 위임/메인 → 위임 대상 → 모델·effort(`자동`) → 속도, 메인 시 이하
  비활성), 구현 프리셋 바. Worker 탭 = 오케스트레이션 런타임→모델→effort→속도
  종속 선택 + slots. 표시 탭 = 기존 display-policy UI 이식. kv 파싱 실패 경고
  배너, 저장 실패 시 알림 + 편집 상태 보존(스펙 F).
- 진입점 정리: 내비 바 ⚙ 하나로 통일(기존 `#display-settings-btn` 대체,
  Worker 화면·Monitor의 exec-defaults 진입 제거),
  `app/views/worker/exec-defaults-dialog.js` 삭제.
- 이슈 상세 재설계(`app/views/detail-panel/`): 요약 헤더(상태·route·게이트
  스텝퍼·PR·`exec_receipt`), 유효 실행 설정 카드(한 줄 요약 + 층 레일·출처
  배지 핀/전역/기본, harness 값 미복제), 3상태 편집기, 구현 프리셋
  quick-apply, 편집 그룹 재구성(워크플로우/리뷰/구현/Worker).
- `npm run build`로 `app/main.bundle.js`·`.map` 갱신 포함.

검증: 아래 Test scope의 seam RED→GREEN + `npm test` 전체 + Pre-Handoff
Validation(tsc/test/lint/prettier/build) + `npm run build` 번들 갱신 확인.

## Test scope

모든 seam은 Phase 1 소속이며, 서버 seam은 현존 파일에 변경 전 실패 assertion을
추가하는 것으로 시작한다.

1. `server/bd.test.js` — kv 어댑터 라운드트립·부재·파싱 실패(undefined+경고,
   오류가 호출자에 전달됨).
2. `server/ws/exec-settings-mutation.test.js` — session-defaults 저장·
   readback·enum 거부·쓰기 실패 오류 응답, `workflow_mode=standard` literal
   기록(3상태).
3. `server/worker/policy.test.js` — 9키 workspace 층 제거 회귀, orchestration
   fail-closed 유지.
4. `server/worker/scheduler.test.js` — 9키 스탬프 미발생, fast_track 강제
   유지.
5. `server/worker/queue-store.test.js` — orchestration 직접 값 저장·검증,
   **legacy `default_exec_preset_id`·`exec_defaults`가 더 이상 직렬화되지 않는
   assertion**.
6. `server/worker/exec-preset-coordinator.test.js`·
   `server/exec-preset-store.test.js` — 멱등 마이그레이션(fill-only-empty,
   완료 표식 후에만 원본 정리, 부분 성공 재실행 수렴).
7. `server/ws/exec-preset-apply.test.js` — 구현 프리셋 두 적용 경로, **legacy
   12키 프리셋 메시지(`worker-queue-set-default-exec-preset` 등)가 더 이상
   수용되지 않는 assertion**.
8. 신규 `app/views/settings-dialog/*.test.js` — 탭 전환, 세션 탭 저장
   payload, 위임/메인 비활성 로직, kv 파싱 실패 경고 배너 렌더, 저장 실패 시
   편집 상태 보존.
9. `app/views/detail-panel/*.test.js` — 출처 배지 합성(핀/전역/기본), 3상태
   편집 payload, 프리셋 quick-apply payload. 기존 display-settings·
   exec-settings 테스트는 신규 표면으로 이전.

제외: dotfiles 계약 seam(`tests/workflow_skill_contract_test.sh`)은
`dotfiles-7g1c` 소유. Pre-Handoff Validation과 `npm run build`는 seam이 아니라
마감 검증.
