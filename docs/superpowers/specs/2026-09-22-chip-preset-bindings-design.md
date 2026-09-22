---
scope:
  - server/exec-preset-store.js
  - server/worker/exec-preset-coordinator.js
  - server/ws/exec-preset-handlers.js
  - server/ws/connection.js
  - server/ws/mutation-handlers.js
  - server/worker/exec-enums.js
  - server/worker/runnable-cache.js
  - server/worker/attach.js
  - server/worker/scheduler.js
  - server/bd.js
  - app/protocol.js
  - app/protocol.md
  - app/data/exec-preset-store.js
  - app/utils/complex-judgement.js
  - app/utils/area-judgement.js
  - app/views/chip-popover.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/detail-panel/index.js
  - app/views/detail-panel/effective-settings.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/settings-dialog/index.js
  - app/views/settings-dialog/bulk-pane.js
  - app/views/settings-dialog/chip-bindings-tab.js
  - app/views/settings-dialog/session-model.js
---

# UI-wg68 — 칩별 실행 프리셋 바인딩: 모니터 설정의 `칩` 탭이 판정 칩에 프리셋을 매고, 칩 클릭이 이슈에 그 프리셋을 적용하거나 클릭 전 핀으로 되돌린다

## 0. 사용자 결정 (2026-09-22)

이 스펙이 정하지 않고 받아 적는 것.

- 프리셋은 작업 성격(칩)에 매어 쓴다. 근거는 9/14~22 실측(spec_backed 60 bead): 총괄(opus vs
  fable)은 착지·r1 리뷰 약점·비용이 구분되지 않았고 구현자 차이가 결정적이었다 — beads-ui app
  작업은 Claude 구현이 r1 blocking 0.6·43분·$17.8 vs astra 1.54·84분·$36.7, 비UI rig는 astra
  구현이 blocking 0.42·41분·$13.2로 Claude와 동급이며 Claude 쿼터를 쓰지 않는다.
- 바인딩은 저장소별이 아니라 **서버 전역**이고 모니터 탭의 설정 창에서 세운다. `기본 프리셋`
  슬롯은 두지 않는다 — 저장소별 적용 프리셋(`apply-impl-preset-global`)이 기본값이다.
- 적용은 **칩 클릭으로만** 일어난다. 라벨이 붙어 있다고 자동 적용하지 않는다.
- 여러 칩 사이에 우선 규칙은 없다 — **가장 마지막에 클릭한 칩**의 프리셋이 선다.
- 적용된 칩을 다시 클릭하면 해제되고, 이슈의 실행 설정은 **첫 칩 클릭 전의 핀으로 되돌아간다**.
- `frontend`·`backend` 라벨은 `complex`처럼 **Bead 생성 시 세션이 판정해 붙이고**, 한 이슈에
  **둘 다** 붙을 수 있다. 어휘·판정 신호는 dotfiles 계약이 소유한다(형제 스펙, §10).
- 칩 문법 스펙 UI-8x90 §4.5·§5.1의 "판정 칩 클릭은 사유 팝업이고 즉시 적용은 없다"는 결정을
  `복잡`·`frontend`·`backend` 세 칩에 한해 뒤집는다.

## 1. 요구와 확인된 현재 동작

- 프리셋 저장소는 서버 전역 파일 `$XDG_STATE_HOME/bdui/exec-presets.json` 하나다
  (`server/exec-preset-store.js`, `{ revision, presets[], reseed_migration? }`). 모든 변경은
  `applyMutation(expected_revision, mutate)`의 CAS를 지나고 `revision`이 1 오른다. 구독 채널은
  서버 전역이며(`server/ws/exec-preset-handlers.js` `SUBSCRIBERS`) 변경마다
  `impl-presets-snapshot { id, revision, presets }`를 민다.
- 이슈에 프리셋을 적용하는 op는 `apply-impl-preset { id, preset_id, expected_revision }` 하나다.
  `handleApplyImplPreset`은 `root_dir`을 읽지 않고 **연결된 워크스페이스**에서 이슈를 조회·수정한다.
  `buildApplyImplPresetArgs`가 `BEAD_PIN_KEYS` 17키를 `--set-metadata`/`--unset-metadata`로 교체하고
  같은 argv에 `applied_exec_preset=<preset_id>`를 더한다(ADR UI-xq3h). 개별 키 편집
  (`update-exec-settings`·`update-impl-target`)은 `applied_exec_preset`을 건드리지 않고, 카드의
  어긋남은 읽을 때 17키 대칭 비교로 계산한다(`app/views/detail-panel/effective-settings.js`
  `presetDeviation`).
