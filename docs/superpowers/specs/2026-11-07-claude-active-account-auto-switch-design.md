---
scope:
  - server/codex-active-return.js
  - server/claude-active-return.js
  - server/routes/account-switch.js
  - server/routes/claude-usage.js
  - server/worker/scheduler.js
  - server/worker/attach.js
  - server/index.js
  - docs/adr/
---

# 소진된 전역 Claude 활성 계정을 여유 계정으로 자동 전환한다 (UI-btp3)

## 1. 배경

UI-tyc2는 전역 Codex 활성 계정이 소진되면 서버가 여유 계정으로 옮기게 했고, 그 스펙 비목표가 Claude 활성
계정을 뺐다. Claude 쪽은 지금 사람이 `cswap switch`를 눌러야 한다. 그동안 활성 계정으로 도는 대화형 세션,
Hermes, 계정을 지정하지 않은 Worker attempt가 모두 한도 오류로 선다.

사용자 결정(2026-11-07, dotfiles 세션):
- 방식: `cswap auto` 상시 실행이 아니라 beads-ui에 판정을 넣는다 — 저장소별 자동 전환·기다림 정책을 지키기 위해서다.
- 트리거: "90 이 아니라 100까지 채우고 전환하도록 하는게 나을듯".
- 기다림 저장소 네 곳: 보호 규칙을 유지하고 Claude 기본 계정을 unist로 지정한다.
- 전환 대상 여유: 5시간·주간 창이 100% 미만이면 된다.
- 판정 창: 5시간·주간만 본다. 모델별 주간 창은 보지 않는다.

## 2. 검증된 전제

기준 커밋: beads-ui `cc90c986717303da006e4f2bc05ae3cb6ae92bbd`, claude-swap `b575a7dd626ec694c93e5f55e4e52be5b5b196cd`.

전환·판정 코드:
- 수동 전환 경로에 Claude가 이미 있다. `cswap switch <번호> --json`을 실행하고, 공급자별 잠금을 공유하며, 성공 시 예상 계정 번호로 캐시를 무효화한 뒤 전환 구독자에게 알린다 — server/routes/account-switch.js:29-33, :311-336, :351, :380, :384
- Codex 활성 복귀 패스는 잠금 안 확정, 기다림 보호, 소진 구간 1회 보류 알림을 갖추었으나 Codex 전용이다 — server/codex-active-return.js:175-198, :210-295, :329-349, :363-411; server/index.js:230-262
- Codex 패스의 첫 소진 관측은 `subscribeAccountListObservations`에 기대며, Claude 사용량 모듈에는 이런 구독이 없다 — server/index.js:260; `grep -n subscribe server/routes/claude-usage.js` 결과 없음
- Claude 목록의 행 키는 이메일이고 `sessionLoginOwn`과 창(`5h`, `7d`, 모델 이름)을 싣는다. 서버 캐시는 30초다 — server/routes/claude-usage.js:18, :91, :100, :183-189, :503
- 수동 전환의 계정 사용 중 확인은 Claude 계정이 `sessionLoginOwn`이면 충돌로 보지 않는다 — server/routes/account-switch.js:271-276
- Worker의 Claude 후보 선택은 보고된 모든 창이 5h ≤ 80%, 그 밖 ≤ 90%인 계정을 고른다. 이 규칙은 이번에 바꾸지 않는다 — server/worker/scheduler.js:2096, :2146-2163; server/worker/codex-switch-candidate.js:32-34
- 전환 구독자는 attach 저장소마다 공급자 재평가(기다림 추종 포함)를 부른다 — server/worker/attach.js:3472-3484
- 계정 해석은 Bead 핀 → 저장소 기본 → 활성 로그인 순이다 — server/worker/scheduler.js:1326-1342
- 계정 없는 Claude attempt는 `claude`를 바로 실행하고, 계정이 있으면 `cswap run <계정> --share-history`로 실행한다 — server/worker/runner/claude.js:908-910
- 저장소 기본 계정은 kv `workspace_exec_accounts`에 있고, 쓰기는 `set-workspace-accounts`가 기존 값과 합친다 — server/workspace-accounts.js:30, :166; server/ws/session-defaults-handlers.js:463; server/ws/connection.js:491
- 정책이 없는 저장소의 기본값은 `switch`·빈 허용 목록이다 — server/worker/queue-store.js:5030
- 계정 없는 Claude attempt의 오류는 정산 시점의 활성 계정에 귀속되고 그 계정의 `provider_hold` 대상이 된다. 그래서 전환 전 요청의 거절이 전환 뒤 정산되면 새 활성 계정이 보류된다 — server/worker/scheduler.js:2009-2051, :2980-2987, :7186
- `cswap switch --json` 결과의 `switched`·`from`이 전환 결과에 실려 있고, 수동 핸들러도 `performAccountSwitch`를 거친다 — server/routes/account-switch.js:220-228, :429
- Codex에는 소진을 관측할 전용 읽기가 둘 있다(크레딧 폴러, 후보 조회 API). Claude에는 그런 경로가 없고, 목록 읽기는 사용량 화면과 Worker 경로뿐이다 — server/index.js:217; server/app.js:168, :196; server/worker/provider-health.js:626, :899, :926; server/worker/attach.js:2539; `grep -rln 'createClaudeCreditPoller\|claude.*switch-candidate' server` 결과 없음
- 스케줄러와 이 패스는 저장소 기본 계정을 kv에서 직접 읽으므로 `bd kv set`이 바로 반영된다. 모니터 일괄 창만 자체 캐시를 갖는다 — server/worker/attach.js:3495-3504; server/ws/monitor-handlers.js:283-292
- ADR UI-tyc2는 "자동 전환 모드의 동작과 실행 중 attempt는 활성 계정 변경에 반응하지 않는다"를 승계한다 — docs/adr/UI-tyc2-codex-active-account-return.md:203, :311-312

