---
id: UI-1l3a
title: 공급자 게이트의 판정은 서버가 러너 무관 사다리로 내리고 기록으로 공개하며 상한 target은 재시작 시 한 번 프로브된다
status: accepted
date: 2026-09-17
summary: "공급자 게이트의 판정은 서버가 러너 무관 세 층 사다리로 내리고 provider_gate admission 기록으로 공개하며 화면은 그 기록을 4a 칩의 재료로 우선 쓴다 — 계정 미해석은 fail-closed로 막되 칩에 보이고, 상한으로 멎은 usage_limit target은 서버 재시작 시 한 번 자동 프로브된다"
supersedes: [UI-a8rq]
spec: docs/superpowers/specs/2026-09-17-provider-gate-verdict-coherence-design.md
bead: UI-1l3a
---

# 공급자 게이트의 판정은 서버가 러너 무관 사다리로 내리고 기록으로 공개하며 상한 target은 재시작 시 한 번 프로브된다

## Context

2026-09-17 PROSTATE 리그의 quick_fix `PROSTATE-u53`(오케스트레이션 codex)은 자동
진행을 켠 뒤에도 출발하지 않았고, 대기 카드에는 사유도 게이트 칩도
`↻ 지금 프로브`도 `[지금 시작]`도 없었다. 원인은 셋이 겹친 것이다.

1. **서버 게이트의 codex 계정 사다리가 한 층 짧았다.** 승인 스펙
   `2026-08-24-worker-provider-outage-hold-resume-design.md` §6(rev2)은 `usage_limit`
   게이트의 계정 해석을 "bead pin → workspace 기본값 → 카탈로그 활성 계정"으로
   정했는데, `scheduler.js providerDispatchHeld`는 claude에만 셋째 층을 탔고 codex는
   `accounts.codex`가 `null`이면 곧 "해석 불가"로 막았다. PROSTATE에는 codex 저장소
   기본 계정이 없고 u53에 핀도 없어 서버가 막았다. 실측으로 활성 codex 계정은 보류
   계정과 달랐으므로 사다리를 다 타면 그 행은 흐른다. 런치 자체
   (`resolveLaunchAccounts`)와 선제 전환 판정(`applyPreemptSwitch`)은 이미 활성 계정을
   쓰고 있었고 게이트만 어긋나 있었다.
2. **게이트 거절이 조용했다.** `dispatch()`는 게이트가 서면 레인 예약을 풀고
   `return`했다. 다른 모든 skip은 `recordSkipReason`으로 admission 기록을 남겨 화면이
   배지나 칩을 그리는데 이 경로만 기록이 없었다. 프론트 `lane-model.js providerGate`는
   자체 계정 해석으로 칩을 그리므로, 서버와 프론트가 다르게 판정하면 "서버는 막고
   화면은 비어 있는" 카드가 된다. 칩이 없으니 그 칩에 기대는 `↻ 지금 프로브`와
   `[지금 시작]`도 사라졌다.
3. **상한에 걸린 `usage_limit` target이 재시작에도 재판정되지 않았다.**
   `provider-health.js`의 `start → sync → scheduleTarget`은 `rearm_count ≥ 3` 또는
   24시간이 지난 target을 프로브 한 번 없이 즉시 다시 `disarmTarget`했다. PROSTATE의
   target은 9-15부터 `auto_resume_disarmed:rearm_cap`으로 남아, 사용량이 회복되고 서버가
   하룻밤 세 번 재시작해도 레코드가 그대로였다.

셋은 한 판정에 결합돼 있다 — 게이트가 막는가, 막으면 어디에 어떻게 보이는가, 언제 다시
판정하는가. 따로 고치면 서버와 프론트의 판정이 또 어긋난다.

## Decision

