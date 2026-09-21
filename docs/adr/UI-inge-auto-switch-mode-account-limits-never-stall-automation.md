---
id: UI-inge
title: 자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다 — 실행 중 선제 전환·핀 덮기·usage_limit 상한 제거·credential 계정 보류
status: accepted
date: 2026-09-21
summary: "자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다 — 실행 중 attempt도 preempt_pct에서 정지해 허용 계정으로 같은 세션을 재개하고, 핀·기본 계정이 보류 중이거나 임계 이상이면 디스패치에서 launch-only로 덮어 전환하며 prior_attempt 계정 잠금도 이 전환에는 양보하고, usage_limit 보류의 자동 프로브에는 24시간·재무장 상한이 없으며, 인증 실패는 계정 단위 공급자 보류로 프로브가 회복을 판정한다."
supersedes: [52, UI-1l3a, UI-6icf]
spec: docs/superpowers/specs/2026-09-21-account-auto-switch-never-stalls-design.md
bead: UI-inge
---

# 자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다

## Context

2026-09-21 14:15, `provider_limit_policy.claude = { mode:'switch', preempt_pct:90 }`인
두 저장소의 세 fable 세션이 같은 계정으로 떠 5시간 창을 75분 만에 소진하고 함께
멈췄다. 조사에서 다섯 결함이 드러났다: 선제 전환은 디스패치 순간에만 평가돼 실행
중 임계 교차를 보지 못했고, `holdAttempt`가 attempt당 두 번 진입해 같은 대기
영수증으로 `resume()`이 두 번 나가 첫 자식의 기록이 유실됐으며, 뒤따른 기동이
cswap의 refresh 토큰 회전 창에 걸려 인증 실패로 죽고 `unclassified → wait`가 됐고,
12일 전 잔재 target 때문에 새 target이 24시간 상한(`hold_age_cap`)으로 즉시 해제돼
리셋 뒤 프로브가 없었으며, 핀·기본 계정이 보류 중이면 자동 전환 모드여도 게이트에서
리셋까지 섰다.

세 ADR이 이 결함의 일부를 정한 조항을 담고 있었다. ADR 0052는 "선제 전환은 상속된
계정에만 적용되고 Bead pin은 덮지 않는다", ADR UI-1l3a는 "상한으로 멎은 usage_limit
target은 서버 재시작 시 한 번 프로브된다"와 "disarm 알림은 target당 한 번", ADR
UI-6icf는 "`prior_attempt` 자동 회복은 기록된 계정을 지키고 계정 전환이 필요한
재개는 `prior_attempt_locked`로 거부한다". 사용자 결정(2026-09-21)은 자동 전환
모드에서 계정 한도가 자동화를 세우지 않게 하는 것이고, 세 조항은 그 결정과 정면으로
어긋나므로 이 ADR이 셋을 승계한다.

## Decision

**자동 전환 모드(`provider_limit_policy.<runner>.mode === 'switch'`)에서는 계정 한도가
자동화를 세우지 않는다.** 실행 중 attempt도 `preempt_pct`에서 정지해 허용 계정으로
같은 세션을 재개하고, 핀·기본 계정이 보류 중이거나 임계 이상이면 디스패치에서
launch-only로 덮어 전환하며, `prior_attempt` 계정 잠금도 이 전환에는 양보하고,
usage_limit 보류의 자동 프로브에는 24시간·재무장 상한이 없으며, 인증 실패는 계정
단위 공급자 보류로 프로브가 회복을 판정한다.

- **실행 중 선제 전환(`live preempt`).** 워크스페이스마다 60초 패스가 `running`
  attempt의 계정 창을 카탈로그(cswap 캐시)에서 읽고, 어느 창이든 `preempt_pct`
  이상이면 한 durable 쓰기로 일시정지 intent(`reason:'account_preempt'`)와
  `auto_resume_pending { generation:0, origin:'live_preempt', switched_from }`을
  남긴 뒤 기존 durable pause로 세션을 끊고, 정산 뒤 같은 세션을 새 계정으로
  재개한다. 별도 임계는 없다 — `preempt_pct` 하나가 디스패치와 실행 중을 모두
  정한다. 기록은 `account_sources:'live_switch'`·timeline `account_live_preempt`·알림
  `providerLivePreempt` 한 벌뿐이며 `provider_recovered`는 내지 않는다. 후보는 모든
  창이 `preempt_pct` 미만인 허용 계정만이라 두 계정이 모두 임계 이상이면 왕복하지
  않고 `live_preempt_last_skip`만 남긴다.
