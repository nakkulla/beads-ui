---
scope:
  - server/worker/
  - server/ws/worker-handlers.js
  - app/protocol.js
  - app/views/worker/
  - app/utils/transcript-lines.js
  - app/styles.css
---

# Worker 공급자 장애(provider_outage) 보류·자동 재개·모델 전환 재개 설계

- Bead: UI-jr8v (discovered-from UI-yrzu)
- 날짜: 2026-08-24
- 상태: 설계 확정 대기 (spec 리뷰 전)

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
2. **reconcile 경로** — 서버 재시작 후 detached 세션 정산(`scheduler.js` ~4040행)은
   세션 로그를 읽지 않고 곧장 GitHub PR 관찰로 가서, PR이 없으니
   `verify_failed:pr_missing`이 된다. UI-yrzu는 이 경로였다.

두 경로 모두 공급자 장애를 "작업 실패"로 오분류한다. `verify.js`에는 이미 "gh 관찰
장애를 `pr_missing`으로 강등하지 않는다"는 fail-closed 원칙이 명문화되어 있다. 이
설계는 같은 원칙을 실행 공급자(Claude API)로 확장한다: **공급자 장애 ≠ 작업 실패.**

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

## §2 목표와 비목표

목표:

1. 공급자 장애를 전용 cause 클래스 `provider_outage:<detail>`로 분류한다 (라이브 +
   reconcile 두 경로 모두).
2. 해당 attempt를 실패가 아닌 **보류**(기존 `paused` 상태 재사용)로 라우팅하고, 같은
   러너의 신규 디스패치를 함께 게이트한다.
3. 실경로 저가 ping 헬스 프로버로 회복을 감지해 게이트를 풀고, 계보당 1회 자동
   재개한다.
4. 수동 이어하기에 `exec_override`(runner/model/effort)를 추가한다 — claude→claude는
   `--resume` 유지 + 카탈로그 모델(opus-4.8/opus-4.6 포함), 교차 런타임
   (claude→codex 등)은 fresh 세션 + 이전 세션 맥락 인계.
5. 보류/회복/자동 재개 소진을 구분된 배너와 Discord 알림으로 보인다.

비목표:

- codex(OpenAI) 쪽 장애 **패턴 구현**. 분류 계층은 러너-일반 훅으로 설계하되, 이번
  라운드에서 codex 어댑터의 훅은 null을 반환한다 (사용자 결정 2026-08-24: 일반 계층
  + Claude 우선).
- status.claude.com 참조. 사용자 관측(2026-08-24)상 status 페이지는 실제 API 상태와
  양방향으로 어긋난다 (outage 표시 중에도 API 동작). 프로브는 실경로 ping 단독.
- 자동 모델/런타임 전환. 장애를 이유로 공급자·모델을 몰래 바꾸지 않는다. 전환은
  수동 선택만 (사용자 결정 2026-08-24).
- 구독 usage-limit 도달 메시지의 분류. `API Error: <code>` 형태가 아닌 사용량 한도
  메시지는 회복 시각·의미가 달라 이번 범위에서 제외한다 (잔여 항목).

## §3 분류 계층 — 러너-일반 훅

`AdapterSpec`(`server/worker/runner/index.js`)에 선택 훅을 추가한다:

```js
classifyProviderOutage(ctx: { raw: any[], stderr_tail: string|null })
  → { detail: string, message: string } | null
```

- **claude 구현** (`server/worker/runner/claude.js` 또는 신규
  `server/worker/runner/provider-outage.js`): 판정 소스는 두 개, 순서대로:
  1. 마지막 `result` 이벤트가 `is_error === true`이고 `result` 문자열이 아래 패턴에
     걸리면 매칭.
  2. `result` 이벤트가 아예 없으면(`no_result`) `stderr_tail`에 같은 패턴을 적용.
- 패턴 → detail 매핑 (첫 매칭 승):
  - `/\bAPI Error: 529\b/` 또는 `/\boverloaded\b/i` → `overloaded_529`
  - `/\bAPI Error: (5\d\d)\b/` → `http_<code>` (예: `http_500`)
  - `/\bAPI Error: 429\b/` → `rate_limited_429`
