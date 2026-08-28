---
scope:
  - server/worker/scheduler.js
  - server/worker/quickfix-landing.js
  - app/utils/
  - app/views/worker/
---

# quick_fix 착지 재개를 커서가 아니라 실패 사유로 판정

Bead: UI-8h1x · 2026-08-28

## 1. 문제

Worker가 디스패치한 quick_fix의 착지 정산(`createQuickfixLanding.settle`)이 실패하면
그 행은 `[이어하기]` 말고는 치울 조작이 없다. 그런데 그 클릭이 무엇을 하는지는
`server/worker/scheduler.js`의 `quickfix_cleanup_resume` 한 조건이 정한다.

```js
const quickfix_cleanup_resume =
  prior.status === 'failed' &&
  prior.quickfix_lane === true &&
  typeof prior.quickfix_landing?.reason === 'string' &&
  prior.quickfix_landing.reason.length > 0 &&
  (prior.quickfix_landing.cursor === 'branch_cleanup' ||
    prior.quickfix_landing.cursor === 'parent_close');
```

참이면 같은 attempt의 정산을 다시 돌리고(`settleQuickfixLanding`), 거짓이면 새 attempt를
민 뒤 **세션을 다시 띄운다**. 착지가 이미 끝난 행에서 세션 재실행은 할 일이 없는 세션이고,
`[폐기]`는 `discard-coordinator`의 `parent_reset`이 Bead를 `open`으로 되돌리며
`pr_url`·`impl_review`·`last_checked_sha`를 지운다(2026-08-28 실사고). 즉 앞 두 커서에서
실패한 행에는 **안전한 출구가 없다.**

### 1.1 커서로는 갈리지 않는다

`base_containment` 커서에는 성격이 정반대인 두 실패가 섞여 있다.

- `push_not_contained` — 착지가 정말 안 됐다. 세션이 할 일이 남아 있다.
- `containment_unobservable` — 착지 여부를 관측하지 못했을 뿐이다. 세션은 할 일이 없다.

반대로 지금 정산 재실행을 허용하는 `branch_cleanup`·`parent_close` 커서의 사유
(`worktree_remove_failed`·`bd_close_failed` 등)는 전부 후자다. **현재의 커서 기준은 사유
기준의 근사치**였고, foreign 착지에서 그 근사가 깨졌다.

### 1.2 관측 (큐 기록 전수, 2026-07~08)

착지 실패 8건 중 커서가 남은 3건이 모두 이 공백에 걸린다.

| attempt | 커서 | 사유 | 성격 |
| --- | --- | --- | --- |
| `dotfiles-prrw-1787896614177-1` | `base_containment` | `containment_unobservable` | foreign(UI-jf33이 원인 해소) · 폐기 눌러 사고 난 행 |
| `dotfiles-fq42-1787910960134-1` | `base_containment` | `containment_unobservable` | foreign(원인 해소) · **행이 아직 남아 있다** |
| `dotfiles-pio7-1787795442613-1` | `repo_operations` | `remote_history_not_monotonic` | **foreign 무관** · 배포 단계에서 막힘 |

`pio7`이 보여주듯 이 공백은 foreign 원인이 사라져도 남는다. `containment_unobservable`
토큰 자체도 fetch가 일시적으로 실패하면 나온다. 커서가 `None`인 나머지 5건
(`not_resolved`·`head_mismatch`·`premature_close`)은 정산이 시작되기도 전에 실패한 행이다.
이 설계는 커서를 판정에서 완전히 빼므로 그 행들도 사유로 갈리며, 세 사유가 모두 세션 성격이라
관측된 5건의 동작은 바뀌지 않는다(§3.1).

### 1.3 원 설계와의 간극

`docs/superpowers/specs/2026-08-19-worker-quickfix-lane-design.md`는 "실패 기록·`[정리]`
재개·restart reconciliation은 기존 체계 그대로"라고 적었다. 그러나 `[정리]`는 머지 큐의
`cleanup_failed` 행 전용이고 quick_fix 실패 행에는 붙지 않는다. 실제 구현은 `[이어하기]`의
커서 분기로 갔고, 그 분기가 두 커서만 인정한다. 이 설계는 그 간극을 사유 기준으로 메운다.

