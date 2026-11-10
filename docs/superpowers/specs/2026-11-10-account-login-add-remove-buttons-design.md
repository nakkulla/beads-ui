---
scope:
  - server/routes/account-switch.js
  - server/routes/claude-usage.js
  - server/routes/codex-usage.js
  - server/routes/account-login.js
  - server/routes/account-remove.js
  - server/app.js
  - app/views/usage-meter.js
  - app/styles.css
---

# 사용량 카드에서 계정 추가·삭제·재로그인을 버튼으로 한다 (UI-xm29)

## 1. 배경

사용량 카드에 "토큰 만료 — codex-auth 재로그인 필요"가 뜨면 지금은 Mac 터미널에서 직접 로그인해야 한다. 계정을 새로 넣거나 빼는 것도 터미널(`codex-auth login`·`cswap add`·`remove`)에서만 된다. 이 스펙은 세 가지를 사용량 카드의 버튼으로 옮긴다: 만료 계정의 [재로그인], 러너별 [+ 계정 추가], [관리]를 켰을 때 줄마다 보이는 [삭제]. 맥 앞에 없어도(휴대폰 포함) 끝까지 할 수 있어야 한다.

선행 UI-32oq(closed)가 계정 표시(이메일 포맷터)·평소 계정(★)·활성 계정 자동 전환을 정했고, 이 스펙은 그 결과 위에 버튼을 단다.

## 2. 검증된 전제

- 사용량 카드의 만료 문구는 `token_expired`·`relogin_required` 두 상태에서 나온다 — app/views/usage-meter.js:50, app/views/usage-meter.js:976-981
- 카드 줄 머리에는 [전환]만 있고 확인 줄(`그래도 전환`/`취소`) 패턴이 있다 — app/views/usage-meter.js:1034-1081
- 섹션 제목은 `<러너> · 활성 n / 전체 m` 한 줄이다 — app/views/usage-meter.js:1090-1103
- Codex 만료는 `usage.refresh` HTTP 401로 판정한다 — server/routes/codex-usage.js:149, server/routes/codex-usage.js:226-241
- Claude 상태는 cswap 목록의 `usageStatus`를 그대로 쓴다 — server/routes/claude-usage.js:144
- 계정 전환은 러너별 잠금 하나를 수동 전환·자동 복귀가 함께 쓴다 — server/routes/account-switch.js:47, server/routes/account-switch.js:333-358
- 실행 중 attempt가 쓰는 계정 조회(`inUseBeads`)가 이미 있다 — server/routes/account-switch.js:277-322
- 전환 POST 경로는 `/api/claude-account/switch`·`/api/codex-account/switch`다 — server/app.js:193-194
- 서버 전역 활성 계정 설정은 러너별 `default_account`·`accounts`(허용 목록)를 갖는다 — server/limit-policy-settings.js:4, server/limit-policy-settings.js:226-230
- 저장소 고정 계정은 저장소마다 `bd kv` `workspace_exec_accounts`에 있다 — server/workspace-accounts.js:29
- 저장소 한도 정책 허용 목록은 큐 상태의 `provider_limit_policy`에 있다 — server/worker/queue-store.js:696
- 임시 `CODEX_HOME`에서 `codex login --device-auth`를 TTY 없이 실행하면 링크(`https://auth.openai.com/codex/device`)와 15분짜리 일회용 코드를 stdout에 ANSI 색과 함께 찍고 기다린다. 전역 `~/.codex`는 바뀌지 않는다 — 실행: `CODEX_HOME=<tmp> codex login --device-auth </dev/null` (codex-cli 0.162.0, 2026-11-10)
- `codex-auth import <path>`는 같은 계정을 다시 넣으면 `updated`로 갱신한다(요약 문구 `imported`/`updated`/`skipped`) — 실행: `strings codex-auth | grep -i import` (0.3.0-alpha.11)
- 임시 `CLAUDE_CONFIG_DIR`에서 `claude auth login --claudeai`를 tmux 창에서 띄우면 인증 URL(리디렉트 `platform.claude.com/oauth/code/callback`)과 `Paste code here if prompted >` 입력칸이 나온다 — 실행: tmux 분리 세션 캡처 (Claude Code 2.1.322, 2026-11-10)
- `cswap add`는 `CLAUDE_CONFIG_DIR`이 가리키는 프로필에서 신원과 자격을 읽지만, 등록하면서 그 슬롯을 `activeAccountNumber`로 기록한다 — 실제 로그인은 그대로인데 활성 기록만 바뀐다 — ~/GitHub/claude-swap src/claude_swap/switcher.py:3519-3617, switcher.py:661-691
- `cswap session login`은 세션 프로필 전용 로그인을 만들고 슬롯의 저장 자격은 갱신하지 않는다 — ~/GitHub/claude-swap src/claude_swap/session.py:987-1112
- `cswap remove`는 `--yes` 없이 표준 입력에서 `y` 확인을 기다린다 — ~/GitHub/claude-swap src/claude_swap/switcher.py:3981-4065, cli.py:1483
- launchd 서버 환경에는 `LANG`이 없어 tmux 창 이름의 비ASCII 문자가 `_`로 바뀐다, 그래서 창 이름은 ASCII로 짓는다 — 실측 기록 ~/.claude/projects/-Users-isy-macstudio-GitHub-beads-ui/memory/launchd-server-no-lang-tmux-tab-sanitized.md
- 미확인: business 워크스페이스(예: nakkulla2)에서 기기 코드 로그인이 관리자 설정으로 막혀 있는지 — 실제 로그인을 끝까지 해야 알 수 있다
- 미확인: `codex-auth import`가 활성 계정을 바꾸는지, 활성 계정을 다시 넣으면 `~/.codex/auth.json`까지 갱신하는지 — 바이너리에 `auth.json sync` 문구만 보인다. 구현 첫 단계에서 실측한다(§4.2 수용 기준)

