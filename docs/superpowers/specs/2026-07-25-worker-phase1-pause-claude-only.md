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
- dotfiles `docs/contracts/workflow.yaml`의 `worker_runner` 키 은퇴/enum 축소 — deferred_required, 동반 bead `dotfiles-thcd`.
- merge lock·verify_cmd·admission·orphan 감지 로직 — 무변경. breaker는 **객체·트립 조건 무변경**이되, resume 경로의 리셋 조건만 §1.3에서 좁힌다.

## §1 attempt 상태 머신

```
running → done | failed | orphaned | paused | stopped
paused  → stopped            (leaf paused 타일의 ■)
paused | failed | orphaned → (resume) 새 attempt: running   ※ 원본은 history-only
```
paused·stopped가 신규 상태다.

| 상태 | 진입 | 터미널 | 재개(▶) | 실패 배너 |
|---|---|---|---|---|
| paused | 타일 ⏸ | 아니오 | 가능(leaf만) | 아니오 |
| stopped | 타일 ■ | 예 | 불가 | 아니오 |
| failed / orphaned | 검증 실패·비정상 종료·orphan | 예 | 가능(기존 ↻ 유지) | 예 |

paused/stopped는 `cause`를 쓰지 않는다(상태가 곧 의미). 실패 배너 조건은 `failed|orphaned` 상태 기반으로 교체(cause 검사 제거).

### §1.1 leaf 규칙 (재개된 ancestor 처리)

resume은 새 child attempt를 만들고 ancestor의 상태는 그대로 남으므로, **`resumed_from === A`인 attempt가 존재하면 attempt A는 history-only**로 간주한다. 활성 paused = **leaf paused**(자신을 가리키는 child가 없는 paused)뿐이며, 다음이 전부 leaf 기준이다:

- 타일 렌더링(활성 paused 타일)
- tickPass 디스패치 스킵 대상
- ■(폐기) 대상
- ▶(재개) 대상

history-only attempt는 목록·전사(transcript)에서만 조회되고 어떤 버튼의 대상도 아니다. 이로써 재개 후 낡은 ⏸ 타일이 남거나, 그 타일의 ■가 실행 중인 child의 bead를 레인에서 제거하는 사고를 차단한다.

### §1.2 resume 수용 조건

기존 `resume()`의 수용 상태 `failed|orphaned`에 `paused`를 추가한다. 6종 거부 사유(`not_failed`·`no_session_id`·`worktree_missing`·`bead_running`·`already_resumed`·`runner_unavailable`), `resumed_from` 체인, ancestor 영구 소진(`already_resumed`) 규칙은 무변경. `not_failed` 사유 문자열은 유지하되 판정 대상에 `paused`가 포함된다.

### §1.3 breaker 리셋 조건 (좁힘)

현행 `resume()`은 승인 시 무조건 `breaker.reset(repo)`를 실행한다. 이대로 paused를 수용하면 **병렬 sibling의 진짜 실패로 열린 breaker를 사용자의 일시정지 재개가 지우는** 부작용이 생긴다. 따라서:

- `failed|orphaned` 재개: 기존대로 `breaker.reset(repo)` (↻는 사람의 ▶급 개입).
- `paused` 재개: **breaker를 리셋하지 않는다.** 일시정지는 실패가 아니므로 차단 상태를 해제할 근거가 없다. breaker가 트립된 상태라면 paused 재개도 신규 launch와 동일하게 차단되며, 해제는 전역 ▶가 담당한다.

breaker 객체·트립 조건·`isMergeBlocked` 연동은 변경하지 않는다.

### §1.4 재개 프롬프트 분기

현행 `resumePrompt()`는 항상 "이전 무인 세션이 완료 전에 중단되어 attempt가 실패로 남았다"로 시작한다. paused 재개에 이 문구를 재사용하면 정지 계층 정직화 요구와 모순되므로 prior status에 따라 분기한다:

- `paused`: 중립적 중단 문구("이전 세션이 사용자 요청으로 일시정지되었다")
- `failed|orphaned`: 기존 실패 문구 유지

이후 지시("같은 워크트리에서 이어 진행, 현황 점검, 끝난 단계 반복 금지")는 공통.

## §2 정지 동작

### §2.1 타일 ⏸ (pause, 신규)
1. 그룹 SIGTERM(기존 stop 메커니즘 재사용) → `status:'paused'`, `finished_at` 기록.
2. workflow_mode·exec 스탬프 복구(수동 세션 오염 방지; resume이 재스탬프하므로 대칭), 토큰 revoke, 인계 머지락 해제 — 기존 `stop()`과 동일 순서.
3. 워크트리·세션 로그 보존. bead는 레인 잔류.
4. `tick()` 호출 — `auto_advance` ON이면 빈 슬롯에 다음 bead 자동 전진. **leaf paused attempt를 가진 bead는 tickPass 디스패치 스캔에서 제외**(재개는 타일 ▶만).
5. 가드: attempt에 `session_id`가 캡처되기 전에는 pause 불가 — UI에서 비활성(title로 사유 표시), 서버에서도 거부(fail-closed). 재개 불가능한 pause를 만들지 않는다.

