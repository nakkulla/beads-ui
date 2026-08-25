---
scope:
  - app/utils/session-preferred.js
  - app/utils/session-preferred.test.js
  - app/utils/worker-eligibility.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/styles.css
  - app/protocol.md
---

# UI-49mc — `session-preferred` advisory 라벨의 beads-ui 소비자 표면

- Bead: UI-49mc
- 라우트: spec_backed
- 날짜: 2026-08-25
- 상위 계약: dotfiles `dotfiles-oqzc` — `docs/superpowers/specs/2026-08-25-session-preferred-advisory-label-design.md`
  @ `01f792c62c81d6b2a1e779454213e6dfdfe99f49` (spec_review=codex@동일 SHA, Bead closed)

## 1. 배경

dotfiles 계약이 `labels.scheduling.session-preferred`(meaning
`worker_permitted_session_recommended`, `gate_bound: false`,
`consumer: beads-ui-worker-only`)와 짝 metadata `session_preferred_reason`
(enum `[exclusive_machine]`)를 등록했다. "워커로 돌릴 수는 있지만 세션이 낫다"를
표시하는 신호이며, `worker-ineligible`의 차단 집행과는 별개다.

beads-ui는 이 계약의 **소비자**다. 이 스펙은 상위 스펙 §7이 beads-ui에 넘긴 요구를
이 저장소의 실제 코드 표면에 배정한다. 계약 자체(라벨 어휘·enum·pairing 규칙)는
dotfiles가 소유하며 여기서 정의하지 않는다.

계약이 정한 판정 규칙 세 가지를 그대로 소비한다.

- 라벨은 있는데 사유가 없거나 enum 밖이면 **부착 무효** — 라벨을 무시하고 경고 없이
  평범한 카드로 그린다.
- 사유는 있는데 라벨이 없으면 무시한다. 오류가 아니다.
- `worker-ineligible`이 함께 있으면 차단이 이긴다. 소비자는 `worker-ineligible`
  표현만 그리고 이 라벨의 칩을 그리지 않는다.

## 2. 판정 모듈 — `app/utils/session-preferred.js` (새 파일)

`app/utils/worker-serial.js`와 같은 모양의 형제 모듈이다: `workerLabels`만 가져다
쓰는 라벨 상수 + 술어.

```js
import { workerLabels } from './worker-eligibility.js';

export const SESSION_PREFERRED_LABEL = 'session-preferred';
export const SESSION_PREFERRED_REASONS = ['exclusive_machine'];

export function sessionPreferredReason(labels, metadata) // 유효 부착이면 사유, 아니면 ''
export function isSessionPreferred(labels, metadata)     // sessionPreferredReason(...) !== ''
```

`sessionPreferredReason`은 라벨 포함 여부와 `metadata.session_preferred_reason`이
`SESSION_PREFERRED_REASONS` 안의 문자열인지를 **함께** 본다. 둘 중 하나라도 어긋나면
`''`이다. `metadata`가 없거나 객체가 아니어도 던지지 않고 `''`이다.

`isSessionPreferred`는 그 결과의 얇은 boolean 래퍼다 — Bead 요구 1이 이 이름을
지정했고, 투영은 사유 문자열도 필요하므로 라벨/enum 검사가 한 곳에만 살게 하려면
사유 반환 함수가 아래에 있어야 한다.

### 왜 `worker-eligibility.js` 안이 아닌가

상위 스펙이 이 라벨을 eligibility와 **구조적으로 분리**하라고 명시했다. 그리고
`worker-eligibility.js`는 서버가 import하는 파일이다 —
`server/worker/runnable-cache.js`의 `qualify()`와 `server/worker/scheduler.js`의
admission·dispatch 가드가 여기서 `isWorkerIneligible`을 가져간다. advisory 술어를
그 파일에 두면 다음 독자가 admission에 엮을 자리를 그 파일 안에서 찾게 된다.

`worker-serial.js`가 이미 같은 판정으로 갈라져 나온 형제다(scheduling 라벨,
`workerLabels` 재사용, 서버 admission과 무관).

## 3. 투영 — `app/views/worker/index.js` 후보 row

`candidate_rows` 매핑에 두 플래그를 더한다. `worker_ineligible` 계산 **뒤**다.

