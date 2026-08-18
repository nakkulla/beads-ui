# 병렬성 분석 codex 러너·effort 선택·진행 표시 설계 (UI-yqw9)

## 배경

Worker 병렬성 분석(UI-04vo)은 세 가지가 미완이다.

1. **러너가 claude에 고정돼 있다.** `server/worker/parallel-analysis-runner.js`의
   `ANALYZER_RUNNERS = new Set(['claude'])`가 capability gate이고, codex는 이 집합에
   없어 spawn 전에 `capability_missing`으로 거부된다. 설정 스키마는 이미
   `runner: 'codex' | 'claude'`를 선언해 두었으나 codex transport가 확정되지 않아
   구현이 비어 있다.
2. **effort를 고를 수 없다.** 다이얼로그의 `settingsTemplate()`은 모델 드롭다운 하나만
   렌더하고 effort는 `effort ${settings.effort}` 텍스트로만 보인다.
   `updateSettings(model)`은 러너를 `'claude'`, effort를 `'high'`로 상수처럼 재전송해서
   서버가 이미 받아들이는 `{ runner, model, effort }` CAS를 절반만 쓰고 있다.
3. **분석 중임을 알 수 없다.** 서버 snapshot의 `job`은 `{ job_id, identity }`뿐이라
   무엇이 얼마나 돌고 있는지 표현할 수 없고, 다이얼로그는 버튼 비활성으로만 진행을
   암시한다. 다이얼로그를 닫으면 진행 흔적이 전혀 남지 않는다.

## 이 문서가 대체하는 것

2026-08-12 `worker-parallelism-analysis-design.md` §4의 codex 항목은
"tool declaration이 비어 있는 analyzer 전용 structured-completion transport만 허용한다"
까지만 정하고 실제 transport를 남겨 두었다. 이 문서가 그 transport를 확정한다. 같은
문서의 "일반 `codex exec --sandbox read-only`는 이 capability를 충족하지 않는다"는
판단은 **유지된다** — 아래 argv는 read-only 샌드박스에 의존하지 않고 tool 자체를
제거한다.

`docs/superpowers/specs/2026-08-12-worker-parallelism-analysis-design.md` §3의
"initial state는 unconfigured다" 역시 이 문서가 대체한다(§3 기본 선택).

## 목표

- 분석 설정에서 러너(claude/codex), 모델, effort를 카탈로그가 허용하는 범위에서 고른다.
- codex 러너가 tool 부재 상태로 분석을 수행하고 결과가 기존 validator를 그대로 통과한다.
- 분석이 도는 동안 다이얼로그와 Worker 컨트롤 바 양쪽에서 진행을 확인한다.

## 비목표

- implementation 러너의 write-capable argv(`server/worker/runner/codex.js`)를 재사용하지
  않는다. 이 문서의 argv는 analyzer 전용이며 세션·재개·훅·프리앰블을 공유하지 않는다.
- 실패 시 다른 provider로 자동 fallback하지 않는다.
- 결과 스키마(schema_version 2)와 `parallel-analysis-validator.js`의 판정 규칙을 바꾸지
  않는다. codex가 추가돼도 result는 같은 validator를 통과해야 한다.
- 새 WebSocket message type을 만들지 않는다. `job` 페이로드만 넓힌다.

## 1. codex analyzer transport

### 1.1 격리 근거 — 능력 부재

claude 경로가 `--tools ""`로 도구 집합을 비우듯, codex 경로는 도구를 만드는 feature
flag를 전부 끈다. `--disable <FEATURE>`는 `-c features.<name>=false`와 동치다.

실측 (codex-cli 0.147.0, 2026-08-18, 아래 argv 그대로):

- "`/etc/hosts`를 읽어 첫 줄을 보고하라" → 모델이 `NO_TOOL`을 보고했고 JSONL 스트림에
  command/exec 아이템이 하나도 없었다.
- "작업 디렉터리의 `./note.md`를 읽어라" → 같은 결과. 번들 디렉터리가 cwd인데도 읽지
  못했다. 즉 read 차단은 샌드박스 경계가 아니라 도구 부재에서 온다.
- 결과 스키마를 `--output-schema`로 건네면 최종 메시지가 스키마를 만족하는 strict JSON
  으로 나온다.

`--sandbox read-only`는 그럼에도 **유지한다**. 도구가 없다는 판단이 codex 빌드 변경으로
깨질 때 write가 즉시 새어 나가지 않게 하는 두 번째 방벽이다. 격리의 근거는 여전히 도구
부재이고, 샌드박스는 회귀 대비다.

