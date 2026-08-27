---
scope:
  - server/worker/merge-candidates.js
  - server/worker/external-pr.js
  - server/worker/attach.js
  - server/worker/bd-metadata.js
  - server/ws/worker-handlers.js
  - app/views/worker/index.js
---

# PR 대기 레인 external PR 행 정합 설계 (UI-17mj)

## 1. 배경과 관측

2026-08-27 UI-s582(세션이 직접 낸 external PR #215)의 충돌 해소 과정에서 네 가지
표시 불일치가 관측됐다.

1. 충돌 해소 세션이 뜨는 순간 PR 대기 레인에서 행이 통째로 사라졌다. Worker가
   만든 durable 행은 같은 상황에서 `충돌 해소 중 · 완료 후 우선 머지` 뱃지를 단
   채 남는다.
2. 해소 세션이 머지 커밋을 push한 뒤 `resolver-self:` 영수증을 쓰기 전 약 2분간
   `최종 변경 리뷰 필요`가 떠 "해소 중인데 리뷰하라"로 읽혔다.
3. `영수증 확인 필요` 뱃지는 사유(`unit_plan_mismatch`)를 툴팁에만 실어 카드만
   보면 무엇을 고칠지 알 수 없었다.
4. external 행은 Worker attempt가 없어 `receipt_check`를 받지 않다가 해소
   attempt가 끝난 뒤 처음 검사됐고, 그 뒤 메타데이터를 고쳐도 attempt
   기록(`ok:false`)이 남아 뱃지가 유지됐다.

원인:

- 1: `server/worker/attach.js`의 external 스캔이
  `scheduler.externalProtectedBeadIds`(터미널이 아닌 attempt를 가진 bead ∪
  `cleanup_pending`)를 제외한다(UI-b8n8 보호장치). 해소 attempt는 터미널이
  아니므로 registry에서 빠지고, `merge-candidates.js overlaidPrWait`는 durable
  `pr_wait`와 registry만 행 근거로 삼아 행이 없어진다.
- 2: 행이 없으니 `app/views/worker/index.js`의 `conflict_sessions` 매칭도
  일어나지 못했다. 행이 있으면 `conflict_badge` 분기가 리뷰 뱃지보다 앞서지만,
  그 우선순위를 고정하는 테스트가 없다.
- 3: `index.js` `영수증 확인 필요` 라벨이 고정 문자열이다.
- 4: `receipt_check`는 `scheduler.recordReceiptCheck`가 attempt 완료 시에만
  기록하고, `ws/worker-handlers.js receiptWarningFor`는 그 attempt 기록만 읽는다.

## 2. 결정

### 2.1 external 행의 세 번째 근거: merge_queue (원인 1)

external 행을 만드는 곳은 두 군데이며 **둘 다** 같은 세 번째 근거와 중복 제거
규칙을 받는다:

- `server/ws/worker-handlers.js withExternalPrWait(workspace_key, queue)` —
  `decorateQueue`가 스냅샷의 `pr_wait`를 만들 때 쓰는 실제 화면 경로.
- `server/worker/merge-candidates.js overlaidPrWait(workspace_key, queue)` —
  bulk 큐 후보 판정용 사본.

행 근거는 세 단계다:

1. durable `queue.pr_wait` (기존, `external: entry.external === true`).
2. registry `externalPrs.list()` (기존, durable 집합에 있는 bead는 건너뜀).
3. **`queue.merge_queue` 항목** — bead가 1·2에 없고 durable 집합(`queue`·`done`
   레인 ∪ `pr_wait`)에도 없으면 `{ bead_id, external: true }`를 방출한다.

`withExternalPrWait`에서는 3의 행도 registry 행과 같은 모양(`added_at`은 큐
항목의 `authority.granted_at`, 없으면 null; `external: true`; `wt_present`는
동일한 `workerWorktreeExists` 프로브)으로 만든다. registry가 비어 있어도 3을
평가하므로, 현재의 `rows.length === 0` 조기 반환은 registry·큐 근거가 **모두**
비었을 때로 바뀐다.

근거: 충돌 해소 세션은 큐 authority에서만 dispatch되므로(`merge-queue.js`
`action: 'conflict_resolution'`) 해소 중인 external bead는 항상 큐 항목을 가진다.
큐 항목은 해소 완료·머지·취소 시 정리되고, 그 다음 스캔에서 registry가 행을
다시 채우므로 공백이 없다. `externalProtectedBeadIds`와 스캔 제외는 **변경하지
않는다** — UI-b8n8이 막은 "Worker가 돌리는 bead를 registry가 재채택해
자동머지·워크트리 삭제가 겹치는 사고"는 그대로 막힌다.

`queue`/`done` 레인에 이미 있는 bead는 큐 항목이 있어도 행을 만들지
않는다(정리 지연 중 durable 레인이 우선).

### 2.2 registry 행의 receipt_check 선관측 (원인 4)

`external-pr.js` `ExternalPrRow`에 `receipt_check: ReceiptCheckResult|null`을
추가한다.

- `server/worker/bd-metadata.js scanRows()`가 이미 읽는 `row.metadata`에서
  `receipt-check.js RECEIPT_METADATA_KEYS` 전체(`exec_receipt`, `impl_dispatch`,
  `route`, `planned_execution`, `unit_plan`, `impl_entry`, `plan_approval`,
  `workflow_mode_source`, `verify_receipt`)를 골라 `pr_rows` 항목에 `metadata`로
  함께 넘긴다 — `checkReceipts`의 `main:*` 판정이 `impl_dispatch`·`route`·
  `planned_execution`을 읽으므로 일부만 넘기면 정상 `main:*` 영수증을
  `main_receipt_unbacked`로 오판한다.
- 스캔(`attach.js`)은 registry에 넣을 각 행에 대해 캐시 키 `receipt_key` =
  그 9개 키의 값을 키 순서대로 이은 JSON 문자열(부재는 null)을 계산한다. 기존
  행의 `receipt_key`와 같으면 이전 `receipt_check`를 그대로 넘기고, 다르거나 기존
  행이 없으면
  `checkReceipts({ metadata, baseline: null, lineage: null, defaults: receiptDefaultsFrom(loadExecutionDefaults()), head: null })`를
  실행한다. 입력 형태는 `scheduler.recordReceiptCheck`와 같다(`head: null`이라 git
  프로브 없음, 스캔이 이미 든 메타데이터라 bd 추가 호출 없음). backing 필드
  하나만 고쳐도 키가 바뀌므로 재검사된다.
- `checkReceipts`가 throw하면 `receiptProbeError('check_threw')`를 기록하고
  로그만 남긴다. 스캔 자체는 실패하지 않는다.
- `replace()`는 `added_at`과 같은 규칙으로 `receipt_check`를 보존한다: 호출자가
  넘긴 값이 `undefined`가 아니면 그 값, `undefined`면 기존 행의 값(신규 행이면
  null). 캐시 키(`receipt_key`)도 행에 저장해 다음 스캔이 비교한다.
- 이 관측은 **표시 전용**이다. 머지 게이트는 클릭 경로의 라이브
  재검사(`pr-actions.js`)를 그대로 쓰고, 이 값을 읽지 않는다.

### 2.3 관측 투영의 receipt_check 소스 선택 (원인 4)

`ws/worker-handlers.js`의 `pr_observations` 투영에서 행별 `receipt_check`는:

- **external 행**(`entry.external === true`): registry 행의 `receipt_check`(없으면
  null)를 `summarizeReceiptCheck`로 요약한 값.
- **durable 행**: 기존 `receiptWarningFor(queue, bead_id)` (implementation attempt
  기록).

2.1로 큐 근거만 있는 행(registry에 없음)은 external이지만 registry 값이
없으므로 null → 뱃지 없음(fail-quiet). 해소가 끝나 registry가 다시 채우면 새
스캔 관측이 실린다. 이렇게 메타데이터를 고친 뒤에는 stale attempt 기록이 아니라
현재 관측이 뱃지를 결정한다.

### 2.4 뱃지 우선순위와 라벨 (원인 2·3)

`app/views/worker/index.js` PR 대기 행 뱃지:

- `conflict_badge`(해소 중 · 일시정지 · 계속 중 · 완료·재검증 대기)는 `최종 변경
  리뷰 필요`·`영수증 확인 필요`·`충돌 해결 필요`보다 앞선다. 현재 분기 순서가
  이미 그렇지만, 해소 세션 `running`/`paused` 각각에 대해 리뷰 영수증
  사유(`review_receipt_missing`/`stale`)와 receipt_check 위반이 동시에 있어도
  해소 뱃지가 그려지는지 테스트로 고정한다.
- `영수증 확인 필요` 라벨을 `영수증 확인 필요 · <첫 위반 코드>`로 바꾼다. 코드
  순서는 `receiptWarningCodes()` 반환 순서(첫 항목). 툴팁은 기존대로 전체 코드
  목록.

## 3. 데이터 흐름 요약

```
bd scan (30s) ─► attach.js: protected 제외 → 행마다 캐시 키 비교 → checkReceipts
              ─► externalPrs.replace(rows{receipt_key, receipt_check})
ws snapshot   ─► withExternalPrWait (bulk 후보는 overlaidPrWait):
                 pr_wait → registry → merge_queue ─► pr_wait rows
              ─► 관측 투영: external ? registry.receipt_check : attempt 기록
client        ─► prWaitRow: conflict_badge > 리뷰/영수증/충돌 뱃지
              ─► `영수증 확인 필요 · <code>`
```

## 4. 오류 처리

- registry 관측 실패·throw → `receipt_check`에 probe_error 기록, 뱃지는
  `receiptWarningCodes`가 내는 코드 규칙을 그대로 따른다(현행 유지).
- `merge_queue`가 배열이 아니거나 항목에 문자열 `bead_id`가 없으면 그 근거는
  비어 있는 것으로 본다.
- 스냅샷에 `external` 표식이 없는 구버전 행은 durable로 취급한다(현행
  `e.external === true` 규칙).
- `scanBeads()`가 `metadata`를 넘기지 않는 구버전 경로에서는 `receipt_check`를
  계산하지 않고 null로 둔다.

## 5. 테스트

- `server/ws/worker-handlers*.test.js`(`withExternalPrWait`): registry가 비어
  있어도 큐 항목만 있는 bead가 external 행(`external: true`, `wt_present` 프로브)
  으로 스냅샷 `pr_wait`에 유지; `queue`/`done`/`pr_wait`에 있으면 방출 안 함;
  registry와 같은 bead면 중복 없음; 큐·registry 모두 비면 queue 객체 그대로.
- `server/worker/merge-candidates.test.js`: `overlaidPrWait`에 같은 세 근거·중복
  제거; `merge_queue`가 배열이 아니면 무시.
- `server/worker/bd-metadata.test.js`: `scanRows`가 `RECEIPT_METADATA_KEYS` 전체를
  `metadata`로 투영(부재 키는 생략).
- `server/worker/external-pr.test.js`: `replace()`가 `receipt_check`·`receipt_key`를
  보존/갱신.
- `server/worker/attach*.test.js`(스캔): 키 동일 시 `checkReceipts` 미호출, 키
  변경 시(backing 필드 `impl_dispatch` 하나만 바뀌어도) 호출, throw 시
  probe_error 기록, `metadata` 부재 시 null; `route=quick_fix` + 정상
  `main:quick_fix_default` 영수증이 `ok:true`로 관측됨(투영 누락 회귀).
- `server/ws/worker-handlers*.test.js`: external 행은 registry 관측, durable 행은
  attempt 기록.
- `app/views/worker/index.test.js`: 해소 세션 `running`/`paused` + 리뷰 영수증
  사유/receipt_check 위반 동시 → 해소 뱃지; `영수증 확인 필요 · unit_plan_mismatch`
  라벨.
- 프론트 변경이므로 `npm run build` 산출물(`app/main.bundle.js`, `.map`) 포함.

### 5.1 완료 조건

- 소스·테스트·`app/main.bundle.js`·`app/main.bundle.js.map`을 **한 PR**에 담아
  전달한다(`resolved` + `pr_url`).
- 머지는 완료가 아니다. 머지 후 `repo-ops/config.toml`이 선언한 `[deploy]`
  operation이 terminal success에 도달하고, 실행 SHA(`/healthz` `source_sha`가
  머지 SHA)·프로세스 경로(`.worktrees/.repo-ops-deploy`)·리스닝 포트(tailnet
  주소:3000)·HTTP 응답 확인까지 통과해야 완료다. Worker가 추적하는 PR 머지이므로
  배포·정리·close는 Worker가 소유하고, 세션은 그 증거를 읽어 확인한다.
- 배포 후 화면 확인(해소 세션 중 행 유지, 뱃지 순서)은 운영자 인계 항목이며
  완료 보고서 잔여 줄로 남긴다.

## 6. 구현 unit 후보

- `server-overlay`: `server/worker/merge-candidates.js`,
  `server/worker/external-pr.js`, `server/worker/attach.js`,
  `server/worker/bd-metadata.js`
- `server-projection`: `server/ws/worker-handlers.js` (`withExternalPrWait`와
  관측 투영)
- `client-badge`: `app/views/worker/index.js`

## 7. 범위 밖

- `externalProtectedBeadIds`·스캔 제외 규칙(UI-b8n8) 변경.
- 머지 게이트의 receipt 판정 경로.
- `session_ref` host 라벨 안정화(UI-82jx·dotfiles-vw48 보고서의 관찰 항목).
