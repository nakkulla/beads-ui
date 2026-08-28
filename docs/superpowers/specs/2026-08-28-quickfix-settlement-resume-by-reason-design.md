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
2. 그 판정을 커서가 아니라 **실패 사유**가 한다.
3. 사용자가 누르기 전에 무엇이 일어날지 버튼 라벨로 안다.

범위 밖: `[폐기]`의 `parent_reset` 파괴성 자체, 커서 `None` 실패의 처리, 새 자동화(ADR 0005 —
재진입은 사람 클릭뿐).

## 3. 설계

### 3.1 판정 소유 — `app/utils/quickfix-resume-kind.js` (신설)

무의존 leaf 하나를 새로 만들고 함수 하나를 export한다.

```js
/**
 * @param {{ reason: string|null }|null|undefined} quickfix_landing
 * @returns {'settlement'|'session'}
 */
export function resumeKindOf(quickfix_landing)
```

`app/utils/failure-sentences.js`가 선례다 — 서버(`scheduler.js`)와 클라이언트
(`app/views/worker/index.js`)가 **같은 한 벌**을 읽어야 하는데, 클라이언트 모듈은 `lanes.js`를
통해 lit-html을 끌고 오므로 서버가 그 파일을 읽을 수 없다. 그래서 공유 데이터는 무의존
leaf에 둔다.

실패 토큰 자체는 dotfiles 계약이 정의하지만, **어떤 실패가 정산 재실행으로 풀리는가는 Worker
내부 판단이라 beads-ui가 소유한다.** ADR 0012(계약은 코드 field registry로 복제해 소비)와,
UI-jf33이 `workflow-state.yaml enclosed_foreign_landing.worker_judgment`에 "judgment owner is
beads-ui"로 적은 것과 같은 선이다. 이 설계는 dotfiles 계약을 바꾸지 않는다.

#### 판정표

`settlement` — 관측이나 하위 단계 실행이 실패했을 뿐, 세션이 할 일은 남아 있지 않다.

| 사유 | 근거 |
| --- | --- |
| `containment_unobservable` | fetch/판정 실패. 다시 관측하면 통과할 수 있다 |
| `foreign_checkout_unavailable` | 핀된 체크아웃이나 remote를 못 찾음. 사람이 고친 뒤 재개 |
| `foreign_landing_unpinned:*` (접두) | 핀 누락. 핀을 기록한 뒤 재개하면 통과 |
| `repo_ops_config_invalid` | 배포 선언 읽기 실패 |
| `repo_operation_failed` | 배포 실행 실패. 재개는 `ensureDeploy`를 다시 부르고 coordinator의 monotonicity가 중복을 흡수한다(`superseded`) |
| `repo_operation_pending` | 배포가 terminal에 도달하지 못함 |
| `worktree_remove_failed` | 정리 실패(현행도 허용) |
| `local_branch_delete_failed` | 정리 실패(현행도 허용) |
| `bd_close_failed` | close 기록 실패(현행도 허용) |
| `bd_read_failed` | Bead 읽기 실패. 환경성이라 재개가 정답 |
| `bd_record_failed` | Worker 자체 기록 실패 |

`session` — 착지나 영수증 자체가 문제라 사람이나 세션의 판단이 필요하다.

| 사유 | 근거 |
| --- | --- |
| `push_not_contained` | 착지가 정말 안 됐다 |
| `invalid_impl_review` | 영수증이 없거나 형식이 틀렸다 |
| `delivery_unproven:*` (접두) | push 기록·영수증 결속이 증명되지 않았다 |
| `premature_close` | Worker close 기록 없이 Bead가 닫혔다 |
| `head_mismatch` | 커서의 head와 영수증 SHA가 어긋난다 |
| `foreign_deploy_unsupported` | 대상 저장소 배포는 push한 세션이 소유한다 |

모르는 토큰은 `'session'`이다. `server/worker/failure-class.js`의 fail-quiet 기본값
("an unknown cause fails its own bead only")과 같은 보수적 선택이며, 현행 동작과 일치한다.
`reason`이 없거나 빈 문자열이면 애초에 재개 판정 대상이 아니므로 역시 `'session'`이다.
은퇴한 `not_resolved`(UI-5ym8 §5)는 판정표에 넣지 않는다 — 과거 기록에만 남은 토큰이고,
미지 토큰 규칙이 그것을 `'session'`으로 떨어뜨리는 것이 정확한 처리다.

**커서는 판정에서 완전히 빠진다.** 커서가 `None`인 행(예: `bd_read_failed`)도 사유가
`settlement`면 정산 재개로 간다 — 커서 기준으로는 표현할 수 없던 경우이며, 이 설계가 그것까지
포함한다.

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

