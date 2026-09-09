---
id: 48
title: Worker 체계적 정지의 해제는 사람의 승인 한 번이며 재개 버튼과 큐를 세운 attempt의 ↻ 이어하기가 같은 승인이다
status: accepted
date: 2026-09-09
summary: "Worker 체계적 정지의 해제는 사람의 승인 한 번이며, 재개 버튼과 큐를 세운 attempt(자손 포함)의 ↻ 이어하기가 같은 승인이다. 자동 재개는 정지를 풀지 않는다."
supersedes: [16]
spec: docs/superpowers/specs/2026-09-08-resume-click-releases-systemic-hold-design.md
bead: UI-hhju
---

# Worker 체계적 정지의 해제는 사람의 승인 한 번이며 재개 버튼과 큐를 세운 attempt의 ↻ 이어하기가 같은 승인이다

## Context

ADR 0016은 실패를 `parked`/`individual`/`env`/`systemic` 네 계층으로 나누고 큐 정지
권한을 `systemic`에만 두면서, 그 해제를 "사용자 `재개`뿐"으로 적었다. 2026-09-08
dotfiles 큐 실측에서 가드 kill(`loud_fail_blocker`)로 `systemic` hold가 걸린 뒤 사용자가
실패 타일의 ↻ 이어하기로 자식 attempt를 띄웠는데도 상단 "체계적 정지" 배너와 `재개`
버튼이 그대로 남았다. `scheduler.js resume()`은 큐 hold를 읽거나 쓰지 않고, 해제
이벤트 `resume`의 발신자는 `재개` 버튼 하나였다. 같은 실패를 두고 사람이 같은
결정("봤다, 계속해라")을 두 번 클릭해야 했고, 그 사이 다른 held bead의 자동 진행은
실제로 막혀 있었다.

## Decision

ADR 0016의 계층 분류, `systemic`만 갖는 정지 권한, durable `queue.hold` 상태 모델,
env 사다리, `auto_advance`와의 독립은 그대로 유지한다. 바뀌는 것은 해제 조항 하나다.

- 체계적 정지의 해제는 **사람의 승인 한 번**이다. `재개` 버튼과, 큐를 세운
  attempt(`hold.halted_by_attempt_id`) 또는 그 `resumed_from` 자손의 ↻ 이어하기가
  같은 승인이다. 두 경로는 스케줄러의 같은 해제 절차(`resume` 이벤트 적용 → 재시도
  타이머 해제 → held bead의 최신 실패 attempt dismiss → tick)를 공유하고, hold에 함께
  묶인 다른 bead는 `재개`와 동일하게 재디스패치된다.
- ↻은 자식 attempt spawn이 성공한 **뒤에만** 판정한다. spawn 실패면 hold는 그대로다.
- 자동 재개(`provider_auto_resume`)는 어떤 경우에도 hold를 풀지 않는다. 다른 bead의
  ↻, 같은 bead라도 halting 계보 밖 attempt의 ↻, `halted_by_attempt_id`가 없는 레거시
  hold도 풀지 않고 `재개`만 남는다(fail-quiet).
- 배너와 `재개` 버튼은 유지한다. 해제 조건이 충족되지 않는 동안(큐를 세운 attempt를
  아무도 이어하지 않았거나, base 이동·gh 미인증처럼 attempt가 원인이 아닌 정지)의
  유일한 큐 정지 표시이자 출구다. ↻이 hold를 지운 뒤 남은 `재개` 클릭은 기존
  `hold.since` CAS로 `hold_changed` no-op이다.
- `queue-hold.js` reducer, ws 프로토콜, 타임라인 이벤트는 바꾸지 않는다. 해제 사실은
  `hold=null` 스냅샷과 자식 attempt의 `dispatched:…:resume` 이벤트로 읽힌다.

기각한 대안: 프론트가 `worker-attempt-resume` 성공 뒤 `worker-queue-hold-resume`을
잇달아 보내기(두 메시지 사이 경합, stale-work 이어하기 등 다른 사람 개시 경로 누락,
큐 의미가 아니라 화면 습관이 됨); reducer에 `attempt_resumed` 이벤트 추가(자손 판정에
attempts 맵이 필요해 결국 스케줄러가 판정하고 reducer는 `resume`과 같은 일을 함).

## Consequences

- 타일의 ↻ 한 번이 큐 전체 정지를 풀고 다른 held bead까지 재디스패치한다. 이 결정을
  모르면 "재개를 안 눌렀는데 큐가 돈다"로 읽히므로 이 기록이 그 근거다.
- 큐 정지 승인의 별도 명시성은 줄어들고, 대신 같은 결정을 두 번 클릭하는 일이 없다.
  자동 재개는 여전히 승인이 아니므로 "정지 해제는 사람"이라는 0016의 뿌리는 남는다.
- 되돌리기는 `resume()`의 해제 분기 하나를 제거하는 것으로 충분하고 durable 형식은
  바뀌지 않는다.
