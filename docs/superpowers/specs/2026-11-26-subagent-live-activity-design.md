---
scope:
  - server/worker/session-log.js
  - app/utils/transcript-lines.js
  - app/views/worker/activity-label.js
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
---

# UI-k57cf — 실행 카드에 Claude 서브에이전트 최근 활동을 라이브로 싣는다

## 1. 문제

Worker 세션이 `Agent` 도구로 Claude 서브에이전트에 일을 넘기면, 실행 카드의
활동 줄은 `Agent · <설명> 58분 전`처럼 위임한 순간에 멈춘다. 그 아래 `위임 중 ·
impl-high · claude · claude-opus-5-5` 칩은 이름과 모델만 보인다. 서브에이전트가
지금도 일하는지 카드로는 알 수 없다.

같은 상황의 Codex 위임은 이미 활동 줄에 `↳ 위임 · <작업>`으로 위임받은 쪽의 마지막
활동을 보인다. Claude 서브에이전트만 UI-2mpn §6.4 결정으로 활동 줄에서 빠져 있다.
그 결정의 이유는 "자식의 `Read`는 부모가 한 일이 아니다"였는데, 위임 활동은 이미
`↳ 위임` 접두로 부모 활동과 구분해 보이고 있다.

실측(2026-11-26 17:38 KST, `dotfiles-yz2f2`): 카드는 `58분 전`이었지만 같은
세션 로그의 서브에이전트 마지막 `assistant` 줄은 26초 전이었고, 그 줄의 도구 호출은
`git commit`이었다.

## 2. 검증된 전제

- 부모 스트림은 서브에이전트의 `assistant`/`user` 줄을 `parent_tool_use_id`를
  붙여 흘리고, 각 줄은 자기 `timestamp`를 갖는다 — 명령:
  `dotfiles-yz2f2-1795678275114-16.jsonl`에서 `parent_tool_use_id` 줄 집계
  (assistant 212·user 213·tool_progress 124, 시각 있는 줄 425개, 마지막 08:37:42Z).
- 러너 attach와 세션 모니터 재부착은 서브에이전트 줄을 한 번은 launch 없이, 한 번은
  그 launch ID로 두 번 publish한다 — `server/worker/session-log.js:915`,
  `server/worker/session-log.js:921`, `server/worker/session-monitor.js:927`,
  `server/worker/session-monitor.js:933`.
- Codex 위임 스트림은 launch ID와 함께 publish되고, 그 이벤트에는
  `parent_tool_use_id`가 없다 — `server/worker/scheduler.js:3810`.
- `publish`는 launch publish를 그 launch의 `last_event_at`에만 찍고 부모 시각은
  건드리지 않는다 — `server/worker/session-log.js:884`. 그 판정은
  `session-log.test.js:809`가 잡는다.
- `observeActivity`는 launch별 리듀서를 따로 두지만 모든 리듀서를
  `skip_delegated: true`로 만들어, launch publish로 들어온 서브에이전트 줄도
  버린다 — `server/worker/session-log.js:562`, `server/worker/session-log.js:566`,
  `app/utils/transcript-lines.js:995`.
- 리듀서가 새 non-thinking 줄을 낼 때만 그 줄이 attempt의 `last_activity`가 되고
  `at`이 찍히며, launch publish였으면 `delegated: true`가 붙는다 —
  `server/worker/session-log.js:569`, `server/worker/session-log.js:575`,
  `server/worker/session-log.js:580`.
- Claude `tool_result`는 앞서 낸 도구 줄의 결과만 채우고 새 표시 줄을 내지 않는다 —
  `app/utils/transcript-lines.js:691`.
- 활동 오버레이 파싱 오류는 `try`가 삼켜 broadcast를 막지 않는다 —
  `server/worker/session-log.js:887`.
- `last_activity`는 live-only라 재시작하면 사라지고 카드는 활동 줄을 생략한다 —
  `server/worker/session-log.js:994`.
- `activityLabel`은 `delegated` 활동이면 결과 첫 단어 `read`·`list_files`·
  `search`·`unknown`과 `exit` 표기를 Codex 결과 형식으로 해석해 라벨을 바꾸고,
  라벨 앞에 `↳ 위임 · `를 붙인다 — `app/views/worker/activity-label.js:227`,
  `app/views/worker/activity-label.js:258`. 그 렌더는
  `app/views/worker/running-grid.test.js:1159`·
  `app/views/worker/activity-label.test.js:84`가 잡는다.
