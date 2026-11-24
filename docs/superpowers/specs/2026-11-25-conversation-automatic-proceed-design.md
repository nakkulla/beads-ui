---
scope:
  - server/worker/interactive-progress.js
  - server/worker/scheduler.js
  - server/worker/resolve-session.js
  - server/worker/direction-inquiry.js
  - server/worker/queue-store.js
  - server/worker/notify.js
  - server/worker/external-wait/session-resume.test.js
---

# Worker 세션 대화의 결과 줄 「자동 진행」을 읽어 한 번만 이어 가고 알린다 — beads-ui 소비자

Bead: `UI-19sj` · 날짜: 2026-11-25 · 형제: dotfiles 계약 스펙 `docs/superpowers/specs/2026-11-25-worker-conversation-automatic-proceed-design.md` (dotfiles 저장소, `dotfiles-hkztn`, 이 Bead의 선행)

## 1. 목표

dotfiles 계약(`dotfiles-hkztn`)은 Worker가 다시 연 대화에 다섯째 결과 줄을 더한다.

```text
자동 진행 · <고른 것 한 줄> — 되돌리기: <방법 한 줄 | 없음 — <사유>>
```

세션은 사람에게 묻지 않고 이 줄로 대화를 끝낸다. 쓰는 경우는 둘이다: 승인된 ADR 절의 번호 승계가 끝난 멈춤 대화, 원인이 사라진 실패 단계를 그대로 다시 돌리는 실패 대화.

이 변경 뒤 beads-ui는 다음을 한다.

- 이 줄을 대화를 끝내는 결과 줄로 읽고, `워커가 이어감`과 같은 출구로 그 행을 잇는다.
- 같은 멈춤·실패 정체에 한 번만 받는다. 한도를 쓴 뒤 같은 문제로 열리는 대화의 진입 `상황`에 소진 표지를 싣는다.
- 이 줄로 돌아온 재개를 사람의 새 입력으로 세지 않는다.
- 알림과 이력에 자동 진행임을 드러낸다.
- dotfiles 진입 블록의 새 바이트 사본과 다이제스트 고정을 옮긴다.

## 2. 검증된 전제

인용은 beads-ui `328b0fb49633b6d35c95e7ec219958ce551f6bb0`, dotfiles `e732423f307f732c0b8b74ecfffc3744b62b5b8a` 기준이다.