cswap 동작:
- 사용량 API에 시간당 약 28~30회 예산이 있어, `cswap list`를 자주 불러도 180초보다 어린 값은 API 없이 저장본으로 답한다. 정상 조회의 활성 계정 갱신 간격 상한은 300초, 대기 계정은 600초, 지터 ±10%다 — claude-swap src/claude_swap/poll_policy.py:3-6, :55-58, :75, :92, :94, :103
- 최근 429가 있으면 간격이 최대 1,800초까지 늘고, 백오프 중에는 조회하지 않는다 — claude-swap src/claude_swap/poll_policy.py:138, :246-252; usage_store.py:1286-1288
- `cswap list`에는 API 조회를 강제하는 옵션이 없다 — `grep -E '"--(refresh|fresh|no-cache)' src/claude_swap/*.py` 결과 없음
- 창이 리셋되면 저장본은 낡은 값으로 처리된다 — claude-swap src/claude_swap/usage_store.py:102-103
- 전환은 Claude Code의 자격 잠금을 잡고 쓰며, macOS의 실행 중 세션은 약 30초 뒤 새 계정을 읽고, 새 계정의 첫 메시지는 캐시 재생성으로 사용량을 더 쓸 수 있다 — claude-swap README.md:211-212, :221
- 독립 로그인 표식이 있는 세션 프로필의 토큰 계열은 프로필만 소유한다 — claude-swap docs/adr/0001-session-own-login-lineage.md

실측(2026-11-07 KST):
- 계정은 3(hanmail)·4(unist) 둘이고 둘 다 `sessionLogin: own`이다. Fable 창은 4에만 있다 — `cswap list --json`(이메일 도메인만 출력)
- Claude 정책은 switch 12·wait 5다. wait 중 thalamus만 Claude 기본 계정(unist)이 있고, claude-swap·design-system·oliveyoung·train_bot은 없다 — `~/.local/state/bdui/*/queue.json`, `bd kv get workspace_exec_accounts`
- Claude attempt 기록의 72%(578건 중 419건)가 계정 없이 떴고, 조사 시점 running 2건도 그랬다. 확인한 switch 저장소 10곳에 Claude 기본 계정이 없다(beads·Hippocampus는 경로를 찾지 못해 미확인) — 같은 파일들, `bd kv get`
- 위 네 저장소의 비종료 attempt는 oliveyoung의 Codex attempt 1건뿐이고 그 Bead `oliveyoung-hsg`는 closed다 — `bd show oliveyoung-hsg --json`

