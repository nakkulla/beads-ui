---
id: UI-unf5
title: 설정 창·대화 결과 줄과 배치안 순서 자리의 jev 선호
status: accepted
date: 2026-11-11
summary: "전체 배치안에서 필수 선후(직접 blocks, 채택된 jev 선후·부딪힘)가 정하지 않는 순서 자리는 같은 jev 요청의 선호 질문(확신도 0.7 이상, 같은 파일 쌍에도 묻는다) → 우선순위 → 표시 순서로 정하고, 선호는 묶기·직렬 레인·넣을 자리를 만들지 않으며 이미 대기 중인 항목 앞으로 끼우지 않는다 — 나머지 조항은 UI-3713 그대로다"
supersedes: ["UI-3713"]
spec: docs/superpowers/specs/2026-11-11-placement-soft-order-jev-prefer-design.md
bead: UI-unf5
---

# 설정 창·대화 결과 줄과 배치안 순서 자리의 jev 선호

## Context

이 결정은 `ADR UI-3713`을 다시 쓴다. 그 ADR이 승계한 배치 추천 조항(고정 조건, jev 질문 소유자, 쌍 캐시, 선행 병렬,
묶음 배치)과 소비자(`server/placement/`의 질문·관계·캐시, `app/utils/placement/compute.js`·`apply.js`,
`app/views/worker/placement.js`, `app/views/monitor/placement-panel.js`)를 공유하므로 새 주제가 아니다.

- `UI-3713`: UI-izba 승계분의 고정 조건 조항(같은 파일 쌍을 jev에 묻지 않는다), jev 질문 정의 조항
  (`placement_pair` 하나), 자리 계산 입력 조항 변경(`(변경, UI-unf5)` 표시), 순서 자리 규칙 신설, 나머지 유지.

전체 배치안은 필수 선후가 정하지 않는 자리를 후보 칸의 표시 순서로 채웠다. 표시 순서는 브라우저마다 저장되는 정렬
설정이라 같은 대기열이라도 화면 정렬에 따라 배치안이 달라졌고, 공용 기반을 새로 까는 이슈가 그것을 쓰는 이슈 뒤에
서기도 했다. UI-4omu가 jev 선후 기준에 공용 기반 사용을 넣었지만 배포 뒤 다시 판정한 212쌍에서 선후 답은 0이었다.
그 질문은 "반드시 순서가 있어야 하는지"를 묻고, 채택된 선후 답은 두 이슈를 같은 직렬 레인으로 묶는다. 그래서 그
기준을 넓히면 병렬로 돌 수 있는 이슈까지 직렬로 묶인다. 사용자 결정(2026-11-11): 선호 질문을 도입하고 채택
확신도는 0.7, 그 뒤는 우선순위, 마지막이 표시 순서다. 후보 칸 정렬 설정은 바꾸지 않고, 이미 대기 중인 항목
앞으로 끼우지 않으며, 짝 선호는 위상 정렬로 접고 선호끼리 돌면 그 부분은 무시한다
(`docs/superpowers/specs/2026-11-11-placement-soft-order-jev-prefer-design.md`).

측정(2026-11-11, Bead 본문만 재료, 113쌍): 확신도 0.7 이상에서 본문에 상대 ID가 없는 같은 저장소 blocks 짝
47쌍 중 맞음 3·반대 0, 상대 ID가 있는 짝 16쌍 중 맞음 8·반대 0, 관계없는 대조군 50쌍 오탐 0이었다. 현재 질문의
채택 선후는 47쌍 중 1이었다.

대안과 기각 사유: 선후 기준 확대 — 채택 선후가 직렬로 묶어 병렬성을 잃는다. 이긴 횟수 점수 정렬 — 연쇄를 무시하고
`[전체 적용]` 재계산이 처음 계획과 어긋난다. 이슈별 기반 정도 점수 — 상대와 무관해 쌍의 앞뒤를 말하지 못한다.
대기 항목 앞 끼우기 — 이미 정한 대기 순서를 바꾼다. 같은 파일 쌍은 묻지 않기 — 같은 직렬 레인에 묶이면서 순서가
없는 쌍이라 선호가 가장 쓸모 있는 곳이다.

전제: `ADR UI-jlov` — dotfiles 세션 배치 절차는 바꾸지 않는다. 그 절차의 묶음 후보는 자기 Bead 하나라 후보끼리의
동순위가 없고, 선호와 기본 순서 키는 브라우저 배치안에만 있는 정렬 재료다(의도된 차이).

아래는 `ADR UI-3713`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

### ADR UI-3713의 맥락 (승계)

이 결정은 `ADR UI-32oq-2`를 다시 쓴다. 그 ADR이 승계한 대화 세션 조항(결과 줄 세 접두의 처리, 대화 알림 셋,
마무리(`인수`) 동안 짝 숨김, 외부 작업 완료 대화의 되돌림)과 소비자(`server/worker/interactive-progress.js`
파서, `server/worker/scheduler.js` 대화 처리·버튼 핸드오프, `app/views/worker/tile-resolve.js`
`tileResolveFields`, `server/worker/notify.js` 대화 알림 제목, `app/views/monitor/card-parity.test.js`)를
공유하므로 새 주제가 아니다. 계약 쪽 결정은 `ADR dotfiles/dotfiles-xipsh`·`ADR dotfiles/dotfiles-xipsh-2`이고
(결과 줄 단어·질문 규칙·마무리 뒤 되돌리기의 정본은 dotfiles 계약, `ADR UI-jlov`), 이 ADR은 그 소비자 쪽 결정이다.

- `UI-32oq-2`: UI-5chz 승계분의 결과 줄·알림 조항, UI-18a5 승계분의 짝 숨김·마무리·외부 작업 완료 되돌림 조항,
  UI-nuwy 승계분의 결과 줄 판정·알림·마무리·`[워커로 이어가기]` 조건 조항 변경(`(변경, UI-3713)` 표시), 나머지 유지.

2026-11-11 dotfiles-8t7o0에서 대화가 `인수 · …구현은 Worker 대기열이 다시 이어받습니다`로 끝났다. beads-ui는
takeover로 기록했고, 세션이 뒤에 쓴 `인계 ·` 줄은 결과가 이미 있다며 읽지 않았다. 카드는 이어가기 짝을 숨겨
행이 Worker로 돌아갈 길이 없었다. 사용자 결정(2026-11-11): 결과 줄 단어를 동작이 보이는 말로 바꾸고, 사용자가
결정했으면 Worker가 자동으로 잇고, 마무리 뒤 막다른 길은 결함이다
(`docs/superpowers/specs/2026-11-11-conversation-result-words-handback-design.md`).

대안과 기각 사유: 옛 접두를 날짜를 정해 지우기 — 이미 열린 대화와 옛 전사가 옛 블록을 따른다(dotfiles 결정과
같다). 버튼 노출을 대화 idle 경과 시간으로 정하기 — 계약이 클레임 여부를 되돌리기 신호로 정했고, 시간으로는
생각 중인 사람과 버려진 행을 가르지 못한다. 닫힌 실패·외부 작업 완료 대화의 takeover 레코드를 보존해 버튼
대상으로 쓰기 — 실패 행은 이미 자기 출구가 돌아오고 외부 작업 완료는 기존 되돌림 경로가 같은 출구를 돌려준다.
새 보존 상태는 정산 규칙만 늘린다.

전제: `ADR UI-jlov` — 결과 줄 단어·되돌리기 규칙의 정본은 dotfiles 계약이고 beads-ui는 읽어서 표시한다. 계약
키가 없으면 표시를 생략한다.

아래는 `ADR UI-32oq-2`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

#### ADR UI-32oq-2의 맥락 (승계)

이 결정은 네 ADR을 하나로 합쳐 다시 쓴다. 넷은 같은 화면, 곧 설정 창 배치(세 진입점·탭 배열·일괄 편집면·
칩 바인딩·활성 모델·대화 세션 절의 편집 위치·Worker 주소 세 값 화면)를 각자 정했고 그 소비자
(`app/main.js` 진입점, `app/views/settings-dialog/index.js` 탭 모델, `execution-pane.js`·`bulk-pane.js`·
`repo-pane.js`·`worker-url-section.js`, 모니터·Worker 의도된 차이 표)를 공유하므로 새 주제가 아니다.

- UI-rd2m: "바인딩 편집 위치" 조항 변경, 나머지 유지.
- UI-gpac-2: "편집 위치" 조항 변경, 나머지 유지.
- UI-57us: UI-jbl1 승계분 "실행 설정"의 편집 위치 조항(설정 창 일괄 모드 `전역` 탭) 변경, 나머지 유지.
- UI-u6ud-11: "설정 화면은 적용 주소·저장소 예외·공통 기본값을 따로 보인다" 조항 변경, 나머지 유지.

2026-11-10 사용자 지적: 같은 헤더 ⚙가 보기(모니터·그 밖)에 따라 다른 창(일괄 창·연결 저장소 창)을 열고,
레포 띠 ⚙는 또 다른 탭 배열을 연다. 일괄 창의 `전역` 탭은 일곱 절을 한데 모았고, `세션` 탭의 값(모드·Worker
주소·base 동기화)은 뜻을 알기 어렵다. 실측(2026-11-10, 등록 저장소 22곳): `workflow_mode`를 둔 저장소는
없고, `bdui_url` 저장소 예외 4곳은 모두 공통값과 같으며, base 동기화는 2곳만 켜져 있다. 사용자 결정
(2026-11-10): 모든 ⚙는 같은 창·같은 탭이고 위쪽 대상만 다르다. 세션 탭은 없앤다 — 모드는 화면에서 빼고,
Worker 주소는 저장소별 예외 칸을 없애며, base 동기화는 저장소 탭으로 옮긴다(`docs/superpowers/specs/2026-11-10-settings-one-window-account-switch-split-design.md`).

대안과 기각 사유: 진입점별 창 유지 — 같은 아이콘이 다른 창을 여는 혼란이 남는다. 서버 전역 값을 모니터
일괄 창 전역 탭에만 두기(네 ADR의 현행) — 저장소 하나 창에서 서버 전역 값에 닿을 수 없고, 레일을 대상 묶음과
서버 전체 묶음으로 나누면 섞임 없이 한 창에 둘 수 있다. Worker 주소 예외 편집 유지 — 공통값과 같은 예외가
숨어 남아, 공통값을 바꿔도 그 저장소만 옛 주소로 남는다.

전제: ADR UI-u6ud-2 — beads-ui는 계약 키를 정의하지 않는 소비자다. 화면에서 `workflow_mode` 행을 빼도 키와
기본값은 dotfiles 계약이 정한다.

아래는 합친 네 ADR의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

##### ADR UI-rd2m의 맥락 (승계)

- `UI-u6ud-10`은 칩 바인딩을 칩마다 general 프리셋 하나로 한정하고 `route=quick_fix` 이슈의 칩 클릭을 `preset_route_mismatch`로 거부했다. 그래서 quick_fix 이슈에서는 판정 칩이 사유 팝업만 열었다.
- 사용자 결정(2026-10-14): quick_fix 이슈에서도 칩 클릭이 프리셋을 적용해야 하고, quick fix 쪽 프리셋은 일괄 창 칩 탭에서 일반 프리셋과 함께 고른다. 뒤집는 조항은 "바인딩은 general 프리셋만 가리키고 quick_fix 이슈 클릭은 거부한다" 하나이고, 나머지 조항은 아래에 그대로 다시 적는다.
- 버린 대안: 칩마다 `{ general, quick_fix }` 객체로 저장 형태를 바꾸기(읽는 곳 전부와 파일 이행이 함께 움직여야 하는데 얻는 것이 없다), 프리셋 하나가 두 계열을 겸하기(계열 분리를 뒤집는다).

##### ADR UI-gpac-2의 맥락 (승계)

이 결정은 `ADR UI-ooc0`(모델 활성은 서버 전역 꺼 둔 모델 목록으로 선택지만 거른다)을 다시
쓴다. 소비자(모델 활성 상태 파일·`model-visibility-store.js`·설정 화면 선택지)를 공유하므로
새 주제가 아니다. 바꾸는 조항은 "저장은 꺼 둔 모델 목록이라 새로 추가되는 모델은 자동으로
보인다" 하나이고 나머지는 모두 승계한다.

`ADR UI-gpac`으로 Codex 모델 이름이 Codex CLI 목록에서 만들어지면서, 모든 적격 버전에
고정 이름(`sol-6.1`·`sol-6`·`sol-5.6`·`astra-6` 등)이 생긴다. UI-ooc0 그대로면 새 버전이
나올 때마다 선택지가 길어진다. 사용자는 설정 화면에 별칭만 기본으로 보이고 고정 이름은
켤 때만 보이길 원했다(사용자 결정 2026-10-07). 대안은 모두 표시, 별칭만 표시(켤 수
없음), 직전 버전까지 표시였다.

##### ADR UI-57us의 맥락 (승계)

이 결정은 `ADR UI-5cmo`를 다시 쓴다. 그 ADR이 UI-ksi6을 거쳐 UI-lbm5에서 승계한 세션 레인 조항("`session-preferred`는 `exec_lane=session`일 때만 세션 레인", `세션 권장` 칩의 `session` ↔ 해제 토글)이 이 결정과 소비자(`app/utils/worker-eligibility.js` `execLaneOf` — 서버 투영·카드·스케줄러가 공유, `server/ws/worker-handlers.js` `chip-session-toggle`의 쓰기와 readback, `app/views/worker/session-toggle.js`, `app/views/worker/lanes.js` 칩 렌더)를 공유하므로 새 주제가 아니다. 정본 계약 값(`labels.scheduling.session-preferred.queue_execution=session_lane_default_or_headless`)은 형제 `ADR dotfiles/dotfiles-sd3hu`가 정하고, 이 ADR은 beads-ui 쪽 소비 구현의 결정이다(전제: `ADR UI-u6ud-2` — beads-ui는 계약의 소비자다).

- UI-5cmo: UI-lbm5 승계 조항의 머리 문장·"이슈의 실행 방식은 …"·"`exec_lane`은 beads-ui가 쓰는 키다 …" 변경, 나머지 유지.

UI-57us(2026-11-09 사용자 결정): Worker 대기열의 `session-preferred` 이슈도 기본으로 session-hub 세션 레인으로 진행한다. 세션 레인은 남은 사람 판단이 없으면 끝까지 진행하고 성공 결과 줄 뒤 창을 스스로 닫으므로(UI-lbm5·UI-mcth 조항), headless 기본은 사람이 필요한 지점에서 파킹·세션 문의로 넘어와 이득이 작았다. 칩은 기본 `세션 실행`으로 보이고 누르면 `Worker 실행`(headless)으로 바뀐다.

대안과 기각 사유: headless 기본 유지 — 위 이유로 이득이 작다. 저장된 `exec_lane=session` 값을 일괄 이전 — 저장된 값과 자기개선 hygiene 스크립트가 쓰는 `session`이 새 판정에서도 같은 뜻(세션 레인)이라 이전이 필요 없다. `session`과 `worker` 명시 값 사이 토글 — 기본 상태에 쓰기가 생겨 새 이슈가 기본을 따르지 못한다.

아래는 `ADR UI-5cmo`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

###### ADR UI-5cmo의 맥락 (승계)

이 결정은 `ADR UI-ksi6`를 다시 쓴다. 그 ADR이 UI-hf8v에서 승계한 "모니터 탭은 카드별 `[추천 배치]`와 레인 점선 미리보기를 그리지 않는다" 조항과 모니터 전체 배치안 패널 조항(저장소 카드·`[전체 적용]`)이 이 결정과 소비자(`app/views/worker/placement.js` `interleavePreview`·`placementPlanTable`, `app/views/monitor/index.js`·`placement-panel.js`, `app/views/monitor/card-parity.test.js`, parity 스펙 §9 표)를 공유하므로 새 주제가 아니다.

- UI-ksi6: UI-hf8v 승계 조항 "카드별 추천은 …"·"모니터 탭 대기 레인 머리는 …"과 UI-blx2 승계 조항 "`uncovered`는 …"의 모니터 적용 명칭 변경, UI-5cmo 조항 신설, 나머지 유지.
- 전제: 배치 계산·레포 단위 적용·CAS 전송·새 레인 점선 카드 없음·카드별 추천은 Worker 탭에만이라는 배치 조항은 그대로 따른다.

UI-5cmo(2026-11-09): 모니터 탭 `[전체 배치안]`은 레포마다 표(번호·후보·배치안·근거·포함)만 보여서, 각 후보가 어느 레포 어느 레인 자리에 들어가는지 눈에 들어오지 않았다. 같은 날 모니터 대기 열도 레포별 묶음(그 레포의 `병렬`·`직렬 N` 레인)으로 바뀌어, 레인 안 자리를 직접 보일 수 있게 됐다. 사용자 결정(2026-11-09, 목업 검토): 배치될 카드는 Worker 탭처럼 각 레포 레인 안 실제 자리에 끼우고, 그 레포 표는 그 레포 묶음 바로 아래에 두며, `[전체 적용]`은 적용할 레포를 골라서 보낸다.

대안과 기각 사유: 레포 카드 안에 레인 지도를 따로 그리기 — 이미 있는 레인을 두 번 그린다. 표만 유지 — 위치가 보이지 않는다.

아래는 `ADR UI-ksi6`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

####### ADR UI-ksi6의 맥락 (승계)

이 결정은 `ADR UI-ymcx`를 다시 쓴다. 그 ADR이 UI-btsr에서 승계한 "tip이 실패이면 사람 권한이 있을 때만 tip을 잇는 새 기록 하나를 사전기록한다"·"부팅 재개, `resumeCompletionCleanup`, 관측형 자동 재시도, 첫 정리 실행은 권한이 없고 실패 기록을 지금처럼 채택한다" 조항과 "배포 해소 사다리는 `script_retry` 한 단계" 조항이 이 결정과 소비자(`server/worker/repo-operation-coordinator.js` 배포 사슬, `server/worker/resolution-ladder.js`)를 공유하므로 새 주제가 아니다. 정본 계약(종료 코드 75의 의미·자동 재확인 허가·간격과 기한 값)은 형제 `ADR dotfiles/dotfiles-rnyd9`가 정하고, 이 ADR은 beads-ui 쪽 소비 구현의 결정이다.

- UI-ymcx: 조항 "배포 해소 사다리는 `script_retry` 한 단계"·UI-btsr 승계 "사람 권한은 `retryCleanupLocked` 진입에만"·"tip이 실패이면 사람 권한이 있을 때만 후계" 변경, UI-ksi6 조항 신설, 나머지 유지.
- 전제: ADR UI-u6ud-2 — 종료 코드 어휘와 자동 실행 허가는 dotfiles 계약이 정의하고 beads-ui는 핀 사본(`generated/contracts/`)으로 소비하며, 낮은 스키마면 표시와 동작을 지금대로 둔다(fail-quiet).

UI-ksi6(2026-11-08): Cortex-n5y·Cortex-io3는 코드 착지까지 마쳤지만 착지 단계의 배포(Cortex `repo-ops/script/deploy`)가 exit 1로 끝났다. 라이브 볼트가 매시 자동 커밋과 갈라졌거나 미커밋 편집이 겹쳐, 스크립트가 사용자 편집을 지키려고 설계대로 거부한 것이다. Worker는 몇 초 간격 두 번의 같은 실패를 코드 결함으로 보고 수정 Bead(Cortex-604)를 만들었고, 그 Bead는 "refuted: 설계대로 거부"로 닫혔다. 이튿날 조건이 저절로 풀려 라이브가 두 착지 SHA를 담았는데도 카드는 6시간 넘게 「실패 · 착지 실패」로 남았다. 사용자 결정(2026-11-08): "기다리면 풀리는" 배포 실패는 스크립트가 신호로 알리고, Worker는 수정 Bead 없이 대기로 두며 스스로 다시 확인해 정리까지 끝낸다.

대안과 기각 사유: stderr 표지 줄 — 로그 문구가 계약이 되어 깨지기 쉽다. 같은 fingerprint 재시도에 시간 간격을 두는 판정 강화 — 스크립트만 아는 차이를 Worker가 추측한다. 다른 경로의 성공만 관측하는 읽기 확인 — 저장소마다 배포 증거 정의가 새로 필요하다. base tip 이동 때만 재실행 — 원격 이동 없이 풀리는 조건을 놓친다.

아래는 `ADR UI-ymcx`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

######## ADR UI-ymcx의 맥락 (승계)

이 결정은 `ADR UI-blx2`를 다시 쓴다. 그 ADR이 UI-u6ud-5에서 승계한 "핀된 base SHA의 `[deploy]`" 조항과 UI-btsr에서 승계한 "정책·스크립트는 마지막 성공 배포의 base에서 읽는다" 조항이 이 결정과 소비자(`server/worker/repo-operation-coordinator.js` 배포 실행·정리 재시도)를 공유하므로 새 주제가 아니다. 정본 계약 변경은 형제 `ADR dotfiles/dotfiles-8lp38`이 맡고, 이 ADR은 beads-ui 쪽 소비 구현의 결정이다.

UI-ymcx(2026-11-07): train_bot-q54 PR #16이 배포 스크립트와 `requirements.txt` 형식을 함께 바꿨다. Worker는 이전 base 스크립트 blob을 실체화해 실행했고, 그 스크립트가 새 `requirements.txt`를 읽지 못해 `remote dependency check failed`로 세 번 실패했다. 스크립트를 고치는 PR이 자기 수정으로 배포될 길이 없었다. 사용자 결정(2026-11-07): 배포는 머지된 커밋의 선언·스크립트로 실행한다. 머지 전 검증은 이전 base 그대로 둔다. 첫 `[deploy]` 선언도 승인 없이 배포한다. `[배포 실행]` 버튼은 복구용으로만 남긴다.

- 전제: ADR dotfiles/dotfiles-8k8yf — 선언 정본은 각 레포의 `repo-ops/config.toml`이고 Worker는 의도·관측만 갖는다. 정책 커밋 조항은 형제 dotfiles-8lp38이 대체한다.

아래는 `ADR UI-blx2`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

######### ADR UI-blx2의 맥락 (승계)

이 결정은 `ADR UI-ey6v`를 다시 쓴다. 그 ADR과 소비자(`app/utils/placement/compute.js`의 묶음·레인 선택, `app/utils/placement/apply.js`의 `[적용]`·`[전체 적용]` 전송, `app/views/worker/placement.js` 경고 문구, dotfiles `execution-worker-lane.md` 세션 배치 절차)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 `(신설, UI-ey6v)` 조항 안의 "상대의 배치는 옮기지 않는다" 전제와, 대기·점유 상대(K)를 고칠 수 없는 입력으로 보고 덮지 못한 상대에 `uncovered`를 다는 승계 규칙이다. 선행 병렬 예외와 나머지 조항은 그대로 승계한다.

UI-blx2(2026-11-07): dotfiles 배치안 표가 `dotfiles-l62k9`를 `병렬 · 대기 #2`에 두고 "⚠ dotfiles-83ss0(병렬)과 동시에 돌 수 있음 — 상대를 직렬 레인으로 옮기면 피할 수 있음"만 달았다. 직렬 1·2는 비어 있었다. 자리 계산은 이미 대기열에 있거나 레인을 점유한 상대의 자리를 고정 입력으로 보아, 부딪힘을 알면서 둘 다 병렬에 두고 사람에게 옮기라고 미뤘다. 사용자 결정(2026-11-07): "배치안 만들 때부터 직렬 레인에 배치해서 안 겹치게", "근본 원인을 고쳐야지. 배치안 만드는 기준부터" — 다른 직렬 레인에서 기다리는 상대도 옮기고, 직렬 레인 없이 실행 중인 상대는 그 lineage를 후보의 직렬 레인에 묶는다.

- 전제: ADR UI-u6ud-2 — dotfiles 세션 배치 절차의 변경은 dotfiles가 소유한다. 이 ADR은 beads-ui 배치안 계산·적용 쪽 결정이다.

아래는 `ADR UI-ey6v`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

이 결정은 `ADR UI-hf8v`를 다시 쓴다. 그 ADR이 UI-lsr4에서 승계한 "같은 파일을 선언한 쌍은 고정 부딪힘"과 "폴더만 겹치는 쌍은 jev가 높은 확신으로 독립이라 할 때만 병렬" 조항의 레인 배치가 이 결정과 소비자(`app/utils/placement/compute.js`의 묶음·레인 선택, `app/utils/placement/apply.js`의 `[전체 적용]` 재계산, `app/views/worker/placement.js` 경고 문구)를 공유하므로 새 주제가 아니다. UI-hf8v: 조항 신설 하나(`(신설, UI-ey6v)`, 부딪힘 쌍 배치의 선행 예외), 나머지 유지.

UI-ey6v(2026-11-07): CRC-rokit `rokit-471`의 지난 실패 attempt가 직렬 레인 `s1`을 잡은 채, 새 attempt가 선행 이슈 `rokit-50d`를 만들고 선행 대기로 끝났다. 세션 배치 절차는 blocks 간선을 따라 `rokit-50d`를 `s1` 맨 앞에 놓았고, `rokit-50d`는 `rokit-471`의 점유에 막혀 시작하지 못했으며 `rokit-471`은 `rokit-50d`가 닫혀야 돌 수 있어 교착이 됐다. 같은 날 `rokit-09a`·`rokit-ctq`도 같은 자리에 놓였다. 점유 판정의 결함(지난 실패가 최신이 아닌데도 레인을 잡음)은 같은 스펙이 따로 고치지만, 최신 attempt 자체가 실패인 경우에는 선행을 그 줄에 두면 여전히 막힌다. 사용자 선택(2026-11-07): 선행은 다른 일을 풀어 주는 작업이라 줄에 묶이면 안 되므로, scope가 겹치는 제3의 이슈가 있어도 병렬로 간다.

- 전제: ADR UI-u6ud-2 — dotfiles 세션 배치 절차의 변경은 dotfiles가 소유한다. 이 ADR은 beads-ui 배치안 계산 쪽 결정이다.

아래는 `ADR UI-hf8v`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

이 결정은 `ADR UI-lsr4`를 다시 쓴다. 그 ADR의 "추천은 Worker 탭 … 모니터 탭과 이슈 상세에는 달지 않는다" 조항과 "Worker 탭이 구독한 저장소만 jev를 묻는다"는 배치 투영이 이 결정과 소비자(`server/ws/worker-handlers.js` `placementFor`, `app/views/worker/placement.js`, parity 스펙 §9 표, `app/views/monitor/card-parity.test.js`)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 모니터 탭 배제 하나이고, 모니터 가시 저장소의 jev 판정 일정과 모니터 전체 배치안을 신설한다. 나머지 조항은 그대로 승계한다.

UI-hf8v(2026-10-20): `[전체 배치안]`은 Worker 탭 대기 열 머리에만 있고 그 저장소 후보만 다뤘다. 여러 저장소를 배치하려면 저장소마다 Worker 탭을 열어야 했다. 또 jev 일정은 그 저장소의 Worker 탭 구독자가 있을 때만 켜져서, 모니터만 연 저장소의 쌍은 `pending`에 머물렀고 모니터에서 보내는 다시 판정도 효과가 없었다. 사용자 요청(2026-10-20): "모니터탭에서도 전체 배치안 누르면 모든 활성화 레포에 대해 배치를 할수 있도록 하는게 어때?" — 390px 화면 예시를 본 뒤 승인했다.

- 전제: 레인·충돌 판정·큐 revision이 저장소마다 따로다. 한 저장소 revision을 다른 저장소에 쓰면 항상 충돌한다.

아래는 `ADR UI-lsr4`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

이 결정은 `ADR UI-mcth`를 다시 쓴다. 그 ADR이 UI-i7k9에서 승계한 "고정 조건은 직접 blocks 하나" 조항과 "jev의 충돌은 해소 세션으로도 풀기 어려운 겹침에만" 조항이 이 결정과 소비자(`server/placement/relations.js`·`question.js`·`wire.js`, `app/utils/placement/compute.js`·`apply.js`, `app/views/worker/placement.js`)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 그 둘이고, 직렬 레인 증설과 고정 관계만 있는 후보의 추천을 신설한다. 나머지 조항은 그대로 승계한다.

UI-lsr4(2026-10-17): UI-i7k9 배포 뒤 `[전체 배치안]`이 거의 모든 후보를 병렬로 냈다. 새 질문 버전으로 판정한 72쌍 중 71쌍이 `independent`였고 선후 답은 없었다. 병렬 행의 `— X 뒤` 문구는 순서 의존으로 읽혔다. 사용자 판단(2026-10-17): 직렬은 기다리는 시간만 잃지만 충돌 해소 세션은 세션 하나와 재작성 위험을 쓰므로, 같은 파일을 고치는 쌍은 직렬이 기본이어야 한다. 다만 `tests` 같은 폴더 하나가 겹친다고 모든 쌍을 한 레인에 몰던 UI-izba 규칙으로 돌아가지는 않는다. 또 자리 계산은 서로 무관한 직렬 묶음을 이미 차 있는 기존 레인, 곧 남의 줄 뒤에 세웠다.

아래는 `ADR UI-mcth`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

이 결정은 `ADR UI-i7k9`를 다시 쓴다. 이 결정과 UI-i7k9는 소비자(`server/worker/scheduler.js`의 세션 레인 메시지 처리와 창 소멸 정산)가 같으므로 새 주제가 아니다. 뒤집는 조항은 세션 레인의 "결과는 종단 결과 줄로 headless와 같은 판정을 탄다" 하나이고, 나머지 조항은 그대로 승계한다.

- 전제: ADR UI-u6ud-2 — 종단 결과 줄 어휘와 세션 레인 세션의 계약은 dotfiles가 정본이다. beads-ui는 그 줄을 읽어 창 처리만 정한다.

UI-mcth(2026-10-17): Cortex-cv5(`worker-ineligible`) 세션 레인 attempt의 Codex 세션이 승인 스펙의 사람 확인 지점에서 대화로 묻지 않고 `대기 · recovery:authority` 결과 줄을 썼다. beads-ui는 그 줄을 headless와 같은 판정에 넣어 `failAttempt(session_recovery_wait)`로 정리했고 5초 뒤 hub 창을 kill했다. 질문은 Bead 댓글에만 남고 사용자는 답할 창을 잃었다. 세션 레인의 존재 이유는 "사람이 필요할 때 그 창에 들어가 답한다"인데 사람 답이 필요한 결과 줄에서 창을 닫으면 그 목적이 깨진다. 사용자 결정(2026-10-17): 세션 레인 attempt는 착지 전까지 hub 창을 유지하고 답을 기다리는 동안에도 슬롯을 점유한다. 창을 유지하는 결과 줄은 사람 답이 필요한 것만이고, Worker가 스스로 재개하는 대기(blocks·external·base_moved)는 지금처럼 정리한다.

아래는 UI-i7k9의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

######### ADR UI-i7k9의 맥락 (승계)

이 결정은 `ADR UI-izba`와 `ADR UI-lbm5`를 하나로 통합해 다시 쓴다. 두 ADR은 `app/views/worker/placement.js`를 함께 다스린다 — UI-izba는 배치 추천 미리보기를, UI-lbm5는 후보 사실·자격 판정(세션 레인 후보)을. 이 결정이 바꾸는 배치 판정도 같은 소비자를 지나므로 새 주제가 아니다.

- UI-izba: 대기열 배치 추천의 고정 조건 조항 변경(선언 scope 겹침을 고정에서 뺀다)·jev 질문 기준 조항 신설, 나머지 유지(UI-u6ud-5에서 승계한 배포·빌드 조항 포함).
- UI-lbm5: 바꾸는 조항 없이 전부 유지(UI-1eag 이하에서 승계한 조항 포함).

UI-i7k9(2026-10-16): UI-izba 배치 추천을 쓰면서 병렬 배치가 거의 나오지 않고 직렬 배치는 한 레인으로 몰렸다. 선언 scope가 경로 접두만 겹쳐도 고정 `conflict`가 되었기 때문이다 — `tests` 같은 폴더 하나를 선언하면 그 아래 파일을 고치는 모든 이슈와 부딪혔고, jev는 그 판정을 뒤집지 못했으며, 자리 계산은 부딪힘으로 이어진 후보를 한 묶음으로 보아 한 직렬 레인에 넣었다. 사용자 판단(2026-10-16): 머지 충돌은 충돌 해소 세션이 푸니, 동시에 돌리면 안 되는 쌍은 한쪽이 다른 쪽 결과를 전제하거나 같은 부분을 크게 고쳐 해소 세션으로도 풀기 어려운 경우뿐이다.

아래는 두 원본의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

######### ADR UI-izba의 맥락 (승계)

- `UI-u6ud-5`는 배포 실행·빌드 소유와 함께 "병렬성 분석 기능은 없다"를 상시 조항으로 들고 있었다. 2026-08의 병렬성 분석(ADR 0009로 제거)은 버튼을 눌러야 분석이 돌았고 느려서 실시간으로 쓸 수 없었다. 0009 본문은 제거 이유를 신뢰·채택 실패로 적었지만, 사용자 증언(2026-10-16)으로 실제 이유는 느림·실시간 불가였다.
- 지금은 대기열에 넣을 이슈의 병렬·직렬 레인 배치를 사람이 매번 정한다. 결정적 신호(blocks 재정렬, spec scope 겹침 `⧉` 칩)는 이미 있지만 경로로 안 보이는 관계는 없다.
- jev 실측(workflow 판정 로그 1,787건)은 응답 p50 403ms·p90 940ms였다. 볼 때마다 부르면 지연이 남고, 미리 판정해 캐시하면 누르는 순간 기다리지 않는다.
- 이 ADR은 `UI-u6ud-5`를 대체한다. 배포·빌드 조항은 바뀌지 않고 아래 Decision에 그대로 다시 적는다. 뒤집는 조항은 "병렬성 분석 기능은 없다" 하나다.

