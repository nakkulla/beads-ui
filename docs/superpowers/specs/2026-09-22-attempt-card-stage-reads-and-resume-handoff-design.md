---
scope:
  - server/worker/attempt-facts.js
  - server/worker/attempt-facts.test.js
  - server/worker/attempt-facts.cross-runtime.test.js
  - server/worker/runner/preamble.js
  - server/worker/runner/preamble.test.js
  - server/worker/runner/__snapshots__/
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
---

# UI-52uv — attempt 카드의 단계별 읽기 명령과 재시작 handoff

Bead: UI-52uv · 2026-09-22 · 출처: dotfiles/dotfiles-hhk3

## 0. 배경

2026-09-08~22 Codex 세션 실측에서 astra 컨트롤러 세션 도구 호출의 32~39%가 하네스 문서 재읽기였고, attempt 재시작 직후와 압축 직후 8단계에서는 62%였다. Codex는 Skill·Read 도구가 없어 `cat SKILL.md`와 `sed -n` 범위 읽기로 문서를 읽고, 헤딩을 찾는 호출과 범위를 잘못 잡아 다시 읽는 호출이 각각 12초 안팎의 모델 지연을 낸다. Claude 세션도 같은 기준으로 21%가 하네스 읽기라 카드 개선은 두 런타임에 같이 이득이다.

attempt 카드(`server/worker/attempt-facts.js` + `runner/preamble.js attemptFactsDirective`, 2026-09-09 harness-reduction 스펙 D1)는 이미 route·worktree·selector 입력·리뷰어 프리셋·스크립트 호출 명령을 싣고, 재검토 절 하나는 헤딩 앵커 `sed -n '/^## Staleness re-review$/,/^## Selector and dispatch$/p'` 명령으로 싣는 선례가 있다. 재시작 attempt의 `resumePrompt`(`scheduler.js`)는 이전 attempt의 원인·영수증·원격 동기화 명령을 싣지만 이전 세션이 어디까지 했는지는 싣지 않는다.

세 단계 처방 중 2단계다. 1단계는 dotfiles 설정(dotfiles-hhk3), 3단계는 Codex delta 축소(dotfiles-u86k)와 프리셋(UI-v12t)이다.

## 1. 목표

- 세션이 단계마다 문서의 헤딩을 찾고 범위를 나눠 읽는 대신, 카드가 준 명령 하나로 그 단계의 절을 읽게 한다.
- 재시작 attempt가 이전 attempt의 마지막 보고를 카드에서 받아 워크트리·Bead·PR 상태 재탐색을 줄이게 한다.
- 두 런타임이 같은 카드를 받는다.

## 2. 비목표

- 참조 문서 본문을 카드에 인라인하지 않는다. 프롬프트가 커지고, Codex 압축은 최근 사용자 메시지 20k토큰만 남겨 큰 카드가 잘린다.
- dotfiles 계약 파일을 런타임에 읽지 않는다(ADR 0012). 이 스펙이 읽는 것은 설치된 workflow 스킬의 reference 파일이며 헤딩 존재만 확인한다.
- review 세션(`mode === 'review'`)과 direction inquiry 세션의 카드는 바꾸지 않는다.
- workflow 스킬 문서의 절 구성·크기는 바꾸지 않는다(dotfiles 소유).

## 3. 결정의 근거가 된 사실

