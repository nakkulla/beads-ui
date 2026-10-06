---
scope:
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/provider-health.js
  - server/worker/attach.js
  - server/worker/runtime.js
  - server/worker/state-paths.js
  - server/worker/wait-judgment.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - server/ws/monitor-handlers.js
  - app/views/worker/lane-model.js
---

# 공급자 보류의 서버 전역 원본 — 계정·러너 단위로 모든 저장소를 막는다 (UI-3v1h)

## 1. 배경

공급자 보류(`provider_hold`)는 저장소마다 자기 `queue.json`에만 있다. 그래서 디스패치
게이트와 프로브, 알림, 대기 행 칩, 전환 후보 제외가 모두 그 저장소 안에서만 동작한다.
2026-10-06 실측:

- beads-ui는 16:42에 UI-qbgj 시도가 claude `usage_limit`에 걸렸다. 계정은
  `nakkulla@hanmail.net`, `resets_at`은 20:00이었다. 그 뒤 UI-i8cy는 대기 레인에서부터
  막혔다.
- dotfiles 큐에는 보류가 없었다. 그래서 dotfiles-ow013이 19:20:12에 디스패치됐고, 6초 뒤
  같은 계정·같은 `resets_at`으로 보류에 들어갔다.

같은 일이 2026-09-09 스펙 §2에도 있었다. 같은 outage target이 beads-ui와
microbiome_bile 두 큐에 따로 서서, 두 `queue.json`을 손으로 고쳐 풀었다.

한도의 실제 범위는 `usage_limit`이면 계정이고 outage이면 러너 전체다. 그런데 보류의 범위는
저장소다. 저장소가 N개면 같은 한도에 최대 N번 헛디스패치하고, 프로브와 진입·회복 알림도
N번 일어난다.

사용자 결정(2026-10-06): 보류는 서버 전역에서 공유한다. `usage_limit`은 계정 단위,
outage는 러너 단위로 한다. 원본은 서버 전역 하나로 둔다. 저장소마다 복제하는 대안은
기각했다.

## 2. 검증된 전제

base는 `origin/main` ec755e5b이다.

- 보류는 큐의 top-level 필드이고 러너가 키다 — `server/worker/queue-store.js:650`.
  target 필드는 `kind·model·account·detail·last_error·resets_at·rearm_count·attempt_ids·auto_switch·switch_ready_*·next_probe_at`이다
  — `queue-store.js:791-812`.
- 큐는 저장소마다 파일 하나이고, tmp+rename으로 쓰며 잠금은 없다(단일 프로세스) —
  `queue-store.js:6274-6280`.
- 보류 진입은 attempt pause, target 생성·병합, 전환 receipt를 큐 쓰기 한 번에 한다 —
  `queue-store.js:8703`. 새 hold의 generation은 그 큐의 hold·pending generation 최댓값에
  1을 더한 값이다 — `queue-store.js:8723-8737`.
- 정리된 attempt는 같은 쓰기에서 target의 `attempt_ids`에서 빠진다. 비게 된 `usage_limit`
  target도 같이 지워진다 — `queue-store.js:6513-6526`.
- 해제는 target을 지우고, 보류된 attempt마다 `provider_outage` receipt를 만든다. 러너의
  마지막 target이면 `provider_gate` admission도 지운다 — `queue-store.js:8994`.
  계정이 사라진 경우의 해제는 재개 계정을 null로 둔다 — `queue-store.js:8983`.
- 디스패치 게이트는 그 저장소 스냅샷의 `provider_hold[runner]`만 읽는다. outage target이
  하나라도 있으면 러너 전체를 막고, `usage_limit`은 해석된 계정이 일치할 때만 막는다 —
  `server/worker/scheduler.js:3821-3896`. 호출처는 네 곳이다 — `scheduler.js:11321`,
  `13748`, `14213`, `16143`.
- 전환 후보 선택이 빼는 보류 계정 집합은 그 저장소의 보류에서만 만든다 —
  `scheduler.js:1940-1950`. 전환 정책(`wait|switch`·허용 계정·`preempt_pct`)은 저장소별
  큐에 있다 — `scheduler.js:3559`, `queue-store.js:8403`.
- 프로브 컨트롤러는 attachment마다 하나씩 만들어진다 — `server/worker/attach.js:1424`.
  타이머 키에 workspace가 들어 있다 — `server/worker/provider-health.js:72`. 프로브는
  target의 계정 그대로 실행한다 — `provider-health.js:419`.
