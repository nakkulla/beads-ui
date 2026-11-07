---
scope:
  - server/worker/repo-ops-resolver.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/queue-store.js
  - server/worker/operation-recovery.js
  - server/worker/pr-actions.js
  - server/cli/
  - app/utils/failure-sentences.js
  - app/protocol.md
  - AGENTS.md
---

# Worker 배포를 머지된 커밋의 선언·스크립트로 실행하고 첫 배포 승인 경로를 지운다 (UI-ymcx)

출처: train_bot-q54 PR #16(2026-11-05). PR이 배포 스크립트와 `requirements.txt` 형식을 함께 바꿨다.
Worker는 이전 base 스크립트 blob을 실체화(transition)해 실행했고, 그 스크립트가 새
`requirements.txt`를 읽지 못해 `remote dependency check failed`로 세 번 실패했다.

정본 변경은 형제 dotfiles-8lp38(`docs/superpowers/specs/2026-11-07-repo-ops-deploy-target-commit-design.md`,
dotfiles 저장소)이 맡는다. 이 Bead는 그 계약을 따르는 beads-ui 쪽 변경이다.

사용자 결정(2026-11-07):

- 배포는 머지된 커밋의 선언·스크립트로 실행한다.
- 머지 전 검증은 이전 base 그대로 둔다.
- 첫 `[deploy]` 선언도 승인 없이 배포한다.
- `[배포 실행]` 버튼은 복구용으로만 남긴다.

## 1. 검증된 전제

base `be68d6a3096b4fe9709bdb57452422de8d264897` 기준.

- `resolveEffectiveRepoOps`는 종류와 상관없이 정책을 이전 SHA에서 정한다.
  - 대상에만 선언이 있으면 `bootstrap`, 식별자가 다르면 `transition`으로 분류한다 — server/worker/repo-ops-resolver.js:225-271
- 배포 실행은 `transition`이면 이전 blob을 실체화한 파일을 실행한다 — server/worker/repo-operation-coordinator.js:2077-2101
- 검증 실행도 같은 실체화를 쓴다(이번에 바꾸지 않음) — server/worker/repo-operation-coordinator.js:1484, :1691, :3248, :3264
- 자동 배포는 `bootstrap` 분류에 승인 기록이 없으면 `bootstrap_not_approved`로 멈춘다.
  - 승인 요청은 spool에서 소비한다 — server/worker/repo-operation-coordinator.js:2204-2218, :2251-2311, :3183, :3990-4124
- 수동 `[배포 실행]`과 정리 쪽 `policy_source: 'target_tip'`은 "유일한 이전 base 예외"로서 이전 SHA 자리에 대상 SHA를 넣어 대상 정책으로 돈다 — server/worker/repo-operation-coordinator.js:2178-2192, :3029, :3176; app/protocol.md:1009-1014
- 배포 기록은 정책을 읽을 SHA로 `effective_base_sha = previous_sha || target_sha`를 저장한다 — server/worker/repo-operation-coordinator.js:2233-2240
- 서버 재시작 뒤 정리의 정확 조회는 그 기록 SHA에서 선언을 다시 읽는다. 스크립트·모드·blob·제한 시간이 맞지 않으면 `repo_operation_timeout_unresolved`를 낸다 — server/worker/repo-operation-coordinator.js:3558-3573 `findExactDeployOperation`. 정리는 그 코드를 정리 실패로 기록한다 — server/worker/pr-actions.js:4292-4315
- 기록된 작업을 다시 실행할 때는 기록 SHA와 대상으로 정책을 다시 판정하고, blob·모드가 기록과 다르면 `repo_ops_policy_drift`로 끝낸다 — server/worker/repo-operation-coordinator.js:3174-3201 (`launchQueued`)
- 등록되지 않은 실패 코드는 문장 없이 원시 코드로 보인다 — app/views/worker/failure-labels.js:192 (`failureSentence`가 `null`), :248 (`failureText`)
- ADR UI-hf8v의 정리 재시도 조항도 "정책·스크립트는 마지막 성공 배포의 base에서 읽는다"고 적는다 — docs/adr/UI-hf8v-monitor-full-placement-plan.md:326, :330
- 승인 기록 필드와 그 부착 변이 — server/worker/queue-store.js:964, :4593, :4730, :8436, :8919-8938
- 승인 요청 CLI — server/cli/index.js:6, :58, :133-134; server/cli/repo-ops.js:76-96; server/cli/usage.js:14
- 실패 안내 문장 — app/utils/failure-sentences.js:37-41, :201, :222-223; 복구 분류 목록 server/worker/operation-recovery.js:11
- 운영 문서와 ADR이 "핀된 base SHA의 `[deploy]`"를 적는다 — AGENTS.md:88; docs/adr/UI-hf8v-monitor-full-placement-plan.md:204, :330
- 실제 큐 파일에 승인 기록 필드가 남아 있다(대부분 `null`, beads-ui·dotfiles 큐에 객체 값 몇 건) — `grep -o '"bootstrap_provenance":[^,]*' ~/.local/state/bdui/*/queue.json`