## 3. 목표와 비목표

목표

1. 만료 계정 줄의 [재로그인]으로 그 계정의 로그인을 복구하고 카드가 정상 표시로 돌아온다.
2. 러너별 [+ 계정 추가]로 새 계정에 로그인해 목록에 넣는다. 이미 있는 계정으로 로그인하면 그 줄을 갱신한다.
3. [관리]를 켜면 줄마다 [삭제]가 보이고, 확인을 거쳐 그 계정을 목록에서 지운다.
4. 로그인·추가는 지금 활성 로그인을 바꾸지 않는다. 그래서 실행 중인 세션과 Worker에 영향이 없다.
5. 휴대폰에서도 끝까지 된다: 링크를 열어 로그인하고, Codex는 화면의 코드를 입력하고, Claude는 받은 코드를 카드에 붙여 넣는다.

비목표

- 설정 창(계정 탭·활성 계정 탭)에는 버튼을 달지 않는다. 사용량 카드만 고친다.
- 자동 전환에서만 빼기(`cswap disable`)는 두지 않는다 — 활성 계정 허용 목록(UI-32oq)이 같은 일을 한다.
- 삭제 전 백업은 하지 않는다 — 지운 계정은 [+ 계정 추가]로 다시 로그인하면 돌아오고, 토큰이 든 백업 파일을 늘리지 않는다.
- credential 보류 때 Worker가 스스로 재로그인을 시작하는 흐름(UI-s4g1, 보류 중)은 하지 않는다. 다만 로그인 부품은 서버 모듈 하나로 두어 나중에 그 흐름이 부를 수 있게 한다.
- Bead 메타데이터의 계정 핀(`claude_account`·`codex_account`)은 삭제 경고에서 찾지 않는다 — 모든 Bead를 훑어야 해서 비싸고, 지운 계정을 핀한 Bead는 실행 때 기존 계정 해석 오류로 드러난다.

## 4. 설계

### 4.1 로그인 세션 (서버)

서버는 "로그인 세션"을 메모리에 하나씩 든다. 러너당 동시에 하나만 있다(두 번째 시작은 409 `login_in_flight`). 상태는 `starting → awaiting_user → verifying → done | failed | cancelled | expired`다.

