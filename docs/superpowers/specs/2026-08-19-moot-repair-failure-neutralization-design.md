# 무의미해진 복구 세션 실패의 무해화와 resume cwd 재검증 설계 (UI-83tq)

- 작성일: 2026-08-19
- 상태: 사용자 설계 승인 완료, spec gate 대기
- Bead: `UI-83tq`
- route: `spec_backed`
- 실측 계기: `UI-k34k` attempt `UI-k34k-1787095976899-1` (2026-08-19)
- 관련: `UI-pmfr`(dispatch 원인 제거), `UI-8vn1`(stale-work 복구 표면)

## 1. 문제와 실측

UI-k34k의 PR #160이 머지된 뒤 배포가 서버를 재시작했고, cleanup 중복 호출의
정상 coalescing 응답 `action_in_flight`가 durable `cleanup_failed`로 오기록됐다.
v2 사다리가 `auto_repair_session`을 소비해 repair 세션을 UI-k34k worktree에
resume으로 투입했는데, 그 사이 진짜 cleanup은 계속 진행되어 몇 초 뒤
`.worktrees/UI-k34k`를 삭제하고 bead를 close했으며 `cleanup_failed` 행도
소비했다. repair 세션은 cwd가 사라져 모든 하위 프로세스 spawn이
`ENOENT: posix_spawn '/bin/sh'`로 실패했고, 한 턴도 돌지 못한 채
(`num_turns=0`, `duration_ms=0`, exit 1, result `subtype=error_during_execution`)
`session_failed:subtype`으로 기록됐다.

그 결과 두 가지가 무너졌다.

1. 고칠 대상이 이미 성공했는데도, 무의미해진 repair 실패 하나가 실패 배너를
   띄우고 `auto_advance=false`로 Worker 전체를 동결시켜 serial lane에서 대기
   중이던 `UI-pmfr`의 dispatch까지 막았다. 해소 수단은 수동 ✕/▶뿐이었다.
2. dispatch 판정 시점의 worktree 존재 확인(`proveOwnedWorktree`,
   `scheduler.js dispatchRepoOperationRepair`)과 실제 프로세스 spawn
   (`relaunchFromAttempt` → `launchSession`) 사이에 `bd.snapshotBead` 같은
   await가 끼어 있어, 그 창(TOCTOU)에서 cleanup의 worktree 삭제와 경합한다.

유령 실패의 **dispatch 자체를 없애는 것**은 `UI-pmfr`의 소유다. 이 설계는
UI-pmfr가 들어와도 구조적으로 남는 잔여 경합 — 정당하게 시작된 복구 세션이
실행되는 동안 대상이 다른 경로(재시작 채택, descendant 성공, 동시 진행 중이던
진짜 cleanup의 완료)로 먼저 성공하는 경우 — 의 무해화만 소유한다.

## 2. 목표와 불변식

- 정당하게 dispatch됐다가 대상이 먼저 성공해 무의미해진 repair 세션 실패는
  Worker를 멈추지 못한다: 실패 사실은 온전히 기록하되 배너를 만들지 않고
  `auto_advance`를 끄지 않는다.
- resume cwd를 쓰는 세션은 spawn 직전에 cwd 생존을 다시 증명한다. cwd가
  사라졌으면, 대상이 이미 완료된 경우 아무 세션도 띄우지 않고, 미완인 경우에만
  의미가 보존되는 경로에서 fresh 세션으로 전환한다.
- 대상이 실제 실패로 남아 있는 모든 경우의 기존 동작 — 배너,
  `auto_advance` off, v2 사다리 의미, `cause`/`cause_detail`/세션 로그 —
  은 바이트 단위로 보존한다.
- 성공 판정은 기존 `repair-session-adapter.judge()`의 "fresh 사실만" 규칙을
  그대로 쓴다. 세션의 자기 보고는 어떤 판정에도 입력되지 않는다.

## 3. 범위와 소유 경계

- workflow 계약 표면(enum, label, metadata 키, status 어휘)은 추가·변경하지
  않는다. v2 사다리의 단(`script_retry → auto_repair_session →
  user_triggered_session`)과 금지 enum(`unbounded_repair_session_retry` 등)의
  의미는 dotfiles `docs/contracts/workflow.{md,yaml}` 소유이며 이 설계는
  건드리지 않는다 — moot 무해화는 실패한 repair의 재dispatch가 아니라 실패
  기록의 표시·후속 효과만 바꾸므로 사다리 밖이다.
