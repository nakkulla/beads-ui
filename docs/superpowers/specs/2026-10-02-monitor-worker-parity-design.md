---
scope:
  - app/views/monitor/
  - app/views/worker/
  - app/views/settings-dialog/
  - app/data/sort.js
  - app/main.js
  - app/protocol.js
  - app/protocol.md
  - server/ws/monitor-handlers.js
  - server/ws/connection.js
  - server/worker/runnable-cache.js
  - server/worker/title-cache.js
  - AGENTS.md
---

# 모니터 탭과 Worker 탭 일관성 — 카드는 같게, 탭 도구는 필요한 것만 (UI-f2sy)

Bead: UI-f2sy · 선행: UI-yvhx(닫힘, `6cb9f912`) · 작성 2026-10-02 · 기준 base `1756216ce66e71c8f2b67c512415c3059ae1b199`

## 1. 배경

사용자 요청(2026-10-02): "모니터탭은 워커탭이랑 동일하지만 여러 레포를 한번에 관리하고 확인할 수 있다는
의미로" Worker에만 보이는 것을 정리해 두 탭을 맞추고, 앞으로도 맞춰지도록 지침을 둔다. 같은 대화에서
사용자는 "모든 기능이 모니터에 들어갈 필요는 없고 꼭 필요한 것만"과 "레포 띠는 잡다하게 넣지 말고
나머지는 설정 버튼이나 다른 버튼으로"를 정했다.

조사 결과 차이의 뿌리는 하나다. 두 탭은 같은 `buildLanes`와 같은 카드 렌더러를 쓰지만, Worker에 붙은
카드 재료·조작(PR 대기 줄 투영, 실행중 타일 입력, 정리 재시도 배선 등)이 `app/views/worker/index.js`
안에서만 만들어졌고 모니터는 그 축소 복제본을 따로 가졌다. Worker에 기능이 붙을 때마다 모니터만
뒤처졌다. 같은 카드의 재료 누락(복잡·영역 칩, 칩 적용 상태, 우선순위·from 칩, 실행중 타일 문구)은
선행 quick_fix UI-yvhx가 고쳤다(`6cb9f912`). 이 스펙은 남은 PR 대기 줄·리뷰 세션·후보 도구·저장소별 조작·검색과,
재발 방지를 정한다.

## 2. 검증된 전제

- 모니터 PR 대기 줄은 lane-model의 간이 재료(`merge_action`·`merge_label` 등)로 그려지고 Worker는
  `prWaitRow`(21개 인자, 모듈 수준 함수)로 큐 위치·리뷰 상태·충돌·자동 제외·정리 상태를 만든다 —
  app/views/worker/lane-model.js:3982, app/views/worker/index.js:1302, app/views/worker/index.js:3419
- `prWaitRow`가 읽는 스냅샷 키(`pr_observations`·`pr_activity`·`merge_queue`·`cleanup_failed`·
  `attempts` 등)는 모니터가 펼치는 저장소별 장식 스냅샷에 이미 있다 — server/ws/monitor-handlers.js:711
- 모니터는 `groups: 'all'` 없이 `buildLanes`를 불러 PR 대기만 있는 저장소는 머지 그룹이 없다; Worker는
  `groups: 'all'`이다 — app/views/monitor/index.js:1794, app/views/worker/index.js:3108,
  app/views/worker/lane-model.js:2951
- 모니터 `worker-mini__merge` 클릭은 정리 실패 저장소에서도 `worker-merge-queue-add`만 보내고 Worker는
  정리 실패면 `worker-cleanup-retry`를 보낸다 — app/views/monitor/index.js:2612,
  app/views/worker/index.js:2522
- 모니터는 조작 응답의 큐를 `exec_adopted`에만 두고 레인은 다음 푸시까지 그대로다 —
  app/views/monitor/index.js:543, app/views/monitor/index.js:630, app/views/monitor/index.js:1794
- Worker는 비점유 리뷰 세션 타일을 실행중 그리드에서 빼고, 모니터는 그려서 `직접 세션` 배지가 붙는다 —
  app/views/worker/index.js:3372, app/views/monitor/index.js:1512, app/views/worker/running-grid.js:1524
