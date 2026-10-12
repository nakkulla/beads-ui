---
scope:
  - server/routes/worker-queue.js
  - server/app.js
  - server/worker/session-inquiry/
  - server/worker/queue-store.js
  - server/worker/wait-judgment.js
  - server/worker/scheduler.js
  - server/worker/resolve-session.js
  - server/worker/completion-intent.js
  - server/worker/pr-actions.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - app/views/worker/lanes.js
  - app/views/worker/repo-ops-timeline.js
  - app/views/worker/index.js
  - app/views/monitor/
  - app/views/settings-dialog/conversation-section.js
---

# 세션 소유 사람 필요 행과 클릭 전용 실패 대화 세 종류의 자동 기동

Bead: UI-gske · route spec_backed · 2026-10-13 · 선행: dotfiles-it5mv(PR #595, 94af821c2)

## 1. 목표

dotfiles-it5mv가 정한 원칙을 beads-ui가 소비한다. 막힘은 자동으로 풀고, 사람이 필요하면 확인 필요 칩에 뜨면서 세션이 열려 답을 받는다.

1. **세션 소유 사람 필요 행.** base-sync 보관 해소 세션이 `session-inquiry register`로 올린 행을 받아 저장한다. 행은 「저장소 작업」 서랍과 막힘 칩의 확인 필요 그룹에 뜨고, `🙋 확인 필요` 알림은 한 번 간다. 등록 세션이 죽었고 공용 스위치가 켜져 있으면 같은 세션을 `--resume`으로 한 번 다시 연다. `[세션에서 이어가기]`는 같은 재개를 손으로 한다. 보관 ref가 사라지면 행을 닫는다.
2. **세 실패 종류의 자동 기동.** 다음 세 실패가 공용 스위치 아래 자동으로 열린다.
   - `post_merge_environment`(완료 종단의 정리 단계 실패)
   - 정리 중단
   - 머지 전 검증 실패 보류

   앞의 둘은 `🙋 확인 필요 · 정리 중단` 알림도 실패당 한 번 보낸다.

성공 기준:
- `POST /api/worker/session-inquiry`에 유효한 요청을 보내면 200 `{id, state:"waiting", created:true}`를 받는다. 몇 초 안에 그 저장소의 「저장소 작업」 띠 건수와 막힘 칩 확인 필요 그룹에 행이 뜬다. 두 표시는 Worker 탭과 모니터에서 같다.
- 등록 세션 프로세스를 끝내면 스위치가 켜져 있을 때 30초 정산 주기 안에 `claude --resume <session_id>` 창이 등록 `cwd`에서 한 번 열린다. 그 창을 닫아도 같은 `session_id`로는 다시 자동으로 열리지 않는다.
- `git update-ref -d <ref>` 뒤 다음 정산에서 행이 `closed`가 되고 칩에서 빠진다.
- 위 세 실패가 각각 스위치가 켜져 있을 때 실패 식별자당 한 번 대화 창을 연다. 재시작하거나 같은 실패를 다시 관측해도 다시 열지 않는다.

## 2. 검증된 전제

dotfiles 인용은 94af821c2 기준이다. beads-ui 인용은 d72dad9e 기준이며, 인용한 줄은 94453f96과 같다.

계약(정본, ADR UI-u6ud-2에 따라 beads-ui는 소비자다):
- `session_inquiry` 블록이 정하는 것: 등록·상태 경로, 필수 필드(`repo`, `ref`, `session_id`, `runner`, `cwd`, `summary`, `bundles`), 선택 필드(`related_beads`), 200·400·404 응답, 같은 (`repo`, `ref`)의 갱신, `session_id`가 바뀌면 `waiting`으로 되돌리기, 상태 셋과 허용 전이, `closed`를 쓰는 주체 둘, 칩 `awaiting_user`와 알림 1회, 행당 live 대화 1개, 자동 재개 조건(`waiting` ∧ 등록 세션 사망 ∧ 스위치 켜짐, (id, session_id)당 1회, `--resume`, 첫 입력 [summary, 재개 한 줄], 입장문·Worker 대화 블록 미사용), `held`는 수동 재개만, `[워커로 이어가기]` 없음 — dotfiles docs/contracts/workflow-state.yaml:916-961
- 이 행 종류는 Bead가 없고 식별자는 (repo, ref)이며 재개 원천은 등록 session id다 — dotfiles workflow-state.yaml:901-911
- 실패 대화 자동 기동 조건: `post_merge_environment`·`cleanup_interruption`은 종단 기록 뒤 실패 식별자당 1회다. 머지 전 검증 실패 보류는 알림을 보내는 보류 진입 시점에 (PR, 보류 head)당 1회다. 외부 작업 완료는 클릭 전용이다 — dotfiles workflow-state.yaml:896-900, docs/contracts/workflow-contract.md:272
- `post_merge_environment`의 원인은 `cleanup_stage_error`이고 출구는 `[정리 재시도]`다 — dotfiles workflow-state.yaml:835-837
- `session-inquiry` CLI의 응답 처리: 4xx는 JSON 본문일 때만 요청 오류(exit 1)이고, 5xx나 JSON이 아닌 본문은 연결 불가(exit 3)다. `state` 요청 본문은 `{state, note?}`뿐이며 `repo`를 싣지 않는다 — dotfiles src/shell/bin/session-inquiry:101-128, :204-217

beads-ui 현재 코드:
- 확인 필요 행의 원천은 attempt 멈춤, 실패한 `repo_operations`, 외부 대기뿐이다. 행은 (root_dir, `subject.bead_id`)로 묶인다 — server/worker/wait-judgment.js:262, :878-891, :915-935
- 외부 대기 입력은 `root_dir`을 `workspaceKeyOf`로 등록 작업 공간에 맞추고, 맞지 않으면 400 `bad_request`를 돌려준다 — server/routes/worker-queue.js:34-55, :317-343, server/app.js:173
- 큐 상태는 작업 공간별 `queue.json` 하나다. 모르는 최상위 키는 불투명하게 보존되고 공개 큐로 클라이언트에 그대로 간다 — server/worker/queue-store.js:2328, :2409, server/ws/worker-handlers.js:3317
- Bead 없는 저장소 작업 행은 행 키 `repo-op:<id>`로 대화 레코드를 갖는다. 그 행은 fresh 세션으로 「저장소 작업」 서랍에서 열린다 — server/worker/resolve-session.js:132, :966, app/views/worker/repo-ops-timeline.js:210, :420
- 막힘 칩의 확인 필요 그룹은 `awaiting_user`·`recovery` 종류다. 항목을 클릭하면 Bead 카드로 스크롤하고, 카드가 없으면 아무 일도 하지 않는다 — app/views/worker/lanes.js:3165, :3260
- 같은 세션 `--resume`(fork 없음) 기동은 멈춤 대화와 외부 작업 완료에 이미 있다. `--resume`은 cwd의 프로젝트로 세션을 찾는다 — server/worker/direction-inquiry.js:378-380, :620, server/worker/external-wait/session-resume.js:512
- 임의 Claude session id의 생존은 `ownerLiveness`가 `~/.claude/sessions/*.json`과 `ps -o lstart`의 `procStart` 대조로 `alive|dead|unverified`를 판정한다. 일치하는 항목이 없으면 dead다. 살아 있으면 tmux 위치를 함께 돌려준다 — server/worker/external-wait/session-resume.js:144-242
- 대화 정산은 30초 주기로 돈다 — server/worker/attach.js:1620-1632, server/worker/scheduler.js:10382
- 자동 기동 스위치는 `conversation-settings.js`의 `auto_launch` 하나다. 설정 창 문구가 자동 기동 종류를 나열한다 — server/conversation-settings.js:68, app/views/settings-dialog/conversation-section.js:48-50
- 실패 대화 자동 기동 대상은 `NEEDS_HUMAN_NOTIFY_CLASSES` 닫힌 목록이다. 완료 종단의 단계 토큰이 목록 밖이면 알림도 기동도 없다. 정리 단계 종단의 토큰은 `cleanup_failed.step` 또는 `post_merge_cleanup`이다 — server/worker/completion-intent.js:858-869, :1663-1690, :2020-2032
- 머지 전 검증 보류는 `first_hold`(새 head) 안에서만 `⏸️ 머지 보류` 알림을 보내고 대화는 띄우지 않는다. 같은 head는 다시 보류해도 부작용이 없다 — server/worker/completion-intent.js:2392-2457
- 완료 의도가 없는 정리 실패는 `cleanup_failed` 기록만 남기고 알림이 없다. 일시 실패(`branch_cleanup`·`base_containment`)는 최대 3회 `next_retry_at`으로 다시 시도한다 — server/worker/pr-actions.js:3700-3730
- 정책 사본 네 개(`generated/contracts/*.json`)는 dotfiles origin/main과 sha256이 같다. #595는 그 파일을 바꾸지 않았다 — `shasum -a 256` 대조(이 세션), `gh pr view 595 --json files`
- 미확인: 서버 시작 뒤 `/api/register-workspace`로 추가된 작업 공간에 Worker attachment가 생기는지 — 조사 범위 밖이라 확인하지 못했다. 3.1이 fail-quiet로 다룬다.

## 3. 설계

### 3.1 입력과 저장

- 결정: 행은 작업 공간 큐의 새 컬렉션 `queue.session_inquiries`에 id 키로 저장한다. 외부 대기처럼 별도 파일을 두지 않는다. 그래야 공개 큐로 클라이언트에 가고 큐 revision·변경 이벤트를 그대로 탄다.
- 결정: `repo`는 외부 대기의 `root_dir`과 같은 규칙으로 등록 작업 공간에 맞춘다. 맞지 않으면 400이다. attachment가 없는 작업 공간에서는 저장만 하고 표시·재개는 하지 않는다(fail-quiet).
- id는 서버가 만드는 전역 고유 값이다(예: `si-<12hex>`). `state` 요청은 `repo`를 싣지 않으므로 모든 작업 공간 큐에서 id로 찾는다. 찾지 못하면 404다.
- 검증 오류는 400 `{ok:false, error:"bad_request", message}`다. 기준:
  - 절대 경로가 아닌 `repo`·`cwd`
  - `refs/set-aside/` 접두가 없는 `ref`
  - 소문자 UUID가 아닌 `session_id`
  - `claude`가 아닌 `runner`
  - 비었거나 줄바꿈이 있거나 200자를 넘는 `summary`
  - `bundles` 항목의 `title`·`reason`이 비었거나 `paths`가 문자열 배열이 아닌 것
- 모든 4xx·5xx 본문은 JSON이다. 그래야 CLI가 요청 오류(exit 1)와 연결 불가(exit 3)를 구분한다.
- 같은 (`repo`, `ref`)의 열린 행(`waiting`·`held`)이 있으면 필드를 갱신하고 `created:false`를 돌려준다. `session_id`가 바뀌면 상태를 `waiting`으로 되돌린다. 열린 행이 없으면 닫힌 행이 있어도 새 행을 만든다.
- 상태 전이는 계약의 허용 전이만 받는다. 같은 상태로의 요청은 200 무변경이다. 그 밖의 전이는 409 `{ok:false, error:"invalid_transition"}`(CLI exit 1)다. `note`는 행의 마지막 메모로 남긴다.
- 기록 필드: 요청 필드, `id`, `state`, `created_at`, `updated_at`, `notified_at`, `auto_resume`({session_id, at}|null), `liveness`({state, at, tmux}|null), `closed_reason`. 닫힌 행은 지우지 않는다. 지금의 `repo_operations`처럼 보존 기한을 두지 않는다.

### 3.2 정산: 생존·ref 관측과 자동 재개

30초 대화 정산 패스가 열린 행마다 다음을 순서대로 한다. 새 타이머는 두지 않는다.

1. **ref 관측.** `git -C <repo> show-ref --verify --quiet <ref>`가 exit 1이면 행을 `closed`(`closed_reason: ref_absent`)로 바꾼다. 다른 오류·시간 초과는 아무것도 바꾸지 않는다.
2. **생존 관측.** 등록 `session_id`를 `ownerLiveness`로 판정한다. 결과가 이전과 다를 때만 `liveness`를 쓴다. 매 패스마다 쓰지 않는 것은 큐 revision을 흔들지 않기 위해서다.
3. **자동 재개.** 다음 다섯 조건이 모두 맞으면 연다.
   - 행이 `waiting`이다.
   - `liveness.state`가 `dead`다. `unverified`는 사망으로 보지 않는다.
   - 스위치가 켜져 있다.
   - 행 키에 live 대화 레코드가 없다.
   - `auto_resume.session_id`가 등록 `session_id`와 다르다.

   결정: 재개 표시(`auto_resume`)를 기동보다 먼저 기록한다. 재시작이나 기동 실패가 두 번째 자동 재개로 이어지지 않게 하기 위해서다. 기동이 실패하면 로그만 남고 버튼이 남는다.
- 재개 기동은 다음과 같다.
  - 명령: `claude --resume <session_id> <첫 입력>`. fork나 새 session id는 쓰지 않는다.
  - 위치: 등록 `cwd`의 분리 창. 창 이름 예: `inquiry-<id8>`.
  - 대화 레코드: 행 키 `session-inquiry:<id>`. Bead 상태 읽기에서 빠지는 것은 `repo-op:` 키와 같다.
  - 모델·effort는 넘기지 않는다. 재개된 세션의 것을 쓴다.
  - 첫 입력은 계약대로 두 줄이다: `답을 기다리던 해소 세션이 다시 열렸다 — <ref>`와 등록 `summary`. 입장문과 Worker 대화 블록은 넣지 않는다.
- beads-ui가 `waiting`·`held`를 쓰는 일은 없다. 그것은 세션의 몫이다. beads-ui가 쓰는 상태는 ref가 사라졌을 때의 `closed` 하나다.

### 3.3 알림·대기 판정·`[세션에서 이어가기]`

- **알림.** 행이 처음 만들어질 때(`created:true`) `🙋 확인 필요 · base-sync 사람 필요` 알림을 한 번 보낸다. 본문은 저장소 이름, ref 끝부분, `summary`, 링크다. `notified_at`을 보내기 전에 기록하므로 재시작해도 다시 보내지 않는다. 같은 행의 `session_id` 교체도 새 알림을 만들지 않는다. 스위치와 무관하다(멈춤 `🙋`와 같다).
- **대기 판정.** 열린 행 하나가 확인 필요 사유 하나를 낸다.
  - 사유의 형태: `kind:"awaiting_user"`, `subject:{root_dir, bead_id:"session-inquiry:<id>"}`, headline `사람 필요 · 보관 <ref 끝 24자>`, release `해소 세션에서 답하면 그 세션이 착지·폐기·보류를 끝낸다`.
  - `waiting`이고, 등록 세션이 살아 있지 않고, live 대화도 없으면 `action_required`(`decision`)다. 해결 op `worker-resolve-in-session`(payload `{inquiry_id}`)과 해결 문장을 함께 싣는다(ADR UI-btsr가 승계한 UI-9w5l 불변식).
  - 그 밖(세션이 살아 있음, live 대화 있음, `held`)은 `normal`이다.
- **클릭.** 판정은 다음 순서다. 행이 `closed`면 버튼이 없다.
  1. 행 키에 live 대화가 있으면 그 창을 앞으로 부른다(기존 규칙).
  2. 등록 세션이 살아 있으면 새로 띄우지 않는다. tmux 위치를 알면 그 창을 앞으로 부르고, 모르면 "등록 세션이 살아 있습니다 — 그 세션(Discord 스레드)에서 답하세요"로 답한다.
  3. 생존이 `unverified`면 거부하고 사유를 알린다. 같은 session id를 두 프로세스가 잇는 것을 막기 위해서다.
  4. `dead`면 3.2와 같은 재개를 연다(`waiting`·`held` 모두). 클릭은 `auto_resume`을 쓰지 않는다.
- **Discord 링크.** 등록 `session_id`로 bridge `threads.json`의 스레드를 찾아 행에 붙인다(대화 레코드의 `discord_url`과 같은 방식).

### 3.4 화면: 「저장소 작업」 서랍과 막힘 칩

- 결정(사용자, 2026-10-13): 행의 집은 「저장소 작업」 서랍이다. 서랍에 새 항목 종류 `session_inquiry`를 더하고, 열린 행은 미해결로 센다. 그래서 띠 건수와 모니터의 `⚠ N` 배지에 들어간다.
- 항목에 그리는 것:
  - 제목 줄 `🙋 사람 필요 · 보관 ref <끝부분>`
  - `summary`
  - 묶음 목록(`title` — `reason`, 경로 수)
  - `related_beads`(맨글자)
  - 상태 줄 `답 대기|보류 · 세션 <sid8> (살아 있음|종료됨|확인 불가)`
  - Discord 링크
  - `[세션에서 이어가기]`(`.op-btn`)
- 닫힌 행은 기존 기록 규칙대로 이력에만 남고 버튼이 없다. 새 조작은 `docs/design-system.md`의 부품으로만 그린다.
- 막힘 칩 확인 필요 그룹에서 `session-inquiry:` 항목은 Bead id 대신 `보관 <ref 끝부분>`으로 보인다. 클릭하면 카드로 스크롤하지 않고, 그 저장소의 「저장소 작업」 서랍을 열어 그 항목을 보인다.
- 결정: 카드 재료는 `buildLanes`와 `app/views/worker/` 공유 함수 한 곳에서 만든다. Worker 탭과 모니터가 같은 항목·버튼을 그리므로 모니터 §9 의도된 차이 표에 행을 더하지 않는다.

### 3.5 세 실패 종류의 자동 기동

공통: 스위치가 켜져 있고 행에 live 대화가 없을 때 기존 `createFailureConversationLauncher.launchForBead`로 연다. 첫 답 전 읽기 전용 경계와 기존 클릭 경로·출구는 바꾸지 않는다.

- **`post_merge_environment`.** 완료 종단의 단계 토큰이 정리 단계(`base_containment`, `branch_cleanup`, `parent_close`, `post_merge_cleanup`)인 경우다.
  - 결정: 이 토큰들을 알림·기동 대상 목록에 클래스 `정리 중단`으로 더한다. 클릭 세션의 클래스 표도 같은 이름을 쓴다. 그래야 알림과 대화가 같은 이름을 말한다.
  - 횟수 보장은 기존 완료 종단의 1회 규칙(종단당 댓글·알림 1회)을 그대로 쓴다.
- **정리 중단.** 완료 의도 없이 기록된 `cleanup_failed`다(auto_merge 꺼짐, 손 머지 뒤 정리).
  - 결정: 예약된 재시도(`next_retry_at`)가 없는 기록, 즉 비일시 실패이거나 재시도 3회 소진을 종단으로 본다. 그 기록마다 `🙋 확인 필요 · 정리 중단` 알림과 기동을 한 번 한다.
  - 식별자는 (Bead, step, 기록 시각)이다. 1회 표시는 그 `cleanup_failed` 기록에 보내기 전에 쓴다.
  - 완료 의도가 그 Bead의 정리를 몰고 있으면 완료 종단이 유일한 원천이고, 여기서는 아무것도 하지 않는다.
- **머지 전 검증 실패 보류.** 보류 분기의 `first_hold` 안에서, 원인이 검증 실패일 때만 `⏸️ 머지 보류` 알림을 보낸 직후 연다.
  - 식별자는 (PR URL, 보류 head SHA)다. 지속되는 `hold.head_sha`가 같은 head의 재관측·재시작을 막는다.
  - 머지 충돌·리뷰 stale 보류는 바꾸지 않는다.
  - 결정: `⏸️ 머지 보류` 알림 문구는 바꾸지 않는다 — 대화는 bridge 스레드가 따로 알린다(notify.test.js:1489 고정 유지).
- 외부 작업 완료는 클릭 전용으로 남는다.
- 설정 창 `대화 자동 기동` 문구에 정리 중단, 머지 전 검증 실패, 해소 세션 재개를 더한다.

## 4. 오류 처리

| 상황 | 결과 |
| --- | --- |
| 등록 작업 공간이 아닌 `repo` | 400(JSON). 세션은 질문 끝 줄에 등록 실패를 적는다(dotfiles 쪽) |
| attachment 없는 작업 공간 | 저장만 한다. 표시·알림·재개는 없다 |
| ref 관측 git 오류 | 무변경. 다음 패스에 다시 본다 |
| 생존 `unverified` | 자동 재개를 하지 않고 클릭도 거부한다. 행은 `normal`이다 |
| 재개 기동 실패 | 로그만 남는다. `auto_resume`이 이미 기록돼 자동 재시도는 없고 버튼이 남는다 |
| 세션이 다른 호스트에서 돌았음 | 로컬 레지스트리에 항목이 없어 dead로 보고 `--resume`이 실패한다. 위 행과 같다. 원격 보관 ref는 계약 비목표다 |
| live 대화가 있는 동안 ref가 사라짐 | 행만 `closed`로 바꾼다. 대화는 그대로 둔다 |

## 5. 테스트

- 라우트·서비스:
  - register의 400 사유별, 200 `created:true|false`, `session_id` 교체 시 `waiting` 복귀, 닫힌 행 뒤 새 행
  - state의 허용 전이, 같은 상태 200 무변경, 금지 전이 409, 모르는 id 404, 다른 작업 공간의 id 찾기
  - 모든 4xx 본문이 JSON
- 정산:
  - ref 부재 → `closed(ref_absent)`, git 오류 → 무변경
  - 생존 변화 때만 `liveness` 기록
  - 자동 재개 조건 다섯 가지 각각의 거부
  - (id, session_id)당 1회, 재시작 뒤 재기동 없음
  - 재개 argv가 `--resume <sid>`이고 fork가 없으며, cwd가 등록 `cwd`이고, 첫 입력에 입장문이 없음
- 알림: 생성 시 1회, 재등록·교체·재시작 시 없음.
- 대기 판정: `action_required` 분기가 op와 해결 문장을 싣는다(기존 불변식 테스트에 분기를 더한다). 살아 있음·`held`는 `normal`이다.
- 클릭: live 대화 → 앞으로, 세션 살아 있음 → 기동 없음, `unverified` → 거부, `dead` → 재개, `closed` → 버튼 없음.
- 화면:
  - 서랍 항목 렌더와 띠 건수
  - 칩 항목 클릭이 서랍을 엶
  - Worker 탭·모니터 카드 동일성 테스트에 행 포함
- 세 실패 종류:
  - 정리 단계 토큰의 종단이 알림과 기동을 1회 함, 재클릭·재시작 시 없음(기존 `branch_cleanup` "sends nothing" 테스트는 뒤집힘)
  - 완료 의도 없는 `cleanup_failed`의 종단 판정(재시도 예약 중엔 없음, 소진 뒤 1회)
  - 검증 보류 새 head 1회, 같은 head 재보류 시 없음, 충돌 보류 시 없음
  - 스위치 꺼짐이면 기동 없음
- 설정 창 문구 테스트.

## 6. 경계·후속

없음. dotfiles 쪽(형제 dotfiles-it5mv)은 착지했다. 이 spec은 계약의 소비자 쪽 전부다.

비목표:
- 외부 작업 완료 흐름
- Worker 대화 진입 블록 바이트(origin/main d72dad9e에서 이미 정본과 맞음)
- 정책 사본 재고정(바뀐 것이 없음)
- 원격 호스트 보관 ref
- beads-ui 안의 답 입력칸

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 행 종류·필드·상태·재개 조건은 dotfiles 계약을 손으로 베낀 소비자 구현이다. 계약 키가 없으면 표시를 생략한다.
- 전제: ADR dotfiles/dotfiles-it5mv, ADR dotfiles/dotfiles-it5mv-2 — 해소 세션의 질문·인수 권한과 세 실패 종류의 자동 기동 조건은 그 계약 쪽 결정이다.
- Bead 없는 세션 소유 사람 필요 행을 받아 「저장소 작업」 서랍과 확인 필요 칩에 올리고, 같은 세션을 `--resume`으로 잇고, ref가 사라지면 닫는다. 세 실패 종류를 공용 스위치 아래 자동으로 열고, 정리 단계 실패도 `🙋 확인 필요 · 정리 중단`으로 알린다.
  - 되돌리기 어려움: 함께 움직여야 하는 소비자가 많다.
    - 새 HTTP 입력과 dotfiles `session-inquiry` CLI
    - `queue.session_inquiries` 저장 형태
    - wait-judgment 사유
    - 서랍·칩 화면과 Worker·모니터 동일성 테스트
    - 대화 레코드 행 키와 정산
    - `NEEDS_HUMAN_NOTIFY_CLASSES`와 클릭 세션 클래스 표
    - 보류 분기 기동
    - 설정 창 문구
  - 맥락 없이 놀라움:
    - beads-ui가 자기가 띄우지 않은 외부 세션을 같은 id로 다시 연다.
    - 조용하던 정리 실패가 알림과 대화를 만든다(ADR UI-btsr의 "정리 중단은 알리지 않는다"·"머지 전 검증 보류·정리 중단·외부 작업 완료는 자동 기동하지 않는다"를 뒤집는다).
  - 실제 대안:
    - 행을 막힘 칩 팝업 안에서만 끝내기 — 묶음 상세를 둘 자리가 없어 기각
    - 레인에 새 카드 종류 — 카드 문법 spec부터 바꿔야 해 범위가 커서 기각
    - 정리 실패는 대화만 열고 알림은 없음 — 스위치가 꺼져 있으면 사람이 알 길이 없어 기각(사용자, 2026-10-13)
  - 통합: ADR UI-btsr와 소비자(`resolve-session.js` 자동 기동기, `completion-intent.js` 알림 대상, `wait-judgment.js` 조치 필요 불변식, 「저장소 작업」 서랍의 Bead 없는 행 대화, 설정 창 스위치 문구)를 공유하므로 새 주제가 아니다.
  - `summary`: "base-sync 보관 해소 세션이 등록한 Bead 없는 사람 필요 행((repo, ref), queue.session_inquiries)은 「저장소 작업」 서랍과 확인 필요 칩에 뜨고 생성 시 🙋 확인 필요를 한 번 보내며, waiting 행의 등록 세션이 죽고 공용 스위치가 켜지면 등록 cwd에서 같은 session id를 --resume으로 (id, session_id)당 한 번 다시 열고(held는 클릭만), 보관 ref가 사라지면 beads-ui가 닫는다; 정리 단계 완료 종단·완료 의도 없는 정리 중단·머지 전 검증 실패 보류(보류 진입, (PR, head)당)도 공용 스위치 아래 실패당 한 번 자동으로 열리고 정리 실패는 「🙋 확인 필요 · 정리 중단」으로 알린다; 외부 작업 완료는 클릭 전용으로 남는다" → ADR, supersede UI-btsr
- 행 저장을 큐 컬렉션에 두고 별도 파일을 두지 않음 — 구현 세부, 소비자는 이 저장소 안 하나 → ADR 아님
- 세션 생존 판정에 `ownerLiveness`를 재사용하고 `unverified`를 사망으로 보지 않음 — 되돌리기 쉬운 내부 판정 → ADR 아님
