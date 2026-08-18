# 이슈 상세 구현·리뷰 위임 세션 라이브 모니터 설계

- Bead: `UI-c00b`
- Route: `spec_backed`
- Producer dependency: `dotfiles-y1rk`
- Producer contract: dotfiles
  `docs/superpowers/specs/2026-08-18-codex-delegation-monitor-stream-design.md`

## 요약

이슈 상세의 기존 `세션 이력`에서 outer Worker attempt 아래 표시되는
`implementation`과 `review-consult` Codex 위임 행만 라이브 세션으로 확장한다.
행을 누르면 기존 transcript drawer가 해당 위임의 최상위 Codex thread stream을
snapshot + live follow로 보여 준다.

범용 subagent tree는 만들지 않는다. Claude/Codex 내부의 `Explore`, collection,
native child thread와 기타 도구 호출은 별도 행이나 transcript 대상이 아니다.
main attempt 행과 기존 token 집계는 그대로 유지한다.

## 사용자 승인 범위

- 위치는 새 Monitor 탭이나 새 panel이 아니라 현재 `세션 이력`뿐이다.
- 대상 role은 existing `implementation|review-consult` 두 개뿐이다.
- 실행 중 상태와 개별 transcript를 볼 수 있어야 한다.
- `Explore`처럼 빈번한 내부 subagent는 수집·표시하지 않는다.
- 기존 usage receipt 행의 visual vocabulary와 transcript drawer를 재사용한다.
- 과거 monitor stream이 없는 행은 현재처럼 정적으로 남는다.

## 확인된 현재 동작

- outer attempt 행 클릭은 `attempt_id` 하나로
  `subscribe-session-log`를 호출하고 per-attempt runner JSONL을 drawer에 표시한다.
- nested Codex usage는 terminal `codex-usage-receipt-v1`이 도착한 뒤
  `Attempt.usage_legs`에 저장된다.
- `session-history.js`는 terminal usage leg만
  `implementation|review-consult` 행으로 렌더한다.
- usage leg에는 `receipt_id`, role, model, `session_id`, `turn_id`, usage,
  `completed_at`이 있지만 실행 시작/진행 event는 없다.
- Codex review task는 ephemeral일 수 있어 terminal `session_id`만으로 나중에
  별도 App Server에서 transcript를 복원한다고 가정할 수 없다.
- dotfiles의 current bridge는 이미 App Server notification을 관측하므로 transport
  교체 없이 producer stream을 추가할 수 있다.

## 목표

- running outer attempt에서 시작한 두 role의 위임 행을 terminal usage 전에 표시한다.
- 각 행에 상태, provider/model, short session ID, 최근 활동, optional token을 표시한다.
- 행 클릭으로 해당 `attempt_id + launch_id` transcript를 기존 drawer에서 연다.
- snapshot, live append, 서버 재시작 후 reattach를 지원한다.
- terminal monitor summary를 Attempt에 durable하게 남겨 이슈 이력에서 다시 열 수 있게 한다.
- terminal usage receipt를 `launch_id/receipt_id`로 같은 행에 합친다.
- missing/legacy/corrupt producer data는 fail-quiet하게 생략한다.

## 비목표

- main attempt transcript 안에서 모든 subagent를 추론하지 않는다.
- `parent_tool_use_id`, Codex local session directory 또는 transcript text를
  휴리스틱하게 스캔하지 않는다.
- App Server broker socket에 직접 접속하지 않는다.
- child thread tree, parallel agent dashboard, `Explore` row를 만들지 않는다.
- live token delta나 Codex cost를 계산하지 않는다.
- workflow metadata/label/role vocabulary를 추가하지 않는다.
- 기존 session history를 backfill하지 않는다.
- Worker queue에서 위임을 별도 attempt로 승격하지 않는다.

## 결정

### 1. 소유권과 repository unit

두 repository unit은 독립 lifecycle을 가진다.

1. `dotfiles-y1rk`: `codex-delegation-monitor-v1` producer와 runtime install
2. `UI-c00b`: attempt binding, consumer, WS, drawer/UI와 shared service deploy

`UI-c00b`는 `dotfiles-y1rk`에 blocks dependency를 가진다. consumer 구현은
reviewed producer schema와 landed/runtime-available producer를 입력으로 사용한다.
이 기능은 existing role을 소비하므로 dotfiles
`docs/contracts/workflow.{md,yaml}`에는 새 key나 enum을 추가하지 않는다.

### 2. Attempt-scoped monitor directory

state owner는 beads-ui다. scheduler가 attempt launch 전에 다음 private directory를
만든다.

