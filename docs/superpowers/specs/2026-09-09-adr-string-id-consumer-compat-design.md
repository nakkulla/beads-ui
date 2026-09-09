---
scope:
  - server/adr/adr-registry.js
  - server/adr/adr-frontmatter.js
  - server/adr/adr-frontmatter.test.js
  - server/adr/adr-signals.js
  - server/adr/adr-signals.test.js
  - server/adr/adr-watch.js
  - server/adr/adr-watch.test.js
  - app/views/adr/
  - server/ws/adr-handlers.js
  - server/ws/adr-handlers.test.js
  - app/protocol.md
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# ADR 문자열 식별자 호환 — beads-ui ADR 파서·신호·정렬이 `<bead-id>[-n]`과 legacy 번호를 함께 읽는다

- Bead: `UI-rsjb` (`route=spec_backed`, 2026-09-09 `dotfiles-60u8` spec_review r1 지적 2에서 분할). 형제: `dotfiles-60u8`(식별자 문법 정본, 이 Bead에 `blocks`로 막힘).
- 상태: 사용자 승인(2026-09-09) 뒤 spec_review r1(astra) REVISE 7건 반영본 — 정수 타입 보존, `adr-signals.js:175`, legacy 정렬 불변·혼합 정렬 규칙, 뷰 정렬, ws 핸들러·protocol.md 범위, ADR 후보 세 조건.
- 근거: dotfiles-60u8이 새 ADR의 식별자를 `<bead-id>[-n]` 문자열로 바꾼다. beads-ui는 검사기 `--json`뿐 아니라 ADR 파일을 직접 파싱한다(beads-ui ADR 0039: 현재 표는 JS frontmatter 리더가 읽는다) — `server/adr/adr-registry.js:53 ADR_FILE_NAME_RE /^(\d{4})-.*\.md$/`는 새 파일명을 제외하고, `adr-frontmatter.js:112,127,202`와 `adr-signals.js:127,487`의 `Number()`는 문자열 id를 `NaN`으로 버리며, `adr-signals.js:530`의 `b.id - a.id` 정렬은 문자열에서 깨진다. dotfiles가 문자열 id를 내기 전에 beads-ui가 먼저 읽을 수 있어야 하므로 이 Bead가 60u8의 선행이다.

## 목표와 비목표

목표: `docs/adr/`에 legacy `NNNN-*.md`와 `<bead-id>[-n]-*.md`가 섞여 있어도 ADR 탭의 현재 표·이력·신호(인용 검사·후보 검사·인덱스 드리프트)가 전부 표시되고, legacy 전용 저장소의 표시는 바이트 수준으로 그대로다.

비목표: 검사기 규칙의 JS 복제(ADR 0039), 인덱스 생성물(`docs/adr/README.md`)의 편집, dotfiles 쪽 스크립트 변경(60u8 소유), 새 UI 요소·슬롯(ADR 0014 — 기존 표의 `#` 열에 문자열이 들어갈 뿐이다).

## 접근 비교

1. 문자열 id를 정수 해시로 바꿔 기존 정수 경로를 유지 — 표시가 실제 id와 달라지고 인용 대조가 깨진다. 기각.
2. 문자열 id 파일을 별도 목록으로 분리 표시 — 표가 둘이 되고 정렬·supersede 관계가 끊긴다. 기각.
3. id를 `number|string` 유니언으로 넓히고 파일명 정규식·정렬·인용 정규식을 두 형식 모두 받게 한다(채택). 60u8 D1·D2·D3·D6이 정한 문법을 그대로 따른다.

## 결정

D1. `adr-registry.js`: `ADR_FILE_NAME_RE`를 `/^((?:\d{4})|(?:[A-Za-z][A-Za-z0-9]*-[a-z0-9]+(?:-\d+)?))-.*\.md$/`로, `CROSS_CITATION_RE`의 번호 부분을 같은 대안으로 넓힌다. 식별자 정규화는 한 함수 `normalizeAdrId(text): number|string`으로 한다 — 네 자리 숫자(선행 0 포함)는 `number`, 그 밖은 문자열 그대로. 기존 legacy 값의 타입은 보존된다(`id: 45`는 `45`, `[45]`는 `[45]`). 타입 정의의 `id`·`supersedes[]`·`superseded_by`와 `server/ws/adr-handlers.js:104,107,142`의 `Map<number, …>` 키, `app/protocol.md:992`의 `CheckerError.adr: number|null`은 `number|string`으로 넓힌다(`adr-handlers.test.js`에 문자열 대상 교차 인용 연결 사례).

D2. `adr-frontmatter.js`: 정수 전용 검사 `:107`(`INT_RE`)·`:217`(`INT_KEYS` 타입 검사)을 "정수이거나 D1 문법의 문자열"로 넓히고, `:112`·`:127`의 `Number()`는 `normalizeAdrId`로, `:248`의 `superseded_by`는 `number|string` 보존으로 바꾼다. YAML 리스트 항목의 따옴표(`"dotfiles-60u8"`)는 정수 항목과 같은 자리에서 해제한다. `:202`의 파일명 접두 추출은 D1 정규식을 쓰고, 파일명 접두와 front-matter `id`의 일치 판정은 양쪽을 `normalizeAdrId`로 정규화한 뒤 비교한다(legacy `0045` ↔ `45` 일치 유지).