Hermes(dotfiles):
- 기본 공급자는 `claude-subscription-directsdk-experimental`이고 그 뒤 대체 공급자가 `openai-codex`다 — dotfiles src/hermes/config.yaml:4-7
- 플러그인은 요청마다 `claude -p`를 새로 띄우고, `~/.hermes/config.yaml`·gateway plist·`~/.hermes/.env`에 설정 폴더나 다른 로그인 지정이 없다 — `~/.hermes/plugins/claude-subscription-directsdk-experimental/directsdk.py:687`, `grep -c`(키 이름만 집계)
- 미확인: 활성 계정이 실제로 바뀐 뒤 Hermes 응답이 새 계정으로 나가는지 — 전역 계정을 바꾸는 실험이라 설계 단계에서 하지 않았다. 코드 판독으로는 다음 요청부터 따른다.
- 미확인: `cswap list` 경로에서 활성 계정 갱신 간격이 60초(`URGENT_INTERVAL_S`)까지 당겨지는지 — 이 설계는 당겨지지 않는 경우를 기준으로 삼는다.
- 미확인: 한도에 걸리는 순간 API가 보고하는 값이 언제나 정확히 100인지 — 99에서 멈추면 그 구간은 전환하지 않고 수동 전환과 Worker 보류 경로가 그대로 남는다.

## 3. 목표와 비목표

목표:
- 전역 활성 Claude 계정의 5시간 또는 주간 창이 100%이고, 자동 전환 정책 저장소가 활성 계정과 함께 허용한
  계정 중 5시간·주간 창이 모두 100% 미만인 계정이 있으면, 서버가 전역 활성 계정을 그 계정으로 바꾼다.
- 기다림 정책의 약속 — 자동으로 다른 계정을 고르지 않는다 — 을 이 전환이 깨지 않는다.
- Codex 활성 복귀의 동작은 바뀌지 않는다.

비목표:
- 100% 전 선제 전환. 사용자가 100%까지 채우기로 정했다.
- 모델별 창으로 인한 전환. Fable 창만 찬 경우 그 모델 세션은 리셋까지 실패한다.
- Worker 후보 선택 규칙(80/90)과 Worker attempt의 계정 이동 변경.
- Hermes 설정·대체 공급자 변경과 dotfiles 변경.
- 두 계정이 모두 소진됐을 때의 새 처리. 지금처럼 리셋을 기다린다.

## 4. 설계

### 4.1 정한 갈림

