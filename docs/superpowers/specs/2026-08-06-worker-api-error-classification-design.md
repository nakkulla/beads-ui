# 워커 API 오류 세션 종료를 일반 실패와 분리해 분류·알림·1회 자동 재시도 (UI-efkj)

- 날짜: 2026-08-06
- Bead: UI-efkj
- 상태: 설계 승인 대기

## 배경

UI-rxp3 워커 세션이 PR #100 제출, 작업 보고서 코멘트, bead `resolved` 기록까지
전부 마친 **직후** 마지막 응답 도중 Anthropic API 서버 오류로 끊겼다. claude CLI가
남긴 마지막 `result` 이벤트는 다음과 같았다.

```
terminal_reason  = api_error
api_error_status = null
subtype          = success
is_error         = true
result           = "API Error: Server error mid-response. …"
```

즉 CLI는 **API 오류였다는 사실을 기계 판독 가능한 형태로 이미 알려주고 있었다**.
그런데 `server/worker/runner/claude.js:273`의 `verdict()`는 `is_error !== false`인
모든 경우를 `reason: 'is_error'` 하나로 뭉개고, `scheduler.js:1325`가 이를
`session_failed:is_error`로 만든다. 결과적으로 배너(`running-grid.js:257`)와
Discord 알림(`notify.js:311`)에서 **API 오류·모델 자체 실패·가드 위반이 모두 동일한
"세션 실패"로 보인다**. 사용자는 산출물이 온전한데도 실패로 읽었고, `failAttempt`가
`auto_advance`를 껐기 때문에 큐는 사람이 올 때까지 멈춰 있었다.

부수적으로 확인된 사실: 이 사례에서 `subtype`은 `success`인데 `is_error`가 `true`였다.
`subtype`은 API 오류 판정에 신뢰할 수 없고 `terminal_reason`이 정확한 신호다.

## 목표

1. API 오류로 인한 세션 종료를 일반 실패와 구분해 판정하고, 근거를 attempt에 보존한다.
2. 배너·이슈 상세·Discord 알림에서 그 구분이 사람에게 드러나게 한다.
3. API 오류에 한해 **1회** 자동 재시도(`claude --resume`)하되, 폭주와 조용한 유실이
   둘 다 불가능하도록 상한과 재시작 안전장치를 건다.

## 비목표

- `result` 이벤트 자체가 없는 종료(`no_result`), `orphaned`, 가드 킬(`blocker`)은
  재시도 대상이 아니다. 프로세스가 result 없이 죽은 경우는 API 오류인지 OOM인지
  구분할 근거가 없다.
- 재시도 횟수·백오프의 설정 노출 없음. 1회 상한 + 60초 고정 + api_error 한정이면
  폭주 여지가 없고, 두 번째 실패는 기존 halt가 잡는다.
- `auto_advance`를 자동으로 **켜는** 동작은 추가하지 않는다. 자동 진행 재개는 여전히
  사용자의 명시적 ▶다.
- dotfiles workflow 계약 변경 없음. `cause` 어휘는 `queue.json` 런타임 상태에만
  남고 bead metadata로 새지 않으므로 beads-ui 단독 변경이다.

## 설계

### 1. 판정 — 어댑터가 소유한다 (`server/worker/runner/claude.js`)

`verdict()`에 `terminal_reason` 검사를 추가하되 **`subtype`·`is_error` 검사보다 먼저**
둔다. 이번 사례는 `subtype === 'success'`라 순서를 바꾸지 않아도 잡히지만, CLI가 다른
subtype을 주는 API 오류도 API 오류이기 때문이다. 판정 순서는 다음과 같다.

1. `result` 이벤트 없음 → `no_result` (기존)
2. 마지막 `result`의 `terminal_reason === 'api_error'` → **`api_error` (신규)**
3. `subtype !== 'success'` → `subtype` (기존)
4. `is_error !== false` → `is_error` (기존)
5. 그 외 → `ok`

`verdict()`의 반환값에 `terminal_reason`(string|null)과 `api_error_status`
(number|null)를 추가한다. `session.js:537`의 verdict 조립부는 이 두 필드를
`RunnerVerdict`로 그대로 통과시킨다. 어댑터 계약 타입 두 곳을 함께 고쳐야 한다 —
`session.js:114`의 `AdapterSpec.verdict` 시그니처 JSDoc과 `RunnerVerdict` typedef.
`api_error_status`가 숫자가 아니면 `null`로 정규화한다(표시는 fail-quiet).

