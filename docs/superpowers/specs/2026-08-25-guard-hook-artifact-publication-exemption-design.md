---
scope:
  - server/worker/guard-hook.js
  - server/worker/guard-hook.test.js
  - server/worker/guard-hook.integration.test.js
  - server/worker/base-drift.js
  - server/worker/base-drift.test.js
---

# Worker guard hook의 docs 전용 base push 예외 — artifact 게시가 Worker 안에서 완결되도록

- Bead: UI-7ufi
- Route: spec_backed
- 코드 인용 base: beads-ui `origin/main` = `c81d6579971237c41374cfced68e7ba425fee414`
- 선행 스펙: `docs/superpowers/specs/2026-07-30-guard-enforcement-layer-replacement-design.md`
  (UI-8mvc, 예방 층 §2·검출 층 §3). 이 문서는 그 §2의 "이 두 조건 밖은 전부 통과"를
  예외 1종으로 개정한다. 구 문서는 역사 기록으로 두고 수정하지 않는다.
- dotfiles 계약 앵커(식별 문구): `workflow-contract.md` "Write-time SHA for
  `spec_review` … is copied from the `contained_sha` in `land-reviewed-artifact.py`
  output", "Artifact staleness enters a re-review lane … Applies when Worker unattended
  admission … detects staleness"; `workflow-state.yaml` `plan_path` 형식
  `bead-workspace-relative ^docs/(?:[^/]+/)*[^/]+\.md$`.

## 1. 문제

Worker의 per-attempt `pre-push` hook(`server/worker/guard-hook.js`
`renderHookScript`)은 attempt 자기 repo에서 `remote_ref == refs/heads/<target_base>`인
push를 예외 없이 `exit 1`로 거부한다. 한편 dotfiles workflow 계약은 spec/plan
artifact의 게시 수단을 `land-reviewed-artifact.py` 하나로 고정하고, 그 스크립트는
detached candidate를 `git push <remote> <candidate>:refs/heads/<base>`로 base에 직접
push한다(`land-reviewed-artifact.py` `land_reviewed_artifact`, push 단계). 계약은 또
artifact-staleness 재리뷰 레인이 Worker unattended admission에도 적용되고 correction
결과가 `spec_review`를 새 `contained_sha`로 갱신한다고 명시한다.

두 규칙이 충돌해 Worker에서는 correction 결과가 구조적으로 도달 불가능하다. 실사고:
`Analysis-446e` attempt `Analysis-446e-1787619773722-1`(2026-08-25)이 재리뷰 레인에서
전제 파손을 판정하고 spec rev2를 작성·자기 리뷰까지 마쳤으나 게시가
`{"result":"external_failure","stage":"push"}`(guard 메시지 `refusing push to
refs/heads/main …`)로 실패해 `spec_review_stale:revise`로 파킹됐다. Worker가 리뷰한
spec은 사람이 개입하기 전까지 절대 개정·반영되지 않는다.

사용자 결정(2026-08-25): A안 — guard hook에 구조 예외를 추가하고 dotfiles 계약은
변경하지 않는다. 예외 폭은 land 스크립트의 커밋 모양이 아니라 **결과 트리**
기준(`docs/` 전용 fast-forward)으로 관대하게 잡는다.

## 2. 설계

### §2.1 예외 술어 — hook 내부, git 사실만 사용

`renderHookScript`가 생성하는 `/bin/sh` 스크립트의 2단계 루프에서, `remote_ref`가
`guard_ref`와 일치하는 줄에 대해 다음을 **전부** 만족하면 통과(status 유지), 하나라도
불성립이면 기존과 같이 `status=1`:

1. `local_oid`가 all-zero가 아니다 — 삭제 push는 예외 대상이 아니다(사유 `deletion`).
2. `remote_oid`가 all-zero가 아니다 — base ref가 원격에 이미 존재해야 한다. 신규 ref
   생성은 예외 대상이 아니다(사유 `new_ref`).
