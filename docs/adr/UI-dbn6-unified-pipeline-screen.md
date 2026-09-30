---
id: UI-dbn6
title: 파이프라인 화면 하나와 범위 필터
status: accepted
date: 2026-10-01
summary: "파이프라인 화면은 하나이고 범위(전체·레포)는 필터이며 두 범위 모두 monitor-pipeline 채널의 같은 행으로 5레인을 조립하고 레포 범위만 worker-queue 채널을 더한다; 카드는 슬롯 표를 승계하되 진행은 상단 5칸 띠이고 굵은 포인터의 대기 행 조작은 이동 시트 하나이며 모바일은 레인 하나씩 보인다"
supersedes: ["UI-nuwy"]
spec: docs/superpowers/specs/2026-09-23-frontend-rewrite-unified-pipeline-design.md
bead: UI-dbn6
---

# 파이프라인 화면 하나와 범위 필터

## Context

2026-09-23 사용자 요청은 "로딩이 느리다, 안 쓰는 기능을 빼라, 화면을 다시 짜고 모바일에서도
쓰게 하라"였다. 실측에서 Worker 탭과 Monitor 탭은 같은 다섯 레인(후보·대기·실행 중·PR 대기·
완료)을 두 번 조립하고 있었다. Worker 탭은 워크스페이스 하나를 Board live store와 목록 구독
6개로, Monitor 탭은 모든 저장소를 `monitor-pipeline` 채널 행으로 그렸다. 두 조립 경로는 카드
문법이 같아도 재료의 원천이 달라 서로 어긋났고, 부팅 구독과 워크스페이스별 bd 읽기가 로딩 지연을
키웠다.

사용자 결정(2026-09-23): Worker와 Monitor를 화면 하나로 합치고 전체/레포를 범위 선택으로 둔다.
모바일에서 데스크톱 작업 대부분을 한다. 가드·차단은 현행 그대로다. 도움말 범례·실험 벤치·표시
정책 탭·정렬 체인 편집기는 없앤다. 이 제거는 되돌리기 쉬워 ADR이 아니며 근거는
`app/protocol.md` `## Removed (historical)`와 git 이력이다.

- 전제: ADR UI-u6ud — 데이터 계층은 bd CLI shell-out이고 구독별 store는 전체 issue push를 받아
  내용 변경만 통지한다. 이 결정은 store를 옮겨 쓰고 채널을 줄일 뿐 데이터 계층을 바꾸지 않는다.
- 전제: ADR UI-u6ud-10 — 프리셋 정체성·칩 클릭 의미·칩 바인딩 편집 위치(일괄 창의 서버 전역
  탭)를 그대로 따른다.
- 전제: ADR UI-u6ud-9 — 사용량 집계는 `app/utils/token-usage.js`를 그대로 쓴다.
- 전제: ADR UI-u6ud-2 — ADR 화면 신호는 설치본 체커 결과를 그리기만 한다.
- 전제: ADR UI-u6ud-11 — Worker 주소·저장소 defaults의 세 값 분리 표시를 유지한다.
- 전제: ADR UI-u6ud-3, UI-u6ud-4, UI-u6ud-5 — 머지·게이트·배포 조작의 의미와 버튼 집합은
  바꾸지 않는다.
- 전제: ADR UI-a5l2 — 가드·대기 어휘 4종은 그대로다.
- 전제: ADR UI-ooc0 — 모델 선택지는 서버 전역 활성 모델 필터를 거치고, 편집 위치는 일괄 창의
  서버 전역 탭 하나다.
- `UI-nuwy`(사람 대화는 같은 Worker 세션에서 하고 인계 뒤 Worker가 이어간다)와 이 결정은 카드
  렌더러(`tile-resolve.js`의 `[세션에서 해결]`·`[워커로 이어가기]` 술어, 대화 세션 배지 꼬리)를
  함께 소비한다. 사용자 결정(2026-09-30): 나중에 착지하는 쪽이 앞서 착지한 쪽의 ADR을 승계한다.
  그래서 이 ADR은 UI-nuwy를 대체하고 그 조항을 하나도 뒤집지 않은 채 전부 다시 적는다. UI-nuwy는
  UI-ri8n을, UI-ri8n은 UI-l48z를 같은 방식으로 승계했다. 대화형 세션 레코드의 원천·정산 조항은
  그대로 `UI-nuwy-2`가 정한다.

## Decision

**파이프라인 화면은 하나(`#/pipeline`)이고 범위(전체·레포)는 필터다. 두 범위 모두
`monitor-pipeline` 채널의 같은 행으로 다섯 레인을 조립하고, 레포 범위만 `worker-queue` 채널을
더한다. 카드는 슬롯 표를 승계하되 진행은 상단 5칸 구슬 띠로 그린다. 굵은 포인터에서 대기 행
조작은 이동 시트 하나다. 모바일은 레인을 하나씩 보인다.**

화면과 범위

- 라우트는 `#/pipeline` 하나이고 옛 `#/worker`·`#/monitor` 해시는 이 화면으로 옮긴다. 범위
  선택은 `localStorage` `beads-ui.scope`에 두며 연결 워크스페이스(`beads-ui.workspace`)와 따로
  기억한다.
- 레인 조립은 두 범위 모두 `app/model/lane-model.js` 한 경로다. 레포 범위는 같은 행에서 그 저장소
  묶음만 보이고, 자동화·자동 머지·동시 실행·직렬 레인·저장소 작업 줄을 툴바로 더한다.

구독과 서버 투영

- 부팅 구독은 `monitor-pipeline`·`impl-presets`·`model-visibility` 셋이고 레포 범위에서만
  `worker-queue`를 더한다.
- Worker 탭이 쓰던 목록 구독 6개는 서버 투영으로 대체한다: `monitor-pipeline` 행의
  `bead_overlay`(`beadOverlayFor`)와 `runnable` 항목의 `priority`·`issue_type`
  (`runnable-cache.js`), `title-cache.js` 레코드의 `priority`·`issue_type`·`labels`·`from_id`.
- 레포 전용 재료(완료 기간·보류 목록)는 그 부분을 펼칠 때만 목록 구독으로 보충한다.

카드와 조작

- 카드는 카드 배치 문법(`2026-08-25-card-header-grammar-unify-design.md` §2·§5.1,
  `2026-08-28-chip-grammar-unify-design.md`, `2026-09-02-worker-operation-surface-unify-design.md`
  §3.2)의 슬롯 표를 승계한다. 슬롯이 없는 새 라벨·칩·버튼은 스펙에서 슬롯을 먼저 정한 뒤 단다.
- 후보·실행 카드의 진행은 상단 5칸 구슬 띠(spec·plan·구현·PR·머지)이고, 문서가 있는 단계의
  구슬은 그 문서를 연다. PR 대기 행의 머지 뒤 진행은 같은 모양의 7단계 띠(`MERGE_STEPS`)다.
