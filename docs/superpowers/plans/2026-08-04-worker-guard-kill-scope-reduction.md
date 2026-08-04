# 워커 가드 kill 범위 축소 — 구현 계획

## Context

beads-ui 워커의 명령 가드가 치명적이지 않은 행위까지 세션 전체를 SIGTERM으로
죽이고 있다. 전체 워크스페이스 큐의 가드 발동 12건을 전수 집계하면 소실 비용이
$143.97이고, 3층 구조가 배포된 `5fd4934`(2026-08-03) 이후의 발동 6건 중 5건이
오탐이다. 실제 위반은 `git -c core.hooksPath=/dev/null` 1건뿐이었다.

특히 두 결함이 살아 있다. 하나는 `git config --get core.hooksPath` 같은 **순수
읽기**를 훅 무력화로 판정해 죽이는 것이고(08-04, $8.99), 다른 하나는 `git merge`
일체를 금지해 세션이 base를 동기화할 수단 자체를 잃은 것이다(08-04
`dotfiles-v05o`, $11.67 — rebase는 push 안전 규칙이 막고 merge는 가드가 막는다).
여기에 사후 검출층이 남의 PR 머지 커밋과 사람이 올린 커밋을 attempt의 랜딩으로
오판한 4건이 겹친다.

사용자가 정한 원칙은 **"치명적이지 않으면 kill하지 않는다"**이다. 가드를 없애는
것이 아니라, 원격을 되돌릴 수 없게 만드는 두 경로(`gh pr merge`, 훅 무력화)만
kill로 남기고 나머지는 경고로 내린다. 사후 검출은 판정 근거를 reflog 추정에서
pre-push hook이 남기는 push 사실로 옮긴다.

승인된 스펙: `docs/superpowers/specs/2026-08-04-worker-guard-kill-scope-reduction-design.md`
(`e68306cf4448bfa731b8bcb9254fa3c367652b08`, `spec_review = codex@e68306cf…`).
Bead `UI-1xcd`.

**Phase 경계의 근거**: `GUARD_EFFECTS` 변경은 `session.js`와 `session-monitor.js`의
동작을 즉시 바꾸므로 판정과 배선을 갈라놓으면 중간 상태에서 테스트가 깨진다. 두
축은 완화 축(Phase 1)과 검출 축(Phase 2)이고, 이 둘은 서로 의존하지 않는다.

## Phase 1: 가드 완화를 원자적으로 적용한다

판정·배선·기록·고지가 한 커밋 안에서 함께 움직여야 한다. 쪼개면 중간 상태가 red다.

- `runner/command-guard.js`의 `GUARD_EFFECTS`(`:208-213`)에서 `base_merge`를 `warn`
  으로 내린다. `gh_pr_merge`·`hook_bypass`는 `kill`, `git_push_base`는 `warn` 유지.
- `isHookBypass()`(`:1385-1425`)의 `git config` 분기(`:1421-1423`)를 연산 분류로
  교체한다. 읽기 3형태 — modern 하위 명령(`config get`/`list`), legacy 명시
  플래그(`--get`/`--get-all`/`--get-regexp`/`--list`), 암묵 읽기(`config <key>`,
  값 인자 없음) — 는 위반이 아니다. `set`/`unset`/키+값 쓰기는 위반 유지.
  기존 `configKeyOf()`와 `HOOKS_PATH_RE`를 재사용한다.
- `fallbackViolation()`(`:1551`)의 폴백 순서를 고정한다. `--no-verify`·
  `git -c core.hooksPath=`·`GIT_CONFIG_*`를 먼저 독립 판정해 걸리면 kill하고, 그
  뒤에만 같은 `git config` 구간 안에서 읽기 면제를 적용한다. 면제는 kill을 이길 수 없다.
- `conflict_resolution`이 가드로 들어가는 경로만 제거한다 — `GuardContext`
  필드(`:187`), `findMergeViolation` 옵션 처리(`:1744`), `session.js`의 가드 호출
  인자, `scheduler.js:3320`의 runner settings 전달, `session-monitor.js:257-262`의
  전달. `scheduler.js:2493`의 attempt 레코드 필드와 `:2726`·`:2826`·`:2966`·
  `:3090`·`:3185`의 사용처는 **유지**한다.
