---
scope:
  - server/spec-id.js
  - server/workflow-enrich.js
  - server/worker/runnable-cache.js
  - server/worker/attach.js
  - app/views/worker/index.js
  - app/views/monitor/lanes.js
  - app/views/detail-panel/artifacts.js
---

# spec 증거 소비 정합 — published=receipt 판정·stepper 2단계·필터 정렬

- 날짜: 2026-08-24
- Bead: UI-vb7u
- 설계 SoT: dotfiles `docs/superpowers/specs/2026-08-24-spec-vocabulary-unification-design.md`
  @ 2234928f0af2915732b781cef5613f3c57e38bd2 (dotfiles-t735, spec_review
  codex@2234928f…). 이 spec은 그 §2 predicate와 §6 소비자 지시를 beads-ui
  표면에 적용하는 소비자 spec이며, 어휘를 재정의하지 않는다.

## 1. 목적과 배경

dotfiles-t735가 native `spec_id`를 draft 시점부터 기록하는 단일 키로 통합하고
발행 판정을 `spec_review` receipt 유효성으로 옮긴다. beads-ui는 그 실행 순서
2단계(스킬 전환보다 **선행** 랜딩)로, "spec 존재 = 발행"을 가정하는 표시·판정
표면을 published(=receipt) 기준으로 교체한다. 새 판정은 구계약 데이터와도
호환된다(구모델에서 spec_id는 발행 시점에만 존재했고 receipt가 즉시 따랐다).

2026-08-24 소비처 전수 조사 결과, 표면별 현황은 다음과 같고 이 spec의 변경
범위를 결정한다:

- **이미 정합(변경 없음)**: 머지 게이트 `merge-gate.js reviewReceiptState()`는
  native `issue.spec_id` 직접 판독 + `spec_review` 별도 검증 — 새 모델과 이미
  일치. worker 자동실행 큐 `runnable-cache.js qualify()`의 자격 조건은 receipt
  형식(`ADMISSION_RECEIPT_RE`) 무효 시 이미 부적격(null)이라 불변(투영 스키마만
  §3에서 확장). `admission.js`, `attach.js`의 큐 스냅샷 경로(267-268행,
  `resolveSpecId` 경유), `parallel-analysis-targets.js`(spec_review 요구 기존),
  `head-review-transport.js`(표시 전용), `app/views/board/stepper.js`(glyph
  `skip`·`⊘` 렌더 기지원) 불변.
- **변경 대상**: `resolveSpecEvidence`(발행을 경로 존재로만 판정),
  `workflow-enrich.js specStage()`(published-무receipt를 full로 렌더),
  후보 큐 클라이언트 미러(`app/views/worker/index.js` — `has_spec`만 판정),
  모니터 spec 필터·정렬(`app/views/monitor/lanes.js` — `!!spec_id`),
  `attach.js beadFacts()`(609-633행 — `spec_id`를 metadata 전용
  `readMetadata()`로 읽어 sweep 후 native-only Bead의 repair 세션 `Test scope`
  경로가 소실됨), `app/views/detail-panel/artifacts.js`(draft 배지를
  `resolveSpecDraft source==='draft'`로만 판정해 native-무receipt 조합을
  non-draft로 표시 — §2 완전 분할 위반).

## 2. 판정 정의 (t735 §2의 소비)

- receipt 형식 유효성은 기존 `ADMISSION_RECEIPT_RE`와 동일 기준을 공유한다:
  `<reviewer>@<full-40-hex>` 또는 `skipped@<full-40-hex>`. 도달성·ancestor 등
  심층 유효성은 기존처럼 admission/stale 프로브 소유이며 표시 판정은 형식
  유효성 + 기존 stale 프로브 결과를 쓴다.
- `resolveSpecEvidence(issue)` 재정의 — 완전 분할, published 우선:
  - `published := spec_id 경로 존재 ∧ spec_review 형식 유효`
  - `draft := spec_id 경로 존재 ∧ ¬(spec_review 형식 유효)` — 부재·형식 불량
    포함. 전환기에는 `spec_path`-만 있는 행도 draft(기존 `resolveSpecDraft`
    폴백 유지; 제거는 UI-mgw5 소유).
  - `none := 경로 부재`
  - 반환에 `skipped: boolean`(유효한 `skipped@` receipt) 추가.
- 게이트의 비유효 receipt fail-closed(admission·merge gate)는 표시 강등과
  무관하게 기존 그대로다.

## 3. 표면별 변경