- 시작: `POST /api/account-login` `{ provider: 'claude'|'codex', mode: 'relogin'|'add', number? }`. `relogin`은 `number`가 필수이고 시작할 때 목록을 다시 읽어 그 줄의 키를 세션에 고정한다. 응답 `{ ok: true, login_id }`.
- 상태: `GET /api/account-login/:id` → `{ state, url, user_code?, needs_code, result?, error? }`. `user_code`는 Codex 기기 코드, `needs_code: true`는 Claude 붙여넣기 칸을 뜻한다. `result`는 `{ outcome: 'updated'|'added', key, email }`.
- 코드 제출(Claude만): `POST /api/account-login/:id/code` `{ code }`. `awaiting_user`이고 아직 제출 전일 때 한 번만 받는다(두 번째는 409 `code_already_sent`).
- 취소: `POST /api/account-login/:id/cancel`. 프로세스를 끝내고 임시 폴더를 지운다.
- 시간 제한 15분(Codex 기기 코드 유효 시간과 같다). 넘기면 `expired`로 끝내고 정리한다.
- 끝난 세션은 5분 뒤 메모리에서 빠진다. 서버 재시작은 진행 중 세션을 잃고, 시작할 때 서버 상태 폴더 아래 남은 로그인 임시 폴더를 지운다.
- `done`이면 그 러너의 사용량 캐시를 비운다(전환 경로와 같은 `invalidateCache`). 공급자 보류 해제는 기존 프로브가 판정한다 — 로그인 세션은 보류를 직접 풀지 않는다.
- 결정: 로그인·추가는 활성 로그인을 바꾸지 않는 격리 로그인이다 — 전역 `auth.json`이나 Claude 활성 로그인을 거치면 실행 중 세션이 다른 계정으로 바뀔 수 있다.
- 결정: 로그인 세션 전체를 전환 잠금으로 묶지 않는다 — 15분 동안 수동 전환·자동 복귀를 막지 않기 위해서다. Codex는 `codex-auth import`와 그 뒤 목록 재읽기만 러너별 전환 잠금(`acquireSwitchLock`)을 잡는다. Claude는 저장이 `cswap login` 안에서 cswap 자체 파일 잠금으로 직렬화되므로, 서버는 명령이 끝난 뒤 캐시 비우기와 목록 재읽기에만 전환 잠금을 잡는다.

보안

- 서버는 이미 tailnet 주소에만 바인딩된다. 새 경로도 같은 서버에 붙는다.
- 인증 코드, 기기 코드, 로그인 출력은 로그에 쓰지 않는다. 에러로 내보내는 문장은 출력의 마지막 줄을 ANSI를 지우고 200자로 자른 것만이다.
- Claude 코드는 tmux에 `send-keys -l`로 넣고 `Enter`를 따로 보낸다. 끝나면 창을 닫아 스크롤백을 남기지 않는다.
- Codex 임시 `CODEX_HOME`은 서버 상태 폴더 아래 0700으로 만들고, 성공·실패·취소 모두 지운다.

### 4.2 Codex 흐름

1. 임시 `CODEX_HOME`을 만들고 `codex login --device-auth`를 셸 없이 띄운다(stdin은 닫는다).
2. stdout에서 ANSI를 지우고 `https://` 링크와 `XXXX-XXXXX` 꼴 코드를 찾으면 `awaiting_user`로 바꾼다. 10초 안에 못 찾으면 `failed: device_auth_unavailable`.
3. 프로세스가 0으로 끝나면 `verifying`: 임시 `auth.json`의 `id_token` 페이로드(서명 검증 없이 신원 비교용으로만 읽는다)에서 사용자·워크스페이스를 꺼내 계정 키(`user::workspace`)를 만든다.
4. `relogin`이면 그 키가 시작 때 고정한 줄의 키와 같아야 한다. 다르면 가져오지 않고 `failed: identity_mismatch`("<이메일>로 로그인됨 — 다른 계정")로 끝낸다.
5. 전환 잠금을 잡고 `codex-auth import <tmp>/auth.json`을 실행한다. 목록을 다시 읽어 그 키의 줄이 있으면 `done`, `outcome`은 이전 목록에 키가 있었으면 `updated` 아니면 `added`.
6. 0이 아닌 종료는 `failed: login_failed`와 마지막 줄 요약이다. business 워크스페이스에서 기기 코드 로그인이 막혀 있으면 여기서 그 문장이 보이고, 카드는 "Mac 터미널에서 `codex-auth login`" 안내를 덧붙인다.

