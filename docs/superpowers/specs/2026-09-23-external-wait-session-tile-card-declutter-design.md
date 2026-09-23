---
scope:
  - server/worker/runnable-cache.js
  - server/worker/wait-judgment.js
  - server/worker/notify.js
  - app/protocol.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/detail-panel/index.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 세션 소유 외부 대기는 실행 중 레인의 세션 타일이고, 외부 대기 카드는 좌표 칩을 상세에 넘기며 조작을 foot에 둔다

- Bead: UI-l48z (`spec_backed`)
- 작성: 2026-09-23 · r0
- 조사 기준: `origin/main` `981479567120c4039ffb3a137d1bf583b5ac84ac`

## 1. 요구와 확인한 현재 동작

UI-z437(2026-09-21-external-wait-same-bead-fork-resume-design.md, ADR은 UI-u6ud-7이
승계)이 착지한 뒤 사용자가 2026-09-23 후보 탭에서 외부 작업 대기 카드 세 장
(Analysis-owzn·ops-pyg·PROSTATE-8vf)을 보고 여섯 가지를 지적했다. 각 지적에 대해
코드에서 확인한 원인은 다음과 같다.

| 지적 | 확인한 원인 |
|---|---|
| 머리줄 칩이 잘린다 (`복.`·`b…`·`✅ 완…`) | `.worker-card__head`는 640px 초과 폭에서 `flex-wrap: nowrap`이고(`styles.css:6731`), 머리줄 `.ctl-chip`과 대기 배지 `summary`는 `overflow: hidden; white-space: nowrap; text-overflow: ellipsis`다(`:4693`·`:4707`). 줄바꿈 규칙은 `@media (max-width: 640px)` 블록(`:8690`)에만 있다. 외부 대기 카드는 이 한 줄에 `세션 권장`/`worker-ineligible` + `복잡` + 영역 라벨 + 대기 배지 + 조작 버튼 2~3개를 싣는다(`lanes.js:4201`–`4256`). `.rtile__hd`도 같은 `nowrap`이다(`:4213`). |
| `관찰 중단`이 무엇인지 모른다 | 서버 `/stop`이다: 관찰기를 멈추고 `external_wait` 키를 지워 `stage='stopped'`로 닫는다. 잡은 건드리지 않는다. 버튼 라벨은 `wait-judgment.js:303`이 만들고 `title`이 없어(`lanes.js:2453`–`2465`) 카드만 보면 뜻을 알 수 없다. 완료 뒤(`completing`)에도 같은 라벨이라 "이어가지 않고 대기를 푼다"는 뜻이 드러나지 않는다. |
| 로그·잡 번호는 카드에 없어도 된다 | UI-z437 §7 슬롯 5가 `ssh <host>`·잡 번호(복사)·`log <path>`(복사)를 카드에 그리라고 정했고 `externalWaitCardParts`(`lanes.js:3671`)가 그린다. 상세 패널 `externalJobsTemplate`(`detail-panel/index.js:2259`)은 같은 재료를 잡·상태·exit·expected·로그 표로 이미 편다. |
| 모니터링은 어떻게 하나 | 사용자가 할 일이 없다. 관찰기가 slurm 120초·process 30초 주기로 자동 관찰하고(UI-z437 §3), 카드 슬롯 7이 `마지막 확인 · 다음`을 보인다. `[지금 확인]`은 관찰 1회를 앞당기는 조작이다. 상세 패널 표에는 조작이 없다. |
| 후보 레인보다 실행 중 레인이 낫다 | 대기 레코드는 "Bead가 이미 있는 레인 항목"에 붙는다(`lane-model.js:4746`–`4783`). Worker 소유 대기는 `waiting/external_job` attempt의 보류 타일이 실행 중 레인에 서고 그 bead는 `claimed`라 후보에서 빠진다. 세션 소유 대기는 세션이 `대기 · external:` 종결에서 `in_progress → open`을 쓰므로(UI-z437 §6.1) `session_active`(`runnable-cache.js:521`, `status === 'in_progress'`만)에서 빠지고 `bd ready` 행으로 후보 레인에만 남는다. |
| 세션에서 이어갈 수 있어야 한다 | 완료 출구는 `[이어하기]`(Worker fork, Bead를 Worker가 `in_progress`로 클레임)와 `[새 세션으로]`뿐이다(`wait-judgment.js:306`–`325`). 사람이 자기 세션에서 이으려면 상세 패널 세션 이력의 `session_ref` 행(8자 ID, 전체는 hover, `⧉ 재개` 명령 복사 — `session-history.js:1046`)까지 가야 한다. 카드에는 세션 ID가 없다. Discord 완료 알림(`notify.js:569`)도 Bead ID와 잡 요약만 싣는다. |

