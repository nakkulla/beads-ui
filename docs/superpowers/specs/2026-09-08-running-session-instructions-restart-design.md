---
scope:
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/worker/queue-store.js
  - server/worker/queue-store.test.js
  - server/worker/attach.js
  - server/worker/attach.test.js
  - server/worker/process-controller.test.js
  - server/ws/worker-handlers.js
  - server/ws.worker-queue.test.js
  - app/protocol.js
  - app/protocol.md
  - app/utils/resume-flow.js
  - app/utils/resume-flow.test.js
  - app/utils/resume-instructions-dialog.js
  - app/utils/resume-instructions-dialog.test.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/views/worker/failure-labels.js
  - app/views/worker/failure-labels.test.js
  - app/main.bundle.js
  - app/main.bundle.js.map
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-19-resume-user-instructions-design.md
  - docs/adr/
---

# UI-qce9 — 실행 중 구현 세션에 지시를 담아 같은 기록으로 재시작

- 상태: 사용자 검토용 초안. 아래 중단 방식·대상 범위·연결 끊김 처리는 이번 문서에서 제안하는 설계 선택이다.
- 기준 코드: `ed3ce09185bcac1ee756c2fbacee8efeb0bea081`.
- 소유: beads-ui, 기존 `route=spec_backed`, 하나의 구현·검증 단위.
- 함께 작성하는 스펙: [UI-kyky](2026-09-08-worker-feedback-readability-design.md), [UI-ys18](2026-09-08-monitor-history-material-design.md).
- 구현 순서는 UI-kyky → UI-ys18 → UI-qce9다. 새 workflow route나 Phase 자식을 만들지 않는다.

## 1. 목표와 기존 전제 정정

Worker가 실행 중인 구현 세션에 사용자가 지시를 입력하고, 현재 프로세스의 종료를 확인한 다음 같은 세션 기록을 이어서 실행한다. 원 작업 디렉터리·계정·모델·effort·speed·실행 설정과 실행 영수증의 계보를 유지한다.

기존 이슈의 ‘도구 호출 경계에서 SIGTERM으로 정상 종료’는 현재 구현이 보장하지 않는 전제다. `process-controller.js`는 프로세스 그룹 신원을 확인하고 TERM, 5초 대기, 필요한 경우 KILL, 1초 대기와 재확인을 수행한다. **실행 중 도구의 완료나 provider의 정상 종료를 보장하지 않는다.** 이 설계는 그 보장을 새로 약속하지 않고, 기존 일시정지의 확인된 프로세스 종료 계약을 사용한다.

또한 ‘같은 계보’는 같은 attempt ID를 덮어쓴다는 뜻이 아니다. 기존 resume처럼 자식 attempt를 만들고 `resumed_from`으로 원 attempt를 연결한다. 사용자 중단으로 끝난 원 attempt는 `paused`이며, 실패로 집계하지 않는다.

## 2. 대상과 대안

이번 대상은 Worker가 관리하는 **일반 implementation attempt**의 실행 타일이다. Claude·Codex 모두 기록된 세션 ID와 프로세스 신원이 있고 기존 durable pause가 지원되는 경우에 적용한다. 구현 attempt 안에서 도구로 수행하는 리뷰 작업은 그 구현 세션의 일부다.

별도 `review_session`, EXTERNAL 충돌 해소, REVISE 처분 세션, 머지·배포·정리 작업, 외부에서 띄운 세션에는 버튼을 제공하지 않는다. 이들은 결과·재개 소유자가 서로 다르며, 구현 세션의 pause→resume으로 대체하면 큐의 리뷰·충돌 처리 권한을 침범한다. 해당 대상의 확대는 이번 스펙으로 승인하지 않는다.