- WS 요청 처리는 병렬이다. `server/bd.js` `runBd`는 `withBdRunQueue`로 **개별 `bd` 명령**만
  직렬화하므로, 읽고 판정해 쓰는 한 전이는 요청 두 개가 끼어들 수 있다.
- attempt 기록의 `exec_preset { id, name, revision, deviated_keys }`는
  `exec-preset-coordinator.js` `dispatchPreset(queue.applied_exec_preset, bead_snapshot)`이
  **워크스페이스**의 전역 적용 기록으로 만든다. dispatch 입력인 `BeadSnapshot`은
  `server/worker/attach.js` `snapshotBead`가 `bd show --json`의 metadata에서 고른 필드로 만들며
  `applied_exec_preset`을 싣지 않는다. 이슈에 다른 프리셋을 적용해도 attempt는 워크스페이스 프리셋
  이름에 `deviated_keys`가 붙은 모양으로 기록되고, 비교탭은 그 이름으로 묶는다.
- 판정 칩은 `복잡` 하나다(`app/utils/complex-judgement.js`; 라벨 `complex` + `complex_reason`).
  후보 카드·대기/PR 대기/완료 행·실행 타일(`lanes.js` `complexChipTemplate`,
  `running-grid.js`)과 이슈 상세 헤더(`effective-settings-view.js` `summaryHeaderTemplate`)에
  `<button class="… judgement-chip" data-chip-key="complex">`로 그려지고, 클릭은 두 탭의 카드
  클릭 핸들러(`worker/index.js`·`monitor/index.js`)가 잡아 `chip_popover.toggle()`로 사유 팝업만
  연다. 팝업 본문(`lanes.js` `judgementPopoverContent`)은 "적용은 이슈 상세의 실행 설정
  편집기에서"라고 안내한다. 칩에 `data-state`는 없다.
- 서버 runnable 투영(`server/worker/runnable-cache.js`)은 행에 `labels`·`complex_reason`·
  `exec_pins`를 싣는다. 라벨 편집 op는 `label-add`/`label-remove { id, label }`다.
- 모니터 탭 헤더 `⚙`는 `settings_dialog.open(undefined, { scope: 'monitor' })`로 일괄 창을 열고,
  일괄 창의 탭은 `BULK_SETTINGS_TABS` = 워커·세션·계정이다(ADR UI-e1ta). 이 창에는 서버 전역
  값을 쓰는 컨트롤이 아직 없다 — 프리셋 목록 CRUD가 서버 전역이지만 적용은 언제나 저장소
  단위다.
- 계약의 활성 라벨은 `worker-ineligible`·`session-preferred`·`complex`·`spec-after-blocker`
  넷이고 `frontend`·`backend`는 없다. beads-ui는 계약 어휘의 소비자다(ADR 0012).

## 2. 검토한 접근과 선택

**바인딩의 저장 위치.** (a) `exec-presets.json`에 `chip_bindings`를 두고 같은 `revision`
CAS·같은 스냅샷 채널을 쓴다 — **선택**. 바인딩은 프리셋 id를 가리키므로 프리셋 삭제와 같은
변경 단위 안에 있어야 "지운 프리셋을 가리키는 바인딩"이 생기지 않고, 구독자는 새 채널 없이
같은 스냅샷에서 읽는다. (b) 별도 파일·별도 채널 — 두 파일의 revision이 따로 놀아 삭제와
바인딩 해제가 원자적이지 않고, 클라이언트가 두 스냅샷을 합쳐야 한다. (c) 워크스페이스 kv —
저장소별이라 사용자 결정(서버 전역)에 어긋난다.

**칩 클릭의 op.** (a) 클라이언트가 이슈 상태를 보고 `apply-impl-preset` 또는 복원 op를 고른다
— 카드가 든 스냅샷이 낡았을 때 "적용"과 "해제"가 뒤집힐 수 있다. (b) 서버 op
`chip-preset-toggle`이 이슈를 그 자리에서 읽어 적용/복원을 정한다 — **선택**. 판정 재료
(`applied_exec_preset`·`chip_preset_source`·바인딩)가 전부 서버 손에 있고, 이슈 쓰기는 이미
`bd update` 한 번이라 argv 하나로 끝난다.

**클릭 전 핀의 보관.** (a) 이슈 metadata 키 하나에 JSON 문자열로 — **선택**. 적용과 같은 argv에
실려 원자적이고, 이슈 상세 투영(ADR 0025)이 그대로 싣는다. (b) 서버 상태 파일 — 이슈 SoT가
둘로 갈리고 다른 클라이언트·재시작에서 어긋난다. (c) 보관하지 않고 17키 해제 — 사용자가
복원을 골랐다.