- warn을 durable하게 남긴다. `queue-store.js`의 `makeAttempt()`(`:498`)가 필드를
  열거 정규화하므로 **먼저 `guard_warnings` 필드를 `Attempt` 타입과 `makeAttempt()`
  에 추가**해야 한다 — 이것 없이 `updateAttempt()`로 임의 키를 넣으면 즉시 버려진다.
  그 위에서 `scheduler.js:2606`의 기존 `handle.events.on('event', …)` 구독에
  핸들러를 붙여 누적하고, 재시작 경로(`session-monitor.js:267-284`)도 같은 필드에 쓴다.
- `runner/preamble.js:70`의 가드 계약 고지를 바뀐 계약으로 갱신한다.

**검증**: `npx vitest run server/worker/runner/command-guard.test.js
server/worker/runner/session.merge-guard.test.js server/worker/session-monitor.test.js
server/worker/runner/preamble.test.js server/worker/queue-store.test.js
server/worker/scheduler.test.js` green. 회귀 2·3이 변경 전 RED · 변경 후 GREEN이고,
warn 레코드는 cold reload 후에도 읽힌다.

## Phase 2: 사후 검출을 push 사실 위로 옮긴다

- `guard-hook.js`의 `renderHookScript()` step 2 루프에서, 판정 전에 받은 줄을 hook
  디렉터리의 `pushes.jsonl`에 append한다. 거부하는 push도 기록한다. step 1에서 다른
  repo로 판정돼 `exit 0`한 push는 대상이 아니므로 기록하지 않는다. append 실패가
  push를 막아서는 안 된다.
- **`install()`이 빈 push-log를 초기화한다.** 이것이 migration 경계다 — 파일이
  있으면 새 hook이 설치된 attempt라 기록을 신뢰할 수 있고, 없으면 배포 이전에
  dispatch된 attempt이므로 "push 없음"이 아니라 **관측 불가**다. 후자는 위반으로도
  무위반으로도 판정하지 않고 `error: 'push_log_absent'`로 기록한다.
- **hook 제거를 판정 이후로 옮긴다.** 현재 `disposeDeadAttempt()`는
  `removeGuardHook()`(`scheduler.js:1733`)을 `settleBaseDrift()`(`:1767`)보다 먼저
  호출해, 새 판정이 읽어야 할 증거를 미리 지운다. 모든 종료 경로에서 settlement가
  끝난 뒤 `finally`로 제거하도록 순서를 바꾼다. `removeGuardHook` 호출 지점이 15곳
  이상이므로, settlement를 지나는 경로를 전수 확인한다.
- `scheduler.js:2565-2575`의 시작점 기록을 고친다. `runner.spawn()` **이전에**
  `git rev-parse refs/heads/<bead_id>`로 브랜치 tip을 읽고, 실패 시 `base_oid`로
  폴백하지 않고 필드 부재로 남긴다. 진단용이며 판정에는 쓰이지 않는다.
- `base-drift.js`의 `observeBaseDrift()`를 재작성한다. 판정 순서는 ① 기존 제외
  선판정 유지(`disposition`·`no_base_oid` — hook을 애초에 설치하지 않는 대상이라
  push-log를 묻기 전에 빠진다), ② base가 움직였을 때 push-log 부재 →
  `push_log_absent`, ③ `remote_ref == refs/heads/<target_base>`인 줄이 없으면
  무위반, ④ 있으면 그 `local_oid`가 원격 base에서 도달 가능한지 확인해 도달
  가능하면 랜딩.
  `revList()`·`acquisitionTimes()`·`parseReflog()`와 `head !== observed` 조건부
  containment 분기, `precedence_observe:*` 경로를 제거한다. `BaseDriftRecord`에서
  `inherited`·`excluded`를 걷어내고 증거를 push 기록의 SHA로 바꾼다.

