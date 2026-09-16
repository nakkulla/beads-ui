---
scope:
  - app/views/monitor/deck.js
  - app/views/monitor/deck.test.js
  - app/views/monitor/bulk-preset-apply.js
  - app/views/monitor/bulk-preset-apply.test.js
  - app/views/settings-dialog/session-model.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-23-monitor-redesign-design.md
  - docs/adr/
---

# 모니터 ⚙ 패널에서 선택한 여러 저장소에 실행 프리셋을 한 번에 적용한다

## 문서 상태

- Bead: `UI-8ncz`
- 경로: `spec_backed`; beads-ui 안에서 하나의 구현·검증·인도 묶음으로 처리한다.
- 기준: `main` / `aa4107ac2d2d0bb5b8777c52073f8f953ecbd772`
- 상태: 사용자 검토용 완성 초안. 스펙 게이트 승인 전이다.
- 사용자 결정(2026-09-16): (1) 적용 요청은 클라이언트가 저장소별로 기존
  `apply-impl-preset-global`을 순차 호출한다. 서버 다중 저장소 op는 만들지 않는다.
  (2) 조작은 모니터 덱의 `⚙` 저장소 설정 패널 안 한 절에 둔다. 덱 합계 줄의 별도
  진입점은 만들지 않는다. (3) 기본 선택은 자동화가 켜진 저장소다(2026-09-16
  "활성화되어 있는 레포").

## 1. 문제와 확인한 사실

모니터 덱의 `⚙`(`app/views/monitor/deck.js` `openPanel`)은 저장소 하나의
`root_dir`로 실행 pane(`app/views/settings-dialog/execution-pane.js`)을 마운트하고,
pane의 프리셋 바 `[프리셋 선택] [적용]`은 그 저장소에만 `apply-impl-preset-global`을
보낸다. 자동화가 켜진 저장소가 여럿이면 같은 프리셋을 저장소마다 `⚙`을 열어
적용해야 한다.

확인한 사실은 다음과 같다.

- `apply-impl-preset-global` payload는 `{ preset_id, expected_revision,
  expected_queue_revision, root_dir? }`이며 `root_dir`이 있으면 kv·큐 모두 그
  저장소에 쓴다(UI-eey2 §9.5). 응답은 `{ applied, conflict, revision, values,
  warnings, queue_applied, queue_conflict, queue }`다. kv 먼저 큐 나중의 비원자성과
  `queue_applied:false` 부분 적용은 기존 계약이다(UI-7yh2 §5).
- 모니터의 `workspaces_state` 행(`server/ws/monitor-handlers.js`
  `buildMonitorWorkspacesState`)은 보이는 저장소마다 `root_dir`·`name`·
  `auto_advance`·`revision`·오케스트레이션 6키·`session_defaults`를 실어 온다. 덱은
  이 행을 `workspacesState()`로 읽고 mutation 응답의 `queue`를 `adopted`에 덮어
  최신 revision을 유지한다(`mergeQueue`·`pruneAdopted`).
- 프리셋 목록은 서버 전역(`server/exec-preset-store.js`)이고 `compatible`·
  `incompatibility_reason` 판정은 설치된 카탈로그 기준이라 저장소마다 갈리지
  않는다(`exec-preset-coordinator.js`). 비호환 프리셋의 적용은 서버가
  `impl_preset_incompatible`로 거절한다.
- 구 서버 capability 판정은 큐 스냅샷에 `quick_fix_orchestration_model` 키가
  있는지다(UI-7yh2 결정 6). 모니터 행은 이 키를 값이 `null`이어도 항상 싣는다.
- 서버에는 보이는 모든 저장소를 순회해 `{ on, applied, failed[] }`로 답하는
  `monitor-auto-toggle` 선례가 있다. 이 설계는 그 형태를 택하지 않는다(§2).

## 2. 검토한 접근과 선택

1. **클라이언트가 선택한 저장소마다 기존 op를 순차 호출하고 저장소별 결과를 패널
   안에 모아 보인다**를 선택한다. 서버·프로토콜을 바꾸지 않고, 저장소별 revision은
   모니터 행이 이미 알고 있으며, 큐 쪽 1회 재시도도 pane의 규칙(저장소를 지정한
   적용에서 `queue_applied:false`면 충돌 여부와 무관하게 응답 revision으로 한 번
   재시도)을 그대로 쓴다.