확인한 사실 둘이 설계를 단순하게 한다.

- **세션 타일이라는 선례가 있다.** `runnable-cache.js qualifySession`은 세션이
  `in_progress`로 잡은 Bead를 `session_active`로 투영하고, `lane-model.js:3506`–
  `3600`이 그것을 `kind: 'session'` 타일로 실행 중 레인에 세운다(2026-08-24
  monitor-session-active-route-chip 스펙 §5·§6). 이 타일은 attempt가 없고, Bead
  metadata `session_ref`를 서버가 `session_refs`(provider·8자 ID·host·locality)로
  투영해 `▤ 세션` 버튼과 세션 정체 칩 `.ctl-chip--sref`를 그린다(`running-grid.js:1052`·
  `:1195`). 두 탭이 같은 `session_active`를 받는다(`worker/index.js:4756`,
  `monitor-handlers.js:984`).
- **세션 ID는 이미 Bead에 있다.** 세션은 대기 종결에서 route pin과 나머지 metadata를
  유지하므로(UI-z437 §6.1) `session_ref`가 남아 있고, `session_active` 투영이 그것을
  `session_refs`로 만든다. `projectExternalWait`(`attach.js:129`)가 "소유 세션 데이터
  없이" 투영한다는 경계를 바꿀 필요가 없다.

## 2. 사용자 결정 (2026-09-23)

1. 세션 소유 외부 대기 카드는 후보 레인이 아니라 실행 중 레인에 둔다.
2. 카드에는 배지·한 줄 요약·시각 줄만 남기고 `log`·잡 번호·`ssh` 칩은 상세 패널로 보낸다.
3. 머리줄 칩이 잘리지 않게 줄을 넘긴다.
4. 세션 소유 대기는 카드에서 세션 ID를 클릭 한 번으로 복사할 수 있어야 하고, `세션 권장`
   Bead는 세션에서 잇는 쪽이 1순위다. Worker fork 출구는 이름으로 구분한다.
5. 완료 뒤 `[관찰 중단]`은 "이어가지 않고 대기를 푼다"로 읽히게 한다.

## 3. 접근 대안과 선택

**세션 소유 대기의 자리.**

- *(선택) `external_wait` 키가 있는 `open` Bead를 서버가 `session_active`로 투영하고,
  클라이언트는 기존 세션 타일 경로로 실행 중 레인에 세운다.* 재료(제목·라벨·route·
  `session_refs`)와 타일 껍데기가 모두 있다. 후보 제외는 기존 `claimed` 집합이 한다.
  ADR UI-u6ud-8의 "후보 레인은 미착수 이슈의 관측 집합"과 맞는다 — 외부 대기 Bead는
  세션이 일하고 결과를 기다리는 **착수된** Bead다.
- *클라이언트가 대기 레코드만으로 타일을 만든다.* 제목·라벨·`session_refs`를 다른
  경로(후보 행·오버레이)에서 끌어와야 하고, Worker 탭(Board live store)과 Monitor
  탭(runnable-cache)의 후보 원천이 달라 두 조립 규칙이 필요하다.
- *후보 레인 안에 "외부 대기" 구획을 둔다.* 후보의 `↴ 대기로`가 뜻 없는 카드가
  후보 집합에 남고, Worker 소유 대기와 자리가 갈린다.

**세션에서 잇는 출구.**

- *(선택) 세션 정체 칩 클릭 = 세션 ID 복사, Discord 완료 알림에 재개 명령 한 줄.*
  사용자 요청 그대로이고 새 조작 슬롯이 없다. 재개 명령 복사는 상세 패널 세션
  이력의 `⧉ 재개`가 이미 한다.
- *카드에 `⧉ 재개 명령` 버튼을 더한다.* 조작이 하나 늘고, 모바일에서는 알림의
  명령 줄이 같은 일을 한다.

**조작 자리.**

- *(선택) 슬롯 6 foot.* 카드 문법 §5.1은 파킹 처분 버튼(`세션에서 해결`·`폐기`)을
  이미 held 타일의 `.rtile__foot`에 둔다. 외부 대기의 네 조작도 "이 대기를 어떻게
  처분하나"라 같은 종류다. 머리줄에서 빠지면 배지가 잘릴 이유가 사라진다.
- *머리줄 유지 + 줄바꿈만.* 조작 3개가 다음 줄로 내려가 제목 위에 뜬다 — 조작
  묶음이 자기 줄 오른쪽 끝에 남는 모바일 규칙과 어긋난다.

## 4. 설계

### 4.1 세션 소유 외부 대기는 실행 중 레인의 세션 타일이다

