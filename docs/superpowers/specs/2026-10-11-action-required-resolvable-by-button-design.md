---
scope:
  - server/worker/wait-judgment.js
  - server/worker/notify.js
  - server/worker/attach.js
  - server/worker/resolve-session.js
  - server/ws/worker-handlers.js
  - app/views/worker/tile-resolve.js
  - app/views/worker/lanes.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/gate-labels.js
  - app/views/monitor/
  - app/protocol.js
  - app/protocol.md
---

# '조치 필요'는 beads-ui 버튼으로 풀 수 있을 때만 띄우고, 배지에 해결 방법을 싣는다

Bead: UI-9w5l · route: spec_backed · 작성 2026-10-11

## 1. 목표

- `⛔ … 조치 필요`(verdict `action_required`)가 서는 카드는 **beads-ui 안의 버튼 하나로
  해결할 수 있다**. 버튼으로 풀 수 없는 상태는 `action_required`가 아니다.
- 그 배지의 팝업("대기 판정 근거")은 **어떤 버튼으로 어떻게 해결하는지**를 첫 줄에
  말한다.
- 대기 사유(wait reason)의 판정으로는 Discord 알림을 보내지 않는다 — beads-ui 화면에서
  확인한다.

배경: dotfiles-8k8yf가 의도적으로 세션 작업 dotfiles-kb9oi(worker-ineligible,
`in_progress`) 뒤에 걸려 있는데 카드가 `⛔ 선행 대기 · 조치 필요`로 뜨고 Discord에
`⚠ dotfiles-8k8yf 지연 · 열린 선행에 사람의 조치가 필요함`이 왔다. 카드에는 누를
버튼이 없었다.

사용자 결정(2026-10-11):
- 선행 대기의 조치 필요 승격과 그 알림을 없앤다.
- 모든 조치 필요는 beads-ui 버튼으로 해결되어야 하고 배지가 해결 방법을 설명한다.
- `takeover_unresolved`는 해결 세션 버튼으로 연다(sjob 새 명령 아님).
- 대기 사유 알림은 `action_required`·`overdue` 모두 끈다.
- 대화 세션이 답을 기다리는데 Discord 링크가 없으면 tmux 창을 앞으로 부르는
  `[세션에서 이어가기]`를 보인다(beads-ui 안 답 입력칸은 만들지 않는다).

## 2. 검증된 전제

base `d14c7927af82881ab6db3a4ae7a35cb446cfb8b6` 기준.

- 선행 대기는 열린 선행이 `blocked`·`deferred`·worker-ineligible이면 `action_required`
  (`blocker_needs_human`)로 오르고 `actions`는 비어 있다 — server/worker/wait-judgment.js:771-776, :741-757
- `notifyWaitReasons`는 verdict가 normal이 아니고 `on_overdue === 'discord'`인 사유를
  `waitActionRequired`/`waitOverdue`로 보낸다 — server/worker/notify.js:207, :244-288; 호출은 server/worker/attach.js:302
- `awaiting_user`(비 legacy)와 세션 정지 `recovery`는 이미 이 경로를 건너뛰고 대화
  대상 푸시(`🙋 확인 필요`·`❓ 답 대기`)가 말한다 — server/worker/notify.js:218-240
- 외부 작업 완료 알림은 별도 경로다 — server/worker/notify.js:308
- 공급자 보류 진입·회복 알림은 별도 경로다 — server/worker/notify.js:59-60, :1004
- `takeover_unresolved`는 hold/detached 행에서 takeover 마커가 `TAKEOVER_SETTLE_MS`(5분)를
  넘기면 선다. 같은 분기의 op는 `[지금 확인]`·`[관찰 중단]`뿐이고 `▶ 바로 실행`은 마커가
  있으면 빠진다 — server/worker/wait-judgment.js:594-608, :463-503; server/worker/external-wait/takeover.js:26
- Worker는 관측마다 `sjob takeover <id> --result --json`을 이미 실행하고, `holding`이면
  마커를 `unknown`으로 두고 다음 관측에 다시 읽는다(상한 없음). 원격이 정리되면
  (`started` 또는 unheld `no_takeover`) 마커가 자동으로 풀린다 — server/worker/external-wait/takeover.js:284-298, :375-385; server/worker/external-wait/observer.js:350-371
