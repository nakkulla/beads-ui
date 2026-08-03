# base-drift 오탐 근본 수정 — reflog 선점 배제 (UI-zcoi)

- Bead: UI-zcoi (discovered-from: UI-43bh)
- 대체 관계: `2026-08-03-base-drift-false-positive-fix-design.md`(UI-43bh)의
  판정 파이프라인에 배제 단계 하나를 **추가**한다. 기존 단계(strict
  containment, this-branch 머지 PR 예외, per-SHA PR 프로버넌스)는 전부 유지되며
  이 스펙은 그 앞에 새 단계를 끼워 넣을 뿐이다. 다만 UI-43bh §"결정의 전제"가
  "잔여 셀은 위반으로 남긴다(사용자 결정, 2026-08-03)"고 적은 그 잔여 셀을 이
  스펙이 해소한다 — 그 결정은 이 스펙으로 갱신된다. 원 문서는 역사 기록으로
  수정하지 않는다.

## 문제

UI-43bh 수정 이후에도 `base_landing_detected` 오탐이 재발했다. 실측 사례
(UI-nprg attempt `UI-nprg-1785733125585-1`, 2026-08-03):

| 시각 | 사건 |
| --- | --- |
| 13:58:48 | `UI-nprg` 브랜치를 main tip `50e8cc1`에서 생성 (attempt pin = `50e8cc1`) |
| 13:58:50 | attempt 세션 시작 |
| 13:59:10 | **다른 세션**이 스펙 커밋 `58a6eb2`(UI-b6qs 스펙 수정)를 main에 직접 push |
| 14:00:20 | `UI-nprg` 브랜치가 `58a6eb2` 위로 리베이스 |
| 14:15:07 | PR #85 머지로 main이 `7015f08`로 전진 |
| 14:34:34 | attempt 종료 → 관측: pinned `50e8cc1`, observed `7015f08`, 교집합 `[58a6eb2]` → `via: 'direct_push'` 위반 |

attempt는 base에 아무것도 push하지 않았다. 브랜치 커밋 2개(`3ae9d55`,
`83e69d8`)는 브랜치에만 있다.

UI-43bh가 넣은 두 예외가 모두 불발한 이유:

- **strict containment(리베이스 자세)** — "브랜치가 observed base를 통째로 깔고
  앉았는가"를 묻는다. 14:00 리베이스 직후엔 참이었으나 14:15에 base가 더
  전진하면서 거짓이 됐다. 이 예외는 base가 다시 움직이면 유효기간이 끝난다.
- **per-SHA 머지 PR 프로버넌스** — "이 커밋을 담은 머지된 PR이 있는가"를 묻는다.
  `58a6eb2`는 PR 없는 직접 push라 이 질문의 답은 시간이 지나도 영원히 "없음"이다
  (`gh api repos/nakkulla/beads-ui/commits/58a6eb2/pulls` 실측 0건).

## 근본 원인 — 기준이 워크플로와 어긋나 있다

UI-43bh의 프로버넌스 모델은 **"정당한 base 랜딩 = 머지된 PR"** 을 가정한다.
그러나 이 워크플로는 스펙/플랜 artifact를 base에 **직접 push하는 것을 규범으로
요구**한다(`workflow` 계약: 스펙 커밋은 리뷰 dispatch·impl-entry·worktree 생성
전에 즉시 publish). PR이 존재할 수 없는 정당한 base 랜딩이 상시 발생하므로,
"머지된 PR"만 결백 증명으로 받는 기준은 구조적으로 이 워크플로를 오탐한다.

재발 조건은 세 가지 겹침이고, 병렬 워커 + 수시 스펙 publish 운영에서 상시
충족된다(2026-08-03 13:41~13:59 사이 base 직접 push 5건 실측):

1. pin 이후 PR 없는 커밋이 base에 실림
2. attempt가 그 위로 리베이스 (base 이동 시 권장 절차)
3. attempt 종료 전에 base가 1회 이상 추가 전진

## 새 기준 — 누가 먼저 가졌는가

