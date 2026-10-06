---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/resolve-session.js
  - server/worker/tmux-launcher.js
  - server/worker/notify.js
  - server/worker/completion-intent.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/discard-coordinator.js
  - server/worker/queue-store.js
  - server/worker/runtime.js
  - server/ws/worker-handlers.js
  - server/config.js
  - server/conversation-settings.js
  - server/ws/connection.js
  - server/ws/monitor-handlers.js
  - app/views/worker/repo-ops-timeline.js
  - app/views/worker/tile-resolve.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/settings-dialog/
---
# 실패 해결 세션 개편 — 자동 진단 대화, 「확인 필요」 통일, 저장소 작업 세션 버튼, 해결 세션 실행 설정

Bead: UI-jbl1 · 선행: dotfiles `dotfiles-ids1k`(계약, `docs/superpowers/specs/2026-10-06-failure-conversation-auto-launch-design.md`)

## 1. 목표

2026-10-06 사용자 결정:

- (가) 수동 배포 실패에도 `[세션에서 이어가기]`를 둔다. 위치는 모니터 탭 「저장소 작업」 서랍 안이다.
- (나) 해결 세션의 기본 런타임·모델·effort와 대화 자동 기동 스위치를 설정 창에서 정한다. 범위는 전체 공통 하나다.
- (다) 실패 때도 대화 세션을 자동으로 띄운다. 세션은 읽기 전용 진단 뒤 질문만 하고, 답 전에는 상태를 바꾸지 않는다. 「🚨 사람 필요」 알림은 없애고 「🙋 확인 필요 · <클래스>」로 통일한다.

계약 쪽(대화와 수리의 경계, 공용 스위치, 진입 블록의 읽기 전용 진단, Bead 없는 저장소 작업 실패 대화)은 `dotfiles-ids1k`가 정한다. 이 spec은 그 계약을 재고정해 구현한다.

## 2. 검증된 전제

기준: beads-ui `f799f28a98b0957afe2412b545a20570e9b12651`(`2df994fd` 이후 범위 파일 변경 없음).

- 「사람 필요」 제목 상수와 「확인 필요」 대화 제목 — `server/worker/notify.js:66`, `:75`
- 「사람 필요」 발신처: post-merge 잡·배포·머지 게이트 보류 클래스 표, 폐기 실패, 수동 배포 실패 — `server/worker/completion-intent.js:839-846`, `:1614`; `server/worker/discard-coordinator.js:87`; `server/worker/repo-operation-coordinator.js:671`
- 실패 알림 본문의 `클래스:`·`다음:` 줄 — `server/worker/notify.js:664`
- 테스트가 `🚨 사람 필요` 문자열을 고정한다 — `server/worker/notify.test.js:1498`, `:1519`
- 수동 배포 실패는 `manual` 자리표시로 기록되고, 실패 후속 처리에서 제외된다 — `server/worker/repo-operation-coordinator.js:688`, `:943`
- 재시도 소진 경로 `settleConsumedRetry`는 알림 없이 `recoverAfterLadder`만 부른다 — `server/worker/repo-operation-coordinator.js:808-839`, `:883`
- 멈춤 자동 기동 파이프라인과 스위치 읽기, Bead 없는 행 거절 — `server/worker/direction-inquiry.js:293`, `:479`, `:689`
- 진입 블록 원문 고정 — `server/worker/direction-inquiry.js:58-87`
- Codex 기동에는 세션 id를 만들지 않는다 — `server/worker/direction-inquiry.js:577-580`
- 클릭 해결 세션은 기록 세션을 fork하고 `placement: 'user'`로 연다 — `server/worker/resolve-session.js:63`, `:552`
- 대화 레코드 키는 `<bead_id>:<kind>`다 — `server/worker/queue-store.js:3487`
- 저장소 작업 투영은 의도적으로 해결 진입을 두지 않는다 — `server/ws/worker-handlers.js:2792-2798`
- 해결 클릭 처리기는 Bead를 전제한다 — `server/ws/worker-handlers.js:6760`
- 저장소 작업 서랍의 실패 행은 `기록 닫기`만 그리고, 정리 행은 해결 버튼을 그린다 — `app/views/worker/repo-ops-timeline.js:408`, `:526`
- 서랍 호스트 두 곳 — `app/views/monitor/index.js:713`, `:1260`; `app/views/worker/index.js:822`
- 살아 있는 대화가 있으면 버튼을 숨긴다 — `app/views/worker/tile-resolve.js:19`, `:228`
- 자동 기동 스위치는 config.toml에서만 읽고 쓰는 경로가 없다 — `server/config.js:136-173`
- 서버 전역 설정 저장소 선례 — `server/timing-settings.js:263`
- 전역 탭은 하나뿐이다 — `docs/adr/UI-ooc0-model-visibility-disabled-list.md:56`
- `workflow_session_defaults`는 등록 키 밖을 거절한다 — `server/session-defaults.js:173`
- 헤드리스 런너의 모델·effort 플래그 — `server/worker/runner/claude.js:825-828`, `server/worker/runner/codex.js:469-472`
- 대화형 CLI 플래그: `claude --help`에 `--model`·`--effort`·`--fork-session`, `codex fork --help`에 `-c` — 2026-10-06 실행 확인
- 현행 결정 "자동 기동은 사람 판단 멈춤에만", "실패의 🚨 사람 필요는 그대로" — `docs/adr/UI-18a5-session-worker-continue-pair.md:58`, `:70`
- 남는 needs_human 알림 클래스 목록 — `docs/adr/UI-18a5-3-merge-gate-holds-and-failure-exits.md:57`
- 대화 레코드 키 조항 — `docs/adr/UI-18a5-2-conversation-records-three-kinds.md:36`
- 미확인: Codex fresh 대화의 Discord 스레드 중계 — 브리지는 Codex 세션 소유 확인 경로가 있다(dotfiles `src/claude/scripts/discord-bridge/bridge.py:737-744`). 다만 beads-ui가 세션 id를 넘기지 않아 알림에 스레드 링크가 없다. 구현 때 실측한다.

