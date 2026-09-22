---
scope:
  - server/worker/exec-enums.js
  - server/exec-preset-store.js
  - server/worker/exec-preset-coordinator.js
  - server/worker/queue-store.js
  - server/worker/compare-projection.js
  - server/worker/bench-runs.js
  - server/ws/exec-preset-handlers.js
  - server/ws/monitor-handlers.js
  - server/ws/session-defaults-handlers.js
  - server/ws/worker-handlers.js
  - app/views/settings-dialog/
  - app/views/detail-panel/
  - app/views/monitor/
  - app/data/exec-preset-store.js
  - app/main.js
  - app/protocol.js
  - app/protocol.md
  - docs/adr/
---

# 실행 프리셋을 일반·quick fix 두 계열로 가르고 quick fix는 전용 탭에서 설정한다

## 문서 상태

- Bead: `UI-uohc`
- 경로: `spec_backed`; beads-ui 안에서 하나의 구현·검증·인도 묶음으로 처리한다.
- 기준: `main` / `493a8ed7af49f7b88195eeadce894d3cc87c62da`
- 상태: 사용자 검토용 완성 초안. 구현·스펙 게이트 승인 전이다.

## 1. 사용자 결과와 확인한 원인

프리셋을 바꿔도 quick fix 설정은 그대로 있고, quick fix는 quick fix끼리 고른다. 저장소마다 quick fix 설정을 따로 두고, 특정 이슈만 다르게 돌릴 수도 있다.

지금 프리셋 한 항목은 25키다 — 일반 17키(`ORCHESTRATION_KEYS` 3 + `BEAD_APPLY_KEYS` 14)에 `QUICK_FIX_ORCHESTRATION_KEYS` 3키와 `QUICK_FIX_KV_KEYS` 5키를 더한 것이다(`server/worker/exec-enums.js`). 전역 적용은 kv 18키와 큐 오케스트레이션 6키를 한 번에 교체하므로 어떤 프리셋을 적용하든 그 저장소의 quick fix 값이 함께 바뀐다.

실측(`~/.local/state/bdui/exec-presets.json` revision 111): 프리셋 5개 전부가 `quick_fix_orchestration_model=astra`, `quick_fix_orchestration_effort=xhigh` 두 키만, 그것도 똑같이 담고 있다. 프리셋이 구분하는 것은 총괄→구현 조합뿐인데 quick fix 축은 다섯 항목이 모두 같다. 표현력은 쓰이지 않고 덮어쓰기 위험만 남았다. 저장소 쪽 실측도 같다 — 9개 rig 큐에 그 두 값이 서 있고, kv의 quick fix 구현 5키는 어디에도 없어 하네스 `route_defaults.quick_fix.dispatch=main`으로 떨어진다(`generated/contracts/execution-defaults.json`).

편집 화면은 이미 있다. 모니터 헤더 `⚙`(여러 저장소), 모니터 레포 카드 `⚙`, 워커 탭 헤더 `⚙`(연결 저장소) 셋이 같은 다이얼로그를 열고 그 `워커` 탭 안에 quick fix 그룹 8행이 있다(ADR UI-e1ta). 빠진 것은 편집면이 아니라 프리셋 적용이 그 값을 건드리지 않는 것, 그리고 quick fix 이슈가 고를 수 있는 프리셋이다.

## 2. 검토한 접근과 선택

1. **프리셋 항목에 계열(`applies_to`)을 달아 목록을 가른다**를 선택한다. 값은 `general` 또는 `quick_fix`이고, `settings`는 계열과 무관하게 canonical 키 이름(`orchestration_model`, `impl_runtime` 등)만 쓴다. 계열이 적용 대상(저장 키 이름, 이슈 route)을 정한다. 저장 형식·CAS·스냅샷·비교 소비자가 하나로 남고, quick fix 프리셋을 여럿 두는 사용자 요구가 그대로 충족된다.
2. 프리셋에서 quick fix 키만 빼고 계열은 만들지 않는 안. 구현이 가장 작지만 "quick fix 이슈에는 quick fix용 프리셋만"이 불가능하다.
3. quick fix 프리셋을 별도 파일·별도 목록으로 두는 안. revision CAS와 스냅샷 이벤트가 둘이 되고 비교 탭이 두 목록을 합쳐 읽어야 한다. 한 파일 안의 한 필드로 얻을 수 있는 것을 위해 동시성 표면을 두 배로 만든다.

