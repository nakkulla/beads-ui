# Workspace Sync 확장 + Git Pull 버튼 추가

## 문제 정의

`docs/superpowers/specs/2026-04-16-workspace-manual-sync-design.md` 에서 도입된
workspace 수동 Sync 버튼은 현재 `bd dolt pull` 만 수행한다. 운영하면서 다음
한계가 드러났다.

1. **로컬 변경을 원격에 반영할 UI 경로가 없다**
   - UI에서 새 이슈를 만들거나 상태를 바꾸면 로컬 dolt에는 반영되지만, 다른
     머신/세션과 공유되려면 별도로 CLI에서 `bd dolt push` 를 실행해야 한다.
   - 사용자가 기대하는 "Sync"의 의미는 보통 양방향 동기화이다.

2. **워크스페이스 git 리포지토리 갱신 수단이 없다**
   - `bd dolt` 와 별개로, 워크스페이스 자체의 git 리포지토리(코드, 문서, spec
     등)가 원격에 앞서 있을 때 UI에서 받아올 수단이 없다.
   - 현재는 사용자가 터미널로 빠져나와 `git pull` 을 직접 실행해야 한다.

## 목표

- 기존 Sync 버튼을 **`bd dolt pull → bd dolt push` 순차 실행**으로 확장한다.
- push가 reject 되거나 일시적으로 실패할 경우 **자동 1회 재시도**(`bd dolt
  pull` → `bd dolt push`)를 시도한 뒤, 그래도 실패하면 사용자에게 알린다. 이때
  pull 결과는 이미 성공 상태로 보존된다.
- workspace-picker 안, Sync 버튼 옆에 **별도 `Git Pull` 버튼**을 추가한다.
- Git Pull은 `git pull --rebase --autostash` 를 실행한다.
- rebase 도중 충돌이 발생하면 `git rebase --abort` 로 **자동 롤백**한 뒤
  사용자에게 명확한 메시지를 표시한다.
- 두 액션은 동시에 진행될 수 없으며, 한쪽이 진행 중이면 다른 쪽 버튼은
  disabled 된다.

## 비목표

- workspace에 대한 `git push` UI 액션
- workspace의 `git status` / dirty 표시 / 변경된 파일 목록
- rebase 충돌의 대화형 해결 UI
- 주기 기반 auto sync 또는 git pull
- 등록된 모든 workspace 일괄 sync / git pull
- 마지막 sync/pull 시각의 저장·표시
- Sync 결과 상세 패널(stdout/stderr 노출)
- workspace 전환 직후 자동 sync/git pull
- Dolt readiness 복구 또는 `bd dolt start` 자동 처리

## 결정 요약

### 선택한 방향

기존 `sync-workspace` websocket command를 **`bd dolt pull → bd dolt push` 순차
실행**으로 확장하고, 응답 스키마에 부분 성공을 표현할 필드를 추가한다.
워크스페이스 git 작업을 위한 신규 `git-pull-workspace` command를 도입하고,
`workspace-picker` 안에 Sync 버튼과 동일한 패턴의 `Git Pull` 버튼을 추가한다.

### 왜 이 방향인가

- **사용자 정신 모델 일치**: 사용자가 기대하는 "Sync"는 통상 양방향이며,
  현재의 pull-only 동작은 단어 의미와 어긋나 있다.
- **확장의 단계적 누적**: 기존 spec 의 구조(전용 버튼, websocket command,
  workspace 단위, sandbox 우회 규칙)를 그대로 재사용하므로 새 contract 수가
  최소화된다.
- **두 도메인의 시각적 분리**: dolt sync(이슈 데이터)와 git pull(코드/문서)은
  같은 워크스페이스를 다루지만 도메인이 다르므로 별도 버튼으로 분리해야
  사용자가 의도를 명확히 표현할 수 있다.
- **부분 성공 가시성**: pull 성공 + push 실패 케이스를 단일 "Sync failed" 로
  뭉뚱그리면 사용자가 상황을 오판한다. 응답 스키마에서 양쪽 결과를 분리해
  토스트 문구를 다르게 표시한다.

