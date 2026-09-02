---
scope:
  - server/worker/
  - server/ws/worker-handlers.js
  - app/protocol.js
  - app/views/worker/
  - app/utils/transcript-lines.js
  - app/views/settings-dialog/execution-pane.js
  - app/styles.css
---

# Worker 공급자 장애(provider_outage) 보류·자동 재개·모델 전환 재개 설계

- Bead: UI-jr8v (discovered-from UI-yrzu)
- 날짜: 2026-08-24 · 확장 2026-09-02 (rev2)
- 상태: 확장분 spec 리뷰 대기 (원안 spec 리뷰 통과 `codex@c4dc35de`)
- rev2 변경 요약: (a) **계정 사용 한도**(`usage_limit`) 클래스를 공급자 장애에
  넣고 회복을 "창 리셋 대기" 또는 "다른 계정으로 같은 transcript 이어하기"로
  정한다(§3.3·§6·§7.4·§8.3). (b) 세션이 결과 줄로 실패를 보고하고 정상 종료하는
  **hard-stop**을 `session_ended_unresolved`에서 분리한다(§4.2). (c) `--resume`
  대상 transcript 유실 시 요약 인계 fresh 대체를 정한다(§9.4). (d) 2026-08-28
  이후 착지한 실패 2계층·held 타일 표면에 맞춘 정정(§4.1·§10). 원안의 승인된
  결정(접근 A `paused` 재사용, 러너 단위 게이트, 실경로 프로브, 계보당 자동 재개
  1회, 자동 모델 전환 금지)은 바뀌지 않는다.

## §1 배경과 문제

UI-yrzu attempt `UI-yrzu-1787544581698-1`에서 Claude API가 529 Overloaded를 반환하며
세션이 중단됐다. 세션 jsonl의 마지막 `result` 이벤트는 다음과 같았다:

```json
{"subtype": "success", "is_error": true,
 "result": "API Error: 529 Overloaded. This is a server-side issue, usually temporary — …"}
```

그런데 attempt cause는 `verify_failed:pr_missing`으로 기록됐다. 분류 구멍은 두 곳이다.

1. **라이브 경로** — `server/worker/runner/claude.js`의 `verdict()`는 마지막 result의
   `is_error !== false`를 일반 사유 `is_error`로 축약한다. 529라는 정보는 result
   문자열에 있지만 버려진다.
2. **reconcile 경로** — 서버 재시작 후 detached 세션 정산
   (`scheduler.js disposeDeadAttemptSettlement`)은 세션 로그를 읽지 않고 곧장 GitHub
   PR 관찰로 가서, PR이 없으니 실패가 된다. UI-yrzu는 이 경로였다. (정정 2026-09-02:
   2026-08-28 실패 2계층 스펙 이후 이 결말의 cause는 `verify_failed:pr_missing`이
   아니라 `session_ended_unresolved`다. 이름만 바뀌었고 오분류는 그대로다.)

두 경로 모두 공급자 장애를 "작업 실패"로 오분류한다. `verify.js`에는 이미 "gh 관찰
장애를 `no_pr`로 강등하지 않는다"는 fail-closed 원칙이 명문화되어 있다. 이 설계는
같은 원칙을 실행 공급자(Claude API)로 확장한다: **공급자 장애 ≠ 작업 실패.**

**재개 루프 증거 (2026-08-24 실측).** 사용자가 배너의 `↻ 이어하기`를 눌러 만든 재개
attempt 2건(`…554642261-1`, `…555322068-1`)도 전부 `num_turns: 1`에서 같은 529로
죽었다 — 재개의 첫 요청은 원 세션의 누적 컨텍스트를 통째로 싣는 대형 요청이라, 부분
과부하에서 소형 요청이 통과할 때도 셰딩된다. 장애가 걷힌 뒤 같은 세션의 직접
`--resume`은 정상 응답했다(세션 자체는 무결). 부수 관측: 동일한 죽음이 attempt 2에선
`verify_failed:pr_missing`(사이 배포 재시작 → reconcile 경로), attempt 3에선
`session_failed:is_error`(라이브 경로)로 라벨까지 갈라졌다. 함의 세 가지 — 프로브는
장애를 겪은 모델로 해야 하고(§7), 소형 프로브 통과가 대형 재개 통과를 보증하지
않으며(§8의 재보류가 잔여 처리), `--resume` 재생 요청 자체가 반복 셰딩될 때의
탈출구로 새 세션 재개(요약 인계)가 필요하다(§9).

**계정 사용 한도 증거 (2026-09-02 실측, UI-i60a).** attempt
`UI-i60a-1788238947008-1`(claude opus, 계정 pin 없음)은 2026-09-01 14:02 KST에
디스패치돼 81턴·37분 뒤 다음 result로 죽었다:

```json
{"subtype": "success", "is_error": true, "terminal_reason": "api_error",
 "api_error_status": 429, "num_turns": 81,
 "result": "You've hit your session limit · resets 6pm (Asia/Seoul)"}
```

Worker 기록은 `failed` / `session_failed:is_error` / `cause_detail.summary`에 원문.
실패 2계층의 `env` 패턴(`rate.?limit|429`)은 이 문장에 걸리지 않아 `individual`로
떨어졌고, 큐는 이 bead를 실패 타일로 두었다. 사람이 다음날 09:18에 `↻ 이어하기`를
눌러 attempt 2가 **같은 session_id(`f2801603…`)로 `--resume`** 됐고(timeline
`dispatched:…-2:resume`), 47분 뒤 PR #245를 냈다. 즉 attempt 2는 fresh dispatch가
아니었다 — Bead 설명의 "처음부터 같은 탐색을 반복" 관측은 재개 뒤 세션이 워크트리
상태를 다시 점검한 구간이며, transcript는 이어졌다. 낭비의 실체는 두 가지다: (1)
창은 18:00에 리셋됐는데 재개는 사람이 올 때까지 **18.7시간** 기다렸다 — 결과 문장에
리셋 시각이 있었는데도 기계가 읽지 않았다. (2) 카탈로그에 창이 남은 다른 계정이
있었는데도 전환 선택지가 없었다. 두 문제 모두 "실패"가 아니라 "계정에 묶인 보류"로
분류해야 풀린다. 이 클래스가 `session limit` 문장 외에 `429`를 동반한다는 것,
그리고 claude CLI(관측 버전 2.1.257)가 result 이벤트에 구조화 필드
`terminal_reason`/`api_error_status`를 싣는다는 것이 §3의 판정 근거다.

## §2 목표와 비목표

목표:

1. 공급자 장애를 전용 cause 클래스 `provider_outage:<detail>`로 분류한다 (라이브 +
   reconcile 두 경로 모두).
2. 해당 attempt를 실패가 아닌 **보류**(기존 `paused` 상태 재사용)로 라우팅하고, 같은
   러너의 신규 디스패치를 함께 게이트한다.
3. 실경로 저가 ping 헬스 프로버로 회복을 감지해 게이트를 풀고, 계보당 1회 자동
   재개한다.
4. 수동 이어하기에 `exec_override`(runner/model/effort/claude_account)를 추가한다 —
   claude→claude는 `--resume` 유지 + 카탈로그 모델(opus-4.8/opus-4.6 포함)·카탈로그
   계정, 교차 런타임(claude→codex 등)은 fresh 세션 + 이전 세션 맥락 인계.
5. 보류/회복/자동 재개 소진을 구분된 타일 뱃지·팝오버와 Discord 알림으로 보인다.
6. (rev2) **계정 사용 한도**(`usage_limit`)를 공급자 장애의 한 클래스로 분류하고,
   회복을 (a) 같은 계정 창 리셋 대기 또는 (b) 카탈로그의 다른 계정으로 전환 후
   `--resume <session_id>`로 **같은 transcript 잇기**로 정한다. 새 세션으로 처음부터
   하지 않는다.
