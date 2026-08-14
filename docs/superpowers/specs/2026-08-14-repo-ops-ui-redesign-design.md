# 저장소 작업 UI 전면 재설계 — 상태 스트립·타임라인 드로어·실패 용어 통일·설정 선언 표시

- Bead: UI-q0uy (route: spec_backed)
- 승인 목업: `docs/superpowers/specs/assets/2026-08-14-repo-ops-ui-redesign/mockup.html`
  (구현의 시각 기준. 모든 색·타이포는 기존 control-tower 토큰만 사용)
- 관련: UI-0csp (엔진 coverage 버그, 이 단위 비포함)

## 1. 배경과 문제

2026-08-14 실화면에서 확인된 파악 불가 문제 다섯 가지:

1. **레포 오퍼레이션 패널이 강제 expand** — `<details ?open=${failing>0}>`이
   실패 1건(그마저 후손 배포 성공으로 덮였어야 할 잔재)에 패널 전체를 펼친다.
2. **"정리"·"정리 실패"·"실패 해결" 버튼의 의미 불명** — 무엇을 정리하는지,
   버튼이 무엇을 실행하는지 화면 어디에도 없다.
3. **실패가 기계 코드로 노출** — `repo_ops_worktree_unowned`,
   `verify_failed:gh_observation_failed`, `verify_cmd_failed`가 원문 그대로다.
4. **설정에 deploy 선언이 안 보임** — 설정 다이얼로그의 verify/deploy 표시가
   구 경로(`docs/agents/repo-ops.toml`, `peekVerifyResolution`/
   `peekDeployResolution`)만 읽어, 실제 배포 lane이 소비하는
   `repo-ops/config.toml [deploy]`는 어디에도 표시되지 않는다.
5. **Worker 자동 처리 기준 3목록이 항상 펼쳐져** 설정 화면을 지배한다.

## 2. 목표

- 접힌 상태에서도 현재 상태(최신 배포 SHA·상태·해결 필요 수)가 읽히고, 강제
  expand가 없다.
- 알려진 실패는 사람 용어(검증 실패·배포 실패·중단됨)와 원인 문장으로 표시하고
  (미지 계약 토큰은 §4.3 폴백), 행동 버튼은 눌렀을 때 일어나는 일을 이름으로
  말한다.
- 정리(cleanup)는 5단계 스텝퍼로 멈춘 위치가 보이고, 버튼은 "정리 재개"다.
- 설정은 Worker가 실제 소비하는 `repo-ops/config.toml` 선언을 표시한다.

## 3. 비목표

- 엔진의 `descendant_success_covers_ancestor_rows` 미적용 수정 — **UI-0csp**로
  분리. 이 단위는 UI·표시·1개 신규 mutation(기록 닫기)까지만.
- workflow 계약 어휘(실패 kind enum, 라벨, metadata 키)의 정의 변경 — beads-ui는
  소비자다(AGENTS.md). 표시 라벨 맵은 소비자 레이어이며 미지 토큰은 원시 표시.
- 정리 cursor 단계 자체·머지 판정 입력의 의미 변경.

## 4. 설계

### 4.1 상태 스트립 (기존 "레포 오퍼레이션" 패널 대체)

- `repoOperationsDisclosureTemplate`(app/views/worker/lanes.js)를 한 줄 스트립으로
  재작성한다. 내용: `저장소 작업 · 배포 <sha7> ✓ 최신 <시각> · <배지>`.
  - 최신 성공 deploy 행에서 target_sha(short)·finished_at·소요 시간을 파생.
  - 배지: 해결 필요 항목이 있으면 `해결 필요 N`(warn), 자동 해결 세션이 돌면
    `자동 해결 중`, 없으면 `모두 정상`(quiet).
  - 해결 필요 N = 미해제(failed, dismissed 아님) operation 수 + cleanup_failed
    항목 수.
