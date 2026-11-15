---
scope:
  - server/worker/runner/guard-pre-tool.js
  - server/worker/runner/guard-events.js
  - server/worker/attach.js
  - server/worker/runner/codex.js
  - server/worker/runner/session.js
  - server/worker/session-monitor.js
  - server/worker/scheduler.js
  - server/worker/guard-hook.js
  - server/worker/codex-account-home.js
  - server/worker/queue-store.js
---

# UI-zoig — Codex 가드 훅 로드 경고를 실제 호출 표지로 판정한다

## 1. 목표

Codex로 실행한 Worker 시도마다 `codex_hook_not_loaded` 가드 경고가 무조건 찍힌다. 이 경고는 훅이 실제로 로드됐는지와
무관해서 정보가 없다. 이 설계는 가드 스크립트가 실제로 호출됐는지를 그 스크립트가 남긴 기록으로 판정해, 호출 흔적이 없는
시도에만 경고가 남게 한다. 어느 경우에도 세션은 멈추지 않는다.

이 문서는 설계와 리뷰 대상이며 구현 진입 승인을 대신하지 않는다.

## 2. 검증된 전제

기준 커밋: `8a11e9c10087bf8c869105af38c8fc39e8a9a543`.

- Codex 러너는 시작 이벤트(`thread.started`)를 받을 때마다 조건 없이 `codex_hook_not_loaded` 경고를 만든다. 주석은 시작
  이벤트와 문서화된 훅 출력으로는 로드를 증명할 수 없어 진단을 남긴다고 적는다 — `server/worker/runner/codex.js:197`.
- 가드 스크립트는 거부할 때와 스크립트 오류일 때만 이벤트 로그에 줄을 남기고, 허용한 호출은 아무것도 남기지 않는다 —
  `server/worker/runner/guard-pre-tool.js:35`, `server/worker/runner/guard-pre-tool.js:48`.
- 가드 이벤트 감시기는 `guard_denied`·`guard_warning` 두 종류만 소비하고, 바이트 오프셋으로 재시작 뒤 재생을 중복 없이
  처리한다 — `server/worker/runner/guard-events.js:22`, `server/worker/runner/guard-events.js:7`.
- 시도별 Codex 홈은 `hooks.json`의 `PreToolUse`에 가드 그룹을 더하고 그 그룹의 신뢰 해시를 `config.toml`에 쓴다. 그룹의
  matcher는 `Bash`이고 제한 시간은 10초다 — `server/worker/codex-account-home.js:91`,
  `server/worker/codex-account-home.js:134`, `server/worker/guard-hook.js:89`, `server/worker/guard-hook.js:94`.
- 시도별 홈 준비가 실패하면 같은 사유의 경고를 이미 기록한다 — `server/worker/scheduler.js:16423`.
- 일반 설치 경로는 pre-push 훅과 함께 실행 전 훅 스크립트를 설치한다 — `server/worker/guard-hook.js:596`.
- Codex 스트림에서 셸 명령은 시작과 완료 이벤트로 오고, 러너는 완료 이벤트를 소비하지 않고 버린다 —
  `server/worker/runner/codex.js:206`, `server/worker/runner/codex.js:231`.
- Codex 어댑터에는 실행 전 환경 프로브가 없어 `guard_mirror`가 `absent`로 기록된다 —
  `server/worker/runner/session.js:439`.
- 서버 재시작 뒤에는 세션 감시기가 가드 이벤트 감시를 다시 붙인다 — `server/worker/session-monitor.js:898`.
- 현행 ADR은 훅 로드 흔적이 없는 Codex 세션에 `guard_warning`(`codex_hook_not_loaded`)만 남기고 세션을 죽이지 않도록
  정한다 — `docs/adr/UI-d9c1-limit-policy-under-limit-candidates.md:545`,
  `docs/adr/UI-d9c1-limit-policy-under-limit-candidates.md:550`.
- 2026-11-05~11-15 Codex 디스패치 100건 가운데 93건에 이 경고가 찍혔다 — 각 저장소의
  `~/.local/state/bdui/<slug>/beads/<ID>/events.jsonl`에서 `kind=guard_warning`을 시도별로 센 결과.
- 같은 기간 Codex 세션의 stderr에는 실행 전 훅이 명령을 막은 기록이 7건 있다. 모두 dotfiles가 설치한 훅의 문장이고
  Worker 가드 스크립트의 것은 없다 — 세션 `*.stderr.log`에서 `blocked by PreToolUse hook`을 검색한 결과.
