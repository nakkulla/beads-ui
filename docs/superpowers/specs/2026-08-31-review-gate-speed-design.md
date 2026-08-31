---
scope:
  - server/worker/exec-enums.js
  - server/worker/policy.js
  - server/worker/attach.js
  - server/ws/exec-preset-handlers.js
  - app/views/detail-panel/exec-settings.js
  - app/views/detail-panel/effective-settings.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/settings-dialog/execution-pane.js
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
| `server/worker/exec-enums.js` | `REVIEW_SPEEDS = ['default','fast']` 신규. `BEAD_APPLY_KEYS` 12 → 15. 헤더 JSDoc의 "12 worker exec-preference keys" 문구 갱신 |
| `server/worker/policy.js` | `pickBead(REVIEW_SPEEDS, bead.<step>_review_speed)` 3줄 + typedef 3항목 |
| `server/worker/attach.js` | raw metadata 통과 3항목 (`typeof md.<key> === 'string'` 형판 그대로) |
| `server/worker/queue-store.js` · `server/worker/scheduler.js` · `server/ws/exec-preset-handlers.js` · `app/views/detail-panel/effective-settings-view.js` | 하드코딩된 "12키" 문구를 15로 정정 (레거시 프리셋 프로토콜을 가리키는 `exec-preset-store.js`·`exec-preset-apply.test.js`의 "12-key"는 **다른 12**이므로 건드리지 않는다) |
| `app/views/detail-panel/exec-settings.js` | `EXEC_SETTING_KEYS` 3항목, 라벨 3항목, `speedGroups(speedTiersForModel(...))` 분기, 해석 표 3행. 새 상수 목록은 두지 않는다 |
| `app/utils/execution-defaults.js` | `EXECUTION_SETTING_KEYS` 3항목, `REVIEW_PAIRS` 옆에 속도 쌍 해석(`self`/`skip`은 `해당 없음`) |
| `app/views/settings-dialog/execution-pane.js` · `session-model.js` | 워크스페이스 기본값 창의 3행 |

`WORKSPACE_KV_KEYS`·`IMPL_PRESET_KEYS`·`PRESET_KV_KEYS`는 전부
`BEAD_APPLY_KEYS`에서 파생되므로 별도 편집이 없다.

## 4. 게이팅은 하드코딩 목록이 아니라 카탈로그 유도다

리뷰어별로 어떤 속도를 고를 수 있는지는 목록을 새로 적어서 정하지 않는다.
필요한 재료가 이미 다 있다.

`app/utils/execution-defaults.js:151`의 `reviewerModelId()`는 핀된
`generated/contracts/execution-defaults.json`의 `review.reviewers`에서
리뷰어 동사를 카탈로그 모델 id로 옮긴다(`codex` → `gpt-5.6-sol`). 그리고
`resolveExecutionSettings()`가 만드는 `<step>_review_model` 행은 그 값을
이미 `full_value`에 담고 있다(`result(value, source, display, full_value,
resolution)`).

따라서 `orchestration_speed`가 쓰는 것과 **같은 함수**를 그대로 부른다.

```js
speedTiersForModel(runner_catalog, rows[`${prefix}_review_model`].full_value)
```

의도한 동작이 별도 규칙 없이 그대로 떨어진다.

| 리뷰어 | `full_value` | 카탈로그 tier | 속도 행 |
| --- | --- | --- | --- |
| `codex` | `gpt-5.6-sol` | `['default','fast']` | 활성 |
| `opus` · `fable` | `opus` · `fable` | `['default']` (`speed_tiers` 없음) | 비활성 — Standard 고정 |
| `self` · `skip` | 카탈로그 밖 | `[]` | 비활성 — `해당 없음` |

렌더는 tier 목록이 2개 미만이면 `disabled`로 그린다. `self`/`skip`은 effort
행의 현행 처리와 맞춰 해석 표에서 `해당 없음`으로 적는다
(`execution-defaults.js`의 `REVIEW_PAIRS` 처리에 속도 쌍을 나란히 추가).

게이팅은 **표시만** 한다. 값 저장·검증은 게이팅과 무관하며, 적용되지 않는
리뷰어에 속도가 남아 있어도 오류가 아니다 — `*_review_effort`의 현행 규칙과
같다.

유도로 얻는 것: `[runner]` 설정이 카탈로그의 `speed_tiers`를 바꾸면 화면이
따라간다. 하드코딩 목록이었다면 조용히 어긋났을 자리다.

### 4.1 오케스트레이션 러너로는 게이팅하지 않는다

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
| 셀렉트 옵션·게이팅 (`exec-settings.js`) | `speedTiersForModel()` 유도 | `orchestration_speed` |

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
3. 속도 셀렉트의 옵션이
   `speedTiersForModel(catalog, rows[<step>_review_model].full_value)`와 같고,
   그 목록이 2개 미만이면 `disabled`로 그려진다 — 리뷰어가 `codex`면 활성,
   `opus`·`fable`이면 비활성, `self`·`skip`이면 비활성이다. 이 판정은 어디에도
   리뷰어 동사 목록을 새로 적지 않고 카탈로그에서 유도된다.
4. 해석 표에서 `self`·`skip` 단계의 속도 행은 effort 행과 같은 `해당 없음`으로
   적힌다.
5. 게이팅이 걸린 상태에서도 이미 저장된 속도 값은 지워지지 않고 그대로 표시된다.
6. `BEAD_APPLY_KEYS`가 15개이고, `WORKSPACE_KV_KEYS`가 16개다.
7. dotfiles `review` 스킬의 codex leg Launch 줄이 해소된 속도를 싣고, 해소값이
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
