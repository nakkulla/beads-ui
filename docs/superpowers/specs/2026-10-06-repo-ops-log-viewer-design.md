---
scope:
  - server/worker/repo-operation-runner-child.js
  - server/worker/repo-operation-runner.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/failure-class.js
  - server/routes/
  - server/app.js
  - server/ws/worker-handlers.js
  - app/views/worker/log-path.js
  - app/views/worker/repo-ops-timeline.js
  - app/views/worker/repo-ops-script-viewer.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 저장소 작업 로그 뷰어 — 경로 대신 시도별 시간순 로그 (UI-i8cy)

## 1. 배경

저장소 작업(머지 후 배포·머지 전 검증·job)이 실패하거나 재시도 중일 때 화면의
`세부 > 로그`는 서버 로컬 파일의 절대 경로와 복사 버튼만 보여 준다. 브라우저는 그
경로를 열 수 없고, tailnet으로 접속한 다른 기기에서는 파일에 닿을 수조차 없다.
사람이 실제로 알고 싶은 것은 "어떤 단계가 언제 돌았고 어디서 멈췄나"다.

실측(oliveyoung `6847632fd5395c21db2df3e7.log`, 2026-10-06 머지 후 배포 재시도
중): 로그는 스크립트 stdout/stderr를 시각 없이 이어 쓴 11줄이고, 1차 시도와
재시도 출력이 경계 없이 한 파일에 붙어 있다. 시도별 시작·종료 시각은 marker
파일에만 있고, operation 기록은 최신 `attempt_id` 하나만 갖는다.

## 2. 검증된 전제