### 3.3 `app/views/worker/index.js`

`.rtile__resume` 버튼의 **라벨만** `resumeKindOf`로 갈린다.

- `'settlement'` → `정산 재개`
- `'session'` → `이어하기`

클래스·자리·클릭 핸들러(`resumeAttempt`)는 전부 그대로라 ADR 0014의 공유 슬롯 표는 갱신하지
않는다. `[폐기]` 옆 버튼 수도 늘지 않는다. 클라이언트는 이미 `quickfix_lane`·
`quickfix_landing`을 스냅샷으로 받고 있으므로 새 프로토콜 필드가 필요 없다.

토스트 문구도 라벨을 따른다(`이어하기 거부: <사유>` → 정산 재개일 때 `정산 재개 거부: <사유>`).

### 3.4 재개가 다시 실패하면

정산 재개가 실패하면 `settle`이 `quickfix_landing.reason`을 새로 쓴다. 그 사유가 세션 성격으로
바뀌면(`containment_unobservable` → `push_not_contained`) **다음 클릭은 저절로 세션 재실행이
된다.** 별도 사다리 장치나 재시도 예산 없이 사유 갱신만으로 단계가 넘어간다. 같은 사유가
반복되면 사용자가 같은 버튼을 다시 누를 뿐이며, 자동 재디스패치는 없다(ADR 0005·0017).

## 4. 테스트

- `app/utils/quickfix-resume-kind.test.js` — 판정표의 모든 토큰, 두 접두(`foreign_landing_unpinned:`·`delivery_unproven:`), 미지 토큰·`null`·빈 문자열의 fail-quiet 기본값.
- `server/worker/scheduler.test.js` — 같은 `base_containment` 커서의 두 행이 갈리는 것: `containment_unobservable`은 `settleQuickfixLanding`을 타고 새 attempt를 만들지 않으며, `push_not_contained`는 세션 재실행 경로로 가고 워크트리가 없으면 `worktree_missing`으로 거부된다. `repo_operations`/`repo_operation_failed` 행이 정산으로 가는 것. `branch_cleanup`·`parent_close` 기존 동작 회귀.
- `app/views/worker/index.test.js` — 사유에 따른 버튼 라벨 분기, 클래스·핸들러 불변.

수용 확인: 실제 행 `dotfiles-fq42-1787910960134-1`이 Bead 상태를 되돌리지 않고 `done`으로
마감되고, `dotfiles` 워크스페이스의 `auto_advance` 정지와 남은 `.worktrees/dotfiles-fq42`
잔여물이 함께 풀린다. 이 Bead에는 UI-jf33이 정의한 `foreign_repo`·`foreign_path`·
`foreign_base` 핀이 이미 기록돼 있어 재개만 되면 현재 코드로 통과한다.

## 5. 경계·후속

후속 Bead 없음.

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
- 관찰: 관측된 커서 `None` 실패 5건은 사유가 모두 `session`이라 동작이 바뀌지 않는다. 다만 커서를 판정에서 뺀 결과 `bd_read_failed`처럼 커서 없이 `settlement`로 분류되는 사유도 정산 재개 대상이 된다 — 현행보다 넓어지는 유일한 지점이고, 그 사유들은 재개가 정답이므로 의도한 확장이다.

## 6. 결정 (ADR 후보)

- **quick_fix 착지 재개는 커서가 아니라 실패 사유로 판정한다.**
  - 되돌리기 어려운가 — **보유**. 코드 자체는 되돌릴 수 있으나, 사용자가 보는 버튼의 의미와 실패 행의 출구가 바뀌므로 되돌리면 다시 "치울 수 없는 행"이 생긴다.
  - 맥락 없이 놀라운가 — **보유**. 커서는 정산이 어디까지 갔는지를 담은 durable 진행 기록이라 재개 판정의 자연스러운 입력처럼 보인다. 같은 커서에 정반대 성격의 사유가 섞인다는 관측이 있어야 사유 기준이 이해된다.
  - 실질 트레이드오프가 있는가 — **보유**. 사유 목록을 유지해야 하고 새 토큰마다 분류가 필요한 대신, 커서로는 표현할 수 없는 구분을 얻는다.
  - 세 조건 모두 보유 → ADR 후보.
  - summary 초안: quick_fix 착지 실패 행의 재개는 정산 커서가 아니라 실패 사유로 갈린다 — 관측·하위 실행 실패는 같은 attempt의 정산을 다시 돌리고, 착지·영수증 자체의 문제만 세션을 다시 띄운다.
