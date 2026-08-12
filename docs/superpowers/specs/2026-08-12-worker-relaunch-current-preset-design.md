# UI-lbqw: Worker relaunch 현재 preset 적용 및 실행 tuple 표시 설계

- 날짜: 2026-08-12
- 저장소: `beads-ui`
- route: `spec_backed`
- 대체하는 기존 조항: `docs/superpowers/specs/2026-08-11-codex-worker-fast-effort-design.md`의 “resume/conflict/disposition relaunch는 prior tuple을 verbatim 상속한다” 규칙

## 배경과 목적

Worker의 최초 dispatch는 Bead metadata와 workspace default preset을 합쳐 immutable attempt snapshot을 만든다. 그러나 paused/failed/orphaned attempt의 `이어하기`, 내부 PR 충돌 해소, REVISE disposition처럼 기존 attempt에서 이어지는 경로는 현재 설정을 다시 읽지 않고 이전 attempt의 `runner/model/effort/speed`와 preset provenance를 그대로 복사한다.

그 결과 사용자가 이슈에 `코덱스` preset을 적용해 `sol/xhigh/Standard`로 바꿔도, `이어하기`는 이전 `sol/ultra/Fast`로 실행된다. Codex adapter는 `codex exec resume`에도 model, reasoning effort, service tier override를 전달할 수 있으므로 같은 Codex session을 유지하면서 이 tuple을 바꿀 수 있지만, scheduler가 그 입력을 제공하지 않는다.

목적은 다음과 같다.

1. 기존 worktree를 잇는 모든 attempt-derived relaunch가 실행 직전의 현재 Bead/workspace 설정을 일반 dispatch와 동일하게 해석한다.
2. runner가 같으면 기존 provider session을 유지하면서 model, effort, speed를 현재 값으로 바꾼다.
3. runner가 다르면 임의 fallback 없이 사용자가 기존 session 유지 또는 현재 preset의 새 session을 선택한다.
4. 진행 카드와 상세 세션 이력이 각 attempt에 실제 적용된 effort와 Fast service tier를 보여준다.

## 확정된 결정

1. 별도 상시 `현재 preset으로 이어하기` 버튼은 만들지 않는다. 기존 `이어하기`와 relaunch action이 기본적으로 현재 effective 설정을 사용한다.
2. 현재 effective 설정의 precedence와 validation은 일반 dispatch와 같다: Bead metadata > 선택된 workspace default preset > final fallback.
3. 이 규칙은 수동 resume뿐 아니라 내부 PR conflict resolution, REVISE disposition, resume 실패 대체 session 등 기존 attempt에서 파생되는 모든 relaunch에 적용한다.
4. prior attempt record는 불변이다. preset 적용이나 relaunch가 기존 snapshot을 수정하지 않는다.
5. 같은 runner의 `auto` relaunch는 기존 session ID를 사용하고 현재 model/effort/speed를 adapter에 전달한다.
6. runner가 다르면 첫 state change 전에 `runner_mismatch`로 멈추고 `prior_session`, `fresh_current`, 취소 중 사용자가 결정한다.
7. background relaunch는 runner 불일치에서 어느 쪽도 자동 선택하지 않는다. affected card에 action-required 상태를 남기고 다음 사용자 action이 같은 선택 dialog를 연다.
8. 실행 tuple 표시는 실제 attempt snapshot만 사용한다. 현재 preset을 과거 attempt의 표시값처럼 투영하지 않는다.
9. speed는 사용자-facing `Standard|Fast` vocabulary를 유지한다. 카드에서는 `fast`일 때만 `Fast`를 표시하고 `default`는 생략한다. Bead priority와 Codex provider 내부 `priority` 필드는 새로 저장하지 않는다.

## 현재 설정 snapshot

Scheduler는 relaunch의 첫 state change 전에 Bead snapshot을 읽고 `execPresetCoordinator.resolveForDispatch(workspace, bead_snapshot)`와 같은 resolver를 호출한다. UI가 model/effort/speed 값을 계산하거나 payload에 복사하지 않는다.

Resolver 결과는 한 relaunch 동안 immutable하다.

```text
Bead metadata + selected workspace default preset
  -> resolveExecSettings()
  -> { preset_id, preset_revision, exec, exec_values }
  -> runner compatibility decision
  -> child attempt prerecord + metadata stamp + launch
```

다음 오류는 hook 설치, claim, ancestor settlement, child attempt 생성, metadata stamp보다 먼저 반환한다.

- `bd_snapshot_failed`
- `default_exec_preset_resolution_unavailable`
- `default_exec_preset_resolution_failed`
- `default_exec_preset_missing`
- `default_exec_preset_incompatible`
- existing model/effort/speed validation reason
- `runner_mismatch`

