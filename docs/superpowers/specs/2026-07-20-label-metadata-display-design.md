# 라벨/메타데이터 표시 정합화 — 표시 정책 스토어·설정 UI·파생 칩·라벨 필터

- 날짜: 2026-07-20
- 라우트: full_plan (독립 단위 3+: 정책 스토어/설정 UI·서버 enrich 파생·필터 축·카드/상세 렌더)
- 짝 스펙: dotfiles 어휘 개정 spec(별도 spec_backed, 미작성) — 미러 라벨 기록 중단, `status=blocked` 외부 블로커 재정의, `blocked_reason` metadata 키 신설. 이 스펙은 그 어휘의 **소비자(표시)**다. 병행 가능하나 `blocked_reason` 키명은 짝 스펙 확정이 권위.
- 근거 기록: 2026-07-20 세션 브레인스토밍(비주얼 컴패니언 시안 선택) — 카드 칩 "상태 중심·아이콘 없음", 설정 UI "통합형", 필터 "라벨 드롭다운", from 라벨 폐기·엣지 파생, blocked 사유 표시, PR 칩 CI 제거 합의.

## 배경 / 문제 (현행 실측)

1. **보드 카드는 bead 라벨을 렌더하지 않는다** — `app/views/board/card.js` `chipsTemplate`은 workflow 칩(route·⚡fast_track·PR+CI)만 그린다. 상세 패널은 반대로 전체 라벨을 무필터 표시.
2. **라벨 가시성 배관이 죽은 코드다** — `~/.config/bdui/config.toml [labels]`(visible_prefixes 등)는 `server/config.js`에서 파싱되어 client state까지 전달되지만 소비처인 `app/utils/label-badge.js`(화이트리스트 `['has:','reviewed:']`)는 어떤 뷰에도 연결돼 있지 않다. 화이트리스트 방식이라 새 라벨마다 지정이 필요한 구조.
3. **라벨 필터 축이 없다** — `app/views/board/filter-bar.js`는 search·priority·type뿐.
4. **blocked 사유가 구분되지 않는다** — Blocked 컬럼은 native status와 의존 파생을 병합하지만(`server/list-adapters.js` `fetchBlockedIssues`) 병합 후 사유(외부 대기 vs Bead 의존)를 구분 표시하지 않고, 상세 deps 목록도 엣지 타입 없이 id만 나열한다.
5. **미러 라벨 이중 체계** — `has:spec`/`reviewed:*` 등은 권위가 metadata인 display-only 미러인데, 카드 stepper(`app/views/board/stepper.js`)가 이미 metadata 기반으로 spec/plan/리뷰 준비도를 표시하므로 라벨 미러는 표시 목적을 상실했다(2026-07-20 사용자 결정: 미러 폐기·metadata 일원화, 라벨 어휘는 고정·한정 유지).

## 설계

### 1. 어휘 경계 (dotfiles 짝 스펙 몫의 소비)

- 미러 라벨 4종(`has:spec`, `pr`, `reviewed:*`, `skipped:*`)은 기록 중단·historical-read가 된다(짝 스펙 소유). beads-ui는 이를 전제로 **표시 기본값에서 legacy 미러를 숨긴다**(§2 기본 seed) — 기존 bead에 남은 라벨의 데이터 청소는 하지 않는다.
- `from:*` 라벨은 도입하지 않는다. follow-up 출처는 `discovered-from` 엣지가 유일 권위이고 표시도 엣지에서 파생한다(§3). 라벨 어휘가 bead id로 증식하는 것을 차단.
- `status=blocked`(외부 블로커 전용)와 `blocked_reason` metadata(카드 표시용 짧은 사유, notes 증거는 별도 유지)는 짝 스펙이 정의하고 이 스펙은 표시만 한다.

### 2. 표시 정책 스토어 (서버)