- 결과 줄 파서는 접두 여섯 개(`워커가 이어감 ·` 등 셋과 옛 접두 셋)와 `수정 대기 ·`를 읽고, 어시스턴트 메시지의 첫 줄만 본다 — `server/worker/interactive-progress.js:28-62`
- 대화 메시지 처리는 턴이 돌고 있지 않고 메시지가 기동 뒤의 새 메시지이면 결과 줄을 읽는다. 사용자 턴이 있었는지는 확인하지 않는다 — `server/worker/scheduler.js:14681-14697`
- `워커가 이어감`(kind `handoff`)은 출처 `result_line`으로 예약되고, 실패 대화면 그때의 실패 행을 대상으로 고정한다 — `server/worker/scheduler.js:14800-14815`
- 실패 대화의 대상 종류는 `repo_operation`, `verify_hold`, `foreign_handoff`, `cleanup`, `merge_gate`, `discard`, `stale_residue`, `quickfix_landing`, `condition_wait`다 — `server/worker/resolve-session.js:977-1051`
- 실패 대화의 `워커가 이어감`은 종류별 출구를 한 번 실행한다. `merge_gate`와 `foreign_handoff`는 아무것도 실행하지 않는다 — `server/worker/scheduler.js:12593`, `server/worker/scheduler.js:12628`, `server/worker/scheduler.js:12700-12722`
- 멈춤 대화의 `워커가 이어감`은 멈춘 attempt를 `conversation_return`을 실어 재개한다 — `server/worker/scheduler.js:12094`, `server/worker/scheduler.js:12187`
- 같은 원인 반복 횟수는 재개 사슬을 거슬러 세다가 `conversation_return`을 만나면 멈춘다. 대화에서 돌아온 재개를 사람의 새 입력으로 보기 때문이다 — `server/worker/scheduler.js:7046-7051`
- `수정 대기`는 서버가 조건을 검사한 뒤에만 받는다: 대화 종류, 실패 정체, 그 정체를 이미 썼는지(`used_identities`), 수정 Bead 읽기. 하나라도 어긋나면 줄을 처리했다고만 표시하고 결과를 쓰지 않아 사람 차례로 남는다 — `server/worker/scheduler.js:14722-14790`
- 실패 정체는 저장소·종류·스크립트·코드·요약으로 만든 사고 지문이고, 수정 대기의 한 번 사용 기록과 같은 실패 재발 판정이 이 정체를 쓴다 — `server/worker/resolution-ladder.js:44`, `server/worker/queue-store.js:4031-4050`
- 수정 대기가 소진되면 다음 실패 대화의 `상황`에 `자가 수리: 소진 — <사유>`가 실린다 — `server/worker/resolve-session.js:467`, `server/worker/resolve-session.js:872-873`
- dispatch 잔여물 처분 실패는 재실행이 다시 실패하면 정체만 비교해 다음 대화를 한 번 연다. 원인은 비교하지 않는다 — `server/worker/scheduler.js:12870-12884`
- 실패 대화의 `워커가 이어감`이 실행되면 `↪ Worker가 이어감` 알림이 결과 줄 전문을 `결정:`으로 싣는다. 처리된 결과 줄은 이력에 `대화 결과 · <줄>`로 남는다 — `server/worker/notify.js:100`, `server/worker/notify.js:737`, `server/worker/scheduler.js:14836`
- 진입 블록은 dotfiles 블록의 바이트 사본을 문자열 배열로 갖고, 세 시험 파일이 같은 다이제스트를 고정하며 한 곳이 바이트 수 16311을 고정한다 — `server/worker/direction-inquiry.js:131-161`, `server/worker/direction-inquiry.test.js:29`, `server/worker/direction-inquiry.test.js:386`, `server/worker/resolve-session.test.js:25`, `server/worker/external-wait/session-resume.test.js:19`
- Worker는 Bead 스냅숏에 `adr_approval` 값을 싣고, 현재 절과 맞는지 판정하는 함수를 갖는다 — `server/worker/attach.js:685-688`, `server/worker/quick-fix-handoff.js:765-802`
- 진입 `상황` 칸은 대화를 열 때 채운다 — `server/worker/direction-inquiry.js:215-235`, `server/worker/resolve-session.js:855-876`
- dotfiles 계약은 `[정리 재시도]`를 실패한 작업·배포·정리 단계만 다시 돌리는 한 동작으로 정한다 — dotfiles `docs/contracts/workflow-state.yaml:1205-1210`
- 미확인: dotfiles 계약의 `post_merge_failure`와 `post_merge_environment` 행이 모두 대상 종류 `cleanup`으로 잡히는지 — 대상 판정 함수를 끝까지 읽지 않았다. 구현에서 확인하고, 다르면 3.2의 허용 종류를 계약의 재실행 대상에 맞춘다.
- 미확인: `cleanup`과 `repo_operation`에서 재실행이 같은 실패로 끝났을 때 대화가 자동으로 다시 열리는지 — 시험으로 확인하지 못했다. 이 설계는 그 동작에 기대지 않는다(3.4).

## 3. 설계

### 3.1 줄 읽기

파서는 `자동 진행 ·`으로 시작하는 첫 줄을 새 kind(예: `auto_proceed`)로 읽고 줄 전문을 돌려준다. 기존 줄의 판정은 바꾸지 않는다.

### 3.2 받는 조건

서버는 `수정 대기`처럼 조건을 검사한 뒤에만 이 줄을 받는다.