현재 resolver가 선택한 `exec.stamped_keys`와 12-key `exec_values`가 child attempt와 cleanup authority가 된다. prior attempt의 stamp 목록이나 preset revision은 새 child에 복사하지 않는다. 명시적으로 이슈에 적용된 preset 값은 Bead metadata에서 이기고, workspace default는 비어 있는 key만 채운다.

## Continuation decision

공용 decision enum은 다음 세 값이다.

```text
auto
prior_session
fresh_current
```

`auto`가 모든 기존 UI action의 기본값이다.

### runner가 같은 경우

- `auto`는 현재 effective tuple을 사용한다.
- 기존 `session_id`를 `resume_session_id`로 전달한다.
- Codex는 `codex exec resume <session_id> --json -m <current-model> -c model_reasoning_effort=<current-effort> -c service_tier="<current-speed>"` 형태로 실행한다.
- 새 child attempt의 `continuation_mode`는 `session`이다.

### runner가 다른 경우

`auto`는 다음 structured mismatch를 반환하고 아무 state도 변경하지 않는다.

```js
{
  reason: 'runner_mismatch',
  continuation_required: true,
  prior: { runner, model, effort, speed },
  current: { runner, model, effort, speed }
}
```

사용자 dialog는 다음 선택을 제공한다.

- `기존 session 이어하기`: `prior_session`으로 재요청한다. prior attempt tuple과 session ID를 사용한다.
- `현재 preset으로 새 session`: `fresh_current`로 재요청한다. 현재 effective tuple을 사용하고 `resume_session_id=null`로 같은 worktree에서 새 provider session을 시작한다.
- `취소`: 요청을 보내지 않는다.

`prior_session`은 prior runner가 현재 catalog에서 사용 가능하고 session ID가 있을 때만 허용한다. `fresh_current`는 현재 tuple validation을 다시 통과해야 한다. 두 재요청 모두 CAS revision과 source attempt identity를 다시 확인하며, 그 사이 설정이나 queue revision이 바뀌면 stale decision을 실행하지 않고 최신 상태로 다시 판단한다.

사용자 request/response가 직접 존재하는 manual resume와 REVISE disposition은 mismatch response를 받은 자리에서 dialog를 연다. Merge queue 같은 background relaunch는 terminal failure에 위 mismatch descriptor를 보존하고 affected PR card를 action-required로 표시한다. 그 카드의 다음 진행 action은 먼저 dialog를 열고 선택된 decision을 queue item에 고정한 뒤 다시 dispatch한다. Background path가 `prior_session` 또는 `fresh_current`를 추측해서는 안 된다.

## Relaunch 범위

현재 설정 resolution은 구현 함수 이름이 아니라 의미 경계에 적용한다.

- paused/failed/orphaned attempt의 수동 `이어하기`
- 기존 attempt/session을 되살리는 내부 PR conflict resolution
- merge queue가 dispatch하는 internal conflict resolver
- REVISE `finding 수용·수정` disposition
- failed `--resume` disposition의 fresh substitute
- 기존 attempt/worktree를 source로 삼아 session을 resume하거나 대체하는 다른 recovery path

External PR conflict처럼 source attempt/session 없이 fresh launch하는 경로는 이미 현재 Bead/default를 해석하며, 동일 resolver/provenance 규칙을 유지한다. 새 worktree를 만드는 ordinary dispatch와 completion repair의 별도 fresh-dispatch admission은 이 spec이 relaunch로 재분류하지 않는다.

## Attempt lineage와 persistence

새 child attempt는 다음을 기록한다.

- 실제 launch의 `runner`, `model`, `effort`, `speed`
- 현재 resolution의 `exec_default_preset_id`, `exec_default_preset_revision`
- 현재 resolution의 `exec_stamped_keys`, 12-key `exec_values`
- source attempt의 `resumed_from`
- `continuation_mode='session'|'worktree'`

`resumed_from`은 attempt lineage를 뜻하며 provider transcript continuation을 보장하지 않는다. `continuation_mode='session'`만 같은 provider session ID를 재사용했음을 뜻한다. `continuation_mode='worktree'`는 source worktree와 작업 상태만 이어받고 새 session을 시작했음을 뜻한다.

Legacy child에 `continuation_mode`가 없으면 UI는 `이전 attempt에서 이어받음`처럼 중립적으로 표시한다. 기존처럼 무조건 `이어받은 세션`이라고 단정하지 않는다.

Source attempt의 repo, target base, base OID, conflict/disposition/external lineage와 base-drift guard 의미는 계속 상속한다. 실행 설정과 그 stamp/provenance만 current resolution 또는 사용자가 명시한 `prior_session` decision에 따라 선택한다.

## Protocol과 UI

Attempt-derived relaunch request는 optional `continuation`을 받는다. 부재는 `auto`와 같다.

