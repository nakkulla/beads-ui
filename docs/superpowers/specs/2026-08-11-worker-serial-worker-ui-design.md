# `worker-serial` 배타 실행과 일괄 설정·드래그 UI 설계

- Bead: `UI-nrut`
- 계약 공급자: `dotfiles-sj12`
- route: `full_plan`
- 선행 조건: `dotfiles-sj12`가 canonical `worker-serial` 계약을 merge·검증해
  닫힐 때까지 이 Bead는 `blocks` dependency로 실행 불가다.

## 배경

Worker는 단일 waiting queue와 워크스페이스 전역 `slots`를 사용한다. 현재
`머지까지 순차 실행` 토글은 켜는 즉시 effective cap을 1로 만들어 큐 전체를
직렬화한다. 일부 이슈만 공유 설정·계약·배포 표면 때문에 단독 실행해야 하는 혼합
큐에서는 사용자가 토글을 계속 바꿔야 하고, 필요하지 않은 이슈까지 기다린다.

canonical workflow 계약의 exact `worker-serial` label을 읽어 이슈별 exclusive
barrier를 제공한다. 사용자는 라벨 문자열을 직접 입력하지 않고 Worker 대기열에서
여러 이슈를 선택해 실행 방식을 설정하며, 기존 drag reorder로 실행 순서를 정한다.

## 사용자 확정 결정

### Scheduling

- `worker-serial` 이슈는 자신의 queue 차례에 도달하면 다른 Worker 이슈가 모두
  빠진 뒤 혼자 시작한다.
- 독점은 PR 머지·정리 완료 또는 discard로 durable `pr_wait`를 떠날 때까지다.
- 같은 Bead의 resume·repair·conflict-resolution은 serial lineage를 끝내기 위해
  허용한다.
- 기존 전역 `pr_wait_holds_slot` 토글은 `전체 직렬화` override로 유지한다.

### UI

검토한 세 안은 다음과 같다.

1. 카드별 dropdown + drag
2. 체크박스 다중 선택 + 일괄 dropdown
3. `⋯` action menu + 위치 선택

사용자는 **2번의 일괄 설정에 행별 drag reorder를 결합한 안**을 확정했다.

- queue 행 왼쪽 checkbox로 여러 이슈를 선택한다.
- 하나 이상 선택하면 bulk toolbar를 표시한다.
- toolbar dropdown은 `일반 병렬`과 `🔒 머지까지 단독` 두 값만 제공한다.
- [적용]은 선택한 Bead들의 `worker-serial` label을 remove/add한다.
- 선택 상태는 실행 방식 설정에만 영향을 주고, drag는 grip을 잡은 행 하나만
  이동한다. 여러 선택 행을 묶어 이동하지 않는다.
- 행에는 raw `worker-serial` 대신 `머지까지 단독` semantic chip을 표시한다.
- Detail의 generic Labels 영역에는 실제 label을 그대로 표시·편집한다.

## Architecture

### 1. Contract label helper

새 작은 util을 둔다.

```text
app/utils/worker-serial.js
```

- `WORKER_SERIAL_LABEL = 'worker-serial'`
- `isWorkerSerial(labels)`

기존 `workerLabels()` normalization을 재사용한다. `worker-ineligible`과 scheduling
의미를 한 predicate에 섞지 않는다.

### 2. Durable attempt snapshot

`server/worker/queue-store.js`의 `Attempt`에 `worker_serial: boolean`을 추가한다.

- fresh dispatch는 authoritative Bead snapshot의 label에서 값을 기록한다.
- legacy/malformed attempt는 `false`로 normalize한다.
- resume, repair, conflict-resolution 등 동일 lineage 후속 attempt는 선행 attempt의
  `worker_serial`을 상속한다.
- guard의 lineage identity는 physical `bead_id` 하나로 판단하지 않는다. 일반
  attempt는 `bead_id`, completion-owned attempt는 기존 durable
  `completion_root_id`를 `serial_lineage_id`로 사용한다. 별도 mirror field는 만들지
  않고 `completion_root_id ?? bead_id`로 계산한다.
- linked completion repair child는 자기 label이 아니라 root source attempt의
  `worker_serial`을 상속한다. 따라서 root와 다른 `repair_bead_id`여도 같은
  `completion_root_id`면 active serial lineage를 완료하기 위해 시작할 수 있다.
- running attempt와 durable `pr_wait`의 serial 여부는 이 durable field로 판단한다.
  실행 중 label edit를 다시 읽어 현재 lineage 의미를 바꾸지 않는다.
- paused serial lineage는 terminal attempt end가 아니므로 active fence를 유지한다.

