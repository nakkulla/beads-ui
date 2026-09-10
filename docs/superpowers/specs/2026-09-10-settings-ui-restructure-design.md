---
scope:
  - app/views/settings-dialog/
  - app/views/monitor/deck.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/detail-panel/index.js
  - app/utils/execution-defaults.js
  - app/styles.css
  - app/protocol.md
  - server/worker/exec-enums.js
  - server/worker/exec-preset-coordinator.js
  - server/exec-preset-store.js
  - server/ws/exec-preset-handlers.js
  - server/worker/compare-projection.js
  - server/worker/bench-runs.js
  - docs/adr/
---

# UI-7yh2 — 설정 UI 재구성: 워커·세션·계정·표시 탭, 런타임별 모델·속도 필터, quick_fix를 담는 단일 프리셋

## 1. 배경과 관측 (HEAD `260c838`)

설정 다이얼로그(`app/views/settings-dialog/index.js`)는 왼쪽 레일에 `실행`·`표시` 두 탭만 두고, `실행` 탭의
`createExecutionPane`(`execution-pane.js`, 2511줄)이 한 화면에 다음을 위에서 아래로 쌓는다(`paneTemplate()`
`:1930-2474`).

| 순서 | 그룹 | 편집 대상 | 관측 |
|---|---|---|---|
| 1 | 프리셋 바 | 프리셋 선택·`일반에 적용`·`quick_fix 레인에 적용`·이름·저장·삭제, 아래에 `일반/quick_fix` 레인 탭과 diff 미리보기 | 버튼 둘·탭 둘이 "같은 프리셋을 어느 레인에 넣을지"를 사용자에게 묻는다 |
| 2 | 오케스트레이션 | 큐 `orchestration_model/effort/speed` + UI 전용 `런타임` 필터(`전체/claude/codex`) | 필터 기본이 `전체`라 모델 목록에 두 provider가 섞인다; `속도` 행은 runtime과 무관하게 `default/fast`를 낸다 |
| 3 | 실행 계정 | kv `claude_account/codex_account`, 큐 `provider_limit_policy` (한도 대응·전환 허용 계정·선제 전환) | 프리셋과 무관한 저장소별 계정 설정이 실행 프로파일 사이에 끼어 있다 |
| 4 | 워크플로우 | kv `workflow_mode`, `bdui_url`, `base_sync_accept_local_commits` | Worker는 항상 `fast_track`이라 `모드`는 대화형 세션 전용인데 실행 프로파일 안에 있다 |
| 5 | 리뷰 게이트 | kv `spec/plan/impl_review_model/effort/speed` | `속도`가 모델의 provider와 무관하게 늘 보인다 |
| 6 | 구현 | kv `impl_runtime/model/effort/speed` | `속도`가 `claude`에서도 보인다 |
| 7 | quick_fix 레인 | 큐 `quick_fix_orchestration_*` 3키 + kv `quick_fix_impl_dispatch/runtime/model/effort/speed` | `실행 방식=main`이어도 위임 대상·모델·effort·속도 4행이 그대로 보인다 |
| 8 | 자동화 | 큐 `auto_advance`·`auto_merge`·`slots`·`serial_lane_count` | Worker 툴바(`app/views/worker/index.js:3544-3626`)가 같은 4개 op를 별도 구현으로 이미 편집한다 |
| 9 | 워커 시스템 프롬프트 | 읽기 전용 | — |

사실 관계:

- 속도(`service_tier`)는 Codex 전용이다. 러너 카탈로그가 `claude` 러너의 `speed_tiers`를 `['default']`로만
  허용한다(`server/worker/runner-catalog.js:177`, `isValidSpeedTiers`). Claude 러너는 `fast`를 받을 수 없는데
  화면은 걸러 주지 않는다.
- 자동화 4개 값은 Worker 툴바와 설정 탭이 **같은 큐 필드·같은 op**(`worker-automation-toggle`,
  `worker-merge-auto-toggle`, `worker-queue-set-slots`, `worker-queue-set-serial-lane-count`)를 두 벌의 템플릿·두
  벌의 상한 상수(`SERIAL_LANE_MAX`)로 편집한다. 저장소는 하나라 값이 갈라질 수는 없고, 사용자가 본 "드리프트"는
  다이얼로그가 연 시점의 스냅샷을 그리는 동안 Worker 툴바가 새 스냅샷을 받는 표시 시차다(재현은 하지 않았다 —
  중복 편집면을 없애면 시차 자체가 사라진다).
