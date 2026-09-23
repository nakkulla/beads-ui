---
scope:
  - server/worker/wait-judgment.js
  - server/worker/scheduler.js
  - server/worker/external-wait/service.js
  - server/worker/external-wait/store.js
  - server/worker/external-wait/adapters/process.js
  - server/worker/external-wait/session-resume.js
  - server/worker/external-wait/completion-prompt.js
  - server/worker/tmux-launcher.js
  - server/worker/queue-store.js
  - server/worker/runtime.js
  - server/ws/worker-handlers.js
  - app/protocol.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/detail-panel/index.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 세션 소유 외부 대기의 완료 출구는 `[세션에서 이어가기]`·`[워커로 이어가기]` 둘이고, 키를 지우는 stop은 확인을 거치며 완료 뒤의 `[대기 해제]`는 상세 패널에만 선다

- Bead: UI-r6xq (`spec_backed`)
- 작성: 2026-09-23 · r1 (spec_review r1 astra REVISE b8/m2 반영 — 저장소 `resume.mode` 검증기,
  대화형 세션 reconcile의 종류별 마커, 기동 전 예약과 pane 증거 정산, 실패 기록 보존, 소유
  세션 동일성 판정과 미확인 시 비기동, 프롬프트의 키 정산 문구, 계약 전사 범위와 dotfiles
  체커, 알림 참조 원천, 자격 실패 셋)
- 조사 기준: `origin/main` `4d5cef234269ccbcdd7f5ef458ac7a26e43e8174`
- 형제 결함 수리: UI-uuvh (`quick_fix`, stop·detach의 키 쓰기 완료 전 거짓 `조치 필요` 판정)

## 1. 요구와 확인한 현재 동작

UI-l48z(`2026-09-23-external-wait-session-tile-card-declutter-design.md`, ADR UI-l48z)가
착지한 직후 사용자가 microbiome_bile `Analysis-owzn`의 세션 소유 대기(`w-20668dc9d2b7`)
완료 타일에서 `[대기 해제]`를 눌렀고, 대기 표시와 이어갈 길이 함께 사라졌다. 사용자
질문 세 가지에 대해 확인한 원인은 다음과 같다.

| 지적 | 확인한 원인 |
|---|---|
| `대기 해제`와 `관찰 중단`의 차이를 모르겠다 | 둘 다 서버 `/stop` 하나다(`wait-judgment.js:294`–`320`). `hold`·`detached`에서는 `[관찰 중단]`, `completing`에서는 `[대기 해제]`로 라벨만 갈린다(UI-l48z §4.3). 둘 다 `external_wait` 키를 지워 Worker 입장을 다시 열고 레코드를 `stopped`로 닫는다. 어느 것도 세션을 재개하지 않는다. 계약상 이 키는 "존재만으로 Worker 입장 fail-closed"인 자물쇠이고(`docs/contracts/external-wait.md` Signal), stop은 그 자물쇠를 사람이 푸는 유일한 출구다 — 정상 흐름의 버튼이 아니라 비상 출구인데 완료 카드의 정면 조작 자리에 있다. |
| 세션에서 이어가는 버튼이 없다 | 완료 출구는 `[워커로 이어가기]`(`/resume` fork, Worker가 클레임)와 재개 실패 시 `[새 세션으로]`뿐이다. UI-l48z §3은 "카드에 `⧉ 재개 명령` 버튼을 더한다"를 기각하고 세션 정체 칩 클릭(ID 복사)과 Discord 완료 알림의 재개 명령 줄을 택했다. 칩은 버튼으로 보이지 않고 조작 줄에는 `[대기 해제]`·`[워커로 이어가기]`만 서므로 그 둘 중 하나를 고르게 된다. 계약(`external-wait.md` Resume)에도 사람이 자기 세션에서 잇는 경로가 없다 — 세션 소유 대기의 출구는 "Discord 알림 뒤 사람의 `[이어하기]`(fork)"뿐이다. |
| 누르자 `⛔ 조치 필요 · 대기 레코드 없음`이 떴다 | `service.js stop()`이 `stage='stopped'`를 먼저 쓰고 키 unset을 뒤에 해 그 사이 판정이 "키만 남은 잔재"로 읽었다(11:03:18.610 클릭 → 11:03:18.785 알림 → 11:04:30 unset 착지). 코드 결함이며 UI-uuvh가 따로 고친다. |

확인한 사실 넷이 설계를 정한다.

- **대화형 tmux 기동 기제가 있다.** `[세션에서 해결]`(UI-jw27)과 문의 세션(UI-7uid)이
  `server/worker/tmux-launcher.js`로 Worker 호스트의 tmux에 대화형 `claude`/`codex`
  창을 연다(pane marker 중복 방지, 마커 선기록 뒤 exec, 브리지 heartbeat 판정).
  `resolve-session.js`는 `claude --resume <id> --fork-session --session-id <new> <prompt>`로
  보존 세션을 fork한다. 예전 로케일 결함(`-F` 출력의 탭 살균)은 `paneFormat`이 `:`
  구분자로 바뀌어 사라졌다(`tmux-launcher.js:88`–`98`).
- **레코드의 소유 세션 재료로는 생사를 판정할 수 없다.** 세션 소유 레코드의 `owner`는
  `session_ref`·`session_pid`·`session_start`를 싣는다(계약 Record). 로컬 프로세스
  어댑터가 `LC_ALL=C ps -p <pid> -o lstart=` 프로브를 이미 쓴다
  (`external-wait/adapters/process.js:35`) — 등록 시에는 제출 시각 ±300초 대조, 관찰
  시에는 저장된 시작 문자열과의 정확 일치(`:61`)로 pid 재사용을 막는다. **그러나 세션
  소유 레코드의 `session_pid`는 claude 프로세스가 아니다** — 세션이 `bead-wait register`에
  넘긴 값은 Bash 도구 호출의 `$$`(명령마다 새로 뜨고 끝나는 셸)다. owzn 레코드의 pid
  45312는 없지만 세션 72e56fe8은 pid 61128로 살아 있었다(2026-09-23 실측).
