---
scope:
  - server/placement/
  - server/worker/queue-place.js
  - server/ws/worker-handlers.js
  - app/views/worker/placement.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/utils/scope-overlap.js
  - docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# Worker 대기열 배치 미리보기: jev 쌍 판정과 [적용]

- Bead: `UI-izba` · route: `spec_backed`
- 시안: `~/tmp/mockups/2026-10-16-ui-izba-placement-preview.html` (tailnet mockup 서비스)

## 1. 목표

지금은 대기열에 넣을 이슈가 많아도 병렬·직렬 레인 배치를 사람이 매번 직접 정한다. 이 기능은
후보마다 **어느 레인 몇 번째에 넣으면 되는지**를 미리 계산해 두고, 후보 카드의 새 버튼 `[추천 배치]`를
누르면 실제 대기 레인 안에 점선 카드로 보여 주며, 사람이 `[적용]`을 누르면 그 자리에 넣는다. 레인을
직접 고르는 `[↴ 대기로]` 메뉴는 지금 그대로 남는다. 후보 전체의
배치안을 한 번에 보고 골라 넣는 `[전체 적용]`도 둔다.

판단 재료는 두 가지다. 기계가 확실히 아는 **고정 조건**(blocks 의존, spec scope 겹침)과, 경로로는
안 보이는 관계를 jev가 이슈 두 개씩 비교해 내는 **쌍 판정**이다. 2026-08의 병렬성 분석(ADR 0009로
제거)은 버튼을 눌러야 분석이 돌았고 느려서 실시간으로 쓸 수 없었다. 이번에는 판정을 자동으로 미리 해
두고 캐시해서, `[추천 배치]`는 끝난 결과를 보여 주기만 하고 누르는 순간 기다리지 않는다.

## 2. 검증된 전제

base `a4058fbb7899622c7173a4f6df16065b3d81f93e` (beads-ui `origin/main`), dotfiles `origin/main` 기준.

- 대기열 스냅샷의 `revision`은 CAS 카운터이고 직렬 레인 `s1`..`s5`는 배타 레인이며 `entries` 순서가 실행 순서다 — `server/worker/queue-store.js:616`, `server/worker/queue-store.js:620-624`
- 직렬 레인 점유는 구현 attempt lineage의 `serial_lane_id`가 들고, 머지 정리·폐기 때 풀린다(실행 중·PR 대기 항목도 레인을 막는다) — `server/worker/queue-store.js:376-378`, `server/worker/queue-store.js:5600-5625`
- 쓰기 CAS는 `expected_revision !== cur.revision`이면 거절한다 — `server/worker/queue-store.js:6993`
- store의 `place`는 `lane`·`index`(없으면 맨 뒤)를 받고 직렬 레인에서 `applyLaneBlocksOrder`로 blocks 순서를 다시 맞춘다 — `server/worker/queue-store.js:7614`, `server/worker/queue-store.js:5676`
- `placeBeadInQueue`는 admission → place → fanout 순서이고, 이 모듈은 레인 판단을 하지 않는다 — `server/worker/queue-place.js:5`, `server/worker/queue-place.js:132`
- 레인 안 blocks 엣지는 `laneBlocksEdges`가 모은다 — `server/ws/worker-handlers.js:1401`
- 후보·레인 구성원의 선언 scope는 `beadScopeFor`가 `bead_scope`로 wire에 싣고, 겹침은 경로 마디 경계로 판정한다 — `server/ws/worker-handlers.js:1911`, `app/utils/scope-overlap.js:29`
- 캐시가 채워지면 fanout하는 선례는 `scope-cache`의 `onFilled`다 — `server/worker/scope-cache.js:346`, `server/ws/worker-handlers.js:1879`
- `[↴ 대기로]`는 후보 카드 foot(슬롯 6) 하나뿐이고 클릭은 `placeMenuLanes`로 레인 메뉴를 연다 — `app/views/worker/lanes.js:5271`, `app/views/worker/index.js:3839`, `app/views/worker/placement.js:291`, `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:262`
- 설치된 dotfiles checkout 루트는 서버가 이미 찾는다 — `server/worker/attempt-facts.js:102`, `server/worker/attempt-facts.js:133`
- jev는 질문을 요청에 실어 보내는 범용 API다: `POST https://api.typesafe.ai/v1/systemone`, 모델 `jev-1.13.0`, 시간 제한 5초, 응답은 choice별 `probabilities` — dotfiles `src/shared/skills/flow/workflow/resources/judge-questions.yaml:4-6`, dotfiles `src/shared/skills/flow/workflow/scripts/workflow-judge.py:334-359`
- 질문 정의를 소비자 쪽에 두고 jev를 직접 부르는 선례(덱 서버), 키는 `TYPESAFE_API_KEY` → `secrets-get typesafe/api-key` 순서 — dotfiles `docs/adr/dotfiles-hkski-deck-question-edit-unticked.md:65`, dotfiles `docs/agents/secrets.md:47`
- jev 실측: `~/.local/state/dotfiles/workflow-judge.jsonl` 1,787건 응답 p50 403ms·p90 940ms, 입력 p50 1,750자, 최근 7일 하루 33~267회 — 이 세션에서 로그를 직접 집계
- 미확인: 공유 서버(launchd) 프로세스 환경에 `TYPESAFE_API_KEY`가 없고, hub에서 `secrets-get typesafe/api-key`가 exit 1이었다 — 원인은 확인하지 못함(자격 증명 탐색은 이 세션에서 멈춤). 이대로면 공유 서버의 판정은 늘 고정 조건만이다(§4.9)
- 미확인: `bd show <id>`는 읽기여도 last-touched를 써서 db 감시를 울린다 — 2026-09 실측 기록, 이번 세션 미재현

