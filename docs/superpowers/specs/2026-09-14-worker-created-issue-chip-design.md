---
scope:
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/worker/runner/session.js
  - server/worker/bd-metadata.js
  - server/worker/bd-metadata.test.js
  - server/worker/pr-actions.js
  - server/worker/pr-actions.test.js
  - server/worker/bench-runs.js
  - server/worker/bench-runs.test.js
  - server/ws/bench-handlers.js
  - server/ws/bench-handlers.test.js
  - server/workflow-enrich.js
  - server/workflow-enrich.test.js
  - server/list-adapters.js
  - server/list-adapters.test.js
  - app/views/worker/
  - app/views/monitor/
  - app/styles/
  - app/protocol.md
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md
---

# 워커 생성 이슈의 출처 기록과 공용 카드 칩

이슈: `UI-j10d` · 상태: 승인 전 설계 초안

조사 기준: 로컬 `58c99e458185cb19ad03543f11be78859b44b587`, 확인한 원격 base
`80493d3103209e7d574f1acf2e6e55802657d2cc`.
형제 정본 설계: dotfiles `dotfiles-5xd1`,
`docs/superpowers/specs/2026-09-14-generated-issue-handoff-origin-design.md`.

## 1. 사용자에게 보이는 결과

Worker가 새로 만든 이슈는 Worker·Monitor의 공용 카드 정보 줄에 `워커 생성` 칩과 생성 원본 이슈를 표시한다. 선행·후속 여부와 quick_fix·spec_backed·계획 자식 등 작업 경로를 가리지 않는다. 실행자를 수동으로 바꾸거나 작업을 완료해도 생성 출처는 남는다.

```text
카드 제목
…기존 의존성·안내 줄…
[저장소] [경로] [워커 생성] [↩ 생성 원본 Cortex-원본] [기존 실행 정보]
```

사람이 만든 이슈를 Worker가 실행하거나 기존 이슈를 재사용한 경우에는 칩을 새로 붙이지 않는다. 대화형 세션이 작은 수정을 만들어 자동으로 대기열에 등록해도 워커 생성은 아니다. 자동 등록 여부와 생성 주체를 혼동하지 않는 것이 목적이다.

## 2. 정본과 데이터

잘못된 생성 주체 표시를 막기 위해 실행 기록 추론 대신 생성 시점의 명시적 기록을 소비한다. 공유 metadata의 정의는 dotfiles가 소유한다. 이 저장소는 형제 설계 §4의 `metadata.worker_created_from`을 필요한 범위만 코드에 등록한다. 문자열 값은 최초 생성 원본의 native Bead ID이며 표시·추적 전용이다.

새 boolean, 생성 종류 enum, 별도 실행 ID, 영수증은 추가하지 않는다. 원본과 생성 사실을 필드 하나로 함께 보존한다. 부재·비정상 타입·빈 값·앞뒤 공백·제어 문자·자기 ID는 표시하지 않는다. 이 유효성 검사는 출처 조회에 성공했는지와 별개이므로 원본이 화면 데이터에 없어도 유효한 생성 사실은 남는다.

`discovered-from`의 `from_id`는 기존 관계 출처다. 새 필드로 이를 덮어쓰지 않는다. 생성 시점 원본과 이후에 추가된 관계를 별도로 보존한다. `created_by`, `exec_receipt`, `workflow_mode_source`, `carried_from`, `bench_run`만으로 워커 생성 여부를 추정하지 않는다. 과거 이슈를 일괄 수정하지 않는다.

## 3. 실제 생성 경로

| 작성자 | 최초 생성에서 쓸 원본 | 변경 지점 |
| --- | --- | --- |
| Worker가 실행한 세션의 선행·후속·계획 자식 생성 | 현재 Worker 작업의 `WORKFLOW_BEAD_ID` | dotfiles의 create recipe가 작성. 이 저장소는 실행 문맥 전달 보장 |
| Phase 이월 이슈 생성 | 이월되는 `child.id` | `pr-actions.js`의 `convertToCarryover`와 `createTopLevelIssue` 호출 |
| 벤치마크 복제 | 복제 원본의 `source.id` | `bench-runs.js`와 `bench-handlers.js`의 최초 create 인자 |

