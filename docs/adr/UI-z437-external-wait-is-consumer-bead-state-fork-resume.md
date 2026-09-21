---
id: UI-z437
title: 외부 작업 대기는 소비자 Bead의 external_wait 상태이고 완료는 보존 세션의 fork 재개다
status: accepted
date: 2026-09-21
summary: "외부 작업 대기는 게이트 Bead가 아니라 소비자 Bead의 external_wait 상태이고 관찰·완료·재개는 beads-ui Worker가 소유하며 완료는 보존 세션의 fork 재개다 — Worker 소유는 자동, 세션 소유는 알림 뒤 [이어하기], fork 자격 실패는 launch 없이 [새 세션으로]"
supersedes: [34, "UI-3pu9"]
spec: docs/superpowers/specs/2026-09-21-external-wait-same-bead-fork-resume-design.md
bead: UI-z437
---

# 외부 작업 대기는 소비자 Bead의 external_wait 상태이고 완료는 보존 세션의 fork 재개다

## Context

세션이 Slurm 잡이나 분리된 로컬 프로세스 같은 오래 걸리는 외부 작업을 제출하면
그 작업이 끝날 때까지 기다려야 한다. 이전 인계(dotfiles `bead-job-monitor`, ADR
dotfiles/dotfiles-u53b·dotfiles-t23f)는 (1) 네이티브 human gate Bead를 만들어 소비자
Bead에 `blocks` 엣지를 걸고, (2) 워크트리를 스냅샷 ref로 저장·잠그고, (3) launchd
15분 tick으로 관찰하며, (4) 게이트가 닫히면 소비자가 `bd ready`에 다시 나타나
**새 attempt·새 세션**으로 디스패치됐다(ADR 0034). beads-ui는 그 상태 디렉터리를
읽어 게이트 Bead 자신의 읽기 전용 행(`externalWaitRow`)에 job id와 `[지금 확인]`을
그리고, 소비자 카드에는 `⛓ 선행 대기` 배지와 `⛓ <gate>` 칩만 그렸다.

2026-09-14~18 워치 7건(대기 5h~32h)의 실측에서 비효율의 원인 셋이 드러났다.
재진입이 새 세션이라 작업 기억이 워크트리 스냅샷뿐이고, 등록 의식(인자 15개
CLI·스냅샷·잠금·게이트 Bead·엣지 readback)이 무거우며, 사용자가 보고 싶은
표면(job id·경과·지금 확인)이 일하는 Bead가 아니라 게이트 Bead의 카드에 있었다.
이어하기 메커니즘은 이미 있었다: `base_moved` 보존 후보의 `↻ 이어하기`
(`resume_session_id`, ADR UI-lmqu-2)와 사용자 세션의 fork(`fork_session`,
`qualifySessionFork`). 2026-09-21 사용자 결정: 관찰·완료 인식·알림·재개를 beads-ui가
전부 소유하고, 세션 소유 대기는 알림 뒤 사람이 잇는다.

계약 어휘는 dotfiles `docs/contracts/workflow-state.yaml`의 `external_wait` 블록이
정의하고(ADR 0012, 형제 dotfiles-p0xk) beads-ui는 코드 상수 사본으로 소비한다.

## Decision

### 바뀐 조항

- 외부 작업 대기는 별도 게이트 Bead·`blocks` 엣지가 아니라 **소비자 Bead 자신의
  상태**다. 신호는 metadata 키 `external_wait=<w-12hex>` 하나이고 존재만으로 Worker
  입장을 fail-closed로 막는다(`awaiting_user`와 같은 존재 검사). 그 키는 beads-ui
  Worker만 쓴다 — `detached` 전환 때 set, 재개 launch 성공과 `[관찰 중단]` 때 unset,
  둘 다 readback. 유일한 입장 예외는 "이 레코드의 `bead_id`·`owner.attempt_id`와 이전
  attempt가 일치하고 `completion`이 있다"는 조건을 증명한 `resumeExternalWait` 하나다.