- 프리셋은 레인 무관 18키(`IMPL_PRESET_KEYS` = `BEAD_APPLY_KEYS` 15 + `ORCHESTRATION_KEYS` 3,
  `session-model.js:166`)이고 quick_fix 키를 갖지 않는다. `quick_fix 레인에 적용`은 같은 18키를
  `QUICK_FIX_LANE_MAP`(8키)으로 옮겨 적용하고 리뷰 3×3·`workflow_mode`를 `skipped_keys`로 돌려준다
  (ADR UI-s8qn, 2026-09-10 착지). 저장은 일반 행의 값만 담는다.
- 오늘 교체된 5개 프리셋(`scripts/lib/exec-presets-plan.mjs` `TARGET_PRESETS`)은 11키만 갖고
  `workflow_mode`·`impl_dispatch`·`impl_speed`·`orchestration_speed`를 이미 비워 둔다.
- 이슈별 프리셋 컨트롤(`실행 프리셋` select + `이 이슈에 적용`)은 상세 패널 유효 실행 설정 카드의 **바닥**
  `.detail-effective__foot`(`app/views/detail-panel/effective-settings-view.js:394-429`)에 있다.
- `impl_dispatch`는 계약상 `user_write_only`라 워크스페이스 kv에 없고 이슈 pin에만 있다
  (`session-model.js:52-60`); 워크스페이스 층의 실행 방식은 `quick_fix_impl_dispatch` 하나다.
- 모니터 덱의 저장소별 `⚙` 패널은 같은 `createExecutionPane`을 `root_dir`만 다르게 마운트한다(UI-eey2 §4.4).

## 2. 목표

한 번 열어서 "이 설정이 누구에게 무엇을 정하는가"를 파악할 수 있게 한다. 값의 저장 위치(kv·큐)와 계약 어휘
(ADR 0012·0013)는 바꾸지 않는다.

비목표: 새 색·서체·아이콘 체계, 워커 툴바 자체의 재설계, 프리셋 이름·5개 프리셋 값 변경, `표시` 탭 변경,
dotfiles 계약 키 추가·삭제.

## 3. 결정

1. **레일은 `워커`·`세션`·`계정`·`표시` 네 탭이다.** 값의 소비자가 탭을 정한다 — 워커·세션이 공유하는 실행
   프로파일은 `워커`, 대화형 세션만 읽는 값은 `세션`, 저장소별 계정·한도 정책은 `계정`, 화면 표시는 `표시`.
   `createExecutionPane`은 한 상태 기계(세션 초안·큐 초안·프리셋)로 남고 `render(section)`으로
   `worker|session|account` 중 하나를 그린다. 다이얼로그는 탭마다 호스트 하나를 두고 활성 탭만 렌더한다.
   모니터 덱 `⚙` 패널은 패널 머리에 같은 세 이름의 세그먼트(`워커/세션/계정`)를 두고 같은 `render(section)`을
   부른다 — 탭 UI를 두 벌 만들지 않고, 세그먼트 템플릿은 `execution-pane.js`가 export한다.
2. **`워커` 탭 = 프리셋 바 + 오케스트레이션 + 구현 + 리뷰 게이트 + quick_fix + 워커 시스템 프롬프트.**
   `모드`·`beads-ui 주소`·`base 동기화`·실행 계정·한도 정책·자동화는 이 탭에 없다.
3. **런타임을 고르면 그 provider의 모델만 보인다.** 오케스트레이션의 `런타임`은 `전체` 없이 `claude|codex`이고
   초기값은 저장된 `orchestration_model`의 러너(모델이 비어 있으면 투영 기본 모델의 러너)다. 바꾸면 모델 목록이
   그 러너로 좁혀지고, 현재 모델이 그 러너에 없으면 모델·effort 초안을 비운다(`onImplTargetChange`와 같은
   narrow-then-save). 구현의 `위임 대상`은 `auto|claude|codex` 그대로이며 `auto`는 두 provider를 모두 낸다
   (ADR UI-s8qn 유지).
