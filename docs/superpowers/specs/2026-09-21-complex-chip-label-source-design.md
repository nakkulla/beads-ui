---
scope:
  - app/utils/rec-settings.js
  - app/utils/complex-judgement.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/workspace-adapter.js
  - app/views/detail-panel/effective-settings-view.js
  - app/protocol.md
  - app/styles/base.css
  - app/styles.css
  - server/worker/runnable-cache.js
  - server/worker/exec-enums.js
  - server/worker/pr-actions.js
  - server/worker/policy.test.js
---

# 복잡 칩 재료를 `complex` 라벨 + `complex_reason`으로 전환하고 `rec` 전송 필드·`REC_VALUES`·3상태 툴팁을 제거

Bead: `UI-7nhi` (`route=spec_backed`). 선행(`blocks` 셋): `dotfiles-23ev` — 키·라벨 계약은 dotfiles
`docs/superpowers/specs/2026-09-21-complex-label-replaces-rec-keys-design.md` §1이 소유하며 이 spec은 그
소비자다(ADR 0012); `UI-mfm1` — 후보 행 사실 키 집합(`CandidateFacts`)과 서버 행의 판정 키 추가를 소유하며
이 spec은 그 착지 뒤 그 집합에서 `rec`를 지우고 `complex_reason`을 더한다(§2); `UI-p7s2` — `bead_overlay`의
`labels?` 필드를 소유하며 그 착지(`26b0d1841636bc29cf02978190c2e36c47a97fc8`)가 다섯 열 모두에서 라벨을 싣는다; 이 spec은
그 필드를 읽기만 한다(§3). 전신: `2026-08-27-ui-sbum-rec-complex-chip-design.md`(UI-sbum), 칩 클릭 의미는
`2026-08-28-chip-grammar-unify-design.md`(UI-8x90 §4.5).

## 배경

dotfiles-23ev가 `rec_orchestration_model`·`rec_reason`을 은퇴시키고 복잡 판정을 라벨 `complex` +
metadata `complex_reason=<signal>[+…]`(신호 `hard_diagnosis|invariant_reasoning|verification_by_judgment`)로
바꾼다. `rec_impl_runtime=claude`는 남지만 beads-ui는 그 값을 칩에 쓰지 않는다. 지금 beads-ui의 복잡 칩은
세 표면에서 `rec_orchestration_model`의 존재로 서고, 권위 키(`orchestration_model`/`impl_runtime`)와의
비교로 툴팁에 `상태: 미적용|적용됨|추천과 다름`을 말한다.

- Worker 탭: `bead_overlay.metadata` → `lane-model.js` `item.rec = recSettings(metadata)`.
- Monitor 탭: 서버 `runnable-cache.js` `recOf(meta)` → 행의 `rec` 필드 → `recSettings(entry.rec, entry.exec_pins)`.
- 이슈 상세 헤더: `effective-settings-view.js` `recSettings(metadata)`.

계약 착지 뒤 이 재료는 사라진다(fail-quiet로 칩만 비게 된다). 판정에 모델명이 없어졌으므로 "적용됨/추천과
다름" 상태도 비교할 대상이 없다 — 적용은 사용자가 실행 프리셋을 고르는 수동 조작이고 칩은 그 판단의 힌트다.

## 결정