Worker는 모든 실제 실행 세션에 현재 `BDUI_ATTEMPT_ID`를 전달한다. 지금은 사용량 기록 또는 모니터 경로가 있을 때만 이 값이 전달되므로, 두 경로가 없어도 ID와 기존 WORKFLOW locator 쌍을 전달하도록 조정한다. 기록 디렉터리의 조건부 전달은 유지한다. 이 값들은 실행 문맥과 원본 확인에만 쓰며 승인·검토 권한을 만들지 않는다.

생성 출처는 최초 `bd create --metadata`에 함께 넣고 생성 결과를 다시 읽는다. 공용 create 함수가 호출자를 추측해 모든 이슈에 붙이는 방식은 사용하지 않는다. 실제 Worker 생성 작성자가 값의 소유자다.

carryover는 기존 `(parent_id, child.id, plan_task_anchor)` 재사용 판정을 유지한다. 최초 생성 인자에는 출처를 추가하되, 재사용 뒤 공통 metadata 갱신에는 출처를 넣지 않는다. 과거에 생성한 이월 이슈의 필드가 없다고 재시도 시 보충하거나 새 이슈를 만들지 않는다.

벤치마크는 기존 복제 identity metadata와 생성 출처를 최초 create에 함께 전달하도록 어댑터 인자를 확장한다. 뒤따르는 라벨·배치 작업이 실패해도 생성 사실이 먼저 저장되어야 한다. 원본 metadata를 통째로 복제하지 않고 기존 허용 목록으로 구성하며 생성 원본 값은 직접 복제한 이슈의 ID다. 이미 만든 복제를 재시도로 회수할 때도 출처를 덮어쓰지 않는다.

## 4. 공용 데이터 전달과 표시

서버의 workflow enrichment에서 유효한 생성 출처를 정규화하고 기존 목록·워크스페이스 overlay를 통해 공용 `buildLanes` 입력으로 전달한다. 후보뿐 아니라 대기·실행·PR 대기·완료 데이터에서도 같은 필드를 사용할 수 있어야 한다. 실행 시도 객체에 생성 사실을 새로 저장하거나 마지막 실행 결과에서 재구성하지 않는다.

원본의 저장소 해석은 기존 비동기 준비 데이터와 워크스페이스 관계 조회 경로를 사용한다. 카드 렌더나 동기 목록 변환에서 `bd` subprocess를 새로 실행하지 않는다. 원본 ID가 다른 저장소에 속하면 확인된 저장소로 전환한 뒤 기존 상세 화면을 연다. 소유 저장소를 확인할 수 없으면 원본 ID를 비활성 텍스트로 표시하고 “원본 저장소를 확인할 수 없음”을 설명한다. 현재 저장소의 동명 ID로 잘못 이동하지 않는다.

`candidateCard`, `miniRow`, `runningTile`은 같은 생성 출처 표시 함수를 사용한다. Worker와 Monitor의 탭별 복제 구현을 만들지 않는다. 기존 `openBlocker`·`openRow`가 따르는 저장소 전환 후 이슈 열기 순서를 새 원본 링크에도 적용한다.

### 카드 문법 정정안

기존 카드 문법의 §5.1 공유 슬롯 표와 칩 문법의 출처 칩 절에 이 설계의 정정 링크를 추가한다. 위치는 다음처럼 정한다.

