---
scope:
  - server/worker/runner/codex.js
  - server/worker/runner/claude.js
  - server/worker/runner/session.js
  - server/worker/scheduler.js
  - server/worker/quickfix-landing.js
  - server/worker/worktree.js
  - server/worker/pr-actions.js
  - server/worker/failure-class.js
  - server/worker/queue-store.js
  - server/worker/resolve-session.js
  - server/ws/worker-handlers.js
  - app/utils/quickfix-resume-kind.js
  - app/utils/failure-sentences.js
  - app/views/worker/
  - server/worker/worktree.integration.test.js
  - server/worker/quickfix-landing.test.js
  - server/worker/scheduler.test.js
  - server/worker/pr-actions.test.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md
---

# 업무 종료 판정과 완료 워크트리 정리

- Bead: UI-lmqu
- 경로: spec_backed. 종료 결과와 완료 정리를 한 서버/UI 계약으로 검증하는 단위다.
- 상태: 사용자 방향 승인에 따른 완성 초안. 구현·서비스 변경은 아직 전이다.
- 근거 기준: 88bd8124d638636758fa77c16c4ed3853dbc4996.
- 선행: dotfiles-mub8. 형제: Cortex-2nf.

## 1. 문제와 확정 방향

Cortex-2nf의 실제 로그를 codexSpec().verdict에 넣으면 success=true와
“실패 · 사용자 변경과 원격 계약의 14개 경로 충돌로 동기화 중단”이 함께 반환된다.
success는 프로그램의 정상 종료인데, 뒤의 quick_fix 정산은 이를 업무 인도 검사로
넘겨 push_log_absent를 원인으로 남긴다.

정상 정리는 quickfix-landing.cleanupBranch가 removeIfDiscardable을 부른 뒤 별도
topology lock에서 branch -D를 실행한다. 재실행 잔여물 회수용 함수는 삭제 가능한
내용을 확인한 뒤에도 restore → 재관측 → 삭제 → 오류 시 복원을 수행한다.
정리 실패를 경고로 낮추는 것보다 이 불필요한 변경과 잠금 공백을 제거하는 것이 우선이다.

사용자는 전체 로컬 동기화와 업무 완료를 분리하고, 원래 결과를 정확히 표시하며,
정상 워크트리는 삭제까지 자동으로 마무리하는 방향을 승인했다.

## 2. 선택과 소유권

| 방식 | 효과와 제약 | 결정 |
| --- | --- | --- |
| 기존 결과와 증거를 분리하고 완료 정리 경로를 단순화 | 실제 원인과 사용자 변경 보존을 유지 | 채택 |
| 실패 문장을 모두 경고로 하향 | 실제 적용 실패를 숨김 | 채택하지 않음 |
| 완료 시 무조건 강제 삭제 | 미반영 사용자 변경을 잃을 수 있음 | 채택하지 않음 |

공통 표식·의미는 dotfiles 정본을 소비한다. 이 저장소는 queue 상태, 재개, 표시,
소유 워크트리 정리를 구현한다. 새 네이티브 Beads 상태·metadata·전역 설정은 만들지 않는다.

## 3. 프로그램 종료와 업무 결과

기존 runner verdict.success는 프로그램의 종료 결과로 유지한다. final summary의 첫
비어 있지 않은 줄에서 정본 표식만 읽어 소비자 내부의 업무 종료 분류를 구한다.
일반 문장·도구 출력·인용된 실패 문자열을 성공/실패로 추론하지 않는다.

1. 기존 중단·폐기 fence, 원격 변경 관측, 권한 위조 검사와 실제 프로세스 오류를 먼저 처리한다.
2. 정상 프로세스 종료라도 업무 표식이 실패/환경이면 원래 summary를 실패 원인으로 보존한다.
   인도하지 않은 작업에 후속 push 증거 부재를 주원인으로 새로 붙이지 않는다.
3. 이미 수행된 push·배포 관측은 버리지 않는다. 이를 별도 실행 사실로 보존하되 업무 실패
   문장 하나로 임의 close하거나, 실패한 필수 검증을 건너뛰어 성공 처리하지 않는다.
4. 선행 대기·파킹은 기존 native 의존/metadata를 읽어 검증한다.
5. no-change와 bench는 기존 close_reason 및 증거 분기를 사용한다. 원격 전송이 없는
   정당한 완료에 push 검사를 추가하지 않는다.
6. 그 밖의 정상 종료는 기존 실제 PR/push/리뷰/배포 증거로 판정한다. 성공 문장은 증거가 아니다.