4. **`속도` 행은 그 행의 유효 provider가 `codex`일 때만 그린다.** 판정은 카탈로그다 — 러너의 `speed_tiers`가
   둘 이상일 때만 보인다(`codex` 문자열을 코드에 박지 않는다). 행별 provider: 오케스트레이션 = 런타임 선택값;
   구현 = `impl_runtime`이 구체면 그 값, `auto`면 exact `impl_model`의 러너(`deriveModelRuntime`), 둘 다 없으면
   `null`(숨김); 리뷰 게이트 = 선택한 리뷰 모델의 러너(`codex`·`astra`는 codex, `opus`·`fable`은 claude,
   `self`·`skip`·미설정은 `null`); quick_fix 오케스트레이션·구현은 같은 규칙을 `quick_fix_*` 키로 적용한다.
   숨는 순간 그 행의 초안 값은 비운다(narrow와 같은 저장 경로) — 러너가 받지 않는 `fast`를 남기지 않는다.
5. **quick_fix 그룹은 `실행 방식`이 `delegated`로 해석될 때만 위임 대상·모델·effort·속도를 그린다.**
   판정값은 `resolveExecutionSettings(route:'quick_fix')`의 유효 `impl_dispatch`(핀 없음·워크스페이스 층)다.
   `main`(하네스 기본 포함)이면 4행이 사라지고 hint 한 줄 `메인 세션이 직접 구현합니다`만 남는다. 숨은 행의
   저장값은 건드리지 않는다 — `delegated`로 돌아오면 그대로 보인다.
6. **프리셋은 quick_fix 값을 함께 담는 워크스페이스 실행 프로파일이고, 적용은 한 번이다.** `IMPL_PRESET_KEYS`는
   `workflow_mode`를 빼고 `QUICK_FIX_ORCHESTRATION_KEYS` 3 + `QUICK_FIX_KV_KEYS` 5를 더한 **25키**다. 프리셋 바의
   버튼은 `적용` 하나로, kv `PRESET_KV_KEYS ∪ QUICK_FIX_KV_KEYS`와 큐 `ORCHESTRATION_KEYS ∪
   QUICK_FIX_ORCHESTRATION_KEYS`를 프리셋 값으로 **교체**한다(프리셋에 없는 키는 unset → quick_fix 키는 일반
   프로파일로 폴스루, 기존 의미). `일반/quick_fix` 레인 탭·`lane` payload·적용 시 `QUICK_FIX_LANE_MAP` 파생·
   `lane_incompatible`·`skipped_keys`는 없앤다. `현재 설정으로 저장/덮어쓰기`는 워커 탭의 모든 행(quick_fix 행
   포함)을 담는다. 비어 있는 quick_fix 행은 키 부재로 저장된다. 오늘의 5개 프리셋은 quick_fix 키가 없으므로
   적용하면 quick_fix 레인이 일반 프로파일로 폴스루한다 — 지금 kv 상태와 같다(UI-s8qn §3.8은 `impl_model=auto`만
   해제하고 `quick_fix_impl_runtime=codex`를 남겼는데, 그 값은 이번 적용에서 unset되어 폴스루 값 `codex`와 같은
   유효값을 낸다). ADR UI-s8qn의 "레인 무관 프리셋·두 레인 적용" 조항을 뒤집으므로 supersede한다.
7. **`workflow_mode`는 프리셋에서 빠지고 `세션` 탭에 산다.** 저장된 사용자 프리셋에 `workflow_mode`가 남아
   있으면 코디네이터의 legacy 필터(`isLegacyPreset`, `exec-preset-coordinator.js:67-71`)가 프리셋을 통째로
   숨기고 `resolvePresetForApply`(`exec-preset-handlers.js:284-312`)가 적용을 거절하므로, 프리셋 저장소가
   **디스크에서 읽을 때** 그 한 키만 떼어낸다(`exec-preset-store.js` 로드 정규화; 다른 미지 키는 현행 legacy
   처리 그대로). 쓰기는 현행 `settingEnums` 검사가 거절한다. 이슈별 적용(`apply-impl-preset`)이 핀으로 쓰는
   `BEAD_APPLY_KEYS`도 `workflow_mode`를 뺀 14키다 — 이슈의 모드는 프리셋이 정할 값이 아니다.