| 요소 | 위치·의미·조작 |
| --- | --- |
| `워커 생성` | 슬롯 5, 경로 칩 다음의 출처 그룹. 클릭 동작 없는 사실 표시. 툴팁은 생성 원본 ID를 설명 |
| `↩ 생성 원본 <ID>` | 바로 다음. 확인된 원본 상세를 열며 실행·배치 설정을 바꾸지 않음 |
| 기존 `↩ from <ID>` | 기존 관계 표시 유지. 생성 원본과 같은 ID면 원본 링크 하나로 중복 제거. 다르면 이름을 구분하여 함께 표시 |
| 완료 행 | 워커 생성과 생성 원본 그룹을 계속 표시. 나머지 완료 행의 기존 표시 규칙은 유지 |

새 그룹은 기존 저장소·레인·경로·출처·실행 순서에서 출처 자리에 들어간다. 제목·진행·의존성 줄이나 조작 버튼을 이동하지 않는다. 단순 텍스트·기존 칩 스타일을 사용하며 색상만으로 뜻을 전달하지 않는다. 없는 재료를 위한 빈 줄이나 빈 칩을 그리지 않는다.

ADR 0037의 “출처 칩은 되살리지 않는다” 조항은 이번 요청과 충돌하므로 후속 ADR로 대체한다. 완료 행의 마지막 구현 실행 사실과 기존 줄 수는 유지하고, 워커 생성 원본만 다음 문구로 예외를 둔다. 기존 ADR 파일을 이번 초안 작성에서 직접 고치지는 않는다.

```diff
- 출처 칩(`← from`)은 되살리지 않는다.
+ 완료 행은 유효한 worker_created_from이 있을 때 워커 생성과 생성 원본 칩을 기존 슬롯 5에 표시한다. 일반 discovered-from 관계만 있는 완료 이슈의 출처 칩은 계속 생략한다. route와 마지막 구현 attempt의 실행 사실을 읽는 기존 규칙 및 줄 수는 유지한다.
```

결정: 이번 표시는 Worker·Monitor의 공용 카드에 적용한다 — Board의 별도 카드 구성과 상세 화면의 새 설정 항목은 이 요구에 필요하지 않다. 원본 이동은 기존 상세 화면을 사용한다.

## 5. 자동 인계와의 접점

분리 quick_fix를 검토하고 대기열에 올리는 순서는 dotfiles 형제가 소유한다. beads-ui는 기존 GET과 `queue/place` API, revision 충돌 처리, 실제 위치를 읽을 수 있는 snapshot을 제공한다. open 이슈를 전부 검색해 자동 등록하는 기능을 만들지 않는다.

배치가 즉시 실행으로 이어지면 세션은 snapshot의 활성 실행을 인계 증거로 읽는다. 자동 진행 꺼짐·공급자 보류·선행 대기일 때는 등록과 시작을 구분한다. 기존 생성 출처 필드는 이 판단에 사용하지 않는다.

결정: 대기열 자동 진행·입장 판정·선행 차단·연결 레인 정책은 바꾸지 않는다 — 출처 표시에 실행 권한을 부여하지 않고 이미 있는 배치 기능을 재사용한다.

## 6. Test scope와 수용 기준

- 생성: 두 기록 디렉터리가 모두 없을 때도 Worker 실행 ID·원본 locator가 전달된다. carryover와 벤치마크의 최초 create에 원본이 포함되고, 이후 실패에도 그 값이 보존된다.
- 재사용: 기존 사람 생성·과거 carryover·이미 생성한 복제를 회수해도 출처를 새로 붙이거나 덮어쓰지 않는다. 벤치마크가 원본의 원본을 잘못 복사하지 않는다.
- 서버 전달: 유효·부재·잘못된 타입·빈 값·자기 ID를 구분한다. 다른 저장소의 유효한 원본을 현재 저장소 ID로 해석하지 않는다. 후보와 비후보 overlay가 같은 값을 유지한다.
- 렌더: 공용 카드의 후보·대기·실행·PR 대기·완료에서 슬롯 5 위치와 표시를 확인한다. 사람 생성 이슈의 워커 실행은 미표시, 수동 실행으로 전환한 워커 생성 이슈는 계속 표시한다. 같은 원본 링크의 중복 제거와 서로 다른 관계의 구분도 확인한다.
- 조작: 칩 자체는 조작하지 않고 원본 링크만 상세를 연다. 다른 저장소 전환 후 열기, 원본 저장소 미확인 시 비활성 표시, 버튼 클릭이 카드의 실행 조작으로 전파되지 않음을 확인한다.
- 인계 호환: 기존 `queue-place` 테스트의 정상 배치·중복 거부 또는 기존 등록 관측·revision 충돌·즉시 tick 경계를 활용하여 생성 출처가 입장과 자동 진행 설정을 바꾸지 않음을 확인한다. 변경 없는 스케줄러 영역을 새로 구현하지 않는다.