- 모니터 후보 필터는 blocked·readiness·route 셋뿐이고 저장 키도 그 셋만 싣는다 —
  app/views/monitor/index.js:1656, app/views/monitor/index.js:158
- 모니터 후보 정렬은 `repo_spec`·`repo_updated`·`updated_flat` 세 값이고 Worker는 정렬 체인을
  `applyCandidateSort`로 `buildLanes` 앞에서 적용한다 — app/views/worker/lane-model.js:168,
  app/views/worker/workspace-adapter.js:370
- 체인의 `spec` 키는 `resolveSpecEvidence`를, 의존 인접화는 `blocked_info`·`dependencies`를 읽어 모니터
  후보 행(불리언 `published`·`blocked_by`)에서는 값이 서지 않는다 — app/data/sort.js:232,
  app/views/worker/blocker-ids.js:17
- 서버 후보 행(`RunnableItem`)에는 `priority`·`issue_type`이 없다 — server/worker/runnable-cache.js:436
- 검색은 지금 레인 항목에 `search_match`를 달아 흐리게 하고 `일치 n`을 센다 —
  app/views/worker/lane-model.js:2819, app/views/worker/lane-model.js:2843,
  app/views/worker/index.js:2008
- 워크스페이스 스냅샷은 `bd list --all`이라 닫힌 이슈까지 담고, 마지막 스냅샷을 새 세대 없이 읽는
  `peekWorkspaceSnapshot`이 있다 — server/workspace-snapshot-coordinator.js:6,
  server/workspace-snapshot-runtime.js:32
- 헤더 `+ 새 이슈`와 Cmd/Ctrl+N은 모든 탭에서 연결 저장소로 만든다 — app/main.js:1480,
  app/main.js:1843, server/ws/connection.js:473
- 설정창은 연결 저장소·레포 띠(⚙, scope `repo`)·일괄 세 모드이고 탭 배열이 갈린다 —
  app/views/settings-dialog/index.js:38, app/main.js:1630
- 레포 띠에는 마스터 자동화 토글이 없고 레포별 스위치가 유일한 제어다 — app/views/monitor/deck.js:11
- 저장소 작업 띠·선언 블록은 Worker 전용 컴포넌트다 — app/views/worker/lanes.js:352,
  app/views/worker/repo-ops-settings.js:533
- 모니터 파이프라인 항목은 `done`만 있어도 실리지만 `repo_operations`·`cleanup_failed`는 보지 않아, 저장소 작업
  실패만 남은 저장소는 항목이 없다 — server/ws/monitor-handlers.js:453
- 우선순위·타입·라벨 필터는 후보·보류를 숨기고 나머지 레인 항목에 `filter_match`를 달아 흐리며, 값이 없는
  항목은 일치로 본다 — app/views/worker/lane-model.js:2868, app/views/worker/lane-model.js:5282,
  app/views/worker/lane-model.js:5301
- 모니터 `bead_overlay`는 UI-yvhx 뒤 `priority`·`from_id`·판정된 `complex_reason`을 싣지만 `issue_type`은 싣지
  않고, `buildLanes`는 오버레이의 `issue_type`을 비어 있는 행에 채운다 — server/worker/title-cache.js:808,
  server/ws/monitor-handlers.js:662, app/views/worker/lane-model.js:4649
- Worker 완료 레인은 Worker 완료 행에 `closed-issues` 구독의 기간 내 닫힌 이슈를 더하고, 세션 보고서가 확인된
  행만 세션 배지를 단다; 모니터에는 이 경로가 없다 — app/views/worker/workspace-adapter.js:620, app/main.js:90

## 3. 원칙

- 결정: 같은 Bead의 카드(후보 카드, 대기·PR 대기·완료 줄, 실행중 타일)는 두 탭에서 같은 칩·배지·줄·
  버튼을 갖는다. 모니터는 저장소 좌표(레포 배지·레포 섹션·레포 띠)만 더한다.
- 결정: 카드 재료와 카드 조작 판정은 한 곳 — `buildLanes` 또는 `app/views/worker/`의 공유 함수 — 에서
  만든다. 탭 뷰는 뷰 로컬 상태(진행 중 집합·팝업 열림)만 덧씌우고 카드 입력을 손으로 다시 조립하지 않는다.
