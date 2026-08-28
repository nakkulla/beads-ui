---
scope:
  - app/utils/rec-settings.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/detail-panel/index.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/lanes.js
  - server/worker/runnable-cache.js
  - server/worker/exec-enums.js
  - app/protocol.md
  - app/styles.css
  - app/styles/base.css
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# `복잡` chip — 추천 실행 설정(`rec_*`) 표시와 상세 적용 (UI-sbum)

Bead: `UI-sbum` (`route=spec_backed`). 선행: `dotfiles-li03` (closed) — 키 계약은 dotfiles `docs/superpowers/specs/2026-08-27-rec-exec-settings-design.md` §1·§5가 소유하며 이 spec은 그 소비자다.

## 배경

dotfiles 워크플로우는 Bead 생성·spec 게이트 마감 때 metadata에 `rec_orchestration_model`(enum `[fable]`), `rec_impl_runtime`(enum `[claude]`), `rec_reason`(`<signal>[+<signal>...]`, signal enum `contract_change|multi_repo|open_design_fork|multi_phase|claude_bound`)을 기록한다. 기본값과 같은 추천은 기록하지 않으므로 **`rec_orchestration_model`의 존재 자체가 "복잡한 작업" 판정**이다. beads-ui에는 이 키를 읽는 코드가 없어 추천이 어디에도 보이지 않는다(2026-08-27 확인: `dotfiles-u2n2`, `dotfiles-89v8`에 기록됨).

사용자 결정(2026-08-27): 추천 모델을 그대로 노출하지 않고 **복잡도 chip 하나**로 표시한다. 보드는 잘 쓰지 않으므로 Worker·Monitor 탭 카드에 표시하고, 적용은 이슈 상세에서만 한다.

## 결정

| 결정 | 값 |
| --- | --- |
| chip 종류 | `복잡` 한 종류만. `rec_orchestration_model=fable`일 때 표시. `rec_impl_runtime`만 있는 Bead(`claude_bound` 단독)는 chip 없음 — 그 추천은 세션 impl-entry 미리보기(dotfiles 소유)가 담당 |
| 모델명 노출 | chip·툴팁·확인창 어디에도 모델/런타임 이름을 쓰지 않는다. 툴팁은 사유와 상태만 |
| 표시 위치 | Worker 탭 모든 레인 항목(후보·대기·실행·PR 대기·완료)과 Monitor 탭 레인 카드 (표시 전용), 이슈 상세 헤더 (클릭 적용). 보드 카드 변경 없음 |
| 적용 동작 | 상세 chip 클릭 한 번에 추천된 키를 **모두** 권위 키에 복사. 부분 적용 없음(분리는 기존 핀 편집기) |
| 충돌 | 권위 키가 추천과 다르면 `confirm` 한 번 후 덮어쓰기. 이미 같으면 클릭 비활성 |
| `rec_*` 처리 | 적용 후에도 유지, unset 없음. `*_source` 키 도입 없음 |
| 쓰기 경로 | 새 WS 연산 없음. `orchestration_model`→`update-exec-settings`, `impl_runtime`→`update-impl-target` 재사용. 두 클라이언트 핸들러의 반환 계약만 Promise로 정비(§4) |
| 전송 | Monitor용 runnable 행에 `rec` 필드 신설(`exec_pins`와 분리). Worker 탭은 `issue_by_id`의 전체 metadata를 이미 받고(`execRowsFor`와 같은 경로), 상세도 전체 metadata를 받으므로 둘 다 서버 변경 없음 |
| Worker 런타임 | `rec`/`rec_*`를 읽지 않음(불변, 테스트로 고정) |

**정정(UI-8x90).** `적용 동작`과 `충돌` 두 행은 폐기됐다. 상세 헤더 chip의 즉시
적용은 제거됐고, chip 클릭은 어느 표면에서나 **사유 팝업**이다 — 적용은 이슈
상세의 실행 설정 편집기에서 사용자가 수동으로 한다. `confirm`도 비활성 상태도
없다. `표시 위치` 행의 "이슈 상세 헤더 (클릭 적용)"는 "이슈 상세 헤더 (클릭
팝업)"로 읽는다. `모델명 노출`·`rec_*` 처리(unset 없음)·`Worker 런타임` 불변은
그대로다 (`2026-08-28-chip-grammar-unify-design.md` §2·§4.5·§5.1).

