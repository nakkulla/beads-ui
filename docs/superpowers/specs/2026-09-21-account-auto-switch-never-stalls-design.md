---
scope:
  - server/worker/scheduler.js
  - server/worker/provider-health.js
  - server/worker/queue-store.js
  - server/worker/failure-class.js
  - server/worker/notify.js
  - server/worker/bead-timeline.js
  - server/worker/compare-projection.js
  - server/worker/runner/claude.js
  - server/worker/runner/provider-outage.js
  - server/worker/runner/codex-outage.js
  - app/views/detail-panel/exec-accounts.js
  - app/views/detail-panel/index.js
  - app/views/worker/gate-labels.js
  - docs/superpowers/specs/2026-09-09-usage-limit-account-switch-policy-design.md
  - docs/superpowers/specs/2026-08-24-worker-provider-outage-hold-resume-design.md
---

# 자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다 — 실행 중 선제 전환, 핀·기본값 덮기, usage_limit 상한 제거, 전환 재개 단일성, 같은 계정 기동 직렬화, 자동 적용 표시

Bead: UI-inge · route: spec_backed · 2026-09-21

## 1. 배경 — 2026-09-21 14:15 사고의 실측

`provider_limit_policy.claude = { mode:'switch', accounts:[hanmail.net, unist.ac.kr],
preempt_pct:90 }`인 beads-ui·dotfiles 저장소에서 UI-mfm1(12:52 디스패치)·UI-g0lk·
dotfiles-p0xk(13:31 디스패치)가 모두 unist.ac.kr로 뜬 뒤 14:15:01~14:15:53에
"You've hit your limit · resets 6pm"으로 멈췄다. 13:00에 시작한 5시간 창을 세 fable
세션이 75분 만에 100%까지 소진한 것이다. 이후 관측된 다섯 가지 결함:

1. **선제 전환은 디스패치 순간에만 평가된다.** `scheduler.js applyPreemptSwitch`는
   디스패치 패스(`:8855`)에서만 불리고 실행 중인 attempt의 창은 아무도 다시 읽지
   않는다. 13:31 이후 새 디스패치가 없어 90% 교차를 볼 기회가 없었다. 전체 이력에서
   선제 전환이 발동한 기록은 codex 1건뿐이다.
