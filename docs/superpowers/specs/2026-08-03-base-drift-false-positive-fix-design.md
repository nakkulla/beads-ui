# base-drift 오탐 수정 — 리베이스 자세 배제와 per-SHA PR 프로버넌스 (UI-43bh)

- Bead: UI-43bh (discovered-from: UI-53es)
- 대체 관계: `2026-07-30-guard-enforcement-layer-replacement-design.md`(UI-8mvc) §3의
  판정 절차(3~6단계)를 이 스펙이 대체한다. §3의 대상·실행 지점·저장·위반 처분은
  그대로 유지된다. 원 문서는 역사 기록으로 수정하지 않는다.

## 문제

`observeBaseDrift`(`server/worker/base-drift.js`)는 attempt 커밋을
`rev-list <pinned>..refs/heads/<bead_id>` 로 계산한다. 원 설계는 이 walk를 "이
attempt 가 만든 커밋"으로 정의했지만, attempt가 이동한 base 위로 **리베이스**하면
base의 새 커밋(다른 유닛의 squash 커밋 등)이 브랜치의 조상으로 들어와 이 walk에
포함된다. 그 커밋은 base 이동분 `rev-list <pinned>..<observed>` 와 교집합을
이루고, this-branch 머지 PR 예외(자기 PR은 아직 OPEN)에 걸리지 않아
`via: 'direct_push'` 위반으로 확정된다 — `failAttempt(base_landing_detected)` +
큐 정지.

