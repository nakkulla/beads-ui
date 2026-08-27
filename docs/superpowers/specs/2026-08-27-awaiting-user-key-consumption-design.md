---
scope:
  - server/list-adapters.js
  - server/worker/admission.js
  - server/worker/attach.js
  - server/worker/revise-parked.js
  - server/worker/revise-disposition.js
  - server/worker/bd-metadata.js
  - server/ws/worker-handlers.js
  - app/views/board/card.js
  - app/views/board/index.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/display-settings-dialog.js
  - app/views/settings-dialog/display-tab.js
  - app/protocol.md
---

# `awaiting_user` 키 소비 — 사용자 리뷰 필요 chip · blocked 컬럼 의존성 전용 · Worker admission 거부 · REVISE 처분 상태 쓰기 제거

Bead: `UI-dqg9` · route: `spec_backed` · 선행: dotfiles `dotfiles-89v8`
(`docs/superpowers/specs/2026-08-27-awaiting-user-staleness-lane-design.md`, closed).

## 1. 배경

워크플로우 계약(dotfiles)이 아티팩트 staleness 파킹을 `status=blocked` +
`metadata.blocked_reason`에서 **상태 변경 없는 `metadata.awaiting_user`**로 바꿨다.
값 어휘는 `spec_review_stale:revise` · `plan_approval_stale:revise` 2종이고,
`blocked` 상태는 계약 lifecycle에서 제거됐다(의존성 차단은 `blocks` 엣지만).
키 제거는 결정 산출물 키(`spec_review`/`plan_review`/`plan_approval`/
`last_checked_sha`)와 같은 `bd update`에서 일어난다.

beads-ui는 이 계약의 소비자다. 현재 코드는 옛 표현을 네 곳에서 읽는다.

| 표면 | 현재 | 문제 |
|---|---|---|
| `server/list-adapters.js` `blocked-issues` | 저장 상태 `blocked`(`bd list --status blocked`) + `bd ready --explain`의 `blocked`를 한 컬럼에 합치고 `blocked_info.external/reason`으로 구분 | 저장 상태 소스는 이제 항상 비어 있고, 파킹된 Bead는 자기 상태 컬럼에 남아야 한다 |
| `app/views/board/card.js` `blockedChips` | `blocked_info.external`일 때만 `⏸ blocked: <blocked_reason>` chip | chip 소스가 사라진 키라 파킹이 보이지 않는다 |
| `server/worker/revise-parked.js` 조건 ③ | `status === 'blocked' && blocked_reason === 'spec_review_stale:revise'` | 새 파킹을 관측하지 못해 처분 버튼이 안 뜬다 |
| `server/worker/revise-disposition.js` 처분 쓰기·판정 | `unset: ['blocked_reason'], status: 'open'`, readback `status==='open' && blocked_reason==null` | 계약이 상태 전이를 하지 않으므로 `status` 쓰기를 빼고 키만 해제해야 한다 |

또 Worker admission은 `awaiting_user`를 전혀 모른다. 옛 계약에선 `status=blocked`가
`bd ready`에서 자동 제외됐지만, 새 계약에선 파킹된 Bead가 `bd ready`에 그대로
나오므로 Worker가 사용자 결정 대기 중인 Bead를 재디스패치할 수 있다.

## 2. 결정

### 2.1 Board — chip 소스와 blocked 컬럼

- **chip**: `chipsTemplate`(모든 컬럼 공통)이 `issue.metadata.awaiting_user`를 읽어
  `⏸ 사용자 리뷰 필요: <값>` chip을 그린다. 값은 `string`이고 trim 후 비어 있지
  않을 때만(fail-quiet); 값 어휘는 검증하지 않는다(계약이 소유). 표시 토글은
  기존 `blocked` chip 키를 그대로 쓴다 — 저장 정책(`display-policy-store.js
  CHIP_KEYS`)의 키를 바꾸면 사용자 저장값이 깨지므로 키는 유지하고 두 설정
  다이얼로그의 라벨만 `'blocked·사용자 리뷰 필요 칩'`으로 바꾼다. CSS 클래스는
  기존 `ctl-chip--blocked`를 재사용한다(색·자리 동일: "멈춤" 의미).
- **`blocked_info`**: `{ blockers: string[] }`로 줄인다. `external`·`reason`은
  삭제하고 `blockedReasonOf`도 삭제한다. `blockedChips`는 의존성 칩 두 개
  (`same_repo`/`foreign`)만 남긴다.
- **`blocked-issues` 구독**: 소스는 `bd ready --explain`의 `blocked` 목록 하나다.
  `mapSubscriptionToBdArgs`의 `blocked-issues` case(`--status blocked`)와
  `fetchBlockedIssues`의 stored 조회, `projectBlockedIssues`의
  `projectByStatus(snapshot, 'blocked')`를 제거한다. `attachBlockedInfo`는
  dependency 항목만 받는다.
- **`app/views/board/index.js` `isBlockedBoardIssue`**: `status === 'open'`만.
  (`in_progress`가 `--explain blocked`에 나오는 경우는 지금도 in_progress 컬럼이
  가져가며, 이 판정은 바뀌지 않는다.)
- 파킹된 Bead의 컬럼은 저장 상태가 정한다: `open`이면 ready 컬럼(의존성 차단이면
  blocked 컬럼), `in_progress`면 in_progress 컬럼. chip은 어느 컬럼에서든 같다.

### 2.2 Worker — admission 거부와 후보 카드

