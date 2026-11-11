---
id: UI-iopp
title: 한도 대응 저장소 정책·활성 계정 자동 전환과 사용자 순서 후보
status: superseded
superseded_by: UI-d9c1
date: 2026-11-11
summary: "Claude 자동 전환 후보도 Codex처럼 허용 목록의 사용자 순서로 고른다 — Worker 전환은 그 저장소 정책 허용 목록, 전역 활성 계정 전환은 서버 전역 허용 목록에서 기존 거름을 통과한 첫 계정이며 주간 사용률·긴 창 부하 정렬은 쓰지 않고, 설정 창과 일괄 적용은 Claude 허용 목록에도 순서 이동을 둔다 — 나머지 조항은 UI-32oq 그대로다"
supersedes: ["UI-32oq"]
bead: UI-iopp
---

# 한도 대응 저장소 정책·활성 계정 자동 전환과 사용자 순서 후보

## Status

Accepted (quick_fix Bead `UI-iopp`).

## Context

UI-32oq: "Codex 자동 전환 후보의 사용자 순서와 크레딧" 조항의 머리 문장·순서 항목·"Claude 후보 선택(긴 창 부하
순)…" 줄 변경과 화면 순서 항목 신설, "전역 활성 Claude 계정의 복귀" 조항의 머리 문장·후보 항목 변경, 나머지 유지.

UI-iopp(2026-11-11 사용자 결정): Codex는 허용 목록의 사용자 순서(▲/▼)로 다음 계정을 고르는데 Claude는 두
경로 모두 사용량 정렬이었다 — 전역 활성 계정 전환(`server/claude-active-return.js` `pickClaudeCandidate`)은
주간 사용률 낮은 순·번호 순, Worker 전환(`server/worker/scheduler.js` `selectProviderSwitchAccount` Claude
분기)은 긴 창 부하 낮은 순. UI-9y1k는 요청 범위 밖이라며 Claude를 뺐을 뿐 설계상 이유는 없었다. 사용자는
Claude도 Codex와 같은 규칙·같은 화면으로 순서만 따르기로 정했고(대안: 러너별 순서/덜 쓴 계정 선택 스위치),
기존 목록은 이전 없이 저장된 번호 순을 초기 순서로 쓰기로 했다(대안: 첫 적용 때 사용량 순 재정렬). 이 결정은
UI-32oq의 Codex 후보 순서 조항과 Claude 활성 복귀 조항, 그 소비자(scheduler 후보 선택, Claude 활성 패스, 설정
창 한도 대응 편집기, 일괄 적용)를 함께 바꾸므로 UI-32oq를 대체하고 그 조항 전부를 아래에 다시 적는다. 아래는
UI-32oq의 Context다.


UI-giog: "한도 대응의 전역 적용 범위" 조항을 "한도 대응은 저장소 정책, 서버 전역은 활성 계정 자동 전환"으로
변경, "활성 계정 자동 전환의 default 계정과 복귀" 조항 신설, "유효 보류"의 전환 정책 문장·Codex 후보 순서·
두 활성 복귀 조항의 정책 기준·트리거·후보·보이는 것·창 소진 복귀의 범위 문장 변경, 나머지 유지.

2026-11-10 사용자 지적: UI-giog의 `적용 범위: 저장소별 / 전역` 스위치가 저장소에 저장한 한도 정책을 읽기
시점에 덮어써, 설정 화면의 저장소 값과 실제 판정 값이 갈라져 헷갈린다. 원하는 구조는 두 갈래다 — 저장소
Worker는 그 저장소 정책으로 전환하고, beads-ui가 고르는 현재 로그인은 서버 전역 설정이 자동으로 바꾼다.
그리고 default 계정이 차서 다른 계정으로 옮겼으면, 리셋된 뒤 default로 돌아와야 한다. 사용자 결정
(2026-11-10): 두 갈래는 서로 덮어쓰지 않고, 모든 저장소에 같은 값을 넣는 일은 "여러 저장소" 일괄 적용(값을
각 저장소에 실제로 적음)으로 한다. 덮어쓰기를 없앨 때 각 저장소는 저장해 둔 값을 따른다. default 계정은
처음에 비워 두고 사용자가 지정한다. 고정 계정이 빈 기다림 저장소는 활성 로그인을 따라가게 두고 경고만 한다
(`docs/superpowers/specs/2026-11-10-settings-one-window-account-switch-split-design.md`).

이 결정은 UI-giog의 전역 적용 범위 조항을 뒤집고 소비자(`server/limit-policy-settings.js` 설정 파일과 WS
채널, 스케줄러 정책 읽기, 큐 저장소 판정·재결속, 세션 Codex 후보 조회 API, 두 활성 전환 패스)가 같다. 그래서
이 ADR이 UI-giog를 대체하고 그 조항 전부를 아래에 다시 적는다. 설정 창에서 이 값들을 어디에 그리는지는
ADR UI-32oq-2가 정한다. 아래는 UI-giog의 Context다.

UI-btp3: 한도 대응 전역 적용 범위 조항 신설, 두 활성 복귀 조항의 정책 기준·기다림 보호·트리거·보이는 것과
"유효 보류"의 전환 정책 문장 변경, 나머지 유지.

2026-11-09 Worker `ops` 알림 `🔁 Claude 활성 계정 자동 전환 — 계정 #3 → 계정 #4`를 본 사용자가, 설정의
저장소별 `한도 대응: 기다림 / 자동 전환`과 같은 말이라 헷갈린다고 지적했다. 저장소 정책은 그 저장소
Worker가 다음 실행에 쓸 계정을 정하고, 알림의 전환은 Mac 전체 로그인을 바꿔 대화형 세션·Hermes·계정 없는
Worker attempt 모두에 영향을 준다. 그런데 전역 전환은 자기 설정 없이 저장소 정책을 빌려 판정했다(활성과
후보를 함께 허용한 switch 저장소가 있어야 하고, 기본 계정 없는 wait 저장소가 있으면 보류). 사용자
결정(2026-11-09): 저장소마다 기다림/자동 전환이 다를 수 있으므로 전역 교체가 저장소별 설정을 따르는 것은
맞지 않다. 러너(Claude·Codex)별 적용 범위 스위치로 전역 설정과 저장소별 설정 중 하나를 고르고, 끄면 전역
로그인은 자동으로 바꾸지 않으며, 전역 설정 블록은 모니터 ⚙ `전역` 탭에만 둔다
(`docs/superpowers/specs/2026-11-09-global-limit-policy-override-design.md`).

이 결정은 UI-btp3의 활성 복귀 조항(정책 기준·기다림 보호·고정 100% 트리거)을 바꾸고 소비자(활성 복귀
패스·스케줄러 정책 읽기·큐 저장소 판정·후보 조회 API)가 같다. 그래서 이 ADR이 UI-btp3를 대체하고 그 조항
전부를 아래에 다시 적는다. 아래는 UI-btp3의 Context다.

UI-tyc2: 소진된 전역 활성 Claude 계정의 복귀 조항 신설, 나머지 유지.

사용자 결정(2026-11-07, dotfiles 세션): Codex처럼 Claude도 전역 활성 계정이 한도에 닿으면 여유 계정으로
바꾸되, `cswap auto` 상시 실행이 아니라 beads-ui가 저장소별 자동 전환·기다림 정책을 지키며 판정한다.
트리거는 "90 이 아니라 100까지 채우고 전환하도록 하는게 나을듯"이고, 기다림 저장소 네 곳은 보호 규칙을
유지한 채 Claude 기본 계정을 unist로 두며, 판정 창은 5시간·주간뿐이다. 그동안 활성 계정으로 도는 대화형
세션, Hermes, 계정을 지정하지 않은 Worker attempt가 모두 한도 오류로 섰다. Claude attempt의 72%가 계정
없이 떠서 Codex의 계정 없는 실행 거름을 그대로 쓰면 전환이 거의 일어나지 않고, 계정 없는 attempt의 오류는
정산 시점의 활성 계정에 귀속되므로 전환 직후 정산된 직전 계정의 거절이 새 활성 계정을 보류할 수 있다
(`docs/superpowers/specs/2026-11-07-claude-active-account-auto-switch-design.md`).

이 결정은 UI-tyc2의 활성 복귀 조항을 Claude로 넓히고 소비자(활성 복귀 패스·전환 잠금·기다림 추종)가
같다. 그래서 이 ADR이 UI-tyc2를 대체하고 그 조항 전부를 아래에 다시 적는다. 아래는 UI-tyc2의 Context다.

UI-ftww: 소진된 전역 활성 Codex 계정의 복귀 조항 신설, 나머지 유지.

사용자 결정(2026-10-21, Telegram Hermes): "자동전환을 선택한 경우에만 여유있는 계정을 전환에 허용한
계정 안에서 바꾸는거로 하고 기다림으로 한 경우에는 바꾸지 말고 전역 active 계정을 유지하도록 하자".
2026-10-20 저녁 크레딧을 쓴 Codex 호출은 Worker attempt가 아니라 Claude 세션의 리뷰 위임
(codex-runner)이었고, codex-runner는 전역 활성 계정(`~/.codex`)으로 시작한다. hanmail은 크레딧이 있어
5h 창 100%에서도 실패하지 않으므로 후보 조회 API가 불리지 않았고, gmail의 5h가 0%로 돌아온 뒤에도
hanmail이 활성으로 남아 크레딧을 썼다. UI-ftww 스펙이 비목표로 둔 "launch 경계의 복귀는 이미 된다"는
전제가 크레딧 계정에서는 성립하지 않았다
(`docs/superpowers/specs/2026-10-21-codex-active-account-auto-return-design.md`).