ADR UI-a8rq의 결정은 한 조항을 빼고 그대로 승계한다 — 공급자 보류의 해제는 프로브만이
판정하고 outage 프로브에는 상한이 없으며 백오프 상한은 1시간이다; 분류기의 판정이
바뀌면 서 있는 target의 `kind`가 `usage_limit`으로 강등된다; 막힌 대기 행에
`↻ 지금 프로브`를 두고 그 조작은 target을 지우지 않는다; 상단 배너는 없고 정지·보류의
사실은 막힌 대기 행의 4a 칩이 말하며 출구는 그 행의 1번 조작이다; `▶ 재개`는 체계적
정지의 사람 승인 한 번이다; `[지금 시작]`은 그 행 하나의 명시적 디스패치로 공급자
게이트도 우회한다; 머지 후 정리 실패는 큐를 세우지 않고 그 Bead의 행에만 남는다;
`branch_cleanup`·`base_containment` 정리 실패는 `cleanupFailureRetryClass`가 관측형과
결정형으로 갈라 관측형만 코디네이터가 최대 3회(1·5·15분) 자동 재실행한다; 재실행
상태는 `auto_resolution` 사다리가 아니라 `cleanup_failed` 기록에 싣는다; 원인이 사라진
정리는 사람 없이 끝난다; 낡은 `cleanup_failed:*` systemic hold는 큐 로드 정규화가
지운다; 새 라벨·칩·버튼은 없다(ADR 0014). 뒤집는 것은 UI-o5ll에서 승계한
"상한(`rearm_count` 3회·24시간)에 걸린 `usage_limit` target은 자동 일정이 멎고 출구는
사람의 `↻ 지금 프로브`뿐"이라는 조항 하나다.

- **게이트의 계정 해석 사다리 세 층은 러너 무관이다.** `bead pin → workspace 기본값 →
  카탈로그 활성 계정` 세 층을 두 러너가 똑같이 탄다. 셋째 층은 claude가
  `activeClaude()`의 `account.email`, codex가 `listCodex()`의 `active_key`다
  (`account-catalog.js`에 `activeCodex`를 더하지 않는다). 핀이 없으면 지금 로그인한
  계정이 기본값이며, 그것이 런치가 실제로 쓰는 계정이기 때문이다.
- **판정은 서버가 내리고 기록으로 공개한다.** `providerDispatchHeld`는 boolean이 아니라
  판정 객체(`held`·`runner`·`kind`·`account`·`unresolved`)를 돌려주고, 게이트가 서면
  `dispatch()`가 예약을 풀기 전에 `recordSkipReason(..., 'provider_gate', { gate })`로
  admission 기록을 남긴다. `refuseDispatch`는 쓰지 않는다 — 보류가 풀리는 즉시 흘러야
  하므로 이 행은 매 pass 후보로 남는 것이 맞고, 같은-기록 no-op 가드가 매 pass의 기록을
  흡수한다. 그 기록은 `publicAdmissions`가 화면 스냅샷까지 그대로 투영한다.
- **화면은 기록을 먼저 그리고 자체 판정은 예측으로 내려간다.** 대기 행의 4a 게이트 칩은
  `provider_gate` 기록이 있고 그 러너의 hold가 아직 서 있고 기록이 지금도 유효하면 그
  기록으로 선다. 유효 조건은 기록의 러너가 이 행의 해석 러너와 같고, `usage_limit`이면
  이 행이 지금 해석하는 계정이 기록과 같다는 것이다(`unresolved` 기록은 지금도 미해석일
  때만 유효하고, `outage` 기록은 계정과 무관하게 유효하다). 조건이 깨진 기록은 무시하고
  종전 프론트 판정으로 떨어진다. 그 판정 층은 서버 pass가 아직 돌지 않은 행 — 방금 앉은
  행, 자동 진행이 꺼진 저장소의 행 — 의 예측이며, 두 층이 어긋나면 기록이 이긴다.
- **계정을 해석할 수 없으면 fail-closed로 막되 그 사실이 보인다.** 세 층이 모두 비거나
  카탈로그 조회가 실패하면 승인 스펙 §6대로 막고, 기록에 `unresolved:true`를 실어 칩
  팝업에 `계정: 미해석 — 핀·저장소 기본·활성 로그인 어디에도 <runner> 계정이 없음` 한
  줄이 선다. 미해석 행을 통과시키지는 않는다 — 한도 계정으로 다시 나가 attempt 기록만
  쌓을 위험이 있다.