- `message`는 매칭된 원문 라인을 `errorDetail()` 상한(512자)으로 잘라 담는다.
  영속은 문자열이 아니라 **객체형** `cause_detail: { kind: 'provider_outage',
  message }`로 한다 — 현행 `makeAttempt()` 정규화는 객체만 보존하고 문자열을
  null로 버리므로, 문자열 union을 새로 여는 대신 기존 객체 스키마에 맞춘다. 저장 후
  재로드까지 보존되는지 검증한다 (codex spec 리뷰 F5).
- **codex 구현**: 이번 라운드는 항상 null (훅 자리만 확보).
- **우선순위**: `verdict.blocked`(guard kill)가 항상 이긴다. 정책이 프로세스를 죽인
  attempt는 꼬리에 outage 신호가 있어도 `loud_fail_blocker`를 유지한다 — 종료 원인이
  API가 아니라 정책이기 때문이다.

cause 표기는 `provider_outage:<detail>` (예: `provider_outage:overloaded_529`).

## §4 라이브 경로 배선 (`onSessionDone`)

`scheduler.js`의 `!verdict.success` 분기(~3033행, disposition 쌍둥이 ~3442행 포함)를
3-arm으로 확장한다:

1. `verdict.blocked` → 기존 `loud_fail_blocker` (`failAttempt`).
2. 어댑터 `classifyProviderOutage(ctx)`가 non-null → **`holdAttempt`** (§5) +
   `provider_hold` 설정 (§6). `failAttempt`를 타지 않는다.
3. 그 외 → 기존 `session_failed:<reason>` (`failAttempt`).

disposition attempt(수리 세션 등)도 같은 분류를 적용하되, **outage 분류는
disposition 완료/재시도 판정보다 먼저** 적용한다. 공급자 장애로 죽은 수리 세션 역시
작업 실패가 아니다. 단 disposition attempt는 일반 `resume()` 자동 재개 대상이
아니다: 보류 시 disposition lease를 해제하고, 회복 시 기존 수리 디스패치 기계(원
프롬프트·cwd·`repair_operation_id`·lease 획득을 소유)를 통해 재디스패치한다 — 일반
resume은 disposition 전용 필드를 승계하지 못해 일반 구현 attempt로 오분류되기
때문이다 (codex spec 리뷰 F2). 게이트·프로버(§6·§7)는 동일하게 공유한다.

## §5 보류 표현 — `paused` 재사용 (접근 A, 승인 2026-08-24)

새 상태값을 만들지 않는다. attempt 상태 어휘
(`running/done/failed/orphaned/paused/stopped`) 중 `paused`는 유일한 비종결 보류
상태이고, `resume()` 가드가 이미 `{failed, orphaned, paused}`를 허용한다.

새 scheduler 함수 `holdAttempt(workspace, attempt_id, bead_id, prior, outage)`:

- attempt patch(`status:'paused'`, `cause:'provider_outage:<detail>'`,
  `cause_detail: { kind:'provider_outage', message }`, `finished_at: now()`,
  usagePatch)와 §6의 `provider_hold` target 등록을 **하나의 영속 mutation**으로
  수행한다 — 분리 쓰기 사이에 재시작이 끼면 보류된 attempt만 남고 게이트·프로버가
  유실된다 (codex spec 리뷰 F4).
- `failAttempt`와 동일하게 workflow_mode/exec 스탬프를 되돌린다 (재개 시 새 attempt가
  재스탬프).
- **`haltAutoAdvanceForAttempt`를 호출하지 않는다.** 워크스페이스 auto-advance는
  유지되고, 대신 §6의 러너 단위 게이트가 해당 러너 디스패치만 막는다. codex attempt는
  계속 흐른다.
- 사용자 수동 일시정지와의 구분: `pause()`는 `cause:null`을 명시적으로 쓰므로
  `status==='paused' && cause?.startsWith('provider_outage:')`가 판별식이다.

기존 배너 수명 규칙(supersede / dismiss / 후속 done)은 그대로 상속한다 — 보류
attempt도 `attempts{}`에 남는 기록이라는 점은 실패와 같다.

## §6 러너 단위 디스패치 게이트 `provider_hold`

큐 저장소(`queue-store.js`)에 영속 top-level 필드를 추가한다:

```js
provider_hold: {
  [runner]: {
    since: number,
    generation: number,            // 회복 세대 — §8 재개 영수증이 참조
    targets: Array<{ model: string, account: string|null,
                     detail: string, last_error: string }>
  }
}
```