- 결정 — **트리거**: 활성 계정의 `5h` 또는 `7d` 창이 `pct ≥ 100`일 때만 바꾼다 (대안: 90% 선제; 이유: 사용자 결정이고, 한도 전에는 실행 중 세션을 옮기지 않아 캐시 재생성 비용이 생기지 않는다).
- 결정 — **후보**: 허용 목록 안에서 상태 `ok`, 현재 계정 아님, `provider_hold` 대상 아님이고, 5h·7d 중 보고된 창이 하나 이상이며 그 창이 모두 100% 미만인 계정이다. 주간 사용률이 낮은 순, 같으면 번호 순으로 고른다 (대안: Worker 기준 80/90; 이유: 활성 계정은 이미 요청이 실패하므로 85% 계정으로라도 옮기는 쪽이 낫다. 대안: 모델 창 포함; 이유: 사용자 결정).
- 결정 — **정책 기준**: Codex와 같다. switch 정책이고 Claude 허용 목록에 활성 계정과 후보가 함께 있는 저장소가 있을 때만 바꾸고, 저장소는 작업 공간 키 오름차순으로 보아 처음 나온 후보를 쓴다. 활성이 어느 switch 허용 목록에도 없으면 바꾸지 않는다.
- 결정 — **기다림 보호**: Codex와 같다. Claude 정책이 `wait`이고 Claude 저장소 기본 계정이 없는 등록 저장소가 하나라도 있으면 바꾸지 않고, 소진 구간마다 `ops` 보류 알림을 한 번 보낸다. 기본 계정 읽기 실패는 없는 것으로 본다 (대안: 보호 규칙 제외; 이유: 사용자가 기다림 약속 유지를 골랐다).
- 결정 — **운영 설정 1회**: claude-swap·design-system·oliveyoung·train_bot의 Claude 저장소 기본 계정을 unist로 둔다. 기존 Codex 기본 계정은 그대로 둔다. 이후 네 저장소의 새 Claude 실행은 활성 계정과 무관하게 unist로 돌고, unist가 차면 리셋까지 기다린다. 적용 순서는 §4.6이다.
- 결정 — **계정 없는 실행은 막지 않는다**: Codex의 `accountless_run` 거름을 Claude에 두지 않는다 (대안: Codex와 동일; 이유: Claude attempt 대부분이 계정 없이 떠서 전환이 거의 일어나지 않고, 트리거가 100%라 그 실행은 이미 새 요청을 못 보내며, 전환은 자격 잠금을 잡고 쓴다).
- 결정 — **전환 직후 오류는 직전 계정에 귀속한다**: Claude 전환이 성공하고 `switched`가 참이면(수동·자동 모두) 서버가 `{from, to, at}`을 메모리에 남긴다. 계정 없는 Claude attempt의 오류를 정산할 때 현재 활성이 `to`이고 `at`에서 120초 안이면, 활성 대신 `from`의 계정과 행을 쓴다. `from`을 알 수 없거나 120초가 지나면 지금처럼 활성 계정이다 (대안: 아무것도 안 함; 이유: 3의 거절이 전환 뒤 정산되면 여유 계정 4가 보류되어 새 디스패치가 막힌다. 대안: attempt에 시작 계정 기록; 이유: 전환 뒤 새 계정에서 난 오류를 옛 계정에 잘못 귀속한다). 120초는 macOS 자격 캐시 약 30초에 프로세스 종료·정산 시간을 더한 여유다. 잘못 귀속돼도 이미 소진된 `from`에 보류가 붙을 뿐이라 긴 쪽을 택했다. 서버 재시작으로 기록이 사라지면 그 구간은 지금 동작으로 돌아간다.
- 결정 — **실행 중 계정 거름**: `running` attempt가 `claude_account`로 쓰는 계정은 후보에서 뺀다. 단 그 계정이 `sessionLoginOwn`이면 빼지 않는다 — 토큰 계열이 프로필 소유라 충돌하지 않는다(수동 전환 확인과 같은 기준).
- 결정 — **상시 관측**: Claude 패스는 서버가 도는 동안 60초 주기로 캐시 목록을 읽는다 (대안: Codex처럼 소진 관측 뒤에만 주기; 이유: §2대로 Claude 목록 읽기는 사용량 화면과 Worker 경로뿐이라 둘 다 쉬면 소진을 관측할 곳이 없다). `cswap`이 자체 간격을 지키므로 사용량 API 호출은 늘지 않는다.
- 결정 — **왕복 방지 없음**: 쿨다운을 두지 않는다. 전환에는 활성 100%와 대상 100% 미만이 함께 필요하고, 사용량은 리셋 전까지 줄지 않으므로 두 계정이 서로 번갈아 전환되지 않는다.
- 결정 — **수동 선택 기록 없음**: Codex와 같다. 사람이 소진 계정을 일부러 활성으로 두려면 그 계정을 switch 허용 목록에서 뺀다.

### 4.2 판정 패스

Codex 패스와 같은 순서를 쓴다. 1) 활성 행이 없거나 대상 창이 100% 미만이면 끝. 2) 잠금이 잡혀 있으면 이번 판정을 버린다. 3) 큐 스냅샷으로 4.1을 판정한다. 4) 전환이 나오면 잠금을 잡고, 서버 캐시를 건너뛴 `cswap list`를 다시 읽고 정책·보류·실행 중 attempt·기본 계정을 다시 읽어 판정한다. 5) 여전히 전환이면 수동 전환과 같은 `performAccountSwitch`로 실행한다(캐시 무효화, `notifyAccountSwitched('claude')`). 6) 패스는 한 번에 하나만 돈다.

- 결정 — **흐름 공유**: 잠금·확정·알림 순서는 Codex 패스와 한 구현을 공유하고, 공급자별 입력(대상 창, 후보 선택, 기본 계정 키, 계정 없는 실행 거름, 주기 방식, 알림 문구)만 다르게 넘긴다 (대안: 파일 복제; 이유: 경합 처리가 두 벌로 갈라지면 한쪽만 고쳐진다). 예: `createActiveReturn(provider_rules)`와 Claude 규칙 모듈.
- 확정 단계의 새 읽기는 `cswap`의 저장본일 수 있다. API 조회를 강제하지 않는다 — 시간당 예산을 소진하면 최대 한 시간 막힐 수 있기 때문이다.

