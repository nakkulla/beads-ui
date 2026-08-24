---
scope:
  - server/worker/artifact-scope.js
  - server/worker/title-cache.js
  - server/worker/runnable-cache.js
  - server/ws/worker-handlers.js
  - server/ws/monitor-handlers.js
  - app/views/worker/lanes.js
---

# quick_fix scope 선언 통합 — description `## scope`

## 1. 배경

UI-qm12가 대기/후보 레인에 선언 scope 기반 겹침 칩을 도입했다. 선언 원천은
스펙/플랜 문서의 front-matter `scope:`이고, canonical 정의는 dotfiles
`docs/contracts/workflow-state.yaml`의 `artifact_scope`
(`applies_to: [spec_id, plan_path]`)다. quick_fix는 문서 아티팩트가 없어 선언할
자리 자체가 계약에 없고, 그 결과 quick_fix bead는 겹침 판정에서 영구히
"scope 없음"으로 빠진다. Worker-dispatched quick_fix bead도 큐 레인에 올라
트리를 두고 경쟁하므로(`server/worker/quickfix-landing.js`), 겹침 정보의 공백은
실제 병렬 배치 판단을 흐린다.

사용자 결정 2026-08-24:

- quick_fix의 scope 선언 자리는 bead metadata가 아니라 **이슈 description**이다
  (metadata는 장황하고, description은 bd show와 UI 상세에서 바로 보이고 고치기
  쉽다).
- 형식은 description 안의 **`## scope` 마크다운 섹션 + `- 경로` 리스트**다.
- 작성은 **라우팅 시**(workflow 스킬 quick_fix 절차가 라우트 핀 시 열거된 표면을
  기록, 작업 중 표면이 늘면 갱신), **부재는 fail-quiet**(아무것도 막지 않음).
- 읽기 우선순위는 **아티팩트 우선, 없으면 description**(route 무관) — 한 bead의
  scope 원천은 항상 하나다.

## 2. 목표 / 비목표

목표:

- 문서 아티팩트가 없는 bead(실질적으로 quick_fix)가 description `## scope`
  선언으로 기존 겹침 파이프라인(큐 레인 `bead_scope` 스냅샷, 후보 레인 runnable
  scope, 겹침 칩·팝오버·직렬 우선 배치)에 동일하게 합류한다.
- 세 라우트의 scope가 UI의 **같은 자리**(같은 칩·같은 팝오버)에 표시된다.

비목표:

- AI 병렬성 분석 다이얼로그(`parallel-analysis-*`)의 대상 자격 변경 —
  현행 유지(spec_backed/full_plan 한정).
- spec_backed/full_plan의 선언 자리 변경 — front-matter가 계속 canonical이다.
- 겹침 의미론(`app/utils/scope-overlap.js`) 변경 — 항목 비교 규칙은 그대로다.
- dotfiles 계약·스킬 문구의 실제 편집 — 별도 단위(§8)가 소유한다. 이 spec은
  beads-ui 소비 쪽과, 그 단위가 만족해야 할 요구를 함께 고정한다.

## 3. 선언 형식 (계약 요구 — dotfiles 단위가 canonical화)

dotfiles `docs/contracts/workflow-state.yaml`에 `artifact_scope`의 형제로
description scope 규칙을 추가한다. beads-ui 파서는 아래와 일치해야 한다:

- **인식**: description의 각 줄을 trim한 값이 정확히 `## scope`인 줄(소문자만,
  heading 레벨은 `##`만). 첫 매치 하나만 읽는다.
- **수집**: 그 줄 다음부터, trim한 값이 `#`으로 시작하는 다음 줄(모든 레벨의
  heading) 또는 문서 끝 전까지. `^\s*-\s(.*)$` 매치 줄의 캡처를 trim해 항목으로
  삼는다. 다른 줄(빈 줄·산문)은 무시한다.
