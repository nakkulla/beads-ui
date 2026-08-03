# 머지 큐 head 영구 고착 수정 — 레인 배타성과 halt 종료 보장

- Bead: UI-wwby
- Route: spec_backed
- 작성일: 2026-08-03

## 배경 — 관측된 사고

2026-08-03, `beads-ui` 워크스페이스에서 자동 머지가 영구 정지했다. `merge_queue` 의 head 는 이미 머지가 끝나 `done` 레인에 있는 `UI-meft` 였고, 그 뒤의 `UI-2hc5`(PR #89, `MERGEABLE`/`CLEAN`)는 순번을 받지 못한 채 19분 이상 멈춰 있었다.

관측 증거 (`~/.local/state/bdui/beads-ui-680a04fbdcbc/queue.json`):

| 항목 | 값 |
| --- | --- |
| `merge_queue` | `[UI-meft, UI-2hc5]` |
| `pr_wait` | `[UI-2hc5]` |
| `done` | `UI-meft` 포함 (`added_at` 17:59:12.112) |
| `auto_merge_skips` | `{}` |
| `last_deploy` | `{outcome: launched, bead_id: UI-meft, at: 17:59:12.112}` |

- `UI-meft`: PR #88 `mergedAt` 17:58:42 → bd `closed` 17:59:11 → `done` 진입 17:59:12.112.
- 서버 프로세스 시작 시각 17:59:12 — post-merge 배포가 서버 자신을 재시작했다.
- `queue.json` 마지막 쓰기는 18:00:17 이며 그 이후 변화가 없다.

핵심 관측은 **같은 bead 가 `done` 과 `merge_queue` 에 동시에 존재한다**는 것이다. `moveToDone`/`moveToDoneWithDeploy` 는 `removeFromLanes` 를 통해 `merge_queue` 에서도 제거하므로(`queue-store.js:1265-1267`·`1358-1360`·`789-797`), 단일 mutation 의 결과로는 나올 수 없는 상태다.

## 근본 원인

세 겹의 계약 결함이 순차로 작동했다.

### 1. external overlay 의 레인 배타성 부재

`overlaidPrWait`(`merge-candidates.js:93-129`)은 external registry 행을 얹을 때 `pr_wait` 멤버십만 양보 조건으로 쓰고 `queue`/`done` 레인 소속을 보지 않는다.

external registry 는 bd 스캔(`status=resolved` + `metadata.pr_url`) 결과를 PR 폴러 tick(기본 30초)마다 **전체 교체**하므로 stale 창이 존재한다(`external-pr.js:64-94`). 머지 완료로 bead 가 `pr_wait` 을 떠나는 순간 overlay 가 양보를 멈추고, registry 가 아직 stale 하면 그 bead 가 external 행으로 되살아난다.

### 2. 자격 판정과 스토어 멤버십 검사의 external 우회

`mergeQueueCandidates`(`merge-candidates.js:184-191`)는 `external && merged_tier` 를 eligible 로 인정한다. 이는 UI-7agi 의 의도 — 폴러가 자동 정리하지 않는 external PR 을 머지 관측 후 정리 대상으로 넣는 것 — 이지만, 1번으로 되살아난 행에도 그대로 적용된다. PR 이 실제로 `MERGED` 이므로 `merge-gate.js:131-138` 이 `tier='merged'` 를 준다.

이어서 `enqueueMergeAuto`(`queue-store.js:1725-1745`)와 `enqueueMerge`(`queue-store.js:1659-1676`)의 멤버십 검사가 `entry.external === true` 를 무조건 통과시킨다. 결과적으로 `removeFromLanes` 가 방금 보장한 레인 배타성이 즉시 깨지고, `done` 레인 bead 가 `merge_queue` 에 재등록된다.

재현 확인 (2026-08-03): 임시 `XDG_STATE_HOME` 에서 `moveToDone(X)` 로 `done` 이동(이 시점 `merge_queue` 는 비어 있음) 직후 `enqueueMergeAuto({entries:[{bead_id:'X', external:true, head_sha:'deadbeef'}], present_ids:['X']})` 를 호출하면 `merge_queue` 에 `X` 가 다시 들어가며 `done` 과 동시 존재한다.

### 3. halt 의 종료 보장 부재

오염된 head 를 드라이버가 처분하려 하면 `prActions.merge()` 가 `laneMembership`(`pr-actions.js:316-322`)에서 `not_in_pr_wait` 으로 refuse 한다 — 그 bead 는 `pr_wait` 에도 없고, registry 도 그 사이 갱신되어 external 행도 아니기 때문이다.

이어지는 `failAndDequeue`(`merge-queue.js:347-381`)는 배제 기록을 위해 head SHA 관측을 요구하는데, 그 bead 는 어느 레인에도 없으므로 PR 폴러의 관측 대상이 아니다(`pr-poller.js:503-523` 의 `entries` 는 `pr_wait` + external overlay 로만 구성된다). 배포 재시작으로 in-memory 관측 캐시가 비면 재관측 경로가 영구히 사라진다.

그 결과 `halted = true`, `halted_on_head = <bead>` 로 drain 이 끝나고, 재개 조건이 `headSha(halted_on_head)` 판독(`merge-queue.js:733-741`)이므로 halt 가 영원히 풀리지 않는다. 큐 head 가 고착되어 뒤의 모든 PR 이 정지한다.

폴러에는 "`merge_queue` 멤버의 관측은 프룬하지 않는다"는 방어(`pr-poller.js:525-534`)가 이미 있으나, 그것은 **이미 있는** 관측을 지킬 뿐 재시작으로 비어버린 캐시를 다시 채우지 못한다.

배포 재시작은 3번의 트리거일 뿐이며, 1·2 번은 재시작 없이도 레인 배타성을 깬다.

## 변경 내용

### 1. stale 원천 제거 — `external-pr.js`, `attach.js`, `pr-actions.js`

`externalPrStore` 에 `drop(workspace, bead_id)` 를 추가한다. 해당 행이 있으면 제거하고 제거 여부를 반환하며, 없으면 무해한 no-op 이다.

`attach.js:722-726` 의 `external` deps 에 `drop` 을 배선하고, `pr-actions.js` 의 cleanup 성공 경로에서 호출한다. 호출 지점은 `clearShipFailure(workspace)` 직후 — `durable` 분기(`moveToDone` / `moveToDoneWithDeploy` / external 행의 non-durable 경로) **이전**의 공통 지점이다. cleanup 이 성공한 bead 는 durable 행이든 external 행이든 다음 bd 스캔에서 registry 에 남지 않을 대상이므로, 그 결론을 스캔 주기만큼 앞당기는 것이고 의미 변화가 없다.

`drop` 은 in-memory registry 만 건드리며 durable 상태를 쓰지 않는다. 실패해도 다음 스캔이 같은 결론을 내므로 예외를 삼켜 cleanup 을 깨지 않는다.

### 2. 레인 배타성 강제 — `merge-candidates.js`, `queue-store.js`

**`overlaidPrWait`**: 양보 판정용 `seen` 집합을 `pr_wait` 뿐 아니라 `queue`·`done` 레인 멤버로 채운다. `out` 배열의 구성 규칙은 그대로다 — `pr_wait` 행이 먼저 들어가고, 이어서 external registry 행 중 `seen` 에 없는 것만 들어간다. 달라지는 것은 `seen` 의 범위뿐이며, 그 결과 registry 가 stale 해도 `queue`/`done` 소속 bead 를 external 행으로 되살리지 못한다.

**`enqueueMerge` / `enqueueMergeAuto`**: 멤버십 판정을 다음으로 바꾼다.

```js
const in_pr_wait = next.pr_wait.some((e) => e.bead_id === bead_id);
const in_other_lane =
  next.queue.some((e) => e.bead_id === bead_id) ||
  next.done.some((e) => e.bead_id === bead_id);
const member = (entry.external === true || in_pr_wait) && !in_other_lane;
```

external 우회는 유지하되 `queue`/`done` 소속이면 거부한다. 스토어가 배타성의 최종 수문이 되어, overlay 밖의 새 경로가 생겨도 durable 상태는 오염되지 않는다. 두 메서드에 동일 규칙을 적용하는 이유는, 수동 [머지] 클릭 경로(`enqueueMerge`)도 같은 계약 아래 있어야 UI 밖에서 들어오는 요청이 우회로가 되지 않기 때문이다.

### 3. halt 의 종료 보장 — `merge-queue.js`, `attach.js`

`failAndDequeue` 가 head SHA 를 읽지 못할 때 무조건 halt 하는 대신 갈라지되, 그 분기 기준은 **"PR 폴러가 이 bead 를 관측하는가"** 다. halt 의 재개 신호가 오직 관측 도착이기 때문이다(`merge-queue.js:733-741`). 폴러의 관측 대상은 `pr_wait` + 현재 external registry 행이다(`pr-poller.js:503-523`).

- **`pr_wait` 멤버이거나 현재 external registry 멤버** → 기존 halt 유지(`halted_on_head` 설정). 관측이 반드시 도착하므로 재개가 보장된다.
- **그 외 전부** → 배제 기록 없이 즉시 `dequeue`. 여기에는 `queue`/`done` 멤버와 어느 곳에도 없는 bead 가 모두 포함된다. 전자는 변경 2 가 재등록을 막고, 후자는 `pr_wait` 에도 registry 에도 없어 external 우회로도 재등록될 수 없다. 배제 기록을 남길 자리도 없다 — `removeFromLanes` 가 레인 이탈 시 `auto_merge_skips` 를 이미 지운다(`queue-store.js:795-796`).

분기 기준을 "durable 레인 소속"으로 잡으면 안 된다. 이번 사고의 오염 상태가 정확히 `done` + `merge_queue` 이므로 그 기준에서는 오염된 head 가 "레인 멤버"로 분류되어 halt 쪽에 남고, 폴러는 `done` 을 관측하지 않으므로 재개 신호가 영원히 오지 않는다 — 고치려는 고착이 그대로 재현된다. 반대 방향의 오류도 있다: 정상 external 행은 durable 레인 어디에도 없지만 registry 멤버인 동안 external 우회로 재등록될 수 있으므로, "레인 비멤버는 재등록 불가"는 참이 아니다.

이 판정에는 external registry 멤버십 조회가 필요하고 드라이버에는 그 경로가 없으므로, `createMergeQueue` 에 dep 을 하나 추가한다 — `isExternalRow: (bead_id) => boolean`, `attach.js` 에서 `runtime.externalPrs.get(ws_key, bead_id)` 로 배선한다. 조회가 던지면 `false` 로 취급해 **배출** 쪽으로 보낸다. 이 방향이 안전한 쪽이다: 잘못 배출된 항목이 실제로 관측 대상이었다면 인롤러가 자격을 다시 판정해 큐에 되돌리므로 손실이 없는 반면, 잘못된 halt 는 큐 전체를 세우고 그 재개 조건이 바로 판정 불가능했던 그 관측이라 영구 정지가 된다 — 이 스펙이 고치려는 실패 모드가 정확히 그것이다. `pr_wait` 멤버십은 드라이버가 이미 쓰는 `snapshot()` 으로 읽는다.

`processItem` 앞쪽의 배제 필터 halt(`merge-queue.js:542-556`)에도 같은 갈래를 적용해, 두 halt 지점이 서로 다른 규칙을 갖지 않게 맞춘다.

## 영향받는 기존 경로

- **external PR 의 자동 [정리]**(UI-7agi): `external && merged_tier` 자격 자체는 유지된다. 달라지는 것은 그 자격이 `queue`/`done` 멤버에게는 적용되지 않는다는 점뿐이다. 진짜 external 행은 `durable === false` 경로를 타므로 `done` 레인에 들어가지 않는다(`pr-actions.js:1355-1372`) — 정상 external 행은 이 변경의 영향을 받지 않는다.
- **`merge_queue` 멤버 관측 프룬 면제**(`pr-poller.js:525-534`): 그대로 둔다. 변경 3 이 관측 없는 head 를 배출하지만, 관측이 살아 있는 편이 배제 기록을 남길 수 있어 더 낫다.
- **드라이버의 다른 halt 원인**(persist 실패, `bumpRound` 실패): 변경 없음. 그 halt 들은 "다음 kick 이나 재시작이 재개한다"는 기존 계약을 그대로 유지한다.

## 회귀와 그 대가

워커로 완료된 bead 를 사람이 나중에 직접 새 PR 로 올리고 bd 를 `resolved` 로 되돌리면, 그 bead 는 `done` 에 남은 채 정당한 external 행이 된다. 변경 2 는 그 행을 external 자격에서 배제하므로 자동 [정리] 대상에서 빠진다.

**해소 경로는 UI 에 없다.** `done` 행은 드래그 불가이고(`app/views/worker/index.js:1748`) 레인에서 빼는 액션도 없다. `moveToPrWait` 의 호출자는 scheduler 내부 두 곳뿐이며(`scheduler.js:1366`·`1973`) attempt 레코드를 요구하므로 사람이 직접 부를 수 있는 경로가 아니다. 남는 실질 경로는 하나 — 그 bead 로 워커 작업을 다시 돌리는 것이다. 워커가 `queue` → running → `pr_wait` 으로 옮기면서 `removeFromLanes` 가 `done` 에서 빼므로 그 뒤로는 정상 처리된다. 사람이 워커 밖에서 만든 PR 을 자동 정리하고 싶다면 그 방법뿐이고, 그 전까지는 수동 [머지]/[정리] 클릭도 이 bead 에 대해서는 스토어에서 거부된다.

이것이 이 변경이 받는 회귀 비용이다. 그 대가로 durable 레인 배타성이 조건 없이 성립한다. 판별을 정교하게 하려면 `done` 엔트리에 PR URL 스냅샷을 넣어 동일성을 비교해야 하는데(`attempt` 에 `pr_url` 은 durable 필드가 아니다), durable 스키마를 늘리는 것은 이 버그의 표면인 "레인 간 상태 중복"을 오히려 키운다.

## 수용 기준

1. `done`/`queue` 레인 멤버는 `external: true` 엔트리로도 `merge_queue` 에 들어가지 않는다.
2. `overlaidPrWait` 이 `queue`/`done` 멤버를 external 행으로 얹지 않는다.
3. cleanup 성공 직후 그 bead 는 external registry 에서 사라진다.
4. 폴러가 관측하지 않는 head — `queue`/`done` 멤버이거나 `pr_wait` 에도 external registry 에도 없는 bead — 는 head SHA 관측 없이 큐에서 배출되고, 드라이버가 다음 항목으로 진행한다. 이번 사고의 오염 상태(`done` + `merge_queue`)가 이 갈래에 속한다.
5. 폴러가 관측하는 head — `pr_wait` 멤버이거나 현재 external registry 멤버 — 는 head SHA 가 없을 때 기존대로 halt 하고, 관측이 도착하면 재개한다.
6. 정상 external 행(`durable === false`, 어느 레인에도 없음)의 머지·[정리] 경로에 회귀가 없다.
7. 기존 `server/worker/` 테스트 전량이 통과한다.

## Test scope

| # | seam | 파일 | RED 조건 |
| --- | --- | --- | --- |
| 1 | `enqueueMergeAuto` 가 `done` 멤버의 external 엔트리를 거부 | `queue-store.test.js` | 현재 코드에서 `merge_queue` 에 들어감 |
| 2 | `enqueueMergeAuto` 가 `queue` 멤버의 external 엔트리를 거부 | `queue-store.test.js` | 현재 코드에서 `merge_queue` 에 들어감 |
| 3 | `enqueueMerge` 가 `done`/`queue` 멤버의 external 엔트리를 거부 | `queue-store.test.js` | 현재 코드에서 `merge_queue` 에 들어감 |
| 4 | `overlaidPrWait` 이 `queue`/`done` 멤버에게 양보 | `merge-candidates.test.js` (신규) | 현재 코드에서 external 행으로 얹힘 |
| 5 | `externalPrStore.drop` 이 행을 제거하고 `list` 에서 사라짐 | `external-pr.test.js` | `drop` 부재 |
| 6 | cleanup 성공이 그 bead 를 external registry 에서 내림 | `pr-actions.test.js` | 호출 부재 — `drop` 만 있고 배선이 없으면 통과하지 못함 |
| 7 | `done` + `merge_queue` 오염 head 가 배출되고 드라이버가 다음 항목으로 진행 | `merge-queue.test.js` | 현재 코드에서 halt 하고 큐에 남아 뒤 항목이 정지 |
| 8 | `pr_wait` 멤버 head 는 head SHA 가 없을 때 halt 유지 | `merge-queue.test.js` | 변경 3 도입 시 회귀 방지 |
| 9 | external registry 멤버 head 는 halt 유지하고 관측 도착 시 재개 | `merge-queue.test.js` | 변경 3 도입 시 회귀 방지 |

seam 1-7 이 red-first 대상이다. seam 8·9 는 변경 3 이 기존 halt 를 과잉 제거하지 않음을 고정하는 회귀 방지용이므로 변경 전에도 통과할 수 있다.

seam 6 과 7 이 이 스펙의 핵심 배선을 증명한다. seam 5 는 `drop` 이라는 단위 기능만 보므로 `pr-actions` 에서 호출을 빠뜨려도 통과한다 — 그래서 cleanup 경로가 실제로 registry 를 내리는지 보는 seam 6 이 따로 필요하다. 마찬가지로 seam 7 은 "레인 비멤버"라는 추상 조건이 아니라 **이번 사고의 실제 오염 상태**(`done` 멤버이면서 `merge_queue` head)를 그대로 세팅하고, 그 head 가 배출된 뒤 두 번째 항목이 처리되는 데까지를 단언한다.

seam 1 은 이번 재현 스크립트(`moveToDone` → `enqueueMergeAuto`)를 그대로 정식 테스트로 옮긴다. seam 4 는 `getWorkerRuntime().externalPrs` 싱글턴에 행을 넣어야 하므로, 기존 테스트가 쓰는 주입 방식을 따르되 없으면 registry 를 직접 `replace` 한 뒤 검사한다. seam 9 는 새 `isExternalRow` dep 에 `true` 를 주입해 halt 를 만든 뒤, 관측 도착(`queue-changed` + 판독 가능한 head SHA)으로 재개되는지를 본다.

## Non-goals

- `done` 엔트리에 PR URL 스냅샷을 추가하는 durable 스키마 확장. 회귀 절에 적은 이유로 뺀다.
- 부팅 시 레인 정합성 자가 치유(로드 시 교차 오염 제거). 조사 시점 모든 워크스페이스의 `merge_queue` 가 비어 있어 치유 대상이 없고, 잔여 오염이 있더라도 변경 3 이 배출한다.
- external registry 스캔 주기 변경.
- 배포가 서버 자신을 재시작하는 구조 자체의 변경. 이번 사고의 트리거였지만 원인이 아니며, 재시작 없이도 1·2 번은 성립한다.
- 이미 종료된 이번 사고의 잔여 상태 정리. 큐는 이미 비어 있다.

## 검증

`npm run prettier:write && npm run all`.

`npm run all` 은 `lint && tsc && test && prettier:check` 이며 `build` 를 포함하지 않는다. 이 변경은 `server/` 아래 서버 코드만 건드리고 프런트엔드 소스를 건드리지 않으므로 `npm run build` 와 `app/main.bundle.js` 재생성은 대상이 아니다.

## 적용 절차 (post-merge)

`AGENTS.md` 의 Post-Merge Runtime Validation 상 이 저장소의 런타임 동작 변경은 공유 서비스 재배포까지 마쳐야 완료다. 이 변경은 머지 큐 드라이버와 auto-merge 인롤러의 런타임 동작을 바꾸므로 해당된다. 아래 순서를 고정하고, 각 단계의 결과를 확인한 뒤에만 다음으로 넘어간다. 중간에 멈추면 이전 단계까지의 상태가 그대로 유지되며(재시작 전이면 구 코드가 계속 서비스), 처음부터 다시 실행해도 안전하다.

1. 머지된 `main` 체크아웃 확인 — `git -C <repo> log --oneline -1` 이 머지 커밋인지, 작업 트리가 clean 한지 확인한다.
2. 런타임 설정 정합 확인 — `~/.config/bdui/config.toml` 이 이 변경으로 바뀐 키를 쓰지 않음을 확인한다(이 스펙은 설정 스키마를 바꾸지 않으므로 변경 없음이 기대값이다).
3. `bdui-shared restart` 로 공유 서버를 재시작한다.
4. 재시작 검증 — 프로세스 실행 경로가 머지된 체크아웃(`<repo>/server/index.js`)인지, listening port 가 기대값인지, HTTP 응답이 정상인지 세 가지를 모두 확인한다. 하나라도 어긋나면 완료로 보고하지 않는다.
5. 머지 큐 정합성 확인 — 재시작 후 해당 워크스페이스의 `merge_queue` 항목이 하나도 없거나, 있다면 각 항목이 (a) `pr_wait` 멤버이거나 현재 external registry 행이고 (b) `queue`/`done` 과 겹치지 않는지 확인한다. 정상 external 항목은 설계상 `pr_wait` 멤버가 아니므로 `pr_wait` 멤버십만 요구하면 정상 상태를 실패로 판정하게 된다. 이 변경의 대상이 정확히 이 정합성이다.