## 2. 목표

1. 착지 정산 도중 실패한 행을, Bead 상태를 되돌리지 않고 정산 단계부터 다시 태워 마감할 수 있다.
2. 그 판정을 커서가 아니라 **실패 사유**가 한다 — 커서는 판정에서 완전히 빠진다.
3. 그 판정이 옳으려면 사유가 실제 원인을 가리켜야 하므로, 읽기 장애를 영수증 형식 오류로
   기록하던 갈래를 함께 고친다(§3.1.1).
4. 사용자가 누르기 전에 무엇이 일어날지 버튼 라벨·`aria-label`·`title`로 안다.

범위 밖: `[폐기]`의 `parent_reset` 파괴성 자체, `quickFixLanded`의 착지 증명 판정(§3.1.2), 새
자동화(ADR 0005 — 재진입은 사람 클릭뿐).

## 3. 설계

### 3.1 판정 소유 — `app/utils/quickfix-resume-kind.js` (신설)

무의존 leaf 하나를 새로 만들고 함수 하나를 export한다. 이 함수는 실패 사유 문자열만 읽으며
커서·워크트리·세션 ID를 보지 않는다.

```js
/**
 * @param {{ reason: string|null }|null|undefined} quickfix_landing
 * @returns {'settlement'|'session'}
 */
export function resumeKindOf(quickfix_landing)
```

`app/utils/failure-sentences.js`가 선례다 — 서버(`scheduler.js`)와 클라이언트
(`running-grid.js`·`lane-model.js`·`index.js`)가 **같은 한 벌**을 읽어야 하는데, 클라이언트
모듈은 `lanes.js`를 통해 lit-html을 끌고 오므로 서버가 그 파일을 읽을 수 없다. 그래서 공유
데이터는 무의존 leaf에 둔다. 소비자가 넷이라는 사실 자체가 이 판정이 한 곳에 있어야 하는
이유다 — 커서 목록이 지금 `scheduler.js`와 `lanes.js` 두 곳에 서로 다른 내용으로 흩어져 있는
것이 그 반례다(§3.1.2).

실패 토큰 자체는 dotfiles 계약이 정의하지만, **어떤 실패가 정산 재실행으로 풀리는가는 Worker
내부 판단이라 beads-ui가 소유한다.** ADR 0012(계약은 코드 field registry로 복제해 소비)와,
UI-jf33이 `workflow-state.yaml enclosed_foreign_landing.worker_judgment`에 "judgment owner is
beads-ui"로 적은 것과 같은 선이다. 이 설계는 dotfiles 계약을 바꾸지 않는다.

#### 판정: `session`을 열거하고 나머지는 `settlement`

**열거하는 쪽은 `session`이다.** 정산 계열 사유의 어휘는 열려 있다 — `settle`은 배포 실패를
`deployed.code || 'repo_operation_failed'`, `evidence.code || 'repo_operation_failed'`로 저장하고,
그 `code`는 `repo-operation-coordinator.js`가 만든 문자열(`remote_history_not_monotonic`,
`repo_ops_ancestry_check_failed`, `repo_ops_worktree_align_failed`,
`repo_operation_timeout_unresolved` 등 20종 이상)이 그대로 흘러온 것이라
`QuickfixLandingReason` union에도 없다. 실제 행 `dotfiles-pio7-1787795442613-1`이 바로 그
`remote_history_not_monotonic`이다. 정산 계열을 열거하는 판정표는 새 coordinator 코드가 생길
때마다 같은 결함을 다시 만든다.

반대로 **세션이 필요한 사유는 `quickfix-landing.js`가 직접 쓰는 닫힌 소수**다.

| `session` 사유 | 근거 |
| --- | --- |
| `push_not_contained` | 착지가 정말 안 됐다 — 세션이 다시 밀어야 한다 |
| `invalid_impl_review` | 영수증 형식이 틀렸다(읽기 실패는 §3.1.1로 분리) |
| `delivery_unproven:*` (접두) | push 기록·영수증 결속이 증명되지 않았다 |
| `premature_close` | Worker close 기록 없이 Bead가 닫혔다 — 사람의 판단이 필요하다 |
| `head_mismatch` | 커서의 head와 영수증 SHA가 어긋난다 |
| `foreign_deploy_unsupported` | 대상 저장소 배포는 push한 세션이 소유한다(UI-jf33) |