- 관찰·완료 인식·알림·재개는 beads-ui Worker가 **한 런타임에서** 소유한다.
  워크스페이스별 `external-wait.json` 레코드(단계 `hold → done|detached → completing →
  resumed`, 어느 단계에서든 `stopped`), slurm(ssh 고정 원격 스크립트)·process(`ps`
  + 로그 `rc=` 줄) 어댑터, 계약 간격(slurm 120초·process 30초·오류 백오프
  60/120/300/900초)의 관찰기, 잡 전부 terminal일 때 `completion`(digest·recovery_needed)
  기록이 그것이다. 관찰기는 잡을 제출·취소·재시도하지 않는다.
- 세션 안에서 얼마나 기다릴지는 예측이 아니라 **hold 예산**(3턴 × 540초)으로 서버가
  판정한다. 등록 시 아직 terminal이 아닌 잡 집합 J에 대해 J 비어 있음 → `done`,
  slurm pre-RUNNING → `detached`, RUNNING인데 UNLIMITED·파싱 불가·잔여 > 예산 →
  `detached`, 그 밖(예산 이내 RUNNING·process·상태 미확인) → `hold`. hold 완료는
  응답일 뿐 재개를 시작하지 않는다.
- Worker 디스패치 세션은 `대기 · external:<wait_id>` 줄로 끝나고, Worker는 서버
  자신의 레코드로 증명해 `waiting/external_job`으로 종결한다 — 결과 줄이 없거나 다른
  줄로 끝난 attempt도 레코드가 있으면 같은 종결이고, 줄은 있는데 레코드가 없으면
  대기가 아니라 실패(`external_wait_unproven`)다. 워크트리는 스냅샷·잠금 없이 그대로
  보존한다(`resumableResidueAttempts` 후보에 `waiting/external_job` 추가).
- 완료는 **보존 세션의 fork 재개**다. Worker 소유는 원 attempt 종단·Bead `open`·
  `awaiting_user` 부재·미정산 예약 없음을 확인한 뒤 자동으로 예약 → fork launch
  (`resume_session_id` + `fork_session:true`, 완료 페이로드 `## 외부 작업 완료`) → 키
  unset·`resumed` 정산이다. 세션 소유는 Discord 알림 뒤 사람이 `[이어하기]`를 눌러
  같은 경로를 연다. fork 자격 실패(세션 id·전사·워크트리 부재, 러너 불일치)는 launch
  없이 `resume.error`를 남기고, `[새 세션으로]`(fresh)는 사람의 클릭으로만 열린다.
  재시작 정산은 예약과 launch 증거(`launched_at` 또는 실제 실행된 attempt)로 하고
  `completion` 하나로 재개 여부를 추정하지 않는다.
- 소비자 카드가 표면이다: 슬롯 1 배지 `⏳ 외부 작업`(`completing`은 `✅ 완료 ·
  이어하기 대기`/`↻ 재개 중`, 이상 시 `⚠ 지연`/`⛔ 조치 필요`), 슬롯 1 조작
  `[지금 확인]`·`[관찰 중단]`·`[이어하기]`·`[새 세션으로]`, 슬롯 3 헤드라인·해제·오류
  줄, 슬롯 5 `ssh <host>`·잡 번호·`log` 칩, 슬롯 7 제출·확인·다음·완료 시각. 종류
  라벨 `외부 계산`은 `외부 작업`이 된다. `⛓ 선행 대기`·`⛓ <ID>`는 이 대기에 그리지
  않는다 — `blocks` 엣지가 없다. 게이트 행·게이트 상세 오버레이·`bead-job-monitor`
  수집기·`monitor_tick_now`는 삭제한다. `runnable-cache`의 `issue_type === 'gate'`
  제외는 남는다 — 네이티브 게이트는 bd의 다른 용도로 남는다.
- ADR 0034에 대해: "재스캔 후보는 waiting attempt ∪ `prerequisite_unmet` admission"과
  "복귀 판정은 `bd ready` 한 번" 조항을 `external_job` waiting attempt에 대해
  뒤집는다 — 복귀 신호는 `bd ready`가 아니라 완료 이벤트이고, `external_job`은 재스캔
  후보가 아니다(`runWaitingRescan`은 `prerequisite_unmet`만 본다).
