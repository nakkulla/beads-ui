# UI-7u3d 머지 후 정리 verify 실패 자동 복구 — 실행 계획

## Context

머지 후 정리(`runCleanup`)의 `post_merge_verify`가 flake로 실패하면 정리가
durable 실패로 멈추고 사람이 로그 진단 + 재클릭으로 복구해야 한다. 승인된
스펙 `docs/superpowers/specs/2026-08-06-post-merge-verify-retry-design.md`
(spec_review `codex@85e7ed58b29f42b776829c9c2f8f684def65ca7a`)은 두 단으로
이를 자동화한다: **1단** bounded 자동 재시도(flake 흡수), **2단** [AI 정리]
진단 디스패치 버튼. 이 계획은 그 스펙의 실행 분해다.

구현에 쓰는 기존 사실 (탐색 확정):

- `runVerifyAtSha`(`server/worker/verify-cmd.js:713`)가 유일한 재시도 삽입
  지점. 로그명은 `verify-<bead>-<sha7>-<started_at_ms>.log`
  (`openRunLog`, verify-cmd.js:284), `started_at_ms`는 호출 시점
  `Date.now()`. 워크트리 add→run→remove가 attempt 단위 lifecycle이며
  `withLifecycleMutex`가 `(repo, name)` 직렬화를 보장한다.
- `pr-actions.js`의 `runVerify`는 attach.js:797이 주입하는
  `runVerifyAtSha` 클로저. 콜사이트는 `gateNow`(:616)와
  `postMergeVerify`(:763) 두 곳, poller는 자체 wiring(:208)이라 옵션
  미전달 시 무변화.
- `gateNow`(:606-612)는 `verify_missing`/`verify_sha_stale`일 때만 verify를
  실행 — poller가 기록한 현재 SHA의 `verify_cmd_failed`(cached red)에는
  재검증이 붙지 않는다 (스펙 F1).
- `cleanup_failed`는 큐 스토어 durable 필드(`recordCleanupFailure`,
  queue-store.js:1528 — **필드 화이트리스트 방식**이라 diagnosis 병합에는
  스토어 메서드 신설 필요), `worker-queue-snapshot`으로 프런트에 그대로
  전달되며 보드 뷰는 이 스토어를 전혀 받지 않는다(main.js:1294 — 조인
  필요).
- bd notes append는 `deps.bd.updateFields(id, { append_notes })`
  (bd-metadata.js:202)가 기존 헬퍼. 호출 관례는
  revise-disposition.js:523.
- 디스패치 선례: `dispatchExternalConflict`(scheduler.js:2984) — 신규
  attempt + 플래그 + 가드(`bead_running`), 완료는 `onSessionDone`의 플래그
  분기, 재시작 후에는 `reconcile`→`disposeDeadAttemptSettlement`가 같은
  분기를 재실행. 사람-클릭 디스패치는 슬롯 cap 면제.
- UI 경로: 버튼 → `transport('<type>', {..., expected_revision})` →
  `server/ws/connection.js` switch → `worker-handlers.js` 핸들러 → 액션 →
  `fanout`. 선례: `worker-attempt-resume`.

## Phase 1: verify-cmd 재시도 래퍼

대상: `server/worker/verify-cmd.js`, `server/worker/verify-cmd.test.js`

1. `runVerifyAtSha` 입력에 `retry_flaky?: boolean`(기본 false) 추가: 1차
   결과 `reason === 'verify_cmd_failed'`일 때만 전체 lifecycle(워크트리
   add→run→remove)을 1회 재실행. timeout·spawn·sha·worktree 사유는 즉시
   반환.
2. 결과에 `attempts: [{ reason, log_path }]` 추가 — `retry_flaky` 활성 시
   항상 존재(1개 또는 2개), 최종 `ok`/`reason`/`log_path`/`output_tail`은
   마지막 attempt 기준. 옵션 미사용 호출자는 반환 형태 포함 무변화.
3. 재시도 attempt의 로그명 충돌 방지: `retry_flaky` 경로에서는 1·2차
   모두 attempt 서수 suffix(`-r1`/`-r2`)를 붙인다. 옵션 미사용 경로만
   기존 이름 형식을 유지한다.
4. Test scope 시임 1 (RED→GREEN): 1차 red→2차 green = ok + attempts 2 /
   2연속 red = 최종 red + attempts 2 / timeout·spawn 즉시 인계 / 두
   `log_path` 상이 / 옵션 미사용 기존 동작 불변. 기존
   `fakeGit`/`fakeWorktree` + real-`process.execPath` 관례를 따르되, 1차
   실패→2차 성공은 attempt 횟수를 세는 상태형 커맨드(스크립트 파일)로
   구성.

