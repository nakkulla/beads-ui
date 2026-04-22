# Global label display policy 도입

## 문제 정의

현재 `beads-ui`는 Board 카드와 Issues/Epics row에서 보여줄 label을
하드코딩된 prefix 집합으로 제한하고 있다.

- `app/utils/label-badge.js`는 `has:` 와 `reviewed:` prefix만 통과시킨다.
- Board 카드(`app/views/board.js`)와 Issues/Epics row(`app/views/issue-row.js`)는
  모두 이 공통 필터를 그대로 사용한다.
- 상세 패널은 전체 label을 보여주지만, 카드/row 요약 영역은 코드에 박힌 규칙만 따른다.

이 구조는 `beads-ui` 자체 레포에서는 대체로 동작하지만, 실제 Beads 레포들을 보면
다음 prefix도 자주 사용된다.

- `area:`
- `component:`
- `agent:`
- 일부 레포의 `deferred:`

즉, 현재 구현은 “무엇을 보여줄지”를 제품 정책이 아니라 하드코딩으로 고정하고 있다.
이 때문에 운영자가 전체 UI의 label 가시성 정책을 바꾸려면 코드를 수정하고 재배포해야 한다.

이번 작업의 목표는 이 하드코딩을 제거하고,
**Board / Issues / Epics가 공통으로 따르는 전역 label display policy**를 도입하는 것이다.

## 목표

- Board 카드와 Issues/Epics row가 사용하는 label 표시 규칙을 하드코딩에서 분리한다.
- 정책 source of truth를 **서버 전역(global) config**로 이동한다.
- 같은 `beads-ui` 서버 인스턴스를 보는 모든 사용자에게 동일한 정책이 적용되게 한다.
- config가 없거나 잘못되어도 안전한 기본값으로 동작하게 한다.
- 현재 UI에 별도의 설정 진입점이나 편집 affordance를 추가하지 않는다.

## 비목표

다음 항목은 이번 설계 범위에서 제외한다.

- 브라우저별 / 사용자별 preference 저장
- workspace별 label 표시 정책 override
- repo-local config (`.bdui/**`, `.beads/**`) 도입
- UI에서 정책을 수정하는 settings 화면/버튼/팝오버
- config file live reload
- label 단위(`area:auth`만 표시 등) 선택 규칙
- 상세 패널 Labels 섹션의 동작 변경

## 현재 상태

### 1. 하드코딩된 label filter

`app/utils/label-badge.js`는 다음 구조를 가진다.

- `CARD_PREFIXES = ['has:', 'reviewed:']`
- `filterCardLabels(labels)`는 입력 label 배열에서 위 prefix로 시작하는 label만 통과시킨다.
- `createLabelBadge(label)`는 badge DOM을 생성하며 색 modifier도 `has:` / `reviewed:` 에만 특화되어 있다.

즉, label 가시성 정책은 현재 util 내부 상수 하나에 묶여 있다.

### 2. 공통 소비 지점

이 util은 다음 두 view 계층에서 공통 사용된다.

- `app/views/board.js`
  - `cardTemplate()`에서 `filterCardLabels(it.labels)` 사용
- `app/views/issue-row.js`
  - Issues row / Epics child row에서 동일한 필터 사용

따라서 정책 변경은 Board만의 문제가 아니라,
카드/row 요약 전반에 공통으로 영향을 준다.

### 3. 기존 config surface

현재 `beads-ui`에는 이미 몇 가지 전역/서버 config surface가 존재한다.

- `server/config.js`
  - `HOST`, `PORT`, `BDUI_FRONTEND_MODE`를 해석한다.
- `server/workspace-discovery.js`
  - `~/.config/bdui-workspaces.conf` 또는 `BDUI_WORKSPACES_CONFIG`를 사용한다.
- `app/main.js`
  - theme, filters, board closed filter 등은 client-side localStorage에 저장한다.

하지만 **label display policy를 위한 server-global config surface는 아직 없다.**

## 결정 요약

### 선택한 방향

**Board / Issues / Epics 요약 영역의 label 표시 규칙을 server-global config로 이동한다.**

