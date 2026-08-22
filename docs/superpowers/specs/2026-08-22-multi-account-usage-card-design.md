---
scope:
  - server/routes/claude-usage.js
  - server/routes/codex-usage.js
  - server/routes/account-switch.js
  - server/app.js
  - app/views/usage-meter.js
  - app/styles.css
  - app/index.html
---

# 헤더 다계정 사용량 카드와 활성 계정 전환 (UI-rewk)

- 작성일: 2026-08-22
- 소유 Bead: `UI-rewk` (epic `UI-dvqd` 다계정 토큰 사용 지원)
- 후속 Bead: `UI-24ow`(이슈별 Claude 계정), `UI-r5ms`(이슈별 Codex 계정)가
  이 Bead를 `blocks`로 의존한다.
- 대체 관계: 기존 spec
  `2026-08-06-claude-usage-meter-design.md`와
  `2026-08-10-codex-usage-meter-design.md`의 "표시 범위는 활성 계정 하나"
  결정을 이 spec이 대체한다. 또한 `2026-08-10` Codex spec의 "email·account
  key·credits·원문 출력을 HTTP로 노출하지 않는다" 결정 중 **`number`,
  `email`, `alias`, `plan` 네 필드의 노출만** 이 spec이 대체한다(카드 라벨과
  전환 식별에 필요). `account_key`, 자격 증명·토큰, `credits`·`reset_credits`,
  refresh 오류, 원문 stdout/stderr는 계속 노출하지 않는다. 두 spec의
  나머지(소스 명령, fail-quiet, 헤더 레이아웃, 900px 축약 규칙)는 그대로
  유효하다.
- 목업: `~/tmp/mockups/2026-08-22-multi-account-usage-meter.html` — 사용자
  확정 **A안(헤더 팝오버, 모바일 하단 시트)**.

## 배경과 목표

헤더 사용량 미터는 Claude(cswap)와 Codex(codex-auth) 각각의 **활성 계정 하나**만
보여준다. 여러 계정의 한도를 나눠 쓰기 시작하면 나머지 계정의 소모가 UI에
보이지 않고, 계정을 바꾸려면 터미널로 가야 한다.

이 spec은 다음을 확정한다.

- 접힌 상태(헤더)는 지금과 같다 — 활성 계정 창만 보이고, provider별로 다른
  계정이 있으면 `+N` 배지가 붙는다.
- 미터를 클릭하면 카드가 열려 **관리되는 모든 계정**의 사용량이 provider별로
  보인다. 모바일에서는 같은 카드가 하단 시트로 올라온다.
- 카드의 비활성 계정 행에서 **[전환] 버튼 클릭 즉시** `cswap switch` /
  `codex-auth switch`를 실행해 활성 계정을 바꾼다.

조사로 확정한 사실:

- `cswap list --json`은 모든 managed 계정 행을 주며 비활성 계정도
  `usageStatus`가 `ok`이면 `usage`를 포함한다. `ok`가 아니면(`token_expired`,
  `relogin_required`, `api_key`, `keychain_unavailable`, `no_credentials`,
  `unavailable`) `usage`는 `null`이다. 비활성 계정은 cswap의 폴링 계획상
  5~10분 주기로만 갱신된다.
- `codex-auth list --json`(현재 코드의 `--active` 제거)은 모든 계정의
  `usage`를 준다. 같은 이메일이 `plan`만 다른 계정이 여럿 있으므로 이메일은
  식별자가 아니다. 각 행에 `number`, `alias`, `plan`, `active`가 있다.
- `cswap switch <number> --json`은
  `{schemaVersion, switched, from, to, strategy, reason, message, warnings[]}`를
  돌려주고, `codex-auth switch <number> --json`도 비대화식 JSON을 돌려준다.
  두 도구 모두 **실행 중인 세션은 건드리지 않는다** — 전환 뒤 새로 뜨는
  세션부터 새 계정을 쓴다.

## 데이터 소스 계약

### Claude — `cswap list --json`

- 소비 필드(계정 행): `number`, `email`, `alias`, `active`, `usageStatus`,
  `usage.fiveHour|sevenDay`(`pct`, `resetsAt`), `usage.scoped[]`(`name`,
  `pct`, `resetsAt`), `usageFetchedAt`, `usageAgeSeconds`.
- 기존 spec의 규칙 유지: cswap 캐시만 읽고 Anthropic API·토큰·Keychain에 접근하지
  않는다. `countdown`/`clock` 문자열은 소비하지 않는다.