## 1. 판정 유틸 — `app/utils/rec-settings.js` (신규)

DOM 없는 순수 모듈. `session-preferred.js`와 같은 fail-quiet 원칙: 잘못된 입력은 `null`/빈값, 절대 throw 없음.

```js
export const REC_REASONS = ['contract_change','multi_repo','open_design_fork','multi_phase','claude_bound'];
export const REC_LABEL = '복잡';
/** @returns {{reasons:string[], rec:{orchestration_model:'fable', impl_runtime?:'claude'}, state:'unapplied'|'applied'|'diverged'}|null} */
export function recSettings(metadata, authority = metadata)
export function recTooltip(rec)   // 카드·상세 공용 title 문자열
```

- 존재 조건: `rec_orchestration_model==='fable'`일 때만 객체를 돌려주고, 아니면 `null`(chip 없음). `rec_impl_runtime==='claude'`는 있을 때 `rec`에 함께 담긴다. enum 밖 값은 없는 것으로 취급.
- `reasons`: `rec_reason`을 `+`로 나누고 `REC_REASONS` 밖 토큰은 버린다. `rec_reason` 부재는 빈 배열(chip은 그대로 표시).
- `authority`: 권위 키를 읽을 객체. 상세·Worker는 metadata 그대로, Monitor는 `exec_pins`를 넘긴다.
- `state`: `rec`의 키 각각을 같은 이름의 권위 키(`orchestration_model`, `impl_runtime`)와 비교. 권위 키가 모두 없음 → `unapplied`; `rec`의 키가 전부 같음 → `applied`; 그 외(하나라도 다르거나 일부만 있음) → `diverged`.
- `recTooltip`: `복잡한 작업으로 판정됨` / `사유: contract_change, claude_bound` / `상태: 미적용|적용됨|추천과 다름`. 사유 없으면 둘째 줄 생략. 모델·런타임 이름은 쓰지 않는다.

## 2. 전송 (Monitor용) — `server/worker/runnable-cache.js` + `app/protocol.md`

Monitor 레인은 runnable 행(`entry.exec_pins`)만 받으므로 `RunnableItem`에 `rec: { rec_orchestration_model: 'fable', rec_impl_runtime?: 'claude', rec_reason?: string }` 추가 — metadata의 키 이름을 그대로 유지해 클라이언트가 `recSettings(entry.rec, entry.exec_pins)`로 별도 변환 없이 읽는다. 값은 §1과 같은 enum 검사를 서버에서 통과한 키만 싣고, `rec_orchestration_model`이 enum을 통과하지 못하면 `rec: null`. `exec_pins`에는 넣지 않는다 — `exec_pins`는 "Worker가 적용하는 핀"이라 의미가 다르다.

`app/protocol.md` runnable 행 절(`exec_pins` 단락 옆)에 `rec` 필드 한 단락을 추가한다: 추천 전용, Worker 미소비, `exec_pins`와 분리.

서버 enum 목록은 `server/worker/exec-enums.js`에 `REC_SIGNALS`·`REC_VALUES`로 두고 클라이언트 `REC_REASONS`와 값이 같음을 양쪽 테스트가 단언한다(공유 모듈이 없으므로 테스트로 드리프트를 막는다).

## 3. 카드 표시 — Worker·Monitor 레인