2. 서버에 `apply-impl-preset-workspaces` 같은 다중 저장소 op를 두면 요청·푸시가
   한 번이지만, 200줄 안팎의 기존 핸들러에서 적용 핵심을 함수로 뽑는 서버
   리팩터링과 프로토콜 문서 갱신이 필요하다. 부분 실패 보고 형식도 새로 정해야
   한다.
3. 덱 합계 줄에 별도 `일괄 적용` 버튼을 두는 안은 `⚙`과 다른 진입점을 하나 더
   만든다. 사용자는 "모니터에서 설정을 하는 경우"의 한 조작으로 요구했다.

선택 1의 대가는 저장소 수만큼의 요청과 모니터 재빌드 푸시다. 서버 푸시는
`schedulePush`가 합치고, 대상은 보이는 저장소 수를 넘지 않는다.

## 3. 화면

`⚙` 패널의 구조는 머리(제목 · `[워커|세션|계정]` 세그먼트 · 닫기) → **여러 저장소에
적용 절** → pane 몸체다. 절은 `.mon2-deck__bulk` 한 컨테이너이며 pane의 DOM 안이
아니라 `panel_el`의 머리와 몸체 사이에 덱이 직접 그린다(lit 호스트 하나).

```text
┌ dotfiles 실행 설정        [워커|세션|계정]                          ✕ ┐
│ 여러 저장소에 적용   [실행 프리셋…      ▾]  [선택 3곳에 적용]             │
│ ☑ dotfiles  ☑ beads-ui  ☑ prostate  ☐ Cortex  ☐ ops   (자동화 켜짐 = 기본 선택) │
│ ── 결과 ──────────────────────────────────────────────────────────── │
│ ✓ dotfiles 적용됨 · ✓ beads-ui 적용됨 · ⚠ prostate 부분 적용 — 오케스트레이션 값 미적용 │
│ [실패·부분 적용 저장소만 다시 적용]                                   │
├──────────────────────────────────────────────────────────────────────┤
│ (pane 몸체: 프리셋 바 · 작업 진행 · 구현 · Quick fix · 리뷰 …)             │
```

- **프리셋 선택**은 절 자체의 `<select>`다. pane의 프리셋 바와 같은
  `implPresetStore` 목록을 읽되 pane의 선택 상태를 공유하지 않는다 — pane은 열린
  저장소 한 곳의 편집기이고 이 절은 여러 저장소의 조작이라 소유자가 다르다.
  `compatible === false`인 프리셋은 option을 비활성으로 두고 `title`에
  `incompatibility_reason`을 단다.
- **저장소 체크박스**는 `<fieldset>`(`legend` "적용 대상")에 보이는 저장소를 덱의
  행 순서로 나열한다. 라벨은 `name`, `title`은 `root_dir`. 초기 선택은
  `auto_advance === true`인 행이며, 지금 `⚙`을 연 저장소가 자동화가 꺼져 있으면
  선택되지 않은 채로 목록에 있다. 선택은 패널이 열려 있는 동안만 유지하고
  기억하지 않는다. 행이 사라지면 선택에서도 빠진다.
- **적용 버튼**은 `.op-btn .op-btn--primary`이고 라벨은 `선택 n곳에 적용`이다.
  다음 중 하나면 비활성이고 `title`이 이유를 말한다: 프리셋 미선택, 선택 저장소
  0곳, 선택 프리셋 비호환, 구 서버(어느 행에도 `quick_fix_orchestration_model`
  키가 없음 → pane과 같은 문구 `서버가 quick_fix 값을 받지 않습니다`), 실행 중.
- **결과 줄**은 실행 뒤에만 그린다(재료 없으면 없음). 저장소마다 한 항목:
  `✓ <name> 적용됨` · `⚠ <name> 부분 적용 — 오케스트레이션 값 미적용` ·
  `✕ <name> 실패 — <문장>` · `– <name> 미실행`. 실패·부분 적용이 하나라도 있으면
  `[실패·부분 적용 저장소만 다시 적용]` 버튼이 선택을 그 집합으로 바꾼다. 새
  실행이 시작되면 이전 결과 줄은 지운다.
- 폭 640px 이하에서는 프리셋 select와 버튼이 두 줄로, 체크박스는 줄바꿈된다.
  가로 넘침이 없어야 한다. 색·서체는 `.settings-dialog__*`·`.op-btn` 토큰이고 새
  색은 없다. 이 패널은 카드가 아니므로 ADR 0014 슬롯 표(워커·모니터 카드)의 대상이
  아니다.

## 4. 적용 흐름

