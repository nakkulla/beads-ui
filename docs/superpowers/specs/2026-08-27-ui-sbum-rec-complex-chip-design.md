---
scope:
  - app/utils/rec-settings.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/detail-panel/index.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/lanes.js
  - server/worker/runnable-cache.js
  - app/protocol.md
  - app/styles.css
  - app/styles/base.css
---

# `복잡` chip — 추천 실행 설정(`rec_*`) 표시와 상세 적용 (UI-sbum)

Bead: `UI-sbum` (`route=spec_backed`). 선행: `dotfiles-li03` (closed) — 키 계약은 dotfiles `docs/superpowers/specs/2026-08-27-rec-exec-settings-design.md` §1·§5가 소유하며 이 spec은 그 소비자다.

## 배경

dotfiles 워크플로우는 Bead 생성·spec 게이트 마감 때 metadata에 `rec_orchestration_model`(enum `[fable]`), `rec_impl_runtime`(enum `[claude]`), `rec_reason`(`<signal>[+<signal>...]`, signal enum `contract_change|multi_repo|open_design_fork|multi_phase|claude_bound`)을 기록한다. 기본값과 같은 추천은 기록하지 않으므로 **`rec_orchestration_model`의 존재 자체가 "복잡한 작업" 판정**이다. beads-ui에는 이 키를 읽는 코드가 없어 추천이 어디에도 보이지 않는다(2026-08-27 확인: `dotfiles-u2n2`, `dotfiles-89v8`에 기록됨).

사용자 결정(2026-08-27): 추천 모델을 그대로 노출하지 않고 **복잡도 chip 하나**로 표시한다. 보드는 잘 쓰지 않으므로 Worker·Monitor 탭 카드에 표시하고, 적용은 이슈 상세에서만 한다.

## 결정

| 결정 | 값 |
| --- | --- |
| chip 종류 | `복잡`(`rec_orchestration_model=fable`), `claude`(`rec_impl_runtime=claude`만 있을 때). 둘 다 없으면 chip 없음 |
| 표시 위치 | Worker 탭 레인 카드, Monitor 탭 레인 카드 (표시 전용), 이슈 상세 헤더 (클릭 적용). 보드 카드 변경 없음 |
| 적용 동작 | 상세 chip 클릭 한 번에 추천된 키를 **모두** 권위 키에 복사. 부분 적용 없음(분리는 기존 핀 편집기) |
| 충돌 | 권위 키가 추천과 다르면 `confirm` 한 번 후 덮어쓰기. 이미 같으면 클릭 비활성 |
| `rec_*` 처리 | 적용 후에도 유지, unset 없음. `*_source` 키 도입 없음 |
| 쓰기 경로 | 새 WS 연산 없음. `orchestration_model`→`update-exec-settings`, `impl_runtime`→`update-impl-target` 재사용 |
| 전송 | runnable 행에 `rec` 필드 신설(`exec_pins`와 분리). 상세는 전체 metadata를 이미 받으므로 서버 변경 없음 |
| Worker 런타임 | `rec`/`rec_*`를 읽지 않음(불변, 테스트로 고정) |

## 1. 판정 유틸 — `app/utils/rec-settings.js` (신규)

DOM 없는 순수 모듈. `session-preferred.js`와 같은 fail-quiet 원칙: 잘못된 입력은 `null`/빈값, 절대 throw 없음.

```js
export const REC_REASONS = ['contract_change','multi_repo','open_design_fork','multi_phase','claude_bound'];
export const REC_LABELS = { complex: '복잡', claude: 'claude' };
/** @returns {{kind:'complex'|'claude', reasons:string[], rec:{orchestration_model?:'fable', impl_runtime?:'claude'}, state:'unapplied'|'applied'|'diverged'}|null} */
export function recSettings(metadata)
export function recTooltip(rec)   // 카드·상세 공용 title 문자열
```

- `kind`: `rec_orchestration_model==='fable'` → `complex`; 아니면서 `rec_impl_runtime==='claude'` → `claude`; 둘 다 아니면 `null`. enum 밖 값은 없는 것으로 취급.
- `reasons`: `rec_reason`을 `+`로 나누고 `REC_REASONS` 밖 토큰은 버린다. `rec_reason` 부재는 빈 배열(chip은 그대로 표시).
- `rec`: enum을 통과한 추천 키만 담는다.
- `state`: 추천된 키 각각을 같은 이름의 권위 키(`orchestration_model`, `impl_runtime`)와 비교. 권위 키가 모두 없음 → `unapplied`; 추천된 키가 전부 같음 → `applied`; 그 외(하나라도 다르거나 일부만 있음) → `diverged`.
- `recTooltip`: `추천 사유: contract_change, claude_bound` / `오케 fable · 런타임 claude` / `상태: 미적용|적용됨|추천과 다름` 세 줄. 사유 없으면 첫 줄 생략.

## 2. 전송 — `server/worker/runnable-cache.js` + `app/protocol.md`

`RunnableItem`에 `rec: { orchestration_model?: 'fable', impl_runtime?: 'claude', reason?: string }` 추가. 값은 §1과 같은 enum 검사를 서버에서 통과한 키만 싣고, 통과 키가 없으면 `rec: null`. `exec_pins`에는 넣지 않는다 — `exec_pins`는 "Worker가 적용하는 핀"이라 의미가 다르다.