실측 사례(UI-53es attempt, 2026-08-03): pinned `dfa4073`, observed `51e4b79`
(= PR #81 UI-j6wa squash 커밋), 교집합 `[51e4b79]`. attempt는 main에 push한 적이
없고, #81 머지로 앞서간 origin/main 위로 리베이스했을 뿐이다. 리베이스는 이
워크플로의 권장 절차이므로, pin 이후 base가 움직이고 리베이스한 모든 attempt가
이 오탐을 밟는다.

## 결정의 전제 — 토폴로지는 방향맹이다

"attempt가 base에 push해서 공유됨"과 "base가 먼저 받고 attempt가 리베이스로
상속함"은 관측 시점의 커밋 그래프가 동일하다. 따라서 walk 앵커를
merge-base/observed로 옮기는 수정은 불가능하다 — 공유된 커밋은 항상 merge-base
아래로 삼켜지므로, 앵커 이동은 진짜 위반(랜딩된 커밋)도 함께 배제해 감지기를
영구 침묵시킨다. 수정은 판정 전 **예외(exclusion)를 쌓는 것**뿐이고, 사용 가능한
판별 수단은 두 가지다: containment(로컬 git 자세 판정)와 PR 프로버넌스(gh 관측).

이 둘로도 못 가르는 잔여 셀이 있다: "리베이스 후 base가 또 움직였고 상속분에 PR
없는 직접 push 커밋(스펙/플랜 publish)이 포함된 경우"와 "defeat-push 후 남의
커밋이 위에 쌓인 경우"는 토폴로지·프로버넌스 모두 동일하다. 이 잔여 셀은
위반으로 남긴다(사용자 결정, 2026-08-03): 복합 희귀 케이스로 축소된 오탐을
감수하고 `--no-verify` defeat의 사후 감지력을 유지한다.

## 판정 파이프라인

`observeBaseDrift` 의 판정 순서를 다음으로 교체한다. **모든 단계에서 관측 실패는
기록이고 위반이 아니다**(기존 철학 유지).

1. **이동 없음** — `observed == pinned` → record 없음, 종료. (기존)
2. **strict containment [신규]** — `git rev-parse refs/heads/<branch>` 로 head를
   얻고, `observed != head` 이면서 `git merge-base --is-ancestor <observed>
   refs/heads/<branch>` 가 참이면 리베이스 자세다: 브랜치가 observed base를 통째로
   깔고 앉아 있고 그 위에 자기 커밋이 있다. `violation: false`, record
   `{ pinned, observed, excluded: 'branch_contains_observed' }`.
   - strict 조건(`observed != head`)이 미탐 경계를 지킨다: attempt가 자기 브랜치
     tip을 base로 push한 위반 자세는 `observed == head` 라 여기서 배제되지 않고
     아래로 내려간다.
   - `--is-ancestor` 는 **exit 1이 "조상 아님"이라는 정상 부정 답변**이고
     exit >1만 관측 실패다. 부정 답변은 3단계로 진행하고, 실패는
     `error: 'containment:merge_base'` 로 기록 후 종료한다. `rev-parse` 실패는
     `error: 'containment:rev_parse'`.
3. **walk·교집합** — 기존 그대로. 교집합 없음 →
   `{ pinned, observed, landed: false }` ordinary record. (기존)
4. **this-branch 머지 PR 예외** — 기존 그대로. `via: 'pr_merge'`.
5. **per-SHA PR 프로버넌스 [신규]** — 교집합 각 SHA에 대해
   `gh.mergedPrsForCommit(repo, sha, resolved.base)` 를 호출한다(세 번째 인자는
   `observeBaseDrift` 가 이미 들고 있는 강제 재해석 결과의 base 브랜치명).
   - 전부 설명됨(각 SHA에 머지 완료이고 base ref가 target base와 일치하는
     연관 PR 존재 — 판정 조건은 아래 gh 관측 절이 소유) → `violation: false`, record
     `{ pinned, observed, landed: true, via: 'other_pr_merge', shas: <교집합 전체> }`.
   - 질의 실패(어느 SHA든 error) → `violation: false`,
     `error: 'pr_observe:<reason>'` 기록 후 종료.
   - 교집합이 상한 **20개**를 넘으면 질의하지 않고 `violation: false`,
     `error: 'pr_observe:sha_cap'` — 관측 미완은 유죄 증거가 아니다(fail-open).
6. **위반** — 미설명 SHA 잔존 → `violation: true`, record
   `{ pinned, observed, landed: true, via: 'direct_push', shas: <미설명 SHA만> }`.
   `shas` 는 위반이 딛고 서는 증거라는 기존 docstring 의미를 유지한다.

record 타입(`BaseDriftRecord`) 확장: `excluded?: 'branch_contains_observed'`,
`via` 에 `'other_pr_merge'` 추가, `error` 에 `containment:*` /
`pr_observe:sha_cap` 스텝 추가. "없는 키는 거기까지 관측이 못 갔다는 뜻"이라는
기존 규약을 유지한다 — containment 배제 record에는 `landed`/`shas` 를 넣지
않는다(교집합을 계산하지 않았으므로).

## 새 gh 관측 — `mergedPrsForCommit`

`server/worker/gh.js` 에 커밋 연관 PR 관측을 추가한다:

- 서명: `mergedPrsForCommit(repo_dir, sha, target_base)`. `target_base` 는
  호출자(`observeBaseDrift`)가 든 `resolveBase({ force: true })` 결과의 `base`
  브랜치명이다 — 이 인자 없이는 `ok`/`empty` 를 결정할 수 없다.
- 저장소 해석: 기존 `resolveRepo(repo_dir)` 로 origin push slug를 얻어
  `repos/<slug>/commits/<sha>/pulls` 경로를 직접 구성한다. `{owner}/{repo}`
  placeholder 추론은 cwd의 기본 저장소에 의존해 fork 환경에서 `upstream` 을
  조회할 수 있으므로 쓰지 않는다(기존 gh.js가 이미 막아둔 실패 모드). 해석 실패
  → `error: 'origin_unresolvable'`.
- pagination: 이 endpoint는 기본 30건 페이지 응답이다. `--paginate` 로 전체
  페이지를 평탄화해 관측하고, pagination을 완료하지 못하면 `error` 로
  fail-open한다 — 첫 페이지만 보고 `empty` 를 답하면 "관측 미완은 유죄 증거가
  아니다"를 위반한다.
- 판정(3-state): 응답 항목 중 `merged_at != null && base.ref === target_base`
  를 만족하는 PR 존재 → `ok`(data에 해당 PR). 만족 항목 없음(연관 PR 없음,
  전부 미머지, 전부 base 불일치) → `empty` — 위반 판정을 허용하는 유일한 답.
  질의/파싱/pagination 실패, malformed payload → `error` — 유죄 증거로 쓰지
  않는다. REST 응답에는 `state: 'MERGED'` 표현이 없다 — 머지 여부는 반드시
  `merged_at` 으로 판정한다.
- **구현 리스크(실측 필수)**: squash 머지의 `merge_commit_sha` 에 대해 이
  endpoint가 해당 PR을 돌려주는지 구현 시점에 실측 검증한다. 돌려주지 않으면
  `gh pr list --state merged --search <sha>` 를 대체 경로로 쓴다. 어느 쪽이든
  서명·3-state 계약은 동일하다.

## 배선

- scheduler의 4개 호출 지점(`onSessionDone` 정상/⏸■ 경로, dead attempt 정리,
  `scheduler.js:1179/1204/1755/3703` 부근)은 **변경 없음** — 주입되는 `gh` 객체에
  메서드가 추가될 뿐이다.
- `scheduler.js` 의 gh dep typedef(`:244` 부근)와 `base-drift.js` 의 input
  typedef에 `mergedPrsForCommit` 을 추가한다. base-drift 쪽은 기존
  `mergedPrForBranch` 와 같은 결측 처리를 따른다(`pr_observe:no_gh`).
- `preamble.js` 의 가드 고지 문구는 수정 후에도 참이므로 손대지 않는다.

## Test scope

시드 1~8이 RED→GREEN 시드, 시드 9는 baseline GREEN 회귀 가드다.
`observeBaseDrift` 시드(1~7)는 기존 `server/worker/base-drift.test.js` 에, gh
시드(8)는 기존 `server/worker/gh.test.js` 에 추가한다 — 두 파일 모두 이미
존재하며 전 의존성 주입형이라 repo 없이 단위 테스트한다. 최종 판정값이 현
구현에서도 같게 나오는 자세(시드 2·3)는 **명령 경로 assertion으로 RED를
만든다** — 판정값만 검사하면 현 구현에서 vacuous 통과한다.

1. **리베이스 자세 배제 (핵심 회귀, UI-53es 재현)** — observed가 branch head의
   strict ancestor → `violation: false`, `excluded: 'branch_contains_observed'`.
   RED: 현 구현은 `via: 'direct_push'` 위반을 낸다.
2. **push-tip 위반 자세 유지 (미탐 경계 가드)** — `observed == head`, PR
   무설명 → `violation: true`. RED는 명령 경로로 만든다: 주입 git이
   `rev-parse` 를 **실행했고** strict 조건 단락으로 `merge-base` 를 **실행하지
   않은 채** walk로 진행했음을 assert한다(현 구현은 `rev-parse` 호출 자체가
   없다).
3. **`--is-ancestor` exit 1** — 부정 답변으로 walk 진행(실패 기록이 아님):
   `merge-base` 가 **실행되었고** 이어서 walk `rev-list` 가 실행됐음을
   assert한다(현 구현은 `merge-base` 호출 자체가 없다). exit >1 →
   `error: 'containment:merge_base'`, `violation: false`.
4. **per-SHA 전부 설명** — `violation: false`, `via: 'other_pr_merge'`,
   `shas` = 교집합 전체.
5. **per-SHA 부분 설명** — `violation: true`, `shas` = 미설명 SHA만.
6. **per-SHA 질의 실패** — `violation: false`, `error: 'pr_observe:<reason>'`.
7. **sha_cap 초과** — 21개 교집합 → 질의 없이 `violation: false`,
   `error: 'pr_observe:sha_cap'`.
8. **`gh.mergedPrsForCommit`** (`gh.test.js`, runJson/실행 mock) — ① ok:
   `merged_at != null && base.ref === target_base` 항목 존재 ② `merged_at:
   null`(open) 만 → `empty` ③ base.ref 불일치 merged PR만 → `empty` ④
   malformed payload → `error` ⑤ argv: `repos/<origin slug>/commits/<sha>/pulls`
   경로와 `--paginate` 포함, slug 해석 실패 → `error: 'origin_unresolvable'`
   ⑥ 다중 페이지 평탄화 응답에서 2페이지째 일치 PR을 찾는다.
9. **기존 회귀 (baseline GREEN, RED 아님)** — `base-drift.test.js` ·
   `scheduler.test.js` · `attach.test.js` 의 기존 위반/기록 경로 테스트는
   not-contained 자세이므로 판정이 유지되어야 한다. gh stub에
   `mergedPrsForCommit` empty 추가만 허용(결측이면 `pr_observe:no_gh` 로
   위반이 사라지므로, 위반 유지를 검증하는 기존 테스트는 empty stub을 준다).

## 비범위

- 현재 멈춘 UI-53es attempt의 재개(UI ▶ 사용자 조작으로 처리).
- 원격 base 자동 되돌림(원 설계대로 하지 않는다).
- record-only 자세(`excluded`/`other_pr_merge`)의 UI 표시 확장 — queue.json
  기록으로 충분하며, 표시는 필요해질 때 별도 유닛.
- §3의 대상 제외(disposition/no_base_oid)·실행 지점·저장 방식 변경.
