# 워커 PR 검증 정합 — 자동머지 자기충돌과 대체 ref 사각지대

- Bead: UI-b8n8
- 작성일: 2026-07-29

## 배경

`auto_merge`가 켜진 워크스페이스에서, 워커가 디스패치한 세션이 PR을 정상
제출하고 끝냈는데도 attempt가 `verify_failed:pr_missing`으로 실패 기록되고
`auto_advance`가 꺼진다. 완료된 일이 실패로 남고 무인 레인이 멈춘다.

실측 2건 (dotfiles workspace, 2026-07-29, 시각은 KST):

| Bead | PR | 머지 | attempt verify | 결과 |
| --- | --- | --- | --- | --- |
| `dotfiles-z0oj` | #327 (`dotfiles-z0oj`) | 09:48:46 | 09:49:04 | `pr_missing` |
| `dotfiles-e6k6` | #328 (`dotfiles-e6k6-r2`) | 09:59:53 | 10:00:04 | `pr_missing` |

두 건 모두 PR은 머지됐고 bd는 `closed`이며 post-merge verify 로그가
`$XDG_STATE_HOME/bdui/<slug>/verify-logs/`에 남아 있다. 즉 **beads-ui 자신이
머지·정리까지 마쳤는데, 같은 서버의 워커가 그것을 실패로 기록했다.**
`queue.json`의 `pr_wait`은 비어 있었다 — 두 Bead는 워커 레인을 거치지 않고
external 경로로 머지됐다.

## 결함 A — external 레지스트리가 워커 자신의 Bead를 집는다

`externalPrs` 레지스트리의 정의는 "워커 스케줄러를 한 번도 거치지 않은 Bead의
PR"이다(`external-pr.js` 모듈 주석). 일반 세션에서 사람이 끝낸 Bead는
`queue.json`에 attempt 기록이 없어 레인에 보이지 않으므로, bd를 훑어 메모리에만
올려 보이게 한다.

문제는 스캔 조건이 `status=resolved` + `metadata.pr_url`뿐이라는 것이다
(`attach.js:588-604`, `bd.scanBeads()`). 워커가 지금 굴리고 있는 Bead도 세션이
PR Delivery에서 그 두 값을 쓰는 순간 조건을 만족한다. **살아있는 attempt를
가진 Bead를 제외하는 필터가 없다.**

등록되면 그 다음은 자동으로 진행된다.

1. `merge-candidates.js:93-115` `overlaidPrWait`이 레지스트리 행을 레인에 합친다
2. `auto-merge.js`가 머지 큐에 편입한다
3. 드라이버가 머지하고 post-merge cleanup을 돌린다
4. 그 뒤에야 세션이 끝나고 `scheduler.js:1065`의 verify가 OPEN PR을 찾는다 — 없다

### A가 오판정보다 위험한 이유

post-merge cleanup의 단계 순서는
`base_sync → post_merge_verify → deploy → child_sweep → branch_cleanup →
parent_close → ship_exported_capabilities`이고(`pr-actions.js:93-101`),
`branch_cleanup`은 `worktree.remove()` + `git branch -D` +
`push origin --delete`를 실행한다(`pr-actions.js:1022-1052`).

즉 **세션이 아직 살아 있는 워크트리를 지울 수 있다.** 실측 e6k6는 머지 09:59:53,
세션 종료 10:00:04로 11초 차였고 그 사이를 post-merge verify(약 2분)가 메웠다.
verify가 빠른 레포이거나 세션이 bd 기록 후 몇 분 더 도는 경우 라이브 워크트리가
통째로 사라진다.

## 결함 B — verify가 브랜치 하나에만 결합돼 있다

`verify.js:141`의 `verifyPrSubmitted`는 `branchForBead(bead_id)`의 **OPEN PR**
하나만 관측한다. 성공 신호가 그것뿐이다.

force push는 push-safety hard invariant가 금지하므로, main 전진으로 PR이
`dirty`가 된 세션은 rebase 후 **새 ref로 재발행**한다. `dotfiles-e6k6`가 정확히
그 경우로, 실제 PR은 `dotfiles-e6k6-r2` 위에 있다. 브랜치명이 다르므로 이
관측은 **영구히** 비어 있다 — 경쟁 상태와 무관하게 항상 실패한다.