`targets`는 장애를 관측한 (모델, 계정 라우팅) 조합의 **목록**이다. 단일 model
필드는 서로 다른 모델로 돌던 attempt들의 장애가 마지막 쓰기로 덮이고, account
pin(cswap)을 쓴 attempt의 장애를 기본 계정 프로브 성공이 잘못 해제할 수 있다
(codex spec 리뷰 F3). 같은 (model, account) 조합은 한 항목으로 병합한다.

- 쓰기: `holdAttempt`의 단일 mutation(§5)이 target을 등록한다. 회복 해제는 §7
  프로브가 target 단위로 수행하고, `targets`가 비면 runner 항목 자체를 지운다.
- 디스패치 게이트: `tick()`의 launch 경로에서 `resolveDispatchSettings`가 준
  `runner`에 대해 `provider_hold[runner]`가 서 있으면 그 후보를 큐에 남겨두고
  건너뛴다 (slots 포화와 같은 모양새 — 실패도 소비도 아님). 신규 디스패치 게이트는
  사용자 결정 2026-08-24.
- **재시작 생존**: `auto_advance`와 달리 load 시 초기화하지 않는다. 재시작 후에도
  hold가 서 있으면 프로버(§7)를 재가동한다.
- 수동 재개(§9)는 게이트의 예외다: 사용자가 명시적으로 누른 이어하기는
  `provider_hold` 중에도 launch를 허용한다 (사용자가 회복을 직접 확인한 경우,
  그리고 codex 등 다른 러너로의 전환 재개가 이에 해당).

## §7 헬스 프로버 — 실경로 저가 ping

신규 모듈 `server/worker/provider-health.js`.

- **가동 조건**: `provider_hold[runner]`가 존재하는 동안만. 설정 시 시작, load 시
  hold가 있으면 재가동, clear 시 정지. ws 클라이언트 유무와 무관하게 돈다 —
  `createPoller`의 `getClientCount` 게이트는 쓰지 않는다 (무인 Worker가 주 소비자).
- **프로브 사양 (claude)**: `provider_hold[runner].targets`의 **각 target을 따로**
  찌른다 — 러너 어댑터와 같은 바이너리·계정 라우팅(cswap 경로 포함) 해석으로
  `claude -p "ok" --model <그 target의 카탈로그 CLI 모델 id> --output-format json`,
  타임아웃 120초. **장애를 겪은 그 모델·그 계정 경로로 찌른다** — 529는 모델·요청
  클래스별로 부분 셰딩될 수 있고(§1 재개 루프 증거), 다른 모델·다른 계정의 통과는
  회복 증거가 되지 못한다 (codex spec 리뷰 F3). 성공 = exit 0 ∧ 출력 파싱 가능 ∧
  `is_error === false`. 그 외(비정상 종료, 파싱 실패, is_error, 타임아웃)는 그
  target 실패로 계속 보류.
- **한계 명시**: 소형 프로브 통과가 누적 컨텍스트를 통째로 싣는 대형 재개 요청의
  통과를 보증하지 않는다. 프로브 통과 후 자동 재개가 다시 provider_outage로 죽는
  경우는 §8의 재보류 + cap 판정이 처리한다.
- **백오프**: 60초 → 2분 → 4분 → 8분 → 15분(상한 고정), 회복까지 무제한.
- **회복 시 (target 단위, 재시작 안전 순서 — codex spec 리뷰 F4)**: 성공한
  target에 대해 (1) 그 target(모델·계정이 일치하는 attempt가 그 target에 묶인다)에
  묶인 보류 attempt 중 **§8 cap 판정을 통과한 것만** 자동 재개 영수증
  (`auto_resume_pending`, 현재 `generation` 포함, §8)을 target 제거와 **같은 영속
  mutation으로 먼저** 기록하고 (마지막 target 제거 = runner hold 제거 = 게이트
  개방), (2) 그 다음 pending을 소비하며 자동 재개를 실행한다. 재시작이 어느 지점에
  끼어도 pending 영수증이 남아 재개가 유실되지 않으며, load 시 남은 pending을
  재개하고 `generation` 불일치 pending은 폐기한다. 이후
  `notifyLifecycle('providerRecovered', …)` → `tick()`.

