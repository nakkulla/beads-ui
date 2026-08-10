# 헤더 Codex 사용량 미터 (UI-eleo)

- 작성일: 2026-08-10
- 소유 Bead: `UI-eleo`
- 제공 Bead: dotfiles의 `dotfiles-qtmf`
- 선행 관계: `UI-eleo`는 `dotfiles-qtmf`를 외부 이슈 ID로 직접 `blocks`
  dependency한다. exact-pinned CLI 설치와 런타임 JSON probe가 완료된 뒤
  구현·배포한다.

## 배경과 목표

기존 헤더의 Claude Code 사용량 미터는 `cswap list --json`을 서버에서
정규화해 활성 계정의 5시간·7일·모델별 윈도를 표시한다. 같은 위치에서 현재
활성 Codex 계정의 primary·secondary 사용량 윈도도 확인할 수 있게 한다.

사용자 확정 범위는 다음과 같다.

- 계정 범위: **활성 Codex 계정 하나**.
- 갱신: `codex-auth list --active --json`을 사용한 **API 갱신, 최소 3분 간격**.
- 구조: Claude와 Codex backend route는 독립시키고, frontend meter만 provider
  공용 component로 일반화한다.
- 실패: 한 provider가 실패해도 다른 provider는 계속 표시한다.

## 데이터 소스 계약

- 소스 명령: `codex-auth list --active --json`.
- 지원 schema는 `schema_version === 1`, `command === "list"`만이다. 모르는
  필드는 무시하지만 schema version이나 command가 다르면 fail-quiet 처리한다.
- `active_account_key`와 `accounts[].account_key`로 활성 account를 고른다.
- 소비 필드는 활성 account의 `usage.source`, `usage.updated_at`,
  `usage.primary`, 선택적 `usage.secondary`, `usage.refresh`뿐이다.
- 각 window는 `used_percent`, `window_minutes`, `resets_at`을 가져야 한다.
  `primary`는 필수이고 `secondary`는 객체 또는 `null`이다.
- `usage.source`가 `api`, `local`, `cache` 중 하나이고 window와
  `updated_at`이 유효하면 `usage.refresh.status`가 실패를 나타내더라도 마지막
  snapshot을 표시한다. `source: none`, 필수 window 누락, 잘못된 epoch/percent는
  unavailable이다.
- `credits`, email, account key, token, raw refresh error, 원문 stdout/stderr는
  브라우저 응답이나 로그로 전달하지 않는다.

`window_minutes` label은 숫자에서 결정적으로 계산한다. 60의 배수는 시간(`300`
→ `5h`), 1,440의 배수는 일(`10080` → `7d`), 그 밖은 분(`45` → `45m`)으로
표시한다. primary → secondary 순서를 유지한다.

## 서버 설계

### route와 browser contract

`server/routes/codex-usage.js`를 추가하고 `server/app.js`에
`GET /api/codex-usage`를 등록한다. 기존 `/api/claude-usage`의 response와 cache
동작은 변경하지 않는다.

성공 응답은 항상 HTTP 200, `Cache-Control: no-store`이며 다음 최소 구조다.

```json
{
  "available": true,
  "provider": "codex",
  "windows": [
    { "key": "5h", "pct": 26, "resetsAt": "2026-08-10T04:00:00.000Z" },
    { "key": "7d", "pct": 74, "resetsAt": "2026-08-16T00:00:00.000Z" }
  ],
  "fetchedAt": "2026-08-10T01:20:00.000Z",
  "ageSeconds": 42
}
```

- `pct`는 0~100의 finite number만 허용한다.
- epoch second인 `resets_at`과 `updated_at`은 ISO 8601로 변환한다.
- `ageSeconds`는 server 현재 시각과 `updated_at`의 차이를 0 이상 정수로
  계산한다.
- unavailable은 `{ "available": false }`만 반환한다. 실행 파일 부재, timeout,
  non-zero exit, JSON parse 실패, schema mismatch, 활성 계정 부재, primary 부재가
  모두 이 경로다.

### process와 cache 경계

- shell 없이 `spawn(bin, ['list', '--active', '--json'], { shell: false })`로
  실행한다.
- 먼저 `codex-auth`를 `PATH`에서 찾고 `ENOENT`일 때만
  `$HOME/.local/bin/codex-auth`를 시도한다.
- timeout은 10초이며 초과 시 process를 종료하고 unavailable로 축약한다.
- stdout은 parse할 때까지만 메모리에 보관하고 절대 log하지 않는다. stderr와
  예외 message도 사용자 응답이나 server log에 싣지 않는다.
- positive/negative cache TTL은 모두 180초다. frontend가 60초마다 조회해도
  private usage endpoint 호출은 한 server process에서 3분에 한 번보다 잦아지지
  않는다.
- cache miss가 겹치면 하나의 in-flight Promise를 공유한다. 실패도 같은 TTL로
  cache해 missing binary나 API 장애 때 process를 반복 생성하지 않는다.

## frontend 설계

`app/views/usage-meter.js`를 provider-aware component로 일반화한다. 기본 provider
목록은 다음 순서다.

1. `Claude` — `/api/claude-usage`
2. `Codex` — `/api/codex-usage`

한 번의 60초 refresh tick에서 두 endpoint를 독립적으로 조회한다. 내부 상태도
provider별로 유지해 다음을 보장한다.