### Codex — `codex-auth list --json`

- 명령 변경: `codex-auth list --active --json` → `codex-auth list --json`.
  API 갱신 비용이 계정 수만큼 늘지만 서버 캐시 3분(`CACHE_TTL_MS = 180_000`)이
  그대로 상한이다.
- 소비 필드(계정 행): `number`, `email`, `alias`, `plan`, `active`,
  `usage.source`(`api|local|cache`), `usage.updated_at`, `usage.primary`,
  `usage.secondary`.
- 활성 계정 판정은 기존대로 최상위 `active_account_key`와 행의
  `account_key` 일치로만 한다. 행의 `active` 불리언은 소비하지 않는다.

### 전환 — `cswap switch` / `codex-auth switch`

- 실행: `cswap switch <number> --json`, `codex-auth switch <number> --json`.
  `number`는 같은 도구의 `list --json`이 준 정수 값을 문자열로 그대로 넘긴다.
- 두 도구의 stdout JSON만 소비하고 exit code 0이 아니면 실패로 본다.
  `cswap`은 `switched:false`+`reason:"already-active"`를 성공으로 준다.

## 서버

### 사용량 응답 확장 (덧붙이기)

`GET /api/claude-usage`, `GET /api/codex-usage`의 기존 최상위 필드는 **그대로**
유지한다(`available`, `email`/`provider`, `windows`, `fetchedAt`,
`ageSeconds` = 활성 계정). 여기에 `accounts[]`를 추가한다.

```json
{
  "available": true,
  "email": "user@example.com",
  "windows": [ { "key": "5h", "pct": 4, "resetsAt": "…" } ],
  "fetchedAt": "2026-08-22T05:08:57Z",
  "ageSeconds": 14.8,
  "accounts": [
    {
      "number": 2,
      "email": "user@example.com",
      "alias": null,
      "plan": null,
      "active": true,
      "status": "ok",
      "windows": [ { "key": "5h", "pct": 4, "resetsAt": "…" } ],
      "fetchedAt": "2026-08-22T05:08:57Z",
      "ageSeconds": 14.8
    },
    {
      "number": 1,
      "email": "other@example.com",
      "alias": "work",
      "plan": null,
      "active": false,
      "status": "token_expired",
      "windows": [],
      "fetchedAt": null,
      "ageSeconds": null
    }
  ]
}
```

- 행 스키마는 두 provider가 공유한다:
  `{ number:int, email:string, alias:string|null, plan:string|null,
  active:boolean, status:string, windows:UsageWindow[], fetchedAt:string|null,
  ageSeconds:number|null }`.
- `status`: Claude는 cswap `usageStatus`를 그대로 통과시킨다. Codex는
  `usage.source`가 허용값이고 `primary`가 정규화되면 `ok`, 아니면
  `unavailable`. 프론트는 `ok`일 때만 막대를 그리고 나머지는 문구로 보여준다.
- `status !== "ok"`인 행은 `windows: []`, `fetchedAt: null`,
  `ageSeconds: null`로 채운다(행 자체는 제거하지 않는다 — 전환 대상으로
  보여야 한다).
- Codex 행의 `plan`은 항상 채운다(중복 이메일 구분용). Claude 행의 `plan`은
  `null`이다.
- 정렬: 활성 계정이 첫 행, 이후 도구의 `number` 오름차순.
- 활성 계정 판정이 실패하거나 활성 계정의 usage가 `ok`가 아니면 최상위는
  기존처럼 `{ "available": false }`로 fail-quiet하되, 파싱 가능한 계정 행이
  하나라도 있으면 `accounts[]`는 함께 내려준다(카드에서 전환할 수 있어야
  하므로). 형식: `{ "available": false, "accounts": [...] }`.
- 행 정규화에서 한 행이 깨지면 그 행만 버리고 나머지를 유지한다(기존의
  "하나라도 깨지면 전체 unavailable" 규칙은 활성 계정의 최상위 필드에만
  적용).

### 전환 라우트 — `server/routes/account-switch.js`

- `POST /api/claude-account/switch`, `POST /api/codex-account/switch`.
  body `{ "number": <int> }`. `number`가 양의 정수가 아니면 400.
