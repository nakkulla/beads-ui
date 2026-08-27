---
scope:
  - app/views/detail-panel/index.js
  - app/views/monitor/dep-candidates.js
  - app/views/monitor/index.js
  - app/views/worker/lanes.js
  - app/main.js
  - app/styles/base.css
  - app/styles.css
  - server/list-adapters.js
  - server/subscriptions.js
---

# 의존성 편집기를 이슈 상세 패널로 이동 — Monitor 인라인 패널·⛓ 카드 버튼 제거

Bead: UI-lx45 (선행 UI-5ksp 닫힘, 2026-08-27). UI-5arl(후행 blocks 이슈 표시)은 이 Bead에
흡수됐다.

## 1. 배경과 결정

UI-5ksp 설계 중 사용자 결정(2026-08-27): 의존성 편집은 카드·행이 아니라 **이슈 자체**에서
한다. UI-5ksp는 그때까지 Monitor ⛓ 버튼을 카드·행 1번 줄 조작 슬롯에 임시로 두었다.

이 스펙의 사용자 결정(2026-08-27 브레인스토밍):

1. 후보 모집단은 세 탭 모두 `monitor_pipeline_store` 하나에서 온다. Monitor에서 열면 가시
   레포 전체, Board·Worker에서 열면 현재 워크스페이스로 필터한다. 서버 후보 API는 만들지
   않는다.
2. 편집은 **선행 한 방향**(이 이슈를 막는 이슈의 추가·해제)만이다. 후행은 읽기 전용이다.
   반대 방향은 상대 이슈의 상세에서 건다(Monitor 패널의 2026-08-25 §3.4 결정 유지).
3. 후행 이슈 데이터는 `issue-detail` 구독의 `bd show --include-dependents`로 받는다.
4. 별도 절을 만들지 않는다. 기존 `의존성` 절 하나에 모든 edge를 칩으로 두되, 칩의
   말머리와 색 티어로 종류를 구분한다(아이콘만으로는 구분되지 않는다는 사용자 지적).
5. 편집 조작은 바로 위 `라벨` 행과 같은 인라인 문법이다(팝오버 없음).

## 2. 범위

- `beads-ui` 한 저장소만 바꾼다. Beads dependency 의미·workflow 계약은 건드리지 않는다.
- 바꾸는 표면: 상세 패널 `의존성` 절, 후보 공급자 모듈, `main.js` 주입, `issue-detail`
  서버 어댑터·구독 delta, Monitor 인라인 패널·⛓ 버튼 제거, 관련 CSS·테스트.
- 바꾸지 않는 것: Board·Worker 카드의 기존 blocked 칩 표시, Monitor의 드롭·연결 레인
  op 경로(`planLaneCorrection`·`runPlanned`·`lanes.owner_of`), 서버 `dep-add`/`dep-remove`
  핸들러.

## 3. 데이터 흐름

### 3.1 후보 공급자 (`app/views/monitor/dep-candidates.js`)

Monitor `index.js`의 `depIssues()`와 `blockedByMap()`을 이 모듈로 옮겨 순수 함수로 만든다.

```js
/** @returns {DepCandidateModel} */
export function depCandidateModel(workspaces, workspaces_state, options)
// options: { root_dir?: string }
```

- `buildLanes(workspaces, workspaces_state)`(`./lanes.js`, 이미 export)를 돌려
  `running → pr_wait → queue → runnable_all` 순으로 `DepCandidateIssue`를 모은다(중복 ID는
  처음 것). 필터 이전 목록이다: `차단됨`·`스펙`·`의존 있음` 토글은 후보를 줄이지 않는다.
- `blocked_by_map`은 `workspaces[].bead_blocked_by`를 그대로 합친다(현 `blockedByMap()`
  의미).
- `options.root_dir`이 있으면 `issues`를 그 `root_dir`로 필터한다. `blocked_by_map`은
  필터하지 않는다 — 사이클 판정은 타 레포 edge까지 봐야 한다.