## 3. 사용자 결정 (2026-10-16)

1. jev 호출은 **자동**이다. 버튼을 눌러야 분석하는 방식은 쓰지 않는다.
2. jev는 **두 이슈 쌍**의 관계만 묻고 두 이슈 재료의 digest로 캐시한다. 큐가 바뀌면 jev를 부르지
   않고 캐시와 현재 큐로 배치만 다시 계산한다.
3. 미리보기는 실제 대기 레인 위의 점선 카드와 근거 줄이고, `[적용]`을 눌러야 배치된다.
4. `[적용]`은 **레인 배치만** 쓴다. blocks 의존은 쓰지 않는다.
5. 전체 배치안 보기와 `[전체 적용]`을 이번 범위에 넣는다.
6. **Worker 탭에만** 둔다. 모니터 탭은 기존 메뉴 그대로이고 parity §9 표에 행을 더한다.
7. `[↴ 대기로]`의 수동 레인 메뉴는 그대로 두고, 추천은 **별도 버튼** `[추천 배치]`를 눌러야 보인다.
8. 휴대폰·아이패드에서도 쓰므로 커서 올리기는 쓰지 않고 **누르기**로만 연다.
9. 하루 호출 상한은 두지 않는다.
10. jev 판정이 끝난 후보에서만 `[추천 배치]`가 켜진다. 고정 조건만의 기본안은 보여 주지 않는다 — blocks
    순서는 레인이 이미 맞추고 scope 겹침은 `⧉` 칩이 이미 보여 주기 때문이다.

세션 기본값(spec 승인 때 함께 확정): 채택 확신도 0.8(jev bind 결속 기준과 같음).

## 4. 설계

### 4.1 관계와 고정 조건

후보 C와 다른 항목 X 사이의 관계는 `independent`·`c_first`·`x_first`·`conflict`·`unknown` 중 하나다.

- 고정 조건이 jev보다 먼저다. X가 C를 blocks하면 `x_first`, C가 X를 blocks하면 `c_first`, 선언
  scope가 겹치면 `conflict`이고 출처는 `fixed`다. 고정 조건이 정한 쌍은 jev에 묻지 않는다.
- 나머지 쌍은 jev 답을 쓴다. 고른 choice의 확신도가 0.8 이상일 때만 채택(출처 `jev`)하고, 그 밖에는
  `unknown`이다. `unknown`이어도 jev의 첫 choice가 `independent`가 아니고 확신도가 0.5 이상이면
  "참고"로 보여 준다.
- X의 범위: 다른 배치 가능 후보, 병렬·직렬 대기 항목, 레인을 점유한 구현 lineage(실행 중·PR 대기).

### 4.2 jev 쌍 판정

- 질문은 choice 하나다(질문 정의는 beads-ui 서버 상수, 예: `placement_pair`). 선택지는 A·B를 id
  순으로 정렬한 기준으로 `independent`(동시에 구현·머지해도 서로의 전제·파일·공유 상태·계약 조항·배포
  표면을 바꾸지 않는다), `a_first`(B가 A의 결과 위에 서거나 A가 나중에 착지하면 B를 다시 해야 한다),
  `b_first`(반대), `conflict`(같은 파일 영역·공유 상태·계약 조항·배포 표면을 바꿔 동시에 하면 부딪히지만
  서로의 결과에 기대지는 않는다)다.
