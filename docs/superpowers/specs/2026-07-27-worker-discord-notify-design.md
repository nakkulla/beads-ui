# 워커 attempt 디스코드 알림 (UI-2yoq)

## 배경

UI-2wa9 attempt가 `session_failed:result_count`로 조용히 실패했을 때, 사용자가
큐를 열어보기 전까지 외부 신호가 전혀 없었다. 워커에는 UI 웹소켓 이벤트
스트림(`emitQueueChanged`)만 있고 외부 푸시 경로가 없다. 실패 사유의 UI
노출(UI-pvqz)은 해소됐지만, pr_wait 진입(사람의 [머지] 클릭 대기)처럼 사람
행동이 필요한 시점을 밖으로 알리는 경로는 여전히 없다.

## 범위

워커 attempt 수명주기 전이 3종에서 `discord` CLI로 알림을 발송한다.

1. **attempt 시작** — 첫 디스패치·수동 재개·충돌 해결 세션 공통
   (`launchSession` 공용 꼬리).
2. **attempt 실패** — `cause` 포함(`session_failed:*`, `verify_failed:*`,
   `loud_fail_blocker`, `workflow_mode_revert_failed`, `spawn_failed`,
   `exec_stamp_failed`).
3. **pr_wait 진입** — 성공 종료. `onSessionDone` 성공 경로와 reconcile 처분
   경로 모두.

### 비목표

- 디스패치 거부/스킵 배지(`recordSkipReason` — `spec_missing_at_base:*` 등)는
  알림하지 않는다. attempt를 만들지 않는 경로이고, UI-pvqz로 이미 UI에
  노출되며, 틱마다 반복 재발송될 수 있어 푸시로는 노이즈다.
- 사용자가 명시적으로 중단(■)한 attempt의 종결은 실패 알림을 보내지 않는다 —
  사용자 자신의 행동이다.
- 채널 라우팅: `discord` CLI는 단일 웹훅(채널 옵션 없음)이다. 대상을 바꾸려면
  config의 `cmd`를 다른 명령/래퍼로 교체한다. CLI 확장은 이 스펙 밖.
- [머지] 클릭 이후(머지 완료·deploy 결과) 알림은 범위 밖.

## 설계

### 컴포넌트

**`server/worker/notify.js` (신규)** — `createNotifier({ getConfig, spawnImpl?,
log? })`가 `{ attemptStarted(input), attemptFailed(input), prWaitEntered(input) }`
를 반환한다.

- 각 메서드는 호출 시점마다 `getConfig().worker_notify`를 읽는다(live 반영,
  `worker.verify`/`worker.deploy`와 동일 — 재시작 불필요).
- disabled(섹션 부재 포함)면 즉시 no-op.
- 어떤 입력·환경에서도 throw하지 않는다(내부 전체 try/catch).

**`server/config.js`** — `normalizeWorkerNotify(parsed)` 추가.

```toml
[worker.notify]
enabled = true
# cmd = ["discord"]   # 선택: argv 배열(셸 없이 spawn), 기본 ["discord"]
```

- 정규화 결과: `worker_notify: { enabled: boolean, cmd: string[] }`.
- 섹션 부재 또는 `enabled != true` → `{ enabled: false, cmd: ['discord'] }`.
- `cmd`는 비어있지 않은 string 배열만 유효. 불량이면 로그 후 섹션 무시
  (disabled) — `worker.verify`의 불량 cmd 처리와 동일한 방침.
- 글로벌 단일 섹션이다. 알림은 머신 단위 성격이라 워크스페이스 키잉을 하지
  않는다.

**`server/worker/attach.js`** — `createNotifier({ getConfig })`를 만들어
scheduler deps에 `notify`로 주입한다. `createLiveBd().snapshotBead` 반환에
`title` 필드를 추가한다(`bd show --json` 페이로드의 `issue.title`이 string이면
그 값, 아니면 null).