8. **이슈별 적용은 이슈의 route를 본다.** `route=quick_fix` 이슈에 프리셋을 적용하면 프리셋의
   `quick_fix_impl_dispatch/runtime/model/effort/speed` 5키를 `impl_*`로 역매핑해 핀으로 쓰고, 프리셋에 그 키가
   없으면 일반 키 값을 쓴다(워크스페이스 폴스루와 같은 규칙). 오케스트레이션 키는 현행대로 핀하지 않는다
   (`skipped_orchestration_keys`). 그 외 route는 현행대로 일반 키다.
9. **이슈별 프리셋 컨트롤은 유효 실행 설정 카드의 머리로 올린다.** 카드 제목 줄 오른쪽에 `[프리셋 ▾] [이 이슈에
   적용]`을 두고 `.detail-effective__foot`은 없앤다. hint `세션 키 14개를 핀으로 기록`은 select의 `title`로
   옮긴다. 카드는 ADR 0014 슬롯 표의 대상(워커·모니터 카드)이 아니다.
10. **`세션` 탭 = 워크플로우 모드 + 고급.** `모드` 세그먼트(`기본/standard/fast_track`) 아래 한 줄
    `Worker는 항상 fast_track으로 돕니다. 이 값은 대화형 세션의 기본입니다.` 그 밑 `고급` 그룹에 `beads-ui 주소`
    (`bdui_url`)와 `base 동기화`(`base_sync_accept_local_commits`)를 둔다. `beads-ui 주소` 행에는
    `현재 주소 사용` 버튼을 더해 `location.origin`을 채운다 — 이 값은 대화형 세션이 구현 진입 질문의 세 번째 답
    `Worker 레인에 배치`를 내기 위해 Worker 큐를 probe하는 주소이고, 워크스페이스마다 한 번 채우면 바뀌지 않는다.
    두 키는 dotfiles 소유 kv 어휘(ADR 0013)라 이름·의미는 그대로다.
11. **`계정` 탭 = 실행 계정 + 한도 대응.** `실행 계정` 그룹(Claude·Codex select)과 러너별 `한도 대응` 그룹
    (기다림/자동 전환, 전환 허용 계정, 선제 전환)을 현행 `accountRow`·`limitPolicyBlock` 그대로 옮긴다.
12. **자동화 그룹은 설정에서 뺀다.** `auto_advance`·`auto_merge`·`slots`·`serial_lane_count`의 편집면은 Worker
    툴바 하나다. `execution-pane.js`의 네 op 핸들러·`toggleRow`·`stepperRow`·`SERIAL_LANE_MAX`·`MIN_COUNT`를
    제거한다. ADR 0011(두 스위치 독립)은 툴바가 이미 지킨다.
13. **시각 언어는 기존 `.settings-dialog__*` 토큰이다.** 새 색·서체 없음. 이 화면에서 굵게 쓰는 요소는 `워커` 탭
    맨 위 프리셋 스트립 하나다: select·`적용`(primary)·이름·저장·삭제가 한 줄, 아래 diff 미리보기가 "바뀔 것만"
    세 열(키 · 현재 · 프리셋)로 붙는다. 나머지 그룹은 제목 한 줄과 `라벨 | 컨트롤` 행만 갖고, 조건부 행은 자리를
    남기지 않고 사라진다(`hidden` 토글이 아니라 템플릿에서 빠진다). 레일 탭 글리프는 `워커 ◆`·`세션 ◇`·`계정 ◎`·
    `표시 ◫`.

## 4. 화면

