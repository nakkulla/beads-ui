---
scope:
  - app/views/worker/candidate-sort.js
  - app/views/worker/candidate-sort.test.js
  - app/views/worker/blocker-ids.js
  - app/views/worker/index.js
---

# Worker 후보 레인 — 의존 인접화 (UI-q1y7)

## 1. 문제

후보 레인의 순서는 정렬 체인 하나가 정한다(UI-d13v §4.1, UI-8ham). 그래서
`blocks`로 묶인 선행과 후행이 목록 여기저기에 흩어진다. `최신 수정` 정렬에서
후행을 방금 건드렸으면 후행이 위, 선행이 한참 아래에 서고, 그 둘이 한 줄기라는
사실은 카드를 하나씩 열어 봐야 안다.

`⛓ blocked: <id>` 칩이 선행 ID를 적기는 한다(`app/views/worker/index.js`
`blockerIdsOf`). 하지만 칩은 "누가 막고 있다"만 말하고, 그 선행이 같은 화면
어디에 있는지는 말하지 않는다. 사용자는 ID를 눈으로 들고 목록을 위아래로
훑어야 한다.

체인이 답하는 질문("무엇부터 볼까")과 이 문제가 묻는 질문("이 둘은 한 줄기인가")은
다르다. 체인 키를 하나 더 만들어서는 풀리지 않는다 — "A는 B 뒤"는 두 원소만 보고
정할 수 없는 관계라 비교기로 표현하면 `Array.sort`가 요구하는 이행성이 깨진다.

## 2. 확정 결정

1. 체인 정렬 **뒤에** 재배치 패스를 한 번 돌려, 후행을 자기 선행 바로 뒤로 옮긴다.
   체인 정렬 자체는 그대로다.
2. **선행은 체인이 준 자리를 지키고, 후행이 끌려 온다.** 선행을 후행 쪽으로
   내리지 않는다.
3. 모든 프리셋과 커스텀 체인에 **항상** 적용한다. 켜고 끄는 조작을 두지 않는다.
4. 시각 표시는 추가하지 않는다. 순서만 바뀐다 — 카드 문법 스펙
   (`2026-08-25-card-header-grammar-unify-design.md`)과 Monitor 공유 렌더러는
   무변경이다.
5. 서버는 무변경이다. 재배치에 필요한 edge는 후보 행이 이미 싣고 있다.

UI-8ham의 "순서는 체인만이 정한다"는 이 범위에서 정정된다(§6). blocked를 하단에
고정하던 옛 규칙으로 되돌아가는 것이 **아니다** — blocked라는 사실은 여전히
순서에 손대지 않고, 순서를 움직이는 것은 "그 선행이 같은 화면에 있다"는 사실뿐이다.

## 3. 순서 규칙

체인 정렬 결과를 `base`라 하자. 결과 배열을 다음과 같이 만든다.

1. `base`를 앞에서부터 훑어, **선행이 모두 배치된** 첫 이슈를 결과에 넣는다.
2. 하나를 넣은 직후, 그것을 선행으로 두는 후행 중 선행이 전부 채워진 것을
   `base` 순서대로 바로 뒤에 이어 붙인다. 이 연쇄는 재귀적이다.
3. 배치되지 않은 이슈가 남아 있으면 1로 돌아간다.

### 3.1 두 기준 사례

| `base` (체인 순서) | 결과 | 왜 |
|---|---|---|
| C, **B**(후행), D, **A**(선행) | C, D, **A**, **B** | B는 선행 A가 아직 없어 건너뛴다. A가 배치되는 순간 B가 딸려 온다 |
| **A**(선행), B, C, **D**(후행) | **A**, **D**, B, C | A 배치 직후 D가 딸려 온다. A는 1위를 지킨다 |

### 3.2 파생 규칙

따로 정하지 않아도 §3의 규칙에서 나온다.

- **다중 선행**: 선행이 *전부* 배치돼야 하므로, 후행은 가장 마지막 선행 뒤에 선다.
- **다단 체인 A→B→C**: 연쇄가 재귀적이라 A, B, C가 연속으로 붙는다.
- **선행이 후보 레인에 없을 때**(큐에 들어갔거나 닫혔거나 Phase child라 걸러졌을
  때): 그 선행은 §4.2의 교집합에서 빠지므로 후행은 체인 자리에 그대로 남는다.
- **`blocks`가 아닌 edge**(`related`, `discovered-from`): 순서를 움직이지 않는다.
  `blockerIdsOf`가 `blocks`만 골라 주기 때문이다.

### 3.3 사이클

서로를 기다려 아무도 배치되지 못하는 상태가 되면, 남은 것 중 `base` 첫 번째를
선행 조건을 무시하고 배치한 뒤 §3을 계속한다(fail-quiet). 순서가 그 구간에서
의미를 잃을 뿐, 목록이 잘리거나 루프가 멈추지 않는다. bd가 `blocks` 사이클을
막는지는 이 스펙이 판단하지 않는다 — 클라이언트 정렬은 어떤 입력에도 전체를
반환해야 한다.

## 4. 구현

### 4.1 `blockerIdsOf` 추출

`blockerIdsOf`는 지금 `app/views/worker/index.js`에 있다. 정렬 모듈이 그것을
import하면 `index.js → candidate-sort.js → index.js` 순환이 된다. 함수 본문을
그대로 `app/views/worker/blocker-ids.js`로 옮기고 두 쪽이 import한다. 동작·사다리
순서·fail-quiet은 바뀌지 않는다.

