# worker-ineligible Worker runtime 집행 설계

- Bead: `UI-l02c`
- Route: `spec_backed`
- Workflow mode: `standard`
- Provider Bead: `dotfiles-gljf`
- Provider spec: dotfiles `docs/superpowers/specs/2026-08-10-worker-ineligible-eligibility-contract-design.md`

## 문제

beads-ui는 `worker-ineligible` label을 표시 데이터로만 취급한다. 따라서 해당
label이 있는 Bead도 Worker 후보와 Monitor 실행가능 레인에 나타나고, queue placement와
scheduler dispatch를 통과할 수 있다. `dotfiles-1qcu`가 실제로 `bd ready`와 shared
Monitor runnable snapshot에 포함된 것이 재현 사례다.

dotfiles canonical contract는 이 label을 interactive-only 실행 경계로 정의한다.
beads-ui는 deploy/no-PR disposition을 다시 계산하지 않고 label 자체를 fail-closed로
집행해야 한다.

## 목표

1. `worker-ineligible` Bead를 Worker 후보와 Monitor 실행가능 레인에서 완전히 제외한다.
2. direct WebSocket 요청을 포함한 새 queue placement를 서버에서 거부한다.
3. 이미 queue에 있는 Bead는 자동 제거하지 않고 순서를 보존하되 scheduler dispatch를
   차단하고 `⛔ worker_ineligible` admission reason을 표시한다.
4. first dispatch와 manual resume 모두 fresh Bead snapshot을 읽고 label을 재검사한다.
5. label이 제거되면 다음 authoritative read부터 정상 후보·placement·dispatch가 된다.
6. frontend filtering은 사용성 보조이며 서버 admission과 scheduler가 최종 권위다.

## 비목표

- dotfiles의 deploy coverage 또는 no-PR disposition 계산을 beads-ui에 복제하지 않는다.
- 새 durable queue lane, 새 metadata key, 새 label을 만들지 않는다.
- 기존 queue entry를 자동 제거하거나 순서를 재작성하지 않는다.
- Board·issue detail에서 label 또는 Bead 자체를 숨기지 않는다.
- `worker-ineligible` 이외 label에 일반적인 execution policy를 도입하지 않는다.
- PR merge, cleanup, deploy engine의 의미를 바꾸지 않는다.

## Canonical 입력

서버는 exact string `worker-ineligible`만 차단한다. label array는 string entry만
정규화하며 malformed/missing label container는 빈 배열로 취급한다. 이 tolerant parsing은
데이터 shape 호환을 위한 것이고, `worker-ineligible`을 관측한 뒤 fail-open하는 경로는
허용하지 않는다.

label 판정은 browser와 server가 함께 import할 수 있는 순수 ESM
`app/utils/worker-eligibility.js`가 소유한다. candidate, runnable cache, admission,
scheduler가 문자열을 각각 복제하지 않는다.

## Data flow

### 1. Worker 후보

Worker tab은 Ready+Blocked 목록을 합치기 전에 label predicate를 적용한다.
`worker-ineligible` row는 `candidate_issues`와 rendered candidate 모두에 들어가지 않는다.
따라서 drag, `대기로 ↴`, candidate reorder의 source가 될 수 없다. Board와 detail
subscription에는 그대로 남는다.

### 2. Monitor 실행가능

`server/worker/runnable-cache.js`의 qualification 단계가 label을 검사해 ineligible row를
cache item으로 만들지 않는다. frontend Monitor는 서버가 보낸 runnable만 그리므로 카드,
drag, `대기로 ↴`가 모두 사라진다.

runnable cache는 최대 30초 stale-while-revalidate일 수 있다. 따라서 이 필터만 안전
경계로 쓰지 않고 placement와 dispatch에서 fresh snapshot을 다시 검사한다.

### 3. Queue placement

`createLiveBd().snapshotBead()`는 `bd show --json`의 labels를 정규화해
`BeadSnapshot.labels`에 싣는다. `validateAdmission()`은 git/GitHub probe보다 먼저 label을
검사하고 `{ ok:false, reason:'worker_ineligible' }`를 반환한다.

`worker-queue-place`는 이 결과를 기존 admission refusal 경로로 처리한다.

- queue membership과 revision을 변경하지 않음
- `admission[bead_id].reason = worker_ineligible` 기록
- caller에 `applied:false`, `admission_reason:'worker_ineligible'` 반환
- fresh decorated snapshot fanout

attachment가 없는 workspace도 label 검사를 건너뛰어서는 안 된다. 실제 dispatch가 없는
test wiring과 production eligibility read를 분리해, production place path에는 항상
authoritative Bead read가 존재하도록 한다.

### 4. Existing queue와 scheduler

label이 queue placement 뒤 추가돼도 entry는 queue에 남는다. queue reorder는 실행이
아니므로 기존 CAS semantics를 유지한다. 자동 삭제나 별도 보류 lane은 만들지 않는다.

scheduler scan은 각 queue entry의 fresh snapshot에서 label을 확인한다. ineligible이면
기존 skip-next semantics로 다음 entry를 검사하고 현재 entry에는
`worker_ineligible` admission reason을 기록한다. queue head 하나가 뒤의 eligible work를
막지 않는다. 같은 reason 재기록은 queue revision을 반복 증가시키지 않는다.

first dispatch는 worktree/attempt/metadata mutation 전에 authoritative snapshot을 다시
읽는다. label이 관측되면 dispatch를 거부한다. 기존 pinned-base admission recheck는 그대로
유지하며 label과 git base 중 어느 하나라도 실패하면 launch하지 않는다.

