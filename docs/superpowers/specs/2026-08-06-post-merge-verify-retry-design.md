# 머지 후 정리 verify 실패 자동 복구 — bounded 재시도 + [AI 정리] 디스패치

- Bead: UI-7u3d
- 날짜: 2026-08-06
- 상태: 설계 승인됨 (사용자, 대화 중)

## 배경과 문제

머지 후 정리(`runCleanup`)의 `post_merge_verify` 단계가 `verify_cmd_failed`로
실패하면 정리는 durable 실패로 멈추고, bead는 `resolved`로 남으며, 복구는
전적으로 사람 몫이다(pr_wait 행의 [머지] 재클릭 + 실패 원인 진단). 관측된 두
사례(beads-ode: Go `t.TempDir` 정리 레이스, dotfiles-dhsd: 고부하 타이밍 테스트
2건)는 모두 변경과 무관한 flake였고, 사람이 로그를 읽고 재클릭해서야 복구됐다.
머지 클릭 게이트(`gateNow`)의 click-time verify도 같은 flake로 클릭을 거부해
재클릭을 유발한다.

## 목표

1. **1단**: flake성 verify 실패를 사람 개입 없이 흡수한다 — 전체 verify 1회
   자동 재실행, green이면 계속 진행.
2. **2단**: 재시도로도 안 풀리는(재현되는) 실패에 대해, 버튼 한 번으로 AI 진단
   세션을 디스패치해 원인 분류와 후속 준비까지 자동화한다.

## 비목표

- poller 배지 레인의 verify 재시도 (진짜 red가 흔한 레인 — 상시 2배 비용).
- `verify_cmd_timeout`·`verify_cmd_spawn_error`·`verify_config_invalid`·
  `verify_worktree_failed`의 재시도 (결정적이거나 행(hang) 신호 — 즉시 인계).
- 재시도 횟수·지연의 설정화 (상수 1회, 지연 없음).
- 진단 없이 자동으로 AI 세션을 디스패치하는 것 (토큰은 사람 클릭으로 게이트).
- verify 동시 실행 직렬화 (별도 유닛 D — 이 스펙의 notes 기록이 그 판단의
  운영 데이터가 된다).

## 1단 — bounded 자동 재시도

### 재시도 래퍼 (verify-cmd 층, 공유 구현)

`server/worker/verify-cmd.js`의 `runVerifyAtSha`에 opt-in 옵션
`retry_flaky`(boolean, 기본 false)를 추가한다.

- 동작: 1차 실행 결과가 정확히 `verify_cmd_failed`일 때만 전체 verify를 1회
  재실행한다 (총 2회 상한, attempt 사이 지연 없음). 그 외 사유는 즉시 반환.
- 각 attempt는 각자의 로그 파일을 남긴다. ms 타임스탬프만으로는 빠른 두
  attempt가 같은 이름을 받을 수 있으므로, `retry_flaky` 경로의 로그명에는
  attempt 서수를 suffix로 추가한다 — `attempts`의 두 `log_path`는 항상
  상이해야 한다.
- 반환값에 attempt 이력을 추가한다: `attempts` —
  `[{ reason, log_path }]`. `retry_flaky` 활성 시 항상 존재하며 재시도가
  없으면 1개, 있으면 2개다. 최종 `ok`/`reason`/`log_path`/`output_tail`은
  마지막 attempt 기준. 옵션 미사용 호출자는 반환 형태 포함 어떤 동작 변화도
  겪지 않는다.

### 적용 지점 (2곳)

1. **`postMergeVerify`** (`server/worker/pr-actions.js`): `retry_flaky` 활성.
2. **`gateNow`의 click-time verify** (`server/worker/pr-actions.js`):
   `retry_flaky` 활성. 현재 `gateNow`는 `verify_missing`/`verify_sha_stale`
   일 때만 verify를 실행하므로, poller가 현재 head SHA에 이미 기록한
   `verify_cmd_failed`(cached red)에는 옵션만으로 재시도가 붙지 않는다 —
   **cached red도 클릭 시 재검증 트리거 조건에 추가한다** (클릭당 총 2회
   상한은 동일, poller 레인 자체는 어떤 경우에도 재시도하지 않음). 게이트
   판정은 최종 attempt 결과로 기존과 동일하게 기록한다
   (`observations.recordVerify`).

poller의 두 call site(`pr-poller.js`)는 옵션을 켜지 않는다.

### flake 흡수 기록 (bd notes, best-effort)