- **Claude Code 세션 레지스트리가 생사의 정확한 원천이다.** `~/.claude/sessions/<pid>.json`은
  살아 있는 대화형 세션마다 `pid`·`sessionId`·`procStart`·`tmux`(pane 좌표)를 싣고,
  `procStart`는 `TZ=UTC LC_ALL=C ps -p <pid> -o lstart=`의 출력과 바이트가 같다(pid
  61128 실측: 둘 다 `Tue Sep 22 20:45:09 2026`). `claude --resume`는 같은 sessionId를
  유지하므로 어느 터미널에서 이어가든 sessionId로 찾힌다. codex에는 같은 레지스트리가 없다.
- **재개 프롬프트 블록이 있다.** Worker fork 재개는 `## 외부 작업 완료` 블록(잡별
  state·exit·evidence·expected 결과·recovery_needed·로그·digest·"관찰 완료는 구현 완료가
  아니다")을 첫 프롬프트로 싣는다(`scheduler.js externalWaitCompletionPrompt`). 사람의
  재개도 같은 블록을 받으면 된다.
- **Discord 완료 알림은 이미 재개 명령을 싣는다**(UI-l48z §4.4, `notify.js:590`).
  카드에는 없다.

## 2. 사용자 결정 (2026-09-23)

1. `[세션에서 이어가기]`는 tmux 창에서 보존 세션을 재개한다(복사가 아니라 기동).
   원래 터미널 프로세스가 살아 있으면 띄우지 않고 재개 명령을 복사한다.
2. `[관찰 중단]`(잡이 아직 도는 중)은 카드에 남긴다. `[대기 해제]`(완료 뒤)는 카드에서
   빼고 상세 패널에만 둔다. 키를 지우는 두 조작은 확인 다이얼로그를 한 번 거친다.
3. 키 해제의 소유자는 서버다 — 기동 성공 readback 뒤에 지운다(Worker fork와 같은 순서).

## 3. 접근 대안과 선택

**세션에서 잇는 출구.**

- *(선택) 서버가 보존 세션을 tmux 창에서 재개한다(`/resume mode: 'session'`).* 클릭 한
  번으로 세션이 열리고, 첫 프롬프트로 완료 블록을 받으며, 기동 성공이 곧 인계 증거라
  키 해제 시점이 자명하다. 문의·해결 세션과 같은 launcher를 쓰므로 새 기제가 없다.
  휴대폰에서 눌러도 Mac에 열리고 Discord 브리지로 닿는다.
- *재개 명령 복사만.* 상태를 바꾸지 않아 단순하지만, 키를 누가 지우는지가 남는다 —
  재개한 세션이 스스로 `bead-wait` 새 명령을 불러야 하고(dotfiles CLI·절차 변경),
  사람이 명령을 붙여 넣지 않으면 키가 영원히 남는다.
- *`[워커로 이어가기]`를 세션에서 잇는 것으로 간주한다.* Worker가 클레임하므로
  "세션 권장" Bead의 1순위와 어긋난다(UI-l48z §2-4).

**키를 지우는 조작의 자리.**

- *(선택) `[대기 해제]`는 상세 패널만 + 확인 1회, `[관찰 중단]`은 카드 유지 + 확인 1회.*
  완료 카드의 정면에는 이어가기 둘만 남고, 잡이 도는 동안의 감시 중단은 여전히 카드에서
  닿는다. 확인은 되돌릴 수 없는 키 삭제(Worker 입장 재개방)의 값에 맞다.
- *카드 유지 + 확인.* 완료 카드에 조작이 셋~넷 서고 사고가 난 자리 그대로다.
- *상세 패널만, 확인 없음.* 상세까지 들어간 것을 의도로 본다 — 사용자가 확인을 택했다.

**어느 세션을 재개하나.** Bead metadata `session_ref`의 마지막 항목이다 — Worker fork의
`qualifySessionFork`가 보는 것과 같은 원천이라 두 출구가 같은 세션을 가리킨다.
레코드 `owner`(`session_ref`·`session_pid`·`session_start`)는 이 재개의 판정에 쓰지 않는다(§4.3-2).

**fork인가 resume인가.** 사람의 이어가기는 같은 세션 ID로 `--resume`한다(fork 없음).
Bead의 `session_ref`가 그대로 유효하고 "이어간다"는 말 그대로다. Worker fork가 원본
transcript를 보존하려고 `--fork-session`을 쓰는 이유(Worker가 나중에 같은 세션을 다시
fork할 수 있게)는 사람의 재개에 없다.

## 4. 설계

### 4.1 완료 타일의 조작과 라벨·툴팁·확인

서버 `wait-judgment.js`가 라벨의 유일한 원천이라는 UI-l48z §4.3 규칙은 그대로다.
`WaitReason.actions[]` 원소에 선택 필드 둘을 더한다(`app/protocol.js` typedef 동반):
`placement?: 'card'|'detail'`(없으면 `card`)와 `confirm?: string`(있으면 클라이언트가
그 문장으로 확인 다이얼로그를 띄우고 취소하면 보내지 않는다).

| stage | 소유 | op · payload | label | placement | confirm | title |
|---|---|---|---|---|---|---|
| `hold`·`detached` | 둘 다 | `external_wait_check` | `[지금 확인]` | card | — | 지금과 같다 |
| `hold`·`detached` | 둘 다 | `external_wait_stop` | `[관찰 중단]` | card | `beads-ui가 이 작업을 더 지켜보지 않고 대기 키를 지웁니다. 잡은 그대로이고 Worker가 이 Bead를 다시 집을 수 있게 됩니다. 계속할까요?` | 지금과 같다 |
| `completing` | session | `external_wait_resume` `mode: 'session'` | `[세션에서 이어가기]` | card | — | `보존 세션을 같은 워크트리의 tmux 창에서 재개한다 · 열리면 대기 키가 풀린다 · 원래 세션이 살아 있거나 확인되지 않으면 열지 않고 재개 명령을 복사한다` |
| `completing` | session, 또는 worker + `resume.error` | `external_wait_resume` `mode: 'fork'` | `[워커로 이어가기]` | card | — | 지금과 같다(예약 없거나 `resume.error`일 때만 — 지금 조건 그대로) |
| `completing` + `resume.error` | 둘 다 | `external_wait_resume` `mode: 'fresh'` | `[새 세션으로]` | card | — | 지금과 같다 |
| `completing` | 둘 다 | `external_wait_stop` | `[대기 해제]` | **detail** | `이어가지 않고 대기 키를 지웁니다. 잡은 그대로이고 이 대기의 표시는 카드와 상세에서 사라집니다. 계속할까요?` | 지금과 같다 |
| 레코드 없이 키만 남음(`wait_record_missing`) | — | `external_wait_stop` | `[관찰 중단]` | card | `레코드가 없는 대기 키를 지웁니다. 계속할까요?` | 지금과 같다 |

`[세션에서 이어가기]`는 `resume`가 null이거나 `resume.error`가 있을 때 선다(재시도 허용).
Worker 소유 `completing`에는 서지 않는다 — Worker 소유 대기는 자동 fork이고 사람의
출구는 지금처럼 fork 실패 뒤 `[워커로 이어가기]`·`[새 세션으로]`다.

**1순위 버튼.** 세션 소유 `completing`에서 Bead에 `session-preferred` 라벨이 있으면
`[세션에서 이어가기]`가 `op-btn--primary`, 없으면 `[워커로 이어가기]`가 primary다
(`lanes.js:2453` `primary` 판정을 이 둘로 넓힌다). 순서는 `[세션에서 이어가기]` ·
`[워커로 이어가기]` · `[새 세션으로]`다.

**release 줄(슬롯 3).** 세션 소유 `completing`의 release는
`완료 · [세션에서 이어가기] 또는 [워커로 이어가기]`다(`wait-judgment.js:286`). Worker
소유 `completing`은 지금 그대로다.

**자리.** 조작은 UI-l48z §4.3의 슬롯 6 foot 그대로다. `placement: 'detail'`인 조작은
`runningTile`·`candidateCard`·`miniRow`에서 그리지 않고 상세 패널 `externalJobsTemplate`
아래 조작 줄(`detail-panel/index.js:2312`–)에서만 그린다. `waitReasonLines(reason,
options)`에 `options.surface: 'card'|'detail'`(기본 `card`)를 더해 카드 렌더러는
`placement === 'detail'`을 거르고 상세 패널은 `surface: 'detail'`로 전부 받는다.
버튼은 `data-confirm`으로 확인 문장을 싣는다.

### 4.2 서버 `/resume mode: 'session'`

`POST /api/worker/external-wait/<id>/resume`의 `mode`에 `'session'`을 더한다. WS
`external_wait_resume` 검증(`worker-handlers.js:4886`)과 `service.js resumeWait`의
`mode` 검사, REST `routes/worker-queue.js`의 pass-through가 같이 넓어진다. 타임라인
`user_action` 라벨은 `[세션에서 이어가기] 클릭`이다(stop 클릭 라벨의 stage별 정정은
UI-uuvh).

**저장소(`external-wait/store.js`).** 레코드 검증기(`:158`–`170`)의 `resume.mode` 허용
집합에 `'session'`을 더하고, `mode === 'session'`이면 `attempt_id === null`을 요구한다.
typedef `Resume.mode`도 같이 넓힌다.

**진행 중 예약의 정의.** `resume`가 null이 아니고 `resume.error === null`이며
`launched_at === null`이면 진행 중 예약이다 — fork·fresh 예약(`attempt_id` 있음)과
session 예약(`attempt_id: null`) 둘 다다. 진행 중 예약이 있으면 `fork`·`fresh`·`session`
세 모드 모두 `resume_reserved`로 거절한다: `service.js resumeWait`의 fork 전용 검사와
`scheduler.js resumeExternalWait`의 `record.resume?.attempt_id` 검사를 이 정의로 바꾼다
(지금은 session 예약이 `attempt_id`를 갖지 않아 fresh가 통과한다).

**수락 조건(`service.js resumeWait` + `scheduler.js resumeExternalWait`).** 레코드가
`completing`이고 `completion`이 있으며 `owner.kind === 'session'`, 진행 중 예약이
없고(`resume.error`가 있는 실패 기록은 허용), 같은 `[workspace, wait_id]`의 재개가 진행
중이 아니다(`external_wait_resumes` 집합). Bead가 `open`이 아니거나 `awaiting_user`가 있으면
fork와 같은 처분(`resume.error='bead_<status>'`, 키 unset, `stopped`)이다. Bead가
클레임·실행 중이거나 폐기가 진행 중이면 `bead_running`·`discard_in_progress`로
거절한다. **admission은 돌리지 않는다** — attempt를 만들지 않으므로 검사할 base·잔재가
없고, 사람의 세션은 자기 워크플로 절차로 클레임한다. 거절은 지금처럼 `makeError`
(`resume_not_allowed`·`bead_running` 등)다.

**결과.** 수락된 요청의 응답은 `resolve-in-session`과 같은 모양이다:
`{ ok: true, mode: 'session', session: 'launched'|'already_running'|'not_launched',
reason: string|null, command: string|null, owner_tmux: string|null, tmux_session,
tmux_window, pane_id, bridge_active, queue }`. `not_launched`의 `reason`은 §4.3의 닫힌
집합이다. `owner_alive`·`owner_unverified` 둘은 **레코드를 바꾸지 않고** `command`(재개
명령)를 싣는다(`owner_alive`는 레지스트리의 `tmux` 값을 `owner_tmux`로 함께 싣는다) —
기동을 시도하지 않은 거절이지 재개 실패가 아니다. 나머지 `not_launched`(자격 실패 셋,
`worktree_missing`, launcher 실패 사유)는 `resume.error=<reason>`을 기록하고 키를 남긴다
(fork 실패와 같은 처분, 카드는 `⛔ 조치 필요 · 재개 실패 · <reason>`과 세 버튼).

### 4.3 세션 재개 모듈 `server/worker/external-wait/session-resume.js`

`resolve-session.js`·`direction-inquiry.js`와 같은 자리의 형제 모듈이다. 입력은
`{ workspace, record, bead_metadata }`, 의존은 `tmux-launcher`·`session-ref`·bd
metadata writer·프로세스 프로브·`now`·config(`worker_direction_inquiry.tmux_session`,
`resolve-session.js tmuxSessionName()`과 같은 값)다. 순서는 다음과 같고 각 단계의
실패 사유는 닫힌 집합이다.

1. **세션 자격.** `qualifySessionFork(bead_metadata, null)`로 Bead `session_ref`의 마지막
   항목을 판정한다. `runner_name = null`이라 `provider_mismatch`는 나지 않으므로 자격
   실패는 `no_session_ref`·`unsafe_session_id`·`not_local` 셋이고 모두 `resume.error`를
   남기는 `not_launched`다. provider는 그 항목의 것이다.
2. **소유 세션 생사.** 판정 원천은 레코드의 `owner.session_pid`가 아니라 Claude Code 세션
   레지스트리다(§1). 이 판정은 `session-resume.js`의 `ownerLiveness(provider, session_id)`
   함수 하나가 소유하고 결과는 `alive`·`dead`·`unverified` 셋이다.
   - provider `claude`: 서버 HOME의 `~/.claude/sessions/*.json` 중 `sessionId`가 재개할
     ID와 같은 항목마다 `TZ=UTC LC_ALL=C ps -p <pid> -o lstart=`를 돌린다. 출력이 그
     항목의 `procStart`와 정확히 같으면 `alive`(첫 항목의 `tmux` 값을 `owner_tmux`로)다.
     ps가 그 pid를 찾지 못하면(exit 1, 빈 출력) 그 항목은 죽은 것이고, 출력이 달라도
     (pid 재사용) 죽은 것이다. 일치 항목이 없거나 전부 죽었으면 `dead`다. 디렉터리를
     읽지 못함, 일치 항목의 JSON이 깨짐·필드 누락, ps 실행 자체의 실패는 `unverified`다.
   - provider `codex`: 같은 레지스트리가 없으므로 항상 `unverified`다.
   `alive`면 `not_launched`·`reason: 'owner_alive'`, `unverified`면
   `not_launched`·`reason: 'owner_unverified'`로 끝나고 둘 다 `command:
   sessionResumeCommand(entry)`를 싣는다 — 한 세션 ID에 프로세스 둘을 열지 않는다는
   사용자 결정 1을 확인할 수 없을 때도 지킨다. 레코드는 바꾸지 않는다(§4.2).
   `adapters/process.js`의 ps 호출은 `TZ` 없이 로컬 시각을 쓰므로 공유하지 않고, 같은
   `runShell` 주입 방식만 따른다.
3. **워크트리.** `record.worktree`가 디렉터리가 아니면 `worktree_missing`.
4. **프롬프트.** `## 외부 작업 완료` 블록은 `scheduler.js externalWaitCompletionPrompt`를
   `external-wait/completion-prompt.js`로 옮겨 fork·session 두 호출자가 같은 바이트를
   쓴다. session 재개는 그 블록 앞에 한 줄을 더한다:
   `사람이 beads-ui [세션에서 이어가기]로 이 세션을 재개했다 · 대기 키는 서버가 이 창의 기동을 확인한 뒤 해제한다 · 첫 편집 전에 bd show --json으로 external_wait 키가 없음을 확인하고 워크플로 절차대로 in_progress를 클레임한다`.
5. **예약.** 기동 전에 `record.resume = { mode: 'session', attempt_id: null,
   reserved_at: <now>, launched_at: null, session_id, error: null }`을 쓴다. 이 예약이
   있는 동안 세 모드의 재개는 `resume_reserved`로 거절된다(§4.2).
6. **기동.** `launcher.launch({ marker: EXTERNAL_RESUME_PANE_MARKER, key: bead_id,
   tmux_session, window_name: bead_id, cwd: record.worktree, commandArgs:
   ['--resume', session_id, prompt], runner: 'claude' })` — fork·`--session-id` 없음. codex는
   2에서 항상 끝나므로 이 단계에 오지 않는다. `tmux-launcher.js`에 세 번째 마커
   `EXTERNAL_RESUME_PANE_MARKER = '@bdui_external_resume_bead'`를 더한다(모듈 머리말의
   "마커가 종류를 이름한다" 규칙). launcher가 `not_launched`를 돌려주면 예약에
   `error=<reason>`을 써 실패 기록으로 바꾸고(키 유지) 끝난다. `already_running`(같은
   마커·key의 살아 있는 pane)은 기동 없이 7로 간다.
7. **정산.** `launched`·`already_running`이면 `resume.launched_at=<now>`를 쓰고, 큐 store에
   대화형 세션을 기록한다(`InteractiveSession.kind`에 `'external_resume'`, `mode`에
   `'resume'`을 더한다; `session_id`는 재개한 ID, `session_id_source: 'launch'`,
   `source: 'session_ref'`, `forked_from: null`, `attempt_id: null`). 그다음 키를 unset하고
   readback한다(`unsetExternalWait` 그대로: 불일치면 throw). unset이 성공하면
   `stage='resumed'`로 닫고 `notifyChanged`한다. unset이 실패하면 레코드는 `launched_at`이
   있는 `completing`으로 남고 아래 정산이 다음 pass에서 같은 unset·`resumed`를 다시 한다 —
   세션은 이미 열려 있으므로 두 번 열지 않는다.

**재시작·reconcile 정산(`settleExternalWaitReservations`).** 기존 분기는
`resume.attempt_id`를 키로 삼으므로 `resume.mode === 'session'`을 그 앞에서 먼저 갈라
attempt 조회를 건너뛴다. session 레코드는 세 경우다.

- `resume.error !== null` — 실패 기록이다. 건드리지 않는다(§4.1의 버튼 재등장과 §5의
  `⛔ 재개 실패` 표시가 이 기록에 기댄다).
- `launched_at !== null` — 기동은 확인됐고 키 정산만 남았다. `settleExternalWaitLaunch`와
  같은 처분(키 unset readback → `resumed`)이다.
- `launched_at === null`이고 `error === null` — 미완료 예약이다. 기동 직후 `launched_at`을
  쓰기 전에 서버가 죽었을 수 있으므로 `launcher.listPanesExtended(EXTERNAL_RESUME_PANE_MARKER)`
  에서 `key === bead_id`인 살아 있는 pane을 찾는다. 있으면 기동 증거로 보고 7의 정산을
  그대로 한다(대화형 세션 레코드는 `source: 'recovered'`이고 `session_id`는 예약의 값,
  `session_id_source`는 `'launch'`다). 없으면 `resume = null`로 예약만
  지우고 **다시 띄우지 않는다** — 사람의 클릭만이 tmux 기동의 방아쇠다. tmux 관측 자체가
  실패하면 아무것도 쓰지 않고 다음 pass로 미룬다.

**대화형 세션 표면.** `InteractiveSession.kind`(`queue-store.js:496`, 로드 검증
`:3084`)와 `lane-model.js InteractiveSessionView.kind`에 `'external_resume'`을 더한다.
`scheduler.js reconcileInteractiveSessions`는 지금 두 마커만 조회하고 `panes`를
`{ resolve, inquiry }`로 만들어 `panes[record.kind]`로 찾으므로(`:9061`–`9075`·`:9200`),
세 번째 마커 조회를 `Promise.all`에 더하고 부분 관측 실패 규칙(하나라도 실패하면 이
pass는 아무것도 쓰지 않음)을 셋에 적용하며 `panes.external_resume`을 더한다. 기록 없는
pane을 되찾는 복구 순회와 종류별 라벨(`… 세션 시작` 타임라인)도 같은 자리에서 셋째
종류를 다룬다. 생존·종료·정산(pane 소멸, Bead close, 폐기)은 `resolve` 종류와 같은
규칙이다. 세션 타일·후보 카드의 대화형 세션 배지 라벨은 `재개 세션`이다(기존
`해결 세션`·`문의 세션`과 같은 자리·같은 `▤` 열기 동작).

### 4.4 클라이언트 처리

`applyExternalWaitAction`(`worker/index.js`·`monitor/index.js`)과 상세 패널의
`onExternalWaitOp` 세 곳이 같은 규칙을 갖는다 — 구현이 한 헬퍼로 모은다.

- 버튼에 `data-confirm`이 있으면 보내기 전에 `globalThis.confirm(message)`를 부르고
  취소면 아무것도 보내지 않는다(`monitor/index.js:394`의 기존 패턴, `confirm`이 없는
  환경은 통과).
- `mode === 'session'` 응답: `session === 'launched'`면 토스트
  `세션을 열었습니다 · tmux <tmux_session>:<tmux_window>`(+ `bridge_active`면
  ` · Discord 브리지 활성`), `already_running`이면 `이미 열려 있습니다 · tmux …`,
  `not_launched`·`reason === 'owner_alive'`면 `copyToClipboard(command)` 뒤
  `원래 세션이 살아 있어 열지 않았습니다 · 재개 명령을 복사했습니다`(+ `owner_tmux`가
  있으면 ` · tmux <owner_tmux>`), `owner_unverified`면 복사 뒤
  `원래 세션이 살아 있는지 확인하지 못해 열지 않았습니다 · 재개 명령을 복사했습니다`,
  그 밖의 `not_launched`는 `세션을 열지 못했습니다 · <reason>`(error 토스트). 응답의
  `queue`는 지금처럼 adopt한다.
- 다른 op의 토스트는 지금 그대로다.

### 4.5 어휘 표와 카드 문법 정정

- `wait-vocabulary.js` `external_job` 행: `release`는
  `완료되면 같은 세션을 이어간다 · 사용자 세션은 [세션에서 이어가기] 또는 [워커로 이어가기]`,
  `action`은 `[지금 확인] · [관찰 중단] · [세션에서 이어가기] · [워커로 이어가기] · 재개 실패 시 [새 세션으로] · 상세의 [대기 해제]`.
- `2026-08-25-card-header-grammar-unify-design.md` §2와 §5.1의 `정정(UI-l48z)` 문단
  뒤에 `**정정(UI-r6xq).**` 문단을 더한다: 슬롯 6 foot의 외부 대기 조작에
  `[세션에서 이어가기]`가 더해지고(질문 "이 대기를 어떻게 처분하나"의 같은 답),
  완료 뒤의 `[대기 해제]`는 카드에서 빠져 이슈 상세의 잡 표 아래에만 서며, 키를 지우는
  조작(`[관찰 중단]`·`[대기 해제]`)은 확인 다이얼로그를 거친다. 슬롯 1의 대화형 세션
  배지에 `재개 세션`이 더해진다.

### 4.6 계약 정합 — dotfiles 크로스 리포 unit

beads-ui는 계약의 소비자다(ADR UI-u6ud-2). `mode: 'session'`은 계약 어휘이므로
dotfiles 쪽이 먼저 정의하고 이 Bead의 구현이 그 뒤를 따른다. dotfiles unit의 owned
paths와 바꾸는 바이트는 다음과 같고, 설계는 이 스펙이 소유한다(dotfiles 쪽 판단은
"이 스펙대로 전사"뿐이다).

- `docs/contracts/external-wait.md`
  - Routes 표의 `/resume` 행 body를 `mode: 'fork'|'fresh'|'session'`으로.
  - Record의 `resume` 줄을 `mode:'fork'|'fresh'|'session'`으로(session은 `attempt_id` null).
  - Resume 절의 "A Worker-owned wait resumes automatically; a session-owned wait is
    notified over Discord and resumes on the person's `[이어하기]`." 문장의 뒤 절을
    "…and resumes on the person's `[세션에서 이어가기]` (session) or `[워커로 이어가기]`
    (fork)"로.
  - Manual resume 문단의 "A session-owned resume is where the Worker claims the Bead
    `in_progress`" 문장과 "Every resume path, automatic or manual, bypasses only the
    `external_wait` presence check of admission … environment probes still apply" 문장의
    적용 범위를 `fork`·`fresh`로 한정한다(각 문장 앞에 "For `fork` and `fresh`,").
    "`mode: 'fork'` is accepted only when no reservation exists"도 세 모드 공통 규칙
    "a reservation in progress (`resume` with `error` null and `launched_at` null, any
    mode) rejects every mode"로 바꾼다.
  - Resume 절 끝에 **Session resume (`mode: 'session'`)** 문단을 더한다. 바이트는 이
    스펙 §4.2·§4.3과 같은 내용이다: 세션 소유 `completing` 레코드에만; Bead
    `session_ref` 마지막 항목의 자격(`no_session_ref`·`unsafe_session_id`·`not_local`);
    원래 세션의 생사는 레코드 `owner.session_pid`가 아니라 Claude Code 세션
    레지스트리(`~/.claude/sessions/*.json`의 `sessionId`·`pid`·`procStart`와
    `TZ=UTC LC_ALL=C ps -o lstart=` 정확 일치)로 판정하고 `alive`면 `owner_alive`,
    판정 불가(codex 포함)면 `owner_unverified`로 **레코드를 바꾸지 않고** 재개 명령을
    돌려준다; 워크트리 부재는 `worktree_missing`; 기동 전에 session 예약을 쓰고 같은
    워크트리의 tmux 창에서 fork 없이 `--resume`하며 `## 외부 작업 완료` 블록과
    "키는 서버가 기동 확인 뒤 해제한다 · 첫 편집 전에 키 부재를 확인하고 클레임한다"
    줄을 첫 프롬프트로 싣는다; attempt를 만들지 않고 클레임하지 않으며 admission은
    돌리지 않되 Bead `open`·`awaiting_user` 부재 검사는 fork와 같다; 기동 확인 뒤
    `launched_at`을 쓰고 키를 unset readback하고 `resumed`로 닫는다; launcher 실패는
    `resume.error`를 남기고 키를 유지한다.
  - Restart settlement 문단에 session 세 경우를 더한다: `error`가 있으면 유지,
    `launched_at`이 있으면 키 unset → `resumed`, 둘 다 없으면 같은 마커·key의 살아 있는
    tmux pane이 있을 때만 기동 증거로 정산하고 없으면 예약을 지우되 다시 띄우지 않는다.
