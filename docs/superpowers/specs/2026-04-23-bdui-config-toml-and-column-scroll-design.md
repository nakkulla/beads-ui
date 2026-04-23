# bdui 통합 TOML 설정과 컬럼형 스크롤 레이아웃 정리

## 문제 정의

현재 `beads-ui`의 workspace 설정과 컬럼형 UI는 각각 별도의 불일치를 안고 있다.

1. **workspace 설정 surface가 여러 파일에 흩어져 있다.**
   - `beads-ui` 서버는 현재 `~/.config/bdui/config.json`에서 label display policy를 읽는다.
   - workspace auto-discovery는 `~/.config/bdui-workspaces.conf`를 별도로 읽는다.
   - shared runtime wrapper인 dotfiles의 `shell/bin/bdui-server`는 여기에 더해 `~/.config/bdui-default-workspace`까지 읽어 startup cwd를 정한다.
   - 이 구조에서는 사용자가 “bdui 설정은 어디를 고쳐야 하나?”를 한 번에 이해하기 어렵고, runtime source마다 설정 truth가 분산된다.

2. **workspace discovery는 scan-root 중심이라 직접 repo path를 넣는 사용 사례가 불편하다.**
   - 현재 `server/workspace-discovery.js`는 scan directory 목록만 읽고 그 아래를 재귀 탐색한다.
   - 이 방식은 `~/Documents/GitHub` 같은 큰 루트에는 잘 맞지만, scan depth 밖의 repo나 흩어진 개별 repo를 직접 picker에 pin 하고 싶은 경우에는 불필요한 우회가 생긴다.

3. **workspace 현재값의 canonical source가 불명확하다.**
   - 서버는 `CURRENT_WORKSPACE`를 유지하고, 클라이언트는 `localStorage`의 `beads-ui.workspace`를 참고해 last selection을 복원한다.
   - 반면 dotfiles의 shared runtime은 별도 default-workspace 파일을 읽어 startup cwd를 정한다.
   - 이 때문에 설치/운영자 관점의 기본 workspace와 브라우저의 마지막 선택이 서로 다른 규칙으로 경쟁한다.

4. **컬럼형 UI에서 이슈가 많아지면 화면 전체가 과도하게 길어지거나 scroll ownership이 일관되지 않다.**
   - `board`는 column header sticky를 이미 일부 사용하지만, `.board-column__body`는 `overflow: visible`이고 column 자체가 `overflow: auto`라 scroll 책임이 분명하지 않다.
   - `worker`는 `min-height: calc(100vh - 92px)`를 사용하지만 pane 내부 scroll contract가 공통 규칙으로 정리돼 있지 않다.
   - 그 결과 “현재 viewport 안에서 운영형 패널을 유지하고 각 컬럼/패널 내부만 스크롤한다”는 UX가 화면마다 일관되지 않다.

이번 작업의 핵심은 **설정 truth를 TOML 하나로 통합하고, 컬럼형 UI의 세로 레이아웃/스크롤 계약을 공통 정책으로 정리하는 것**이다.

## 목표

- `~/.config/bdui/config.toml` 하나로 bdui 관련 설정을 통합한다.
- 통합 TOML에서 다음을 함께 관리한다.
  - `default_workspace`
  - `scan_roots`
  - `workspaces`
  - `labels.visible_prefixes`
- workspace picker는 **scan 결과 + 직접 지정 workspace**를 모두 표시한다.
- 현재 workspace의 canonical 기본값은 `config.toml`의 `default_workspace`로 정의한다.
- shared runtime(dotfiles install / `bdui-server`)도 같은 TOML을 사용하도록 맞춘다.
- Board를 포함한 **모든 컬럼형 UI**에서 viewport 기준 높이를 유지하고, 컬럼/패널 내부만 세로 스크롤되게 한다.
- column/pane header는 상단에 남고 body만 스크롤되는 계약을 정한다.

## 비목표

다음은 이번 설계 범위에서 제외한다.

- UI 안에서 `config.toml`을 편집하는 settings screen 추가
- workspace별 사용자 preference 저장/편집 UI
- mobile 전용 별도 레이아웃 재설계
- arbitrary filesystem path를 picker 밖에서 직접 입력해 즉석 전환하는 기능
- `beads-ui` 안에서 dotfiles install을 직접 호출하거나 관리하는 기능
- 기존 legacy 설정 파일을 자동 migration하는 기능