### 4.3 소비자에게 생기는 일

| 소비자 | 전환 뒤 |
| --- | --- |
| 대화형 Claude 세션(전역 로그인) | 약 30초 안에 새 계정. 첫 메시지는 사용량을 더 쓸 수 있음 |
| Hermes | 다음 요청부터 새 계정 |
| 계정 없는 Worker attempt | 새 디스패치는 새 계정. 실행 중인 프로세스도 자격을 다시 읽으면 새 계정을 쓴다. 스케줄러는 전환에 반응하지 않으며 ADR 조항은 그대로다. 전환 직후 정산되는 오류만 직전 계정에 귀속한다(§4.1) |
| `cswap run` Worker attempt | 영향 없음 |
| 기본 계정이 있는 기다림 저장소 | 영향 없음. 전환 구독자가 재평가를 부르지만 해석 계정이 같다 |

관측 지연: 정상 조회라면 100%에 닿은 뒤 전환까지 최악 약 7분이다(사용량 갱신 330초 + 서버 캐시 30초 + 주기 60초). 사용량 API가 429를 내거나 조회 실패가 반복되면 간격이 30분까지 늘 수 있어 상한을 보장하지 않는다. 그동안 활성 계정의 요청은 한도 오류로 실패하고, Hermes는 Codex로 넘어갈 수 있으며, Worker는 기존 보류 경로를 탄다.

### 4.4 보이는 것

새 라벨·칩·버튼은 없다. 바꾸면 Worker 알림기로 `ops` 알림 하나를 보내고 서버 로그에 같은 내용을 남긴다.

- 전환: `🔁 Claude 활성 계정 자동 전환 — 계정 #3 → 계정 #4` / `#3 5h 100% · 실행 중 세션도 곧 새 계정을 씁니다`
- 보류: `⏸ Claude 활성 계정 자동 전환 보류 — 기다림 저장소 <이름>이 활성 로그인을 씀` / `그 저장소에 Claude 기본 계정을 정하면 다음 판정부터 전환합니다`

### 4.5 오류와 경계

- 목록 읽기 실패·`cswap` 없음 → 판정하지 않고 다음 주기에 다시 본다.
- 창 정보 없는 활성 행 → 소진이 아니다. 창 정보 없는 후보 → 후보가 아니다.
- `cswap switch` 실패·시간 초과·출력 이상 → 로그만 남기고 다음 주기에 다시 본다. 알림은 보내지 않는다.
- 저장소 정책 읽기 실패 → 그 저장소는 기준에서 빠진다.
- 후보의 값이 낡아 실제로는 100%였다면 → 다음 판정에서 새 활성 기준으로 다시 본다.
- 서버 재시작 → 타이머가 다시 돌고 보류 알림이 소진 구간당 한 번 더 나갈 수 있다.
- 범위는 beads-ui 서버가 도는 Mac의 로그인뿐이다. 다른 머신의 Claude 로그인은 바뀌지 않는다.

### 4.6 적용 순서

코드 머지와 설정은 서로 독립적이지만, 먼저 설정해야 배포 뒤 첫 판정이 헛 보류 알림을 내지 않는다. 구현 실행자가 PR 전달 전에 Mac Studio에서 아래를 차례로 한다.

1. 계정 키 해석: `cswap list --json`에서 이메일 도메인이 `unist.ac.kr`인 행이 정확히 하나인지 보고 그 `email`을 쓴다. 아니면 멈추고 보고한다.
2. 저장소 해석: 네 저장소를 `$HOME/GitHub/<이름>`에서 찾고 `.beads/`가 있는지 본다. 하나라도 없으면 쓰기 전에 멈추고 보고한다.
3. 저장소마다: `bd -C <저장소> kv get workspace_exec_accounts`로 현재 값을 읽고, `claude_account`만 넣어 합친 JSON(`schema`·`codex_account` 유지)을 `bd -C <저장소> kv set workspace_exec_accounts <JSON>`으로 쓴 뒤, 다시 읽어 `claude_account`와 기존 `codex_account`를 확인한다. 이미 같은 값이면 쓰지 않는다.
4. 완료 보고서에 저장소별 확인 결과를 남기고 PR을 전달한다.
5. PR 머지 뒤 기존 `[deploy]`(`repo-ops/script/deploy`)가 설치·재시작·소스 SHA·HTTP 확인을 맡는다. 추가 수동 단계는 없다.