```
┌──────────────┬──────────────────────────────────────────────────────────┐
│ ◆ 워커       │ [최고효율 ▾] [적용] [이름……] [현재 설정으로 덮어쓰기] [삭제] │
│ ◇ 세션       │   바뀔 값 3 — orchestration_model opus→fable · …           │
│ ◎ 계정       │ 오케스트레이션                                            │
│ ◫ 표시       │   런타임   [claude ▾]                                     │
│              │   모델     [opus ▾]     effort [high ▾]     (속도 없음)    │
│              │ 구현        이슈 핀이 있으면 핀이 우선합니다               │
│              │   위임 대상 [codex ▾]   모델 [auto ▾]  effort [auto ▾]     │
│              │   속도     [default ▾]            ← codex라서 보임        │
│              │ 리뷰 게이트                                               │
│              │   사양 리뷰 [astra ▾] [xhigh ▾] [default ▾]               │
│              │   계획 리뷰 [fable ▾] [high ▾]                            │
│              │   구현 리뷰 [astra ▾] [xhigh ▾] [default ▾]               │
│              │ quick_fix   비어 있는 값은 일반 프로파일로 떨어집니다      │
│              │   오케스트레이션 모델 [기본값 사용 — opus ▾] effort [… ▾]  │
│              │   실행 방식 [main ▾]   메인 세션이 직접 구현합니다         │
│              │ 워커 시스템 프롬프트                          [전문 보기]  │
└──────────────┴──────────────────────────────────────────────────────────┘
```

`세션` 탭: `워크플로우` 그룹(모드 세그먼트 + 설명 한 줄) → `고급` 그룹(`beads-ui 주소` + `현재 주소 사용`,
`base 동기화` 체크). `계정` 탭: `실행 계정` 그룹 → `Claude 한도 대응` → `Codex 한도 대응`. `표시` 탭: 현행.

모니터 덱 `⚙` 패널(`deck.js:287-311` `openPanel`): 패널 제목은 `<저장소명> 실행 설정`으로 줄이고 그 오른쪽에
`[워커|세션|계정]` 세그먼트를 둔다. 본문은 같은 `render(section)`이고 열 때 `워커`로 시작한다.

## 5. 서버·프로토콜

- `apply-impl-preset-global`(`exec-preset-handlers.js:435-661`): payload에서 `lane`을 없앤다(있으면
  `bad_request`). 처리: kv `PRESET_KV_KEYS ∪ QUICK_FIX_KV_KEYS`(18키) read–merge–write + readback, 큐
  `ORCHESTRATION_KEYS ∪ QUICK_FIX_ORCHESTRATION_KEYS`(6키) CAS(`expected_queue_revision`). 응답은 현행
  `{applied, conflict, revision, values, warnings, queue_applied, queue_conflict, queue}`에서 `lane`·
  `skipped_keys`만 빠진다(`warnings`는 kv readback 경고로 남는다). `normalizeQuickFixLanePreset`
  (`exec-enums.js:335-362`)은 삭제한다. kv 먼저 큐 나중의 비원자성·`queue_applied:false`·`root_dir`·
  `session_defaults` 캐시 무효화·`worker-queue-snapshot` fanout은 현행.
- `implPresetEnums()`(`exec-enums.js`): `workflow_mode` 제거, `quick_fix_orchestration_model/effort/speed`·
  `quick_fix_impl_dispatch/runtime/model/effort/speed` 추가(각 quick_fix enum 그대로: runtime `claude|codex`,
  effort `auto` 허용, dispatch `delegated|main`). `validateImplPresetSettings`는 일반 삼중항과 같은
  provider·모델·effort 정합을 quick_fix 삼중항에도 적용하고, `quick_fix_*_speed=fast`는 provider가 codex일 때만
  받는다(카탈로그 `speed_tiers`).
- `exec-preset-store.js`: 로드 정규화가 `workflow_mode` 키를 떼어낸다(결정 7). 쓰기 검사는 현행.
- 코디네이터 스냅샷의 `compatible:false` 판정에 quick_fix 삼중항 불일치(`invalid_quick_fix_impl_runtime` 등)를
  더한다.
- `apply-impl-preset`(이슈별): 핀 키를 `BEAD_APPLY_KEYS` 14키로 줄이고, 이슈 `metadata.route=quick_fix`면 결정 8의
  역매핑을 적용한다. 응답·핀 기록 형식은 현행.
- `QUICK_FIX_LANE_MAP`은 결정 8의 역매핑과 `bench-runs.js resolveBenchTuple`(`:337-345`)의 폴백 층으로만
  남는다. 이름은 그대로 둔다(bench 소비자가 있어 이름 변경은 이득 없이 diff만 키운다).