프로브 실패/성공 판정은 세션 spawn 인프라를 재사용하되 attempt를 만들지 않는 별도
경량 spawn이다 (큐 기록·워크트리·가드 훅 없음).

## §8 자동 재개 — 계보당 1회 (사용자 결정 2026-08-24)

회복 감지 시, `status==='paused' ∧ cause=provider_outage:*`이고 superseded/dismissed/
discard-중이 아닌 attempt마다:

- **cap 판정**: 자동 재개로 태어난 attempt에는 `auto_resume_kind:'provider_outage'`
  마커를 스탬프한다. 대상 attempt 자신 또는 `resumed_from` 체인의 조상에 이 마커가
  있으면 **자동 재개하지 않는다** — 보류는 유지하고
  `notifyLifecycle('providerAutoResumeDisarmed', …)` 1회 + 배너에서 수동 조치 대기.
  attempt를 `failed`로 위장 전환하지 않는다 (작업 실패가 아니라는 의미 보존).
- **재개 실행은 §7이 영속화한 `auto_resume_pending` 영수증 소비로만** 일어난다
  (재시작 안전성 — codex spec 리뷰 F4). cap 이내면
  `resume(workspace, attempt_id, { continuation: 'auto' })` 호출 — `session_id`가
  있으므로 `--resume <sid>`로 이어지는 새 attempt가 `resumed_from`을 달고 태어난다
  (기존 기계 그대로; 조상은 `already_resumed`로 영구 소진되는 기존 규칙 유지).
- **모델 고정 (codex spec 리뷰 F1)**: 자동 재개는 원 attempt의
  `runner/model/effort`(및 account 라우팅)를 그대로 고정해 launch한다 —
  `resolveContinuationForAttempt`의 현재-preset 재도출을 따르지 않는다. 보류 중
  preset이 바뀌어도 자동 경로에서 모델이 바뀌면 "자동 모델 전환 금지"(§2) 위반이다.
  모델 변경은 §9의 수동 `exec_override`로만 가능하다.
- **disposition attempt 제외**: §4대로 일반 resume이 아니라 수리 디스패치 기계로
  재디스패치한다 (lease·전용 필드 승계 — codex spec 리뷰 F2).
- resume이 거부되면(`worktree_missing` 등) 보류를 유지하고 거부 사유를 알림에 싣는다.
- 자동 재개된 attempt가 다시 provider_outage로 죽으면 §4→§5로 재보류되고, 위 cap
  판정이 다음 회복 때 자동 재개를 막는다.

## §9 수동 이어하기 `exec_override` — 모델·런타임 전환 재개

2026-08-19 resume-user-instructions 설계와 같은 접촉면(`app/protocol.js` →
`server/ws/worker-handlers.js` `handleWorkerAttemptResume` → `attach.js`
`resumeWorkerAttempt` → `scheduler.js` `resume`)에 선택 파라미터를 추가한다:

```js
exec_override?: { runner?: string, model?: string, effort?: string }
```

- **검증**: ws 계층에서 `runtimeCatalog()` 대조 — override 적용 후 **완성된
  runner/model/effort 조합**을 검증한다: runner가 카탈로그에 있고, model이 그
  러너의 models에 있고, effort가 그 모델(또는 러너)의 effort 어휘에 있어야 한다.
  하나라도 불합격이면 전체를 거부 사유 `exec_override_invalid`로 거부한다
  (fail-closed, 부분 적용 없음 — codex spec 리뷰 F6).
- **적용 범위**: 이번 재개 attempt 한정. Bead metadata·exec preset에 쓰지 않는다.
  `resolveContinuationForAttempt`가 preset에서 도출한 launch 설정 위에 override를
  덮는다.
- **같은 러너 (claude→claude)**: continuation 판정은 기존 그대로(`--resume <sid>`
  유지), argv의 `--model`만 카탈로그 id로 바뀐다 — `opus-4.8→claude-opus-4-8`,
  `opus-4.6→claude-opus-4-6` (카탈로그 기존 등재 확인됨). 세션 계보·컨텍스트는
  유지된다.
