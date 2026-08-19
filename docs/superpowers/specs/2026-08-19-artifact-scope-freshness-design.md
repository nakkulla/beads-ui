---
scope:
  - server/worker/artifact-scope.js
  - server/worker/admission.js
  - server/worker/scheduler.js
  - server/worker/attach.js
  - server/workflow-enrich.js
---

# artifact scope 선언과 admission freshness 코드-범위 확장 설계 (UI-7s3e)

- 작성일: 2026-08-19
- 상태: spec gate REVISE(blocking 6) 전건 반영, controller self-review 완료.
  이후 §7을 enclosed → `dotfiles-g7wz` 분리 disposition으로 개정(사용자 승인,
  계약 정합 `5742fb7a`)
- Bead: `UI-7s3e`
- route: `spec_backed`
- 관련: UI-dlim §3.1 (non-blocking stale 레인), dotfiles `docs/contracts/workflow.{md,yaml}` (계약 표면 소유)

## 1. 문제와 관측

Worker admission의 freshness probe(`server/worker/admission.js`)는
`git log <spec_review_sha>..<base> -- <spec_id>` 하나로 **spec 파일 자체의
변경만** 관측한다. spec이 서술하는 코드가 리뷰 이후 바뀌어도(선행 Bead 머지,
리팩터링) 영수증은 fresh로 판정되고, 재리뷰 지시 없이 구현이 시작된다. spec의
의미적 유효성은 자기 바이트가 아니라 서술 대상 코드에 달려 있으므로 갭이다.

full_plan은 더 넓게 비어 있다: admission은 plan을 아예 보지 않는다. plan
freshness는 표시 측(`workflow-enrich.js planFreshness`)에만 있고 실행 판정에
참여하지 않는다.

기존 사실관계(구현 전제, 코드에서 검증됨):

- `plan_approval` 영수증은 `user@<40hex>`로 **git commit SHA를 담는다**
  (`workflow-enrich.js:41 PLAN_APPROVAL_RECEIPT_RE`). sha256-12 content hash는
  draft 리뷰(`plan_review`) 쪽만이다. 따라서 plan도 `git log <sha>..<base>`
  앵커가 이미 있다.
- `last_checked_sha` metadata 키는 dotfiles 계약이 **freshness cursor**로
  선언해 두었고(계약 README, bd-revert reset 대상에 포함) 현재 소비자가 없는
  dormant 키다. retired `spec_freshness_checked_at_sha`/
  `plan_freshness_checked_at_sha`를 통합한 자리다.
- UI-dlim §3.1 레인: spec 파일 delta는 거부가 아니라 admit + `stale` payload +
  dispatch 프롬프트의 in-session self-review 지시로 처리된다. 이 구조를 그대로
  확장한다.

## 2. 목표와 불변식

- **non-blocking 유지**: scope delta는 어떤 경우에도 admission 거부 사유가
  되지 않는다. 거부 사유 추가는 이 설계의 비범위다.
- **fail-quiet 도입**: scope 선언이 없는 artifact는 현행 파일-자체 probe만
  받는다. 기존 spec/plan은 바이트 하나 바꾸지 않고 현행 동작을 유지한다
  (마이그레이션 없음).
- **probe 실패는 기존 원칙대로 거부**: spec 계열 probe의 git 실패와 모든
  process-level 오류(spawn 127, 예외)는 `git_error`다. 계산할 수 없는 stale
  verdict는 pass가 아니다 (admission.js 기존 원칙 유지). 단 §4.1이 폴백으로
  열거한 plan 판정 호출의 비0 종료는 "plan 미비" 관측이지 probe 실패가 아니다.
- **never forge**: `plan_approval` 부재(fast_track/unattended의 정상 상태)에서
  plan 앵커를 만들어내지 않는다. 세션은 `plan_approval`을 쓰지 않는다 —
  freshness 재확인 결과는 `last_checked_sha` cursor에만 기록한다.
- **계약 소유권**: scope 키 정의·재리뷰 레인 문구는 dotfiles
  `docs/contracts/workflow.{md,yaml}`이 소유한다. beads-ui는 소비자다. dotfiles
  변경은 대상 rig의 quick_fix Bead `dotfiles-g7wz` + foreign `blocks` 의존으로
  분리한다 (§7).

## 3. 선언 포맷 (dotfiles 계약 소유)

spec/plan 마크다운 최상단 YAML front-matter:

```markdown
---
scope:
  - server/worker/admission.js
  - server/worker/
---
```

- 파일 첫 줄이 정확히 `---`일 때만 front-matter로 인식하고, 다음 `---` 줄에서
  닫힌다. 블록 안에서 `scope:` 키의 `- ` 리스트 항목만 읽는다. 다른 키는
  무시한다.
