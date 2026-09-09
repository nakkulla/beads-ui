---
scope:
  - server/worker/provider-health.js
  - server/worker/attach.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - app/protocol.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
---

# outage 공급자 보류의 해제 — 무제한 프로브 복귀, 계정 단위 강등, `↻ 지금 프로브`

2026-09-09 · Bead UI-o5ll · route `spec_backed`

2026-09-09 gate-on-card 스펙(§8)은 자기 범위를 이렇게 그었다 — "게이트가 서 있는
동안의 표시와 출구를 정할 뿐 **게이트가 언제 풀리는지는 정하지 않는다**". 이 스펙이
그 미정 부분을 정한다.

## 1. 목표와 사용자 결정 (2026-09-09)

`kind:'outage'` provider target이 한 번 서면 프로브 성공 외에 풀 방법이 없고, 그
프로브마저 상한에 걸려 멎으면 러너 전체가 영구히 막힌다. 이 스펙은 그 생명주기에
출구를 준다.

사용자 결정 넷:

1. **프로브 상한을 없앤다.** §7.3 원안("회복까지 무제한")으로 복귀하고, 비용은
   백오프 상한을 15분에서 1시간으로 늘려 흡수한다. 게이트의 목적은 "실패로 죽이지
   않고 보류"인데 자동으로 게이트를 여는 방식은 그 목적을 깨고 실패 사다리로
   보낸다.
2. **`outage` → `usage_limit` 재분류를 허용한다.** 프로브 실패의 새 분류가
   `usage_limit`이면 서 있는 target의 `kind`를 정정해 계정 단위 게이트로 강등한다.
3. **막힌 행에 해제 조작을 둔다.** 다음 프로브까지 기다리지 않고 사람이 당길 수
   있어야 한다.
4. **그 조작은 프로브를 당길 뿐 target을 지우지 않는다.** 판정자는 여전히
   프로브다.

결정 4는 2026-09-09 gate-on-card 스펙 §4의 기각 항목("공급자 `해제` 조작(target
삭제) — 증거 없는 단언이고, 장애가 진짜면 다음 디스패치들이 연쇄로 보류된다.
사용자 기각")과 충돌하지 않는다. 기각된 것은 **단언**이고 여기서 더하는 것은
**증거 수집을 앞당기는 조작**이다. 크레딧을 채웠으면 프로브가 통과해 풀리고, 안
채웠으면 그대로 막힌다 — 사용자가 틀려도 attempt가 죽지 않는다.

## 2. 확인한 사실 (2026-09-09 실측)

- **승인된 스펙과 코드가 어긋나 있다.** 2026-08-24 provider-outage-hold-resume
  §7.3은 outage 백오프를 "60초 → 2분 → 4분 → 8분 → 15분(상한 고정), 회복까지
  무제한"으로 정했다. `rearm_count` 3회와 24시간 상한은 §7.4의 `usage_limit`
  전용이다. UI-k96h(커밋 `6dc617c`)가 `provider-health.js` `scheduleTarget`의 상한
  분기를 outage target에도 적용해 §7.3을 뒤집었다.
- **스펙 자체에도 막다른 길이 있다.** §7.4는 상한에 걸린 target의 출구를 "§9 수동
  이어하기"라고 적었으나, §9.5는 "`account`가 있는 target은 프로브가 판정할 때까지
  남긴다"고 못박았다. 프로브가 멎은 뒤에는 유일한 판정자가 사라져 그 출구가 닫힌다.
  UI-k96h가 상한을 outage로 넓히면서 이 경로가 실제로 밟혔다.
- **`disarmTarget`은 타이머만 끄고 target을 남긴다.** 함수 doc이 그렇게 적혀 있다
  (`provider-health.js:383` — "leave a capped target durable for manual recovery").
  `sync()`가 다시 `scheduleTarget`을 불러도 age cap 분기(`provider-health.js:450`)에서
  즉시 disarm으로 빠져 타이머가 다시 서지 않는다.