재시도로 green이 된 경우(1차 red → 2차 green), 해당 bead에
`bd update <id> --append-notes`로 한 줄을 기록한다:

```
verify flake 흡수 (<lane>): 1차 verify_cmd_failed (<1차 log_path>) → 재시도 green (<2차 log_path>)
```

`<lane>`은 `post_merge_verify` 또는 `merge_gate`. 기록은 best-effort다 —
쓰기 실패는 로그만 남기고 정리/게이트 진행을 막지 않는다(fail-quiet).
`--notes`(덮어쓰기)는 금지, 반드시 `--append-notes`.

### 문안·문서 전파 (같은 유닛의 propagation)

- 정리 실패 배너(`app/views/worker/running-grid.js`): "자동 재시도는 하지
  않습니다 — 정리를 사람이 마무리하세요" → "1회 자동 재시도 후에도
  실패했습니다 — [AI 정리]로 진단하거나 정리를 사람이 마무리하세요."
- `AGENTS.md` Post-Merge Runtime Validation 절의 자동 경로 설명에 1단
  재시도·2단 버튼 존재를 반영한다.

## 2단 — [AI 정리] 진단 디스패치

### 버튼 표면 (2곳)

1. **정리 실패 배너** (`running-grid.js` cleanup 배너): 실패 단계·사유·로그
   옆에 [AI 정리] 버튼. 세션 실패 배너의 [↻ 이어하기] 버튼 선례를 따른다
   (`data-bead-id` 부착, 디스패치 in-flight 동안 disabled).
2. **해당 bead의 보드 이슈 카드** (`app/views/board/`): 정리 실패 상태인
   bead의 카드에 실패 배지 + [AI 정리] 버튼을 노출한다. 보드 카드는 현재
   워커 큐의 `cleanup_failed` 상태를 모르므로, 워커 큐 스냅샷의 per-bead
   `cleanup_failed` 정보를 카드 뷰까지 배선하는 작업을 포함한다. 계약 키
   부재·워커 미가동 시에는 배지·버튼을 렌더하지 않는다(fail-quiet).

수동 재시도 경로(pr_wait 행의 [머지] 재클릭)는 보존한다 — 버튼은 보완 관계.

### 디스패치 경로

- conflict_resolution과 같은 스케줄러 디스패치 인프라를 재사용한다
  (`scheduler.resolveConflict` 선례). 새 attempt 종류 `cleanup_diagnosis`를
  추가하고 스케줄러에 `dispatchCleanupDiagnosis(workspace, bead_id)`를 노출.
- 가드: `cleanup_failed[bead_id]` 기록이 있는 bead에만 허용 · 같은 bead의
  액션 in-flight 중 거부 · 클릭당 정확히 1 attempt (자동 재디스패치 없음).

### 에이전트 계약 (세션 프롬프트에 명시)

목표는 "verify를 green으로 만들기"가 **아니라 분류다**:

1. 실패 단계·사유·verify 로그를 읽고 원인을 분류한다:
   `flake` / `environment` / `regression`.
2. `flake`·`environment` → 근거를 bead notes에 기록하고 판정을 구조화된
   결과로 반환한다. `environment`는 원인 수리용 bead 생성을 제안한다.
3. `regression` → 진단 세션은 **fix bead 생성까지만** 수행한다 (분류·근거·
   재현 로그를 bead에 첨부; 코드는 수정하지 않는다). fix PR은 그 fix bead를
   표준 워커 레인이 집어 기존 규칙(스펙·게이트·PR Delivery) 그대로
   준비한다 — 사용자에게는 "진단 + fix PR 준비까지 자동"이라는 결과가
   유지된다. main 직접 수정 금지(기존 가드가 차단), landing은 사람의 머지
   클릭.
4. 테스트를 약화·삭제·skip 처리해 통과시키는 행위 금지.

### 판정 스키마와 durable 기록

- 진단 attempt의 결과는 구조화된 판정으로 반환된다:
  `{ verdict: 'flake'|'environment'|'regression', evidence: string,
  refs?: { fix_bead_id?, env_bead_id? } }`. 이 세 값 외의 verdict, 파싱
  불가, 필수 필드 부재는 모두 **malformed**다.
- 워커는 판정을 검증한 뒤 큐 스토어의 `cleanup_failed[bead_id]`에
  `diagnosis: { verdict, attempt_id, consumed: boolean }`로 **durable하게
  병합**한다 — in-memory 이벤트가 아니라 저장된 기록이 소비의 단일
  근거이므로, 서버 재시작 후에도 같은 판정이 두 번 소비되지 않는다.