- sjob에는 holding 기록을 푸는 CLI가 없고 계약은 operator recovery를 요구한다 —
  dotfiles src/shell/bin/sjob `takeover` 파서(`-c`·`-m`·`--json`·`--result`뿐); dotfiles docs/contracts/external-wait.md:123, :138
- 대화 세션이 live이고 답을 기다리면(`turn_state` question/limit, 또는 conversation
  `answer`) verdict는 `decision`이고 op는 `폐기`(+`[워커로 이어가기]`)뿐이며 메시지가
  "Discord 스레드 또는 tmux 창에서 답"이다 — server/worker/wait-judgment.js:239-242, :318-337
- 카드는 live 대화가 있으면 `[세션에서 이어가기]`를 그리지 않는다 — app/views/worker/tile-resolve.js:19-24 (`hasLiveConversation`), 같은 파일 `tileResolveFields`
- 같은 카드에 브리지 스레드가 있으면 `↗ Discord` 링크가 이미 선다(`discord_url`) —
  app/views/worker/lanes.js:1815-1822; server/ws/worker-handlers.js:3254-3261(`decorateQueue`)
- `[세션에서 이어가기]` 클릭은 `worker-resolve-in-session` 하나이고, 서버가 행 상태로
  런처를 고른다(stop·external·failure). stop 행은 `launchForClick`이 먼저
  `focusRunning(placement:'user')`으로 살아 있는 창을 앞으로 부른다 — server/ws/worker-handlers.js:6891, :7005-7015 (origin/main); server/worker/direction-inquiry.js:777-805; server/worker/tmux-launcher.js:634-651
- 실패 해결 세션 런처는 `{ failure_class, reason, stage, detail }` 문맥을 받는다 —
  server/worker/resolve-session.js:744 (origin/main)
- 팝업 줄 순서는 verdict 메시지 → 대화 세션 줄 → release → 시각들 → 안내 → 다른 사유다 —
  app/views/worker/lanes.js:2650-2669
- 범례의 action_required 행은 "스스로 풀리지 않는다 · 사람의 조치가 필요하다"뿐이다 —
  app/views/worker/wait-vocabulary.js:62-67
- `job_failed`는 typedef·메시지 표·클라이언트 안내에만 있고 생산자가 없다 —
  `grep -rn "'job_failed'" server app --include='*.js'`(judge 호출 0건); app/views/worker/lanes.js:2560
- 자동 재개 거부 배지는 클라이언트가 그리고 release가 `↻ 이어하기`·`✕`를 말한다. 같은
  타일에 `↻ 이어하기` 버튼이 있다 — app/views/worker/gate-labels.js:98-125; app/views/worker/running-grid.js:978, :1324
- 미확인: 키 어긋남(`wait_key_missing`·`wait_record_missing` 실행 중 행)에서
  `[관찰 중단]`·`[대기 해제]`가 키 없는 레코드도 지운다 — 코드 경로를 끝까지 읽지 않았다.
  §5 테스트가 확인한다.

## 3. 설계

### 3.1 불변식

`action_required` 사유는 다음을 함께 싣는다.

1. **해결 op** 하나 이상. `폐기`(`worker-discard`)와 같은 상태를 다시 읽기만 하는
   `[지금 확인]`은 해결 op로 세지 않는다.
2. **해결 문장** `resolution`(새 공개 필드, 문자열). 해결 op의 버튼 이름을 그대로 담아
   "무엇을 누르면 어떻게 풀리는지"를 말한다. 버튼이 상세 패널에만 있으면 그렇게 말한다.

둘 중 하나라도 만들 수 없는 상태는 `action_required`로 판정하지 않는다(필요하면
`normal`). 결정: 불변식은 wait-judgment 단위 테스트가 모든 `action_required` 생산
분기를 돌며 강제한다 — 새 생산자가 버튼 없이 들어오면 테스트가 실패한다.

### 3.2 사유별 처분