### 3. Workspace launch reservation

배타 보장은 queue scan 조건문만으로 만들지 않는다. 현재 `runPass()`는 여러
candidate를 수집한 뒤 `Promise.all`로 dispatch하고, 수동 resume·repair 경로는
slot cap을 우회한다. label re-read와 attempt prerecord 사이에 공통 원자 경계가
없으면 serial과 non-serial launch가 함께 통과할 수 있다.

`server/worker/scheduler.js`에 workspace별 짧은 in-memory launch coordinator를 둔다.
JS event loop의 한 synchronous critical section에서 다음을 inspect하고 reservation을
기록한다.

- `claimed`와 launch-in-progress reservation
- durable/recovered running attempts
- durable `pr_wait`와 그 lineage의 `worker_serial`
- 현재 queue에서 drain을 기다리는 eligible serial Bead

coordinator state는 최소한 다음 의미를 가진다.

```text
pending_serial_bead: string | null
serial_reservation_bead: string | null
launch_reservations: Set<bead_id>
```

구현 field 이름은 달라도 되지만 상태 전이는 다음을 지킨다.

1. queue scan이 ready+admitted serial 이슈를 만났는데 다른-Bead activity가 남아
   있으면 `pending_serial_bead`를 원자적으로 설치하고 그 이슈 뒤 scan을 멈춘다.
   같은 scan에서 그 serial보다 앞서 선택된 일반 이슈는 fence 설치 전에 launch
   reservation을 얻고 drain 대상이 된다.
2. pending fence가 있는 동안 새 다른-Bead queue/manual/repair launch를 거부한다.
   기존 activity는 계속 종료할 수 있다.
3. drain이 끝난 다음 tick은 pending serial을 exclusive reservation으로 승격해
   혼자 dispatch한다.
4. label 제거, dequeue, ready/admission 상실로 더는 barrier가 아니면 다음
   authoritative rescan에서 pending을 지운다.
5. attempt가 durable `running`으로 prerecord되면 짧은 launch reservation은 durable
   activity 판정으로 handoff한다.
6. prerecord 전 abort에서는 reservation과 claim을 반드시 해제한다.

pending state는 durable queue order와 live label에서 재구성할 수 있으므로
`queue.json`에 별도 source of truth를 만들지 않는다. 서버 startup attach/tick이
이를 다시 계산한다. startup tick 전 수동 시작이 들어와도 공통 guard가 durable
queue/attempt 상태에서 pending/active fence를 먼저 계산한다. running/paused/pr_wait
serial lineage 자체는 durable Attempt snapshot이 복구 근거다.

### 4. Queue scan

`runPass()`는 기존 anti-starvation을 유지하면서 batch를 다음처럼 구성한다.

- blocked, unreadable, admission-refused entry는 serial label 유무와 관계없이
  기존처럼 skip한다.
- 일반 entry는 free slot만큼 기존 순서로 선택한다.
- ready+admitted serial entry에 도달했을 때 앞서 선택한 일반 entry 또는 기존
  activity가 있으면 pending fence를 설치하고 scan을 종료한다.
- serial entry가 즉시 혼자 시작할 수 있으면 그 하나만 reservation하고 scan을
  종료한다.
- active serial running/pr_wait lineage가 있으면 다른-Bead를 선택하지 않는다.

label이 scan 뒤 dispatch 전 추가되는 race는 authoritative re-read와 공통 launch
reservation이 막는다. busy serial launch는 admission failure로 기록하지 않고
queue에 남겨 `defer + rescan`한다.

### 5. 모든 Worker attempt start의 공통 guard

다음 시작점은 같은 launch coordinator를 거친다.

- normal queue dispatch
- manual resume
- durable/external conflict-resolution session
- cleanup diagnosis
- completion resume/repair
- REVISE disposition session

guard 입력은 physical `bead_id`와 `serial_lineage_id`를 함께 가진다. 요청의
`serial_lineage_id`가 active serial root와 같으면 resume/repair 진행을 허용한다.
completion repair child처럼 physical ID가 달라도 기존 `completion_root_id` ownership
검증을 통과했다면 같은 lineage다. fresh manual launch가 단지 pending Bead와 ID가
같다는 이유만으로 queue claim을 우회하지는 않는다. 다른 lineage면
`worker_serial_pending` 또는 `worker_serial_active` reason으로 side effect 전에
거부한다. label을 제거하거나 serial 작업을 끝낸 뒤 다시 실행할 수 있다.

external PR merge/cleanup 자체와 merge queue FIFO는 새 scheduling contract의
범위가 아니다. 다만 그것들이 새 Worker attempt를 띄우는 지점은 위 공통 guard를
통과한다.