| 결정           | 값                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 판정 유틸      | `app/utils/rec-settings.js`를 삭제하고 `app/utils/complex-judgement.js`를 신설한다. `session-preferred.js`와 같은 꼴: `complexReason(labels, metadata)` → 라벨 `complex`가 있고 `complex_reason`의 신호가 하나 이상 enum 안이면 그 신호 문자열(enum 밖 토큰 제거·`+` 재결합), 아니면 `''`                                                                                                                                                                                                                                                  |
| 칩 재료        | 세 표면 모두 문자열 `complex_reason` 하나. 비어 있지 않으면 칩이 선다. 3상태(`state`)·`data-state`·권위 키 비교는 삭제                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 툴팁·팝업      | `복잡한 작업으로 판정됨` / `사유: <문장> · <문장>`. 상태 줄 없음. 문장 사전은 신호 3개(`claude_bound` 항목 삭제). 모델·런타임 이름은 여전히 쓰지 않는다                                                                                                                                                                                                                                                                                                                                                                                    |
| 슬롯·클릭      | 자리는 지금 그대로다 — 후보 카드는 머리줄 슬롯 1(`세션 권장` 칩 옆, `lanes.js` `candidateCard`), 대기·PR 대기·완료 행과 실행 타일은 기존 슬롯 5, 상세 헤더는 `receipt` 칩 뒤(UI-8x90 §4.5, UI-sbum §3). 클릭 의미(사유 팝업, 상태 쓰기 없음)도 그대로. `data-chip-key`는 `rec` → `complex`                                                                                                                                                                                                                                                 |
| Worker 탭 원천 | `bead_overlay`의 `labels?` 필드는 UI-p7s2가 도입했고(그 §6), 착지한 `add(issue, with_metadata)`는 `with_metadata` 여부와 무관하게 다섯 열 모두에서 `labels`를 싣는다(재검토 correction: 원천 확장은 이미 착지, 이 spec의 어댑터 변경 없음). `lane-model.js`는 `item.rec` 자리에서 `item.complex_reason = complexReason(overlay.labels, overlay.metadata)`                                                                                                                                                                                  |
| Monitor 원천   | UI-mfm1이 정한 `CandidateFacts`(그 §3.1)에 서버 추가 키로 `complex_reason?: string`을 더하고, 어댑터 `runnableRows()`의 `rec: null`과 서버 `qualify()`의 `rec`를 지운다(착지한 typedef에는 `rec`가 없다 — 재검토 correction)(`qualify()`가 `complexReason(row.labels, meta)`; 빈 값이면 키 없음, `spec_after_blocker`와 같은 fail-quiet). `recOf`·`REC_VALUES`·`REC_SIGNALS`는 삭제. 서버는 `app/utils/complex-judgement.js`를 import한다(이미 `app/utils/worker-eligibility.js`를 import하는 경로) — enum 사본과 동일성 테스트가 사라진다 |
| 상세 헤더      | `summaryHeaderTemplate(data)`가 `data.labels`와 `data.metadata`로 `complexReason`을 계산. 이슈 레코드에 `labels`가 없으면 칩 없음                                                                                                                                                                                                                                                                                                                                                                                                          |
| 구 키          | `rec_orchestration_model`·`rec_reason`·`rec_impl_runtime`을 읽는 경로를 남기지 않는다(전환기 이중 읽기 없음). 계약 착지~이 Bead 착지 사이의 칩 공백은 사용자가 허용했다(dotfiles 스펙 §7)                                                                                                                                                                                                                                                                                                                                                  |
| Worker 런타임  | 판정을 읽지 않는 불변은 유지하고 테스트를 새 재료로 옮긴다                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## 1. 판정 유틸 — `app/utils/complex-judgement.js` (신규, `rec-settings.js` 삭제)

```js
export const COMPLEX_LABEL = 'complex';
export const COMPLEX_REASONS = ['hard_diagnosis', 'invariant_reasoning', 'verification_by_judgment'];
export const COMPLEX_CHIP_LABEL = '복잡';
export const COMPLEX_REASON_TEXT = {
  hard_diagnosis: '원인이 불명확하거나 재현이 불안정해 가설-검증 루프가 필요하다',
  invariant_reasoning: '정합성이 상태기계·동시성·불변식 추론에 달려 있다',
  verification_by_judgment: '테스트가 못 잡고 리뷰어의 추론으로만 검증할 수 있다'
}; // rec-settings.js의 문장 그대로, claude_bound 항목만 삭제
/** @returns {string} 유효한 신호를 `+`로 재결합한 문자열, 무효면 '' */
export function complexReason(labels, metadata)
/** @returns {string[]} */
export function complexReasonSentences(reason)
/** @returns {string} 카드·상세 공용 title */
export function complexTooltip(reason)
```

- `complexReason`: `workerLabels(labels)`에 `complex`가 없으면 `''`; `metadata.complex_reason`이 문자열이
  아니면 `''`; `+`로 나눠 `COMPLEX_REASONS` 밖 토큰을 버리고 하나도 안 남으면 `''`. 라벨과 사유는 함께
  읽는다 — 어느 한쪽만 있는 부착은 무효(`session-preferred.js`와 같은 원칙). 절대 throw 없음.
