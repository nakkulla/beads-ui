---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/notify.js
  - server/worker/scheduler.js
  - server/worker/runtime.js
  - server/worker/revise-parked.js
  - server/config.js
---

# Worker 무인 방향성 충돌 파킹 직후 tmux 방향 질의 `claude` 세션 자동 기동 (UI-7uid)

- Bead: `UI-7uid` · 선행: `dotfiles-0bdo`(착지, PR #457), `UI-5ym8`(진행 중 — §3.1)
- 상위 spec: dotfiles
  `docs/superpowers/specs/2026-08-28-adr-aware-stale-rereview-and-direction-inquiry-design.md`
  §3.3 — 프롬프트 원문·절차·금지는 dotfiles
  `src/shared/skills/flow/workflow/references/execution.md` "Direction inquiry session"이
  소유한다. 이 spec은 **트리거·가드·알림**만 정한다.

## 1. 문제

Worker 무인 admission의 stale 재리뷰 레인이 방향성 충돌(broken premise)을 만나면
`awaiting_user=spec_review_stale:revise`(plan은 `plan_approval_stale:revise`)를 쓰고 세션이 끝난다.
그 뒤 처분은 사람이 Worker 탭을 열어 `fix`/`approve`를 누르는 것뿐이다(`revise-disposition.js`).
사용자는 파킹 사실을 Discord로도 받지 못한다 — `worker_notify`에 파킹 전이가 없다.

dotfiles 쪽은 착지했다: 계약이 4분류와 notes `rereview:`/`stale_kind` 줄을 정했고, 방향 질의
세션의 프롬프트 원문이 `execution.md`에 있다. 남은 것은 "누가 그 세션을 띄우는가"다.

## 2. 목표·비목표

목표

- 파킹 직후 Mac Studio tmux에 대화형 `claude` 세션을 기동하고 dotfiles 프롬프트를 첫 입력으로
  넣는다. 세션의 `AskUserQuestion`은 기존 `claude-discord-bridge`가 Discord로 중계한다.
- 같은 Bead에 살아 있는 질의 세션이 있으면 재기동하지 않는다.
- `worker_notify`에 `awaiting_user` 전이를 추가한다 — 세션 기동 여부와 무관하게 파킹 자체를
  알린다.
- 기존 `fix`/`approve` 클릭 처분이 UI-5ym8의 `parked` 결말 뒤에도 계속 동작한다.

비목표

- 브리지 데몬 변경 없음. `AskUserQuestion` 중계는 브리지가 `TMUX_PANE`을 상속받은 훅 manifest로
  이미 한다(`stop-hook.sh` `bridge_manifest_write`). tmux 안에서 띄운 대화형 세션이면 그대로 잡힌다.
- 프롬프트 원문 재정의 없음. 세션 절차·금지·실패 처리는 dotfiles 소유.
- 새 UI 칩·버튼 없음(카드 슬롯 표 무변경). 클릭 처분·카드는 세션이 죽었을 때의 수동 탈출구로
  그대로 남는다.
- `awaiting_user` 값 어휘·metadata 키 무변경. beads-ui는 키를 쓰지 않는다(계약 소비자).
- 두 stale 방향 충돌 값 외의 `awaiting_user`(`impl_review_conflict:design`)는 이 spec의 대상이
  아니다 — 알림도 세션도 없다(그 파킹은 stale attempt에서 나오지 않는다).
- 세션 모델 선택 없음. `claude` 기본 모델을 쓴다.

## 3. 설계

### 3.1 트리거 지점 — UI-5ym8 `parked` 기록 직후

UI-5ym8(`2026-08-28-worker-failure-tiers-queue-hold-design.md` §3.1)이 `awaiting_user`를 남기고
정상 종료한 세션 결말을 `failed`가 아니라 attempt `status='parked'`, `cause='session_parked'`,
`awaiting_user_present=true`로 바꾼다. 이 spec은 그 기록을 트리거로 쓰므로 **UI-5ym8을 `blocks`
선행**으로 둔다(현행 `failAttempt`에 거는 설계는 UI-5ym8 착지와 동시에 죽는다).

- scheduler가 `parked` 레코드를 쓰고 큐 변경을 fan-out한 직후, 그 attempt가
  `spec_review_stale === true`이고 `disposition`이 없으면(일반 admission 레인의 stale attempt만;
  `revise_fix`·review-session 등 처분 세션은 제외)
  `deps.directionInquiry.onParkedAttempt({ workspace, bead_id, attempt_id, repo, target_base,
  awaiting_user })`를 **fire-and-forget**으로 부른다. `notifyLifecycle`과 같은 자리·같은 no-throw
  규약이다. `awaiting_user`는 `parked` 판정이 이미 읽은 `cause_detail.awaiting_user` 값이다.
- 이 훅은 재판정하지 않는다. 파킹 사실은 UI-5ym8의 네 조건이 확정했다. 모듈은 notes만 추가로
  읽는다(§3.2).
- 재개: 질의 세션이 `awaiting_user`를 해제하면 UI-5ym8의 "있던 것이 없어진 전이" 관측이 새
  attempt를 디스패치한다 — 상위 spec §3.3 4단계 "Worker 일반 레인이 재디스패치한다"가 그 경로다.
  이 spec은 재개에 아무것도 더하지 않는다.

**`revise-parked.js` 정합**: 조건 2 "최신 leaf attempt가 `failed`이고 `spec_review_stale`"를
"`status ∈ {failed, parked}`이고 `spec_review_stale`"로 넓힌다. `failed`는 UI-5ym8 이전 레코드를
위해 남긴다. 나머지 조건(대기 큐 잔류, bd `awaiting_user` 재관측)과 `fix`/`approve` 처분은 무변경.
UI-5ym8 spec은 이 파일을 다루지 않으므로 이 정합은 이 Bead의 몫이다.

### 3.2 새 모듈 `server/worker/direction-inquiry.js`

한 함수 `createDirectionInquiry(deps)` → `{ onParkedAttempt, probeTmux }`. 의존은 주입한다:
`getConfig`, `bd.readIssue`, `notifier`, tmux 러너 `runTmux(args)`, `resolveClaude`(PATH 해석),
`now`, `log`, `statFile`(브리지 heartbeat).

`onParkedAttempt` 절차 — 전 구간 try/catch, 반환 promise는 항상 resolve:

1. **레인 판정**. `awaiting_user`가 `spec_review_stale:revise` | `plan_approval_stale:revise`가
   아니면 종료(비목표).
2. **notes·영수증 읽기** `bd show <id> --json`(fail-quiet). 마지막
   `stale_kind=adr_conflict|intent_conflict` 줄과 마지막 `rereview: direction_conflict — <근거>`
   줄. `stale_kind`가 없으면 세션을 띄우지 않는다(`stale_kind_missing`) — 프롬프트 필드가
   채워지지 않으므로. 원 영수증은 `metadata.spec_review`(plan 값이면 `plan_approval`).
   `bd show` 실패는 `bd_unavailable`로 미기동, 알림은 간다.
3. **활성 판정**. config `worker.direction_inquiry.enabled !== true`면 `disabled`.
4. **in-flight 가드**(§3.3). 살아 있으면 `already_running`.
5. **기동**(§3.4). 성공 `launched`, 실패 `launch_failed:<reason>`.
6. **알림**(§3.5) — 1~5의 결과를 한 메시지로. `worker_notify`가 켜져 있으면 `enabled`와 무관하게
   항상 간다.

같은 Bead에 대한 동시 호출은 모듈 내 `Set` in-flight로 2~6 구간을 직렬화한다 —
`revise-disposition.js`의 `in_flight` Map과 같은 형태로, 첫 `await` 전에 예약한다.

### 3.3 질의 세션 생존 판정 — tmux pane 마커

메모리 레코드를 신뢰하지 않는다(서버 재시작으로 사라진다). 진실은 tmux다.

- 질의 세션의 pane은 pane option `@bdui_inquiry_bead=<Bead ID>`를 가진다. **마커는 `claude`보다
  먼저 쓰인다**(§3.4) — 마커 없이 살아 있는 질의 세션은 존재할 수 없다.
- 살아 있음 = `tmux list-panes -a -F '#{pane_id}\t#{@bdui_inquiry_bead}\t#{pane_dead}'` 출력에
  같은 Bead ID이고 `pane_dead=0`인 행이 있다. window는 `remain-on-exit` 기본(off)이므로
  `claude`가 끝나면 pane이 사라진다 — "pane 존재"가 곧 "프로세스 생존"이다.
- tmux 서버 부재/실행 실패는 `tmux_unavailable`로 **기동하지 않는다**(fail-closed: 확인할 수 없는
  중복은 만들지 않는다).
- 세션 삭제·회수는 하지 않는다. 사용자가 `/exit`하거나 tmux를 닫으면 끝이고, 그 뒤
  `awaiting_user`는 클릭 처분으로 푼다.

### 3.4 기동 형태

- tmux 세션 이름: config `tmux_session`(기본 `bdui-inquiry`). 없으면
  `tmux new-session -d -s <name>`으로 만든다. 사용자의 작업 세션(`dev`)에 window를 끼우지 않는다 —
  사용자는 `tmux attach -t bdui-inquiry`로 본다.
- window: `tmux new-window -d -P -F '#{pane_id}' -t <session> -n <Bead ID> -c <cwd> -- <wrapper>`.
  window 이름 = Bead ID(사람이 찾는 키).
- `<wrapper>`는 pane 안에서 도는 한 줄 `sh -c`다:
  `tmux set-option -p @bdui_inquiry_bead '<Bead ID>' && exec '<claude>' '<prompt>'`.
  pane 안에서는 `TMUX_PANE`이 자기 pane이므로 `set-option -p`는 자기 자신을 마킹한다.
  **마커 쓰기가 실패하면 `exec`에 이르지 않아 `claude`는 시작되지 않고 pane은 닫힌다** — 마커
  없는 산 세션이 생기는 경로가 없다. 부모는 `new-window`가 돌려준 pane id로 `list-panes`를 한
  번 더 읽어 마커를 확인한다: 마커가 보이면 `launched`, pane이 이미 없으면
  `launch_failed:exited`(마커 실패 또는 `claude` 즉시 종료 — 둘 다 세션이 없다는 같은 사실).
- `cwd` = attempt의 `repo`(resolved `target_base` 체크아웃 루트 — `revise-disposition` fresh
  세션과 같은 자리). 프롬프트의 `target_base 체크아웃: <path>`에도 같은 값.
- `<claude>` = `resolveClaude()`가 Worker PATH에서 찾은 `claude` 절대경로. 인자는 프롬프트
  하나뿐이다. tmux는 shell-command를 `sh -c`로 돌리므로 wrapper 문자열의 각 값을 **single-quote
  이스케이프**한다(`'…'` 안의 `'`는 `'\''`). 이 quoting 함수는 단위 테스트 대상이다. 권한 모드·모델
  플래그는 넘기지 않는다 — 사용자 settings(`defaultMode`)와 기본 모델을 따른다.
- 프롬프트 = dotfiles `execution.md` "Direction inquiry session" fenced block 원문에 `<bead-id>`·원
  영수증·`stale_kind`·충돌 요약(notes `rereview:` 줄의 근거 원문)·`target_base` 체크아웃을 채운
  것. 문장은 **그대로 인용**하며 beads-ui가 절차·금지를 덧붙이지 않는다. 원문은 모듈 상수
  `DIRECTION_INQUIRY_PROMPT`로 복제한다(ADR 0012: 계약 파일을 런타임에 읽지 않는다). 상수의
  정합은 두 겹으로 지킨다: (a) 테스트가 상수 바이트의 SHA-256을 원문 fenced block(dotfiles 커밋
  `b8e6decf` 시점)의 digest와 대조해 beads-ui 쪽의 무단 변경을 잡는다; (b) 원문이 바뀌면 그
  dotfiles 변경이 이 상수 갱신을 형제 작업으로 만든다 — 상위 spec §3.3 "beads-ui는 인용"이 그
  의무의 소유자다. 두 저장소를 한 테스트에서 직접 대조하는 교차 테스트는 두지 않는다: Worker
  `[verify]`가 도는 일회용 체크아웃에는 dotfiles 경로가 보장되지 않아 env 게이트 뒤의 vacuous
  RED가 된다.
- `--resume`은 쓰지 않는다. 파킹한 구현 세션은 headless(`claude -p`)라 TUI로 이어받을 수 없고,
  프롬프트가 요구하는 계보(원 영수증·`rereview:` 줄)는 notes에 있다 — Bead 본문의 권고 그대로.

### 3.5 `worker_notify` 전이 `awaitingUser`

`notify.js`에 `awaitingUser(input)` 추가. 기존 규약 그대로(plain content, 첫 줄 = 전이+Bead,
config 먼저, no-throw, fire-and-forget).

```
🤖 ⏸️ 방향 질의 — UI-xxxx <제목 60자>
파킹: spec_review_stale:revise (adr_conflict)
질의 세션: 기동 — tmux bdui-inquiry:UI-xxxx
브리지: 활성
리포: beads-ui
```

- `TITLE.awaiting_user = '🤖 ⏸️ 방향 질의'`.
- `파킹:` 줄 = `awaiting_user` 값 + `(stale_kind)`(있을 때만).
- `질의 세션:` 줄의 값 어휘: `기동 — tmux <session>:<window>` · `이미 실행 중` ·
  `미기동 — <disabled|stale_kind_missing|bd_unavailable|tmux_unavailable|launch_failed:<reason>>`.
  미기동이면 다음 줄에 `처분: Worker 탭 fix/approve`를 붙인다.
- `브리지:` 줄 = `~/tmp/claude-discord-bridge/state/heartbeat` mtime이 15초 이내면 `활성`, 아니면
  `비활성 — 질문은 tmux에서 직접 답`. stat 실패는 비활성. 읽기 전용 관측이며 기동 여부를 바꾸지
  않는다(degraded이지 기능 손실이 아니다 — 상위 spec).
- `리포:` 줄 = 기존 `repoLabel`.

### 3.6 config — `[worker.direction_inquiry]`

`server/config.js`에 `normalizeDirectionInquiry(parsed)` 추가, `worker_notify`와 같은 fail-quiet
규칙. 결과 `{ enabled: boolean, tmux_session: string }`.

```toml
[worker.direction_inquiry]
enabled = true                 # 기본 false — Mac Studio config에서만 켠다
tmux_session = "bdui-inquiry"  # 기본값
```

Mac Studio 전용 조건은 호스트 판정이 아니라 **config 선언**이다(`worker_notify.cmd`와 같은
방식, Bead 본문 권고). 브리지 없는 호스트의 Worker는 config가 없어 현행(파킹+클릭)이다.
`enabled`가 아니면 tmux를 건드리지 않는다. 현행 `readRuntimeConfig`는 모르는 절을 무시하므로,
이 절은 코드가 착지하기 전에 미리 써 두어도 무해하다 — §6의 적용 순서가 그 성질에 기댄다.

### 3.7 관측성 — `probeTmux`

`enabled`일 때 runtime 기동 시 한 번 `tmux list-panes -a`를 돌려 로그에
`direction_inquiry: tmux reachable (<n> panes)` 또는 `direction_inquiry: tmux unreachable: <err>`를
남긴다. launchd(`com.beads-ui.server`)에서 사용자 tmux 소켓(`/private/tmp/tmux-<uid>/default`)에
닿는지가 이 설계의 환경 전제이고, 파킹이 실제로 일어나기 전에 그 전제를 확인하는 유일한 자리다.

### 3.8 배선

- `runtime.js`: `createDirectionInquiry({...})`를 만들어 scheduler deps에 `directionInquiry`로
  넘긴다. 부재 시 scheduler는 훅을 건너뛴다(테스트·다른 조립 경로 호환).
- `notify.js` 반환 타입에 `awaitingUser` 추가.

## 4. ADR 정합

- ADR 0005(자동 AI 수리 레인 폐기)는 **post-merge 실패의 자동 수리 세션**을 금한다. 이 세션은
  spec 게이트 단계의 **질문 중계**이며 사용자 답 없이는 아무것도 쓰지 않는다(프롬프트 금지 항목).
  대상·단계·행위가 모두 다르므로 충돌 아님. 계약이 "the direction inquiry session then asks the
  user"로 세션 존재를 이미 정했다.
- ADR 0012: 프롬프트 원문 복제는 계약 subset의 코드 내 복제와 같은 원칙이며, digest 테스트가
  그 복제의 정합 검사다(§3.4).
- ADR 0014: UI 요소 추가 없음.

## 5. 오류 처리 요약

| 상황 | 처리 |
|---|---|
| `awaiting_user`가 두 stale 값이 아님 | 종료(알림 없음) |
| `bd show` 실패 | 알림 `미기동 — bd_unavailable` |
| `stale_kind` 줄 없음 | 알림 `미기동 — stale_kind_missing` |
| tmux 부재/실패 | 알림 `미기동 — tmux_unavailable` |
| 살아 있는 pane 마커 | 알림 `이미 실행 중`, 재기동 없음 |
| 마커 실패 또는 `claude` 즉시 종료 | 알림 `미기동 — launch_failed:exited`(세션 없음이 보장됨) |
| 브리지 heartbeat stale | 기동은 하고 알림에 `비활성` |
| 세션이 두 번째 REVISE로 미발행 종료 | 세션 소유(dotfiles). pane 소멸; `awaiting_user`는 남고 클릭 처분 |

## 6. Test scope

- `server/worker/direction-inquiry.test.js`(신설): notes 파싱(마지막 줄 우선, 부재), 레인 판정(두
  값·other), single-quote 이스케이프, wrapper 문자열(`set-option` → `exec` 순서), 프롬프트 채움
  (필드 5개), 프롬프트 상수 SHA-256 = 원문 fenced block digest, 생존 판정(`pane_dead`·다른
  Bead·tmux 실패), 기동 순서(list → new-session(없을 때만) → new-window → list-panes 마커 확인),
  pane 소멸 시 `launch_failed:exited`, in-flight 직렬화, 모든 경로 no-throw. tmux·bd는 가짜 러너.
  신설 파일이므로 전부 구현 전 RED.
- `server/worker/notify.test.js`: `awaitingUser` 본문 3경로(기동/실행 중/미기동), config off no-op.
  메서드 부재로 RED.
- `server/config.test.js`: `[worker.direction_inquiry]` 정규화(부재→disabled, `enabled` 문자열 →
  disabled, `tmux_session` 기본·비문자열→기본). 키 부재로 RED.
- `server/worker/revise-parked.test.js`: `status='parked'` + `spec_review_stale` attempt가 후보에
  포함, `failed` 유지. 현행 코드는 `parked`를 제외하므로 RED.
- `server/worker/scheduler.test.js`: `parked` 기록 직후 `spec_review_stale` attempt에서만
  `directionInquiry.onParkedAttempt`가 불리고, 처분 attempt·deps 부재에서는 불리지 않음. 훅 부재로
  RED.
- Pre-Handoff: `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120s) · `npm run lint` ·
  `npm run prettier:write` · `npm run build`.

**적용 순서(라이브)** — 기존 `[deploy]`는 빌드·재시작·프로세스 identity·HTTP만 검증하므로, 그 밖의
두 단계는 아래 순서로 이 세션(또는 Worker 구현 세션)이 머지 전에 끝내고, 머지 뒤는 `[deploy]`와
보고서 잔여 줄이 잇는다. 각 단계는 중단돼도 되돌릴 것이 없다.

1. **머지 전** Mac Studio `~/.config/bdui/config.toml`에 §3.6 절을 추가한다. readback:
   `python3 -c 'import tomllib;…'`로 `worker.direction_inquiry.enabled == True`. 실행 중인 서버는
   이 절을 무시하므로(§3.6) 동작 변화 없음 — 중단 안전.
2. **머지 → `[deploy]`**(Worker 소유): `.worktrees/.repo-ops-deploy` 정렬·`bdui-shared restart`·
   프로세스 경로·포트·HTTP 검증. 현행 그대로.
3. **머지 후 관찰**: `bdui-shared logs`에서 `direction_inquiry: tmux reachable` 한 줄. 결정적·기계
   검증 가능하나 `[deploy]` 스크립트의 검증 항목은 아니므로 완료 보고서의 잔여 줄
   `- 관찰: probeTmux 로그 — <결과>`로 넘긴다(routine post-merge check; interactive-only 잔여
   아님). Discord 왕복(질문 버튼 → 답 → 발행)은 실제 파킹이 발생하는 첫 사례에서 확인한다.

따라서 `worker-ineligible`은 붙지 않고 `session_preferred_reason` 조건도 없다.

## 7. 구현 unit 후보

1. `trigger`: `server/worker/direction-inquiry.js` · `server/config.js` · `runtime.js` ·
   `scheduler.js` 훅 · `revise-parked.js` 조건 · 테스트
2. `notify`: `server/worker/notify.js` `awaitingUser` · 테스트

단일 delegation으로 충분하다(파일 6개, 결합된 한 흐름).

## 결정 (ADR 후보)

- 무인 방향성 충돌 파킹은 자동으로 사람을 부르는 질의 세션을 띄운다(수리 세션이 아니다).
  되돌리기 어려움: 아님(config 토글 하나로 끄면 현행 파킹+클릭으로 돌아간다) · 맥락 없이 놀라움:
  성립(ADR 0005 뒤에 "자동 기동 세션"이 생김) · 실제 트레이드오프: 성립(사용자 개입 지연 vs 자동
  세션 비용). 세 조건 모두 성립하지 않으므로 ADR로 남기지 않는다; §4의 0005 비충돌 논증이 이
  spec에 남는다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|

- 관찰: 세션이 죽은 뒤 `awaiting_user`가 남은 Bead를 사람이 다시 질의 세션으로 띄우는 `[질의
  재기동]` 버튼 — 현행 클릭 처분이 탈출구이므로 지금은 만들지 않는다. 필요가 관측되면 카드 슬롯
  표 갱신과 함께 별도 Bead.
- 관찰: scope 겹침 — `2026-08-28-worker-failure-tiers-queue-hold-design.md`(UI-5ym8, in_progress)는
  이 spec의 **선행**이다(§3.1 `parked` 기록이 트리거). `scheduler.js`를 공유하며 이 spec은 그 기록
  직후 훅 호출 한 줄과 `revise-parked.js` 조건 확장만 더한다.
  `2026-08-28-worker-record-timeline-retention-design.md`(UI-8wpb, open)도 `scheduler.js`를
  공유하나 기록 구조(events.jsonl·queue.json 상태 전용화)를 다룬다 — 같은 파일의 다른 절이며 의도
  충돌 없음, 착지 순서에 따른 rebase만 남는다.
