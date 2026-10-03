---
scope:
  - server/timing-settings
  - server/worker/scheduler.js
  - server/worker/failure-class.js
  - server/worker/queue-hold.js
  - server/worker/completion-intent.js
  - server/worker/continuation-refusal.js
  - server/worker/provider-health.js
  - server/worker/merge-queue.js
  - server/worker/pr-poller.js
  - server/worker/external-wait/
  - server/worker/wait-judgment.js
  - server/worker/state-paths.js
  - server/worker/attach.js
  - server/worker/runtime.js
  - server/poller.js
  - server/index.js
  - server/ws/
  - app/protocol.js
  - app/protocol.md
  - app/main.js
  - app/data/
  - app/views/settings-dialog/
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/styles.css
  - docs/adr/
---

# Worker의 대기·관찰·재시도 시간을 설정 화면에서 조정

## 문서 상태

- Bead: `UI-ny0h`
- 경로: `spec_backed`. beads-ui 안의 구현 묶음 하나와 dotfiles 크로스 리포 unit 둘(계약 선행 — 착지 완료, adr 스킬 규칙 — 선행 아님)로 이루어진다.
- 기준: beads-ui `main` / `a26956cf82ce6991bf9ee82e1f70b85591b5c6fe`(재검토 갱신 `643211a9e846f49b489defb032bc32a527a2fcaf`), dotfiles `main` / `f0542a1c61a028f446bf440b961b511791359163`
- 상태: spec 리뷰 r2 승인. 스테일 재검토 correction — UI-6mpl·UI-q15q 착지로 ADR 후보의 supersede 대상과 전제 인용 줄을 갱신했다(결정 불변).

## 1. 목표

Worker가 일을 바로 시작하지 않고 기다리는 시간, 외부 작업을 다시 들여다보는 주기, 막혔을 때 다시 시도하기까지의 간격은 지금 코드 상수라서 바꾸려면 코드를 고쳐 배포해야 한다. 이 값들을 설정 화면에서 바꾸고 **서버를 재시작하지 않고** 반영한다.

사용자 결정(2026-10-02):

- 노출 범위: 대기 진입 유예, 외부 작업 관찰 주기, 재시도·재확인 대기, PR·목록 새로고침, 머지 큐 대기의 다섯 묶음 전부.
- 적용 범위: 서버 전체에 값 하나. 저장소별 값은 두지 않는다.
- 외부 작업 관찰 주기는 dotfiles 계약도 함께 고친다.
- 현재 유효한 ADR이 값을 박아 둔 항목(머지 해결 대기, 환경 실패 재시도 사다리, base_moved 재개 지연)도 연다. 그 ADR은 대체하되 **새 ADR에는 조정 가능한 수치를 결정으로 적지 않는다.**
- base_moved 재개 지연은 환경 실패 사다리 첫 칸에서 떼어 별도 값으로 둔다.
- "ADR에 조정 가능한 수치를 결정으로 적지 않는다"를 dotfiles adr 스킬의 일반 규칙으로도 넣는다.

## 2. 검증된 전제