- 회복 알림은 두 경로에서 나간다. 첫째, 프로브 성공 경로는 해제로 재개 자격이 생긴
  attempt가 있을 때만 한 번 알린다 — `provider-health.js:761-779`. 둘째, 계정 전환 재개는
  전환된 attempt마다 알린다 — `scheduler.js:14700-14716`. 진입 알림은 새 target일 때
  나간다 — `scheduler.js:6584`. 모두 저장소별이라 저장소 수만큼 중복된다.
  `notify.js:959`에는 중복 제거가 없다.
- 프로브는 target의 `kind`를 그 자리에서 바꾼다. 계정이 있는 outage는 `usage_limit`으로
  강등하고, `usage_limit`은 outage로 승격한다 — `provider-health.js:796-845`. 계정 미해석
  `usage_limit` target은 프로브 타이머를 무장하지 않는다 — `provider-health.js:599`. 이
  target은 수동 재개로만 지워진다 — `queue-store.js:9196`.
- 인증 실패(`credential`)는 분류기가 계정 범위로 판정한다 — `server/worker/runner/provider-outage.js:156`.
  그런데 진입은 `usage_limit`·`access_disabled`만 `usage_limit` target으로 만들고,
  `credential`은 계정을 가진 outage target이 된다 — `scheduler.js:6504-6508`. 게이트는
  outage target이 하나라도 있으면 러너 전체를 막는다 — `scheduler.js:3829-3838`. 클라이언트
  예측도 같다 — `app/views/worker/lane-model.js:1577`. ADR UI-a5l2가 승계한 조항은 인증
  실패를 "계정 단위 공급자 보류"로 적었지만, 지금 코드는 러너 전체를 막는다.
- 보류 attempt의 계정은 시도에 기록된 계정이 없으면 카탈로그의 활성 계정으로 채운다 —
  `scheduler.js:1845`. 그래서 attempt 레코드만으로는 보류된 계정을 되찾을 수 없다.
- stale receipt 폐기는 receipt의 generation을 그 저장소 러너 hold의 generation과
  비교한다. hold가 있고 값이 다르면 버린다 — `queue-store.js:9103-9120`. 버려진 attempt를
  다시 무장하는 정리 경로는 `auto_resume_refused`가 있는 attempt만 본다 —
  `scheduler.js:14466-14480`.
- 재개 단일성(`resume_in_flight`)과 같은 계정 기동 간격(`launch_locks`)은 이미 프로세스
  전역이다 — `scheduler.js:215`, `server/worker/runner/claude.js:31`.
- attachment는 서버 시작 때 `initWorkerRuntime`이 만든 목록뿐이다 — `attach.js:3154`.
  시작 뒤 등록된 저장소는 디스패치 루프가 없다.
- 표시용 `next_probe_at`은 `rearm_count < 3`·24h 상한으로 계산된다. 프로버에는 이 상한이
  없다 — `server/ws/worker-handlers.js:3002-3017`.
- 화면은 `decorateQueue`가 저장소마다 `provider_hold`를 실어 보낸다 —
  `server/ws/worker-handlers.js:3180`, `3256`. 모니터도 같은 함수로 저장소마다
  조립한다 — `server/ws/monitor-handlers.js:733`. 대기 행 칩은 그 저장소의
  `provider_hold`에서만 판정하고, target이 없으면 그리지 않는다 —
  `app/views/worker/lane-model.js:1571`, `1718`, `3300`.
- 대기 사유(`provider_hold`)는 보류된 paused attempt에만 붙는다 —
  `server/worker/wait-judgment.js:884-904`. 계정 카탈로그는 자기 보류가 있을 때만 읽는다 —
  `attach.js:2387`.
- 서버 전역 상태 파일은 같은 패턴을 쓴다. `$XDG_STATE_HOME/bdui/<이름>.json`에
  tmp+rename으로 쓰고, 메모리 캐시를 두며, persist를 먼저 한 뒤 캐시에 반영한다 —
  `server/worker/state-paths.js:142-162`, `server/timing-settings.js:394`.
- 계정 키는 저장소와 무관하다. Claude는 이메일이고, Codex는 카탈로그의 `account_key`다.
  둘 다 프로세스 전역 카탈로그에서 온다(수집 리프 보고: `routes/claude-usage.js`,
  `routes/codex-usage.js`).