수용 기준(구현 첫 단계에서 실측): `import`가 활성 계정(`active_account_key`)을 바꾸지 않는다. 바꾸면 `import` 전 활성 키로 `codex-auth switch --json`을 다시 실행해 되돌린다. 활성 계정을 재로그인했을 때 `~/.codex/auth.json`이 새 자격으로 바뀌지 않으면, 같은 잠금 안에서 `codex-auth switch <그 계정> --json`으로 다시 적용한다. 둘 다 실측 결과를 테스트 픽스처로 남긴다.

### 4.3 Claude 흐름과 `cswap login` 계약

Claude 쪽 격리 로그인·신원 확인·저장은 claude-swap이 소유한다(형제 Bead, §6). beads-ui는 그 명령을 tmux 창에 띄우고 URL을 읽고 코드를 넣기만 한다.

`cswap login` 계약 (claude-swap이 지킨다)

- `cswap login <num|email> --json`: cswap이 관리하는 임시 프로필에서 `claude auth login --claudeai --email <그 슬롯 이메일>`을 띄운다. 로그인 뒤 신원(이메일·조직)이 그 슬롯과 같으면 슬롯 자격·설정을 갱신하고 만료 표시를 지운다. 다르면 아무것도 저장하지 않고 0이 아닌 값으로 끝낸다.
- `cswap login --new --json`: 이메일 없이 띄운다. 로그인한 신원이 목록에 없으면 새 슬롯, 있으면 그 슬롯을 갱신한다.
- 두 형태 모두 `activeAccountNumber`도 활성 로그인도 바꾸지 않는다. 단, 대상이 이미 활성 계정이면 활성 로그인에도 새 자격을 넣어 만료가 바로 풀리게 한다.
- 끝나면 임시 프로필과 그 프로필의 키체인 항목을 토큰 폐기 없이 지운다.
- 마지막 줄은 JSON 한 줄이다: 성공 `{ "ok": true, "outcome": "updated"|"added", "number": N, "email": "..." }`, 실패 `{ "ok": false, "error": "<code>", "message": "..." }`. `error`는 적어도 `identity_mismatch`·`login_incomplete`·`account_not_found`.
- `cswap remove <num|email> --yes --json`: 확인 입력 없이 지우고 같은 형식의 JSON 한 줄을 낸다(성공 `{ "ok": true, "removed": { "number": N, "email": "..." } }`).

beads-ui 쪽

1. 서버 전용 tmux 세션(`bdui-login`, 없으면 만든다)에 ASCII 이름 창(`login-claude-<id>`)을 열고 `cswap login …`을 실행한다. 창 폭은 넉넉하게 잡고 `capture-pane -J`로 줄바꿈을 이어 읽는다.
2. `https://`로 시작하는 인증 URL을 찾으면 `awaiting_user`, `needs_code: true`.
3. 코드가 오면 창에 넣고 `verifying`으로 바꾼다.
4. 창의 명령이 끝나면 마지막 JSON 줄을 읽는다. `ok`면 전환 잠금 안에서 사용량 캐시를 비우고 목록을 다시 읽어 `done`, 아니면 `failed: <error>`.
5. 명령 종료는 기존 tmux 런처의 종료 표식 방식을 쓴다(예: `markerWrapper`). 창은 결과를 읽은 뒤 닫는다.

### 4.4 삭제 (서버)

`POST /api/claude-account/remove`·`/api/codex-account/remove` `{ number, key, confirm? }`. 응답 모양은 전환 경로를 따른다.

