# 결정 기록 (ADR)

진행 중인 작업은 `bd list --json`. 이 파일은 `adr-index.py`가 생성한다 — 직접 고치지 말 것.

## 현재 유효한 결정
| # | 제목 | 날짜 | 요약 |
| --- | --- | --- | --- |
| 0024 | [폐기 실패의 출구는 셋이고 [폐기 포기]는 아카이브 단계 전용 terminal abandoned다](0024-discard-failure-exits-and-terminal-abandoned.md) | 2026-09-03 | 사용자 개시 작업 실패의 재진입은 자동 알림 뒤 사람 클릭뿐이라는 0022를 승계하되, 폐기 실패의 출구는 재클릭·[폐기 포기]·[세션에서 해결] 셋으로 닫힌다. [폐기 포기]는 아카이브 단계 실패에서만 runner를 되살리고 bead를 폐기 이전 자리로 돌려놓는 terminal `abandoned`이며, 뒤 phase의 실패와 소유권 판정 불능에서는 허용하지 않는다 |
| 0023 | [waiting 복귀 트리거는 cadence가 아니라 이벤트 구독이다](0023-waiting-return-event-subscription-not-cadence.md) | 2026-09-03 | Worker의 waiting 복귀는 cadence가 아니라 이벤트 구독이다 — 같은 rig는 bd 변경 감시, foreign은 owner rig의 활동 버스가 요청 rig의 재스캔을 부르고, 재스캔은 워크스페이스당 leading+cover throttle 안에서 `bd ready` 한 번으로 판정한다 |
| 0021 | [review_session의 생존·슬롯·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다](0021-review-session-lifecycle-owned-by-scheduler-reconcile.md) | 2026-08-29 | review_session은 구현 attempt와 같은 reconcile pid probe로 생존·슬롯 점유·정산 시작을 판정하고 죽은 세션의 결과는 큐의 complete()가 영수증으로 판정하며 살아 있는 리뷰어를 죽이는 부팅 종료는 두지 않는다 |
| 0020 | [blocks 의존은 구현 실행 진입만 막고 spec·plan 작성은 blocked Bead에서도 진행한다](0020-blocks-edge-gates-implementation-entry-only.md) | 2026-08-29 | blocks 의존은 구현 진입(in_progress claim)만 막는다; 세션은 blocked Bead의 spec·plan을 쓰고 게이트 착지에서 끝나며, 선행 결과가 설계 전제인 경우만 spec-after-blocker 라벨로 spec을 미룬다 |
| 0019 | [리뷰 영수증 보류는 큐가 head당 1회 리뷰 lineage를 자동 dispatch해 해소를 시도한다](0019-auto-review-dispatch-once-per-head.md) | 2026-08-28 | 영수증 부재·stale 보류는 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch하고 실패·소진 뒤에는 [리뷰 후 머지]가 같은 lineage를 resume하며 post-merge 자동 수리 금지(ADR 0005)와는 별개다 |
| 0018 | [quick_fix 착지 재개는 정산 커서가 아니라 실패 사유로 판정한다](0018-quickfix-landing-resume-judged-by-failure-reason.md) | 2026-08-28 | 세션이 필요한 사유만 닫힌 목록으로 열거하고 나머지는 전부 같은 attempt의 정산을 다시 돌린다. 정산 계열 어휘는 coordinator가 만들어 열려 있고 settle은 멱등이라 기본값은 정산 쪽이 안전하다 |
| 0017 | [awaiting_user를 남기고 정상 종료한 세션 결말은 parked이며 자동 재디스패치하지 않는다](0017-parked-session-outcome-no-auto-redispatch.md) | 2026-08-28 | 성공 종료 + 미resolved + PR 없음 + awaiting_user는 parked다. 재개는 사용자 클릭 또는 awaiting_user 소거 전이 관측뿐이다 |
| 0016 | [큐 정지 권한은 systemic 실패 계층만 갖는다](0016-queue-hold-only-on-systemic-failure.md) | 2026-08-28 | Worker 큐 정지는 다음 bead에도 재발할 체계적 실패에만 걸고, 개별 실패는 bead 단위로 기록하고 큐를 계속 돌린다. 환경성 실패는 보류→재시도→승격의 사다리를 탄다 |
| 0014 | [레인과 카드는 단일 buildLanes 계약과 공유 슬롯 표로 조립한다](0014-single-build-lanes-contract-and-shared-slot-table.md) | 2026-08-27 | Worker와 Monitor는 워크스페이스 N개를 받는 하나의 buildLanes로 레인을 만들고 카드의 줄 순서와 새 요소의 자리는 공유 슬롯 표가 정한다 |
| 0009 | [병렬성 분석 기능 전면 제거와 수동 배포 실행](0009-parallelism-analysis-removal.md) | 2026-08-27 | 병렬성 분석 기능은 코드·테스트·프로토콜까지 제거하고 수동 [배포 실행] 버튼만 두며 script_retry는 토글 없이 상시다 |
| 0004 | [impl_review 신선도를 exact-head 대신 ancestry로 판정](0004-impl-review-ancestry-freshness.md) | 2026-08-27 | impl_review 영수증은 head와 같거나 그 조상이면 유효하며, head 이동만으로는 재리뷰를 걸지 않고 의미 충돌은 [verify]가 잡는다 |
| 0015 | [30분은 queue-yield deadline이고 충돌 해소 fence는 슬롯 기반이다](0015-queue-yield-deadline-and-slot-based-conflict-fence.md) | 2026-08-19 | 30분은 실패 타임아웃이 아니라 머지 큐 턴을 양보하는 시점이며 충돌 해소 디스패치는 수동 권한 면제와 슬롯 여유로 판정한다 |
| 0013 | [세션 기본값의 source of truth를 dotfiles kv로 이관](0013-session-defaults-owned-by-dotfiles-kv.md) | 2026-08-16 | 워크스페이스 세션 기본값은 dotfiles가 소유한 bd kv workflow_session_defaults 하나이고 beads-ui workspace 레이어는 소유권을 반납했다 |
| 0011 | [auto_merge와 auto_advance는 별개의 스위치](0011-auto-merge-and-auto-advance-independent-toggles.md) | 2026-08-13 | 세션 자동 진행과 자동 머지를 한 스위치로 접지 않는다 — 자동화 클릭만 두 값을 원자적으로 맞추고 자동 머지는 그 뒤 독립 토글로 남는다 |
| 0010 | [배포 실행은 Worker generic execution, 저장소 지식은 repo-ops 스크립트](0010-repo-operation-execution-ownership-split.md) | 2026-08-13 | Worker는 배포를 durable operation journal·전용 워크트리·프로세스 실행으로만 다루고, 저장소별 적용과 확인은 repo-ops [deploy] 스크립트가 소유한다 |
| 0003 | [머지 자격 판정에서 GitHub checks·Actions를 입력에서 제거](0003-no-ci-merge-eligibility.md) | 2026-08-13 | 머지 자격은 저장소 안에서 관측되는 입력(PR/base/head identity·mergeability·리뷰 영수증·실행 영수증·[verify])만으로 판정하고 GitHub checks는 보지 않는다 |
| 0008 | [데이터 계층은 bd CLI shell-out으로 고정](0008-bd-cli-shell-out-data-layer.md) | 2026-08-12 | 데이터 계층은 bd CLI shell-out(스냅샷 기본 2회 read, legacy fallback 3회)이며 DB 드라이버 직결·daemon·batch RPC는 채택하지 않는다 |
| 0007 | [머지 금지 강제를 git 수준 예방과 사후 ref 불변식으로 이전](0007-git-level-merge-guard-enforcement.md) | 2026-07-30 | 머지 금지는 pre-push 훅 예방과 사후 ref 불변식이 강제하고 텍스트 판정은 추론성 판정을 경고로 강등하되 정확한 원격 변경 명령의 kill은 유지한다 |
| 0006 | [세션은 PR 배달까지, 머지는 Worker 단일 큐가 소유](0006-worker-owned-merge-queue.md) | 2026-07-28 | PR로 랜딩하는 작업에서 세션은 PR 배달까지만 하고 머지는 Worker의 단일 순차 큐가 실행하며 완료는 MERGED 관측으로 판정한다 |
| 0012 | [워크플로 계약은 코드 내 field registry로 복제해 소비한다](0012-workflow-contract-consumed-via-code-field-registry.md) | 2026-05-05 | beads-ui는 dotfiles 계약 파일을 런타임에 읽지 않고 필요한 subset만 코드의 field registry로 복제한 소비자다 |
| 0002 | [Per‑Subscription Stores and Full‑Issue Push (Breaking)](0002-per-subscription-stores-and-full-issue-push.md) | 2025-10-26 | 구독 하나당 스토어 하나를 두고 서버는 id 전용 델타 대신 전체 issue 페이로드를 push한다 |

## 이력
| # | 제목 | 상태 | 대체 |
| --- | --- | --- | --- |
| 0001 | [Push‑Only Lists (v2)](0001-push-only-lists.md) | superseded | [0002](0002-per-subscription-stores-and-full-issue-push.md) |
| 0005 | [자동 AI 수리 레인 폐기와 needs_human 종단](0005-no-auto-repair-lane.md) | superseded | [0022](0022-needs-human-auto-notify-click-driven-reentry.md) |
| 0022 | [needs_human은 자동 알림으로 관측되고 재진입은 두 클릭뿐이다](0022-needs-human-auto-notify-click-driven-reentry.md) | superseded | [0024](0024-discard-failure-exits-and-terminal-abandoned.md) |