**attempt 기록의 프리셋 정체성.** 이슈에 적용된 프리셋이 있으면 attempt는 그 프리셋으로
기록한다(§7). 이것 없이는 칩으로 적용한 프리셋의 성적이 비교탭에서 워크스페이스 프리셋의
"어긋남" 행으로 묻혀 사용자 결정의 목적(프리셋별 성능 비교)이 서지 않는다.

## 3. 칩 바인딩 — 서버

### 3.1 상태

`exec-presets.json` 최상위에 `chip_bindings`를 더한다.

```json
{ "revision": 112, "presets": [...], "chip_bindings": { "complex": "<preset id>|null", "frontend": null, "backend": null } }
```

- 키 어휘는 `server/worker/exec-enums.js` 상수 `CHIP_BINDING_KEYS = ['complex', 'frontend', 'backend']`
  이고 `app/views/settings-dialog/session-model.js`가 같은 이름으로 미러한다. 어휘 밖 키는
  로드 시 버린다(`normalizeState`). 필드가 없으면 셋 다 `null`로 읽는다(기존 파일 호환).
- `slot`이라는 말은 쓰지 않는다 — 큐의 병렬 슬롯(`worker-queue-set-slots`)과 충돌한다.
  이름은 `chip_bindings`·바인딩이다.

### 3.2 변경

- 새 op `impl-preset-bind { expected_revision, chip, preset_id }` — `chip ∈ CHIP_BINDING_KEYS`,
  `preset_id`는 현재 `presets`에 있는 id이거나 `null`(해제). `applyMutation`을 지나 `revision`이
  오르고 스냅샷이 밀린다. 응답은 `{ applied: true, revision }` 또는 CAS 실패
  `{ applied: false, conflict: true, revision, presets, chip_bindings }`. 어휘 밖 `chip`,
  목록에 없는 `preset_id`는 `bad_request`.
- `impl-preset-delete`는 같은 mutation 안에서 그 id를 가리키는 바인딩을 전부 `null`로 만든다.
  `impl-preset-update`는 바인딩을 건드리지 않는다(id가 같다).
- `impl-presets-snapshot`은 `chip_bindings`를 함께 싣는다. 구버전 클라이언트는 모르는 필드를
  무시한다.
- `snapshot()`이 legacy 프리셋을 걸러내듯, 바인딩이 가리키는 id가 걸러진 프리셋이면 스냅샷의
  `chip_bindings`에서는 `null`로 투영한다(파일은 그대로).

## 4. 칩 클릭 — `chip-preset-toggle`

### 4.1 payload와 판정

`chip-preset-toggle { id, chip, expected_revision, root_dir? }`. `expected_revision`은 프리셋
스냅샷 revision이다(`apply-impl-preset`과 같은 CAS). `root_dir`이 있으면 그 워크스페이스에서, 없으면
연결된 워크스페이스에서 조회·수정·재조회를 모두 수행한다 — 모니터 탭의 카드는 연결 저장소가 아닌
저장소의 이슈일 수 있으므로 `apply-impl-preset`과 달리 `root_dir`을 실제로 읽는다(다른
`root_dir` 수용 op와 같은 워크스페이스 해석; 등록되지 않은 경로는 `bad_request`). 서버는 바인딩
`preset_id = chip_bindings[chip]`을 읽고 이슈를 `bd show --json`으로 읽은 뒤 한 가지를 고른다.

| 이슈 상태 | 동작 |
| --- | --- |
| `preset_id === null` | `bad_request` `chip_unbound` — 클라이언트는 바인딩 없는 칩을 버튼으로 그리지 않으므로(§5.2) 정상 경로에서 오지 않는다 |
| `metadata.chip_preset_source === chip` 이고 `metadata.applied_exec_preset === preset_id` | **복원**(§4.3) |
| 그 밖 | **적용**(§4.2) |

응답은 `{ applied: 'applied' \| 'restored', conflict: false, revision, issue }`(issue는 쓰기 뒤
`bd show --json`). CAS 실패는 `apply-impl-preset`과 같은 `{ applied: false, conflict: true, … }`.

### 4.2 적용

