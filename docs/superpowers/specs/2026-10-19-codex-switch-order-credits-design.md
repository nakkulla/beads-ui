---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/routes/codex-usage.js
  - server/routes/
  - server/app.js
  - server/worker/notify.js
  - server/worker/codex-account-home.js
  - server/ws/worker-handlers.js
  - app/views/settings-dialog/execution-pane.js
  - app/views/settings-dialog/bulk-pane.js
  - app/views/settings-dialog/bulk-observation.js
  - app/views/monitor/bulk-account-apply.js
  - docs/adr/
---

# Codex 자동 전환 후보: 사용자 순서·크레딧 허용·하루 상한과 후보 조회 API (UI-9y1k)

## 1. 배경

dotfiles-8okoi spec(dotfiles `docs/superpowers/specs/2026-10-19-codex-account-limit-switch-design.md`,
2026-10-19 사용자 승인)은 Claude 세션의 Codex 실행(리뷰·advise consult, Codex 구현 리프)이 계정 한도로
끝나면 beads-ui가 고른 다음 계정의 `CODEX_HOME` 미러로 이어 가게 했다. 그 선택 규칙과 설정 화면은 이
저장소가 소유한다. 이 spec은 그 형제 unit이다.

사용자 결정(2026-10-19, Hermes Telegram 중계):
- 한도가 찼어도 크레딧이 남은 계정을 후보에 넣는다. 켜기·끄기와 상한은 beads-ui 설정 화면에서 바꾼다.
- 자동 전환 계정의 순서는 beads-ui에서 정한다.
- 아래 세 갈림(설정 범위, 알림 채널, 순서와 기존 부하 순 규칙)은 controller 추천안으로 정한다("추천대로").

2026-10-19 실측: 03(Plus) 계정이 주간 100%에서 `codex exec` 한 줄 실행에 성공했고 크레딧이
62500 → 62499.989503으로 자동 차감됐다. 크레딧은 별도 설정 없이 한도 뒤 자동으로 쓰이므로, 크레딧 사용을
막는 길은 그 계정을 후보에서 빼는 것뿐이다.

## 2. 검증된 전제

기준 커밋: `24347712bb1a97cc5fa4feb4f2255b49f1c2248c`.

- 정책은 워크스페이스 `queue.json`의 runner별 `{mode, accounts[], preempt_pct}`이고 기본은 `{switch, [], null}`이다 — server/worker/queue-store.js:826-830, :4908-4910
- 설정 화면 실행 탭이 워크스페이스의 실행 계정과 한도 정책(허용 계정 체크박스·preempt)을 편집한다 — app/views/settings-dialog/execution-pane.js:12, :1202-1221, :1284-1338, :2146-2221
- 모니터 탭 ⚙의 여러 저장소 설정 `계정` 탭이 실행 계정과 runner별 한도 정책(mode·accounts·preempt_pct)을 고른 저장소들에 통째로 적용하고, 허용 목록은 상자에 보이는 집합 그대로 넘긴다 — app/views/settings-dialog/bulk-pane.js:1-25, :151-187, :407-408; app/views/monitor/bulk-account-apply.js:1-12, :26-30, :148-158, :260-275
- 일괄 화면의 각 행은 고른 저장소들의 현재 값을 읽어 시작하고, 저장소끼리 다르면 사용자가 건드리기 전까지 적용에서 빠진다 — bulk-pane.js:9-13, bulk-observation.js
- 전환 판정은 `mode`·허용 목록·보류 계정만 본다 — server/worker/queue-store.js:6669-6688
- 후보 선택은 허용·ok·현재 아님·보류 아님·모든 창 5h ≤ 80%·그 밖 ≤ 90%(preempt면 `max_pct` 미만)를 거른 뒤 긴 창 부하 낮은 순, 번호 순으로 첫 계정이다 — server/worker/scheduler.js:238-239, :2010-2080, :2522
- preempt 전환은 같은 선택 함수를 `max_pct: preempt_pct`로 부른다 — server/worker/scheduler.js:3956, :4047
- Codex 사용량은 `codex-auth list --json`(180초 캐시)에서 창(`used_percent`·`window_minutes`·`resets_at`)과 `plan`만 읽고 `credits`는 읽지 않는다 — server/routes/codex-usage.js:19, :81-100, :338
- 계정 `plan`은 후보 선택에 쓰이지 않는다 — `grep -nw plan server/worker/{scheduler,provider-health,provider-holds,account-catalog}.js`(scheduler.js:566-572의 plan_approval 문구뿐)
- 선택 함수의 호출처는 보류 재평가(:2251)·preempt(:3951, :4042)·반응 보류(:6846)이고, 기다림 모드 추종은 이 함수를 부르지 않는다 — server/worker/scheduler.js
- 계정별 미러는 `prepareCodexAccountHome`이 만들고 auth 파일이 일반 파일이 아니면 실패한다 — server/worker/codex-account-home.js:281-290, :360
- 세션이 쓰는 기존 API는 `/api/worker/queue` 등이고, 상태를 바꾸는 호출은 POST다(`/api/worker/queue/place`, `/api/codex-account/switch`) — server/app.js:165-196
- 토큰 인증은 없고 REST 변경은 JSON 본문을 요구하며 CORS 헤더를 두지 않는다 — server/app.js:128-130
- 서버 전역 설정의 선례는 `model-visibility-store.js`(revision·fail-quiet 읽기·strict 쓰기)다 — server/model-visibility-store.js:1-30
- 알림은 `discord` CLI fire-and-forget이고, CLI는 `--channel alert|ops|log`(중요·유지보수·기록)를 받는다 — server/worker/notify.js:1-30, `discord --help`
- 계정 키는 `<user>::<workspace>`이고 01·02는 같은 워크스페이스다 — `codex-auth list --json --api`(2026-10-19)
- codex-auth 행은 `usage.credits {has_credits, unlimited, balance}`를 준다 — 같은 명령
- 미확인: `codex-auth list --json`(플래그 없음)이 비활성 계정의 `credits.balance`를 매번 새로 읽는지 — 실측에서 `--skip-api`는 캐시 값, `--api`는 새 값이었다