- `docs/contracts/workflow-state.yaml external_wait.completion.resume` —
  `session_owned: notify_then_manual_session_or_fork_resume`,
  `manual_api.body_mode: [fork, fresh, session]`, 새 키
  `session_resume: preserved_session_in_tmux_no_attempt_no_claim_key_unset_after_launch`,
  새 키 `session_liveness: claude_session_registry_exact_procstart_else_no_launch`.
- `src/shared/skills/flow/workflow/scripts/check-workflow-contract.py` — 계약 전체를
  비교하는 `EXPECTED_EXTERNAL_WAIT`(`:1365`, 비교 `:3923`)를 위 상태 표 바이트로, 산문
  표지 `EXPECTED_EXTERNAL_WAIT_MARKERS`(`:1425`)가 고친 문장을 가리키면 새 문장으로
  갱신한다. `tests/contracts/test_workflow_contract.py:3080`이 같은 비교를 하므로 이
  갱신 없이는 필수 테스트가 실패한다.
- `src/shared/skills/flow/workflow/references/external-wait.md` "After completion" —
  "The Worker resumes the preserved session by fork" 문단 뒤에 한 문단을 더한다: 사람의
  `[세션에서 이어가기]`는 같은 워크트리에서 fork 없이 이 세션을 재개하고 같은 블록을
  첫 프롬프트로 준다; 서버가 기동을 확인한 뒤 키를 푼다; 재개된 세션은 첫 편집 전에
  `bd show --json`으로 `external_wait` 키 부재를 확인하고 세션 소유 규칙대로
  `in_progress`를 클레임한다; 키가 남아 있으면 편집하지 않고 그 사실을 보고한다.
