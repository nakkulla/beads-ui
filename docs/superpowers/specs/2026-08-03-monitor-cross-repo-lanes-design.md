# 모니터 탭을 전체 레포 워커 통합 관제로 전환 (UI-qrfo)

- Bead: UI-qrfo
- Route: spec_backed
- 작성일: 2026-08-03

## 1. 문제

모니터 탭(UI-nprg)은 전체 활성 레포의 워커 파이프라인을 한 화면에 모으지만
**읽기 전용**이다. 단계별 섹션(실행중 · PR 대기 · 대기 · 완료·오늘)에 행을 나열할
뿐이고, 행을 클릭하면 그 레포로 workspace를 전환한 뒤 이슈 상세로 이동한다.
무엇을 실행할지, 자동화를 켤지 끌지는 전부 Worker 탭에서 레포를 하나씩 바꿔가며
해야 한다.

또 하나: 모니터 집계에는 **아직 실행되지 않은 후보가 아예 없다**. 집계 payload는
각 workspace의 워커 큐 스냅샷(`queue`/`pr_wait`/`done`/`attempts`)만 싣고, 실행
후보는 Worker 탭 클라이언트가 **현재 workspace의** Board 이슈 스토어에서 계산한다.
따라서 "spec 리뷰가 끝나 지금 실행할 수 있는 이슈"는 모니터에서 보이지 않는다.

세 번째: 모니터에는 토큰·비용 지표가 없다. Worker 탭은 완료 레인의 기간을 고르고
그 기간에 맞춘 토큰·비용 합계를 툴바에 표시하지만, 전 레포를 합친 값은 어디에도
없다.

## 2. 목표

1. spec 리뷰가 완료된 이슈를 모니터 탭에서 바로 대기 큐에 적재할 수 있다.
2. 행 나열을 Worker 탭과 같은 레인 구조로 바꾸되, 모든 활성 레포의 이슈를 한
   화면에서 관리한다.
3. 자동화(자동 진행 · 자동 머지)를 모니터 탭에서 끄고 켤 수 있다.
4. Worker 탭이 제공하는 조작을 모니터에서 전부 할 수 있다 — 모니터는 Worker 탭의
   크로스 레포 상위집합이 된다.
5. 전 레포를 합친 토큰·비용 합계를 표시하고, Worker 탭과 **같은 기간 어휘**로
   기간을 고를 수 있다. 기간을 바꾸면 완료 레인 카드와 합계가 함께 움직인다.

### 비목표

- Worker 탭 제거. 단일 레포 심층 작업(전체 후보 목록, 후보 필터·정렬, 트랜스크립트
  드로어)은 Worker 탭에 남는다.
- 후보 이슈 전체를 모니터에 싣는 것. 모니터는 **실행 자격을 갖춘 이슈만** 싣는다
  (§4).
- 새 자동화 축 신설. `auto_advance`/`auto_merge` 두 축을 그대로 쓴다.
- 새 기간 어휘 신설. `app/data/closed-range.js`의 `today`/`7d`/`30d`/`all`을
  재사용한다.

## 3. 관측된 현재 구조

| 항목 | 근거 |
| --- | --- |
| 모니터 집계는 서버 글로벌, workspace 전환에도 살아남음 | `server/ws/monitor-handlers.js` `SUBSCRIBERS` |
| 집계 payload = `decorateQueue()` 결과 + `root_dir`/`name` | `buildMonitorPipeline()` |
| 집계는 `attempts`를 통째로 싣고 `done` 배열에만 오늘 필터를 검 | `buildMonitorPipeline()` + `startOfLocalDay()` |
| workspace 단위 fail-quiet (한 레포가 터져도 나머지는 그림) | 같은 파일 §에러 처리 |
| 모든 worker mutation이 연결의 현재 workspace에 묶임 | `server/ws/worker-handlers.js` `workspaceKeyOf(ws)` |
| 큐·슬롯·자동화는 workspace마다 독립 | `server/worker/queue-store.js` |
| 적재 성공 시 그 workspace의 디스패치를 즉시 발화 | `handleWorkerQueuePlace()` 말미 `tickWorkerQueue(key)` |
| 실행 자격 최종 판정은 fail-closed admission (git 검사 포함) | `server/worker/admission.js` `validateAdmission()` |
| workspace 경로 허용 목록 검증 선례 | `server/ws/workspace-handlers.js` `handleSetWorkspace()` |
| 비동기 fill + 다음 스냅샷 전달 캐시 선례 | `server/worker/title-cache.js` |
| `bd list --status open --json` 1회에 `metadata` 통째로 실림 | 실측 144ms, 20 workspace 규모 |
| **Worker 탭에는 이미 완료 기간 select가 있고 툴바 KPI가 같은 기간을 따름** | `app/views/worker/index.js` `doneRangeTemplate()`, `token_total` |
| 기간 어휘는 Board Closed 컬럼과 공유 | `app/data/closed-range.js` |
| 전체 `queue.json`의 완료 엔트리 총합 | 실측 161개 (활성 레포 7곳 기준 ~83개) |
| 집계 push는 `onWorkerSnapshotRefresh` 이벤트로만 발화 — 주기 driver 없음 | `schedulePush()` / `ensureRefreshWired()` |
| 머지 후 배포·검증은 워커 sweep이 소유 (`deploy.json` 아님, 소비 코드 없음) | `server/worker/pr-actions.js` `postMergeVerify()` + deploy 단계 |
| beads-ui의 verify/deploy 설정이 이미 등록되어 있음 | `~/.config/bdui/config.toml` `[worker.verify]`·`[worker.deploy]` (`detached = true`) |