중단과 재개: 3번은 저장소별로 독립이고 다시 실행해도 결과가 같으므로 1번부터 다시 돌리면 된다. 일부만 적용된 채 배포되면 남은 저장소가 기다림 보호에 걸려 전환이 멈추고 보류 알림이 그 이름을 알려 준다 — 전환이 일어나지 않는 쪽으로 멈춘다. 되돌리려면 `claude_account` 키만 지운다.

## 5. 테스트와 수용 기준

공통: 활성 3(5h 100%, 7d 10%), 4(5h 0%, 7d 10%), 둘 다 `sessionLoginOwn`, beads-ui 정책 switch 허용 [3, 4], 실행 중 attempt 없음.

1. 공통 조건 → 4로 전환, 예상 번호로 캐시 무효화, `notifyAccountSwitched('claude')`, ops 알림 1회.
2. 활성 3의 7d가 100%이고 5h가 10% → 전환.
3. 3이 99% → 전환 없음.
4. 3의 모델 창만 100%, 5h·7d는 100% 미만 → 전환 없음.
5. 4의 5h가 99% → 전환. 4의 5h가 100% → 전환 없음, 알림 없음.
6. 4의 모델 창이 100%이고 5h·7d는 100% 미만 → 전환.
7. 3을 허용한 switch 저장소가 없음(wait이거나 허용 [4]만) → 전환 없음.
8. switch 저장소 A는 [3]만, B는 [4]만 허용 → 전환 없음.
9. 기본 계정 없는 Claude `wait` 저장소가 있음 → 전환 없음, 소진 구간에 보류 알림 1회. 그 저장소에 Claude 기본 계정이 있으면 → 전환. Claude 기본 계정 읽기 실패 → 전환 없음.
10. 계정 없이 도는 `running` Claude attempt가 있음 → 전환(Codex의 거름과 다르다).
11. 4를 `running` attempt가 쓰고 4가 `sessionLoginOwn`이면 → 전환. `sessionLoginOwn`이 아니면 → 4 제외, 다른 후보가 없으면 전환 없음.
12. 새로 읽은 목록에서 3이 100% 미만이거나 활성이 4로 바뀌어 있음 → 전환 없음.
13. 수동 전환 진행 중 → 전환 없음. 자동 패스가 잠금을 쥔 동안 수동 요청은 409 `switch_in_flight`. `cswap switch` 실패 → 알림 없음, 다음 주기에 재판정.
14. 소진이 아니어도 60초 주기가 캐시 목록을 읽고, 목록 읽기 실패에는 판정하지 않으며 타이머가 유지된다.
15. 3과 4가 번갈아 전환되지 않는다: 3→4 전환 뒤 3이 100%로 남고 4가 100%가 되면 전환 없음, 3이 리셋된 뒤에야 4→3.
16. Codex 활성 복귀의 기존 테스트가 수정 없이 통과한다.
17. 운영 설정: 네 저장소의 `bd kv get workspace_exec_accounts`에 unist `claude_account`가 있고 기존 `codex_account`가 그대로다.
18. 3→4 전환(`switched: true`) 뒤 120초 안에 계정 없는 Claude attempt의 한도 오류를 정산 → 보류 대상은 3이고 4에는 보류가 없다. 수동 전환 뒤에도 같다.
19. 전환 뒤 120초가 지나 정산, `switched: false`, 또는 전환 실패 → 지금처럼 활성 계정에 귀속한다. `claude_account`가 있는 attempt는 시점과 무관하게 자기 계정에 귀속한다.

Test scope:
- seam: Claude 판정 패스 — `server/claude-active-return.test.js` (기준 1~15, 새 파일이라 구현 전 실패)
- seam: 전환 기록과 잠금 — `server/routes/account-switch.test.js` (기준 13, 18·19의 기록 조건; 기록 동작은 구현 전 실패)
- seam: 전환 직후 오류 귀속 — `server/worker/scheduler.test.js` (기준 18·19; 기준 18은 구현 전 4가 보류되어 실패)
- 회귀 보호(RED 아님): `server/codex-active-return.test.js` (기준 16, 테스트 파일 수정 금지)

