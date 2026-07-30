# 보드 카드 워크플로우 스텝퍼 시각 규칙 정합화

- Bead: UI-1k8i
- 작성일: 2026-07-30
- 라우트: spec_backed

## 1. 배경과 관측

스텝퍼(`spec`/`plan`/`impl`/`pr`/`merge`)의 상태→시각 매핑이 스테이지마다 다른
규칙으로 자라서, 같은 색이 다른 의미를 갖고 일부 상태는 시각적으로 구분되지
않는다. 관측 근거는 전부 실측이다 — `enrichIssuesWorkflow`를 dotfiles 19건 /
beads-ui 11건에 직접 실행해 상태 분포를 집계했다.

```
dotfiles   spec  empty:16  reviewed:2  stale:1
           impl  empty:14  dim:4       stale:1
           pr    empty:18  on:1
           merge empty:18  dim:1
```

### 1.1 `stale`이 `empty`와 시각적으로 동일하다

`.stp .bar.stale`(`app/styles/base.css:704`)이 `--border-empty-fill`을 배경으로
쓰는데, 이는 `.stp .bar` 기본값(`base.css:641`)과 같은 토큰이다. 결과적으로
"리뷰 리시트가 있으나 대상이 움직였다"와 "아무것도 시작하지 않았다"가 같은
회색으로 보인다. `dotfiles-1ub0`의 spec 칸이 이 상태였고, 이 스펙의 출발점이다.

### 1.2 `impl` 신선도 판정이 구조적으로 성립하지 않는다

```js
// server/workflow-enrich.js:234
const impl_stale = ... && head !== impl_receipt.sha;
```

`spec_review`는 `git log <sha>..HEAD -- <spec_id>`로 **해당 경로만** 보지만
`impl_review`는 공유 체크아웃 HEAD와 전역 비교한다. impl 게이트는 워크트리
브랜치 tip에서 발급되고 이 저장소는 스쿼시 머지를 쓰므로, 그 SHA는 base
히스토리에 **들어올 수 없다**. 실측:

```
sha=3c304c67 (dotfiles-28dy impl_review, PR #331 머지 완료)
  object: present
  ancestor of HEAD: NO
  contains: dotfiles-28dy, remotes/origin/dotfiles-28dy
```

리뷰 직후부터 `head !== receipt.sha`가 영구히 참이다. 28dy 이후 쌓인 커밋 3건은
전부 무관한 `dotfiles-1ub0`의 스펙 커밋인데도 28dy의 impl이 stale로 죽었다.
조상 검사로 바꿔도 스쿼시 머지 때문에 같은 방식으로 실패한다.

### 1.3 완료된 작업의 스텝퍼가 거의 비어 있다

`resolved / spec=empty impl=dim pr=empty merge=empty`가 4건이다. `spec_id`도
`pr_url`도 없이 완료된 Bead들로, 4칸 중 1칸만 흐리게 채워져 시작 직전처럼 보인다.
`implStage`는 리시트가 없으면 status가 `resolved`여도 `dim`에 머문다.

### 1.4 `dim` 진입 조건이 스테이지마다 다르다

`spec`/`plan`은 산출물 존재, `impl`은 status 파생, `pr`은 dim 미사용, `merge`는
`pr_url`+`resolved`. 규칙이 코드에만 있고 문서화된 근거가 없다.

### 1.5 상태가 시각 채널에만 존재한다

`aria-label`이 `"워크플로우 진행 스테퍼"` 고정 문자열이고 컨테이너가
`role="img"`다(`app/views/board/stepper.js:127`). `role="img"`는 자식 콘텐츠를
접근성 트리에서 대체하므로, 스텝퍼가 전달하는 정보 전체가 색·글리프에만 있고
보조기술로는 아무 진행 상태도 읽을 수 없다.

### 1.6 리시트 토큰 분류가 계약보다 넓다

`RECEIPT_RE`(`server/workflow-enrich.js:24`)가 임의 리뷰어 토큰을 받고
`is_skip`은 `reviewer === 'skipped'`일 때만 참이므로, 사실상 "`skipped@`가
아니면 전부 리뷰 증거"로 분류된다. 계약은 리뷰어 토큰을 열거하며(§2), 그 목록에
없는 토큰(`user@`, 오타)까지 리뷰 증거로 취급되는 것은 계약보다 넓은 해석이다.

