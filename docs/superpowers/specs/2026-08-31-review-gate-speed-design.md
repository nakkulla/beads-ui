---
scope:
  - server/worker/exec-enums.js
  - server/worker/policy.js
  - server/worker/attach.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/ws/exec-preset-handlers.js
  - app/views/detail-panel/exec-settings.js
  - app/views/detail-panel/effective-settings.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/settings-dialog/execution-pane.js
  - app/views/settings-dialog/session-model.js
  - app/utils/execution-defaults.js
---

# 리뷰 게이트 속도를 단계별로 설정 가능하게 한다 (UI-iv7l)

## 1. 문제

리뷰 게이트는 리뷰어(`*_review_model`)와 노력(`*_review_effort`)까지만 고를 수
있고 속도는 고를 수 없다. `review` 스킬의 codex leg Launch 줄이
`--speed default`로 고정돼 있어서, 사용자가 리뷰를 Fast로 돌릴 경로가 아예
없다.

전송 계층은 이미 준비돼 있다. `codex-runner-bridge`는
`--speed <default|fast>`를 받고, broker 스코프도 workspace·session·speed로
격리해 서로 다른 speed의 세션이 섞이지 않는다. 없는 것은 **선택 키**와 **그
키를 Launch 줄까지 흘려보내는 경로** 둘뿐이다.

## 2. 결정된 키 모양

단계별 3개 키를 둔다. 기존 model·effort 쌍과 대칭이다.

| 키 | vocabulary |
| --- | --- |
| `spec_review_speed` | `default` \| `fast` |
| `plan_review_speed` | `default` \| `fast` |
| `impl_review_speed` | `default` \| `fast` |

단일 `review_speed` 하나로 세 단계를 덮는 안은 검토 후 버렸다. 기존 표면이
이미 단계별 쌍으로 되어 있어(프리셋·kv·상세 패널·해석 표), 단계 축만 하나
좁히면 같은 패널 안에서 두 가지 축 규칙이 공존하게 된다.

## 3. 저장소 경계와 역할

계약 정의는 dotfiles가 소유한다(AGENTS.md "Workflow 계약의 canonical 소유권",
ADR 0012). beads-ui는 소비자다.

### 3.1 dotfiles 델타 (선행)

- `docs/contracts/workflow-state.yaml`
  - `metadata.bead_keys`: `spec_review_speed` / `impl_review_speed` /
    `plan_review_speed`를 각각 `{enum: [default, fast]}`로 추가 (기존
    `impl_speed` 항목과 같은 모양).
  - `workspace_kv_defaults.allowed_keys`: 13 → 16.
  - `consumer_surface.metadata.keys`: 3키 추가.
- `docs/contracts/workflow-contract.md` — Review gates 절에 한 문장: 속도는
  effort와 같은 사다리(현재 사용자 → Bead → workspace kv → harness)로
  해소되고, 해소값은 Claude 런타임 codex leg에만 적용되며, 적용되지 않는
  leg에서는 무시되고 오류가 아니다.
- `src/shared/skills/review/review/SKILL.md`
  - Claude transport codex leg의 Launch 줄을 `--speed default` 고정에서
    `--speed <해소값>`으로 바꾼다. 해소 실패·부재는 `default`다.
  - "`self` / `skip`과 `*_review_effort`" 문단 옆에 속도의 같은 무시 규칙을
    적는다.
- `src/shared/skills/flow/workflow/resources/harness.yaml` — 변경 없음.
  `review.reviewers` 프리셋에 speed 항목을 두지 않는다. 부재가 곧 `default`다.

### 3.2 beads-ui 델타 (소비)

