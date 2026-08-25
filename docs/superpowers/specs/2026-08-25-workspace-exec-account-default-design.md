---
scope:
  - server/workspace-accounts.js
  - server/ws/session-defaults-handlers.js
  - server/ws/connection.js
  - server/worker/scheduler.js
  - server/worker/attach.js
  - app/protocol.js
  - app/views/settings-dialog/execution-pane.js
  - app/views/detail-panel/index.js
  - app/views/detail-panel/exec-accounts.js
---

# 레포 전역 실행 계정 기본값 — `bd kv` 한 키에 저장하고 런치 시 이슈 pin이 우선한다 (UI-d3cb)

- 작성일: 2026-08-25
- 소유 Bead: `UI-d3cb` (route `spec_backed`)
- 선행: `UI-24ow` — 이슈별 실행 계정 선택
  (`docs/superpowers/specs/2026-08-23-per-issue-exec-account-design.md`). 이
  spec은 그 spec의 §2 결정 **"계정은 기계 로컬 사실이라 전역 기본값을 두지
  않는다"** 한 문장을 대체한다. 나머지(두 metadata 키의 의미, cswap 래핑,
  `CODEX_HOME` 격리, 계정 카탈로그 행 스키마, 자격 증명 비노출)는 그대로
  유효하며 이 spec이 재정의하지 않는다.
- 사용자 결정(2026-08-25): 저장은 `bd kv`의 **별도 키**, 편집 표면은 ⚙ 설정
  다이얼로그(= 레포 설정), 해소 불가 시 이슈 pin과 **동일하게 거부**, 이슈
  셀렉트의 빈 값은 **레포 기본값 상속**.

## 배경과 목표

지금 실행 계정은 이슈별 Bead metadata pin(`claude_account`/`codex_account`)
으로만 지정할 수 있다. pin이 없으면 Worker는 계정 env를 아예 주입하지 않고,
세션은 런치 시점의 **기계 전역 활성 로그인**(cswap 활성 프로필,
`~/.codex/auth.json`)으로 돈다. 그래서 "이 레포의 작업은 이 계정 토큰으로
돌린다"를 표현할 수단이 없고, 다른 세션이 `cswap switch`를 하면 그 레포의
디스패치가 소리 없이 다른 계정을 태운다.

이 spec은 다음을 확정한다.

1. 레포별 계정 기본값을 `bd kv`의 새 키 `workspace_exec_accounts`에 둔다.
2. 런치 시 해석 우선순위는 **이슈 pin > 레포 기본값 > 현재 활성 로그인**이다.
3. 편집 표면은 이미 두 곳에 마운트되는 `실행` 패널 하나다(⚙ 설정 다이얼로그의
   연결된 레포, 모니터 레포 타일의 `⚙` 패널의 다른 레포).
4. 레포 기본값이 해소되지 않으면 이슈 pin과 같은 fail-closed 거부다.

## 1. 확인한 사실

### 1.1 Worker의 워크스페이스 층은 kv가 아니다

`server/worker/exec-preset-coordinator.js resolveForDispatch`는 **동기**이고,
워크스페이스 층으로 큐 저장소의 오케스트레이션 3키만 읽는다.
`bd kv workflow_session_defaults`는 Worker가 읽지 않는다 — 그 kv의 소비자는
스폰된 세션 안의 워크플로 스킬이다(`server/session-defaults.js` 모듈 주석).
따라서 kv에 저장한 계정 기본값을 Worker가 쓰려면 **런치 경로에 kv 읽기를
새로 만들어야** 한다.

그 자리는 이미 비동기인 계정 해소 단계다.
`server/worker/scheduler.js`의 `resolveLaunchAccounts(accounts, runner_name)`는
spawn 직전에 `await`로 호출되고, 계정 카탈로그 조회·`cswap` 경로 확인·
`CODEX_HOME` 미러 준비를 모두 여기서 한다.

### 1.2 계정이 런치에 이르는 경로

- `resolveDispatchSettings(workspace, bead_snapshot)`가 Bead snapshot의
  `claude_account`/`codex_account`를 `accounts = { claude, codex }`로 투영한다.
  모든 런치 경로(신규 dispatch, 연속 세션, 충돌 해소·완료 복구 재런치)가 이
  함수를 지나므로 우선순위가 갈릴 자리가 없다.