**Worker 탭은 목표 5가 요구하는 동작을 이미 갖고 있다.** 기간 select가 완료 레인
카드와 토큰 KPI를 함께 움직인다. 따라서 이 작업에서 Worker 탭의 기간·KPI 동작은
바꾸지 않고, 모니터를 같은 어휘에 맞춘다.

## 4. 실행 자격 (`runnable`)

집계 payload에 workspace마다 `runnable` 배열을 추가한다.

### 판정 조건

`bd list --status open --limit 1000 --json` 결과에서 다음을 **모두** 만족하는 이슈:

- `metadata.route ∈ {spec_backed, full_plan}`
- `metadata.spec_id`가 비어 있지 않은 문자열
- `metadata.spec_review`가 `<reviewer>@<40hex>` 형식
  (`/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/` — `admission.js`의 `ADMISSION_RECEIPT_RE`와
  같은 정규식; 두 곳이 다른 형식을 쓰면 표시와 실행이 어긋난다)
- phase child가 아님 (`parent` 필드가 있거나 id가 `.<숫자>`로 끝나면 제외 —
  `app/views/worker/index.js` `isPhaseChild()`와 같은 판정)
- 그 workspace의 `queue`/`pr_wait`/`done` 어디에도 없음

### 이것은 표시용 사전 필터다

`runnable`은 **git을 보지 않는다**. base 커밋에 spec 파일이 실제로 있는지,
영수증 SHA가 도달 가능한지, `gh`가 쓸 수 있는지는 기존 `validateAdmission()`이
적재 시점에 판정한다. 사전 필터가 git까지 검사하면 후보 수 × 레포 수만큼 git
프로세스가 돈다.

따라서 **표시 통과 → 적재 거부**가 정상 경로다. 거부는 지금과 똑같이
`queue.admission[bead_id]`에 기록되고 `⛔ 사유` 뱃지로 렌더된다. 카드는 그 자리에
남고, 사유가 카드에 붙는다.

### 캐시 (`server/worker/runnable-cache.js`)

`title-cache.js`의 패턴을 따른다.

- 읽기는 **동기**. 미스는 에러가 아니라 이번 스냅샷에서 생략되고, 비동기 fill이
  끝나면 fanout 콜백이 다음 스냅샷을 밀어준다.
- 성공 TTL 30초 (서버 `poll_interval_seconds` 기본값과 같은 눈금).
- 실패 TTL 60초. 읽을 수 없는 workspace가 매 스냅샷마다 `bd` 프로세스를 새로
  띄우지 않도록 한다.
- **모니터 구독자가 있을 때만** 갱신한다. 구독자가 0이면 fill을 걸지 않는다
  (`monitorPipelineSubscriberCount()`).
- 구독 시작 시 전 visible workspace에 대해 1회 즉시 fill.
- 큐 mutation이 성공한 workspace는 즉시 무효화한다 — 적재된 이슈가 `runnable`에
  30초 동안 남아 있으면 같은 이슈가 두 레인에 동시에 보인다. 무효화는
  `server/worker/queue-events.js`의 `onQueueChanged`를 `monitor-handlers.js`가
  직접 구독해 건다. mutation 핸들러(`worker-handlers.js`) 쪽에 거는 것이
  자연스러워 보이지만, `onQueueChanged`는 **실제 큐 변경에만** 발화하므로 무효화
  지점을 17곳에 흩지 않고 한 곳으로 모을 수 있고, 과도 무효화도 없다.

### 갱신 driver

TTL만으로는 부족하다. TTL은 "만료 후 조회가 오면 다시 읽는다"는 규칙일 뿐이고,
집계 push는 `onWorkerSnapshotRefresh` 이벤트로만 발화한다. 큐가 조용한 동안에는
push가 없고 → 캐시 조회가 없고 → fill이 걸리지 않는다. 다른 세션이 `spec_review`를
핀해도 모니터에는 **영원히** 나타나지 않는다.