| 사유 | 처분 | 해결 op | resolution 예 |
| --- | --- | --- | --- |
| `blocker_needs_human` | 삭제. 선행 대기는 선행 상태·라벨과 무관하게 `normal` | — | — |
| `job_failed` | 죽은 코드 삭제(typedef·메시지·안내) | — | — |
| `takeover_unresolved` | 유지 + 해결 op 추가(§3.4) | `[세션에서 이어가기]` | "[세션에서 이어가기]로 해결 세션을 열어 서버의 바로 실행 기록을 확인·정리한다 — 정리되면 다음 관측에서 대기가 풀린다" |
| `resume_failed` | 유지 | `[새 세션으로]`·`[워커로 이어가기]`·(세션 소유)`[세션에서 이어가기]` | "[새 세션으로] 또는 [워커로 이어가기]로 다시 이어간다" |
| `wait_key_missing`·`wait_record_missing`(실행 중 행) | 유지 | hold/detached `[관찰 중단]`, completing `[대기 해제]`(상세) | "[관찰 중단]으로 어긋난 대기를 정리한다" / "상세의 [대기 해제]로 정리한다" |
| `wait_record_missing`(고아 키) | 유지 | `[관찰 중단]` | "[관찰 중단]으로 남은 대기 키를 지운다" |
| `decision`(대화 없음·종료) | 유지 | `[세션에서 이어가기]` | "[세션에서 이어가기]로 같은 세션과 대화해 답한다" |
| `decision`(live 대화 답 대기) | 유지 + §3.5 | `↗ Discord` 또는 `[세션에서 이어가기]` | §3.5 |
| `decision`(저장소 작업 복구) | 유지 | `[세션에서 이어가기]` | 위와 같음 |
| 자동 재개 거부(클라이언트 배지) | 유지 | `↻ 이어하기`·`✕` | 기존 release 문장을 해결 줄로 옮긴다 |

`resolution` 문장은 예시이며 구현이 다듬을 수 있다. 버튼 이름을 담는다는 것과 버튼
위치(카드·상세)를 틀리지 않는다는 것이 요건이다.

### 3.3 해결 줄

- 팝업("대기 판정 근거")에서 verdict가 `action_required`이면 첫 줄에
  `해결 — <resolution>`을 그린다. 다음 줄부터는 지금 순서(verdict 메시지 → …)를 그대로
  따른다. `resolution`이 없으면 그 줄을 그리지 않는다(fail-quiet). 다만 §3.1 테스트 때문에
  서버 판정에서는 생기지 않는다.
- 같은 사유의 `release` 문장이 해결 줄과 어긋나면 고친다. 예: `takeover_unresolved`의
  release "완료되면 같은 세션을 이어간다"는 이 상태에서 거짓이다.
- 상세 패널의 대기 사유 본문에도 같은 해결 줄을 release 앞에 싣는다.
- Worker 탭과 모니터는 같은 공유 함수로 그린다(AGENTS.md 모니터 동일성). 카드 동일성
  테스트가 차이를 잡는다.
- 결정: 해결 줄은 팝업·상세 안의 줄이다. 카드 위 새 칩·라벨·줄 슬롯은 만들지 않는다 —
  카드 배치 스펙(2026-08-25 §5.1)의 슬롯 표를 바꾸지 않는다.

### 3.4 `takeover_unresolved` → `[세션에서 이어가기]`

- wait-judgment가 이 사유에 `worker-resolve-in-session` op(라벨 `[세션에서 이어가기]`,
  placement card)를 싣는다. 카드의 버튼 유무는 지금처럼 `tileResolveFields`만 정한다.
- 서버 `handleWorkerResolveInSession`은 새 행 종류(예: `takeover`)를 고른다. 조건은 그
  Bead의 외부 대기 행이 hold/detached이고 settle을 넘긴 takeover 마커가 있는 것이다.
  우선순위는 recovery 다음, external completing 앞이다. 클라이언트 `tileResolveFields`의
  행 판정 순서도 서버와 같게 둔다.
- 이 행은 실패 해결 세션 런처(`resolveSession.resolve`)를 연다. 문맥 예:
  `failure_class: '확인 필요'`, `reason: 'takeover_unresolved'`, `detail`에 job id·ssh
  host·요청 시각. 세션 프롬프트는 다음을 말한다.
  - 원격에서 `sjob takeover <id> --result`로 기록을 읽는다.
  - 로컬 실행이 실제로 시작됐는지 확인하고, dotfiles external-wait 계약의 operator
    recovery대로 정리한다. 예: 실행 중이면 결과를 확정하고, 아니면
    `scontrol release`와 기록을 정리한다.
  - 같은 작업을 다시 실행하지 않는다.