- 항목은 repo-relative 경로 **prefix**(파일 또는 디렉터리). glob 없음 — git
  pathspec에 그대로 전달한다.
- 항목 검증: 선행 `/` 금지, `..` 세그먼트 금지, glob 문자(`*?[]`) 포함 금지,
  **선행 `:` 금지**(git pathspec magic — `:(exclude)` 등 — 차단), 빈 문자열
  금지. 위반 항목은 **개별로 무시**한다(경고 로그) — 남은 유효 항목으로
  probe한다. 유효 항목이 0이면 선언 없음과 동일하다.
- front-matter 부재, 파싱 실패, `scope:` 키 부재는 모두 "선언 없음"이며
  artifact별로 독립이다.

## 4. admission probe 확장 (beads-ui)

### 4.1 probe 규칙

| route | probe 대상 | 앵커 (우선순위) |
| --- | --- | --- |
| `spec_backed` | spec 파일 + spec scope | `last_checked_sha` → `spec_review` 40hex |
| `full_plan` | plan 파일 + **plan scope** | `last_checked_sha` → `plan_approval` 40hex |
| `full_plan` (동시) | spec **파일 자체만** | `last_checked_sha` → `spec_review` 40hex |
| `full_plan` fallback | plan 미비(아래 열거) 시 spec scope로 폴백 | `last_checked_sha` → `spec_review` 40hex |

- **폴백 조건의 완전 열거** — 다음 중 하나라도 성립하면 plan probe 없이
  spec-scope 폴백이다: ① usable `plan_path` 부재(비문자열·빈 값 포함),
  ② `plan_approval` 부재·**malformed**(`user@<40hex>` 파싱 실패)·**unreachable**
  (`rev-parse --verify <sha>^{commit}` 실패), ③ plan 파일이 base에 부재
  (`git cat-file -e <base>:<plan_path>` 비0), ④ 유효 plan scope 항목 0개.
  이들은 전부 **거부가 아니라 폴백**이다 — admission은 오늘 plan을 전혀 보지
  않으므로, 이 설계가 plan 관련 신규 거부 사유를 만들지 않는다는 §2 불변식을
  지킨다. `git_error`는 실제 subprocess 오류(spawn 실패 code 127, 예외 등)에만
  남는다.

근거: plan scope는 spec scope보다 늦게, 더 정밀하게 확정된 선언이고
(`plan_approval`이 시간상 더 늦은 human attestation), spec scope를
`spec_review` 앵커로 계속 probe하면 spec 리뷰와 plan 승인 사이에 낀 커밋을
이중 판정하는 구조적 소음이 생긴다. full_plan에서 spec은 파일 자체 변경(plan
승인 후 spec 내용 수정)만 감시한다.

### 4.2 앵커 해석

- `last_checked_sha`는 40hex 파싱이 성공하고
  `git rev-parse --verify <sha>^{commit}`이 통과하며 **base의 ancestor**
  (`git merge-base --is-ancestor <cursor> <base>`)일 때만 앵커로 쓴다. 셋 중
  하나라도 실패하면 해당 artifact의 영수증 SHA로 폴백한다 (fail-quiet —
  cursor는 관측 보조지 권위가 아니다). ancestor 검사가 없으면 base의
  descendant인 cursor가 `<cursor>..<base>`를 공집합으로 만들어 false-fresh가
  된다.
- cursor가 영수증보다 오래된 비정상 상태는 넓은 범위 probe로 이어질 뿐이므로
  (보수적 오류) 별도 판정하지 않는다.
- **cursor는 기록 시점의 판정 authority에 결속된다**: `route`, `spec_id`,
  `spec_review`, `plan_path`, `plan_approval` 중 하나라도 갱신하는 write는
  같은 논리적 write에서 `last_checked_sha`를 unset한다. spec-폴백 상태에서
  기록된 cursor를 이후 활성화된 `plan_approval` 앵커에 재사용하면 승인 이후
  plan-scope 변경을 건너뛰므로, 폴백→plan-주 probe 전환도 같은 unset 규칙을
  따른다. 이 unset 규칙의 canonical 문구는 dotfiles 계약(§7)이 소유하고,
  writer는 self-review 레인(§5.3)과 영수증 갱신 레인이다. descendant cursor,
  무관 SHA cursor, 폴백 cursor 재사용 각각을 admission 테스트로 고정한다.

### 4.3 git 호출

artifact당 한 호출:

```
git show <base>:<artifact_path>           # scope 파싱용 (artifact 내용)
git --literal-pathspecs log --format=%H --name-only <anchor>..<base> -- <artifact_path> <scope...>
```