- `complexTooltip('')`은 `''`. 사유 문장이 없으면 첫 줄만.
- `judgementPopoverContent(item, 'complex')`는 같은 문장 목록을 쓴다(UI-8x90 §4.6의 `rec` 분기 치환).

## 2. 전송 — `server/worker/runnable-cache.js` + `server/worker/exec-enums.js` + `app/protocol.md`

- `RunnableItem`에서 `rec` 프로퍼티·`recOf`를 지우고 `complex_reason?: string`을 더한다. `qualify()`는
  `complexReason(row.labels, meta)`가 비어 있지 않을 때만 키를 싣는다. `exec_pins`에는 넣지 않는다.
- `exec-enums.js`의 `REC_SIGNALS`·`REC_VALUES`와 그 JSDoc을 삭제한다. `exec-enums.test.js`의 "matches the
  client rec_reason enum exactly" 테스트도 삭제한다(공유 모듈이 하나라 드리프트가 없다).
- `protocol.md` runnable 행 절의 `rec` 단락을 `complex_reason` 단락으로 바꾼다: 표시 전용, Worker 미소비,
  `exec_pins` 밖, 라벨 `complex`와 `complex_reason` metadata에서 서버가 판정.
- `pr-actions.js` 승계 주석 `the machine writes no rec_* judgement key` → `the machine writes no complex
judgement`.

순서와 소유: UI-mfm1이 `CandidateFacts`를 소유하고 먼저 착지했다(`blocks`, `8aa158a1937bb6d48e89f78402a3f4248cbb5eff`).
착지한 `placement.js`의 `CandidateFacts` typedef에는 `rec`가 없고 어댑터 `runnableRows()`의 `rec: null` 줄과 서버
`qualify()`의 `rec`만 남았다. 이 spec은 typedef에 `complex_reason?: string`(서버 추가 키)을 더하고 그 두 `rec`를
함께 지운다. UI-mfm1 §3.1의 "`rec` 그대로"는 이 착지로 대상이 사라지는 항목이지 이 spec이 재해석하는 항목이
아니다.

## 3. Worker 탭 — `workspace-adapter.js` + `lane-model.js` + `lanes.js` + `running-grid.js`

- `beadOverlay`의 `labels?` 필드는 UI-p7s2가 도입했다(필터 재료). 착지한 `add(issue, with_metadata)`는
  `with_metadata`와 무관하게 다섯 열 모두에서 문자열 라벨을 복사하므로 원천 확장 항목은 이미 착지했고 이 spec은
  어댑터의 오버레이 코드를 바꾸지 않는다(재검토 correction). `complexReason`은 `workerLabels`로 다시 정규화하므로
  오버레이의 원시 라벨 배열을 그대로 넘긴다. 복잡 칩의 metadata 조건(`with_metadata` 열에서만 `complex_reason`을
  읽음)은 그대로다. `runnableRows()`의 `rec: null` 줄은 삭제한다(§2).
- `lane-model.js` L4282 `item.rec = recSettings(metadata)` → `item.complex_reason =
complexReason(overlay.labels, metadata)`. Monitor 경로(L3896)는 `entry.complex_reason`을 문자열로 옮긴다
  (`typeof === 'string'`이 아니면 `''`). 두 경로 모두 `''`면 키를 싣지 않는다.
- `lanes.js`: `recChipTemplate(rec, open)` → `complexChipTemplate(reason, open)`. `reason`이 `''`면 `''`.
  클래스 `worker-card__rec` → `worker-card__complex`, `data-chip-key="complex"`, `data-state` 삭제,
  `title=${complexTooltip(reason)}`. `JudgementChipKey`의 `'rec'` → `'complex'`, `judgementPopoverContent`의
  분기와 칩 키 목록(L3748) 치환. 항목 typedef의 `rec` → `complex_reason?: string`.
- `running-grid.js` 타일 typedef `rec` → `complex_reason?: string`; 타일 렌더는 같은 템플릿.

## 4. 이슈 상세 헤더 — `effective-settings-view.js`

