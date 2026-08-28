---
id: 16
title: 큐 정지 권한은 systemic 실패 계층만 갖는다
status: accepted
date: 2026-08-28
summary: 'Worker 큐 정지는 다음 bead에도 재발할 체계적 실패에만 걸고, 개별 실패는 bead 단위로 기록하고 큐를 계속 돌린다. 환경성 실패는 보류→재시도→승격의 사다리를 탄다'
spec: docs/superpowers/specs/2026-08-28-worker-failure-tiers-queue-hold-design.md
bead: UI-5ym8
---

# 큐 정지 권한은 systemic 실패 계층만 갖는다

## Context

2026-08 이전 Worker는 어떤 attempt든 `failed`로 끝나면 `auto_advance=false`로 새
디스패치를 멈췄다(`scheduler.js failAttempt` → `queue-store.js
haltAutoAdvanceForAttempt`). 2026-07~08 두 달의 큐 기록을 전수 집계하면 정지
원인의 대부분은 큐를 세울 이유가 없었다: `verify_failed:pr_missing` 17건은 세션이
`awaiting_user`를 남기고 정상 종료한 파킹 결말이었고, `session_failed:is_error`는
`API Error: 529 Overloaded` 같은 단발 API 장애였으며, `quickfix_landing_failed:*`는
세션 자기보고를 믿는 판정의 프로토콜 이탈이었다. 실제로 큐 전체가 같은 벽에
부딪히는 경우 — base 이동 검출, hook 우회, 머지 후 배포/verify 실패, gh/bd 접속
불가 — 는 소수였다.

"실패 타일이 떠 있으면 큐가 멈춘 것"이라는 운영 습관과 `halted_auto_advance`
복원 경로가 이 정지 의미에 박혀 있어, 분류를 바꾸는 것은 저장 형식·복원 경로·타일
UI를 함께 바꾸는 일이다.

## Decision

실패를 `parked` / `individual` / `env` / `systemic` 네 계층으로 나눈다
(`server/worker/failure-class.js`, 순수 함수). 큐 정지는 `systemic`에만 연결한다.

- `individual`: bead만 `failed`. `auto_advance`와 `queue.hold`를 건드리지 않는다.
- `env`(환경성 — API 장애 패턴, gh/bd 관측 실패, spawn 실패): 첫 발생부터 새
  디스패치를 **보류**(`hold.kind='env'`)하고 같은 bead를 [2분, 5분, 15분] backoff로
  재시도한다. 3회 소진 또는 다른 bead에서 같은 원인 재발(또는 30분 안의 2 bead
  동시 실패)이면 `systemic`으로 승격한다. 재시도 성공은 그 lineage만 풀고, 모든
  lineage가 비면 hold가 풀린다.
- `systemic`(base 이동·hook 우회·gh/bd 불가·`verify_red`·`cleanup_failed:*`):
  즉시 `hold.kind='systemic'`. 해제는 사용자 `재개`뿐이다.
- 실패가 켜는 유일한 정지는 durable `queue.hold`다. `queue.auto_advance`는 사용자
  ⏸/▶ 전용으로 돌아가고, 실패 경로는 더는 `setAutoAdvance(false)`를 부르지 않는다.
  둘은 독립이다(`runPass`: `hold !== null` → armed 행만, `auto_advance !== true` →
  기존과 같음).
- 호환: 과거 `halted_auto_advance:true` 레코드의 dismiss·재시작 복원 경로는 유지하되,
  `createUnhandledFailurePredicate`의 "미해소 실패" 판정을 그 레코드로 한정한다.

## Consequences

- 개별 실패 타일이 떠 있어도 큐는 계속 돈다. 통계(§1)를 모르면 "정지가 고장났다"로
  읽히므로, 큐 상단에 환경 보류(회색)·체계적 정지(경고색) 표시를 두어 정지의 근거를
  화면이 말한다.
- 실패한 bead는 `runPass` 후보에서 빠진다(최근 implementation attempt가
  `failed`/`parked`/`retry_wait`이면 skip). ▶는 실패 bead를 재디스패치하지 않으며,
  재시도는 명시적 경로(타일 재시도·env 타이머·재개)뿐이다.
- 장애 중 세션 낭비(보류 없이 계속 디스패치)와 사람 호출 빈도(모든 실패에 정지)
  사이의 trade-off를 사다리로 푼다. 승격 규칙의 임계값(3회·30분)은 `queue-hold.js`
  상수다.
- `queue.json`에 `hold`·`lineages`·`hold_history`가 추가되고, attempt status에
  `retry_wait`·`superseded`가 추가된다.
