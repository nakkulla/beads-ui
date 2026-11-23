---
scope:
  - server/worker/spec-authoring.js
  - server/worker/spec-authoring.test.js
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/spec-id.js
---

# 선행 스펙 작성 대화: 초안이 최근에 바뀐 선행은 자동 기동을 미룬다 — beads-ui 소비자

Bead: `UI-20pf` · 날짜: 2026-11-23 · 계약 정본: dotfiles `dotfiles-kjyd1` 스펙 `docs/superpowers/specs/2026-11-23-spec-authoring-draft-deferral-design.md`

## 1. 목표

Worker가 다른 세션이 스펙을 쓰는 중인 선행 Bead에 스펙 작성 대화를 하나 더 열지 않게 한다. dotfiles 계약 `needs_human_reentry.conversation_auto_launch.prerequisite_spec_authoring.draft_in_progress`를 소비해, 스펙 근거가 `draft`이고 Bead의 마지막 변경이 한도 안인 선행은 자동 기동과 알림을 미루고, 한도를 넘겨 멈추면 지금처럼 한 번 연다.

작성 중 판정과 한도의 정의는 계약이 소유한다. 이 스펙은 그 값을 코드 registry로 복제해 쓴다(ADR UI-jlov).

사고(2026-11-17)와 사용자 결정(2026-11-23)은 계약 스펙 1절에 있다. 요지는 이렇다. 스펙을 쓰는 세션이 `spec_id`를 적은 4분 뒤 그 스펙에 막힌 형제 작업을 대기열에 올렸고, Worker가 같은 선행에 대화를 하나 더 열었다. 리뷰 영수증이 적힐 때까지 선행은 `draft`라서 이 순서에서는 매번 생긴다.

## 2. 검증된 전제

인용은 beads-ui `7be5cc730b35e8d768846a1c10463534995009d3`, dotfiles `70fc3f4cea106ff00038cdce3c94c917e0f4bd59` 기준이다.

- 대상 판정은 스펙 근거가 `published`인 선행만 빼고 `none`과 `draft`를 모두 대상으로 본다. 같은 판정을 자동 기동, 클릭, 카드 투영이 함께 쓴다 — `server/worker/spec-authoring.js:96-131`
- 자동 기동은 `observe`가 맡는다. 선행 Bead당 기록이 있으면 건너뛰고, 대상이면 기록을 먼저 잡은 뒤 열거나 알림만 보낸다 — `server/worker/spec-authoring.js:455-541`
- 살아 있는 대화 게이트는 beads-ui가 직접 연 대화(대기열 저장소의 대화형 세션 기록, 창 표지)만 본다. 사람이 따로 연 세션은 보이지 않는다 — `server/worker/spec-authoring.js:315-332`
- 클릭 경로는 자동 기동 기록과 상관없이 대상과 게이트만 다시 판정해 연다 — `server/worker/spec-authoring.js:548-568`
- 카드 투영은 같은 대상 판정으로 선행 카드와 원 Bead 카드의 표시 재료를 만든다 — `server/worker/spec-authoring.js:140-192`
- 판정 시점은 두 곳이다. attempt가 `waiting/prerequisite_unmet`으로 정산된 직후와, dispatch 패스가 준비되지 않은 대기열 항목에 `prerequisite_unmet`을 기록할 때다 — `server/worker/scheduler.js:7648-7656`, `server/worker/scheduler.js:8926-8931`
- 스펙 근거는 `spec_id`와 형식이 유효한 `spec_review`가 함께 있으면 `published`, `spec_id`만 있으면 `draft`, 없으면 `none`이다 — `server/spec-id.js:71-85`
- 다른 rig의 선행은 투영된 `bd show`로 읽고, 투영은 행을 통째로 넘기므로 `updated_at`이 실린다 — `server/worker/spec-authoring.js:199-205`, `server/bd-json.js:222-269`
- 같은 rig의 선행도 투영된 `bd show` 행 전체로 읽는다 — `server/worker/scheduler.js:1790-1816`, `server/worker/bd-metadata.js:282-298`
- 선행 Bead당 자동 기동 기록은 대기열 저장소에 영속하고, 잡기와 마감이 따로 있다 — `server/worker/queue-store.js:8576-8604`
- 계약은 `draft`도 대상으로 정하고, 조회 실패는 다음 관측까지 대상이 아닌 것으로 본다 — dotfiles `docs/contracts/workflow-state.yaml:1278-1290`
- 사고 때 자동 기동 시각의 선행은 `spec_id`가 4분 5초 전에 적힌 `draft`였다 — dotfiles 대기열 저장소 `spec_authoring_launches["dotfiles-mf52q"].at = 1794908741852`(2026-11-17T09:45:41Z)와 세션 기록의 `bd update dotfiles-mf52q --spec-id` 실행 시각 09:41:36Z
- `spec_id`만 적는 쓰기가 Bead의 `updated_at`을 갱신한다 — 사고 기록: 작성 세션이 09:41:36Z에 `bd update dotfiles-mf52q --spec-id`만 실행했고, 자동으로 열린 세션이 09:45:54Z에 읽은 `bd show dotfiles-mf52q --json`의 `updated_at`이 `2026-11-17T09:41:37Z`였다(세션 기록 `5ba288fa…jsonl`의 도구 결과)
- 의존 간선이나 라벨만 더하는 쓰기는 `updated_at`을 갱신하지 않는다 — 2026-11-23 실측: `UI-20pf`에 `bd dep add`를 실행한 뒤에도 값이 `2026-11-17T16:23:42Z` 그대로였다(`bd show --json`). 그래서 다른 Bead가 이 선행에 `blocks`를 걸어도 한도 시계는 움직이지 않는다
- dispatch 패스를 주기적으로 깨우는 타이머는 없다. 패스는 대기열 변경, attempt 종료, 그 저장소나 선행이 있는 rig의 Bead 변경 신호 같은 사건으로 돌고, 준비되지 않은 대기열 항목마다 선행을 다시 관측한다 — `server/worker/attach.js:2465-2545`, `server/worker/scheduler.js:15164-15173`, `grep -rn 'setInterval(' server/worker`의 결과에 dispatch용 주기가 없음
- 워크스페이스마다 재판정을 한 번 예약하는 메모리 타이머의 선례가 있다 — `server/worker/scheduler.js:19778-19792`
- 미확인: `spec_review` 영수증 같은 metadata만 쓰는 갱신과 댓글이 `updated_at`을 갱신하는지 — 영수증이 적히면 `published`가 되어 판정에서 빠지므로 설계에는 영향이 없고, 리뷰가 길어질 때 한도 시계가 얼마나 자주 새로 도는지만 달라진다.