## 3. 목표와 비목표

목표:
- Codex 정책의 허용 계정에 사용자 순서를 준다. 반응 전환(한도 도달)과 preempt, 조회 API가 그 순서를 쓴다.
- 크레딧 허용 켜기·끄기와 계정별 하루 상한을 설정 화면에서 바꾼다.
- 순서와 크레딧 설정을 모니터 탭의 여러 저장소 일괄 설정에서도 바꾼다.
- dotfiles 브리지가 부를 후보 조회 API를 연다.
- 크레딧이 실제로 쓰이기 시작할 때와 상한에 닿을 때 Discord로 알린다.

비목표:
- Claude 정책의 순서·크레딧(요청이 Codex 맥락). Claude 후보 선택은 바뀌지 않는다.
- 자동 충전, 워크스페이스 단위 보류(UI-59f1 몫).
- 전역 활성 계정 전환(지금처럼 사용자의 사용량 카드 버튼만).

## 4. 설계

### 4.1 정한 갈림 (추천안 채택)

- 결정: **순서는 워크스페이스별, 크레딧 허용·상한은 서버 전역(계정 단위)**. 순서는 기존 워크스페이스
  허용 목록(`accounts`)의 배열 순서 그 자체라 저장 형태가 늘지 않는다. 크레딧은 잔액이 계정에 붙어 있어
  워크스페이스별 상한이면 합계가 상한을 넘을 수 있으므로 전역 한 곳에 둔다.
- 결정: **알림 채널** — 크레딧 첫 사용(계정·KST 하루 단위 첫 차감 관측)은 `--channel ops`(유지보수, 멘션
  없음), 상한 도달은 `--channel alert`(중요, 멘션). 첫 사용은 정상 동작이지만 돈이 나가기 시작했다는
  경고이고, 상한 도달은 그 계정이 다음 후보 선택에서 빠져 자동 이어 가기가 끊길 수 있어 사람이 봐야 한다.
- 결정: **사용자 순서가 부하 순을 대체한다**. 창 기준(5h ≤ 80%, 그 밖 ≤ 90%, preempt `max_pct`)은 거름으로만
  남고, 통과한 계정 중 순서상 첫 계정을 고른다. 부하 순을 남기면 사용자가 정한 순서가 의미를 잃는다.

### 4.2 후보 선택 규칙 (Codex)

입력: 워크스페이스 정책, 현재 계정, 제외 목록(조회 API의 `tried`), 선택 종류(`reactive` | `preempt`).

