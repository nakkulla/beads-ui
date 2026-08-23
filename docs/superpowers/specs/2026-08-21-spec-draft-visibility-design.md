---
scope:
  - app/views/detail-panel/artifacts.js
  - server/spec-id.js
---

# spec draft visibility — 발행 전 spec draft를 상세 패널에서 연다

## 배경과 목적

상세 패널 Artifacts 섹션은 `spec_id`(native/metadata)와 `plan_path`에서 행을
만든다. plan은 authoring 초기에 `plan_path`가 핀되어 draft부터 보이지만, spec은
발행 완료 시점에만 기록되는 `spec_id`가 유일한 포인터라 발행 전 draft를 열 수
없다. dotfiles 계약에 authoring 시점 수명 전체 경로 키 `spec_path`가 도입되므로
(dotfiles `docs/superpowers/specs/2026-08-21-spec-path-authoring-metadata-design.md`),
UI가 이를 소비해 spec도 draft 단계부터 열리게 한다.

`/api/doc`은 워크스페이스 체크아웃 워킹트리를 읽으므로 uncommitted draft도 기존
경로 안전 검증(`docs/` 하위, `.md`, 1 MiB) 그대로 서빙된다. 서버 라우트 변경은
없다.

## 설계

### 1. 경로 해석 (`server/spec-id.js`)

draft 해석은 명시적 opt-in이다: `resolveSpecId(issue)`의 기본 동작(native
`issue.spec_id` → metadata `spec_id`, conflict 규칙 포함)은 바이트 하나
바꾸지 않고 유지하여 `workflow-enrich.js` 등 기존 호출자가 영향을 받지
않게 한다. opt-in 형태(옵션 인자 또는 별도 함수)는 구현 재량이되, opt-in
호출에서만 셋째 소스 metadata `spec_path`가 `source: 'draft'`로 해석된다.
opt-in 호출에서도 `spec_id`가 존재하면 `spec_path` 값과 달라도 `spec_id`가
이긴다.

### 2. 표시 (`app/views/detail-panel/artifacts.js`)

- `collectArtifacts`가 draft 해석 결과를 `kind: 'spec'` 행으로 포함하고, plan의
  `plan_pending`과 같은 방식의 상태 필드로 draft 여부를 실어 나른다.
- 렌더링은 draft 행에 배지(예: `draft`)를 붙이는 것 외에 기존과 동일: 경로 클릭
  = 복사, "열기" = 기존 md 뷰어. 뷰어는 `/api/doc`을 그대로 사용하므로 파일이
  수정되면 다시 열 때 최신 내용이 보인다.
- 파일이 아직 없거나 지워진 draft 경로는 뷰어의 기존 404 처리로 표시한다. 신규
  에러 경로를 만들지 않는다.
- `spec_path`가 없으면 아무것도 추가하지 않는다(fail quiet). dotfiles 선행 배포
  없이도 이 변경은 무해하게 동작한다.

### 3. 게이트 불참

`spec_path`는 표시 전용이다. `workflow-enrich.js`의 stage 판정 등 발행 증거를
전제로 하는 로직은 종전대로 `spec_id`/`spec_review`만 사용하며 이 spec에서
변경하지 않는다. draft opt-in을 `artifacts.js`에서만 활성화하는 §1의 설계가
이를 구조적으로 보장하고, 수용 기준 4의 회귀 테스트가 고정한다.

`2026-08-23-stepper-spec-draft-stage-design.md` §2가 표시(`fill`)의 draft 단계를
도입해 stepper spec 칸이 draft에서 `dim`이 됐지만, 게이트·stale·Worker admission의
발행 증거 전용 판정은 그대로이며, 수용 기준 4가 가리키는 회귀 테스트는 그 spec
§6의 새 테스트로 대체됐다.

## 제외 범위

- 서버 라우트·경로 안전 정책 변경 없음.
- 리뷰 코멘트·승인 등 UI 액션 없음(읽기 전용 뷰).
- `workflow-enrich.js` stage 판정 변경 없음 — 이후 `2026-08-23-stepper-spec-draft-stage-design.md` §2가 표시용 draft 단계만 추가했고 게이트·stale 불참은 유지된다.

## 수용 기준과 검증

1. `spec_id` 없이 metadata `spec_path`만 있는 issue의 상세 패널에 draft 배지가
   붙은 spec 행이 뜨고, "열기"로 워킹트리의 uncommitted 파일 내용이 렌더된다.
2. `spec_id`가 있으면 `spec_path`와 무관하게 기존 발행본 행만 뜬다(중복 행
   없음).
3. `spec_path` 부재 시 기존과 동일한 출력(회귀 없음).
4. `spec-id.test.js`·`artifacts` 관련 vitest가 위 세 경우를 커버하고,
   metadata `spec_path`만 있는 issue에서 `workflow-enrich.js`의 spec stage가
   기존과 동일하게 유지되는(draft를 발행된 spec처럼 취급하지 않는) 회귀
   테스트가 있으며, 저장소 테스트 스위트가 통과한다.
5. 배포 후 공유 beads-ui에서 1번을 실제 draft Bead로 확인한다.
