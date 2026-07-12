# Worker 보드 v2: ccx 기반 머지까지 자동 큐 (UI-ufkg)

## 목적

Worker 탭을 카드형 3+1 lane 보드로 재설계하고, 실행 엔진을 `ccx`(claude-code-proxy
경유 Claude Code headless, Codex 백엔드) 기반 2단계 파이프라인으로 교체한다.
사용자가 waiting 큐에 올린 parent Bead 들을 **머지 완료까지** 무인으로 순차(또는
opt-in 병렬) 실행하고, 한 작업이 끝나면 60초 뒤 다음 작업을 자동 시작한다.

본 spec 은 [2026-05-13 Worker 보드 재설계 spec](2026-05-13-worker-board-redesign-design.md)
(UI-l3c3, PR #16 미머지) 을 **supersede** 한다. 폐기 사유: 실행 러너 변경
(`codex exec` → `ccx`), 완료 기준 변경(PR Delivery → 머지 완료), 병렬 분석 기능
추가, 2개월 경과로 main 과의 신뢰성 저하. 재사용 가치가 검증된 세부 설계
(sort_key 정책, lane 파생 규칙, 재시작 복구 정책 등)는 본 spec 에 명시적으로
승계한다.

## 배경 결정 (2026-07-12 brainstorming 승인)

| 축 | 결정 |
| --- | --- |
| 완료 기준 | 머지까지 (2단계: `/goal`→PR 생성 → 봇 리뷰 대기 → `pr-finish`→머지) |
| 실행기 | `ccx` headless (`--output-format stream-json`) |
| 기본 모델/effort | `sol`(gpt-5.6-sol) / `high`, 이슈별 override |
| 배치 | Mac Studio 로컬 bdui worker 인스턴스, NAS UI 는 조회용 |
| 큐 진입 | spec 필수, plan 유무는 배지 표시(막지 않음) |
| 병렬 분석 | 보드 버튼 → 서버 소유 프롬프트 1회 실행 → hint metadata (전용 스킬 없음) |
| 병렬 실행 | detail 드롭다운 수동 확정(`worker_parallel`), 기본 serial |
| 무인 실행 | dotfiles 워크플로우 계약 fast-track 정합과 한 쌍 (`dotfiles-10zx`) |

## 비목표

- NAS 인스턴스에서의 worker 실행 (조회 전용; worker 기능은 config flag 로 게이트).
- NAS→Mac 원격 디스패치 채널 (추후 필요 시 별도 spec).
- child 이슈 단위 실행 (child 는 parent 의 `/goal` 세션이 일괄 진행).
- `/goal`·`pr-finish` 외 임의 명령 lane 진입.
- 큐 다중 우선순위 (FIFO + sort_key 만).
- 병렬 분석 hint 의 자동 `worker_parallel` 설정 (hint 는 참고 정보만).
- fast-track 계약 본문 정의 (dotfiles-10zx spec 소유; 본 spec 은 인터페이스만).
- 세션 ID 기반 cross-tool deep link (클립보드 복사까지만).

## 배치 / 런타임 토폴로지

- **Mac Studio 로컬 worker 인스턴스**: projectmgr 서비스 `beads-ui-worker`
  (신규 TOML, dotfiles `src/shell/projectmgr/services/`), `127.0.0.1:3002`,
  중앙 dolt(`127.0.0.1:3307`) 직결 workspace. brainstorming companion(3001)과
  포트 분리.
- NAS 인스턴스는 기존 그대로 조회용. worker 실행 기능은 config
  `[worker].enabled=true` 일 때만 활성 — NAS 배포 config 는 미설정(기본 false).
- supervisor 기동 preflight (하나라도 실패 시 보드 경고 배너 + 자동 실행 차단,
  loud-fail):
  1. claude-code-proxy liveness: `GET http://127.0.0.1:18765/healthz`
  2. `ccx` 실행 파일 존재
  3. `gh` 인증 상태 (`gh auth status`)
  4. `pr-finish` 스킬 설치 여부 (`~/.claude/skills/pr-finish/`)

## Lane 모델 (3+1)

| Lane | 정의 | 입주 조건 |
| --- | --- | --- |
| `inbox` | 모든 active parent (open/in_progress, epic/feature/task) | 자동. metadata 없는 parent 포함 |
| `waiting` | 자동 실행 대기 큐 | `spec_id` 필수 + `worker_queue_sort_key` 보유 |
| `progress` | 파이프라인 실행 중 (sub-state: `goal_running` / `pr_review_wait` / `pr_finish_running`) | server job 또는 review-wait 타이머 active |
| `done` (파생) | 최근 종료 카드 | `status in (resolved, closed)` 또는 마지막 job terminal failed/cancelled/killed. toolbar done filter (`today`/`3`/`7`, 기본 `today`) |

- lane 결정 우선순위, `done` 파생(메타데이터 미저장), done→inbox drag 시
  `worker_lane=inbox` 명시 기록 규칙은 2026-05-13 spec 의 확정 사항을 그대로
  승계한다.
- **parent 카드만 표시**. children 은 카드 `▸` 펼치기로만 노출, 카드에는 진행률
  바(`resolved+closed`/전체) 표시.

## 카드 UI

공통 카드:

```
[ ID | type badge | 준비상태 badge ]
[ Title (1~2 lines) ]
[ Spec✓ | Plan✓/Plan미완 | 병렬hint | ⚡parallel | ⚙model/effort | PR #123 ↗ ]
[ ▰▰▰▱▱ 3/7 children ]
```

- **준비상태 badge**: `spec_id` + `metadata.plan` 모두 있으면 `실행준비`,
  spec 만 있으면 `plan 미완` (큐잉은 허용, headless 가 runtime-native plan 으로
  진행), spec 없으면 badge 없음 + 큐 진입 차단.
- **병렬 hint badge**: `worker_parallel_hint` 존재 시 `∥ 가능` / `직렬 권장`
  표시, detail 에 근거(`worker_parallel_hint_reason`)와 충돌 상대
  (`worker_conflicts_with`) 목록.
- progress 카드 sub-state 별 표시 (2026-05-13 spec 레이아웃 승계, 명령 표기만
  ccx 로 교체): blink `●`(1초 opacity keyframe), 경과시간, **세션 ID 8자
  truncate + 복사**, 마지막 로그 1줄, 액션 버튼
  (`[Cancel]` `[Open log]` `[Finish now]` `[Cancel auto pr-finish]`
  `[Run pr-finish]` — 의미는 큐 정책 섹션).

## 실행 파이프라인 (ccx 2단계)

```
waiting head → 단계1 ccx "/goal <issueId>"  (PR Delivery 까지)
            → gh pr list 로 PR 감지·metadata 캐시
            → PR 1건 이상: 봇 리뷰 대기 (기본 5분, config)
                → 단계2 ccx "/pr-finish <pr#>"  (리뷰 반영·머지·bead 정리)
            → PR 0건: 대기/단계2 생략
            → 성공 시 60초 카운트다운 → 다음 waiting head
```

### 실행 명령

```bash
# 단계 1
BDUI_WORKER=1 CLAUDE_CODE_EFFORT_LEVEL=<effort> \
  ccx -p --output-format stream-json --verbose \
      --model <alias> \
      "/goal <issueId>"

# 단계 2
BDUI_WORKER=1 CLAUDE_CODE_EFFORT_LEVEL=<effort> \
  ccx -p --output-format stream-json --verbose \
      --model <alias> \
      "/pr-finish <pr_number>"
```

- 모델 우선순위: `metadata.worker_model` → toolbar 전역 default → `sol`(시드).
  UI/metadata 는 ccx alias(`sol`/`terra`/`luna`)를 쓰고, runner 가 CLI 인자로
  변환한다: `sol→--model opus`, `terra→--model sonnet`, `luna→--model haiku`
  (ccx env 매핑이 최종 백엔드 모델 결정; 2026-07-12 dry-run 에서
  `--model opus`→`gpt-5.6-sol` 검증됨).
- `<effort>` 우선순위: `metadata.worker_effort` → toolbar default → `high`.
  env 로 잡 단위 지정 — 전역 `~/.claude/settings.json` 오염 금지.
- 두 단계는 같은 model/effort 공유. spawn cwd = 대상 workspace 디렉터리
  (claude 에는 `-C` 플래그가 없음).
- `BDUI_WORKER=1` 은 fast-track 무인 모드 마커 (dotfiles-10zx 계약이 소비).
- 권한 모드: headless 무인 실행에 필요한 permission 설정(플래그 또는 settings
  allowlist)은 plan 단계 dry-run 으로 확정한다 (검증 항목 V-3).

### stream-json 파싱 (2026-07-12 dry-run 으로 부분 확정)

`ccx -p --output-format stream-json --verbose` 실측 스키마:

| 이벤트 | 필드 | supervisor 처리 |
| --- | --- | --- |
| `system` subtype=`init` | `session_id` (UUID), `model` | 단계별 `worker_last_*_session_id` 기록 + WS `job.session_id` |
| `system` subtype=`hook_started`/`hook_response`/`thinking_tokens` 등 | — | **무시** (사용자 훅 이벤트가 스트림에 섞여 나옴, 실측 확인) |
| `assistant` | `message.content[].text`, `message.model` | text 블록을 마지막 로그 1줄로 → WS `job.log_line` |
| `result` | `subtype`(`success` 등), `is_error`, `usage`(input/output tokens), `session_id` | 종료 판정 + 토큰 통계 → WS `job.exited` |

- 성공 판정: `result.subtype === 'success' && !is_error` **그리고** exit code 0.
- `/goal`·`/pr-finish` 의 headless slash 호출 동작은 plan 단계 dry-run 으로
  확정한다 (검증 항목 V-1; 실패 시 프롬프트 preamble 형태로 폴백 설계).

### 큐 정책 (server-owned)

2026-05-13 spec 의 큐 정책을 다음 치환으로 승계한다:
`codex exec /goal` → `ccx /goal`, `$pr-finish` → `ccx /pr-finish`.

- **serial slot 1개**: 세 sub-state 모두 slot 점유 유지. `/pr-finish` 성공까지
  slot 해제 없음.
- **parallel**: `worker_parallel=true` 카드는 slot 무관 자기 타임라인.
  auto-advance 는 strict FIFO(head 만 평가), head 뒤 parallel 카드를 건너뛰어
  실행하지 않음.
- 단계1 성공 + PR 1건 → 봇 리뷰 대기(`pr_review_wait_ms`, 기본 300000) → 만료
  시 단계2 spawn. `[Finish now]` 즉시 spawn, `[Cancel auto pr-finish]` 1회 취소
  (카드는 대기 유지, `[Run pr-finish]` 로 재개, slot 무기한 점유는 의도된 동작).
- 단계1 성공 + PR 0건 → main 직접 push 로 간주, 즉시 auto-advance.
- 단계2 성공 → 60초 카운트다운(`advance_delay_ms`, 기본 60000) → 다음 head
  spawn. `Skip wait`/`Cancel auto-start` 액션 승계.
- 어느 단계든 failed/cancelled/killed → **큐 정지** + `worker_lane` 해제 →
  done(실패) 파생 표시. 재시작은 사용자가 카드를 다시 큐잉.
- spec gate: waiting drop 시점 + 큐 head 평가 시점 이중 검사 (승계).
- 서버 재시작 복구: `goal_running`/`pr_finish_running` 은 killed 처리 + 큐 정지,
  `pr_review_wait` 는 `worker_pr_review_wait_started_at` 으로 잔여 타이머 복원
  (승계).

### 머지 동의 모델

카드를 waiting/progress lane 에 올리는 행위 = 해당 카드의 머지까지 자동 진행에
대한 **보드 한정 사전 동의(opt-in)**. 개입 지점은 봇 리뷰 대기 중
`[Cancel auto pr-finish]`. 보드 밖 일반 워크플로우의 PR Delivery stop boundary
정책은 불변 (dotfiles-10zx 계약 정합에서 명문화).

## 병렬 분석 (서버 소유 프롬프트)

- toolbar `[병렬성 분석]` 버튼 → 서버가 분석 잡 1회 spawn:
  `ccx -p --output-format stream-json --model <toolbar default>` + 서버 소유
  프롬프트 템플릿 (beads-ui repo 내 버전 관리).
- 입력: spec 있는 active parent ID 목록. 프롬프트 지시: 각 spec 파일을 읽고
  pairwise 충돌(같은 파일/디렉터리/계약 접점 수정 여부) 판정, 최종 출력은 지정
  JSON 스키마만.
- 서버가 최종 `assistant` text 의 JSON 을 파싱해 **서버가 직접** metadata 기록
  (모델은 판정만, 쓰기는 결정적 코드):
  - `worker_parallel_hint` = `parallel_safe` | `serial_recommended`
  - `worker_parallel_hint_reason` = 한 줄 근거
  - `worker_conflicts_with` = 쉼표구분 이슈 ID 목록 (없으면 키 제거)
- 파싱 실패/스키마 불일치 → hint 미기록 + 토스트 (큐 동작 무영향).
- 실행 게이트는 여전히 detail 드롭다운 `worker_parallel` 수동 확정 (기본
  serial). hint 는 표시 전용.

## Beads metadata 스키마

2026-05-13 spec 의 `worker_*` 키를 승계하고 다음을 추가/변경한다.

| Key | Value | 비고 |
| --- | --- | --- |
| `worker_lane` / `worker_queue_sort_key` / `worker_parallel` / `worker_model` / `worker_effort` | (승계) | `worker_model` 값은 ccx alias (`sol`/`terra`/`luna`) |
| `worker_last_goal_job_id` / `worker_last_goal_session_id` | (승계) | session_id 는 Claude Code UUID |
| `worker_last_pr_finish_job_id` / `worker_last_pr_finish_session_id` | (승계) | |
| `worker_pr_review_wait_started_at` / `worker_pr_review_wait_cancelled` | (승계) | |
| `pr_url` / `pr_number` | (승계) | `/goal` 종료 직후 `gh pr list --search <issueId>` 1회 캐시 |
| **`worker_parallel_hint`** | `parallel_safe` \| `serial_recommended` | 신규, 분석 잡 산출 |
| **`worker_parallel_hint_reason`** | string | 신규 |
| **`worker_conflicts_with`** | `"UI-a,UI-b"` | 신규 |

sort_key 정책(최초 max+1000, 사이 평균, rebalance 임계)은 승계.

## Config 스키마

`~/.config/bdui/config.toml [worker]` (기존 config 파이프라인 확장):

- `enabled`: bool, 기본 `false` — worker 기능 전체 게이트 (Mac 인스턴스만 true)
- `default_model`: string, 기본 `"sol"`
- `default_effort`: `"low"|"medium"|"high"`, 기본 `"high"`
- `pr_review_wait_ms`: 양의 정수, 기본 `300000`
- `advance_delay_ms`: 양의 정수, 기본 `60000`

toolbar model/effort 변경은 `PATCH /api/config/worker` (보존형 TOML write,
2026-05-13 확정 사항 승계).

## WS 이벤트 스키마

2026-05-13 spec 의 `job.*`/`queue.*` 이벤트(`phase: "goal"|"pr_finish"` 포함)를
승계한다. 변경점: `job.session_id` payload 의 세션 ID 는 Claude Code UUID,
`job.exited` 의 `usage` 는 stream-json `result.usage` 필드 매핑.

## dotfiles fast-track 계약 인터페이스 (dotfiles-10zx)

본 spec 은 다음 인터페이스만 소유한다. 계약 본문(무인 모드 규칙: 질문 게이트
금지·문서화된 기본값·blocker loud-fail·runtime-native plan 완화·큐잉=동의
명문화)은 `dotfiles-10zx` spec 이 소유한다.

- 마커: env `BDUI_WORKER=1` + `/goal` 프롬프트 preamble (형식은 dotfiles-10zx
  에서 확정).
- 기대 행동: headless 세션은 질문 없이 진행, finish 선택은 PR 고정, 해결 불가
  blocker 는 비정상 종료(→ 보드가 큐 정지로 감지).
- **배포 순서 제약**: fast-track 계약이 설치되기 전에는 worker 자동 실행을
  신뢰할 수 없다. `beads-ui-worker` 서비스 활성화는 dotfiles-10zx 완료 후.

## 파일 변경 계획 (개요)

신규: `app/views/worker-board.js`, `worker-card.js`, `worker-card-progress.js`,
`worker-card-children.js`, `app/data/worker-board-selectors.js`,
`app/utils/queue-sort.js`, `server/worker/queue-scheduler.js`,
`server/worker/queue-state.js`, `server/worker/ccx-runner.js`(stream-json 파서
포함), `server/worker/parallel-analyzer.js`(+프롬프트 템플릿),
`server/worker/worker-config-writer.js`, `server/worker/preflight.js`,
`server/routes/worker-queue.js`.

수정: `server/worker/process-runner.js`(ccx 빌더로 교체),
`server/worker/supervisor.js`, `server/config.js`(`[worker]` normalize +
`enabled` 게이트), `server/app.js`, `server/ws.js`, `app/views/worker.js`,
`app/views/worker-detail.js`(model/effort/parallel override + hint 표시),
`app/main.js`, `app/state.js`, `app/ws.js`.

제거: `worker-tree.js`, `worker-parent-row.js`, `worker-child-row.js`,
`worker-pr-panel*.js`, `worker-pr-summary*.js`, `pr-target-resolver.js`,
`pr-reader.js`, `server/routes/worker-prs.js` (2026-05-13 계획 승계).

dotfiles 측(별도 unit, dotfiles-10zx 및 후속): projectmgr `beads-ui-worker`
서비스 TOML, fleet manifest 등록.

## 마이그레이션 / 폐기 처리

- PR #16(nakkulla/beads-ui) 은 본 spec 승인 후 **close** (머지하지 않음, 사유
  코멘트에 본 spec 링크). UI-l3c3 bead 는 superseded 사유와 UI-ufkg 참조를
  notes 에 기록 후 close. — 두 처리 모두 실행 전 사용자 확인.
