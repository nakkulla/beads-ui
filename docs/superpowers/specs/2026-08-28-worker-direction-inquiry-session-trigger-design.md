---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/notify.js
  - server/worker/scheduler.js
  - server/worker/runtime.js
  - server/config.js
---

# Worker 무인 방향성 충돌 파킹 직후 tmux 방향 질의 `claude` 세션 자동 기동 (UI-7uid)

- Bead: `UI-7uid` · 선행: `dotfiles-0bdo`(착지, PR #457)
- 상위 spec: dotfiles
  `docs/superpowers/specs/2026-08-28-adr-aware-stale-rereview-and-direction-inquiry-design.md`
  §3.3 — 프롬프트 원문·절차·금지는 dotfiles
  `src/shared/skills/flow/workflow/references/execution.md` "Direction inquiry session"이
  소유한다. 이 spec은 **트리거·가드·알림**만 정한다.

## 1. 문제

Worker 무인 admission의 stale 재리뷰 레인이 방향성 충돌(broken premise)을 만나면
`awaiting_user=spec_review_stale:revise`(plan은 `plan_approval_stale:revise`)를 쓰고 attempt는
실패로 마감된다. 그 뒤 처분은 사람이 Worker 탭을 열어 `fix`/`approve`를 누르는 것뿐이다
(`revise-disposition.js`). 사용자는 파킹 사실을 Discord로도 받지 못한다 — `worker_notify`는
`❌ 실패`만 보내고, 그 실패 사유(`no_pr` 등)는 파킹과 다른 실패를 구분하지 못한다.

dotfiles 쪽은 착지했다: 계약이 4분류와 notes `rereview:`/`stale_kind` 줄을 정했고, 방향 질의
세션의 프롬프트 원문이 `execution.md`에 있다. 남은 것은 "누가 그 세션을 띄우는가"다.

## 2. 목표·비목표

목표

- 파킹 직후 Mac Studio tmux에 대화형 `claude` 세션을 기동하고 dotfiles 프롬프트를 첫 입력으로
  넣는다. 세션의 `AskUserQuestion`은 기존 `claude-discord-bridge`가 Discord로 중계한다.
- 같은 Bead에 살아 있는 질의 세션이 있으면 재기동하지 않는다.
- `worker_notify`에 `awaiting_user` 전이를 추가한다 — 세션 기동 여부와 무관하게 파킹 자체를
  알린다.

비목표

- 브리지 데몬 변경 없음. `AskUserQuestion` 중계는 브리지가 `TMUX_PANE`을 상속받은 훅 manifest로
  이미 한다(`stop-hook.sh` `bridge_manifest_write`). tmux 안에서 띄운 대화형 세션이면 그대로 잡힌다.
- 프롬프트 원문 재정의 없음. 세션 절차·금지·실패 처리는 dotfiles 소유.
- 기존 `fix`/`approve` 클릭 처분·카드·`revise-parked` 관측 무변경. 세션이 죽었을 때의 수동
  탈출구로 그대로 남는다. 새 UI 칩·버튼 없음(카드 슬롯 표 무변경).
- `awaiting_user` 값 어휘·metadata 키 무변경. beads-ui는 키를 쓰지 않는다(계약 소비자).
- 다른 `awaiting_user` 값(`impl_review_conflict:design`)은 알림만 하고 세션은 띄우지 않는다.

## 3. 설계

### 3.1 트리거 지점 — `scheduler.js failAttempt`

파킹의 관측 형태는 `revise-parked.js`의 3조건과 같다: 대기 큐 잔류 · 최신 leaf attempt가
`failed`이고 `spec_review_stale === true` · bd 재관측에 `awaiting_user`. 트리거는 그 중 두 번째가
**확정되는 순간**에 건다.

- `failAttempt(workspace, attempt_id, bead_id, …)`가 attempt 레코드를 `failed`로 쓴 뒤, 그
  attempt가 `spec_review_stale === true`이고 `disposition`이 없으면(일반 admission 레인의 stale
  attempt만; `revise_fix`·review-session 등 처분 세션은 제외)
  `deps.directionInquiry.onParkedAttempt({ workspace, bead_id, attempt_id, repo, target_base })`를
  **fire-and-forget**으로 부른다. `notifyLifecycle`과 같은 자리·같은 no-throw 규약이다.
- 이 훅은 판정하지 않는다. 판정은 §3.2의 모듈이 bd 재관측으로 한다 — 실패 원인이 `no_pr`든
  다른 것이든, `awaiting_user`가 있어야 파킹이다.

### 3.2 새 모듈 `server/worker/direction-inquiry.js`

한 함수 `createDirectionInquiry(deps)` → `{ onParkedAttempt, probeTmux }`. 의존은 주입한다:
`getConfig`, `bd.readIssue`, `notifier`, `spawnSync`형 tmux 러너(`runTmux(args)`),
`resolveClaude`(PATH 해석), `now`, `log`, `fs.stat`(브리지 heartbeat).

`onParkedAttempt` 절차 — 전 구간 try/catch, 반환 promise는 항상 resolve:

1. **재관측** `bd show <id> --json`. `metadata.awaiting_user`가
   `spec_review_stale:revise` | `plan_approval_stale:revise`이면 파킹. 그 외 값이면 알림만
   (`lane: 'other'`), 키 부재면 종료(파킹 아님 — 일반 실패는 이미 `❌ 실패`로 갔다).
2. **notes 파싱**(fail-quiet). 마지막 `stale_kind=adr_conflict|intent_conflict` 줄과 마지막
   `rereview: direction_conflict — <근거>` 줄. `stale_kind`가 없으면 세션을 띄우지 않는다
   (`stale_kind_missing`) — 프롬프트 필드가 채워지지 않으므로. 원 영수증은
   `metadata.spec_review`(plan이면 `plan_approval`).
3. **활성 판정**. config `worker.direction_inquiry.enabled !== true`면 `disabled`.
4. **in-flight 가드**(§3.3). 살아 있으면 `already_running`.
5. **기동**(§3.4). 성공 `launched`, 실패 `launch_failed:<reason>`.
6. **알림**(§3.5) — 1~5의 결과를 한 메시지로. 알림은 `enabled`와 무관하게 `worker_notify`가
   켜져 있으면 항상 간다.

같은 Bead에 대한 동시 호출(재시작 직후 tick 중복 등)은 모듈 내 `Set` in-flight로 1~6 구간을
직렬화한다 — `revise-disposition.js`의 `in_flight` Map과 같은 형태로, 첫 `await` 전에 예약한다.

### 3.3 질의 세션 생존 판정 — tmux pane 마커

메모리 레코드를 신뢰하지 않는다(서버 재시작으로 사라진다). 진실은 tmux다.

- 기동 시 새 window의 pane에 pane option `@bdui_inquiry_bead=<Bead ID>`를 쓴다.
- 살아 있음 = `tmux list-panes -a -F '#{pane_id}\t#{@bdui_inquiry_bead}\t#{pane_dead}'` 출력에
  같은 Bead ID이고 `pane_dead=0`인 행이 있다. window는 `remain-on-exit` 기본(off)이므로
  `claude`가 끝나면 pane이 사라진다 — "pane 존재"가 곧 "프로세스 생존"이다.
- tmux 서버 부재/실행 실패는 `tmux_unavailable`로 **기동하지 않는다**(fail-closed: 확인할 수 없는
  중복은 만들지 않는다). 알림에는 그 사유가 실린다.
- 세션 삭제·회수는 하지 않는다. 사용자가 `/exit`하거나 tmux를 닫으면 끝이고, 그 뒤
  `awaiting_user`는 클릭 처분으로 푼다(비목표).

### 3.4 기동 형태

- tmux 세션 이름: config `tmux_session`(기본 `bdui-inquiry`). 없으면
  `tmux new-session -d -s <name>`으로 만든다. 사용자의 작업 세션(`dev`)에 window를 끼우지 않는다 —
  사용자는 `tmux attach -t bdui-inquiry`로 본다.
- window: `tmux new-window -d -P -F '#{pane_id}' -t <session> -n <Bead ID> -c <cwd> -- <cmd>`.
  window 이름 = Bead ID(사람이 찾는 키). `-P -F`로 받은 pane id에 §3.3 마커를 쓴다; 마커 쓰기
  실패(즉시 종료로 pane 소멸)는 `launch_failed:marker`.
- `cwd` = attempt의 `repo`(resolved `target_base` 체크아웃 루트 — `revise-disposition` fresh
  세션과 같은 자리). 프롬프트의 `target_base 체크아웃: <path>`에도 같은 값.
- `<cmd>` = `resolveClaude()`가 Worker PATH에서 찾은 `claude` 절대경로 + `[--model <m>]`(config
  `model`이 있을 때만) + 프롬프트 1인자. tmux는 shell-command를 `sh -c`로 돌리므로 각 인자를
  **single-quote 이스케이프**해 하나의 문자열로 만든다(`'…'` 안의 `'`는 `'\''`). 이 quoting
  함수는 단위 테스트 대상이다. 권한 모드 플래그는 넘기지 않는다 — 사용자 settings의
  `defaultMode`를 따른다(현재 `bypassPermissions`).
- 프롬프트 = dotfiles `execution.md` "Direction inquiry session" 코드블록 원문에 `<bead-id>`·원
  영수증·`stale_kind`·충돌 요약(notes `rereview:` 줄의 근거 원문)·`target_base` 체크아웃을 채운
  것. 문장은 **그대로 인용**하며 beads-ui가 절차·금지를 덧붙이지 않는다. 원문은 모듈 상수로
  복제한다(ADR 0012: 계약 파일을 런타임에 읽지 않는다). 상수 옆 주석에 원문 위치를 적고, 원문이
  바뀌면 이 상수가 stale이라는 사실을 `docs/adr`이 아니라 상위 spec §3.3이 소유한다.
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

- `TITLE.awaiting_user = '🤖 ⏸️ 방향 질의'`. `lane: 'other'`(값이 이 레인이 아닐 때)는 제목
  `🤖 ⏸️ 사용자 결정 대기`이고 `질의 세션` 줄을 생략한다.
- `파킹:` 줄 = `awaiting_user` 값 + `(stale_kind)`(있을 때만).
- `질의 세션:` 줄의 값 어휘: `기동 — tmux <session>:<window>` · `이미 실행 중` ·
  `미기동 — <disabled|stale_kind_missing|tmux_unavailable|launch_failed:<reason>>`. 미기동이면
  다음 줄에 `처분: Worker 탭 fix/approve`를 붙인다.
- `브리지:` 줄 = `~/tmp/claude-discord-bridge/state/heartbeat` mtime이 15초 이내면 `활성`, 아니면
  `비활성 — 질문은 tmux에서 직접 답`. stat 실패는 비활성. 읽기 전용 관측이며 기동 여부를 바꾸지
  않는다(degraded이지 기능 손실이 아니다 — 상위 spec).
- `리포:` 줄 = 기존 `repoLabel`.

### 3.6 config — `[worker.direction_inquiry]`

`server/config.js`에 `normalizeDirectionInquiry(parsed)` 추가, `worker_notify`와 같은 fail-quiet
규칙. 결과 `{ enabled: boolean, tmux_session: string, model: string|null }`.

```toml
[worker.direction_inquiry]
enabled = true                 # 기본 false — Mac Studio config에서만 켠다
tmux_session = "bdui-inquiry"  # 기본값
# model = "opus"               # 선택. 없으면 claude 기본
```

Mac Studio 전용 조건은 호스트 판정이 아니라 **config 선언**이다(`worker_notify.cmd`와 같은
방식, Bead 본문 권고). 브리지 없는 호스트의 Worker는 config가 없어 현행(파킹+클릭)이다.
`enabled`가 아니면 tmux를 건드리지 않는다.

### 3.7 관측성 — `probeTmux`

`enabled`일 때 runtime 기동 시 한 번 `tmux list-panes -a`를 돌려 로그에
`direction_inquiry: tmux reachable (<n> panes)` 또는 `tmux unreachable: <err>`를 남긴다.
launchd(`com.beads-ui.server`)에서 사용자 tmux 소켓(`/private/tmp/tmux-<uid>/default`)에 닿는지가
이 설계의 환경 전제이고, 파킹이 실제로 일어나기 전에 그 전제를 확인하는 유일한 자리다.

### 3.8 배선

- `runtime.js`: `createDirectionInquiry({...})`를 만들어 scheduler deps에 `directionInquiry`로
  넘긴다. 부재 시 scheduler는 훅을 건너뛴다(테스트·다른 조립 경로 호환).
- `notify.js` 반환 타입에 `awaitingUser` 추가.

## 4. ADR 정합

- ADR 0005(자동 AI 수리 레인 폐기)는 **post-merge 실패의 자동 수리 세션**을 금한다. 이 세션은
  spec 게이트 단계의 **질문 중계**이며 사용자 답 없이는 아무것도 쓰지 않는다(프롬프트 금지 항목).
  대상·단계·행위가 모두 다르므로 충돌 아님. 계약이 "the direction inquiry session then asks the
  user"로 세션 존재를 이미 정했다.
- ADR 0012: 프롬프트 원문 복제는 계약 subset의 코드 내 복제와 같은 원칙(§3.4).
- ADR 0014: UI 요소 추가 없음.

## 5. 오류 처리 요약

| 상황 | 처리 |
|---|---|
| `bd show` 실패 | 로그, 알림 없음(파킹 여부 미확정) |
| `awaiting_user` 부재 | 종료 |
| `stale_kind` 줄 없음 | 알림 `미기동 — stale_kind_missing` |
| tmux 부재/실패 | 알림 `미기동 — tmux_unavailable` |
| 살아 있는 pane 마커 | 알림 `이미 실행 중`, 재기동 없음 |
| `claude` 즉시 종료(마커 실패) | 알림 `미기동 — launch_failed:marker` |
| 브리지 heartbeat stale | 기동은 하고 알림에 `비활성` |
| 세션이 두 번째 REVISE로 미발행 종료 | 세션 소유(dotfiles). pane 소멸 → 다음 파킹 전이에서 재기동 가능, 그 전엔 클릭 |

## 6. Test scope

- `server/worker/direction-inquiry.test.js`(신설): notes 파싱(마지막 줄 우선, 부재), 값 레인
  판정(두 값·other·부재), single-quote 이스케이프, 프롬프트 채움(필드 5개), 생존 판정
  (`pane_dead`·다른 Bead·tmux 실패), 기동 순서(list → new-session(없을 때만) → new-window →
  set-option), in-flight 직렬화, 모든 경로 no-throw. tmux·bd는 가짜 러너.
- `server/worker/notify.test.js`: `awaitingUser` 본문 4경로(기동/실행 중/미기동/other), config off
  no-op.
- `server/config.test.js`: `[worker.direction_inquiry]` 정규화(부재→disabled, enabled 문자열 →
  disabled, tmux_session 기본).
- `server/worker/scheduler.test.js`: `failAttempt`가 `spec_review_stale` attempt에서만
  `directionInquiry.onParkedAttempt`를 부르고, 처분 attempt·deps 부재에서는 부르지 않음.
- Pre-Handoff: `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120s) · `npm run lint` ·
  `npm run prettier:write` · `npm run build`.
- 라이브(배포 후, 구현 보고서에 기록): Mac Studio config에 `[worker.direction_inquiry]` 추가 →
  `bdui-shared restart` → 서버 로그의 `probeTmux` 결과. Discord 왕복(질문 버튼 → 답 → 발행)은
  실제 파킹이 발생하는 첫 사례에서 확인하며, 이 spec의 acceptance는 로그 프로브까지다.

## 7. 구현 unit 후보

1. `trigger`: `server/worker/direction-inquiry.js` · `server/config.js` · `runtime.js` ·
   `scheduler.js` 훅 · 테스트
2. `notify`: `server/worker/notify.js` `awaitingUser` · 테스트

단일 delegation으로 충분하다(파일 5개, 결합된 한 흐름).

## 결정 (ADR 후보)

- 무인 방향성 충돌 파킹은 자동으로 사람을 부르는 질의 세션을 띄운다(수리 세션이 아니다).
  되돌리기 어려움: 아님(config 토글) · 맥락 없이 놀라움: 성립(0005 뒤에 "자동 세션"이 생김) ·
  실제 트레이드오프: 성립(사용자 개입 지연 vs 자동 세션 비용). 세 조건 모두 성립하지 않으므로
  ADR로 남기지 않는다; §4의 0005 비충돌 논증이 이 spec에 남는다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|

- 관찰: 세션이 죽은 뒤 `awaiting_user`가 남은 Bead를 사람이 다시 질의 세션으로 띄우는 `[질의
  재기동]` 버튼 — 현행 클릭 처분이 탈출구이므로 지금은 만들지 않는다. 필요가 관측되면 카드 슬롯
  표 갱신과 함께 별도 Bead.
- 관찰: scope 겹침 — `2026-08-28-worker-failure-tiers-queue-hold-design.md`(UI-5ym8)와
  `scheduler.js`·`notify.js`를 공유하나 그 spec은 실패 등급·hold를, 이 spec은 `failAttempt` 뒤 훅
  한 줄과 알림 전이 하나를 더한다. 착지 순서에 따른 rebase만 남는다.
