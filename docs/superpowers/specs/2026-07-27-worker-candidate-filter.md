# Worker 후보 페인 필터: blocked 기본 숨김 + spec 유무 필터 (UI-ki09)

## 배경 / 문제

Worker 탭의 후보(SOURCE) 페인은 Board Ready+Blocked를 합산해 그대로 보여준다.
blocked 이슈는 당장 실행할 수 없는데도 후보 목록을 차지해 노이즈가 되고, spec
유무로 좁혀 보는 수단도 없다.

blocked 이슈를 **완전히 제거하지 않는** 이유: admission 게이트는 blocked 여부를
보지 않으므로 spec을 갖춘 blocked 이슈를 미리 대기 레인에 끌어다 두는 경로가
현재 유효하다. 기본 숨김 + 토글로 그 경로를 보존한다.

## 요구사항

1. **blocked 표시 토글** — 기본값 숨김. 켜면 기존과 동일하게 `🔒` reason과 함께
   합산 정렬 위치에 표시된다.
2. **spec 필터** — `전체`(기본) / `spec 있음` / `spec 없음` 3상태. 판정은 기존
   `hasSpec`(`metadata.spec_id` 존재)을 그대로 쓴다.
3. 두 필터는 AND로 결합하며 **표시 전용**이다. 대기/실행/PR/완료 레인, 큐 스냅
   샷, 서버 구독·계약 표면에는 손대지 않는다(frontend-only).
4. 필터 상태는 `localStorage` 키 `beads-ui.worker.candidate-filter`에 JSON
   `{ show_blocked: boolean, spec: 'all'|'with'|'without' }`으로 저장하고 뷰 생성
   시 복원한다. 파싱 실패·미존재 시 기본값(`{show_blocked:false, spec:'all'}`).
5. 후보 페인 헤더의 카운트는 **표시 중인 행 수**를 보여준다. 숨겨진 것이 있으면
   필터 컨트롤에서 개수를 드러낸다(예: 토글 라벨 `🔒 blocked N`) — 정보 소실
   없이 "왜 안 보이지"를 답할 수 있어야 한다.
   - 컨트롤별 집계 기준: 각 컨트롤 N은 "**그 컨트롤만 완화했을 때 추가로 표시될
     행 수**"다. 즉 blocked 토글의 N은 현재 spec 필터를 통과하지만 blocked라서
     숨겨진 행 수, spec 칩의 N은 현재 blocked 토글 상태를 통과하지만 spec
     필터에 걸린 행 수. 두 필터에 동시에 걸린 행은 한쪽만 완화해도 계속
     숨겨지므로 **어느 쪽 N에도 세지 않는다**(중복 집계 없음).

## 구현 스케치

- `app/views/worker/index.js`
  - 필터 상태 로드/저장 + `buildModel()`에서 `merged` → `candidates` 프로젝션
    직전에 표시 필터 적용. `candidate_issues`(드래그 rank 계산용 원본)는
    **무필터 유지** — 숨김 행이 있어도 drop rank는 전체 합산 목록 기준으로
    계산되어 기존 재정렬 의미가 보존된다.
  - 후보 페인에만 필터 컨트롤(토글 1 + spec 3상태 칩)을 렌더하고, 변경 시 저장
    후 `doRender()`.
- `app/views/worker/lanes.js` — `paneTemplate`에 선택적 `controls`
  (TemplateResult) 슬롯을 추가해 헤더 아래(또는 헤더 내)에 렌더. 다른 페인은
  전달하지 않으므로 무변화.
- 스타일: 기존 `worker-*` 네임스페이스에 필터 칩/토글 클래스 추가.

## 테스트

- 필터 프로젝션 순수 함수 단위 테스트: blocked 기본 숨김, 토글 시 표시, spec
  있음/없음 필터, AND 결합, 카운트 — 특히 두 필터에 동시에 걸리는 행이 표시
  카운트와 양쪽 컨트롤 N 어디에도 세지지 않는 사례 포함.
- 뷰 테스트(`app/views/worker/index.test.js` 결): 기본 렌더에 blocked 행 부재,
  토글 후 표시, localStorage 복원, 컨트롤 변경 시 정확한 JSON이 저장되는지,
  malformed JSON 저장값에서 기본값으로 복구되는지.

## 비범위

- 서버/구독/계약 변경, Board 탭 필터, 대기 이후 레인의 필터링.
- `spec 없음` 기본 숨김(사용자 요청은 필터 제공까지).