### 6. Label mutation과 tick

새 Beads CLI option이나 새 bulk protocol을 만들지 않는다.

- client는 기존 `label-add`/`label-remove`를 queue order대로 순차 호출한다.
- authoritative projection이 known이고 이미 desired state인 Bead만 mutation을
  생략한다. `unknown`은 label 부재로 간주하거나 no-op 처리하지 않는다.
- server generic label handler는 성공한 label이 `worker-serial`이면 issue
  subscription refresh와 함께 scheduler tick을 요청한다.
- tick은 기존 coalescing을 사용한다. 여러 bulk mutation이 연달아 와도 concurrent
  runPass를 만들지 않는다.

각 generic label mutation은 기존 `bd label add/remove`와 `bd show --json`
readback을 유지한다.

## UI data flow

### Label projection

waiting queue에는 `not_ready:in_progress`처럼 Ready/Blocked subscription 밖의 Bead도
남을 수 있다. 따라서 client issue 목록을 전체 label source로 가정하지 않는다.

server의 shared `decorateQueue()` snapshot에 `bead_labels: Record<bead_id, string[]>`를
추가한다. queue/pr_wait/done을 이미 채우는 async `bd show` decoration pipeline에서
같은 issue response의 labels를 `workerLabels()`로 normalize하며 별도 `bd` process를
늘리지 않는다. label mutation 또는 issue-store refresh는 해당 cache entry를
invalidate하고 다음 fill snapshot을 fanout한다. title과 달리 label은 mutation 판단에
쓰이므로 성공적인 mutation readback 뒤 stale value를 유지하지 않는다.

projection은 partial이다. key가 아직 없거나 older server가 `bead_labels`를 보내지
않으면 `worker_serial=null`인 **unknown**으로 둔다. exact label array가 도착한 뒤에만
`true` 또는 `false`가 된다. unknown row는 `실행 방식 확인 중` 상태를 표시하고
선택할 수는 있지만, 선택 집합의 label fill이 끝날 때까지 [적용]을 실행하지 않는다.
unknown을 `false`로 fail-quiet하거나 `일반 병렬` no-op으로 생략하지 않는다.

Ready/Blocked live issue labels는 더 최신일 때 같은 tri-state map을 갱신할 수 있지만,
구독 밖 waiting row도 반드시 server `bead_labels`로 수렴한다. 이 projection은 UI
표시와 mutation 최적화용이며 scheduler의 dispatch 판정은 계속 authoritative
`bd show` re-read가 소유한다.

### Selection state

`createWorkerView()` 내부에 `Set<string>` 형태의 local selection을 둔다.

- checkbox click은 row detail open과 drag start로 전파하지 않는다.
- queue snapshot이 바뀔 때 waiting lane을 떠난 ID는 selection에서 제거한다.
- 전체 성공 후 selection을 비운다.
- 부분 실패 시 실패한 ID만 선택 상태로 남겨 재시도할 수 있게 한다.
- 선택은 browser-local ephemeral UI state이며 queue store에 저장하지 않는다.

### Bulk apply

1. 선택된 ID를 현재 queue order로 정렬한다.
2. 모든 선택 ID의 tri-state가 known이 될 때까지 snapshot fill을 기다린다.
3. dropdown desired state와 known current label을 비교한다.
4. 필요한 generic mutation만 한 번에 하나씩 보낸다.
5. 각 성공은 mutation `bd show` readback으로 label cache와 subscription을 갱신한다.
6. 완료 toast:
   - 전체 성공: `N개 실행 방식 변경`
   - no-op: `이미 같은 실행 방식입니다`
   - 부분 실패: `N개 중 M개 변경 · K개 실패`와 실패 ID

한 mutation 실패가 나머지 독립 Bead write를 rollback하지 않는다. 실패를 숨기지
않고 모두 시도한 뒤 결과를 요약한다.

### Drag reorder

기존 `worker-queue-reorder { bead_id, to_index, expected_revision }`와 CAS retry-once를
그대로 사용한다. queue row는 grip에서 시작한 drag만 reorder로 인정한다.
checkbox, dropdown, chip, action button에서 시작한 pointer gesture는 drag를
시작하지 않는다. candidate drag와 candidate→queue placement 계약은 변경하지
않는다.

### Responsive behavior

- desktop과 mobile 모두 queue pane controls에 bulk toolbar를 둔다.
- mobile queue pane이 collapsed면 toolbar와 row checkbox를 렌더하지 않는다.
- toolbar는 선택 수, dropdown, [적용] 순서를 유지하고 좁은 폭에서는 hint 문구만
  숨긴다.