- 미확인: Codex `account_key`의 정확한 형식(`user::workspace` 여부) — 코드와 테스트에서
  형식 가정을 찾지 못했다. 이 설계는 불투명 문자열로만 다룬다.

## 3. 목표

- 한 저장소에서 한도나 장애가 관측되면, 같은 계정(`usage_limit`·인증 실패)이나 같은
  러너(그 밖의 outage)를 쓰는 모든 저장소가 다음 디스패치부터 막힌다.
- 막힌 저장소의 대기 행에는 자기 보류 이력이 없어도 지금과 같은 보류 칩과
  `↻ 지금 프로브`가 선다.
- 프로브, 진입 알림, 해제 알림은 target 하나당 한 번이다. 계정 전환 재개 알림은 지금처럼
  전환된 attempt마다 한 번이다. 이것은 target의 회복이 아니라 그 attempt의 사건이다.
- 해제되면 각 저장소는 자기 보류 attempt를 지금과 같은 규칙으로 재개하고, 막혔던 대기
  행을 다시 디스패치한다.

## 4. 범위

포함하는 것은 다음과 같다.

- 전역 보류 저장소와 수명 주기
- 저장소별 멤버십
- 게이트·전환 후보·선제 전환이 읽는 보류 집합
- 프로브 컨트롤러의 전역화
- 알림 단일화
- 화면 투영
- 기존 저장소별 보류의 이관

비목표는 다음과 같다.

- 전환 정책을 전역으로 옮기는 것
- 카드에 "다른 저장소에서 감지" 같은 새 줄이나 칩을 다는 것. 슬롯이 없고, 칩 팝업의 기존
  줄로 충분하다.
- 프로브 판정 규칙(백오프·상한 없음·재분류)을 바꾸는 것

## 5. 설계

### 5.1 전역 원본과 저장소 멤버십

**전역 보류 저장소.** 서버 전역 파일 하나다. 예: `$XDG_STATE_HOME/bdui/provider-holds.json`.
`timing-settings`와 같은 tmp+rename·메모리 캐시 패턴을 쓰고, 프로세스 싱글턴(예:
`getWorkerRuntime()`)이 소유한다. 내용은 러너별 `{since, generation, targets[]}`다.
target은 지금 필드 중 시도 소속과 무관한 것만 가진다.

- 그대로 두는 필드: `kind`, `model`, `account`, `detail`, `last_error`, `resets_at`,
  `rearm_count`, `next_probe_at`
- 추가하는 필드: `target_id`, `origin`

**`target_id`.** target이 처음 생길 때 정하는 불변 식별자다. 결정: 저장소 멤버십은 target을
`(kind, model, account)`가 아니라 `target_id`로 가리킨다. 이유: 프로브가 outage를
`usage_limit`으로 강등하거나 그 반대로 승격하면 `kind`가 그 자리에서 바뀐다
(`provider-health.js:798-845`). identity로 가리키면 재분류가 해제로 오인된다. 같은
`(runner, kind, model, account)`로 다시 진입하면 기존 target에 병합되고 `target_id`를
유지한다. 병합 규칙은 지금 `holdProviderAttempt`와 같다: `detail`·`last_error`·`resets_at`은
덮어쓰고 `rearm_count`는 최댓값을 둔다.

**`origin`.** target을 처음 관측한 저장소다. 알림의 리포 라벨과 프로브 cwd로만 쓴다. 그
저장소가 attach되어 있지 않으면 프로브 cwd는 `$XDG_STATE_HOME/bdui`다.

**generation.** 전역 단조 증가 카운터다. 새 러너 hold는 카운터 + 1을 받는다. 프로브
타이머 키와 `↻ 지금 프로브`의 `since` CAS에만 쓰고, receipt의 stale 판정에는 쓰지 않는다
(§5.4).

**저장소 멤버십.** 각 저장소 큐에 남는다. 예: 큐 필드
`provider_hold_members: Record<attempt_id, {runner, target_id, account, auto_switch?, switch_ready_at?, switch_ready_account?}>`.
보류된 attempt가 어느 전역 target을 기다리는지, 그리고 저장소 정책에 달린 전환 상태를
담는다. 전환 상태가 여기 있는 이유: `auto_switch`는 저장소의 `provider_limit_policy`로
판정된다(`queue-store.js:8768-8813`).

