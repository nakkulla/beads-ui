---
scope:
  - server/worker/exec-enums.js
  - server/worker/exec-enums.test.js
  - server/worker/policy.js
  - server/worker/policy.test.js
  - server/ws/mutation-handlers.js
  - server/ws/exec-settings-mutation.test.js
  - server/worker/exec-preset-coordinator.js
  - server/worker/exec-preset-coordinator.test.js
  - app/views/settings-dialog/session-model.js
  - app/views/settings-dialog/session-model.test.js
  - app/views/settings-dialog/execution-pane.js
  - app/views/detail-panel/exec-settings.js
  - app/views/detail-panel/exec-settings.test.js
  - app/utils/execution-defaults.js
  - app/utils/execution-defaults.test.js
  - app/protocol.md
  - generated/contracts/execution-defaults.json
  - generated/contracts/execution-defaults.provenance.json
  - scripts/exec-presets-replace.mjs
  - scripts/lib/exec-presets-plan.mjs
  - scripts/lib/exec-presets-plan.test.mjs
  - repo-ops/post-merge.d/
  - docs/adr/
---

# UI-s8qn — `impl_runtime` auto 소비: enum·검증·표시, 투영 pin 갱신, 프리셋 13개 → 5개 교체

## 1. 배경과 관측 (HEAD `71eba22`)