- probe 호출은 `--literal-pathspecs`로 실행한다: §3의 항목 검증(입력 위생)과
  별개로, `--` 뒤의 값도 git이 pathspec magic·glob으로 해석하므로 심층 방어가
  필요하다. literal 모드에서도 디렉터리 prefix 매칭은 유지된다. pathspec-magic
  문자열(`:(exclude)server/` 등)이 scope에 들어와도 probe 의미가 바뀌지 않음을
  테스트로 고정한다.

`--name-only` 출력 파싱으로 delta 커밋 목록(`delta_shas`)과 변경 경로
(`changed_paths`)를 한 호출에서 얻는다. `git show`는 해당 artifact의
`cat-file -e` 존재 검사 통과 뒤에만 실행한다 (spec은 기존 검사 재사용, plan은
§4.1 폴백 판정 ③과 같은 호출). 거부/폴백 구분: §4.1이 폴백으로 열거한 plan
판정 호출의 비0 종료만 폴백이고, 그 외 git 비0 종료와 모든 process-level
오류는 `git_error` 거부다 (spec 계열은 기존 원칙 그대로).

### 4.4 구현 배치

- 신규 순수 모듈 `server/worker/artifact-scope.js`: front-matter 최소 파서
  (§3 규칙) + `--name-only` 출력 파서. YAML 의존성 도입 없음. 단위 테스트
  독립.
- `admission.js validateAdmission`: probe 확장. `AdmissionStale` typedef 확장
  (§5.1).
- `attach.js`: bead snapshot 구성(현행 254–325행)과 `validateAdmission` 전달
  (현행 487–502행)에 `plan_path`, `plan_approval`, `last_checked_sha`를
  추가한다 — admission 입력 필드의 실제 소비자·전달자는 `bd-metadata.js`가
  아니라 attach.js다. snapshot→validator 전달을 `attach.test.js`로 검증한다.

## 5. stale payload와 dispatch 프롬프트

### 5.1 payload (additive, 하위호환)

```js
stale: {
  receipt_sha,          // 기존 필드명 유지: spec probe에 실제 사용된 앵커 SHA
                        //   (cursor 채택 시 cursor, 아니면 spec_review 40hex)
  delta_shas,           // 기존: spec delta (spec 쪽 delta가 있을 때만 존재)
  changed_paths?,       // 신규: spec delta가 건드린 경로
  plan?: { receipt_sha, delta_shas, changed_paths }  // 신규: plan 블록 (동일 의미)
}
```

- 기존 top-level 두 필드는 spec 블록으로 유지한다. spec이 fresh고 plan만
  stale이면 top-level은 비우고 `plan` 블록만 채운다 — `stale` 객체의 존재
  자체가 "재리뷰 필요" 신호다.
- queue-store 영속은 additive 필드라 스키마 변경·마이그레이션이 없다.

### 5.2 dispatch 프롬프트 (`scheduler.js staleDispatchPrompt`)

artifact별 블록으로 영수증·delta 커밋·변경 경로를 제시하고, 기존과 같이
"구현에 들어가기 전에 workflow 계약의 재리뷰 레인을 먼저 수행하라"를 지시한다.

### 5.3 self-review 종결 3갈래 (계약 레인, dotfiles 문구 확장)

1. **전제 성립** — artifact 수정 없음: `last_checked_sha=<검사한 base SHA>`를
   `bd update --set-metadata`로 기록하고 readback. 다음 admission부터 cursor가
   앵커가 되어 같은 delta로 반복 발화하지 않는다.
2. **artifact를 고침** (scope 선언 갱신 포함): 기존 계약 레인 그대로 —
   controller self-review 후 해당 영수증(`spec_review`)을 새 SHA로 갱신하고 한
   줄 사유·검증을 남긴다. plan 수정은 `plan_approval`을 기계가 갱신할 수
   없으므로 기존 `plan_approval_stale:revise` 파킹 경로로 넘긴다.
3. **전제 깨짐** (드묾 — main이 승인 설계와 반대로 이동해 사용자 설계 결정이
   필요한 경우): 기존 `spec_review_stale:revise` / `plan_approval_stale:revise`
   파킹. 새 verdict·새 파킹 경로 없음. 이 blocked 파킹은 **사용자 결정 대기
   전용**이다 — staleness 관측만으로 레인 수행 없이 즉시 파킹하는 것은
   금지이고, 대화형 세션은 파킹 대신 그 자리에서 사용자에게 처분을 물으며
   사용자가 명시적으로 미룰 때만 blocked를 쓴다.

