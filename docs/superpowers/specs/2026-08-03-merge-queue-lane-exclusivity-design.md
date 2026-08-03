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

### 3. halt 의 종료 보장 — `merge-queue.js`

`failAndDequeue` 가 head SHA 를 읽지 못할 때 무조건 halt 하는 대신, 그 bead 의 durable 레인 소속으로 갈라진다.

- **어느 durable 레인에도 없음** → 배제 기록 없이 즉시 `dequeue`. 변경 2 이후 인롤러도 수동 클릭도 그 bead 를 다시 넣을 수 없으므로, 배제 기록의 목적(재등록 차단)이 성립하지 않는다. 기록을 남길 자리도 없다 — `removeFromLanes` 가 레인 이탈 시 `auto_merge_skips` 를 이미 지운다(`queue-store.js:795-796`).
- **레인 멤버인데 head SHA 만 없음** → 기존 halt 유지(`halted_on_head` 설정). 레인 멤버는 폴러의 관측 대상이므로 재개 신호가 반드시 도착한다.

`processItem` 앞쪽의 배제 필터 halt(`merge-queue.js:542-556`)에도 같은 갈래를 적용한다. 그 경로는 `skipRecord` 가 있는 경우에만 도달하므로 레인 비멤버에게는 현재도 도달 불가하지만, 두 halt 지점이 서로 다른 규칙을 갖지 않게 맞춘다.

레인 조회는 드라이버가 이미 쓰는 `snapshot()` 한 번으로 끝나며 새 의존성을 만들지 않는다.

## 영향받는 기존 경로

- **external PR 의 자동 [정리]**(UI-7agi): `external && merged_tier` 자격 자체는 유지된다. 달라지는 것은 그 자격이 `queue`/`done` 멤버에게는 적용되지 않는다는 점뿐이다. 진짜 external 행은 `durable === false` 경로를 타므로 `done` 레인에 들어가지 않는다(`pr-actions.js:1355-1372`) — 정상 external 행은 이 변경의 영향을 받지 않는다.
- **`merge_queue` 멤버 관측 프룬 면제**(`pr-poller.js:525-534`): 그대로 둔다. 변경 3 이 관측 없는 head 를 배출하지만, 관측이 살아 있는 편이 배제 기록을 남길 수 있어 더 낫다.
- **드라이버의 다른 halt 원인**(persist 실패, `bumpRound` 실패): 변경 없음. 그 halt 들은 "다음 kick 이나 재시작이 재개한다"는 기존 계약을 그대로 유지한다.

## 회귀와 그 대가

워커로 완료된 bead 를 사람이 나중에 직접 새 PR 로 올리고 bd 를 `resolved` 로 되돌리면, 그 bead 는 `done` 에 남은 채 정당한 external 행이 된다. 변경 2 는 그 행을 external 자격에서 배제하므로 자동 [정리] 대상에서 빠진다.

이 경우 해소 경로는 남아 있다 — 그 bead 를 워커 레인으로 다시 넣으면(`moveToPrWait` 이 `removeFromLanes` 를 부르므로) `done` 에서 빠져 정상 처리된다.

이 대가를 받는 대신 durable 레인 배타성이 조건 없이 성립한다. 판별을 정교하게 하려면 `done` 엔트리에 PR URL 스냅샷을 넣어 동일성을 비교해야 하는데(`attempt` 에 `pr_url` 은 durable 필드가 아니다), durable 스키마를 늘리는 것은 이 버그의 표면인 "레인 간 상태 중복"을 오히려 키운다.

## 수용 기준

1. `done`/`queue` 레인 멤버는 `external: true` 엔트리로도 `merge_queue` 에 들어가지 않는다.
2. `overlaidPrWait` 이 `queue`/`done` 멤버를 external 행으로 얹지 않는다.
3. cleanup 성공 직후 그 bead 는 external registry 에서 사라진다.
4. 어느 durable 레인에도 없는 head 는 head SHA 관측 없이 큐에서 배출되고, 드라이버가 다음 항목으로 진행한다.
5. durable 레인 멤버인 head 는 head SHA 가 없을 때 기존대로 halt 하고, 관측이 도착하면 재개한다.
6. 정상 external 행(`durable === false`, 어느 레인에도 없음)의 머지·[정리] 경로에 회귀가 없다.
7. 기존 `server/worker/` 테스트 전량이 통과한다.

## Test scope

| # | seam | 파일 | RED 조건 |
| --- | --- | --- | --- |
| 1 | `enqueueMergeAuto` 가 `done` 멤버의 external 엔트리를 거부 | `queue-store.test.js` | 현재 코드에서 `merge_queue` 에 들어감 |
| 2 | `enqueueMerge` 가 `done`/`queue` 멤버의 external 엔트리를 거부 | `queue-store.test.js` | 현재 코드에서 `merge_queue` 에 들어감 |
| 3 | `overlaidPrWait` 이 `queue`/`done` 멤버에게 양보 | `merge-candidates.test.js` (신규) | 현재 코드에서 external 행으로 얹힘 |
| 4 | `externalPrStore.drop` 이 행을 제거하고 `list` 에서 사라짐 | `external-pr.test.js` | `drop` 부재 |
| 5 | `failAndDequeue` 가 레인 비멤버를 head SHA 없이 dequeue | `merge-queue.test.js` | 현재 코드에서 halt 하고 큐에 남음 |
| 6 | `failAndDequeue` 가 레인 멤버는 halt 유지 | `merge-queue.test.js` | 변경 3 도입 시 회귀 방지 |

seam 1·2·3·4·5 가 red-first 대상이다. seam 6 은 변경 3 이 기존 halt 를 과잉 제거하지 않음을 고정하는 회귀 방지용이므로 변경 전에도 통과할 수 있다.

seam 1 은 이번 재현 스크립트(`moveToDone` → `enqueueMergeAuto`)를 그대로 정식 테스트로 옮긴다. seam 3 은 `getWorkerRuntime().externalPrs` 싱글턴에 행을 넣어야 하므로, 기존 테스트가 쓰는 주입 방식을 따르되 없으면 registry 를 직접 `replace` 한 뒤 검사한다.

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
5. 머지 큐 상태 확인 — 재시작 후 해당 워크스페이스의 `merge_queue` 가 비어 있거나, 남아 있다면 그 항목이 실제 `pr_wait` 멤버인지 확인한다. 이 변경의 대상이 정확히 그 정합성이기 때문이다.
