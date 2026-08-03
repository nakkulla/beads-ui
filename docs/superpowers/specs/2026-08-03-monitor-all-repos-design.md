# 모니터 탭 전체 활성 레포 집계 — 워커 파이프라인 통합 조회 (UI-nprg)

- Bead: UI-nprg · route: spec_backed
- 목업: `http://<ts-ip>:9000/2026-08-03-monitor-all-repos.html` (사용자 승인됨, 2026-08-03)

## 배경과 목표

현재 모니터 탭은 WS 연결의 현재 workspace 하나에만 스코프된 `in-progress-issues`
구독(bd `--status in_progress`)과 현재 workspace의 워커 큐 조인으로 렌더된다.
사용자가 원하는 모니터의 본질은 **"worker 탭에 올린 이슈들이 전체 활성 레포에서
어떻게 진행되고 있는가"**의 단일 대시보드다.

이 작업은 모니터 탭의 데이터 소스를 워커 파이프라인 집계로 교체한다:

- 대상: **visible workspace 전체** (workspace picker 노출 목록과 동일; 숨김 제외).
  파이프라인이 완전히 빈 workspace는 화면·payload에서 생략.
- 범위: **전체 파이프라인** — 대기(`queue`) / 실행중(running attempts) /
  PR 대기(`pr_wait`, external PR overlay 포함) / 완료(`done` 중 **당일 진입분**).
  `done` 레인은 전체 이력을 보존하므로(Worker 탭은 클라이언트 기간 필터 사용)
  모니터의 "완료·오늘"은 집계 시점 필터로 구현한다 — 아래 서버 설계 참조.
- 레이아웃: **단계별 섹션 + 레포 뱃지** (레포별 그룹이 아님).
- 기존의 bd `in_progress` 이슈 목록 표시는 모니터에서 제거한다(보드 탭은 무변경).
  수동(비워커) in_progress 이슈는 더 이상 모니터에 나타나지 않는다 — 사용자
  확인된 의도.

## 서버 설계 — `monitor-pipeline` 집계 구독

### 프로토콜

`subscribe-worker-queue` 패턴을 따르는 전용 메시지 3종을 `app/protocol.js`
`MessageType`에 추가한다:

- `subscribe-monitor-pipeline` — 구독 시작. payload 없음(connection workspace와
  무관한 서버 전역 구독).
- `unsubscribe-monitor-pipeline`
- `monitor-pipeline-snapshot` — 서버→클라이언트 push. 항상 전체 스냅샷.

### 집계 빌더

새 모듈 `server/ws/monitor-handlers.js` (worker-handlers와 동일한 위상):

1. `getAvailableWorkspaces()`(registry-watcher)로 후보 workspace 목록을 얻고
   visible-workspaces-store의 숨김 집합을 제외한다.
2. 각 workspace에 대해 **기존 worker-queue 스냅샷 빌더를 그대로 재사용**해
   decorated 스냅샷을 만든다(큐 스토어는 이미 서버 전역 싱글턴, workspace 키별
   `queue.json`). worker-handlers의 스냅샷 조립 로직(데코 포함)을 공용 함수로
   추출해 양쪽에서 호출한다 — 복제하지 않는다.
3. `done` 레인을 **서버 로컬 자정(당일 시작) 기준 `added_at` 필터**로 당일
   진입분만 남긴다. 빈 workspace 판정은 이 필터 **이후**에 수행한다: 필터 후
   `queue`/`pr_wait`/`done`이 모두 비고 running attempt도 없는 workspace는
   결과에서 생략한다(과거 `done`만 있는 workspace는 생략됨).

payload 형태 (레인 병합은 클라이언트 담당):

```json
{
  "type": "monitor-pipeline-snapshot",
  "workspaces": [
    {
      "root_dir": "/abs/path",
      "name": "beads-ui",
      "queue": [],
      "pr_wait": [],
      "done": [],
      "attempts": {},
      "pr_observations": {},
      "bead_titles": {},
      "bead_times": {}
    }
  ]
}
```

workspace별 객체는 기존 `worker-queue-snapshot`의 **decorated 계약 전체**를
그대로 담는다(공용 빌더 재사용의 귀결; `admission`·`cleanup_failed` 등 모니터가
안 쓰는 필드는 클라이언트가 무시). 위 예시는 모니터가 실제로 소비하는 필드만
열거한 것이다: PR 번호는 `pr_wait` overlay 행과 `pr_observations`에서, 제목은
`bead_titles`에서, 완료 종류는 `attempts`에서 파생한다. `name`은 workspace 경로
basename. `done`만 위 3번의 당일 필터가 적용된 사본이다.