- 시도별 Codex 홈의 `PreToolUse`에는 dotfiles 훅 그룹 여섯 개가 matcher 없이, Worker 가드 그룹 하나가 matcher `Bash`로
  등록돼 있다. matcher 없는 dotfiles 훅(`codex-impl-gate`, `bd-create-guard` 등)은 Codex 셸 명령을 실제로 막은 기록이 있다 —
  `~/.local/state/bdui/beads-ui-c81f88687c6d/codex-attempt-homes/UI-zxst-1794474697798-2/hooks.json`을 읽은 결과와 위 stderr 검색.
- 가드 그룹은 러너 이름을 받아 만들고, Codex 홈은 `codex`로 부른다 — `server/worker/guard-hook.js:87`,
  `server/worker/codex-account-home.js:87`.
- 서버 재시작 뒤 재부착은 실행 로그의 현재 줄 경계부터 감시를 이어 간다 — `server/worker/attach.js:2967`,
  `server/worker/attach.js:2985`.
- 세션 레인 시도는 headless 실행 대신 대화형 창으로 열려 러너의 실행 스트림을 거치지 않는다 —
  `server/worker/scheduler.js:16186`, `server/worker/scheduler.js:15905`.
- 미확인: Worker가 시도별 홈에 주입한 가드 스크립트가 Codex 세션에서 실제로 호출되는지 — 허용한 호출이 기록을 남기지 않아
  지금은 관측할 수단이 없다. matcher `Bash`가 Codex의 셸 도구에 맞는지도 확인하지 못했다.

## 3. 설계

### 3.1 호출 표지

가드 스크립트는 호출될 때마다, 판정을 하기 전에 시도의 가드 훅 폴더에 "호출됨" 표지 파일이 있는지 보고 없으면 배타적으로
만든다. 표지 파일이 로드 증거다. 파일에는 러너 이름과 처음 만든 시각을 쓴다.

- 표지는 스크립트가 도구 호출에 답하기 전에 생기므로, 그 호출이 허용한 명령이 완료됐을 때는 표지가 이미 있다. 두 호출이
  동시에 와도 먼저 만든 쪽의 표지를 다른 쪽이 그대로 본다. 그래서 어느 명령 완료 시점에서도 표지 존재만 확인하면 된다.
- 표지를 만드는 일은 허용·거부 판정과 무관하다. 판정 결과, 거부 문장, 종료 코드는 지금과 같다.
- 표지를 만들지 못해도 도구 호출을 막지 않는다. 기존 거부·오류 기록과 같은 규칙이다.
- 스크립트는 두 러너가 함께 쓰므로 Claude 시도에도 표지가 생긴다. 판정에는 Codex 시도의 표지만 쓴다.
- 표지는 시도의 가드 훅 폴더에 남아 서버 재시작 뒤에도 그대로 읽힌다.

결정: 로드 증거는 가드 스크립트가 만든 표지 파일 자체다 (대안: 시도 시작 때 탐침 명령을 세션에 넣기 / Codex stderr의 훅 문장
읽기 / Codex CLI의 훅 이벤트 읽기 / 이벤트 로그의 "호출됨" 줄; 이유: 탐침은 세션 프롬프트와 모델 동작에 기대고, stderr 문장은
차단이 있을 때만 나오며 어느 훅의 것인지 가릴 수 없고, 실행 스트림에는 훅 이벤트가 없다. 로그 줄은 동시 호출에서 표지 생성과
기록 사이에 다른 호출이 먼저 끝나면 증거가 늦게 보인다. 배타적 생성은 그 자체로 원자적이다).

### 3.2 Codex 가드 그룹의 matcher

Codex 시도별 홈에 넣는 가드 그룹은 matcher를 두지 않는다. Claude 설정의 그룹은 지금처럼 matcher `Bash`다.

- matcher 없는 dotfiles 훅이 Codex 셸 명령마다 불리는 것은 관측됐다(§2). matcher `Bash`가 Codex 셸 도구 이름과 맞는지는
  확인되지 않았다. matcher를 없애면 Codex가 훅을 부르는 모든 도구 호출에서 스크립트가 불린다.
- 스크립트는 `tool_input.command`가 문자열일 때만 판정하므로, 셸이 아닌 도구 호출은 표지만 만들고 그대로 허용한다.
- 그룹이 바뀌므로 신뢰 해시도 바뀐 그룹으로 계산한다. 계산 방식은 지금과 같다.

