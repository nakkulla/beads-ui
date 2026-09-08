---
scope:
  - server/worker/runner/
  - server/worker/scheduler.js
  - server/worker/session-ref.js
  - server/worker/codex-account-home.js
  - server/worker/codex-effort-observer.js
  - server/worker/bead-timeline.js
  - server/worker/resolve-session.js
  - server/worker/direction-inquiry.js
  - server/worker/review-session.js
  - server/worker/tmux-launcher.js
  - server/worker/provider-health.js
  - server/worker/account-catalog.js
  - server/worker/queue-store.js
  - server/worker/session-monitor.js
  - server/worker/session-log.js
  - server/worker/usage-replay.js
  - server/worker/delegation-store.js
  - server/worker/codex-children
  - server/ws/worker-handlers.js
  - app/utils/token-usage.js
  - app/views/worker/
  - app/views/detail-panel/session-history.js
  - app/views/detail-panel/worker-timeline.js
  - app/views/settings-dialog/execution-pane.js
  - app/protocol.js
  - app/protocol.md
  - app/main.bundle.js
  - app/main.bundle.js.map
  - generated/contracts/
---

# UI-mn5u — Codex 오케스트레이션 Worker 호환

- 상태: 사용자 검토용 초안. 구현·게시·게이트 승인을 뜻하지 않는다.
- 대응 이슈: UI-mn5u. 선행 이슈: dotfiles-fp2p(정책 훅·지침 정본), UI-9xs2(native child fixture 확보), UI-qce9(`continuation_choice` 생산).
- 기준 코드: 0d449e0c7b5826fbc65712489796d422c736e24b(2026-09-08 스펙 게이트 r2 시점 origin/main). 최초 감사 ed3ce09185bcac1ee756c2fbacee8efeb0bea081 이후 대상 경로에 7c48f73(UI-dqhw: Worker 안내·quick_fix 영수증의 현재 계약 정합 — preamble·scheduler 문구)과 7c35a07(#264: 연결 레인 진행 시 대기 위치 보존 — scheduler·queue-store)이 착지했다. 두 변경이 정한 안내 문구·영수증 의미·대기 위치 규칙은 보존 대상이며, 구현 진입 시 그 시점 HEAD에서 대상 경로의 추가 변경을 다시 대조하고 회귀 테스트에 포함한다.
- 형제 스펙: dotfiles의 docs/superpowers/specs/2026-09-08-codex-workflow-policy-hooks-design.md.
- 분할 근거: workflow 권한·지침·훅은 dotfiles가 소유하고, 이 저장소는 launch·복구·관측 소비자를 소유한다. dotfiles 정본의 검증·착지 후 이 구현에 진입한다.

## 1. 문제와 완료 모습

Codex로 작업을 시작하는 기능은 이미 있다. 그러나 보조 경로가 Claude를 전제로 하므로 Codex로 시작한 작업의 세션 해결·리뷰 재개·공급자 장애 복구·하위 실행 표시가 같은 수준으로 이어지지 않는다.

완료하면 사용자가 Codex를 오케스트레이션 도구로 선택했을 때 정책 검사를 켠 상태로 실행되고, 기록된 도구로 재개·해결하며, 확인된 서비스 장애는 기존 보류·복구 경로를 탄다. native 하위 에이전트는 실행 상태와 확인된 개별 사용량을 볼 수 있다. 사용량을 모르면 비워 두며 부모와 중복 합산하지 않는다.

| 근거 표면 | 현재 제약 |
| --- | --- |
| server/worker/runner/codex.js | exec --json·resume·fork·model/effort/speed는 지원한다. 모든 실행에서 --disable hooks를 넣고 classifyProviderOutage는 null이다. |
| server/worker/runner/preamble.js | 공유 안내에 Claude Agent/SendMessage 기반 수명·대기 설명이 들어간다. |
| resolve-session.js, direction-inquiry.js, tmux-launcher.js | interactive 해결·문의의 세션 선택 또는 실제 command가 Claude에 묶여 있다. |
| review-session.js, scheduler.js | 기록된 리뷰 재개 ID를 Claude로 해석한다. 새 리뷰의 현재 설정 선택은 이미 별도 경로다. |
| provider-health.js | probe argv는 Claude 형식이다. Codex 계정 환경을 전달하지 못한다. |
| server/ws/worker-handlers.js | 사람의 실행 override가 claude_account만 허용한다. |
| delegation-store.js, usage-replay.js | Claude subagent 신호를 누적·재생한다. Codex adapter에는 native child lift가 없다. |
| queue-store.js, usage-receipts.js, delegation-monitor.js | 외부 Codex receipt·monitor의 역할은 implementation/review-consult다. native child를 같은 shape에 넣으면 거절된다. |

기존 orchestration_model, impl_runtime, account 선택, Codex 외부 위임 모니터는 재사용한다. 오케스트레이션 도구와 구현 도구는 별개의 선택이다.

## 2. 대안과 불변식

| 접근 | 장점 | 한계 |
| --- | --- | --- |
| 기존 runner와 복구 경계에서 provider 정보 보존 | 이미 있는 세션·계정·보류 상태를 재사용한다. | 도구가 사라지는 각 함수 경계를 함께 수정해야 한다. |
| Codex 문제 경로를 Claude로 자동 전환 | 일부 실행을 계속할 수 있다. | 기록 세션·계정·사용자 선택과 다른 실행을 만든다. |
| Codex 전용 Worker와 복구 큐 복제 | 독립 구현이 가능하다. | 권한·재개·머지 규칙이 두 갈래로 나뉜다. |

같은 작업을 이어간다는 의미와 사용자가 고른 실행 도구를 보존하기 위해 첫 번째를 선택한다.

결정: 도구 오류·기록 누락만으로 Claude↔Codex를 자동 전환하지 않는다 — 세션과 실행 설정이 다른 작업으로 바뀌기 때문이다.

결정: 머지 큐 소유권, review ancestry, review lineage 재시도 횟수, post-merge 복구 사다리, 카드 슬롯은 바꾸지 않는다 — Codex 소비 경로를 기존 규칙에 연결한다.

결정: Codex native child의 사용량은 이번 변경에서 합계에 더하지 않는다 — 부모 합계와의 중복 여부를 입증한 근거가 없다.

## 3. 정책 훅과 런타임 안내

### 3.1 launch 입력

dotfiles 형제 스펙이 정한 WORKFLOW_REPO_ROOT·WORKFLOW_BEAD_ID를 실제 작업 launch 환경에 넣는다. canonical repo와 실행 대상 Bead는 scheduler가 이미 확정한 값을 사용한다. 상속받은 다른 작업의 환경값을 그대로 통과시키지 않는다.

Codex 작업 launch의 blanket --disable hooks를 제거하고 CODEX_SILENT=1은 유지한다. 구현·리뷰의 기존 sandbox와 Git pre-push guard, 종료 후 ref 검증은 유지한다. 환경값은 대상을 찾는 힌트이며 Worker가 승인·review receipt를 합성하는 근거가 아니다. 대상 결속과 권한 검사 정본은 dotfiles에만 둔다.

실제 설치된 trusted hook이 임시 허용·거절 호출을 처리해야 통합 검증 성공이다. 선행 미설치·untrusted 상태를 “Codex도 검사됨”으로 보고하지 않는다. 별도 영구 readiness 상태나 새로운 설치 daemon은 만들지 않는다.

### 3.2 안내 분리

공유 preamble은 무인 실행, 기존 hard stop, 작업 범위·검증·종료 책임을 유지한다. 프로세스를 어떻게 기다리는지는 선택된 runtime에 맞춰 넣는다.

- Claude 경로: 기존 Agent/SendMessage와 Claude→Codex bridge lifetime 규칙.
- Codex 경로: native spawn_agent와 native 기다리기 도구를 사용하고, 위임한 자식의 종료·결과를 확인한 뒤 controller가 검증·종료한다.
- Codex native 호출에 Claude bridge의 2시간 제한·Agent 프로세스 규칙을 그대로 붙이지 않는다.
- fire-and-forget 위임만 남겨 두고 구현 완료를 보고할 수는 없다.

dotfiles ADR 0052의 실제 Claude→Codex transport 규칙은 유지하며 적용 대상만 정확히 표현한다.

## 4. 세션 재개·해결·리뷰

### 4.1 선택 규칙

세션 참조는 ID만 전달하지 않고 provider와 함께 전달한다. 이 정보는 실행 위치를 고르는 것이며 승인·review 권한을 부여하지 않는다.

| 상황 | 동작 |
| --- | --- |
| 유효한 로컬 원본 세션이 있음 | 기록된 provider와 ID로 resume 또는 fork한다. 현재 기본 provider가 달라도 유지한다. |
| 원본 provider는 알지만 transcript가 없거나 로컬 사용 불가 | 기존 fresh fallback을 원본 provider 안에서 수행하고 이유를 기록한다. |
| 원본 자체가 없음 | 현재 유효한 실행 설정으로 fresh를 시작한다. |
| 사용자가 다른 provider 실행을 선택 | 기존 fresh_current·exec_override·decision token 절차를 거친다. |
| provider/ID가 손상됐거나 실행 파일이 없음 | 기존 실패 응답으로 설명한다. 알 수 없는 runner를 Claude로 치환하는 fallback을 사용하지 않는다. |

예외 — UI-qce9 `[지시와 함께 재시작]`이 만든 `continuation_choice='prior_attempt'` 자식(UI-qce9 §5.3)에는 위 same-provider fresh fallback을 적용하지 않는다. 그 자식은 기록된 세션의 엄격한 재개만 허용하고, transcript·thread 부재는 UI-qce9가 정한 `prior_session_unavailable` 거부와 실행 후 진단 반환으로 끝난다. same-provider fresh는 자동 복구와 일반 continuation에만 적용한다. 이 값은 UI-qce9가 만들고 이 스펙이 소비하므로 UI-qce9를 선행(`blocks`)으로 둔다.

source 선택 우선순위는 각 경로의 기존 계보를 유지한다. 문의는 해당 attempt 기록을 먼저 보고 그다음 유효한 표시용 session_ref를 실행 위치 힌트로만 사용한다. 리뷰는 같은 review lineage의 기록을 먼저 사용한다. session_ref로 gate·ready·권한을 판정하지 않는다.

이전에 시작된 작업을 자동으로 재개할 때 현재 다른 provider의 model·account 설정을 섞지 않는다. prior attempt의 해당 provider tuple 또는 native 세션이 복원하는 설정을 사용하고 명시적 사용자 override만 적용한다. 필요한 설정을 검증할 수 없다면 기존 continuation 진단으로 거절한다. provider를 바꿔 추측 실행하지 않는다.

### 4.2 최소 인터페이스 변경

| 표면 | 변경 |
| --- | --- |
| resolve-session의 forkTarget과 결과 | runner를 보존·반환한다. 기존 mode, fallback_reason, session_id, launched 필드를 유지한다. |
| direction-inquiry의 선택·결과 | 선택한 attempt/session의 runner를 tmux까지 전달하고 결과에 포함한다. |
| review-session 선택 | resume_session_id와 함께 resume_runner를 반환한다. |
| scheduler의 review dispatch | ID가 있다는 이유로 Claude를 선택하지 않고 검증된 resume_runner를 사용한다. |
| tmux-launcher | launch 입력에 runner를 받고 기존 command catalog로 실행 파일을 선택한다. argv wrapper·marker·중복 실행 방지는 유지한다. |
| WS·화면 | 결과 runner와 기존 source/fallback 이유를 실행 안내에 사용한다. 현재 전역 설정으로 덮어 표시하지 않는다. |

알 수 없는 runner는 ACTIVE_RUNNERS·catalog 검증에서 거절한다. 실행 파일 부재는 기존 launch_failed 계열로 claude_not_found 또는 codex_not_found를 반환한다.

interactive Codex는 로컬 CLI에서 확인한 `codex fork <SESSION_ID> [PROMPT]` 또는 `codex resume <SESSION_ID> [PROMPT]`를 사용한다. headless 리뷰·Worker는 기존 codex exec resume/fork 경로를 사용한다. 명령 문자열을 shell에서 재평가하지 않고 argv로 전달한다.

scheduler의 기존 continuation_mode, resumed_from, forked_from_session_id, resume_fallback, decision_token을 재사용한다. 새 재개 상태 파일이나 중복 approval 키는 만들지 않는다.

결정: 문의·해결의 Codex 접근은 기존 tmux와 알림 경로를 사용한다 — 새 양방향 Discord 대화 bridge는 이 범위에 넣지 않는다. 실행 결과에 실제 도구와 터미널 위치를 명시한다.

## 5. Codex 공급자 장애와 계정 복구

### 5.1 장애 분류

Codex adapter가 기존 classifier 출력인 detail·message·scope(provider/account)·resets_at을 반환한다. 구조화된 API 오류와 검증된 fixture로만 rate limit·usage limit·서비스 오류를 분류한다. 모델 응답 본문의 “429”나 “사용량 초과” 문장을 장애로 판정하지 않는다.

검증된 HTTP 429·5xx·명시적 quota 오류는 기존 의미에 맞는 detail로 정규화한다. scope·reset 정보가 없으면 만들어 내지 않는다. 인증 오류·로컬 실행 실패·증거 없는 네트워크 실패는 일반 실패로 남기고 provider 전체를 보류하지 않는다. Claude 전용 529 해석을 Codex에 추측 이식하지 않는다.

### 5.2 probe와 계정

기존 provider-health의 probe 경계에서 runner별 argv와 env를 만든다. Codex는 비대화형 read-only probe를 쓰고 CODEX_SILENT=1 및 실제 작업 launch와 같은 계정용 CODEX_HOME 준비 경로를 적용한다. 선택한 account와 다른 기본 계정으로 건강 상태를 검사하지 않는다.

Codex probe의 출력은 `codex exec --json`의 JSONL이다. 기존 `parseProbeOutput`의 단일 JSON·`is_error === false` 판정을 Codex에 그대로 적용하지 않고 runner별 디코더를 둔다: 줄 단위로 JSON을 읽어 `turn.completed`가 관측되고 `turn.failed`·구조화된 `error` 이벤트가 없으면 성공(회복 → 기존 auto_resume 전이), `turn.failed` 또는 구조화된 `error`는 §5.1 분류기로 넘겨 장애 지속/일반 실패를 판정하고, terminal 이벤트 누락·손상 줄·비JSON 출력은 probe 실패로 다뤄 hold를 유지하되 provider 장애로 승격하지 않는다. Claude probe의 기존 판정은 바꾸지 않는다.

scheduler의 providerAccountContext는 attempt.codex_account를 보존한다. account-catalog의 기존 Codex 해결 경로를 사용하며 Claude의 read/active API가 Codex에도 있다고 가정하지 않는다. probe 프로세스 입력은 기존 command·args에 env 전달을 더하는 정도로 좁힌다.

사람의 계정 교체는 scheduler·WS의 exec_override 허용 키에 codex_account를 추가하고 기존 catalog 검증을 사용한다. 복구 화면은 선택된 provider에 맞는 계정 입력을 보여 준다. attempt에는 이미 있는 codex_account·account_sources·account_switched_from을 사용한다.

### 5.3 기존 보류 수명 유지

다음 값과 기존 recoverProviderTarget → auto_resume_pending → consumeProviderAutoResume 경로를 유지한다.

- probe timeout: 120초.
- outage backoff: 60·120·240·480·900초.
- usage reset grace: 60초, reset 미상 fallback: 15분.
- usage 재시도 상한: 3회, hold 최대 수명: 24시간.

hold는 기존 runner별 키와 target account·next_probe_at·rearm_count를 사용한다. 성공하면 같은 provider와 승인된 계정으로 복구하며 기존 auto_resume_refused도 보존한다. 자동 provider 변경·새 복구 사다리·별도 account 상태는 추가하지 않는다.

## 6. Codex native 하위 에이전트 관측

### 6.1 증거와 데이터 원천

로컬 Codex CLI 0.153.4가 생성한 app-server 스키마에는 CollabAgentToolCall, SubAgentActivity와 thread/parentThreadId, thread별 tokenUsage가 있다. [공식 비대화형 문서](https://developers.openai.com/codex/non-interactive)는 exec --json의 일반 item 이벤트를 설명하지만 그 child shape를 보장하지 않는다.

따라서 기존 exec root JSONL parser에 존재가 확인되지 않은 이벤트를 가정해 붙이지 않는다. 기존 session-ref와 codex-effort-observer의 파일 탐색 함수를 재사용해 **해당 attempt의 root rollout**을 찾는다. attempt가 사용한 Codex 계정의 실제 sessions 경로를 적용하고, 기본 계정 경로로 대체하지 않는다. 기존 session-monitor는 Worker 원문 로그의 reader이므로 native rollout의 parser·reader를 그 수명에 연결하는 부분은 새로 구현한다. parent/child 관계가 확인된 rollout만 이어 읽는다. 글로벌 세션 디렉터리 전체나 관계없는 사용자 transcript를 수집하지 않는다.

공식 [Hooks 문서](https://developers.openai.com/codex/hooks)의 SubagentStart/Stop은 parent session_id를 공유하며 parent thread ID를 직접 제공하지 않는다. Stop의 agent_transcript_path도 선택적이다. 이 훅만으로 부모·자식 관계와 usage를 추정하지 않는다.

입력 fixture는 선행 Bead UI-9xs2가 확보한다: 비식별 `server/worker/__fixtures__/codex-native-child.jsonl`(exec JSONL)과 `server/worker/__fixtures__/codex-native-child-rollout.jsonl`(rollout), 그리고 CLI 버전·root/child thread 연결 근거·usage 이벤트 위치를 적은 `docs/superpowers/specs/assets/codex-native-child-fixture-notes.md`. 이 절의 parser·정규화·재생 규칙과 §7의 child seam은 그 fixture와 노트의 이벤트 문법을 입력으로 삼으며, fixture가 확정되기 전에는 구현에 진입하지 않는다(`blocks`). 노트가 exec JSONL에 child 이벤트가 없다고 기록하면 rollout 파일만 원천으로 쓴다. 노트가 root↔child 연결을 어떤 이벤트로도 확인할 수 없다고 기록하면 §6은 구현하지 않고 그 사실을 완료 보고서에 남긴다 — 이 경우 자식 표시·사용량은 미관측으로 남으며 검증 실패가 아니다.

### 6.2 내부 관측 레코드

기존 외부 receipt와 monitor 스키마에는 Codex subagent 역할을 덧붙이지 않는다. 그 스키마는 dotfiles producer 계약을 소비하므로 별도 monitor v2 작업과 의미를 섞으면 안 된다.

attempt에 선택적 codex_children 배열을 둔다. 이 필드는 **UI 소유 관측 기록**이며 workflow metadata·실행 영수증·gate 판정에 쓰지 않는다. 배열이 없는 과거 attempt는 빈 관측으로 읽는다.

| 필드 | 의미 |
| --- | --- |
| thread_id, parent_thread_id | native 이벤트로 검증된 자식과 직접 부모 ID. 루트까지 연결된 자식만 수용한다. |
| launch_id | 관측된 spawn/collab item ID. 없으면 null이며 식별자를 새로 만들지 않는다. |
| agent_path, model, effort | 실제 관측값 또는 null. 현재 설정으로 과거 값을 채우지 않는다. |
| status | 기존 표시 어휘 running/done/failed/interrupted로 정규화한다. spawn 도구 호출 완료를 자식 작업 완료로 오인하지 않는다. |
| started_at, completed_at, last_event_at | 원천 timestamp의 epoch-ms 또는 null. 재생 시 현재 시각으로 채우지 않는다. |
| usage | 확인된 thread 누적 사용량 또는 null. input_tokens, output_tokens, cached_input_tokens, cache_write_input_tokens, reasoning_output_tokens, total_tokens 중 실제 제공된 0 이상의 유한 정수 필드만 보존한다. 그 밖의 키·손상 값은 수용하지 않는다. |

동일 attempt·thread_id는 한 행이다. 반복 wait/send/관측은 새 자식을 만들지 않는다. 여러 후속 turn이 있는 자식은 마지막 검증된 누적 usage를 **교체**하며 turn마다 더하지 않는다. 시작 후 실제 completed/failed/interrupted 증거로 종료한다. 부모가 끝났는데 종료 증거가 없는 자식은 기존 종료 처리 시 interrupted로 표시하고 성공을 합성하지 않는다. 이는 관측 종료 표시이며 실제 자식 프로세스를 종료했다는 주장이 아니다.

원천의 순서·timestamp와 기존 attempt 로그 경계를 사용해 중복과 오래된 이벤트가 최신 종료 상태를 덮지 않게 한다. 이전 root turn에서 끝난 자식을 새 attempt에 복사하지 않는다. 같은 child를 재사용하면 현재 attempt에서 관측한 활동만 그 attempt의 행으로 연결한다.

### 6.3 수집·영속화·재생

기존 session monitor의 tail·coalesced fanout·종료 정산 경로를 재사용한다. native 이벤트를 출처가 구분되는 레코드로 기존 attempt 로그에 보존하고, live와 restart replay가 같은 parser·누적 함수를 호출하게 한다. 새 daemon·병렬 관측 저장소·별도 복구 cursor를 만들지 않는다.

종료된 attempt에는 정규화한 codex_children을 저장한다. ADR 0027대로 terminal 이벤트 기록 후 bead 디렉터리의 attempt 레코드로 이관하며 queue.json에 완료 이력을 다시 쌓지 않는다. 큐·이관 레코드 정규화와 WS snapshot이 해당 필드를 보존·검증하도록 함께 수정한다. raw 로그를 갖고 재생한 결과와 live 정산 결과가 같아야 한다. raw가 없으면 기존 저장된 관측만 표시한다.

외부 delegation_sessions·usage_legs·receipt 파일은 그대로 유지한다. 화면에서 기존 위임 상세 행 렌더러에 native child 관측을 매핑하되, external receipt validator를 느슨하게 만들어 통과시키지 않는다.

### 6.4 사용량과 화면

native child usage는 자식 상세 행에만 표시하고 attempt 총합·headline·비용 합산에서는 제외한다. 기존 root usage 및 별도로 정의된 외부 bridge receipt 회계는 바꾸지 않는다. 미관측을 0으로 채우지 않는다. cache·reasoning이 부분 집합인 Codex 수치를 별도 소비량처럼 또 더하지 않는다.

parent total이 child를 제외하며 자식끼리도 중복이 없다는 버전별 증거가 생기면 별도 스펙 수정으로 합산 정책을 검토한다. 이번 수용 기준은 정확한 관측과 중복 방지이며 전체 비용의 완전한 합산 보장이 아니다.

기존 session-history/위임 상세 영역에 provider·자식 상태·실제 모델·확인된 usage를 표시한다. 사용량에는 “전체 합계에 별도 가산하지 않음”을 설명한다. 새 카드 줄·칩 슬롯은 추가하지 않는다.

## 7. Test scope와 수용 기준

| seam | 필수 수용 사례 |
| --- | --- |
| launch·안내 | Codex 작업에서 policy hooks 활성·silent 유지·정확한 repo/Bead 환경. Claude/Codex preamble에 각자의 기다리기 도구만 사용. |
| 재개 선택 | 기록 Claude/현재 Codex와 그 반대 모두 기록 provider 유지. missing transcript는 동일 provider fresh+이유. source 없음은 current fresh. 명시적 fresh_current만 provider 변경. |
| interactive·review | resolve/inquiry/tmux/review에서 provider가 끝까지 보존됨. Codex interactive와 headless argv 구분. 알 수 없는 runner·unsafe ID·command missing에 자동 Claude 전환 없음. |
| 설정·계정 | prior tuple과 현재 다른 provider 설정을 혼합하지 않음. codex_account override의 유효·무효 사례와 probe CODEX_HOME 일치. |
| 장애 | 실제 구조화 fixture만 hold 생성. 본문 속 오류 문구·auth/local 실패는 provider hold 없음. timeout·backoff·usage 상한·manual/auto resume 회귀. |
| Codex probe 디코딩 | JSONL 정상(`turn.completed`)→회복·auto_resume 전이. `turn.failed`/구조화 error→분류기 경유 hold 유지. terminal 누락·손상 출력→probe 실패로 hold 유지·재시도. 현재 단일 JSON 가정이 정상 JSONL을 실패로 읽는 동작이 RED다. |
| child lifecycle | UI-9xs2 fixture 기반: 둘 이상 자식·중첩 자식·반복 wait·send·순서가 뒤늦은 종료·부모 중단·재사용 child를 처리. collab 호출 completed만으로 done을 만들지 않음. |
| child 재생 | UI-9xs2 fixture 기반: live와 restart·terminal readback이 동일. 관계없는 rollout·이전 attempt child·손상 shape는 제외. 과거 attempt 필드 부재는 호환. |
| child usage | UI-9xs2 fixture 기반: 누적 교체·null 유지·cache/reasoning 중복 없음. native child 표시 후 headline/합계가 더 커지지 않음. 외부 receipt 검증은 그대로 엄격함. |
| UI | 실제 runner·fallback 이유·계정 선택·native child가 기존 화면 슬롯에서 표시됨. Claude 기록·기존 bridge 표시 회귀 없음. |

구현 계획은 위 seam에 필요한 RED→GREEN을 매핑한다. child 관련 fixture는 UI-9xs2 산출물을 쓰고, hook·probe fixture는 전용 샘플 작업으로 만들며 사용자 세션 내용과 계정 비밀을 테스트에 복사하지 않는다.

구현 검증은 새 worktree의 Node engine·npm 의존 확인 후 tsc, 범위 테스트와 전체 vitest, lint, prettier, 프런트 변경 시 build까지다. 번들·소스맵을 함께 포함한다. 이 문서 초안 작성에는 런타임 테스트 통과를 주장하지 않는다.

통합 검증 순서(각 단계의 성공 판정과 중단 시 상태):

1. 진입 조건 — dotfiles-fp2p(와 그 선행 dotfiles-s6n9), UI-9xs2, UI-qce9가 closed이고, 호스트에 trusted 정책 훅이 설치·신뢰돼 있음을 fp2p 완료 보고서의 검증 영수증과 로컬 Codex hook 상태 readback으로 확인한다. 미충족이면 진입하지 않는다(`blocks`).
2. 워크트리 단위 검증 — 위 seam의 RED→GREEN, tsc·lint·전체 vitest·prettier·build.
3. 머지 전 후보 통합 검증 — PR 워크트리에서 `BDUI_FRONTEND_MODE=live bdui start --host 127.0.0.1 --port 3001`로 리포 로컬 ad-hoc 서버를 띄우고, dotfiles-fp2p 스펙 §9의 임시 전용 저장소·테스트 Bead 절차로 (a) 정책 거절/허용 (b) Codex resume/fork의 provider 보존 (c) 계정 probe (d) native child 표시를 확인한다. 성공 판정은 각각 attempt 레코드·로그의 관측값(runner, thread_id, hold 상태, codex_children 행)이며, 완료 보고서 검증 결과에 명령과 증거 경로를 적는다. 실패하면 머지하지 않는다. 이 결과가 구현 게이트 패킷의 검증 증거다. ad-hoc 서버와 임시 저장소는 종료·삭제하고 공유 서비스는 건드리지 않는다.
4. 머지·배포 — 기존 `[deploy]` 선언(재시작·SHA·포트·HTTP)만 실행한다.
5. 머지 후 — 공유 Worker에 추가 필수 검증은 없다. 배포 뒤 첫 실제 Codex 오케스트레이션 실행의 관측(모니터·Discord)은 완료 보고서 잔여 관찰이며 close 조건이 아니다.

중단 시: 3단계 실패는 워크트리와 임시 저장소에만 상태를 남기고 공유 서비스 변경이 없으므로 재시도 가능하다. 4단계는 deploy 스크립트의 자체 flock·HEAD 검증이 소유한다. 새 GitHub Actions나 checks 대기는 추가하지 않는다.

## 8. 구현 unit 후보와 순서

1. 정책 소비·런타임 안내·세션 provider 보존: runner, scheduler, resolve/inquiry/review, tmux, WS.
2. 공급자 장애·계정 probe·복구 화면: classifier, provider-health, account 전달, 기존 resume 경로.
3. native child 관측·재생·표시: rollout parser, monitor/log, attempt 정규화, 상세 화면과 집계 제외.

별도 저장소의 dotfiles-fp2p는 Phase 자식이 아니다. 위 후보의 최종 실행 경로·봉인 단위는 사용자 검토와 spec gate 후 workflow가 정하며 지금 자식 이슈나 실행 권한을 만들지 않는다. UI-9xs2는 fixture 확보 선행 Bead이지 Phase가 아니며, §6은 그 fixture 확정 뒤 같은 spec_backed 패킷의 unit 3으로 진행한다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 정책·설치 지침 정본을 별도 저장소에서 수정·검증 | 없음 | dotfiles-fp2p |
| 형제 | beads-ui | awaited_by_consumer | 정본 transport·훅을 소비하며 Worker 동작·화면을 구현 | dotfiles-fp2p, UI-9xs2, UI-qce9 | UI-mn5u |

두 스펙 모두 작성·게시한 뒤 첫 spec gate에 들어간다. blocks는 구현 진입만 제한한다. 같은 rig의 선행 UI-9xs2(native child fixture, 이 Bead에서 discovered-from)와 UI-qce9(`continuation_choice` 생산)는 형제가 아닌 선행이며 `blocks` 간선으로 기록했다. 외부 monitor v2의 dotfiles-4bxr와 native child의 내부 관측 레코드를 구분하며, 그 외부 producer 스키마 변경은 요구하지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — workflow 키·권한의 정본은 dotfiles이고 Worker는 소비자다.
- 전제: ADR 0006 — 재개된 리뷰도 머지를 소유하지 않고 기존 큐가 수행한다.
- 전제: ADR 0019 — 같은 리뷰 lineage와 기존 자동 dispatch 횟수를 유지한다.
- 전제: ADR 0031 — 구현 리뷰 영수증의 ancestry 결속을 유지한다.
- 전제: ADR 0027 — 사람용 이력은 bead 타임라인이 소유하며 terminal 이벤트 후 attempt를 이관한다. raw 관측 로그는 기존 보존 수명을 따른다.
- 전제: ADR 0014 — 기존 카드 슬롯과 상세 화면에서 표시한다.
- 전제: ADR 0016 — 검증된 systemic/provider 장애만 해당 보류 경계에 올린다.
- 전제: ADR dotfiles/0046 — 오케스트레이션과 구현 런타임을 분리하고 selector 의미를 유지한다.
- 전제: ADR dotfiles/0052 — Claude→Codex bridge의 대기 규칙을 native Codex에 복제하지 않는다.
- 세션 참조의 provider를 재개·해결·리뷰까지 보존한다. 되돌리기 어려움: 예(세션·계정 계보), 맥락 없으면 놀라움: 예(현재 설정과 다른 원본 도구 사용), 실제 대안·절충: 예(현재 설정 강제·자동 전환 대비). `summary`: "같은 작업의 세션 재개는 기록된 provider를 보존하고 provider 변경은 명시적 선택으로만 수행한다" → ADR
- Codex native child를 외부 receipt와 구별된 내부 관측으로 저장하고 합계에는 더하지 않는다. 되돌리기 어려움: 예(영속 레코드·회계 의미), 맥락 없으면 놀라움: 예(자식 사용량 표시와 합계 차이), 실제 대안·절충: 예(외부 schema 혼합·근거 없는 합산 대비). `summary`: "Codex native child는 검증된 내부 관측으로 표시하고 부모와의 중복이 미확인된 사용량은 합계에 더하지 않는다" → ADR
- Codex 장애·계정 복구에 기존 hold와 재시도 경로를 확장한다. 되돌리기 어려움: 아니오(기존 상태 소비 확장), 맥락 없으면 놀라움: 아니오(동일 기능 호환), 실제 대안·절충: 예(전용 큐 복제 대비). → ADR 아님