### §2.2 타일 ■ (stop, 변경)
- 현행 kill·revoke·락 해제·복구 로직 유지, 기록만 `status:'stopped'`로.
- **상태 전이와 레인/admission 제거를 하나의 store mutation으로 원자적으로 저장한다.** 두 개의 개별 쓰기(`updateAttempt` + CAS `remove`)로 나누면 CAS 충돌이나 두 쓰기 사이 재시작 시 "stopped인데 레인 잔류"가 생겨 폐기 보장이 깨진다. queue-store에 scheduler-owned 단일 op를 추가해 한 번의 persist로 처리한다.
- 저장 성공 후 `tick()` 호출 — 재디스패치 원천 차단 + 큐 전진. 재실행하려면 후보 목록에서 재추가.
- breaker 무관(현행 유지). leaf paused attempt에도 ■ 허용: 프로세스는 이미 없으므로 상태 전이(`paused → stopped`) + 레인 제거만 같은 단일 mutation으로 수행.

### §2.3 수동 재개와 슬롯 cap
⏸ 후 자동 전진으로 슬롯이 채워진 상태에서 ▶를 누르면 동시 실행이 슬롯 cap(serial 1 / parallel N)을 넘을 수 있다. **수동 재개는 cap 초과를 허용한다** — ▶는 사람의 명시적 개입이고, 기존 ↻ 이어하기도 같은 성질이다(cap 검사 없음). 대신 UI는 cap 초과 상태를 표시해 사용자가 인지하도록 한다. 자동 dispatch(tickPass)는 기존대로 cap을 지킨다.

### §2.4 전역 ▶/⏸
무변경(auto_advance 토글, ▶ 시 breaker 리셋 + tick).

### §2.5 재시작
orphan 스캐너는 `running`만 검사하므로 `paused`는 서버 재시작을 넘어 생존하고 재개 가능(의도된 동작). `stopped`는 터미널 기록으로만 남는다.

## §3 레거시 데이터 마이그레이션

queue.json 로드 시 normalize에서 처리한다(별도 마이그레이션 스크립트 없음):

- `status:'failed'` + `cause:'stopped'` → `status:'stopped'`, `cause` 제거. 과거 사용자 중단이 실패 배너로 계속 뜨는 것을 막는다.
- **레인 상태는 변경하지 않는다.** 소급 레인 제거는 사용자가 만든 큐를 임의로 바꾸는 것이므로 하지 않는다. 레거시 변환으로 stopped가 된 bead가 레인에 남아 있으면 정상 디스패치 대상이며(사용자가 큐에 둔 것이므로 재실행이 올바른 동작), 원치 않으면 UI에서 제거하면 된다. §2.2의 레인 제거는 이 스펙 적용 이후의 ■ 조작에만 적용된다.
- `exec_defaults.worker_runner` 키는 무시·제거.
- codex 카탈로그(`gpt-5.6`/`gpt-5.4`) `orchestration_model` 값은 unset으로 강등(기본값 적용).
- bead 메타데이터 `worker_runner`는 읽지 않는다(bd 데이터는 건드리지 않음).

## §4 claude 단일화

- `runner/index.js`: `RUNNERS → ['claude']`. codex 분기·ccx 분기·`ccx_env` 삭제. `assertRunnerAllowed` + 헬퍼(isFullPlan/planPathOf/hasPlanPath/planReviewEntry/statusOf/resolvePlanFresh) + `RunnerBlockedError` 통삭제(claude 조기 통과로 전량 죽은 코드). `runner/codex.js`(+테스트) 삭제.
- `snapshotBead`의 `plan_fresh` 사전계산(및 `plan_review`/`plan_path` 스냅샷 필드)이 가드 전용 소비였는지 구현 시 재확인 후, 전용이면 함께 제거.
- `exec-enums.js`: `worker_runner` 키 삭제, `RUNNER_MODELS` 테이블 → 단일 `MODELS ['opus','sonnet','haiku','fable']`, `ALL_ORCHESTRATION_MODELS` 대체. `EFFORTS`·`REVIEW_MODELS`·`IMPL_MODELS` 무변경(review_model의 codex 값은 workflow 스킬 소비 통과 키로 유지).
- `policy.js resolveExecSettings`: runner 해석 제거(상수 `claude`), 나머지 4키 해석 유지.
- UI: exec 기본값 편집·detail 패널에서 runner 선택 제거, 모델 옵션 claude 카탈로그만.

## §5 서버·UI 표면

