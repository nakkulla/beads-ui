# 워커: detached 세션 종료 미관측 복구 — 단일 reconcile 루틴 (UI-xhb7)

- 대상 Bead: UI-xhb7 (root cause 조사·실측 타임라인·배제 가설은 Bead 본문이 원본)
- 선행 스펙: `docs/superpowers/specs/2026-07-26-worker-phase2-pr-queue.md` §1(관측 판정)
  §4(pr_wait) §8(유지 코어)

## 문제 요약

세션은 서버 재시작을 살아남도록 detached 로 스폰되지만(`runner/session.js:143`),
종료 관측은 자식 프로세스 핸들(`onSessionDone`)에만 의존한다. 재시작을 살아남은
세션의 종료는 아무도 관측하지 못하고, 유일한 백스톱인 orphan 감지는 기동 시 1회뿐이라
재시작 시점에 살아있던 세션은 영구 `running` 으로 굳는다 — 슬롯 점유 + PR 을 이미
제출했어도 `pr_wait` 미진입. 현행 orphan reap 은 PR 실재 여부를 보지 않는 무조건
실패 처리라 정상 완료 복구 경로 자체가 없다.

## §1 단일 reconcile 루틴 (scheduler 소유)

`createScheduler` 에 `probePid` dep 을 추가하고 `scheduler.reconcile(workspace)`
(async) 를 신설한다. 기동 orphan 경로와 주기 경로가 이 하나의 루틴을 공유한다
(구현 이원화 금지).

**대상 선별** — persisted attempt 중 `status === 'running'` 이고, 이 프로세스의
in-memory `running` 핸들에 없는 것만. 현 프로세스가 스폰해 핸들을 쥔 세션은
`onSessionDone` 이 권위이며, reconcile 이 건드리면 종료 직후 이중 처분 레이스가
생긴다.

**사망 판정** — 현행 `orphan.js` 판정을 그대로 승계한다: `pid == null` → 사망;
`kill(pid, 0)` 실패 → 사망; 생존이지만 프로세스 시작시각이 attempt 기록과 허용오차
(2s) 밖 → PID 재사용, 사망. 선행 스펙 §8 유지 코어의 "orphan 감지(PID + 프로세스
시작시각 대조)"는 이 루틴 안에서 판정 로직 그대로 유지된다. 프로브는 기존
`defaultProbePid`(`attach.js`) 재사용. 생존 attempt 는 손대지 않는다(재시작을
살아남아 아직 실행 중인 정상 세션).

**사망 attempt 처분** — exit 는 관측 불가이므로 `null` 로 보존하고, 곧장
`verify.verifyPrSubmitted({repo, bead_id})` 로 판정한다(exit 0 은 원래도 권위가
아님 — `onSessionDone` 주석의 기존 설계와 정합). 관측 결과 `verify_result` 를
attempt 에 기록한다 — pr-poller 의 `resolvePrRef` 가 `pr_wait` bead 의 PR 번호를
attempt 의 `verify_result` 에서 읽으므로 이 기록 없이는 이동 후 폴링이
`pr_ref_unknown` 으로 막힌다. 이후 분기는 `onSessionDone` 성공/실패 분기를 그대로
따른다:

- `vr.ok` → `revertWorkflowMode`(실패 시 fail-closed:
  `failAttempt('workflow_mode_revert_failed')` 로 전환하고 lane 이동 차단) →
  `revertExecStamps`(best-effort) → `store.moveToPrWait(...)` 단일 persist
  (`{status: 'done', finished_at}`). **auto_advance 는 건드리지 않는다** — 정상
  완료 복구는 큐를 멈추지 않는다.
- `!vr.ok` → `failAttempt(workspace, attempt_id, bead_id, prior,
  'verify_failed:<reason>')` 재사용 — `pr_missing`(관측 성공·빈 결과) /
  `gh_observation_failed`(조회 오류, verifier 내부 짧은 재시도 후 fail-closed) /
  `bd_record_failed` 3-상태 구분을 그대로 보존한다. 기존 실패 동작(attempt
  `failed` + auto_advance OFF + mode/stamp revert + `in_progress` 한정 claim
  해제 + 배너)이 여기서 유지된다.
- `prior`(workflow_mode 복원값)와 exec stamp 키는 attempt 의 durable 기록
  (`workflow_mode_prior`, `exec_stamped_keys`)에서 읽는다.
- 각 처분 후 `notifyChanged` + `tick` (onSessionDone 과 동일 — pr_wait 진입
  즉시 관측 훅과 후속 dispatch 가 이것으로 이어진다).

attempt status 어휘: 사망 attempt 의 신규 처분은 `failed`(cause
`verify_failed:<reason>`)로 기록하고 `orphaned` status 는 더 이상 생성하지
않는다. 프런트는 `failed`/`orphaned` 를 동일하게 실패 배지·재실행 대상으로
렌더하므로 UI 변경이 없고, 레거시 `orphaned` 기록의 렌더는 유지한다(이력 불변).