- `resolveLaunchAccounts`가 실패하면 `finalizeLaunchRefusal(input, cause, false,
  cause_detail)`로 attempt를 `failed`로 마감한다. `cause`는 닫힌 어휘이고,
  `cause_detail`은 `{ reason: string, command: string|null }` 객체로
  `app/views/worker/running-grid.js`와 `detail-panel/session-history.js`가 한
  줄로 렌더한다. Codex HOME 준비 실패가 이미 이 통로를 쓴다.
- 적용된 계정은 attempt 레코드의 `claude_account`/`codex_account`에 기록된다.
- Claude 계정은 `runner_name === 'claude'`일 때만 적용되고, Codex 계정은 러너와
  무관하게 `CODEX_HOME`으로 주입된다(위임 프로세스가 상속). 이 비대칭은 선행
  spec의 결정이며 이 spec은 바꾸지 않는다.

### 1.3 kv 읽기·쓰기 배선

`server/bd.js`의 `kvGetJson(key, {cwd})`/`kvSetJson(key, value, {cwd})`는
키로 인자화돼 있고, `server/worker/runtime.js`가 이미 이 둘을 워크스페이스
경로에 묶어 preset coordinator에 넘긴다. `server/ws/context.js`는 WS 쪽에
`kvGetJsonInWorkspace`/`kvGetJsonAtRoot`(및 set 짝)를 제공한다.

`server/ws/session-defaults-handlers.js`는 `root_dir` 타깃팅
(`kvTargetOf`/`readKv`/`writeKv`)을 모듈 안에 갖고 있고, 이 헬퍼는 kv **키를
인자로 받는다**. 즉 두 번째 kv 채널을 같은 모듈에 얹으면 다른 레포 편집이
공짜로 따라온다.

### 1.4 편집 표면

`app/views/settings-dialog/execution-pane.js` 한 모듈이 두 곳에 마운트된다:
⚙ 설정 다이얼로그의 `실행` 탭(`root_dir: null` = 연결된 레포)과 모니터 레포
타일의 `⚙` 패널(`root_dir` 지정). 그 탭 안에서 **실행 프리셋만 서버 전역**
이고 세션 기본값 kv·오케스트레이션 3키는 레포 범위다.

이슈 상세는 `app/views/detail-panel/index.js`가 이슈를 열 때
`/api/claude-usage`·`/api/codex-usage`를 병렬로 불러 계정 카탈로그를 만들고,
같은 시점에 `get-session-defaults`로 kv 층도 읽는다.

## 2. 저장 — `bd kv workspace_exec_accounts`

### 2.1 키와 값

| 항목 | 값 |
|---|---|
| kv 키 | `workspace_exec_accounts` (레포별 = 그 레포 Beads DB) |
| 값 | `{ "schema": 1, "claude_account": <cswap email>, "codex_account": <codex-auth account_key> }` |
| 소비자 | Worker 런처(beads-ui) |
| 쓰기 | UI(`set-workspace-accounts`) → `bd kv set` |

두 필드는 **선택적**이다. 없으면 그 provider에 레포 기본값이 없다는 뜻이고,
런치는 지금과 같이 현재 활성 로그인으로 간다.

### 2.2 계약 소유권

이 키는 dotfiles `docs/contracts/workflow-state.yaml`에 등록하지 **않는다**.
그 계약이 소유하는 것은 Bead durable metadata 키와 세션이 소비하는
`workflow_session_defaults`의 허용 키 목록이고, 이 키는 둘 다 아니다 —
beads-ui의 Worker만 읽고 쓰는 런타임 상태이며 `display-policy-store`,
`ui-order-store`와 같은 부류다. 저장 매체가 `bd kv`인 것은 레포 단위 durable
저장소가 이미 거기 있기 때문이지, 계약 표면에 들어간다는 뜻이 아니다.

이슈별 pin 두 키(`claude_account`/`codex_account`)는 계약에 등록된 그대로이며
이 spec은 그 키들의 의미·검증·소비를 바꾸지 않는다.

### 2.3 왜 워크스페이스 큐가 아니라 kv인가

사용자 결정이다. 큐 저장소를 골랐다면 Worker가 동기로 읽어 kv 읽기 경로가
필요 없었겠지만, 편집 표면(⚙ = 레포 설정)과 저장 매체를 사용자가 kv로
확정했다. 대가는 §5.1의 런치당 `bd kv get` 한 번이다.

## 3. 서버 — `server/workspace-accounts.js`

`server/session-defaults.js`와 같은 모양의 새 모듈.

