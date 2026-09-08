---
scope:
  - package.json
  - scripts/package-runtime-assets.test.js
  - app/data/analyzer-efforts.js
  - app/data/analyzer-efforts.test.js
  - app/data/providers.js
  - app/data/providers.test.js
  - app/utils/issue-id-renderer.js
  - app/utils/issue-id-renderer.test.js
  - app/utils/priority-badge.js
  - app/utils/status-badge.js
  - app/utils/status-badge.test.js
  - app/utils/status.js
  - app/utils/status.test.js
  - app/utils/type-badge.js
  - app/utils/type-badge.test.js
  - app/views/display-settings-dialog.js
  - app/views/display-settings-dialog.test.js
  - app/main.bundle.js
  - app/main.bundle.js.map
  - README.md
  - docs/architecture.md
  - docs/db-watching.md
---

# 배포 패키지·미사용 코드·운영 문서 정리

- Bead: UI-7732
- 작성일: 2026-09-08
- 상태: 작성안 — 사용자 문구 검토 전, 구현·발행 전
- 경로: spec_backed. 한 저장소에서 한 작성자가 통합 변경과 검증을 인도한다.
- 통합: UI-bk86(미사용 코드), UI-yvxn(문서), UI-r6zj(순환 의존 관찰).
- 함께 작성한 스펙: [반복 조회와 화면 갱신 비용](2026-09-08-refresh-work-efficiency-design.md), UI-hhn9.

## 1. 목표와 범위

설치용 패키지가 실제 실행에 필요한 파일을 빠짐없이 포함하게 하고, 실행 경로가
없는 코드와 현재 동작에 맞지 않는 안내를 함께 정리한다. 성공 기준은 패키지의
실행 의존성 충족과 기존 기능 유지다. 삭제한 줄 수나 파일 수를 목표로 삼지 않는다.

2026-09-08 사용자는 전체 점검 결과로 만든 7개 이슈가 과하게 나뉘었다고 지적했고,
성능 개선과 배포·코드·문서 정리 2개로 통합한 뒤 스펙을 작성하도록 요청했다.
이 문서는 그중 두 번째 작업이다. 새 이슈나 구현 단계별 자식을 만들지 않는다.

순환 의존 전체 해체는 필수 작업에서 제외한다. 이번에 실제로 바꾸는 코드의
의존성 정합을 위해 필요한 국소 수정만 검토하며, 별도의 계층 재설계로 확대하지 않는다.

## 2. 조사 근거

조사 기준 실행 코드는 `ed3ce09185bcac1ee756c2fbacee8efeb0bea081`이다.
이후 확인한 main 변경은 설계 문서 추가였고 아래 실행 코드는 같았다.

| 확인한 사실 | 근거 | 의미 |
| --- | --- | --- |
| 게시 파일 11개 누락, 서버의 미해결 정적 참조 21곳 | `npm pack --dry-run --ignore-scripts --json`의 실제 파일 집합과 서버 TypeScript AST 대조 | 체크아웃 테스트 통과만으로 설치 패키지 실행을 보장하지 못한다 |
| 실행 코드에서 쓰지 않는 모듈 8개, 880줄 | 런타임 import/re-export/문자열 dynamic import, HTML 진입점, 실제 esbuild 입력 대조 | 구현과 전용 테스트를 정리할 수 있으나 현재 bundle 용량 감소를 기대하면 안 된다 |
| README의 타 저장소 CI/라이선스 배지와 전체 인터페이스 바인딩 예시 | `README.md:11-12,70-73,115` | 현재 운영 방침에 맞게 바로잡아야 한다 |
| 구조 문서의 사라진 화면 경로와 SQLite만 설명하는 감시 문서 | `docs/architecture.md:40,165-168`, `docs/db-watching.md:3-30` | 현재 중앙 Dolt 운영과 남아 있는 SQLite 호환 경로를 구분해야 한다 |

조사 당시 타입·lint·포맷 검사와 테스트 10,921개가 통과했다. 메모리에서 만든
실제 프런트 bundle/map도 추적 중인 두 파일과 동일했다. 이 수치는 기존 검증의
기준선이며 이번 변경의 검증을 대신하지 않는다.