### 1.2 고정 argv

```
codex exec --json
  -m <catalog model id>                 # sol -> gpt-5.6-sol
  -c model_reasoning_effort=<effort>
  -c web_search="disabled"              # features.web_search_request는 deprecated
  --sandbox read-only
  --ephemeral                           # 세션 파일을 남기지 않는다
  --ignore-user-config                  # ~/.codex/config.toml (MCP·훅·플러그인) 미적재
  --ignore-rules                        # execpolicy .rules 미적재
  --skip-git-repo-check                 # 번들 임시 디렉터리는 git 저장소가 아니다
  --output-schema <schema file>
  --disable shell_tool --disable unified_exec --disable view_image
  --disable search_tool --disable plugins --disable hooks
  --disable multi_agent --disable browser_use --disable computer_use
  --disable image_generation --disable memories --disable goals
  --disable tool_search --disable apply_patch_freeform
  -                                     # 프롬프트는 stdin
```

`cwd`는 claude 경로와 같이 번들 디렉터리다. 페이로드는
`buildAnalysisPayload()`가 만든 동일한 stdin 바이트다 — 프롬프트 계약(`ANALYSIS_PROMPT_VERSION`)은
러너와 무관하게 하나다.

모델 이름은 카탈로그 short name(`sol`)으로 저장하고 argv에서만 CLI id(`gpt-5.6-sol`)로
확장한다. **analyzer는 카탈로그를 allowlist로 쓴다** — implementation 어댑터의
"모르는 이름은 verbatim 통과" 규칙을 쓰지 않는다. 카탈로그에 없는 모델은 §2의 재검증에서
spawn 전에 거부되므로 id 확장은 언제나 검증된 엔트리에서만 일어난다. 확장은 analyzer
안에서 카탈로그 엔트리를 직접 조회하며, `runner/codex.js`를 import하지 않는다(세션 머신을
끌어오지 않기 위해).

### 1.3 결과 채널 — fail-closed

`--json`은 JSONL 이벤트 스트림이다. 판정 순서가 중요하다.

1. **먼저 실패 신호를 본다.** 스트림에 `item.completed` 중 `item.type === 'error'`가
   하나라도 있거나 `turn.failed` 이벤트가 있으면, 유효한 최종 메시지가 뒤따르더라도
   `runner_error`로 거부한다. 이것이 격리를 fail-closed로 만드는 지점이다: codex 빌드가
   바뀌어 `--disable <feature>`가 무효가 되면 codex는 그 사실을 error 아이템으로 보고하고
   (2026-08-18 실측에서 deprecated `web_search_request` flag가 정확히 그렇게 나왔다), 그
   턴은 도구가 살아 있는 채로 정상 결과를 낼 수 있다. 실패 신호를 무시하고 마지막
   메시지만 읽으면 격리가 조용히 사라진다.
2. 실패 신호가 없을 때만 결과를 읽는다. 결과는 **마지막** `item.completed` 중
   `item.type === 'agent_message'`의 `text`다. codex는 중간 진행 메시지를 같은 타입으로 한
   번 더 낼 수 있으므로 마지막 것만 결과로 읽는다.
3. `agent_message`가 하나도 없거나 파싱에 실패하면 `invalid_output`이다.

`runner_error`의 diagnostic은 error 아이템의 `message`를 capped 길이로만 남긴다. raw
transcript는 저장하지 않는다.

outcome 어휘는 기존 6종(`capability_missing`, `timeout`, `cancelled`, `spawn_failed`,
`exit_nonzero`, `invalid_output`)에 `runner_error` 하나가 늘어난다. 어느 실패도 last-good
캐시를 건드리지 않는다는 판단은 그대로다. codex도 `detached: true` + process group kill과
300초 timeout, kill grace 실측 경로를 공유한다.

### 1.4 스키마 파일 수명

`--output-schema`는 파일을 요구한다. 번들 디렉터리는 evidence locator 검증이 읽는 "모델이
실제로 받은 바이트"이므로 오염시키지 않는다. analyzer가 별도 `mkdtemp` 디렉터리에 스키마를
쓰고, run이 settle될 때 지운다. 스키마 내용은
`parallel-analysis-validator.js`의 v2 불변식을 그대로 옮긴 상수다(`STRONG_CATEGORIES`는
그 모듈에서 import해 두 벌이 갈라지지 않게 한다).

### 1.5 capability gate

`ANALYZER_RUNNERS = new Set(['claude', 'codex'])`. 집합 밖은 여전히 spawn 전에
`capability_missing`이고 fallback은 없다.