- 기존 `depCandidates(this_id, model)`·`filterDepCandidates`는 그대로 쓴다.

### 3.2 주입 (`app/main.js`)

`createDetailPanel` 옵션에 셋을 더한다.

```js
depCandidates: () => DepCandidateModel | null,
onDepChanged: ({ type, a, b }) => void,
subscribeCandidates: (cb: () => void) => () => void
```

- `depCandidates`: `monitor_pipeline_store.get()`이 `null`이면 `null`. 아니면
  `store.getState().view === 'monitor'`일 때 `depCandidateModel(ws, ws_state)`, 그 외
  탭에서는 `depCandidateModel(ws, ws_state, { root_dir: 현재 워크스페이스 path })`.
  현재 워크스페이스 path가 없으면 `null`.
- `onDepChanged`: `type === 'dep-add'`이고 Monitor view가 만들어져 있으면
  `monitor_view.recorrectSharedLane(type, a, b)`를 부른다. 그 외 no-op.
- **집계 채널 생명주기**: 지금 `ensureMonitorPipelineChannel(state.view === 'monitor')`은
  Monitor 탭에서만 `subscribe-monitor-pipeline`을 유지하고, 채널을 끊어도 store는 비워지지
  않아 Board·Worker에서는 비었거나 오래된 snapshot이 남는다. 이 술어를 한 함수
  `pipelineChannelWanted(state)` = `state.view === 'monitor' || state.selected_id != null`로
  모아 네 호출 지점(`syncSubscriptionsToView`·재연결·워크스페이스 전환·상태 구독)이 모두
  같은 값을 쓰게 한다. 상세가 열려 있는 동안은 어느 탭이든 채널이 살아 있고, 상세를 닫고
  Monitor 탭도 아니면 끊는다. 채널이 아직 첫 snapshot을 받기 전이면 `get() === null`이라
  §4.2의 `후보를 불러올 수 없음`이 잠깐 보였다가 snapshot 도착 시 렌더가 갱신된다. 상세
  패널의 public API는 `load`·`clear`·`destroy`뿐이고 재렌더 경로가 없으므로, 옵션
  `subscribeCandidates: (cb: () => void) => () => void`를 하나 더 받는다. `main.js`는 이를
  `monitor_pipeline_store.subscribe`로 채우고, 상세 패널은 `load(id)`에서 구독해 콜백마다
  `doRender()`하며 `clear`/`destroy`에서 해제한다.

### 3.3 op 전송 (상세 패널)

기존 `sendMutation`을 쓴다. 두 op 모두 `a = current_id`(피차단 = 이 이슈), `view_id =
current_id`, `root_dir = getWorkspacePath()`.

- 추가: `sendMutation('dep-add', { a, b: candidate_id, view_id, root_dir }, '의존 추가 실패')`
- 해제: `sendMutation('dep-remove', { a, b: blocker_id, view_id, root_dir }, '의존 해제 실패')`

`root_dir`을 항상 명시하는 이유: 서버는 명시 root에서만 `refreshDependencyTarget`으로 그
레포의 runnable cache와 큐 이벤트를 갱신한다. 상세 패널이 보여주는 이슈는 항상 활성
워크스페이스의 것이므로 이 값이 곧 피차단 이슈의 레포다(Monitor 패널의 `owner_of[a]`
규약과 같다). `getWorkspacePath()`가 비어 있으면 op를 보내지 않고 `레포를 알 수 없어
의존을 바꿀 수 없습니다` 토스트만 낸다.

응답은 `bd show` 결과 issue이므로 `current`가 즉시 교체된다. 낙관적 갱신은 하지 않는다.
`onDepChanged({ type, a, b })`는 **edge가 저장된 경우마다 정확히 한 번** 부른다: 성공
응답뿐 아니라 `bd_readback_failed`(쓰기는 반영됐고 확인 읽기만 실패)에도 부른다.
`bd_error`·`bad_request`·transport 오류에는 부르지 않는다. 그래야 §6 자동 교정이 확인
읽기 실패 때문에 영구히 빠지지 않는다.