```js
const session_preferred_reason =
  worker_ineligible || !Object.hasOwn(it, 'labels')
    ? ''
    : sessionPreferredReason(/** @type {any} */ (it).labels, /** @type {any} */ (it).metadata);
const session_preferred = session_preferred_reason.length > 0;
```

두 가지가 이 자리에서 결정된다.

**우선순위는 투영이 접는다.** 템플릿이 아니라 여기서 `worker_ineligible`을 이기게
하면 카드·테스트·미래의 다른 소비자가 각자 우선순위를 다시 판정할 일이 없다.
`worker_ineligible`이 참이면 `session_preferred`는 항상 false로 투영된다.

**라벨 부재는 fail-quiet.** `Object.hasOwn(it, 'labels')` 가드는
`worker_ineligible`이 쓰는 것과 같다 — 라벨을 안 싣는 구버전 서버 payload에서 이
플래그가 조용히 꺼진다.

`eligible` · `draggable` · `reason` · `has_spec` 등 기존 필드 계산은 한 글자도 바뀌지
않는다. 이 플래그는 어떤 자격 판정에도 입력되지 않는다.

### 서버 변경이 필요 없는 근거

후보 레인의 원천은 `runnable` 캐시가 아니라 `tab:worker:ready` /
`tab:worker:blocked` 보드 컬럼이며, 이 행들은 원본 `bd` 필드를 보존한다. 같은 매핑이
이미 `it.metadata.route`와 `it.labels`를 읽고 있다는 사실이 `labels`와 `metadata`가
클라이언트까지 실려 온다는 증거다. 따라서 `server/worker/runnable-cache.js`,
`server/ws.worker-queue.js`, admission은 이 변경에서 손대지 않는다.

## 4. 카드 — `candidateCard` (`app/views/worker/lanes.js`)

### 4.1 자리

`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §5.1 슬롯
표의 판정을 그대로 받는다. 이 칩은 **1번 정체성 줄**이다.

- 4번("지금 갈 수 있나")이 아닌 이유: 계약이 `gate_bound: false`인 advisory로 못박아
  워커 admission을 막지 않는다. `quick_fix` self-review 칩이 같은 근거로 1번에 선 것과
  같은 판정이다.
- 5번(좌표)이 아닌 이유: 레포·레인·route처럼 이 카드를 분류하는 좌표가 아니라 이
  카드의 상태다.

같은 판정으로 1번에 서 있는 `worker-ineligible`과 짝이며, 계약상 **상호배타**이므로
두 칩은 자리를 나눠 갖지 않고 **같은 자리 하나의 삼항**을 쓴다. 머리줄 순서는
그대로다: `[⠿ grip] [ID] [P n] [라벨 칩] [quick_fix 리뷰 칩]`.

```
${worker_ineligible
  ? html`<span class="… worker-card__ineligible" …>worker-ineligible</span>`
  : session_preferred
    ? html`<span class="ctl-chip ctl-chip--label worker-card__session-preferred"
             title=${SESSION_PREFERRED_TOOLTIP[item.session_preferred_reason]}
             >세션 권장</span>`
    : ''}${quickFixReviewChipTemplate(workflow)}