- 결정: 탭 수준 도구는 필요한 것만 모니터에 둔다. Worker에 있고 모니터에 없는 것은 §9 의도된 차이 표가
  정본이고, 표에 없는 차이는 결함이다.

## 4. PR 대기 줄

- Worker의 PR 대기 줄 투영(지금 `prWaitRow`·`prWaitRowsOf`)을 공유 함수로 옮기고 두 탭이 저장소마다
  부른다. 입력은 그 저장소의 장식 스냅샷, 그 저장소 그룹의 머지 재료, `(root_dir, bead_id)`로 키를 단
  뷰 로컬 진행 중 집합이다. 예: `app/views/worker/pr-wait-row.js`.
- lane-model의 간이 PR 줄 재료는 공유 투영으로 대체되어 두 벌이 남지 않는다.
- PR 대기만 있는 저장소도 머지 재료를 얻는다. 모니터 대기 레인에 빈 저장소의 빈 직렬 레인·슬롯 칸이
  새로 생기지 않는다.
- 모니터 클릭 배선: 정리 실패 줄의 머지 버튼은 `worker-cleanup-retry`, `worker-mini__resolve`는
  `worker-resolve-in-session`을 보낸다. 모든 조작은 그 줄의 `root_dir`과 그 저장소 revision을 싣는다.