- native drag의 기존 platform behavior를 유지하며 별도 위치 선택 menu는 이번
  범위에 추가하지 않는다.

## UI components and styling

- `app/views/worker/lanes.js`
  - waiting row checkbox, serial chip, accessible drag grip
  - candidate/pr_wait/done row에는 bulk checkbox 없음
- `app/views/worker/index.js`
  - selection state, bulk controls, sequential apply, label projection
  - handle-only queue drag guard
- `app/styles.css`
  - selected row, bulk toolbar, semantic serial chip, drop indicator
- `app/main.bundle.js`, `app/main.bundle.js.map`
  - frontend build output 갱신

checkbox와 grip에는 명시적 accessible name을 제공하고 keyboard focus가 보이게
한다. raw label은 Detail에서 계속 편집할 수 있으므로 Worker chip 자체를 또 다른
편집 button으로 만들지 않는다.

## Error handling and recovery

- authoritative label read 실패: 기존 `bd_snapshot_failed` 경계에서 worktree 생성
  전에 중단한다.
- serial busy: failure/admission badge를 만들지 않고 defer한다. UI에는 waiting row
  `다른 작업 종료 대기 · 머지까지 단독` reason을 표시한다.
- active serial lineage가 auto-merge OFF인 상태로 `pr_wait`에 있으면 기존 PR 대기 hint를
  serial row 문맥에 맞게 보여준다.
- bulk partial failure: 성공/실패 수와 실패 ID를 toast하고 실패 행 선택을 유지한다.
- CAS reorder conflict: 기존 authoritative queue adopt + retry-once를 유지한다.
- process restart: attempt `worker_serial`과 durable lane으로 active fence를 복구하고,
  startup rescan으로 pending fence를 재구성한다.

## Post-merge 적용·검증 순서

`docs/agents/repo-ops.toml [deploy]`의 detached `bdui-shared restart`는 재시작을
운반하지만 새 process의 path·port·HTTP readback까지 운반하지 않는다. 따라서 이
검증은 현재 Bead의 required no-PR residue이며 spec gate에서 exact
`worker-ineligible` label을 붙인다. 이 Bead는 대기열 auto-dispatch가 아니라
post-merge 검증까지 이어갈 interactive controller가 수행한다.

다음 순서를 바꾸거나 일부만 성공한 상태에서 완료를 선언하지 않는다.

1. fetched `origin/main`이 merge commit을 포함하는지 확인하고 canonical `main`
   checkout을 그 SHA로 fast-forward한다. 이후 단계의 cwd는 worktree가 아니라 이
   merged checkout이다.
2. merged checkout에서 `npm run build`를 실행하고 `app/main.bundle.js`와 map이
   source와 같은 merged SHA에서 생성됐는지 확인한다.
3. `~/.config/bdui/config.toml`에서 이 repository의 `[worker.verify."<abs>"]`와
   `[worker.deploy."<abs>"]` legacy fallback을 발명하지 않고, active shared-service
   path와 configured port가 canonical merged checkout을 가리키는지만 확인한다.
   credential 값은 출력하지 않는다.
4. 자동 detached deploy 결과와 관계없이 merged checkout에서
   `bdui-shared restart`를 실행한다. command exit 0만으로 성공을 선언하지 않는다.
5. 재시작 뒤 실제 process command/cwd가 merged checkout에서 로드됐는지, configured
   port가 listening인지, 그 port의 기본 HTTP request가 성공 응답을 반환하는지
   순서대로 확인한다.
6. 세 readback이 모두 성공하면 `worker-ineligible`을 제거하고 그 label set을
   확인한 뒤 completion sweep에서 `UI-nrut`을 닫는다.

어느 단계든 실패하면 Bead와 `worker-ineligible`을 유지하고 shared service의 마지막
관측 상태를 기록한다. source나 config를 임의 rollback하지 않으며, 같은 merged
`main`에서 첫 실패 단계부터 재개한다. restart는 동일 merged state에서 재실행
가능하고, process path·port·HTTP 세 항목이 모두 새로 통과해야 이전 실패를 해소한다.

## Test scope

### Contract helper

- exact `worker-serial`만 true다.
- malformed/non-array label은 false다.
- `worker-ineligible`과 독립이다.

### Queue store

- fresh attempt `worker_serial` round-trip
- legacy absence -> false
- relaunch/repair lineage inheritance
- root `worker_serial`을 다른 ID의 linked completion repair child가
  `completion_root_id`로 상속
- restart snapshot preserves active serial evidence

### Scheduler RED-GREEN seams