## 2. 규칙

결정: 배포 정책은 대상 SHA의 선언·스크립트다. 검증 정책과 그 실체화는 바꾸지 않는다.

- **판정.** `kind: 'deploy'`이면 정책을 대상 트리에서 정하고 분류는 `normal` 하나다.
  - `bootstrap`·`transition`은 배포에서 나오지 않는다.
  - `kind: 'verify'`는 지금 그대로다.
  - 예: 같은 함수에 분기 하나를 두거나 배포 전용 함수를 따로 둔다.
- **실행.** 배포는 대상으로 정렬한 배포 워크트리 안의 선언 스크립트 파일을 실행한다.
  배포 쪽 실체화 분기는 지운다. 실체화 모듈은 검증이 계속 쓴다.
- **기록의 정책 SHA.** 결정: 새 배포 기록의 정책 SHA(`effective_base_sha` 자리)는 대상 SHA다.
  - 그 기록을 다시 읽는 모든 곳은 기록된 정책 SHA 하나에서 선언을 읽는다. 다시 읽는 곳:
    재시도·재실행(`launchQueued`), 서버 재시작 뒤 정확 조회(`findExactDeployOperation`), 부팅 재개.
  - 그래서 스크립트나 `timeout_ms`를 바꾼 머지도 재시작 뒤 같은 선언을 다시 찾는다.
  - 수동 `[배포 실행]`과 정리 쪽 `policy_source: 'target_tip'`의 "유일한 이전 base 예외"는 일반
    규칙이 되므로 예외 분기를 없앤다.
  - 정리 재시도 후계의 정책도 대상 커밋에서 읽는다. 대상은 지금처럼 정리가 fetch한 base tip이다.
- **첫 선언·선언 제거.** 대상이 `[deploy]`를 선언하면 이전 base와 상관없이 배포한다. 대상에 없으면
  할 일이 없다(inert).
- **첫 배포 승인 경로 삭제.** 지우는 것:
  - `bootstrap_not_approved` 판정
  - spool 승인 요청 소비
  - `repo-ops-bootstrap` CLI와 사용법 줄, 그 통합 테스트
  - 큐 레코드의 `bootstrap_provenance` 필드와 부착 변이
  - 실패 문장 37~41·222~223행
  - 복구 분류 목록의 그 항목
- **`[배포 실행]`.** 버튼과 수동 실행 경로, 복구 안내 문장(201행)은 그대로 둔다. 첫 배포 안내에서만 빠진다.
- **지난 기록.** 저장된 레코드의 `bootstrap_provenance` 키는 읽을 때 무시한다. 오류를 내지 않고,
  다시 쓸 때는 싣지 않는다.
  - 지난 `bootstrap_not_approved` 실패는 등록되지 않은 코드의 기존 표시를 따른다(문장 없이 원시 코드).
  - 이전 규칙으로 기록된 작업은 기록된 정책 SHA가 이전 base다. 그래서 재시작 뒤 진행 중 실행의 정확
    조회는 지금처럼 채택된다.
  - 그 작업을 재시도하면 새 판정의 대상 blob이 기록과 달라 지금 있는 `repo_ops_policy_drift`로 끝난다.
    이전 스크립트를 조용히 다시 돌리지 않는다.
- **문서.**
  - AGENTS.md 88행을 "머지된 커밋의 `repo-ops/config.toml` `[deploy]`"로 고친다.
  - `app/protocol.md` 1009~1014행에서 "single previous-base exception, manual path only" 설명을 지운다.
    수동 실행이 대상을 핀하는 방식과 복구 역할 설명은 남긴다.

## 3. 수락 기준과 테스트

이름은 예시다.