- 설치본은 dotfiles 표준 설치 절차로 갱신한다(이 unit의 landing tail).
- 검증: dotfiles `tests/test_contracts_layout.py`·`tests/contracts/test_workflow_contract.py`·
  `tests/bead_wait_test.py`와 `python3 src/shared/skills/flow/workflow/scripts/check-workflow-contract.py`
  (모두 exit 0). `bead-wait` CLI는 바꾸지 않는다 — `/resume`는 사람의 클릭 경로다.
- ADR: dotfiles-o7y9-12의 "세션 소유 대기는 알림 뒤 `[이어하기]`" 조항이 뒤집히므로
  dotfiles 쪽 ADR 정정은 그 unit이 dotfiles `adr` 절차로 처리한다(이 스펙은 명시만 한다).

### 4.7 바꾸지 않는 것

- 결정: `/stop`의 서버 동작은 바꾸지 않는다 — 자리·확인·라벨 정정(UI-uuvh)만 바뀐다.
  키 쓰기 진행 중 판정 억제는 UI-uuvh가 소유한다.
- 결정: `[워커로 이어가기]`·`[새 세션으로]`의 `/resume` fork·fresh 동작(예약·launch·
  클레임·정산)은 바꾸지 않는다.
- 결정: Discord 완료 알림 본문은 바꾸지 않는다 — 재개 명령 줄이 이미 있다. 단 알림은
  등록 당시 레코드의 `owner.session_ref`를 읽고(`notify.js:248`–`254`) 버튼은 Bead
  metadata `session_ref`의 마지막 항목을 쓰므로, 등록 뒤 Bead에 새 세션 항목이 붙었으면
  둘이 가리키는 세션이 다를 수 있다. 이어갈 세션의 원천은 버튼 쪽(Bead)이다 — Worker
  fork의 `qualifySessionFork`와 같은 원천이다.
