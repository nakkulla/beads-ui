---
scope:
  - app/main.js
  - app/views/settings-dialog/
  - app/views/detail-panel/index.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/prompt-inspection.test.js
  - server/exec-preset-store.js
  - server/worker/exec-enums.js
  - server/worker/exec-preset-coordinator.js
  - server/ws/exec-preset-handlers.js
  - server/ws/worker-handlers.js
---

# 설정 다이얼로그 실행 탭 통합과 전체 프로필 프리셋

## 문서 상태

- 사용자 설계 승인: 2026-08-20 (접근 방식 1 + 설계 A–D 승인)
- 승인 이후 D절 변경 2건 (둘 다 사용자 확인됨):
  1. 승인 시점의 D절은 "코드에 시드/삭제 로직을 심지 않고 배포 후 일회성
     운영 작업으로 수행"이었다. spec 리뷰(codex/xhigh)가 blocking으로
     지적했다 — 그 형태로는 필수 효과가 PR Delivery 이후 소유자·영수증
     없이 남는다. 이를 받아들여 이 PR 안의 멱등 일회성 서버 시작
     마이그레이션으로 바꿨다.
  2. 삭제 범위를 "핀된 13개 id"에서 "기존 프리셋 전체"로 넓혔다 —
     2026-08-20 사용자 지시("프리셋은 없애도 되는데 새로 어차피 만들거잖아").
     id 핀 보호 장치가 불필요해져 절차가 전체 교체 한 번으로 단순해졌다.
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
4. 잔재 프리셋 13개를 정리하고 3개 시드를 만든다 (이 PR 안의 멱등 일회성
   서버 시작 마이그레이션).

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
  줄인다. `open(tab_id)`의 기본값과 활성 호출부 `app/main.js:1558`
  (`settings_dialog.open('session')`)를 `'execution'`으로 수렴시킨다.
  `app/views/prompt-inspection.test.js`도 이 다이얼로그를 직접 만들어
  시스템 프롬프트 표면을 검사하므로 탭 id 변경에 맞춰 갱신한다.
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
  확장만 놓고 보면 legacy 판정에서 벗어나 선택기에 재노출될 수 있다. D절
  재시드가 같은 서버 시작에서 이들을 삭제하므로 사용자에게 노출되는 창은
  없다.

### C. 적용 의미 — 프로필 교체 (`server/ws/exec-preset-handlers.js`)

현행 5키 동작(담긴 키 set, 안 담긴 키 명시 unset)을 계열별로 확장한다.

- **전역 적용** (`apply-impl-preset-global`): payload는 서로 다른 두
  저장소의 CAS 입력을 **별개 필드로** 받는다 — 기존
  `expected_revision`(프리셋 저장소 revision, 의미 불변)과 신설
  `expected_queue_revision`(현재 워크스페이스 큐 revision). 클라이언트는
  각각 프리셋 스토어 스냅샷과 큐 스토어 스냅샷에서 읽는다. 둘 중 하나라도
  없거나 정수가 아니면 기존과 같이 `bad_request`다.
- 쓰기 순서: (1) kv `workflow_session_defaults`를 세션 12키 범위에서 교체 —
  프리셋에 담긴 키는 그 값, 안 담긴 키는 unset. 기존 read–merge–write +
  readback 유지. (2) 현재 워크스페이스 큐의 오케스트레이션 3키를 같은
  의미로 교체 — `expected_queue_revision` CAS.
- 성공 시 응답은 kv `values`/`warnings`와 함께 갱신된 큐 스냅샷을 담고,
  서버는 기존 큐 전파 경로(`server/ws/worker-handlers.js`의 `fanout`)로
  `worker-queue-snapshot`을 푸시한다. 이것이 없으면 적용 직후 실행 탭의
  오케스트레이션 행이 낡은 값을 보여준다.
- 원자성은 없다: 큐 CAS 충돌·실패 시 kv는 이미 적용된 상태로 두고(기존
  last-write-wins 원칙) 응답에 `queue_applied: false`를 담아 UI가
  "오케스트레이션 값은 적용되지 않았습니다 — 다시 시도하세요"로 알린다.