D3. `adr-signals.js`: `:127`의 오류 코드는 그대로 두고(exit code), 검사기 `--json`의 `errors[].adr`을 실제로 버리는 `:175`의 `typeof record.adr === 'number'` 검사를 `number|string` 보존으로 바꾼다(인용 검사·후보 검사 양쪽 회귀); `:487`의 교차 인용 추출 `Number(match[2])`도 `normalizeAdrId`로 바꾼다. 정렬은 beads-ui 화면의 정책이며 dotfiles `docs/adr/README.md`(60u8 D3, 날짜 우선)와 별개다: legacy 항목은 지금처럼 번호 내림차순을 유지하고(`:530` 및 `app/views/adr/index.js:336,395`), 문자열 id 항목은 그 뒤에 `date` 내림차순·같은 날은 id 문자열 순으로 잇는다. 현재표와 이력 모두 같은 규칙이고, 문자열 비교가 `NaN`을 내지 않도록 비교 함수는 `normalizeAdrId` 결과의 종류로 먼저 가른다. 근거: legacy 전용 화면이 바이트 동일해야 하고(D5) 날짜 우선으로 바꾸면 `0030`(2026-09-01)·`0024`(2026-09-03)의 순서가 뒤집힌다.

D4. `app/views/adr/index.js`: `:336`·`:395`의 숫자 뺄셈 정렬을 D3의 비교 함수로 바꾸고(신호 우선 토글은 그대로), `#` 열에 문자열 id를 그대로 보인다. 문서 링크는 이미 `adr.file`을 쓰므로 접두 조립 변경은 없다. 새 칩·라벨은 없다. `app/views/adr/index.test.js`에 혼합 정렬과 토글 보존 회귀를 둔다.

D5. legacy 전용 디렉터리 회귀: 현재 저장소의 `docs/adr/`(0003~0048)로 렌더한 현재 표·이력·신호가 변경 전과 바이트 동일해야 한다(스냅샷).

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소 — 식별자 문법 정본(adr 스킬·검사기·인덱스); 이 Bead가 그 선행이다. README 인덱스 정렬(60u8 D3, 날짜 우선)과 이 화면 정렬(D3, legacy 번호 우선)은 서로 다른 표면의 정책이며 충돌이 아니다 | UI-rsjb | dotfiles-60u8 |

- 관찰: `app/main.bundle.js`·`.map`은 `UI-47y7`이 untracked로 바꾼다 — 이 Bead가 먼저 착지하면 빌드 산출물을 포함하고, 뒤에 착지하면 포함하지 않는다(결정 충돌 없음).

## Test scope

```bash
npx vitest run --reporter=dot server/adr/adr-frontmatter.test.js server/adr/adr-signals.test.js server/adr/adr-watch.test.js server/ws/adr-handlers.test.js app/views/adr/index.test.js
npm run tsc && npm run lint
npx vitest run --reporter=dot
```

회귀 사례: 혼합 디렉터리(legacy `0045-*.md` + `dotfiles-60u8-*.md` + `dotfiles-60u8-2-*.md`)에서 세 파일 모두 표에 오르고 legacy가 번호 내림차순으로 앞, 문자열 id가 date 내림차순으로 뒤; legacy 값 타입 보존(`id` 45는 number); `errors[].adr` 문자열이 인용·후보 검사 양쪽에서 보존; ws 핸들러의 문자열 키 교차 인용 연결; `supersedes: [45, "dotfiles-60u8"]`·`superseded_by: "dotfiles-60u8"` 읽기; 검사기 `errors[].adr`이 문자열일 때 표시; `(ADR dotfiles/dotfiles-60u8)` 교차 인용 인식; legacy 전용 디렉터리 스냅샷 동일. 실제 확인: 배포 뒤 ADR 탭이 현재 표를 그대로 보인다(HTTP 200·행 수 동일).

## 실행·인도

한 저장소·한 Bead·한 패킷의 `spec_backed`. PR 하나로 `resolved` 인도, 머지 뒤 `[deploy]`가 `bdui-shared`를 재시작하고 프로세스 경로·포트·HTTP 응답을 확인한다. 이 Bead 착지 뒤 `dotfiles-60u8`의 `blocks`가 풀린다.

## 결정 (ADR 후보)

- 전제: ADR 0039 — ADR 탭 신호는 설치본 체커를 `--json`으로 소비하고 규칙을 JS로 복제하지 않는다; D3은 출력 값의 타입만 넓힌다.
- 전제: ADR 0014 — 새 라벨·칩은 슬롯 표가 정한다; 이 스펙은 새 요소를 만들지 않는다.
- id 유니언·정규식·정렬 확장: 되돌림 어려움=불충족(문자열 id 파일이 생긴 뒤 되돌리려면 60u8과 함께 되돌려야 하지만 그 조율의 결정은 60u8의 ADR이 소유하고, 이 저장소만 보면 파서 몇 곳의 타입 확장이다), 맥락 없으면 의외=불충족(문자열 id를 읽는 이유는 60u8 ADR이 설명한다), 실제 대안=불충족(해시·별도 목록은 60u8의 문법을 어기므로 이 저장소의 선택지가 아니다) → ADR 아님
