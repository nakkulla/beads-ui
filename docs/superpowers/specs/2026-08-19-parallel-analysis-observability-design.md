# 병렬성 분석 관측성·대상 선택·실행 이력 설계

## 배경

Worker 병렬성 분석(UI-04vo, UI-yqw9)은 실행 자체는 붙어 있으나 네 가지가 미완이다.
2026-08-19 기준 실측: 이 머신의 어느 워크스페이스에도
`$XDG_STATE_HOME/bdui/<slug>/parallel-analysis.json`(last-good 캐시)이 존재하지
않는다 — 성공한 분석이 한 번도 없었다는 뜻이고, 사용자는 그 이유를 화면에서 알 수
없었다.

1. **실행이 불투명하다.** 분석기는 도구 없는 1회성 프로세스
   (`claude --print --tools '' … --output-format text`)라 세션 ID도 이벤트
   스트림도 없다. 다이얼로그는 "분석 중 — runner/model · 경과"까지만 보여주고,
   무엇을 하고 있는지·어떤 프롬프트를 받았는지는 보이지 않는다.
2. **실패가 증발한다.** 실패는 start 요청의 응답(토스트 한 번)으로만 전달된다.
   타임아웃(상한 300초)이 오기 전에 탭을 닫거나 WebSocket이 끊기면 아무 흔적이
   없다. 서버가 재시작되면(이 저장소들은 머지마다 재배포로 재시작된다) 진행 중이던
   잡은 in-memory라 그냥 사라지고, 디스크의 orphan 마커는 조용히 idle로 읽힌다.
   "재시작마다 초기화된 것 같다"는 관측이 정확히 이것이다.
3. **"대상 N"이 두 겹으로 오독을 만든다.** 다이얼로그의 `대상 N`은 병렬 대기 +
   직렬 레인 항목 수인데, 서버가 실제 분석하는 대상은 레인과 무관한
   `qualifyTargets` 통과 집합(open top-level + `spec_backed`/`full_plan` route +
   `spec_review` 영수증 + `worker-ineligible` 없음)이다. 후보 레인의 quick_fix
   Bead가 왜 빠지는지 화면 어디에도 없다. 서버는 제외 사유(`excluded`)를 이미
   계산하지만 스냅숏 내부에만 있고 UI가 렌더하지 않는다.
4. **대상을 고를 수 없다.** 분석은 항상 자격 집합 전체를 대상으로 돈다. "이번엔 이
   둘만 비교하고 싶다"가 불가능하다.

## 목표

- 실행 중인 분석의 **세션 ID를 표시**하고, 클릭 한 번으로 기존 transcript drawer에서
  **실시간 모니터링**한다.
- 실행마다 stdin **프롬프트 전문을 보관**하고 다이얼로그에서 상세 팝업으로 본다.
- 분석 가능 우주 전체 — 자격 있는 open Bead와 자격 미달 open Bead(후보·대기·
  직렬·미배치 불문) — 를 **자격/제외 사유와 함께 나열**하고, 자격자를
  **체크박스로 선택**해 부분집합 분석을 돌린다.
- 성공·실패·취소·재시작 중단을 모두 담는 **durable 실행 이력(최근 20건 회전)**을
  워크스페이스 상태 디렉터리에 남긴다.

## 비목표

- 격리 태세를 바꾸지 않는다. 도구 없는 argv(claude `--tools ''`, codex
  `--disable …` 집합), 카탈로그 allowlist, provider fallback 금지, fail-closed
  검증기(`parallel-analysis-validator.js`)와 결과 스키마(schema_version 2)는 그대로다.
- Worker attempt 세션 러너(`server/worker/runner/*.js`)를 재사용하지 않는다.
  분석기는 여전히 별도의 analyzer 전용 adapter다.
- 스펙 없는 Bead(quick_fix 등)를 분석 대상으로 만들지 않는다. 분석의 근거 입력은
  스펙/플랜 문서이고, 문서 없는 Bead는 제외 사유와 함께 표시만 한다.
