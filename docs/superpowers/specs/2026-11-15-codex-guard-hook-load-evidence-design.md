---
scope:
  - server/worker/runner/guard-pre-tool.js
  - server/worker/runner/guard-events.js
  - server/worker/runner/codex.js
  - server/worker/runner/session.js
  - server/worker/session-monitor.js
  - server/worker/scheduler.js
  - server/worker/guard-hook.js
  - server/worker/codex-account-home.js
  - server/worker/queue-store.js
---

# UI-zoig — Codex 가드 훅 로드 경고를 실제 호출 기록으로 판정한다

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
- 미확인: Worker가 시도별 홈에 주입한 가드 스크립트가 Codex 세션에서 실제로 호출되는지 — 허용한 호출이 기록을 남기지 않아
  지금은 관측할 수단이 없다. matcher `Bash`가 Codex의 셸 도구에 맞는지도 확인하지 못했다.

## 3. 설계

### 3.1 가드 스크립트의 첫 호출 기록

가드 스크립트는 한 시도에서 처음 호출됐을 때 가드 이벤트 로그에 "호출됨" 줄을 한 번 남긴다. 줄에는 러너 이름과 시각이
들어간다. 같은 시도의 이후 호출은 이 줄을 다시 남기지 않는다.

- 이 줄은 허용·거부 판정과 무관하게 남는다. 판정 결과, 거부 문장, 종료 코드는 지금과 같다.
- 기록에 실패해도 도구 호출을 막지 않는다. 기존 거부·오류 기록과 같은 규칙이다.
- 스크립트는 두 러너가 함께 쓰므로 Claude 시도에도 같은 줄이 남는다. 판정에는 Codex 시도의 줄만 쓴다.
- 예: 첫 호출 여부는 이벤트 로그 옆 표지 파일의 배타적 생성으로 가린다.

결정: 로드 증거는 가드 스크립트 자신이 남긴다 (대안: 시도 시작 때 탐침 명령을 세션에 넣기 / Codex stderr의 훅 문장 읽기 /
Codex CLI의 훅 이벤트 읽기; 이유: 탐침은 세션 프롬프트와 모델 동작에 기대고, stderr 문장은 차단이 있을 때만 나오며 어느
훅의 것인지 가릴 수 없고, 실행 스트림에는 훅 이벤트가 없다. 호출된 당사자의 기록만 직접 증거다).

### 3.2 감시기의 소비

가드 이벤트 감시기는 "호출됨" 줄을 읽어 그 시도에 훅 호출이 확인됐다는 사실과 시각을 기록한다(예: `guard_hook_seen_at`).

- 이 줄은 타임라인, 세션 로그, 카드에 새 항목을 만들지 않는다. 정상 상태를 매 시도마다 표시하면 지금의 소음을 다른 이름으로
  되풀이하게 된다.
- 재시작 뒤 로그를 다시 읽어도 결과가 같다. 기록은 한 번이고 값은 처음 본 줄의 시각이다.

### 3.3 무조건 경고 제거

`thread.started`는 더 이상 경고를 만들지 않는다. 세션 ID 추출 등 시작 이벤트의 다른 쓰임은 그대로다.

### 3.4 미로드 판정

Codex 시도에서 셸 명령이 처음 **완료**된 시점에 가드 이벤트 로그를 끝까지 읽고 판정한다.

- 호출 기록이 있으면 아무것도 남기지 않는다.
- 호출 기록이 없으면 `codex_hook_not_loaded` 경고를 한 번 남긴다. 사유 코드와 기록 경로(타임라인 `guard_warning`, 시도의
  `guard_warnings`, 세션 로그)는 지금과 같다. 문구는 "Codex 세션에서 가드 훅 호출이 확인되지 않았습니다."로 바꾼다.
- 판정은 시도당 한 번이다. 이후 명령은 다시 판정하지 않는다.
- 셸 명령을 하나도 실행하지 않고 끝난 시도는 판정하지 않는다. 훅이 불릴 기회가 없었으므로 경고도 없다.
- 시도별 홈 준비 실패로 같은 사유의 경고가 이미 있는 시도에는 다시 남기지 않는다.
- 파일 변경(패치 적용)만 있고 셸 명령이 없는 구간은 판정 대상이 아니다. 가드 그룹의 matcher가 셸 도구이기 때문이다.

훅은 명령 실행 전에 동기로 돌고 명령 완료는 그 뒤에 오므로, 완료 시점에 로그를 끝까지 읽으면 호출 기록이 이미 있다.

결정: 판정 시점은 첫 셸 명령 완료다 (대안: 세션 종료 때 한 번 / 시작 후 일정 시간 뒤; 이유: 종료 때 판정하면 긴 세션에서 늦게
알고, 시간 기준은 첫 명령이 늦은 세션을 미로드로 오판한다).

### 3.5 재시작

