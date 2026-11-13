---
scope:
  - server/worker/compare-projection.js
  - server/worker/compare-projection.test.js
  - server/ws/compare-handlers.js
  - server/ws/compare-handlers.test.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/session-observation.js
  - server/worker/usage-receipts.js
  - app/views/compare/
  - app/styles.css
  - app/protocol.md
---

# 비교 탭 재설계 — 작업 종류별로, 같은 설정은 묶어서, 리프·리뷰어까지

## 문서 상태

- Bead: `UI-6xw7` · 경로 `spec_backed` · 기준 `origin/main` `bd4e0561ce33417f011bdfd3dec3dc029cb62c2d`
- 화면 시안: `http://100.122.98.8:9000/2026-11-12-compare-settings-redesign.html`
  (파일 `~/tmp/mockups/2026-11-12-compare-settings-redesign.html`). 값은 2026-11-12
  공유 서버 최근 30일 실측을 바탕으로 한 예시다. 동작의 정본은 이 문서다.
- 선행 스펙 `2026-09-15-compare-tab-redesign-design.md`(UI-4g7p)의 §3 화면·§4.4~4.5
  묶기·§5 응답 형태를 대체한다. 결과 사다리(§4.2)·문제 기준(`2026-09-16-compare-problem-criteria-design.md`)·
  기간(`2026-09-17-compare-period-short-and-custom-range-design.md`)·attempt `exec_preset`
  기록(§6)은 그대로 쓴다.

## 1. 사용자 결과

사용자는 오케스트레이터 모델, 구현 리프 모델(자동으로 고른 경우와 프리셋이 정한 경우),
프리셋 설정에 따라 어느 설정이 착지율·문제 세션·평균 시간·평균 비용 면에서 나은지
한눈에 알고 싶다. 지금 화면은 그 판단을 주지 못한다(§2). 사용자 결정(2026-11-12):

- 같은 설정의 기준은 **오케스트레이터와 구현 리프 설정**이다. 리뷰어만 다른 프리셋은
  한 줄로 묶고, 리뷰어 차이는 그 아래 줄로 함께 보인다(리뷰어가 품질을 바꿀 수 있으니
  같이 다룬다).
- quick fix와 일반 작업(spec_backed·full_plan)은 **나눠서** 비교하고 기준선도 따로 잡는다.
- 화면은 frontend-design 지침을 따라 다시 만든다.
- 어떤 세션이든 **오케스트레이터·구현 리프·리뷰어가 실제로 어떤 모델·effort로 돌았는지**는
  알 수 있어야 한다. 화면의 "모름"은 기록이 정말 없는 세션에만 남고, 그런 누락 자체를 막는다.
- 한 세션이 리프를 여러 개 썼다면 auto가 고른 것이므로 리프 런타임으로 묶는다:
  `claude auto`·`codex auto`·`모든 런타임 auto`.

## 2. 검증된 전제

