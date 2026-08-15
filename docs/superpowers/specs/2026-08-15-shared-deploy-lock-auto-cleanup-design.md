# 공유 deploy lock·외부 머지 자동 정리·metadata 키 소비 (UI-exua)

- Bead: `UI-exua` (`route=spec_backed`) — 소비자 구현 unit
- 계약 unit: `dotfiles-pbh0` — dotfiles
  `docs/superpowers/specs/2026-08-15-workflow-simplification-design.md`
  (§1 기계 표면, §3 배포 단일 절차, §6 metadata 키, §7 소비자 요구 범위)
- 날짜: 2026-08-15

## 1. 배경

dotfiles-pbh0 재설계가 배포를 executor 무관 단일 절차(세션 직접 실행 기본 +
공유 lockfile 직렬화)로 재정의하고, 외부 머지 정리 자동화와 metadata 키
4종을 계약에 추가했다. beads-ui는 그 계약의 소비자이며, 이 unit이 소비자
측 채택을 소유한다. 계약 문장을 새로 쓰지 않는다.

현재 소비자 표면의 간극은 넷이다.

- **정리 자동화 간극.** `server/worker/pr-poller.js`의 `observeBead`는
  `pr.state === 'MERGED' && !external_row`일 때만 [머지] 버튼과 같은
  post-merge cleanup으로 handoff한다. external row(웹 UI 직접 머지, 세션
  `gh pr merge` 포함)는 관측만 기록되고 `[정리]` 클릭이 유일한 트리거다.
- **lock 간극.** `server/worker/repo-operation-coordinator.js`는 in-process
  `repoOperationLock`만 잡는다. 세션이 직접 배포하는 새 계약에서는 Worker
  프로세스 밖의 executor와 워크트리 정렬이 경합할 수 있다(TOCTOU).
- **식별 간극.** `server/worker/completion-repair.js`는 repair Bead의 출처
  operation 식별자를 description/notes 텍스트 마커(`completion_op=...`,
  `completion_failure=...`)로 넣고 `includes()`로 되찾는다. 계약이
  `completion_op_id`/`completion_failure_key` metadata 키를 추가했으므로
  텍스트 파싱은 legacy가 된다.
- **서술 간극.** `AGENTS.md`의 배포 절은 "Worker-owned 소유 의미론"과
  "[정리] 클릭이 단일 트리거", v1 해결 서술을 담고 있다(UI-iptm의 v2 사다리
  머지에서도 갱신되지 않았다).

## 2. 목표와 비목표

### 목표

1. Worker deploy 경로가 공유 lockfile로 워크트리 정렬을 직렬화한다.
2. external row 관측 즉시 같은 cleanup 커서가 자동 실행되고, `[정리]`는
   실패 후 재개 전용이 된다.
3. repair Bead 식별이 metadata 키 readback으로 전환된다(새 쓰기는 키만,
   기존 레코드는 텍스트 fallback).
4. `exec_receipt`/`impl_entry` 표시 소비자가 추가된다(게이팅 미사용).
5. `AGENTS.md` 배포 절이 새 계약과 일치하고 간결해진다.

### 비목표

- merge-gate·admission의 fail-closed 판정, REVISE 처분 클릭, 예산 소진 후
  해결 버튼, Worker 큐 스케줄링·serial 의미는 바꾸지 않는다.
- resolution ladder(v2)의 의미·`RepoOperation` durable 스키마를 바꾸지
  않는다.
- durable 상태 마이그레이션은 하지 않는다(읽는 시점 정규화).

## 3. 설계

### 3.1 공유 deploy lock 프로토콜 (계약 §3과 합의된 형태)

- lockfile: `<repo>/.worktrees/.repo-ops-deploy.lock`, flock(2) exclusive.
  macOS에 flock CLI가 없으므로 모든 executor는 python3 `fcntl.flock`으로
  잡는다.
- **무교착 분할**: alignment-executor(Worker coordinator 또는 세션 절차)는
  단조성 검사와 워크트리 정렬 구간을 lock으로 덮고 **script spawn 직전에
  해제**한다. script는 시작 시 같은 lockfile을 스스로 flock하고(실행 구간),
  lock 직후 `HEAD == REPO_OPS_TARGET_SHA`를 재확인해 어긋나면 nonzero
  exit한다. 해제와 script flock 사이의 잔여 경합은 이 HEAD 재확인이 수렴
  장치다(어긋나면 재실행). 최종 readback은 lock 밖에서 수행한다 — 이후의
  변경은 더 새로운 배포이며 단조성·coverage가 처리한다.
- 구현: 신설 `server/worker/deploy-lock.js` — python3 홀더 자식
  프로세스(`fcntl.flock` 후 acquired 신호 출력, stdin 종료까지 유지)를
  스폰해 획득을 기다린다. 해제는 자식 종료이고, Worker 프로세스가 죽으면
  OS가 fd를 닫아 자동 해제된다. 획득 대기는 bounded(기본 deploy timeout
  내)이며 초과는 `deploy_lock_timeout` terminal failure로 정착해 v2 사다리
  소관이 된다.
- 적용 지점: `ensureDeployLocked`의 target bind·worktree 정렬
  단계(`createRepoOpsDeployWorktreeManager` 호출 구간)를 lock 획득/해제로
  감싼다. in-process `repoOperationLock`은 그대로 유지한다(프로세스 내
  직렬화와 크로스 프로세스 직렬화는 별개 층).

### 3.2 외부 머지 자동 정리

- `pr-poller.js observeBead`의 handoff 조건에서 `!external_row` 가드를
  제거해, external row의 관측된 `MERGED`도 [머지] 버튼과 **같은**
  `cleanupMerged` 경로로 수렴시킨다(§6 "one path" 원칙 유지 — 두 번째
  사본을 만들지 않는다).