### 대안과 채택하지 않은 이유

- **Pull/Push 버튼 분리**: 사용자가 의도를 더 명확히 할 수 있지만, 일반적인
  운영 흐름에서 pull → push 는 거의 항상 묶음이고 UI 공간을 더 차지한다.
  `Sync` 의미를 양방향으로 통일하는 쪽이 단순하다.
- **`git pull --ff-only`**: 가장 안전하지만 divergent 시 항상 실패한다.
  workspace는 사용자 로컬 커밋이 있을 가능성이 있고, `--rebase --autostash` 가
  더 일반적인 운영 기대치에 맞다. 충돌 시 abort 로 안전성을 회복한다.
- **`git pull` (기본 merge)**: divergent 시 자동 머지 커밋을 만들어 기록이
  지저분해질 수 있어 채택하지 않는다.

## 설계

## 1. UI 위치와 상호작용

### 위치

- 두 버튼 모두 `app/views/workspace-picker.js` 내부에 둔다.
- 단일/다중 workspace 모드 모두에서 다음 순서로 노출한다.
  1. workspace 라벨 또는 select
  2. `Sync` 버튼 (기존)
  3. `Git Pull` 버튼 (신규)
  4. 로딩 인디케이터(둘 중 하나라도 진행 중이면 표시)

### 버튼 라벨

| 상태 | Sync 버튼 라벨 | Git Pull 버튼 라벨 |
|------|----------------|--------------------|
| idle | `Sync` | `Git Pull` |
| 진행 | `Syncing…` | `Pulling…` |

기존 라벨 `Sync` 를 유지하는 이유는 사용자가 이미 학습한 어휘이고, 문서/툴팁에서
의미 변경(pull-only → pull+push)을 안내하기 때문이다. 필요하면 추후 툴팁/aria-label
보강에서 다룬다.

### 상태 머신

`workspace-picker.js` 가 다음 세 boolean 을 보유한다.

- `is_switching` (기존)
- `is_syncing` (기존)
- `is_git_pulling` (신규)

세 값 중 하나라도 true 이면 picker 내 `select`, `Sync`, `Git Pull` 모두
disabled 된다. 이는 동일 workspace 에 대해 동시 다발의 외부 명령이 끼어드는
상황을 막기 위함이다.

### 사용자 피드백 (toast)

| 시나리오 | 메시지 | 종류 / 지속 |
|---------|--------|-------------|
| Sync 완전 성공 | `Synced <project>` | success / 2s |
| Sync pull 성공, push 실패 | `Pulled, but push failed: <reason>` | warning / 4s |
| Sync pull 실패 | `Sync failed: <reason>` | error / 3s |
| Git Pull 성공 (최신) | `Git pulled <project>` | success / 2s |
| Git Pull 성공 (no-op, already up to date) | `Already up to date` | success / 2s |
| Git Pull 충돌 후 abort | `Git pull conflicts — reverted (manual resolve required)` | error / 4s |
| Git Pull autostash pop 실패 | `Git pulled, but stash pop conflicted (check git stash list)` | warning / 4s |
| Git Pull 일반 실패 | `Git pull failed: <reason>` | error / 3s |

`<reason>` 은 서버가 `stderr` 마지막 비어있지 않은 라인을 잘라서 전달한다.

#### `showToast` warning variant 추가

현재 `app/utils/toast.js` 의 `showToast` 는 `'info' | 'success' | 'error'` 만
지원한다. 이 spec 은 **부분 성공**(pull 성공 + push 실패, autostash pop 실패)
표현을 위해 `'warning'` variant 를 추가하기로 결정한다.

- variant 색상: 기존 `success`(`#156d36`), `error`(`#9f2011`) 와 구별되는
  주황 계열(예: `#a36a00`).
- JSDoc 의 `@param` 타입을 `'info'|'success'|'warning'|'error'` 로 확장.
- 기존 호출자는 영향 없음(추가만 발생).

## 2. 클라이언트 데이터 흐름

### Sync 흐름

