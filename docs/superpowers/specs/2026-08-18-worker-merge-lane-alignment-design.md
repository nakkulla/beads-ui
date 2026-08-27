# Worker 머지 lane 정합: not_in_pr_wait 경쟁 수정과 카드 상태 표시 단순화

> **부분 은퇴 (UI-d7fy, 2026-08-28).** `### 4. 재리뷰 정책 완화`가 설계한
> head-review 완화 경로(`carry:` 승계, 해소 세션 self-review, 완화 결속 조건)와
> `## 확정된 결정` 표의 재리뷰 두 행, §3 카드 상태 표의 `head_review` 항목은
> head-review 큐 계층과 함께 제거됐다. 리뷰 판정은 머지 게이트의 `impl_review`
> ancestry 하나이고, 영수증 부재·비조상은 게이트 보류로 남아
> `[리뷰 후 머지]` 클릭이 유일한 출구다(그 버튼은 남았지만 자동 리뷰가 아니라
> 기록된 세션의 리뷰 lineage를 돌린다). not_in_pr_wait 경쟁 수정과 카드 배지
> 단순화 등 나머지 절은 그대로 유효하다. 제거 근거는
> `docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`
> 이다.

- Bead: UI-vkk8 (route: spec_backed)
- 날짜: 2026-08-18
- 상태: 사용자 설계 승인 완료 · spec gate REVISE 지적 5건 반영본

## 배경과 문제

Worker 머지 lane에서 세 가지 결함이 겹쳐 사용자가 처리할 수 없는 막다른
상태가 생긴다. 실사례는 UI-yqw9 PR #156이다: 충돌 해소 세션까지 정상 완료됐지만
`일괄 머지 실패: not_in_pr_wait`로 큐에서 빠졌고, 리뷰 영수증이 stale이 되어
[머지] 버튼도 비활성화된 채 방치됐다.

1. **external 행 not_in_pr_wait 경쟁 (서버 버그).** 세션이 전달한 PR(external
   행)의 소속은 poller가 bd를 스캔해 채우는 in-memory 레지스트리로 판정한다
   (`server/worker/external-pr.js`). 충돌 해소 세션이 도는 동안 그 bead는
   `externalProtectedBeadIds` fence(`server/worker/scheduler.js:1824`) 때문에
   스캔에서 제외되는데, 세션 종료 직후 머지 드라이버가 레지스트리 재스캔보다
   먼저 `probeMergeability`를 호출하면 `laneMembership`이 `not_in_pr_wait`를
   반환하고(`server/worker/pr-actions.js:380`), 드라이브 루프의 어떤
   continuation에도 해당하지 않아 `failAndDequeue`로 터미널 dequeue된다
   (`server/worker/merge-queue.js:1757`). 재시작 경로는 같은 문제를 `prepare()`
   일회 호출로 이미 막고 있으나(`merge-queue.js:1838`), 해소-완료-재개 경로에는
   보호가 없다.

2. **프런트 버튼 불일치.** 서버의 수동 머지 클릭 핸들러는 차단된 게이트
   (리뷰 stale/missing, base 뒤처짐)의 클릭을 의도적으로 받아들이고
   (`server/worker/attach.js:1846`), manual authority의 continuation으로 base
   자동 갱신(`merge-queue.js:1667`)과 자동 리뷰 재획득(`merge-queue.js:1694`)을
   수행한다. 그러나 프런트 `merge_enabled`(`app/views/worker/index.js:1046`)는
   큐에 없는 행에 대해 이 상태들을 클릭 불가로 막아, 설계된 회복 경로의 입구가
   없다.

3. **카드 배지 과다.** 한 카드에 출처(세션), 게이트 상태(리뷰 확인 필요),
   base 상태(최신), 실패 기록(일괄 머지 실패: not_in_pr_wait)이 동시에 쌓여
   사용자가 "지금 무엇이 문제이고 무엇을 해야 하는가"를 읽을 수 없다. 실패
   문구는 서버 내부 reason 코드를 그대로 노출한다.

