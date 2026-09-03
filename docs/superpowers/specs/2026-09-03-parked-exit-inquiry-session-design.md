---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/resolve-session.js
  - server/worker/scheduler.js
  - server/worker/notify.js
  - server/worker/attach.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - app/protocol.js
  - app/protocol.md
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
---

# 파킹 출구 정합 — 모든 파킹에 문의 세션, 파킹 타일 [세션에서 해결], [재시도] 폐지

Bead: `UI-gjp2` · 2026-09-03 · 선행: `dotfiles-ukhs`(`blocks`)

설계 정본: dotfiles
`docs/superpowers/specs/2026-09-03-parking-contract-spec-deviation-and-inquiry-design.md`
(`spec_review=self@899ac86ffc3c7bd33acd3e1c5c1d531884643206`) §1.1·§3. 파킹 사유의
범위, `awaiting_user` 값별 문의 절차, 프롬프트 원문, `park:` notes 줄, "구현 충돌 문의
세션은 finish까지 잇는다"는 정본이 소유한다. 이 문서는 beads-ui의 트리거 조건·슬롯
채우기·재디스패치 범위·타일 출구·클릭 배선을 정한다.

## 0. 현행 공백

2026-09-03 `UI-91fl`이 `awaiting_user=impl_review_conflict:design`으로 파킹됐을 때
관측된 세 가지.

1. **문의 세션이 뜨지 않는다.** `server/worker/direction-inquiry.js`의
   `DIRECTION_PARK_REASONS`가 stale 두 값만 받고(UI-7uid §2 비목표), scheduler의
   `fireDirectionInquiry`가 `attempt.spec_review_stale === true`를 추가로 요구하며, 슬롯을
   notes의 `stale_kind`/`rereview:` 줄에서만 읽는다. 구현 충돌 파킹은 셋 어디에도
   걸리지 않아 알림도 세션도 없었다.
2. **파킹 타일의 출구가 결정을 넣는 통로가 아니다.** 타일 액션은 `[재시도]`
   (`rtile__parked-retry` → ws `worker-parked-retry` → `scheduler.retryParked` →
   `dispatch`)와 `[폐기]`뿐이다(UI-5ym8 §3.1). `[재시도]`는 같은 세션을 잇지 않는 새
   attempt라 워크트리 잔여 커밋에 admission(`worktree_stale_work`)이 막히고, 응답은
   사유 없이 `dispatch_refused`다. 이벤트 로그에 `[재시도] 클릭 · 파킹 해제` 2회, 후속
   `dispatched` 없음. `[세션에서 해결]`(UI-jw27 §4)의 재료 판정
   (`app/views/worker/index.js` `resolve_action`)은 정리 실패·`needs_human`·폐기 실패
   셋뿐이라 파킹 타일에는 그려지지 않는다.
3. **해제 전이가 새 attempt를 띄운다.** `scheduler.onIssuesChanged`는 `awaiting_user`가
   "있다가 없어진" 전이를 보고 새 attempt를 디스패치한다(UI-5ym8 §3.1). 정본 §3.3은
   구현 충돌 문의 세션이 해제 뒤 구현을 finish까지 잇는다고 정하므로, 그대로 두면
   세션이 해제하는 순간 Worker가 같은 Bead에 두 번째 attempt를 띄운다.

부수 결함: 모니터 탭 `app/views/monitor/index.js`에는 `rtile__resolve` 클릭 위임이
없어, 공유 렌더러가 그리는 `[세션에서 해결]`이 모니터에서는 죽은 버튼이다(폐기
실패 타일도 같다).

## 1. 문의 트리거 — `awaiting_user` 값별 분기

### 1.1 조건

- `fireDirectionInquiry`의 `spec_review_stale` 조건과 `direction-inquiry.js`의
  `isDirectionParkReason` allowlist를 없앤다. `parked` 기록 직후(UI-5ym8 §3.1의 같은
  지점) `awaiting_user`가 문자열이면 무조건 `onParkedAttempt`에 넘긴다.
