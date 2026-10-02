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
- 경로: `spec_backed`. beads-ui 안의 구현 묶음 하나와, 먼저 들어가야 하는 dotfiles 계약 수정 하나(크로스 리포 unit)로 이루어진다.
- 기준: beads-ui `main` / `a26956cf82ce6991bf9ee82e1f70b85591b5c6fe`, dotfiles `main` / `4915da017578cb518f2b24e6e018fd8b683d86ee`
- 상태: 사용자 검토용 초안

## 1. 목표

Worker가 일을 바로 시작하지 않고 기다리는 시간, 외부 작업을 다시 들여다보는 주기, 막혔을 때 다시 시도하기까지의 간격은 지금 코드 상수라서 바꾸려면 코드를 고쳐 배포해야 한다. 이 값들을 설정 화면에서 바꾸고 **서버를 재시작하지 않고** 반영한다.

사용자 결정(2026-10-02):

- 노출 범위: 대기 진입 유예, 외부 작업 관찰 주기, 재시도·재확인 대기, PR·목록 새로고침, 머지 큐 대기의 다섯 묶음 전부.
- 적용 범위: 서버 전체에 값 하나. 저장소별 값은 두지 않는다.
- 외부 작업 관찰 주기는 dotfiles 계약도 함께 고친다.

## 2. 검증된 전제

- 대기 진입 유예는 20초 고정 상수이고 "설정으로 열지 않는다"는 이전 스펙 결정 8에 묶여 있다 — `server/worker/scheduler.js:171-176`, `docs/superpowers/specs/2026-09-03-monitor-exec-material-queue-grace-design.md:393`. 이 결정은 현재 유효한 ADR 목록에 없다(`docs/adr/README.md` `## 현재 유효한 결정`에 유예 관련 행 없음; 주석이 가리키는 ADR 0032는 superseded이고 주제가 프리셋이다 — `docs/adr/history/0032-execution-preset-is-lane-neutral-applied-per-lane.md:4-5`).
- 유예는 판정 시점마다 `added_at + QUEUE_GRACE_MS`로 계산한다 — `server/worker/scheduler.js:977`, `:1003`, `:1069`.
- 클라이언트가 남은 초 표시를 위해 같은 20초를 복제한다 — `app/views/worker/lane-model.js:155-160`, `app/views/worker/lanes.js:2155`.
- 외부 작업 관찰 주기(slurm 120초·process 30초·오류 백오프 60/120/300/900초)는 dotfiles 계약 값의 코드 사본이다 — `server/worker/external-wait/contract.js:1-5`, `:17-21`; dotfiles `docs/contracts/workflow-state.yaml:1191-1194`, `docs/contracts/external-wait.md:96-97`, `src/shared/skills/flow/workflow/scripts/check-workflow-contract.py:1385-1388`.
- 관찰기는 관찰이 끝날 때마다 위 간격으로 `next_observation_at`을 계산해 기록하고, 15초 틱마다 기한이 지난 기록만 관찰한다 — `server/worker/external-wait/observer.js:22`, `:140-155`, `:239-241`.
- 기한 초과 판정이 같은 간격을 다시 계산한다 — `server/worker/wait-judgment.js:500-522`.
- 환경 실패 재시도 사다리 2/5/15분은 분류 결과에 실리고 `queue-hold.js`가 소비하며, `base_moved` 재시도는 첫 칸을 쓴다 — `server/worker/failure-class.js:74`, `:77`, `:390-396`; `server/worker/queue-hold.js:141-145`, `:218-224`.
- 완료 작업 재시도 사다리 1/5/15분과 검증 환경 오류의 300초 고정 분기 — `server/worker/completion-intent.js:200`, `:1806-1809`, `:2271-2273`.
- 자동 재개 거절 뒤 대기 5/15/30/60분, 마지막 칸 반복 — `server/worker/continuation-refusal.js:58-63`, `:104-111`.
- 공급자 보류 재확인: 장애 백오프 1분→1시간 6칸, 한도 리셋 시각을 모를 때 15분, 리셋 뒤 60초. 계산한 `next_probe_at`을 저장한 뒤 타이머를 건다 — `server/worker/provider-health.js:21-25`, `:574-590`.
- 머지 큐의 세 대기(해결 세션 30분, 미확정 재관측 60초, 미확정 상한 30분)는 생성 시점에 deps로 한 번 읽힌다 — `server/worker/merge-queue.js:72-84`, `:200-210`; 생성 지점 `server/worker/attach.js:1878`.
- PR 폴링 45초는 `deps.intervalSeconds`로 주입 가능하지만 생성 지점이 넘기지 않는다 — `server/worker/pr-poller.js:54`, `:834-838`; `server/worker/attach.js:2245`.
- 목록 새로고침 `poll_interval_seconds`(기본 30, 0이면 끔)는 config.toml에 있고 기동 시 한 번 읽히며, 모니터 갱신 구동기는 그 값을 모듈 변수에 캐시한다 — `server/config.js:9`, `:253-255`; `server/index.js:110-114`; `server/ws/monitor-handlers.js:1383-1397`, `:1422-1428`, `:1444`.
- 공용 폴러는 고정 간격 `setInterval`이고 간격을 바꾸는 길이 없다 — `server/poller.js:18-43`.
- 서버 전역 설정 저장 선례: 상태 디렉터리의 JSON 파일, 정수 `revision` CAS, 구독자 fanout, 읽기는 fail-quiet·쓰기는 strict — `server/model-visibility-store.js:1-15`, `:100-108`; `server/worker/state-paths.js:154`.
- 설정 창의 서버 전역 탭(`전역`)은 일괄 모드(모니터 탭 헤더 ⚙)에만 있다 — `app/views/settings-dialog/index.js:55-65`, `:78-79`, `:317-337`.
- 워크스페이스 kv `workflow_session_defaults`의 키 어휘는 dotfiles 소유라 넓힐 수 없다 — `server/session-defaults.js:5-9`.