- **target을 제거하는 코드 경로는 하나뿐이다.** `recoverProviderTarget`이고 호출처는
  `provider-health.js:520` 프로브 성공뿐이다. ws 핸들러 전수 확인 결과 수동 해제 op가
  없고, attempt 성공도 `provider_hold`를 건드리지 않는다.
- **outage 게이트는 러너 전체다.** `scheduler.js:2857`의
  `targets.some((target) => target.kind === 'outage')`가 계정 판정 이전에 `true`를
  돌려준다. `usage_limit`은 그 아래에서 계정 단위로 판정된다(§6 rev2).
- **`[지금 시작]`은 그 행 하나만 통과시킨다.** `scheduler.js:7427`
  `start_now_bypass`의 주석이 "skips the provider gate FOR THIS ROW alone"이다.
- **관측된 교착.** `beads-ui` 워크스페이스(target `since` 14:49)와
  `microbiome_bile` 워크스페이스(`since` 09-08 19:14)에 같은 target
  (`kind:'outage'`, `model:'fable'`, `account:'nakkulla2@gmail.com'`,
  `detail:'rate_limited_429'`)이 서서 claude 러너 전체 디스패치를 막았다. 세션이 두
  `queue.json`에서 그 target을 직접 제거하는 운영 조치로 해소했다.
- **재분류가 있었다면 운영 조치가 필요 없었다.** UI-k96h 배포 후 첫 프로브에서
  같은 문구가 `usage_limit`으로 분류되므로, 결정 2만으로 그 target이 계정 단위로
  내려가 다른 계정 후보가 흘렀을 것이다.

## 3. 설계

### 3.1 outage 프로브 상한 제거와 백오프 완화 — `provider-health.js`

`scheduleTarget`의 상한 분기를 `usage_limit` target에만 적용한다. UI-k96h가 넓힌
`now() - since >= HOLD_AGE_CAP_MS` 조건에서 outage를 다시 뺀다:

```js
const capped =
  target.kind === 'usage_limit' &&
  (target.rearm_count >= USAGE_REARM_CAP || now() - since >= HOLD_AGE_CAP_MS);
if (capped) {
  void disarmTarget(workspace, runner, generation, target, …);
  return;
}
```

`disarmTarget`의 `reason` 인자는 `rearm_cap`과 `hold_age_cap` 둘 다 남는다 —
`usage_limit`은 두 상한을 모두 타기 때문이다. 알림 경로
(`providerAutoResumeDisarmed`)와 marker 형식은 그대로다.

`OUTAGE_BACKOFF_MS`에 1시간을 더해 `[60초, 2분, 4분, 8분, 15분, 1시간]`으로 만든다.
마지막 원소가 상한이므로(`Math.min(failures, length - 1)`) 장기 장애의 프로브 빈도가
시간당 1회로 떨어진다. 무제한 프로브의 비용 우려는 여기서 흡수한다.

**`publicProviderHolds`는 고치지 않는다.** `worker-handlers.js`의 outage 분기는
`since + OUTAGE_BACKOFF_MS[0]`만 계산하고 그 값이 과거면 `null`을 돌려주므로,
`provider-health.js`가 타이머 무장 전에 쓴 durable `next_probe_at`이 그대로 통과한다
(첫 프로브 전에만 계산값이 이긴다). 상한이 늘어도 이 경로의 판정은 바뀌지 않는다.

### 3.2 `outage` → `usage_limit` 재분류 — `provider-health.js`

`runTarget`의 프로브 실패 경로에 `usage_limit` 분기의 대칭을 만든다. 지금은
`live_target.kind === 'usage_limit'`일 때만 전이를 판정하고(`:578`), `outage`는
곧장 `scheduleTarget(…, failures + 1)`로 떨어진다.

```js
if (
  live_target.kind === 'outage' &&
  live_target.account !== null &&
  result.outage?.detail === 'usage_limit'
) {
  deps.store.updateProviderTarget(workspace, {
    runner, generation,
    kind: live_target.kind, model: live_target.model, account: live_target.account,
    patch: { kind: 'usage_limit', resets_at: result.outage.resets_at, last_error: result.error }
  });
  sync(workspace);
  return;
}
```

