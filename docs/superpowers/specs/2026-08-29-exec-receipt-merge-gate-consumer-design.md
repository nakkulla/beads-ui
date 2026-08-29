---
scope:
  - server/worker/receipt-check.js
  - server/worker/merge-gate.js
  - server/worker/scheduler.js
  - server/worker/completion-intent.js
  - server/ws/worker-handlers.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/styles.css
  - app/main.bundle.js
  - app/main.bundle.js.map
  - server/worker/receipt-check.test.js
  - server/worker/merge-gate.test.js
  - server/worker/completion-intent.test.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-21-ui-bu6d-receipt-check-design.md
---

# exec_receipt 머지 게이트를 계약의 hold·badge 두 등급으로 소비한다

Bead: UI-h6t1 · route: spec_backed · 선행: dotfiles-qdp8(closed, dotfiles #463 ·
ADR dotfiles 0038)

## 1. 배경과 문제

2026-08-28 PROSTATE-6j9가 `exec_receipt=unit1:delegated:opus:native-fixed-posture@…;
unit2:…` 하나로 `receipt_unbacked:exec_receipt_malformed` → `waiting_metadata`
(카드 「정정 대기」)에 묶였다. 모델·SHA·unit 이름은 전부 유효했고 effort 토큰
철자만 어휘 밖이었다. 리뷰(`impl_review` ancestry)·`[verify]`·mergeability를 다
통과한 PR이 회계 형식 하나로 사람 클릭을 기다렸다.