따라서 모니터 구독자가 1명 이상인 동안 **주기 driver**를 돌린다: `poll_interval_seconds`
(기본 30초) 간격으로 전 visible workspace의 `runnable`을 refill하고 집계 push를
예약한다. 마지막 구독자가 떠나면 타이머를 멈춘다 — 아무도 보지 않는 동안 `bd`
프로세스를 돌릴 이유가 없다. `server/poller.js` `createPoller()`가 이미 "클라이언트가
있을 때만 틱한다 + `unref()`" 패턴을 갖고 있으므로 그것을 쓴다.

### 집계 payload 구조

payload에 workspace 배열 외에 `workspaces_state` 배열을 함께 싣는다. 각 항목은
`{ root_dir, name, auto_advance, auto_merge, slots, revision, exec_defaults }` —
**모든 visible workspace**를, 파이프라인이 비어 있든 아니든 예외 없이 싣는다.

세 가지가 이것을 요구한다.

1. **마스터 토글의 분모.** `⏵⏵ 전체 자동화 3/4`의 `4`는 visible workspace 수이고
   `3`은 두 축이 모두 켜진 수다. 파이프라인이 있는 레포만 실어서는 계산할 수 없다.
2. **빈 큐 레포의 그룹 헤더**(§6). 큐가 빈 레포의 자동화·슬롯을 조작하려면 그
   레포의 현재 상태가 payload에 있어야 한다.
3. **빈 레포의 CAS 제어.** 파이프라인이 빈 workspace는 무거운 배열에 없으므로
   그 레포의 그룹 헤더가 CAS 제어 넷(자동 진행 · 자동 머지 · 슬롯 · 실행 기본값)을
   보내려면 **그 workspace의 현재 `revision`**이 있어야 하고, 실행 기본값
   다이얼로그는 현재 `exec_defaults` 값을 그려야 한다. 이 둘이 없으면 빈 레포
   제어가 성립하지 않는다. 두 값은 `queue-store.js`의 `Queue`에 이미 있으므로
   (`revision: number`, `exec_defaults: Record<string, string>`) 새 상태를 만드는
   것이 아니라 이미 있는 것을 싣는 것이다.

무거운 필드(`attempts`/`queue`/`done`)는 `workspaces_state`에 싣지 않는다 — 상태
줄과 그룹 헤더 제어에 필요한 것은 위 일곱 필드뿐이다.

`hasPipeline()`(파이프라인이 빈 workspace를 무거운 배열에서 빼는 판정)에는
**`runnable`을 포함한다.** 포함하지 않으면 실행 대기 후보만 있고 큐·PR·완료가 없는
레포 — 즉 지금 막 실행하려는 바로 그 레포 — 가 집계에서 통째로 빠져 실행가능
레인에 나타나지 않는다. 목표 1을 정면으로 깨뜨리는 경로다.

## 5. mutation의 workspace 지정

### 헬퍼

```js
// server/ws/workspace-target.js (신규)
export function targetWorkspaceOf(ws, payload) { /* ... */ }
```

- `payload.root_dir`가 문자열이고 절대 경로면 `path.resolve()` 후
  `getAvailableWorkspaces()` 허용 목록과 대조한다. 목록에 없으면 `null`을 돌려주고,
  호출자는 `bad_request`로 거부한다. (`handleSetWorkspace()`와 같은 검증 규약)
- `payload.root_dir`가 없으면 기존대로 연결의 workspace(`workspaceKeyOf(ws)`).

### 적용

`server/ws/worker-handlers.js`의 mutation 핸들러 전부에서 `workspaceKeyOf(ws)`를
`targetWorkspaceOf(ws, payload)`로 교체한다. 대상:

`worker-queue-place` · `worker-queue-reorder` · `worker-queue-toggle` ·
`worker-queue-set-slots` · `worker-queue-set-exec-default` · `worker-queue-remove` ·
`worker-attempt-pause` · `worker-attempt-stop` · `worker-attempt-resume` ·
`worker-attempt-dismiss` · `worker-merge-queue-add` · `worker-merge-queue-add-all` ·
`worker-merge-auto-toggle` · `worker-merge-queue-remove` · `worker-pr-discard` ·
`worker-revise-fix` · `worker-revise-approve`

**새 액션 이름을 만들지 않는다.** `root_dir`은 선택 필드이므로 Worker 탭은 페이로드를
바꾸지 않아도 그대로 동작한다.

### 구독 채널은 건드리지 않는다

`subscribe-worker-queue`는 workspace별 구독이고 모니터는 서버 글로벌 집계를
따로 받는다. 모니터가 worker 큐 구독을 추가로 열지 않는다.

### CAS

