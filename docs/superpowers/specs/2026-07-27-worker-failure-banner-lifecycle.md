# 워커 실패 배너 생명주기: supersede + dismiss (UI-dcw7)

## 문제 (실측)

배너 조건은 `app/views/worker/index.js`의 `buildModel()`이 attempts 기록
전체에서 `failed|orphaned` 상태의 최신 1건을 골라 그리는 UI 투영이다
(worker-phase1 §1의 상태 기반 조건). 그런데 attempts 기록은 append-only로
삭제 경로가 없어, 실패 기록이 한 번 생기면 배너가 영구히 뜬다 — 후속
attempt 성공도, ↻ 이어하기도, 머지도 배너를 끄지 못한다. 배너 소멸 조건
자체가 정의된 적이 없다.

실측(2026-07-27, dotfiles 워크스페이스 `queue.json`):

- attempt `dotfiles-nwr8-1785112180704-2` — `failed`/`loud_fail_blocker`
  (exit 143, 머지 가드 오탐 UI-zcrq). 이후 10:48 새 attempt가 성공해
  `pr_wait`에 진입하고 `auto_advance`도 재활성됐지만 배너("자동 진행을
  껐습니다") 지속.
- attempt `dotfiles-rdwr-1784817843516-1` — 7/23
  `verify_failed:bd_not_resolved`. 후속 attempt가 없어 역시 영구 잔존
  (nwr8 기록만 지워도 이 건이 이어서 배너로 뜬다).

## 의미론

배너 = "**미처리 실패**가 있다". `failed|orphaned` attempt는 다음 중 하나면
처리된 것으로 간주하고 배너 대상에서 제외한다:

1. **supersede** — 같은 bead에 그 attempt보다 나중에 생성된 attempt가 존재
   (상태·성공 여부 무관 — ↻ child든 새 디스패치든). "나중"은 `started_at`
   비교가 아니라 **attempts 맵 삽입 순서**로 판정한다: 맵은 append-only라
   순서가 곧 시간이고, `started_at:null` 레거시 기록도 안전하다.
2. **dismissed** — attempt에 `dismissed_at` 스탬프가 있다.

배너는 미처리 실패 중 최신 1건(단일 배너 유지). ✕로 닫은 뒤 남은 미처리
실패가 있으면 그 다음 건이 드러난다. ↻ 이어하기로 child attempt가 생기면
조상 실패는 그 즉시 supersede되어 배너가 내려간다(현재는 ↻ 후에도 잔존).

## 변경

### UI 투영 (`app/views/worker/index.js`, `app/views/worker/running-grid.js`)

- `buildModel()`의 `latest_failed` 선정에서 supersede된 것과 `dismissed_at`
  있는 것을 제외한다. bead별 마지막 attempt 여부는 순회 중 맵 삽입 순서
  기준으로 계산한다.
- 배너에 ✕(닫기) 버튼을 추가하고 `worker-attempt-dismiss`
  `{ attempt_id, expected_revision }`를 보낸다. 대상 attempt_id는 기존
  `failure.resume_attempt_id`와 동일 건이다. ↻ 버튼과 비활성 사유 표시는
  무변경.

### 서버 (`server/worker/queue-store.js`, `server/ws/worker-handlers.js`, `app/protocol.{js,md}`)

- `makeAttempt`에 `dismissed_at: fields.dismissed_at ?? null` 필드를 추가해
  라운드트립에 보존한다.
- 새 store op `dismissAttempt(workspace, { attempt_id, expected_revision })`:
  대상 status가 `failed|orphaned`일 때만 `dismissed_at = now()`를 스탬프.
  이미 dismissed면 no-op 성공, 그 외 status는 사유와 함께 거부. 사용자 개시
  편집이므로 CAS 경로(`applyMutation`)를 쓴다 — scheduler-owned 무CAS
  경로(`applyUnconditional`)가 아니다.
- ws 메시지 `worker-attempt-dismiss` 핸들러를 기존 액션 패턴(revision 검사,
  적용 후 스냅샷 push)으로 추가하고 `protocol.js`/`protocol.md` 어휘에
  등재한다.
- 기록 삭제/prune은 하지 않는다 — resume 계보(`resumed_from`)와 진단 이력을
  보존한다.

### 잔존 데이터

마이그레이션 없음: nwr8 건은 후속 attempt로 자동 supersede, rdwr 건은 ✕
1회로 처리된다.

## 비목표

- bead별 다중 배너 동시 표시(단일 최신 배너 유지).
- failed attempt 기록의 prune/보존기간 도입.
- dismissed attempt의 ↻ 재노출 — dismiss는 "이 실패는 처리 완료" 선언이며,
  재작업은 일반 재배치 경로로 한다.
- `cleanup_failed` 배너(worker-phase2 §6)의 생명주기 — 별개 표면, 무변경.

## 수용 기준

1. UI 투영: 같은 bead에 나중 attempt가 있는 failed는 그 후속의 상태와
   무관하게 배너에 뜨지 않는다. `dismissed_at` 있는 `failed|orphaned`도
   뜨지 않는다. 미처리 실패가 둘이면 최신이 표시되고, 그것을 dismiss하면
   이전 건이 표시된다.
2. queue-store: `dismissAttempt`가 `dismissed_at` 스탬프와 revision 증가를
   한 번에 수행한다; `failed|orphaned` 외 status 거부; stale
   `expected_revision` 거부(CAS); 이미 dismissed는 no-op 성공;
   `makeAttempt` 라운드트립에 `dismissed_at`이 보존된다.
3. ws: `worker-attempt-dismiss` 라운드트립 — 성공 시 push된 스냅샷에
   `dismissed_at`이 반영되고, stale revision은 거부 응답을 받는다.
4. ↻ 이어하기 직후(child attempt 생성 시점) 조상 실패 배너가 내려간다.
5. `npm run all` green; `npm run build` 산출물
   (`app/main.bundle.js`{,`.map`}) 포함.