1. 허용 목록 순서대로 기본 거름(ok·현재 아님·보류 아님·제외 아님)을 통과한 계정을 본다.
2. 창 여유 패스: 모든 창이 창 기준을 통과하는 첫 계정 → `credit_mode: false`.
3. 크레딧 패스(`reactive`에서만): 없으면 다시 순서대로, **그 계정의** 크레딧 허용이 켜져 있고
   `has_credits`이고 (`unlimited` 또는 `balance > 0`)이며 오늘 소모 < 그 계정 상한(`unlimited`면 상한 미적용)인
   첫 계정 → `credit_mode: true`.
4. 둘 다 없으면 후보 없음.

창 여유 계정을 크레딧 계정보다 먼저 쓴다(무료 여유를 먼저). preempt는 한도에 닿기 전 선제 전환이라 크레딧
계정으로 가지 않는다. Worker attempt의 반응 전환(`holdAttempt`)과 조회 API가 같은 함수를 쓴다.

`limit_kind=workspace_credits`로 들어온 조회는 현재 계정과 같은 워크스페이스 id의 계정을 뺀다(같은 잔액을
공유하므로). Worker 보류 쪽의 워크스페이스 판정은 UI-59f1이 그대로 맡는다.

### 4.3 크레딧 설정과 소모 기록 (서버 전역)

저장은 서버 전역 상태 파일 하나다(예: `server/codex-credit-store.js`). `model-visibility-store`와 같은
revision·fail-quiet 읽기·strict 쓰기를 따른다.
- 설정: 계정 키별 `{ allow_credits: boolean, daily_cap: number }`(기본 `false`, 1,000 크레딧/일). 예: 03만 허용하고
  01·02는 금지할 수 있다. 목록에 없는 계정은 기본값(금지)이다.
- 결정: 크레딧 허용이 켜져 있는 동안 서버가 10분마다 Codex 사용량을 새로 읽는다(`--api`). 화면·Worker 읽기에만
  기대면 세션이 크레딧을 쓰는 동안 아무도 읽지 않아 기록·알림이 멈추기 때문이다. 꺼져 있으면 폴링하지 않는다.
- 결정: 오늘 소모 = 오늘(KST) 관측된 **감소분의 누적**이다. 잔액이 줄면 그 차이를 더하고, 늘면(구매) 기준 잔액만
  새 값으로 옮기며 이미 센 소모는 줄이지 않는다. 날짜가 바뀌면 0부터. (당일 첫 잔액과의 차이로 세면 구매가
  소모를 상쇄해 상한이 무력해진다.)
- 결정: 원장에는 **성공한 새 관측**만 넣는다 — `usage.source`가 `api`이고 그 계정 `usage.updated_at`이 원장의
  마지막 관측 시각보다 늦은 값. 캐시·로컬 값이나 같은·과거 시각의 관측은 버린다(옛 캐시를 구매로 오인하거나
  같은 감소를 두 번 세지 않도록).
- 기록: 계정별 KST 날짜, 마지막 관측 잔액·시각, 오늘 누적 소모.
- 알림: 오늘 첫 양(+) 소모 관측 → ops, 누적 ≥ 상한이 처음 된 순간 → alert. 계정·날짜당 각 한 번.
- 사용량 읽기에 `credits`를 더한다(`codex-usage.js` 정규화에 `credits` 필드 추가, 기존 필드는 불변).

### 4.4 조회 API

`POST /api/codex/switch-candidate`, JSON 본문 `{root_dir, current_home, tried: [번호…], limit_kind: "account"|"workspace_credits"}`
(예: 라우트 파일 `server/routes/codex-switch-candidate.js`)

- 현재 계정: `current_home`이 bdui 미러면 그 키, 빈 값이면 codex-auth 활성 계정.
- 정책 `mode=wait`·허용 목록 비어 있음 → `{decision: "none", reason: "policy_wait"|"unconfigured"}`.
- 이 경로는 캐시를 건너뛰고 `codex-auth list --json --api`를 한 번 읽는다(크레딧·창 최신값; 2절 미확인 대응).
- 선택되면 `prepareCodexAccountHome`으로 미러를 보장하고
  `{decision: "switch", account_number, codex_home, credit_mode, reason}`을 돌려준다. 이메일·계정 키는 싣지 않는다.
- 후보 없음 이유: `no_candidate` | `credit_cap_reached` | `credits_disabled` | `catalog_unavailable`.
- 결정: 미러 디렉터리·심링크를 만들 수 있으므로 기존 상태 변경 API처럼 POST다. 크레딧 기록·알림은 4.3의
  사용량 관측에서만 생긴다.
- 기존 API와 같은 바인딩(tailscale 전용)·같은 규칙(토큰 없음, JSON 본문 필수, CORS 없음)을 따른다.