| 대안 | 판단 |
| --- | --- |
| 기존 durable pause → 기록된 실행을 이어받는 resume | 채택. 종료 확인과 계보를 재사용하면서 새로운 재시작 상태 기계를 만들지 않음 |
| 살아 있는 headless 세션에 stdin·tmux 키 입력 | 기각. 현재 runner는 직접 입력을 받는 세션이 아니며 provider마다 수신 계약이 다름 |
| 지시를 영속 저장하고 서버가 재시작 전체를 자동 완주 | 기각. 브라우저가 끊겨도 자동 재개되는 효과를 위해 별도 요청 수명·취소·복구 책임이 필요하며 현재 요구의 필수 조건이 아님 |

결정: 도구 호출 경계 감시, 새 자동 복구 사다리, 새 `user_restart` 실패 분류는 만들지 않는다 — 중단은 기존 pause, 재개는 기존 attempt 계보의 연장이다.

## 3. 화면과 두 호출의 흐름

### 3.1 조작과 입력

버튼은 `지시와 함께 재시작`이며 공통 `.op-btn`을 사용한다. 실행 타일의 **슬롯 1 오른쪽 조작 묶음**, 기존 세션 열기·일시정지 조작과 같은 영역에 둔다. Worker와 Monitor는 같은 렌더러와 공통 흐름 함수를 사용한다. 중간 칩 줄이나 별도 카드별 위치를 만들지 않는다.

현재 실행 중이며 세션 ID가 있는 대상에 표시한다. 아직 세션 ID가 없거나 프로세스 신원을 기록하지 못한 타일은 비활성이고 이유를 설명한다. 중단·폐기·재시작 요청이 진행 중이면 중복 제출을 막는다. 실제 허용 여부는 서버가 현재 attempt를 다시 읽어 결정한다.

기존 지시 입력 다이얼로그에 재시작 문맥을 더한다.

- 제목: `지시와 함께 재시작`.
- 설명: `실행을 중단한 뒤 같은 세션 기록과 실행 설정으로 이어갑니다. 실행 중인 도구는 중단될 수 있으며 작업 디렉터리는 보존됩니다.`
- 입력: 공백 제거 후 1~4000자. 빈 입력은 제출하지 않는다.
- 확인: `중단 후 재시작`, 취소: `취소`.
- 현재 기록된 provider·모델·effort·speed·계정 이름을 보여 준다. 계정의 인증정보나 토큰은 표시하지 않는다.

지시 내용은 최종 자식 attempt의 기존 task prompt에만 남긴다. 별도 Bead comment·metadata·localStorage·재시작 요청 원장은 만들지 않는다.

### 3.2 제출 이후

```text
지시 입력·확인
  → 기존 pause 요청(종료 확인을 요구)
  → durable control 완료 + 원 attempt paused 확인
  → 기존 resume 요청(기록된 실행 유지 + 입력 지시)
  → 자식 attempt 생성·같은 세션 기록으로 실행
```

pause 요청은 한 번만 보낸다. 응답의 `paused=true`, `phase=done`만으로 legacy 경로의 성공을 오인하지 않도록 서버의 durable control과 상태를 재개 진입에서 재검증한다. pause가 완료된 뒤 받은 최신 queue revision으로 resume한다. pause의 응답이 유실돼도 즉시 같은 요청을 재전송하지 않고 최신 스냅샷을 확인한다.

resume 단계는 기존 `runResumeFlow`의 지시 보존과 1회 revision 충돌 재시도를 재사용한다. 새 흐름에서 이미 입력한 문장을 다시 묻지 않도록 입력 수집과 전송 부분을 같은 모듈 안에서 재사용 가능하게 나눈다. 일반 이어하기·정리 재시도의 기존 호출 형태는 유지한다.

재개 성공이 확인되면 다이얼로그를 닫는다. 거부되면 입력 문장을 유지하고 이유를 표시한다. 중단 이후 닫기를 누르면 원 세션은 paused로 남는다. ‘취소하면 중단 이전 실행이 자동 복원된다’고 표시하지 않는다.

## 4. 종료 확인은 기존 pause가 소유한다