검증: `npx vitest run server/worker/verify-cmd.test.js` green +
`npm run tsc`.

## Phase 2: 1단 적용 — postMergeVerify·gateNow·문안

대상: `server/worker/pr-actions.js`, `server/worker/pr-actions.test.js`,
`app/views/worker/running-grid.js`(문안), 해당 뷰 테스트, `AGENTS.md`

1. `postMergeVerify`(:748): `retry_flaky: true` 전달. 성공이되
   `attempts.length === 2`면 `deps.bd.updateFields(bead_id,
   { append_notes: 'verify flake 흡수 (post_merge_verify): …' })`를
   best-effort 호출(실패는 log만, 정리 계속 — fail-quiet).
2. `gateNow`(:590-638): 재검증 트리거 조건에 cached red 추가 — 관측
   entry의 verify가 현재 `pr.head_sha`에 결합돼 있고 `ok === false`,
   `reason === 'verify_cmd_failed'`면 클릭 시 재실행(`retry_flaky`
   전달, 클릭당 총 2회 상한). 흡수 시 `merge_gate` lane으로 동일 형식
   notes append(best-effort). 최종 attempt 결과를 기존과 동일하게
   `recordVerify`.
3. 배너 문안(`running-grid.js` cleanup 배너): "자동 재시도는 하지
   않습니다 — 정리를 사람이 마무리하세요" → "1회 자동 재시도 후에도
   실패했습니다 — [AI 정리]로 진단하거나 정리를 사람이 마무리하세요."
   `AGENTS.md` Post-Merge 절에 1단 재시도·2단 버튼 반영.
4. Test scope 시임 2·3 (RED→GREEN): postMergeVerify 흡수→정리 계속 +
   notes append 호출 / append 실패에도 진행 / 2연속 red면 기존
   `failCleanup` · gateNow cached red→클릭→green 게이트 통과 / merge_gate
   notes append / append 실패에도 green 유지.

검증: `npx vitest run server/worker/pr-actions.test.js app/views/worker`
green + `npm run tsc && npm run lint`.

## Phase 3: 2단 백엔드 — 진단 디스패치와 판정 소비

대상: `server/worker/queue-store.js`, `server/worker/scheduler.js`,
`server/worker/pr-actions.js`, `server/worker/attach.js`,
`server/ws/connection.js`, `server/ws/worker-handlers.js`, 각 테스트

1. 큐 스토어: `recordCleanupDiagnosis(workspace, { bead_id, verdict,
   attempt_id, evidence, fix_bead_id, malformed })` —
   `cleanup_failed[bead_id]`에 `diagnosis: { verdict, attempt_id,
   consumed: false, evidence, fix_bead_id?, malformed? }`로 병합(기존
   레코드 없으면 no-op; 필드 화이트리스트 방식 유지 — 재시작 후에도
   UI가 분류·근거·fix bead·malformed 상태를 표시할 수 있는 durable
   표현) — 와 `markDiagnosisConsumed(workspace, bead_id)` 신설. 그리고
   `recordCleanupFailure`가 **기존 `diagnosis`를 보존**하도록 수정 —
   판정 소비로 재실행된 정리가 다시 실패해 레코드를 다시 쓸 때
   `consumed: true`가 유실되면 재시작 후 같은 판정이 재소비된다.
2. 스케줄러: `dispatchCleanupDiagnosis(workspace, bead_id)` —
   `dispatchExternalConflict` 선례를 따라 신규 attempt에
   `cleanup_diagnosis: true` 플래그, fresh session(resume 없음), bead
   워크트리에서 실행(부재 시 `worktree_missing` 거부), 가드:
   `cleanup_failed[bead_id]` 존재 · `bead_running` · in-flight 중복 거부.
   프롬프트는 실패 단계·사유·log_path·output_tail과 에이전트
   계약(분류만: flake/environment/regression, notes 근거 기록,
   `environment`는 원인 수리 bead **생성 제안까지만**, `regression`만
   fix bead **생성까지** — 스펙 계약 그대로, 테스트 약화·코드 수정
   금지)을 담고, 판정을 attempt별 고정 경로의 JSON 파일
   (`{ verdict, evidence, refs? }`)로 쓰게 한다.