- **디스패치 시 핀·기본값 덮기.** `applyPreemptSwitch`는 `account_sources`를 보지
  않는다 — Bead pin(`'bead'`)도 창이 임계 이상이거나 그 계정이 `usage_limit` 보류
  target이면 전환한다. 전환은 여전히 attempt 단위 launch-only `exec_override`이고
  Bead의 `claude_account`/`codex_account` 값은 쓰지 않는다.
- **`prior_attempt` 계정 잠금의 예외.** `continuation_choice:'prior_attempt'` prior의
  `account_switch` 영수증은 `prior_attempt_locked`로 거부하지 않고 `continuation:
  'prior_attempt'` + 계정만 `exec_override`로 재개한다 — 잠금이 지키는 것은 사용자가
  고른 세션과 tuple이지 한도에 걸린 계정이 아니다. `provider_outage` 영수증의 계정
  변경 거부는 그대로다.
- **usage_limit 보류의 상한 제거.** `HOLD_AGE_CAP_MS`·`USAGE_REARM_CAP`·`disarmTarget`·
  `probeCapped`·`disarm_notified_at`은 없다. usage_limit target은 언제나 `resets_at +
  60초`(없으면 15분)에 무장하고 프로브가 다시 한도를 돌려주면 새 리셋 시각으로
  재무장한다(`rearm_count`는 표시용). 재시작은 `sync()`가 전부 다시 무장하는 것으로
  충분하다. `providerAutoResumeDisarmed`는 §8.1 계보 자동 재개 상한(`auto_resume_cap`)
  사유만 남는다. 잔재 target은 attempt가 라이브 맵에서 사라질 때 `attempt_ids`에서
  빠지고 빈 target·빈 hold가 제거된다; 프로브 판정 불가 오류로 target을 지우는 규칙은
  두지 않는다 — 해제는 프로브만이 판정한다.
- **인증 실패는 계정 단위 공급자 보류다.** 러너 어댑터의 공급자 분류에 러너 무관
  `credential` 그룹(`Failed to authenticate|OAuth session expired|could not be
  refreshed|invalid_grant|401 Unauthorized|Missing bearer`)을 두고 `{ detail:
  'credential', scope:'account' }`로 `holdAttempt`가 받아 `kind:'outage'` target을
  만든다. 회복은 기존 outage 프로브 백오프가 판정하고 같은 세션·계정·
  `account_switched_from`으로 재개한다. 환경 오류 재시도 사다리는 쓰지 않는다 — 그
  경로는 세션·계정을 승계하지 않고 다른 Bead의 같은 오류에서 큐를 세운다.
- **전환 재개 단일성과 같은 계정 기동 직렬화.** `holdAttempt`는 멱등이고
  `consumeProviderAutoResume`는 in-flight 집합으로 한 영수증을 한 번만 `resume()`에
  닿게 한다. `claude_account`가 있는 claude spawn(디스패치·재개·프로브)은 계정별
  launch 잠금을 타고 `init` 관측 뒤 3초 간격을 두며 30초 상한을 넘으면 그냥 기동한다.

