# 머지 후 정리의 워크트리 조회 — 이름 계산에서 실측 조회로

- Bead: `UI-u7hh`
- route: `spec_backed`
- 계기: dotfiles `dotfiles-v05o` 머지(PR #342, `2efc4609`) 후 정리가
  `branch_cleanup` 단계에서 `local_branch_delete_failed` 로 멈췄다.

## 왜

worker 는 워크트리가 **어디 있는지 git 에 묻지 않고 계산한다.**

```js
// server/worker/worktree.js:32,78
export function branchForBead(bead_id) { return bead_id; }
function pathFor(repo, bead_id) { return path.join(repo, '.worktrees', bead_id); }
```

서버 전체에 `git worktree list` 호출이 하나도 없다. worker 에게 워크트리 이름은
`bead_id` 하나뿐이다.

### 계약은 두 개의 이름을 허용하고, 소비자는 하나만 안다

dotfiles `routes.md:44` 의 collision ladder 는 브랜치·워크트리 이름의 fallback
`<bead-id>-<YYYYMMDD>` 를 **명시적으로 허용한다.** 같은 문서 43 행은 그 바인딩을
Bead notes 에 기록하라고 요구하고, 실제로 세션은 기록했다 —
`브랜치 dotfiles-v05o-20260804(워크트리 .worktrees/dotfiles-v05o-20260804)`.
worker 는 그 notes 를 읽지 않는다.

fallback 이 나온 경위는 규칙을 어긴 결과가 아니라 규칙을 지킨 결과다. PR #340 이
같은 `workflow.yaml` 의 v26 번호를 선점 랜딩해 재적용이 필요했고, 이미 발행된 구
브랜치를 재사용하려면 force push 가 필요한데 그것은 금지돼 있으며
(dotfiles `docs/contracts/workflow.md:245`), 새 브랜치가 생기면
`worktree basename == branch` 규칙이 새 워크트리를 강제한다. 세션에게 다른 선택지는
없었다.

### 이름 출처가 비대칭이다

`cleanupBranches` 는 두 대상의 이름을 **서로 다른 곳에서** 얻는다.

| 대상 | 이름 출처 | 이번 사건의 값 |
| --- | --- | --- |
| 워크트리 | `pathFor(repo, bead_id)` — 계산 | `.worktrees/dotfiles-v05o` (없는 경로) |
| 브랜치 | `headBranchFor()` — GitHub head_ref | `dotfiles-v05o-20260804` (정확) |

그래서 워크트리 제거는 빈손으로 통과하고, 브랜치 삭제는 정확한 이름을 겨냥한 채
그 브랜치를 점유 중인 워크트리 때문에 git 에 거부된다. `git branch -D` 는 워크트리가
체크아웃 중인 브랜치를 지우지 못한다.

### 관측 실패를 부재로 읽는다

```js
// server/worker/pr-actions.js:1152-1157
if (typeof deps.worktree.exists === 'function' && deps.worktree.exists(repo, bead_id)) {
  return { ok: false, reason: 'worktree_remove_failed' };
}
```

`exists()` 는 `fs.existsSync(pathFor(...))` 다. 계산한 경로가 없으면 false 를 돌려주고,
호출부는 그것을 "워크트리는 이미 정리됨" 으로 읽는다. 실제 상태는 "다른 이름의
워크트리가 살아 있음" 이었다. 이 fail-quiet 때문에 실패가 워크트리 단계에서 정직하게
드러나지 않고 한 단계 뒤에서 터졌다.

### 같은 오판이 prunable 워크트리에서도 난다

워크트리 디렉터리가 사라져도 `.git/worktrees/<name>` admin 레코드는 남아 브랜치를
계속 점유한다. 실측(`git init` 후 워크트리 생성 → 디렉터리 `rm -rf`):

```
worktree .../wt
HEAD e53471a3060b17a6685016a611dc62e3315952c8
branch refs/heads/feat
prunable gitdir file points to non-existent location
```

`git worktree list --porcelain` 은 이것을 정직하게 보여주지만 `fs.existsSync` 는
false 를 반환한다. 이름이 canonical 이어도 같은 경로로 실패한다는 뜻이다 — fallback
이름은 이 버그의 한 가지 발현일 뿐이다. 같은 실측에서 이 상태의
`git worktree remove --force <path>` 는 exit 0 으로 성공했고, 뒤이은 `branch -D` 도
성공했다.

## 무엇을

### §1 `removeByBranch` 를 신설한다

`server/worker/worktree.js` 의 매니저에 메서드를 추가한다. 이 매니저는 경로를 전부
내부에서 계산하고 밖으로는 `pathFor` 만 노출하는 구조이므로, 조회와 제거를 한
메서드 안에 캡슐화해 경로가 밖으로 새지 않게 한다.

```js
async removeByBranch(input) { /* { repo, branch } */ }
```

동작 — `git worktree list --porcelain -z` 를 `cwd: repo` 로 실행하고, 출력에서
`branch refs/heads/<branch>` 를 가진 레코드의 `worktree <path>` 를 찾아,
**소유 경계를 검증한 뒤** `git worktree remove --force <path>` 를 실행한다.

**조회부터 제거까지 단일 토폴로지 락 홀드 안에서** 수행한다. 락을 놓았다 다시
잡으면 그 사이 다른 슬롯이 토폴로지를 바꿔, 이미 성립하지 않는 관측 위에서 제거를
결정하게 된다 — `removeIfDiscardable` 이 같은 이유로 같은 패턴을 쓴다
(`worktree.js:221`). `withTopologyLock` 의 데드락 경계도 그대로 지킨다: 이 메서드
안에서는 raw git 만 호출하고 매니저의 다른 메서드를 부르지 않는다.

#### 소유 경계 — 실측 조회가 넓히는 사정거리를 도로 좁힌다

이름 계산은 그 자체가 경계였다. `pathFor` 는 `repo/.worktrees/<bead_id>` 밖을 가리킬
수 없으므로, 지금 코드는 그 밖의 워크트리를 **구조적으로** 건드리지 못한다. 실측
조회는 저장소에 연결된 모든 워크트리를 반환하므로 그 경계가 사라진다 — 사용자가
`.worktrees/` 밖에 직접 만든 워크트리에서 낸 PR(external PR 레인이 실제로 다루는
경우다)이면, 사람이 쓰는 작업 공간을 `--force` 로 지우게 된다. `remove --force` 를
유지하기로 한 결정 때문에 그 삭제는 되돌릴 수도 없다.

따라서 제거 전에 두 조건을 **모두** 요구한다.

1. 경로가 `repo/.worktrees/` **바로 아래**에 있다 — `path.relative(join(repo, '.worktrees'), wt)` 가
   `..` 또는 경로 구분자를 포함하지 않아야 한다. 문자열 `startsWith` 로 판정하지
   않는 이유는 `.worktrees-backup/` 같은 형제 경로가 접두사를 만족하기 때문이다.
   `.worktrees/.verify/` 의 worker 소유 detached 워크트리는 한 단계 더 깊어 여기서
   걸러지고, 애초에 `branch` 줄이 없어 매칭되지도 않는다.
2. `basename(wt) === branch` — dotfiles `routes.md:43` 이 모든 route 에서 요구하는
   불변식이다. fallback 이름 `<bead-id>-<YYYYMMDD>` 는 워크트리 basename 과 브랜치가
   함께 그 이름을 쓰므로 이 조건을 **만족한다**. 즉 이 검증은 이번에 고치려는 경우를
   배제하지 않으면서, 계약 밖에서 만들어진 워크트리만 걸러낸다.

둘 중 하나라도 어긋나면 제거하지 않고 `foreign_worktree` 로 중단한다. 정리가 멈추는
쪽이 사람의 작업 공간을 지우는 쪽보다 낫고, 그 상황은 사람이 판단할 문제다.

반환 계약:

| 상황 | 반환 |
| --- | --- |
| 그 브랜치를 점유한 워크트리 없음 | `{ ok: true, removed: false, reason: null }` |
| 찾아서 제거 성공 | `{ ok: true, removed: true, reason: null }` |
| 관측 실패 — `worktree list` 실패, 또는 매칭 2건 이상(§2) | `{ ok: false, removed: false, reason: 'observe_failed' }` |
| 소유 경계 밖 | `{ ok: false, removed: false, reason: 'foreign_worktree' }` |
| `worktree remove` 실패 | `{ ok: false, removed: false, reason: 'remove_failed' }` |

`observe_failed` 를 부재와 구분하는 것이 이 절의 핵심이다. 관측 실패를 "없음" 으로
읽는 것이 이번 버그의 형태였고, 같은 형태를 새 코드에 다시 만들지 않는다.
`removeIfDiscardable` 이 이미 `observe_failed` 를 같은 의미로 쓴다.

### §2 파싱 규칙

**`-z` 를 쓴다.** 개행으로 구분하는 `--porcelain` 단독 출력은 저장소 경로에 개행이
들어 있으면 레코드 경계를 잘못 자른다. `-z` 를 붙이면 속성은 NUL 로, 레코드는 빈
속성(연속 NUL)으로 구분되어 경로에 어떤 문자가 있어도 경계가 모호해지지 않는다. git
자신이 스크립트 용도로 이 조합을 권한다. 이 저장소의 워크트리 경로에 개행이 들어갈
일은 거의 없지만, 경계 판정을 데이터 내용에 의존시키지 않는 편이 옳다.

각 레코드는 `worktree <path>` 로 시작해 `HEAD <sha>` 와 `branch <ref>` 또는
`detached` 가 따르고, 부가 속성(`prunable`, `locked`)이 뒤에 붙을 수 있다.

- 매칭은 `branch` 값과 `refs/heads/${branch}` 의 **완전 일치**로 한다. head_ref 는
  `refs/heads/` 접두사 없이 오므로 비교 시 접두사를 붙인다. 부분 일치·접두사 일치를
  쓰지 않는 이유는 `UI-abc` 가 `UI-abcd` 를 잘못 집는 것을 막기 위해서다.
- git 은 한 브랜치를 두 워크트리에서 체크아웃하지 못하게 막으므로 매칭은 최대 1건이다.
  2건 이상이 관측되면 그것은 파싱 오류이므로 `observe_failed` 로 처리한다.
- `detached` 레코드는 `branch` 줄이 없으므로 자연히 매칭되지 않는다.
  `.worktrees/.verify/` 의 worker 소유 detached 워크트리가 여기 걸리지 않는다.
- `prunable` 레코드는 그대로 매칭 대상이다. §1 의 실측대로 `remove --force` 가 성공한다.
- 매칭된 레코드는 §1 의 소유 경계 두 조건을 통과해야 제거 대상이 된다.

### §3 `cleanupBranches` 를 전환한다

`server/worker/pr-actions.js:1148-1157` 의 `remove()` 호출과 뒤따르는 `exists()`
재확인 블록을 `removeByBranch` 한 번으로 교체한다.

```js
const branch = headBranchFor(bead_id, head_ref);
const wt = await deps.worktree.removeByBranch({ repo, branch });
if (!wt.ok) {
  return { ok: false, reason: 'worktree_remove_failed' };
}
```

이후의 `git branch -D` → `git push origin --delete` 와 그 락 경계는 바꾸지 않는다.
워크트리 제거가 매니저 안에서 락을 잡고, 브랜치 삭제는 그 뒤 명시적 홀드에서
실행되는 기존 구조가 그대로 유지된다(`pr-actions.js:1134-1138` 의 LOCK BOUNDARY 주석이
설명하는 배치).

확인 단계가 사라지는 것이 이 절의 요점이다. 조회와 제거가 한 락 안에서 끝나므로
"제거했다고 믿었는데 남아 있었다" 를 별도로 확인할 필요가 없고, 확인하지 않으니
오판할 자리도 없다.

실패 어휘는 `worktree_remove_failed` 를 유지한다. 이 값은 `merge-queue.js:681` 에서
사용자에게 보여주는 문자열로만 쓰이고 파싱 계약이 아니므로, `reason` 세분화가 필요하면
notes 쪽에서 다루고 스텝 어휘는 건드리지 않는다.

### §4 호출부에 존재 가드를 두지 않는다

기존 코드는 `exists`·`removeIfDiscardable` 같은 선택적 메서드에
`typeof deps.worktree.X === 'function'` 가드를 쓴다. `cleanupBranches` 의
`removeByBranch` 호출에는 그 가드를 두지 않는다. 가드가 만드는 폴백 경로가 정확히
지금 고치려는 버그이므로, 주입이 불완전하면 조용히 옛 동작으로 돌아가는 것보다
명시적으로 실패하는 편이 정직하다.

실제 런타임에서 `pr-actions` 는 `attach.js:714` 의 `createPrActions` 를 통해 poller ·
dispatch 와 **같은 워크트리 매니저 인스턴스**를 받는다. 따라서 `worktree.js` 에
메서드를 추가하면 호출부는 자동으로 그것을 갖는다 — 가드가 필요한 상황은 테스트
하네스의 fake 뿐이고, 그것은 fake 를 갱신해서 닫는다
(`pr-actions.test.js:300` 의 `worktree` 객체에 `removeByBranch` 추가).

### §5 타입 정의

갱신이 **필수인 곳은 두 곳**이고, 둘 중 하나라도 빠지면 `npm run tsc` 가 잡는다.

- `server/worker/worktree.js:58` — 매니저 반환 타입 블록. 여기에 없으면 호출부가
  없는 프로퍼티를 읽는다.
- `server/worker/pr-actions.js:184-188` — `createPrActions` 의 deps 타입 안에 있는
  `worktree: { remove, exists?, withTopologyLock }` 인라인 객체 타입. §4 대로
  가드 없이 호출하므로 **required** 로 추가한다(`removeByBranch: (input: { repo: string, branch: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>`).
  required 선언은 §4 의 "주입이 불완전하면 명시적으로 실패한다" 를 타입 층에서
  강제하는 장치이기도 하다 — fake 를 갱신하지 않으면 테스트가 컴파일되지 않는다.

`server/worker/scheduler.js:176` 의 `@property ... worktree` 는 scheduler 자신의
deps 타입이고 scheduler 는 이 메서드를 쓰지 않으므로, 구조적 타이핑상 추가하지
않아도 통과한다. 추가한다면 optional(`removeByBranch?`)로 두되 이는 문서화 목적이다.

## Test scope

RED-GREEN 시임 3개. 셋 다 `server/worker/pr-actions.test.js` 의 기존 정리 파이프라인
하네스를 쓴다 — 그 하네스는 실제 git 이 아니라 fake 워크트리 매니저와 fake `gitRun`
으로 구성되므로, 이 층에서 검증하는 것은 **관측 가능한 결과**다: 정리가 어느 스텝에서
멈추는지 또는 완료하는지, 뒤 명령이 실행되는지. 시임 1 이 요구하는 stateful fake 는
그 결과가 구현 세부가 아니라 실제 인과를 반영하게 만드는 장치다.

1. **fallback 이름 워크트리가 점유한 브랜치를 정리한다** — head_ref 가 bead_id 와
   다른 `<bead-id>-<YYYYMMDD>` 이고 그 이름의 워크트리가 해당 브랜치를 점유한 상태에서
   정리가 `branch_cleanup` 을 통과해 완료까지 간다.

   **이 시임은 stateful fake 를 요구한다.** 기존 `pr-actions.test.js:1122` 의
   `gitFail: (args) => args[0] === 'branch'` 를 그대로 쓰면 `branch -D` 가 무조건
   실패하므로, `removeByBranch` 를 구현한 뒤에도 테스트가 계속 실패해 RED 가 GREEN
   으로 넘어가지 않는다 — 그것은 시임이 아니라 고정된 실패다. 대신 fake 하네스에
   실제 git 의 인과를 심는다: `branch_held` 를 보유한 브랜치 집합으로 두고,
   `git branch -D <b>` 는 `b ∈ branch_held` 일 때만 실패하며(이때 확인용
   `rev-parse --verify` 는 성공), fake `removeByBranch` 는 자신이 제거한 워크트리의
   브랜치를 `branch_held` 에서 뺀다. fake `remove`(bead_id 기반)는 워크트리 이름이
   일치할 때만 뺀다.

   그러면 RED 의 이유가 구조적이다 — 현재 코드는 bead_id 이름의 워크트리를 찾아
   실패하므로 `branch_held` 가 그대로 남아 `local_branch_delete_failed` 로 멈춘다.
   GREEN 은 `removeByBranch` 가 head_ref 브랜치를 점유한 워크트리를 실제로 찾아
   해제했을 때만 성립한다. 호출 인자만 검사하는 assertion 은 구현 세부를 고정할 뿐
   동작을 증명하지 못하므로 시임의 근거로 삼지 않는다.

2. **관측 실패를 부재로 읽지 않는다** — fake `removeByBranch` 가 `observe_failed` 를
   반환하도록 두면 정리가 `worktree_remove_failed` 로 멈추고 `branch -D` 와
   `push --delete` 가 실행되지 않는다. RED 는 "메서드가 없어서 실패" 가 아니다 —
   fake 에 메서드를 갖춘 상태에서 현재 코드는 그것을 **호출하지 않으므로** 관측
   실패가 아무 영향도 주지 못하고 정리가 그대로 진행되며, 그것이 RED 다.

3. **소유 경계 밖 워크트리는 제거하지 않는다** — 매칭된 워크트리 경로가
   `.worktrees/` 바로 아래가 아니거나 `basename !== branch` 이면 `foreign_worktree`
   로 중단하고 `remove --force` 를 실행하지 않는다. 되돌릴 수 없는 삭제를 막는
   경계이므로 시임으로 둔다.

실제 git 동작은 `server/worker/worktree.integration.test.js` 가 실제 저장소를 만들어
쓰는 기존 패턴을 따라 검증한다 — 시임이 아니라 §1·§2 규칙의 회귀 방어이고, fake
하네스로는 증명할 수 없는 층이다.

- §2 파싱 규칙 — 완전 일치(`UI-abc` 가 `UI-abcd` 를 집지 않는다), detached 레코드
  제외, prunable 레코드 매칭, 그리고 `remove --force` 가 prunable 레코드를 실제로
  정리한다는 사실.
- §1 소유 경계 — `.worktrees/` 밖에 만든 워크트리와 `.worktrees-backup/` 처럼
  접두사만 같은 형제 경로가 둘 다 `foreign_worktree` 로 거부되고 **디스크에 그대로
  남아 있는지**. 이 절이 막으려는 것이 되돌릴 수 없는 삭제이므로, 거부 반환값만이
  아니라 대상이 살아남았다는 사실까지 확인한다.

## 검증

`AGENTS.md` Pre-Handoff Validation 전체를 돌린다.

- `npm run tsc` — §5 의 타입 갱신 누락을 잡는다.
- `npm test`
- `npm run lint`
- `npm run prettier:write`

프런트엔드 소스 변경이 없으므로 `npm run build` 와 번들 재생성은 이 Bead 의 범위가
아니다.

## 배포 처분

이 저장소는 머지가 완료가 아니다 — `AGENTS.md` 의 Post-Merge Runtime Validation 은
머지 후 `bdui-shared restart` 와 실행 경로·포트·HTTP 응답 확인까지를 완료 조건으로
요구한다. 이 변경은 서버 측 워커 코드이므로 재시작 없이는 실 서비스에 반영되지 않는다.

이 저장소에는 `deploy.json` 이 없다. 워크플로 계약이 요구하는 세 처분 중
**`worker-ineligible` 라벨**을 선택한다 — 머지 후 작업이 공유 서비스 재시작이고 그
실행은 무인 워커가 아니라 사람이 주관하는 세션에 속한다. 선례는 `UI-1xcd`
(`2026-08-04-worker-guard-kill-scope-reduction-design.md`)와 같다.

### 적용 순서

각 단계는 앞 단계가 확인된 뒤에만 진행한다. 각 단계는 **재실행 안전**하다 — 어디서
멈추든 중간 상태를 손으로 되돌릴 필요 없이 아래 재개 규칙대로 다시 들어가면 된다.

1. **PR 머지 확인** — `gh pr view <n> --json state,mergeCommit` 로 `state == "MERGED"`
   와 머지 SHA 를 확보한다. 이 SHA 를 이후 단계가 비교 기준으로 쓴다.
2. **공유 체크아웃이 안전한지 확인** — `git status --porcelain` 이 **빈 출력**이고
   `git branch --show-current` 가 `main` 인지. 사용자 작업이 남아 있으면 여기서
   멈춘다(사용자 파일을 건드리지 않는다).
3. **base 동기화** — `git fetch --no-tags origin main` 후
   `git merge --ff-only origin/main`. ff 가 불가능하면 하드 스톱이다(발산).
4. **머지된 코드인지 검증** — `git rev-parse HEAD`, `git rev-parse origin/main`,
   1단계의 머지 SHA **세 값이 모두 같을 때만** 다음으로 간다. 이 검증이 없으면 stale
   체크아웃을 재시작하고도 성공으로 오인한다.
5. **런타임 설정 정합 확인** — `~/.config/bdui/config.toml` 에서 이 서비스의 bind
   host 와 port, 그리고 워크스페이스 목록이 재시작 후 기대값과 같은지 확인한다. 이
   파일은 **토큰을 담고 있으므로 통째로 출력하지 않는다** — 필요한 키만 읽거나 값
   할당부를 가린 채 확인한다. 성공 기준은 "이 단계에서 읽은 host/port 가 7단계의
   실측 기대값이 된다" 이고, 파일이 없거나 해당 키를 읽을 수 없으면 여기서 멈춘다
   (기대값 없이 7단계를 통과 판정할 수 없다).
6. **재시작** — `bdui-shared restart`. 명령의 **종료 코드가 0** 인지 확인한다. 0 이
   아니면 7단계로 넘어가지 않고 멈춘다.
7. **실측 확인** — 다섯 가지가 **모두** 기대값과 일치할 때만 완료로 선언한다:
   프로세스 소유자(이 사용자), 실행 경로(4단계에서 검증한 체크아웃), bind host 와
   port(5단계에서 읽은 값), HTTP 응답. 하나라도 어긋나면 완료가 아니다 — 특히 실행
   경로가 다른 체크아웃이나 워크트리를 가리키면 재시작이 stale 코드를 되살린 것이다.

**중단·실패 시 재개** — 어느 단계에서 멈췄든 되돌릴 상태가 없다. 1~4단계에서 멈추면
실행 중인 서버는 머지 이전 코드 그대로이므로 1단계부터 다시 한다. 5단계에서 멈추면
설정 문제를 해결한 뒤 5단계부터, 6단계가 0 이 아닌 코드로 끝나거나 7단계가 어긋나면
**4단계부터** 다시 들어간다 — 재시작 실패와 실측 불일치의 가장 흔한 원인이 체크아웃
상태이므로, 그 검증을 건너뛰고 재시작만 반복하면 같은 실패를 반복하게 된다.

## 잔여 위험

**미커밋 변경이 있는 워크트리는 예고 없이 사라진다.** `remove --force` 를 유지하기로
한 결정(사용자 승인)의 직접적 귀결이다. 머지 후 정리는 세션이 만든 워크트리를 건드리는
유일한 경로이므로, 머지 이후에도 그 워크트리에서 작업 중이었다면 그 작업은 복구되지
않는다.

실측 조회는 찾아내는 범위를 넓히지만, §1 의 소유 경계가 그 확대를 `.worktrees/` 바로
아래의 `basename == branch` 워크트리로 **한정한다** — 계약이 만들도록 정한 자리다.
넓어지는 것은 그 자리 안의 fallback 이름 워크트리와 prunable 레코드이고, 경계 밖은
`foreign_worktree` 로 거부되므로 이전보다 더 지워지지 않는다. 따라서 증가하는 위험은
"계약대로 만들어진 워크트리를 이전보다 더 잘 찾아 지운다" 로 좁혀진다.

그 남은 위험을 없애려면 제거 전 dirty 확인 후 거부하는 변경이 필요하고, 그 판단은
사용자가 이번 범위에서 명시적으로 제외했으므로 이 Bead 밖이다.

**`headBranchFor` 가 head_ref 를 얻지 못하면 canonical 이름으로 폴백한다**
(`pr-actions.js:461-470`). 그 경우 실측 조회는 canonical 브랜치를 점유한 워크트리를
찾으므로 이전과 같은 대상을 겨냥하지만, fallback 이름 워크트리는 여전히 놓친다. 이
변경은 GitHub 관측이 성공한 정상 경로를 고치는 것이고, 관측 자체가 실패한 경로의
정확도를 올리지는 않는다.

## 비대상

- `exists()` · `pathFor()` · `branchForBead()` 와 그 소비자 5곳
  (`attach.js:1082`, `scheduler.js:2702·2817·2889·3377`). 이들은 "worker 가 만들 자리가
  비었나" 를 묻고 있어 계산이 오히려 정답이다.
- scheduler 의 두 정리 경로(`removeIfDiscardable`, `remove`). worker 가 자기가 만들
  워크트리 자리를 다루므로 `add()` 가 쓴 canonical 이름이 항상 맞다.
- workflow 계약 표면(라벨·durable metadata 키·status 어휘). 이 저장소는 그 계약의
  소비자다(`AGENTS.md`).
- dotfiles 의 `basename == branch` 규칙과 collision ladder. 이 변경은 그 규칙을
  바꾸지 않고, 규칙이 이미 허용한 상태를 소비자가 표현할 수 있게 만든다.
- Bead notes 에 기록된 워크트리 바인딩을 worker 가 읽게 하는 것. 자유 텍스트 파싱은
  git 실측보다 취약하므로 채택하지 않는다.
