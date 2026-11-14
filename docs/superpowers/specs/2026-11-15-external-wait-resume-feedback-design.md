---
scope:
  - server/worker/external-wait/session-resume.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/attach.js
  - server/worker/tmux-launcher.js
  - server/ws/worker-handlers.js
  - server/worker/wait-judgment.js
  - app/protocol.js
  - app/views/worker/
  - app/views/monitor/
  - app/views/detail-panel/
  - app/utils/toast.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md
---

# UI-mdep — 외부 작업 재개 거절 이유를 카드에 남긴다

## 1. 목표

외부 작업이 끝난 뒤 세션 재개나 Worker 인계가 거절되면, 사용자가 카드에서 이유와 다음 행동을 확인한다. 새로고침·다른 기기·서버 재시작 뒤에도 마지막 거절 결과가 남는다. 원래 세션이 살아 있거나 생존을 확인하지 못하면 같은 세션을 다시 실행하지 않는다.

대상은 본문의 `owner_alive`·`owner_unverified`와 notes의 외부 작업 완료 대화 인계 거절이다. 이 문서는 설계와 리뷰 대상이며 구현 진입 승인을 대신하지 않는다.

## 2. 검증된 전제

기준 커밋: `de28f838fbf7a5b6f5828787271741c08ce1dbc4`.

- 원래 세션의 생존 판정이 alive/unverified이면 기동 없이 명령을 반환하며 대기 레코드를 쓰지 않는다 — `server/worker/external-wait/session-resume.js:493`.
- Codex는 이 생존 프로브에서 항상 unverified다. Claude도 레지스트리나 프로세스를 확인하지 못하면 unverified다 — `server/worker/external-wait/session-resume.js:140`.
- alive/unverified 응답은 재개 명령을 자동 복사한 뒤 success 토스트를 띄운다 — `app/views/worker/external-wait-action.js:96`.
- 외부 작업 완료 대화의 실행 전 인계 거절은 대기 resume을 비우고 별도 거절 기록을 남긴다 — `server/worker/scheduler.js:12612`.
- 기존 거절 기록은 큐의 `conversation_refusals`에 있고, 카드에는 문자열로 전달돼 툴팁에만 붙는다 — `server/worker/queue-store.js:8270`, `app/views/worker/lane-model.js:3377`, `app/views/worker/tile-resolve.js:434`.
- 외부 대기 계약은 alive/unverified에서 대기 레코드를 그대로 두도록 정한다 — dotfiles `docs/contracts/external-wait.md:396`. beads-ui는 이 계약의 소비자다 — `docs/adr/UI-jlov-dotfiles-contract-and-checker-consumption.md`.
- 원래 세션의 레지스트리 위치를 받는 창 이동 기능은 이미 있다. 현재 기능은 pane 번호로 창을 선택하므로 세션 일치 재검증은 호출 측에서 보장해야 한다 — `server/worker/tmux-launcher.js:686`.
- 외부 대기 카드 재료는 공유 함수가 만들고, 재개 실패는 기존 판정에서 action_required로 표시한다 — `app/views/worker/lanes.js:4621`, `server/worker/wait-judgment.js:842`.
- 토스트는 info·warning을 지원한다 — `app/utils/toast.js:5`.
- 구현 후 배포는 저장소의 기존 선언과 실행기가 담당한다 — `repo-ops/config.toml:23`.
- 동시 이슈의 현재 범위는 `bd show UI-rbk7 --json`·`bd show UI-qyr9 --json`로 확인했다. 전자는 외부 PR 충돌의 lane 판정, 후자는 Codex fork의 작업 폴더 선택 창이다.

과거 rokit-471의 실행은 본문·notes를 사건 근거로 사용한다. 이번 설계 작성 중 원격 작업이나 원래 사용자 세션을 다시 실행하지 않았다.

## 3. 선택과 경계

사용자가 2026-11-15 Hermes로 「① 카드에 저장·창 이동」을 확정했다. 표시 결과를 서버에 저장하고 확인된 원래 창으로 이동한다. 화면에서만 기억하는 안은 새로고침·기기 전환 뒤 이유가 사라진다. 원래 대화에 완료 블록을 자동 입력하는 안은 진행 중인 입력에 영향을 주므로 채택하지 않는다.