- 자동 expand 제거. 스트립은 `<details>`가 아니라 버튼이며, 클릭 시 타임라인
  드로어를 연다. 열림 상태는 세션 내 ephemeral(지속 저장 없음).
- 성공 deploy 행이 하나도 없으면 SHA 부분을 생략하고 배지만 표시한다.

### 4.2 타임라인 드로어 (신규)

- 새 모듈 `app/views/worker/repo-ops-timeline.js`. 기존 transcript 드로어 chrome
  (openDrawerForAttempt 패턴)을 재사용하는 `openRepoOpsDrawer()`로 연다.
- 데이터: queue 스냅샷이 이미 클라이언트에 있는 `repo_operations` 행 +
  `cleanup_failed` 항목을 시간(finished_at ?? requested_at, cleanup은 at)
  내림차순으로 병합한 순수 파생. 신규 조회 없음. 최근 20개 표시.
- 이벤트 렌더 규칙:
  - 성공: 한 줄(무엇·대상 SHA·소요·성공 칩) + "세부" 접힘(script blob·exit·
    로그 경로).
  - 실패: 라벨 맵의 원인 문장(explain 블록) + 그 자리에 행동 버튼 + "세부"
    접힘(원시 실패 코드·script·로그).
  - 정리 멈춤(cleanup_failed): 5단계 스텝퍼(§4.4) + 원인 문장 + `정리 재개 —
    <멈춘 단계> 단계부터` 버튼 + 로그 보기. output_tail은 세부 접힘으로 이동
    (기존 노란 배너의 정보를 손실 없이 흡수).
- 실패 행 행동 버튼:
  - `자동 해결 세션 시작` — 기존 `worker-repo-operation-repair` 그대로. 부제로
    `repair 세션 1회를 씁니다 · 남음 <remaining>/<budget>` 표기. budget 소진
    시 버튼 비활성 + "자동 해결 횟수를 다 썼습니다 — 수동으로 해결하세요".
  - `기록 닫기` — 신규 mutation(§4.6). 사람이 확인한 실패 행을 접수 처리.

### 4.3 실패 용어 통일 (신규 라벨 맵)

- 새 모듈 `app/views/worker/failure-labels.js`:
  - 범주 라벨: `검증 실패` / `배포 실패` / `중단됨`. 상태 칩·배너·타임라인이
    공통 사용.
  - 문장 맵(알려진 코드 → 원인 문장), 초기 항목:
    - `repo_ops_worktree_unowned` → "배포 워크트리가 아직 Worker 소유가 아니어서
      스크립트 실행 전에 중단됐습니다."
    - `verify_cmd_failed` → "머지 후 검증 명령이 실패했습니다."
    - `gh_observation_failed` → "GitHub에서 PR 상태를 읽지 못했습니다."
    - `verify_script_failure` → "검증 스크립트가 실패했습니다."
    - `deploy_script_failure` → "배포 스크립트가 실패했습니다."
    - `interrupted_without_terminal_exit` → "작업이 종료 기록 없이 중단됐습니다."
  - 복합 코드(`verify_failed:gh_observation_failed`)는 `:` 분해 후 각 조각을
    맵에서 찾아 `범주 — 문장`으로 조립한다.
  - 폴백: 미지 코드는 범주 추정 없이 원시 토큰을 그대로 표시(기존
    POLICY_TOKEN_LABELS 폴백 관례). 원시 코드는 어느 표면에서든 "세부" 접힘
    안에 항상 남는다(디버깅 경로 보존).
- 세션 실패 배너(running-grid.js)도 이 맵을 사용해
  `⛔ <repo> 세션 실패 — 검증 실패 — GitHub에서 PR 상태를 읽지 못했습니다.`
  형태로 재작성. 기존 이어하기/폐기/닫기 버튼과 핸들러는 유지.

### 4.4 정리 스텝퍼와 PR 대기 카드

