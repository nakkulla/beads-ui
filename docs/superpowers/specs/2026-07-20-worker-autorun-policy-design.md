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

기준: **route 핀 존재 + `spec_id` 존재 + `spec_review` 영수증 존재·fresh**.

- fresh 판정은 스테퍼 stale 규칙 재사용: 영수증 SHA 이후 spec 문서 경로에 커밋이 없어야 함(`git log <receipt-sha>..HEAD -- <spec_id>` empty). worker 프로세스가 repo에서 직접 실행.
- **큐 진입 시**(`worker-queue-place`): 기준 미충족이면 거부 + 구체 사유 응답(`missing_route` / `missing_spec` / `spec_review_missing` / `spec_review_stale`). UI는 후보 카드에 사유 뱃지 표시.
- **dispatch 시 재검사**: 진입 후 상태가 변할 수 있으므로 dispatch에서 동일 검사 재실행, 실패 시 claim 해제 + 큐 항목에 사유 표시(자동 제거는 하지 않음).
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

- **성공 판정 이원화**: `verify.verifyMerge`를 정책 인지형으로 확장 — `auto_merge`는 현행(+§5 재설계) 유지, `pr_stop`은 **bd status `resolved` + `pr_url` metadata 존재**를 성공으로 판정(ancestry·closed 검사 생략). 성공 시 attempt `done(pr_stop)` 구분 표기, 큐에서 done lane으로 이동.
- **workflow_mode 처리**: pr_stop 성공 시 `workflow_mode`를 pre-launch 값으로 revert한다(후속 사람 세션이 fast_track을 상속하지 않도록). auto_merge 성공 시 미revert(현행 유지, 07-15 spec §5.2).
- **serial 체인 합성**: 신규 메커니즘 불요 — 후속 의존 bead는 bd 의존성으로 blocked이며 scheduler의 기존 skip-blocked-head 로직이 자연 대기시킨다. 사람이 `pr-finish`로 머지→bead closed→의존 해소→큐 재개.
- 07-12 구설계의 `pr_review_wait` 타이머(5분 자동 재개)는 부활하지 않는다 — pr_stop은 무기한 사람 대기가 의도.

### 4. worker 독립 검증 (머지 후 base 검증)

- workspace별 `verify_cmd` 신설(예: beads-ui `npm run all`, dotfiles `.venv/bin/python -m pytest`). 저장 위치는 **서버 측 설정 파일**(bdui config) — worker가 실행하는 임의 커맨드이므로 UI 편집 표면(queue-store/mutation)에 두지 않는다. UI는 읽기 전용 표시만.
- **실행 시점: post-merge, auto_merge lane 전용** — `verifyMerge` 성공 경로(§5 ancestry+closed 통과 후)에서 worker가 base tip의 **clean 임시 worktree**에서 `verify_cmd`를 실행. pr_stop lane은 머지가 없으므로 실행하지 않는다(머지 시점 검증은 사람의 `pr-finish` 경로 소유). 통과 시 Done, 실패 시 `verify_failed:verify_cmd`로 attempt 실패+breaker trip(해당 repo 후속 dispatch·머지 차단)+`auto_advance` off — 오염 base 위 후속 실행을 구조적으로 차단하고 사람에게 반환(revert는 사람/`bd-revert` 소유).
- pre-merge(머지 락 발급 조건화) 대안은 기각: 락 API 안에 장시간 검증을 태우면 세션 curl 대기·timeout 설계가 필요해 복잡도 대비 이득이 없고, post-merge+breaker로 동일한 오염 차단을 얻는다.
- **`verify_cmd` 미설정 workspace**: auto_merge lane 불가 — 해석 결과가 auto_merge라도 dispatch 시 `pr_stop`으로 강등하고 attempt에 강등 사유 기록. (독립 검증 없는 무인 머지를 구조적으로 금지.)
- 검증 실행은 worker 프로세스 소유(세션이 조작 불가한 독립 검증) — 이 spec의 핵심 안전 장치.

### 5. verify 재설계 — squash 정합

- **merge-lock release payload에 `merge_sha` 필수화**: 세션은 머지 후 release 호출에 `{"merge_sha": "<squash 커밋 40-hex>"}`를 포함(preamble 프로토콜 블록 문구 갱신). 서버는 release 시 attempt에 기록.
- **ancestry 검사 대상 교체**: `merge-base --is-ancestor <merge_sha> <base_tip>`(동일 커밋 포함) + bd `closed`. 작업 브랜치 tip 검사는 제거.
- fail-closed 유지: release에 merge_sha 부재·비정형(40-hex 아님)·base에 미포함이면 `verify_failed`. 세션이 락을 잡지 않고 종료(머지 미수행)하면 기존대로 `bd_not_closed`.
- 짧은 hex의 숫자 강제변환 위험이 있으므로 40자 전체 SHA 문자열만 수락(bd metadata hex 강제변환 전례).

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

## 비목표

- spec-run 타입(spec 작성 전용 run) 신설.
- GitHub Actions 등 플랫폼 CI 요건화(독립 검증은 worker 로컬 실행으로 충족).
- freshness cursor·drift 판정 메커니즘 자체 변경(세션 계약 소유 — 여기서는 정책 분기 전달만).
- `pr_review_wait` 타이머 부활, 큐 자동 재정렬 정책 변경.
- dotfiles 계약 문언 변경(별도 spec 소유).

## 검증

`npm run all` + 신규 focused 테스트. verify 재설계(§5)는 squash 머지 픽스처(fixture repo에서 실제 `merge --squash` 커밋)로 현행 검사 실패·신규 검사 통과를 모두 재현한다.