## 3. 설계

### 3.1 파라미터 표

서버의 표 하나(예: `server/timing-settings.js`의 `TIMING_FIELDS`)가 키·기본값·범위·사다리 칸 수·화면 단위를 소유한다. 저장은 모두 **초 단위 정수**이고 화면 단위는 표시·입력에만 쓴다.

| 묶음 | 키 | 기본값 | 범위 | 화면 단위 |
| --- | --- | --- | --- | --- |
| 대기 진입 | `queue_grace_seconds` | 20 | 0–600 (0은 즉시) | 초 |
| 외부 작업 관찰 | `external_wait_slurm_interval_seconds` | 계약 사본 120 | 30–3600 | 초 |
| 외부 작업 관찰 | `external_wait_process_interval_seconds` | 계약 사본 30 | 15–3600 | 초 |
| 재시도·재확인 | `env_retry_delays_seconds` (3칸) | 120, 300, 900 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `completion_retry_delays_seconds` (3칸) | 60, 300, 900 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `auto_resume_retry_delays_seconds` (4칸) | 300, 900, 1800, 3600 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `provider_outage_backoff_seconds` (6칸) | 60, 120, 240, 480, 900, 3600 | 칸마다 60–21600 | 분 |
| 재시도·재확인 | `provider_usage_unknown_reset_seconds` | 900 | 60–21600 | 분 |
| 재시도·재확인 | `provider_usage_reset_grace_seconds` | 60 | 0–3600 | 초 |
| PR·목록 새로고침 | `pr_poll_interval_seconds` | 45 | 15–600 | 초 |
| PR·목록 새로고침 | `list_poll_interval_seconds` | config.toml `poll_interval_seconds`(없으면 30) | 0 또는 5–600 (0은 끔) | 초 |
| 머지 큐 | `merge_resolution_wait_seconds` | 1800 | 300–14400 | 분 |
| 머지 큐 | `merge_unconfirmed_poll_seconds` | 60 | 15–600 | 초 |
| 머지 큐 | `merge_unconfirmed_wait_seconds` | 1800 | 300–14400 | 분 |

