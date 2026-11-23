---
scope:
  - server/worker/completion-intent.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/interactive-progress.js
  - server/worker/direction-inquiry.js
  - server/worker/resolve-session.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - app/views/worker/pr-wait-row.js
  - server/worker/
  - app/views/worker/
---

# 머지 전 검증 보류의 수정 대기를 후속 착지 대기로 잇는다 (UI-nqbx)

## 1. 목표

dotfiles-gphqj spec(`docs/superpowers/specs/2026-11-23-verify-hold-base-repair-followup-wait-design.md`, dotfiles)이
정한 계약을 Worker가 구현한다. 어휘·진입 조건·출구·상한·대화 지시문의 정본은 그 spec §4.1~4.5이고, 이 spec은 Worker
안의 관찰·상태 전이·알림·표시만 정한다.

- 머지 전 검증 보류 중인 행에서, 원 Bead `base_red_followup`에 같은 rig 후속(살아 있거나 보류 뒤에 끝난 것)이 생기면
  기존 후속 착지 대기 판정으로 옮긴다. 사람이 `[머지]`를 누르지 않아도 후속이 착지하면 재검증 한 번 뒤 머지로 간다.
- 검증 보류 대화의 `수정 대기 · <ID>` 줄을 결과 줄로 받아 대화를 끝낸다.
- 보류에서 든 대기가 보류로 끝나면 알림과 대화를 한 번 더 연다.
- 대화 진입 블록 사본을 dotfiles-gphqj 착지 바이트로 고정한다.

## 2. 검증된 전제

beads-ui `d7f8c54251ca27b43d8c7a0310ba8cb21872bf55` 기준.

- 대기 진입 판정은 검증 실패 사실(`verify_hold`)이 나온 때에만 돈다. 순서는 재시도까지 실패한 `script_failed`, 쓰이지 않은
  (PR, head), 살아 있는 연결, base만의 검증이다 — server/worker/completion-intent.js:3150-3215
- 연결은 원 Bead `base_red_followup`의 같은 rig ID와 그 검증 operation의 수리 인계 Bead에서 모은다 —
  server/worker/completion-intent.js:2983-3010
- 대기 저장은 `holding` 단계에서 드는 것을 이미 허용하고, (PR, head)를 한 번만 쓰게 하며, 기존 `hold` 기록을 지우지
  않는다 — server/worker/queue-store.js:14868-14911
- bd 변경 트리거는 `waiting_followup`과 `waiting_metadata` 의도만 다시 본다 — server/worker/completion-intent.js:3923-3949
- 보류 기록은 한 곳에서 쓰고, 알림 묶음(타임라인·Bead 댓글·푸시·대화)은 그 head의 첫 보류에만 나간다 —
  server/worker/completion-intent.js:2792-2866
- 보류 대화 기동은 (PR, head)당 한 번만 잡힌다 — server/worker/completion-intent.js:2067-2090,
  server/worker/queue-store.js:15067-15083
- 대기가 보류로 끝나는 길과 재검증 실패의 사유 꼬리 — server/worker/completion-intent.js:3314-3321, :2877-2892
- 같은 head의 `holding`은 자동 머지 재등록에서 빠진다 — server/worker/queue-store.js:15321-15331
- 수동 `[머지]` 클릭은 자동 해소 단계의 대기를 끝내고 게이트로 넘기며, 새 head는 대기 기록을 비운다 —
  server/worker/queue-store.js:13802-13817, :14669-14675, server/worker/completion-intent.js:444-457
- 정산 패스는 60초 깨우기 타이머 하나로 돈다 — server/worker/completion-intent.js:744-749
- 실패 대화의 대상은 결과를 읽는 시점의 큐에서 다시 판정되고, `holding`일 때만 검증 보류로 읽힌다 —
  server/worker/resolve-session.js:939-948, server/worker/scheduler.js:13916-13945
- 같은 행에 살아 있는 대화 창이 있으면 새 기동은 `already_running`으로 끝나고, 보류 대화 기동은 기동권을 먼저 잡는다 —
  server/worker/resolve-session.js:1706-1733, server/worker/completion-intent.js:2067-2089
- 대기 투영은 `base_verifying`과 `waiting`을 모두 싣고 배지는 둘을 가르지 않는다 — server/ws/worker-handlers.js:2836-2857,
  app/views/worker/pr-wait-row.js:382-409