- `[세션에서 해결]`·`[워커로 이어가기]`의 유무는 `tileResolveFields` 하나가 정하고 렌더러는 다시
  판정하지 않는다. 재료가 없는 줄은 그리지 않는다(fail-quiet).
- 대기 행 조작은 가는 포인터에서 끌기와 `✕`, 굵은 포인터에서 이동 시트(`⋯`) 하나와 길게 눌러
  끌기다.
- 모바일은 레인 하나씩 보이고 하단 레인 바로 옮긴다.

### ADR UI-nuwy에서 승계하는 조항

**사람이 필요한 멈춤은 같은 Worker 세션을 fork 없이 tmux 대화형으로 열어 해결한다. 대화 턴
종료는 답 대기(`action_required`)이고, 첫 줄 `인계 ·`를 관측하면 창 소멸을 확인한 뒤 같은
attempt를 같은 세션·기록 실행 설정으로 재개한다. `인수 ·`면 관찰만, `보류 ·`면 대기로 남는다.
알림은 `🙋 확인 필요`·`❓ 답 대기`·`↪ Worker가 이어감`·`🙋 사람 인수` 넷이다.**

대화 대상

- 대상은 파킹(`awaiting_user` 문자열, 어휘 안팎 모두)과 복구 대기 중 사유가 `authority`·
  `no_progress`인 것이다. 이미 기록된 옛 사유(`verification`·`reconcile`·세션 선언
  `unclassified`·빈 blockers `prerequisite`)도 읽기 호환으로 대상이고 진입 블록은
  `recovery:<사유> (옛 기록)`으로 적는다.
- 술어는 `session-stall.js` 하나(`isSessionStalledRecovery`, 현행 사유 집합
  `CONVERSATION_RECOVERY_REASONS`, 멈춤 표기 `conversationStopLabel`)이고, 현행 사유 집합은 핀
  투영의 `result_line_reasons`와 대조하는 테스트로 고정한다.

기동 — 같은 세션, fork 없음

- 기동 조건은 자동 게이트 `worker_direction_inquiry.enabled`, tmux(닿지 않으면 fail-closed),
  Bead당 하나다. 사람 클릭 `[세션에서 해결]`은 게이트를 읽지 않는다.
- 명령은 attempt의 기록 세션을 그대로 연다: Codex `codex resume <session_id> <진입 블록>`,
  Claude `claude --resume <session_id> <진입 블록>`(`--fork-session`·새 `--session-id` 없음). cwd는
  attempt 워크트리이고 레코드는 `mode: 'resume'`이며 `session_id`를 기동 시점에 안다.
- 한 세션 ID에는 프로세스 하나다. attempt의 `process_identity`가 가리키는 러너가 살아 있으면
  `runner_alive`, 확인할 수 없으면 `runner_liveness_unknown`으로 기동하지 않는다. Worker 재개도
  대화 창의 소멸을 reconcile이 확인한 뒤에만 한다.
- 기록 세션을 열 수 없으면(전사 없음·다른 호스트·러너 불명·워크트리 없음) 같은 provider의
  fresh 세션에 진입 블록을 주고 `fallback_reason`을 기록한다. 그때 인계 뒤 재개는 `resume()`의
  기존 사다리가 정한다.
- 첫 입력은 dotfiles `execution-common.md` `## Worker 세션 대화` 진입 블록의 바이트 사본 하나
  (`CONVERSATION_ENTRY_BLOCK`, sha256 `cdc347bb…`)이고 beads-ui는 멈춤 사유·세션이 남긴 문장·두
  경로만 채운다. 옛 fork 문의 프롬프트 4종은 은퇴했다. 배포 시점에 살아 있던 `mode: 'fork'`
  레코드는 옛 규칙으로 정산한다.

관측과 판정 — 새 assistant 메시지 단위

- 대화가 살아 있는 동안 단계(`turn_state`)는 현행대로 pane 옵션이 정한다. 결과 줄과 답 대기는
  단계 전환이 아니라 **새 assistant 메시지** 단위로 처리한다: 매 pass(30초) 전사 끝 64KB에서
  마지막 assistant 메시지와 그 식별자(메시지 시각, 없으면 전사 mtime)를 읽고, 기동 뒤이면서
  마지막 처리 식별자보다 새 메시지이고 단계가 `running`이 아니면 한 번 처리한다. 관측 사이에
  시작하고 끝난 턴도 잡힌다. 처리한 식별자와 발췌(400자)는 같은 레코드 쓰기에 남는다.
- 첫 줄이 `인계 ·`·`인수 ·`·`보류 ·`로 시작하면 결과 줄이고, 그 밖은 답 대기다.

  | 대화 레코드 상태 | verdict | 카드 조작 |
  | --- | --- | --- |
  | 살아 있는 대화 없음 | `action_required` · `decision` | `[세션에서 해결]` · (`결과 줄 없이 창이 사라진` 경우) `[워커로 이어가기]` · `폐기` |
  | `running` | `normal` (대화 중) | `폐기` |
  | 기동 뒤 assistant 메시지 없음(`idle`·`null`) | `normal` (기동 중) | `폐기` |
  | `question`·`limit`, 또는 결과 줄이 아닌 메시지를 처리한 `idle` | `action_required` (답 대기) | `[워커로 이어가기]` · `폐기` |
  | 인계 예약·사람 인수 | `normal` | `폐기` |

- 결과 줄 없이 창이 사라지면 레코드를 지우고 attempt에 `pane_gone`을 남겨 확인 필요로 되돌린다.
  옛 fork 레코드는 UI-ri8n 규칙(질문·한도만 `action_required`) 그대로다.

인계 — Worker가 같은 세션을 이어감

- `인계 ·`(또는 `[워커로 이어가기]`) → 레코드에 `handoff` 예약(결과 줄·메시지 식별자)을 쓰고 창을
  닫는다(Claude `/exit`, Codex 창 종료). 소멸을 확인한 pass가 이어가기를 한 번 실행하고, 그것이
  돌아온 뒤에야 레코드를 지운다(재시작 중간이면 다음 pass가 다시 실행하고, 이미 자식이 있으면
  소진으로 본다).
- 살아 있는 대화나 `handoff` 예약이 있는 동안 `onIssuesChanged`의 파킹 해제 전이 재디스패치는
  보류한다. 창 소멸 뒤 이어가는 경로는 하나다: 대화의 사용자 답 턴에서 `awaiting_user`가 이미
  해제된 stale 파킹은 기존 해제 전이 재디스패치가 한 번 잇고 `resume()`은 부르지 않는다. 그 밖은
  `resume(workspace, attempt_id, { continuation: 'prior_session', conversation_return })`이다.
- `resume()`는 자식 attempt(`resumed_from`, 같은 `session_id`)를 먼저 기록하고 launch한다. 실행
  설정은 `recordedDispatchSettings(prior)`이고 가드 훅·push 로그·착지 판정은 일반 재개와 같다.
  launch 종류는 `conversation_return`이다.