결정: 멤버십은 진입할 때 target의 계정(`account`)을 함께 영속한다. 이유: attempt
레코드에는 보류된 계정이 없을 수 있다(`scheduler.js:1845`). 그래서 전역 target이 이미
지워진 뒤(재시작·손상)에도 정산이 재개 계정을 정하려면 멤버십에 계정이 있어야 한다.
target이 재분류돼도 계정은 바뀌지 않으므로 이 값은 낡지 않는다.

**보류 범위.** 결정: 전역 target이 막는 범위는 다음과 같다.

- `usage_limit` target: 그 계정
- 계정이 있는 `credential` outage target: 그 계정
- 그 밖의 outage target: 러너 전체

이유: 사용자 규칙은 "`usage_limit`은 계정, outage는 러너"다. 인증 실패는 분류기가 계정
범위로 판정한다(`provider-outage.js:156`). ADR UI-a5l2가 승계한 조항도 인증 실패를 계정
단위 보류로 정했다. 지금 코드가 이를 러너 전체로 막는 것은 저장소 하나 안에서는 드러나지
않았다. 그러나 전역에서는 한 계정의 로그인 만료가 모든 저장소의 같은 러너를 세운다. 서버
게이트와 클라이언트 예측(`lane-model.js:1577`)은 같은 규칙을 쓴다. `target.kind`와 프로브
규칙은 바꾸지 않는다.

**계정 미해석 target은 저장소에 남는다.** 결정: `account === null`인 `usage_limit`
target은 전역으로 올리지 않고, 지금처럼 그 저장소 큐의 `provider_hold`에 남긴다. 이유:
사용자 규칙이 "`usage_limit`은 계정 단위"인데, 이 target에는 계정이 없다. 이 target이
fail-closed로 러너 전체를 막는 범위를 모든 저장소로 넓히면, 한 저장소의 계정 해석 실패가
서버 전체를 세운다. 이 target은 지금처럼 프로브하지 않고, 수동 재개로만 지워진다
(`queue-store.js:9196`). 계정이 있는 outage target은 전역이다.

### 5.2 진입

보류 진입은 두 번 쓴다. 순서는 **전역 먼저, 큐 나중**이다.

1. 전역 저장소에서 target을 생성하거나 병합한다. 반환: `target_id`, `generation`,
   `entered`(이 target이 전역에서 새로 생겼는지).
2. 큐에 한 번 쓴다. attempt를 pause하고, 멤버십을 추가하고, 지금과 같은 전환 판정과
   receipt를 기록한다.

1과 2 사이에 프로세스가 죽으면 전역 target만 남는다. 게이트가 막고 프로브가 해제할 뿐
attempt는 잃지 않는다. 재시작한 정산이 같은 종료 결과로 다시 진입하고, 1은 병합이므로
멱등이다. Node 단일 스레드라서 두 저장소가 동시에 진입해도 1은 직렬화된다. 그래서
`entered`는 정확히 한 번 참이다.

진입 알림 `providerHoldEntered`는 `entered`일 때만 보낸다. 리포 라벨은 `origin`이다.

### 5.3 게이트·전환 후보·선제 전환이 읽는 집합

**유효 보류.** 저장소 W, 러너 R의 유효 보류는 다음 둘을 합친 것이다.

- 전역 `targets[R]`
- W 큐에 남은 계정 미해석 target

**게이트.** `providerDispatchHeld`의 입력을 유효 보류로 바꾸고, 판정은 §5.1 보류 범위를
따른다. 해석된 계정과 일치하는 계정 범위 target(`usage_limit`·`credential`)이 있으면 막는다.
러너 범위 outage가 있으면 러너 전체를 막는다. 미해석은 지금처럼 fail-closed다. 네 호출처가
모두 같은 입력을 쓴다.

**전환 후보와 선제 전환.** 전환 후보 선택이 빼는 보류 계정 집합은 전역 target 전체의 계정이다.
이 기준은 다음 네 곳에 똑같이 적용한다.

- 전환 후보 선택: `scheduler.js:1940`
- 전환 준비: `scheduler.js:2012`
- 진입 시 후보 보류 검사: `queue-store.js:8788`
- 보류 attempt 전환: `queue-store.js:8917`