- queue lane, UI projection, WebSocket payload 형태는 추가하지 않는다.
- queue-store attempt 레코드에 내부 필드 두 개를 추가한다(§4, §5). 이는
  beads-ui 내부 스키마이며 계약 표면이 아니다. legacy payload에서 부재 시
  `null`/`false`로 정규화되어 fail-quiet로 읽힌다.
- Bead 본문의 "새 durable 상태 없음"은 이 두 내부 필드를 허용하는 것으로
  정밀화한다. 필드 없이는 대상 행이 소비된 뒤(정확히 실측 케이스) attempt가
  repair였다는 사실 자체를 복원할 수 없다.

## 4. attempt → 대상의 durable 결속

현재 repair attempt와 대상 operation의 결속은 행 쪽에만 있다
(`cleanup_failed[bead].repair.attempt_id`,
`repo_operations[op].repair.attempt_id`). 대상이 성공해 행이 소비되면 이
역링크도 사라져, attempt 종료 시점에 "이 attempt는 무엇의 repair였나"를 알 수
없다.

- `dispatchRepoOperationRepair`가 `relaunchFromAttempt` options로
  `repair_operation_id: <operation_id>`를 전달하고, attempt 레코드에 저장한다.
  값은 dispatch packet의 대상 id 그대로(`cleanup:<bead>` 또는 repo operation
  id)이며, 이 경로 밖의 attempt에서는 `null`이다.
- 대상 완료 판정은 기존 `judge({ workspace, operation_id })`를 그대로
  호출한다: `cleanup:` 대상은 `cleanup_failed` 행 부재가 `chain_closed`,
  repo operation 대상은 같은 chain의 `succeeded` 존재가 `chain_closed`다.
  판정 로직을 복제하거나 새로 만들지 않는다.

## 5. Unit 1 — moot 실패의 기록과 자동 dismiss

`onSessionDone`의 실패 분기(현재 무조건 `failAttempt` → 배너 +
`auto_advance=false`)를 다음과 같이 나눈다.

1. `attempt.repair_operation_id`가 없으면 기존 경로 그대로.
2. 있으면 `failAttempt` 직전에 `judge()`를 호출한다.
   - `chain_closed`: **moot 경로**. `failAttempt`와 같은 정리(상태 `failed`,
     `cause` 원문 기록, `workflow_mode` revert, exec stamp revert, claim
     release)를 수행하되, `dismissed_at`을 즉시 채우고
     `setAutoAdvance(false)`를 생략한다. 이어서 `notifyChanged` + `tick`으로
     대기 중인 bead가 같은/다음 tick에 dispatch된다. 배너는 dismiss된 실패를
     그리지 않으므로 아무것도 표시되지 않는다.
   - `session_running` 또는 `unresolved`: 기존 실패 경로 그대로.
3. `verdict.blocked`(loud_fail_blocker)는 대상 성공 여부와 무관하게 moot
   무해화 대상에서 제외한다. blocker는 credential·destructive 등 hard-stop
   class의 표면화이므로 항상 기존 경로로 사람에게 도달해야 한다.

`failAttempt`가 `setAutoAdvance(false)`를 실행하는 경우(비-moot), attempt
patch에 `halted_auto_advance: true`를 함께 기록한다. §6의 복원 판정이 "이
실패가 Worker를 멈춘 당사자"임을 durable하게 식별하는 유일한 근거다. 사용자
⏸는 attempt를 거치지 않으므로 이 플래그를 만들지 않는다.

judge 호출이 던지면(defect) moot 판정을 포기하고 기존 실패 경로로 간다 —
무해화는 최선 노력이고, 실패를 실패로 기록하는 쪽이 fail-closed다.

## 6. 늦은 moot — reconcile의 dismiss와 auto_advance 복원

실패가 기록될 때는 대상이 미완이었지만(정당한 배너), 그 뒤 대상이 다른 경로로
성공하는 경우가 남는다. 기존 주기 실행 지점인
`reconcileRepairsLocked`(repo-operation lock 안)에 한 pass를 추가한다.

- `repair_operation_id`가 있고 `status='failed'`이며 `dismissed_at`이 없는
  attempt마다 `judge()`를 호출해 `chain_closed`면 `dismissed_at`을 채운다.
- 이번 pass의 dismiss로 `halted_auto_advance=true`인 미dismiss 실패가 전부
  소진되고, 다른 미dismiss 실패 attempt가 하나도 남지 않으며, 현재
  `auto_advance=false`일 때만 `setAutoAdvance(true)`로 복원한다. 조건 하나라도
  빠지면 복원하지 않는다.