## 3. 선택한 접근

| 접근 | 장점 | 비용·문제 | 판단 |
| --- | --- | --- | --- |
| 필요한 게시 파일을 명시적으로 추가하고 도달 불가능한 코드·틀린 안내만 정리 | 직접 원인을 작은 변경으로 해결하며 현재 구조를 유지한다 | 패키지 내용 검증이 추가로 필요하다 | 채택 |
| app 전체를 게시하고 미사용 파일은 유지 | 포함 목록 누락을 넓게 덮는다 | 소스·불필요 코드까지 배포하고 정리 요구를 해결하지 못한다 | 기각 |
| 공용 코드 디렉터리 이관과 모든 순환 의존 해체를 함께 수행 | 장기 구조를 한 번에 바꿀 수 있다 | 현재 결함보다 큰 호출 경로 변경과 검증 부담을 만든다 | 기각 |

## 4. 패키지 포함 목록과 검사

### 4.1 포함할 파일

`package.json#files`의 기존 항목을 유지하면서 다음 11개를 추가한다.

| 종류 | 경로 |
| --- | --- |
| 스타일 | `app/styles/tokens.css`, `app/styles/base.css` |
| 공용 실행 코드 | `app/utils/active-attempts.js`, `app/utils/session-preferred.js`, `app/utils/spec-after-blocker.js` |
| 공용 실행 코드 | `app/utils/token-usage.js`, `app/utils/failure-sentences.js`, `app/utils/quickfix-resume-kind.js` |
| 공용 실행 코드 | `app/utils/transcript-lines.js`, `app/utils/execution-defaults.js`, `app/data/closed-range.js` |

이 파일들의 내용은 변경하지 않는다. 기존 `app/utils/worker-eligibility.js`,
`app/protocol.js`, `server/` 포함으로 전이 의존성도 충족하는지 검사한다.
현재 스타일 두 파일에는 추가 `@import`나 로컬 자원 연결이 없다.

결정: 런타임 의존성·버전·lockfile·패키지 이름과 공개 대상 저장소는 바꾸지 않는다 —
문제는 누락된 게시 파일이며 새 의존성이나 배포 정책 변경이 필요하지 않다.

### 4.2 실제 파일 집합을 검증한다

`scripts/package-runtime-assets.test.js`에서 `npm pack --dry-run --ignore-scripts
--json` 출력 전체를 파싱한다. 실행 시간 상한을 두고 명령 실패와 비정상 JSON은
검사 실패로 처리한다. 이 검사는 tarball을 만들거나 prepack 빌드를 실행하지 않는다.

검증 대상은 다음과 같다.

1. 패키지에 포함된 서버·CLI·공용 JavaScript의 상대 import/re-export와 문자열
   dynamic import가 가리키는 파일이 게시 집합 안에 있다. JSDoc의 타입 인용을
   실행 import로 세지 않는다. `node:` 모듈과 외부 패키지는 상대 파일 검사에서 제외한다.
2. HTML의 로컬 stylesheet/script 참조가 게시 집합 안에 있다. 상대 경로를
   정규화하고 query/hash는 자원 경로에서 분리한다.
3. 공개 실행 진입점 `bin/bdui.js`, 정적 bundle/map 및 기존 서버 자산 포함이 유지된다.

설치된 TypeScript 파서와 표준 라이브러리를 사용한다. 현재 11개 경로를 테스트에
그대로 복사해 포함 여부만 확인하는 방식으로 끝내지 않는다. 미래의 서버 import가
게시 목록에 빠져도 같은 검사에서 실패해야 한다. 실제 서비스나 Worker를 기동하지 않는다.

이 검사는 전달된 기존 소스와 게시 목록을 확인한다. 의존성이 없는 환경을 보완하려고
다른 체크아웃의 node_modules를 연결하거나 자동 설치·공개 배포를 수행하지 않는다.

## 5. 미사용 모듈 정리

아래 구현 8개와 실제로 존재하는 같은 이름의 전용 테스트 7개를 삭제 대상으로 삼는다.
`priority-badge.js`에는 대응 테스트 파일이 없다.