- 비교 탭 `compare-projection.js presetMatchesSignature`(`:309-358`)는 프리셋의 모든 키를 서명과 대조하므로
  `quick_fix_*` 키가 있는 프리셋은 어느 서명 그룹의 이름도 되지 못한다(attempt `exec_values`에 그 키가 없다).
  대조 대상을 `IMPL_PRESET_KEYS` 중 `quick_fix_*`가 아닌 키로 제한한다 — bench attempt는 일반 route로 돌므로
  quick_fix 값은 실행되지 않은 축이다. 서명 `key`(`:272-275`)와 옛 run 스냅샷 표시(UI-s8qn §3.6)는 그대로다.
- `app/protocol.md`: `apply-impl-preset-global`·`apply-impl-preset`·`impl-preset-create/update` 항목 갱신.

## 6. 구현 unit 후보

1. `preset-schema-and-apply` — `exec-enums.js`(enum·검증), `exec-preset-store.js`(읽기 정규화),
   `exec-preset-coordinator.js`(단일 적용·호환 판정·이슈별 역매핑), `server/ws/exec-preset-handlers.js`,
   `compare-projection.js`(서명 대조 키 제한), `protocol.md`, 서버 테스트.
2. `pane-sections` — `session-model.js`(25키·14키 상수, `speedVisible`·orchestration narrow),
   `execution-pane.js`(`render(section)`·조건부 행·자동화 제거·프리셋 바 단일 적용·저장 범위),
   `settings-dialog/index.js`(4탭 레일), `monitor/deck.js`(세그먼트), 스타일, 클라이언트 테스트.
3. `detail-preset-head` — `effective-settings-view.js`·`detail-panel/index.js`(컨트롤 위치·14키 hint).

세 unit은 같은 워크트리에 순차로 쓴다. 1이 먼저다(2의 `적용` 버튼이 새 응답 형태를 읽는다).

## 7. Test scope

- `exec-enums.test.js`: 프리셋 enum이 quick_fix 8키를 받고 `workflow_mode`를 거절한다;
  `quick_fix_impl_speed=fast` + `quick_fix_impl_runtime=claude`가 거절된다.
- `exec-preset-store.test.js`: 저장된 `workflow_mode`가 로드에서 떨어지고 그 프리셋이 legacy로 숨지 않는다.
- `compare-projection.test.js`: `quick_fix_*` 키를 가진 프리셋이 일반 키만으로 서명 그룹의 이름이 된다.
- `exec-preset-coordinator.test.js`: 단일 적용이 kv 18키·큐 6키를 교체하고 프리셋에 없는 quick_fix 키를 unset한다;
  `lane` payload는 `bad_request`; quick_fix route 이슈 적용이 역매핑·폴스루로 핀을 만든다; `compatible:false`에
  quick_fix 불일치 사유가 든다.
- `session-model.test.js`: `IMPL_PRESET_KEYS` 25·`BEAD_APPLY_KEYS` 14; `speedVisible`이 카탈로그 `speed_tiers`로
  판정한다(claude 숨김·codex 표시·`auto`+exact codex 모델 표시·`auto`+`auto` 숨김·리뷰 `astra` 표시·`self` 숨김);
  오케스트레이션 런타임 narrow가 다른 러너의 모델을 비운다; 서버 `IMPL_PRESET_KEYS`와 동일성.
- `execution-pane.test.js`: `render('worker')`에 자동화 행·모드·주소·계정이 없다; `render('session')`·
  `render('account')` 내용; 실행 방식 `main` 해석 시 quick_fix 위임 4행 부재, `delegated`면 존재; 속도 행 조건;
  `적용` 한 번이 새 payload(`lane` 없음)를 보낸다; 저장 payload에 quick_fix 행 값이 든다; 레인 탭·두 버튼 부재.
- `settings-dialog/index.test.js`: 레일 4탭, 활성 탭만 렌더, `open('account')`.
- `monitor/deck.test.js`: `⚙` 패널 세그먼트가 `render(section)`을 바꾼다.
- `effective-settings-view.test.js`·`detail-panel/index.test.js`: 프리셋 컨트롤이 카드 머리에 있고 foot이 없다.
- RED seam: 위 각 파일에서 새 동작 단언을 먼저 쓴다(`tdd`).