- 대기 단계에서는 폴러가 base 이동으로 검증을 돌리지 않는다 — server/worker/queue-store.js:1483
- 결과 줄 파서는 `수정 대기 ·` 뒤 첫 토큰을 Bead ID로 읽는다 — server/worker/interactive-progress.js:44-56
- 실패 대화의 `수정 대기`는 대상이 검증 보류·머지 게이트·외부 인계면 받지 않는다 — server/worker/scheduler.js:13916-13925
- 받지 않은 줄은 결과 없이 처리 시각만 남아 답 대기로 보인다 — server/worker/scheduler.js:13984-13992
- 받은 `수정 대기`·`나중에`는 대화 창을 닫는다 — server/worker/scheduler.js:14034-14043
- 보류 중인 완료 의도는 실패 대화의 대상으로 읽힌다 — server/worker/resolve-session.js:637-646
- 진입 블록 사본과 그 다이제스트 고정(dotfiles `55b0dd78` 기준) — server/worker/direction-inquiry.js:131,
  server/worker/direction-inquiry.test.js:21-30
- Bead 한 건 읽기는 `bd list --id`다 — server/worker/bd-metadata.js:309-330
- 배지 문구: 보류 「검증 실패 — 수정 push 대기」, 대기 「base 실패 — <ID> 착지 대기」 —
  app/views/worker/pr-wait-row.js:177, :400