| 구현 | 현재 줄 수 |
| --- | ---: |
| `app/data/analyzer-efforts.js` | 70 |
| `app/data/providers.js` | 85 |
| `app/utils/issue-id-renderer.js` | 88 |
| `app/utils/priority-badge.js` | 48 |
| `app/utils/status-badge.js` | 35 |
| `app/utils/status.js` | 49 |
| `app/utils/type-badge.js` | 34 |
| `app/views/display-settings-dialog.js` | 471 |

구현 시작 시 현재 base에서 도달성을 다시 확인한다. 새 실행 소비자가 생긴 파일은
삭제하지 않고 그 소비자와 유지 이유를 완료 보고서에 적는다. 대응 테스트가 현재
동작의 검증을 겸한다면 필요한 행위 검증을 활성 구현 쪽에 보존한다.

결정: 사용 중인 설정 창·배지·CSS 규칙은 이름이 비슷하다는 이유로 삭제하지 않는다 —
미사용 판단은 파일 도달성의 근거이며 CSS 선택자의 사용 여부까지 증명하지 않는다.

역사 스펙과 ADR의 옛 파일 인용도 삭제하지 않는다. 이 기록은 현재 소스를 가리키는
실행 의존성이 아니다.

프런트 소스 삭제 후 빌드는 실행하되, 삭제 직전 같은 base와 dependency 집합에서
재생성한 bundle/map과 비교한다. 대상이 실제로 도달 불가능했다면 바이트가 같다.
성능 스펙이 먼저 착지한 경우 그 변경을 포함한 새 base를 비교 기준으로 잡는다.

## 6. 운영·구조 문서

수정 문서는 `README.md`, `docs/architecture.md`, `docs/db-watching.md`다.

- README: 잘못된 CI 배지를 제거하고 라이선스 배지는 이 프로젝트의 라이선스를
  가리키도록 고친다. 현재 CI 워크플로가 없다는 결정을 뒤집지 않는다.
- 실행 예시: 기본 `127.0.0.1`을 사용한다. 다른 기기 접근 설명이 필요하면
  신뢰할 수 있는 네트워크의 실제 주소를 지정한다. `0.0.0.0`을 권장 예시로 쓰지 않는다.
  인증이 없고 네트워크 접근 범위가 읽기/수정 권한 범위라는 설명을 유지한다.
- 구조: 실제 `app/views/board/`, `detail-panel/`, `worker/`, `monitor/`와
  `server/ws/` 경로, CLI를 통한 데이터 읽기, 워크스페이스별 공유 스냅샷과 push를 설명한다.
- 감시: 중앙 Dolt 변경을 로컬 SQLite 파일 감시만으로 감지한다고 쓰지 않는다.
  현재 watcher는 SQLite면 파일의 상위 디렉터리를 파일명으로 필터링하고, metadata
  기반 workspace면 해당 `.beads` 디렉터리를 감시한다. 주기 갱신은 원격 변경 보완 경로다.
- 호환 범위: `server/db.js`의 SQLite 경로 해석과 Dolt metadata 해석은 여전히 있다.
  지원 중인 호환 코드를 폐기된 것으로 설명하지 않는다. metadata 경계에서 상위
  workspace의 SQLite를 빌리지 않는 규칙을 반영한다.
- `server/bd.js`는 실제 nearest SQLite 파일이 있을 때만 환경을 주입한다.
  모든 CLI 호출에 항상 `--db`를 강제한다고 쓰지 않는다. 중앙 서버 초기화·복구는
  이 문서의 임의 명령 대신 소유 절차를 가리킨다.

결정: 문서 정합을 이유로 런타임 기본값·배포 선언·workflow 어휘를 변경하지 않는다 —
이 문서는 현재 구현의 설명이며 새 운영 계약의 정의자가 아니다.

## 7. 소유권과 통합

| 표면 | 정본/수정 위치 | 소비자·검증 |
| --- | --- | --- |
| 패키지 내용 | `package.json#files` | 서버/CLI 모듈 해석, HTML 자원, 신규 패키지 테스트 |
| 미사용 구현 | §5의 파일과 전용 테스트 | 런타임 import 그래프, esbuild 입력, 남은 기능 테스트 |
| 현재 운영 설명 | §6의 세 문서 | 실제 db/watcher/bd/index 코드와 Accepted ADR |
| 배포 | 기존 `repo-ops/config.toml`, `repo-ops/script/deploy` | 기존 배포 operation의 종료·프로세스·포트·HTTP 검증 |