- last-good 캐시의 의미(성공만 교체, 실패는 불가침)와 submit 경로의 보안 경계
  (서버 재검증 + 큐 CAS)를 바꾸지 않는다. 자동 실행(큐 배치·재정렬에 연동)을
  추가하지 않는다.

## 1. 스트림 전환과 세션 식별 (runner)

`server/worker/parallel-analysis-runner.js`.

### 1.1 claude argv — 출력 형식만 변경

```
--print --tools '' --safe-mode --strict-mcp-config
--setting-sources user --no-session-persistence
--model <model> [--effort <effort>]
--output-format stream-json --verbose        # ← 기존 text 대체
```

`--output-format text`를 `stream-json`(+ print 모드 필수 짝 `--verbose`)으로 바꾼다.
그 외 플래그는 불변 — 도구 부재·설정 격리·세션 미보존이 그대로이므로 UI-04vo §7의
격리 근거는 유지된다.

### 1.2 스트림 파싱 — fail-closed 순서

stdout을 JSONL로 읽어 최종 `type:"result"` 이벤트를 판정한다:
`is_error === true` 또는 `subtype !== 'success'`이면 `runner_error`
(diagnostic = subtype/에러 메시지 앞 200자), 아니면 `result` 필드 텍스트를 strict
JSON으로 파싱한다. codex 경로와 같은 판정 순서를 적용한다: **스트림 실패 판정 →
exit code → 결과 파싱.** result 이벤트가 없으면 `invalid_output`(diagnostic
`no result event`). codex 경로(`parseCodexAnalysisStream`)는 판정 로직 불변.

### 1.3 이벤트 콜백·payload seam

`runAnalysis(input)`에 두 가지를 추가한다.

- `onStreamLine?: (line: string) => void` — stdout의 JSONL 각 줄(파싱 성공 여부와
  무관하게 비어 있지 않은 줄)을 호출 시점에 전달한다. 러너는 브로커·파일·세션
  ID를 모른다 — 기록과 세션 ID 추출은 호출자(핸들러) 소유다(§2).
- `payload: string` — stdin으로 쓸 바이트를 호출자가 만들어 넘긴다. 러너 내부의
  `buildAnalysisPayload` 호출은 제거한다. 핸들러가 payload를 **한 번만** 생성해
  프롬프트 저장(§3)과 stdin에 같은 문자열을 쓰므로, 저장본과 모델이 실제 받은
  바이트가 어긋날 수 없다.

## 2. 세션 로그 기록과 모니터링 (handler + drawer 재사용)

run id는 기존 job id(`analysis-<ts>-<seq>`)를 그대로 쓴다 — 이력 레코드의
`run_id`는 활성 잡의 `job_id`와 같은 값이고, 별도의 새 식별자를 만들지 않는다.
attempt_id 네임스페이스와의 충돌은 접두사 `analysis-`가 막는다.

id는 spawn **전에** 필요하다(로그 writer·프롬프트 저장·`running` 레코드가 모두 run
id로 파일을 연다). 따라서 `startJob`의 `start` 콜백 계약을 `start(job_id)`로
바꾼다: store가 id를 만들어 콜백에 넘기고, 핸들러는 그 id로 준비를 마친 뒤
`runAnalysis`를 띄운다. join 경로(동일 identity 합류)는 콜백을 타지 않으므로
불변.

- **파일**: 핸들러가 `sessionLogPath(workspace, run_id)`
  (`sessions/analysis-….jsonl`)에 append 스트림으로 각 줄을 기록한다. attempt와
  달리 러너 자식이 fd를 상속받지 않으므로 서버 측 기록이 유일한 writer다.
- **라이브**: 같은 줄을 Worker runtime의 공용 세션 로그 브로커
  (`getWorkerRuntime().sessionLog.publish(workspace, run_id, event)`)로 재방송한다.
  기존 `subscribe-session-log`가 `{ attempt_id: run_id }`로 스냅숏 + append를
  그대로 제공하므로 **새 message type이 필요 없다.**