- `server/visible-workspaces-store.js` 패턴의 서버 상태 파일 스토어 신설. **정규화된 workspace 절대경로를 키**로 한 맵:
  - `hidden_labels: string[]` (exact), `hidden_prefixes: string[]`, `visible_labels: string[]` (exact 예외 — prefix 숨김을 뒤집는 override)
  - 가시성 우선순위: `visible_labels`(exact) > `hidden_labels`(exact) > `hidden_prefixes` > 기본 표시. mutation은 같은 라벨이 `visible_labels`/`hidden_labels`에 동시에 들어가지 않도록 유지한다.
  - `chips: { route, fast_track, pr, from, blocked, stepper }` (각 boolean, 기본 true)
- 워크스페이스에 항목이 없으면 기본값 적용. **기본 seed**: `hidden_labels = ['has:spec', 'pr']`, `hidden_prefixes = ['reviewed:', 'skipped:']` — 폐기되는 legacy 미러만 정확히 가린다(다른 `has:*` 등 일반 라벨은 기본 표시 유지).
- 쓰기는 ws mutation 핸들러 + CAS(버전 카운터, worker queue-store 전례) + readback. 충돌 시 클라이언트는 재로드 후 재시도 안내.
- **전파**: 신규 `display-policy` 구독 — 구독 시 현재 workspace 정책 snapshot을 내려주고, mutation 성공 시 해당 workspace 구독자 전원에 broadcast, workspace 전환·재연결 시 재구독. bootstrap 1회 전달 배관(현행 label config 방식)을 대체한다.
- `config.toml [labels]` 파서(`server/config.js`)·bootstrap 전달(`server/app.js`)·client state 배관(`app/state.js`)은 **제거**. 시작 시 config에 `[labels]`가 남아 있으면 deprecated 경고 로그 1회 남기고 무시.

### 3. 서버 enrich 파생 (from·blocked 사유·PR 칩)

- **from**: 목록 어댑터가 가시 이슈 집합에 대해 `bd dep list <복수 ID> --json`을 벌크 조회해 `discovered-from` 엣지를 수집, 카드 데이터에 `from: <원 Bead id>`를 넣는다. 조회 실패는 fail-quiet(칩 생략) — 기존 enrich 철학(`server/workflow-enrich.js`) 유지.
- **blocked 사유**: `fetchBlockedIssues`의 병합 시 출처를 보존해 카드 데이터에 구분 필드로 전달 —
  - 외부: `status=blocked` → `⏸ blocked[: <metadata.blocked_reason>]` (사유 없으면 `⏸ blocked`만)
  - 의존: `bd ready --explain`의 차단 Bead → `⛓ blocked: <id>` (2개 초과분은 `+n`)
  - 동시면 두 칩 모두.
- **PR 칩**: `chips.pr`에서 CI 문자열 제거(번호만). 상세 stepper의 PR 셀은 현행 유지.

### 4. 카드/상세 렌더 (클라이언트)

- `card.js`: 칩 행 = route · ⚡fast_track · `PR #n` · 라벨 칩(정책 필터 적용: hidden exact/prefix 제외 후 전부 표시) · `↩ from <id>`(클릭 시 해당 Bead 상세로 이동) · blocked 사유 칩(⏸/⛓). 파생 아이콘 없음 — 준비도는 stepper 소유. 각 파생 칩과 stepper는 정책 `chips.*` 토글로 온오프.
- `app/utils/label-badge.js`의 화이트리스트(`CARD_PREFIXES`)·color_policy는 정책 모듈(숨김 목록 기반)로 대체. 라벨 색상 커스텀은 비목표 — 고정 팔레트.
- 상세 패널: 라벨은 전체 표시 유지(편집 표면이므로 정책 미적용). deps 목록에 엣지 타입 아이콘(⛓ blocks / ↩ discovered-from) 추가.

### 5. 라벨 필터 축

- `filter-bar.js`에 4번째 축: 라벨 multi-select 드롭다운. 목록은 현재 구독 데이터에 존재하는 라벨의 합집합에서 클라이언트가 수집(숨김 정책과 무관하게 전체 노출 — 숨긴 라벨로도 필터 가능해야 함).
- 매칭은 OR(선택 라벨 중 하나라도 보유). `applyFilters`(`app/views/board/index.js`)에 라벨 축 추가.