이 결정은 UI-ftww의 소진 복귀 조항을 Worker attempt에서 전역 활성 계정으로 넓히고 소비자(후보 선택·
소진 판정·기다림 추종)가 같다. 그래서 이 ADR이 UI-ftww를 대체하고 그 조항 전부를 아래에 다시 적는다.
아래는 UI-ftww의 Context다.

UI-gggh: 창이 소진된 Codex 계정 실행의 복귀 조항 신설, 나머지 유지.

사용자 결정(2026-10-20, Telegram Hermes): "크레딧으로 진행하다가 계정중에 하나라도 사용량
리셋되면 그 계정으로 전환해서 진행하도록 하자". 같은 날 두 해결 방식 중 코드로 해결을 골랐다
(대안: switch 모드 저장소마다 Codex `preempt_pct`를 켜는 설정 해결). 2026-10-20 실측에서 switch
모드인 모든 저장소의 Codex 정책이 `preempt_pct: null`이었고, 그래서 크레딧으로 시작한 Worker
attempt는 다른 계정의 창이 리셋돼도 끝까지 크레딧으로 돌았다
(`docs/superpowers/specs/2026-10-20-codex-credit-return-to-reset-account-design.md`).

이 결정은 UI-gggh가 UI-9y1k·UI-inge에서 승계한 선제 전환 조항("실행 중 attempt는 `preempt_pct`에서
정지", "선제 전환은 크레딧 계정으로 가지 않는다", "상한은 다음 선택만 막는다")에 트리거를 더하고
소비자(scheduler 실시간 선제 전환·디스패치 선제 전환·재개 계정 해석·후보 선택)가 같다. 그래서 이
ADR이 UI-gggh를 대체하고 그 조항 전부를 아래에 다시 적는다. 아래는 UI-gggh의 Context다.

UI-9y1k: 다른 러너 리프 한도의 교차 멤버 조항 신설, 나머지 유지.

2026-10-20 실측(UI-refs·dotfiles-2jg41): Worker attempt(러너 claude)가 codex-runner bridge로 맡긴
Codex 리프가 `usage_limit`(워크스페이스 크레딧 소진)으로 실패하고 전환 후보도 없자 세션은
`대기 · recovery:provider`로 끝났다. 세션 자신의 `rate_limit_event`는 모두 `allowed`라 대기가
공급자 보류에 묶이지 않았고, Codex 계정이 회복돼도 프로브·해제·자동 재개가 없었다. 증거는 스트림
안 bridge 결과 매니페스트(`bridge_result`)뿐이다
(`docs/superpowers/specs/2026-10-20-codex-leaf-limit-provider-hold-design.md`).

이 결정은 UI-9y1k의 "자동 전환 모드와 기다림 대상 밖 멤버의 재개 계정은 멤버십의 계정" 조항에
예외를 더하고 소비자(scheduler 보류 진입·재개, queue-store 멤버십 정산·전환·기다림 추종)가 같다.
그래서 이 ADR이 UI-9y1k를 대체하고 그 조항 전부를 아래에 다시 적는다. 아래는 UI-9y1k의 Context다.

UI-np4t: Codex 자동 전환 후보의 선택 순서·크레딧 조항 신설, 나머지 유지.

사용자 결정(2026-10-19): Codex 계정 한도에 닿은 실행이 이어 갈 다음 계정은 beads-ui가 고른다.
자동 전환 계정의 순서는 사용자가 beads-ui에서 정하고, 한도가 찼어도 크레딧이 남은 계정을 후보에
넣되 켜기·끄기와 하루 상한을 설정 화면에서 바꾼다. 2026-10-19 실측에서 주간 100%인 계정이
`codex exec`에 성공하며 크레딧이 자동 차감됐다 — 크레딧은 설정 없이 한도 뒤에 쓰이므로 크레딧
사용을 막는 길은 그 계정을 후보에서 빼는 것뿐이다. dotfiles-8okoi(dotfiles 브리지의 리뷰·advise
consult·Codex 구현 리프)가 같은 규칙을 조회 API로 쓴다
(`docs/superpowers/specs/2026-10-19-codex-switch-order-credits-design.md`).

이 결정은 UI-np4t가 UI-inge에서 승계한 자동 전환 조항(허용 계정 집합·후보 건강 임계·선제
전환)과 소비자(scheduler 후보 선택)가 같다. 그래서 이 ADR이 UI-np4t를 대체하고 그 조항 전부를
아래에 다시 적는다. 아래는 UI-np4t의 Context다.

사용자 결정(2026-10-16): Claude 한도 대응 `기다림`은 "자동으로 다른 계정을 고르지 않는다"는
뜻이다. 그런데 ADR UI-3v1h는 해제 정산의 재개 계정을 멤버십의 계정, 곧 한도에 걸렸던 계정으로
정했다. 그래서 hanmail이 한도에 걸린 뒤 사용자가 활성 계정을 unist로 바꿔도, 보류 attempt는
hanmail 리셋까지 기다렸다가 hanmail로 재개되고 카드도 그 리셋 시각을 보였다. 사용자
결정(2026-10-17): 재개 계정의 기준은 지금 새로 디스패치하면 쓸 계정(Bead 핀 > 저장소 기본 >
활성 로그인)이고, "여유"의 기준은 새 디스패치와 같은 게이트이며, 활성 계정 변경은 bdui 전환
경로·카탈로그 관찰·대상 멤버가 있는 동안의 주기 읽기로 감지한다
(`docs/superpowers/specs/2026-10-17-wait-mode-hold-follows-active-account-design.md`).

이 결정은 UI-3v1h의 재개 계정 조항 하나를 뒤집고 소비자 집합(queue-store 정산, scheduler
receipt 소비·재평가, provider-health 해제 경로)이 같다. 그래서 이 ADR이 UI-3v1h를 대체하고
그 조항 전부를 아래에 다시 적는다. 아래는 UI-3v1h의 Context다.

공급자 보류(`provider_hold`)는 저장소마다 자기 `queue.json`에만 있었다. 디스패치 게이트,
프로브, 진입·회복 알림, 대기 행 칩, 전환 후보 제외가 모두 그 저장소 안에서만 동작했다.
2026-10-06 실측에서 beads-ui 큐가 claude `usage_limit`으로 보류된 뒤에도 dotfiles 큐는
같은 계정으로 디스패치했고, 6초 뒤 같은 계정·같은 `resets_at`으로 따로 보류에 들어갔다.
2026-09-09에는 같은 outage target이 두 큐에 따로 서서 손으로 풀었다. 한도의 실제 범위는
`usage_limit`이면 계정이고 outage이면 러너인데, 보류의 범위가 저장소라서 저장소 N개면
같은 한도에 최대 N번 헛디스패치하고 프로브와 알림도 N번 일어났다.

사용자 결정(2026-10-06): 보류는 서버 전역에서 공유한다. `usage_limit`은 계정 단위,
outage는 러너 단위다. 원본은 서버 전역 하나로 두고 저장소마다 복제하는 대안은 기각했다.

ADR UI-a5l2는 UI-inge에서 공급자 게이트·전환·프로브·재개 조항을 승계했다. 이 결정은 그
조항들과 소비자 집합(queue-store 진입·해제·정리, scheduler 게이트·전환·선제 전환,
provider-health 프로브, attach wait-judge 입력, `decorateQueue` 투영, 모니터 조립)이 같다.
그래서 이 ADR이 UI-a5l2를 대체하고 그 조항 전부를 아래에 다시 적는다.

## Decision

**공급자 보류의 원본은 서버 전역 하나다. 계정 범위 target(`usage_limit`·계정이 있는
`credential` outage)은 그 계정을, 그 밖의 outage는 러너를 모든 저장소에서 막는다. 막는
대상은 디스패치·전환 후보·선제 전환이다. 계정 미해석 target만 그 저장소에 남는다. 저장소는
보류 attempt의 멤버십을 `target_id`와 계정으로 가리킨다. 해제는 전역에서 한 번 일어나고,
각 저장소가 자기 멤버십을 정산한다. receipt는 그 attempt가 다시 보류됐을 때만 stale이다.**

- **전역 원본.** 서버 전역 상태 파일 하나(`$XDG_STATE_HOME/bdui/provider-holds.json`)가
  러너별 `{since, generation, targets[]}`를 담고, 프로세스 싱글턴이 소유한다. target은
  처음 생길 때 정하는 불변 `target_id`와 처음 관측한 저장소 `origin`을 가진다. 같은
  `(runner, kind, model, account)` 재진입은 병합되고 `target_id`를 유지한다. 프로브의
  재분류(강등·승격)도 `target_id`를 바꾸지 않는다. generation은 전역 단조 카운터다.
- **저장소 멤버십.** 각 큐는 `provider_hold_members`에 보류 attempt가 기다리는
  `target_id`, 그 attempt가 지금 기다리는 계정(진입 때는 target의 계정, 기다림 모드에서
  추종으로 옮겨 가면 옮겨 간 target의 계정), 저장소 정책이 정한 전환 상태를 담는다. 계정을
  함께 영속하는 이유는 attempt 레코드에 보류된 계정이 없을 수 있고, target이 지워진 뒤에도
  정산이 재개 계정이나 기다리던 계정을 알아야 하기 때문이다.
- **보류 범위.** `usage_limit` target은 그 계정, 계정이 있는 `credential` outage는 그
  계정, 그 밖의 outage는 러너 전체를 막는다. 서버 게이트와 클라이언트 칩 예측은 같은
  규칙을 쓴다. 계정 미해석 `usage_limit` target은 전역으로 올리지 않고 그 저장소 큐에
  남아 그 저장소만 fail-closed로 막으며, 프로브하지 않고 수동 재개로만 지워진다.
- **진입.** 전역 생성·병합을 먼저 쓰고, 그다음 큐에 한 번 쓴다(attempt pause·멤버십
  추가·전환 판정과 receipt). 진입 알림은 전역에서 target이 새로 생긴 때만 한 번 보내고
  리포 라벨은 `origin`이다.
- **유효 보류.** 저장소의 유효 보류는 전역 target에 그 저장소의 계정 미해석 target을
  더한 것이다. 디스패치 게이트, 전환 후보에서 빼는 보류 계정 집합, 선제 전환의 "현재
  계정 보류 중" 판정이 이 집합을 읽는다. (UI-32oq, 변경) 전환 정책(`wait | switch`·허용
  계정·`preempt_pct`)은 언제나 그 저장소에 저장된 정책이다(아래 "한도 대응은 저장소 정책, 서버 전역은
  활성 계정 자동 전환").
- **프로브와 해제.** 프로브 컨트롤러는 프로세스에 하나이고, 전역 target마다 타이머
  하나를 무장한다. 해제는 전역 target을 한 번 지우고, attach된 모든 저장소가 자기
  멤버십을 같은 규칙으로 정산한 뒤(자격 검사, 자동 재개 상한이면 disarm, 아니면
  `provider_outage` receipt), 재개 자격이 생긴 attempt가 하나라도 있으면 회복 알림을 한
  번 보낸다. 자동 전환 모드와 기다림 대상 밖 멤버의 재개 계정은 멤버십의 계정이다(기다림
  대상 멤버와 교차 멤버는 아래 조항). 같은 정산이 attachment 시작 때도 돌아,
  해제와 정산 사이의 재시작에도 receipt가 생긴다. 계정 전환 재개의 회복 알림은 전환된
  attempt마다 한 번이다.
- **stale receipt.** `provider_outage` receipt는 그 attempt에 살아 있는 멤버십(가리키는
  target이 전역에 있음)이 있을 때만 버린다. 러너 hold의 generation 변화로는 버리지 않는다.
- **정리.** 정리된 attempt는 멤버십만 빠지고 전역 target은 남는다. 기다리는 attempt가
  없는 `usage_limit` target도 프로브가 해제할 때까지 선다.
- **화면.** 저장소로 보내는 `provider_hold`는 유효 보류 투영이고 모양은 그대로다. 전역
  target의 `attempt_ids`는 그 저장소 멤버십이다. 전역 원본이 바뀌면 attach된 모든 저장소에
  큐 변경 이벤트를 낸다. 같은 Bead 카드는 Worker 탭과 모니터에서 같다.
- **이관.** 저장소별 `provider_hold`의 계정 있는 target과 outage target은 시작 때 멱등하게
  전역으로 옮기고 그 `attempt_ids`를 멤버십으로 바꾼다. 전역 파일을 읽지 못하면 옆에
  보존하고 빈 보류로 시작한다.

### 한도 대응은 저장소 정책, 서버 전역은 활성 계정 자동 전환 (UI-32oq, 변경)

**Worker의 한도 판정은 언제나 그 저장소에 저장된 정책을 쓰고 전역 덮어쓰기는 없다. 서버 전역 설정은 러너
(Claude·Codex)별 활성 계정 자동 전환만 정한다 — 켬/끔(`auto_switch`), default 계정(`default_account`), 옮겨
갈 계정(`accounts`), 옮기는 시점(`preempt_pct`). 모든 저장소에 같은 값을 넣는 일은 일괄 창 "여러 저장소"
적용으로 각 저장소에 값을 실제로 적는다.**

- **저장소 정책.** 스케줄러 정책 읽기, 큐 저장소의 정책 판정(보류 진입 전환 판정·기다림 추종 대상·보류 멤버
  전환 쓰기·전환 예정 유효성), 세션용 Codex 후보 조회 API는 저장소 정책을 정규화해 쓰고 서버 전역 설정을
  읽지 않는다.
- **전역 설정.** 러너별 `{ auto_switch, default_account, accounts, preempt_pct }`다. 서버 전역 상태 파일
  하나(`$XDG_STATE_HOME/bdui/limit-policy-settings.json`, UI-giog의 이름 그대로)가 소유하고, 읽기는
  fail-quiet(파일을 읽지 못하면 두 러너 모두 자동 전환 끔, 저장소 정책에는 영향 없음), 쓰기는 `revision`
  CAS이며 거절하면 아무것도 쓰지 않는다. WS 채널 이름도 UI-giog 그대로다.
- **이전.** 서버가 시작할 때 옛 모양(`scope` 있음)을 읽으면 새 모양으로 바꿔 CAS로 한 번 다시 쓴다.
  `auto_switch`는 `scope === 'global' && mode === 'switch' && accounts.length > 0`이고, `accounts`와
  `preempt_pct`는 옮기며, `default_account`는 `null`이다. 같은 쓰기에 `rebind_pending`(`scope: global`이던
  러너, 없으면 빈 배열)을 적는다. 이전 쓰기가 실패하면 읽은 값을 새 모양으로 해석해 동작하고 다음 시작 때
  다시 한다.
- **재결속 재개.** 시작할 때 `rebind_pending`이 비어 있지 않으면 그 러너마다 모든 등록 저장소에서 보류 판정
  재결속(`rebindProviderSwitchVerdicts`)과 전환 재평가를 부르고, 다 끝나면 그 러너를 목록에서 뺀다. 재결속은
  저장소 정책 값을 쓰지 않고 판정만 다시 묶으므로 되풀이해도 결과가 같다. 중간에 멈추거나 저장소 하나의
  재결속이 실패하면 그 러너는 목록에 남고(로그 한 줄) 다음 시작이 처음부터 다시 한다. 저장소 판정이 전역
  설정을 읽지 않으므로 전역 설정 쓰기는 재결속하지 않는다.
- **실행 중 attempt.** 설정 저장과 전역 로그인 변경 자체는 실행 중 attempt를 멈추거나 옮기지 않는다.
- **보이는 것.** 저장소 `한도 대응` 행은 잠그지 않는다. 고정 계정이 빈 기다림 저장소는 활성 로그인을
  따라가며, 그 러너의 자동 전환이 켜져 있으면 계정 탭에 경고만 단다. 전역 설정을 편집하는 자리는 ADR
  UI-32oq-2가 정한다.

기각한 대안(UI-32oq): 적용 범위 스위치 유지(덮어쓰기가 화면의 값과 실제 값을 갈라 놓았다 — 사용자 결정),
덮어쓰기를 없애며 전역 값을 저장소에 복사(저장소마다 저장해 둔 값을 따른다는 사용자 결정), 고정 계정이 빈
기다림 저장소 잠금(경고만 둔다는 사용자 결정).

### 활성 계정 자동 전환의 default 계정과 복귀 (UI-32oq, 신설)

**default 계정은 자동 전환이 출발하고 돌아오는 기준 계정이다. 자동 전환이 default에서 떠나면 떠남 기록을
재시작을 넘어 남기고, 그 소진 창의 리셋 시각이 지나고 default의 판정 창이 모두 트리거 미만이면 default로
돌아온다. 관측한 활성 계정이 기록과 다르면 사람이 바꾼 것으로 보고 기록을 지운다.**

- **기준 계정.** default는 허용 목록에 넣지 않아도 출발하고 돌아온다. 활성이 default도 허용 목록 안 계정도
  아니면 바꾸지 않는다(`active_not_allowed`). 초기값은 비어 있고(`null`) 사용자가 지정한다.
- **떠남 기록.** `{ default_account, to_account, until }`을 서버 상태 파일
  (`$XDG_STATE_HOME/bdui/active-login-return.json`)에 둔다. 읽기는 fail-quiet이고 깨졌거나 없으면 기록
  없음이라 복귀하지 않는다. 기록은 자동 전환이 성공한 뒤에만 쓴다. 전환 전 활성이 default였으면 새 기록을
  쓰고, `until`은 트리거 이상이던 default 창들의 `resetsAt` 중 가장 늦은 시각(하나라도 없으면 `null`)이다.
  기록이 있고 전환 전 활성이 기록의 `to_account`였으면 `to_account`만 새 계정으로 바꾼다. 전환이 실패하면
  기록을 건드리지 않는다.
- **복귀.** 기록이 있고, 관측한 활성이 `to_account`이며, 기록의 default가 지금 설정의 default이고, `until`이
  없거나 지났으며, 계정 목록의 default 행이 상태 `ok`이고 판정 창이 하나 이상 보고됐고 그 창이 모두 트리거
  미만이면 default로 바꾼다. 활성이 트리거 미만인 상태에서도 판정한다. default 행이 없거나 자료가 모자라면
  복귀하지 않고 기록을 유지한다. 복귀 시점은 "리셋되면 바로" 하나다. default가 복귀 조건을 채우면 떠남
  판정에서도 default가 첫 후보다.
- **기록 종료.** 관측한 활성이 default면 지운다. 갱신 판정 뒤에 관측한 활성이 `to_account`도 default도
  아니면 사람이 바꾼 것(터미널 `cswap switch` 포함)으로 보고 지운다. 설정에서 default를 바꾸거나 자동
  전환을 끄면 지운다.
- **안전장치.** 복귀도 떠남과 같은 공급자 잠금, 잠금 아래 새 목록 재판정, 보류 계정·실행 중 계정 제외
  (Claude `sessionLoginOwn` 예외), Codex 계정 없는 실행 거름, Claude 전환 직후 오류 귀속을 쓴다. Codex
  타이머는 떠남 기록이 있는 동안에도 돈다.
- **보이는 것.** `ops` 알림은 떠남 `🔁 <러너> 활성 계정 자동 전환 — <from> → <to>`에, 기록이 있으면 복귀
  안내(`default 리셋 <HH:MM> 뒤 복귀`, `until`이 없으면 `default 사용량 회복 확인 뒤 복귀`)를 덧붙이고, 복귀는
  `↩ <러너> default 계정으로 복귀 — <from> → <default>`다. Claude 복귀는 실행 중 세션도 곧 새 계정을 쓴다고
  적는다. 계정은 로그인 이메일로 보인다. 설정 채널 스냅샷이 떠남 기록을 읽기 전용으로 싣고(revision은
  움직이지 않는다), 기록이 바뀌면 다시 보낸다.

기각한 대안(UI-32oq): 떠남 기록을 메모리에 두기(머지마다 재배포되어 복귀가 사라진다), "실행 중 세션이 없을
때" 복귀(beads-ui가 띄우지 않은 대화형 세션은 관측할 수 없다), default 없이 소진 계정만 피하기(사용자가
default로 돌아오기를 원했다).