- 대기 진입 유예는 20초 고정 상수이고 "설정으로 열지 않는다"는 이전 스펙 결정 8에 묶여 있다 — `server/worker/scheduler.js:171-176`, `docs/superpowers/specs/2026-09-03-monitor-exec-material-queue-grace-design.md:393`. 이 결정은 현재 유효한 ADR 목록에 없다(`docs/adr/README.md` `## 현재 유효한 결정`에 유예 관련 행 없음; 주석이 가리키는 ADR 0032는 superseded이고 주제가 프리셋이다 — `docs/adr/history/0032-execution-preset-is-lane-neutral-applied-per-lane.md:4-5`).
- 유예는 판정 시점마다 `added_at + QUEUE_GRACE_MS`로 계산한다 — `server/worker/scheduler.js:977`, `:1003`, `:1069`.
- 클라이언트가 남은 초 표시를 위해 같은 20초를 복제한다 — `app/views/worker/lane-model.js:157-163`, `app/views/worker/lanes.js:2153`.
- 외부 작업 관찰 주기(slurm 120초·process 30초·오류 백오프 60/120/300/900초)는 dotfiles 계약 값의 코드 사본이다 — `server/worker/external-wait/contract.js:1-5`, `:17-21`.
- 선행 dotfiles-4yl8n이 착지해 계약이 두 간격을 기본값으로, beads-ui Worker의 서버 전역 타이밍 설정을 덮어쓰기 출처로 선언한다 — dotfiles `docs/contracts/workflow-state.yaml:1191-1199`(`interval_policy`: `values: defaults`, `override_owner: beads_ui_worker`, `override_source: server_global_timing_settings`, `override_fields: [slurm_interval_seconds, process_interval_seconds]`), dotfiles 커밋 `f0542a1c61a028f446bf440b961b511791359163`.
- 관찰기는 관찰이 끝날 때마다 위 간격으로 `next_observation_at`을 계산해 기록하고, 15초 틱마다 기한이 지난 기록만 관찰한다 — `server/worker/external-wait/observer.js:239`, `:362-378`, `:461-463`.
- 기한 초과 판정이 같은 간격을 다시 계산한다 — `server/worker/wait-judgment.js:500-522`.
- 환경 실패 재시도 사다리 2/5/15분은 분류 결과에 실리고 `queue-hold.js`가 소비하며, `base_moved` 재시도는 별도 값 없이 그 사다리의 첫 칸을 빌려 쓴다 — `server/worker/failure-class.js:74`, `:77`, `:390-396`; `server/worker/queue-hold.js:141-145`, `:218-224`.
- 완료 작업 재시도 사다리 1/5/15분과 검증 환경 오류의 300초 고정 분기 — `server/worker/completion-intent.js:200`, `:1806-1809`, `:2271-2273`.
- 자동 재개 거절 뒤 대기 5/15/30/60분, 마지막 칸 반복 — `server/worker/continuation-refusal.js:58-63`, `:104-111`.
- 공급자 보류 재확인: 장애 백오프 1분→1시간 6칸, 한도 리셋 시각을 모를 때 15분, 리셋 뒤 60초. 계산한 `next_probe_at`을 저장한 뒤 타이머를 건다 — `server/worker/provider-health.js:21-25`, `:574-590`.
- 머지 큐의 세 대기(해결 세션 30분, 미확정 재관측 60초, 미확정 상한 30분)는 생성 시점에 deps로 한 번 읽힌다 — `server/worker/merge-queue.js:66-84`, `:200-210`; 생성 지점 `server/worker/attach.js:1888`.
- PR 폴링 45초는 `deps.intervalSeconds`로 주입 가능하지만 생성 지점이 넘기지 않는다 — `server/worker/pr-poller.js:54`, `:834-838`; `server/worker/attach.js:2255`.
- 목록 새로고침 `poll_interval_seconds`(기본 30, 0이면 끔)는 config.toml에 있고 기동 시 한 번 읽히며, 모니터 갱신 구동기는 그 값을 모듈 변수에 캐시한다 — `server/config.js:9`, `:253-255`; `server/index.js:110-114`; `server/ws/monitor-handlers.js:1415-1430`, `:1454-1460`, `:1476`.
- 공용 폴러는 고정 간격 `setInterval`이고 간격을 바꾸는 길이 없다 — `server/poller.js:18-43`.
- attempt 재조정 주기 60초와 대화형 세션 재조정 주기 30초 — `server/worker/attach.js:369`, `:379`.
- 서버 전역 설정 저장 선례: 상태 디렉터리의 JSON 파일, 정수 `revision` CAS, 구독자 fanout, 읽기는 fail-quiet·쓰기는 strict — `server/model-visibility-store.js:1-15`, `:100-108`; `server/worker/state-paths.js:154`.
- 서버 전역 값의 편집 위치는 일괄 창의 `전역` 탭 하나이고 두 번째 전역 탭을 만들지 않는다 — `docs/adr/UI-u6ud-10-exec-presets-and-chips.md:39`, `docs/adr/UI-ooc0-model-visibility-disabled-list.md:55-56`; 탭 구현 `app/views/settings-dialog/index.js:67-77`, `:90-91`, `:419-439`.
- 현재 유효한 ADR이 값을 결정으로 적어 둔 곳: UI-6mpl(UI-u6ud-3 대체)의 "30분은 queue-yield deadline이다" — `docs/adr/UI-6mpl-merge-queue-and-independent-toggles.md:6`, `:33`; UI-q15q(UI-nuwy 대체)의 "사다리(2·5·15분, 3회)"와 "base_moved는 기록 직후 2분 뒤 자동 재개" — `docs/adr/UI-q15q-external-spawned-jobs-and-same-session-conversation.md:383`, `:420`.
- 워크스페이스 kv `workflow_session_defaults`의 키 어휘는 dotfiles 소유라 넓힐 수 없다 — `server/session-defaults.js:5-9`.