- **교차 런타임 (claude→codex, 일반화하면 러너가 다른 모든 재개)**: 세션 resume이
  불가능하므로 continuation을 `fresh_current`로 강제하고 **맥락 인계 블록**을
  instructions 채널에 주입한다:
  1. 헤더: 이 세션은 공급자 장애로 중단된 `<runner>` 세션의 연속이며, 같은
     워크트리에 부분 작업이 남아 있다는 선언.
  2. 진행 요약: 원 attempt의 세션 jsonl에서 `createTranscriptReducer`
     (`app/utils/transcript-lines.js`)로 최근 assistant 텍스트를 추출해 총 4,000자
     상한으로 담는다 (읽기는 `session-log.js` 스냅샷 경로 재사용).
  3. 지시: `git status`/`git diff`로 워크트리 실상태를 먼저 확인하고 이어서 진행.
  - completion 계보 키(`completion_root_id`/`completion_op_id`)는
    2026-08-11-completion-resume-lineage-recovery 설계의 승계 규칙을 그대로 따른다.
- **같은 러너의 "새 세션으로 이어하기"**: 러너를 바꾸지 않아도 사용자는
  `continuation:'fresh_current'`를 선택할 수 있고(기존 continuation 어휘 재사용),
  provider_outage 보류/실패 attempt의 fresh_current 재개에는 교차 런타임과 동일한
  맥락 인계 블록을 주입한다. `--resume` 재생 요청 자체가 반복 셰딩되거나 누적
  컨텍스트가 과대해 재개가 계속 죽는 UI-yrzu형 상황(§1)의 탈출구다.
- 수동 이어하기는 §6 게이트의 예외로 launch가 허용된다. 단 hold가 서 있는 동안의
  이어하기 UI에는 게이트 배지(§10)로 장애 진행 중임이 함께 보인다 — 반복 클릭이
  attempt 기록만 쌓는 상황을 사용자가 인지한 채 선택하게 한다.
- attempt 기록: 새 attempt의 `runner/model/effort`는 override 반영값으로 스탬프되어
  usage·영수증 계보가 실제 실행과 일치한다.

## §10 UI

- **배너 변형** (`app/views/worker/running-grid.js` `bannersTemplate`):
  `status==='paused' ∧ cause=provider_outage:*`는 ⛔ 실패 배너 대신 ⚠️ 보류 배너 —
  `⚠️ {repo} 공급자 장애로 보류 — 작업 실패 아님`, `cause_detail`(API 에러 원문)
  표시. 액션: `↻ 이어하기`(그대로), `모델 선택해서 이어하기`(선택기 + 확인),
  `새 세션으로 이어하기`(fresh_current + 요약 인계, §9), 폐기, ✕ 무시. 자동 재개
  소진(§8 계보 cap 판정 — 계보별 상태이지 runner 수준 플래그가 아니다) 시 "자동
  재개 소진 — 수동 조치 필요" 한 줄 추가. 배너의 에러 원문은
  `cause_detail.message`(§3 객체형)를 읽는다.
- **✕ 무시 허용 범위**: 현행 `dismissAttempt()`는 `failed`/`orphaned`만 허용해
  `paused + provider_outage:*`를 `not_dismissable`로 거부한다. dismiss 허용 범위를
  provider_outage 보류 attempt에 한해 확장한다 (codex spec 리뷰 F7).
- **모델/런타임 선택기**: 옵션은 큐 스냅샷에 이미 실리는 `runner_catalog`에서 —
  claude 모델(opus, opus-4.8, opus-4.6, sonnet, haiku, fable)과 codex 러너 모델을
  러너별 그룹으로. 기본 선택 = 원 attempt의 runner/model. 교차 런타임 선택 시 "이전
  세션 맥락을 요약 인계합니다" 안내 문구.
- **어휘** (`app/views/worker/failure-labels.js`): 기존 맵이 cause의 마지막 `:`
  세그먼트로 키를 찾으므로, `failureText()`에 `provider_outage:` 접두 인식을 먼저
  넣고 detail별 문장(`overloaded_529`: "Claude API 과부하(529)로 중단" 등)을
  등록한다. 미등록 detail은 기존 fallback(원문 표기) 규칙.
- **게이트 배지**: `provider_hold`가 서 있는 동안 Worker 헤더에
  `⚠️ <runner> 공급자 장애 — 신규 디스패치 보류, 다음 프로브 <t>` 배지. hold 정보와
  다음 프로브 시각은 큐 스냅샷에 동승시킨다.