### 자동 전환 후보의 사용자 순서와 Codex 크레딧 (UI-9y1k 신설, UI-iopp 변경)

**(UI-iopp, 변경) Claude와 Codex 자동 전환 후보는 모두 저장소 정책 허용 목록(`accounts`)의 배열 순서, 곧
사용자 순서로 고른다. Codex는 창 여유 계정을 먼저 고르고, 반응 전환에서만 계정별 크레딧 허용·하루 상한 안의
크레딧 계정을 고른다. 크레딧 설정은 서버 전역이고, 세션은 같은 규칙의 Codex 후보 조회 API를 쓴다.**

- **순서.** 기본 거름(ok·현재 아님·보류 아님·제외 아님)과 창 기준(후보 건강 임계, 선제 전환이면
  `preempt_pct` 미만)은 거름으로만 남고, 통과한 계정 중 허용 목록 순서상 첫 계정을 고른다. (UI-iopp,
  변경) 긴 창 부하 순 정렬은 Claude·Codex 어디에서도 쓰지 않는다. Claude의 거름은 기존 Worker 후보
  기준(상태 `ok`·현재 아님·보류 아님, 보고된 창이 하나 이상이고 `5h`는 80% 이하·그 밖의 창은 90% 이하,
  선제 전환이면 `preempt_pct` 미만) 그대로다. (UI-32oq, 변경) 순서는 그 저장소 정책의 허용 목록 순서이며 저장
  형태는 기존 허용 목록 그대로다. 전역 활성 계정 전환은 서버 전역 설정의 허용 목록 순서를 쓴다(아래 활성
  복귀 조항).