- runner-child는 로그를 append 모드로 열고 스크립트 stdout/stderr를 그 fd에 직결한다 — `server/worker/repo-operation-runner-child.js:30`, `:59`
- 로그 파일 이름은 operation당 하나(`<operation_id>.log`)이고 재시도도 같은 파일에 이어 쓴다 — `server/worker/repo-operation-runner.js:33-36`; 재시도 사이 log를 지우거나 자르는 코드 없음(`grep -n "unlink\|truncate\|rmSync"` coordinator·runner: marker·checkout 삭제만)
- 자동 재시도(`script_retry`)는 기존 `attempt_id`를 그대로 넘겨 같은 runner를 다시 띄운다 — `server/worker/repo-operation-coordinator.js:1507-1516`; 새 `attempt_id`(`<operation_id>:<ms>`)는 bootstrap 재요청 경로에서만 생긴다 — `:1951`. 따라서 `attempt_id`로는 시도를 구분할 수 없다
- 자동 재시도는 `retry_pending` → `queued`로 바뀐 뒤 비동기로 runner를 띄운다 — `server/worker/queue-store.js:7691-7712`, `server/worker/repo-operation-coordinator.js:1507-1516`
- runner-child는 시작·종료 시각·exit·signal을 marker에만 쓰고 timeout은 exit 124로 기록한다 — `server/worker/repo-operation-runner-child.js:76-84`
- RepoOperation 기록은 `attempt_id`·`started_at`·`finished_at`·`log_path`를 하나씩만 갖는다 — `server/worker/queue-store.js:858-882`
- 실패 정산은 로그 파일 전체를 읽어 digest와 요약 한 줄을 만든다 — `server/worker/repo-operation-coordinator.js:251-261`, `:718-728`
- 요약은 첫 실패 표지 줄, 없으면 마지막 비어 있지 않은 줄이다 — `server/worker/failure-class.js:235-254`
- 실패 지문은 digest를 포함하고, `local_code_defect` 판정은 첫 실패와 현재 실패의 지문 일치를 요구한다 — `server/worker/repo-operation-coordinator.js:87-100`, `server/worker/operation-recovery.js:45-71`; 첫 지문은 1차 정산 값으로 고정된다 — `server/worker/queue-store.js:7669-7670`
- operation 기록에는 `output_tail`이 채워지지 않는다 — `grep -c output_tail server/worker/repo-operation-coordinator.js server/worker/repo-operation-transition.js` 0건
- 정리 실패 기록의 `log_path`는 실패한 명령의 전체 출력 파일이다 — `server/worker/queue-store.js:677-681`; verify-cmd 로그는 `verify-logs/`·`deploy-logs/`, repo-op 로그는 `repo-operation-logs/` 아래다 — `server/worker/verify-cmd.js:124-125`, `server/worker/state-paths.js:215-231`, `:351-353`
- verify-cmd 재시도는 시도마다 다른 파일을 남긴다 — `server/worker/verify-cmd.js:653-662`
- repo-op 로그 디렉터리를 정리하는 보존 sweep은 없다 — `grep -rn "repoOperationLogDir"` 소비자는 runner와 completion-intent 주석뿐. verify-cmd 로그는 종류별 최근 20개만 남기고 지운다 — `server/worker/verify-cmd.js:76`, `:138-170`, `:232`
- PR 대기 행의 완료 `log_path`는 서버 투영이 `terminal_reason.log_path` → `cleanup_failed[root].log_path` → `prObservations` verify `log_path` 순으로 고른다 — `server/ws/worker-handlers.js:2609`, `:2666-2697`
- 로그 경로 표시는 공유 템플릿 하나가 그린다 — `app/views/worker/log-path.js:49`; 소비자는 타임라인 operation `세부`(`app/views/worker/repo-ops-timeline.js:501`), 정리 실패 `세부`(`:598`), PR 대기 `miniRow` 슬롯 5(`app/views/worker/lanes.js:3970`)
- PR 대기 행 완료 툴팁은 `log_path`를 줄글 `title`로만 싣는다 — `app/views/worker/pr-wait-row.js:427-428`, `:473-474`
- 타임라인 서랍은 Worker 탭과 모니터가 같은 `createRepoOpsDrawer`를 쓰고, 둘 다 작업공간 경로를 `repo`로 넘긴다 — `app/views/worker/index.js:131`, `:3243`, `app/views/monitor/index.js:108`, `:774`
- 스크립트 팝업은 열려 있는 동안만 ESC를 듣고, 열 때 닫기 버튼에 포커스를 두고 닫을 때 연 요소로 포커스를 돌린다 — `app/views/worker/repo-ops-script-viewer.js:272-290`, `:314`, `:374-384`
- Bead 실패 인계 댓글은 로그를 인용하지 않고 경로만 가리킨다(비밀값 우려) — `server/worker/completion-intent.js:973-975`
- 스크립트 팝업 API는 등록 작업공간 allowlist와 서버 측 재해석으로 요청 값이 파일 경로에 닿지 않게 한다 — `server/routes/repo-ops-script.js:83-99`, `server/app.js:155`
- 카드 문법 §5.1 슬롯 5b는 "실패 로그 경로(`log_path` + 복사)"를 담는다 — `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:261`
- 미확인: 모니터 `miniRow` 항목이 자기 작업공간 경로를 카드 입력으로 이미 갖는지 — 구현 시 확인하고, 없으면 `buildLanes` 공유 입력에 더한다(탭 파일이 손으로 조립하지 않는다)

## 3. 목표

- 저장소 작업 로그를 화면 안에서 시도별·시간순으로 읽는다.
- 시도마다 시작 시각, 종료 시각, exit, 소요 시간이 보인다.
- 실행 중인 작업의 로그는 팝업을 연 채로 따라 갱신된다.
- 요청은 파일 경로를 보내지 않는다. 서버는 자기 기록에 저장된 경로만 읽는다.
- 기존 실패 지문·요약 값은 같은 스크립트 출력에 대해 지금과 같다.

## 4. 범위

포함: runner-child 시도 경계 줄, 로그 읽기 API, 팝업 뷰어, `logPathTemplate` 소비자
세 곳(타임라인 operation·정리 실패·PR 대기 `miniRow`), 슬롯 5b 문구.

제외:

- 줄 단위 시각 부착(출력을 runner-child가 중계하는 방식) — 사용자 결정. 단계별
  시각이 필요한 저장소는 스크립트가 스스로 찍는다.
- verify-cmd 로그 형식 변경 — 이미 시도마다 파일이 따로다.
- PR 대기 툴팁의 경로 줄 — `title` 문자열에는 조작을 둘 수 없으니 그대로 둔다.
- 외부 작업(Slurm·process job)의 원격 로그.
- 실패 지문·요약의 계산 범위 변경(§9 관찰).

## 5. 설계

### 5.1 시도 경계 줄 (서버, runner-child)

runner-child는 스크립트를 띄우기 직전에 시작 줄을, 스크립트가 끝나면 끝 줄을 같은
로그에 쓴다. 스크립트의 fd 직결은 유지한다.