- 결정: 레코드 없이 키만 남은 Bead의 `[관찰 중단]`(키 정리)은 카드에 남긴다 — 유일한
  회복 조작이다.
- 관찰기 주기·hold 예산·admission의 `external_wait` 거절·`projectExternalWait` 필드는
  그대로다.

## 5. 오류 처리와 fail-quiet

- `session_ref`가 없거나 malformed면 `[세션에서 이어가기]` 클릭은 `not_launched ·
  no_session_ref`로 `resume.error`를 남기고 카드는 `⛔ 조치 필요 · 재개 실패 · no_session_ref`
  다 — 버튼 자체를 숨기지는 않는다(서버가 라벨 원천이고 판정은 클릭 시점의 사실로 한다).
- 원래 세션의 생사를 확인하지 못하면(레지스트리 읽기 실패·깨진 항목·ps 실행 실패)
  열지 않고 재개 명령을 복사한다(`owner_unverified`, 레코드 무변경). codex 세션은
  레지스트리가 없어 이 버튼이 언제나 명령 복사로 끝난다 — 중복 기동 금지를 확인할
  원천이 없어서다. 레지스트리는 Claude Code 내부 파일이므로 형식이 바뀌면 이 경로로
  떨어진다(fail-closed, 기동하지 않음).
- tmux에 닿지 못하면 `tmux_unavailable`(fail-closed, launcher 규칙)이고 키는 남는다.
- 기동은 됐는데 키 unset readback이 실패하면 레코드는 `launched_at`이 있는 `completing`
  으로 남아 다음 reconcile에서 정산된다. 그 사이 카드는 `✅ 완료` 배지 그대로이고 버튼은
  `already_running`으로 두 번 열지 않는다.