새 모듈 `app/views/monitor/bulk-preset-apply.js`가 계획과 실행을 소유하고 덱은
렌더·전송·채택만 넘긴다.

- `planBulkApply({ rows, selected_roots, preset_state, preset_id })` → 저장소별
  payload 목록(덱 행 순서)과 비활성 사유. payload는 `{ preset_id,
  expected_revision: preset_state.revision, expected_queue_revision:
  row.revision, root_dir }`이며 `row`는 `adopted`를 덮은 최신 행이다.
- `runBulkApply({ targets, send, adopt, onProgress })`는 대상을 **순차**로 처리한다.
  병렬로 보내면 서버의 kv 쓰기·모니터 재빌드가 뒤섞이고 프리셋 revision 충돌을
  뒤늦게 발견한다.
  1. 응답 `queue`가 있으면 즉시 `adopt(root_dir, queue)`한다 — 성공·실패 무관.
     덱 타일의 칩과 다음 대상의 revision이 최신이 된다.
  2. `applied:true`·`queue_applied:true` → `applied`.
  3. `queue_applied:false`(충돌 여부 무관)이면 응답 `queue.revision`으로 같은
     저장소를 **한 번** 다시 보낸다 — pane `onApplyPresetGlobally`가 저장소를
     지정했을 때 하는 것과 같은 1회 재시도다. 서버는 kv를 쓰기 전 큐
     CAS(`clearAppliedExecPreset`)가 충돌하면 `applied:false, queue_applied:false,
     queue_conflict:true`로 아무것도 쓰지 않은 채 답하고, kv를 쓴 뒤 큐 쓰기가
     실패하면 `applied:true, queue_applied:false`로 답하므로 이 단계의 첫 응답은
     `applied` 값이 갈린다.
  4. 재시도까지 끝난 **마지막 응답**으로 판정한다: `applied:true`·
     `queue_applied:true` → `applied`; `applied:true`·`queue_applied:false` →
     `partial`(kv만 반영); `applied:false`·`conflict:false` → `failed: 큐가 방금
     변경되었습니다`(아무것도 쓰지 않음). `partial`은 kv 반영이 응답으로 확인된
     경우에만 쓴다.
  5. `applied:false`·`conflict:true`(프리셋 revision 충돌) → 이 저장소는 `failed:
     프리셋이 방금 변경되었습니다`, **남은 대상은 모두 `skipped`**로 두고 실행을
     멈춘다. 바뀐 프리셋을 다시 읽은 뒤 사용자가 다시 적용한다.
  6. 전송 예외·`error` 응답 → `failed: <message>`, 다음 대상으로 계속한다.
- 실행 중에는 절의 모든 입력을 비활성으로 두고 버튼 라벨을 `적용 중 k/n`으로
  바꾼다. 패널을 닫거나 다른 `⚙`을 열면 진행 중인 실행은 남은 대상을 보내지 않고
  끝낸다(이미 보낸 요청의 결과는 `adopt`만 한다).
- 열린 pane의 저장소가 대상에 포함됐으면 실행이 끝난 뒤 `pane.load()`를 한 번
  불러 세션 기본값 baseline을 다시 읽는다. pane의 큐 값은 `queue()`가 `adopted`를
  읽으므로 따로 처리하지 않는다.
- 저장소별 성공 판정은 응답 필드로만 한다. 별도 readback 요청을 추가하지 않는다
  — 서버가 kv readback을 이미 수행하고(`bd_readback_failed`는 오류 응답), 큐는
  응답이 권위다.

## 5. 서버·프로토콜

바꾸지 않는다. `apply-impl-preset-global`의 payload·응답·CAS·비원자성·캐시
무효화·fanout은 현행 그대로다. 저장소 수만큼의 요청이 순차로 들어오며 각 요청이
그 저장소의 `session_defaults` 캐시를 무효화하고 모니터 재빌드를 예약한다.
`app/protocol.md`는 고치지 않는다.

## 6. 정본 반영

`2026-08-23-monitor-redesign-design.md` §4.4 끝에 다음 정정을 덧붙인다.

> 정정(UI-8ncz). `⚙` 패널의 머리와 pane 몸체 사이에 `여러 저장소에 적용` 절이
> 선다. 절은 덱이 그리고(`bulk-preset-apply.js`), 프리셋 select·보이는 저장소
> 체크박스(기본 선택: 자동화 켜짐)·적용 버튼·저장소별 결과를 담는다. 적용은
> 클라이언트가 저장소마다 `apply-impl-preset-global`을 순차 호출하며 서버 op는
> 그대로다.