추가로, 재리뷰 정책 자체에 대한 결정이 내려졌다: queue-owned 변이로 head가
움직인 경우의 재리뷰를 외부 리뷰어 dispatch 없이 처리한다(§4). 이는 dotfiles
소유 workflow 계약의 정정을 동반하며, 그 정정은 이 Bead의 enclosed foreign
unit으로 함께 수행한다.

## 확정된 결정

| 결정 | 선택 |
| --- | --- |
| 세션 출처 표시 | 상태 배지 줄에서 제거, 제목 옆 흐린 보조 마커로 유지 |
| 실패 문구 | 한국어 문장 매핑 + 원본 reason 코드는 툴팁, 미매핑 코드는 원문 표시 |
| 리뷰 필요 행 처리 | 클릭 한 번([리뷰 후 머지]) = 자동 리뷰→머지, 완전 자동화는 범위 밖 |
| 서버 경쟁 수정 | 드라이버 재시도-한 번 + 실패 시 슬롯 유지 |
| base 갱신 후 재리뷰 | 리뷰 생략 — lineage 증명으로 영수증 승계 (계약 정정 동반) |
| 충돌 해소 후 재리뷰 | 해소 세션의 exact-delta self-review로 대체 (계약 정정 동반) |
| 단위 구성 | 하나의 Bead — dotfiles 계약 정정은 enclosed foreign unit, 분리 Bead·proxy 없음 |
| 리뷰 영수증 missing | 현행 유지 — 외부 리뷰어 dispatch (첫 리뷰이므로 재리뷰 완화 대상 아님) |

## 설계

### 1. 서버 — not_in_pr_wait 경쟁 수정

`server/worker/merge-queue.js`의 드라이브 루프 거부 처리 사다리
(1658–1757행 부근, `base_behind`·`review_receipt_*` continuation과 같은 블록)에서:

**판별자는 거부 사유 자체다.** `MergeQueueEntry`(`queue-store.js:447`)에는
`external` 필드가 없다 — `external`은 `enqueueMember`(`queue-store.js:2800`)의
admission 술어로만 쓰이고 entry에 저장되지 않으므로, entry 플래그로 분기할 수
없다. 대신 거부 사유 `not_in_pr_wait`가 이미 판별자다: `pr_wait`에 실제로 있는
worker 행은 이 사유를 낼 수 없기 때문이다(`pr-actions.js:377`). 따라서 durable
스키마를 새로 만들지 않는다.

- `refused` + `not_in_pr_wait`가 돌아오면, 이미 wiring된
  `deps.prepare()`(external 레지스트리 재스캔, `attach.js:1164`)를 호출한 뒤
  **정확히 한 번** 재시도한다. `base_update_attempted`와 같은 지역 플래그
  관용구(`registry_refresh_attempted`)로 한 항목당 한 번만 허용하며, 이 플래그는
  항목 처리 진입 시 초기화된다. 재시도가 다시 `not_in_pr_wait`를 내도 세 번째
  시도는 없다 — 종료성이 플래그로 보장되고 드라이브 루프는 순환하지 않는다.
- 재시도 후에도 같은 이유로 거부되면 `failAndDequeue` 대신 `fail`(슬롯 유지 +
  실패 기록) + `halted` 종료로 전환한다. head-review 터미널 실패와 같은
  의미론(`merge-queue.js:1721`)이다: 슬롯을 지키되 이 드레인은 끝내므로, 실패
  항목을 같은 head로 다시 몰아가는 tight loop이 생기지 않는다. 다음 poller
  스캔·재클릭이 이어받는다.