- 이 경로에만 있는 예외: `parked`를 재개 가능 상태로 받고, admission의 `awaiting_user` 거절을
  `allow_conversation_return`으로 건너뛴다(해제는 재개 세션의 영수증 쓰기가 한다). WS
  `recovery_requires_inquiry`, `settledAttemptFence`, 공급자 자동 재개 차단은 그대로여서 사람
  `↻`나 자동 재디스패치로는 재개하지 않는다.
- 재개 프롬프트 첫머리에 beads-ui 소유 `## 대화 결과` 블록(대화 뒤 무인 attempt로 돌아왔다는
  사실, 이번 대화의 결과 줄 원문, 대화 단계 금지가 풀리고 무인 규칙·가드가 다시 적용되며 남은
  단계는 dotfiles `Worker 세션 대화` 표 순서라는 문장)을 둔다. notes는 읽지 않고 새 권한을 주지
  않는다.
- 자식 기록 전의 거절은 예약을 지우고 확인 필요로 되돌리며 이유를 카드(`이어가기 거절: <사유>`)에
  남긴다. 자식 기록 뒤의 실패는 그 자식의 일반 실패 처리가 맡고 대기 attempt는
  `already_resumed`로 소진된다.

인수·보류·대체 출구

- `인수 ·`: 창을 두고 Worker는 재개하지 않으며 정산은 Bead close·PR 관측(`bd_closed`·`done`)이다.
  판정은 `normal`, 배지는 `사람 인수`, 조작은 `폐기`뿐이다. 인수 세션의 push는 가드 밖이고 사람이
  명시적으로 소유한 것으로 감수한다.
- `보류 ·`: 창을 닫고 attempt는 대기로 남으며 카드는 `[세션에서 해결]`·`폐기`, 알림은 없다.
- `[워커로 이어가기]`는 대화가 살아 있고 답 대기일 때, 또는 결과 줄 없이 창이 사라진 대기
  attempt에만 선다. 누르면 인계와 같은 경로이고 결과 줄 자리에 "사용자가 [워커로 이어가기]로
  인계"를 싣는다. 재개 세션은 이번 대화의 결정(같은 세션의 자기 맥락)이 있으면 적용하고, 없으면
  원래 멈춤을 다시 판단한다. notes의 이전 `대화 결정:` 줄은 쓰지 않는다.
- 두 버튼의 유무는 `tileResolveFields` 하나가 정하고 `[워커로 이어가기]`는 서버 `wait-judgment`의
  actions 투영(`worker-conversation-handoff`)을 찾기만 한다. 렌더러는 다시 판정하지 않는다.

알림

| 종류 | 언제 | 억제 |
| --- | --- | --- |
| `🙋 확인 필요` | 대화 대상 멈춤 기록 직후 자동 기동 시도 뒤 1회(이유 `설계 충돌 · <값>`·`범위 충돌`·`같은 원인 반복`·`옛 기록 · …`, 대화 위치 또는 열지 못한 사유) | attempt `cause_detail.confirm_notified_at` — 보내기 전에 기록 |
| `❓ 답 대기` | 결과 줄이 아닌 새 assistant 메시지를 처리할 때마다(발췌 포함) | 레코드의 처리 식별자 `(bead, launched_at, message_at)` |
| `↪ Worker가 이어감` | `conversation_return` launch 성공(`결정:`·`실행:` 줄) | launch당 1회 |
| `🙋 사람 인수` | `인수` 관측 | 레코드당 1회 |

- `🙋 확인 필요`는 이 대상의 `⏸️ 파킹`과 `⚠ … 지연 · 세션이 멈춤`을 대체한다 —
  `notifyWaitReasons`는 `awaiting_user` 행과 대화 대상 복구 행을 보내지 않는다. 대화가 시작되면
  확인 필요는 소비된 채로 두고 같은 멈춤의 재알림은 `❓`가 맡는다. 보류·대화 중(`running`)은 알림이
  없고 `✅`·`📬`·`❌`는 그대로다.

카드 표면

- 대기 어휘 `awaiting_user`·`recovery` 행의 라벨은 `확인 필요`다. 대화형 세션 배지 꼬리는 대화
  레코드에서 `대화 중 <경과>`·`답 대기`·`사람 인수`다.
- 표면 판정은 서버 투영(`wait-judgment` actions·`tileResolveFields`)에만 둔다. Worker·Monitor가
  같은 `buildLanes` 경로와 같은 클릭 배선을 쓴다.

계약 핀

- `generated/contracts/work-recovery-policy.json`은 schema 2 사본이다(dotfiles
  `f031c9853f536c1478e9d1129b8c69628be27ef8`). `validPolicy`는 `result_line_reasons` 명시 목록이
  `wait_reasons`의 부분집합인지 보고 `reason`은 `wait` 항목에만, `next`는 `reconcile` 항목에만
  요구한다. `recoveryResultLineReasons()`는 그 목록을 그대로 광고한다. schema 1 핀은 받지 않는다.
- schema 2에서 이유 없는 `repair`(코드 결함 아님)·`reconcile` 작업 복구도 수정 Bead가 없으면
  사람 판단 행(`action_required`)으로 남는다.

#### ADR UI-ri8n에서 승계하는 조항

단계 관측

- `interactive_sessions` 레코드는 `turn_state`(`running`·`question`·`limit`·`idle`·`null`),
  `turn_state_since`, `last_message`(`{ text, at }`, 마지막 assistant 메시지 첫 줄 ≤160자; 대화
  레코드는 자르지 않은 첫 줄·400자 발췌·전사 mtime을 더 싣는다), `last_message_read_at`을 갖는다.
  reconcile pass가 `listPanesExtended` 포맷에 실린 `@agent_running`·`@agent_attention`으로 단계를
  정하고(`1` → `running`; `question`·`plan` → `question`; `limit` → `limit`; 그 밖·둘 다 비어
  있음 → `idle`), 값이 바뀔 때만 `turn_state_since`를 쓴다. `null`은 첫 관측 전 레코드뿐이다.
  전사는 `session_id`가 있고 로컬이며 mtime이 새로울 때만 끝 64KB를 읽는다
  (`interactive-progress.js`).
- 시작 타임라인 이벤트는 레코드당 1회다(첫 관측 pass).

대기 판정

- `judgeWaitReasons`의 `recovery` 분기 중 `isSessionStalledRecovery`가 참인 경우와
  `awaiting_user` 분기만 `queue.interactive_sessions[<bead>:inquiry]`를 읽는다.
  `state === 'live'`·`settled_at === null`이 "살아 있는 대화"다. verdict 표는 위 결정이다
  (UI-nuwy가 뒤집음: UI-ri8n 표의 `idle → normal`).
- `provider`·`credential`·선행 목록 있는 `prerequisite` 등 다른 복구 대기의 판정은 바뀌지
  않는다. `headline`은 세션이 남긴 blocker 문장, `since`는 `attempt.finished_at` 그대로다.

카드 출구와 표면

