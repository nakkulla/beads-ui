# 워커 탭 정리: 전체 자동화 버튼 제거·실패 타일 유지와 이어하기

- Bead: `UI-jk7z`
- Route: `spec_backed`
- 날짜: 2026-08-05

## 1. 문제

1. **`⏵⏵ 전체 자동화` 버튼이 `자동 진행`과 겹쳐 보인다** — 실측으로 전체
   자동화는 서버 개념이 아니라 `auto_advance`+`auto_merge` 두 토글을 한꺼번에
   뒤집는 파생 버튼이다 (`app/views/worker/index.js` `setAutoAll()`:1465-1467,
   렌더 :2204-2227, 배선 :3010-3014). 별도의 `자동 머지` 토글이 이미 있으므로
   (`setAutoMerge()`:1282, `worker-merge-auto-toggle`), 버튼 셋이 두 플래그를
   세 가지 방식으로 조작하는 셈이라 혼란만 남긴다.
2. **어템프트가 실패하면 카드가 사라진다** — 워커 실행 그리드 타일은
   `attempts`의 `status='running'`(일시정지 포함)만 렌더하고, 실패·orphan은
   실패 배너로만 흘러간다 (`app/views/worker/index.js:14-17`,
   `running-grid.js` `bannersTemplate()`:249-284). 이어하기가 배너에만 있어서,
   배너가 최신 실패 1건만 보여주는 구조와 맞물려 개별 실패 건을 카드에서 직접
   이어하기할 수 없다. 모니터 탭은 실패 항목을 실행중 레인에 남기고
   이어하기·닫기 버튼을 단다 (`app/views/monitor/lanes.js` `runningOps()`)
   — 워커 탭만 갭이다.

## 2. 목표

자동화 토글을 `자동 진행`·`자동 머지` 둘로 정리하고, 실패 어템프트를 타일로
남겨 카드에서 바로 이어하기·닫기할 수 있게 한다.

## 3. 비목표

- 서버 플래그·프로토콜 변경 — `auto_advance`/`auto_merge`와
  `worker-queue-toggle`/`worker-merge-auto-toggle`은 그대로.
- 모니터 탭 자동화 요약(`automation.both_on` 집계)과 그룹 헤더 토글 변경 —
  정보 표시는 유지.
- 실패 배너 수명주기 변경 (2026-07-27-worker-failure-banner-lifecycle) — 배너는
  그대로 두고 타일을 더한다.

## 4. 설계

### 4.1 전체 자동화 버튼 제거

- `index.js`에서 `.worker-auto-all` 버튼 렌더(:2204-2227), `setAutoAll()`
  (:1465-1467), 클릭 배선(:3010-3014), 관련 파생 상태(`auto_all_on`)를
  제거한다. `자동 진행`(`.worker-play`) 토글은 변경 없음.
- **자동 머지 토글의 상시 접근 보장**: 현행 `.worker-merge-all`은
  `nowPanelTemplate()` 안에만 있어(index.js:2324, :2468-2494) 실행중·PR
  대기가 모두 없으면 패널과 함께 사라진다. 지금까지는 툴바의
  `.worker-auto-all`이 그 빈틈을 메웠으므로, 버튼만 제거하면 idle 상태(특히
  모바일)에서 `auto_merge`를 조작할 수단이 없어진다. 자동 머지 토글을
  `자동 진행` 옆 툴바 위치로 옮겨(또는 툴바에 항상 렌더해) 패널 유무와
  무관하게 항상 접근 가능하게 한다.
- 관련 CSS(`.worker-auto-all`)와 테스트 참조를 함께 정리한다.

### 4.2 실패 어템프트 타일

- 타일 소스 확장: `status='failed'|'orphaned'`이고 **미처리**인 어템프트만
  실행 그리드에 타일로 렌더한다. 미처리 판정은 기존 배너 유도가 쓰는 조건과
  같은 술어를 공유한다 (index.js:1932-1948): `!superseded`(그 Bead의 최신
  어템프트가 아니면 제외) && `!resolved_by_done` && `dismissed_at` 없음.
  같은 집합이므로 배너와 타일이 같은 실패를 가리키고, 후속 어템프트로
  대체됐거나 완료 처리된 과거 실패가 타일로 되살아나지 않는다.
- 타일 변형 `rtile--failed`: 경과 자리에 `실패`(orphan은 `중단됨`), 헤더
  버튼은 `↻ 이어하기`(배너와 동일하게 `resume_eligible` 기준 비활성 +
  `resume_reason` 툴팁, 핸들러는 기존 `resumeAttempt()`:1148-1169 재사용)와
  `✕ 닫기`(기존 배너 dismiss와 같은 `dismissed_at` 스탬프 경로 재사용,
  :1174-). 일시정지·폐기 버튼은 실패 타일에 두지 않는다.
- 닫으면(dismiss) 타일과 배너가 함께 내려간다 — 같은 소스를 읽으므로 별도
  상태가 없다.
- 정렬: 실패 타일은 그리드 앞쪽(실행중 타일 앞)에 둔다 — 배너와 같은 "지금
  손이 필요한 것 먼저" 원칙.

## 5. Test scope

- `running-grid.js` 템플릿 seam: **이미 투영된** failed/orphaned 타일 입력에
  대해 `rtile--failed` 변형, `resume_eligible=false` 비활성+`resume_reason`
  툴팁, 닫기 버튼 존재만 검증 (RED→GREEN). 상태·dismiss·supersede·done 해소
  판정은 템플릿이 받지 않는 정보이므로 이 seam에 두지 않는다 — 빈 배열 입력
  테스트는 변경 전에도 통과하는 vacuous RED다.
- `index.js` 파생 seam: 실패 어템프트가 타일 목록에 포함되는 것과 세 제외
  조건(superseded / resolved_by_done / dismissed_at) 각각에서 빠지는 것 —
  기존 worker index 테스트 패턴으로 추가 (RED→GREEN).
- `index.js` 클릭 배선 seam: 실패 타일의 이어하기·닫기를 각각 클릭하면
  `worker-attempt-resume`·`worker-attempt-dismiss`가 해당 타일의 정확한
  `attempt_id`와 `expected_revision`으로 전송되는 것 (RED→GREEN). 버튼 존재
  단언만으로는 배선 누락 구현이 통과한다.
- 전체 자동화 버튼 제거·토글 이동: 기존 테스트에서 `.worker-auto-all` 참조
  제거·부재 단언으로 전환하고, 실행중·PR 대기가 모두 빈 상태에서도
  `.worker-merge-all`이 렌더되는 회귀 단언 추가 (RED→GREEN).