### 3.4 후행 이슈 (`server/list-adapters.js`, `server/subscriptions.js`)

- `issue-detail` 매핑을 `['show', id, '--include-dependents', '--json']`으로 바꾼다.
  `dependents[]` 항목은 `{ id, dependency_type, status, title, ... }`이며, 항목의
  `dependency_type === 'blocks'`는 "현재 이슈가 그 항목을 막는다"는 뜻이다(이 rig의
  `bd 1.2.0-fork.1`에서 확인).
- 구독 delta(`ItemMeta`)에 `deps_signature`를 더한다: `dependencies`와 `dependents` 각
  항목의 `id`·`dependency_type`·`status`·`title`을 순서 보존으로 이어 붙인 문자열.
  `updated_at`·`closed_at`이 같아도 이 서명이 다르면 upsert한다. 두 필드가 모두 없는
  일반 목록 항목은 서명이 빈 문자열이라 기존 비교 결과와 같다.
- `dependents`·`dependencies`가 없거나 배열이 아니면 빈 배열로 본다(fail-quiet).

## 4. 상세 패널 `의존성` 절

### 4.1 칩

`depsTemplate`은 `data.dependencies`(선행·기타)와 `data.dependents`(후행)를 합쳐 세 종류로
분류한다.

| 종류 | 출처 | 표기 | modifier | 색 | `✕` |
| --- | --- | --- | --- | --- | --- |
| 막는 | `dependencies` 중 `blocks` | `⛓ 막는 <ID>` | `detail-dep--pred` | 본색(현 칩 색) | 있음 |
| 막히는 | `dependents` 중 `blocks` | `⛓ 막히는 <ID>` | `detail-dep--succ` | 저채도 | 없음 |
| 나머지 | `dependencies` 중 그 외 | `↩ 발견 <ID>` · `⌸ 상위 <ID>` · `관련 <ID>` · 그 외 type은 아이콘 없이 `<type> <ID>` | `detail-dep--other` | 저채도 | 없음 |

- 순서: 막는 → 막히는 → 나머지. 각 그룹 안은 CLI 반환 순서.
- `dependents` 중 `blocks`가 아닌 역방향 관계(`related`·`discovered-from`·`parent-child`)는
  표시하지 않는다 — 같은 edge가 `dependencies` 쪽에도 있어 중복되고, 역방향 의미가
  말머리로 정의돼 있지 않다.
- 칩 본문 클릭은 `onNavigate(id, root_dir?)`. `root_dir`은 §3.2 후보 모델의 `issues`에서
  같은 `bead_id`를 찾아 얻고, 없으면 생략한다(현재 워크스페이스로 간주). `main.js`의
  `onNavigate`는 `root_dir`이 있고 현재 워크스페이스와 다르면 Worker `openBlocker`와 같은
  순서(`switchWorkspace(root_dir)` 후 이동)를 쓴다. 이래야 Monitor에서 건 타 레포 선행 칩이
  현재 워크스페이스에서 잘못된 이슈를 찾지 않는다. `title` 속성에 `status · title`(둘 다
  있을 때), 없으면 생략.
- `✕`는 `--pred` 칩 안의 별도 버튼(`detail-dep__unlink`, `data-dep-b`)이다. 클릭하면
  `confirm('<blocker>가 <blockee>를 막는 연결을 끊을까요?')`(Monitor와 같은 문구,
  `globalThis.confirm` 부재 시 통과) 후 `dep-remove`.
- 저채도 색은 `app/styles/base.css`의 `.detail-dep` 옆에 `--succ`·`--other` 규칙으로 두며
  기존 토큰(테두리·글자 muted 토큰)만 쓴다. 새 색 토큰은 만들지 않는다.
- 칩이 하나도 없으면 기존 `의존성 없음`.