- 실행 카드 활동 줄은 `last_activity`의 라벨·상세와 `at`의 `[data-ts]` 상대 시각을
  그린다 — `app/views/worker/running-grid.js:1302`,
  `app/views/worker/running-grid.js:1343`.
- 상대 시각은 1분 미만을 `방금`으로 쓴다 — `app/utils/relative-time.js:62`.
- 모니터 탭은 1초 ticker로 `[data-ts]` 글자를 고치지만, Worker 탭에는 그런 ticker가
  없고 1초 재렌더는 유예 행이 있을 때만 돈다 — `app/views/monitor/index.js:4199`,
  `app/views/worker/index.js:3107`.
- 모니터 탭은 같은 `last_activity`를 같은 렌더러로 넘긴다 —
  `app/views/monitor/index.js:2238`.
- 활동 줄과 위임 중 행은 카드 슬롯 3(진행)이다 —
  `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:281`.
- UI-2mpn은 서버 리듀서가 `parent_tool_use_id` 이벤트를 건너뛴다고 정했다 —
  `docs/superpowers/specs/2026-08-24-claude-subagent-usage-legs-design.md:229`.
- 현행 테스트는 launch 없이 publish한 서브에이전트 줄이 `last_activity`가 되지 않음을
  잡는다 — `server/worker/session-log.test.js:775`.

## 3. 목표

- Claude 서브에이전트가 실행 중일 때 실행 카드 활동 줄이 서브에이전트의 마지막
  활동을 Codex 위임과 같은 모양 `↳ 위임 · <작업> · <상세> <나이>`로 보인다.
- 나이는 서브에이전트가 도구를 부르거나, 도구 결과를 받거나, 글을 낼 때마다 새로
  시작한다. 사용자는 `방금`·`N분 전`만 보고 살아 움직이는지 판단할 수 있다.
- 나이는 새 서버 이벤트가 없어도 Worker 탭과 모니터 탭에서 똑같이 흐른다.
- Worker 탭과 모니터 탭이 같은 Bead에 같은 줄을 보인다.

## 4. 비목표

- 정체 경고(일정 시간 무활동 시 색·문구 변경)는 넣지 않는다 — 사용자 결정. 원래
  오래 걸리는 작업에서 오경보가 나기 때문이다.
- `위임 중` 칩 문구·모양은 바꾸지 않는다. 칩별 나이도 싣지 않는다 — 사용자 결정(활동
  줄 통일 선택).
- 전사 서랍의 서브에이전트 접기(UI-2mpn §6.4 drawer 부분)는 그대로다.
- 서버 재시작 뒤 활동 줄 복원은 하지 않는다(현행 live-only 계약).
- 서브에이전트의 `thinking`과 `tool_progress`는 활동을 바꾸지 않는다(현행 규칙과
  Codex 위임 그대로). 그래서 긴 생각이나 긴 명령 동안에는 나이가 늘어난다 — 정체
  경고를 넣지 않는 결정과 같은 판단이다.

## 5. 설계

### 5.1 서버 — launch publish의 서브에이전트 줄을 활동에 싣는다

- 결정: `observeActivity`에서 **launch ID가 있는 publish**의 리듀서는 서브에이전트
  줄을 건너뛰지 않는다. launch 없는 첫 publish의 리듀서는 지금처럼 건너뛴다. 그래서
  같은 줄이 부모 리듀서에 섞이지 않고, 서브에이전트의 `tool_use`→`tool_result` 짝은
  그 launch의 리듀서 안에서만 맞춰진다. 예: `createTranscriptReducer({ skip_delegated: !launch_id })`.
- 결과로 서브에이전트가 낸 마지막 non-thinking 줄이 attempt `last_activity`가 되고
  `delegated: true`가 붙는다. Codex 위임 스트림이 이미 쓰는 경로와 같다.
- 결정: launch publish의 `tool_result`가 같은 launch의 도구 줄 결과를 채우면, 그
  도구 줄을 결과 수신 시각으로 `last_activity`에 다시 싣는다. 새 표시 줄이 없어도
  "명령이 방금 끝났다"가 나이에 반영되게 하기 위해서다. 이 규칙은 launch publish에만
  적용한다 — 부모 활동의 기존 동작은 바꾸지 않는다.
- 결정: `last_activity`는 Claude 서브에이전트에서 온 활동임을 Codex 위임 활동과
  구분할 수 있게 싣는다. launch publish 이벤트에 `parent_tool_use_id`가 있으면 Claude
  서브에이전트, 없으면 Codex 위임이다(§2). 예: `delegated_runtime: 'claude'`.
