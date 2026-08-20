# 세션 이력 effort 표시 설계

Bead: UI-3nf9 · route: spec_backed

## 배경

세션 이력(상세 패널 `session-history`)의 두 행 유형이 모두 effort를 보여주지
못한다. 2026-08-20 실측 기준:

1. **orchestrator 행(`claude · opus`)** — 표시 경로(`formatAttemptTuple`)는
   이미 `attempt.effort`를 렌더링한다. 비는 이유는 데이터다. Worker는
   `orchestration_effort`가 명시 설정된 경우에만 `--effort`를 claude에 넘기고
   attempt에 기록하며, 미설정이면 `null`을 기록한다(claude 자체 기본값으로
   실행되고 Worker는 그 값을 모른다). Worker가 보관하는 stream-json 세션
   로그의 `system/init`·`result` 이벤트에는 effort가 없다(실측: `"effort"`
   매치는 슬래시 명령 목록뿐). 반면 claude 자체 세션 파일
   `~/.claude/projects/<munged-cwd>/<session_id>.jsonl`의 `assistant` 레코드는
   실행 effort를 담는다(실측: `"effort":"high"`).
2. **codex 위임 레그(`implementation codex · gpt-5.6-sol`)** — 생산자인
   dotfiles `codex-runner-bridge`는 effort를 안다(`--effort` 인자, manifest의
   `requested_effort`/`actual_effort` 동일성 검증까지 있다). 그러나 전달
   채널인 `codex-delegation-monitor-v1` 스트림 라인과 `codex-usage-receipt-v1`
   영수증 스키마에 effort 필드가 없고, 생산자(binding)·소비자(파서) 양쪽 모두
   exact-key 검증이라 필드 추가는 두 저장소를 함께 고치는 계약 변경이다.

사용자 확정 범위: 두 표면 모두. 과거 기록은 effort 부재 시 표시 생략
(fail-quiet).

## 목표

- codex 위임 레그 행과 transcript drawer 헤더에 `codex · <model> · <effort>`를
  표시한다 — 라이브 모니터 행과 durable 영수증 행 모두.
- orchestrator 행에 실제 실행 effort를 표시한다 — 명시 설정이 없어도 claude
  세션 파일에서 관측해 채운다.
- 소비자(beads-ui)가 effort 유무 두 형태를 모두 수용하도록 먼저 배포하고, 그
  다음 생산자(dotfiles)가 내보낸다. 구 기록·구 스트림은 계속 유효하다.

## 비목표

- 스키마 id 개명 없음: `codex-delegation-monitor-v1`, `codex-usage-receipt-v1`
  id는 유지하고 effort를 소비자 관점 선택 키로 추가한다(신규 생산자는 항상
  기록).
- 실행 의미 불변: Worker의 `--effort` 전달 조건, 게이트/선택기 어휘, effort
  해석 우선순위(dotfiles `docs/contracts/harness.yaml` 소유)는 바꾸지 않는다.
- 세션 중 effort 변경(`/effort`) 이력 추적 없음 — 최초 관측값 하나만 기록한다.
- codex runner orchestrator attempt의 effort 관측 없음(관측원이 없다;
  fail-quiet 유지). 병렬 분석 다이얼로그·실행 설정 UI 변경 없음.
- 표시 규칙 자체는 기존 관례를 따른다: 값이 없으면 요소를 렌더링하지 않는다.

## 1. codex 위임 레그 — 계약 확장 (dotfiles 생산자 + beads-ui 소비자)

### 1.1 생산자 (dotfiles `src/shared/skills/tools/codex-runner-bridge/`)

별도 quick_fix Bead로 dotfiles rig에 등록하고 UI-3nf9를 foreign `blocks`
블로커로 연결한다(§3 배포 순서). 변경 파일:

- `scripts/delegation_monitor.py` — `binding_for_child_environment`가
  `request["effort"]`를 binding에 추가한다. 검증: 비어 있지 않은 문자열
  (효력 어휘 검증은 상류 `outer_lifecycle.py`가 이미 수행). 실패 시 기존과
  같이 binding 없음(fail-quiet).
- `scripts/delegation-monitor.mjs` — `BINDING_KEYS`에 `effort` 추가,
  `parseBinding`이 비어 있지 않은 문자열인지 검증, `write()` 레코드에
  `effort: this.binding.effort` 추가.
- `scripts/usage_receipt.py` — `_receipt_payload`가 `request["effort"]`를
  required 문자열로 검증해 payload에 `effort` 키를 추가한다.