승계하는 조항(세 ADR에서 그대로 남는다): 전환 후보는 사용자가 러너별로 고른 허용
계정 집합 안에서만 고르고 집합이 비면 `'unconfigured'`로 남는다; 한도 시 동작은
러너별 `wait | switch` 모드이고 두 러너가 같은 정책으로 전환한다; 전환은 attempt
단위 launch-only `exec_override`이며 워크스페이스 기본 계정·Bead pin·세션 계정 값은
쓰지 않는다; 전환 자식은 `auto_resume_kind:'account_switch'`로 §8.1 자동 재개 cap을
소비하지 않는다; 후보 건강 임계(5h 80%·그 외 90%)는 설정 키가 아니다; 후보는
mutation 밖 비동기 조회로 고르므로 저장 단계가 허용 집합을 다시 확인한다(이상 ADR
0052). 공급자 게이트의 계정 해석 사다리 세 층은 러너 무관이고, 판정은 서버가 내려
`provider_gate` admission 기록으로 공개하며, 화면은 기록을 먼저 그리고 자체 판정은
예측으로 내려가고, 계정 미해석은 fail-closed로 막되 칩에 보이며, hold가 사라지면
기록도 같은 mutation에서 사라지고, 새 슬롯·칩·wait kind는 없다; outage 프로브에는
상한이 없고 백오프 상한은 1시간이며 `↻ 지금 프로브`는 target을 지우지 않고, 머지 후
정리 실패의 관측형 자동 재실행 규칙도 그대로다(이상 ADR UI-1l3a; 뒤집는 것은 "상한
target 재시작 1회 프로브"와 "disarm 알림 target당 한 번" 두 조항이며 상한 자체가
사라진다). 세션 재개 조작은 `⏸`·`▶ 재개` 둘이고 지시는 재개 다이얼로그의 갈래로
받으며, `require_durable` pause의 자격 검사와 `prior_attempt`의 tuple 승계·
`exec_override` 동반 시 `bad_request`·transcript 부재 처리·사용자 pause는 실패로 세지
않는다는 서버 계약은 UI 진입점 없이 유지한다(이상 ADR UI-6icf; 뒤집는 것은
`account_switch` 영수증에 한한 `prior_attempt_locked` 조항 하나이고, 그 예외의
`exec_override`는 기록된 러너의 계정 키 하나뿐이다).

기각한 대안: cswap의 전역 자동 전환(`cswap auto`)에 맡김(활성 로그인을 바꾸는 전역
조작이고 `cswap run <계정>`으로 고정된 attempt는 영향받지 않아 attempt 단위 전환과
어긋난다); 실행 중 전환에 별도 임계(키가 하나 늘고 두 값의 관계를 설명해야 한다 —
사용자 기각); 상한 유지 + 기산점만 target별로(24시간·3회 뒤 수동 개입이 남아
"자동화가 멈춘다"는 문제 자체가 남는다 — 사용자 기각); 인증 실패를 env 재시도
사다리로 처리(세션·계정·전환 출처를 잃고 다른 Bead의 같은 오류에서 큐를 세운다);
프로브 판정 불가 오류 3회 뒤 target 삭제(회복 증거 없이 게이트를 연다); 정지 대신 턴
경계에서 전환(`claude -p` 세션에는 밖에서 볼 수 있는 턴 경계가 없다).

## Consequences

- 이슈에 핀한 계정이나 `prior_attempt`로 잠근 계정이 한도 앞에서 조용히 다른 허용
  계정으로 실행된다. 이슈 상세 `실행 계정` 섹션의 `자동 적용:` 줄과 timeline·디스코드
  알림이 그 사실을 남긴다.
- 실행 중 전환은 진행 중인 턴 하나를 끊는다(한도 도달 경로와 같은 비용). 사용량
  반영은 cswap 폴링 정책만큼(보통 3분 이내) 늦으므로 임계 뒤 몇 %p 안에서 멈춘다 —
  지연은 사용자가 `preempt_pct`로 흡수하고 이 결정은 임계값을 보정하지 않는다.
- 무인 Worker가 리셋마다 영원히 프로브한다. `hold_age_cap`·`rearm_cap` 사유의 알림은
  더 생기지 않고, 과거 큐 파일의 `auto_switch:'cap'`·`disarm_notified_at`·
  `last_error:'auto_resume_disarmed:*'`는 정규화가 읽기만 하고 버린다. 대기 판정의
  `probe_needed` 판정도 사라진다.
- durable 어휘가 는다: `account_sources:'live_switch'`, `cause:'account_preempt:*'`,
  `auto_resume_pending.origin`/`switched_from`, `detail:'credential'`. 되돌리려면
  이 어휘와 상한 상수·알림을 함께 되살려야 한다.
- 인증 실패는 재시도가 아니라 공급자 보류로 보인다 — 큐는 서지 않고 여러 Bead가
  같은 target에 묶여 한 프로브로 함께 회복하며, 사람 확인 대기는 프로브도 못 잡는
  오류에서만 남는다.
- §8.1 계보 자동 재개 1회 cap과 그 알림, `dispatchReviewSession` 리뷰 세션의 선제
  전환, cswap 내부 수정은 이 결정 밖이다.