1. 러너별 전환 잠금을 잡는다(못 잡으면 409 `switch_in_flight`).
2. 목록을 다시 읽어 `number` 줄의 키가 요청 `key`와 같은지 본다. 다르면 `account_changed`(번호가 밀렸다) — 카드는 목록을 새로 읽는다.
3. 막는 조건(확인으로도 못 넘는다): 활성 계정이면 `account_active`, 실행 중 attempt가 쓰면 `account_in_use`와 Bead 목록.
4. 경고 조건(`confirm: true`가 아니면 `account_referenced`와 목록을 돌려준다): 서버 활성 계정 설정의 평소 계정(★)·허용 목록, 등록된 저장소들의 저장소 고정 계정, 저장소 한도 정책 허용 목록. 저장소 kv를 못 읽은 저장소는 `unchecked_repos` 수로 함께 돌려준다(fail-quiet).
5. Codex는 `codex-auth remove <number> --json`, Claude는 `cswap remove <number> --yes --json`. 성공하면 사용량 캐시를 비운다.
6. 지운 계정을 가리키던 설정은 그대로 둔다. UI-32oq의 표시 포맷터가 "찾지 못한 계정"으로 보이고, 평소 계정이 사라지면 복귀할 곳이 없어 자동 복귀가 멈춘다. 경고 문구가 이것을 미리 말한다.

### 4.5 사용량 카드 (화면)

- 섹션 제목 줄 오른쪽에 [+ 계정 추가]와 [관리]. 둘 다 `.op-btn`이고 크기·색은 `docs/design-system.md` 토큰만 쓴다.
- 만료 줄: 상태 문구를 "토큰 만료"로 줄이고 [재로그인]을 단다.
- 로그인 패널(섹션 제목 아래, 카드 안에 한 번에 하나):
  - Codex: "이 링크를 열어 로그인하고 코드를 입력하세요" · 링크(새 탭) · 코드(크게, [복사]) · "기다리는 중…" · [취소].
  - Claude: "이 링크를 열어 로그인한 뒤 받은 코드를 붙여 넣으세요" · 링크(새 탭) · 입력칸 · [확인] · [취소].
  - 상태는 패널이 열린 동안 2초마다 읽는다. 끝나면 패널을 닫고 줄 메시지로 결과를 보인다: "로그인됨 — <이름>"(갱신)·"추가됨 — <이름>"·실패 문장.
- [관리]를 켜면 줄마다 [삭제]. 활성 계정 줄에는 [삭제] 대신 "활성 계정은 지울 수 없음"을 흐리게 보인다. [삭제]를 누르면 서버에 먼저 묻고(`confirm` 없이), 막히면 이유를, 경고면 "평소 계정 · 저장소 2곳 고정" 같은 목록을, 아무것도 없으면 "삭제할까요?"를 같은 확인 줄에 보이고 [삭제]·[취소]를 단다. 항상 한 번은 확인한다.
- 이름은 UI-32oq 표시 포맷터를 쓴다.
- 휴대폰 시트에서도 같은 순서로 보이고, 버튼 줄이 넘치면 다음 줄로 접힌다.

### 4.6 오류 처리

| 상황 | 결과 |
| --- | --- |
| 같은 러너 로그인 진행 중 | 409 `login_in_flight`, 카드는 진행 중 패널로 이동 |
| 도구 없음(`codex`·`cswap`·`tmux`) | `failed: not_found` |
| 기기 코드·URL을 10초 안에 못 찾음 | `failed: device_auth_unavailable` / `login_url_missing` |
| 재로그인 신원 불일치 | `failed: identity_mismatch`, 아무것도 저장 안 함 |
| 15분 초과 | `expired`, 프로세스 종료·정리 |
| 삭제 중 번호 밀림 | `account_changed`, 목록 새로 읽기 |
| 삭제 대상 활성·실행 중 | `account_active` / `account_in_use` |

## 5. 테스트

- 서버 로그인: Codex 출력(ANSI 포함)에서 링크·코드 추출, 신원 불일치 시 `import` 안 함, 성공 시 임시 폴더 삭제, 15분 초과 시 종료·정리, 같은 러너 두 번째 시작 409, 코드 제출은 한 번만·`awaiting_user`에서만, 로그 함수가 코드·출력을 받지 않음, `done` 때 사용량 캐시 비움, 로그인 대기 중에는 전환 잠금이 비어 있고 `import`·목록 재읽기 동안만 잡힘.
- 서버 Claude: tmux 캡처에서 URL 추출(줄바꿈 이음), 코드가 `send-keys -l`로 들어감, 마지막 JSON 줄 해석(성공·`identity_mismatch`), 창 닫힘.
- 서버 삭제: 키 불일치 `account_changed`, 활성·실행 중 차단, 평소 계정·허용 목록·저장소 고정·저장소 정책 경고와 `confirm`으로 진행, 읽지 못한 저장소 수, 성공 시 캐시 비움.
- 카드: 만료 줄 [재로그인], 제목 줄 [+ 계정 추가]·[관리], [관리]가 [삭제]를 토글, 활성 줄은 [삭제] 없음, 확인 줄 세 갈래(차단·경고·없음), Codex·Claude 패널 내용, 결과 메시지.
- 계약 픽스처: §4.2 수용 기준 실측 결과와 `cswap login`·`cswap remove --yes` JSON 예시.