1. 사용자가 `Sync` 버튼 클릭
2. `workspace-picker.js` 가 `is_syncing = true` 로 갱신, 렌더
3. `main.js: handleWorkspaceSync(workspace_path)` 호출
4. `client.send('sync-workspace', {})`
5. 응답 수신
   - `{ ok: true, pulled: true, pushed: true }` → success toast
   - `{ ok: true, pulled: true, pushed: false, push_error }` → warning toast
6. error 응답
   - pull 실패 → error toast (`Sync failed: …`)
7. `is_syncing = false` 로 복귀

### Git Pull 흐름

1. 사용자가 `Git Pull` 버튼 클릭
2. `workspace-picker.js` 가 `is_git_pulling = true` 로 갱신, 렌더
3. `main.js: handleWorkspaceGitPull(workspace_path)` 신규 호출
4. `client.send('git-pull-workspace', {})`
5. 응답 수신
   - `{ ok: true, status: 'updated' | 'up_to_date' | 'stash_pop_conflict' }` → 그에 맞는 toast
6. error 응답
   - `{ error_code: 'rebase_conflict' }` → `Git pull conflicts — reverted` toast
   - 그 외 → `Git pull failed: <reason>` toast
7. `is_git_pulling = false` 로 복귀

## 3. 서버 동작

### `sync-workspace` (수정)

위치: `server/ws.js` (현재 파일 1702 라인 근처)

알고리즘:

```
if !CURRENT_WORKSPACE.root_dir → makeError('No active workspace')

pull_res = runBd(['dolt', 'pull'], { cwd, sandbox: false })
if pull_res.code != 0 → makeError('bd_error', pull_res.stderr)

triggerMutationRefreshOnce()  // initial pull 성공 직후 1회 호출

push_res = runBd(['dolt', 'push'], { cwd, sandbox: false })
if push_res.code != 0:
  pull_retry_res = runBd(['dolt', 'pull'], { cwd, sandbox: false })
  if pull_retry_res.code != 0:
    return makeOk({ workspace, pulled: true, pushed: false,
                     push_error: pull_retry_res.stderr_tail })
  push_res = runBd(['dolt', 'push'], { cwd, sandbox: false })

if push_res.code != 0:
  return makeOk({ workspace, pulled: true, pushed: false,
                   push_error: push_res.stderr_tail })

return makeOk({ workspace, pulled: true, pushed: true })
```

요점:
- pull 이 실패하면 push 는 시도하지 않는다.
- push 가 실패하면 한 번만 `dolt pull → dolt push` 순으로 재시도한다.
- 재시도 후에도 push 가 실패하면 응답 자체는 `ok` 로 두고, `pulled: true,
  pushed: false, push_error: …` 로 부분 성공을 표현한다.
- `triggerMutationRefreshOnce()` 는 **initial pull 성공 직후 1회**만 호출한다.
  push 결과(성공/재시도 후 성공/부분 실패)와 무관하게, 첫 pull 이 가져온
  변경이 항상 화면에 반영되도록 보장하기 위함이다. 부분 실패 조기 반환
  경로(`pull_retry_res.code != 0`)에서도 이미 첫 pull 이 트리거한 refresh 가
  유효하므로 추가 호출은 필요하지 않다.
- `stderr_tail` 은 `stderr` 의 마지막 비어있지 않은 라인을 최대 200자까지
  자른 값. 토큰성 정보 노출을 줄이기 위한 단순화이다. 헬퍼는
  `server/bd.js` 에 export 하여 `runBd`/`runShell` 결과에서 공통 사용한다
  (별도 모듈로 분리하지 않는다).

### `git-pull-workspace` (신규)

위치: `server/ws.js` 의 `sync-workspace` 핸들러 다음.

알고리즘:

```
if !CURRENT_WORKSPACE.root_dir → makeError('No active workspace')

res = runShell('git', ['pull', '--rebase', '--autostash'],
               { cwd: CURRENT_WORKSPACE.root_dir })

if res.code == 0:
  status = detectGitPullStatus(res.stdout) // 'updated' | 'up_to_date' | 'stash_pop_conflict'
  return makeOk({ workspace, status, stdout_tail, stderr_tail })

is_rebase_conflict = res.stderr 포함하는 키워드:
  - 'CONFLICT'
  - 'could not apply'
  - 'Resolve all conflicts manually'
  - 'rebase --abort'

if is_rebase_conflict:
  abort_res = runShell('git', ['rebase', '--abort'], { cwd })
  return makeError('rebase_conflict', stderr_tail)

return makeError('git_error', stderr_tail)
```

요점:
- `runBd` 가 아닌 신규 `runShell` 헬퍼를 통해 `git` 바이너리를 직접 실행한다.
  비sandbox 모드로, `cwd` 는 현재 workspace `root_dir`.
- `--autostash` 는 git 자체가 처리한다. autostash 자동 pop 실패는 git 이
  종료코드 0 으로 끝낼 수 있으므로 `stdout` 의 `Applied autostash` 부재 또는
  `could not restore stash` 같은 마커로 감지한다.
- rebase 충돌 감지는 stderr 의 키워드 매칭으로 한다. 매칭 시 자동
  `git rebase --abort` 를 실행하고, abort 결과의 성공/실패는 토스트에
  영향을 주지 않으나 로그로 남긴다.

### `runShell` 헬퍼

`server/bd.js` 에 이미 `runBd` 와 `spawn('git', ...)` 패턴(`getGitUserName`)이
존재한다. 이 spec 은 임의 바이너리를 받는 `runShell(bin, args, options)`
헬퍼를 `server/bd.js` 에 **신규 추가**하기로 결정한다.

- 시그니처: `runShell(bin: string, args: string[], options?: { cwd?: string,
  env?: NodeJS.ProcessEnv, timeout_ms?: number }): Promise<{ code: number,
  stdout: string, stderr: string }>`
- 동작 규약은 `runBd` 와 동일(stderr 캡처, 종료코드 반환, ENOENT 시
  `code !== 0` 으로 정상화).
- `runBd` 의 큐(`withBdRunQueue`) 는 사용하지 않는다. git 명령은 dolt 와
  같은 워크스페이스 lock 경합 대상이 아니기 때문.

### sandbox 우회 규칙

- 기존 `runBd(..., sandbox: false)` 와 같은 정책을 따른다.
- 두 명령 모두 사용자 워크스페이스에 대한 외부 네트워크 호출을 동반하므로
  서버 sandbox 외부에서 실행되어야 한다.
- workspace `root_dir` 외부의 파일에 접근하지 않는다.

## 4. 프로토콜 변경

위치: `app/protocol.js`

- 신규 메시지 타입 `git-pull-workspace` (요청 페이로드는 빈 객체)
- `sync-workspace` 응답 스키마에 다음 필드 옵셔널 추가
  - `pulled: boolean`
  - `pushed: boolean`
  - `push_error?: string`
- `git-pull-workspace` 응답 스키마
  - 성공: `{ workspace, status: 'updated' | 'up_to_date' | 'stash_pop_conflict',
    stdout_tail, stderr_tail }`
  - 실패: `{ error_code: 'rebase_conflict' | 'git_error' | 'server_error',
    error_message }`

기존 클라이언트는 새 필드를 무시해도 동작이 변하지 않는다(호환).

## 5. 회귀 방지와 기존 흐름과의 관계

- 기존 `sync-workspace` 가 호출하던 `triggerMutationRefreshOnce()` 경로는
  유지한다. pull 성공 시점에 한 번 호출하므로 push 실패가 화면 갱신을 막지
  않는다.
- workspace 전환 중에는 두 버튼 모두 disabled. 기존 `is_switching` 정책 그대로.
- watcher / subscription refresh 정책은 변경하지 않는다.

## 6. 오류 처리

### Sync