- 사다리는 칸 수가 고정이고 값은 왼쪽에서 오른쪽으로 줄지 않아야 한다(같은 값 허용). 칸 수가 재시도 횟수 상한(`RETRY_MAX`·`COMPLETION_RETRY_MAX`)과 맞물려 있으므로 칸 수는 바꾸지 않는다.
- 화면 단위가 분인 키는 정수 분만 입력받고 저장값은 60의 배수여야 한다(서버도 같은 규칙으로 검증). 표의 분 단위 기본값은 모두 정수 분이다.
- 외부 작업 관찰 두 키의 기본값은 `contract.js`의 `OBSERVATION` 사본을 그대로 참조한다. 표가 숫자를 따로 적지 않는다.
- `list_poll_interval_seconds`만 기본값의 출처가 config.toml이다. 설정에 값이 없으면 지금처럼 config.toml 값을 쓴다.

### 3.2 저장과 읽기

- 저장 파일: 상태 디렉터리의 `timing-settings.json`(예: `state-paths.js`에 `timingSettingsFilePath()`). 내용은 `{ revision, overrides }`이고 `overrides`에는 **사용자가 바꾼 키만** 들어간다. 기본값은 파일에 쓰지 않으므로 코드 기본값이 바뀌면 바꾸지 않은 키는 따라간다.
- 읽기는 fail-quiet: 파일이 없거나 깨졌으면 전부 기본값, 모르는 키나 범위·형식이 틀린 키는 그 키만 기본값으로 두고 로그 한 줄을 남긴다.
- 쓰기는 strict: 요청 하나의 모든 키를 검증해 하나라도 틀리면 아무것도 쓰지 않고 `invalid_value`(어느 키인지 포함)로 거절한다. `expected_revision`이 다르면 `conflict`. 키 값으로 `null`을 보내면 그 키의 덮어쓰기를 지워 기본값으로 돌린다. 쓰기는 임시 파일 뒤 rename.
- 서버 안의 소비자는 프로세스 안 단일 접근자(예: `getTimingSettings()`)로 **유효값**(덮어쓰기 ∪ 기본값)을 읽고, 변경 알림(예: `onTimingSettingsChanged(listener)`)을 구독할 수 있다. 테스트용 초기화 훅을 둔다.

### 3.3 적용 의미

- **값은 시간을 계산하는 순간에 읽는다.** 이미 기록된 예약 시각 — 재시도 `next_at`, 공급자 `next_probe_at`, 외부 대기 `next_observation_at`, 완료 재시도 `next_at` — 은 다시 쓰지 않는다. 새 값은 그다음 계산부터 적용된다.
- 대기 진입 유예는 판정마다 `added_at`에서 다시 계산하므로 바꾸는 즉시 지금 유예 중인 항목에도 적용된다.
- 머지 큐 대기는 타이머를 거는 순간의 유효값을 쓴다. 생성 시점 deps 고정을 접근자 읽기로 바꾼다.
- 주기적 폴러(PR 폴링, 목록 새로고침, 모니터 갱신 구동기)는 값이 바뀌면 **즉시 새 간격으로 다시 건다.** 목록 새로고침을 0으로 하면 멈추고, 0에서 양수로 바꾸면 다시 돈다. 공용 폴러(`server/poller.js`)에 간격 변경 수단을 더한다(예: `setIntervalSeconds(n)`).
- 외부 작업 관찰기의 15초 틱은 그대로 둔다. process 하한을 15초로 둔 이유다. 기한 초과 판정(`wait-judgment.js`)도 같은 유효 간격을 읽는다.

### 3.4 프로토콜

모델 활성 설정과 같은 모양의 WS 메시지 네 개를 더한다(`app/protocol.js`, `app/protocol.md`).

- `subscribe-timing-settings` / `unsubscribe-timing-settings`
- `timing-settings-set` — `{ expected_revision, values: { <key>: <초 정수 | 초 정수 배열 | null> } }`. 응답은 `{ ok, code?, key?, snapshot }`.
- `timing-settings-snapshot` — `{ revision, values, overrides, fields }`. `values`는 유효값, `overrides`는 바꾼 키, `fields`는 키별 `default`·`min`·`max`·`rungs`·`unit`. 범위의 정본은 서버 표이고 클라이언트는 복제하지 않는다.
- 쓰기가 성공하면 모든 구독자에게 새 스냅샷을 보낸다.

### 3.5 설정 화면