선택 1은 같은 저장소의 한 설계다. 서버 계약·저장 형식·네 화면을 호환을 맞춘 하나의 PR로 검증한다.

## 3. 프리셋 계열과 저장 형식

### 3.1 계열 필드

프리셋 항목에 `applies_to`를 더한다. 값은 `general`|`quick_fix`이고, 필드가 없거나 어휘 밖이면 `general`로 읽는다. `id`·`name`·`origin`·저장 순서의 의미는 그대로다. 이름 중복 회피(대소문자 무시, `<이름> 2` 접미)는 계열을 가로질러 판정한다 — 목록은 화면에서 갈리지만 파일은 하나고, 같은 이름 둘은 비교 탭의 이름 표시를 모호하게 만든다.

`lane`이라는 이름은 쓰지 않는다. 그 낱말은 은퇴한 레인별 적용의 어휘이고 `apply-impl-preset-global`이 아직 `payload.lane`을 거부한다(`server/ws/exec-preset-handlers.js`).

### 3.2 계열별 키 집합

| 계열 | `settings` 허용 키 | 개수 |
| --- | --- | --- |
| `general` | `ORCHESTRATION_KEYS` 3 + `BEAD_APPLY_KEYS` 14 | 17 |
| `quick_fix` | `ORCHESTRATION_KEYS` 3 + 구현 5(`impl_dispatch`, `impl_runtime`, `impl_model`, `impl_effort`, `impl_speed`) | 8 |

`quick_fix` 계열은 리뷰 9키(`spec_review`·`plan_review`·`impl_review`의 model·effort·speed)를 담지 않는다. 리뷰 설정은 계열과 무관한 공통 축이고 계약에도 route별 리뷰 키가 없다 — quick fix Bead가 도는 구현 리뷰도 이슈 핀과 일반 kv 층에서 해석되며, 이 분리가 그 해석을 바꾸지 않는다. 저장 파일에 `quick_fix_` 접두 키는 더 이상 나타나지 않는다.

허용 값은 계열마다 다르고, 그 차이는 dotfiles 계약이 정한 것을 그대로 옮긴 것이다(ADR 0012, 이 저장소는 소비자다).

- `general`의 `impl_runtime`은 `auto`를 허용하고 `impl_model`도 `auto`를 허용한다.
- `quick_fix`의 `impl_runtime`은 `claude`|`codex`만, `impl_model`은 카탈로그 토큰만 받는다(`auto` 없음). `impl_effort`는 `auto`를 포함한다. 현행 `sessionDefaultEnums`의 `quick_fix_impl_*` 항목을 canonical 이름에 대응시킨 것이며 새 어휘를 만들지 않는다.

정합 검증(`validateImplPresetSettings`)은 계열을 받아 그 키 집합에만 적용한다. `quick_fix_provider_model_mismatch`처럼 접두어를 붙여 사유를 변환하던 경로는 사라지고, 사유는 canonical 이름 하나로 말한다.

### 3.3 읽기와 쓰기

로드는 지금처럼 값 검증 없이 문자열을 보존한다 — 카탈로그에서 사라진 모델을 조용히 지우지 않고 `compatible:false`로 보여 주는 현행 판정을 유지한다. 은퇴한 `workflow_mode`를 버리는 규칙도 그대로다. 쓰기 경로(생성·수정)가 계열별 키 집합과 enum을 강제한다.

## 4. 저장소에 적용

`apply-impl-preset-global`의 요청 payload는 그대로다(`preset_id`, `expected_revision`, `expected_queue_revision`, 선택 `root_dir`). 서버가 프리셋의 `applies_to`를 읽어 무엇을 교체할지 정한다. `payload.lane` 거부는 유지한다.