- Worker: `app/views/worker/index.js`에 `beadExecChips`와 같은 꼴의 `beadRec(bead_id)`(Map 캐시)를 두고 `issue_by_id.get(bead_id).metadata`로 `recSettings(metadata)`를 계산한다 — `execRowsFor`가 이미 쓰는 전체-metadata 경로라 서버 변경이 없다. `issue_by_id`에 없는 Bead는 `null`(chip 없음). 이 값을 모든 레인 항목 projection(후보 `candidateCard`, 대기·PR 대기·완료 `miniRow`, 실행 attempt 타일)에 `rec` 필드로 넣고, `app/views/worker/lanes.js`의 세 렌더러 각각에서 `exec_chips` 슬롯 바로 뒤(후보 카드는 `session-preferred` chip 옆)에 `<span class="ctl-chip ctl-chip--label worker-card__rec" data-state title=${recTooltip(rec)}>복잡</span>`을 그린다.
- Monitor: `app/views/monitor/lanes.js` `pinnedExecChips` 호출부에서 `recSettings(entry.rec, entry.exec_pins)`로 같은 chip. 같은 유틸·같은 클래스, 클릭 없음.
- 카드 chip은 표시 전용. 클릭 핸들러를 달지 않는다.

**정정(UI-8x90).** 카드 chip도 클릭된다. 네 판정 칩(`복잡`·`세션 권장`·
`worker-ineligible`·`리뷰`)은 그려지는 모든 표면에서 `<button class="ctl-chip …
judgement-chip" data-chip-key aria-expanded>`이고, 클릭하면 그 칩이 선 줄 바로
아래에 사유 팝업(`.chip-popover`)이 열린다. 자리와 `data-state` 시각 상태는 이
절이 정한 그대로이고, `title` 툴팁도 유지된다 — 바뀐 것은 사유를 툴팁 없이도
읽을 수 있게 된 것뿐이다. 상태를 쓰는 클릭은 여전히 어느 카드에도 없다
(`2026-08-28-chip-grammar-unify-design.md` §4.5).

## 4. 상세 적용 — `effective-settings-view.js` + `detail-panel/index.js`

- `summaryHeaderTemplate`: `receipt` chip 뒤에 `<button class="detail-summary__chip detail-summary__chip--rec" data-state title=${recTooltip(rec)} ?disabled=${state==='applied'}>복잡</button>`.
- 핸들러 반환 계약 변경(`app/views/detail-panel/index.js`): 현재 `onExecChange`는 낙관적 `exec_local` 갱신 후 transport 결과를 버리고(`void`), 실패 시 `exec_local`을 복구하지 않으며 Promise를 돌려주지 않는다. 두 핸들러를 `Promise<void>`를 돌려주도록 바꾼다 — 서버 응답(readback issue)이 반영된 뒤 resolve; 실패 시 해당 키의 `exec_local` 이전 값을 복구·재렌더·기존 토스트 후 reject. `onImplTargetChange`는 이미 `previous` 복구 로직이 있으므로 반환값만 Promise로 맞춘다. 기존 호출부(편집기 `onEdit`)는 반환값을 무시하므로 동작 불변.
- 클릭 → `onApplyRec(rec, state)`:
  1. `state==='diverged'`면 `window.confirm('추천 실행 설정을 적용할까요? 현재 수동 설정을 덮어씁니다.')`; 취소 시 아무것도 하지 않는다.
  2. `await onExecChange('orchestration_model', rec.orchestration_model)`.
  3. 성공 후 `rec.impl_runtime`이 있으면 `await onImplTargetChange('impl_runtime', rec.impl_runtime)` — `normalizeImplTarget`이 현재 `impl_model`/`impl_effort`와의 정합(예: codex 모델 핀)을 기존 규칙대로 정리한다.
  4. 2단계 reject 시 3단계 진행 안 함. 오류 표시는 두 경로의 기존 토스트 그대로.
- 부분 성공은 readback으로 chip `state`가 `diverged`로 재계산되므로 별도 상태 저장 없음.
- `rec_*`는 어떤 경로에서도 unset하지 않는다.