### 5. Resume

manual resume는 prior attempt snapshot만 신뢰하지 않는다. relaunch state mutation과
runner spawn 전에 current Bead snapshot을 다시 읽고 label admission을 실행한다.

- label 있음: `worker_ineligible`
- Bead read 실패: `bd_snapshot_failed`
- admission 실패: 기존 reason

모두 attempt를 새로 만들거나 runner를 spawn하지 않고 caller에 거부 reason을 반환한다.

### 6. Queue 경고

placement, scheduler scan, dispatch, resume 중 어느 authoritative guard가 label을
관측해도 기존 `q.admission` channel에 `worker_ineligible`을 기록한다. Worker와 Monitor의
queue row는 기존 `⛔ reason` 표현을 재사용한다. 새 chip, 색, lane을 만들지 않는다.

자동 진행이 꺼진 상태에서 외부 actor가 label만 추가한 기존 queue entry는 다음
authoritative guard가 실행될 때 경고가 생긴다. 그 전에도 실행은 일어나지 않으며,
자동 진행을 켜거나 resume/placement를 시도하는 첫 crossing에서 반드시 차단된다.

label 제거 뒤 다음 successful admission은 stale `worker_ineligible` record를 지우고 정상
placement/dispatch를 허용한다.

## Race와 오류 처리

- candidate/runnable cache가 stale이어도 server placement가 fresh snapshot으로 거부한다.
- placement 직후 label이 붙는 비원자 race는 entry를 queue에 남길 수 있지만 scheduler의
  fresh scan과 dispatch re-read가 launch를 막는다.
- snapshot read 실패는 eligible 추정으로 바꾸지 않는다.
- ineligible queue head는 skip-next로 처리해 starvation을 만들지 않는다.
- label 제거는 queue 자동 이동을 일으키지 않는다. 기존 entry는 제자리에 남고 다음
  admission에서 다시 실행 가능해진다.
- running attempt에 실행 도중 label이 붙는 경우 현재 process를 강제 종료하지 않는다.
  label은 새 dispatch/resume 경계부터 적용하며, 실행 중단은 별도의 destructive action이다.

## 변경 surface

### Server

- `app/utils/worker-eligibility.js`: browser/server 공용 exact-label predicate
- `server/worker/runnable-cache.js`
- `server/worker/attach.js`
- `server/worker/admission.js`
- `server/ws/worker-handlers.js`
- `server/worker/scheduler.js`
- 필요한 JSDoc type과 focused tests

### Frontend

- `app/views/worker/index.js`: candidate source exclusion
- Monitor는 server runnable exclusion을 소비하며 별도 숨김 policy를 복제하지 않음
- 기존 queue admission reason rendering 재사용
- frontend source 변경 뒤 generated bundle과 map 재생성

## Test scope

### RED-GREEN seams

1. Candidate projection
   - Ready/Blocked row에 `worker-ineligible`이 있으면 candidate가 0개다.
   - label이 없으면 기존 spec/blocked/filter/sort semantics가 유지된다.
2. Runnable qualification
   - ineligible row는 server runnable cache에서 제외된다.
   - malformed labels는 crash 없이 빈 배열로 처리된다.
   - label 제거 뒤 refresh하면 다시 runnable이 된다.
3. Admission과 placement
   - label guard가 gh/git probe보다 먼저 `worker_ineligible`을 반환한다.
   - place는 queue를 변경하지 않고 refusal을 기록·fanout한다.
   - label 없는 기존 route/spec/receipt matrix는 변하지 않는다.
4. Scheduler
   - ineligible queue head를 유지·표시하면서 다음 eligible entry를 dispatch한다.
   - scan 뒤 dispatch 직전 label 변경도 re-read에서 차단한다.
   - repeated same-reason scan은 queue revision을 증가시키지 않는다.
5. Resume
   - prior attempt가 eligible이었어도 current label이 있으면 relaunch하지 않는다.
   - label 제거 뒤 current admission이 통과하면 기존 resume semantics가 유지된다.
6. UI
   - Worker candidate와 Monitor runnable에 ineligible card가 없다.
   - existing queue row는 `⛔ worker_ineligible` reason을 렌더한다.

### Verification

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
git diff --check
```

## 배포와 runtime 검증

PR merge 뒤 merged `main` checkout에서 다음을 수행한다.

1. `npm run build` 결과가 `app/main.bundle.js`와 map에 반영됐는지 확인한다.
2. `docs/agents/repo-ops.toml` `[deploy]`와 shared runtime 설정을 확인한다.
3. `bdui-shared restart`를 실행한다.
4. running process가 merged checkout을 가리키는지 확인한다.
5. listening port와 `/healthz` HTTP 응답을 확인한다.
6. `dotfiles-1qcu`가 Worker 후보와 Monitor runnable에 없고 queue placement가
   `worker_ineligible`로 거부되는지 shared service에서 read-only/controlled smoke한다.

## 완료 조건

1. `worker-ineligible` Bead가 Worker candidate와 Monitor runnable에 나타나지 않는다.
2. 새 placement, scheduler dispatch, manual resume가 모두 fail-closed다.
3. existing queue entry는 보존되고 `⛔ worker_ineligible`이 표시된다.
4. label 제거 뒤 정상 eligibility가 복구된다.
5. full frontend/backend suite와 build가 통과한다.
6. merged shared service에서 process path, port, health, target Bead behavior가 확인된다.