그 밖의 모든 사유는 `settlement`이다. 대표값과 근거:

| `settlement` 사유(예) | 근거 |
| --- | --- |
| `containment_unobservable` | fetch/판정 실패. 다시 관측하면 통과할 수 있다 |
| `foreign_checkout_unavailable` · `foreign_landing_unpinned:*` | 핀·체크아웃을 고친 뒤 재개하면 통과 |
| `repo_ops_config_invalid` · `repo_operation_failed` · `repo_operation_pending` | 배포 판정·실행 실패 |
| `remote_history_not_monotonic` 등 coordinator 코드 전부 | 배포 정산의 실패이지 세션의 일이 아니다 |
| `worktree_remove_failed` · `local_branch_delete_failed` | 정리 실패(현행도 허용) |
| `bd_close_failed` · `bd_read_failed` · `bd_record_failed` | 기록·환경 실패 |

#### 미지 토큰이 `settlement`인 것이 안전한 이유

기본값이 뒤집혔으므로 근거를 명시한다. `settle`은 멱등이다 — 처음부터 다시 돌면서 상태를 읽고
containment를 판정하므로, 실제로 착지가 안 된 행이라면 그냥 다시 실패하고 그 사유가
`quickfix_landing.reason`에 갱신된다. 잘못된 `settlement` 판정의 최대 피해는 **정산 한 번을
헛돌리는 것**이고, 잘못된 `session` 판정의 피해는 **할 일 없는 세션을 띄우고 그 행을 계속 치우지
못하는 것**이다(§1). 비대칭이 기본값의 방향을 정한다.

`reason`이 없거나 빈 문자열이면 정산이 시작되기 전이므로 재개 판정 대상 자체가 아니다 —
`quickfix_cleanup_resume`의 기존 전제가 그것을 먼저 거른다(§3.2). 은퇴한 `not_resolved`
(UI-5ym8 §5)는 과거 기록에만 남은 토큰이고 세션 성격이므로 `session` 목록에 함께 적는다.

**커서는 판정에서 완전히 빠진다.** 커서가 `None`인 행(예: `bd_read_failed`)도 사유가
`settlement`면 정산 재개로 간다 — 커서 기준으로는 표현할 수 없던 경우이며, 이 설계가 그것까지
포함한다.

#### 3.1.1 `invalid_impl_review`에서 읽기 실패를 분리 (`server/worker/quickfix-landing.js`)

`readReceipt`는 형식 오류와 `bd.readMetadata` **예외**를 모두 `invalid_impl_review`로 기록한다.

```js
} catch (err) {
  log('quick_fix impl_review readback failed for %s: %o', bead_id, err);
  return { ok: false, reason: 'invalid_impl_review' };
}
```

읽기 장애는 환경성 실패인데 이 분류 때문에 세션 재실행으로 떨어진다. catch 갈래를
`bd_read_failed`로 바꾼다 — 그 토큰은 이미 union에 있고 `failure-class.js`의
`ALWAYS_ENV_CAUSES`가 `quickfix_landing_failed:bd_read_failed`를 환경성으로 분류하므로
계층 판정과도 정합한다. 형식 오류만 `invalid_impl_review`로 남는다.

이 분리는 §3.1 판정의 전제다. 분리하지 않으면 일시적 bd 장애가 세션 재실행으로 새어 나간다.

#### 3.1.2 `quickFixLanded`는 건드리지 않는다

`app/views/worker/lanes.js`의 `quickFixLanded`도 커서 목록
(`repo_operations`·`branch_cleanup`·`parent_close`)을 갖고 있지만 **다른 질문에 답한다** —
"착지가 증명됐는가"이고, 그 답이 실패 타일의 `이미 base에 착지됨 — …` 문구를 띄운다.
`containment_unobservable`은 "착지 여부를 모른다"이지 "착지가 증명됐다"가 아니므로 그 판정은
그대로 두는 것이 옳다. 재개 종류와 착지 증명은 서로 다른 축이며, 이 설계는 전자만 바꾼다.

