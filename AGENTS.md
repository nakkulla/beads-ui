# Agents

## 설계 결정 기록 (ADR)

- 정본: `docs/adr/README.md` "현재 유효한 결정". 충돌 시 supersede ADR
  필요(`adr` 스킬; 인덱스는 생성물이라 직접 편집 금지).

## Beads (bd)

- 사용법·타입·우선순위·의존성 어휘는 `bd-usage`/`bd-runtime` 스킬이 정본이다.
  `CHANGES.md`는 갱신하지 않는다.
- 이 저장소가 읽고 표시하는 workflow 계약 표면(라벨·metadata 키·`status` 어휘)의
  정본은 dotfiles
  `docs/contracts/workflow-contract.md`/`workflow-state.yaml`이다(ADR 0012).
  beads-ui는 소비자이며 정의자가 아니다 — 계약 키 부재를 관측하면 표시를
  생략(fail-quiet)하고 계약 쪽 정정을 별도로 제기한다.

## Coding Standards

- ESM. `PascalCase`: 클래스·인터페이스. `camelCase`: 함수·메서드·콜러블 변수.
  `lower_snake_case`: 그 외 변수·매개변수. `UPPER_SNAKE_CASE`: 상수.
  `kebab-case`: 파일·디렉터리.
- 런타임 코드는 JSDoc 타입 주석 `.js`; 타입 전용 정의만 `.ts`(런타임 코드·부작용
  금지). 필요하면 파일 상단에 `@import` JSDoc 블록.
- 모든 함수·메서드에 `@param`; `@returns`는 반환 타입이 자명하지 않을 때만. 빈
  컬렉션으로 초기화되거나 타입이 바뀔 수 있는 지역 변수는 `@type` 명시.
- 모든 제어문에 중괄호. `?.`/`??`는 값이 의도적으로 nullable할 때만.

## 워커·모니터 카드 배치 문법

`candidateCard`·`miniRow`·`runningTile`을 건드리기 전에 정본을 읽는다:
`docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md`(§2 줄
순서, §5.1 슬롯 표), `2026-08-28-chip-grammar-unify-design.md`(칩 클릭 의미),
`2026-09-02-worker-operation-surface-unify-design.md`(§3.2 `.op-btn`). 슬롯이
없는 새 라벨·칩·버튼은 스펙을 먼저 갱신해 슬롯을 정한 뒤 단다(ADR 0014). 재료가
없는 줄은 그리지 않는다(fail-quiet).

## Unit Testing Standards

- 한 테스트는 한 동작만; 이름은 능동 동사("should…" 금지); setup → execution →
  assertion을 빈 줄로 구분.
- 테스트를 통과시키려고 구현을 고치지 않는다.

## Pre-Handoff Validation

- 새 워크트리 첫 검증 전 `node --version`이 `package.json#engines`를 만족하는지
  확인한다. Worker 워크트리는 Worker의 설치 결과 줄(`node_modules=ok`)이 의존성
  증거이고, 직접 만든 워크트리는 `npm ci`한다(다른 체크아웃의 `node_modules`
  차용·심링크 금지 — 소스맵이 경로 독립적이어야 한다).
- `npm run tsc`, `npm run lint`, `npx prettier --write <변경 파일>`,
  `npx vitest run --reporter=dot`(timeout 120초; fork-pool이 드물게 교착하면
  죽이고 재실행; `| tail`로 진행을 가리지 않는다).
- 번들은 tracked가 아니다(`.gitignore`); 로컬 정적 모드 확인이 필요하면
  `npm run build`.

## Worker pitfalls

- zsh: 글롭은 따옴표 — `grep -rn 'x' --include='*.js' server`;
  `app/main.bundle.js`는 grep에서 제외.
- 파이프 뒤 exit code는 마지막 명령의 것이다 — `set -o pipefail` 또는
  `cmd >log 2>&1; echo rc=$?`.
- 한글 JSDoc 설명은 `jsdoc/match-description`에 걸린다 — ASCII
  토큰(식별자·`false` 등) 하나를 넣는다.
- 큰 파일은 `Read`를 offset/limit 400~800줄로 나눠 읽고, 편집은 `Edit`로
  한다(heredoc 치환 편집 금지).
- vitest 출력은 ANSI 색을 포함한다 — 개수를 셀 때 `--reporter=dot`과 `grep -a`.
- base 동기화(`git merge origin/main`)에서 번들의 modify/delete 충돌이 나면
  `git rm -q -- app/main.bundle.js app/main.bundle.js.map`으로 삭제를 채택하고
  병합 커밋을 만든다.

## Post-Merge Runtime Validation

- 머지는 완료가 아니다: 이 저장소는 공유 서비스 배포까지 마쳐야 완료다. 배포
  선언은 핀된 base SHA의 `repo-ops/config.toml` `[deploy]`(ADR 0010)이고,
  Worker가 추적하는 Bead PR 머지는 관측 후 Worker가 배포·정리한다. 실패
  사다리·자동 처리 범위의 정본은 dotfiles이며 이 저장소는 핀 사본
  `generated/contracts/repo-operation-policy.json`만 읽는다.
- Worker가 추적하지 않는 quick_fix ref push나 세션 직접 머지는 배포 실행과 증거
  확인까지 그 세션이 소유한다: 정본 런타임은 `.worktrees/.repo-ops-deploy`, 외부
  executor는 `.worktrees/.repo-ops-deploy.lock`의 `fcntl.flock` 계약을 쓴다.
- 공유 서버는 `bdui-shared restart` 뒤 프로세스 경로·포트·HTTP 응답을 확인한다.
  `bdui`(로컬 개발은 `npm link`)는 다른 포트의 ad-hoc 개발 서버 전용이다. 최신
  소스를 즉시 반영하려면 `BDUI_FRONTEND_MODE=live`(아니면 정적 번들이 서빙되므로
  `npm run build` 선행).

## GitHub Actions

- `.github/workflows/`는 비어 있고 재추가하면 테스트가 실패한다. 머지 자격은
  checks를 보지 않는다(ADR 0003) — `gh pr checks`를 호출하지 않는다.
- 머지 전 검증은 Pre-Handoff Validation이 맡고,
  `[verify]`(`repo-ops/script/verify`)는 머지 직전 candidate에서 도는 별개
  안전망이다.

## Pull Request Target

- PR은 fork `origin`(`nakkulla/beads-ui`)이 기본 대상이다. `upstream`은 사용자가
  명시적으로 요청할 때만.