서버가 재시작해 감시가 다시 붙어도 시도당 경고는 한 번이다. 재시작 뒤에는 시도 기록(호출 확인 여부, 이미 남긴 경고)과 가드
이벤트 로그 재생으로 같은 판정에 이른다. 재시작 전에 판정이 끝난 시도는 다시 판정하지 않는다.

### 3.6 바꾸지 않는 것

- 결정: Codex 시도의 `guard_mirror` 값은 바꾸지 않는다 — 이 값은 실행 전 환경 증명이고 위반 보류 판정에 쓰여, 호출 기록으로
  올리면 가드 판정이 달라진다.
- 미로드로 판정된 시도도 세션을 멈추거나 재시도하지 않는다. 예방은 pre-push 훅이, 우회 push는 사후 감지가 맡는다(ADR
  UI-d9c1).
- 새 칩·배지·버튼을 만들지 않는다. 경고는 기존 가드 경고 표시를 그대로 쓴다.

### 3.7 실측과 원인 수정

구현 검증에 실제 Codex 실행을 한 번 넣는다. Worker와 같은 방식으로 준비한 시도별 홈으로 셸 명령 하나를 실행하고, 호출 기록이
남는지 확인해 결과를 완료 보고서에 적는다.

- 기록이 남으면 주입한 훅이 로드된다는 것이 처음으로 확인된다.
- 기록이 남지 않으면 원인(matcher, 신뢰 해시, 등록 형식)을 이 Bead에서 고친다. 고친 뒤 같은 실행으로 다시 확인한다.
- Codex CLI의 제약으로 로드할 수 없으면, 미로드 경고가 시도마다 한 번 정확히 남는 상태로 착지하고 원인을 보고서에 적는다.

## 4. 수용 기준

1. 가드 스크립트가 호출된 Codex 시도에는 `codex_hook_not_loaded` 경고가 없다.
2. 셸 명령을 하나 이상 실행했는데 호출 기록이 없는 Codex 시도에는 경고가 정확히 한 번 남는다.
3. 셸 명령 없이 끝난 Codex 시도와 Claude 시도에는 이 경고가 없다.
4. 시도별 홈 준비가 실패한 시도의 경고는 한 번이다.
5. 서버 재시작을 거쳐도 1~4가 유지되고 경고가 중복되지 않는다.
6. "호출됨" 줄은 시도당 한 번만 쓰이고, 타임라인·세션 로그·카드에 새 항목을 만들지 않는다.
7. 가드 스크립트의 거부·경고 동작과 종료 코드는 그대로이고, 기록 실패가 도구 호출을 막지 않는다.
8. 실제 Codex 실행 한 번의 결과(호출 기록 유무)가 완료 보고서의 검증에 적힌다.

## 5. 테스트 (Test scope)

- `server/worker/runner/guard-pre-tool.test.js`: 첫 호출이 "호출됨" 줄을 한 번 남긴다 / 두 번째 호출은 남기지 않는다 / 로그를
  쓸 수 없어도 정상 종료한다 / 거부 출력은 그대로다.
- 가드 이벤트 감시기 테스트: "호출됨" 줄이 시도 기록을 갱신한다 / 타임라인과 세션 로그에 항목을 만들지 않는다 / 재생에서
  중복 기록하지 않는다.
- `server/worker/runner/codex.test.js`: `thread.started`가 경고를 만들지 않는다.
- 미로드 판정 테스트: 명령 완료와 호출 기록 없음은 경고 한 번 / 호출 기록 있음은 경고 없음 / 명령 없음은 경고 없음 / 홈
  준비 실패 뒤에는 추가 경고 없음 / 재시작 재생에서 중복 없음.
- `server/worker/guard-hook.integration.test.js`: 설치한 스크립트를 실제로 실행해 "호출됨" 줄을 확인한다.

## 6. 경계·후속

- 관찰: 세션 레인의 Codex 대화형 창 — 실행 스트림을 읽지 않아 미로드 판정을 하지 않는다. 호출 기록은 남으면 기록한다.
- 관찰: dotfiles가 설치한 Codex 훅의 로드 여부 — dotfiles 소유이고 이 설계는 Worker 가드 스크립트만 다룬다.
- 관찰: 이 변경 이전 시도에 남은 경고 기록 — 고치지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-d9c1 — ADR UI-a5l2에서 승계한 "Codex 러너 같은 거부" 조항(훅 로드 흔적이 없는 세션은
  `codex_hook_not_loaded` 경고만 남긴다)과 "kill 제거" 조항을 그대로 따른다. 이 설계는 그 흔적을 가드 스크립트의 첫 호출
  기록으로 구현할 뿐 조항을 바꾸지 않는다.
- Codex 가드 훅의 로드 여부를 가드 스크립트의 첫 호출 기록과 첫 셸 명령 완료 시점의 판정으로 정한다 — 되돌리기 어렵지 않다(한
  저장소의 가드 스크립트·감시기·러너 안에서 끝나는 구현 선택) → ADR 아님