`worker-attempt-pause` 요청에 선택적 `require_durable: true`를 추가한다. 이 값은 재시작 흐름만 사용한다. 서버 attach·scheduler 경계에서 process controller가 없으면 **시그널을 보내기 전에** 기존 `process_controller_missing` 사유로 거부한다. 같은 진입에서 §2의 일반 구현 대상·세션 ID·프로세스 신원·필수 실행 기록도 검사한다. 불완전한 기록은 중단하지 않고 `prior_session_unavailable`로 거부한다. 기존 일반 pause의 legacy 동작은 이 새 요청의 확인 수단으로 사용하지 않는다.

그 뒤의 프로세스 처리·신원 검증·TERM/KILL 유예는 기존 `pauseDurably`·`drivePauseControl`이 그대로 소유한다. 새로운 종료 타이머나 runner 직접 kill 호출을 두지 않는다. `require_durable`은 요청 조건이며 queue에 별도 재시작 상태로 저장하지 않는다.

재개 조건은 원 attempt의 `control.kind=pause`, `control.phase=done`, `status=paused`다. 기존 process controller가 종료 또는 기존 신원의 소멸을 확인하고 로그·usage를 정리한 결과여야 한다. `unknown`, 제어 실패, 기록 실패, 여전히 실행 중인 경우는 재개하지 않는다.

이후 들어오는 원 세션의 늦은 `done` 콜백은 기존 pause fence를 따른다. 원 attempt를 `pr_missing` 등으로 실패 정산하거나 자식 실행을 정산하지 않는다. Worker 재시작 시에는 기존 pause control 복구만 수행한다.

## 5. 기록된 실행 유지 선택

### 5.1 기존 resume를 그대로 쓸 수 없는 이유

현재 `resolveContinuationForAttempt`는 같은 provider의 `prior_session` 선택을 `auto`로 정규화한다. `auto`는 같은 세션 ID를 이어가더라도 **현재** 모델·effort·계정을 적용할 수 있다. transcript가 없으면 실행 전 또는 실패 정산 후 새 세션으로 대체한다.

기존 이어하기의 의미를 바꾸지 않으면서 이번 요청의 실행 설정 보존을 지키려면, 재개 해석 지점에 선택 하나가 필요하다. 기존 `continuation` 요청 enum에 `prior_attempt`를 추가한다. 뜻은 **‘기록된 attempt의 세션과 실행 설정 그대로’**다. `auto`, `prior_session`, `fresh_current`의 기존 동작은 유지한다.

### 5.2 소유와 적용 범위

`prior_attempt`는 beads-ui가 소유하는 resume 전송 선택이다. `app/protocol.js`·`app/protocol.md`, WS 검증, attach의 타입·전달, scheduler resolver를 함께 갱신한다. dotfiles workflow의 route·상태·metadata·failure class를 확장하지 않는다.

이 선택은 §2 대상이 durable pause를 완료한 뒤 수동 재개할 때만 받는다. 실행 설정 override나 새 계정 선택을 함께 보내면 `bad_request`로 거부한다. pause 이력이 없는 실패·파킹·리뷰·해소 attempt를 이 선택으로 재개하지 않는다.

`resolveContinuationForAttempt`에서 `prior_attempt`는 현재 프리셋 해석으로 합쳐지기 전에 기록값을 선택한다. 기존 provider 자동 재개가 만드는 기록값 기반 실행 tuple을 재사용한다.

- runner·model·effort·speed, `exec_values`, 두 provider의 기록된 account 및 account source, 기록된 preset ID·revision을 승계한다.
- 미기록을 현재 기본값으로 채우지 않는다. 명시적 `null`은 기록된 기본값 의미로 유지하고, 필수 필드 자체가 없는 구형 기록은 `prior_session_unavailable`로 거부한다.
- 기록된 provider와 계정을 현재 환경에서 사용할 수 없으면 재개하지 않는다. 다른 계정·provider로 자동 전환하지 않는다.
- 같은 작업 디렉터리와 `resume_session_id`를 사용한다. 기존 worktree 확인·실행 설정 stamp/restore·guard·admission·영수증 baseline 검증은 유지한다.