```text
$XDG_STATE_HOME/bdui/<workspace-slug>/delegation-monitors/<attempt_id>/
```

directory는 deterministic, current-user-owned, non-symlink `0700`이다.
runner environment에는 existing `BDUI_ATTEMPT_ID`와 새
`BDUI_CODEX_DELEGATION_MONITOR_DIR`를 함께 넣는다. producer가 받은 path는 delivery
input일 뿐이며 consumer는 매번 workspace + attempt identity로 path를 다시 계산한다.

usage receipt directory와 분리해 terminal receipt scanner의 exact-schema 및 cleanup
의미를 바꾸지 않는다. v1은 독립 시간 GC를 추가하지 않고 main session log와 같은
Attempt history 수명을 따른다. exact attempt discard/removal 경로가 있는 경우에만
해당 attempt monitor directory를 함께 제거한다.

### 3. Consumer validation과 projection

reader는 producer contract의 `codex-delegation-monitor-v1`만 받는다.

- directory/file owner, mode, regular-file, non-symlink, containment 확인
- filename launch ID와 각 line의 `launch_id` 일치
- outer `attempt_id`, provider `codex`, role, model, root thread identity 일치
- first complete line은 `session.started`
- root turn 시작 뒤 `turn_id` 불변
- known event variant와 bounded activity/error enum만 수용
- malformed line은 생략하고 trailing partial line은 다음 append까지 보류
- identity conflict가 난 stream 전체는 UI projection에서 생략

running attempt는 stream directory discovery와 incremental tail을 통해 in-memory
overlay를 만든다. append마다 해당 delegation log subscriber에 event를 publish하고,
queue changed fanout은 existing 3초 coalescing을 재사용한다.

outer attempt finalization은 마지막 complete-line boundary까지 scan한 뒤 normalized
summary를 queue Attempt에 persist한다. restart reconcile도 running attempt의 기존
stream을 같은 reader/tail path에 다시 붙인다. terminal line 없이 outer attempt가
terminal이면 summary status를 `interrupted`로 고정한다.

### 4. Durable Attempt summary

optional `Attempt.delegation_sessions`를 추가한다.

```js
delegation_sessions: [
  {
    launch_id: '...',
    provider: 'codex',
    role: 'implementation',
    model: 'gpt-5.6-sol',
    session_id: '<root-thread-id>',
    turn_id: '<root-turn-id|null>',
    status: 'running|done|failed|interrupted',
    started_at: 1787027220000,
    completed_at: '2026-08-18T04:27:00.000Z|null',
    last_event_at: 1787027245000
  }
]
```

durable normalization은 `launch_id`로 dedupe하고 first valid identity를
authoritative하게 유지한다. live `running` status와 `last_event_at`은 snapshot
overlay로 갱신하고 terminal scan 때 최종값을 persist한다. prompt, transcript body,
path는 queue/Monitor snapshot에 넣지 않는다.

existing `usage_legs`는 변경하지 않는다. UI projection은
`delegation_session.launch_id === usage_leg.receipt_id`이고 role/model/session identity가
일치할 때 token과 completed time을 같은 row에 붙인다. identity conflict에서는 monitor
stream을 생략하고 기존 static usage row를 유지한다. usage-only legacy leg도 계속
렌더한다.

### 5. Session-log subscription 확장

existing channel을 backward-compatible하게 확장한다.

- main: `subscribe-session-log { id, attempt_id }`
- delegation:
  `subscribe-session-log { id, attempt_id, launch_id }`

server는 connection workspace의 Attempt와 normalized delegation summary를 먼저
확인한 뒤 exact path를 계산한다. 임의 launch ID나 다른 workspace의 path는 empty/missing
응답이며 filesystem probing 결과를 노출하지 않는다.

snapshot/append는 request의 `id`, `attempt_id`, optional `launch_id`를 되돌려 준다.
client `session-log-store`와 drawer는 subscription ID를 record key로 사용해 같은
attempt의 main/delegation log가 충돌하지 않게 한다. `launch_id`가 없는 existing
호출과 main drawer 동작은 그대로 유지한다.

delegation stream은 producer의 normalized event를 기존 transcript display line으로
투영한다.

- agent message → 기존 message/result typography
- reasoning summary → 기존 thinking block
- coarse activity → 내용 없는 진행 activity
- root turn terminal → DONE/error terminal line

child/Explore row나 child transcript navigation은 없다.

### 6. 세션 이력 UI

outer attempt 아래 row source를 다음 순서로 합친다.

1. validated `delegation_sessions`
2. 같은 launch ID의 optional `usage_legs`
3. monitor가 없는 legacy usage legs

