# AI 정리 제거와 managed self deploy 구현 계획

## Context

- owning Bead는 `UI-ckgr`이고, 승인된 스펙은 `docs/superpowers/specs/2026-08-11-managed-self-deploy-cleanup-recovery-design.md`@`90b74fad4dd63fd90f7a763d8ad35bd351e829ff`이다. 저장 경로는 이미 `docs/superpowers/plans/2026-08-11-managed-self-deploy-cleanup-recovery.md`로 pin되어 있다.
- 실행 기준점은 `main`/`origin/main`의 동일 SHA `90b74fad4dd63fd90f7a763d8ad35bd351e829ff`이다. 실행 세션은 이 계획을 base에서 다시 확인한 뒤 `.worktrees/UI-ckgr`와 phase child를 만들고 parent를 `in_progress`로 claim한다.
- 선행 `dotfiles-we2r`는 close·merge·managed install까지 끝났다. 설치된 `bdui-shared`는 managed pointer를 우선 읽고 pointer가 없을 때만 shared checkout으로 fallback한다. 현재 pointer가 없고 서비스가 fallback checkout에서 실행 중인 것은 이 작업의 첫 self cutover가 해소할 상태다.
- 이 저장소만 수정한다. dotfiles와 External/beads는 split unit으로 이미 별도 Bead가 소유하며, shared checkout의 branch·HEAD·tracked/untracked bytes는 읽기 외에는 건드리지 않는다.
- 구현 선택자는 execution entry에서 한 번만 확정한다. root는 설계·통합·전체 diff·검증을 소유하고, 독립된 UI 제거 작업은 Luna/max, 복잡한 Adapter/runtime 작업은 Terra/high 후보로 위임할 수 있다. queue/reconciler state machine을 함께 건드리는 phase는 병렬화하지 않는다.

## Phase 1: AI 정리 active surface 제거와 legacy 정산

1. Worker/Board/WS tests를 먼저 RED로 바꿔 `[AI 정리]`, diagnosis chip/result/pending state, `worker-cleanup-diagnose` route가 없어지고 merged `[정리]` action은 남는 계약을 고정한다. 이미 merged된 cleanup failure의 action은 queue 진입 경로를 유지하되 `prActions.retryCleanup`으로 새 reconcile attempt를 명시적으로 시작하게 한다.
2. `app/views/worker/**`, `app/views/board/**`, `server/ws/connection.js`, `server/ws/worker-handlers.js`, `server/worker/attach.js`, `server/worker/scheduler.js`, Claude/Codex runner에서 diagnosis dispatch, prompt, parse/settle, resume, `cleanup_diagnosis` launch 분기를 제거한다. ordinary completion intent, conflict resolution, `[정리]` full cleanup replay는 변경하지 않는다.
3. `server/worker/queue-store.js`는 legacy attempt의 `cleanup_diagnosis*`와 `cleanup_failed[*].diagnosis`를 계속 normalize·serialize한다. terminal record는 보존만 하고, `running`/`paused` record는 일치하는 process 또는 session이 있으면 새 effect 없이 자연 정산한다. 둘 다 없을 때만 `legacy_cleanup_diagnosis_retired` evidence로 orphan 정산하며 cleanup retry·repair budget·resume를 호출하지 않는다. active diagnosis writer는 남기지 않는다.

**Phase verification:** `server/worker/scheduler.test.js`, `server/worker/queue-store.test.js`, WS handler tests, Worker/Board view tests의 focused run을 통과시키고, live process/session이 있는 legacy attempt와 둘 다 없는 orphan을 각각 검증하며, `rg`로 public route·dispatch·prompt active writer가 0건인지 확인한다.

## Phase 2: Candidate-local Adapter와 durable restart journal

1. `server/worker/deployment-paths.js`와 새 managed-state module에 attempt-bound journal, runtime marker, pointer, install marker 경로와 protocol/repo/attempt/candidate/release binding validator를 둔다. JSON은 parent directory mode `0700`, file mode `0600`, temp file+rename으로 쓰고 secret·전체 environment·workspace 목록을 기록하지 않는다.
2. executable `scripts/managed-self-deploy.js`를 protocol v1 Adapter로 추가한다. allowlisted env, release containment, clean tracked candidate와 `HEAD == D`를 재확인하고 `package-lock.json` digest에 묶인 `npm ci --omit=dev` install marker를 readback한다. 그 다음 one-use launch token을 attempt/candidate/release에 bind한 `prepared` journal을 atomic write·readback한 뒤에만 `$XDG_DATA_HOME/bdui/runtime/beads-ui/current`를 exact release로 atomic cutover한다. source shared checkout에는 git mutation을 하지 않는다.
3. 같은 executable의 restart-helper mode는 새 process group에서 자기 PID·OS start time·launch token을 `restart_prerecorded`로 먼저 기록·readback하고, CAS로 `restart_committed`를 claim한 helper만 `bdui-shared restart`를 호출해 `restart_launched`를 기록한다. helper spawn 전 또는 prerecord 전 실패와 prerecord 후 commit 전 종료는 restart 0회를 증명해 같은 attempt의 기존 bounded retry를 허용한다. commit 뒤에는 exact runtime identity로 effect 완료를 증명해 receipt/readback만 복구하거나, 증명할 수 없으면 `restart_effect_ambiguous`로 끝내며 duplicate restart를 금지한다.