```text
worker-attempt-resume { attempt_id, expected_revision, continuation? }
worker-revise-fix     { bead_id, expected_revision, continuation? }
merge/conflict action 또는 durable queue item { ..., continuation? }
```

공용 server reply/result는 success 필드와 별개로 optional `continuation_mismatch`를 운반한다. Descriptor에는 prior/current tuple만 포함하고 prompt, session transcript, filesystem path 같은 민감하거나 큰 필드는 넣지 않는다.

Dialog는 runner mismatch에서만 나타난다. 같은 runner의 model/effort/speed 변경에는 질문 없이 기존 action이 곧바로 진행된다. CAS conflict는 기존처럼 authoritative queue를 adopt하고 한 번 재시도하되, 사용자가 고른 continuation decision을 유지한다. 재시도 결과가 새로운 mismatch라면 오래된 선택을 실행하지 않고 dialog 내용을 갱신한다.

## 실행 tuple 표시

진행·실패·일시정지 카드와 이슈 상세의 세션 이력은 공용 formatter로 attempt tuple을 만든다.

```js
[runner, model, effort, speed === 'fast' ? 'Fast' : null]
  .filter(Boolean)
  .join(' · ')
```

예시:

- `codex · sol · xhigh`
- `codex · sol · ultra · Fast`
- effort가 없는 legacy attempt: `codex · sol`
- model도 없는 legacy attempt: `codex`

`speed='default'`, null, unknown legacy 값은 카드에 별도 label을 만들지 않는다. Unknown 값은 adapter/validation 문제이지 UI가 `Fast`로 추정할 근거가 아니다.

Lineage tooltip은 `continuation_mode`에 따라 구분한다.

- `session`: `session 이어받음 (from <attempt>)`
- `worktree`: `worktree 이어받음 · 새 session (from <attempt>)`
- legacy absent: `이전 attempt에서 이어받음 (from <attempt>)`

## 오류 처리와 안전성

- Current preset이 삭제되거나 비호환이면 prior snapshot으로 조용히 fallback하지 않는다.
- Runner mismatch decision은 source attempt를 spent 처리하기 전에 끝난다. 취소 또는 거부 후 원 attempt는 다시 선택할 수 있다.
- `prior_session` 선택은 사용자가 runner 불일치에서 명시적으로 과거 tuple을 승인한 경우에만 prior snapshot을 사용한다.
- `fresh_current`는 worktree를 재생성하거나 삭제하지 않는다.
- Adapter spawn failure는 기존 rollback 경로대로 current stamps와 workflow mode를 되돌리고 child attempt를 failed로 기록한다.
- Background relaunch mismatch는 merge/disposition을 성공처럼 표시하지 않으며, action-required 상태가 restart 후에도 남는다.
- Existing `already_resumed`, `bead_running`, `worktree_missing`, base landing, guard hook, admission, CAS 규칙은 유지한다.

## PR Delivery와 managed deploy

Frontend source 변경은 같은 implementation PR에 `app/main.bundle.js`와 `app/main.bundle.js.map`을 포함한다. `implementation` gate와 pre-handoff verification이 끝나면 이 session은 PR Delivery에서 멈추며, merge와 post-merge runtime 적용은 기존 beads-ui finish lane이 소유한다.

`docs/agents/repo-ops.toml`의 `[deploy]`는 `adapter="managed"`, `cmd=["scripts/managed-self-deploy.js"]`로 선언돼 있다. 이 declaration이 exact verified candidate release에서 dependency install, attempt-bound journal, atomic runtime pointer cutover, restart handoff, process source/SHA/health readback을 운반하므로 이 Bead에는 required no-PR residue가 없고 `worker-ineligible`을 붙이지 않는다.

Apply order와 interruption recovery는 기존 managed Adapter protocol을 그대로 사용한다.

1. pinned candidate와 release containment, clean tracked state를 검증한다.
2. candidate lockfile 기준 runtime dependency를 설치하고 marker를 readback한다.
3. restart effect 전에 attempt-bound journal을 durable하게 기록한다.
4. runtime pointer를 exact candidate로 atomic cutover한다.
5. helper가 restart identity/effect를 선기록한 뒤 `bdui-shared restart`를 실행한다.
6. 새 process의 source path, HEAD, PID/start identity, port, HTTP health가 candidate와 일치할 때만 terminal receipt를 기록한다.

중단 시 journal stage와 exact runtime identity로 이어받고, restart effect가 ambiguous하면 두 번째 restart를 추측 실행하지 않고 terminal evidence로 멈춘다. 이 spec은 managed Adapter나 deploy declaration 자체를 변경하지 않으며 기존 coverage를 소비한다.

## 수용 기준