- 멈춤 대화: 사용자 일시정지(`멈춤 paused`)가 아니고, 그 Bead가 `route=quick_fix`이며 ADR 절이 하나이고, `adr_approval`이 대화를 열 때의 값과 다르며 현재 절과 맞다(승인됨). 대화를 열 때의 승인 값은 대화 기록에 남긴다. 번호 승계 없이 쓴 줄은 이 조건에서 걸러진다.
- 실패 대화: 대상 종류가 `repo_operation`, `cleanup`, `quickfix_landing` 중 하나다. `verify_hold`, `merge_gate`, `foreign_handoff`, `discard`, `stale_residue`, `condition_wait`는 받지 않는다.
- 외부 작업 완료 대화에서는 받지 않는다.
- 그 행의 정체(3.3)가 아직 자동 진행에 쓰이지 않았다.

받으면 `워커가 이어감`과 같은 출구를 탄다. 멈춤이면 멈춘 attempt를 무인으로 재개하고, 실패면 그 종류의 실패 단계를 한 번 다시 돌린다. 창 닫기, 이력 줄, 처리 표시는 기존 결과 줄과 같다.

받지 않으면 `수정 대기`의 거절과 같게 처리한다: 줄을 처리했다고만 표시하고 결과를 쓰지 않아 그 대화는 사람 답을 기다리는 대화로 남는다. 이력에 `자동 진행 거절 · <사유>`를 남기고 사람에게 확인 필요 알림을 한 번 보낸다.

- 결정: 멈춤 대화의 줄은 승계 증거가 있을 때만 받는다 — dotfiles 계약이 멈춤 대화의 자동 진행을 ADR 번호 승계 뒤로 한정하고, `수정 대기`처럼 서버가 근거를 확인해야 자격 증명 멈춤이나 설계 충돌이 사람 없이 재개되지 않는다.
- 결정: `stale_residue`는 받지 않는다 — 남은 작업물 처분은 재실행이 아니고, 이 종류는 원인 비교 없이 대화를 다시 열어 자동 재실행이 되풀이될 수 있다.

### 3.3 한 번 기록

자동 진행에 쓴 정체를 행마다 영속 기록한다(예: 수정 대기의 `used_identities`와 같은 꼴의 기록).

- 실패 대화의 정체는 수정 대기가 쓰는 실패 정체와 같다.
- 멈춤 대화의 정체는 Bead와 멈춤 사유 값(`awaiting_user=<값>` 또는 `recovery:<사유>`)이다. 자동 진행으로 재개한 사슬 안에서 같은 값으로 다시 멈추면 같은 정체다.
- 기록은 서버 재시작 뒤에도 남는다. 출구 실행이 시작된 뒤 재시작해도 같은 줄로 출구를 다시 실행하지 않는 기존 한 번 규칙은 그대로 적용된다.
- 결정: 한 번 기록은 수정 대기 기록과 따로 둔다 — 둘은 권한과 출구가 다르다. 자가 수리는 수정 Bead의 착지를 기다리고 자동 진행은 지금 다시 돌린다.

### 3.4 같은 문제의 재발

정체가 자동 진행에 쓰인 행에서 대화를 열 때(자동 기동이든 사람 클릭이든) 진입 `상황`에 한 줄을 싣는다.

```text
자동 진행: 소진 — <사유>
```

사유는 실패 대화에서 `같은 실패 재발`, 멈춤 대화에서 `같은 사유로 다시 멈춤`이다. 세션은 이 표지를 보고 자동 진행 없이 묻는다(dotfiles 진입 블록). 표지와 무관하게 서버는 3.2의 조건으로 둘째 줄을 거절한다.

대화가 자동으로 열리는지는 그 실패 종류의 기존 규칙을 따르고 이 변경이 바꾸지 않는다. 다른 정체의 실패는 새 실패이고 자동 진행 한도를 새로 갖는다.

### 3.5 사람 입력으로 세지 않는다