`expected_revision`은 workspace마다 다르다. 모니터 클라이언트는 각 카드가 속한
workspace의 스냅샷 revision을 실어 보낸다. 충돌 시 재시도는 Worker 탭과 같은 규약
(응답에 실린 최신 queue로 갱신 후 1회 재시도)을 쓴다.

## 6. 자동화 마스터 토글

### 새 액션 `monitor-auto-toggle`

- 페이로드 `{ on: boolean }`. `root_dir`을 받지 않는다 — 대상은 항상 **모든 visible
  workspace**다.
- `on: true` → 각 workspace의 `auto_advance = true`, `auto_merge = true`
- `on: false` → 둘 다 `false`
- workspace마다 기존 두 핸들러가 부르는 것과 **같은 store 메서드**를 직접 호출한다
  — `queueStore().toggleAutoAdvance(key, …)`와 `queueStore().toggleAutoMerge(key, …)`.
  두 메서드가 이미 workspace key를 받으므로 새 코어를 만들 필요가 없고, 새 상태
  축도 만들지 않는다.
- 기존 핸들러의 두 부수효과를 그대로 재현한다:
  `auto_advance` ON은 그 workspace에 `tickWorkerQueue(key)`를 발화하고,
  `auto_merge` OFF는 `clear_waiting: true` + `keep: <현재 active>`로 한 번의 쓰기에
  플래그와 대기열을 함께 처리한다 (두 번의 쓰기 사이에 재시작이 끼면 "정지"인데
  대기열이 찬 상태가 남는다).
- **CAS를 쓰지 않는다.** `expected_revision`은 workspace마다 다르고, 클라이언트가
  20개 revision을 모두 알고 보낼 방법이 없다. 마스터 토글은 "전부 켜라/꺼라"는
  절대 명령이지 특정 이전 상태를 전제한 조건부 변경이 아니므로, 서버가 각
  workspace의 현재 revision을 읽어 적용한다.
- 레포별로 결과를 모은다. 일부가 실패해도 나머지는 진행하고, 응답에
  `{ applied: <성공 수>, failed: [{ root_dir, reason }] }`을 실어 실패한 레포를
  이름으로 보고한다.
- 완료 후 집계 push를 1회 예약한다.

### 끄기는 확인을 받는다

`auto_merge`를 끄면 그 workspace의 머지 대기열이 비워진다
(`handleWorkerMergeAutoToggle`). 마스터 OFF는 이 부작용을 전 레포에 한 번에
적용하므로, 클라이언트가 끄기 전에 확인 다이얼로그를 띄운다. 켜기는 확인 없이
진행한다.

### 버튼 표시

`⏵⏵ 전체 자동화 3/4` — 분자는 `auto_advance && auto_merge`가 모두 켜진 workspace
수, 분모는 visible workspace 수. 전부 켜져 있으면 `⏹ 전체 자동화`로 바뀐다
(Worker 탭 `⏵⏵`/`⏹` 표기와 같다).

### 레포별 제어

대기 레인의 각 레포 그룹 헤더가 그 레포의 workspace 단위 제어를 전부 싣는다 —
`▶/⏸`(`auto_advance`) · `🔀`(`auto_merge`) · 슬롯 수 · 실행 기본값 다이얼로그
진입점(`worker-queue-set-exec-default`). 조작 범위가 "Worker 탭 전 기능"이므로
workspace 단위 제어 중 어느 하나도 빠지지 않는다.

**그룹은 대기 큐가 빈 레포에도 렌더한다.** 큐에 항목이 있는 레포만 그리면 그
레포의 자동화·슬롯·실행 기본값을 조작할 방법이 사라진다 — 자동 진행이 꺼져 큐가
빈 레포가 바로 그 상태를 풀어야 하는 레포다. 빈 그룹은 헤더만 그리고 아래에
카드가 없다.

## 7. 완료 기간과 토큰·비용 합계

### 서버: 완료 레인의 오늘 필터를 제거한다

`buildMonitorPipeline()`이 `done`을 `startOfLocalDay()` 이후로 자르는 부분을
없애고 전체를 싣는다. 근거는 두 가지다.

1. 기간 선택이 클라이언트에 있으려면 클라이언트가 더 넓은 기간의 데이터를 갖고
   있어야 한다. Worker 탭이 이미 그 모델이다 — 서버는 `q.done` 전체를 보내고
   클라이언트가 기간으로 거른다.
2. 비용이 미미하다. 집계는 이미 `attempts`를 통째로 싣고 있고, 완료 엔트리는 전
   레포를 합쳐 실측 161개다.

`hasPipeline()`은 필터 제거 후의 `done` 전체를 기준으로 하게 되므로, 과거 완료
기록만 있는 레포도 무거운 배열에 남는다. 그 레포의 완료 **카드**가 화면에 뜰지는
클라이언트의 기간 필터가 정한다. 대기 레인의 레포 그룹 헤더는 이 판정과 무관하게
`workspaces_state`(§4)가 그리므로, 완료 기록이 기간 밖이어도 그 레포의 자동화·
슬롯 제어는 그대로 남는다.