불변식이 실제로 묻는 것은 "이 커밋이 PR을 거쳤는가"가 아니라 **"이 attempt가 이
커밋을 base에 올렸는가"** 다. 커밋은 있는 곳에서 없는 곳으로만 이동하므로, 먼저
가진 쪽이 출처이고 나중에 가진 쪽이 수신자다.

- **base 선점** — 커밋이 base에 먼저 생기고 브랜치가 나중에 갖는다. 브랜치가
  그것을 가질 수 있는 경로는 리베이스/머지/pull뿐이므로 attempt는 받은 쪽이다.
  스펙 직접 push, 남의 PR 머지, 사람 push가 전부 여기 해당한다 → 정당.
- **브랜치 선점** — 커밋이 브랜치에서 태어나고 base에 나중에 나타난다. 브랜치에서
  태어난 커밋이 base로 갈 경로는 push뿐이다 → attempt가 보낸 쪽(위반). 단
  자기 PR 머지는 정상적으로 브랜치 선점이므로 기존 this-branch 예외가 앞단에
  그대로 남는다.

UI-43bh 스펙이 적은 "토폴로지는 방향맹이다"는 여전히 참이다 — 관측 시점의
스냅샷은 두 경우가 동일하다. reflog는 거기 빠져 있던 **시간축**을 제공한다.
fetch·push·리베이스가 모두 같은 `.git`에 획득 시각을 남기므로, 두 ref의 획득
시각을 비교하면 흐름의 방향이 읽힌다. 실측 확인:

```
58a6eb2  refs/remotes/origin/main@{1785733150}   ← base 획득
58a6eb2  refs/heads/UI-nprg@{1785733220}         ← 브랜치 획득 (rebase finish)
                                    base가 70초 먼저 → 상속
```

인과적으로도 안전하다: 아직 로컬에 없는 커밋 위로 리베이스할 수는 없고, 그것을
로컬에 들여오는 fetch가 base 쪽 remote-tracking ref의 reflog 기록을 먼저 남긴다.

## 판정 파이프라인

`observeBaseDrift`(`server/worker/base-drift.js`)의 순서에 4단계를 신설한다.
**모든 단계에서 관측 실패는 기록이고 위반이 아니다**(기존 철학 유지).

1. **이동 없음** — `observed == pinned` → record 없음, 종료. *(기존)*
2. **strict containment** — 리베이스 자세 배제 → `excluded:
   'branch_contains_observed'`, 종료. *(기존)*
3. **walk·교집합** — 교집합 없음 → `{ pinned, observed, landed: false }`. *(기존)*
4. **선점 배제 [신규]** — 교집합의 각 SHA에 대해 base 쪽 ref와 브랜치 ref의 획득
   시각을 구한다. 둘 다 확정되고 `base_t <= branch_t` 인 SHA는 **상속**으로 보고
   교집합에서 제거한다. 제거된 집합은 record `inherited` 에 담는다.
   - 교집합이 비면 → `violation: false`, record
     `{ pinned, observed, landed: false, inherited }`, **gh 호출 없이** 종료.
   - 남으면 남은 집합만 들고 5단계로 진행한다.
   - 어느 한쪽이라도 미확정이면 그 SHA는 배제하지 않는다(폴백).
5. **this-branch 머지 PR 예외** — 남은 집합 대상. *(기존)* `via: 'pr_merge'`.
6. **per-SHA PR 프로버넌스** — 남은 집합 대상. *(기존)* 전부 설명됨 →
   `via: 'other_pr_merge'`.
7. **위반** — 미설명 SHA 잔존 → `violation: true`, `via: 'direct_push'`,
   `shas` = 미설명 SHA. *(기존)*

4단계는 **순수 추가**다. 실패·미확정은 전부 폴백이라 기존 판정을 약화시키지
않고, 최악의 경우 현행 동작으로 수렴한다.

## 획득 시각 계산

`acquisitionTimes(ref, pinned, wanted)` — ref 하나에 대해, `wanted` 집합의 각
SHA가 그 ref에 처음 들어온 시각을 구한다.