`apply-impl-preset`의 헬퍼 `resolvePresetForApply`·`presetSettingsForIssue`·`buildApplyImplPresetArgs`를
재사용해(17키 교체 + `applied_exec_preset=<preset_id>`, quick_fix 역매핑·오케스트레이션 검증 포함)
§4.1이 고른 워크스페이스에서 `bd update` 한 번을 쓰고, 같은 argv에 두 키를 더한다. 핸들러
`handleApplyImplPreset` 자체는 부르지 않는다(연결 워크스페이스에 묶여 있다).

- `chip_preset_source=<chip>` — 이 핀 집합을 세운 칩.
- `chip_preset_restore=<json>` — **이 키가 아직 없을 때만** 쓴다. 값은 쓰기 직전 이슈의
  `BEAD_PIN_KEYS` 17키 중 값이 있는 것과 `applied_exec_preset`을 담은 JSON 객체 문자열
  (`{"impl_runtime":"claude","applied_exec_preset":"…"}`; 빈 객체 `{}`도 유효). 이미 있으면
  그대로 둔다 — 마지막 클릭이 이기되, 복원 대상은 언제나 **첫 칩 클릭 전**이다.

### 4.3 복원

한 argv로: `chip_preset_restore`에 담긴 키는 `--set-metadata`, 담기지 않은 `BEAD_PIN_KEYS`와
`applied_exec_preset`은 `--unset-metadata`, 그리고 `chip_preset_source`·`chip_preset_restore`를
`--unset-metadata`. `chip_preset_restore`가 없거나 JSON이 아니면 17키와
`applied_exec_preset`을 모두 해제하고 두 키를 지운다(보관이 깨졌으면 "저장소 값"으로 돌아가는
것이 가장 덜 놀랍다) — 응답 `restored`에 `restore_fallback: true`를 더한다.

### 4.4 다른 쓰기 경로와의 관계

- 이슈 상세 편집기의 `apply-impl-preset`(칩 아님)은 같은 argv에서 `chip_preset_source`·
  `chip_preset_restore`를 **unset**한다 — 사람이 프리셋을 직접 고른 순간 칩의 소유가 끝나고
  복원점도 의미를 잃는다.
- `update-exec-settings`·`update-impl-target`(개별 키 편집)은 두 키를 건드리지 않는다. 결과는
  칩 `어긋남` 상태(§5.1)로 드러난다.
- `apply-impl-preset-global`·프리셋 삭제·바인딩 해제는 이슈를 훑지 않는다. 바인딩이 풀린 뒤
  남은 `chip_preset_source`는 §5.1의 판정에서 "적용됨"이 되지 못하고, 다음 칩 클릭이
  적용으로 덮는다.
- 실행 중 attempt는 바뀌지 않는다 — 핀은 다음 dispatch가 읽는다(현행).

### 4.5 전이의 직렬화

한 전이(바인딩 읽기 → 이슈 읽기 → 판정 → `bd update` → 재조회)는 **같은 워크스페이스·같은 이슈**
안에서 요청 순서대로 하나씩 처리한다. `exec-preset-handlers.js`가 `(root_dir, bead_id)` 키의
promise 체인(`toggle_chains: Map<string, Promise<void>>`)을 들고, 새 요청은 이전 체인이 끝난 뒤
시작하며 끝나면 체인에서 자기 항목을 지운다. 이렇게 같은 칩을 빠르게 두 번 누르면 첫 요청이
`applied`, 두 번째가 `restored`로 판정된다 — 두 번째 요청이 첫 요청의 재조회 결과를 읽기
때문이다. `bd.js`의 명령 단위 직렬화는 그대로다(이 체인은 그 위의 전이 단위 직렬화다). 다른
이슈끼리는 병렬이다. 클라이언트는 요청이 떠 있는 동안 그 칩을 `aria-busy="true"`로 두고 클릭을
무시하되, 이는 편의일 뿐 정합성은 서버 체인이 지킨다.

### 4.6 키의 소유

`chip_preset_source`·`chip_preset_restore`는 `applied_exec_preset`과 같은 beads-ui 자신의 키다
(ADR UI-xq3h 전제: dotfiles가 읽지 않는 키는 계약 정의가 아니다). 어휘 정본은
`server/worker/exec-enums.js`(`CHIP_PRESET_SOURCE_KEY`·`CHIP_PRESET_RESTORE_KEY`)이고
`session-model.js`가 미러한다. `BEAD_PIN_KEYS` 17키 밖이며 프리셋 대상 키가 아니다.

## 5. 칩 상태와 표면

### 5.1 상태

세 칩(`complex`·`frontend`·`backend`)은 `data-state`를 얻는다. 재료는 이슈 metadata와 프리셋
스냅샷이다.