- 슬롯 유지가 부적절한 경우(폐기되어 `pr_wait`에서 빠진 행 등)도 같은 경로로
  수렴한다: 재시도가 실패하면 실패 기록과 함께 큐에 남고, 사용자는 [취소]로
  뺄 수 있으며 closed-queue sweep이 종료 상태를 별도로 정리한다. 터미널
  dequeue만 하지 않을 뿐, 회복 불가능한 행이 무한히 재시도되지는 않는다.
- 재시작 보호용 `prepared` 일회 플래그는 변경하지 않는다.

### 2. 프런트 — [머지] 버튼 활성 확장

`app/views/worker/index.js` 행 뷰모델:

- `merge_enabled`(1046행 부근)에 게이트 reason 기준 허용을 추가한다:
  `review_receipt_missing`, `review_receipt_stale`, `base_behind`.
- `merge_label`/`merge_title`에 분기를 추가한다. 기존 `충돌 해소 후 머지`
  패턴을 따른다:
  - 리뷰 missing/stale → `리뷰 후 머지` — "자동 리뷰 세션 후 승인되면
    머지합니다"
  - `base_behind` → `base 갱신 후 머지` — "base를 자동 갱신한 뒤 머지합니다"
    툴팁은 재리뷰 여부를 약속하지 않는다. 게이트가 mergeability를 리뷰 영수증보다
    먼저 판정하므로(`merge-gate.js:242` vs `:252`), `base_behind` 배지가 붙은 행의
    영수증 상태는 화면에서 알 수 없다. 갱신 후 §4 결속 조건을 만족하면 승계로
    바로 머지되고, 만족하지 못하면 외부 리뷰가 뒤따른다.
- `review_receipt_invalid`, `mergeability_unknown`, 관측 오류는 계속 비활성.
  invalid는 서버 continuation이 없어 큐에 넣으면 터미널 실패한다
  (`merge-queue.js:1696`은 stale/missing만 허용).
- 일괄 머지·자동 머지 lane 자격(`server/worker/merge-candidates.js:218`)은
  현행 유지한다. automatic authority에는 continuation 권한이 없으므로
  (`merge-queue.js:295`) 차단 행을 등록하면 드라이버가 끌고 갈 수 없다.

### 3. 프런트 — 카드 상태 표시 단순화

행마다 핵심 상태 배지 **하나**만 표시한다. 이 배지는 하나의 우선순위 resolver가
결정하며, **현행 배지 입력 전부**가 그 resolver에 빠짐없이 매핑되어야 한다.
현행 입력(`index.js:858–925`)과 배정은 다음과 같다.

| 등급 | 입력 | 배지 |
| --- | --- | --- |
| 1 사용자 선택 대기 | `continuation_required` | 이어하기 선택 필요 |
| 2 진행 중 | `merge_step` / `conflict_badge` / `head_review`(pending·reviewing·revising) / `recovery`(활성) | 머지 중 · 충돌 해소 중 · 충돌 해소 일시정지 · 리뷰 진행 중 · 자동복구 중 |
| 3 조치 필요(차단) | `cleanup_failed` / `base_exception` / gate `충돌` / `base_behind` / 리뷰 missing·stale / 리뷰 invalid / `head_review`(failed) | 정리 멈춤 · 다른 base 대상 · 충돌 해결 필요 · base 갱신 필요 · 최종 변경 리뷰 필요 · 리뷰 기록 오류 · 리뷰 실패 |
| 4 실패 기록 | `queue_failure` / `auto_skip` | 머지 실패 — `<한국어 사유>` · 자동 제외 — `<한국어 사유>` |
| 5 대기 | `머지 대기 #N`(`queued && !queue_active`) | 머지 대기 #N |
| 6 머지 가능 | gate `enabled` | 머지 가능 |
| 7 확인 중 | 관측 대기·오류, `activity` 치환 | 확인 중 · 상태 확인 실패 |
| 종료 | gate `merged` / `closed_unmerged` | 머지됨 · 닫힘 |

등급 배정의 근거:

- `continuation_required`가 최상위인 이유는 그 행이 사용자 선택 없이는 어떤
  경로로도 진행하지 않기 때문이다. 진행 중 표시가 이를 가리면 행이 멈춘 이유가
  사라진다.
- 진행 중이 실패 기록보다 위인 이유는 `queue_failure`가 비-durable(직전 실행
  기록)이기 때문이다 — 재클릭으로 재개된 행에 지난 실패를 계속 보여주지 않는다.
  반대로 `cleanup_failed`와 `auto_skip`은 durable하므로 각각 3·4등급에서
  독립적으로 남는다.
- 조치 필요가 실패 기록보다 위인 이유는 "무엇을 해야 하는가"가 "무엇이
  실패했는가"보다 행동 가능하기 때문이다. 두 사실이 함께 있으면 배지는 조치를
  말하고, 실패 사유는 툴팁에 남는다.
- `base_exception`은 gate의 base 상태와 다른 축(어디로 머지되는가)이므로 3등급
  안에서 독립 항목으로 유지한다. 게이트가 녹색이어도 이 행은 조치가 필요하다.

버튼과의 관계: 3등급 각 상태의 기본 버튼은 §2가 정한다(충돌 → [충돌 해소 후
머지], base 뒤처짐 → [base 갱신 후 머지], 리뷰 missing/stale → [리뷰 후 머지],
리뷰 invalid·리뷰 실패·정리 멈춤 → 각각 현행 버튼 규칙 유지). 배지와 버튼이
서로 다른 상태를 가리키면 안 되며, 이 일치는 뷰모델 테스트가 검증한다.

세부 규칙:

- `최신`(base_badge)은 표시하지 않는다 — 머지 가능에 내포된 긍정 정보다.
  gate_badge와 중복되는 base_badge 병기(현행 `index.js:891`)도 제거한다.
- `리뷰 확인 필요`는 reason으로 분리한다: missing/stale은 클릭 가능한
  `최종 변경 리뷰 필요`, invalid는 차단인 `리뷰 기록 오류`.
- `세션`은 배지 줄에서 빼고 제목 옆 흐린(muted) 보조 마커로 렌더링한다.
  external 행의 동작 차이([폐기] 불가, 충돌 해소에 워크트리 필요)의 근거
  표시로 유지한다.
- 실패 문구는 `mergeFailureText`(`index.js:532`)에 주요 reason의 한국어 매핑을
  추가하고, 원본 코드는 툴팁(title)으로 보존한다. 매핑에 없는 코드는 원문
  그대로 표시한다(fail-quiet).
- 대체된 세부 상태(gate/base/head-review의 나머지)는 카드 툴팁과 타임라인에서
  계속 확인할 수 있어야 한다.

### 4. 재리뷰 정책 완화 (dotfiles 계약 정정 동반)

> **은퇴 (UI-d7fy).** 이 절은 실행되지 않는다 — 근거는
> `docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`
> 이다.

현행 workflow 계약(dotfiles `docs/contracts/workflow.{md,yaml}`)은 manual merge
continuation에서 외부 리뷰어 dispatch만 허용하고 `self`/`skip` 선택을 터미널
실패로 규정한다. beads-ui는 그 계약의 소비자이므로(AGENTS.md canonical 소유권),
계약과 소비 코드를 **함께** 바꿔야 한다.

**단위 구성**: 이 작업은 두 저장소 unit을 갖는다.

- 호스트 unit: beads-ui (이 Bead의 PR).
- **enclosed foreign unit: dotfiles** — 계약 정정을 dotfiles에 직접 랜딩하고,
  workflow `references/execution.md`가 요구하는 repo, base, 소유 경로, 검증,
  fetched parent, 랜딩 SHA, 소유 커밋을 완료 보고서에 기록한다. 별도 추적
  Bead나 proxy gate Bead를 만들지 않으며, 선행 unit이 §4를 `blocks`하지도
  않는다. 순서만 고정한다: dotfiles 계약 정정이 먼저 랜딩되고, 같은 Bead 안에서
  beads-ui 소비 코드가 뒤따른다.