`metadata.pr_url`에 진짜 PR이 적혀 있는데도 읽지 않는다. 그 키는 워커 자신이
성공 시 back-fill하는 계약 키이고 dotfiles `docs/contracts/workflow.md`가
소유하는 canonical durable metadata다. 관측이 그것을 무시하는 것은 정합이 아니다.

## 왜 둘 다 필요한가

서로 대체하지 못한다.

- A만 고치면 e6k6형 대체 ref는 여전히 영구 `pr_missing`이다.
- B만 고치면 판정은 맞아지지만 자동머지가 실행 중 세션의 워크트리·브랜치를
  지울 위험이 그대로 남는다.

## 접근 A — external 등록 정의 정정

`refreshExternalPrs()`가 `pr_rows`를 `runtime.externalPrs.replace()`에 넘기기
전에, **이 워크스페이스에 살아있는 attempt를 가진 bead_id를 제외한다.**

활성 집합은 새로 정의하지 않는다. UI-m6bg가 `sweepClosedQueue`
(`scheduler.js:573-642`)에 이미 구현한 스케줄러 소유 union을 그대로 쓴다.

- `claimed` — attempt 기록 이전의 dispatch claim
- `dispatch_refused`
- `leafPausedBeads(q)` — 이어받힌 이력 pause는 제외한 리프 pause
- 비-terminal attempt (`scheduler.js:594-607`)

이 union은 현재 `sweepClosedQueue` 본문에 인라인되어 있으므로
`activeBeadIds(workspace)`로 추출해 스케줄러 공개 표면에 노출하고
(`sweepClosedQueue`와 같은 자리), sweep도 그 함수를 호출하도록 바꾼다.
`refreshExternalPrs`는 이미 `scheduler.sweepClosedQueue`를 부르고 있으므로
같은 방식으로 `scheduler.activeBeadIds`를 소비한다. 판정 기준이 두 벌로
갈라지면 어느 쪽이 옳은지 말할 수 없게 된다.

제외 판정은 `queue.json` 스냅샷의 동기 읽기다 — `sweepClosedQueue`가 동기인
것과 같은 이유로, 판정과 등록 사이에 디스패치가 끼어들 창을 구조적으로 없앤다.
세대 카운터(`external_scan_generation`) 로직은 건드리지 않는다.

### A가 닫는 경로

poller의 관측 레인 자체가 `pr_wait ∪ external 레지스트리`이므로
(`pr-poller.js:470`), 레지스트리에서 빠진 Bead는 세 트리거 어디에도 잡히지
않는다.

- 자동머지 편입
- PR-대기 레인의 사람 `[머지]` 클릭 (행 자체가 렌더되지 않음)
- 외부에서 머지된 PR의 관측 → cleanup

### 부수 효과

실행 중 Bead의 PR이 PR-대기 레인에 더 이상 표시되지 않는다. 이는 회귀가 아니라
정정이다 — 그 Bead는 실행 그리드에 이미 렌더되고 있고, "대기 중"이 아니다.

## 접근 B — verify 관측 2단화

`verify.js`의 관측을 브랜치 조회 → `pr_url` 폴백 2단으로 만든다. 새 gh 어댑터
메서드는 필요 없다. `gh.prDetail(repo_dir, number)`가 이미
`OPEN|CLOSED|MERGED`를 그대로 돌려주고(`gh.js:493-545`), `empty` 상태가 없어
"번호를 아는데 못 읽었다"는 항상 error로 분류된다.

```
observe(branchForBead(bead_id))
├─ ok    → 성공 (기존 경로, 변경 없음)
├─ error → 재시도 후 gh_observation_failed (기존, 변경 없음)
└─ empty → 폴백
            bd.readMetadata(bead_id, 'pr_url')
            ├─ 없음 / parsePrNumber 실패 → pr_missing
            └─ 있음 → gh.prDetail(repo, number)
                       ├─ OPEN   → 성공
                       ├─ MERGED → 성공 (pr_state='MERGED')
                       ├─ CLOSED → pr_missing
                       └─ error  → gh_observation_failed
```

주입 의존성은 `gh`에 `prDetail`을 더하는 것으로 끝난다. `bd`는 이미
`readMetadata`를 갖고 있고(`createVerifier` deps), `parsePrNumber`는
`workflow-enrich.js:285`에서 그대로 가져온다.

`recordToBd`(= `pr_url` 기록 + `resolved` + 각각 readback)는 그대로 재사용한다.
idempotent이므로 이미 두 값을 쓴 세션은 그냥 통과한다.

