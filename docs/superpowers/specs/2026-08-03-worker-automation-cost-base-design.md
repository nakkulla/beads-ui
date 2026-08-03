# Worker 소규모 기능 묶음 — 전체 자동화 버튼·비용 표시·target base 칩 (UI-j6wa)

- Bead: UI-j6wa
- Route: spec_backed
- 날짜: 2026-08-03

## 배경

Worker 화면에는 자동 진행(auto_advance, 재시작 시 항상 꺼짐으로 리셋되는 비영속
정책)과 자동 머지(auto_merge, 영속) 토글이 따로 있다. 툴바의 완료 통계 칩은
토큰만 표시하고, 서버에 이미 있는 비용(`total_cost_usd`) 데이터를 노출하지
않는다. target base는 서버(`server/worker/target-base.js`)가 리졸브해 attempt
레코드에 영속하지만 UI 어디에도 표시되지 않는다.

## 목표

1. 전체 자동화 버튼 하나로 자동실행+자동머지를 동시에 켜고 끈다.
2. 완료 통계 칩에 비용을 함께 표시한다.
3. target base를 Worker 툴바 칩으로 상시 표시하고, attempt의 base가 현재 선언
   base와 다를 때만 카드에 예외 배지를 띄운다.

## 설계

### 1. 전체 자동화 버튼 (파생 상태)

- 위치: Worker 툴바, 기존 `▶ 자동 진행` 버튼(`app/views/worker/index.js:2035`
  부근) 옆. 스타일은 기존 `.worker-play`/`.worker-merge-all` 버튼과 같은 계열.
- 상태 모델: 자체 서버 상태 없음. 버튼의 켜짐 표시는
  `auto_advance && auto_merge` 파생값.
- 클릭 동작: 둘 다 켜져 있으면 둘 다 끄고, 그 외에는 둘 다 켠다. 기존 WS 메시지
  `worker-queue-toggle`(auto_advance)과 `worker-merge-auto-toggle`(auto_merge)
  두 개를 그대로 전송한다. 새 프로토콜 메시지·새 서버 상태 키 없음.
- 두 메시지 중 하나만 반영되는 부분 실패는 별도 롤백 없이 서버 스냅샷 파생
  표시로 수렴한다(다음 클릭이 나머지를 마저 켠다/끈다).
- auto_advance의 재시작 시 강제 꺼짐 정책(`server/worker/queue-store.js`
  `load()`)은 그대로 유지 — 이 버튼은 영속 자동화 모드가 아니다.

### 2. 완료 통계 칩 비용 표시

- 대상: `.worker-kpi__chip--tokens` 칩(`app/views/worker/index.js:2102-2107`,
  `"오늘 완료 · 누적 τ 24.7M"`).
- `buildModel()`이 완료 레인 행들의 usage를 합산할 때 비용도 함께 합산하고,
  기존 `formatUsageTotalWithCost`(`app/utils/token-usage.js:122-131`) 포맷으로
  `· $31.20`을 덧붙인다.
- 비용 합산은 `sumAttemptUsage`의 기존 규칙을 따른다: 합산 대상 attempt 전부가
  cost를 보고했을 때만 비용을 표시하고, 아니면 조용히 생략(fail-quiet).

### 3. target base 툴바 칩 + 예외 배지

- 서버: Worker 큐 스냅샷(워크스페이스 단위)에 `declared_base` 필드를 추가한다.
  값은 해당 리포 워킹트리 `docs/agents/repo-ops.toml`의 최상위 `base` 키(없으면
  `main`). 표시용이므로 선언 파일 읽기만 하고, 리졸버의 5단계 검증(fetch 포함)은
  디스패치 경로 전용으로 유지한다. 선언 읽기는
  `server/worker/target-base.js`의 선언 파싱 로직을 재사용해 노출한다.
- 툴바: `base <declared_base>` 칩을 상시 표시.
- 카드: 실행중/PR 대기 attempt 카드에 그 attempt의 `target_base`(큐 레코드에
  이미 영속)가 `declared_base`와 다를 때만 배지(`→ <target_base>`)를 표시.
  `target_base`가 없는 레거시 attempt는 배지 없음(fail-quiet).
- `app/protocol.md`에 `declared_base` 필드를 문서화한다.
- Bead 메타데이터에는 base를 쓰지 않는다 — dotfiles workflow 계약 표면 변경
  없음.

## Test scope

- 전체 자동화 버튼: 파생 켜짐 판정(`auto_advance`/`auto_merge` 4조합), 클릭 시
  전송 메시지 쌍(둘 다 켜기 / 둘 다 끄기) 단위 테스트.
- 완료 칩: 전 attempt cost 보고 시 `· $` 부착, 일부 누락 시 토큰만 표시 단위
  테스트.
- `declared_base`: repo-ops.toml `base` 존재/부재 시 스냅샷 필드 값 서버 단위
  테스트, 툴바 칩 렌더와 attempt 배지 표시/비표시(같음·다름·부재) 프론트 단위
  테스트.

## 비범위

- 자동화 상태의 영속화(재시작 후 자동 재개) 정책 변경.
- 개별 토글 제거 — 기존 두 버튼은 그대로 유지.
- Bead 메타데이터에 base 키 추가(별도 dotfiles 계약 작업).
- 리졸버 검증 경로 변경.

## 완료 기준

- 전체 자동화 버튼 클릭 한 번으로 두 토글이 함께 켜지고/꺼지며 버튼 표시가 서버
  스냅샷과 일치한다.
- 완료 칩에 조건 충족 시 비용이 표시된다.
- 툴바에 base 칩이 보이고, base 불일치 attempt에만 예외 배지가 보인다.
- Pre-Handoff Validation(lint/tsc/test/prettier/build) 통과.