성능 스펙과 제품 동작에 관한 새 공통 결정을 공유하지 않는다. 둘 다 bundle/map을
만질 수 있으므로 각 구현은 자기 핀된 base에서 재생성하고 착지 시 통합한다.
파일 경로의 겹침만으로 선행 의존이나 추가 단계 이슈를 만들지 않는다.

## 8. 검증과 인수 기준

- 최초 검사 전 Node 버전과 `npm ls --depth=0`을 해당 체크아웃에서 확인한다.
- 패키지 테스트를 현재 base에서 먼저 실행하면 누락 파일 때문에 실패하고, 수정 후
  통과해야 한다. 실패가 테스트 환경이나 명령 실행 오류 때문인지 구분해 기록한다.
- 런타임 상대 의존성·HTML 자원 검사에 누락이 없고 기존 필수 진입점이 포함된다.
- 삭제 전부터 bundle 입력에 없던 모듈만 제거됐고, 현재 기능의 행위 검증이 남는다.
- 문서 경로와 설명을 실제 코드에 대조한다. 문구를 정규식으로 고정하는 테스트를
  새로 만들지 않고 링크·경로 확인과 문서 diff 검토로 판단한다.
- `npm run tsc`, `npm run lint`, `npm run prettier:check`,
  `npx vitest run --reporter=dot`을 통과한다. 전체 테스트 상한은 120초다.
  포맷 수정은 소유한 변경 파일에만 적용한다.
- `npm run build` 후 생성물 정합과 전체 변경 범위를 확인한다.
- 구현이 착지한 뒤에는 기존 선언에 따른 배포 성공과 실제 프로세스 경로·포트·HTTP
  응답 확인까지 기존 마감 절차를 따른다. 이 스펙 작성은 배포 실행 권한이 아니다.

이번 스펙의 변경은 범위가 정해진 한 통합 변경으로 인도한다. 서로의 검증을 기다리는
별도 실행 단위나 새 복구·계측 장치를 추가하지 않는다.

## 9. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | user_request | 서버 세대·화면 구독 성능은 설치 패키지·도달성·문서 정합과 독립적으로 검증·인도할 수 있는 사용자 승인 묶음 | 없음 | UI-hhn9 |

- UI-r6zj의 네 순환 의존 묶음은 관찰로 보존한다. 이번 포함 목록 수정과 도달 불가능한
  파일 삭제에 그 해체가 필요하다는 근거는 없으므로 독립 필수 과제를 만들지 않는다.
- 모듈/파일 이동, 공통 코드 디렉터리 신설, CSS 정리, 새 인증 기능, DB 연결 방식 변경,
  자동 수리·폴링 정책 변경, npm 공개 게시는 포함하지 않는다.
- 원래 이슈와 조사 근거는 통합 대상으로 연결해 보존하고, 흡수 이슈의 종료는
  구현 완료가 아니라 UI-7732로의 작업 통합으로 기록한다.

## 결정 (ADR 후보)

- 전제: ADR 0003 — CI 워크플로와 GitHub checks를 머지 판단에 다시 도입하지 않는다.
- 전제: ADR 0008 — 데이터 의미는 bd CLI가 소유하고 DB 드라이버를 새로 도입하지 않는다.
- 전제: ADR 0010 — 저장소별 배포는 기존 repo-ops 선언과 스크립트가 소유한다.
- 전제: ADR 0012 — workflow 계약은 소비하며 이 문서에서 재정의하지 않는다.
- 전제: ADR 0025 — 목록과 상세가 같은 워크스페이스 스냅샷을 소비한다는 설명을 유지한다.
- 필요한 패키지 파일 포함·미사용 코드 삭제·설명 정정: 되돌리기 어려움 아니오, 맥락 없이 의외 아니오, 실질 대안 있음(app 전체 게시와 일괄 재구조화) → ADR 아님