| 계열 | kv 교체 대상 | 큐 교체 대상 | 보존 |
| --- | --- | --- | --- |
| `general` | `WORKSPACE_KV_KEYS`와 일반 계열 키 집합의 교집합(계약이 전역 쓰기를 막는 `impl_dispatch` 제외) | `orchestration_model`·`orchestration_effort`·`orchestration_speed` | `quick_fix_impl_dispatch`·`quick_fix_impl_runtime`·`quick_fix_impl_model`·`quick_fix_impl_effort`·`quick_fix_impl_speed` 및 큐의 quick fix 오케스트레이션 3키 |
| `quick_fix` | 위 kv 5키(프리셋의 canonical 구현 5키를 접두 이름으로 기록) | `quick_fix_orchestration_model`·`quick_fix_orchestration_effort`·`quick_fix_orchestration_speed` | 일반 kv 키와 큐 오케스트레이션 3키 |

두 집합 모두 명시값은 set, 계열 키 집합 안의 누락은 unset/null로 교체한다. 계열 밖 키는 payload에 나타나지 않으므로 그 저장소의 현재 값이 유지된다. `workflow_mode`·`bdui_url`·`base_sync_accept_local_commits`·계정·자동화·동시성은 어느 계열에서도 대상이 아니다.

일반 프리셋의 `impl_dispatch`는 지금처럼 이슈 pin 전용이고 저장소에는 쓰지 않는다(ADR 0012의 `write_rule: user_write_only`). quick fix 계열의 `impl_dispatch`는 계약이 허용한 전역 값이므로 `quick_fix_impl_dispatch`로 기록한다. 이 비대칭은 계약에서 온 것이며 화면의 도움말 한 줄로 설명한다.

kv 먼저, 큐 나중의 쓰기 순서와 비원자성, 부분 적용 시의 안내는 현행 그대로다.

### 4.1 적용 기록

큐는 계열마다 하나씩 기록한다: 기존 `applied_exec_preset`(일반)과 새 `applied_quick_fix_preset`(quick fix). 둘 다 `{ id, name, revision, applied_at }`이며 정규화·직렬화 경로는 기존 것을 공유한다. 한 계열의 적용은 다른 계열의 기록을 지우지 않는다 — 적용 직전 `clearAppliedExecPreset`이 비우는 것도 그 계열의 기록뿐이다.

모니터 행이 싣는 `applied_exec_preset` 필드(UI-e1ta)는 두 필드가 되고, 구버전 클라이언트가 모르는 필드를 무시하는 현행 관용을 유지한다. 행을 구성하는 `server/ws/monitor-handlers.js`가 두 기록을 그대로 싣는다.

개별 값을 직접 고쳐 기록이 더 이상 사실이 아닐 때 그것을 푸는 판정(`changesAppliedExecPreset`)도 계열을 따른다. 세션 기본값 쓰기(`server/ws/session-defaults-handlers.js`)와 큐 오케스트레이션 쓰기(`server/ws/worker-handlers.js`)는 그 요청이 실제로 바꾼 키가 속한 계열의 기록만 푼다. 일반 행을 고쳤다고 quick fix 기록이 지워지지 않고, 그 반대도 마찬가지다.

## 5. 이슈에 적용

이슈별 적용은 관측된 route와 프리셋 계열이 맞을 때만 일어난다.

- route가 `quick_fix`인 이슈에는 `applies_to=quick_fix` 프리셋만 적용한다.
- route가 `quick_fix`가 아니거나 아직 핀되지 않은 이슈에는 `general` 프리셋만 적용한다.
- 어긋나면 아무것도 쓰기 전에 `preset_route_mismatch`로 거부한다. 클라이언트가 그 계열만 목록에 담으므로 정상 경로에서는 오지 않는다.

교체 범위는 계열의 키 집합이다. 일반 프리셋은 지금처럼 `BEAD_PIN_KEYS` 17키를 교체한다(명시값 set, 누락 unset). quick fix 프리셋은 오케스트레이션 3키와 구현 5키만 교체하고 리뷰 9키는 손대지 않는다. `applied_exec_preset` metadata 키는 계열과 무관하게 프리셋 `id` 하나를 기록한다(ADR UI-xq3h 승계).