### 4.2 추가 조작

칩 아래에 `라벨` 행과 같은 문법의 한 줄을 둔다.

- `<input class="detail-dep-add__input" placeholder="막는 이슈 추가">`. 포커스가 있거나
  입력값이 비어 있지 않으면 아래에 후보 목록 `.detail-dep-add__list`를 편다.
- 목록은 `filterDepCandidates(depCandidates(current_id, model), query)` 결과. 항목은
  버튼(`.detail-dep-add__cand`, `data-dep-cand`)이며 `레포 배지(workspace_name) · ID ·
  제목`을 보이고, `disabled` 후보는 `disabled` 속성과 `title=<reason>`. 클릭 → `dep-add`.
  성공하면 입력을 비우고 목록을 닫는다.
- 레포 배지는 Monitor에서 열었을 때만 의미가 있지만 마크업은 세 탭 공통이다(같은 레포면
  전부 같은 배지가 보이는 것을 허용한다 — 탭별 분기를 만들지 않는다).
- 후보가 0건이면 목록에 `후보 없음` 한 줄.
- `depCandidates()`가 `null`을 돌려주면 입력 대신 `.detail-empty`로 `후보를 불러올 수
  없음` 한 줄(fail-quiet).
- `Escape`: 입력을 비우고 목록을 닫는다(`stopPropagation`으로 패널 닫힘 방지 — 라벨 입력과
  같음). `Enter`: 활성 후보가 정확히 1건(검색 결과가 1건이고 `disabled`가 아님)이면 그것을
  추가, 아니면 무시.
- 편집 상태(`dep_query`, 열림 여부)는 `load(id)`로 다른 이슈를 열 때 초기화한다.

### 4.3 세 탭 공통

마크업·동작은 어느 탭에서 열어도 같다. 차이는 §3.2의 후보 모집단(전 레포 / 현재 레포)뿐이다.

## 5. Monitor 제거 (`app/views/monitor/index.js`, `app/views/worker/lanes.js`, `app/styles.css`)

- 삭제: `dep_panel` 상태, `depPanel()` 템플릿, `toggleDepPanel`·`hasDepPanelHost`,
  `depIssues`·`blockedByMap`(§3.1로 이관), 클릭 위임의 `.mon-dep__btn`·`.mon-deppanel__unlink`·
  `.mon-deppanel__cand` 분기, 바깥 클릭·Escape의 `dep_panel` 닫기, `.mon-deppanel__search`
  입력 처리, `app/styles.css`의 `.mon-deppanel*` 블록.
- `candidateRow`의 `dep_action: true`와 `rowActions()`의 ⛓ 버튼을 제거한다.
  `candidateCard`의 `options.dep_action` 옵션은 호출자가 없어지므로 함께 제거한다.
  `worker-card__head-actions`는 다른 재료가 없으면 그리지 않는다(fail-quiet 유지).
- `.worker-dep__open`(blocked 칩) 클릭은 Monitor에서도 Worker의 `openBlocker`와 같은
  동작이 된다: `data-root-dir`이 현재 워크스페이스와 다르면 `switchWorkspace` 후
  `gotoIssue`, 같으면 바로 이동. Monitor에 이 이동 경로가 없으면 Worker의 것과 같은 형태로
  추가한다. 편집은 이동한 이슈의 상세에서 한다.
- `recorrectSharedLane(type, a, b)`를 `createMonitorView` 반환 객체의 public 메서드로
  노출한다. 내부 의미(`dep-add`만, 같은 chain lane 멤버일 때만 `planLaneCorrection` 재실행)는
  바꾸지 않는다.
- `sendDepOp`은 드롭·레인 op 경로에서 더 쓰이지 않으면 삭제하고, 쓰이면 유지한다(구현
  시 참조 확인; 어느 쪽이든 의미 변경 없음).
