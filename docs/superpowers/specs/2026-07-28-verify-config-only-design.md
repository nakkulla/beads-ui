# verify 자동감지 폐지 — verify·deploy 모두 config 명시 전용 (UI-uk6d)

- 날짜: 2026-07-28
- Bead: UI-uk6d
- 배경: `worker-attempt-resume-verify-autodetect §2.2`가 도입한 verify 명령
  자동감지(repo 루트 마커 파일 프로브)는 감지된 명령이 그 repo의 canonical
  검증과 다를 수 있다. 실제로 `External/beads`는 자동감지가 고르는
  `go test ./...`가 ICU cgo 빌드로 실패해 `make test`를 config에 명시해야 했고,
  그 사유가 지금 `config.toml` 주석에 남아 있다. 추측된 명령이 초록이면 잘못된
  신뢰를, 빨강이면 잘못된 차단을 만든다.
- 관측: 2026-07-28 기준 `~/.config/bdui/config.toml`의 `[worker.verify]` 섹션은
  beads-ui·dotfiles·External/beads 3개 workspace 전부를 명시하고 있다. 자동감지
  경로는 현재 어느 workspace에서도 실제로 선택되지 않는다.

## 목표

verify를 deploy와 완전히 대칭으로 만든다: **`config.toml`에 직접 쓴 섹션만이
verify 명령의 유일한 정의처**이고, 그 밖의 추론 경로는 없다.

## 스코프 제외 (YAGNI)

- UI에서의 명령 편집 폼 — 명령 정의는 config 파일 전용(보안 경계) 유지.
  브라우저에서 임의 argv를 저장할 수 있게 만드는 것은 별도 설계 사안이다.
- deploy 동작 변경 (이미 config 전용).
- merge gate 티어 판정 로직 변경 (`verify_cmd_present` 입력만 바뀐다).
- 기존 스펙 문서 `2026-07-24-worker-attempt-resume-verify-autodetect.md` 개정 —
  히스토리로 보존하고, 그 §2.2의 폐지는 이 문서가 선언한다.

## 1. `server/worker/verify-cmd.js`

- `detectVerifyCmd()` 삭제. 이와 함께 `node:fs` import, `deps.fs` 주입
  파라미터가 사라진다 — 파일 프로브가 없으므로 주입할 대상이 없다.
- `resolveVerifyCmd(repo, config_map)`: `path.resolve(repo)` 키로 config 섹션을
  조회하고, non-empty argv를 가진 섹션이 있으면 그것을, 없으면 `null`을
  반환한다. 감지 폴백 없음.
- `ResolvedVerifyCmd`에서 `source` 필드를 제거해 `{ cmd, timeout_ms }`로
  축소한다. 값이 `'config'` 하나뿐인 필드는 정보를 담지 않는다.
- `timeout_ms` 폴백(`DEFAULT_VERIFY_TIMEOUT_MS` = 600000)은 유지한다. 정규화
  소유자는 `config.js`의 `normalizeWorkerVerify`이며, 이 폴백은 그 계약을
  우회해 주입된 map에 대한 방어로만 남는다.
- 모듈 상단 주석에서 자동감지 서술을 폐지 사유(위 배경)로 교체한다.

## 2. 서버 소비처

- `server/ws/worker-handlers.js` `decorateQueue`: `verify_cmd` 지역 타입 주석에서
  `source`를 제거한다. 스냅샷 `workspace_info.verify_cmd`는 `{ cmd, timeout_ms }`
  로 나간다.
- `server/worker/attach.js`: 호출 형태가 그대로이므로 코드 변경 없음
  (`ResolvedVerifyCmd` 타입 참조만 좁아진다).
- merge gate(`server/worker/merge-gate.js`)는 변경하지 않는다. verify 섹션이 없는
  workspace는 `verify_cmd_present=false`가 되어 CI도 없을 때 3티어
  「검증 신호 없음」으로 내려간다 — 이는 의도된 결과이며, 머지 클릭 자체가
  사람의 판단이 된다.

## 3. UI (`app/views/worker/exec-defaults-dialog.js`)

- `verifyGroup`: `source === 'detected'` 분기와 `자동감지` 배지를 제거하고,
  deploy와 동일하게 `config` 배지를 고정 표시한다.
- verify 미설정 표시를 deploy와 대칭으로 바꾼다:
  `검증 없음 — [worker.verify."<workspace 경로>"] 섹션으로 정의`.
  명령을 직접 입력하는 것만 남은 이상, 어디에 쓰는지가 화면에 있어야 한다.
  경로는 deploy 행과 동일하게 `getWorkspacePath()`(없으면 `<workspace 경로>`)를
  쓴다.
- `app/styles.css`의 `.exec-defaults__vd-badge--detected` 규칙을 제거한다.
- 다이얼로그는 계속 읽기 전용이며 「읽기 전용 — config.toml에서 정의」 부제도
  그대로다.

## 4. 테스트

- `server/worker/verify-cmd.test.js`: `detectVerifyCmd` 케이스 전부와
  `resolveVerifyCmd`의 감지 폴백 케이스를 제거하고, config 섹션 적중 /
  섹션 부재 시 `null` 두 갈래만 남긴다. `source` 단언 삭제.
- `app/views/worker/index.test.js`: 자동감지 배지 테스트를 제거하고, verify 행이
  항상 `config` 배지를 다는 것과 미설정 시 `[worker.verify."<경로>"]` 안내가
  뜨는 것을 검증하는 테스트로 교체한다. 다른 테스트가 fixture로 넘기던
  `source: 'detected'`도 정리한다.

## 수용 기준

1. `[worker.verify."<abs>"]` 섹션이 있는 workspace: 그 명령이 그대로 쓰이고
   ⚙ 다이얼로그에 `config` 배지와 timeout이 표시된다.
2. 섹션이 없는 workspace: repo 루트에 `package.json`/`Cargo.toml`/`go.mod`가
   있어도 verify는 실행되지 않으며, 다이얼로그는 `검증 없음`과 함께 써야 할
   config 섹션 이름을 보여준다.
3. `detectVerifyCmd` 심볼과 `source: 'detected'` 값이 저장소 런타임 코드·테스트
   어디에도 남지 않는다.
4. `npm run all` 통과, `npm run build`로 갱신된 번들 포함.