- **상한으로 멎은 `usage_limit` target은 서버 재시작 시 한 번 자동 프로브된다.**
  `provider-health.js`의 `start()`가 `sync()` 뒤 `probeCapped()`를 한 번 부르고,
  `usage_limit`이며 계정이 있고 상한에 걸린 target만 `probeNow`와 같은 규칙으로 지금
  발화한다. 실패하면 `rearm_count`가 오른 뒤 다시 멎는다. 주기적 자동 프로브는 두지
  않으며 그 외 시각의 출구는 종전대로 `↻ 지금 프로브`다 — 판정자는 여전히 프로브다.
- **disarm 알림은 target당 한 번이다.** `disarmTarget`은 `last_error` 마커 비교 대신
  durable `disarm_notified_at`을 보고, `updateProviderTarget`의 허용 patch 키와
  `normalizeProviderTarget`의 보존 필드에 그 필드가 **둘 다** 들어간다. patch만
  허용하면 재시작 로드에서 필드가 떨어져 알림이 재시작마다 반복된다.
- **hold가 사라지면 기록도 같은 mutation에서 사라진다.** `recoverProviderTarget`이 어느
  러너의 `targets`를 비워 러너 항목을 지울 때, 그 러너의 `provider_gate` admission 기록도
  함께 지운다. 자동 진행이 꺼져 dispatch pass가 돌지 않는 저장소에서도 낡은 칩이 남지
  않게 하는 서버 쪽 정리다.
- **새 슬롯·칩·wait kind는 없다(ADR 0014).** 공급자 게이트는 슬롯 4a 칩 한 층에만 서고
  슬롯 1 배지·본문·집계에는 들지 않으므로 `admissionBadge`는 `provider_gate`에 빈
  문자열을 돌려준다. 기존 칩의 팝업 줄만 한 줄 는다.

기각한 대안: 사다리만 고치고 판정은 양쪽이 각자 계산(PROSTATE는 풀리지만 카탈로그
실패·조회 시차·앞으로의 규칙 변경에서 다시 "서버는 막고 화면은 빈" 카드가 생기고,
조용한 거절이 그대로 남는다); 판정을 서버로 완전히 옮기고 프론트 자체 판정 삭제(자동
진행이 꺼진 저장소는 dispatch pass가 게이트 전에 돌아 나가 기록이 생기지 않고, ADR
UI-3pu9가 약속한 "게이트 선 행의 `[지금 시작]`"이 그 저장소에서 사라진다); 상한 뒤 느린
주기 자동 프로브(재시작 1회가 "지금 기준으로 다시 본다"는 요구를 비용 없이 채우고
판정자는 여전히 프로브다 — 사용자 결정); 계정 미해석 행 통과(승인 스펙 §6의
fail-closed를 뒤집는 결정이다).

## Consequences

- 코드만 읽으면 왜 프론트가 자체 판정 위에 서버 기록을 두는지, 왜 재시작에만 프로브하고
  주기 프로브는 없는지가 드러나지 않는다. 이 기록이 없으면 두 층의 우선순위는 중복으로,
  재시작 프로브는 빠뜨린 타이머로 읽힌다.
- 되돌리기는 admission 스키마(`gate`), 프론트 두 층의 우선순위, 프로브 시작 경로, 알림의
  durable 필드와 그 정규화, 그리고 다섯 파일의 테스트를 함께 되돌려야 한다.
- `provider_gate` 기록은 큐 파일에 durable하게 남으므로, 규칙을 바꿀 때는 기록 유효
  조건도 같이 봐야 한다 — 무효 기록은 조용히 무시되고 프론트 예측으로 떨어진다
  (fail-quiet).
- 상한 상수(3회·24시간)와 `account:null` target의 프로브 금지는 그대로다. 재시작 프로브는
  상한을 없애지 않고 "재시작 시각에 한 번 다시 본다"만 더한다.
