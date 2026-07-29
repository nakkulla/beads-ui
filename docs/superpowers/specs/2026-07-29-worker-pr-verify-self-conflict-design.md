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

문제는 스캔 조건이 `status === 'resolved'` + `metadata.pr_url` 존재뿐이라는
것이다(판정 구현은 `bd-metadata.js:359-371`의 `scanBeads`, 호출·등록은
`attach.js:588-604`). 워커가 지금 굴리고 있는 Bead도 세션이 PR Delivery에서 그
두 값을 쓰는 순간 조건을 만족한다. **워커가 소유 중인 Bead를 제외하는 필터가
없다.**

등록되면 그 다음은 자동으로 진행된다.

1. `merge-candidates.js:119-127`이 레지스트리 행을 `external: true`로 레인에 합친다
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

## 접근 A — external 등록에서 워커 소유 Bead 제외

`refreshExternalPrs()`가 `pr_rows`를 `runtime.externalPrs.replace()`에 넘기기
전에, **이 워크스페이스에서 워커가 소유 중인 bead_id를 제외한다.**

### 보호 집합의 정의 — 두 집합을 구분한다

`sweepClosedQueue`(`scheduler.js:573-642`)가 쓰는 활성 union을
`activeBeadIds(workspace)`로 추출해 스케줄러 공개 표면에 노출한다
(`sweepClosedQueue`와 같은 자리). 구성은 현행 그대로다.

- `claimed` — attempt 기록 이전의 dispatch claim
- `dispatch_refused`
- `leafPausedBeads(q)` — 이어받힌 이력 pause는 제외한 리프 pause
- 비-terminal attempt (`scheduler.js:594-607`)

**external 등록의 보호 집합은 그것의 superset이다:**

```
externalProtectedBeadIds(workspace) = activeBeadIds(workspace) ∪ cleanup_pending
```

`cleanup_pending`(`scheduler.js:287`)이 반드시 필요하다. `stop()`은 프로세스가
죽기 전에 attempt를 `stopped`(terminal)로 만들고 lane과 claim을 즉시 반납한 뒤,
잔재 정리를 프로세스의 `done` 프라미스에 매단다(`scheduler.js:3211-3249`,
paused 경로는 3270-3298). 그 창을 지키는 것이 `cleanup_pending` 펜스뿐이다.
`activeBeadIds`만 쓰면 **정확히 그 창에서 보호가 풀려**, `resolved` + `pr_url`을
가진 Bead가 external로 등록되고 아직 종료 중인 프로세스의 워크트리가 cleanup에
지워진다. 이 스펙이 막으려는 바로 그 사고가 stop 경로로 되살아난다.

`sweepClosedQueue`는 기존 `activeBeadIds`를 그대로 쓴다 — 동작 불변이다.
`cleanup_pending`을 sweep에까지 넣으면 종료 중인 Bead의 done 이동만 늦어질 뿐
얻는 것이 없다.

제외 판정은 `queue.json` 스냅샷의 동기 읽기다 — `sweepClosedQueue`가 동기인
것과 같은 이유로, 판정과 등록 사이에 디스패치가 끼어들 창을 구조적으로 없앤다.
세대 카운터(`external_scan_generation`) 로직은 건드리지 않는다.

### A가 닫는 경로

poller의 관측 레인 자체가 `pr_wait ∪ external 레지스트리`이므로
(구현은 `pr-poller.js:503-523`), 레지스트리에서 빠진 Bead는 세 트리거 어디에도
잡히지 않는다.

- 자동머지 편입
- PR-대기 레인의 사람 `[머지]` 클릭 (행 자체가 렌더되지 않음)
- 외부에서 머지된 PR의 관측 → cleanup

### 부수 효과

실행 중 Bead의 PR이 PR-대기 레인에 더 이상 표시되지 않는다. 이는 회귀가 아니라
정정이다 — 그 Bead는 실행 그리드에 이미 렌더되고 있고, "대기 중"이 아니다.

