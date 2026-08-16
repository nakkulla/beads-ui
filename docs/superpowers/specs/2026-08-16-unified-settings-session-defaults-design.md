# 통합 설정 다이얼로그와 세션 전역 기본값(bd kv) 재설계

## 문서 상태

- owning Bead: `UI-qeiz`
- route: `full_plan`
- workflow mode: `standard`
- 사용자 설계 승인: 2026-08-16
- 기준 브랜치/SHA: `main` / `a0a8310057a6abc4aae4648680759ca3270ece76`
- cross-repo 선행 유닛: dotfiles 계약·workflow 스킬 (실행 시작 시 dotfiles
  워크스페이스에 companion Bead 생성)

## 배경과 판정

현재 12개 exec 키는 두 채널로 전달된다.

1. `orchestration_model/effort/speed` 3개는 Worker가 세션 spawn 시 CLI 플래그로
   직접 전달한다 (`server/worker/scheduler.js:3786-3802`,
   `server/worker/runner/{claude,codex}.js`). 소비자는 Worker뿐이다.
2. 나머지 9개(리뷰 모델·effort 6개, `impl_runtime/model/effort`)는 Worker가
   workspace 기본값에서 온 값을 spawn 직전 Bead metadata에 스탬프하고
   (`scheduler.js:3468-3511`), 세션의 workflow 스킬이 metadata에서 스스로 읽는다
   (`policy.js:245-246`).

따라서 Worker 경유 세션은 workspace 기본값을 받지만, **터미널에서 직접 여는
대화형 세션은 스탬프가 없으면 harness 기본값으로 떨어진다.** 또한 스탬프는
기본값의 낡은 복사본을 Bead에 남겨, 이후 전역 기본값을 바꿔도 이미 스탬프된
Bead에는 반영되지 않는다.

`bd kv`는 beads DB 안의 워크스페이스 단위 key-value 저장소로, UI 서버·Worker
세션·대화형 세션이 이미 같은 DB를 공유한다. 전역 세션 기본값의 단일 소스로
적합하다.

설정 UI는 표시 설정 다이얼로그, Worker 탭의 전역 실행 설정(12키 프리셋),
인라인 토글로 흩어져 있고, Worker 전용 키와 세션 소비 키가 한 블록에 섞여
있다. 사용자는 Worker 설정 단순화, 통합 설정 다이얼로그, 이슈 상세의 한눈
요약, 구현 프리셋을 요청했다.

## 사용자 결과

1. 내비 바 ⚙ 하나로 통합 설정 다이얼로그가 열리고 `세션`/`Worker`/`표시` 세
   탭에서 모든 전역 설정을 편집한다.
2. 세션 탭에서 바꾼 워크플로우 모드·리뷰 모델·구현 설정 전역 기본값은
   **대화형 세션과 Worker 세션 모두에** 즉시 적용된다. Bead에 핀이 있으면
   핀이 이긴다.
3. 이슈 상세에서 구현 모델을 바꾸면(Bead metadata) 어느 세션이든 그 설정으로
   진행된다 — Bead metadata가 세션 설정의 SoT다.
4. 이슈 상세는 상단 요약(상태·route·게이트 스텝퍼·PR·`exec_receipt`)과 유효
   실행 설정 카드(값 + 출처 배지)로 한눈에 읽힌다.
5. 구현 방식(위임/메인, runtime, 모델, effort, 속도)을 구현 프리셋으로
   저장하고, 이슈 상세에서 Bead별 적용 또는 세션 탭에서 전역 기본값 적용을
   선택할 수 있다.
6. Worker 설정은 orchestration 모델·effort·속도와 slots만 남는다.

## 목표

1. dotfiles 계약에 워크스페이스 세션 기본값 층(bd kv)과 `impl_dispatch` 키를
   추가하고, workflow 스킬 selector가 이를 읽게 한다.
2. beads-ui에서 세션 키 9개의 workspace 기본값 층과 spawn 전 스탬프를 제거하고
   bd kv 단일 소스로 이전한다.
3. 통합 설정 다이얼로그와 이슈 상세를 frontend-design 기반으로 재설계한다.
4. 12키 프리셋을 구현 프리셋(`impl_dispatch/runtime/model/effort/speed`)으로
   재편하고 기존 상태를 비파괴 마이그레이션한다.

## 비목표

- Worker 디스패치의 `fast_track` 강제(metadata + 프롬프트 지시문)는 바꾸지
  않는다. kv의 `workflow_mode` 기본값은 대화형 세션에만 실질 영향을 준다.
- harness 기본값을 beads-ui에 복제하지 않는다. 전역 기본값이 없는 키는
  "(harness 기본)" 플레이스홀더로만 표시한다.
- 게이트 영수증(`spec_review`/`impl_review`/`exec_receipt`)의 편집 UI는 만들지
  않는다 (표시 전용 유지).
- automation/auto-repair 토글은 메인 앱 Worker 화면의 인라인 운영 스위치로
  유지한다 (설정 다이얼로그로 이동하지 않음).

## 설계