- 핸들러는 provider별 `{ bin, args(number) }` 테이블로 만든 하나의 팩토리
  `createAccountSwitchHandler({ provider, runSwitch, invalidateUsageCache })`.
  프로세스 실행은 기존 usage 러너와 같은 방식(shell 없음, PATH →
  `~/.local/bin` fallback, `windowsHide`). 타임아웃 30초.
- provider별 **동시 1건**: in-flight 중 같은 provider 요청은 409
  `{ ok:false, error:"switch_in_flight" }`.
- 응답:
  - 성공 `200 { ok:true, switched:boolean, from:{number,email}|null,
    to:{number,email}|null, warnings:string[] }`. cswap은 `from`/`to`/`warnings`를
    그대로 정규화하고, codex-auth는 JSON에서 대응 필드를 찾을 수 있는 만큼
    채우며 없으면 `null`/`[]`.
  - 실패 `200 { ok:false, error:string }` — exit code ≠ 0, 타임아웃(`timeout`),
    not found(`not_found`), JSON 파싱 실패(`invalid_output`).
- 성공 시(`switched` 여부와 무관) 해당 provider의 usage 캐시를 무효화한다.
  `claude-usage.js`/`codex-usage.js`는 `invalidateCache()`를 export하며, 이는
  **세대(generation) 기반**이다: 모듈은 `cache_generation` 카운터를 두고,
  `invalidateCache()`는 카운터를 올리고 캐시된 payload와 in-flight 참조를
  버린다. 무효화 이전 세대에서 시작된 조회는 완료돼도 캐시에 쓰지 않고, 무효화
  이후 도착한 GET은 그 in-flight를 재사용하지 않고 새 프로세스를 띄운다. 즉
  전환 직후 `refresh()`는 전환 전 시작된 조회의 결과를 절대 받지 않는다.
- 보안은 `/api/register-workspace`와 같다: `express.json()`으로
  `application/json` body만 받고 CORS 헤더를 추가하지 않는다. 토큰·Keychain에
  접근하지 않는다.

## 프론트

### 헤더(접힌 상태)

- 기존 렌더 유지. provider 그룹 끝에 `+N` 배지. `N = accounts.length −
  (accounts 중 active === true인 행 수)`로 계산하므로 활성 계정 판정이 실패해
  활성 행이 0개인 경우에도 수치가 맞는다. `N ≤ 0`이면 배지 없음.
  `accounts[]`가 없으면 배지도 없다.
- 미터 전체를 `<button class="usage-meter__toggle" aria-expanded
  aria-controls>`로 감싼다. 어떤 provider에도 `accounts[]`가 없으면 버튼 대신
  기존 정적 렌더(카드 없음).

### 카드(펼친 상태, A안)

- 위치: 데스크톱은 헤더 아래 우측 정렬 팝오버(폭 380px, 최대 화면 폭−24px).
  `≤640px`(기존 브레이크포인트)에서는 하단 시트 + 스크림.
- 구조: provider 섹션 헤더(`Claude · 활성 A / 전체 N`, `A`는 정규화된
  행의 실제 활성 개수로 0일 수 있음) → 계정 행.
- 계정 행:
  - 라벨: `alias`가 있으면 alias(이메일은 `title`), 없으면 이메일 전체.
  - 태그: Codex는 `plan` 태그 항상, 활성 행은 `active` 태그와 강조 배경.
  - 측정 나이: `ageSeconds`를 `N초 전 / N분 전 / N시간 전`으로. 600초 초과는
    기존 stale 스타일.
  - 창: `status === "ok"`면 활성 행과 **같은 전체 창**(Claude 5h/7d/scoped,
    Codex primary/secondary)을 막대+%로. 아니면 막대 대신 상태 문구 —
    `token_expired`/`relogin_required` → "토큰 만료 — {도구} 재로그인 필요",
    그 외 → "사용량 없음".
  - [전환] 버튼: 유효한 `number`가 있는 **모든 비활성 행**에서 활성화한다.
    `status`는 사용량 표시만 제어하고 전환 가능 여부에는 관여하지 않는다 —
    대상 계정의 유효성(토큰 만료 등)은 cswap/codex-auth가 판정해 경고·오류로
    돌려주고, 그 결과가 행 아래에 표시된다. 토큰 만료 계정으로의 전환이
    바로 재로그인 복구 경로이기 때문이다.
- 카드 하단 고정 안내 한 줄: "전환은 새로 시작하는 세션부터 적용됩니다."
- 닫힘: outside `mousedown`, `Escape`(`workspace-picker`의 문서 리스너 패턴
  재사용). 60초 폴링 갱신은 열린 상태를 유지한 채 내용만 바꾼다. `destroy()`
  에서 리스너를 해제한다.