```

### 4.2 툴팁

사유 → 문구 매핑 상수 `SESSION_PREFERRED_TOOLTIP` 하나를 `lanes.js` 안에 둔다.

| 사유 | 툴팁 |
|---|---|
| `exclusive_machine` | `실행 중 머신 독점 필요 — 부하 하네스·timing 비교` |

enum 밖 사유는 §2 술어가 이미 걸러 투영에서 `''`이 되므로 이 매핑에 도달할 수 없다.
매핑이 비면(방어) 툴팁 없이 칩만 그린다 — 던지지 않는다.

### 4.3 그리지 않는 것

- 카드 음영·테두리 변화 없음. `worker-card--ineligible` 같은 root 클래스를 추가하지
  않는다. 이 저장소에서 카드 음영은 이미 "실행 불가"를 뜻하도록 학습돼 있고, 이
  라벨은 실행을 막지 않는다.
- `draggable` 속성, `대기로 ↴` 버튼의 `disabled`와 `title`, `place_menu` 노출 조건은
  전부 불변이다.
- `⛔` 글리프는 현재 코드에 없다. UI-8881이 좁은 레인(min-width 220px)에서 머리줄을
  다 먹는다는 이유로 걷어냈고, `worker-ineligible`은 라벨 텍스트 칩 + 카드 음영으로
  그린다. 상위 Bead 설명의 "⛔만 그린다"는 그 표현을 가리키는 것으로 읽는다.

### 4.4 `MiniItem` typedef

두 속성을 선택적으로 추가하고, 기존 `worker_ineligible` 주석과 같은 밀도로 의미를
적는다.

- `session_preferred?: boolean` — 유효 부착. 투영이 `worker_ineligible` 우선순위를
  이미 접었으므로 템플릿은 다시 판정하지 않는다.
- `session_preferred_reason?: string` — 계약 enum 내 사유. 툴팁 문구의 키.

### 4.5 CSS — `app/styles.css`

`.worker-card__ineligible` 옆에 레이아웃 전용 규칙 하나를 더한다.

```css
.worker-card__session-preferred {
  flex: 0 0 auto;
  white-space: nowrap;
}
```

색은 `ctl-chip--label`이 소유한다 — Board가 같은 라벨을 그리는 방식이고,
`worker-ineligible` 칩이 이미 그 클래스를 쓴다. 새 token을 만들지 않는다.

## 5. `app/protocol.md`

runnable 행 문단에 한 줄을 더한다: `session-preferred`는 `worker-ineligible`과 달리
runnable 판정에서 행을 제외하지 않는 advisory이고, 짝 metadata
`session_preferred_reason`이 계약 enum 안일 때만 유효하며, 표시에서
`worker-ineligible`에 진다.

`server/worker/runnable-cache.js`의 `qualify()`가 이 라벨을 보지 않는다는 사실을
문서에 남기는 것이 이 줄의 목적이다 — 두 라벨이 이름만 보면 같은 계열로 보이므로,
한쪽만 제외 조건이라는 비대칭을 적어두지 않으면 다음 독자가 확인하러 코드를 다시
읽어야 한다.

## 6. 검증

front-matter `scope:`는 이 설계가 **서술하는** 경로의 freshness 감시 목록이지 변경
파일 목록이 아니다. `app/utils/worker-eligibility.js`가 거기 있는 이유는 §2가 "왜 그
파일 안이 아닌가"를 그 파일의 현재 소비자 집합에 기대어 논증하기 때문이고, 이 변경이
그 파일을 고친다는 뜻이 아니다 — 무변경은 수용 기준 7이 검사한다. 빌드 산출물
(`app/main.bundle.js`·`.map`)은 설계가 서술하는 코드가 아니므로 감시 목록에 넣지
않고, §6.5가 PR 포함을 요구한다.

### 6.1 `app/utils/session-preferred.test.js` (새 파일)

술어를 직접 부른다. 투영·카드 테스트는 `sessionPreferredReason`만 간접 실행하므로,
Bead 요구가 이름을 지정한 `isSessionPreferred`가 따로 잘못돼도 통과한다. 계약의
판정 표를 그대로 옮긴 표면 테스트가 그 구멍을 막는다.

`isSessionPreferred(labels, metadata)`에 대해:

- 라벨 + `exclusive_machine` → true
- 라벨만 있고 `session_preferred_reason` 없음 → false
- 라벨 + enum 밖 사유(`'other'`) → false
- 사유만 있고 라벨 없음 → false, 던지지 않음
- 비배열 `labels`(`'session-preferred'`) → false
- `metadata`가 `undefined` → false, 던지지 않음
- `metadata`가 비객체(`'exclusive_machine'`, `42`) → false, 던지지 않음
- 비문자열 라벨 항목이 섞인 배열(`[7, null, 'session-preferred']`) + 유효 사유 → true

`sessionPreferredReason`에 대해:

- 유효 부착 → `'exclusive_machine'`
- 위의 모든 무효 조합 → `''`

### 6.2 `app/views/worker/lanes.test.js`

`candidateCard` 직접 렌더.

- 유효 부착이 `세션 권장` 칩과 `exclusive_machine` 툴팁 문구를 그린다
- 사유 없는 행(`session_preferred: false`)은 칩을 그리지 않는다
- `worker_ineligible`과 동시 부착 시 `worker-ineligible` 칩만 그리고 `세션 권장`
  칩은 없다
- 유효 부착 카드의 `draggable`이 `true`로 남고 `worker-card--ineligible` 클래스가
  붙지 않는다
- 유효 부착 카드에 **자기 id와 일치하는 `place_menu`**를 넘기면 레인 선택 메뉴가
  그대로 렌더된다 — §4.3이 불변이라고 선언한 것을 실제로 검사하는 유일한 케이스다
- 유효 부착 카드의 `대기로 ↴` 버튼이 `disabled`가 아니고 `title`이 부착 전과 같은
  `대기 큐 맨 뒤에 추가`다

### 6.3 `app/views/worker/index.test.js`

마운트된 뷰로 투영 경로.

- 라벨 + enum 내 사유를 실은 ready 행이 칩을 그린다
- 라벨만 있고 사유가 없는 행, 라벨 + enum 밖 사유 행은 칩을 그리지 않는다
- 사유만 있고 라벨이 없는 행은 칩을 그리지 않고 던지지 않는다
- `worker-ineligible` + `session-preferred` 동시 부착 행은 음영 카드와
  `worker-ineligible` 칩만 그린다
- 비배열 `labels`, `metadata` 부재에서 던지지 않고 칩 없이 그린다

### 6.4 회귀

`worker-ineligible candidates (UI-8881)` describe 블록과 lanes.test.js의
`worker-ineligible` 케이스가 **무변경**으로 통과한다.

### 6.5 저장소 기본 bundle

`npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
`npm run build`. 프런트엔드 소스를 고쳤으므로 PR은 갱신된 `app/main.bundle.js`와
`app/main.bundle.js.map`을 포함한다.