- **승계값**: `rearm_count`는 그대로 둔다. outage 경로는 그 값을 올린 적이 없어
  강등 직후 값은 0이고, 이후 `usage_limit` 재무장이 §7.4대로 올린다. `since`는 hold
  단위 필드이므로 바뀌지 않는다 — 24시간 상한의 기산점은 최초 보류 시각 그대로다.
- **`resets_at`**: 분류기가 준 값을 그대로 싣는다. 없으면 `null`이고 §7.4의 15분
  고정 간격 경로를 탄다.
- **`account === null`인 강등은 일어나지 않는다.** outage target의 `account`는 hold
  진입 시 카탈로그로 고정되거나 `null`이다. `null`인 채 강등되면 §6이 정한
  "프로브도 자동 재개도 하지 않는" fail-closed target이 되어 스스로를 막다른 길에
  넣는다. 따라서 `live_target.account === null`이면 강등하지 않고 outage로 남긴다.
- **관측 가능한 효과**: 게이트 범위가 러너 전체에서 계정 단위로 좁아진다
  (`scheduler.js:2857`의 outage 조기 반환을 더는 타지 않는다). 그 결과 **다른 계정으로
  해석되는 대기 후보의 디스패치가 허용된다** — 그것이 이 전이가 만드는 효과의 전부다.
  §8.3의 자동 계정 전환은 여기서 일어나지 않는다: 그 선택은 보류 진입 시
  `scheduler.js` `holdAttempt`가 `selectProviderSwitchAccount`로 한 번 하고
  (`usage_limit && account !== null` 조건), target의 `kind`를 나중에 고치는 것은 그
  경로를 다시 태우지 않는다.
- `sync(workspace)`가 새 kind로 타이머를 다시 무장한다 — outage 백오프에서
  `usage_limit` 리셋 타이머로 갈아탄다.

기존 `usage_limit` → `outage` 승격(`:596`)은 그대로 둔다. 두 전환이 대칭을 이루고,
분류기가 판정을 바꾸면 target이 따라간다는 하나의 규칙이 된다.

### 3.3 `↻ 지금 프로브` — 서버

**`provider-health.js`에 `probeNow(workspace, runner)`를 export한다.** 그 러너의
서 있는 target 가운데 프로브 대상인 것 전부에 대해, 무장된 타이머를 지우고
`runTarget`을 지금 호출한다. 프로브 대상 판정은 §7.2와 같다 — `usage_limit`이면서
`account === null`인 target만 제외한다(§6 F3, 어느 계정을 찔러야 회복 증거인지 모름).

상한으로 disarm되어 타이머가 없는 `usage_limit` target도 `probeNow`는 발화시킨다.
이것이 §7.4가 적었으나 §9.5가 닫아버린 출구를 실제로 여는 지점이다 — 상한은 자동
프로브를 멈추는 것이지 사람의 요청까지 막는 것이 아니다.

`failures` 카운터는 그 target의 현재 값을 유지한다. 사람이 눌렀다고 백오프가
처음으로 돌아가면 반복 클릭이 프로브 폭주가 된다.

**중복 실행 방지 — `since` CAS로는 막히지 않는다.** 프로브 요청은 `since`를 바꾸지도
보류를 제거하지도 않으므로, 같은 `since`로 두 번째 클릭이 와도 CAS는 통과한다.
`since` CAS의 몫은 **낡은 화면에서 온 요청을 거르는 것**뿐이다(이미 해소됐거나 세대가
바뀐 보류). 동시 실행은 별도 장치가 막는다.

`provider-health.js`에 모듈 스코프 `in_flight` Set을 둔다. 키는 기존
`targetKey(workspace, runner, generation, target)`이다.

- `runTarget`이 `probeTarget` await **전에** 키를 넣고 `finally`에서 뺀다.
- `scheduleTarget`은 `timers.has(key) || in_flight.has(key)`일 때 무장하지 않는다.
- `probeNow`는 `in_flight.has(key)`인 target을 건너뛰고, 실제로 발화시킨 수를
  돌려준다.