## 6. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | claude-swap | awaited_by_consumer | 다른 저장소(claude-swap rig)의 CLI에 §4.3 계약(`cswap login`·`remove --yes --json`)을 더한다 — 저장소가 달라 한 Bead에 담을 수 없다 | 없음 | claude-swap-3uj |

- 이 Bead(UI-xm29)의 구현은 위 형제 Bead를 `blocks`로 기다린다. Codex 쪽만 먼저 나누지 않는다 — 카드 버튼이 두 러너에 같은 모양이어야 해서 한 번에 착지한다.
- UI-s4g1(보류): §4.1 로그인 세션 모듈을 나중에 부를 수 있다. 이 스펙은 그 흐름을 만들지 않는다.

## 7. 구현 unit 후보

- `server`: §4.1·§4.2·§4.4 로그인 세션 모듈, Codex 흐름, 삭제 경로 — `server/routes/`.
- `server-claude`: §4.3 tmux 구동·URL 회수·코드 주입·JSON 해석 — 형제 Bead 착지 뒤.
- `card`: §4.5 사용량 카드 버튼·패널·확인 줄 — `app/views/usage-meter.js`.

## 결정 (ADR 후보)

- 전제: ADR UI-32oq — 평소 계정(★)·허용 목록·떠남 기록과 복귀 규칙을 그대로 두고, 지운 계정을 가리키는 설정은 표시에서만 "찾지 못한 계정"으로 드러낸다.
- 전제: ADR UI-32oq-2 — 설정 창 탭 구성은 건드리지 않는다.
- 화면에서 하는 로그인·추가는 활성 로그인을 바꾸지 않는 격리 로그인이고, Claude 쪽 격리·신원 확인·저장은 claude-swap(`cswap login`)이, Codex 쪽은 beads-ui가 임시 `CODEX_HOME` + `codex-auth import`로 한다. 되돌리기 어렵다: beads-ui 로그인 세션 모듈, 카드 패널, claude-swap의 새 명령과 그 JSON 계약이 함께 움직인다. 맥락 없이는 놀랍다: `codex-auth login`·`cswap add`가 있는데 쓰지 않는다 — 둘 다 활성 로그인 또는 활성 기록을 바꾼다. 실제 맞교환이 있다: 기존 명령을 그대로 쓰는 단순함과 실행 중 세션 보호 중 보호를 골랐다. 새 주제: 가장 가까운 현재 ADR UI-32oq는 활성 계정 자동 전환 정책과 설정 파일이 소비자이고, 이 결정의 소비자(로그인 세션 모듈·카드 패널·claude-swap CLI)와 겹치지 않는다. `summary`: "화면 로그인·계정 추가는 활성 로그인을 바꾸지 않는 격리 로그인이다 — Codex는 beads-ui가 임시 CODEX_HOME에서 기기 코드 로그인 뒤 codex-auth import로, Claude는 claude-swap의 cswap login이 격리·신원 확인·저장을 맡고 beads-ui는 tmux로 URL을 보이고 코드를 넣기만 하며, 계정 목록에 쓰는 단계만 러너별 전환 잠금을 잡는다" → ADR
- 삭제는 활성·실행 중 계정만 막고 평소 계정·고정·허용 목록은 경고 뒤 허용하며 백업하지 않는다 — 되돌리기 쉽다(서버 판정 한 곳과 카드 문구) → ADR 아님
- 버튼은 사용량 카드에만 둔다 — 되돌리기 쉽다(화면 배치) → ADR 아님