### A. 소유권과 해석 순서

| 구분 | 키 | 저장소 | 소비자 |
|---|---|---|---|
| 세션 전역 기본값 | `workflow_mode`, `spec/plan/impl_review_model`·`_effort`, `impl_dispatch`(신설), `impl_runtime/model/effort/speed` | `bd kv` 키 `workflow_session_defaults` (JSON 1개, 스키마는 dotfiles 계약 소유) | workflow 스킬(대화형·Worker 세션), beads-ui UI |
| Bead별 핀 | 위와 같은 키 | Bead metadata (기존) | 세션 selector — kv보다 우선 |
| Worker 설정 | `orchestration_model/effort/speed`, `slots` | beads-ui `queue.json` (프리셋 참조 제거, 값 직접 저장) | Worker scheduler |

세션 해석 순서는 `세션 중 사용자 지시 > Bead metadata > bd kv 전역 기본값 >
harness 기본값`이다. 값이 없는 키는 다음 층으로 통과한다. kv의 개별 값이
enum을 벗어나면 그 키만 무시하고 경고한다(전역 기본값 층은 명시 핀이 아니므로
fail-quiet). `impl_speed`는 기존 규칙대로 현재 사용자의 명시 선택만 metadata에
기록하며, kv 기본값은 적용만 하고 기록하지 않는다.

**런타임과 오케스트레이션의 의미 구분.** 오케스트레이터(세션을 띄우는
클라이언트, `claude -p`/`codex exec`)는 `orchestration_model`이 속한
카탈로그에서 유도되며 별도 키가 없다(`policy.js`의 derived runner).
`impl_runtime`은 구현 위임 leg가 컨트롤러 세션 기준으로 어느 런타임에서
도는지(inherit/claude/codex)를 명시한다. UI는 두 그룹 모두 **런타임 → 모델 →
effort 순 종속 선택**으로 통일해 제시하되, 오케스트레이션 쪽 런타임 선택은 UI
그룹핑(모델 목록 필터)일 뿐 새 키를 만들지 않는다.

### B. dotfiles 유닛 (선행)

beads-ui는 이 계약의 소비자다. 아래는 dotfiles 쪽 요구사항이며 문구·스키마의
canonical 정의는 dotfiles `docs/contracts/workflow.{md,yaml}`,
`docs/contracts/harness.yaml`이 소유한다.

1. `harness.yaml` v7: 우선순위에 workspace kv 층 추가.
   `workflow_session_defaults` JSON 스키마 정의 — `schema: 1`, 허용 키는 위 표의
   세션 키 12개(신설 `impl_dispatch` 포함), enum은 기존 metadata 어휘와 동일.
   `impl_model`/`impl_effort`는 `auto` 리터럴을 허용하며 selector의 exact
   model/auto·effort/auto 상태에 대응한다.
2. `workflow.yaml`: `parent_keys`에 `impl_dispatch: {enum: [delegated, main]}`
   추가, consumer_surface에 kv 키 반영.
3. `impl_dispatch` 의미: `delegated`(기본)는 기존 runtime matrix 위임, `main`은
   컨트롤러 직접 구현이며 `exec_receipt=main:user_choice@<sha>`를 기록한다.
   사용자의 durable 선택이 유효한 main 사유임을 계약 문구로 명시한다.
4. workflow 스킬 `references/execution.md` selector 절: 해석 시
   `bd kv get workflow_session_defaults --json`을 읽는 층을 추가한다. bd가 없는
   워크스페이스나 kv 부재 시 층을 건너뛴다.
5. 런타임 스킬 복사본(`~/.claude/skills/workflow/resources/*`)과 소비자 동기화.

### C. beads-ui 서버·Worker

1. **kv 어댑터**: 기존 bd 실행 경로(`deps.bd`)에 kv get/set을 추가한다.
2. **WS protocol**: `session-defaults` 조회/변경 메시지 신설, 기존
   `exec-preset-*`·`worker-queue-set-default-exec-preset`은 구현 프리셋과 Worker
   설정 값 직접 저장으로 재편한다. bd kv에는 CAS가 없으므로 저장 직전 재조회
   후 last-write-wins로 한다.
3. **`policy.js`**: 세션 키 9개의 `ExecDefaultsLayer`를 제거하고 orchestration
   3키만 workspace 값(fail-closed 검증 유지)으로 해석한다.
4. **`scheduler.js`**: spawn 전 9키 스탬프(`stamped_keys`) 로직을 제거한다.
   `workflow_mode=fast_track` 강제와 orchestration CLI 전달은 유지한다.
5. **`queue-store.js`**: `default_exec_preset_id`와 legacy `exec_defaults` 맵을
   제거하고 orchestration 3키를 값으로 직접 저장한다. `slots`는 기존 유지.
6. **프리셋 저장소**: 구현 프리셋(`impl_dispatch/runtime/model/effort/speed`)
   전용으로 재편. 적용 API 둘 — Bead metadata 일괄 기록(이슈 상세), kv 기록
   (세션 탭 "전역 기본값으로 적용").

### D. 통합 설정 다이얼로그

