---
id: 22
title: needs_human은 자동 알림으로 관측되고 재진입은 두 클릭뿐이다
status: accepted
date: 2026-09-02
summary: 'needs_human은 Discord 푸시로 자동 관측되고 재진입은 [정리 재시도]와 기록 세션 resume 기반 Discord 중계 대화형 [세션에서 해결] 두 클릭뿐이며 자동 수리 dispatch 금지는 유지된다'
supersedes: [5]
spec: docs/superpowers/specs/2026-09-01-needs-human-notify-reentry-design.md
bead: UI-jw27
---

# needs_human은 자동 알림으로 관측되고 재진입은 두 클릭뿐이다

## Context

ADR 0005는 post-merge 실패를 `needs_human`으로 종단시키고 재진입을 사람의
클릭으로 한정했다. 그 결정은 옳았지만 **관측**을 다루지 않았다. 결과로 남은
공백이 실제 사건이 됐다.

`server/worker/notify.js`의 전이는 7종
(`started`·`resume`·`conflict`·`failed`·`pr_wait`·`merged`·`awaiting_user`)뿐이고
`failed`는 attempt 세션 실패 전용이다. 사용자가 명시적으로 클릭해 시작한
작업이 실패하거나 커널이 `needs_human`으로 종단해도 어휘에 자리가 없었다.
2026-08-31 `PROSTATE-0yz` 조사에서 사용자가 [폐기]를 두 번 클릭했고 두 번 다
`submodule_observation_failed`로 실패했는데 **알림이 한 건도 가지 않았다**.
`[worker.notify]`는 켜져 있었고 같은 기간 다른 전이는 정상 발송됐다. 사용자는
화면의 버튼이 [재시도]로 바뀐 것을 보고서야 실패를 알았고 그 사이 bead는 멈춰
있었다.

"재진입은 사람 클릭뿐"은 사람이 실패를 **알 때** 성립하는 규칙이다. 화면을
보고 있지 않으면 클릭할 사람이 없다는 사실을 0005는 계산에 넣지 않았다.

두 번째 공백은 클릭 이후다. 0005 이후 사람이 실제로 하던 일은 터미널을 열어
그 Bead의 세션 맥락을 되짚는 것이었는데, 그 작업이 도구 밖에 있었다. UI-7uid
시절의 "headless 세션은 TUI로 이어받을 수 없다"는 전제도 그사이 폐기됐다
(dotfiles `2026-09-01-fullplan-phase-carryover-contract-design` §4).

## Decision

`needs_human` 종단과 사용자 개시 작업의 terminal 실패는 **자동으로 관측**되고,
재진입은 **두 클릭**뿐이다.

1. **알림은 자동이다.** 전이 하나 `needs_human`을 어휘에 더하고, 실패 종류는
   본문의 `클래스:` 줄로 가른다(폐기 실패·배포 실패·post-merge 잡 실패·정리
   중단·수동 배포 실패). 발송은 durable terminal 기록을 **쓰는 그 순간에만**
   1건이므로 재관측·재시작 복구 pass가 알림을 재생하지 않는다. 같은 실패가 두
   기록 경로를 지나는 배포·잡 실패의 발송 소유는 `terminalize()` 한 곳이다.

2. **재진입은 `[정리 재시도]`와 `[세션에서 해결]` 두 클릭이다.** 앞의 것은
   기존 `[정리]`/`정리 재개` 계열의 개칭·표면 통합이며 재개 의미론은 불변이다.
   뒤의 것은 그 Bead의 기록 세션을 `--resume … --fork-session`으로 이어받는
   대화형 tmux 세션을 띄우고, 외부 `claude-discord-bridge`가 marked pane을 집어
   Discord로 중계한다. fork가 기본인 이유는 원 transcript를 불변으로 두어
   Worker의 후속 resume과 간섭하지 않기 위해서다. resume이 불가능하면 새 세션 +
   notes 계보 인용으로 떨어지되 **사유를 응답에 싣는다** — fork와 fresh는 밖에서
   같아 보이고 사람은 그 차이 안에서 일하게 된다.

3. **자동 수리 dispatch 금지는 그대로다.** `[세션에서 해결]`이 띄우는 것은
   0005가 폐기한 자동 수리 세션이 아니라, 사람이 터미널에서 손으로 열던 그
   세션이다. 기동하는 것은 오직 클릭이며 자동 경로는 없다. Bead당 살아 있는
   해결 세션은 tmux pane 마커가 하나로 강제한다.

설정 토글은 두지 않는다. `script_retry` 한 단계 뒤 `needs_human` 종단이라는
0005의 사다리도 그대로다.

## Considered Options

- **자동 수리 dispatch를 되살린다.** 알림이 없어 사람이 못 온다면 기계가 가면
  된다는 방향. 0005가 기각한 이유(수리 시도의 로그가 실패 원인을 덮는다)가
  하나도 해소되지 않았으므로 기각했다. 문제는 "누가 고치나"가 아니라 "사람이
  실패를 아는가"였다.
- **알림 여부를 설정 토글로 연다.** 정본이 "설정 토글 없음"을 이미 정했고,
  `[worker.notify] enabled`라는 상위 스위치가 이미 있다. 실패 클래스마다 토글을
  더하면 "왜 이 알림만 안 왔나"라는 새 진단 표면이 생긴다.
- **전이를 실패 종류마다 하나씩 만든다.** 푸시 프리뷰의 첫 줄은 예산이 좁고,
  다섯 개의 내부 write 경로 중 무엇이 실패했는지는 `클래스:` 줄이 이미 답한다.
  전이를 늘리면 기존 7종의 의미 경계만 흐려진다.
- **`--resume`으로 원 세션을 그대로 이어받는다(fork 없이).** Worker가 같은
  세션을 나중에 resume하는 경로가 있어 transcript가 두 갈래로 섞인다. fork는
  그 간섭을 구조적으로 없앤다.

## Consequences

- 쉬워지는 것: 화면을 보고 있지 않아도 실패가 도달한다. 알림 본문이 클래스·원인
  코드·권장 다음 행동을 실어, 클릭 전에 무엇을 누를지가 정해진다.
- 어려워지는 것: 발송 지점이 durable write 경계에 묶여 있어, 새 terminal 실패
  경로를 추가하는 작업은 그 write에서 발송까지 함께 배선해야 한다. 사다리를 타는
  단계와 즉시 종단하는 단계의 구분도 유지 대상이다.
- 배제되는 것: 자동 수리 세션 dispatch(0005의 금지 그대로), 실패 클래스별 알림
  토글, 클릭 없는 해결 세션 기동.
- 남는 것: `[worker.notify] enabled=false`면 아무것도 spawn되지 않고, 알림
  실패는 어떤 경우에도 큐 전이 실패가 되지 않는다(fire-and-forget·NO-THROW).
