# Worker 자동실행 정책 — 진입 가드·머지/drift 정책 세팅·pr_stop·독립 검증·verify squash 정합

- 날짜: 2026-07-20
- 라우트: full_plan (예상 — 독립 단위 3+, 계약 소비 표면 변경)
- 의존: dotfiles `docs/superpowers/specs/2026-07-20-route-pin-mandate-design.md` (route 핀 의무 계약 — 이 spec의 가드·편집이 그 키를 소비). 병행 가능하나 계약 문언 확정이 선행 권장.
- 근거 기록: 2026-07-20 세션 설계 논의 — 업계 사례 조사(에이전트 PR 전달·merge queue·graduated-trust auto-merge)와 현행 코드 판독(scheduler/verify/locks/preamble) 합의 결과.

## 배경 / 문제 (현행 실측)

1. **dispatch가 spec·route를 전혀 검사하지 않는다** — `scheduler.js dispatch()`의 검사는 ready/blocked·러너 가드·breaker뿐. spec 없는 bead도 큐에 넣으면 fast_track 세션이 spec 작성→AI 리뷰→구현→머지까지 무인 완주한다(사람 의도 앵커 부재).
2. **정책 세팅 부재** — `workflow_mode=fast_track`이 무조건 stamp되고(scheduler.js:373), 머지를 PR에서 멈출 메커니즘이 구조적으로 없다(`verify.js` `DONE_STATUS='closed'` 하드코딩, pr-stop 필드 부재).
3. **verify ancestry vs squash 충돌(잠복 결함)** — dotfiles `finishing.md`는 direct·PR 두 경로 모두 **squash 머지**를 강제한다. squash 결과 커밋은 작업 브랜치 tip과 ancestry가 끊기므로 `verify.js:107-111`의 `merge-base --is-ancestor <work_tip> <base_tip>`는 계약 준수 머지에서 통과 불가. 첫 실전 auto-merge에서 `verify_failed:work_not_in_base`로 breaker가 내려간다.
4. **독립 실행 검증 부재** — 머지 전 품질 권위가 세션 자기보고(required verification)+AI diff 리뷰뿐. worker의 verify는 머지 여부·bd status readback만 하고 테스트를 재실행하지 않는다.
5. **UI: 추론=확정 혼동·편집 불가** — `deriveRoute` fallback이 확정값처럼 표시되고, route·정책 메타데이터를 편집할 mutation이 없다(edit-text 5필드+status/priority/label뿐).

## 설계

### 1. 큐 진입·dispatch 가드 (자동실행 admission)

기준: **route 핀 존재 + `spec_id` 존재 + `spec_review` 영수증 존재·fresh** — 공통 **fail-closed admission validator** 하나로 구현하고 큐 진입·dispatch 양쪽이 재사용한다. 어느 검사든 실패 또는 **명령 오류면 거부**(fail-quiet 금지).

validator 검사 항목(기준 커밋 `<base>`를 인자로 받음):
1. `metadata.route`가 enum(`spec_backed`|`full_plan`)에 속한다.
2. `spec_id` 경로가 `<base>`에서 git에 추적된 실존 파일이다(`git cat-file -e <base>:<spec_id>`) — 실존하지 않는 spec_id가 빈 변경 로그로 통과하는 구멍 차단.
3. `spec_review` 영수증이 `<reviewer>@<full-40-hex>` 또는 `skipped@<full-40-hex>` 형식이고 SHA가 repo에서 도달 가능하다. `skipped@`도 admission으로 인정한다(스킵은 계약상 명시적 사용자 진행 권한이므로) — freshness 규칙은 동일 적용.
4. freshness: `git log <receipt-sha>..<base> -- <spec_id>`가 **성공적으로 실행되고** 출력이 비어 있다.