## 2. 모델·effort 어휘

카탈로그(`server/worker/runner-catalog.js`)는 러너 단위 `efforts`와 모델 단위 `efforts`를
모두 가진다. codex는 모델마다 다르다(`sol`/`terra`는 low·medium·high·xhigh,
`luna`는 max 추가). 지금 `runtime.js`의 `validateSelection`은 러너 단위 목록만 봐서
`sol` + `minimal` 같은 실행 불가 조합을 허용한다.

**판정 규칙(단일 함수):** 모델에 `efforts`가 있으면 그것이, 없으면 러너 `efforts`가
그 모델의 effort 어휘다. 서버 저장 검증과 클라이언트 드롭다운이 같은 규칙을 쓴다.
서버는 이 규칙으로 거부하면 쓰기 없이 `selection_invalid`를 돌려준다(기존 동작 유지).

### 2.1 저장 시점이 아니라 실행 시점에도 검증한다

설정은 서버 전역 파일에 남고 카탈로그는 `~/.config/bdui/config.toml`과 빌드에 따라 바뀐다.
저장 당시 유효했던 선택이 재시작 뒤에도 유효하다는 보장은 없다. 저장 검증만으로는
"catalog에서 사라진 모델이나 비호환 effort는 spawn 전에 fail-visible하게 거부한다"는
UI-04vo의 판단이 깨진다.

따라서 **분석 start는 유효 선택(저장값 또는 §3 기본값)을 현재 카탈로그로 다시 검증한 뒤에만
프로세스를 띄운다.** 위와 같은 단일 함수를 쓰고, 실패하면 snapshot 생성도 번들 수집도
하지 않고 `settings_incompatible`로 거부한다. 자동으로 다른 모델·effort·러너를 고르지
않는다.

snapshot의 `settings`는 `compatible: boolean`을 함께 싣는다. 저장값은 UI 표시용으로
보존하되(사용자가 무엇을 골랐었는지 보여야 고칠 수 있다), 비호환이면 다이얼로그가
설정 오류를 표시하고 분석 버튼을 비활성한다.

## 3. 기본 선택

`initial state는 unconfigured`를 대체한다. 저장된 설정에 `runner`/`model`/`effort` 중
하나라도 없으면 기본 선택을 사용한다.

- 기본값: `claude` / `opus` / `high`.
- 기본값은 저장하지 않는다. `revision`은 0으로 남고, 사용자의 첫 저장이 CAS 0에서
  정상 성립한다.
- snapshot의 `settings`에 `is_default: boolean`을 실어 UI가 "기본값"임을 표시한다.
- 기본값이 카탈로그에서 사라지면(설정 override로 claude/opus가 없어지는 경우) 미설정으로
  되돌아간다 — 자동으로 다른 모델을 고르지 않는다.

전부 채워진 저장 설정은 지금처럼 그대로 쓰이며 `is_default: false`다.

**거부 사유는 유효 선택의 출처로 갈린다.** §2.1의 재검증이 실패했을 때, 유효 선택이
기본값에서 왔으면 `settings_missing`(설정된 것이 없고 기본값도 못 쓴다 — UI는 설정을
요구한다), 저장값에서 왔으면 `settings_incompatible`(사용자가 고른 것이 더는 유효하지
않다 — UI는 그 값을 보여 주며 고치라고 한다)이다. 두 경우 모두 spawn은 없다.

## 4. 진행 상태

### 4.0 준비 구간도 진행이다

`job`은 서버가 **snapshot을 만들고**(`bd list --json` + git base 해석 + 아티팩트 OID 수집)
**번들을 수집한 뒤에야** 생긴다. 그 준비 구간은 큐 크기에 따라 수 초가 걸리고, 그동안
서버에는 알릴 job이 없다. job만 진행 신호로 쓰면 클릭 직후 가장 기다림이 긴 구간에 아무
표시도 없어서 "분석을 누르면 분석 중임을 UI에서 확인한다"는 요구를 충족하지 못한다.

그래서 진행은 **두 단계**다.

- `준비 중` — 클라이언트가 start 요청을 보낸 순간부터. 브라우저 로컬 상태이며 클라이언트
  분석 스토어가 소유한다(`pending`). start 응답이 돌아오면(성공·거부·예외 무관) 반드시
  해제한다. `settings_missing`·`settings_incompatible`·`base_unresolved` 같은 조기 거부도
  같은 해제 경로를 지난다.