- 그룹 키가 혼합 조합마다 갈리고(`mixed:<조합>`), 실행자 `main`·`미기록`이 그대로 이름이 된다 — server/worker/compare-projection.js:1140-1161
- 문제 판정의 시간·비용 기준선은 필터를 통과한 행 전체의 중앙값이다. 그래서 route 필터가 곧 기준선을 나눈다 — server/worker/compare-projection.js:714-733, 1314-1316
- 최고 표시 후보는 `n ≥ 3`·판정 `≥ 3`이다 — server/worker/compare-projection.js:1181-1182
- `group_by`는 `preset`·`orchestration`·`impl_actor` 셋이다 — server/worker/compare-projection.js:559-561
- 이슈 색인은 스냅샷 metadata에서 `impl_review_stats`를 이미 읽는다 — server/worker/compare-projection.js:1413-1421
- attempt의 기록된 프리셋은 `exec_preset`이고, 없으면 `presetMatch`로 추론한다 — server/worker/compare-projection.js:1272-1300, 310
- dispatch는 `exec_preset`을 attempt에 찍고, 이전 설정을 잇는 재개는 그것을 승계한다 — server/worker/scheduler.js:14694, 17488, 19511, 20196-20197
- scheduler는 dispatch 때 `workflow_session_defaults` kv를 이미 fail-quiet로 읽는다 — server/worker/scheduler.js:5965-5975
- attempt `exec_values`의 구현·리뷰 키는 Bead 핀 층만 담는다. kv 프로필 값은 들어가지 않는다 — server/worker/policy.js:309-330
- quick fix 전용 kv 키(`quick_fix_impl_review_model` 등)는 비어 있으면 같은 이름의 일반 키로 내려간다. 예외로 `quick_fix_impl_dispatch`는 일반 kv 층이 없다(kv `impl_dispatch` 금지) — server/worker/exec-enums.js:152-174
- 실행 영수증(`exec_receipt`)은 push 직전 최종 head에서 한 번 쓴다. 그래서 push까지 못 간 attempt에는 실행자가 남지 않는다 — dotfiles workflow 스킬 SKILL.md `## Execution`(`write-exec-receipt.py` 단락)
- attempt는 실제로 돈 하위 실행을 durable하게 남긴다: `usage_segments`(오케스트레이터 모델 조각), `usage_legs`(Claude 하위 에이전트는 `agent_type`·`model`·`effort`, Codex 레그는 `role: implementation|review-consult`·`model`·`effort`), `codex_children`(Codex 네이티브 하위 세션의 `agent_path`·`model`·`effort`) — server/worker/queue-store.js:177-189, 433-461; server/worker/usage-receipts.js:149-226; server/worker/codex-children/normalize.js:103
- 레그는 Worker가 붙잡은 세션 스트림과 attempt별 사용량 영수증 파일에서 모인다 — server/worker/scheduler.js:3336-3381, 3591-3621
- 실측(attempt 기록 스캔, 최근 구현 attempt): Claude 오케스트레이터 `done` 336건 중 구현 리뷰 레그 324건·`impl-<effort>` 리프 레그 160건(나머지는 직접 구현), Codex 오케스트레이터 `done` 208건 중 `codex_children` 202건. 비교 투영은 이 기록을 읽지 않고 `exec_receipt`·프리셋 추정만 본다 — server/worker/compare-projection.js:164-216, 1272-1300
- 실측(30일 417건): attempt 대화 기록이 Worker 세션 폴더에 없는 17건 중 대부분이 tmux 대화형 attempt(`interactive` 필드)이고, 그 대화 파일은 `~/.claude/projects/<cwd>/<session_id>.jsonl`에 남아 있지만 `usage_segments`·`usage_legs`가 비어 있다. 대화형 경로는 종료 때 레그를 모으지 않는다.
- 구현 리뷰 영수증의 `self@`는 수정 뒤 후속 리뷰가 앞 리뷰어 토큰을 덮어쓴 것이라, 영수증 접두어로는 처음 리뷰어를 알 수 없다 — dotfiles docs/contracts/workflow-contract.md:76
- 화면 조작은 `.op-btn`·`.ui-select`·`.ui-chip` 부품과 역할 토큰만 쓴다 — docs/design-system.md:84-165
- 실측(`get-compare`, 30일, 2026-11-12): 417세션 중 실행자 `미기록` 113건(92건 quick fix), 프리셋 미대조 46건, 구현 실행자 축 15그룹. 일반 작업에서 착지하지 못한 attempt 24건은 모두 실행자 기록이 없다(실제 리프별 착지율은 생존 편향). 섞인 기준선으로는 문제 세션 52%, 일반 작업만으로는 76%이고 그중 109건이 리뷰 지적이다.
- 실측(`subscribe-impl-presets`): `오퍼스 high`와 `오퍼스 오토`는 오케스트레이터(opus·high)와 구현 리프(claude·auto·auto)가 같고 `impl_review_model`만 다르다(astra·codex). 고정 리프 프리셋(`오퍼스 → 소넷 (실험)`)은 전체 기간 5건, 최근 30일 0건이다.
- 실측(큐 attempt 스캔): 최근 구현 attempt의 `exec_values.impl_*`는 Bead 핀이 있던 몇 건을 빼고 모두 `null`이다.
- 실측(`bd kv get workflow_session_defaults`, beads-ui, 2026-11-12): 키가 최상위에 있고(`schema: 1`, `impl_runtime: codex`, `impl_model: sol`, `impl_effort: auto`, `impl_review_model: codex`, `impl_review_effort: xhigh` …) quick fix 키는 비어 있다. 같은 시각 큐의 `applied_exec_preset`은 `null`이다 — 프리셋 없이 바꾼 설정은 프리셋 추정으로 알 수 없고, 프리셋 기록 없이 sol 리프로 돈 일반 작업 11건이 이 경우로 보인다.
- 실측(`gen.json`): `오퍼스 high`는 10-13~11-08, `오퍼스 오토`는 11-07~11-11에 쓰였다. 두 프리셋의 비용 차이는 실제 리프가 같은 세션 안에서도 남지만(opus · high 리프 $27.88 대 $19.92), 시기와 작업이 함께 달라 리뷰어 효과로 단정할 수 없다.

## 3. 접근

1. **작업 종류 → 보기 기준 → 비교 표**(선택). 맨 위에서 작업 종류를 고르고, 보기
   기준(설정·오케스트레이터·구현 리프·리뷰어)을 고르면 한 표가 같은 열로 그룹을 견준다.
   막대마다 그 작업 종류의 평균 눈금을 그어, 숫자를 읽지 않아도 평균보다 나은지 보인다.
2. 카드 격자 유지(현행). 카드 하나에 KPI 넷이 갇혀 그룹끼리 같은 지표를 나란히 볼 수
   없고, 하위 줄(리뷰어별)을 놓을 자리가 없다.