## 3. 설계

### 3.1 파라미터 표

서버의 표 하나(예: `server/timing-settings.js`의 `TIMING_FIELDS`)가 키·기본값·범위·사다리 칸 수·화면 단위·끔 값을 소유한다. 저장은 모두 **초 단위 정수**이고 화면 단위는 표시·입력에만 쓴다.

| 묶음 | 키 | 기본값 | 범위 | 화면 단위 |
| --- | --- | --- | --- | --- |
| 대기 진입 | `queue_grace_seconds` | 20 | 0–600 (0은 즉시) | 초 |
| 외부 작업 관찰 | `external_wait_slurm_interval_seconds` | 계약 사본 120 | 30–3600 | 초 |
| 외부 작업 관찰 | `external_wait_process_interval_seconds` | 계약 사본 30 | 15–3600 | 초 |
| 재시도·재확인 | `env_retry_delays_seconds` (3칸) | 120, 300, 900 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `base_moved_retry_seconds` | 120 | 60–3600 | 분 |
| 재시도·재확인 | `completion_retry_delays_seconds` (3칸) | 60, 300, 900 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `auto_resume_retry_delays_seconds` (4칸) | 300, 900, 1800, 3600 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `provider_outage_backoff_seconds` (6칸) | 60, 120, 240, 480, 900, 3600 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `provider_usage_unknown_reset_seconds` | 900 | 60–21600 | 분 |
| 재시도·재확인 | `provider_usage_reset_grace_seconds` | 60 | 0–3600 | 초 |
| PR·목록 새로고침 | `pr_poll_interval_seconds` | 45 | 15–600 | 초 |
| PR·목록 새로고침 | `list_poll_interval_seconds` | config.toml `poll_interval_seconds`(없으면 30) | 끔 값 0, 그 밖에는 5–600 | 초 |
| 머지 큐 | `merge_resolution_wait_seconds` | 1800 | 300–14400 | 분 |
| 머지 큐 | `merge_unconfirmed_poll_seconds` | 60 | 15–600 | 초 |
| 머지 큐 | `merge_unconfirmed_wait_seconds` | 1800 | 300–14400 | 분 |

- 사다리는 칸 수가 고정이고 값은 왼쪽에서 오른쪽으로 줄지 않아야 한다(같은 값 허용). 칸 수가 재시도 횟수 상한(`RETRY_MAX`·`COMPLETION_RETRY_MAX`)과 맞물려 있으므로 칸 수는 바꾸지 않는다.
- 화면 단위가 분인 키는 정수 분만 입력받고 저장값은 60의 배수여야 한다(서버도 같은 규칙으로 검증). 표의 분 단위 기본값은 모두 정수 분이다.
- **끔 값.** 필드는 선택적으로 `off_value`를 가진다. 값이 `off_value`와 같으면 `min`·`max` 검사를 건너뛰고 "끔"으로 읽는다. 이 표에서는 `list_poll_interval_seconds`만 `off_value: 0`이다(0 허용, 1–4 거절). `queue_grace_seconds`의 0은 끔이 아니라 범위 안의 값(즉시)이다.
- `base_moved_retry_seconds`는 `base_moved` 재개만 쓰고, `env_retry_delays_seconds`는 그 밖의 env 재시도만 쓴다. 기본값이 둘 다 120초라서 설정 파일이 없으면 지금과 동작이 같다.
- 외부 작업 관찰 두 키의 기본값은 `contract.js`의 `OBSERVATION` 사본을 그대로 참조한다. 계약의 `interval_policy`도 같은 코드 registry에 사본으로 두고(ADR UI-u6ud-2), 설정이 덮어쓰는 필드는 그 사본의 `override_fields` 두 개뿐이다.
- `list_poll_interval_seconds`만 기본값의 출처가 config.toml이다. 설정에 값이 없으면 지금처럼 config.toml 값을 쓴다.