- `SKILL.md`와 `docs/superpowers/specs/2026-08-18-codex-delegation-monitor-stream-design.md`
  — 라인·영수증 스키마 서술에 effort 필드를 반영한다.
- 계약 테스트(`tests/codex_runner_bridge_contract_test.sh`,
  `tests/codex_task_client_test.py` 등 기존 커버리지)가 새 키를 검증하도록
  갱신한다.

기록값은 요청 effort다. 영수증은 `actual_effort == requested_effort`일 때만
발행되므로(기존 검증) 영수증의 effort는 실제 실행값과 같다. 모니터 라인은
launch 시점 요청값이며, actual 불일치 시 영수증이 skip되는 기존 동작은
그대로다.

### 1.2 소비자 (beads-ui) — 두 형태 수용

- `server/worker/delegation-monitor.js`
  - `parseMonitorLine`: 최상위 키가 기존 10키 집합이거나 기존 집합+`effort`
    (11키)일 때만 유효. `effort`가 있으면 비어 있지 않은 문자열이어야 하고,
    파싱 결과는 `effort: string|null`(부재 시 null).
  - 스트림 identity: 같은 스트림 안에서 `effort` 값(null 포함)이 라인 간
    달라지면 기존 role/model 불일치와 동일하게 identity conflict로 스트림을
    버린다. `hasRawIdentityConflict`도 동일 기준.
  - `DelegationSession`에 `effort: string|null` 추가. `isDelegationSession`은
    `effort` 키 부재(구 durable 레코드) 또는 `null` 또는 비어 있지 않은
    문자열을 허용한다. `normalizeDelegationSessions`는 항상 `effort` 키를
    출력한다(부재 → null). `hasIdentityConflict`(durable vs 관측)는 한쪽이
    null이면 통과, 둘 다 non-null이면 동일성 요구 — 구 durable 레코드와 신
    스트림 재관측의 병합을 막지 않기 위해서다.
- `server/worker/usage-receipts.js` — `TOP_LEVEL_KEYS` 기존 집합 또는
  +`effort` 두 형태 수용, 있으면 비어 있지 않은 문자열. `UsageLeg`에
  `effort: string|null` 추가.
- `server/worker/queue-store.js` — `UsageLeg`/`DelegationSession` typedef와
  `normalizeUsageLegs`가 effort를 통과·보존한다(부재 → null).
- 프런트엔드
  - `app/utils/token-usage.js` — `staticLegTemplate`이 받는 durable receipt
    행은 `projectAttemptUsage`가 `usage_legs` candidate를 필드 단위로
    재구성한 `UsageLeg`이므로, 여기서 effort가 탈락하면 정적 레그에 표시되지
    않는다. `UsageLeg` typedef에 `effort?: string`을 추가하고, 재구성 시
    `candidate.effort`가 비어 있지 않은 문자열일 때 복사한다.
  - `app/views/detail-panel/session-history.js` — `validDelegation`이
    `effort`를 `string|null|부재`로 허용. `monitoredLegTemplate`의
    `codex · ${model}`을 effort non-null일 때 `codex · ${model} · ${effort}`로.
    `staticLegTemplate`의 `[leg.provider, leg.model]`에 `leg.effort`를 추가해
    `.filter(Boolean).join(' · ')` 그대로.
  - `app/views/worker/transcript-drawer.js` — 위임 브랜치 메타
    `[meta.model]`을 `[meta.model, meta.effort]`(filter(Boolean))로. drawer를
    여는 쪽이 delegation session의 effort를 meta로 전달한다.

서버가 WS로 attempt를 투사할 때 delegation_sessions/usage_legs에 effort가
그대로 실리므로 별도 프로토콜 변경은 없다.

## 2. orchestrator 행 — 실행 effort 관측 backfill (beads-ui 단독)

### 2.1 관측원과 시점

claude runner attempt에 한해, `session_id` 관측(stream-json `system/init`)
이후 claude 자체 세션 파일에서 effort를 읽는다.

- 경로: `~/.claude/projects/<munged>/<session_id>.jsonl`. `<munged>`는 spawn
  cwd(워크트리 절대경로)의 비영숫자 문자를 전부 `-`로 치환한 값이다(실측:
  `/Users/isy_macstudio/...beads-ui/.worktrees/UI-04vo` →
  `-Users-isy-macstudio-...-beads-ui--worktrees-UI-04vo`; `_`·`.`·`/` 모두
  `-`). cwd는 init 이벤트의 `cwd` 필드를 우선 사용하고, 없으면 spawn에 넘긴
  워크트리 경로를 쓴다.