`startOfLocalDay()`는 더 이상 집계에서 쓰이지 않으므로 제거하고, 그 export에
걸린 테스트도 함께 정리한다.

### 클라이언트: 기간 select

`app/data/closed-range.js`의 `CLOSED_RANGE_OPTIONS`(`오늘`/`최근 7일`/`최근 30일`/
`전체`)와 `closedRangeSince()`를 그대로 쓴다. 기본값은 `DEFAULT_CLOSED_RANGE`
(`today`). 선택값은 `bdui.monitor.done-range` 키로 localStorage에 남긴다 (Worker
탭의 `bdui.worker.done-range`와 별개 — 두 탭이 서로 다른 기간을 볼 수 있어야
한다).

select는 상단 바에 둔다. Worker 탭은 완료 pane의 `controls` 스트립에 두지만,
모니터에서는 이 기간이 완료 레인과 토큰 KPI **둘 다**를 지배하므로 둘을 함께
포함하는 상단 바가 맞는 자리다.

기간을 바꾸면 완료 레인 카드와 토큰 합계가 함께 움직인다.

### 토큰·비용 합계

Worker 탭 `token_total`과 **같은 산식**을 쓴다. 다른 산식을 쓰면 같은 레포에 대해
두 탭이 다른 숫자를 말하게 된다.

- 합산 대상: 선택 기간에 완료된 이슈들의 attempt usage 합계. **전 레포를 합친다.**
- 4개 usage 필드를 전부 누적한다 (행 배지와 같은 산식).
- 보고된 0과 아예 보고되지 않은 usage는 다른 사실이다. 아무도 보고하지 않았으면
  합계를 그리지 않는다.
- 비용은 **합산 대상 전부가 비용을 보고했을 때만** `$`를 붙인다. 일부만 보고한
  합계에 금액을 붙이면 토큰과 돈이 서로 다른 모집단을 말하게 되고, 읽는 쪽에는
  그 차이가 보이지 않는다.
- 표기는 `formatUsageTotalWithCost()`, 툴팁은 Worker 탭과 같은 문구 — "선택 기간에
  완료된 이슈들이 **생애 전체에** 쓴 토큰 누적(입력+출력+캐시). 이 기간에 소모된
  양이 아니다." 이것은 코호트 합계이지 기간 내 소모량이 아니며, 그 사실을 툴팁이
  말해야 한다.

레포별 소계는 두지 않는다. 전체 합계 하나만 상단 바에 싣는다.

## 8. 레이아웃

### 상단 바

전역 자동화 마스터 · 전체 카운트(실행 N · 대기 N · PR N) · 완료 기간 select ·
전 레포 토큰·비용 합계.

레포 필터는 두지 않는다. 대기 레인이 이미 레포별 그룹이고 나머지 레인은 카드
뱃지로 레포를 말하므로, 필터는 같은 구분을 세 번째 방식으로 다시 하는 것이 된다.

### 5개 레인

`실행가능` · `대기` · `실행중` · `PR 대기` · `완료`

- **대기 레인만** 레포별 그룹으로 나눈다. 그룹 헤더는 §6 「레포별 제어」의 네
  제어를 싣고, 큐가 빈 레포에도 렌더한다. 순번(`#1`, `#2`)은 그 레포 큐 안에서의
  자리이므로 그룹 안에서만 뜻이 있다.
- 나머지 네 레인은 레포를 섞고 카드마다 레포 뱃지를 단다.
- `완료` 레인은 상단 바에서 고른 기간을 따른다. 레인 제목도 그 기간을 말한다
  (`완료·오늘` / `완료·최근 7일` / …).

### 배타 우선순위

한 버드는 한 레인에만 그린다. 우선순위는 `running > pr_wait > queue > runnable >
done`. 현재 `buildSections()`의 배타 규약을 유지하되 `runnable`이 `queue`와 `done`
사이에 들어간다 — 실행중인 버드는 `queue` 레인에도 남아 있고, conflict-resolution
attempt는 `pr_wait` 소속 버드에서도 돌기 때문에 배타 없이 그리면 같은 버드가 두
레인에 나타난다.

### 템플릿 재사용

`app/views/worker/lanes.js`의 `paneTemplate` · `miniRow` · `candidateCard`를 그대로
쓴다. 모니터 전용으로 새로 만드는 것은 레인 빌더와 레포 그룹 헤더뿐이다. 두 탭이
같은 템플릿을 쓰므로 한쪽에 추가된 뱃지가 다른 쪽에도 따라온다.