MERGED로 성공한 경우에도 `pr_wait`으로 보낸다. poller가 곧 MERGED를 관측해
정리 choreography(브랜치·워크트리 삭제, 배포, bd close)를 마무리하므로 잔재가
남지 않는다. 별도 레인으로 우회시키면 그 정리를 건너뛴다.

## 수정 후 데이터 흐름

```
세션 PR Delivery (bd resolved + pr_url)
   │  [A] 살아있는 attempt → external 등록 제외 → 관측 레인 밖 → 머지 후보 아님
세션 종료
   │  [B] verify: 브랜치 OPEN → (없으면) pr_url PR의 OPEN/MERGED
성공 → pr_wait 진입
   │
자동머지 → 머지 → cleanup(정리·배포·bd close)
```

## fail-closed 경계

유지한다.

- gh 관측 실패는 **절대** `pr_missing`으로 강등하지 않는다 — `gh` 장애가 "세션이
  PR을 안 열었다"로 읽히면 안 된다는 기존 계약 그대로다.
- CLOSED-unmerged는 완료가 아니다 → `pr_missing`.
- bd 기록/readback 실패는 `bd_record_failed`.

느슨해지는 것은 **MERGED 하나뿐**이다. 근거: 머지됐다는 것은 OPEN보다 강한 완료
증거다. verify가 답해야 할 질문은 "PR을 열었는가"가 아니라 "일이 끝났는가"이고,
머지된 PR은 그 질문에 이미 답했다.

`pr_url` 부재는 새로운 실패 사유가 아니다 — 폴백할 대상이 없다는 뜻이고 기존
`pr_missing`으로 그대로 떨어진다.

## 관측 가능성

`VerifyResult`에 `pr_state`(`'OPEN'|'MERGED'|null`)를 추가한다. "머지된 PR을
근거로 완료를 인정했다"가 attempt 기록과 실패 배너 경로에서 보여야 한다 — 보이지
않으면 나중에 왜 통과했는지 재구성할 수 없다.

A의 제외는 정상 동작이므로 로그만 남긴다.

## 테스트

- `verify.test.js` — 브랜치 `empty` + `pr_url`이 OPEN / MERGED / CLOSED /
  `prDetail` error / `pr_url` 부재인 5가지. 브랜치 `ok`·`error` 경로가 기존과
  동일하게 남는지 회귀 확인.
- external 등록 통합 — 살아있는 attempt를 가진 Bead는 레지스트리에서 제외되고,
  attempt가 terminal이면 등록된다.
- `auto-merge.test.js` — 실행 중 Bead가 머지 후보로 잡히지 않는다. A로 인해
  레지스트리가 비어 자동 충족되지만 회귀 방지로 명시한다.
- `scheduler.test.js` — `activeBeadIds` 추출 후에도 `sweepClosedQueue` 동작이
  동일하다.

## 수용 기준

1. 워커가 디스패치한 세션이 PR을 남기고 끝나면, 그 PR이 verify 시점에 OPEN이든
   MERGED이든 attempt가 성공하고 Bead가 `pr_wait`으로 들어간다.
2. 브랜치명과 다른 ref(`<bead-id>-r2` 등) 위의 PR도 `metadata.pr_url` 경로로
   관측된다.
3. 살아있는 attempt를 가진 Bead는 external 레지스트리에 등록되지 않으며,
   자동머지·사람 클릭·외부 머지 관측 어느 경로로도 머지되지 않는다.
4. `gh` 관측 실패는 여전히 `gh_observation_failed`이고 `pr_missing`이 아니다.
5. Pre-Handoff Validation(tsc·test·lint·prettier·build) 전건 통과.
6. 머지 후 `bdui-shared restart`로 공유 서버를 재시작하고 프로세스 경로·포트·HTTP
   응답을 실측한다.

## 비목표

- 이미 `failed`로 기록된 attempt의 소급 복구. 현재 dotfiles 큐에 남은
  `dotfiles-z0oj`/`dotfiles-e6k6` 2건은 손으로 치운다.
- post-merge cleanup 단계 순서 변경. 근본은 "머지 자격 판정 시점"이지 "정리
  순서"가 아니다.
- 사람이 GitHub에서 직접 머지하는 것의 차단. 정당한 사용자 행위다 — B의 MERGED
  인정이 그 경우를 흡수한다.