가드 킬은 `session.js:542`가 `reason`을 `blocker`로 덮어쓰므로 자동으로 재시도 대상
밖이다. 그래도 재시도 자격 검사(§3)에서 `!verdict.blocked`를 방어적으로 명시한다.

판정을 scheduler가 raw 이벤트에서 직접 하지 않는 이유: "CLI 방언은 어댑터가 흡수하고
scheduler는 런너 중립을 유지한다"는 기존 경계를 지키기 위해서다.

### 2. attempt 레코드 확장 (`server/worker/queue-store.js`)

`makeAttempt`는 명시적 필드 화이트리스트이므로 새 필드는 거기와 JSDoc `@property`에
함께 선언해야 한다. 세 개를 추가한다.

- `terminal_reason: string|null` — CLI가 준 종료 사유 원본.
- `api_error_status: number|null` — 알려진 경우의 HTTP 상태코드. 이번 사례처럼 `null`일
  수 있으므로 표시는 fail-quiet(없으면 생략).
- `api_retry_of: string|null` — 이 attempt가 자동 재시도로 태어났다면 그 조상 attempt_id.
  `resumed_from`과 별도로 두는 이유: `resumed_from`은 수동 이어하기와 충돌 해결도
  쓰므로, 그걸로는 "자동 재시도였다"를 구분할 수 없다. 자동 재시도 attempt는 두 필드를
  **모두** 갖는다(`resumed_from`은 relaunch 기계가 채우고, `api_retry_of`가 사유를 말한다).
- `api_retry_pending_until: number|null` — 재시도가 예약된 조상 attempt에 찍히는
  epoch ms. 재시작 복구(§5)와 UI 표시(§6)의 근거.

### 3. 재시도 예약 (`server/worker/scheduler.js`)

`onSessionDone`의 `if (!verdict.success)` 분기에서, `failAttempt` 대신 먼저
`scheduleApiRetry`를 시도한다. 이 배치는 기존 `retryDispositionFresh`
(`scheduler.js:1540` 부근)와 동일한 구조다 — 재시도가 성립하면 실패 마감 경로를 아예
타지 않는다.

**자격 검사 — 넷을 모두 만족해야 예약한다.**

1. `verdict.reason === 'api_error'`이고 `verdict.blocked`가 아니다.
2. 조상 attempt의 `api_retry_of == null` — 자동 재시도의 산물은 다시 자동 재시도하지
   않는다(체인 1회 상한).
3. 조상이 `disposition`/`conflict_resolution`/`external_conflict` attempt가 아니다.
   이들은 각자의 완료 경로를 갖는다.
4. 기존 `resume()`의 fail-closed 거부 사유 4종을 사전 통과한다 — `session_id` 있음,
   워크트리 존재, 같은 bead의 `running` attempt 없음, 이미 이어받은 자식 없음.

하나라도 어긋나면 그 자리에서 기존 `failAttempt`로 간다(halt + 배너). 즉 **동작이
바뀌는 경우는 오직 넷을 다 만족할 때뿐**이다.

**예약 시 하는 일.** 조상 attempt를 정상적으로 종료 기록한다 — `status: 'failed'`,
`cause: 'session_failed:api_error'`, `finished_at`, `terminal_reason`,
`api_error_status`, `api_retry_pending_until: now + 60000`.

**예약 시 하지 않는 세 가지**가 `failAttempt`와의 차이다.

- `setAutoAdvance(false)`를 부르지 않는다 — 큐는 계속 돈다.
- `releaseBeadClaim(bead_id)`을 부르지 않는다. **이것이 핵심이다.** claim을 놓으면
  `auto_advance`가 켜진 채이므로 다음 tick이 같은 bead를 `--resume` 없는 새 세션으로
  다시 띄운다.
- `revertWorkflowMode` / `revertExecStamps`를 부르지 않는다. 재시도 세션이 그대로
  이어받아야 하는 값이다.

**60초 후.** 기존 `resume()`이 쓰는 `relaunchFromAttempt`를 재사용해 relaunch하고, 새
attempt에 `api_retry_of: <조상 attempt_id>`를 기록한다. `resume` 경로는 사람 클릭
기준이라 슬롯 cap이 면제되므로, 대기 중 다른 bead가 슬롯을 채워도 재시도는 뜬다.
relaunch가 거부되면(그 사이 상태가 변했을 때) 조상을 정상 실패로 마감한다 —
`api_retry_pending_until`을 지우고, claim 해제·스탬프 복구·`auto_advance` off·배너까지
`failAttempt`와 동일하게 처리한다.