`summaryHeaderTemplate(data, handlers)`: `const reason = complexReason(data.labels, data.metadata)`;
비어 있지 않을 때 `<button class="detail-summary__chip detail-summary__chip--complex judgement-chip"
data-chip-key="complex" aria-expanded title=${complexTooltip(reason)}>복잡</button>`. `?disabled`·
`data-state` 없음. 팝업 내용은 `judgementPopoverContent({ complex_reason: reason }, 'complex')`.
`index.js`의 `effective` 스프레드가 `data.labels`를 이미 넘기므로 호출부 변경은 없다(없으면 칩 없음).

## 5. 스타일

`app/styles/base.css`: `.ctl-chip--label.worker-card__rec` 규칙을 `.worker-card__complex`로 이름만 바꾸고
`[data-state='applied']`·`[data-state='diverged']` 두 규칙을 삭제한다. `app/styles.css`:
`.detail-summary__chip--rec` → `--complex`, 두 `data-state` 규칙 삭제. `styles.css` L6879 주석의 클래스
이름을 맞춘다. 새 색 토큰 없음.

## 6. 검증

- `app/utils/complex-judgement.test.js`: 라벨 없음·사유 없음·enum 밖 토큰·혼합 토큰 필터·`+` 재결합·
  잘못된 입력 fail-quiet·툴팁에 모델명 부재·상태 줄 부재.
- `server/worker/runnable-cache.test.js`: `complex_reason` 전송 — 라벨+사유가 있을 때만 키, 없으면 키 없음,
  `exec_pins` 밖. 기존 `rec` 케이스 삭제.
- `server/worker/policy.test.js` "rec\_\* invariance" → `complex` 라벨·`complex_reason`·`rec_impl_runtime`이
  결정과 stamped_keys에 영향 없음.
- `app/views/worker/lane-model.test.js`·`index.test.js`·`lanes.test.js`·`running-grid` 테스트·
  `app/views/monitor/index.test.js`·`effective-settings-view.test.js`·`effective-card.test.js`·
  `detail-panel/index.test.js`: `rec` 픽스처를 `labels: ['complex']`+`complex_reason`으로 옮기고 칩 렌더·
  title·`data-chip-key="complex"`·팝업 문장 단언.
- `exec-enums.test.js`·`rec-settings.test.js`의 rec 테스트 삭제.
- AGENTS.md Pre-Handoff Validation 전체(`npm run tsc`·`npm run lint`·prettier·vitest). 프런트엔드 변경이므로
  `npm run build` 뒤 Worker·Monitor·상세 세 표면의 복잡 칩 스크린샷 확인(라벨 `complex`+사유가 있는 Bead 하나,
  없는 Bead 하나).

## 구현 unit 후보

1. `utils+server`: `complex-judgement.js`(+테스트), `runnable-cache.js`, `exec-enums.js`, `policy.test.js`,
   `protocol.md`, `pr-actions.js` 주석
2. `views`: 어댑터·lane-model·lanes·running-grid·상세 헤더·스타일·뷰 테스트, `npm run build` 산출물

## 경계·후속

- 관찰: `UI-mfm1`·`UI-p7s2`는 이 spec이 소비하는 산출물(`CandidateFacts`, `bead_overlay.labels`)의 소유자라
  `blocks` 선행으로 등록했다(헤더). `UI-z437`·`UI-obl0`·`UI-g0lk`는 경로 겹침이며 순서는 Worker 큐가 정한다.
- 관찰: `rec_impl_runtime`은 이 저장소가 표시하지 않는다 — 세션 impl-entry 미리보기(dotfiles 소유)가 담당.
  UI 표시가 필요해지면 별도 요청.
- 결정: 구 `rec_*` 키를 읽는 전환기 경로를 두지 않는다 — 은퇴 키는 닫힌 Bead의 잔여뿐이고 미종결 16건은
  dotfiles-23ev의 post-merge 잡(`repo-ops/post-merge.d/2026-09-21-complex-label-migration`)이 머지 뒤 옮긴다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — workflow 계약 표면(라벨·metadata 키)의 정본은 dotfiles이고 beads-ui는 소비자다; 계약 키
  부재는 fail-quiet로 표시를 생략한다.
- 전제: ADR 0014 — 슬롯이 없는 새 라벨·칩·버튼은 스펙을 먼저 갱신한다; 이 spec은 기존 슬롯의 재료만 바꾼다.
- 없음 — 계약 어휘의 소비만 바뀌고 표시 문법·슬롯·클릭 의미·Worker 미소비 불변은 그대로다.