- `[세션에서 해결]`의 유무는 `tileResolveFields(item, resolve_pending, handoff_pending)` 하나가
  정한다: `eligible = parked || wait.recovery || wait_reasons에 recovery || discard.error`,
  `live = interactive_sessions 중 state==='live' && !closing && kind ∈ {inquiry, resolve}`,
  `resolve_action = eligible && !live`. 같은 함수가 `[워커로 이어가기]`의 `handoff_action`을 서버
  actions 투영에서 정한다. 렌더러(`running-grid.js`·`lanes.js`)는 다시 판정하지 않는다. 호출자는
  Worker·Monitor 실행 타일, Worker 대기 행·ghost 행, Monitor `parallelRow`·`serialRow`, PR 대기
  행이다. `external_resume` 세션은 `live`에 세지 않는다.
- 서버 `launchForClick`의 `already_running` 응답은 오래된 스냅샷·타임라인 클릭의 방어로
  남고 토스트 톤은 `info`다.
- 슬롯 표(2026-08-25 스펙 §5.1 `정정(UI-ri8n)`): 슬롯 1 대화형 세션 배지에 단계 꼬리(대화
  레코드는 `대화 중 <경과>`·`답 대기`·`사람 인수`, 옛 레코드는 `작업 중 <경과>`·`질문 대기`·
  `한도 대기`·`턴 종료 <경과>`), 대기 배지 팝업에 `문의 세션 <tmux_session:tmux_window> · <단계>`
  줄, 슬롯 3 held 타일·대기 행에 `▤ <마지막 메시지>` 진행 줄(재료 없으면 안 그림), 슬롯 7 시각
  줄은 살아 있는 문의가 있으면 `문의 세션 <n>분째`. `[워커로 이어가기]`는 `[세션에서 해결]`과 같은
  조작 자리에 선다. Worker·Monitor가 같은 `buildLanes` 경로를 그린다.
- 바꾸지 않는 것: 자동 기동 게이트·브리지 이벤트, 레코드의 생존·종료 규칙(ADR UI-nuwy-2),
  대기 어휘 4종과 대표 사유 순서, 슬롯 6의 `폐기`.

##### ADR UI-l48z에서 승계한 조항

세션 소유 외부 대기 Bead는 `external_wait` 키 하나를 술어로 후보 레인이 아니라
실행 중 레인의 세션 타일에 서고, 외부 대기 조작은 슬롯 6 foot이며, 좌표 칩은 상세
패널 잡 표가 갖는다.

외부 대기 타일과 카드

- `runnable-cache`의 한 행 판정에서 metadata `external_wait`가 비어 있지 않은
  문자열이면 `qualify()`를 건너뛰고 `qualifySession()`으로 간다. `qualifySession`은
  `in_progress`이거나 `external_wait` 키가 있는 `open` 행을 받아 행의 실제 `status`
  (`'in_progress'|'open'`)를 싣는다. Worker 소유 대기 Bead도 같은 규칙으로
  `session_active`에 실리고, 클라이언트의 `claimed` 집합(보류 타일이 먼저 잡음)이
  중복을 막는다. 빈 문자열·비문자열 키와 `deferred`·`closed`는 그대로다.
- `lane-model`의 세션 타일 루프가 `status: entry.status`를 싣고, 소유가 `session`인
  살아 있는 레코드(`stage ∈ {hold, detached, completing}`)를 조립 시점에 `external_wait`
  로 붙인다. 그 타일은 `started_at`·`updated_at`을 싣지 않는다 — 세션이 살아 있지
  않으므로 타일 시계를 돌리지 않는다. 후보 루프의 `claimed` 검사가 같은 bead의 후보
  카드를 없앤다.
- `runningTile`의 다섯째 held 상태는 `external_wait`이고 술어는 레코드가 아니라
  사유(`externalWaitCardParts(tile).badge`)다 — 레코드 없이 키만 남은
  `wait_record_missing`도 `⛔ 조치 필요`와 `[관찰 중단]` 출구를 같은 경로로 갖는다.
  슬롯 1은 `직접 세션` 배지 대신 외부 대기 배지, 조작은 `▤ 세션`뿐(경과 라벨 없음),
  슬롯 3은 `wait_body_lines.body`, 슬롯 7은 `wait_body_lines.times`다.
- `external_wait_check`·`external_wait_stop`·`external_wait_resume`은 `runningTile`·
  `candidateCard`·`miniRow`(카드 변형) 셋 모두에서 슬롯 6 foot이다 — 파킹 처분
  버튼과 같은 판정("이 대기를 어떻게 처분하나")이다. 후보 카드에서는 `↴ 대기로`
  대신 선다. 라벨과 `title`은 서버 `wait-judgment`가 stage별로 정한다: `[지금 확인]`·
  `[관찰 중단]`(hold·detached), `[대기 해제]`(completing stop), `[워커로 이어가기]`
  (fork), `[새 세션으로]`(fresh). 세션 소유 `completing`에서 `[워커로 이어가기]`는
  `session-preferred` 라벨이 있으면 보통 버튼, 없으면 primary다.
- 카드의 `ssh <host>`·잡 번호·`log <path>` 칩은 없다. 상세 패널 `externalJobsTemplate`이
  잡·상태·exit·expected·로그(클릭 = 복사) 표와 그 아래 같은 `data-external-wait-op`
  계약의 조작 줄을 갖는다. 상세 패널은 Worker·Monitor mount의 형제라 자기 처리기로
  같은 op·payload를 보낸다.
- 모든 세션 타일의 세션 정체 칩 `.ctl-chip--sref`는 버튼이고 클릭이 전체 세션 ID를
  복사한다. 세션 소유 완료 Discord 알림은 `session_ref` 마지막 항목에서 재개 명령이
  만들어지면 ` · 세션 <provider> <8자>`와 재개 명령 한 줄을 붙이고, 아니면 지금
  메시지다(fail-quiet).
- `.worker-card__head`·`.worker-mini__head`·`.worker-mini__row1`·`.rtile__hd`는 모든
  폭에서 `flex-wrap: wrap`이고, 머리줄 `.ctl-chip`과 대기 배지 `summary`는 말줄임
  없이 `white-space: normal; overflow-wrap: anywhere`다. 열린 배지의 `flex-basis:
  100%`와 레포 배지 12ch 해제는 640px 이하 미디어쿼리에 그대로 둔다.
- 대기 레코드 투영 `projectExternalWait`·`EXTERNAL_WAIT_FIELDS`, `/resume` fork·fresh와
  `/stop`의 서버 동작, 관찰기 주기·hold 예산·admission의 `external_wait` 거절은
  바꾸지 않는다.

###### ADR UI-u6ud-8에서 승계한 조항

레인과 카드 조립

- 레인 조립은 순수 함수 `buildLanes(workspaces, workspaces_state, options)` 하나다. 입력
  단위는 언제나 워크스페이스 항목 N개이고 Worker 탭은 자기 store를 어댑터로 그 모양에
  접어 넣는다. Worker 전용 모델 빌더는 없다.