- 이슈 하나의 재료: id, 제목, 종류, route, 본문(description), spec이 있으면 핀된 base의 spec에서
  목표·결정·경계 절과 `scope`. 이슈당 12,000자, 합계 24,000자에서 결정적으로 자른다. 재료는 이미
  읽는 목록·캐시에서 만들고 이슈마다 `bd show`를 부르지 않는다(위 미확인 전제, db 감시 루프 방지).
  재료를 그 목록·캐시에서 얻지 못한 이슈가 낀 쌍은 `bd show`로 메우지 않고 `unknown`으로 둔다(상태
  `pending`, 재료가 채워지면 판정).
- 호출: 모델·엔드포인트·시간 제한은 workflow 판정과 같은 값을 서버 상수로 두고(ADR UI-u6ud-2:
  계약 파일을 런타임에 읽지 않는다) cross-runtime 테스트가 dotfiles 값과 같은지 확인한다. 키는
  `TYPESAFE_API_KEY`, 없으면 설치 dotfiles checkout의 `src/shell/bin/secrets-get typesafe/api-key`다.
  키는 프로세스 메모리에만 두고 브라우저·로그로 내보내지 않는다.
- 응답 검사: 모델 일치, choice가 선택지 안, `probabilities` 합 1±0.001, 고른 choice가 최댓값. 하나라도
  어긋나면 그 쌍은 실패다.
- 호출 기록(서버 상태 디렉터리, 0600)은 시각·워크스페이스·두 id·두 digest·choice·확신도·ms·실패 사유만
  남기고 본문은 남기지 않는다.

### 4.3 쌍 판정 캐시

- 키는 (정렬된 두 id, 두 재료 digest, 질문 버전, 모델)이다. 어느 한쪽 재료가 바뀌면 그 쌍만 다시
  판정 대상이 된다.
- 서버 상태 디렉터리에 JSON으로 저장해 재시작해도 다시 묻지 않는다. 30일 동안 쓰이지 않은 항목은
  지운다.
- 실패한 쌍은 10분 동안 다시 묻지 않는다.

### 4.4 호출 일정

- 워크스페이스의 후보 집합, 대기·점유 구성원, 재료 digest가 바뀌면 3초 동안 모아 한 번 계산하고,
  캐시에 없는 쌍만 호출 대기열에 넣는다.
- 동시 호출은 서버 전체 2개다. 호출 횟수 상한은 없다 — 같은 쌍·같은 재료는 다시 묻지 않는 캐시가
  호출 수를 후보·구성원 변화에 비례하게 묶는다.
- `↻ 다시 판정`은 그 워크스페이스의 현재 후보가 낀 캐시 항목을 지우고 다시 넣는다.
  판정을 앞당기는 조작이지 분석을 시작하는 버튼이 아니다.

### 4.5 배치 계산

순수 함수다. 입력은 큐 스냅샷, 후보, 관계 표이고 출력은 자리(레인·index)와 근거·경고다.

- 각 X의 자리: 직렬 레인에서 기다리거나 lineage가 `serial_lane_id`를 들고 있으면 그 레인, 병렬
  대기이거나 `serial_lane_id`가 null인 점유면 `parallel`이다.
- 제약 집합 K = 관계가 `conflict`·`c_first`·`x_first`인 X들.
- 규칙 1: K가 비면 병렬 맨 뒤.
- 규칙 2: K의 자리가 모두 같은 직렬 레인 L이면 L이다. index는 L 안에서 `x_first`·`conflict`인 X 중
  마지막 것의 뒤, `c_first`인 X 중 첫 것의 앞이다. 둘이 동시에 성립하지 않으면 맨 뒤에 두고 경고
  `order_unsatisfiable`을 단다.
- 규칙 3: 그 밖(병렬에만 있거나 두 레인 이상에 흩어짐)이면 K를 가장 많이 덮는 직렬 레인(동률이면
  번호가 작은 쪽) 맨 뒤다. 하나도 덮지 못하면 병렬 맨 뒤다. 덮지 못한 X마다 경고 `uncovered`(예:
  "UI-x(병렬)과 동시에 돌 수 있음 — 상대를 직렬 레인으로 옮기면 피할 수 있음")를 단다.