결정: Codex 가드 그룹은 matcher 없이 등록한다 (대안: Codex 셸 도구 이름을 실측해 matcher를 맞추기; 이유: 관측된 동작과 같은
등록 형식을 쓰면 판정 대상과 훅 호출 대상이 어긋나지 않고, 도구 이름이 Codex 버전에 따라 바뀌어도 영향이 없다).

### 3.3 무조건 경고 제거

`thread.started`는 더 이상 경고를 만들지 않는다. 세션 ID 추출 등 시작 이벤트의 다른 쓰임은 그대로다.

### 3.4 미로드 판정

Codex 시도에서 셸 명령이 처음 **완료**된 시점에 그 시도의 표지 파일이 있는지 확인해 판정한다.

- 표지가 있으면 아무것도 남기지 않는다.
- 표지가 없으면 `codex_hook_not_loaded` 경고를 한 번 남긴다. 사유 코드와 기록 경로(타임라인 `guard_warning`, 시도의
  `guard_warnings`, 세션 로그)는 지금과 같다. 문구는 "Codex 세션에서 가드 훅 호출이 확인되지 않았습니다."로 바꾼다.
- 판정은 시도당 한 번이고, 판정을 마쳤다는 사실을 시도 기록에 남긴다(예: `guard_hook_judged`). 이후 명령은 다시 판정하지 않는다.
- 셸 명령을 하나도 실행하지 않고 끝난 시도는 판정하지 않는다.
- 시도별 홈 준비 실패로 같은 사유의 경고가 이미 있는 시도는 판정을 마친 것으로 보고 다시 남기지 않는다.

훅은 명령 실행 전에 동기로 돌고 표지는 그 안에서 생기므로, 셸 명령이 완료됐을 때 훅이 불렸다면 표지가 이미 있다. 훅 그룹에
matcher가 없으므로(§3.2) 판정 대상 명령은 모두 훅이 불릴 기회가 있었던 명령이다.

결정: 판정 시점은 첫 셸 명령 완료다 (대안: 세션 종료 때 한 번 / 시작 후 일정 시간 뒤; 이유: 종료 때 판정하면 긴 세션에서 늦게
알고, 시간 기준은 첫 명령이 늦은 세션을 미로드로 오판한다).

### 3.5 재시작과 죽은 프로세스

판정을 마치지 않은 Codex 시도는 서버가 재부착할 때와 죽은 프로세스를 정리할 때 실행 로그를 **처음부터** 훑어, 완료된 셸 명령이
하나라도 있으면 §3.4와 같이 표지로 판정한다. 재부착 뒤 실시간 감시가 현재 줄 경계부터 시작해도, 서버가 멈춘 사이 완료된 첫
명령을 놓치지 않는다.

- 판정을 이미 마친 시도는 훑지 않는다. 그래서 재시작을 몇 번 거쳐도 시도당 경고는 한 번이다.
- 훑기는 판정 하나에 필요한 만큼만 읽는다. 첫 완료 명령을 찾으면 멈춘다.

### 3.6 바꾸지 않는 것

- 결정: Codex 시도의 `guard_mirror` 값은 바꾸지 않는다 — 이 값은 실행 전 환경 증명이고 위반 보류 판정에 쓰여, 호출 표지로
  올리면 가드 판정이 달라진다.
- 미로드로 판정된 시도도 세션을 멈추거나 재시도하지 않는다. 예방은 pre-push 훅이, 우회 push는 사후 감지가 맡는다(ADR
  UI-d9c1).
- 새 칩·배지·버튼을 만들지 않는다. 경고는 기존 가드 경고 표시를 그대로 쓴다.

### 3.7 실측과 원인 수정

구현 검증에 실제 Codex 실행을 한 번 넣는다. Worker와 같은 방식으로 준비한 시도별 홈으로 셸 명령을 실행하고, 표지가
생기는지 확인해 결과를 완료 보고서에 적는다.

- 기록이 남으면 주입한 훅이 로드된다는 것이 처음으로 확인된다.
- 실측은 셸 명령과, 셸이 아닌 도구 호출(예: 파일 패치) 뒤에 오는 셸 명령을 모두 포함한다. 둘 다 표지가 생기는지 본다.
- 기록이 남지 않으면 원인(신뢰 해시, 등록 형식)을 이 Bead에서 고친다. 고친 뒤 같은 실행으로 다시 확인한다.
- Codex CLI의 제약으로 로드할 수 없으면, 미로드 경고가 시도마다 한 번 정확히 남는 상태로 착지하고 원인을 보고서에 적는다.

## 4. 수용 기준

