---
id: UI-3v1h
title: 공급자 보류의 서버 전역 원본과 Worker 가드
status: accepted
date: 2026-10-07
summary: "공급자 보류의 원본은 서버 전역 하나이고 usage_limit·인증 실패는 계정, 그 밖의 outage는 러너 단위로 모든 저장소의 디스패치와 전환 후보를 막는다; 계정 미해석 target만 저장소에 남고, 저장소는 보류 attempt를 target_id·계정 멤버십으로 가리키며, 해제는 전역 한 번 뒤 각 저장소가 자기 멤버십을 정산한다 — UI-a5l2의 가드·공급자 조항은 그대로 승계한다"
supersedes: ["UI-a5l2"]
spec: docs/superpowers/specs/2026-10-06-provider-hold-global-design.md
bead: UI-3v1h
---

# 공급자 보류의 서버 전역 원본과 Worker 가드

## Context

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
  `target_id`, 진입 때의 계정, 저장소 정책이 정한 전환 상태를 담는다. 계정을 함께
  영속하는 이유는 attempt 레코드에 보류된 계정이 없을 수 있고, target이 지워진 뒤에도
  정산이 재개 계정을 정해야 하기 때문이다.
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
  번 보낸다. 재개 계정은 멤버십의 계정이다. 같은 정산이 attachment 시작 때도 돌아,
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