### 6. 설정 패널 (통합형)

- 헤더 ⚙ 버튼 → 현재 워크스페이스의 표시 정책 편집 패널:
  - 라벨 pill 목록(구독 데이터에서 수집) — 클릭으로 표시/숨김 전환. 표시 중 라벨 클릭 → `hidden_labels` 추가(`visible_labels`에서 제거); 숨김 라벨 클릭 → exact 숨김이면 `hidden_labels`에서 제거, prefix로 숨겨진 경우 `visible_labels`에 추가(§2 우선순위로 재표시).
  - 숨김 prefix 추가/제거 입력
  - 파생 칩 토글 6개(route·⚡·PR·from·blocked·stepper)
- 저장은 §2 mutation(CAS), 반영은 §2 `display-policy` 구독 broadcast 경로.

### 7. 문서 정합

- `AGENTS.md`에 한 단락 추가: workflow 계약 표면(라벨 어휘·metadata 키·worker 소비 키)의 canonical은 dotfiles `docs/contracts/workflow.{md,yaml}`이며 beads-ui는 소비자다 — 계약 표면을 바꾸는 변경은 dotfiles 계약·스킬과 함께 정합할 것.

## 인수 기준

1. 카드에 라벨 칩이 기본 표시되고, `hidden_labels`/`hidden_prefixes`(기본 seed 포함)에 걸린 라벨은 숨겨지며, `visible_labels`에 있는 라벨은 prefix 숨김보다 우선해 표시된다.
2. discovered-from 엣지를 가진 bead 카드에 `↩ from <id>` 칩이 라벨 없이 표시되고, 클릭 시 원 Bead 상세로 이동한다.
3. `status=blocked`(+`blocked_reason`)와 의존 파생 blocked가 ⏸/⛓로 구분 렌더되고, 동시면 둘 다 표시된다.
4. PR 칩은 번호만 표시한다(CI 문자열 제거). 상세 stepper PR 셀은 유지.
5. 필터바 라벨 드롭다운(multi-select, OR)이 동작하고, 숨긴 라벨로도 필터할 수 있다.
6. 설정 패널에서 라벨 숨김/재표시(prefix로 숨겨진 라벨의 재표시 포함)·prefix·칩/stepper 토글을 편집하면 CAS 저장·readback 후 `display-policy` 구독 broadcast로 접속 중인 모든 클라이언트에 반영되고, workspace 전환·재연결 시 재구독으로 정합이 유지된다.
7. `config.toml [labels]`는 더 이상 파싱되지 않고, 잔존 시 deprecated 경고 로그 1회만 남는다.
8. 상세 deps 목록에 엣지 타입 아이콘이 표시된다.
9. `AGENTS.md`에 dotfiles 계약 정합 단락이 추가된다.
10. `npm run all` 통과 + focused 테스트(정책 스토어 CAS·enrich 파생 from/blocked·라벨 필터·설정 mutation·카드 렌더) + 번들 재빌드.

## 비목표

- 기존 bead 라벨 데이터 일괄 청소(legacy 미러 제거는 표시 숨김으로 대체).
- dotfiles 계약 문언 변경(짝 스펙 소유 — 미러 기록 중단·blocked_reason·status=blocked 재정의).
- UI-aruw 범위(route 추론/명시 구분 칩, route·정책 metadata 편집) — 파일 겹침(card.js·detail-panel)은 순서 조율로 해소.
- 검색창 토큰 문법(`label:x`), 라벨 색상 사용자 정의, 의존 그래프 시각화(엣지 타입 아이콘 이상).

## 검증

`npm run all` + 신규 focused 테스트. 프런트 변경이므로 `npm run build` 후 번들 포함. blocked 구분은 native/의존/동시 3케이스 픽스처로 검증.
