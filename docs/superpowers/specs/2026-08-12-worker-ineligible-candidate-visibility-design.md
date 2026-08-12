# Worker 후보의 worker-ineligible 비활성 표시 설계

- Bead: `UI-8881`
- Route: `spec_backed`
- Workflow mode: `standard`
- 선행 계약: `docs/superpowers/specs/2026-08-10-worker-ineligible-runtime-enforcement-design.md`

## 문제

현재 Worker 탭은 Ready와 Blocked 이슈를 후보로 합치는 단계에서
`worker-ineligible` label이 있는 Bead를 완전히 제거한다. 서버는 해당 label을
queue placement, scheduler dispatch, manual resume의 실행 차단 경계로 올바르게
집행하지만, 사용자는 Worker 탭에서 왜 특정 Bead가 보이지 않는지 확인할 수 없다.
현재는 Board나 상세 화면으로 이동해야 label의 존재를 알 수 있다.

Worker 탭은 실행 가능한 항목만 보여주는 화면이 아니라 후보, 대기, 실행, PR 대기,
완료를 함께 관측하는 제어 화면이다. 따라서 실행할 수 없는 이유가 명시된 Bead도
후보 맥락 안에서 관측 가능해야 한다. 다만 표시가 실행 가능성으로 오해되지 않도록
drag와 queue placement affordance는 반드시 비활성이어야 한다.

## 목표

1. Ready 또는 Blocked 후보 feed에 포함된 `worker-ineligible` Bead를 Worker 후보
   레인에 표시한다.
2. 해당 카드는 기존 후보 필터와 정렬을 그대로 따른다.
3. 카드에 `⛔ worker-ineligible` chip과 중립 음영을 적용해 관측 전용 상태임을
   명확히 구분한다.
4. 카드 자체의 drag와 `[대기로 ↴]`를 비활성화한다.
5. 상세 열기와 ID 복사는 유지한다.
6. 기존 서버 admission, scheduler, resume의 fail-closed 집행을 변경하지 않는다.

## 비목표

- Monitor runnable 레인에 `worker-ineligible` 항목을 다시 노출하지 않는다.
- queue, running, PR 대기, 완료 레인의 상태 전이나 동작을 바꾸지 않는다.
- `worker-ineligible` label의 canonical 의미나 writer 규칙을 바꾸지 않는다.
- 별도 ineligible 레인, 그룹, filter, sort mode를 추가하지 않는다.
- Board 카드나 상세 화면의 label 표시를 변경하지 않는다.
- 서버 차단을 frontend 비활성 상태로 대체하지 않는다.

## 기존 계약과의 관계

`docs/superpowers/specs/2026-08-10-worker-ineligible-runtime-enforcement-design.md`는
Worker 후보에서 ineligible row를 완전히 제외하도록 정했다. 이번 설계는 그중
frontend 후보 projection과 UI 완료 조건만 대체한다.

다음 서버 경계는 그대로 유지한다.

- `server/worker/runnable-cache.js`의 Monitor runnable 제외
- `server/worker/admission.js`의 queue placement 거부
- `server/worker/scheduler.js`의 dispatch와 resume 재검사
- 기존 queue entry의 `⛔ worker_ineligible` admission reason 표시

따라서 frontend candidate feed가 stale이거나 직접 WebSocket 요청이 들어와도
실행 안전성은 서버의 fresh Bead snapshot 판정이 최종 권위를 가진다.

## Candidate projection

`app/views/worker/index.js`는 Ready와 Blocked 이슈를 합치는 단계에서 다음 항목만
제외한다.

- 이미 queue, PR 대기, 완료에 있는 Bead
- 중복 ID
- phase child

`worker-ineligible`은 이 제외 조건에서 제거한다. 각 candidate row를 만들 때 기존
`isWorkerIneligible(labels)` 공용 predicate로 상태를 계산하고
`worker_ineligible: boolean`을 row에 싣는다.

실행 가능성은 다음 조건의 conjunction이다.

```text
!worker_ineligible && !is_quick_fix && has_spec && !spec.conflict
```

이 값 하나가 `draggable`과 `[대기로 ↴]`의 enabled 상태를 함께 결정한다. label
문자열을 template이나 CSS에서 다시 판정하지 않는다.

`candidate_issues`에는 ineligible Bead도 남으므로 기존 `applyCandidateSort()`와
`applyCandidateFilter()`를 그대로 거친다. 사용자가 승인한 규칙은 다음과 같다.

- Blocked 후보는 기존 `show_blocked` toggle을 따른다.
- spec 있음/없음은 기존 spec filter를 따른다.
- `spec 우선`, `Board 순서`, `최신 생성순`은 ineligible 여부와 무관하게 적용한다.
- ineligible 카드 자체는 drag source가 아니지만, 다른 draggable 후보를 그 카드
  앞뒤로 옮겨 전체 Board 순서를 조정할 수 있다.

## 카드 표현

`app/views/worker/lanes.js`의 `MiniItem`과 `candidateCard()`가
`worker_ineligible`을 명시적으로 소비한다.

### A안: 중립 음영과 명시적 chip

사용자가 선택한 표현은 다음과 같다.

- 카드 root에 `worker-card--ineligible` modifier를 붙인다.
- 헤더의 ID 뒤, route chip 앞에 `⛔ worker-ineligible` chip을 표시한다.
- chip은 기존 warning 계열 token으로 border와 text를 그려 정상 대비를 유지한다.
- 카드 surface는 기존 `--text-dim`, `--bg-card`, `--border-chip`을 조합한 중립
  음영을 사용한다.