### 3.2 저장과 읽기

- 저장 파일: 상태 디렉터리의 `timing-settings.json`(예: `state-paths.js`에 `timingSettingsFilePath()`). 내용은 `{ revision, overrides }`이고 `overrides`에는 **사용자가 바꾼 키만** 들어간다. 기본값은 파일에 쓰지 않으므로 코드 기본값이 바뀌면 바꾸지 않은 키는 따라간다.
- 읽기는 fail-quiet: 파일이 없거나 깨졌으면 전부 기본값, 모르는 키나 범위·형식이 틀린 키는 그 키만 기본값으로 두고 로그 한 줄을 남긴다.
- 쓰기는 strict: 요청 하나의 모든 키를 검증해 하나라도 틀리면 아무것도 쓰지 않고 `invalid_value`(어느 키인지 포함)로 거절한다. `expected_revision`이 다르면 `conflict`. 키 값으로 `null`을 보내면 그 키의 덮어쓰기를 지워 기본값으로 돌린다. 쓰기는 임시 파일 뒤 rename.
- 서버 안의 소비자는 프로세스 안 단일 접근자(예: `getTimingSettings()`)로 **유효값**(덮어쓰기 ∪ 기본값)을 읽고, 변경 알림(예: `onTimingSettingsChanged(listener)`)을 구독할 수 있다. 테스트용 초기화 훅을 둔다.

### 3.3 적용 의미

- **값은 시간을 계산하는 순간에 읽는다.** 이미 기록된 예약 시각 — 재시도 `next_at`, 공급자 `next_probe_at`, 외부 대기 `next_observation_at`, 완료 재시도 `next_at`, 머지 해결 대기의 절대 deadline — 은 다시 쓰지 않는다. 새 값은 그다음 계산부터 적용된다.
- 대기 진입 유예는 판정마다 `added_at`에서 다시 계산하므로 바꾸는 즉시 지금 유예 중인 항목에도 적용된다.
- 머지 큐 대기는 타이머를 거는 순간의 유효값을 쓴다. 생성 시점 deps 고정을 접근자 읽기로 바꾼다.
- 주기적 폴러(PR 폴링, 목록 새로고침, 모니터 갱신 구동기)는 값이 바뀌면 **즉시 새 간격으로 다시 건다.** 목록 새로고침을 끔 값으로 하면 멈추고, 끔에서 양수로 바꾸면 다시 돈다. 공용 폴러(`server/poller.js`)에 간격 변경 수단을 더한다(예: `setIntervalSeconds(n)`).
- 외부 작업 관찰기의 15초 틱은 그대로 둔다. process 하한을 15초로 둔 이유다. 기한 초과 판정(`wait-judgment.js`)도 같은 유효 간격을 읽는다.

### 3.4 프로토콜

모델 활성 설정과 같은 모양의 WS 메시지 네 개를 더한다(`app/protocol.js`, `app/protocol.md`).

- `subscribe-timing-settings` / `unsubscribe-timing-settings`
- `timing-settings-set` — `{ expected_revision, values: { <key>: <초 정수 | 초 정수 배열 | null> } }`. 응답은 `{ ok, code?, key?, snapshot }`.
- `timing-settings-snapshot` — `{ revision, values, overrides, fields }`. `values`는 유효값, `overrides`는 바꾼 키, `fields`는 키별 `default`·`min`·`max`·`rungs`·`unit`·`off_value`(있을 때만). 범위의 정본은 서버 표이고 클라이언트는 복제하지 않는다.
- 쓰기가 성공하면 모든 구독자에게 새 스냅샷을 보낸다.