결정: 외부 대기 레코드의 resume·stage·키 해제·재개 예약 계약은 바꾸지 않는다 — 거절 표시가 실행이나 정산 증거가 되어서는 안 된다.

결정: 원래 세션에 완료 내용을 자동 입력하지 않는다 — 작업 중인 대화에 새 지시가 끼어드는 것을 막는다.

- lane 판정·점유·순서와 외부 PR 충돌 dispatch는 UI-rbk7 범위다. 이번 설계는 그 결과를 바꾸거나 우회하지 않는다.
- Codex fork 실행 인자·작업 폴더·시작 감시는 UI-qyr9 범위다. 이번 설계의 owner_unverified는 기존 판정을 그대로 설명한다.
- 두 이슈의 산출물은 이 설계의 전제가 아니다. 선행 의존을 추가하지 않는다. `scheduler.js` 같은 경로의 겹침은 구현 전 최신 diff에서 다시 확인한다.
- 새 의존성·전역 경고 배너·주기적인 owner 감시·강제 재개는 추가하지 않는다.

## 4. 저장과 결과 전달

### 4.1 beads-ui 내부 표시 기록

공용 외부 대기 레코드와 분리한 큐의 선택 필드로, workspace·wait_id별 마지막 처리 결과를 저장한다. 예: `external_wait_feedback[wait_id]`. 이는 beads-ui 내부 상태이며 dotfiles 계약 키나 새 Bead metadata가 아니다.

필수 내용은 Bead ID, 작업 종류(세션 재개·Worker 재개·대화 인계), 원래 reason 코드, 발생 시각, 관측한 session_ref와 확인된 원래 창 위치(각각 없으면 null)다. 저장·로드 정규화·스냅샷 직렬화·클라이언트 타입·공유 투영을 함께 바꾼다. 예전 큐의 필드 부재는 빈 결과로 읽는다. 명령 문자열·원문 로그·완료 블록은 저장하지 않는다.

기록 대상은 실제 거절 결과다. 세션 재개의 alive/unverified와 그 밖의 외부 대기 재개 거절, 외부 작업 완료 대화의 실행 전 인계 거절을 같은 경로로 기록한다. 후자는 기존 `conversation_refusals` 기록과 함께 갱신하되 다른 종류의 실패 대화 표시는 건드리지 않는다. 현재 외부 대기가 확인되는 기존 external_resume 거절 기록은 새 기록이 없을 때만 읽어 표시하며 새 대기의 거절로 추정해 이관하지 않는다.

응답을 처리하는 서버가 결과를 저장한 뒤 큐 변경을 통지한다. HTTP 재개와 카드·상세의 WebSocket 재개가 같은 결과 기록 경로를 지난다. 기록 저장이 실패하면 기동 성공으로 답하지 않고 오류를 알린다. 이미 발생한 거절은 그대로 유지하며, 저장 실패 때문에 실행을 재시도하지 않는다.

### 4.2 수명과 늦게 도착한 결과

- 표시 기록은 같은 wait_id의 stage가 completing인 동안 유지한다. 브라우저를 닫거나 토스트가 사라져도 지우지 않는다.
- 다음 요청을 보내는 순간에는 지우지 않는다. 실제 기동 확인과 기존 키 정산이 끝나 stage가 resumed가 되거나, 기존 절차로 대기가 stopped·done이 되면 제거한다.
- 원래 창 이동 성공은 재개 성공이 아니다. 기록·대기 키·stage를 유지한다.
- 생존 재확인에서 dead이면 문구를 `원래 세션 종료 확인 · 다시 이어갈 수 있습니다`로 갱신한다. 다음 실행은 사람이 기존 이어가기 버튼을 눌러야 한다.
- session_ref가 바뀌면 과거 위치는 이동 대상으로 쓰지 않고 `원래 세션 정보가 바뀌었습니다 · 다시 확인하세요`로 표시한다.
- 새 거절이 생기면 같은 대기의 이전 결과를 대체한다. 비동기 재확인·창 이동 결과는 요청 당시의 wait_id·session_ref·기록 버전이 여전히 일치할 때만 반영한다. 종료된 대기나 뒤의 결과를 덮어쓰지 않는다.
- 읽기 전용 스냅샷 생성은 프로세스 조회를 실행하지 않는다. 생존 재확인은 명시적 요청에서만 기존 비동기 프로브를 사용한다.