| 단계 실패 | 응답 | 사용자 표시 |
|-----------|------|-------------|
| pull 실패 | `error: bd_error` | `Sync failed: <reason>` (error toast) |
| push 1차 실패 + 재시도 push 성공 | `ok, pushed: true` | `Synced <project>` (success) |
| push 1차 실패 + 재시도 pull 실패 | `ok, pushed: false, push_error: <pull stderr>` | `Pulled, but push failed: <reason>` (warning) |
| push 1차/재시도 모두 실패 | `ok, pushed: false, push_error: <push stderr>` | `Pulled, but push failed: <reason>` (warning) |

### Git Pull

| 상황 | 응답 | 사용자 표시 |
|------|------|-------------|
| 최신/no-op | `ok, status: up_to_date` | `Already up to date` (success) |
| 정상 update | `ok, status: updated` | `Git pulled <project>` (success) |
| autostash pop 실패 | `ok, status: stash_pop_conflict` | `Git pulled, but stash pop conflicted (check git stash list)` (warning) |
| rebase 충돌 → abort | `error: rebase_conflict` | `Git pull conflicts — reverted (manual resolve required)` (error) |
| 그 외 git 실패 | `error: git_error` | `Git pull failed: <reason>` (error) |
| workspace 미선택 | `error: server_error` | `Git pull failed: No active workspace` (error) |

### 내부 오류 취급

- `git rebase --abort` 자체가 실패한 경우(예: 이미 rebase 상태가 아님)는
  서버 로그로만 남기고 사용자 표시는 `rebase_conflict` 동일하게 유지한다.
- `git` 바이너리 부재(`ENOENT`)는 `git_error` 로 정상화한다.

## 7. 테스트 전략

### 클라이언트

- `app/utils/toast.test.js` (신규 또는 확장)
  - `variant: 'warning'` 호출 시 적절한 색상(주황 계열, 예: `#a36a00`)이
    적용되는지 검증한다. 기존 `info`/`success`/`error` variant 동작이
    회귀하지 않는지도 함께 확인한다.
- `app/views/workspace-picker.test.js`
  - `Git Pull` 버튼이 single/multi workspace 모드 모두에서 렌더된다.
  - `is_syncing`, `is_git_pulling` 둘 중 하나라도 true 면 두 버튼 모두
    disabled.
  - `is_git_pulling` 시 라벨이 `Pulling…` 으로 표시.
- `app/main.workspace-sync.test.js` (확장)
  - 응답 `{ pulled: true, pushed: true }` 시 success toast.
  - 응답 `{ pulled: true, pushed: false, push_error }` 시 warning toast 와
    문구 검증.
  - pull 실패 시 error toast.
- `app/main.workspace-git-pull.test.js` (신규)
  - `handleWorkspaceGitPull` 가 `git-pull-workspace` 를 호출한다.
  - 각 status 별 toast 매핑 확인.
  - `error_code: rebase_conflict` 시 error toast 문구 확인.

### 서버

- `server/ws.sync-workspace.test.js` (확장)
  - pull 성공 + push 성공
  - pull 성공 + push 1차 실패 + 재시도 pull 성공 + push 성공 → `pushed: true`
  - pull 성공 + push 1차 실패 + 재시도 pull 실패 → `pulled: true, pushed: false`
  - pull 성공 + push 1차/재시도 모두 실패 → `pulled: true, pushed: false`
  - pull 실패 → error 응답
- `server/ws.git-pull-workspace.test.js` (신규)
  - 정상 update / up_to_date / autostash pop 실패 / rebase 충돌 (abort 호출
    검증) / git 일반 실패 / workspace 미선택

### 회귀 포인트

- `app/main.bundle.js` 재생성 (build script)
- protocol.js 메시지 enum/타입 정의가 있다면 함께 갱신
- 기존 `Synced <project>` toast 문구가 깨지지 않도록 확인

## 8. 리스크와 완화

### 리스크 1. dolt push 실패 원인 분류 어려움

`bd dolt push` 가 실패하는 이유는 원격 ahead, 인증 문제, 네트워크 등 다양하다.
재시도 1회로는 인증/네트워크 문제는 해결되지 않는다.