role order는 existing `implementation`, `review-consult`를 유지하고 같은 role
안에서는 launch 시작 순서를 유지한다. 각 row는 기존 metadata와 token vocabulary를
재사용한다.

- `●` 실행 중
- `✓` 완료
- `✗` 실패
- `⚠` 중단
- role, `codex · model`, short session ID
- running: 최근 활동 시각
- terminal usage 있음: completed time + Codex token badge

validated monitor가 있는 row만 button으로 렌더하고 click 시 drawer를 연다.
legacy/static row는 현재 markup과 정보 표시를 유지한다. 새 panel, tree, filter,
expand-all control은 만들지 않는다.

drawer header는 main attempt ID 대신 role, short session ID, model을 표시하되 body,
follow toggle, heartbeat, close interaction은 재사용한다. main attempt row click과
`↻ 이어하기`, `τ 자세히` 동작은 변하지 않는다.

## 오류·호환 처리

- producer env/schema 없음: 기존 session history만 표시
- monitor directory/file 없음: row static 또는 생략, outer attempt 영향 없음
- invalid owner/mode/symlink/containment: stream reject, redacted reason만 server log
- malformed identity/event: stream 전체 또는 해당 line fail-quiet
- trailing partial: snapshot에서 제외, append 완료 뒤 수용
- writer crash/no terminal: outer terminal과 결합해 `interrupted`
- usage receipt 지연: live row 유지, receipt 도착 시 token만 갱신
- usage receipt 없음: transcript/status 유지, token 없음
- monitor/receipt identity conflict: monitor 생략, existing usage row 보존
- restart 중 running stream: complete-line boundary부터 tail reattach
- old client/server: optional field 부재로 main channel 완전 호환
- unauthorized workspace/attempt/launch: missing response, path/error detail 비노출

## 개인정보·성능

- transcript body는 owner-private JSONL과 현재 workspace-scoped WS에서만 흐른다.
- queue/Monitor snapshot에는 identity/status/time만 싣고 본문을 싣지 않는다.
- server log에는 agent message, reasoning, command, output, path를 출력하지 않는다.
- running attempt만 directory discovery polling 대상이며, terminal history는 durable
  summary의 exact launch file만 연다.
- 내부 child thread를 버리므로 `Explore` 호출 수가 row 수, snapshot 크기, tailer 수를
  늘리지 않는다.
- 한 drawer가 한 subscription만 유지하는 existing UX를 보존한다.

## Test scope

### State path·schema

- attempt ID path escape sanitize/containment
- monitor directory `0700`, file `0600`, symlink/owner/mode reject
- complete-line parsing, trailing partial 보류, launch/attempt/thread identity conflict reject
- `delegation_sessions` normalize/dedupe/persist/cold reload

### Live ingest·restart

- running stream discovery 후 snapshot + append
- root activity가 delegation `last_event_at`과 queue fanout을 갱신
- outer completion final scan과 terminal summary persistence
- terminal 없는 stream의 `interrupted` 판정
- restart boundary 뒤 event 누락/중복 없는 reattach
- usage receipt와 launch ID merge, delayed receipt 갱신

### WS·client store

- main payload backward compatibility
- delegation `attempt_id + launch_id` validation
- cross-workspace/unknown launch fail-quiet
- subscription ID별 main/delegation buffer 격리
- close/reopen/unsubscribe가 prior listener를 남기지 않음

### UI

- running/done/failed/interrupted glyph와 metadata
- monitor row click이 exact delegation subscription을 열음
- main attempt row click, resume, usage toggle 회귀 없음
- legacy usage-only row는 static으로 유지
- `implementation|review-consult` 외 role과 child/Explore row가 없음
- drawer가 agent message/reasoning/coarse activity/terminal을 렌더
- 좁은 viewport에서 기존 session row wrapping 유지

### Repository validation

- focused Vitest/server tests
- `node --version`과 `package.json#engines` 확인
- `npm ls --depth=0`
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
- `npm run build`
- `app/main.bundle.js`와 `app/main.bundle.js.map` 포함

## 완료 조건

- `dotfiles-y1rk` producer contract가 reviewed·landed·runtime-available하다.
- 새 attempt에서 두 role만 live row와 transcript를 제공한다.
- 내부 `Explore`/child thread는 별도 row나 log subscription을 만들지 않는다.
- restart, terminal usage merge, legacy fail-quiet 테스트가 green이다.
- current spec/implementation review, PR delivery와 shared service deploy/readback을
  각 repository lifecycle에 맞게 완료한다.