3. fast-forward — `git merge-base --is-ancestor "$remote_oid" "$local_oid"`가 0으로
   종료한다(사유 `not_fast_forward`). git 클라이언트는 non-ff로 판정한 ref를
   `pre-push` hook에 넘기지 않고 먼저 거부하므로(`transport.c`, `REF_STATUS_REJECT_*`
   ref는 hook 입력에서 제외) 실제 push에서는 이 조건이 발동할 일이 없다. 그래도
   두는 이유는 아래 4의 diff 기준점이 원격 tip의 조상 관계에 있음을 hook 스스로
   보장해, git의 동작 변화나 `--force` 조합에 판정이 기대지 않게 하기 위해서다.
4. **docs 전용 델타** — `git diff --name-only "$remote_oid" "$local_oid"`의 출력이
   비어 있지 않고, 모든 줄이 `docs/` 접두사로 시작한다(사유 `paths`). 파일 수·커밋
   수·merge 커밋 여부·파일 종류(`.md`, `assets/` 이미지 등)·추가/수정/삭제는 묻지
   않는다. 출력이 비어 있으면(트리 동일) 통과 조건 4를 만족하지 못한 것으로 본다 —
   게시할 것이 없는 push는 land 스크립트가 만들지 않는다.
   - git이 특수 문자 경로를 따옴표로 감싸 출력하면(`"docs/…"`) 첫 글자가 `"`라
     접두사 검사에 실패하므로 거부된다. 의도된 fail-closed다(`core.quotePath`를 끄지
     않는다).
5. 위 git 명령 중 하나라도 비정상 종료(0/1 외 종료 코드, 또는 실행 불가)하면 예외
   불성립이다(사유 `git_error`). `merge-base --is-ancestor`의 종료 1은 "조상 아님"이라는
   정답이지 오류가 아니다.

판정 순서는 1→5이며 첫 불성립 사유 하나만 보고한다. 환경변수·allowlist 파일·주석 등
세션이 바꿀 수 있는 입력은 판정에 쓰지 않는다 — 판정 재료는 stdin의 oid와 git 출력뿐이다.

경계 결정: `docs/` 접두사는 계약이 artifact 경로에 허용하는 `docs/**`와 같은 디렉터리
경계다. `*.md` 확장자 기준으로 넓히면 루트 `AGENTS.md`·`README.md` 같은 정책 파일이
PR 없이 열리므로 채택하지 않는다. `docs/` 아래 정책 문서가 PR 없이 base에 들어갈 수
있다는 점은 수용한 트레이드오프이며, push log의 `exempt` 기록이 사후 추적을 담보한다.

### §2.2 메시지

- 통과: stderr 한 줄 `bdui guard: passing docs-only push to <remote_ref> in <mine>
  (attempt <id>, <n> path(s))`. `land-reviewed-artifact.py`가 push stderr를 결과에 싣지
  않으므로 성공 경로에 노이즈를 더하지 않지만, 대화형 실행자에게는 예외가 적용됐다는
  사실이 보인다.
- 거부: 기존 메시지 `bdui guard: refusing push to … must not land on its own base
  (local ref: …)`는 **바이트 그대로** 유지하고(기존 테스트·외부 로그 파서 보존), 바로
  다음 줄에 `bdui guard: docs-only exemption not met: <deletion|new_ref|not_fast_forward|paths|git_error>`를
  덧붙인다. `paths` 사유에는 첫 번째 위반 경로 하나를 `(<path>)`로 함께 적는다.

### §2.3 push log 기록

UI-1xcd §4.1의 불변식 "모든 줄이 거부 여부와 무관하게 기록된다"는 유지한다. 예외
통과 줄은 `{"local_ref":…,"local_oid":…,"remote_oid":…,"remote_ref":…,"exempt":"docs_only"}`로
기록해야 하므로 base 줄에 한해 순서가 "판정 → 기록"이 된다. 판정은 읽기 전용 git
명령뿐이라 부작용이 없고, 기록 실패는 기존처럼 삼켜 push 결과에 영향을 주지 않는다.
비-base 줄과 거부된 base 줄의 기록 형식은 불변(`exempt` 키 없음).