실패 원인은 기존 cause/상세/summary 경로로 전달하며 카드·상세·작업 이력·실패 댓글이
같은 원인을 읽는다. legacy 로그처럼 정본 표식이 없는 실행은 기존 판정을 유지한다.

## 4. 반복 기준 이동의 반영 대기

선행 dotfiles 스펙은 호출 세션의 최대 1회 복구와
`대기 · base_moved:<candidate40>:<base40>` 표식을 소유한다.
서버는 다음을 모두 관측한 경우에만 대기로 정산한다.

- 현재 attempt의 소유 worktree/branch에서 candidate가 존재하고 예상 identity와 일치한다.
- 후보 부모가 기록된 base이며 후보에 결속된 검증/리뷰 증거가 유효하다.
- 원격은 이동했고 후보가 아직 인도되지 않았다. 이미 반영됐으면 기존 인도 증거로 정산한다.
- 실패한 코드 검증, 불명확한 원격 관측, 모호한 소유권을 대기로 바꾸지 않는다.

기존 attempt.status=waiting을 사용하되 cause=base_moved로 선행 대기와 구분한다.
후보는 기존 quickfix_landing에 cursor=null, head_sha=candidate40, reason=base_moved로
보존한다. head_sha를 보존했다는 사실만으로 인도 증거로 인정하지 않는다.
기준 SHA는 해당 attempt 로그 표식의 검증된 base40에서 복구하며, 기존 target_base는
브랜치 이름이므로 SHA를 넣지 않는다. 별도 Beads 키를 만들지 않는다.

| 대기 사유 | fence | 복귀 |
| --- | --- | --- |
| prerequisite_unmet | 기존 bd ready 부재 | 선행 해소 뒤 기존 자동 후보 복귀 |
| base_moved | 해당 보존 후보의 미인도 대기 | 기존 ↻ 이어하기로 기록된 세션·워크트리에서 재개 |

base_moved에 가짜 blocks 이슈나 awaiting_user 값을 만들지 않는다.
이 사유는 슬롯을 해제하지만 자동 후보 재디스패치를 막는다. unrelated bd 이벤트로
원래 구현이 새로 시작되지 않는다. 사용자가 이어하기를 누르면 기존 세션 참조·브랜치·후보를
검증하고 최신 기준 반영부터 이어간다. 일반 신규 worktree 생성/잔여물 회수로 보내지 않는다.
참조나 후보가 사라졌으면 그 사실을 보고하고 다른 워크트리를 삭제하거나 새 구현으로 바꾸지 않는다.

재개 종류 사전에 base_moved를 session으로 명시한다. 미지 사유를 settlement로 보내는
기존 기본값에 기대지 않는다. 같은 attempt의 기계 정리 재시도 의미는 유지한다.

카드는 기존 상태/사유 자리에 “반영 대기”, 기존 조작 슬롯에 “↻ 이어하기”를 표시한다.
새 칩 줄·배너·버튼 종류는 추가하지 않는다. 선행 대기의 blocker 링크와 기존 자동 복귀는 유지한다.
상태는 카드 문법 §5.1의 슬롯 1 정체성, 이어하기는 슬롯 1 조작이며 기존 op-btn을 쓴다.
카드 문법과 조작 문서의 해당 표에 반영 대기에서의 적용 조건만 덧붙여 위치·의미를 고정한다.

## 5. 완료 정리의 입력과 증명

worktree manager에 완료 정리를 맡기는 removeCompleted 경로를 둔다.
새 상태 서비스가 아니라 기존 manager 안의 정상 완료 삭제 연산이다.

입력은 repo, 정확한 소유 branch/path/head, 인도가 확인된 base SHA와 현재 identity다.
호출자는 quick_fix의 실제 포함·배포 또는 PR의 merge·배포 증거를 먼저 확보한다.
no-change는 승인된 효과·close_reason의 기존 증거를 사용한다.

기존 removeIfDiscardable 안의 소유권·커밋/파일 보존 관측을 내부에서 재사용한다.
removeByBranch만 호출해 내용 보호를 생략하지 않는다. 재실행 회수·명시적 폐기의
승인 범위와 독립 의미는 그대로 두고, 정상 완료 호출자를 새 경로로 연결한다.

삭제할 수 있는 경우는 다음뿐이다.

- 등록·실제 경로·branch가 이 작업의 소유 대상과 일치한다.
- 인도한 내용과 남은 커밋/추적·미추적 파일을 비교해 유실할 고유 내용이 없다.
- squash 때문에 해시 계보가 남아 있는 경우 파일·모드의 포함과 필요한 기존 branch
  archive로 내용을 보존한다. 새 archive 서비스나 정상 조상 branch의 불필요한 archive는 만들지 않는다.