선제 전환(`applyPreemptSwitch`·`livePreemptPass`)의 "현재 계정이 보류 중" 판정도 전역
`usage_limit`을 본다. 그래서 switch 모드 저장소는 다른 저장소가 관측한 한도에도 디스패치
전에 비켜 간다. 정책 자체(`wait|switch`·허용 계정·`preempt_pct`)는 저장소별로 그대로다.

### 5.4 프로브와 해제

**프로브 컨트롤러.** 프로세스에 하나다. 전역 target마다 타이머 하나를 무장하고, 키에서
workspace를 뺀다(예: `[runner, generation, target_id]`). 다음은 그대로 둔다.

- 지연 규칙, 실행 명령(target 계정으로 `cswap run`·`CODEX_HOME`)
- 강등·승격·재무장·백오프·`in_flight` 중복 방지
- `next_probe_at` 영속화

`↻ 지금 프로브`(`worker-provider-probe-now`)는 payload `{runner, since, root_dir?}`를 그대로
받는다. `since` CAS는 전역 hold의 `since`와 비교한다. `root_dir`은 권한 확인(사용 가능한
workspace인지)에만 쓴다. 프로브는 target을 지우지 않는다(ADR UI-a5l2가 승계한 조항).

**해제.** 프로브가 성공하거나 계정이 카탈로그에서 사라지면 다음 순서로 진행한다.

1. 전역 저장소에서 target을 지운다. 러너의 마지막 target이면 그 러너 hold도 지운다.
2. attach된 모든 저장소에 대해 **멤버십 정산**을 부른다. 저장소마다 재개 자격이 생긴
   attempt를 모은다.
3. 모은 attempt가 하나라도 있으면 해제 알림 `providerRecovered`를 **한 번** 보낸다.
   `resumed_beads`는 모든 저장소의 것을 합친다. 리포 라벨은 `origin`이다. 모은 attempt가
   없으면 지금처럼 알리지 않는다.

계정 전환 재개(`consumeProviderAutoResume`의 `account_switch` 경로)의 회복 알림은 이 해제
알림과 별개다. 지금처럼 전환된 attempt마다 한 번 보낸다. 전역화로 바뀌는 것은 없다.
전환은 그 attempt를 다른 계정으로 옮긴 사건이고, 원래 target은 계속 서 있다
(`queue-store.js:8904`).

**멤버십 정산.** 저장소 W에서 하는 일은 다음과 같다. 함수 하나가 해제 직후와 attachment
`start()`에서 모두 쓰인다.

- 멤버십 중 가리키는 `target_id`가 전역에 없는 것을 해제된 것으로 본다.
- 해제된 멤버십마다 지금 `recoverProviderTarget`과 같은 규칙으로 처리한다:
  - 자격 검사(paused·`provider_outage:*`·미폐기·미재개)를 한다.
  - 자동 재개 상한이면 disarm하고, 아니면 `provider_outage` receipt를 쓴다.
  - 그 멤버십을 지운다. receipt와 멤버십 삭제는 같은 큐 쓰기다.
  - 재개 계정은 멤버십의 `account`다. 단, 카탈로그에 그 계정이 없으면 null이다. 이것이
    지금의 계정 부재 해제와 같은 결과다. 카탈로그를 읽지 못하면 멤버십의 `account`를 그대로
    쓴다.
- 러너 R의 유효 보류가 비면 그 저장소의 `provider_gate` admission을 지운다.
- 그다음 그 저장소의 다음 순서를 따른다: 자동 재개 소비 → 전환 재평가 → tick

해제(1)와 정산(2) 사이에 프로세스가 죽어도, 재시작한 `start()`의 정산이 같은 receipt를
낸다. receipt를 쓰기 전에 지워진 멤버십은 없다. 이 경우 해제 알림은 나가지 않는다. 재개는
그대로 일어나고 timeline에 남는다. 같은 계정 기동 직렬화(`acquireClaudeLaunch`)와 재개
단일성(`resume_in_flight`)은 이미 프로세스 전역이라서, 여러 저장소가 동시에 재개해도 그대로
지켜진다.