## 3. 설계

### 3.1 실패 자동 대화

- 대상(계약 3.4): 배포 실패, post-merge 잡 실패, 머지 게이트 보류, 폐기 실패, 수동 배포 실패.
- 시점: 실패가 종단으로 기록된 뒤 한 번이다. 알림과 기동은 같은 1회 표시를 공유한다. 기동 전에 표시를 먼저 쓰고, 재시작·재관측에는 다시 띄우지 않는다. 행 종류마다 붙는 자리는 하나다.
  - Bead 행(배포·post-merge 잡 실패, 머지 게이트 보류): `completion-intent.js` 종단 처리의 1회 알림 판정 바로 옆이다.
  - 폐기 실패: `discard-coordinator.js`의 폐기 실패 알림 자리다.
  - 저장소 작업 행(수동 배포 실패): 공통 종단 진입 `recoverAfterLadder`다.
    - 지금 `settleFailure` 안에 있는 수동 알림을 이리 옮긴다. 그러면 알림이 없던 `settleConsumedRetry` 종단도 함께 덮인다.
    - reconcile이 다시 들어오므로 1회 표시로 멱등이어야 한다.
    - 코드 결함 인계 판정에서 수동 작업을 빼는 현행 규칙은 그대로 둔다.
- 기동: 스위치(3.4)가 켜져 있으면, 클릭과 같은 해결 세션 기동 함수를 같은 기동기 인스턴스로 부른다. 배치만 `placement: 'inquiry'`(분리된 대화 tmux 세션 창)로 다르다.
  - 원천 순서: 클릭과 같다. 저장소 작업 행은 항상 fresh이고, cwd는 저장소 루트다.
  - 진입 블록: 실패 사유로 채운다(계약 3.3의 읽기 전용 진단 포함).
- 생략:
  - 스위치가 꺼져 있거나 그 행에 살아 있는 대화가 있으면 띄우지 않는다.
  - `script_retry` 대기는 종단이 아니므로 띄우지 않는다.
- 실패 처리: tmux가 없거나 기동에 실패하면 알림만 보낸다. 알림 본문에 열지 못했다고 적고, 다시 시도하지 않는다. 클릭으로는 계속 열 수 있다.

### 3.2 알림 「확인 필요」 통일