2. **보류 처리기가 attempt당 두 번 진입해 전환 재개가 중복 실행됐다.** 각 Bead에
   `provider_hold` timeline 이벤트가 2개씩 남았다(exit 판정 경로 `:6014`와 persisted
   raw 재판정 경로 `:7922`가 같은 종료를 각각 분류한다). `holdAttempt` 끝의
   `consumeProviderAutoResume`(`:10974`)는 재진입 방어가 없어 두 호출이 같은 대기
   영수증으로 `resume()`을 두 번 냈다. p0xk는 attempt id가 2초 간격으로 둘
   생성됐고, 첫 자식(…738877-1)은 정상 기동해 PR #516까지 냈으나 그 기록은 두 번째
   자식(-4)에 덮여 사라졌다. mfm1은 두 번째 호출이 `continuation_settings_changed`로
   거부되면서 첫 자식(…738710-1, PR #312를 냄)의 기록이 유실됐다. Worker는 두 세션을
   "없는 프로세스"로 두고 Bead를 `paused`/`waiting`으로 남겼다.
3. **뒤따른 기동이 cswap의 자격증명 회전 창에 걸렸다.** claude-swap 0.25.0의
   `cswap run`은 계정 프로필 부트스트랩에서 refresh 토큰을 회전한다(14:15:47
   "Invalidated session credentials for account 3 / Bootstrapped session profile").
   같은 프로필로 20초·40초 뒤 뜬 p0xk -4·g0lk -3은 "Failed to authenticate: OAuth
   session expired and could not be refreshed"로 6초 만에 죽었고, cswap은 14:17:23에야
   "Resynced account 3's backup to the rotated live credential"을 남겼다.
   `session.py`의 주석이 이 창을 그대로 설명한다("a peer `cswap run` can bootstrap
   while we wait — and its profile predates our rotation … claude's own refresh would
   get invalid_grant"). 이 실패는 `failure-class.js ENV_ERROR_PATTERNS`가 알지 못해
   `unclassified → wait`(사람 확인 대기)가 됐다.
4. **dotfiles의 새 target이 24시간 상한으로 즉시 해제됐다.** dotfiles의 claude
   `provider_hold.since`는 9월 9일 20:32다. dotfiles-60u8 attempt -2가 그날
   nakkulla2@gmail.com(Pro, fable 없음)으로 전환됐다가 한도에 걸린 target이
   `rearm_count:12`·`auto_switch:'cap'`으로 남아 hold 객체가 살아 있었고,
   `holdProviderAttempt`(`queue-store.js:7830`)가 새 unist target을 그 hold에 붙였다.
   `scheduleTarget`(`provider-health.js:469`)은 `now - hold.since ≥ 24h`로 판정해
   14:16:08 `hold_age_cap`으로 해제했다(`next_probe_at:null`). 18:00 리셋 뒤 자동
   프로브가 없다.
5. **핀·기본 계정이 이미 보류 중이면 게이트에서 기다린다.** `applyPreemptSwitch`는
   `account_sources ∈ {null,'workspace_default'}`만 대상이고, 보류 중인 계정은
   `providerDispatchHeld`가 행을 막는다. 자동 전환이 켜져 있어도 이슈에 핀된 계정이
   한도면 리셋까지 선다.

계정 사용량의 출처는 `cswap list --json`(`routes/claude-usage.js`, 30초 캐시)이다.
cswap은 Anthropic usage 엔드포인트의 시간당 ~28–30회 예산 때문에 계정별 폴링을
자체 스케줄한다(`poll_policy.py`: 서빙 TTL 180초, 정상 최소 간격 180초, 소비 중인
계정은 움직임이 보이면 180초까지 좁히고 움직임이 없으면 300–600초까지 넓힌다).
beads-ui가 아무리 자주 읽어도 네트워크 요청은 cswap 정책이 낸다.

## 2. 사용자 결정 (2026-09-21)

1. 실행 중인 세션이 임계를 넘으면 **즉시 정지하고 같은 세션을 다른 계정으로
   재개한다**(별도 임계 없음, `preempt_pct` 하나).
2. usage_limit 보류의 **24시간·재무장 3회 상한을 모두 제거**한다. 리셋 시각은 항상
   있으므로 리셋 시각 프로브를 무한히 돈다. 디스코드 알림은 유지한다.
3. 자동 전환 모드에서 **Bead 핀·워크스페이스 기본 계정도 덮어 전환**한다 — 보류
   중이거나 창이 `preempt_pct` 이상이면.
4. 전환 재개 중복 실행과 자격증명 회전 창 실패를 함께 수리하고, 이슈 상세에 자동
   적용된 계정을 표시한다.

## 3. 설계

### 3.1 실행 중 선제 전환 — `live preempt`

**감시.** 워크스페이스마다 `LIVE_PREEMPT_POLL_MS = 60_000` 간격의 `setInterval`
(unref, `receipt_poll_timers`와 같은 수명 관리: start에서 무장, stop에서 해제)이
`livePreemptPass(workspace)`를 돈다. 패스는 `running` 중인 attempt마다:

- 러너가 `claude`/`codex`이고, 그 러너의 `provider_limit_policy.mode === 'switch'`,
  `preempt_pct !== null`, `accounts.length > 0`일 때만 본다. `dispatchReviewSession`
  세션은 `running`의 attempt가 아니므로 대상이 아니다(2026-09-09 §3.3과 같다).
- 계정 = `attempt.claude_account`/`codex_account`, 없으면 카탈로그 `active_key`.
  `account_sources` 값은 보지 않는다 — 핀·기본값·전환 자식 모두 대상이다(결정 3).
- 카탈로그는 기존 `deps.accountCatalog.listClaude()/listCodex()`(30초 캐시)로 읽고,
  그 계정 행의 **어느 창이든** `pct ≥ preempt_pct`면 2026-09-09 §3.2의
  `selectProviderSwitchAccount(workspace, runner, current, policy.accounts)`로 후보를
  고른다. 행이 없거나 후보가 없으면 그 패스는 no-op다(다음 패스가 다시 본다;
  attempt 기록에 `live_preempt_last_skip: {at, reason:'no_candidate'|'no_row'}`를
  써 화면이 "전환 후보 없음"을 그릴 수 있게 한다 — 팝오버 dd 한 줄, 카드 요소 신설
  없음).
- 같은 attempt에 대해 패스가 이미 전환을 시작했으면(아래 in-flight 표시) 건너뛴다.

**전환.** `preemptRunningAttempt(workspace, attempt_id, { from, to, window, pct })`:

1. 한 durable 쓰기로 (a) 일시정지 요청 레코드(기존 "Persist a pause request before
   any signal is attempted", `queue-store.js` ~`:8160`)에 `intent:
   { reason:'account_preempt', from, to, window, pct }`를 싣고 (b)
   `auto_resume_pending`에 `{ attempt_id, generation: 0, account: to,
   kind:'account_switch', origin:'live_preempt' }`를 넣는다. 그 뒤 기존
   `pauseDurably` 경로가 SIGTERM과 종료 settlement를 맡는다. 두 기록이 한 쓰기라야
   정지와 재개 사이에 서버가 죽어도 재시작 복원(`auto_resume_pending` 복원)이
   같은 계정으로 재개한다. 이 영수증은 **hold와 무관**하므로 durable 처리 셋을
   함께 바꾼다: `normalizeAutoResumePending`(`queue-store.js:4234`)은
   `origin:'live_preempt'`이면 `generation:0`을 받고 `origin`을 보존한다(그 외
   origin은 현행대로 `≥ 1`); `discardStaleAutoResumePending`(`:8103`)은
   `origin:'live_preempt'` 항목을 hold 세대 비교 없이 유지한다; `AutoResumePending`
   typedef에 `origin?: 'live_preempt'`를 더한다.
2. 종료 settlement는 일시정지 intent의 `reason:'account_preempt'`를 읽어 attempt를
   `status:'paused'`, `cause:'account_preempt:<window>'`, `cause_detail:
   { kind:'account_preempt', from, to, window, pct }`로 기록한다. 수동 일시정지의
   기존 cause 어휘는 그대로다. 종료 후 exit 판정 경로는 이 attempt를 실패로 분류하지
   않는다(일시정지 intent가 있는 종료는 이미 그렇게 처리된다).
3. settlement 끝에서 `consumeProviderAutoResume(workspace)`를 부른다. 소비기는
   `origin:'live_preempt'` 영수증을 **prior가 `status:'paused'`·`cause`가
   `account_preempt:`로 시작할 때만** 소비한다 — 정산 전에 다른 경로가 소비기를
   불러도 그 영수증은 건너뛰고 남긴다(`resume()`의 `not_failed` 거부로 소모되지
   않는다). 영수증의 `generation`이 0이고 대응 hold target이 없으므로
   `switched_from`은 영수증에 함께 실은 `from`(`AutoResumePending`에
   `switched_from?: string` 추가)에서 읽고, `resume(…, { continuation, provider_auto_resume:true,
   auto_resume_kind:'account_switch', exec_override:{ <runner>_account: to },
   account_switched_from: from })`로 같은 세션을 이어간다. `continuation`은 prior의
   `continuation_choice`가 `'prior_attempt'`면 `'prior_attempt'`, 아니면 `'auto'`다.
   **`prior_attempt` 계정 잠금의 예외**: 현재 소비기는 `continuation_choice:
   'prior_attempt'`인 prior의 계정 전환을 `prior_attempt_locked`로 거부한다
   (`scheduler.js:11038`, ADR UI-6icf가 보존한 §5.3 계약 "기록된 세션·tuple·계정을
   지킨다"). 자동 전환 모드의 `account_switch` 영수증(`live_preempt` 출처와
   `holdAttempt` 출처 모두)은 이 잠금을 넘어 **계정만** 바꾸고 세션·tuple은
   그대로 잇는다 — 잠금이 지키려던 것은 사용자가 고른 세션과 설정이지 한도에 걸린
   계정이 아니다. UI-6icf의 그 조항은 ADR 후보가 supersede한다. 회복 알림의
   `duration_ms`는 hold가 없으니 0이다.
4. `account_sources[runner]`에 새 값 `'live_switch'`를 찍는다.
   `AccountSourceValue`에 추가하고 정규화(`queue-store.js` 허용값 목록)에 더한다.
   현재 "`account_switched_from`이 있으면 `'outage_switch'`"인 스탬프 규칙은
   영수증의 `origin`으로 갈라진다: `origin:'live_preempt'`면 `'live_switch'`, 그
   외(`holdAttempt`가 만든 영수증)는 `'outage_switch'`.
5. timeline `kind:'account_live_preempt'`, `summary: '<runner> 실행 중 선제 전환
   <from> → <to> (<창> <pct>%)'`(`bead-timeline.js` 허용 kind에 추가,
   `compare-projection.js`의 계정 전환 kind 집합에도 추가). 디스코드 push:
   `notify.providerLivePreempt({ bead_id, runner, from, to, window, pct, repo })`,
   제목 `🔀 실행 중 계정 전환`. 소비기가 성공한 `account_switch`에 보내는
   `provider_recovered` timeline과 `providerRecovered` 알림(`scheduler.js:11077`)은
   `origin:'live_preempt'`에서는 **보내지 않는다** — 이 출처의 기록·알림은 위
   한 쌍뿐이다. 디스패치 시 선제 전환과 달리 한 attempt에 한 번만 일어나므로 반복
   알림 위험이 없다.

**경계.**

- 전환된 자식도 감시 대상이다. 새 계정이 다시 임계를 넘으면 다시 전환한다.
  **후보 규칙**: 2026-09-09 §3.2의 건강 조건(5h ≤ 80·그 외 ≤ 90, 보류 중 계정 제외,
  현재 계정 제외)에 더해 **후보의 모든 창이 `preempt_pct` 미만**이어야 한다 —
  `selectProviderSwitchAccount`에 `max_pct` 인자를 더해 선제 전환 두 경로(§3.1·§3.2)가
  넘긴다(한도 도달 경로 `holdAttempt`는 넘기지 않아 현행 그대로). 선제 전환은 떠난
  계정에 hold를 만들지 않으므로 이 조건이 없으면 두 계정이 모두 임계 이상일 때
  자식이 매 주기 반대 계정으로 왕복한다. 후보가 없으면 한도까지 달리다 한도 도달
  경로가 잡는다.
- 데이터 신선도는 cswap 정책이 정한다. 소비 중인 계정은 180초 간격으로 좁혀지므로
  판정 지연은 보통 3분 이내이고, 오늘 속도(분당 ~1.3%p)면 임계 뒤 4%p 안에서
  멈춘다. 이 스펙은 임계값을 보정하지 않는다 — 지연은 사용자가 `preempt_pct`로
  흡수한다(설정 힌트 문구에 "사용량은 최대 몇 분 지연될 수 있습니다"를 덧붙인다,
  §3.6).
- 일시정지는 진행 중인 턴 하나를 끊는다(위임 자식 프로세스 그룹도 함께). 한도
  도달 경로와 같은 비용이고, 대화는 `--resume`으로 이어진다.
- codex 러너도 같은 패스를 탄다. 창은 `listCodex()`의 행이고 전환은 기존 codex
  `exec_override.codex_account`·`CODEX_HOME` 미러 경로다.

### 3.2 디스패치 시 핀·기본값 덮기

`applyPreemptSwitch`의 `source !== null && source !== 'workspace_default' → return
null` 분기를 지운다. 판정 트리거는 둘이다:

- (a) 현행: 그 계정 행의 어느 창이든 `pct ≥ preempt_pct`.
- (b) 신설: 그 계정이 `provider_hold[runner]`의 `kind:'usage_limit'` target
  (`account === current`)이다 — 창 값과 무관하게 후보를 고른다.

둘 다 후보는 `selectProviderSwitchAccount(…, { max_pct: preempt_pct })`(§3.1
후보 규칙)이고, 적용·기록은 현행대로
(`account_sources[runner]='preempt_switch'`, `account_switched_from`, timeline
`account_preempt`). (b)의 summary는 `(보류 중)`으로 쓴다:
`'<runner> 선제 전환 <from> → <to> (보류 중)'`. 이어지는 `providerDispatchHeld`는
바뀐 계정으로 게이트를 본다 — 후보 규칙이 보류 계정을 뺐으므로 계정 단위 한도
보류는 통과하고, outage·계정 미상 보류는 현행대로 러너 전체를 막는다. 후보가 없으면
현행 게이트 판정(`provider_gate` admission 기록)이 그대로 선다.

Bead의 `claude_account`/`codex_account` pin 값은 쓰지 않는다 — 덮기는 launch-only
`exec_override`이고 이슈의 명시 선택은 남는다(ADR 0052의 범위 조항 유지). 2026-09-09
§3.3의 "대상은 상속된 계정뿐" 문장과 보존 검증 30("`source:'bead'`인 계정은 창이
임계 이상이어도 바뀌지 않는다")은 이 스펙이 뒤집는다 — §5 정본 반영.

### 3.3 usage_limit 상한 제거

`provider-health.js`:

- `HOLD_AGE_CAP_MS`·`USAGE_REARM_CAP`·`disarmTarget`·`probeCapped`를 지운다.
  `scheduleTarget`은 usage_limit target을 언제나 `resets_at + 60초`(없으면
  `USAGE_FALLBACK_MS` 15분)에 무장한다. 프로브가 다시 `usage_limit`을 돌려주면 새
  `resets_at`으로 재무장하고 `rearm_count += 1`(표시용 카운터로만 남는다). 프로브가
  provider outage로 분류되면 현행대로 `outage` kind로 재분류해 백오프를 탄다.
- `start()`의 `probeCapped` 호출은 사라진다 — 재시작은 `sync()`가 모든 target을
  다시 무장하는 것으로 충분하다(UI-1l3a §3.4의 "상한 target 재시작 1회 프로브"는
  상한과 함께 사라진다).
- `notify.providerAutoResumeDisarmed`의 `hold_age_cap`·`rearm_cap` 호출과 target의
  `disarm_notified_at` 쓰기를 지운다. 같은 함수의 `reason:'auto_resume_cap'` 호출
  (`provider-health.js:562`, §8.1 계보 자동 재개 상한)은 그 상한과 함께 **남는다**.
  과거 큐 파일의 `disarm_notified_at`·`auto_switch:'cap'`·`last_error:
  'auto_resume_disarmed:*'`는 정규화가 읽기만 하고 버린다(`last_error`는 그대로
  두어도 무해하다).
- `hold.since`는 첫 보류 시각의 표시용 값으로만 남는다. `probeCapped`·`scheduleTarget`
  이외의 `since` 소비(회복 알림 `duration_ms`, 팝오버 "보류 n분")는 바뀌지 않는다.

**잔재 target 정리.** 오늘 dotfiles의 9/9 target 같은 잔재가 hold를 영원히 붙들지
않도록 한 규칙을 둔다: attempt가 라이브 맵에서 사라질 때(폐기·전송·`deleteAttempt`)
그 attempt id를 target의 `attempt_ids`에서 빼고, 비어 버린 usage_limit target은
제거한다. target이 없는 hold는 `delete provider_hold[runner]`(기존
`clearManualProviderResumeTarget`의 빈 hold 처리와 같다). 프로브 판정 불가 오류로
target을 지우는 규칙은 두지 않는다 — 해제는 프로브만이 판정한다(§5의 `AGENTS.md`
줄). 판정 불가 오류는 현행대로 `outage` kind 재분류와 백오프(최대 1시간)를 탄다.

### 3.4 전환 재개 단일성

- `holdAttempt`는 멱등이다: 스냅샷에서 attempt가 이미 `status:'paused'`이고
  `cause`가 `provider_outage:`로 시작하며 그 러너 hold의 어느 target
  `attempt_ids`에 이 id가 있으면, 쓰기·알림·`consumeProviderAutoResume` 없이 바로
  돌아간다. 세 호출 지점(`:6014`·`:7366`·`:7922`)은 그대로 두고, 두 번째 진입은 이
  판정으로 무해해진다.
- `consumeProviderAutoResume`는 모듈 상태 `resume_in_flight: Set<attempt_id>`를
  둔다. 영수증의 attempt가 in-flight면 건너뛰고, `resume()` 전에 넣고 `finally`에서
  뺀다. 한 attempt의 영수증은 언제나 한 번만 `resume()`에 닿는다.
- `resume()`의 `bead_running` 판정(`scheduler.js:10723`)은 전환 재개에도 이미
  적용되고 거부 사유도 이미 `auto_resume_refused`에 적힌다. 오늘 그 판정을 두 호출이
  모두 지난 이유는 **경쟁**이다: 판정은 동기 스냅샷을 읽는데 `resume()`은 그 뒤
  spawn까지 여러 `await`(카탈로그·워크트리·bd 읽기)를 거치므로, 첫 호출이
  `running`에 등록되기 전 두 번째 호출이 같은 판정을 통과한다. 위 in-flight
  집합이 그 창을 닫는다; `bead_running` 자체는 바꾸지 않는다.
- `holdProviderAttempt`의 영수증 push는 이미 attempt id로 중복을 막는다; 위 세
  규칙으로 "소비된 뒤 다시 push"도 막힌다(멱등 `holdAttempt`가 두 번째 push 자체를
  내지 않는다).

### 3.5 같은 계정 기동 직렬화와 인증 실패 재시도

- **직렬화.** `claude` 러너에서 `claude_account`가 있는 모든 spawn(디스패치·재개·
  provider-health 프로브)은 계정별 launch 잠금을 탄다: `launch_locks:
  Map<account, Promise<void>>`. 잠금은 spawn 직전에 잡고, 자식의 stream-json `init`
  이벤트(`session-observation.js`가 이미 읽는다)를 보거나 프로세스가 끝나면 풀며,
  풀린 뒤 `LAUNCH_SPACING_MS = 3_000` 동안 다음 기동을 미룬다. 잠금 대기 상한은
  30초이고 넘으면 그냥 기동한다(잠금은 최적화이지 정확성 조건이 아니다). codex
  러너는 `CODEX_HOME` 미러가 프로세스별이라 직렬화 대상이 아니다 — 아래 분류는
  러너 무관이다.
- **분류 — 인증 실패는 계정 단위 공급자 보류다.** 환경 오류 재시도 사다리는 쓰지
  않는다: `runDueRetries`(`scheduler.js:13797`)는 보존 작업이 없으면 새
  `dispatch()`를 내어 세션·계정·전환 출처를 승계하지 않고,
  `queue-hold.js reduceEnvFailure`(`:363`)는 다른 Bead의 같은 오류에서 큐 전체를
  세우며, 소진 분류는 `transient_retry_exhausted → provider`다. 대신 러너
  어댑터의 공급자 분류(`providerOutageFor` → 각 어댑터의 `classifyProviderOutage`,
  claude는 `runner/provider-outage.js`, codex는 `runner/codex-outage.js`)에 **러너
  무관** 문구 그룹 `credential`을 더한다:
  `/Failed to authenticate|OAuth session expired|could not be refreshed|invalid_grant|401 Unauthorized|Missing bearer/i`
  (앞 넷은 claude·cswap, 뒤 둘은 codex — 오늘 14:03 dotfiles-w8r0 attempt -3의
  `turn.failed` "unexpected status 401 Unauthorized: Missing bearer or basic
  authentication in header"가 `unknown_error → wait`로 떨어진 같은 결함이다). 분류
  결과는 `{ detail:'credential', scope:'account', resets_at:null }`이고 `holdAttempt`가
  받아 attempt를 `paused`·`cause:'provider_outage:credential'`로 두고 그 계정의
  `kind:'outage'`·`detail:'credential'` target을 만든다. 이후는 기존 outage 경로
  그대로다: 프로브(`cswap run <계정> -- claude -p ok` / codex 미러)가 60초 →
  … → 1시간 백오프로 판정하고, 통과하면 `recoverProviderTarget`이 target을 지우고
  같은 attempt를 `provider_outage` 영수증으로 재개한다 — 재개는 기록된 세션·tuple·
  계정·`account_switched_from`을 그대로 잇는다(계정 전환이 아니다). 프로브 자체가
  `cswap run` 부트스트랩을 거치므로 회전된 백업의 재동기화(오늘 14:17:23의
  "Resynced …")를 겸한다. 큐는 서지 않고(공급자 보류는 큐 정지가 아니다), 여러
  Bead가 함께 인증 실패해도 같은 target에 묶여 한 프로브로 함께 회복된다. 게이트는
  현행 outage 판정대로 그 러너를 프로브 통과까지 막는다 — 회전 창 안으로 새 기동을
  내지 않는 것이 목적이므로 의도된 동작이다. `대기 · recovery:credential`은 이
  경로가 만들지 않는다; 사람 확인 대기는 프로브도 못 잡는 오류에서만 남는다.
  §8.1 계보 자동 재개 상한은 이 `provider_outage` 재개도 1회로 센다(비목표).
- 관찰: claude-swap 0.26.0이 나와 있다. 업그레이드는 이 스펙 밖의 운영 항목이다.

### 3.6 표시

- **이슈 상세 `실행 계정` 섹션**(`exec-accounts.js accountRow`): 그 Bead의
  `worker_attempts`(상세 패널이 이미 큐 스토어에서 받는다) 중 `started_at`이 가장
  큰 attempt의 `account_sources[provider_key]`가 `'outage_switch'|'preempt_switch'|
  'live_switch'`이면 select 아래에 `detail-kv__note` 한 줄을 그린다:
  `자동 적용: <계정 라벨> ← <원 계정 라벨> · <사유> · <상대 시각>`. 사유 문구는
  `outage_switch → 한도 도달 뒤 전환`, `preempt_switch → 디스패치 시 선제 전환`,
  `live_switch → 실행 중 선제 전환`. 계정 라벨은 기존 `claudeLabel`/`codexLabel`
  (카탈로그에 없으면 key 그대로). attempt가 없거나 전환이 아니면 줄을 그리지
  않는다(fail-quiet). 이 섹션은 UI-xq3h의 "이 이슈 실행 설정" 카드와 다른
  섹션이라 슬롯이 겹치지 않고, 워커 카드 문법(ADR 0014)의 대상도 아니다.
- **워커 카드·팝오버**: 새 요소 없음. `gate-labels.js`의 `auto_switch` 문구에서
  `'cap'` 분기를 지우고, 대기 카드 팝오버 dd에 `live_preempt_last_skip`이 있으면
  `전환 후보 없음 · <상대 시각>` 한 줄을 더한다(기존 dd 슬롯).
- **실행 패널 선제 전환 행**: 힌트에 `실행 중인 세션도 이 값에서 전환합니다 ·
  사용량 반영은 최대 몇 분 지연될 수 있습니다`를 덧붙인다. 설정 키는 늘지 않는다.

### 3.7 알림

`providerHoldEntered`(⏳ 공급자 보류 — `credential` 보류도 이 알림)·
`providerRecovered`(✅ 공급자 회복, 전환이면 `<from> → <to>`)는 유지하고
`providerLivePreempt`(🔀 실행 중 계정 전환)를 더한다. 실행 중 전환 한 번에 알림은
`providerLivePreempt` 하나뿐이다(§3.1 5). `providerAutoResumeDisarmed`(🚨 자동 재개
중단)는 `hold_age_cap`·`rearm_cap` 사유가 사라지고 `auto_resume_cap` 사유만 남는다.

## 4. 검토한 대안

- **cswap의 자체 자동 전환(`cswap auto`)에 맡김** — 기각. 그것은 이 머신의 활성
  로그인을 바꾸는 전역 조작이고 Worker attempt는 `cswap run <계정>`으로 고정돼
  영향을 받지 않는다. attempt 단위 전환(ADR 0052)과 어긋난다.
- **실행 중 전환에 별도 임계(예 95%)** — 사용자 기각. 키가 하나 늘고 두 값의 관계를
  설명해야 한다.
- **상한 유지 + 기산점만 target별로** — 사용자 기각. 오늘 버그는 사라지지만 24시간·
  3회 뒤 수동 개입이 남아 "자동화가 멈춘다"는 문제 자체는 남는다.
- **인증 실패 회복만 두고 직렬화 없음** — 부분 채택. 보류·프로브·회복이 정확성을
  맡고 직렬화는 동시 부트스트랩이라는 원인을 줄이는 최적화라 둘 다 둔다.
  직렬화만으로는 오늘처럼 20초 뒤 기동이 회전 창에 드는 것을 못 막는다.
- **인증 실패를 env 재시도 사다리(`ENV_ERROR_PATTERNS` 그룹)로 처리** — 기각(리뷰
  r1). `runDueRetries`는 보존 작업이 없으면 새 `dispatch()`라 세션·계정·전환 출처를
  잃고, `reduceEnvFailure`는 두 Bead의 같은 오류에서 큐를 세우며, 소진 분류가
  `provider`다. 계정 단위 outage 보류는 셋 다 피하고 프로브가 회전 창의 끝을
  판정한다.
- **프로브 판정 불가 오류 3회 뒤 target 삭제** — 기각(리뷰 r1). 승인 요구에 없는
  새 상한이고 회복 증거 없이 게이트를 연다.
- **정지 대신 턴 경계에서 전환** — 기각. `claude -p` 세션에는 밖에서 볼 수 있는 턴
  경계가 없고, 한도 도달 경로도 이미 턴 중간에 끊긴다.

## 5. 정본 반영

- `2026-09-09-usage-limit-account-switch-policy-design.md` §3.3에 정정 각주: 대상이
  상속된 계정에 한정되지 않고 Bead pin도 덮으며, 보류 중인 계정은 창 값과 무관하게
  전환한다(이 스펙 §3.2). 보존 검증 30은 반대 기대(pin 계정도 바뀐다)로 바꾼다.
  §1 결정 3의 "Bead pin은 건드리지 않는다"는 "pin 값은 쓰지 않는다(launch-only)"로
  좁힌다.
- `2026-08-24-worker-provider-outage-hold-resume-design.md` §7.4에 정정 각주: 두
  상한(`rearm_count` 3회·24시간)은 철회하고 usage_limit 프로브는 리셋 시각마다
  무한히 돈다(이 스펙 §3.3). §8.1의 lineage 자동 재개 cap은 이 스펙이 건드리지
  않는다.
- `AGENTS.md` 「워커·모니터 카드 배치 문법」의 "공급자 보류의 해제는 프로브가
  판정한다" 줄은 그대로 유효하다.

## 6. 검증과 인수 기준

### Test scope

#### RED 경계

`server/worker/scheduler.test.js`

1. `livePreemptPass`는 `running` attempt의 계정 창이 `preempt_pct` 이상이면
   `preemptRunningAttempt`를 한 번 부르고, 같은 attempt에 대해 다음 패스는 건너뛴다.
2. `mode:'wait'`·`preempt_pct:null`·허용 집합 빈 경우 각각 패스가 no-op다.
3. 후보가 없으면 attempt에 `live_preempt_last_skip`이 기록되고 정지하지 않는다.
4. `preemptRunningAttempt`는 일시정지 intent와 `auto_resume_pending`
   (`origin:'live_preempt'`, `generation:0`, `switched_from`)을 한 revision의 쓰기로
   남긴다.
5. 종료 settlement는 `reason:'account_preempt'` intent를 `cause:'account_preempt:
   <window>'`·`paused`로 기록하고 실패로 분류하지 않는다.
6. `origin:'live_preempt'` 영수증의 재개는 `account_sources[runner]='live_switch'`,
   `account_switched_from`, timeline `account_live_preempt`, `providerLivePreempt`
   알림 1회를 남기고 `provider_recovered`·`providerRecovered`는 내지 않는다(알림
   호출 총 1회).
7. `applyPreemptSwitch`는 `source:'bead'`인 계정도 창이 임계 이상이면 바꾼다.
8. `applyPreemptSwitch`는 계정이 usage_limit 보류 target이면 창 값과 무관하게
   바꾸고 summary가 `(보류 중)`이다; 이어지는 `providerDispatchHeld`는 바뀐 계정으로
   통과한다.
9. `holdAttempt`를 같은 attempt에 두 번 부르면 두 번째는 쓰기·알림·영수증 push가
   없다.
10. `consumeProviderAutoResume`를 같은 스냅샷으로 동시에 두 번 부르면 `resume()`은 한
    번만 불린다.
11. 같은 `claude_account`의 두 spawn은 첫 자식의 `init` 관측 후 3초가 지나야 두 번째가
    나가고, 다른 계정끼리는 기다리지 않는다; 30초 상한을 넘으면 그냥 나간다.
12. `origin:'live_preempt'` 영수증은 prior가 아직 `running`이면 소비되지 않고 남으며,
    prior가 `paused`·`account_preempt:*`가 된 뒤 호출에서 소비된다.
13. `continuation_choice:'prior_attempt'`인 prior의 `account_switch` 영수증은
    `prior_attempt_locked`가 아니라 `continuation:'prior_attempt'` + 계정
    `exec_override`로 재개된다(세션·tuple 보존, 계정만 변경).
14. 실행 중 전환 후보 선택은 모든 창이 `preempt_pct` 미만인 계정만 고른다 — 두
    계정이 모두 임계 이상이면 전환하지 않고 `live_preempt_last_skip`만 남긴다.
15. 러너 어댑터의 공급자 분류가 "Failed to authenticate: OAuth session expired and
    could not be refreshed"(claude)와 "unexpected status 401 Unauthorized: Missing
    bearer or basic authentication in header"(codex)를 `{ detail:'credential',
    scope:'account' }`로 돌려주고, `holdAttempt`가 `cause:'provider_outage:credential'`·
    `kind:'outage'` target으로 기록한다; 큐 `hold`는 열리지 않는다.
16. `credential` target의 프로브 통과 뒤 재개는 실패한 attempt의 `claude_account`·
    `session_id`·`account_switched_from`을 그대로 잇는다.

`server/worker/provider-health.test.js`

17. `rearm_count`가 3 이상이거나 `hold.since`가 25시간 전인 usage_limit target도
    `resets_at + 60초`에 무장된다(기존 "leaves a rearm-capped…"·age cap 테스트는 이
    기대로 바뀐다).
18. `disarmTarget`·`probeCapped` 호출이 없고, `providerAutoResumeDisarmed`는
    `hold_age_cap`·`rearm_cap` 사유로 불리지 않는다(`auto_resume_cap` 사유는 그대로
    불린다).

`server/worker/queue-store.test.js`

19. 라이브 맵에서 attempt가 사라지면 그 id가 target `attempt_ids`에서 빠지고 빈
    target·빈 hold가 제거된다.
20. `AccountSourceValue` 정규화가 `'live_switch'`를 받고, 구 파일의
    `auto_switch:'cap'`·`disarm_notified_at`을 읽어도 실패하지 않는다.
21. `auto_resume_pending` 정규화가 `origin:'live_preempt'`·`generation:0`·
    `switched_from`을 보존하고(재시작 복원), `origin` 부재 `generation:0`은 현행대로
    버린다.
22. `discardStaleAutoResumePending`은 같은 러너에 다른 세대의 hold가 있어도
    `origin:'live_preempt'` 영수증을 남긴다.

`app/views/detail-panel/exec-accounts.test.js`

23. 최신 attempt의 `account_sources.claude === 'live_switch'`면 `자동 적용:` 줄이
    `실행 중 선제 전환` 사유로 그려지고, `'bead'`·`'workspace_default'`·attempt
    없음이면 줄이 없다.

#### 보존 검증 (변경 전에도 통과한다)

24. 리셋 프로브 통과 시 `recoverProviderTarget`이 target을 지우고 `provider_outage`
    영수증으로 1회 자동 재개한다(§8.1 lineage cap 유지).
25. `[지금 시작]` bypass는 선제 전환·게이트와 무관하게 그 행을 디스패치한다.
26. 전환 자식은 §8.1 cap을 소비하지 않는다.
27. 같은 Bead의 attempt가 실행 중일 때 전환 재개 `resume()`은 `bead_running`으로
    거부되고 prior에 `auto_resume_refused`가 적힌다.
28. usage_limit target의 프로브가 판정 불가 오류로 끝나면 target은 남고 `outage`
    kind로 재분류돼 백오프를 탄다.

### 절차

Pre-Handoff Validation(`AGENTS.md`): `npm run tsc`, `npm run lint`,
`npx prettier --write <변경 파일>`, `npx vitest run --reporter=dot`. 배포 뒤
공유 서버에서 `provider_limit_policy`가 `switch`인 저장소 하나에 `preempt_pct`를
현재 사용량보다 낮게 잠시 내려 실행 중 attempt가 정지·전환·재개되는 것을
timeline과 디스코드 알림으로 확인하고 되돌린다.

### 인수 기준

- 자동 전환 모드의 저장소에서 실행 중인 attempt가 임계를 넘으면 사람 개입 없이
  다른 허용 계정으로 이어진다(정지→재개 한 번, 기록 한 벌, 알림 한 번).
- 핀·기본 계정이 보류 중이거나 임계 이상이어도 디스패치가 게이트에서 서지 않고
  전환된다.
- usage_limit 보류는 상한 없이 리셋 시각마다 프로브되고 `hold_age_cap`·`rearm_cap`
  사유가 더 이상 생기지 않는다.
- 한 attempt의 전환 재개는 정확히 한 프로세스를 만들고 그 기록이 살아남는다.
- 인증 실패 문구(claude·codex)는 계정 단위 `credential` 공급자 보류가 되어 큐를
  세우지 않고, 프로브 통과 뒤 같은 세션·계정으로 자동 재개된다; 사람 확인 대기는
  프로브도 잡지 못하는 오류에서만 생긴다.
- 이슈 상세 `실행 계정`에 자동 적용된 계정과 사유가 보인다.

## 7. 비목표

- `preempt_pct` 이외의 새 설정 키, 별도 실행 중 임계, 사용량 지연 보정.
- §8.1 lineage 자동 재개 1회 cap(리셋·회복 뒤 `provider_outage` 자동 재개)의 변경 —
  전환 자식은 세지 않으므로 자동 전환 모드의 한도 경로에서는 걸리지 않고,
  `credential` 회복 재개는 현행대로 1회로 센다. 그 알림(`auto_resume_cap`)도
  남는다.
- cswap 내부(부트스트랩 회전·Keychain 처리)의 수정과 업그레이드.
- `dispatchReviewSession` 리뷰 세션의 선제 전환.
- Bead pin 값·워크스페이스 기본 계정 값의 쓰기.
- 워커 카드 문법의 새 슬롯.

## 8. 구현 unit 후보 (advisory)

- unit-01: 서버 상태기 — §3.3 상한 제거·잔재 정리, §3.4 단일성, §3.5 직렬화·분류
  (`provider-health.js`, `queue-store.js`, `scheduler.js` 재개·보류 경로,
  `runner/provider-outage.js`·`runner/codex-outage.js`의 공급자 분류).
- unit-02: 실행 중 선제 전환과 디스패치 덮기 — §3.1·§3.2·§3.7
  (`scheduler.js` 패스·`preemptRunningAttempt`·`applyPreemptSwitch`, `notify.js`,
  `bead-timeline.js`, `compare-projection.js`).
- unit-03: 표시 — §3.6 (`exec-accounts.js`, `gate-labels.js`, 실행 패널 힌트).

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 관찰: claude-swap 0.25.0 → 0.26.0 업그레이드 — 운영 항목이며 이 스펙의 전제가
  아니다.
- 관찰: dotfiles의 9/9 잔재 target(dotfiles-60u8 attempt -2)은 §3.3의 정리 규칙이
  배포되면 그 attempt를 폐기하는 것으로 지워진다 — 그 전에는 큐 파일을 직접 만지지
  않는다.
- 관찰: §8.1 lineage cap을 `wait` 모드에서도 없앨지는 별도 결정이다.

## 결정 (ADR 후보)

- 전제: ADR 0052 — 전환 후보는 러너별 허용 계정 집합 안에서만 고르고, 전환은 attempt
  단위 launch-only `exec_override`이며, 전환 자식은 자동 재개 cap을 소비하지 않는다.
  이 스펙은 그 셋을 그대로 따르고 "선제 전환은 상속된 계정에만 적용되고 Bead pin은
  덮지 않는다" 조항만 뒤집는다.
- 전제: ADR UI-1l3a — 공급자 게이트 판정은 서버가 러너 무관 사다리로 내리고
  `provider_gate` admission 기록으로 공개한다. 이 스펙은 판정 주체와 기록을 그대로
  두고 "상한으로 멎은 usage_limit target은 서버 재시작 시 한 번 프로브된다" 조항만
  상한과 함께 뒤집는다.
- 전제: ADR UI-6icf — 세션 재개 조작은 `⏸`·`▶ 재개` 둘이고 durable pause와
  `prior_attempt`의 서버 계약은 UI 진입점 없이 유지한다. 이 스펙은 조작과 계약을
  그대로 두고 "`prior_attempt` 자동 회복은 기록된 계정을 지킨다(계정 전환 거부)"
  조항만 자동 전환 모드의 `account_switch` 영수증에 한해 뒤집는다(§3.1 3).
- 전제: ADR UI-o5ll(승계 UI-a8rq → UI-1l3a) — 공급자 보류의 해제는 프로브만이
  판정한다. 이 스펙은 그 원칙을 usage_limit·credential target에도 그대로 적용한다.
- **자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다 — 실행 중 attempt도
  임계에서 정지·전환·재개하고, 핀·기본 계정이 보류 중이거나 임계 이상이면
  디스패치에서 덮어 전환하며, `prior_attempt` 계정 잠금도 이 전환에는 양보하고,
  usage_limit 보류의 자동 프로브에는 상한이 없으며, 인증 실패는 계정 단위 공급자
  보류로 프로브가 회복을 판정한다.**
  되돌리기 어려움: 있음 — durable 어휘(`account_sources:'live_switch'`,
  `cause:'account_preempt:*'`, `auto_resume_pending.origin`,
  `detail:'credential'`)와 상한 상수·알림 제거가 함께 움직인다 / 맥락 없이 놀라움:
  있음 — 이슈에 핀한 계정이나 `prior_attempt`로 잠근 계정이 조용히 다른 계정으로
  실행되고, 무인 Worker가 리셋마다 영원히 프로브하며, 인증 실패가 재시도가 아니라
  보류로 보인다 / 실제 트레이드오프: 있음 — 진행 중인 턴을 끊는 비용과 pin·잠금의
  명시성 대 자동화의 연속성. 세 조건 충족.
  `summary`: "자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다 — 실행 중
  attempt도 preempt_pct에서 정지해 허용 계정으로 같은 세션을 재개하고, 핀·기본
  계정이 보류 중이거나 임계 이상이면 디스패치에서 launch-only로 덮어 전환하며
  prior_attempt 계정 잠금도 이 전환에는 양보하고, usage_limit 보류의 자동 프로브에는
  24시간·재무장 상한이 없으며, 인증 실패는 계정 단위 공급자 보류로 프로브가 회복을
  판정한다." → ADR, supersede 0052 · UI-1l3a · UI-6icf
- 전환 재개 단일성(멱등 `holdAttempt`·in-flight 집합)과 같은 계정 기동 직렬화 —
  되돌리기 어려움: 낮음(내부 가드) / 맥락 없이 놀라움: 없음 / 실제 트레이드오프:
  없음. → ADR 아님