### §2.4 검출 층 정합 — `base-drift.js`

현행 `basePushedOids`는 base 목적지 항목의 `local_oid`를 전부 착지 후보로 모으고,
관측 tip에서 도달 가능하면 `violation: true, via: 'direct_push'`로 attempt를
실패시킨다. 예외 통과 push는 정의상 base에 착지하므로 이 판정에 그대로 걸린다 —
정합하지 않으면 예방 층이 통과시킨 게시를 검출 층이 위반으로 되돌려 attempt가
`base_landing_detected`로 죽는다.

- `basePushedOids`는 `entry.exempt === 'docs_only'`인 항목을 착지 후보에서 제외한다.
  다른 값의 `exempt`(미지의 문자열)는 예외로 인정하지 않고 종전대로 후보에 넣는다 —
  기록 형식의 확장은 hook과 검출 층이 같은 값을 알 때만 유효하다.
- 제외한 oid는 `BaseDriftRecord.artifact_pushed: string[]`로 별도 보존한다(중복 제거,
  기록 순서). 기록은 base가 움직였고 push log를 읽은 경우에만 채우며, 예외 항목이
  없으면 키를 쓰지 않는다(부재 = 관측이 거기까지 가지 않았거나 해당 없음, 기존
  관용구와 동일).
- 도달 가능성 검사는 비-exempt 후보에만 수행한다. exempt oid만 있고 base가 움직인
  경우의 record는 `{ pinned, observed, landed: false, pushed: [], artifact_pushed: [...] }`.
- `violation` 판정 논리·`via: 'direct_push'`·관측 실패 처리·scope 제외
  (`disposition`/`quickfix_lane`/`no_base_oid`)는 모두 불변.

### §2.5 불변 항목

- 텍스트 가드 `server/worker/runner/command-guard.js`의 `git_push_base`는 이미
  `'warn'`이라 변경하지 않는다. `session-monitor.js`, `scheduler.js`의 hook 설치·env
  배선(`install`/`envFor`), disposition attempt 미설치 규칙, `--no-verify` 미탐 한계
  전부 불변.
- `land-reviewed-artifact.py`와 dotfiles 계약은 손대지 않는다. 이 스펙 구현 후
  Worker attempt 안의 `land-reviewed-artifact.py` 게시는 단일 커밋·단일 md·ff 형태이므로
  §2.1을 자명하게 만족한다.

## 3. 오류 처리

- hook 안의 어떤 실패도 "통과"로 기울지 않는다: 판정 재료를 얻지 못하면 base push는
  종전대로 거부된다(§2.1-5).
- 통과 판정 뒤 push 자체가 실패(원격 거부, 네트워크)하면 land 스크립트의 기존
  `external_failure` 경로가 그대로 작동한다. hook은 기록만 남긴다.
- `base-drift.js`에서 `exempt` 키가 문자열이 아니거나 값이 `docs_only`가 아니면
  비-exempt로 취급한다(§2.4).

## 4. 테스트

**`guard-hook.integration.test.js`** — 기존 fixture(임시 repo + bare remote + 워크트리
+ 타 repo)를 재사용하고, land 스크립트 모양(detached 워크트리에서 커밋 후 repo 루트에서
`<sha>:refs/heads/<base>` push)을 헬퍼로 만든다.