`prior_attempt`는 provider 간 선택 다이얼로그가 아니라 이미 명시한 고정 정책이다. `fresh_current`처럼 사전 provider-choice token을 요구하지 않는다. 대신 현재 `expected_revision` 검사와 launch 직전의 기존 continuation 재검증을 적용한다. 이 선택의 source digest에는 session ID뿐 아니라 기록된 runner·model·effort·speed·계정·exec_values를 모두 결속한다. 중간에 원 기록이나 실행 허용 조건이 바뀌면 자식을 만들기 전에 거부한다.

### 5.3 시작 뒤에도 임의 fresh 전환 금지

현재 코드는 CLI가 transcript 부재를 보고한 **실행 이후**에도 fresh를 자동 dispatch한다. 실행 전 검사만 바꾸면 이 분기에서 약속을 잃는다.

따라서 자식 attempt에 선택적 `continuation_choice: 'prior_attempt' | null`을 기록한다. 이는 새 작업 상태가 아니라 사용자가 선택한 재개 의미의 보존값이며, queue-store의 Attempt 타입·정규화·기록 이관이 소유한다. 기존 기록의 부재는 `null`이다. 이 값의 소비자는 해당 자식의 재개 실패 처리와 자동 continuation뿐이다.

- 실행 전 transcript가 없으면 자식 생성 없이 `prior_session_unavailable`로 거부하고 원 attempt는 paused로 남긴다.
- CLI가 실행 후 transcript 부재를 보고하면 자식의 실제 시작 실패를 기존 `resume_failed:transcript_missing`으로 기록하되 fresh를 dispatch하지 않는다.
- 이 자식의 자동 provider 재개도 기록된 선택을 유지한다. 명시적인 다른 계정·새 세션 재개는 별도 사용자 선택으로만 이 정책을 벗어난다.
- 실패 문구는 이 선택에 대해 `이어갈 세션 기록이 없습니다. 새 세션을 자동으로 시작하지 않았습니다.`로 표시한다. 기존 일반 resume의 ‘새 세션으로 대체’ 문구는 실제 대체가 수행되는 기존 경로에 남긴다.

별도의 pending restart ID·상태 기계·원장·재시도 횟수는 도입하지 않는다. 저장하는 값은 실행 뒤의 실패 처리도 같은 사용자 선택을 따르기 위한 하나의 정책값이다.

## 6. 경쟁·연결 끊김·기록

| 상황 | 결과 |
| --- | --- |
| 입력 중 원 세션이 자연 종료 | pause가 현재 상태로 거부한다. 자동으로 다른 attempt를 골라 중단·재개하지 않음 |
| 두 화면에서 같은 attempt를 요청 | 기존 durable control과 `resumed_from` 중복 판정으로 자식은 최대 하나 |
| pause 성공 후 resume 거부 | 원 attempt는 paused. 입력을 유지하고 사유를 보여 줌 |
| pause 후 브라우저 종료·연결 끊김 | 기존 pause 복구까지만 수행. 자동 재시작 의도는 저장하지 않으며, 사용자가 paused 행에서 다시 지시를 입력 |
| resume 응답 유실 | 최신 snapshot의 `resumed_from` 자식을 확인. 발견하면 이미 재개된 결과를 표시하고 추가 spawn하지 않음 |
| 다른 세션이 같은 작업 디렉터리를 선점 | 기존 소유·실행 guard가 거부. 강제로 회수하지 않음 |
| 원 세션 ID·실행 기록 부재 | 중단 전 가용성 검사에서 거부하거나, 중단 후 재검증에서 paused 유지 |

paused 행에도 같은 지시 재개 진입점을 제공하되, 이미 durable pause가 완료된 대상에서는 pause 단계를 생략하고 §5의 동일 선택으로 재개한다. 버튼 이름은 `지시와 함께 이어하기`다. 일반 `이어하기`는 현재 설정을 쓸 수 있다는 기존 의미를 유지하므로 두 행동을 혼동하지 않게 툴팁에 구분한다.