- 프로세스 종료 후 정리 시점의 identity가 변하지 않았다. 다른 작업의 열린 worktree나
  새 변경은 대상에 포함하지 않는다.

정상 기준 갱신의 merge commit 자체는 완료 정리의 거부 사유가 아니다.
현재 observeAheadContainment의 ahead_merge_commit 분기는 재실행 잔여물 회수에 유지하되
removeCompleted에 그대로 적용하지 않는다. 고정된 인도 결과와 소유 branch의 공통 조상을
기준으로 branch의 전체 순변경 경로를 열거하고, 각 경로의 최종 파일 내용·모드·삭제가
인도 결과에 포함됐는지 비교한다. merge에서 조정한 내용도 이 최종 트리에 포함한다.
merge 수만 보고 거절하거나, PR이 머지됐다는 사실만으로 비교를 생략하지 않는다.
추적·미추적 고유 변경 보호는 별도로 유지한다. squash 뒤 비조상 이력은 기존 archive
경로로 보존하고 그 ref의 SHA를 읽어 확인한 뒤 원래 branch를 삭제한다.
파일 포함을 증명할 수 없거나 지원하지 않는 객체·관측 오류가 있으면 정확한 사유로 보존한다.

정정(UI-m55x, 2026-09-15) — 위의 경로별 최종 내용·모드 비교는 브랜치가 갈라진 뒤
base가 같은 경로를 바꾼 squash 인도에서 항상 오탐했다(dotfiles-gyno #506: 브랜치 head의
파일 상태와 squash 결과의 파일 상태는 base 변경이 합쳐져 다를 수밖에 없고, 재시도는 같은
결정적 판정을 반복한다). 머지된 PR의 branch head가 기록된 identity와 일치하는 것을 인도
증명으로 삼고, 비조상 이력은 archive 뒤 삭제한다. "PR이 머지됐다는 사실만으로 비교를
생략하지 않는다"와 경로별 비교·`delivery_not_contained`·`unsupported_object` 보존은 이
정정으로 효력을 잃는다. 추적·미추적 고유 변경 보호와 identity·소유 검사는 그대로다.

## 6. 삭제 순서

한 topology lock 안에서 아래 순서를 끝낸다.

1. 소유 worktree와 branch를 관측한다. 둘 다 이미 없으면 성공이다.
2. §5의 반영/내용 보존을 판정하고 삭제 직전 identity·상태를 다시 확인한다.
3. 안전성이 확인된 worktree를 직접 제거한다. 먼저 파일을 옛 HEAD로 restore하거나
   clean 상태를 만들기 위해 파일을 개별 삭제하는 과정은 제거한다.
4. branch는 관측한 SHA를 기대값으로 하는 update-ref 삭제 등 기존 CAS 방식으로 제거한다.
   다른 세션이 바꾼 ref를 무조건 branch -D로 지우지 않는다.
5. worktree 등록·경로·branch가 실제로 없음을 확인하고 결과를 반환한다.

PR의 원격 topic branch 정리는 기존 원격 소유권/포함 검증 경로를 유지한다.
로컬 worktree/branch 삭제를 위해 사람의 main을 sync하지 않는다.

부분 완료 후 재개도 같은 연산이다. worktree만 없어졌으면 남은 branch부터 처리하고,
이미 없는 대상을 오류로 만들지 않는다. 정상 입력에서 정리 완료를 확인해야 close한다.
고유 사용자 변경·소유권 변화·실제 삭제 오류는 구체적 cause와 완료한 단계를 보존하고
현재 정리 재시도 경로로 이어간다. 정상 정리 오류를 무시하거나 구현 전체를 재실행하지 않는다.

## 7. Test scope

- runner/session·scheduler: 실제 Cortex 로그의 최소 fixture로 프로세스 정상/업무 실패를
  재현한다. 실패 원인은 동기화 충돌이며 push_log_absent로 바뀌지 않는다.
- 정본 표식 없는 legacy 성공, 일반 본문의 실패 인용, 실제 turn.failed, 정상 PR/push,
  no-delta/bench, 증거 없는 성공 문장을 각각 검증한다.
- 기준 이동: 유효 후보만 waiting/base_moved로 보존하고 자동 재디스패치를 막는다.
  이어하기가 동일 세션·후보를 사용하며 fresh worktree 회수나 정산-only로 가지 않음을 검증한다.
  선행 대기의 기존 bd ready 자동 복귀와 관련 이벤트는 회귀한다.