- 일괄 모드(모니터 탭 헤더 ⚙)에 탭 하나를 더한다: `{ id: 'timing', label: '시간', glyph: '◷' }`. 서버 전역 설정은 일괄 모드에만 둔다는 기존 규칙(`전역` 탭)을 따른다.
- 부제: "모든 저장소에 공통인 서버 전역 값입니다. 이미 예약된 재시도·재확인 시각은 바뀌지 않고 다음 예약부터 적용됩니다."
- 다섯 묶음을 §3.1 순서의 그룹으로 그린다. 행마다 이름, 숫자 입력(`.ui-input`)과 단위, 기본값 힌트("기본 20초"), 바꾼 행에만 `[기본값]` 버튼(`.op-btn`). 사다리 행은 칸 수만큼 입력을 `→`로 잇는다. 그룹 아래 한 줄 설명으로 그 값이 무엇을 기다리는지 적는다.
- 하단에 `[저장]`과 `[모두 기본값]`. 저장은 바뀐 키만 한 번의 `timing-settings-set`으로 보낸다. 범위를 벗어나거나 사다리가 줄어드는 입력은 행 아래에 이유를 보이고 `[저장]`을 끈다.
- `conflict`면 최신 스냅샷으로 다시 그리고 "다른 곳에서 먼저 바뀌어 다시 불러왔습니다" 토스트를 띄운다. `invalid_value`면 해당 행에 서버 메시지를 보인다.
- Worker 탭의 남은 초 표시는 서버 유효값과 같은 유예를 쓴다. 클라이언트 상수 복제(`lane-model.js`의 20초)는 값이 없을 때의 대체값으로만 남는다(구 서버·구독 전 fail-quiet). 예: 앱 수준 timing store를 모델 활성 store처럼 기동 시 구독한다.
- 새 조작은 `docs/design-system.md`의 부품만 쓰고, 390px 폭에서 폭 넘침 탐침을 통과한다.

## 4. 경계

- 결정: 외부 작업 관찰의 오류 백오프(60/120/300/900초)와 hold 예산은 바꾸지 않는다 — 사용자가 요청한 것은 관찰 주기이고, 두 값은 계약의 판정 규칙과 묶여 있어 계약 변경 폭만 넓힌다.
- 결정: 대화형 세션 종료 유예(90초·30분 상한)는 바꾸지 않는다 — 고른 다섯 묶음 밖이고 현재 유효한 ADR UI-nuwy-2가 값을 명시한다.
- 결정: 완료 재시도의 검증 환경 오류 300초 분기는 바꾸지 않는다 — 사다리가 아니라 원인별 고정 분기다.
- 결정: attempt 재조정 주기(60초·30초), 캐시 TTL, 디바운스, 하위 프로세스 timeout은 노출하지 않는다 — 내부 배관이다.
- 결정: config.toml `poll_interval_seconds`는 그대로 읽는다 — 손으로 고친 설정을 깨지 않도록 기본값의 출처로 남긴다.
- 크로스 리포 unit: dotfiles — 계약 `external_wait.observation`의 `slurm_interval_seconds`·`process_interval_seconds`를 "기본값이며 런타임 소유자(beads-ui Worker)의 설정이 덮어쓸 수 있다"로 선언하고(`docs/contracts/workflow-state.yaml`, `docs/contracts/external-wait.md` §Observation, `check-workflow-contract.py` 기대 블록), `error_backoff_seconds`는 고정으로 남긴다. dotfiles rig의 quick_fix Bead dotfiles-4yl8n이 맡고, 이 Bead의 구현 진입 전 선행(`blocks`)으로 걸려 있다. 키 이름과 문구는 dotfiles가 정한다.

## 5. 수락 기준

1. 설정 파일이 없으면 모든 유효값이 §3.1 기본값과 같고, 지금과 동작이 같다.
2. 각 키를 설정에서 바꾸면 서버 재시작 없이 해당 소비자가 다음 계산부터(폴러는 즉시) 새 값을 쓴다.
3. 범위 밖 값, 분 단위 키의 60 배수가 아닌 값, 칸 수가 틀린 사다리, 줄어드는 사다리, 모르는 키는 쓰기가 거절되고 파일이 바뀌지 않는다.
4. 깨진 파일이나 틀린 키 하나는 그 키만 기본값으로 떨어지고 서버가 기동한다.
5. `[기본값]`·`[모두 기본값]`은 덮어쓰기를 지워 파일에서 그 키를 없앤다.
6. 동시에 두 창에서 저장하면 늦은 쪽이 `conflict`를 받고 최신 값으로 다시 그린다.
7. Worker 탭의 유예 남은 초가 설정한 유예와 일치한다.
8. dotfiles 계약 수정이 착지한 뒤에만 외부 작업 관찰 두 키가 설정에 나타난다(구현 진입 선행으로 보장).