3. 오케스트레이터 × 리프 지도(히트맵). 최근 30일 일반 작업은 오케스트레이터가 opus·high
   하나뿐이라 한 줄짜리 지도가 된다. 표의 `오케스트레이터` 보기로 충분하다.

## 4. 화면

### 4.1 구성 (위에서 아래로)

1. 머리: 제목 `실행 설정 비교`, 기간·저장소 select, `문제 기준`, `새로고침`. 기존
   route select는 없앤다(작업 종류가 대신한다).
2. **작업 종류 전환**: `일반 작업`(spec_backed·full_plan) | `quick fix`, 각 버튼에
   세션 수. 기본 `일반 작업`, 선택은 `localStorage`(`bdui.compare.work_type`)에 둔다.
   요청의 `routes`가 이것으로 정해진다. route가 없는 attempt는 두 쪽 어디에도 들지 않는다.
3. **기준선 문장**: 선택한 작업 종류의 세션·이슈·진행 중 수와 착지율·문제 세션·평균
   시간(중앙값)·평균 비용(중앙값)을 한 문장으로 적고, 막대의 세로 눈금이 이 평균이라고
   밝힌다. 큰 숫자 줄은 두지 않는다.
4. **보기 기준** segmented: 일반 작업은 `설정`(기본)·`오케스트레이터`·`구현 리프`·`리뷰어`,
   quick fix는 `설정`(기본)·`리뷰어`. quick fix는 직접 구현이 기본이라 설정이 곧
   오케스트레이터이므로 두 보기를 따로 두지 않는다. 옆에 그 보기의 한 줄 설명.
5. **눈여겨볼 차이**(§4.4).
6. **비교 표**(§4.2)와 범례(문제 종류 색, 초록 칸 뜻).
7. **용어 설명**(`<details>`, 접힘): 오케스트레이터·구현 리프·리프 자동/고정·직접 구현·
   auto 묶음(`claude auto` 등)·관측 기록 없음·추정/설정 모름·착지·문제 세션·표본 적음을 평이하게
   설명하고, 바뀐 이름은 예전 이름을 함께 적는다.

### 4.2 비교 표

- 열: 이름 | 세션(이슈 수 보조) | 착지율 | 문제 세션 | 평균 시간 | 평균 비용. `구현 리프`
  보기는 끝에 `리프를 고른 방식`(설정 기준 자동 n·고정 n·모름 n)을, `리뷰어` 보기는 끝에
  `리뷰 라운드`(착지 이슈 평균)를 더한다.
- 지표 칸: 값, 막대(같은 표 안 최댓값 기준, 비율은 0~100%), 평균 눈금, 보조 줄(착지
  `a/b`, 문제 `a/n`, `중앙값 …`). 문제 세션 막대는 전체 길이가 `problem_rate`이고, 그 길이를
  문제 기준에서 켜진 **모든** 키(실패·폐기·재시도·리뷰 지적·사람 개입·verify 실패·시간 초과·
  비용 초과·핀 조정)의 건수 비율로 나눈 색 조각이다. 한 세션이 여러 키에 걸리면 키별 건수는
  각각 세지만 조각은 비율로만 나누므로 막대는 `problem_rate`를 넘지 않는다. 툴팁은 키별 실제
  건수와 "한 세션이 여러 종류에 걸릴 수 있음"을 적는다.
- 최고 표시: 견줄 단위(§5.5) 가운데 착지율 최고·문제 세션 최소·평균 시간 최단·평균 비용
  최저인 칸을 초록으로 칠하고 `최고`·`최소`·`최단`·`최저` 꼬리표를 단다. 동률이거나
  단위가 하나뿐이면 달지 않는다.
- 표본 적음: `n < 5`인 줄은 흐리게, `표본 적음` 칩을 달고, 정렬과 무관하게 아래로 보낸다.
- `리프 설정 모름`·`관측 기록 없음` 줄은 점선 칩(`프리셋 기록 없음`·`실행 기록 없음`)을 달고
  최고 표시·찾은 차이에서 뺀다.
- 정렬: 열 머리를 누르면 그 지표로 정렬하고 다시 누르면 방향을 바꾼다. 기본은 세션 수
  내림차순.
- 하위 줄: `설정` 보기에서 그룹 안 리뷰어가 둘 이상이면 리뷰어별 줄을 **늘** 펼쳐 보이고,
  각 지표에 부모 줄 대비 차이(`−$3.35`, `−4.5분`, `−1.3p`)를 초록/빨강으로 붙인다.
  `구현 리프` 보기의 강도별 줄과 다른 보기의 설정별 내역은 줄을 펼쳐야 보인다.
- 줄을 펼치면 세션 목록이 나온다. 세션 행은 현행 형식(결과 점·ID 제목·구성 줄·결과
  문구·문제 칩·시간·비용, 이슈 상세 딥링크)을 그대로 쓰고 구성 줄의 이름만 §5.3 용어로
  바뀐다. 펼침 상태는 뷰 상태이며 새로고침 뒤에도 그룹 키로 유지된다.