| `data-state` | 조건 |
| --- | --- |
| `applied` | `chip_preset_source === chip` 이고 `applied_exec_preset === chip_bindings[chip]` 이고 17키 대칭 비교(`presetDeviation`)가 0건 |
| `diverged` | 위와 같되 대칭 비교가 1건 이상 |
| `unapplied` | 그 밖(바인딩이 있음) |

프리셋 스냅샷이 아직 없으면 상태를 그리지 않는다(ADR UI-xq3h "알 수 없는 동안 말하지 않는다").
`applied`·`diverged`는 칩을 채운 모양(기존 `.ctl-chip--label` 위 배경 반전)으로, `unapplied`는
지금 모양이다. 클릭은 상태와 무관하게 §4.1 서버 판정을 따른다 — `diverged`에서 클릭은 복원이다
(사용자 결정: 재클릭=해제).

### 5.2 바인딩 유무

- 바인딩이 있는 칩은 `<button class="… judgement-chip judgement-chip--bound" data-chip-key=… data-state=…>`
  이고 클릭이 `chip-preset-toggle`이다. `title`은 사유 문장(§5.4) 뒤에 ` · 클릭: <프리셋 이름> 적용`
  또는 ` · 클릭: 클릭 전 설정으로 복원`을 붙인다.
- 바인딩이 없는 칩은 지금과 같은 사유 팝업 버튼이다. 팝업 본문의 안내 줄은 "적용은 이슈 상세의
  실행 설정 편집기에서"에서 "칩에 프리셋을 매려면 모니터 탭 ⚙ → 칩"으로 바꾼다.
- 다른 판정 칩(`세션 권장`·`worker-ineligible`·`리뷰`·`영수증`·`gate`·`readiness`·
  `spec_after_blocker`)은 그대로 팝업이다.

### 5.3 클릭 경로

두 탭의 카드 클릭 핸들러에서 `.judgement-chip--bound`를 `.judgement-chip`보다 먼저 잡는다:
`data-bead-id`·`data-chip-key`·(모니터) `data-root-dir`로 `chip-preset-toggle`을 보내고, 응답의
`applied`/`restored`를 토스트 한 줄로 알린다(`복잡 → 오퍼스 → 클로드 적용` / `클릭 전 설정으로 복원`).
`conflict`면 스냅샷을 다시 받고 토스트 `프리셋 목록이 바뀌었습니다 — 다시 누르세요`. 카드
클릭(상세 열기)보다 먼저 잡고 멈추는 규칙은 UI-8x90과 같다. 이슈 상세 헤더의 칩도 같은 op를
부른다(`detail-panel/index.js`에 `onChipToggle`).

### 5.4 `frontend`·`backend` 칩

- 새 모듈 `app/utils/area-judgement.js`: `AREA_LABELS = ['frontend', 'backend']`,
  `areaLabels(labels)`(라벨 배열에서 어휘 안의 것만, 계약 순서), 칩 문구는 라벨 그대로
  `frontend`/`backend`. 사유 키는 없다 — 라벨 자체가 판정이다(형제 스펙). 어휘는 dotfiles
  계약의 코드 복제다(ADR 0012); 계약에 없는 라벨은 그리지 않는다(fail-quiet).
- 표면과 자리는 `복잡`과 같다: 후보 카드 슬롯 1(정체성 줄), 대기·PR 대기·완료 행의
  `.worker-chips`, 실행 타일 `.rtile__meta`(슬롯 5), 이슈 상세 헤더. `복잡` 바로 뒤에
  `frontend`, `backend` 순이다. 슬롯 표(카드 문법 스펙 §5.1)에 "판정 칩 3종"으로 한 줄
  갱신한다. Monitor도 그린다(`복잡`과 같은 규칙).
- 재료: 후보 행은 서버 runnable 투영의 `labels`(이미 실림), 오버레이 행은 `lane-model.js`가
  `overlay.labels`에서 계산한다(`complexReason`과 같은 자리). 상세 헤더는 issue의 `labels`.
- `title`은 `frontend: 렌더된 화면으로 acceptance를 판정하는 작업` / `backend: 화면 없는 서버·CLI·스크립트·계약·파이프라인 작업`
  (형제 스펙의 meaning을 한 줄로).

## 6. 모니터 설정 창 `칩` 탭

- `BULK_SETTINGS_TABS`에 `{ id: 'chips', label: '칩', glyph: '◈' }`를 마지막에 더한다. 일괄
  모드(`scope: 'monitor'`)에만 있다 — 서버 전역 값이므로 `적용 대상` 저장소 선택과 무관하고,
  단일·레포 창(`REPO_SETTINGS_TABS`)에는 없다.