- worktree.integration.test.js: 실제 격리 Git repo에서 clean 완료, base와 동일한 dirty
  내용, 고유 dirty/미추적 내용, squash 포함, 이미 없음, 부분 삭제 뒤 재개, branch SHA
  변경, 소유권 변경을 검증한다. 잠금 하나와 실제 경로/ref 부재를 확인한다.
  정상 기준 갱신 merge → squash 인도 → 이력 archive 확인 → worktree·원래 branch 삭제를
  실제 Git 이력으로 재현한다. 같은 이력에서 미인도 내용·모드 차이를 넣으면 보존돼야 한다.
- quickfix-landing/pr-actions: 공유 완료 정리 경로를 사용하고 실제 실패 cause를 보존한다.
  삭제 전 restore 및 별도 branch -D가 실행되지 않음을 핵심 경로 검증에 포함한다.
- 상태·재개·카드 테스트: 반영 대기와 선행 대기를 구분하고 기존 슬롯·↻ 이어하기·접근성
  문구가 일치한다. 새 버튼 수나 문자열 자체만을 위한 구현 복제 테스트는 만들지 않는다.
- Pre-Handoff Validation: Node engines, 새 worktree npm ci, tsc, lint, 변경 파일 prettier,
  vitest 전체 bundle. 공유 서비스 배포 후 실제 프로세스 경로·SHA·HTTP 응답을 확인한다.

## 8. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 공통 종료·표식·로컬 적용 계약의 정본 | 없음 | dotfiles-mub8 |
| 형제 | Cortex | user_request | 사용자 볼트 파일 반영과 의미 충돌 조정 | dotfiles-mub8 | Cortex-2nf |

Stop 알림, 공급자 장애 프로브, 승인·리뷰 위조 방지, 원격 merge/배포 안전성은 유지한다.
연결 레인 제거 작업 UI-wc67의 선행 의존 계산은 바꾸지 않으며 선행 대기 회귀로 호환을 확인한다.

## 결정 (ADR 후보)

- 전제: ADR 0010 — 실제 배포는 저장소별 선언과 Worker의 증거로 판정한다.
- 전제: ADR 0012 — 공통 어휘의 정본은 dotfiles이며 이 저장소는 소비자다.
- 전제: ADR 0014 — 반영 대기는 기존 사유와 조작 슬롯에 표시한다.
- waiting을 사유로 나눠 선행 대기는 bd ready로 자동 복귀하고 반복 기준 이동은 후보를 보존해 같은 세션에서 이어간다. 되돌리기 어려움: 저장 상태·후보 보존·디스패치·재개 소비자를 함께 바꿔야 한다. 맥락 필요: 같은 대기여도 자동 복귀와 사용자 이어하기가 다른 이유는 단일 상태값에 없다. 실제 절충: 단일 자동 복귀의 단순함 대신 사유별 분기와 사용자 조작을 받아들여 후보 유실·중복 구현을 피한다. 세 조건 모두 성립한다. ADR 0028을 대체한다. `summary`: "waiting은 선행 대기와 기준 이동 대기를 구분하며 선행은 bd ready로 자동 복귀하고 기준 이동은 보존 후보를 기존 세션에서 이어간다" → ADR, supersede 0028
- quick_fix 재개 분류에 base_moved를 session으로 명시하고 기존 기계 정리 재시도를 유지한다. 되돌리기 어려움: 카드 조작과 서버의 재개 의미·기록된 세션 참조를 함께 바꿔야 한다. 맥락 필요: 미인도 반영 대기는 기계 정산 실패와 달리 같은 구현 세션을 이어야 한다. 실제 절충: 미지 사유를 정산으로 보내는 기본값의 편의 대신 명시적 분류 한 항목을 유지해 잘못된 정리 재시도를 막는다. 세 조건 모두 성립한다. ADR 0042를 대체한다. `summary`: "quick_fix 재개는 종료 사유로 session과 settlement를 구분하며 base_moved는 보존 세션 이어하기이고 기계 정산은 정리 재시도다" → ADR, supersede 0042
- 완료 worktree·branch 삭제를 같은 잠금에서 증명·실행한다. 되돌리기 어려움: 낮음, 외부 데이터 형식 변경 없는 manager 내부 구현이다. 맥락 필요: 동시 변경 보존 이유는 기존 소유권·CAS 계약으로 설명된다. 실제 절충: 잠금 구간이 길어지는 대신 삭제 중간의 경합을 막는다. 첫 조건이 성립하지 않아 별도 지속 결정으로 남기지 않는다 → ADR 아님