이 hard hold는 계약이 아니라 소비자 스펙
`2026-08-21-ui-bu6d-receipt-check-design.md` §4("`verify_receipt_*`를 제외한 위반
하나라도 있으면 자동 머지 자격 미달")의 결정이었다. dotfiles-qdp8이 그 판정을
계약으로 가져가 두 등급으로 확정했다 — `workflow-state.yaml
metadata.parent_keys.exec_receipt.merge_gate`:

```yaml
merge_gate:
  hold: [unit_plan_mismatch, approval_forged, dispatch_forged, mode_authority_forged, non_ancestor, ancestry_probe_error]
  badge: [absent, unparsable, effort_unknown, main_reason_retired, main_receipt_unbacked, takeover_lineage_missing, takeover_lineage_unobservable]
  ancestry_rule: same_as_impl_review
  manual_click: waives_receipt_tier_for_bound_head
```

이 스펙은 beads-ui가 그 enum을 소비하는 방법만 정한다. 등급의 뜻은 계약이
소유하고 여기서 복제하지 않는다.

현재 코드와 계약의 차이:

| 지점 | 현재 | 계약 |
| --- | --- | --- |
| `exec_receipt_malformed` | 하나의 코드, 보류 | `unparsable`(badge) / `effort_unknown`(badge)로 갈라짐 |
| 부재 | 위반 없음, 표시 없음 | `absent` badge — 회계 잔여로 표시 |
| `main_reason_retired`·`main_receipt_unbacked`·`takeover_lineage_missing` | 보류 | badge |
| `main:takeover` 계보 미관측(`undecidable`) | `probe_error`로 보류 | `takeover_lineage_unobservable` badge |
| 영수증 SHA ↔ PR head ancestry | 검사 없음 | `non_ancestor`·`ancestry_probe_error` hold(신규) |
| `unit_plan_mismatch`·위조 3종 | 보류 | hold(유지) |

**Bead 설명 정정.** UI-h6t1 설명은 "영수증 부재 = 보류"라고 썼으나 착지한
계약은 부재를 `badge`로 확정했다(계약 산문: "Every other finding — absence, …
— is `badge`"). 계약이 정본이므로 이 스펙은 부재를 badge로 소비한다. 또 설명이
언급한 `candidateCard`는 표면에서 제외한다(§4.1 결정 3).

## 2. 사용자 결정 (2026-08-29)

1. badge 판정 칩의 자리는 **슬롯 5 좌표·실행 사실**이다 — `exec_receipt` 칩 옆.
   계약이 badge를 "행동을 바꾸지 않는 회계 잔여"로 못박았고, 슬롯 표의 판정
   규칙("행동을 바꾸는 쪽이 이긴다")상 1번이 아니다. hold는 지금처럼 슬롯 1
   상태 뱃지 「영수증 확인 필요 · <code>」다.
2. `absent`도 칩으로 그린다 — 계약 문구("displayed as accounting residue")
   그대로. 규율이 관측 가능한 상태로 남는다는 ADR 0038 의도와 일치한다.
3. 칩을 그리는 표면은 **PR 대기 행(외부 PR 행 포함)** 뿐이다 — Worker 탭과
   Monitor 탭 둘 다(같은 `miniRow`, 같은 `observations[bead_id].receipt_check`
   재료). `receipt_check` 관측이 실려 있는 행만 재료가 있다. 후보 카드는 attempt 관측이 없어
   baseline·lineage·ancestry 판정이 불가능하고, 부재 칩이 모든 후보에 뜨는
   소음을 피한다.

## 3. 서버

### 3.1 `server/worker/receipt-check.js` — 코드 어휘와 등급 레지스트리

ADR 0012(코드 내 field registry)대로 계약 enum을 이 모듈의 상수로 복제한다:

```js
export const EXEC_RECEIPT_MERGE_GATE = Object.freeze({
  hold: Object.freeze(['unit_plan_mismatch', 'approval_forged', 'dispatch_forged',
    'mode_authority_forged', 'non_ancestor', 'ancestry_probe_error']),
  badge: Object.freeze(['absent', 'unparsable', 'effort_unknown',
    'main_reason_retired', 'main_receipt_unbacked',
    'takeover_lineage_missing', 'takeover_lineage_unobservable'])
});
```

테스트가 서로소·합집합 13코드를 고정한다(계약 체커의 beads-ui 쪽 짝).
`RECEIPT_DISPLAY_ONLY_CODES`(`verify_receipt_*`)는 이 블록의 대상이 아니며
그대로 둔다.

판정 변경(모두 이 파일 안):

- **부재**: `exec_receipt` 키가 없거나 공백이면 `{code:'absent'}` 위반을 낸다.
  `checks.exec_receipt = null`은 유지.
- **`exec_receipt_malformed` 분리**: `parseReceiptForm`이 실패 사유를 둘로
  나눈다 — `parseExecReceipt`가 `null`(40hex 없음·`delegated:`/`main:` 계열
  아님·자유 문장)이면 `unparsable`, delegated 형식이고 SHA가 유효한데 마지막 `:`
  세그먼트가 `DELEGATED_EFFORT_TOKENS ∪ 생략` 밖이면 `effort_unknown`.
  다중 unit 형식에서 한 항목이 `UNIT_ITEM_RE`에 안 맞으면 값 전체가 단일 형식
  판정으로 떨어지고 거기서 `unparsable`이 된다(현행 fallthrough 유지).
  historical `delegated:<model>@<sha>`는 계속 유효(어느 등급도 아님).
- **`main:takeover` 계보 미관측**: `backingFor`의 `undecidable` 반환을
  `{code:'takeover_lineage_unobservable'}` 위반으로 바꾼다. `probe_error`
  채널은 이 사유로는 더 이상 열리지 않는다. `metadata_unavailable`·
  `metadata_unreadable`·`check_threw`의 `receiptProbeError`는 그대로다 — 계약
  "관측 실패의 경계"대로 enum 밖 fail-closed.
- **SHA ancestry(신규)**: 단일·다중 모두, 파싱된 각 영수증 SHA를 `heads`와
  `input.probeAncestry`로 판정한다. `verify_receipt`와 같은 주입 probe를 쓰되
  결과 처리가 다르다:
  - `heads`가 비었거나 probe가 없으면 판정하지 않는다(위반 없음,
    `checks.*.ancestry = 'unproven'`). 표시 경로(attach.js·scheduler.js는
    `head: null`)가 여기에 해당하므로 게이트만 fail-closed다(UI-bu6d §4 유지).
  - SHA가 `heads`에 있으면 `equal`; probe가 `equal`/`ancestor`면 통과.
  - probe가 `non_ancestor`면 `{code:'non_ancestor', detail:'<unit?>:<sha> not in <head>'}`.
  - probe가 `probe_error`를 돌려주거나 throw하면
    `{code:'ancestry_probe_error'}` — `verify_receipt`의 quiet과 달리 hold
    위반이다(계약 `ancestry_rule: same_as_impl_review`).
  - 다중 unit은 unit마다 같은 규칙, 위반도 unit마다 낸다.
- **등급 투영**: `blockingReceiptCodes`는 `EXEC_RECEIPT_MERGE_GATE.hold`에 든
  코드만 돌려준다(현행 "display-only 제외 전부"를 대체). 새 함수
  `badgeReceiptCodes(result)`가 `badge`에 든 코드를 돌려준다. 두 집합 밖의 코드
  (`verify_receipt_*`)는 둘 다 아니다.
- `summarizeReceiptCheck`가 `badge_codes: string[]`를 추가로 싣는다.
  `ok`·`probe_error`·`codes`·`blocking_codes`의 뜻은 그대로다 — `ok`는 "어떤
  등급의 발견도 없음"이므로 `absent`만 있어도 false이며, 소비자는 `ok`가 아니라
  `blocking_codes`/`badge_codes`를 읽는다(현행 소비자도 그렇다).

`receiptGateState`는 변경 없이 `blockingReceiptCodes`의 새 뜻을 따라간다:
hold 코드가 있을 때만 `unbacked`, badge만 있으면 `ok`.

### 3.2 `server/worker/merge-gate.js` — 변경 없음

`receipt_state.state === 'unbacked'`일 때만 `receipt_unbacked:<code>`로 보류하는
현행 판정이 그대로 계약 §"hold만 보류"다. `probe_error`(metadata 미관측·검사기
예외) 보류와 `waived` 경로도 그대로다. `ancestry_probe_error`는 위반 코드로
`receipt_unbacked:ancestry_probe_error` 사유가 된다 — 큐 실패 문구
`mergeFailureText`는 `receipt_unbacked:` 접두 전체를 이미 다루므로 UI 변경 없음.

### 3.3 `server/worker/scheduler.js recordReceiptCheck` — 로그만

"receipt check unbacked" 로그를 `blockingReceiptCodes(result).length > 0 ||
result.probe_error`일 때만 남긴다. badge 잔여(특히 외부 PR의 `absent`)가 매
attempt마다 경고 로그가 되지 않게 한다. 기록(`updateAttempt`)은 변경 없음.

### 3.4 `server/worker/completion-intent.js` — 변경 없음(테스트만)

`receipt_unbacked → metadata_watch`는 유지한다. Bead 설명은 이 매핑에서 badge
코드를 "제외"하라 했으나, badge는 게이트를 `ok`로 통과해 `receipt_unbacked:*`
사유 자체를 만들지 않으므로 코디네이터에 도달하지 않는다 — 매핑에 뺄 항목이
없다. 대신 `receipt-check.test.js`·`merge-gate.test.js`가 "badge 코드만 있는
관측은 게이트 `eligible`"을 고정해 이 불변식을 지킨다.

### 3.5 `server/ws/worker-handlers.js` — 전송

`receiptWarningFor`·`externalReceiptWarningFor`는 `summarizeReceiptCheck`를
그대로 쓰므로 `badge_codes`가 같은 transport로 PR 대기 행에 실린다. 변경 없음.
`snapshot-retention.js`의 `receipt_check` 보존 키도 그대로다.

## 4. 표시층

### 4.1 슬롯 배정 — 카드 문법 스펙 §5.1 정정

`2026-08-25-card-header-grammar-unify-design.md` §5.1 표의 슬롯 5 "지금 실려
있는 것"에 **`영수증 잔여` 판정 칩(클릭 = 사유 팝업)**을 추가하고 `정정(UI-h6t1)`
문단을 붙인다: badge는 계약이 "행동을 바꾸지 않는 회계 잔여"로 못박은 사실이라
5번이며, 같은 줄의 `exec_receipt`·실패 로그 경로와 짝이다(그 실행이 어디서
무엇으로 일어났고 그 기록이 얼마나 성립하는지). hold는 슬롯 1 상태 뱃지로 남는다
— 머지가 잠겼다는 행동이기 때문이다.

`2026-08-28-chip-grammar-unify-design.md` §4.5 표에 행 하나를 `정정(UI-h6t1)`으로
추가한다: 칩 `영수증 · <code>` · `data-chip-key="receipt"` · 제목 "실행 영수증
회계 잔여 — 머지는 진행" · 본문 코드별 한 줄.

### 4.2 `app/views/worker/index.js` — PR 대기 행 투영

- `receiptWarningCodes(summary)`는 그대로 `blocking_codes`(= hold)를 읽는다.
  기존 상태 뱃지 「영수증 확인 필요 · <code>」와 `auto_handled` 판정은 hold에만
  걸린다.
- 새 `receiptBadgeCodes(summary)`가 `badge_codes`를 fail-quiet로 읽는다(부재·
  비배열·빈 문자열 → `[]`).
- PR 대기 행 item에 `receipt_badge: { codes: string[] }`를 싣는다 — 코드가
  하나 이상일 때만(재료 없으면 필드 자체를 넘기지 않는다). 외부 행도 같은
  `obs.receipt_check`에서 온다.
- `judgementPopoverOf`가 `receipt` 키를 포함해 열림 상태를 돌려준다(기존 루프가
  `JUDGEMENT_CHIP_KEYS`를 돌므로 키 추가로 충분).

### 4.3 `app/views/worker/lanes.js` — 칩과 팝업

- `JUDGEMENT_CHIP_KEYS`에 `'receipt'`를 더한다(슬롯 5, `rec` 다음).
- `miniRow` 슬롯 5 `.worker-chips`에 `rec_el` 다음·`usage_el` 앞으로
  `receiptBadgeChipTemplate(item)`을 둔다. 마크업은 다른 판정 칩과 같다:
  `<button type="button" class="ctl-chip ctl-chip--label judgement-chip
  worker-card__receipt" data-chip-key="receipt" data-bead-id=… aria-expanded>`.
  라벨은 `영수증 · <첫 코드>`, 코드가 둘 이상이면 `영수증 · <첫 코드> +n`.
  `title`은 코드 전부를 `, `로 잇는다.
- `judgementPopoverContent(item, 'receipt')`: `item.receipt_badge`가 없으면
  `null`. 있으면 `{ title: '실행 영수증 회계 잔여 — 머지는 진행', lines: [코드별
  한 줄..., '자동 머지 판정에는 영향이 없다 — 정정은 bd update --set-metadata
  exec_receipt=… 로'] }`. 코드별 문장(`RECEIPT_BADGE_TEXT`):

  | 코드 | 문장 |
  | --- | --- |
  | `absent` | 실행 영수증이 기록되지 않았다 — 과거 Bead·외부 경로 PR은 원래 없다 |
  | `unparsable` | 영수증 값을 읽을 수 없다 — 40hex SHA나 `delegated:`/`main:` 형식이 아니다 |
  | `effort_unknown` | effort 토큰이 harness 어휘 밖이다 — 모델·SHA·unit은 유효하다 |
  | `main_reason_retired` | `main:` 사유가 고정 4토큰(bead·quick_fix_default·phase_line·takeover) 밖이다 |
  | `main_receipt_unbacked` | `main:` 사유를 뒷받침하는 메타데이터(impl_dispatch·route·planned_execution·quick_fix 기본 dispatch)가 없다 |
  | `takeover_lineage_missing` | `main:takeover`인데 resolved 모델과 일치하는 완료된 위임 세션이 없다 |
  | `takeover_lineage_unobservable` | `main:takeover`인데 위임 계보를 모니터가 볼 수 없다(Codex 밖 런타임) |

  어휘 밖 코드는 코드 문자열 그대로 한 줄(서버가 자란 코드를 삼키지 않는다).
- Monitor 탭(`app/views/worker/lane-model.js`의 `pr_wait` 투영)도 같은
  `observations[bead_id].receipt_check`에서 `badge_codes`를 읽어 같은
  `receipt_badge: { codes }`를 싣는다(코드 없으면 필드 없음). Monitor는 hold를
  이미 `gate.gate_badge`(「영수증 확인 필요」)로 그리므로, 이로써 두 탭이 같은
  행을 같게 말한다(ADR 0014). Monitor의 판정 칩 클릭 핸들러는 UI-8x90이 이미
  두 탭에 같은 `judgement-chip` 위임으로 두었으므로 키 추가로 충분하다.

### 4.4 `app/styles.css`

`.worker-card__receipt`는 `.worker-card__rec`와 같은 label 칩 톤(중립)이다.
alert 색을 쓰지 않는다 — 행동이 필요 없는 잔여이기 때문이다.

## 5. 기존 스펙 승계 — UI-bu6d §4

`2026-08-21-ui-bu6d-receipt-check-design.md` §4에 `정정(UI-h6t1)` 문단을 붙인다:
"`verify_receipt_*`를 제외한 위반 하나라도 있으면 자동 머지 자격 미달"은 dotfiles
계약 `exec_receipt.merge_gate`로 승계됐다 — 보류는 `hold` 집합만, `badge`는
표시 전용이다. 등급의 정본은 계약이고 beads-ui는 `EXEC_RECEIPT_MERGE_GATE`로
복제 소비한다. §4의 나머지(매 평가 재검사·`waived`·probe 오류 fail-closed)는
그대로다.

## 6. 오류 처리 요약

| 상황 | 게이트 | 표시 |
| --- | --- | --- |
| hold 코드 관측 | `receipt_unbacked:<code>` 보류 | 슬롯 1 「영수증 확인 필요 · <code>」(현행) |
| badge 코드만 관측 | 통과(`ok`) | 슬롯 5 `영수증 · <code>` 판정 칩 |
| ancestry probe 오류(게이트 경로) | `receipt_unbacked:ancestry_probe_error` 보류 | 표시 경로는 probe를 안 받으므로 quiet |
| metadata 미관측·검사기 예외 | `receipt_unbacked:probe_error` 보류(현행) | quiet(현행) |
| 수동 `[머지]` 클릭 | 그 head의 receipt tier `waived`(현행) | 코드는 남는다 |

## 7. 검증

- `server/worker/receipt-check.test.js`
  - 레지스트리: hold·badge 서로소, 합집합이 계약 13코드와 정확히 같다.
  - hold 5종(`unit_plan_mismatch`·`approval_forged`·`dispatch_forged`·
    `mode_authority_forged`·`non_ancestor`)+`ancestry_probe_error`가
    `blockingReceiptCodes`에 들고 `receiptGateState`가 `unbacked`다.
  - badge 7종 각각이 `badgeReceiptCodes`에 들고 `blockingReceiptCodes`에는 없으며
    `receiptGateState`가 `ok`다 — 특히 `delegated:opus:native-fixed-posture@<sha>`
    (단일·다중)는 `effort_unknown`만, 부재는 `absent`만, 자유 문장은
    `unparsable`만.
  - `main:takeover` 계보 미관측이 `probe_error`가 아니라
    `takeover_lineage_unobservable`이다.
  - ancestry: head 없음/probe 없음 → 위반 없음·`unproven`; equal/ancestor 통과;
    non_ancestor → hold; probe_error·throw → `ancestry_probe_error`; 다중 unit은
    unit마다 판정.
  - `summarizeReceiptCheck`가 `badge_codes`를 싣는다.
- `server/worker/merge-gate.test.js`: badge만 있는 `receipt_state`(`ok`)로
  `eligible`; `receipt_unbacked:ancestry_probe_error` 사유.
- `server/worker/completion-intent.test.js`: 정책 표 `receipt_unbacked →
  metadata_watch` 불변 케이스(회귀 고정).
- `app/views/worker/index.test.js`: PR 대기 행 — hold 코드는 상태 뱃지,
  badge 코드는 슬롯 5 판정 칩(`data-chip-key="receipt"`), 클릭 시 팝업에 코드별
  문장; 외부 행도 같음; `badge_codes` 부재 시 칩 없음.
- `app/views/worker/lanes.test.js`: `JUDGEMENT_CHIP_KEYS`에 `receipt`;
  `judgementPopoverContent` 재료 없음 → `null`.
- `app/views/worker/lane-model.test.js`: Monitor `pr_wait` 항목이
  `receipt_check.badge_codes`를 `receipt_badge`로 싣고, 부재·빈 배열이면 필드가
  없다.
- 절차: `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120s) ·
  `npm run lint` · `npm run prettier:write` → `npm run build`
  (`app/main.bundle.js`·`.map` 포함, prettier → build 순서).
- 배포: 머지 후 `repo-ops/config.toml [deploy]` 경로로 공유 서비스 배포와
  healthz(tailnet IP) 확인.

## 8. 비-목표·관찰

- 쓰기 시점 거부(dotfiles-2sgg 훅)·`impl_review`·`verify_receipt` 판정은 바꾸지
  않는다.
- badge를 durable metadata로 기록하지 않는다(매 관측 재계산).
- 과거 영수증 마이그레이션 없음.
- 관찰(scope 겹침): UI-1gpj(세션용 큐 배치 HTTP 진입점,
  `2026-08-29-session-queue-place-entrypoint-design.md`)와 `server/ws/worker-handlers.js`
  접두어를 공유한다. 이 스펙은 그 파일을 바꾸지 않고(§3.5 전송 변경 없음)
  UI-1gpj는 큐 배치 핸들러를 만지므로 같은 파일의 다른 절이며 의존 관계가
  없다 — `blocks` 엣지 없음.
- 관찰: `attach.js` 외부 PR 표시 검사와 `scheduler.js` 완료 시 기록은
  `head: null`이라 `non_ancestor`를 표시층에서 볼 수 없다. hold이므로 큐 실패
  사유(`receipt_unbacked:non_ancestor`)로는 보인다.

## 구현 unit 후보

- 단일 unit: 서버 판정·레지스트리(§3)와 표시(§4)·스펙 정정(§5)이 한 enum을
  나누므로 쪼개지 않는다.

## 경계·후속

- 없음 — 형제 없음; 발견 항목은 Finish admission에서 판단.

## 결정 (ADR 후보)

- badge 판정 칩은 슬롯 5(좌표·실행 사실)이고 hold는 슬롯 1 상태 뱃지다.
  - 되돌리기 어려움: 불성립 — 슬롯 표 한 줄과 템플릿 위치 변경으로 되돌린다.
  - 맥락 없이 놀라움: 불성립 — 슬롯 표의 판정 규칙("행동을 바꾸는 쪽이
    이긴다")에서 직접 나온다.
  - 실질 트레이드오프: 불성립 — 슬롯 5는 표시 위치만 바꾸고 게이트 판정·
    자동화·데이터 형식은 건드리지 않으므로 안전성·운영 비용·성능 같은 경쟁
    가치를 교환하지 않는다; 잃는 것은 상태 줄에서의 가시성뿐이고 그것은 계약이
    badge에 요구하지 않는 것이다.
- 없음 — 등급 자체의 결정은 dotfiles ADR 0038이 소유하고, beads-ui는 그 enum의
  소비 위치만 정했다.