- **세션 ID 추출**: 핸들러가 `onStreamLine`에서 claude `type:"system",
  subtype:"init"`의 `session_id`, codex `thread.started`의 `thread_id`를 읽어
  run 레코드에 기록하고 fanout으로 알린다(`--no-session-persistence`라 세션 파일은
  남지 않지만 id는 발급된다). 이벤트가 없으면 null — 표시만 비고, 실패로 다루지
  않는다.
- **drawer**: `transcript-drawer`를 run id로 연다. claude stream-json과 codex
  JSONL 모두 attempt 경로에서 이미 파싱되는 형식이라 `parseTranscript` 변경은
  없다.
- **표시**: 다이얼로그 진행 줄에 세션 ID(앞 8자)와 `[모니터링]` 버튼을 추가한다.
  스냅숏의 `job` 페이로드에 `session_id`를 추가한다(run id는 기존 `job_id`).

## 3. 프롬프트 상세

- 핸들러는 spawn 직전, §1.3에서 한 번 생성한 payload 문자열을
  `analysis-runs/<run_id>-prompt.txt`(워크스페이스 상태 디렉터리, `state-paths.js`에
  `parallelAnalysisRunDir()` 신설)에 저장한다 — stdin에 쓰는 것과 같은 바이트다.
  저장 실패는 실행을 막지 않는다(레코드에 `prompt_saved: false`).
- 새 요청/응답 message `worker-parallel-analysis-prompt`
  `{ root_dir, run_id }` → `{ ok, prompt }`. run 레코드에 없는 id나 파일 부재는
  `not_found`.
- 다이얼로그 실행 이력 행과 진행 줄의 `[프롬프트]` 버튼이 이 내용을 고정 팝업으로
  띄운다. 팝업 셸은 `repo-ops-script-viewer.js`의 구조(모달 + `<pre>` + 복사 버튼)를
  분석 다이얼로그용 경량 컴포넌트로 재사용한다.

## 4. 대상 패널과 부분집합 선택

### 4.1 대상 조회 — 새 message `worker-parallel-analysis-targets`

요청 `{ root_dir }` → 응답:

```
{
  qualified: [{ id, title, route, spec_id, plan_path, lane }],
  excluded:  [{ id, title, reason, lane }]
}
```

`bd list --json` + `qualifyTargets` + 큐 스냅숏 레인 오버레이만으로 만든다 — git
blob 고정(`collectAnalysisSnapshot`)은 하지 않으므로 다이얼로그 열기에 git 비용이
없다.

패널의 모집단은 **레인이 아니라 서버의 분석 가능 우주**다. `qualified`는
`qualifyTargets` 통과 집합 전체 — start가 `target_ids` 생략 시 실제로 분석하는
바로 그 집합 — 이고, `excluded`는 open Bead 중 사유가 `closed`인 행만 버린
나머지(`phase_child`, `route`, `spec_missing`, `spec_conflict`, `spec_review`,
`worker_ineligible`)다. 미배치(`lane: null`) Bead를 의도적으로 포함한다: 후보
레인은 큐 스냅숏에 없는 Board 파생 개념이라, 큐·직렬 레인 항목으로 제한하면 후보
레인 이슈가 다시 보이지 않게 된다 — 이 기능의 발단이 된 바로 그 문제다. `lane`은
`'parallel' | 's<n>' | null`(미배치)로 배지 표시에만 쓴다.

### 4.2 다이얼로그 대상 패널

- 요약: `자격 n · 제외 m` — 기존 `대상 N`(레인 항목 수) 표기는 **삭제**한다.
- 자격자 행: 체크박스(기본 전체 체크) + 제목 + route + 레인 배지.
- 제외 행: 비활성 + 사유 한글 배지(`스펙 없음`, `route 미달`, `스펙 리뷰 없음`,
  `스펙 충돌`, `phase child`, `worker 제외`). 기본 접힘, 펼치기 토글.