이 Set은 **기존 결함도 함께 닫는다.** 지금 타이머 콜백은 `runTarget`을 부르기
**전에** `timers.delete(key)`를 하므로(`provider-health.js:478`) 프로브가 도는 120초
동안 `timers`에 키가 없고, 그 사이 `sync()`가 같은 target에 두 번째 타이머를 무장할 수
있다. `in_flight`는 자동 타이머 경로·`sync()`·수동 요청 셋이 공유하는 하나의 술어다.

- **완료 후 재요청**: 프로브가 끝나고 target이 살아남았으면 키가 빠지므로 다음 클릭은
  즉시 다시 찌른다. 의도된 의미다 — `failures`를 건드리지 않으므로 자동 백오프 일정은
  그대로고, 사람이 누른 만큼만 추가로 찌른다.
- **여러 행 동시 클릭**: 막힌 행마다 버튼이 서므로 두 행을 잇따라 누를 수 있다. 두
  번째 요청은 `in_flight`에 흡수되어 no-op이 된다 — `▶ 재개`가 `since` CAS로 얻는
  것과 같은 멱등성을 프로브는 이 Set으로 얻는다.
- 발화 대상이 0이고 자격 있는 target이 있으면(전부 실행 중) `probe_in_flight`로
  거부한다. 자격 있는 target 자체가 없으면 `probe_ineligible`이다.

**`attach.js`에 `probeProviderNow(workspace_root, input)`를 export한다.**
`retryWorkerQueueHoldNow`와 같은 모양이다:

- `input`은 `{ runner: string, since: number }`.
- `provider_hold[runner]`가 없거나 `since`가 다르면 `{ ok: false, reason: 'hold_changed' }`.
  `▶ 재개`·`↻ 지금 재시도`와 같은 CAS 의미론이고, 중복 클릭이 no-op이 된다.
- 프로브 대상 target이 하나도 없으면 `{ ok: false, reason: 'probe_ineligible' }`.
- 대상은 있으나 전부 실행 중이면 `{ ok: false, reason: 'probe_in_flight' }`.
- 그 외에는 `att.providerHealth.probeNow(workspace, runner)`를 부르고
  `{ ok: true, armed: <발화한 수> }`.

프로브는 120초까지 걸리므로 **응답을 기다리지 않는다.** 핸들러는 무장 사실만 알리고
결과는 기존 경로로 흐른다 — 성공이면 `recoverProviderTarget`과
`providerRecovered` 알림, 실패면 다음 백오프 재무장. 화면은 그 다음 스냅샷에서
바뀐다.

**ws op `worker-provider-probe-now`.** `app/protocol.js`의 `MessageType` typedef와
op 배열, `server/ws/connection.js`의 `case`, `server/ws/worker-handlers.js`의
`handleWorkerProviderProbeNow`에 더한다. payload 검증은 `{ runner: string,
since: number }`이고 응답은 기존 `replyQueueHold`와 같은 모양 — 디코레이트된 큐가
응답에 실려 누른 클라이언트가 readback으로 다시 그리고, fanout이 다른 구독자에게
같은 것을 준다.

### 3.4 `↻ 지금 프로브` — 화면

**게이트 투영(`lane-model.js`) 확장.** 2026-09-09 §3.1의 `gate` 파생값에 두 재료를
더한다. 재료가 없으면 필드 자체가 없는 규칙은 그대로다.

```ts
gate?: {
  …,
  since: number | null,   // systemic/env: queue.hold.since · provider: provider_hold[runner].since
  runner: string | null,  // provider 게이트일 때만 — CAS와 op 인자
  probe_ready: boolean    // provider 게이트일 때만 — 프로브 대상 target이 하나라도 있는가
}
```

`since`에 kind별로 다른 값을 싣는 것은 이미 `next_at`이 쓰는 문법이다(env는
`lineages[].next_at`, outage는 `next_probe_at`, usage는 `resets_at`). `▶ 재개`는
`gate.kind === 'systemic'`인 행에만 그리므로 provider kind에 `since`를 실어도
그 조작의 재료는 바뀌지 않는다.