### 3.5 설정 화면

- 일괄 창(모니터 탭 헤더 ⚙)의 기존 `전역` 탭 안에, 판정 칩 프리셋·활성 모델 다음 세 번째 묶음으로 `대기·주기` 섹션을 둔다. 새 탭은 만들지 않는다(ADR UI-u6ud-10·UI-ooc0).
- 섹션 첫 줄 설명: "이미 예약된 재시도·재확인 시각은 바뀌지 않고 다음 예약부터 적용됩니다."
- 다섯 묶음을 §3.1 순서의 소제목으로 그린다. 행마다 이름, 숫자 입력(`.ui-input`)과 단위, 기본값 힌트("기본 20초"), 바꾼 행에만 `[기본값]` 버튼(`.op-btn`). 사다리 행은 칸 수만큼 입력을 `→`로 잇는다. `off_value`가 있는 행은 힌트에 "0이면 끔"을 함께 적는다. 묶음 아래 한 줄 설명으로 그 값이 무엇을 기다리는지 적는다.
- 섹션 끝에 `[저장]`과 `[모두 기본값]`. 저장은 바뀐 키만 한 번의 `timing-settings-set`으로 보낸다. 범위를 벗어나거나 사다리가 줄어드는 입력은 행 아래에 이유를 보이고 `[저장]`을 끈다.
- `conflict`면 최신 스냅샷으로 다시 그리고 "다른 곳에서 먼저 바뀌어 다시 불러왔습니다" 토스트를 띄운다. `invalid_value`면 해당 행에 서버 메시지를 보인다.
- Worker 탭의 남은 초 표시는 서버 유효값과 같은 유예를 쓴다. 클라이언트 상수 복제(`lane-model.js`의 20초)는 값이 없을 때의 대체값으로만 남는다(구 서버·구독 전 fail-quiet). 예: 앱 수준 timing store를 모델 활성 store처럼 기동 시 구독한다.
- 새 조작은 `docs/design-system.md`의 부품만 쓰고, 390px 폭에서 폭 넘침 탐침을 통과한다.

### 3.6 ADR 대체

현재 유효한 ADR 두 개가 이 스펙이 여는 값을 결정 문장으로 적고 있으므로, Finish에서 두 ADR을 각각 전면 대체한다(§7). 새 ADR은 원 ADR의 모든 조항을 승계하고 다음만 바꾼다.

- UI-6mpl(UI-u6ud-3 대체) → 해소 세션의 큐 점유는 실패가 아니라 queue-yield deadline이라는 의미는 그대로 두고, 그 길이는 서버 전역 타이밍 설정(`merge_resolution_wait_seconds`)이 정한다고 적는다. deadline이 거는 순간의 값으로 계산한 절대 시각이라 재시작이 시계를 되감지 않는다는 조항도 승계한다.
- UI-q15q(UI-nuwy 대체) → 미분류 실패 사다리와 base_moved 재개 지연의 길이는 서버 전역 타이밍 설정(`env_retry_delays_seconds`·`base_moved_retry_seconds`)이 정한다고 적는다. 바뀐 값은 다음 예약부터 적용되고 기록된 `next_at`은 다시 쓰지 않는다.
- 두 새 ADR 모두, 승계하는 조항 안의 다른 조정 가능한 수치(예: UI-q15q의 매 pass 30초, 재시도 횟수 3회, base_moved 반복 3회, UI-6mpl의 라운드 상한)도 결정 문장으로 고정하지 않는다. 값의 정본(설정 키 또는 코드 상수 이름)을 가리키고 필요하면 현재 값을 "기본값" 또는 "현재 값"으로만 적는다.
- 결정: 같은 조항 묶음(UI-nuwy 계보, 지금은 UI-q15q)을 대체하는 열린 스펙이 하나 더 있다(UI-18a5, `docs/superpowers/specs/2026-10-02-session-worker-continue-pair-design.md` §7 — 대화 대상·출구 조항을 넓힌다; 그 스펙은 아직 UI-nuwy를 대상으로 적고 있고 그 정정은 UI-18a5 자신의 재검토 몫이다). 바꾸는 조항이 겹치지 않으므로 순서만 맞춘다. Finish의 ADR 단계에서 `docs/adr/README.md` 현재 표를 다시 읽어, UI-18a5의 ADR이 먼저 착지했으면 그 ADR을 supersede 대상으로 삼고 그 조항(UI-18a5가 넓힌 조항 포함)을 승계한다. 대상 id가 바뀌면 이 스펙의 §7 후보 줄을 정정해 재게시한다(staleness 재검토 경로).
- 다른 유효 ADR(UI-nuwy-2의 대화형 종료 유예 등)은 이 스펙이 값을 열지 않으므로 건드리지 않는다. 그 수치는 그 ADR을 다음에 대체할 때 같은 원칙으로 고친다.