7. (rev2) 세션이 계약의 결과 줄(`실패 ·` / `환경 ·`)을 찍고 정상 종료하는
   **hard-stop**을 `session_ended_unresolved`에서 분리해 실패 팝오버에 그 줄을
   그대로 보인다. 재검증 버튼은 만들지 않는다 — 출구는 `↻ 이어하기`다.

비목표:

- codex(OpenAI) 쪽 장애 **패턴 구현**. 분류 계층은 러너-일반 훅으로 설계하되, 이번
  라운드에서 codex 어댑터의 훅은 null을 반환한다 (사용자 결정 2026-08-24: 일반 계층
  + Claude 우선).
- status.claude.com 참조. 사용자 관측(2026-08-24)상 status 페이지는 실제 API 상태와
  양방향으로 어긋난다 (outage 표시 중에도 API 동작). 프로브는 실경로 ping 단독.
- 자동 모델/런타임 전환. 장애를 이유로 공급자·모델을 몰래 바꾸지 않는다. 전환은
  수동 선택만 (사용자 결정 2026-08-24). **계정 전환은 이 금지의 대상이 아니다** —
  모델·런타임은 산출물의 질을 바꾸지만 계정은 과금 풀만 바꾼다(§8.3, rev2 결정).
- (rev2에서 목표 6으로 승격, 삭제) ~~구독 usage-limit 도달 메시지의 분류.~~
- 세션 hard-stop의 **재검증 후 자동 unblock**. UI-cut1은 선행 대기 계층(UI-8kvi)이
  선행 미충족 하드 스톱을 `waiting`으로 정산하면서 닫혔고, 남은 hard-stop에는
  버튼을 붙이지 않는다(사용자 결정 2026-09-02).
- 사용 한도의 **예측**(창 소진 전 선제 전환). 판정은 사후 result 이벤트 하나다.

## §3 분류 계층 — 러너-일반 훅

`AdapterSpec`(`server/worker/runner/index.js`)에 선택 훅을 추가한다:

```js
classifyProviderOutage(ctx: { raw: any[], stderr_tail: string|null })
  → { detail: string, message: string,
      scope: 'provider'|'account', resets_at: number|null } | null
```

### §3.1 판정 소스와 순서 (claude)

구현은 `server/worker/runner/claude.js` 또는 신규
`server/worker/runner/provider-outage.js`. 판정 소스는 두 개, 순서대로:

1. 마지막 `result` 이벤트가 `is_error === true`이면 그 이벤트 하나로 판정한다.
   (rev2) **구조화 필드 우선**: 이벤트에 `api_error_status`(정수)가 있으면 그 값이
   상태 코드다(`terminal_reason === 'api_error'`가 동반 관측되지만 판정에는
   `api_error_status`만 쓴다 — `terminal_reason`은 `completed`/`api_error` 외 값의
   의미가 문서화되지 않았다). 필드가 없거나 정수가 아니면 `result` 문자열 패턴으로
   상태 코드를 읽는다(구 CLI 호환).
2. `result` 이벤트가 아예 없으면(`no_result`) `stderr_tail`에 같은 문자열 패턴을
   적용한다.

**오탐 방지(rev2).** 판정 재료는 오직 마지막 `result` 이벤트(또는 그 부재 시
stderr 꼬리)다. assistant 텍스트·tool_result 본문·중간 result는 보지 않는다 —
모델이 "session limit"을 인용하거나 429를 논의한 transcript는 흔하다.
`is_error === true`가 아닌 result는 어떤 문자열이 있어도 null이다.

### §3.2 detail 매핑 (첫 매칭 승)

| 상태 코드 / 패턴 | detail | scope |
|---|---|---|
| 529, 또는 `/\bAPI Error: 529\b/`, `/\boverloaded\b/i` | `overloaded_529` | provider |
| 5xx(529 제외), 또는 `/\bAPI Error: (5\d\d)\b/` | `http_<code>` | provider |
| 429 ∧ 문자열이 LIMIT_RE에 일치 | `usage_limit` | account |
| 429(LIMIT_RE 불일치), 또는 `/\bAPI Error: 429\b/` | `rate_limited_429` | provider |
| 상태 코드 부재 ∧ 문자열이 LIMIT_RE에 일치 | `usage_limit` | account |

`LIMIT_RE = /\bhit your (?:session|usage|weekly|daily|monthly)?\s*limit\b|\busage limit\b|\blimit reached\b|\bout of (?:extra )?usage\b/i`.
`resets` 단독은 판정 근거가 아니다(리셋 시각 추출에만 쓴다, §3.3). 패턴 상수는
`provider-outage.js`가 소유하고, 실패 2계층의 `ENV_ERROR_PATTERNS.api`는 §4.1대로
공급자 토큰을 넘겨준다.

`message`는 매칭된 원문 라인을 `errorDetail()` 상한(512자)으로 잘라 담는다.
영속은 문자열이 아니라 **객체형** `cause_detail: { kind: 'provider_outage',
message, resets_at }`로 한다 — 현행 `makeAttempt()` 정규화는 객체만 보존하고 문자열을
null로 버리므로, 문자열 union을 새로 여는 대신 기존 객체 스키마에 맞춘다. 저장 후
재로드까지 보존되는지 검증한다 (codex spec 리뷰 F5). 실패 2계층이 쓰는
`cause_detail.summary`(200자)는 이 객체에 **함께** 싣는다 — 팝오버 첫 줄과 실패
라벨이 그 키를 읽는다.

### §3.3 `resets_at` 추출 (`usage_limit` 한정, rev2)

회복 시각의 근거는 우선순위대로 두 개이고, 둘 다 없으면 `null`이다.

1. **result 문장**: `/\bresets?\s+(?:at\s+)?(?<when>[^()]+?)\s*(?:\((?<tz>[A-Za-z_]+\/[A-Za-z_]+)\))?\s*$/i`.
   `when`은 `h(:mm)?(am|pm)` 또는 `Mon D[,] h(:mm)?(am|pm)` 두 형태만 받는다. 시각을
   `tz`(부재 시 서버 로컬 TZ)에서 해석해 attempt `finished_at` **이후의 첫
   발생**으로 고정한다(자정 넘김 처리). 파싱 실패는 조용히 2로 넘어간다.
2. **계정 카탈로그 창**: `accountCatalog`가 준 그 계정 행의 `windows[]` 중 `pct`가
   가장 큰 창의 `resetsAt`(ISO). 행 부재·`status !== 'ok'`·창 없음이면 `null`.

`resets_at`은 추정값이다. §7.4의 재개는 반드시 프로브 통과를 거치므로 추정이 틀려도
attempt가 새로 죽지는 않는다.

### §3.4 우선순위와 codex

- **codex 구현**: 이번 라운드는 항상 null (훅 자리만 확보).
- `verdict.blocked`(guard kill)가 항상 이긴다. 정책이 프로세스를 죽인 attempt는
  꼬리에 outage 신호가 있어도 `loud_fail_blocker`를 유지한다 — 종료 원인이 API가
  아니라 정책이기 때문이다.

cause 표기는 `provider_outage:<detail>` (예: `provider_outage:overloaded_529`,
`provider_outage:usage_limit`).

## §4 라이브 경로 배선 (`onSessionDone`)

### §4.1 3-arm 분기와 실패 2계층에 대한 우선순위

`scheduler.js onSessionDone`의 `!verdict.success` 분기(disposition 쌍둥이
`onDispositionDone` 포함)를 3-arm으로 확장한다:

1. `verdict.blocked` → 기존 `loud_fail_blocker` (`failAttempt`).
2. 어댑터 `classifyProviderOutage(ctx)`가 non-null → **`holdAttempt`** (§5) +
   `provider_hold` 설정 (§6). `failAttempt`를 타지 않는다.
3. 그 외 → 기존 `session_failed:<reason>` (`failAttempt`).