- **큐 진입 시**(`worker-queue-place`): 현재 base tip 기준으로 validator 실행, 미충족이면 거부 + 구체 사유 응답(`invalid_route` / `spec_missing` / `receipt_missing_or_malformed` / `receipt_unreachable` / `spec_review_stale` / `git_error`). UI는 후보 카드에 사유 뱃지 표시.
- **dispatch 시 재검사**: worktree 생성 후 확정된 `base_oid`를 `<base>`로 validator 재실행(검사 후 base 전진 TOCTOU 차단). 실패 시 claim 해제 + 생성 worktree 정리 + 큐 항목에 사유 표시(자동 제거 없음). **tick 선택은 admission-invalid 항목을 skip하고 같은 tick에서 다음 후보를 계속 채운다**(기존 skip-blocked-head와 동일) — 거부 항목이 head를 점유해 serial 후속·parallel capacity를 굶기지 않도록.
- 기존 러너 가드 유지: `plan_path` 없는 full_plan bead는 claude 러너 한정.
- spec-less bead의 "spec 작성 전용 run" 타입은 **비목표**(2026-07-20 사용자 결정: 차단만).

### 2. 정책 세팅 2종 + 해석 순서

| 키 | 값 | 기본값 | 의미 |
|---|---|---|---|
| `merge_policy` | `auto_merge` \| `pr_stop` | `auto_merge` | 세션 종착점: 머지 완주 vs PR 생성 후 정지 |
| `drift_policy` | `auto_rereview` \| `halt` | `auto_rereview` | 런 중 material spec drift 시: spec 갱신+자동 재리뷰 지속 vs attempt 실패로 사람 반환 |

- 해석 순서(계약 `mode_resolution_order` 패턴 미러): **bead metadata > workspace 전역 > 기본값**.
- workspace 전역: queue-store에 신규 필드(`auto_advance` 옆), Worker 탭 설정 UI 토글, CAS 가드.
- dispatch 시 **해석된 최종값을 attempt 레코드에 스냅샷**(감사 추적)하고 preamble로 세션에 전달:
  - `merge_policy=pr_stop`: "PR 생성·CI 확인·bead `resolved` 기록까지 수행하고 머지하지 말고 종료하라" 지시문. 머지 락 프로토콜 블록은 pr_stop 시 미주입.
  - `drift_policy=halt`: "material spec drift 판정 시 작업을 중단하고 실패로 종료하라" 지시문. `auto_rereview`는 계약 기본 동작이므로 지시문 없음.
- 기본값 근거(2026-07-20 사용자 결정): 독립 검증(§4)이 머지 게이트를 담보하므로 전 lane auto_merge 기본, pr_stop은 opt-in.

### 3. pr_stop lane 의미론

- **성공 판정 이원화**: `verify.verifyMerge`를 정책 인지형으로 확장 — `auto_merge`는 현행(+§5 재설계) 유지, `pr_stop`은 **bd status `resolved` + `pr_url` metadata 존재**를 성공으로 판정(merge_sha·closed 검사 생략). 성공 시 attempt `done(pr_stop)` 구분 표기, 큐에서 done lane으로 이동.
- **workflow_mode 처리**: pr_stop 성공 시 `workflow_mode`를 pre-launch 값으로 revert한다(후속 사람 세션이 fast_track을 상속하지 않도록). auto_merge 성공 시 미revert(현행 유지, 07-15 spec §5.2).
- **serial 체인 합성**: 신규 메커니즘 불요 — 후속 의존 bead는 bd 의존성으로 blocked이며 scheduler의 기존 skip-blocked-head 로직이 자연 대기시킨다. 사람이 `pr-finish`로 머지→bead closed→의존 해소→큐 재개.
- 07-12 구설계의 `pr_review_wait` 타이머(5분 자동 재개)는 부활하지 않는다 — pr_stop은 무기한 사람 대기가 의도.

### 4. worker 독립 검증 (머지 후 base 검증)