######### ADR UI-lbm5의 맥락 (승계)

이 결정은 `ADR UI-1eag`를 다시 쓴다. 그 ADR이 UI-5chz를 거쳐 승계한 UI-gske의 "생존 소유" 조항과 이 결정이 소비자(`scheduler.js`의 `reconcile`·`occupiedBeadIds`·`isDeadAttempt`, 대화형 창의 마커 정산)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 생존 소유의 두 문장이다. 세션 레인 attempt는 pid가 아니라 마커 pane으로 생존을 판정하고, 슬롯을 점유하는 대화형 세션이다. 나머지 조항은 그대로 승계한다.

- 전제: ADR UI-u6ud-2 — 세션 레인의 뜻과 권한(대기열 등록 = 구현 승인, `worker-ineligible`의 새 뜻)은 dotfiles 계약이 정하고, beads-ui는 그 계약의 소비자로 구현한다.
- 전제: ADR UI-3v1h — 공급자 보류(계정·러너)를 headless와 같게 적용한다.
- 전제: ADR UI-rd2m — 칩 클릭이 이슈 metadata를 쓰는 직렬화 규칙을 따른다.
- 전제: ADR UI-ny0h — 세션 레인의 PR도 단일 순차 머지 큐와 머지 자격을 그대로 탄다.
- 전제: ADR dotfiles/dotfiles-fixnj — 대화형 창은 session-hub로 열고, 허브가 Worker 표지 env를 벗긴다.

UI-lbm5(2026-10-16): session-hub로 대화형 Claude 세션을 열 수 있게 되었는데 `worker-ineligible` Bead는 후보 레인에 관찰 전용으로 남고 끌어 놓기가 막혀 있었으며 서버 admission도 거절했다. 사용자는 세션을 직접 열고 구현 시작 질문부터 답해야 했다. 사용자는 대기열 한 곳에서 Worker로 못 돌리는 일도 순서대로 올리고, 차례가 오면 beads-ui가 대화형 세션을 열며, 사람이 필요할 때만 그 창에 들어가기로 결정했다(대기열 등록이 구현 승인, fast_track, 동시 실행 칸 공유, 실행 프리셋 그대로).

아래는 `ADR UI-1eag`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-1eag의 맥락 (승계)

이 결정은 `ADR UI-5chz`를 다시 쓴다. 그 ADR이 승계한 post-merge 잡 원장·`replaces` 승계·CAS 확정과 머지 후 결함 인계 조항이 이 결정과 소비자(`pr-actions.js` 정리, `queue-store.js` 원장, `repo-operation-coordinator.js` 잡 정렬)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 없다. 이 결정은 승계 조항에 실행 위치 규칙 둘을 더한다.

- 전제: ADR UI-u6ud-2 — 실행 위치 규칙은 dotfiles 정본 조항(`workflow-contract.md` 일회성 잡 문단, `workflow-state.yaml repo_operations.post_merge_jobs`, dotfiles-nsvwk)이 정하고, 이 저장소는 그 소비 구현이다.
- 전제: ADR UI-u6ud-5 — 잡은 배포와 같은 durable operation 봉투·잠금·워크트리를 쓴다.