### 4.3 모바일 (≤640px)

- 작업 종류 버튼은 두 칸 그대로, 보기 기준은 2×2 격자(높이 32px, 줄바꿈 없음).
- 표 머리는 숨기고 각 줄은 이름(전폭) → 세션 수(전폭) → 지표 2×2 격자로 쌓는다. 각
  지표 칸은 자기 열 이름을 작은 글자로 단다. 정렬은 select 하나로 바꾼다.
- 세션 행은 점 | 제목·구성 줄 | 시간·비용 세 칸. 가로 스크롤 요소는 없다.

### 4.4 눈여겨볼 차이

보기마다 견줄 단위의 집계에서 규칙으로 만든 문장 두세 개를 목록으로 둔다. 숫자는
응답 값 그대로이고, 차이는 관계로만 적으며 원인을 단정하지 않는다.

- 단위가 둘 이상이면: 세션 수가 많은 두 단위를 견준다. 예: `리뷰어가 codex인 세션은 astra인
  세션보다 평균 비용이 $5.48(22%) 낮고 7.4분 짧습니다. 문제 세션 비율은 76%와 78%입니다.`
- 견준 두 단위의 쓰인 기간(`first_finished_at`~`last_finished_at`)이 짧은 쪽 기간의 절반도
  겹치지 않으면 바로 뒤에: `두 줄은 쓰인 기간이 거의 겹치지 않아(10-13~11-08 대 11-07~11-11)
  시기와 작업 차이가 섞여 있습니다.`
- 문제 세션의 한 종류가 절반 이상이면: `문제 세션 124건 중 109건이 리뷰 지적입니다.`
- 순위에서 뺀 설정 모름 세션이 있으면 그 수.
- 평균 시간이 중앙값의 2배를 넘으면: 평균이 몇몇 긴 세션에 끌려 있다는 주의 한 줄.
- 추정 근거(§5.1의 `preset_current`) 행이 있으면: `리프·리뷰어 설정 n건은 실행 당시 기록이
  없어 프리셋의 지금 설정으로 추정했습니다.`
- 단위가 하나뿐이면: `오케스트레이터`·`구현 리프` 보기는 `견줄 수 있는 <단위>가 하나뿐입니다
  — 기간을 넓혀 보세요.`, `설정` 보기는 `견줄 수 있는 설정이 하나뿐입니다 — 구현 리프 보기에서
  실제 리프끼리 견줘 보세요.`(지난 기간의 행은 대부분 프리셋 기록이 없거나 삭제된 프리셋이라
  기간을 넓혀도 `리프 설정 모름`만 는다).
- `구현 리프` 보기에는 늘: 자동 선택은 작업에 맞춰 리프를 고르므로 리프 간 차이에 작업
  크기 차이가 섞여 있다는 주의.
- `설정`·`리뷰어` 보기에는 늘: 설정마다 맡은 작업이 달라 차이에 작업 차이가 섞여 있다는 주의.
- `리뷰어` 보기에는 늘: 리뷰어가 착지 뒤 품질에 주는 효과는 재지 않고 라운드·지적·비용·
  시간만 견준다는 주의.
- `관측 기록 없음` 행이 있으면: `실행 기록이 없는 세션 n건은 어떤 모델로 돌았는지 알 수
  없어 순위에서 뺐습니다.`
- 견줄 행이 하나도 없으면 표 자리에 빈 상태 문장: 무엇이 없어서 못 견주는지.

## 5. 데이터 정의

### 5.1 행의 실제 실행과 설정

행(종단 구현 attempt 하나, 선행 스펙 §4.1 그대로)마다 **실제로 돈 것**(`executed`)과
**정해 둔 것**(설정)을 따로 둔다. 모델·effort 비교는 실제 실행으로 하고, 자동/고정처럼
실행에서 알 수 없는 것만 설정으로 한다.

**실제 실행 `executed`** — attempt 기록에서만 읽는다(§2).

- `orchestrator`: attempt `model`·`effort`와, `exec_values.orchestration_speed`가 `fast`이면
  `fast`. 이름 예: `opus · high`, `astra · xhigh · fast`.
- `leaves[]`(`{ runtime, model, effort, cost_usd }`): Claude 하위 에이전트 레그 중
  `agent_type`이 `impl-<effort>`인 것(effort는 레그 `effort`, 없으면 `agent_type`의 접미어),
  Codex 레그 중 `role = implementation`인 것, `codex_children` 중 `agent_path`가 구현을 뜻하고
  리뷰를 뜻하지 않는 것(예: `/root/implement…`). 모델은 카탈로그 정규화 이름(`gpt-5.6-sol` ≡
  `sol`, `claude-opus-5-5` ≡ `opus`). 전송용 레그(`codex-runner`)와 그 밖의 하위 에이전트
  (`general-purpose` 등)는 리프가 아니다.