**검증**: `npx vitest run server/worker/guard-hook.test.js
server/worker/base-drift.test.js server/worker/scheduler.test.js` green. 회귀 1·4·5와
migration 케이스(구 hook attempt가 `push_log_absent`로 남고 조용히 무위반이 되지
않는지), 재시작 후 dead attempt의 push 기록이 실제로 판정되는지가 닫힌다.

## Test scope

RED→GREEN은 아래 seam에만 적용한다.

| seam | 파일 | phase |
| --- | --- | --- |
| `GUARD_EFFECTS` 재판정 | `runner/command-guard.test.js` | 1 |
| `hook_bypass` 읽기 3형태 제외 | `runner/command-guard.test.js` | 1 |
| 폴백 kill 우선순위 | `runner/command-guard.test.js` | 1 |
| `conflict_resolution` 가드 입력 제거 | `runner/session.merge-guard.test.js` | 1 |
| 전달 경로 제거 | `scheduler.test.js` | 1 |
| 재시작 경로 정합 | `session-monitor.test.js` | 1 |
| 프리앰블 문구 | `runner/preamble.test.js` | 1 |
| `guard_warnings` 필드 누적·cold reload | `queue-store.test.js` | 1 |
| warn durable 기록 배선 | `scheduler.test.js`, `session-monitor.test.js` | 1 |
| push 기록 | `guard-hook.test.js` | 2 |
| push-log 초기화와 부재 구별 | `guard-hook.test.js`, `base-drift.test.js` | 2 |
| hook 제거 순서 | `scheduler.test.js` | 2 |
| 시작점 캡처 시점 | `scheduler.test.js` | 2 |
| push 사실 기반 랜딩 판정 | `base-drift.test.js` | 2 |

**회귀 고정**:

1. 08-03 `base_landing_detected` 2쌍 — 커밋 없는 attempt가 남의 랜딩을 뒤집어쓴 건 → phase 2
2. 08-04 `git config --get core.hooksPath` — 순수 읽기 → phase 1
3. 08-04 `git merge origin/main --no-edit` — 정당한 동기화, 세션 생존 → phase 1
4. mixed: 로컬 커밋 생성 + base 흡수 + push 없음, 원격 base는 남의 손으로 이동 → 무위반 → phase 2
5. mixed 대조군: 같은 상태에서 자기 커밋을 base로 push → 랜딩 → phase 2

5번은 변경 전후 모두 위반이어야 한다 — 완화가 진짜 랜딩까지 놓치지 않는다는 증거다.

**제외**: 프런트엔드 번들(서버 코드만 수정), `deploy.json` 신규 도입(스펙이 명시적
범위 밖으로 둠).

## 통합 검증

두 phase가 끝난 뒤 `npm run all`(= `lint` → `tsc` → `test` → `prettier:check`)이
green이어야 한다. 이 fork에서는 GitHub Actions가 돌지 않으므로 로컬 검증이 CI를
대신하고, `gh pr checks`가 비면 vacuous pass로 처리한다.

## 머지 후 적용

`AGENTS.md`의 Post-Merge Runtime Validation에 따라 머지는 완료가 아니다.

**Precondition** — 재시작 전에 legacy attempt를 비운다. Phase 2가 판정 근거를
바꾸므로, 구 hook으로 dispatch된 `running` attempt가 새 코드에서 settlement되면
증거 없이 판정된다. auto-advance를 중지하고 진행 중 attempt가 모두 기존 코드로
settlement될 때까지 기다린 뒤 재시작한다.

이어서 스펙의 적용 순서 7단계를 따른다 — 머지 확인 → 공유 체크아웃 안전 확인 →
fetch 및 ff-only 동기화 → `HEAD == origin/main == 머지 SHA` 검증 → 런타임 설정 확인
→ `bdui-shared restart` → 프로세스 경로·포트·HTTP 실측. 이 저장소에는 `deploy.json`이
없어 `worker-ineligible` 라벨 처분을 택했으므로 재시작은 이 세션이 수행한다.
