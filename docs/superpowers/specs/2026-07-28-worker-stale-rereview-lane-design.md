# 워커 spec_review_stale 세션 내 재리뷰 레인 (UI-dlim)

- 날짜: 2026-07-28
- Bead: UI-dlim (beads-ui 구현) · dotfiles-otgy (계약 개정 짝, cross_workspace)
- 계약 짝 스펙: dotfiles `docs/superpowers/specs/2026-07-28-workflow-stale-rereview-contract-design.md`

## 1. 배경·문제

공유 스펙 파일을 쓰는 두 비드(실측: Cortex-gg3/U1, Cortex-496/U2)에서 496의 §6
수정 커밋이 gg3의 `spec_review` receipt를 무효화했다. admission의 freshness
검사(`server/worker/admission.js` — `git log <receipt_sha>..<base> -- <spec_id>`
비어 있음)는 **파일 단위**라, 타 비드가 자기 섹션만 고쳐도 receipt가 stale이
되고 워커 자동진행이 `spec_review_stale` 거부로 영구 정지한다. 사람이 receipt를
수동 갱신하기 전까지 무인 흐름이 끊긴다.

## 2. 목표·비목표

**목표**: `spec_review_stale`을 차단 사유에서 빼고, 디스패치된 세션이 같은
attempt 안에서 재리뷰(triage/codex 레그)로 정합을 맞춘 뒤 구현을 계속한다.
오탐(스코프 무교차 delta)은 사람 개입 없이 자동 해소되고, 진짜 스펙 변경은
독립 레그 판정 없이는 진행되지 않는다(fail-closed 유지).

**비목표**:

- 재리뷰 절차 본문의 정의 — 계약(dotfiles `docs/contracts/workflow.{md,yaml}`)
  소유. beads-ui는 관측 사실 전달과 표시만 한다(소비자 원칙).
- REVISE findings의 자동 반영 — 수정→재리뷰 루프 금지(사용자 확정: 무한 루프
  우려 + 무인 세션의 스펙 수정·main 발행 위험). REVISE는 즉시 blocked 파킹.
- Cortex-gg3 자체의 receipt 수동 갱신(deferred — 레인 배달 후에도 막혀 있으면
  수동 처리).
- running 타일의 stale 표시 추가(YAGNI — 후보 카드 뱃지만 전환).

## 3. 설계

### 3.1 admission 변경 (`server/worker/admission.js`)

- freshness 검사 실패(delta 존재) 시 `{ ok: false, reason: 'spec_review_stale' }`
  대신 **`{ ok: true, stale: { receipt_sha, delta_shas } }`** 를 반환한다.
  `delta_shas`는 이미 실행하는 `git log <receipt_sha>..<base> -- <spec_id>`
  출력에서 수집한 커밋 SHA 목록.
- 나머지 거부 사유(`gh_unavailable`·`invalid_route`·`spec_missing`·
  `spec_missing_at_base:*`·`receipt_missing_or_malformed`·`receipt_unreachable`·
  `git_error`)는 전부 현행 유지. git 실패는 여전히 거부다 — stale 판정 자체가
  git 오류면 admit하지 않는다.
- `AdmissionReason`에서 `spec_review_stale` 제거, `AdmissionResult`에 `stale`
  필드 추가. `skipped@` receipt도 동일하게 admit+flag(사용자 확정).

### 3.2 스케줄러·프롬프트 (`server/worker/scheduler.js`, `runner/`)

- 큐 진입·tick 스캔·디스패치 재검사(TOCTOU) 모두 stale을 admit+flag로 다룬다.
  큐 진입 때 fresh였다가 디스패치 시점 `base_oid`에서 stale이 된 경우도 거부가
  아니라 flag다. **디스패치 재검사의 stale 페이로드가 프롬프트 주입의 기준**
  (base_oid에 핀된 값)이다.
- attempt 레코드에 stale 플래그를 싣는다(활동 로그·UI 소비용).
- stale일 때 세션 base prompt에 stale 블록을 덧붙인다: 원 receipt(reviewer@sha),
  base SHA, delta 커밋 SHA 목록, 그리고 "구현 전에 workflow 계약의 워커
  재리뷰 레인(stale receipt 갱신)을 먼저 수행하라" 한 줄. 절차 본문은 계약이
  소유하므로 프롬프트는 트리거와 관측값만 전달한다.

### 3.3 세션 절차 (계약 소유 — 요약만)

세션은 delta를 보고 ⓐ 스코프 무교차가 명백하면 self-triage로 receipt를
`triage@<새 40hex>`로 갱신, ⓑ 교차 또는 불확실이면 codex delta 리뷰 레그를
1회 디스패치해 APPROVE 시 `codex@<새 40hex>`로 갱신한 뒤 구현을 계속한다.
갱신 쓰기는 notes 계보(원 receipt·delta SHA·판정 요약)와 동일 `bd update`,
readback 필수. REVISE(판정 불능 포함)면 `status=blocked` +
`blocked_reason=spec_review_stale:revise` + notes에 findings를 기록하고
attempt를 종료한다(수정→재리뷰 루프 없음). 정식 규칙은 계약 짝 스펙 참조.

### 3.4 UI (`app/views/worker/`)

- 후보 카드의 `spec_review_stale` 거부 뱃지를 비차단 "stale→재리뷰" 뱃지로
  전환한다(admit되므로 거부 뱃지 어휘에서 제거).
- blocked 파킹된 비드는 기존 blocked 기본 숨김(UI-ki09) 동작을 그대로 탄다.
  attempt 종료는 기존 no-PR 종료 경로 재사용 — 새 수명주기 상태 없음.

## 4. 수용 기준

1. stale 비드가 큐 진입·디스패치에서 거부되지 않고 admit+flag로 실행된다.
2. stale이 아닌 거부 사유의 동작이 하나도 변하지 않는다(admission 테스트로 고정).
3. 디스패치 프롬프트에 원 receipt·base·delta SHA와 재리뷰 트리거 문구가 들어간다.
4. 후보 카드에서 stale이 비차단 뱃지로 표시된다.
5. Pre-Handoff 번들(lint/tsc/test/prettier/build) green, 번들 커밋 포함.

## 5. 테스트

- `admission.test.js`: stale→admit+flag(`receipt_sha`·`delta_shas` 페이로드),
  `skipped@` stale 동일 동작, git 오류 시 여전히 거부, 타 사유 회귀 고정.
- `scheduler.test.js`: 디스패치 재검사 admit+flag, 프롬프트 stale 블록 주입,
  attempt 레코드 플래그.
- `app/views/worker/index.test.js`: 뱃지 렌더 전환.

## 6. 배달 순서 제약

계약(dotfiles-otgy) 선행 또는 동일 시점 배달 — 소비자(beads-ui) 단독 선행
금지. 계약이 없는 상태에서 admit+flag만 배포되면 세션이 절차 근거 없이 stale
비드를 실행하게 된다.