## 6. Test scope

- `server/timing-settings*.test.js`: 파일 없음·깨짐 → 기본값; 틀린 키 하나만 기본값; 범위·칸 수·단조 위반 거절과 무변경; CAS `conflict`; `null` 복원; 변경 알림.
- `server/poller.test.js`: 간격 변경 시 재무장, 0이면 멈춤, 0→양수 재개.
- 소비자별 한 동작씩: 스케줄러 유예 판정, `queue-hold` 재시도 지연·`base_moved` 첫 칸, 완료 재시도, 자동 재개 지연, 공급자 재확인 지연 세 갈래, 머지 큐 세 대기의 타이머 시점 읽기, PR 폴러·목록 폴러·모니터 구동기 재무장, 외부 대기 관찰기 `next_observation_at`과 `wait-judgment` 기한 초과 판정.
- WS 핸들러: 구독 시 스냅샷, 성공 쓰기의 fanout, 거절 응답 코드.
- 클라이언트: 일괄 모드에 `시간` 탭; 그룹·행 렌더; 입력 검증과 `[저장]` 비활성; 바뀐 키만 담은 payload; `[기본값]`의 `null`; `conflict` 재그림; 레인 남은 초가 store 값을 쓰고 부재 시 20초.
- 폭 넘침 탐침에 `시간` 탭 포함.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — beads-ui는 dotfiles 계약을 코드 사본으로 소비하고 정의하지 않는다. 그래서 외부 작업 관찰 주기는 계약이 덮어쓰기를 허용한다고 선언한 뒤에만 설정으로 연다.
- Worker의 대기·관찰·재시도·폴링 시간은 서버 전역 타이밍 설정 파일 하나가 덮어쓰기만 저장하고 코드 상수·계약 사본·config.toml이 기본값이며, 새 값은 다음에 계산되는 예약부터 적용되고 이미 기록된 예약 시각은 다시 쓰지 않는다. 되돌리기 어려움: 성립 — 스케줄러·queue-hold·완료 재시도·자동 재개·공급자 재확인·머지 큐·PR/목록 폴러·외부 대기 관찰기·클라이언트 레인 표시·설정 화면과 dotfiles 계약 문구가 함께 움직여야 되돌린다. 맥락 없이 놀라움: 성립 — 상수를 읽는 사람은 값이 고정이라고 여기고, 값을 바꿨는데 이미 잡힌 재시도 시각이 그대로인 이유를 모른다. 실제 트레이드오프: 성립 — 저장소별 값·config.toml 저장·예약 시각 즉시 재계산을 버렸다. 새 주제: 가장 가까운 ADR UI-u6ud-2는 계약 소비 방식을 정할 뿐 런타임 값의 저장·적용 시점을 다루지 않고, UI-ooc0는 소비자가 모델 선택지뿐이다. `summary`: "Worker의 대기·관찰·재시도·폴링 시간은 서버 전역 타이밍 설정 파일이 덮어쓴 값만 저장하고 코드 상수·계약 사본·config.toml이 기본값이며 새 값은 다음 예약 계산부터 적용되고 기록된 예약 시각은 다시 쓰지 않는다" → ADR
- 대기 진입 유예를 설정으로 연다(이전 스펙 결정 8 번복) — 유효 ADR 조항이 아니고 위 후보에 포함되는 값 하나다 → ADR 아님
- 서버 전역 값은 일괄 모드 `시간` 탭에 둔다 — 되돌리기 어려움 불성립(클라이언트 렌더 위치뿐, 저장 데이터·프로토콜 무관) → ADR 아님
- 오류 백오프·hold 예산·대화형 종료 유예를 고정으로 둔다 — 실제 트레이드오프 불성립(현행 유지) → ADR 아님