- 진입점 하나: 내비 바 ⚙ → 통합 설정 다이얼로그. 기존 표시 설정 버튼과
  메인 앱 Worker 화면의 ⚙(전역 실행 설정 진입점)는 제거한다.
- **세션 탭**: 워크플로우 모드(standard/fast_track 세그먼트), 리뷰 게이트 3행
  (spec/plan/impl — 모델+effort 쌍), 구현 그룹, 구현 프리셋 선택/저장/삭제와
  "전역 기본값으로 적용".
- **구현 그룹 구조**: 실행 방식(위임/메인) → 위임 대상(inherit/claude/codex)
  → 모델·effort(각각 `자동` 포함, 목록은 위임 대상에 종속) → 속도. `메인`
  선택 시 위임 대상 이하 행은 비활성화된다(컨트롤러 직접 구현). `자동`은
  selector의 model/auto·effort/auto 상태로, 작업 성격에 따른 티어 배정을
  뜻한다.
- **Worker 탭**: 오케스트레이션 런타임(claude/codex) → 모델 → effort → 속도
  순 종속 선택과 slots. 런타임은 모델 목록 필터일 뿐 저장 키는 기존
  `orchestration_model`이며 실행 클라이언트는 모델 카탈로그에서 유도된다.
- **표시 탭**: 기존 라벨/칩 표시 정책 UI 이식.
- 시각 디자인은 구현 단계에서 frontend-design 스킬로 작업한다. 스펙은 정보
  구조와 상호작용만 고정한다.

### E. 이슈 상세 재설계

- 상단 요약 헤더: 상태 · route · 게이트 진행 스텝퍼(spec 리뷰 → 구현 → impl
  리뷰 → PR, 영수증 결속 여부) · PR 링크 · `exec_receipt` 칩.
- 유효 실행 설정 카드: 합성 결과 한 줄 요약 + 키별 출처 배지 —
  `핀`(Bead metadata) / `전역`(kv) / `기본`(harness, 값 미표시). 펼치면 편집.
- 구현 프리셋 quick-apply: 프리셋 선택 → 구현 키 5개를 Bead metadata에 일괄
  기록.
- 개별 키 편집은 워크플로우/리뷰/구현/Worker 그룹으로 재구성하고 "(기본)"
  선택 시 핀 해제를 유지한다.

### F. 마이그레이션과 에러 처리

- 서버 시작 시 1회: kv에 `workflow_session_defaults`가 없고 workspace에 기존
  프리셋 참조(또는 legacy `exec_defaults`)가 있으면 — 세션 키 9개를 kv로,
  orchestration 3키를 queue 값으로 이전하고, 프리셋들은 구현 키만 남긴 구현
  프리셋으로 변환한다. 원본 정리는 변환 성공 후에만 수행한다(비파괴, 실패 시
  다음 시작 때 재시도).
- kv 값 파싱 실패 → 그 층만 무시 + UI 경고 배너. kv 쓰기 실패 → 저장 실패
  알림 + 편집 상태 유지.

## Test scope

RED-GREEN seam은 아래 단위다.

1. kv 어댑터: get/set 라운드트립, 부재·파싱 실패 시 undefined 반환.
2. session-defaults WS 핸들러: 유효 payload 저장·readback, enum 위반 거부.
3. `policy.js` 리팩터: 세션 키 9개가 workspace 층 없이 Bead 층만 해석되는 회귀,
   orchestration 3키 fail-closed 유지.
4. `scheduler.js`: spawn 경로에서 9키 metadata 스탬프가 더 이상 발생하지 않음,
   `workflow_mode=fast_track` 강제 유지.
5. 마이그레이션: 기존 preset 참조/legacy 맵 → kv+queue 값+구현 프리셋 변환,
   실패 시 원본 보존과 재시도 가능성.
6. 프리셋 적용: Bead metadata 일괄 기록 경로와 kv 기록 경로.
7. UI는 `npm run build` 성공과 기존 테스트 관례를 따른다. 마감 전
   Pre-Handoff Validation(tsc/test/lint/prettier/build) 전부 통과.

dotfiles 유닛은 계약 문서·스킬 갱신으로, 해당 저장소의 계약 checker가 있으면
통과를 검증한다.

## 유닛 분해 (plan 단계 초안)

1. **Phase 1 — dotfiles 계약·스킬** (선행, dotfiles 워크스페이스 companion
   Bead): harness.yaml v7, workflow.yaml `impl_dispatch`, execution.md selector
   kv 층, 런타임 복사본 동기화.
2. **Phase 2 — beads-ui 서버·Worker**: kv 어댑터, WS protocol, policy/scheduler/
   queue-store 리팩터, 프리셋 재편, 마이그레이션.
3. **Phase 3 — 통합 설정 다이얼로그**: 다이얼로그 신설, 진입점 정리, 표시 탭
   이식, frontend-design 적용.
4. **Phase 4 — 이슈 상세 재설계**: 요약 헤더, 유효 설정 카드, 프리셋
   quick-apply, 편집 그룹 재구성.
