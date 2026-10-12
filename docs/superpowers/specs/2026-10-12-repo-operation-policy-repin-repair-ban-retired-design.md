---
scope:
  - generated/contracts/repo-operation-policy.json
  - generated/contracts/repo-operation-policy.provenance.json
  - server/worker/repo-operation-policy.test.js
  - server/worker/repo-operation-protocol.test.js
  - server/worker/resolve-session.js
  - server/ws/worker-handlers.js
  - app/views/worker/repo-ops-settings.js
  - app/views/worker/repo-operations.test.js
---

# dotfiles 자동 수리 일반 금지 폐기 반영 — 정책 사본 재고정과 금지 인용 정리 (UI-uw3b)

Bead: UI-uw3b. 선행: dotfiles-va3cr(closed 2026-10-07, nakkulla/dotfiles#567, foreign `blocks`).
기준 base: beads-ui `d95f3163c8cff911cb159f5565425c2f2d3cc366`, dotfiles `origin/main`(정책 파일 마지막 변경
`7ba0ed991639188b1f1d647819bcec3f4acbf50e`).

## 1. 목표

dotfiles가 자동 수리 세션 일반 금지를 폐기하고 "승인된 spec이 정의한 종류만" 연다로 바꿨다(현행 ADR
dotfiles/dotfiles-md59z). 그 결과 계약 산출물 `repo-operation-policy.json`의 `never_automatic`에서
`repair_session_dispatch`가 빠졌다. beads-ui는 이 산출물의 바이트 사본을 고정하는 소비자다(ADR UI-u6ud-2). 이
Bead는 사본을 새 바이트로 재고정하고, 이전 값을 단언하던 테스트와 낡은 근거를 인용하는 주석을 맞춘다.

beads-ui의 동작은 바뀌지 않는다. beads-ui에는 자동 수리 세션을 실행하는 경로가 없고, 자동으로 여는 실패 대화는
첫 답 전 읽기 전용 진단과 질문만 한다. 새 계약에서도 그 경계는 유지되고 근거만 "일반 금지"에서 "그 클래스에
정의된 자동 수리 세션 없음"으로 바뀐다.

## 2. 검증된 전제

- dotfiles 정책 파일과 beads-ui 사본의 차이는 `never_automatic`의 `repair_session_dispatch` 한 줄이다(8 → 7) —
  `git show origin/main:generated/contracts/repo-operation-policy.json`(beads-ui) 대 dotfiles 같은 경로를 `diff`로
  비교, beads-ui `generated/contracts/repo-operation-policy.json:75`
- 다른 고정 사본(`execution-defaults`·`quick-fix-handoff`·`work-recovery-policy`)은 dotfiles와 바이트가 같다 — 네 파일
  `cmp` 비교
- 새 바이트의 고정값: dotfiles 커밋 `7ba0ed991639188b1f1d647819bcec3f4acbf50e`, git blob
  `ce032fff7f50a9a0eb5c1403b327712003d644ab`, sha256
  `323f6256278c4280a5cb7d2c4dec8037cd71f43cf83629ad85baf6ad4aefd479`, 2778 bytes, `schema_version` 4 —
  `git rev-parse`·`shasum -a 256`·`wc -c`로 확인
- 로더는 bytes·sha256·git blob sha(`blob <len>\0` + bytes의 sha1)·source_commit 존재를 대조한다 —
  `server/worker/repo-operation-policy.js:122-136`
- 현재 고정값은 커밋 `5cc24322…`, blob `c9fa99fd…`, sha256 `eb3b6d9f…`다 —
  `generated/contracts/repo-operation-policy.provenance.json:4-7`
- 새 정책에도 `after_ladder_recovery.code_defect_handoff.repair_session_dispatch: "forbidden"`이 남는다 — dotfiles
  `generated/contracts/repo-operation-policy.json:60`
- beads-ui 런타임에서 `repair_session_dispatch` 토큰을 읽는 곳은 설정 화면 라벨표뿐이다 —
  `app/views/worker/repo-ops-settings.js:451`; 그 외 등장은 테스트(`git grep` 결과)
- 설정 화면은 정책이 보낸 `never_automatic` 토큰을 그대로 나열하고, 라벨표에 없는 토큰은 원문으로 그린다 —
  `app/views/worker/repo-ops-settings.js:467-478`(`:474`), `:523-527`, 테스트
  `app/views/worker/repo-operations.test.js:665-682`
- 고정값을 단언하는 테스트: `server/worker/repo-operation-policy.test.js:16-20`(커밋·blob·bytes·digest 상수, bytes
  2809), `:170-182`(목록 길이 `never_automatic: 8`), `:195-202`(`repair_session_dispatch` 포함 단언);
  `server/worker/repo-operation-protocol.test.js:263-274`(길이 8), `:276-284`(커밋 리터럴);
  `app/views/worker/repo-operations.test.js:99-108`(화면 픽스처), `:653-663`(`toHaveLength(8)`)
- 이미 대체된 ADR 0005를 금지 근거로 인용하는 주석 — `server/worker/resolve-session.js:5-7`, `:1081`,
  `server/ws/worker-handlers.js:7542-7543`
- dotfiles 현행 ADR은 실패 대화 동작 불변, F2 경계 유지, 근거만 "정의된 자동 수리 세션 없음"으로 바뀜을 적는다 —
  dotfiles `docs/adr/dotfiles-md59z-cleanup-retry-reentry-label.md:108-120`
- beads-ui 현행 ADR UI-c74x의 "ADR 0005는 그대로다. 자동으로 연 실패 대화는 수리 dispatch가 아니다" 문장은
  beads-ui 자신의 무인 수리 레인 폐기와 첫 답 전 무변경 경계를 말하며, 둘 다 여전히 참이다 —
  `docs/adr/UI-c74x-credential-wait-conversation.md:63`, `:822`

## 3. 설계

### 3.1 정책 사본 재고정

- `generated/contracts/repo-operation-policy.json`을 dotfiles `7ba0ed991…`의 같은 경로 바이트로 그대로 교체한다.
- `repo-operation-policy.provenance.json`의 `source_commit`·`source_blob_sha`·`sha256`·`bytes`를 2절 값으로 바꾼다.
  `source_repo`·`source_path`는 그대로다.
- 결정: 재고정 기준 커밋은 파일을 마지막으로 바꾼 커밋(`7ba0ed991…`)이다 — 이전 고정(`5cc24322…`)도 같은 관례다.
- 결정: 다른 세 사본은 건드리지 않는다 — 바이트가 이미 같다.

### 3.2 테스트 고정값

- 정책 테스트의 승인 상수(커밋·blob·bytes·digest)와 프로토콜 테스트의 커밋 리터럴을 새 값으로 바꾼다.
- 목록 길이 단언의 `never_automatic`을 8에서 7로 바꾼다(정책·프로토콜 테스트 둘 다).
- `repair_session_dispatch`를 포함한다고 단언하던 테스트는 새 계약 사실로 뒤집는다: 투영된 `never_automatic`에
  그 토큰이 없다. `bounded_single_script_retry_exceeded` 포함 단언은 별도 테스트로 남긴다(한 테스트 한 동작).
- 화면 테스트 픽스처의 `never_automatic`을 새 계약 7개로 맞추고 개수 단언을 7로 바꾼다.

### 3.3 설정 화면

- 라벨표에서 `repair_session_dispatch: '실패 해결 세션 자동 실행'`을 지운다. 그 토큰은 더 이상 오지 않고, 예전
  사본이 다시 오더라도 원문 표시 경로가 있다.
- 화면 구조·요약 개수 표시(`자동 N · 금지 M`)는 그대로다. 개수는 정책에서 계산되므로 `금지 7`로 바뀐다.
- `spec_defined_repair_sessions` 같은 새 계약 키를 보여 주는 면은 만들지 않는다 — beads-ui가 고정하지 않는
  계약(`needs_human_reentry`)의 키이고 beads-ui는 그 세션을 열지 않는다.

### 3.4 주석

- `resolve-session.js` 머리 주석과 자동 실패 대화 기동 주석, `worker-handlers.js`의 `[세션에서 이어가기]` 주석에서
  "ADR 0005 forbids/stays" 인용을 실제 근거로 바꾼다: 자동으로 연 실패 대화는 첫 답 전 읽기 전용 진단과 질문만
  하고, dotfiles 계약은 실패 대화 클래스에 자동 수리 세션을 정의하지 않는다(dotfiles-md59z).
- 결정: `app/utils/failure-sentences.js:92`(`repair_lane_retired`)와 `app/views/worker/pr-wait-row.js:483`
  (UI-8w4t §3 주석)은 바꾸지 않는다 — beads-ui 자신의 자동 수리 레인이 은퇴했다는 지난 사실이고 지금도 참이다.
- 결정: `app/protocol.md`는 바꾸지 않는다 — 사다리에 수리 세션 단계가 없다는 문장(`:872`)은 여전히 참이고
  목록 내용을 적지 않는다.

### 3.5 오류 처리

재고정 바이트와 provenance가 어긋나면 로더가 `supported: false`로 떨어지고 자동 재시도가 멈춘다(기존 fail-closed
경로). 수용 기준의 digest 테스트와 로더 대조가 이 실수를 잡는다.

## 4. 수용 기준

- 고정 사본이 dotfiles `7ba0ed991…`의 바이트와 같고 provenance 네 값이 2절과 같다.
- `projectRepoOperationPolicy()`가 `supported: true`, `never_automatic` 7개를 내고 `repair_session_dispatch`를
  포함하지 않는다.
- 설정 화면의 "자동으로 하지 않음" 목록이 7줄이고 "실패 해결 세션 자동 실행"이 없다.
- 위 세 주석이 ADR 0005를 근거로 인용하지 않는다.
- 실패 대화 기동·진입 블록·다이제스트 테스트 결과가 바뀌지 않는다(해당 파일 무변경).
- Pre-Handoff Validation(`npm run tsc`, `npm run lint`, prettier, 전체 vitest)이 통과한다.

## 5. 테스트

- `server/worker/repo-operation-policy.test.js`: 승인 상수 갱신, 길이 7, "drops repair-session dispatch from the
  never-automatic enum", "keeps the bounded retry ceiling in the never-automatic enum".
- `server/worker/repo-operation-protocol.test.js`: 길이 7, 커밋 리터럴.
- `app/views/worker/repo-operations.test.js`: 픽스처 7개, `toHaveLength(7)`.
- 새 seam은 없다 — 기존 digest·투영·렌더 테스트가 전부 덮는다.

## 6. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — beads-ui는 workflow 계약의 소비자다. 계약 바이트를 베껴 다이제스트로 고정하고 정의하지
  않는다.
- 전제: ADR dotfiles/dotfiles-md59z — 자동 수리 세션은 승인된 spec이 정의한 종류만 열리고, 실패 대화 클래스는 그런
  세션을 정의하지 않으며, 첫 답 전 읽기 전용 경계는 유지된다.
- 전제: ADR UI-c74x — 자동 실패 대화는 수리 dispatch가 아니라는 조항을 그대로 따른다. 그 조항은 여전히 참이라
  supersede하지 않는다(사용자 결정 2026-10-12).
- 정책 사본을 dotfiles 새 바이트로 재고정하고 테스트·라벨·주석을 맞춘다 — 되돌리기 쉽다(사본 교체와 고정값 갱신,
  계약 정본은 dotfiles 소유) → ADR 아님