`app/protocol.md` runnable 행 절(`exec_pins` 단락 옆)에 `rec` 필드 한 단락을 추가한다: 추천 전용, Worker 미소비, `exec_pins`와 분리.

서버 enum 목록은 `server/worker/exec-enums.js`에 `REC_SIGNALS`·`REC_VALUES`로 두고 클라이언트 `REC_REASONS`와 값이 같음을 양쪽 테스트가 단언한다(공유 모듈이 없으므로 테스트로 드리프트를 막는다).

## 3. 카드 표시 — Worker·Monitor 레인

- Worker: `app/views/worker/index.js` projection에 `rec: recSettings(...)`를 추가하되, 카드 항목은 `exec_pins`만 갖고 권위 키를 모르므로 `state` 계산에 `exec_pins.orchestration_model`·`exec_pins.impl_runtime`을 권위 값으로 넘긴다. `app/views/worker/lanes.js`에서 `session-preferred` chip(`worker-card__session-preferred`) 바로 옆에 `<span class="ctl-chip ctl-chip--label worker-card__rec" data-kind data-state title=${recTooltip(rec)}>`.
- Monitor: `app/views/monitor/lanes.js` `pinnedExecChips` 호출부(`entry.exec_pins`) 옆에 같은 chip. 같은 유틸·같은 클래스, 클릭 없음.
- 카드 chip은 표시 전용. 클릭 핸들러를 달지 않는다.

## 4. 상세 적용 — `effective-settings-view.js` + `detail-panel/index.js`

- `summaryHeaderTemplate`: `receipt` chip 뒤에 `<button class="detail-summary__chip detail-summary__chip--rec" data-kind data-state title=${recTooltip(rec)} ?disabled=${state==='applied'}>`. 라벨은 `REC_LABELS[kind]`.
- 클릭 → `onApplyRec(rec, state)`:
  1. `state==='diverged'`면 `window.confirm('추천 설정으로 덮어쓸까요? ...')`; 취소 시 아무것도 하지 않는다.
  2. `rec.orchestration_model`이 있으면 기존 `onExecChange('orchestration_model','fable')`.
  3. 그 readback 반영 후 `rec.impl_runtime`이 있으면 기존 `onImplTargetChange('impl_runtime','claude')` — `normalizeImplTarget`이 현재 `impl_model`/`impl_effort`와의 정합(예: codex 모델 핀)을 기존 규칙대로 정리한다.
  4. 순차 실행, 2단계 실패 시 3단계 진행 안 함. 오류 표시는 두 경로의 기존 처리 그대로.
- 부분 성공은 readback으로 chip `state`가 `diverged`로 재계산되므로 별도 상태 저장 없음.
- `rec_*`는 어떤 경로에서도 unset하지 않는다.

## 5. 스타일

`app/styles/base.css` `.ctl-chip--label` 계열에 `[data-kind='complex']`(강조 톤), `[data-kind='claude']`(중립 톤), `[data-state='applied']`(채움), `[data-state='diverged']`(점선 테두리) 4개 규칙. `app/styles.css` `.detail-summary__chip--rec`는 `--receipt`와 같은 크기, `button` 리셋, `:disabled`는 기본 커서. 새 색 토큰 없음.

## 6. 검증 (vitest colocated)

- `app/utils/rec-settings.test.js`: kind 판정, enum 밖 값 무시, `rec_reason` 파싱·필터, 3상태, 잘못된 입력 fail-quiet, `recTooltip` 문자열.
- `server/worker/runnable-cache.test.js`: `rec` projection — enum 통과 키만, 없으면 `null`, `exec_pins`에 `rec_*` 부재.
- `server/worker/exec-enums.test.js` + `rec-settings.test.js`: `REC_SIGNALS`/`REC_REASONS` 동일 단언.
- `app/views/detail-panel/effective-settings-view.test.js`: 헤더 chip 3상태 렌더, `applied` disabled, chip 없음 케이스.
- `app/views/detail-panel/index.test.js`(또는 기존 onExecChange 테스트 파일): `diverged`에서 confirm 취소 시 무전송, 승인 시 두 연산 순서, 첫 실패 시 두 번째 미전송.
- `app/views/worker/lanes.test.js`, `app/views/monitor/lanes.test.js`: chip 렌더·title·클릭 핸들러 없음.
- Worker 런타임 불변: `server/worker/policy.test.js`에 `rec`/`rec_*`가 결정에 영향 없음을 단언하는 케이스 1개.
- 실행: `npm test`, `npm run lint`.

## 구현 unit 후보

1. `utils+server`: `app/utils/rec-settings.js`, `server/worker/exec-enums.js`, `server/worker/runnable-cache.js`, `app/protocol.md`
2. `views`: Worker/Monitor 레인 chip, 상세 헤더 chip + `onApplyRec`, 스타일

## 경계·후속

- 세션 안 impl-entry 미리보기 줄과 `rec_*` 기록 규칙은 dotfiles 소유, 변경 없음.
- 관찰: 카드 chip 클릭으로 바로 적용 — 오터치 위험으로 채택하지 않음. 필요 시 별도 요청.
- 관찰: 보드 카드 chip — 보드를 잘 쓰지 않아 제외.