UI-1eag(2026-10-16): dotfiles-gqsok(PR #607)의 정리가 `post_merge_job_target_moved:dotfiles-79429-retire-discord.py@32aa369e…`에서 멈춰 직렬 레인과 뒤의 다섯 건을 막았다. 원인은 두 결함이 겹친 것이다. 첫째, Worker quick_fix 직접 push 착지 정산에는 머지 후 잡 단계가 없어 그 착지가 커밋한 잡을 다음 PR 행이 떠안았다. 머지 후 결함의 자동 인계가 quick_fix 수리 Bead로 가므로 수리본(`repo-ops-replaces` 선언 포함)도 이 경로로 착지했고 실행될 행이 없었다. 둘째, 원래 행 재시도는 자기 머지 SHA 트리에서 잡을 찾아 그 SHA로 정렬하는데, 공유 배포 워크트리는 수리 착지 배포로 이미 앞서 있었고 되감기 금지 때문에 매번 거부됐다.

아래는 `ADR UI-5chz`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-5chz의 맥락 (승계)

이 결정은 `ADR UI-gske`를 다시 쓴다. 그 ADR과 소비자(`notify.js` 대화 알림 집합, `scheduler.js` reconcile의 메시지 처리 뒤 알림)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 UI-gske가 UI-nuwy에서 승계한 둘이다: "대화 알림은 `🙋 확인 필요`·`❓ 답 대기`·`↪ Worker가 이어감`·`🙋 사람 인수` 넷"과 "같은 멈춤의 재알림은 `❓`가 맡는다". 나머지 조항은 모두 승계한다.

- UI-gske: 대화 알림 넷 조항과 `❓` 재알림 조항 변경, 나머지 유지.
- 전제: ADR UI-u6ud-2 — 세션 스레드를 만드는 브리지와 훅 직접 전송은 dotfiles가 소유하고, beads-ui는 스레드 목록을 읽기만 한다.

UI-5chz(2026-10-16): Worker 대화 세션(Cortex-ppg 충돌 해소 대화)이 턴을 끝낼 때마다 같은 내용이 두 곳에 왔다. dotfiles Discord 브리지는 세션 스레드 `🙋 Worker 대화 · <id>`에 질문 카드와 턴 종료를 올리고, beads-ui 서버는 같은 마지막 메시지 발췌를 `#beads-worker` 채널에 `❓ 답 대기 — <id>`로 다시 보냈다. 브리지에 spool하지 못하면 dotfiles 훅이 `discord` 명령으로 질문·턴 종료를 직접 보낸다.

사용자 결정(2026-10-16): 질문은 세션 스레드에만 뜨면 된다. 채널 푸시를 없앤다. 같은 원칙을 아직 구현 전인 UI-lbm5(세션 레인)의 답 대기에도 적용한다.

아래는 `ADR UI-gske`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-gske의 맥락 (승계)

이 결정은 `ADR UI-btsr`를 다시 쓴다. 그 ADR과 소비자(`resolve-session.js` 실패 대화 자동 기동기, `completion-intent.js` 알림 대상 `NEEDS_HUMAN_NOTIFY_CLASSES`, `wait-judgment.js` 조치 필요 불변식, 「저장소 작업」 서랍의 Bead 없는 행 대화, 설정 창 스위치 문구)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 둘이다: "정리 중단은 알리지 않는다"와 "머지 전 검증 보류·정리 중단·외부 작업 완료는 자동 기동하지 않는다". 나머지 조항은 모두 승계한다.

계약 쪽 결정은 `ADR dotfiles/dotfiles-it5mv`·`ADR dotfiles/dotfiles-it5mv-2`다 — 해소 세션의 질문·인수 권한, `session_inquiry` 입력의 필드·상태·전이·재개 조건, 세 실패 종류의 자동 기동 조건은 dotfiles `docs/contracts/workflow-state.yaml`이 정본이고(`ADR UI-u6ud-2`), 이 ADR은 그 소비자 쪽 결정이다. 같은 상태 요청 200 무변경·허용 밖 전이 409 `invalid_transition`은 dotfiles-hraaf가 계약에 고정했다.

UI-gske(2026-10-13): base-sync 보관 해소 세션이 사람 판단이 필요해 멈춰도 확인 필요 칩에 올릴 입력이 없었다. 확인 필요 행의 원천은 Worker attempt·`repo_operations`·외부 대기뿐이었다. 또 완료 의도 없이 기록된 정리 실패는 자동 재시도 주체가 없는데도 알림 없이 카드에만 남았고, 머지 전 검증 실패 보류는 대화를 클릭으로만 열 수 있었다.

- 전제: ADR UI-u6ud-2 — 행 종류·필드·상태·재개 조건은 dotfiles 계약을 베낀 소비자 구현이고, 계약 키가 없으면 표시를 생략한다.

아래는 `ADR UI-btsr`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-btsr의 맥락 (승계)

이 결정은 `ADR UI-c74x`(세션이 선언한 자격 증명 대기의 같은 세션 대화)를 다시 쓴다. 그 ADR과 소비자(`pr-actions.js` 정리 재시도 권한, `pr-wait-row.js` 술어·버튼, `scheduler.js` 인계 실행, `notify.js`·`completion-intent.js` 다음 행동 문구)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 UI-18a5에서 승계한 "실패의 머지 후 정리는 정리 재시도 = `[워커로 이어가기]`"라는 출구 이름 하나이고, 나머지 조항은 모두 승계한다. 버튼 이름의 정본은 dotfiles 계약 `needs_human_reentry.actions.cleanup_retry.label`이고(`ADR UI-u6ud-2`), 그 이름을 `[정리 재시도]`로 바꾸는 계약 쪽 결정은 형제 dotfiles-md59z가 `ADR dotfiles/dotfiles-imy71`을 대체하며 기록했다. 이 ADR은 그 소비자 쪽 결정이다.

UI-btsr(2026-10-12): dotfiles-3hflz의 머지 후 자동 배포가 볼트 접근 허가 부족으로 04:39에 실패했다. 사람이 07:01에 허가한 뒤 해결 세션이 두 번(07:02·07:51) 인계했지만 배포는 한 번도 다시 돌지 않았다. 정리 재시도는 `repo_operations` 단계에서 `runCleanup`으로 다시 들어가고, 자동 배포 식별자가 base·target·스크립트만으로 결정돼 같은 실패 기록을 채택했기 때문이다. 툴팁은 "배포를 다시 돌린 뒤 정리를 잇습니다"라고 약속했지만 지켜지지 않았고, 버튼 이름 `[워커로 이어가기]`는 그 클릭이 무엇을 하는지 말하지 않았다.

- 전제: ADR UI-u6ud-5 — 배포 실행 소유, 상시 `script_retry` 한 단계, 수동 `[배포 실행]`을 그대로 쓴다. 사람 재시도는 사다리를 바꾸지 않고, 새 실행이 사다리를 새로 갖는다.

아래는 `ADR UI-c74x`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-c74x의 맥락 (승계)

이 결정은 `ADR UI-k467`(외부 PR 사람 처리 필요 실패 행과 알림 클래스)을 다시 쓴다. 그 ADR과 소비자(`session-stall.js`의 대화 대상 술어, `direction-inquiry.js` 진입 블록 사본과 다이제스트 테스트, scheduler의 대화 기동, `wait-judgment.js`의 복구 대기 판정, `notify.js`의 대화 알림)를 공유하므로 새 주제가 아니다. 바꾸는 조항은 UI-k467이 UI-jbl1(UI-nuwy)에서 승계한 둘 — "대화 대상 복구 사유는 `authority`·`no_progress`"와 "`credential`은 판정이 바뀌지 않는 공급자 보류 경로" — 이고 나머지는 모두 승계한다. 어느 멈춤이 사람 대화를 여는지와 진입 블록 바이트의 정본은 dotfiles `ADR dotfiles/dotfiles-imy71`(사람 멈춤 세 종류)이고 이 ADR은 그 소비자 쪽 결정이다.

UI-c74x(2026-10-10): dotfiles-ubf0o의 Worker 세션이 NAS의 Codex 로그인 계정 불일치로 `대기 · recovery:credential`을 남기고 01:25에 끝났다. 자동 대화가 열리지 않았고 Discord 알림도 없었다. 사용자는 06:37에 모니터를 직접 열어 `[세션에서 이어가기]`를 눌렀고, 인계 뒤 다시 실행된 세션도 06:50에 같은 사유로 알림 없이 멈췄다. UI-jbl1은 `credential`이 공급자 보류 경로로 간다고 전제했지만 그 경로(`ADR UI-3v1h`)는 Worker 자신의 러너 계정 인증 실패만 잡는다. 세션이 작업 대상 머신의 자격 증명을 선언한 대기는 그 경로에 닿지 않고 `waiting`으로 남았다.

사용자 결정(2026-10-10): 공급자 보류로 바뀌지 않은 세션 선언 `provider` 대기는 이번 범위 밖이다.

- 전제: ADR UI-u6ud-2 — 멈춤 종류와 진입 블록은 dotfiles 계약이 정하고 beads-ui는 바이트를 베껴 다이제스트로 고정한다.
- 전제: ADR UI-3v1h — Worker 러너 계정 인증 실패는 계정 단위 공급자 보류로 남는다.

아래는 `ADR UI-k467`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-k467의 맥락 (승계)

이 결정은 `ADR UI-9w5l`(버튼으로 풀리는 조치 필요와 대기 사유 무알림)을 다시 쓴다. 그 ADR과 소비자(`completion-intent.js` 알림 분류, `notify.js` 다음 행동 문구, `tileResolveFields` 행 종류, `pr-wait-row.js` `[머지]` 술어)를 공유하므로 새 주제가 아니다. 바꾸는 조항은 UI-jbl1에서 승계한 닫힌 목록 둘 — 남는 `needs_human` 알림 클래스와 `[세션에서 이어가기]`가 서는 실패 행 — 이고 나머지는 모두 승계한다. 외부 PR의 머지 권한·대상 `[verify]`·`foreign_handoff`·머지 뒤 마감 조항의 정본은 dotfiles `ADR dotfiles/dotfiles-8k8yf`이고 이 ADR은 그 소비자 쪽 결정이다.

UI-k467(2026-10-11): dotfiles-s6vnr은 rig가 없는 research-repo-template의 PR #4로 전달됐고 세션은 `성공 · PR #4`로 끝났다. Worker의 세션 뒤 확인은 기록된 `pr_url`을 작업 공간 origin과만 비교해 `no_pr`로 읽었고, 실패 카드가 직렬 레인을 잡았다.

사용자 결정(2026-10-11): 대상 저장소에 rig나 이슈를 만들지 않는다. 외부 PR도 작업 공간의 `auto_merge`·순차 머지 큐·`[머지]`를 그대로 따르고 외부 전용 스위치는 두지 않는다. 머지 관문은 대상 저장소의 repo-ops 절차로 판정한다. 대상이 `[deploy]`를 선언했거나 충돌 해결이 필요하면 자동으로 진행하지 않고 멈춰 사람에게 넘긴다.

- 전제: ADR UI-u6ud-2 — `failure_classes.foreign_handoff`의 `notify_label`은 손 복사한 레지스트리로 읽는다.
- 전제: ADR UI-ny0h — 단일 순차 드라이버, `[머지]`는 등록만, `auto_merge` 독립. 외부 PR의 머지 자격 입력은 대상 저장소 안에서 관측한다.

아래는 `ADR UI-9w5l`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-9w5l의 맥락 (승계)

이 결정은 `ADR UI-jbl1`(실패 대화 자동 기동과 확인 필요 알림 통일)을 다시 쓴다. 그 ADR과 소비자(`tileResolveFields`, `handleWorkerResolveInSession`의 resolve-in-session 경로, 대기 판정 어휘와 `notify.js`)를 공유하므로 새 주제가 아니다. 뒤집는 조항은 둘이고 나머지는 모두 승계한다: (a) UI-u6ud-7 승계 대기 어휘의 "선행이 `blocked`·`deferred`·worker-ineligible이면 `action_required`"는 "선행 대기는 늘 `normal`"이 된다. (b) "살아 있는 대화형 세션이 종류와 상관없이 하나라도 있으면 `[세션에서 이어가기]`가 서지 않는다"에 "Discord 링크가 없으면 서고 클릭은 그 대화 창을 앞으로 부른다"는 예외가 붙는다.

UI-9w5l(2026-10-11): dotfiles-8k8yf가 일부러 세션 작업 dotfiles-kb9oi(worker-ineligible, `in_progress`) 뒤에 걸려 있었는데 카드가 `⛔ 선행 대기 · 조치 필요`로 뜨고 Discord에 `⚠ dotfiles-8k8yf 지연 · 열린 선행에 사람의 조치가 필요함`이 왔다. 카드에는 누를 버튼이 없었다. 조사해 보니 `takeover_unresolved`·live 대화의 답 대기도 beads-ui 안에서 풀 버튼이 없었다.

사용자 결정(2026-10-11): 선행 대기의 조치 필요 승격과 그 알림을 없앤다. 모든 조치 필요는 beads-ui 버튼으로 해결되어야 하고 배지가 해결 방법을 설명한다. `takeover_unresolved`는 해결 세션 버튼으로 연다(sjob 새 명령 아님). 대기 사유 알림은 `action_required`·`overdue` 모두 끈다. 대화 세션이 답을 기다리는데 Discord 링크가 없으면 tmux 창을 앞으로 부르는 `[세션에서 이어가기]`를 보인다(beads-ui 안 답 입력칸은 만들지 않는다).

아래는 `ADR UI-jbl1`의 Context 승계분이다. 원본은 `docs/adr/history/`에 있다.

########## ADR UI-jbl1의 맥락 (승계)

이 결정은 `ADR UI-qbgj`(대화형 세션 이어가기 짝과 외부 작업 바로 실행)·`ADR UI-18a5-2`(대화형 레코드 원천과 정산 세 종류)·`ADR UI-18a5-3`(머지 게이트 보류와 실패 행 출구)를 다시 쓴다. 세 ADR과 소비자(`notify.js` 알림 제목, 대화 레코드 키를 읽는 reconcile·투영·UI, 실패 행 출구, 진입 블록 사본과 다이제스트)를 공유하므로 새 주제가 아니다. 대화와 수리의 경계, 공용 스위치, 진입 블록의 읽기 전용 진단, Bead 없는 저장소 작업 실패 대화의 정본은 dotfiles `ADR dotfiles/dotfiles-ids1k`(실패 대화 세션 자동 기동 계약)이고 이 ADR은 그 소비자 쪽 결정이다.

UI-jbl1(2026-10-06): oliveyoung 수동 배포(`[배포 실행]`) 실패를 진단하던 중, 수동 배포 실패는 subject가 `manual` 자리표시라 `[세션에서 이어가기]`가 없고, 실패(「🚨 사람 필요」)는 알림 뒤 클릭으로만 세션이 열리는 반면 멈춤(「🙋 확인 필요」)은 세션을 자동으로 띄워 두 경험이 갈렸다. 해결 세션은 원래 세션의 런타임을 따르고 모델·effort를 넘기지 않았으며, 자동 기동 스위치는 config.toml에만 있었다.

사용자 결정(2026-10-06): (가) 수동 배포 실패에도 `[세션에서 이어가기]`를 「저장소 작업」 서랍 안에 둔다. (나) 해결 세션의 기본 런타임·모델·effort와 대화 자동 기동 스위치를 설정 창 전역 탭에서 정한다. (다) 실패 때도 대화 세션을 자동으로 띄우되 읽기 전용 진단 뒤 질문만 하고 답 전에는 상태를 바꾸지 않으며, 「🚨 사람 필요」를 「🙋 확인 필요 · <클래스>」로 통일한다.

- `UI-qbgj`: UI-18a5 승계 조항의 "자동 기동은 사람 판단 멈춤에만" 굵은 결정·대상 행·살아 있는 대화 판정 단위·알림 조항 변경, 나머지 유지.
- `UI-18a5-2`: 대화 레코드 키·해결 세션 원천·인계 출구 조항 변경(저장소 작업 행), 나머지 유지.
- `UI-18a5-3`: 남는 `needs_human` 알림 클래스 조항 변경(알림 제목 통일·자동 기동), 나머지 유지.
- 전제: ADR UI-ooc0 — 서버 전역 편집은 기존 전역 탭 하나에 둔다.
- 전제: ADR UI-u6ud-5 — 수동 `[배포 실행]`과 `script_retry` 한 단계 사다리를 그대로 쓴다.
- ADR 0005(무인 수리 레인 폐기)는 그대로다. 자동으로 연 실패 대화는 수리 dispatch가 아니고, 구분 근거는 "첫 사용자 답 전 상태 변경 없음"이다.

아래 승계 조항의 맥락은 `docs/adr/history/`의 세 원본에 있다.

##### ADR UI-u6ud-11의 맥락 (승계)

- `UI-wecw`: 저장소 defaults 저장값과 Worker 주소 적용값의 분리, 공통 주소의 dotfiles `worker-url` CLI 소비, 0013에서 승계한 defaults 어휘·검증의 dotfiles 소유권과 fail-quiet 읽기·strict 쓰기를 전부 재진술한다(제목만 이름으로 줄인다).

## Decision

**전체 배치안에서 필수 선후(직접 blocks, 채택된 jev `a_first`·`b_first`, 부딪힘)가 정하지 않는 순서 자리는 같은
jev 요청의 선호 질문(`placement_prefer`, 채택 확신도 이상) → 우선순위 → 표시 순서로 정한다. 같은 파일 쌍에도
선호를 묻는다. 선호는 순서만 가르고 묶기·직렬 레인·넣을 자리·경고를 만들지 않으며, 이미 대기 중인 항목 앞으로
끼우지 않는다.** 이 결정이 바꾼 승계 조항은 `(변경, UI-unf5)`로 표시했다. 그 밖의 조항은 `ADR UI-3713`에서 그대로
승계한다.

- (신설, UI-unf5) 선호 질문: 같은 jev 요청에 `placement_prefer`(`a_better_first`·`b_better_first`·`no_preference`)를
  싣는다. 두 이슈를 다른 Worker가 따로 구현·머지하고 필수 선후는 없다고 가정한 채, 어느 쪽이 먼저 착지하면 다른
  쪽이 쉬워지거나 작아지거나 다시 할 가능성이 줄어드는지를 묻는다. 기존 `placement_pair` 문구는 바꾸지 않는다.
  질문 문구의 소유자는 `server/placement/question.js`다.
- (신설, UI-unf5) 채택: 서버가 채택한다. 채택 확신도 기준의 소유자는 `server/placement/wire.js` 상수
  `PREFER_CONFIDENCE`이고(기본값 0.7, 선후 채택 기준보다 낮다 — 선호는 다른 무엇도 정하지 않는 순서만 정하고 채택
  선후는 쌍을 직렬로 묶기 때문이다), 채택된 쌍의 관계에만 `prefer: 'a'|'b'`(작은 id 방향)와 `prefer_confidence`가
  붙는다.
- (신설, UI-unf5) 기본 순서: 우선순위 오름차순(숫자가 아니면 4 뒤) → 표시 순서 → id. 계산이 표시 순서로 동순위를
  가르던 곳은 기본 순서를 쓴다. 전체 배치안 표의 행 순서와 후보 칸 정렬 설정은 표시 순서 그대로다.
- (신설, UI-unf5) 묶음 안 단계와 묶음 사이 적용 순서는 같은 탐욕 위상 정렬로 정한다. 매 단계는 남은 집합과 그 안의
  관계만 보고, 필수 선행이 없는 것 가운데 선호 선행도 없는 것을 동순위 키 순으로 내보낸다. 선호끼리 돌면 그
  강한 연결 요소 안의 선호만 버리고 밖에서 들어오는 선호는 지킨다. 필수 순환이면 그 단계에서 남은 것 가운데 필수
  선행이 없는 것, 없으면 남은 것 전체에서 동순위 키가 가장 앞선 것을 내보내 순환을 끊고(이미 내보낸 순서는 버리지
  않는다), 묶음 안이면 `order_cycle`을 낸다. 선행 묶음(UI-ey6v)은 따로 정렬해 맨 뒤에 둔다. 각 선택이 남은 집합만으로
  정해지므로 `[전체 적용]`의 묶음별 재계산이 처음 계획과 같고, 적용 도중 새 판정이 계획을 바꾸면 기존 `moved`
  멈춤이 출구다(판정을 얼리지 않는다).
- (신설, UI-unf5) 넣을 자리: 선호는 넣을 index를 바꾸지 않는다. 같은 묶음 단계끼리의 부딪힘은 직렬 레인이 이미
  떼어 놓으므로 넣을 자리의 하한이 되지 않는다.
- (신설, UI-unf5) 화면: 관계 근거 줄은 채택된 선호에 ` · 먼저 하면 좋은 쪽: <id> (jev <확신도>)` 꼬리를 달고, 재료가
  없으면 그리지 않는다. Worker 탭과 모니터는 같은 줄 함수를 쓴다.
- (신설, UI-unf5) 실패: 키가 없거나 판정이 실패하면 선호가 없는 것과 같다. 같은 파일 쌍의 판정 실패는 후보를
  `unavailable`로 만들지 않는다.

아래는 `ADR UI-3713`의 Decision 승계분이다. 위 결정과 어긋나는 조항 뒤에 `(변경, UI-unf5)` 줄을 달았다.

### ADR UI-3713에서 승계하는 조항

**Worker 대화 결과 줄은 새 접두(`워커가 이어감`·`이 대화에서 마무리`·`나중에`)와 옛 접두(`인계`·`인수`·`보류`)를
같은 kind로 읽는다. 마무리(takeover)로 끝난 행도 Bead가 `open`이면 뒤 메시지의 `워커가 이어감 ·` 줄이나
`[워커로 이어가기]`로 Worker에 넘기고, 대화 알림은 `🙋 확인 필요`·`↪ Worker가 이어감`·`🙋 대화에서 마무리`
셋이다.** 이 결정이 바꾼 승계 조항은 `(변경, UI-3713)`로 표시했다. 그 밖의 조항은 `ADR UI-32oq-2`에서 그대로 승계한다.

- (변경, UI-3713) 결과 줄: 첫 줄 `워커가 이어감 ·`·`인계 ·`는 handoff, `이 대화에서 마무리 ·`·`인수 ·`는 takeover,
  `나중에 ·`·`보류 ·`는 hold다. 내부 kind 이름은 그대로이고 옛 접두는 지울 날짜 없이 계속 읽는다. 진입 블록은
  dotfiles가 착지한 바이트 사본이고 sha256은 테스트가 고정한다.
- (신설, UI-3713) 마무리 뒤 결과 줄: takeover 결과가 있고 핸드오프 예약이 없는 살아 있는 대화는 계속 새 assistant
  메시지를 읽는다. 새 메시지 첫 줄이 handoff 접두이고 Bead 상태가 `open`이면 그 종류가 처음부터 handoff로 끝났을
  때와 같이 기록하고(`source: 'result_line'` 예약, 실패는 `failureHandoffTarget`, 외부 작업 완료·멈춤은 레코드의
  대상) 창을 닫는다. 그 뒤는 종류별 실행 그대로다. Bead가 `open`이 아니거나 상태를 읽지 못하면 그 메시지는 처리한
  것으로만 표시한다. 마무리 뒤 hold·takeover 줄은 상태를 바꾸지 않는다.
- (신설, UI-3713) 되돌리기 버튼: 서버는 takeover 결과를 가진 살아 있는 대화(세 종류)와 `ended_by='takeover'`인
  닫힌 멈춤 대화에 `handback_allowed` 한 값을 싣는다. Bead 상태가 `open`일 때만 참이고 읽지 못하면 거짓이다.
  `tileResolveFields`는 그 값이 참이면 기존 `[워커로 이어가기]` 자리에 버튼을 그린다. 렌더러는 Bead 상태를 다시
  판정하지 않고, 모니터와 Worker 탭은 같은 판정을 그린다.
- (신설, UI-3713) 값의 갱신: `handback_allowed`는 takeover 기록 시점과 reconcile pass가 이미 하는 Bead 상태 읽기,
  그리고 이슈 변경 신호에서 갱신한다. 이슈 변경 신호의 갱신은 `.beads/last-touched`를 쓰지 않는 읽기(`bd list
  --id`)만 쓴다 — `bd show`는 그 신호를 다시 울린다. 투영은 bd를 읽지 않는다.
- (신설, UI-3713) 클릭: 서버가 Bead 상태를 다시 읽어 `open`일 때만 받고, 아니면 `not_open`으로 거절한다. 받은
  클릭은 멈춤·실패·외부 작업 완료의 살아 있는 창이면 그 레코드에 `button` 핸드오프(실패는
  `failureHandoffTarget` 대상)를 예약하고 창을 닫아 종류별 출구로 간다. 창이 닫힌 멈춤은 `ended_by='takeover'`를
  `pane_gone`처럼 받아 바로 같은 세션 재개로 간다. 창이 닫힌 실패는 바뀌지 않는다(레코드가 지워지면 자기 출구
  짝이 다시 선다).
- (변경, UI-3713) 외부 작업 완료: takeover로 끝났어도 창이 사라질 때 Bead가 `open`이면 결과 없이 끝난 대화처럼 완료 행으로
  되돌린다. 그러면 완료 행의 `[워커로 이어가기]`(fork)가 다시 선다.
- (변경, UI-3713) 사람이 읽는 단어: 대화 알림 셋째는 `🙋 대화에서 마무리`, 배지 꼬리는 `대화에서 마무리 중`이다. 툴팁·
  타임라인·버튼 결과 줄의 대화 결과 `인계`·`인수`는 `Worker로 넘김`·`이 대화에서 마무리` 계열 말로 쓴다. 결과
  줄과 상관없는 같은 글자(저장소 작업 설정, 머지 게이트 보류, 외부 잡 `takeover_unresolved`)는 그대로다.

아래는 `ADR UI-32oq-2`의 Decision 승계분이다. 위 결정과 어긋나는 조항 뒤에 `(변경, UI-3713)` 줄을 달았다.

#### ADR UI-32oq-2에서 승계하는 조항

**설정 창은 어느 ⚙에서 열든 같은 탭 목록이고 처음 대상만 다르다. 레일은 대상 저장소 묶음과 서버 전체 묶음으로
나뉘고, 서버 전역 값(칩 바인딩·활성 모델·대화 세션 설정·Worker 공통 주소·활성 계정 자동 전환)은 서버 전체 탭에서
대상과 무관하게 편집한다. Worker 주소의 저장소 예외 입력은 없고, 저장된 예외는 읽기 전용 줄과 지우기로만
다룬다.** 이 결정이 바꾼 조항은 `(변경, UI-32oq)`로 표시했다. 그 밖의 조항은 네 ADR에서 그대로 승계한다.

- (신설, UI-32oq) 처음 대상: 헤더 ⚙(모니터 밖)는 연결 저장소, 레포 띠 ⚙는 그 저장소, 모니터 헤더 ⚙는 여러
  저장소다. 처음 탭은 `실행`이고 `open('execution')`도 `실행`이다.
- (신설, UI-32oq) 창 위쪽에 `대상: [저장소 하나 | 여러 저장소]`와 저장소 선택을 둔다. 대상을 바꾸면 대상 탭
  패널을 그 대상으로 다시 묶고 저장 전 입력은 창을 닫을 때와 같이 버린다. 서버 전체 탭은 대상이 바뀌어도
  그대로다.
- (신설, UI-32oq) 대상 저장소 묶음: `실행`(워커 블록과 quick fix 블록, 계열별 프리셋 바는 블록마다 따로),
  `계정`(저장소 고정 계정·러너별 한도 대응·크레딧·활성 로그인 상태 줄), `저장소`(동시 실행·직렬 레인·base,
  `main 동기화`, 저장소 작업, 저장만 된 값), `표시`(라벨·칩 표시). 서버 전체 묶음: `활성 계정`(러너별 자동
  전환·default 계정·옮겨 갈 계정·옮기는 시점, ADR UI-32oq), `프리셋·모델`(프리셋 관리·판정 칩 프리셋·활성
  모델), `운영`(Worker 공통 주소·대기·주기·외부 작업·대화 세션).
- (신설, UI-32oq) 여러 저장소 대상에서 `실행`·`계정`은 일괄 편집면이고, `저장소`·`표시`는 "저장소 하나를
  고르세요"를 보인다. main 동기화의 일괄 편집은 없다. `표시`는 대상이 연결 저장소일 때만 편집하고, 아니면
  "연결된 저장소(<이름>)에서만 바꿀 수 있습니다"를 보인다(표시 정책은 연결된 워크스페이스에 묶인다).
- (신설, UI-32oq) 세션 탭은 없다. `workflow_mode` 모드 행은 화면에서 빼고, base 동기화는 `저장소` 탭
  `main 동기화` 묶음의 `main에 직접 한 커밋`(`위에 다시 쌓아 push` / `손대지 않음`)이다. 서버의 세션 기본값
  읽기·쓰기 경로는 그대로다.
- (신설, UI-32oq) 대상 저장소에 편집 칸이 없어진 값(`bdui_url` 예외, `workflow_mode`)이 저장돼 있으면 `저장소`
  탭에 읽기 전용 한 줄과 `지우기`를 보이고, 없으면 그리지 않는다. 연결 점검 API는 두지 않는다.

아래는 합친 네 ADR의 Decision 승계분이다.

##### ADR UI-rd2m에서 승계하는 조항

프리셋 정체성

- 실행 프리셋은 `applies_to` 계열을 갖고 route와 계열이 일치해야 적용된다. 프리셋의 정체성은 id 하나다.
- 이슈에 적용된 프리셋은 읽을 때 계열 키 집합을 대칭 비교해 판정하고, 모델에서 런타임을 유도한다. 카드 비교와 `dispatchPreset`은 합치지 않고 분리하며, 워크스페이스는 계열별 적용 기록을 둔다.
- `snapshotBead`가 `applied_exec_preset`을 싣고, `dispatchPreset`은 그 id가 현재 스냅샷에 있고 계열이 이슈와 같으면 이슈의 프리셋으로 attempt를 기록한다. 아니면 워크스페이스의 계열별 기록을 쓴다.
- `applied_exec_preset`의 작성자는 편집기의 `apply-impl-preset`과 칩의 `chip-preset-toggle` 둘이다.

판정 칩

- 칩마다 general 바인딩과 quick_fix 바인딩을 하나씩 갖는다. `exec-presets.json` 최상위 `chip_bindings { complex, frontend, backend }`는 `applies_to=general` 프리셋 id 또는 `null`, `quick_fix_chip_bindings`는 같은 모양으로 `applies_to=quick_fix` 프리셋 id 또는 `null`을 가리킨다. 두 맵은 프리셋 목록과 같은 revision CAS 아래 `impl-preset-bind { …, applies_to? }`로 바꾸고(없으면 general), 계열이 다른 프리셋은 `preset_route_mismatch`로 거부한다. 프리셋 삭제는 같은 mutation에서 두 맵 모두의 그 id를 비운다.
- 판정 칩 `복잡`·`frontend`·`backend` 클릭은 서버 op `chip-preset-toggle { id, chip, expected_revision, root_dir? }`가 지정 워크스페이스에서 이슈를 읽어 판정한다. 이슈 계열은 `route === 'quick_fix'`이면 quick_fix, 그 밖(route 없음 포함)은 general이고 그 계열 맵의 바인딩을 쓴다. 바인딩이 없으면 `chip_unbound`로 아무것도 쓰지 않는다. `chip_preset_source === chip`이고 `applied_exec_preset === 그 계열 바인딩 id`면 복원, 그 밖은 적용이다.
- 적용은 `apply-impl-preset`과 같은 argv 규칙(이슈 계열 키 집합 교체 + `applied_exec_preset`)에 `chip_preset_source=<chip>`을 더하고, `chip_preset_restore`가 없을 때만 클릭 직전 핀과 `applied_exec_preset`을 JSON으로 보관한다. 마지막 클릭이 이기되 복원 대상은 언제나 첫 클릭 전이다. 적용 뒤 이슈 route가 바뀌어도 이슈를 훑지 않는다.
- 복원은 한 argv로 보관된 핀을 되돌리고 나머지 핀·`applied_exec_preset`·두 칩 키를 지운다. 보관이 없거나 깨졌으면 전부 해제하고 `restore_fallback`을 답한다.
- 한 전이(이슈 읽기 → 계열 바인딩 판정 → 쓰기 → 재조회)는 (워크스페이스, 이슈)별 promise 체인으로 요청 순서대로 직렬화한다.
- 편집기의 `apply-impl-preset`은 두 칩 키를 같은 argv에서 unset한다. 개별 키 편집은 두 키를 건드리지 않고 결과는 칩의 `diverged` 상태로 드러난다. 전역 적용·프리셋 삭제·바인딩 해제는 이슈를 훑지 않는다.

바인딩 편집 위치

- (변경, UI-32oq) 칩 바인딩 편집은 설정 창 서버 전체 묶음의 `프리셋·모델` 탭에 있고, 어느 ⚙로 열었든 대상(저장소 하나·여러 저장소)과 무관하다. 대상 저장소 탭에는 서버 전역 값을 섞지 않는다.

##### ADR UI-gpac-2에서 승계하는 조항

**모델 활성은 카탈로그에서 지우는 것이 아니라 서버 전역 "꺼 둔 모델" 목록으로 선택지
표시에서만 뺀다. 카탈로그·저장 값·디스패치 검증·단가는 그대로 둔다. Codex 고정 이름은
처음 나타날 때 꺼 둔 목록에 더해 기본으로 숨긴다(변경, UI-gpac-2).**

- **저장.** `$XDG_STATE_HOME/bdui/model-visibility.json`
  (`state-paths.js modelVisibilityFilePath()`)에 `{ revision, disabled_models, seen_models }`를
  둔다. 워크스페이스와 무관한 서버 전역이며, 러너를 넘어 이름이 유일하므로 러너별로
  나누지 않는다. 새로 추가되는 모델은 자동으로 보인다. 읽기는 fail-quiet(파일 부재·손상은
  기본값, 카탈로그에 없는 이름은 투영에서 무시)이고 쓰기는 revision CAS와
  `unknown_model`·`runner_all_disabled` 검증으로 엄격하다(ADR UI-u6ud-11). 쓰기는 카탈로그에
  잠시 없는 기존 꺼 둔 이름을 그대로 남긴다.
- **새 Codex 고정 이름(변경, UI-gpac-2).** Codex 목록이 갱신될 때 `seen_models`에 없는
  고정 이름(`<계열>-<버전>`)을 꺼 둔 목록에 더하고 본 이름으로 기록한다. 이미 본 이름은
  다시 더하지 않으므로 사용자가 켠 이름은 켜진 채 남는다. 상태 파일이 없으면 초기값은
  기존 기본값에 그때 목록의 모든 고정 이름을 더한 것이다. `seen_models`가 없는 기존 상태
  파일은 이 변경 전 카탈로그 이름(내장 seed 이름과 `config.toml` 덮어쓰기 이름)을 본
  이름으로 채워 이전한다.
- **적용 자리.** 필터(`app/utils/model-visibility.js visibleModelChoices`·
  `visibleReviewerChoices`)는 화면이 선택지를 만드는 자리에서만 건다 — 설정 창·모니터 일괄
  창의 모델 묶음과 리뷰 행, 이슈 상세 실행 설정, 공급자 재개 대화상자. 호환 판정
  (`narrowImplTarget`)과 해석기(`resolveExecutionSettings`·`deriveModelRuntime`)는 꺼 둔
  모델을 계속 알아본다. 서버 검증·디스패치·카탈로그·단가는 바꾸지 않는다.
- **저장된 값의 보존.** 저장된 값이 꺼 둔 모델이면 지우지 않고 선택된 채 `(비활성)`
  레이블로 남긴다. `(비호환)`과 겹치면 호환성이 더 강한 신호라 `(비호환)`을 둔다.
- **러너마다 하나 이상.** 어떤 러너의 모델을 전부 끄는 쓰기는 거부한다.
- **채널.** 서버 전역 구독 `subscribe-model-visibility`/`model-visibility-snapshot`/
  `model-visibility-set` 하나로 그린다. 모니터 스냅샷의 `runner_catalog`에 플래그를 싣지
  않는다 — 체크 하나에 1MB급 전체 스냅샷을 다시 밀지 않기 위해서다. Codex 목록이 바뀌면
  이 채널로 한 번 다시 민다.
- **편집 위치.** (변경, UI-32oq) 설정 창 서버 전체 묶음의 `프리셋·모델` 탭에 판정 칩 프리셋과
  함께 둔다. 어느 ⚙로 열었든 같은 탭이고 대상과 무관하다.
- **사용자 설정 파일.** 서버는 사용자 `config.toml`을 쓰지 않는다.

기각한 대안(UI-ooc0 승계): 카탈로그 삭제(과거 단가·저장 설정 검증·가격 전용 설정 절
파손), `config.toml` 모델별 `enabled` 플래그(서버가 사용자 소유 설정 파일을 써야 함),
`runner_catalog` 투영에 `disabled` 표시(스냅샷 전체 재푸시). 새 조항의 기각 대안: 고정
이름 모두 표시(선택지가 길어짐), 별칭만 표시(고정 이름을 고를 수 없음).

##### ADR UI-57us에서 승계하는 조항

**유효한 `session-preferred`(라벨과 enum 사유) 이슈는 metadata `exec_lane=worker`가 아니면 Worker 대기열에서 세션 레인으로 실행된다. `세션 권장` 칩은 `exec_lane=worker` 쓰기와 해제를 오가고(기본 `세션 실행`, 누르면 `Worker 실행`), 응답은 다시 읽은 판정 실행 방식이다. `worker-ineligible`은 항상 세션 레인이다.** 이 결정이 바꾼 조항은 `(변경, UI-57us)`로 표시했다. 그 밖의 조항은 `ADR UI-5cmo`에서 그대로 승계한다.

- (신설, UI-57us) 칩 문구는 세션 상태 `세션 실행`(`aria-pressed=true`), Worker 상태 `Worker 실행`이다. 툴팁은 사유 한 줄과 `누르면 세션 레인 ↔ Worker 전환`이다. 판정이 실리지 않은 행의 칩도 기본(세션)을 따른다.

아래는 `ADR UI-5cmo`의 Decision 승계분이다.

###### ADR UI-5cmo에서 승계하는 조항

**모니터 탭 전체 배치안은 대기 열의 레포 묶음마다 그 저장소 계획의 점선 미리보기·옮김 카드를 레인 안 실제 자리에 끼우고, 그 저장소의 표 블록을 묶음 맨 아래에 세운다. 적용은 `적용 대상`으로 고른 저장소에만 저장소 단위로 보낸다. 카드별 `[추천 배치]`는 Worker 탭에만 둔다.** 이 결정이 바꾼 조항은 `(변경, UI-5cmo)`, 새 조항은 `(신설, UI-5cmo)`로 표시했다. 그 밖의 조항은 `ADR UI-ksi6`에서 그대로 승계한다.

- (신설, UI-5cmo) 전체 배치안이 열린 동안 모니터 대기 열의 각 레포 묶음 레인(`병렬`·`직렬 N`) 안에 그 저장소 계획(체크된 후보)의 미리보기·옮김 카드를 `plan.layout` 최종 순서로 끼운다. 끼우는 함수는 Worker 탭과 같은 공유 함수(`interleavePreview`)이고, 같은 저장소 상태면 두 탭의 레인 카드 순서가 같다(`card-parity.test.js`). 새 레인 자리는 카드를 그리지 않는다(아래 UI-lsr4 조항 그대로). 적용 결과 줄이 남은 저장소의 레인에는 카드를 그리지 않는다.
- (신설, UI-5cmo) 표 블록 머리의 `적용 대상` 체크는 처음 켜져 있고, 패널을 닫을 때까지 저장소별로 기억한다. 끈 저장소의 표와 미리보기 카드는 흐려지고, 요약 줄 건수에서 빠지며, `[선택한 레포 적용]`은 그 저장소에 아무것도 보내지 않는다. 끈 저장소의 `[이 레포만 적용]`은 그 저장소를 고른 명시 조작이라 그대로 보낸다. Worker 탭은 한 저장소라 이 체크가 없다(monitor-worker parity §9).

아래는 `ADR UI-ksi6`의 Decision 승계분이다.

####### ADR UI-ksi6에서 승계하는 조항

**`[deploy]` 스크립트가 종료 코드 75로 끝나면 그 기록은 수정 Bead 없는 조건 대기(`condition_wait`)다. Worker는 계약이 정한 간격·기한 안에서 실패 tip을 잇는 `retry_of` 후계를 사람 재시도와 같은 사슬로 자동 실행하고, 성공하면 남은 정리를 끝낸다. 같은 사슬의 반복 75는 기록·알림을 다시 남기지 않는다.** 이 결정이 바꾼 조항은 `(변경, UI-ksi6)`, 새 조항은 `(신설, UI-ksi6)`로 표시했다. 그 밖의 조항은 `ADR UI-ymcx`에서 그대로 승계한다.

- (신설, UI-ksi6) 75는 `[deploy]`에만 적용한다. 그 기록의 실패 코드는 `condition_wait`이고, 요약은 스크립트 출력의 마지막 비어 있지 않은 줄(거부 사유)이다. `[verify]`·잡의 75와, 조건 대기를 정의하지 않은 낮은 스키마 핀 아래의 75는 지금처럼 `script_failed`다.
- (신설, UI-ksi6) `condition_wait`는 코드 결함 증명이 아니다. 복구 분류는 계약의 대기(`disposition: wait`, `reason: condition`)이고 수정 Bead 인계는 일어나지 않는다. 75가 아닌 실패의 분류·인계는 그대로다.
- (신설, UI-ksi6) 자동 재확인 권한은 tip이 실패이고 실패 코드가 `condition_wait`이며, 지금이 tip의 종료 시각 + 간격 이후이고 사슬 머리(`retry_of`를 거슬러 처음 만나는 `condition_wait`)의 종료 시각 + 기한 이전일 때만 생긴다. 간격·기한은 계약 키 `condition_wait_deploy_recheck`가 소유한다(현재 기본 30분·24시간). 판정은 저장소 작업 잠금 안에서 내구 기록만으로 하므로 재시작·겹친 tick·사람 클릭이 같은 tip에 와도 후계는 하나다. 새 상태 기계나 Bead metadata 사본은 없다.
- (신설, UI-ksi6) 진입은 사람 재시도와 같은 정산 진입이다: quick_fix 착지의 `repo_operations` 커서 정산, PR 정리(완료 의도가 모는 행 포함)의 정리 재실행. 자동 재확인의 배포 대상은 대기 tip의 대상 SHA라 base가 움직여도 같은 사슬을 잇는다. 검사는 기존 scheduler 주기에 얹고 새 타이머는 없다. Bead 없는 수동 `[배포 실행]` 행은 분류·표시만 바뀌고 자동 재확인은 없다.
- (신설, UI-ksi6) 후계가 다시 75면 새 tip이 되어 다음 시각을 기다리고, 다른 실패면 일반 분류를 탄다. 기한이 지나면 자동 재확인을 멈추고 행은 사람 판단(`action_required`)이 된다. 사람 `[정리 재시도]`는 기한 안팎과 무관하게 즉시 후계를 만든다. `descendant_success_covers_ancestor_rows`는 그대로다.
- (신설, UI-ksi6) 기한 전의 사슬은 종단 실패가 아니다. 사슬의 첫 75에 대기 알림과 대기 댓글을 한 번 남기고(사슬 머리 기록의 내구 표시), 실패 기록 댓글·실패 알림·실패 대화 자동 기동은 기한이 지날 때 사슬당 한 번이다.

아래는 `ADR UI-ymcx`의 Decision 승계분이다.

######## ADR UI-ymcx에서 승계하는 조항

**Worker 배포는 머지된 대상 커밋의 `repo-ops/config.toml` `[deploy]` 선언과 그 커밋의 스크립트로 실행한다. 분류는 `normal` 하나이고, 대상이 선언하면 이전 base와 상관없이 승인 없이 돌며, 대상에 선언이 없으면 할 일이 없다. 검증(`kind: 'verify'`)은 이전 base 정책과 실체화를 그대로 쓴다. `[배포 실행]`은 복구 진입점으로만 남는다.** 이 결정이 바꾼 조항은 `(변경, UI-ymcx)`, 새 조항은 `(신설, UI-ymcx)`로 표시했다. 그 밖의 조항은 `ADR UI-blx2`에서 그대로 승계한다.

- (신설, UI-ymcx) 새 배포 기록의 정책 SHA(`effective_base_sha` 자리)는 대상 SHA이고, 대상은 사전기록부터 기록에 핀된다. 기록을 다시 읽는 곳(재시도·재실행 `launchQueued`, 재시작 뒤 정확 조회 `findExactDeployOperation`, 부팅 재개)은 그 기록의 선언을 다시 찾는다. 그래서 스크립트나 제한 시간을 바꾼 머지도 재시작 뒤 같은 선언을 찾고, 다른 작업 뒤에서 기다린 기록은 원격이 움직여도 자기 대상에서 돈다.
- (신설, UI-ymcx) 첫 배포 승인 경로는 없다. `bootstrap_not_approved` 판정, spool 승인 요청 소비, `repo-ops-bootstrap` CLI, 큐 레코드의 `bootstrap_provenance` 필드와 부착 변이, 그 실패 문장을 지웠다. 저장된 레코드의 `bootstrap_provenance` 키는 읽을 때 무시하고 다시 쓸 때 싣지 않는다. 지난 `bootstrap_not_approved` 실패는 등록되지 않은 코드의 기존 표시(문장 없이 원시 코드)를 따른다.
- (신설, UI-ymcx) 이전 규칙으로 기록된 작업은 기록의 정책 SHA가 이전 base다. 재시작 뒤 진행 중 실행의 정확 조회는 그 SHA로 채택된다. 그 작업을 재시도하면 대상 blob이 기록과 달라 `repo_ops_policy_drift`로 끝나고, 이전 스크립트를 조용히 다시 돌리지 않는다. 이전 규칙으로 실패한 자동 기록은 새 식별자로 찾히지 않으므로 같은 대상·주체면 그 실패를 잇는다: 자동 재진입은 실패를 채택하고, 사람의 정리 재시도는 그 기록의 후계로 남는다.

아래는 `ADR UI-blx2`의 Decision 승계분이다.

######### ADR UI-blx2에서 승계하는 조항

**배치안은 후보와 부딪힘·순서 관계(`conflict`·`c_first`·`x_first`, `blocks` 제외)가 있는 대기 상대를 후보와 같은 직렬 레인으로 옮기고, 직렬 레인 없이 실행·PR 대기 중인 상대는 비어 있는 그 레인의 점유로 하나만 묶는다. 한 묶음의 묶기·옮기기·후보 넣기는 `worker-queue-place-bundle`(HTTP `POST /api/worker/queue/place-bundle`) 한 CAS로 확정하고, `uncovered`는 옮기거나 묶을 수 없는 상대에만 이유와 함께 단다. 선행 병렬 예외 등 나머지 조항은 UI-ey6v 그대로다.** 이 결정이 바꾼 조항은 `(변경, UI-blx2)`, 새 조항은 `(신설, UI-blx2)`로 표시했다. 그 밖의 `(변경, …)`·`(신설, …)` 표시는 그 조항이 생긴 이력이다.

- (신설, UI-blx2) 각 후보의 대기·점유 상대는 넷으로 나뉜다. 점유 판정이 대기 배열보다 먼저다. 옮김: 대기 중이고 점유가 아니다. 묶음: 점유이고 직렬 레인이 없다(실행 중·일시정지·최신 실패·보관 안 된 PR 대기). 고정: 직렬 레인을 점유한다. 제외: 다른 대기·점유 항목의 직접 `blocks` 선행이거나, 묶을 레인에서 기다리는 항목을 `blocks` 선행으로 기다리거나, 묶을 레인에 이미 다른 점유자가 있다 — 한 레인에 점유자가 둘이면 서로의 이어 실행을 막으므로 묶음은 레인당 하나, 빈 레인에만 한다. `blocks`뿐인 상대는 간선이 순서를 지키므로 분류하지 않는다.
- (신설, UI-blx2) 옮김·묶음 상대는 후보의 묶음 구성원이 되고, 한 상대를 두 후보가 끌면 두 묶음은 하나가 된다. 레인은 고정 상대가 선 레인 중 K를 가장 많이 담은 레인, 없으면 K 대기 항목을 가장 많이 담은 직렬 레인, 그 밖이면 지금의 가장 빈 직렬 레인이다. 구성원 하나·K 없음의 첫 배치는 병렬 그대로다.
- (신설, UI-blx2) `place-bundle`은 받은 레인만 쓰고 판단하지 않는다(`queue-place.js`의 무판단 조항 승계). 새로 넣는 Bead만 admission을 돌고, 하나라도 거절되거나 조건이 어긋나면 아무것도 쓰지 않는다. 묶은 lineage는 구현 attempt와 `pr_wait` 항목에 레인을 기록하고, 대기 항목이 없는 Bead의 새 attempt는 그 lineage가 잡은 직렬 레인을 물려받는다.
- (변경, UI-5cmo) `uncovered`는 레인 밖에 남는 고정·제외 상대에만 이유(`occupied_other_lane`·`predecessor`·`waits_in_lane`·`lane_occupied` 등)와 함께 달고, 상대를 옮기라는 안내는 없다. `[적용]`·`[전체 적용]`·모니터 레포 표 블록 적용(`[이 레포만 적용]`·`[선택한 레포 적용]`)은 같은 묶음 계획을 묶음마다 직전 응답 스냅샷으로 다시 계산해 보인 것과 같을 때만 보내고, 다르거나 거절·오류·구서버(`unknown_type`)면 멈춘다.
- dotfiles 세션 배치 절차(`execution-worker-lane.md` Worker lane placement)도 같은 규칙으로 `place-bundle`을 쓴다(ADR UI-u6ud-2: 그 절차의 정본은 dotfiles다).

아래는 UI-ey6v의 Decision 승계분이다.

**이미 대기열에 있거나 레인을 점유한 항목의 직접 blocks 선행인 후보는 쌍 관계·부딪힘과 무관하게 혼자 병렬 레인 끝에 둔다. 순서는 blocks 간선이 지키고, 같은 줄에 두면 상대의 점유에 막혀 교착될 수 있기 때문이다. 쌍 관계 판정과 모니터 전체 배치안 등 나머지 조항은 UI-hf8v 그대로다.** 이 결정이 새로 둔 조항은 `(신설, UI-ey6v)`로 표시했다. 그 밖의 `(변경, …)`·`(신설, …)` 표시는 그 조항이 생긴 이력이다.

아래는 UI-hf8v의 Decision 승계분이다.

**모니터 탭은 대기 레인 머리의 `[전체 배치안 · N개 레포]`로 보이는 저장소마다 Worker 탭과 같은 배치안 표를 저장소 카드로 보이고, 적용은 저장소 단위로 그 저장소 revision에 따로 보내 한 저장소의 멈춤이 다른 저장소를 멈추지 않는다. 모니터 구독이 있으면 보이는 저장소도 jev 쌍 판정 일정에 넣는다. 카드별 `[추천 배치]`·점선 미리보기는 Worker 탭에만 두고 이슈 상세에는 달지 않는다.** 그 밖의 조항은 `ADR UI-lsr4`에서 그대로 승계한다. 이 결정이 바꾼 조항은 `(변경, UI-hf8v)`, 새 조항은 `(신설, UI-hf8v)`로 표시했다. 그 밖의 `(변경, …)`·`(신설, …)` 표시는 그 조항이 생긴 이력이다.

아래는 UI-lsr4의 Decision 승계분이다.

**두 이슈가 같은 파일을 선언한 쌍은 고정 부딪힘이고, 폴더만 겹치는 쌍은 jev가 높은 확신으로 독립이라 할 때만 병렬이다. jev의 `conflict`는 같은 파일·공유 상태·계약 조항·배포 대상을 함께 고치는 쌍에 낸다. 기존 직렬 레인이 모두 차 있으면 새 직렬 레인을 추천하고, 적용 때 레인 수를 먼저 늘린다.** 그 밖의 조항은 `ADR UI-mcth`에서 그대로 승계한다. 이 결정이 바꾼 조항은 `(변경, UI-lsr4)`, 새 조항은 `(신설, UI-lsr4)`로 표시했다. 그 밖의 `(변경, …)`·`(신설, …)` 표시는 그 조항이 생긴 이력이다.

아래는 UI-mcth의 Decision 승계분이다.

**세션 레인은 사람 답이 필요한 종단 결과 줄(파킹·실패·환경·recovery 대기)에서 attempt를 정산하지 않는다. 창·claim·슬롯을 유지한 채 답 대기로 두고, 성공과 Worker 자동 대기(blocks·external·base_moved)만 headless와 같은 판정으로 정산해 창을 닫는다. 보류 중 창이 사라지면 그 보류 줄로 정산한다.** 그 밖의 조항은 UI-i7k9에서 그대로 승계한다. UI-mcth가 바꾼 조항은 `(변경, UI-mcth)`로 표시했다.

아래는 UI-i7k9의 Decision 승계분이다.

**배치 추천의 고정 조건은 직접 blocks 하나이고, 선언 scope 겹침은 jev 질문의 재료로만 싣는다. jev의 `conflict`는 해소 세션으로도 풀기 어려운 겹침에만 낸다.** 그 밖의 조항은 두 원본에서 그대로 승계한다. 바뀐 조항은 `(변경, UI-i7k9)`, 새 조항은 `(신설, UI-i7k9)`로 표시했다.

######### ADR UI-izba에서 승계하는 조항

대기열 배치 추천

- (변경, UI-lsr4) 서버(`server/placement/`)는 후보와 다른 항목(다른 배치 가능 후보, 병렬·직렬 대기 항목, 레인을 점유한 구현 lineage)의 쌍 관계를 만든다. 고정 조건은 둘이고 둘 다 jev에 묻지 않는다: 직접 blocks 의존은 그 쌍을 순서로 정하고(먼저 본다), 두 이슈의 선언 scope가 같은 파일 항목을 담으면 그 쌍은 부딪힘(`basis: 'file'`)이다. 같은 spec·plan 출처도 예외가 아니다. 항목이 파일인지 폴더인지는 서버가 저장소 루트 기준으로 정한다 — `/`로 끝나거나 루트 아래 실제 폴더면 폴더이고, 파일·아직 없는 경로·stat 실패는 파일이다. 관계 계산은 I/O 없는 순수 함수이고 호출부가 폴더 판정을 넘긴다. 폴더 겹침(폴더와 그 안의 파일, 같은 폴더)은 고정 관계를 만들지 않는다: 겹치는 접두는 쌍 질문 맨 앞 줄로, 각 이슈의 선언 scope는 재료 본문 앞 필드로 실어 jev 판단 재료로 쓰고, 선언 scope는 재료 digest에 든다. 나머지 쌍은 모두 jev가 판정하고, 겹침은 jev 관계에 실려 근거 줄에 보인다. 선언 scope가 겹치는 쌍은 jev가 겹침 독립 기준 이상의 확신으로 `independent`라 할 때만 독립이고, 그 밖의 채택되지 않은 답은 `overlap_guard` 부딪힘이다. 겹치지 않는 쌍의 미채택 답은 `unknown`이고 제약이 아니다. 두 확신도 기준(채택, 겹침 독립)의 소유자는 `server/placement/wire.js` 상수다.
  - (변경, UI-unf5) 같은 파일 고정 쌍(`basis: 'file'`)도 jev에 묻되 선호 질문 답만 쓴다. 그 쌍의 `placement_pair` 답은 쓰지 않고 고정 관계가 제약을 정하며, 그 판정은 후보 상태·진행 수에 들지 않는다. 직접 blocks 쌍은 지금처럼 묻지 않는다.
- (변경, UI-lsr4) jev 질문은 각 이슈를 다른 Worker가 따로 구현·머지한다는 전제를 말한다. `independent`는 동시에 구현·머지해도 서로의 전제를 바꾸지 않고 같은 파일·공유 상태·계약 조항·배포 대상을 함께 고치지 않는 쌍이고, `conflict`는 서로의 결과를 전제하지는 않지만 그것들을 함께 고치는 쌍이다. 겹침 줄은 두 이슈가 닿을 수 있는 곳의 재료이고, 폴더만 겹친다고 같은 파일을 고친다는 뜻은 아니라고 질문이 말한다. 질문 문구의 소유자는 `server/placement/question.js`다.
- jev 질문 정의(`placement_pair`)는 beads-ui 서버 상수다(ADR dotfiles/dotfiles-hkski). 모델·엔드포인트·시간 제한은 workflow 판정과 같은 값을 코드 registry로 두고 cross-runtime 테스트가 dotfiles 값과 대조한다(ADR UI-u6ud-2). 키는 `TYPESAFE_API_KEY`, 없으면 설치 dotfiles checkout의 `secrets-get typesafe/api-key`이고 프로세스 메모리에만 둔다 — 브라우저 wire와 호출 기록에 키·본문을 싣지 않는다.
  - (변경, UI-unf5) jev 요청은 질문 두 개(`placement_pair`, `placement_prefer`)를 싣고, 응답은 두 답이 모두 맞아야 통과한다. 쌍 캐시 항목과 호출 기록은 선호 답의 choice·확신도를 함께 담는다.
- 쌍 판정은 두 이슈 재료 digest·질문 버전·모델을 키로 서버 상태 디렉터리에 캐시한다. 큐 변화는 jev를 부르지 않는다. 재료가 바뀐 쌍만 다시 묻고 호출 자동 일정·채택 확신도·실패 재시도 간격·동시 호출 수는 `server/placement/question.js`·`wire.js` 상수가 정한다.
- worker-queue wire는 `placement_relations`(쌍 관계·출처·확신도)와 `placement_status`(후보 상태)를 싣는다. 자리 계산은 화면의 순수 함수(`app/utils/placement/`)가 현재 큐 스냅샷·후보 정렬·고른 집합으로 하고, 레인 blocks 정렬 함수 `orderLaneByBlocks`는 서버 store와 화면이 같은 모듈을 쓴다. `queue-place.js`는 레인 판단을 하지 않는다.
  - (변경, UI-unf5) 자리 계산 입력은 후보 우선순위를 더 받는다. 두 탭은 후보 행에서 표시 순서와 우선순위를 만드는 공유 함수 하나(`placementOrderOf`)를 쓴다. 관계에는 채택된 선호의 `prefer`·`prefer_confidence`가 붙는다.
- (변경, UI-5cmo) 카드별 추천은 Worker 탭 후보 카드 슬롯 6의 별도 `[추천 배치]`를 누를 때만 점선 미리보기로 보인다. `[↴ 대기로]` 수동 레인 메뉴는 그대로이고, jev를 못 쓰는 어떤 경우에도 수동 배치를 막지 않는다. 모니터 탭은 카드별 `[추천 배치]`를 그리지 않고, 이슈 상세에는 추천을 달지 않는다. 모니터 탭의 레인 점선 미리보기는 전체 배치안이 열린 동안 위 UI-5cmo 조항대로만 그린다(monitor-worker parity §9).
- (변경, UI-5cmo) 모니터 탭 대기 레인 머리는 `[전체 배치안 · N개 레포]`·`판정 중 · N개 레포`·`[↻ 전부 다시 판정]`을 갖고, 배치 재료를 싣는 저장소가 없으면 아무것도 그리지 않는다. 전체 배치안은 배치 재료에 후보 항목이 있는 보이는 저장소마다 그 저장소 대기 묶음 맨 아래(마지막 레인 뒤)에 표 블록 하나를 세운다. 대기 본문 맨 위의 패널 틀은 없고, 대기 본문 맨 아래에 요약 줄(`[선택한 레포 적용]`·닫기)이 붙는다. 표의 행 재료와 그리기는 Worker 탭 전체 배치안과 같은 공유 함수(`app/views/worker/placement.js`)가 만들고, 번호는 저장소마다 1부터 센다. 저장소를 섞은 단일 배치는 만들지 않는다. `[이 레포만 적용]`·`[선택한 레포 적용]`은 누른 순간의 대상 저장소·체크·보여 준 자리를 고정하고(`[선택한 레포 적용]`의 대상은 `적용 대상`이 켜진 저장소뿐이다), 저장소마다 그 차례의 최신 큐에서 그 저장소 `root_dir`·revision으로 `sendPlacementBatch`를 부른다. 그래서 그 사이 자리가 바뀐 저장소는 넣지 않고 멈추며, 한 저장소의 멈춤·실패는 다음 저장소를 멈추지 않는다. `[↻ 전부 다시 판정]`은 재료 있는 보이는 저장소마다 `worker-placement-rejudge`를 하나씩 보내고, jev 호출 속도는 서버 전역 상수가 정한다.
- (신설, UI-hf8v) 저장소의 배치 투영은 그 저장소에 Worker 탭 구독자가 있거나, 모니터 파이프라인 구독자가 있고 그 저장소가 모니터에 보일 때 jev 일정을 잡는다(observe). 숨긴 저장소는 모니터 때문에 observe하지 않는다. `worker-handlers.js`는 모니터 모듈을 import하지 않고, 모니터 쪽이 가시성 판정을 등록한다. 와이어는 바꾸지 않는다.
- 레인에는 사람의 `[적용]`·`[전체 적용]`만 쓴다. 미리보기를 계산한 스냅샷 revision으로 CAS 전송하고, 충돌이면 최종 자리가 같을 때만 한 번 다시 보낸다. 추천은 레인 배치만 쓰고 blocks 의존을 쓰지 않는다.
- (신설, UI-lsr4) 자리 계산이 여러 개짜리 묶음에 가장 빈 직렬 레인을 고를 때는 설정된 레인이 아니라 `s1`~`s5` 전체에서 짐(대기 항목 수와 점유자 수의 합)이 가장 적은 레인을 고르고, 같으면 낮은 번호가 먼저다. 그래서 빈 기존 레인이 먼저이고, 기존 레인이 모두 차 있으면 점유 없는 새 레인이다. 서버 `lane_states`는 설정 수 밖 레인의 점유를 `hidden` 항목으로 싣고, 자리 계산은 그것을 새 레인 선택에만 쓴다 — `[↴ 대기로]` 메뉴와 레인 그리기(Worker 탭·모니터 탭)는 설정된 레인만 본다. 계획은 필요한 레인 수를 함께 낸다. `[적용]`·`[전체 적용]`은 보낼 자리가 설정 수 밖이면 레인 수 변경(`worker-queue-set-serial-lane-count`, CAS)을 먼저 보내고, 거부되면 아무것도 넣지 않으며, 늘린 뒤 다시 계산한 자리가 보여 준 자리와 다르면 넣지 않고 멈춘다. 새 레인에는 점선 카드를 그리지 않고 표가 레인 증설을 알린다. 빈 레인을 자동으로 줄이지는 않는다.
- (신설, UI-lsr4) 추천할 수 있는 후보 상태는 `ready`와 `fixed_only`다. 고정 관계만 있는 후보도 jev 호출 없이 추천·적용된다.
- (신설, UI-ey6v) 후보가 이미 대기열에 있거나 레인을 점유한 항목의 직접 blocks 선행이면(그 항목에 대해 `basis: 'blocks'`의 `c_first`), 자리 계산은 그 후보를 묶음에서 빼 혼자 병렬 레인 끝에 두고, 남은 후보는 그 후보 없이 묶음과 레인을 계산한다. 같은 파일 부딪힘·`overlap_guard`·jev `conflict`가 있어도 예외가 아니다 — 쌍 관계 판정은 그대로이고 이 후보의 레인 선택만 바뀐다. 선행 후보 묶음은 적용 순서의 맨 뒤에 둔다. `blocks` 줄에는 어떤 후보에도 `uncovered` 경고를 내지 않고(간선이 순서를 지킨다), 선행 후보에 남은 다른 제약에는 상대를 옮기라고 안내하지 않는 전용 경고 `predecessor_parallel`(`⚠ 선행이라 병렬에 둠 — <상대>와 동시에 돌 수 있음`)을 낸다. 아직 대기열에 없는 상대(함께 고른 후보, 고르지 않은 후보)와의 blocks는 이 규칙 밖이라 full_plan 묶음의 줄 순서 배치가 그대로다. 수동 `[↴ 대기로]`, `orderLaneByBlocks`의 줄 안 순서 보정, `queue-place.js`는 바꾸지 않는다. dotfiles 세션 배치 절차(`execution-worker-lane.md` Worker lane placement)도 같은 규칙을 따른다(ADR UI-u6ud-2: 그 절차의 정본은 dotfiles다).

배포 실행과 프런트엔드 빌드 (UI-u6ud-5 승계)

- Worker는 저장소 지식이 없는 실행기만 소유한다: 큐 안의 durable `repo_operations` journal, 락 아래 직렬화되는 bind → prerecord → align → spawn 경로, 전용 detached 워크트리 `.worktrees/.repo-ops-deploy`, detached 일회성 자식 프로세스의 exit·timeout 관측.
- (변경, UI-ymcx) 저장소별 apply와 readback은 머지된 대상 커밋의 `repo-ops/config.toml` `[deploy]` 스크립트가 전부 소유한다. 이 저장소에서는 그 스크립트가 self-flock, HEAD 검증, 빌드, 재시작, health identity readback을 수행한다.
- reconciler, 외부 deployment job, candidate release 디렉터리와 `current` symlink, runtime marker 읽기·쓰기, self-restart helper는 없고 retirement checker가 그 토큰의 재등장을 막는다.
- 스크립트의 restart marker 파일은 진단용 흔적이지 성공 판정의 authority가 아니다. 성공 조건은 health identity readback이다.
- 수동 `[배포 실행]` 버튼이 저장소 작업 화면에 있다.
- (변경, UI-ksi6) 배포 해소 사다리는 `script_retry` 한 단계이고 토글 없이 상시다. 단 `[deploy]` 종료 코드 75로 끝난 `condition_wait` 기록에는 `script_retry`를 걸지 않고 건너뛴 근거만 남기며, 그 tip은 위 UI-ksi6 조항의 계약 한도 안 자동 후계로만 다시 돈다.
- `app/main.bundle.js`·`app/main.bundle.js.map`은 tracked가 아니다(`.gitignore`). `package.json#files`의 두 항목은 유지해 `prepack`이 만든 파일이 패키지에 들어간다.
- 빌드 소유자는 배포(`repo-ops/script/deploy`), 머지 직전 `repo-ops/script/verify`(`npm run tsc` 뒤·`npm test` 앞에 `npm run build`), 패키징(`prepack`) 셋이다.
- 정적 모드 서버(`server/app.js`)는 시작 시 번들이 없으면 `npm run build`와 `BDUI_FRONTEND_MODE=live`를 안내하는 오류로 종료한다. 자동 빌드도 live 모드로의 조용한 fallback도 없고, on-demand 번들은 live 모드에만 있다.
- 어떤 테스트도 커밋된 번들의 존재에 의존하지 않고 정적 모드 응답은 임시 `app_dir`의 번들 fixture로 검증한다.
- 번들 커밋이 남은 PR·워크트리는 base 동기화의 modify/delete 충돌에서 삭제를 채택한다. 별도 마이그레이션 스크립트는 없다.

######### ADR UI-lbm5에서 승계하는 조항

(변경, UI-57us) **`worker-ineligible` 이슈와 `exec_lane=worker`가 아닌 유효한 `session-preferred` 이슈는 Worker 대기열에서 세션 레인으로 실행된다. 같은 admission·공유 슬롯·직렬 레인을 거쳐 Worker attempt로 기록되고(fast_track·worker 출처), headless와 같은 계정·가드 훅 env로 Worker 표지 없이 session-hub 대화형 창으로 열린다. 생존은 `isDeadAttempt`가 마커 pane 관측으로 판정하고(관측 실패는 생존), 결과는 종단 결과 줄로 판정하되 성공과 Worker 자동 대기(blocks·external·base_moved)만 headless와 같은 판정을 타고 창을 닫으며, 사람 답이 필요한 줄(파킹·실패·환경·recovery 대기)은 정산 없이 창·claim·슬롯을 유지한 답 대기로 남고 그 상태에서 창이 사라지면 그 줄로 정산한다(변경, UI-mcth). 결과 줄 없는 창 소멸은 클릭 전용 `session_exited` 실패이고, 재개는 세션 레인 attempt의 `↻ 이어하기`이며, 일시정지는 없다.**

실행 방식과 진입

- (변경, UI-57us) 이슈의 실행 방식은 디스패치 때 스냅샷 하나로 정하고 판정 함수(`execLaneOf`)는 하나다. 서버 투영·카드·스케줄러가 모두 그 함수를 쓴다. `worker-ineligible`이면 `session`, 유효한 `session-preferred`(라벨과 사유)이면 metadata `exec_lane=worker`일 때만 `worker`이고 그 밖(`session`·부재·기타 값)은 `session`, 그 밖의 이슈는 `worker`다. 라벨 없이 남은 `exec_lane`은 무시한다.
- `worker-ineligible`은 admission 거절 사유가 아니다. 나머지 admission(route·본문·스펙·receipt·base)은 Worker와 똑같이 통과해야 한다. 거절은 `validateAdmission`, 비연결 워크스페이스 분기, 스케줄러 세 곳에서 함께 지운다.
- (변경, UI-57us) `exec_lane`은 beads-ui가 쓰는 키다. `session-preferred` 칩 클릭이 그 이슈의 `exec_lane`을 `worker` ↔ 해제로 바꾸고 다시 읽어 판정한 실행 방식(`session`·`worker`)을 돌려주며, (워크스페이스, 이슈)별로 요청 순서대로 직렬화한다. 기본(해제) 상태에는 쓰기가 없어 새 이슈는 손대지 않고 기본을 따른다. 다음 디스패치부터 적용되고 실행 중 attempt에는 영향이 없다.

디스패치

- 스캔·슬롯·직렬 레인 머리·`auto_advance`·공급자 보류 가드·base 재해석·가드 훅·워크트리·claim·`workflow_mode` 스탬프까지는 Worker 디스패치와 같은 경로다. 실행 방식이 `session`이면 headless spawn 대신 세션 레인 마커 창을 연다.
- 창은 프리셋 runner·model·effort와 headless와 같은 계정 적용(claude는 `cswap run <account>` 래퍼, codex는 계정 `CODEX_HOME`)으로 연다. env에는 headless가 더하는 가드 훅 키·work recovery 준비 env·계정 env를 싣고, Worker 표지(`BDUI_ATTEMPT_ID`·`CLAUDE_HOOK_SUPPRESS`·`CODEX_SILENT`)와 print 모드 전용 키는 싣지 않는다. 그래서 attempt 가드 훅과 quick_fix 착지 증명이 headless와 같이 성립한다.
- 디스패치 맥락은 headless preamble 중 시도 사실·fast_track·종점·PR base·fix-now만 싣고, 무인 전제·가드 계약·프로세스 수명 대신 세션 레인 블록을 넣는다. 첫 입력은 headless와 같은 과제 문장이고 Worker 세션 대화 진입 블록 접두로 시작하지 않는다.
- attempt는 기존 모양에 `exec: 'session'`과 창 위치를 더한다. 상태 어휘는 늘리지 않는다. 기동 실패는 `session_launch_failed:<reason>` 실패다.

관찰과 종료

- (변경, UI-gske 생존 소유) 세션 레인 attempt의 생존은 pid가 아니라 마커 pane이다. 죽음은 tmux 관측이 성공한 pass에서 그 pane이 없을 때만이고, 관측 실패나 관측 전은 생존이다. 관측은 목록 조회를 시작하기 전에 판정 대상을 고정하고 그 사이 기동되거나 pane이 바뀐 attempt는 다음 관측에 맡긴다. `reconcile`·`occupiedBeadIds`·재개 자격이 같은 `isDeadAttempt`로 판정한다.
- (변경, UI-mcth) 대화 정산 틱이 세션 레인 마커 pane의 `turn_state`·발췌를 attempt에 갱신한다. 답 대기는 `question`, 또는 마지막 메시지가 결과 줄이 아니거나 보류 갈래 결과 줄(파킹·실패·환경·recovery 대기)인 `idle`이고, beads-ui는 그것을 Discord로 보내지 않는다(UI-5chz 조항). 살아 있는 세션 레인 attempt는 방향 문의·실패 대화 자동 기동의 대상이 아니다.
- (변경, UI-mcth) 종단 결과 줄은 두 갈래다. 판정 함수는 `session-lane.js`의 `sessionLaneHoldsWindow` 하나다. 정산 갈래(`success`·`waiting_blocks`·`waiting_external`·`base_moved`)는 그 verdict를 headless와 같은 `onSessionDone` 분기에 넣는다. 정산 갈래 결과 줄의 처리 기록은 정산이 끝날 때 함께 남겨 재시작이 미완료 정산을 이어가고, 한 메시지는 한 번만 정산한다. 보류 갈래(`parked`·`failure`·`environment`·`recovery_wait`)는 결과 줄이 아닌 메시지처럼 처리 표지와 발췌만 남기고 attempt 상태를 바꾸지 않으며, 기록을 닫지 않으므로 창도 닫지 않는다. 타임라인에는 메시지마다 `세션 레인 결과 · <결과 줄> — 창 유지` 한 줄을 남기고 Discord로는 보내지 않는다. 사람이 답한 뒤의 새 메시지는 처음처럼 다시 판정한다.
- (변경, UI-mcth) 창이 사라질 때는 transcript의 새 결과 줄을 먼저 읽는다. 새 메시지가 없고 마지막으로 처리한 메시지가 보류 갈래 결과 줄이면 그 줄로 `onSessionDone` 정산을 탄다. 기존 정산 우선순위(base 착지 감지 → `base_landing_detected`, 공급자 장애 → 보류)는 그대로다.
- 결과 줄 없이 창이 사라지면 `session_exited` 실패이고 자동 재개·해결 세션은 없다. `↻ 이어하기`가 같은 워크트리·슬롯·프리셋·맥락으로 새 세션 레인 attempt를 연다(세션 ID가 있으면 resume).
- 일시정지는 없다(`pause_unsupported`). `✕ Worker에서 내리기`·폐기는 창에 `/exit`를 보내고 유예 뒤 kill하며, 창 소멸을 관측한 뒤에만 슬롯과 claim을 돌려준다. 서버 재시작은 살아 있는 pane을 다시 채택한다.
- 카드 재료는 Worker 탭과 모니터가 같은 공유 함수에서 만든다. 새 요소의 슬롯은 카드 헤더 문법 스펙 표가 정한다.

대안과 기각 사유(UI-mcth): 성공 외 전부 보류 — blocks·external·base_moved는 Worker가 자동으로 재개하는 대기인데 창과 슬롯을 잡고 있으면 재개가 일어나지 않고, 선행 Bead가 같은 대기열 뒤에 있으면 서로 기다리다 멈춘다. recovery 대기만 보류 — 파킹·실패·환경도 사람 답이 필요하다. 세션 레인 env에서 `BDUI_WORK_RECOVERY_SCHEMA` 빼기 — 계약상 대화형 세션은 이 값 없이도 recovery 줄을 쓸 수 있어 막지 못하고 headless 동등성도 깨진다. 보류 중 창 소멸을 `session_exited`로 — 세션이 밝힌 원인(recovery 사유·실패 문장)이 카드와 실패 분류에서 사라진다.

대안과 기각 사유: 별도 세션 큐 — 순서·직렬 레인·슬롯을 두 벌로 관리하게 된다. 세션 레인 전용 동시 실행 한도 — 사용자가 슬롯 공유를 택했다(2026-10-16). `worker-ineligible`의 headless 허용 — 라벨의 뜻(사람 판단이 필요)을 지운다. 허브 기본 로그인과 훅 없는 창 — 계정 보류(UI-3v1h)와 push 가드·quick_fix 착지 증명이 깨진다. 세션 레인 전용으로 완화한 admission — 같은 receipt 기준선과 마감 경로를 타므로 진입 조건이 같아야 한다. pane 기준 일시정지 — 대화형 창은 답하지 않으면 이미 멈춰 있고 프로세스 정지는 사람이 쓰는 창을 얼린다.

아래는 `ADR UI-1eag`의 Decision 승계분이다. 위 결정과 어긋나는 조항은 `(변경, UI-lbm5)`로 표시했다.

########## ADR UI-1eag에서 승계하는 조항

**Worker 직접 push 착지도 영수증에 결속된 착지 head에서 `repo_operations`와 `branch_cleanup` 사이의 같은 머지 후 잡 단계를 지난다. 공유 배포 워크트리 HEAD가 행의 머지 SHA를 엄격히 앞서고 base에 포함되면, 행은 자기 잡 이름을 그 HEAD 트리에서 해석해 같은 blob 또는 그 키를 대체 선언한 수정본을 기존 예약·승계로 HEAD에서 실행하고, 그 밖은 `post_merge_job_target_moved`로 멈춘다.**

직접 push 착지의 잡 단계

- Worker quick_fix 착지 정산은 `base_containment → repo_operations → post_merge_jobs → branch_cleanup → parent_close`다. 잡 단계의 머지 SHA는 영수증에 결속된 착지 head(배포 단계와 같은 SHA)이고 행에 `merge_sha`를 새로 쓰지 않는다.
- 잡 판정·실행은 PR 정리와 같은 공유 러너 하나다. 두 정산은 머지 SHA·권한·결과 콜백만 넘긴다.
- 실패는 PR 행과 같은 사유 토큰으로 `post_merge_jobs` 단계에 기록하고, 진행 중은 배포 단계와 같은 `repo_operation_pending`이다. 정산 재실행은 멱등이다.
- 결과 미상 잡 재실행 권한(`job_retry`)은 사람 조작에서만 온다. 재시도 사다리·공급자 자동 재개·부팅 재개는 권한을 싣지 않는다.
- 커서 `post_merge_jobs`는 `branch_cleanup`·`parent_close`와 같이 durable head에 결속된다. 영수증 head가 다르면 잡 실행 전에 `head_mismatch`로 멈춘다.
- 외부(foreign) 착지는 잡을 실행하지 않는다. 세션 소유 quick_fix 착지(Worker 행 없음)는 잡을 돌리지 않고 뒤 행에 맡긴다.

앞선 배포 HEAD에서의 잡 해석

- 원장 판정이 해석보다 먼저다. 해석은 실행이 필요할 때만 하고, H가 없거나 머지 SHA와 같거나 그 조상이면 지금처럼 머지 SHA로 정렬해 실행한다.
- H가 머지 SHA의 엄격한 후손이고 새로 받은 target base에 포함되면, 머지 SHA 트리의 각 잡 이름을 H 트리에서 해석한다. 같은 blob이면 그 키를 H에서, 첫 32줄 선언이 정확히 그 키를 대체하는 수정본이면 그 수정본 키를 H에서 기존 예약·승계 경로로 실행한다. 그 밖(H에 없음, 선언 없는 다른 blob, 다른 키 선언, 일반 파일 아님)과 무관한 H, base 밖 H는 `post_merge_job_target_moved:<머지 SHA의 키>`로 멈춘다.
- H는 판정용 관측이고 권위는 잠금 안 실행 직전 정렬이다. prepare 거부는 기록이 없어 다음 판정이 새 H로 다시 해석하고, launch 거부는 `started` 없는 `failed`라 같은 키가 기존 실행 전 실패 규칙으로 다시 기록된다.
- 예약된 수정본이 실패하면 원래 행은 `started` 없는 실패는 자동으로, `started` 있는 실패는 사람 권한이 있을 때만 같은 수정본 키를 새 H에서 다시 실행하고, 수정본 intent와 이전 키의 `repair` 참조를 기존 같은 수정본 재시도 CAS 하나로 함께 교체한다. 새 H의 그 이름이 예약된 수정본 blob이 아니거나 권한이 없으면 `post_merge_job_repair_failed`다.
- 떠안은 잡의 소유는 새 원장 필드 없이 키를 먼저 claim한 행의 operation이다. 첫 claim은 키가 없을 때만 성공한다.
- 지키는 불변식: 공유 배포 워크트리 되감기 없음, 정확한 target, 후손 커버를 실행 증거로 쓰지 않음, 키당 1회, 예약 뒤 옛 blob 미실행, 실패 operation·로그 보존. `merge_sha: null`로 끝난 `done` 행은 다시 열지 않는다(마이그레이션 없음).

대안과 기각 사유: 옛 SHA로 되감기 — 옛 트리 배포가 부수효과로 생긴다. `done` 행 일괄 재정산 — 착지 SHA가 행에 없고 닫힌 Bead에 실패를 둘 곳이 없다. 직접 push 잡 단계만 고치기 — 이미 멈춘 원래 행이 풀리지 않는다(사용자, 2026-10-16). quick_fix 전용 잡 러너 복제 — 원장·예약·승계·재채택 규칙이 두 벌이면 어긋난다.

아래는 `ADR UI-5chz`의 Decision 승계분이다. 이 결정과 어긋나는 조항은 없다.

########## ADR UI-5chz에서 승계하는 조항

**대화 세션(문의·해결·외부 재개)의 답 대기는 beads-ui가 Discord 채널로 보내지 않는다. 같은 멈춤의 재알림은 dotfiles 브리지의 세션 스레드가 맡고, 대화 알림은 `🙋 확인 필요`·`↪ Worker가 이어감`·`🙋 사람 인수` 셋이다. 세션 레인의 답 대기도 같은 원칙이다.**

- reconcile이 결과 줄이 아닌 새 assistant 메시지를 처리해도 Discord 푸시를 보내지 않는다. 처리 식별자 `processed_message_at`, 발췌 `message_excerpt` 기록과 verdict 재판정은 그대로다. `message_excerpt`는 공개 프로토콜 필드로 남아 표시용 발췌가 된다.
- 결과 줄 `인계 ·`·`인수 ·`·`보류 ·`의 처리와 그 알림(`🙋 사람 인수`, 인계 뒤 `↪ Worker가 이어감`)은 그대로다.
  (변경, UI-3713) 결과 줄은 새 접두 `워커가 이어감 ·`·`이 대화에서 마무리 ·`·`나중에 ·`와 옛 접두를 같은 뜻으로 읽고, 대화 알림 셋째는 `🙋 대화에서 마무리`다.
- notifier는 답 대기 푸시 경로를 갖지 않는다.
- verdict 표, 배지 꼬리 `답 대기`, `[세션에서 이어가기]`(Discord 링크가 없을 때), `[워커로 이어가기]`, 해결 문장은 바꾸지 않는다.
- `🙋 확인 필요`는 처음 멈출 때 채널로 한 번 알리는 신호로 남는다. 스레드가 아직 없을 수 있기 때문이다.
- 브리지가 꺼져 있으면 재알림은 dotfiles 훅의 직접 `discord` 전송에 달려 있다. 그 경로의 소유자는 dotfiles다.

대안과 기각 사유: 스레드가 없는 세션에만 채널 푸시 — 브리지가 돌고 있으면 대화 세션마다 스레드가 생겨 거의 쓰이지 않는데, 스레드 목록에 기대는 서버 배선만 는다. 스레드 없는 세션은 카드 배지와 `[세션에서 이어가기]`로 드러난다(사용자, 2026-10-16 이 대안 대신 같은 원칙 적용 선택). 현행 유지 — 사용자가 중복을 결함으로 보고했다.

아래는 `ADR UI-gske`의 Decision 승계분이다. 위 결정과 어긋나는 조항은 `(변경, UI-5chz)`로 표시했다.

########## ADR UI-gske에서 승계하는 조항

**base-sync 보관 해소 세션이 등록한 Bead 없는 사람 필요 행을 받아 「저장소 작업」 서랍과 확인 필요 칩에 올리고, 같은 세션을 `--resume`으로 잇고, 보관 ref가 사라지면 닫는다. 정리 단계 완료 종단·완료 의도 없는 정리 중단·머지 전 검증 실패 보류를 공용 스위치 아래 실패당 한 번 자동으로 열고, 정리 실패도 「🙋 확인 필요 · 정리 중단」으로 알린다.**

세션 소유 사람 필요 행

- 입력은 `POST /api/worker/session-inquiry`(등록)와 `POST /api/worker/session-inquiry/<id>/state`(상태)다. 행은 작업 공간 큐의 컬렉션 `queue.session_inquiries`에 서버가 만든 id로 저장되고, 공개 큐·revision·변경 이벤트를 그대로 탄다. 식별은 (repo, ref)이고 Bead가 없다. `repo`는 외부 대기와 같은 규칙으로 등록 작업 공간에 맞추며, 맞지 않으면 400이다. attachment 없는 작업 공간은 저장만 한다.
- 모든 4xx·5xx 본문은 JSON이다(본문 파싱 오류 포함). CLI가 JSON이 아닌 4xx를 연결 불가로 읽기 때문이다.
- 같은 (repo, ref)의 열린 행은 갱신하고, `session_id`가 바뀌면 `waiting`으로 되돌린다. 닫힌 행은 지우지 않는다.
- beads-ui가 쓰는 상태는 보관 ref 부재 관측의 `closed` 하나다. `waiting`·`held`는 세션의 몫이다.
- 기존 30초 대화 정산 틱이 열린 행마다 ref 부재(`git show-ref` exit 1만 부재), 등록 세션 생존(`ownerLiveness`, `unverified`는 사망이 아니다), 자동 재개를 본다. 생존은 바뀔 때만 쓴다.
- 자동 재개는 `waiting` ∧ 등록 세션 `dead` ∧ 스위치 켜짐 ∧ 그 행의 live 대화 없음 ∧ 그 session id 미소비일 때 한 번이다. 소비한 session id는 지우지 않는 목록에 기동 전에 쌓는다 — 재시작·기동 실패·A→B→A 세션 교체가 두 번째 자동 재개로 이어지지 않는다.
- 재개는 등록 `cwd`의 분리 창에서 `claude --resume <session_id>`이고 fork·새 session id·모델·effort 플래그가 없다. 첫 입력은 계약의 [summary, 재개 한 줄]이고 입장문·Worker 대화 블록은 넣지 않는다. 대화 레코드 행 키는 `session-inquiry:<id>`이고 Bead 상태 정산에서 빠진다(`repo-op:`과 같다).
- `[세션에서 이어가기]`는 같은 재개를 손으로 한다: live 대화 → 앞으로, 등록 세션 살아 있음 → 새로 띄우지 않음, `unverified` → 거부, `dead` → 재개(`held` 포함). 클릭은 소비 목록을 쓰지 않는다. `[워커로 이어가기]`는 없다.
- 생성 시 `🙋 확인 필요 · base-sync 사람 필요`를 스위치와 무관하게 한 번 보낸다(`notified_at`을 먼저 쓴다).
- 열린 행 하나가 확인 필요(`awaiting_user`) 사유 하나를 낸다. `waiting` ∧ `dead` ∧ live 대화 없음일 때만 조치 필요이고, `worker-resolve-in-session` 조작과 해결 문장을 함께 싣는다. 그 밖은 normal이다.
- 행의 집은 「저장소 작업」 서랍이고 미해결로 센다(띠 건수·모니터 `⚠ N`). 확인 필요 칩 항목은 `보관 <ref 끝부분>`으로 보이고 누르면 그 저장소의 서랍을 연다. 재료는 공유 함수 한 곳에서 만들어 Worker 탭과 모니터가 같다.

세 실패 종류의 자동 기동

- 공통: 스위치가 켜져 있고 그 행에 live 대화가 없을 때 기존 실패 대화 기동기로 연다. 첫 답 전 읽기 전용 경계와 클릭 경로·출구는 바꾸지 않는다.
- 정리 단계 완료 종단(`post_merge_environment`): 단계 토큰이 정리 단계(`base_containment`·`branch_cleanup`·`parent_close`·`post_merge_cleanup`)이면 알림·기동 대상 클래스 `정리 중단`이다. 클릭 세션의 클래스 표도 같은 이름을 쓴다. 횟수는 기존 완료 종단 1회 규칙이다.
- 정리 중단: 완료 의도가 그 Bead의 정리를 몰고 있지 않으면 `cleanup_failed` 기록이 종단이다(`next_retry_at`이 있어도 실행할 주체가 없다). 기록마다 알림·기동을 한 번 하고 식별은 (Bead, step, 기록 시각)이다. 완료 의도가 정리를 몰면 완료 종단이 유일한 원천이다. `foreign_handoff` 정리 실패는 그 알림·대화만 낸다.
- 머지 전 검증 실패 보류: 보류 진입의 `⏸️ 머지 보류` 알림 직후, (PR URL, 보류 head)당 한 번이다. 그 쌍은 완료 의도에 `hold`와 따로 쌓고 `subject`가 바뀌어도 지우지 않는다 — head A→B→A 복귀가 A로 다시 열지 않는다. 머지 충돌·리뷰 stale 보류와 `⏸️ 머지 보류` 문구는 그대로다.
- 외부 작업 완료는 클릭 전용으로 남는다.

대안과 기각 사유: 행을 막힘 칩 팝업 안에서만 끝내기 — 묶음 상세를 둘 자리가 없다. 레인에 새 카드 종류 — 카드 문법 spec부터 바꿔야 해 범위가 크다. 정리 실패는 대화만 열고 알림은 없음 — 스위치가 꺼져 있으면 사람이 알 길이 없다(사용자, 2026-10-13). 행을 별도 파일에 저장 — 공개 큐·revision을 따로 배선해야 한다.

아래는 `ADR UI-btsr`의 Decision 승계분이다. 위 결정과 어긋나는 조항은 `(변경, UI-gske)`로 표시했다.

########## ADR UI-btsr에서 승계하는 조항

**머지 후 정리가 멈춘 행의 Worker 출구 이름은 `[정리 재시도]`다. 사람 재시도(클릭·인계)는 저장소 작업 단계의 실패한 배포·검증을 `retry_of`로 이은 새 실행으로 한 번 다시 돌리고, 끝난 기록은 다시 열지 않는다.**

- (변경, UI-ksi6) 사람 권한은 `retryCleanupLocked`로 들어오는 진입에만 있다: 정리 실패 행 `[정리 재시도]` 클릭, 이미 머지된 PR의 `[머지]` 클릭, 실패 대화 `인계`. 부팅 재개, `resumeCompletionCleanup`, 관측형 자동 재시도, 첫 정리 실행은 권한이 없고 실패 기록을 지금처럼 채택한다. 예외는 하나다: tip이 `condition_wait`이고 계약 기한 안에서 재확인 시각이 됐으면 이 진입들도 사람 권한 없이 그 tip의 후계 하나를 사전기록한다.
- 새 실행의 식별자는 자동 식별 입력에 `retry_of: <잇는 실패 기록>`을 더해 해시하고, 그 키는 있을 때만 더한다(`manual_run_id`와 같은 방식). 그래서 기존 자동·검증·수동 식별자는 바이트 그대로다. 배포와 정리 경로 검증에 똑같이 적용하고, 머지 전 게이트 검증과 외부 대상 검증은 바꾸지 않는다.
- (변경, UI-ksi6) 한 식별자의 현재 상태는 `retry_of` 체인의 끝(tip)이다. tip이 진행 중이거나 성공이면 채택하고, 실패이면 사람 권한이 있을 때, 또는 tip이 `condition_wait`이고 계약 기한 안에서 재확인 시각이 됐을 때만 tip을 잇는 새 기록 하나를 사전기록한다. 대체된 실패에는 `superseded_by`를 쓴다. 정확 조회·부팅 재개·결과 대기는 tip을 읽는다.
- 나머지 입력은 자동 실행 그대로다. 대상은 정리가 막 fetch한 base tip이고 (변경, UI-ymcx) 정책·스크립트는 그 대상 커밋에서 읽는다. 새 기록은 `script_retry` 한 단계를 새로 갖는다. 재시도 후계는 배포 작업 트리 HEAD가 이미 대상을 담고 있어도 스크립트를 실제로 실행한다(수동 실행과 같은 자리의 예외).
- 후계가 사전기록되면 실행 전에 그 Bead의 정리 실패 기록을 지우고 커서를 `repo_operations`에 둔다. 실행 중 재시작돼도 부팅 재개가 행을 잇고, 재실패는 새 시각의 새 정리 실패다. 인계 한 번 규칙의 판정은 바꾸지 않는다.
- 같은 클릭을 가리키는 문구(요청 중 배지, 「저장소 작업」 서랍 버튼, 진행 표시, 알림·댓글 `다음:` 문장, 사용자 조작 기록, 거부 토스트)도 `[정리 재시도]`다. 확인 필요 대화 인계, 외부 작업 완료 fork, 폐기 실패 재시도의 `[워커로 이어가기]`와 실행 타일 `↻ 정리 재시도`는 그대로다.

대안과 기각 사유: 수동 배포(`manual_run_id`)로 대신 실행 — (변경, UI-ymcx) 주체가 `manual`로 바뀌어 Bead 조회와 정리 잇기가 끊긴다. 실패 기록 재개방 — 종단 기록 불변과 `script_retry` 소비 키를 흔든다. 이름은 `[워커로 이어가기]` 유지와 단계별 툴팁 — 클릭이 하는 일을 이름이 말하지 않는다.

아래는 `ADR UI-c74x`의 Decision 승계분이다. 위 결정과 어긋나는 조항은 `(변경, UI-btsr)`로 표시했다.

########## ADR UI-c74x에서 승계하는 조항

**세션이 선언한 복구 대기 중 `authority`·`no_progress`·`credential`은 같은 세션 대화 대상이다. 공급자 보류로 바뀌지 않은 세션 선언 `provider`는 대상이 아니다.**

- 술어는 `session-stall.js`의 `isSessionStalledRecovery`와 현행 사유 집합 `CONVERSATION_RECOVERY_REASONS` 하나다. `credential`을 넣으면 `waiting` 기록 직후 대화 기동(공용 자동 기동 스위치·tmux·Bead당 1개 게이트), 스위치와 무관한 attempt당 한 번의 `🙋 확인 필요`, 살아 있는 대화가 없을 때의 `action_required`(`decision`)와 `[세션에서 이어가기]` 해결 문장, 대화 알림 네 종류(변경, UI-5chz: `❓ 답 대기`가 빠진 세 종류), 멈춤 표기 `recovery:credential`이 함께 따라온다. 경로마다 따로 판정을 두지 않는다.
- 진입 블록 사유 칸은 dotfiles 정본의 바이트 사본 `멈춤 recovery:<authority|no_progress|credential>`이고, 사본은 다이제스트 테스트로 고정한다. 현행 사유 집합은 핀 투영 `result_line_reasons`에서 `provider`·`prerequisite`를 뺀 것과 같다고 테스트가 고정한다.
- 대화 세션은 비밀 값을 대신 찾거나 넣지 않는다. 로그인은 사용자가 하고 대화는 그 결과를 받아 `인계`로 끝난다(계약 Hard stops의 자격 증명 조항).
- Worker 자신의 러너 계정 인증 실패는 `ADR UI-3v1h`의 계정 단위 공급자 보류 그대로다. 그 경로는 복구 대기가 되지 않으므로 이 집합과 겹치지 않는다.
- 이미 `waiting`인 `credential` 기록에는 대화를 소급해 띄우지 않는다. 판정만 `action_required`로 바뀐다.

아래는 `ADR UI-k467`의 Decision 승계분이다. 위 결정과 어긋나는 조항은 `(변경, UI-c74x)`로 표시했다.

########## ADR UI-k467에서 승계하는 조항

**외부 PR 사람 처리 필요(`foreign_handoff`)는 남는 `needs_human` 알림 클래스이자 `[세션에서 이어가기]`가 서는 실패 행이다. 그 행은 `[머지]`로 풀리지 않고 `[워커로 이어가기]`를 그리지 않으며, `[세션에서 이어가기]`만 출구다.**

- 원인은 계약의 세 토큰(충돌, base 불일치, 대상 `[deploy]`·`post-merge.d` 선언)이다. 알림 라벨은 dotfiles 계약 `failure_classes.foreign_handoff.notify_label`의 바이트 사본 「외부 PR 사람 처리 필요」이고, 알림 제목은 다른 실패 종단과 같은 `🙋 확인 필요 · <클래스>`다. 진입할 때 한 번 보낸다.
- 상태는 `resolved`로 남는다. 카드 배지는 「외부 PR 사람 처리 필요」이고 원인 문장은 title에 둔다. `[머지]`는 비활성이고 `needs_human`의 `[머지]` 면제 경로가 이 분류를 풀지 못한다.
- `tileResolveFields`는 이 행을 자기 행 종류로 판정하고 머지 게이트 보류의 세션 제목을 물려받지 않는다. 대화의 첫 입력은 분류·원인·Bead·`foreign_path`와 대상 저장소의 `pr-finish` Foreign-pinned Bead 절차다.
- 충돌 원인은 PR head가 바뀌면, base 원인은 PR base나 핀이 고쳐지면 다음 관측 턴에 다시 판정해 클릭 없이 풀린다. deploy 원인은 세션에서만 풀린다.

아래는 `ADR UI-9w5l`의 Decision 승계분이다. 위 결정과 어긋나는 조항은 `(변경, UI-k467)`로 표시했다.

########## ADR UI-9w5l에서 승계하는 조항

**조치 필요(`action_required`)는 beads-ui 버튼으로 해결할 수 있는 대기 사유에만 서고, 버튼 이름을 담은 해결 문장을 함께 싣는다. 선행 대기는 늘 `normal`이고 대기 사유 판정은 Discord로 알리지 않는다. 살아 있는 대화가 있는 행은 Discord 링크가 없을 때만 `[세션에서 이어가기]`를 그리고, 그 클릭은 새로 띄우지 않고 그 대화 창을 앞으로 부른다.**

조치 필요의 불변식

- `action_required` 사유는 해결 op 하나 이상과 해결 문장 `resolution`을 함께 싣는다. `폐기`와 같은 상태를 다시 읽기만 하는 `[지금 확인]`은 해결 op로 세지 않는다. 둘 중 하나라도 만들 수 없는 상태는 `action_required`가 아니다. 이 불변식은 wait-judgment 단위 테스트가 모든 생산 분기를 돌며 강제한다.
- 선행 대기는 선행의 상태·라벨과 무관하게 `normal`이다. 생산자가 없던 `job_failed`와 함께 `blocker_needs_human` 판정 코드는 없다.
- `takeover_unresolved`(바로 실행 미해결)는 `[세션에서 이어가기]`로 해결 세션을 연다. 세션은 dotfiles external-wait 계약의 holding 정리 규칙을 따르고, 대기는 다음 관측이 원격 기록을 읽어 푼다. 버튼은 원격 상태를 직접 바꾸지 않는다.
- 해결 문장은 대기 판정 근거 팝업의 첫 줄 `해결 — …`과 상세 패널 대기 본문(release 앞)에 그린다. 카드 위 새 칩·라벨·줄 슬롯은 없다. 살아 있는 대화가 있으면 그 대화 문장(Discord 링크가 있으면 Discord, 없으면 tmux 창)이 사유의 문장보다 앞선다. Worker 탭과 모니터는 같은 공유 함수로 그린다.

살아 있는 대화와 `[세션에서 이어가기]`

- 살아 있는 대화(종류 무관)에 Discord 링크가 있으면 버튼을 숨기고, 없으면 `tileResolveFields`가 버튼을 그린다. 인계·인수 결과 보유 중 숨김 같은 다른 가드는 그대로다.
  (변경, UI-3713) 마무리(takeover) 결과를 가진 대화는 `handback_allowed`가 참이면 `[워커로 이어가기]`를 그린다(아래 Decision 신설 조항).
- 클릭은 행 판정보다 먼저 그 Bead의 살아 있는 대화 레코드를 찾아 그 종류의 pane 마커로 창을 앞으로 부르고 `already_running`으로 답한다. 새 세션을 띄우지 않고 레코드·대기 상태를 바꾸지 않는다. 살아 있는 창이 없으면 지금의 행 판정으로 내려간다.

알림

- 대기 사유 판정(`action_required`·`overdue`)은 Discord를 보내지 않는다. 외부 작업 완료, 대화 대상 푸시(`🙋 확인 필요`·`❓ 답 대기` — 변경, UI-5chz: `❓ 답 대기`는 보내지 않는다), 실패 종단 `🙋 확인 필요 · <클래스>`, 공급자 보류 진입·회복 알림은 그대로다. 외부 작업 완료와 redispatch의 억제 키는 보존한다.

아래는 `ADR UI-jbl1`의 Decision 승계분이다. 위 결정과 어긋나는 조항은 `(변경, UI-9w5l)`로 표시했다.

########## ADR UI-jbl1에서 승계하는 조항

**실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 외부 PR 사람 처리 필요(변경, UI-k467), 폐기 실패, 수동 배포 실패)은 공용 대화 자동 기동 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 실패당 한 번 자동으로 연다. 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일하고 「🚨 사람 필요」를 없앤다. 수동 배포 실패는 「저장소 작업」 서랍의 `[세션에서 이어가기]`와 작업 식별자 키의 대화 레코드를 가지며 인계는 그 작업 1회 재실행이다.**

