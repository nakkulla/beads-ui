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
브랜치 tip에서 발급되고 이 저장소는 스쿼시 머지를 쓰므로, 그 SHA는 base 히스토리에
**들어올 수 없다**. 실측:

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

`aria-label`이 `"워크플로우 진행 스테퍼"` 고정 문자열이다
(`app/views/board/stepper.js:127`). 스텝퍼가 전달하는 정보 전체가 색·글리프에만
있어 스크린리더로는 아무 진행 상태도 읽을 수 없다. 이 스펙이 상태→시각 매핑을
재정의하므로, 같은 상태 집합을 텍스트 채널에도 부여한다(§8.2).

## 2. 계약 경계 — 글리프 축은 beads-ui 소유가 아니다

`dotfiles-f6de`(PR #333, 머지 커밋 `d42e6d9d`)가 `docs/contracts/workflow.md:115`에
글리프 분류를 beads-ui에 대한 규범으로 명문화했다.

> reviewer tokens (`codex`/`opus`/`fable`/`self`/`triage`) are all review evidence,
> and only `skipped@` is authority without review, so a beads-ui card glyph follows
> exactly that split — `✓` for review evidence, `⊘` for `skipped@`. Consumers give
> `self@` no separate mark of its own.

`AGENTS.md`가 정한 대로 beads-ui는 이 계약의 소비자다. 따라서:

| 글리프 | 조건 | 소유 |
|---|---|---|
| `✓` | 리뷰 증거 리시트 — 임의 리뷰어 토큰 | 계약 |
| `⊘` | `skipped@` **전용** | 계약 |
| 없음 | 리시트 없음, 또는 리시트 개념이 없는 단계 | 계약 |

`self@`에 별도 표식을 주는 것도 계약이 금지한다. 검토 초기에 고려했던
"정상 완료에는 글리프를 붙이지 않고 예외만 표시" 안은 `✓`를 없애므로 이 계약과
충돌하며, 채택하지 않는다.

f6de가 실측한 대로 beads-ui 코드는 이미 이 계약과 정합하다 — `RECEIPT_RE`
(`server/workflow-enrich.js:24`)가 임의 리뷰어 토큰을 받고 `is_skip`은
`reviewer === 'skipped'`일 때만 참이며, `server/worker/admission.js:43`에도
리뷰어 화이트리스트가 없어 `self@`가 이미 통과한다.

### 2.1 `plan_review`는 글리프 분류 대상이 아니다

계약이 같은 단락에서 `plan_review`를 "not a gate receipt: it has no reviewer
selector and no skip value"로 명시한다. 글리프 분류는 리뷰어 토큰 대 `skipped@`의
이분법이므로 `plan_review`는 그 대상 밖이고, plan 칸은 글리프 없음이다.

`plan_review = user@`가 의미론적으로 `skipped@`와 같은 계층(리뷰 증거가 아닌 승인
권한)인 것은 사실이며, `workflow.md:133`의 disposition click이 그것을 보여준다 —
동일한 사용자 클릭이 spec에서는 `skipped@`, plan에서는 `user@`로 기록된다. 그러나
`⊘`를 부여하지 않는다: `skipped@`는 spec/impl에서 "정상 경로를 우회했다"를 뜻해
표식할 가치가 있지만, plan에서 `user@`는 우회가 아니라 유일하고 정상적인 승인
형태이므로 `⊘`가 모든 full_plan Bead에 100% 켜진다. 예외 없이 상시 켜지는 예외
표식은 정보량이 0이고, spec/impl의 진짜 `⊘`를 묻는다.

이 판단은 계약 문자와 어긋나지 않으므로 정합 부채를 만들지 않는다. `⊘`의 기준이
토큰 문자인지 의미인지를 계약이 명시하게 하는 것은 별개 계약 표면이며 이 단위
범위 밖이다(§9).

## 3. 시각 3축 분리

| 축 | 소유 | 값 |
|---|---|---|
| 글리프 | 계약 | `✓` / `⊘` / 없음 |
| 채움 | beads-ui | 회색 / 흐린 단계색 / 밝은 단계색 |
| 신선도 | beads-ui | fresh / **stale = 흐린 채움 + 앰버 밑줄** |

`stale`을 `⚠`로 표시하지 않는다. `codex@` 리시트는 stale이어도 계약상 여전히 리뷰
증거이고 계약이 그것에 `✓`를 요구하므로, 글리프 축을 신선도 표시에 쓸 수 없다.
대신 채움을 `dim`으로 강등하고 앰버 밑줄을 얹는다.

이 구조가 stale의 실제 의미와 맞는다. 게이트 권한 관점에서 stale은 "리뷰 안 받음"과
동급이고(계약: 권한 사용은 리시트 SHA가 현재 대상과 일치할 것을 요구), 따라서
취해야 할 행동이 같으므로 채움이 `dim`(리뷰 대기)과 같은 레벨인 것이 옳다. 남은
`✓`가 "리뷰 이력은 있다 = 델타만 처리하면 닫힌다"를 전달한다. 두 정보가 다른 축에
있어 충돌하지 않는다.

### 3.1 서버 상태 어휘는 변경하지 않는다

현행 `state` 6값이 위 3축을 이미 정확히 표현한다.

| `state` | 채움 | 글리프 | 신선도 |
|---|---|---|---|
| `empty` | 회색 | 없음 | — |
| `dim` | 흐린 단계색 | 없음 | fresh |
| `on` | 밝은 단계색 | 없음 | fresh |
| `reviewed` | 밝은 단계색 | `✓` | fresh |
| `skip` | 밝은 단계색 | `⊘` | fresh |
| `stale` | 흐린 단계색 | `✓` | **stale** |

이 표의 글리프 열은 `plan`을 제외한 스테이지에 적용된다. `plan`은 계약상 글리프
분류 대상이 아니므로 어떤 상태에서도 글리프가 없다(§2.1, §4.2).

`on`과 `reviewed`를 통합하지 않는다 — 글리프가 다르고, 그 차이가 계약이 요구하는
"리뷰 증거 유무"다. `stale` 칸의 글리프는 항상 `✓`인데, `computeStaleWithHead`가
`!receipt.is_skip`을 요구하므로 `skipped@` 리시트는 stale 판정 대상이 아니기
때문이다. `GLYPH`의 `stale: '✓'`(`app/views/board/stepper.js:45`)는 그대로 유지된다.

## 4. 스테이지별 진입 규칙

| | 회색(`empty`) | 흐린 채움(`dim`) | 밝은 채움(`on`/`reviewed`/`skip`) |
|---|---|---|---|
| **spec** | `spec_id` 없음 | 리시트 없음 · **`stale`** | 리시트 유효 → `reviewed` · `skipped@` → `skip` |
| **plan** | `plan_path` 없음 | 승인 없음 / 무효 리시트 · **`stale`** | `plan_review` 유효 → `reviewed` · 키 부재 + `resolved`/`closed` → `on` |
| **impl** | 미착수 | `in_progress` 또는 `pr_url` 있음 · **`stale`** | 리시트 유효 → `reviewed` · `skipped@` → `skip` · **리시트 없고 `resolved`/`closed` → `on`** |
| **pr** | `pr_url` 없음 | *(사용하지 않음)* | `pr_url` 있음 → `on` |
| **merge** | PR 없음 | `pr_url` + `resolved` | `closed` → `on` |

`plan`의 `state` 반환값은 현행 `planStage`가 `reviewed`/`stale`/`on`/`dim`/`empty`를
쓰는 방식을 유지한다(§3.1 표의 글리프는 `reviewed`에 `✓`가 붙는 것을 뜻하지만,
plan에는 글리프를 붙이지 않으므로 §4.2에서 예외를 정의한다).

### 4.1 신규 규칙 — 리시트 없는 완료도 impl을 채운다

`implStage`에서 리시트가 없고 status가 `resolved`/`closed`면 `on`을 반환한다
(현행은 `dim`). `resolved`는 그 자체로 구현 완료 사실이다. 리시트가 없으니 글리프도
없어, 리시트로 채워진 impl(`✓`)과 오히려 정확히 구분된다 — 계약의 split이 여기서
그대로 작동한다. §1.3의 4건이 이 규칙으로 해소된다.

`in_progress`와 `pr_url` 존재는 계속 `dim`이다.

### 4.2 plan 칸 글리프 억제

`plan`의 `reviewed` 상태에는 `✓`를 붙이지 않는다(§2.1). `stepperTemplate`에서
스테이지 키가 `plan`일 때 글리프를 비운다. 채움·라벨 색·신선도 표시는 다른
스테이지와 동일하게 적용된다.

### 4.3 `pr`은 흐린 채움을 쓰지 않는다

"PR이 있다"는 이진 사실이고, 머지 대기는 `merge`의 흐린 채움이 이미 표현한다.
모든 스테이지가 3단을 채워야 한다는 규칙은 두지 않으며, §4 표가 각 스테이지가
갖는 값의 유일한 근거다.

## 5. impl 신선도 판정 교체

`head !== receipt.sha` 비교를 폐기하고 **브랜치 tip 비교**로 대체한다.

```
implFreshness(workspace_root, receipt_sha) -> 'fresh' | 'stale' | 'unknown'
  workspace_root 또는 receipt_sha 부재        -> 'unknown'
  git branch --points-at <sha> 실패            -> 'unknown'
  git branch --points-at <sha> 비어 있지 않음  -> 'fresh'
  git branch --contains <sha> 실패             -> 'unknown'
  git branch --contains <sha> 비어 있지 않음   -> 'stale'
  그 외                                        -> 'unknown'
```

`unknown`은 기존 fail-quiet 원칙대로 `stale=false`로 접힌다. 판정 근거:

- 워크트리 브랜치 tip == 리시트 SHA → `fresh`. 28dy가 여기 해당해 정상 복귀한다.
- impl 리뷰 후 그 브랜치에 커밋이 더 들어감 → tip이 리시트를 포함하지만 tip이
  아니다 → `stale`. REVISE 배치 수정이 정확히 이 모양이고, 이것이 이 판정이 잡으려는
  유일한 신호다.
- 머지 후 브랜치 삭제 → 포함 브랜치 0개 → `unknown` → `fresh`. 머지된 작업은
  더 이상 신선도 판정 대상이 아니므로 옳다.
- 리시트 SHA가 리포에 없음 → `--contains` 실패 → `unknown` → `fresh`.

로컬 브랜치만 조회한다(`-a` 없음). 워크트리 브랜치는 로컬에 존재하고, 원격 참조까지
넓히면 삭제된 로컬 브랜치의 잔여 원격 참조가 오판정을 만든다.

**캐시하지 않는다.** 기존 `stale_cache`는 HEAD를 키로 삼는데, 워크트리에서 커밋해도
공유 체크아웃 HEAD는 움직이지 않으므로 브랜치 tip 변경을 무효화하지 못한다.
`pathDirty`가 같은 이유로 캐시를 우회하는 선례가 있다. 비용은 `impl_review`를 가진
카드당 git 셸 1–2회이며, 실측 분포에서 dotfiles 19건 중 1건이다.

`spec_review`의 경로 기반 판정은 변경하지 않는다 — 스펙은 공유 체크아웃에서
저작·게시되므로 base 히스토리에 존재하고, 현행 규칙이 정확히 작동한다(1ub0 사례).

## 6. 진행중 표시 — glow에서 깜빡임으로

- 애니메이션: `opacity: 1 ↔ 0.42`, 1.4s `ease-in-out` infinite. 색을 건드리지 않아
  단계색이 유지되고, 애니메이션 속성이 하나라 스테이지별 keyframe이 필요 없다.
- 대상: `status ∈ {in_progress, resolved}`일 때 route 순서상 **첫 `dim` 칸**. 현행
  `glowStageKey`의 판정을 그대로 쓴다. `stale`은 `state === 'dim'`이 아니므로 자동
  제외되며, 이는 의도한 결과다 — stale은 "진행 중"이 아니라 "조치 필요"다.
- `prefers-reduced-motion: reduce`에서는 애니메이션을 끄고 **기존 glow로 대체**한다.
  정지만 하면 현재 칸을 식별할 수단이 사라진다. 현행 인라인
  `color: var(--stage-<c>-on)`을 유지해 `currentColor` 기반 glow가 그대로 성립한다.
  깜빡임 칸은 글리프가 없으므로(첫 `dim` 칸) 이 인라인 색이 글리프 가독성에 영향을
  주지 않는다.
- CSS 클래스명을 `glow`에서 `cur`로 바꾼다. 클래스가 이제 "현재 칸"을 뜻하고 표현은
  모션 설정에 따라 갈리므로, 표현 이름을 클래스에 남기지 않는다. `.stp .glow`는
  이 저장소에서 스텝퍼 외 사용처가 없다(실측: `app/styles/base.css:710`과
  `app/views/board/stepper.js`뿐이며 `--glow-current` 토큰도 스텝퍼 전용).

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
놓치기 쉽고, 사선 패턴은 글리프와 겹쳐 `✓` 가독성을 떨어뜨리기 때문이다.

## 8. 변경 범위

### 8.1 서버

`server/workflow-enrich.js`

- `implFreshness()` 신설(§5). 기존 `runGit` 헬퍼를 재사용하고 캐시를 쓰지 않는다.
- `computeStaleWithHead`의 `impl_stale` 산출을 `implFreshness(...) === 'stale'`로
  교체. 반환 형태(`{spec_stale, impl_stale, spec_receipt, impl_receipt}`)는 유지해
  `computeStale`/`enrichIssueWorkflow` 호출부가 그대로 동작한다.
- `implStage`: 리시트 없음 + `resolved`/`closed` → `on`(§4.1).

### 8.2 프론트엔드

`app/views/board/stepper.js`

- `segTemplate`의 `stale` 분기에 `dim` 클래스 추가(§7).
- 스테이지 키가 `plan`일 때 글리프 억제(§4.2).
- `glow` → `cur` 클래스명 변경(§6). 판정 함수 `glowStageKey`의 로직은 유지하되
  이름을 `currentStageKey`로 맞춘다.
- `aria-label`을 상태 포함으로 확장한다. 현행은 "워크플로우 진행 스테퍼" 고정
  문자열이라 스크린리더가 진행 상태를 전혀 읽지 못한다. 각 `seg`에 스테이지명과
  상태를 한국어로 부여한다(예: `spec 리뷰 완료`, `impl 진행 중`, `spec 리뷰 필요
  — 리뷰 이력 있음`).

`app/styles/base.css`

- `.stp .bar.stale` 규칙 교체(§7).
- 깜빡임 keyframe + `.stp .cur` 규칙 + `prefers-reduced-motion` 대체(§6).
- `.stp .glow` 제거.

### 8.3 영향 없음 (실측 확인)

- `app/views/detail-panel/index.js:658,679,685` — `stages.*.stale` 불리언을 소비해
  `· stale` 텍스트를 붙인다. impl 판정 규칙 교체가 코드 변경 없이 반영된다.
- `app/views/worker/lanes.js:327` — `stepperTemplate`을 재사용하므로 자동 반영.
- `app/views/board/card.test.js` — `.stp .seg` 개수와 스텝퍼 토글만 검증하고 글리프
  ·클래스 기대가 없다.
- `server/worker/admission.js` — 리뷰어 화이트리스트가 없어 `self@`가 이미 통과.

### 8.4 테스트

- `app/views/board/stepper.test.js`
  - `stale state downgrades ✓ to grey`(135행): `dim` 클래스 존재와 `stale` 클래스
    공존을 기대하도록 교체.
  - glow 테스트 2건(150·172행): 클래스명 `cur`로 교체.
  - 신규: plan 칸 글리프 억제, 리시트 없는 `resolved`의 impl `on`, `aria-label` 상태
    반영.
- `server/workflow-enrich.test.js`
  - `impl_stale is true when HEAD != receipt sha`(145행) / `false when HEAD ==`
    (156행): 폐기. 브랜치 tip 기반 케이스로 교체 — tip 일치(fresh), tip 이후 커밋
    추가(stale), 브랜치 삭제(fresh), SHA 부재(fresh).
  - 신규: `implStage`의 리시트 없는 `resolved`/`closed` → `on`.

### 8.5 빌드와 배포

프론트엔드 소스를 수정하므로 `npm run build` 후 `app/main.bundle.js`와
`app/main.bundle.js.map`을 함께 커밋한다. 머지 후에는 `AGENTS.md`의 Post-Merge
Runtime Validation을 따라 `bdui-shared restart`를 실행하고, 프로세스 실행 경로·
리스닝 포트·HTTP 응답을 확인한 뒤에 완료를 선언한다.

## 9. 범위 밖

- **`⊘` 기준의 계약 정정**: 토큰 문자(`skipped@`)인지 의미(리뷰 증거 없는 승인)인지를
  계약이 명시하게 하는 것. `plan_review = user@`가 이 경계에 걸려 있다(§2.1). 현재
  beads-ui 표시가 계약 문자와 일치하므로 정합 부채가 없어 이번 단위에 넣지 않는다.
  재진입 조건: 비리뷰어 토큰이 리시트 어휘에 추가될 때, 또는 계약 쪽에서 이 기준을
  명시할 때.
- **`plan_check`를 plan 칸 글리프 근거로 승격**: `plan_check`는 실제 리뷰 증거이지만
  계약이 "evidence only — no gate authority"로 못 박았고 SHA 체계도 다르다
  (초안 sha256-12, 40hex 아님). 게이트 글리프로 올릴 수 없다.
- **`pr` 칸에 CI 상태 반영**: `pr`의 흐린 채움을 CI 대기로 쓰는 안은 워크플로우
  enrich가 CI 상태를 갖고 있지 않아 성립하지 않는다. 카드 칩(`chips.pr`)이 별도
  경로로 CI를 표시하는지는 이 단위와 무관하다.
- **스텝퍼 자체를 숨기는 표시 정책**: 리시트도 PR도 없는 완료 Bead에서 스텝퍼를
  감추고 완료 배지로 대체하는 안. §4.1로 impl이 채워지므로 필요가 줄었고, 표시
  정책 토글은 별도 표면이다.

## 10. 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
  `npm run build` (AGENTS.md Pre-Handoff Validation).
- `enrichIssuesWorkflow`를 dotfiles·beads-ui 양쪽에 재실행해 상태 분포가 의도대로
  이동했는지 실측한다. 기대: dotfiles의 `impl stale:1`이 `reviewed`로,
  `resolved`인 `impl dim:4`가 `on`으로 이동.
- `bdui-shared restart` 후 실제 카드에서 `dotfiles-1ub0`의 spec 칸(흐린 teal + `✓`
  + 앰버 밑줄)과 `dotfiles-28dy`의 impl 칸(밝은 violet + `✓`)을 육안 확인한다.
- 이 저장소는 GitHub Actions가 트리거되지 않으므로(AGENTS.md) PR 체크 부재는
  즉시 통과로 처리한다.
