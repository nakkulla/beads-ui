---
scope:
  - server/routes/worker-queue.js
  - server/routes/worker-queue.test.js
  - server/worker/queue-place.js
  - server/worker/queue-place.test.js
  - server/ws/worker-handlers.js
  - server/app.js
---

# 스펙 후 구현 진입 질문의 'Worker 레인에 배치' 선택지와 세션용 큐 배치 진입점 (UI-1gpj)

- 작성일: 2026-08-29
- Bead: `UI-1gpj`
- route: `spec_backed`
- 관련: `docs/superpowers/specs/2026-08-13-worker-lane-scheduling-design.md`
  (UI-04vo, 직렬 레인 의미), `docs/superpowers/specs/2026-08-20-candidate-place-lane-choice-design.md`
  (UI-16b8, `[대기로 ↴]`의 "적재 의미 = 말미"), ADR 0009(병렬성 분석 제거),
  ADR 0013(세션 기본값 SoT는 dotfiles kv)

## 1. 문제와 관측

스펙 리뷰 게이트가 닫힌 뒤 세션은 사용자에게 구현 진입(`impl_entry`) 승인을
직접 묻는다(dotfiles `docs/contracts/workflow-contract.md` "user approval turn").
지금 답은 둘뿐이다 — 지금 구현(`impl_entry`+`in_progress`) 또는 보류(아무것도
쓰지 않고 `open`). 사용자는 세 번째 답, "Worker의 적당한 레인에 알맞은 자리로
배치"를 원한다.

관측된 제약:

- 레인 배치는 브라우저 WS 전용이다. `worker-queue-place`
  (`server/ws/worker-handlers.js` `handleWorkerQueuePlace`)와
  `worker-queue-reorder`만 `queue.json`을 바꾸고, HTTP 라우트도 `bdui`
  서브커맨드도 없다. `bd update --set-metadata`는 admission 자격만 바꾸고 자리는
  정하지 못한다.
- 직렬 레인 `s1`..`s5`는 워크스페이스(=레포 하나)마다 `serial_lane_count`개
  (기본 2, 1~5)의 고정 슬롯이고, 의미는 "레인 안에서는 앞 항목이 머지·정리 완료
  또는 폐기될 때까지 다음이 기다리는 배타 체인"이다(UI-04vo). 병렬 `queue`는
  `slots` 한도 안에서 동시에 돈다. 따라서 "적당한 레인"은 레포가 아니라 **이
  Bead를 남과 직렬로 묶을 근거**로 정한다.
- 그 근거는 `blocks` 엣지만이 아니다. 같은 파일·모듈을 건드리는 이슈끼리는
  어느 쪽을 먼저 하는 게 나은지가 있고, 이는 기계 규칙이 아니라 판단이다.
  beads-ui는 ADR 0009로 "겹치는 이슈를 분석해 직렬 순서를 제안"하는 기능을
  제거했으므로 그 판단을 서버에 다시 넣지 않는다.
- 어떤 스킬도 beads-ui를 HTTP로 부른 전례가 없다. 세션이 서버 주소를 아는
  경로부터 정해야 한다.

## 2. 사용자 확정 결정

1. **세션이 판단하고 서버는 실행만 한다.** 겹침·선후 판단은 스펙을 방금 쓴
   세션이 하며, 서버는 대기열 읽기와 기존 `place` 실행만 HTTP로 노출한다.
2. **진입점은 HTTP 둘**: `GET /api/worker/queue`, `POST /api/worker/queue/place`.
3. **서버 주소는 dotfiles kv `workflow_session_defaults.bdui_url`** 로 안다.
   키 부재·서버 무응답이면 선택지를 보이지 않는다(fail-quiet).

## 3. 서버 — HTTP 진입점

### 3.1 `GET /api/worker/queue?root_dir=<abs>`

응답(200):

```json
{
  "ok": true,
  "revision": 41,
  "serial_lane_count": 2,
  "lanes": [
    { "id": "parallel", "entries": [{ "bead_id": "UI-aaaa", "added_at": 0 }] },
    { "id": "s1", "entries": [] },
    { "id": "s2", "entries": [{ "bead_id": "UI-bbbb", "added_at": 0 }] }
  ],
  "running": ["UI-cccc"],
  "pr_wait": ["UI-dddd"]
}
```