- `buildScriptCalls`는 `installed(<name>)`로 스크립트·reference 파일 존재를 확인한 뒤에만 명령 줄을 만든다(fail-quiet by omission). 헤딩 앵커 sed 명령의 선례는 `stale_reference` 한 건이다.
- 설치된 reference의 절 경계(2026-09-22 설치본): `execution-spec-backed.md` `## Worktree and branch safety`·`## Artifact publication`·`## Worker lane placement`·`## Attempt continuation`·`## Staleness re-review`·`## Selector and dispatch`·`## Prerequisite gate`; `execution-quick-fix.md` `## Cross-repo units (quick_fix disposition)`·`## quick_fix landing`; `finishing.md` `## Phase seal`·`## Final PR delivery`·`## Merge tail`·`## quick_fix tail`·`### Worker-dispatched quick_fix`·`### No-change close (refuted or no-delta)`·`## Resume`·`## Terminal result line`·`## Completion report`; `execution-common.md` `## Push safety`·`## 탐색 지도 (recommended)`; `unattended-waits.md`는 2.3KB 단일 절.
- `resumePrompt(bead_id, prior_status, facts)`의 `facts`는 `resumeAncestorFacts(prior, bead_id)`가 attempt 레코드와 Bead 메타데이터에서 만든다. 이전 세션의 모델 텍스트를 읽는 함수는 이미 있다: `scheduler.js` `recentAssistantText(workspace, prior)`는 Worker가 저장한 attempt 세션 로그(`deps.sessionLog.read`, 레코드의 `log_path`)를 `createTranscriptReducer`로 줄여 assistant·gate·phase 텍스트를 모으고 `resumed_from` 사슬을 거슬러 첫 비어 있지 않은 attempt를 쓴다. 공급자 세션 파일(계정별 `CODEX_HOME` 미러, `codexSessionsRoot`)이 아니라 Worker 자체 로그를 읽으므로 계정별 경로 해소가 필요 없다. 그 텍스트는 `resumeHandoffBlock(workspace, prior)`가 4,000자 상한(`RESUME_HANDOFF_MAX_CHARS`)으로 잘라 `handoff_instructions`에 넣고, 이는 `needs_handoff`인 continuation(공급자 장애·한도 뒤 fresh 세션)에만 붙는다. 그 밖의 재시작(실패·일시정지 뒤 `resume`)은 `resumePrompt`만 받고 이전 모델 텍스트를 받지 않는다.
- Worker attempt는 `CODEX_LIFETIME_DIRECTIVE`(Codex) 또는 Claude 분기 지시 하나와 공통 `attemptFactsDirective`를 받는다.

## 4. 설계

### 4.1 단계별 읽기 명령 (attempt-facts.js)

`AttemptFacts`에 `stage_reads: StageRead[]`를 더한다. `StageRead = { stage: string, command: string, note: string|null }`. `buildScriptCalls`와 같은 자리에서 route·mode로 목록을 만들고, 각 항목은 대상 파일이 설치되어 있고 시작 헤딩이 그 파일에 정확히 한 줄로 존재할 때만 만든다(줄 단위 `===` 비교, 정규식 아님). 끝 헤딩이 없으면 파일 끝까지 읽는 `sed -n '/^<start>$/,$p'`를 쓴다.

| route / 상황 | stage | 명령 (start → end) |
| --- | --- | --- |
| spec_backed | 진입·선택·dispatch | `execution-spec-backed.md` `## Selector and dispatch` → `## Prerequisite gate` |
| spec_backed, 재시작 attempt만 | 이어하기 | `execution-spec-backed.md` `## Attempt continuation` → `## Staleness re-review` |
| spec_backed | push 전 | `execution-common.md` `## Push safety` → `## 탐색 지도 (recommended)` |
| spec_backed | 인도 | `finishing.md` `## Final PR delivery` → `## Merge tail` |
| quick_fix (Worker 인계) | 착지 | `execution-quick-fix.md` `## quick_fix landing` → 파일 끝 |
| quick_fix (Worker 인계) | 마무리 | `finishing.md` `### Worker-dispatched quick_fix` → `### No-change close (refuted or no-delta)` |
| 공통 | 종료 보고 | `finishing.md` `## Terminal result line` → `## Completion report`, 이어서 `## Completion report` → 파일 끝 |
| 공통 | 무인 대기 | `unattended-waits.md` 전체(`cat`) |

기존 `stale_reference` 항목은 `scripts`에서 `stage_reads`(stage `재검토`)로 옮긴다. 명령 문자열은 그대로다.

### 4.2 카드 렌더 (preamble.js attemptFactsDirective)

`스크립트 호출:` 뒤에 `단계별 읽기 (그 단계에 들어갈 때 한 번):` 목록을 붙인다. 항목은 `- <stage>: \`<command>\`` 형식이고 note가 있으면 ` — <note>`를 잇는다. 그 앞 안내문 두 줄에 한 줄을 더한다:

> 단계별 읽기 명령이 있는 단계는 그 명령 한 번으로 읽는다. `SKILL.md`와 계약 문서를 다시 `cat`하거나 헤딩을 찾아 범위를 나눠 읽지 않는다. 카드에 없는 질문이 생겼을 때만 문서를 연다.

`stage_reads`가 비면 목록과 안내 줄을 모두 생략한다(fail-quiet by omission). 두 런타임이 같은 렌더를 받는다.

### 4.3 재시작 handoff (scheduler.js resumeAncestorFacts · resumePrompt)

출처는 하나, Worker가 저장한 이전 attempt의 세션 로그다. `recentAssistantText`를 텍스트 배열을 돌려주는 `recentAssistantTexts(workspace, prior)`로 나누고, 기존 `recentAssistantText`는 그 배열을 `\n\n`으로 이은 값으로 유지한다(호출자 `resumeHandoffBlock` 동작 불변). `resumeAncestorFacts(prior, bead_id)`는 `workspace`를 더 받아 `prior_final_message: string|null`을 반환에 더한다: `recentAssistantTexts`의 **마지막** 항목이며, 3,000자를 넘으면 뒤 3,000자만 남기고 앞에 `(앞부분 생략) `을 붙인다. 로그를 읽을 수 없거나 항목이 없으면 null이고 문장을 만들지 않는다. 공급자 세션 파일은 읽지 않으므로 계정별 홈 경로 해소가 필요 없다.

`resumePrompt`는 `facts.prior_final_message`가 있을 때 ancestor 문장 뒤에 한 문장을 더한다:

> 이전 세션의 마지막 보고: <메시지>. 이 보고는 그 세션의 tool result에 결속된 것만 사실로 보고, 워크트리·Bead·PR 상태로 다시 확인한 뒤 남은 단계만 한다.

이전 모델 텍스트는 프롬프트에 한 번만 들어간다. `needs_handoff`인 continuation은 `handoff_instructions`(`resumeHandoffBlock`, 최근 텍스트 전체의 뒤 4,000자)가 그 역할을 하므로, 그 경로의 `resumePrompt` 호출은 `prior_final_message`를 null로 넘겨 문장을 만들지 않는다. `needs_handoff`가 아닌 재시작(실패·일시정지 뒤 `resume`)만 새 문장을 받는다. 판정 입력은 `resolveContinuationForAttempt`가 이미 계산한 `needs_handoff`이며 새 플래그를 만들지 않는다.

Bead 코멘트의 `## 🤖 작업 보고서`는 쓰지 않는다. 실패한 attempt는 보고서를 남기지 않는 경우가 많고, 두 출처를 두면 어느 쪽이 최신인지 판정이 필요해진다.

### 4.4 정합성

- 런타임: 헤딩이 없으면 그 줄을 생략한다. 잘못된 범위를 실어 세션이 빈 출력을 받는 것이 없는 줄보다 나쁘다.
- 테스트: `server/worker/attempt-facts.cross-runtime.test.js`(신규)가 기존 cross-runtime 테스트와 같은 방식으로 dotfiles 체크아웃을 찾아 `src/shared/skills/flow/workflow/references/*.md`에서 4.1 표의 모든 헤딩이 정확히 한 줄로 존재하는지 확인한다. dotfiles가 절 이름을 바꾸면 이 테스트가 먼저 빨개진다.

### 4.5 측정

효과는 dotfiles-hhk3이 더하는 `scripts/codex-session-metrics.py`로 Worker 세션(originator `codex_exec`, Claude Worker 세션)의 세션당 단계 수·하네스 읽기 비율·활성 분을 적용 전후로 비교한다. 이 스펙의 인수 기준은 아니다.

## 5. 인수 기준