- 카드 렌더러는 두 탭이 공유한다. 줄 순서와 새 요소의 자리는 그 요소가 답하는 질문으로
  카드 헤더 문법 스펙의 슬롯 표가 정한다 — 그 표의 현재 값은 2026-08-25 스펙 §2·§5.1의
  `정정(UI-ri8n)` 문단까지다.
- 재료가 없는 줄은 그리지 않는다. 조작은 첫 줄 오른쪽 끝이거나 액션 foot이고 그 사이에
  칩을 끼우지 않는다. 슬롯 표에 없는 요소는 스펙을 먼저 갱신한 뒤 단다.

후보 레인

- 후보 레인은 미착수 이슈의 관측 집합이고 실행 안전은 서버 admission이 지킨다.
  `runnable-cache`의 채택 조건은 `bead_id` 있음, `status`가 `open`, phase child 아님,
  그리고 **`external_wait` 키가 없음** 넷이다 — 키가 있는 `open` 행은 후보 버킷이 아니라
  `session_active` 버킷이다(위 결정). 외부 대기 Bead는 세션이 일하고 결과를 기다리는
  착수된 Bead이므로 미착수 관측 집합이라는 정의와 맞는다.
- 자격 조건은 사실(`admitted`·`spec_state`·`has_description`·`awaiting_user`·
  `worker_ineligible`)로 실리고 `admitted`는 그 사실을 접은 결과다.
- 좁히기는 읽는 쪽이 한다. `runnableFor`/`runnablePeek`의 `include_unadmitted` 기본값은
  `false`이고 `true`는 모니터 투영과 `laneCountsFor`만 넘긴다.
- 모집단은 세그먼트 `전체`/`착수 가능`/`준비 필요`와 슬롯 4a 판정 칩이 갈라 보이고,
  판정 입력은 `queue_placeable` 하나여서 세그먼트와 `↴ 대기로` 버튼이 같은 답을 낸다.
- 큐 진입 자격은 서버 `checkWorkerQueueAdmission()`이 판정하고, `runnable-cache`는 표시
  전용 사전필터이며 스케줄러 dispatch 경로는 이 캐시를 읽지 않는다(`bd ready`가 원천).
- 두 원천의 후보 행은 같은 사실 키 집합 `CandidateFacts`(`app/views/worker/placement.js`가
  typedef 소유: `route`·`spec_state`·`has_description`·`awaiting_user`·
  `awaiting_user_reason`·`release_info`·`dependents_info`·`exec_pins`·`worker_ineligible`·
  `session_preferred_reason`·`spec_after_blocker`)를 싣는다. 어댑터 행은
  `observation: true`만 더하고 판정 필드를 싣지 않는다.
- 자격 판정은 `lane-model`의 `placementFromFacts(facts, null)` 한 경로가 두 원천에 같이
  내린다. 사실 키가 없는 구 서버 행만 허용 폴백(`eligible: true`)이다.
- 배치 불가 사유는 슬롯 4a 준비도 칩(`라우팅 필요`/`본문 필요`/`스펙 충돌`/
  `스펙 미발행`, title = `placementTitle` 문장) 하나가 말한다. `.worker-card__reason`
  줄에는 배치 판정이 서지 않고 관측(⛔ 거절, 사용자 결정 대기 사유, ID 없는 blocked)만
  남는다.
- `♻ 재리뷰 필요`는 구조화 키 `rereview_required: true`로 실리고 슬롯 1 상태 배지다.
- 실행 설정 칩은 `execChipsFor(state, exec_pins, route)` 한 빌더가 후보·대기 행에
  유효값 칩을 만들고 핀에서 온 축만 `pinned`로 표시한다. 완료 행은 마지막 구현 attempt
  기록을 유지한다.
- 숨김 개수 산식은 `per_control` 하나다. 어댑터의 `location` 판정은 후보 제외에만 쓰고
  카드 사유로 쓰지 않는다.

단일 이슈 면

- 워커 탭이 저장소의 단일 이슈 면이다. Board 탭·Board 구독·`state.board`는 없고, 라우터
  기본 뷰와 알 수 없는 해시는 `worker`이며, 레거시 해시(`#/board`·`#/board?issue=<id>`·
  `#/issue/<id>`·`#/issues`·`#/epics`)는 `#/worker` 또는 `#/worker?issue=<id>`로
  정규화한다. nav의 저장소 탭 묶음에는 `Worker` 하나다.
- deferred 이슈는 후보 레인 아래 접힌 `보류 <N>` 선반에 `candidateCard`의
  `variant: 'deferred'`로 그리고 `[↴ 대기로]`·준비도 칩·자격 판정이 없다.
- `+ 새 이슈`는 워커 툴바 버튼이다. 완료 레인 기간은 `오늘`·`7일`·`30일`·`전체`이고 완료
  레인은 Worker 완료 행과 `closed-issues` 구독의 합집합이며, 세션 완료 보고서가 확인된
  행만 세션 배지를 얻는다.
- 우선순위·타입·라벨 필터는 `worker-filter` 줄의 세 축으로 모든 레인에 적용되고
  후보·보류는 숨기며 대기·실행 중·PR 대기·완료는 흐린다.
- 드래그로 상태 변경과 카드 키보드 탐색은 없다(상태 변경은 이슈 상세의 상태 드롭다운).
  `ui-order`(`subscribe-ui-order`·`unsubscribe-ui-order`·`ui-order-set`·
  `ui-order-snapshot`)와 그 서버 저장소는 없다.
- 공유 코드는 `app/views/stepper.js`와 `app/views/exec-format.js`에 둔다.

###### ADR UI-u6ud-7에서 승계한 조항

대기 어휘

- Worker는 사람 결정이 필요한 곳에서만 멈춘다.
- 대기 어휘는 넷이다: `선행 대기 ⛓`(`prerequisite`·`prerequisite_foreign`; 선행이
  `blocked`·`deferred`·worker-ineligible이면 `action_required`), `공급자 보류 ⏳`
  (`provider_hold`), `재시도 대기 ↻`(`retry_wait`; 예약 + `grace_ms` 경과면 `overdue`),
  `확인 필요 ⏸`(`awaiting_user`와 `recovery`; verdict는 위 결정의 대화 레코드 표가 정한다 —
  UI-nuwy가 뒤집음: 살아 있는 대화의 턴 종료는 답 대기 `action_required`, 대화 중·기동 중만
  `normal`).
  `external_job` 행은 나란히 선다.
- 판정은 `normal`·`overdue`·`action_required`이고 `overdue`는 다음 확인 시각이 있는
  종류(공급자 보류·재시도 대기·외부 작업)에만 난다. 대표 사유 순서는
  `awaiting_user`/`recovery` > `provider_hold` > `prerequisite_foreign` > `prerequisite` >
  `retry_wait`다.
