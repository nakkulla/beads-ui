# Worker 검증·배포 스크립트 내용 팝업 설계 (UI-k34k)

## 배경

Worker의 `저장소 작업 · 검증/배포 선언 · 자동 해결` 영역은
`repo-ops/config.toml`에서 해석한 머지 전 검증과 머지 후 배포 스크립트 경로를
보여주지만, 현재는 경로가 단순 `<code>` 텍스트라 내용을 확인하려면 저장소를
별도로 열어야 한다.

표시된 경로는 현재 체크아웃 파일이 아니라 Worker가 고정한 target-base SHA의
선언을 뜻한다. 따라서 팝업도 같은 Git 버전의 blob을 보여줘야 한다. 현재 파일을
직접 읽거나 스크립트 본문을 Worker 스냅샷에 싣는 방식은 실제 실행 대상과 다른
내용을 보여주거나 모든 스냅샷의 크기와 노출 범위를 키우므로 사용하지 않는다.

## 목표

- 선언된 검증·배포 스크립트 경로를 클릭하면 중앙 팝업에서 내용을 확인한다.
- 팝업은 화면에 표시된 `base_sha`와 같은 Git 트리의 검증된 blob만 보여준다.
- 선택한 B안인 미니멀 코드 뷰어를 기존 Worker 색상·모달 체계와 맞춰 구현한다.
- 임의 저장소 경로나 임의 파일을 읽는 범용 파일 API를 만들지 않는다.
- 키보드·모바일·복사·로딩·오류 상태를 포함해 독립적으로 사용할 수 있는 읽기
  전용 컴포넌트로 만든다.

## 범위

### 포함

1. Worker 저장소 작업 설정의 `머지 전 검증`, `머지 후 배포` lane에서 선언된
   스크립트 경로를 클릭 가능한 컨트롤로 바꾼다.
2. 등록된 workspace와 현재 표시 중인 repo-ops 선언에 결속된 전용 읽기 API를
   추가한다.
3. 고정 Git blob을 미니멀 코드 팝업에 표시하고 전체 내용 복사를 지원한다.
4. shell shebang이 있는 내용에만 가벼운 안전한 구문 색상을 적용한다.
5. 서버·프런트 단위 테스트, 통합 렌더 테스트, 정적 번들을 갱신한다.

### 제외

- 저장소 작업 타임라인의 과거 operation 스크립트 경로
- `repo-ops/config.toml` 내용 팝업
- 스크립트 편집·실행·다운로드
- 범용 저장소 파일 브라우저 또는 기존 Markdown 문서 뷰어 확장
- shell 이외 언어의 구문 분석
- repo-ops 선언 형식, workflow 계약 키·라벨·게이트 의미 변경
- 스크립트 본문을 Worker queue 스냅샷에 포함하는 변경

## 소유권과 변경 표면

이 변경은 repo-ops 계약의 소비자 표시 기능이다. 선언의 canonical 검증은 계속
`server/worker/repo-ops-resolver.js`가 소유하며, 새 API는 그 해석 결과를 재사용한다.

- 선언·script identity 검증 owner:
  `server/worker/repo-ops-resolver.js`
- 현재 Worker 표시 선언 owner:
  `server/worker/repo-ops-display.js`
- 등록 workspace allowlist owner:
  `server/registry-watcher.js`
- 새 HTTP 소비자:
  `server/routes/repo-ops-script.js`, `server/app.js`
- 새 팝업 소비자:
  `app/views/worker/repo-ops-script-viewer.js`
- 기존 클릭 진입점:
  `app/views/worker/repo-ops-settings.js`, `app/views/worker/index.js`
- 스타일:
  `app/styles.css`
- 생성 산출물:
  `app/main.bundle.js`, `app/main.bundle.js.map`
- checker·test:
  새 route/viewer 테스트, `app/views/worker/repo-operations.test.js`, 기존
  `npm run tsc`·`npm test`·`npm run lint`·Prettier·build

dotfiles의 `docs/contracts/workflow.{md,yaml}`이나 generated contract projection은
바꾸지 않는다.

## 서버 설계

### API

`GET /api/repo-ops-script?workspace=<abs>&lane=verify|deploy&base_sha=<40hex>`