`presetSettingsForIssue`에서 사라지는 것은 접두어 역매핑뿐이다. 프리셋이 이미 canonical 키를 담으므로 route에 따라 `quick_fix_` 접두 키를 먼저 찾고 일반 키로 떨어지던 분기는 필요 없다. 반면 모델에서 런타임을 유도하는 규칙은 유지한다. 프리셋 저장 검증은 런타임 없는 모델 단독을 허용하지만(`validateImplPresetSettings`가 `active_writer:false`로 대조한다) 이슈 핀 검증은 같은 조합을 `impl_runtime_required`로 거부하므로, 유도를 없애면 모델만 담은 프리셋의 적용이 실패한다. 유도는 계열과 무관하게 canonical `impl_model`에서 하고, 명시된 `impl_runtime`이 있으면 그것이 이긴다. 이슈 metadata에 quick fix 접두 키를 쓰지 않는다는 기존 규칙은 그대로다.

어긋남 계산(`dispatchPreset`)도 계열을 따른다: 이슈 route가 `quick_fix`면 큐의 `applied_quick_fix_preset`과 8키를, 아니면 `applied_exec_preset`과 17키를 대조한다. 비교에서 접두 키 조회는 없어진다. 이슈 상세가 쓰는 대칭 비교(`presetDeviation`)의 키 범위도 같다 — quick fix 계열에서 리뷰 9키는 교체 대상이 아니므로 비교 대상도 아니고, 리뷰 핀이 선 이슈에 quick fix 프리셋을 적용한 직후의 어긋남은 0이어야 한다.

기본값은 저장소 설정이다. 이슈에 핀이 없으면 실행은 지금처럼 kv의 quick fix 층 → 일반 층 → 하네스 순으로 해석된다(`app/utils/execution-defaults.js`, dotfiles 계약). 이 해석 순서는 이 설계의 변경 대상이 아니다.

판정 칩(`복잡`·`frontend`·`backend`) 클릭으로 프리셋을 적용하는 UI-wg68의 조작은 quick fix 이슈에서 동작하지 않는다 — 그 이슈에서는 기존처럼 사유 팝업만 뜬다. 칩 바인딩을 계열별로 나누는 일은 필요가 생겼을 때 별도로 판단한다(사용자 결정).

## 6. 설정 화면

### 6.1 탭

설정 다이얼로그의 실행 탭은 넷이 된다: `워커` · `quick fix` · `세션` · `계정`(전체 설정에는 `표시`가 더 붙는 현행 유지). 단일 저장소 모드와 여러 저장소 일괄 모드 모두 같은 넷이다. 기존 `execution` 진입은 `워커`로 연결한다.

`워커` 탭에서 quick fix 그룹을 들어낸다. 남는 것은 오케스트레이션·구현·리뷰 세 그룹과 프리셋 바이며, 그 프리셋 바의 목록은 `general` 계열만 담는다.

`quick fix` 탭은 자기 프리셋 바와 두 그룹을 갖는다.

```text
설정             quick fix
워커             [프리셋 선택                       ] [적용] [···]
quick fix        작업 진행     모델  사고 깊이  (속도)
세션             구현          실행 방식
계정                           위임일 때만 대상·모델·사고 깊이·(속도)
```

`실행 방식`이 그룹을 이끄는 것, 해석된 방식이 `main`이면 위임 행을 DOM에서 빼는 것, 속도를 Codex로 확정됐을 때만 보이는 것은 현행 규칙 그대로다. 서버가 quick fix를 받지 않으면 탭 전체를 기존 비활성 문구(`서버가 quick_fix 레인을 지원하지 않습니다`)로 잠근다.

프리셋 바의 `현재 설정 저장…`은 그 탭의 계열로 저장하고, `선택한 프리셋 업데이트…`·`프리셋 삭제…`도 그 계열 목록만 대상으로 한다. 저장이 서버 전역 목록을 바꾼다는 기존 안내는 두 탭 모두에 남는다.

### 6.2 일괄 모드

관측 네 상태(`같음`·`비어 있음`·`갈림`·`미확인`)와 편집 표시, 갈림·미확인 행이 payload에서 빠지는 규칙, 저장소별 순차 op와 부분 실패 재적용은 `quick fix` 탭에서도 같다(ADR UI-e1ta 승계). 프리셋을 고르면 그 탭의 행만 `편집됨`이 된다 — `워커` 탭은 17행 중 저장소에 쓰는 행, `quick fix` 탭은 8행이다. 한 탭의 실행이 다른 탭의 계획을 만들지 않는다.