- **크레딧 패스.** 창 여유 계정이 없을 때만, 반응 전환(한도 도달 뒤)에서 같은 순서로 그 계정의
  크레딧 허용이 켜져 있고 쓸 크레딧이 있으며(`unlimited` 또는 잔액 양수) 오늘(KST) 소모가 그
  계정 하루 상한 미만(`unlimited`면 상한 미적용)인 첫 계정을 크레딧 모드로 고른다. 선제 전환은
  크레딧 계정으로 가지 않는다.
- **상한의 뜻.** 상한은 다음 후보 선택만 막는다. 이미 그 계정으로 시작한 Worker attempt·브리지
  실행은 멈추지 않는다. 하루 소모는 성공한 새 API 관측의 잔액 감소 누적이고, 잔액 증가(구매)는
  기준만 옮긴다.
- **전역 크레딧 설정.** 계정별 크레딧 허용과 하루 상한은 서버 전역 상태 파일 하나가 소유한다
  (잔액이 계정에 붙어 있어 저장소별 상한은 합계가 상한을 넘는다). 기본값은 꺼짐이고, 손상된
  파일은 꺼짐으로 읽는다. 상한 기본값의 소유자는 크레딧 저장소 모듈 상수다.
- **같은 함수.** Worker의 반응 전환·선제 전환과 세션용 `POST /api/codex/switch-candidate`가 같은
  선택 함수를 쓴다. 조회 응답은 계정 번호와 미러 `CODEX_HOME`만 싣고 이메일·계정 키는 싣지 않는다.
- (UI-iopp, 변경) 기다림 모드 추종은 바뀌지 않는다. Claude에는 크레딧 패스와 후보 조회 API가 없다.
- **화면의 순서.** (UI-iopp, 신설) 설정 창의 한도 대응 편집기(저장소 `계정` 탭과 `활성 계정` 탭이 공용)와
  일괄 적용은 Claude 허용 목록도 Codex처럼 허용 계정을 저장 순서대로 ▲/▼와 함께 그리고, 그 뒤에 허용 안 된
  계정을 카탈로그 순서로 그린다. 이동은 곧바로 전체 목록을 저장하고, 일괄 적용은 같은 계정이라도 순서가
  다르면 다른 값으로 본다. 기존 목록은 이전 없이 저장된 순서를 초기 순서로 쓰며 저장 형식은 바뀌지 않는다.

기각한 대안(UI-iopp): 러너별로 순서/덜 쓴 계정부터를 고르는 스위치(Codex와 다른 규칙·다른 화면이 생긴다),
첫 적용 때 기존 Claude 목록을 사용량 순으로 재정렬(저장 형식이 같아도 이전 단계가 생기고 사용자가 ▲/▼로
바로 고칠 수 있다).

기각한 대안(UI-9y1k): 부하 순 유지(사용자 순서가 의미를 잃는다), 저장소별 크레딧 설정(합계가
상한을 넘는다), 크레딧 계정 제외(한도 뒤 남은 크레딧을 못 쓴다), 상한 도달 시 실행 중단(진행 중
작업을 잃는다).

### 전역 활성 Codex 계정의 복귀 (UI-tyc2 신설, UI-32oq 변경)

**(UI-32oq, 변경) Codex 자동 전환이 켜져 있고 옮겨 갈 계정이 있을 때, 전역 활성 Codex 계정(`~/.codex`)의 창
하나라도 트리거에 닿으면 서버는 서버 전역 허용 목록의 사용자 순서로 창 여유 계정을 골라 활성 계정을 바꾸고,
default에서 떠났으면 위 default 조항대로 돌아온다. 자동 전환이 꺼져 있으면 저장소 정책과 무관하게 바꾸지
않는다. 계정 없이 도는 Codex 실행이 있으면 바꾸지 않는다.**

- **트리거.** (UI-32oq, 변경) 서버가 파싱한 Codex 계정 목록마다 판정한다. 트리거 사용량은 서버 전역 설정의
  `preempt_pct`가 있으면 그 값, 없으면 위 조항과 같은 scheduler 상수 `CODEX_EXHAUSTED_WINDOW_PCT`이고,
  크레딧 잔액·허용 여부와 수동 선택 기록은 보지 않는다. 판정을 할 수 있고 활성이 트리거에 닿은 것으로
  관측되는 동안, 그리고 떠남 기록이 있는 동안 캐시 목록을 주기적으로 다시 읽는다(주기는
  `server/codex-active-return.js` 상수가 소유한다).
- **정책 기준.** (UI-32oq, 변경) 자동 전환이 꺼졌거나 허용 목록이 비면 판정하지 않는다. 후보는 허용 목록의
  창 여유 패스만이고(`kind: 'preempt'`, 크레딧 계정으로 가지 않음) 판정 창이 모두 트리거 미만이어야 한다.
  활성이 default도 허용 목록 안 계정도 아니면 바꾸지 않는다 — 사용자가 소진 계정을 일부러 활성으로 두려면
  허용 목록에서 뺀다.
- **실행 거름.** 계정 없이 도는 `running` Codex attempt가 있으면 바꾸지 않는다. `running` attempt가
  `codex_account`로 쓰는 계정(러너 무관)과 보류 계정은 후보가 아니다.
- **확정.** 수동 전환과 같은 공급자 잠금(`in_flight_providers`)을 쥔 채 새로 읽은 목록과 다시 읽은
  전역 설정·보류·실행으로 다시 판정하고(UI-giog, 변경), 그 판정과 전환 사이에 다른 읽기를 기다리지 않는다. 잠금을
  쥔 동안의 수동 전환 요청은 `switch_in_flight`다. 전환 실행은 수동 전환 경로 그대로다(`codex-auth
  switch`, 캐시 무효화, `notifyAccountSwitched` → 기다림 추종).