- `reviewers[]`(`{ model, effort }`): 구현 게이트 리뷰 레그 — Codex `role = review-consult`이고
  영수증 ID가 spec·plan 리뷰가 아닌 것, `codex_children` 중 `agent_path`가 구현 리뷰를 뜻하는
  것, Claude `advisor` 계열 하위 에이전트.
- `observed`: `usage_segments`·`usage_legs`·`codex_children` 중 하나라도 있으면 참.

**설정** — 근거(`basis`)는 아래 층에서 위에서부터 처음 값이 있는 것이다.

- `leaf_setting`(일반 작업만): `{ mode: 'auto'|'fixed'|'direct'|'default'|'unknown', model, effort, runtime, basis }`.
- `reviewer_setting`: `{ model, effort, basis }` 또는 모름(설정 보기의 하위 줄은 실제 리뷰어로
  나누므로 이 값은 응답에만 싣는다).

1. `recorded` — attempt의 `exec_profile`(§6). 키가 `null`이면 그 설정은 `default`(설정 없음,
   하네스 기본값)다.
2. `pinned` — `exec_values`의 해당 키가 `null`이 아니다(Bead 핀).
3. `preset_current` — 행의 프리셋(기록 또는 추론)의 **지금** 설정이 그 키를 담는다. 담지
   않으면 이 층은 값을 주지 않는다.
4. 모두 없으면 `unknown`.

리프 모드: `impl_dispatch = main` → `direct`(직접 구현), `impl_model = auto`이거나 모델이
`null`이고 런타임만 있으면 → `auto`(런타임이 `auto`가 아니면 이름에 붙인다), 그 밖의 모델 →
`fixed`, `recorded`에서 `impl_dispatch`·`impl_runtime`·`impl_model`이 모두 `null` → `default`.

### 5.2 보기 기준별 그룹 키

- `setting`(기본, `preset`은 별칭으로 읽는다): quick fix는 `orchestrator` 하나, 일반 작업은
  `orchestrator → leaf_setting`. 이름 예: `opus · high → 리프 자동 · claude`,
  `opus · high → 리프 고정 sonnet`, `opus · high → 리프 설정 모름`. 프리셋 이름은 그룹의
  `aliases`(이름별 건수, 프리셋 없음은 `프리셋 기록 없음`)로만 싣는다 — 프리셋 이름이 다르고
  설정이 같으면 한 그룹이다.
- `orchestration`: `executed.orchestrator`.
- `impl_actor`: `executed.leaves`의 **모델**. 리프 모델이 하나면 그 모델(예: `opus`,
  `sonnet`, `sol`), 둘 이상이면 auto가 고른 것으로 보고 리프 런타임으로 묶는다 — 모두
  Claude면 `claude auto`, 모두 Codex면 `codex auto`, 섞이면 `모든 런타임 auto`(구성은 행의
  `leaves`). 관측은 있는데 리프가 없으면 `직접 구현`, 관측이 없으면 `관측 기록 없음`. 강도는
  그룹 키가 아니라 하위 내역이다. 결과와 무관하게 모든 행을 넣는다(실패한 세션도 리프 레그가
  남는다). `실행 영수증`(`exec_receipt`)은 이 축에 쓰지 않는다.
- `reviewer`: `executed.reviewers`의 모델·effort(예: `codex · xhigh` — `gpt-6.1-sol`은
  카탈로그 이름으로). 둘 이상이면 `여러 리뷰어`, 관측은 있는데 구현 리뷰 레그가 없으면
  `외부 리뷰 없음`(자체 리뷰였거나 리뷰 전에 끝남), 관측이 없으면 `관측 기록 없음`. 구현 리뷰
  영수증의 접두어는 쓰지 않는다(§2, `self@` 덮어쓰기).
- `setting` 보기의 하위 줄도 `reviewer` 보기와 같은 실제 리뷰어 키로 나눈다.

### 5.3 용어

| 지금 | 바뀐 이름 |
| --- | --- |
| `main` | `직접 구현` |
| 실행자 `미기록` | 없음 — 실제 실행 레그로 판정하고, 기록이 정말 없으면 `관측 기록 없음` |
| `혼합 n종`·`<모델>/혼합` | `claude auto`·`codex auto`·`모든 런타임 auto` |
| 오케스트레이션 `미기록` | `관측 기록 없음` |
| `미대조` 배지 | 없음 — `리프 설정 모름` 이름과 점선 칩 |

### 5.4 집계

- 그룹·하위 줄은 선행 스펙 §4.5의 집계 필드(`n`·`issue_count`·`landed`·`judged`·
  `in_flight`·`landing_rate`·`problem_count`·`problem_rate`·`problems`·`duration_ms`·
  `cost_usd`·`tokens`의 `{ mean, median, sample, total, partial_count }`)를 그대로 갖고,
  `review_rounds_mean`(대표 attempt의 `impl_review_stats.round` 평균), 쓰인 기간
  `first_finished_at`·`last_finished_at`, 실제 리프 분포 `actual_leaves`(§5.2 `impl_actor`
  이름별 건수, 건수 내림), 관측 없는 행 수 `unobserved_count`를 더한다. `설정` 보기의 이름 아래 보조 줄은 프리셋 이름 건수와
  실제 리프 분포(예: `실제 리프 sol 11 · opus 1`)를 함께 적는다.
