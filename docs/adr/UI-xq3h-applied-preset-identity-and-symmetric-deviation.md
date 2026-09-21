---
id: UI-xq3h
title: 이슈에 적용한 프리셋의 정체성은 id 하나로 기록하고 어긋남은 읽을 때 대칭 비교로 계산한다 — 17키 교체·quick_fix 역매핑·오케스트레이션 검증·응답 형식은 UI-00lf를 승계한다
status: accepted
date: 2026-09-21
summary: "이슈에 적용한 프리셋의 정체성은 id 하나를 metadata `applied_exec_preset`에 기록하고 프리셋과의 어긋남은 저장하지 않고 읽을 때 현재 프리셋과 대칭 비교해 계산한다 — UI-00lf의 '새 표시 요소는 없다' 조항만 뒤집고 17키 교체·역매핑·검증은 승계한다"
supersedes: [UI-00lf]
spec: docs/superpowers/specs/2026-09-21-issue-detail-execution-roles-and-applied-preset-design.md
bead: UI-xq3h
---

# 이슈에 적용한 프리셋의 정체성은 id 하나로 기록하고 어긋남은 읽을 때 대칭 비교로 계산한다 — 17키 교체·quick_fix 역매핑·오케스트레이션 검증·응답 형식은 UI-00lf를 승계한다

## Context

ADR UI-00lf(2026-09-15)는 이슈별 프리셋 적용의 핀 규칙을 세우면서 표시에 대해 한 줄을
함께 정했다. "적용 결과 표시는 기존 층 모델(핀 > quick_fix 전역 > 일반 전역)로 충분하며
새 표시 요소는 없다." 그 판단의 대상은 그때 폐기한 `skipped_orchestration_keys` 힌트였다.
서버가 건너뛴 키를 응답에 실어 이슈 상세가 토스트와 카드 힌트를 그리던 것을, 핀 배지가
같은 사실을 이미 말하므로 지웠다. 그 맥락에서는 옳은 결론이었다.

사용자가 이슈 상세를 열고 관찰한 것은 다른 사실이다(UI-xq3h 스펙 §1). 프리셋을 적용해도
이 이슈가 어느 프리셋에서 왔는지 화면 어디에도 남지 않는다. 드롭다운의 선택값은 화면
상태일 뿐이라 다른 이슈를 열거나 상세를 닫았다 다시 여는 순간 플레이스홀더로 돌아간다.
층 배지는 "이 값이 핀이다"를 말하지만 "이 핀들이 어느 프리셋에서 왔는가"는 다른 질문이고,
층 모델은 그 질문에 답할 재료를 갖고 있지 않다. 그래서 UI-00lf의 그 한 조항을 뒤집는다.

정체성을 어디에 두는지는 세 대안이 실재했다(스펙 §2).

- **이슈 metadata에 프리셋 id 하나**(선택) — 적용이 이미 그 이슈에 `bd update` 한 번을
  쓰므로 같은 argv에 키가 하나 더 붙을 뿐이고, 읽기는 기존 metadata 투영(ADR 0025)을 탄다.
- **워크스페이스 큐의 `applied_exec_preset`을 카드가 읽는다** — 쓰기가 없지만 그 값은 전역
  적용의 기록이다. 이슈 A에 프리셋 P를 적용해도 큐 값은 바뀌지 않으므로 카드가 거짓을 말한다.
- **서버가 이슈 상세 투영에 `exec_preset` 객체를 계산해 싣는다** — 스냅샷 투영이 프리셋
  저장소를 알아야 하고, ADR 0025가 정한 "상세 전용 read 없음"의 경계를 새 의존으로 흐린다.

무엇을 기록할지도 갈렸다. 워크스페이스 큐의 `AppliedExecPreset`은 `id`·`name`·`revision`·
`applied_at` 네 필드를 담는다. 그 네 필드를 이슈에도 복사하는 대안이 실재했고 버렸다.

## Decision

**이슈에 적용한 프리셋의 정체성은 id 한 토큰이다.** Bead metadata 키
`applied_exec_preset`에 프리셋 저장소가 발급한 id를 그대로 담는다. 어휘 정본은
`server/worker/exec-enums.js`의 상수 `APPLIED_EXEC_PRESET_KEY`이고
`app/views/settings-dialog/session-model.js`가 같은 이름으로 미러한다.

**큐가 담는 네 필드 중 id만 쓴다.** `revision`은 프리셋 하나의 개정 번호가 아니라 목록
전체의 개정 번호다. `resolvePresetForApply`가 `snapshot.revision`을 그대로 돌려주므로,
이슈에 박아두면 남의 프리셋을 고쳐도 번호가 어긋나 "이 프리셋이 그 뒤 수정됐다"는 신호로
쓸 수 없다. `name`은 복사해 두면 이름을 바꾼 순간 카드가 옛 이름을 말하므로, 언제나 현재
목록에서 id로 찾고 목록에 없으면 이름을 지어내지 않고 삭제됐다고 말한다.

**이 키는 `BEAD_PIN_KEYS` 17키 밖에서 같은 argv에 붙는다.** `buildApplyImplPresetArgs`가
17키 순회를 마친 뒤 `--set-metadata applied_exec_preset=<id>`를 한 번 더한다. 한 argv이므로
핀과 정체성이 따로 착지하는 중간 상태가 없다. 쓰는 경로는 `apply-impl-preset` 하나다 —
개별 키 편집(`update-exec-settings`), 전역 적용(`apply-impl-preset-global`), 프리셋 삭제는
이 키를 건드리지 않는다. 프리셋을 지워도 전 저장소의 Bead를 훑어 지우지 않고 읽는 쪽이
fail-quiet한다.