- `queueStore().snapshot(key)`를 그대로 투영한다. `lanes`는 `parallel` 뒤에
  `serial_lanes`를 앞에서 `serial_lane_count`개까지만 싣는다(UI-16b8 §4와 같은
  절단). `entries`는 대기 entries만이다.
- `running`·`pr_wait`는 bead_id 목록이다. 레인이 비어 있어도 앞 항목이 아직 안
  끝났음을 세션이 알기 위한 것이며, 새 필드를 만들지 않고 스냅샷의 기존 필드에서
  id만 뽑는다.
- `root_dir` 검증은 `server/ws/workspace-target.js`의 `targetWorkspaceOf`와
  같은 규칙이다: 절대경로이고 `getAvailableWorkspaces()` allow-list에 있어야
  한다. HTTP에는 연결 워크스페이스가 없으므로 `root_dir`은 **필수**이고, 부재·
  상대경로·미등록은 400 `{ ok:false, error:'bad_request' }`.
- `Cache-Control: no-store`.

### 3.2 `POST /api/worker/queue/place`

요청 body `{ root_dir, bead_id, lane?, index?, expected_revision }`.

- `lane`은 `'parallel'|'s1'..'s5'`, 생략은 병렬. `index` 생략은 그 레인 말미
  (UI-16b8 "적재 의미 = 말미"). `expected_revision`은 **필수** 정수 — 세션이
  GET에서 본 대기열을 근거로 자리를 정했으므로 그 사이 바뀌었으면 판단을 다시
  해야 한다. 부재는 400.
- 응답은 모두 200이고 결과는 body로 구분한다(WS와 같이 거부도 정상 응답):
  - 성공 `{ ok:true, applied:true, lane, index, revision }` — `lane`·`index`는
    `orderLaneByBlocks` 보정 뒤 **실제로 놓인** 자리다.
  - admission 거부 `{ ok:true, applied:false, conflict:false, admission_reason }`
    — WS와 똑같이 `recordAdmission`으로 거부를 남긴다.
  - CAS 충돌 `{ ok:true, applied:false, conflict:true, revision }`.
  - `place`가 false를 돌려준 경우(알 수 없는 레인·설정 밖 직렬 슬롯·discard
    진행 중) `{ ok:true, applied:false, conflict:false, reason:'rejected' }`.
- 검증 실패(`bead_id` 아님, `root_dir` 불량, `lane` 형식 불량)는 400.

### 3.3 WS 핸들러와 로직 공유

`handleWorkerQueuePlace`의 본문 — admission 검사 → 거부 시 `recordAdmission`
→ `place(…)` → 성공 시 stale 여부에 따른 `recordAdmission`/`clearAdmission` →
`tickWorkerQueue` kick — 을 `server/worker/queue-place.js`의

```js
placeBeadInQueue(workspace_key, { bead_id, lane, index, expected_revision })
  // → { applied, conflict, admission_reason?, reason?, lane?, index?, queue }
```

한 함수로 뽑는다. WS 핸들러는 이 함수를 부르고 envelope 응답·`fanout`만 남긴다.
HTTP 라우트도 같은 함수를 부른다. 서버에 새 판단 로직은 없다(ADR 0009 유지).
`laneBlocksEdges` 호출도 함수 안으로 들어간다.

### 3.4 파일과 등록

- `server/routes/worker-queue.js`: `workerQueueGetHandler`,
  `workerQueuePlaceHandler`. `server/app.js`에 `app.get`/`app.post` 두 줄.
- `server/worker/queue-place.js`: 추출 함수. 테스트는 `queue-place.test.js`.
- 기존 라우트 테스트 패턴(`server/routes/doc.test.js` 등의 요청/응답 목)을
  따른다.

## 4. 세션 — workflow 스킬 선택지 (dotfiles unit)

### 4.1 선택지 표시 조건

`spec_review` 영수증 readback 뒤 구현 진입 질문을 만들 때:

1. `bd kv get workflow_session_defaults --json`에서 `bdui_url`을 읽는다. 부재·
   비문자열이면 skip(기존 두 선택지만).