dotfiles-nv53(dotfiles PR #497, 2026-09-10 머지)이 `impl_runtime` 어휘를 `inherit|claude|codex`에서
`auto|claude|codex`로 바꿨다. `auto`는 "총괄이 위임 unit마다 Claude·Codex provider를 고르고 선택기가
결속·기록한다"는 뜻이고, Codex tier에 `implementation_hard: gpt-6-astra`, 기본 리뷰어 `astra`가 더해졌다
(ADR dotfiles/dotfiles-nv53, ADR dotfiles/dotfiles-nv53-2, ADR dotfiles/dotfiles-nv53-4, ADR dotfiles/dotfiles-nv53-5).
beads-ui는 그 어휘의 소비자다.

관측(수집 2026-09-10):

- 어휘가 네 곳에 손으로 복제되어 있다 — `server/worker/exec-enums.js:80` `IMPL_RUNTIMES`, 같은 파일
  `validateImplSettings`의 문자열 비교(`:531`, `:540`), `app/views/settings-dialog/session-model.js:221`
  `IMPL_RUNTIMES`와 `narrowImplTarget`(`:435`), `app/views/detail-panel/exec-settings.js`의
  `normalizeImplTarget`(`:497`, `:503`)과 행 빌더의 리터럴 배열 `['inherit','claude','codex']`(`:579`,
  `:565`, `:586`, `:606`). 어느 것도 dotfiles 투영을 읽지 않는다.
- `inherit`의 의미는 "컨트롤러(오케스트레이션 모델)의 provider를 따른다"였고, 서버·클라이언트가 그 provider를
  유도해 모델·effort 정합을 판정했다(`controller_runtime_required` 사유 포함).
- beads-ui는 `impl_runtime`으로 프로세스를 띄우지 않는다. `policy.js`·`attach.js`는 검증·표시만 하고, 실제
  dispatch는 dotfiles 하네스가 한다. `validateImplSettings`는 enum 밖 값을 `invalid_impl_runtime`으로
  거부하므로 갱신 전 서버는 `auto`를 fail-closed로 막는다.
- dotfiles 투영 `generated/contracts/execution-defaults.json`은 beads-ui 트리에 바이트 단위로 pin되어
  있고(`provenance.json`: `source_commit 9cffafde…`), 지금 dotfiles 정본과 `review.default`·
  `plan_review.*`가 `codex`↔`astra`로 다르다. 갱신 스크립트는 없다.
- 라이브 프리셋 13개(revision 55)는 전부 `impl_runtime ∈ {claude, codex}`이고 `inherit`은 없다. 두 rig
  워크스페이스 kv는 `impl_runtime=claude · impl_model=opus · 리뷰 3종 astra`다. bench 행은 생성 시점의
  프리셋 스냅샷(`run.presets`)을 쓰므로 프리셋 삭제 뒤에도 옛 이름·값을 그대로 보인다.
- `AUTO_LITERAL='auto'`는 `impl_model`·`impl_effort`의 "선택기 상태"로 이미 쓰이며,
  `server/ws/mutation-handlers.js:322` guard는 `impl_runtime`만은 항상 `update-impl-target` 원자 쓰기로
  보낸다. 그런데 그 핸들러의 `exactImplValues`(`:349`)는 세 키 모두에서 `auto`를 떨어뜨리므로 지금 서버는
  `{auto, sol, high}` 저장을 `impl_runtime_required`로 거부하고, `{auto, auto, auto}`는 검증할 값이 없어
  그대로 저장한다(구 서버 호환의 실제 경계).
- 설정 화면의 effort 선택지 `effortUnion`(`session-model.js:317`)은 runtime이 `claude`/`codex`가 아니면
  모든 runner를 건너뛰어 `auto`만 남긴다. `narrowImplTarget`의 세 번째 인자 `controller_runtime`은
  `execution-pane.js:712`가 넘긴다. 알 수 없는 runtime이면 `narrowImplTarget`은 입력을 그대로 돌려준다
  (`:438`).
- `apply-impl-preset-global`(`server/ws/exec-preset-handlers.js:547-`)은 kv를 먼저 쓰고 큐
  `setOrchestrationDefaults`가 실패하면 `applied:true, queue_applied:false`를 돌려준다(ADR 0032
  Consequences의 비원자성). quick_fix 레인 enum은 `quick_fix_impl_effort`에 `auto`를 허용한다
  (`exec-enums.js:314`).
- Worker의 정리 cursor는 `repo_operations`(deploy) 뒤에 `post_merge_jobs` 단계를 두고
  `repo-ops/post-merge.d/<name>` 실행 파일을 파일명 순으로 한 번 실행하며 원장 키 `<파일명>@<blob SHA>`를
  `queue.json`에 남긴다(ADR 0030, `server/worker/pr-actions.js:132`).

## 2. 목표

dotfiles 계약이 정한 `auto|claude|codex`를 소비한다: enum·정합 검증·표시를 `auto`의 뜻("실행 시 총괄이
정함")에 맞추고, 투영 pin을 dotfiles 머지 커밋으로 갱신하며, 프리셋을 사용자 결정대로 5개로 교체하고 kv
기본값에 최고효율을 적용한다. 가이드 본문(`references/model-selection.md`)은 이 저장소가 갖지 않는다.

## 3. 결정

1. **enum은 `auto|claude|codex`다. `inherit`은 제거하고 이관하지 않는다.** 서버 `IMPL_RUNTIMES`와
   클라이언트 `IMPL_RUNTIMES`를 함께 바꾸고, `exec-settings.js`의 리터럴 배열은 `session-model.js`의 export를
   쓴다. 두 복제본이 같음을 단언하는 테스트를 하나 둔다. 저장된 `inherit`(프리셋·Bead pin)은 이관하지 않는다
   — 현재 0건이며, 생기면 코디네이터 스냅샷이 `compatible:false / invalid_impl_runtime`으로 드러내고 적용은
   `impl_preset_incompatible`로 거절하는 기존 동작이 처분이다. `quick_fix_impl_runtime` enum
   (`claude|codex`)은 그대로다. 저장된 `inherit` 프리셋은 두 레인 모두 적용이 거절된다 — ADR 0032가 "quick_fix
   레인에서 그 키만 해제"로 적었던 동작을 뒤집으므로 그 ADR을 supersede한다(ADR 후보 절).
2. **`auto`는 provider를 유도하지 않는다.** 검증·정규화의 effective runtime은 (a) `claude`/`codex`면 그 값,
   (b) `auto`이고 exact `impl_model`이 있으면 그 모델의 provider(dotfiles 선택기와 같은 "모델 토큰이
   provider를 정한다" 규칙), (c) `auto`이고 모델도 `auto`/부재면 `null`(판정 없음)이다. 오케스트레이션 모델의
   provider를 따르던 `inherit` 규칙과 `controller_runtime_required` 사유는 폐기한다.
   - `validateImplSettings`: `auto`에서 `provider_model_mismatch`는 성립할 수 없고(모델이 provider를
     정함), effort는 exact 모델이면 그 모델의 effort, 아니면 `catalogEfforts` 합집합으로 검사한다. 출력
     `impl_runtime`은 `auto` 그대로다. `options.controller_runtime`은 남겨도 `auto`에는 쓰지 않는다.
   - `policy.js` `normalizeImplLayer`/Bead 해소: 명시 `auto`는 사실 `impl_runtime='auto'`,
     `impl_runtime_inferred=false`. 모델 전용 레거시 추론(`inferImplRuntime`)은 그대로다.
   - `exec-settings.js` `normalizeImplTarget`: `auto`는 exact 모델을 어느 provider든 유지하고 effort는 그
     모델의 목록으로 좁힌다. 컨트롤러를 모를 때 모델·effort를 비우던 `inherit` 분기는 사라진다. 행 빌더는
     `auto`에서 `impl_model` 옵션을 두 provider 모두(`modelGroups` 전체), `impl_effort`는 exact 모델의
     목록 또는 `catalogEffortUnion`으로 내고 `disabled`는 없다.
   - `session-model.js` `implModelOptions(auto)`는 모든 모델, `narrowImplTarget(auto)`는 exact 모델의
     provider로만 좁히고 모델이 `auto`면 아무것도 좁히지 않는다. `controller_runtime` 인자는 제거한다.
   - `mutation-handlers.js` `exactImplValues`는 `impl_model`·`impl_effort`의 `auto`만 떨어뜨리고
     `impl_runtime='auto'`는 보존해 `validateImplSettings`에 넘긴다. 그래야 `{auto, sol, high}`가 (b)로
     통과하고 `{auto, opus, max}`가 `illegal_impl_effort`로 거절된다. `:322` guard의 동작은 유지하되 주석을
     `auto`의 새 뜻으로 고친다: `impl_runtime`은 값이 `auto`여도 `update-impl-target`으로만 바뀐다.
   - `session-model.js` `effortUnion`/`implEffortOptions`/`orchestrationEffortOptions`: runtime이 `auto`면
     모든 runner를 포함하고(exact 모델이 있으면 그 모델로만 좁힘), 결과는 `auto` + 두 provider의 합집합이다.
     `narrowImplTarget(target, catalog)`로 시그니처를 줄이고 `execution-pane.js:712` 호출부를 맞춘다.
3. **표시는 `auto (실행 시 결정)`이다.** `app/utils/execution-defaults.js`에 `REVIEWER_OPTION_LABELS`와 같은
   꼴로 `IMPL_RUNTIME_OPTION_LABELS = { auto: 'auto (실행 시 결정)' }`를 두고, 상세 패널 행 빌더의
   `valueGroups`와 설정 화면의 위임 대상 옵션이 그 라벨을 쓴다. `claude`/`codex`는 라벨 없이 그대로다.
   dispatch facts 카드(`attach.js`)는 문자열 pass-through라 바꾸지 않는다.
4. **투영 pin을 dotfiles `6d50d519d…`(PR #497 머지 커밋)의 파일로 갱신한다.** `generated/contracts/
   execution-defaults.json`을 그 blob(`a50f950c18535ef62a97a5a344dc6988357b7be0`, 2910 bytes, sha256
   `8dcfe7a93c8c3ed562bb689ed53c7adc4c00267a2caa705b5a42632f13fda853`)으로 바꾸고 `provenance.json`의
   `source_commit`·`source_blob_sha`·`sha256`·`bytes`를 맞춘다. 그러면 `review.default`·`plan_review.*`가
   `astra`로 투영되어 클라이언트 기본 리뷰어 표시가 코드 변경 없이 따라온다. `implementation.runtimes`는
   투영에 없으므로 enum 단일 정본화는 이번 범위 아님(관찰).
5. **구 서버 호환 probe는 두지 않는다.** 갱신 전 서버의 경계는 다음과 같다(관측): 프리셋 생성·kv 쓰기는
   `settingEnums` 검사로 `auto`를 거부하고, Bead `update-impl-target`은 `{auto, <exact 모델>, *}`를
   `impl_runtime_required`로 거부하지만 `{auto, auto, auto}`는 검증 없이 저장한다. 그렇게 저장된 pin은 구
   서버에서 `invalid_impl_runtime`으로 표시만 될 뿐 어떤 경로도 provider를 고르거나 프로세스를 띄우지 않으며,
   갱신된 dotfiles 하네스는 그 값을 정상 `auto`로 읽는다. 하네스 기본 runtime이 `codex`라 `auto`를 모르는
   세션도 임의 provider를 고르지 않는다. 따라서 probe 없이 혼합 구간을 지나도 잘못된 실행은 생기지 않는다.
6. **bench 행의 옛 preset_id 표시는 바꾸지 않는다.** `run.presets` 스냅샷이 이름·값을 갖고 있어 삭제된
   프리셋도 그대로 보인다(관측). 결정: `app/views/compare/`는 바꾸지 않는다 — 스냅샷이 이미 정답이다.
7. **프리셋은 아래 5개로 교체한다(사용자 결정 2026-09-10).** 리뷰 3종(spec/plan/impl)은 전부
   `astra`/`xhigh`, 워커 `impl_model`·`impl_effort`는 전부 `auto`.

   | 이름 | orchestration_model/effort | impl_runtime | 뜻 |
   |---|---|---|---|
   | 최고효율 | opus / high | codex | Opus 총괄, Codex 내부 tier 자동 |
   | 완성도 | fable / high | auto | Fable 총괄, unit마다 Claude·Codex 선택 |
   | 가성비 | sol / medium | codex | Sol 총괄, Codex 내부 tier 자동 |
   | 코덱스 메인 | astra / high | auto | Astra 총괄, unit마다 Claude·Codex 선택 |
   | 클로드 메인 | opus / high | claude | Opus 총괄, Claude 내부 tier 자동 |

   교체는 저장소 코드가 아니라 라이브 서버 상태이며 ws `impl-preset-delete`/`impl-preset-create`
   (`expected_revision` CAS)로 한다. 파일 직접 편집은 하지 않는다.
8. **kv 기본값에 최고효율을 두 rig·두 레인에 적용한다(사용자 결정).** `apply-impl-preset-global`을
   dotfiles·beads-ui 워크스페이스(`root_dir`) 각각에 `lane=general`과 `lane=quick_fix`로 보낸다. ADR 0032
   정규화대로 quick_fix 레인에서 `impl_model=auto`만 `lane_incompatible:quick_fix_impl_model`로 해제되고
   `quick_fix_impl_runtime=codex`·`quick_fix_impl_effort=auto`는 남으며(quick_fix effort enum은 `auto` 허용),
   프리셋에 없는 `impl_dispatch`·`impl_speed`는 `quick_fix_impl_dispatch`·`quick_fix_impl_speed`를 비운다.
   리뷰 3×3·`workflow_mode`는 `skipped_keys`다. 일반 레인 적용은
   `PRESET_KV_KEYS`만 교체하므로 `bdui_url`은 보존된다(readback으로 확인).

9. **프리셋·kv 교체는 PR에 담긴 일회성 머지 후 잡이 실행한다(ADR 0030).** 이 PR은
   `scripts/exec-presets-replace.mjs`(ws 클라이언트, 인자 `--apply` 없이는 dry-run)와 순수 계획 함수
   `scripts/lib/exec-presets-plan.mjs`, 그리고 실행 파일 `repo-ops/post-merge.d/2026-09-10-exec-presets-replace`
   (셸 래퍼: `node scripts/exec-presets-replace.mjs --apply`)를 담는다. Worker의 `post_merge_jobs` 단계가
   deploy(재시작·health readback) 뒤에 그 파일을 한 번 실행하고 원장 `2026-09-10-exec-presets-replace@<blob>`에
   `applied`를 남긴다. 스크립트는 §4의 알고리즘 그대로 멱등이라, 잡이 `intent`로 남거나 `needs_human`으로
   끝나면 사람이 같은 파일을 다시 실행하는 것이 재진입이다. 서버 주소는 `BDUI_WS` → `BDUI_HOST` →
   `ts-ip` 순으로 해소하고 셋 다 없으면 `bdui_host_unresolved`로 실패한다(loopback 폴백 없음 — 서버는 tailnet
   주소에만 바인드). 이 세션이 손으로 ws를 두드리는 절차는 없다.

## 4. 적용 절차 (머지 뒤, 잡이 실행하는 순서)

beads-ui `repo-ops/config.toml`은 `[deploy]`를 선언하므로 머지 뒤 설치·재시작·health readback은 Worker의
deploy 스크립트가 맡는다(빌드 `npm run build` → `bdui-shared restart` → runtime identity·health 확인 →
tracked-clean 확인). 같은 정리 cursor의 다음 단계 `post_merge_jobs`가 §3.9의 잡을 실행한다. 잡의 각 단계는
readback으로 끝나고 실패는 이름 있는 오류로 종료한다(잡 실패 → Worker `needs_human`).

1. **스냅샷.** `subscribe-impl-presets`로 스냅샷 S(revision R, presets)를 받는다.
2. **계획(순수 함수 `planPresetReplacement(S, TARGETS, LEGACY_IDS)`).** 목표 T는 §3.7의 5개(이름 + 전체
   settings). S의 프리셋 p는 (i) 이름과 settings가 T의 한 항목과 완전히 같으면 `keep`, (ii) id가 LEGACY_IDS
   (revision 55의 13개 id: `887cd92c`, `ed8ece50`, `36696046`, `02126255`, `0f1971a9`, `b9f3cb25`, `24ba76f3`,
   `6f138a94`, `5caecc42`, `d3472b95`, `162f3e7f`, `c184c980`, `bb1fc774` — 전체 UUID는 스크립트 상수)에 있으면
   `delete`, (iii) 그 밖(중단 사이 누군가 만든 항목, 이름만 같고 settings가 다른 항목)은 `preserve`로 두고
   보고한다. `create`는 T 중 `keep`이 없는 항목이다. 이미 5개가 `keep`이고 `delete`가 비면 잡은 변경 없이
   성공한다(멱등).
3. **삭제·생성.** `delete`마다 `impl-preset-delete {expected_revision: R, id}`, `create`마다
   `impl-preset-create {expected_revision: R, name, settings}`를 순서대로 보내고 각 응답의 `applied:true`와
   새 `revision`을 다음 요청의 R로 쓴다. `conflict:true`면 1로 돌아가 다시 계획한다(최대 3회, 초과는
   `preset_replace_conflict` 실패). `applied:false`가 conflict 아닌 이유로 오면 그 이유로 실패한다.
4. **프리셋 readback.** 새 스냅샷에서 T의 5개가 모두 `compatible:true`로 존재하고 LEGACY_IDS가 없음을 확인한다.
   `preserve` 목록은 결과에 보고한다.
5. **kv·큐 적용.** `list-workspaces`로 dotfiles와 beads-ui 저장소의 `root_dir`를 얻는다(둘 중 하나라도 없으면
   `workspace_missing` 실패). 각 `root_dir`에 대해 `subscribe-worker-queue`로 큐 revision Q를 읽고
   `apply-impl-preset-global {preset_id: <최고효율 id>, expected_revision: R, expected_queue_revision: Q,
   lane, root_dir}`를 `general`, `quick_fix` 순으로 보낸다. 응답은 `applied:true`·`queue_applied:true`여야
   하고, `queue_conflict:true`나 `queue_applied:false`면 큐 revision을 다시 읽어 같은 요청을 다시 보낸다(kv
   교체는 멱등; 최대 3회, 초과는 `queue_apply_failed`). `conflict:true`(프리셋 revision)는 3으로 돌아간다.
   응답의 `warnings`는 quick_fix 레인에서 정확히 `lane_incompatible:quick_fix_impl_model` 하나, `skipped_keys`는
   리뷰 3×3과 `workflow_mode`여야 한다.
6. **kv·큐 readback.** 두 `root_dir` 각각: `bd -C <root_dir> kv get workflow_session_defaults --json`이
   `impl_runtime=codex · impl_model=auto · impl_effort=auto · quick_fix_impl_runtime=codex ·
   quick_fix_impl_effort=auto · quick_fix_impl_model 부재 · spec/plan/impl_review_model=astra ·
   *_review_effort=xhigh · bdui_url 보존`이고, 큐 스냅샷의 `exec_defaults`가 `orchestration_model=opus ·
   orchestration_effort=high · quick_fix_orchestration_model=opus · quick_fix_orchestration_effort=high`임을
   확인한다. 하나라도 다르면 `readback_mismatch:<key>`로 실패한다.
7. **결과.** 스크립트는 JSON 한 줄(`revision_before`, `revision_after`, `kept`, `deleted`, `created`,
   `preserved`, `applied[root_dir][lane]`, `readback`)을 stdout에 쓰고 exit 0. Worker 원장의 `applied`와 이
   stdout(잡 로그 디렉터리)이 완료 증거이며, pr-finish 머지 꼬리가 이를 읽는다.

중단 안전: 1–4는 CAS라 부분 완료 뒤 재실행이 남은 것만 처리하고, 5–6은 교체 쓰기라 재실행이 같은 값을 다시
쓴다. 잡 원장에 `intent`만 남은 상태는 ADR 0030대로 자동 재실행되지 않으며 사람이 같은 파일을 실행한다.

## 5. 구현 unit 후보

1. `enum-and-validation` — `exec-enums.js`(enum·`validateImplSettings`), `policy.js`, `mutation-handlers.js`
   (`exactImplValues`·주석), 서버 테스트.
2. `client-and-projection` — `session-model.js`(+`execution-pane.js` 호출부), `exec-settings.js`,
   `execution-defaults.js` 라벨, `protocol.md`, 투영 pin·provenance, 클라이언트·투영 테스트.
3. `replace-job` — `scripts/lib/exec-presets-plan.mjs`(+테스트), `scripts/exec-presets-replace.mjs`,
   `repo-ops/post-merge.d/2026-09-10-exec-presets-replace`.

세 unit은 같은 워크트리에 순차로 쓴다. 프리셋·kv 교체(§4)의 실행은 머지 뒤 Worker 잡이다.

## 6. Test scope

각 seam은 지금 코드에서 실제로 실패한다(`inherit` 분기와 `controller_runtime_required`가 살아 있고
`auto`는 `invalid_impl_runtime`이다).

- `server/worker/exec-enums.test.js`: `validateImplSettings` — `auto`+모델 `auto` → ok, `impl_runtime='auto'`;
  `auto`+`opus` → ok, effort는 opus 목록으로 검사(`illegal_impl_effort`에 opus 밖 값); `auto`+`sol`+
  `orchestration_model=opus` → ok(컨트롤러 무관); `inherit` → `invalid_impl_runtime`;
  `controller_runtime_required`는 더 이상 반환되지 않는다; `IMPL_RUNTIMES`가 `['auto','claude','codex']`이고
  클라이언트 `session-model.js` export와 같다.
- `server/ws/exec-settings-mutation.test.js`: `update-impl-target` `{auto, sol, high}` → bd 호출·성공(지금은
  `impl_runtime_required`); `{auto, auto, auto}` → 성공(회귀 확인); `{auto, opus, max}` → `bad_request`
  `illegal_impl_effort`(지금은 `impl_runtime_required`).
- `server/worker/policy.test.js`: Bead `impl_runtime='auto'` → 사실 `impl_runtime='auto'`,
  `impl_runtime_inferred=false`; 모델 전용 Bead의 레거시 추론은 유지.
- `server/worker/exec-preset-coordinator.test.js`: 저장된 `impl_runtime='inherit'` 프리셋은 스냅샷에서
  `compatible:false`, `incompatibility_reason='invalid_impl_runtime'`(이관 없음의 단언).
- `app/views/settings-dialog/session-model.test.js`: `implModelOptions(catalog,'auto')`는 `auto`+모든
  모델; `implEffortOptions(catalog,'auto',undefined)`는 `auto`+두 provider effort 합집합(지금은 `auto`만 —
  RED); `implEffortOptions(catalog,'auto','opus')`는 opus 목록; `narrowImplTarget({auto, opus, max}, catalog)`
  는 `impl_effort`를 비운다(지금은 알 수 없는 runtime이라 그대로 — RED); `{auto, sol}`·`{auto, auto}` 보존은
  회귀 확인; `inherit` 케이스(`:225`, `:345`, `:355`, `:543`, `:572`)는 `auto` 의미로 대체.
- `app/views/detail-panel/exec-settings.test.js`: `normalizeImplTarget` `auto`+`opus`는 유지·effort는 opus
  목록, `auto`+`auto`는 아무것도 비우지 않음; 행 빌더에서 `impl_runtime` 옵션 라벨이 `auto (실행 시 결정)`,
  `auto`일 때 `impl_model` 그룹이 두 provider, `disabled=false`; `inherit` 케이스(`:850`, `:861`, `:901`,
  `:919`) 대체.
- `app/utils/execution-defaults.test.js` 또는 `server/worker/execution-defaults.test.js`: 갱신된 pin
  파일과 provenance(sha256·bytes·blob)가 일치하고 `review.default`·`plan_review.standard_recommended`·
  `plan_review.fast_track_default`가 `astra`로 투영된다.
- `scripts/lib/exec-presets-plan.test.mjs`: `planPresetReplacement` — 13개 legacy 스냅샷 → delete 13·create 5;
  이미 5개 keep → 변경 없음; 이름만 같고 settings 다른 항목 → preserve + create; 알 수 없는 id → preserve.
- `app/protocol.md`: `:950` 예시를 `impl_runtime: 'auto'`로, 실행 설정 절에 `auto`의 뜻 한 문장, 잡의
  `post-merge.d` 항목은 ADR 0030 절차라 문서 추가 없음.

## 7. 검증 범위

- 저장소 기본: `npm test`(vitest), `npm run lint`. 번들은 tracked가 아니므로(ADR 0051) 커밋하지 않는다.
- 스크립트 dry-run: PR 전에 `node scripts/exec-presets-replace.mjs`(인자 없음)로 라이브 서버에 대한 계획
  (delete 13·create 5·preserve 0)만 출력해 확인한다 — 쓰기 없음.
- 머지 뒤: Worker 원장 `2026-09-10-exec-presets-replace@<blob>` = `applied`와 잡 stdout의 readback JSON.
  라이브 프리셋·kv는 그 잡에서만 바뀐다.

## 8. 경계·후속

- 관찰: `IMPL_RUNTIMES`를 dotfiles 투영에서 읽는 단일 정본화 — 투영에 `implementation.runtimes`가 없어 이번
  범위 아님. 두 복제본 동일성 테스트로 대신한다.
- 관찰: 투영 pin 갱신 스크립트 부재 — 이번엔 수동 pin. 자동화는 요청 없음.
- 관찰: 잡 실행 파일은 실행 뒤에도 트리에 남는다(ADR 0030 원장이 재실행을 막음). 정리는 요청 없음.
- 관찰: `auto` 위임의 라이브 실행 증거(총괄이 unit을 Codex로 결속, 영수증 모델 일치)는 dotfiles-nv53 완료
  보고서의 잔여이며 프리셋 교체 뒤 첫 `완성도`/`코덱스 메인` Bead에서 확인한다.

## 결정 (ADR 후보)

- 전제: ADR 0013 — `workflow_session_defaults` kv는 dotfiles가 소유하고 beads-ui는 소비자다; 이 설계는 어휘를
  넓히지 않고 dotfiles가 정한 `auto|claude|codex`를 따른다.
- 전제: ADR 0030 — 머지 후 일회성 작업은 `repo-ops/post-merge.d/` 잡으로 PR에 결속되고 원장이 재실행을 막는다.
- 전제: ADR 0051 — 번들은 deploy가 빌드한다; §4의 deploy 증거는 그 스크립트의 readback이다.
- `impl_runtime=auto`는 beads-ui에서 "실행 시 총괄이 정함" 상태이며 서버·클라이언트는 provider를 유도하지 않고
  exact 모델의 토큰만 provider를 정한다; `inherit`은 어휘에서 제거되고 저장된 값은 이관 없이
  `compatible:false`로 드러나며 어느 레인에도 적용되지 않는다. ADR 0032의 "quick_fix 레인은 `impl_runtime=inherit`
  키만 해제한다"는 조항이 반전되므로 0032를 supersede하고 살아남는 조항을 승계한다: 프리셋은 레인 무관 18키
  프로파일이고 레인은 적용 순간에만 있다; 워크스페이스는 일반 레인(kv `PRESET_KV_KEYS`+큐 `orchestration_*`)과
  quick_fix 레인(kv `quick_fix_impl_*` 5키+큐 `quick_fix_orchestration_*` 3키)에 교체 방식으로 적용하고
  매핑은 `QUICK_FIX_LANE_MAP` 하나가 소유한다; 정규화는 적용의 일부라 quick_fix enum 밖 값(`impl_runtime=auto`,
  `impl_model=auto`)은 그 키를 해제하고 `lane_incompatible`로, 대응 키 없는 리뷰 3×3·`workflow_mode`는
  `skipped_keys`로 알린다; 비어 있는 quick_fix 키는 같은 이름의 일반 키로 떨어진다; 적용은 kv 먼저·큐 CAS
  나중의 비원자성이며 `queue_applied:false`로 드러난다; 클라이언트는 큐 스냅샷에
  `quick_fix_orchestration_model` 키가 있을 때만 quick_fix 적용을 보낸다. 되돌리기 어려움: 서버·클라이언트
  enum, 검증 사유(`controller_runtime_required` 폐기), 표시 라벨, protocol.md, 프리셋 저장소가 함께 바뀐다. 맥락 없이 놀라움: `auto`가 `impl_model`·
  `impl_effort`의 `auto`와 같은 문자열이지만 다른 축(provider)의 상태이고, 오케스트레이션 모델과 무관하다.
  실재한 대안: `inherit`→`auto` 자동 이관(뜻이 달라 오해를 저장), 오케스트레이션 provider 유도 유지(dotfiles
  선택기와 충돌), 구 서버 capability probe(fail-closed라 불필요)를 기각했다.
  `summary`: "impl_runtime은 auto|claude|codex이고 auto는 실행 시 총괄이 provider를 정하는 상태라 beads-ui 서버·클라이언트는 provider를 유도하지 않으며 exact 모델 토큰만 provider를 정한다; inherit은 이관 없이 제거되어 저장된 값은 compatible:false로 드러나 어느 레인에도 적용되지 않고 구 서버 capability probe는 두지 않는다; 레인 무관 18키 프리셋·두 레인 교체 적용·QUICK_FIX_LANE_MAP·lane_incompatible/skipped_keys 정규화·quick_fix 키의 일반 키 폴스루·kv 먼저 큐 나중의 비원자성·quick_fix_orchestration_model 키 존재의 capability gating은 0032를 승계한다"
  → ADR, supersede 0032
- 프리셋 13개→5개 교체와 kv 기본값 최고효율 적용을 머지 후 잡으로 실행 — 서버 전역 사용자 상태이며 ws
  프로토콜로 언제든 되돌릴 수 있고 잡 형식은 ADR 0030 그대로라 되돌리기 어려움·놀라움 모두 불충족 → ADR 아님
- 투영 pin을 dotfiles 머지 커밋으로 갱신 — 기존 pin 절차의 반복이라 놀라움 없음 → ADR 아님