- 결정: attempt 단위 `last_event_at`의 분리(서브에이전트 줄은 자기 launch 시각만
  찍는다, `session-log.js:884`)는 바꾸지 않는다 — 이 스펙의 문제는 활동 줄이고,
  부모 시각을 섞으면 UI-2mpn의 별도 판정과 테스트까지 움직인다.

### 5.2 화면

- 결정: `activityLabel`의 Codex 결과 형식 해석(`read`·`list_files`·`search`·
  `unknown` 첫 단어, `exit` 기반 라벨 치환)은 Codex 위임 활동에만 적용한다. Claude
  서브에이전트 활동은 부모 활동과 같은 라벨 규칙으로 도구 이름과 결과를 그대로 두고,
  `↳ 위임 · ` 접두만 붙인다.
- 결정: Worker 탭은 모니터 탭과 같은 1초 ticker로 `[data-ts]` 글자를 고친다.
  탭이 보일 때(`load`) 켜고 `pause`·`destroy`에서 끈다. 재렌더 없이 글자만 바꾸는
  기존 `refreshTimeText`를 쓴다.
- 새 칩·줄·버튼이 없으므로 카드 슬롯 표는 갱신하지 않는다. 활동 줄은 이미 슬롯 3이다.
- 병렬 서브에이전트가 여럿이면 가장 최근에 활동한 쪽 하나가 보인다(Codex 위임과
  같은 규칙).
- 서브에이전트가 끝나 부모가 다시 일하면 부모의 다음 non-thinking 줄이 활동 줄을
  되찾는다. 그 사이 부모가 생각만 하는 동안에는 마지막 위임 활동이 나이와 함께
  남는다 — `↳ 위임` 접두와 늘어나는 나이가 그것이 지난 위임 활동임을 말한다.

### 5.3 오류 처리

- 활동 오버레이는 표시 전용이다. 서브에이전트 줄 파싱이 실패해도 현행 `try`가
  마지막 값을 지키고 broadcast를 막지 않는다(§2).

## 6. 검증

- 수용 기준: launch ID로 publish된 서브에이전트 `assistant`/도구 줄이 attempt
  `lastActivity`가 되고 `delegated: true`와 Claude 출처 표시를 갖는다.
- 수용 기준: launch 없이 publish된 같은 줄은 여전히 `lastActivity`를 바꾸지 않는다
  (기존 `session-log.test.js:775` 통과 유지).
- 수용 기준: 같은 launch의 `tool_result`가 오면 그 도구 줄의 결과 요약이 채워지고
  `lastActivity.at`이 결과 수신 시각으로 바뀐다.
- 수용 기준: attempt `lastEventAt`은 서브에이전트 줄에 움직이지 않는다(기존
  `session-log.test.js:809` 통과 유지).
- 수용 기준: Claude 서브에이전트 활동의 도구 이름과 결과 첫 단어는 Codex 해석으로
  바뀌지 않는다. Codex 위임 활동의 기존 해석은 그대로다.
- 수용 기준: Worker 탭에서 새 서버 이벤트 없이 1분이 지나면 활동 줄 나이가 `방금`에서
  `1분 전`으로 바뀐다.
- 테스트(`server/worker/session-log.test.js`):
  - `records a launch-published subagent line as delegated last_activity`
  - `restamps last_activity when a subagent tool result arrives`
  - `keeps the parent line as last_activity until a subagent line arrives`
- 테스트(`app/views/worker/activity-label.test.js`):
  - `keeps a claude subagent tool name and result under the delegation prefix`
  - 기존 Codex `↳ 위임` 해석 테스트(`activity-label.test.js:84`·`:97`·`:110`) 통과 유지
- 테스트(`app/views/worker/index.test.js`):
  - `advances relative time text every tick without a render`
- 배포 뒤 확인: 서브에이전트를 쓰는 실행 중 attempt 카드에서 활동 줄이
  `↳ 위임 · …`과 `방금`·`N분 전` 나이를 보이고, 두 탭에서 나이가 흐르는지 공유 서버
  화면으로 본다.

## 결정 (ADR 후보)

- Claude 서브에이전트 활동을 부모 활동 줄에 위임 표시로 싣는다 — 쉽게 되돌릴 수 있는 표시 규칙(한 리듀서 옵션)이라 첫 조건 실패 → ADR 아님
- Worker 탭에 1초 시각 ticker를 단다 — 모니터 탭과 같은 표시 갱신 방식이라 되돌리기 쉬워 첫 조건 실패 → ADR 아님