1. 가드 스크립트가 호출된 Codex 시도에는 `codex_hook_not_loaded` 경고가 없다. 두 호출이 동시에 와도 같다.
2. 셸 명령을 하나 이상 실행했는데 표지가 없는 Codex 시도에는 경고가 정확히 한 번 남는다.
3. 셸 명령 없이 끝난 Codex 시도와 Claude 시도에는 판정에서 나온 이 경고가 없다. 시도별 홈 준비 실패 경고는 예외로, 실행 전에
   이미 기록되므로 셸 명령 없이 끝나도 남는다.
4. 시도별 홈 준비가 실패한 시도의 경고는 한 번이다.
5. 서버가 멈춘 사이 첫 셸 명령이 완료된 시도, 서버가 멈춘 사이 프로세스가 끝난 시도도 재부착이나 정리 때 1~2와 같이 판정된다.
   재시작을 몇 번 거쳐도 경고는 중복되지 않는다.
6. 표지 파일은 시도당 하나이고, 표지는 타임라인·세션 로그·카드에 새 항목을 만들지 않는다.
7. 가드 스크립트의 거부·경고 동작과 종료 코드는 그대로이고, 표지 생성 실패가 도구 호출을 막지 않는다.
8. Codex 시도별 홈의 가드 그룹에는 matcher가 없고, Claude 설정의 그룹은 matcher `Bash` 그대로다.
9. 실제 Codex 실행(셸 명령, 셸이 아닌 도구 뒤의 셸 명령)의 결과(표지 유무)가 완료 보고서의 검증에 적힌다.

## 5. 테스트 (Test scope)

- `server/worker/runner/guard-pre-tool.test.js`: 첫 호출이 표지를 만든다 / 이미 있으면 그대로 둔다 / 표지를 만들 수 없어도 정상
  종료한다 / 거부 출력은 그대로다 / `command`가 없는 입력도 표지를 만들고 허용한다.
- `server/worker/codex-account-home.test.js`: Codex 홈의 가드 그룹에 matcher가 없고 신뢰 해시가 그 그룹으로 계산된다.
- `server/worker/guard-hook.test.js`: Claude용 가드 그룹은 matcher `Bash` 그대로다.
- `server/worker/runner/codex.test.js`: `thread.started`가 경고를 만들지 않는다.
- 미로드 판정 테스트: 명령 완료와 표지 없음은 경고 한 번 / 표지 있음은 경고 없음 / 첫 호출의 표지 생성 직후 다른 호출이 먼저
  완료돼도 경고 없음 / 명령 없음은 경고 없음 / 홈 준비 실패 뒤에는 추가 경고 없음 / 판정 마친 시도는 다시 판정하지 않음.
- 재부착 테스트: 서버 중단 중 첫 명령이 완료된 시도(실행 로그 경계 이전에만 완료 명령이 있음)를 재부착하면 판정한다 / 프로세스가
  이미 끝난 시도도 정리 때 판정한다 / 두 번 재부착해도 경고 한 번.
- `server/worker/guard-hook.integration.test.js`: 설치한 스크립트를 실제로 실행해 표지가 생기는지 확인한다.

## 6. 경계·후속

- 관찰: 세션 레인의 Codex 대화형 창 — 실행 스트림을 거치지 않아(§2) 미로드 판정을 하지 않는다. 표지는 생기면 남는다.
- 관찰: dotfiles가 설치한 Codex 훅의 로드 여부 — dotfiles 소유이고 이 설계는 Worker 가드 스크립트만 다룬다.
- 관찰: 이 변경 이전 시도에 남은 경고 기록 — 고치지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-d9c1 — ADR UI-a5l2에서 승계한 "Codex 러너 같은 거부" 조항(훅 로드 흔적이 없는 세션은
  `codex_hook_not_loaded` 경고만 남긴다)과 "kill 제거" 조항을 그대로 따른다. 이 설계는 그 흔적을 가드 스크립트의 호출
  표지로 구현할 뿐 조항을 바꾸지 않는다. 같은 조항의 "같은 가드 스크립트를 `PreToolUse`로 싣는다"도 그대로이고, matcher는
  그 조항이 정하지 않는다.
- Codex 가드 훅의 로드 여부를 가드 스크립트의 호출 표지와 첫 셸 명령 완료 시점의 판정으로 정한다 — 되돌리기 어렵지 않다(한
  저장소의 가드 스크립트·러너·재부착 안에서 끝나는 구현 선택) → ADR 아님
- Codex 가드 그룹을 matcher 없이 등록한다 — 되돌리기 어렵지 않다(한 함수의 그룹 생성 인자) → ADR 아님