- `확인 필요` 카드 본문(슬롯 3)은 세션이 남긴 문장 한 줄이다. `조건 대기`·`확인 대기`·
  `반영 대기`·`처분 대기`·`정지`·`환경 보류` 라벨, `stale_work`·`base_moved`·`queue_hold`
  종류, verdict `disposition`·`hold`·`recovery_confirm`·`settle_overdue`(recovery)는 없다.
- `막힘 N`은 이슈 단위 사유가 하나라도 있는 원래 이슈 수이고 새 대기 종류는 어휘 표에
  행을 더한다. 화면 대표는 "무엇을 기다리나"가 정하고, attempt의 생사와 레인 점유가
  대표를 정한다. `복귀 대기` 배지는 없다.

복구 계약 소비

- 복구 계약은 핀된 사본 `generated/contracts/work-recovery-policy.json`으로 소비하고
  provenance로 검증하며 `supported:false`면 새 자동 동작을 보류한다. disposition·wait
  reason·분류 키는 계약이 정의하고, 이 저장소는 분류 순서(`unclassified`를 주는 키를
  정책 조회 뒤 env 티어로 보내는 것)만 정한다.
- 세션이 선언한 대기 줄은 계약의 `result_line_reasons` 명시 목록(schema 2)만 허용하고 대기 의도일 뿐
  승인·종료·효과·재개 자격을 입증하지 않는다. `BDUI_WORK_RECOVERY_SCHEMA=1`과 preamble
  결과 줄은 검증된 구현·quick_fix 세션에만 전달된다.
- 실제 usage-limit는 구조화 증거로만 보류가 된다. 자동 fatal 목록은 비어 있으며 모델의
  실패 주장·retry 소진·PR 부재만으로 최종 실패를 만들지 않는다.
- 재개 fence는 복구 대기를 실패 행과 같이 막아 새 attempt를 자동 디스패치하지 않고,
  재개는 기록된 runner·model·effort·speed·세션을 보존하며, 같은 계보의 같은 원인 반복은
  `no_progress`로 승격한다.

미분류 실패

- 정책 키 `finished_without_result_line`·`past_failure_line`·`environment_line`·
  `unknown_error`로 `unclassified`가 되는 종료와 `session_failed:turn_failed`는 `env`
  티어다(env 패턴이 맞으면 그 그룹, 아니면 `unknown`).
- 재시도는 이 호스트에 실패 attempt의 세션 기록이 있으면 같은 세션·러너·모델·effort·
  계정을 `resume`하고, 없으면 같은 실행 설정을 승계한 새 `dispatch`다.
- 사다리(2·5·15분, 3회)를 다 쓰면 attempt는 `failed`, 카드는 실패 타일(`↻`·`폐기`),
  `❌ 실패` 알림 1회, Bead는 `open`이다. `transient_retry_exhausted → wait`는 없고 예산은
  리셋되지 않으며 사람의 `↻`는 같은 계보의 수동 재개다. 저장된 `waiting/unclassified`
  기록은 로드 시 `failed`(`retry.migrated:'unclassified_wait'`)로 이행하고 알림·자동
  재개는 없다.

파킹과 복구 대기의 출구

- `parked`는 verdict `success` ∧ bead status ∉ {resolved, closed} ∧ `pr_url` 없음 ∧
  `awaiting_user` 키 존재일 때 `status='parked'`, `cause='session_parked'`이고 실패가
  아니므로 큐는 계속 간다. Worker는 스스로 새 attempt를 만들지 않는다.
- 모든 파킹(`awaiting_user` 문자열이 계약 어휘 안이든 밖이든)은 기록 직후 같은 세션
  대화를 기동한다(UI-nuwy가 뒤집음: fork 문의 세션과 값별 프롬프트 4종 대신 attempt 세션의
  fork 없는 재개와 dotfiles 진입 블록 하나, 바이트 사본은 다이제스트로 고정).
- 파킹 타일의 출구는 `[세션에서 해결]`·`[워커로 이어가기]`(위 결정의 조건)·`[폐기]`다.
  `[세션에서 해결]`은 살아 있는 문의·해결 세션이 없을 때만 서고 같은 세션을 대화형으로 열며
  자동 기동 게이트(`worker_direction_inquiry.enabled`)를 읽지 않는다. 서버 `already_running`
  응답은 오래된 스냅샷·타임라인 클릭의 방어로 남는다.
- 새 attempt `[재시도]` 버튼은 없다.
- 해제 전이 자동 재디스패치는 stale 두 값에만 걸리고 후보 판정은 파킹 레코드의
  `cause_detail.awaiting_user`로 한다. `impl_review_conflict:design`은 PR 관측
  (`resolved` + `pr_url`)으로만 정산하고, 어휘 밖 값의 정산은 그 값을 정의하는 계약이
  소유한다. stale 경로의 attempt당 1회 fence(`parked_resumed_at`)를 둔다. 살아 있는 대화나
  인계 예약이 있는 동안 해제 전이 재디스패치는 보류한다(UI-nuwy).
- 세션이 선언한 복구 대기(결과 줄 `대기 · recovery:<reason>`의 `authority`·`no_progress`,
  옛 기록의 `verification`·`reconcile`·세션이 선언한 `unclassified`·`blocks` 목록이 빈
  `prerequisite`)는 술어 `isSessionStalledRecovery` 하나로 판정하고, `waiting` 기록 직후
  파킹과 같은 게이트(`worker_direction_inquiry.enabled`·tmux·Bead당 1개)로 같은 세션 대화를
  띄운다(UI-nuwy가 뒤집음: fork 문의 세션과 `recovery` 프롬프트 대신 진입 블록 하나).
- 복구 대기 카드 조작은 `[세션에서 해결]`(살아 있는 문의·해결 세션이 없을 때)·
  `[워커로 이어가기]`(위 결정의 조건)·`폐기`이고 `↻ 이어하기`는 없다. 알림은 위 결정의 네
  종류이고 `waitActionRequired`의 `⚠ … 지연`은 이 대상에 보내지 않는다(UI-nuwy가 뒤집음).
  `provider`·`credential`은 공급자 보류 경로, `blocks` 목록이 있는 `prerequisite`는 선행
  대기다.

base_moved와 재개 종류

- `base_moved`는 기록 직후 2분 뒤 같은 세션을 자동 재개하고(방아쇠만 자동), 같은
  계보에서 세 번 반복되면 `확인 필요`(`reason: no_progress`, `base가 반복 이동함 ·
  후보 <sha7>`)이다.
- 재개 종류는 `resumeKindOf(quickfix_landing)`이 사유 문자열로 정하고 `session` 목록에
  `base_moved`가 있다. 기계 정산은 같은 attempt의 착지 후 단계 재실행이며 버튼은
  `↻ 정리 재시도`, 세션 실행은 `↻ 이어하기`다. `settlement`의 세션 참조 면제와
  `bd_read_failed` 기록, 폐기의 `parent_reset` 파괴성 경계를 둔다.

잔재 처분