**정정(rev2, 2026-08-28 실패 2계층 스펙과의 정합).** arm 2는
`failure-class.js classifyFailure`의 계층 판정(`parked/individual/env/systemic`)보다
**앞**에서 끝난다. 보류는 어느 계층에도 들어가지 않는다 — `settleFailureTier`를 부르지
않고, `queue.hold`·`lineages`·`hold_history`를 건드리지 않는다. 따라서
`ENV_ERROR_PATTERNS.api`에서 공급자 토큰
`API Error: 5\d\d|Overloaded|overloaded_error|rate.?limit|429`를 **제거**하고 전송
장애 토큰(`ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|fetch failed`)만 남긴다.
같은 문장을 두 판정기가 서로 다른 결말(보류 vs `retry_wait` 사다리)로 잡는 상태를
없애기 위해서다. 분류기가 null을 돌려준 `is_error`는 지금처럼 남은 패턴으로
`env`/`individual`이 된다. 이 정정은 ADR 0016(큐 정지 권한은 systemic만)과
어긋나지 않는다 — `provider_hold`는 큐 정지가 아니라 러너·타깃 단위 디스패치
게이트이고(§6), 실패 사다리를 타지도 승격하지도 않는다.

disposition attempt(수리 세션 등)도 같은 분류를 적용하되, **outage 분류는
disposition 완료/재시도 판정보다 먼저** 적용한다. 공급자 장애로 죽은 수리 세션 역시
작업 실패가 아니다. 단 disposition attempt는 일반 `resume()` 자동 재개 대상이
아니다: 보류 시 disposition lease를 해제하고, 회복 시 기존 수리 디스패치 기계(원
프롬프트·cwd·`repair_operation_id`·lease 획득을 소유)를 통해 재디스패치한다 — 일반
resume은 disposition 전용 필드를 승계하지 못해 일반 구현 attempt로 오분류되기
때문이다 (codex spec 리뷰 F2). 게이트·프로버(§6·§7)는 동일하게 공유한다.

### §4.2 hard-stop arm — 정상 종료 + 결과 줄 (rev2)

`verdict.success === true` ∧ PR 미관측(`vr.reason === 'no_pr'`) ∧ 선행 대기
판정(`judgePrerequisiteWait`, 2026-08-28 선행 대기 계층) 불성립 ∧ `parked` 판정
(`awaiting_user` 존재) 불성립인 결말에서, `failAttempt(null cause)` →
`session_ended_unresolved`로 가기 **전에** 마지막 `result.result`의 첫 비공백
줄을 계약 결과 줄 어휘와 대조한다:

| 첫 줄 | cause | `cause_detail` |
|---|---|---|
| `실패 · <원인>` | `session_hard_stop:failure` | `{ kind:'session_hard_stop', message:<첫 줄, 512자>, summary:<200자> }` |
| `환경 · <오류 문장>` | `session_hard_stop:environment` | 같음 |
| 그 외 | 기존 `session_ended_unresolved` | 기존 |

계층 판정은 그대로 `classifyFailure`가 한다: `session_hard_stop:environment`는
summary가 `ENV_ERROR_PATTERNS`에 걸리면 `env`, 아니면 `individual`;
`session_hard_stop:failure`는 `individual`. `대기 ·`는 선행 대기 계층이 이미 앞에서
잡고, `파킹 ·`은 `awaiting_user` 판정이 잡으므로 여기서 다시 보지 않는다. 마크다운
굵게(`**실패 · …**`)는 별표를 벗기고 대조한다 — UI-i60a attempt 2의 result가
`**성공 · PR #245**`로 시작했듯 세션은 결과 줄을 굵게 찍는다.

이 arm은 **실패 결말**이다(보류 아님). 바뀌는 것은 cause 이름과 팝오버가 보이는
문장뿐이다 — 사용자가 "왜 실패했나"를 세션 로그를 열지 않고 읽는 것이 UI-cut1
잔여의 전부다. 재검증·자동 unblock 버튼은 만들지 않는다(§2 비목표).

## §5 보류 표현 — `paused` 재사용 (접근 A, 승인 2026-08-24)

새 상태값을 만들지 않는다. attempt 상태 어휘
(`running/done/failed/orphaned/paused/stopped` + 2026-08-28의
`parked/retry_wait/superseded/waiting`) 중 `paused`는 유일한 비종결 보류
상태이고, `resume()` 가드가 이미 `{failed, orphaned, paused}`를 허용한다.

새 scheduler 함수 `holdAttempt(workspace, attempt_id, bead_id, prior, outage)`:

- attempt patch(`status:'paused'`, `cause:'provider_outage:<detail>'`,
  `cause_detail: { kind:'provider_outage', message, summary, resets_at }`,
  `finished_at: now()`, usagePatch)와 §6의 `provider_hold` target 등록을 **하나의
  영속 mutation**으로 수행한다 — 분리 쓰기 사이에 재시작이 끼면 보류된 attempt만
  남고 게이트·프로버가 유실된다 (codex spec 리뷰 F4).
- `failAttempt`와 동일하게 workflow_mode/exec 스탬프를 되돌린다 (재개 시 새 attempt가
  재스탬프).
- **`haltAutoAdvanceForAttempt`를 호출하지 않고 `settleFailureTier`도 부르지
  않는다.** 워크스페이스 auto-advance와 `queue.hold`는 그대로이고, §6의 러너 단위
  게이트가 해당 러너·타깃 디스패치만 막는다. codex attempt는 계속 흐른다.
- 사용자 수동 일시정지와의 구분: `pause()`는 `cause:null`을 명시적으로 쓰므로
  `status==='paused' && cause?.startsWith('provider_outage:')`가 판별식이다.
  scheduler `TERMINAL_ATTEMPT_STATUSES`가 `paused`를 leaf로 판정하는 규칙은
  그대로다.
- (rev2) timeline(`bead-timeline.js TIMELINE_KINDS`)에 `provider_hold`·
  `provider_recovered` 두 kind를 추가한다. `attempt_failed`를 재사용하지 않는다 —
  실패가 아니라는 의미를 원장에서도 지킨다.

## §6 러너 단위 디스패치 게이트 `provider_hold`

큐 저장소(`queue-store.js`)에 영속 top-level 필드를 추가한다:

```js
provider_hold: {
  [runner]: {
    since: number,
    generation: number,            // 회복 세대 — §8 재개 영수증이 참조
    targets: Array<{
      kind: 'outage'|'usage_limit',          // rev2
      model: string, account: string|null,   // account = cswap email
      detail: string, last_error: string,
      resets_at: number|null,                // rev2, usage_limit만
      rearm_count: number                    // rev2, §7.4
    }>
  }
}
```

`targets`는 장애를 관측한 (모델, 계정 라우팅) 조합의 **목록**이다. 단일 model
필드는 서로 다른 모델로 돌던 attempt들의 장애가 마지막 쓰기로 덮이고, account
pin(cswap)을 쓴 attempt의 장애를 기본 계정 프로브 성공이 잘못 해제할 수 있다
(codex spec 리뷰 F3). 같은 (kind, model, account) 조합은 한 항목으로 병합한다.

- **account 해석(rev2)**: attempt의 `claude_account`가 null이면 "런치 시점의 기계
  활성 로그인"이다. target에는 null을 쓰지 않고 hold 진입 시 카탈로그
  `active_key`의 email로 **고정**한다 — 사람이 `cswap switch`를 해도 한도가 걸린
  계정은 바뀌지 않기 때문이다. 카탈로그 조회 실패면 `account:null`로 기록하고
  `usage_limit` 게이트는 러너 전체로 넓힌다(fail-closed).
- 쓰기: `holdAttempt`의 단일 mutation(§5)이 target을 등록한다. 회복 해제는 §7
  프로브가 target 단위로 수행하고, `targets`가 비면 runner 항목 자체를 지운다.
