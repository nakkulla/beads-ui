# 통합 설정 다이얼로그와 세션 전역 기본값(bd kv) 재설계

## 문서 상태

- owning Bead: `UI-qeiz`
- route: `full_plan`
- workflow mode: `standard`
- 사용자 설계 승인: 2026-08-16
- 기준 브랜치/SHA: `main` / `a0a8310057a6abc4aae4648680759ca3270ece76`
- cross-repo 선행 유닛: dotfiles Bead `dotfiles-7g1c` (별도 PR 유닛; `UI-qeiz`가
  blocks 의존 — external dependency readback 확인 2026-08-16)

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

### B. dotfiles 유닛 (선행, Bead `dotfiles-7g1c`)

beads-ui는 이 계약의 소비자다. canonical 정의는 dotfiles가 소유하며, 소유권
배치는 **durable 어휘·스키마 → `workflow.yaml`**, **기본값·우선순위 →
`harness.yaml`**, **판정 프로즈 → `workflow.md`**다.

1. `workflow.yaml`: `workflow_session_defaults` kv 스키마 정의 — `schema: 1`,
   허용 키는 위 표의 세션 키 12개(신설
   `impl_dispatch: {enum: [delegated, main]}` 포함), enum은 기존 metadata
   어휘와 동일하며 `impl_model`/`impl_effort`는 `auto` 리터럴을 허용한다
   (selector의 exact model/auto·effort/auto 상태). metadata `parent_keys`와
   consumer_surface에 `impl_dispatch`와 kv 키를 함께 반영한다.
2. `harness.yaml` v7: 우선순위 `현재 사용자 > Bead metadata > bd kv > harness
   기본값`과 기본값만 추가한다. 스키마는 두지 않는다.
3. `impl_dispatch` 의미(`workflow.md`): `delegated`(기본)는 기존 runtime matrix
   위임, `main`은 컨트롤러 직접 구현이며 `exec_receipt=main:user_choice@<sha>`를
   기록한다. 사용자의 durable 선택이 유효한 main 사유임을 계약 문구로 명시한다.
4. **소비자 갱신 전수 목록**: workflow `SKILL.md`·`references/execution.md`의
   selector(구현 키 소비), workflow 라우터의 `workflow_mode` 해석, `review`
   스킬(리뷰 모델·effort 키 소비), `references/plan-review.md`(plan_review 키
   소비), Claude·Codex 양쪽 런타임 스킬 복사본, 계약 checker
   (`tests/workflow_skill_contract_test.sh` 등). kv 읽기는
   `bd kv get workflow_session_defaults --json`이며 bd가 없는 워크스페이스나 kv
   부재 시 층을 건너뛴다.

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
- 개별 키 편집은 워크플로우/리뷰/구현/Worker 그룹으로 재구성한다.
- **Bead별 편집기는 모든 세션 키에서 3상태다**: `(기본)`은 metadata 삭제(kv →
  harness로 통과), 명시값은 literal 기록(kv를 덮음). 특히 `workflow_mode`는
  `standard`도 literal로 기록해 kv의 `fast_track` 전역 기본값을 Bead가 덮을 수
  있어야 한다. 명시값 선택을 삭제로 변환하는 기존 동작은
  `Bead metadata > bd kv` 규칙 위반 결함으로 보고 수정·테스트한다.

### F. 마이그레이션과 에러 처리

- 마이그레이션은 서버 시작 시 실행되며 **destination별로 멱등**이다:
  (a) kv `workflow_session_defaults`의 비어 있는 필드만 기존 preset의 세션 키로
  채우고, (b) queue의 orchestration 3키가 비어 있을 때만 preset 값으로 채우고,
  (c) preset 변환은 구현 키만 남긴 사본을 만들어 원본과 병존시킨다. 세
  destination 모두 쓰기 후 readback이 성공한 다음에만 workspace별 migration
  완료 표식을 기록하고 `default_exec_preset_id`·legacy `exec_defaults`·원본
  preset을 정리한다. 완료 표식 이전의 부분 성공 상태에서는 다음 시작에 같은
  절차가 재실행되며, 채움 전용(fill-only-empty) 규칙이라 중복 실행이 사용자
  변경을 훼손하지 않는다.
- kv 값 파싱 실패 → 그 층만 무시 + UI 경고 배너. kv 쓰기 실패 → 저장 실패
  알림 + 편집 상태 유지.

## 적용 순서와 재개 지점

각 단계는 live 검증 통과 후에만 다음으로 진행하며, 실패 시 그 단계에서 멈추고
같은 단계부터 재개한다. 중단 시점의 상태는 항상 동작 가능하다(새 kv 층은 빈
층으로 시작하므로 소비자 선행 배포가 안전하다).