## 현재 상태

## 1. 설정 로딩

### 1.1 label display policy

`server/config.js`는 현재 다음 경로를 읽는다.

- `process.env.BDUI_CONFIG_PATH`
- 기본값: `~/.config/bdui/config.json`

그리고 JSON에서 다음만 해석한다.

- `labels.visible_prefixes`

즉, runtime config와 workspace config가 서로 다른 파일에 분리돼 있다.

### 1.2 workspace discovery

`server/workspace-discovery.js`는 현재 다음 경로를 읽는다.

- explicit argument
- `process.env.BDUI_WORKSPACES_CONFIG`
- 기본값: `~/.config/bdui-workspaces.conf`

파일 포맷은 line-based plain text이며, 각 줄을 scan root directory로 간주한다. 그 아래에서 `.beads` repo를 depth 2까지 찾는다.

즉, discovery source는 “scan root 목록”만 지원하고 “직접 workspace path 지정”은 지원하지 않는다.

### 1.3 shared runtime startup workspace

dotfiles의 `shell/bin/bdui-server`는 다음 두 파일을 별도로 읽는다.

- `~/.config/bdui-default-workspace`
- `~/.config/bdui-workspaces.conf`

동작은 다음과 같다.

1. `bdui-default-workspace` 첫 줄이 유효한 `.beads` repo면 그것을 startup cwd로 사용
2. 없으면 `bdui-workspaces.conf` 각 scan root 아래에서 첫 workspace를 찾음
3. 그래도 없으면 `$HOME`에서 서버 실행

즉, shared runtime startup selection logic이 `beads-ui` 서버 내부 logic과 별도 구현으로 존재한다.

## 2. picker와 current workspace

`app/main.js`는 bootstrap 시 `list-workspaces`를 호출하고, 결과를 store의 `workspace.current` / `workspace.available`에 반영한다.

그 뒤 브라우저 `localStorage`의 `beads-ui.workspace`가 존재하면, 현재 workspace와 다를 때 이를 우선 복원하려고 시도한다.

따라서 현재는:
- 설치/운영 default
- 서버 current workspace
- 브라우저 last selection
이 서로 다른 계층에서 결정된다.

## 3. Board / Worker 레이아웃

### 3.1 Board

`app/views/board.js`는 다음 구조를 사용한다.

- `.panel__body`
- `.board-toolbar`
- `.board-root`
- `.board-column`
  - `.board-column__header`
  - `.board-column__body`

`app/styles.css` 기준 현재 상태는 다음과 같다.

- `.board-root`는 grid 기반 multi-column layout
- `.board-column`은 `display:flex`, `min-height:0`, `overflow:auto`
- `.board-column__header`는 sticky
- `.board-column__body`는 `overflow: visible`

즉, header sticky는 일부 존재하지만 실제 목록 scroll ownership은 column 전체와 body 사이에서 일관되지 않다.

### 3.2 Worker

`app/views/worker.js`는 `worker-layout__left` / `worker-layout__right` 2-pane grid를 사용한다.

`app/styles.css` 기준 현재 상태는 다음과 같다.

- `.worker-layout`은 `min-height: calc(100vh - 92px)`
- left/right pane padding과 background는 정의돼 있음
- 그러나 pane body, tree 영역, detail 영역의 scroll container contract는 공용 primitive 없이 화면별 조합에 의존한다.

즉, viewport 기준 panel height를 유지하려는 의도는 있으나, Board와 같은 정책으로 문서화되거나 재사용되지는 않는다.

## 결정 요약

### 선택한 방향

