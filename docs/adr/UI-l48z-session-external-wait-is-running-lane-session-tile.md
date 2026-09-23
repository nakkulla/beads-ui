---
id: UI-l48z
title: 세션 소유 외부 대기는 실행 중 레인의 세션 타일이다
status: accepted
date: 2026-09-23
summary: "세션 소유 외부 대기 Bead는 external_wait 키를 술어로 후보 레인이 아니라 실행 중 레인의 세션 타일에 서고, 외부 대기 조작은 슬롯 6 foot이며 좌표 칩은 상세 패널 잡 표가 갖는다"
supersedes: ["UI-u6ud-8", "UI-u6ud-7"]
spec: docs/superpowers/specs/2026-09-23-external-wait-session-tile-card-declutter-design.md
bead: UI-l48z
---

# 세션 소유 외부 대기는 실행 중 레인의 세션 타일이다

## Context

UI-z437(ADR UI-u6ud-7이 승계)이 착지한 뒤 세션이 제출한 외부 작업을 기다리는 Bead는
후보 레인에 섰다. 세션은 `대기 · external:` 종결에서 Bead를 `in_progress → open`으로
돌리므로 `runnable-cache`의 세션 버킷(`status === 'in_progress'`)에서 빠지고 `bd ready`
행으로만 남았기 때문이다. 그 카드는 한 줄 머리줄에 `세션 권장`·`복잡`·영역 라벨·
대기 배지·조작 버튼 셋을 실어 640px 초과 폭에서 말줄임으로 잘렸고, 슬롯 5의 `ssh`·
잡 번호·`log` 칩은 상세 패널 잡 표와 중복이었으며, 세션 소유 대기의 완료 출구는
Worker fork `[이어하기]`뿐이라 사람이 자기 세션에서 이어갈 세션 ID를 카드에서 얻을
수 없었다. 사용자 결정(2026-09-23, 스펙 §2): 세션 소유 대기는 실행 중 레인에 둔다;
카드에는 배지·한 줄 요약·시각 줄만 남긴다; 머리줄은 줄을 넘긴다; 세션 ID는 카드에서
한 번 클릭으로 복사한다; 완료 뒤 `[관찰 중단]`은 "이어가지 않고 대기를 푼다"로
읽혀야 한다.

- `UI-u6ud-8`(후보 레인과 카드 조립): "`runnable-cache`의 채택 조건은 `bead_id` 있음·
  `open`·phase child 아님 셋뿐이다" 한 조항을 뒤집고 나머지 조항 전부를 승계한다.
- `UI-u6ud-7`(Worker 대기·재개·잔재 처분): 외부 작업 대기 절의 "보존 세션의 fork
  재개와 `[이어하기]`·`[새 세션으로]`, 소비자 카드 표면"에서 카드 표면 조항 하나를
  뒤집고(라벨은 `[워커로 이어가기]`·`[새 세션으로]`로 바뀌며 동작은 유지) 나머지
  조항 전부를 승계한다.

## Decision

**세션 소유 외부 대기 Bead는 `external_wait` 키 하나를 술어로 후보 레인이 아니라
실행 중 레인의 세션 타일에 서고, 외부 대기 조작은 슬롯 6 foot이며, 좌표 칩은 상세
패널 잡 표가 갖는다.**

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

### ADR UI-u6ud-8에서 승계하는 조항

레인과 카드 조립

- 레인 조립은 순수 함수 `buildLanes(workspaces, workspaces_state, options)` 하나다. 입력
  단위는 언제나 워크스페이스 항목 N개이고 Worker 탭은 자기 store를 어댑터로 그 모양에
  접어 넣는다. Worker 전용 모델 빌더는 없다.
- 카드 렌더러는 두 탭이 공유한다. 줄 순서와 새 요소의 자리는 그 요소가 답하는 질문으로
  카드 헤더 문법 스펙의 슬롯 표가 정한다 — 그 표의 현재 값은 2026-08-25 스펙 §2·§5.1의
  `정정(UI-l48z)` 문단까지다.
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

### ADR UI-u6ud-7에서 승계하는 조항

대기 어휘

- Worker는 사람 결정이 필요한 곳에서만 멈춘다.
- 대기 어휘는 넷이다: `선행 대기 ⛓`(`prerequisite`·`prerequisite_foreign`; 선행이
  `blocked`·`deferred`·worker-ineligible이면 `action_required`), `공급자 보류 ⏳`
  (`provider_hold`), `재시도 대기 ↻`(`retry_wait`; 예약 + `grace_ms` 경과면 `overdue`),
  `세션이 멈춤 ⏸`(`awaiting_user`와 `recovery`; 항상 `action_required`·코드 `decision`).
  `external_job` 행은 나란히 선다.
