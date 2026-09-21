---
scope:
  - server/worker/compare-projection.js
  - server/ws/worker-handlers.js
  - app/utils/exec-settings-chip.js
  - app/views/compare/index.js
  - app/views/worker/lane-model.js
  - app/styles.css
  - app/protocol.md
  - docs/superpowers/specs/2026-09-08-monitor-history-material-design.md
  - docs/superpowers/specs/2026-09-15-compare-tab-redesign-design.md
---

# UI-obl0 — 유닛이 엇갈린 실행을 미기록에서 떼어내 혼합으로 드러내고 세션 행에 구성을 적는다

## 1. 배경과 관측 (HEAD `5603156`)

`server/worker/compare-projection.js`의 `implActorOf`는 다중 unit 영수증
(`checks.units`)에서 유닛 실행자가 하나라도 다르면 `kind='missing'`을 돌려준다.
그 값을 비교 탭의 묶기 축·구성 줄과 모니터·워커 완료 타일의 워커 칩이 함께 읽으므로
(`server/ws/worker-handlers.js`의 `decorateQueue`가 종료 attempt 복사본에 붙인다),
**서로 다른 실행자로 돈 attempt**와 **영수증이 없거나 깨진 attempt**가 같은 `미기록`
한 칸에 들어간다.

관측(수집 2026-09-21, `~/.local/state/bdui` 전수 스캔):

| 항목 | 건수 |
| --- | --- |
| 스캔한 attempt | 878 |
| `receipt_check` 보유 | 337 |
| `checks.exec_receipt` 보유 | 252 |
| `checks.units` 보유 | 49 |
| 유닛 2개 이상 | 48 |
| 유닛 실행자 일치 | 45 |
| 엇갈림 또는 파싱 불가 | 3 |

엇갈린 3건의 성격이 서로 다르다.

- `UI-yue8` — `gpt-5.6-sol/high`, `gpt-5.6-sol/xhigh`, `gpt-5.6-sol/high`. 모델은
  하나이고 effort만 갈렸다. 지금은 "모델이 무엇이었나"까지 통째로 사라진다.
- `UI-cmx3` — `sol/high`, `terra/medium`, `opus/default`, `opus/default`. 모델부터
  갈렸다.
- `PROSTATE-6j9` — 두 유닛 모두 `{ unit, malformed: true }`. 실행자가 엇갈린 것이
  아니라 영수증 형식이 깨진 것이다.

영수증 항목의 모양은 `server/worker/receipt-check.js`가 만든다: 정상 유닛은
`{ unit, kind, actor, effort, sha, ancestry }`, 형식 위반 유닛은
`{ unit, malformed: true }`다.

비교 탭 세션 행(`app/views/compare/index.js`의 `attemptRowTemplate`)은 점·제목·결과
문구·문제 칩·시간·비용만 그리고 **실행 구성은 한 글자도 보이지 않는다**. 재료는 이미
클라이언트에 있다 — `wireRows`가 떼어내는 것은 `attempt`·`human_summaries`·
`representative`와, 일반 비교 행에 한해 `verify_source`뿐이라
`orchestration`·`impl_actor`·`composition`은 그대로 실려 온다.

## 2. 결정

### 2.1 판정 — `implActorOf`

`ImplActor.kind`에 `mixed`를 더한다. 판정 순서는 그대로 두고 합의 검사만 바꾼다.

1. 유닛 중 하나라도 파싱할 수 없으면(`malformed`, `kind`/`actor` 부재) `missing`.
   영수증 부재·손상은 실행자가 엇갈린 사실이 아니라 **읽을 수 없는 기록**이므로
   지금 자리에 그대로 남는다.
2. 유닛 실행자 라벨이 모두 같으면 지금처럼 그 단일 실행자(`main` 또는 `delegated`).
3. 갈리면 `mixed`.

유닛 실행자 라벨은 기존 `parseActorEntry`의 것을 그대로 쓴다 — `main`은 `main`,
`delegated`는 effort가 있으면 `<actor>/<effort>`, 없으면 `<actor>`.

### 2.2 라벨과 `parts`

`mixed`의 표시 라벨은 **갈린 축만** 말한다.

- 모든 유닛이 `delegated`이고 `actor`가 하나로 같으면(effort만 갈림):
  `label = "<actor>/혼합"`, `model = <actor>`, `effort = null`.
- 그 밖(모델이 갈리거나 `main`과 `delegated`가 섞임):
  `label = "혼합 <n>종"`, `model = null`, `effort = null`.
  `<n>`은 **중복을 제거한** 유닛 실행자 라벨의 개수다.

`ImplActor`에 `parts: Array<{ unit: string, label: string }>`를 더한다. 영수증에
적힌 유닛 순서를 그대로 보존하며, `mixed`에만 존재하고 다른 `kind`에는 없다.
툴팁과 묶기 키가 모두 이 한 재료에서 나온다 — 라벨을 되파싱하는 소비자는 두지
않는다.