- 디스패치 게이트: `tick()`의 launch 경로에서 `resolveDispatchSettings`가 준
  `runner`/계정에 대해 —
  - `kind:'outage'` target이 하나라도 있으면 그 러너의 모든 후보를 큐에 남겨두고
    건너뛴다 (slots 포화와 같은 모양새 — 실패도 소비도 아님. 신규 디스패치 게이트는
    사용자 결정 2026-08-24).
  - (rev2) `kind:'usage_limit'` target은 **계정 단위**다: 후보의 해석된 claude
    계정(bead pin → workspace 기본값 → 카탈로그 `active_key`)이 target `account`와
    같을 때만 건너뛴다. 다른 계정으로 해석되는 후보는 흐른다 — 사용자가 pin이나
    workspace 기본값을 바꾸는 것이 곧 수동 계정 전환이다. 해석 불가(카탈로그
    실패)는 건너뛴다(fail-closed).
- **재시작 생존**: `auto_advance`와 달리 load 시 초기화하지 않는다. 재시작 후에도
  hold가 서 있으면 프로버(§7)를 재가동한다.
- 수동 재개(§9)는 게이트의 예외다: 사용자가 명시적으로 누른 이어하기는
  `provider_hold` 중에도 launch를 허용한다 (사용자가 회복을 직접 확인한 경우,
  그리고 codex 등 다른 러너·다른 계정으로의 전환 재개가 이에 해당).
- `queue.hold`(실패 2계층의 env/systemic 정지)와는 독립이다. 둘 다 서 있으면 둘 다
  막고, 어느 쪽 해제도 다른 쪽을 건드리지 않는다.
- (rev2) 같은 저장소에 top-level `provider_auto_switch: boolean`(기본 `true`,
  부재 = `true`)을 둔다. §8.3의 자동 계정 전환 토글이며 `auto_merge`처럼 load 시
  유지된다.

## §7 헬스 프로버 — 실경로 저가 ping

신규 모듈 `server/worker/provider-health.js`.

### §7.1 가동 조건

`provider_hold[runner]`가 존재하는 동안만. 설정 시 시작, load 시 hold가 있으면
재가동, clear 시 정지. ws 클라이언트 유무와 무관하게 돈다 — `createPoller`의
`getClientCount` 게이트는 쓰지 않는다 (무인 Worker가 주 소비자).

### §7.2 프로브 사양 (claude)

`provider_hold[runner].targets`의 **각 target을 따로** 찌른다 — 러너 어댑터와 같은
바이너리·계정 라우팅(`cswap run <account> --share-history --` 경로 포함) 해석으로
`claude -p "ok" --model <그 target의 카탈로그 CLI 모델 id> --output-format json`,
타임아웃 120초. **장애를 겪은 그 모델·그 계정 경로로 찌른다** — 529는 모델·요청
클래스별로 부분 셰딩될 수 있고(§1 재개 루프 증거), 다른 모델·다른 계정의 통과는
회복 증거가 되지 못한다 (codex spec 리뷰 F3). 성공 = exit 0 ∧ 출력 파싱 가능 ∧
`is_error === false`. 그 외(비정상 종료, 파싱 실패, is_error, 타임아웃)는 그
target 실패로 계속 보류. 프로브 출력에 §3 분류기를 다시 적용해 `usage_limit`이면
`resets_at`을 갱신한다(§7.4).

**한계 명시**: 소형 프로브 통과가 누적 컨텍스트를 통째로 싣는 대형 재개 요청의
통과를 보증하지 않는다. 프로브 통과 후 자동 재개가 다시 provider_outage로 죽는
경우는 §8의 재보류 + cap 판정이 처리한다.

프로브 실패/성공 판정은 세션 spawn 인프라를 재사용하되 attempt를 만들지 않는 별도
경량 spawn이다 (큐 기록·워크트리·가드 훅 없음).

### §7.3 `outage` target의 스케줄 — 백오프

60초 → 2분 → 4분 → 8분 → 15분(상한 고정), 회복까지 무제한.

### §7.4 `usage_limit` target의 스케줄 — 리셋 시각 타이머 (rev2)

한도는 시각으로 풀리므로 백오프가 아니라 타이머다. 리셋 전 프로브는 429를 즉시
돌려주어 싸지만 무의미하다.

- `resets_at`이 있으면 첫 프로브는 `resets_at + 60초`. 통과 → 회복(§7.5). 다시
  `usage_limit` → 새 `resets_at`으로 재무장하고 `rearm_count += 1`. 그 외 실패
  (프로브 자체가 529 등) → 그 target은 `kind:'outage'`로 **재분류**해 §7.3 백오프를
  탄다(같은 항목의 kind만 바뀐다).
- `resets_at`이 없으면 15분 고정 간격.
- 상한: `rearm_count`가 3에 이르거나 hold 진입 후 24시간이 지나면 그 target의
  프로브를 멈추고 `notifyLifecycle('providerAutoResumeDisarmed', …)`를 보낸다
  (§8.1의 소진과 같은 알림·같은 뱃지). target은 남는다 — 게이트는 계속 서 있고
  출구는 §9 수동 이어하기다.

### §7.5 회복 시 (target 단위, 재시작 안전 순서 — codex spec 리뷰 F4)

성공한 target에 대해 (1) 그 target(모델·계정이 일치하는 attempt가 그 target에
묶인다)에 묶인 보류 attempt 중 **§8 cap 판정을 통과한 것만** 자동 재개 영수증
(`auto_resume_pending`, 현재 `generation` 포함, §8)을 target 제거와 **같은 영속
mutation으로 먼저** 기록하고 (마지막 target 제거 = runner hold 제거 = 게이트
개방), (2) 그 다음 pending을 소비하며 자동 재개를 실행한다. 재시작이 어느 지점에
끼어도 pending 영수증이 남아 재개가 유실되지 않으며, load 시 남은 pending을
재개하고 `generation` 불일치 pending은 폐기한다. 이후
`notifyLifecycle('providerRecovered', …)` → `tick()`.

## §8 자동 재개 — 계보당 1회 (사용자 결정 2026-08-24)

### §8.1 cap 판정과 실행

회복 감지 시, `status==='paused' ∧ cause=provider_outage:*`이고 superseded/dismissed/
discard-중이 아닌 attempt마다:

- **cap 판정**: 자동 재개로 태어난 attempt에는 `auto_resume_kind:'provider_outage'`
  마커를 스탬프한다. 대상 attempt 자신 또는 `resumed_from` 체인의 조상에 이 마커가
  있으면 **자동 재개하지 않는다** — 보류는 유지하고
  `notifyLifecycle('providerAutoResumeDisarmed', …)` 1회 + 타일 뱃지에서 수동 조치
  대기. attempt를 `failed`로 위장 전환하지 않는다 (작업 실패가 아니라는 의미 보존).
  (rev2) §8.3의 계정 전환 재개도 같은 마커를 달고 같은 cap을 소비한다 — 계보당
  자동 재개는 어떤 형태든 1회다.
- **재개 실행은 §7이 영속화한 `auto_resume_pending` 영수증 소비로만** 일어난다
  (재시작 안전성 — codex spec 리뷰 F4). cap 이내면
  `resume(workspace, attempt_id, { continuation: 'auto' })` 호출 — `session_id`가
  있으므로 `--resume <sid>`로 이어지는 새 attempt가 `resumed_from`을 달고 태어난다
  (기존 기계 그대로; 조상은 `already_resumed`로 영구 소진되는 기존 규칙 유지).
- **모델 고정 (codex spec 리뷰 F1)**: 자동 재개는 원 attempt의
  `runner/model/effort`(및 account 라우팅)를 그대로 고정해 launch한다 —
  `resolveContinuationForAttempt`의 현재-preset 재도출을 따르지 않는다. 보류 중
  preset이 바뀌어도 자동 경로에서 모델이 바뀌면 "자동 모델 전환 금지"(§2) 위반이다.
  모델 변경은 §9의 수동 `exec_override`로만 가능하다. (rev2) 계정은 예외다 — §8.3.