실패 자동 대화

- 시점은 실패가 종단으로 기록된 뒤 한 번이다. 알림과 기동은 같은 1회 표시를 공유하고, 기동 전에 표시를 먼저 쓴다. 재시작·재관측·reconcile은 다시 띄우지 않는다.
- Bead 행(배포·post-merge 잡 실패, 머지 게이트 보류)은 completion intent 종단 처리의 1회 알림 판정 옆, 폐기 실패는 폐기 실패 알림 자리, 저장소 작업 행은 공통 종단 진입 `recoverAfterLadder`가 자리다. 저장소 작업은 `failed`로 바꾸는 같은 쓰기에 대화 대상 표시를 남기고, `recoverAfterLadder`가 대상 표시가 있고 소비 표시가 없을 때만 소비 표시를 먼저 쓴 뒤 알림·기동한다. 대상 표시 없는 옛 실패 기록은 소비된 것으로 본다.
- 기동은 클릭과 같은 해결 세션 기동 함수를 같은 기동기로 부르고 배치만 `placement: 'inquiry'`(분리된 대화 tmux 세션 창)다. 원천 순서는 클릭과 같고, 진입 블록은 실패 사유와 계약의 읽기 전용 진단으로 채운다.
- 스위치가 꺼져 있거나 그 행에 살아 있는 대화가 있으면 띄우지 않는다. `script_retry` 대기는 종단이 아니므로 띄우지 않는다. (변경, UI-gske) 정리 단계 완료 종단(`post_merge_environment`)·완료 의도 없는 정리 중단은 실패 식별자당 한 번, 머지 전 검증 실패 보류는 보류 진입 알림 직후 (PR, 보류 head)당 한 번 자동 기동한다. 외부 작업 완료는 자동 기동하지 않는다.
- tmux가 없거나 기동에 실패하면 알림만 보내고 본문에 열지 못했다고 적으며 다시 시도하지 않는다. 클릭으로는 계속 열 수 있다.