1. **bdui 설정은 `~/.config/bdui/config.toml` 하나로 통합한다.**
2. **legacy 설정 파일(`config.json`, `bdui-workspaces.conf`, `bdui-default-workspace`)은 새 runtime에서 읽지 않는다.**
3. **workspace 목록은 `scan_roots`에서 발견한 repo와 `workspaces`에 직접 적은 repo의 합집합으로 구성한다.**
4. **startup/current 기본 workspace의 canonical source는 `default_workspace`다.**
5. **클라이언트 localStorage는 canonical source가 아니라 last-selection hint로만 취급하며, `default_workspace`보다 우선하지 않는다.**
6. **`set-workspace`는 configured/available workspace 목록 안의 path만 허용한다.**
7. **Board를 포함한 컬럼형 UI는 viewport 기준 높이 + 내부 body scroll + sticky header 계약으로 정리한다.**
8. **dotfiles install은 새 TOML을 생성/배포하는 provider로 역할을 정리하고, legacy 설정은 생성하지 않는다.**

### 왜 이 방향인가

- 설정이 여러 파일에 흩어져 있으면 사용자가 고쳐야 할 source of truth를 직관적으로 파악하기 어렵다.
- TOML은 주석과 배열 구조를 자연스럽게 지원해 scan roots와 explicit workspaces를 한 파일에 함께 담기 좋다.
- scan-root와 explicit path를 둘 다 지원하면 “대표 루트 아래 대부분의 repo 자동 발견”과 “예외 repo pin”을 동시에 만족할 수 있다.
- `default_workspace`를 canonical source로 두어야 dotfiles install이 배포한 운영 설정과 브라우저 state가 충돌하지 않는다.
- picker 밖 arbitrary path 전환을 허용하면 config contract가 약해지고 검증/보안 경계가 흐려진다.
- 컬럼형 UI의 scroll ownership을 body로 고정하면 header visibility와 operator ergonomics가 훨씬 안정적이다.

## 설계

## 1. 통합 TOML 설정 계약

### 1.1 canonical 경로

새 canonical 설정 파일은 다음으로 고정한다.

- `~/.config/bdui/config.toml`

환경변수 override는 유지할 수 있다.

- `BDUI_CONFIG_PATH`

단, override가 있더라도 해석 포맷은 **TOML만** 지원한다.

### 1.2 스키마

초기 스키마는 다음을 사용한다.

```toml
default_workspace = "/absolute/path/to/repo"

scan_roots = [
  "/absolute/path/to/projects",
  "/absolute/path/to/work"
]

workspaces = [
  "/absolute/path/to/specific-repo",
  "/absolute/path/to/another-repo"
]

[labels]
visible_prefixes = ["has:", "reviewed:"]
```

### 1.3 필드 의미

- `default_workspace`
  - startup/current 기본 workspace path
  - 없거나 invalid일 수 있다
- `scan_roots`
  - 하위 `.beads` repo를 자동 발견할 root directory 목록
- `workspaces`
  - scan과 무관하게 picker에 직접 포함할 repo path 목록
- `[labels].visible_prefixes`
  - 기존 `config.json`의 label display policy 통합 버전

### 1.4 정규화 규칙

모든 path는 로드 시 다음 규칙으로 정규화한다.

- 문자열이 아닌 값은 무시
- 빈 문자열 무시
- `path.resolve()`로 absolute path 정규화
- 중복은 normalized absolute path 기준 dedupe

### 1.5 invalid entry 처리

- `default_workspace`가 invalid면 `null` 취급
- `scan_roots` entry가 디렉터리가 아니면 무시
- `workspaces` entry가 workspace 검증을 통과하지 못하면 무시
- parse 실패 또는 invalid entry는 debug/error log에 남기되, 서버는 fail-fast하지 않는다

### 1.6 legacy 정책

다음 파일은 새 runtime에서 더 이상 읽지 않는다.

- `~/.config/bdui/config.json`
- `~/.config/bdui-workspaces.conf`
- `~/.config/bdui-default-workspace`

이번 설계는 **fallback 없음 / auto-migration 없음**을 기본 정책으로 한다.

## 2. beads-ui 서버 로더 재구성

### 2.1 단일 config loader

`server/config.js`는 label-only JSON reader에서 벗어나, TOML 전체를 읽는 runtime config loader로 재구성한다.

loader 책임은 다음과 같다.

- TOML parse
- 기본값 주입
- label config normalization
- workspace config normalization
- runtime config object 반환

예상 runtime shape:

```js
{
  host,
  port,
  app_dir,
  root_dir,
  frontend_mode,
  url,
  label_display_policy: {
    visible_prefixes: string[]
  },
  workspace_config: {
    default_workspace: string | null,
    scan_roots: string[],
    workspaces: string[]
  }
}
```