### 2.3 비교 탭 묶기 축

`groupIdentity`의 `impl_actor` 축에서 `mixed`는 **같은 구성끼리** 한 그룹이다. 지금
코드는 키와 이름이 같은 문자열인데, `혼합 3종`은 구성이 달라도 같은 문자열이 되므로
둘을 가른다.

- 키: `mixed:` + `parts`의 라벨을 중복 제거·사전순 정렬해 `+`로 이은 것.
  예 `mixed:opus/default+sol/high+terra/medium`.
- 이름: 2.2의 라벨.

`main`·`missing`·`delegated`의 키와 이름은 바뀌지 않는다. 이름이 같은 `혼합 n종`
카드가 둘 이상 설 수 있다. 그룹 카드 머리의 구성 줄은 같은 라벨을 쓰므로 그 둘을
가르지 못하며, 구분은 카드를 펼친 뒤 세션 행의 구성 줄 툴팁이 한다(2.4). 그룹 카드
쪽 툴팁은 바꾸지 않는다.

### 2.4 비교 탭 세션 행에 구성 줄을 둔다

`attemptRowTemplate`이 그리는 세션 행에 구성 줄을 더한다. 문법은 그룹 카드의 구성
줄과 같은 `<orch_model>/<orch_effort> → <impl_actor.label>`이고, 값은 서버가 이미
보내는 `row.composition` 그대로다 — 클라이언트에서 다시 조립하지 않는다.

- 데스크톱: 제목 줄 아래 보조 줄. 그룹 카드 구성 줄과 같은 모노스페이스·회색이며,
  제목과 왼쪽을 맞춘다.
- 모바일(≤640px): 선행 스펙 §3.4의 3행 격자에 네 번째 행으로 붙는다 —
  `점 | 구성 줄`.
- `impl_actor.kind === 'mixed'`이면 그 줄의 `title`에 `parts`를 `<unit>: <label>`
  한 줄씩 적는다. 다른 `kind`에는 툴팁이 없다.
- 재료가 없는 줄은 그리지 않는다: `composition`이 빈 문자열이면 줄을 생략한다.

`bench` 표의 행(`benchAttemptRowTemplate`)은 열 구조가 고정된 표라 바꾸지 않는다.

### 2.5 완료 타일의 워커 칩

`formatImplActorChip`은 `mixed`에서 `text = impl_actor.label`인 칩을 돌려주고,
툴팁에 기존 첫 줄(`워커(구현 위임) — 이 attempt의 보존 영수증에 기록된 실제 구현
주체`) 아래로 `parts`를 `<unit>: <label>` 한 줄씩 잇는다. 칩이 서는 자리는 슬롯 5의
기존 워커 exec 칩 그대로이며 새 슬롯·새 줄은 만들지 않는다(ADR 0014, 카드 문법 스펙
§5.1). `missing`과 필드 부재는 지금처럼 `null`이라 칩이 서지 않는다.

### 2.6 프리셋 역추론은 바꾸지 않는다

`presetMatch`는 `impl_actor.kind === 'delegated'`일 때만 구현 축을 점수에 쓴다.
`mixed`는 그 조건에 들지 않으므로 지금의 `missing`과 같은 취급을 자동으로 받는다 —
한 프리셋이 여러 실행자를 낳았다면 그 프리셋의 구현 값과 실행자 하나를 대조하는 일이
성립하지 않기 때문이다. 코드 변경 없음을 여기 결정으로 적는다.

### 2.7 전송 필드와 호환

`impl_actor`는 지금도 비영속 전송 필드이고 이 결정은 Bead metadata·저장된
attempt·workflow 상태 어휘를 늘리지 않는다(ADR 0012). `app/protocol.md`의 두 곳을
고친다: attempt의 `impl_actor` 문단(`kind`에 `mixed` 추가, `parts` 기술,
"disagreeing multi-unit receipt produces NO field" 문장 교체)과 비교 행 문단
(`impl_actor` 모양, 묶기 키에 혼합 키 추가).

옛 서버·모르는 `kind`는 fail-quiet이다. `formatImplActorChip`은 아는 `kind`가
아니면 `null`을 돌려주는 기존 경로가 그대로 답이고, 비교 뷰의 구성 줄은 서버가 준
문자열만 그린다.

## 3. 정본 반영 문구

구현 PR에서 다음 두 문단을 각 소유 스펙에 넣는다.

`docs/superpowers/specs/2026-09-08-monitor-history-material-design.md` §5.1의
마지막 항목:

> 정정(UI-obl0). 유닛 실행자가 엇갈린 영수증은 `missing`이 아니라 `mixed`이며,
> 갈린 축만 말하는 라벨(`<actor>/혼합` 또는 `혼합 n종`)과 유닛별 `parts`를 싣는다.
> `missing`은 영수증 부재·손상·유닛 파싱 실패에만 남는다. 완료 행의 워커 칩은
> `mixed`에서 그 라벨로 서고 툴팁이 유닛별 실행자를 적는다.

`docs/superpowers/specs/2026-09-15-compare-tab-redesign-design.md` §3.3과 묶기 키
목록:

> 정정(UI-obl0). 세션 행은 구성 줄 `<orch_model>/<orch_effort> → <impl_actor>`를
> 제목 아래 보조 줄로(모바일은 격자 네 번째 행으로) 그린다. `group_by=impl_actor`의
> 키는 `main` · `<actor>/<effort>` · `미기록`에 더해 혼합 구성 서명
> `mixed:<정렬된 유닛 실행자 목록>`을 갖고, 그 카드 이름은 `<actor>/혼합` 또는
> `혼합 n종`이다.

## 4. 검증 (Test scope)

- `server/worker/compare-projection.test.js`
  - effort만 갈린 유닛 셋이 `kind='mixed'`, `label='sol/혼합'`, `model='sol'`인지.
  - 모델이 갈린 유닛 넷이 `label='혼합 3종'`(중복 제거 후 3종)인지.
  - `main`과 `delegated`가 섞이면 `혼합 2종`인지.
  - `{ unit, malformed: true }`가 하나라도 있으면 여전히 `missing`인지.
  - 유닛 실행자가 모두 같은 기존 경로가 단일 실행자 그대로인지(회귀).
  - 서로 다른 혼합 구성 두 행이 서로 다른 그룹 키를 얻고, 같은 구성 두 행은 한
    그룹으로 묶이는지.
- `app/utils/exec-settings-chip.test.js` — `mixed`가 라벨 칩을 돌려주고 툴팁에
  유닛별 줄이 들어가는지, 모르는 `kind`는 `null`인지.
- `app/views/compare/index.test.js` — 세션 행에 구성 줄이 서는지, `composition`이
  비면 줄이 없는지, `mixed` 행의 구성 줄 `title`에 유닛별 줄이 들어가는지.
- 전체 번들: `npm run tsc`, `npm run lint`,
  `npx vitest run --reporter=dot`.

## 5. 경계·비목표

- 결정: `presetMatch`의 점수 규칙은 바꾸지 않는다 — 한 프리셋과 여러 실행자의 대조가
  성립하지 않기 때문이다(2.6).
- 결정: `checks.units`를 만드는 `server/worker/receipt-check.js`의 판정·위반 코드는
  바꾸지 않는다 — 이 작업은 이미 기록된 영수증을 읽는 쪽만 다룬다.
- 결정: `미기록`이라는 말 자체와 다른 축(`orchestration`)의 `미기록` 처리는 바꾸지
  않는다.
- 비목표: bench 표의 열 구조, 비교 탭의 필터·기간·문제 기준, 워커·모니터 카드의 다른
  슬롯.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 기존 workflow 영수증을 소비할 뿐 새 metadata 키·상태 어휘를
  만들지 않고, 전송 전용 파생 필드로만 표현한다.
- 전제: ADR 0014 — 완료 타일의 워커 칩은 슬롯 5의 기존 exec 칩 자리를 그대로 쓰고
  새 슬롯을 만들지 않는다.
- 전제: ADR UI-j10d — 완료 행은 그 완료를 만든 attempt의 실행 사실을 말하며 현재
  핀·전역 기본값으로 대체하지 않는다.
- 유닛이 엇갈린 실행을 `missing`에서 떼어내 `mixed`로 드러낸다: 되돌리기 어려움
  불성립(전송 전용 파생 필드이며 저장 상태가 없다), 맥락 없이는 놀라움 성립(정본 스펙
  두 곳이 "서로 다른 구현 주체는 `missing`"이라고 명시해 두어 문서만 읽은 소비자는
  반대로 안다), 실질 트레이드오프 성립(표본을 하나로 뭉쳐 축을 단순하게 두는 쪽과
  실제 구성을 드러내 그룹이 늘어나는 쪽),
  `summary`: "유닛 실행자가 엇갈린 attempt는 미기록이 아니라 갈린 축만 말하는 혼합으로 표시하고 미기록은 영수증 부재·손상에만 남긴다" → ADR
- 비교 탭 세션 행의 구성 줄: 되돌리기 어려움 불성립(표시 줄 하나), 맥락 없이는
  놀라움 불성립(그룹 카드가 이미 같은 문법의 구성 줄을 쓴다), 실질 트레이드오프
  불성립(재료가 이미 전송되고 있고 새 조회가 없다) → ADR 아님