```js
export const WORKSPACE_ACCOUNTS_KV_KEY = 'workspace_exec_accounts';
export const WORKSPACE_ACCOUNTS_SCHEMA = 1;

/** 읽기: fail-quiet */
export function normalizeWorkspaceAccounts(raw)
//   → { values: { claude_account?: string, codex_account?: string }, warnings: string[] }

/** 쓰기: strict */
export function validateWorkspaceAccountsPatch(patch)
//   → null | string(오류 메시지)

/** 병합: null은 삭제 */
export function mergeWorkspaceAccounts(raw, patch)
//   → Record<string, unknown>  // schema 필드를 항상 현재 값으로 다시 쓴다
```

- `normalizeWorkspaceAccounts`는 객체가 아니면 빈 층. `schema` 필드는 건너뛴다.
  `ACCOUNT_KEYS`(`server/worker/exec-enums.js`) 밖의 키는
  `unknown_key:<key>` 경고와 함께 드롭. 값이 §3.1 형식을 어기면
  `invalid_value:<key>` 경고와 함께 드롭. **층 전체를 실패시키지 않는다.**
- 이 fail-quiet는 **표시 경로의 계약**이다: 설정 패널과 이슈 상세는 경고를
  배너로 보여주고 나머지를 그대로 그린다. **런치 경로는 같은 경고를 거부로
  읽는다**(§5.2) — 화면은 최선을 다해 보여주고, 어느 계정 토큰을 태울지는
  확정된 값에만 맡긴다. 그래서 `normalizeWorkspaceAccounts`는 값과 경고를 함께
  돌려주고, 둘 중 무엇을 볼지는 호출자가 정한다.
- `validateWorkspaceAccountsPatch`는 반대로 strict다. 알 수 없는 키나 형식을
  어긴 값은 bd를 건드리기 전에 거부한다. `null` 값은 그 키의 삭제 요청이다.

### 3.1 값 형식

이슈 pin과 **동일한 형식 검증**이다(`server/ws/mutation-handlers.js`의
`validateExecSetting`이 `ACCOUNT_KEYS`에 적용하는 규칙):

- 문자열, 1~256자, 공백 문자 없음.
- **존재 검증은 하지 않는다.** 계정 목록 조회는 외부 도구에 의존해 실패할 수
  있고, 목록을 못 읽는다는 이유로 저장을 막으면 사용자가 이미 아는 값을 적을
  수 없다. 목록은 UI 셀렉트가 공급하고, 실재 여부는 런치 시점에 판정된다(§5.2).

## 4. WS 채널

`app/protocol.js`의 `MessageType` 유니온과 `MESSAGE_TYPES` 배열에 두 항목을
추가한다:

- `get-workspace-accounts` — 페이로드 `{ root_dir?: string }`,
  응답 `{ values, warnings }`.
- `set-workspace-accounts` — 페이로드 `{ values: Record<string, string|null>, root_dir?: string }`,
  응답 `{ values, warnings }`.

핸들러는 `server/ws/session-defaults-handlers.js`에 추가한다. 그 모듈의
`kvTargetOf`/`readKv`/`writeKv`가 이미 키 인자화돼 있어 그대로 재사용하고,
모듈 헤더 주석을 "워크스페이스 kv 채널(두 키)"로 갱신한다. `server/ws/connection.js`
의 라우팅 `switch`에 두 case를 추가한다.

쓰기 절차는 세션 기본값과 같다: 검증 → 읽기 → 병합 → 쓰기 → **readback**.
readback이 요청한 값과 다르면 `bd_readback_failed`로 실패시키고 클라이언트가
사용자 편집 상태를 유지한다. bd 읽기/쓰기 실패는 각각 `kv_read_failed` /
`kv_write_failed`다.

`root_dir`이 없으면 연결된 워크스페이스, 있으면 레지스트리 허용 목록으로
검증된 그 레포다(`targetWorkspaceOf`).

## 5. Worker — 런치 시 해석

### 5.1 kv 읽기 지점

`createScheduler` deps에 `kvGet(workspace, key)`를 추가하고,
`server/worker/attach.js`가 `runtime.js`와 같은 방식으로
`(workspace, key) => kvGetJson(key, { cwd: workspace })`를 넘긴다.

`resolveLaunchAccounts`의 시그니처를 `(workspace, accounts, runner_name)`으로
넓히고, 카탈로그 조회 **이전에** 레포 기본값을 한 번 읽어 합친다:

```
claude = accounts.claude ?? workspace_default.claude_account ?? null
codex  = accounts.codex  ?? workspace_default.codex_account  ?? null
```

읽는 쪽은 `normalizeWorkspaceAccounts`를 그대로 쓰되 **경고가 하나라도 있으면
거부한다**(§5.2). 읽기는 런치당 한 번이고, 그 런치가 쓰는 값은 그 한 번의
읽기에서 온다 —
모델·effort와 같은 freshness다. 캐시는 두지 않는다: 런치는 드물고, 낡은 캐시가
"어느 계정 토큰을 태우는가"를 틀리게 만드는 것이 한 번의 `bd kv get`보다
비싸다.

각 provider마다 확정된 값의 **출처**(`bead` | `workspace_default`)를 함께
들고 다닌다. §5.2의 거부 detail이 그것을 쓴다.

### 5.2 실패 의미 — 이슈 pin과 동일한 fail-closed

- 계정 카탈로그 조회 실패, 목록에 없는 계정, 같은 email 중복(claude),
  `cswap` 부재, Codex HOME 준비 실패는 **모두 지금과 같이 런치 거부**다.
  값의 출처가 이슈 pin이든 레포 기본값이든 판정은 같다.
- **레포 계정 층을 확정할 수 없으면 거부한다.** 이 spec이 추가하는 단 하나의
  새 거부 사유 `workspace_accounts_unavailable`이 두 경우를 덮는다: kv 읽기
  실패, 그리고 저장된 값이 §3.1 형식을 어기는 경우. 후자는 쓰기 경로가 strict
  이므로 kv를 손으로 고쳤을 때만 나오지만, 값이 있다는 사실은 아는데 그 뜻을
  모르는 상태라 "기본값 없음"으로 강등하면 사용자가 지정한 것과 다른 계정의
  토큰을 조용히 태운다. **키가 아예 없는 것은 실패가 아니다** — 레포 기본값이
  없다는 뜻이고 런치는 현재 활성 로그인으로 간다.
  기본값을 둔 적 없는 레포도 kv 읽기 실패 때 함께 멈추지만, `bd`가 응답하지
  않는 상태에서는 Worker의 나머지(스냅샷, metadata 스탬프, 완료 처리)도 이미
  성립하지 않는다.
- 거부 사유 enum은 위 한 항목 외에는 **넓히지 않는다**. 출처는 `cause_detail`
  에 싣는다:
  `{ reason: 'workspace_default:claude_account=<값>', command: null }`.
  이슈 pin에서 온 실패는 지금처럼 `cause_detail` 없이 남는다(Codex HOME 준비
  실패의 기존 detail은 그대로 우선한다). 이렇게 하면 실패 화면이 "이슈를
  고쳐야 하는가, 레포 설정을 고쳐야 하는가"를 답한다.

### 5.3 기록

attempt의 `claude_account`/`codex_account`에는 **적용된 값**이 기록된다. 출처는
기록하지 않는다 — 그 런치가 실제로 어느 계정을 썼는가가 세션 이력이 답해야 할
질문이고, 출처는 실패했을 때만 행동을 바꾼다.

## 6. UI

### 6.1 실행 패널의 `실행 계정` 섹션

`app/views/settings-dialog/execution-pane.js`에 `실행 계정` 섹션을 추가한다.
오케스트레이션 섹션과 같은 자리(레포 범위 설정)에 놓는다.

- Claude·Codex 셀렉트 2개. 옵션 라벨과 정렬은 이슈 상세와 같은 형식을 쓴다 —
  `exec-accounts.js`의 `claudeLabel`/`codexLabel`을 export해 재사용하고,
  두 화면이 같은 계정을 다르게 부르는 일이 없게 한다.
- 기본 항목(빈 값) 라벨: `기본값 사용 — 현재 로그인(<활성 계정>)`. 활성 계정을
  읽지 못하면 `기본값 사용 — 현재 로그인(확인 불가)`.
- 계정 목록은 `/api/claude-usage`·`/api/codex-usage`에서 패널 마운트 시 한 번
  병렬로 읽는다. 계정은 기계 로컬이라 `root_dir`과 무관하다. 목록을 못 읽으면
  `계정 목록을 불러올 수 없습니다` 힌트를 달고, 저장된 값은
  `<값> (목록에 없음)` 항목으로 남겨 선택 상태를 잃지 않는다.