- **disposition attempt 제외**: §4대로 일반 resume이 아니라 수리 디스패치 기계로
  재디스패치한다 (lease·전용 필드 승계 — codex spec 리뷰 F2).
- resume이 거부되면(`worktree_missing` 등) 보류를 유지하고 거부 사유를 알림에 싣는다.
- 자동 재개된 attempt가 다시 provider_outage로 죽으면 §4→§5로 재보류되고, 위 cap
  판정이 다음 회복 때 자동 재개를 막는다.

### §8.2 재개 대상 transcript

자동·수동을 막론하고 claude→claude 재개는 원 attempt의 `session_id`로
`--resume`한다. transcript 존재 확인과 유실 시 대체는 §9.4가 소유한다.

### §8.3 `usage_limit` 보류의 자동 경로 — 계정 전환 우선 (rev2 결정)

`kind:'usage_limit'` target으로 보류된 attempt는 §7.4의 리셋 타이머를 기다리기
**전에**, hold 진입 직후 한 번 다음을 판정한다. 이 자동 전환은 워크스페이스
토글 `queue.provider_auto_switch`(사용자 결정 2026-09-02: 기본 **켬**, 설정에서
끌 수 있음)가 켜져 있을 때만 돈다 — 꺼져 있으면 3의 타이머 경로로 바로 간다.
토글은 `auto_merge`와 같은 모양의 큐 durable 필드이고, ws
`worker-provider-auto-switch-toggle {on}`(기존 `sendQueueCas` 경로, 응답 뒤
`worker-queue-snapshot` fanout으로 readback)이 바꾸며, load 시 초기화하지
않는다(재시작 생존). 수동 `다른 방법으로`(§9)의 계정 선택은 토글과 무관하다.

1. **후보 계정**: `accountCatalog`의 claude 행 중 `status === 'ok'`, target
   `account`가 아니며, 현재 `provider_hold` 어느 target의 `account`도 아니고, 창
   조건 `5h.pct ≤ 80 ∧ (7d 창 부재 ∨ 7d.pct ≤ 90)`을 만족하는 계정. `5h` 창이
   없는 행(사용량 미관측)은 후보가 아니다. 정렬은 `7d.pct` 오름차순(부재는 0),
   동률이면 `number` 오름차순. 임계값은 코드 상수다(설정 키를 만들지 않는다).
2. 후보가 있고 §8.1 cap 이내면 **프로브 없이 즉시** 그 계정으로 자동 재개한다 —
   `auto_resume_pending`에 `account: <email>`을 실어 §7.5와 같은 선영속 뒤 소비
   순서로 `resume(workspace, attempt_id, { continuation:'auto', exec_override:
   { claude_account: <email> } })`. 한도는 계정에 묶이므로 다른 계정의 프로브는
   증거가 못 되고, 첫 `--resume` 요청 자체가 프로브다(실패하면 §4→§5 재보류).
   원 target은 그대로 남아 §7.4 타이머를 계속 탄다 — 리셋되면 target만 지운다
   (묶인 attempt는 이미 전환 재개됐으므로 재개 대상이 없다).
3. 후보가 없거나 cap 소진이면 §7.4 타이머 경로다.

자동 계정 전환을 허용하는 근거: §2 비목표의 "자동 모델·런타임 전환 금지"는 산출물
품질과 리뷰 계보가 바뀌는 것을 막는 규칙이고, 계정은 같은 모델·같은 transcript의
과금 풀만 바꾼다. 세션 한도 낭비의 실체(§1)는 창 리셋까지의 **대기 시간**이므로
전환이 리셋 대기보다 앞이다. 전환된 attempt는 `claude_account: <email>`,
`account_sources.claude: 'outage_switch'`, `account_switched_from: <원 email>`을
스탬프한다(Bead metadata·workspace kv는 쓰지 않는다 — §9의 override 적용 범위와
같다). `exec_receipt` 형식(`delegated:<model>:<effort>@<sha>`)에 계정은 없으므로
영수증·리뷰 계보는 불변이고, 계정 전환은 attempt 기록과 timeline
(`provider_recovered` 이벤트의 `account` 필드)이 남긴다.

`--share-history`(2026-08-23 per-issue-exec-account §1.2)가 `projects/`를 `~/.claude`와
공유하므로 다른 계정 프로필에서도 같은 `session_id`가 보인다. 구현은 이 전제를
fixture가 아니라 실제 cswap으로 1회 확인해 보고서에 남긴다; 어긋나면 §9.4의
transcript 유실 경로가 fresh 대체를 잡으므로 attempt가 조용히 사라지지는 않는다.

## §9 수동 이어하기 `exec_override` — 모델·런타임·계정 전환 재개

2026-08-19 resume-user-instructions 설계와 같은 접촉면(`app/protocol.js` →
`server/ws/worker-handlers.js` `handleWorkerAttemptResume` → `attach.js`
`resumeWorkerAttempt` → `scheduler.js` `resume`)에 선택 파라미터를 추가한다:

```js
exec_override?: { runner?: string, model?: string, effort?: string,
                  claude_account?: string }   // rev2
```

### §9.1 검증과 적용 범위

- **검증**: ws 계층에서 `runtimeCatalog()` 대조 — override 적용 후 **완성된
  runner/model/effort 조합**을 검증한다: runner가 카탈로그에 있고, model이 그
  러너의 models에 있고, effort가 그 모델(또는 러너)의 effort 어휘에 있어야 한다.
  (rev2) `claude_account`는 `accountCatalog.resolveClaude(email)`이 단일 행으로
  해소돼야 하고 runner가 `claude`여야 한다. 하나라도 불합격이면 전체를 거부 사유
  `exec_override_invalid`로 거부한다 (fail-closed, 부분 적용 없음 — codex spec
  리뷰 F6).
- **적용 범위**: 이번 재개 attempt 한정. Bead metadata·exec preset·workspace
  kv에 쓰지 않는다. `resolveContinuationForAttempt`가 preset에서 도출한 launch
  설정 위에 override를 덮는다.

### §9.2 같은 러너 (claude→claude)

continuation 판정은 기존 그대로(`--resume <sid>` 유지), argv의 `--model`만 카탈로그
id로 바뀐다 — `opus-4.8→claude-opus-4-8`, `opus-4.6→claude-opus-4-6` (카탈로그 기존
등재 확인됨). (rev2) `claude_account`가 있으면 `cswap run <email> --share-history --`
래핑이 그 계정으로 바뀐다. 세션 계보·컨텍스트는 유지된다.

### §9.3 교차 런타임과 "새 세션으로 이어하기"

- **교차 런타임 (claude→codex, 일반화하면 러너가 다른 모든 재개)**: 세션 resume이
  불가능하므로 continuation을 `fresh_current`로 강제하고 **맥락 인계 블록**을
  instructions 채널에 주입한다:
  1. 헤더: 이 세션은 공급자 장애(또는 한도)로 중단된 `<runner>` 세션의 연속이며,
     같은 워크트리에 부분 작업이 남아 있다는 선언.
  2. 진행 요약: 원 attempt의 세션 jsonl에서 `createTranscriptReducer`
     (`app/utils/transcript-lines.js`)로 최근 assistant 텍스트를 추출해 총 4,000자
     상한으로 담는다 (읽기는 `session-log.js read()` 경로 재사용 — Worker가
     자기 사본을 `beads/<bead>/sessions/<attempt>.jsonl`에 두므로 claude의
     transcript 유무와 무관하게 항상 가능하다).
  3. 지시: `git status`/`git diff`로 워크트리 실상태를 먼저 확인하고 이어서 진행.
  - completion 계보 키(`completion_root_id`/`completion_op_id`)는
    2026-08-11-completion-resume-lineage-recovery 설계의 승계 규칙을 그대로 따른다.