- 자동 실행 조건: 그 행에 Bead 결속이 있고, 같은 Bead의 cleanup이 이미
  실행 중이 아니며, `cleanup_failed[bead_id]`가 없을 때만. 이전 실패가
  있는 행은 자동 재시작하지 않는다 — 실패 이후는 v2 사다리와 `[정리]` 재개
  영역이다(계약의 "자동은 chain당 1회" 원칙과 정합).
- 각 커서 단계는 기존 증거 확인을 그대로 사용하므로 멱등이다: 세션이 이미
  배포한 경우 deploy 단계는 descendant coverage로 통과하고, 이미 닫힌
  자식·부모는 closure 단계가 건너뛴다.
- `[정리]` 버튼과 external row 표시는 유지하되, 의미가 "유일한 트리거"에서
  "실패 후 재개"로 바뀐다(문구는 기존 `정리 재개` 그대로).

### 3.3 metadata 키 소비 전환

- `completion-repair.js`: repair Bead 생성 시 `bd update --set-metadata
  completion_op_id=<op_id> completion_failure_key=<stage>/<reason>/<digest>`를
  쓰고 readback한다. `matchesIdentity`는 metadata 키를 먼저 비교하고, 키가
  없는 기존 레코드에 한해 legacy 텍스트 마커 `includes()`로 fallback한다.
  새로 만드는 description에는 마커 라인을 넣지 않는다(서사만 유지).
- 표시 소비자: `server/workflow-enrich.js`가 `exec_receipt`
  (`delegated:<model>@<sha>` | `main:<사유>@<sha>`)와 `impl_entry`
  (`user@<40hex>`)를 파싱해 상세 패널/카드 칩으로 투영한다. 파싱 실패나
  부재는 fail-quiet(표시 생략)이며 어떤 게이팅에도 쓰지 않는다.

### 3.4 AGENTS.md 정합

Post-Merge Runtime Validation 절을 새 계약으로 다시 쓴다: "Worker-owned
소유 의미론" → "lock 계약의 공유 deploy 워크트리"(외부 executor 병행 인정),
"자동 경로는 [머지] 클릭 PR에만" → "모든 머지 경로(클릭·세션·외부)가 자동
정리로 수렴, [정리]는 실패 후 재개", v1 해결 서술 → v2 사다리 3단. 절
전반을 현재 동작 기준으로 간결화하고, 계약 원문은 dotfiles 포인터로
대체한다(기존 canonical 소유권 절 유지).

## 4. 실패 처리

- lock 획득 timeout·python3 부재는 명시 코드(`deploy_lock_timeout`/
  `deploy_lock_unavailable`)의 terminal failure로 정착하고 사다리 입구를
  갖는다. 조용한 skip이나 lock 없는 진행 fallback은 없다.
- 외부 자동 정리의 단계 실패는 기존 `cleanup_failed` 기록·사다리 경로를
  그대로 탄다. 자동 경로가 같은 실패를 반복 재시작하지 않는 것은 3.2의
  선행 조건이 보장한다.
- metadata 쓰기 실패는 기존 repair 생성 실패 경로와 동일하게 처리한다
  (부분 생성 상태를 남기지 않음).

## 5. Test scope

- **RED→GREEN seam 1 — `server/worker/deploy-lock.test.js` (신설)**:
  동시 2획득 중 1개 대기 · 홀더 자식 종료 시 해제 · bounded 대기 초과
  `deploy_lock_timeout`. RED: 신규 모듈 부재로 수집 실패.
- **RED→GREEN seam 2 — coordinator/poller 전이 확장**:
  `repo-operation-coordinator.test.js` — 정렬 구간에서 lock 획득·spawn 전
  해제 순서 고정, lock 실패 시 terminal 정착. `pr-poller` 관련 테스트 —
  external row MERGED 관측 → cleanup 자동 시작, `cleanup_failed` 존재 시
  자동 재시작 없음, 실행 중 dedupe.
- **RED→GREEN seam 3 — `completion-repair.test.js` 확장**: 새 repair Bead가
  metadata 키를 쓰고 readback으로 식별됨 · 키 없는 legacy 레코드가 텍스트
  fallback으로 식별됨 · 새 description에 마커 라인 부재.
- 표시: `workflow-enrich` 테스트에 `exec_receipt`/`impl_entry` 투영과
  malformed fail-quiet 케이스 추가.
- 회귀: 전체 `npm test`, `repo-operation-policy` v2 pin 유지.

## 6. 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
  `npm run build`(갱신된 번들 포함)
- 머지 후 배포 operation terminal success + 프로세스 경로·포트·HTTP 응답
  확인(AGENTS.md 마감 단계 그대로)
- 저장소 전체 검색으로 새 쓰기 경로의 `completion_op=` 마커 삽입 부재 확인

## 7. 위험과 완화

- **lock이 배포를 지연시킨다** — 대기는 bounded이고 초과는 terminal +
  사다리 입구다. 정렬 구간만 덮으므로 script 실행 시간은 lock 밖이다.
- **외부 자동 정리가 의도치 않은 행을 닫는다** — Bead 결속이 있는 행만
  대상이고, closure 단계는 기존 증거 확인(merged containment·자식 상태)을
  그대로 쓴다. 이미 세션이 close한 Bead는 no-op이다.
- **두 프로세스 층 lock의 순서 역전** — in-process lock 안에서 외부 lock을
  잡는 한 방향만 존재하므로 역전이 없다.
- **legacy fallback이 영구화된다** — fallback은 metadata 키가 없는 기존
  레코드 한정이며, 새 쓰기는 키만 쓴다. 잔존 legacy 레코드가 소진되면
  fallback 경로는 죽은 코드가 되고 후속 정리로 제거 가능하다.