- 이슈에 `sol/xhigh/Standard` preset을 적용한 뒤 이전 `sol/ultra/Fast` Codex attempt를 이어하면 같은 worktree와 session ID를 사용하면서 새 argv와 child snapshot은 `sol/xhigh/default`다.
- 같은 runner에서 model, effort, speed 중 일부만 바뀌어도 dialog 없이 현재 effective tuple로 resume한다.
- Codex attempt에 Claude preset을 적용하면 첫 요청은 무변경 `runner_mismatch`를 반환한다.
- mismatch dialog의 `기존 session 이어하기`는 prior tuple/session을, `현재 preset으로 새 session`은 current tuple/같은 worktree/새 session을 사용하며 취소는 무변경이다.
- Internal PR conflict resolution과 REVISE disposition도 같은 current-resolution 및 mismatch 규칙을 사용한다.
- Background conflict resolver의 mismatch는 durable action-required 상태로 남고 사용자 decision 전에는 session을 띄우지 않는다.
- Prior attempt snapshot은 preset 적용과 relaunch 전후에 byte-for-byte 의미상 불변이다.
- Child attempt는 실제 tuple, current preset provenance/stamps, `resumed_from`, `continuation_mode`를 restart 후에도 보존한다.
- 진행·실패·일시정지 카드와 세션 이력이 effort를 표시하고 Fast attempt에만 `Fast`를 추가한다.
- Legacy attempt의 누락 field는 빈 separator나 잘못된 session-continuation 단정을 만들지 않는다.
- Implementation PR이 source와 generated frontend bundle을 함께 운반하고, merged candidate는 선언된 managed deploy의 ordered readback을 통과해야 close할 수 있다.

## 비-목표

- Existing attempt snapshot 직접 편집
- 별도 상시 `현재 preset으로 이어하기` 버튼
- Cross-provider transcript 변환 또는 session ID 이식
- Bead priority 표시나 변경
- Codex provider 내부 `priority`/usage service-tier receipt 저장
- `workflow_mode=fast_track`, implementation/review 모델 선택 계약 변경
- `orchestration_speed` vocabulary 또는 runner catalog capability 변경
- 과거 attempt 표시를 현재 preset 값으로 덮어쓰기

## Test scope

다음 seam은 구현 전 실패하는 RED→GREEN 대상이다.

1. **Current-resolution scheduler seam**: prior snapshot과 다른 current model/effort/speed를 가진 같은-runner Bead를 resume/conflict/disposition할 때 current tuple, current preset revision, current 12-key `exec_values`와 stamps가 child/runner에 도달한다. Prior attempt는 변하지 않는다.
2. **Mismatch state seam**: `auto`의 cross-runner mismatch가 hook/claim/ancestor settlement/child prerecord/metadata stamp/spawn 없이 structured descriptor를 반환한다. `prior_session`, `fresh_current`, 취소/CAS drift를 각각 검증한다.
3. **Relaunch caller seam**: manual resume, internal conflict resolver, merge-queue background resolver, REVISE disposition, failed-resume substitute가 공용 decision/resolution 경계를 우회하지 않는다. External fresh conflict launch 회귀도 확인한다.
4. **Persistence seam**: `continuation_mode`, current preset provenance, current exec snapshot, background mismatch action-required descriptor가 queue persistence와 restart normalize를 왕복한다. Legacy missing field는 허용한다.
5. **Protocol seam**: resume/disposition/conflict payload가 optional continuation을 검증하고 structured mismatch를 손실 없이 전달한다. Unknown continuation은 `bad_request`; stale revision은 무변경 conflict다.
6. **Codex adapter seam**: 같은 session ID에 다른 model/effort/default|fast를 준 resume argv가 정확히 생성된다. Claude/Codex cross-runner ID를 adapter에 전달하지 않는다.
7. **Mismatch UI seam**: 직접 action의 mismatch dialog 세 선택, background action-required card의 재진입, CAS retry 시 decision 유지와 새 mismatch 갱신을 검증한다. 같은-runner 변경에는 dialog가 없어야 한다.
8. **Tuple UI seam**: running/paused/failed tile과 session history가 `runner · model · effort`를 표시하고 `speed=fast`일 때만 `Fast`를 덧붙인다. Legacy null/default/unknown에는 빈 separator나 Fast label이 없다.
9. **Regression seam**: `already_resumed`, admission, base-drift, guard-hook rollback, discard, merge queue ordering, disposition completion, attempt usage/session drawer가 기존 동작을 유지한다.
10. **Deploy continuity seam**: implementation은 기존 managed `[deploy]` declaration을 변경하지 않으며, finish 시 candidate install → journal → pointer → restart handoff → exact runtime readback 순서와 terminal receipt가 이 변경에도 계속 적용된다.

Pre-handoff verification은 `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`, `npm run build`를 수행한다. Frontend source 변경으로 생성되는 `app/main.bundle.js`와 source map을 implementation commit에 포함한다.