- 디스패치의 `disposeStaleResidue`가 검증된 잔재 identity(`identity`·`state`·`cause`·
  capability 플래그)로 순서대로 처분한다: `can_resume` → 같은 세션 `resume`;
  `can_continue` → 잔재 워크트리·브랜치로 새 attempt `dispatch`(커밋 보존);
  `can_backup_fresh` → `backupFreshResidue(identity)`로 `discard-backups`에 보관 뒤 같은
  tick에서 새 attempt(백업이 `identity_changed`면 재관측 뒤 재판정); 그 밖은 재관측 1회
  뒤 `failed`·`stale_work_unresolved`.
- 다른 소유자의 PR·원격 브랜치가 확인된 잔재는 `preserve:true`로 재관측해 자동 정리하지
  않는다. timeline `stale_work_auto`만 남기고 알림은 없다. WS op `worker-stale-work-*`,
  admission `worktree_stale_work`는 없고 로드 시 남은 admission은 지운다.
- 선행 대기 attempt(`status === 'waiting' && cause === 'prerequisite_unmet'`)는
  `resumableResidueAttempts`의 잔재 재개 후보다. 복귀 트리거·재스캔 후보·`bd ready`
  판정·클레임은 그대로이고 재개 여부는 preflight의 잔재 처분 사다리가 고른다.
- 선행 대기 후보는 `unique` 잔재(dirty 또는 고유 커밋)에만 매칭되고 `preserve`를 켜지
  않는다. 버릴 수 있는 잔재와 worktree 없음은 보통 dispatch다.
- `judgePrerequisiteWait`는 owned worktree의 HEAD를 attempt `head_oid`로 기록한다. 관측
  실패·브랜치 불일치는 아무것도 쓰지 않는다.
