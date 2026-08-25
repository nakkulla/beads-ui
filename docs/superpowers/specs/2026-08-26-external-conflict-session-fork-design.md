---
scope:
  - server/worker/session-ref.js
  - server/worker/scheduler.js
  - server/worker/attach.js
  - server/worker/queue-store.js
  - server/worker/runner/claude.js
  - server/worker/runner/codex.js
---

# EXTERNAL 충돌 해소의 첫 세션을 원 세션 fork로 여는 설계

Bead: `UI-p206`

## 1. 문제

Worker가 EXTERNAL PR 행의 충돌 해소를 처음 dispatch할 때, 그 bead를 실제로
구현한 대화형 세션의 컨텍스트를 버리고 빈 세션을 연다.

관측(2026-08-26, microbiome_bile `Analysis-6u0g`, PR #71): bead metadata에
`session_ref=claude:c8206fbe-…@isy-macstudioui-MacStudio-2`가 있었고 그 transcript도
같은 머신에 실재(최종 수정이 dispatch 1분 전)했는데, attempt
`Analysis-6u0g-1787696690261-3`은 `session_id=b52a0a11-…`, `resumed_from=null`,
`continuation_mode=null`로 기록됐다.

원인은 `dispatchExternalConflict`(`server/worker/scheduler.js`)의 첫-충돌 분기가
`resume_session_id: null`로 고정돼 있다는 것이다. 그 자리의 주석이 든 근거는
"an external row carries no session id to continue"인데, `session_ref`를 도입한
UI-4xzk(`f7b8332`) 이후로 이 전제는 참이 아니다. `server/worker/session-ref.js`가
provider/session_id/host 파싱, locality 판정, transcript 위치를 이미 제공하지만
소비자는 UI 표시뿐이고 scheduler는 이 모듈을 import하지 않는다.

`conflictPrompt`는 "양쪽 변경의 의도가 모두 보존되도록" 해소하고 해소 전후 exact
delta self-review까지 요구한다. 어느 리뷰 지적을 수용하고 무엇을 왜 불수용했는지
같은 판단은 스펙 문서에 다 남지 않으므로, 원 세션 컨텍스트 없이 해소하면 결합
품질이 떨어진다.

### 1.1 이미 올바른 것 (변경 대상 아님)

- **두 번째 이후 충돌은 이미 재개한다.** `dispatchExternalConflict`는
  `lastExternalConflictAttemptOf`로 직전 해소 attempt를 찾아
  `relaunchFromAttempt(resume: true)`로 보낸다. fresh인 것은 첫 관측 충돌뿐이다.
- **재개 시 모델은 이미 현재 설정을 쓴다.** `resolveContinuationForAttempt`는
  `decision === 'auto'`에서 `launch_model`을 prior attempt가 아니라
  `resolved.exec.orchestration_model`(Bead metadata → workspace kv → harness 순으로
  해석한 값)에서 취하고 `continuation_mode='session'`을 준다. prior attempt의
  모델을 쓰는 것은 runner가 claude↔codex로 바뀐 경우의 `prior_session` 선택지뿐이다.
  따라서 이 설계는 새 모델 정책을 만들지 않고, 기존 `auto`의 의미를 첫 EXTERNAL
  충돌에도 적용한다.

### 1.2 재개가 아니라 fork여야 하는 이유

이 머신의 Worker 큐 전수 조사에서 `continuation_mode='session'`인 재개 attempt
32건 모두 `session_id`가 prior attempt와 **동일**했다. 즉 `--resume`은 같은
transcript에 이어 쓴다. Worker 자신이 만든 세션은 Worker가 끝낸 상태라 문제가
없지만, `session_ref`가 가리키는 것은 **사용자의 대화형 세션**이고 사용자가 언제든
다시 붙을 수 있다. 컨텍스트를 얻으려다 사용자의 transcript에 해소 세션의 대화가
섞여 들어가는 것은 이득보다 손해다.

두 CLI 모두 fork를 제공한다:

- `claude --resume <sid> --fork-session` — "When resuming, create a new session ID"
- `codex exec fork <sid> --json` — "Fork a previous session by id into a new session"

fork는 컨텍스트를 상속하면서 새 세션 id로 갈라지므로 원 transcript가 불변이다.
그 결과 원 세션의 생존 여부를 추정할 필요 자체가 사라진다.

## 2. 결정

첫 EXTERNAL 충돌 해소 dispatch는, 자격이 서면 bead `session_ref`의 현재 항목을
**fork**해 연다. 자격이 서지 않으면 지금과 완전히 동일한 fresh dispatch다.

`resolveContinuationForAttempt`의 decision_token·digest·exec_restore 체계는 prior
attempt의 존재를 전제로 얽혀 있으므로 건드리지 않는다. 이 설계는 첫-충돌 분기
안에서만 동작한다.

## 3. 재개 자격 판정

`server/worker/session-ref.js`에 판정 함수를 추가한다. 입력은 bead metadata와 현재
runner 이름, 출력은 `{ ok: true, provider, session_id }` 또는 사유가 붙은 거절
(`{ ok: false, reason }`).

통과 조건은 셋이며 전부 만족해야 한다.

1. `parseSessionRef`의 **마지막 유효 항목**(기존 `sessionRefViews`의 `current`)일
   것. 과거 항목은 이 bead의 현재 세션이 아니다.
2. `resolveSessionFile`의 `locality === 'local'`일 것. 이 판정은 host 첫 라벨
   일치와 transcript 파일 실재를 함께 확인하므로, 별도의 존재 검사를 덧붙이지
   않는다.
3. `provider`가 현재 `resolved.exec.runner`와 같을 것. 다르면 애초에 다른 CLI다.

거절 사유는 `no_session_ref`, `unsafe_session_id`, `provider_mismatch`,
`not_local` 네 가지를 이 순서로 판정해 구분한다. `unsafe_session_id`를
`not_local`보다 먼저 두는 것은 `resolveSessionFile`이 좁은 문법(`isSafeSessionId`)
실패를 `locality: 'missing'`으로 접어 두 사유가 한 값으로 합쳐지기 때문이다.
판정 함수가 `isSafeSessionId`를 직접 먼저 호출해 그 경우를 분리한다.

`unsafe_session_id` 판정은 `isSafeSessionId`만으로 끝나지 않는다. 그 좁은
문법(`/^[A-Za-z0-9._-]+$/`)은 **선행 `-`를 통과시키고**, 그런 id는 양쪽 CLI가
옵션으로 읽는다. 기존 `sessionResumeCommand`가 `startsWith('-')`를 따로 거부하는
이유가 그것이므로, 이 판정도 같은 검사를 함께 적용한다: `isSafeSessionId`가
거짓이거나 id가 `-`로 시작하면 `unsafe_session_id`다.

원 세션의 생존 여부는 판정하지 않는다. §1.2의 이유로 fork는 원 세션에 아무것도
쓰지 않으며, transcript mtime으로 "열려 있음"을 추정하는 것은 대기 중인 세션과
활성 세션을 구분하지 못한다.

## 4. fork argv

두 어댑터의 `buildArgv`에 `settings.fork_session` 분기를 넣는다. 이 키가 참일 때만
동작이 달라지므로 기존 재개 경로는 불변이다.

- `runner/claude.js`: 기존 `--resume <sid>` 뒤에 `--fork-session`을 더한다.
- `runner/codex.js`: `['exec','resume',sid,'--json']` 대신
  `['exec','fork',sid,'--json']`을 쓴다.

모델·effort·speed 인자 조립은 양쪽 다 이 분기 뒤에 그대로 이어지므로, **현재 exec
설정의 모델로 fork**가 별도 처리 없이 성립한다(`codex exec fork`도 `-m`을 받는다).

`launchSession`은 `input.fork_session === true`일 때만
`settings.fork_session = true`를 실어 보낸다. `resume_session_id`가 없는데
`fork_session`만 참인 조합은 어댑터가 무시한다(fork는 재개의 변형이지 독립
모드가 아니다).

반대 조합 — `resume_session_id`는 있는데 `fork_session`이 거짓 — 은 어댑터의
기존 plain resume이며, **이 설계는 그 조합을 만들지 않는다.** §5의 첫-충돌
분기는 두 값을 항상 함께 넘기거나 둘 다 넘기지 않는다. plain resume은 Worker가
자기 세션을 이어가는 기존 경로(§9 비범위)의 것이고, `session_ref`가 가리키는
사용자 세션에 적용하면 §1.2가 배제한 transcript 오염이 그대로 일어난다.

## 5. dispatch 연결

1. `attach.js`의 `snapshotBead`에 `session_ref`를 다른 metadata 키와 같은 present
   rule(`Object.hasOwn(md,'session_ref') ? md.session_ref : undefined`)로 추가하고,
   `BeadSnapshot` typedef에 선택 필드로 선언한다.
2. `dispatchExternalConflict`의 첫-충돌 분기에서, `resolved_exec` 해석 뒤에 §3
   판정을 호출한다. 통과하면 `launchSession`에 `resume_session_id: <session_id>`와
   `fork_session: true`를 넘기고, 거절되면 지금과 동일하게
   `resume_session_id: null`·`fork_session` 없음으로 간다(§4의 반대 조합 금지).
3. 같은 분기에서 attempt를 prerecord할 때 §6의 `forked_from_session_id`를 함께
   쓴다. 자격 통과면 §3이 돌려준 원 세션 id, 거절이면 `null`이다. 이 값은
   dispatch 시점에 이미 확정돼 있으므로 세션이 뭘 announce하든 기다리지 않는다.
4. 거절 사유는 `log()`로 남긴다. 자격 미달은 실패가 아니라 정상 폴백이므로
   dispatch 결과에는 영향을 주지 않는다.

두 번째 이후 충돌 경로(`lastExternalConflictAttemptOf` → `relaunchFromAttempt`)는
변경하지 않는다. 첫 충돌에서 fork한 세션이 그 체인의 시작점이 되고, 이후 재개는
Worker 자신의 세션을 이어가는 기존 의미 그대로다.

## 6. 기록

attempt 레코드에 `forked_from_session_id`(기본 `null`)를 추가한다. fork는 새
session id를 발급하므로 `attempt.session_id`(init 이벤트에서 추출되는 값)와 원
세션 id가 다른 값이 되고, 둘의 관계가 남지 않으면 이번 조사처럼 큐 JSON을 직접
파야만 무엇을 이어받았는지 알 수 있다.

`queue-store.js`의 attempt 생성 지점에서 다른 선택 필드와 같은 방식으로 정규화하고,
**값을 실제로 싣는 것은 §5.3의 prerecord**다. 정규화만 있고 기록 단계가 없으면
구현이 언제나 `null`을 저장해도 아무 검사에 걸리지 않으므로, §8은 두 갈래(자격
통과 시 원 id, 거절 시 `null`)를 모두 검증한다.

**Worker 카드 표시는 이 설계의 범위가 아니다.** 카드 슬롯 배정은
`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §5.1이
소유하며, 새 칩 자리는 그 스펙을 먼저 갱신해야 한다.

## 7. 실패 처리

fork dispatch가 실패했을 때 fresh로 자동 재시도하지 않는다. §3 판정이 transcript
파일의 실재까지 확인하므로 남는 실패는 CLI 거절 정도이고, 그것은 평범한 attempt
실패로 보이는 편이 조용한 폴백보다 진단에 낫다.

## 8. 검증

단위 테스트:

- `session-ref.test.js` — §3 판정의 통과 1건과 거절 4건(사유별). 선행 `-`로
  시작하는 id가 `unsafe_session_id`로 거절되는 것을 별도 케이스로 둔다. 기존
  fixture 방식(주입된 `fs`/`hostname`/`home_dir`)을 그대로 쓴다.
- `runner/claude.test.js`, `runner/codex.test.js` — `fork_session` 참일 때의 argv,
  거짓일 때 기존 argv가 불변인 것, 모델 인자가 양쪽 분기에서 동일하게 붙는 것,
  그리고 `resume_session_id` 없이 `fork_session`만 참인 조합이 기존 fresh argv와
  완전히 같은 것(§4).
- `scheduler.test.js` — 첫 EXTERNAL 충돌에서 자격 통과 시 `launchSession`이
  `resume_session_id` + `fork_session: true`로 호출되고 attempt의
  `forked_from_session_id`가 원 세션 id인 것, 자격 거절 시 기존 fresh 인자 그대로에
  `forked_from_session_id`가 `null`인 것, 그리고 두 번째 충돌이 여전히
  `relaunchFromAttempt`로 가는 것.

실측(구현 중 1회, 결과를 코드 주석에 남긴다 — `claude.js`의 "MEASURED 2026-08-06"
선례):

- `-p` 헤드리스 모드에서 `--resume <sid> --fork-session`이 실제로 **새** session id를
  init 이벤트에 announce하고 원 세션의 컨텍스트를 상속하는지.
- `codex exec fork <sid> --json`이 `thread.started`에 **새** thread id를 announce하는지
  (`codex.js`의 `extractThreadId`가 그 값을 잡는다).

두 실측 중 하나라도 기대와 다르면 **그 provider의 구현을 그대로 진행하지 않고
설계를 재검토한다.** 해당 provider를 §3 판정에서 항상 거절하도록 두면(= 기존
fresh dispatch) 안전하게 멈출 수 있고, 그 사실과 실측 결과를 Bead에 남긴다.

이때 절대로 하지 않는 것: fork 분기만 빼고 `resume_session_id`는 그대로 넘기는
처리. 그러면 어댑터의 기존 plain resume이 돌아 §1.2가 배제한 원 transcript 오염이
그대로 일어난다. fork가 성립하지 않는 provider에게 남는 선택지는 fresh뿐이다.

전체 게이트: `npm run tsc`, `npm test`, `npm run lint`.

## 9. 비범위

- Worker 자신의 attempt를 재개하는 기존 경로(일반 resume, 두 번째 이후 충돌,
  revise-fix, completion-repair)의 fork 전환.
- `session_ref`를 첫 EXTERNAL 충돌 외의 fresh dispatch(정상 Bead 착수 등)에
  적용하는 것 — Worker의 평범한 dispatch가 사용자 세션 컨텍스트를 상속하는 것은
  오염이지 개선이 아니다.
- Worker 카드/Monitor의 fork 표시(§6).
- 프런트엔드 번들 변경.

## 10. 구현 unit 후보

한 unit으로 봉인 가능하다. 순서만 기록한다.

1. `session-ref.js` 판정 함수 + 테스트
2. 두 어댑터 fork argv + 테스트 + 실측 주석
3. `attach.js` snapshot 필드, `scheduler.js` 연결, `queue-store.js` attempt 필드 +
   scheduler 테스트
