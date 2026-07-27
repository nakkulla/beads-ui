# 워커 verify 출력 tail 보존 + 카드 상세 재개 동선 설계 (UI-qult)

- 날짜: 2026-07-27
- Bead: UI-qult (task, P2)
- 라우트: spec_backed
- 관련: UI-2o4z(§3에서 addDetached git stderr 보존 완료, PR #44), UI-0kyh(단위 ②로 통합), UI-dcw7(dismiss 도입)

## 배경

post_merge_verify가 실패해도 verify 명령 자체의 출력이 어디에도 남지 않는다.
`runVerifyCmd`가 `stdio:'ignore'`로 자식 프로세스를 띄우기 때문이다
(`server/worker/verify-cmd.js` L200-205). 실사고 2026-07-27: dotfiles-nwr8/roon
post_merge_verify 실패 원인(launchd PATH의 rg 부재, TERM=dumb, C 로케일)을
특정하는 데 fresh worktree 수동 재현 여러 회가 필요했고, nwr8의 마지막 간헐
실패는 출력 부재로 끝내 미특정.

또한 실패 배너를 ✕(dismiss)하면 배너의 [이어하기]가 함께 사라지는데, 세션 상세
모달의 세션 이력에 있는 per-row "↻ 이어하기" 버튼(`session-history.js`)이
자격 식에 `!dismissed`를 포함해 dismissed attempt를 UI만 추가로 배제한다. 서버
`scheduler.resume()`은 dismissed_at을 검사하지 않으므로(자격: not_failed /
no_session_id / worktree_missing / bead_running / already_resumed) UI가 서버보다
엄격하다. UI-kzxz 복구(2026-07-27) 때 서버 API 직접 호출로 우회해야 했다.

탐색으로 확정한 전제:

- `runVerifyCmd` 호출자는 3계열 — pre-merge 폴러(`pr-poller.js`, 메모리
  `prObservations`), 클릭 재검증(`pr-actions.js` gateNow), post_merge_verify →
  `cleanup_failed` 영속 레코드(`failCleanup` → `recordCleanupFailure`). 세션
  attempt의 `cause`/`cause_detail`은 별개 모듈(`verify.js`, PR 제출 확인)이
  채우므로 이번 작업과 무관.
- 출력 캡처 선례: `server/bd.js` `runShell`의 chunk 수집 +
  `workspace-handlers.js`의 `stdout_tail`/`stderr_tail`. 단, `verify-cmd.js`는
  timeout/exit 의미가 달라 의도적으로 `runShell`과 분리된 모듈이므로 위임하지
  않고 내부 캡처한다(승인된 접근 A).
- `cleanup_failed` 레코드·`dismissed_at`은 bdui 내부 queue.json 상태로 dotfiles
  workflow 계약 표면이 아니다 — 계약 문서 정합 불필요.

## 범위

- 단위 ①: `runVerifyCmd` 출력 tail 캡처 → post_merge_verify 실패 시
  `cleanup_failed` 레코드 영속 → cleanup 배너 접기/펼치기 표시.
- 단위 ②: 세션 이력 재개 자격에서 dismissed 배제 제거(서버 정합) + failed/orphaned
  row에 cause 표시.

## 비범위

- pre-merge 폴러·gateNow·deploy 경로의 tail 영속/표시(반환값에 tail은 실리지만
  소비하지 않음 — 후속 확장 지점만 확보).
- 서버 `scheduler.resume()` 자격 변경(dismissed_at은 계속 비검사 — 현행 유지).
- 배너 쪽 dismiss 의미 변경(dismiss는 여전히 배너를 숨기고, dismissed attempt의
  재개는 상세 모달에서만).
- attempt `cause`/`cause_detail`을 채우는 로직 변경(표시만 추가).

## 설계

### §1 캡처 — `server/worker/verify-cmd.js`

`runVerifyCmd`의 spawn 옵션을 `stdio: ['ignore', 'pipe', 'pipe']`로 변경한다.

- 두 스트림 각각 `setEncoding('utf8')` 후 `'data'`마다 **공유 롤링 버퍼**(단일
  문자열 누적, 도착 순서) 뒤에 붙이고, 길이가 `TAIL_WINDOW`(16384자)를 넘으면
  앞에서 잘라 유지한다 — 메모리 유계.
- `close` 시점에 tail 계산: 버퍼를 `\n` 기준으로 나눠 마지막
  `TAIL_MAX_LINES`(100)줄을 취하고, 이어서 `TAIL_MAX_CHARS`(8192자) 상한을
  앞에서부터 잘라 적용한다. 16KB 윈도는 줄 수·문자 수 어느 캡이 지배해도 최종
  tail에 손실을 만들지 않는다.
- 결과 부착 조건: `reason`이 `verify_cmd_failed` 또는 `verify_cmd_timeout`이고
  trim 후 비어 있지 않을 때만 `VerifyCmdResult.output_tail`(string, optional)로
  반환. 성공·`verify_cmd_spawn_error`(출력 없음)·빈 캡처는 필드 부재. 타임아웃의
  부분 출력은 진단 가치가 크므로 포함한다.
- 스트림 `'error'` 이벤트는 무시 — 캡처는 best-effort이며 verify 판정(ok/reason/
  exit)을 절대 바꾸지 않는다. 타임아웃 SIGKILL·exit 판정·`spawn_impl` 주입
  구조는 불변.
- `runVerifyAtSha`는 `runVerifyCmd` 결과를 그대로 반환하므로 수정 없음
  (`output_tail`이 자연 통과).

### §2 영속 — `server/worker/pr-actions.js` → `server/worker/queue-store.js`

- `postMergeVerify` 실패 경로(`runCleanup`)에서 `failCleanup`에 optional
  `output_tail` 인자를 추가해 `recordCleanupFailure`까지 전달한다.
- `queue-store.js`의 `Queue.cleanup_failed` 인라인 레코드 타입에
  `output_tail?: string` 추가. `recordCleanupFailure`는 비어 있지 않은
  string일 때만 저장한다.
- `normalizeQueue`의 cleanup_failed round-trip에 `output_tail` 보존을 추가한다
  (UI-2o4z §5의 `detail`과 동일한 자리 — string 타입일 때만 유지, 아니면 드롭).
- WS 전달은 `decorateQueue`(`server/ws/worker-handlers.js`)가 큐를 스프레드하므로
  자동 통과 — 코드 수정 없음.

### §3 배너 UI — `app/views/worker/index.js` + `app/views/worker/running-grid.js`

- `app/views/worker/index.js`의 cleanup_failed → `cleanupFailures` projection에
  `output_tail` 복사 추가.
- `running-grid.js` `CleanupFailure` typedef에 `output_tail?: string` 추가.
- `bannersTemplate`의 cleanup 배너: 접힌 상태는 현행 유지(reason + 160자
  `detail` 요약). `output_tail`이 있으면 아래에
  `<details class="worker-banner__tail"><summary>출력 tail</summary><pre>…</pre></details>`
  블록을 추가한다. tail은 lit-html 텍스트 바인딩으로 렌더(세션/도구 출력은
  신뢰 불가 입력 — 이스케이프 필수).
- 템플릿에 `open` 속성을 바인딩하지 않는다 — `<details>`의 open은 DOM 상태라
  lit 재렌더(스냅샷마다) 간에 사용자의 펼침 상태가 유지된다.
- CSS: `.worker-banner__tail pre`에 max-height(약 240px)·`overflow-y:auto`·
  monospace·`white-space: pre-wrap`(긴 줄은 줄바꿈 — 배너 폭 초과 금지).

### §4 재개 동선 + cause 표시 — `app/views/detail-panel/session-history.js` + `app/views/detail-panel/index.js`

- `session-history.js` `resumeButton`: 자격 식을 `has_sid && !already`로
  축소(‛dismissed’ 항과 해당 title 분기 삭제). dismissed row도 서버 자격만
  충족하면 활성 — 서버 `scheduler.resume()` 판정과 정합(수용 기준 2).
- `SessionAttempt` typedef에 `cause?: string|null`,
  `cause_detail?: { reason: string, command: string|null }|null` 추가.
- `detail-panel/index.js` `attemptsForBead` projection에서 store attempt의
  `cause`/`cause_detail`을 복사.
- failed/orphaned row에 `cause`가 있으면 `detail-session__cause` 한 줄(CSS
  말줄임)로 표시하고, `cause_detail`이 있으면 title 툴팁에
  `"{reason} · {command}"`를 넣는다. cause 부재 시 아무것도 렌더하지 않음
  (구 레코드 fail-quiet).

### §5 테스트

- `server/worker/verify-cmd.test.js` (fake `spawn_impl`에 stdout/stderr 스트림
  추가):
  - 실패 시 `output_tail` 포함, 성공 시 부재
  - 100줄 초과 출력 → 마지막 100줄만
  - 8192자 상한 적용
  - 타임아웃 시 부분 출력 포함
  - spawn_error 시 필드 부재
- `server/worker/pr-actions.test.js`: post_merge_verify 실패 →
  `recordCleanupFailure` 호출에 `output_tail` 전달.
- queue-store 테스트: `recordCleanupFailure` 저장, `normalizeQueue` round-trip
  보존, 비-string 드롭.
- `app/views/worker/index.test.js`: `output_tail` 있는 cleanup 배너에
  `<details>`/`<pre>` 렌더, 없는 레코드는 현행 렌더 유지, 내용 이스케이프.
- session-history 테스트: dismissed failed row의 이어하기 버튼 활성화(기존
  "처리 완료로 닫은 attempt" 비활성 테스트는 반전), cause 표시·cause 부재 시
  미표시.

## 수용 기준 (bead와 동일)

1. verify 실패 레코드에 verify_cmd 출력 tail이 보존되고 UI(배너/카드 상세)에서
   확인된다.
2. dismiss된 실패 attempt도 카드 상세에서 [이어하기]로 재개할 수 있다(서버
   resume 자격 판정과 일치).
3. `npm run all` + `npm run build` green, 번들 커밋 포함.

## 마감

Pre-Handoff Validation(tsc/test/lint/prettier/build) 후 번들
(`app/main.bundle.js{,.map}`) 커밋. 머지 후 AGENTS.md Post-Merge Runtime
Validation(`bdui-shared restart` + 프로세스 경로·포트·HTTP 검증)까지 완료해야
작업 완료.