- 결정: 경계 줄은 고정 접두어 뒤에 JSON 한 객체를 싣는 한 줄이다. 사람이 터미널에서
  읽어도 뜻이 보이고 파서가 모호하지 않게 하려는 것이다.
  예: `##repo-ops## {"event":"start","attempt_id":"…","at":1791268149831}`,
  `##repo-ops## {"event":"end","attempt_id":"…","at":…,"exit_code":1,"signal":null,"timed_out":false}`
- 결정: 경계 줄은 항상 줄의 맨 앞에서 시작한다. runner-child는 쓰기 직전 로그의
  마지막 바이트를 읽어 `\n`이 아니면(출력이 개행 없이 끝남) `\n`을 먼저 쓰고, 그
  사실을 JSON에 `"sep":true`로 남긴다. 제거기는 `sep:true` 경계 줄을 지울 때 바로
  앞의 그 `\n` 한 바이트도 함께 지운다. 빈 파일이거나 이미 `\n`으로 끝나면 `sep`이
  없다. 이렇게 해야 경계 줄을 지운 바이트열이 경계 줄이 없었을 때와 정확히 같다.
- 판별과 제거는 디코딩 전 바이트 단위로 한다: 줄 시작(파일 처음 또는 `\n` 다음)의
  접두어 바이트 + JSON 파싱 성공 + 알려진 `event`일 때만 경계 줄이다. CRLF·잘못된
  UTF-8 출력은 건드리지 않는다.
- 시도 번호는 시작 줄의 순서로 매긴다. 자동 재시도는 같은 `attempt_id`를 다시 쓰므로
  `attempt_id`는 참고 정보일 뿐 시도를 구분하지 않는다. runner는 `attempt_id`를
  child 입력에 더한다.
- spawn 오류로 끝 줄을 못 쓴 시도는 시작 줄만 남는다. 파서는 다음 시작 줄이나
  파일 끝에서 그 시도를 "끝 기록 없음"으로 닫는다.
- 끝 줄 뒤에 늦게 도착한 출력(손자 프로세스)은 직전 시도에 붙인다.
- 끝 줄은 `closeSync(fd)`와 marker 기록 전에 쓴다. 시작 시각·marker·launch marker의
  내용과 순서는 바꾸지 않는다(재기동 뒤 인수 조건 유지).

### 5.2 기존 정산과의 경계 (서버)

- 결정: 실패 digest와 요약 줄은 §5.1 규칙으로 경계 줄(과 `sep` 개행)을 지운
  바이트열로 계산하고, 계산 범위(파일 전체)는 바꾸지 않는다. 경계 줄이 없던 시절과
  같은 출력이면 바이트 단위로 같은 입력이 되어 같은 값이 나온다.
  이렇게 해야 끝 줄이 "마지막 비어 있지 않은 줄" 요약을 빼앗지 않고, 시각이 든
  시작 줄이 지문을 흔들지 않는다.
- 경계 줄 판별은 파서 모듈 하나가 소유하고, `logEvidence`와 읽기 API가 같이 쓴다.

### 5.3 로그 읽기 API (서버)

`GET /api/repo-ops-log?workspace=<abs>&source=<operation|cleanup|completion>&id=<…>`

- `workspace`는 등록 작업공간 allowlist로 검증한다(스크립트 API와 같은 방식).
- 서버는 `source`·`id`로 자기 기록을 찾아 저장된 `log_path`를 꺼낸다.
  `operation` → `repo_operations[id].log_path`, `cleanup` →
  `cleanup_failed[bead_id].log_path`.
- 결정: `completion`(id = 완료 루트 Bead)은 PR 대기 행 투영과 같은 서버 함수로
  경로를 고른다(`terminal_reason` → `cleanup_failed` → verify 관찰). 고르는 순서를 그
  투영에서 함수 하나로 뽑아 투영과 API가 함께 쓴다. 화면에 보인 경로와 API가 읽는
  경로가 갈라지지 않게 하려는 것이다.
- 꺼낸 경로를 실경로로 풀어 그 작업공간의 `repo-operation-logs/`·`verify-logs/`·
  `deploy-logs/` 아래인지 확인한다. 밖이면 `forbidden`.