**동시성 가드** — workspace 당 in-flight 플래그로 reconcile 패스 중복 실행을
막는다(verify 는 수 초 걸릴 수 있음).

## §2 진입점 2개

- **기동**: `initWorkerRuntime` 의 `att.orphan.detect(key)` 호출을
  `scheduler.reconcile(key)` 로 교체한다(fire-and-forget + catch 로그 — 기존
  try/catch 와 동일한 격리). 서버와 함께 죽은 세션도 PR 을 이미 밀어놨을 수
  있으므로, 기동 경로도 동일 판정으로 정상 완료를 복구한다.
- **주기**: workspace attachment 마다 reconcile 타이머를 두고
  `initWorkerRuntime` 에서 start 한다. 간격 60s, `unref`. **구독자 게이팅·
  auto_advance 게이팅 없음** — 복구가 가장 필요한 상태(재시작 직후 auto_advance
  OFF, 아무도 워커 탭을 안 보는 워크스페이스)에서 돌아야 한다. PID 프로브는
  로컬이라 무비용이고, gh 호출은 사망 attempt 발견 시 attempt 당 1회(+ verifier
  내부 재시도)뿐이며, 처분되면 running 이 아니게 되어 반복 호출도 없다. running
  attempt 가 없는 패스는 스냅샷 읽기 외 무비용이다. 타이머 구현(`createPoller`
  재사용 여부)은 구현 재량이되 구독자 무관 실행이 요구사항이다.

## §3 orphan.js 흡수 — 삭제·배선 정리

- `server/worker/orphan.js` 와 `orphan.test.js` 를 삭제한다. 판정 로직과
  시맨틱은 §1 의 reconcile 이 승계하며, 테스트 시나리오(사망 PID·PID 재사용·
  tolerance·auto_advance OFF)는 reconcile 테스트로 승계한다.
- `attach.js`: `createOrphanDetector` 배선과 `onBeadRecovered` 우회 tick 을
  제거하고(reconcile 이 직접 tick), `probePid` 를 scheduler dep 으로 배선,
  attachment 표면의 `orphan` 노출을 제거한다. `attach.test.js` 기대를 갱신한다.
- `server/index.js` 기동부 주석 등 orphan reap 을 전제로 한 서술을 정리한다
  (동작 서술이 실제와 어긋나는 곳만; 문서 전면 정비는 비목표).

## §4 수용 기준

- 서버 재시작을 살아남은 detached 세션이 그 뒤 종료하면 주기 reconcile 이 종료를
  관측해 처분한다. PR 실재 시 `pr_wait` 로 이동하고(attempt `verify_result` 기록
  포함 — pr-poller 가 PR 을 특정 가능) 큐를 멈추지 않는다.
- `pr_missing` → `verify_failed:pr_missing` 실패 처리(기존 정지 동작 유지),
  gh 조회 오류 → `gh_observation_failed` 로 구분되어 fail-closed.
- 기동 경로와 주기 경로가 같은 reconcile 루틴을 공유한다.
- auto_advance OFF + UI 미구독 상태에서도 복구가 동작한다.
- 실측: 잔류 중인 TRACE-ICI attempt(`TRACE-ICI-guu-1785112211059-4`)가 배포 후
  복구되어 TRACE-ICI-guu 가 `pr_wait` 로 이동하고 [머지] 버튼에 도달한다
  (PR #7 머지 여부 자체는 사람 판단, 범위 밖).
- `npm run all` green.

## §5 테스트 범위

scheduler.reconcile 단위 테스트(주입 fake probe/verify/store/bd):

- 생존 PID(시작시각 일치) → 무처분; in-memory running 핸들 보유 attempt → skip.
- 사망 + PR 관측 → `pr_wait` 이동, `verify_result` 기록, auto_advance 불변, exit null 유지.
- 사망 + `pr_missing` → `failed`/`verify_failed:pr_missing`, auto_advance OFF.
- 사망 + gh 오류 → `verify_failed:gh_observation_failed` fail-closed.
- 성공 분기 revertWorkflowMode 실패 → lane 이동 차단, `workflow_mode_revert_failed`.
- PID 재사용(생존·시작시각 불일치) → 사망 판정 (orphan.test.js 승계).
- 패스 중복 가드.

attach/init 테스트: 기동 시 reconcile 호출(기존 attach.test.js orphan 기대 갱신).
주기 경로는 arm 여부 확인으로 끝내지 않는다 — fake timer 로 간격 경과를 흉내내어
`getSubscriberCount: () => 0` + auto_advance OFF 상태에서 실제로
`scheduler.reconcile` 이 호출되고 사망 attempt 가 처분되는지 검증한다(구독자
게이팅이 섞인 타이머 재사용을 테스트가 걸러내야 한다).

## 비목표

- 머지 게이트 tier 판정·`reviewDecision`·`dequeueIfClosed` 변경 (조사로 배제됨).
- detached 스폰 자체의 변경 (의도된 설계).
- PR #7 의 머지/처분 (사람 판단).
- 프런트엔드 변경 (기존 실패 배지·pr_wait 렌더가 그대로 소비) — 번들 재빌드 불요.
