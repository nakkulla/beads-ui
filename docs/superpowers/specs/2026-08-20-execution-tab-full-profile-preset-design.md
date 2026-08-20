---
scope:
  - app/views/settings-dialog/
  - app/views/detail-panel/exec-settings.js
  - server/exec-preset-store.js
  - server/worker/exec-enums.js
  - server/worker/exec-preset-coordinator.js
  - server/ws/exec-preset-handlers.js
  - server/ws/session-defaults-handlers.js
---

# 설정 다이얼로그 실행 탭 통합과 전체 프로필 프리셋

## 문서 상태

- 사용자 설계 승인: 2026-08-20 (접근 방식 1 + 설계 A–D 승인)
- 기준: UI-qeiz(통합 설정 다이얼로그, PR #145) 이후의 `main`
- 선행 유닛: 없음 — beads-ui 단독 변경. dotfiles 계약(`workflow_session_defaults`
  kv 스키마, metadata 키 어휘)은 읽기만 하고 바꾸지 않는다.

## 배경과 판정

UI-qeiz는 설정 ⚙ 다이얼로그를 저장소 소유권 기준으로 `세션`(bd kv 12키) /
`Worker`(큐 오케스트레이션 3키 + slots) / `표시` 세 탭으로 나눴고, 프리셋은
구현 5키(`impl_dispatch/runtime/model/effort/speed`)만 담게 했다. 사용자
관점에서는 둘 다 "세션이 어떻게 실행되는가"의 설정이라 탭 분리가 인지 부담이
됐고, 프리셋 목록은 §F 마이그레이션 잔재로 13개(설정이 빈 껍데기 9개,
"…2/…3" 이름 중복)가 쌓여 사실상 못 쓰는 상태다
(`$XDG_STATE_HOME/bdui/exec-presets.json` revision 21 관측, 2026-08-20).

저장소 이원화 자체는 계약이 소유한다(kv 스키마는 dotfiles, 오케스트레이션
3키는 Worker 전용 큐 값 — UI-qeiz §A). 따라서 이 설계는 **UI 표면과 프리셋
스키마만 통합**하고 저장소·계약은 그대로 둔다.

## 사용자 결과

1. 설정 다이얼로그 레일이 `실행` / `표시` 2탭이 된다. 실행 탭 하나에서
   오케스트레이션·워크플로우 모드·리뷰 게이트·구현·slots를 모두 편집한다.
2. 프리셋이 실행 탭의 설정 15키(세션 kv 12키 + 오케스트레이션 3키)를 담는
   전체 프로필이 된다. 프리셋 적용 한 번으로 "누가 오케스트레이션하고 누가
   구현하는지"가 전역으로 전환된다.
3. 프리셋 목록은 3개로 정리된다: 클로드 라인 / 클로드 오케 + 코덱스 구현 /
   코덱스 라인.
4. 이슈 상세의 Bead별 프리셋 적용은 Bead에 핀 가능한 세션 12키만 기록하고,
   큐 전역인 오케스트레이션 3키는 건너뛴다.

## 목표

1. 설정 다이얼로그를 실행/표시 2탭으로 재편한다 (저장 경로는 그룹별 기존
   유지).
2. 프리셋 `settings`를 15키 sparse 스키마로 확장하고 검증을 키 계열별로
   나눈다.
3. 프리셋 적용을 프로필 교체 의미(담긴 키 set, 안 담긴 키 unset)로 kv·큐 두
   저장소에 확장한다.
4. 잔재 프리셋 13개를 정리하고 3개 시드를 만든다 (일회성 운영 작업).

## 비목표

- 오케스트레이션 3키의 bd kv 이전, kv 스키마·metadata 어휘 등 dotfiles 계약
  변경 (접근 방식 2로 검토 후 기각).
- slots·표시 정책의 프리셋 포함. slots는 실행 탭에 남되 프리셋 밖이다.
- WS 메시지 타입 리네임. `impl-preset-create/update/delete`,
  `apply-impl-preset(-global)`, `impl-presets-snapshot` 등 wire 이름은
  유지하고, UI 라벨과 주석·심볼 의미만 "실행 프리셋"으로 갱신한다.
- 디스패치 경로 변경. `resolveForDispatch`는 지금처럼 큐 3키만 읽는다 —
  프리셋은 적용 시점에 저장소에 쓰일 뿐 launch 시점에 조회되지 않는다.

## 설계

### A. 실행 탭 재편 (`app/views/settings-dialog/index.js`)

- `SETTINGS_TABS`를 `[{id:'execution', 실행}, {id:'display', 표시}]`로
  줄인다. `open(tab_id)`의 기본값과 기존 `'session'`/`'worker'` 호출부는
  `'execution'`으로 수렴시킨다.
- 실행 탭 그룹 순서: ① 프리셋 바(최상단) ② 오케스트레이션(런타임 필터 →
  모델 → effort → 속도) ③ 워크플로우 모드 ④ 리뷰 게이트 3쌍 ⑤ 구현 5키
  ⑥ 동시 실행(slots) ⑦ 워커 시스템 프롬프트(읽기 전용 접기).
- 편집 즉시 저장 동작은 그룹별 기존 경로 그대로다: 세션 계열 →
  `set-session-defaults`, 오케스트레이션 → CAS 기반
  `worker-queue-set-orchestration-defaults`, slots → `worker-queue-set-slots`.
  두 계열의 draft(`session_draft`/`worker_draft`)와 실패 처리(드래프트 유지,
  경고 배너)는 유지한다.
- 프리셋 "저장"은 실행 탭의 현재 명시값 스냅샷이다: `session_draft`의 명시
  키 + 큐의 non-null 오케스트레이션 3키를 합쳐 `settings`로 보낸다. 명시값이
  하나도 없으면 기존과 같이 거부 안내한다.

### B. 프리셋 스키마 확장 (`server/worker/exec-enums.js`, `server/exec-preset-store.js`)

- 프리셋 허용 키를 세션 kv 12키(`workflow_mode`, `spec/plan/impl_review_model`
  ·`_effort`, `impl_dispatch/runtime/model/effort/speed`) +
  `orchestration_model/effort/speed`의 15키로 확장한다. 저장은 sparse —
  명시 설정된 키만 담는다.
- 검증: 세션 12키는 기존 `sessionDefaultEnums` 규칙(모델·effort의 `auto`
  리터럴 포함), 오케스트레이션 3키는 큐 저장 경로
  (`worker-queue-set-orchestration-defaults`)와 동일한 러너 카탈로그·enum
  규칙을 재사용한다. 구현 정합성 검사(`validateImplPresetSettings`의
  dispatch=main 예외 등)는 유지한다.
- legacy 판정(`exec-preset-coordinator.js`): "15키 밖 키를 가진 프리셋"만
  legacy다. 기존 5키 프리셋은 15키의 부분집합이므로 그대로 유효하다.
- 주의: 구 12키 legacy 프리셋의 키들도 전부 15키의 부분집합이라, 스키마
  확장 배포 직후에는 legacy 판정에서 벗어나 선택기에 재노출될 수 있다.
  이는 D절 정리 작업을 배포 직후 곧바로 수행하는 것으로 해소한다(그 사이
  재노출은 무해 — 적용해도 유효 키만 쓰인다).

### C. 적용 의미 — 프로필 교체 (`server/ws/exec-preset-handlers.js`)

현행 5키 동작(담긴 키 set, 안 담긴 키 명시 unset)을 계열별로 확장한다.

- **전역 적용** (`apply-impl-preset-global`): (1) kv
  `workflow_session_defaults`를 세션 12키 범위에서 교체 — 프리셋에 담긴 키는
  그 값, 안 담긴 키는 unset. 기존 read–merge–write + readback 유지.
  (2) 현재 워크스페이스 큐의 오케스트레이션 3키를 같은 의미로 교체 —
  `expected_revision` CAS. 쓰기 순서는 kv → 큐이고 원자성은 없다: 큐 CAS
  충돌·실패 시 kv는 이미 적용된 상태로 두고(기존 last-write-wins 원칙)
  응답에 부분 실패를 표기해 UI가 "오케스트레이션 값은 적용되지 않았습니다 —
  다시 시도하세요"로 알린다.
- **Bead별 적용** (`apply-impl-preset`): `bd update --set-metadata/
  --unset-metadata` 대상을 세션 12키로 확장한다. 오케스트레이션 3키는
  Bead에 핀할 수 없으므로 무시하고, 응답에 스킵 사실을 담아 이슈 상세 UI가
  안내한다. 리뷰 게이트 키까지 unset 대상에 포함되는 것은 승인된 프로필
  교체 의미다(게이트 영수증 키 `spec_review`/`impl_review` 등과는 키가 달라
  충돌하지 않는다).

### D. 데이터 정리와 시드 (일회성 운영 작업 — 코드 아님)

- 배포·검증 후 WS API(또는 서버 정지 상태의 파일 편집 + 재시작)로 기존
  프리셋 13개를 전부 삭제하고 아래 3개를 생성한다. **legacy 원본(구 12키
  프리셋 레코드)까지 삭제**해 `copyLegacyPresets` 재복사 소스를 없앤다.
  구현 단계에서 legacy 재복사가 완료 표식 없이 재실행돼 삭제분을 되살리는
  경로가 없는지 확인하고, 있으면 그 경로를 막는 것을 이 유닛 범위에
  포함한다.

| 프리셋 이름 | settings |
|---|---|
| 클로드 라인 | `orchestration_model: opus`, `impl_runtime: claude` |
| 클로드 오케 + 코덱스 구현 | `orchestration_model: opus`, `impl_runtime: codex` |
| 코덱스 라인 | `orchestration_model: sol`, `orchestration_effort: xhigh`, `impl_runtime: codex` |

- 시드 근거: 현재 실사용 큐 값(beads=sol/xhigh, beads-ui·dotfiles·TRACE-ICI
  =opus, 2026-08-20 관측). 리뷰 게이트·모드 등 나머지 키는 담지 않아 적용 시
  기본값으로 통과한다.
- 코드에 시드/자동 삭제 로직을 심지 않는다 — 프리셋은 사용자 데이터이고,
  이번 정리는 사용자가 명시 승인한 일회성 작업이다.

## 에러 처리

- 프리셋 저장·삭제·적용의 revision 충돌, kv 파싱 실패 배너, 저장 실패 시
  드래프트 유지는 UI-qeiz §F 동작을 그대로 계승한다.
- 전역 적용의 부분 실패(큐 CAS 충돌)는 C절 규칙으로 사용자에게 노출한다.
- 15키 밖 키가 남은 프리셋(legacy)은 선택기에 노출하지 않는 기존 fail-quiet
  유지.

## Test scope

RED-GREEN seam은 현존 테스트 파일에 변경 전 실패하는 assertion을 추가하는
것으로 시작한다 (괄호는 변경 전 실패 이유).

1. `server/worker/exec-enums.test.js` — 프리셋 허용 키 15키 확장과
   오케스트레이션 값 검증. (허용 키 목록이 5키라 실패)
2. `server/exec-preset-store.test.js` — 오케스트레이션 키를 담은 프리셋
   저장·readback, 15키 밖 키만 legacy 분류. (오케 키가 거부되어 실패)
3. `server/ws/exec-preset-apply.test.js` — 전역 적용이 kv 12키 교체 + 큐
   3키 CAS 교체를 수행, 큐 충돌 시 부분 실패 응답; Bead 적용이 12키
   set/unset과 오케 3키 스킵 표기를 수행. (큐 쓰기·12키 확장 부재로 실패)
4. `server/worker/exec-preset-coordinator.test.js` — 15키 프리셋의 legacy
   비판정, 재복사 방지 경로. (판정 기준이 5키라 실패)
5. `app/views/settings-dialog/index.test.js`, `session-model.test.js` —
   2탭 레일, 실행 탭 그룹 순서, 프리셋 저장 스냅샷이 오케 3키 포함.
   (탭 3개·5키 스냅샷 관측으로 실패)
6. `app/views/detail-panel/exec-settings.test.js` — Bead 적용 요청/응답의
   12키·스킵 안내. (5키 payload 관측으로 실패)

Pre-Handoff Validation(tsc/test/lint/prettier/build)은 seam이 아니라 마감
검증이다.

## 구현 unit 후보

1. `server-preset-schema`: `server/worker/exec-enums.js` +
   `server/exec-preset-store.js` + coordinator legacy 판정
2. `server-apply-profile`: `server/ws/exec-preset-handlers.js` 적용 두 경로
3. `ui-execution-tab`: `app/views/settings-dialog/` 재편 +
   `app/views/detail-panel/exec-settings.js` 안내
4. `ops-preset-reseed`: 배포 후 일회성 정리·시드 (코드 아님, 완료 보고에
   readback 증거)