이 레인은 Worker 무인 admission만이 아니라 대화형 세션이 구현 진입 전에
staleness를 발견한 경우에도 동일하게 적용된다. staleness의 warning 표면은 기존
체계(Worker stale badge, `last_checked_sha` cursor)를 재사용하고 새 라벨을
만들지 않는다.

## 6. 표시-실행 정합 (`workflow-enrich.js`)

- `planFreshness`(및 spec 계열 freshness 표시)의 앵커를 `last_checked_sha`
  우선으로 정렬한다 — 호출부(planStage 등)에서 유효 cursor가 있으면 영수증
  SHA 대신 전달한다. self-review가 cursor를 쓰면 표시도 fresh로 돌아온다.
- **의도된 비대칭**: 표시 freshness는 파일-자체 probe만 유지하고 scope probe는
  하지 않는다. enrich는 렌더마다 도는 hot path라 front-matter 파싱을 넣지
  않는다. scope 단위 staleness는 Worker stale 관측 badge
  (`spec_review_stale`, stale:true)로만 표면화된다.

## 7. dotfiles unit 분리 (`dotfiles-g7wz`)

계약·템플릿 반영은 dotfiles rig의 quick_fix Bead **`dotfiles-g7wz`**가 소유하고,
이 Bead는 foreign `blocks` 의존으로 그것을 기다린다 (workflow
`references/execution.md` Cross-repo units, 정합 커밋 `5742fb7a`). 설계 SoT는
이 spec이며, `dotfiles-g7wz`는 아래 범위의 실행만 수행하는 닫힌 작업이다:

- `docs/contracts/workflow.yaml`: artifact scope front-matter 키 정의(§3 규칙),
  `last_checked_sha` cursor의 소비 의미와 **authority-변경 시 unset 규칙**
  (§4.2) 명시. `blocked_reason`의 `spec_review_stale:revise` /
  `plan_approval_stale:revise` 값 의미를 사용자-결정-대기 전용으로 한정.
- `docs/contracts/workflow.md`: 재리뷰 레인 문구에 scope probe와 cursor 종결
  3갈래(§5.3)를 반영하고, 이 레인이 대화형 세션의 구현 진입 전 staleness
  발견에도 동일 적용됨과 blocked 파킹의 사용자-결정-대기 전용 한정(관측 즉시
  파킹 금지)을 명시.
- brainstorming spec 템플릿 + plan-authoring 템플릿: front-matter `scope` 블록
  추가.

`dotfiles-g7wz`의 delivery는 그 rig의 quick_fix 절차다: 검증
(`run-tests.sh --tier required` + 계약 checker) → main push →
`repo-ops/script/deploy` 실행·확인(installer + runtime 검증 포함) → `closed`.
그 close가 이 Bead의 `bd ready`를 푼다.

**residue와 라벨**: 의존 readback이 no-PR residue를 운반하므로 이 Bead에는
`worker-ineligible`을 붙이지 않는다. beads-ui 머지 후 배포는 기존 `[deploy]`
절차가 맡는다. 두 Bead의 순서(계약 먼저, 소비자 나중)는 `blocks` 엣지가
강제하므로 별도 절차 문구가 필요 없다.

## 8. 검증

- `artifact-scope` 단위 테스트: front-matter 인식/비인식, 항목 검증(무시
  규칙 — glob·`..`·선행 `/`·선행 `:` magic), `--name-only` 파싱.
- `admission.test.js`: scope 유무별 probe, full_plan plan probe와 §4.1 폴백
  조건 4종 각각, cursor 앵커 3검사(파싱·reachable·ancestor)와 폴백 —
  descendant cursor false-fresh, 무관 SHA cursor, 폴백 cursor 재사용 차단 —
  git error 거부(실제 subprocess 오류만), pathspec-magic 문자열 무해성, payload
  형태(top-level spec + plan 블록).
- `attach.test.js`: snapshot에 `plan_path`/`plan_approval`/`last_checked_sha`
  포함과 `validateAdmission` 전달.
- `workflow-enrich.test.js`: cursor 앵커 반영.
- `scheduler` 프롬프트: artifact별 블록 렌더.
- Pre-Handoff bundle: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` / `npm run build` (+ bundle 산출물 포함).

## 9. 비범위

- scope delta를 이유로 한 admission **거부** 추가.
- 표시 측 scope-단위 staleness 배지 (§6 비대칭 참조).
- `impl_review` freshness (구현 후 게이트는 별도 주제).
- Bead 의존 그래프(선행 Bead 리뷰-후 머지) 기반 트리거 — scope 선언으로
  대체되었고, 필요 시 후속 Bead로 제기한다.