알림

- 종단 실패 알림 제목은 `🙋 확인 필요 · <클래스>`다. 클래스 문자열은 현행 표 그대로이고 머지 게이트 보류는 계약 `notify_label`의 바이트 사본이다.
- 본문은 현행 실패 본문(클래스·원인·다음)에 대화 줄 하나(`대화: Discord 스레드 · tmux <세션:창>` 또는 `대화를 열지 못함 — [세션에서 이어가기]`)를 더한다. 실패 한 건당 알림 하나다.
- 멈춤 대화의 `🙋 확인 필요`, `⏸️ 머지 보류`·`❌ 실패`·`⏸️ 파킹` 등 다른 제목은 바꾸지 않는다.

저장소 작업 실패 대화

- 「저장소 작업」 서랍의 실패한 수동 배포 행이 `기록 닫기` 옆에 `[세션에서 이어가기]`를 갖는다. 서랍을 함께 쓰는 모니터 탭과 Worker 탭에 같이 보이고, 살아 있는 대화 판정은 `tile-resolve.js`가 한다.
- 클릭은 작업 식별자로 fresh 대화를 열고 Bead를 조회하지 않는다. 레코드 키는 `repo-op:<operation_id>:resolve`다.
- 결과 줄: `인계`는 같은 저장소 작업을 `[배포 실행]` 재클릭과 같은 경로(tip 선언)로 한 번 다시 실행하고, 실행 예약을 레코드에 먼저 남겨 재시작 뒤 다시 돌리지 않는다. `보류`는 행을 그대로 둔다. `인수`는 대화형 세션으로 넘어가고 큐 쪽 행은 그대로 둔다.

실행 설정

- (변경, UI-32oq) 공용 스위치(멈춤·실패 공용)와 fresh 세션 런타임(원래 세션 따름·claude·codex), Claude·Codex 각각의 모델·effort를 설정 창 서버 전체 묶음 `운영` 탭의 한 섹션에서 정하고 서버 전역 설정 파일에 둔다. `workflow_session_defaults`에는 넣지 않는다.
- 스위치는 저장값이 있으면 저장값, 없으면 config.toml `[worker.direction_inquiry] enabled`다. 파일이 손상되면 config.toml 값과 "따름"으로 돌아가고 경고를 남긴다.
- 런타임은 fresh 기동에만 쓰고 이어 쓰기·fork는 원래 세션 런타임이다. 모델·effort는 모든 대화 기동(클릭·자동, 멈춤·실패·외부 작업 완료)에 기동 런타임의 플래그로 붙이고, "따름"이면 붙이지 않는다.

승계 조항의 읽기

- 아래 승계 조항의 자동 게이트 `worker_direction_inquiry.enabled`는 공용 대화 자동 기동 스위치(저장값, 없으면 그 config.toml 값)로 읽는다. "Bead당 하나"인 대화 수는 "행(Bead 또는 저장소 작업)당 하나"로 읽는다.

########## ADR UI-qbgj에서 승계하는 조항

**대기 중인 Slurm 등록 잡의 대기 사유·앞 대기 수·예상 시작·파티션 배정·호스트 실제 여유는 같은 관찰 ssh 안의 읽기 전용 조회로 얻는 표시 재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다. 외부 잡을 바꾸는 유일한 경로는 사람이 확인한 `▶ 바로 실행`이고, 단일 대기 Slurm 잡을 `sjob takeover` 한 명령으로 같은 호스트 로컬 실행(워크플로면 `profiles/server-local`로 하위 단계까지)으로 옮긴 뒤 같은 대기 레코드에서 `sjob_local` 잡으로 제자리 교체한다.**

용량 재료

- slurm 등록 잡이 `PENDING`일 때만 관찰 ssh 한 번 안에서 각 조회를 시간 상한으로 감싸 읽는다. 재료 실패는 저장된 값을 그대로 두고 레코드의 오류 횟수·백오프에 닿지 않으며, `PENDING`을 벗어나면 지운다.
- 호스트 실제 여유(CPU 수·1분 부하·`MemAvailable`)는 ssh 호스트가 파티션 노드일 때만 채운다. 바로 실행이 도는 곳이 그 호스트라서다.
- 오래된 재료는 읽은 시각으로 드러낸다.

바로 실행

- 노출 조건은 레코드 stage가 `hold`·`detached`이고 잡이 정확히 하나이며 그 잡이 진행 표시 없는 `PENDING` slurm 잡인 경우다. 서버가 카드 조작을 내리고 렌더러는 다시 판정하지 않는다.
- 레코드별 조작 잠금이 진행 중 관찰과 직렬화하고, ssh 전에 그 잡에 진행 표시(`takeover`, 계약 필드 `state`·`requested_at`·`cpus`·`mem_gb`)를 영속한다. 표시가 있는 동안 그 잡의 일반 Slurm 종료 판정과 재요청을 막는다.
- 결과 불명은 관찰 차례마다 `sjob takeover <id> --result --json`으로 복구한다. `started`·`done`은 제자리 교체, 미보류 `no_takeover`는 원격 takeover가 ssh보다 오래 살 수 있으므로 정착 창(`TAKEOVER_SETTLE_MS`, 현재 기본 5분)이 지난 뒤에만 표시를 지운다. 정착 창을 넘긴 표시는 사람 조치(`바로 실행 결과 확인 필요`)로 판정한다.
- 교체는 bd `external_wait` 키·`wait_id`·stage·owner·hold 예산을 바꾸지 않는다. 완료 식별은 `<ssh_host>:<local_id>`이고 완료 프롬프트는 Slurm에서의 전환과 원 잡 취소 미확인을 적는다.
- 자원 기본값의 비율은 타이밍 설정 표가 아닌 별도 서버 전역 설정(`server/external-wait-settings.js`)이 소유한다.
- 관찰 자체는 여전히 잡을 바꾸지 않는다. "실행 방식(작은 머리 잡 + 하위 잡)은 바꾸지 않는다"는 기본 실행 방식에 관한 것으로 유지하고, 바로 실행만 프로젝트의 `profiles/server-local`로 워크플로 전체를 정한 코어 안에서 로컬로 돌린다.

########## ADR UI-18a5에서 승계하는 조항


**beads-ui가 여는 대화형 세션(확인 필요·실패·외부 작업 완료)은 모두 `[세션에서 이어가기]` 하나로 열고 `인계`·`인수`·`보류`로 끝난다. `[워커로 이어가기]`는 대화 없이 Worker가 잇는 짝이고(머지 후 정리가 멈춘 행에서는 `[정리 재시도]`, 변경 UI-btsr), `인계`는 그 행의 Worker 출구를 사용자 답의 권한으로 많아야 한 번 실행하며 머지 게이트 위조 판정은 예외다. 외부 작업 완료 대화가 인수·인계 없이 끝나면 대기 키를 다시 써 완료 행으로 되돌린다. 자동 기동은 사람 판단 멈춤과, 공용 스위치가 켜졌을 때의 실패 종단에 둔다(변경, UI-jbl1).**

대상 행과 두 버튼

- `[세션에서 이어가기]`가 설 수 있는 행은 확인 필요(파킹·복구 대기), 실패(머지 전 검증 보류·`needs_human` 종단·`cleanup_failed`·실패한 폐기·실패한 수동 배포 저장소 작업(변경, UI-jbl1)·외부 PR 사람 처리 필요(`foreign_handoff`, 변경 UI-k467)), 외부 작업 완료(세션 소유 외부 대기의 `completing` 행) 셋이다. 그 행(Bead 또는 저장소 작업, 변경 UI-jbl1)의 살아 있는 대화형 세션이 종류와 상관없이 하나라도 있으면 서지 않는다. (변경, UI-9w5l) 다만 그 대화에 Discord 링크가 없으면 서고, 클릭은 새로 띄우지 않고 그 대화 창을 앞으로 부른다. 바로 실행 미해결(settle을 넘긴 takeover 마커가 있는 hold/detached 외부 대기) 행에도 서고, 서버 행 순서는 복구 대기 → 바로 실행 미해결 → 외부 작업 완료 → 실패·파킹이다.
- 클릭 op는 하나이고 서버가 행 상태로 런처를 고른다: 확인 필요 → 문의 런처, 외부 작업 완료 → 외부 재개 런처, 실패 → 해결 런처. 내부 종류(`inquiry`·`resolve`·`external_resume`), pane 마커 셋, 창 이름, fork·같은 세션 재개 방식, 자동 기동 게이트는 그대로다.
- `[워커로 이어가기]`는 기존 op의 이름을 맞춘 것이다: 확인 필요는 대화 인계, 외부 작업 완료는 Worker attempt fork 재개, 실패의 폐기는 폐기 재시도. (변경, UI-btsr) 실패의 머지 후 정리의 Worker 출구는 같은 자리의 `[정리 재시도]`다. 머지 전 검증 보류와 `needs_human` 머지 게이트 행에는 그리지 않는다 — 그 행에서 Worker가 잇는 조작은 `[머지]`다.
- 짝의 유무와 자리는 `tileResolveFields` 하나가 정하고 PR 대기 행과 저장소 작업 타임라인도 그 판정을 그린다. 짝은 모든 카드에서 슬롯 6이다(카드 문법 스펙 §5.1 정정(UI-18a5)). `인수` 동안은 짝 둘만 숨기고 행의 나머지 조작은 그대로다.
  (변경, UI-3713) 마무리 동안 Bead가 `open`이면(`handback_allowed`) 그 행의 `[워커로 이어가기]` 자리에 되돌리기 버튼이 선다. 새 슬롯은 없다.

첫 입력과 관측

- 세 런처 모두 dotfiles 진입 블록(`execution-common.md` `## Worker 세션 대화`)의 바이트 사본을 첫 입력으로 쓰고 블록이 정한 슬롯만 채운다. 사본의 sha256은 테스트로 고정한다.
- 세 런처 모두 레코드에 `conversation`을 쓰고 결과 줄 관측·답 대기 판정·`❓ 답 대기`·`🙋 사람 인수`가 종류와 상관없이 같은 규칙으로 돈다. (변경, UI-5chz) `❓ 답 대기` 푸시는 없다. (변경, UI-jbl1) `🙋 확인 필요`는 멈춤 자동 기동과 실패 종단 알림(`🙋 확인 필요 · <클래스>`)에 보낸다. `🚨 사람 필요` 제목은 없다. `⏸️ 머지 보류`, 외부 작업의 `✅ 외부 작업 완료`는 그대로다.

끝맺음

- `인계 ·`는 창을 닫고 소멸을 확인한 pass가 그 행의 Worker 출구를 실행한 뒤 레코드를 지운다. 확인 필요는 같은 attempt를 같은 세션으로 재개하고, 실패의 머지 후 정리는 사람 클릭과 같은 권한(`job_retry_authorized`)의 정리 재시도, 실패의 폐기는 폐기 재시도, 머지 전 검증 보류는 `[머지]`와 같은 머지 큐 재등록, 외부 작업 완료는 그 대화 세션을 원천으로 현행 fork·admission·실행 설정 규칙의 Worker attempt 하나를 `## 대화 결과` 블록과 함께 dispatch한다. 머지 게이트 `needs_human`은 실행하지 않고 `보류`처럼 끝난다 — `[머지]` 재클릭은 그 head의 영수증 tier를 waive하고 영수증 보류 출구는 사람 전용이다.
- 인계 실행 한 번은 사람 클릭 한 번이다. 자동 사다리 단계가 아니며 `script_retry` 횟수를 쓰지 않는다.
- 한 번 규칙: 실패는 `handoff` 예약에 대상 식별(정리 실패의 단계·기록 시각, 폐기 `operation_id`와 오류, 보류 head)을 고정하고 출구를 부르기 직전에 실행 시작 시각을 레코드에 durable하게 쓴다. 출구는 그 정산 pass 밖에서 돈다. 재시작한 pass는 식별이 바뀌었으면 실행된 것으로 보고 레코드를 지우고, 실행 시작이 있는데 식별이 그대로면 다시 실행하지 않고 `이어가기 거절: 결과 미상`으로 끝낸다. 외부 작업 완료는 dispatch된 attempt가 대화 식별(레코드 키·`launched_at`)을 싣고, 재시작한 pass는 그 attempt가 있으면 소진으로 본다; 예약 뒤 attempt 기록 전 재시작의 정산은 남은 대화 레코드로 같은 dispatch를 복원한다. 확인 필요는 자식 attempt의 `resumed_from`이다.
- 실행 전 거절(행이 이미 정산됨·op 사전조건 실패·진행 중 조작)은 레코드를 지우고 이유를 카드(`이어가기 거절: <사유>`)와 타임라인에 남긴다. 행은 그대로이고 짝이 다시 선다.
- `인수 ·`는 창을 두고 Worker는 관찰만 한다. `보류 ·`는 창을 닫고 확인 필요·실패 행은 그대로 남아 짝이 다시 선다. 결과 줄 없이 창이 사라지면 확인 필요는 `pane_gone`, 실패는 행이 그대로 남는다.
  (변경, UI-3713) 마무리 뒤에도 Worker는 새 assistant 메시지를 읽고, Bead가 `open`인 동안 `워커가 이어감 ·` 줄이 오면 처음부터 그 줄로 끝난 대화와 같이 그 종류의 Worker 출구로 간다. 마무리 창이 닫힌 확인 필요 attempt는 `ended_by='takeover'`이고 Bead가 `open`이면 `pane_gone`처럼 `[워커로 이어가기]`를 받는다.
- 외부 작업 완료 대화가 인수·인계 없이 끝나면(보류, 결과 줄 없이 창 소멸, 인계 실행 전 거절) Worker는 같은 `wait_id`로 bd `external_wait` 키를 다시 쓰고 readback한 뒤 레코드를 `resumed`에서 `completing`으로 되돌리고 `resume`을 비운다. 순서는 키 쓰기 → readback → 레코드 전이이고 중간에 멈추면 다음 pass가 같은 순서를 다시 한다.
  (변경, UI-3713) 마무리로 끝난 외부 작업 완료 대화도 창이 사라질 때 Bead가 `open`이면 같은 순서로 완료 행으로 되돌린다.
- `↪ Worker가 이어감`은 인계가 실행을 시작했을 때 한 번 보낸다(`실행: <정리 재시도|폐기 재시도|머지 큐 재등록|attempt 재개>`).

승계 조항의 읽기

- 아래 승계 조항의 대화 대상(사람이 필요한 멈춤)은 위 세 행으로 넓어진다. 승계 조항 안의 `[세션에서 해결]`은 `[세션에서 이어가기]`로, 폐기 실패의 `[재시도]`는 `[워커로 이어가기]`로 읽고, 실패 카드의 `[정리 재시도]`는 그대로 `[정리 재시도]`다(변경, UI-btsr). 실패 attempt 타일 슬롯 1의 `↻ 이어하기`·`↻ 정리 재시도`와 잔재 백업의 `백업 정리 재시도`·`백업 포기`는 그대로다.
- 대화형 세션 배지·대기 팝업·시각 줄의 종류 이름(`재개`·`해결`·`문의` 세션)은 `대화 세션` 하나다. fork·같은 세션·새 세션 구분은 툴팁에만 둔다.
- 배포 시점에 살아 있던 `conversation` 없는 해결·외부 재개 레코드는 옛 규칙으로 정산한다.

########## ADR UI-ny0h-2에서 승계하는 조항

**미분류 실패 재시도 사다리와 base_moved 재개 지연의 길이는 서버 전역 타이밍 설정이 정하고 두 값은 서로 독립이다.** 사다리 칸 길이는 `env_retry_delays_seconds`, base_moved 재개 지연은 `base_moved_retry_seconds`(`server/timing-settings.js`)이다. 값은 지연을 계산하는 순간에 읽고, 바뀐 값은 다음 예약부터 적용되며 기록된 `next_at`은 다시 쓰지 않는다.

########### ADR UI-q15q에서 승계하는 조항

**외부 작업의 하위 잡은 등록 잡과 같은 사용자·같은 `WorkDir`에서 등록 잡 시작 이후 제출된 Slurm
잡이다. 사용자 큐와 Slurm 작업 완료 기록만으로 관찰하고 로그는 읽지 않는다. 하위 잡은 표시
재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다. 사람이 필요한 멈춤의 같은 세션 대화와
그 밖의 UI-nuwy 조항은 그대로다.**

외부 작업 하위 잡 (UI-q15q가 더함)

- 소속 기준은 등록 slurm 잡의 사용자·작업 폴더·시작 시각(`anchor`)이다. 기준이 없으면 하위 잡을
  판정하지 않는다. 같은 호스트·폴더의 등록 잡이 여럿이면 하위 잡 제출 시각 이전에 시작한 등록
  잡 중 가장 늦게 시작한 잡에 붙인다. 다른 Bead의 같은 폴더 동시 실행은 구분하지 않는다.
- 관찰은 기존 관찰 ssh 한 번 안의 읽기 전용 조회(사용자 큐, `jobcomp/filetxt` 완료 기록)다.
  잡을 바꾸지 않는다(`mutates_job: never`). 하위 잡 재료의 실패는 저장된 하위 잡을 바꾸지 않고
  레코드의 `error_count`·`last_error`·백오프에 닿지 않는다.
- 등록 slurm 잡은 표시 필드 `name`·`anchor`·`spawned`(`total`·`counts`·`rows`·`omitted`)를 갖는다.
  개수는 행 상한과 무관하게 정확하고, 행 상한 값은 서버 상수(`SPAWNED_COMPLETED_ROW_LIMIT`)가
  소유한다. 하위 잡은 등록 판정·hold 판정·`completion`·`completionDigest`·판정 배지·알림에
  들어가지 않는다.
- 카드 슬롯 3은 등록 잡을 이름으로 보이고 하위 잡 요약 줄을 붙이며, 슬롯 1 배지는 등록 잡만
  센다. 표시 형식은 `docs/superpowers/specs/2026-10-02-external-job-spawned-slurm-jobs-design.md` §3.5·§3.6과 카드 문법 스펙 §5.1 정정(UI-q15q)이 소유한다.

########### ADR UI-nuwy에서 승계하는 조항

**사람이 필요한 멈춤은 같은 Worker 세션을 fork 없이 tmux 대화형으로 열어 해결한다. 대화 턴
종료는 답 대기(`action_required`)이고, 첫 줄 `인계 ·`를 관측하면 창 소멸을 확인한 뒤 같은
attempt를 같은 세션·기록 실행 설정으로 재개한다. `인수 ·`면 관찰만, `보류 ·`면 대기로 남는다.
알림은 `🙋 확인 필요`·`❓ 답 대기`·`↪ Worker가 이어감`·`🙋 사람 인수` 넷이다.**

(변경, UI-5chz) 알림은 `🙋 확인 필요`·`↪ Worker가 이어감`·`🙋 사람 인수` 셋이다. 답 대기는 세션 Discord 스레드로만 알린다.
(변경, UI-3713) 결과 줄은 새 접두와 옛 접두를 같은 뜻으로 읽고(`워커가 이어감`=`인계`, `이 대화에서 마무리`=`인수`, `나중에`=`보류`), 알림 셋째는 `🙋 대화에서 마무리`다. 마무리 뒤 Bead가 `open`이면 `워커가 이어감 ·` 줄이나 `[워커로 이어가기]`로 같은 재개 경로에 들어간다.

대화 대상

- 대상은 파킹(`awaiting_user` 문자열, 어휘 안팎 모두)과 복구 대기 중 사유가 `authority`·
  `no_progress`인 것이다(변경, UI-c74x: 세션이 선언한 `credential`도 대상이다). 이미 기록된 옛 사유(`verification`·`reconcile`·세션 선언
  `unclassified`·빈 blockers `prerequisite`)도 읽기 호환으로 대상이고 진입 블록은
  `recovery:<사유> (옛 기록)`으로 적는다.
- 술어는 `session-stall.js` 하나(`isSessionStalledRecovery`, 현행 사유 집합
  `CONVERSATION_RECOVERY_REASONS`, 멈춤 표기 `conversationStopLabel`)이고, 현행 사유 집합은 핀
  투영의 `result_line_reasons`와 대조하는 테스트로 고정한다.

기동 — 같은 세션, fork 없음

- 기동 조건은 자동 게이트 `worker_direction_inquiry.enabled`, tmux(닿지 않으면 fail-closed),
  Bead당 하나다. 사람 클릭 `[세션에서 해결]`은 게이트를 읽지 않는다.
- 명령은 attempt의 기록 세션을 그대로 연다: Codex `codex resume <session_id> <진입 블록>`,
  Claude `claude --resume <session_id> <진입 블록>`(`--fork-session`·새 `--session-id` 없음). cwd는
  attempt 워크트리이고 레코드는 `mode: 'resume'`이며 `session_id`를 기동 시점에 안다.
- 한 세션 ID에는 프로세스 하나다. attempt의 `process_identity`가 가리키는 러너가 살아 있으면
  `runner_alive`, 확인할 수 없으면 `runner_liveness_unknown`으로 기동하지 않는다. Worker 재개도
  대화 창의 소멸을 reconcile이 확인한 뒤에만 한다.
- 기록 세션을 열 수 없으면(전사 없음·다른 호스트·러너 불명·워크트리 없음) fresh 세션(변경, UI-jbl1: 런타임은 공용 대화 설정, "원래 세션 따름"이면 같은 provider)에 진입 블록을 주고 `fallback_reason`을 기록한다. 그때 인계 뒤 재개는 `resume()`의
  기존 사다리가 정한다.
- 첫 입력은 dotfiles `execution-common.md` `## Worker 세션 대화` 진입 블록의 바이트 사본 하나
  (`CONVERSATION_ENTRY_BLOCK`, sha256 `cdc347bb…`)이고 beads-ui는 멈춤 사유·세션이 남긴 문장·두
  경로만 채운다. 옛 fork 문의 프롬프트 4종은 은퇴했다. 배포 시점에 살아 있던 `mode: 'fork'`
  레코드는 옛 규칙으로 정산한다.

관측과 판정 — 새 assistant 메시지 단위

- 대화가 살아 있는 동안 단계(`turn_state`)는 현행대로 pane 옵션이 정한다. 결과 줄과 답 대기는
  단계 전환이 아니라 **새 assistant 메시지** 단위로 처리한다: 매 pass(`INTERACTIVE_RECONCILE_INTERVAL_SECONDS`, 현재 30초) 전사 끝(현재 64KB)에서
  마지막 assistant 메시지와 그 식별자(메시지 시각, 없으면 전사 mtime)를 읽고, 기동 뒤이면서
  마지막 처리 식별자보다 새 메시지이고 단계가 `running`이 아니면 한 번 처리한다. 관측 사이에
  시작하고 끝난 턴도 잡힌다. 처리한 식별자와 발췌(`PROGRESS_EXCERPT_MAX_CHARS`, 현재 400자)는 같은 레코드 쓰기에 남는다.
- 첫 줄이 `인계 ·`·`인수 ·`·`보류 ·`로 시작하면 결과 줄이고, 그 밖은 답 대기다.
  (변경, UI-3713) 새 접두 `워커가 이어감 ·`·`이 대화에서 마무리 ·`·`나중에 ·`도 같은 kind의 결과 줄이다. 옛 접두는 지울 날짜 없이 계속 읽는다.

  | 대화 레코드 상태 | verdict | 카드 조작 |
  | --- | --- | --- |
  | 살아 있는 대화 없음 | `action_required` · `decision` | `[세션에서 해결]` · (`결과 줄 없이 창이 사라진` 경우) `[워커로 이어가기]` · `폐기` |
  | `running` | `normal` (대화 중) | `폐기` |
  | 기동 뒤 assistant 메시지 없음(`idle`·`null`) | `normal` (기동 중) | `폐기` |
  | `question`·`limit`, 또는 결과 줄이 아닌 메시지를 처리한 `idle` | `action_required` (답 대기) | `[세션에서 이어가기]`(Discord 링크가 없을 때, 창 포커스 — 변경, UI-9w5l) · `[워커로 이어가기]` · `폐기` |
  | 인계 예약·사람 인수 | `normal` | `폐기` |

  (변경, UI-3713) 마무리 행은 Bead가 `open`이면 카드 조작에 `[워커로 이어가기]`가 더해진다.

- 결과 줄 없이 창이 사라지면 레코드를 지우고 attempt에 `pane_gone`을 남겨 확인 필요로 되돌린다.
  옛 fork 레코드는 UI-ri8n 규칙(질문·한도만 `action_required`) 그대로다.

인계 — Worker가 같은 세션을 이어감

- `인계 ·`(또는 `[워커로 이어가기]`) → 레코드에 `handoff` 예약(결과 줄·메시지 식별자)을 쓰고 창을
  닫는다(Claude `/exit`, Codex 창 종료). 소멸을 확인한 pass가 이어가기를 한 번 실행하고, 그것이
  돌아온 뒤에야 레코드를 지운다(재시작 중간이면 다음 pass가 다시 실행하고, 이미 자식이 있으면
  소진으로 본다).
- 살아 있는 대화나 `handoff` 예약이 있는 동안 `onIssuesChanged`의 파킹 해제 전이 재디스패치는
  보류한다. 창 소멸 뒤 이어가는 경로는 하나다: 대화의 사용자 답 턴에서 `awaiting_user`가 이미
  해제된 stale 파킹은 기존 해제 전이 재디스패치가 한 번 잇고 `resume()`은 부르지 않는다. 그 밖은
  `resume(workspace, attempt_id, { continuation: 'prior_session', conversation_return })`이다.
- `resume()`는 자식 attempt(`resumed_from`, 같은 `session_id`)를 먼저 기록하고 launch한다. 실행
  설정은 `recordedDispatchSettings(prior)`이고 가드 훅·push 로그·착지 판정은 일반 재개와 같다.
  launch 종류는 `conversation_return`이다.
- 이 경로에만 있는 예외: `parked`를 재개 가능 상태로 받고, admission의 `awaiting_user` 거절을
  `allow_conversation_return`으로 건너뛴다(해제는 재개 세션의 영수증 쓰기가 한다). WS
  `recovery_requires_inquiry`, `settledAttemptFence`, 공급자 자동 재개 차단은 그대로여서 사람
  `↻`나 자동 재디스패치로는 재개하지 않는다.
- 재개 프롬프트 첫머리에 beads-ui 소유 `## 대화 결과` 블록(대화 뒤 무인 attempt로 돌아왔다는
  사실, 이번 대화의 결과 줄 원문, 대화 단계 금지가 풀리고 무인 규칙·가드가 다시 적용되며 남은
  단계는 dotfiles `Worker 세션 대화` 표 순서라는 문장)을 둔다. notes는 읽지 않고 새 권한을 주지
  않는다.
- 자식 기록 전의 거절은 예약을 지우고 확인 필요로 되돌리며 이유를 카드(`이어가기 거절: <사유>`)에
  남긴다. 자식 기록 뒤의 실패는 그 자식의 일반 실패 처리가 맡고 대기 attempt는
  `already_resumed`로 소진된다.

인수·보류·대체 출구

- `인수 ·`: 창을 두고 Worker는 재개하지 않으며 정산은 Bead close·PR 관측(`bd_closed`·`done`)이다.
  판정은 `normal`, 배지는 `사람 인수`, 조작은 `폐기`뿐이다. 인수 세션의 push는 가드 밖이고 사람이
  명시적으로 소유한 것으로 감수한다.
  (변경, UI-3713) 배지는 `대화에서 마무리 중`이다. Bead가 `open`인 동안은 뒤 메시지의 `워커가 이어감 ·` 줄이나 `[워커로 이어가기]`(`handback_allowed` 참일 때만 보임)로 Worker에 되돌리고, `in_progress`·`resolved`·`closed`면 되돌리지 않는다.
- `보류 ·`: 창을 닫고 attempt는 대기로 남으며 카드는 `[세션에서 해결]`·`폐기`, 알림은 없다.
- `[워커로 이어가기]`는 대화가 살아 있고 답 대기일 때, 또는 결과 줄 없이 창이 사라진 대기
  attempt에만 선다. 누르면 인계와 같은 경로이고 결과 줄 자리에 "사용자가 [워커로 이어가기]로
  인계"를 싣는다. 재개 세션은 이번 대화의 결정(같은 세션의 자기 맥락)이 있으면 적용하고, 없으면
  원래 멈춤을 다시 판단한다. notes의 이전 `대화 결정:` 줄은 쓰지 않는다.
  (변경, UI-3713) 마무리 결과를 가진 살아 있는 대화(세 종류)와 마무리로 창이 닫힌 확인 필요 attempt에도 Bead가 `open`이면 선다. 결과 줄 자리 문구는 "사용자가 [워커로 이어가기]로 넘김"이다.
- 두 버튼의 유무는 `tileResolveFields` 하나가 정하고 `[워커로 이어가기]`는 서버 `wait-judgment`의
  actions 투영(`worker-conversation-handoff`)을 찾기만 한다. 렌더러는 다시 판정하지 않는다.

알림