- 체크 상태는 브라우저 로컬(다이얼로그 수명)이며 저장하지 않는다.

### 4.3 start의 부분집합 계약

`worker-parallel-analysis-start` payload에 `target_ids?: string[]`를 추가한다.

- 생략: 기존 의미(자격 집합 전체). 하위 호환.
- 배열: 서버가 자격 집합을 재판정한 뒤 **전부 자격자여야** 진행한다. 하나라도
  미자격이면 `target_not_qualified`(detail에 해당 id들) — 부분 교집합으로 조용히
  줄이지 않는다. 빈 배열(또는 교집합 공집합)은 `no_targets`.
- `collectAnalysisSnapshot`은 자격 집합을 요청 부분집합으로 제한한 뒤 기존 로직
  그대로 pinning한다. `target_ids`가 digest에 이미 들어가므로 선택이 다르면 캐시
  정체성이 자연히 달라진다.

### 4.4 submit 정합 — 부분집합 재유도

`handleParallelAnalysisSubmit`의 snapshot 재유도는 지금 자격 집합 전체로 다시
만들기 때문에, 부분집합으로 생산된 last_good과 digest가 항상 어긋나게 된다.
last_good에 `target_ids`를 함께 저장하고, submit의 재유도는 그 pinned 부분집합으로
`collectAnalysisSnapshot`을 호출한다. 비교 대상 digest·거부 어휘는 불변.

## 5. Durable 실행 이력

새 모듈 `server/worker/parallel-analysis-runs.js`.

### 5.1 저장소

`$XDG_STATE_HOME/bdui/<slug>/parallel-analysis-runs.json` — `{ runs: [...] }`,
최신순, **상한 20건**, 기존 `persist`(tmp + rename) 패턴. 상한 초과로 밀려난
레코드는 자기 소유 파일(`analysis-runs/<run_id>-prompt.txt`,
`sessions/<run_id>.jsonl`)을 함께 삭제한다 — `analysis-` 접두사 파일만 지우므로
attempt 세션 로그는 건드리지 않는다.

### 5.2 레코드 스키마

```
{
  run_id, session_id: string|null,
  runner, model, model_id, effort,
  target_ids: string[], snapshot_digest, identity,
  started_at, ended_at: number|null,
  outcome: 'running'|'success'|'failure'|'cancelled'|'interrupted',
  reason: string|null,        // failure의 refusal 어휘 그대로
  diagnostic: string|null,    // outcome envelope의 200자 캡 diagnostic 보존
  prompt_saved: boolean
}
```

### 5.3 수명

- start가 잡을 만든 직후 `running` 레코드를 기록한다(단일-flight join은 새 레코드를
  만들지 않는다).
- outcome 확정 시(성공/검증 거부/취소/타임아웃/spawn 실패) 해당 레코드를 갱신한다.
  검증기 거부(`schema_invalid` 등)도 `failure` + reason으로 남는다.
- **재시작 중단 확정은 읽기 경로 lazy 조정이다.** runs 모듈의 읽기 함수가 현재
  활성 잡 id 집합(`activeJob`)을 인자로 받아, 활성 잡이 없는 `running` 레코드를
  발견하는 즉시 `interrupted`(reason `server_restart`, `ended_at` = 조정 시각)로
  고쳐 쓴 뒤 반환한다. 같은 서버 프로세스 안에서 `running` 레코드는 항상 활성
  잡과 짝이므로, 이 조건이 참이 되는 유일한 경로는 이전 프로세스의 죽음이다.
  기동 시 전 워크스페이스 스캔이 필요 없고(레코드는 읽힐 때까지 관측 불가이므로
  의미 동일), 기존 store의 "orphan 마커는 idle로 읽는다" 동작은 유지하되 그
  orphan이 이제 이력에는 남는다.

### 5.4 노출

