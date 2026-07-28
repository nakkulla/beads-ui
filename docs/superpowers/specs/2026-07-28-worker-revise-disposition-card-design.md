# 워커 REVISE 파킹 처분 카드 (UI-hs11)

- 날짜: 2026-07-28
- Bead: UI-hs11 (beads-ui 구현) · dotfiles-v1hr (계약 개정 짝, cross_workspace)
- 계약 짝 스펙: dotfiles
  `docs/superpowers/specs/2026-07-28-workflow-revise-disposition-contract-design.md`

## 1. 배경·문제

UI-dlim의 워커 stale 재리뷰 레인이 REVISE로 파킹하면(`status=blocked` +
`blocked_reason=spec_review_stale:revise`, attempt failed, 워크스페이스
`auto_advance` OFF + 실패 배너) 그 뒤 처분 수단이 UI에 없다. 사람이 터미널에서
receipt·status를 수동으로 고쳐야 무인 흐름이 재개된다(실측: Cortex-gg3).
머지/폐기 클릭이라는 세션 밖 human 액션 패턴은 이미 있으므로, 같은 패턴으로
파킹 처분을 워커 탭에서 클릭으로 끝낼 수 있게 한다.

## 2. 목표·비목표

**목표**: `spec_review_stale:revise` 파킹 비드를 워커 탭에서 두 가지 클릭으로
처분한다 — ① finding 수용(파킹 세션 resume으로 스펙 수리) ② 델타 승인(서버
직접 영수증 갱신). 처분 성공 시 자동진행이 재개되어 일반 레인이 구현을 새
세션으로 재디스패치한다.

**비목표**:

- 수정 후 재리뷰 레그 — 없음(사용자 확정: 리뷰는 이미 REVISE 판정으로 1회
  수행됐고, 클릭이 진행 권한이다).
- 수리 세션의 구현 착수 — 금지. 구현은 일반 레인 재디스패치 몫.
- 처분의 권한 의미론 정의 — 계약(dotfiles `docs/contracts/workflow.{md,yaml}`)
  소유. beads-ui는 소비자로서 트리거·관측만 나른다.
- 다른 `blocked_reason` 값으로의 일반화(YAGNI) · Board 뷰 처분 액션(워커 탭
  한정).

## 3. 설계

### 3.1 파킹 관측 (queue snapshot decoration)

- 파킹 판정은 단일 함수 `observeReviseParked`로 두고 decoration과 두 핸들러가
  공유한다. 판정 전체: ① 비드가 `queue[]`에 잔류, ② 그 비드의 최신 leaf
  attempt가 failed + `spec_review_stale` 플래그, ③ bd 재관측이
  `status=blocked` + `blocked_reason=spec_review_stale:revise`. 세 조건을 모두
  충족하는 항목에 `revise_parked` 관측을 붙인다(`decorateQueue` 축,
  `prObservationsFor`와 같은 파생 방식). 관측은 advisory다 — 실제 처분 가부는
  클릭 시점에 같은 판정 전체를 재검증해 결정한다(스냅샷 뱃지 신뢰 금지).

### 3.2 WS 핸들러 (`server/ws/worker-handlers.js`)

- `worker-revise-fix` / `worker-revise-approve` 두 핸들러. 머지 클릭 패턴
  그대로: payload `{bead_id, expected_revision}` → CAS 가드(불일치 시
  conflict 응답, 부수효과 0) → 클릭 시점 `observeReviseParked` 전체
  재검증(불충족이면 refused, 부수효과 0) → 실행 → try/catch `reason:'error'`
  폴백 → 결과 무관 fanout.
- CAS는 check-only라 비동기 실행 중의 중복 클릭을 못 막는다. **per-Bead
  in-flight 가드**(머지의 `in_flight` 선례)를 두 핸들러가 공유해, 같은 비드에
  대한 fix/approve가 처분 완료 전에 겹치면 뒤 요청을 refused로 막는다.

### 3.3 finding 수용 (`worker-revise-fix`)

- 파킹 attempt의 `session_id`로 `--resume` 디스패치(새 attempt 레코드, 기존
  `resumed_from` 필드로 계보 연결). transcript 유실 시 폴백: 새 세션에 notes
  계보(원 receipt·delta SHA·findings)를 프롬프트로 실어 같은 절차.