**stale receipt.** 결정: `provider_outage` receipt는 그 attempt에 살아 있는 멤버십이 있을
때만 stale로 버린다. 살아 있는 멤버십이란 가리키는 `target_id`가 전역에 있는 멤버십이다. 이
경우는 receipt 뒤에 다시 보류된 것이다. 러너의 전역 hold generation이 바뀌었다는 이유로는
버리지 않는다. 이유: 전역에서는 다른 저장소의 무관한 보류가 generation을 바꾼다. 지금처럼
generation만 비교하면 해제된 target의 receipt가 사라진다. 그러면 그 attempt는 멤버십도
`auto_resume_refused`도 없어 재무장 경로(`scheduler.js:14466-14480`)에 걸리지 않는다.
`live_preempt` receipt는 지금처럼 이 판정에서 빠진다. `account_switch` receipt도 같은
규칙이다.

**정리된 attempt.** attempt가 큐에서 정리되면 같은 큐 쓰기에서 멤버십만 지운다. 전역
target은 지우지 않는다. 결정: 기다리는 attempt가 없는 `usage_limit` target도 프로브가
해제할 때까지 선다. 이유: 그 계정의 한도는 기다리는 attempt와 무관하게 다른 저장소의
디스패치를 막아야 한다. UI-inge 이후 `usage_limit` 프로브에는 상한이 없으므로, 언젠가
해제된다.

### 5.5 화면 투영과 변경 전파

**투영.** `decorateQueue(W, queue)`가 보내는 `provider_hold`는 저장소 W의 유효 보류 투영이다.
러너별 `{since, generation, targets[]}` 모양을 유지한다.

- 전역 target에서 `attempt_ids`는 W 멤버십 중 그 `target_id`를 가리키는 attempt들이다
  (없으면 `[]`).
- `auto_switch`·`switch_ready_*`는 그 멤버십에서 가져온다.
- W의 계정 미해석 target도 같이 싣는다.

그래서 다음 기존 소비자가 수정 없이 같은 의미로 동작한다.

- `lane-model`의 게이트 칩, 기록된 게이트
- 보류 타일
- `wait-judgment`
- 재개 다이얼로그
- 모니터 `buildLanes`

**변경 전파.** 전역 저장소가 바뀌면 attach된 모든 저장소에 대해 큐 변경 이벤트를 낸다.
그러면 Worker 탭 fanout, 모니터 재조립, wait-judge 재판정이 돈다. wait-judge의
`controlState` 해시와 카탈로그 읽기 조건(`attach.js:339`, `2387`)은 유효 보류 투영을
입력으로 쓴다.

**동일성.** 같은 Bead 카드는 두 탭에서 같은 칩과 버튼을 갖는다. §9 의도된 차이는 늘지 않는다.

### 5.6 이관

attachment들이 `start()`하기 전에 한 번 실행하고, 다시 실행해도 결과가 같다.

1. attach될 모든 저장소의 큐를 읽는다.
2. 각 큐의 `provider_hold`에서 계정 있는 target과 outage target을 전역 저장소로
   생성하거나 병합한다. 병합 규칙은 §5.1과 같고, `origin`은 그 저장소다.
3. 그 target의 `attempt_ids`를 그 큐의 멤버십으로 옮긴다. 멤버십에는 전역 `target_id`와
   그 target의 계정을 적고, 전환 상태도 함께 옮긴다.
4. 원래 target을 큐에서 지운다. 계정 미해석 target은 남긴다.

**쓰기 순서.** 저장소마다 전역 병합 → 큐 쓰기(멤버십 추가와 원래 target 삭제를 한 번에) →
readback 순이다. 중간에 실패한 저장소는 다음 시작 때 다시 이관한다. 이미 옮긴 target은
병합이라 멱등이다.

**generation과 기존 receipt.** 전역 카운터의 초깃값은 이관한 모든 큐의 hold·pending
generation 최댓값이다. 이관 시점에 이미 큐에 있던 receipt는 그대로 둔다. 그 receipt는 §5.4
stale 규칙으로만 판정된다. 그 attempt가 이관된 살아 있는 멤버십을 가지면 버리고, 아니면
소비한다. 다른 저장소의 보류나 generation 값과는 무관하다. 이관 전 코드의 같은 규칙
(그 큐에 같은 러너 hold가 있고 generation이 다르면 버림)과 결과가 같거나, 그보다 덜
버린다.

## 6. 오류 처리

- **전역 파일 읽기 실패.** 읽지 못했거나 손상된 전역 파일은 옆에 보존하고, 빈 보류로
  시작한다. 이관을 마친 큐에는 target이 없으므로 다시 채울 원천이 없다. 남은 멤버십은
  정산이 해제로 처리한다. 그래서 재개와 대기 행 디스패치가 한 번씩 시도되고, 아직 한도이거나
  장애이면 그 시도가 다시 보류에 들어간다. 이 열화는 지금의 저장소별 동작과 같은 비용이며,
  보류를 잃어 시도가 영구히 멈추는 일은 없다.