- 모듈 안에서 값별로 분기한다.
  - `spec_review_stale:revise` · `plan_approval_stale:revise`: 현행 그대로
    (`parseStaleNotes`, `receiptKeyFor`, stale 프롬프트).
  - `impl_review_conflict:design`: §1.2의 슬롯으로 구현 충돌 프롬프트.
  - 그 밖의 값: 세션 없이 알림만, `reason='unsupported_awaiting_user'`.
- `enabled` config·tmux fail-closed·Bead당 live 세션 1개(`INQUIRY_PANE_MARKER`)·bridge
  heartbeat 판정·`in_flight` 가드는 값과 무관하게 같다.

### 1.2 구현 충돌 슬롯

정본 §3.2의 첫 입력 슬롯 다섯을 다음 출처에서 채운다.

| 슬롯 | 출처 | 부재 시 |
| --- | --- | --- |
| `원 영수증` | Bead metadata `spec_review` | `없음` 문자열 |
| `충돌 대상`·`finding` | notes `park: impl_review_conflict:design — 대상: … — finding: …` 마지막 일치(`parseParkNotes`, `parseStaleNotes`와 같은 "마지막 줄 우선" 규칙) | 세션 없이 알림만, `reason='park_facts_missing'` |
| `구현 워크트리` | 파킹한 attempt 레코드의 워크트리 경로(`.worktrees/<bead>` 규약, attempt `repo`+`bead_id`) | attempt 없음은 `bd_unavailable`류로 알림만 |
| `기록 세션` | §1.3 | `없음` |

`park:` 줄 정규식은 `^park: impl_review_conflict:design — 대상: (.+?) — finding: (.+)$`이고
`STALE_KIND_RE`·`REREVIEW_RE` 옆에 상수로 둔다.

### 1.3 fork 대상 선택 (정본 §3.2 규칙의 구현)

1. 파킹한 attempt 레코드의 `session_id`가 있고 `runner === 'claude'`이며
   `resolveSessionFile({provider:'claude', session_id, host: <이 호스트>})`가 transcript를
   찾으면 그 `session_id`.
2. 아니면 `qualifySessionFork(issue.metadata, 'claude')`의 결과(UI-jw27 §4의 검증된
   경로: `session_ref` 마지막 유효 claude 항목·로컬).
3. 둘 다 아니면 `없음`. `codex` runner, transcript 부재, host 불일치, `unsafe_session_id`
   전부 여기로 떨어지며 사유는 `qualifySessionFork`의 reason 어휘(`provider_mismatch`·
   `no_session_ref`·`not_local`·…)와 attempt 경로의 `attempt_transcript_missing`을 쓴다.

기동 명령은 `resolve-session.js`와 같은 꼴이다: fork면
`claude --resume '<session_id>' --fork-session <prompt>`, 아니면 `claude <prompt>`.
프롬프트 첫 줄 뒤에 fork 실패 사유 한 줄을 덧붙이는 것도 `buildResolvePrompt`의
`fallback_reason` 처리와 같다. 알림(§4)에 선택 결과와 사유가 한 줄로 실린다.

### 1.4 프롬프트 상수

`DIRECTION_INQUIRY_PROMPT`를 둘로 나눈다: `STALE_INQUIRY_PROMPT`(현행 바이트)와
`IMPL_CONFLICT_INQUIRY_PROMPT`(정본 §3.2 블록의 바이트 복사). 단위 테스트는 각각의
SHA-256을 dotfiles 블록 다이제스트로 고정한다 — 정본이 바뀌면 이 상수 갱신이 형제
작업이라는 규칙은 UI-7uid 그대로다. `fillInquiryPrompt`는 값별로 슬롯 집합이 다르므로
두 함수(`fillStalePrompt`·`fillImplConflictPrompt`)로 나누고, 치환은 현행처럼 한 번의
정규식 패스로 한다(삽입된 값이 다시 스캔되지 않도록).

## 2. 해제 전이 재디스패치 — stale 두 값에만

