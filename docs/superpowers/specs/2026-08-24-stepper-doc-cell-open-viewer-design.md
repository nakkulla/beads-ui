---
scope:
  - server/workflow-enrich.js
  - app/views/board/stepper.js
  - app/views/board/card.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/detail-panel/md-viewer.js
  - app/views/detail-panel/index.js
  - app/views/board/index.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/main.js
  - app/styles/base.css
  - app/protocol.md
---

# stepper의 spec·plan 셀 클릭으로 md 뷰어 열기

- Bead: UI-ajkn
- 작성일: 2026-08-24
- 라우트: spec_backed

## 1. 배경과 목적

spec/plan 문서를 보려면 지금은 이슈 상세 패널 → Artifacts 행 → `열기`를 거쳐야
한다(`app/views/detail-panel/artifacts.js`). 그런데 보드 카드·Worker 후보
카드·실행 타일(모니터 공용)마다 이미 stepper가 `spec`/`plan` 셀을 그리고 있어,
사용자는 그 셀을 누르면 문서가 열리기를 기대한다. 이 spec은 **상세 패널을 거치지
않고 stepper의 spec/plan 셀 클릭으로 같은 md 뷰어를 여는** 동작을 정의한다.

관측한 현재 구조:

- stepper는 `app/views/board/stepper.js` 하나이며 `role="img"` 표시 전용이다.
  소비자는 세 곳 — 보드 카드(`board/card.js` `cardTemplate`), Worker 후보
  카드(`worker/lanes.js` `candidateCard`, `paneTemplate`가 호출), 모니터 실행
  타일(`worker/running-grid.js` `runningTile`의 `monitorTileBody` — `options.monitor`가
  있을 때만 stepper를 그린다). Worker 탭의 `runningGridTemplate`은 `monitor` 옵션
  없이 `runningTile`을 부르므로 Worker 실행 타일에는 오늘 stepper가 없다.