## 3. 설계

### 3.1 작성 중 판정 (계약 복제)

계약 3.1을 순수 술어 하나로 옮긴다(예: `specDraftInProgress(issue, now)`).

- 스펙 근거가 `draft`이고, `updated_at`을 시각으로 읽을 수 있고, 그 시각이 판정 시각으로부터 한도 안이면 참이다.
- 스펙 근거가 `none`이거나 `published`이면 거짓이다.
- `updated_at`이 없거나 읽을 수 없으면 거짓이다.
- `updated_at`이 판정 시각보다 미래이면 한도 안으로 본다(서버 사이 시계 차이).
- 한도는 계약 키 `idle_limit_hours`의 값(24)을 복제한 상수 하나다.

### 3.2 자동 기동 경로

`observe`에서 선행이 대상(`spec_needed`)으로 판정된 뒤, 기록을 잡기 전에 3.1을 본다. 참이면 그 선행을 건너뛴다.

- 자동 기동 기록을 잡지 않는다. 그래서 다음 관측이 처음부터 다시 판정한다.
- 대화를 열지 않고, 알림을 보내지 않고, 거부 기록도 남기지 않는다. 공용 스위치가 꺼져 있을 때도 같다.
- 다음 관측에서 `published`이면 대상이 아니다. 여전히 `draft`인데 한도를 넘겼으면 기존 경로 그대로 기록을 잡고 연다(`열린 경로: 자동`).
- 미룬 선행의 한도 시각(`updated_at` + 한도)에 원 Bead가 있는 워크스페이스의 dispatch 패스를 한 번 더 돌리도록 예약한다. 예약은 프로세스 메모리에만 두고 워크스페이스당 가장 이른 시각 하나만 유지한다. 그 패스가 선행을 다시 관측해 위 판정을 되풀이하므로, Bead가 그 사이 바뀌었으면 새 한도 시각으로 다시 예약된다.
- 예약 콜백은 실패해도 조용히 끝난다. 다음 관측이 같은 판정을 다시 한다.

### 3.3 바꾸지 않는 것

결정: 클릭 경로(`launchForClick`)는 작성 중 판정을 보지 않는다 (대안: 작성 중이면 클릭도 거부; 이유: 계약이 클릭은 언제나 연다고 정했고, 작성 세션이 죽었을 때 한도 안의 유일한 출구가 버튼이다).

결정: 카드 투영과 `specAuthoringState`는 바꾸지 않는다 (대안: 작성 중인 선행에 `작성 중` 표시를 더함; 이유: 서버는 초안의 작성자가 살아 있는지 모르고, 새 표시는 카드 문법 스펙의 슬롯을 먼저 정해야 한다. `✍️ 스펙 확정 필요`는 초안 상태에서도 참이다).

진입 블록 사본과 다이제스트, 대화 종류, 창 표지, 대기열 저장소의 기록 형식, WebSocket 프로토콜은 그대로다.

## 4. 오류 처리

