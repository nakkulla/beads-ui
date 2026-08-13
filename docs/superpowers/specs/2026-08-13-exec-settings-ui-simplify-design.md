# 실행 설정 UI 단순화 (시안 A): 요약 카드 + 핵심 3키 + 고급 접기

- 날짜: 2026-08-13
- Bead: `UI-442x` (spec_backed)
- 출처: dotfiles `docs/superpowers/specs/2026-08-13-exec-settings-sot-design.md` @ 2d8f885f Unit 2 절.
  cross:dotfiles `dotfiles-rzea`(계약 유닛)와 병행 — 하드 의존 없음, 선행 권장만.
- 목업: `~/tmp/mockups/2026-08-13-exec-settings-simplify.html` 시안 A (레이아웃 기준)

## 배경과 목표

detail panel의 "실행 설정" 섹션은 실행 설정 12키 + `workflow_mode`를 13개의 동급
드롭다운으로 평면 나열해, 자주 쓰는 축(구현 runtime, 워커 모델)과 거의 만지지 않는
축(리뷰 6키, effort/speed)이 구분되지 않는다. 전역 다이얼로그도 프리셋 목록과 별도의
"워크스페이스 기본 프리셋" 셀렉트 섹션으로 이원화되어 있다.

목표: 편집 능력은 그대로 두고 시야만 줄인다 — **요약 카드(실효값+출처) → 핵심 3키 →
고급 접기(10키)**. 서버·프로토콜·키 의미는 바꾸지 않는 순수 클라이언트 재구성이다.

## 키 산수 (고정)

- 실행 설정 12키 = 워커 3(`orchestration_model/effort/speed`) + 리뷰 6(spec/plan/impl ×
  model/effort) + 구현 3(`impl_runtime/model/effort`).
- detail panel 핵심 3 = `workflow_mode`(per-Bead 전용) + `impl_runtime` + `orchestration_model`.
- detail panel 고급 10 = 워커 상세 2(`orchestration_effort/speed`) + 구현 상세 2
  (`impl_model/effort`) + 리뷰 6.
- 프리셋 편집기는 `workflow_mode`를 저장하지 않으므로 핵심 2(`impl_runtime`,
  `orchestration_model`) + 고급 10.

## 범위 1 — detail panel (`app/views/detail-panel/exec-settings.js`)

- **요약 카드** (신규, 편집 행 위): 실효값(effective) 3행.
  - 워커: `orchestration_model` (+ effort/speed가 비기본이면 요약에 병기)
  - 구현: `impl_runtime` + 모델(auto면 "auto", 지정 시 모델명)
  - 리뷰: spec/plan/impl 3단계 리뷰어 요약
  - 각 행에 출처 칩 1개: **이슈 핀**(bead 메타데이터에 값 존재) / **프리셋 「이름」**
    (워크스페이스 프리셋 값이 적용) / **기본**(최종 fallback). 판정은 기존
    `selectedOf`/`effectiveOf` 이중 콜백으로 충분하며 새 데이터 채널 불요.
- **핵심 3키 셀렉트**: `workflow_mode`, `impl_runtime`, `orchestration_model`.
  bead 핀 값이 있으면 기존 `--sel` 강조 계열로 표시.
- **고급 접기**(`<details>`): 나머지 10키를 워커 상세/구현 상세/리뷰 3그룹으로.
  접힘 summary에 비기본값 개수 표시(예: "고급 설정 — 2개 변경됨").
- 기존 `execSettingRows` 공용 빌더, `(비호환)` 표기, `defaultLabelFor`의
  `(기본: X — 프리셋명)` 라벨, self/skip effort 게이팅, impl 3키 normalize를 그대로
  재사용한다. 실행 설정 12키와 `workflow_mode` 전부의 편집 능력을 유지한다.

## 범위 2 — 전역 다이얼로그 (`app/views/worker/exec-defaults-dialog.js`)

- 프리셋 카드에 **「워크스페이스 기본」 배지**와 **「기본으로」/「기본 해제」 버튼**을
  추가하고, 별도 "현재 워크스페이스 기본 프리셋" 셀렉트 섹션은 제거한다.
  전송 메시지(`worker-queue-set-default-exec-preset`)와 CAS·adopt·토스트 계약은 그대로.