- **항목 규칙**: `artifact_scope.item`과 동일 — repo 상대 경로 prefix(파일 또는
  디렉터리), 빈 값·선행 `/`·선행 `:`·glob 문자(`*?[]`)·`..` 세그먼트 거부.
  무효 항목은 개별 무시(한 항목이 나머지를 죽이지 않음), 중복 제거,
  선언 순서 유지.
- **3-상태 의미**:
  - 섹션 없음 → **미선언** (겹침 판정 불가; 표시상 기존 quick_fix와 동일).
  - 섹션 있고 유효 항목 0 → **빈 선언 `[]`** ("scope 없음" 칩 — 판정 불가를
    드러냄).
  - 유효 항목 n≥1 → 그 목록이 선언 scope.
- **우선순위**: resolved `spec_id`가 있는 bead는 현행 front-matter 경로만 읽고
  description은 읽지 않는다. resolved `spec_id`가 없는 bead는 route 무관하게
  description을 읽는다. (`plan_path`만 있고 `spec_id`가 없는 bead는 현행
  `scopeArtifactsFor`가 이미 아티팩트 없음으로 취급하므로, 그대로 description
  경로를 탄다.)
- **작성 의무(스킬 쪽)**: workflow 스킬 quick_fix 절차에 라우트 핀 시 열거된
  표면을 `## scope`로 기록·갱신하는 한 줄을 추가한다. 부재는 어떤 게이트도
  막지 않는다.

### freshness 의미 한계

artifact scope는 핀된 base SHA에서 `git cat-file`로 읽는 freshness 선언이지만,
description scope는 **현재 bead 상태**에서 읽는다(핀 없음). quick_fix는 수명이
짧아 실용상 충분하다. 이 차이는 표시 의미에만 영향을 주며(선언은 쓰기 소유권이
아니라는 기존 한계 문구에 포함), 어떤 게이트 판정에도 쓰이지 않는다.

## 4. 서버 설계 (beads-ui)

### 4.1 파서 — `server/worker/artifact-scope.js`

`parseDescriptionScope(description)`를 추가한다. §3의 인식·수집·항목 규칙을
구현하고 `isValidScopeItem`을 재사용한다. 반환은 3-상태:
`null`(섹션 없음) | `string[]`(빈 배열 = 빈 선언). 입력이 문자열이 아니면
`null`.

### 4.2 title-cache — 큐 레인 원천

`recordFromIssue`가 이미 손에 있는 `bd show --json` 이슈에서
`description_scope: string[]|null`을 파싱해 record에 싣는다(추가 I/O 없음).
mutation readback(`refreshFromIssue`)·invalidate 경로를 그대로 타므로
description 수정은 기존 갱신 규칙대로 반영된다.

새 projection `descriptionScopeFor(workspace, ids)`를 추가한다: 선언이 있는
id만 `Record<bead_id, string[]>`으로 돌려준다(`null`인 record는 키 없음).

### 4.3 worker-handlers — `beadScopeFor` fallback

현행: `titles.scopeArtifactsFor`가 준 bead만 scope-cache를 peek한다. 추가:
아티팩트가 없는 id 중 `descriptionScopeFor`에 있는 id에
`out[bead_id] = { scope, artifacts: [] }`를 채운다. 스냅샷 `bead_scope`의
값 형태·3-상태 구분(NO ENTRY/`{scope: []}`/`null`)은 현행 그대로이고,
description 원천은 `null`(읽기 실패) 상태를 만들지 않는다 — 파싱은 로컬이고
실패 개념이 없다(무효는 무시, 부재는 미선언).

### 4.4 monitor-handlers — runnable(후보 레인) fallback