- 응답: `{ ok, path, total_bytes, truncated_bytes, running, preamble, attempts }`.
  `attempts[]`는 `{ attempt_id, started_at, finished_at|null, exit_code|null,
  signal|null, timed_out, lines[] }`. 경계 줄이 없는 로그는 `attempts: []`에 모든
  줄이 `preamble`이다.
- 결정: 시도 메타데이터(시작·끝 시각, exit, signal, timeout)는 파일 전체를 바이트
  단위로 훑어 모든 경계 줄에서 얻는다(실패 정산도 이미 파일 전체를 읽는다). 본문
  줄은 끝에서 512 KiB만 싣는다. 잘린 앞부분은 `truncated_bytes`로 알리고 잘린 자리의
  첫 줄 조각은 버린다. 본문이 모두 잘린 앞 시도는 메타데이터만 있고
  `lines: []`·`body_truncated: true`다. 그래서 오래 돈 시도도 시작 시각과 소요
  시간을 잃지 않는다.
- 디코딩은 UTF-8 대체 문자로 관대하게 한다(로그는 원본 그대로 보일 의무가 없다).
  ANSI 제어열은 줄에서 지운다.
- `running`은 기록이 종단 상태가 아니면 참이다: `operation`은 `queued`·`running`·
  `retry_pending`(재시도 사이의 `queued` 구간 포함), `completion`은 종단이 아닌 단계.
  `succeeded`·`failed`·종단 단계·정리 실패 기록은 거짓이다.
- 오류: `bad_request`, `forbidden`, `not_found`(기록·경로·파일 없음), `unreadable`.
  응답에 `Cache-Control: no-store`를 붙인다.

### 5.4 팝업 뷰어 (프런트)

- 겉모양은 스크립트 팝업과 같다: 백드롭, 머리(경로·복사·닫기), ESC로 닫기, 포커스
  복귀. 셸 구문 색칠은 없다. 예: 공통 패널을 뽑아 두 뷰어가 쓰거나, 형제
  컴포넌트로 같은 클래스를 공유한다.
- 본문은 시도마다 머리를 둔다: `시도 N · HH:MM:SS 시작 · 7분 45초 · exit 1`
  (오늘이 아니면 날짜를 붙인다). 끝 기록이 없으면 `진행 중` 또는 `끝 기록 없음`.
  그 아래에 그 시도의 줄을 원래 순서대로 보인다.
- 마지막 시도를 펼쳐 두고 앞 시도는 접는다. 시도가 하나면 접지 않는다.
- 기록의 `failure.summary`와 같은 줄이 있으면 강조한다.
- `truncated_bytes > 0`이면 맨 위에 `앞부분 N KB 생략 — 전체는 경로로 확인` 줄을
  둔다.
- 결정: 실행 중(`running`)이면 팝업이 열려 있는 동안 3초마다 다시 요청하고, 닫거나
  `running`이 거짓(종단)이 되거나 `not_found`이면 멈춘다. 스냅샷 구독을 새로 만들지
  않는다.
- 본문이 잘린 시도는 머리만 보이고 `본문은 앞부분 생략에 포함됨`을 단다.
- 새로 고칠 때 사용자가 맨 아래에 있었으면 맨 아래를 따라가고, 위로 올려 읽는
  중이면 위치를 유지한다.

### 5.5 진입 조작 (프런트)

- `logPathTemplate`은 경로 대신 `[로그 보기]` 조작(`.op-btn`)과 경로 복사 아이콘을
  그린다. 경로 문자열은 팝업 머리로 옮긴다.
- 조작은 `workspace`·`source`·`id`를 데이터 속성으로 갖고, 한 페이지에 하나뿐인
  뷰어가 위임 클릭으로 연다(Worker 탭과 모니터 각각).
- 세 재료(작업공간·출처·id) 중 하나라도 없으면 기존처럼 경로와 복사만 그린다
  (fail-quiet).
- 슬롯: 새 슬롯을 만들지 않는다. §5.1 슬롯 5b 항목을 "실패 로그(`[로그 보기]` +
  경로 복사)"로 고친다. 타임라인 `세부`는 카드 슬롯 밖이고 행 이름 `로그`를
  유지한다.
- 모니터 동일성: 타임라인 서랍은 두 탭이 같은 함수를 쓰고 `miniRow`도 공유
  렌더러라 §9 의도된 차이 표에 행을 더하지 않는다.