- 사용자 ⏸로 꺼진 상태는 halting attempt가 존재하지 않으므로 복원 트리거가
  성립하지 않는다.

수용 리스크: 실패가 Worker를 멈춘 뒤 사용자가 별도로 ⏸ 의도를 가진 경우(이미
꺼진 상태에서의 ⏸는 상태 변화가 없어 구분 불가) 복원이 그 의도를 덮을 수
있다. 토글 이력은 durable하지 않고, 빈도가 낮으며, 사용자의 무수동 운영
정책상 진행 재개가 기본값이므로 수용한다(§9-5에서 ⏸ 단독 케이스의 비복원은
검증한다).

## 7. Unit 2 — spawn 직전 cwd 재검증과 폴백 순서

`relaunchFromAttempt`에서 마지막 await 이후, `launchSession` 호출 직전에
재검증한다. `wt_path`가 공유 checkout(`repo` 자체)이면 검증 없이 진행하고,
worktree 경로면 `proveOwnedWorktree()`를 다시 실행한다.

증명 성공이면 기존대로 resume한다. 실패(`worktree_missing` 등)이면:

1. **대상 완료 우선 확인** — 폴더가 사라진 이유가 "작업 완료 후 정리"일 수
   있다. `repair_operation_id`가 있으면 `judge()`로, 그 외 resume 경로면 bead
   snapshot의 terminal 상태(closed)로 확인한다. 완료면 **아무 세션도 띄우지
   않고** `repair_target_resolved` 사유의 spawn 거절로 끝낸다. 레코드 정리는
   기존 spawn 거절 경로(스탬프·workflow_mode revert)의 의미를 그대로 따르며,
   불변식은 세 가지다: 실패 배너가 생기지 않고, `auto_advance`가 꺼지지
   않으며, `running` 레코드가 잔류하지 않는다. `failAttempt`는 부르지 않는다.
2. **repair / disposition 계열**(원래 공유 checkout 실행이 의미 보존인
   종류): resume을 버리고 같은 prompt의 fresh 세션으로 전환한다 —
   `cwd=repo`, `resume_session_id=null`. `dispatchReviseFix`가 이미 정의한
   substitute-session 의미의 재사용이다.
3. **일반 bead 작업 resume**(완료 재개·conflict 등, 작업물이 worktree에 있는
   종류): fresh 전환은 작업 문맥을 잃으므로 하지 않는다. 실패 attempt를
   만들지 않고 `worktree_missing` 사유로 거절만 하고, 후속 판정은 기존
   stale-work/admission 재관측(UI-8vn1 표면)에 맡긴다.

spawn이 시작된 **이후**의 삭제 경합은 이 설계의 범위 밖이다. 그 창에서 죽은
세션은 Unit 1의 moot 무해화가 흡수하고, dispatch 방지는 UI-pmfr가 맡는다.

## 8. 오류·동시성 경계

- 재검증과 판정은 모두 기존 lock 규율 안에서 실행한다: §6 pass는
  repo-operation lock 안, §5·§7은 해당 attempt의 settling/dispatch 직렬화
  구간 안이다. 새 lock을 만들지 않는다.
- `judge()`·`proveOwnedWorktree()`·bd snapshot의 실패는 전부 "무해화 포기,
  기존 경로 유지"다. 이 설계의 어떤 분기도 기존보다 덜 기록하거나 더 많이
  자동 진행하는 쪽으로 fail하지 않는다.
- moot dismiss는 `dismissed_at` 채움과 (해당 시) `setAutoAdvance`가 한
  reconcile pass 안에서 순서대로 실행되며, 중간 재시작 시 다음 pass가 같은
  판정을 멱등하게 재적용한다.
- queue.json 하위 호환: `repair_operation_id` 부재 → `null`,
  `halted_auto_advance` 부재 → `false`로 정규화한다. 이전 서버가 이 필드를
  모른 채 저장해도 소실 이외의 오동작이 없다(소실 시 해당 attempt는 moot
  판정 대상에서 빠질 뿐 기존 동작으로 남는다).

## 9. Test scope

### RED → GREEN seams

1. **moot 실패 즉시 무해화**: repair attempt(`repair_operation_id=cleanup:X`)
   실패 관측 시 `cleanup_failed`에 X 행이 없으면 — attempt는
   `failed`+`cause` 보존+`dismissed_at` 즉시 기록, 실패 배너 projection 없음,
   `auto_advance` true 유지, 같은/다음 tick에서 serial lane 대기 bead가
   dispatch된다. (RED: 현재는 배너 + `auto_advance=false`)