- workspace별 `verify_cmd` 신설. 저장 위치는 **서버 측 설정 파일**(bdui config) — worker가 실행하는 임의 커맨드이므로 UI 편집 표면(queue-store/mutation)에 두지 않는다. UI는 읽기 전용 표시만.
- **설정 스키마**: 정규화된 workspace 절대경로를 키로, `verify_cmd = ["argv0", "arg1", ...]` **argv 배열**(shell 문자열 금지, shell 미경유 spawn) + 선택 `verify_timeout_ms`(기본값 spec 구현 plan에서 확정, 예 600000). timeout 초과·비0 종료·spawn 실패는 각각 구분된 실패 사유(`verify_cmd_timeout`/`verify_cmd_failed`/`verify_cmd_spawn_error`)로 attempt에 기록.
- **toolchain 제약**: 실행 cwd는 검증 worktree이지만 clean worktree에는 미추적 toolchain(`.venv` 등)이 없다. `verify_cmd`는 자체 완결이거나 canonical checkout의 toolchain 절대경로를 사용하도록 구성해야 하며(예: beads-ui `["npm","run","all"]`은 자체 완결; dotfiles류는 canonical checkout의 인터프리터 경로 사용), config에 이 제약을 주석으로 명시한다.
- **실행 시점: post-merge, auto_merge lane 전용** — §5 성공 경로에서 worker가 **기록된 `merge_sha`에 고정한 detached clean 임시 worktree**(가변 base tip 아님)에서 `verify_cmd`를 실행하고 종료 후 worktree를 정리한다. pr_stop lane은 머지가 없으므로 실행하지 않는다(머지 시점 검증은 사람의 `pr-finish` 경로 소유).
- **검증 중 머지 차단**: §5의 락 인계 시맨틱에 따라 post-merge 검증이 끝날 때까지 merge lock을 worker가 보유한다 — 검증 도중 다음 attempt가 오염 가능 base에 머지하는 것을 구조적으로 차단. 통과 시 Done. 실패 시 위 스키마의 구분 사유(`verify_cmd_timeout`/`verify_cmd_failed`/`verify_cmd_spawn_error`)로 attempt 실패 처리하되 **breaker trip을 먼저** 수행한 뒤 락을 해제하고(해당 repo 후속 dispatch·머지 차단) `auto_advance`를 끈다 — 오염 base 위 후속 실행을 구조적으로 차단하고 사람에게 반환(revert는 사람/`bd-revert` 소유).
- pre-merge(머지 락 발급 조건화) 대안은 기각: 락 API 안에 장시간 검증을 태우면 세션 curl 대기·timeout 설계가 필요해 복잡도 대비 이득이 없고, post-merge+breaker로 동일한 오염 차단을 얻는다.
- **`verify_cmd` 미설정 workspace**: auto_merge lane 불가 — 해석 결과가 auto_merge라도 dispatch 시 `pr_stop`으로 강등하고 attempt에 강등 사유 기록. (독립 검증 없는 무인 머지를 구조적으로 금지.)
- 검증 실행은 worker 프로세스 소유(세션이 조작 불가한 독립 검증) — 이 spec의 핵심 안전 장치.

### 5. verify 재설계 — squash 정합·서버 관측 merge_sha·락 인계

- **merge_sha는 서버 관측값** — 세션 제공 SHA를 머지 증거로 신뢰하지 않는다(임의의 기존 base ancestor 위조 가능). 서버는 acquire 시 base tip을 직접 읽어 기록하고, release 시 base tip을 다시 직접 읽어 (a) acquire 시점 tip에서 **전진했고**(머지 발생), (b) 세션이 주장한 40-hex가 있으면 그것과 일치함을 확인한 뒤, **서버가 읽은 tip을 attempt의 `merge_sha`로 기록**한다. 미전진·불일치는 release 실패 + attempt 실패 사유 기록. 락 보유 중에는 이 세션만 머지 가능하므로 tip 전진 = 이 attempt의 머지다.
- **token 바인딩**: worker token을 `(repo, target_base, attempt_id)`에 바인딩 — 현행(repo, bead_id)의 target_base 미결속을 함께 봉합.
- **락 인계(handover)**: release 호출은 락을 즉시 풀지 않고 merge_sha 기록 + 락 소유를 worker로 인계한다. worker가 §4 post-merge 검증 완료 후 해제하며, 실패 시 breaker trip → 해제 순서. `acquireMerge`는 대기 waiter가 깨어난 직후 breaker를 **재검사**해 tripped면 423으로 거부한다(선대기 waiter의 오염 base 머지 차단).
- **성공 판정(auto_merge)**: 서버 관측 `merge_sha` 기록 존재 + bd `closed`. 작업 브랜치 tip ancestry 검사는 제거 — merge_sha는 정의상 release 시점 base tip이므로 별도 ancestry 검사가 불필요하고, squash 비정합(§배경 3)이 해소된다.
- fail-closed 유지: 세션이 락을 잡지 않고 종료(머지 미수행)하면 기존대로 `bd_not_closed`. SHA는 40-hex 형식 강제(bd metadata hex 강제변환 전례).
- preamble 프로토콜 블록 문구 갱신: release가 검증 인계를 시작하며 세션은 락 해제 완료를 기다리지 않고 종료해도 됨을 명시.