`miniRow`/`candidateCard`에 레포 뱃지를 실으려면 `MiniItem`에 선택 필드
`workspace_name`/`root_dir`을 더한다. 값이 없으면 뱃지를 그리지 않으므로 Worker
탭 렌더는 바뀌지 않는다.

### 조작

| 레인 | 행동 | 액션 |
| --- | --- | --- |
| 실행가능 | 대기 큐 적재 | `worker-queue-place` |
| 대기 | 그룹 안에서 순서 변경, 제거, REVISE 처분 | `worker-queue-reorder` · `worker-queue-remove` · `worker-revise-fix` · `worker-revise-approve` |
| 실행중 | 일시정지, 중단, 재개, 실패 attempt 정리 | `worker-attempt-pause` · `worker-attempt-stop` · `worker-attempt-resume` · `worker-attempt-dismiss` |
| PR 대기 | 머지, 취소, 폐기 | `worker-merge-queue-add` · `worker-merge-queue-remove` · `worker-pr-discard` |
| 완료 | cleanup 재시도 머지만 (폐기는 제공하지 않는다) | `worker-merge-queue-add` |
| 대기 그룹 헤더 | 자동 진행, 자동 머지, 슬롯, 실행 기본값 | `worker-queue-toggle` · `worker-merge-auto-toggle` · `worker-queue-set-slots` · `worker-queue-set-exec-default` |

§5가 열거한 17개 mutation 액션이 이 표에서 모두 도달 가능해야 한다 — 도달 경로가
없는 액션이 남으면 "Worker 탭 전 기능"이라는 범위 결정이 지켜지지 않은 것이다.
`worker-merge-queue-add-all`은 PR 대기 레인 헤더의 일괄 버튼이 쓴다. 완료 레인의
머지 버튼은 Worker 탭과 같은 의미다 — 이미 머지된 항목의 **cleanup 재시도**이며,
같은 자리에 폐기를 함께 두지 않는다 (`lanes.js` `miniRow`의 done 변형 규약).

실행가능 카드의 실행 버튼은 적재만 한다. 별도의 "즉시 실행" 경로는 만들지 않는다 —
`handleWorkerQueuePlace`가 적재 성공 후 이미 `tickWorkerQueue()`를 부르므로, 자동
진행이 켜진 레포에서는 적재만으로 슬롯이 비는 즉시 실행된다. 자동 진행이 꺼진
레포에서는 대기 레인에 서 있고, 그 이유는 그룹 헤더의 `⏸` 표시가 말한다.

행 클릭 시 이슈 상세로 가는 기존 동작(workspace 전환 후 이동)은 유지한다.

## 9. 파일

| 파일 | 변경 |
| --- | --- |
| `server/worker/runnable-cache.js` | 신규 — TTL 캐시 + 비동기 fill |
| `server/ws/workspace-target.js` | 신규 — `targetWorkspaceOf()` |
| `server/ws/monitor-handlers.js` | 집계에 `runnable`·`workspaces_state` 포함, `hasPipeline()`에 `runnable` 반영, `done` 오늘 필터 제거, `startOfLocalDay()` 제거, 구독 중 주기 refill driver(`createPoller`), `monitor-auto-toggle` 핸들러 |
| `server/ws/worker-handlers.js` | mutation 핸들러의 workspace 해석 교체 |
| `server/ws/connection.js` | `monitor-auto-toggle` 라우팅 |
| `server/ws/context.js` | `emitMonitorPipelineSnapshot()` envelope에 `workspaces_state` 직렬화 |
| `app/protocol.js` | `MessageType`에 `monitor-auto-toggle` 추가 |
| `app/main.js` | `monitor-pipeline-snapshot` 핸들러가 `workspaces_state`를 store로 전달 |
| `app/data/monitor-pipeline-store.js` | `workspaces_state` 보관 |
| `app/views/monitor/index.js` | 레인 구조로 재작성, 기간 상태 + 토큰 합계 |
| `app/views/monitor/lanes.js` | 신규 — 레인 빌더 + 레포 그룹 헤더(4개 제어) + 상단 바 |
| `app/views/worker/exec-defaults-dialog.js` | 그룹 헤더에서 여는 진입점 재사용 (다이얼로그 자체는 그대로) |
| `app/views/monitor/row.js` | 제거 (템플릿을 `worker/lanes.js`로 대체) |
| `app/views/worker/lanes.js` | `MiniItem`에 선택 필드 `workspace_name`/`root_dir` |
| `app/styles.css` | 모니터 레인 · 그룹 헤더 · 상단 바 스타일 |

Worker 탭(`app/views/worker/index.js`)의 기간·KPI 동작은 바꾸지 않는다 — 이미 목표
5의 동작을 갖고 있다.

## 10. 에러 처리