1. **dotfiles PR(`dotfiles-7g1c`) 머지** — 검증: 계약 checker
   (`tests/workflow_skill_contract_test.sh` 등) 통과.
2. **런타임 스킬 복사본 동기화** — 검증: Claude·Codex 양쪽 런타임 복사본에 kv
   스키마·selector 층이 존재하고, 실제 세션 1회에서
   `bd kv get workflow_session_defaults` 경로가 해석에 반영됨을 확인. 이 시점에
   kv가 비어 있으므로 기존 동작과 동일하다.
3. **beads-ui Phase 2–4 구현·PR·머지** — 검증: Pre-Handoff Validation 전부.
4. **머지 후 배포** — 기존 `repo-ops/config.toml [deploy]` operation terminal
   success. 검증: `.worktrees/.repo-ops-deploy` HEAD가 머지 SHA 이상(descendant),
   프로세스 경로·포트·HTTP `healthz` 응답이 새 SHA 반영.
5. **마이그레이션** — 4단계 후 서버 첫 시작에서 수행(F절 멱등 규칙). 실패 시
   서버는 기존 값으로 계속 동작하고 다음 시작에 재시도한다.

순서 역전(2단계 전 beads-ui 머지) 방지는 `UI-qeiz` → `dotfiles-7g1c` blocks
의존이 담당한다.

## Test scope

RED-GREEN seam은 아래 단위이며, 각 seam은 **현존하는 테스트 파일**에 변경 전
실패하는 assertion을 추가하는 것으로 시작한다(괄호는 변경 전 실패 이유).

1. `server/bd.test.js` — bd kv get/set 어댑터: 라운드트립, 부재 시 undefined,
   파싱 실패 시 undefined+경고. (어댑터 함수 부재로 실패)
2. `server/ws/exec-settings-mutation.test.js` — session-defaults 조회/변경
   메시지: 유효 payload 저장·readback, enum 위반 거부, `workflow_mode=standard`
   literal 기록(3상태 편집 의미). (메시지 타입 부재·삭제 변환 동작으로 실패)
3. `server/worker/policy.test.js` — 세션 키 9개가 workspace 층 없이 Bead 층만
   해석되는 회귀, orchestration 3키 fail-closed 유지. (workspace 층이 값을
   공급해 실패)
4. `server/worker/scheduler.test.js` — spawn 경로에서 9키 metadata 스탬프
   미발생, `workflow_mode=fast_track` 강제 유지. (`stamped_keys` 기록 관측으로
   실패)
5. `server/worker/queue-store.test.js` — `default_exec_preset_id` 제거와
   orchestration 3키 직접 값 저장·검증. (필드 부재로 실패)
6. `server/worker/exec-preset-coordinator.test.js`,
   `server/exec-preset-store.test.js` — 멱등 마이그레이션: 부분 성공 후 재실행
   수렴, fill-only-empty, 완료 표식 후에만 원본 정리. (마이그레이션 함수 부재로
   실패)
7. `server/ws/exec-preset-apply.test.js` — 구현 프리셋 적용 두 경로(Bead
   metadata 일괄 기록, kv 기록). (구현 프리셋 형태 미지원으로 실패)
8. UI 신규 뷰(통합 다이얼로그·이슈 상세 카드)는 기존 view 테스트 관례대로
   `app/views/` 아래 신규 `*.test.js`를 RED로 추가한다. `npm run build`와
   Pre-Handoff Validation(tsc/test/lint/prettier/build)은 seam이 아니라 마감
   검증이다.

dotfiles 유닛은 `tests/workflow_skill_contract_test.sh`에 kv 층과
`impl_dispatch` 어휘 assertion을 추가하는 것을 RED로 시작한다(계약 파일에 키
부재로 실패).

## 유닛 분해 (plan 단계 초안)

1. **Phase 1 — dotfiles 계약·스킬** (선행, Bead `dotfiles-7g1c`):
   workflow.yaml kv 스키마·`impl_dispatch`, harness.yaml v7 우선순위,
   소비자 전수 갱신(B.4), 런타임 복사본 동기화.
2. **Phase 2 — beads-ui 서버·Worker**: kv 어댑터, WS protocol, policy/scheduler/
   queue-store 리팩터, 프리셋 재편, 마이그레이션.
3. **Phase 3 — 통합 설정 다이얼로그**: 다이얼로그 신설, 진입점 정리, 표시 탭
   이식, frontend-design 적용.
4. **Phase 4 — 이슈 상세 재설계**: 요약 헤더, 유효 설정 카드, 프리셋
   quick-apply, 편집 그룹 재구성.