이 구조에서:

- 정책 source of truth는 브라우저가 아니라 서버다.
- 같은 서버를 보는 모든 사용자는 같은 label prefix 정책을 본다.
- UI는 정책을 편집하지 않고, 결과만 반영한다.
- config는 서버 시작 시 1회 로드되며, 반영에는 restart가 필요하다.

### 왜 이 방향인가

1. 사용자가 원한 정책 성격이 preference가 아니라 운영 전역 정책이기 때문이다.
2. Board / Issues / Epics가 같은 util을 공유하므로, 공통 정책으로 정의하는 것이 자연스럽다.
3. 현재 localStorage 방식은 사용자별 브라우저 preference에 적합하지만,
   이번 요구와는 맞지 않는다.
4. UI에 settings entry를 추가하지 않으면 제품 surface를 불필요하게 늘리지 않아도 된다.

## 설계

## 1. 정책 모델

### 1.1 정책 의미

label display policy는
**“요약 영역(Board 카드 / Issues row / Epics child row)에서 어떤 label prefix를 표시할지”**를 정의한다.

정책은 prefix 배열 하나로 시작한다.

```json
{
  "labels": {
    "visible_prefixes": ["has:", "reviewed:", "area:", "component:"]
  }
}
```

정책 규칙:

- 각 entry는 string이어야 한다.
- prefix match 의미는 현재와 동일하게 `label.startsWith(prefix)`다.
- 순서는 config 배열 순서를 그대로 따른다.
- label 원본 배열 순서는 유지하되, 표시 가능 여부 판정만 policy가 담당한다.

### 1.2 기본값(fallback)

config가 없거나 유효하지 않을 때의 기본값은 기존 동작을 유지한다.

```json
{
  "labels": {
    "visible_prefixes": ["has:", "reviewed:"]
  }
}
```

이 기본값은 backward compatibility를 위한 안전장치다.

### 1.3 범위

이 정책은 다음 영역에만 적용한다.

- Board 카드 label row
- Issues table의 Labels column
- Epics child table의 Labels column

다음에는 적용하지 않는다.

- Detail panel의 Labels card
- new issue dialog의 labels 입력 UX
- server-side Beads mutation 동작

## 2. Config source

### 2.1 canonical config path

첫 버전 canonical path는 다음으로 둔다.

- `~/.config/bdui/config.json`

이 파일은 `beads-ui` 서버 인스턴스의 **server-global config**로 간주한다.
같은 서버 인스턴스에 접속한 모든 브라우저 세션은 이 정책을 공유한다.

### 2.2 env override

운영/테스트 유연성을 위해 config path override를 허용한다.

- `BDUI_CONFIG_PATH`

우선순위는 다음과 같다.

1. `process.env.BDUI_CONFIG_PATH`
2. 기본값 `~/.config/bdui/config.json`

이 override는 테스트 fixture 주입과 배포 환경 경로 고정에 사용한다.

### 2.3 config scope

이 파일은 workspace마다 따로 해석하지 않는다.

즉:

- workspace를 바꿔도 label policy는 바뀌지 않는다.
- repo root / `.bdui` / `.beads` 안에서 fallback 탐색을 하지 않는다.
- 서버 프로세스 기준의 전역 정책으로만 읽는다.

## 3. Runtime 구조

## 3.1 server config loading

`server/config.js`는 현재 host/port/frontend_mode만 반환한다.
이번 작업에서는 여기에 label display policy를 포함한 app config 해석을 추가한다.

예상 반환 shape:

```js
{
  host,
  port,
  app_dir,
  root_dir,
  frontend_mode,
  url,
  label_display_policy: {
    visible_prefixes: ['has:', 'reviewed:']
  }
}
```

`label_display_policy`는 server-global config snapshot이며,
client 초기 상태에도 같은 shape로 전달한다.

구현 원칙:

- `getConfig()` 내부 또는 전용 helper에서 global JSON config를 읽는다.
- parse 실패 시 throw로 프로세스를 중단하지 않는다.
- 실패는 log로 남기고 fallback policy를 사용한다.

### 3.2 client bootstrap