- 차단은 **「기본으로」(지정)에만** 적용한다: 비호환/missing 후보의 지정은 기존 판정
  (`workspacePresetSelection`)대로 버튼 disabled + 사유 툴팁으로 차단하되, **「기본 해제」
  는 항상 허용**한다(현재 기본이 비호환이어도). 기본 참조가 missing(프리셋 삭제 등)이면
  대응 카드가 없으므로 **합성 카드/배너**를 표시해 상태를 알리고 `preset_id: null` CAS
  해제 경로를 제공한다 — 셀렉트 섹션 제거로 해제 경로가 사라지는 상태를 만들지 않는다.
- 프리셋 편집기는 범위 1과 같은 그룹 구성(핵심 2 + 고급 10 접기)을 재사용한다.
  `workflow_mode`는 프리셋 표면에 나타나지 않는다(기존과 동일).
- 검증·배포, 워커 시스템 프롬프트 읽기 전용 섹션은 변경하지 않는다.

## 불변 조건

- 서버·WS 프로토콜·12키 의미·프리셋 저장 형식 불변. `server/` 변경 없음.
- 프리셋→이슈 적용 시 값 복사 의미, stamp/revert, `(비호환)` fail-quiet 강등 불변.
- 출처 칩은 「누가 핀했는지」(에이전트 vs 사람)를 구분하지 않는다 — origin 추적 비도입.

## Test scope

- RED-GREEN seam 1 — `app/views/detail-panel/exec-settings.test.js`:
  요약 카드 출처 칩 판정(핀/프리셋/기본 3분기), 핵심 3 + 고급 10 그룹 구조,
  실행 설정 12키와 `workflow_mode`가 모두 편집 가능(행 존재·change 핸들러),
  고급 summary 비기본값 카운트. 새 assertion은 현 구현에서 RED.
- RED-GREEN seam 2 — `app/views/worker/exec-defaults-dialog.test.js`:
  카드 배지·「기본으로/기본 해제」가 기존 `worker-queue-set-default-exec-preset`
  CAS 흐름(adopt·conflict 토스트)을 그대로 타는지, 별도 셀렉트 섹션 부재,
  비호환 프리셋 「기본으로」 차단과 「기본 해제」 상시 허용, missing 참조의 합성
  카드/배너와 `preset_id: null` 해제 경로, 프리셋 편집기의 핵심 2 + 고급 10 그룹
  구성과 12개 셀렉터·change mutation 유지, `workflow_mode` 셀렉터 부재.
  새 assertion은 현 구현에서 RED.
- `npm test`(vitest), `npm run lint`, `npm run build` green.

## 수용 기준

1. detail panel이 요약 카드 → 핵심 3 → 고급 10 접기 구조로 렌더되고, 실행 설정
   12키 + `workflow_mode` 편집, `(비호환)` 표시, effort 게이팅이 회귀 없이 유지된다.
2. 출처 칩이 bead 값 > 프리셋 값 > 기본의 우선순위로 정확히 판정된다.
3. 전역 다이얼로그에서 워크스페이스 기본 지정·해제가 카드 버튼으로 동작하고 기존
   CAS 충돌 처리(adopt, 토스트)가 유지된다. 지정 차단은 비호환/missing 후보에만
   적용되고, 「기본 해제」는 비호환 현재 기본과 missing 참조(합성 카드/배너 경유)에서도
   항상 가능하다 — 해제 불가 고착 상태가 존재하지 않는다.
4. 서버 코드·프로토콜 diff가 없다.

## 비범위·남은 위험

- 새 exec 키 추가 없음(12키 고정). dotfiles 계약 유닛(`dotfiles-rzea`)의 핀 절차와
  독립 — 이 UI는 핀이 없어도 동일하게 동작한다.
- 운영 프리셋 재설정(수동)은 dotfiles 유닛의 residue로, 이 Bead 범위 밖이다.
- 요약 카드와 셀렉트의 상태 불일치 위험은 둘 다 같은 `effectiveOf` 소스에서
  파생시켜 차단한다.