- `server/worker/repo-operation-policy.test.js` 또는 resolver 테스트
  - `resolves deploy policy from the target tree when the script changes`: 분류가 `normal`이고
    정책 blob이 대상 것이다.
  - `resolves first deploy declaration without bootstrap classification`
  - `keeps verify transition classification`: 검증은 지금처럼 `transition`이다.
- `server/worker/repo-operation-coordinator.test.js`
  - 스크립트를 바꾼 머지의 배포가 배포 워크트리의 대상 스크립트를 spawn한다(실체화 호출 없음).
  - 이전 base에 선언이 없고 대상이 선언한 머지가 승인 없이 spawn된다.
  - 이전 규칙 blob으로 기록된 작업의 재시도가 `repo_ops_policy_drift`로 끝난다.
  - 새 배포 기록의 정책 SHA가 대상 SHA다.
  - 스크립트와 `timeout_ms`를 바꾼 머지의 배포가 서버 재시작 뒤 `findExactDeployOperation`에서
    대상 선언의 제한 시간으로 재채택된다(`repo_operation_timeout_unresolved` 아님).
- queue-store 정규화: `bootstrap_provenance`가 든 저장 레코드를 읽어도 오류가 없고, 다시 쓴 레코드에 그 키가 없다.
- CLI: 사용법에 `repo-ops-bootstrap`이 없다.
- 기존 승인 경로 테스트(`repo-ops-bootstrap.integration.test.js`, coordinator·completion-intent·
  operation-recovery·repo-operation-protocol·failure-labels의 bootstrap 사례)는 지우거나 새 규칙으로 바꾼다.

검증 묶음:

- `npm run tsc`
- `npm run lint`
- `npx vitest run --reporter=dot`
- `git grep -n -i -e bootstrap_provenance -e bootstrap_not_approved -e repo-ops-bootstrap -- server app ':!*.test.js'`가 0건
  - 테스트 파일은 지난 레코드 호환과 CLI 제거를 확인하는 입력으로만 이 문자열을 쓸 수 있다.

## 4. 결정 (ADR 후보)

- 전제: ADR dotfiles/dotfiles-8k8yf — 선언 정본은 각 레포의 `repo-ops/config.toml`이고 Worker는 의도·관측만 갖는다. 정책 커밋 조항은 형제 dotfiles-8lp38이 대체한다.
- Worker 배포는 대상 커밋의 선언·스크립트로 실행하고, 첫 배포 승인 경로를 없애며, `[배포 실행]`은 복구용으로 남긴다.
  - 조건 1(되돌리기 어려움): 다음이 함께 움직인다.
    - 서버 쪽: `repo-ops-resolver.js` 판정, coordinator의 배포 실행·기록 정책 SHA·승인 spool, 정리의 정확 조회, queue-store 레코드 형태, CLI
    - 화면 쪽: 실패 문장
    - 문서: AGENTS.md 운영 문단, `app/protocol.md`
    - 각 레포 배포 스크립트의 가정
  - 조건 2(맥락 없이 의외): 같은 저장소 작업 기록인데 검증은 이전 base blob을, 배포는 대상 blob을 실행한다.
  - 조건 3(실제 트레이드오프): 스크립트 변경 PR의 자기 배포와, 첫 배포를 사람이 켜던 통제 사이의 선택이다.
  - UI-hf8v에서 바뀌는 조항: 정책 커밋 줄(204행), 정리 재시도의 "정책·스크립트는 마지막 성공 배포의
    base에서 읽는다"(326행), 330행의 기각 사유. 새 조항은 "배포는 대상 커밋, 검증은 이전 base"로
    구분한다. 나머지 조항은 재진술한다.
  - `summary`: "Worker 배포는 머지된 대상 커밋의 repo-ops [deploy] 선언·스크립트로 실행해 첫 선언도 승인 없이 돌고 [배포 실행]은 복구용으로만 남으며 검증만 이전 base blob을 쓴다 — 모니터 전체 배치안과 나머지 조항은 UI-hf8v 그대로다" → ADR, supersede UI-hf8v
- 지난 레코드의 `bootstrap_provenance` 키를 읽을 때 무시한다 — 조건 1 실패: 정규화 한 곳이라 혼자 되돌릴 수 있음 → ADR 아님

## 5. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소: 정본 계약·세션 실행기·pr-finish | 없음 | dotfiles-8lp38 |

- 관찰: 각 작업 공간의 `repo-ops-spool/` 디렉터리가 디스크에 남는다 — 읽는 코드가 없어져 무해하다, Bead 미생성.