## 7. 비목표

- 서버 `runnable-cache` · `ws.worker-queue` · admission · dispatch 변경. 이 라벨은
  실행 자격에 입력되지 않는다.
- `worker-serial`과의 통합. 의미가 다르다 — 직렬 lane 배치 의도 대 세션 권장.
- Monitor 탭 카드(`miniRow` · `runningTile`) 표시. 계약이
  `consumer: beads-ui-worker-only`로 후보 레인에 한정했다.
- 라벨을 붙이거나 떼는 UI 조작. 이 Bead는 표시만 한다.
- dotfiles 쪽 계약·체커·스킬 문서·테스트. `dotfiles-oqzc`가 소유한다.

## 구현 unit 후보

단일 unit. 술어·투영·카드·문서·테스트가 한 논리적 변경이며, 분리하면 중간 상태에서
투영이 소비자 없는 플래그를 만든다.

## 수용 기준

1. `isSessionPreferred(labels, metadata)`가 라벨 존재 **and** enum 내 사유일 때만
   true이고, §6.1의 무효 조합 전부에서 던지지 않고 false다 — `metadata` 부재와
   비객체 `metadata`를 각각 별도 케이스로 검사한다.
2. `sessionPreferredReason`이 유효 부착에서 사유 문자열을, 무효 조합 전부에서 `''`을
   돌려준다.
3. 후보 투영이 `session_preferred` · `session_preferred_reason`을 싣고,
   `worker_ineligible`이 true인 행에서는 `session_preferred`가 항상 false다.
4. 유효 부착 후보 카드가 `세션 권장` 칩과 계약 문구 툴팁을 1번 정체성 줄에 그리고,
   `draggable`·`대기로 ↴` 버튼의 `disabled`/`title`·`place_menu` 렌더가 부착 전과
   동일하다(§6.2가 셋을 각각 assert한다).
5. `worker-ineligible` 동시 부착 카드가 `worker-ineligible` 표현만 그린다.
6. `app/protocol.md`가 라벨 이름·advisory 성격·우선순위를 한 줄로 적는다.
7. `git diff --name-only`가 `server/` 경로를 하나도 담지 않고,
   `app/utils/worker-eligibility.js`도 담지 않는다. 후자가 함께 필요한 이유는 그
   파일이 `runnable-cache`·`scheduler`·`title-cache`가 import하는 서버 진입점이라,
   `server/`만 검사하면 admission 불변을 증명하지 못하기 때문이다.
8. §6.5 bundle이 green이고, §6.4 회귀 테스트가 무변경으로 통과한다.