- **보이는 것.** (UI-32oq, 변경) 전환하면 `ops` 알림 하나(`활성 계정 자동 전환`, 계정은 이메일)이고, 떠남
  기록이 있으면 복귀 안내를 덧붙인다(위 default 조항). 보류 알림은 없다. 실행 중인 호출의 계정은 바뀌지 않고
  새로 시작하는 호출부터 적용된다.
- 이 조항은 아래 "자동 전환 모드의 동작과 실행 중 attempt는 활성 계정 변경에 반응하지 않는다"(UI-np4t)를
  바꾸지 않는다. 활성 전환은 기다림 추종을 부를 뿐이다.

기각한 대안(UI-tyc2): switch 저장소 허용 목록의 합집합(순서가 정해지지 않고 어느 저장소도 함께 허용하지
않은 이동을 만든다), 기다림 저장소가 있으면 무조건 금지(기본 계정으로 격리된 저장소까지 막아 지금
설정에서 기능이 서지 않는다), 보류 멤버가 있을 때만 막기(새 디스패치와 멤버십이 지워진 receipt 재개를
놓친다), 크레딧 사용 중일 때만(크레딧 없는 소진 계정도 다음 호출마다 헛 한도 실패를 낸다), dotfiles
codex-runner 시작 시점 확인(사용자가 범위에서 뺐다).

### 전역 활성 Claude 계정의 복귀 (UI-btp3 신설, UI-32oq·UI-iopp 변경)

**(UI-32oq, 변경) Claude 자동 전환이 켜져 있고 옮겨 갈 계정이 있을 때, 전역 활성 Claude 계정의 5시간 또는
주간 창이 트리거(서버 전역 설정의 `preempt_pct`, 없으면 100%)에 닿으면 서버는 서버 전역 허용 목록 안에서 두
창이 모두 트리거 미만인 계정 중 (UI-iopp, 변경) 허용 목록 순서상 첫 계정으로 활성 계정을 바꾸고, default에서 떠났으면 위 default 조항대로 돌아온다.
자동 전환이 꺼져 있으면 저장소 정책과 무관하게 바꾸지 않는다. 계정 없이 도는 Claude 실행은 전환을 막지 않고,
전환 직후 정산되는 그 실행의 오류는 직전 계정에 귀속한다.**

- **트리거.** (UI-32oq, 변경) 활성 행의 `5h` 또는 `7d` 창이 트리거 이상일 때만이다. 트리거는 서버 전역
  설정의 `preempt_pct`가 있으면 그 값, 없으면 100이다. 모델별 창은 보지 않고, 창 정보가 없는 활성 행은
  트리거에 닿지 않은 것이다. 기본은 `preempt_pct` 꺼짐이라 100%까지 채운 뒤 전환한다.
- **상시 관측.** Claude 사용량 읽기는 화면과 Worker 경로뿐이라 둘 다 쉬면 소진을 관측할 곳이 없으므로,
  서버가 도는 동안 캐시 목록을 주기적으로 읽는다(주기는 `server/claude-active-return.js` 상수가
  소유한다). 사용량 API 호출 간격은 `cswap`이 지키며 확정 단계도 API 조회를 강제하지 않는다.
- **후보.** (UI-32oq, 변경) 서버 전역 허용 목록 안에서 상태 `ok`, 현재 계정 아님, 보류 계정 아님이고 5h·7d
  중 보고된 창이 하나 이상이며 그 창이 모두 트리거 미만인 계정이다. (UI-iopp, 변경) 그중 서버 전역 허용 목록
  순서상 첫 계정이고, 주간 사용률 정렬은 쓰지 않는다. Worker 후보
  기준(80/90)은 바뀌지 않는다. `running` attempt가 `claude_account`로 쓰는 계정은 후보가 아니되, 그
  계정이 독립 로그인(`sessionLoginOwn`)이면 토큰 계열이 프로필 소유라 빼지 않는다(ADR claude-swap/0001).
- **정책 기준·확정·보이는 것.** (UI-32oq, 변경) Codex 조항과 같다. 자동 전환 끔·빈 허용 목록이면 판정하지
  않고, 활성이 default도 허용 목록 안 계정도 아니면 바꾸지 않는다. 기다림 보호와 보류 알림은 없다.
  잠금·확정·알림 흐름은 Codex 패스와 한 구현을 공유하고 공급자별 규칙만 다르다. 전환 실행은 수동 전환
  경로(`cswap switch`, 캐시 무효화, `notifyAccountSwitched` → 기다림 추종)다.
- **계정 없는 실행.** Codex의 계정 없는 실행 거름을 두지 않는다. 기본 트리거가 100%라 그 실행은 이미 새
  요청을 못 보내고, 전환은 Claude Code의 자격 잠금을 잡고 쓴다.
- **전환 직후 오류 귀속.** Claude 전환이 성공하고 `switched`가 참이면(수동·자동 모두) 서버가
  `{from, to, at}`을 메모리에 남긴다. 계정 없는 Claude attempt의 오류를 정산할 때 현재 활성이 `to`이고
  기록 뒤 귀속 창 안이면 활성 대신 `from`에 귀속한다(창 길이는 scheduler 상수
  `CLAUDE_SWITCH_ATTRIBUTION_MS`가 소유한다). 창이 지났거나 기록이 없으면(서버 재시작 포함) 지금처럼 활성 계정이고, `claude_account`가
  있는 attempt는 언제나 자기 계정이다.
- **왕복 방지 없음.** 전환에는 활성 트리거 이상과 대상 트리거 미만이 함께 필요하고 사용량은 리셋 전까지 줄지
  않으므로 쿨다운을 두지 않는다. 수동 선택 기록도 없다 — 소진 계정을 일부러 활성으로 두려면 허용
  목록에서 뺀다.
- 이 조항도 "자동 전환 모드의 동작과 실행 중 attempt는 활성 계정 변경에 반응하지 않는다"(UI-np4t)를
  바꾸지 않는다. 실행 중 대화형 세션과 계정 없는 Worker 프로세스는 자격을 다시 읽으면 새 계정을 쓰지만
  스케줄러는 반응하지 않는다.

기각한 대안(UI-btp3): `cswap auto` 상시 실행(저장소별 정책을 모른다), 90% 선제 전환(사용자 결정, 한도
전에 실행 중 세션을 옮겨 캐시 재생성 비용이 생긴다), Worker 기준 80/90 후보(활성 계정은 이미 요청이
실패하므로 85% 계정으로라도 옮기는 쪽이 낫다), 모델 창 포함(사용자 결정), 기다림 보호 제외(사용자가
기다림 약속 유지를 골랐다), Codex와 같은 계정 없는 실행 거름(전환이 거의 일어나지 않는다), attempt에 시작
계정 기록(전환 뒤 새 계정에서 난 오류를 옛 계정에 잘못 귀속한다).

### 창이 소진된 Codex 실행의 복귀 (UI-ftww, 신설)

**Codex 실행이 창이 소진된 계정으로 도는 동안 허용 목록에 창 여유 계정이 생기면 `preempt_pct`와
무관하게 그 계정으로 옮긴다. 실행 중 attempt는 실시간 선제 전환(멈춤 → 같은 세션 재개)으로,
새 attempt는 디스패치 선제 전환으로, 재개는 재개 계정 해석으로 옮긴다.**

- **소진 판정.** 현재 계정(실시간 패스는 attempt가 실제로 돈 계정, 디스패치·재개는 해석을 마친
  launch 계정)의 창 하나라도 사용률이 소진 기준 이상이면 소진이다. 기준은 scheduler 상수
  `CODEX_EXHAUSTED_WINDOW_PCT`(기본 100)가 소유하고 `preempt_pct` 저장 범위(1~99) 위에 있어,
  `preempt_pct`를 켠 저장소에서는 기존 임계 판정이 먼저 잡는다. "크레딧 패스로 골랐다"는
  기록이 아니라 관측된 창으로 판정한다. 창 정보가 없거나 계정 목록을 못 읽거나 현재 계정 행이
  없으면 소진이 아니다.
- **후보.** 창 여유 패스만 쓴다(`kind: 'preempt'`, `preempt_pct`가 있으면 그 값을 상한으로).
  다른 크레딧 계정으로는 옮기지 않는다. 후보가 없으면 지금처럼 계속 돈다.
- **범위.** (UI-32oq, 변경) 저장소 정책이 switch 모드이고 허용 목록이 있는 저장소의 Codex 러너만이다. 기다림 모드, Claude
  러너, 세션 레인(`exec: 'session'`)·`review_session`의 실시간 이동은 대상이 아니다. 세션 레인은
  다음 디스패치에서만 복귀한다.
- **재개.** Codex 재개는 `external_wait_resume`과 무관하게 소진 판정만 적용한다. 임계·보류
  트리거는 지금처럼 외부 대기 재개에만 걸린다. 옮기면 launch-only이고 계정 출처는
  `preempt_switch`이며 Bead 계정 핀은 쓰지 않는다. `prior_attempt` 잠금은 계정만 양보하고 기록된
  나머지 묶음을 지킨다.
- **보이는 것.** 실시간 이동은 기존 `account_live_preempt` 타임라인 항목과 알림, 디스패치·재개
  복귀는 기존 `preempt_switch` 계정 출처로 남는다. 새 표시 필드는 없다.
- 이 조항은 "상한은 이미 시작한 실행을 멈추지 않는다"(UI-9y1k)의 예외가 아니다 — 상한은 여전히
  실행을 멈추지 않고, 멈추는 것은 창 여유 계정의 출현이다.