- `resume()`는 선행 대기를 `preclaimed` 경로에서만 받고 사람 클릭 `[이어하기]` 경로는
  열리지 않는다. 프롬프트는 `prerequisite_return` 서두 + 기존 ancestor 사실 +
  `## 선행 완료` 블록(닫힌 선행의 `status`·`closed_at`·`close_reason` readback, "선행
  완료는 구현 완료가 아니다")이다.
- 선행 대기 후보의 기동 전 판정 거절(`not_failed`·`prior_session_unavailable`·
  `transcript_missing`·`worktree_missing`·`runner_mismatch`·`continuation_decision_stale`·
  `already_resumed`·`no_progress`)은 같은 pass에서 `continue`·`backup_fresh`로 이어지고
  타임라인 cause는 `resume_refused:<reason>`이다. 기동·상태 오류만 `stale_work_unresolved`다.
- 선행 대기 재개에 예약 레코드·재시작 정산·새 status/cause 어휘·카드 조작은 없고, 재개
  attempt는 `resumed_from` 계보·`launch_kind: resume`으로 선다.

외부 작업 대기

- 외부 작업 대기는 소비자 Bead 자신의 `external_wait` 상태이고, Worker 한 런타임이
  관찰·완료·알림·재개를 소유하며, hold 예산 판정과 `대기 · external:<wait_id>` 종결,
  보존 세션의 fork 재개를 둔다. Worker 소유는 자동 fork이고 세션 소유는 알림 뒤 사람의
  출구 — 세션 칩 복사로 자기 세션에서 잇거나 `[워커로 이어가기]` — 이며 fork 자격
  실패는 launch 없이 사람의 `[새 세션으로]`다(동작은 UI-z437 그대로, 라벨만 바뀐다).
  소비자 카드 표면은 위 결정(외부 대기 타일과 카드)이 정한다.
- 이벤트 구독 복귀·admission 진단 기록·재스캔 후보(`external_job` 제외)·foreign 트리거
  매칭을 따른다.
- 자동 진행 꺼짐은 무표시이고 `manual_only`·`[지금 시작]` 게이트 조건·직렬 레인 선두
  규칙·연결 레인 폐기를 따른다. `waiting`은 기계 사실 대기이고 `external_wait` 외 새
  상태는 만들지 않으며 `prerequisite_unmet`은 증명으로만 선다.

레인 퇴장

- bd `closed` 또는 `deferred` Bead는 병렬 `queue`와 모든 직렬 레인의 대기 행에서
  자동으로 물러난다. `closed`는 `done`으로 이동하고, `deferred`는 제거하며 그 Bead의
  비종료 계보가 잡은 직렬 레인 연결도 푼다. `resolved`는 대상이 아니고 `pr_wait`·`done`은
  순회하지 않는다. poller sweep과 tick 안 admission 처분은 같은 헬퍼로 판정한다.
- leaf `paused` attempt는 그 Bead의 bd 종료가 우선한다. ■ 정지의 paused 분기와 같은
  순서(leaf 가드 → 종료 약속 대기 → 기준 이동 관측 → `stopped` 기록 → 보호 훅 해제 →
  잔재 정리)로 처분하고 `stopped`에 `cause: bead_closed | bead_deferred`를 싣는다. 처분
  뒤 bd 상태를 다시 읽어 여전히 `closed`/`deferred`일 때만 레인을 변이한다.
- 워크트리는 버릴 수 있을 때만 지우고(`removeIfDiscardable`) 미반영 변경이 있으면
  보존한다.
- 제거 사실은 Bead 타임라인 `queue_removed` 한 줄로 남긴다. 다시 `open`이 돼도 자동
  재배치는 없다 — 배치는 사람·세션의 명시적 place다.
- dispatch·lane fence의 활성 집합은 paused를 포함하고, sweep만 옵션으로 leaf paused를
  제외한다.

레인과 provider 보존

- 실행 레인은 매 launch에서 현재 route로만 유도한다. `app/utils/quickfix-lane.js`의
  `laneOfRoute(route)` 하나가 소유하고 서버·클라이언트가 같은 사본을 읽는다. `quick_fix`만
  `quick_fix`, 그 외는 `pr`다. 레인은 relaunch 상속 목록에 들어가지 않는다.
- 기록된 레인(`prior.quickfix_lane`)과 현재 레인이 다르면 모든 재개·relaunch 경로(수동
  이어하기, `base_moved` 보존 후보, 공급자 자동 재개, 지시 재시작, 머지 큐 충돌 해소,
  REVISE 처분)는 세션을 띄우지 않고 `route_changed`로 거절한다. 판정은
  `laneMismatchOf(prior, bead_snapshot)`가 진입 경로와 launch 직전 두 곳에서 하고
  admission보다 먼저 거절한다.
- 거절은 실행 상태를 바꾸지 않고 이전 attempt의 진단 필드
  `resume_refused='route_changed:<prior_lane>→<current_route>'`와 공급자 자동 재개의
  `auto_resume_refused`만 쓴다. Bead metadata는 읽기 입력이다.
- 사유 기반 정산 재실행(`[정리 재시도]`, `resumeKindOf === 'settlement'`)만 기록된
  레인으로 완료한다.
- `route_changed` 복구는 기존 조작([폐기] 뒤 재배치 또는 [지금 시작])이고 세션 승계·자동
  재진입·승인 키 위조는 없다. 표현은 기존 슬롯(응답 `reason='route_changed'`·
  `route_change`, 토스트, 실패 타일 안내 줄 `RESUME_REFUSALS`)이고 새 슬롯·배지·버튼·
  타임라인 이벤트는 없다.
- 세션 참조는 provider와 함께 전달되고, 유효한 로컬 원본 세션이 있으면 기록된 provider와
  ID로 resume 또는 fork한다. 현재 기본 provider가 달라도 유지한다.
- transcript가 없거나 쓸 수 없으면 fresh fallback을 원본 provider 안에서 수행하고 이유를
  기록한다. 원본 자체가 없을 때만 현재 실행 설정으로 fresh를 시작한다.
- provider 변경은 사용자의 명시적 선택(`fresh_current`·`exec_override`·decision token)으로만
  일어나고, 도구 오류·기록 누락·알 수 없는 runner로 Claude↔Codex를 자동 전환하지 않는다.
  실행 파일 부재는 `launch_failed:<runner>_not_found`다.
- `continuation_choice='prior_attempt'` 자식은 same-provider fresh fallback 없이 기록된
  세션의 엄격한 재개만 허용한다.
- provider 보존은 실행 위치 선택이며 승인·review 권한을 부여하지 않는다.

### 대안과 기각 사유

- **두 탭을 유지하고 부품만 공유한다.** 조립 경로가 둘로 남아 재료 원천이 어긋나고, 로딩 지연의
  원인인 부팅 구독·워크스페이스별 bd 읽기가 그대로다.
- **Worker 탭의 목록 구독 6개를 유지한다.** 레포 범위에 들어갈 때마다 구독이 늘고, 전체 범위와 레포
  범위가 다른 원천으로 같은 카드를 그린다.
- **모바일 전용 화면을 따로 둔다.** 렌더러가 둘이 되어 한쪽에만 있는 기능이 생긴다.

UI-nuwy에서 승계한 대안:

- **fork 문의 세션이 끝까지 가는 현행.** 가드·관측이 없고 문의 금지 때문에 끝내지 못한다
  (`beads-sw1` 실측).
- **fork 수리 뒤 fork 세션을 Worker가 재개.** fork 세션 ID 포착이 pane 옵션에 기대어 취약하고
  결정 맥락이 원래 세션과 갈린다.
- **대화 단계 판정을 턴 단계(pane 옵션)로만 한다.** 산문 질문이 `idle`로 읽혀 `normal`이 되고,
  관측 사이에 끝난 턴의 결과 줄을 놓친다 — 메시지 단위 처리로 대신한다.

UI-ri8n에서 승계한 대안:

- **대기 배지를 숨기고 문의 배지만 남긴다.** 카드는 단순하지만 attempt가 멈춰 있다는 사실과
  `막힘 N` 요약이 어긋난다.
- **버튼을 남기고 `already_running` 토스트만 고친다.** 코드 변경이 가장 적지만 이미 열린
  창을 다시 가리키는 조작이 남아 실측에서 사용자가 두 번 헤맸다.
- **클라이언트가 transcript 서랍 구독으로 진행을 파생한다.** 카드마다 구독을 열어야 하고
  판정(배지)이 서버와 클라이언트로 갈린다.
- **브리지 스풀·manifest에서 마지막 메시지를 읽는다.** 스풀은 Discord ack 뒤 삭제되고
  manifest에는 메시지가 없다.

UI-l48z에서 승계한 대안:

- **클라이언트가 대기 레코드만으로 타일을 만든다.** 제목·라벨·`session_refs`를 다른
  경로에서 끌어와야 하고 Worker 탭(Board live store)과 Monitor 탭(runnable-cache)의 후보
  원천이 달라 조립 규칙이 둘이 된다 — 승계한 "lane-model 한 경로" 조항과 어긋난다.
- **후보 레인 안에 "외부 대기" 구획을 둔다.** `↴ 대기로`가 뜻 없는 카드가 후보 집합에
  남고 Worker 소유 대기와 자리가 갈린다.
- **머리줄 유지 + 줄바꿈만.** 조작 셋이 다음 줄로 내려가 제목 위에 뜬다 — 조작 묶음이
  자기 줄 오른쪽 끝에 남는 규칙과 어긋난다.
- **카드에 `⧉ 재개 명령` 버튼을 더한다.** 조작이 하나 늘고 세션 칩 복사와 Discord 명령
  줄로 같은 일이 된다.

## Consequences

- 되돌리기 어렵다: 라우터(`app/core/router.js`), 구독(`app/core/channels.js`), 카드 렌더러
  (`app/screens/pipeline/`), 설정 진입(`app/screens/settings/`), 모바일 조작(`move-sheet.js`·
  `drag.js`), 서버 투영(`runnable-cache.js`·`title-cache.js`·`monitor-handlers.js`
  `beadOverlayFor`)이 함께 움직인다.
- 맥락 없이는 놀랍다: Worker 탭과 Monitor 탭이 없고, 레포 범위만 `worker-queue`를 구독하며, Worker
  탭의 목록 구독이 서버 투영 필드로 바뀌었다.
- 감수하는 것: 레포 전용 재료(완료 기간·보류)는 펼칠 때 목록 구독을 여는 만큼 늦게 보인다.
- UI-nuwy의 조항은 뒤집은 것 없이 전부 승계했고 폐기한 조항은 없다.

UI-nuwy에서 승계한 결과:

- 되돌리기 어렵다: `direction-inquiry.js` 기동(같은 세션 명령·진입 블록 사본), `scheduler.js`
  reconcile의 메시지 처리·인계 이어가기와 `resume()`의 `conversation_return` 예외, `admission.js`의
  `allow_conversation_return`, `wait-judgment.js` 대화 verdict 표와 actions, `notify.js` 네 종류와
  억제, `tile-resolve.js`의 두 버튼 술어, `session-stall.js` 술어, 핀 투영 schema 2가 함께 움직인다.
- 맥락 없이는 놀랍다: 파킹된 attempt가 `awaiting_user`를 단 채 재개되고, 그런데도 사람 `↻`는
  없다. 재개는 대화의 `인계`(또는 `[워커로 이어가기]`) 뒤 창 소멸을 확인한 한 경로뿐이다.
- 감수하는 것: 메시지 단위 관측을 위해 30초마다 대화 전사 끝 64KB를 읽는다. 무인 세션 이력에
  대화가 섞인다. 인수 세션의 push는 가드 밖이다.
- 미확인 전제: 대화형 Codex 창이 기본 `CODEX_HOME`에서 attempt 세션을 `codex resume`로 이어 쓰고
  이후 attempt 홈의 `codex exec resume`가 같은 rollout을 찾는지는 배포 뒤 첫 실제 대화에서
  확인한다.
- UI-ri8n의 조항은 뒤집은 둘(`idle → normal`, 파킹·복구 대기 출구를 fork 문의 세션이 끝까지
  처리하는 조항과 그 알림·프롬프트) 외에 전부 승계했고 폐기한 조항은 없다.