**완화**: 부분 성공 응답으로 사용자가 정확한 stderr 라인을 보게 한다. 자동
처리는 단순한 ahead-then-push 케이스만 노린다.

### 리스크 2. git rebase 충돌 감지 신뢰성

stderr 키워드 매칭은 git 버전/로케일에 따라 달라질 수 있다.

**완화**:
- 1차 매칭 키워드는 영어 메시지 기준으로 폭넓게 잡는다.
- 매칭에 실패해 일반 `git_error` 로 빠지더라도 abort 가 호출되지 않을 뿐
  데이터는 보호된다(`--rebase` 자체가 fast-forward 아니면 명시적 충돌 모드로
  빠진다).
- 추후 `git status --porcelain=v2` 등 구조화된 출력으로 보강 가능.

### 리스크 3. autostash pop 실패 시 stash 잔여물

`--autostash` 는 rebase 후 stash 를 자동 pop 하는데, 충돌 시 stash 가
`stash@{0}` 에 남는다.

**완화**: `stash_pop_conflict` 상태를 별도 토스트로 노출해 사용자가
`git stash list` 를 확인하도록 안내. 자동 정리는 하지 않는다.

### 리스크 4. UI 공간 증가

workspace-picker 행에 버튼이 두 개로 늘면 좁은 화면에서 줄바꿈 가능.

**완화**: 기존 styles.css 의 picker 컨테이너 flex/wrap 정책에 따른다. 별도
미디어 쿼리는 도입하지 않는다.

## 9. 구현 개요

권장 작업 순서:

1. `server/bd.js`
   - `runShell(bin, args, options)` 헬퍼 신규 추가
   - `stderr_tail(text)` 헬퍼 신규 추가 (export). 마지막 비어있지 않은
     라인을 최대 200자까지 자르며 `runBd`/`runShell` 결과에서 공통 사용한다.
2. `server/ws.js`
   - `sync-workspace` 알고리즘 갱신 (pull → push, push 실패 시 1회 재시도,
     `triggerMutationRefreshOnce()` 는 initial pull 성공 직후 1회 호출)
   - `git-pull-workspace` 핸들러 추가
3. `app/protocol.js`
   - 메시지 타입과 응답 스키마 갱신
4. `app/utils/toast.js`
   - `'warning'` variant 추가 및 JSDoc 갱신
5. `app/main.js`
   - `handleWorkspaceSync` 응답 분기 갱신 (success / warning / error)
   - `handleWorkspaceGitPull` 추가, workspace-picker 에 콜백 전달
6. `app/views/workspace-picker.js`
   - `Git Pull` 버튼 렌더링과 `is_git_pulling` 상태
7. 테스트 추가/갱신
8. `app/main.bundle.js` 재생성

## 10. 검증 기준

- 새 단위 테스트 모두 통과
- `app/main.bundle.js` 재생성 후 dev 환경에서:
  - Sync 버튼 클릭 시 dolt pull → dolt push 가 실제로 실행됨을 서버 로그로
    확인
  - 의도적으로 push 가 실패하도록 환경 구성 후 warning 토스트와 문구 확인
  - git 리포지토리에 untracked 변경을 만들고 `Git Pull` 클릭 → autostash 동작
    확인
  - 의도적인 충돌 상황에서 `Git Pull` → `git rebase --abort` 자동 실행, 토스트
    문구 확인
- 기존 회귀: 단일 workspace 모드, 다중 workspace 모드, workspace 전환 중
  버튼 disabled 동작 확인

## Execution lane

- **Lane**: `spec_backed`
- **이유**: 변경이 server 1개 + protocol 1개 + client 2개로 한정되고, 각 변경
  지점이 이 spec 안에서 단일하게 결정되어 있다. 별도의 plan 없이도 spec 만
  보고 단계별로 구현 가능하다.
- **Replaces plan?**: yes (이 spec 의 "구현 개요" 가 작업 순서 역할)
- **Child generation policy**: 기본적으로 단일 execution issue 로 진행한다.
  서버/클라이언트 분리 또는 테스트 분리가 필요해질 경우에만 child issue 로
  쪼갠다.
