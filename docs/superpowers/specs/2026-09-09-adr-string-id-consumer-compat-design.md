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
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# ADR 문자열 식별자 호환 — beads-ui ADR 파서·신호·정렬이 `<bead-id>[-n]`과 legacy 번호를 함께 읽는다

- Bead: `UI-rsjb` (`route=spec_backed`, 2026-09-09 `dotfiles-60u8` spec_review r1 지적 2에서 분할). 형제: `dotfiles-60u8`(식별자 문법 정본, 이 Bead에 `blocks`로 막힘).
- 상태: 사용자 승인 전 초안.
- 근거: dotfiles-60u8이 새 ADR의 식별자를 `<bead-id>[-n]` 문자열로 바꾼다. beads-ui는 검사기 `--json`뿐 아니라 ADR 파일을 직접 파싱한다(beads-ui ADR 0039: 현재 표는 JS frontmatter 리더가 읽는다) — `server/adr/adr-registry.js:53 ADR_FILE_NAME_RE /^(\d{4})-.*\.md$/`는 새 파일명을 제외하고, `adr-frontmatter.js:112,127,202`와 `adr-signals.js:127,487`의 `Number()`는 문자열 id를 `NaN`으로 버리며, `adr-signals.js:530`의 `b.id - a.id` 정렬은 문자열에서 깨진다. dotfiles가 문자열 id를 내기 전에 beads-ui가 먼저 읽을 수 있어야 하므로 이 Bead가 60u8의 선행이다.

## 목표와 비목표

목표: `docs/adr/`에 legacy `NNNN-*.md`와 `<bead-id>[-n]-*.md`가 섞여 있어도 ADR 탭의 현재 표·이력·신호(인용 검사·후보 검사·인덱스 드리프트)가 전부 표시되고, legacy 전용 저장소의 표시는 바이트 수준으로 그대로다.

비목표: 검사기 규칙의 JS 복제(ADR 0039), 인덱스 생성물(`docs/adr/README.md`)의 편집, dotfiles 쪽 스크립트 변경(60u8 소유), 새 UI 요소·슬롯(ADR 0014 — 기존 표의 `#` 열에 문자열이 들어갈 뿐이다).

## 접근 비교

1. 문자열 id를 정수 해시로 바꿔 기존 정수 경로를 유지 — 표시가 실제 id와 달라지고 인용 대조가 깨진다. 기각.
2. 문자열 id 파일을 별도 목록으로 분리 표시 — 표가 둘이 되고 정렬·supersede 관계가 끊긴다. 기각.
3. id를 `number|string` 유니언으로 넓히고 파일명 정규식·정렬·인용 정규식을 두 형식 모두 받게 한다(채택). 60u8 D1·D2·D3·D6이 정한 문법을 그대로 따른다.

## 결정

D1. `adr-registry.js`: `ADR_FILE_NAME_RE`를 `/^((?:\d{4})|(?:[A-Za-z][A-Za-z0-9]*-[a-z0-9]+(?:-\d+)?))-.*\.md$/`로, `CROSS_CITATION_RE`의 번호 부분을 같은 대안으로 넓힌다. 캡처 값은 문자열이며, 네 자리 숫자만 `Number()`로 정규화한다(`idFromCapture(text): number|string`). 타입 정의의 `id`·`supersedes[]`·`superseded_by`는 `number|string`이다.

D2. `adr-frontmatter.js`: `:112`·`:127`의 `Number(item)`은 `idFromCapture`로 바꾸고, `:202`의 파일명 번호 추출은 D1 정규식을 쓴다. 파일명 접두와 front-matter `id`의 일치 판정은 문자열 비교로 한다(60u8 D3 `--check`와 같은 판정).

D3. `adr-signals.js`: `:127`의 오류 코드는 그대로 두고(exit code), `:487`의 `adr: Number(match[2])`는 `idFromCapture`로 바꿔 검사기 `--json`의 `errors[].adr`(`int|string`, 60u8 D2)을 그대로 표시한다. `:530`의 정렬은 60u8 D3의 키 `(date desc, id_key desc)`와 같게 한다 — `id_key`는 legacy `(0, number)`, 문자열 `(1, string)`. 이력 정렬도 같은 규칙이다.

D4. `app/views/adr/`의 표시는 `#` 열에 문자열 id를 그대로 보이고, 링크·툴팁의 파일명 조립은 D1의 접두를 쓴다. 새 칩·라벨은 없다.

D5. legacy 전용 디렉터리 회귀: 현재 저장소의 `docs/adr/`(0003~0048)로 렌더한 현재 표·이력·신호가 변경 전과 바이트 동일해야 한다(스냅샷).

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소 — 식별자 문법 정본(adr 스킬·검사기·인덱스); 이 Bead가 그 선행이다 | UI-rsjb | dotfiles-60u8 |

- 관찰: `app/main.bundle.js`·`.map`은 `UI-47y7`이 untracked로 바꾼다 — 이 Bead가 먼저 착지하면 빌드 산출물을 포함하고, 뒤에 착지하면 포함하지 않는다(결정 충돌 없음).

## Test scope

```bash
npx vitest run --reporter=dot server/adr/adr-frontmatter.test.js server/adr/adr-signals.test.js server/adr/adr-watch.test.js
npm run tsc && npm run lint
npx vitest run --reporter=dot
```

회귀 사례: 혼합 디렉터리(legacy `0045-*.md` + `dotfiles-60u8-*.md` + `dotfiles-60u8-2-*.md`)에서 세 파일 모두 표에 오르고 정렬이 date desc·id_key desc; `supersedes: [45, "dotfiles-60u8"]`·`superseded_by: "dotfiles-60u8"` 읽기; 검사기 `errors[].adr`이 문자열일 때 표시; `(ADR dotfiles/dotfiles-60u8)` 교차 인용 인식; legacy 전용 디렉터리 스냅샷 동일. 실제 확인: 배포 뒤 ADR 탭이 현재 표를 그대로 보인다(HTTP 200·행 수 동일).

## 실행·인도

한 저장소·한 Bead·한 패킷의 `spec_backed`. PR 하나로 `resolved` 인도, 머지 뒤 `[deploy]`가 `bdui-shared`를 재시작하고 프로세스 경로·포트·HTTP 응답을 확인한다. 이 Bead 착지 뒤 `dotfiles-60u8`의 `blocks`가 풀린다.

## 결정 (ADR 후보)

- 전제: ADR 0039 — ADR 탭 신호는 설치본 체커를 `--json`으로 소비하고 규칙을 JS로 복제하지 않는다; D3은 출력 값의 타입만 넓힌다.
- 전제: ADR 0014 — 새 라벨·칩은 슬롯 표가 정한다; 이 스펙은 새 요소를 만들지 않는다.
- id 유니언·정규식·정렬 확장: 한 저장소의 파서 변경이고 60u8의 문법을 따르는 소비자 적용이라 되돌림 어려움 조건이 성립하지 않는다 → ADR 아님