- 저장은 변경 즉시 `set-workspace-accounts`. 실패는 토스트로 알리고 **사용자
  편집 상태를 유지한다**(패널의 기존 실패 계약).
- kv 읽기 경고(`unknown_key:` / `invalid_value:`)는 패널의 기존 경고 배너
  경로로 표시한다.

`root_dir` 축은 다른 op와 같다: 없으면 연결된 레포, 있으면 그 레포.

### 6.2 이슈 상세의 기본 항목 라벨

`app/views/detail-panel/index.js`가 이슈를 열 때 `get-workspace-accounts`를
(계정 카탈로그 fetch와 나란히) 한 번 읽고, `execAccountsTemplate`에
`workspace_defaults`를 넘긴다. `exec-accounts.js`의 `defaultLabel`이 갈린다:

- 그 provider에 레포 기본값이 있으면 → `레포 기본값 사용(<계정 라벨>)`.
  카탈로그에서 그 계정을 찾지 못하면 저장된 값을 그대로 보여준다.
- 없으면 → 지금 그대로 `기본값 사용 — 현재 로그인(<활성 계정>)`.

이슈에서 `(기본)`을 고른다는 것은 **상속**이라는 뜻이고, 그 상속의 결과가
라벨에 그대로 보인다. metadata 어휘는 바뀌지 않는다 — 키가 있으면 pin, 없으면
상속이고, "레포 기본값 무시" 같은 센티널 값은 두지 않는다.

`get-workspace-accounts` 실패는 fail-quiet다: 레포 기본값을 모르는 상태이므로
라벨을 지금 형식 그대로 두고, 셀렉트 동작은 바뀌지 않는다. 이슈 상세는 표시
표면이고 판정은 런치가 한다.

## 7. 테스트

- `server/workspace-accounts.test.js` — 정규화 fail-quiet(미지의 키·잘못된
  형식·객체 아님), 검증 strict(알 수 없는 키·256자 초과·공백 포함·`null` 삭제),
  병합이 `schema`를 보존.
- `server/ws/session-defaults-handlers.test.js` 추가 케이스(핸들러가 그 모듈에
  얹히므로 테스트도 같은 파일) — 읽기 응답 형태와 경고 전달, 쓰기 검증 거부,
  kv 읽기/쓰기 실패, readback 불일치, `root_dir` 타깃팅(연결된 레포 vs 다른
  레포), 그리고 계정 채널의 쓰기가 `workflow_session_defaults`를 건드리지
  않는다는 것.
- `server/worker/scheduler.test.js` 추가 케이스 — 이슈 pin이 레포 기본값을
  이긴다, pin 없고 기본값 있으면 기본값이 적용된다, 둘 다 없으면 계정 env가
  주입되지 않는다, 레포 기본값이 해소되지 않으면 거부되고 `cause_detail`에
  `workspace_default:` 출처가 실린다, kv 읽기 실패는
  `workspace_accounts_unavailable`로 거부된다.
- `app/views/detail-panel/exec-accounts.test.js` 추가 케이스 — 레포 기본값이
  있을 때/없을 때의 기본 항목 라벨.
- `app/views/settings-dialog/execution-pane.test.js` 추가 케이스 — 섹션 렌더,
  변경 시 `set-workspace-accounts` 전송(+`root_dir`), 목록 조회 실패 시 힌트와
  저장값 보존.

Pre-Handoff Validation: `npm run tsc`, `npm test`, `npm run lint`,
`npm run prettier:write`, 그리고 프런트 편집이 있으므로 `npm run build`와
갱신된 번들 포함.

## 8. 비목표

- 서버 전역(모든 레포 공통) 계정 기본값. 범위는 레포다.
- 실행 프리셋에 계정 축 추가. 프리셋은 서버 전역이라 레포별 계정을 담을 수
  없고, 선행 spec이 계정을 프리셋 축에서 의도적으로 제외했다.
- dotfiles 계약 변경. §2.2 참조.
- 계정 기본값의 사전 유효성 감시(주기적 목록 대조, 설정 화면 경고 배지).
  실패는 런치가 판정하고 그 자리에 출처가 보인다.
- Claude/Codex 적용 조건의 비대칭 변경(§1.2).

## 구현 unit 후보

단일 unit이다. kv 모듈 → WS 채널 → 스케줄러 해석 → UI 두 표면이 한 방향
의존이고, 중간에서 잘라도 사용자에게 보이는 완결된 기능이 나오지 않는다.