- `🚨 사람 필요` 제목을 없앤다. 종단 실패 알림 제목은 `🙋 확인 필요 · <클래스>`다. 보내는 이 접두어는 현행과 같다.
  - 예: `🤖 🙋 확인 필요 · 배포 실패`
  - 클래스 문자열은 현행 표를 그대로 쓴다. 머지 게이트 보류는 계약 `notify_label`의 바이트 사본이다.
- 본문은 현행 실패 본문(클래스·원인·다음)에 대화 줄 하나를 더한다.
  - 대화를 열었으면 `대화: Discord 스레드 · tmux <세션:창>`
  - 못 열었으면 `대화를 열지 못함 — [세션에서 이어가기]`
- 실패 한 건당 알림 하나다(현행 중복 방지 유지).
- 멈춤 대화의 `🙋 확인 필요` 알림(대화 사유 본문)은 그대로다. `⏸️ 머지 보류`·`❌ 실패`·`⏸️ 파킹` 등 다른 제목도 바꾸지 않는다.

### 3.3 저장소 작업 실패의 `[세션에서 이어가기]`

- 위치: 모니터 탭 「저장소 작업」 서랍의 실패한 수동 배포 행이다. 같은 서랍을 쓰는 Worker 탭 호스트도 같게 동작한다.
- 서버: 저장소 작업 투영에 해결 진입 재료(종단 실패 여부, 대화 상태)를 더한다. 현행 "해결 진입 없음" 주석은 철회한다.
- 클릭: 저장소 작업 실패 대화를 fresh로 연다(계약 3.5). 입력은 작업 식별자다. 처리기는 Bead 조회를 하지 않는다.
- 대화 레코드: 저장소 작업 행은 작업 식별자로 키를 잡는다(예: `repo-op:<operation_id>:resolve`). reconcile은 이 키에 대해 Bead 상태를 읽지 않는다.
- 결과 줄:
  - `인계`는 같은 저장소 작업을 한 번 다시 실행한다. `[배포 실행]` 재클릭과 같은 경로이고, tip 선언을 쓴다.
  - `보류`는 행을 그대로 둔다.
  - `인수`는 대화형 세션으로 넘어가고, 큐 쪽 행은 그대로 둔다.
- 살아 있는 대화가 있으면 버튼 대신 대화 위치를 보인다(현행 패턴).

### 3.4 설정: 자동 기동 스위치와 해결 세션 실행 설정

- 위치: 설정 창의 기존 전역 탭에 섹션 하나를 더한다. 전역 탭은 하나뿐이라는 결정(UI-ooc0)을 따른다.
- 항목:
  - 대화 자동 기동: 켜기·끄기. 멈춤과 실패에 공용이다.
  - 새 세션 런타임: 원래 세션 따름, claude, codex 중 하나. 초기값은 claude다(사용자 결정 2026-10-06, Codex fresh 대화의 Discord 스레드 링크가 미확인이라서).
  - Claude 모델·effort, Codex 모델·effort: 각각 기본값은 "따름"이다. 모델 선택지는 모델 표시 필터를 거친다.
- 저장: 서버 전역 설정 파일이다(타이밍 설정 저장소 패턴, 예: `server/conversation-settings.js`). `workflow_session_defaults`에는 넣지 않는다. 계약 등록 키가 아니고 dotfiles 스킬이 읽지 않는다.
- 우선순위: 저장값이 있으면 저장값을 쓴다. 없으면 config.toml `[worker.direction_inquiry] enabled`를 쓴다(현재 운영값 `true`). `tmux_session`은 config.toml에 그대로 둔다.
- 적용:
  - 런타임은 fresh 기동에만 쓴다. 이어 쓰기·fork는 원래 세션 런타임이다.
  - 모델·effort는 기동 런타임에 맞는 쌍을 모든 대화 기동(클릭·자동, 멈춤·실패·외부 작업 완료)에 플래그로 붙인다.
    - claude: `--model`, `--effort`
    - codex: `-m`, `-c model_reasoning_effort=`
  - "따름"이면 플래그를 붙이지 않는다(현행 동작).
- 설정 파일이 손상되면 config.toml 값과 "따름"으로 돌아가고 경고를 남긴다.

### 3.5 계약 재고정

- `dotfiles-ids1k` 착지 뒤 진입 블록 원문과 digest를 다시 고정한다. 계약 원문은 바꾸지 않는다.
- `needs_human_reentry`는 손구현이므로 동작을 계약에 맞춘다(자동 기동, 행당 대화 하나, Bead 없는 행).