- 값: 파일에서 `type === 'assistant'`이고 `effort`가 비어 있지 않은 문자열인
  최초 레코드의 `effort`. JSON 파싱 실패 라인은 건너뛴다.
- 시점: ① `session_id` 이벤트 처리 시 1회 시도(아직 assistant 레코드가 없어
  실패할 수 있다), ② attempt terminal 처리 시 아직 미기록이면 1회 재시도.
  두 시점 모두 fail-quiet: 파일 없음·권한·형식 불일치 → 기록 생략, 로그만.

### 2.2 기록과 표시

- attempt 레코드에 새 필드 `observed_effort: string|null`을 추가한다. launch
  기록(`effort`)은 불변 튜플로 남기고, 관측값은 별도 필드로 둔다 —
  `attempt.effort`가 이미 non-null이면 관측을 수행하지 않는다.
- 표시 결정은 상세 패널 투영에서만 한다:
  `app/views/detail-panel/index.js#attemptsForBead`가 attempt를 필드 단위로
  재투영하므로(현재 `observed_effort`는 여기서 탈락한다), 이 투영의
  `effort`를 `a.effort || a.observed_effort || null`로 결정한다. 공유
  `app/utils/attempt-display.js#formatAttemptTuple`과 다른 소비처
  (running-grid 등)의 기존 계약은 바꾸지 않는다 — 승인 범위는 세션 이력
  표시다.
- 구 attempt 레코드(필드 부재)는 null로 정규화되고 표시 생략이다.

### 2.3 경계

`~/.claude/projects` 경로 규칙은 claude CLI 내부 관례라 이 관측은 전적으로
fail-quiet다: 실패는 어떤 상태 전이도 막지 않고, 필드는 표시 외 어디에도
쓰이지 않는다(게이트·선택기·영수증 입력이 아니다).

## 3. 배포 순서와 cross-repo 단위

1. **beads-ui (이 Bead, UI-3nf9)** — §1.2 소비자 수용 + §2 관측 + 표시.
   PR → 머지 → 공유 서버 배포(post-merge runtime validation 계약대로)까지가
   이 Bead의 완료다. 이 시점에 화면은: 구 데이터 그대로, effort는
   orchestrator 관측분만 나타난다. **이 Bead의 배포 후 검증은 소비자 배포와
   orchestrator 관측 표시까지다** — codex 레그의 종단간 effort 표시는 생산자
   배포 전이라 이 Bead의 완료 조건이 아니다.
2. **dotfiles (별도 quick_fix Bead, 구현 진입 시 생성)** — §1.1 생산자.
   UI-3nf9의 배포를 foreign `blocks` 의존으로 선행 조건 삼는다. 순서를
   어기면(구 소비자 + 신 생산자) 소비자의 exact-key 검증이 첫 라인에서
   실패해 스트림 전체가 conflict로 버려지고 영수증이 skip된다 — 소비자 선행
   배포가 필수인 이유다. **codex 신규 위임 세션의 종단간 표시 검증
   (`codex · <model> · <effort>`)은 이 quick_fix Bead가 자체 배포(런타임
   스킬 설치) 후 완료 조건으로 소유한다.**

## 4. 검증

- beads-ui: `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
  `npm run build`(번들 포함). 신규 테스트:
  - delegation-monitor: effort 있는 라인/없는 라인 각각 유효, 스트림 내 effort
    불일치 conflict, durable(effort 부재)+신 스트림(effort 있음) 병합 통과.
  - usage-receipts: effort 있는/없는 영수증 수용, 빈 문자열 거부.
  - token-usage: `projectAttemptUsage`가 `usage_legs` candidate의 effort를
    `UsageLeg`으로 보존(부재 시 키 없음), 정적 receipt 행 표시 테스트.
  - session-history: 모니터 레그·정적 레그 effort 표시, 부재 시 생략.
  - detail-panel 투영: `attemptsForBead`가 `effort || observed_effort`를
    표시용 effort로 결정, `observed_effort` 부재 시 기존과 동일.
  - 관측 backfill: munged 경로 유도, assistant 레코드 관측, 파일 부재
    fail-quiet.
- dotfiles: 기존 bridge 계약 테스트 갱신분 통과, 모니터 라인·영수증에 effort
  포함 확인.
- 배포 후 검증의 소유 분리(§3): UI-3nf9는 공유 서버 배포 후 orchestrator
  행의 관측 effort 표시와 구 데이터 무손상(위임 레그가 기존처럼 보임)까지
  확인한다. codex 신규 위임 세션의 `codex · <model> · <effort>` 종단간
  확인은 dotfiles quick_fix Bead의 완료 조건이다.