- 스텝퍼: 기존 `mergeStepView` 단계 정의(base 포함 확인 → 저장소 작업 → 자식
  정리 → 브랜치 정리 → 부모 close)를 재사용해 완료(✓)/멈춤(!)/미도달을
  시각화한다. 타임라인의 정리 멈춤 항목에 표시.
- PR 대기 카드(worker/index.js의 prWaitRow와 monitor/lanes.js 미러 — 두 파일의
  파생 필드는 기존 계약대로 정확히 일치해야 한다):
  - 배지 `정리 실패` → `정리 멈춤 · <단계 라벨>`.
  - `merge_label`의 `정리` → `정리 재개`. 핸들러는 기존 `queueMerge` 그대로
    (서버가 멈춘 단계부터 재개하는 기존 semantics 불변).
  - `deployment_action_blocked` 케이스(repo_operations/deploy 단계 실패로 머지
    액션이 잠긴 카드)는 잠금 사유 대신 타임라인 드로어를 여는 링크를 노출한다.
- board 카드의 `⚠ 정리 실패` 칩(board/card.js)도 `⚠ 정리 멈춤`으로 통일.

### 4.5 설정 — 저장소 작업 선언과 자동 처리 기준

- `exec-defaults-dialog.js`의 verify/deploy 그룹을 "저장소 작업 선언" 카드로
  재작성한다. 데이터는 §4.6의 `workspace_info.repo_ops`.
  - 헤더에 출처를 명시: `repo-ops/config.toml @ <base>@<sha7>`.
  - 머지 전 검증 lane: `[verify]` 선언이 있으면 cmd·timeout, 없으면
    `선언 없음 — verify 없이 판정` + 판정 입력 설명 한 줄.
  - 머지 후 배포 lane: `[deploy]` script·timeout + 실행 위치(`.worktrees/
    .repo-ops-deploy`) 설명 한 줄.
- 레거시 표시(기존 verifyGroup/deployGroup)는 `repo_ops.status === 'absent'`
  또는 `repo_ops` 필드 부재(구버전 스냅샷)일 때만 유지한다. `pending`/`error`는
  §4.6 1번의 상태 문구를 표시하며 레거시로 폴백하지 않는다(레거시 코드 제거는
  별도 단계라는 기존 방침 유지).
- 자동 처리 기준 3목록(`autoRepairSection`의 policyList 3개)은 `<details>`
  기본 접힘으로 감싸고, summary에 `자동 N · 해결 세션 M (체인당 K회) · 금지 L`
  개수 요약을 표기한다. 자동 해결 토글·남은 횟수·실행 중 세션 줄은 접힘 밖에
  유지(항상 보임).

### 4.6 서버 변경 (2건)

1. **workspace_info 확장** — `server/ws/worker-handlers.js`의 `workspace_info`에
   `repo_ops` 요약을 추가한다:
   `{ status, source_path, base_ref, base_sha, verify: null|{cmd,timeout_ms},
   deploy: null|{script,timeout_ms} }`.
   - **표시용 resolution lifecycle**: `resolveRepoOps`(repo-ops-resolver.js)는
     캐시 없는 순수 async 함수이므로, 서버가 저장소별 표시 캐시
     `repo_ops_display`를 새로 소유한다. 채움 시점은 두 곳: (a) workspace
     attach/재연결 시 `origin/<base>`의 마지막 알려진 tip SHA로 1회 resolve,
     (b) coordinator가 operation을 위해 resolve할 때마다 그 결과로 갱신(중복
     resolve 없음). 캐시 갱신은 queue 스냅샷 재브로드캐스트를 유발한다.
   - **상태 구분**: `status`는 `resolved`(선언 해석 완료) / `absent`(성공한
     빈 tree 조회로 config 부재가 증명됨) / `pending`(아직 resolve 전) /
     `error`(resolve 실패, `repo_ops_config_invalid` 등)의 4값이다. 클라이언트
     레거시 폴백 표시는 **`absent`일 때만** 적용하고, `pending`은 "선언 확인
     중", `error`는 "선언 읽기 실패"를 표시한다 — config 보유 저장소가
     resolution 지연·실패로 조용히 레거시 표시에 빠지지 않게 한다. 필드
     자체가 없는 구버전 서버 스냅샷도 레거시 표시로 폴백한다.
