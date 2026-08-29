---
scope:
  - server/worker/quickfix-landing.js
  - server/worker/quickfix-landing.test.js
  - server/worker/queue-store.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
---

# Worker quick_fix 착지의 무-delta 종결(`no-delta:`) 정산과 종류 표시

Bead: UI-2wwd (`route=spec_backed`) · 선행: dotfiles-jjar(closed, PR #462 — 계약 스펙
`docs/superpowers/specs/2026-08-29-quick-fix-no-delta-close-design.md`)

## 1. 문제

계약(dotfiles `docs/contracts/workflow-contract.md` "No-change close has two kinds")이
quick_fix 무변경 종결에 두 번째 `close_reason` 접두어를 열었다.

- `refuted: <한 줄 사유>` — 실제로 돌린 재현이 Bead의 근본 원인 가설을 반증했다.
- `no-delta: <한 줄 효과>` — 승인된 검증 bundle을 readback으로 통과했는데 tracked 트리가
  핀된 base와 같고 아무것도 push하지 않았다.

두 종류 모두, 두 소유자(세션·Worker-dispatched) 모두 세션이 `bd close --reason`으로 닫는다
(`bd close`가 `close_reason`의 유일한 writer). 큐 쪽 판정 — `closed`+두 접두어 중 하나는
push 로그·배포 증거 없이 정산한다 — 은 beads-ui 소유다.

현재 착지(`server/worker/quickfix-landing.js:47`)는 `NO_CHANGE_CLOSE_REASON_RE =
/^refuted: \S/`만 받아 `closed`+`no-delta:`를 `premature_close` 실패로 기록한다. 그리고
완료 행에는 `refuted:` 종류 표시도 없다 — 착지 기록 `quickfix_landing.cursor =
'no_change_close'`는 두 종류를 구분하지 않고, 사용자에게 보이는 배지는 아예 없다.

## 2. 사용자 결정 (2026-08-29)