### push 트리거와 구독자 관리

- 구독자 집합: 서버 전역 `Set<ws>` (worker-handlers의 per-workspace
  `SUBSCRIBERS` 패턴의 전역 버전). connection의 `set-workspace` 전환과 무관하게
  유지되고, 연결 종료 시 정리된다.
- push 트리거: 어느 workspace든 `onQueueChanged` 발생 시 + workspace 가시성
  변경 시 + registry 변경 시 → **~250ms debounce** 후 집계 재계산, 전체 스냅샷을
  모든 구독자에 push. 부분 패치 없음.
- **external PR poller demand 반영**: external PR registry 갱신과 PR observation
  poller는 현재 `server/index.js`가 `workerQueueSubscriberCount`(per-workspace
  worker-queue 구독자 수)로 게이트한다. 모니터 전역 구독자가 1명 이상이면 **모든
  visible workspace가 poll demand를 가진 것으로 합산**하도록 이 게이트를
  확장한다(예: `getSubscriberCount(ws)` = worker-queue 구독자 수 + (모니터
  구독자 존재 && ws visible ? 1 : 0)). 또한 모니터 구독 시작 시와
  가시성·registry 변경 시 external PR refresh를 트리거해 다른 workspace의
  overlay가 누락·stale 되지 않게 한다.
- 특정 workspace의 스냅샷 구성·데코레이션이 실패하면 그 workspace만 생략하고
  서버 로그 경고를 남긴다(fail-quiet) — 한 레포 장애가 전체 모니터를 죽이지
  않는다.

### 무변경 표면

`worker-queue`(워커 탭), `in-progress-issues`/`resolved-issues`/`closed-issues`
(보드 탭) 구독, per-workspace `SubscriptionRegistry`, `set-workspace` 흐름은
변경하지 않는다.

## 프론트 설계 — 모니터 뷰 개편

### 데이터 소스

- `app/main.js`의 `MONITOR_SUBS`(in-progress-issues 구독)와 모니터의
  `queueStore` 조인 주입을 제거한다.
- 새 스토어(예: `app/data/monitor-pipeline-store.js`)가
  `subscribe-monitor-pipeline`을 열고 `monitor-pipeline-snapshot`을 보관,
  구독자에게 통지한다. 모니터 탭 진입 시 구독·이탈 시 해제(기존
  `ensureMonitorSubscriptions(active)` 위치를 대체).

### 렌더링

`app/views/monitor/index.js`·`row.js`를 새 데이터 모델로 개편:

- 섹션 순서: **실행중 → PR 대기 → 대기 → 완료·오늘**. 빈 섹션은 숨김. 전체가
  비면 "진행 중인 워커 작업 없음" empty state 1줄.
- 레인 판정(모두 payload에서 파생, 클라이언트 병합) — **버드당 1개 섹션의 배타
  우선순위 `실행중 > PR 대기 > 대기 > 완료`**를 적용한다. 실행중인 버드는
  `queue` 레인에 그대로 남아 있고(레인 이탈은 PR 전달 시점), conflict-resolution
  attempt는 `pr_wait` 소속 버드에서 돌 수 있으므로, 상위 판정에 잡힌 버드는
  하위 섹션에서 제외한다:
  - 실행중: `attempts` 중 status `running`인 attempt가 있는 버드(일반 실행이든
    conflict-resolution이든).
  - PR 대기: `pr_wait` 레인(+external overlay 행) 중 실행중이 아닌 버드.
  - 대기: `queue` 레인 중 실행중·PR 대기가 아닌 버드.
  - 완료·오늘: `done` 레인(서버 당일 필터 적용분) 중 위 세 섹션에 없는 버드.
- 행 구성: 단계색 스파인(3px) → **workspace 이름 뱃지** → 버드 ID(mono) → 제목
  → 우측 라이브 지표:
  - 실행중: heartbeat 점(로그 단절 시 흐림, 값 없으면 미표시 — 기존 fail-quiet
    규칙 유지)·경과 시간(1초 tick 유지)·모델·토큰 사용량.
  - PR 대기: PR 번호(`pr_wait` overlay 행·`pr_observations`에서 파생),
    external PR이면 `외부 PR` 칩. 번호를 알 수 없으면 번호 없이 렌더(fail-quiet).
  - 대기: 큐 순번(`#n`, 디스패치 순서).
  - 완료: 완료 종류·완료 시각(`added_at`). 완료 종류는 해당 버드의 최신
    terminal attempt(`attempts`)의 `done_kind`에서 파생하고, 매칭되는 attempt가
    없으면 종류 표기를 생략한다(fail-quiet). 정상 종류는 success 색, 비정상
    종류는 warn 색.