- 자동 진행으로 재개한 attempt는 사람이 돌려보낸 재개와 구분해 기록한다. 같은 원인 반복 횟수는 이 재개를 넘어 계속 센다.
- 실패 단계 재실행의 기록에는 사람 클릭이 아니라 자동 진행으로 남긴다.
- `awaiting_user`가 남아 있는 멈춤의 재개 허용은 `워커가 이어감`과 같다. 재개한 세션이 결정을 적용하고 해제한다.

### 3.6 알림과 이력

- 실패 대화: 출구가 시작되면 `↪ 자동 진행` 제목의 알림을 보낸다. 본문은 기존 `↪ Worker가 이어감` 알림과 같은 항목이고 `결정:`에 결과 줄 전문(고른 것과 되돌리는 방법)을 싣는다.
- 멈춤 대화: 재개 기동 알림의 `결정:`에 결과 줄 전문을 싣고 자동 진행임을 드러낸다.
- 이력: 기존 `대화 결과 · <줄>` 한 줄. 줄 자체가 `자동 진행 ·`으로 시작하므로 따로 표시하지 않는다.
- 결정: 카드에 새 칩이나 필드를 더하지 않는다 — 알림과 이력이 이미 줄 전문을 보여 준다.

### 3.7 진입 블록 사본과 계약 사본

- dotfiles-hkztn이 착지한 커밋의 `## Worker 세션 대화` 블록을 바이트 그대로 옮기고, 주석의 커밋, 세 시험의 다이제스트 상수, 바이트 수를 함께 옮긴다.
- dotfiles `generated/contracts/`의 사본이 그 착지에서 바뀌었으면 고정된 사본과 출처 기록을 함께 옮긴다.

## 4. 오류 처리

- 한 번 기록을 쓰지 못하면 줄을 받지 않는다. 기록 없이 출구를 실행하지 않는다.
- 정체를 계산하지 못하는 행은 받지 않는다.
- 재실행이 거절되거나 시작하지 못하면 기존 `워커가 이어감` 출구의 실패 처리와 같다. 한 번 기록은 쓴 것으로 남는다.

## 5. 수락 기준

1. `자동 진행 · …`로 끝난 `repo_operation`·`cleanup`·`quickfix_landing` 실패 대화는 그 종류의 실패 단계를 한 번 다시 돌리고, `↪ 자동 진행` 알림과 `대화 결과 ·` 이력 줄을 남긴다.
2. quick_fix Bead의 멈춤 대화(일시정지 아님)에서 `adr_approval`이 대화가 열린 뒤 바뀌어 현재 절과 맞으면, `자동 진행 · …` 줄이 멈춘 attempt를 무인으로 재개한다.
3. 같은 정체의 둘째 `자동 진행` 줄은 받지 않는다. 그 대화는 사람 답 대기로 남고 이력에 거절 줄이 생기며 확인 필요 알림이 한 번 간다.
4. 받지 않는 경우(3.2의 여섯 실패 종류, 사용자 일시정지, 외부 작업 완료, 승인 값이 대화가 열린 뒤 바뀌지 않았거나 현재 절과 맞지 않는 멈춤 대화, quick_fix가 아닌 Bead의 멈춤 대화)의 `자동 진행` 줄은 3과 같게 거절된다.
5. 자동 진행 재실행이 같은 정체로 다시 실패한 뒤 열리는 대화의 `상황`에 `자동 진행: 소진 — 같은 실패 재발`이 있다. 자동 진행으로 재개한 사슬이 같은 사유로 다시 멈춘 뒤 열리는 대화의 `상황`에 `자동 진행: 소진 — 같은 사유로 다시 멈춤`이 있다.
6. 자동 진행으로 재개한 attempt가 같은 원인으로 다시 멈추면 같은 원인 반복 횟수가 재개 전 횟수에 이어서 세어진다.
7. 서버를 재시작해도 한 번 기록이 남고, 시작된 출구는 다시 실행되지 않는다.
8. 진입 블록 사본의 다이제스트와 바이트 수가 dotfiles-hkztn 착지 커밋의 블록과 같다.
9. 기존 결과 줄(`워커가 이어감`, `이 대화에서 마무리`, `나중에`, `수정 대기`, 옛 접두 셋)의 동작은 바뀌지 않는다.