- **전역 쓰기 실패.** 지금 큐 persist처럼 예외가 전파되고, 메모리는 이전 상태를 유지한다.
  진입 1이 실패하면 큐 쓰기 2를 하지 않는다.
- **계정 카탈로그 오류.** 정산의 재개 계정 판정에서 카탈로그를 읽지 못하면 멤버십의
  `account`를 그대로 쓴다. 재개가 실패하면 기존 거절·재무장 경로를 탄다.

## 7. 시험

**전역 저장소.**
- 같은 `(runner, kind, model, account)`로 진입하면 병합되고 `target_id`가 유지된다.
- 재분류(강등·승격)가 `target_id`를 바꾸지 않는다.
- 두 저장소가 연달아 진입하면 `entered`가 한 번만 참이다.

**게이트.** 저장소 B에 보류 이력이 없어도 A가 만든 다음 target에 B의 대기 행 디스패치가
막힌다.
- `usage_limit`(같은 계정): 막힌다.
- 계정이 있는 `credential` outage: 그 계정만 막히고, 다른 계정으로 해석된 행은 막히지
  않는다. 서버 게이트와 lane-model 예측이 같다.
- 그 밖의 outage: 러너 전체가 막힌다.
- 다른 계정의 `usage_limit`: 막히지 않는다.
- B의 계정 미해석 target은 A를 막지 않는다.

**전환.** A의 `usage_limit` 계정이 B의 전환 후보에서 빠진다. switch 모드 B는 그 계정을
비켜 디스패치한다.

**프로브와 알림.**
- 두 저장소가 같은 target을 기다려도 프로브 프로세스와 진입 알림이 한 번이다.
- 해제 알림도 한 번이고, `resumed_beads`에 두 저장소의 Bead가 모두 들어 있다.
- 두 저장소에서 계정 전환 재개가 일어나면 전환된 attempt마다 알림이 하나씩 나간다. 그
  뒤 원래 target이 해제돼도 재개 자격이 생긴 attempt가 없으면 해제 알림은 나가지 않는다.

**해제.** 해제가 두 저장소의 보류 attempt 모두에 receipt를 쓰고, 두 저장소 모두 tick한다.
- 계정 부재로 해제되면 재개 계정이 null이다.
- 해제와 정산 사이에 재시작해도 receipt가 한 번 생긴다.
- 전역 파일 손상으로 target이 사라져도, 정산이 멤버십의 `account`로 재개 계정을 정한다.
  이 계정은 attempt 레코드에 계정이 없는 경우에도 있다.

**stale receipt.**
- 저장소 A에 해제된 target의 미소비 receipt가 있고, B에 같은 러너의 새 보류가 있다. 이때
  A의 receipt는 버려지지 않고 소비된다.
- 재시작 뒤 같은 상황에서도 소비된다.
- 그 attempt가 다시 보류돼 살아 있는 멤버십을 가지면 버려진다.

**정리.** 한 저장소에서 attempt가 정리되면 멤버십만 빠지고 전역 target은 남는다.

**이관.**
- 두 큐의 같은 target이 하나로 합쳐지고 멤버십이 계정과 함께 보존된다.
- 다시 실행해도 결과가 같다.
- 계정 미해석 target은 큐에 남는다.
- 이관 전에 있던 receipt는 이관 뒤 첫 `start()`에서 버려지지 않고 소비된다.

**투영.**
- 자기 보류가 없는 저장소의 `decorateQueue`에 전역 target이 `attempt_ids: []`로 실린다.
- lane-model이 그 저장소 대기 행에 보류 칩을 그린다.
- 모니터와 Worker 카드가 같다(카드 동일성 테스트).

**뒤집히는 기존 테스트.** 저장소별 의미를 전제한 다음 단언은 새 의미로 고친다.
- `queue-store.test.js`: 비게 된 `usage_limit` target 삭제, generation 불일치로
  receipt 폐기
- `provider-health.test.js`: workspace 인자를 받는 `probeNow`·타이머 키
- `scheduler.test.js`·`lane-model.test.js`: 계정이 있는 outage가 러너 전체를 막는다는
  단언이 `credential`에 적용되는 경우