- 키가 풀리고 세션이 아직 `in_progress`를 쓰기 전의 스냅샷에서 Bead는 `external_wait`
  없는 `open`이라 후보 레인으로 잠깐 돌아가고, 클레임 뒤 세션 타일로 선다 — UI-l48z §5의
  같은 과도 상태이며 그 사이에도 `재개 세션` 배지(대화형 세션 레코드)가 그 Bead를
  가리킨다.
- `confirm`을 지원하지 않는 환경(테스트·헤드리스)은 확인 없이 진행한다.
- `placement`·`confirm`이 없는 구 서버 응답은 지금처럼 카드에 그리고 확인 없이 보낸다
  (fail-quiet).

## 6. 검증과 수용 기준

**단위 테스트 (RED seam — 변경 전에 실패한다).**

- `server/worker/wait-judgment.test.js`: 세션 소유 `completing`의 actions 순서·라벨·
  `placement`·`confirm`·title(§4.1 표), `resume.error` 뒤 `[세션에서 이어가기]` 재등장,
  Worker 소유 `completing`에는 session 버튼 없음, release 문장.
- `server/worker/external-wait/store.test.js`: `resume.mode: 'session'`(`attempt_id` null)
  레코드의 저장·재읽기가 되고, session인데 `attempt_id`가 문자열이면 거절한다.