- 기존 `worker_*` metadata 와 호환 (키 승계). 신규 hint 키는 미존재 시 badge
  미표시.
- 기존 worker 탭(tree UI) 은 board 로 대체.

## 검증 / 테스트 전략

### plan 단계 사전 dry-run (spec 승인 후, 구현 착수 전)

- **V-1**: `/goal <테스트 bead>`·`/pr-finish` headless slash 호출 동작 확인
  (전용 테스트 bead + 샌드박스 repo, 실작업 최소화). 실패 시 프롬프트 preamble
  폴백으로 spec 갱신.
- **V-2**: `CLAUDE_CODE_EFFORT_LEVEL` env 가 proxy 경유 시 실제 reasoning
  effort 로 전달되는지 (proxy 로그 관측).
- **V-3**: headless 무인 permission 설정 확정.
- **V-4**: `BDUI_WORKER=1` 마커가 세션에서 관측 가능한지 (dotfiles-10zx 와 합동).

### 단위/통합 테스트

2026-05-13 spec 의 테스트 전략(큐 스케줄러 상태머신, sort_key, lane selector,
config writer, WS bridge, supervisor 통합)을 승계하되 다음을 교체/추가:

- `ccx-runner`: stream-json 파싱 (init/assistant/result, hook 이벤트 무시),
  성공 판정, env 조립 (`BDUI_WORKER`, `CLAUDE_CODE_EFFORT_LEVEL`), alias 전달.
- `parallel-analyzer`: JSON 출력 파싱, 스키마 불일치 처리, metadata 기록,
  파싱 실패 시 무해성.
- `preflight`: proxy healthz/ccx/gh/pr-finish 스킬 4종 체크, 실패 시 실행 차단.
- `config`: `enabled=false` 시 worker route/실행 완전 비활성 (NAS 안전성).
- 수동 체크리스트: 2026-05-13 승계 + 병렬 분석 버튼 → hint badge 표시,
  plan 미완 badge, preflight 실패 배너.

## Execution lane

- **execution_lane**: `plan`
- **rationale**: 신규 13+ 파일, 실행 러너 교체, 서버 상태머신, dotfiles 계약
  연동, 사전 dry-run 4건 — task 분해와 sequencing 이 필요하다.
- **spec replaces plan?**: 아니오. `writing-plans` 단계에서 분해한다.
- **의존성**: dotfiles-10zx (fast-track 계약) 가 worker 자동 실행 활성화의
  선행 조건. 보드 UI/큐 구현 자체는 병행 가능.