읽기 전용 `적용된 프리셋` 줄은 탭마다 자기 계열의 기록을 `id`로 찾아 이름을 표시한다.

### 6.3 이슈 상세

이슈 상세의 프리셋 드롭다운은 그 이슈 route의 계열만 나열한다. 계열 목록이 비어 있으면 드롭다운을 비활성으로 두고 `이 이슈에 쓸 프리셋이 없습니다`를 표시한다. 위치와 `이 이슈에 적용`의 의미는 현행 그대로다.

## 7. 비교 탭과 실험

`compare-projection.js`의 `presetMatch`에서 사라지는 것은 `quick_fix_<key> ?? <key>` 접두 조회뿐이다. 후보를 계열로 거르지는 않는다. 실험 복제 이슈는 `benchCloneFields`가 route를 `quick_fix`로 두고 `impl_dispatch`를 `delegated`로 덮어 만들기 때문에, route로 계열을 좁히면 일반 계열 프리셋으로 돌린 실험이 자기 프리셋과 매칭되지 않는다. 모든 프리셋을 canonical 키로 같은 방식으로 대조하며 점수·동점 처리·`candidates` 노출은 그대로다.

`bench-runs.js`의 기록 형식과 `resolved_tuple`은 바꾸지 않는다. 실험 복제는 `apply-impl-preset`을 거치지 않고 `bd create`의 metadata로 tuple을 직접 핀하므로 §5의 route-계열 일치 판정 대상이 아니다. 과거 manifest와 attempt는 당시 값 그대로 읽힌다. 실험 입력에도 계열 제한을 두지 않는다 — clone이 `impl_dispatch=delegated`로 덮는 기존 동작과 그 이유(그 축을 덮지 않으면 프리셋의 구현 런타임·모델이 실행되지 않는다)를 그대로 두며, 프리셋의 `impl_dispatch`가 `main`이어도 그 덮어쓰기가 측정 대상을 만든다는 현행 계약을 바꾸지 않는다.

## 8. 마이그레이션

새 마커 `preset_profile_migration: { version: 1 }`을 파일 최상위에 둔다. 마커가 이미 있으면 다시 실행하지 않는다(`reseed_migration`의 선례를 따른다). 절차는 기존 프리셋 파일 한 번의 rename으로 끝난다.

부팅 경로에서 두 마이그레이션의 순서를 고정한다: `migrateWorkspaces`가 기존 재시드(`reseedPresets`, 마커 `reseed_migration`)를 끝낸 뒤에 이 분리를 실행한다. 반대 순서면 `replaceAllForReseed`의 전체 교체가 방금 만든 quick fix 프리셋과 새 마커를 지운다. 각 마커는 자기 쓰기와 같은 rename에 들어가고 쓰기 뒤 readback으로 확인하므로, 어느 한쪽에서 멈춰도 다음 부팅이 마커가 없는 단계부터 다시 시작한다.

1. 기존 항목마다 `settings`에서 quick fix 8키를 떼어내고 `applies_to: 'general'`을 부여한다. `id`·`name`·`origin`·순서·나머지 키는 그대로 둔다.
2. 떼어낸 값을 canonical 이름으로 되돌려 조합별로 모은다. 비어 있지 않은 조합마다 `applies_to: 'quick_fix'` 프리셋 하나를 새 `id`로 만든다. `origin`은 `{ kind: 'legacy-preset-copy', source_preset_id: <그 조합의 첫 원본 id> }`다.
3. 새 프리셋 이름은 `quick fix 기본`이며, 조합이 둘 이상이면 기존 중복 회피 규칙이 `quick fix 기본 2`를 만든다. 값에서 이름을 지어내지 않는다 — 모델 토큰을 한글 이름으로 옮기는 규칙은 자의적이고, 사용자가 곧바로 바꿀 이름이다.
4. `revision`을 하나 올리고 마커를 같은 쓰기에 기록한 뒤 readback으로 확인한다.

실측 revision 111에서는 5개 항목의 조합이 하나뿐이므로 결과는 quick fix 프리셋 한 개(`orchestration_model=astra`, `orchestration_effort=xhigh`)다.