- 새 모듈 `app/views/settings-dialog/chip-bindings-tab.js`. 행 셋(`복잡`·`frontend`·`backend`),
  행마다 `<select>`에 `없음` + 현재 프리셋 목록(이름, 비호환 프리셋은 `disabled`). 고르는 즉시
  `impl-preset-bind`를 보내고, `conflict`면 스냅샷을 다시 받아 폼을 세우고 토스트로 알린다.
  저장 버튼은 없다. 머리말 한 줄: "칩을 클릭하면 여기 맨 프리셋이 그 이슈에 적용됩니다. 다시
  클릭하면 클릭 전 설정으로 돌아갑니다."
- 재료는 `impl-presets-snapshot`의 `presets`·`chip_bindings`·`revision`뿐이다. 스냅샷이 오기 전엔
  행을 비활성으로 그린다.

## 7. attempt 기록

두 곳을 바꾼다.

- **입력.** `server/worker/attach.js` `snapshotBead`가 `BeadSnapshot`에
  `applied_exec_preset: string|null`(metadata의 문자열 그대로, 없으면 `null`)을 더한다. 타입은
  `attach.js`의 `BeadSnapshot` typedef와 이를 받는 `scheduler.js`·`exec-preset-coordinator.js`의
  JSDoc에 함께 적고, `attach.test.js`가 그 필드를 단언한다. 다른 필드·판정(`ready`·`blocked`·
  `blocks_blockers`)은 그대로다.
- **선택.** `resolveForDispatch`의 `dispatchPreset(applied, bead_snapshot)`에서 `applied`를 고르는
  규칙을 바꾼다: `bead_snapshot.applied_exec_preset`이 있고 그 id가 현재 프리셋 스냅샷에 있으면
  `{ id, name: <현재 이름>, revision: <현재 revision> }`을 쓰고, 없으면 지금처럼 워크스페이스의
  `queue.applied_exec_preset`을 쓴다. `deviated_keys` 계산은 그대로다(그 프리셋과 bead 핀의 대조).

이렇게 attempt와 비교탭이 "이 이슈가 실제로 들고 간 프리셋"으로 묶인다. 카드의 대칭 비교와
`dispatchPreset`을 한 구현으로 합치지 않는 결정(ADR UI-xq3h)은 유지한다.

## 8. 프로토콜·소유권

- `app/protocol.md` "Workspace session defaults and execution presets" 절에 `impl-preset-bind`·
  `chip-preset-toggle`·`impl-presets-snapshot`의 `chip_bindings`를 문서화한다. 이 기회에 지금
  빠져 있는 `impl-preset-delete`·`subscribe-impl-presets`·`impl-presets-snapshot`도 같은 절에 적는다.
- `app/protocol.js` `MessageType`에 두 op를 더한다.
- dotfiles 계약이 라벨 어휘·판정 시점을 소유한다. beads-ui는 라벨을 읽기만 하고(`label-add`로
  사람이 붙이는 경로는 현행) 판정을 쓰지 않는다.

## 9. 검증

- 서버 단위 테스트: `exec-preset-store` 로드/정규화(`chip_bindings` 부재·어휘 밖 키), bind CAS,
  delete가 바인딩을 비움; `chip-preset-toggle` 적용(복원점 최초 1회 기록)·마지막 클릭 우선·복원
  argv·보관 손상 fallback·`chip_unbound`·`root_dir` 워크스페이스 해석(연결 저장소가 아닌 저장소의
  이슈에 쓰고 재조회)·**같은 이슈 연속 두 요청이 순서대로 `applied`→`restored`가 되는 직렬화**(§4.5,
  두 요청을 동시에 보내는 테스트); 편집기 `apply-impl-preset`이 두 키를 unset; `attach.js`
  `snapshotBead`가 `applied_exec_preset`을 싣고 `dispatchPreset`이 그 값을 우선.
- 클라이언트 단위 테스트: `area-judgement`, 칩 `data-state` 판정 셋, bound/unbound 렌더와 클릭
  분기(worker·monitor·detail), `칩` 탭 select→op→conflict 재세움.
- 스크린샷 확인(복잡 판정 `verification_by_judgment`): 워커 후보 카드·모니터 후보 카드·이슈 상세
  헤더 세 표면에서 bound(`applied`/`unapplied`)와 unbound 칩, 그리고 일괄 창 `칩` 탭.
  헤드리스 최소 뷰포트 500px 주의(390은 iframe 래퍼).