`probe_ready`는 그 러너의 target 배열을 그대로 읽어 판정한다 — `usage_limit`이면서
`account === null`인 것만 있으면 `false`. 서버의 `probe_ineligible`과 같은 술어이며,
누를 수 없는 버튼을 그리지 않기 위한 것이다.

**조작(`lanes.js` `rowActionsTemplate`).** 대기 행 1번 줄 끝의 순서는
`[▶ 재개] [↻ 지금 프로브] [지금 시작] ↑ ↓ ✕`가 된다. 2026-09-09 §3.3이 정한
"넓은 것(큐 전체) → 좁은 것(이 행) → 자리 조작 → 빼기" 순서에서 `↻ 지금 프로브`는
러너 전체에 대한 조작이므로 `▶ 재개` 다음, `[지금 시작]` 앞이다.

- 표시 조건: `gate.kind`가 `provider_outage` 또는 `provider_usage`이고
  `gate.since !== null && gate.runner !== null && gate.probe_ready`. 하나라도 없으면
  그리지 않는다(fail-quiet).
- 토큰: `op-btn worker-mini__provider-probe`,
  `data-action="provider-probe-now"`, `data-since`, `data-runner`.
- title: `공급자 회복 프로브를 지금 실행합니다 (러너 전체) — 통과하면 보류가 풀립니다`.
- 막힌 행 전부에 그린다. `▶ 재개`와 같은 근거다 — 같은 행동이고 `since` CAS가 두
  번째 클릭을 no-op으로 만든다. "첫 행에만" 같은 선택 규칙은 만들지 않는다.
- 거부 toast: `hold_changed` → "공급자 상태가 바뀌었습니다 — 다시 확인하세요",
  `probe_in_flight` → "프로브가 이미 돌고 있습니다",
  `probe_ineligible` → "지금 찌를 수 있는 대상이 없습니다". 마지막 것은 버튼이 그려진
  뒤 대상이 사라진 경쟁 상태에서만 보인다 — `probe_ready`가 같은 술어로 미리
  거르므로 정상 경로에서는 나오지 않는다. 서버가 판정을 소유하고 화면은 힌트라는
  2026-09-09 §3.1의 fail-quiet 원칙과 같은 배치다.

**Monitor(`app/views/monitor/index.js`).** 같은 렌더러를 공유하므로 버튼은 자동으로
따라온다. Monitor의 전송만 `{ runner, since, root_dir }`로 맞춘다 — 기존
`sendHoldAction`이 `root_dir`를 붙이는 것과 같은 처리다.

### 3.5 슬롯 표·문서 정정 (ADR 0014 절차)

- `2026-08-25-card-header-grammar-unify-design.md` §5.1 정정 문단(UI-o5ll): 1번
  조작(대기 행)에 `↻ 지금 프로브`. 자리의 근거 — "내가 여기서 무엇을 하나"에
  답하므로 1번 조작이고, 러너 전체 조작이므로 `▶ 재개`와 `[지금 시작]` 사이다.
- `2026-09-02-worker-operation-surface-unify-design.md` §3.2 표에 한 행: 대기 행
  `↻ 지금 프로브`(`op-btn worker-mini__provider-probe`).
- `2026-08-24-worker-provider-outage-hold-resume-design.md`:
  - §7.3에 정정 각주 — 무제한 프로브는 이 스펙이 재확인하고, 백오프 상한이 15분에서
    1시간이 된다. UI-k96h의 24시간 상한은 철회한다.
  - §7.4에 정정 각주 — 상한에 걸린 target의 출구는 "§9 수동 이어하기"가 아니라 이
    스펙 §3.3의 `↻ 지금 프로브`다. §9 이어하기는 그 attempt를 게이트 밖으로 내보낼
    뿐 target을 판정하지 않으므로 출구가 아니었다.
  - §9.5에 정정 각주 — "`account`가 있는 target은 프로브가 판정한다"는 유지되고,
    사람은 그 프로브를 당길 수 있다.
- `AGENTS.md` 「워커·모니터 카드 배치 문법」에 결정 한 줄: 공급자 보류의 해제는
  프로브가 판정하고 `↻ 지금 프로브`는 그 판정을 앞당기는 조작이다 — 카드 위의
  조작은 target을 지우지 않는다.