- **workspace 단위 fail-quiet 유지.** 한 레포의 스냅샷이나 `runnable` 조회가
  터져도 로그만 남기고 나머지를 그린다 (`buildMonitorPipeline()`의 기존 규약).
- **허용 목록 밖 `root_dir`은 `bad_request`.** 경로 주입으로 등록되지 않은
  디렉터리를 건드릴 수 없다.
- **마스터 토글 부분 실패는 진행 + 보고.** 실패한 레포를 이름으로 돌려준다.
- **`runnable` 미도착은 빈 레인.** 서버가 그 키를 보내지 않는 구버전에서는 레인이
  비어 보일 뿐 렌더가 깨지지 않는다 (fail-quiet).
- **`added_at`이 없는 완료 엔트리는 기간으로 판정할 수 없다.** Worker 탭과 같은
  처리 — 기간 필터에서 제외한다.
- **CAS 충돌은 1회 재시도.** Worker 탭과 같은 규약.

## 11. Test scope

RED → GREEN 시임:

1. `server/worker/runnable-cache.test.js` (신규) — 판정 조건 필터
   (route/spec_id/영수증 형식/phase child/이미 큐에 있는 버드 제외), TTL 만료,
   실패 TTL, 큐 mutation 후 무효화.
2. `server/worker/runnable-cache.driver.test.js` (신규) — **주기 driver**: 큐
   이벤트가 하나도 없는 상태에서 fake clock을 `poll_interval_seconds`만큼 진행하면
   refill과 push가 일어나는지 (이것이 §4 "갱신 driver"가 없을 때 실패하는 RED),
   마지막 구독자가 떠나면 타이머가 멈추는지, 구독자 0에서는 애초에 틱하지 않는지.
3. `server/ws/workspace-target.test.js` (신규) — 허용 목록 밖 절대 경로 거부,
   상대 경로 거부, `root_dir` 부재 시 연결 workspace로 폴백, 심볼릭/`..` 포함
   경로가 resolve 후 대조되는지.
4. `server/ws/monitor-handlers.test.js` (기존 파일 확장) — 집계 payload에
   `runnable`이 workspace별로 실리는지, `done`이 더 이상 오늘로 잘리지 않는지,
   구독자 0일 때 fill을 걸지 않는지, **`runnable`만 있고 큐·PR·완료가 모두 빈
   workspace가 집계에 남는지**(`hasPipeline()`에 `runnable`이 빠졌을 때 실패하는
   RED), **`workspaces_state`가 파이프라인이 빈 레포까지 포함해 모든 visible
   workspace를 싣는지**, hidden workspace가 양쪽 모두에서 빠지는지.
5. `server/ws/monitor-auto-toggle.test.js` (신규) — 전 visible workspace에 적용,
   hidden workspace 제외, 일부 실패 시 나머지 진행 + 실패 목록 보고,
   **ON이 각 workspace에 `tickWorkerQueue()`를 발화하는지**,
   **OFF가 `clear_waiting` + `keep: <active>`로 머지 대기열을 정리하는지**
   (§6이 명시한 두 부수효과 각각의 RED), CAS 없이 현재 revision으로 적용되는지.
6. `server/ws/worker-handlers.workspace-target.test.js` (신규) — §5가 열거한 17개
   mutation 액션을 **table-driven으로** 검증한다. 각 액션에 대해: `root_dir`을
   실으면 그 workspace의 큐가 바뀌고 연결 workspace는 그대로인지, 허용 목록 밖
   `root_dir`은 `bad_request`인지, `root_dir` 부재 시 기존 동작이 유지되는지.
   단일 액션만 검증하면 나머지 16개의 `workspaceKeyOf` 잔존을 잡지 못한다.
7. `app/views/monitor/lanes.test.js` (신규) — 레인 빌더의 배타 우선순위
   (`running > pr_wait > queue > runnable > done`), 대기 레인의 레포 그룹 분할,
   그룹별 순번, **대기 큐가 빈 레포도 그룹 헤더가 렌더되는지**, 기간별 완료 레인
   필터, `added_at` 없는 엔트리 제외.
8. `app/views/monitor/usage.test.js` (신규) — 전 레포 토큰 합계, 일부만 비용을
   보고했을 때 `$` 미표시, 아무도 보고하지 않았을 때 합계 미표시, 기간 변경 시
   합계 변경.
9. `app/main.monitor.e2e.test.js` (기존 파일 확장) — 실행가능 카드 클릭이 올바른
   `root_dir`을 실어 보내는지, 마스터 토글 OFF의 확인 다이얼로그, 기간 select
   지속성, 그룹 헤더의 네 제어(자동 진행·자동 머지·슬롯·실행 기본값)가 각각
   해당 액션을 그 레포의 `root_dir`로 보내는지.