**`server/worker/scheduler.js`** — `deps.notify`는 선택적이며 부재 시 no-op
기본값을 쓴다(기존 `notifyQueueChanged` 선택적 콜백 선례와 동일). 호출
지점은 아래 표와 같다.

### 이벤트 · 호출 지점 · 발송 형식

| 이벤트 | 호출 지점 | discord 인자 | 메시지 내용 |
|---|---|---|---|
| 시작 | `launchSession` spawn 성공 직후(runtime snapshot 기록 근처) | `-q -t "워커 시작"` (멘션 없음) | bead ID · 제목(있으면) · model/effort · 리포 basename. 재개는 "재개", 충돌 해결은 "충돌 해결" 라벨 |
| 실패 | `failAttempt` 내부 1곳 + 직접 실패 기록 2곳(`spawn_failed`, `exec_stamp_failed`) | `-c red -t "워커 실패"` (멘션 포함) | bead ID · `cause` · 리포 basename |
| pr_wait 진입 | `moveToPrWait` 호출 2곳(onSessionDone 성공, reconcile 처분) | `-c green -t "PR 대기"` (멘션 포함) | bead ID · PR URL(`vr.pr_url`, 없으면 생략) · 리포 basename |

- 멘션 정책: 시작은 정보성이라 조용히(`-q`), 실패·pr_wait은 사람 개입 가치가
  높아 멘션 포함(CLI 기본).
- `title`은 첫 디스패치 경로에서만 snapshot으로 확보된다. 수동 재개·충돌 해결
  경로는 snapshot이 없으므로 title 없이 발송한다(생략, 실패 아님).
- stop(■) 제외 구현: `onSessionDone`은 `stopped` set에 든 attempt를 조기
  반환하므로 stop발 종결은 `failAttempt`에 도달하지 않는다. 명시적 stop이
  직접 기록하는 실패 경로가 구현 중 발견되면 그 지점은 알림을 걸지 않는다.

### 발송 방식 (fire-and-forget)

```
spawnImpl(cmd[0], [...cmd.slice(1), ...플래그, 메시지],
  { stdio: 'ignore', detached: true }).unref()
```

- 셸 없이 argv spawn(`worker.deploy`와 동일 방침).
- spawn 동기 throw와 `error` 이벤트(CLI 부재 ENOENT 포함) 모두 로그만 남기고
  삼킨다. 종료 코드를 기다리지 않는다.
- 알림 발송의 성패는 어떤 경우에도 큐 전이·persist·tick 진행에 영향을 주지
  않는다.
- 공유 서버는 `bdui-shared`가 `~/.local/bin`을 PATH에 넣으므로 기본
  `discord`가 해석된다. 해석 실패 환경은 fail-quiet + config `cmd` 절대경로로
  대응한다.

## 수용 기준

1. attempt 시작/실패(cause 포함)/pr_wait 진입 시 디스코드 알림이 발송된다.
2. discord CLI 부재·실패가 워커 큐 진행을 절대 막지 않는다(fire-and-forget,
   no-throw).
3. config로 비활성화 가능하며, 섹션 부재 시 알림 없음(fail-quiet)이 기본이다.
4. 디스패치 거부 배지와 stop(■)발 종결은 알림되지 않는다.
5. `npm run tsc` · `npm test` · `npm run lint` · `npm run build` green, 번들
   커밋 포함(프론트엔드 무변경이라 번들 무변화 예상).

## 테스트 범위

- `notify.test.js`(신규): fake `spawnImpl`로 이벤트별 argv 조립(플래그·메시지
  내용) 검증, disabled/섹션 부재 no-op, spawn throw·error 이벤트 무해성.
- `config.test.js`: `worker.notify` 파싱 — 부재/유효/불량 `cmd`.
- `scheduler.test.js`: fake `notify` 주입 — 디스패치 시 `attemptStarted`,
  실패 시 `attemptFailed(cause)`, 성공 시 `prWaitEntered` 호출, stop 시
  미호출.
- `attach.test.js`: `snapshotBead`의 `title` 필드.