## §11 알림 (`server/worker/notify.js`)

`TITLE` 맵과 메서드 3종 추가, 기존 fire-and-forget 계약 유지:

- `providerHoldEntered` — 러너, detail, 원문 요약, 보류된 bead. 최초 감지 1회.
- `providerRecovered` — 러너, 보류 지속 시간, 자동 재개된 bead 목록 / 재개 거부 사유.
- `providerAutoResumeDisarmed` — cap 소진으로 수동 조치가 필요한 bead. 계보당 1회.

## §12 reconcile 경로 수정

detached 정산 경로(`scheduler.js` ~4040행)에서 PR 관찰 **전에**:

1. guard_kill 판정은 기존 순서 유지 (여전히 최우선).
2. 원 attempt의 세션 jsonl 꼬리 + stderr 사이드카를 읽어 §3 분류기를 실행한다.
3. non-null이면 `holdAttempt` + `provider_hold` 설정으로 종결하고 verify를 건너뛴다.
4. null이면 기존대로 verify → `verify_failed:*`.

이것이 UI-yrzu 오분류(`verify_failed:pr_missing`)의 직접 수정이다. jsonl이 유실된
attempt는 분류 불가로 기존 경로를 탄다 (fail-closed: 증거 없이 outage로 승격하지
않는다).

## §13 테스트와 수용 기준

- **분류기**: UI-yrzu 실물 result 이벤트 fixture로 `overloaded_529` 판정; 5xx/429
  변형; stderr-only 변형; usage-limit 문구 제외; guard-kill 우선순위.
- **scheduler 라이브 경로**: fake 어댑터로 hold 라우팅, `haltAutoAdvance` 미호출,
  disposition 쌍둥이 분기 — outage 분류가 disposition 판정보다 먼저, lease 해제,
  회복 시 수리 기계 재디스패치(일반 resume 미사용).
- **보류·회복 영속성**: hold 진입이 attempt patch+target 등록 단일 mutation인지,
  `cause_detail` 객체형이 저장·재로드에 보존되는지, 회복이 pending 영수증 선영속 후
  소비인지, 재시작 시 남은 pending 재개와 `generation` 불일치 폐기.
- **reconcile 경로**: jsonl fixture 재생 → `provider_outage:overloaded_529` +
  `paused`, `pr_missing` 미발생 (핵심 수용 기준).
- **게이트**: hold 중 claude 후보 skip·codex 후보 정상 디스패치, 재시작 후 hold
  존속·프로버 재가동, 수동 재개 예외.
- **프로버**: fake timer 백오프 수열, target별 프로브(모델 CLI id·계정 라우팅),
  서로 다른 모델 2개 동시 hold에서 부분 회복 시 게이트 유지·전체 회복 시 개방,
  성공 판정식, 회복 시 target 제거+재개 패스+알림.
- **자동 재개**: cap 1 (마커 계보 판정), 재발 시 disarm, resume 거부 시 보류 유지,
  보류 중 preset 모델 변경에도 재개 argv 모델이 원 attempt와 동일(모델 고정).
- **exec_override**: 카탈로그 검증 거부, claude 모델 override argv
  (`--resume` + `--model claude-opus-4-8`), 교차 런타임 fresh_current 강제 + 인계
  블록 내용·4,000자 상한, 같은 러너 fresh_current 선택 시에도 인계 블록 주입,
  attempt 스탬프 일치.
- **UI 투영**: 보류 배너 변형(`cause_detail.message` 렌더), 선택기 옵션 =
  runner_catalog, 어휘 매핑, 게이트 배지, `paused + provider_outage:*` dismiss 허용
  (그 외 paused는 여전히 `not_dismissable`).

## §14 구현 unit 후보 (advisory)

1. `classifier`: server/worker/runner/provider-outage.js(신규)+server/worker/runner/claude.js+server/worker/runner/index.js
2. `hold-gate-probe`: server/worker/scheduler.js+server/worker/queue-store.js+server/worker/provider-health.js(신규)+server/worker/notify.js+server/worker/attach.js
3. `resume-override`: app/protocol.js+server/ws/worker-handlers.js+server/worker/attach.js+server/worker/scheduler.js
4. `view`: app/views/worker/running-grid.js+app/views/worker/index.js+app/views/worker/failure-labels.js+app/styles.css