### 2.2 TOML parser 선택 기준

파서는 다음 조건을 만족해야 한다.

- Node ESM 환경에서 안정적으로 사용 가능
- dependency surface가 작음
- comments / arrays / tables를 정확히 파싱

구체 라이브러리 선택은 implementation 단계에서 확정하되, 설계 계약은 **TOML object → normalized runtime config**로 고정한다.

## 3. workspace discovery 재설계

### 3.1 discovery input

`discoverWorkspaces()`는 더 이상 line-based conf 파일을 직접 읽지 않는다.

대신 normalized `workspace_config`를 받아 다음 두 입력을 함께 처리한다.

1. `scan_roots`
2. `workspaces`

### 3.2 scan roots 처리

기존 depth-limited `.beads` repo 탐색 규칙은 유지한다.

- hidden directory skip
- depth 2 제한 유지
- `.beads` 존재 여부 확인
- `resolveWorkspaceDatabase()`로 usable workspace인지 판별

즉, scan 자체는 유지하되 input source만 TOML로 바뀐다.

### 3.3 explicit workspaces 처리

`workspaces` 각 항목은 직접 workspace 후보로 취급한다.

검증 규칙:

- path가 존재해야 함
- `.beads` metadata 또는 workspace database resolution이 가능해야 함
- `resolveWorkspaceDatabase({ cwd: repo_path })` 결과가 `home-default`가 아니고 `exists === true`여야 함

### 3.4 merge / dedupe

최종 workspace 목록은 다음 순서로 합친다.

1. explicit `workspaces`
2. `scan_roots` discovery results
3. runtime registry/in-memory dynamically registered workspaces

dedupe key는 normalized `path`다.

explicit workspaces를 먼저 두는 이유는 사용자가 직접 지정한 repo를 picker 상에서 더 예측 가능하게 유지하기 위해서다.

### 3.5 dynamic registry와의 관계

`server/registry-watcher.js`의 registry/in-memory merge 모델은 유지한다.

다만 base workspace set의 canonical source는 TOML이다.

즉:
- TOML = configured baseline
- registry/in-memory = runtime supplement

## 4. current workspace 결정 규칙

### 4.1 startup current workspace 우선순위

서버 startup 시 current workspace는 다음 순서로 결정한다.

1. `workspace_config.default_workspace`가 유효하면 사용
2. server process `root_dir`가 유효한 workspace면 사용
3. configured/discovered workspace 목록의 첫 항목 사용
4. 아무것도 없으면 `null`

### 4.2 shared runtime wrapper와의 정합성

dotfiles의 `shell/bin/bdui-server`도 같은 `config.toml`을 읽어 startup cwd를 결정해야 한다.

즉, wrapper에서 별도의 line-based scan/default parser를 유지하지 않는다.

wrapper 책임은 다음으로 단순화한다.

- `config.toml` 존재 시 `default_workspace`를 우선 해석
- 없거나 invalid면 repo checkout readiness 확인 후 안전한 fallback startup
- legacy `bdui-default-workspace`, `bdui-workspaces.conf`는 읽지 않음

이렇게 해야 shared runtime startup cwd와 beads-ui server 내부 current workspace 결정 규칙이 같은 계약을 공유한다.

### 4.3 localStorage 정책

브라우저 `localStorage`의 `beads-ui.workspace`는 canonical truth가 아니라 **last-selection hint**로만 취급한다.

추천 동작은 다음과 같다.

- `default_workspace`가 존재하고 유효하면 그것이 우선
- `default_workspace`가 없을 때만 saved workspace hint를 적용 가능
- saved workspace가 available list에 없으면 무시

즉, config가 브라우저 캐시보다 우선한다.

## 5. picker / 전환 API 계약

### 5.1 picker source of truth

`list-workspaces` 응답의 `workspaces` / `current`는 새 TOML 기반 discovery 결과와 current resolution 결과를 반영해야 한다.

클라이언트는 이 응답만으로 picker를 렌더링한다.

### 5.2 `set-workspace` 검증 강화

`set-workspace`는 임의 absolute path를 그대로 받아들이지 않는다.