- `scheduler.onIssuesChanged`의 후보 필터에 조건 하나를 더한다:
  `record.cause_detail?.awaiting_user`가 `spec_review_stale:revise` 또는
  `plan_approval_stale:revise`일 때만 전이 재디스패치 후보다. 두 값의 문의 세션은 발행만
  하고 구현을 착수하지 않으므로(정본 §3) Worker 재디스패치가 그 구현이다.
- `impl_review_conflict:design`은 후보에서 제외한다. 그 문의 세션이 해제 뒤 PR까지
  가므로 Worker는 PR 관측(`resolved` + `pr_url`, 기존 PR 대기 레인 경로)으로만
  정산한다. 해제 뒤 세션이 죽으면 `parked` 레코드와 타일이 그대로 남고 출구는 §3의
  `[세션에서 해결]`(fork 재기동)과 `[폐기]`다 — 새 attempt는 없다.
- `parked_resumed_at`·`markParkedResumed`는 stale 경로의 "attempt당 1회" fence로
  유지한다. 큐 스키마·마이그레이션 변경 없음. `resumeParkedAttempt`는 이 경로만
  부르므로 남긴다.
- `resumeParkedAttempt`가 `dispatch`에서 admission 거부를 받으면 지금은 `false`만
  돌아온다. stale 경로에서도 워크트리 잔여물이 있을 수 있으므로 거부 사유
  (`admission` 레코드의 `reason`)를 파킹 알림 한 줄로 내보낸다. 자동 경로라 토스트는
  없다.

## 3. 파킹 타일 출구

### 3.1 액션

- 파킹 타일(`running-grid.js` `kind === 'parked'` 분기)의 액션 foot은
  `[세션에서 해결]` · `[폐기]`다. `[재시도]`(`rtile__parked-retry`)와 그 title·aria를
  지운다. 슬롯은 카드 문법 §5.1의 액션 foot 그대로이고 새 자리를 고르지 않는다.
- 폐기 실패가 겹친 파킹 타일은 지금처럼 `[폐기] → [폐기 포기] → [세션에서 해결]`
  순서다(ADR 0024). 파킹 자체의 `[세션에서 해결]`과 폐기 실패의 `[세션에서 해결]`은
  같은 버튼 하나이며, 핸들러가 §3.3의 컨텍스트 우선순위로 무엇을 띄울지 정한다.
- 제거: ws op `worker-parked-retry`(`app/protocol.js` 상수, `server/ws/connection.js`
  라우팅, `server/ws/worker-handlers.js`
  `handleWorkerParkedRetry`), `scheduler.retryParked`, Worker 탭 `index.js`와 모니터
  `index.js`의 `rtile__parked-retry` 클릭 분기, 이벤트 `[재시도] 클릭 · 파킹 해제`.

### 3.2 재료

- `app/views/worker/index.js`의 `resolve_action` 판정에 네 번째 재료 "이 행의 최신
  구현 attempt가 `parked`"를 더한다. `resolve_enabled`·`resolve_title`은 기존 3종과 같은
  `resolve_pending` 규칙이고, title 문구는 파킹일 때
  `파킹을 사람이 이어받는 대화형 세션을 띄웁니다 — 살아 있는 문의 세션이 있으면 그 창을 가리킵니다`다.
- 모니터 탭은 같은 `runningTile`을 그리므로 재료는 Monitor 어댑터가 같은 키로
  싣는다(ADR 0014).

### 3.3 핸들러 — `worker-resolve-in-session`의 파킹 분기

- `resolveFailureContext(queue, bead_id)`에 네 번째 컨텍스트를 더한다. 우선순위는
  현행(needs_human → cleanup_failed → 폐기 실패) 뒤에 `parked`: 그 bead의 최신 구현
  attempt가 `status === 'parked'`이면
  `{ failure_class: '파킹', reason: <cause_detail.awaiting_user>, stage: null, detail: <cause_detail.summary> }`.
  앞 셋이 있으면 그것이 먼저다 — terminal 실패가 파킹보다 되돌리기 어렵고, 그 세션이
  파킹도 같이 본다.