2. `GET <bdui_url>/api/worker/queue?root_dir=<repo 절대경로>`가 200이면
   `Worker 레인에 배치` 선택지를 보인다. 그 외(연결 실패·404·400)는 skip.

사용자에게 없는 기능을 보이지 않는 것이 목적이다. 사전 확인의 스냅샷은 §4.3의
1단계에 그대로 쓴다.

### 4.2 세 답의 쓰기

| 답 | 쓰는 것 |
| --- | --- |
| 지금 구현 | 기존 그대로: `impl_entry=user@<spec-sha>` + `in_progress` + `session_ref` |
| 보류 | 기존 그대로: 없음 |
| Worker 레인에 배치 | `impl_entry` 없음, 상태 `open` 유지, §4.3 수행, 성공 시 notes 한 줄 |

배치는 자격을 만들지 않는다. 자격 판정(`checkWorkerQueueAdmission`)과 dispatch는
그대로 Worker 소유다.

### 4.3 배치 절차

1. **재료 수집.** GET 스냅샷의 대기·`running`·`pr_wait` bead 각각에
   `bd show --json`으로 `spec_id`·`priority`·`blocks` 의존을 읽고, `spec_id`가
   가리키는 스펙 파일의 front-matter `scope:` 접두사를 모은다. `scope:`가 없는
   bead는 "겹침 판정 불가"로 두고 (b)에서 제외한다.
2. **판정.** 이 Bead와 각 상대 사이에
   - (a) `blocks` 엣지(어느 방향이든),
   - (b) `scope:` 접두사 겹침(한쪽이 다른 쪽의 접두사이거나 같음),
   - (c) 겹칠 때 선후: 상대가 이 Bead의 전제를 바꾸면 **뒤**, 이 Bead가 상대의
     전제를 바꾸면 **앞**, 판단 못 하면 **뒤**.
   (a)·(b) 어느 것도 없으면 `parallel` 말미다.
3. **자리 결정.** 겹치는 상대가 직렬 레인에 있으면 그 레인에서 (c)에 따른
   앞/뒤 `index`를 명시한다. 상대가 `running`/`pr_wait`이면 그 상대가 원래
   있던 직렬 레인(`serial_lane_id`)의 말미이고, `serial_lane_id`가 없으면(병렬
   출신) 아래 "병렬 대기" 규칙과 같다.
   상대가 **병렬 대기**에 있으면 둘을 직렬로 묶어야 하지만 **남의 배치를
   세션이 옮기지 않는다** — 이 Bead만 비어 있는 직렬 레인 말미에 두고, 빈
   직렬 레인이 없으면 병렬 말미에 두며, 두 경우 모두 보고서에
   `- 관찰: <상대 ID>와 겹침 — 상대가 병렬 대기 중이라 직렬로 묶지 못함` 줄을
   남긴다. 겹치는 상대가 여러 직렬 레인에 흩어져 있으면 (a)가 있는 레인,
   없으면 겹치는 접두사가 가장 긴 레인을 고른다.
4. **POST.** `conflict:true`면 GET부터 **1회** 다시 한다. 두 번째 충돌·
   `applied:false`(admission 거부·rejected)·HTTP 오류는 실패 사유를 사용자에게
   보고하고 **보류로 폴백**한다 — Bead는 `open`, 아무 키도 쓰지 않는다.
5. **기록.** 성공 시
   `bd update <id> --append-notes 'lane_placed: <lane>#<index> — <근거 한 줄>' --json`
   후 readback. 이 줄은 사람이 읽는 기록이며 어떤 게이트도 읽지 않는다.
   (`--notes`는 덮어쓰기이므로 쓰지 않는다.)

### 4.4 종료 형태

세션은 배치 직후 스펙 게이트 착지에서 끝난다. 결과 줄은 스펙 publication의
`성공 · push <sha7>` 그대로이고, 배치 사실(레인·index·근거)은 보고서
`설계 판단`에 적는다. 새 result-line 어휘·새 `awaiting_user` 값을 만들지 않는다.

### 4.5 계약 변경 표면 (dotfiles)