- 해결은 기존 관측이 판정한다. 원격 기록이 `started`나 unheld `no_takeover`가 되면 다음
  관측에서 마커가 풀리고 사유가 사라진다. 버튼은 상태를 직접 바꾸지 않는다.
- 이미 그 Bead의 해결 세션 창이 살아 있으면 클릭은 그 창을 앞으로 부른다(런처의 기존
  `already_running`).

### 3.5 live 대화 답 대기

- 카드에 `↗ Discord`(`discord_url`)가 있으면 해결 줄은 "↗ Discord에서 답한다"이다.
- `discord_url`이 없으면(브리지 꺼짐·스레드 없음):
  - `tileResolveFields`가 live 대화 가드를 이 경우에만 풀어 `[세션에서 이어가기]`를
    그린다.
  - 클릭은 기존 stop 행 경로(`launchForClick` → `focusRunning(placement:'user')`)로 그
    tmux 창을 앞으로 부른다.
  - 해결 줄은 "[세션에서 이어가기]로 맥의 tmux 창을 앞으로 불러 답한다 · Discord
    브리지가 꺼져 있어 휴대폰에서는 답할 수 없다"이다.
- 두 문장 중 무엇을 고를지는 카드 재료(`discord_url`)를 아는 공유 함수 한 곳이 정한다.
  서버 `resolution`은 Discord 문장을 기본으로 싣는다.
- 결정: beads-ui 안에 답 입력칸은 만들지 않는다 — 사용자 결정(범위).

### 3.6 알림

- 결정: 대기 사유 판정(`action_required`·`overdue`)으로는 Discord를 보내지 않는다.
  `notifyWaitReasons`의 발송을 없앤다.
  - 이미 기록된 `wait_notified` 억제 키 가운데 외부 작업 완료(`external_wait:*`)·
    redispatch 키 보존 규칙은 지금 동작을 깨지 않게 유지한다.
  - 대기 사유 키는 더 이상 만들지 않는다.
- 그대로 두는 알림:
  - 외부 작업 완료(`notifyExternalWaitCompleted`)
  - 대화 대상 푸시(`🙋 확인 필요`·`❓ 답 대기`)
  - 실패 종단 `🙋 확인 필요`(ADR UI-jbl1)
  - 공급자 보류 진입·회복
- `waitActionRequired`·`waitOverdue` notifier 메서드와 그 문구는 호출자가 없어지면 함께
  지운다.
- 타임라인의 `wait_notified` 이벤트는 새로 쌓이지 않는다. 지난 기록은 그대로 읽힌다.

### 3.7 범례

`WAIT_VERDICTS`의 action_required 행 뜻을 다음과 같이 바꾼다: "스스로 풀리지 않는다 ·
카드의 버튼으로 해결한다 — 판정 근거의 '해결' 줄을 따른다". `WAIT_KINDS` 선행 행에서
"사람 조치 필요" 표현을 지운다.

### 3.8 계약 표면

- `VerdictCode`에서 `blocker_needs_human`·`job_failed`를 지운다.
- `WaitReason`에 `resolution?: string`을 더한다.
- 두 표면 모두 app/protocol.js·app/protocol.md를 같은 변경에서 고친다. dotfiles 계약
  변경은 없다. 이 필드들은 beads-ui 내부 공개 투영이다.

## 4. 수용 기준

1. blocked·deferred·worker-ineligible 선행을 가진 대기 카드가 `⛓ 선행 대기`(normal)로
   보이고 Discord 알림이 없다. 배포 후 공유 서버에서 dotfiles-8k8yf 카드로 확인한다.
2. 서버가 만드는 모든 `action_required` 사유가 해결 op와 `resolution`을 갖는다
   (§3.1 테스트).
3. `takeover_unresolved` 카드에 `[세션에서 이어가기]`가 서고, 클릭하면 바로 실행 미해결
   문맥의 해결 세션이 열린다.
4. live 대화 답 대기 카드는 `discord_url`이 있으면 해결 줄이 Discord를 가리킨다. 없으면
   `[세션에서 이어가기]`가 서고 클릭이 기존 창을 앞으로 부른다.
