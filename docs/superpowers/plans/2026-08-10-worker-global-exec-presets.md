# UI-metq — 워커 공용 실행 프리셋 구현 계획

## Context

- 승인된 설계 `docs/superpowers/specs/2026-08-10-worker-global-exec-presets-design.md`와 Bead `UI-metq`를 기준으로 구현한다.
- 프리셋은 `$XDG_STATE_HOME/bdui/exec-presets.json`에 서버 전역으로 저장하며, workspace `exec_defaults`와 `workflow_mode`는 변경하지 않는다.
- 프리셋은 이름과 기존 실행 키 10개의 부분 설정을 가진다. 빠진 키는 `(기본)`이며, 이슈 적용 시 해당 metadata를 unset한다.
- 적용은 값 복사다. 프리셋 수정·삭제가 이미 적용된 이슈에 전파되지 않으며 새 Bead metadata도 추가하지 않는다.
- 생성 순서를 목록 순서로 유지하고 수정 시 위치와 UUID를 보존한다. 초기 프리셋, 복제, 정렬, import/export는 추가하지 않는다.
- 각 Phase를 `UI-metq`의 child Bead 하나와 1:1로 연결한다.

공개 데이터와 WebSocket 계약:

```js
ExecPreset = {
  id: string,
  name: string,
  settings: Partial<Record<ExecSettingKey, string>>
}

ExecPresetState = {
  revision: number,
  presets: ExecPreset[]
}
```

- `subscribe-exec-presets`, `unsubscribe-exec-presets`, `exec-presets-snapshot`
- `exec-preset-create`, `exec-preset-update`, `exec-preset-delete`
- `apply-exec-preset { id, preset_id, expected_revision }`
- CRUD 결과는 `{ applied, conflict, revision, presets }`를 반환한다.
- apply 성공은 `{ applied: true, conflict: false, revision, issue }`, stale revision은 `{ applied: false, conflict: true, revision, presets }`를 반환한다.

## Phase 1: 서버 전역 프리셋 상태와 동기화 채널

1. `server/worker/state-paths.js`에 전역 파일 경로를 추가하고 `server/exec-preset-store.js`를 구현한다.
   - `crypto.randomUUID()`, `trim().toLowerCase()` 이름 중복 판정, integer revision CAS를 사용한다.
   - 알 수 없는 키와 비문자열은 load normalization에서 제거하되, 현재 catalog에 없는 문자열 값은 보존한다.
   - mutation은 clone → 검증 → revision 증가 → temp write/rename → cache commit 순서를 지킨다. 저장 실패 시 cache와 revision을 유지한다.
   - 파일 부재·해석 불가 시 빈 `{ revision: 0, presets: [] }`로 시작하고 자동 seed나 migration은 수행하지 않는다.
2. 전용 WebSocket handler를 추가한다.
   - Monitor와 같은 workspace 비종속 subscriber `Set`을 사용하고, subscribe ack 뒤 전체 snapshot을 보낸다.
   - 동일 `(socket, client_id)` 재구독은 중복되지 않으며 unsubscribe와 socket close에서 제거한다.
   - CRUD 성공만 모든 구독자에게 fanout하고 conflict는 요청자에게 authoritative snapshot만 반환한다.
   - update는 name과 settings 전체 교체이며, 비호환 값을 그대로 둔 저장은 거부한다. delete는 cascade 없이 해당 UUID만 제거한다.
3. `app/protocol.js`와 `app/main.js`에 client store와 app-wide subscription을 연결한다.
   - preset store는 최초 snapshot 전 `null`, 이후 total-state last-snapshot-wins로 동작한다.
   - tab/workspace 전환에서는 구독과 cache를 유지하고, reconnect에서는 stale unsubscribe guard를 버린 뒤 한 번만 재구독한다.
   - cached revision은 CAS에 사용하며 서버 응답과 push 모두 store에 반영한다.

검증: store CRUD·정규화·재시작·원자 저장·실패 불변성 테스트, WebSocket subscribe/CRUD/conflict/fanout/unsubscribe/close 테스트, client reconnect·중복 구독·workspace 전환 테스트를 RED부터 작성하고 통과시킨다.

## Phase 2: 이슈 실행 설정 10개 원자 적용

1. 서버의 canonical 실행 키 10개를 고정 순서로 재사용할 수 있게 노출하고 apply argv builder를 추가한다.
   - preset에 값이 있으면 `--set-metadata key=value`, 없으면 `--unset-metadata key`를 추가한다.
   - 하나의 `bd update <id>`에 10개 키의 repeated flag를 모두 넣으며 `workflow_mode`는 포함하지 않는다.
2. `apply-exec-preset` handler를 구현한다.
   - 이슈 ID, preset ID, non-negative integer revision을 먼저 검증한다.
   - 현재 store revision과 preset 존재 여부를 확인하고, 모든 저장값을 현재 `execSettingEnums()`로 다시 검증한 뒤에만 `bd`를 호출한다.
   - update 성공 후 `bd show <id> --json`을 단일 issue object로 정규화하여 반환하고 mutation refresh를 정확히 한 번 요청한다.
   - stale revision은 `bd` 없이 authoritative preset snapshot을 반환하며, 삭제·비호환 preset도 `bd` 호출 전에 거부한다.
3. 부분 성공 오류를 구분한다.
   - update 실패는 `bd_update_failed`로 응답하고 성공 상태를 표시하지 않는다.
   - update 후 readback 실패는 `bd_readback_failed`로 응답하고 issue refresh를 요청한다. 클라이언트에는 “설정은 전송됐지만 적용 여부 확인 필요”를 표시하며 임의 rollback은 하지 않는다.
   - 적용은 preset revision을 변경하거나 fanout을 발생시키지 않는다.