- **서버 admission**(`server/worker/admission.js`): `worker_ineligible` 검사 바로
  다음에 `Object.hasOwn(bead, 'awaiting_user')`이면
  `{ ok: false, reason: 'awaiting_user' }`. 값 형식은 보지 않는다 — 키 존재
  자체가 fail-closed(계약: "키 부재 = 결정 산출물 존재"). `snapshotBead`
  (`attach.js`)는 다른 admission 입력과 같은 presence rule로
  `awaiting_user`를 전달한다(`Object.hasOwn(md, ...) ? md.awaiting_user : undefined`).
  `runPass`와 dispatch 재검사 모두 `checkAdmission`을 지나므로 별도 분기는 없다.
  처분 세션 디스패치(`dispatchReviseFix`)는 `relaunchFromAttempt` 경로라
  admission을 지나지 않으며 계속 동작한다.
- **후보 레인**(`app/views/worker/index.js`): UI-8881의 관측 원칙을 따른다 —
  숨기지 않고 `draggable=false`·place 버튼 비활성, reason 파트에
  `사용자 리뷰 필요: <값>`을 넣는다. 판정은 `Object.hasOwn(it.metadata,
  'awaiting_user')`(서버와 같은 presence rule). 이미 큐에 있는 행은 서버가
  `⛔ awaiting_user` skip 뱃지로 답한다(기존 `admissionBadge` 포맷, 라벨 맵 없음).
  `lanes.js`의 place 버튼 title 분기에 `awaiting_user` 사유 문구를 추가한다.
- `worker-ineligible` 라벨은 쓰지 않는다(영구 처분 라벨 vs 일시 상태).

### 2.3 REVISE 파킹 관측·처분

- `revise-parked.js`: 조건 ③을 `md.awaiting_user === REVISE_PARKED_REASON`으로
  바꾸고 `status` 조건을 뺀다. `REVISE_PARKED_REASON` 값과 "다른 사유로 일반화
  금지" 주석의 예시는 `plan_approval_stale:revise`로 갱신한다.
- `revise-disposition.js`:
  - `approve` 쓰기: `{ set: { spec_review }, unset: ['awaiting_user'], append_notes }`
    — `status` 필드 없음.
  - `readBack`: `blocked_reason` → `awaiting_user`.
  - `complete`/`approve` 판정: `awaiting_user` 부재 **그리고** `status === 'open'`.
    `open` 정확 검사는 기존 수용 기준(일반 레인이 재디스패치하려면 `open`이어야
    하고, `resolved`/`closed`는 작업 유실)이며 계약 변경과 무관하게 유지한다.
    파킹은 상태를 바꾸지 않으므로 `open`에서 파킹된 Bead는 그대로 `open`이다.
    거부 reason id `still_blocked`는 유지한다(클라이언트가 문자열로 소비).
  - `reviseFixPrompt` 3단계: "`status=open`과 `blocked_reason` 해제" →
    "같은 쓰기에서 `awaiting_user` 해제(상태는 바꾸지 않는다)".
- `bd-metadata.js updateFields` 주석과 `attach.js`·`worker-handlers.js`의
  `blocked_reason` 언급 주석을 갱신한다. `updateFields`의 `status` 옵션은
  범용이라 남긴다.

### 2.4 문서

- `app/protocol.md`: `blocked-issues` 구독이 의존성 차단만 담는다는 점,
  `blocked_info: { blockers }` 형태, 카드 chip이 `metadata.awaiting_user`를
  읽는다는 점을 기록한다.

## 3. 제외

- `worker-eligibility.js` 라벨 의미, merge queue·PR probe의 `kind: 'blocked'`
  (mergeability 어휘), repo-ops `retry.blocked_reason`(별개 키), `child-rollup.js`
  상태 점 `blocked` case(무해한 dead branch), `list-selectors.js`의 컬럼 모드
  이름 `'blocked'`(컬럼 키이지 상태 아님).
- 옛 `blocked_reason` 호환 읽기 — 두지 않는다(계약 §4).
- 값 어휘 검증·`plan_approval_stale:revise` 전용 처분 UI(YAGNI, hs11 §2 그대로).

## 4. 검증

- 단위 테스트 갱신·추가:
  - `server/list-adapters.test.js`: stored-blocked 케이스 삭제, `blocked_info`가
    `{ blockers }`만 갖는지, `blocked-issues`가 stored 조회를 하지 않는지.
  - `app/views/board/card.test.js`: `metadata.awaiting_user` chip 렌더, 공백값
    fail-quiet, `blocked` 토글 off 시 미표시.
  - `server/worker/admission.test.js`: `awaiting_user` 존재(정상값·빈값·비문자열)
    → `reason: 'awaiting_user'`.
  - `server/worker/attach.test.js`: `snapshotBead`가 `awaiting_user`를 presence
    rule로 전달.
  - `server/worker/revise-parked.test.js` / `revise-disposition.test.js`:
    fixture를 `status: 'open'` + `awaiting_user`로, approve 페이로드에 `status`
    없음, readback 판정.
  - `app/views/worker/index.test.js`: 후보 행 `draggable=false` + reason.
- `npm run tsc` · `npx vitest run --reporter=dot` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`.
- 배포 후 live readback: `awaiting_user`를 가진 Bead가 자기 상태 컬럼에
  `⏸ 사용자 리뷰 필요` chip으로 보이고, Worker 후보 카드가 적재 불가 상태이며
  큐에 있으면 `⛔ awaiting_user` 뱃지로 스킵되는지 확인.

## 5. 구현 unit 후보

- `board`: `list-adapters.js` · `card.js` · `board/index.js` · 설정 라벨 · protocol
- `worker`: `admission.js` · `attach.js` · `worker/index.js` · `lanes.js` ·
  `revise-parked.js` · `revise-disposition.js` · 주석

단일 Bead, `unit_plan`은 실행 진입 시 판단.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | blocks 대상 | Bead ID |
|---|---|---|---|---|---|
| (없음) | | | | | |