**Phase verification:** 새 managed-state/Adapter unit tests에서 invalid env/floor/path/HEAD/containment 무효과, lockfile install idempotency, `prepared` journal readback 이전 pointer 무변경, atomic pointer, helper stage 순서, pre-commit crash의 restart 0회와 retry, post-commit exact recovery/ambiguity, duplicate restart 차단을 각각 검증한다.

## Phase 3: Runtime identity, health binding, restart 후 receipt 복구

1. `server/worker/process-controller.js`의 OS process 관측을 재사용 가능한 fail-closed helper로 분리하고, 새 `server/runtime-identity.js`에서 module realpath로 source repo를 계산해 protocol version, source HEAD, PID, OS start time, started timestamp, process별 `instance_id`, host/port/health path를 만든다.
2. `server/index.js`, `server/app.js`, `server/health.js`를 연결해 listen 완료 뒤 runtime marker를 mode `0600`으로 atomic write하고, `/healthz` 응답의 `runtime` 필드는 marker 파일 복사가 아니라 현재 process identity를 반환하게 한다. 기존 bd/db/worker health와 200/503 의미는 유지한다.
3. listen과 marker write 뒤 Worker startup은 persisted `reconcile`에서 같은 attempt/candidate의 nonterminal managed deployment를 발견해 기존 Reconciler를 재호출한다. 별도 attempt나 restart budget을 만들지 않고, marker가 아직 exact candidate를 증명하지 못하면 기존 journal 단계에 따라 retry 또는 terminal evidence로 수렴한다.
4. Adapter 재호출은 journal·pointer·marker와 live `/healthz` 응답의 `runtime` protocol/PID/start/instance/source realpath/SHA/host/port를 exact candidate `D`와 대조한다. 모두 맞으면 install, pointer, restart handoff, exact readback action outcomes를 담은 기존 protocol v1 receipt를 atomic write하고, 이미 `D`가 live면 restart 없이 receipt만 복구한다. stale marker, unrelated healthy process, protocol mismatch, old SHA/path, health red는 success로 승격하지 않는다.

**Phase verification:** runtime identity/health tests와 startup/Adapter restart recovery tests에서 nonterminal same-attempt 재호출, exact match success, protocol version 및 marker/live 각 identity mismatch, old SHA/path, health red, receipt rename 전 crash 복구, duplicate receipt consume 금지를 확인한다.

## Phase 4: Reconciler failure ownership, progress, managed declaration

1. `server/worker/deployment-reconciler.js`는 managed command nonzero 뒤 stdout 문구가 아니라 bound journal failure record를 읽는다. finite mapping의 `failure_code`, `retryable`, protocol/repo/attempt/candidate/release를 검증해 public reason으로 투영하고, missing/malformed/unbound/unknown/모순 record는 `managed_failure_record_invalid` terminal로 fail closed한다. spawn/timeout처럼 journal 전 provider failure만 기존 retry reason을 유지한다.
2. `server/worker/queue-store.js`, `server/worker/pr-actions.js`, Worker/Monitor projection에 durable `restarting` stage와 reconcile retry count/evidence를 전달한다. UI는 `정리 중 · 재시작`을 표시하고, post-merge verify retry가 실제 소비된 경우에만 `1회 자동 재시도`라고 말하며 deploy retry 0회에는 재시도 문구를 쓰지 않는다.
3. `server/worker/completion-repair-policy.js`와 completion-intent tests를 조정해 검증된 `adapter_regression -> deploy_failed`만 기존 bounded linked repair 경로에 넣는다. pointer/helper/runtime/ambiguous/invalid record와 legacy `deploy_base_not_synced`/`checkout_dirty`는 repair session을 만들지 않으며 기존 총 2회 budget을 유지한다.
4. dotfiles 선행 설치 readback을 다시 확인한 뒤 `docs/agents/repo-ops.toml`의 `[deploy]`를 `adapter = "managed"`, `cmd = ["scripts/managed-self-deploy.js"]`, `timeout_ms = 600000`으로 전환하고 `detached`를 제거한다. pinned-base declaration parsing, managed containment, candidate-local 실행 tests를 함께 갱신한다.

**Phase verification:** deployment-reconciler, queue-store, pr-actions, completion-intent/repair-policy, repo-ops, Worker/Monitor focused tests에서 failure mapping·기존 budget·restart stage·정확한 retry 문구·managed declaration pinning을 검증한다.