- 제목, stepper, route와 보조정보의 대비를 낮추되 카드 전체 opacity를 낮추지는
  않는다. 부모 opacity를 쓰면 이유 chip까지 흐려지기 때문이다.
- 새 raw color나 새 design token은 추가하지 않는다.

이 표현은 실패나 긴급 경고가 아니라 “관측 가능하지만 Worker에서 실행할 수 없는
항목”을 뜻한다. 따라서 danger 배경이나 강한 애니메이션을 사용하지 않는다.

### 상호작용

- grip을 렌더하지 않는다.
- root는 `draggable="false"`다.
- `[대기로 ↴]`는 disabled다.
- disabled button tooltip은
  `worker-ineligible label로 워커에서 실행할 수 없습니다`다.
- 카드 본문 클릭은 기존처럼 상세 overlay를 연다.
- ID 클릭은 기존처럼 ID를 복사하고 상세 열기로 전파하지 않는다.
- keyboard focus와 클릭 event routing은 기존 candidate card 규칙을 유지한다.

quick_fix, spec 없음, spec conflict와 `worker-ineligible`이 함께 존재할 수 있다.
이 경우 header의 ineligible chip은 항상 표시하고, footer reason은 기존 reason 조합을
그대로 보존한다. queue placement tooltip은 `worker-ineligible`을 우선해 가장 강한
실행 차단 이유를 설명한다.

## 오류와 호환성

- label container가 없거나 배열이 아니면 기존 `workerLabels()`가 빈 배열로
  정규화한다.
- non-string label entry는 기존 predicate가 무시한다.
- `workflow` enrichment가 없어도 raw labels만으로 ineligible 상태를 표시한다.
- CSS `color-mix()`는 이 화면이 이미 사용하는 기존 표현이므로 새 호환성 요구를
  만들지 않는다.
- 구버전 서버가 candidate feed를 보내도 browser projection만으로 표시할 수 있다.
- frontend 상태가 stale이어도 서버의 placement와 dispatch guard가 실행을 막는다.

## 변경 surface

### Frontend

- `app/views/worker/index.js`
  - candidate merge의 `worker-ineligible` 제외 제거
  - row에 `worker_ineligible` 상태 projection
  - drag/place eligibility에 상태 반영
- `app/views/worker/lanes.js`
  - `MiniItem.worker_ineligible` 계약 추가
  - 전용 modifier, chip, tooltip 렌더
- `app/styles.css`
  - 중립 음영과 chip의 Worker candidate 전용 스타일
- `app/views/worker/index.test.js`
  - candidate projection과 상호작용 회귀
- `app/views/worker/lanes.test.js`
  - card template의 class, chip, disabled tooltip 회귀
- generated `app/main.bundle.js`, `app/main.bundle.js.map`

### Server

변경 없음. 서버의 `worker_ineligible` 실행 차단은 이번 UI 변경의 안전 경계로
그대로 유지한다.

## Test scope

### RED-GREEN seam 1: candidate projection

1. Ready feed의 `worker-ineligible` + spec 보유 Bead가 후보 카드로 보인다.
2. row는 `worker_ineligible=true`, `draggable=false`다.
3. label이 없는 기존 spec 보유 후보는 계속 draggable이다.
4. malformed labels는 crash 없이 기존 eligible 판정을 유지한다.

### RED-GREEN seam 2: 카드 표현과 상호작용

1. ineligible card에 `worker-card--ineligible` modifier가 있다.
2. `⛔ worker-ineligible` chip이 표시된다.
3. grip이 없고 `[대기로 ↴]`가 disabled다.
4. disabled tooltip이 worker-ineligible 이유를 설명한다.
5. 카드 상세 열기와 ID 복사는 계속 동작한다.

### RED-GREEN seam 3: 필터와 정렬 회귀

1. ineligible Blocked 후보는 기존 default에서 숨고 `show_blocked`를 켜면 보인다.
2. spec filter는 ineligible 여부와 무관하게 같은 규칙을 적용한다.
3. 세 candidate sort mode는 ineligible row를 기존 비교 함수로 함께 정렬한다.
4. 다른 draggable 후보는 ineligible card 앞뒤를 drop target으로 사용할 수 있다.
5. ineligible card 자체에서 dragstart를 보내도 reorder나 place mutation이 나가지
   않는다.

## Verification

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
git diff --check
```

frontend source 변경 뒤 `app/main.bundle.js`와 `app/main.bundle.js.map`을 구현 diff에
포함한다.

## 배포와 runtime 검증

PR merge 뒤 merged `main` checkout에서 다음을 수행한다.

1. `npm run build` 결과가 generated bundle과 map에 반영됐는지 확인한다.
2. `docs/agents/repo-ops.toml`의 `[deploy]` 선언과 shared runtime 설정을 확인한다.
3. `bdui-shared restart`로 shared service를 재시작한다.
4. running process가 merged checkout을 가리키는지 확인한다.
5. listening port와 `/healthz` HTTP 응답을 확인한다.
6. 실제 `worker-ineligible` Bead가 Worker 후보에서 음영·chip·비활성 상태로
   보이며 queue placement가 불가능한지 확인한다.

## 완료 조건

1. `worker-ineligible` Ready/Blocked Bead가 기존 후보 필터와 정렬 안에서 보인다.
2. 카드가 중립 음영과 `⛔ worker-ineligible` chip으로 구분된다.
3. 카드 자체 drag와 `[대기로 ↴]`가 비활성이다.
4. 상세 열기와 ID 복사는 유지된다.
5. Monitor와 server execution guard 의미는 변하지 않는다.
6. focused tests, 전체 frontend/backend 검증, build가 통과한다.
7. merged shared service에서 process path, port, health, 실제 후보 카드 behavior가
   확인된다.
