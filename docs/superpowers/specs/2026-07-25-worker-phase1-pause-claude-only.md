# worker 재설계 Phase ①: pause/resume 3버튼·stop 후 tick 재개·claude 단일화 (UI-g8gc)

- 라우트: spec_backed · bead: UI-g8gc
- 관통 원칙(재설계 전체): 무인 자동화는 PR을 머지 가능 상태로 만들기까지, 머지는 사람 클릭, 판정은 세션 자기보고가 아닌 서버 관측. Phase ①은 그 전 단계로 정지 계층과 실행 축을 정리한다.

## 배경

- 사용자 ■ 중단이 `status:'failed'`/`cause:'stopped'`로 기록되어 "세션 실패로 차단" 배너로 표시되는 혼선(2026-07-25 dotfiles nwr8 실측).
- `stop()`이 `tick()`을 호출하지 않아 ■ 후 `auto_advance=true`여도 큐가 정지하는 결함(dotfiles 큐 실측: auto_advance true, running 0, 진행 없음).
- runner 3종(claude/codex/ccx)·교차 호환·full_plan 가드가 실사용(claude 단독) 대비 과잉 표면.

## 목표 / 비-목표

목표: (a) 정지 계층 3버튼 정직화(⏸ 일시정지 ≠ ■ 폐기 ≠ 실패), (b) 정지 후 큐 전진 결함 수정, (c) 실행 축 claude 단일화.

비-목표(범위 밖):
- Phase ②(머지 축 제거·관측 기반 완료 판정·단일 큐/슬롯·PR 대기 열·4열 UI) — deferred, 재진입 조건은 UI-g8gc notes.
- dotfiles `docs/contracts/workflow.yaml`의 `worker_runner` 키 은퇴/enum 축소 — deferred_required, 동반 bead(dotfiles 워크스페이스)로 처리.
- breaker·merge lock·verify_cmd·admission·orphan 감지 — Phase ①에서 **무변경**.

## §1 attempt 상태 머신

`running → done | failed | orphaned | paused | stopped` (paused·stopped 신규)

| 상태 | 진입 | 터미널 | 재개(▶) | 실패 배너 |
|---|---|---|---|---|
| paused | 타일 ⏸ | 아니오 | 가능 | 아니오 |
| stopped | 타일 ■ | 예 | 불가 | 아니오 |
| failed / orphaned | 검증 실패·비정상 종료·orphan | 예 | 가능(기존 ↻ 유지) | 예 |

- `resume()` 수용 조건 `failed|orphaned`에 `paused` 추가. 6종 거부 사유(`not_failed`·`no_session_id`·`worktree_missing`·`bead_running`·`already_resumed`·`runner_unavailable`), `resumed_from` 체인, ancestor 영구 소진 규칙은 무변경.
- paused/stopped는 `cause` 없음(상태가 곧 의미). 실패 배너 조건은 `failed|orphaned` 상태 기반으로 교체(cause 검사 제거).

## §2 정지 동작

### 타일 ⏸ (pause, 신규)
1. 그룹 SIGTERM(기존 stop 메커니즘 재사용) → `status:'paused'`, `finished_at` 기록.
2. workflow_mode·exec 스탬프 복구(수동 세션 오염 방지; resume이 재스탬프하므로 대칭), 토큰 revoke, 인계 머지락 해제 — 기존 `stop()`과 동일 순서.
3. 워크트리·세션 로그 보존. bead는 레인 잔류.
4. `tick()` 호출 — 빈 슬롯에 다음 bead 자동 전진. 단 **paused attempt를 가진 bead는 tickPass 디스패치 스캔에서 제외**(재개는 타일 ▶만).
5. UI 가드: attempt에 `session_id`가 캡처되기 전에는 ⏸ 비활성(title로 사유 표시) — 재개 불가능한 pause 방지. 서버도 session_id 부재 시 pause를 거부(fail-closed).

### 타일 ■ (stop, 변경)
- 현행 kill·revoke·락 해제·복구 로직 유지, 기록만 `status:'stopped'`로.
- bead를 레인에서 제거(`queue-store.remove` 재사용) 후 `tick()` 호출 — 재디스패치 원천 차단 + 큐 전진. 재실행하려면 후보 목록에서 재추가.
- breaker 무관(현행 유지). paused attempt에도 ■ 허용: 레인 제거만 수행하고 `status:'stopped'`로 전이(프로세스는 이미 없음).

### 전역 ▶/⏸
무변경(auto_advance 토글, ▶ 시 breaker 리셋 + tick).