- 하위 내역 `children`: `setting`은 실제 리뷰어별(둘 이상일 때), `impl_actor`는 강도별과
  리프 모드별(auto 묶음은 리프 모델 구성별), `orchestration`·`reviewer`는 설정별. 각 항목은
  같은 집계 필드다.
- 문제 판정 기준선은 지금처럼 필터를 통과한 행 전체(= 선택한 작업 종류)에서 잡는다.
- 평균이 머리값이고 중앙값은 보조다(선행 스펙 결정 유지).

### 5.5 견줄 단위와 최고 표시

- 견줄 단위: `setting` 보기는 하위 줄이 있으면 하위 줄, 없으면 그룹. 다른 보기는 그룹.
- 자격: `n ≥ 5`, 착지율은 판정 `≥ 3`, `리프 설정 모름`·`관측 기록 없음`이 아님.
- 서버가 단위마다 `best: string[]`(`landing`·`problem`·`duration`·`cost`)와 `small_sample`,
  `eligible`을 싣는다. 찾은 차이 문장은 클라이언트가 이 값으로 만든다.

## 6. 실행 당시 설정 기록 (`exec_profile`)

앞으로의 attempt가 추정 없이 리프·리뷰어 설정을 갖도록, `exec_preset`을 찍는 같은
dispatch 지점에서 `exec_profile`을 durable 필드로 더한다.

- 모양: `{ impl_dispatch, impl_runtime, impl_model, impl_effort, impl_review_model, impl_review_effort }`,
  각 `string|null`, 또는 전체 `null`.
- 값: 키마다 Bead 핀(`resolveExecSettings`에 넘기는 bead 층) → route가 quick_fix면
  `quick_fix_<key>` kv → 일반 `<key>` kv(`workflow_session_defaults`) 순으로 처음 있는 값.
  `impl_dispatch`는 일반 kv 층이 없으므로 Bead 핀 → `quick_fix_impl_dispatch`만 본다.
- kv를 못 읽으면 `exec_profile`은 `null`이다(fail-quiet, dispatch는 막지 않는다).
- 재개: 이전 설정을 잇는 재개(`use_prior`)는 `prior.exec_profile`을 승계하고, 지금 설정을
  고른 실행은 새로 기록한다(`exec_preset`과 같은 규칙).
- `queue-store.js` attempt typedef에 필드를 더하고, 없는 과거 기록은 `null`로 읽는다.
- UI 소유 관측값이며 workflow metadata·영수증·게이트 입력이 아니다. 실제로 돈 리프·리뷰어는
  §5.1의 실행 레그가 말한다.

결정: kv 키 이름은 `exec-enums.js`의 기존 registry(`QUICK_FIX_KV_KEYS` 등)에서 가져오고
새로 적지 않는다 — 계약 키의 정의자는 dotfiles다(ADR UI-jlov).

### 6.2 실행 레그 누락 막기

- 대화형(tmux) attempt도 끝날 때(성공·실패·중지·파킹) 그 세션의 대화 파일(Claude는
  `~/.claude/projects/<cwd 슬러그>/<session_id>.jsonl`, Codex는 그 스레드 rollout)을
  기존 세션 관측 fold(`session-observation.js`)로 읽어 `usage_segments`·`usage_legs`·
  `codex_children`을 headless attempt와 같은 모양으로 남긴다. 사용량 영수증 파일 수집은
  지금처럼 함께 돈다.
- 이미 끝난 attempt 중 관측이 비었고 `session_id`의 대화 파일이 남아 있는 것은 서버가 한 번
  보충한다(기존 종단 영수증 복구처럼 워크스페이스당 한 번에 몇 건씩, 결과를 durable하게
  쓰고 다시 읽지 않는다). 파일이 없으면 건너뛰고 그 attempt는 `관측 기록 없음`으로 남는다.
- 종단 attempt가 관측 없이 끝나면 그 bead 타임라인에 `observation_missing` 이벤트를 한 줄
  남겨(원인: 대화 파일 없음·읽기 실패) 누락이 조용히 쌓이지 않게 한다.

## 7. 프로토콜

- op은 그대로 `get-compare` → `compare-snapshot`.
- 요청: `group_by`는 `setting`(기본)·`orchestration`·`impl_actor`·`reviewer`, `preset`은
  `setting`으로 읽는다. `routes`는 작업 종류가 정한다. 나머지 필드는 그대로.
