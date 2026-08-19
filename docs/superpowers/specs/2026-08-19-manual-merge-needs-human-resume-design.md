---
scope:
  - server/worker/queue-store.js
  - server/worker/merge-queue.js
  - app/views/worker/index.js
---

# 수동 머지 클릭의 needs_human completion intent 재개 (UI-glsj)

## 배경과 문제

UI-c00b(PR #167) 사고에서 두 겹의 결함이 확인됐다.

1. **수동 클릭이 needs_human을 뚫지 못한다.** `terminalizeCompletionIntent`는
   임의 사유로 completion intent를 `needs_human`으로 굳히고 merge_queue에서
   항목을 제거한다. 이후 사용자가 [머지]([충돌 해소 후 머지] 포함)를 클릭하면
   `enqueueMergeManual`이 manual authority를 가진 큐 항목을 새로 만들지만
   intent는 건드리지 않고, 드라이버는 `processCompletionItem`에서
   `phase !== 'merging'`이면 아무 기록 없이 `halted_on_completion`으로
   정지한다(`server/worker/merge-queue.js:1343` 부근). 충돌 해소·리뷰 재획득 등
   authority가 약속한 연속 동작(`enqueueWorkerManualMerge` 계약 주석,
   `server/worker/attach.js:1938` 부근)이 completion 경로에서 무효화된다.
2. **needs_human에서 나가는 사용자 액션이 없다.** 복구 코드는
   `resolution_timeout` 전용 `adoptLegacyTimeout`뿐이라
   `review_receipt_stale` 등 다른 terminal 사유는 상태 파일 수동 수정 외에
   복구 수단이 없고, 드라이버의 completion halt는 어디에도 표시되지 않는다.

terminal 사유는 닫힌 enum이 아니라 통과형 문자열(`review_receipt_stale`,
`ownership_undecidable`, `repair_dispatch_failed`, 머지/정리 실패 등)이다.

## 사용자 결정

- **재개 범위: 모든 needs_human terminal 사유.** 클릭은 사람의 확인이고,
  재개는 어떤 게이트도 우회하지 않는다 — 재개된 intent는 `gating`부터
  head review·verify·머지 게이트를 전부 fail-closed로 다시 통과해야 하며,
  조건이 지속되면 기계가 같은 사유로 다시 terminalize하는 자기제한 구조다.
  사유 whitelist는 누락 시 이번과 같은 침묵 정지를 재발시키므로 두지 않는다.
- **재개 위치: 클릭 mutation 원자 재개.** `enqueueMergeManual`의 CAS write
  하나에서 authority 부여와 intent 재개를 함께 커밋한다. 드라이버와
  completion driver는 판단 로직 무변경.

## 상세 설계

### 1. 재개 mutation — `server/worker/queue-store.js enqueueMergeManual`

per-entry 처리에서 `next.completion_intents[bead_id]?.phase === 'needs_human'`
이면, 기존 authority 부여/승격 로직과 같은 mutation 안에서:

- `intent.resumed_terminal = { ...intent.terminal_reason, resumed_at: now() }`
  — terminal 증거를 단일 최신 기록으로 이동(덮어쓰기, bounded). 배열 이력은
  두지 않는다.
- `intent.phase = intent.subject.merged_sha === null ? 'gating' : 'cleaning'`
  — `resumeCompletionIntentRecord`(paused 재개)와 동일한 판별자.
- `intent.terminal_reason = null` — 기존 불변식
  (`needs_human` ↔ `terminal_reason` 결합)을 유지한다.
- `intent.active_op`은 건드리지 않는다 — non-null이면 재개 후 기존
  `reconcile_op` 경로가 소유한다.
- `repair_sessions_used`, `repair_bead_ids`, `subject_stack`, `subject`는
  모두 보존한다. 재개는 phase와 terminal 부기만 바꾼다.

재개는 클릭 항목의 authority 처리 분기(신규 authority / 승격 / 중복 클릭
reuse)와 무관하게, 해당 bead가 이 mutation에서 유효하게 처리될 때 수행한다.
terminalize가 큐 항목을 제거했으므로 일반 경로는 "신규 항목 + 신규 authority
+ intent 재개"가 한 write에 함께 커밋되는 형태다.

`normalizeCompletionIntent`는 선택 필드 `resumed_terminal`을 fail-quiet로
수용한다(필드 없는 구 레코드는 그대로 유효). 형식이 유효하지 않으면 필드를
버리고 intent는 유지한다.

### 2. 드라이버·completion driver — 판단 무변경

`processCompletionItem`의 `phase !== 'merging'` halt, `decideCompletionAction`,
`adoptLegacyTimeout`은 그대로 둔다. 재개된 intent는 completion driver의
정상 경로(gate → … → merging)로 다시 흐른다. 재개가 클릭에만 결속되므로
자동 재시도 루프는 생기지 않는다 — 클릭 1회당 재게이트 1회.

### 3. 관측성 — completion halt를 기존 waiting 파이프에 노출

- `server/worker/merge-queue.js`: `halted_on_completion`을
  `{ bead_id, phase }`로 확장하고, `state().waiting`을
  `halted_on_conflict`(사유 `worker_sessions_busy`)와 같은 형태로
  completion halt에서도 채운다 — 사유 문자열은 `completion_waiting:<phase>`.
  halt를 만든 시점의 intent phase를 기록하고, 큐 변경 이벤트로 halt가 풀리면
  기존과 동일하게 비운다.
- `app/views/worker/index.js mergeWaitingText`: `completion_waiting:*` 사유에
  phase별 한국어 라벨을 추가한다(예: `needs_human` → "완료 의도 대기 — 사람
  확인 필요", 그 외 phase → "완료 의도 대기 — <phase>"). 알 수 없는 사유는
  기존 fallback 표시를 따른다. `completionView`의 needs_human 배지는 기존
  그대로 둔다.

### 4. 경계 동작

- **auto_merge OFF에서 클릭**: 재개는 수행된다. 이후 completion driver의
  OFF 경계(`decideCompletionAction`의 pause)가 intent를 `paused`로 전환하고
  큐 위치를 회수한다 — needs_human 방치보다 관측 가능하며 OFF 의미(완료 진행
  정지)와 일치한다. OFF에서의 manual continuation 정합 자체는 이 설계의
  비범위다(기존 동작 유지).
- **CAS revision 충돌**: 기존 `enqueueMergeManual`과 동일 — mutation 전체가
  no-op으로 거절되고 부분 재개는 없다.
- **`adoptLegacyTimeout`**: 공존한다. 이 설계는 그 경로를 대체하지 않는다.

### 5. 비범위

- terminal 사유 문자열의 enum화·정리.
- dotfiles workflow 계약 표면(라벨·metadata 키) 변경 — 이 변경은 beads-ui
  내부 큐 의미론만 다룬다.
- 별도 [재개] 버튼·신규 ws 핸들러.
- 큐 스키마 마이그레이션이 필요한 설계(신규 필드는 optional·fail-quiet).

## 검증 bundle

- `npm run tsc && npm test` 전체 통과, `npm run lint`,
  `npm run prettier:write`, `npm run build`(번들 포함).
- 신규 회귀 테스트:
  - queue-store: manual enqueue가 needs_human intent를 `gating`으로 재개하고
    `resumed_terminal`을 기록한다 / `merged_sha` 존재 시 `cleaning`으로
    재개한다 / `active_op`·repair 부기를 보존한다 / 재개 후
    `terminal_reason`이 null이다 / needs_human이 아닌 intent는 무변경이다 /
    CAS 충돌 시 재개가 일어나지 않는다.
  - merge-queue: **사고 재현 회귀** — needs_human(review_receipt_stale)
    intent + manual enqueue 후 드라이버가 gate를 거쳐 conflict resolver
    디스패치까지 도달한다; completion halt가 `state().waiting`에
    `completion_waiting:<phase>`로 노출되고 해소 시 비워진다.
  - worker/index: `completion_waiting:needs_human` 라벨 렌더.

## 구현 unit 후보 (advisory)

- `store:server/worker/queue-store.js` — 재개 mutation + normalize 필드
- `driver:server/worker/merge-queue.js` — halted_on_completion projection
- `ui:app/views/worker/index.js` — waiting 라벨
