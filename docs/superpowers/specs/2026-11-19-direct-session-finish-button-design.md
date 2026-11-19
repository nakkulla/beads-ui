---
scope:
  - app/views/worker/running-grid.js
  - app/views/worker/lane-model.js
  - app/views/worker/tile-resolve.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/monitor/card-parity.test.js
  - app/protocol.js
  - app/protocol.md
  - server/ws/connection.js
  - server/ws/worker-handlers.js
  - server/worker/session-ref.js
  - server/bd.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-24-monitor-session-active-route-chip-design.md
---

# 직접 세션 타일의 `[마무리]` 버튼

Bead: `UI-lxxf` · 2026-11-19

## 1. 목표

직접 세션 타일은 Bead가 `in_progress`인 동안 남는다. 세션이 일을 끝내 놓고
사용자 확인을 기다리다 멈추면(실측: `rokit-dyf`는 커밋을 올린 뒤 "메일을
보내셨다고 알려 주시면 닫겠습니다"로 멈춤) 화면에는 그 세션에 답할 통로가 없어
타일이 계속 남는다.

타일에 `[마무리]` 버튼 하나를 단다. 누르면 그 세션에 마감 지시가 전달되고,
세션이 남은 절차를 끝내 Bead를 마감한다. 세션 창이 닫혀 있으면 다시 열고, 열려
있으면 그 창에 지시를 입력한다(사용자 결정 2026-11-19).

범위 밖(사용자 결정 2026-11-19): `open`으로 되돌리는 `✕` 버튼.

## 2. 검증된 전제

beads-ui 기준 커밋 `5287ad9050aa4bfb7a7911656bc8749332e06cd6`, dotfiles 기준
커밋 `9bbeb842b5366858914892edc092f690153ca2a3`.

- 직접 세션 타일의 판정은 Bead가 `in_progress`이거나 `external_wait` 키가 있는
  `open`인지뿐이고 세션 생존은 보지 않는다 —
  `server/worker/runnable-cache.js:535-569`
- 세션 타일은 `kind: 'session'`으로 조립되고 조작 재료가 없다(`draggable:
  false`·`can_pause: false`), `session_refs`를 싣는다 —
  `app/views/worker/lane-model.js:4170-4276`
- 세션 타일의 현재 세션은 `session_refs`에서 `current === true`인 항목이다 —
  `app/views/worker/running-grid.js:1659-1662`
- 세션 참조 표시 항목은 `provider`(`claude|codex|hermes`)와
  `locality`(`local|remote|missing`)를 싣는다 —
  `server/worker/session-ref.js:42-52`
- 세션 타일 머리줄은 `직접 세션` 배지와 `▤ 세션`만 그리고, `✕ Worker에서
  내리기`는 세션 타일이 아니고 `attempt_id`가 있을 때만 선다 —
  `app/views/worker/running-grid.js:2103-2119`, `:2168-2175`, `:2187-2190`
- 타일 아래 조작 줄(`.rtile__foot`)에 타일 재료 필드로 조작을 싣는 선례가 있다
  — `app/views/worker/tile-resolve.js:17-21`,
  `app/views/worker/running-grid.js:2326-2330`
- 외부 대기 조작은 슬롯 6 foot이고, 두 탭이 한 클릭 규칙 모듈을 함께 쓴다 —
  `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §2
  정정(UI-l48z·UI-r6xq), `app/views/worker/external-wait-action.js:12`
- 서버는 이미 설치된 `session-hub` CLI를 `~/bin/session-hub`로 부른다 —
  `server/worker/tmux-launcher.js:384-387`
- 서버의 외부 명령 실행 함수는 표준입력을 넘기는 옵션이 없다 —
  `server/bd.js:344-347`
- `session-hub send <session_id>`는 표준입력 글을 받아, 살아 있고 tmux 안에 있는
  Claude 세션에는 그 창에 붙여 넣고 Enter를 치며, 살아 있지 않고 재개 가능한
  세션은 새 창에서 `--resume`으로 다시 열어 그 글을 첫 입력으로 준다 — dotfiles
  `src/shell/lib/session_hub/claude.py:743-768`, `:800-848`
- 열린 창 입력은 창 잠금을 잡고, 질문·plan·trust·권한 창이 떠 있으면
  `modal_blocked`, 입력란에 쓰던 글이 있으면 `user_typing`, 셸이 앞에 있으면
  `no_agent`로 거부하고, 턴이 도는 중이면 Claude의 입력 대기열에 넣어
  `queued: true`로 답한다 — dotfiles `src/shell/lib/session_hub/claude.py:27-33`,
  `:678-741`
- 허브는 tmux 밖 세션·비대화형 세션·Worker attempt를 `observe_only`로 분류해
  입력하지 않고, Codex 세션 입력은 `not_supported`로 거부한다 — dotfiles
  `src/shell/lib/session_hub/claude.py:322-340`, `:752-757`
- 닫힌 두 세션(`8b70a3b7…`, `33a19836…`)은 최소 환경(`env -i HOME PATH`)에서
  `~/bin/session-hub state`가 `control: resumable`로 읽는다 — 2026-11-19 실행
- 세션이 스스로 `bd close`한 Bead가 있으면 dotfiles 훅이 그 창을 유휴 600초 뒤
  닫는다. 턴·표지·유휴·질문 대기 없음이 모두 유지될 때만이다 — dotfiles
  `src/shared/hooks/agent_handoff.py:14-21`, `:63`
- 쓰기 가드는 사람 산문 턴을 승인 키의 근거로 읽고, 표지로 구별하는 것은
  `[hermes]` 중계 턴뿐이다 — dotfiles `src/shared/hooks/bd_write_guard.py:4-16`,
  `:1451-1457`
- 기존 세션 대화 지시문은 dotfiles가 소유하고 beads-ui가 바이트 사본의 sha256을
  시험으로 고정한다 — `server/worker/direction-inquiry.test.js:359-364`, dotfiles
  `src/shared/skills/flow/workflow/references/execution-common.md` `## Worker
  세션 대화`
- 세션 타일 원래 스펙은 운영 버튼과 상태 변경 버튼을 비범위로 두었다 —
  `docs/superpowers/specs/2026-08-24-monitor-session-active-route-chip-design.md`
  §6·§11
- 현행 ADR에는 세션 타일에 조작을 두지 않는다는 조항이 없다 — `grep -n '운영
  버튼\|세션 타일' docs/adr/UI-lx9o-failed-tile-single-badge-detail.md` 실행
- 미확인: launchd 아래 서버 프로세스가 `session-hub send`의 쓰기 경로(붙여넣기,
  새 창 재개)를 끝까지 수행하는지 — 실제 세션에 글을 넣게 되어 실행하지
  않았다. §4의 실기 수용 기준이 확인한다.

## 3. 설계

### 3.1 버튼이 서는 타일

술어는 카드 재료를 만드는 공유 함수 한 곳이 정하고 렌더러는 다시 판정하지
않는다(예: `tile-resolve.js`의 자매 함수가 타일에 `finish_action` 필드를 싣는다).

| 타일 | 버튼 |
| --- | --- |
| 직접 세션 타일, 현재 세션이 Claude이고 `locality: local` | 활성 |
| 직접 세션 타일, 현재 세션이 Codex·Hermes | 비활성, 사유 `Codex 세션은 지원하지 않습니다`(Hermes는 `지원하지 않는 세션 종류`) |
| 직접 세션 타일, 현재 세션이 `remote`·`missing` | 비활성, 사유는 `▤ 세션`이 쓰는 문구 그대로 |
| 직접 세션 타일, 현재 세션 항목이 없음 | 없음 |
| 외부 대기 세션 타일(`external_wait`) | 없음 |
| Worker attempt 타일 전부 | 없음 |

"현재 세션"은 `session_ref`의 마지막 유효 항목이다. 한 Bead에 참조가 여럿이어도
마지막 하나만 본다.

### 3.2 자리와 모양

- 슬롯 6 foot(`.rtile__foot`)에 `.op-btn` 하나, 라벨 `마무리`. 답하는 질문이
  "이 작업을 어떻게 끝내나"라 처분 조작과 같은 줄이다.
- `title`: `이 세션에 마감 지시를 보낸다 — 세션이 남은 절차를 끝내고 Bead를
  닫는다`. 비활성일 때는 사유 문구.
- Worker 탭과 모니터 탭의 같은 Bead 타일은 같은 버튼을 갖는다. 의도된 차이가
  없으므로 `2026-10-02-monitor-worker-parity-design.md` §9 표에 행을 더하지
  않는다.
- 카드 문법 스펙 §2에 `정정(UI-lxxf)`을 더하고 §5.1 슬롯 표의 슬롯 6에
  `[마무리]`를 배정한다. 세션 타일 원래 스펙 §6·§11의 "운영 버튼 없음"에는 이
  스펙을 가리키는 정정 한 줄을 더한다.

### 3.3 클릭

1. 확인 창을 한 번 거친다: `<Bead ID> 마무리 — 세션에 마감 지시를 보냅니다.
   세션이 남은 절차를 끝내고 Bead를 닫습니다.` 취소하면 아무것도 보내지 않는다.
2. 요청 `worker-session-finish`, payload `{ bead_id }`(다른 worker 변경 요청처럼
   선택적 `root_dir`). 클라이언트는 세션 ID를 보내지 않는다.
3. 응답 `{ bead_id, sent, delivery, reason }`.
   - `sent: true`이면 `delivery`는 `resumed`(닫힌 세션을 다시 열어 전달) ·
     `typed`(열린 창에 입력) · `queued`(열린 창이 턴 중이라 대기열에 들어감).
   - `sent: false`이면 `reason`은 서버 거절 코드이거나 허브의 `code` 그대로다.
4. 두 탭은 응답을 문장으로 바꾸는 한 모듈을 함께 쓰고 토스트로 보여 준다.

| 응답 | 문장 |
| --- | --- |
| `resumed` | 닫힌 세션을 다시 열어 마감 지시를 보냈습니다 |
| `typed` | 열린 세션에 마감 지시를 보냈습니다 |
| `queued` | 세션이 작업 중입니다 · 지금 턴이 끝나면 마감 지시를 읽습니다 |
| `modal_blocked` | 세션이 질문·승인 창을 띄운 상태라 보내지 않았습니다 · 그 창에 먼저 답하세요 |
| `user_typing` | 세션 입력란에 쓰던 글이 있어 보내지 않았습니다 |
| `observe_only` | tmux 밖에서 열린 세션이라 보낼 수 없습니다 · 그 창에서 직접 마무리하세요 |
| `busy`·`in_flight` | 다른 조작이 이 세션을 쓰는 중입니다 · 잠시 뒤 다시 누르세요 |
| `not_confirmed` | 보냈지만 전달을 확인하지 못했습니다 · `▤ 세션`에서 확인하세요 |
| `not_session_tile` | 직접 세션 타일이 아닙니다 · 화면을 새로 고치세요 |
| 그 밖 | 마감 지시를 보내지 못했습니다 · `<code>` |

### 3.4 서버 처리

1. 대상 Bead를 지금 값으로 다시 읽는다. 그 저장소의 직접 세션 목록
   (`session_active`)에 `in_progress`로 있고 `external_wait` 키가 없어야 한다.
   아니면 `not_session_tile`로 답하고 허브를 부르지 않는다.
2. Bead의 `session_ref` 마지막 유효 항목을 고른다. 안전하지 않은 ID는
   `unsafe_session_id`, Claude가 아니면 `provider_unsupported`, 이 서버에
   transcript가 없으면 `not_local`, 항목이 없으면 `no_session_ref`로 답한다.
3. 같은 세션 ID로 진행 중인 요청이 있으면 `in_flight`로 답한다.
4. `session-hub send <session_id>`를 한 번 부르고 표준입력으로 §3.5의 지시문을
   준다. 허브 응답 JSON의 `ok`·`resumed`·`queued`·`code`를 §3.3의 응답으로 옮긴다.
   JSON이 아니거나 실행하지 못하면 `hub_invalid_response`·`hub_unavailable`이다.
   `not_confirmed`를 포함한 어떤 실패에도 서버는 다시 보내지 않는다.
5. 서버 명령 실행 함수에 표준입력 전달을 더한다(예: `runShell`의 `input` 옵션).
   허브의 재개 경로는 창 기동을 20초, 전달 확인을 3초 기다리므로 호출 제한
   시간은 그보다 넉넉히 둔다.

결정: 서버는 Bead 상태를 바꾸지 않는다 — beads-ui는 workflow 계약의 소비자이고
마감 절차(검증·보고·정리)는 세션이 계약대로 수행한다.

결정: 기존 `[세션에서 이어가기]` 런처와 대화 레코드를 재사용하지 않는다 — 그
런처는 살아 있는 세션에는 아무것도 쓰지 않는데, 사용자 결정은 열린 창에도
지시를 넣는 것이고 그 입력 가드는 세션 허브가 이미 갖고 있다. 감수하는 것:
이 조작에는 타일의 대화 배지, Discord 스레드, 서버가 하는 창 닫기가 없다.

결정: 서버는 마무리 요청을 기록하지 않고 타일에 진행 표시를 더하지 않는다 —
Bead가 닫히면 타일이 사라지고, 그 전까지는 타일의 기존 `최근 활동` 줄과
`▤ 세션`이 진행과 세션의 마지막 말을 보여 준다.

결정: 창 닫기는 서버가 하지 않는다 — 세션이 스스로 `bd close`하면 dotfiles 훅이
유휴 10분 뒤 그 창을 닫는다. Bead가 `resolved`로 끝나는 route(PR 전달)에서는
창이 남는다.

### 3.5 지시문 (크로스 리포 unit)

지시문은 dotfiles가 소유한다(사용자 결정 2026-11-19). dotfiles
`src/shared/skills/flow/workflow/references/execution-common.md`에 `## 직접 세션
마무리` 절을 더해 블록 하나를 두고, beads-ui는 그 블록의 바이트 사본을 싣고
sha256을 시험으로 고정한다. 서버가 채우는 자리는 `<Bead ID>` 하나다.

블록이 말해야 하는 것(초안은 아래, 착지한 바이트가 정본이다):

- 이 입력이 beads-ui 직접 세션 타일의 `[마무리]` 클릭에서 왔다는 출처.
- 대상 Bead ID, 그리고 그 Bead 하나만 마감한다는 것.
- 사용자가 더 요청할 것이 없다는 확인이며, route의 Finish 절차를 남은 데부터
  끝까지 진행한다는 것.
- 이 입력이 `impl_entry`·`plan_approval`·`adr_approval`·리뷰어 선택·머지·폐기의
  근거가 아니라는 것. 쓰기 가드는 이 턴을 사람 산문 턴으로 읽으므로 금지는
  블록 문장이 진다(기존 Worker 세션 대화 블록과 같은 방식).

```text
[beads-ui 마무리] 사용자가 beads-ui의 직접 세션 타일에서 이 Bead의 [마무리]를 눌렀다.
- 대상 Bead: <Bead ID>

뜻: 사용자는 이 Bead에 더 요청할 것이 없고, 이 세션이 남은 일을 끝내 Bead를 마감하기를 바란다.
1. 대상 Bead를 `bd show --json`으로 다시 읽는다. 이 세션이 잡은 Bead가 아니거나 이미 닫혔으면 그 사실을 한 줄로 말하고 끝낸다.
2. 이 Bead의 route가 정한 Finish 절차를 남은 데부터 끝까지 진행한다. 사용자 확인을 기다리던 일은 이 입력으로 확인된 것으로 본다.
3. 대상 Bead 하나만 마감한다. 이 세션이 잡은 다른 Bead는 건드리지 않는다.

이 입력이 근거가 되지 않는 것: `impl_entry`·`plan_approval`·`adr_approval`·리뷰어 선택·머지·폐기. 그런 답이 필요하거나 하드 스톱에 걸리면 필요한 것을 한 줄로 묻고 턴을 끝낸다.
```

## 4. 수용 기준

1. 현재 세션이 이 서버의 Claude 세션인 직접 세션 타일은 슬롯 6 foot에 활성
   `[마무리]`를 갖고, Worker 탭과 모니터 탭의 타일이 같다.
2. §3.1 표의 나머지 다섯 행이 표대로 비활성이거나 버튼이 없다.
3. 확인 창에서 취소하면 요청이 나가지 않는다.
4. 직접 세션 타일이 아닌 Bead에 대한 요청은 `not_session_tile`로 끝나고 허브가
   호출되지 않는다.
5. 서버는 Bead의 `session_ref`에서 고른 세션 ID로 `session-hub send`를 한 번
   부르고, 표준입력은 `<Bead ID>`가 채워진 지시문 사본이다.
6. 허브 응답 `resumed`·`queued`·그 밖의 성공과 거부 코드가 §3.3 표의 `delivery`
   ·`reason`과 문장으로 옮겨진다.
7. 같은 세션에 대한 요청이 진행 중일 때 들어온 둘째 요청은 `in_flight`이고
   허브는 한 번만 호출된다.
8. 이 조작은 Bead와 Worker 큐에 아무것도 쓰지 않는다.
9. 지시문 사본의 sha256이 dotfiles에 착지한 블록 바이트와 같다.
10. 실기 확인(완료 보고에 증거를 남긴다): 창이 닫힌 직접 세션의 시험용 Bead에서
    `[마무리]`를 누르면 새 tmux 창에서 그 대화가 재개되어 Bead가 닫히고 타일이
    사라진다. 창이 열려 있는 유휴 세션에서는 그 창에 지시문이 입력된다.

## 5. Test scope

- 카드 재료 술어 시험 — §3.1 표의 여섯 행.
- `app/views/worker/running-grid` 시험 — foot의 버튼, 비활성 사유, 버튼 없는
  타일.
- `app/views/monitor/card-parity.test.js` — 버튼이 서는 세션 타일 fixture에서
  두 탭의 슬롯 6에 버튼이 있음을 확인한 뒤 타일 동일성을 비교한다.
- 클릭 규칙 모듈 시험 — 확인 취소, 요청 payload, §3.3 표의 문장.
- `server/ws` 처리기 시험 — 거절 넷(`not_session_tile`·`provider_unsupported`·
  `not_local`·`no_session_ref`), 허브 인자와 표준입력, 응답 옮김, `in_flight`,
  Bead·큐 무변경.
- 지시문 사본 sha256 고정 시험.
- 명령 실행 함수의 표준입력 전달 시험.

## 6. 경계·후속

- 크로스 리포 unit: dotfiles dotfiles-stlfs — §3.5의 `## 직접 세션 마무리` 절과
  블록. beads-ui 구현 진입 전에 착지해야 하는 선행이다(사본 바이트의 원본).
  quick_fix로 dotfiles Worker 병렬 레인에 배치했고 `UI-lxxf`의 foreign `blocks`
  엣지가 그 Bead를 가리킨다.
- 관찰: Codex 직접 세션 — 세션 허브의 비중계 `send`가 Codex 입력을 지원하지
  않아 버튼이 비활성이다. 허브가 지원하면 §3.1 술어 한 줄로 열린다.
- 관찰: 한 세션이 잡은 Bead 여러 개의 일괄 마감 — 누른 Bead만 마감한다(사용자
  결정 2026-11-19). 나머지는 그 타일에서 다시 누른다.
- 관찰: 타일의 "마무리 요청함" 표시 — §3.4 결정대로 두지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — workflow 계약 표면은 dotfiles가 정의하고 beads-ui는
  소비한다. 지시문을 dotfiles에 두고 바이트 사본의 sha256을 고정하는 근거다.
- 전제: ADR UI-lx9o(UI-l48z 승계 조항) — 세션 타일의 판정, 세션 정체 칩과
  `▤ 세션`, 처분 조작은 슬롯 6 foot이라는 조항을 그대로 따른다.
- 직접 세션 타일의 마감은 서버가 Bead를 닫거나 자체 대화 창을 띄우지 않고,
  세션 허브 `send`로 그 세션에 dotfiles 소유 지시문을 전달해 세션이 끝내게
  한다. 서버는 요청 기록·대화 레코드·창 닫기를 갖지 않는다.
  - 되돌리기 어려움: `server/ws/worker-handlers.js`의 처리기, 지시문 사본과
    sha256 시험, dotfiles `execution-common.md`의 `## 직접 세션 마무리` 블록,
    dotfiles `session-hub send`의 응답 코드, dotfiles `agent_handoff.py`의 창
    닫기가 함께 움직인다.
  - 맥락 없이 놀라움: 같은 타일 계열의 `[세션에서 이어가기]`는 자체 런처와 대화
    레코드를 쓰는데 이 조작만 세션 허브를 거치고 흔적을 남기지 않는다. 서버가
    Bead를 닫을 수 있는데도 닫지 않는다.
  - 실제 절충:
    - 얻는 것: 열린 창과 닫힌 세션을 한 경로로 다루고, 마감 절차가 계약대로
      세션에서 수행된다.
    - 감수하는 것: 타일에 대화 배지·Discord 스레드가 없고, 창은 dotfiles 훅이
      닫을 때까지 남는다.
    - 대안 둘과 기각 이유:
      - 서버가 `bd close`를 직접 한다: 검증·완료 보고·워크트리 정리를 건너뛴다.
      - `[세션에서 이어가기]` 런처에 대화 종류를 더한다: 살아 있는 세션에 글을
        넣는 가드를 beads-ui가 따로 만들어야 한다.
  - ADR UI-lx9o를 supersede한다. 소비자 집합(`running-grid`의 세션 타일,
    `worker-handlers.js`의 클릭 처리)을 공유하며, 세션 타일 조항에 이 조작을
    더하고 나머지는 승계한다.
  - `summary`: "직접 세션 타일은 [마무리] 조작 하나를 갖고, 서버는 Bead를 닫거나 자체 대화 창을 띄우지 않고 세션 허브 send로 그 세션에 dotfiles 소유 지시문을 전달해 세션이 마감하게 하며 요청 기록·대화 레코드·창 닫기를 갖지 않는다 — 나머지 조항은 UI-lx9o 그대로다" → ADR, supersede UI-lx9o
- 버튼은 슬롯 6 foot에 서고 라벨은 `마무리`, 클릭은 확인 창을 한 번 거친다 — UI 배치·라벨(기본 제외 목록) → ADR 아님
- Codex·Hermes·다른 기기 세션에서는 버튼이 비활성이다 — 술어 한 줄로 되돌릴 수 있다(되돌리기 어려움 실패) → ADR 아님