## 접근 B — verify 관측 2단화

`verify.js`의 관측을 브랜치 조회 → `pr_url` 폴백 2단으로 만든다. 관측 자체는
기존 `gh.prDetail(repo_dir, number)`로 충분하다 — 이미 `OPEN|CLOSED|MERGED`를
그대로 돌려주고(`gh.js:493-545`), `empty` 상태가 없어 "번호를 아는데 못 읽었다"는
항상 error로 분류된다.

gh 어댑터에는 **읽기 메서드 하나만 추가한다**: 해석된 `--repo` 값을 돌려주는
`repoSlug(repo_dir)`. 아래 엄격 검증의 2번(저장소 일치)이 그 값을 필요로 하는데,
`resolveRepo`는 현재 어댑터 내부 함수라 밖에서 읽을 수 없다(`gh.js:330`, 반환
객체에 없음). 파싱·캐시 로직은 그대로 재사용하고 노출만 한다 — verify가 origin
해석을 따로 구현하면 그 순간 두 벌이 되고, `--repo` 불일치가 바로 이 어댑터가
존재하는 이유다(`gh.js` 모듈 주석 "WHY EVERY PR OPERATION PASSES AN EXPLICIT
`--repo`").

### 폴백 대상 PR의 엄격 검증

`parsePrNumber`(`workflow-enrich.js:285-299`)를 그대로 쓰지 않는다. 그 파서는
보드 표시용이라 `/issues/<n>`, `#<n>`, 심지어 URL 꼬리의 숫자까지 받아들이고
**저장소를 검증하지 않는다.** 다른 저장소의 URL이나 이슈 링크가 남아 있으면
현재 origin의 전혀 무관한 PR 번호로 해석되어, 그 PR이 MERGED라는 이유로 완료가
인정될 수 있다. 이는 MERGED 완화의 범위를 훨씬 넘는 fail-closed 붕괴다.

폴백은 verify 전용의 엄격 파서를 쓴다.

1. `metadata.pr_url`이 GitHub PR URL 형태 `https://<host>/<owner>/<repo>/pull/<n>`
   에 정확히 맞아야 한다. `issues`/`merge_requests`/`#n`/꼬리 숫자는 거부.
2. 파싱된 `<owner>/<repo>`(github.com 외 호스트는 `<host>/<owner>/<repo>`)가
   `gh.repoSlug(repo_dir)`가 origin push URL에서 해석한 `--repo` 값과
   **일치**해야 한다.
3. `prDetail`이 돌려준 `pr.url`이 `metadata.pr_url`과 일치해야 한다.

셋 중 하나라도 어긋나면 폴백하지 않고 `pr_missing`이다 — 추측하지 않는다.

### 전이표

```
observe(branchForBead(bead_id))
├─ ok    → 성공 (기존 경로, 변경 없음)
├─ error → 재시도 후 gh_observation_failed (기존, 변경 없음)
└─ empty → 폴백
            bd.readMetadata(bead_id, 'pr_url')
            ├─ throw               → bd_read_failed  (fail-closed)
            ├─ null / 엄격 검증 실패 → pr_missing
            └─ 통과 → gh.prDetail(repo, number)
                       ├─ error                → gh_observation_failed
                       ├─ url 불일치            → pr_missing
                       ├─ OPEN                 → 성공 (pr_state='OPEN')
                       ├─ MERGED               → 성공 (pr_state='MERGED')
                       └─ CLOSED               → pr_missing
```

`bd_read_failed`는 새 실패 사유다. `bd.readMetadata`는 bd 실패 시 `null`이
아니라 **throw**하고(`bd-metadata.js:101-111`), `verifyPrSubmitted`의 호출부는
`try/finally`만 가져 catch가 없다(`scheduler.js:1062-1072`). 잡지 않으면 attempt가
terminal 기록 없이 남는다. bd 장애를 `pr_missing`으로 강등하지 않는다는 점에서
`gh_observation_failed`와 같은 성격이며, 재시도는 하지 않는다(`recordToBd`의
`bd_record_failed`와 같은 취급).

### 이미 `closed`인 Bead를 되열지 않는다

`recordToBd`(`verify.js:120-133`)는 status를 무조건 `resolved`로 쓴다. MERGED
전이에서 그대로 쓰면, `pr-finish`나 다른 경로로 **이미 `closed`인 Bead를 되열어**
`pr_wait`에 넣고 cleanup·deploy를 중복 실행시킬 수 있다.

MERGED 전이는 back-fill 전에 `bd.readStatus(bead_id)`를 읽는다.

- `closed` — status를 쓰지 않는다. `pr_url`도 이미 있으면 쓰지 않는다.
  성공으로 판정하되 `already_finished: true`를 함께 돌려준다. 스케줄러는 이
  플래그를 보고 `pr_wait`이 아니라 **done 레인**으로 보낸다. 끝난 정리를 다시
  돌리지 않는다.
- 그 외 — 기존 `recordToBd` 그대로(`pr_url` 기록 + `resolved`, 각각 readback).
  `pr_wait`으로 보내고 poller가 MERGED를 관측해 정리 choreography(브랜치·워크트리
  삭제, 배포, bd close)를 마무리한다.

OPEN 전이는 기존과 동일하다.

주입 의존성은 `gh`에 `prDetail`과 `repoSlug`를 더하는 것으로 끝난다. `bd`는 이미
`readMetadata`/`readStatus`를 갖고 있다(`createVerifier` deps).

## 수정 후 데이터 흐름

```
세션 PR Delivery (bd resolved + pr_url)
   │  [A] 워커 소유(activeBeadIds ∪ cleanup_pending) → external 등록 제외
   │      → 관측 레인 밖 → 머지 후보 아님
세션 종료
   │  [B] verify: 브랜치 OPEN → (없으면) 엄격 검증된 pr_url PR의 OPEN/MERGED
성공 → pr_wait 진입 (이미 closed면 done 직행)
   │
자동머지 → 머지 → cleanup(정리·배포·bd close)
```

## fail-closed 경계

유지한다.

- gh 관측 실패는 **절대** `pr_missing`으로 강등하지 않는다 — `gh` 장애가 "세션이
  PR을 안 열었다"로 읽히면 안 된다는 기존 계약 그대로다.
- CLOSED-unmerged는 완료가 아니다 → `pr_missing`.
- bd 기록/readback 실패는 `bd_record_failed`, bd 조회 실패는 `bd_read_failed`.
- 폴백 대상 PR이 현재 origin의 PR임을 증명하지 못하면 폴백하지 않는다.

느슨해지는 것은 **MERGED 하나뿐**이다. 근거: 머지됐다는 것은 OPEN보다 강한 완료
증거다. verify가 답해야 할 질문은 "PR을 열었는가"가 아니라 "일이 끝났는가"이고,
머지된 PR은 그 질문에 이미 답했다.

`pr_url` 부재는 새로운 실패 사유가 아니다 — 폴백할 대상이 없다는 뜻이고 기존
`pr_missing`으로 그대로 떨어진다.

## 관측 가능성

`VerifyResult`에 `pr_state`(`'OPEN'|'MERGED'|null`)를 추가하고, 스케줄러가 이미
쓰고 있는 `verify_result` attempt 패치(`scheduler.js:1069-1072`)에 실려 durable
레코드로 남는다. "머지된 PR을 근거로 완료를 인정했다"가 `queue.json`의 attempt
기록에서 재구성 가능해진다.

**UI 노출은 이번 범위가 아니다.** `verify_result`는 현재 `app/` 어느 투영에도
전달되지 않고 `pr-poller.js:107`만 읽는다. 배너·전사에 띄우려면 스냅샷 투영과
템플릿을 함께 바꿔야 하며, 그것은 실패 배너 표면을 다루는 UI-a9ys와 겹친다.
여기서는 durable 레코드까지만 책임진다.

A의 제외는 정상 동작이므로 로그만 남긴다.

## 테스트

- `verify.test.js` — 브랜치 `empty` 이후 폴백 전이 전수:
  `pr_url` 부재 / 엄격 검증 실패(`/issues/`, `#n`, 꼬리 숫자, 타 저장소 URL) /
  `readMetadata` throw → `bd_read_failed` / `prDetail` error →
  `gh_observation_failed` / 반환 url 불일치 / OPEN / MERGED / CLOSED.
  브랜치 `ok`·`error` 경로가 기존과 동일하게 남는지 회귀 확인.
- `verify.test.js` — MERGED + bd status가 이미 `closed`면 `setStatus`가 호출되지
  않고 `already_finished`가 실린다.
- external 등록 통합 — 살아있는 attempt를 가진 Bead는 제외되고, attempt가
  terminal이면 등록된다.
- **stop-window 회귀** — `stop()` 직후 `cleanup_pending`에 있는 Bead는 attempt가
  `stopped`(terminal)여도 external 레지스트리에 등록되지 않는다. 펜스가 풀린
  뒤에는 등록된다.
- `auto-merge.test.js` — 실행 중 Bead가 머지 후보로 잡히지 않는다. A로 인해
  레지스트리가 비어 자동 충족되지만 회귀 방지로 명시한다.
- `scheduler.test.js` — `activeBeadIds` 추출 후에도 `sweepClosedQueue` 동작이
  동일하다(`cleanup_pending`은 sweep에 영향을 주지 않는다).

## 수용 기준

1. 워커가 디스패치한 세션이 PR을 남기고 끝나면, 그 PR이 verify 시점에 OPEN이든
   MERGED이든 attempt가 성공한다. 라우팅은 bd status를 따른다 — `closed`가
   아니면 `pr_wait`, 이미 `closed`면 done 레인이며 어느 경우에도 bd status가
   `closed`에서 되돌아가지 않는다.
2. 브랜치명과 다른 ref(`<bead-id>-r2` 등) 위의 PR도 `metadata.pr_url` 경로로
   관측된다. 단 그 URL이 현재 origin의 `/pull/<n>` 형태로 검증될 때만이다.
3. 워커가 소유 중인 Bead(`activeBeadIds ∪ cleanup_pending`)는 external
   레지스트리에 등록되지 않으며, 자동머지·사람 클릭·외부 머지 관측 어느 경로로도
   머지되지 않는다. `stop()` 직후의 종료 창도 포함한다.
4. `gh` 관측 실패는 여전히 `gh_observation_failed`이고, bd 조회 실패는
   `bd_read_failed`다 — 둘 다 `pr_missing`이 아니다.
5. Pre-Handoff Validation(tsc·test·lint·prettier·build) 전건 통과.
6. 머지 후 `bdui-shared restart`로 공유 서버를 재시작하고 프로세스 경로·포트·HTTP
   응답을 실측한다.

## 비목표

- 이미 `failed`로 기록된 attempt의 소급 복구. 현재 dotfiles 큐에 남은
  `dotfiles-z0oj`/`dotfiles-e6k6` 2건은 손으로 치운다.
- `pr_state`의 UI 노출. durable 레코드까지만 — 배너 표면은 UI-a9ys 소관이다.
- post-merge cleanup 단계 순서 변경. 근본은 "머지 자격 판정 시점"이지 "정리
  순서"가 아니다.
- 사람이 GitHub에서 직접 머지하는 것의 차단. 정당한 사용자 행위다 — B의 MERGED
  인정이 그 경우를 흡수한다.
- `parsePrNumber` 자체의 변경. 보드 표시용 관용 파서는 그대로 두고, verify 폴백만
  전용 엄격 파서를 쓴다.
