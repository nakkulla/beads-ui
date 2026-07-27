# worker 재설계 Phase ②: 머지 축 제거·관측 기반 완료 판정·단일 큐·PR 대기 열 (UI-43di)

- 라우트: full_plan · bead: UI-43di · 선행: Phase ① = UI-g8gc(PR #29, squash 902080f7, closed)
- 관통 원칙(재설계 전체): 무인 자동화는 "PR을 머지 가능한 상태로 만들어 두는 것"까지. 머지는 사람의 클릭. 판정은 세션의 자기보고가 아니라 서버의 관측.
- 입력: UI-43di description(2026-07-25 사용자 수렴 설계) + 2026-07-26 코드 실측 인벤토리.

## 배경 (현행 실측)

1. **완료 판정이 세션 자기보고다** — `server/worker/verify.js`의 pr_stop lane은 "bd status=`resolved` AND `metadata.pr_url` 존재"로 성공을 판정한다. 세션이 작업을 다 하고도 bd 기록을 빼먹으면 `verify_failed:bd_not_resolved`로 실패 처리된다(dotfiles-rdwr 실사고 유형).
2. **머지 축이 코드의 큰 표면을 차지한다** — `verify.js` auto_merge lane(merge_sha+closed), `merge-lock-route.js`+handover ledger, `session-tokens.js`(유일 용도가 머지락 인증), `locks.js`의 머지락 계층, `runner/preamble.js`의 `mergeLockProtocol`, `policy.js`의 `merge_policy`/`drift_policy` 축, `breaker.js`, `verify-cmd.js`의 post-merge 실행. 무인 머지가 사라지면 이 표면의 존재 이유가 함께 사라진다.
3. **레인 이원화** — serial/parallel 레인(`queue-store.js`의 `serial`/`parallel` 배열, `scheduler.js`의 `runningInLane`, `lanes.js`의 이동 UI). serial의 존재 이유 절반이 "머지하는 세션은 base에서 직렬화돼야 한다"였다.
4. **워커는 GitHub을 전혀 관측하지 않는다** — `gh` 호출이 서버 어디에도 없다(`runner/session.js`의 `MERGE_RE`는 세션의 머지 시도를 차단하는 정규식 가드일 뿐). Phase ②에서 워커가 처음으로 PR·CI 상태를 읽는다.

## §1 완료 판정 교체 — 서버 관측

- 세션 프로세스가 성공 종료하면 워커가 **`gh`로 해당 attempt의 브랜치(=bead ID)에 열린 PR이 실제 존재하는지 직접 관측**한다(`gh pr list --head <branch>` 상당). 이것이 유일한 성공 판정이다. `verify.js`의 pr_stop/auto_merge 이원 판정은 삭제하고 이 관측 판정으로 교체한다.
- **기록도 워커가 수행한다**: 관측된 PR URL을 `metadata.pr_url`로, status를 `resolved`로 워커가 bd에 기록한다(readback 포함). 세션의 자체 기록은 여전히 계약상 의무지만, 누락 시 워커가 보정하므로 "작업 완료·기록 누락 → 실패" 사고가 구조적으로 소멸한다.
- 성공 시 attempt는 `done`, bead는 **PR 대기 열**(§4)로 이동한다.
- **관측 3-상태 구분(fail-closed)**: `gh` 어댑터의 결과를 success / semantic-empty / error로 구분한다. 성공 종료 + **관측 성공·빈 결과**일 때만 `verify_failed:pr_missing`으로 attempt 실패 처리하고(현행 실패 경로 미러: 배너 + auto_advance OFF), `gh` 조회 오류는 짧은 재시도 후 `verify_failed:gh_observation_failed`로 별도 사유 기록한다 — 조회 실패를 빈 결과로 취급해 `pr_missing`을 오진하지 않는다.
- 세션 preamble의 `PR_STOP_DIRECTIVE`는 정책 조건부 주입이 아니라 **상시 고정 지시문**이 된다: "PR 제출까지 수행하고 절대 머지하지 말 것". `mergeLockProtocol` 블록은 삭제한다. `MERGE_RE` fail-closed 가드(세션의 머지 시도 감지 시 그룹 kill)는 유지하되 **분리한다**: `gh pr merge`와 base(main/master)로의 push는 모든 attempt에서 계속 차단하고, base-into-branch `git merge`(예: `git merge origin/main`)는 **충돌 해소 attempt(§6)에 한해** 허용한다 — 일반 attempt에서는 `git merge`도 현행대로 차단.

## §2 머지 축 연쇄 삭제

삭제 대상(실측 경로):

| 대상 | 처분 |
|---|---|
| `server/worker/verify.js` 이원 판정 | §1 관측 판정으로 교체 |
| `server/worker/merge-lock-route.js` + handover ledger | 삭제, `server/app.js`의 `/api/worker/merge-lock` 마운트 제거 |
| `server/worker/session-tokens.js` 전체 | 삭제(유일 용도가 머지락 인증) |
| `server/worker/locks.js` 머지락 계층(`acquireMerge`, `MergeBlockedError`, `isMergeBlocked` 연동) | 삭제. dup-run·repo topology·service 락은 유지 |
| `server/worker/runner/preamble.js` `mergeLockProtocol` | 삭제. §1의 상시 지시문으로 교체 |
| `server/worker/policy.js` `merge_policy`/`drift_policy` 축(`MERGE_POLICIES`/`DRIFT_POLICIES`/`resolvePolicies`) | 삭제. `resolveExecSettings`(exec 4키)만 남긴다. drift 시 동작은 계약 기본(auto_rereview)으로 고정, `DRIFT_HALT_DIRECTIVE` 삭제 |
| `server/worker/breaker.js` 전체 | 삭제(아래 근거) |
| `verify-cmd.js`의 post-merge 실행(merge_sha 고정 worktree) | 실행 시점을 §5의 pre-merge 게이트로 교체. detect/resolve/run 코어는 유지 |
| queue-store의 `merge_policy`/`drift_policy` 필드·`setPolicy` mutator·ws `worker-queue-set-policy` | 삭제 |
| UI: 컨트롤 바 policy select 2종, 타일의 merge_policy/`demoted_reason` 칩 | 삭제 |

**breaker 삭제 근거**: breaker의 존재 이유는 "오염된 base 위에 후속 attempt가 머지하는 것을 차단"이다. 세션이 base를 건드리지 않으면 실패의 폭발 반경은 자기 워크트리 하나로 줄어든다. 남는 필요(bd 다운 등 시스템 장애 때 큐 전체를 태우지 않기)는 이미 있는 동작 — 실패 시 auto_advance OFF + 실패 배너(최신 failed attempt에서 렌더, breaker 객체 불요) — 로 충분하다. 소비처 정리: scheduler dispatch 가드·`orphan.js`의 trip·`runtime.js` wiring·`attach.js`의 reset·전역 ▶의 breaker 리셋(Phase ① §2.4)·UI breaker 배너가 모두 제거되고, 실패/orphan 시 동작은 "auto_advance OFF + 배너"로 단일화된다. Phase ① §1.3의 "paused 재개는 breaker 미리셋" 규칙은 breaker 소멸로 공허해진다(재개 로직에서 리셋 호출 자체가 사라짐).

**Phase ① 스펙과의 정합**: §2.1(pause)의 "토큰 revoke, 인계 머지락 해제" 단계는 머지 축 소멸로 함께 제거된다. 나머지 pause/stopped/leaf 규칙은 §8 유지 코어다.

## §3 단일 큐 + 슬롯 N

- serial/parallel 레인 이원화를 삭제하고 **단일 대기 열 `queue`**로 통합한다. `done` 레인은 유지한다(§4의 `pr_wait` 신설과 함께 레인은 `queue`/`pr_wait`/`done` 3종).
- 삭제: 레인 이동 UI(`lanes.js`의 lane 구분), lane 판정 코드, `runningInLane`, `PLACEABLE_LANES` 이원화. `place`/`reorder`/`remove`는 단일 리스트 대상으로 단순화한다.
- **슬롯 N**: 동시 실행 상한. `parallel_slots`(하드코딩 2)를 대체하는 `slots` 필드를 queue-store workspace 상태에 신설(`auto_advance` 옆, CAS 가드)하고, ws `worker-queue-set-slots`로 UI에서 조정한다. 기본값 2, 하한 1. **N=1이 곧 기존 serial 의미다** — 겹침이 심한 레포는 N=1로 두면 된다.
- 순서/의존 보장은 기존 메커니즘이 그대로 담당한다: admission 5조건 + bd deps(blocked 항목 skip-to-next, starvation 없음). tickPass는 단일 리스트를 순서대로 스캔하며 빈 슬롯을 채운다.
- 수동 재개(▶)의 cap 초과 허용 + UI 표시(Phase ① §2.3)는 단일 cap 기준으로 유지된다.

## §4 PR 대기 열 — 관측(advisory)

- **레인 `pr_wait` 신설**: §1 성공 판정 시 bead가 `queue`→`pr_wait`로 이동한다(attempt `done` 기록과 같은 단일 mutation). `pr_url`·브랜치명은 attempt/bd 기록에서 얻는다.
- **PR 폴러**: 서버가 `pr_wait`의 열린 PR만 30~60초 주기로 `gh` 조회(state·mergeable·CI 상태·head SHA)하고, 변화를 기존 큐 변경 WS 푸시(`emitQueueChanged`→`worker-queue-snapshot`)에 얹어 배지를 상시 표시한다. `createPoller` 패턴(구독자 있을 때만 동작)을 따르고, `pr_wait`가 비면 조회하지 않는다. 대상이 열린 PR 몇 개라 rate limit 문제없음. 관측 상태는 서버 메모리 캐시(비영속)다.
- **mergeable UNKNOWN 처리**: GitHub은 mergeable을 지연 계산한다 — base 전진 직후 조회는 UNKNOWN을 반환하며 조회 자체가 재계산을 트리거하므로, UNKNOWN이면 짧은 지연 후 재조회한다.
- **외부 머지 관측**: 폴러가 **MERGED만** 머지 후 정리(§6) 대상으로 삼는다([머지] 버튼 경유가 아니어도, 예: 사람이 GitHub에서 직접 머지). **CLOSED-unmerged는 완료가 아니다** — bead를 `pr_wait`에 "PR closed" 상태로 남기고 배너로 사람 처분([재실행] 또는 큐 제거)을 기다린다. 자동 정리·자동 재큐 없음. [재실행]이 수행하는 PR close는 그 전이가 bead를 `pr_wait`에서 원자적으로 제거하므로 폴러의 CLOSED 처리 대상이 아니다.

## §5 머지 게이트 3단 (CI 없는 레포 대응)

| 신호 소스 | 게이트 | 배지 |
|---|---|---|
| GitHub CI 있음 | CI green이어야 [머지] 활성 | CI ✓ |
| CI 없음 + `verify_cmd` 설정 | 워커가 PR 브랜치에서 실행, 통과해야 활성 | 로컬검증 ✓ |
| 둘 다 없음 | 게이트 없음, 버튼 항상 활성 | "검증 신호 없음" |

- 셋째 행이 허용되는 근거: 버튼 클릭 자체가 사람의 결정이므로 무인 머지 때처럼 검증 없는 머지를 구조적으로 금지할 필요가 없다. 무엇을 근거로 누르는지 배지로 정직하게 보여주는 것이 UI의 책임이다.
- `verify_cmd`의 새 역할(축소 유지): **pre-merge, PR head SHA 고정 detached worktree**에서 실행한다(기존 post-merge merge_sha 고정 패턴의 시점 이동). 실행 결과는 **정확한 head SHA에 바인딩해 기록**한다(비영속 캐시). 실행 시점: `pr_wait` 진입 시 + 관측된 head SHA에 green 결과가 없을 때(재시작 후 cache miss, 충돌 해소·브랜치 업데이트로 SHA 전진, [머지] 클릭 재확인에서 새 SHA 발견). **[머지]는 현재 head SHA와 동일한 SHA의 green 결과가 있을 때만 진행한다** — stale SHA의 green은 게이트를 통과시키지 않는다. timeout/비0종료/spawn 실패의 구분 사유 기록은 현행 유지. config 스키마(`[worker.verify."<path>"]`)는 무변경.
- CI 존재 여부는 PR의 check 유무로 관측한다(`gh pr checks` 상당). **관측 오류는 "검증 신호 없음" tier로 강등하지 않는다** — §1의 3-상태 구분대로 게이트 판정 불가 상태([머지] disabled + 오류 배지)로 fail-closed 처리하고, 성공한 빈 조회만 "CI 없음"으로 판정한다. `verify_cmd` 미설정 + CI 없음 조합의 auto_merge 강등(`demoted_reason`) 메커니즘은 머지 축과 함께 소멸한다.

## §6 [머지] 클릭 — authoritative 판정과 충돌 해소

- **클릭 시점 재확인**: 배지를 본 순간과 클릭 사이에 base가 움직일 수 있다(TOCTOU). 표시는 참고(advisory), 클릭 시점의 `gh` 재조회가 판정(authoritative)이다 — admission이 tick 스캔 때 한 번, dispatch 때 pinned base로 한 번 더 검사하는 것과 같은 패턴. 재조회에서 head SHA가 캐시와 다르면 §5 게이트를 그 SHA로 재평가(필요 시 로컬 검증 실행)한 뒤에만 진행한다.
- **분기**:
  - CLEAN → squash 머지 실행.
  - BEHIND → 브랜치 업데이트(GitHub update-branch, base를 브랜치로 머지) → CI/게이트 재확인 → 머지.
  - DIRTY(충돌) → **충돌 해소 세션 자동 디스패치**.
- **충돌 해소 세션**: 그 bead의 기존 워크트리에서 `claude --resume <session_id>`로 원 작업 세션을 되살린다. 프롬프트 요지 = "네 PR이 main과 충돌한다. origin/main을 브랜치에 머지하고, 충돌을 양쪽 의도가 보존되게 해소하고, 테스트를 돌리고, push하라". **rebase가 아니라 merge-into-branch**를 쓴다(rebase는 force-push가 필요한데 push 안전 규칙상 금지; squash 머지하면 중간 머지 커밋은 어차피 사라진다). 해소 후 CI/게이트 재확인 → 배지 green → **머지는 여전히 사람 클릭**. 해소 세션은 실행 중 열에 일반 attempt로 표시되고(resumed_from 연결), 사람 클릭 유래이므로 Phase ① §2.3 수동 재개와 같은 성질로 cap 초과를 허용한다. **가드 예외**: 해소 attempt는 attempt 레코드에 해소 모드로 표시되고, 그 attempt에 한해 `MERGE_RE` 가드가 base-into-branch `git merge`를 허용한다(§1) — `gh pr merge`·base push 차단은 그대로다.
- **자동 해소 OK, 자동 머지 NO**: 해소 직후 자동 머지하면 방금 없앤 auto_merge를 가장 위험한 변경(충돌 해소 직후)에서만 부활시키는 역설이 된다. 클릭 한 번의 비용으로 무인 머지의 위험을 전부 피한다.
- **대안 버튼 [재실행]** — **개정됨: `2026-07-27-worker-discard-button.md`([폐기], 재큐잉·재디스패치 제거)**. 아래 서술은 역사 기록이다. 작은 bead는 충돌을 푸는 것보다 새 base에서 세션을 처음부터 다시 돌리는 게 깨끗하다(Renovate 패턴 — 해소는 두 이력을 꿰매는 것, 재실행은 이력이 하나). **상태 전이를 명시한다**(`resolved` bead는 그대로 queue에 넣어도 dispatch가 not-ready로 건너뛰므로): PR close → bd status를 `open`으로 되돌리고 `metadata.pr_url` 제거(readback 포함) → 기존 워크트리/브랜치 폐기 → bead를 `pr_wait`에서 `queue`로 이동(단일 mutation) → 새 base에서 새 attempt로 재디스패치.
- **머지 후 정리**: bd close·워크트리 제거·원격/로컬 브랜치 삭제·zero-residue 스윕은 **pr-finish 스킬 계약이 canonical 소유자**다. 서버가 수행하되 그 계약의 **순서**를 따른다: squash 머지 → base 동기화 → 레포 요구 post-merge 검증 → linked Beads 스윕(child leaves-first, readback) → parent bd close → 워크트리·원격/로컬 브랜치 정리. 무조건적 즉시 `bd close`가 아니다 — 정리 단계가 실패하면 bead를 `resolved`로 유지한 채 durable 상태 `merged_cleanup_failed`와 배너를 남겨 사람에게 반환한다(자동 재시도 없음). 정리 로직의 이원화를 만들지 않는다.
- UI: PR은 버튼이 아니라 타일의 `#304 ↗` 링크. 행동 버튼은 [머지] 하나(보기와 실행을 같은 급 버튼으로 나란히 두면 오클릭 위험). [재실행]은 보조 동작으로 시각적 급을 낮춘다.

## §7 탭 IA — 4열

```
[▶ 자동 진행] [슬롯: 2] [exec 기본값]              ⚠ 실패 배너(있을 때만)
┌ 대기 ────────┐ ┌ 실행 중 ──────┐ ┌ PR 대기 ─────────┐ ┌ 완료 ┐
│ UI-abc        │ │ UI-def   ⏸ ■ │ │ UI-ghi  #304 ↗   │ │ merged│
│ ✓ admission   │ │ 경과 12:34    │ │ CI ✓ 리뷰 ✓ 최신 │ │       │
│ UI-xyz        │ │ UI-mno ▶(재개)│ │ [머지]           │ │       │
│ ✗ spec 없음   │ │ (일시정지됨)  │ │ UI-pqr 충돌→해소중│ │       │
└───────────────┘ └───────────────┘ └──────────────────┘ └───────┘
```

- 대기: admission 배지 유지(왜 자동 실행이 안 되는지 보여주는 것이 핵심 가치).
- 실행 중: ⏸/■, paused 타일 ▶, transcript 링크 — Phase ① 표면 유지.
- PR 대기: PR 링크 + CI/게이트/base 상태 배지 + [머지](게이트 미충족 시 disabled) + [재실행].
- 완료: merged(정리 완료) — CLOSED-unmerged는 완료가 아니라 `pr_wait` 잔류다(§4).
- 컨트롤 바에서 사라지는 것: merge_policy 토글, drift_policy 토글, verify_cmd 표시줄. 남는 것: ▶/⏸, 슬롯 수(신규 편집 가능), exec 기본값.

## §8 유지 코어 (절대 삭제 금지 — 에러 방지의 실체)

admission 검증기(route·spec_id·spec_review 영수증·도달성·신선도 5조건) · 워크트리 격리 + repo topology 락 · 질문/승인 감지 시 fail-closed 그룹 kill(`MERGE_RE` 포함) · XDG 큐 저장 + 재시작 시 auto_advance 강제 OFF · orphan 감지(PID + 프로세스 시작시각 대조) · 세션 로그 + session_id 캡처 · Phase ①의 pause/stopped/leaf 규칙.

## §9 레거시 마이그레이션

queue.json 로드 시 normalize에서 처리한다(별도 스크립트 없음, Phase ① §3 선례):

- `serial` + `parallel` → 단일 `queue` 병합. 순서는 serial 전체가 앞, parallel이 뒤(serial이 우선 의미였으므로). 레인 내 상대 순서는 보존한다.
- workspace `merge_policy`/`drift_policy` 필드 제거. attempt의 레거시 `merge_policy`/`drift_policy`/`demoted_reason`/`done_kind` 필드는 보존하되 신규 attempt에는 쓰지 않는다(이력 불변 원칙).
- `slots` 부재 시 기본 2.
- 기존 `done` 항목은 `done` 유지 — 과거 pr_stop 완료 bead를 `pr_wait`로 소급 이동하지 않는다(사용자 큐 임의 변경 금지, Phase ① §3 원칙).

## §10 스펙·계약 정합

- 이 스펙은 `2026-07-20-worker-autorun-policy-design.md`의 §2(정책 세팅)·§3(pr_stop 의미론)·§4(post-merge 독립 검증)·§5(verify 재설계·머지락 인계)를 **대체(supersede)**한다. §1(admission)과 §6의 route 편집 표면은 유지된다. 해당 문서 상단에 supersede 표기를 추가한다.
- bd 계약 표면(dotfiles `docs/contracts/workflow.{md,yaml}`)은 변경하지 않는다: `pr_url`·`resolved` 어휘는 기존 그대로이고, 워커의 기록은 세션 의무의 **보정**(fallback)이지 의미 변경이 아니다. 머지 후 정리는 pr-finish 계약을 소비만 한다. 계약 키 부재 관측 시 fail-quiet(AGENTS.md 원칙).
- CI/PR 관측은 `gh` CLI 의존이다: `gh` 부재·미인증 환경에서는 PR 관측이 불가하므로 §1 판정이 실패한다 — dispatch 전 admission에서 `gh auth status` 상당의 가용성 검사를 추가해 fail-closed로 거부한다(사유 `gh_unavailable`).

## §11 수용 기준

1. 세션이 PR을 만들고 bd 기록 없이 종료해도, 워커가 PR을 관측해 `pr_url`/`resolved`를 기록하고 attempt가 `done`, bead가 `pr_wait`로 이동한다.
2. 세션이 성공 종료했고 **관측이 성공했는데** 열린 PR이 없으면 `verify_failed:pr_missing`으로 실패 처리되고 배너가 뜬다. `gh` 조회 오류는 재시도 후 `verify_failed:gh_observation_failed`로 구분 기록되며 `pr_missing`으로 오진되지 않는다.
3. `merge-lock-route.js`·`session-tokens.js`·`breaker.js`·머지락 계층·`mergeLockProtocol`·policy 축이 코드베이스에 존재하지 않고, `/api/worker/merge-lock`이 404다.
4. 세션 실패·orphan 시 auto_advance가 OFF되고 실패 배너가 뜬다(breaker 없이).
5. 단일 큐에서 슬롯 N만큼 동시 디스패치되고, blocked/admission-invalid 항목은 skip돼 starvation이 없다. N=1이면 동시 1(기존 serial 동치).
6. UI에서 슬롯 수를 조정할 수 있고(하한 1), 레거시 serial/parallel queue.json이 순서 보존으로 단일 큐에 병합된다.
7. `pr_wait` 타일에 PR 링크·CI/게이트/base 배지가 표시되고 30~60초 내 최신화된다. UNKNOWN mergeable이 재조회로 해소된다.
8. CI 있는 레포는 CI green 전까지, CI 없는 `verify_cmd` 레포는 **현재 head SHA에 바인딩된** 로컬 검증 green 전까지 [머지]가 disabled고, 둘 다 없으면(성공한 빈 조회 기준) 활성 + "검증 신호 없음" 배지가 뜬다. 관측 오류는 게이트 판정 불가(disabled + 오류 배지)다.
9. [머지] 클릭이 재조회 후 CLEAN→머지 / BEHIND→업데이트→재확인→머지 / DIRTY→해소 세션 디스패치로 분기하고, 재조회에서 head SHA가 변했으면 그 SHA로 게이트를 재평가한 뒤에만 진행한다. 서버 재시작 후에도(캐시 소실) 클릭 경로가 검증을 재실행해 stale green 없이 판정한다.
10. 충돌 해소 세션이 기존 워크트리에서 `--resume`으로 뜨고, merge-into-branch로 해소·push하며, 머지는 수행하지 않는다. 해소 attempt의 `git merge origin/main`은 가드에 kill되지 않는다. 해소 후 게이트 재평가가 일어난다.
11. [재실행]이 PR close 후 bd를 `open`으로 되돌리고 `pr_url`을 제거하며, 워크트리 폐기 후 bead가 `queue`로 이동해 새 base에서 실제로 재디스패치된다.
12. 머지(버튼 또는 외부) 관측 시 pr-finish 계약 순서(base 동기화→post-merge 검증→child 스윕→parent close→cleanup)대로 정리되고 bead가 `done(merged)`로 이동한다. 정리 실패 시 bead는 `resolved` 유지 + `merged_cleanup_failed` 배너로 사람에게 반환된다.
13. 세션의 `gh pr merge`·base push 시도는 모든 attempt에서 fail-closed kill되고, 일반 attempt의 `git merge`도 차단된다.
14. CLOSED-unmerged PR은 완료 처리되지 않는다 — bead가 `pr_wait`에 "PR closed" 상태로 남고 사람 처분을 기다린다.
15. `gh` 불가용 시 dispatch가 `gh_unavailable`로 거부된다.
16. Phase ① 수용 기준(⏸/■/▶·leaf 규칙·재시작 생존)이 단일 큐에서 계속 성립한다(breaker 항목 제외).
17. `npm run all` green — 머지 축 테스트는 삭제로, scheduler/verify 테스트는 관측 판정으로 교체 대응.

## §12 테스트 범위

- **삭제**: `merge-lock-route.test.js`, `session-tokens.test.js`, `breaker.test.js`, `app.merge-lock.test.js`, `session.merge-lock.test.js` 중 락 프로토콜 부분(MERGE_RE 가드 테스트는 유지·이관), `verify.test.js`의 이원 lane, `e2e/worker-squash.test.js`, `locks.test.js`의 머지락 케이스, `policy.test.js`의 merge/drift 해석.
- **교체/수정**: `scheduler.test.js`(단일 큐 슬롯 정책·관측 판정·breaker 부재 실패 경로), `queue-store.test.js`(3레인·slots·레거시 병합 normalize), `verify-cmd.test.js`(pre-merge head 고정), `preamble.test.js`(상시 지시문·락 블록 부재), `attach.test.js`, `runtime.test.js`, `ws.worker-queue.test.js`(set-policy 삭제·set-slots·pr 액션), `e2e/worker-flow.test.js`(dispatch→PR 관측→pr_wait), UI `index.test.js`(4열·컨트롤 바·배지).
- **신규**: PR 관측 판정(3-상태: 존재/성공·빈/오류→`gh_observation_failed`), PR 폴러(UNKNOWN 재조회·MERGED만 정리·CLOSED-unmerged 잔류·구독자 게이팅), 머지 클릭 분기 3종(재조회 mock, SHA 변화 시 게이트 재평가), 충돌 해소 디스패치(resume 경로 재사용, 해소 attempt의 base merge 허용/`gh pr merge` 차단 가드 분기), [재실행] 상태 전이(bd `open` 복귀·`pr_url` 제거·재디스패치), 게이트 3단 판정(head SHA 바인딩·stale green 거부·재시작 cache miss), 머지 후 정리 순서·`merged_cleanup_failed` 실패 경로, `gh_unavailable` admission, 슬롯 편집 CAS.
- `gh` 호출은 어댑터로 격리해 테스트에서 mock한다(실 네트워크 e2e는 비목표).

## 비목표

- 자동 머지의 어떤 형태의 부활(해소 직후 포함).
- stacked PRs 지원(큰 작업은 기존 bead parent/child 분해가 담당).
- GitHub 외 호스팅 지원, GitHub Actions 요건화.
- 과거 done/큐 데이터의 소급 재배치.
- dotfiles workflow 계약 문언 변경.

## 부록 A: 설계 근거 (업계 대응)

- GitHub merge queue / GitLab merge trains / Bors: 개발은 병렬로, 머지 지점만 직렬화한다. serial 레인은 conflict를 해결한 게 아니라 병렬을 금지해 회피한 것.
- 진짜 코드 conflict의 자동 해소는 업계가 하지 않는다. Dependabot/Renovate는 해소 대신 새 base에서 재생성한다 — [재실행] 버튼의 근거.
- 이슈-PR 1:1은 GitHub flow 표준이고 작은 배치의 이점은 DORA 근거가 있다. PR이 작고 수명이 짧을수록 conflict 창이 줄어 병렬 슬롯의 위험도 낮아진다.
- semantic conflict는 mergeable 체크로 못 잡는다. 삭제되는 post-merge verify_cmd가 수제 merge queue 검증이었던 셈이며, 버튼 체제에서는 머지 후 main CI가 그 역할을 한다.
- CI와 verify_cmd는 실행 명령이 같아도 신뢰 경계·시점·주체가 다르다. verify_cmd가 별도로 존재한 유일한 이유는 무인 머지였고, 머지가 전부 사람 버튼이 되면 남는 역할은 CI 없는 레포의 CI 대역뿐이다(§5).

## 부록 B: 작성 시점 확정 결정 (스펙 게이트 리뷰 대상)

1. 레거시 병합 순서 = serial 앞·parallel 뒤, 상대 순서 보존.
2. `slots` 기본값 2(현행 parallel 기본 미러), 하한 1, queue.json 저장 + UI 편집.
3. `pr_wait`는 영속 레인(queue.json), PR 관측 상태(mergeable/CI)는 비영속 메모리 캐시.
4. 충돌 해소 세션은 cap 초과 허용(사람 클릭 유래, Phase ① §2.3 동질).
5. 외부 머지도 폴러 관측으로 동일 정리 수행(§4, MERGED만).
6. `gh` 가용성은 admission에서 fail-closed 검사(§10).

## 부록 C: spec 게이트 리뷰 처분 (codex gpt-5.6-sol xhigh @ 0cbbd550, VERDICT: REVISE, blocking 6)

전건 수용, 단일 배치 수정:

1. `MERGE_RE`가 해소 세션의 `git merge origin/main`을 kill → **수용**: §1/§6 가드 분리(해소 attempt 한정 base-into-branch 허용, `gh pr merge`·base push는 전면 차단).
2. CLOSED를 MERGED와 동일 처리 → **수용**: §4 MERGED만 정리, CLOSED-unmerged는 `pr_wait` 잔류 + 사람 처분, [재실행] close는 폴러 대상 제외.
3. `resolved` bead의 queue 복귀만으로는 재디스패치 불가 → **수용**: §6 [재실행] 상태 전이 명시(bd `open` 복귀·`pr_url` 제거·readback).
4. 무조건 즉시 `bd close`가 pr-finish 계약보다 약함 → **수용**: §6 계약 순서 명시 + 실패 시 `merged_cleanup_failed` durable 상태·배너.
5. 로컬 검증 결과의 SHA 바인딩·재시작/stale 처리 부재 → **수용**: §5 head SHA 바인딩, cache miss·클릭 시 재실행, 동일 SHA green만 통과.
6. `gh` 오류와 의미상 빈 결과 미구분 → **수용**: §1/§5 3-상태 어댑터, 재시도 후 `gh_observation_failed` fail-closed.