기록은 기존 pause control, 원 attempt, `resumed_from` 자식, 자식 prompt·usage·영수증, 타임라인으로 충분하다. 사용자 요청으로 pause된 원 attempt를 실패·provider 장애·자동 retry 소진으로 세지 않는다. 실제 재개 실패는 기존 실패로 기록한다. 지시 원문을 타임라인 제목이나 토스트에 복제하지 않는다.

새 실행 영수증을 과거 값으로 위조하지 않는다. 원 기록은 보존하고 자식은 기존 receipt baseline과 실행·검증 결과를 통해 자신의 영수증을 얻는다. `impl_entry` 등의 세션 진입 조건도 일반 resume와 같다.

## 7. 다른 두 스펙과의 경계

- UI-kyky의 `정리 재시도`는 세션 없이 착지 후 절차를 재실행한다. 이 기능은 실행 중 세션을 중단하고 지시를 전달하므로 같은 이름을 쓰지 않는다.
- UI-ys18의 완료 실행 표시는 기록된 attempt의 영수증을 읽는다. 이 기능이 만든 자식도 같은 기존 기록 구조를 사용하며, 화면이 ‘현재 핀’을 과거 사실로 대신 읽게 하지 않는다.
- 카드 버튼은 기존 조작 영역과 `.op-btn`에 배치한다. 새로운 색·배지·이월 칩을 만들지 않는다.
- 정지 과정은 기존 프로세스 제어기를, 재개 과정은 기존 continuation resolver를 각각 소유자로 유지한다. 새로운 재시작 coordinator를 만들지 않는다.

## 8. 정본 반영 문구

구현 PR에서 카드 문법 스펙 §5.1의 슬롯 1 오른쪽 조작 목록에 다음 항목을 추가한다.

> 정정(UI-qce9). 일반 구현 세션의 실행 타일에는 ‘지시와 함께 재시작’, durable pause가 완료된 같은 타일에는 ‘지시와 함께 이어하기’를 둔다. 둘 다 슬롯 1 오른쪽 조작 묶음의 공통 op-btn이며 중간 칩 줄에는 놓지 않는다. 전자는 기존 pause 완료 뒤 후자의 기록된 실행 재개를 수행한다. 정리 재시도와 다른 세션 조작이다.

기존 `2026-08-19-resume-user-instructions-design.md`에 다음 문단을 추가한다.

> 정정(UI-qce9). 입력 지시는 기존 resume prompt에 전달하며 별도 Bead 지시 필드를 만들지 않는다. 실행 중 지시 진입점은 durable pause를 먼저 완료한 뒤 prior_attempt 선택으로 같은 기록과 실행 설정을 이어간다. 일반 이어하기의 auto·provider 선택·fresh 동작은 그대로다. prior_attempt만 transcript 부재에서 자동 fresh를 허용하지 않는다.

이번 문서 작성에서는 기존 정본·ADR을 변경하지 않는다. 기존 ADR의 실패·파킹·리뷰 세션 권한을 바꾸지 않으므로 supersede 대상은 없다. 새 재개 선택의 지속 규칙은 아래 ADR 후보로 기록한다.

## 9. 검증과 수용 기준