클라이언트는 파일 경로와 blob SHA를 요청값으로 보내지 않는다. 서버가 다음 순서로
정확한 파일을 결정한다.

1. `workspace`가 절대경로이고 등록 workspace allowlist에 정확히 포함되는지 확인한다.
2. `lane`이 `verify` 또는 `deploy`, `base_sha`가 40자리 hex인지 확인한다.
3. `repoOpsDisplayFor(workspace)`가 `resolved`이고 그 `base_sha`가 요청 SHA와 같은지
   확인한다. 팝업을 여는 사이 current-base 선언이 바뀌면 stale로 거부한다.
4. `resolveRepoOps({ repo: workspace, sha: base_sha, gitRun })`를 다시 실행해 해당 SHA의
   config, lane 경로, mode `100755`, blob identity를 검증한다.
5. 해석 결과에서 선택한 lane이 선언돼 있을 때만 그 `blob_sha`를
   `git cat-file`로 읽는다. 사용자 입력 경로는 git 명령에 들어가지 않는다.
6. blob 크기는 최대 `200_000` bytes다. NUL 바이트가 있거나 fatal UTF-8 decode에
   실패한 내용은 텍스트가 아닌 것으로 보고 반환하지 않는다.

성공 응답은 다음 표시 사실만 포함한다.

```json
{
  "ok": true,
  "lane": "deploy",
  "path": "repo-ops/script/deploy",
  "base_ref": "main",
  "base_sha": "<40hex>",
  "blob_sha": "<40hex>",
  "mode": "100755",
  "timeout_ms": 600000,
  "content": "#!/bin/sh\n..."
}
```

응답에는 `Cache-Control: no-store`를 적용한다. API는 파일을 실행하거나 workspace를
수정하지 않는다.

### 오류

- `400 bad_request`: workspace·lane·SHA 형식 오류
- `403 forbidden`: 등록되지 않은 workspace
- `404 lane_not_declared`: 현재 고정 선언에 선택 lane이 없음
- `409 stale_declaration`: 현재 표시 cache와 요청 `base_sha`가 다르거나 표시 상태가
  더 이상 `resolved`가 아님
- `413 too_large`: blob이 200,000 bytes 초과
- `415 unsupported_content`: NUL 바이트 또는 잘못된 UTF-8이 포함된 비텍스트 내용
- `404 unreadable`: 재해석이나 exact blob 읽기 실패

오류 시 현재 체크아웃 파일로 폴백하지 않는다. stale 오류는 새 queue snapshot이
도착한 뒤 사용자가 현재 경로를 다시 누르게 한다.

## 프런트엔드 설계

### 클릭 진입점

`repo-ops-settings.js`는 선언이 있는 lane의 경로만 `<button type="button">`으로
렌더한다. 외형은 기존 모노스페이스 `<code>`와 같고 hover·focus-visible에서 링크
색, 얇은 밑줄, focus ring을 보여준다. lane이 없거나 declaration 상태가
`pending|error|absent`이면 버튼을 만들지 않는다.

클릭 callback은 다음 값을 전달한다. `path`와 `base_ref`는 loading 헤더의 표시
전용이며 API query에는 들어가지 않는다.

```js
{
  lane: 'verify' | 'deploy',
  base_sha: '<40hex>',
  path: 'repo-ops/script/deploy',
  base_ref: 'main'
}
```

### 팝업

`createRepoOpsScriptViewer`는 Worker view가 `document.body` 아래에 만든 전용 mount를
소유한다. Worker 본문 재렌더와 분리해 fetch 중에도 팝업 DOM이 사라지지 않는다.

선택한 B안은 다음 구조다.

- 폭 `min(860px, 94vw)`, 최대 높이 약 `86vh`의 중앙 모달
- 얇은 헤더에 script 경로, `base_ref@shortSHA`, 복사, 닫기만 표시
- 줄 번호 열과 코드 열을 가진 어두운 스크롤 영역
- 세로·가로 스크롤, 텍스트 선택, 긴 줄 무강제 줄바꿈
- 모바일에서는 거의 전체 화면으로 확장하되 헤더와 줄 번호 유지
- 로딩·오류 상태도 같은 모달 body에서 표시