- ADR UI-3pu9(UI-lmqu 승계)의 "새 Beads 상태·metadata·가짜 의존성은 만들지 않는다"
  조항을 `external_wait` 한 키에 대해 뒤집는다. 다른 새 상태·의존성은 여전히 만들지
  않는다.

### ADR 0034에서 승계하는 조항

- 복귀 트리거는 이벤트 구독이며 cadence 타이머는 두지 않는다. 0023의 이벤트 구독·
  `bd ready` 한 번·`tickPass`·throttle·"not-ready에 아무것도 쓰지 않는다"·재시작 시
  재스캔 1회를 계승한다.
- admission 거부는 선행 대기를 진단으로 기록한다: not-ready 거부 지점은
  `snap.status === 'open'`일 때 미해결 `blocks` 선행을 읽어 `prerequisite_unmet` +
  `blockers: [{ id, rig, status }]`를 기록하고, 조회 실패나 선행 부재는
  `not_ready:<status>` 토큰으로 떨어진다(fail-quiet).
- 재스캔 후보는 waiting attempt(`external_job` 제외) ∪ `prerequisite_unmet` admission
  큐 항목이다. 직렬 레인 head가 아닌 멤버도 후보이고 발차 규칙은 `tickPass`가
  소유한다.
- foreign 트리거 매칭은 `queue.admission`의 `prerequisite_unmet` blockers 중 `rig`가
  발신 root의 prefix와 같은 항목을 본다.
- ready에서만 admission을 지운다: `bd ready` 교집합으로 복귀가 확인된 bead의
  `prerequisite_unmet` 기록만 `tickPass` 전에 지우고, 사람의 처분을 기다리는 기록은
  건드리지 않는다.
- 새 트리거는 없다: `fire()`, 활동 버스, attachment 시작 시 1회.

### ADR UI-3pu9에서 승계하는 조항

- 자동 진행 꺼짐(`auto_advance === false`)은 대기 카드에도 요약에도 표시하지
  않는다. 서버는 `auto_advance_off` 사유를 내지 않고 그 `start_now` 조작도 없다.
  대기 행은 `manual_only`를 지며(워크스페이스 `auto_advance`가 정확히 `false`일 때만
  `true`) 그 행에는 유예 칩과 유예 `[지금 시작]`·1초 유예 타이머가 없다.
  `[지금 시작]`의 게이트 조건(공급자 보류·큐 정지)은 그대로이고, 막힘 요약의 `큐:`
  줄은 `정지 a`만 남는다. `worker-queue-start-now` op와 `start_now_requests`·
  `serial_lane_not_head`는 바꾸지 않는다.
- (UI-8gem 승계) 카드의 대기 상태는 슬롯 1 배지 하나다 — 종류 라벨(선행 대기·외부
  작업·반영 대기·세션 대기·재시도 대기·처분 대기·한도 대기·공급자 장애)에 판정
  글리프(`⚠`·`⛔`)와 `지연`/`조치 필요`를 붙인다. 사유가 여럿이면 verdict 심각도 다음
  종류 순서(`awaiting_user` > `stale_work` > `recovery` > `provider_hold` >
  `prerequisite_foreign` > `prerequisite` > `base_moved` > `retry_wait`)로 대표 하나를
  고른다. 큐 단위 사유는 슬롯 4a 게이트 칩 하나로만 선다. `막힘 N`은 이슈 단위 사유가
  하나라도 있는 원래 이슈 수이며 `external_job`은 원래 이슈로 한 번 센다. 새 대기
  종류나 사유는 어휘 표에 행을 더하고 배지 또는 게이트 칩 어느 한 층에만 놓는다.
- (UI-cmx3 승계) 직렬 레인은 순서대로 쌓고 후보 수집은 점유되지 않은 직렬 레인의
  선두 하나만 넣으며 `prerequisite_unmet`을 건너뛰는 예외는 없다. 실행 전과 실행
  직전의 두 검사는 같은 동기 판정 `serialHeadOf`를 쓴다. `[지금 시작]`은 지정한 이슈
  하나의 실행 권한이고 뒤 항목으로 넘기지 않는다. 레인·항목 단위 우회 옵트인은 두지
  않는다.