- Pre-Handoff Validation 전체(`npm run tsc`·`lint`·prettier·vitest).

## 구현 unit 후보

- unit-01 서버: `exec-preset-store` `chip_bindings` + `impl-preset-bind` + delete 연동 +
  스냅샷(§3), `chip-preset-toggle`(§4), `dispatchPreset` 우선순위(§7), protocol.md(§8).
- unit-02 클라이언트: `area-judgement`·칩 상태·bound 클릭 경로·팝업 문구(§5), `칩` 탭(§6),
  스크린샷(§9).

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| ---- | ---------- | ---------------- | --------- | ---------------- | ------- |
| 형제 | dotfiles | awaited_by_consumer | 다른 저장소가 소유하는 계약 어휘(`frontend`·`backend` 라벨의 정의·판정 시점·공존 규칙·checker·테스트); beads-ui는 그 어휘의 소비자라 이 라벨을 그리는 §5.4가 이 계약을 전제한다 | 없음 | dotfiles-kp4c |

- 이 Bead(UI-wg68)는 `bd dep add UI-wg68 dotfiles-kp4c --type blocks`로 그 형제를 기다린다
  (foreign issue dependency; 구현 진입만 막는다, ADR 0020). 형제의 스펙은 이 세션이 dotfiles
  저장소에 함께 썼다(`docs/superpowers/specs/2026-09-22-area-labels-frontend-backend-design.md`).
- 관찰: 기존 Bead에 `frontend`·`backend`를 소급해 붙이는 일은 하지 않는다 — 라벨은 사람이
  언제든 붙일 수 있고(계약 `freely mutable`) 칩은 그때 나타난다.
- 관찰: `페이블 → 아스트라`(구 페이블 복잡)를 복잡 칩에 수동 적용하던 규칙(세션 메모리)은 이
  기능이 대체한다 — 바인딩 초기값은 비어 있고 사용자가 `칩` 탭에서 고른다.
- 결정: `기본 프리셋` 바인딩은 두지 않는다 — 저장소별 적용 프리셋이 기본값이고, 서버 전역
  fallback 층은 dispatch 해석 사다리와 attempt 귀속을 함께 바꾸므로 사용자가 배제했다.

## 결정 (ADR 후보)

- 전제: ADR UI-xq3h — 이슈의 프리셋 정체성은 `applied_exec_preset` id 하나이고 어긋남은 읽을 때
  17키 대칭 비교로 계산하며, 카드 비교와 `dispatchPreset`을 합치지 않는다. 이 조항들은 그대로
  따른다. 다만 같은 ADR의 "쓰는 경로는 `apply-impl-preset` 하나다 — 개별 키 편집·전역 적용·프리셋
  삭제는 이 키를 건드리지 않는다" 조항은 아래 첫 후보가 뒤집는다(`chip-preset-toggle`이 두 번째
  작성자가 되고 복원이 이 키를 지운다).
- 전제: ADR UI-e1ta — 모니터 탭 헤더 `⚙`의 일괄 창은 여는 순간의 모드로 고정되고 저장소 적용
  op를 새로 두지 않으며 프리셋 관리를 갖는다. 다만 "일괄 창은 `워커`·`세션`·`계정` 세 탭이다"
  조항은 아래 둘째 후보가 뒤집는다(네 번째 탭 `칩`).
- 전제: ADR 0012 — beads-ui는 dotfiles 계약의 소비자다. `frontend`·`backend` 어휘는 코드 상수로
  복제하고 계약에 없는 라벨은 그리지 않는다.
- 전제: ADR 0014 — 카드의 줄 순서와 새 요소의 자리는 공유 슬롯 표가 정한다. 새 칩 둘은
  `복잡`의 자리에 잇고 슬롯 표 한 줄을 갱신한다.
- 전제: ADR 0025 — 이슈 상세는 스냅샷 세대에서 투영한다. 새 키 둘은 기존 metadata 투영을 탄다.
- 전제: ADR dotfiles/dotfiles-23ev — 복잡 판정은 `complex` 라벨과 `complex_reason` 신호다. 이
  설계는 그 판정을 읽기만 한다.

