---
id: UI-ftww
title: 공급자 보류 전역 원본·Codex 전환 순서·리프 한도·소진 복귀
status: accepted
date: 2026-10-20
summary: "Codex 자동 전환 후보는 허용 목록의 사용자 순서로 창 여유 계정을 먼저 고르고 반응 전환에서만 계정별 크레딧 허용·하루 상한(다음 선택만 막음) 안의 크레딧 계정을 고르며, 창이 소진된 계정으로 도는 Codex 실행은 preempt_pct와 무관하게 창 여유 계정이 생기면 그 계정으로 옮기고, 크레딧 설정은 서버 전역이고 세션은 같은 규칙의 후보 조회 API를 쓰고, 세션이 맡긴 다른 러너 리프의 계정 한도로 끝난 attempt는 그 리프 계정 보류의 교차 멤버로 전환·기다림 추종 없이 해제 뒤 자기 러너 계정 규칙으로 재개한다 — 나머지 조항은 UI-np4t 그대로다"
supersedes: ["UI-gggh"]
spec: docs/superpowers/specs/2026-10-20-codex-credit-return-to-reset-account-design.md
bead: UI-ftww
---

# 공급자 보류 전역 원본·Codex 전환 순서·리프 한도·소진 복귀

## Context

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
  계정 보류 중" 판정이 이 집합을 읽는다. 전환 정책(`wait | switch`·허용 계정·
  `preempt_pct`)은 저장소별 그대로다.
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

### Codex 자동 전환 후보의 사용자 순서와 크레딧 (UI-9y1k, 신설)

**Codex 자동 전환 후보는 저장소 정책 허용 목록(`accounts`)의 배열 순서, 곧 사용자 순서로 고른다.
창 여유 계정을 먼저 고르고, 반응 전환에서만 계정별 크레딧 허용·하루 상한 안의 크레딧 계정을
고른다. 크레딧 설정은 서버 전역이고, 세션은 같은 규칙의 후보 조회 API를 쓴다.**

- **순서.** 기본 거름(ok·현재 아님·보류 아님·제외 아님)과 창 기준(후보 건강 임계, 선제 전환이면
  `preempt_pct` 미만)은 거름으로만 남고, 통과한 계정 중 허용 목록 순서상 첫 계정을 고른다. 긴 창
  부하 순 정렬은 Codex에서 쓰지 않는다. 순서는 저장소별이며 저장 형태는 기존 허용 목록 그대로다.
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
- Claude 후보 선택(긴 창 부하 순)과 기다림 모드 추종은 바뀌지 않는다.

기각한 대안(UI-9y1k): 부하 순 유지(사용자 순서가 의미를 잃는다), 저장소별 크레딧 설정(합계가
상한을 넘는다), 크레딧 계정 제외(한도 뒤 남은 크레딧을 못 쓴다), 상한 도달 시 실행 중단(진행 중
작업을 잃는다).

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
- **범위.** switch 모드이고 허용 목록이 있는 저장소의 Codex 러너만이다. 기다림 모드, Claude
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
