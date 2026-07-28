# Worker 레인 카드 title 복원 — 스냅샷 bead_titles 장식 (UI-12k6)

- Bead: UI-12k6 (bug, p2)
- 날짜: 2026-07-28
- 상태: 사용자 설계 승인(대화) 후 스펙화

## 문제

Worker 탭 PR대기/완료 레인 카드가 제목 자리에 bead id를 그대로 표시한다
(예: dotfiles 워크스페이스의 dotfiles-v1hr — head의 id와 본문 제목이 같은 id).
데이터는 정상이다. 원인은 클라이언트 `buildModel()`의 `idToTitle` 맵이
Ready/Blocked 보드 컬럼(`tab:worker:ready`/`tab:worker:blocked`)에서만
채워지는 것: pr_wait(resolved)·done(closed) 상태 bead는 그 컬럼에 없어
title 조회가 실패하고 `bead_id`로 fallback 한다
(`app/views/worker/index.js` 1140–1143, 1279, 1357). 서버 큐 스냅샷
(`queue-store`)은 레인 엔트리에 `bead_id`/`added_at`만 담는다.

## 결정

서버가 워커 큐 스냅샷에 **비영속 `bead_titles` 장식**을 동봉한다.
`pr_observations`/`pr_activity`와 같은 와이어 전용 장식 패턴이다.
대안이었던 클라이언트 리스트 구독 확장(by-id 질의 부재로 과대 전송)과
큐 엔트리 title 영속(durable 스키마 확장 + 생성 지점 3곳 + stale)은 기각.

## 변경 내용

### 1. 서버 — `server/worker/title-cache.js` (신규)

- workspace별 `Map<bead_id, title>` 프로세스 수명 캐시. 제목은 표시 전용이라
  이후 제목 변경으로 인한 stale은 허용한다.
- `titlesFor(workspace_key, ids)` — 동기 조회. 캐시 히트만
  `Record<string, string>`으로 반환하고, 미스 id는 비동기 충전 큐에 넣는다.
- 충전: id당 `bd show <id> --json` (`server/bd.js`의 `runBdJson` +
  `unwrapShowJson` 재사용, cwd = workspace). 성공 시 캐시에 기록하고,
  하나 이상 새로 채워지면 완료 콜백을 1회 호출한다 — worker-handlers가
  이 콜백으로 해당 workspace를 재fanout 해 클라가 다음 스냅샷에서 제목을
  받는다.
- 실패(비정상 종료·파싱 불가·title 부재)한 id는 TTL negative cache에 넣어
  재시도 폭주를 막는다. 실패는 로그만 남기고 fail-quiet.
- 같은 id에 대한 중복 in-flight 충전은 1개로 합친다.

### 2. 서버 — `decorateQueue` (`server/ws/worker-handlers.js`)

- `bead_titles` 필드 추가: queue/pr_wait/done 레인의 bead_id에 대해
  `titlesFor()`가 반환한 캐시 히트만 담은 map. 동기 유지 — 미스는 이번
  스냅샷에서 빠지고 충전 완료 재fanout으로 따라온다.
- title-cache 완료 콜백 → `fanout(workspace, queueStore().snapshot(...))`.

### 3. 클라이언트 — `buildModel()` (`app/views/worker/index.js`)

- `idToTitle` 구성 순서: 스냅샷 `bead_titles`를 먼저 넣고, Ready/Blocked
  컬럼(라이브 스토어가 더 신선)으로 덮어쓴다. 최종 fallback `bead_id`는
  유지 — `bead_titles` 부재(구서버) 시 현재 동작 그대로.

### 4. 계약 문서 — `app/protocol.md`

- worker-queue-snapshot 장식 필드에 `bead_titles` 추가: 비영속, 부분적
  (캐시 히트만), 소비자는 부재 시 생략(fail-quiet).

## 수용 기준

1. PR대기/완료 레인 카드가 Ready/Blocked에 없는 bead의 실제 제목을
   표시한다 (충전 완료 후 스냅샷 기준).
2. 제목 미확보(캐시 미스 직후·bd 조회 실패·구서버 스냅샷) 시에만 id
   fallback이 남는다.
3. bd 조회 실패가 스냅샷 전달을 막지 않는다 (해당 id 생략, 로그만).

## 테스트

- title-cache 유닛: 미스 → 충전 → 완료 콜백 1회, 실패 negative cache로
  재조회 억제, in-flight 중복 합침 (bd mock).
- worker-handlers: 스냅샷에 `bead_titles` 포함, 캐시 미스 레인은 빈/부분
  map으로도 스냅샷 정상 전달.
- worker-handlers 통합(콜백→fanout 배선): 구독 상태에서 캐시 미스를
  만들고 mock `bd show` 충전 완료 후 두 번째 스냅샷 push에 해당 제목이
  포함되는지 검증 — 배선 누락 시 실패해야 한다 (수용 기준 1의 검증).
- 클라: pr_wait 카드와 done 카드가 각각 `bead_titles` 제목을 렌더하고,
  필드 부재 시 기존 id fallback 유지.
- 클라 우선순위: 같은 id에 `bead_titles` 제목과 Ready/Blocked 라이브
  제목이 다르게 주어지면 Ready/Blocked 제목이 이긴다.

## 비범위

- 큐 엔트리 durable 스키마 변경 없음. 제목 실시간 갱신(변경 감지) 없음.
- Ready/Blocked 컬럼 조회 경로 변경 없음.