- 처분 프롬프트에 명시: 이 디스패치는 beads-ui 처분 클릭(= explicit user
  approval)이 인가했다. notes에 기록된 REVISE findings를 스펙에 반영 →
  resolved **`target_base`** 체크아웃에서 커밋·퍼블리시(fetch, ff-only, push,
  `ahead == 0`; 워크트리 불필요) → `spec_review = skipped@<수정 커밋 40hex>` +
  notes 계보를 **동일 `bd update`**로 기록 → blocked를 떠나는 같은 쓰기에서
  `status=open` + `blocked_reason` 해제 → 종료. 재리뷰 디스패치 금지, 구현
  착수 금지.
- **전용 attempt 종류·완료 경로**: 처분 attempt는 disposition 종류로 durable
  기록하고, 기존 구현 attempt의 종료 검증(PR 존재 확인·`pr_wait` 전이)을
  **우회**한다 — 처분 세션은 PR을 만들지 않으므로 기존 경로로는 정상 수리도
  `no_pr` 실패가 된다. 전용 완료 경로: 세션 종료 → 서버가 readback으로 성공
  판정(영수증 갱신 + unblock + 스펙 커밋 upstream 발행 `ahead == 0`) →
  transient metadata(`workflow_mode`·exec stamp) 복원 → claim 해제 → attempt
  완료 마감 → `auto_advance` 재개 → 일반 tick이 fresh 영수증으로 admission을
  통과시켜 구현을 새 세션으로 디스패치. 실패 시 기존 실패 배너 경로.
- **공유 체크아웃 배타 lease**: fix 세션은 공유 `target_base` 체크아웃을
  편집하므로, per-repo exclusive lease를 디스패치 preflight부터
  퍼블리시·readback 판정까지 유지한다 — 서로 다른 비드의 동시 fix가 같은
  체크아웃을 겹쳐 편집하지 못하게 직렬화한다.

### 3.4 델타 승인 (`worker-revise-approve`)

- 세션 없이 서버가 bd 어댑터(`bd-metadata.js`)로 직접 수행: resolved
  `target_base`의 tip 40hex 산출 → **하나의 `bd update`**로
  `spec_review = skipped@<target_base tip>` set-metadata + 계보
  `--append-notes`(클릭 처분·원 receipt·승인 시점 base) + `status=open` +
  `blocked_reason` unset → readback → `auto_advance` 재개.

### 3.5 UI (`app/views/worker/`)

- 큐 레인의 `revise_parked` 항목: "REVISE 파킹" 뱃지 + 버튼
  `[finding 수용·수정]` `[승인하고 진행]`(`miniRow` 액션 클래스 추가, 머지/폐기
  버튼과 동일한 클릭 위임 + conflict 1회 재시도). findings 상세는 카드 클릭 →
  기존 이슈 상세(notes)로; 카드에는 짧은 요약 툴팁만.
- 수리 세션은 일반 running 타일로 표시(새 타일 종류 없음).

## 4. 수용 기준

1. 파킹 비드가 처분 카드(뱃지+버튼 2개)로 표시된다.
2. fix: resume 세션이 수리→영수증→unblock을 마치고, 이후 일반 레인이 구현을
   새 세션으로 재디스패치한다.
3. approve: 서버 직접 쓰기 + readback으로 완결되고 세션이 뜨지 않는다.
4. 파킹 상태가 아닌 비드에 대한 클릭은 refused이고 부수효과가 없다.
5. 처분 성공 시 `auto_advance`가 재개된다.
6. 기존 머지/폐기·admission·큐 동작에 회귀가 없다(테스트로 고정).
7. Pre-Handoff 번들(lint/tsc/test/prettier/build) green, 번들 커밋 포함.

## 5. 테스트

- `ws.worker-queue.test.js`(핸들러): 두 핸들러의 CAS conflict·비파킹 refuse·
  성공 경로·fanout, **동일 revision 동시 fix/approve 클릭 시 in-flight 가드로
  한쪽만 실행**.
- `scheduler.test.js`: resume 디스패치(`resumed_from`)·transcript 유실 폴백·
  disposition attempt의 전용 완료 경로(PR 검증 우회, `no_pr` 실패 없음)·
  transient metadata 복원·종료 후 readback 판정·`auto_advance` 재개·per-repo
  lease 직렬화(서로 다른 비드 동시 fix).
- `app/views/worker/index.test.js`: 뱃지·버튼 렌더, 버튼 클릭 메시지 발신.

## 6. 배달 순서 제약

계약(dotfiles-v1hr) 선행 또는 동일 시점 배달 — 소비자(beads-ui) 단독 선행
금지. 계약 없는 처분 클릭은 권한 근거 없이 영수증을 바꾸게 된다.
