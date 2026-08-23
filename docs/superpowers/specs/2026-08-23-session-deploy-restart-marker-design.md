---
scope:
  - repo-ops/script/deploy
  - server/worker/auto-advance-restore.js
  - server/worker/attach.js
---

# 세션 배포 재시작 마커 — quick_fix 배포 후 auto_advance 복원

Bead: UI-7x78

## 배경과 목적

Worker는 재시작 시 `auto_advance`를 무조건 OFF로 내리고(fail-closed,
`server/worker/queue-store.js` `ensureLoaded`), "Worker 자신이 기록한 deploy
`repo_operations`가 이 재시작을 일으켰고 터미널 성공에 도달했다"를 증명한
경우에만 이전 값을 복원한다(`server/worker/auto-advance-restore.js`).

세션 소유 quick_fix 배포는 dotfiles `run-repo-ops-deploy.py`를 실행기로 같은
스크립트(`repo-ops/script/deploy`)·같은 워크트리(`.worktrees/.repo-ops-deploy`)·
같은 flock을 쓰지만 `repo_operations`에 기록되지 않으므로, 그 재시작은 항상
"출처 불명"으로 판정돼 자동화가 꺼진 채 남는다. 2026-08-23에 세션 배포 5회
(16:45·17:59·18:12·18:29·18:44 KST) 중 18:44 배포가 lane `s1`의 대기 작업
(UI-rcqn, UI-24ow) dispatch를 막은 것이 관측 사례다.

목표: 두 실행기가 공통으로 거치는 deploy 스크립트가 배포 마커를 남기고, 복원
컨트롤러가 그 마커를 `repo_operations` 후보와 같은 기준으로 소비해, 세션 배포로
인한 재시작에서도 `auto_advance`를 복원한다. 수동 `bdui-shared restart`·크래시는
지금처럼 OFF를 유지한다.

## 결정 사항

- 증거 기록 주체는 **deploy 스크립트**다(사용자 확정). dotfiles 계약·세션
  실행기·workflow 계약 표면은 변경하지 않는다. 마커는 스크립트(생산자)와
  서버(소비자)가 같은 저장소에 있는 beads-ui 내부 런타임 표면이며, 소비자는
  fail-quiet다.
- 세션 배포를 `repo_operations`/저장소 작업 타임라인에 채택하지 않는다. 실패
  처리·증거 확인 소유권은 계약대로 push한 세션에 남고 repair 사다리를 타지
  않는다.
- 명명 제약: `scripts/check-managed-deploy-retired.js`의 FORBIDDEN 목록
  (`deploy-receipts`, `managed-deploy`, `writeRuntimeMarker`,
  `readRuntimeMarker` 등)에 걸리는 파일명·식별자를 쓰지 않는다. 이 spec의
  마커 파일명과 새 함수 이름은 그 목록과 겹치지 않게 유지한다.

## 1. 마커 표면 (`repo-ops/script/deploy`)

고정 경로: `<owner_root>/.worktrees/.repo-ops-deploy.restart.json`. owner_root는
스크립트가 잠금 경로 계산에 이미 쓰는 `git rev-parse --git-common-dir`의 부모다.
`.worktrees/`는 gitignore 영역이므로 스크립트 종료 시 tracked-clean 검증과
충돌하지 않는다.

단일 JSON 파일, 배포마다 덮어쓴다. 쓰기는 항상 같은 디렉터리의 temp 파일에
쓴 뒤 `mv`로 원자 교체한다.

- **시작 마커** — `bdui-shared restart` 호출 직전(self-flock 구간 안):

  ```json
  {"schema": 1, "target_sha": "<40hex>", "target_base": "main", "started_at": <epoch_ms>}
  ```

- **종료 마커** — 스크립트 종료 시 같은 파일을 같은 내용에 다음 필드를 더해
  덮어쓴다:
  - 성공(`exit 0` 도달): `"result": "ok", "instance_id": "<uuid>",
    "finished_at": <epoch_ms>` — `instance_id`는 health readback이 `ok`로
    관측한 **새 런타임의 정확한 `runtime.instance_id`**(healthz JSON)다.
  - restart 이후 실패(health readback 실패, 폴링 중 런타임 신원 변경, 종료
    HEAD 불일치, tracked-clean 실패): `"result": "failed", "finished_at":
    <epoch_ms>` (`instance_id` 없음)

  구현은 `trap ... EXIT` + 상태 플래그로 한다: 시작 마커를 쓴 뒤부터 trap이
  활성화되고, 정상 종료 직전에 플래그를 `ok`로 바꾼다. 시작 마커를 쓰기 전의
  실패(락·npm ci·build·restart 자체 실패)는 마커를 남기지 않거나 시작 마커만
  남는데, 두 경우 모두 소비자 판정에서 복원으로 이어지지 않는다(§2).