## 4. 경계

- 결정: 외부 작업 관찰의 오류 백오프(60/120/300/900초)와 hold 예산은 바꾸지 않는다 — 사용자가 요청한 것은 관찰 주기이고, 두 값은 계약의 판정 규칙과 묶여 있어 계약이 덮어쓰기를 허용하지 않았다(`interval_policy.override_fields`).
- 결정: 대화형 세션 종료 유예(90초·30분 상한)는 바꾸지 않는다 — 고른 다섯 묶음 밖이다.
- 결정: 완료 재시도의 검증 환경 오류 300초 분기는 바꾸지 않는다 — 사다리가 아니라 원인별 고정 분기다.
- 결정: attempt 재조정 주기(60초·30초), 캐시 TTL, 디바운스, 하위 프로세스 timeout은 노출하지 않는다 — 내부 배관이다.
- 결정: config.toml `poll_interval_seconds`는 그대로 읽는다 — 손으로 고친 설정을 깨지 않도록 기본값의 출처로 남긴다.
- 크로스 리포 unit: dotfiles — 계약 `external_wait.observation`의 두 간격을 기본값과 beads-ui 설정 덮어쓰기로 선언. quick_fix Bead dotfiles-4yl8n이 맡아 `f0542a1c61a028f446bf440b961b511791359163`로 착지했고(closed), 이 Bead 구현 진입의 선행(`blocks`)이다.
- 크로스 리포 unit: dotfiles — adr 스킬(`src/shared/skills/tools/adr/SKILL.md`)에 일반 규칙 한 줄을 더한다. 선행이 아니며 dotfiles rig의 quick_fix Bead dotfiles-8vt7k가 맡고 `discovered-from`과 `출처:` 줄로만 이어져 있다. 승인 대상 문구(스킬 본문은 영어):
  `- **Tunable numbers are not decisions.** Do not fix tunable values — durations, retry counts, limits, thresholds — in decision text. Point to the value's owner (a settings key, a constant, or a contract key) and, when context needs it, state the current value only as a default.`
  뜻: 시간·재시도 횟수·한도·임계값 같은 조정 가능한 수치는 결정 문장으로 고정하지 않는다. 값의 정본(설정 키·상수·계약 키)을 가리키고, 맥락상 필요하면 현재 값을 기본값으로만 적는다.

## 5. 수락 기준