**어긋남은 저장하지 않고 읽을 때 계산한다.** 핀과 프리셋 `settings`는 둘 다 읽는 시점에
손에 있으므로 그때 대조하면 항상 현재 사실이다. 저장하면 개별 키 편집과 프리셋 수정마다
갱신 책임이 생기고, 갱신을 놓친 값은 조용히 거짓이 된다.

**비교는 17키 대칭 비교다.** 클라이언트가 서버 `presetSettingsForIssue`의 route 투영을
축별로 미러링해 기대값을 만들고, `BEAD_PIN_KEYS` 17개를 돌며 이슈 metadata의 실제값과
맞춘다. 투영된 프리셋에 키가 있으면 그 값이 기대값이고, 없으면 **부재**가 기대값이다 —
적용이 그 키를 `--unset-metadata`하기 때문이다. 양쪽 모두 키가 없거나 값이 빈 문자열이면
부재로 읽어 부재와 부재는 일치, 부재와 값은 한 건이다.

**서버 `dispatchPreset`의 `deviated_keys`와 한 구현으로 합치지 않는다.** 그쪽은 존재하는
핀만 세고 비어 있는 핀을 건너뛴다. 두 함수는 다른 질문에 답한다 — `dispatchPreset`은 이
attempt가 실제로 들고 간 값 중 무엇이 프리셋과 달랐는가를, 카드는 이 이슈가 아직 그
프리셋을 그대로 서술하는가를 답한다. 합치면 한쪽의 규칙 변경이 다른 쪽의 기록 의미를
조용히 바꾼다.

**기대값을 알 수 없는 동안에는 말하지 않는다.** 프리셋 목록이 아직 도착하지 않았으면
빈 목록과 구분되지 않으므로 토큰을 그리지 않고, quick_fix 이슈에서 프리셋이 레인 런타임
없이 레인 모델만 담아 기대 런타임을 카탈로그 조회로만 얻을 수 있는데 실행기 카탈로그가
아직 도착하지 않았으면 판정을 미룬다. 카탈로그가 도착했는데 그 모델만 없는 경우는 서버
`inferImplRuntime`도 같은 방식으로 유도에 실패해 일반 `impl_runtime`으로 떨어지므로 두
결론이 일치하고, 판정 불가가 아니다.

**이 키는 beads-ui 소유이며 계약 표면을 넓히지 않는다.** dotfiles 스킬은 이 키를 읽지
않는다. dotfiles `docs/contracts/workflow-state.yaml`의 `metadata.out_of_registry` 규칙이
그런 키를 beads-ui 소유로 두고 계약에 열거하지 않는다. ADR 0012가 막는 것은 beads-ui가
계약 키를 정의하는 일이고, 여기서 만드는 것은 beads-ui 자신의 키다.

**UI-00lf에서 승계하는 조항.** 이슈 핀 키 집합 `BEAD_PIN_KEYS`는
`[...ORCHESTRATION_KEYS, ...BEAD_APPLY_KEYS]` 17키이고, 이슈별 적용은 그 17키를 교체하며
프리셋에 없는 키는 `--unset-metadata`되어 워크스페이스 큐로 떨어진다. `route=quick_fix`
이슈는 오케스트레이션 3키도 `preset[QUICK_FIX_LANE_MAP[key]] ?? preset[key]`로 역매핑하고
Bead에 쓰는 이름은 route와 무관하게 `orchestration_model`·`orchestration_effort`·
`orchestration_speed`다. 투영된 오케스트레이션 3키는 핀 전에 `validateOrchestrationPin`이
모델 기준으로 검증하며 실패는 `impl_preset_incompatible`이고 metadata를 쓰지 않는다.
`skipped_orchestration_keys`는 폐기된 채로 남고 서버 응답은
`{ applied, conflict, revision, issue }` 그대로다. UI-00lf가 UI-7yh2에서 승계한 조항들도
그대로다 — 실행 프리셋은 25키 워크스페이스 프로파일이고 `workflow_mode`는 프리셋 키가
아니며, 전역 적용은 `lane` 없이 kv 18키와 큐 6키를 한 번에 교체하고, quick_fix route
이슈의 구현 4키와 `impl_runtime` 역매핑 및 `validateImplSettings` 검사도 그대로다.

뒤집는 것은 UI-00lf의 한 조항뿐이다. "적용 결과 표시는 기존 층 모델로 충분하며 새 표시
요소는 없다" 대신, 이슈 상세 카드는 적용한 프리셋의 이름과 그 뒤의 어긋남을 말하는
표시 요소를 하나 갖는다.

## Consequences

- 되돌리기 어렵다. 프리셋을 적용한 모든 Bead에 키가 남으므로 은퇴에 일괄 정리가 따르고,
  UI-00lf의 한 조항을 복원하는 일도 함께 필요하다.
- 맥락 없이는 놀랍다. 큐는 `id`·`name`·`revision`·`applied_at`을 저장하는데 이슈는 id만
  저장하는 비대칭의 이유가 `revision`이 목록 전체의 번호라는 사실에 있고, 코드만 보면
  드러나지 않는다.
- 프리셋 이름을 바꾸면 그 프리셋을 기록한 모든 이슈의 카드가 즉시 새 이름을 말한다.
  이름을 복사하지 않은 대가이자 이유다.
- 개별 키를 손으로 고쳐도 출처는 그 프리셋으로 남고, 달라진 사실은 변경 개수가 말한다.
- 클라이언트의 투영 미러가 서버 `presetSettingsForIssue`와 갈라지면 카드가 거짓 개수를
  말한다. 두 규칙의 차이는 양쪽 테스트가 각각 못박는다.