### 6. UI

- **route 칩 명시/추론 구분**: `metadata.route` 부재 시 추론값을 시각 구분(흐린 칩 + `?` 접미). `deriveRoute` fallback 로직 자체는 유지(계약 default 미러).
- **상세 패널 metadata 편집**: `route`·`merge_policy`·`drift_policy` enum select mutation 신설(CAS, bd metadata 쓰기+readback). full_plan→spec_backed 전환 시 경고 문구(저장된 plan 포기·마커 정리는 세션 계약 소유 — UI는 metadata만 변경).
- **Worker 탭 전역 설정**: `merge_policy`·`drift_policy` 워크스페이스 토글 + `verify_cmd` 읽기 전용 표시(편집은 서버 설정 파일만, §4).
- **큐 진입 거부·강등 사유 표시**: 후보/큐 카드 뱃지.

## 인수 기준

1. spec-less·route-미핀·stale-spec bead는 큐 진입이 거부되고 사유가 표시된다.
2. `merge_policy`/`drift_policy`가 bead>전역>기본 순서로 해석되어 attempt에 스냅샷되고 preamble에 반영된다.
3. pr_stop bead는 PR 생성+`resolved`에서 성공 판정되고, 의존 bead는 사람 머지 전까지 대기, 무관 bead는 계속 흐른다.
4. squash 머지 완료 런이 `merge_sha` 기반 verify를 통과한다(현행 work_tip 검사로는 불가능한 케이스).
5. `verify_cmd` 실패 시 attempt 실패+breaker trip으로 해당 repo 후속 dispatch가 차단된다.
6. `verify_cmd` 미설정 workspace의 auto_merge 해석이 pr_stop으로 강등된다.
7. UI에서 route 추론/명시가 구분 표시되고, route·정책 metadata가 편집된다.
8. `npm run all` 통과 + 신규 focused 테스트(가드·해석·verify 이원화·merge_sha·강등·mutation).
9. admission validator가 fail-closed다: 실존하지 않는 `spec_id`, git 명령 오류, 형식 불량·미도달 영수증이 각각 구분 사유로 거부된다.
10. admission-invalid 항목이 serial head에 있어도 같은 tick에서 다음 후보가 선택된다(starvation 없음).
11. 세션이 위조 SHA로 release해도(미전진·불일치) 실패 처리되고, post-merge 검증이 끝나기 전에는 다른 attempt가 merge lock을 획득하지 못한다.
12. `verify_cmd` timeout·비0 종료·spawn 실패가 구분 사유로 attempt에 기록된다.

## 비목표

- spec-run 타입(spec 작성 전용 run) 신설.
- GitHub Actions 등 플랫폼 CI 요건화(독립 검증은 worker 로컬 실행으로 충족).
- freshness cursor·drift 판정 메커니즘 자체 변경(세션 계약 소유 — 여기서는 정책 분기 전달만).
- `pr_review_wait` 타이머 부활, 큐 자동 재정렬 정책 변경.
- dotfiles 계약 문언 변경(별도 spec 소유).

## 검증

`npm run all` + 신규 focused 테스트. verify 재설계(§5)는 squash 머지 픽스처(fixture repo에서 실제 `merge --squash` 커밋)로 현행 검사 실패·신규 검사 통과를 모두 재현한다.