- 선행을 읽지 못하면 지금처럼 대상이 아니고 다음 관측에서 다시 본다.
- `updated_at`을 읽지 못하면 미루지 않는다. 미루는 쪽으로 기울면 읽기 실패가 막힌 작업을 조용히 묶는다.
- 미루는 동안 서버가 재시작하면 한도 시각 예약이 사라진다. 디스크에 남는 상태는 없고, 재시작 뒤 첫 관측이 같은 판정으로 다시 예약한다. 그 대기열에 관측이 한 번도 오지 않으면 한도가 지나도 열리지 않고 다음 관측에서 열린다.

## 5. 수락 기준

1. 대상 선행이 `draft`이고 `updated_at`이 한도 안이면 자동 기동 관측에서 대화가 열리지 않고, 알림이 나가지 않고, 선행 Bead당 자동 기동 기록이 생기지 않는다.
2. 같은 선행이 `draft`인 채 한도를 넘기면, 그 사이 다른 사건이 없어도 한도 시각의 예약된 패스에서 대화가 한 번 열리고 알림이 한 번 나간다. 그 뒤 관측에서는 다시 열리지 않는다.
3. 미룬 뒤 다음 관측에서 `published`가 된 선행에는 대화도 알림도 없다.
4. 스펙 근거 `none`인 선행, `updated_at`을 읽을 수 없는 `draft` 선행은 지금과 같이 첫 관측에서 열린다.
5. 작성 중인 선행도 클릭으로는 열리고, 카드 표시와 버튼이 지금과 같다.
6. 사고 재현: 원 Bead가 대기열에 있고 선행의 `spec_id`가 4분 전에 적힌 상태로 dispatch 패스를 돌리면 대화가 열리지 않는다.
7. 배포 뒤 실측: 실제 저장소에서 초안만 있는 선행에 막힌 작업을 대기열에 올렸을 때 스펙 작성 대화 창과 `🙋 스펙 확정 필요` 알림이 없고, 같은 선행 카드의 `[스펙 작성 세션]` 버튼은 남아 있다.

## 6. 시험

`server/worker/spec-authoring.test.js`에 더한다.

- 술어: `draft`와 한도 안, `draft`와 한도 밖, `none`, `published`, `updated_at` 없음, 읽을 수 없는 값, 미래 시각.
- `observe`: 작성 중이면 기록 잡기·기동·알림·거부 기록이 모두 불리지 않는다.
- `observe` 두 번: 첫 관측은 미루고, 시계를 한도 뒤로 옮긴 둘째 관측은 한 번 연다. 셋째 관측은 열지 않는다.
- `observe` 두 번: 첫 관측은 미루고, 둘째 관측 전에 영수증이 적히면 아무것도 하지 않는다.
- 예약: 미룬 관측이 한도 시각에 패스 하나를 예약하고, 가짜 시계를 그 시각으로 옮기면 패스가 한 번 돈다. 같은 워크스페이스에서 두 선행을 미루면 이른 시각 하나만 남는다(`server/worker/scheduler.test.js`).
- 스위치 꺼짐: 작성 중이면 알림도 없다.
- `launchForClick`: 작성 중인 선행도 연다.
- 기존 시험(대상 판정, 한 번 규칙, 스위치 꺼짐, 기동 실패, 진입 블록 다이제스트, 카드 동일성)은 그대로 통과한다.

검증 묶음은 `npm run tsc`, `npm run lint`, `npx prettier --check <변경 파일>`, `npx vitest run --reporter=dot`이다.

## 7. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | awaited_by_consumer | 다른 저장소의 계약 정의(작성 중 판정의 키와 값, ADR 교체). 이 Bead는 착지한 값을 복제한다 | 없음 | dotfiles-kjyd1 |

- 선행: dotfiles `dotfiles-kjyd1` 계약 착지(`draft_in_progress` 키와 값). `UI-20pf`는 그 Bead에 `blocks`로 묶여 있다.
- 비목표: `spec_id`를 적기 전 구간(스펙 근거 `none`)의 중복 기동, 작성 세션의 생존 확인, 작성 중 카드 표시, 한도 시각 예약의 디스크 영속.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-jlov — 계약 subset을 코드 registry로 복제하고, 계약 키가 없으면 fail-quiet로 지금 동작을 유지한다.
- 초안이 최근에 바뀐 선행의 자동 기동 유예와 한도 뒤 기동 — 소비자가 dotfiles 계약과 이 저장소에 걸쳐 있고, 왜 미루는지와 기각한 대안은 ADR dotfiles/dotfiles-kjyd1(ADR dotfiles/dotfiles-gphqj 교체 후보)이 기록한다. 이 저장소의 몫은 `server/worker/spec-authoring.js`의 판정과 `server/worker/scheduler.js`의 예약 추가라 되돌리기 어렵지 않다 → ADR 아님
- 클릭 경로와 카드 표시를 바꾸지 않는다 — 현행 동작을 유지할 뿐이고 UI 표시·버튼은 기본 제외 목록이다 → ADR 아님