```
lines = git reflog show <ref> --date=unix --format='%H %gd'
  실패(code != 0) 또는 파싱 가능한 줄이 없음 → 미확정(null)
파싱: "<40hex> <refname>@{<unix>}" → { commit, t }. 출력은 최신순.
times = {}
for entry in 최신→오래된 순:
    검사 엔트리 수가 REFLOG_CAP(40)에 도달 → 미확정(null) 반환
    contained = parseShas(git rev-list <pinned>..<entry.commit>) ∩ wanted
      rev-list 실패 → 미확정(null) 반환
    if contained 가 비면 → break        // 정상 종료
    for sha in contained: times[sha] = entry.t      // 더 오래된 엔트리가 덮어씀
return times      // wanted 중 키가 없는 SHA는 미확정
```

- 최신→오래된으로 훑고 더 오래된 엔트리의 시각으로 덮어쓰므로 최종값은 **가장
  오래된 포함 엔트리의 시각**, 즉 최초 획득 시각이다.
- 정상 종료는 shared SHA를 하나도 담지 않는 엔트리를 만나는 것이다. 검사 엔트리
  수는 "그 SHA들이 들어온 이후의 엔트리 수"로 자연히 제한된다(실측 사례는 각 ref
  2개).
- `REFLOG_CAP` 40 **도달은 부분 결과를 쓰지 않고 그 ref를 통째로 미확정으로
  만든다**(폴백). 잘린 결과를 쓰면 획득 시각이 실제보다 늦게 잡히는데, 그것이
  브랜치 쪽에서 일어나면 `base_t <= branch_t` 가 허위로 성립해 **진짜 위반을 배제**할
  수 있다. 부분 결과를 버리면 이 방향의 위험이 사라지고 결과는 현행 동작으로
  수렴한다.
- 조기 종료의 전제는 reflog 상의 포함 관계가 단조라는 것이다. 커밋이 브랜치에서
  빠졌다가 다시 들어오는 이력에서는 획득 시각이 실제보다 늦게 잡힐 수 있다. 이
  잔여 위험은 미탐 방향이며, "오탐은 큐 정지와 세션 킬을 부르지만 미탐은 record가
  남는 한 건의 미보고"라는 이 모듈의 기존 선호와 일치한다.

**ref 선택** — base 쪽은 `resolved.remote_ref`(예 `refs/remotes/origin/main`),
`local_only` 로 `remote_ref` 가 null이면 `refs/heads/<resolved.base>`. 브랜치
쪽은 `refs/heads/<bead_id>` (기존 walk와 동일한 ref).

**비교 규칙** — `base_t` 와 `branch_t` 가 모두 확정이고 `base_t <= branch_t` 이면
상속으로 배제한다. 동시각은 상속으로 본다(무죄 추정). 어느 한쪽이라도 미확정이면
배제하지 않는다.

**미탐 경계 유지** — 세션이 커밋한 뒤 리베이스로 자기 커밋이 재작성돼 SHA가
바뀌어도, 새 SHA의 브랜치 획득 시각은 리베이스 시각이고 base 획득은 그 이후
push 시각이므로 브랜치 선점 → 위반으로 잡힌다. 다른 로컬 브랜치에서 만든 커밋을
merge로 들여와 push하는 경로도 브랜치 획득 시각이 merge 시각이라 잡힌다. UI-8mvc
§5 잔여 5(브랜치 밖 커밋을 base에 push)는 이 스펙에서도 미탐으로 남는다 —
브랜치 walk가 비어 교집합 자체가 만들어지지 않으므로 4단계에 도달하지 않는다.

## record 확장

`BaseDriftRecord` 에 `inherited?: string[]` 를 추가한다 — 선점 배제로 제거된
SHA들. 배제가 하나도 없으면 키를 넣지 않는다("없는 키는 거기까지 관측이 못 갔다"
규약 유지).

- 전부 배제 → `{ pinned, observed, landed: false, inherited }`. `landed: false`
  는 "이 attempt의 커밋이 base에 실리지 않았다"는 뜻이므로 정확하다.
- 부분 배제 → 5~7단계의 기존 record 형태에 `inherited` 를 동반한다. `shas` 의
  의미(설명되지 않은 증거 집합)는 그대로다.

`error` 스텝은 추가하지 않는다 — 4단계의 실패는 종료가 아니라 폴백이므로 관측이
계속되고, 최종 record는 5~7단계가 결정한다.