| 종류 | 언제 | 억제 |
| --- | --- | --- |
| `🙋 확인 필요` | 대화 대상 멈춤 기록 직후 자동 기동 시도 뒤 1회(이유 `설계 충돌 · <값>`·`범위 충돌`·`같은 원인 반복`·`옛 기록 · …`, 대화 위치 또는 열지 못한 사유) | attempt `cause_detail.confirm_notified_at` — 보내기 전에 기록 |
| `❓ 답 대기` (변경, UI-5chz) | 보내지 않는다 — 메시지 처리와 발췌 기록은 그대로다 | — |
| `↪ Worker가 이어감` | `conversation_return` launch 성공(`결정:`·`실행:` 줄) | launch당 1회 |
| `🙋 사람 인수` | `인수` 관측 | 레코드당 1회 |

- `🙋 확인 필요`는 이 대상의 `⏸️ 파킹`과 `⚠ … 지연 · 세션이 멈춤`을 대체한다 —
  `notifyWaitReasons`는 `awaiting_user` 행과 대화 대상 복구 행을 보내지 않는다(변경, UI-9w5l: 대기 사유 판정은 어떤 행도 보내지 않는다). 대화가 시작되면
  확인 필요는 소비된 채로 두고 같은 멈춤의 재알림은 `❓`가 맡는다 (변경, UI-5chz: 세션 Discord 스레드가 맡는다). 보류·대화 중(`running`)은 알림이
  없고 `✅`·`📬`·`❌`는 그대로다.

카드 표면

- 대기 어휘 `awaiting_user`·`recovery` 행의 라벨은 `확인 필요`다. 대화형 세션 배지 꼬리는 대화
  레코드에서 `대화 중 <경과>`·`답 대기`·`사람 인수`다.
- 표면 판정은 서버 투영(`wait-judgment` actions·`tileResolveFields`)에만 둔다. Worker·Monitor가
  같은 `buildLanes` 경로와 같은 클릭 배선을 쓴다.

계약 핀

- `generated/contracts/work-recovery-policy.json`은 schema 2 사본이다(dotfiles
  `f031c9853f536c1478e9d1129b8c69628be27ef8`). `validPolicy`는 `result_line_reasons` 명시 목록이
  `wait_reasons`의 부분집합인지 보고 `reason`은 `wait` 항목에만, `next`는 `reconcile` 항목에만
  요구한다. `recoveryResultLineReasons()`는 그 목록을 그대로 광고한다. schema 1 핀은 받지 않는다.
- schema 2에서 이유 없는 `repair`(코드 결함 아님)·`reconcile` 작업 복구도 수정 Bead가 없으면
  사람 판단 행(`action_required`)으로 남는다.

############ ADR UI-ri8n에서 승계하는 조항

단계 관측

- `interactive_sessions` 레코드는 `turn_state`(`running`·`question`·`limit`·`idle`·`null`),
  `turn_state_since`, `last_message`(`{ text, at }`, 마지막 assistant 메시지 첫 줄, `PROGRESS_MESSAGE_MAX_CHARS`(현재 160자) 이하; 대화
  레코드는 자르지 않은 첫 줄·`PROGRESS_EXCERPT_MAX_CHARS`(현재 400자) 발췌·전사 mtime을 더 싣는다), `last_message_read_at`을 갖는다.
  reconcile pass가 `listPanesExtended` 포맷에 실린 `@agent_running`·`@agent_attention`으로 단계를
  정하고(`1` → `running`; `question`·`plan` → `question`; `limit` → `limit`; 그 밖·둘 다 비어
  있음 → `idle`), 값이 바뀔 때만 `turn_state_since`를 쓴다. `null`은 첫 관측 전 레코드뿐이다.
  전사는 `session_id`가 있고 로컬이며 mtime이 새로울 때만 끝(현재 64KB)을 읽는다
  (`interactive-progress.js`).
- 시작 타임라인 이벤트는 레코드당 1회다(첫 관측 pass).

대기 판정

- `judgeWaitReasons`의 `recovery` 분기 중 `isSessionStalledRecovery`가 참인 경우와
  `awaiting_user` 분기만 `queue.interactive_sessions[<bead>:inquiry]`를 읽는다.
  `state === 'live'`·`settled_at === null`이 "살아 있는 대화"다. verdict 표는 위 결정이다
  (UI-nuwy가 뒤집음: UI-ri8n 표의 `idle → normal`).
- `provider`·`credential`(변경, UI-c74x: `credential`은 대화 대상이다)·선행 목록 있는 `prerequisite` 등 다른 복구 대기의 판정은 바뀌지
  않는다. `headline`은 세션이 남긴 blocker 문장, `since`는 `attempt.finished_at` 그대로다.

카드 출구와 표면

- `[세션에서 해결]`의 유무는 `tileResolveFields(item, resolve_pending, handoff_pending)` 하나가
  정한다: `eligible = parked || wait.recovery || wait_reasons에 recovery || discard.error`,
  `live = interactive_sessions 중 state==='live' && !closing && kind ∈ {inquiry, resolve}`,
  `resolve_action = eligible && !live`. 같은 함수가 `[워커로 이어가기]`의 `handoff_action`을 서버
  actions 투영에서 정한다. 렌더러(`running-grid.js`·`lanes.js`)는 다시 판정하지 않는다. 호출자는
  Worker·Monitor 실행 타일, Worker 대기 행·ghost 행, Monitor `parallelRow`·`serialRow`, PR 대기
  행이다. `external_resume` 세션은 `live`에 세지 않는다.
- 서버 `launchForClick`의 `already_running` 응답은 오래된 스냅샷·타임라인 클릭의 방어로
  남고 토스트 톤은 `info`다.
- 슬롯 표(2026-08-25 스펙 §5.1 `정정(UI-ri8n)`): 슬롯 1 대화형 세션 배지에 단계 꼬리(대화
  레코드는 `대화 중 <경과>`·`답 대기`·`사람 인수`, 옛 레코드는 `작업 중 <경과>`·`질문 대기`·
  `한도 대기`·`턴 종료 <경과>`), 대기 배지 팝업에 `문의 세션 <tmux_session:tmux_window> · <단계>`
  줄, 슬롯 3 held 타일·대기 행에 `▤ <마지막 메시지>` 진행 줄(재료 없으면 안 그림), 슬롯 7 시각
  줄은 살아 있는 문의가 있으면 `문의 세션 <n>분째`. `[워커로 이어가기]`는 `[세션에서 해결]`과 같은
  조작 자리에 선다. Worker·Monitor가 같은 `buildLanes` 경로를 그린다.
- 바꾸지 않는 것: 자동 기동 게이트·브리지 이벤트, 레코드의 생존·종료 규칙(ADR UI-nuwy-2),
  대기 어휘 4종과 대표 사유 순서, 슬롯 6의 `폐기`.

############# ADR UI-l48z에서 승계한 조항


세션 소유 외부 대기 Bead는 `external_wait` 키 하나를 술어로 후보 레인이 아니라
실행 중 레인의 세션 타일에 서고, 외부 대기 조작은 슬롯 6 foot이며, 좌표 칩은 상세
패널 잡 표가 갖는다.

외부 대기 타일과 카드

- `runnable-cache`의 한 행 판정에서 metadata `external_wait`가 비어 있지 않은
  문자열이면 `qualify()`를 건너뛰고 `qualifySession()`으로 간다. `qualifySession`은
  `in_progress`이거나 `external_wait` 키가 있는 `open` 행을 받아 행의 실제 `status`
  (`'in_progress'|'open'`)를 싣는다. Worker 소유 대기 Bead도 같은 규칙으로
  `session_active`에 실리고, 클라이언트의 `claimed` 집합(보류 타일이 먼저 잡음)이
  중복을 막는다. 빈 문자열·비문자열 키와 `deferred`·`closed`는 그대로다.
- `lane-model`의 세션 타일 루프가 `status: entry.status`를 싣고, 소유가 `session`인
  살아 있는 레코드(`stage ∈ {hold, detached, completing}`)를 조립 시점에 `external_wait`
  로 붙인다. 그 타일은 `started_at`·`updated_at`을 싣지 않는다 — 세션이 살아 있지
  않으므로 타일 시계를 돌리지 않는다. 후보 루프의 `claimed` 검사가 같은 bead의 후보
  카드를 없앤다.
- `runningTile`의 다섯째 held 상태는 `external_wait`이고 술어는 레코드가 아니라
  사유(`externalWaitCardParts(tile).badge`)다 — 레코드 없이 키만 남은
  `wait_record_missing`도 `⛔ 조치 필요`와 `[관찰 중단]` 출구를 같은 경로로 갖는다.
  슬롯 1은 `직접 세션` 배지 대신 외부 대기 배지, 조작은 `▤ 세션`뿐(경과 라벨 없음),
  슬롯 3은 `wait_body_lines.body`, 슬롯 7은 `wait_body_lines.times`다.
- `external_wait_check`·`external_wait_stop`·`external_wait_resume`은 `runningTile`·
  `candidateCard`·`miniRow`(카드 변형) 셋 모두에서 슬롯 6 foot이다 — 파킹 처분
  버튼과 같은 판정("이 대기를 어떻게 처분하나")이다. 후보 카드에서는 `↴ 대기로`
  대신 선다. 라벨과 `title`은 서버 `wait-judgment`가 stage별로 정한다: `[지금 확인]`·
  `[관찰 중단]`(hold·detached), `[대기 해제]`(completing stop), `[워커로 이어가기]`
  (fork), `[새 세션으로]`(fresh). 세션 소유 `completing`에서 `[워커로 이어가기]`는
  `session-preferred` 라벨이 있으면 보통 버튼, 없으면 primary다.
- 카드의 `ssh <host>`·잡 번호·`log <path>` 칩은 없다. 상세 패널 `externalJobsTemplate`이
  이름·상태·경과/제한·자원·번호·exit·expected·로그(클릭 = 복사) 표 — 등록 잡 행 아래
  하위 잡 행이 붙고 완료 하위 잡은 접힌다 — 와 그 아래 같은 `data-external-wait-op`
  계약의 조작 줄을 갖는다. 상세 패널은 Worker·Monitor mount의 형제라 자기 처리기로
  같은 op·payload를 보낸다. (UI-q15q가 바꿈: 표의 열과 하위 잡 행)
- 모든 세션 타일의 세션 정체 칩 `.ctl-chip--sref`는 버튼이고 클릭이 전체 세션 ID를
  복사한다. 세션 소유 완료 Discord 알림은 `session_ref` 마지막 항목에서 재개 명령이
  만들어지면 ` · 세션 <provider> <8자>`와 재개 명령 한 줄을 붙이고, 아니면 지금
  메시지다(fail-quiet).
- `.worker-card__head`·`.worker-mini__head`·`.worker-mini__row1`·`.rtile__hd`는 모든
  폭에서 `flex-wrap: wrap`이고, 머리줄 `.ctl-chip`과 대기 배지 `summary`는 말줄임
  없이 `white-space: normal; overflow-wrap: anywhere`다. 열린 배지의 `flex-basis:
  100%`와 레포 배지 12ch 해제는 640px 이하 미디어쿼리에 그대로 둔다.
- 대기 레코드 투영 `projectExternalWait`는 slurm 잡의 관찰 표시 필드(`name`·`anchor`·
  `spawned`)를 더 싣는다(UI-q15q가 바꿈). `EXTERNAL_WAIT_FIELDS`(최상위 키), `/resume`
  fork·fresh와 `/stop`의 서버 동작, 관찰기 주기·hold 예산·admission의 `external_wait`
  거절은 바꾸지 않는다.

############# ADR UI-u6ud-8에서 승계한 조항

레인과 카드 조립

- 레인 조립은 순수 함수 `buildLanes(workspaces, workspaces_state, options)` 하나다. 입력
  단위는 언제나 워크스페이스 항목 N개이고 Worker 탭은 자기 store를 어댑터로 그 모양에
  접어 넣는다. Worker 전용 모델 빌더는 없다.
- 카드 렌더러는 두 탭이 공유한다. 줄 순서와 새 요소의 자리는 그 요소가 답하는 질문으로
  카드 헤더 문법 스펙의 슬롯 표가 정한다 — 그 표의 현재 값은 2026-08-25 스펙 §2·§5.1의
  `정정(UI-ri8n)` 문단까지다.
- 재료가 없는 줄은 그리지 않는다. 조작은 첫 줄 오른쪽 끝이거나 액션 foot이고 그 사이에
  칩을 끼우지 않는다. 슬롯 표에 없는 요소는 스펙을 먼저 갱신한 뒤 단다.

후보 레인

- 후보 레인은 미착수 이슈의 관측 집합이고 실행 안전은 서버 admission이 지킨다.
  `runnable-cache`의 채택 조건은 `bead_id` 있음, `status`가 `open`, phase child 아님,
  그리고 **`external_wait` 키가 없음** 넷이다 — 키가 있는 `open` 행은 후보 버킷이 아니라
  `session_active` 버킷이다(위 결정). 외부 대기 Bead는 세션이 일하고 결과를 기다리는
  착수된 Bead이므로 미착수 관측 집합이라는 정의와 맞는다.
- 자격 조건은 사실(`admitted`·`spec_state`·`has_description`·`awaiting_user`·
  `worker_ineligible`)로 실리고 `admitted`는 그 사실을 접은 결과다.
- 좁히기는 읽는 쪽이 한다. `runnableFor`/`runnablePeek`의 `include_unadmitted` 기본값은
  `false`이고 `true`는 모니터 투영과 `laneCountsFor`만 넘긴다.
- 모집단은 세그먼트 `전체`/`착수 가능`/`준비 필요`와 슬롯 4a 판정 칩이 갈라 보이고,
  판정 입력은 `queue_placeable` 하나여서 세그먼트와 `↴ 대기로` 버튼이 같은 답을 낸다.
- 큐 진입 자격은 서버 `checkWorkerQueueAdmission()`이 판정하고, `runnable-cache`는 표시
  전용 사전필터이며 스케줄러 dispatch 경로는 이 캐시를 읽지 않는다(`bd ready`가 원천).
- 두 원천의 후보 행은 같은 사실 키 집합 `CandidateFacts`(`app/views/worker/placement.js`가
  typedef 소유: `route`·`spec_state`·`has_description`·`awaiting_user`·
  `awaiting_user_reason`·`release_info`·`dependents_info`·`exec_pins`·`worker_ineligible`·
  `session_preferred_reason`·`spec_after_blocker`)를 싣는다. 어댑터 행은
  `observation: true`만 더하고 판정 필드를 싣지 않는다.
- 자격 판정은 `lane-model`의 `placementFromFacts(facts, null)` 한 경로가 두 원천에 같이
  내린다. 사실 키가 없는 구 서버 행만 허용 폴백(`eligible: true`)이다.
- 배치 불가 사유는 슬롯 4a 준비도 칩(`라우팅 필요`/`본문 필요`/`스펙 충돌`/
  `스펙 미발행`, title = `placementTitle` 문장) 하나가 말한다. `.worker-card__reason`
  줄에는 배치 판정이 서지 않고 관측(⛔ 거절, 사용자 결정 대기 사유, ID 없는 blocked)만
  남는다.
- `♻ 재리뷰 필요`는 구조화 키 `rereview_required: true`로 실리고 슬롯 1 상태 배지다.
- 실행 설정 칩은 `execChipsFor(state, exec_pins, route)` 한 빌더가 후보·대기 행에
  유효값 칩을 만들고 핀에서 온 축만 `pinned`로 표시한다. 완료 행은 마지막 구현 attempt
  기록을 유지한다.
- 숨김 개수 산식은 `per_control` 하나다. 어댑터의 `location` 판정은 후보 제외에만 쓰고
  카드 사유로 쓰지 않는다.

단일 이슈 면

- 워커 탭이 저장소의 단일 이슈 면이다. Board 탭·Board 구독·`state.board`는 없고, 라우터
  기본 뷰와 알 수 없는 해시는 `worker`이며, 레거시 해시(`#/board`·`#/board?issue=<id>`·
  `#/issue/<id>`·`#/issues`·`#/epics`)는 `#/worker` 또는 `#/worker?issue=<id>`로
  정규화한다. nav의 저장소 탭 묶음에는 `Worker` 하나다.
- deferred 이슈는 후보 레인 아래 접힌 `보류 <N>` 선반에 `candidateCard`의
  `variant: 'deferred'`로 그리고 `[↴ 대기로]`·준비도 칩·자격 판정이 없다.
- `+ 새 이슈`는 워커 툴바 버튼이다. 완료 레인 기간은 `오늘`·`7일`·`30일`·`전체`이고 완료
  레인은 Worker 완료 행과 `closed-issues` 구독의 합집합이며, 세션 완료 보고서가 확인된
  행만 세션 배지를 얻는다.
- 우선순위·타입·라벨 필터는 `worker-filter` 줄의 세 축으로 모든 레인에 적용되고
  후보·보류는 숨기며 대기·실행 중·PR 대기·완료는 흐린다.
- 드래그로 상태 변경과 카드 키보드 탐색은 없다(상태 변경은 이슈 상세의 상태 드롭다운).
  `ui-order`(`subscribe-ui-order`·`unsubscribe-ui-order`·`ui-order-set`·
  `ui-order-snapshot`)와 그 서버 저장소는 없다.
- 공유 코드는 `app/views/stepper.js`와 `app/views/exec-format.js`에 둔다.

############# ADR UI-u6ud-7에서 승계한 조항

대기 어휘

- Worker는 사람 결정이 필요한 곳에서만 멈춘다.
- 대기 어휘는 넷이다: `선행 대기 ⛓`(`prerequisite`·`prerequisite_foreign`; 선행의
  상태·라벨과 무관하게 늘 `normal` — 변경, UI-9w5l), `공급자 보류 ⏳`
  (`provider_hold`), `재시도 대기 ↻`(`retry_wait`; 예약 + `grace_ms` 경과면 `overdue`),
  `확인 필요 ⏸`(`awaiting_user`와 `recovery`; verdict는 위 결정의 대화 레코드 표가 정한다 —
  UI-nuwy가 뒤집음: 살아 있는 대화의 턴 종료는 답 대기 `action_required`, 대화 중·기동 중만
  `normal`).
  `external_job` 행은 나란히 선다.
- 판정은 `normal`·`overdue`·`action_required`이고 `overdue`는 다음 확인 시각이 있는
  종류(공급자 보류·재시도 대기·외부 작업)에만 난다. 대표 사유 순서는
  `awaiting_user`/`recovery` > `provider_hold` > `prerequisite_foreign` > `prerequisite` >
  `retry_wait`다.
- `확인 필요` 카드 본문(슬롯 3)은 세션이 남긴 문장 한 줄이다. `조건 대기`·`확인 대기`·
  `반영 대기`·`처분 대기`·`정지`·`환경 보류` 라벨, `stale_work`·`base_moved`·`queue_hold`
  종류, verdict `disposition`·`hold`·`recovery_confirm`·`settle_overdue`(recovery)는 없다.
- `막힘 N`은 이슈 단위 사유가 하나라도 있는 원래 이슈 수이고 새 대기 종류는 어휘 표에
  행을 더한다. 화면 대표는 "무엇을 기다리나"가 정하고, attempt의 생사와 레인 점유가
  대표를 정한다. `복귀 대기` 배지는 없다.

복구 계약 소비

- 복구 계약은 핀된 사본 `generated/contracts/work-recovery-policy.json`으로 소비하고
  provenance로 검증하며 `supported:false`면 새 자동 동작을 보류한다. disposition·wait
  reason·분류 키는 계약이 정의하고, 이 저장소는 분류 순서(`unclassified`를 주는 키를
  정책 조회 뒤 env 티어로 보내는 것)만 정한다.
- 세션이 선언한 대기 줄은 계약의 `result_line_reasons` 명시 목록(schema 2)만 허용하고 대기 의도일 뿐
  승인·종료·효과·재개 자격을 입증하지 않는다. `BDUI_WORK_RECOVERY_SCHEMA=1`과 preamble
  결과 줄은 검증된 구현·quick_fix 세션에만 전달된다.
- 실제 usage-limit는 구조화 증거로만 보류가 된다. 자동 fatal 목록은 비어 있으며 모델의
  실패 주장·retry 소진·PR 부재만으로 최종 실패를 만들지 않는다.
- 재개 fence는 복구 대기를 실패 행과 같이 막아 새 attempt를 자동 디스패치하지 않고,
  재개는 기록된 runner·model·effort·speed·세션을 보존하며, 같은 계보의 같은 원인 반복은
  `no_progress`로 승격한다.

미분류 실패

- 정책 키 `finished_without_result_line`·`past_failure_line`·`environment_line`·
  `unknown_error`로 `unclassified`가 되는 종료와 `session_failed:turn_failed`는 `env`
  티어다(env 패턴이 맞으면 그 그룹, 아니면 `unknown`).
- 재시도는 이 호스트에 실패 attempt의 세션 기록이 있으면 같은 세션·러너·모델·effort·
  계정을 `resume`하고, 없으면 같은 실행 설정을 승계한 새 `dispatch`다.
- 사다리(칸 길이는 서버 전역 타이밍 설정 `env_retry_delays_seconds`, 기본 2·5·15분; 횟수는 `RETRY_MAX`, 현재 3회)를 다 쓰면 attempt는 `failed`, 카드는 실패 타일(`↻`·`폐기`),
  `❌ 실패` 알림 1회, Bead는 `open`이다. `transient_retry_exhausted → wait`는 없고 예산은
  리셋되지 않으며 사람의 `↻`는 같은 계보의 수동 재개다. 저장된 `waiting/unclassified`
  기록은 로드 시 `failed`(`retry.migrated:'unclassified_wait'`)로 이행하고 알림·자동
  재개는 없다.

파킹과 복구 대기의 출구

- `parked`는 verdict `success` ∧ bead status ∉ {resolved, closed} ∧ `pr_url` 없음 ∧
  `awaiting_user` 키 존재일 때 `status='parked'`, `cause='session_parked'`이고 실패가
  아니므로 큐는 계속 간다. Worker는 스스로 새 attempt를 만들지 않는다.
- 모든 파킹(`awaiting_user` 문자열이 계약 어휘 안이든 밖이든)은 기록 직후 같은 세션
  대화를 기동한다(UI-nuwy가 뒤집음: fork 문의 세션과 값별 프롬프트 4종 대신 attempt 세션의
  fork 없는 재개와 dotfiles 진입 블록 하나, 바이트 사본은 다이제스트로 고정).
- 파킹 타일의 출구는 `[세션에서 해결]`·`[워커로 이어가기]`(위 결정의 조건)·`[폐기]`다.
  `[세션에서 해결]`은 살아 있는 문의·해결 세션이 없을 때만 서고 같은 세션을 대화형으로 열며
  자동 기동 게이트(`worker_direction_inquiry.enabled`)를 읽지 않는다. 서버 `already_running`
  응답은 오래된 스냅샷·타임라인 클릭의 방어로 남는다.
- 새 attempt `[재시도]` 버튼은 없다.
- 해제 전이 자동 재디스패치는 stale 두 값에만 걸리고 후보 판정은 파킹 레코드의
  `cause_detail.awaiting_user`로 한다. `impl_review_conflict:design`은 PR 관측
  (`resolved` + `pr_url`)으로만 정산하고, 어휘 밖 값의 정산은 그 값을 정의하는 계약이
  소유한다. stale 경로의 attempt당 1회 fence(`parked_resumed_at`)를 둔다. 살아 있는 대화나
  인계 예약이 있는 동안 해제 전이 재디스패치는 보류한다(UI-nuwy).
- 세션이 선언한 복구 대기(결과 줄 `대기 · recovery:<reason>`의 `authority`·`no_progress`·`credential`(변경, UI-c74x),
  옛 기록의 `verification`·`reconcile`·세션이 선언한 `unclassified`·`blocks` 목록이 빈
  `prerequisite`)는 술어 `isSessionStalledRecovery` 하나로 판정하고, `waiting` 기록 직후
  파킹과 같은 게이트(`worker_direction_inquiry.enabled`·tmux·Bead당 1개)로 같은 세션 대화를
  띄운다(UI-nuwy가 뒤집음: fork 문의 세션과 `recovery` 프롬프트 대신 진입 블록 하나).
- 복구 대기 카드 조작은 `[세션에서 해결]`(살아 있는 문의·해결 세션이 없을 때)·
  `[워커로 이어가기]`(위 결정의 조건)·`폐기`이고 `↻ 이어하기`는 없다. 알림은 위 결정의 네
  종류(변경, UI-5chz: `❓ 답 대기`가 빠진 세 종류)이고 `waitActionRequired`의 `⚠ … 지연`은 이 대상에 보내지 않는다(UI-nuwy가 뒤집음; 변경, UI-9w5l: `⚠ … 지연` 알림 자체가 없다).
  `provider`는 공급자 보류 경로(변경, UI-c74x: 세션이 선언한 `credential`은 위 대화 대상이다), `blocks` 목록이 있는 `prerequisite`는 선행
  대기다.

base_moved와 재개 종류

- `base_moved`는 기록 직후 서버 전역 타이밍 설정 `base_moved_retry_seconds`(기본 2분)만큼 뒤 같은 세션을
  자동 재개하고(방아쇠만 자동, 미분류 실패 사다리와 독립), 같은 계보에서 반복 상한(현재 세 번)에 이르면 `확인 필요`(`reason: no_progress`, `base가 반복 이동함 ·
  후보 <sha7>`)이다.
- 재개 종류는 `resumeKindOf(quickfix_landing)`이 사유 문자열로 정하고 `session` 목록에
  `base_moved`가 있다. 기계 정산은 같은 attempt의 착지 후 단계 재실행이며 버튼은
  `↻ 정리 재시도`, 세션 실행은 `↻ 이어하기`다. `settlement`의 세션 참조 면제와
  `bd_read_failed` 기록, 폐기의 `parent_reset` 파괴성 경계를 둔다.

잔재 처분

- 디스패치의 `disposeStaleResidue`가 검증된 잔재 identity(`identity`·`state`·`cause`·
  capability 플래그)로 순서대로 처분한다: `can_resume` → 같은 세션 `resume`;
  `can_continue` → 잔재 워크트리·브랜치로 새 attempt `dispatch`(커밋 보존);
  `can_backup_fresh` → `backupFreshResidue(identity)`로 `discard-backups`에 보관 뒤 같은
  tick에서 새 attempt(백업이 `identity_changed`면 재관측 뒤 재판정); 그 밖은 재관측 1회
  뒤 `failed`·`stale_work_unresolved`.
- 다른 소유자의 PR·원격 브랜치가 확인된 잔재는 `preserve:true`로 재관측해 자동 정리하지
  않는다. timeline `stale_work_auto`만 남기고 알림은 없다. WS op `worker-stale-work-*`,
  admission `worktree_stale_work`는 없고 로드 시 남은 admission은 지운다.
- 선행 대기 attempt(`status === 'waiting' && cause === 'prerequisite_unmet'`)는
  `resumableResidueAttempts`의 잔재 재개 후보다. 복귀 트리거·재스캔 후보·`bd ready`
  판정·클레임은 그대로이고 재개 여부는 preflight의 잔재 처분 사다리가 고른다.
- 선행 대기 후보는 `unique` 잔재(dirty 또는 고유 커밋)에만 매칭되고 `preserve`를 켜지
  않는다. 버릴 수 있는 잔재와 worktree 없음은 보통 dispatch다.
- `judgePrerequisiteWait`는 owned worktree의 HEAD를 attempt `head_oid`로 기록한다. 관측
  실패·브랜치 불일치는 아무것도 쓰지 않는다.
