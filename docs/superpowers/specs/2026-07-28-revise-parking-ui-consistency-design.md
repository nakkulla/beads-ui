# REVISE 파킹 처분 UI 정합화 (UI-yp64)

UI-hs11(워커 REVISE 파킹 처분 카드) 후속. 세 결함이 겹쳐 파킹 처분이 사실상
불가능한 상태를 한 유닛으로 정합화한다.

## 1. 문제

1. **대기 레인 파킹 행 레이아웃 붕괴.** 대기 레인 행은 한 줄 flex 행인데
   (`app/views/worker/lanes.js` `miniRow` 비카드 분기), 파킹 행에는 nowrap
   요소(ID·`⏸ REVISE 파킹` 배지·reason·처분 버튼 2개)가 한꺼번에 붙는다.
   shrink 가능한 요소가 제목(`.worker-mini__title`, `flex: 1 1 auto` +
   `overflow-wrap: anywhere`)뿐이라 제목이 1글자 폭까지 눌려 글자 단위 세로
   줄바꿈이 일어나고, 버튼 2개는 컬럼 밖으로 밀려 클릭할 수 없다.
2. **REVISE findings를 UI에서 볼 경로 부재.** 서버는 `notes_tail`(끝 400자,
   `server/worker/revise-parked.js`)을 보내지만 노출은 [finding 수용·수정]
   버튼의 hover 툴팁뿐이다. 상세 패널(`app/views/detail-panel/`)은 `notes`를
   렌더하지 않는다 — UI-hs11 §3.5의 "findings 상세는 카드 클릭 → 기존 이슈
   상세(notes)로"라는 가정 자체가 깨져 있었다.
3. **툴팁 오안내.** "자세히는 카드 클릭 → 이슈 상세"
   (`app/views/worker/index.js` `revise_title`)가 notes를 보여주지 않는 경로를
   가리킨다.

## 2. 확정된 사실 (조사 완료)

- `detail:<id>` 구독은 `bd show <id> --json`을 필드 필터 없이 spread 통과시킨다
  (`server/list-adapters.js` `issue-detail` → `normalizeIssueList` `...it`).
  `notes`는 이미 클라이언트에 도달한다 — §4는 프론트 렌더만 추가하면 된다.
- 행 기본 클릭은 이미 이슈 상세를 연다(`app/views/worker/index.js` 클릭 위임의
  `.worker-mini`/`.worker-card` 기본 분기 → `gotoIssue`). §4가 배달되면 기존
  툴팁 문구는 정확해진다.
- PR 대기 레인은 같은 문제를 UI-k59y에서 다단 카드 변형(`worker-mini--card`:
  head/body/foot)으로 이미 해소했다. 파킹 행은 부속 요소 수가 PR 대기와
  사실상 같은데도 한 줄 변형을 쓰고 있다 — UI-hs11에서 버튼 2개를 추가할 때
  카드 변형 조건을 같이 넓히지 않은 누락이다.

## 3. 파킹 행 카드 변형 (`app/views/worker/lanes.js`, `app/styles.css`)

- `miniRow`의 카드 조건 확장: `lane === 'pr_wait'` →
  `lane === 'pr_wait' || !!item.revise_action`.
- 카드 분기 구조는 기존 그대로 재사용: head(grip·ID·배지·reason) /
  body(제목, 자연 줄바꿈) / foot.
- revise 버튼 2개는 foot의 `.worker-mini__actions` span으로 이동한다.
  `has_foot` 판정에 `item.revise_action`을 추가한다(현재
  usage/merging/merge/discard만 보므로, 이대로면 파킹 카드의 foot이 접혀
  버튼이 사라진다).
- 비카드 분기의 revise 버튼 배치는 제거한다 — 파킹 행은 이제 항상 카드라
  죽은 경로다.
- CSS 신규는 `.worker-mini__foot { flex-wrap: wrap; }` 하나(좁은 컬럼에서
  버튼 2개가 잘리지 않도록). 버튼·배지·카드 스타일은 전부 기존 규칙 재사용.
- 드래그 계약(`data-bead-id`/`data-lane`)과 클릭 위임·`revise_title` 툴팁은
  변형과 무관하게 유지 — 기존 pr_wait 카드가 이미 증명한 경로.

## 4. 상세 패널 notes 섹션 (`app/views/detail-panel/index.js`, `app/styles.css`)

- 서버 변경 없음(§2 확정 사실).
- `data.notes`가 비어 있지 않은 문자열일 때만 "노트" 섹션을 렌더한다
  (fail-quiet). 모든 이슈에 적용 — 파킹 여부와 무관하게 게이트 영수증
  계보·처분 이력을 확인할 수 있다.
- **읽기 전용** — 편집 버튼 없음. bd의 `--notes`는 replace 의미라 UI 편집은
  덮어쓰기 사고 경로이고, append 전용 mutation 신설은 이 유닛 범위 밖이다.
- 위치: 설명 섹션 바로 다음.
- 표시: `.detail-overlay__notes` 텍스트 블록,
  `white-space: pre-wrap; overflow-wrap: anywhere`. notes는 줄 단위 계보
  텍스트라 마크다운 렌더는 하지 않는다.

## 5. 툴팁 문구 — 코드 변경 없음으로 판정

§4 배달로 기존 문구 "자세히는 카드 클릭 → 이슈 상세"는 실제 동작(행 클릭 →
상세 패널, notes 섹션 표시)과 일치하게 된다. 문구는 유지한다.

## 6. 수용 기준

1. 파킹 행이 `worker-mini--card` 다단 카드로 렌더되고, 제목이 단어 단위로
   자연 줄바꿈되며(세로 1글자 낙하 없음), 처분 버튼 2개가 foot에 보인다.
2. 일반 대기 행·완료 행은 기존 한 줄 렌더를 유지한다(회귀 없음).
3. notes가 있는 이슈의 상세 패널에 읽기 전용 노트 섹션이 표시되고, notes가
   없으면 섹션 자체가 렌더되지 않는다.
4. 파킹 행 클릭 → 상세 패널에서 REVISE findings(notes)를 읽을 수 있다.
5. 기존 처분 버튼 클릭 메시지 발신·머지/폐기·드래그 동작에 회귀가 없다
   (테스트로 고정).
6. Pre-Handoff 번들(lint/tsc/test/prettier/build) green, 갱신된
   `app/main.bundle.js`·`app/main.bundle.js.map` 커밋 포함.

## 7. 테스트

- `app/views/worker/index.test.js`: 파킹 행 `worker-mini--card` 클래스 단언
  추가, 버튼 2개가 foot(`.worker-mini__foot .worker-mini__actions`)에
  렌더되는지, 기존 클릭 발신 테스트 셀렉터 유지.
- `app/views/detail-panel/index.test.js`: notes 있는 이슈 → 섹션·내용 렌더 /
  notes 없음 → 섹션 미렌더, 2건.

## 8. 배포

머지 후 머지 체크아웃에서 `npm run build` → `bdui-shared restart` → 프로세스
경로·포트·HTTP 응답 검증(AGENTS.md Post-Merge Runtime Validation).

## 범위 제외

- notes 편집 기능(append 전용 mutation 포함).
- 대기 레인 전체 카드화(UI-k59y의 "부속 요소 적은 레인은 한 줄" 결정 유지).
- `server/worker/revise-parked.js` `cacheKey`의 리터럴 NUL 바이트 정리 —
  별도 deferred(UI-yp64 notes에 기록, 사용자 요청 시 quick_fix 재라우팅).