| # | 케이스 | 기대 |
| --- | --- | --- |
| 1 | `docs/superpowers/specs/x.md` 추가 1커밋을 `<sha>:refs/heads/<base>`로 push | 통과, 원격 base 이동, log 항목에 `exempt: 'docs_only'` |
| 2 | 기존 `docs/…/x.md` 수정 | 통과 |
| 3 | `docs/a.md`·`docs/superpowers/specs/assets/b.png` 2커밋 ff | 통과 (다중 커밋·비-md 허용) |
| 4 | `docs/…/x.md` 삭제 커밋 | 통과 (문서 삭제 허용) |
| 5 | `docs/…/x.md` + `server/x.js` 한 커밋 | 거부, 둘째 줄 `paths (server/x.js)` |
| 6 | `server/x.js`만 | 거부 `paths` |
| 7 | 루트 `README.md`만 | 거부 `paths` — 확장자 기준이 아님을 고정 |
| 8 | base 삭제 push | 거부 `deletion` (기존 케이스 유지 + 사유 줄) |
| 9 | 원격에 없는 base 이름으로 신규 ref 생성 | 거부 `new_ref` |
| 10 | 원격 tip이 앞서간 뒤 구 tip 위 docs 커밋 push (non-ff) | git이 hook 전에 거부, 원격 불변, log 항목 없음 — hook 입력에 오지 않음을 고정 |
| 10b | `--force`로 같은 push | hook 입력에 오며 `not_fast_forward`로 거부(사유 줄), 원격 불변 |
| 11 | 비-base 브랜치로 코드 push | 통과, `exempt` 키 없음 (불변) |
| 12 | 타 repo에서 docs push | 통과·기록 없음 (cross-repo 불변) |

기존 케이스(거부 메시지 정규식, main checkout 경로, node 자식, `--no-verify` 한계,
기록 순서)는 그대로 통과해야 한다.

**`guard-hook.test.js`** — 렌더된 스크립트에 `docs/` 접두사 판정·`merge-base
--is-ancestor`·`exempt` 기록 문자열이 포함되는지, `renderHookScript`의 리터럴 quoting이
유지되는지.

**`base-drift.test.js`** (fake git + 주입 seam):

| # | 케이스 | 기대 |
| --- | --- | --- |
| 1 | base 이동, log에 `exempt: 'docs_only'` 항목만, oid 도달 가능 | `violation: false`, `artifact_pushed: [oid]`, `pushed: []`, `landed: false` |
| 2 | exempt 항목 + 비-exempt 착지 항목 혼재 | `violation: true`, `shas`는 비-exempt oid만, `artifact_pushed`에 exempt oid |
| 3 | `exempt: 'something_else'` | 종전대로 착지 후보 → 도달 가능하면 위반 |
| 4 | exempt 항목만 있고 도달 가능성 seam 호출 없음 | `git` fake가 `merge-base`를 호출받지 않음 |

## 5. 완료 조건

1. §4 신규 케이스 전부와 기존 guard/base-drift/session 관련 테스트 통과(`npm test`),
   `npm run tsc`·`npm run lint`·`npm run prettier:write` 청결. 프런트엔드 변경이 없으므로
   `app/main.bundle.js`는 불변이어야 한다(`npm run build` 후 diff 없음 확인).
2. PR 머지 후 `repo-ops/config.toml` `[deploy]`에 따라 공유 서버 배포가 terminal
   success에 도달하고 프로세스 경로·포트·HTTP 검증 통과.
3. 후속 실증(이 Bead 범위 밖, 기록만): 배포 후 `Analysis-446e`를 Worker로 재개하면
   rev2 게시가 `contained`로 끝나야 한다. 실패하면 `discovered-from: UI-7ufi`로 후속.

## 6. 비목표

- dotfiles 계약·`land-reviewed-artifact.py`·`sync-target-base-checkout.py` 변경.
- 텍스트 가드·session-monitor·scheduler 배선 변경.
- `--no-verify` 우회, GitHub 브랜치 보호 등 2026-07-30 스펙 §5 잔여 위험의 재검토.
- 2026-07-30 스펙 문서 본문 수정(역사 기록으로 보존, 이 문서가 §2를 개정한다고 선언).

## 구현 unit 후보

단일 unit — `guard:server/worker/guard-hook.js+guard-hook.test.js+guard-hook.integration.test.js`
+ `drift:server/worker/base-drift.js+base-drift.test.js`. 파일 비중복이지만 `exempt`
값 문자열을 양쪽이 공유하므로 한 위임으로 묶는다.