- spec_backed 첫 attempt 카드에 진입·push·인도·종료 보고·무인 대기 읽기 명령이, 재시작 attempt 카드에는 이어하기 명령이 추가로, quick_fix Worker 인계 카드에 착지·마무리·종료 보고·무인 대기 명령이 실린다. 각 명령의 헤딩은 설치된 파일에 존재한다.
- 헤딩이 없는 파일로 카드를 만들면 그 줄만 빠지고 나머지는 그대로다.
- `needs_handoff`가 아닌 재시작 attempt의 프롬프트에 이전 세션 마지막 메시지 문장이 실리고, Worker 세션 로그가 없으면 문장이 없다. 3,000자 초과 메시지는 뒤 3,000자와 생략 표시로 실린다. `needs_handoff` continuation은 `handoff_instructions`만 받고 새 문장을 받지 않는다(이전 모델 텍스트 1회 전달).
- `resumeHandoffBlock`의 출력 바이트는 변경 전과 같다.
- 기존 `stale_reference` 명령 문자열은 바뀌지 않는다.
- Claude·Codex 양 런타임 스냅샷이 같은 카드 절을 담는다.

## 6. Test scope

변경 전에 실패하는 seam(RED)은 카드 생성·렌더·메시지 전달 동작이다:

- `server/worker/attempt-facts.test.js`: route별 `stage_reads` 목록(spec_backed 첫 attempt 5항목, 재시작 시 이어하기 추가, quick_fix Worker 인계 4항목), 헤딩 부재 시 생략, 헤딩이 두 줄이면 생략, `stale_reference` 명령 문자열 불변. 변경 전에는 `stage_reads` 필드가 없어 실패한다.
- `server/worker/runner/preamble.test.js`: `stage_reads` 렌더와 안내 줄, 빈 목록 생략, 스냅샷 갱신. 변경 전에는 절이 렌더되지 않아 실패한다.
- `server/worker/scheduler.test.js`: `resumeAncestorFacts`의 `prior_final_message`(마지막 항목 선택, 3,000자 뒤쪽 잘림, 로그 부재 null), `resumePrompt` 문장 유무, `needs_handoff` continuation에서 문장 부재와 `handoff_instructions` 존재, `resumeHandoffBlock` 출력 불변. 변경 전에는 필드와 문장이 없어 실패한다.

보조 정합성 검사(변경 전에도 통과하며 RED seam이 아니다):

- `server/worker/attempt-facts.cross-runtime.test.js`(신규): 4.1 표의 헤딩이 dotfiles 소스 reference에 정확히 한 줄로 존재. dotfiles가 절 이름을 바꾸면 빨개진다.

실행: `npx vitest run --reporter=dot <위 파일들>`, 이어서 저장소 기본 검증.

## 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소 — 1단계 Codex 설정(컨텍스트 노트·도구 출력 한도·대기 값)과 측정 스크립트 | 없음 | dotfiles-hhk3 |
| 형제 | dotfiles | user_request | 다른 저장소 · 단계 분리 — 1·2단계 재측정이 전제인 Codex delta 축소 · spec-after-blocker | dotfiles-hhk3, UI-52uv | dotfiles-u86k |
| 형제 | beads-ui | user_request | 단계 분리 — 재측정 뒤 프리셋별 `-c` 오버라이드와 astra 프리셋 도입 · spec-after-blocker | dotfiles-hhk3, UI-52uv | UI-v12t |

- 관찰: dotfiles 쪽에 기계가 읽을 절 앵커(예: stage 카드 스크립트)를 두는 안 — 헤딩 이름 결합을 없애지만 두 저장소 변경이 필요하다. cross-runtime 테스트가 헤딩 변경을 잡는 동안은 보류.

## 결정 (ADR 후보)

- 전제: ADR 0012 — beads-ui는 dotfiles 계약 파일을 런타임에 읽지 않는다. 이 설계는 설치된 workflow 스킬 reference의 헤딩 존재만 확인하고 본문을 읽지 않으며, 계약과의 동등성은 cross-runtime 테스트가 확인한다.
- 전제: ADR 0050 — Worker가 dispatch 시점에 in_progress를 선점한다. 카드 생성 시점은 그대로다.
- 없음 — 카드 항목 추가와 재시작 문장 추가는 되돌리기 쉽고 맥락 없이 놀랍지 않다.
