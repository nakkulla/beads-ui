# 세션 로그의 서버 재시작 생존성 — runner 출력 파일 fd 직접 기록 + tail 팔로우 (UI-o2yt)

- 날짜: 2026-07-28
- Bead: UI-o2yt (spec_backed)

## 1. 배경·문제

worker runner 세션은 detached로 스폰되어 서버 재시작을 넘겨 살아남지만
(`server/worker/runner/session.js` — `detached: true, stdio: pipe`), 세션
로그는 **서버 프로세스가 child stdout 파이프를 읽어**
`sessionLog.append()`로 기록하는 구조다. 서버가 재시작하면:

- 파이프 수신단이 사라져 로그 append가 그 시점에 동결된다 — 드로어
  "라이브 따라가기"가 스냅샷에서 멈추고, 이후 출력은 죽은 파이프로
  유실된다(복구 불가).
- merge guard·question 감지(fail-closed)·usage 집계도 스트림과 함께
  소멸한다 — 고아 세션은 안전 계약 없이 완주한다.

실측 사례: beads-rhw attempt(2026-07-28 11:43 시작, `~/External/beads`)가
11:46 서버 재시작으로 로그 동결. 세션은 계속 작업했으나(pid 생존, fd 1/2가
죽은 엔드포인트) 라이브 팔로우·usage 관측이 불가했다.

부수 위험(현행): stderr는 파이프로 열리지만 아무도 읽지 않아 64KB 버퍼가
차면 child가 블록될 수 있다.

## 2. 목표·비목표

**목표**:

1. runner 출력의 영속화를 서버 프로세스 수명에서 분리 — 서버 재시작과
   무관하게 세션 로그가 끊기지 않는다.
2. 재시작 후 살아있는 고아 세션에 **전체 재접속**(사용자 확정): 드로어
   라이브 팔로우 + merge guard 재무장 + usage 실시간 집계 재개.

**비목표**:

- 세션 로그 캡/회전(현행과 동일하게 없음 — 필요 시 UI-0x54의 10MB 캡·회전
  관례를 후속으로).
- 고아 세션의 정상 종료 판정 변경 없음 — pid 사망은 기존 60s reconcile
  pid probe + `gh` 관측 경로가 수습한다. 단 monitor의 guard-kill은
  예외로, blocker 증거가 `gh` 성공 관측보다 우선한다(§3.3 — 엔진 세션의
  blocked-무효화 계약을 monitor 경로에 보존하는 fail-closed 요구).
- 프론트엔드·ws 프로토콜 변경 없음(드로어·`subscribe-session-log` 무변경).
- 로그 파일 경로·포맷 변경 없음(`$XDG_STATE_HOME/bdui/<slug>/sessions/
  <attempt_id>.jsonl`, raw jsonl) — UI-ediw 재생·기존 로그와 호환.

## 3. 설계

### 3.1 전송 경로 교체 — 파일이 유일한 진실 소스

**스폰** (`server/worker/runner/session.js`):

- 엔진이 스폰 전에 세션 jsonl 파일을 append 모드로 열고(`fs.openSync(path,
  'a')`, 디렉터리 선생성) `stdio: ['ignore', out_fd, err_fd]`로 전달한다.
  커널이 직접 기록하므로 서버 사망과 무관하게 로그가 쌓인다. 스폰 직후
  서버 쪽 fd 복사본은 닫는다.
- stderr는 별도 `<attempt_id>.stderr.log` fd로 분리한다 — jsonl 순수성
  유지, 스폰/CLI 오류 증거 확보, 기존 stderr 블록 위험 제거.
- 로그 파일 경로 산출은 기존 `sessionLogPath()`(`state-paths.js`)를
  주입받아 사용한다.

**엔진 line source**:

- stdout `'data'` 리스너를 **파일 tail 리더**로 교체한다: `fs.watch` 기반
  변경 감지 + 오프셋 증분 읽기 + 부분 줄 버퍼링, `fs.watch` 유실 대비
  폴링 폴백(~500ms).
- 기존 `onLine()` 파이프라인(question 감지 → merge guard → session_id 추출
  → normalize → verdict 입력)과 핸들 이벤트 계약(`raw`/`event`/
  `session_id`/`done`)은 그대로 유지한다 — scheduler 배선
  (`scheduler.js:1510-1537`)과 usage 집계는 무변경.
- child `close` 시 tail을 EOF까지 드레인한 뒤 verdict를 확정한다(잔여
  버퍼 플러시는 현행 `finish()` 관례 유지).

### 3.2 session-log.js — 쓰기 은퇴, 브로커 유지

- 라이브 경로의 `append()`(서버 쓰기 + emit)는 은퇴한다. child가 파일에
  직접 쓰므로 서버 쓰기는 중복 기록이 된다.
- `attach(workspace, attempt_id, events)`는 파일 쓰기 없이 `'raw'` 이벤트
  재방송(in-process `append` emit)만 남긴다 — ws 드로어 append 푸시
  경로(`worker-handlers.js` `SESSION_LOG_SUBS`)가 무변경으로 동작한다.
- `read()`(스냅샷 전체 읽기, malformed 줄 스킵)는 무변경.

### 3.3 재시작 재접속 — detached monitor

startup reconcile(`attach.js` `initWorkerRuntime` 경로)에서, persisted
`running` attempt 중 pid가 살아있는 것마다 **detached monitor**를
시작한다. monitor는 엔진과 같은 tail 소비자를 child 핸들 없이 구동하는
경량 핸들이다:

- **tail 시작점**: 파일 EOF 직전의 **마지막 newline 경계**. EOF가 작성
  중인 줄 중간일 수 있으므로, 그 경계 이후의 trailing bytes를 tail
  리더의 초기 부분-줄 버퍼로 seed하고 줄이 완성된 뒤에만 처리한다 —
  mid-line 재접속에서 guard/question 한 줄도 잃지 않는다. 과거분은
  드로어 스냅샷 `read()`와 UI-ediw usage 재생이 파일 전체에서 복원한다.
- **드로어**: monitor의 tail이 `sessionLog` 브로커로 `'raw'` append를
  흘려 라이브 팔로우가 재개된다.
- **merge guard·question 감지**: tail 라인을 기존 guard 파이프라인에
  통과시킨다. 위반 시 (1) 먼저 attempt 레코드에 blocker 증거를 durable
  기록하고(`cause_detail: {reason, command}` + guard-kill 표지 patch),
  (2) **kill 직전 pid 재검증** — `defaultProbePid`로 생존과 persisted
  `started_at` 일치를 확인하고, 불일치(사망·PID 재사용)면 signal을 보내지
  않고 reconcile 처분에 맡긴다 — 통과 시에만 그룹 킬(`kill(-pid)`).
  monitor 시작 시에도 같은 재검증을 수행한다.
- **guard-kill의 fail-closed 종결**: `disposeDeadAttempt`(reconcile의
  사망 처분)는 attempt에 기록된 guard-kill blocker 증거를 `gh` 관측
  성공보다 **우선**한다 — 증거가 있으면 PR 존재 여부와 무관하게
  `loud_fail_blocker`/`cause_detail`로 실패 종료한다. 엔진 세션의
  blocked verdict가 성공을 무효화하는 현행 계약을 monitor 경로에도
  보존하는 것.
- **usage**: 라인의 usage 리프트를 기존 usage-store 경로로 계속 집계한다
  (UI-ediw 재생이 과거분을 복원하고 monitor가 이후를 이어감). pid 사망
  처분 시에는 monitor tail을 **EOF까지 드레인한 뒤 `usagePatch()`를 1회
  적용**해 성공·실패 어느 terminal 전환에서도 usage가 attempt에
  영속화되고 tally가 정리되게 한다 — 현행 `disposeDeadAttempt`에는
  usage 영속화 경로가 없어 monitor가 복구한 집계가 메모리에서 유실된다.
- **session_id**: attempt 레코드에 이미 persist되어 있으므로 재추출은
  불필요(있으면 무해).
- **수명**: monitor는 verdict를 내지 않는다. reconcile pid probe가 사망을
  관측하면 monitor를 정리(EOF 드레인 → usage 영속화 → tail 종료)하고
  기존 `gh` 관측 경로가 결과를 수습한다(위 blocker 증거 우선 규칙 적용).
  드로어 구독자 유무와 무관하게 monitor는 running 동안 상시 구동한다
  (guard·usage가 구독자와 무관한 소비자이므로).

### 3.4 적용 범위

`runSession()`을 공유하는 모든 어댑터(claude/codex/ccx)가 한 번에
커버된다. 어댑터별 argv/normalize/verdict 계약은 무변경.

## 4. 오류 처리

- 스폰 전 fd open 실패 → 디스패치 실패(fail-visible, 현행 스폰 실패
  경로와 동일하게 attempt failed 처리).
- tail 읽기 오류 → 오프셋 유지 재시도(백오프). 로그 계약은 현행 유지 —
  "로그 경로 실패가 세션을 죽이지 않는다". guard 공백이 생기는 지속
  실패는 debug 로그로 가시화한다(현행: 서버 사망 시 guard 전체 소멸이므로
  순증 개선).
- JSON 파싱 실패 줄 → 스킵(현행 동일). 부분 줄은 tail 버퍼가 다음 읽기와
  이어 붙인다.
- monitor 대상 파일 부재(ENOENT) → 재시도 후 monitor만 포기(세션 무접촉),
  debug 로그.

## 5. 테스트

- 엔진 단위: line source를 주입 시임으로 유지해 기존 fixture-spawn 기반
  테스트(질문/guard/verdict/session_id)를 보존한다.
- tail 리더: 부분 줄 이어붙임, 증분 오프셋, 폴링 폴백, EOF 드레인.
- 스폰 배선: fd 전달(stdio 슬롯), 서버 쪽 fd close, stderr 분리 파일.
- session-log: `attach()`가 파일을 쓰지 않고 재방송만 하는 것, `read()`
  스냅샷 호환.
- 재시작 통합: 파일에 이어 쓰는 fake child + 새 프로세스 컨텍스트에서
  monitor가 (a) 드로어 append 재개 (b) guard 위반 시 기록된 pid 그룹 킬
  (c) usage 틱 계속을 수행하는지.
- mid-line 재접속: EOF가 줄 중간인 파일에 monitor를 붙였을 때 trailing
  bytes가 seed되어 완성된 줄이 정확히 1회 처리되는지.
- guard-kill fail-closed: monitor가 kill한 attempt를 `disposeDeadAttempt`
  가 처분할 때 PR이 존재해도 blocker 증거가 우선해 실패 종료하는지.
- 사망 처분 usage 영속화: pid 사망 시 EOF 드레인 후 `usagePatch()` 1회로
  terminal attempt에 usage가 저장되고 tally가 정리되는지.
- pid 재검증: 생존 불일치(`started_at` 불일치 포함)에서 signal을 보내지
  않고 reconcile 처분으로 넘기는지.

## 6. 순서 제약

UI-ediw(PR #55)·UI-12k6이 `session-log.js`/`scheduler.js`를 건드린 채
pr_wait 중이다. **두 PR 머지 후 착수**한다(충돌·재작업 방지). UI-ediw의
usage 재생은 이 설계의 §3.3 usage 복원이 전제하는 선행 조각이다.