### 5.6 노출 경계

로그에는 비밀값이 섞일 수 있다. Bead 댓글에는 경로만 남긴다는 원칙
(`completion-intent.js` UI-8w4t §4)은 그대로다. 이 팝업은 스크립트 팝업과 같은
청중(등록 작업공간, tailnet에 묶인 서버의 화면)에게만 보이고, 새 인증은 두지 않는다.

## 6. 오류 처리

| 상황 | 화면 |
| --- | --- |
| 기록이 큐에서 사라짐·파일 없음 | `로그 파일을 찾을 수 없습니다` + 경로 복사 유지 |
| allowlist·디렉터리 밖 | `이 로그는 읽을 수 없습니다` |
| 네트워크 실패 | 마지막으로 받은 내용을 유지하고 머리에 `갱신 실패` |
| 실행 중 폴링이 연속 실패 | 3회 뒤 폴링을 멈추고 `다시 불러오기` 조작을 보인다 |

## 7. 시험

- 서버 단위: 경계 줄 파서(시작만·끝 뒤 출력·경계 없음·접두어 흉내 줄이 JSON이 아닌
  경우는 일반 줄·같은 `attempt_id` 두 번 시작은 두 시도), `logEvidence`가 경계 줄
  유무와 무관하게 같은 digest·요약을 내는지(개행 없이 끝난 출력·CRLF·잘못된 UTF-8
  포함), API의 allowlist·`operation`/`cleanup`/`completion` 세 출처 조회(completion은
  `terminal_reason`·`cleanup_failed`·verify 관찰 각각에서 투영과 같은 경로)·디렉터리
  밖 거부·512 KiB 꼬리에서 시작 경계가 잘린 실행 중·종료 로그의 메타데이터·
  `running`(재시도 사이 `queued` 포함).
- runner 통합: 두 번 실행한 operation 로그에 시작·끝 줄 두 쌍이 순서대로 남는지,
  개행 없이 끝난 출력 뒤 `sep:true`, timeout 시 `timed_out: true`.
- 프런트 단위: 시도 머리 문구, 접힘 규칙, 생략 줄, 요약 줄 강조, 폴링 시작·멈춤,
  스크롤 따라가기, 재료 부족 시 경로 fallback.
- 카드 동일성 테스트: 같은 Bead의 PR 대기 `miniRow`가 Worker 탭과 모니터에서 같은
  `[로그 보기]` 조작을 갖는지.
- 폭 넘침 탐침(`docs/design-system.md`): 390px에서 팝업과 `세부` 행.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-5 — 배포는 Worker의 저장소 지식 없는 durable operation 실행이다. 이 설계는 그 실행기의 로그 형식만 넓히고 저장소별 스크립트 지식을 들이지 않는다.
- 로그에 시도 경계 줄(고정 접두어 + JSON)을 쓴다 — 되돌리기 쉬움: 옛 로그도 경계 없는 한 덩어리로 읽히므로 runner-child와 파서 두 곳만 고치면 된다 → ADR 아님
- 로그 읽기 API는 요청 경로를 받지 않고 서버 기록의 경로만 읽는다 — 되돌리기 쉬움: 라우트 하나에 갇힌 구현 선택이고 스크립트 API가 이미 같은 모양이다 → ADR 아님
- 실패 digest·요약은 경계 줄을 빼고 계산하고 범위는 그대로 둔다 — 되돌리기 쉬움: `logEvidence` 한 함수의 입력 필터다 → ADR 아님
- 512 KiB 꼬리, 3초 폴링 — 기본 제외 목록(한도·주기 수치) → ADR 아님

## 9. 경계·후속

- 관찰: 재시도 정산의 digest·요약이 이전 시도 출력까지 포함한다 — 로그를 이어 쓰므로 2차 정산의 digest는 1차와 거의 항상 달라 `local_code_defect`(같은 실패 두 번 → code_defect 수리 인계, `queue-store.js:7878`) 판정이 사실상 닿지 않고, 요약도 1차 시도의 실패 줄을 고른다. 이 스펙의 경계 줄이 "마지막 시도만" 계산을 가능하게 하지만, 범위를 좁히면 지금 죽어 있는 수리 인계가 살아나는 별도 동작 변경이라 여기서 하지 않는다. 마감의 fix-now 게이트에서 `defect`로 후속 Bead를 판정한다.