2. **실패 기록 닫기** — 신규 ws 메시지 `worker-repo-operation-dismiss`
   `{operation_id}`. failed 상태 행에 `dismissed: {at, by: 'user'}`를 마킹한다.
   상태 전이는 아니며(행은 failed로 남아 감사 가능), 스트립의 해결 필요 집계와
   타임라인의 행동 버튼 노출에서만 제외된다. repair budget·chain은 불변.
   repairing/queued/running 행에는 거부(invalid state).

## 5. 오류 처리

- 계약 키 부재(예: cleanup_failed.step 미지 값, policy 목록 결손)는 해당 표시를
  생략하거나 원시 토큰으로 폴백한다 — throw 금지(fail-quiet, AGENTS.md).
- 타임라인 병합에서 시각 필드가 없는 행은 목록 끝(가장 오래된 쪽)에 둔다.
- dismiss 실패(권한·revision 충돌)는 기존 mutation 오류 표시 관례를 따른다.

## 6. Test scope

RED-GREEN seam은 아래 파생 함수·렌더 경계로 한정한다.

- `failure-labels.js`: 코드→범주/문장, 복합 코드 분해, 미지 코드 원시 폴백.
- 스트립 요약 파생: 성공만/실패 포함/repairing/빈 목록/성공 부재.
- 타임라인 병합: operation·cleanup 혼합 정렬, 시각 결손 행, 20개 절단.
- `exec-defaults-dialog`: repo_ops resolved(3형: verify+deploy/deploy만/둘 다
  없음)·absent와 필드 부재(레거시 폴백)·pending·error 렌더, 3목록 기본 접힘과
  summary 개수.
- pr_wait 행 파생: `정리 재개` 라벨, `정리 멈춤 · <단계>` 배지, worker/monitor
  미러 일치.
- 서버: workspace_info `repo_ops` 4상태(resolved/absent/pending/error) 투영,
  attach 시 resolve → `workspace_info.repo_ops` 도달까지의 통합 seam(초기 v2
  workspace, fake gitRun으로 resolved·absent·error 각 경로), coordinator
  resolve 결과의 캐시 갱신·재브로드캐스트, `worker-repo-operation-dismiss`
  마킹·집계 제외·invalid state 거부.
- 기존 배너·패널 문구를 단언하는 테스트(index.test.js, lanes, running-grid,
  board/card.test.js)와 테마 테스트를 새 구조로 갱신한다.

## 7. 수용 기준

1. 실패 행이 있어도 패널이 자동으로 펼쳐지지 않고, 접힌 스트립에서 최신 배포
   SHA·상태·해결 필요 수가 읽힌다.
2. 라벨 맵에 있는 실패 코드는 화면 본문에 원문으로 노출되지 않는다(세부 접힘
   제외). 미지 계약 토큰은 소비자 계약(§4.3 폴백)에 따라 원시 표시가 허용되는
   예외이며, 이때도 원문은 세부 접힘에 함께 남는다.
3. 정리 멈춤 항목에서 멈춘 단계가 스텝퍼로 보이고, 버튼 라벨이 재개 지점을
   말한다.
4. 설정에서 이 저장소의 `[deploy]` script·timeout·실행 위치가 보이고, verify는
   `선언 없음 — verify 없이 판정`으로 표시된다.
5. 자동 처리 기준 3목록이 기본 접힘이다.
6. Pre-Handoff 번들(tsc/test/lint/prettier/build) 전체 통과, 번들 산출물 포함.