- `server/spec-id.js` — `resolveSpecEvidence`를 §2대로 재정의(입력은 기존과
  같은 issue 전체; `metadata.spec_review`를 읽는다). `resolveSpecId`/
  `resolveSpecDraft`는 불변(dual-read·spec_path 제거는 UI-mgw5).
- `server/workflow-enrich.js specStage()` — evidence 소비를 2단계로:
  `published` → `fill:'full'` + glyph(리뷰 ✓; `skipped`면 skip 표기),
  `draft` → 기존 draft 경로(문서 실존 확인 후 `dim`, 아니면 `none`),
  `none` → `none`. 현행 "published인데 receipt 없으면 glyph 없는 full" 분기는
  새 모델에서 존재하지 않는 상태이므로 제거된다. stale 표시는 기존 프로브
  결과 그대로.
- `app/views/board/stepper.js` — **변경 없음**: glyph `skip`(⊘ 렌더)을 이미
  지원한다. 서버(`specStage`)가 유효한 `skipped@`에서 기존 `skip` glyph 값을
  내보내는지 검증만 한다.
- `app/views/worker/index.js` — 후보 큐 클라이언트 미러의 `eligible` 판정을
  서버 authoritative(qualify)와 같은 기준(published)으로 정렬: `has_spec` 대신
  evidence 기반, 새 사유 문자열 `spec 미발행(draft)`(spec_id는 있으나 receipt
  없음)을 기존 `spec 없음`과 구분해 표시. spec-우선 정렬 파티션도 published
  기준으로.
- `server/worker/runnable-cache.js` — **자격 조건 불변**. `RunnableItem` 투영
  스키마와 반환값에만 `published` 필드(qualify가 이미 판정한 receipt 형식
  유효성의 투영)를 추가한다.
- `app/views/monitor/lanes.js` — spec 필터(`with`/`without`)와 `repo_spec`
  정렬의 판정을 `!!spec_id`에서 투영 `published` 필드로 교체(레인 쪽 재계산
  금지 원칙 유지).
- `server/worker/attach.js beadFacts()` — issue 전체를 읽어
  `resolveSpecId(issue).path`로 `spec_id`를 전달하도록 교체(현재 metadata 전용
  조회는 sweep 후 native-only Bead에서 빈 값). 큐 스냅샷 경로(267-268행)는
  불변.
- `app/views/detail-panel/artifacts.js` — draft 배지 판정을
  `resolveSpecEvidence().evidence`로 교체해 native-무receipt 조합도 draft로
  표시. `spec_path` 폴백 자체는 전환기 유지(제거는 UI-mgw5).

## 4. 제외

- `resolveSpecId`의 metadata dual-read·`resolveSpecDraft`의 spec_path 판독
  제거 — UI-mgw5(sweep 완료 후).
- 머지 게이트·admission·attach 큐 스냅샷 경로·parallel-analysis·
  head-review-transport·stepper 소스 변경(§3의 `beadFacts()`만 예외).
- AGENTS.md의 계약 표면 서술 문구 갱신은 이 Bead의 문서 변경으로 포함하되,
  계약 정의는 dotfiles 소유임을 유지한다.

## 5. 검증

- 유닛(focused): `resolveSpecEvidence` 완전 분할·skipped 플래그, `specStage`
  2단계 매핑(published-무receipt 상태 소멸, 유효 `skipped@` → 기존 `skip`
  glyph), 후보 미러 사유 구분(`spec 없음`/`spec 미발행(draft)`)과 published
  우선 정렬 파티션, runnable `RunnableItem`의 `published` 투영 필드, 모니터
  spec 필터와 `repo_spec` 정렬의 `published` 판정, `attach.js beadFacts()`
  native-only 회귀(sweep 후 metadata 없는 Bead에서 spec 경로 전달),
  `artifacts.js` native-무receipt draft 배지와 전환기 `spec_path` 폴백 유지.
  기존 테스트 중 "published=경로 존재" 가정 테스트는 새 계약대로 조정한다.
- Pre-Handoff: `npm run tsc`·`npm test`·`npm run lint`·`npm run prettier:write`·
  프론트엔드 변경이므로 `npm run build`(번들 포함).
- 랜딩 완료 검증(t735 §7-2): PR 머지 + repo-ops `[deploy]` terminal success +
  공유 서버 healthz가 머지 SHA로 응답 + 실데이터(발행·draft·skip 각 1행 이상)
  표시가 새 predicate와 일치함을 확인.