- **같은 러너의 "새 세션으로 이어하기"**: 러너를 바꾸지 않아도 사용자는
  `continuation:'fresh_current'`를 선택할 수 있고(기존 continuation 어휘 재사용),
  provider_outage 보류/실패 attempt의 fresh_current 재개에는 교차 런타임과 동일한
  맥락 인계 블록을 주입한다. `--resume` 재생 요청 자체가 반복 셰딩되거나 누적
  컨텍스트가 과대해 재개가 계속 죽는 UI-yrzu형 상황(§1)의 탈출구다.

### §9.4 `--resume` 대상 transcript 유실 — 요약 인계 fresh 대체 (rev2)

같은 transcript를 잇는 것이 기본이고, fresh는 **유실이 증명됐을 때의 대체**다.

- **런치 전 확인**: claude 세션 continuation(`continuation_mode:'session'`)을
  launch하기 전에 `session-ref.js resolveSessionFile`과 같은 규칙으로 transcript
  파일(`~/.claude/projects/<cwd slug>/<session_id>.jsonl`)의 존재를 확인한다 —
  review-session이 이미 쓰는 "이 기계에 transcript가 있는가" 판정을 재사용한다.
  부재면 `fresh_current`로 바꾸고 §9.3의 인계 블록을 주입하며, 새 attempt에
  `resume_fallback: { reason:'transcript_missing', session_id }`를 스탬프한다.
  자동 재개(§8)·수동 이어하기 모두 같은 규칙이다. 수동 경로의 ws 응답에는
  `fallback:'transcript_missing'`을 실어 UI가 토스트로 알린다.
- **런치 후 실패**: 파일은 있었으나 CLI가 `no_result`로 죽고 stderr 꼬리가
  `/No conversation found|session .* not found|resume/i`에 걸리면 cause
  `resume_failed:transcript_missing`(`individual`, 실패)로 기록하고, 같은 계보에
  `resume_fallback` 마커가 아직 없을 때 **1회** fresh 대체를 자동 실행한다. 마커가
  이미 있으면 실패로 남긴다(무한 fresh 방지).
- fresh 대체 attempt는 `resumed_from`을 그대로 달아 계보와 §8 cap 판정이 이어진다.

### §9.5 게이트 예외와 기록

- 수동 이어하기는 §6 게이트의 예외로 launch가 허용된다. 단 hold가 서 있는 동안의
  이어하기 UI에는 게이트 배지(§10)로 장애 진행 중임이 함께 보인다 — 반복 클릭이
  attempt 기록만 쌓는 상황을 사용자가 인지한 채 선택하게 한다.
- attempt 기록: 새 attempt의 `runner/model/effort/claude_account`는 override
  반영값으로 스탬프되어 usage·영수증 계보가 실제 실행과 일치한다.

## §10 UI (rev2 정정 — 배너에서 held 타일로)

원안의 `bannersTemplate` 보류 배너는 2026-08-27 failed-tile-decision-surface와
2026-08-29 held-tile 설계로 표면이 바뀌어 더는 존재하지 않는다. 보류 attempt는
**held 타일 family**(`parked`·`retry_wait`·`waiting`)의 넷째 상태로 그린다.
슬롯은 2026-08-25 카드 헤더 문법 §5.1을 따른다.

- **lane-model** (`app/views/worker/lane-model.js`): `heldAttemptStates`가
  `status==='paused' ∧ cause?.startsWith('provider_outage:')`를 `run_state:
  'provider_hold'`로 판정한다(`HELD_STATUSES`의 status 집합이 아니라 leaf 판정 —
  사용자 `pause()`의 `paused`는 지금처럼 running/paused 루프에 남는다). 투영 필드
  `hold: { kind:'outage'|'usage_limit', detail, message, summary, resets_at,
  target:{model, account}, auto_resume:'pending'|'disarmed'|'refused:<reason>'|null,
  next_probe_at }`. 재료가 없는 필드는 그리지 않는다.
- **슬롯 1 정체성 — held 판정 뱃지**(`⏸ 세션 대기`·`↻ 재시도 대기`·`⛓ 선행 대기`
  옆, 배타): `⚠️ 공급자 장애 · 다음 프로브 HH:MM` / `⏳ 한도 대기 HH:MM ·
  <alias|email>` / `resets_at` 부재면 `⏳ 한도 대기 · 리셋 미상`. 자동 재개
  소진(§8.1 cap, §7.4 상한)이면 `· 수동 조치` 접미. 뱃지 클릭 = 팝오버(판정
  뱃지 규칙).
- **팝오버**(`failurePopoverTemplate`와 같은 틀): 첫 줄 `cause_detail.summary`,
  원문 `cause_detail.message`, 타깃(모델·계정), `resets_at`, 자동 재개 상태와
  거부 사유, `log_path`. "작업 실패 아님" 한 줄을 헤더에 고정한다.
- **슬롯 6 액션 foot**: `↻ 이어하기`(그대로) · `⋯ 다른 방법으로`(선택기 다이얼로그:
  러너·모델·계정·`새 세션으로` 체크 → §9 `exec_override`/`fresh_current`) ·
  `폐기`(2026-08-29 held 타일 폐기 계약 그대로). 원안의 `✕ 무시`와 F7의
  `dismissAttempt` 확장은 **철회**한다 — UI-rj02 정정으로 타일에서 처리 없는 `✕`가
  사라졌고, 보류를 치우는 행위는 `폐기`가 소유한다.
- **선택기**: 옵션은 큐 스냅샷에 이미 실리는 `runner_catalog`에서 — claude
  모델(opus, opus-4.8, opus-4.6, sonnet, haiku, fable)과 codex 러너 모델을 러너별
  그룹으로; (rev2) 계정은 스냅샷에 동승시키는 `account_catalog.claude[]`
  (`email, alias, status, windows`)에서, §8.3 창 조건 미달 행은 회색 + 이유 표시.
  기본 선택 = 원 attempt의 runner/model/account. 교차 런타임 또는 `새 세션으로`
  선택 시 "이전 세션 맥락을 요약 인계합니다" 안내 문구.
- **어휘** (`app/views/worker/failure-labels.js`): 기존 맵이 cause의 마지막 `:`
  세그먼트로 키를 찾으므로, `failureText()`에 `provider_outage:` 접두 인식을 먼저
  넣고 detail별 문장(`overloaded_529`: "Claude API 과부하(529)로 보류",
  `usage_limit`: "계정 사용 한도로 보류 — 리셋 HH:MM" 등)을 등록한다. (rev2)
  `session_hard_stop:failure` → "세션이 실패를 보고하고 종료",
  `session_hard_stop:environment` → "세션이 환경 오류를 보고하고 종료",
  `resume_failed:transcript_missing` → "이어하기 대상 세션 기록이 없음 — 새 세션으로
  대체". 미등록 detail은 기존 fallback(원문 표기) 규칙. hard-stop 실패 타일의
  팝오버 첫 줄은 `cause_detail.summary`(= 세션의 결과 줄)다 — UI-cut1 잔여의
  수용 기준.
- **설정 토글**(`app/views/settings-dialog/execution-pane.js` `실행 계정` 그룹):
  `한도 시 다른 계정으로 자동 이어하기` 체크 하나. 값은 큐 스냅샷의
  `provider_auto_switch`를 읽고, 변경은 `onAutomationToggle`과 같은 CAS 경로로
  §8.3의 ws 메시지를 보낸다. 워크스페이스 기본 계정 두 필드 아래에 둔다 —
  "어느 계정으로 돌리나" 옆이 "한도가 걸리면 다른 계정으로 넘어가나"의 자리다.
- **게이트 배지**: `provider_hold`가 서 있는 동안 Worker 헤더에
  `⚠️ <runner> 공급자 장애 — 신규 디스패치 보류, 다음 프로브 <t>`,
  `usage_limit`만이면 `⏳ <alias|email> 사용 한도 — 그 계정 디스패치 보류, 리셋 <t>`.
  hold 정보와 다음 프로브 시각은 큐 스냅샷에 동승시킨다.

## §11 알림 (`server/worker/notify.js`)