- 섹션 내 정렬: 실행중 `last_event_at` 내림차순 / 대기 큐 순서 유지 / PR 대기
  레인 순서 유지 / 완료 완료 시각 내림차순.
- 스타일: 기존 `.mon-*` 클래스와 디자인 토큰을 확장 재사용. 신규 색은 기존
  토큰(`--stage-*`, `--accent-*`)만 참조.

### 행 클릭

- 현재 workspace의 행: 기존대로 `gotoIssue(id)` 즉시 이동.
- 다른 workspace의 행: **workspace picker와 동일한 `set-workspace` 전환 경로를
  재사용**해 해당 workspace로 전환 완료 후 `gotoIssue(id)`로 이슈 상세를 연다.
  전환 실패 시 이동하지 않고 조용히 중단(콘솔 경고만).

### fail-quiet

- 제목 데코 누락 시 버드 ID만 표시.
- 알 수 없는 payload 필드·레인 항목은 무시.

## 에러 처리 요약

| 지점 | 동작 |
| --- | --- |
| workspace 스냅샷 구성 실패(서버) | 해당 workspace 생략 + 로그 경고 |
| 데코레이션 실패(서버) | 데코 없는 스냅샷으로 진행 |
| set-workspace 전환 실패(프론트) | 이동 중단, 콘솔 경고 |
| 스냅샷 미수신/빈 payload(프론트) | empty state 표시 |

## Test scope

RED→GREEN 허용 seam (spec_backed seam 권한):

1. **서버 집계 빌더** (`server/ws/monitor-handlers` 신규 테스트):
   - visible 필터 적용·숨김 workspace 제외를 검증.
   - `done` 당일 경계 필터를 검증: 자정 직전 `added_at` 엔트리는 제외되고 직후
     엔트리는 포함됨(날짜 경계 RED).
   - 빈 파이프라인 workspace 생략을 검증 — **과거 `done`만 있는 workspace가
     생략되는 케이스 포함**.
   - 한 workspace 빌드 실패 시 나머지 workspace가 유지됨을 검증.
   - payload가 공용 스냅샷 빌더의 decorated 계약(`pr_observations`·
     `bead_titles`·`bead_times` 포함)을 유지함을 검증.
2. **push 트리거·poller demand** (동일 모듈 + `server/index.js` 게이트):
   - `onQueueChanged`·가시성 변경 후 debounce를 지나 스냅샷이 push됨을 검증.
   - 구독 해제·연결 종료 시 구독자 정리를 검증.
   - **모니터 구독만 있는 상태(worker-queue 구독 0)에서 visible workspace의
     external PR poll demand가 활성화됨**을 검증(monitor-only RED).
3. **프론트 모니터 뷰** (`app/views/monitor/*.test.js` 개편):
   - 레인 그룹핑·섹션 숨김·정렬 규칙을 검증.
   - **배타 우선순위 dedupe를 검증**: running attempt가 있는 버드는 대기/PR
     대기 섹션에서 제외, conflict-resolution 실행중 버드는 실행중 섹션에만
     표시(RED).
   - 완료 종류 파생을 검증: 매칭 terminal attempt의 `done_kind` 표시, 매칭
     부재 시 종류 생략.
   - 레포 뱃지 렌더를 검증.
   - 타 workspace 행 클릭 시 전환 후 이동, 현재 workspace 행 즉시 이동을 검증.
4. **e2e** (`app/main.monitor.e2e.test.js` 갱신): 구독 등록/해제와 스냅샷 반영
   렌더 흐름.

기존 테스트 중 in-progress-issues 기반 모니터 테스트는 새 데이터 흐름으로
대체된다(삭제가 아니라 개편).

## 비범위

- 워커 탭·보드 탭·per-workspace 구독 레지스트리 변경.
- `done` 레인의 저장 리텐션 변경 — 레인은 전체 이력을 계속 보존하고, 모니터의
  당일 필터는 집계 payload에만 적용된다(`queue.json` 무변경).
- 모니터에서의 큐 조작(재정렬·중단 등) — 조회 전용 유지.