검증: 전부 set, 전부 unset, 혼합 preset, 정확한 10개 키와 단일 command, stale/missing/incompatible 검증 시 `bd` 미호출, readback 정상화, refresh 1회, update/readback 실패를 각각 독립 테스트한다.

## Phase 3: 프리셋 관리·상세 적용 UI와 용어 개선

1. 공용 실행 행 presentation을 확장한다.
   - raw key 대신 한국어 의미를 주 제목으로, code key를 보조 표기로 표시한다.
   - 순서는 워커 → 스펙 리뷰 → 계획 리뷰 → 구현 리뷰 → 구현으로 통일한다.
   - `impl_model` 기본 라벨을 “작업 성격에 따라 구현 모델 자동 선택”, `impl_effort`를 “선택된 구현 에이전트의 reasoning effort 사용”으로 교체하고 하위 에이전트 선택 기준 도움말을 렌더한다.
   - 기존 catalog grouping, effort narrowing, self/skip effort disable, stale value `(비호환)` 표현은 세 UI 표면에서 같은 helper를 사용한다.
2. 기존 전역 실행 설정 dialog를 세 영역으로 재구성한다.
   - 상단에 공용 preset 목록과 body 내부 create/edit panel을 추가하고, 아래에 현재 workspace 기본값과 기존 검증·배포/시스템 프롬프트를 유지한다.
   - 새 preset은 빈 이름과 10개 `(기본)`으로 시작한다. 목록은 이름, `n/10 지정` 수, 다섯 model/reviewer 선택 요약을 표시하며 모두 기본이면 “모든 항목 기본값”으로 표시한다.
   - conflict에서는 최신 snapshot을 채택하되 draft를 유지하고 자동 재시도하지 않는다. 대상이 삭제된 경우 draft를 “새 프리셋으로 저장”할 수 있게 한다.
   - 삭제 confirm에 “이미 적용된 이슈는 변경되지 않습니다”를 포함한다.
   - Worker와 Monitor가 동일 preset store를 사용한다. Monitor control state에는 기존 runtime catalog decoration을 전달해 빈 workspace에서도 editor option을 구성한다.
3. 상세 패널에 preset selector와 전체 적용 동작을 추가한다.
   - 선택 없음·비호환·snapshot 로딩 중에는 적용 버튼을 비활성화한다.
   - 성공 시 응답의 issue readback을 반영하고 실행 키 10개의 optimistic local override만 제거한 뒤 성공 toast를 표시한다. `workflow_mode` local 상태는 건드리지 않는다.
   - conflict에서는 최신 preset 목록을 반영하고 사용자가 다시 적용하도록 안내한다.
   - preset이 없으면 안내와 “전역 실행 설정 열기” 동작을 표시한다. 이 동작은 detail을 닫고 Worker로 이동한 뒤 Worker view가 소유한 기존 dialog를 연다. 중첩 dialog는 만들지 않는다.
   - detail이 열린 동안에는 현재 workspace worker queue channel을 유지해 `exec_defaults`와 `runner_catalog`를 제공하고, Worker가 아니면서 detail도 닫히면 기존처럼 해제한다.
   - 기존 개별 select의 즉시 저장 동작은 그대로 유지한다.
4. 신규 상태·오류·반응형 layout style을 추가하고 frontend bundle과 source map을 다시 생성한다.

검증: dialog CRUD/delete confirm/conflict draft/비호환 상태, Worker·Monitor 공유 목록, 상세 selector payload/readback/빈 목록 action/개별 편집 회귀, detail queue subscription lifecycle, 한국어 라벨과 도움말을 테스트하고 bundle을 재생성한다.

## Test scope

| Phase | RED → GREEN seam | 관찰 가능한 동작 |
| --- | --- | --- |
| Phase 1 | 전역 preset store | CRUD, load normalization, restart 복구, CAS conflict, 원자 저장, 저장 실패 시 cache/revision 불변 |
| Phase 1 | 전역 WebSocket protocol과 client subscription | subscribe ack/snapshot, CRUD fanout, conflict snapshot, unsubscribe/close, reconnect 1회 구독, tab/workspace 전환 cache 유지 |
| Phase 2 | 원자 preset apply | 10개 key의 단일 `bd update`, set/unset 조합, stale/missing/incompatible 사전 차단, readback 정상화, refresh 1회, update/readback 오류 구분 |
| Phase 3 | 전역 preset dialog | create/update/delete, conflict draft 보존, 삭제된 draft의 신규 저장, 비호환 표시, Worker·Monitor 공유 상태 |
| Phase 3 | detail preset panel | selector payload, 성공 readback 반영, optimistic override 제거, 빈 목록 action, queue subscription lifecycle, 기존 개별 편집 회귀 |
| Phase 3 | 실행 설정 용어 표면 | 세 UI 표면의 동일 grouping/narrowing/disable/비호환 규칙과 한국어 라벨·도움말 |

통합 검증은 cross-workspace 생성·표시, 서버 재시작 복구, 두 클라이언트 동시 편집, preset 삭제 후 기존 issue metadata 불변, `(기본)`의 metadata 제거를 포함한다.

RED→GREEN에서 제외하는 작업은 생성된 `app/main.bundle.js`·`app/main.bundle.js.map`, 순수 CSS 반응형 조정, formatter가 만든 기계적 변화다. 이들은 승인된 seam 테스트가 통과한 뒤 build·회귀 검증으로 확인한다.

회귀 검증은 `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build` 순서로 실행한다. 마지막에 `git status`, 전체 `git diff`, `git diff --check`, 생성된 `app/main.bundle.js`와 `app/main.bundle.js.map` 포함 여부를 확인한다.