- 서버 `server/workflow-enrich.js`의 `specStage`/`planStage`는 spec 경로(발행
  또는 draft)와 `plan_path`, plan 작성 이력을 알고 있지만, 클라이언트로는
  `fill/glyph/stale/receipt`만 보낸다. 보드 카드 payload에는 `metadata`가 있으나
  Worker/모니터 타일 payload에는 없다(`app/protocol.md` — "the rest of
  `metadata` never travels").
- md 뷰어(`app/views/detail-panel/md-viewer.js`)는 상세 패널이 혼자 생성·소유하며
  `GET /api/doc?workspace=<abs>&path=<rel>`로 문서를 가져온다. `workspace`는
  `getAvailableWorkspaces()`에 등록된 경로여야 한다(`server/routes/doc.js`).
  모니터 타일의 `root_dir`는 visible workspace이므로 그대로 넘기면 허용된다.

## 2. 서버 — stage에 `doc` 투영

`server/workflow-enrich.js`의 `WorkflowStage`에 선택 필드를 하나 더한다.

```
doc?: { path: string, missing_state: 'spec_draft' | 'plan_pending' | null }
```

- `spec` stage: `specStage`가 받는 `spec_evidence.evidence`가 `'none'`이 아니면
  `doc = { path: spec_evidence.path, missing_state: evidence === 'draft' ?
  'spec_draft' : null }`. `'none'`이면 `doc`를 넣지 않는다.
- `plan` stage: `md.plan_path`가 비어 있지 않은 문자열이면 `doc = { path:
  md.plan_path.trim(), missing_state: has_authoring_history ? null :
  'plan_pending' }`. `has_authoring_history`는 `planStage`가 이미 계산하는
  `Object.hasOwn(md, 'plan_check'|'plan_review'|'plan_approval')`를 그대로 쓴다.
  `plan_path`가 없으면 `doc`를 넣지 않는다.
- `impl`/`pr`/`merge`/`close` stage에는 `doc`를 넣지 않는다.
- `doc`는 `fill`과 독립이다. draft 파일이 없어 `fill='none'`으로 내려간 spec
  셀이나, 문서가 아직 없어 `fill='none'`인 plan 셀도 경로가 있으면 `doc`를
  실어 보낸다 — 뷰어가 `plan_pending`을 "계획 작성 전" 안내로, 없는 draft를
  not_found 오류로 이미 구분해서 보여 주기 때문이다(상세 패널 Artifacts 행과
  같은 규칙). 기존 `fill/glyph/stale/receipt` 판정은 한 줄도 바꾸지 않는다.
- `app/protocol.md`의 `workflow` 설명에 "`stages.spec`/`stages.plan`는 문서
  경로가 있을 때 `doc{path,missing_state}`를 싣는다"를 한 문장으로 적는다.

상세 패널의 `collectArtifacts`(`detail-panel/artifacts.js`)는 이번 범위에서
건드리지 않는다. 두 곳의 plan pending 판정(값 non-empty vs `hasOwn`)이 미세하게
다르지만, 그 정합은 별도 follow-up으로 남긴다(§7).

## 3. 클라이언트 — stepper 셀 버튼화

`app/views/board/stepper.js`:

```
stepperTemplate(workflow, status, options = {})
  options.onOpenDoc?: (ev: Event, doc: StepperDoc, key: 'spec'|'plan') => void
```

- 셀이 버튼이 되는 조건은 **`options.onOpenDoc`이 있고 그 stage에 `doc`가 있을
  때** 두 가지뿐이다. 그 셀은 `<button type="button" class="seg seg--doc">`로,
  안의 `.bar`/`.lbl` 구조와 클래스는 지금과 같다. 조건을 못 채우는 셀은 지금처럼
  `<div class="seg">`.
- 핸들러 없이 호출한 결과는 지금 렌더와 동일해야 한다(기존 테스트 무변경 통과).
- 접근성: 버튼 셀이 하나라도 있으면 컨테이너를 `role="img"` 대신
  `role="group"`으로 그리고 `aria-label`은 지금의 "워크플로우 진행: …" 문구를
  그대로 쓴다(`role="img"`는 자식을 접근성 트리에서 지우므로 버튼이 노출되지
  않는다). 각 버튼에는 `aria-label="<label> 문서 열기 · <path>"`와 같은 문구의
  `title`을 준다. 버튼 셀이 없으면 `role="img"` 유지.
- 클릭 핸들러는 `ev.preventDefault(); ev.stopPropagation();` 뒤 `onOpenDoc(ev,
  doc, key)`를 부른다. 카드의 `@click`(상세 열기)과 Worker/모니터의 위임된 클릭
  핸들러로 번지지 않는다. 드래그(`draggable="true"`)는 mousedown 기반이라 버튼
  클릭과 충돌하지 않는다.
- CSS(`app/styles/base.css` `.stp` 블록): `.stp .seg--doc`에 버튼 기본 스타일
  초기화(`appearance: none; background: none; border: 0; padding: 0; font:
  inherit; color: inherit; cursor: pointer`)와 hover/focus-visible 시 `.lbl`
  밑줄 또는 `.bar` 밝기 상승 한 가지. 레이아웃(`.seg` flex 자식 폭)은 변하지
  않아야 한다.

## 4. md 뷰어 공유와 workspace 재정의

- `app/views/detail-panel/md-viewer.js`: `open(doc_path, open_options)`의
  `MdViewerOpenOptions`에 `workspace?: string`을 더한다. 있으면
  `getWorkspacePath()` 대신 그 값을 `/api/doc?workspace=`에 쓴다. 나머지 동작
  동일.
- `app/main.js`: md 뷰어를 한 개 만들어(`document.body`에 `md-viewer-root`
  마운트, `getWorkspacePath: () => store.getState().workspace.current?.path`)
  다음 함수를 뷰들에 넘긴다.

  ```
  openDoc(doc, root_dir?) → md_viewer.open(doc.path, {
    missing_state: doc.missing_state,
    ...(root_dir ? { workspace: root_dir } : {})
  })
  ```

- `app/views/detail-panel/index.js`: 옵션 `mdViewer?`를 받는다. 있으면 그
  인스턴스를 쓰고 자기 마운트를 만들지 않으며 `destroy()`에서도 파괴하지
  않는다(`clear()`의 `close()`는 그대로 호출 — 상세를 닫으면 위에 뜬 문서도
  닫힌다는 기존 동작 유지). 없으면 지금처럼 자기 것을 만든다 — 기존 테스트와
  단독 사용을 깨지 않기 위한 한 줄 분기다. `main.js`는 항상 공유 인스턴스를
  넘긴다.

## 5. 소비자 배선

| 표면                      | 앵커                                                                                         | workspace         |
| ------------------------- | -------------------------------------------------------------------------------------------- | ----------------- |
| 보드 카드                 | `BoardCardContext.onOpenDoc` 추가 → `cardTemplate`이 `stepperTemplate(…, { onOpenDoc })` 호출 | 현재 workspace    |
| Worker 후보 카드          | `candidateCard(item, place_menu, options.onOpenDoc)` → `paneTemplate(pane)`의 `pane.onOpenDoc` | 현재 workspace    |
| 모니터 타일(`candidateCard`·`runningTile` 경유) | `runningTile(tile, now, sel, { monitor, onOpenDoc })`·`candidateCard(item, menu, { onOpenDoc })`, `onOpenDoc`이 `item.root_dir`를 함께 넘김 | `item.root_dir`   |

Worker 탭의 실행 타일은 stepper 자체를 그리지 않으므로(§1) 이번 범위에서 배선
대상이 아니다. Worker 실행 타일에 stepper를 새로 넣는 것은 별도 결정이다(§7).

- `createBoardView`/`createWorkerView`/`createMonitorView` 옵션에
  `openDoc?: (doc, root_dir?) => void`를 더한다. 옵션이 없으면 stepper에
  핸들러를 넘기지 않아 정적 렌더가 된다(fail-quiet).
- 보드 지연 팝업 카드(`deferred_card_ctx`)의 `onOpenDoc`은 **팝업을 먼저
  닫고** 뷰어를 연다(`onDeferredNavigate`와 같은 순서). 팝업은 `showModal()`로
  연 네이티브 `<dialog>`라 브라우저 top layer에 있어, body 오버레이인 뷰어는
  `z-index`와 무관하게 그 위에 뜰 수도 조작될 수도 없기 때문이다.

## 6. 제외 범위

- `impl`/`pr`/`merge`/`close` 셀 클릭(PR 링크 등)은 넣지 않는다.
- 상세 패널 Artifacts 행의 표시·판정 변경 없음.
- stepper 시각 규칙(2026-07-30 spec, 2026-08-23 spec-draft-stage spec)의
  `fill/glyph/stale` 판정 변경 없음.
- `/api/doc` 서버 라우트 변경 없음.

## 7. 후속 후보 (이번 범위 밖)

- 상세 패널 `collectArtifacts`의 plan pending 판정을 서버 `doc.missing_state`로
  통일 — 두 판정이 값 non-empty vs `hasOwn`으로 갈리는 미세 차이 해소.
- Worker 탭 실행 타일에도 stepper(`bead_workflow[bead_id]`)를 그릴지 — 그리면
  §3·§5 규칙이 그대로 적용된다.

## 8. 테스트

- `server/workflow-enrich.test.js`: spec published → `doc{path, null}`, spec
  draft → `doc{path,'spec_draft'}`, spec none → `doc` 없음; plan_path + 이력 →
  `doc{path,null}`, plan_path만 → `doc{path,'plan_pending'}`, plan_path 없음 →
  `doc` 없음; impl/pr/merge에 `doc` 없음.
- `app/views/board/stepper.test.js`: 핸들러 없음 → 기존과 동일(`role="img"`,
  버튼 없음); 핸들러 + `doc` → 해당 셀만 `button.seg--doc`, 컨테이너
  `role="group"`; 클릭 시 `onOpenDoc(ev, doc, key)` 호출·`stopPropagation` 확인;
  `doc` 없는 셀은 핸들러가 있어도 `div`.
- `app/views/detail-panel/md-viewer.test.js`: `open(path, { workspace })`가 그
  workspace로 fetch.
- `app/views/board/card.test.js`, `app/views/worker/lanes.test.js`,
  `app/views/worker/running-grid.test.js`: 핸들러가 stepper까지 전달되고 클릭이
  카드 클릭 핸들러를 부르지 않음.
- `app/views/monitor/index.test.js`: 타 레포 타일 클릭 시 `openDoc(doc,
  item.root_dir)` 호출.
- `app/views/board/index.test.js`: 지연 팝업 카드의 셀 클릭이 팝업을 닫은 뒤
  `openDoc`을 호출.
- `app/views/detail-panel/index.test.js`: `mdViewer` 주입 시 자체 `md-viewer-root`
  마운트를 만들지 않고, `clear()`는 주입 뷰어의 `close()`를 부르며 `destroy()`는
  `destroy()`를 부르지 않음.
- `app/main.test.js`: 부팅 시 `md-viewer-root`가 정확히 하나 생성되고 상세 패널에
  주입됨.
- 마감: `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
  `npm run build`(번들 포함), live 서버에서 보드·Worker·모니터 각 한 번씩
  클릭해 뷰어가 열리는 스크린샷.

## 9. 구현 unit 후보

한 unit — 서버 투영·stepper·뷰어 공유·배선이 한 델타에서 함께 검증돼야 동작이
성립하므로 나누지 않는다.