- serial이 queue 앞이고 activity 없음: serial 하나만 dispatch
- 일반 두 건 뒤 serial: 앞선 일반 batch만 시작하고 serial 이후 entry는 미선택
- serial이 다른 running/pr_wait를 만나면 pending fence 설치, 새 다른-Bead launch
  거부, drain tick 뒤 serial dispatch
- blocked/inadmissible serial은 skip하고 뒤 ready entry dispatch
- scan 뒤 label add: authoritative dispatch re-read가 other claim과 겹치지 않고 defer
- active serial running/pr_wait 중 normal auto-dispatch 0건
- manual resume/conflict/diagnosis/repair의 other-Bead 시작이 공통 guard에서 거부
- same-lineage serial resume와 root→다른-ID completion repair child는 허용하고
  snapshot 상속
- label remove 중 active lineage는 fence 유지; fresh attempt는 non-serial
- label add 중 running non-serial은 소급하지 않음
- prerecord/guard/worktree abort가 reservation과 claim을 누수하지 않음
- restart 뒤 running/pr_wait serial fence 복구
- global `pr_wait_holds_slot` 기존 테스트 불변

### Mutation handlers

- `worker-serial` add/remove 성공은 subscription refresh와 scheduler tick 요청
- 다른 generic label mutation은 serial 전용 side effect를 만들지 않음
- bd write/readback 실패는 tick하지 않음

### Worker view

- waiting row만 checkbox와 semantic chip 표시
- Ready/Blocked 밖 waiting row도 `bead_labels` fill로 serial chip 표시
- missing projection은 unknown이고 false/no-op으로 처리하지 않음
- 선택 시 bulk toolbar 표시, no selection이면 숨김
- desired state와 같은 행은 mutation 생략
- selected IDs를 queue order로 순차 mutation
- 전체 성공/no-op/부분 실패 toast와 selection 수렴
- checkbox/dropdown click은 detail open/drag로 전파하지 않음
- queue reorder는 grip drag만 허용하고 기존 CAS retry 유지
- mobile collapsed queue에는 bulk controls 미표시

### Full repository verification

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
```

`prettier:write`와 build 뒤 전체 diff를 다시 검토하며 bundle과 source 외 unrelated
파일을 포함하지 않는다.

## 구현 예상 범위

- `app/utils/worker-serial.js`
- `app/utils/worker-serial.test.js`
- `server/worker/queue-store.js`
- `server/worker/queue-store.test.js`
- `server/worker/scheduler.js`
- `server/worker/scheduler.test.js`
- `server/ws/mutation-handlers.js`
- 관련 mutation handler tests
- `server/worker/title-cache.js` 또는 동일 `bd show` decoration owner와 focused tests
- `server/ws/worker-handlers.js`의 `bead_labels` projection과 protocol test
- `app/views/worker/index.js`
- `app/views/worker/index.test.js`
- `app/views/worker/lanes.js`
- `app/views/worker/lanes.test.js`
- `app/styles.css`
- `app/main.bundle.js`
- `app/main.bundle.js.map`
- `app/protocol.md`의 semantic behavior 설명

구현 중 실제 seam이 다르면 같은 책임을 가진 최소 파일로 조정할 수 있다. unrelated
refactor나 serial/parallel lane 부활은 하지 않는다.

## 비범위

- Beads CLI/schema 변경 또는 `--serial` 전용 option
- controller의 자동 serial 추론·자동 label writer
- 선택한 여러 행을 한 묶음으로 drag
- 별도 serial queue lane
- 실행 중 label edit로 current lineage snapshot 강제 변경
- external PR overlay나 merge queue FIFO 재설계
- mobile 전용 위치 선택 menu

## 완료 조건

1. `worker-serial` label이 canonical 계약과 정확히 같은 exclusive semantics로
   소비된다.
2. serial은 workspace launch reservation과 durable attempt snapshot으로
   queue/manual/recovery race에서도 다른-Bead attempt와 겹치지 않는다.
3. 사용자는 대기열에서 여러 이슈를 선택해 실행 방식을 일괄 설정하고, 각 행을
   grip drag로 재정렬할 수 있다.
4. generic label partial failure, CAS conflict, restart가 fail-visible하게 수렴한다.
5. pre-handoff validation 전체와 frontend build가 통과하고 bundle이 갱신된다.
6. spec gate부터 post-merge runtime readback 전까지 `worker-ineligible`이 유지된다.
7. 위 ordered post-merge 절차로 shared service를 재시작하고 process path, port,
   HTTP response를 검증한 뒤에만 label을 제거하고 Bead를 닫는다.