## 8. 결정 (ADR 후보)

- 공급자 보류의 원본은 서버 전역 하나다. 계정 범위 target(`usage_limit`·계정이 있는
  `credential`)은 그 계정을, 그 밖의 outage는 러너를 모든 저장소에서 막는다. 막는 대상은
  디스패치·전환 후보·선제 전환이다. 계정 미해석 target만 그 저장소에 남는다. 저장소는 보류
  attempt의 멤버십을 `target_id`와 계정으로 가리킨다. 해제는 전역에서 한 번 일어나고, 각
  저장소가 자기 멤버십을 정산한다. receipt는 그 attempt가 다시 보류됐을 때만 stale이다.
  - 되돌리기 어렵다: 이관이 큐의 target을 전역 파일로 옮긴다. 함께 움직여야 하는 소비자는
    다음과 같다.
    - queue-store 진입·해제·정리
    - scheduler 게이트·전환·선제 전환
    - provider-health 타이머 키·프로브 소유
    - attach wait-judge 입력
    - `decorateQueue` 투영
    - 모니터 조립
  - 맥락 없이는 놀랍다: 보류 이력이 없는 저장소가 막히고, 그 저장소 큐 파일에는 보류가 없다.
  - 트레이드오프: 진입 원자성(큐 한 번 쓰기)을 전역 → 큐 두 번 쓰기와 재시작 정산으로
    바꾸는 대신, N번 헛디스패치와 중복 프로브·알림을 없앤다.
  - 통합: ADR UI-a5l2는 UI-inge에서 공급자 게이트·전환·프로브·재개 조항을 승계했다. 그래서
    이 결정과 소비자 집합이 같다. 이 ADR이 UI-a5l2를 대체한다. UI-a5l2의 모든 조항은
    그대로 승계한다. 승계하는 조항은 다음과 같다.
    - 가드: 실행 전 거부·pre-push 예방·사후 base 착지 감지, 큐 단위 보류 부재
    - ADR 0007 승계 조항
    - UI-inge 승계 조항: 프로브만 해제 판정, `↻ 지금 프로브`는 target을 지우지 않음,
      프로브 상한 없음, 계정 해석 사다리 세 층, fail-closed 계정 미해석, hold 소멸 시
      `provider_gate` 기록 소멸, 전환 재개 단일성, 같은 계정 기동 직렬화
  - 바뀌는 것은 두 가지다.
    - 그 조항들이 적용되는 범위가 저장소에서 서버 전역으로 넓어진다.
    - "인증 실패는 계정 단위 공급자 보류"라는 기존 조항을 게이트 판정까지 지키게 한다
      (§5.1 보류 범위). 조항을 뒤집는 것은 없다.
  `summary`: "공급자 보류의 원본은 서버 전역 하나이고 usage_limit·인증 실패는 계정, 그 밖의 outage는 러너 단위로 모든 저장소의 디스패치와 전환 후보를 막는다; 계정 미해석 target만 저장소에 남고, 저장소는 보류 attempt를 target_id·계정 멤버십으로 가리키며, 해제는 전역 한 번 뒤 각 저장소가 자기 멤버십을 정산한다 — UI-a5l2의 가드·공급자 조항은 그대로 승계한다" → ADR, supersede UI-a5l2
- 기다리는 attempt가 없는 `usage_limit` target도 프로브 해제까지 선다 — 위 ADR의 한
  귀결이라 소비자 집합이 같다 → ADR 아님
- 프로브 cwd는 `origin` 저장소, 없으면 상태 디렉터리 — 되돌리기 쉬운 구현 세부 → ADR 아님

## 9. 경계·후속

- 관찰: `publicProviderHolds`가 표시용 `next_probe_at`을 `rearm_count < 3`·24h 상한으로
  계산한다(`server/ws/worker-handlers.js:3002-3017`). 프로버에는 이 상한이 없다(UI-inge).
  §5.5 투영을 고칠 때 같은 함수에 손이 간다. 구현 중 fix-now로 흡수할 수 있고, 별도 Bead
  후보는 아니다. 근거는 §2에 있다.
- 관찰: attach되지 않은 저장소(시작 뒤 등록)는 디스패치하지 않는다. 그래서 정산 대상에서
  빠진다. 모니터 투영에는 전역 target이 그대로 보인다.