주 검증 표면은 `scheduler.test.js`, `pr-actions.test.js`, `bd-metadata.test.js`, `bench-runs.test.js`, `bench-handlers.test.js`, workflow enrichment와 list adapter 테스트, 공용 lane model·workspace adapter·카드·탭 이벤트 테스트다. 정본 metadata 정의와 소비자 subset의 일치도 확인한다.

구현 워크트리에서 Node engine과 의존성을 확인한 뒤 `npm run tsc`, `npm run lint`, 변경 파일 prettier, 전체 `npx vitest run --reporter=dot`를 실행한다. Worker와 Monitor의 후보·실행·완료 카드를 실제 브라우저에서 확인하고, 다른 저장소 원본 이동은 전환된 저장소와 열린 이슈가 모두 맞는지 본다. 공유 배포 이후 프로세스 경로·포트·HTTP 응답은 기존 repo-ops 계약으로 검증한다.

이 문서는 별도 RED-GREEN 위임 단계를 지정하지 않는다. 하나의 저장소 구현 단위에서 작성자부터 표시까지 함께 검증한다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 저장소 경계: 공유 계약과 세션 작성 절차의 정본 | 없음 | dotfiles-5xd1 |
| 형제 | beads-ui | awaited_by_consumer | 저장소 경계: 정본 계약을 소비하는 Worker 작성자와 UI | dotfiles-5xd1 | UI-j10d |

두 설계는 함께 작성·게시한 뒤 검토한다. UI 구현 전에는 선행 계약이 완료되고 작성자·소비자 정의가 일치하는지 확인한다. 실행 결과에 따라 UI 설계를 뒤늦게 시작해야 하는 관계는 아니다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — workflow metadata는 dotfiles 정본의 필요한 subset만 코드에서 소비하고 부재 시 표시를 생략한다.
- 전제: ADR 0014 — 하나의 buildLanes와 공용 렌더러를 사용하고 새 칩의 자리를 공유 슬롯 표에 먼저 지정한다.
- 전제: ADR 0037 — 완료 행의 슬롯 5, 마지막 구현 attempt의 실행 사실, 줄 수 유지 조항을 따른다. 출처 칩 금지 조항만 아래 후속 결정으로 대체한다.
- 전제: ADR 0043 — 후보·목록 투영은 기존 비동기 준비 데이터만 읽고 동기 subprocess를 추가하지 않는다.
- 생성 출처의 불변성은 dotfiles 형제 ADR 후보가 소유하며 여기서는 그 소비와 작성자를 맞춘다. 별도 의미를 정의하지 않음 → ADR 아님
- 완료 행의 실행 사실을 유지하며 명시적 워커 생성 출처를 슬롯 5에 함께 표시한다. 되돌리기 어려움: 공용 완료 데이터 전달·두 탭 렌더·슬롯 문법과 사용자가 읽는 출처를 함께 되돌려야 함. 놀라움: 기존 결정은 출처 칩을 명시적으로 금지함. 대안 비용: 생성 사실을 이력에서 찾게 하거나 완료 행의 가로 공간을 쓰는 선택이며 기존 줄을 사용하여 비용을 제한함. `summary`: "완료 행은 마지막 구현 실행 사실과 명시적 워커 생성 출처를 슬롯 5에 함께 표시한다" → ADR, supersede 0037