**정정(UI-8x90).** 이 절의 적용 경로는 제거됐다. `onApplyRec`와 `?disabled`와
`confirm`이 사라지고, `summaryHeaderTemplate`의 chip은 카드와 같은
`judgement-chip` 버튼(`data-chip-key="rec"`)이 되어 클릭하면 같은 사유 팝업을
연다 — 헤더는 이제 어떤 metadata도 쓰지 않는다. 한 번 클릭의 편의 대신 칩 클릭
의미의 단일성과 모바일 오터치 방지를 택한 결정이다. **`onExecChange`/
`onImplTargetChange`의 `Promise` 반환 계약(위 두 번째 항목)은 그대로 남는다** —
실행 설정 편집기가 그 계약을 쓴다. `rec_*`를 unset하지 않는다는 규칙도 그대로다
(`2026-08-28-chip-grammar-unify-design.md` §5.1).

## 5. 스타일

`app/styles/base.css` `.ctl-chip--label` 계열에 `.worker-card__rec`(강조 톤), `[data-state='applied']`(채움), `[data-state='diverged']`(점선 테두리) 3개 규칙. `app/styles.css` `.detail-summary__chip--rec`는 `--receipt`와 같은 크기, `button` 리셋, `:disabled`는 기본 커서. 새 색 토큰 없음.

## 6. 검증 (vitest colocated)

- `app/utils/rec-settings.test.js`: 존재 조건(`rec_impl_runtime`만 → `null`), enum 밖 값 무시, `rec_reason` 파싱·필터, `authority` 분리 인자와 3상태, 잘못된 입력 fail-quiet, `recTooltip`에 모델명 부재.
- `server/worker/runnable-cache.test.js`: `rec` projection — enum 통과 키만, 없으면 `null`, `exec_pins`에 `rec_*` 부재.
- `server/worker/exec-enums.test.js` + `rec-settings.test.js`: `REC_SIGNALS`/`REC_REASONS` 동일 단언.
- `app/views/detail-panel/effective-settings-view.test.js`: 헤더 chip 3상태 렌더, `applied` disabled, chip 없음 케이스.
- `app/views/detail-panel/index.test.js`(또는 기존 onExecChange 테스트 파일): `onExecChange` 실패 시 `exec_local` 복구·reject, 성공 시 resolve; `diverged`에서 confirm 취소 시 무전송, 승인 시 두 연산 순서, 첫 실패 시 두 번째 미전송.
- `app/views/worker/index.test.js`: `beadRec` — `issue_by_id` 미존재 시 `null`, 세 레인 항목 projection에 `rec` 전달.
- `app/views/worker/lanes.test.js`(`miniRow`·`candidateCard`·실행 타일), `app/views/monitor/lanes.test.js`: chip 렌더·title·클릭 핸들러 없음.
- Worker 런타임 불변: `server/worker/policy.test.js`에 `rec`/`rec_*`가 결정에 영향 없음을 단언하는 케이스 1개.
- 실행: AGENTS.md Pre-Handoff Validation 전체 — `npm run tsc`, `npm run lint`, `npm test`, `npm run prettier:write`, 프런트엔드 소스 변경이므로 `npm run build` 후 갱신된 `app/main.bundle.js`·`app/main.bundle.js.map`을 같은 PR에 포함.

## 구현 unit 후보

1. `utils+server`: `app/utils/rec-settings.js`, `server/worker/exec-enums.js`, `server/worker/runnable-cache.js`, `app/protocol.md`
2. `views`: Worker(`beadRec` + 세 렌더러)/Monitor 레인 chip, 상세 핸들러 Promise 계약 + 헤더 chip + `onApplyRec`, 스타일, `npm run build` 산출물

## 경계·후속

- 세션 안 impl-entry 미리보기 줄과 `rec_*` 기록 규칙은 dotfiles 소유, 변경 없음.
- 관찰: 카드 chip 클릭으로 바로 적용 — 오터치 위험으로 채택하지 않음. 필요 시 별도 요청.
- 관찰: 보드 카드 chip — 보드를 잘 쓰지 않아 제외.
- 관찰: `rec_impl_runtime`만 있는 Bead(`claude_bound` 단독)는 UI에 표시하지 않음 — 세션 impl-entry 미리보기가 담당(dotfiles 소유).