- `server/worker/external-wait/service.test.js`: `resumeWait`가 `mode: 'session'`을
  받고 Worker 소유·`completing` 아님을 거절한다; 진행 중 session 예약이 있으면 fork·fresh·
  session 모두 `resume_reserved`다.
- `server/worker/scheduler.external-wait.test.js`: session 모드 수락 조건(§4.2),
  admission 미호출, `bead_running`·`discard_in_progress`; fresh가 진행 중 session 예약에
  막힘; 정산 세 경우(`error` 있음 → 무변경; `launched_at` 있음 → 키 unset·`resumed`;
  둘 다 없음 → 살아 있는 같은 마커·key pane이 있으면 정산·`recovered` 대화형 세션, 없으면
  예약 삭제·재기동 없음, tmux 관측 실패면 무변경).
- `server/worker/scheduler.test.js`(대화형 세션 reconcile을 덮는 기존 파일):
  `external_resume` 레코드의 생존(세 마커 조회)·pane 소멸 정산·기록 없는 pane 복구,
  세 마커 중 하나의 관측 실패 시 이 pass 무변경.
- `server/worker/external-wait/session-resume.test.js`(신규): 자격 실패 셋이 `resume.error`를
  남김; `ownerLiveness` — 레지스트리 fixture에서 sessionId 일치 + `procStart` 정확 일치 →
  `owner_alive`(기동·레코드 변경 없음, `command`·`owner_tmux`); ps가 pid 없음 → 기동;
  `procStart` 불일치(pid 재사용) → 기동; 디렉터리 없음·깨진 JSON·ps 실행 실패 →
  `owner_unverified`(기동·레코드 변경 없음); codex → `owner_unverified`;
  `worktree_missing`; 기동 전에 예약이 기록됨; launcher 호출 인자(마커·key·cwd·argv
  `['--resume', id, prompt]`, 프롬프트 첫 줄 문구); launcher 실패 → 예약이 실패 기록으로;
  `launched` 뒤 `launched_at`·대화형 세션 기록·키 unset·`resumed`; `already_running` 정산;
  unset 실패 시 `launched_at` 있는 `completing` 유지.
- `server/worker/tmux-launcher.test.js`: 세 번째 마커 상수와 종류별 중복 방지 격리.
- `server/worker/queue-store.test.js`: `kind: 'external_resume'`·`mode: 'resume'` 레코드
  수용(로드 검증 포함).
- `server/ws/worker-handlers.check-now.test.js`(외부 대기 op 테스트 파일): `mode: 'session'`
  통과·타임라인 라벨·응답 모양.
- `app/views/worker/lanes.test.js`: `placement: 'detail'` 조작이 카드 세 변형에서
  빠지고 `surface: 'detail'`에서 그려짐; `data-confirm`; `session-preferred`에 따른
  primary가 두 버튼 사이에서 갈림.
- `app/views/worker/running-grid.test.js`: 완료 세션 타일 foot의 버튼 집합과 순서;
  `재개 세션` 배지.
- `app/views/detail-panel/index.test.js`: 잡 표 아래에 `[대기 해제]`가 confirm과 함께
  서고 카드용 조작도 같이 선다.
- `app/views/worker/index.test.js`·`app/views/monitor/index.test.js`: confirm 취소 시
  전송 없음; session 응답별 토스트·복사.