- enclosed 직접 랜딩은 required no-PR residue이므로, spec gate 종료 시
  `worker-ineligible` 라벨을 `spec_review` 영수증과 같은 논리적 쓰기에서
  판정·기록한다.

dotfiles 계약 정정의 내용은 아래 완화 규칙을 계약 어휘로 표현하는 것이다:
manual merge continuation에서 queue-owned vouched 변이에 한해 외부 리뷰어
dispatch 없이 영수증 승계 또는 해소 세션 self-review를 허용한다.

beads-ui 소비(`server/worker/head-review.js`):

- **base 갱신만으로 stale** (vouched `mutation === 'base_update'`): 리뷰어를
  dispatch하지 않는다. 기존 lineage 증명(prior head ancestry + target base)으로
  queue-owned 머지 커밋임을 확인하고, 직전 승인 영수증을 새 head로 승계 기록한
  뒤 바로 머지한다. 세션이 열리지 않는다. 승계 영수증의 정확한 어휘(예:
  `carried:<actor>@<head>`)는 계약 정정에서 확정하고 이 spec은 요구사항만
  기록한다.
- **충돌 해소 push로 stale** (vouched `mutation === 'resolver:<attempt>'`):
  별도 외부 리뷰어 세션을 dispatch하지 않는다. 해소 세션 자신이 종료 전
  exact-delta self-review를 수행하고 verdict와 영수증을 기록한다. repair
  세션의 구조화된 self-review verdict 기계(`head-review.js:651` 부근)를 재사용
  패턴으로 삼는다. verdict가 APPROVE가 아니면 현행 실패 의미론(슬롯 유지,
  재클릭)으로 남는다.
- **영수증 missing** (한 번도 리뷰되지 않음): 현행 유지 — 외부 리뷰어를
  dispatch한다. 재리뷰 완화는 "이미 승인된 코드의 queue-owned 이동"에만
  적용된다.
- vouched mutation이 없는 head 이동(authority 발급 후 외부 push)은 현행대로
  fail-closed.

**완화의 결속 조건 (모두 만족해야 한다).** 승계·self-review 어느 쪽이든, 아래를
모두 만족하지 않으면 완화하지 않고 최종 head 전체를 외부 리뷰어에게 보낸다.

1. **출발점이 승인 상태였을 것** — authority 발급 시점의 head
   (`authority.requested_head_sha`)에 그 head에 결속된 유효한 승인 영수증이
   있었어야 한다. 발급 시점에 이미 stale·missing이었다면 승계할 승인이 없으므로
   완화 대상이 아니다. 이 조건이 "이미 stale인 head가 `base_behind`나 충돌로 먼저
   분류되어 완화 경로에 진입하는" 우회를 막는다.
2. **변이가 이 authority의 것일 것** — mutation attempt id가 이 authority에서
   발급된 것이어야 한다(`resolver:<attempt>` / `base_update`).
3. **결과 head가 정확히 일치할 것** — 변이 실행이 만든 결과 SHA를 기록하고,
   재-probe로 관측한 head가 그 SHA와 **정확히 같아야** 한다. 다르면 변이 완료와
   재-probe 사이에 제3의 push가 들어온 것이므로, 미검토 delta가 승계에 편승할 수
   있다. 이 경우 완화하지 않고 관측된 최종 head 전체를 외부 리뷰한다.

승계 영수증은 이전 승인 head와 결과 head를 함께 기록해, 어떤 승인이 어디로
승계됐는지 감사 가능해야 한다. 정확한 어휘는 계약 정정에서 확정한다.

명시적 트레이드오프: base 갱신 승계는 "리뷰된 코드 + 새 base 결합"의 semantic
conflict를 검증하지 않는다. 이 저장소는 CI가 없으므로 그 위험을 수용한다는
사용자 결정이다.