- `분석 중` — 서버 snapshot의 `job`이 도착한 순간부터. 서버 전역이므로 다른 브라우저 탭과
  재접속에서도 보인다.

다이얼로그와 컨트롤 바는 **같은 스토어의 같은 두 값**을 읽는다. 표시 조건은
`job ? '분석 중' : pending ? '준비 중' : 없음`이다. `pending`은 브라우저 로컬이므로 다른
탭에서 시작한 분석은 그 탭에서만 `준비 중`으로 보이고, `job`이 뜨는 순간부터 모든 탭에서
`분석 중`으로 보인다 — 준비 구간은 요청을 보낸 클라이언트만의 상태라는 뜻이며 이는 의도된
것이다.

### 4.1 job 페이로드

`activeJob(workspace)`가 `{ job_id, identity, runner, model, effort, started_at }`을
돌려준다. `startJob`이 selection과 `started_at = now()`를 기록한다. 새 message type은
없고 기존 `worker-parallel-analysis-snapshot`의 `job`이 넓어질 뿐이다.

`job`은 여전히 프로세스 메모리다. 디스크 마커는 죽은 서버의 orphan이며 idle로 읽는 기존
판단은 그대로다.

### 4.2 클라이언트 스토어

`app/data/worker-parallel-analysis-store.js`는 지금 서버 snapshot 하나만 들고 있다. 여기에
브라우저 로컬 `pending`을 나란히 둔다.

- `get()`은 지금처럼 서버 snapshot을 돌려준다(기존 소비자 무변경).
- `isPending()` / `setPending(boolean)`을 더한다. `setPending`은 값이 바뀔 때만 emit한다.
- `set()`은 `pending`을 건드리지 않는다. 서버 push와 로컬 요청 상태는 서로를 덮지 않는다.
- `clear()`는 둘 다 비운다(워크스페이스 전환).

`pending`을 세우고 내리는 곳은 **분석 start 경로 하나뿐**이다. 그룹 제출과 설정 저장은
분석 실행이 아니므로 여기에 넣지 않는다 — 제출 중에 컨트롤 바가 "분석 중"이라고 말하면
거짓이다. 다이얼로그의 기존 로컬 in-flight 플래그는 그 두 경로의 버튼 중복 클릭 방지용으로
남고, 분석 버튼의 비활성 조건만 스토어 `pending`을 함께 본다.

### 4.3 다이얼로그

meta 영역에 진행 줄을 렌더한다.

- `job`이 있으면 `분석 중 — <runner>/<model> · effort <effort> · 경과 M:SS`.
- `job`이 없고 `pending`이면 `준비 중 — 대상과 아티팩트 수집 중`.
- 경과는 `started_at` 기준으로 1초마다 다시 렌더한다. 타이머는 **다이얼로그가 열려 있고
  job이 있을 때만** 돈다. 닫기·destroy·job 소멸에서 반드시 해제한다. `준비 중`에는
  경과가 없으므로 타이머도 돌지 않는다.
- 취소 버튼은 지금처럼 `job` 유무로만 활성된다(진행 중 취소가 목적이므로 요청 in-flight
  상태에 묶지 않는다는 기존 판단 유지). 준비 구간에는 취소할 프로세스가 없다.

### 4.4 Worker 컨트롤 바

`[✳ 병렬성 분석]` 버튼이 `job` 또는 `pending` 동안 진행을 표시한다.

- 텍스트 뒤에 `분석 중` / `준비 중` 배지, `aria-busy="true"`,
  `.worker-analysis-btn--running`.
- Worker 뷰가 `analysisStore`를 구독해 두 값의 전이에서 다시 렌더한다. 구독 해제는 뷰
  destroy에 포함한다.
- 버튼 자체는 계속 눌러 다이얼로그를 열 수 있다. 진행 표시가 조작을 막지 않는다.

경과 시간은 버튼에 넣지 않는다 — 컨트롤 바 전체를 1초마다 다시 그리게 만들 이유가 없다.

## 5. 변경 표면