- **Bead별 적용** (`apply-impl-preset`): `bd update --set-metadata/
  --unset-metadata` 대상을 세션 12키로 확장한다. 오케스트레이션 3키는
  Bead에 핀할 수 없으므로 무시하고, 응답에 스킵 사실을 담아 이슈 상세 UI
  (`app/views/detail-panel/index.js`의 적용 핸들러와
  `effective-settings-view.js`의 프리셋 바)가 안내한다. 리뷰 게이트 키까지
  unset 대상에 포함되는 것은 승인된 프로필 교체 의미다(게이트 영수증 키
  `spec_review`/`impl_review` 등과는 키가 달라 충돌하지 않는다).

### D. 데이터 정리와 시드 — 코드 내 멱등 일회성 재시드

정리·시드는 이 PR 안의 서버 시작 마이그레이션으로 수행한다. 손으로 하는
운영 작업으로 두면 이 유닛의 필수 효과가 PR Delivery 이후 소유자 없이
남기 때문이다. 이 저장소는 `repo-ops/config.toml`에 `[deploy]`를 선언하므로,
머지 후 배포 operation의 terminal success가 곧 이 마이그레이션의 실행
증거다. 별도 후속 Bead나 `worker-ineligible` 라벨은 필요하지 않으며,
`UI-9w9v`에 그 라벨을 붙이지 않는다.

**삭제 범위는 기존 프리셋 전체다.** 사용자가 2026-08-20에 전체 삭제를
명시 승인했다 — 남길 가치가 있는 프리셋이 없고 3개를 새로 만들기 때문이다.
따라서 id를 개별로 핀하지 않고 프리셋 목록을 통째로 시드 3개로 교체한다.
(관측 시점 기준 대상은 13개, `$XDG_STATE_HOME/bdui/exec-presets.json`
revision 21. 배포 시점에 개수가 달라도 전체 교체이므로 절차는 같다.)

시드 대상 3개:

| 프리셋 이름 | settings |
|---|---|
| 클로드 라인 | `orchestration_model: opus`, `impl_runtime: claude` |
| 클로드 오케 + 코덱스 구현 | `orchestration_model: opus`, `impl_runtime: codex` |
| 코덱스 라인 | `orchestration_model: sol`, `orchestration_effort: xhigh`, `impl_runtime: codex` |

시드 근거: 현재 실사용 큐 값(beads=sol/xhigh, beads-ui·dotfiles·TRACE-ICI
=opus, 2026-08-20 관측). 리뷰 게이트·모드 등 나머지 키는 담지 않아 적용 시
기본값으로 통과한다.

완료 표식은 **서버 전역 프리셋 상태 파일**
(`$XDG_STATE_HOME/bdui/exec-presets.json`)의 최상위 필드로 둔다. 대상
데이터가 서버 전역이므로 워크스페이스별 큐의 §F 표식
(`queue.session_defaults_migration`)과는 다른 자리이며, 표식과 데이터가 한
파일에 있어 원자적 rename 한 번으로 함께 남는다.

**고정 실행 순서** (서버 전역 1회). §F 마이그레이션은 세 destination에
나눠 쓰기 때문에 "표식은 맨 마지막" 규약이 필요했지만, 여기서는 데이터와
표식이 같은 파일에 있어 한 번의 원자적 쓰기로 함께 남는다:

1. 재시드 완료 표식이 이미 있으면 아무것도 하지 않고 끝낸다.
2. 프리셋 목록 전체를 시드 3개로 교체하고 표식을 함께 세운 상태를 한 번의
   원자적 파일 쓰기(기존 tmp + rename)로 저장한다.
3. 저장 후 readback해 (a) 프리셋이 정확히 시드 3개이고 각 name·settings가
   일치하며 (b) 표식이 있음을 확인한다.

중단 안전성: 교체와 표식이 한 번의 rename으로 함께 남으므로 중간 상태가
없다. rename 전에 죽으면 기존 상태가 그대로 남아 다음 시작에 같은 절차가
재실행되고, rename 후에는 표식이 있어 다시 돌지 않는다. 3이 실패하면 경고만
남기고 서버는 정상 기동한다(프리셋은 실행 경로의 필수 입력이 아니다).