**서버 (`runnable-cache.js`).** 한 행을 판정하는 같은 pass에서 `metadataOf(row).external_wait`가
비어 있지 않은 문자열이면 `qualify()`를 건너뛰고 `qualifySession()`으로 보낸다.
`qualifySession`은 `status === 'in_progress'` 조건을 "`in_progress`이거나
`external_wait` 키가 있는 `open`"으로 넓히고, 반환 `status`에 행의 실제 상태
(`'in_progress'|'open'`)를 싣는다. `SessionActiveItem.status` typedef를 그렇게 넓힌다.
그 밖의 필드(`session_refs`·`workflow`·`labels`·`blocked_by`)는 지금 그대로다.
`deferred`·`closed` 행은 지금처럼 어느 버킷에도 들지 않는다. 모니터 덱의 레인
카운트(`deck.js:536`, `session_active` → `세션`)에는 이 행이 세션으로 잡힌다 —
세션이 잡고 기다리는 Bead이므로 그 열이 맞다.

Worker 소유 대기(`external_wait` 키가 있고 `waiting/external_job` attempt가 있는
Bead)도 이 규칙으로 `session_active`에 실린다. 클라이언트가 그 bead를 먼저 보류
타일로 세우고 `claimed`에 넣으므로(`lane-model.js:3318`–`3332`) 세션 타일 루프의
`claimed.has(bead_id)` 검사(`:3512`)가 중복을 막는다 — 지금 "서버가 뺐지만 클라이언트가
한 번 더 막는다"는 주석의 규칙 그대로다.

**클라이언트 (`lane-model.js`).** 세션 타일 루프는 `status: entry.status`를 싣는다
(지금은 `'in_progress'` 리터럴). `external_by_bead` 계산(`:4746`)은 레인 루프 앞으로
옮기고, 세션 타일 루프에서 `external_by_bead`에 소유가 `session`인 살아 있는
레코드(`stage ∈ {hold, detached, completing}`)가 있으면 타일에 `external_wait: record`를
바로 붙인다. 뒤의 부착 루프(`:4757`–`4783`)는 `running`을 이미 돌므로 결과는 같다;
앞에서 붙이는 이유는 타일 조립 시점에 `external_wait` 유무로 아래 필드를 정하기
위해서다.