## 6. 시험

Test scope — 결과 줄 파서, 대화 메시지 처리, 진입 상황 채우기, 알림, 진입 블록 고정.

- `server/worker/interactive-progress.test.js`: 새 줄의 읽기와 기존 줄 유지.
- `server/worker/scheduler.test.js`: 수락 기준 1~7.
- `server/worker/resolve-session.test.js`, `server/worker/direction-inquiry.test.js`: 소진 표지, 블록 다이제스트와 바이트 수.
- `server/worker/external-wait/session-resume.test.js`: 블록 다이제스트.
- `server/worker/notify.test.js`: `↪ 자동 진행` 알림.
- baseline_red: 수락 기준 1의 시험은 수정 전 base에서 실패한다(줄이 읽히지 않아 대화가 사람 답 대기로 남는다).
- 이어서 `npm run tsc`, `npm run lint`, `npm test`

## 7. 경계·후속

후속 Bead 없음. 이 Bead의 선행은 `dotfiles-hkztn`이다.

- 관찰: `stale_residue`의 `워커가 이어감` 재실행이 원인 비교 없이 대화를 다시 여는 동작 — 이 Bead는 자동 진행에서 그 종류를 빼는 것으로 피하고, 기존 동작은 바꾸지 않는다.

## 8. 결정 (ADR 후보)

- 전제: ADR dotfiles/dotfiles-kjyd1 — Worker 세션 대화의 결과 줄 계약과 진입 블록 바이트 정본을 따른다. dotfiles-hkztn이 이 ADR을 교체하며 다섯째 줄을 더한다.
- beads-ui는 Worker 세션 대화의 결과 줄 `자동 진행 ·`을 서버 조건 검사 뒤에만 받아 같은 멈춤·실패 정체에 한 번 이어 가고, 사람 입력으로 세지 않으며, 쓴 정체로 다시 열리는 대화에 소진 표지를 싣는다.
  - 되돌리기 어렵다: 결과 줄 파서, 대화 메시지 처리와 출구, 한 번 기록의 저장 형식, 진입 상황 채우기, 알림, 진입 블록 사본과 세 시험의 고정값이 dotfiles 진입 블록·계약과 함께 움직인다.
  - 맥락 없이는 의외다: 지금까지 사람 답 없이 받는 결과 줄은 수정 Bead를 요구하는 `수정 대기`뿐이었는데, 수정 없이 실패 단계를 다시 돌리는 줄이 생긴다.
  - 실제 맞교환이다: 얻는 것은 권장안 누르기로 끝나던 대화의 제거이고, 감수하는 것은 사람 확인 없는 한 번의 재실행이다. 기각한 대안은 `워커가 이어감`으로 받는 안(한 번 규칙과 반복 횟수 유지를 서버가 집행할 수 없다)과 수정 대기 기록에 합치는 안(권한과 출구가 달라 한 기록에 규칙이 둘이 된다)이다.
  - 소비자 집합(결과 줄 파서, 대화 결과 처리, 실패 정체 기록)이 ADR UI-8ufc가 승계한 Worker 대화 결과 줄 조항과 같으므로 그 ADR을 교체한다.
  - `summary`: "Worker 세션 대화의 결과 줄 자동 진행은 서버가 대화·실패 종류와 정체를 검사한 뒤에만 받아 같은 멈춤·실패 정체에 한 번 워커가 이어감과 같은 출구로 잇고, 사람 입력으로 세지 않으며 쓴 정체로 다시 열리는 대화에 소진 표지를 싣는다 — 나머지 조항은 UI-8ufc 그대로다" → ADR, supersede UI-8ufc
- 받는 실패 종류 목록과 알림 제목 문구 — 목록은 dotfiles 계약의 재실행 대상을 따르는 값이고 문구는 표시 형식(기본 제외 목록) → ADR 아님