`worker-parallel-analysis-snapshot`(구독 fanout 포함) 페이로드에 `runs`(레코드
배열, 프롬프트 내용 제외)를 추가한다. 새 message type 없음. 다이얼로그는 최근
실행 목록을 렌더한다: 상태 칩 · 시각 · runner/model/effort · 세션 ID ·
`[모니터링]`(세션 로그 파일 존재 시) · `[프롬프트]`(prompt_saved 시).

## 6. 프로토콜 변경 요약

| 항목 | 변경 |
| --- | --- |
| `worker-parallel-analysis-targets` | 신설 (요청/응답, §4.1) |
| `worker-parallel-analysis-prompt` | 신설 (요청/응답, §3) |
| `worker-parallel-analysis-start` | payload에 `target_ids?` 추가 (§4.3) |
| snapshot/fanout payload | `runs` 추가, `job`에 `session_id` 추가 (`job_id`가 곧 run id) |
| `subscribe-session-log` | 변경 없음 — run id를 attempt_id 자리에 사용 |

`app/protocol.js`의 MessageType union에 두 타입을 추가한다.

## 7. 오류 처리

- refusal 어휘 추가: `target_not_qualified`(start), `not_found`(prompt). 기존
  어휘(`capability_missing`, `timeout`, `cancelled`, `spawn_failed`,
  `exit_nonzero`, `invalid_output`, `runner_error`, `no_targets` 등)는 불변.
- 세션 로그 기록 실패(디스크 오류)는 실행을 중단하지 않는다 — publish는 계속하고
  drawer 스냅숏만 비게 된다. 프롬프트 저장 실패도 동일(§3).
- run 레코드 파일이 손상되면 빈 이력으로 읽고 다음 기록에서 재생성한다(fail-quiet,
  last_good 캐시와 동일한 태도).

## 8. 테스트

- **runner**: claude argv 고정(stream-json + verbose, 나머지 불변), stream-json
  result 파싱(성공/`is_error`/이벤트 부재, 판정 순서), `onStreamLine` 호출.
- **handler 세션 기록**: run id 선행 전달(`start(job_id)`), payload 단일 생성과
  stdin 동일성, 세션 로그 파일 기록, 브로커 publish, claude `session_id`/codex
  `thread_id` 추출과 fanout.
- **runs store**: 기록→갱신 수명, 20건 회전과 파일 동반 삭제, 활성 잡 없는
  `running` 레코드의 읽기 시점 `interrupted` 조정, 손상 파일 fail-quiet.
- **targets handler**: qualified/excluded 응답(closed 필터, 레인 오버레이),
  `target_ids` 부분집합 스냅숏, `target_not_qualified`·`no_targets` 거부,
  부분집합 digest가 전체 집합과 다름.
- **submit**: 부분집합 last_good에 대한 재유도 일치(§4.4), 기존 거부 어휘 회귀.
- **snapshot payload**: `runs`·`job.session_id` 노출, join 시 레코드 미중복.
- **dialog**: 대상 패널 렌더(체크박스 기본 전체, 제외 접힘), 체크 → start payload,
  진행 줄 세션 ID·모니터링 버튼, 이력 행 버튼 활성 조건, 프롬프트 팝업.

## 구현 파일

- `server/worker/parallel-analysis-runner.js` — §1
- `server/worker/parallel-analysis-runs.js` (신설) — §5
- `server/worker/parallel-analysis-targets.js` — §4.3 부분집합 입력
- `server/worker/parallel-analysis-store.js` — last_good에 `target_ids` 동반 저장,
  `startJob`의 `start(job_id)` 콜백 계약(§2)
- `server/worker/state-paths.js` — `parallelAnalysisRunsPath`, `parallelAnalysisRunDir`
- `server/ws/worker-parallel-analysis-handlers.js` — §2·§3·§4·§5 배선
- `server/ws/connection.js`, `app/protocol.js` — message 라우팅/타입
- `app/views/worker/parallel-analysis-dialog.js` — §2 표시, §3 팝업, §4.2 패널,
  §5.4 이력 목록
- `app/views/worker/index.js` — 다이얼로그에 transcript drawer 열기 콜백 전달