client는 bootstrap 시 현재 policy snapshot을 받아야 한다.
첫 버전의 canonical 전달 경로는 **root HTML 응답에 bootstrap payload를 주입하는 방식**으로 고정한다.

구체적으로는:

- `server/app.js`는 `express.static(config.app_dir)`가 `/`에서 기본 `index.html`을 먼저 반환하지 않도록
  `index: false`를 설정하거나, 동등한 효과를 내는 route ordering으로 `/`를 명시적으로 선점한다.
- 그 위에서 `/` 응답은 정적 `index.html`을 그대로 보내는 대신,
  최소한의 bootstrap script를 삽입한 HTML을 반환한다.
- script는 `window.__BDUI_BOOTSTRAP__` 전역 payload에
  `label_display_policy.visible_prefixes`를 실어준다.
- `app/main.js`는 이 payload를 읽어 initial store state에 반영한다.
- 동시에 server는 동일 snapshot을 반환하는 lightweight config endpoint(예: `GET /api/config`)도 제공한다.

예시 shape:

```html
<script>
  window.__BDUI_BOOTSTRAP__ = {
    label_display_policy: {
      visible_prefixes: ['has:', 'reviewed:']
    }
  };
</script>
```

보안/안전 규칙:

- payload는 hand-written string concatenation으로 만들지 않는다.
- canonical 방식은 `JSON.stringify(payload)` 후 HTML/script-safe escaping을 거친 문자열을 삽입하는 것이다.
- 최소한 `<`, `</script`, U+2028, U+2029`로 인해 script context가 깨지지 않도록 escaping 규칙을 둔다.
- malformed config string이 있어도 injected bootstrap script가 깨지지 않아야 한다.

이 경로를 선택한 이유:

- websocket message contract를 늘리지 않아도 된다.
- `beads-ui`의 초기 theme/local state bootstrap과 충돌하지 않는다.
- source of truth가 server-side config라는 점이 분명해진다.
- 이미 열린 SPA 탭도 reconnect 시 최신 server config를 다시 읽을 수 있다.

핵심 원칙은 다음과 같다.

- **client가 정책을 localStorage에서 읽지 않고, server가 해석한 정책 snapshot을 사용한다.**
- initial load는 injected bootstrap payload를 사용하고,
  reconnect 이후 freshness 보장은 `GET /api/config` 재조회로 처리한다.

### 3.3 reconnect-time refresh

server restart 후에도 이미 열린 탭은 websocket 재연결만으로 살아남을 수 있다.
따라서 bootstrap-only loading으로는 policy freshness가 보장되지 않는다.

첫 버전 reconnect contract는 다음으로 고정한다.

- initial page load 시에는 injected `window.__BDUI_BOOTSTRAP__` payload로 초기 state를 만든다.
- websocket connection이 한 번이라도 `reconnecting`/`closed`를 거친 뒤 다시 `open` 되면,
  client는 `GET /api/config`를 호출해 최신 `label_display_policy` snapshot을 다시 가져온다.
- 이 응답으로 `store.config`를 덮어써 stale policy를 해소한다.
- 이때 `app/state.js`의 `setState()`는 `config.label_display_policy.visible_prefixes`
  변경을 state change로 인식해야 하며, 해당 변경은 Board / Issues / Epics rerender를
  반드시 유발해야 한다.
- hard reload를 강제 기본값으로 두지 않는다.

즉, canonical freshness path는
**initial HTML bootstrap + reconnect-time `/api/config` refresh** 다.

### 3.4 client state

client store에는 label policy snapshot을 canonical `config` branch로 유지한다.

예시 shape:

```js
config: {
  label_display_policy: {
    visible_prefixes: ['has:', 'reviewed:']
  }
}
```

이 shape는 bootstrap payload와 동일해야 한다.

핵심은 다음이다.

- Board / Issues / Epics가 공통 상태를 읽을 수 있어야 한다.
- browser localStorage persistence는 두지 않는다.
- workspace switch에서도 값은 유지된다(서버 전역 정책이므로).
- `ui`/`board`/`filters` 아래에 중복 사본을 두지 않는다.
- `window.__BDUI_BOOTSTRAP__`, `GET /api/config`, `AppState.config`는 모두 같은
  canonical schema를 사용한다.
- `app/main.js`는 bootstrap path와 reconnect refresh path 모두에서
  `store.setState({ config })`를 사용해 같은 갱신 경로를 타게 한다.

## 4. Filtering contract

### 4.1 util 책임 분리

현재 `filterCardLabels(labels)`는 내부 상수를 직접 참조한다.
이를 다음 형태로 바꾼다.

- 순수 함수는 정책을 인자로 받는다.
- view layer는 store/config snapshot을 전달한다.
- Board/List/Epics가 제각각 global singleton을 읽지 않도록, renderer 경계에서 명시적으로 주입한다.

예시 계약:

```js
filterVisibleLabels(labels, visible_prefixes)
```

canonical plumbing contract:

- `createBoardView(..., store, ...)`는 `store.getState().config.label_display_policy.visible_prefixes`를 읽어
  `cardTemplate()`에 전달한다.
- `createIssueRowRenderer(options)`는 새 option `getVisibleLabelPrefixes`를 받는다.
- `createListView()`와 `createEpicsView()`는 이 closure를 넘겨 row renderer가 같은 policy snapshot을 쓰게 한다.

즉, 첫 버전에서 policy 전달 경로는
**store → view → renderer/util arg** 로 고정한다.

### 4.2 invalid policy handling

`visible_prefixes`가 비정상일 때는 다음 규칙을 적용한다.

- `visible_prefixes`가 배열이 아니면 fallback policy 사용
- 배열 원소 중 string이 아닌 값은 무시
- 빈 문자열 prefix는 무시
- **명시적 빈 배열 `[]` 는 유효한 설정으로 간주하며, 요약 label을 모두 숨긴다.**
- 배열이 있었지만 유효 string prefix가 하나도 남지 않은 경우에만 fallback policy 사용

즉, malformed config 때문에 label이 우연히 전부 사라지는 상태는 막되,
운영자가 의도적으로 `[]` 를 넣어 “요약 label 숨김” 정책을 고를 자유는 유지한다.

### 4.3 badge styling

기존 badge modifier는 `has:` / `reviewed:` 전용 class만 가진다.
이번 작업에서는 다음 원칙으로 간다.

- 기존 `has:` / `reviewed:` styling은 유지
- 나머지 prefix (`area:`, `component:`, `agent:` 등)는 neutral badge로 표시
- 첫 버전에서 prefix별 custom palette system은 도입하지 않는다.

이렇게 하면 정책 확장과 시각 시스템 확장을 분리할 수 있다.

## 5. View 적용 범위

### 5.1 Board

`app/views/board.js`의 `cardTemplate()`는 현재 issue의 `labels`를 공통 policy로 필터링해 렌더링한다.

결과:

- 정책에 포함된 prefix만 카드 title 아래 label row에 표시된다.
- 정책에 맞는 label이 없으면 현재처럼 label row 자체를 렌더링하지 않는다.

### 5.2 Issues list

`app/views/issue-row.js`는 Labels column에서 동일 policy를 사용한다.

결과:

- 정책에 포함된 prefix만 badge로 보인다.
- 정책에 맞는 label이 없으면 Labels cell은 빈 상태다.
- 현재 column 구조와 inline editing flow는 그대로 유지한다.

### 5.3 Epics child rows

Epics는 shared `createIssueRowRenderer()`를 사용하므로,
Issues list와 동일 정책이 자동 적용된다.

결과:

- Epics child table도 Board/Issues와 동일한 label visibility contract를 따른다.

## 6. 적용 시점

첫 버전은 **server start 시 1회 로드**로 고정한다.

즉:

- `config.json`을 수정해도 실행 중 서버는 즉시 반영하지 않는다.
- 새 정책을 적용하려면 `bdui` 서버를 restart해야 한다.

이 방향을 선택한 이유:

- 운영 의미가 가장 단순하다.
- watcher / push refresh / live config invalidation이 필요 없다.
- 이번 기능을 label policy 도입 자체에 집중시킬 수 있다.

## 7. 오류 처리 및 관측성

### 7.1 missing config

config file이 없으면:

- fallback policy 사용
- debug/info 수준 log만 남긴다
- fatal error로 취급하지 않는다

### 7.2 invalid JSON

JSON parse 실패 시:

- fallback policy 사용
- parse error를 server log에 남긴다
- 서버 boot 전체를 실패시키지 않는다

### 7.3 invalid shape

예를 들어 다음과 같은 경우:

- `labels`가 object가 아님
- `visible_prefixes`가 배열이 아님
- 배열 내부 값이 숫자/object/null임

처리 규칙:

- 유효한 string prefix만 추린다.
- 최종 결과가 비면 fallback policy 사용
- log에 "invalid label display policy config" 성격의 진단 메시지를 남긴다.

## 8. 테스트 전략

## 8.1 server config tests

새 정책 loader에 대해 최소 다음 케이스를 고정한다.

1. config file 없음 → fallback policy 반환
2. valid config file 있음 → configured prefixes 반환
3. invalid JSON → fallback policy 반환 + log
4. explicit `visible_prefixes: []` → hide-all policy로 유지
5. invalid shape → fallback policy 또는 invalid entries 무시 후 안전한 결과 반환
6. `BDUI_CONFIG_PATH` override 적용
7. config value에 `</script>` 또는 `<`가 포함돼도 bootstrap payload escaping이 안전하다

이 테스트는 `server/config.js` 또는 새 loader module 단위에서 수행한다.

## 8.2 util tests

label filtering util에 대해 다음을 고정한다.

1. configured prefix만 통과시킨다.
2. 기존 `has:` / `reviewed:` 기본값과 호환된다.
3. invalid prefix 배열 입력 시 fallback policy를 사용한다.
4. 순서를 보존한다.
5. neutral prefix(`area:`, `component:` 등)도 configured 시 필터를 통과한다.

## 8.3 view tests

다음 view test를 업데이트/추가한다.

1. Board 카드가 configured prefixes에 맞춰 label을 보여준다.
2. Issues row가 같은 정책을 사용한다.
3. Epics child row도 같은 정책을 사용한다.
4. policy에 없는 label만 가진 issue는 label row/cell이 비어 있다.
5. neutral prefix(`area:`, `component:` 등)는 neutral badge로 보인다.
6. `/` bootstrap payload에서 주입된 non-default policy가 세 view에 동일하게 전달된다.
7. websocket reconnect 뒤 `GET /api/config` refresh가 새 policy로 `store.config`를 갱신한다.
8. static `index.html`이 `/` bootstrapped HTML을 shadow하지 않는다.

## 9. 구현 경계

예상 수정 파일은 다음 범위로 제한한다.

- `server/config.js` 또는 새 global config loader module
- bootstrap/config wiring (`server/app.js`, `app/main.js`, 필요 시 `/api/config` endpoint)
- `app/state.js` (`AppState` / 관련 JSDoc typedef에 `config.label_display_policy` 추가 포함)
- `app/utils/label-badge.js`
- `app/views/board.js`
- `app/views/issue-row.js`
- `app/views/list.js`
- `app/views/epics.js`
- 관련 test files
- README의 global config 설명

이번 작업에서는 다음은 건드리지 않는다.

- header navigation / settings UI
- detail labels UX
- workspace picker
- websocket subscription model 자체

## 요약

이번 설계는 Board / Issues / Epics의 label 표시 규칙을
하드코딩 util에서 꺼내 server-global config로 올리는 작업이다.

핵심 결정은 다음 네 가지다.

1. 정책은 브라우저 preference가 아니라 **server-global policy**다.
2. source of truth는 `~/.config/bdui/config.json`(또는 `BDUI_CONFIG_PATH`)이다.
3. UI에는 별도 settings entry를 추가하지 않는다.
4. config 변경 반영은 live reload가 아니라 **server restart**로 처리한다.

이렇게 하면 현재 하드코딩 제약을 없애면서도,
제품 surface를 불필요하게 넓히지 않고 운영자가 전체 UI의 label visibility를 제어할 수 있다.
