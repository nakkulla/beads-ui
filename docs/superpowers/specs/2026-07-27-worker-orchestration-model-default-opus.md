# 워커 orchestration_model 하드코딩 기본값 opus (UI-kzxz)

## 목적

워커 dispatch가 아무 설정 없이도 opus로 실행되게 한다. 현재는 bead
metadata와 워크스페이스 전역 `exec_defaults`가 모두 비어 있으면
`orchestration_model`이 unset으로 귀결하고, `claude.js buildArgv`가
`--model` 플래그를 생략해 claude CLI 자체 기본 모델로 실행된다. 이 최종
폴백 계층을 `opus`로 고정한다.

## 해석 순서 (변경)

`worker-global-exec-defaults` §해석 순서의 3계층은 유지하되,
`orchestration_model`의 최종 폴백만 바꾼다.

- 변경 전: bead metadata > 워크스페이스 전역 > **미설정**
- 변경 후: bead metadata > 워크스페이스 전역 > **`opus`**

상위 계층 값이 enum 밖이면 다음 계층으로 흘러내리는 기존 규칙은 그대로다.
따라서 두 계층 모두 부재이거나 비enum이면 `opus`로 귀결하고,
`orchestration_model`은 더 이상 `undefined`를 반환하지 않는다.

나머지 3키(`orchestration_effort` / `review_model` / `impl_model`)의 폴백은
변경하지 않는다.

## 스탬핑 (변경 없음)

하드코딩 폴백에서 온 값은 `stamped_keys`에 넣지 않는다. 스탬핑은 "전역
기본값에서 왔으므로 dispatch 시점 값을 bead metadata에 durable하게 남기고
종료 시 원복"하는 계약인데, 하드코딩 폴백은 항상 같은 값이라 남길 정보가
없고, 모든 bead metadata를 오염시키며, 스탬핑 실패가 dispatch 실패로
번지는 표면만 늘린다. 즉 `stamped_keys`는 지금처럼 "bead 미설정 + 전역
설정됨"일 때만 `orchestration_model`을 포함한다.

## 변경 사항

1. `server/worker/policy.js` — `resolveExecSettings`의
   `orchestration_model` 해석에 최종 폴백 `'opus'`를 적용한다. 폴백 적용은
   `stamped_keys`를 건드리지 않는다. 나머지 3키는 `pickLayered` 그대로.
2. `app/views/detail-panel/exec-settings.js` —
   `DEFAULT_LABELS.orchestration_model`을 `'(기본: opus)'`로 바꾸고, 해당
   블록의 MIRROR 주석을 새 폴백에 맞게 정정한다. `defaultLabelFor`는
   그대로이므로 전역 override가 있으면 `(기본: <값> — 전역)`가 계속
   우선한다.
3. frontend 번들 재생성 — 2번은 frontend source 변경이므로
   `npm run build`로 `app/main.bundle.js`와 `app/main.bundle.js.map`을
   재생성해 같은 커밋에 포함한다(AGENTS.md Pre-Handoff Validation). static
   기본 모드로 뜬 서버가 옛 라벨을 계속 내보내지 않게 하는 필수 단계다.
4. 최종 결과를 `unset`으로 서술하는 active contract 주석 정정 —
   `server/worker/scheduler.js`의 `resolveExecSettings` 호출부 주석,
   `server/worker/queue-store.js`의 `exec_defaults` 정규화 주석,
   `app/views/worker/exec-defaults-dialog.js`의 해석 순서 주석. 세 곳 모두
   `orchestration_model`만 `opus`로 귀결하고 나머지 3키는 여전히 unset임을
   구분해 적는다.
5. 선행 스펙 supersession 포인터 —
   `docs/superpowers/specs/2026-07-23-worker-global-exec-defaults.md`는
   §해석 순서("나머지 키는 미설정")와 §수용 기준의 "model unset으로
   귀결(claude 기본 모델 경로)" 항목 두 곳,
   `docs/superpowers/specs/2026-07-24-worker-view-mobile-session-id-defaults.md`는
   `orchestration_model` 라벨을 `(기본: CLI 기본 모델)`로 못박은 라벨 표
   행에 각각 이 스펙으로의 포인터를 단다. 원본 본문은 당시 계약 기록이므로
   재작성하지 않고 포인터만 추가한다.

## 수용 기준

- bead metadata·전역 `exec_defaults` 둘 다 없는 상태에서 dispatch하면
  `exec.orchestration_model === 'opus'`이고 `stamped_keys`에
  `orchestration_model`이 없다.
- 전역 `exec_defaults.orchestration_model = 'sonnet'`이면 `sonnet`이
  채택되고 `stamped_keys`에 `orchestration_model`이 포함된다(기존 동작).
- bead metadata `orchestration_model = 'haiku'`이면 전역·폴백과 무관하게
  `haiku`이고 스탬핑 없음(기존 동작).
- 전역 값이 비enum(예: `'gpt-5.6'`)이면 `opus`로 귀결하고 스탬핑 없음.
- 실제 dispatch 경로에서도 같다: 아무 설정 없는 bead를 큐에 넣고 tick하면
  runner에 전달되는 세션 settings의 `model`과 attempt record의 `model`이
  모두 `opus`이고, `exec_stamped_keys`에 `orchestration_model`이 없으며
  `orchestration_model` metadata 스탬핑 호출이 발생하지 않는다.
- 전역 override가 없는 bead 상세 패널과 ⚙ 전역 실행 설정 다이얼로그의
  `orchestration_model` unset 옵션 라벨이 `(기본: opus)`로 표시된다.
- `npm run build` 후 `app/main.bundle.js`가 새 라벨을 포함한다.

## 비-목표

- `orchestration_effort` / `review_model` / `impl_model`의 폴백 변경.
- 워크스페이스별 `exec_defaults` 데이터 마이그레이션(기존에 저장된 값은
  그대로 상위 계층으로 계속 우선한다).
- claude CLI 모델 별칭 카탈로그(`MODELS`) 변경.

## 테스트 범위

- `server/worker/policy.test.js` — 폴백 귀결(빈 입력 / 비enum 전역),
  폴백이 `stamped_keys`를 오염시키지 않음, 기존 계층 우선순위 회귀.
  기존의 `orchestration_model === undefined` 기대는 `'opus'`로 갱신한다.
- `server/worker/scheduler.test.js` — dispatch 경로 회귀. 특히 기존
  `a retired codex model in the globals resolves to UNSET` 테스트는 비enum
  전역 값이 이제 `opus`로 귀결하므로 spawn settings·attempt record의
  `model` 기대값과 테스트 이름을 갱신하고, 스탬핑이 여전히 없음을 유지
  검증한다.
- `app/views/detail-panel/exec-settings.test.js` — unset 옵션 라벨.
- `app/views/worker/index.test.js` — ⚙ 다이얼로그 unset 옵션 라벨.
- 전체 게이트: `npm run tsc`, `npm test`, `npm run lint`,
  `npm run prettier:write`, `npm run build`.
