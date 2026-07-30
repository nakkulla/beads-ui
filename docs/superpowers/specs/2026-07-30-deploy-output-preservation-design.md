# 동기 deploy 실패 출력 보존·노출 (UI-l53x)

## 배경

2026-07-30 `dotfiles-28dy` cleanup의 `deploy` 단계가 실패했을 때 `queue.json`에
남은 것은 사유 코드 한 단어뿐이었다.

```
cleanup_failed = { step: "deploy", reason: "deploy_failed", detail: null }
last_deploy    = { outcome: "failed", reason: "deploy_failed" }
```

실제 원인(codex 설치의 TOML 렌더 실패)은 `/tmp/dotfiles-install-codex-*.log`를
직접 뒤져야 나왔다. verify 경로는 UI-qult(`output_tail`)와 UI-0x54(`log_path`)로
증거를 남기는데 deploy 경로만 아무것도 남기지 않는다.

코드 확인 결과 사각의 성격이 둘로 나뉜다.

1. **버려지는 tail** — `runVerifyCmd`는 `log_context` 없이도 `output_tail`을 이미
   계산해 반환한다(`verify-cmd.js:468`의 `withTail`이 `:514`/`:522`에서
   `log_context`와 무관하게 적용됨). `log_context`가 게이팅하는 것은 전체 로그
   **파일**뿐이다. 그런데 `runDeploy`(`pr-actions.js:812-837`)가 결과를
   `{ok, reason}`으로 좁혀 받아 tail을 버리고, `runCleanup`(`:1162`)이
   `failCleanup`에 detail·tail·log_path 인자를 전부 생략한다.