- 판정은 `normal`·`overdue`·`action_required`이고 `overdue`는 다음 확인 시각이 있는
  종류(공급자 보류·재시도 대기·외부 작업)에만 난다. 대표 사유 순서는
  `awaiting_user`/`recovery` > `provider_hold` > `prerequisite_foreign` > `prerequisite` >
  `retry_wait`다.
- `세션이 멈춤` 카드 본문(슬롯 3)은 세션이 남긴 문장 한 줄이다. `조건 대기`·`확인 대기`·
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
- 세션이 선언한 대기 줄은 계약의 wait reason과 `reconcile`만 허용하고 대기 의도일 뿐
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
- 모든 파킹(`awaiting_user` 문자열이 계약 어휘 안이든 밖이든)은 기록 직후 문의 세션을
  기동한다. 값별 분기는 stale 두 값, `impl_review_conflict:design`, 그 밖의 값(일반 파킹
  블록) 셋이고 프롬프트 원문은 dotfiles 소유이며 beads-ui는 바이트 복사를 다이제스트로
  고정한다.
- 파킹 타일의 출구는 `[세션에서 해결]`·`[폐기]` 둘이다. `[세션에서 해결]`은 살아 있는
  문의 세션이 있으면 그 pane을 가리키고(`already_running`) 없으면 기록된 세션을 fork해
  띄우며 자동 기동 게이트(`worker_direction_inquiry.enabled`)를 읽지 않는다.
- 새 attempt `[재시도]` 버튼은 없다.
- 해제 전이 자동 재디스패치는 stale 두 값에만 걸리고 후보 판정은 파킹 레코드의
  `cause_detail.awaiting_user`로 한다. `impl_review_conflict:design`은 PR 관측
  (`resolved` + `pr_url`)으로만 정산하고, 어휘 밖 값의 정산은 그 값을 정의하는 계약이
  소유한다. stale 경로의 attempt당 1회 fence(`parked_resumed_at`)를 둔다.
- 세션이 선언한 복구 대기(결과 줄 `대기 · recovery:<reason>`의 `authority`·
  `verification`·`no_progress`·`reconcile`, 세션이 선언한 `unclassified`, `blocks` 목록이
  빈 `prerequisite`)는 술어 `isSessionStalledRecovery` 하나로 판정하고, `waiting` 기록
  직후 파킹과 같은 게이트(`worker_direction_inquiry.enabled`·tmux·Bead당 1개)로 문의
  세션을 띄운다. 프롬프트는 dotfiles `execution-common.md` Direction inquiry 절 `recovery`
  블록의 바이트 복사이고 다이제스트를 고정한다.
- 복구 대기 카드 조작은 `[세션에서 해결]`·`폐기`이고 `↻ 이어하기`는 없다. 알림은
  `waitActionRequired` 1회에 문의 세션 결과 한 줄을 붙인다. `provider`·`credential`은
  공급자 보류 경로, `blocks` 목록이 있는 `prerequisite`는 선행 대기다.

base_moved와 재개 종류

- `base_moved`는 기록 직후 2분 뒤 같은 세션을 자동 재개하고(방아쇠만 자동), 같은
  계보에서 세 번 반복되면 `세션이 멈춤`(`reason: no_progress`, `base가 반복 이동함 ·
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

- 되돌리기 어렵다: 서버 `session_active` 버킷 규칙, 두 탭의 `claimed` 조립, 타일의 held
  상태, 카드 문법 슬롯 표 정정, `wait-judgment` 라벨을 소비하는 테스트·어휘 표가 함께
  움직여야 하고, 사용자가 보는 자리가 바뀌므로 코드만 되돌려도 원상복구가 아니다.
- 맥락 없이는 놀랍다: `bd ready`에 나열되는 `open` Bead가 후보에 없고 실행 중 레인에
  "세션 타일"로 서는데 세션 프로세스는 없다. 모니터 덱의 레인 카운트에서 이 행은 `세션`
  열에 잡힌다.
- `session_active` 캐시 갱신 사이의 스냅샷에서는 후보 카드가 배지·본문·foot 조작을 단 채
  잠깐 서고 다음 스냅샷에서 타일로 옮겨 간다 — 어느 순간에도 대기가 화면에서 사라지지는
  않는다. 레코드가 `stopped`로 닫힌 직후 키 unset 전에는 `external_wait` 없는 `open`
  세션 타일이 잠깐 선다.
- UI-u6ud-8·UI-u6ud-7의 조항은 뒤집은 둘(채택 조건 셋뿐, 소비자 카드 표면) 외에 전부
  승계했고 폐기한 조항은 없다.