`runnable-cache`의 행 projection에 `description_scope`를 추가한다(행 원천
JSON의 `description`에서 §4.1 파서로; `spec_id`가 있으면 싣지 않는다).
`withRunnableScope`는 현행대로 `spec_id` 있는 행만 scope-cache를 peek하고,
`spec_id` 없는 행은 `description_scope`가 배열이면 그 값을 `scope`로 복사한다.
push payload에는 `scope` 하나만 실리고 `description_scope` 원필드는 행 복사에서
제거한다. 미선언 행은 현행처럼 `scope` 필드 없음(판정 불가)이다.

### 4.5 겹침 계산

변경 없음. `bead_scope`/runnable `scope`에 항목이 생기는 순간 클라이언트의
기존 파생(`app/utils/scope-overlap.js`, `declaredScopeOf`)이 그대로 겹침을
계산한다. artifact 선언과 description 선언 사이의 겹침도 같은 항목 비교로
자동 성립한다.

## 5. 클라이언트

- 겹침 칩·팝오버·+N 접기·직렬 우선 배치 로직 변경 없음.
- `dependencyChipsTemplate`(`app/views/worker/lanes.js`)의 `scope 없음` 툴팁
  문구만 라우트 중립으로 수정:
  "겹침 판정 불가 — 스펙에 scope 선언 필요" →
  "겹침 판정 불가 — 스펙 front-matter 또는 description `## scope` 선언 필요".

## 6. 에러 처리

전부 fail-quiet, 어떤 경로도 차단하지 않는다:

- 파서 입력 이상(비문자열·섹션 없음) → 미선언.
- 무효 항목 → 개별 무시(기존 artifact 파서와 같은 로그 수준).
- `descriptionScopeFor`/runnable projection 내부 오류 → 해당 bead만 미선언으로
  강등, 스냅샷 push는 계속된다(기존 `beadScopeFor`의 try/catch 관례).

## 7. 테스트

- `artifact-scope.test.js`: `parseDescriptionScope` — 섹션 부재 `null` / 빈
  섹션 `[]` / 유효 목록 / 무효 항목 개별 무시 / 다음 heading 경계(`###` 포함) /
  두 번째 `## scope` 무시 / `## Scope`(대문자) 불인식 / 비문자열 입력.
- `title-cache.test.js`: record에 `description_scope` 파싱,
  `descriptionScopeFor`가 선언 있는 id만 반환, `refreshFromIssue` 후 갱신.
- `worker-handlers.bead-scope.test.js`: 아티팩트 있는 bead는 front-matter만
  (description 무시 — 우선순위), 아티팩트 없는 bead는 description으로
  `{scope, artifacts: []}`, 미선언 bead는 NO ENTRY 유지.
- `runnable-cache.test.js` / `monitor-handlers.test.js`: spec 없는 runnable 행의
  `scope` 투영, 미선언 행 판정 불가 유지, payload에 `description_scope` 원필드
  부재.
- 클라이언트: 기존 겹침 칩 테스트에 quick_fix(빈 `artifacts`) 케이스 추가,
  툴팁 문구 갱신 반영.

## 8. 작업 단위와 의존

- **이 Bead (beads-ui UI-f1qy, spec_backed)**: §4–§7 전부.
- **dotfiles rig의 형제 단위 (dotfiles-vbta, quick_fix)**: `workflow-state.yaml`에
  §3의 description scope 규칙 추가 + workflow 스킬 quick_fix 절차에 작성 의무 한
  줄. 이 spec이 두 단위의 공동 근거이고 소비가 fail-quiet라 착륙 순서는
  무관하다. cross-rig 의존 edge는 게이트가 없으므로 만들지 않고
  (`cross_workspace` 규약), 양쪽 description이 상대 ID를 기록한다.

## 9. 구현 unit 후보 (advisory)

- server: `server/worker/artifact-scope.js` + `server/worker/title-cache.js` +
  `server/worker/runnable-cache.js` + `server/ws/worker-handlers.js` +
  `server/ws/monitor-handlers.js`
- client: `app/views/worker/lanes.js` (문구 1건 + 번들 재생성)

변경량이 작아 단일 unit으로 봉인해도 무방하다.