## 5. 카드와 조작

### 5.1 표시 문구

슬롯 3의 외부 작업 본문에 완료·실패한 잡 정보 다음으로 결과 문장과 마지막 확인 시각을 둔다. 툴팁 없이 읽히고 좁은 폭에서 줄바꿈한다. 같은 재료가 Worker·Monitor와 상세 외부 작업 영역에 표시된다.

- owner_alive: `원래 세션이 열려 있어 새로 열지 않았습니다`와 확인된 `tmux <위치>`. 위치가 없으면 `원래 창 위치를 확인하지 못했습니다`.
- owner_unverified: `원래 세션이 열려 있는지 확인하지 못해 새로 열지 않았습니다`. Codex처럼 프로브 미지원이면 그 사실을 짧게 덧붙인다. 종료·실패로 단정하지 않는다.
- 인계 거절: `Worker로 넘기지 못했습니다 · <쉬운 사유> (<reason>)`. 예: `직렬 대기줄 순서 때문에 시작하지 못했습니다 (serial_lane_not_head)`.
- 그 밖의 재개 거절: `이어가지 못했습니다 · <쉬운 사유> (<reason>)`. 모르는 코드는 원문을 보존하고 `상태를 확인한 뒤 다시 시도하세요`를 붙인다.

생존 판정 결과는 안내 상태다. 기존 resume.error나 job 실패에 따른 배지 판정은 유지하고, 새 표시 기록만으로 재개 실패 배지·전역 알림·자동 복구를 만들지 않는다. 실제 기동만 success 토스트, owner_alive는 info, owner_unverified와 인계 거절은 warning으로 알린다.

### 5.2 원래 창 이동

슬롯 6의 기존 이어가기 조작 옆에 `.op-btn`으로 `원래 창으로 이동`을 둔다. alive와 확인된 위치가 있을 때만 표시한다. 기존 두 이어가기 버튼의 유무는 계속 `tileResolveFields` 한 곳이 정한다.

클라이언트는 root_dir·Bead ID·wait_id와 기록 버전만 보낸다. 임의 tmux 대상은 받지 않는다. 서버는 현재 대기·session_ref를 다시 읽고, 기존 생존 프로브와 레지스트리로 같은 세션의 현재 위치임을 확인한 뒤 기존 창 이동 기능을 호출한다. 이동은 창 선택만 하며 프로세스 생성·프롬프트 전송·대기 해제를 하지 않는다.

위치 부재·이미 사라진 pane·세션 불일치·조회 실패·tmux 선택 실패는 `원래 창으로 이동하지 못했습니다 · <이유>`로 알리고 같은 카드에도 남긴다. 새 세션 실행으로 대체하지 않는다. 저장된 위치가 현재 세션과 맞는지 확인하지 못하면 이동하지 않는다.

### 5.3 생존 재확인과 복사

owner_alive·owner_unverified·session_ref 변경 안내에는 `.op-btn` `원래 세션 다시 확인`을 슬롯 6에 둔다. 기존 `[지금 확인]`은 잡 관찰이므로 의미를 섞지 않는다. 재확인은 생존 상태와 이동 가능 위치만 갱신하며 자동 실행하지 않는다. 조회 실패는 unverified와 실패 이유를 남긴다. dead가 확인되면 이 추가 재확인 버튼을 숨기고 기존 이어가기 버튼을 사용한다.

owner_alive·owner_unverified에서 재개 명령 자동 복사를 제거한다. 서버의 기존 command 응답 계약은 유지한다. 사용자가 직접 하는 기존 세션 이력의 명령 복사는 별도 조작으로 유지하며, 이번 카드에는 새 명령 복사 버튼을 만들지 않는다.

카드 헤더 문법 §2·§5.1과 조작 표면 §3.2에 위 문장·조작의 슬롯을 먼저 기록한 뒤 렌더러에 반영한다. `docs/design-system.md`의 기존 부품·크기 토큰을 사용한다. Monitor 전용 판정이나 수동 재료 조립을 추가하지 않는다.