- (UI-wc67 승계) 연결 레인은 폐기하고 의존은 일반 `blocks` 간선, 실행 위치는
  저장소별 병렬·직렬 대기열만 쓴다. 대기 중 이슈는 레인·상대 순서·진입 시각을
  보존한다. 직렬 실행은 한 번에 하나다. 자동 진행과 자동 머지는 별개다. 요청
  저장소의 `bd ready`가 확인한 이슈만 선행 대기를 지우고 원래 자리에서 복귀한다.
  기존 `blocks` 간선·대기열·실행 세션·완료 이력은 보존하고 `cross-lanes.json`은
  퇴역 자료로 남긴다. 과거 큐와 attempt의 arm 필드는 권한으로 소비하지 않는다.
- (UI-lmqu 승계) `waiting`은 종료된 attempt의 기계 사실 대기이며 실패나 사람의
  설계 결정 대기가 아니다. 기존 `TERMINAL_ATTEMPT_STATUSES`와 정산 경로를 쓰고 실행
  슬롯을 해제한다. `external_wait` 한 키를 제외한 새 Beads 상태·metadata·가짜
  의존성은 만들지 않는다. `prerequisite_unmet`은 기존 선행 증명을 쓰고 유일한
  fence는 `bd ready` 부재다. `base_moved`는 종료 표식의 후보와 기준 SHA를 검증한
  경우만 인정하고 기존 `quickfix_landing`에 보존하며, 기준 이동 대기는 자동 새 구현을
  막고 `↻ 이어하기`만 기록된 세션을 재개한다. 기준 이동 카드는 슬롯 1 `반영 대기`와
  `.op-btn` `↻ 이어하기`다.
- (UI-cmx3-2 승계) 화면 대표는 "무엇을 기다리나"가 정한다. 실행 중 그리드는 세션이
  돌거나 attempt 자체를 사람이 처리해야 하는 것만 담고, 선행을 기다리는 bead는 대기
  행이다. 강등 재료는 `attempt.cause === 'prerequisite_unmet'` 하나이고 그 밖은
  타일이다(fail-closed). 기록은 바꾸지 않는다. `복귀 대기` 배지·`return_overdue`
  판정은 두지 않고 해제된 선행은 4b `🔓 <ID>` 칩이 말한다. 선행 대기의 시각은 이슈
  상세 참고 줄로만 남기며 외부 작업·공급자 보류의 지연 판정과 알림은 유지한다.

## Consequences

- 되돌리기 어렵다: 레거시 관찰 경로(`external-job-observations.js`·게이트
  행·오버레이·`bead-job-monitor` tick)를 지우고 계약 키를 더했으므로 이전 인계로
  돌아가려면 beads-ui와 dotfiles 두 리포를 함께 되돌려야 한다.
- 맥락 없이는 놀랍다: 대기 중인 Bead가 `bd ready`에 나열되는데 Worker가 집지 않고,
  `bd dep list`에 아무 엣지가 없다. 입장을 막는 것은 `external_wait` 키 하나다.
- 실제 절충 — §2의 네 대안을 기각했다. 세션이 그냥 기다리기(8시간에 약 48턴의
  캐시 재읽기, 슬롯 점유, 헤드리스 대기 상한·공급자 장애·재시작이 세션을 죽인다 →
  hold 예산으로만 허용), 게이트 Bead·`blocks` 유지 + fork(등록 의식·이중 표면·
  `bd ready` 복귀 판정이 남는다), Python `bead-job-monitor` 관찰 전용 재사용(두 리포
  런타임 결합, JS 재구현이 200~300줄로 더 싸다), fork 자격 실패 시 자동 fresh(맥락
  없는 새 세션이 소리 없이 일한다).
- 키가 있는데 레코드가 없거나 레코드가 종단인데 키가 남으면 카드는 `⛔ 조치 필요 ·
  대기 레코드 없음`을 그리고 `[관찰 중단]`이 키를 지운다 — 어느 쪽이 남아도
  fail-closed다.
- 관찰 완료는 구현 완료가 아니다: 아티팩트의 의미 검증·복구·커밋·완료는 재개된
  세션이 한다(완료 페이로드에 고정 문장으로 실린다).
- 잡 취소·재제출 조작과 클러스터→tailnet push 가속은 범위 밖이다.