5. `action_required` 팝업 첫 줄이 `해결 — …`이다. Worker 탭과 모니터가 같다.
6. 대기 사유로는 어떤 Discord 알림도 나가지 않는다. 외부 작업 완료·대화 대상·실패
   확인 필요·공급자 알림은 그대로 나간다.
7. `VerdictCode`에 `blocker_needs_human`·`job_failed`가 없고 tsc·lint·vitest가 통과한다.

## 5. Test scope

- server/worker/wait-judgment.test.js
  - 'keeps a prerequisite wait normal for blocked, deferred and worker-ineligible
    blockers': 기존 'requires action for an open blocker' 3건과 foreign readback 건을
    대체한다.
  - 'pairs every action_required reason with a resolving op and a resolution': 표의 모든
    생산 분기 fixture를 돈다.
  - 'projects the session continue op on an unresolved takeover'
- server/worker/notify.test.js
  - 'sends no notification for any wait reason verdict'
  - 'keeps external wait completion and redispatch keys': 기존 키 보존 회귀.
- server/ws/worker-handlers.resolve-session.test.js
  - 'opens a resolve session for an unresolved takeover'
  - 'focuses the live conversation window on a parked row'
- app/views/worker/tile-resolve.test.js
  - 'shows the continue button for a live conversation without a discord link'
  - 'hides it when a discord link exists'
  - 'shows it for an unresolved takeover'
- app/views/worker/lanes.test.js
  - 'renders the resolution line first for an action_required reason'
- 모니터·Worker 카드 동일성 테스트(기존)가 새 해결 줄·버튼에서 통과한다.
- 미확인 전제: 'clears a keyless running record with stop'(server external-wait 쪽 테스트)
  를 먼저 작성한다. 실패하면 그 op를 고치는 것이 이 작업 범위다.

## 6. 경계·비목표

- 결정: sjob(dotfiles)은 바꾸지 않는다 — takeover 정리는 해결 세션이 operator recovery로 한다.
- 결정: beads-ui 안 답 입력칸은 만들지 않는다.
- 실패 종단 알림·자동 대화 기동(ADR UI-jbl1), 공급자 보류 알림, `overdue` 판정 자체는
  바꾸지 않는다. 지연 배지는 화면에 계속 선다. 알림만 없앤다.
- 지난 스펙 문서(2026-09-15·09-16·09-21의 blocker_needs_human 서술)는 역사 기록이라
  고치지 않는다.

## 결정 (ADR 후보)

- 전제: ADR UI-jbl1 — 해결 세션은 실패 종단과 같은 클릭 런처를 쓰고, `🙋 확인 필요`
  알림은 건드리지 않는다.
- 조치 필요(`action_required`)는 beads-ui 버튼으로 해결할 수 있는 상태에만 쓰고 해결
  문장을 싣는다. 대기 사유 판정으로는 Discord를 보내지 않는다. 조건 1(되돌리기
  어려움): wait-judgment 생산자, notify, 팝업·상세 렌더러, 모니터, 범례, protocol
  `WaitReason`·`VerdictCode`가 함께 움직인다. 조건 2(맥락 없이 의외): 새 대기 사유를
  더하는 사람은 "사람이 봐야 함"을 action_required로 올리고 알림을 기대하기 쉽다.
  조건 3(실제 트레이드오프): 알림을 잃는 대신 헛경보와 할 수 없는 조치 표시를 없앤다.
  새 주제: 가장 가까운 ADR UI-jbl1은 실패 종단의 대화 기동·확인 필요 알림이 소비자이고,
  이 결정은 대기 사유 판정·알림이 소비자라서 겹치지 않는다. `summary`: "조치 필요는 beads-ui 버튼으로 해결할 수 있는 대기 사유에만 서고 해결 op와 버튼 이름을 담은 해결 문장을 함께 싣는다; 버튼으로 풀 수 없는 상태는 조치 필요가 아니며 대기 사유 판정은 Discord로 알리지 않는다" → ADR
- `takeover_unresolved`를 해결 세션으로 연다 — 실행 수단 선택이고 같은 저장소 안에서
  되돌릴 수 있다(조건 1 실패) → ADR 아님
- 브리지가 꺼졌을 때만 live 대화에 `[세션에서 이어가기]`를 보인다 — 표시 조건 세부(조건 1
  실패) → ADR 아님