## 6. 수용 기준과 필수 검증

1. alive/unverified 응답 뒤 카드에서 이유가 읽힌다. 새로고침·서버 재시작·다른 구독에도 같은 결과가 남고 외부 대기 레코드 바이트와 키는 그대로다. 새 프로세스·자동 복사 호출은 0회다.
2. 원래 창 이동은 현재 일치하는 세션만 선택한다. 위치 없음·재사용된 pane·프로브 실패·tmux 실패·session_ref 변경에는 기동·입력·키 해제 없이 카드에 이유가 남는다.
3. 재확인의 alive→dead·unverified→alive·계속 unverified를 구분한다. dead에서도 자동 실행하지 않으며 다음 명시적 이어가기 때 기존 안전 검사를 다시 통과한다.
4. 외부 작업 완료 대화 인계가 serial_lane_not_head 등으로 거절되면 resume이 null로 돌아가도 사유가 카드에 남는다. 기존 대기줄 순서와 재시도 자격은 유지한다.
5. 거절→다시 거절→기동 성공·정산 실패·정산 성공의 순서에서 요청 시작과 창 이동은 결과를 지우지 않는다. 같은 Bead의 다음 wait와 종료 뒤 늦은 응답에 이전 결과가 번지지 않는다.
6. 구서버·구큐의 필드 부재, 기존 external_resume 거절만 있는 큐, 알 수 없는 reason을 읽는다. 다른 실패 대화의 거절 표시·정산은 회귀하지 않는다.
7. Worker·Monitor 카드 동일성과 상세 표시를 검증한다. 320px 폭에서 긴 tmux 위치·reason·버튼이 잘리거나 가로로 넘치지 않고, 키보드로 두 추가 조작을 실행한다.

서버 단위·통합 검증은 `queue-store.test.js`, `external-wait/session-resume.test.js`, `scheduler.external-wait.test.js`, `tmux-launcher.test.js`, WebSocket 처리기와 HTTP external-wait 재개 테스트의 기존 경계에서 다룬다. 클라이언트는 `external-wait-action.test.js`, 공유 lane-model·카드 테스트, `monitor/card-parity.test.js`와 상세 외부 작업 테스트를 확장한다. 필요한 경우 같은 디렉터리에 초점을 좁힌 테스트 파일을 둔다.

구현 완료 때 저장소의 Node 버전·설치 요건을 확인하고 변경 파일 Prettier, `npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot` 전체 검증을 통과한다. 화면 검증은 격리된 테스트 데이터와 로컬 개발 포트에서 하며 실제 사용자 세션을 재개하지 않는다.

## 7. 전달과 배포

한 Bead·한 구현 단위로 서버 기록부터 공유 표시까지 묶어 PR로 전달한다. 구현은 이 문서의 리뷰 영수증과 별도 구현 진입 답을 받은 뒤 시작한다. 구현 후 머지는 별도 절차이며, 머지 뒤 기존 `[deploy]`가 빌드·공유 서비스 재시작·런타임 응답 확인을 담당한다. 수동 데이터 이관이나 운영 세션 재실행은 필요 없다.

## 결정 (ADR 후보)

- 전제: ADR UI-jlov — 외부 대기 계약과 키는 소비하며 alive/unverified에서 대기 레코드를 쓰지 않는 규칙을 지킨다.
- 전제: ADR UI-6xw7 — 승계한 카드 배치·공유 조립·한 세션 ID당 프로세스 하나 규칙과 기존 이어가기 판정을 따른다.
- 외부 대기 거절은 큐의 선택 표시 기록과 기존 슬롯에 남기고, 원래 창 이동·명시적 재확인을 제공한다 — 첫 조건 미충족: 이 저장소의 선택 필드와 표시만 제거하면 되돌릴 수 있고 외부 소비자의 동시 이관이 없다 → ADR 아님
- 원래 대화 자동 입력·재개 명령 자동 복사를 하지 않는다 — 기본 제외: 기존 흐름의 국소적인 사용자 조작·표시 변경 → ADR 아님