## 4. Test scope

- `server/worker/notify.test.js`: 제목이 `🙋 확인 필요 · <클래스>`이고 `🚨 사람 필요`가 없다. 대화 줄과 실패 대체 줄이 있다.
- `server/worker/completion-intent.test.js`, `server/worker/discard-coordinator.test.js`, `server/worker/repo-operation-coordinator.test.js`:
  - 종단에서 알림 1회·기동 1회
  - 재관측·재시작에는 미기동
  - 스위치가 꺼져 있으면 알림만
  - `settleConsumedRetry` 종단도 알림·기동
- `server/worker/resolve-session.test.js`, `server/worker/tmux-launcher.test.js`:
  - 자동 기동은 `placement: 'inquiry'`, 클릭은 `'user'`
  - 런타임별 모델·effort 플래그, "따름"이면 플래그 없음
  - fork는 원래 런타임 유지
  - 저장소 작업 행은 fresh
- `server/worker/queue-store.test.js`: 저장소 작업 키 기록, reconcile이 Bead를 조회하지 않음.
- `server/ws/worker-handlers.resolve-session.test.js`: 저장소 작업 해결 요청 분기와 투영의 해결 재료.
- `server/worker/direction-inquiry.test.js`: 새 진입 블록 digest.
- `app/views/worker/repo-ops-timeline.test.js`, `app/views/monitor/index.test.js`: 실패한 수동 배포 행의 버튼 렌더와 클릭(두 호스트), 살아 있는 대화 표시.
- `app/views/settings-dialog/index.test.js`: 전역 탭 섹션의 저장·로드, config.toml 대체값.

## 5. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소이자 선행 순서 — 대화·수리 경계, 공용 스위치, 읽기 전용 진단, Bead 없는 실패 대화의 계약과 진입 블록 원문 | 없음 | dotfiles-ids1k |

비목표:

- 머지 전 검증 보류·정리 중단·외부 작업 완료의 자동 기동
- 다른 알림 제목 변경
- 자동 수리
- 저장소별 설정

## 6. 결정 (ADR 후보)

- 전제: ADR UI-ooc0 — 서버 전역 편집은 기존 전역 탭 하나에 둔다.
- 전제: ADR UI-u6ud-5 — 수동 `[배포 실행]`과 `script_retry` 한 단계 사다리를 그대로 쓴다.
- 실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 폐기 실패, 수동 배포 실패)은 공용 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 한 번 자동으로 연다. 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일하고 「🚨 사람 필요」를 없앤다. 수동 배포 실패는 「저장소 작업」 서랍의 `[세션에서 이어가기]`와 작업 식별자 키의 대화 레코드를 가진다.
  - 되돌리기 어려움: 함께 움직이는 소비자는 알림 제목을 읽는 사람의 Discord 필터와 습관, 대화 레코드 키를 읽는 reconcile·투영·UI, 계약 사본과 진입 블록 digest다.
  - 맥락 없이 놀라움: 4일 전 결정(UI-18a5, 자동 기동은 멈춤에만)과 ADR 0005의 자동 수리 폐기를 뒤집는 것처럼 보인다. 구분 근거는 "답 전 상태 변경 없음"이다.
  - 실제 절충: 실패마다 드는 세션 토큰과 알림 직후 진단을 받는 시간 이득을 맞바꿨다. 알림 종류를 하나로 줄이는 대신 제목 접미사로 급한 정도를 보인다.
  - `summary`: "실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 폐기 실패, 수동 배포 실패)은 공용 대화 자동 기동 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 실패당 한 번 자동으로 열고, 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일해 「🚨 사람 필요」를 없앤다; 수동 배포 실패는 「저장소 작업」 서랍의 [세션에서 이어가기]와 작업 식별자 키의 대화 레코드를 가지며 인계는 그 작업 1회 재실행이다" → ADR, supersede UI-18a5·UI-18a5-2·UI-18a5-3
- 해결 세션 런타임·모델·effort와 자동 기동 스위치를 전역 탭의 서버 전역 설정에 둔다 — 되돌리기 쉬움(설정 섹션과 파일 하나) → ADR 아님