사다리는 이미 두 단이다: 서버가 합성한 `blocked_info.blockers`(미해소 `blocks`
선행 id만)를 먼저 읽고, 그 객체가 통째로 없는 구형 서버에서는 embedded
`dependencies`의 `blocks` 타입 edge에서 `depends_on_id`를 읽는다.

### 4.2 `applyCandidateSort`

시그니처는 그대로다. edge를 이슈 객체가 들고 있으므로 호출 측
(`app/views/worker/index.js` `buildModel`)이 새로 넘길 것이 없다.

```js
export function applyCandidateSort(issues, state) {
  const base = (Array.isArray(issues) ? issues.slice() : []).sort(
    cmpChain(chainOf(state))
  );
  return groupByDependency(base);
}
```

`groupByDependency(base)`는 같은 모듈의 비공개 함수다.

1. `base`의 id 집합을 만들고, 각 행의 `blockerIdsOf`를 그 집합과 교집합해
   `preds`를 얻는다 — 후보 레인 밖의 선행은 여기서 사라진다.
2. `preds`를 뒤집어 `dependents`(선행 id → 후행 행들, `base` 순서)를 만든다.
3. §3의 훑기와 연쇄를 돌려 **새 배열**을 반환한다. 입력 배열은 변형하지 않는다.

### 4.3 규모

후보 피드 상한은 `SNAPSHOT_LIST_LIMIT = 1000`이고 실제 후보 레인은 그보다 훨씬
작다. 다음에 배치할 행을 매번 앞에서부터 찾는 최악 O(n²)는 이 규모에서 문제가
아니므로, 인덱스 자료구조를 더 얹지 않고 읽기 쉬운 쪽을 택한다.

## 5. 테스트

`app/views/worker/candidate-sort.test.js`의 `describe('applyCandidateSort …')`에
추가한다. 기존 파일의 setup → execution → assertion 형태를 그대로 따른다.

| 테스트 | 확인하는 것 |
|---|---|
| 후행이 선행 위에 있으면 선행 뒤로 내려간다 | §3.1 1행 |
| 선행은 자리를 지키고 후행이 그 밑으로 올라온다 | §3.1 2행 |
| 선행이 둘이면 마지막 선행 뒤에 선다 | §3.2 다중 선행 |
| A→B→C가 연속으로 배열된다 | §3.2 다단 체인 |
| 선행이 목록에 없으면 후행은 체인 자리에 남는다 | §3.2 큐에 들어간 선행 |
| 사이클이 있어도 모든 이슈를 반환한다 | §3.3 fail-quiet |
| `blocked_info`가 없으면 `dependencies`로 같은 순서를 낸다 | §4.1 사다리 2단 |
| `spec` 프리셋에서도 후행이 선행 뒤로 붙는다 | §2-3 항상 적용 |
| 입력 배열을 변형하지 않는다 | §4.2 기존 계약 |

`blocker-ids.js`는 본문을 그대로 옮기는 추출이라 별도 테스트 파일을 만들지
않는다 — 위 두 사다리 테스트가 새 모듈을 직접 태우고, 기존
`app/views/worker/index.test.js`가 `⛓ blocked` 칩 경로를 그대로 커버한다.

검증은 Pre-handoff 번들(`npm run tsc` · `npx vitest run --reporter=dot` ·
`npm run lint` · `npm run prettier:write` · `npm run build`)이다. 순서 규칙은 위
단위 테스트가 정확히 판정하므로 화면 확인을 필수 검증으로 두지 않는다.

## 6. 문서 정정

- `docs/superpowers/specs/2026-08-27-worker-candidate-sort-chain-release-chips-design.md`
  §2-5와 §4.1의 "순서는 체인만이 정한다"에, UI-8ham이 그 앞 문장에 붙였던 것과
  같은 방식으로 UI-q1y7의 정정 줄을 단다. 결정을 지우지 않고 계보를 남긴다.
- `app/views/worker/candidate-sort.js`의 `applyCandidateSort` JSDoc과
  `app/views/worker/index.js`의 "정렬 체인만이 렌더 순서를 정한다" 한글 주석을
  이 스펙에 맞춘다.
- `AGENTS.md`는 카드 *배치 문법*만 소유하고 정렬 규칙을 담고 있지 않아 무변경이다.

## 7. 비목표

- Monitor 탭·Board 탭의 순서. 이 재배치는 후보 레인 전용이다.
- 묶음의 시각 표시(들여쓰기·테두리·연결선)와 카드 문법 슬롯 표 변경.
- `⛓ blocked` 칩·`blocked_info`·서버 admission 판정 변경.
- 정렬 체인 키·프리셋·저장 형식 변경.
- 후보 레인 드래그(UI-d13v §6에서 제거된 그대로 둔다).

## 8. 경계·후속

형제 Bead 없음. Bead는 하나다.

## 9. 결정 (ADR 후보)

- **후보 레인 순서는 체인 + 의존 인접화가 함께 정한다(선행 고정, 후행이 따라온다)**
  — 되돌리기 어려운가: **아니오**(클라이언트 정렬 함수 하나, 남는 상태 없음,
  되돌리면 즉시 이전 순서). 맥락 없이 놀라운가: **예**(직전 UI-8ham 결정을 뒤집어
  보인다). 실질적 트레이드오프인가: **예**(체인의 의도를 국소적으로 깬다).
  세 조건 중 둘만 성립하므로 ADR로 올리지 않는다. 뒤의 두 조건은 §6의 정정 줄이
  받아낸다.
