# 워커 verify worktree 선점 회수 + teardown 실패 관측 (UI-egj7)

- 날짜: 2026-07-27
- Bead: UI-egj7 (bug, P1)
- 라우트: spec_backed
- 관련: UI-2o4z(§3 addDetached git stderr 보존 — 이번 실사고의 detail이 그 산출물),
  UI-qult(verify 출력 tail — 별개 범위)

## 배경

2026-07-27 실사고(dotfiles-h3z2): [머지] 클릭 후 cleanup이 `post_merge_verify`
단계의 `verify_worktree_failed`로 정지했다. 배너 detail은
`git worktree add --detach failed (128): Preparing worktree (detached HEAD
c033d547) fatal: '<repo>/.worktrees/verify-dot…`(잘림). 재현으로 확인한 사실:
"Preparing worktree … fatal: '<경로>' …" 형태의 exit 128은 전부 **동일 이름
worktree 선점** 계열이다 —

- `'<path>' already exists` — 살아있는(등록+존재) 또는 미등록 잔재 디렉터리,
- `'<path>' is a missing but already registered worktree` — 디렉터리는 사라지고
  git 메타데이터 등록만 남은 stale 상태,
- `'<path>' is a missing but locked worktree` — add 도중 프로세스 사망으로 lock이
  남은 상태.

수십 초 뒤 재시도에서 같은 add가 그대로 성공했으므로 당시 충돌은 일시적이었다.
그러나 구조적 갭 3개는 실재하며, 특히 stale 등록 케이스는 **같은 bead+같은
sha의 재시도 — 정확히 사람이 누르는 그 경로 — 를 영구히 막는다**:

1. `addDetached`(`server/worker/worktree.js` L291)는 add 전 선점 회수를 하지
   않는다 — 어떤 잔재든 만나면 그대로 실패.
2. `verify-cmd.js` L393 주석은 "잔재는 다음 `git worktree prune`이 걷어간다"고
   가정하지만 코드베이스 어디에서도 prune을 실행하지 않는다.
3. `runVerifyAtSha`의 finally에서 `removeDetached` 실패(비0 exit·throw)가
   무기록으로 삼켜진다(L389-395) — 잔재가 남아도 흔적이 없다.

탐색으로 확정한 전제:

- `addDetached`/`removeDetached`의 유일한 호출자는 `runVerifyAtSha`이며, 이름은
  항상 `verify-<bead_id>-<sha7>`(post-merge는 `verify-<bead_id>-postmerge-<sha7>`)
  — **워커 소유 일회용** worktree다. 세션 worktree(`.worktrees/<bead-id>`,
  `add`/`remove`/`removeIfDiscardable`)와는 API·이름공간이 분리되어 있다.
- `verify_worktree_failed` reason·`cleanup_failed` 레코드는 bdui 내부 상태로
  dotfiles workflow 계약 표면이 아니다(UI-qult 스펙 전제와 동일) — 계약 문서
  정합 불필요. 이번 변경은 reason 어휘를 추가·변경하지 않는다.

## 범위

- 단위 ①: `addDetached`에 add 전 **멱등 선점 회수 사다리** 추가.
- 단위 ②: `runVerifyAtSha` teardown 실패를 debug 로그로 관측 + L393 주석 정정.

## 비범위

- 자동 재시도 정책(no-auto-retry) 변경 없음 — 실패 계열 자체를 제거하는 것.
- `runVerifyCmd` 출력 tail 보존(UI-qult 소유).
- 세션 worktree 경로(`add`/`remove`/`removeIfDiscardable`) 동작 변경 없음.
- `cleanup_failed`/attempt 레코드 스키마·reason 어휘 변경 없음.

## 설계

### §1 선점 회수 — `server/worker/worktree.js` `addDetached`

기존 topology lock 안에서, `worktree add --detach` **직전에** 다음 사다리를
실행한다. 각 단계는 실패를 무시하는 best-effort이며 전체가 멱등이다:

1. `git worktree unlock <wt>` — locked stale 등록 해제(add 도중 사망 잔재).
2. `git worktree remove --force <wt>` — 살아있는 잔재 worktree 제거(dirty 포함).
3. `fs.existsSync(wt)`가 여전히 참이면 `fs.rmSync(wt, { recursive: true,
   force: true })` — 미등록 잔재 디렉터리.
4. `git worktree prune` — 남은 stale 등록 정리(디렉터리 소실 케이스).

그 후 기존 `worktree add --detach`를 실행한다. 그래도 실패하면 기존과 동일하게
git stderr를 담아 throw(→ `verify_worktree_failed` + detail, UI-2o4z 경로 유지).

안전 경계: 이 사다리는 파괴적이므로 **`verify-` 접두사 이름에만** 적용한다 —
`input.name`이 `verify-`로 시작하지 않으면 사다리를 건너뛰고 기존 동작(즉시
add)만 수행한다. 세션 worktree 이름(bead ID)은 이 접두사를 가질 수 없으므로
회수 대상이 될 수 없다. JSDoc에 "detached worktree 이름공간은 워커 소유
일회용"임을 명시한다.

회수는 무조건 실행한다(존재/등록 사전 검사 없음): verify 실행은 머지·PR당
수 회 수준으로 드물어 git spawn 3회의 비용이 무의미하고, 조건 검사(porcelain
파싱)가 오히려 복잡도를 늘린다.

### §2 teardown 관측 — `server/worker/verify-cmd.js`

- 모듈에 `debug('worker:verify-cmd')` 로거를 추가한다(`pr-actions`/`pr-poller`
  관례와 동일).
- `runVerifyAtSha` finally에서 `removeDetached` 결과를 검사한다: 비0 `code` 또는
  throw 시 `log('verify worktree teardown failed for %s: %s', name, detail)`로
  기록한다. **verdict(반환값)는 어떤 경우에도 바뀌지 않는다** — 기존 "teardown은
  판정을 가리지 않는다" 불변식 유지.
- L393 주석의 "next `git worktree prune`이 걷어간다" 가정을 §1 회수 사다리
  참조로 정정한다.

## Test scope

- `worktree.integration.test.js`(실제 git repo 픽스처, 기존 파일)에 추가:
  1. 살아있는 동일 이름 detached worktree 선점 → `addDetached` 성공.
  2. stale 등록(디렉터리만 rm) 선점 → 성공.
  3. 미등록 잔재 디렉터리 선점 → 성공.
  4. `verify-` 접두사가 아닌 이름 + 잔재 디렉터리 → 기존대로 throw(회수 안 함).
- `verify-cmd.test.js`: `removeDetached`가 비0/throw여도 `runVerifyAtSha`
  verdict가 유지됨(기존 테스트 확인, 없으면 추가).

## 수용 기준

1. 위 4개 선점 시나리오에서 `addDetached`가 성공하고, 비-`verify-` 이름은 기존
   동작을 유지한다.
2. teardown 실패가 debug 로그에 남고 verdict는 불변.
3. `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` green,
   `npm run build` 후 번들(`app/main.bundle.js{,.map}`) 커밋 포함(프런트 변경이
   없으면 번들 diff 없음이 정상).