- `started_at`·`updated_at`: 외부 대기 타일은 싣지 않는다. 경과는 잡 제출 시각 기준
  `경과`가 슬롯 3 headline에 있고(UI-z437 §7), 세션이 살아 있지 않으므로 타일 경과를
  돌리면 멈춘 것이 일하는 것처럼 읽힌다(running-grid 주석 "대기 중인 타일에 시계를
  돌리면").
- `badges: []`, `alert: false`, `draggable: false`, `can_pause/can_resume: false`,
  `exec_chips: null`, `usage`·`legs`는 지금 세션 타일과 같다.

Worker 탭의 후보 행(`workspace-adapter.runnableRows()`)은 Board live store의
`bd ready` 행이라 이 bead를 계속 싣는다. 후보 루프의 `claimed.has(bead_id)`
검사(`:3989`)가 세션 타일이 먼저 잡은 bead를 건너뛰므로 후보 카드는 사라진다.
`session_active`가 아직 그 행을 싣지 않은 스냅샷(캐시 갱신 사이)에서는 지금처럼
후보 카드가 대기 배지·본문·조작(§4.3)을 단 채 서고, 다음 스냅샷에서 타일로 옮겨
간다 — 어느 순간에도 대기가 화면에서 사라지지는 않는다.

**타일 렌더 (`running-grid.js runningTile`).** `externalWaitCardParts(tile)`의
`badge`가 비어 있지 않으면 — 즉 `wait_reasons`에 `external_job` 사유가 있으면, 레코드
(`tile.external_wait`) 유무와 무관하게 — 다섯째 held 상태 `external_wait`다:
`held = parked || retry_wait || waiting || provider_hold || external_wait`, `waiting` 뒤에
배타로 판정한다(Worker 소유 대기는 `waiting` attempt라 `waiting`으로 먼저 잡히고
`external.badge`가 배지를 대신하는 지금 동작 그대로다). 레코드 없이 `external_wait`
키만 남은 Bead는 `wait_record_missing` 사유(`wait-judgment.js:386`)만 갖는데, 그
사유의 `⛔ 조치 필요` 배지와 `[관찰 중단]` 출구도 같은 경로로 타일에 선다 — 레코드를
술어로 삼으면 §5의 그 출구가 사라진다. 세션 타일(`kind: 'session'`)에서
`external_wait`이면:

| 슬롯 | 그리는 것 |
|---|---|
| 1 정체성 | 상태점(`rtile__dot--session`) · 레포 배지(Monitor) · ID · `P n` · **`직접 세션` 배지 대신** 외부 대기 배지(`⏳ 외부 작업` / `✅ 완료 · 이어하기 대기` / `⚠ 지연 · …` / `⛔ 조치 필요 · …`, `externalWaitBadgeText` 그대로) · 대화형 세션 배지 |
| 1 조작 | `▤ 세션`(보존 세션 transcript; `sessionOpenButton(session_current)`, locality 규칙 그대로). 경과 라벨 없음. **외부 대기 조작은 여기 두지 않는다** |
| 2 제목 | 제목 |
| 3 진행 | `wait_body_lines.body` — headline(`<host> 작업 <id> · <state> · 경과 <h>h<mm>m`)·release·오류 줄. 세션 타일의 활동 줄(`monitor_body` "갱신 n 전")은 그리지 않는다 |
| 4a·4b | 지금 세션 타일과 같다(`decoratedBlockedBy` 등 재료가 있을 때만) |
| 5a·5b | route 칩 · `↩ from` · **세션 정체 칩(§4.4, 클릭 = 복사)** · `복잡`·영역 칩. 좌표 칩(`ssh`·잡 번호·`log`)은 없다(§4.2) |
| 6 foot | `.rtile__foot`에 외부 대기 조작(§4.3) |
| 7 시각 | `wait_body_lines.times` — `제출 <t> · 마지막 확인 <t> · 다음 <t>` 또는 `완료 <t>` |

클래스는 `rtile--session rtile--held rtile--compact rtile--external-wait`다.
Worker 소유 보류 타일(`waiting` + `external_wait`)은 슬롯 1 조작에서 외부 대기
조작만 foot으로 내려가고(§4.3) 좌표 칩이 빠지는(§4.2) 것 외에 바뀌지 않는다.

### 4.2 카드에서 좌표 칩을 빼고 상세 패널이 잡 표로 편다

`externalWaitCardParts`(`lanes.js:3671`)의 `chips`(`ssh <host>`·잡 번호 복사·`log <path>`
복사)와 `externalCopyChip`을 지운다. 소비처 넷 — `candidateCard`(`:4151`·`:4256`)·
`miniRow`(`:3254`)·`runningTile`(`:1070`·`:1210`·`:1512`) — 에서 `external.chips`
참조를 걷어 `worker-chips--coords` 줄의 표시 조건에서도 뺀다. 카드에 남는 외부
대기 재료는 배지(슬롯 1)·headline·release·오류 줄(슬롯 3)·시각(슬롯 7)·조작
(슬롯 6)이다. headline이 이미 호스트와 잡 번호를 말한다.

상세 패널 `externalJobsTemplate`(`detail-panel/index.js:2259`)은 그대로 잡 표를
그린다 — `잡` 열은 이미 `ssh_host · job_id`(process 잡은 pid)를 쓰므로(`:2304`)
바꾸지 않는다. 더하는 것은 둘이다: 표 아래에 외부 대기 조작 줄(§4.3의 같은 버튼, 같은
`data-external-wait-op` 계약)을 두고, `로그` 열의 경로를 클릭 = 복사 버튼으로 만든다
(지금 카드의 `externalCopyChip`과 같은 복사·토스트 동작; 기존 `copyText`를 쓴다).
표는 지금처럼 `stage ∈ {hold, detached, completing}` 레코드에만 그려지므로 `/stop` 뒤
(`stopped`)에는 사라진다 — §4.3의 `[대기 해제]` 툴팁이 그 사실을 말한다.
상세 패널의 `[data-external-wait-op]` 클릭은 Worker·Monitor 탭의 기존 처리기
(`worker/index.js:1731`·`monitor/index.js:341`)가 `mount_element` 안을 위임으로 받고
있으므로 상세 패널이 그 탭의 `mount_element` 안에 있으면 그대로 닿는다; 아니면
상세 패널 자신이 같은 op·payload로 같은 요청 함수를 부른다 — 구현이 실측해 한
경로로 맞추고 테스트에 남긴다.

### 4.3 외부 대기 조작은 슬롯 6 foot이고 라벨·툴팁이 뜻을 말한다

**자리.** `waitReasonLines`가 만드는 외부 대기 조작(`external_wait_check`·
`external_wait_stop`·`external_wait_resume`, `lanes.js:2444`–`2465`)은 세 렌더러
모두에서 슬롯 6으로 간다.

- `runningTile`: `.rtile__hd-actions`의 `wait_lines.map((line) => line.actions)`에서
  외부 대기 조작을 빼고, held 타일의 `.rtile__foot`(파킹 처분 버튼과 같은 자리)에
  둔다. 다른 종류의 대기 조작(`▶ 재개`·`↻ 지금 재시도` 등)은 자리를 바꾸지 않는다.
- `candidateCard`: 외부 대기 사유가 있으면(`external.badge`가 비어 있지 않으면, 레코드
  유무와 무관하게) foot의 `↴ 대기로` 대신 외부 대기 조작을 그린다 — `external_wait`
  키가 입장을 막아 그 버튼은 뜻이 없다.
  `.worker-card__head-actions`의 외부 대기 조작은 지운다.
- `miniRow`(큐·직렬 레인 행): 카드 변형의 foot(`.worker-mini__actions`가 서는 줄)에
  둔다.

버튼 클래스·`data-*` 계약·클릭 처리기는 그대로다 — 자리만 바뀐다.

**라벨과 툴팁 (서버 `wait-judgment.js`).** `WaitReason.actions[]` 원소에 선택 필드
`title: string`을 더하고(`protocol.js` typedef 동반), 카드는 있으면 버튼 `title`로
싣는다. 외부 대기 네 조작:

| stage | op | label | title |
|---|---|---|---|
| `hold`·`detached` | `external_wait_check` | `[지금 확인]` | `관찰을 지금 한 번 더 한다 (다음 예정 <t>)` — `<t>`는 `next_observation_at` |
| `hold`·`detached` | `external_wait_stop` | `[관찰 중단]` | `beads-ui가 이 작업을 더 지켜보지 않고 대기 키를 지운다 · 잡은 그대로` |
| `completing` | `external_wait_stop` | `[대기 해제]` | `이어가지 않고 대기 키를 지운다 · 잡은 그대로 · 이 대기의 표시는 카드와 상세에서 사라진다` |
| `completing` | `external_wait_resume` (fork) | `[워커로 이어가기]` | `Worker가 보존 세션을 fork해 이어간다 — 이후 소유는 Worker` |
| `completing` + `resume.error` | `external_wait_resume` (fresh) | `[새 세션으로]` | `fork 없이 완료 페이로드로 새 Worker 세션을 연다` |

`wait_record_missing` 갈래(`:386`–`399`)의 `[관찰 중단]`은 title
`레코드가 없는 대기 키를 지운다`를 단다. 서버가 라벨의 유일한 원천이라
`wait-judgment.test.js`의 라벨 기대와 클라이언트의 `.replace(/^\[|\]$/g, '')`는
그대로다.

**세션 권장 Bead의 1순위.** 세션 소유 `completing` 타일에서 `[워커로 이어가기]`는
Bead에 `session-preferred` 라벨이 있으면 `op-btn`(보통), 없으면 `op-btn op-btn--primary`다.
release 줄(`wait-judgment.js:286`)은 세션 소유일 때
`완료 · 세션 칩을 눌러 ID를 복사해 그 세션에서 잇거나 [워커로 이어가기]`로 바꾼다.
`session-preferred` 판정 재료는 타일의 `labels`(서버 `session_active`가 실음)다;
Monitor·Worker 어느 탭도 같은 재료다.

**어휘 표.** `wait-vocabulary.js` `external_job` 행의 `release`·`action`을 위 라벨로
맞춘다(`[지금 확인] · [관찰 중단]/[대기 해제] · [워커로 이어가기] · 재개 실패 시 [새 세션으로]`).
대표 사유 순서·글리프·`elapsed_word`는 그대로다.

### 4.4 세션 정체 칩은 클릭 = 세션 ID 복사

`running-grid.js:1195`의 세션 정체 칩(`.ctl-chip--sref`, 라벨 `<provider> · <8자>`)을
`<span>`에서 `<button type="button">`으로 바꾸고, 클릭은 `session_current.session_id`
전체를 클립보드에 복사해 `복사됨`/`복사 실패` 토스트를 낸다(`copyToClipboard`·
`showToast`, 카드의 다른 복사 칩과 같은 동작). `title`은 지금 값
(`<provider>:<id>@<host>[ · 이력 n]`) 뒤에 ` · 클릭하면 세션 ID 복사`를 잇는다.
`event.stopPropagation()`으로 타일 기본 클릭(상세 열기)을 막는다. 모든 세션 타일에
적용한다 — 외부 대기 타일만 다른 칩을 갖게 하지 않는다.

Discord 완료 알림(`notify.js notifyExternalWaitCompleted`)은 `record.owner.kind === 'session'`
일 때 `record.owner.session_ref`를 `parseSessionRef`로 읽어 마지막 항목의
`sessionResumeCommand(entry)`(`session-ref.js:293`)가 null이 아니면 메시지 끝에
` · 세션 <provider> <8자>`와 줄바꿈 뒤 재개 명령 한 줄을 붙인다. 파싱 실패·unsafe
ID면 지금 메시지 그대로다(fail-quiet). Worker 소유는 자동 fork라 바꾸지 않는다.

### 4.5 머리줄은 전 폭에서 줄을 넘기고 칩은 글자를 잃지 않는다

`@media (max-width: 640px)` 블록(`styles.css:8690`–`8700`)에 있는 두 규칙을
미디어쿼리 밖 공통 규칙으로 올린다.

- `:is(.worker-card__head, .worker-mini__head, .worker-mini__row1, .rtile__hd) { flex-wrap: wrap; }`
  — `.worker-card__head`(`:6731`)·`.rtile__hd`(`:4213`)의 `flex-wrap: nowrap`을 지운다.
- 머리줄 `.ctl-chip`(`:4693`)과 대기 배지 `summary`(`:4714`)에서 `overflow: hidden`·
  `white-space: nowrap`·`text-overflow: ellipsis`를 걷고 `white-space: normal;
  overflow-wrap: anywhere`를 준다 — UI-pw2g §3.2가 칩 줄에 적용한 같은 규칙이다.
  전체 값을 싣는 `title`은 그대로다.

조작 묶음(`.worker-card__head-actions`·`.rtile__hd-actions`)의 `margin-left: auto`는
그대로라 wrap된 줄에서도 자기 줄의 오른쪽 끝에 남는다. 열린 배지의
`flex-basis: 100%`와 레포 배지 12ch 해제(UI-nr86)는 그 폭의 `.chip-popover`가 정적
블록이라는 전제 위에 있으므로 미디어쿼리 안에 그대로 둔다.

### 4.6 카드 문법 스펙 정정

`2026-08-25-card-header-grammar-unify-design.md` §2와 §5.1에 `**정정(UI-l48z).**`
문단을 더한다: 외부 대기 조작 넷은 슬롯 1 조작이 아니라 슬롯 6이다(파킹 처분
버튼과 같은 판정 — 이 대기를 어떻게 처분하나). 슬롯 5a의 "외부 작업 번호"·ssh
호스트·슬롯 5b의 외부 대기 `log` 복사는 카드에서 빠지고 상세 패널 잡 표가 갖는다.
세션 정체 칩은 클릭 = 세션 ID 복사다. 머리줄은 모든 폭에서 줄을 넘긴다.
UI-z437 §7의 슬롯 표는 이 정정으로 읽는다 — 그 스펙 파일은 고치지 않는다.

### 4.7 바꾸지 않는 것

- 결정: 대기 레코드 투영 `projectExternalWait`와 `EXTERNAL_WAIT_FIELDS`는 바꾸지 않는다
  — 세션 ID는 Bead metadata `session_ref`의 `session_refs` 투영이 이미 싣고, 소유
  세션 데이터를 레코드 투영에서 빼는 경계(`attach.js:127`)는 유효하다.
- 결정: `[워커로 이어가기]`·`[새 세션으로]`의 서버 동작(`/resume` fork·fresh, 클레임,
  완료 페이로드)은 바꾸지 않는다 — 라벨과 자리만 바뀐다.
- 결정: `/stop`의 동작은 바꾸지 않는다 — 라벨·툴팁만 stage별로 갈린다.
- 관찰기 주기·hold 예산·admission의 `external_wait` 거절은 그대로다.

## 5. 오류 처리와 fail-quiet

- `session_refs`가 비면(metadata `session_ref` 부재·malformed) 세션 정체 칩과 `▤ 세션`은
  서지 않고 타일은 배지·본문·조작만 그린다. Discord 알림도 재개 명령 줄 없이 나간다.
- `external_wait` 키는 있는데 레코드가 없는 Bead는 지금처럼 `⛔ 조치 필요 · 대기 레코드
  없음`과 `[관찰 중단]`(title `레코드가 없는 대기 키를 지운다`)을 갖는다. 이 Bead도
  §4.1 규칙으로 `session_active`에 실려 실행 중 레인에 선다 — 조치 필요가 후보에
  묻히지 않는다.
- `session_active` 행이 있는데 레코드가 없는 순간(레코드가 `stopped`로 닫힌 직후,
  키 unset readback 전)은 `external_wait` 없는 `open` 세션 타일이 된다. 다음 스냅샷에서
  키가 사라지면 후보로 돌아간다. 타일에 대기 배지가 없으면 `직접 세션` 배지 대신
  `⏳ 외부 작업 · 레코드 확인 중`은 그리지 않는다 — 재료 없는 줄은 그리지 않는다.
- `runnable-cache` 행에 metadata가 없거나 `external_wait`가 문자열이 아니면 지금처럼
  `qualify()`로 간다.

## 6. 검증과 수용 기준

**단위 테스트 (RED seam — 변경 전에 실패한다).**

- `server/worker/runnable-cache.test.js`: `external_wait` 키가 있는 `open` 행은 `items`가
  아니라 `session_active`에 `status: 'open'`으로 실리고 `session_refs`를 갖는다;
  `in_progress` 행은 지금과 같다; `external_wait`가 빈 문자열·비문자열이면 `items`다.
- `app/views/worker/lane-model.test.js`: 소유 `session`인 살아 있는 레코드 + `session_active`
  `open` 행 → `running`에 `kind: 'session'`·`external_wait` 타일, `runnable`에 같은
  bead 없음; Worker 소유(`waiting/external_job` attempt) + `session_active` 행 → 보류
  타일 하나만; `session_active`에 없고 레코드만 있으면 후보 카드에 레코드 부착.
- `app/views/worker/running-grid.test.js`: 외부 대기 세션 타일은 `직접 세션` 배지·경과
  라벨·활동 줄이 없고 외부 대기 배지·headline·times가 있으며 조작은 `.rtile__foot`
  안, `.rtile__hd-actions` 안에는 없다; 레코드 없이 `wait_record_missing` 사유만 있는
  세션 타일도 `⛔ 조치 필요` 배지와 foot의 `[관찰 중단]`을 갖는다; 세션 정체 칩은 `button`이고 클릭이 전체
  세션 ID를 복사한다; `session-preferred` 라벨 유무로 `[워커로 이어가기]`의
  `op-btn--primary`가 갈린다; `external.chips`가 그려지지 않는다.
- `app/views/worker/lanes.test.js`: `candidateCard`에 `external_wait`가 있으면 foot에
  외부 대기 조작이 있고 `↴ 대기로`와 머리줄 조작이 없다; `externalWaitCardParts`가
  `chips`를 돌려주지 않는다; 조작 버튼이 서버 `title`을 싣는다.
- `server/worker/wait-judgment.test.js`: stage별 라벨(`[관찰 중단]`/`[대기 해제]`/
  `[워커로 이어가기]`)과 `title`, 세션 소유 `completing`의 release 문장.
- `server/worker/notify.test.js`: 세션 소유 완료 알림에 세션 8자와 재개 명령 줄이
  붙고, Worker 소유·unsafe ID에서는 지금 메시지다.
- `app/views/detail-panel/index.test.js`: 잡 표 아래 조작 줄이 있으며 로그 셀이 복사
  버튼이다(`잡` 열의 호스트 표기는 기존 동작이라 seam이 아니다).
- `app/views/worker/wait-vocabulary.test.js`: `external_job` 행의 `action`·`release`.
- `app/styles.worker-theme.test.js`: 머리줄 wrap과 no-ellipsis 규칙이 미디어쿼리 밖에
  있다(기존 CSS 정적 검사 방식).

**스크린샷.** 공유 서버 또는 워크트리 `BDUI_FRONTEND_MODE=live`에서 세션 소유 대기 중
(`detached`)·완료(`completing`)·조치 필요(`resume.error`) 세 상태의 실행 중 레인
타일을 데스크톱 폭과 390px iframe으로 캡처하고, 같은 Bead가 후보 레인에 없음을
확인한다. 머리줄에 잘린 칩이 없어야 한다.

**수용 기준.**

1. 세션 소유 외부 대기 Bead는 Worker·Monitor 두 탭에서 실행 중 레인의 세션 타일로만
   보이고 후보 레인에는 없다.
2. 외부 대기 카드 어디에도 `ssh`·잡 번호·`log` 칩이 없고, 상세 패널 표가 호스트·잡·
   상태·exit·expected·로그(복사)와 조작 줄을 갖는다.
3. 외부 대기 조작은 세 렌더러 모두 foot에 있고 stage별 라벨·툴팁이 §4.3 표와 같다.
4. 세션 타일의 세션 정체 칩 클릭이 전체 세션 ID를 복사한다. 세션 소유 완료 Discord
   알림에 재개 명령이 있다.
5. 640px 초과 폭에서 카드·타일·행 머리줄의 칩과 배지가 말줄임 없이 줄을 넘긴다.
6. Pre-Handoff Validation(`npm run tsc`·`lint`·prettier·vitest) 전 항목 통과.

## 7. 구현 unit 후보

1. `server-session-active` — `runnable-cache.js` 버킷 규칙·typedef, `wait-judgment.js`
   라벨·title·release, `protocol.js` typedef, `notify.js` 재개 명령 줄.
2. `client-tile-and-cards` — `lane-model.js` 세션 타일 필드·레코드 선부착, `running-grid.js`
   held 상태·슬롯·foot·sref 복사 칩, `lanes.js` chips 제거·foot 조작·title,
   `wait-vocabulary.js`, `detail-panel/index.js` 표·조작·복사, `styles.css` 머리줄,
   카드 문법 스펙 정정.

## 경계·후속

- 관찰: 상세 패널 세션 이력의 `⧉ 재개` 명령 복사를 카드에도 두는 안 — 세션 칩 복사와
  Discord 명령 줄로 같은 일이 되므로 이번 범위 밖.
- 관찰: Worker 소유 보류 타일(`waiting/external_job`)에도 `▤ 세션`을 두는 안 — attempt
  세션 로그는 상세 세션 이력이 열므로 이번 범위 밖.
- 관찰: `.rtile__hd`·`.worker-mini__row1`의 다른 nowrap 자식(`.rtile__elapsed` 등)은
  이 스펙이 건드리지 않는다 — 잘림이 관측된 것은 칩과 배지다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-8 — (0014에서 통합한 조항) 새 요소의 자리는 공유 슬롯 표가
  정한다; §4.6이 그 표를 정정한다. (0033에서 통합한 조항) "후보 레인은 미착수 이슈의
  관측 집합이고 실행 안전은 서버 admission이 지킨다"는 결정과 `admitted`·사실 필드·
  세그먼트·`include_unadmitted` 규칙은 그대로 따른다. (UI-mfm1에서 통합한 조항)
  Worker와 Monitor의 후보 행은 lane-model 한 경로가 접는다; 후보 제외도 그 경로의
  `claimed` 집합 하나로 한다. 뒤집는 것은 한 조항 — "`runnable-cache`의 채택 조건은
  셋뿐이다(`bead_id`·`open`·phase child 아님)" — 이며, `external_wait` 키가 있는
  `open` 행을 후보 버킷에서 `session_active` 버킷으로 옮기는 넷째 조건을 더한다(§4.1).
- 전제: ADR UI-u6ud-7 — UI-a5l2-2를 거쳐 승계한 UI-z437 조항 중 `external_wait` 상태·Worker 한 런타임의
  관찰·완료·알림·재개 소유·hold 예산·`대기 · external:` 종결·"세션 소유는 알림 뒤
  `[이어하기]`, 자격 실패는 launch 없이 사람의 `[새 세션으로]`"(라벨만 바뀌고 동작
  유지)·대기 어휘의 `external_job` 종류와 배지 순서는 그대로다. 뒤집는 것은 그 승계
  조항 중 "소비자 카드 표면" 하나다 — UI-z437 §7 슬롯 표의 슬롯 1 조작(넷)과 슬롯 5
  좌표 칩(`ssh`·잡 번호·`log`)을 §4.6대로 슬롯 6 foot과 상세 패널로 옮긴다.