기각한 대안(UI-ftww): 저장소별 `preempt_pct` 설정 해결(저장소마다 켜야 하고 새 저장소에서
빠진다), 다음 launch에서만 복귀(Worker attempt는 한 세션이 길어 다음 launch가 사실상 오지 않는다),
attempt에 `credit_mode` 기록으로 판정(핀·기본 계정이 처음부터 크레딧 계정인 실행을 놓치고 창이
스스로 리셋돼도 낡은 값이 남는다), 다른 크레딧 계정으로도 이동(비용이 같고 상한 회피처럼 보인다).

### 다른 러너 리프 한도의 교차 멤버 (UI-gggh, 신설)

**세션이 맡긴 다른 러너 리프의 계정 한도로 끝난 attempt는 그 리프 계정 보류 target의 교차
멤버가 된다. 교차 멤버는 전환·기다림 추종에서 빠지고, 해제 뒤 자기 러너의 기존 계정 규칙으로
재개한다. 새 해제 경로는 없다 — 해제는 여전히 프로브만 판정한다.**

- **증거.** 세션 결과 줄이 `recovery:provider`이고, 스트림을 뒤에서 훑어 처음 만나는 증거가
  bridge 결과 매니페스트(tool_result 본문 전체가 JSON 객체, `bridge_result.transport ===
  'codex_runner_bridge'`, `error_code === 'usage_limit'`)일 때만이다. 부분 문자열 일치·폴링
  (`bridge_result: null`)·산문은 증거가 아니다. 먼저 만난 증거가 Claude `rate_limit_event`
  `rejected`면 지금처럼 Claude 계정 보류다.
- **target.** 매니페스트의 `account_number`가 Codex 계정 목록에서 정확히 한 행으로 풀리고
  `requested_model`이 Codex 카탈로그 키나 id로 풀릴 때만 `(codex, usage_limit, 모델 키, 계정
  키)` target에 든다. 하나라도 못 풀면 보류하지 않고 recovery 대기로 남는다(fail-quiet). 이
  target은 일반 Codex 계정 보류와 같아서 그 계정의 다른 Codex 디스패치도 막고, Claude
  디스패치는 막지 않는다.
- **교차 멤버.** 멤버십은 교차 표식을 영속하고 전환 상태를 지니지 않는다. 진입 전환·전환
  재평가·보류 attempt 전환·멤버 전환 묶음·기다림 추종의 대상이 아니고, 같은 target 형제
  멤버의 전환 상태를 바꾸지 않는다. 투영의 대표 멤버는 첫 비교차 멤버다.
- **재개.** 해제 receipt의 계정은 null이다. 그래서 재개에 launch-only override가 붙지 않고,
  잠기지 않은 attempt는 자기 러너 계정을 다시 해석하며 `prior_attempt` 잠금 attempt는 기록된
  자기 러너 계정으로 같은 세션을 재개한다. 리프는 다음 실행에서 후보 조회 API로 계정을 고른다.
  무진전 재개 상한·디스패치 차단·폐기·✕ 정리는 일반 멤버와 같다.
- **소급.** 이 조항 이전에 recovery 대기로 남은 행은 reconcile이 영속 세션 로그로 한 번만
  같은 판정을 하고, 판정 표식을 남겨 다시 읽지 않는다.

기각한 대안(UI-gggh): 교차 멤버를 일반 멤버처럼 다룸(Codex 계정 키가 Claude 계정 override로
들어가 영구 거부로 멈춘다), 카탈로그 창 여유를 보고 대기를 직접 재개(프로브만 해제를 판정한다는
조항과 충돌), 정해진 간격의 맹목 재시도(재개 비용과 같은 실패 반복), 수동 재개 유지(요청이 자동
재개), `usage_limit` 부분 문자열 검색(무관한 이벤트에 같은 토큰이 흔하다).

### 기다림 모드의 계정 추종 (UI-np4t)

**기다림 모드에서 계정 범위 `usage_limit` 보류 attempt는 지금의 일반 해석 계정(Bead 핀 >
저장소 기본 > 활성 로그인)을 기다린다. 판정은 새 디스패치와 같은 게이트이고 카탈로그
사용률은 보지 않는다.**

- **대상 멤버.** 러너 정책이 `wait`이고, 묶인 target이 계정 범위 `usage_limit`이며, attempt가
  `switchHeldProviderAttempts`와 같은 조건(일시정지된 `provider_outage:usage_limit`, 철회·
  dismiss·진행 중 폐기·receipt 대기·재개 자식 없음)을 만족하는 멤버십이다. 출처로 가르지
  않는다 — 핀·기본값 attempt는 그 값이 그대로면 해석 계정이 같아 아무 일도 없다. 러너 범위
  outage·`credential` outage·계정 미해석 target은 대상이 아니다.
- **추종 패스.** 해석 계정이 멤버의 계정과 다르고 그 계정의 `usage_limit` target에 막히면
  멤버십을 그 target으로 옮긴다(카드는 그 계정과 리셋 시각을 보인다). 막히지 않으면
  멤버십 제거와 계정 없는 `account_switch` receipt push를 한 쓰기에서 한다. 그 밖의 막힘이나
  읽기 실패(카탈로그·저장소 기본 layer·bd)는 그대로 둔다(fail-quiet). 쓰기는 정책·대상
  조건·옮겨 갈 target의 전역 존재를 그 안에서 다시 읽는다. 원래 target은 프로브가 풀 때까지
  선다.
- **기다림 receipt.** 추종 receipt(`origin: wait_follow`)와 해제 receipt(`origin:
  wait_release`)는 영속 표지와 기다리던 계정(`held_account`)을 지니고 큐 재적재 뒤에도
  보존된다. 해제 정산은 기다림 대상 멤버에 상한을 판정하지 않고 계정 없는 표지 receipt만
  쓴다. 표지 없는 receipt(목록에서 사라진 계정, `credential` outage)는 이전 규칙 그대로다.
- **소비 시점 판정.** 기다림 receipt를 소비하면 먼저 해석 계정과 디스패치 게이트를 본다.
  해석 실패면 receipt를 남겨 다시 본다. 해석 계정이 `usage_limit` target에 막히면 launch하지
  않고 receipt 삭제와 그 target 멤버십 생성을 한 쓰기에서 한다(receipt의 attempt·generation,
  target 존재, attempt 조건을 다시 읽고 어긋나면 아무것도 쓰지 않는다). 해석 계정이
  기다리던 계정과 다르면 `account_switch` 재개로 진척 없는 재개 상한을 쓰지 않고, 같으면
  기존 상한을 여기서 적용한다. 그 밖의 막힘은 이전처럼 재개를 시도한다.
- **잠금과 출처.** 기다림 receipt의 launch 계정은 일반 해석이 정한다. `prior_attempt` 잠금은
  계정 전환과 같이 계정만 양보하고 나머지 tuple과 세션 검증은 지킨다. 재개 attempt의
  `account_sources`는 일반 해석 출처를 적는다.
- **회복 기록.** 재결속으로 끝난 소비는 회복이 아니다. 계정이 바뀐 재개는 계정 전환 회복
  모양으로 attempt마다 한 번, 같은 계정 재개는 공급자 회복 모양으로 기록·알린다. 판정을
  미룬 receipt는 해제의 회복 기록에서 빠지고 나중 소비가 확정할 때 기록된다.
- **감지.** bdui 계정 전환 성공(캐시 무효화 뒤), Claude·Codex 카탈로그 관찰자의 활성 키
  변경, 대상 멤버가 있는 동안의 주기 읽기(기본 60초, 각 러너의 기존 사용량 캐시를 지나며
  Codex 캐시는 무효화하지 않음)가 저장소별 직렬 재평가 패스를 부르고, 그 패스가 추종을
  돈다. 자격 파일은 감시하지 않는다.
- 자동 전환 모드의 동작(전환 후보·`switch_ready_*`·선제 전환)과 실행 중 attempt는 활성 계정
  변경에 반응하지 않는다.

기각한 대안(UI-np4t): 출처(`account_sources`)로 따를 attempt 가르기, 카탈로그 사용률
(100% 또는 80/90) 기준, `switch_ready_*` 재사용으로 시각만 보이기, 자격 파일 감시.

### ADR UI-a5l2에서 승계하는 조항

**가드는 실행 전 거부와 사후 착지 감지로만 강제한다. 텍스트 판정으로 세션을 죽이지 않고,
큐 단위 보류(`queue.hold`)는 어떤 종류도 만들지 않으며, 예방층이 뚫린 유일한 증거인
`base_landing_detected`는 그 Bead의 개별 실패다.**

- **Claude 러너 실행 전 거부.** Worker의 `--settings`에 `hooks.PreToolUse`(matcher
  `Bash`) 한 항목을 실어 attempt별 가드 스크립트(`guard-hooks/<attempt>`에 pre-push 훅과
  함께 설치, base·target 리터럴을 구움)를 부른다. 스크립트는 `command-guard.js`와 같은
  토크나이저로 `gh pr merge`와 **쓰기 동반** `hook_bypass`(같은 명령줄에 `git push`·
  `commit`·`merge`·`rebase`·`tag`·`gh pr merge`가 있을 때의 `--no-verify`·`core.hooksPath`·
  `GIT_CONFIG_*`)에만 `permissionDecision: "deny"`와 거부 문장을 돌려준다. 읽기 전용
  명령에 붙은 hooksPath는 판정하지 않고, `git_push_base`·`base_merge`는 경고 기록이다.
  세션은 거부 사유를 보고 다음 턴을 이어간다. 거부는 timeline `guard_denied`(runner·
  reason·command)로 남는다.