### 판정 소비 (워커)

- `verdict`가 `flake` 또는 `environment`이고 `consumed`가 false이면 워커가
  정리를 1회 자동 재실행하고, **재실행 시작 전에** `consumed: true`를
  durable하게 기록한다 — 판정당 재실행은 정확히 1회, 재시작·크래시 후에도
  상한 유지.
- 재실행이 다시 red면 기존과 동일한 `cleanup_failed` 실패로 남는다 — 이때
  이미 `consumed: true`이므로 같은 판정으로 재실행이 반복되지 않는다.
- `regression`이면 재실행 없이 정리는 멈춘 채 유지하고, 실패 배너를 진단
  결과(분류, fix bead 링크)로 갱신한다 — 사람이 받아볼 때 진단이 이미
  붙어 있는 상태가 목표.
- **malformed 판정과 판정 없는 attempt 종료(비정상 종료 포함)는
  fail-closed**: 아무것도 자동 실행하지 않고 배너에 그 사실만 기록한다.

## 에러 처리 원칙 요약

- 자동 진행은 verify green일 때만 — 어떤 경로도 red verify를 안고 deploy로
  넘어가지 않는다 (fail-open 금지).
- 기록(notes append)·표시(카드 배지)는 실패해도 본 흐름을 막지 않는다.
- 디스패치·판정 소비는 가드로 중복과 폭주를 막는다 (클릭당 1 attempt,
  판정당 1 재실행).

## Test scope

RED→GREEN 시임 (기존 테스트 파일 관례를 따름):

1. `verify-cmd.test.js` — `retry_flaky`: 1차 `verify_cmd_failed` → 2차 green
   이면 ok + attempts 2개 / 2연속 red면 최종 red + attempts 2개 / timeout·
   spawn_error는 재시도 없이 즉시 반환 / 두 attempt의 `log_path`가 상이 /
   옵션 미사용 시 기존 동작 불변.
2. `pr-actions.test.js` — `postMergeVerify` 재시도 경로: 흡수 시 정리 계속
   진행 + notes append 호출 / append 실패에도 정리 진행(fail-quiet) /
   2연속 red면 기존과 동일한 `failCleanup`.
3. `pr-actions.test.js` — `gateNow` click-time verify 재시도: 흡수 시 게이트
   green 판정, 최종 attempt가 관측에 기록됨 / poller가 기록한 cached
   `verify_cmd_failed`(현재 head SHA) → 클릭 → 재검증 green이면 게이트
   green / `merge_gate` lane의 notes append 호출 / append 실패에도 게이트
   green 판정 유지(fail-quiet).
4. `running-grid.test.js`(또는 해당 뷰 테스트) — 갱신된 배너 문안 + [AI 정리]
   버튼 렌더·disabled 상태.
5. 보드 카드 — `cleanup_failed` 배선 존재 시 배지+버튼 렌더, 부재 시 미렌더.
6. 디스패치 가드 — `cleanup_failed` 없는 bead 거부 · in-flight 중복 거부 ·
   판정 소비: `flake` → 정리 1회 재실행, `regression` → 재실행 없음 ·
   malformed 판정 → fail-closed(재실행 없음, 배너 기록).
7. 판정 소비 후 안전 invariant — `flake`/`environment` 판정으로 재실행된
   정리의 verify가 다시 red: `cleanup_failed` 유지 · deploy(및 detached
   launch) 미호출 · 같은 판정(`consumed: true`) 재소비 시 재실행 없음
   (재시작 후 포함).

## 단계 구성 (승격 판정 참고)

1단(재시도 + 기록 + 문안)과 2단(버튼 + 디스패치 + 판정 소비)은 독립 배포
가능한 단계다 — spec 게이트 종료 시 `independent_phases_2_plus` 승격 판정
대상. 1단이 선행하면 순수 flake가 먼저 흡수되어 2단 버튼까지 오는 실패(재현
실패)만 토큰을 쓴다.

## 관련

- 유닛 B (별도, enclosed quick fix): External/beads `scripts/test.sh`의
  `/tmp/beads.coverage.out` 고정 경로를 per-run 고유 경로로 — 동시 verify
  간 커버리지 프로파일 충돌 제거 (beads-ode 2차 실패의 원인).
- 유닛 D (deferred): verify 동시 실행 직렬화 — 이 스펙의 flake 흡수 notes
  기록이 재진입 판단의 운영 데이터.
- UI-l3v7: 2단 범위의 선행 초안 bead, 본 스펙으로 병합되어 closed.