3. 판정 소비: `onSessionDone`에 `cleanup_diagnosis` 분기 신설 — 판정
   파일을 읽어 검증(3개 verdict enum 외·파싱 불가·부재 = malformed →
   fail-closed: `malformed`를 durable 기록하고 배너 표시만, 자동 실행
   없음) 후 `recordCleanupDiagnosis`로 durable 병합. `verdict ∈ {flake,
   environment}` && `consumed === false`면 `markDiagnosisConsumed`를
   먼저 쓰고 **durable 기록 성공을 확인한 뒤에만** 정리 1회 재실행.
   재실행은 pr-actions가 노출하는 `retryCleanup(bead_id)` 진입점(기존
   [머지] cleanup-retry 경로 재사용)을 호출하되, **배선은 attach.js가
   소유** — scheduler는 prActions보다 먼저 생성되므로 disposition
   선례처럼 late-bound callback을 주입해 `onSessionDone`과
   `disposeDeadAttemptSettlement`(재시작 경로)가 동일한 진입점을
   호출하게 한다. `regression`은 재실행 없음.
4. ws: `worker-cleanup-diagnose` 메시지 타입 신설(`connection.js` switch
   + `worker-handlers.js` 핸들러, `worker-attempt-resume` CAS·fanout
   관례).
5. Test scope 시임 6·7 (RED→GREEN): 가드 3종 거부 · flake→1회 재실행 ·
   regression→재실행 없음 · malformed→fail-closed(durable 기록) · 재실행
   verify 다시 red면 `cleanup_failed` 유지(+기존 `diagnosis` 보존) +
   deploy(detached launch) 미호출 · 스토어 재로드(재시작) 후 `flake`·
   `environment` 각각 같은 판정 재소비 없음 · diagnosis 병합 레코드의
   snapshot 왕복(직렬화→로드) 보존.

검증: `npx vitest run server/worker/queue-store.test.js
server/worker/scheduler.test.js server/worker/pr-actions.test.js
server/worker/attach.test.js server/ws` green + `npm run tsc`.

## Phase 4: 2단 UI — 배너·보드 카드 버튼

대상: `app/views/worker/running-grid.js`, `app/views/worker/index.js`,
`app/views/board/index.js`, `app/views/board/card.js`, `app/main.js`,
각 뷰 테스트, 번들

1. 정리 실패 배너에 [AI 정리] 버튼(`data-bead-id`, [↻ 이어하기] 선례:
   디스패치 in-flight disabled) + 진단 결과 표시 — durable
   `diagnosis` 레코드(분류·evidence 요약·regression 시 fix bead id·
   malformed 상태)에서 읽으므로 재시작 후에도 렌더된다. 클릭 →
   `transport('worker-cleanup-diagnose', { bead_id, expected_revision })`.
2. 보드 카드: `app/main.js`에서 board_view에 `worker_queue_store`를
   전달(디테일 패널 선례 :1338)하고 bead id로 조인해, 정리 실패 상태인
   카드에 실패 배지 chip + [AI 정리] 버튼을 렌더. 계약 키 부재·워커
   미가동이면 미렌더(fail-quiet). 칩은 기존 `ctl-chip` 계열·
   `isChipEnabled` 정책 게이트 준수.
3. Test scope 시임 4·5 (RED→GREEN): 배너 문안+버튼 렌더·disabled /
   카드 배지+버튼 렌더·부재 시 미렌더 (`card.test.js`의
   `mountCard`/`makeCtx` 관례).
4. `npm run build`로 `app/main.bundle.js`(+map) 갱신 포함.

검증: `npx vitest run` 전체 green + `npm run tsc && npm run lint &&
npm run prettier:write && npm run build`.

## Test scope

RED→GREEN 시임과 Phase 매핑 (스펙 `## Test scope` 1–7 → Phase):

- 시임 1(재시도 래퍼) → Phase 1 · `verify-cmd.test.js`
- 시임 2(postMergeVerify)·3(gateNow cached red·merge_gate notes) →
  Phase 2 · `pr-actions.test.js`
- 시임 6(디스패치 가드·판정 소비)·7(안전 invariant: 재실행 red →
  deploy 미호출·재소비 없음) → Phase 3 · `queue-store.test.js`,
  `scheduler.test.js`, `pr-actions.test.js`
- 시임 4(배너)·5(보드 카드) → Phase 4 · 뷰 테스트

제외: poller 레인 재시도 테스트(비목표), verify 직렬화(유닛 D),
timeout 재시도(비목표). 구현을 고쳐 테스트를 통과시키는 방향 전환 금지
(AGENTS.md 단위 테스트 표준).

## 비목표 (스펙과 동일)

poller 배지 레인 재시도 · timeout/spawn/config/worktree 사유 재시도 ·
재시도 설정화 · 클릭 없는 자동 디스패치 · verify 동시 실행 직렬화(유닛
D, deferred).