- 판정 칩 `복잡`·`frontend`·`backend`의 클릭은 이슈의 실행 설정을 바꾼다 — 모니터 설정의
  서버 전역 바인딩이 가리키는 프리셋을 적용하고, 재클릭은 첫 칩 클릭 전 핀으로 되돌린다. 이
  결정이 칩 문법 스펙 UI-8x90 §4.5·§5.1의 "카드 위 칩은 상태를 쓰지 않는다 — 판정 칩 클릭은
  사유 팝업" 결정을 세 칩에 한해 뒤집는다(그 결정은 ADR로 물질화되지 않았으므로 supersede
  대상 ADR은 없다; 다른 판정 칩은 그대로다). 되돌리기 어렵다 — 이슈에 새 키 둘이 남고
  `exec-presets.json` 스키마가 늘며 클릭 의미를 아는 사용자 습관이 생긴다. 맥락 없이는
  놀랍다 — 같은 카드의 다른 판정 칩은 팝업인데 세 칩만 상태를 쓰는 이유(프리셋별 성능 비교
  실측과 오터치보다 한 번 클릭을 택한 사용자 결정)는 코드에 남지 않는다. 진짜 트레이드오프가
  있다 — 팝업 안 버튼 절충안을 사용자가 배제했다. 이 결정은 ADR UI-xq3h의 "`applied_exec_preset`을
  쓰는 경로는 `apply-impl-preset` 하나" 조항을 뒤집는다 — `chip-preset-toggle`이 같은 argv 규칙으로
  이 키를 쓰고 복원이 지운다; id 하나 정체성·17키 대칭 비교·`dispatchPreset` 분리는 승계한다.
  `summary`: "판정 칩 복잡·frontend·backend의 클릭은 모니터 설정의 서버 전역 바인딩이 가리키는 프리셋을 그 이슈에 적용하고 재클릭은 첫 클릭 전 핀으로 되돌리며 그 전이는 이슈별로 직렬화된다 — applied_exec_preset을 chip-preset-toggle도 쓴다는 점만 UI-xq3h에서 뒤집고 id 하나 정체성·17키 대칭 비교·dispatchPreset 분리는 승계한다" → ADR, supersede UI-xq3h
- 모니터 일괄 창에 서버 전역 값을 편집하는 네 번째 탭 `칩`을 두는 것. 되돌리기 어렵다 — 탭은
  지우기 쉬우나 바인딩을 세우는 유일한 표면이라 지우면 §3의 상태를 세울 곳이 없어지고, 일괄 창이
  "저장소 단위 편집면"이라는 UI-e1ta의 성격에 서버 전역 면이 섞이는 구조 변화다. 맥락 없이는
  놀랍다 — 세 탭은 저장소를 고르는데 네 번째 탭만 `적용 대상`과 무관한 이유는 창을 보면 드러나지
  않는다. 진짜 트레이드오프가 있다 — 단일·레포 창의 `워커` 탭(프리셋 CRUD 자리) 안에 바인딩을
  두는 대안이 실재했고, 저장소 창에 서버 전역 값을 섞지 않으려고 버렸다. 이 결정이 ADR UI-e1ta의
  "일괄 창은 `워커`·`세션`·`계정` 세 탭" 조항을 뒤집는다; 모드 고정·순차 op·관측 넷·프리셋 관리·
  레포 카드 다이얼로그는 승계한다.
  `summary`: "모니터 일괄 창은 워커·세션·계정에 서버 전역 칩 바인딩을 편집하는 네 번째 탭 칩을 더하며 그 탭만 적용 대상 저장소와 무관하다 — 모드 고정·순차 op·관측 넷·프리셋 관리·레포 카드 다이얼로그는 UI-e1ta를 승계한다" → ADR, supersede UI-e1ta
- 바인딩을 `exec-presets.json`의 `chip_bindings`로 같은 revision CAS 아래 두는 것. 되돌리기
  어렵지 않다 — 필드 하나를 다른 파일로 옮기는 일이고 소비자는 스냅샷 하나다. 맥락 없이도
  놀랍지 않다 — 프리셋 id를 가리키는 값이 프리셋 목록 옆에 있는 것은 읽으면 이유가 보인다.
  진짜 트레이드오프는 있었다 — 별도 파일·kv 대안(§2). 첫 두 조건이 떨어진다. → ADR 아님
- attempt의 `exec_preset`이 이슈의 `applied_exec_preset`을 워크스페이스 기록보다 먼저 읽는 것.
  되돌리기 어렵지 않다 — `dispatchPreset`의 인자 선택 한 곳이다. 맥락 없이는 다소 놀랍지만
  함수 주석과 테스트가 "이슈가 실제로 들고 간 프리셋"이라는 질문을 그 자리에서 말한다. 진짜
  트레이드오프가 있다 — 워크스페이스 기록만 쓰는 현행은 비교탭이 칩 프리셋을 묻어 버린다.
  첫 조건에서 떨어진다. → ADR 아님