### 전환 흐름

1. [전환] 클릭 → 그 행의 버튼을 "전환 중…"으로 비활성, 같은 provider의 다른
   [전환] 버튼도 비활성.
2. `POST /api/<provider>-account/switch` `{ number }`.
3. `ok:true` → 즉시 `refresh()`(헤더·카드 동시 갱신). `warnings`가 있으면 행
   아래 경고 문구. `switched:false`면 경고 없이 갱신만.
4. `ok:false`/네트워크 오류 → 행 아래 오류 문구(`error` 값 그대로, 짧게),
   버튼 복구. 전역 토스트 없음.

### 스타일

- 새 클래스는 `usage-meter__` 접두 유지: `__toggle`, `__badge`, `__card`,
  `__section`, `__account`, `__account--active`, `__account--unavailable`,
  `__switch`, `__note`, `__scrim`.
- 900px 축약 규칙은 헤더에만 적용한다. 카드 안의 막대는 접지 않는다.
- 다크 모드는 기존 토큰(`--accent-*`, `--border-chip`, `--text-*`)만 쓴다.

## 오류 처리와 fail-quiet

- `accounts[]` 부재·형식 불일치 → 배지·토글·카드 없이 현재 동작.
- 최상위 `available:false`이지만 `accounts[]`가 비어 있지 않으면 그 provider
  그룹을 숨기지 않는다: 헤더에는 provider 라벨 + "사용량 없음" + `+N`
  배지만 그리고, 카드 섹션은 정상 렌더한다(전환으로 복구할 수 있어야
  하므로). `accounts[]`까지 없으면 기존처럼 그룹을 숨긴다.
- 한 provider 실패는 다른 provider 섹션에 영향 없음(기존 독립성 유지).
- 전환 실패·타임아웃은 행 단위 표기만 하고 usage 캐시는 건드리지 않는다.
- 스위치 도구 미설치(`not_found`)는 행 오류 문구로만 드러난다.

## 테스트

- `server/routes/claude-usage.test.js`: 다계정 `accounts[]` 정렬(활성 먼저,
  number 순), `usageStatus` 통과, `ok`가 아닌 행의 빈 창, 깨진 행 단독 제거,
  활성 unavailable + `accounts[]` 동반.
- `server/routes/codex-usage.test.js`: `--active` 제거된 argv, 중복 이메일
  + `plan` 보존, `active` 판정, 다계정 정렬.
- `server/routes/account-switch.test.js`(신규): 400 검증, 성공/`already-active`
  /실패/타임아웃/`not_found`/`invalid_output`, provider별 409, 성공 시
  `invalidateUsageCache` 호출, cswap 응답 정규화.
- 캐시 무효화 세대(`claude-usage.test.js`/`codex-usage.test.js`): 무효화 전에
  시작된 in-flight 조회가 완료돼도 캐시에 쓰이지 않음, 무효화 후 GET이 새
  프로세스를 실행함, 무효화 후 도착한 GET이 이전 in-flight 결과를 받지 않음.
- `app/views/usage-meter.test.js`: 배지 개수와 0일 때 숨김, `accounts` 없을 때
  정적 렌더, 카드 열림/outside·Esc 닫힘, 폴링 갱신 중 열린 상태 유지, 행
  라벨(alias 우선)·plan 태그·상태 문구, `status !== "ok"` 행에서도 [전환]
  버튼이 활성, 활성 행 0개일 때 배지·섹션 수치, 전환 성공→`fetch` 재호출,
  실패→행 오류 문구, 모바일 시트 클래스.

## 범위 밖

- 자동 전환(`cswap auto`와의 조율), alias 편집, 계정 추가/삭제.
- 이슈별 계정 지정(`UI-24ow`, `UI-r5ms`).
- 실행 중 세션에 대한 전환 적용(도구 동작상 불가능하며 의도하지 않음).

## 구현 unit 후보

- `server-usage-accounts`: `server/routes/claude-usage.js`,
  `server/routes/codex-usage.js` + 각 테스트.
- `server-account-switch`: `server/routes/account-switch.js`(신규),
  `server/app.js` 등록 + 테스트.
- `frontend-card`: `app/views/usage-meter.js`, `app/styles.css`,
  `app/index.html` + 테스트, `npm run build` 산출물.