## 4. 검토한 대안

- **상한 유지 + 24시간 뒤 자동 게이트 개방.** 영구 차단은 사라지지만, 진짜 장애가
  24시간 넘게 이어지면 이후 디스패치가 그대로 실패로 죽어 env 실패 사다리와 큐
  정지로 흘러간다 — 2026-08-24 스펙이 `provider_hold`를 만든 이유가 정확히 그
  결말을 피하는 것이었다. 사용자 기각.
- **상한 유지 + 게이트에서만 제외.** 위와 실질 결과가 같고 관측성만 낫다. 같은
  이유로 기각.
- **현행 유지 + 수동 해제만 추가.** 코드 변경은 가장 작지만 무인 Worker가 밤새
  막혀 있어도 아무도 풀지 않는다. 무인 운영이 주 소비자라는 §7.1의 전제와 어긋난다.
  기각.
- **`target` 즉시 제거 조작.** 2026-09-09 gate-on-card §4에서 사용자가 이미 기각한
  항목이다(증거 없는 단언). 이번에도 기각하고 `↻ 지금 프로브`로 대체한다.
- **`[지금 시작]` attempt의 성공을 회복 증거로 삼기.** 프로브보다 강한 증거이고
  버튼을 늘리지 않는다. 그러나 지금은 attempt 성공이 `provider_hold`를 건드리는
  경로가 전혀 없어 새 배선이 필요하고, 세션이 수십 분 도는 동안 "성공"을 언제
  판정할지를 새로 정해야 한다. YAGNI — 프로브가 이미 그 판정을 싸게 한다. 기각.
- **재분류 불허(분류는 진입 시 한 번).** 상태 전이가 단순해지지만 잘못 분류된
  target이 사람의 처분 전까지 러너 전체를 막는다. 이번 사고가 그 비용의 실측치다.
  기각.

## 5. 검증과 인수 기준

### Test scope

두 묶음으로 나눈다. **RED 경계**는 변경 전에 실제로 실패해야 하는 것이고,
**보존 검증**은 지금도 통과하지만 이 변경이 깨뜨리기 쉬운 동작을 고정하는 것이다.
보존 검증을 RED로 세면 vacuous RED가 되어 아무것도 증명하지 못한다.

#### RED 경계

`server/worker/provider-health.test.js`:

1. `kind:'outage'` target이 `since`로부터 24시간을 넘겨도 `disarmTarget`이 불리지
   않고 프로브가 계속 무장된다.
2. outage 프로브가 5회 실패한 뒤(`failures === 5`) 다음 지연이 3_600_000이다 —
   배열 마지막 원소가 상한이므로 이후 실패에서도 같은 값이다.
3. `account`가 있는 `kind:'outage'` target의 프로브 실패 분류가 `usage_limit`이면
   `kind`가 `usage_limit`으로 바뀌고 `resets_at`이 실린다.
4. **같은 전이가 성립한 것을 확인한 뒤** `rearm_count`와 hold의 `since`가 보존된다
   — 전이 성립(`kind === 'usage_limit'`)과 값 보존을 한 단언 묶음에서 함께 본다.
   값 보존만 검사하면 재분류가 없어도 통과한다.
5. `probeNow`가 무장된 타이머를 지우고 대상 target 전부에 `runTarget`을 부른다.
6. `probeNow`가 상한으로 disarm되어 타이머가 없는 `usage_limit` target도
   프로브한다.
7. `probeNow`가 `account === null`인 `usage_limit` target은 건너뛴다.
8. `probeNow` 뒤에도 그 target의 `failures` 카운터가 유지된다.
9. `probeNow`가 `in_flight`인 target을 건너뛰고 발화 수에서 뺀다.
10. 프로브가 도는 동안 `sync()`가 같은 target에 두 번째 타이머를 무장하지 않는다.
11. 프로브가 끝난 뒤의 `probeNow`는 그 target을 다시 발화시킨다.

`server/ws/worker-handlers.provider-outage.test.js`:

12. `worker-provider-probe-now`가 `since` 불일치에 `hold_changed`로 거부한다.
13. 자격 있는 대상이 없으면 `probe_ineligible`로 거부한다.
14. 자격 있는 대상이 전부 실행 중이면 `probe_in_flight`로 거부한다.
15. 성공 응답에 디코레이트된 큐와 `armed`가 실린다.

`app/views/worker/lane-model.test.js`:

16. provider 게이트 행의 `gate.since`가 `provider_hold[runner].since`이고
    `gate.runner`가 해석 러너다.
17. 프로브 대상이 있는 러너의 행은 `gate.probe_ready`가 `true`다.

`app/views/worker/index.test.js`:

18. `↻ 지금 프로브` 클릭이 `worker-provider-probe-now { runner, since }`를 보낸다.
19. `gate.probe_ready`가 `true`인 행에 버튼이 서고 `false`인 행에는 없다 — 한
    테스트에서 양성·음성을 함께 본다. 음성만 보면 버튼이 아예 없어도 통과한다.

#### 보존 검증 (변경 전에도 통과한다)

`server/worker/provider-health.test.js`:

20. `kind:'usage_limit'` target은 24시간 상한에서 여전히 disarm되고
    `providerAutoResumeDisarmed`가 1회 간다.
21. `kind:'usage_limit'` target은 `rearm_count`가 3에 이르면 여전히 disarm된다.
22. `account === null`인 outage target은 분류가 `usage_limit`이어도 강등되지 않는다
    — §3.2의 강등 금지 조건을 고정한다.
23. 기존 `usage_limit` → `outage` 승격이 그대로 동작한다.

### 절차

`npx vitest run --reporter=dot`, `npm run tsc`, `npm run lint`,
`npm run prettier:write`, `npm run build`(번들 포함). 순서는 prettier → build다.

### 인수 기준

- RED 경계 19건과 보존 검증 4건이 통과하고 다섯 명령이 exit 0. RED 경계 19건은
  구현 전 실패를 확인한 뒤 통과시킨다.
- 관측된 교착 재현: `kind:'outage'`·`detail:'rate_limited_429'`·크레딧 소진 문구
  target을 심은 뒤 프로브 1회로 `usage_limit`·계정 단위 게이트로 내려가고, 같은
  러너의 다른 계정 후보가 디스패치된다.
- 막힌 대기 행에서 `↻ 지금 프로브` 한 번으로 백오프를 기다리지 않고 프로브가 돈다.

## 6. 비목표

- `scheduler.js`의 게이트 판정(`providerDispatchHeld`)은 바꾸지 않는다. outage가
  러너 전체, `usage_limit`이 계정 단위라는 §6의 결정은 그대로다 — 이 스펙은 target이
  어느 kind로 서 있느냐를 고치지, 각 kind가 무엇을 막느냐를 고치지 않는다.
- `provider-outage.js`의 분류기와 `LIMIT_RE`는 바꾸지 않는다. 문구를 더 추가하는
  것은 이 스펙의 전제가 아니라 이 스펙이 대체하려는 접근이다.
- codex 러너의 한도·장애 분류(`codex-outage.js`)는 범위 밖이다.
- 이미 서 있는 target의 데이터 마이그레이션은 하지 않는다. §3.2의 재분류가 다음
  프로브에서 같은 일을 하므로 별도 이관 코드가 필요 없다.
- `[지금 시작]`의 의미(그 행 하나만 게이트 우회)는 바꾸지 않는다.

## 7. 구현 unit 후보 (advisory)

- `server`: §3.1·§3.2·§3.3 서버 절반 — `provider-health.js`, `attach.js`,
  `worker-handlers.js`, `connection.js`, `protocol.js`.
- `client`: §3.4 — `lane-model.js`, `lanes.js`, `index.js`(worker·monitor).

두 unit은 ws op 이름과 payload 형태만 공유하고 파일·테스트가 갈린다.

## 8. 경계·후속

이 설계의 형제 스펙은 없다 — 한 저장소·한 route·한 구현 단위다.

