---
scope:
  - generated/contracts/
  - server/worker/quick-fix-handoff.js
  - server/worker/quick-fix-handoff.test.js
  - server/worker/quick-fix-handoff.cross-runtime.test.js
  - server/worker/__fixtures__/quick-fix-handoff-cases.json
  - server/worker/artifact-scope.js
  - server/worker/artifact-scope.test.js
  - server/worker/attach.js
  - server/worker/attach.test.js
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/workflow-enrich.js
  - server/workflow-enrich.test.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/detail-panel/index.js
  - app/views/detail-panel/index.test.js
  - app/styles.css
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-r7or — quick_fix self-review 투영 소비

## 1. 배경과 소유권 경계

dotfiles가 `quick_fix_handoff` 계약을 정의하고
`generated/contracts/quick-fix-handoff.json`으로 투영한다(dotfiles-8gea, PR
\#434 병합). beads-ui는 그 투영의 **소비자**다. 술어·영수증 형식·delta
self-review 레인의 절차는 모두 dotfiles가 소유하며 이 저장소는 복제하지 않는다.

투영이 정하는 것은 세 가지다.

- **필수 섹션**: `출처/배경`, `기대 효과`, `영향 surface와 경계`, `검증 bundle`
- **`## scope` 선언 상태**: `declared_scope`여야 통과
- **`baseline_red` 줄**: `issue_type == bug`일 때 `검증 bundle` 섹션 안에 필요
- **영수증 `quick_fix_review`**: `<reviewer>@<sha256-12-hex>`, digest는 본문
  UTF-8 바이트의 sha256 앞 12자리

`enforcement`는 `advisory`다. 따라서 이 설계의 **어떤 표시도 적재를 막지
않는다.**

### 투영이 싣지 않는 것

투영은 regex는 실어 보내지만 파서 역학과 scope 항목 거부 규칙은 토큰 이름만
남긴다. 이 둘이 dotfiles checker와 어긋날 수 있는 **유일한 면**이므로 §7이
따로 다룬다.

| 기계가 읽을 수 있는 것 | 토큰 이름만 있는 것 |
| --- | --- |
| `checks.sections.heading_regex` / `label_regex` | `text_model` 5개 토큰 (줄 나눔·trim 문자셋·섹션 시작/끝·중복) |
| `description_scope.section.collect.item_line_regex` | `description_scope.item.rules: "artifact_scope_item"` — **거부 목록 자체가 없다** |
| `checks.baseline_red.line_regex` | |
| `receipt.format_regex` | |

## 2. 투영 pin

`execution-defaults`·`repo-operation-policy`와 같은 provenance-pinned 방식으로
두 파일을 커밋한다.

- `generated/contracts/quick-fix-handoff.json`
- `generated/contracts/quick-fix-handoff.provenance.json`

pin 값은 dotfiles `origin/main`에서 읽어 UI-r7or notes에 기록해 두었다.

```json
{
  "source_repo": "dotfiles",
  "source_path": "generated/contracts/quick-fix-handoff.json",
  "source_commit": "0220a0b58a488581e06edf1530aba154695f82e9",
  "source_blob_sha": "c627b14e502e83a1fb40c346363354c62f13ac09",
  "sha256": "7a9b5d7175229e7597807f49c0812986be0885523abd9d73b87f1e6d6472116e",
  "bytes": 2996
}
```

검증은 `execution-defaults.js`의 `provenanceMatches`와 같다: 바이트 수,
sha256, 그리고 **그 바이트로 다시 계산한 git blob 이름**이 모두 맞아야 한다.
blob 이름 재계산이 있어야 다른 리비전에서 복사해 온 provenance가 걸러진다.

## 3. 판정 모듈 `server/worker/quick-fix-handoff.js`

투영 적재와 판정을 한 모듈이 소유한다.

```js
/**
 * @typedef {Object} QuickFixHandoffLoad
 * @property {number|null} schema_version
 * @property {boolean} supported
 * @property {string|null} source_commit
 * @property {Record<string, any>|null} rules
 */

/** 프로세스당 한 번 읽는다. 주입 fs는 캐시를 건너뛴다. */
export function loadQuickFixHandoff(deps = {}) {}

/**
 * @typedef {Object} QuickFixHandoffState
 * @property {'reviewed'|'stale'|'unreviewed'|'unknown'} state
 * @property {string[]} missing
 * @property {string|null} digest
 */

/**
 * route가 quick_fix가 아니면 `null`(판정 대상 아님).
 * 투영을 못 읽으면 `state: 'unknown'`(판정 불가).
 */
export function judgeQuickFixHandoff(issue, deps = {}) {}
```

`null`과 `unknown`을 구분하는 것이 핵심이다. 전자는 "물어볼 일이 아니다",
후자는 "물어봤는데 답할 수 없다"이며, 화면에서 둘은 같은 결과(표시 없음)로
수렴하지만 판정 경로가 다르다.

### 3.1 state와 missing은 독립이다

dotfiles checker의 `evaluate`가 그렇듯, `state`는 **영수증과 digest만** 보고
정해진다. 섹션·scope·`baseline_red`는 `missing[]`에만 들어간다.

따라서 `state: 'reviewed'`면서 `missing`이 비어 있지 않은 조합이 존재한다.
digest는 본문 전체를 덮으므로 본문이 바뀌면 `stale`이 된다 — 그러므로 이
조합은 "영수증을 쓴 뒤 섹션이 빠진" 경우가 아니라, **지금 이 본문 그대로
영수증이 쓰였는데 그 본문이 checker의 게이트를 통과하지 못하는** 경우다.
checker의 게이트 모드는 `missing`이 있으면 영수증을 찍지 않으므로, 이 조합은
`--verify` 관측만 하고 영수증을 손으로 쓴 경로에서 나온다. 모듈은 판단하지
않고 두 값을 각각 그대로 낸다.

### 3.2 scope 판정은 기존 파서를 재사용한다

`server/worker/artifact-scope.js`의 `parseDescriptionScope`가 이미 투영의
`description_scope` 규칙을 구현하고 있다. 두 번째 scope 파서를 만들지 않는다
— 한 Bead에는 하나의 scope 출처가 있어야 하고, 파서가 둘이면 그 원칙이 코드
수준에서 깨진다. `null` → `undeclared`, `[]` → `empty_declaration`,
비어 있지 않음 → `declared_scope`로 사상한다.

## 4. 계산 자리

`server/workflow-enrich.js`의 `enrichIssueWorkflow` **한 곳**이 판정을 붙인다.

```js
workflow.quick_fix_review = { state, missing, digest }; // route === 'quick_fix' 이고 판정 대상일 때만
```

이 함수는 세 소비처가 이미 모두 통과하는 지점이다.

| 소비처 | 경유 | 얻는 화면 |
| --- | --- | --- |
| `server/list-adapters.js` | `enrichIssuesWorkflow` | Worker 콘솔 후보 레인, 보드 상세 |
| `server/worker/runnable-cache.js` | `enrichIssueWorkflow` | 모니터 실행가능 레인 |
| `server/worker/title-cache.js` | `enrichIssueWorkflow` | 큐 행 |

`bd list --json` 행은 `description`·`issue_type`·`metadata`를 모두 싣고 오므로
추가 `bd` 호출이 없다. 모니터 push는 `description_scope`·`scope_spec_id`만
벗기고 `workflow`는 통째로 실어 보내므로 배선도 추가되지 않는다.

클라이언트는 계산하지 않고 `workflow.quick_fix_review`를 읽어 그리기만 한다.
브라우저의 sha256은 `crypto.subtle` 비동기뿐이라 렌더 경로에 맞지 않는다.

### 4.1 admission은 건드리지 않는다

Bead 본문은 "admission·runnable-cache·클라이언트 후보 계산"을 소비처로
적었으나, admission은 이 판정으로 **아무 결정도 하지 않는다**(`advisory`,
새 거부 사유 없음). 판정을 admission 결과에 실어 나르는 배선은 소비자가 없는
배선이므로 만들지 않는다. `validateAdmission`의 quick_fix 분기는
`missing_description` 거부 하나로 지금과 동일하게 남는다.

실제 호출처는 둘이다: `enrichIssueWorkflow`(표시)와 `scheduler.js`(§6 프롬프트).

## 5. 표시

### 5.1 카드 칩

Worker 콘솔 "후보"와 모니터 "실행가능"은 같은 `candidateCard`
(`app/views/worker/lanes.js`)를 쓴다. 칩을 이 템플릿에 넣으면 두 레인이 함께
얻는다.

**규칙은 하나다 — 영수증이 있으면 칩이 있다. 칩의 상태가 그 영수증이 지금
본문과 맞는지를 말한다.**

| state | 칩 | 판정 |
| --- | --- | --- |
| `reviewed` | `리뷰 ✓` | 영수증 digest가 지금 본문과 같다 |
| `stale` | `리뷰 stale` | 영수증은 있으나 본문이 그 뒤로 바뀌었다 |
| `unreviewed` | 없음 | 영수증이 없거나 형식을 어겼다 |
| `unknown` | 없음 | 투영을 못 읽어 판정 자체가 불가하다 |

부정(`리뷰 없음`)이 아니라 긍정을 표시하는 이유는 **실패 방향**이다. 부정을
표시하면 칩의 부재가 "괜찮다"로 읽히고 그 안에 `unknown`이 조용히 섞인다.
긍정을 표시하면 칩의 부재가 "확인된 바 없다"로 읽혀 안전한 쪽으로 기운다.
스테퍼가 리뷰된 단계에 `✓`를 그리는 것과 같은 방향이기도 하다.

부수 효과로 대비가 좋아진다. 초록 칩이 깔린 레인에서 경고색 하나가 어긋나는
자리는, 아무것도 없는 레인의 경고색 칩 하나보다 눈에 먼저 들어온다.

### 5.2 색과 글리프

색은 스테퍼가 이미 쓰는 어휘를 그대로 가져온다 — 확인된 사실은 초록, 갱신이
필요한 사실은 경고색. 새 토큰을 만들지 않는다.

```css
.worker-card__qfr--reviewed {
  color: var(--accent-success);
  border-color: var(--stage-merge-dim);
}
.worker-card__qfr--stale {
  color: var(--accent-warn);
  border-color: var(--border-blocked);
}
```

선행 글리프는 쓰지 않는다. 같은 머리줄의 `worker-card__ineligible`이 `⛔`를
걷어낸 CSS 주석이 이유를 남겨 뒀다 — 좁은 레인(`min-width: 220px`)에서 칩
하나가 머리줄을 다 먹어 route 칩을 다음 줄로 밀어냈다. 같은 폭 예산에 칩을
하나 더 넣는 일이므로 같은 결론을 따른다. `리뷰 ✓`의 `✓`는 선행 아이콘이
아니라 라벨의 마지막 글자다.

### 5.3 배치 — route 칩과 한 묶음

`.worker-card__head`는 `flex-wrap: wrap`이고 `margin-left: auto`는 **flex 줄마다
따로** 풀린다. 그래서 새 칩을 route 칩 앞이나 뒤에 그냥 두면, 좁은 레인에서
한쪽만 다음 줄 왼쪽으로 떨어져 카드마다 칩 자리가 달라진다. 두 칩을 한
묶음으로 싸고 그 묶음이 auto 여백을 갖는다.

```html
<span class="worker-card__wfchips">
  <span class="ctl-chip ctl-chip--route">quick_fix</span>
  <span class="ctl-chip worker-card__qfr worker-card__qfr--stale">리뷰 stale</span>
</span>
```

```css
.worker-card__head .worker-card__wfchips {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  gap: var(--sp-6);
  margin-left: auto;
}
.worker-card__head .worker-card__wfchips .ctl-chip--route {
  margin-left: 0;
}
```

묶음은 칩 유무와 무관하게 **항상** 그린다. 칩이 없을 때 묶음은 route 칩
하나만 담고 auto 여백이 route 칩에서 묶음으로 옮겨 갈 뿐이라 렌더 결과가
지금과 같다. 조건부로 묶으면 같은 카드가 상태에 따라 다른 마크업을 갖게 된다.

`worker-ineligible` 음영과는 축이 다르므로 함께 나타날 수 있다. 음영은 카드
전체가 지고 self-review 칩은 테두리 색을 가진 칩이라 음영 위에서도 읽힌다.
`worker-ineligible` 칩은 왼쪽 그룹 끝, self-review 칩은 묶음 안이므로 자리도
겹치지 않는다.

### 5.4 툴팁

칩은 상태만 말하고 근거는 `title`이 말한다. 내용은 **상태 문장 하나와
`missing` 목록**이다.

- `reviewed` — `quick_fix self-review 영수증이 지금 본문과 일치합니다`
- `stale` — `quick_fix self-review 영수증이 지금 본문과 다릅니다`
- 어느 쪽이든 `missing`이 비어 있지 않으면 그 목록을 이어 붙인다

영수증 문자열 자체는 툴팁에 넣지 않는다. `workflow.quick_fix_review`는
`{state, missing, digest}`만 실어 나르고 모니터 실행가능 행은 원본 metadata를
갖지 않으므로(§4의 `exec_pins`만 있는 투영), 영수증을 툴팁에 넣으면 같은 칩이
두 레인에서 다른 내용을 말하게 된다. 영수증 원문의 자리는 상세 패널이다
(§5.5). 12자리 hex 두 개를 hover에서 눈으로 비교하는 것은 어차피 행동으로
이어지지 않는다.

### 5.5 보드 상세 패널

`app/views/detail-panel/index.js`의 `workflowTemplate`에
`quick_fix_review` 줄을 더한다. `spec_review`·`impl_review` 줄과 같은 문장
형식을 쓴다.

```
quick_fix_review    self@3f9a21c4b0e7 · stale
```

표시 조건은 `route === 'quick_fix'`이거나 metadata에 `quick_fix_review` 키가
있을 때다 — 이웃 `spec_review` 줄이 `wf.route !== 'quick_fix' ||
Object.hasOwn(md, 'spec_review')`로 쓰는 규칙을 route만 뒤집은 것이다. 값이
없으면 `없음`.

접미는 `wf.quick_fix_review.state`가 정한다: `stale`이면 `· stale`, 그 밖에는
접미 없음. `unknown`에 접미를 붙이지 않는 이유는 §6.2와 같다 — 판정 근거가
없을 때는 아무 주장도 하지 않는다.

## 6. 첫 dispatch 프롬프트

`server/worker/scheduler.js`가 quick_fix의 첫 dispatch에서 판정이 `stale`
또는 `unreviewed`면 관측 블록을 덧붙인다. 기존 `staleDispatchPrompt`와 같은
형태이며, **관측 사실과 계약 포인터만** 싣는다 — 절차 본문은 계약이 소유한다.

```
<선택된 기본 프롬프트 — §6.1의 세 갈래 중 하나>

[quick_fix self-review]
stale quick_fix_review 관측 — 영수증 `self@3f9a21c4b0e7`, 현재 본문 digest `8c1d40ffab52`.
누락: (없음)

구현에 들어가기 전에 workflow 계약의 quick_fix delta self-review 레인을 먼저 수행하라.
```

### 6.1 블록은 선택된 기본 프롬프트에 **덧붙는다**

`scheduler.js`의 `spawnBead.prompt`는 세 갈래 중 하나를 고른다.

| 조건 | 기본 프롬프트 |
| --- | --- |
| `stale_context` (기존 워크트리 채택) | `staleWorkContinuePrompt(...)` |
| `adm.stale` | `staleDispatchPrompt(...)` |
| 그 밖 | 없음 — 어댑터가 `defaultTaskPrompt`를 만든다 |

quick_fix 관측 블록은 이 선택을 **대체하지 않고 뒤에 덧붙는다.** 세 갈래
어디에서도 블록이 사라지지 않아야 하기 때문이다. 특히 `stale_context`는
route와 무관하게 걸리므로, 블록을 마지막 갈래에만 두면 워크트리를 채택한
quick_fix에서 관측이 통째로 없어진다.

세 번째 갈래에는 기본 프롬프트가 없다는 점이 중요하다. 블록을 붙이는 순간
어댑터의 기본 생성 경로가 쓰이지 않으므로, 그 갈래에서는
`defaultTaskPrompt(bead_id)`를 직접 만들어 앞에 두어야 한다. 그러지 않으면
세션이 task 프롬프트 없이 관측 블록만 받는다.

### 6.2 `unknown`은 프롬프트를 붙이지 않는다

Bead 본문은 조건을 `state !== reviewed`로 적었으나 이 설계는 **`stale`과
`unreviewed`로 좁힌다.** 이 좁힘은 현재 사용자가 spec 승인 시 명시적으로
승인한 변경이다. `unknown`은 투영을 못 읽었다는 뜻이고, 그 상태에서 세션에게
"self-review를 먼저 하라"고 지시하면 근거 없이 지시하는 것이 된다. 투영
부재·손상은 표시에서도 프롬프트에서도 fail-quiet다.

### 6.3 스냅샷에 두 필드를 더한다

`BeadSnapshot`은 `description`은 싣고 있지만 `issue_type`과
`quick_fix_review`는 싣고 있지 않다. `attach.js`의 `snapshotBead`가 둘을
더한다 — `issue_type`은 `baseline_red` 필요 여부를, `quick_fix_review`는
영수증을 각각 결정하는 판정 입력이다. 기존 admission 입력 규칙을 그대로
따른다: **키 부재는 `undefined`, 값이 잘못된 경우는 present-and-invalid로
판정기에 도달한다**(부재로 뭉개지 않는다).

### 6.4 어느 기본 프롬프트와 만나는가

`staleDispatchPrompt`(spec/plan stale)와는 만나지 않는다. quick_fix는
admission §3에서 description 검사 후 즉시 `{ ok: true }`로 끝나며 앵커 spec이
없으므로 **`stale` payload를 만들 수 없다**.

`staleWorkContinuePrompt`와는 만난다. 그 갈래는 admission이 아니라
워크트리 상태로 갈리므로 route를 가리지 않는다. 이 조합에서는 이어쓰기 지시와
self-review 관측이 함께 서며, 순서는 이어쓰기 프롬프트가 먼저다 — 세션이
무엇을 이어받는지 먼저 알아야 그 위에서 무엇을 먼저 할지 판단할 수 있다.

## 7. 파서 경계와 픽스처

§1이 말한 대로 투영은 파서 역학과 scope 거부 규칙을 토큰 이름으로만 남긴다.
그 해석이 dotfiles checker와 같은지 확인하는 자리를 둔다.

### 7.1 경계 픽스처 한 벌

`server/worker/__fixtures__/quick-fix-handoff-cases.json`에 케이스를 모은다.
케이스 하나는 입력 이슈와 기대 판정이다.

```json
{
  "name": "라벨 형식 섹션은 heading 형식과 같게 인정된다",
  "issue": { "issue_type": "task", "metadata": { "route": "quick_fix" }, "description": "..." },
  "expect": { "state": "unreviewed", "missing": [] }
}
```

최소한 다음 경계를 덮는다.

- 섹션: `## <이름>` / `<이름> —` 두 형식, 다음 h2·다음 label·본문 끝에서의
  종료, 같은 이름이 두 번 나올 때 첫 번째만
- `text_model`: `\r\n` 줄 끝, **U+2028·U+0085·U+000B는 줄바꿈이 아님**,
  trim은 ASCII 스페이스·탭만이고 **NBSP는 남음**
- `## scope`: 미선언 / 항목 0개 / 유효 항목, 거부 항목 각각, 중복 제거,
  다음 `#`에서 종료
- `baseline_red`: `bug`일 때만 필요, `검증 bundle` 섹션 밖의 같은 줄은 무효
- 영수증: 부재 / 형식 위반 / digest 불일치 / 일치
- digest: 본문에 아무 정규화도 하지 않음(개행·NFC·trim 모두 그대로)

### 7.2 두 테스트가 한 픽스처를 읽는다

- **`quick-fix-handoff.test.js`** — 항상 돈다. 픽스처의 기대값에 JS 모듈을
  대조한다. `npm test`와 `repo-ops/script/verify`가 도는 자리다.
- **`quick-fix-handoff.cross-runtime.test.js`** — 같은 픽스처를 임시
  `--issue-json` 파일로 써서 dotfiles의
  `check-quick-fix-handoff.py --verify --json`을 실제로 실행하고 결과를
  대조한다. dotfiles 체크아웃·`python3`·PyYAML 중 하나라도 없으면 **skip**한다.

두 번째 테스트는 게이트가 아니라 개발자 도구다. 환경이 갖춰진 자리에서만
돌고, 돌 때는 두 구현을 진짜로 비교한다. 픽스처가 하나이므로 기대값이 갈릴
수 없다.

### 7.3 `isValidScopeItem`의 `]` 거부를 걷어낸다

`server/worker/artifact-scope.js`의 `isValidScopeItem`은 `]`를 거부하지만
계약의 `glob_chars_star_question_bracket`은 `*?[`만 거부한다. `src/a]b/` 같은
항목에서 두 판정이 갈린다. 이 Bead의 목적이 checker와 같은 답을 내는 것이므로
`]` 거부를 걷어내 정렬한다.

이 함수는 `parseArtifactScope`(spec·plan front matter의 `scope:`)도 함께
쓰므로 그 표면의 동작도 같은 방향으로 바뀐다. 의도한 변경이다 — 같은 계약의
같은 항목 규칙을 두 파서가 다르게 읽고 있던 것이다.

## 8. 비목표

- **새 거부 사유를 만들지 않는다.** admission의 quick_fix 거부는
  `missing_description` 하나로 남는다.
- **적재를 막지 않는다.** 네 상태 모두 드래그·`대기로 ↴`·큐 적재에 영향이
  없다.
- **계약 술어를 이 저장소에 복제하지 않는다.** regex와 상태 어휘는 투영에서
  읽고, 절차 본문은 프롬프트에서 계약을 가리키기만 한다.
- **스테퍼 칸을 늘리지 않는다.** quick_fix 스테퍼는 `impl · close` 두 칸뿐이라
  자리가 남고 `dim / full+✓ / stale` 어휘도 이미 있지만, 스테퍼 칸은 계약이
  정의한 **게이트 단계**이고 self-review는 계약이 `advisory`로 못박은
  **권고**다. 게이트 자리에 권고를 앉히면 계약이 명시적으로 부정한 차단력을
  화면이 주장하게 된다.
- **투영 갱신 자동화를 만들지 않는다.** pin은 사람이 옮긴다. 기존 두 투영과
  같다.

## 9. 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write`
- 프런트엔드 편집이 있으므로 `npm run build` 후 `app/main.bundle.js`와
  `.map`을 포함한다
- 새 단위 테스트
  - 투영 적재: provenance 일치 / bytes 불일치 / sha256 불일치 /
    blob 이름 불일치 / 파일 부재 → `supported: false`
  - 판정: §7.1 픽스처 전건
  - `enrichIssueWorkflow`: quick_fix 행에만 `quick_fix_review`가 붙고 다른
    route에는 붙지 않는다
  - `candidateCard`: 네 상태의 칩 유무와 클래스, 묶음이 항상 그려진다는 것,
    `worker-ineligible`과의 공존
  - 상세 패널: `quick_fix_review` 줄의 표시 조건과 `· stale` 접미
  - `snapshotBead`: `issue_type`·`quick_fix_review`가 스냅샷에 실리고, 키
    부재는 `undefined`로 잘못된 값은 present-and-invalid로 도달한다
  - dispatch 프롬프트: `stale`·`unreviewed`에만 블록이 붙고 `unknown`·
    `reviewed`에는 붙지 않는다
  - dispatch 프롬프트 합성: 세 갈래 각각에 블록이 덧붙는다 —
    `staleWorkContinuePrompt` 뒤, `staleDispatchPrompt` 뒤(도달 불가이나
    조립 함수 수준에서 확인), 그리고 기본 프롬프트가 없는 갈래에서
    `defaultTaskPrompt`가 앞에 만들어진다
  - 툴팁: 두 레인이 같은 내용을 낸다 — 상태 문장과 `missing`만 쓰고 영수증
    문자열을 요구하지 않는다
- 성공 판정: vitest 전건 통과 + PR 병합 + beads-ui `[deploy]` readback
  (`projectmgr status beads-ui` running)

## 구현 unit 후보

권고이지 구속이 아니다.

1. **투영 pin + 판정 모듈** — `generated/contracts/quick-fix-handoff*`,
   `server/worker/quick-fix-handoff.js`, `server/worker/artifact-scope.js`,
   픽스처와 두 테스트
2. **서버 배선** — `server/workflow-enrich.js`, `server/worker/attach.js`,
   `server/worker/scheduler.js`
3. **표시** — `app/views/worker/lanes.js`,
   `app/views/detail-panel/index.js`, `app/styles.css`, 번들