## Phase 5: Crash matrix 통합, 생성물, delivery 준비

1. real-git + fake `bdui-shared`/project-manager fixture를 확장해 helper spawn 전, spawn 후/prerecord 전, prerecord 후/commit 전, commit/restart 후/receipt rename 전 crash를 주입한다. 앞의 세 window는 restart 0회와 같은 attempt의 bounded retry로 수렴해야 하고, post-commit window는 새 server startup reconcile이 exact runtime identity로 receipt와 cleanup을 정확히 한 번 완료하거나 effect를 증명하지 못할 때만 `restart_effect_ambiguous`로 끝나야 한다.
2. fixture 시작과 종료에 dirty/feature shared checkout의 HEAD와 porcelain snapshot을 비교하고, candidate release HEAD, pointer target, runtime marker와 live `/healthz`의 `runtime`, receipt digest, retry count, close 호출 횟수를 readback한다. release GC·rollback·shared checkout 복구는 구현하지 않는다.
3. focused tests가 green인 상태에서 `npm run tsc`, `npm run lint`, `npm run prettier:write`, `npm test`, `npm run build`, `npm run all`, `git diff --check`를 실행한다. frontend source 변경으로 생성된 `app/main.bundle.js`와 `app/main.bundle.js.map`을 포함하고, root가 전체 `git status`/diff와 verification evidence를 검토한 뒤 implementation gate와 PR Delivery로 넘긴다.

**Phase verification:** real-git/fake restart integration과 전체 Pre-Handoff bundle이 모두 green이고 generated bundle이 source와 일치해야 한다.

## Test scope

- **Phase 1 RED→GREEN:** Worker/Board render와 WS public route에서 diagnosis surface가 사라지고 `[정리]`가 실제 `retryCleanup`을 호출한다. raw legacy queue load/save는 diagnosis fields를 보존한다. `running`/`paused` legacy attempt는 일치하는 process 또는 session이 있으면 자연 정산하고, 둘 다 없는 orphan만 retry/resume/repair를 0회 호출한다.
- **Phase 2 RED→GREEN:** invalid binding은 pointer·journal·receipt를 바꾸지 않는다. exact lockfile install과 `prepared` journal/token readback 뒤에만 pointer가 전진한다. helper prerecord→commit→launch 순서, pre-commit crash의 restart 0회, post-commit exact recovery 또는 ambiguity가 추가 restart 없이 유지된다.
- **Phase 3 RED→GREEN:** startup이 nonterminal same-attempt reconcile을 재개하고 exact protocol/marker/live runtime identity만 receipt를 완성한다. protocol mismatch, old SHA, stale marker, PID/start/instance/path/host/port mismatch, health red, receipt rename crash는 각각 거부 또는 receipt-only recovery로 수렴한다.
- **Phase 4 RED→GREEN:** bound `adapter_regression`만 `deploy_failed` repair ownership을 얻고 retryable pointer/helper code는 기존 attempt budget만 소비한다. terminal/invalid failure record는 정확한 evidence로 fail closed하며 UI retry 문구는 durable count와 일치한다.
- **Phase 5 integration:** 네 pre/post-commit crash window를 구분하고 duplicate restart/receipt/close 방지, exact candidate readback, dirty shared checkout 불변을 한 fixture에서 검증한다.
- **Existing green regression:** 기존 `deploy_failed` linked repair cap과 legacy workspace `deploy_base_not_synced`/`checkout_dirty` guard를 유지한다.
- **Exclusions:** shared checkout stash/reset/clean/checkout/commit, dotfiles·External/beads 수정, credentials/외부 서비스 수리, release GC, rollback UI, 테스트 약화·삭제·skip은 허용하지 않는다.

## Delivery and live verification

- implementation gate 뒤 feature branch를 push하고 writable fork `origin`의 `nakkulla/beads-ui`를 base로 PR Delivery에서 멈춘다. GitHub checks가 없으면 저장소 계약대로 vacuous pass로 보고하되 로컬 Pre-Handoff 결과를 PR evidence로 사용한다.
- merge 후에는 candidate-owned managed Adapter가 pointer와 `bdui-shared restart` handoff를 수행하게 하고, main checkout에서 임의로 pointer를 되돌리거나 shared checkout을 정리하지 않는다. GitHub에서 직접 merge되어 자동 cleanup이 시작되지 않으면 beads-ui의 `[정리]`를 단일 trigger로 사용한다.
- 완료 선언 전 실제 process module path가 exact managed release인지, runtime marker와 `/healthz` 응답의 `runtime`에서 protocol/PID/start/instance/source SHA/host/port가 일치하는지, listening port와 HTTP 200, deploy receipt digest, `UI-ckgr`와 phase children의 `closed`, shared checkout HEAD/status 불변을 모두 readback한다. 실패하면 journal·launchd/project-manager log·pointer target을 보존하고 명시 승인 없는 rollback은 하지 않는다.
