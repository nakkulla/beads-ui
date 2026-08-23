---
scope:
  - server/routes/claude-usage.js
  - server/routes/codex-usage.js
  - server/worker/account-catalog.js
  - server/worker/codex-account-home.js
  - server/worker/state-paths.js
  - server/worker/exec-enums.js
  - server/worker/attach.js
  - server/worker/scheduler.js
  - server/worker/runner/claude.js
  - server/worker/runner/index.js
  - server/ws/mutation-handlers.js
  - app/views/detail-panel/index.js
  - app/views/detail-panel/exec-accounts.js
  - app/styles.css
---

# 이슈별 실행 계정 선택 (Claude·Codex) — Worker가 cswap 프로필·CODEX_HOME 격리로 spawn한다 (UI-24ow)

- 작성일: 2026-08-23
- 소유 Bead: `UI-24ow` (route `spec_backed`)
- 선행: `UI-rewk`(closed, PR #181) — 다계정 사용량 카드. 이 spec은 그 spec
  (`2026-08-22-multi-account-usage-card-design.md`)의 계정 열거 명령·행 스키마를
  재사용하고, **`account_key` 비노출 결정을 `accounts[].key` 필드 한 가지에
  한해** 대체한다(§3.1). 나머지(자격 증명·토큰·`credits`·원문 stdout 비노출)는
  그대로 유효하다.
- 사용자 결정(2026-08-23): Claude는 `cswap run` 래핑, Codex는 `auth.json`만
  교체한 전체 미러 `CODEX_HOME`, Codex pin 값은 `account_key`, Codex 수동 실증은
  spec 전에 수행(§1). codex-auth 포크는 하지 않는다(`codex`가 `CODEX_HOME`을
  네이티브로 존중하므로 Worker 쪽 소규모 코드로 충분).

## 배경과 목표

Worker는 이슈마다 오케스트레이션 모델·effort·속도와 구현 위임 대상을 고를 수
있지만, **어느 계정의 토큰을 소모할지**는 고를 수 없다. `cswap switch` /
`codex-auth switch`는 기계 전역 전환이라(UI-rewk §전환) 동시에 도는 여러
이슈를 계정별로 나눌 수 없다.

이 spec은 다음을 확정한다.

1. Bead metadata 두 키 `claude_account` / `codex_account`로 이슈별 계정을 pin한다.
2. Worker가 런치 시 pin을 읽어 Claude는 `cswap run <email> --share-history --`로
   spawn을 감싸고, Codex는 계정별 `CODEX_HOME`을 준비해 env로 주입한다. 주입된
   env는 세션이 띄우는 위임 프로세스(codex-runner-bridge, claude-runner 등)에
   상속된다.
3. 이슈 상세 패널에 "실행 계정" 섹션을 둔다. 목록은 UI-rewk가 만든 usage API의
   `accounts[]`에서 온다.
4. 계약 소유권: 두 키는 dotfiles `workflow-state.yaml`에 등록해야 하는 Worker
   소비 durable 키다(§2). dotfiles 쪽 작업은 dotfiles rig의 quick_fix Bead로
   처분하고 `UI-24ow`가 그 Bead를 `blocks`로 의존한다.

## 1. 조사·실증으로 확정한 사실

### 1.1 Worker spawn 경로

- `server/worker/scheduler.js launchSession`이 `settings`를 만들고
  `settings.env`에 `BDUI_*`·guard hook env를 얹는다. `server/worker/runner/session.js`
  는 자식 env를 `{...process.env, ...settings.env, ...adapter env}`로 병합한다
  (`session.env.test.js`가 우선순위를 고정). `runner/index.js createRunner`는
  `routing_env: {}`를 넘긴다.
- `runner/claude.js claudeSpec().buildArgv`는 `command: 'claude'`,
  `args: ['-p','--output-format','stream-json','--verbose', (--resume), (--model),
  (--effort), '--permission-mode', …]`, `env: { CLAUDE_HOOK_SUPPRESS: '1',
  ...routing_env }`를 돌려준다. `runner/codex.js`는 `command: entry.command`
  (카탈로그, 기본 `codex`), `args: ['exec', …]`, `env: { CODEX_SILENT: '1', … }`.
- `session.js onLine`은 `JSON.parse` 실패 줄을 **조용히 건너뛴다** → 래퍼가
  stdout에 찍는 비JSON 배너는 파서를 깨지 않는다.
- 연속 실행(`continuation_mode === 'session'`)은 relaunch 시 Bead에서 실행
  설정을 **다시** 해석한다(`resolveDispatchSettings`). 계정도 같은 규칙을 따른다
  (§4.1).
- `server/worker/claude-effort-observer.js`는
  `~/.claude/projects/<munged cwd>/<session_id>.jsonl`을 읽는다 → Claude
  프로필이 `projects/`를 공유하지 않으면 effort 관측이 fail-quiet로 빠진다.

### 1.2 cswap 0.21.0 (`~/.local/bin/cswap`, Python `claude-swap`)

- `cswap run NUM|EMAIL [--no-share] [--share-history|--no-share-history] -- <claude 인자>`
  (EXPERIMENTAL 표기). 자식 env에 `CLAUDE_CONFIG_DIR`만 세팅하고 인증 override
  env 5종(`ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`
  등)을 제거한 뒤 `claude`로 **`execvpe`**(stdio·exit code 투명). 부트스트랩
  (프로필 생성·자격 증명 시드·1회 refresh·stale 처리)은 단일 전역 `.lock`
  아래에서 수 초 안에 끝나고 exec 전에 해제된다. 요청 계정이 현재 기본 로그인
  이면 프로필 없이 `claude`를 바로 exec한다.
- 프로필 경로 `~/.claude-swap-backup/sessions/<번호>-<email slug>/`는 비공개
  규약이고 경로를 출력하는 명령이 없다 → 직접 `CLAUDE_CONFIG_DIR` 주입은
  채택하지 않는다.
- 기본 공유(symlink): `settings.json`, `keybindings.json`, `CLAUDE.md`, `skills/`,
  `commands/`, `agents/`; `--share-history`면 `projects/`, `history.jsonl`도 공유
  (프로필이 쌓은 히스토리는 먼저 `~/.claude`로 병합). `run`은 `--json` 대상이
  아니라 배너 한두 줄을 **stdout**에 찍는다.
- 사용자 셸 함수가 `cswap run`을 `cswap run --share-history`로 재작성한다.
  Worker는 셸을 거치지 않고 바이너리를 직접 실행하므로 플래그를 명시한다.
- 계정 식별: `cswap list --json` 행의 `number`, `email`, `alias`, `active`,
  `usageStatus`(UI-rewk 소비 필드). `resolve_account`는 number·email·alias를
  모두 받는다. `duplicateAccountWarnings[]`가 있으면 같은 email이 둘 이상이다.

### 1.3 codex-auth 0.3.0-alpha.11 / codex 0.148.0

- codex-auth에는 per-run 격리 명령이 없다. `switch`는 `~/.codex/auth.json`에
  **복사**(symlink 아님). 계정별 auth 파일은
  `~/.codex/accounts/<base64url(account_key, 패딩 없음)>.auth.json`(0600).
  `codex-auth list --json` 행: `number`, `account_key`, `email`, `alias`, `plan`,
  `active`, `usage`. 같은 email이 plan만 다른 계정이 여럿 있으므로 email은
  식별자가 아니고 `number`는 목록 순번이라 durable pin에 부적합하다.
- `codex` 네이티브 바이너리는 `CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"`로
  홈을 정하고 `auth.json`·`config.toml`·`skills/`·`sessions/`·`log/` 등을
  거기서 읽는다(`--ignore-user-config`여도 auth는 `CODEX_HOME`).
- **실증(2026-08-23, scratch)**:
  - 비활성 계정 3·4용 미러 HOME(`~/.codex` 최상위 85개 항목 symlink +
    `auth.json` → 계정 파일 symlink)에서 `codex exec --json --skip-git-repo-check
    --sandbox read-only '…' </dev/null`을 **동시** 실행 → 둘 다 exit 0, 답
    `OK`. 계정 파일 5개와 live `~/.codex/auth.json`의 sha256·mtime 불변. HOME
    최상위에 비-symlink 항목이 새로 생기지 않았고 rollout은 공유 `sessions/`에
    기록됐다(`--resume`·히스토리가 기본과 동일하게 동작).
  - 음성 대조군: `auth.json`만 없는 미러 HOME → `codex login status` =
    `Not logged in`, `codex exec` = 401 → codex는 `$CODEX_HOME/auth.json`만 읽는다.
  - 쓰기 방식: scratch HOME의 `auth.json`을 scratch 대상 파일로 symlink한 뒤
    더미 API 키로 `codex login --with-api-key` → **symlink 보존, 대상 파일만
    갱신(제자리 쓰기)**. OAuth refresh 쓰기는 토큰 만료(8/29~9/1)로 직접 관측
    하지 못했다 → §4.3은 링크가 끊긴 상태를 고치지 않고 fail-closed로 거부한다.
  - `codex exec`는 stdin이 열려 있으면 "Reading additional input from stdin…"
    으로 대기한다(Worker는 이미 stdin을 넘기지 않는다).

### 1.4 계약 표면

- 새 durable 키는 dotfiles `docs/contracts/workflow-state.yaml`의
  `metadata.parent_keys`와 `consumer_surface.metadata.keys`에 함께 등록해야 하고,
  `src/shared/skills/flow/workflow/scripts/check-workflow-contract.py`의
  `EXPECTED_METADATA_KEYS`·`tests/contracts/test_workflow_contract.py`가 집합
  일치를 강제한다. 단어 예산(`workflow-state.yaml` 1,400)이 한도에 차 있어 같은
  유닛에서 의미 보존 압축이 필요하다(`contract-maintenance.md`).
- dotfiles는 자체 rig(`dotfiles-xxxx`)를 갖고 두 rig는 `external_databases`로
  교차 연결돼 있다.

## 2. 계약과 키

| 키 | 값 | 소비자 | 쓰기 |
|---|---|---|---|
| `claude_account` | cswap 계정 `email` (비공백, 1~256자) | Worker 런처 | UI(`update-exec-settings`) → `bd update --set-metadata` |
| `codex_account` | codex-auth `account_key` (비공백, 1~256자) | Worker 런처 | 같음 |

- 두 키는 `orchestration_*`처럼 Worker만 소비하는 Bead 키다. `workspace kv`
  `workflow_session_defaults`·실행 프리셋·`EXEC_SETTING_KEYS`(attempt
  `exec_values`, 12키 완전성 판정)에는 **넣지 않는다**. 계정은 기계 로컬 사실
  이라 전역 기본값을 두지 않는다 — pin이 없으면 env를 주입하지 않고 현재 활성
  로그인이 쓰인다.
- **dotfiles 유닛(cross-repo, 닫힌 작업)**: dotfiles rig의 quick_fix Bead
  `dotfiles-a27g`(route=quick_fix, 2026-08-23 생성·readback)를 `UI-24ow`가 외부
  `blocks`로 의존한다(`bd ready`에서 제외 확인). 범위 — `workflow-state.yaml`
  `metadata.parent_keys`에 `claude_account: {type: string, consumer: worker}`,
  `codex_account: {type: string, consumer: worker}` 추가, `consumer_surface.metadata.keys`
  2항목 추가, checker 상수·테스트 갱신, 단어 예산 압축; 검증 —
  `check-workflow-contract.py`, `scripts/render.py`, `scripts/check-rendered.py`,
  `pytest tests/contracts/test_minimal_checker.py tests/contracts/test_workflow_contract.py -q`,
  `scripts/run-tests.sh --tier required`. 설계 SoT은 이 문서다. 그 Bead가
  `closed`되어야 `UI-24ow`가 `bd ready`에 오른다.
- beads-ui는 계약 소비자로서 두 키를 `server/worker/exec-enums.js`에 **별도
  상수** `ACCOUNT_KEYS = ['claude_account', 'codex_account']`로 둔다(기존 12키
  배열과 섞지 않는다).

## 3. 서버 — 계정 카탈로그

### 3.1 usage 행에 `key` 추가

- `server/routes/claude-usage.js`·`codex-usage.js`의 `UsageAccount` 행에
  `key: string`을 추가한다. Claude = `email`, Codex = `account_key`. 기존 필드·
  정렬·fail-quiet·캐시 세대 규칙은 그대로다. Codex 행 정규화에서 `account_key`가
  문자열이 아니면 그 행만 버린다(기존 "깨진 행만 제거" 규칙).
- 두 모듈은 `listAccounts()`를 export한다:
  `Promise<{ ok: true, accounts: UsageAccount[], active_key: string|null } | { ok: false, error: string }>`.
  기존 캐시(30s/180s, 세대 무효화)와 프로세스 러너를 재사용하며 HTTP 핸들러와
  같은 정규화를 거친다. `ok:false`는 도구 부재·exit≠0·타임아웃·파싱 실패.

### 3.2 `server/worker/account-catalog.js`

```js
export function createAccountCatalog({ listClaude, listCodex })
// resolveClaude(email)  → {ok:true, account} | {ok:false, reason:'claude_account_unknown'|'claude_account_ambiguous'|'claude_account_list_unavailable'}
// resolveCodex(key)     → {ok:true, account} | {ok:false, reason:'codex_account_unknown'|'codex_account_list_unavailable'}
```

- `ambiguous`: 같은 `email` 행이 둘 이상(cswap `duplicateAccountWarnings`와
  같은 상황). 대체 선택은 하지 않는다.

## 4. Worker — 런치 시 적용

### 4.1 해석 시점과 기록

- `server/worker/attach.js snapshotBead`가 `md.claude_account`/`md.codex_account`
  (문자열일 때만)를 `BeadSnapshot`에 투영한다.
- 해석 시점은 실행 설정과 **같다**: 모든 런치 경로(신규 dispatch, 연속
  `prior_session`/`fresh_current`, 충돌 해소·completion repair 재런치)는 이미
  `resolveDispatchSettings(workspace, snapshot)`으로 그 런치의 Bead snapshot에서
  `exec`를 해석한다. 같은 호출이 같은 snapshot의 `claude_account`/`codex_account`를
  `resolved.accounts = { claude: string|null, codex: string|null }`로 함께
  돌려주고, 각 호출 지점이 그대로 `launchSession(input.accounts)`에 넘긴다.
  `launchSession`은 다른 곳에서 계정을 읽지 않는다(하나의 snapshot = 하나의
  런치). 모델·effort와 같은 freshness다 — 비동기 사전 점검 뒤 snapshot을 다시
  읽지 않는다.
- 연속 결정 토큰(`decision_token.effective_exec_digest`)의 digest 입력에
  `accounts`를 포함한다. 점검 중 pin이 바뀌면 토큰이 맞지 않아 기존 규칙대로
  재결정한다. `exec_values`(12키)와 `runner_mismatch` 판정에는 넣지 않는다 —
  Claude·Codex 모두 히스토리가 공유되므로(§4.2 `--share-history`, §4.3 미러)
  계정이 바뀌어도 `--resume`/`codex exec resume`이 동작하고, 계정 변경만으로는
  연속 결정 대화를 열지 않는다.
- attempt 레코드에 적용값 `claude_account: string|null`, `codex_account:
  string|null`을 기록한다(진단용; 미적용이면 `null`). `exec_values`에는 넣지
  않는다. Worker 타일 표시는 범위 밖(UI-eyz0 후속).

### 4.2 Claude — `cswap run` 래핑

- 적용 조건: `codex_account`와 무관하게 `claude_account`가 pin돼 있고
  **오케스트레이션 runner가 `claude`**일 때. runner가 `codex`면 적용하지 않는다
  (위임 `claude`는 기본 로그인으로 돈다; attempt `claude_account: null`). UI가 이
  제약을 힌트로 보여준다(§6).
- `account-catalog.resolveClaude(email)`이 `ok`면 `settings.claude_account =
  email`로 넘기고 `runner/claude.js buildArgv`가 다음으로 감싼다:

  ```
  command: <cswap 절대경로>
  args:    ['run', <email>, '--share-history', '--', ...기존 claude args]
  env:     변경 없음 ({ CLAUDE_HOOK_SUPPRESS: '1', ...routing_env })
  ```

  cswap 경로는 `claude-usage.js`와 같은 규칙(PATH 탐색 → `~/.local/bin/cswap`
  fallback)이다; 둘 다 없으면 런치 전 실패 `cswap_unavailable`.
- `--share-history`를 명시하는 이유: `projects/`·`history.jsonl` 공유로
  `--resume`와 `claude-effort-observer`가 계정과 무관하게 동작한다(사용자 셸
  alias와 같은 선택). 기본 공유(`settings.json`·`skills/`·`agents/`·…)는 그대로
  받아 Worker 세션이 같은 스킬·훅을 본다(`CLAUDE_HOOK_SUPPRESS`는 유지).
- cswap 배너가 세션 로그 첫 줄들에 섞인다. `session.js onLine`이 비JSON 줄을
  건너뛰므로 스트림 파싱·session_id 추출·질문 감지는 영향이 없다. 시스템
  프롬프트 기록(`system_prompt`/`task_prompt`)은 래핑과 무관하게 같은 조립을
  쓴다.
- pin된 계정이 현재 기본 로그인이어도 항상 감싼다(cswap의 동일 계정 fast path가
  프로필 없이 `claude`를 exec한다).

### 4.3 Codex — 계정별 `CODEX_HOME` 미러

- 적용 조건: `codex_account`가 pin돼 있으면 **runner와 무관**하게 적용한다
  (claude 오케가 codex-runner-bridge로 위임할 때 env가 상속된다).
- `account-catalog.resolveCodex(key)`가 `ok`이고 계정 파일
  `<codex_root>/accounts/<base64url(key)>.auth.json`이 존재해야 한다.
  `codex_root`는 서버 프로세스의 `CODEX_HOME`이 비어 있지 않으면 그 값, 아니면
  `~/.codex`.
- `server/worker/state-paths.js codexAccountHomeDir(key)` =
  `$XDG_STATE_HOME/bdui/codex-homes/<base64url(key)>/`.
- `server/worker/codex-account-home.js prepareCodexAccountHome({ key, auth_file, codex_root, home_dir })`
  — 매 런치 멱등 준비. 모든 판정은 `lstat`(symlink를 따라가지 않음)로 하고,
  정해진 모양이 아니면 **고치지 않고 거부**한다:
  1. 전제: `auth_file`은 실제 일반 파일(symlink 아님)이어야 한다. `home_dir`은
     없으면 0700으로 만들고, 있으면 실제 디렉터리(symlink 아님)여야 한다.
     어긋나면 `codex_home_prepare_failed`(detail `auth_file_not_regular` /
     `home_not_directory`).
  2. `codex_root`의 최상위 항목(`auth.json` 제외) 각각: `home_dir/<name>`이 없으면
     `codex_root/<name>`으로의 symlink를 만든다(동시 런치의 `EEXIST`는 성공).
     있으면 — 기대 대상(`codex_root/<name>`)을 가리키는 symlink면 통과, 다른
     대상의 symlink면 거부(detail `mirror_link_mismatch:<name>`), symlink가 아닌
     실제 파일/디렉터리면 codex가 런타임에 만든 사설 항목으로 보고 통과한다.
     어떤 것도 삭제하거나 덮어쓰지 않는다.
  3. `home_dir/auth.json`: 없으면 `auth_file`로의 symlink 생성(임시 이름으로
     만든 뒤 `rename`); `auth_file`을 가리키는 symlink면 통과; 다른 대상의
     symlink면 같은 원자적 방식으로 교체(live 세션은 이미 열어 둔 경로/fd를 계속
     쓴다); **symlink가 아닌 일반 파일이면 거부**(detail `auth_json_not_symlink`) —
     자동 복사·되돌리기는 하지 않는다. 실증(§1.3)상 codex는 제자리 쓰기이므로 이
     상태는 비정상이며, 그 파일이 최신 토큰을 가질 수 있으니 운영자가 확인·정리
     할 때까지 건드리지 않는 것이 안전하다. 런치 실패 사유에 경로를 담아
     드러낸다.
  4. 반환 `{ ok: true, home_dir }` 또는 `{ ok: false, reason: 'codex_home_prepare_failed', detail }`.
- 성공하면 `settings.env.CODEX_HOME = home_dir`로 주입한다(`settings.env`는
  `routing_env`보다 아래 층이지만 `codex.js`는 `CODEX_HOME`을 쓰지 않는다).
- 같은 계정의 여러 동시 세션은 같은 `home_dir`을 공유한다 — 여러 터미널이
  `~/.codex`를 공유하는 기본 상황과 동일한 동시성이다.
- 한계(기록): codex가 런타임에 **새** 최상위 항목을 만들면 그 런치에서는
  `home_dir` 안에 실제로 생긴다. 다음 런치의 2단계는 이미 있는 항목을 건드리지
  않으므로 그 항목은 계정 HOME 사설로 남는다. 실증에서는 그런 항목이 생기지
  않았다(§1.3).

### 4.4 fail-closed

- 다음은 `exec.invalid_reason`과 같은 경로로 **스폰 전**에 런치를 실패시키고
  다른 계정·기본 로그인으로 대체하지 않는다: `claude_account_unknown`,
  `claude_account_ambiguous`, `claude_account_list_unavailable`,
  `cswap_unavailable`, `codex_account_unknown`,
  `codex_account_list_unavailable`, `codex_home_prepare_failed`.
- cswap `usageStatus`(`relogin_required` 등)는 런치 조건이 아니다 — 존재만 보고,
  인증 실패는 세션 실패로 드러난다.

## 5. 쓰기 경로 — `update-exec-settings`

- `server/ws/mutation-handlers.js validateExecSetting`에 `ACCOUNT_KEYS` 분기를
  둔다: `''`은 unset(기존 `(기본)` 규칙), 그 외는 형식 검증(공백 없음, 1~256자)
  만 한다. 존재 검증은 런치 시(§4.4). `buildExecSettingsArgs`는 변경 없이 그대로
  `--set-metadata`/`--unset-metadata`를 만든다.
- `update-impl-target` 원자 그룹과 무관하다(`LINKED_IMPL_KEYS` 밖).

## 6. 프론트 — 이슈 상세 "실행 계정" 섹션

- 새 템플릿 `app/views/detail-panel/exec-accounts.js execAccountsTemplate({ md, catalog, handlers })`
  를 `detail-panel/index.js`가 실행 설정 블록의 core 섹션 바로 아래에 렌더한다.
  ⚙ 설정 다이얼로그·프리셋·`execSettingRows`(12키 공유 모델)는 건드리지 않는다.
- 행 2개(`selectRow`와 같은 마크업·`data-exec-key` 속성 재사용, 변경 시
  `onExecChange(key, value)` 경로로 `update-exec-settings` 전송):
  - `Claude 계정` — 옵션 `기본값 사용 — 현재 로그인(<active email>)`(값 `''`)
    + 각 행 `<email>` 뒤에 `alias`가 있으면 ` (alias)`, `status !== 'ok'`이면
    ` · <status>`. 값은 `key`(=email). 행 아래 힌트 한 줄: `오케스트레이션
    런타임이 claude일 때 적용됩니다`.
  - `Codex 계정` — 옵션 `기본값 사용 — 현재 로그인(<active email · plan>)` +
    각 행 `<email> · <plan>`(+ ` (alias)`). 값은 `key`(=account_key).
- 카탈로그: 패널이 이슈를 열 때(`current_id` 변경) `GET /api/claude-usage`·
  `/api/codex-usage`를 한 번씩 받아 `accounts[]`·활성 행을 보관한다(같은 이슈가
  열려 있는 동안 재요청하지 않음; 패널 재오픈 시 갱신). 응답이 `available:false`
  여도 `accounts[]`가 있으면 쓴다.
- fail-quiet: 요청 실패·`accounts` 부재면 select는 `(기본)`과 현재 pin만 갖고
  힌트 `계정 목록을 불러올 수 없습니다`를 붙인다. pin 값이 목록에 없으면
  `"<값> (목록에 없음)"` 옵션으로 선택 상태를 보여 해제할 수 있게 한다.
- 스타일: 기존 `exec-settings-core` 행 스타일을 재사용하고 힌트는
  `detail-hint`류 기존 보조 텍스트 클래스를 쓴다(새 토큰 없음).

## 7. 비목표

- 전역 기본 계정, 프리셋·kv 포함, Worker 카드/실행 타일 칩 표시(UI-eyz0 후속),
  계정 자동 로테이션·사용량 기반 선택.
- codex-auth 포크 또는 `codex-auth run` 신설, `CLAUDE_CONFIG_DIR` 직접 주입.
- codex 오케 + claude 위임 조합의 Claude 계정 적용(제약으로 명시).
- 세션 내부 dotfiles 스킬(codex-runner-bridge 등)의 env 처리 변경 — 상속만
  기대한다.
- `AGENTS.md`의 옛 파일명(`workflow.{md,yaml}`) 정정.

## 8. 검증

- 단위(`node --test`, 기존 규약):
  - `codex-account-home.test.js`: tmp 루트로 미러 생성·멱등 재실행(없는 항목만
    추가, 삭제 없음)·`auth.json` 분기(없음→생성, 같은 대상→통과, 다른 대상→원자
    교체, 일반 파일→거부)·symlink 이상 거부(`home_dir`이 symlink, `auth_file`이
    symlink, 미러 항목이 다른 대상의 symlink)·codex가 만든 사설 항목 통과·
    `EEXIST` 허용·실패 detail 문자열.
  - scheduler 런치 테스트(해석 시점): 신규 dispatch·`prior_session` 연속·
    completion repair 재런치 각각에서 같은 snapshot의 pin이 `launchSession`으로
    전달되고 attempt에 기록되는지; pin 변경 후 `decision_token` digest가 달라져
    이전 토큰이 거부되는지.
  - `runner/claude.test.js`: `settings.claude_account`가 있을 때
    `command`/`args`가 `cswap run <email> --share-history -- <기존 args>`로
    감싸이고 env는 불변; 없을 때 기존 argv 그대로(스냅샷 유지).
  - `runner/session.env.test.js` 또는 scheduler 테스트: `settings.env.CODEX_HOME`이
    자식 env에 전달된다.
  - scheduler 런치 테스트: pin + 카탈로그 fake로 성공 경로(attempt에 적용값
    기록, runner `codex`에서 `claude_account: null`)와 §4.4 실패 사유 각각.
  - `account-catalog.test.js`: unknown/ambiguous/unavailable.
  - `claude-usage.test.js`·`codex-usage.test.js`: 행 `key` 추가, `listAccounts()`
    의 ok/실패 형태, Codex `account_key` 누락 행 제거.
  - `mutation-handlers` 테스트: 두 키 형식 검증·unset.
  - `detail-panel` 테스트: 섹션 렌더, 카탈로그 폴백, 목록에 없는 pin 옵션,
    변경 시 `update-exec-settings` 페이로드.
- Pre-Handoff: `npm run tsc`, `npm test`, `npm run lint`,
  `npm run prettier:write`, `npm run build`(번들 산출물 포함).
- 수동(구현 후, 공유 서버 배포 뒤): 이슈 하나에 Claude·Codex 계정을 pin하고
  dispatch → attempt 레코드의 `claude_account`/`codex_account`, 세션 로그 첫 줄의
  cswap 배너, `$XDG_STATE_HOME/bdui/codex-homes/<b64>/` 생성과 `auth.json`
  symlink의 `readlink`가 `<codex_root>/accounts/<base64url(key)>.auth.json`과
  정확히 같은지, 그리고 세션이 정상 종료(인증 실패 없음)하는지를 **결정적 합격
  조건**으로 본다. `codex-auth list --json`의 사용량 변화는 캐시·반올림 때문에
  보이지 않을 수 있으므로 보조 관측일 뿐 합격 조건이 아니다.
- dotfiles 유닛의 검증 bundle은 §2에 있다.

## 구현 unit 후보 (advisory)

- `server-accounts`: `server/routes/claude-usage.js`·`codex-usage.js`(+`key`,
  `listAccounts`), `server/worker/account-catalog.js`, `codex-account-home.js`,
  `state-paths.js`, `attach.js`, `scheduler.js`, `runner/claude.js`,
  `runner/index.js`, `ws/mutation-handlers.js`, `exec-enums.js`(`ACCOUNT_KEYS`) +
  테스트.
- `frontend-selector`: `app/views/detail-panel/exec-accounts.js`,
  `detail-panel/index.js`, `app/styles.css` + 테스트 + `npm run build` 산출물.

## 남은 위험

- OAuth refresh 쓰기 방식은 `codex login` 경로로만 관측했다. rename 쓰기로
  밝혀지면 그 계정의 `auth.json`이 일반 파일로 남아 이후 런치는 §4.3 3단계에서
  `codex_home_prepare_failed(auth_json_not_symlink)`로 멈추고, 최신 토큰은 그
  파일에 보존된다(운영자가 계정 파일로 옮기고 링크를 복구). 그 사이 codex-auth
  `switch`는 한 세대 이전 토큰을 설치할 수 있다. 발생하면 복구 절차를 후속
  Bead로 다룬다.
- cswap `run`은 EXPERIMENTAL이다. CLI 표면(`run NUM|EMAIL [--share-history] --`)이
  바뀌면 런치가 실패로 드러나며(`exit≠0`), 조용히 다른 계정으로 가지 않는다.
- launchd 아래에서 첫 부트스트랩 시 cswap/claude의 Keychain 쓰기가 막히면 해당
  런치만 실패한다(세션 로그로 관측). 수동 검증에서 확인한다.