- `app/views/worker/wait-vocabulary.test.js`: `external_job` 행의 `action`·`release`.

**스크린샷.** 워크트리 `BDUI_FRONTEND_MODE=live` 또는 공유 서버에서 세션 소유
`completing` 타일(세션 권장 있음·없음 둘)과 상세 패널의 조작 줄, `detached` 타일의
`[관찰 중단]` 확인 다이얼로그를 데스크톱 폭과 390px iframe으로 캡처한다.

**실측.** 워크트리 개발 서버(다른 포트)에 새 대기를 등록한다(process 어댑터, 로컬
`sleep`, session 소유, Bead `session_ref`는 이미 종료된 claude 세션). 완료 뒤 WS
`external_wait_resume mode: 'session'`을 보내 `tmux list-panes -a -F` 출력에서
`@bdui_external_resume_bead` 마커 pane의 `claude --resume <id>` 명령과 워크트리 cwd를,
`tmux capture-pane`으로 첫 프롬프트의 완료 블록을, `bd show --json`으로 `external_wait`
키 부재를, 레코드 `stage='resumed'`를 확인한다. 같은 요청을 살아 있는 claude 세션 ID로
보내 `owner_alive`·무기동·레코드 무변경을 확인한다. 끝나면 연 pane과 테스트 Bead를
정리한다.

## 7. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|

- 크로스 리포 unit: dotfiles — §4.6의 계약·상태 표·체커 기대값·스킬 참조 전사
  (`docs/contracts/external-wait.md`, `docs/contracts/workflow-state.yaml`,
  `src/shared/skills/flow/workflow/scripts/check-workflow-contract.py`,
  `src/shared/skills/flow/workflow/references/external-wait.md`), 검증은 §4.6의 dotfiles
  테스트 · quick_fix Bead는 인계 시 dotfiles rig에 만들고 이 Bead가 그것에 foreign
  `blocks`로 잇는다(계약 먼저, 소비자 다음 — ADR UI-u6ud-2).
- 관찰: 세션 소유 대기 등록의 `--session-pid`는 Bash 도구 셸의 `$$`라 claude 프로세스가
  아니다(§1) — 이 스펙은 그 값을 판정에 쓰지 않으므로 등록 절차는 고치지 않는다. 다른
  소비자가 이 값을 생사 판정에 쓰기 시작하면 그때 dotfiles 절차 정정이 필요하다.
- 관찰: dotfiles-o7y9-12의 `[이어하기]` 조항 정정 — dotfiles unit의 ADR 절차 소유, 이
  저장소는 명시만 한다.
- 관찰: `[대기 해제]`를 눌렀을 때 세션 프로세스가 살아 있는지 알려 주는 안내 — 이번
  범위 밖(확인 문장이 효과를 말한다).

## 8. 구현 unit 후보

- unit-01: dotfiles 크로스 리포 unit(§4.6) — 계약 어휘가 먼저 착지한다.
- unit-02: 서버 — `wait-judgment.js` actions(§4.1), `/resume mode: 'session'`(§4.2),
  `session-resume.js`·`completion-prompt.js`·launcher 마커·큐 store kind·정산(§4.3).
- unit-03: 클라이언트 — `lanes.js` placement/confirm/primary, 세 클릭 처리기(§4.4),
  어휘 표·카드 문법 정정(§4.5), 배지.

## 결정 (ADR 후보)

- 전제: ADR UI-l48z — 세션 소유 외부 대기는 실행 중 레인의 세션 타일이고 외부 대기
  조작은 슬롯 6 foot이다(자리 규칙은 그대로 따른다).
- 전제: ADR UI-u6ud-2 — beads-ui는 dotfiles 계약의 소비자이며 `mode: 'session'` 어휘는
  dotfiles가 정의하고 이 저장소는 코드 registry로 복제한다.
- 전제: ADR UI-l48z(UI-u6ud-7 승계) — 파킹·복구 대기의 `[세션에서 해결]`이 tmux
  launcher로 대화형 세션을 여는 방식을 외부 대기 재개가 같은 launcher로 따른다.
- 전제: ADR dotfiles/dotfiles-o7y9-12 — 외부 대기는 `external_wait` 키 하나이고
  관찰·완료·재개는 beads-ui Worker가 소유한다(그 소유 안에 session 재개를 더한다).
- 세션 소유 외부 대기의 완료 출구는 `[세션에서 이어가기]`(보존 세션의 fork 없는 tmux
  재개, attempt·클레임·admission 없음, 기동 전 예약과 기동 확인 뒤 키 해제, 원래 세션이
  Claude 세션 레지스트리로 살아 있거나 확인되지 않으면 명령 복사)와 `[워커로 이어가기]`
  둘이고, 키를 지우는 stop은 확인 1회를 거치며 완료
  뒤의 `[대기 해제]`는 상세 패널에만 선다 — 되돌리기 어렵다(계약 `resume.mode` 어휘·
  `wait-judgment` 라벨·세 렌더러·상세 패널·scheduler 정산·launcher 마커·큐 store kind가
  함께 움직이고 사용자가 보는 출구가 바뀐다), 맥락 없이는 놀랍다(클릭 한 번이 tmux
  창을 열고 키를 지운다; 살아 있는 터미널이 있으면 열지 않는다), 대안이 있었다
  (§3의 복사만·Worker 간주). ADR UI-l48z의 완료 출구 조항("세션 칩 복사로 자기 세션에서
  잇거나 `[워커로 이어가기]`")과 기각 대안("카드에 재개 명령 버튼")을 뒤집는다.
  `summary`: "세션 소유 외부 대기의 완료 출구는 [세션에서 이어가기](보존 세션의 fork 없는 tmux 재개, attempt·클레임 없음, 기동 확인 뒤 키 해제, 원래 세션이 살아 있거나 확인되지 않으면 명령 복사)와 [워커로 이어가기] 둘이고, 키를 지우는 stop은 확인 1회를 거치며 완료 뒤의 [대기 해제]는 상세 패널에만 선다" → ADR, supersede UI-l48z