- 관찰: `worker-handlers.js` `publicProviderHolds`가 `usage_limit`의 상한 상수
  (`rearm_count < 3`, 24시간)를 `provider-health.js`와 별개로 하드코딩하고 있다. 두
  값이 어긋나면 화면의 `next_probe_at`이 실제 타이머와 달라진다. 이 스펙은 그 값을
  바꾸지 않으므로 지금은 무해하고, 상수 공유는 별도 항목이다.
- 관찰: UI-j9zk(진행 중)가 같은 `gate` 파생값의 계정 해석 사다리에 저장소 기본 계정
  층을 넣는다. `lane-model.js`의 같은 함수를 건드리므로 착지 순서에 따라 병합 충돌이
  날 수 있다. 판정이 겹치지는 않는다 — UI-j9zk는 어느 계정으로 볼지를, 이 스펙은
  어떤 재료를 더 실을지를 정한다.
- 관찰: 2026-09-09 관측 시점에 두 워크스페이스에 서 있던 outage target은 세션이
  운영 조치로 제거했다. 그 조치는 이 설계의 전제가 아니다.

## 결정 (ADR 후보)

- 전제: ADR 0049 — 큐 정지·공급자 보류의 표시와 출구는 막힌 카드에 살고 상단
  배너는 없다. `↻ 지금 프로브`를 막힌 대기 행의 1번 조작에 두는 것은 그 조항의
  적용이다. 다만 같은 ADR의 "스케줄러의 정지 상태 모델, **프로브, 해제 절차**,
  `resume()`의 해제 분기는 바꾸지 않는다" 조항은 이 스펙이 뒤집으므로 아래 후보 1이
  supersede 대상으로 지명한다 — 카드 배치와 체계적 정지의 승인 규칙은 승계하고
  프로브·해제 절차 조항만 교체한다.
- 전제: ADR 0014 — 새 요소의 자리는 공유 슬롯 표가 정하고 슬롯 표를 먼저 갱신한다
  (§3.5).
- **공급자 보류의 해제는 프로브만이 판정하고 그 프로브에는 상한을 두지 않는다.
  사람은 프로브를 앞당길 수 있을 뿐 게이트를 단언으로 열지 않는다.** 되돌리기
  어려움: 낮음 — 상수 하나와 분기 하나, durable 형식 무변경 / 맥락 없이 놀라움:
  있음 — 무인 Worker가 회복될 때까지 시간당 1회 프로브를 영원히 돌리고, 24시간이
  지나도 게이트가 저절로 열리지 않는다 / 실제 트레이드오프: 있음 — 무한 프로브의
  비용 대 자동 회복의 보장, 그리고 자동 개방이 부르는 실패 사다리. 두 조건
  충족이므로 ADR로 남긴다. `summary`: "공급자 보류의 해제는 프로브만이 판정한다 —
  outage 프로브에는 상한이 없고 백오프 상한은 1시간이며, 사람의 `↻ 지금 프로브`는
  그 판정을 앞당길 뿐 target을 지우지 않는다. 상한에 걸린 계정 한도 target도 그
  조작으로 다시 프로브된다." → ADR, supersede 0049
- 분류기의 판정이 바뀌면 서 있는 target의 `kind`가 따라간다 (`outage` ↔
  `usage_limit` 양방향). 되돌리기 어려움: 낮음 — 되돌릴 것은 `runTarget`의 강등 분기
  하나이고, 그 분기는 `updateProviderTarget`으로 기존 `kind` 필드의 값만 바꾼다.
  `provider_hold` 스키마에 필드를 더하지 않으므로 이미 저장된 큐가 남기는 잔여는
  `kind` 값 하나뿐이고, 그 값은 분기를 지운 뒤에도 §7.4의 기존 `usage_limit` 경로가
  그대로 처리한다 / 맥락 없이 놀라움: 없음 — §7.4에
  반대 방향 전이가 이미 있고 이것은 그 대칭이다 / 실제 트레이드오프: 약함 — 불허의
  이점이 상태 전이의 단순함뿐이다. 한 조건만 성립하므로 스펙 본문에 남긴다.
  → ADR 아님