- 조작 응답의 큐는 그 저장소 투영에 즉시 반영된다(Worker와 같은 효과). 다음 푸시를 기다리지 않는다.
- 결과: 모니터 PR 대기 줄에 Worker와 같은 상태 배지(머지 대기 #N·충돌·리뷰 세션·자동 제외·정리 멈춤 등),
  `[세션에서 해결]`, 이어하기·권한·게이트 버튼 라벨이 선다.

## 5. 리뷰 세션

- 모니터 실행중 레인도 비점유 리뷰 세션 타일을 그리지 않는다. 진행은 PR 대기 줄 배지(`최종 변경 리뷰
  필요 · 자동 리뷰 세션 실행 중` 등)가 말한다. 레인 개수와 실행 수에서도 빠진다.

## 6. 후보 레인 도구

### 6.1 필터

- 모니터 후보 머리에 Worker와 같은 우선순위 칩·타입 선택·라벨 드롭다운을 둔다(같은 컴포넌트). 적용은
  Worker와 같다: 후보는 숨기고 대기·실행중·PR 대기·완료는 흐린다.
- 모니터 저장 키 `beads-ui.monitor.candidate-filter`가 세 축을 더 싣는다. 모르는 값은 무시한다.
- 서버 후보 행이 같은 스냅샷 행에서 `priority`·`issue_type`을 싣는다(새 bd 호출 없음).
- 모니터 `bead_overlay`도 UI-yvhx가 `priority`를 꺼내는 같은 `bd show` 기록에서 `issue_type`을 실어, 대기·
  실행중·PR 대기·완료 행이 타입 필터에서 흐려질 수 있다(값이 없으면 지금처럼 일치).

### 6.2 정렬

- 모니터는 Worker 정렬 체인(프리셋·최대 3단계)과 모니터 전용 `레포별로 묶기` 켜기/끄기를 쓴다. 묶기를
  켜면 레포 섹션 안에서 체인 순서, 끄면 저장소를 무시한 한 줄 목록이다.
- 이행: 저장된 옛 값 `repo_spec` → (`spec` 프리셋, 묶기 켬), `repo_updated` → (`updated` 프리셋, 묶기
  켬), `updated_flat` → (`updated` 프리셋, 묶기 끔). 모르는 값은 기본(`spec`, 묶기 켬).
- 같은 사실이면 두 탭이 같은 순서를 낸다: 체인 값과 의존 인접화는 두 원천 행이 함께 싣는 사실을 읽는다
  (`spec`은 `published` 불리언, 선행은 `blocked_by` 폴백).

### 6.3 검색 (두 탭 공통 변경)

- 검색 상자 아래 드롭다운에 맞는 이슈를 보이고, 누르면 상세가 열린다. 모니터는 그 저장소로 전환한 뒤
  상세를 연다(지금 카드 클릭과 같은 경로).
- 범위: Worker는 연결 저장소, 모니터는 보이는 저장소 전부. 상태 무관(닫힘 포함).
- 원천: 새 요청 `search-issues { query, scope: 'workspace'|'visible' }` → `{ results, partial }`. 서버는
  각 저장소의 마지막 워크스페이스 스냅샷에서만 찾고 bd 프로세스를 띄우지 않는다. 스냅샷이 아직 없는
  저장소는 건너뛰고 `partial: true`.
- 일치: ID·제목 대소문자 무시 부분 일치. 순서: ID 정확 일치 → ID 접두 → 나머지, 각 묶음은 수정 시각
  내림차순. 최대 20개.
- 결과 줄: ID · 상태 · 제목, 모니터는 앞에 레포 배지.
- 레인 강조는 없앤다: `search_match` 흐림과 레인 머리 `일치 n`이 사라진다. 필터의 숨김·흐림은 그대로다.
- 조작: 입력 150ms 뒤 요청, Esc는 지우고 닫음, Enter는 첫 결과 열기, 바깥 클릭은 닫음. 검색어는 저장하지
  않는다. 모니터 자리는 레포 띠 합계 줄 오른쪽, Worker는 지금 자리.
- 실패하면 드롭다운에 `검색 실패` 한 줄, `partial`이면 끝에 `일부 저장소는 아직 읽지 못했습니다`.

## 7. 저장소별 조작

- 레포 띠 타일은 지금 것에 `⚠ N` 배지 하나만 더한다. N은 해결 필요(닫지 않은 실패 저장소 작업 카드 +
  정리 실패)이고 N이 0이면 그리지 않는다. 누르면 그 저장소의 저장소 작업 타임라인 서랍이 열린다 —
  Worker와 같은 서랍이고 `기록 닫기`·`정리 재시도`·`세션에서 해결`이 그 저장소로 간다.
- 레포 띠 ⚙ 설정창(scope `repo`)에 `저장소` 탭을 더한다: 동시 실행 수·직렬 레인 수(편집, 기존 op에
  `root_dir`), base 브랜치(읽기), 저장소 작업 선언 블록(Worker 컴포넌트: 검증/배포 선언·opt-out·
  `배포 실행`), `저장소 작업 기록 열기` 버튼. 연결 저장소 설정창과 일괄 창에는 없다.
- 재료는 그 저장소의 파이프라인 항목에서 읽는다. 서버는 `repo_operations`나 `cleanup_failed`가 비어 있지
  않은 저장소도 파이프라인 항목으로 싣는다 — 저장소 작업 실패만 남아도 `⚠ N`과 서랍이 사라지지 않는다.
  그래도 항목이 없는 저장소는 배지가 없고, `저장소` 탭은 `workspaces_state`의 동시 실행 수·직렬 레인 수만
  보인다.

## 8. 새 이슈

- 모니터 탭에서는 헤더 `+ 새 이슈`를 숨기고 Cmd/Ctrl+N이 대화창을 열지 않는다. 다른 탭은 그대로다.

## 9. 의도된 차이 (정본)

| 항목 | Worker | Monitor | 이유 |
| --- | --- | --- | --- |
| 저장소 좌표 | 없음 | 레포 배지·레포 섹션·레포 띠·`Worker ↗`·포커스 | 여러 저장소 |
| 완료 줄 모양 | 2줄 | 3줄(레포 배지 줄) | 좁은 레인에서 제목 보존 |
| 전체 자동화 스위치 | 툴바 `▶ 자동화` | 없음, 레포 띠 레포별 스위치 | 마스터 토글 없음(레포 띠 §4.1) |
| PR 레인 머리 | `자동 머지` 토글 | `일괄 머지`, 자동 머지는 레포 띠 스위치 | 레포별 스위치가 이미 있음 |
| 저장소별 조작 | 툴바·저장소 작업 띠 | `⚠ N` 배지·⚙ `저장소` 탭 | 레포 띠는 필요한 것만 |
| cap 초과 | 배지 | 레포 띠 슬롯 레일의 넘친 칸 | 같은 사실을 레일이 말함 |
| `다음 <id>`·레포별 토큰 칩 | 툴바 | 없음(대기 순번·합계 토큰) | 필요한 것만 |
| 보류 선반 | 있음 | 없음 | 백로그 정리는 Worker에서 |
| 완료 레인 모집단 | Worker 완료 행 + 기간 내 닫힌 이슈(세션 보고서 확인 시 세션 배지) | Worker 완료 행만 | 저장소마다 닫힌 이슈와 세션 보고서 조회(bd 호출)가 늘어남; 세션·수동 닫힘은 그 저장소 Worker 탭에서 |
| 새 이슈 | 툴바·헤더·Cmd+N | 없음 | 저장소가 모호하고 필요하지 않음 |
| 정렬 `레포별로 묶기` | 없음 | 있음 | 저장소 좌표 |
| 검색 범위 | 연결 저장소 | 보이는 저장소 전부 | 탭의 범위 |

## 10. 재발 방지

- `AGENTS.md` "워커·모니터 카드 배치 문법" 절에 다음 줄을 더한다(문구 그대로):
  > - 모니터는 여러 저장소를 한 번에 보는 Worker 탭이다. 같은 Bead의 카드는 두 탭에서 같은 칩·배지·줄·
  >   버튼을 갖고, 카드 재료는 `buildLanes`나 `app/views/worker/` 공유 함수 한 곳에서 만든다 — 탭 파일이
  >   카드 입력을 손으로 다시 조립하지 않는다. Worker에 탭 도구를 더하면 모니터에도 달거나
  >   `docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md` §9 의도된 차이 표에 행을
  >   더한다. 카드 동일성 테스트가 표 밖의 차이를 잡는다.
- 카드 동일성 테스트: 같은 원시 저장소 상태(이슈 목록·큐 레코드·`bd show` 응답)를 두 탭의 실제 서버
  투영과 클라이언트 경로로 그린다 — 탭별 입력을 손으로 만들지 않는다(데이터 누락도 잡기 위해). 각 Bead
  카드의 칩·배지·버튼(클래스와 글자)이 §9의 카드 항목(레포 배지·완료 3줄)을 뺀 나머지에서 같아야 한다.
  비교는 두 탭에 모두 서는 Bead에 하고, §9의 모집단 차이(보류 선반·완료 레인 모집단)는 따로 단언한다: Worker
  밖에서 닫힌 이슈는 Worker 완료 레인에만, 보류 이슈는 Worker 보류 선반에만 선다. 고정 자료는 최소:
  복잡+영역 라벨(대기·실행중), 우선순위·타입·discovered-from, 파킹·orphaned 실패·base_moved 대기, 리뷰
  세션이 도는 PR 대기, 정리 실패 PR 대기, 충돌 해소, plan 묶음, Worker 밖에서 닫힌 이슈, 보류 이슈.

## 11. 오류 처리

- 재료가 없는 칩·배지·줄은 그리지 않는다(fail-quiet). 새 서버 필드가 없는 구 서버는 표시 생략이다.
- 저장소별 조작의 CAS 충돌은 지금 규약대로 그 저장소 revision으로 1회 재시도한다.

## 12. 테스트와 수용 기준

- 공유 PR 대기 투영: Worker 기존 기대값 유지, 모니터에서 같은 배지·버튼; 정리 실패 줄 클릭이
  `worker-cleanup-retry`, `[세션에서 해결]`이 `worker-resolve-in-session`(둘 다 `root_dir`); 조작 직후
  응답 큐가 레인에 반영; PR 대기만 있는 저장소의 머지 재료; 빈 저장소의 빈 직렬 레인 없음.
- 리뷰 세션 타일이 모니터 실행중 레인·개수에서 빠지고 PR 대기 배지로 보인다.
- 필터 세 축의 모니터 적용·저장·복원; 후보 행 `priority`·`issue_type`; 타입 필터에서 모니터 대기·실행중·
  PR 대기·완료 행 중 타입이 다른 행이 흐려짐(오버레이 `issue_type`).
- 저장소 작업 실패만 남은 저장소가 모니터 파이프라인 항목으로 실리고 `⚠ N`이 선다.
- 정렬: 옛 값 이행 세 가지, 묶기 켬·끔, 같은 사실의 두 탭 같은 순서(spec 키·의존 인접화 포함).
- 검색: 서버 처리기(범위 두 가지·partial·순서·최대 20·bd 미실행), 두 탭 드롭다운(클릭 상세, 모니터는
  저장소 전환), 레인 흐림·`일치 n` 없음, 실패 줄.
- 레포 띠 `⚠ N`(0이면 없음)과 서랍의 저장소 지정 조작; ⚙ `저장소` 탭의 op가 `root_dir`을 싣고 다른 두
  설정창 모드에는 없음.
- 모니터에서 헤더 `+ 새 이슈` 없음·Cmd+N 무반응, Worker에서는 그대로.
- 카드 동일성 테스트(§10).
- 배포 뒤 공유 서버에서 모니터 데스크톱·390px 스크린샷으로 레포 띠·검색 드롭다운·PR 대기 줄을 확인한다.

## 13. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | defect | 다른 route(quick_fix)의 카드 재료 맞추기 — 이 Bead가 선행으로 기다린다 | 없음 | UI-yvhx |

- 결정: Worker 실행 판단·큐·스케줄러·머지 자격은 바꾸지 않는다 — 표시와 조작 배선만 다룬다.
- 관찰: UI-18a5(대화형 세션 표면 통합)가 `[세션에서 해결]` 계열 버튼을 바꾼다 — 공유 투영으로 옮긴 뒤에는
  그 변경이 두 탭에 함께 닿는다.

## 14. 결정 (ADR 후보)

- 전제: ADR UI-nuwy — 승계 조항 "레인과 카드 조립"(`buildLanes` 하나·카드 렌더러 공유)과 표면 판정
  단락(Worker·Monitor 같은 `buildLanes` 경로·같은 클릭 배선)을 따르고, "단일 이슈 면"의 세 필터 조항을
  모니터로 넓히며 보류 선반·`+ 새 이슈`는 Worker에만 둔다.
- 전제: ADR UI-u6ud — 모든 목록은 같은 워크스페이스 스냅샷 세대에서 투영한다(검색과 후보 행
  `priority`·`issue_type`이 새 bd read 없이 나온다).
- 전제: ADR UI-u6ud-3 — 머지 큐 op와 자격은 그대로이고 모니터는 같은 op를 `root_dir`로 보낸다.
- 카드 재료·조작 판정을 한 곳에서 만들고 탭 도구 차이는 스펙 표가 정본 — 첫 조건 실패: Accepted ADR UI-nuwy 공유 조립 조항의 적용이고 되돌리기는 스펙 한 절 → ADR 아님
- 검색을 레인 강조 대신 드롭다운으로 바꾼다 — 기본 제외 목록(표시 방식) → ADR 아님
- `search-issues`가 스냅샷 peek에서만 찾는다 — 첫 조건 실패: 소비자가 이 저장소의 두 탭뿐이라 quick_fix 하나로 되돌린다 → ADR 아님
- 모니터에 새 이슈·보류 선반을 두지 않고 저장소별 조작은 `⚠ N`·⚙ `저장소` 탭에 둔다 — 기본 제외 목록(UI 레이아웃·버튼) → ADR 아님

## 15. 구현 unit 후보 (권고)

- U1 공유 PR 대기 투영·리뷰 세션 규칙·모니터 클릭 배선·응답 반영 — `app/views/worker/`, `app/views/monitor/index.js`
- U2 후보 도구(필터·정렬)와 서버 후보 행·오버레이 필드 — `app/views/monitor/index.js`, `app/data/sort.js`, `server/worker/runnable-cache.js`, `server/worker/title-cache.js`, `server/ws/monitor-handlers.js`
- U3 검색 드롭다운과 `search-issues` — `app/views/worker/`, `app/views/monitor/`, `server/ws/`, `app/protocol.*`
- U4 레포 띠 `⚠ N`·⚙ `저장소` 탭·파이프라인 항목 조건·새 이슈 숨김 — `app/views/monitor/deck.js`, `app/views/settings-dialog/`, `app/main.js`, `server/ws/monitor-handlers.js`
- U5 카드 동일성 테스트·`AGENTS.md` 규칙 — 마지막