## 2. 계약 경계 — 글리프 축은 beads-ui 소유가 아니다

`dotfiles-f6de`(PR #333, 머지 커밋 `d42e6d9d`)가 `docs/contracts/workflow.md:115`에
글리프 분류를 beads-ui에 대한 규범으로 명문화했다.

> reviewer tokens (`codex`/`opus`/`fable`/`self`/`triage`) are all review evidence,
> and only `skipped@` is authority without review, so a beads-ui card glyph follows
> exactly that split — `✓` for review evidence, `⊘` for `skipped@`. Consumers give
> `self@` no separate mark of its own.

`AGENTS.md`가 정한 대로 beads-ui는 이 계약의 소비자다. 따라서 글리프는 **리시트
토큰을 계약이 열거한 집합에 대조해** 결정하며, 스테이지별 특수 규칙을 두지 않는다.

| 글리프 | 리시트 토큰 |
|---|---|
| `✓` | `codex` · `opus` · `fable` · `self` · `triage` (계약 열거) |
| `⊘` | `skipped` |
| 없음 | 리시트 부재, 또는 위 두 집합에 없는 토큰 |

세 번째 행이 §1.6의 교정이다. 계약 열거 밖의 토큰은 fail-quiet하게 글리프를
비운다 — `AGENTS.md`가 정한 소비자 원칙("계약 키의 부재를 관측하면 표시를
생략하고 계약 쪽 정정을 별도로 제기한다")을 토큰 어휘에도 적용한 것이다. 채움은
리시트 존재 사실만으로 결정되므로 글리프가 비어도 칸은 채워진다.

`self@`에 별도 표식을 주는 것도 계약이 금지한다. 검토 초기에 고려했던 "정상
완료에는 글리프를 붙이지 않고 예외만 표시" 안은 `✓`를 없애므로 이 계약과
충돌하며, 채택하지 않는다.

### 2.1 `plan_review`도 같은 분류를 받는다

`plan_review`의 정상 승인 값은 `user@<40hex>`인데 `user`는 계약 열거에 없으므로
글리프가 비고, 이는 위 일반 규칙의 결과이지 plan 전용 예외가 아니다.

plan에 전용 예외를 두면 안 되는 이유가 계약에 있다. `workflow.md:119`가 worker
autorun stale lane의 plan 브랜치를 정의하며, stale해진 `plan_review`가
`triage@<new-40-hex>` 또는 `codex@<new-40-hex>`로 refresh된다고 명시한다.

> a delta touching no section or requirement this Bead's scope depends on refreshes
> to `plan_review = triage@<new-40-hex>`, a crossing or uncertain delta dispatches
> the codex leg exactly once and writes `codex@<new-40-hex>` on `APPROVE`

이 두 토큰은 §2 표의 첫 행에 속하므로 `✓`를 받아야 한다. 따라서 "plan 칸은 항상
글리프 없음"은 계약 위반이다. 토큰 분류를 일반 규칙으로 두면 `user@`는 비고
`triage@`/`codex@`는 `✓`가 되어 두 경우가 모두 맞는다.

`plan_review`에는 skip 값이 없다(계약 명시). `skipped@`가 관측되면 계약 열거
밖 취급과 동일하게 승인으로 인정하지 않는다(§5.3).

## 3. 시각 3축 분리

| 축 | 소유 | 값 |
|---|---|---|
| 글리프 | 계약 | `✓` / `⊘` / 없음 — 리시트 토큰에서 파생(§2) |
| 채움 | beads-ui | `none` / `dim` / `full` |
| 신선도 | beads-ui | fresh / **stale = 채움을 `dim`으로 강등 + 앰버 밑줄** |

`stale`을 `⚠`로 표시하지 않는다. 리뷰어 토큰 리시트는 stale이어도 계약상 여전히
리뷰 증거이고 계약이 그것에 `✓`를 요구하므로, 글리프 축을 신선도 표시에 쓸 수
없다. 대신 채움을 강등하고 앰버 밑줄을 얹는다.

이 구조가 stale의 실제 의미와 맞는다. 게이트 권한 관점에서 stale은 "리뷰 안
받음"과 동급이고(계약: 권한 사용은 리시트 SHA가 현재 대상과 일치할 것을 요구),
따라서 취해야 할 행동이 같으므로 채움이 `dim`(리뷰 대기)과 같은 레벨인 것이 옳다.
남은 글리프가 "어떤 종류의 리시트가 있었는지"를 전달한다. 두 정보가 다른 축에
있어 충돌하지 않는다.

### 3.1 서버 상태 모델을 필드로 분리한다

현행 `state` 단일 문자열(`empty`/`dim`/`on`/`reviewed`/`skip`/`stale` 6값)은 세
축을 하나로 접어서, 글리프를 리시트 토큰에서 파생할 수 없고 "stale한 `skipped@`"
같은 조합을 표현할 수 없다(§5.2). `state`를 폐기하고 축마다 필드를 둔다.

```js
/**
 * @typedef {Object} WorkflowStage
 * @property {'none'|'dim'|'full'} fill
 * @property {'review'|'skip'|null} glyph
 * @property {boolean} stale
 * @property {string|null} receipt - 리시트 원문(spec/impl/plan만)
 */
```

- `glyph`는 §2 표를 그대로 구현한 순수 함수(`classifyGlyph`)의 결과다. 분류
  자체는 스테이지 종류와 무관하지만, **입력으로 넘기는 리시트는 그 스테이지가
  유효로 인정한 것에 한한다** — `spec`/`impl`은 파싱에 성공한 리시트, `plan`은
  §5.3 화이트리스트를 통과한 리시트다. 유효하지 않은 리시트는 분류에 넘기지 않고
  `glyph = null`로 둔다.

  이 제약이 없으면 `plan_review = skipped@<40hex>`가 모순을 만든다. `plan`에는
  skip 값이 없으므로 승인으로 인정되지 않아 `fill = 'dim'`인데, 분류만 보면
  `⊘`가 붙어 "진행 중인데 검토 생략됨" 칸이 생기고 §6의 깜빡임 대상까지 된다.
- `stale`은 독립 불리언이며 `fill`을 강등시키는 것 외에 글리프에 관여하지 않는다.
- `fill`은 §4 표로 결정한 뒤, `stale`이면 `dim`으로 강등한다.

따라서 `fill === 'dim'`인 칸은 항상 `glyph === null`이거나(유효 리시트 없음)
`stale === true`다(강등된 것). 이 불변식이 §6의 깜빡임 대상 판정과 §8의 라벨
문구가 겹치지 않게 만든다.

클라이언트는 세 필드를 CSS 클래스와 글리프 문자로 기계적으로 옮기며, 분류
판단을 하지 않는다. 계약이 소유한 결정(글리프)과 beads-ui가 소유한 표현(채움·
신선도)이 필드 경계로 갈라져, 계약이 바뀔 때 고칠 지점이 코드에서 드러난다.

## 4. 스테이지별 채움 규칙

`stale`에 의한 강등을 적용하기 전의 값이다.

| | `none` | `dim` | `full` |
|---|---|---|---|
| **spec** | `spec_id` 없음 | 리시트 없음 | 리시트 있음 |
| **plan** | `plan_path` 없음 | 유효 승인 없음 | 유효 승인 있음 · 키 부재 + `resolved`/`closed`(legacy) |
| **impl** | 미착수 | `in_progress` 또는 `pr_url` 있음 | 리시트 있음 · **리시트 없고 `resolved`/`closed`** |
| **pr** | `pr_url` 없음 | *(사용하지 않음)* | `pr_url` 있음 |
| **merge** | PR 없음 | `pr_url` + `resolved` | `closed` |

### 4.1 신규 규칙 — 리시트 없는 완료도 impl을 채운다

`implStage`에서 리시트가 없고 status가 `resolved`/`closed`면 `full`을 반환한다
(현행은 `dim`). `resolved`는 그 자체로 구현 완료 사실이다. 리시트가 없으니
글리프도 없어, 리시트로 채워진 impl(`✓`)과 오히려 정확히 구분된다 — §2 표의
세 번째 행이 여기서 그대로 작동한다. §1.3의 4건이 이 규칙으로 해소된다.

`in_progress`와 `pr_url` 존재는 계속 `dim`이다.

### 4.2 `pr`은 `dim`을 쓰지 않는다

"PR이 있다"는 이진 사실이고, 머지 대기는 `merge`의 `dim`이 이미 표현한다. 모든
스테이지가 3단을 채워야 한다는 규칙은 두지 않으며, §4 표가 각 스테이지가 갖는
값의 유일한 근거다.

## 5. 신선도 판정

### 5.1 `impl` — Bead 브랜치 tip 비교

`head !== receipt.sha` 비교를 폐기한다. 대체 판정은 **그 Bead의 구현 브랜치**
tip만 본다. 브랜치 이름은 워크플로 계약이 결정한다 — 워크트리 basename == 브랜치
이름이고 Bead 작업은 Bead ID를 쓴다(`workflow.md` 실행 규칙).

```
implFreshness(workspace_root, receipt_sha, bead_id) -> 'fresh' | 'stale' | 'unknown'
  workspace_root · receipt_sha · bead_id 중 부재            -> 'unknown'
  git rev-parse --verify refs/heads/<bead_id> 실패          -> 'unknown'
  tip === receipt_sha                                       -> 'fresh'
  git merge-base --is-ancestor <receipt_sha> <tip> 성공      -> 'stale'
  그 외                                                     -> 'unknown'
```

`git branch --points-at` / `--contains`로 전역 검색하지 않는다. 전역 검색은 두
방향으로 오판정한다 — 무관한 다른 브랜치가 리시트 SHA에 멈춰 있으면 실제 구현
브랜치가 전진했는데도 fresh가 되고, 구현 브랜치가 삭제된 뒤 리시트를 포함하는
다른 descendant 브랜치가 남아 있으면 stale이 된다.

판정 근거:

- Bead 브랜치 tip == 리시트 SHA → `fresh`. 28dy가 여기 해당해 정상 복귀한다.
- 리뷰 후 그 브랜치에 커밋이 더 들어감 → 리시트가 tip의 조상 → `stale`. REVISE
  배치 수정이 정확히 이 모양이고, 이것이 이 판정이 잡으려는 유일한 신호다.
- 머지 후 브랜치 삭제 → `rev-parse` 실패 → `unknown` → fresh. 머지된 작업은 더
  이상 신선도 판정 대상이 아니므로 옳다.
- Bead ID가 없는 작업(bead-less, 브랜치명이 Bead ID가 아닌 경우) → `unknown` →
  fresh. 규칙이 성립하지 않는 곳에서 추측하지 않는다.

`unknown`은 기존 fail-quiet 원칙대로 `stale=false`로 접힌다.

**캐시하지 않는다.** 기존 `stale_cache`는 HEAD를 키로 삼는데, 워크트리에서
커밋해도 공유 체크아웃 HEAD는 움직이지 않으므로 브랜치 tip 변경을 무효화하지
못한다. `pathDirty`가 같은 이유로 캐시를 우회하는 선례가 있다. 비용은
`impl_review`를 가진 카드당 git 셸 1–2회이며, 실측 분포에서 dotfiles 19건 중
1건이다.

### 5.2 `skipped@`도 신선도 판정 대상이다

현행 `computeStaleWithHead`가 `!receipt.is_skip`으로 skip을 stale 판정에서
면제하는데, 이는 계약과 어긋난다. `workflow.md:117`이 `skipped@` origin 리시트의
stale 처리를 명시한다.

> **`skipped@` origin receipt**: the triage/leg procedure applies unchanged, but a
> successful refresh writes `skipped@<new-40-hex>` rather than `triage@`/`codex@`

refresh 절차가 적용된다는 것은 `skipped@`가 stale해질 수 있다는 뜻이다. 면제를
제거하고, `spec`은 경로 비교, `impl`은 §5.1 판정을 리시트 토큰과 무관하게
적용한다. 결과적으로 "stale + `⊘`" 조합이 표현 가능해지며, 이것이 §3.1에서
`state` 단일 문자열을 폐기하는 직접적 이유다.

### 5.3 `plan` — 승인 토큰 화이트리스트 확장

`parsePlanReceipt`(`workflow-enrich.js:27`)가 `user@` + 정확히 40hex만 받는다.
`triage@`/`codex@` refresh 경로(§2.1)를 계약이 정의했으므로 이 세 토큰을 받도록
확장한다. `skipped@`와 그 밖의 토큰은 계속 거부한다 — `plan_review`에는 skip 값이
없고, 짧은 SHA를 거부하는 기존 엄격함(권한을 짧은 해시로 얻는 것을 막는 것)은
유지한다.

신선도는 현행 `planFreshness`(경로 변경 + 워크트리 dirty, 3-state)를 그대로
쓴다. 토큰과 무관하게 동작하므로 변경이 없다.

### 5.4 `spec` — 변경 없음

경로 기반 판정(`git log <sha>..HEAD -- <spec_id>`)을 유지한다. 스펙은 공유
체크아웃에서 저작·게시되므로 base 히스토리에 존재하고, 현행 규칙이 정확히
작동한다(1ub0 사례). §5.2의 skip 면제 제거만 적용된다.

## 6. 진행중 표시 — glow에서 깜빡임으로

- 애니메이션: `opacity: 1 ↔ 0.42`, 1.4s `ease-in-out` infinite. 색을 건드리지
  않아 단계색이 유지되고, 애니메이션 속성이 하나라 스테이지별 keyframe이 필요
  없다.
- 대상: `status ∈ {in_progress, resolved}`일 때 route 순서상 **첫 `fill === 'dim'`
  이고 `stale === false`인 칸**. stale 칸은 "진행 중"이 아니라 "조치 필요"이므로
  제외한다. 현행은 `state === 'dim'`을 보므로 stale이 자동 제외됐는데, 필드
  분리 후에는 stale이 `fill`을 `dim`으로 강등하므로 조건을 명시해야 한다.
- `prefers-reduced-motion: reduce`에서는 애니메이션을 끄고 **기존 glow로 대체**
  한다. 정지만 하면 현재 칸을 식별할 수단이 사라진다. 현행 인라인
  `color: var(--stage-<c>-on)`을 유지해 `currentColor` 기반 glow가 그대로
  성립한다. 깜빡임 칸은 §3.1의 불변식에 의해 항상 `glyph === null`이므로, 이
  인라인 색이 글리프 가독성에 영향을 주지 않는다.
- CSS 클래스명을 `glow`에서 `cur`로 바꾼다. 클래스가 이제 "현재 칸"을 뜻하고
  표현은 모션 설정에 따라 갈리므로, 표현 이름을 클래스에 남기지 않는다.
  `.stp .glow`는 이 저장소에서 스텝퍼 외 사용처가 없다(실측:
  `app/styles/base.css:710`과 `app/views/board/stepper.js`뿐이며 `--glow-current`
  토큰도 스텝퍼 전용).

## 7. stale 시각 구현

```css
.stp .bar.stale {
  color: var(--text-title);
  box-shadow: inset 0 -3px 0 var(--accent-warn);
}
```

`background` 선언을 제거하고, `segTemplate`이 `stale` 칸에 `dim`을 함께 붙여
흐린 단계색을 얻는다(`bar b-<c> dim stale`). 현행은 `dim` 없이 `b-<c> stale`만
붙이므로 배경이 회색으로 남는 것이 §1.1의 직접 원인이다.

글리프 색을 `--text-title`로 올린다. 흐린 채움 위에서 기본 글리프 색
(`var(--bg-app)`)은 대비가 부족하고, `--text-title`은 다크(`#dbe2ee`)와
라이트(`#1a2233`)가 자동 반전되므로 테마별 분기가 필요 없다. 앰버는
`--accent-warn` 기존 토큰을 쓴다.

16px 막대에서 3px 밑줄을 택한 이유는 1px 테두리가 축소 화면과 라이트 테마에서
놓치기 쉽고, 사선 패턴은 글리프와 겹쳐 글리프 가독성을 떨어뜨리기 때문이다.

## 8. 접근성 — 컨테이너 단일 라벨

`role="img"`가 자식 접근성 이름을 대체하므로(§1.5), 개별 `seg`에 라벨을 붙이는
방식은 성립하지 않는다. `.stp` 컨테이너의 `aria-label` 하나에 전 단계 상태를
합쳐 넣는다. `role="img"`는 유지한다 — 스텝퍼는 단일 그래픽 정보 단위이고,
상호작용 요소가 없다.

라벨 문구는 세 필드 조합에서 기계적으로 생성하며, 스테이지별 특수 어휘를 두지
않는다.

| 조건 | 문구 |
|---|---|
| `fill === 'none'` | 미도달 |
| `fill === 'dim'`, `stale === false` | 진행 중 |
| `stale === true` | 재검토 필요 |
| `fill === 'full'`, `glyph === 'review'` | 검토 완료 |
| `fill === 'full'`, `glyph === 'skip'` | 검토 생략 |
| `fill === 'full'`, `glyph === null` | 완료 |

결과 예: `aria-label="워크플로우 진행: spec 검토 완료 · impl 진행 중 · pr 미도달
· merge 미도달"`.

## 9. 변경 범위

### 9.1 서버

`server/workflow-enrich.js`

- `classifyGlyph(receipt)` 신설 — §2 표. 계약 열거 토큰 집합을 모듈 상수로 두고
  그 출처(`workflow.md:115`)를 주석에 적는다.
- `parsePlanReceipt` 확장 — `user`/`triage`/`codex` + 정확히 40hex (§5.3).
- `implFreshness(workspace_root, receipt_sha, bead_id)` 신설 (§5.1). 기존 `runGit`
  헬퍼를 재사용하고 캐시를 쓰지 않는다.
- `computeStaleWithHead` — skip 면제 제거(§5.2), impl 판정을 `implFreshness`로
  교체. `bead_id`를 인자로 받도록 확장한다. 공개 래퍼 `computeStale(metadata,
  workspace_root)`도 `bead_id`를 받도록 확장한다 — 현재 소비처는 테스트뿐이므로
  (실측) 호출부 파급은 테스트에 한한다.
- `enrichIssueWorkflow` — `issue.id`를 `bead_id`로 전달. JSDoc 시그니처에 `id`를
  추가한다(`enrichIssuesWorkflow`가 이미 전체 issue를 넘기므로 호출부 변경은
  없다).
- `specStage`/`planStage`/`implStage`/`pr`/`mergeStage` — 반환 타입을
  `{fill, glyph, stale, receipt}`로 교체(§3.1, §4).
- `WorkflowStage` typedef 교체.

### 9.2 프론트엔드

`app/views/board/stepper.js`

- `segTemplate` — `state` 분기를 `fill`/`glyph`/`stale` 매핑으로 교체. `full`
  채움에 `.b-<c>.full` 클래스를 쓰고, stale 칸에 `dim`을 함께 붙인다(§7).
- `GLYPH` 상수를 `{review: '✓', skip: '⊘'}`로 교체.
- `glowStageKey` → `currentStageKey`, 조건에 `!stale` 추가(§6).
- `glow` → `cur` 클래스명 변경(§6).
- `stepperTemplate` — 컨테이너 `aria-label` 조립(§8).
- `ROUTE_ORDER`/`STAGE_CLASS`/`STAGE_LABEL`은 변경 없음.

`app/styles/base.css`

- `.b-*.on` 5개 규칙을 `.b-*.full`로 리네임(라벨의 `.l-*.on`은 다른 축이므로
  유지).
- `.stp .bar.stale` 규칙 교체(§7).
- 깜빡임 keyframe + `.stp .cur` 규칙 + `prefers-reduced-motion` 대체(§6).
- `.stp .glow` 제거.

### 9.3 영향 없음 (실측 확인)

- `app/views/detail-panel/index.js:658,679,685` — `stages.*.stale` 불리언을
  소비해 `· stale` 텍스트를 붙인다. `stale`이 필드로 유지되므로 코드 변경 없이
  새 판정 규칙이 반영된다.
- `app/views/worker/lanes.js:327` — `stepperTemplate`을 재사용하므로 자동 반영.
- `server/worker/admission.js` — 리시트 형식 검사만 하고 글리프 분류와 무관하다.

`app/views/board/card.test.js`는 단정문 자체는 영향받지 않지만(`.stp .seg` 개수와
스텝퍼 토글만 검증) `stages` 픽스처가 `state` 키를 쓰므로 새 필드로 교체가
필요하다. 기대값은 그대로다.

### 9.4 테스트

- `app/views/board/stepper.test.js` — `state` 기반 기대를 필드 기반으로 전량
  교체. 신규: 계약 열거 밖 토큰의 글리프 없음, `plan`의 `user@`(글리프 없음) 대
  `codex@`(`✓`), stale + `⊘` 조합, `cur`가 stale 칸을 건너뛰는지,
  `aria-label` 문구.
- `server/workflow-enrich.test.js`
  - `impl_stale is true when HEAD != receipt sha`(145행) / `false when HEAD ==`
    (156행): 폐기. Bead 브랜치 기반 케이스로 교체 — tip 일치(fresh), tip 이후
    커밋 추가(stale), 브랜치 부재(fresh), `bead_id` 부재(fresh), **무관한
    distractor 브랜치가 리시트 SHA를 가리키는데 Bead 브랜치는 전진한 경우
    (stale)**.
  - 신규: `classifyGlyph` 토큰 분류, `parsePlanReceipt`의 3토큰 수용과
    `skipped@`/짧은 SHA 거부, skip 리시트의 stale 판정, `implStage`의 리시트 없는
    `resolved`/`closed` → `full`.

### 9.5 빌드와 배포

프론트엔드 소스를 수정하므로 `npm run build` 후 `app/main.bundle.js`와
`app/main.bundle.js.map`을 함께 커밋한다. 머지 후에는 `AGENTS.md`의 Post-Merge
Runtime Validation을 따라 `bdui-shared restart`를 실행하고, 프로세스 실행 경로·
리스닝 포트·HTTP 응답을 확인한 뒤에 완료를 선언한다.

## 10. 범위 밖

- **`plan_review`에 `skipped@`가 관측될 때의 계약 처분**: 계약은 `plan_review`에
  skip 값이 없다고 하므로 이 스펙은 그것을 승인으로 인정하지 않는다(§5.3). 계약이
  이 조합을 명시적으로 금지·정의하게 하는 것은 별개 계약 표면이다.
- **`plan_check`를 plan 칸 글리프 근거로 승격**: `plan_check`는 실제 리뷰
  증거이지만 계약이 "evidence only — no gate authority"로 못 박았고 SHA 체계도
  다르다(초안 sha256-12, 40hex 아님). 게이트 글리프로 올릴 수 없다.
- **`pr` 칸에 CI 상태 반영**: `pr`의 `dim`을 CI 대기로 쓰는 안은 워크플로우
  enrich가 CI 상태를 갖고 있지 않아 성립하지 않는다.
- **스텝퍼 자체를 숨기는 표시 정책**: 리시트도 PR도 없는 완료 Bead에서 스텝퍼를
  감추고 완료 배지로 대체하는 안. §4.1로 impl이 채워지므로 필요가 줄었고, 표시
  정책 토글은 별도 표면이다.

## 11. 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
  `npm run build` (AGENTS.md Pre-Handoff Validation).
- `enrichIssuesWorkflow`를 dotfiles·beads-ui 양쪽에 재실행해 상태 분포가 의도대로
  이동했는지 실측한다. 기대: dotfiles의 stale이던 impl 1건이 fresh + `✓`로,
  `resolved`인 impl `dim` 4건이 `full`로 이동.
- `bdui-shared restart` 후 실제 카드에서 `dotfiles-1ub0`의 spec 칸(흐린 teal +
  `✓` + 앰버 밑줄)과 `dotfiles-28dy`의 impl 칸(밝은 violet + `✓`)을 육안
  확인한다.
- 이 저장소는 GitHub Actions가 트리거되지 않으므로(AGENTS.md) PR 체크 부재는
  즉시 통과로 처리한다.