## 배선

- `server/worker/base-drift.js` 한 파일만 변경한다. 주입된 `git` 만 더 쓰므로
  `scheduler.js` 의 호출 지점 4곳과 주입 dep typedef, `gh.js` 는 변경 없다.
- `resolveBase({ force: true })` 결과에서 `remote_ref`/`base` 를 읽는다 — 이미
  같은 함수 안에서 들고 있는 값이다.
- `preamble.js` 의 가드 고지 문구는 수정 후에도 참이므로 손대지 않는다.

## Test scope

seam은 기존 `server/worker/base-drift.test.js` 하나다(전 의존성 주입형이라 repo
없이 단위 테스트한다). 기존 git stub은 `reflog` 를 모르므로 code 128을 돌려주며,
그것이 곧 폴백 경로다 — 기존 54개 테스트는 stub 수정 없이 baseline GREEN으로
유지되어야 한다.

RED 구성 원칙은 UI-43bh와 같다: 최종 판정값이 현 구현에서도 같게 나오는 시드는
**명령 경로 assertion으로 RED를 만든다**(현 구현은 `reflog` 를 호출하지 않는다).

1. **오탐 재현 (핵심 RED, UI-nprg 재현)** — 교집합 1개, base reflog 획득 시각이
   브랜치보다 이름 → `violation: false`, `landed: false`,
   `inherited: [sha]`, gh 호출 0회. RED: 현 구현은 `via: 'direct_push'` 위반.
2. **브랜치 선점 → 위반 유지 (미탐 경계 가드)** — 브랜치 획득이 더 이름, gh
   `empty` → `violation: true`, `shas` = 그 SHA, `inherited` 키 없음. RED는 명령
   경로로: 두 ref의 `reflog show` 가 **실행됐고** 이어서 gh 경로로 진행했음을
   assert한다.
3. **리베이스 재작성 SHA → 위반 유지** — 브랜치 획득(리베이스 시각) < base 획득
   (push 시각) → `violation: true`. 명령 경로 RED는 시드 2와 동일 방식.
4. **동시각 → 상속** — `base_t == branch_t` → 배제, `violation: false`.
5. **reflog 읽기 실패 → 폴백** — base 또는 브랜치 `reflog show` 가 code 128 →
   배제 미적용, 기존 판정(gh `empty` → `violation: true`) 유지. reflog를
   시도했고 gh로 진행했음을 assert.
6. **rev-list 실패 → 폴백** — 엔트리 커밋 walk 실패 → 미확정, 기존 판정 유지.
7. **부분 배제** — 교집합 2개 중 1개만 base 선점 → gh는 **남은 1개에만** 호출되고,
   위반 record의 `shas` 는 남은 1개, `inherited` 는 배제된 1개.
8. **엔트리 조기 종료** — shared SHA를 담지 않는 오래된 엔트리 이후는 훑지 않음:
   `rev-list` 호출 수가 검사 엔트리 수로 제한됨을 assert.
9. **`REFLOG_CAP` 도달 → 폴백** — 41개 엔트리가 모두 shared SHA를 담아 조기 종료가
   걸리지 않는 브랜치 reflog → 부분 결과를 쓰지 않고 미확정 처리, 배제 없이 기존
   판정(`violation: true`) 유지.
10. **`local_only` base** — `remote_ref` 가 null이면 `refs/heads/<base>` 를
    조회함을 argv로 assert.
11. **기존 회귀 (baseline GREEN, RED 아님)** — `base-drift.test.js` ·
    `scheduler.test.js` · `attach.test.js` 의 기존 판정 경로가 stub 수정 없이
    유지된다.

## 비범위

- 현재 멈춘 UI-nprg attempt의 재개(UI ▶ 사용자 조작으로 처리).
- `inherited` record의 UI 표시 — queue.json 기록으로 충분하며, 표시는 필요해질 때
  별도 유닛.
- 예방층(`guard-hook.js`)·`preamble.js` 문구 변경.
- UI-8mvc §3의 대상 제외(disposition/no_base_oid)·실행 지점·저장 방식 변경.
- 원격 base 자동 되돌림(원 설계대로 하지 않는다).