**런타임 신원 고정(health 폴링)**: 기존 `health_probe`는 healthz JSON을 이미
파싱하므로, `source_sha`가 target과 일치하는 응답의 `runtime.instance_id`를
함께 출력하도록 확장한다. 폴링 루프는 **restart 이후 처음 관측한 target-SHA
런타임의 `instance_id`를 고정**하고, 이후 응답의 `instance_id`가 그것과
다르면 즉시 `runtime_identity_changed`로 실패한다(폴링 중 같은 SHA로 수동
재시작되거나 크래시 후 재기동된 경우). `ok`는 고정한 그 인스턴스에서만
성립하며, 종료 마커의 `instance_id`가 바로 그 값이다.

`started_at`/`finished_at`은 진단용이다. 판정은 `instance_id` 정확 일치로만
하므로 초 단위(`date +%s` + `000`)로 충분하고, 관측된 `process_started_at`
역시 초 단위(`…000`)라는 사실에 의존하지 않는다. POSIX sh 범위를 벗어나는
도구는 쓰지 않는다.

Worker 경로도 같은 스크립트를 지나므로 마커가 동일하게 남는다. 복원은
프로세스 전역 `triggered` 플래그로 한 번만 일어나므로 `repo_operations` 후보와
마커 후보가 같은 재시작에 둘 다 잡혀도 중복 효과가 없다.

## 2. 소비자 (`server/worker/auto-advance-restore.js`)

`afterReconcileLocked(workspace)`에 기존 `repo_operations` 후보 루프와 병렬로
**마커 후보 판정**을 추가한다. `registration.repo` 기준
`.worktrees/.repo-ops-deploy.restart.json`을 동기 읽기하고, 부재·파싱 실패·
schema 불일치는 조용히 건너뛴다(fail-quiet, 기존 catch 정책과 동일).

마커가 다음을 모두 만족하면 터미널 성공으로 보고 `triggered = true`:

1. `target_sha === runtime_identity.source_sha` (소문자 비교)
2. `result === "ok"`
3. `instance_id === runtime_identity.instance_id` — 정확 문자열 일치. 배포
   스크립트가 health readback으로 관측한 런타임이 **바로 이 프로세스**임을
   증명한다
4. `sameRepository(registration)` (기존 root-commit 비교 재사용)

`result`가 아직 없으면(스크립트가 health 폴링 중) 이번 pass는 건너뛰고 다음
reconcile pass가 재판정한다 — reconcile은 부팅 직후와 주기 폴러에서 반복
실행되므로 별도 대기 로직이 필요 없다. `result === "failed"`이거나
`instance_id`가 없거나 다르면 후보가 아니다. `started_at`/`finished_at`은
판정에 쓰지 않는다(초 단위 타임스탬프의 경계 비교에 의존하지 않기 위함).

조건 3이 소비(consume) 기록을 대체한다: `instance_id`는 프로세스마다 새로
발급되는 UUID이므로, 이후의 수동 재시작·크래시 재기동 프로세스는 마커의
`instance_id`와 절대 일치하지 않는다. 같은 SHA라도 마찬가지다. 별도의 마커
삭제·rename·소비 장부를 두지 않는다.

`restoreAll()`은 변경하지 않는다. 따라서 복원의 나머지 전제 — 종료 직전 디스크
값이 `auto_advance: true`였고(`autoAdvanceAtShutdown`), 현재 in-memory 값이
OFF이며, 미처리 실패 attempt가 없다 — 는 그대로다. 사용자가 직접 껐던 자동화는
세션 배포가 있어도 되살아나지 않는다.

`beforeReconcile`의 `repo_operations` 후보 동결은 손대지 않는다. 마커 후보는
동결이 필요 없다: 조건 3의 인스턴스 결속이 "이 프로세스를 띄운 배포"를 그
자체로 식별한다.

