# 워크플로 메타데이터 편집 표면에서 폐기 키 제거 (UI-ouj0)

## 배경

워커 Phase ②에서 머지 축이 구조적으로 폐기되면서 `merge_policy`/`drift_policy`
bead 메타데이터 키는 더 이상 어떤 동작도 좌우하지 않는다. 모든 세션이 PR-stop이며
머지는 pr_wait 열의 사람 클릭이다.

계약 쪽 정합은 끝났다. dotfiles `docs/contracts/workflow.{md,yaml}`에서 두 키는
이미 부재하고(grep 0건), PR-stop 모드 무관 통일은 `workflow.md` v10에 반영되어
있다. 선행 bead `dotfiles-en3x`는 2026-07-28 close.

beads-ui는 이 계약의 **소비자**다(AGENTS.md). 계약에서 사라진 키를 편집하는
표면이 소비자에 남아 있으면 소비자가 계약보다 앞서간다. 그 마지막 잔여가
`server/ws/mutation-handlers.js`의 `WORKFLOW_META_ENUMS`다.

## 실측 잔여 표면 (2026-07-28)

UI-ouj0 원문이 기술한 3개 표면 중 실제로 남은 것은 ①뿐이다.

1. `server/ws/mutation-handlers.js:195-199` — `WORKFLOW_META_ENUMS`의
   `merge_policy`/`drift_policy` 항목 및 `:202-203` JSDoc. **잔여.**
2. 상세 패널 select 2종 — 커밋 411e224에서 이미 제거됨.
   `app/views/detail-panel/index.js:661-664`의 `WORKFLOW_META_OPTIONS`는
   `route`만 담고 있다. **처리 불요.**
3. `server/worker/queue-store.js`의 attempt 레코드 레거시 필드 — worker-phase2
   스펙 §2·§9(이력 불변, 신규 attempt에는 `null` 기록, shape 보존)로 처분이 이미
   결정되어 있다. **현행 유지.**

잔존 값 실측: 현재 워크스페이스 bead 10건 중 두 키를 메타데이터로 가진 건 0건.

## 변경

### ① 서버 — `server/ws/mutation-handlers.js`

`WORKFLOW_META_ENUMS`를 `{ route: ['spec_backed', 'full_plan'] }`로 축소한다.
enum 테이블 형태 자체는 유지한다 — beads-ui는 계약 소비자이므로 "계약이 정의한
편집 가능 enum 키 목록"이라는 구조가 역할에 맞고, 계약이 나중에 새 키를 정의하면
한 줄 추가로 복귀한다.

`handleUpdateWorkflowMeta` 본문은 무변화다. 검증이 테이블 조회 기반이라 폐기 키
요청은 기존 `unknown workflow-meta key: <key>` 경로로 자동 거부된다.

`:195-199` 주석과 `:202-203` JSDoc에서 두 키 이름을 지운다.

### ② 프로토콜 주석 — `app/protocol.js:48`

`// Workflow metadata enum edits (route / merge_policy / drift_policy)`를
`(route)`로 줄인다. `MessageType` 문자열 `update-workflow-meta`는 불변이다 —
WS 프로토콜 문자열을 바꾸면 서버/번들 동시 배포 전까지 구버전 탭의 요청이
unknown type으로 깨진다.

### ③ 테스트 — `server/ws/workflow-meta-mutation.test.js`

- `every workflow-meta key accepts its own enum` (72-91행): 루프가 두 폐기 키만
  돈다. `route`의 set 경로는 바로 위 테스트가 이미 덮으므로 이 테스트를
  **삭제**한다.
- `an empty value unsets the key (--unset-metadata)` (93-106행): `merge_policy`를
  `route`로 교체한다. unset 규약은 살아 있는 동작이다.
- `rejects a non-enum value and an unknown key without touching bd` (108-125행):
  `{ key: 'merge_policy', value: 'yolo' }` 케이스를
  `{ key: 'merge_policy', value: 'pr_stop' }`로 바꾼다. 한때 유효했던 값이 이제
  unknown key로 거부된다는 사실이 폐기의 회귀 증거가 된다.

## 비목표

- `server/worker/queue-store.js`의 attempt 레거시 필드 — 위 실측 ③, 현행 유지.
- 다른 워크스페이스 bead에 잔존할 수 있는 폐기 키 값의 UI 삭제 경로 — 상세 패널
  select는 411e224 이후 이미 없으므로 이 변경이 만드는 결손이 아니다. AGENTS.md의
  fail-quiet 원칙대로 표시를 생략하고, 정리가 필요하면 `bd` CLI 소관이다.
- `server/ws.worker-queue.test.js:447`, `server/worker/queue-store.test.js:361`의
  두 키 언급 — 둘 다 "폐기된 표면이 거부된다"는 회귀 테스트라 유효하다. 불변.
- 계약 자체의 변경 — dotfiles 소관이며 이미 완료되었다.

## 수용 기준

1. `WORKFLOW_META_ENUMS`에 `route`만 남는다.
2. `update-workflow-meta`로 `merge_policy`/`drift_policy`를 set 또는 unset하려는
   요청이 `bad_request`로 거부되고, 그것을 확인하는 회귀 테스트가 존재한다.
3. `route`의 set/unset 동작과 WS 메시지 타입 `update-workflow-meta`는 무변화다.
4. 두 폐기 키를 언급하는 주석이 편집 표면(`mutation-handlers.js`, `protocol.js`)에
   남지 않는다.
5. `npm run all` green.
6. `npm run build` green. 프론트 소스를 건드리지 않으므로 `app/main.bundle.js`는
   무변화가 기대되며, 변화가 있으면 원인을 확인한 뒤 커밋에 포함한다.