### 3.2 `server/worker/scheduler.js`

`quickfix_cleanup_resume`의 커서 검사 두 줄이 사유 판정으로 바뀐다.

```js
const quickfix_cleanup_resume =
  prior.status === 'failed' &&
  prior.quickfix_lane === true &&
  typeof prior.quickfix_landing?.reason === 'string' &&
  prior.quickfix_landing.reason.length > 0 &&
  resumeKindOf(prior.quickfix_landing) === 'settlement';
```

나머지는 그대로다. 특히 `!quickfix_cleanup_resume && !wt_present` → `worktree_missing` 거부는
유지된다 — 정산 재개는 워크트리를 필요로 하지 않고(`removeIfDiscardable`은 부재를 "치울 것이
없음"으로 읽는다), 세션 재실행은 여전히 워크트리를 요구한다. 커서는 계속 durable 기록으로
남는다(진행 표시와 `head_sha` 결속). 판정에서만 빠진다.

### 3.3 프런트엔드 — `running-grid.js` · `lane-model.js` · `index.js`

버튼을 그리는 파일은 `app/views/worker/running-grid.js`다(`index.js`는 클릭 위임과 거부 토스트만
맡는다). 세 곳이 바뀐다.

**(a) `running-grid.js` — 보이는 문구·`aria-label`·`title` 셋을 함께 분기한다.** 지금 실패
타일의 버튼은 이렇게 그려진다.

```js
class="rtile__resume"
title=${... '같은 세션으로 이어서 진행'}
aria-label="이어하기"
> ↻ 이어하기
```

보이는 문구만 바꾸면 보조기술과 툴팁은 계속 "같은 세션"이라고 잘못 안내한다. `settlement`일 때
셋 모두 정산 어휘로 간다.

| | `settlement` | `session` |
| --- | --- | --- |
| 문구 | `↻ 정산 재개` | `↻ 이어하기` |
| `aria-label` | `정산 재개` | `이어하기` |
| `title` | `착지 정산을 다시 실행` | `같은 세션으로 이어서 진행` |

클래스(`.rtile__resume`)·자리·클릭 핸들러는 그대로라 ADR 0014의 공유 슬롯 표는 갱신하지 않는다.
`[폐기]` 옆 버튼 수도 늘지 않는다.

**(b) `lane-model.js` — `resume_eligible`이 `settlement`에서 세션 ID를 요구하지 않는다.** 지금은
세션 ID가 없으면 무조건 거짓이다.

```js
const resume_eligible =
  run_state !== 'running' && has_session && !resumed_from_ids.has(a.attempt_id);
```

정산 재개는 서버에서 세션 ID도 워크트리도 요구하지 않으므로(§3.2), 이 조건은 안전하게 마감할 수
있는 행의 버튼을 비활성화한다. `settlement`일 때 `has_session` 요구를 뺀다. `resumed_from_ids`
검사(이미 이어받은 attempt)는 두 경우 모두 유지한다 — 그것은 세션 유무와 무관한 중복 방지다.
`resume_reason` 문구도 그에 맞춰 `settlement`에서는 `session_id 없는 구 attempt` 사유를 쓰지
않는다.

**(c) `index.js` — 거부 토스트 문구만 라벨을 따른다.** `이어하기 거부: <사유>`가 `settlement`일
때 `정산 재개 거부: <사유>`가 된다. 클릭 핸들러(`resumeAttempt`)와 위임 경로는 그대로다.

### 3.4 재개가 다시 실패하면

정산 재개가 실패하면 `settle`이 `quickfix_landing.reason`을 새로 쓴다. 그 사유가 세션 성격으로
바뀌면(`containment_unobservable` → `push_not_contained`) **다음 클릭은 저절로 세션 재실행이
된다.** 별도 사다리 장치나 재시도 예산 없이 사유 갱신만으로 단계가 넘어간다. 같은 사유가
반복되면 사용자가 같은 버튼을 다시 누를 뿐이며, 자동 재디스패치는 없다(ADR 0005·0017).

## 4. 테스트

- `app/utils/quickfix-resume-kind.test.js` — `session` 목록의 모든 토큰과 두 접두
  (`delivery_unproven:`), 대표 `settlement` 토큰들, **coordinator 코드
  (`remote_history_not_monotonic`·`repo_ops_ancestry_check_failed`)가 `settlement`로 떨어지는
  것**, 미지 토큰·`null`·빈 문자열의 기본값.
- `server/worker/quickfix-landing.test.js` — `bd.readMetadata`가 던질 때 `invalid_impl_review`가
  아니라 `bd_read_failed`가 기록되는 것(§3.1.1), 형식 오류는 그대로 `invalid_impl_review`인 것.
- `server/worker/scheduler.test.js` — 같은 `base_containment` 커서의 두 행이 갈리는 것:
  `containment_unobservable`은 `settleQuickfixLanding`을 타고 새 attempt를 만들지 않으며,
  `push_not_contained`는 세션 재실행 경로로 가고 워크트리가 없으면 `worktree_missing`으로
  거부된다. `repo_operations` 커서의 `remote_history_not_monotonic` 행이 정산으로 가는 것
  (실제 행 `dotfiles-pio7-1787795442613-1`의 재현). `branch_cleanup`·`parent_close` 기존 동작
  회귀.
- `app/views/worker/running-grid.test.js` — 사유에 따른 문구·`aria-label`·`title` 3종 분기,
  클래스·핸들러 불변.
- `app/views/worker/lane-model.test.js` — 세션 ID가 없는 `settlement` 실패 행의
  `resume_eligible`이 참이고, 같은 조건의 `session` 실패 행은 거짓인 것.

수용 확인: 실제 행 `dotfiles-fq42-1787910960134-1`이 Bead 상태를 되돌리지 않고 `done`으로
마감된다. 이 Bead에는 UI-jf33이 정의한 `foreign_repo`·`foreign_path`·`foreign_base` 핀이 이미
기록돼 있어 재개만 되면 현재 코드로 통과한다. 그 클릭은 머지 이후의 운영자 인계이며 완료 보고가
운반한다(§5.0).

## 5. 경계·후속

후속 Bead 없음.

### 5.0 머지 이후 남는 일과 그 운반

이 저장소의 이전 기준 커밋 `repo-ops/config.toml`은 `[deploy]`를 선언하므로, 머지 후 설치·재시작·
런타임 확인은 그 handler가 운반한다. 그러나 **실제 행 `dotfiles-fq42-1787910960134-1`의
`[정산 재개]` 클릭은 어떤 transport도 대신하지 못한다** — 배포는 코드를 살아 있게 만들 뿐이고,
그 행을 누르는 것은 사람이 하는 한 번의 조작이다.

이것은 `worker-ineligible`이 **아니다**. 네 조건 중 두 번째("어떤 settled transport로도 수행하거나
durable하게 인계할 수 없다")를 만족하지 않는다 — 완료 보고의 read-back 잔여 라인이 그 조작을
durable하게 인계하고, 계약이 그런 머지 후 확인을 기본적으로 operator handoff로 규정한다. 승인된
disposition이 close 전 상호작용 확인을 요구하지도 않는다.

따라서 이 Bead의 완료 보고 `남은 위험`은 다음을 한 줄로 적는다: 배포 성공 뒤 Worker 탭에서
`dotfiles-fq42-1787910960134-1` 행의 `[정산 재개]`를 눌러 `done` 전이, `dotfiles` 워크스페이스
`auto_advance` 해제, `.worktrees/dotfiles-fq42` 제거를 확인한다.

관찰(라벨 사유 아님): 그 확인이 배포된 결과를 눈으로 보는 종류라 `session_preferred_reason`
enum 중 `visual_verification`에 해당한다. 게이트 종료 시 컨트롤러가 `session-preferred` 라벨을
판단할 재료로만 남기며, 자격 판정을 바꾸지 않는다.

### 5.1 scope 겹침 (2026-08-28 관측)

`stale-rereview-inputs.py UI-8h1x --json`이 보고한 in-flight 겹침 셋 모두 **같은 파일의 다른
절**이며 이 설계의 전제가 아니다. 착지 순서 제약도 없다.

| Bead | spec | 겹치는 경로 | 관계 |
| --- | --- | --- | --- |
| UI-qksl (open) | `2026-08-28-auto-review-dispatch-on-hold-design.md` | `server/worker/scheduler.js` · `app/views/worker/` | 다른 절 — 머지 큐의 `impl_review` 보류 시 리뷰 lineage dispatch를 다룬다. 이 설계는 quick_fix **착지 정산**의 재개이고 머지 큐를 지나지 않는다(base 직접 push). 두 판정은 입력도 호출 지점도 겹치지 않는다 |
| UI-8wpb (in_progress) | `2026-08-28-worker-record-timeline-retention-design.md` | `server/worker/scheduler.js` · `app/views/worker/` | 다른 절 — Worker **기록 구조**(bead 타임라인·실패 요약·`queue.json` 보존)를 재편한다. 이 설계는 기록 형식을 바꾸지 않고 이미 있는 `quickfix_landing.reason`을 읽기만 하므로, 어느 쪽이 먼저 착지해도 다른 쪽이 읽는 필드가 사라지지 않는다 |
| UI-8x90 (in_progress) | `2026-08-28-chip-grammar-unify-design.md` | `app/utils/` · `app/views/worker/` | 다른 요소 — **칩** 문법(의존·겹침 칩의 글리프+ID 라벨, 클릭 의미)을 통일한다. 이 설계가 건드리는 것은 액션 foot의 **버튼** 라벨 하나이고 칩이 아니다. AGENTS.md 카드 문법상 조작과 칩은 서로 다른 슬롯이며, 이 설계는 슬롯 표를 갱신하지 않는다 |

### 5.2 관찰

- 관찰: `[폐기]`의 `parent_reset`이 이미 마감된 Bead를 `open`으로 되돌리는 파괴성 — 이 설계가 안전한 출구를 주면 오조작 유인이 줄지만, `parent_reset` 자체의 확인 절차는 그대로다. 이 Bead의 수용 기준이 아니고, 되돌림이 정당한 경우(정말 폐기)가 있어 일률적으로 막을 수 없다.
- 관찰: 관측된 커서 `None` 실패 5건은 사유가 모두 `session`이라 동작이 바뀌지 않는다. 넓어지는 것은 두 방향이다 — 커서 없이 `settlement`인 사유(`bd_read_failed`)가 이제 재개 대상이 되고, 미지 토큰의 기본값이 `settlement`로 뒤집혀 앞으로 생길 coordinator 코드가 자동으로 포섭된다. 둘 다 의도한 확장이며 그 안전성 근거는 §3.1의 비대칭 논증이다.

## 6. 결정 (ADR 후보)

- **quick_fix 착지 재개는 커서가 아니라 실패 사유로 판정한다.**
  - 되돌리기 어려운가 — **보유**. 코드 자체는 되돌릴 수 있으나, 사용자가 보는 버튼의 의미와 실패 행의 출구가 바뀌므로 되돌리면 다시 "치울 수 없는 행"이 생긴다.
  - 맥락 없이 놀라운가 — **보유**. 커서는 정산이 어디까지 갔는지를 담은 durable 진행 기록이라 재개 판정의 자연스러운 입력처럼 보인다. 같은 커서에 정반대 성격의 사유가 섞인다는 관측이 있어야 사유 기준이 이해된다.
  - 실질 트레이드오프가 있는가 — **보유**. 미지 토큰의 기본값이 `settlement`이므로 정말 세션이 필요한 새 사유가 생기면 헛도는 정산을 한 번 치르고, `session` 목록에 그것을 추가할 때까지 그 상태가 이어진다. 그 대가로 커서로는 표현할 수 없는 구분과, 열린 coordinator 어휘에 대한 자동 포섭을 얻는다.
  - 세 조건 모두 보유 → ADR 후보.
  - summary 초안: quick_fix 착지 실패 행의 재개는 정산 커서가 아니라 실패 사유로 갈린다 — 세션이 필요한 사유만 닫힌 목록으로 열거하고 나머지는 전부 같은 attempt의 정산을 다시 돌린다. 정산 계열 어휘는 coordinator가 만들어 열려 있고 `settle`은 멱등이므로, 기본값은 정산 쪽이 안전하다.