1. 설정 파일이 없으면 모든 유효값이 §3.1 기본값과 같고, 지금과 동작이 같다.
2. 각 키를 설정에서 바꾸면 서버 재시작 없이 해당 소비자가 다음 계산부터(폴러는 즉시) 새 값을 쓴다.
3. 범위 밖 값, 분 단위 키의 60 배수가 아닌 값, 칸 수가 틀린 사다리, 줄어드는 사다리, 모르는 키는 쓰기가 거절되고 파일이 바뀌지 않는다. `list_poll_interval_seconds`는 0을 받고 1–4를 거절한다.
4. 깨진 파일이나 틀린 키 하나는 그 키만 기본값으로 떨어지고 서버가 기동한다.
5. `[기본값]`·`[모두 기본값]`은 덮어쓰기를 지워 파일에서 그 키를 없앤다.
6. 동시에 두 창에서 저장하면 늦은 쪽이 `conflict`를 받고 최신 값으로 다시 그린다.
7. Worker 탭의 유예 남은 초가 설정한 유예와 일치한다.
8. `base_moved_retry_seconds`를 바꿔도 다른 env 재시도 지연은 바뀌지 않고, `env_retry_delays_seconds`를 바꿔도 base_moved 재개 지연은 바뀌지 않는다.
9. 외부 작업 관찰 설정은 계약 사본의 `override_fields` 두 필드만 덮어쓰고 오류 백오프는 계약 사본 그대로다.
10. Finish가 만든 두 대체 ADR에 이 스펙이 연 값의 숫자가 결정 문장으로 남아 있지 않다.

## 6. Test scope