타이머는 기존 `usage_fanout_timers`와 같은 패턴을 쓴다 — `setTimeout` + `unref()`로
프로세스 종료를 막지 않고, 워크스페이스별 Map에 보관해 재시도 발사 시 제거한다.

**백오프 60초.** 일시적 5xx는 보통 수십 초 안에 풀리고 과부하도 1분이면 상당수
회복된다. 재시도가 1회뿐이므로 그 한 번의 기회를 잘 쓰는 쪽이 이득이다. 상수로 박는다.

### 4. 재시도 세션의 프롬프트

`resume()`이 쓰는 `resumePrompt(bead_id, prior_status)`를 그대로 쓴다. 자동 재시도도
"끊긴 세션을 같은 워크트리에서 이어서 마저 하라"는 점에서 수동 이어하기와 과업이
동일하므로, 프롬프트를 새로 만들지 않는다.

### 5. 재시작 안전 (`reconcile`)

타이머는 메모리에만 있으므로 서버가 재시작하면 사라진다. 예약이 조용히 유실되지
않도록, `reconcile`에 한 갈래를 추가한다: `api_retry_pending_until`이 찍혀 있고
`api_retry_of`로 자신을 가리키는 자식 attempt가 없는 attempt를 발견하면, 예약을
취소하고 정상 실패로 마감한다 — 필드 클리어, claim 해제, workflow_mode/exec 스탬프
복구, `auto_advance` off, 배너.

재시작 후 남은 시간을 계산해 타이머를 다시 걸지 **않는** 이유: 재시작은 그 자체로
사람이 개입한 사건이고, 배너의 ↻ 버튼이 바로 옆에 있다. 자동 복구를 한 겹 더 쌓는
것보다 명시적으로 사람에게 넘기는 쪽이 안전하다.

### 6. 알림 (`server/worker/notify.js`)

`TITLE`에 `api_retry: '${SENDER} ⚠️ API 오류 · 재시도'`를 추가하고,
`attemptRetrying({ bead_id, repo, attempt_id, delay_ms })` 라이프사이클 메서드를
추가한다. 기존 메서드들과 동일하게 fire-and-forget · no-throw다.

**예약 즉시 발송한다** — 60초를 기다리지 않는다. 사용자가 몇 초 안에 상황을 알아야
계정 문제나 지속적 과부하를 감지할 수 있고, 비용이 두 번 나가는 것도 드러난다.
본문은 headline + `사유: API 오류로 중단 — 60초 후 자동 재시도` + `리포:` 줄.

최종 실패는 기존 `attemptFailed`가 처리한다. `cause`가 `session_failed:api_error`로
전달되므로 `사유:` 줄에 그대로 실린다.

### 7. UI — 배너 (`app/views/worker/running-grid.js`, `app/views/worker/index.js`)

`index.js:1966`의 배너 상태 구성에 두 필드를 더한다: `api_error`(cause가
`session_failed:api_error`인지)와 `retry_pending_until`.

`running-grid.js`의 `bannersTemplate`은 그에 따라 갈라진다.

- 일반 실패: 기존 `⛔ <repo> 세션 실패 — <reason>. 자동 진행을 껐습니다, 수동 ▶ 필요.`
- API 오류(재시도 예약 없음): `⚠ <repo> API 오류로 중단 — 작업물은 남아 있습니다.
  자동 진행을 껐습니다, 이어하기를 권장합니다.`
- API 오류(재시도 예약 중): `⚠ <repo> API 오류로 중단 — 자동 재시도를 기다리는 중입니다.`
  남은 초를 숫자로 박지 않는다. 배너는 큐 스냅샷 변화에만 갱신되므로 "60초 후"는
  40초가 지나면 틀린 값이 된다.

재시도 예약 중에는 ↻와 ✕를 **둘 다 비활성화**하고 title에 이유를 적는다
(`자동 재시도 예약됨 — 잠시 후 재개됩니다`). 타이머와 사람 클릭의 경쟁을 없애는 가장
단순한 방법이고, 창은 60초뿐이다.

### 8. UI — 이슈 상세 (`app/views/detail-panel/session-history.js`)

세션 이력 행에 이미 `resumed_from` 마커(`↻`, `session-history.js:304`)가 있다.
`api_retry_of`가 있는 행은 이 마커를 자동 재시도용으로 구분한다 — 라벨과 title을
`API 오류 자동 재시도 (from <조상 attempt_id>)`로 바꾼다. 수동 이어하기는 기존 문구를
유지한다.