legacy 재복사와의 관계: 전체 교체가 `copyLegacyPresets`의 사본과 원본을 함께
없앤다. 구현 시 §F legacy 재복사 경로가 이 재시드 이후 다시 돌아 삭제분을
되살릴 수 있는지 확인하고, 가능하면 재시드 표식을 재복사의 차단 조건으로
삼는다.

## 에러 처리

- 프리셋 저장·삭제·적용의 revision 충돌, kv 파싱 실패 배너, 저장 실패 시
  드래프트 유지는 UI-qeiz §F 동작을 그대로 계승한다.
- 전역 적용의 부분 실패(큐 CAS 충돌)는 C절 규칙으로 사용자에게 노출한다.
- 15키 밖 키가 남은 프리셋(legacy)은 선택기에 노출하지 않는 기존 fail-quiet
  유지.
- D절 재시드의 readback 실패는 표식을 쓰지 않고 경고만 남긴 뒤 서버를 정상
  기동시킨다(다음 시작에 재시도).

## Test scope

RED-GREEN seam은 현존 테스트 파일에 변경 전 실패하는 assertion을 추가하는
것으로 시작한다 (괄호는 변경 전 실패 이유).

1. `server/worker/exec-enums.test.js` — 프리셋 허용 키 15키 확장과
   오케스트레이션 값 검증. (허용 키 목록이 5키라 실패)
2. `server/exec-preset-store.test.js` — 오케스트레이션 키를 담은 프리셋
   저장·readback, 15키 밖 키만 legacy 분류. (오케 키가 거부되어 실패)
3. `server/ws/exec-preset-apply.test.js` — 전역 적용이 `expected_revision`과
   `expected_queue_revision`을 별개로 받아 kv 12키 교체 + 큐 3키 CAS 교체를
   수행하고 갱신된 큐 스냅샷을 응답·fanout에 싣는 것, 큐 충돌 시
   `queue_applied: false` 부분 실패 응답, Bead 적용이 12키 set/unset과 오케
   3키 스킵 표기를 수행하는 것. (큐 쓰기·두 번째 revision·12키 확장 부재로
   실패)
4. `server/worker/exec-preset-coordinator.test.js` — 15키 프리셋의 legacy
   비판정, 그리고 D절 재시드: 표식 부재 시 프리셋 전체가 시드 3개로 교체되고
   표식이 함께 기록되는 것, 표식이 있으면 재실행이 아무것도 바꾸지 않는 것,
   readback 실패 시 서버가 정상 기동하는 것, 표식 이후 legacy 재복사가
   삭제분을 되살리지 않는 것. (재시드 함수 부재와 5키 판정 기준으로 실패)
5. `app/views/settings-dialog/index.test.js`, `session-model.test.js` —
   2탭 레일, 실행 탭 그룹 순서, 프리셋 저장 스냅샷이 오케 3키 포함, 전역
   적용 요청이 두 revision을 싣고 응답의 큐 스냅샷을 반영하며 부분 실패
   문구를 표시. (탭 3개·5키 스냅샷·단일 revision 관측으로 실패)
6. `app/views/detail-panel/effective-card.test.js` — Bead 적용 요청/응답의
   12키와 오케 3키 스킵 안내. 이 파일이 상세 패널의 프리셋 적용 요청·응답을
   소유한다(`exec-settings.test.js`는 이 상호작용을 다루지 않으므로 seam이
   아니다). (5키 payload 관측으로 실패)

Pre-Handoff Validation(tsc/test/lint/prettier/build)은 seam이 아니라 마감
검증이다. `app/views/prompt-inspection.test.js`는 탭 id 변경에 따른 기계적
갱신 대상이지 seam이 아니다.

## 구현 unit 후보

1. `server-preset-schema`: `server/worker/exec-enums.js` +
   `server/exec-preset-store.js` + coordinator legacy 판정
2. `server-apply-profile`: `server/ws/exec-preset-handlers.js` 적용 두 경로 +
   `server/ws/worker-handlers.js` 큐 fanout 연결
3. `server-reseed-migration`: `server/worker/exec-preset-coordinator.js`의
   D절 멱등 재시드와 완료 표식
4. `ui-execution-tab`: `app/views/settings-dialog/` 재편 + `app/main.js`
   호출부 + `app/views/detail-panel/index.js`·`effective-settings-view.js`
   안내