- UI-5ksp 스펙 §4.6과 UI-251y 스펙 §5.1의 "⛓ 의존성 버튼은 슬롯 1 조작" 문단에 정정
  한 줄을 덧붙인다: "UI-lx45가 이 버튼을 제거했다. 의존성 편집은 이슈 상세 `의존성`
  절이다." `AGENTS.md` 카드 배치 문법 절은 결정만 싣고 있어 바뀌지 않는다.

## 6. 오류 처리

- `dep-add`/`dep-remove`의 `bd_error`·`bad_request`: 상세 패널 토스트(`의존 추가 실패` /
  `의존 해제 실패`), 상태 변경 없음, 입력값 유지.
- `bd_readback_failed`: 쓰기는 이미 반영됐으므로 재전송하지 않는다. 토스트 문구는
  `저장됐으나 확인 실패 — 곧 갱신됩니다`로 구분하고 다음 구독 갱신에 맡기되,
  `onDepChanged`는 §3.3대로 한 번 부른다. 현 `sendMutation`은 오류 코드를 구분하지
  못하므로(모든 실패가 `false`) transport 오류 객체의 `code`를 읽어
  `{ ok: false, saved: true }`를 돌려주는 최소 분기를 더하고, 의존성 op 호출부만 이 값을
  본다.
- `getWorkspacePath()` 부재: §3.3의 토스트, op 미전송.
- `--include-dependents` 실패: 기존 `issue-detail` 오류 흐름(불완전 snapshot 없음).
- `dependents`·`dependencies` 형식 이상: 빈 배열(fail-quiet). ID를 정규화할 수 없는 항목은
  제외.

## 7. 검증

### Test scope

RED seam(현 구현에서 실패하고 변경 뒤 통과):

1. `app/views/monitor/dep-candidates.test.js`
   - `depCandidateModel`이 running·pr_wait·queue·runnable_all을 lane 라벨과 함께 모으고
     중복 ID를 하나로 만든다.
   - `root_dir` 옵션이 `issues`만 필터하고 `blocked_by_map`은 전체를 유지한다.
2. `app/views/detail-panel/index.test.js`
   - 선행 `blocks`·후행 `blocks`·기타 edge가 섞인 입력에서 칩이 `막는 → 막히는 → 나머지`
     순서와 modifier·말머리로 그려진다.
   - `✕`는 `--pred` 칩에만 있다.
   - `✕` 클릭이 confirm 뒤 `dep-remove`를 `{ a: current, b, view_id, root_dir }`로 보내고,
     confirm 거절 시 보내지 않는다.
   - 후보 클릭이 `dep-add`를 같은 payload 형태로 보내고 성공 시 `onDepChanged`를 부르며
     입력을 비운다.
   - transport가 `code: 'bd_readback_failed'` 오류를 던지면 `onDepChanged`를 정확히 한 번
     부르고 재전송하지 않으며, `bd_error`에는 부르지 않는다.
   - 후보 모델에 `root_dir`이 있는 선행 칩 클릭이 `onNavigate(id, root_dir)`를 부른다.
   - 검색이 후보를 좁히고 사이클 후보가 `disabled`로 그려진다.
   - `depCandidates()`가 `null`이면 `후보를 불러올 수 없음`을 그린다.
   - `getWorkspacePath()`가 비면 op를 보내지 않고 토스트를 낸다.
   - `dependents`가 없는 payload에서 기존 선행 칩 렌더가 그대로다.
3. `app/main.js` 채널 생명주기 (`app/main.test.js` 또는 기존 main 구독 테스트 파일)
   - Board·Worker 탭에서 `selected_id`가 설정되면 `subscribe-monitor-pipeline`이 나가고,
     상세를 닫으면(`selected_id` 해제, Monitor 탭 아님) `unsubscribe-monitor-pipeline`이
     나간다. Monitor 탭에서는 상세 개폐와 무관하게 유지된다.
   - `onNavigate(id, root_dir)`에서 `root_dir`이 현재 워크스페이스와 다르면
     `switchWorkspace`가 이동보다 먼저 불린다.