## 7. 테스트 범위와 인도 조건

RED-GREEN 전용 seam은 승인하지 않는다. 아래 행위 검증과 저장소 필수 검증을
수행한다.

| 검증 경계 | 수락 조건 |
| --- | --- |
| 계획 | 기본 선택 = `auto_advance:true` 행; 열린 저장소가 자동화 꺼짐이면 미선택 상태로 목록에 있음; payload가 덱 행 순서·저장소별 `revision`(`adopted` 우선)·프리셋 `revision`을 실음; 프리셋 미선택·0곳·비호환·구 서버·실행 중이면 비활성과 사유 |
| 순차 실행 | 대상 n곳에 요청이 순서대로 1회씩; 각 응답 `queue`가 `adopt`로 전달; 성공은 `applied` |
| 큐 재시도·판정 | `queue_applied:false`(충돌 여부 무관)에서 응답 revision으로 같은 저장소 1회 재시도, 추가 요청 없음; 마지막 응답이 `applied:true`·`queue_applied:false`면 `partial`, `applied:false`·`queue_conflict:true`(kv 쓰기 전 CAS 충돌)가 두 번이면 `failed`이고 `partial`이 아님 |
| 프리셋 충돌 | `conflict:true`에서 그 저장소 `failed`, 이후 대상 `skipped`, 추가 요청 0회 |
| 예외 | 전송 예외·오류 응답은 그 저장소만 `failed`, 다음 대상 계속 |
| 결과 표시 | 저장소별 네 상태 문구; 실패·부분 적용이 있을 때만 재적용 버튼이 그 집합을 선택; 새 실행 시작에 이전 결과 제거; 실행 중 입력 비활성·`적용 중 k/n` |
| 패널 수명 | 닫기·다른 `⚙` 열기 뒤 남은 대상 요청 0회; 열린 저장소가 대상이면 완료 후 `pane.load()` 1회 |
| 접근성·폭 | `fieldset`/`legend`·체크박스 라벨·비활성 `title`; 640px 이하 줄바꿈과 가로 넘침 없음 |

기존 테스트를 확장한다: monitor/deck. 새 모듈 테스트: bulk-preset-apply. 인도 전
Node engines 확인, 자체 의존성 설치 후 `npm run tsc`, `npm run lint`, 변경 파일
Prettier, `npx vitest run --reporter=dot`(120초 상한)를 수행한다. `npm run build`
뒤 실제 브라우저에서 저장소 두 곳 이상을 선택해 적용하고 덱 칩·각 저장소 `⚙`
pane의 값이 프리셋과 같아졌는지, 부분 적용·재적용 흐름을 375px·1280px에서
확인한다. 구현 PR 인도와 공유 서비스 배포 확인은 저장소의 기존 절차를 따른다.

## 결정 (ADR 후보)

- 전제: ADR UI-00lf — 실행 프리셋은 25키 단일 전역 적용이고 `workflow_mode`는
  프리셋 밖이다; 이 설계는 그 적용을 저장소 수만큼 반복할 뿐 키·의미를 바꾸지
  않는다.
- 전제: ADR 0011 — 자동화·자동 머지는 프리셋 밖의 독립 축이며 이 절은 그 값을
  읽기(기본 선택)만 하고 쓰지 않는다.
- 전제: ADR 0014 — `⚙` 패널은 카드가 아니라 슬롯 표 대상이 아니다.
- 다중 저장소 적용을 서버 op 없이 클라이언트의 순차 단일 적용으로 구성: 되돌림
  비용 낮음(클라이언트 모듈 하나, 저장 형식·프로토콜 변경 없음), 배경 없이 의외
  아님(각 저장소가 단일 적용과 같은 결과·같은 실패 문구를 얻음), 실재 대안
  있음(서버 다중 op). 프로토콜에 남는 것이 없어 별도 ADR로 만들지
  않는다 → ADR 아님

## 경계·후속

다른 저장소에서 구현할 필수 작업과 별도 형제 Bead는 없다. 서버 핸들러·프로토콜·
프리셋 저장 형식·pane의 프리셋 바·자동화 토글·카드 슬롯을 바꾸지 않는다.

- 관찰: 선택 저장소 집합의 기억(localStorage) — 기본 선택이 자동화 상태에서
  나오므로 지금은 필요가 확인되지 않아 만들지 않는다.
- 관찰: 서버 다중 저장소 op — 요청 1회·푸시 1회가 필요해지는 저장소 수가
  관측되면 그때 별도 설계한다.