2. **없는 로그 파일** — `runDeploy`의 `runVerifyCmd` 호출(`:815`)에 `log_context`가
   없다(`verify-cmd.js:414` 주석 "Absent `log_context` (the shared deploy path)
   there is no file").

같은 함수에서 동질적인 사각 세 건이 더 관측되었다.

3. `deploy_base_not_synced`가 `revalidateBaseCheckout`의 구체 사유
   (`checkout_not_on_base` / `checkout_dirty` / `head_not_base_sha`)를 debug
   로그로만 남기고 레코드에는 싣지 않는다(`:800-806`).
4. 동기 throw(`:821-824`)와 detached spawn error(`:869-873`)가 err를 버린다.
   `deploy_spawn_error`만으로는 ENOENT인지 EACCES인지 알 수 없다.
5. `deploy_verify_missing`(`:795-797`)과 `deploy_base_not_synced`(`:798-807`)는
   `recordLastDeploy` **이전에** return하므로 `last_deploy`를 갱신하지 않는다.
   `cleanup_failed`는 `inPrWait` 가드(`:1329`)에 막히므로 external PR 행에서는
   두 사유가 durable 레코드를 어디에도 남기지 않는다. 그런데
   `LastDeploy.reason`의 문서화된 어휘에는 두 사유가 이미 포함되어 있어
   (`queue-store.js:261-263`) 코드가 선언된 계약을 지키지 않는 상태다.

5번은 부재보다 나쁘게 **오해를 만든다**. `last_deploy`가 답하는 질문은 "지금 돌고
있는 서비스가 머지된 코드인가?"인데, 거부된 배포가 레코드를 갱신하지 않으면 낡은
성공 레코드가 화면에 남아 아니오인데 예라고 답한다.

## 목표

동기 deploy 실패의 전체 출력과 구체 사유를 보존하고, 워커 배너와 ⚙ 다이얼로그에서
도달 가능하게 한다. detached deploy는 설계상 결과를 관측할 수 없으므로 출력 보존
대상이 아니며, 표시에서 "결과 미관측"과 "실패"를 혼동하지 않게 한다.

## 설계

### 1. 로그 러너 일반화 — `state-paths.js` + `verify-cmd.js`

- `state-paths.js`에 `deployLogDir(workspace_root)` 추가 →
  `$XDG_STATE_HOME/bdui/<slug>/deploy-logs`.
- `VerifyLogContext`에 **필수** 필드 `kind: 'verify'|'deploy'`를 추가하고, 기존
  유일 호출자 `runVerifyAtSha`(`:717-722`)가 `kind: 'verify'`를 명시한다. 묵시적
  기본값을 두지 않는 이유: 새 호출자가 조용히 verify 디렉터리에 쓰는 사고를
  막는다.
- 모듈 private 헬퍼를 일반화한다 — `openVerifyLog` → `openRunLog`,
  `rotateVerifyLogs(fs, dir)` → `rotateRunLogs(fs, dir, prefix)`. `kind` →
  (디렉터리 함수, 파일명 접두사) 매핑은 verify-cmd.js가 소유하고, 호출자는 명명·회전
  정책을 알지 않는다. 두 헬퍼 모두 모듈 외부 소비자가 없어 rename의 파급은 없다.
- deploy 로그 파일명은 `deploy-<bead_id>-<sha7>-<ts>.log`.
- **디렉터리를 분리하는 이유**: `LOG_MAX_BYTES`(10MB)·`LOG_KEEP`(20)·절단 마커
  상수는 공유하되 회전은 디렉터리·접두사별로 독립시킨다. verify 로그는
  `pr-poller.js:204`가 PR head마다 쓰는 반면 deploy는 머지당 1회이므로, 20개 예산을
  공유하면 진단이 필요한 deploy 로그가 후속 verify 실행에 밀려 사라진다.
- fail-quiet 규칙은 불변: open/write/close 어느 단계가 실패해도 deploy 판정은 바뀌지
  않고 `log_path`만 생략된다(불완전할 수 있는 파일을 가리키는 경로를 남기지 않음).

### 2. 동기 deploy 경로 — `pr-actions.js runDeploy`

- `runVerifyCmd` 호출에 `log_context`를 전달한다.

  ```js
  log_context: {
    kind: 'deploy',
    workspace_root: repo,
    bead_id,
    sha: base_sha,
    started_at_ms: Date.now()
  }
  ```

  로그 키는 `deps.repo`다 — `runVerifyAtSha`가 `input.repo`로 `verifyLogDir`를
  부르는 것과 같은 키이고, `attach.js:326`(`const repo = options.repo ||
  workspace_root`)이므로 `deps.workspace`와 다를 수 있다.
- `let r`의 `@type`을 `output_tail`/`log_path` 포함으로 확장한다. tail은 이미
  계산되어 있으므로 신규 플럼빙 없이 되살아나고, 새로 배선되는 것은 로그 파일뿐이다.
- 실패 반환 타입을 `{ ok: false, reason, detail?, output_tail?, log_path? }`로
  확장한다.
  - 동기 throw의 err를 `detail`로 보존한다. `errorDetail`(512자 캡)을
    verify-cmd.js에서 export해 재사용한다.
  - `deploy_base_not_synced`는 `revalidated.reason` 3종을 `detail`로 싣는다.
- 명령이 실제로 실행된 경우 — 성공(`deployed`)과 `deploy_failed`/`deploy_timeout` —
  양쪽 `recordLastDeploy`에 `log_path`를 전달한다. 성공 로그도 남기는 것은 verify와
  같은 "다음 실패의 비교 기준" 논리이고, 회전이 총량을 통제한다. 명령이 실행되지 않은
  사유(`deploy_verify_missing` / `deploy_base_not_synced`, 그리고 spawn 자체가 실패한
  `deploy_spawn_error`)는 남길 출력이 없으므로 `log_path` 없이 `detail`만 싣는다.
- `deploy_verify_missing`과 `deploy_base_not_synced`의 조기 return 앞에
  `recordLastDeploy(deployRecord('failed', reason, bead_id, base_sha))`를 detail과
  함께 추가한다. `failed`의 정의가 이미 `"it ran and did not succeed, or never
  started"`(`queue-store.js:260`)이므로 "시작 전 거부"는 어휘 안이다.
  `resolveDeploy() == null`(배포 미설정)은 **그대로 무기록** — 할 말이 없는 것과
  거부는 다르다.
- `runCleanup:1162`의 deploy 실패 분기를 다음으로 바꾼다.

  ```js
  return failCleanup(
    bead_id, 'deploy', deployed.reason, base_sync,
    undefined, deployed.detail, deployed.output_tail, deployed.log_path
  );
  ```

### 3. detached deploy 경로

- `launchDetachedDeploy`의 반환을 `boolean` → `{ ok: boolean, detail?: string }`으로
  바꾼다. 동기 throw는 반환값으로, 비동기 `error` 이벤트는
  `on_spawn_error(detail)` 인자로 err를 넘겨 `record_spawn_failure`가
  `last_deploy.detail`에 싣는다.
- 출력·종료코드 보존은 범위 밖이다: `stdio: 'ignore'`이고 자기 부모를 죽이므로
  관측자가 없다. 관측 가능한 유일한 실패(spawn 자체가 안 됨)에만 진단을 남긴다.

### 4. 레코드 — `queue-store.js`

- `LastDeploy` typedef에 옵셔널 `log_path?: string`, `detail?: string`을 추가한다.
  `normalizeLastDeploy`가 비어 있지 않은 문자열일 때만 실어 부재는 **키 없음**
  (null 아님) — `cleanup_failed.output_tail`/`log_path`와 동일 규칙이다. 캡은
  생산자(`errorDetail`) 쪽에만 둔다.
- 구버전 `queue.json` 로드는 영향 없다(옵셔널 키 부재 허용).
- `cleanup_failed`는 **스키마 변경 없음** — `detail`/`output_tail`/`log_path` 세 키가
  이미 있고(`:160`) deploy step만 값을 싣지 않았다.
- 와이어 레이어도 변경 없다: `decorateQueue`(`ws/worker-handlers.js:501`)가
  `queue.last_deploy`를 통째로 싣고, 클라이언트는
  `currentQueue().workspace_info`(`exec-defaults-dialog.js:237`)를 직통으로 읽으므로
  새 키가 필드 투영에 걸리지 않는다.

### 5. 표시

- **워커 배너(`running-grid.js`): 변경 없음.** `bannersTemplate:295`가 step과 무관하게
  `logPathLine`/`outputTailBlock`을 이미 렌더하므로, 서버가 값을 실으면 deploy 실패
  배너에 그대로 나타난다.
- `exec-defaults-dialog.js lastDeployGroup`:
  - `launched` label을 `발사됨 · 결과 미관측`으로 바꾼다. `failed`의
    `실패 · <reason>` 패턴(`:339-342`)과 대칭이고, 자기 재시작 배포는 "실패도 성공도
    아님"이 정확한 상태다.
  - `detail`이 있으면 `<code>` 한 줄, `log_path`가 있으면 `전체 로그: <code>` 한 줄을
    추가한다. 부재 시 생략(fail-quiet).
  - 두 값 모두 텍스트 바인딩으로 렌더한다 — 명령 출력·에러 메시지는 신뢰할 수 없는
    입력이므로 lit-html 이스케이프에 맡긴다.
  - 160자 캡 로컬 헬퍼를 추가한다(`running-grid.js`의 `truncateDetail`과 같은 값).
    두 파일이 별 모듈이므로 복제하고, 공유 유틸 신설은 하지 않는다.

### 6. 계약 표면

없다. 전부 `queue.json` 내부 키와 서버 소유 런타임 상태이므로 dotfiles
`docs/contracts/workflow.md` 대상이 아니다. 배너 문안이 바뀌지 않으므로 워커 탭 UX
스펙과의 정합 확인도 불필요하다.

## 테스트 범위

로그 보존:

- deploy 실패에서 전체 출력이 `deploy-logs/deploy-*.log`에 보존된다 (tail 캡보다 큰
  출력의 앞부분 포함).
- deploy 로그 회전이 verify 로그와 독립이다 — verify 21개를 만들어도 deploy 로그가
  지워지지 않고, deploy 21개면 오래된 deploy만 지워진다.
- `runVerifyAtSha` 경로가 `kind: 'verify'`로 여전히 `verify-logs/`에 쓴다 (회귀).
- 로그 open 실패와 중간 write/close 실패 각각에서 deploy 판정이 변하지 않고
  `log_path`가 생략된다.

레코드:

- `cleanup_failed`(deploy step)에 `output_tail`·`log_path`가 기록된다.
- `deploy_timeout`에서도 tail·log_path가 남는다.
- `last_deploy`에 `log_path`가 기록된다 (성공/실패 각각).
- `deploy_base_not_synced`의 세 사유가 각각 `detail`로 남는다.
- 동기 spawn throw의 err가 `cleanup_failed.detail`과 `last_deploy.detail`에 남는다.
- detached spawn error의 err가 `last_deploy.detail`에 남는다 (동기 throw / 비동기
  `error` 이벤트 각각).
- `deploy_verify_missing`과 `deploy_base_not_synced`가 각각 `last_deploy`에
  기록되고, 거부가 이전 성공 레코드를 덮어쓴다.
- 배포 미설정(`resolveDeploy() == null`)은 `last_deploy`를 만들지 않는다.
- 구버전 `queue.json`(새 키 부재) 로드가 무영향이다.

표시:

- 워커 배너가 deploy 실패의 `log_path`·`output_tail`을 렌더한다 (서버 변경만으로
  동작하는지 확인).
- 다이얼로그: `launched` 문안, `detail` 유·무, `log_path` 유·무 각각.

## 비범위

- detached deploy의 출력·종료코드 보존 — 설계상 관측 불가.
- 로그 뷰어·다운로드 UI — 파일 경로 제공까지만.
- `attempts[*]`로의 전파 — local deploy 결과는 attempt에 영속되지 않으며 연결 규칙
  신설은 이 Bead의 목적 밖이다.
- `truncateDetail` 공유 유틸 모듈 신설.

## 검증

`npm run tsc` / `npm test` / `npm run lint` / `npm run prettier:write` /
`npm run build` (번들 포함 커밋).
