# 워커: 정지 잔재 dispatch 정합 + 조용한 실패 배지화 + closed 자동 dequeue (UI-rw78)

## 문제 (실측)

1. **조용한 dispatch 실패**: `scheduler.js` `dispatch()`의 `worktree.add` 실패
   catch(현 507행 부근)는 claim만 반납하고 아무것도 기록하지 않는다. ■(stop)로
   폐기한 bead는 `.worktrees/<bead_id>`가 남는데(`stop()`은 attempt·lane만
   정리), 재투입하면 `git worktree add -B`가 exit 128
   (`already used by worktree`)로 실패해 **배지·로그·attempt 없이 영구 무진행**이
   된다. 실사례: `dotfiles-nwr8`, `TRACE-ICI-guu` — 잔재 워크트리 수동 제거
   직후 정상 dispatch로 복구 확인(2026-07-27).
2. **데이터 손실 경로**: `worktree.add`는 `-B`로 브랜치를 base에 강제
   리셋하므로, 잔재 브랜치에 고유 커밋이 있으면(실사례: `TRACE-ICI-guu`
   15+ 커밋) 재실행이 이를 말없이 폐기한다. 현재는 잔재 워크트리가 add를
   막아주는 우연에 의존하고 있고, 워크트리만 지워지고 브랜치가 남은 경우엔
   보호가 전혀 없다.
3. **closed bead 대기열 잔류**: 워커 밖에서(수동 PR 머지 등) `closed`가 된
   bead가 대기열에 남으면 매 tick `not_ready:closed` 배지만 반복하며 영구
   잔류한다. 실사례: `dotfiles-rdwr` (2026-07-26 closed, 이후 계속 잔류).

## 변경 ① — worktree 실패의 배지화 (fail-visible)

- `dispatch()`의 `worktree.add` 실패 catch에서
  `recordSkipReason(workspace, bead_id, 'worktree_add_failed')`를 기록하고
  `dispatch_refused.add(bead_id)` 후 admission 거절 경로(현 516–527행)와 동일하게
  `tickPass` 재진입으로 남은 슬롯을 진행시킨다.
- 프런트는 사유 문자열을 일반 렌더(`⛔ <reason>`)하므로 프런트 변경 없음.

## 변경 ② — 정지 잔재 수명주기 정합

- **공유 안전 판정**: `worktree.js`에 잔재 검사 헬퍼를 추가한다. 입력
  `{repo, bead_id, base}`, 판정 대상은 워크트리 디렉터리와 브랜치
  `<bead_id>` 각각의 존재 여부, 워크트리 dirty 여부(`status --porcelain`),
  브랜치 고유 커밋 수(`git rev-list --count <base>..<branch>`). 반환은
  구조화된 관측값(존재/dirty/ahead)이며 정책 판단은 scheduler가 한다.
  "폐기 가능"의 정의: **워크트리 clean 그리고 브랜치 ahead == 0** (브랜치나
  워크트리가 아예 없으면 해당 항목은 자동 통과).
- **dispatch pre-flight**: `worktree.add` 호출 전에 잔재를 검사한다.
  - 폐기 가능 → 잔재 워크트리 제거 후 정상 진행(자가 치유).
  - 폐기 불가(dirty 또는 ahead > 0, 워크트리 없이 브랜치만 ahead인 경우 포함)
    → `recordSkipReason(workspace, bead_id, 'worktree_stale_work')`로
    fail-closed 거절(잔재는 건드리지 않음), `dispatch_refused` + `tickPass`
    재진입. 이것이 `-B` 강제 리셋에 의한 커밋 손실 방지막이다.
  - 검사 자체가 실패(git 오류)하면 fail-closed로 `'git_error'` 거절.
- **stop() best-effort 정리**: ■ 종료 경로(라이브 세션 stop과 paused-discard
  stop 모두)에서 같은 안전 판정을 돌려 폐기 가능할 때만 워크트리를 제거한다.
  판정 불가·제거 실패는 로그만 남기고 무시(pre-flight가 다음 방어선).
  `pause()`는 재개용이므로 잔재를 유지한다(변경 없음).

## 변경 ③ — 터미널 bead 자동 dequeue

- queue-store에 서버 내부용 무-CAS 뮤테이션(예: `dropFromQueue`)을 추가한다:
  대기열에서 bead 제거 + 해당 admission 배지 삭제를 한 번의 persist로 수행.
- `tickPass`와 `dispatch`의 not-ready 분기에서 스냅샷 `status === 'closed'`일
  때 배지 기록 대신 이 뮤테이션을 호출하고 ws 구독자에게 통지한다.
- `resolved`/`in_progress` 등 비터미널 상태는 현행 배지 유지(정보 보존).
  workflow 계약 표면(라벨·metadata 키)은 건드리지 않는다.

## 비목표

- pause 잔재 정리(재개 전제이므로 유지), pr_wait/Done 레인 의미 변경 없음.
- `resolved` 자동 dequeue 없음(PR 경로는 pr_wait 레인 소유).
- 배지 사유의 UI 라벨 한글화 등 프런트 표시 개선 없음(서버 전용 변경,
  번들 재빌드 불요).
- `-B` 플래그 자체의 대체 없음(pre-flight가 안전성을 보장).

## 수용 기준

1. `worktree.add`가 throw하면 `worktree_add_failed` 배지가 기록되고 같은 tick
   캐스케이드에서 재시도 루프가 생기지 않는다(scheduler 단위 테스트).
2. clean + ahead==0 잔재가 있으면 dispatch가 이를 제거하고 정상 실행된다.
3. dirty 잔재 또는 ahead>0 브랜치(워크트리 유무 무관)가 있으면
   `worktree_stale_work` 배지로 거절되고 잔재가 그대로 보존된다.
4. ■ stop 시 폐기 가능한 잔재는 제거되고, 폐기 불가 잔재는 보존된다
   (두 stop 경로 모두).
5. 대기열의 `closed` bead는 다음 tick에서 배지 없이 대기열에서 제거되고
   구독자 스냅샷에 반영된다; `resolved`는 기존처럼 배지만 남는다.
6. 잔재 검사 헬퍼의 관측값(존재/dirty/ahead)이 실제 git 상태와 일치한다
   (worktree 통합 테스트).
7. `npm run all` green (tsc·test·lint·prettier).