### 5. 검증

- `server/worker/merge-queue.test.js`: external 항목 not_in_pr_wait 경쟁
  시나리오 — prepare 재시도 후 성공, 재시도 실패 시 슬롯 유지·재클릭 재개.
- Worker 뷰모델 테스트: reason별 버튼 활성/라벨, 단일 상태 배지 우선순위,
  세션 마커 분리, 실패 문구 매핑과 툴팁 보존.
- `server/worker/head-review.test.js`(§4, dotfiles 계약 랜딩 후): base_update 승계
  경로가 세션 없이 승인되는 것, resolver self-review verdict 결속, missing은
  여전히 외부 dispatch. 추가로 완화 결속 조건의 부정 경로 — 발급 시점 head가
  이미 stale이면 완화하지 않음, 결과 SHA와 관측 head가 다르면 최종 head 전체를
  외부 리뷰함.
- Pre-Handoff Validation: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` / `npm run build`(번들 포함).

**dotfiles enclosed foreign unit 검증 (랜딩 전 필수).** 계약 표면을 바꾸므로
beads-ui 테스트만으로는 불충분하다. dotfiles 랜딩 전에 그 저장소가 소유한
검증을 통과시킨다:

1. canonical `docs/contracts/workflow.md`와 `workflow.yaml`을 함께 수정한다.
2. dotfiles가 소유한 workflow 계약 checker(`check-workflow-contract.py` 등
   해당 저장소의 검사기)와 렌더/테스트를 실행해 통과를 확인한다.
3. generated v2 projection과 런타임 사본(설치된 스킬 매니페스트가 배포하는
   복사본)이 canonical과 정합하는지 확인한다 — AGENTS.md가 말하듯 machine
   consumer는 생성된 projection이다.
4. 계약 어휘를 실제로 읽는 active consumer(이 완화를 소비하는 스킬·러너)가
   새 어휘와 어긋나지 않는지 확인한다.

랜딩 후 그 SHA를 확인한 다음에야 beads-ui 소비 코드(§4)와 그 테스트를
실행한다. 완료 보고서에는 repo, base, 소유 경로, 검증 명령과 결과, fetched
parent, 랜딩 SHA, 소유 커밋을 기록한다.

**Post-Merge apply 순서.** 배포는 세션이 손으로 `bdui-shared restart`를 실행하는
것이 아니라, 핀된 base의 `repo-ops/config.toml` `[deploy]`가 가리키는
`repo-ops/script/deploy`를 저장소 작업 lane이 한 번 실행하는 것이 전부다. 그
스크립트가 순서와 단계별 확인을 이미 소유한다: 실행 전체 self-flock → 진입
HEAD가 `REPO_OPS_TARGET_SHA`와 일치 확인 → `npm ci` → `npm run build` →
`bdui-shared restart` → health probe → 종료 HEAD 일치 및 tracked-clean 확인.
각 단계는 실패 시 즉시 중단(`set -eu` + `fail`)되므로 중간 중단은 다음 실행이
같은 target SHA로 처음부터 재개할 수 있는 상태로 남는다. 이 spec은 그 순서를
복제하지 않고 인용하며, 실패 해결은 v2 사다리
(`script_retry → auto_repair_session → user_triggered_session`)를 따른다.
완료 선언은 그 operation이 terminal success에 도달하고 프로세스 경로·포트·HTTP
응답 검증까지 통과한 다음이다.

## 범위 밖

- 클릭 없는 완전 자동 리뷰 dispatch (automatic authority로의 continuation 권한
  확장) — 별도 계약 논의.
- `review_receipt_invalid`의 자동 복구 — 메타데이터 정정은 workflow 계약
  소유이므로 표시만 정확히 하고 계약 쪽 정정을 별도 제기.
- 일괄/자동 머지 lane 자격 확대.