- 세션 소유 외부 대기 Bead는 `external_wait` 키 하나를 술어로 후보 레인이 아니라
  실행 중 레인의 세션 타일에 서고, 외부 대기 조작은 슬롯 6 foot, 좌표 칩은 상세
  패널의 것이다. **되돌리기 어렵다**: 서버 `session_active` 버킷 규칙, 두 탭의
  `claimed` 조립, 타일의 held 상태, 카드 문법 슬롯 표 정정, `wait-judgment` 라벨을
  소비하는 테스트·어휘 표가 함께 움직여야 하고, 사용자가 보는 자리가 바뀌므로 코드만
  되돌려도 원상복구가 아니다. **맥락 없이는 놀랍다**: `bd ready`에 나열되는 `open`
  Bead가 후보에 없고 실행 중 레인에 "세션 타일"로 서는데 세션 프로세스는 없다.
  **실제 절충**: §3의 세 대안 — 클라이언트 단독 조립(두 후보 원천), 후보 구획
  (뜻 없는 `↴ 대기로`), 머리줄 유지(조작이 제목 위로) — 를 기각했다.
  이 결정은 ADR UI-u6ud-8의 "채택 조건은 셋뿐" 조항과 ADR UI-u6ud-7이 UI-z437에서
  승계한 "소비자 카드 표면" 조항을 뒤집고 두 ADR의 나머지 조항은 위 전제 줄대로
  승계한다.
  `summary`: "세션 소유 외부 대기 Bead는 external_wait 키를 술어로 후보 레인이 아니라 실행 중 레인의 세션 타일에 서고, 외부 대기 조작은 슬롯 6 foot이며 좌표 칩은 상세 패널 잡 표가 갖는다" → ADR, supersede UI-u6ud-8·UI-u6ud-7