### 4.5 설정 화면

- 실행 탭 Codex 한도 정책: 허용 계정 목록에 위·아래 이동(또는 드래그)으로 순서를 바꾼다. 순서는 즉시 저장
  (기존 `queueLimitSave` 경로).
- 같은 영역에 계정마다 "크레딧 사용 허용" 스위치·하루 상한 입력·오늘 소모량을 보인다. 이 값은 전역이라고
  화면에 적는다(다른 워크스페이스에도 적용).
- Claude 정책 화면은 바뀌지 않는다.

### 4.6 모니터 탭 일괄 설정

사용자 요청(2026-10-19): 모니터 탭에서도 일괄로 설정할 수 있어야 한다.
- 순서(저장소별): 여러 저장소 설정 `계정` 탭의 Codex 허용 목록에 4.5와 같은 순서 이동을 더한다. 적용은 기존
  흐름 그대로 고른 저장소마다 정책 요청으로 보내고, 허용 목록은 화면의 **순서까지** 그대로 넘긴다.
- 관찰: 고른 저장소들의 허용 목록이 집합은 같아도 순서가 다르면 "서로 다름"으로 보고, 사용자가 건드리기
  전까지 적용에서 뺀다(기존 규칙을 순서로 넓힘).
- 계정별 크레딧 켜기·끄기·상한(전역): 같은 `계정` 탭에 전역 구역으로 보인다. 저장소를 고르는 것과 무관하게 전역
  설정 하나를 한 번 쓰고, 화면에 "모든 저장소에 적용(전역)"이라고 적는다. 실행 탭에서 바꾼 값과 같은 곳이다.
- Claude 허용 목록의 일괄 편집은 바뀌지 않는다.

### 4.7 오류와 경계

- 상한은 **다음 후보 선택을 막는** 값이다. 이미 그 계정으로 시작한 Worker attempt·브리지 실행은 멈추지 않고 계속 소모할
  수 있다. 또 사용량 읽기(최대 10분 간격) 사이의 소모는 다음 읽기에 잡힌다. 그래서 실제 누적은 상한을 넘을 수 있고,
  알림에는 실제 누적을 적는다. 설정 화면의 상한 설명도 "이 값에 닿으면 새로 고르지 않는다"로 쓴다.
- 크레딧 실행 중 잔액이 바닥나면 다음 요청이 한도로 끝나고, 조회의 `tried`로 다음 계정에 간다.
- codex-auth 실패·파싱 실패 → `none`(`catalog_unavailable`), Worker 반응 전환은 지금처럼 보류.
- 상태 파일 손상 → 기본값(크레딧 꺼짐)으로 읽어 돈이 나가지 않는 쪽으로 실패한다.

## 5. 테스트와 수용 기준

1. 순서 [02, 01, 03]에서 02·01이 창 기준을 통과하면 02가 고른다(부하가 01이 더 낮아도).
2. 01·02 창 초과, 03 주간 100%·`has_credits`, 크레딧 허용 on, 오늘 소모 < 상한 → 반응 전환은 03 `credit_mode: true`; preempt는 후보 없음.
3. 03의 크레딧 허용 off 또는 오늘 소모 ≥ 상한이면 03은 후보가 아니고 이유가 각각 `credits_disabled`·`credit_cap_reached`다.
3a. 03 허용 on·01 허용 off에서 01·03 모두 창 초과·`has_credits`이면 크레딧 패스는 01을 건너뛰고 03을 고른다.
4. 새 관측 잔액 62500 → 62499 → 62490 → 62600(구매) → 62590이면 오늘 소모는 20이다. 날짜가 바뀌면 0.
4a. 관측 100 → 90 → (과거 시각·캐시) 100 → 90이면 오늘 소모는 10이다.
4b. 상한 도달 뒤에도 이미 시작된 attempt는 중단되지 않고, 다음 선택에서만 그 계정이 빠진다.
5. 첫 소모 관측에 ops 알림 한 번, 상한 도달에 alert 한 번; 같은 날 반복 없음.
6. `limit_kind=workspace_credits`, 현재 01이면 02(같은 워크스페이스)는 빠진다.
7. 조회 API(POST): `mode=wait`→`none/policy_wait`; GET은 404; 선택 시 미러 경로가 존재하고 auth가 그 계정 파일을 가리킨다; 응답에 이메일·키 없음.
8. 설정 화면에서 순서 이동·크레딧 스위치·상한 변경이 저장되고 다시 열면 그대로다. Claude 정책 화면은 불변.
8a. 모니터 일괄 `계정` 탭: 두 저장소를 골라 Codex 순서 [03, 01, 02]를 적용하면 두 저장소의 `accounts`가 그 순서다. 집합이 같고 순서만 다른 두 저장소를 고르면 그 행은 "서로 다름"이고 건드리기 전엔 적용되지 않는다. 크레딧 구역 변경은 저장소 선택과 무관하게 전역 값 하나를 바꾸고 실행 탭에도 같은 값이 보인다.
9. 기존 전환·preempt·wait-follow 테스트는 순서 기준 기대값 갱신 외에 그대로 통과한다.