`role="dialog"`, `aria-modal="true"`, 구체적인 접근성 이름을 제공한다. 열릴 때 닫기
버튼으로 포커스를 옮기고, `Esc`, backdrop, 닫기 버튼으로 닫은 뒤 원래 클릭한
경로 버튼에 포커스를 돌려준다. 컴포넌트 `destroy()`는 keydown listener와 body mount를
정리한다. 늦게 도착한 이전 fetch 응답은 request sequence로 무시한다.

복사는 `copyToClipboard`와 기존 toast를 사용한다. 성공은 `스크립트 복사됨`, 실패는
`스크립트 복사 실패`로 알린다.

### 코드 표현과 안전성

본문은 `unsafeHTML`을 사용하지 않는다. 각 줄을 텍스트 토큰으로 나누고 lit-html의
일반 값 보간으로 렌더한다. 첫 줄 shebang의 실행기 basename이
`sh|bash|zsh|dash|ksh`일 때만 주석, 인용 문자열, `$` 변수, 제어 키워드에 제한된
색상을 적용한다. tokenizer가 해석하지 못하는 조각은 원문 텍스트로 그대로
표시한다. shell이 아닌 내용은 별도 분석 없이 일반 코드로 표시한다.

줄 번호는 실제 newline 분할 결과와 1:1로 만든다. 응답 content와 복사 content는
변형하지 않는다.

## 상태 흐름

1. 사용자가 검증 또는 배포 script 경로 버튼을 누른다.
2. 팝업이 즉시 열리고 loading 상태를 표시한다.
3. 클라이언트가 현재 workspace, lane, 화면의 `base_sha`로 전용 API를 호출한다.
4. 성공하면 서버가 돌려준 exact path/SHA/content로 ready 상태를 그린다.
5. 실패하면 알려진 오류를 한국어 문장으로 표시하며 팝업은 닫지 않는다.
6. 사용자는 내용을 선택하거나 복사한 뒤 `Esc`·backdrop·닫기로 돌아간다.

## Test scope

승인된 RED-GREEN seam은 아래 경계로 한정한다.

### RED

- route: 등록 workspace의 resolved deploy/verify lane이 exact `base_sha`의 blob 내용을
  반환한다.
- route: working tree 파일이 달라도 committed blob 내용을 반환한다.
- route: client path query를 사용하지 않고 선언에서 찾은 경로만 읽는다.
- route: 미등록 workspace, 잘못된 lane/SHA, stale display, lane 부재, 초과 크기,
  NUL content를 각 오류로 거부한다.
- viewer: loading 뒤 경로·short SHA·줄 번호·원문을 렌더한다.
- viewer: HTML 모양의 script 내용도 DOM으로 실행하지 않고 텍스트로 표시한다.
- viewer: shell token 색상은 원문과 복사 내용을 바꾸지 않는다.
- viewer: 복사, `Esc`, backdrop, 닫기, 포커스 복원을 각각 수행한다.
- settings/index: 선언된 verify·deploy 경로 클릭이 정확한 lane/base SHA로 viewer를
  열고, 선언 없는 lane에는 클릭 컨트롤이 없다.

### 회귀

- 기존 `GET /api/doc`의 docs-only 경계는 변하지 않는다.
- repo-ops `resolved|absent|pending|error` 표시 문구와 timeout 설명은 유지된다.
- Worker 본문 재렌더와 workspace 전환에서 열린 viewer가 이전 workspace 내용을
  남기지 않는다.
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write` 후 포맷 diff 확인
- `npm run build` 및 `app/main.bundle.js`, `app/main.bundle.js.map` 갱신

## 수용 기준

1. 저장소 작업 설정에 선언된 검증·배포 경로가 클릭 가능하다는 사실을 hover,
   focus-visible, 커서로 알 수 있다.
2. 경로 클릭 시 B안의 미니멀 코드 팝업이 열리고 실제 실행 선언과 같은
   `base_sha`의 내용을 보여준다.
3. 현재 checkout 파일이 다르거나 declaration이 클릭 사이 바뀌어도 잘못된 내용을
   보여주지 않는다.
4. 임의 경로·미등록 workspace·비텍스트·과대 파일은 읽을 수 없다.
5. 키보드 닫기, 포커스 복원, 모바일 스크롤, 전체 내용 복사가 동작한다.
6. Pre-Handoff 검증과 정적 번들 생성이 모두 통과한다.