2. **진짜 실패 회귀**: 같은 실패에서 행이 남아 있으면(`unresolved`) 기존
   경로 — 배너, `auto_advance=false`, attempt에 `halted_auto_advance=true`.
3. **blocker 제외**: `verdict.blocked` 실패는 대상이 `chain_closed`여도 기존
   실패 경로다.
4. **늦은 moot reconcile**: 배너가 뜬 뒤 행이 소비되면 다음 reconcile pass가
   `dismissed_at`을 채우고, 그 실패가 유일한 halting 실패였으면
   `auto_advance`를 복원한다. 다른 미dismiss 실패가 남아 있으면 복원하지
   않는다.
5. **사용자 ⏸ 비복원**: halting attempt 없이 `auto_advance=false`인 상태는
   reconcile가 복원하지 않는다.
6. **spawn 직전 재검증 — 완료 케이스**: dispatch 판정 통과 후 spawn 전에
   worktree가 삭제되고 대상이 완료된 재현에서 세션이 기동되지 않고 실패
   attempt·배너가 생기지 않는다.
7. **spawn 직전 재검증 — 미완 케이스**: 같은 삭제 재현에서 대상이 미완이면
   repair/disposition은 `cwd=repo`의 fresh 세션으로 기동되고, 일반 bead
   resume은 실패 attempt 없이 `worktree_missing`으로 거절된다.
8. **정상 resume 회귀**: worktree가 살아 있으면 원본 cwd에서 `--resume`이
   그대로 실행된다.
9. **legacy payload round-trip**: 두 신규 필드가 없는 queue.json이
   `null`/`false`로 읽히고 저장 round-trip에서 보존된다.

### 회귀 보존

- `failAttempt`의 기존 소비자(수동 dismiss, ↻ 이어하기 자격, discard 표면)와
  v2 사다리 stage 기록이 비-moot 경로에서 변하지 않는다.
- `judge()`의 기존 소비자(`reconcileRepairsLocked`의 repair 해제)가 그대로
  동작한다.

## 10. 적용·배포와 live 검증

- 서버 전용 변경이다. frontend 소스와 `app/main.bundle.js`는 변경하지 않으며,
  PR에서 번들 diff 부재를 확인한다.
- Pre-handoff: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` 모두 exit 0.
- 머지 후 `repo-ops/config.toml` `[deploy]` 선언에 따라 배포 operation의
  terminal success와 프로세스 경로·포트·HTTP 응답 검증까지 마쳐야 완료다
  (`.worktrees/.repo-ops-deploy`에서 머지 SHA로 기동 확인).

## 11. 수용 기준

1. §9-1 재현(이번 실측과 동형)이 사용자 개입 없이 흡수된다: 배너 없음,
   `auto_advance` 유지, 대기 bead dispatch.
2. §9-6/7 재현에서 무의미한 세션이 기동되지 않고, 필요한 경우에만 fresh
   전환되며, 어느 쪽도 Worker를 멈추지 않는다.
3. 진짜 실패·blocker·정상 resume·사용자 ⏸의 기존 동작이 전부 보존된다
   (§9-2, 3, 5, 8, 회귀 보존).
4. 실패 정보(`cause`, `cause_detail`, raw 코드, 세션 로그 경로)는 moot
   경로에서도 전부 기록된다.
5. Pre-handoff 검증과 §10의 배포·runtime 검증을 통과한다.

## 12. 제외 범위

- `action_in_flight` 오기록의 제거와 cleanup 재시작 채택 — `UI-pmfr` 소유.
- v2 사다리 단·예산·금지 enum의 의미 변경 — dotfiles 계약 소유.
- spawn 시작 이후 삭제 경합의 프로세스 수준 방어(예: cwd fd 고정).
- stale-work 잔재의 분류·복구 표면 — `UI-8vn1`/`UI-kt5d` 소유.
- `session_failed:subtype` 같은 raw 토큰의 한국어 문장 추가(표시 개선 별건).

## 13. 실행 단위와 route

두 unit은 같은 실측 사고의 두 결함을 고치고 같은 파일 무리
(`scheduler.js`, `repair-session-adapter.js`, `repo-operation-coordinator.js`,
`queue-store.js`)를 공유하므로 한 owner가 한 worktree에서 연속 구현해 하나의
PR로 운반한다. route는 `spec_backed`이며, 이 spec이 판정 규칙·순서·실패
의미를 고정하므로 별도 plan은 두지 않는다.