- **Codex 러너 같은 거부.** attempt별 `CODEX_HOME` 미러(`codex-account-home.js`)가
  `hooks.json`에 같은 가드 스크립트를 `PreToolUse`로 싣고 `config.toml`에 그 그룹의 신뢰
  상태(`hooks.state`, canonical JSON SHA-256 fingerprint)를 쓴다. 기존 사용자 훅과 신뢰
  상태는 미러 경로 키로 보존한다. 훅 로드 흔적이 없는 세션은 `guard_warning`
  (`codex_hook_not_loaded`)만 남기고 예방은 `pre-push`가, 우회 push는 사후 감지가 잡는다.
- **kill 제거.** `session-monitor`의 위반 kill(즉시·`guard_pending` tool_result 확정)은
  없다. `GUARD_EFFECTS`는 전부 `warn`이고 `guard_pending` 기록·`hook_bypass_unresolved`
  경고 정리는 유지한다. `loud_fail_blocker`는 대화형 질문 감지 kill(`question_reason`)에만
  남으며 `individual`이다. 거부 스크립트 자체의 오류는 fail-open이고 `guard_warning`
  (`guard_hook_error`)을 남긴다 — 예방층은 `pre-push` 훅이다.
- **큐 보류 부재.** `queue.hold`·`hold_history`·`systemic` 티어·`ALWAYS_SYSTEMIC_CAUSES`·
  `SYSTEMIC_BLOCKER_REASONS`·큐 보류 WS op(`worker-queue-hold-resume`·`-retry-now`)·4a 칩
  `⛔ 정지`·`↻ 환경 보류`는 없다. `runPass`의 `explicit_only`는 `auto_advance !== true`만
  본다. 재시도 예약은 그 Bead의 `retry_wait` 계보만이며 다른 Bead의 출발을 막지 않는다.
  로드 시 남아 있는 `hold`·`hold_history`는 지우고 버린다. `gh_unavailable`·`bd_unreachable`
  은 그 attempt의 개별 env 실패(그룹 `api`)로 같은 사다리를 탄다. 공급자 보류는 큐 단위
  보류가 아니다 — 계정이나 러너 단위로 해당 디스패치만 막는다.
- **사후 감지.** `base_landing_detected`는 그 attempt를 `failed`(개별)로 기록하고 `❌ 실패`
  알림을 1회 낸다. 큐는 계속 간다. 텍스트 판정은 증거가 아니다.

### ADR 0007에서 승계하는 조항 (UI-a5l2 경유)

- 강제층은 두 겹이다: PR로 랜딩하는 attempt마다 `pre-push` 훅을 설치하고 저장소·target
  base를 셸 리터럴로 굽어 `core.hooksPath`를 실은 `GIT_CONFIG_COUNT`로 전달한다; 종단
  임무가 base push 자체인 lane(리뷰를 마친 `quick_fix`·disposition)은 설치 대상에서
  빠지고, 훅은 델타 전체가 `docs/` 아래인 fast-forward를 통과시키고 기록만 남긴다.
  예방층이 강제하는 것은 "세션이 자기 작업을 스스로 머지하지 못한다"다. 사후 ref
  불변식은 실제로 움직인 ref를 사후에 확인한다. `pre-push` 훅의 `guard`·`record`·`deny`
  모드와 선택 규칙(bench=deny, quick_fix lane=record, 그 외 guard)은 바꾸지 않는다.
- 추론성 텍스트 판정(base로 향하는 것처럼 보이는 push 등)은 경고·증거다. 토크나이저가
  해석하지 못한 입력은 옛 정규식 판정으로 fail-closed 폴백한다. 정확히 식별되는 원격
  변경·가드 무력화 명령은 kill이 아니라 실행 전 거부와 사후 감지가 맡는다.

### ADR UI-inge에서 승계하는 조항 (UI-a5l2 경유)

자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다: 실행 중 attempt도
`preempt_pct`에서 정지해 허용 계정으로 같은 세션을 재개하고, 핀·기본 계정이 보류
중이거나 임계 이상이면 디스패치에서 launch-only로 덮어 전환하며, `prior_attempt` 계정
잠금도 이 전환에는 양보하고, usage_limit 보류의 자동 프로브에는 24시간·재무장 상한이
없으며, 인증 실패는 러너 무관 `credential` 그룹의 계정 단위 공급자 보류로 프로브가
회복을 판정한다(env 재시도 사다리를 쓰지 않는다). 이 계정 단위는 이제 게이트 판정까지
지켜진다 — 계정이 있는 `credential` outage는 그 계정만 막는다. 프로브가 그 실패를 공급자
전체 장애로 다시 분류하면 target은 러너 범위로 넓어진다. 전환 재개 단일성과 같은 계정
기동 직렬화, 그리고 UI-inge가 ADR 0052·UI-1l3a·UI-6icf에서 승계한 조항 전부 — 허용 계정
집합·`wait | switch` 모드·attempt 단위 launch-only `exec_override`·`account_switch` 자식의
cap 미소비·후보 건강 임계·공급자 게이트 계정 해석 사다리 세 층·서버 판정과
`provider_gate` admission 기록·fail-closed 계정 미해석·hold 소멸 시 기록 소멸·outage 프로브
상한 없음·프로브만 해제 판정·`↻ 지금 프로브`는 target을 지우지 않음·머지 후 정리 실패의
관측형 자동 재실행·세션 재개 조작 `⏸`·`▶ 재개`와 재개 다이얼로그 갈래·`require_durable`
pause 자격 검사와 `prior_attempt` tuple 승계 — 는 그대로다. 이 조항들이 적용되는 범위가
저장소에서 서버 전역으로 넓어진다.

기각한 대안: 저장소마다 보류를 복제(원본이 N개라 해제·재분류가 어긋나고 이관·정합
비용이 남는다 — 사용자 기각); 계정 미해석 target도 전역으로 올림(한 저장소의 카탈로그
해석 실패가 서버 전체 러너를 세운다); 멤버십을 `(kind, model, account)`로 가리킴(프로브
재분류가 `kind`를 바꾸면 해제로 오인된다); receipt stale을 전역 generation 비교로 판정
(다른 저장소의 무관한 보류가 해제된 target의 receipt를 버린다).

## Consequences

- 되돌리기 어렵다(UI-iopp): Worker 반응·선제 전환(`server/worker/scheduler.js`)과 전역 활성 Claude 계정
  전환(`server/claude-active-return.js`) 두 소비자가 함께 바뀌고, 이미 저장된 모든 저장소·서버 전역 Claude
  허용 목록의 배열 순서가 이 순간부터 우선순위라는 뜻을 갖는다. 되돌리려면 두 선택 함수와 설정 창 편집기
  (`app/views/settings-dialog/limit-policy-editor.js`)·일괄 적용(`app/views/settings-dialog/bulk-pane.js`)을
  함께 되돌려야 하고, 그동안 사용자가 ▲/▼로 바꾼 순서는 다시 뜻을 잃는다.
- 맥락 없이는 놀랍다(UI-iopp): 번호 순으로 저장된 기존 Claude 목록이 배포 직후 그대로 우선순위가 되어,
  주간 사용률이 더 낮은 계정을 두고 목록 앞 계정으로 옮긴다.
- 트레이드오프(UI-iopp): 사용량 순 자동 분산을 버리고 사용자가 정한 우선순위를 택했다. 거름(80/90·트리거)은
  그대로라 소진에 가까운 계정으로 옮기지는 않는다.
- 폐기: "Claude 후보 선택(긴 창 부하 순)은 바뀌지 않는다"(UI-9y1k) — 위 `(UI-iopp, 변경)` 순서 항목으로 대체했다.
- 폐기: 전역 활성 Claude 후보의 "주간 사용률이 낮은 순, 같으면 번호 순"(UI-btp3) — 허용 목록 순서로 대체했다.

- 되돌리기 어렵다(UI-32oq): 되돌리려면 설정 파일 모양과 이전(`rebind_pending`)·재결속 재개
  (`server/limit-policy-settings.js`, `server/ws/limit-policy-settings-handlers.js`, `server/index.js`), 큐 저장소·
  스케줄러·후보 조회 API의 정책 읽기, 두 활성 패스와 떠남 기록 상태 파일(`server/active-login-return-store.js`,
  `server/codex-active-return.js`, `server/claude-active-return.js`)을 함께 되돌려야 하고, 이미 새 모양으로
  다시 쓴 설정 파일은 옛 `scope`를 잃었다.
- 맥락 없이는 놀랍다(UI-32oq): 같은 설정 파일이 어제는 Worker 판정을 덮었고 오늘은 로그인만 바꾼다. 배포
  직후 Codex가 전역이던 저장소 중 저장된 Codex 모드가 기다림인 곳은 기다림으로 돌아간다.
- 트레이드오프(UI-32oq): 모든 저장소에 같은 값을 쓰려면 일괄 적용으로 값을 복사해야 하고 한 번에 되돌리는
  스위치가 없다. 대신 화면에 보이는 저장소 값이 언제나 실제 판정 값이다. default 복귀는 실행 중 대화형
  세션도 곧 옮긴다.