- 응답: `{ summary, groups, rows, workspaces, warnings, criteria }`.
  - `rows[]`에 `executed`(`{ orchestrator, leaves, reviewers, observed }`)·`leaf_setting`·
    `reviewer_setting`를 더하고, `composition`은 실제 실행으로 짓는다(예: `opus · high →
    sonnet · high`, `opus · high → claude auto`). `impl_actor`·`preset_candidates`는 없앤다.
  - `groups[]`는 §5.2~5.5 형태: `key`·`name`·`aliases`·집계·`children`·`best`·
    `small_sample`·`eligible`·`inferred_count`(설정 근거가 `preset_current`인 행 수). `badge`는
    없앤다.
- `app/protocol.md`의 `get-compare` 절을 이 형태로 다시 쓴다.

## 8. 오류 처리

- 표시는 fail-quiet: 프리셋 저장소·kv·카탈로그 부재는 `모름`·`—`다. 프리셋 저장소를 못
  읽으면 지금처럼 `warnings: ['preset_store_unreadable']`를 싣고 표 위에 한 줄로 보인다.
- `get-compare` 실패는 지금처럼 오류 한 줄과 `새로고침`.

## 9. 테스트

- `compare-projection.test.js`:
  - 실제 실행: Claude `impl-high` 레그 → 리프 `opus · high`, Codex `role = implementation` 레그와
    `codex_children` 구현 경로 → Codex 리프, `codex-runner`·`general-purpose` 레그는 리프 아님;
    리뷰 레그(`review-consult`, spec 리뷰 영수증 제외, `codex_children` 구현 리뷰 경로); 관측
    없음 → `관측 기록 없음`; 실패한 attempt도 리프 레그로 묶인다.
  - `impl_actor`: 단일 모델(`gpt-5.6-sol` ≡ `sol`), 여러 모델 → `claude auto`·`codex auto`·
    `모든 런타임 auto`, 리프 없음 → `직접 구현`; 강도·구성 하위 내역.
  - `reviewer`·`setting` 하위 줄이 실제 리뷰어로 나뉘고 영수증 접두어(`self@`)를 쓰지 않는다;
    여러 리뷰어·외부 리뷰 없음.
  - 같은 오케스트레이터·리프 설정에 리뷰어만 다른 두 프리셋이 한 `setting` 그룹이 된다; quick
    fix `setting` 키는 오케스트레이터만 본다.
  - 설정 근거 층 순서(`recorded` > `pinned` > `preset_current` > `unknown`)와 `recorded`의 `null` →
    `default`; 프리셋이 키를 담지 않으면 `preset_current`가 값을 주지 않는다; 리프 모드 다섯(런타임만
    있고 모델이 `null`이면 `auto`).
  - 기준선: 같은 attempt 집합에서 `routes`를 일반 작업·quick fix로 바꾸면 시간·비용 초과 판정
    기준선(`criteria.baselines`)이 각 종류의 중앙값이 된다.
  - 문제 막대 재료: 한 세션이 여러 문제 키에 걸려도 `problem_count`는 한 번이고 키별 건수는 각각
    센다(§4.2 막대 규칙의 입력).
  - `actual_leaves`·`unobserved_count`·`first/last_finished_at`·`review_rounds_mean`; 견줄 단위·자격
    (`n ≥ 5`, 모름·관측 없음 제외)·동률이면 `best` 없음; `small_sample`; `preset` 별칭; §5.3 이름.
- `compare-handlers.test.js`: `group_by` 정규화(`reviewer`·`preset` 별칭·잘못된 값).
- `scheduler.test.js`·`queue-store.test.js`:
  - dispatch가 Bead 핀 > quick fix kv > 일반 kv 순으로 `exec_profile`을 기록한다; quick fix의 빈
    `quick_fix_impl_review_model`이 일반 키로 내려가고 `impl_dispatch`는 일반 kv를 보지 않는다;
    kv 읽기 실패면 `null`이고 dispatch는 계속된다; `use_prior` 재개가 승계한다; 과거 기록이
    `null`로 읽힌다.
  - 대화형 attempt 종료가 대화 파일 fold로 `usage_segments`·`usage_legs`를 남긴다(성공·실패·중지
    각각); 관측 빈 종단 attempt 보충이 파일이 있으면 채우고 없으면 건너뛰며 한 번만 돈다; 관측
    없이 끝나면 `observation_missing` 이벤트가 한 줄 남는다.
- `app/views/compare/index.test.js`: 작업 종류 전환이 `routes`로 재요청하고 선택을 저장한다;
  quick fix에는 `설정`·`리뷰어` 보기만 있다; 표의 최고 칸·`표본 적음`·점선 칩; 열 머리 정렬;
  리뷰어 하위 줄과 부모 대비 차이; `구현 리프` 보기의 착지율 열과 `리프를 고른 방식` 열; 문제
  막대 길이가 `problem_rate`와 같고 조각이 켜진 모든 문제 키를 담는다(여러 키에 걸린 세션 포함);
  찾은 차이 규칙(두 단위 비교·기간 겹침 주의·종류 절반·평균이 중앙값 2배 초과 주의·보기별 단위
  하나 안내·추정 안내·관측 없음 건수·작업 차이 주의·빈 상태); 용어 설명; 세션 펼침 유지와 딥링크.