`TITLE` 맵과 메서드 추가, 기존 fire-and-forget 계약 유지 (2026-09-01 needs_human
알림과 같은 맵에 항목만 더한다):

- `providerHoldEntered` — 러너, kind, detail, 원문 요약, 보류된 bead, `usage_limit`
  이면 계정과 `resets_at`. 최초 감지 1회.
- `providerRecovered` — 러너, 보류 지속 시간, 자동 재개된 bead 목록 / 재개 거부 사유,
  (rev2) 계정 전환 재개면 `<from> → <to>`.
- `providerAutoResumeDisarmed` — cap 소진(§8.1) 또는 타이머 상한(§7.4)으로 수동
  조치가 필요한 bead. 계보당 1회.

## §12 reconcile 경로 수정

detached 정산 경로(`scheduler.js disposeDeadAttemptSettlement`)에서 PR 관찰 **전에**:

1. guard_kill 판정은 기존 순서 유지 (여전히 최우선).
2. 원 attempt의 세션 jsonl 꼬리 + stderr 사이드카(`session-log.js stderrPathOf`)를
   읽어 §3 분류기를 실행한다.
3. non-null이면 `holdAttempt` + `provider_hold` 설정으로 종결하고 verify를 건너뛴다.
4. null이면 기존대로 verify → `no_pr` 결말에 §4.2 hard-stop arm을 같은 순서로
   적용한 뒤 `session_ended_unresolved` / `verify_failed:*`.

이것이 UI-yrzu·UI-i60a 오분류의 직접 수정이다. jsonl이 유실된 attempt는 분류
불가로 기존 경로를 탄다 (fail-closed: 증거 없이 outage로 승격하지 않는다).

## §13 테스트와 수용 기준

- **분류기**: UI-yrzu 실물 result 이벤트 fixture로 `overloaded_529` 판정; 5xx/429
  변형; stderr-only 변형; guard-kill 우선순위. (rev2) UI-i60a 실물 fixture
  (`api_error_status:429` + session limit 문장)로 `usage_limit`·`scope:'account'`·
  `resets_at`(KST 18:00, `finished_at` 이후 첫 발생); `api_error_status` 부재 구
  형식; 429 + 일반 문장 → `rate_limited_429`; assistant 텍스트에만 "session limit"
  이 있는 transcript → null(오탐 방지); `resets Sep 3, 6pm` 날짜 형식; 파싱 실패
  → 카탈로그 창 fallback → null.
- **scheduler 라이브 경로**: fake 어댑터로 hold 라우팅, `haltAutoAdvance`·
  `settleFailureTier` 미호출, `queue.hold`/`lineages` 불변, disposition 쌍둥이 분기
  — outage 분류가 disposition 판정보다 먼저, lease 해제, 회복 시 수리 기계
  재디스패치(일반 resume 미사용). (rev2) `ENV_ERROR_PATTERNS.api`에서 공급자
  토큰 제거 뒤 전송 장애 문장은 여전히 `env`; hard-stop arm — `실패 ·`/`환경 ·`/
  `**실패 · …**` 첫 줄 → `session_hard_stop:*` + `cause_detail.summary`, 선행
  대기·parked 판정이 먼저 성립하면 진입하지 않음, 그 외 첫 줄은
  `session_ended_unresolved` 유지.
- **보류·회복 영속성**: hold 진입이 attempt patch+target 등록 단일 mutation인지,
  `cause_detail` 객체형(`message`·`summary`·`resets_at`)이 저장·재로드에
  보존되는지, 회복이 pending 영수증 선영속 후 소비인지, 재시작 시 남은 pending
  재개와 `generation` 불일치 폐기.
- **reconcile 경로**: jsonl fixture 재생 → `provider_outage:overloaded_529` +
  `paused`, `session_ended_unresolved` 미발생 (핵심 수용 기준). (rev2) UI-i60a
  fixture → `provider_outage:usage_limit` + `paused`.
- **게이트**: hold 중 claude 후보 skip·codex 후보 정상 디스패치, 재시작 후 hold
  존속·프로버 재가동, 수동 재개 예외. (rev2) `usage_limit` target은 같은 계정으로
  해석되는 후보만 skip(bead pin·workspace 기본값·active_key 세 경로), 다른 계정
  후보는 디스패치, 카탈로그 실패 시 skip; `account:null` target은 러너 전체 skip.
- **프로버**: fake timer 백오프 수열, target별 프로브(모델 CLI id·계정 라우팅),
  서로 다른 모델 2개 동시 hold에서 부분 회복 시 게이트 유지·전체 회복 시 개방,
  성공 판정식, 회복 시 target 제거+재개 패스+알림. (rev2) `usage_limit` 타이머
  `resets_at+60s`, 재한도 시 재무장·`rearm_count`, 3회/24h 상한 → disarm 알림,
  `resets_at` 부재 15분 간격, 프로브 529 → `outage`로 kind 재분류.
- **자동 재개**: cap 1 (마커 계보 판정), 재발 시 disarm, resume 거부 시 보류 유지,
  보류 중 preset 모델 변경에도 재개 argv 모델이 원 attempt와 동일(모델 고정).
  (rev2) `usage_limit` 진입 시 후보 계정 선택(창 조건·정렬·held 계정 제외·`5h`
  창 없는 행 제외) → 즉시 전환 재개 argv `cswap run <email> --share-history --
  claude … --resume <sid> --model <원 모델>`, 전환 attempt 스탬프
  (`claude_account`·`account_sources.claude:'outage_switch'`·
  `account_switched_from`), Bead metadata·kv 미기록, 전환 재개도 cap 소비, 후보
  없음 → 타이머 경로, `provider_auto_switch:false`면 후보가 있어도 타이머 경로,
  토글 ws 메시지의 CAS·readback·재시작 생존(load 시 값 유지, 부재 시 `true`).
- **exec_override**: 카탈로그 검증 거부, claude 모델 override argv
  (`--resume` + `--model claude-opus-4-8`), 교차 런타임 fresh_current 강제 + 인계
  블록 내용·4,000자 상한, 같은 러너 fresh_current 선택 시에도 인계 블록 주입,
  attempt 스탬프 일치. (rev2) `claude_account` override → cswap 래핑·해소 실패
  `exec_override_invalid`.
- **transcript 유실(rev2)**: 파일 부재 → fresh_current + 인계 블록 +
  `resume_fallback` 스탬프 + ws 응답 `fallback`; 런치 후 stderr 패턴 →
  `resume_failed:transcript_missing` + 1회 자동 fresh, 마커 있으면 실패 유지.
- **UI 투영**: `provider_hold` held 상태 판정(사용자 `paused`와 배타), 뱃지 3변형,
  팝오버 행(재료 없는 행 미생성), foot 버튼 3종, 선택기 옵션 = `runner_catalog` +
  `account_catalog`(창 미달 회색), 어휘 매핑(hard-stop 2종·transcript 유실 포함),
  게이트 배지 2변형. `paused + provider_outage:*`의 `dismissAttempt`는 여전히
  `not_dismissable`(F7 철회 확인).

## §14 구현 unit 후보 (advisory)

1. `classifier`: server/worker/runner/provider-outage.js(신규)+server/worker/runner/claude.js+server/worker/runner/index.js+server/worker/failure-class.js(§4.1 패턴 이관·§4.2 hard-stop cause)
2. `hold-gate-probe`: server/worker/scheduler.js+server/worker/queue-store.js+server/worker/provider-health.js(신규)+server/worker/notify.js+server/worker/attach.js+server/worker/account-catalog.js+server/worker/bead-timeline.js
3. `resume-override`: app/protocol.js+server/ws/worker-handlers.js+server/worker/attach.js+server/worker/scheduler.js(§9 override·§9.4 transcript 유실·§8.3 계정 전환 재개)
4. `view`: app/views/worker/lane-model.js+app/views/worker/running-grid.js+app/views/worker/index.js+app/views/worker/failure-labels.js+app/views/settings-dialog/execution-pane.js+app/styles.css