서버는 리뷰 dispatch에 참여하지 않는다 — 저장·검증·표시만 한다
(`server/worker/review-session.js:36` "Reviewer selection ... is left to the
session's own `review` skill ladder; the server does not participate").

| 파일 | 델타 |
| --- | --- |
| `server/worker/exec-enums.js` | `REVIEW_SPEEDS = ['default','fast']` 신규. `BEAD_APPLY_KEYS` 12 → 15. **`sessionDefaultEnums()`에 3키를 명시**(아래 §3.3). 헤더 JSDoc의 "12 worker exec-preference keys" 문구 갱신 |
| `server/worker/policy.js` | `pickBead(REVIEW_SPEEDS, bead.<step>_review_speed)` 3줄 + typedef 3항목 |
| `server/worker/attach.js` | raw metadata 통과 3항목 (`typeof md.<key> === 'string'` 형판 그대로) |
| `server/worker/queue-store.js` · `server/worker/scheduler.js` · `server/ws/exec-preset-handlers.js` · `app/views/detail-panel/effective-settings-view.js` | 하드코딩된 "12키" 문구를 15로 정정 (레거시 프리셋 프로토콜을 가리키는 `exec-preset-store.js`·`exec-preset-apply.test.js`의 "12-key"는 **다른 12**이므로 건드리지 않는다) |
| `app/utils/execution-defaults.js` | `EXECUTION_SETTING_KEYS` 16 → 19. `REVIEW_PAIRS` 루프 옆에 속도 쌍 해석 — `self`/`skip`은 effort 행과 같은 `해당 없음` + `not_applicable` |
| `app/views/detail-panel/exec-settings.js` | `EXEC_KEYS` 12 → 15, `EXEC_ADVANCED_GROUPS`의 `review` 그룹 6 → 9키, `EXEC_SETTING_PRESENTATION` +3, id 조회 helper(§4) + `speedGroups()` 분기. 리뷰어 동사 목록 상수는 두지 않는다 |
| `app/views/detail-panel/effective-settings.js` | 해석 카드의 키 그룹·라벨에 3항목 |
| `app/views/settings-dialog/execution-pane.js` · `session-model.js` | 워크스페이스 기본값 창의 3행 |

### 3.3 파생되는 것과 손으로 써야 하는 것

파생되는 것: `WORKSPACE_KV_KEYS`(16) · `IMPL_PRESET_KEYS`(18) ·
`PRESET_KV_KEYS`(14)는 전부 `BEAD_APPLY_KEYS`에서 나오므로 자동으로 늘어난다.

**파생되지 않는 것이 다섯 자리 있고, 둘은 빠뜨리면 런타임에서 죽는다.**

| 자리 | 지금 | 뒤 | 빠뜨리면 |
| --- | --- | --- | --- |
| `execSettingEnums()` (server) | — | +3 | `validateExecSettings()`가 `enums[key].includes()`에서 **TypeError** |
| `sessionDefaultEnums()` (server) | — | +3 | `validateImplPresetSettings()`가 같은 자리에서 **TypeError** |
| `EXEC_SETTING_KEYS` (server) | 12 | 15 | attempt `exec_values`에 속도가 안 실리고, 아래 `EXEC_KEYS`와 어긋난다 |
| `EXEC_KEYS` (`exec-settings.js`, server 표의 선언된 mirror) · `EXEC_ADVANCED_GROUPS.review`(6→9키) · `EXEC_SETTING_PRESENTATION`(+3) | 12 / 6 / 12 | 15 / 9 / 15 | **속도 행이 편집 화면에 아예 나오지 않는다** |
| `EXECUTION_SETTING_KEYS` (`app/utils/execution-defaults.js`, 해석기 입력) | 16 | 19 | 해석 표에 속도 행이 없다 |

마지막 줄이 이 기능의 존재 조건이다. `impl_speed`가 정확히 그 목록들 밖에
있어서 상세 패널에서 편집할 수 없다 — 리뷰 속도를 같은 자리에 두면 기능이
닿지 않는다. 그래서 `impl_speed`와의 대칭이 아니라 **편집 가능성**을 택한다.

앞의 두 줄은 같은 종류의 crash다. `BEAD_APPLY_KEYS`·`EXEC_SETTING_KEYS`는
"어떤 키가 있는가"를 말하고 enum 테이블은 "그 값이 무엇일 수 있는가"를 말하는데,
검증 루프가 키 목록을 돌며 enum 테이블을 첨자로 읽기 때문에 한쪽만 늘리면
`undefined.includes`가 된다.

## 4. 게이팅은 하드코딩 목록이 아니라 카탈로그 유도다

리뷰어별로 어떤 속도를 고를 수 있는지는 동사 목록을 새로 적어서 정하지 않는다.
다만 **기존 helper를 그대로 부를 수는 없다** — 키 공간이 다르다.

| 값 | 예시 |
| --- | --- |
| 리뷰어 동사 | `codex` |
| 카탈로그 **키** (`runners.codex.models`의 프로퍼티명) | `sol` |
| 모델 **id** (`models.sol.id`) | `gpt-5.6-sol` |
| `compactModelId()` 결과 | `5.6-sol` |

`reviewerModelId()`가 주는 것도, 해석된 행의 `full_value`가 담는 것도 **id**다.
그런데 `speedTiersForModel()`은 `Object.hasOwn(entry.models, model)`로 **키**를
찾는다(`exec-settings.js:318`). 그래서
`speedTiersForModel(catalog, 'gpt-5.6-sol')`은 `[]`를 준다 — 즉 순진하게 이으면
codex 속도까지 꺼진다. `compactModelId()`도 `'5.6-sol'`이라 키가 아니다.

그러므로 **id로 항목을 찾는 조회를 새로 정의한다**.

```js
// exec-settings.js — runners[*].models[key].id === model_id 인 항목의 speed_tiers.
// claude 모델은 key와 id가 같아(`opus: { id: 'opus' }`) 같은 조회로 덮인다.
// 못 찾으면 [] — 모르는 모델에 fast를 주지 않는다.
function speedTiersForModelId(runner_catalog, model_id) { /* ... */ }
```

그리고 **해석 상태가 `incompatible`·`unavailable`이면 `full_value`를 보지 않고
곧장 `[]`로 간다.** `incompatibleResult()`는 `full_value`에 리뷰어 동사 원문을
그대로 넣기 때문에(`app/utils/execution-defaults.js:269`), 동사가 우연히
카탈로그 키나 id와 겹치면 비호환 리뷰어의 속도가 잘못 활성화된다.

아래 표에서 `resolution`·`full_value`는 **리뷰어 행**(`<step>_review_model`)의
것이고, 맨 오른쪽 두 열이 이 스펙이 새로 정하는 **속도 행**이다. 둘을 섞지
않는다 — `self`/`skip`의 리뷰어 행은 `not_applicable`이 아니라 평범한
`default`/`explicit`이고, `full_value`도 `null`이 아니라 동사 그대로
`'self'`/`'skip'`이다(해석기의 `else` 가지가 `reviewerModelId()`를 그대로
부른다). `not_applicable`이 되는 것은 effort 행이고, 속도 행도 그 형판을
따른다.

| 리뷰어 | 리뷰어 행 `resolution` | 리뷰어 행 `full_value` | tier | 속도 행 `resolution` | 속도 편집 |
| --- | --- | --- | --- | --- | --- |
| `codex` | `default`·`explicit` | `gpt-5.6-sol` | `['default','fast']` | `default`·`explicit` | 활성 |
| `opus` · `fable` | `default`·`explicit` | `opus` · `fable` | `['default']` | `default`·`explicit` | 비활성 |
| `self` · `skip` | `default`·`explicit` | `'self'` · `'skip'` | `[]` | `not_applicable` | 비활성 |
| 비호환 값 | `incompatible` | 동사 원문 | `[]` (조회하지 않음) | `not_applicable` | 비활성 |
| 기본값 확인 불가 | `unavailable` | `null` | `[]` | `unavailable` | 비활성 |

편집 셀렉트는 tier 목록이 2개 미만이면 `disabled`로 그린다.

유도로 얻는 것: `[runner]` 설정이 카탈로그의 `speed_tiers`를 바꾸면 화면이
따라간다. 동사 목록을 손으로 적었다면 조용히 어긋났을 자리다.

### 4.1 두 화면은 서로 다른 질문에 답한다

게이팅을 한 곳에만 적으면 실제 화면에서 어긋난다. 상세 패널에는 표면이 둘이고,
비활성 판정 기계가 서로 다르다.

**해석 카드** (`effective-settings.js` → `effective-settings-view.js:235`)는
`resolution === 'not_applicable'`만 비활성화한다. 이 표가 답하는 질문은 "지금
무엇이 적용 중인가"다. 따라서:

- `self`·`skip` 단계의 속도 행은 resolver가 effort 행과 **똑같은 형판**으로
  `result(null, 'base', '해당 없음', null, 'not_applicable')`을 만든다
  (`execution-defaults.js`의 `REVIEW_PAIRS` 루프).
- `opus`·`fable` 단계의 속도 행은 `not_applicable`이 **아니다**. 그 리뷰어에
  실제로 적용되는 값이 Standard이고, 적용 중인 값을 보여주는 것이 이 표의
  일이다. 여기서 회색 처리하면 참인 값을 감추게 된다.

**편집 셀렉트** (`exec-settings.js`)가 답하는 질문은 "무엇을 고를 수 있는가"다.
카탈로그 유도 tier 목록으로 게이팅하는 곳은 여기다.

이 비대칭은 의도된 것이다. 나중에 "해석 카드에서도 opus는 회색이어야 한다"고
맞추면 적용 중인 값을 숨기는 퇴행이 된다.

### 4.2 오케스트레이션 러너로는 게이팅하지 않는다

속도가 실제로 통하는 경로는 정확히 하나다: **Claude 런타임 + `codex` 리뷰어
→ `codex-runner-bridge` Launch `--speed`**. Codex 런타임의 native
`spawn_agent` leg에도, opus/fable을 도는 `claude-runner` leg에도 speed
파라미터가 없다. 이 둘은 조용히 무시한다.

그렇다고 `orchestration_model`(→러너)로 속도 행을 회색 처리하지는 않는다.
리뷰 키는 **세션 키**라서 Worker가 아닌 사용자의 대화형 Claude 세션이 소비할
수 있는데, `orchestration_model`은 Worker 런처 키다. 런처 키로 세션 키를
잠그면 실제로는 적용될 설정을 잘못 회색 처리한다. 리뷰어 동사 하나로만
게이팅한다.

## 5. 저장 vocabulary는 고정, 렌더 vocabulary는 유도

두 층을 섞지 않는다. 이 저장소에 이미 있는 분업을 그대로 따른다.

| 층 | vocabulary | 선례 |
| --- | --- | --- |
| 저장·검증 (`sessionDefaultEnums`, `policy.js pickBead`) | 고정 `REVIEW_SPEEDS = ['default','fast']` | `impl_speed: IMPL_SPEEDS` — 카탈로그가 있는데도 고정이다 |
| 편집 셀렉트 옵션 (`exec-settings.js`) | `speedTiersForModelId()` 유도 | `orchestration_speed` |

저장층이 고정이어야 하는 이유는 소비 시점이 다르기 때문이다. Bead에 핀된 값은
나중에 **다른 세션이 다른 레이어에서** 해소한다 — 그 세션이 무슨 리뷰어를
고를지는 핀을 쓰는 시점에 알 수 없다. 그래서 핀 층은 계약 enum(`{enum:
[default, fast]}`)과 1:1로 두고, 리뷰어에 따른 좁히기는 화면이 지금 아는
사실로만 한다. `impl_speed`가 정확히 이 이유로 고정이다.

카탈로그가 `gpt-5.6-sol`에서 `fast`를 뺀 경우는 화면에서 옵션이 사라지고,
그래도 핀이 남아 있는 경우는 dotfiles 쪽 bridge의 Fast
preflight(`service_tiers[].id=priority` 확인)가 잡는다 — 그 실패는 leg 실패로
종단하며 속도를 낮춰 재시도하지 않는다. beads-ui는 이 이중 검증을 복제하지
않는다.

## 6. 수용 기준

1. `spec_review_speed` / `plan_review_speed` / `impl_review_speed`가 Bead
   metadata·워크스페이스 kv 기본값·프리셋·상세 패널 해석 표를 왕복한다.
2. `default`·`fast` 외의 값은 `pickBead`가 떨어뜨리고 해석값이 `undefined`가
   된다.
3. `validateImplPresetSettings({ spec_review_speed: 'fast' })`가 예외 없이
   `{ ok: true }`를 주고, `{ spec_review_speed: 'turbo' }`는
   `invalid_spec_review_speed`를 준다.
4. 편집 셀렉트의 옵션이 §4 표와 같다 — `codex`는 활성, `opus`·`fable`은 비활성,
   `self`·`skip`은 비활성, `incompatible`·`unavailable` 해석은 카탈로그를
   조회하지 않고 비활성이다. 이 판정은 어디에도 리뷰어 동사 목록을 새로 적지
   않는다.
5. 해석 카드에서 `self`·`skip` 단계의 속도 행은 `해당 없음` +
   `not_applicable`이고, `opus`·`fable` 단계의 속도 행은 `not_applicable`이
   아니며 Standard가 적용 값으로 보인다.
6. 게이팅이 걸린 상태에서도 이미 저장된 속도 값은 지워지지 않고 그대로 표시된다.
7. 키 개수: `BEAD_APPLY_KEYS` 15, `WORKSPACE_KV_KEYS` 16, `IMPL_PRESET_KEYS` 18,
   `PRESET_KV_KEYS` 14, 서버 `EXEC_SETTING_KEYS` 15, 클라이언트 `EXEC_KEYS` 15,
   `EXEC_ADVANCED_GROUPS`의 `review` 그룹 9키, `EXEC_SETTING_PRESENTATION` 15항목,
   `EXECUTION_SETTING_KEYS` 19.
8. `validateExecSettings({ impl_review_speed: 'fast' })`가 예외 없이 통과하고,
   `'turbo'`는 `invalid_impl_review_speed`를 준다.
9. 상세 패널 편집 화면의 `리뷰` 그룹에 속도 셀렉트 3개가 실제로 렌더된다.
10. dotfiles `review` 스킬의 codex leg Launch 줄이 해소된 속도를 싣고, 해소값이
    없으면 `default`를 싣는다.

## 7. 검증

Pre-Handoff Validation 전량: `npm run tsc` · `npm test` ·
`npm run lint` · `npm run prettier:write` · `npm run build`
(순서는 prettier → build; 소스맵이 낡으면 배포 tracked-clean 검사가 떨어진다).

신규·확장 테스트는 기존 파일에 붙인다: `server/worker/exec-enums.test.js`,
`policy.test.js`, `attach.test.js`, `exec-preset-coordinator.test.js`,
`server/ws/exec-preset-apply.test.js`,
`app/views/settings-dialog/session-model.test.js`,
`app/views/detail-panel/exec-settings.test.js`, `effective-card.test.js`.

§6.3·§6.8(두 검증 루프가 `undefined.includes`로 죽지 않는다)과 §6.4~6.5·§6.9
(두 화면의 렌더와 활성/비활성)은 각각
독립적으로 실패할 수 있는 판정이므로 별도 테스트로 고정한다 — 특히 §6.4는
`full_value`가 모델 id라는 사실 때문에 순진한 조회로는 codex까지 꺼지는
자리이므로, 실제 카탈로그 모양으로 codex 활성을 단언한다.

## 8. 구현 unit 후보

단일 unit이다. dotfiles 델타가 선행으로 분리되면 beads-ui 쪽은 enum 확장 →
resolver → UI가 한 파일 흐름으로 이어지고, 중간에 넘길 handoff가 없다.

## 결정 (ADR 후보)

- **리뷰 속도 게이팅은 리뷰어 동사로만 하고 오케스트레이션 러너로는 하지
  않는다** — 되돌리기 어려운가: **미충족**(분기 한 곳이라 되돌리기가
  싸다) / 맥락 없이 놀라운가: **충족**("Codex 러너면 어차피 안 먹는데 왜
  활성인가"는 반복될 질문이다) / 실질적 트레이드오프: **충족**(표시 정확성 대
  잘못된 잠금). 세 조건 중 둘만 충족하므로 ADR로 올리지 않는다. 근거는 이
  스펙 §4.1이 보유한다.
- **속도 vocabulary는 저장층 고정 · 렌더층 카탈로그 유도로 나눈다** — 되돌리기
  어려운가: **미충족**(둘 다 국소 변경이다) / 맥락 없이 놀라운가:
  **충족**(같은 값에 두 vocabulary가 붙는 것은 설명 없이는 비일관으로 읽힌다) /
  실질적 트레이드오프: **충족**(핀을 계약 enum과 1:1로 두는 단순함 대 화면
  정확성). 세 조건 중 둘만 충족하므로 ADR로 올리지 않는다. 이 분업은 이미
  `impl_speed`(고정)와 `orchestration_speed`(유도)가 만들어 둔 것이라 새 결정이
  아니라 기존 결정의 적용이다. 근거는 §5가 보유한다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | `awaited_by_consumer` | 다른 저장소 — 계약 정의자이고 이 저장소가 소비 전에 착지해야 한다 (`bead_split`: 저장소가 unit 경계) | 없음 | `dotfiles-sucv` |

위 행은 dotfiles rig에 `dotfiles-sucv`로 등록됐다 — 실작업 Bead이지 proxy가
아니고, `route=quick_fix` 핀과 `quick_fix_review=self@5644a5892b7d` 영수증을
갖는다. foreign 엣지 `bd dep add UI-iv7l dotfiles-sucv --type blocks`도 함께
기록돼 UI-iv7l이 그 착지를 기다린다. 그 엣지가 의존 readback으로 no-PR
residue를 운반하므로 UI-iv7l에 `worker-ineligible`은 필요 없다.

- 관찰: `docs/contracts/workflow-state.yaml:264`의 `plan_review_model` enum은
  `self`를 포함하는데 beads-ui `PLAN_REVIEW_MODELS`는
  `['codex','fable','skip']`로 제외한다 — 계약과 소비자가 어긋나 있다. 이번
  변경의 결함도 아니고 이 변경이 유발하지도 않으므로 admission 클래스에 들지
  않는다. 계약 쪽 정정으로 별도 제기할 사안이다.

- 관찰: `impl_speed`는 `EXEC_KEYS`·`EXEC_ADVANCED_GROUPS`·
  `EXEC_SETTING_PRESENTATION`·`EXEC_SETTING_KEYS` 어디에도 없어서 상세 패널
  편집 화면에서 고를 수 없다 — 프리셋과 워크스페이스 kv로만 넣을 수 있다.
  기존 공백이고 이번 변경이 유발하지 않으므로 admission 클래스에 들지 않는다.