- 근거 줄은 K의 각 X와 채택된 `independent` 판정 중 대표 하나를 출처(`fixed`·`jev <확신도>`)와 함께
  싣는다.

### 4.6 전체 배치안

후보 레인의 표시 순서대로 하나씩 §4.5로 자리를 정하고, 앞서 정한 후보를 그 자리의 가상 구성원으로
넣은 뒤 다음 후보를 계산한다. 그래서 서로 부딪히는 후보끼리는 같은 직렬 레인에 순서대로 놓인다.
결과는 번호가 매겨진 목록이다.

### 4.7 서버 투영

- worker-queue wire에 `placement_advice`(후보 id → 자리·근거·경고·상태·판정 시각·기준 `revision`)와
  `placement_plan`(§4.6 목록)을 더한다.
- 상태는 `ready`(필요한 쌍이 모두 판정됨), `pending`(판정 중), `unavailable`(키 없음·HTTP
  오류·시간 초과·응답 형식 오류)이다.
- 판정이 채워지면 `scope-cache`와 같은 방식으로 fanout한다. `queue-place.js`는 계속 판단 없이 받은
  레인·index만 쓴다.
- 구서버(필드 없음)에서는 `[추천 배치]`를 그리지 않는다(fail-quiet).

### 4.8 화면

- **버튼**: 배치 가능한 후보 카드 foot(슬롯 6)에서 `[↴ 대기로]` 앞에 `[추천 배치]`(`.op-btn`)를
  둔다. `[↴ 대기로]`와 그 수동 레인 메뉴는 바꾸지 않는다. 슬롯 6에 버튼이 하나 늘므로 카드 문법
  정본(`2026-08-25-card-header-grammar-unify-design.md` §5.1 슬롯 표의 6 액션 foot 행)을 먼저 고친다.