저장소의 kv와 큐는 마이그레이션이 건드리지 않는다. 지금 9개 rig가 도는 quick fix 값은 그대로 서 있고, 큐의 `applied_quick_fix_preset`은 사용자가 처음 적용할 때 기록된다 — 마이그레이션이 적용 사실을 지어내지 않는다.

## 9. 테스트 범위와 인도 조건

이번 초안에는 RED-GREEN 전용 seam을 승인하지 않는다. 아래 행위 검증과 저장소의 필수 검증을 수행한다.

| 검증 경계 | 수락 조건 |
| --- | --- |
| 저장 형식 | `applies_to` 부재는 `general`; 어휘 밖 값도 `general`; 계열별 허용 키 밖은 쓰기에서 거부; 이름 중복 회피가 계열을 가로질러 동작 |
| 계열 enum | quick fix 계열이 `impl_runtime=auto`·`impl_model=auto`를 거부하고 일반 계열은 허용; 사유 문자열에 접두 변환이 없음 |
| 전역 적용 | 일반 적용이 quick fix kv 5키와 큐 3키를 보존; quick fix 적용이 일반 키를 보존; 각 계열의 누락 키만 unset; `workflow_mode`·주소·base 동기화·계정·동시성 보존 |
| 적용 기록 | 두 기록이 독립; 한 계열 적용이 다른 기록을 지우지 않음; 모니터 행이 두 필드를 싣고 구버전 필드 부재를 견딤; 개별 값 수정은 그 값이 속한 계열의 기록만 해제 |
| 이슈 적용 | route와 계열이 맞을 때만 적용; 불일치는 write 전 `preset_route_mismatch`; quick fix 적용이 리뷰 9키를 보존; route 미핀 이슈는 일반 계열; 모델만 담은 프리셋이 런타임 유도로 적용되고 명시 런타임이 유도를 이김 |
| 어긋남 | route별로 대조 대상 기록과 키 집합이 갈림; 접두 키 조회 없음; 리뷰 핀이 선 이슈에 quick fix 프리셋을 적용한 직후 상세의 어긋남이 0; 기록된 정체성이 프리셋 삭제 후에도 살아남는 현행 유지 |
| 화면 | 네 탭이 두 모드 모두에 존재; `워커` 탭에 quick fix 행 없음; `quick fix` 탭의 main 전환이 위임 행을 DOM에서 제거; 두 프리셋 바가 서로의 목록을 담지 않음 |
| 일괄 | quick fix 탭의 관측 네 상태·갈림/미확인 제외·부분 실패 재적용; 프리셋 선택이 그 탭 행만 편집됨으로 바꿈 |
| 이슈 상세 | 드롭다운이 route의 계열만 나열; 빈 계열에서 안내와 비활성 |
| 비교·실험 | canonical 키 대조로 계열 구분 없이 매칭; route `quick_fix`인 실험 복제가 일반 계열 프리셋과 매칭됨; 과거 manifest·attempt 해석 불변 |
| 마이그레이션 | 이름·id·origin·순서 보존, quick fix 키 제거, 조합별 생성, 마커 멱등, revision +1, readback; 재시드 뒤에 실행되어 결과가 지워지지 않음; 중단 후 재부팅이 남은 단계부터 재개; kv·큐 무변경 |

기존 테스트를 확장한다: `exec-preset-store`, `exec-preset-apply`, `exec-preset-coordinator`, `exec-enums`, `ws.impl-presets`, `bulk-pane`, `bulk-worker-form`, `execution-pane`, `settings-dialog/index`, `detail-panel`, `monitor/deck`, `compare-projection`, `bench-runs`.

인도 전 Node engines 확인, `npm run tsc`, `npm run lint`, 변경 파일 Prettier, `npx vitest run --reporter=dot`를 수행한다. 정적 UI 확인이 필요하면 `npm run build`를 선행한다. 실제 브라우저에서 PC·모바일 폭으로 네 탭 이동, 두 계열의 프리셋 저장·적용, quick fix main/위임 전환, 이슈 상세 드롭다운을 확인한다. `app/protocol.md`의 프리셋 항목 설명과 키 개수를 실제 집합으로 고친다.

## 구현 unit 후보