## §15 경계·후속

앵커 `c4dc35de` 이후 착지한 스펙 중 이 스펙의 `scope` 접두와 겹치는 것들의 관계:

- **2026-08-28 worker-failure-tiers-queue-hold** (`server/worker/`,
  `app/views/worker/`): 같은 `is_error` 문장을 두 판정기가 다른 결말로 잡던 충돌을
  §4.1이 해소한다 — 공급자 토큰은 이 스펙의 분류기로 이관되고 그 스펙 §3.3 표의
  `api` 그룹 행은 전송 장애 토큰만 남는다(그 스펙 본문은 착지 기록이라 고치지
  않고, 정정은 `ENV_ERROR_PATTERNS` 헤더 주석에 이 스펙 §4.1을 인용해 남긴다).
  `queue.hold`/`lineages`/`retry_wait`는 건드리지 않고 `provider_hold`와
  독립이다(§6). ADR 0016과 정합.
- **2026-08-28 worker-prerequisite-wait-tier**·**UI-8kvi**: `대기 ·` 결말은 그
  계층이 먼저 잡고(§4.2 진입 조건), 이 스펙은 그 뒤의 `no_pr` 결말만 다룬다.
- **2026-08-27 failed-tile-decision-surface**·**2026-08-29 worker-held-tile-discard**
  ·**2026-08-25 card-header-grammar-unify**·**2026-08-28 chip-grammar-unify**: §10이
  그 표면(held 타일·판정 뱃지·팝오버·`폐기`)과 슬롯 표를 그대로 소비한다. 원안의
  배너와 `✕ 무시`는 철회.
- **2026-08-23 per-issue-exec-account**·**2026-08-25 workspace-exec-account-default**
  (`server/worker/`, `app/protocol.js`): 계정 해석 경로(bead pin → workspace 기본값
  → 활성 로그인)와 `cswap run --share-history` 래핑을 §6·§8.3·§9.2가 재사용한다.
  두 스펙의 metadata·kv 키에는 쓰지 않는다.
- **2026-08-22 multi-account-usage-card**: 계정 행·창(`windows[].resetsAt`)의
  소스(`claude-usage.js listAccounts()`)를 `accountCatalog` 경유로 읽는다(§3.3·§8.3).
  라우트·캐시 규칙 불변.
- **2026-08-25 session-ref-transcript**·**2026-08-29 review-session-lifecycle**:
  "이 기계에 transcript가 있는가" 판정(`resolveSessionFile`)을 §9.4가 재사용한다.
- **2026-08-27 awaiting-user-key-consumption**(ADR 0017): `파킹 ·` 결말은 그
  판정이 소유한다(§4.2 진입 조건).
- **2026-09-01 needs-human-notify-reentry**(ADR 0022): `notify.js TITLE` 맵을
  공유한다(§11 항목 추가만). needs_human 재진입 두 클릭 규칙과 무관 — 보류는
  needs_human이 아니다.
- **2026-08-25 background-subagent-delegation-close**·**2026-08-24
  needs-human-auto-resolution**·**2026-08-27 completion-repair-lane-removal**:
  disposition attempt의 lease·재디스패치 기계(§4.1)를 그대로 쓴다.
- 그 밖의 겹침(2026-08-19 impl-review-ancestry-verify, worker-quickfix-lane,
  08-20 resolver-self-review-binding, 08-21 ui-bu6d-receipt-check, 08-24
  monitor-scope-overlap-chips·quickfix-description-scope·spec-evidence-consumer,
  08-25 guard-hook-artifact-publication-exemption·monitor-stored-cross-lanes·
  session-preferred-chip-consumer·ui-r7or-quick-fix-handoff-projection·
  ws-snapshot-retention, 08-26 external-conflict-session-fork·
  guard-one-shot-hooks-relocation·lane-agnostic-dependency-chips·
  monitor-cross-lane-run-axis·worker-blocked-chip-open, 08-27
  detail-panel-dependency-editor·head-review-layer-removal·lane-model-unify·
  merge-queue-resolution-budget·pr-wait-external-row-consistency·
  ui-sbum-rec-complex-chip·worker-candidate-sort-chain-release-chips·
  worker-monitor-lane-surface-unify·worker-repo-ops-cleanup-deploy-button, 08-28
  auto-review-dispatch-on-hold·blocked-bead-spec-authoring-allowed·
  candidate-lane-dependency-adjacency·quickfix-settlement-resume-by-reason·
  worker-direction-inquiry-session-trigger·worker-record-timeline-retention,
  08-29 exec-receipt-merge-gate-consumer·merge-queue-self-notify-redrain-loop·
  queue-transfer-suffix-invariant·quickfix-no-delta-close-settlement·
  session-queue-place-entrypoint·worker-retry-lineage-off-lane, 08-31
  review-gate-speed, 09-01 post-merge-job-runner·sweep-carryover-conversion)은
  디렉터리 접두만 공유하고 함수·필드가 겹치지 않는다. 진행 중(in_flight) Bead와의
  겹침은 없다(`stale-rereview-inputs.py` 2026-09-02).
- **흡수·이관**: UI-efkj(API 오류 분류·알림·1회 자동 재시도)는 이 스펙이 상위
  집합으로 덮는다(2026-08-25 사용자 결정). UI-cut1 범위 3(blocked bead의
  `pr_missing` 강등 방지)은 §4.2로 흡수됐고, cut1 자체는 UI-8kvi로 닫혔다.
- **잔여 관찰**: codex 러너의 한도·장애 패턴(훅은 null); 창 소진 전 선제 전환;
  `terminal_reason` 어휘의 공식 문서화 확인; `cswap run --share-history`가 기본
  프로필(`~/.claude`)의 transcript를 프로필 쪽에서 보이게 하는지의 실기 확인은
  §8.3대로 구현 보고서 항목이다.

## 결정 (ADR 후보)

- **공급자 장애·계정 한도는 작업 실패가 아니라 보류이며, 실패 사다리를 타지
  않는다.** 되돌리기 어려움: 성립 — cause 어휘(`provider_outage:*`)·`paused`
  재사용·`provider_hold` 영속 필드가 큐 저장소와 timeline에 남고, 실패 2계층의
  `api` 패턴 그룹에서 토큰을 빼는 변경은 두 판정기의 소유권 경계다. 맥락 없이
  놀라움: 성립 — `paused`인데 사용자가 누른 적이 없고, 429/529로 죽었는데 실패
  타일에 없다. 실제 트레이드오프: 성립 — 대안은 실패 2계층의 `env` 사다리
  (2/5/15분 맹목 재시도 → systemic 정지)였고, 대형 `--resume` 요청의 반복 셰딩
  (§1)과 리셋 전 무의미한 재시도 때문에 기각했다.
  `summary`: 공급자 장애(529·5xx·429)와 계정 사용 한도는 `provider_outage:*`
  cause의 `paused` 보류로 정산하고 러너·타깃 단위 `provider_hold` 게이트로
  신규 디스패치만 막으며, 실패 2계층의 env 사다리와 큐 정지에는 들어가지 않는다.
- **계정 전환은 자동(토글로 끌 수 있음), 모델·런타임 전환은 수동.** 되돌리기
  어려움: 불성립 — `provider_auto_switch` 토글 하나로 타이머 경로만 남는다. 맥락 없이 놀라움: 성립.
  실제 트레이드오프: 성립(리셋 대기 시간 vs 다른 계정의 창 소모). 한 조건이
  불성립이므로 스펙 본문에 남긴다.
- **재개는 같은 transcript 잇기가 기본이고 fresh는 유실 증명 뒤의 대체다.**
  되돌리기 어려움: 불성립 — 런치 전 확인 한 지점의 규칙이다. 맥락 없이 놀라움:
  불성립 — `--resume` 기계가 이미 기본이다. 실제 트레이드오프: 성립. 스펙
  본문에 남긴다.