- `docs/contracts/workflow-state.yaml` `workflow_session_defaults`에
  `bdui_url: {type: string, optional: true}` — 부재는 layer skip, 비문자열은
  warn+skip(기존 kv fail-quiet 규칙과 동일).
- `workflow-state.yaml impl_entry.standard`와 `workflow-contract.md`의 user
  approval turn 문단에 세 번째 답 "Worker 레인에 배치"가 `impl_entry`를 쓰지
  않는 답임을 한 줄로 명시.
- `src/shared/skills/flow/workflow/SKILL.md` Gates 절과
  `references/execution.md`에 §4.1~4.4의 절차.
- beads-ui는 새 metadata 키·라벨을 읽지 않는다(`lane_placed` notes 줄은 표시
  대상이 아니다).

이 unit은 dotfiles rig의 `quick_fix` Bead로 만들고 `UI-1gpj`가 그것에 foreign
`blocks`로 의존한다(workflow `references/execution.md` Cross-repo units). §4.1의
사전 확인 덕에 엔드포인트보다 먼저 착지해도 안전하다.

## 5. 오류 처리 요약

| 상황 | 서버 | 세션 |
| --- | --- | --- |
| `bdui_url` 부재 | — | 선택지 미표시 |
| 서버 무응답·404 | — | 선택지 미표시 |
| `root_dir` 미등록 | 400 | 선택지 미표시(사전 확인 단계) |
| admission 거부 | 200 `applied:false` + `recordAdmission` | 사유 보고, 보류 폴백 |
| CAS 충돌 | 200 `conflict:true` | GET부터 1회 재시도, 재충돌 시 보류 폴백 |
| `place` rejected | 200 `reason:'rejected'` | 사유 보고, 보류 폴백 |
| notes 기록 실패 | — | 배치는 유지, 보고서에 관찰 줄 |

## 6. 검증

- `server/worker/queue-place.test.js`: 거부·stale 통과·성공·conflict 네 경로가
  WS 핸들러의 기존 동작과 같은 큐 상태를 만든다.
- `server/routes/worker-queue.test.js`: GET 400(부재·상대경로·미등록)/200 투영,
  POST 400/성공/거부/충돌/rejected.
- `server/ws/worker-handlers` 기존 테스트 무변경 통과(추출 리팩터 회귀).
- Pre-Handoff Validation: `npm run tsc`, `npx vitest run --reporter=dot`,
  `npm run lint`, `npm run prettier:write`. 프런트엔드 소스 변경이 없으므로
  `npm run build`는 불필요.
- dotfiles unit: 스킬 문구·kv 스키마 변경은 그 rig의 quick_fix 검증 bundle을
  따른다. 종단 확인은 실제 세션에서 §4.1 사전 확인이 켜지고 §4.3이 한 번 성공해
  Worker 탭에 카드가 해당 레인에 나타나는 것이다.

## 7. 구현 unit 후보

- `server-place`: `server/worker/queue-place.js` 추출 + `server/ws/worker-handlers.js` 호출 교체
- `server-routes`: `server/routes/worker-queue.js` + `server/app.js` 등록

같은 레포·같은 검증 bundle이므로 기본은 한 unit이다.

## 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | awaited_by_consumer | 다른 저장소의 closed unit(Cross-repo units) — workflow 스킬 선택지·절차와 kv `bdui_url` 스키마 | 없음 | `dotfiles-95up` |

## 결정 (ADR 후보)

- 세션이 레인 배치(겹침·선후)를 판단하고 beads-ui 서버는 대기열 읽기와 기존
  `place` 실행만 HTTP로 노출한다.
  - 되돌리기 어려움: 아님 — 라우트 둘을 지우면 끝난다.
  - 맥락 없이는 의외: 그렇다 — "적당한 레인"을 서버가 안 고르는 이유는 ADR 0009
    를 알아야 보인다.
  - 실제 trade-off: 그렇다 — 서버 판정의 결정성 vs 세션 판정의 문맥.
  - 세 조건 중 둘만 성립하므로 ADR 후보가 아니다. ADR 0009의 결정을 이 스펙이
    따르는 것이며 supersede도 아니다.