- 둘 다 available이면 `Claude`와 `Codex` label을 가진 두 group을 기존 header
  mount 안에 나란히 렌더한다.
- 하나만 unavailable이거나 fetch가 실패하면 그 group만 숨기고 다른 group의
  마지막 성공 응답을 정상 렌더한다.
- 둘 다 unavailable이면 mount 전체를 숨긴다.
- component destroy는 interval을 해제하고 늦게 끝난 fetch 결과를 버린다.

각 group은 현재 meter의 window bar, percent, reset tooltip, 60% warn, 85%
danger, 10분 초과 stale 표현을 그대로 쓴다. provider label을 추가하는 데 필요한
최소 CSS만 확장하고, `@media (max-width: 900px)`에서는 기존처럼 meter mount
전체를 숨긴다. `app/index.html`의 단일 `#usage-meter` mount는 유지한다.

## 변경 범위

1. `server/routes/codex-usage.js` — process runner, v1 normalizer, 180초 cache,
   fail-quiet handler.
2. `server/routes/codex-usage.test.js` — schema/process/cache/security 회귀.
3. `server/app.js` — `/api/codex-usage` 등록.
4. `app/views/usage-meter.js`와 `app/views/usage-meter.test.js` — provider 공용
   렌더링과 독립 실패 처리.
5. `app/styles.css` — provider group/label layout.
6. `app/main.bundle.js`와 source map — repository build 산출물 갱신.

새 npm dependency나 credential reader는 추가하지 않는다.

## 테스트 범위

### server

- `schema_version: 1`에서 `active_account_key`가 가리키는 account만 선택한다.
- primary와 선택적 secondary를 순서대로 변환하고 300분/10080분 label,
  epoch→ISO, `ageSeconds`를 단언한다.
- 다른 schema/command, 활성 account 부재, invalid percent/epoch, primary 부재,
  `source: none`은 unavailable이다.
- refresh 실패 상태여도 유효한 `cache` snapshot은 표시한다.
- 성공 payload의 exact equality로 email, account key, credits, refresh error가
  응답에 없음을 단언한다.
- runner가 `list --active --json`, `shell: false`, PATH→`$HOME/.local/bin`
  fallback, 10초 timeout을 지킨다.
- positive/negative 180초 TTL과 concurrent miss coalescing을 fake clock/process로
  검증한다.

### frontend

- Claude+Codex 동시 성공, Claude만 성공, Codex만 성공, 모두 실패를 각각
  검증한다.
- 한 provider의 실패가 다른 provider group을 제거하거나 stale로 만들지 않는다.
- provider label, window 순서, percent clamp, color threshold, reset tooltip,
  10분 stale class, destroy/interval 정리를 검증한다.
- CSS 정적 seam으로 900px 이하 hide 규칙이 유지되는지 확인한다.

### 전체 검증

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
git diff --check
```

`prettier:write`와 `build` 뒤 변경된 source, bundle, source map을 함께 검토하고
커밋한다.

## 배포와 runtime readback

머지 후 beads-ui main을 ff-only로 동기화하고 repository 운영 절차에 따라
`bdui-shared restart`를 실행한다. 다음을 모두 확인한다.

1. process가 main checkout의 `server/index.js`를 실행하고 기대한 tailscale host와
   port를 사용한다.
2. `/healthz`가 정상이다.
3. `/api/claude-usage`의 기존 성공 또는 fail-quiet 계약이 유지된다.
4. `/api/codex-usage`가 credential 필드 없는 정상화 payload를 반환한다.
5. 실제 header에서 available provider group이 보이고 900px 이하에서는 숨는다.

Codex 인증/API가 외부 사유로 실패하면 route는 200 unavailable로 안전하게
축약하지만, 이번 기능의 완료 증거에는 실제 활성 계정 payload와 header 표시
readback이 필요하다.

## 보안·운영 경계

- server와 browser는 `$HOME/.codex/auth.json` 또는 codex-auth registry를 직접
  읽지 않는다. subprocess의 문서화된 JSON만 소비한다.
- OpenAI credential, account identifier, email, raw subprocess output을 HTTP,
  console, application log, test fixture에 남기지 않는다.
- private ChatGPT usage endpoint의 약관·계정 위험은 codex-auth upstream에
  따른다. 호출 빈도를 3분 TTL과 active-only refresh로 제한하며, 이 UI가 직접
  endpoint를 호출하거나 retry loop를 만들지 않는다.

## 비목표

- 비활성 Codex 계정 전체 목록이나 계정 전환 버튼.
- API key usage, OpenAI Platform billing/credits dashboard.
- Claude backend route 또는 cswap cache 정책 변경.
- codex-auth 내부 registry/auth format 재구현.
- 모바일 header에 사용량 meter를 새로 노출하는 작업.

## 수용 기준

- active Codex primary/secondary 사용량이 Claude meter와 같은 header에서 provider
  label과 함께 표시된다.
- API refresh는 180초 cache와 in-flight coalescing으로 제한된다.
- Claude와 Codex의 실패가 독립적이며 credential/identity 정보가 browser나 log로
  새지 않는다.
- unit/type/lint/format/build 검증과 merge 후 process·HTTP·header readback이 모두
  통과한다.