- `handleWorkerResolveInSession`은 `failure_class === '파킹'`일 때 `resolveSession.resolve`
  대신 `directionInquiry.launchForClick({ workspace, bead_id, attempt_id, repo, awaiting_user })`를
  부른다. 이 진입은 `enabled` config를 읽지 않는다(그 플래그는 자동 기동 게이트다 —
  `resolve-session.js`의 같은 결정). 값별 분기·슬롯·fork 선택은 §1과 같고, 응답 모양은
  `ResolveSessionOutcome`과 같다: `launched` / `already_running`(`tmux_window` 동반) /
  `not_launched`(`reason`).
- `INQUIRY_PANE_MARKER`로 살아 있는 세션이 있으면 `already_running`이다. `RESOLVE_PANE_MARKER`
  세션은 다른 종류라 보지 않는다(UI-jw27의 "마커는 종류를 말한다" 결정 유지).
- CAS revision 검사는 기존 핸들러 그대로다.

### 3.4 클릭 배선·토스트

- Worker 탭: 기존 `.rtile__resolve` 위임이 파킹 타일에도 그대로 닿는다.
- 모니터 탭: `app/views/monitor/index.js`의 타일 클릭 위임에 `rtile__resolve` 분기를
  추가해 같은 `worker-resolve-in-session`을 보낸다(부수 결함 해소). 폐기 실패 타일도
  이 분기로 살아난다.
- 토스트: `already_running`은 `이미 열려 있습니다 · <tmux_window>`, `not_launched`는
  `세션 기동 실패: <reason>`, `launched`이고 fork fallback이면 `새 세션으로 시작 (<fallback_reason>)`.
  성공 fork는 토스트 없음(기존 resolve 클릭과 같다).

## 4. 알림

- `notify.awaitingUser`는 모든 `awaiting_user` 값에 대해 발송된다. 헤더 어휘
  `⏸️ 방향 질의`를 `⏸️ 파킹`으로 바꾸고 `파킹: <값>` 줄은 그대로다.
- 본문에 세션 결과 한 줄을 싣는다: `launched · fork <sid 앞 8>` /
  `launched · fresh (<fallback_reason>)` / `already_running · <window>` /
  `not_launched · <reason>`. `reason` 어휘에 `unsupported_awaiting_user`·
  `park_facts_missing`·`attempt_transcript_missing`을 더한다.
- §2의 stale 재디스패치 admission 거부는 같은 채널에 `재디스패치 거부 · <reason>` 한 줄.

## 5. supersede 표기

각 스펙 머리에 한 줄 "정정(2026-09-03, UI-gjp2)"을 달고 절은 그대로 둔다.

- UI-7uid §2 비목표 "`impl_review_conflict:design`는 대상이 아니다" → 폐기, §1이 대체.
- UI-5ym8 §3.1 "재개 경로 둘(타일 `재시도`·해제 전이)" → 타일 `재시도` 폐지, 전이는
  stale 두 값 한정, §2·§3이 대체.
- UI-jw27 §4 "표면 3종" → 4종(파킹 타일), §3이 대체.

## 6. 테스트 범위

- `server/worker/direction-inquiry.test.js`: 값별 분기(stale 현행·impl 신규·unsupported
  알림만), `parseParkNotes` 마지막 줄 우선, `park_facts_missing`, 두 프롬프트 다이제스트,
  fork 선택 3단(attempt session → session_ref → 없음)과 사유, `launchForClick`이
  `enabled=false`에서도 기동.
- `server/worker/scheduler.test.js`: `fireDirectionInquiry`가 `spec_review_stale` 없이도
  발화; `onIssuesChanged` 전이 재디스패치가 stale 두 값만 후보(impl 값 제외); admission
  거부 사유 알림.
- `server/worker/resolve-session.test.js`·`server/ws/worker-handlers.test.js`: 파킹
  컨텍스트 우선순위, 파킹 분기가 `launchForClick`로 가고 `already_running`에 창 이름.