- **미리보기**: `[추천 배치]`를 누르면(마우스·터치 같음, 커서 올리기 없음) 대기 열의 그 자리에
  점선 카드(번호·id·제목)를 끼워 그리고 카드 foot 아래에 근거 상자를 연다. 상자는 자리 한 줄("직렬 2 ·
  #2 — UI-a7f2 뒤"), 근거 줄(출처 태그 `고정`·`jev 0.92`), 경고 줄, `[적용]`·✕·판정 시각이다. ✕·Esc·
  같은 버튼을 다시 누르면 닫힌다. 한 번에 한 후보의 상자만 열린다.
- **[적용]**: 지금의 `worker-queue-place`에 `lane`·`index`와 화면이 가진 최신 스냅샷의 revision을
  보낸다. revision은 자리와 무관한 변화에도 오르므로(`queue-store.js`의 `applyMutation` 호출 27곳),
  CAS 충돌이면 새 스냅샷의 조언 자리(레인·바로 앞 항목)가 보인 자리와 같을 때 한 번만 조용히 다시
  보낸다. 자리가 달라졌으면 보내지 않고 새 조언과 "자리가 바뀌었습니다"를 한 줄 보인다. admission 거절은
  지금의 알림 그대로다.
- **전체 배치안**: 대기 열 머리에 `[전체 배치안]`·`[↻ 다시 판정]`과 판정 시각을 둔다. 전체 배치안을
  켜면 후보마다 번호 붙은 점선 카드를 그리고 대기 레인 아래에 표(번호·후보·배치안·근거·포함
  체크)를 둔다. 상태가 `ready`이고 경고가 없는 행만 처음부터 체크된다. `[전체 적용 (n)]`은 번호 순서로
  place를 하나씩 보내며 직전 결과의 revision을 쓰고, CAS 충돌은 `[적용]`과 같은 규칙(자리가 같으면 한 번
  재전송)으로 처리하며, 첫 거절이나 자리 변경에서 멈춰 넣은 수와 멈춘 이유를 보인다.
- **판정이 없을 때**: 상태가 `ready`가 아니면 `[추천 배치]`는 꺼진 채(disabled) 그려지고 title로 이유
  ("jev 판정 중 (3쌍 중 1쌍 완료)"·"jev 키 없음"·"jev 응답 없음")를 보인다. `[↴ 대기로]` 수동 배치는
  그대로 쓸 수 있다. 전체 배치안 표에서 `ready`가 아닌 후보는 "판정 전" 행으로 보이고 체크할 수 없다.
  `[전체 배치안]`은 `ready` 후보가 하나 이상일 때만 켜진다. scope가 없는 후보는 근거 상자에 "scope
  없음 — 경로 겹침은 확인하지 못함"을 단다.
- 조작은 `.op-btn`, 태그·표는 `docs/design-system.md` 부품으로만 그린다. 점선 카드는 레인 구성원이
  아니라 덧그림이라 드래그 대상이 아니다.
- 모니터 탭과 이슈 상세에는 `[추천 배치]`를 달지 않는다. parity §9 표에 행
  `| 추천 배치 | 있음 | 없음 | 저장소별 대기열을 보는 Worker 탭에서 정한다; 모니터는 [↴ 대기로] 수동 메뉴만 (UI-izba) |`을
  더한다.

### 4.9 실패와 내려가기

- jev를 못 쓰는 어떤 경우에도 `[↴ 대기로]` 수동 배치는 막지 않는다. `[추천 배치]`만 꺼진다.
- 키가 없으면 키 확인을 10분마다 한 번만 다시 하고, 그동안 쌍 판정은 대기열에 넣지 않는다.
- 위 미확인 전제대로 공유 서버에 키가 없다면, 키가 생기기 전까지 `[추천 배치]`는 늘 꺼져 있다.
  키 배포는 이 spec 범위 밖이다(§7).

## 5. 수용 기준

1. 배치 가능한 후보의 `[추천 배치]`를 누르면 대기 열에 점선 카드와 근거 상자가 뜨고, 그 순간 jev
   호출이 일어나지 않는다. 휴대폰 폭(390px)에서도 누르기로 같은 결과가 나온다.
2. `[↴ 대기로]`의 수동 레인 메뉴는 지금과 같게 동작한다.
3. `[적용]`은 상자에 보인 레인·index로 넣는다. 그 사이 큐가 바뀌어도 자리가 같으면 넣고, 자리가
   달라졌으면 넣지 않고 새 조언을 보인다.
4. 큐에 항목이 들어오고 나가도 캐시된 쌍은 다시 묻지 않는다. 이슈 본문이나 spec이 바뀐 쌍만 다시 묻는다.
5. blocks 의존·scope 겹침이 있는 쌍은 jev 답과 상관없이 고정 조건대로 배치된다.
6. 확신도 0.8 미만의 jev 답은 배치에 쓰이지 않는다.
7. 서로 부딪히는 두 후보는 전체 배치안에서 같은 직렬 레인에 순서대로 놓이고, `[전체 적용]`은 체크된
   행만 번호 순서로 넣는다.
8. 판정이 끝나지 않은 후보의 `[추천 배치]`는 꺼져 있고 이유를 title로 보이며, `[↴ 대기로]`는 그대로 동작한다.
9. 키와 이슈 본문은 브라우저 wire와 호출 기록에 나타나지 않는다.
10. 모니터 탭 카드 동일성 테스트가 §9 새 행과 함께 통과한다.

## 6. 테스트 범위

- 배치 계산(순수 함수): 규칙 1·2·3, `order_unsatisfiable`, `uncovered`, 고정 조건이 jev를 이김,
  임계 0.8, 점유 lineage의 `serial_lane_id`, 전체 배치안의 누적 계산.
- jev 클라이언트: 요청 모양(모델·질문·state), 응답 검사 실패 4종, 키 순서(env → secrets-get), 기록에
  키·본문 없음. 실제 HTTP 대신 fixture.
- 캐시·일정: digest 변경 시에만 재판정, 고정 조건 쌍 제외, 3초 묶음, 동시 2개, 실패 10분, 재시작 뒤 재사용, `↻ 다시 판정`.
- wire: `placement_advice`·`placement_plan` 장식, 필드 없는 구서버에서 `[추천 배치]` 미표시.
- 화면: `[추천 배치]` 누름으로 상자 열기·닫기, `[↴ 대기로]` 메뉴 불변, 390px 폭 누르기, 점선 카드, `[적용]`이 lane·index·revision을 보냄, CAS 충돌 무재시도,
  전체 배치안 체크 기본값과 순차 적용·중단, `ready`가 아닐 때 버튼 꺼짐과 사유 title·"판정 전" 행.
- cross-runtime: 서버 상수(모델·엔드포인트·시간 제한)가 dotfiles `judge-questions.yaml` policy와 같다
  (dotfiles가 없으면 건너뜀).

## 7. 경계·후속

- 크로스 리포 unit: dotfiles — `docs/agents/secrets.md`의 `typesafe/api-key` 소비자 목록에 beads-ui
  서버를 더한다(선행 아님, `discovered-from` 출처만).
- 공유 서버가 jev 키를 읽지 못하는 문제(§2 미확인)는 이 spec이 고치지 않는다. 원인 확인과 키 배포는
  사용자 확인 뒤 별도로 정한다.
- 이슈 상세 패널 `[대기로]`의 미리보기는 이번 범위 밖이다.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — beads-ui는 dotfiles 계약 파일을 런타임에 읽지 않고 필요한 값을 코드 registry로 두며 동등성은 cross-runtime 테스트로 본다.
- 전제: ADR dotfiles/dotfiles-hkski — jev를 직접 부르는 소비자는 질문 정의를 자기 쪽에 두고 모델·엔드포인트·시간 제한은 workflow 판정 값을 쓰며 키는 `TYPESAFE_API_KEY` → `secrets-get` 순서다.
- Worker 대기열 배치 추천을 서버가 jev 쌍 판정 캐시와 고정 조건으로 계산해 미리보기로만 보여 주고, 레인에는 사람이 `[적용]`·`[전체 적용]`을 누를 때만 쓴다. (1) 되돌리기 어려움: worker-queue wire 필드 `placement_advice`·`placement_plan`, 카드 슬롯 6의 `[추천 배치]`, Worker 탭 화면, 저장된 쌍 캐시, jev 키 소비가 함께 움직이고 UI-u6ud-5의 "병렬성 분석 기능은 없다" 조항을 뒤집는다. (2) 맥락 없이 의외: 비슷한 기능을 ADR 0009로 지운 뒤 다시 들인다. 실제 제거 이유는 신뢰가 아니라 느림·실시간 불가였다(사용자 증언, 0009 본문 기록과 다름). (3) 실제 트레이드오프: 자동 호출 비용과 이슈 본문의 외부 전송 대 사람이 매번 배치하는 부담. `summary`: "Worker 대기열 배치 추천은 서버가 jev 쌍 판정(두 이슈 재료 digest로 캐시)과 고정 조건(blocks·scope 겹침)으로 계산해 Worker 탭 후보 카드의 별도 [추천 배치] 버튼을 누를 때 점선 미리보기로 보이고([↴ 대기로] 수동 메뉴는 그대로) 레인에는 사람의 [적용]·[전체 적용]만 쓴다; 큐 변화는 jev를 부르지 않고 추천은 blocks 의존을 쓰지 않으며 질문 정의는 beads-ui 서버에 둔다; UI-u6ud-5의 나머지 조항(배포·빌드)은 그대로다" → ADR, supersede UI-u6ud-5
- 확신도 기준 0.8·묶음 3초·실패 10분·동시 2개는 서버 상수다 — 되돌리기 쉬움 → ADR 아님
- 모니터 탭에는 미리보기를 달지 않는다 — 기본 제외(parity §9 표가 정본으로 기록) → ADR 아님
- 새 서버 모듈을 `server/placement/` 아래에 둔다 — 내부 구조 → ADR 아님

## 9. 기각한 대안

- dotfiles workflow 판정에 pack을 새로 두고 서버가 `workflow-judge.py`를 spawn: pack·호출 상한·로그가
  Bead 하나 기준의 workflow 판정 지점이라 쌍 질문과 맞지 않고, dotfiles ADR(pack 목록)·계약 검사기를
  함께 바꿔야 하며, shadow 기간에는 조언이 비고, 호출마다 Python을 띄운다.
- 버튼을 눌러야 분석: 0009를 지운 이유(느림·실시간 불가)를 되풀이한다.
- 이슈 생성 때만 판정: 배치는 그때의 큐에 달려 있어 곧 낡는다. 쌍 판정 캐시 + 재계산으로 대신한다.
- 볼 때 jev 호출: 0.4~0.9초 지연과 불필요한 호출이 생긴다.
- 커서를 올려 미리보기 열기: 휴대폰·아이패드에서 쓸 수 없다(사용자 결정 8).
- `[↴ 대기로]`에 추천을 합치기: 수동 레인 메뉴의 동작이 바뀐다(사용자 결정 7).
- 하루 호출 상한: 같은 쌍·같은 재료를 다시 묻지 않는 캐시로 호출 수가 이미 묶인다(사용자 결정 9).
- `[적용]`이 blocks 의존까지 쓰기: 잘못된 판정이 구현 진입을 막는다(사용자 결정 4).