- `server/timing-settings*.test.js`: 파일 없음·깨짐 → 기본값; 틀린 키 하나만 기본값; 범위·칸 수·단조·60 배수 위반 거절과 무변경; `off_value` 0 허용과 1–4 거절; CAS `conflict`; `null` 복원; 변경 알림.
- `server/poller.test.js`: 간격 변경 시 재무장, 끔 값이면 멈춤, 끔→양수 재개.
- 소비자별 한 동작씩: 스케줄러 유예 판정; `queue-hold`의 env 재시도 지연과 `base_moved` 지연이 각자의 키를 따른다; 완료 재시도; 자동 재개 지연; 공급자 재확인 지연 세 갈래; 머지 큐 세 대기의 타이머 시점 읽기; PR 폴러·목록 폴러·모니터 구동기 재무장; 외부 대기 관찰기 `next_observation_at`과 `wait-judgment` 기한 초과 판정, 오류 백오프 불변.
- `server/worker/external-wait/contract.test.js`: `interval_policy` 사본의 `override_fields`가 두 간격 필드뿐이다.
- WS 핸들러: 구독 시 스냅샷(`off_value` 포함), 성공 쓰기의 fanout, 거절 응답 코드.
- 클라이언트: `전역` 탭에 `대기·주기` 섹션이 세 번째 묶음으로 서고 일괄 창 탭 수는 그대로다; 그룹·행 렌더; 입력 검증과 `[저장]` 비활성; 바뀐 키만 담은 payload; `[기본값]`의 `null`; `conflict` 재그림; 레인 남은 초가 store 값을 쓰고 부재 시 20초.
- 폭 넘침 탐침에 `전역` 탭의 새 섹션 포함.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — beads-ui는 dotfiles 계약을 코드 사본으로 소비하고 정의하지 않는다. 외부 작업 관찰 주기는 계약의 `interval_policy`가 덮어쓰기를 허용한 두 필드만 설정으로 연다.
- 전제: ADR UI-u6ud-10, UI-ooc0 — 서버 전역 값의 편집 위치는 일괄 창의 `전역` 탭 하나이고 두 번째 전역 탭을 만들지 않는다. 타이밍 설정은 그 탭 안의 세 번째 묶음이다.
- 해소 세션의 큐 점유는 queue-yield deadline이고 그 길이는 서버 전역 타이밍 설정이 정한다(UI-6mpl의 나머지 조항 전부 승계, 수치는 결정 문장에서 뺀다). 되돌리기 어려움: 성립 — 원 ADR과 같은 소비자(`server/worker/merge-queue.js`·`server/worker/merge-gate.js`·`server/worker/pr-actions.js`·`server/worker/auto-merge.js`·Worker 툴바 `app/views/worker/index.js`, 승계하는 독립 스위치 조항의 queue-store 자동화 mutation과 `worker-automation-toggle` 핸들러)에 이 스펙의 타이밍 설정(`server/timing-settings*`)이 더해져 함께 움직인다. 맥락 없이 놀라움: 성립 — 원 ADR을 읽은 사람은 30분 고정을 기대하고, deadline 길이가 설정에서 바뀌는 이유를 모른다. 실제 트레이드오프: 성립 — 고정 30분 유지를 버리고 운영자가 길이를 고르게 했다. `summary`: "PR 랜딩 작업의 머지는 Worker의 단일 순차 큐만 실행하고 완료는 MERGED 관측이다; 머지 자격은 저장소 안의 입력(PR·base·head identity, mergeability, 리뷰·실행 영수증, [verify])만 보고 GitHub checks는 읽지 않는다; auto_merge와 auto_advance는 독립 스위치이고 어떤 클릭도 둘을 함께 바꾸지 않는다; 해소 세션의 큐 점유는 실패가 아니라 queue-yield deadline이고 그 길이는 서버 전역 타이밍 설정이 정하며 충돌 해소 fence는 수동 권한 면제·슬롯 여유로 판정한다" → ADR, supersede UI-6mpl
- 미분류 실패 재시도 사다리와 base_moved 재개 지연의 길이는 서버 전역 타이밍 설정이 정하고 두 값은 서로 독립이다(UI-q15q의 나머지 조항 전부 승계, 수치는 결정 문장에서 뺀다; 새 ADR id는 UI-ny0h-2). 되돌리기 어려움: 성립 — 원 ADR과 같은 소비자(`server/worker/scheduler.js`·`server/worker/queue-hold.js`·`server/worker/failure-class.js`·`server/worker/continuation-refusal.js`·`server/worker/tmux-launcher.js`·Worker 카드 렌더러, UI-q15q가 더한 하위 잡 관찰·표시 소비자 `server/worker/external-wait/adapters/slurm.js`·`observer.js`·`store.js`·상세 패널)에 타이밍 설정이 더해지고, base_moved를 사다리 첫 칸에서 떼어 낸 분리를 되돌리려면 설정 키와 저장 파일까지 함께 고쳐야 한다. 맥락 없이 놀라움: 성립 — 원 ADR을 읽은 사람은 2·5·15분과 2분 고정을 기대하고, 두 지연이 왜 따로 움직이는지 모른다. 실제 트레이드오프: 성립 — 사다리 첫 칸 공유와 고정값을 버렸다. `summary`: "사람이 필요한 멈춤(파킹, recovery authority·no_progress, 옛 사유 읽기 호환)은 같은 Worker 세션을 fork 없이 tmux 대화형으로 열어 해결한다; 대화 턴 종료는 답 대기(action_required)이고 첫 줄 인계를 관측하면 창 소멸 확인 뒤 같은 attempt를 같은 세션·기록 실행 설정으로 재개하며(parked·awaiting_user 예외는 이 경로뿐, 사람 ↻·자동 재디스패치는 없음) 인수면 관찰만, 보류면 대기로 남는다; 알림은 확인 필요·답 대기·Worker가 이어감·사람 인수 넷이다; 외부 작업의 하위 잡은 등록 잡과 같은 사용자·WorkDir에서 등록 잡 시작 이후 제출된 Slurm 잡이고 사용자 큐와 Slurm 작업 완료 기록만으로 관찰하며, 표시 재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다; 미분류 실패 재시도 사다리와 base_moved 재개 지연의 길이는 서버 전역 타이밍 설정이 정한다" → ADR, supersede UI-q15q
- 그 밖의 Worker 대기·관찰·재시도·폴링 시간을 서버 전역 타이밍 설정 파일(덮어쓴 값만 저장, 다음 계산부터 적용)이 소유한다 — 기본 제외 목록의 "재시도 횟수·타임아웃·한도·임계 수치" 항목이고, 저장 방식은 UI-ooc0의 서버 전역 스토어 패턴을 그대로 따르며 적용 시점은 설정 화면이 직접 말하므로 맥락 없이 놀라움 불성립 → ADR 아님
- 대기 진입 유예를 설정으로 연다(이전 스펙 결정 8 번복) — 유효 ADR 조항이 아니고 기본 제외 목록의 수치 항목이다 → ADR 아님
- 오류 백오프·hold 예산·대화형 종료 유예를 고정으로 둔다 — 실제 트레이드오프 불성립(현행 유지) → ADR 아님