검증: 위 네 테스트 파일, 그다음 `npx vitest run --reporter=dot`, `npm run tsc`, `npm run lint`, `npx prettier --check <변경 파일>`. 운영 설정은 §4.6대로 PR 전달 전에 적용하고 기준 17을 readback한다.

## 6. 경계·후속

형제·선행 Bead 없음.

- 관찰: 배포 뒤 첫 실제 전환에서 ops 알림과 Hermes 응답 계정을 확인한다 — 한도 도달을 기다려야 하므로 완료 조건에 넣지 않는다.
- 관찰: `cswap menubar`의 `autoswitch` 설정을 켜면 이 패스와 정책 밖에서 경쟁한다 — 지금 꺼져 있고 사용자가 고른 방식이 아니다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-tyc2 — Codex 활성 복귀, 정책 기준, 기다림 보호의 형태를 Claude에 같은 방식으로 적용하고 "실행 중 attempt는 활성 계정 변경에 반응하지 않는다"를 유지한다.
- 전제: ADR claude-swap/0001 — 독립 로그인 계정은 사용 중이어도 토큰 충돌 후보로 보지 않는다.
- 전역 활성 Claude 계정의 5h·7d 창이 100%이면 서버가 switch 저장소 허용 목록 안의 100% 미만 계정으로 바꾸고, 기본 계정 없는 기다림 저장소가 있으면 바꾸지 않으며, 계정 없는 실행은 막지 않되 전환 직후 그 실행의 오류는 직전 계정에 귀속하고, 상시 관측한다. ① 되돌리기 어려움: 공유 로그인(Keychain)을 서버가 스스로 바꾸고 대화형 세션·Hermes·계정 없는 Worker attempt·보류 귀속·기다림 추종이 함께 그 결과를 받는다. ② 맥락 없이는 놀라움: 실행 중 세션의 계정이 바뀌고, Codex와 달리 계정 없는 실행이 있어도 전환하며, Worker의 80/90과 다른 100% 후보 기준을 쓴다. ③ 대안 실재: `cswap auto`, 90% 선제, 80/90 후보, 모델 창 포함, 보호 규칙 제외. UI-tyc2와 소비자(활성 복귀 패스·전환 잠금·기다림 추종)가 같으므로 재진술이다 — `summary`: "Codex 자동 전환 후보는 허용 목록의 사용자 순서로 창 여유 계정을 먼저 고르고 반응 전환에서만 계정별 크레딧 허용·하루 상한(다음 선택만 막음) 안의 크레딧 계정을 고르며, 창이 소진된 계정으로 도는 Codex 실행은 preempt_pct와 무관하게 창 여유 계정이 생기면 그 계정으로 옮기고, 전역 활성 Codex 계정이 소진되면 활성과 후보를 함께 허용한 switch 저장소가 있을 때만 서버가 창 여유 계정으로 바꾸되 Codex 기본 계정 없는 기다림 저장소가 있거나 계정 없이 도는 실행이 있으면 바꾸지 않고, 전역 활성 Claude 계정의 5시간·주간 창이 100%이면 같은 저장소 기준으로 두 창이 모두 100% 미만인 계정으로 바꾸되 Claude 기본 계정 없는 기다림 저장소가 있으면 바꾸지 않고 계정 없는 실행은 막지 않되 전환 직후 정산되는 그 실행의 오류는 직전 계정에 귀속하며, 크레딧 설정은 서버 전역이고 세션은 같은 규칙의 후보 조회 API를 쓰고, 세션이 맡긴 다른 러너 리프의 계정 한도로 끝난 attempt는 그 리프 계정 보류의 교차 멤버로 전환·기다림 추종 없이 해제 뒤 자기 러너 계정 규칙으로 재개한다 — 나머지 조항은 UI-np4t 그대로다" → ADR, supersede UI-tyc2
- 네 저장소의 기본 계정을 unist로 두는 일 — 운영 설정값(되돌리기 쉬움) → ADR 아님
- 60초 주기와 7분 지연 추정 — 기본 제외 목록(숫자 한도) → ADR 아님