Test scope:
- seam: 후보 선택 — `server/worker/scheduler.test.js`(순서·창 패스·크레딧 패스·preempt 제외)
- seam: 크레딧 기록 — `server/codex-credit-store.test.js`(누적·구매·날짜 경계·손상 파일)
- seam: 조회 API — `server/routes/codex-switch-candidate.test.js`
- seam: 사용량 정규화 — `server/routes/codex-usage.test.js`(`credits` 필드)
- seam: 설정 화면 — `app/views/settings-dialog/execution-pane.test.js`
- seam: 일괄 설정 — `app/views/settings-dialog/bulk-pane.test.js`, `app/views/settings-dialog/bulk-observation.test.js`, `app/views/monitor/bulk-account-apply.test.js`

검증: `npx vitest run server/worker/scheduler.test.js server/codex-credit-store.test.js server/routes/codex-switch-candidate.test.js server/routes/codex-usage.test.js app/views/settings-dialog/execution-pane.test.js app/views/settings-dialog/bulk-pane.test.js app/views/settings-dialog/bulk-observation.test.js app/views/monitor/bulk-account-apply.test.js`, 그다음 `npm test`, `npm run tsc`, `npm run lint`, `npm run prettier:check`.

## 6. 경계·후속

- 소비자: dotfiles-8okoi가 이 Bead를 선행(`blocks`)으로 기다리고 4.4 API를 부른다.
- 관찰: UI-59f1(워크스페이스 크레딧 보류)은 deferred로 남는다 — 4.2의 조회용 워크스페이스 제외와 판정이 같으므로 착수 시 이 함수를 재사용한다.
- 관찰: Claude 정책의 사용자 순서 — 요청 범위 밖.

## 7. 결정 (ADR 후보)

- Codex 자동 전환 후보는 허용 목록의 사용자 순서로 고르고(창 여유 계정 먼저, 반응 전환에서만 크레딧 계정), 크레딧 허용·계정별 하루 상한은 서버 전역 설정이며, 세션은 후보 조회 API로 같은 규칙을 쓴다. ① 되돌리기 어려움: 스케줄러 선택 함수, 정책 저장, 조회 API, dotfiles 브리지 소비자가 함께 움직인다. ② 맥락 없이는 놀라움: 한도가 다 찬 계정이 유료 크레딧으로 다시 후보가 되고, 부하가 더 낮은 계정을 두고 사용자 순서상 앞 계정으로 가며, 상한에 닿아도 이미 시작된 실행은 계속 돈을 쓴다. ③ 대안 실재: 부하 순 유지, 워크스페이스별 크레딧 설정, 크레딧 제외, 상한 도달 시 실행 중단. 현재 표의 ADR UI-np4t가 UI-inge에서 승계한 자동 전환 조항(허용 계정 집합·후보 건강 임계·선제 전환)을 소비자(스케줄러 후보 선택)째 공유하므로 그 재진술이다 — Codex 후보의 선택 순서와 크레딧 예외만 바뀌고 나머지 승계 조항과 기다림 모드 조항은 그대로다 — `summary`: "Codex 자동 전환 후보는 허용 목록의 사용자 순서로 창 여유 계정을 먼저 고르고 반응 전환에서만 계정별 크레딧 허용·하루 상한(다음 선택만 막음) 안의 크레딧 계정을 고르며, 크레딧 설정은 서버 전역이고 세션은 같은 규칙의 후보 조회 API를 쓴다 — 나머지 조항은 UI-np4t 그대로다" → ADR, supersede UI-np4t
- 알림 채널(ops·alert) — 기본 제외 목록(표시 형식) → ADR 아님
- 상한 기본값 1,000 — 기본 제외 목록(숫자 한도) → ADR 아님