- `preset-profile-contract`: `server/worker/exec-enums.js`, `server/exec-preset-store.js` — 계열 필드·키 집합·enum·검증·마이그레이션.
- `apply-paths`: `server/worker/exec-preset-coordinator.js`, `server/worker/queue-store.js`, `server/ws/exec-preset-handlers.js` — 전역·이슈 적용과 두 기록, 어긋남 계산.
- `settings-tabs`: `app/views/settings-dialog/` — 네 탭, 두 프리셋 바, 일괄 관측.
- `consumers`: `app/views/detail-panel/`, `app/views/monitor/`, `server/worker/compare-projection.js`, `server/worker/bench-runs.js` — 드롭다운 필터, 모니터 투영, 비교·실험.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 키 어휘·허용 값·`impl_dispatch`의 전역 쓰기 금지는 dotfiles 계약을 읽어 따르고 새 어휘를 만들지 않는다.
- 전제: ADR UI-wecw — 세션 기본값 어휘·검증의 dotfiles 소유권(0013 승계)을 그대로 따르고 프리셋이 무엇을 교체하는지만 바꾼다.
- 전제: ADR 0014 — 새 컨트롤은 설정 다이얼로그와 이슈 상세에만 두고 워커·모니터 카드의 슬롯은 바꾸지 않는다.
- 실행 프리셋을 `applies_to`로 가르고 계열이 적용 대상과 이슈 route를 정하는 것: 되돌림 비용 있음(영속 형식·마이그레이션·두 적용 경로·두 기록·비교 소비자), 배경 없이 의외임(한 목록에 두 계열), 실재 대안 있음(키만 제거, 별도 파일). `summary`: "실행 프리셋은 applies_to로 일반·quick fix 두 계열로 갈리고 settings는 canonical 키만 담으며, 계열이 저장소 적용의 키 집합과 이슈 route 일치를 정해 다른 계열의 값은 보존된다 — 이슈 적용의 25키 프로파일과 quick fix 역매핑을 대체하고 id 하나 정체성·대칭 비교는 승계한다" → ADR, supersede UI-xq3h
- 설정 창이 네 탭이고 quick fix 탭이 자기 프리셋 바를 갖는 것: 되돌림 비용 있음(일괄 창의 탭 고정·관측 상태 기계·프리셋 관리 호출 지점이 UI-e1ta에 함께 묶여 있어 탭 수 변경이 셋을 같이 건드린다), 배경 없이 의외임(같은 창의 두 프리셋 바가 서로 다른 목록을 담고 한쪽 선택이 다른 탭의 행을 건드리지 않는다 — UI-e1ta의 "프리셋을 고르면 25행 전부가 편집됨"과 정반대다), 실재 대안 있음(한 탭에 두고 프리셋 밖임을 표시만 하는 안). `summary`: "설정 창은 워커·quick fix·세션·계정 네 탭이고 quick fix 탭이 자기 계열의 프리셋 바와 8행을 가지며 프리셋 선택은 그 탭의 행만 편집됨으로 바꾼다 — 세 탭과 25행 일괄 편집만 UI-e1ta에서 뒤집고 관측 네 상태·순차 op·레포 카드의 같은 다이얼로그는 승계한다" → ADR, supersede UI-e1ta

## 경계·후속

다른 저장소에서 구현할 필수 작업과 별도 형제 Bead는 없다. dotfiles 계약의 키 어휘·해석 순서, Worker의 실행 스케줄러, 계정 전환 정책, 카드 슬롯은 바꾸지 않는다. 저장소 kv·큐의 현재 quick fix 값 변경과 새 프리셋 시딩(마이그레이션이 만드는 한 개 제외)은 포함하지 않는다.

- 관찰: UI-wg68(칩별 실행 프리셋 바인딩) — 그 스펙 §4.2가 `apply-impl-preset`의 17키 교체와 quick fix 역매핑을 재사용한다고 적고 있어 이 설계가 그 전제를 바꾼다. 이미 있는 Bead이므로 새로 만들지 않고, hand-off에서 UI-wg68이 이 Bead에 `blocks`로 걸리며 착지 뒤 그 스펙을 정정한다(사용자 결정: 이번 것을 먼저).
- 관찰: 판정 칩의 계열별 바인딩 — quick fix 이슈에서 칩 클릭을 비활성으로 두기로 했으므로 지금 만들 것이 없다. 필요가 생기면 그때 판단한다(사용자 결정).