### 재시작
orphan 스캐너는 `running`만 검사하므로 `paused`는 서버 재시작을 넘어 생존하고 재개 가능(의도된 동작). `stopped`는 터미널 기록으로만 남는다.

## §3 claude 단일화

- `runner/index.js`: `RUNNERS → ['claude']`. codex 분기·ccx 분기·`ccx_env` 삭제. `assertRunnerAllowed` + 헬퍼(isFullPlan/planPathOf/hasPlanPath/planReviewEntry/statusOf/resolvePlanFresh) + `RunnerBlockedError` 통삭제(claude 조기 통과로 전량 죽은 코드). `runner/codex.js`(+테스트) 삭제.
- `snapshotBead`의 `plan_fresh` 사전계산(및 `plan_review`/`plan_path` 스냅샷 필드)이 가드 전용 소비였는지 구현 시 재확인 후, 전용이면 함께 제거.
- `exec-enums.js`: `worker_runner` 키 삭제, `RUNNER_MODELS` 테이블 → 단일 `MODELS ['opus','sonnet','haiku','fable']`, `ALL_ORCHESTRATION_MODELS` 대체. `EFFORTS`·`REVIEW_MODELS`·`IMPL_MODELS` 무변경(review_model의 codex 값은 workflow 스킬 소비 통과 키로 유지).
- `policy.js resolveExecSettings`: runner 해석 제거(상수 `claude`), 나머지 4키 해석 유지.
- 레거시 값 처리(normalize): 저장된 `exec_defaults.worker_runner` 무시·제거, codex 카탈로그 `orchestration_model` 값은 unset 강등(기본값 적용), bead 메타데이터 `worker_runner`는 읽지 않음.
- UI: exec 기본값 편집·detail 패널에서 runner 선택 제거, 모델 옵션 claude 카탈로그만.

## §4 서버·UI 표면

- WS: `worker-attempt-pause` 신규(stop 핸들러 패턴 복제), `worker-attempt-stop`에 레인 제거+tick 추가, `worker-attempt-resume`은 paused 수용 확장. `/healthz` 무변경.
- 타일 버튼: running = ⏸·■, paused = ▶(재개)·■(폐기). 실패 배너의 ↻ 이어하기는 무변경.
- 배너: `failed|orphaned`만 표시. paused/stopped는 배너를 만들지 않는다.

## §5 수용 기준

1. 타일 ⏸ → attempt가 `paused`로 기록되고, 실패 배너가 뜨지 않으며, `auto_advance` ON이면 빈 슬롯에 다음 runnable bead가 자동 시작된다. paused bead는 재디스패치되지 않는다.
2. paused 타일 ▶ → 같은 워크트리에서 `claude --resume <session_id>`로 새 attempt(`resumed_from` 연결)가 시작된다.
3. 타일 ■ → attempt가 `stopped`로 기록되고, bead가 레인에서 제거되며, `auto_advance` ON이면 다음 bead가 자동 시작되고, 같은 bead는 재디스패치되지 않는다.
4. 서버 재시작 후 paused attempt는 orphan 처리되지 않고 재개 가능하다.
5. `RUNNERS`가 `['claude']`이고 codex/ccx 코드 경로·`assertRunnerAllowed`가 존재하지 않는다. 레거시 `worker_runner`/codex 모델 값이 있는 queue.json·bead가 정상 normalize된다.
6. session_id 미캡처 attempt에 대한 pause는 UI에서 비활성이고 서버에서 거부된다.
7. 기존 테스트 스위트(`npm run all`)가 green — codex/ccx 테스트는 삭제로 대응.

## §6 테스트 범위

- scheduler: pause/stop/resume 전이, stop·pause 후 tick 전진, paused-skip 디스패치, session_id 부재 pause 거부, 재시작 후 paused 생존.
- queue-store: 신규 상태 normalize, 레거시 exec 값 강등, remove+stopped 조합.
- runner 레지스트리: claude 단일 스폰, 가드 부재.
- UI projection: 배너 조건(상태 기반), 타일 버튼 상태(running/paused, session_id 가드).
- e2e: worker-flow의 stop 경로 갱신(stopped 상태·레인 제거·큐 전진).

## 부록: 결정 기록 (2026-07-25, 사용자 확정)

1. ■ 폐기 시 bead는 레인에서 제거(차단 마킹 방식 기각).
2. 신규 상태 `stopped`·`paused` 도입(failed+cause 필터 방식 기각).
3. dotfiles `worker_runner` 계약 정리는 동반 bead로 분리(deferred_required; 크로스 커밋·방치 기각).
4. 타일 ⏸ 후 큐 자동 전진(전진 억제 기각) — 타일 ⏸=세션 단위, 전역 ⏸=큐 단위.