- 폐기: 한도 대응 적용 범위 스위치와 전역 정책 덮어쓰기(UI-giog) — 위 `(UI-32oq, 변경)` 조항으로 대체했다.
- 폐기: 전역 설정 쓰기마다 모든 저장소의 보류 판정 재결속과 재평가(UI-giog) — 저장소 판정이 전역 설정을
  읽지 않는다. 이전 때 한 번만 `rebind_pending`으로 한다.
- 폐기: 러너가 `전역`인 동안 저장소 `한도 대응` 행 잠금과 "전역 설정 블록은 모니터 ⚙ `전역` 탭에만"
  (UI-giog) — 잠금은 없고, 편집 위치는 ADR UI-32oq-2가 정한다.
- 폐기: "새 라벨·칩·버튼은 없다"(UI-tyc2 승계) — 사용량 카드에 default ★와 상태 줄이 생겼다.
- 폐기: 활성 복귀의 기다림 보호(UI-tyc2·UI-btp3) — `전역`이면 모든 저장소가 같은 모드라 기다림
  저장소와 전역 전환이 충돌하지 않고, `저장소별`이면 전역 전환이 없다.
- 폐기: 활성 복귀의 기다림 보호 `ops` 보류 알림(UI-tyc2·UI-btp3) — 보호 규칙이 없어졌다.
- 폐기: 저장소 정책을 작업 공간 키 오름차순으로 훑는 활성 복귀 정책 기준(UI-tyc2·UI-btp3) — 전역 정책
  하나가 기준이다.

- 되돌리기 어렵다(UI-btp3): 서버가 공유 Claude 로그인(Keychain)을 스스로 바꾸고, 되돌리려면
  `server/claude-active-return.js`, 공유 활성 복귀 흐름(`server/codex-active-return.js`), 수동 전환
  라우트의 공유 잠금·전환 기록, scheduler의 오류 귀속, 서버 배선을 함께 되돌려야 한다. 대화형 세션·
  Hermes·계정 없는 Worker attempt·보류 귀속·기다림 추종이 그 결과를 함께 받는다.
- 맥락 없이는 놀랍다(UI-btp3): 실행 중 대화형 세션의 계정이 약 30초 뒤 바뀌고, Codex와 달리 계정 없는
  실행이 있어도 바꾸며, Worker의 80/90과 다른 100% 후보 기준을 쓴다.
- 트레이드오프(UI-btp3): 100%에 닿은 뒤 전환까지 정상 조회로 몇 분이 걸리고 사용량 API가 429로 물러나면
  상한이 없다. 그동안 활성 계정 요청은 실패한다. 대신 사용량 API 호출을 늘리지 않는다. 귀속 창 안에서
  새 계정의 오류를 이미 소진된 직전 계정에 잘못 귀속해도 그 계정에 보류가 붙을 뿐이다.

- 되돌리기 어렵다(UI-tyc2): 서버가 공유 인증 상태(`~/.codex`)를 스스로 바꾸고, 되돌리려면
  `server/codex-active-return.js`, 수동 전환 라우트의 공유 잠금·전환 함수, 사용량 목록 관찰자, 서버
  배선을 함께 되돌려야 한다. 수동 전환 경로·기다림 추종·세션 codex-runner·사용자 터미널의 codex가
  그 결과를 함께 받는다.
- 맥락 없이는 놀랍다(UI-tyc2): 사람이 고른 활성 계정이 알림과 함께 바뀌고, 기다림 저장소가 있어도
  기본 계정을 두었으면 바뀐다.
- 트레이드오프(UI-tyc2): 소진을 처음 관측하는 시점은 기존 읽기(화면·Worker 패스·크레딧 폴러·후보
  조회 API)에 기대므로 그 읽기가 없으면 상한이 없다. 대신 소진이 아닐 때 codex-auth API 읽기를 늘리지
  않는다. 실행 중 codex 프로세스의 토큰 갱신과 전환의 충돌은 수동 전환과 같은 위험 등급이다.

- 되돌리기 어렵다(UI-ftww): 되돌리려면 scheduler의 실시간 패스·디스패치 선제 전환·재개 계정
  해석(`prior_attempt` 잠금의 계정 양보 포함)을 함께 되돌려야 하고, 사용자 저장소의
  `preempt_pct` 운용(지금 모두 꺼짐)이 이 기본 동작을 전제로 굳는다.
- 맥락 없이는 놀랍다(UI-ftww): 선제 전환 기준을 꺼 둔 저장소에서도 Codex 실행이 스스로 멈췄다
  다른 계정에서 재개되고, 상한이 멈추지 않는 크레딧 실행이 창 여유 계정이 생기면 멈춘다.
- 트레이드오프(UI-ftww): 계정 목록 캐시와 실시간 패스 주기 때문에 리셋 뒤 복귀까지 몇 분이
  걸리고 그동안의 크레딧 소모는 원장이 센다. 대신 저장소별 설정 없이 모든 switch 모드 저장소에
  적용된다.

- 되돌리기 어렵다(UI-gggh): 되돌리려면 claude adapter recovery 분류기, scheduler 보류 진입·
  소급 판정, queue-store 멤버십 정규화·정산·전환·기다림 경로, 투영 대표 멤버, 카드 target
  조회를 함께 되돌리고 queue.json에 영속된 교차 멤버십을 정리해야 한다.
- 맥락 없이는 놀랍다(UI-gggh): claude attempt가 Codex 러너 보류 target에 들어 있고, 같은
  target의 다른 멤버와 달리 전환하지 않으며 멤버십 계정이 아닌 자기 러너 계정으로 재개된다.
  해제 기록은 리프 러너(codex)의 회복으로 남고 재개 계정은 적지 않는다 — 재개는 자기 러너
  계정으로 다시 해석된다.
- 트레이드오프(UI-gggh): 계정 번호의 안정성은 codex-auth가 보장하지 않으므로 번호가 다른 계정을
  가리키면 엉뚱한 계정의 회복을 기다릴 수 있다. 대신 bridge payload·dotfiles 계약을 바꾸지 않는다.

- 되돌리기 어렵다(UI-9y1k): 되돌리려면 scheduler 후보 선택, 크레딧 저장소·사용량 관측·주기
  읽기, 조회 API, 설정 화면·일괄 설정, dotfiles 브리지 소비자를 함께 되돌려야 한다.
- 맥락 없이는 놀랍다(UI-9y1k): 한도가 다 찬 계정이 유료 크레딧으로 다시 후보가 되고, 부하가 더
  낮은 계정을 두고 사용자 순서상 앞 계정으로 가며, 상한에 닿아도 이미 시작된 실행은 계속
  크레딧을 쓴다.
- 트레이드오프(UI-9y1k): 사용량 읽기 사이의 소모는 다음 읽기에 잡혀 실제 누적이 상한을 넘을 수
  있다. 대신 실행 중 작업을 끊지 않는다.
- 되돌리기 어렵다(UI-np4t): 멤버십 계정의 의미(진입 때 계정 → 지금 기다리는 계정)와
  receipt 계정 규칙이 함께 바뀐다. 되돌리려면 queue-store 정산·추종 mutation, scheduler
  재평가·receipt 소비·재개 출처 기록, provider-health 관찰·주기 타이머, 계정 전환 라우트를
  함께 되돌리고 표지 있는 receipt를 처리해야 한다.
- 맥락 없이는 놀랍다(UI-np4t): 기다림 모드인데 한도에 걸린 계정이 아닌 다른 계정으로
  재개되고, 카드의 보류 계정과 리셋 시각이 진입 뒤에 바뀐다.
- 트레이드오프(UI-np4t): 사용률을 보지 않아 소진된 활성 계정에 헛실행 1회가 생길 수 있다.
  대신 새 디스패치와 같은 규칙 하나로 끝나고 새 표시 필드가 없다.
- 되돌리기 어렵다: 이관이 큐의 target을 전역 파일로 옮긴다. 되돌리려면 queue-store
  진입·해제·정리, scheduler 게이트·전환·선제 전환, provider-health 타이머 키·프로브 소유,
  attach wait-judge 입력, `decorateQueue` 투영, 모니터 조립을 함께 되돌리고 전역 파일의
  target을 다시 저장소별로 나눠야 한다.
- 맥락 없이는 놀랍다: 보류 이력이 없는 저장소가 막히고, 그 저장소 큐 파일에는 보류가
  없다. `gh pr merge`를 친 세션이 죽지 않고 거부 문장을 보고 계속 돌며, 큐를 세우는 자동
  경로가 코드에 없다.
- 트레이드오프: 진입 원자성(큐 한 번 쓰기)을 전역 → 큐 두 번 쓰기와 재시작 정산으로
  바꾸는 대신, N번 헛디스패치와 중복 프로브·알림을 없앤다. 예방층을 우회한 push를
  사후에만 알게 되는 대신 텍스트 판정 kill과 큐 정지를 없앤다.
- 시작 뒤 등록된(attach되지 않은) 저장소는 디스패치하지 않으므로 정산 대상에서 빠지고,
  모니터 투영에는 전역 target이 그대로 보인다.
- Codex 훅 로드 흔적 판정은 fail-quiet라 훅이 없는 Codex 버전에서는 경고만 남고 예방은
  `pre-push`와 사후 감지에 의존한다.
