# 머지 클릭 choreography ship 단계 폐지 설계 (UI-knf8)

- 날짜: 2026-08-10
- Bead: UI-knf8 (route: spec_backed)
- 상위 설계: External/beads `beads-o53`
  (`docs/superpowers/specs/2026-08-05-external-dep-issue-id-design.md`) — bd
  external 의존이 capability 문법에서 이슈 ID 기반으로 전환되고 capability
  모델(`export:`/`provides:`/`bd ship`)이 YAGNI로 제거됐다. 본 스펙은 그 랜딩
  순서표 ① 유닛(beads-ui 소비자 정합)의 실행 설계다.
- 사용자 확정 사항 (2026-08-10): 제거 전략 **A. 전면 소거**(legacy 키 무보정
  흡수) / UI-19yr 잔여 라벨은 **이 유닛의 즉시 조치로 제거**.

## 1. 배경과 실측 (2026-08-10)

- **상위 유닛 상태가 Bead 기재와 다르다**: beads-o53은 closed(스펙
  승인·구현·PR #7 머지 완료)이고, 설치된 bd 1.1.0-fork.3(2026-08-07)에서
  `bd ship`은 이미 **unknown command**다. 랜딩 순서 ①→③이 배포 현실에서
  역전됐으므로 "이 유닛 랜딩 전까지 ship이 동작해야 한다"는 Bead의 전제는
  소멸했고, 전이 기간 배려 없이 전면 소거가 가능하다.
- **잠복 결함**: 현재 워커에서 `export:` 라벨 달린 bead가 머지 클릭을 통과하면
  ship 어댑터가 unknown command로 throw → `ship_failed:<cap>` 정리 중단 배너로
  멈춘다. 이 유닛이 그 경로 자체를 제거한다.
- **잔존 데이터**: beads_ui rig 전수(496건)에서 `export:`/`provides:` 라벨
  보유는 UI-19yr(closed, `export:plan-review-runner-authz` +
  `provides:plan-review-runner-authz`) 1건뿐. beads-o53 apply 절차의 데이터
  정리가 이 건을 지우지 않았다.
- **durable 레코드 잔존 0건**: workspace `queue.json` 265개 전수에서
  `ship_failure` 레코드·ship 단계 `cleanup_failed` 레코드 모두 0건 — 과거
  레코드 호환 shim이 불필요하다는 실증.
- **소비 표면은 Bead 기재보다 넓다**: Bead가 적은 5개 파일 외에
  `queue-store.js`(ship_failure 필드와 record/clear API),
  `app/views/worker/index.js`(MERGE_STEPS 단계 라벨·snapshot selector),
  `app/protocol.md`(wire 계약 문서), e2e·attach 테스트 mock까지 실소비가 있다.
  WS 핸들러(`worker-handlers.js`·`monitor-handlers.js`)와
  merge-gate·scheduler·title-cache 등의 grep 매치는 전부
  산문("membership"·"ownership"·"ships") 오탐으로 실측 분류했다 — 수정 대상이
  아니다.
- **② 유닛과의 정합**: dotfiles-jvhr(계약 sweep_order 9단계 폐지 소유)은 스펙
  리뷰까지 끝난 open 상태이고, dotfiles `docs/contracts/workflow.yaml`에는 아직
  step 9(`ship_exported_capabilities`)가 남아 있다. 지금 ①을 랜딩하는 것이
  스펙의 의도된 순서다.

## 2. 목표 / 비목표

목표:

1. 머지 클릭 정리 sweep에서 ship 단계와 그 실패 표면(배너·durable 레코드·wire
   키)을 전면 제거한다.
2. legacy `queue.json`의 `ship_failure` 키를 무보정 흡수한다(로더가 읽지 않고,
   다음 flush에서 파일에서도 사라진다).
3. 잔존 데이터(UI-19yr 라벨 2건)를 즉시 조치로 소거해 폐기 어휘의 마지막
   노출을 없앤다.

비목표:

- 계약 canonical(dotfiles `workflow.yaml` sweep_order step 9)의 폐지 — ②
  dotfiles-jvhr 소유. beads-ui는 소비자로서 호출처만 제거한다.
- capability 문법 잔여 레코드(`depends_on_external`)의 데이터 정리 —
  beads-o53/dotfiles 소유.
- ship 이외 정리 단계의 동작 변경. external row drop → durable 기록 → THE
  TERMINAL LAUNCH 순서는 불변이다.

## 3. 설계

좌표는 2026-08-10 실측 기준이다.

### 3.1 서버 — 정리 sweep·어댑터

- `server/worker/ship-capabilities.js` **모듈 삭제** (전체가 ship 전용).
- `server/worker/pr-actions.js`:
  - import(:60), `CLEANUP_STEPS` 마지막 항목
    `'ship_exported_capabilities'`(:101, 7→6단계), 단계 실행
    블록(:1437-1460 — markStep·`shipExportedCapabilities` 호출·`failShip`
    분기·removed 로그·`clearShipFailure`), `failShip` 함수(:1608-1656) 제거.
  - 서사 주석 정리: 파일 헤더(:33), CLEANUP_STEPS 주석(:86-90),
    `failCleanup`의 ONE EXCEPTION 절(:1539-1546).
  - `sweepChildren`: 유일 소비자(ship)가 사라지므로 `closed_ids` 반환 필드를
    제거하고 `{ok: true}`로 축소(:1121-1129 주석 포함). `seen` 집합은 순회
    사이클 방지용으로 내부 유지.
  - deps typedef(:181)에서 `ship`/`removeLabel` 제거.
- `server/worker/bd-metadata.js`: `ship()`(:389-405)·`removeLabel()`(:415-425)
  어댑터 메서드, 헤더 매핑 주석(:13), adapter typedef(:43)의 해당 줄 제거.
  `removeLabel`의 유일 소비자는 ship-capabilities였음을 실측 확인(detail
  패널의 동명 로컬 함수는 별개 경로로 무관).
- **불변식 변화**: 정리의 마지막 단계가 `parent_close`가 되어 "close 뒤에
  실패할 수 있는 유일 단계"라는 예외(UI-4ii4)가 소멸한다 — 모든 정리 실패에서
  "bead는 `resolved`로 남는다"가 무조건 참이 된다. `failCleanup`의
  `restore_bd` 파라미터와 parent_close 복원 로직은 그대로다.

### 3.2 서버 — durable 레코드·wire 계약

- `server/worker/queue-store.js`: `ship_failure` 필드(Queue typedef
  :248-263 — `ShipFailure` typedef 포함, 기본값 :396, 로드 :763-765),
  `normalizeShipFailure`(:774-), `recordShipFailure`/`clearShipFailure`
  (:1397-1435) 제거.
- **legacy 무보정 흡수**: 로더는 명시 필드만 조립하므로 과거 `queue.json`의
  `ship_failure` 키는 읽히지 않고, 다음 flush의 전체 재작성에서 파일에서도
  사라진다. 잔존 0건 실증에 따라 마이그레이션 코드는 만들지 않는다.
- `app/protocol.md`(:112): `worker-queue-snapshot` 필드 목록에서
  `ship_failure` 제거. 이 wire 문서는 beads-ui 소유이므로 여기서 갱신한다.

### 3.3 프런트

- `app/views/worker/index.js`: `MERGE_STEPS`의
  `{ step: 'ship_exported_capabilities', label: 'capability 발행' }`(:512)
  제거 — 진행 카운터가 N/8→N/7. snapshot selector의 `ship_failure`
  조립(:1612-)·반환(:2196)·`shipFailure` 전달(:2278)·반환 typedef(:1498) 제거.
- `app/views/worker/running-grid.js`: `ShipFailure` typedef(:82),
  `shipFailureBanner`(:182-241), `bannersTemplate`의 shipFailure 소비(:246,
  :309), cleanup 배너의 ship 단계 특례 문안(:294-299)을 고정
  문안("resolved로 남아 있고")으로 환원.
- `app/styles.css`: `.worker-banner--ship` 블록(:2730-) 제거.
- 소스 수정 후 `npm run build`로 `app/main.bundle.js`·`.map` 갱신을 커밋에
  포함한다.

### 3.4 즉시 조치 (데이터)

- 구현 단계에서 실행: `bd label remove UI-19yr export:plan-review-runner-authz`
  및 `bd label remove UI-19yr provides:plan-review-runner-authz`, 각각
  `bd show UI-19yr --json` readback으로 라벨 소거 확인.
- 이로써 Bead가 "스펙에서 확정"으로 남긴 잔여 표시 정합의 처분이 완결된다:
  코드 제거로 특수 표시가 소멸하고, 일반 라벨 칩에 남을 유일한 폐기 어휘
  데이터도 소거된다. 이후 `export:`/`provides:`는 어떤 코드도 특수 취급하지
  않는 일반 라벨 어휘다.

## 4. 크로스 레포 정합·랜딩 순서

- 이 유닛은 beads-o53 랜딩 순서표의 ①이다. ②(dotfiles-jvhr, 계약·스킬 문서
  폐지)는 별도 진행 중이며 이 유닛과 코드 충돌이 없다. ③(bd 바이너리)은 이미
  배포됐다(fork.3).
- 유닛 간 Bead 의존은 걸지 않는다(beads-o53 §5의 확정 — 크로스 DB 의존이 바로
  개조 대상이므로 자기참조 회피).
- 배포: 이 저장소의 `docs/agents/repo-ops.toml` `[deploy]`(`bdui-shared
  restart`, detached) 커버리지가 실재한다. 머지 후 자동 경로가 재시작을
  대신하되, 프로세스 경로·포트·HTTP 응답 확인과 완료 선언 책임은 그대로
  남는다(AGENTS.md Post‑Merge Runtime Validation).

## 5. Test scope

RED→GREEN 시임:

1. **pr-actions 정리 완주**: 머지 클릭 정리 성공 경로가 `parent_close`를
   마지막 단계로 완주하고 ship 어댑터 호출이 없다(`CLEANUP_STEPS`가 6단계).
   RED: 현행은 ship 단계가 존재·호출된다.
2. **queue-store legacy 흡수(characterization)**: `ship_failure` 키를 가진
   legacy `queue.json`이 무해하게 로드되고 snapshot에 그 키가 없다. RED:
   현행 snapshot은 `ship_failure`를 항상 포함한다(null 또는 레코드).

정리(삭제·갱신 — RED/GREEN 증거로 쓰지 않음):

- 삭제: `ship-capabilities.test.js` 전체, `queue-store.test.js`의
  ship_failure describe(:1621-1712), `worker/index.test.js`의 ship 배너
  4건(:3617-3710).
- 갱신: `pr-actions.test.js`의 ship 단언 제거,
  `e2e/worker-flow.test.js`(:513-522)·`attach.test.js`(:1413) mock에서
  `ship`/`removeLabel` 제거, `worker/index.test.js`에 단계 총수(8)를 단언하는
  테스트가 있으면 7로 갱신.

## 6. 검증

- Pre‑Handoff 전체: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` / `npm run build`.
- 종료 증거: `rg -i ship` 전수에서 남는 매치가 산문 오탐(membership 등)뿐임을
  기록. 즉시 조치 readback(UI-19yr 라벨 0건) 포함.
- 머지 후: `[deploy]` 자동 경로 실행 확인 + 프로세스 경로·포트·HTTP 응답
  검증(AGENTS.md 소유 절차).