조상 행의 `causeLine`은 `session_failed:api_error`를 사람이 읽는 문구로 매핑한다
(`API 오류로 중단`). `api_error_status`가 있으면 title에 덧붙이고, 없으면 생략한다
(fail-quiet).

### 9. 오류 처리

- `terminal_reason`이 문자열이 아니거나 없으면 기존 판정 순서가 그대로 적용된다
  (하위 호환: 구 CLI·구 fixture는 영향 없음).
- 알림 실패는 큐 전이를 실패시키지 않는다(기존 no-throw 계약 유지).
- 타이머 콜백 내부의 예외는 잡아서 로그하고, 조상을 정상 실패로 마감한다 — 예약이
  예외로 증발하는 경로를 남기지 않는다.

## Test scope

RED → GREEN 대상 seam은 다음으로 한정한다.

1. `server/worker/runner/claude.test.js` — `verdict()` 판정
   - `terminal_reason: 'api_error'` + `is_error: true` + `subtype: 'success'` →
     `reason === 'api_error'` (UI-rxp3 실사례 형태)
   - `terminal_reason: 'api_error'` + `subtype: 'error_during_execution'` →
     `reason === 'api_error'` (순서 검증)
   - `terminal_reason: 'completed'` + `is_error: true` → `reason === 'is_error'`
   - `terminal_reason` 부재 + `is_error: true` → `reason === 'is_error'` (하위 호환)
   - 성공 케이스에서 `terminal_reason`/`api_error_status`가 verdict에 실려 나오는지

2. `server/worker/scheduler.test.js` — 재시도 예약·발사·마감 (60초 대기는 실시간으로
   기다리지 않는다. 타이머를 주입 가능하게 두거나 fake timer로 진행시킨다 — 어느
   쪽이든 테스트가 실제로 60초 걸려서는 안 된다)
   - api_error 세션 종료 시: 조상이 `failed` + `cause: session_failed:api_error`,
     `auto_advance`가 **켜진 채로 유지**, bead claim 유지, workflow_mode/exec 스탬프
     **미복구**, `attemptRetrying` 알림 1회
   - 60초 경과 후 relaunch되고 새 attempt가 `api_retry_of`를 갖는지
   - 재시도 attempt가 다시 api_error로 끝나면 재재시도 없이 `failAttempt`(halt)
   - `blocked` verdict은 api_error 여부와 무관하게 재시도하지 않음
   - `resume()` 거부 사유(session_id 없음/워크트리 없음/이미 이어받음)마다 즉시
     `failAttempt`로 떨어지는지
   - disposition·conflict_resolution attempt는 재시도 대상에서 제외되는지

3. `server/worker/scheduler.test.js` — 재시작 복구
   - `api_retry_pending_until`이 남고 자식이 없는 attempt를 `reconcile`이 정상 실패로
     마감하는지(필드 클리어 + claim 해제 + auto_advance off)

4. `server/worker/notify.test.js` — `attemptRetrying` 메시지 본문과 no-throw 계약

5. `app/views/worker/index.test.js` — 배너 상태의 3분기(일반 실패 / API 오류 /
   재시도 예약 중)와 예약 중 ↻·✕ 비활성화

6. `app/views/detail-panel/index.test.js` — `api_retry_of` 행의 마커 구분 표시와
   `api_error_status` 부재 시 fail-quiet

## 적용 순서·검증

1. `queue-store.js` 필드 추가 → `claude.js` 판정 → `session.js` 통과 → `scheduler.js`
   예약/발사/reconcile → `notify.js` → UI 2곳. 아래 단계는 위 단계의 필드에 의존하므로
   순서를 지킨다.
2. Pre-Handoff Validation 전체: `npm run tsc`, `npm test`, `npm run lint`,
   `npm run prettier:write`, `npm run build`(프런트엔드 변경이 있으므로
   `app/main.bundle.js`와 `.map` 포함해 커밋).
3. 배포 커버리지: 이 저장소의 `docs/agents/repo-ops.toml` `[deploy]`에
   `cmd = ["bdui-shared", "restart"]`, `detached = true`가 선언되어 있으므로 머지 후
   재시작은 워커의 정리 sweep이 담당한다. 머지 후 프로세스 경로·포트·HTTP 응답 확인은
   그대로 남는다.