## 3. 데이터 흐름 (오늘 사례 기준)

1. 세션이 quick_fix를 base에 push하고 `run-repo-ops-deploy.py` 실행.
2. 실행기가 워크트리를 target으로 정렬하고 스크립트 spawn.
3. 스크립트: `npm ci` → `npm run build` → **시작 마커 쓰기** →
   `bdui-shared restart`(기존 서버 사망) → health 폴링.
4. 새 서버 부팅(새 `instance_id` 발급): `ensureLoaded`가 `auto_advance=false`
   강제, persisted true를 `autoAdvanceAtShutdown`에 보관. 첫 reconcile pass에서
   마커는 `result` 부재 → 판정 보류.
5. 스크립트 health readback 성공(고정한 `instance_id`에서 `ok`) → **종료
   마커(`result:"ok"`, 그 `instance_id`) 쓰기** → exit 0.
6. 다음 reconcile pass: 조건 1–4 성립 → `triggered` → `restoreAll()` →
   `auto_advance=true`, 대기 중이던 lane 작업 dispatch 재개.

## 4. 엣지 케이스

| 상황 | 판정 |
| --- | --- |
| 수동 `bdui-shared restart` / 크래시 재부팅 | 새 프로세스의 `instance_id` ≠ 마커 → 후보 아님, OFF 유지 (같은 SHA여도 동일) |
| health 폴링 중 같은 SHA로 수동 재시작·크래시 재기동 | 고정한 `instance_id`와 다른 응답 → 스크립트 `runtime_identity_changed` 실패, `result:"failed"` → OFF |
| restart와 health 확인이 같은 초에 일어남 | 판정이 시간 비교를 쓰지 않으므로 영향 없음 |
| 스크립트가 health 폴링 중 강제 종료 | `result:"ok"` 미도달(trap이 `failed` 기록 또는 시작 마커만 잔존) → OFF |
| health readback 실패 | `result:"failed"` → OFF (실패 처리는 세션 소유) |
| superseded (이미 target이 ancestor) | 실행기가 스크립트 spawn 전에 반환 → 마커 변화 없음 |
| 핀 base가 구 스크립트(마커 미작성) | 마커 없음 → 현행 동작(OFF). 효력은 이 변경이 base에 머지된 뒤의 배포부터 |
| 연속 배포 | 파일 덮어쓰기; 최신 마커만 현재 `source_sha`와 일치 |
| 마커 파일 손상/스키마 불일치 | fail-quiet 건너뛰기 → OFF |
| `runtime_identity` 부재 | 기존 가드로 판정 자체가 보류 → OFF |

## 5. 검증

- `server/worker/auto-advance-restore.session-marker.test.js` (신규, vitest):
  fake `runtime_identity`·fixture 마커로 §2 조건별 복원/비복원 — 성공 복원,
  `result:"failed"`, result 부재(보류 후 후속 pass 복원), `instance_id` 불일치
  (수동 재시작·크래시 시나리오, 같은 SHA), `instance_id` 누락, target_sha
  불일치, 파싱 불가, `restoreAll` 전제(`autoAdvanceAtShutdown` false면 미복원)
  유지. 타임스탬프가 `process_started_at`과 같은 초여도 복원되는 케이스 포함.
- deploy 스크립트 테스트 (기존 `repo-ops-deploy-worktree.integration.test.js`
  패턴): PATH에 stub `bdui-shared`/`npm`을 두고 stub healthz 서버(또는
  `BDUI_DEPLOY_HEALTH_URL`)로 실행해 (a) restart 직전 시작 마커 존재·원자성,
  (b) 성공 경로 종료 마커 `result:"ok"` + 관측한 `instance_id`, (c) health
  실패 경로 `result:"failed"`, (d) 폴링 중 `instance_id`가 바뀌면
  `runtime_identity_changed`로 실패하고 `result:"failed"`를 남김을 검증.
- Pre-Handoff 번들: `npm run tsc`, `npm test`, `npm run lint`,
  `npm run prettier:write`, `npm run build`(번들 포함 — 단, 이 변경은 frontend
  소스를 건드리지 않으므로 번들 diff가 없어야 정상).

## 구현 unit 후보

- script-marker: `repo-ops/script/deploy` 시작/종료 마커 + trap
- restore-consumer: `server/worker/auto-advance-restore.js` 마커 후보 판정 + 테스트