1. 일반 구현 running + 세션 ID + 프로세스 신원에서만 재시작 진입점이 열린다. review·resolver·disposition·외부 실행·정리 행은 제외한다. Worker·Monitor에서 같은 조건과 자리를 사용한다.
2. 빈 지시·4000자 초과·다이얼로그 취소는 pause 요청 0회다. 유효 입력은 pause 1회, 확인된 종료 이후 resume 순서다. 지시는 충돌 재시도·거부 후 재입력에서도 보존한다.
3. `require_durable=true`이고 process controller가 없으면 신호 전송 0회다. TERM/KILL 정책은 기존 제어기 테스트를 재사용한다. 종료 불명·제어 기록 실패·여전히 실행 중이면 자식 spawn 0회다.
4. 원 세션의 늦은 done, Worker 재시작 중 pause 복구, 두 화면 중복 제출에서도 실패 오분류·자식 중복·살아 있는 원 세션과 새 세션의 동시 쓰기가 없어야 한다.
5. 실행 후 현재 프리셋·모델·effort·speed·계정을 바꾼 뒤 재시작해도 자식은 원 기록값을 쓴다. 기존 `auto`와 `prior_session`은 현재 계약 그대로라는 대조 테스트를 둔다.
6. source tuple·queue revision·작업 디렉터리 소유가 재개 준비 중 바뀌면 spawn 전에 거부한다. 다른 account로 자동 fallback하지 않는다.
7. Claude transcript 사전 부재와 CLI 실행 후 부재, Codex의 resume 실패를 따로 검증한다. `prior_attempt` 자식은 fresh 자동 dispatch 0회이며, 기존 일반 resume의 fallback 테스트는 계속 통과해야 한다.
8. queue 저장·재로딩·attempt 이관 후에도 `continuation_choice`가 보존된다. 구형 기록은 null로 읽고 기존 동작을 유지한다. 자동 provider 재개에서도 선택을 잃지 않는다.
9. pause 뒤 브라우저 연결을 끊으면 paused만 남는다. resume 응답을 유실시키면 기존 자식을 관측하고 두 번째 자식을 만들지 않는다. 이 두 결과를 화면이 구분한다.
10. 입력 지시는 자식 task prompt에 한 번 들어가고 별도 Bead metadata·comment·localStorage에는 쓰이지 않는다. parent/child 계보·usage·기존 receipt 검증이 유지된다.
11. 문서의 ‘도구 완료를 보장하지 않음’과 ‘작업 디렉터리 보존’ 설명을 두 테마·375px와 1280px에서 확인한다. 테스트에서 도구가 작성 중인 파일을 중단했을 때 자동 삭제·복원이 일어나지 않아야 한다.
12. 구현 전 환경 확인 후 `npm run tsc`, `npx vitest run --reporter=dot`(120초 상한), `npm run lint`, 변경 경로 Prettier 검사, `npm run build`를 통과하고 번들 두 파일을 포함한다. 배포와 실제 서비스 확인은 기존 저장소 계약을 따른다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 새 선택은 beads-ui 내부 resume 프로토콜과 attempt 정책이며 workflow metadata·실패 분류를 정의하지 않는다.
- 전제: ADR 0014 — 두 탭의 공유 렌더러와 슬롯 표를 사용한다.
- 전제: ADR 0021 — 별도 리뷰 세션의 생존 감시·결과 판정 소유권을 침범하지 않는다.
- 전제: ADR 0027 — 이력은 기존 attempt·타임라인으로 남기며 별도 재시작 원장을 만들지 않는다.
- 전제: ADR 0037 — 완료 실행 주체가 과거 기록에서 나온다는 사실을 자식 attempt에서도 유지한다.
- 사용자 지시 재시작은 durable pause 뒤 기록된 attempt를 엄격히 이어받음: 되돌리기 어려움 성립(프로토콜·자식 정책·실패 후 재개 소비자 정합), 맥락 없이는 놀라움 성립(일반 이어하기와 달리 현재 설정·fresh 대체를 사용하지 않음), 실질 트레이드오프 성립(자동 완료 편의보다 기록된 세션·설정의 보존). `summary`: "구현 세션의 지시 재시작은 기존 durable pause 뒤 기록된 세션과 설정으로 재개하며, pause 뒤 연결 끊김은 paused로 남기고 transcript 부재 시 새 세션으로 대체하지 않는다" → ADR
- 구현 세션 한정 버튼: 되돌리기 어려움 불성립(추가 대상은 각 소유권 설계 뒤 확장 가능), 맥락 없이는 놀라움 불성립(리뷰·해소의 결과 소유자가 다름), 실질 트레이드오프 성립(지원 범위와 변경 범위) → ADR 아님