1. **종류 캐리어는 `done_kind` 재사용.** attempt 레코드의 `done_kind`(`queue-store.js`
   typedef `string|null`, `makeAttempt`가 정규화, `snapshot-retention`이 보존)에
   `'refuted'|'no_delta'`를 쓴다. 완료 행은 이미 `latestTerminalAttempt(...).done_kind` →
   `DONE_KIND_LABELS` 배지 통로를 갖고 있어 새 필드·새 슬롯이 없다. 이 통로는
   UI-43di(#30)가 서버 쪽 writer를 없앤 뒤로 비어 있었고, 이 스펙이 다시 쓴다.
2. **배지 문구는 `반증` · `무-delta`.** 계약 스펙 §9의 용어 그대로이며 기존 배지(`자동
   머지`·`머지`·`중단`·`실패`)처럼 짧은 명사다. 착지 타임라인 라벨 `무변경 close`는 두
   종류를 아우르는 상위어라 그대로 둔다.

## 3. 설계

### 3.1 `server/worker/quickfix-landing.js`

- `NO_CHANGE_CLOSE_REASON_RE`를 `/^(?:refuted|no-delta): \S/`로 넓힌다. 계약
  `workflow-state.yaml no_change_close`(`close_reason.regex`, `lines: single_line_only`)를
  그대로 소비하며 여기서 재정의하지 않는다. 한 줄 제약(`[\r\n]` 거부)은 그대로.
- `isNoChangeClose(close_reason): boolean`을 `noChangeCloseKind(close_reason):
  'refuted'|'no_delta'|null`로 바꾼다. 문자열이 아니거나, regex 불일치거나, 여러 줄이면
  `null`. 접두어→종류 매핑은 `refuted`→`'refuted'`, `no-delta`→`'no_delta'` 하나뿐이다
  (attempt 키는 snake_case).
- `settle()`의 `closed` 분기: `noChangeCloseKind(issue.close_reason)`가 `null`이면 지금처럼
  `premature_close`, 아니면 `settleNoChangeClose(attempt_id, bead_id, target_base, kind)`.
- `settleNoChangeClose`는 `moveToDone` patch에 `done_kind: kind`를 함께 쓴다:

  ```js
  patch: {
    status: 'done',
    finished_at: now(),
    done_kind: kind,
    quickfix_landing: { cursor: 'no_change_close', head_sha: null, reason: null }
  }
  ```

  base fetch·잔여 제거·fail-closed 분기·배포 없음·`bd` status 미기록은 전부 그대로다.
- 파일 머리 설명("a session that refuted … closes it itself")과 `queue-store.js`의
  `quickfix_landing` typedef 주석("for a contract refuted close")을 두 종류(`refuted:`·
  `no-delta:`)로 정정한다.
- `queue-store.js` `Attempt` typedef에서 `done_kind`는 지금 "RETIRED merge-axis fields —
  new attempts never write them" 묶음 안에 있다. 이 스펙이 다시 쓰므로 그 묶음에서 빼내
  활성 속성으로 옮기고, 값을 명시한다: `@property {string|null} done_kind — 무변경 종결의
  종류 (`'refuted'`·`'no_delta'`, quick_fix 착지가 씀); 그 밖의 값은 legacy 머지 축 기록`.
  폐기 묶음의 나머지 필드와 `makeAttempt` 정규화(`fields.done_kind ?? null`)는 그대로다.
  (스펙 리뷰 정정 — codex minor 1.)

### 3.2 `app/views/worker/lane-model.js`

`DONE_KIND_LABELS`에 두 항목을 추가한다.

```js
refuted: '반증',
no_delta: '무-delta'
```

완료 행은 Worker 탭과 Monitor 탭이 같은 `buildLanes`의 `done` 항목(`badges`)을 그리므로
(ADR 0014) 한 곳이다. 자리는 카드 문법 스펙 §5.1 슬롯 1 "상태 뱃지(완료…)"에 이미
배정돼 있어 그 스펙은 갱신하지 않는다. 알 수 없는 `done_kind`는 지금처럼 배지를 그리지
않는다(fail-quiet).

### 3.3 바뀌지 않는 것

- `premature_close` 판정 위치와 의미, `bd_read_failed`, `containment_unobservable`,
  `worktree_remove_failed` 분기.
- `quickfix_landing` 레코드 모양 — `no_change_close` 커서에 `head_sha: null`·`reason: null`.
  `prWaitProgress` 투영과 `resumeKindOf`(ADR 0018)는 건드리지 않는다.
- `resolved`+접두어를 기대하는 코드는 없으므로 정정 없음. 계약 yaml 투영은 읽지 않는다
  (ADR 0012).

## 4. 테스트

### Test scope

`server/worker/quickfix-landing.test.js` (`makeLanding({ status: 'closed', closeReason })`
픽스처 그대로):

- `closed`+`no-delta: 두 rig 집계가 readback으로 확인됐다` → `{ ok: true }`,
  `store.moveToDone` patch가 `done_kind: 'no_delta'`·`quickfix_landing.cursor:
  'no_change_close'`, `repoOperations.ensureDeploy`·`bd.setStatus` 미호출.
- 기존 refuted 정산 테스트에 `done_kind: 'refuted'` 단언 추가.
- `no-delta:근거`(접두어 뒤 공백 없음) → `premature_close`, `step: null`.
- `no-delta: 첫 줄\n둘째 줄` → `premature_close`, `step: null`.

`app/views/worker/lane-model.test.js` (monitor 완료 lane describe 블록 패턴 그대로):

- terminal attempt `done_kind: 'no_delta'` → `lanes.done[0].badges` = `['무-delta']`.
- `done_kind: 'refuted'` → `['반증']`.

### 절차

Bead 검증 bundle 그대로: `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120초) ·
`npm run lint` · `npm run prettier:write` · `npm run build`(`app/main.bundle.js`·`.map`
포함). 머지 후 `bdui-shared restart`와 프로세스 경로·포트·HTTP 응답 확인.

## 5. 수용 기준

1. `closed`+`no-delta: …`로 닫힌 Worker-dispatched quick_fix가 `premature_close`가 아니라
   배포 없는 `done`으로 정산된다.
2. 완료 행에서 `반증`·`무-delta` 배지가 종류를 구분해 보인다(Worker·Monitor 동일).
3. 한 줄 제약과 접두어 뒤 공백 요구는 두 접두어에 똑같이 적용된다.

## 6. 비목표

- `close_reason` 원문 저장·툴팁 표시. 종류만 싣는다.
- 무변경 정산 성공 시 착지 타임라인 줄(`recordLandingStep`)을 남기는 일 — 지금도 성공
  경로는 남기지 않으며 이 스펙은 그 동작을 바꾸지 않는다.
- 배포 창(계약 스펙 §9.1) 안에 생긴 `premature_close` 실패 행의 재정산 — 후보가 통제되므로
  계약이 요구하지 않는다.

## 결정 (ADR 후보)

- 없음 — 계약이 정한 어휘를 소비하는 정산 확장과 기존 배지 통로의 재사용이라, 되돌리기
  어렵지도(라벨 두 줄·regex 한 곳) 맥락 없이 놀랍지도(계약 문서가 근거) 않고 실질적
  trade-off도 없다.

## 구현 unit 후보

- 하나 — `server/worker/quickfix-landing.js` + `app/views/worker/lane-model.js`와 각
  테스트. 나누면 배지 재료 없는 정산이 먼저 착지해 완료 행이 종류를 잃는 창이 생긴다.

## 경계·후속

- 관찰: 무변경 정산 성공 타임라인 줄 부재 — 이 스펙 범위 밖이고 소비자 요구가 없어 Bead를
  만들지 않는다.