- `resume()`는 선행 대기를 `preclaimed` 경로에서만 받고 사람 클릭 `[이어하기]` 경로는
  열리지 않는다. 프롬프트는 `prerequisite_return` 서두 + 기존 ancestor 사실 +
  `## 선행 완료` 블록(닫힌 선행의 `status`·`closed_at`·`close_reason` readback, "선행
  완료는 구현 완료가 아니다")이다.
- 선행 대기 후보의 기동 전 판정 거절(`not_failed`·`prior_session_unavailable`·
  `transcript_missing`·`worktree_missing`·`runner_mismatch`·`continuation_decision_stale`·
  `already_resumed`·`no_progress`)은 같은 pass에서 `continue`·`backup_fresh`로 이어지고
  타임라인 cause는 `resume_refused:<reason>`이다. 기동·상태 오류만 `stale_work_unresolved`다.
- 선행 대기 재개에 예약 레코드·재시작 정산·새 status/cause 어휘·카드 조작은 없고, 재개
  attempt는 `resumed_from` 계보·`launch_kind: resume`으로 선다.

외부 작업 대기

- 외부 작업 대기는 소비자 Bead 자신의 `external_wait` 상태이고, Worker 한 런타임이
  관찰·완료·알림·재개를 소유하며, hold 예산 판정과 `대기 · external:<wait_id>` 종결,
  보존 세션의 fork 재개를 둔다. Worker 소유는 자동 fork이고 세션 소유는 알림 뒤 사람의
  출구 — 세션 칩 복사로 자기 세션에서 잇거나 `[워커로 이어가기]` — 이며 fork 자격
  실패는 launch 없이 사람의 `[새 세션으로]`다(동작은 UI-z437 그대로, 라벨만 바뀐다).
  소비자 카드 표면은 위 결정(외부 대기 타일과 카드)이 정한다.
- 이벤트 구독 복귀·admission 진단 기록·재스캔 후보(`external_job` 제외)·foreign 트리거
  매칭을 따른다.
- 자동 진행 꺼짐은 무표시이고 `manual_only`·`[지금 시작]` 게이트 조건·직렬 레인 선두
  규칙·연결 레인 폐기를 따른다. `waiting`은 기계 사실 대기이고 `external_wait` 외 새
  상태는 만들지 않으며 `prerequisite_unmet`은 증명으로만 선다.

레인 퇴장

- bd `closed` 또는 `deferred` Bead는 병렬 `queue`와 모든 직렬 레인의 대기 행에서
  자동으로 물러난다. `closed`는 `done`으로 이동하고, `deferred`는 제거하며 그 Bead의
  비종료 계보가 잡은 직렬 레인 연결도 푼다. `resolved`는 대상이 아니고 `pr_wait`·`done`은
  순회하지 않는다. poller sweep과 tick 안 admission 처분은 같은 헬퍼로 판정한다.
- leaf `paused` attempt는 그 Bead의 bd 종료가 우선한다. ■ 정지의 paused 분기와 같은
  순서(leaf 가드 → 종료 약속 대기 → 기준 이동 관측 → `stopped` 기록 → 보호 훅 해제 →
  잔재 정리)로 처분하고 `stopped`에 `cause: bead_closed | bead_deferred`를 싣는다. 처분
  뒤 bd 상태를 다시 읽어 여전히 `closed`/`deferred`일 때만 레인을 변이한다.
- 워크트리는 버릴 수 있을 때만 지우고(`removeIfDiscardable`) 미반영 변경이 있으면
  보존한다.
- 제거 사실은 Bead 타임라인 `queue_removed` 한 줄로 남긴다. 다시 `open`이 돼도 자동
  재배치는 없다 — 배치는 사람·세션의 명시적 place다.
- dispatch·lane fence의 활성 집합은 paused를 포함하고, sweep만 옵션으로 leaf paused를
  제외한다.

레인과 provider 보존

- 실행 레인은 매 launch에서 현재 route로만 유도한다. `app/utils/quickfix-lane.js`의
  `laneOfRoute(route)` 하나가 소유하고 서버·클라이언트가 같은 사본을 읽는다. `quick_fix`만
  `quick_fix`, 그 외는 `pr`다. 레인은 relaunch 상속 목록에 들어가지 않는다.
- 기록된 레인(`prior.quickfix_lane`)과 현재 레인이 다르면 모든 재개·relaunch 경로(수동
  이어하기, `base_moved` 보존 후보, 공급자 자동 재개, 지시 재시작, 머지 큐 충돌 해소,
  REVISE 처분)는 세션을 띄우지 않고 `route_changed`로 거절한다. 판정은
  `laneMismatchOf(prior, bead_snapshot)`가 진입 경로와 launch 직전 두 곳에서 하고
  admission보다 먼저 거절한다.
- 거절은 실행 상태를 바꾸지 않고 이전 attempt의 진단 필드
  `resume_refused='route_changed:<prior_lane>→<current_route>'`와 공급자 자동 재개의
  `auto_resume_refused`만 쓴다. Bead metadata는 읽기 입력이다.
- 사유 기반 정산 재실행(`[정리 재시도]`, `resumeKindOf === 'settlement'`)만 기록된
  레인으로 완료한다.
- `route_changed` 복구는 기존 조작([폐기] 뒤 재배치 또는 [지금 시작])이고 세션 승계·자동
  재진입·승인 키 위조는 없다. 표현은 기존 슬롯(응답 `reason='route_changed'`·
  `route_change`, 토스트, 실패 타일 안내 줄 `RESUME_REFUSALS`)이고 새 슬롯·배지·버튼·
  타임라인 이벤트는 없다.
- 세션 참조는 provider와 함께 전달되고, 유효한 로컬 원본 세션이 있으면 기록된 provider와
  ID로 resume 또는 fork한다. 현재 기본 provider가 달라도 유지한다.
- transcript가 없거나 쓸 수 없으면 fresh fallback을 원본 provider 안에서 수행하고 이유를
  기록한다. 원본 자체가 없을 때만 현재 실행 설정으로 fresh를 시작한다.
- provider 변경은 사용자의 명시적 선택(`fresh_current`·`exec_override`·decision token)으로만
  일어나고, 도구 오류·기록 누락·알 수 없는 runner로 Claude↔Codex를 자동 전환하지 않는다.
  실행 파일 부재는 `launch_failed:<runner>_not_found`다.
- `continuation_choice='prior_attempt'` 자식은 same-provider fresh fallback 없이 기록된
  세션의 엄격한 재개만 허용한다.
- provider 보존은 실행 위치 선택이며 승인·review 권한을 부여하지 않는다.

############ 대안과 기각 사유

- **fork 문의 세션이 끝까지 가는 현행.** 가드·관측이 없고 문의 금지 때문에 끝내지 못한다
  (`beads-sw1` 실측).
- **fork 수리 뒤 fork 세션을 Worker가 재개.** fork 세션 ID 포착이 pane 옵션에 기대어 취약하고
  결정 맥락이 원래 세션과 갈린다.
- **대화 단계 판정을 턴 단계(pane 옵션)로만 한다.** 산문 질문이 `idle`로 읽혀 `normal`이 되고,
  관측 사이에 끝난 턴의 결과 줄을 놓친다 — 메시지 단위 처리로 대신한다.

UI-ri8n에서 승계한 대안:

- **대기 배지를 숨기고 문의 배지만 남긴다.** 카드는 단순하지만 attempt가 멈춰 있다는 사실과
  `막힘 N` 요약이 어긋난다.
- **버튼을 남기고 `already_running` 토스트만 고친다.** 코드 변경이 가장 적지만 이미 열린
  창을 다시 가리키는 조작이 남아 실측에서 사용자가 두 번 헤맸다.
- **클라이언트가 transcript 서랍 구독으로 진행을 파생한다.** 카드마다 구독을 열어야 하고
  판정(배지)이 서버와 클라이언트로 갈린다.
- **브리지 스풀·manifest에서 마지막 메시지를 읽는다.** 스풀은 Discord ack 뒤 삭제되고
  manifest에는 메시지가 없다.

UI-l48z에서 승계한 대안:


- **클라이언트가 대기 레코드만으로 타일을 만든다.** 제목·라벨·`session_refs`를 다른
  경로에서 끌어와야 하고 Worker 탭(Board live store)과 Monitor 탭(runnable-cache)의 후보
  원천이 달라 조립 규칙이 둘이 된다 — 승계한 "lane-model 한 경로" 조항과 어긋난다.
- **후보 레인 안에 "외부 대기" 구획을 둔다.** `↴ 대기로`가 뜻 없는 카드가 후보 집합에
  남고 Worker 소유 대기와 자리가 갈린다.
- **머리줄 유지 + 줄바꿈만.** 조작 셋이 다음 줄로 내려가 제목 위에 뜬다 — 조작 묶음이
  자기 줄 오른쪽 끝에 남는 규칙과 어긋난다.
- **카드에 `⧉ 재개 명령` 버튼을 더한다.** 조작이 하나 늘고 세션 칩 복사와 Discord 명령
  줄로 같은 일이 된다.

########## ADR UI-18a5-2에서 승계하는 조항

이력 기록

- Worker의 실행·실패 이력 SoT는 bead마다 하나인 append-only `events.jsonl` 타임라인이다. 쓰기는 Worker 서버 프로세스 하나가 소유하고, 각 이벤트는 생산자가 안정적으로 구성한 `event_id`를 가져 읽는 쪽이 멱등 처리한다.
- `queue.json`은 살아 있는 attempt와 미처리 상태만 보유한다. 처리가 끝난 terminal attempt는 terminal 이벤트 기록 뒤 bead 디렉터리의 attempt 레코드로 이관한다. 상태 파일에 과거 attempt가 없는 것은 정상이다.
- 실패마다 한 줄 `summary`를 한 번 추출해 타임라인 이벤트와 attempt 레코드 양쪽에 싣는다. 세션 원문 로그는 bead 디렉터리로 옮겨 보존 정책을 받고, 닫힌 bead의 원문 로그는 압축·삭제할 수 있지만 `events.jsonl`은 영구 보존한다.
- 살아 있는 `queue.attempts`는 각 bead 전체 이력의 최신 접미다. 한 attempt는 처리 완료 terminal이고 직렬 레인을 점유하지 않을 때 이관 가능하며, 같은 bead의 더 오래된(`q.attempts` 삽입 순서) attempt가 모두 같은 pass에서 이관 가능할 때만 큐를 떠난다.
- reader는 라이브 큐만 보고 이관된 파일과의 합집합 조회를 쓰지 않는다.

생존 소유

- `isSchedulerOwned`는 lifecycle 소유 predicate다. `kind ∈ {implementation, review_session}`이면 참이고 `retired_kind`와 미지의 kind는 거짓이다.
- 살아 있는가(pid probe), 슬롯을 점유하는가, 죽었을 때 정산을 시작하는가는 scheduler(`reconcile`·`occupiedBeadIds`)가 소유한다. 죽은 세션의 결과(영수증이 current인가, claim이 어느 head에 exhausted인가)는 큐(`review-session.js complete()` → `settleReviewSession`)가 소유한다. (변경, UI-lbm5) 세션 레인 attempt(`exec: 'session'`)의 생존은 pid가 아니라 마커 pane 관측이고, 그 attempt는 슬롯을 점유한다.
- `reconcile`의 후보 선별(`running`/`settling`/`claimed` fence와 pid + start time 기반 `isDeadAttempt`)은 두 kind에 같고 처분만 kind로 가른다. 죽은 `review_session`은 로그를 EOF까지 drain해 usage·guard 증거를 확정한 뒤 `exit: null` verdict로 `complete()`를 호출한다. (변경, UI-lbm5) `isDeadAttempt`는 세션 레인 attempt를 마커 pane 관측으로 판정한다(관측 성공 pass에서 pane 없음만 죽음).
- 자동 리뷰 전용 동시성 한도는 없다. 부팅 복구(`recoverReviewSessions`)는 살아 있거나 probe가 `unknown`인 기록을 그대로 두고 reconcile에 맡긴다.
- beads-ui가 띄운 대화형 세션(문의·해결·외부 재개, claude·codex)은 큐 스냅샷의 durable 레코드 `interactive_sessions[<bead_id>:<kind>]`로 투영되고 슬롯을 점유하지 않는다. (변경, UI-jbl1) Bead 없는 저장소 작업 행(수동 배포 실패)의 해결 레코드 키는 `repo-op:<operation_id>:resolve`이고, 그 레코드는 Bead 상태를 읽지 않고 결과 줄과 세션 종료로 정산한다. 기동 직후 런처가 레코드를 쓰고 클라이언트 CAS op는 없다. (변경, UI-lbm5) 세션 레인 창은 이 레코드 kind로도 투영되지만 Worker attempt라 슬롯을 점유한다.
- 대화형 세션의 생존·복구·종료는 scheduler reconcile이 소유한다. pane 마커·pane id로 생존을 판정하고, 레코드 없는 마커 pane은 복구 레코드로 재구성하며, tmux에 닿지 못하면 그 pass는 아무것도 판정하지 않는다.
- 해결(resolve) 세션의 fork 원천은 `qualifyInteractiveForkSource` 하나가 정하고 순서는 최신 implementation attempt의 러너 세션(transcript가 local일 때) → bd `session_ref` 마지막 항목 → fresh다. (변경, UI-jbl1) fresh 기동의 런타임은 공용 대화 설정이 정하고 "원래 세션 따름"일 때만 기록된 provider를 보존한다. 저장소 작업 행은 기록 세션이 없으므로 항상 fresh이고 cwd는 저장소 루트다.
- 문의(대화) 세션의 원천은 fork가 아니라 attempt 러너 세션의 fork 없는 재개다. 자격은 `qualifyAttemptSession`(러너·세션 ID·로컬 transcript)과 워크트리 존재가 정하고, 자격이 없으면 fresh(변경, UI-jbl1: 런타임은 공용 대화 설정, "원래 세션 따름"이면 같은 provider)에 `fallback_reason`을 남긴다. 한 세션 ID에는 프로세스 하나다 — 러너가 살아 있으면 기동하지 않고 Worker 재개는 창 소멸 확인 뒤에만 한다.
- 세 종류(문의·해결·외부 재개)의 레코드 모두 `conversation`(대화 사유 표기·처리한 메시지 식별자·발췌·결과·`handoff` 예약·인수 알림 시각)을 갖는다(UI-18a5가 넓힘). 해결 레코드의 `handoff` 예약은 실패 행의 대상 식별과 실행 시작 시각을, 외부 재개 레코드는 `wait_id`를 함께 싣는다.
- 대화형 세션의 정산은 전이 시점의 write(머지 뒤 `done` 이동, 일반 폐기 완료, 이슈 스냅샷의 `closed` 관측)다. 정산된 세션은 idle일 때만 닫는다 — claude는 `/exit` 주입 뒤 유예(현재 90초), codex는 `kill-window`; 턴 중·대화상자 대기는 미루되 상한(현재 30분) 뒤 `kill-window`. 스레드 아카이브는 브리지 소유다.
- 세 종류 모두 정산 write에 `인계`와 `보류`가 더해진다(UI-18a5가 넓힘): `인계`(또는 `[워커로 이어가기]`)는 `handoff` 예약을 쓰고 창을 닫으며, 소멸을 확인한 pass가 그 행의 Worker 출구 하나(문의는 같은 세션 재개, 해결은 정리 재시도·폐기 재시도·머지 큐 재등록·저장소 작업 1회 재실행(변경, UI-jbl1), 외부 재개는 Worker attempt dispatch)를 실행한 뒤에야 레코드를 지운다; `보류`는 창을 닫는다; `인수`는 창을 두고 기존 정산(`bd_closed`·`done`·폐기)을 기다린다. 문의 대화의 끝은 attempt `cause_detail.conversation`(`pane_gone`·`hold`·`handoff`·`takeover`, 거절 사유)로 남고, 해결·외부 재개의 실행 전 거절은 카드와 타임라인에 남는다. `conversation` 없는 옛 레코드는 옛 규칙으로 정산한다.
- 끝난 대화형 세션의 레코드는 지우고 타임라인 `interactive_session` 이벤트만 남긴다.

in_progress 선점

- Worker는 구현 attempt의 dispatch 경로에서만, `prerecordAttempt` 성공 뒤 직전에 읽은 status가 정확히 `open`일 때 `bd update <id> --status in_progress`를 1회 쓰고 readback한다. `open`이 아니거나 bd 오류면 쓰지 않고 dispatch는 계속된다.
- Worker는 `session_ref`를 쓰지 않는다.
- `resolved` Bead를 다루는 경로(`dispatchExternalConflict`, `relaunchResolvedAttempt`)와 재개·처분·리뷰·stale-work 이어하기 경로에는 선점을 넣지 않는다.
- 선점은 attempt 기록에 `worker_claim: pending → written → released`로 남긴다.
- 해제는 기존 종료 경로(`releaseBeadClaim`)와 `reconcile` 정산이 한다. `worker_claim=written`인 채 terminal이 된 attempt(같은 Bead의 살아 있는 attempt 없음·`pr_url` 없음·Bead가 여전히 `in_progress`)는 정산에서 `open`으로 되돌리고 `released`를 기록한다. 기록 없는 Bead를 스캔하는 별도 재조정은 없다.
- readiness 술어(route·spec_review·impl_entry·의존성)는 status와 무관하게 판정한다.

########## ADR UI-18a5-3에서 승계하는 조항

영수증 신선도

- `impl_review` 영수증 SHA가 관측된 head와 같거나 그 조상이면(`git merge-base --is-ancestor`) 유효하다. 조상이 아니면 계보가 끊긴 stale 영수증이다. 큐가 만든 `resolver:` 커밋에도 이 규칙 하나를 예외 없이 적용한다. head 이동만으로 재리뷰하지 않는다.
- ancestry probe가 실패하면 머지 게이트는 fail-closed로 보류하고 보드 표시는 fail-quiet로 `unknown`을 보인다.
- 리뷰 뒤 push된 델타를 사람이 다시 읽지 않을 수 있는 잔여 위험은 수용하고, ancestry가 통과시킨 조합의 의미 충돌은 `[verify]` 영수증이 검사한다.

영수증 보류와 자동 리뷰 dispatch

- 영수증 부재·stale·invalid·undetermined(`review_receipt_missing`·`stale`·`invalid`·`undetermined`)는 terminal이 아니라 merge-gate hold다. 머지는 계속 큐가 소유한다.
- 보류에서 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch한다. 판정 자리는 게이트가 보류 사유를 낸 그 턴(`merge-queue.js` `holdEntry`)이고 매 `kick()`이 재판정하므로 별도 감시자·타이머는 없다.
- 주체는 lineage다. 행의 durable claim `review_dispatch={head_sha, attempt_id, state, at}`을 자동 dispatch와 클릭이 함께 쓴다.
- claim 뒤의 dispatch 실패는 원인 구분 없이 `exhausted`이고 보류는 유지되며 자동으로 다시 뜨지 않는다. `exhausted` head의 출구는 `[리뷰 후 머지]` 하나이고 그 클릭은 같은 lineage의 resume이다.
- 자동 dispatch는 authority를 부여하거나 source를 바꾸지 않는다. authority 없는 행의 출구도 버튼이다.
- 자동(enrollment) authority 행에는 머지 큐의 슬롯 fence를 적용하고 수동 authority는 면제다.

위조 3종 terminal

- 보류 분류의 정본은 `server/worker/receipt-check.js`의 `RECEIPT_HOLD_RESOLUTION`이다. `unresolvable`(위조 3종)과 `resolvable`(나머지 3종)은 서로소이고 합집합은 `EXEC_RECEIPT_MERGE_GATE.hold`와 같다.
- `receipt_unbacked:<code>`의 코드가 `unresolvable`이면 대기 없이 terminal needs_human이다. 저장 이유는 `receipt_unresolvable:<code>`, `failure_key.stage`는 `merge_gate`, `evidence`는 위반 detail이다. 게이트의 `receipt_unbacked:<code>` 문자열은 바꾸지 않는다.
- `resolvable`은 `metadata_watch`이고 대기 상한이 없으며, PR 대기 행의 자동 해소 배지를 「영수증 대기 — <code>」로 보인다.
- terminal의 출구는 `[머지]` 재클릭(그 head의 receipt tier를 waive)과 `[세션에서 이어가기]` 둘이다. 그 실패 대화의 `인계`는 아무것도 실행하지 않고 `보류`처럼 끝난다 — waive는 사람 `[머지]`뿐이다. 알림 클래스 「머지 게이트 보류」(dotfiles `failure_classes.receipt_hold.notify_label`의 바이트 복사)와 `next_action` `'[머지] 재클릭 또는 [세션에서 이어가기]'`로 안내한다.
- `receipt_baseline`은 재포착하지 않고 불변식·위조 판정 규칙·hold/badge 표·`[머지]` 클릭의 waive 권한은 바꾸지 않는다.

verify 보류

- 머지 전 verify 실패는 completion intent의 비종단 phase `holding`이 소유하는 보이는 보류(`verify_hold`)다. 등록 자격은 「verify 영수증이 있고 실패했다」다. 보류 중인 행은 `merge_queue`에서 빠지고 뒤의 PR이 선두에 오른다.
- `verify_cmd_failed`는 재평가 없이 곧바로 `verify_hold`다. 배지 `검증 실패 — 수정 push 대기`, 출구 `[세션에서 이어가기]`, 수정 push가 자동 해제하며, Discord는 「머지 전 검증 실패」를 head당 1회 쓴다. 실패 키 stage는 `verify`, reason은 `verify_cmd_failed`다. 그 실패 대화의 `인계`는 `[머지]`와 같은 머지 큐 재등록이고 현재 head에서 검증이 다시 돈다.
- `verify_cmd_spawn_error`·`verify_cmd_timeout`(환경 증거가 있는 경우)은 `auto_resolution`(`class:'retry'`)으로 정해진 지연(현재 5분) 뒤 한 번 재평가하고, 다시 같은 코드면 같은 `verify_hold`에 사유 코드를 싣고 배지만 `검증 명령 실패 — 환경 확인`이다.
- terminal `needs_human('verify_red')`와 그 systemic 판정은 없다.
- 알림 이력의 단위는 head다. 타임라인 `merge_step hold:<head_sha>`, Bead 댓글 `## 🤖 완료 보류 기록`, Discord 「머지 보류」가 head당 한 번이고 재관측·재시작은 침묵이다. `[머지]` 재클릭은 무해하다.
- PR 대기 행의 `[세션에서 이어가기]` 재료는 다섯(머지 후 정리 실패·needs_human·폐기 실패·holding·`foreign_handoff`(변경, UI-k467))이고, 그 유무는 카드와 같은 `tileResolveFields`가 정한다. 첫 입력은 dotfiles 진입 블록(실패 대화 사유)이며 보류형 의미 — 수정 push가 보류를 푼다 — 는 유지한다. 투영은 `phase === 'holding'`일 때만 `hold`를 싣고 같은 head의 terminal 증거가 우선한다. 알림 라벨은 dotfiles 계약의 바이트 복사다.

머지 후 정리와 자동 인계

- (변경, UI-gske) 완료 의도가 정리를 몰고 있지 않을 때 기록된 `cleanup_failed`는 기록마다 「🙋 확인 필요 · 정리 중단」 알림과 실패 대화 자동 기동을 한 번 한다(식별 (Bead, step, 기록 시각), 표시를 먼저 쓴다). 완료 의도가 정리를 몰면 완료 종단이 유일한 원천이고, 외부 PR 사람 처리 필요(`foreign_handoff`)의 정리 실패는 그 알림·대화만 낸다. 정리 실패는 계속 Bead 카드의 `cleanup_failed` 행·timeline·Bead 댓글에도 남는다.
- 남는 `needs_human` 알림 클래스는 머지 게이트 보류(위조 3종), 배포 실패(사다리 소진 뒤 terminal), post-merge 잡 실패, 수동 배포 실패, 폐기 실패, 외부 PR 사람 처리 필요(`foreign_handoff`, 변경 UI-k467), 정리 중단(정리 단계 완료 종단과 완료 의도 없는 `cleanup_failed`, 변경 UI-gske)이다. (변경, UI-jbl1) 그 알림 제목은 `🙋 확인 필요 · <클래스>`이고, 공용 스위치가 켜져 있으면 실패당 한 번 해결 세션을 분리 창에 자동으로 연다.
- 완료 정리의 `expected_head`는 머지 op의 head(`merge_head_sha`)이고, 읽을 수 없는 오래된 intent는 관측 head → subject head 순으로 폴백한다.
- 머지 후 결함의 자동 인계는 원시 operation 보존과 복구 분류, 소유 코드 결함의 단일 자동 증명(`deterministic_owned_script_failure`), operation 원장이 소유하는 단일 예약과 재채택, 일반 workflow 입구인 수정 Bead(`type:bug`·quick_fix handoff 네 절·`quick_fix_review=worker@<digest>`·parallel 배치)로 한다. 수정 PR 생성만으로 원래 작업을 완료시키지 않는다.
- post-merge 잡 원장·`replaces` 승계·CAS 확정을 둔다. 실패 행의 출구는 `[정리 재시도]`(머지 후 정리, 변경 UI-btsr), `[워커로 이어가기]`(폐기 재시도, 옛 폐기 실패 `[재시도]`), `[머지]` 재클릭, `[세션에서 이어가기]`(실패 대화), `[폐기 포기]`다. (변경, UI-k467) 외부 PR 사람 처리 필요 행의 출구는 `[세션에서 이어가기]` 하나다. `[정리 재시도]`와 `[워커로 이어가기]`는 사람 클릭이나 같은 행 실패 대화의 `인계`로 실행되고, 그 인계는 사용자 답의 권한(결과 미상 머지 후 잡 재실행 포함)으로 많아야 한 번 실행한다. 자동 인계는 폐기나 사람 결정을 대신하지 않는다.

##### ADR UI-u6ud-11에서 승계하는 조항

- `get-session-defaults`/`set-session-defaults` 응답의 `values`·`warnings`는 저장소 kv의 저장값과 kv 경고 그대로이고, `values.bdui_url`에는 저장소 예외만 담는다.
- 실제 적용 주소는 별도 `worker_url` 필드로 싣는다. 성공 시 `{ status:'ok', effective_url, source(workspace|common|unset), workspace_override, common{value,state,revision}, warnings }`, 실패 시 `{ status:'unavailable', effective_url:null, source:null, error:{ code } }`다. `helper_unavailable`과 `workspace_unavailable`은 `source:'unset'`과 다른 값이고 UI는 적용값을 추측하지 않는다.
- `kvGetJson`은 성공 결과에 `found`를 더하고, 키가 없는 정상 부재(`found:false`, bd exit 1 포함)만 resolver stdin `{}`로 표현한다. `found:true`인데 값이 비었거나 파싱 경고가 있으면 CLI를 호출하지 않고 `workspace_unavailable`이다.
- SET은 저장값 readback 비교를 먼저 마친 뒤 성공한 `after.raw`로 해석하고, resolver 실패는 이미 성공한 kv 저장을 실패로 위장하지 않는다.
- 공통 주소의 조회와 쓰기는 설치된 dotfiles `worker-url` CLI로만 한다. `server/worker-url.js` 어댑터가 PATH에서 CLI를 찾아 argv와 stdin으로만 호출하고(shell 문자열 없음), 12초 timeout과 유한 출력 한도를 둔다.
- 서버는 설치 source checkout이나 계약 YAML을 런타임에 읽지 않고 공통 파일·kv를 직접 쓰지 않는다.
- 공통 편집 요청 `set-worker-url-common { root_dir?, value: origin|null, expected_revision }`은 CLI `common set --value|--unset --expect-revision`을 한 번 호출하고 kv나 큐를 쓰지 않는다. 빈 문자열은 클라이언트가 `null`로 바꾸고 서버는 `null` 외 삭제 표현을 거절한다. `revision_conflict`는 그대로 전달하고 자동 재시도하지 않는다. 공통 저장 뒤 root 읽기가 실패해도 `{ common_saved:true, common, worker_url:{status:'unavailable'} }`로 분리한다.
- (변경, UI-32oq) 설정 화면은 공통 기본값을 서버 전체 묶음 `운영` 탭에서 상태·resolver 경고와 함께 보이고 편집한다. 저장소 예외 입력은 두지 않는다 — 저장소에 예외가 저장돼 있을 때만 그 저장소의 `저장소` 탭에 읽기 전용 한 줄과 `지우기`를 보인다. 공통 기본값은 별도 draft·baseline·저장 버튼을 갖고 편집 시작 시점 revision을 draft에 결속한다.
- 재조회는 설정 열기·창 focus·명시적 새로고침에서만 하고 파일 watcher나 polling은 없다. 늦게 온 응답은 요청 시점의 root·화면 세대와 다르면 버린다.
- 프리셋 적용·비교 키에 `bdui_url`이나 공통값을 넣지 않는다. 주소 형식 유효성은 서버 연결 성공을 뜻하지 않으며 새 연결 점검 API는 두지 않는다.
- defaults의 키 이름·schema·허용 키·허용값·부재/무효 규칙의 정의자는 dotfiles 계약이다. beads-ui는 어휘를 넓히지 않고 하네스 기본값을 자기 코드로 복제하지 않는다.
- kv 읽기는 fail-quiet(경고와 함께 버림)이고 사용자의 명시적 편집 쓰기는 strict하게 거절한다.
- Worker 주소의 적용값은 kv 저장값과 dotfiles 공통 설정을 dotfiles resolver가 합쳐 정한다.

## Consequences

- 되돌리기 어렵다: 질문 버전이 바뀌어 저장된 쌍 캐시 전체가 다시 채워진다. `server/placement/question.js`·
  `jev-client.js`·`pair-cache.js`·`relations.js`·`wire.js`·`service.js`, wire `prefer`·`prefer_confidence`의 뜻,
  `app/utils/placement/compute.js`의 묶음 안·묶음 사이 순서와 `apply.js` 재계산 일치,
  `app/views/worker/placement.js`·`app/views/monitor/placement-panel.js`의 입력이 함께 움직인다. 한쪽만 되돌리면
  서버가 보낸 선호를 계산이 다르게 읽거나 `[전체 적용]`이 `moved`로 멈춘다.
- 맥락 없이는 놀랍다: 선후 기준을 넓히지 않고 질문을 따로 둔 이유, 채택 기준과 다른 선호 기준, 같은 파일 쌍을
  jev에 묻는 이유, 이미 대기 중인 항목 앞으로 끼우지 않는 이유가 코드만으로는 보이지 않는다.
- 얻는 것: 배치안이 화면 정렬이 아니라 일의 선후 이득과 우선순위를 따른다. 공용 기반을 까는 이슈가 그것을 쓰는
  이슈 앞에 설 가능성이 커진다.
- 감수하는 것: 배포 뒤 모든 쌍을 한 번 다시 묻는 jev 호출, 같은 파일 쌍의 추가 호출. 필수 상한이 있는 단계가 앞
  대기 항목 앞으로 들어가면 그보다 먼저면 좋은 같은 묶음 단계가 뒤에 남을 수 있고, 이때 경고하지 않는다. 측정에서
  상대가 본문에 드러나지 않은 짝의 적중은 낮다(47쌍 중 3).
- 폐기: UI-izba 승계분의 "고정 조건은 둘이고 둘 다 jev에 묻지 않는다" 중 같은 파일 쌍 부분과 "jev 질문
  정의(`placement_pair`)" 하나 — 위 `(변경, UI-unf5)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

아래는 `ADR UI-3713`의 Consequences 승계분이다.

### ADR UI-3713의 결과 (승계)

- 되돌리기 어렵다: 파서(`interactive-progress.js`), 스케줄러 대화 처리·버튼 핸드오프·외부 작업 완료 되돌림
  (`scheduler.js`), `handback_allowed` 레코드 필드(`queue-store.js`)와 대기 판정(`wait-judgment.js`),
  `tileResolveFields`, 알림 제목(`notify.js`), WS `worker-conversation-handoff`의 `attempt_id: null`,
  모니터 카드 동일성 테스트가 함께 움직인다.
- 맥락 없이는 놀랍다: "사람 인수"(이제 `대화에서 마무리`) 뒤에도 카드에 `[워커로 이어가기]`가 다시 선다.
- 얻는 것: 마무리한 사람이 Worker에게 돌려주고 싶을 때 결과 줄 한 줄이나 버튼 하나로 돌아간다. 막다른 행이
  없다.
- 감수하는 것: 마무리한 사람이 클레임하기 전에는 Worker가 행을 가져갈 수 있다. 살아 있는 대화의 `not_open` 거절
  사유는 카드 글이 아니라 클릭 토스트와 타임라인에 남는다(새 슬롯을 만들지 않는다).
- 폐기: 없음 — 바뀐 조항은 모두 `(변경, UI-3713)` 줄로 승계 조항 곁에 표시했다.

아래는 `ADR UI-32oq-2`의 Consequences 승계분이다.

#### ADR UI-32oq-2의 결과 (승계)

- 되돌리기 어렵다: 세 진입점(`app/main.js`), 탭 배열과 대상 상태(`app/views/settings-dialog/index.js`), 일괄
  편집면(`bulk-pane.js`), 저장소 탭(`repo-pane.js`), 칩 바인딩·활성 모델·대화 세션 절의 편집 위치, Worker 주소
  화면(`worker-url-section.js`·`execution-pane.js`), 의도된 차이 표(`docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md`)와
  카드 동일성 테스트가 함께 움직인다.
- 맥락 없이는 놀랍다: 이전 네 ADR은 저장소 하나 창에 서버 전역 값을 섞지 않고 계약이 허용하는 Worker 주소
  예외를 화면에서 편집하게 했다. 이제 저장소 하나 창에서도 서버 전체 탭이 보이고, 예외는 지우기만 된다.
- 얻는 것: 어느 ⚙를 눌러도 같은 자리에서 같은 값을 찾는다. 공통값과 같은 예외가 숨어 남지 않는다.
- 감수하는 것: 진입점별로 좁힌 창을 버린다. 저장소별 Worker 주소 예외가 필요하면 화면이 아니라 dotfiles
  `worker-url` CLI나 kv로 적어야 한다.
- 폐기: UI-rd2m "칩 바인딩 편집은 모니터 일괄 창의 서버 전역 탭에만 있고 … 그 탭만 `적용 대상` 저장소 선택과
  무관하다", UI-gpac-2 "모니터 일괄 창의 서버 전역 탭(`칩`→`전역`) … 두 번째 전역 탭을 만들지 않는다",
  UI-57us(UI-jbl1 승계) "설정 창 일괄 모드 `전역` 탭의 한 섹션", UI-u6ud-11 "적용 주소·저장소 예외·공통
  기본값을 따로 보인다"와 "저장소 예외 입력은 비어 있으면 상속 상태" — 위 `(변경, UI-32oq)` 조항으로 대체했다.
  그 밖에 폐기한 조항은 없다.

아래는 합친 네 ADR의 Consequences 승계분이다.

##### ADR UI-rd2m의 결과 (승계)

- 같은 칩이 이슈 route에 따라 다른 프리셋을 적용한다. 칩 위에는 그 이유가 보이지 않으므로 이 기록이 그 근거다.
- 되돌리려면 `exec-presets.json` 스키마(`quick_fix_chip_bindings`), `impl-preset-bind`·`chip-preset-toggle` 프로토콜, 세 탭(워커·모니터·이슈 상세)의 `chipPresetBinding` 판정, 일괄 창 칩 탭이 함께 움직여야 하고, 이미 칩으로 적용된 quick_fix 이슈에는 칩 키가 남는다.
- 기존 파일은 이행 없이 quick fix 맵이 비어 있는 것으로 읽힌다. 기존 quick_fix 이슈에는 소급 적용하지 않는다.

##### ADR UI-gpac-2의 결과 (승계)

- 워크플로·CLI·기존 프리셋이 꺼 둔 모델을 써도 지금처럼 동작한다. 워크플로의 `자동` 모델
  선택은 dotfiles `model_tiers`가 정하며 이 설정의 영향을 받지 않는다.
- 스냅샷을 받기 전이나 구독에 실패했을 때는 모든 모델이 보인다. 숨김이 풀리는 쪽으로
  실패하므로 잘못된 값이 저장되지 않는다.
- 한 번 꺼 둔 목록에 더해진 고정 이름은 이 결정을 되돌려도 사용자 상태 파일에 남는다.
- 되돌리려면 상태 파일(`seen_models`)·`model-visibility-store.js`·
  `model-visibility-handlers.js` 목록 관찰 훅·서버 시작 배선·WS 채널·클라이언트 저장소·
  네 화면의 선택지 빌더·일괄 창 전역 탭이 함께 움직인다.

##### ADR UI-57us의 결과 (승계)

- 되돌리기 어렵다: `execLaneOf`(서버 투영 `runnable-cache.js`·`attach.js`, 스케줄러, 카드 `lane-model.js`·`workspace-adapter.js`), `chip-session-toggle` 쓰기와 readback, 칩 문구, dotfiles 계약 값(`ADR dotfiles/dotfiles-sd3hu`)이 함께 움직인다.
- 맥락 없이는 놀랍다: 키 부재가 세션 레인을 뜻하고, 저장된 `exec_lane=session`은 더는 차이를 만들지 않는다. 라벨 이름은 "권장"인데 기본 실행이 세션이다.
- 얻는 것: 사람 판단이 남을 수 있는 일이 처음부터 세션 레인 창에서 돌아, 파킹·세션 문의 왕복이 줄어든다.
- 감수하는 것: 세션 레인 창이 Worker 슬롯을 차지하는 시간이 늘 수 있다. 기존에 칩을 누르지 않은 `session-preferred` 대기 행도 다음 디스패치부터 세션 레인으로 간다.
- 폐기: UI-5cmo가 UI-lbm5에서 승계한 "`exec_lane=session`인 `session-preferred`만 세션 레인"과 "`세션 권장` 칩은 `session` ↔ 해제" — 위 `(변경, UI-57us)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

###### ADR UI-5cmo의 결과 (승계)

- 되돌리기 어렵다: 공유 미리보기·표 함수(`app/views/worker/placement.js` `interleavePreview`·`placementPlanTable`), 모니터 대기 본문과 패널(`app/views/monitor/index.js`·`placement-panel.js`), 카드 동일성 테스트(`card-parity.test.js`), parity 스펙 §9 표가 함께 움직인다.
- 맥락 없이는 놀랍다: 이전 ADR(UI-hf8v 승계)이 "모니터는 레인 점선 미리보기를 그리지 않는다"고 적었다.
- 얻는 것: 후보가 어느 저장소 어느 레인 자리에 들어가는지 레인 위에서 바로 보이고, 보낼 저장소를 골라 적용한다.
- 감수하는 것: 전체 배치안이 열린 동안 레인 높이가 미리보기 카드만큼 늘어나고, 저장소 수만큼 표 블록이 대기 열에 흩어진다.
- 기각한 대안: 레포 카드 안에 레인 지도를 따로 그리기 — 이미 있는 레인을 두 번 그린다. 표만 유지 — 위치가 보이지 않는다.
- 폐기: UI-ksi6가 UI-hf8v에서 승계한 "모니터 탭은 … 레인 점선 미리보기를 그리지 않는다" 부분, "패널은 … 저장소 카드 하나를 이름순으로 세운다"와 모니터의 `[전체 적용]`(모든 저장소 대상) — 위 `(변경, UI-5cmo)`·`(신설, UI-5cmo)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

####### ADR UI-ksi6의 결과 (승계)

- 되돌리기 어렵다: `server/worker/repo-operation-coordinator.js`(75 판정·자동 후계·대기 알림/댓글), `resolution-ladder.js`(재확인 일정), `operation-recovery.js`, `quickfix-landing.js`·`scheduler.js`·`pr-actions.js`·`completion-intent.js`(재확인 진입), `wait-judgment.js`와 카드 표시, 핀 사본 소비자(`repo-operation-policy.js`·`work-recovery-policy.js`), 그리고 75를 쓰기 시작한 저장소 스크립트(Cortex)가 함께 움직인다.
- 맥락 없이는 놀랍다: "자동 재실행은 `script_retry` 1회뿐"이던 불변식에, 계약 한도 안에서 사람 없이 실패 tip의 후계를 만드는 예외가 하나 생긴다.
- 얻는 것: 설계대로 거부한 배포가 수정 Bead를 만들지 않고, 조건이 풀리면 사람 클릭 없이 정리·닫기까지 끝난다.
- 감수하는 것: 75를 잘못 쓰는 스크립트는 기한까지 대기로 보이며 실패 알림이 늦어진다. 재확인은 스크립트를 실제로 다시 돌리므로 재실행 안전은 스크립트 소유자의 의무다.
- 폐기: UI-ymcx가 승계한 "자동 진입은 실패 tip을 언제나 채택한다"는 전제 — 위 `(변경, UI-ksi6)`·`(신설, UI-ksi6)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

######## ADR UI-ymcx의 결과 (승계)

- 되돌리기 어렵다: `server/worker/repo-ops-resolver.js` 판정, `repo-operation-coordinator.js`의 배포 실행·기록 정책 SHA, 정리의 정확 조회, `queue-store.js` 레코드 형태, `server/cli/`, `app/utils/failure-sentences.js`, `AGENTS.md` 운영 문단, `app/protocol.md`, 각 레포 배포 스크립트의 가정이 함께 움직인다.
- 맥락 없이는 놀랍다: 같은 저장소 작업 기록인데 검증은 이전 base blob을, 배포는 대상 blob을 실행한다.
- 얻는 것: 스크립트를 고치는 PR이 자기 수정으로 배포되고, 첫 `[deploy]` 선언이 사람 없이 돈다.
- 감수하는 것: 잘못된 스크립트가 머지되면 리뷰와 머지 전 검증 말고는 그 실행을 막을 관문이 없고, 첫 배포를 사람이 켜던 통제가 없어진다. 실행 권한 없는 대상 스크립트는 이전 스크립트로 돌지 않고 `repo_ops_config_invalid`로 멈춘다.
- 기각한 대안: 이전 base 규칙 유지와 스크립트 변경 PR 전용 승인 — 사람이 매번 켜야 하고 train_bot 사고가 그대로 남는다. 검증도 대상 blob으로 — 머지 전 코드가 자기 검증을 고칠 수 있어 머지 안전망이 무너진다.
- 폐기: UI-blx2가 승계한 "핀된 base SHA의 `[deploy]`", "정책·스크립트는 마지막 성공 배포의 base에서 읽는다", 수동 배포 기각 사유의 이전 base 근거, UI-s582의 "수동 경로만의 유일한 이전 base 예외" — 위 `(변경, UI-ymcx)`·`(신설, UI-ymcx)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

######### ADR UI-blx2의 결과 (승계)

- 되돌리기 어렵다: beads-ui `app/utils/placement/compute.js` 분류·레인 선택, `app/utils/placement/apply.js` 묶음 전송, `app/views/worker/placement.js` 표·문구, `server/worker/queue-store.js` `placeBundle`과 `place-bundle` WS·HTTP 조작, dotfiles `execution-worker-lane.md` 세션 배치 절차가 함께 움직인다. 한쪽만 되돌리면 같은 쌍이 경로마다 다른 자리에 놓인다.
- 맥락 없이는 놀랍다: 한 후보의 배치가 이미 대기 중인 다른 이슈의 자리를 바꾸고, 실행 중인 이슈를 직렬 레인 점유자로 만든다.
- 얻는 것: 부딪히는 쌍이 배치안 단계에서부터 같은 직렬 레인에 서서 겹쳐 돌지 않고, 충돌 해소 세션을 덜 쓴다.
- 감수하는 것: 옮겨진 상대가 줄에 묶여 늦게 시작하거나, 후보가 묶인 상대의 착지까지 기다린다. 다른 직렬 레인 안 원래 순서의 이유를 화면이 모른다.
- 기각한 대안: 상대를 고정 입력으로 두고 경고만 — 사람이 매번 옮겨야 한다. 실행 중 상대가 있으면 후보를 보류 행으로 — 사람이 다시 열어야 한다. 단계마다 따로 전송 — 단계 사이에 후보나 상대가 먼저 시작하는 틈과 일부만 적용된 묶음이 생긴다. 기존 `place`로 묶기 — `pr_wait`·`done` 항목을 지운다.
- 폐기: UI-ey6v가 승계한 "K는 고정 입력, 덮지 못하면 `uncovered`" 규칙과 "상대의 배치는 옮기지 않는다" 전제 — 위 `(변경, UI-blx2)`·`(신설, UI-blx2)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

######### ADR UI-ey6v의 결과 (승계)

- 되돌리기 어렵다: beads-ui `app/utils/placement/compute.js`의 묶음·레인 선택과 적용 순서, `app/utils/placement/apply.js`의 `[전체 적용]` 재계산(선행 후보가 적용된 뒤에도 남은 후보 자리가 같아야 한다), `app/views/worker/placement.js`의 `predecessor_parallel` 문구, dotfiles `execution-worker-lane.md` 세션 배치 절차가 함께 움직인다. 한쪽만 되돌리면 같은 선행이 경로마다 다른 줄에 놓인다.
- 맥락 없이는 놀랍다: 같은 파일을 고치는 쌍은 직렬이 기본인데 선행 이슈만 그 상대와 동시에 돌 수 있다.
- 얻는 것: 선행 이슈가 자기가 풀어 줄 이슈의 점유에 막혀 교착되지 않는다.
- 감수하는 것: 선행 이슈가 scope가 겹치는 제3의 이슈와 동시에 돌 수 있고, 부딪히면 보통의 PR 충돌 처리(충돌 해소 세션)로 푼다.
- 기각한 대안: 겹침이 있으면 직렬 유지 — 최신 attempt가 실패인 상대 뒤에서 선행이 다시 막힌다. 선행 후보의 묶음 전체를 병렬로 — `[전체 적용]` 재계산에서 근거가 사라져 `moved`로 멈춘다. `queue-place.js`가 레인을 고쳐 넣기 — 레인을 판단하지 않는다는 조항과 수동 배치를 막지 않는다는 조항을 깬다.
- 폐기: 없음. UI-hf8v의 조항은 모두 승계하고 부딪힘 쌍 배치에 선행 예외 하나를 더했다.

######### ADR UI-hf8v의 결과 (승계)

- 되돌리기 어렵다: `server/ws/worker-handlers.js` `placementFor`의 observe 판정과 `setPlacementMonitorObserver`, `server/ws/monitor-handlers.js`의 모니터 가시성 등록, 공유 표 함수(`app/views/worker/placement.js` `fullPlacementPlan`·`placementPlanTable`)와 모니터 패널(`app/views/monitor/placement-panel.js`·`index.js`), 카드 동일성 테스트(`card-parity.test.js`), parity 스펙 §9 표가 함께 움직인다.
- 맥락 없이는 놀랍다: 이전 ADR이 모니터에는 달지 않는다고 적었고, 모니터가 열려 있기만 해도 Worker 탭을 열지 않은 저장소의 jev 호출이 생긴다.
- 얻는 것: 저장소마다 Worker 탭을 오가지 않고 보이는 모든 저장소의 배치안을 한 화면에서 보고 적용한다. 모니터만 연 저장소의 쌍도 판정된다.
- 감수하는 것: 모니터만 연 저장소의 미판정 쌍에 대한 jev 호출(캐시에 없는 쌍만, 동시 호출 수는 서버 전역 상수가 묶는다). `[전체 적용]`은 저장소를 차례로 보내므로 저장소 수만큼 시간이 든다.
- 기각한 대안: Worker 탭에서만 배치 — 저장소마다 탭을 오가야 한다. 저장소를 섞은 단일 배치 — revision이 저장소마다 따로라 항상 충돌한다. 패널을 열 때만 판정 — 누르는 순간 기다린다. 차례마다 다시 계산한 자리로 전송 — 사람이 본 적 없는 자리가 들어간다.
- 폐기: UI-lsr4의 "모니터 탭과 이슈 상세에는 달지 않는다" 중 모니터 탭 부분 — 위 `(변경, UI-hf8v)`·`(신설, UI-hf8v)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

######### ADR UI-lsr4의 결과 (승계)

- 되돌리기 어렵다: 질문 버전이 바뀌어 저장된 쌍 캐시 전체가 다시 채워지고, `server/placement/relations.js`·`question.js`·`wire.js`·`service.js`의 `basis: 'file'`·`overlap_guard` 뜻, `server/ws/worker-handlers.js` `lane_states`의 `hidden` 항목, `app/utils/placement/compute.js`의 레인 선택·필요 레인 수와 `apply.js`의 전송 순서, 화면 문구(`app/views/worker/placement.js`)가 함께 움직인다.
- 맥락 없이는 놀랍다: 하루 전 ADR이 병렬을 기본으로 만들었는데 같은 파일 쌍을 다시 고정 직렬로 돌렸고, 배치 추천이 큐 설정인 직렬 레인 수를 스스로 늘린다.
- 얻는 것: 같은 파일을 고치는 쌍이 충돌 해소 세션 없이 직렬로 끝나고, 서로 무관한 직렬 묶음이 남의 줄 뒤에 서지 않는다.
- 감수하는 것: 같은 파일 쌍의 직렬 대기 시간, 폴더 겹침 쌍의 보수적 직렬화, 늘어난 레인 수(자동으로 줄지 않는다). 파일·폴더 판정이 작업 트리 stat에 기대므로, 두 이슈가 같은 폴더를 `/` 없이 적었는데 그 폴더가 아직 없으면 고정 부딪힘이 된다. 숨은 레인 점유자와 제약을 가진 후보는 레인 수를 늘린 뒤 자리가 달라질 수 있고, 이때 적용은 넣지 않고 멈춘다.
- 기각한 대안: 폴더 겹침도 고정 직렬(UI-izba 규칙) — 폴더 하나로 모든 쌍이 한 레인에 몰린다. 같은 파일도 jev에 맡기기 — 72쌍 중 71쌍이 독립으로 나와 해소 세션 비용을 그대로 진다. 스케줄러가 실행 시점에 부딪힘 상대를 기다리기 — UI-i7k9에서 비채택한 그대로다. 빈 레인 자동 축소 — 지금 동작을 바꾸지 않는다.
- 폐기: UI-mcth가 UI-i7k9에서 승계한 "고정 조건은 직접 blocks 하나이고 선언 scope 겹침은 어떤 경우에도 고정 관계를 만들지 않는다"와 "jev의 `conflict`는 해소 세션으로도 풀기 어려운 겹침에만 내고 같은 파일 겹침은 `independent`, 겹침만으로 `conflict`를 고르지 않는다" — 위 `(변경, UI-lsr4)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

######### ADR UI-mcth의 결과 (승계)

- 되돌리기 어렵다: `scheduler.js`의 세션 레인 메시지 처리(`processSessionLaneMessage`)와 창 소멸 정산(`goneSessionLaneVerdict`), `session-lane.js`의 보류 갈래·답 대기 판정, 카드의 답 대기 렌더(`app/views/worker/lanes.js`), 세션 레인 결과 줄을 쓰는 dotfiles 계약 쪽 기대가 함께 움직인다.
- 맥락 없이는 놀랍다: "세션 레인 결과는 headless와 같은 판정"을 읽은 사람은 실패·recovery 줄 뒤에도 attempt가 `running`이고 창이 남는 것을 예상하지 못한다.
- 얻는 것: 사람 답이 필요한 결과 줄이 나와도 사람이 그 창에서 답하고 세션이 이어 간다.
- 감수하는 것: 답을 기다리는 동안 세션 레인이 Worker 슬롯을 계속 점유하므로 다음 행이 기다린다(사용자 결정 2026-10-17).
- 폐기: UI-i7k9의 "결과는 종단 결과 줄로 headless와 같은 판정을 탄다" — 위 `(변경, UI-mcth)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

######### ADR UI-i7k9의 결과 (승계)

- 되돌리기 어렵다: 질문 버전이 바뀌어 저장된 쌍 캐시 전체가 다시 채워지고, `server/placement/relations.js`·`material.js`·`question.js`·`service.js`, wire `basis`·`overlap`의 뜻, 화면 근거 줄(`app/views/worker/placement.js`)이 함께 움직인다.
- 맥락 없이는 놀랍다: 선언 scope가 겹치는데도 병렬로 배치될 수 있다. 머지 충돌을 충돌 해소 세션이 푼다는 전제 없이는 위험해 보인다.
- 얻는 것: 정말 동시에 돌면 안 되는 쌍만 직렬로 묶여 병렬 배치가 기본이 된다.
- 감수하는 것: 해소 세션 비용과 jev 오판 위험. 예전에 고정으로 정해지던 쌍도 jev를 기다리므로 판정 전·실패 상태의 후보가 늘 수 있다(수동 배치는 그대로).
- 기각한 대안: 스케줄러가 실행 시점에 부딪힘 상대를 기다리는 기능 — jev를 탭과 무관하게 돌려야 하고, 보이지 않는 대기·기아 처리 비용에 비해 아끼는 해소 세션이 적다. 같은 파일 정확 일치만 고정으로 남기기 — 해소 세션이 같은 파일 겹침도 대부분 푼다.
- 폐기: UI-izba의 "선언 scope 겹침은 충돌이고(같은 spec·plan 출처 예외) jev에 묻지 않는다" — 위 `(변경, UI-i7k9)` 조항으로 대체했다. 그 밖에 폐기한 조항은 없다.

######### ADR UI-izba의 결과 (승계)

- 되돌리려면 worker-queue wire 필드 `placement_relations`·`placement_status`, `server/placement/`의 jev 클라이언트·쌍 캐시·일정, `app/utils/placement/` 자리 계산, 카드 슬롯 6의 `[추천 배치]`와 카드 문법 스펙 §5.1 행, parity §9 행, 저장된 쌍 캐시, jev 키 소비가 함께 움직인다.
- 이슈 제목·본문·spec 절이 jev(외부 API)로 나간다. 그 대가로 사람이 매번 배치를 정하는 부담이 준다. 키가 없는 서버에서는 `[추천 배치]`가 꺼진 채 수동 배치만 남는다.
- 기각한 대안: dotfiles workflow 판정 pack을 새로 두고 서버가 `workflow-judge.py`를 spawn — pack·호출 상한·로그가 Bead 하나 기준이라 쌍 질문과 맞지 않고 호출마다 Python을 띄운다. 버튼을 눌러야 분석 — 0009를 지운 이유를 되풀이한다. 볼 때 jev 호출 — 0.4~0.9초 지연이 남는다. `[적용]`이 blocks 의존까지 쓰기 — 잘못된 판정이 구현 진입을 막는다.
- 배포·빌드 조항은 `UI-u6ud-5`에서 바뀌지 않았다. 그 밖에 폐기한 조항은 없다.

######### ADR UI-lbm5의 결과 (승계)

- 되돌리기 어렵다: admission 세 곳(`admission.js`·`attach.js`·`scheduler.js`), 스케줄러 디스패치 분기와 `isDeadAttempt`·대화 정산·일시정지 거절, tmux 기동기의 계정 래퍼·env 전달, attempt 모양(`queue-store.js`), 카드 슬롯(`lanes.js`·`lane-model.js`·모니터), dotfiles continuation 판정이 함께 움직인다.
- 맥락 없이는 놀랍다: "worker-ineligible인데 Worker 대기열에서 돈다"는 설명 없이는 모순으로 읽힌다.
- 얻는 것: 사람 판단이 필요한 일도 대기열 한 곳에서 순서대로 돌고, 사람은 답할 때만 창에 들어간다.
- 감수하는 것: 세션 레인 창이 Worker 슬롯을 차지하는 동안 다음 Worker 행은 기다린다. 허브 claude 창의 권한 확인 대화상자가 답 대기로 드러나는지는 실측되지 않았다.
- `ADR UI-1eag`의 조항은 생존 소유의 두 문장을 바꾼 것 말고는 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-1eag의 결과 (승계)

- 되돌리기 어렵다: durable `quickfix_landing.cursor` 어휘(`queue-store.js`), PR·quick_fix 두 정산의 공유 러너(`post-merge-job.js`, `pr-actions.js`, `quickfix-landing.js`), 코디네이터 잡 target 판정(`repo-operation-coordinator.js` `eligibleJobHead`), 사람 재개 권한 배선(`attach.js`·`scheduler.js`), dotfiles 정본 조항과 체커가 함께 움직인다.
- 맥락 없이는 놀랍다: 원래 행이 자기 머지 SHA가 아닌 트리에서 잡을 실행하고, 다른 Bead가 착지시킨 수정본도 실행한다.
- 얻는 것: 머지 후 잡을 가진 quick_fix를 직접 push해도 그 행이 잡을 돌리고, 수리 착지 뒤 원래 행 재시도 한 번으로 승계와 남은 잡이 끝난다.
- 감수하는 것: 세션 소유 quick_fix 착지의 잡은 여전히 뒤 Worker 행이 처리한다. quick_fix 행에는 실패 대화 `인계` 출구가 없어 `job_retry`는 사람의 재개 클릭에서만 온다.
- `ADR UI-5chz`의 조항은 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-5chz의 결과 (승계)

- 되돌리기 어렵다: `notify.js` 대화 알림 집합, `scheduler.js` reconcile의 메시지 처리 뒤 알림, 재알림을 맡는 쪽(dotfiles 브리지와 훅 직접 전송)에 대한 의존이 함께 움직인다. 진행 중인 UI-lbm5의 세션 레인 알림 설계도 따라 바뀐다.
- 맥락 없이는 놀랍다: 사람이 답해야 하는 상태인데 `#beads-worker` 채널에는 아무 알림이 없다. 첫 멈춤의 `🙋 확인 필요`만 채널로 나간다.
- 얻는 것: 같은 턴 종료가 두 곳에 오는 중복이 사라지고, 답할 곳(스레드)에서만 알림을 받는다.
- 감수하는 것: 채널만 보는 사람은 대화가 이어지는 동안의 답 대기를 모른다. 브리지가 꺼지면 재알림은 훅 직접 전송에 달려 있다.
- UI-lbm5와 이 ADR은 모두 `ADR UI-gske`를 supersede한다. 나중에 착지하는 쪽이 먼저 착지한 쪽의 ADR을 승계하고 supersede 대상을 그 ADR로 고친다.
- `ADR UI-gske`의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-gske의 결과 (승계)

- 되돌리기 어렵다: 새 HTTP 입력과 dotfiles `session-inquiry` CLI, `queue.session_inquiries` 저장 형태, 대기 판정 사유, 서랍·칩 화면과 Worker·모니터 동일성 테스트, 대화 레코드 행 키와 정산, `NEEDS_HUMAN_NOTIFY_CLASSES`와 클릭 세션 클래스 표, 보류 분기 기동, 완료 의도의 `hold_launches`·`cleanup_failed`의 1회 표시, 설정 창 문구가 함께 움직인다.
- 맥락 없이는 놀랍다: beads-ui가 자기가 띄우지 않은 외부 세션을 같은 id로 다시 연다. 조용하던 정리 실패가 알림과 대화를 만든다.
- 얻는 것: 사람이 필요한 해소 세션과 자동 단계가 남지 않은 실패가 확인 필요 칩과 알림에 뜨고, 스위치가 켜져 있으면 답할 자리가 저절로 열린다.
- 감수하는 것: 다른 호스트에서 돈 세션은 로컬 레지스트리에 없어 dead로 보이고 `--resume`이 실패한다(버튼이 남는다). 닫힌 행은 보존 기한 없이 큐에 남는다. 정리 실패마다 알림이 하나씩 늘어난다.
- `ADR UI-btsr`의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-btsr의 결과 (승계)

- 되돌리기 어렵다: `queue.json` `repo_operations`에 저장되는 식별자 해시와 `retry_of`·`superseded_by` 체인, 체인을 읽는 정확 조회·부팅 재개·결과 대기, `pr-actions.js` 정리 재시도 권한, 두 탭의 공유 카드 렌더러와 동일성 테스트, 알림·댓글 `다음:` 문장, 카드 문법 정본, dotfiles 계약 라벨(형제 dotfiles-md59z)이 함께 움직인다.
- 맥락 없이는 놀랍다: 같은 날 Accepted인 UI-c74x가 이 행을 `[워커로 이어가기]`로 불렀다(짝 문법). "종단 기록은 다시 열지 않는다"와 "사람이 누르면 다시 돈다"는 함께 읽혀야 한다.
- 얻는 것: 외부 원인을 고친 뒤 `[정리 재시도]` 클릭이나 인계 한 번으로 배포·검증이 다시 돌고 Bead가 닫힌다. 클릭이 하는 일을 이름이 말한다.
- 감수하는 것: 짝 문법의 균일함(머지 후 정리 행만 다른 이름)과 체인을 읽는 조회 경로의 복잡도.
- `ADR UI-c74x`의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-c74x의 결과 (승계)

- 되돌리기 어렵다: dotfiles 계약 멈춤 종류·진입 블록 바이트·dotfiles 다이제스트 테스트와 beads-ui `session-stall.js` 술어·`direction-inquiry.js` 진입 블록 사본·세 다이제스트 테스트가 함께 움직인다.
- 맥락 없이는 놀랍다: UI-jbl1은 `credential`을 공급자 보류 경로로 보냈지만, 세션이 선언한 자격 증명 대기는 그 경로에 닿지 않는다.
- 얻는 것: 사람만 풀 수 있는 자격 증명 대기가 알림 없이 몇 시간씩 남지 않는다.
- 감수하는 것: 대화가 자동으로 열리는 개입 비용과 두 저장소 동시 변경.
- 대안과 기각 사유: 대기 알림만 보내기 — 대기 사유 판정은 Discord로 알리지 않는다는 승계 조항을 뒤집고 사용자가 매번 버튼으로 세션을 연다. 지금처럼 두기 — 무알림 정지가 남는다.
- `ADR UI-k467`의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-k467의 결과 (승계)

- 되돌리기 어렵다: `completion-intent.js` 분류·알림 맵, `notify.js` 다음 행동 문구, `tile-resolve.js` 행 종류, `pr-wait-row.js` `[머지]` 술어, `failure-sentences.js`, dotfiles `failure_classes.foreign_handoff.notify_label` 복사본이 함께 움직인다.
- 맥락 없이는 놀랍다: 같은 PR 대기의 `needs_human` 행인데 머지 게이트 보류와 달리 `[머지]`가 출구가 아니다.
- 얻는 것: 대상의 deploy lock·post-merge 원장을 소유하지 않는 rig Worker가 대상 저장소의 배포·충돌을 건드리지 않는다.
- 감수하는 것: 대상 저장소의 배포·충돌을 rig Worker가 자동 처리하는 편의를 잃는다. 그 경우는 사람이 대화로 처리한다.
- 대안과 기각 사유: 해소 attempt로 충돌을 자동 해결 — 대상 저장소의 쓰기 소유가 rig Worker에 없다. `[머지]`로 풀기 — 계약이 사람에게 넘기라고 정한 경우를 클릭 하나로 우회한다.
- `ADR UI-9w5l`의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-9w5l의 결과 (승계)

- 되돌리기 어렵다: wait-judgment 생산자, `notify.js`, `tileResolveFields`, resolve-in-session 핸들러, 팝업·상세 렌더러, 모니터, 범례, protocol `WaitReason`·`VerdictCode`가 함께 움직인다.
- 맥락 없이는 놀랍다: 새 대기 사유를 더하는 사람은 "사람이 봐야 함"을 `action_required`로 올리고 알림을 기대하기 쉽다. 이 저장소에서 `action_required`는 "beads-ui 버튼으로 풀 수 있다"는 뜻이고, 버튼 없는 기다림은 `normal`이다.
- 얻는 것: 조치 필요 배지마다 누를 버튼과 해결 문장이 있다. 헛경보와 할 수 없는 조치 표시가 사라진다.
- 감수하는 것: 대기 사유 Discord 알림을 잃는다. 지연·조치 필요는 beads-ui 화면에서 확인한다.
- 대안과 기각 사유: 선행 대기 알림만 끄기 — 다른 버튼 없는 조치 필요가 남는다. sjob에 holding 해제 명령 추가 — dotfiles 계약 변경이 필요하고 해결 세션이 operator recovery로 같은 일을 한다. beads-ui 안 답 입력칸 — 사용자가 범위 밖으로 정했다.
- `ADR UI-jbl1`의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-jbl1의 결과 (승계)

- 되돌리기 어렵다: 알림 제목을 읽는 사람의 Discord 필터와 습관, 대화 레코드 키를 읽는 reconcile·투영·UI(`queue-store.js`·`scheduler.js`·`worker-handlers.js`·`repo-ops-timeline.js`·`tile-resolve.js`), 종단 자리(`completion-intent.js`·`discard-coordinator.js`·`repo-operation-coordinator.js`), `notify.js`, 서버 전역 `conversation-settings.js`와 전역 탭 섹션, 진입 블록 사본과 다이제스트가 함께 움직인다.
- 맥락 없이는 놀랍다: 나흘 전 결정(UI-18a5, 자동 기동은 멈춤에만)과 ADR 0005의 자동 수리 폐기를 뒤집는 것처럼 보인다. 자동 대화는 첫 답 전 읽기 전용 진단과 질문만 한다.
- 얻는 것: 알림 직후 진단을 받은 대화가 이미 열려 있다. 수동 배포 실패도 같은 대화·인계 경로를 갖는다.
- 감수하는 것: 실패마다 드는 세션 토큰. 알림 종류를 하나로 줄이는 대신 제목 접미사로 급한 정도를 보인다.
- 대안과 기각 사유: 실패는 클릭으로만 여는 현행 — 멈춤과 경험이 갈린다. 실패별 스위치 — 사용자가 전체 공통 하나로 정했다. 설정을 `workflow_session_defaults`에 둠 — 계약 등록 키가 아니고 dotfiles 스킬이 읽지 않는다.
- UI-qbgj·UI-18a5-2·UI-18a5-3의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-qbgj의 결과 (승계)

- 되돌리기 어렵다: dotfiles `docs/contracts/external-wait.md`·`workflow-state.yaml`, `sjob takeover`·실행 기록, 연구 템플릿 `profiles/server-local`·`run_workflow.sh`와 그것을 받은 프로젝트, `adapters/slurm.js`·`adapters/sjob-local.js`·`takeover.js`·`observer.js`·`service.js`, `attach.js` 투영, 카드·상세 렌더러, 완료 프롬프트가 함께 움직인다.
- 맥락 없이는 놀랍다: 관찰 전용이던 외부 대기에 잡을 취소·실행하는 조작이 하나 있고, head job만이 아니라 워크플로 전체를 옮긴다.
- 얻는 것: 큐 정체를 사람이 판단할 재료와 한 번의 확인으로 우회하는 길.
- 감수하는 것: 공용 서버에서 다른 사용자에게 배정된 자원을 나눠 쓴다. sjob 실행 기록이 없는 옛 작업은 대상에서 빠진다. 결과 불명이면 정착 창만큼 표시가 남는다.
- 대안과 기각 사유: wrapper 역파싱으로 원 명령 복원 — `--wrapper`·확장자 없는 실행을 놓친다. beads-ui가 `scancel`·`sjob run --local`을 직접 조합 — sjob 형식 지식이 새고 hold 보상 순서를 둘이 나눠 갖는다. head job만 로컬 — 하위 단계가 다시 같은 큐 뒤에 선다.
- UI-18a5의 조항은 외부 작업 조항에 두 조항을 더한 것 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-18a5의 결과 (승계)


- 되돌리기 어렵다: dotfiles 계약 어휘·진입 블록 핀(`direction-inquiry.js` 사본과 다이제스트 테스트), `tile-resolve.js` 술어, `worker-handlers.js` 클릭 라우팅, `scheduler.js` 인계 실행·한 번 규칙·외부 되돌림, `notify.js` 대화 알림, 카드 슬롯 표가 함께 움직인다.
- 맥락 없이는 놀랍다: 실패 대화의 결과 줄 하나가 결과 미상 머지 후 잡을 다시 돌릴 수 있다. 같은 이름의 버튼이 행마다 다른 op를 부른다(뜻은 같다).
- 얻는 것: 카드 어디서나 같은 두 버튼과 같은 끝맺음. 실패를 고친 뒤 사람이 다시 누를 필요가 없다.
- 감수하는 것: 세션이 쓴 결과 줄을 사람 클릭으로 보는 권한 위임. 머지 게이트 위조 판정은 예외로 남는다.
- 대안과 기각 사유: 종류별 표면 유지 — 같은 이름이 다른 세션을 열어 혼동이 남는다. 실패 인계는 창만 닫고 재시도는 사람이 누름 — 버튼을 합쳐도 끝맺음이 종류마다 달라진다.
- UI-ny0h-2의 조항은 넓힌 둘(대화 대상, 출구 이름) 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-ny0h-2의 결과 (승계)

- 두 지연은 설정 화면 `대기·주기` 묶음에서 따로 바뀐다. 되돌리려면 위 소비자와 함께 `server/timing-settings.js`의 두 키와 저장 파일 `timing-settings.json`이 움직인다.
- 하위 잡 관찰을 되돌리려면 dotfiles `docs/contracts/external-wait.md` Record·관찰 절,
  `server/worker/external-wait/adapters/slurm.js` 원격 프로그램, `observer.js`·`store.js` 저장,
  `server/worker/attach.js` 투영, 카드 렌더러(`app/views/worker/wait-vocabulary.js`·`lanes.js`),
  상세 패널(`app/views/detail-panel/index.js`), `completion-prompt.js`가 함께 움직인다.
- 얻는 것: snakemake가 아닌 sbatch 하위 잡도 같은 규칙으로 붙는 일반성과 로그 비의존. 잃는 것:
  전체 단계 수(Slurm은 아직 던지지 않은 잡을 모른다)와 같은 폴더 동시 실행의 구분.
- 기각한 대안: 별도 감시 루프와 별도 파일(ssh·수명·정리가 두 갈래), snakemake 진행 줄 파싱
  (snakemake 전용이라 사용자 기각), 의존성 일괄 제출(플러그인 미지원, 실패 시 의존 잡이 대기로 남음).

########### ADR UI-nuwy의 결과 (승계)

- 되돌리기 어렵다: `direction-inquiry.js` 기동(같은 세션 명령·진입 블록 사본), `scheduler.js`
  reconcile의 메시지 처리·인계 이어가기와 `resume()`의 `conversation_return` 예외, `admission.js`의
  `allow_conversation_return`, `wait-judgment.js` 대화 verdict 표와 actions, `notify.js` 네 종류(변경, UI-5chz: 세 종류)와
  억제, `tile-resolve.js`의 두 버튼 술어, `session-stall.js` 술어, 핀 투영 schema 2가 함께 움직인다.
- 맥락 없이는 놀랍다: 파킹된 attempt가 `awaiting_user`를 단 채 재개되고, 그런데도 사람 `↻`는
  없다. 재개는 대화의 `인계`(또는 `[워커로 이어가기]`) 뒤 창 소멸을 확인한 한 경로뿐이다.
- 감수하는 것: 메시지 단위 관측을 위해 매 pass(현재 30초)마다 대화 전사 끝(현재 64KB)을 읽는다. 무인 세션 이력에
  대화가 섞인다. 인수 세션의 push는 가드 밖이다.
- 미확인 전제: 대화형 Codex 창이 기본 `CODEX_HOME`에서 attempt 세션을 `codex resume`로 이어 쓰고
  이후 attempt 홈의 `codex exec resume`가 같은 rollout을 찾는지는 배포 뒤 첫 실제 대화에서
  확인한다.
- UI-ri8n의 조항은 뒤집은 둘(`idle → normal`, 파킹·복구 대기 출구를 fork 문의 세션이 끝까지
  처리하는 조항과 그 알림·프롬프트) 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-18a5-2의 결과 (승계)

- 되돌리기 어렵다: `queue-store.js` 레코드 필드, `scheduler.js` `reconcileInteractivePass` 정산, 세 런처(`direction-inquiry.js`·`resolve-session.js`·`external-wait/session-resume.js`)의 레코드 쓰기가 함께 움직인다.
- 맥락 없이는 놀랍다: fork로 연 해결 세션도 대화 레코드이고, 그 인계는 세션 재개가 아니라 행의 조작을 실행한다.
- 얻는 것은 정산 규칙 하나, 감수하는 것은 옛 레코드 읽기 호환 기간이다. 대안(종류별 정산 유지)은 끝맺음 통합을 막는다.
- UI-nuwy-2의 조항은 넓힌 둘(`conversation` 보유 종류, 인계·보류 정산 종류) 외에 전부 승계했고 폐기한 조항은 없다.

########## ADR UI-18a5-3의 결과 (승계)

- 머지 게이트의 보류·terminal·알림 규칙과 실패 행 출구가 한 행으로 읽힌다. 되돌리려면 receipt-check 레지스트리·review lineage claim·completion intent phase·알림 클래스와 함께 `pr-actions.js` 정리 재시도 권한, `discard-coordinator.js` 재시도, 머지 큐 재등록, `scheduler.js` 인계 실행·한 번 규칙, PR 대기 행 버튼과 `pr-wait-row.js` 술어, `notify.js` 다음 행동 문구가 움직인다.
- 맥락 없이는 놀랍다: 세션 결과 줄로 정리 재시도·머지 큐 재등록이 일어나고, 위조 판정 행에서만 인계가 아무것도 하지 않는다.
- 얻는 것: 실패를 고친 뒤 사람이 다시 누를 필요가 없다. 감수하는 것: 권한 위임, 결과 미상이면 거절로 끝나는 보수적 규칙. 대안(출구 이름만 바꾸고 인계는 창만 닫음)은 끝맺음이 종류마다 갈린다.
- UI-u6ud-4의 조항은 바꾼 출구 조항 외에 전부 승계했고 폐기한 조항은 없다.

##### ADR UI-u6ud-11의 결과 (승계)

- Worker 주소와 defaults 소비 규칙이 이름 붙은 한 행으로 읽힌다. 되돌리려면 `server/worker-url.js` 어댑터·설정 화면 세 값·dotfiles `worker-url` CLI와 kv 계약이 함께 움직인다.
- `UI-wecw`의 조항은 전부 승계했고 폐기한 조항은 없다.