- WS: `worker-attempt-pause` 신규(stop 핸들러 패턴 복제), `worker-attempt-stop`에 원자적 레인 제거+tick 추가, `worker-attempt-resume`은 paused 수용 확장. `/healthz` 무변경.
- 타일 버튼: running = ⏸·■, leaf paused = ▶(재개)·■(폐기). 실패 배너의 ↻ 이어하기는 무변경.
- 배너: `failed|orphaned`만 표시. paused/stopped는 배너를 만들지 않는다.
- 슬롯 cap 초과 상태(§2.3) 표시.

## §6 수용 기준

1. 타일 ⏸ → attempt가 `paused`로 기록되고, 실패 배너가 뜨지 않으며, `auto_advance` ON이면 빈 슬롯에 다음 runnable bead가 자동 시작된다. leaf paused bead는 재디스패치되지 않는다.
2. leaf paused 타일 ▶ → 같은 워크트리에서 `claude --resume <session_id>`로 새 attempt(`resumed_from` 연결)가 시작되고, 재개 프롬프트가 "일시정지" 문구를 쓴다.
3. 타일 ■ → attempt가 `stopped`로 기록되고 bead가 레인에서 제거되며, `auto_advance` ON이면 다음 bead가 자동 시작되고, 같은 bead는 재디스패치되지 않는다.
4. 서버 재시작 후 paused attempt는 orphan 처리되지 않고 재개 가능하다.
5. `RUNNERS`가 `['claude']`이고 codex/ccx 코드 경로·`assertRunnerAllowed`가 존재하지 않는다.
6. session_id 미캡처 attempt에 대한 pause는 UI에서 비활성이고 서버에서 거부된다.
7. 레거시 `failed`+`cause:'stopped'` attempt가 `stopped`로 변환되어 배너에 뜨지 않고, 해당 bead의 레인 배치는 변하지 않는다. 레거시 `worker_runner`/codex 모델 exec 값이 정상 강등된다.
8. 재개된 ancestor paused attempt는 타일에 나타나지 않고 ■/▶ 대상이 아니며, 실행 중인 child attempt가 영향받지 않는다.
9. pause → 다음 bead 자동 dispatch → paused ▶ 재개 시나리오에서 두 세션이 모두 정상 동작하고, cap 초과가 UI에 표시된다.
10. `paused` 재개는 breaker를 리셋하지 않고, `failed|orphaned` 재개는 기존대로 리셋한다.
11. ■의 상태 기록과 레인 제거가 단일 mutation으로 저장되어, 중간 재시작으로 "stopped인데 레인 잔류"가 생기지 않는다.
12. 기존 테스트 스위트(`npm run all`)가 green — codex/ccx 테스트는 삭제로 대응.

## §7 테스트 범위

- scheduler: pause/stop/resume 전이, stop·pause 후 tick 전진, leaf paused-skip 디스패치, session_id 부재 pause 거부, 재시작 후 paused 생존, paused 재개 시 breaker 미리셋 / failed 재개 시 리셋, ancestor history-only 처리, pause→dispatch→resume cap 초과 시나리오.
- queue-store: 신규 상태 normalize, 레거시 `failed`+`cause:'stopped'` 변환(레인 불변), 레거시 exec 값 강등, stopped+레인 제거 단일 mutation의 원자성.
- runner 레지스트리: claude 단일 스폰, 가드 부재.
- UI projection: 배너 조건(상태 기반), 타일 버튼 상태(running/leaf paused, session_id 가드), cap 초과 표시.
- e2e: worker-flow의 stop 경로 갱신(stopped 상태·레인 제거·큐 전진).

## 부록 A: 결정 기록 (2026-07-25, 사용자 확정)

1. ■ 폐기 시 bead는 레인에서 제거(차단 마킹 방식 기각).
2. 신규 상태 `stopped`·`paused` 도입(failed+cause 필터 방식 기각).
3. dotfiles `worker_runner` 계약 정리는 동반 bead로 분리(deferred_required; 크로스 커밋·방치 기각).
4. 타일 ⏸ 후 큐 자동 전진(전진 억제 기각) — 타일 ⏸=세션 단위, 전역 ⏸=큐 단위.

## 부록 B: spec 게이트 리뷰 처분 (codex gpt-5.6-sol xhigh @ 41580b59)

- ①레거시 stopped 마이그레이션 누락 → **조정 수용**: 상태 변환은 §3에 반영, "레인·admission 제거" 권고는 기각(레거시 데이터에 소급 레인 변경을 적용하면 사용자 큐를 임의 변경).
- ②재개된 ancestor paused 투영 → **수용**: §1.1 leaf 규칙.
- ③pause 후 dispatch → resume cap 초과 → **수용**: §2.3에서 수동 재개의 cap 초과를 명시적 허용 정책으로 확정 + UI 표시.
- ④stopped 기록/레인 제거 비원자성 → **수용**: §2.2 단일 mutation.
- ⑤paused 재개의 무조건 breaker 리셋 → **수용**: §1.3 리셋 조건 좁힘.
- ⑥resumePrompt 실패 문구 재사용 → **수용**: §1.4 분기.