새 계약:
- 요청 path는 normalized available workspace 목록 안에 있어야 함
- 목록 밖 path면 `bad_request` 또는 domain-specific error 반환

이 규칙은 다음 장점을 가진다.

- picker와 runtime contract가 일치함
- 설정되지 않은 path로의 우발적 전환을 방지함
- explicit repo 추가가 필요하면 TOML의 `workspaces`를 수정하면 됨

### 5.3 single/multi workspace 렌더링

현재 `app/views/workspace-picker.js`의 UI shape는 유지한다.

- 0개 → 렌더링 안 함 또는 empty state
- 1개 → label
- 2개 이상 → dropdown

다만 data source는 새 config 기반 discovery로 바뀐다.

## 6. 컬럼형 UI 공통 scroll contract

### 6.1 적용 범위

다음과 같은 viewport-bounded multi-column / multi-pane UI에 공통 적용한다.

- Board
- Worker
- 앞으로 추가될 유사 panel/column 레이아웃

### 6.2 핵심 원칙

1. **페이지 전체가 길어지기보다, 컬럼/패널 내부가 스크롤한다.**
2. **header/toolbar는 보이고 body만 스크롤한다.**
3. **scroll ownership은 body에 있다.**
4. **상위 flex/grid chain에 `min-height: 0`을 명시해 내부 scroll이 실제로 가능해야 한다.**

### 6.3 공통 primitive

공통 layout primitive는 다음 개념으로 정리한다.

- shell/container
- header
- body

권장 CSS 계약:

```css
.column-shell {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.column-header {
  flex: 0 0 auto;
  position: sticky;
  top: 0;
}

.column-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
```

구체 class name은 implementation에서 화면별 naming에 맞게 조정할 수 있지만, 계약은 위와 같다.

## 7. Board 레이아웃 재정의

### 7.1 shell height

Board 전체는 상단 nav/header 아래 남은 높이를 사용해야 한다.

즉, `panel__body`와 `board-root`는 다음을 만족해야 한다.

- 부모가 height-bounded container
- child grid/flex가 `min-height: 0`
- 각 column이 동일 기준 높이 안에서 작동

### 7.2 scroll ownership 변경

Board에서는 다음으로 정리한다.

- `.board-column`은 shell
- `.board-column__header`는 sticky header
- `.board-column__body`는 scroll container

따라서 현재의
- `.board-column { overflow: auto }`
- `.board-column__body { overflow: visible }`
구조는 바뀌어야 한다.

새 계약은 다음이다.

- `.board-column { overflow: hidden }` 또는 non-scrolling shell
- `.board-column__body { overflow-y: auto }`

### 7.3 header 구성

Board column header에는 다음이 포함될 수 있다.

- title
- count
- closed filter / 기타 control row

이 영역은 스크롤 시에도 상단에 남아야 한다.

## 8. Worker 레이아웃 재정의

### 8.1 pane scroll contract

Worker는 Board와 동일한 “여러 상태 column” 구조는 아니지만, operator가 오래 사용하는 pane형 UI라는 점에서 같은 scroll contract를 따라야 한다.

구체적으로:
- left tree/toolbar 영역은 viewport 기준 높이에 맞춰야 함
- right detail 영역도 독립 scroll 가능해야 함
- 전체 page scroll에 의존하지 않아야 함

### 8.2 공통성과 차이

Worker는 markup을 Board와 완전히 통합하지 않는다.

대신 다음만 공통화한다.

- height-bounded shell
- sticky/static header 영역
- scrollable body 영역
- `min-height: 0` chain

즉, **layout primitive는 공통, 화면 markup은 별도 유지**가 원칙이다.

## 9. dotfiles install/provider 연계

### 9.1 provider 역할

dotfiles는 `~/.config/bdui/config.toml`의 provider가 된다.

install 시 최소한 다음을 보장해야 한다.

- `~/.config/bdui/` 디렉터리 준비
- `config.toml` 생성 또는 갱신
- 기본 `scan_roots` / `workspaces` / `default_workspace` 설정
- legacy 설정 파일 생성 중단

### 9.2 cleanup 정책

dotfiles install은 다음 legacy 파일을 더 이상 만들지 않는다.

- `~/.config/bdui-workspaces.conf`
- `~/.config/bdui-default-workspace`