| 파일 | 변경 |
| --- | --- |
| `server/worker/parallel-analysis-runner.js` | `ANALYZER_RUNNERS`에 codex 추가, `codexAnalysisArgv()`, fail-closed JSONL 판정, `runner_error`, 스키마 파일 수명, 모델 id 확장 |
| `server/worker/parallel-analysis-store.js` | 기본 선택과 `is_default`, `startJob` selection/`started_at`, `activeJob` 확장 |
| `server/worker/runtime.js` | `validateSelection`이 모델 단위 effort 우선, 실행 시점 재검증에 같은 함수 노출 |
| `server/ws/worker-parallel-analysis-handlers.js` | start 시 선택 재검증(`settings_incompatible`), snapshot `settings.compatible`, `startJob`에 selection 전달 |
| `app/data/worker-parallel-analysis-store.js` | typedef 확장, 브라우저 로컬 `pending` |
| `app/views/worker/parallel-analysis-dialog.js` | 러너·모델·effort 3단 선택, 기본값·비호환 표시, `준비 중`/`분석 중` 진행 줄과 경과 타이머 |
| `app/views/worker/index.js` | `analysisStore` 구독, 버튼 진행 배지 |
| `app/styles.css` | 진행 줄·버튼 배지 스타일 |
| `docs/superpowers/specs/2026-08-12-...-design.md` | codex 항목과 unconfigured 항목에 이 문서 포인터 |

## 6. 검증

`vitest` 단위 테스트로 고정한다.

- codex argv에 tool을 등록하는 인자가 없고, 위 §1.2의 비활성 목록이 전부 들어 있다.
- codex JSONL에서 마지막 `agent_message`만 결과로 읽는다(중간 메시지 무시).
- **error 아이템과 유효한 최종 `agent_message`가 함께 있는 스트림 → `runner_error`로 거부**
  (§1.3의 fail-closed 지점, 실측된 deprecated-flag 이벤트 모양을 fixture로 고정).
- `turn.failed`가 있는 스트림 → `runner_error`.
- `agent_message` 부재 또는 파싱 실패 → `invalid_output`.
- 스키마 임시 디렉터리가 settle 후 남지 않는다.
- 카탈로그에 없는 러너는 여전히 spawn 없이 `capability_missing`.
- effort 판정: `sol` + `minimal` 거부, `sol` + `xhigh` 허용, `luna` + `max` 허용,
  `opus` + `xhigh` 허용, `opus` + `max` 거부.
- 저장된 설정이 현재 카탈로그와 맞지 않으면 start가 snapshot 생성 없이
  `settings_incompatible`로 거부하고 spawn을 하지 않는다(주입한 spawn이 호출되지 않음을
  단언한다).
- 설정 미저장 시 기본 선택과 `is_default: true`, 저장 후 `is_default: false`.
- 기본 모델이 카탈로그에 없으면 `settings_missing`.
- `activeJob`이 selection과 `started_at`을 싣는다.
- 다이얼로그: 러너 변경이 모델/effort 목록을 갈아끼우고, effort 변경이 CAS로 전송된다.
- 다이얼로그: `pending`만 있고 `job`이 없으면 `준비 중`, `job`이 오면 `분석 중`으로
  전이하고, 조기 거부 응답에서 `pending`이 해제된다(지연 준비 구간을 지연 transport로
  재현한다).
- 다이얼로그: job 소멸 시 경과 타이머가 해제된다.
- Worker 뷰: `pending` 또는 `job`에서 버튼에 진행 표시, 둘 다 없으면 사라진다.
- 클라이언트 스토어: `set()`이 `pending`을 덮지 않는다.

배선 검증은 `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
`npm run build`다. 실제 codex 과금 호출은 테스트에 넣지 않는다 — 위 실측이 argv 근거이고,
테스트는 spawn을 주입해 argv와 파싱만 고정한다.

## 7. 위험

- **codex feature flag 이름 변경.** 빌드가 바뀌어 `--disable shell_tool`이 무효가 되면
  격리가 사라질 수 있다. 완화는 세 겹이다: (1) §1.3의 fail-closed 판정이 error 아이템을
  결과보다 먼저 보고 거부하므로 무효 flag는 조용히 지나가지 못한다, (2) argv 고정 테스트가
  목록을 문서화한다, (3) `--sandbox read-only`가 write에 대한 두 번째 방벽으로 남는다.
  남는 구멍은 codex가 flag를 **경고 없이** 무시하는 경우인데, 그때도 read-only 샌드박스가
  write를 막고 번들 디렉터리가 cwd라 읽을 것이 없다.
- **codex 입력 토큰.** codex는 자체 시스템 프롬프트가 커서 작은 번들에도 3만 토큰 근처를
  쓴다. 사용자가 러너를 고르는 선택지이므로 차단하지 않고 기본값을 claude로 둔다.
- **`--output-schema` 거부.** 스키마가 provider structured-output 제약을 어기면 run이
  실패한다. 실측에서 §1.4 스키마는 수용됐고, 실패해도 last-good 캐시는 손대지 않는다.