## 8. 검증 범위

- 저장소 기본: `npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`, `npx prettier --write` 변경 파일.
- 배포 뒤 공유 서버에서 설정 다이얼로그 4탭·모니터 `⚙` 세그먼트·상세 카드 머리 스크린샷으로 확인한다(사용자
  결정: UI 변경 후 스크린샷 검증).
- 라이브 프리셋 5개는 값 변경 없이 새 스키마를 통과한다(quick_fix 키 부재 = 유효). `적용` 한 번 뒤 kv readback에서
  `quick_fix_impl_runtime`이 unset이고 유효 quick_fix runtime이 폴스루 `codex`인지 확인한다.

## 9. 경계·후속

- 관찰: Worker 툴바의 동시 실행·직렬 레인 컨트롤 자체의 재배치는 요청 없음 — 이번엔 설정 쪽 중복만 없앤다.
- 관찰: 오케스트레이션 `런타임`이 큐에 저장되지 않는 UI 상태라는 점은 그대로다(저장 키는 `orchestration_model`뿐).
- 관찰: `bdui_url`을 서버가 자동으로 채우는 안은 채택하지 않았다 — 다른 호스트를 가리키는 사용자 값을 덮을 수
  있고, ADR 0013의 kv 소유권을 서버 쪽 writer로 넓힌다. `현재 주소 사용` 버튼이 같은 편의를 준다.

## 결정 (ADR 후보)

- 전제: ADR 0013 — 세션 기본값 kv는 dotfiles 소유이고 beads-ui는 소비자다; 키 이름·의미를 바꾸지 않고 배치만
  옮긴다.
- 전제: ADR 0012 — 계약 어휘는 코드 field registry 복제로 소비한다; `IMPL_PRESET_KEYS`·`BEAD_APPLY_KEYS`는 그
  registry의 부분집합 재배열이다.
- 전제: ADR 0011 — 자동화·머지 두 스위치는 독립이다; 편집면을 툴바 하나로 줄여도 그 독립성은 툴바가 지킨다.
- 전제: ADR 0014 — 워커·모니터 카드 슬롯 표; 상세 패널 카드는 대상이 아니고 모니터 `⚙` 패널은 카드가 아니다.
- **프리셋은 quick_fix 값을 함께 담는 25키 워크스페이스 실행 프로파일이고 적용은 kv·큐의 일반·quick_fix 키를
  한 번에 교체하며 quick_fix 키 부재는 일반 프로파일 폴스루다; `workflow_mode`는 프리셋 밖이다** — 되돌리기
  어려움: 성립(프리셋 저장 데이터·적용 프로토콜·이슈별 역매핑이 함께 바뀐다) / 맥락 없이 놀라움: 성립("왜 quick_fix
  레인에 적용 버튼이 없나", "왜 프리셋에 모드가 없나") / 실제 트레이드오프: 성립(레인 무관 18키 + 두 번 적용 vs
  25키 + 한 번 적용; 전자는 quick_fix를 프리셋으로 표현할 수 없고 후자는 편집 행이 늘지만 조건부 행으로 감춘다).
  `summary`: "실행 프리셋은 quick_fix 오케스트레이션·구현 키를 함께 담는 25키 워크스페이스 프로파일이고 적용 한
  번이 kv·큐의 일반·quick_fix 키를 교체하며 프리셋에 없는 quick_fix 키는 unset되어 일반 프로파일로 폴스루한다;
  workflow_mode는 프리셋과 이슈 핀 밖의 세션 기본값이고 이슈별 적용은 route=quick_fix면 quick_fix 값을 역매핑해
  핀한다" → ADR, supersede UI-s8qn
- 속도 행·quick_fix 위임 행의 조건부 표시, 탭 분리, 자동화 그룹 제거, 컨트롤 위치 — 되돌리기 어려움: 불성립
  (클라이언트 렌더 코드 안의 값; 저장 데이터·프로토콜이 남지 않는다) / 맥락 없이 놀라움: 불성립(화면에 보이는
  그대로이고 카탈로그·해석 결과를 따른다) / 실제 트레이드오프: 불성립 → ADR 아님