선택적으로 기존 설치 산출물을 cleanup할 수 있다. 다만 cleanup 여부는 implementation plan에서 안전성/사용자 영향 기준으로 확정한다.

### 9.3 repo 경계

이 spec은 beads-ui repo 안에 작성되지만, 실제 실행 workstream은 두 repo로 나뉜다.

- `beads-ui`: config consumer + layout contract owner
- `dotfiles`: config provider / shared runtime wrapper owner

즉, dotfiles 연계는 같은 spec 범위 안에 정의되지만 implementation은 cross-repo follow-up으로 분리될 수 있다.

## 10. 실패 모드와 안전성

### 10.1 config.toml 없음

- 서버는 죽지 않는다
- workspace 목록은 비어 있을 수 있다
- label config는 default visible prefixes를 사용한다
- debug log에 missing config 사실을 남긴다

### 10.2 config.toml parse 실패

- 서버는 죽지 않는다
- runtime config는 safe defaults로 fallback
- parse error를 로그에 남긴다

### 10.3 invalid workspace path

- 해당 entry만 무시한다
- 전체 discovery 실패로 확대하지 않는다
- `default_workspace`가 invalid면 다음 우선순위로 fallback한다

### 10.4 configured 밖 path 전환 시도

- `set-workspace`는 에러를 반환한다
- 현재 workspace는 유지된다
- 클라이언트는 error toast 또는 명시적 실패 surface를 보인다

## 11. 테스트 전략

## 11.1 beads-ui

### config / discovery

- TOML loader: valid config parse
- TOML loader: missing file fallback
- TOML loader: parse error fallback
- `scan_roots` + `workspaces` merge
- duplicate path dedupe
- invalid workspace skip
- `default_workspace` resolution

### current workspace / picker

- `list-workspaces`가 config 기반 current를 반환
- `default_workspace`가 localStorage hint보다 우선
- available 목록 밖 path는 `set-workspace`에서 reject

### layout

- Board: body만 scroll되고 header는 유지
- Worker: left/right pane가 viewport-bounded 상태에서 독립 scroll 가능
- 긴 목록에서도 전체 페이지가 비정상적으로 길어지지 않음

## 11.2 dotfiles

- install 시 `~/.config/bdui/config.toml` 생성
- legacy 설정 미생성
- `bdui-server`가 새 TOML을 기준으로 startup workspace를 선택
- 기존 shared runtime smoke test가 새 계약과 정합함

## 12. 롤아웃 순서

### 12.1 workstream A — beads-ui

1. TOML config loader 도입
2. workspace discovery를 TOML 기반으로 전환
3. picker/current workspace 규칙 정리
4. Board/Worker layout scroll contract 반영
5. 관련 테스트 보강

### 12.2 workstream B — dotfiles

1. install이 `config.toml`을 생성/관리하도록 전환
2. `bdui-server`가 새 TOML을 읽도록 수정
3. legacy 설정 생성 제거
4. install/shared runtime 테스트 갱신

beads-ui가 새 contract를 먼저 이해한 뒤 dotfiles provider가 그 contract를 배포하는 순서가 가장 안전하다.

## Acceptance Criteria

1. bdui 설정의 canonical source는 `~/.config/bdui/config.toml` 하나다.
2. `beads-ui`는 더 이상 `config.json`, `bdui-workspaces.conf`, `bdui-default-workspace`를 읽지 않는다.
3. TOML 하나로 `default_workspace`, `scan_roots`, `workspaces`, `labels.visible_prefixes`를 정의할 수 있다.
4. picker는 scan 결과와 직접 지정 workspace를 모두 보여준다.
5. `default_workspace`가 유효하면 bootstrap current workspace는 이를 따른다.
6. 브라우저 localStorage는 `default_workspace`보다 우선하지 않는다.
7. `set-workspace`는 configured/available workspace만 허용한다.
8. Board에서 긴 컬럼도 viewport 안에서 유지되며 column body만 세로 스크롤된다.
9. Worker 등 다른 컬럼형 UI도 같은 scroll contract를 따른다.
10. dotfiles install은 `config.toml`을 자동 배포하고 legacy 설정 파일을 생성하지 않는다.