4. `app/views/monitor/index.test.js`
   - 후보 카드·대기 행에 `.mon-dep__btn`이 없다.
   - blocked 칩(`.worker-dep__open`) 클릭이 편집 패널 대신 이동(`gotoIssue`, 타 레포면
     `switchWorkspace` 선행)한다.
   - 반환 객체의 `recorrectSharedLane('dep-add', a, b)`가 같은 chain lane 멤버일 때
     `planLaneCorrection` 경로를 재실행한다.
   - 기존 `monitor 의존성 패널 (UI-j92s §6.1)` describe는 삭제한다.
5. `server/list-adapters.test.js` — `issue-detail`이 `show <id> --include-dependents --json`으로
   매핑된다.
6. `server/subscriptions.test.js` — 같은 `updated_at`에서 `dependents`/`dependencies`의
   id·type·status·title이 바뀌면 upsert가 발생하고, 두 필드가 없는 항목은 기존 비교 결과를
   유지한다.

Regression(기존 동작 보호): `worker/lanes.test.js`·`running-grid.test.js`의 blocked 칩
렌더, `worker/index.test.js`의 blocked 칩 열기(UI-u6zf §5), Monitor 드롭·연결 레인 op
순서 테스트(UI-2gi1 §6.5).

### 절차

Pre-Handoff Validation 전체(`npm run tsc` · `npx vitest run --reporter=dot` · `npm run
lint` · `npm run prettier:write` · `npm run build`, 번들·맵 포함). CDP 스크린샷으로 Board·
Worker·Monitor에서 각각 상세를 열어 `의존성` 절(세 종류 칩·추가 입력·후보 목록)과 Monitor
후보 카드·대기 행에 ⛓가 없음을 확인한다.

## 8. 수용 기준

- 세 탭 어디서 열어도 상세 `의존성` 절에서 막는 이슈를 추가·해제할 수 있고, Board·Worker는
  현재 레포 후보, Monitor는 가시 레포 전체 후보를 보인다. 상세가 열려 있는 동안 집계 채널이
  살아 있어 Board·Worker에서도 후보가 최신이다.
- 타 레포 선행 칩 클릭은 그 레포로 전환한 뒤 이동한다.
- 선행·후행·기타 edge가 한 절에서 말머리·색으로 구분되고, `✕`는 선행 `blocks`에만 있다.
- 후행 `blocks` 이슈가 칩으로 보이며 edge만 바뀌어도 열린 상세가 갱신된다.
- Monitor 카드·행에 ⛓ 버튼과 `mon-deppanel`이 없고, blocked 칩 클릭은 그 이슈로 이동한다.
- 같은 직렬 레인 멤버 사이에 상세에서 `dep-add`하면 §6 자동 교정이 재실행된다.
- Board·Worker 카드의 기존 blocked 칩 표시는 바뀌지 않는다.

## 9. 비범위

- 후행 방향 편집, 의존성 그래프 시각화, 후보 모집단 확장(서버 `bd list` 기반 후보),
  `blocks` 외 edge 종류의 추가·해제, Monitor 드롭·연결 레인 op 의미 변경.

## 구현 unit 후보

1. `server-dependents` — `server/list-adapters.js`, `server/subscriptions.js`
2. `detail-dep-editor` — `app/views/monitor/dep-candidates.js`, `app/views/detail-panel/index.js`,
   `app/styles/base.css`, `app/main.js`(주입·채널 생명주기·`onNavigate` root_dir)
3. `monitor-remove` — `app/views/monitor/index.js`, `app/views/worker/lanes.js`,
   `app/styles.css`, 스펙 정정 문단

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | blocks 대상 | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 관찰: 후보 모집단이 파이프라인 레인 이슈로 한정된다(route 미핀 Board 이슈는 후보에
  없음) — 사용자 결정 1에 따른 의도된 한계이며, 필요가 관측될 때 별도 제기한다.