- 모바일은 Pre-Handoff에서 390px 캡처(npx 캐시 Playwright)로 §4.3 배치와 가로 넘침 없음을
  확인한다. 프론트 편집 뒤 prettier → `npm run build` 순서.

## 10. 구현 메모

- 화면 구현은 `frontend-design` 지침을 `docs/design-system.md` 안에서 따른다: 새 조작은
  부품(`.op-btn`·`.ui-select`·`.ui-chip`)으로만, 역할 규칙은 색·배치만, 원시 값 대신 토큰.
- `app/views/compare/index.js`(1108줄)는 표·찾은 차이·용어를 별도 모듈로 나눠도 된다
  (예: `table.js`, `findings.js`, `labels.js`).

## 구현 unit 후보

1. 기록 — `server/worker/scheduler.js`·`server/worker/queue-store.js`·`server/worker/session-observation.js`(§6).
2. 투영 — `server/worker/compare-projection.js`·`server/ws/compare-handlers.js`·`app/protocol.md`(§5·§7).
3. 화면 — `app/views/compare/`·`app/styles.css`(§4).

## 결정 (ADR 후보)

- 전제: ADR UI-jlov — 계약 kv 키는 dotfiles가 정의하고 beads-ui는 코드 registry로 복제한 subset만 읽으며 부재는 fail-quiet 표시 생략이다.
- 전제: ADR UI-u6ud-9 — 비용은 검증된 직접 사용량 합이고 불완전한 범위는 부분 집계로 표시한다.
- 전제: ADR UI-u6ud — 이슈 제목·상태·`impl_review_stats`는 워크스페이스 스냅샷 투영에서 읽는다.
- **비교의 모델·effort 축(오케스트레이터·구현 리프·리뷰어)은 attempt가 남긴 실제 실행 레그
  (`usage_legs`·`codex_children`·`usage_segments`)이고 대화형 attempt도 종료 때 같은 레그를
  남기며, 자동/고정 같은 설정 축만 dispatch가 기록한 `exec_profile` → Bead 핀 → 프리셋의 지금
  설정 순으로 읽는다** — 되돌리기 어려움: 성립(attempt 기록 형식이 늘고 scheduler의 dispatch·
  대화형 종료, queue-store attempt 기록, session-observation fold, compare-projection,
  `app/views/compare/`가 함께 움직이며, 쌓인 기록은 지울 수 없다). 맥락 없이 놀라움: 성립(실행
  영수증·리뷰 영수증이 아니라 사용량 레그가 실행자의 정본인 이유, 여러 리프가 `auto` 묶음이 되는
  이유, 같은 프리셋 이름이 시점에 따라 다른 그룹에 드는 이유). 실제 트레이드오프: 성립(정확한
  기록 vs dispatch·종료 경로 확장; 레그 분류 규칙의 유지 비용). UI-v4cc가 UI-2mvi에서 그대로 승계한 "dispatch가
  attempt에 적용 프리셋을 기록한다"(`dispatchPreset`·attempt 기록) 조항과 소비자를 공유하므로
  그 ADR을 다시 쓴다. 뒤집는 조항은 없고 기록 필드와 비교 읽기 규칙을 더한다.
  `summary`: "비교의 오케스트레이터·구현 리프·리뷰어 모델·effort는 attempt가 남긴 실제 실행 레그로 읽고 대화형 attempt도 종료 때 같은 레그를 남기며, 자동/고정 같은 설정만 dispatch가 기록한 exec_profile → Bead 핀 → 프리셋의 지금 설정 순으로 읽는다 — 나머지 조항은 UI-v4cc 그대로다"
  → ADR, supersede UI-v4cc
- 작업 종류 분리와 종류별 기준선, 리뷰어를 뺀 설정 묶기와 리뷰어 하위 줄, 비교 표 배치,
  `n ≥ 5` 표본 규칙, 용어 변경, 찾은 차이 문장 — 표시 정의이며 언제든 되돌릴 수 있다 → ADR 아님

## 경계·후속

- 관찰: 리뷰어가 착지 뒤 품질(되돌림·후속 결함 Bead)에 주는 효과는 재지 않는다 — 측정 재료(되돌림·`discovered-from` 결함 연결)를 비교 투영이 읽지 않고, 지금 요청 범위 밖이다.
- 관찰: 이슈당 비용(재시도 합산)은 세션당 평균과 순위가 같았다(실측 두 그룹) — 순위가 갈리는 사례가 쌓이면 머리값 단위를 다시 본다.
- 관찰: 고정 리프 프리셋 표본이 최근 30일 0건이라 자동/고정 비교는 기간을 넓혀야 보인다 — 데이터 문제이며 설계 변경이 아니다.