- 근거 사고(2026-11-20, UI-lxxf PR #413): 보류 대화가 UI-crtz를 만들고 `수정 대기 · UI-crtz`로 끝냈다. `fix_waits`는 비어
  있고 UI-lxxf 타임라인에 `수정 대기` 줄이 없다. UI-crtz가 닫힌 뒤 새 base에서 검증 operation
  `cc213c183008c25bb7bb95dc`가 통과했지만 완료 의도는 `holding`이고 `hold.operation_id`는 처음 실패한 검증이다 —
  `~/.local/state/bdui/beads-ui-c81f88687c6d/queue.json`과 `beads/UI-lxxf/events.jsonl` 읽기(2026-11-23)
- 연결 후속의 살아 있음은 상태(`open`·`in_progress`·`blocked`·`resolved`)만으로 판정하고 읽기 실패는 끝난 것으로 센다 —
  server/worker/completion-intent.js:2951-2972
- 같은 정체의 검증은 다시 돌리지 않고 첫 실행의 종단 기록을 채택한다 —
  server/worker/repo-operation-coordinator.js:176, :1965-1981
- 미확인: 폴러가 보류 행에서 base 이동 때 이미 돌린 검증(사고의 `cc213c183008c25bb7bb95dc`)을 대기의 재검증이 실제로
  채택하는지 — 채택 규칙의 코드만 읽었고 그 조합을 실행하지 않았다

## 3. 결정

- 결정 1 — 대기 진입의 계기는 결과 줄이 아니라 연결 키 관찰이다. 보류 중인 의도를 bd 변경 트리거와 기존 60초 정산 패스가
  다시 본다 (대안: `수정 대기` 줄을 받는 순간 진입; 이유: 연결의 원천이 `base_red_followup` 하나로 남고, 서버 재시작과 대화
  밖에서 생긴 연결도 같은 길로 간다). 새 타이머·폴링 루프는 없다.
- 결정 2 — 검증 보류 대화의 `수정 대기`는 `fix_waits`에 기록하지 않는다. 대기의 기록은 완료 의도의 대기 기록 하나다
  (대안: `fix_waits`에 넣고 닫힘 뒤 머지 큐 재등록; 이유: 사용자 결정(2026-11-23) — 같은 행에 대기 규칙을 둘로 두지
  않는다).
- 결정 3 — 보류에서 든 대기가 보류로 끝나면 보류 진입 알림 묶음을 사유 꼬리와 함께 한 번 더 쓴다. (PR, head)당 한 번이고
  보류 진입의 한 번과 따로 센다 (대안: 조용히 복귀; 이유: 첫 대화가 `수정 대기`로 끝나 아무도 묻지 않는 보류가 남는다).
- 결정 4 — 카드에 새 라벨·칩·버튼을 더하지 않는다. 대기 배지와 보류 배지는 지금 문구 그대로다.
- 결정 5 — 보류 중 진입에서는 보류에 든 뒤에 끝난 후속도 연결로 센다 (대안: 살아 있는 후속만; 이유: bd 변경 이벤트가
  버려지거나 서버가 멈춘 사이 수정이 닫히면 착지한 수정과 움직인 base를 두고 보류가 남는다 — UI-lxxf 사고의 끝 상태다).
  "뒤"는 후속의 닫힌 시각이 보류 기록 시각 이후라는 뜻이고, 닫힌 시각을 읽을 수 없으면 세지 않는다.
- 결정 6 — 보류 중 진입의 연결 출처는 원 Bead `base_red_followup` 하나다. 검증 operation의 수리 인계 Bead는 보류에 들기 전
  진입에서만 읽는다(dotfiles-gphqj §4.3).
- 결정 7 — 보류 대화를 열 때 그 보류의 PR·head를 대화 기록에 남기고, 결과 줄은 읽는 시점의 단계가 아니라 그 기록으로
  검증 보류 대화임을 가린다 (대안: 읽는 시점의 대상 재판정; 이유: 연결 쓰기가 결과 줄보다 먼저 Worker를 깨워 단계가 이미
  대기나 보류 복귀로 바뀌어 있을 수 있다).
- 결정 8 — 복귀 대화 요청은 영속 기록으로 두고 같은 행의 첫 대화 창이 정리된 뒤 기동한다. 창 때문에 미뤄진 요청은 한 번의
  기동권을 쓰지 않는다.
- 결정 9 — 대화를 열 때 그 보류가 4.1의 대상 조건을 만족하면 진입 `상황`에 대기 가능 표지를 싣는다. 세션은 그 표지가 있을
  때만 수리 Bead를 만든다(dotfiles-gphqj §4.2).
- 결정: 보류에 들기 전에 시작하는 대기(UI-ty6k)의 진입·알림은 바꾸지 않는다 — 그 대기가 보류로 끝날 때의 보류 진입이
  지금처럼 첫 알림이다.
- 결정: 검증 보류가 아닌 실패 대화의 `수정 대기`(`fix_waits` 기록, 닫힘 뒤 재실행, 사람 출구 복귀)는 바꾸지 않는다 —
  ADR UI-lxxf가 UI-lx9o에서 승계한 UI-hozk 조항 그대로다.

## 4. 설계

### 4.1 보류 중 연결 관찰

대상은 다음을 모두 만족하는 완료 의도다: 단계가 `holding`, 보류 원인이 `verify_failure`, 보류된 head가 지금 주제의 head,
그 (PR, head)의 대기가 쓰이지 않음, 보류가 가리키는 검증 operation이 같은 후보 재시도까지 실패한 `script_failed`,
자동 머지가 켜져 있음, 다른 저장소 대상 PR 배달이 아님(`not_foreign_pr_delivery` — dotfiles `workflow-state.yaml`
`failure_classes.pre_merge_wait.hold_entry.requires`).

- bd 변경 이벤트마다, 그리고 정산 패스에서 프로세스당 root 한 번(재시작 복구) 대상의 연결을 읽는다. 연결은 원 Bead
  `base_red_followup`의 같은 rig ID에서만 모은다(결정 6). 각 ID는 살아 있는 후속, 보류 뒤에 끝난 후속(결정 5), 그 밖(보류
  전에 끝남·없는 Bead·다른 rig)으로 가른다. 원 Bead나 후속 읽기가 실패하면 그 관찰에서는 큐에 쓰지 않고 다음 관찰로
  넘긴다(읽기 실패를 끝난 것으로 세지 않는다).
- 대기를 저장하는 순간에 다시 확인한다: 자동 머지가 켜져 있고, 관찰한 PR·head·보류 기록이 그대로이며, 그 행이 머지 큐에
  없다(수동 `[머지]`·`[리뷰 후 머지]` 요청이 우선한다). 하나라도 어긋나면 쓰지 않는다. 자동 머지가 꺼져 있으면 보류 중
  진입을 하지 않는다 — 대기의 끝이 사람 조작 없는 머지이기 때문이다.
- 연결(살아 있는 후속, 또는 결정 5의 보류 뒤에 끝난 후속)이 없으면 아무것도 쓰지 않는다. 있으면 기존 진입 절차를 보류
  기록의 head·base·operation으로 돈다: 대기 기록을 쓰고(이때 (PR, head)가 쓰인다) base만의 검증을 한 번 돌린다.
- base 검증이 `script_failed`면 대기가 선다. 그 밖의 결과면 4.3으로 간다.
- 이미 끝난 연결만으로 든 대기는 base 검증 뒤 곧바로 출구 판정(base가 움직였으면 재검증 한 번, 그대로면 보류)으로 간다.
- 대기 중 동작(후속 상태 재읽기, 직렬 레인 교착 방지, base 이동 뒤 재검증 한 번, 통과면 머지 큐로 복귀, 상한 48시간)은
  UI-ty6k §4.2 그대로다.
- 관찰이 자기 자신을 깨우지 않는다: 읽기는 `bd list --id` 경로만 쓰고, 연결이 없을 때는 큐에 쓰지 않는다.

### 4.2 결과 줄 수신

검증 보류가 대상인 실패 대화의 `수정 대기 · <ID>`는 다음을 모두 만족할 때 결과 줄이다.

- 대화 기록의 PR·head(결정 7)가 지금 주제의 PR·head와 같다.
- `<ID>`가 그 (PR, head)의 대기 기록(진행 중이거나 이미 끝난 것)에 있는 연결이거나, 4.1이 지금 연결로 인정하는 후속(살아
  있거나 보류 뒤에 끝남)이고 의도가 4.1의 대상 조건을 만족한다.

받으면 대화를 끝내고(창 닫기) 타임라인에 `대화 결과 · <줄>` 한 줄을 남긴다. `fix_waits`는 건드리지 않고, 읽는 시점의 단계가
대기나 보류 복귀로 바뀌어 있어도 일반 `fix_waits` 분기로 가지 않는다. 조건이 서지 않으면(보류 전에 끝난 Bead, 없는 Bead,
키에 없는 ID) 지금처럼 결과 줄이 아니고 대화는 답 대기로 남는다 — 연결 없이 닫힌 대화와 아무도 묻지 않는 보류를 만들지
않는다.

### 4.3 대기 끝의 사람 출구

보류에서 든 대기는 진입 때 같은 head의 보류 기록이 이미 있던 대기다. 이 대기가 보류로 끝나는 경우는 base 검증이
`script_failed`가 아님, 재검증 실패, 후속이 끝났으나 base 그대로, 상한 48시간이다.

- 보류 기록을 사유 꼬리와 함께 다시 쓰고, 보류 진입과 같은 알림 묶음(타임라인 한 줄, Bead 댓글, 「머지 전 검증 실패」
  푸시, 공용 스위치 아래 대화)을 한 번 낸다.
- 한 번의 보장은 영속 기록으로 한다. 서버 재시작과 같은 head의 재관측은 다시 내지 않는다.
- 복귀 대화는 요청을 영속 기록으로 남기고 같은 행의 첫 대화 창이 정리된 뒤에 기동한다(결정 8). 첫 창이 아직 살아 있어
  미뤄진 요청은 기동권을 쓰지 않고, 정리 도중 서버가 다시 떠도 요청이 남아 한 번 기동한다. 타임라인·댓글·푸시는 미루지
  않는다.
- 다시 열린 대화의 진입 `상황`에는 사유 꼬리가 실린다. 그 대화가 자가 수리를 건너뛰고 묻는 것은 진입 블록이 정한다.
- 대기 종료 뒤 같은 (PR, head)에서 연결이 다시 관측돼도 대기에 들지 않는다(쓰인 쌍).

### 4.4 표시

- 대기가 선 뒤(base 검증 `script_failed` 확인 뒤)의 배지는 기존 「base 실패 — <후속 ID> 착지 대기」다. 보류에서 든 대기의
  base 검증 중에는 기존 보류 배지를 그대로 둔다 — base 검증이 통과할 수도 있어 미리 "base 실패"로 적지 않는다. 새 슬롯은
  없다.
- 타임라인은 기존 대기 진입 줄을 쓴다. 보류에서 든 대기임이 드러나게 문구만 가른다. 예:
  `머지 대기 — 보류 중 후속 UI-xxxx 연결 · base도 검증 실패 · 착지 대기`.
- Worker 탭과 모니터 탭의 같은 Bead 카드는 같은 배지·줄을 갖는다(카드 재료는 한 곳에서 만든다).

### 4.5 진입 블록 사본

`CONVERSATION_ENTRY_BLOCK`과 시험의 다이제스트·기준 커밋을 dotfiles-gphqj 착지 커밋의 블록 바이트로 고정한다. 서버가
채우는 슬롯 줄은 바뀌지 않는다.

### 4.6 오류와 경계

- 원 Bead나 연결 Bead 읽기 실패는 그 root를 다음 이벤트로 넘긴다(쓰기 없음). 다른 rig ID와 형식 오류는 버린다.
- 머지 충돌·리뷰 stale 보류, `receipt_hold`, 다른 저장소(foreign) 대상 PR은 대상이 아니다.
- 대기는 머지를 허락하지 않는다. 머지는 통과한 검증 영수증 뒤에만 일어난다(ADR UI-ny0h).
- 대기 중 새 head push, `[머지]`·`[리뷰 후 머지]` 클릭은 지금처럼 대기를 끝내고 새로 판정한다.

## 5. 수용 기준

1. 보류 중인 행의 원 Bead에 살아 있는 같은 rig 연결이 생기면 base 검증이 한 번 돌고, `script_failed`면 대기에 들어 배지가
   바뀐다. base 검증 중에는 보류 배지가 그대로다. 이때 알림·대화·Bead 댓글은 없다. 원 Bead 키에 없고 검증 operation의 수리
   인계에만 있는 Bead로는 보류 중 진입을 하지 않는다.
2. 연결된 후속이 모두 끝나고 base가 움직이면 재검증이 한 번 돌고, 통과하면 `[머지]` 클릭 없이 머지로 간다(UI-lxxf 사고의
   순서를 재현한 시나리오).
3. 보류에서 든 대기가 보류로 끝나는 네 경우 각각에서 사유 꼬리가 실린 보류와 알림 묶음이 한 번 나가고, 같은 (PR, head)는
   다시 대기하지도 다시 알리지도 않는다. 서버 재시작 뒤에도 같다.
4. 연결 없음, 보류에 들기 전에 끝난 연결뿐, 쓰인 (PR, head), 재시도가 소비되지 않은 실패, 검증 실패가 아닌 보류에서는 큐
   쓰기와 검증이 없다.
5. 검증 보류 대화의 `수정 대기`는 4.2의 조건이 서면 대화를 끝내고 `fix_waits`를 쓰지 않으며, 서지 않으면 결과 줄이 아니다.
   연결 관찰이 결과 줄 읽기보다 먼저 일어나 단계가 대기로, 또는 대기를 거쳐 보류로 바뀐 뒤에도 같다.
6. 검증 보류가 아닌 실패 대화의 `수정 대기`와 그 재실행은 지금과 같다.
7. 서버가 다시 뜬 뒤 보류 중인 행에 연결이 이미 있으면 첫 정산 패스에서 대기 판정이 돈다. 그 연결이 보류 뒤에 이미
   끝났고 base가 움직였으면 base 검증과 재검증을 거쳐 `[머지]` 클릭 없이 머지로 간다(관측을 놓친 UI-lxxf의 끝 상태에서
   회복하는 시나리오).
8. 보류에 들기 전에 시작하는 대기(UI-ty6k 수용 기준 1~7)는 지금과 같다.
11. 자동 머지가 꺼져 있거나, 연결을 읽는 사이 수동 머지 요청이 큐에 들어왔거나, PR·head·보류가 바뀌었으면 보류 중 진입을
    쓰지 않고 수동 요청 행이 남는다.
12. 복귀 대화는 첫 대화 창이 살아 있는 동안 미뤄졌다가 창이 정리된 뒤 한 번 열리고, 그 사이 서버가 다시 떠도 한 번 열린다.
13. 대화를 열 때 보류가 4.1의 대상 조건을 만족하면 진입 `상황`에 대기 가능 표지가 실리고, 아니면 실리지 않는다.
14. 원 Bead나 후속 읽기가 실패한 관찰에서는 큐 쓰기가 없고 다음 관찰에서 다시 판정한다.
9. 진입 블록 사본의 다이제스트가 dotfiles-gphqj 착지 바이트와 같다.
10. 같은 Bead의 카드가 Worker 탭과 모니터 탭에서 같다(카드 동일성 시험 통과).

## 6. 검증

- `npx vitest run server/worker/completion-intent.test.js server/worker/queue-store.test.js server/worker/scheduler.test.js server/worker/interactive-progress.test.js server/worker/direction-inquiry.test.js --reporter=dot`
- `npm run tsc`, `npm run lint`
- `npx vitest run --reporter=dot`
- 권한 모드 확인(dotfiles-gphqj 구현 리뷰의 미확인 전제): 실제 보류 대화와 같은 권한 모드(Claude `defaultMode: auto`)에서
  시험용 원 Bead에 `bd update <원 Bead> --set-metadata base_red_followup=<수정 Bead> --json`을 쓰고 `bd show --json`으로
  되읽은 결과를 완료 보고에 증거로 남긴다. 거부되면 Worker는 연결을 관측하지 못하므로 계약 쪽 정정을 별도로 제기한다.

## Test scope

- RED→GREEN: `completion-intent.test.js`에 수용 기준 1~3·7·11·12·14의 시나리오(가짜 bd·가짜 operation 러너, 재시작
  포함). 수용 기준 7은 폴러가 새 base에서 남긴 성공 검증 기록을 심고 의도가 `holding`인 상태에서 시작해, 대기의 재검증이
  실제 게이트를 거쳐 그 기록을 채택하고 머지 큐로 돌아오는지 본다(통과를 돌려주는 가짜 게이트로 대신하지 않는다 — §2의
  미확인 전제를 이 시험이 확인한다). `queue-store.test.js`에 보류에서 든 대기의 표지, 복귀 알림 한 번과 미뤄진 복귀 대화
  요청의 영속, 저장 순간 재확인(수용 기준 11). `scheduler.test.js`에 수용 기준 5의 수신·거부 사례와 연결 관찰이 결과 줄보다
  앞선 순서, 수용 기준 13의 표지. `direction-inquiry.test.js`에 수용 기준 9의 다이제스트.
- 회귀(변경 전에도 통과): 수용 기준 4·6·8·10 — 보류 중 쓰기·검증 없음(대조군), 기존 `수정 대기` 시험, UI-ty6k 대기 시험,
  카드 동일성 시험을 고치지 않고 통과한다.

## 7. 경계·후속

- 선행: dotfiles-gphqj — 계약 값과 진입 블록 바이트가 착지한 뒤 구현한다(`blocks` 간선 기록됨).
- 관찰: 연결 없이 새 base에서 재검증이 통과한 보류를 자동으로 푸는 길 — 사용자가 고르지 않았다(2026-11-23). 폴러가 보류
  행에서 돌린 검증 결과를 소비하지 않는 점은 그대로다
- 관찰: UI-lxxf PR #413의 지금 보류는 이 변경의 대상이 아니다 — 사람의 `[머지]`로 푼다
- 관찰: 배포 뒤 실제 보류에서의 확인 — 미생성 사유: 검증 실패가 base 원인인 보류가 생겨야 볼 수 있어 따로 만들지 않는다.
  수용 기준 2의 시나리오 시험이 같은 순서를 덮는다

## 8. 결정 (ADR 후보)

- 전제: ADR UI-ny0h — 머지 자격은 저장소 안 입력과 `[verify]`만 본다. 대기는 머지를 허락하지 않고 재검증이 관문이다.
- 전제: ADR UI-jlov — dotfiles 계약은 코드 사본으로 소비하고, 키가 없으면 표시를 생략한다.
- 검증 보류 대화의 `수정 대기`를 결과 줄로 받되 `fix_waits`가 아니라 완료 의도의 후속 착지 대기로 잇고, 보류 중 연결
  (살아 있거나 보류 뒤에 끝난 후속) 관찰로 대기에 들며, 보류에서 든 대기가 보류로 끝나면 알림 묶음을 (PR, head)당 한 번 더 낸다. 나머지 조항은 UI-lxxf 그대로다.
  - 되돌리기 어려움: `scheduler.js`의 결과 줄 수신 조건, `completion-intent.js`의 보류 중 관찰과 보류 알림 규칙,
    `queue-store.js`의 대기 기록과 복귀 대화 요청, `resolve-session.js`의 대화 기록과 진입 `상황`, `direction-inquiry.js`의
    블록 사본, dotfiles 계약 값(dotfiles-gphqj)이 함께 움직인다.
  - 맥락 없이는 의외: 같은 `수정 대기` 줄이 대화 대상에 따라 다른 대기로 이어지고, 알림까지 간 보류가 사람 조작 없이
    머지될 수 있다.
  - 실제 절충: 사람 클릭을 없애는 대신 보류 중인 행마다 bd 변경 때 연결 읽기가 더해지고 같은 head에 알림이 두 번 올 수
    있다. 기각한 대안은 §3의 결정 1~3에 있다.
  - `summary`: "검증 보류 대화의 수정 대기는 fix_waits가 아니라 완료 의도의 후속 착지 대기로 이어지고 보류 중 연결 관찰로 대기에 들며 보류에서 든 대기가 보류로 끝나면 알림 묶음을 (PR, head)당 한 번 더 낸다 — 나머지 조항은 UI-lxxf 그대로다"
    → ADR, supersede UI-lxxf
- 카드에 새 라벨·칩·버튼을 더하지 않고 기존 배지 문구를 쓴다 — 표시 문구 선택이다 → ADR 아님
