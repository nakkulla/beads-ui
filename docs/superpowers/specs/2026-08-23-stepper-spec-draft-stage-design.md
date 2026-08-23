---
scope:
  - server/spec-id.js
  - server/workflow-enrich.js
---

# stepper spec 칸 3단계 — draft dim · 발행 full · 리뷰 글리프

## 배경과 목적

보드 카드 stepper의 `spec` 칸은 `resolveSpecId`가 찾는 발행 증거(native
`spec_id` → metadata `spec_id`)만 본다. 발행 전 draft 경로 `spec_path`(dotfiles
`2026-08-21-spec-path-authoring-metadata-design.md`로 도입)는 상세 패널 Artifacts
행에서만 소비되고(2026-08-21 spec-draft-visibility §2), stepper에서는 의도적으로
제외됐다(같은 spec §3·제외 범위, `server/workflow-enrich.test.js` "keeps a
draft-only spec_path out of the spec stage"). 그래서 spec을 저작 중인 Bead의
카드는 spec 칸이 빈 채로 남아, 카드만 봐서는 "spec 작업이 시작됐다"는 사실을 알
수 없다.

이 spec은 `spec` 칸을 `impl` 칸(stepper 시각 규칙 spec §4.1)과 같은 형태의
3단계로 바꾼다: 문서 없음 = `none` · draft 있음 = `dim` · 발행 증거 있음 =
`full`(글리프 없음) · 발행 증거 + 유효 리뷰 리시트 = `full` + 글리프.

**선행 의존 해제 결정(2026-08-23).** 어휘 정합 Bead dotfiles-2y0o가 "발행
증거"의 키를 바꿀 가능성은 남아 있지만 먼저 진행한다. 이 spec은 현행 키
매핑 — 발행 증거 = `resolveSpecId`(native/metadata `spec_id`), draft = metadata
`spec_path` — 을 `server/spec-id.js` 한 곳에만 고정하므로, 키가 바뀌면 그
파일의 매핑만 후속 갱신하면 된다.

## 설계

### 1. 증거 부류 해석 (`server/spec-id.js`)

키 → 증거 부류 매핑은 이 파일에만 둔다. `resolveSpecId`·`resolveSpecDraft`의
동작은 바이트 하나 바꾸지 않는다(Worker 판정·Artifacts 표시의 기존 호출자
보호).

새 export `resolveSpecEvidence(issue)`를 추가한다. `resolveSpecDraft`의 결과에
`evidence` 필드를 얹어 돌려준다:

| `source` | `evidence` | 의미 |
|---|---|---|
| `native` · `metadata` | `published` | 발행 증거 있음(`spec_id`) |
| `draft` | `draft` | 발행 증거 없음, metadata `spec_path`만 있음 |
| `none` | `none` | 둘 다 없음 |

반환 형태: `{ path, source, conflict, evidence }`. `spec_id`가 있으면
`spec_path` 값과 달라도 `published`이고 `path`는 발행 경로다(`resolveSpecDraft`
규칙 그대로). 소비자는 `source` 값 목록이 아니라 `evidence`만 분기한다.

### 2. spec 칸 채움 규칙 (`server/workflow-enrich.js` `specStage`)

`stale` 강등 전의 값이다. 입력은 §1의 `evidence`·`path`, draft 문서 존재 판정,
파싱된 리시트, stale 불리언.

| `evidence` | 조건 | `fill` | `glyph` | `stale` |
|---|---|---|---|---|
| `none` | — | `none` | `null` | `false` |
| `draft` | 문서 부재가 **증명됨**(존재 판정 `false`) | `none` | `null` | `false` |
| `draft` | 문서 있음, 또는 판정 불가(`null`) | `dim` | `null` | `false` |
| `published` | 유효 리시트 없음 | `full` | `null` | `false` |
| `published` | 유효 리시트 있음 | `full` | `classifyGlyph(receipt)` | 종전 판정 |

- **draft 문서 존재 판정**은 현행 `planArtifactExists`와 같은 의미다 —
  `resolveRealpathWithinDocs`로 `docs/` 하위 실제 파일인지 보고, 워크스페이스
  루트가 없으면 부재를 증명할 수 없으므로 `null`(있는 것으로 취급). 두 스테이지가
  같은 판정을 쓰도록 `planArtifactExists`를 경로 인자를 받는 공용 헬퍼(예:
  `docArtifactExists(workspace_root, path)`)로 일반화하고 plan도 그것을 쓴다.
  plan 쪽 동작은 변하지 않는다.
- **발행 증거 있음 + 유효 리시트 없음 = `full`, 글리프 없음.** 현행 `dim`에서
  이동한다. `impl` §4.1과 같은 논리 — 발행 자체가 "spec 단계 완료" 사실이고,
  리시트가 없으니 글리프도 없어 리뷰된 spec(`✓`/`⊘`)과 구분된다. 접근성 문구는
  stepper spec §8 표에 따라 자동으로 "완료"가 된다. `spec_review`가 있으나
  파싱에 실패한 경우도 "유효 리시트 없음"으로 같은 행에 든다(글리프는 유효
  리시트에서만 나온다는 stepper spec §3.1 제약).
- **draft 칸은 항상 `glyph = null`, `stale = false`.** 계약상 `spec_review`는
  발행(`contained_sha`) 뒤에만 쓰이므로 `spec_id` 없는 `spec_review`는
  정상 경로에 없다. 그래도 관측되면 draft 칸은 여전히 `dim`/`null`/`false`이고
  원문은 `receipt` 필드로만 실린다 — "`dim` 칸은 글리프가 없거나 stale 강등"이라는
  stepper spec §3.1 불변식을 지킨다.
- `receipt` 필드(리시트 원문)는 종전처럼 모든 행에서 `md.spec_review` 원문을
  그대로 싣는다.

### 3. 불변 — stale 계산과 게이트·Worker 판정은 발행 증거만 본다

- `enrichIssueWorkflow`의 stale 계산(`computeStaleWithHead` → `pathChangedSince`)은
  종전대로 `resolveSpecId(issue).path`(발행 경로)만 받는다. draft 경로는 stale
  판정에 들어가지 않는다. 이 함수의 매개변수 이름 `spec_path`는 이제 metadata
  키 이름과 충돌해 오독을 부르므로 `published_spec_path`로 바꾼다(동작 동일).
- `server/worker/attach.js`, `server/worker/runnable-cache.js`,
  `app/views/worker/index.js`의 `resolveSpecId` 호출은 변경하지 않는다. Worker
  admission과 게이트는 계속 발행 증거만 본다.
- `app/views/detail-panel/artifacts.js`의 `resolveSpecDraft` 호출은 변경하지
  않는다(§1에서 함수 동작을 보존).

### 4. 프론트엔드 — 변경 없음

`app/views/board/stepper.js`는 서버의 `fill`/`glyph`/`stale` 세 필드를 CSS
클래스·글리프 문자·접근성 문구로 기계적으로 옮길 뿐 분류 판단을 하지 않는다
(stepper spec §3.1). 따라서 코드 변경 없이:

- draft 칸은 `bar b-spec dim`, 접근성 문구 "spec 진행 중".
- 깜빡임(§6)은 `status ∈ {in_progress, resolved}`에서만 걸리므로, spec 저작
  중인 `open` Bead의 draft 칸은 깜빡이지 않는다. 저작이 끝나 `in_progress`로
  넘어갈 때는 이미 발행돼 `full`이므로 spec 칸이 깜빡이는 조합은 종전과 같이
  드물다.
- 발행 + 리시트 없음은 `bar b-spec full` 글리프 없음, 접근성 문구 "spec 완료".

단, `server/spec-id.js`는 `artifacts.js`·`worker/index.js`가 import해 번들에
포함되므로 §1 변경 뒤 `npm run build`로 `app/main.bundle.js{,.map}`을 갱신한다.

### 5. 기존 spec 문서 갱신

두 발행 spec은 그 Bead(UI-lo1k, UI-fqwn)가 `closed`라 stale 프로브 대상이
아니다. 재작성하지 않고 대체 지점을 최소로 표시한다.

- `docs/superpowers/specs/2026-07-30-stepper-visual-rules-design.md` §4 표의
  **spec** 행을 §2의 3단계로 교체하고, 행 아래에 이 spec으로 바뀌었다는 한 줄
  각주를 단다. §5.4(spec stale 판정 변경 없음)는 그대로다.
- `docs/superpowers/specs/2026-08-21-spec-draft-visibility-design.md` §3 "게이트
  불참"과 "제외 범위"의 "`workflow-enrich.js` stage 판정 변경 없음" 항목에, 표시
  (`fill`)의 draft 단계는 이 spec이 도입했고 게이트·stale 불참은 그대로라는 한 줄
  주석을 덧붙인다. 수용 기준 4가 가리키는 회귀 테스트는 §6의 새 테스트로
  대체됨을 같은 줄에 적는다.

### 6. 테스트

- `server/spec-id.test.js`: `resolveSpecEvidence` — `spec_id`만 → `published`;
  `spec_path`만 → `draft`(path = 그 값); 둘 다 있고 값이 다름 → `published` +
  발행 경로; 둘 다 없음 → `none`; `resolveSpecId`/`resolveSpecDraft` 기존
  테스트 무변경 통과.
- `server/workflow-enrich.test.js`: "keeps a draft-only spec_path out of the
  spec stage"를 제거하고 다음으로 대체한다.
  - draft만(워크스페이스 없음) → `stages.spec` = `{ fill: 'dim', glyph: null,
    stale: false }`, impl/pr/merge는 `spec_path` 없는 Bead와 동일.
  - draft + 워크스페이스에 파일 있음 → `dim`; 파일 없음 → `none`.
  - `spec_id` + `spec_review` 없음 → `full`, `glyph: null`.
  - `spec_id` + 유효 리시트 → 종전(`full` + 글리프, stale 판정 종전) — 기존
    테스트가 계속 통과하는지로 확인.
  - `spec_id`와 `spec_path`가 다른 경로 → stale 판정은 `spec_id` 경로만 따른다
    (발행 경로만 커밋을 바꿔 stale, draft 경로만 바꿔도 fresh).
  - draft + (비정상) `spec_review` 존재 → 여전히 `dim`/`null`/`false`, `receipt`
    원문 전달.
- Worker 쪽(`attach.test.js`, `runnable-cache.test.js`)은 변경 없이 통과해야
  한다 — §3 불변의 회귀 검증.

## 구현 unit 후보

- `server`: `spec-id.js` §1 + `workflow-enrich.js` §2·§3 + 두 테스트 §6 +
  문서 §5 + `npm run build` — 단일 unit.

## 제외 범위

- 프론트엔드 stepper/CSS 변경 없음(§4).
- stale 판정·Worker admission·게이트 판정 변경 없음(§3).
- 발행 증거 키 어휘 변경(dotfiles-2y0o)은 이 spec 밖이며, 결정 시 §1 매핑만
  후속 갱신한다.
- 상세 패널 Artifacts 행(UI-fqwn) 변경 없음.

## 수용 기준과 검증

1. `spec_id` 없이 metadata `spec_path`만 있고 워크스페이스에 그 파일이 있는
   Bead의 `workflow.stages.spec`이 `{ fill: 'dim', glyph: null, stale: false }`로
   내려오고, 보드 카드 spec 칸이 흐리게 채워진다.
2. 같은 Bead에서 파일이 없으면(워크스페이스 있음) `fill: 'none'`이다.
3. `spec_id`가 있고 `spec_review`가 없는 Bead는 `fill: 'full'`, `glyph: null`이다.
4. `spec_id` + 유효 리시트 Bead의 표시와 stale 판정은 종전과 같다(기존 테스트
   무변경 통과).
5. `resolveSpecId` 호출자(Worker attach·runnable-cache·worker 뷰)와 stale 계산은
   draft의 영향을 받지 않는다 — 관련 기존 테스트 무변경 통과, §6의 "다른 경로"
   테스트 통과.
6. `npm run tsc`·`npm test`·`npm run lint`·`npm run prettier:write`·`npm run build`
   통과, 번들 갱신 포함.
7. 배포 후 검증은 기계 판정으로 한다(시각 확인은 보조이며 필수 아님). 머지
   SHA를 `M`이라 할 때,
   (a) 공유 서버 `/healthz`가 보고하는 sha가 `M`이고,
   (b) 배포 워크트리 `.worktrees/.repo-ops-deploy`(HEAD = `M`)의
   `server/workflow-enrich.js`를 `node --input-type=module -e`로 import해,
   `spec_id` 없이 metadata `spec_path`만 있는 **합성 issue**
   (`{ status: 'open', metadata: { route: 'spec_backed', spec_path: <docs/
   하위에 실제로 존재하는 .md 경로> } }`)를 그 워크트리 경로를 `workspace_root`로
   넘겨 `enrichIssueWorkflow(issue, workspace_root).stages.spec`을 출력했을 때
   `{ fill: 'dim', glyph: null, stale: false }`이고, 같은 issue에 존재하지 않는
   경로를 주면 `fill: 'none'`이다. 명령·exit code·출력을 완료 보고에 적는다.
   발행된 Bead(예: UI-rcqn 자신)는 `spec_id`가 있어 `full`이 되므로 draft 실측
   대상이 아니다. 실제 spec 저작 중인 open Bead가 그 시점에 있으면 `bd show --json`
   출력으로 같은 판정을 한 번 더 하되, 없어도 기준은 (a)+(b)로 충족된다.