기존 `app/views/monitor/index.test.js`의 `buildSections` 테스트는 새 레인 빌더
테스트로 교체된다. `row.test.js`는 제거된다.

## 12. 적용 절차

### 머지 전 (이 유닛의 PR 안에서)

번들은 **PR 커밋에 들어간다**. 머지 후에 빌드해서 "커밋에 포함"하는 것은 불가능한
순서다 — 이미 머지된 PR에는 그 산출물이 들어가지 않고, 중간에 멈추면 `main`이
소스와 번들이 어긋난 상태로 남는다.

1. 프론트엔드 소스 편집을 마친다.
2. `npm run build` — `app/main.bundle.js`와 `app/main.bundle.js.map`을 갱신한다.
3. 갱신된 번들을 소스와 **같은 PR에** 커밋한다.
4. `npm run all`(tsc/lint/prettier/test)이 green인지 확인한다.

### 머지 후 (워커 sweep이 소유한다)

머지 후 절차는 수동 마감이 아니다. 이 저장소의 머지 후 작업은 **워커 머지 sweep의
verify·deploy 단계**가 소유하며, 등록 위치는 `deploy.json`이 아니라 이 저장소
워커 고유의 런타임 설정이다 (`server/` 어디에도 `deploy.json` 소비 코드가 없다).

관측된 현재 설정 (`~/.config/bdui/config.toml`):

- `[worker.verify."<beads-ui 절대경로>"] cmd = ["npm","run","all"]`
- `[worker.deploy."<beads-ui 절대경로>"] cmd = ["bdui-shared","restart"], detached = true`

sweep의 고정 순서와 각 단계의 실패 처리 (`server/worker/pr-actions.js`):

1. **base sync** — 머지된 base로 로컬 체크아웃을 ff-only 동기화한다.
2. **post-merge verify** — 머지된 base 커밋을 detached worktree에 펼치고
   `npm run all`을 돌린다. 실패는 `cleanup_failed.step='verify'`로 기록된다.
3. **deploy 재검증** — 로컬 체크아웃이 방금 검증된 base가 아니면
   `deploy_base_not_synced`로 멈춘다. 배포 직전에 다시 확인하는 이유는, 배포는
   특정 SHA가 아니라 **로컬 체크아웃 내용**에 대해 실행되기 때문이다. 검증한 것과
   배포하는 것이 다른 상황이 배포하지 않는 것보다 나쁘다.
4. **deploy** — `bdui-shared restart`. `detached = true`인 이유는 이 명령이 워커를
   호스팅하는 프로세스 자신을 죽이기 때문이다. 발사 **전에** `last_deploy`를 atomic
   기록하므로 프로세스가 죽어도 기록이 남는다.

중단 안전성: 각 단계는 앞 단계의 결과를 재확인하고 진행하며, 실패는
`cleanup_failed`(단계명 · 사유 · 로그 tail · 로그 경로)와 `last_deploy`에 남아 Worker
탭 배지로 보인다. 어느 단계에서 멈춰도 `main`은 소스와 번들이 일치하는 상태이고
(번들이 PR 안에 있으므로), 무엇이 멈췄는지가 기록에 남는다.

### 머지 후 처분 (계약 요구)

`bdui-shared restart`와 그 선행 검증은 **이미 등록되어 있다** — 등록 매체가
`deploy.json`이 아니라 이 저장소 워커 자신의 `[worker.verify]`/`[worker.deploy]`
설정일 뿐이고, 계약이 요구하는 성질("머지 후 필수 작업이 조용히 유실되지 않을 것")은
충족된다. 실패는 `cleanup_failed`로, 실행 사실은 `last_deploy`로 가시화된다.

`deploy.json`을 새로 만드는 것은 이 저장소에서 **아무 효과가 없다** — 읽는 코드가
없으므로 등록처럼 보이는 장식이 될 뿐이다. 따라서 `deploy.json` 등록 · 분리 ·
`worker-ineligible` 세 처분 중 어느 것도 추가로 필요하지 않다.

남는 잔여는 하나다: `detached = true`이므로 워커는 재시작 **이후의 서빙 상태**
(프로세스 경로 · 포트 · HTTP 응답 · 서빙 번들 해시)를 확인하지 않는다. 그래서
`last_deploy`는 그 경우 `deployed`가 아니라 `launched`로 기록된다 — 근거 없는
"배포됨"을 주장하지 않기 위해서다. 이 잔여 확인은 Worker 탭의 `last_deploy` 배지를
보고 사람이 수행하며, 이 유닛이 새로 만드는 갭이 아니라 저장소의 기존 조건이다.

## 13. 검증

`npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
`npm run build`. 이 fork에서는 GitHub Actions가 트리거되지 않으므로 로컬 검증이 CI
역할을 대신한다 (AGENTS.md).