- `app/views/worker/running-grid.test.js`·`index.test.js`·`app/views/monitor/index.test.js`:
  파킹 타일 액션 `[세션에서 해결]·[폐기]`, `rtile__parked-retry` 부재, `resolve_action`
  파킹 재료, 모니터 `rtile__resolve` 클릭 → `worker-resolve-in-session`.
- `app/protocol.test.js`·`server/ws/worker-handlers.test.js`: `worker-parked-retry` 부재.
- `app/main.monitor.e2e.test.js`: 파킹 타일 클릭 경로.
- 번들: `npm run build` 후 `app/main.bundle.js`·`.map` 동봉(prettier → build 순).

## 7. 구현 unit 후보

단일 unit. 서버(트리거·재디스패치·핸들러·알림)와 프론트(타일·클릭·protocol)가 같은
ws op 제거를 사이에 두고 맞물려 있어 나누면 중간 상태가 죽은 버튼을 만든다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 저장소 경계 — 계약 정의자(dotfiles)와 소비자(beads-ui) 분리(ADR 0012) | 없음 | dotfiles-ukhs |

- 관찰: `UI-91fl`의 마감 — 이 스펙과 dotfiles-ukhs가 착지한 뒤 `[세션에서 해결]`로 그
  파킹을 잇거나, 사용자 세션이 직접 §7-4 이탈 기록으로 finish한다. 이 스펙의 범위가
  아니다.
- 관찰: `retryParked`의 `dispatch_refused` 응답이 사유를 감춘 것 — op 자체를 없애므로
  별도 수정 없음.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 프롬프트 상수는 dotfiles 블록의 바이트 복사이고 다이제스트로
  고정한다.
- 전제: ADR 0014 — 파킹 타일 액션은 공유 슬롯 표의 액션 foot이고 Worker·Monitor가 같은
  렌더러를 쓴다.
- 전제: ADR 0024 — 사용자 개시 작업 실패의 재진입은 자동 알림 뒤 사람 클릭이며
  `[세션에서 해결]`은 그 출구 하나다.
- 전제: ADR dotfiles/0032 — 문의 세션의 기동·마커·bridge 판정 틀을 그대로 쓴다(정본이
  supersede 후보를 냈다).
- **파킹의 출구는 문의 세션(자동 기동 또는 `[세션에서 해결]` 클릭)뿐이고 새 attempt
  재시도는 없으며, 해제 전이 재디스패치는 stale 두 값에 한정된다**
  - 되돌리기 어려움: 성립 — ws op·핸들러·버튼이 제거되고 알림 어휘가 바뀐다. 되살리면
    구현 충돌 파킹에서 두 attempt가 경합하는 상태가 돌아온다.
  - 맥락 없이는 의외: 성립 — "파킹됐으니 다시 돌려 본다"가 직관인데 파킹은 결정
    대기라 새 attempt가 같은 자리에서 다시 멈추고, 워크트리 잔여물에는 admission이
    먼저 막힌다. 해제 전이 재디스패치를 값으로 가르는 이유도 세션이 구현을 잇는지
    여부가 값에 붙어 있어서다.
  - 실제 trade-off: 성립 — 문의 세션이 없는 호스트(브리지·tmux 없음)에서는 알림 뒤
    사람이 직접 세션을 여는 수밖에 없다 대 재시도 버튼이 주던 "일단 다시" 출구.
    UI-5ym8 §3.1의 `재시도`를 폐지한다.
  - 관계: UI-5ym8·UI-7uid·UI-jw27 스펙 절을 §5대로 정정한다. ADR 0022→0024의 "재진입은
    클릭" 계열과 정합하고 supersede 대상 ADR은 없다.
  - `summary`: "Worker 파킹(`awaiting_user` 존재)의 출구는 값별 문의 세션의 자동 기동과
    파킹 타일 `[세션에서 해결]` 클릭뿐이고 새 attempt `[재시도]`는 없으며, `awaiting_user`
    해제 전이의 자동 재디스패치는 문의 세션이 구현을 착수하지 않는 stale 두 값에만
    걸리고 구현 충돌 값은 PR 관측으로만 정산한다"
    → ADR
