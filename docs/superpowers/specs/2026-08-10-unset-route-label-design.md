# 미핀 route의 `unset` 라벨 표시 설계

- Bead: `UI-76uc`
- Route: `spec_backed`

## 목적

`metadata.route`가 명시되지 않은 이슈를 `spec_backed ?` 또는
`full_plan ?`처럼 확정 경로와 비슷하게 표시하지 않는다. 사용자가 route가 아직
핀되지 않았다는 사실을 즉시 알 수 있도록 해당 라벨을 `unset`으로 표시한다.

## 현행 동작

서버의 `deriveRoute()`는 유효한 `metadata.route`가 없으면 `plan_path` 유무에 따라
`full_plan` 또는 `spec_backed`를 내부 fallback으로 만든다. `route_source`는 이
값을 `derived`로 구분하지만, 보드와 워커 카드는 fallback 값 뒤에 `?`만 붙이고
상세 패널은 `? (추론)`을 붙여 표시한다.

이 fallback은 workflow 스텝퍼 구성과 기존 artifact 표시를 유지하는 데 쓰인다.
반면 worker 자동실행 admission은 명시적으로 핀된 route만 허용하므로, fallback을
사용자에게 route 결정처럼 노출할 필요는 없다.

## 선택한 설계

표시 계층에서 `route_source === 'derived'`인 route의 라벨을 항상 `unset`으로
변환한다.

- 명시적 `spec_backed`와 `full_plan`은 기존 문자열을 그대로 표시한다.
- route가 없거나 유효하지 않으면 `plan_path` 유무와 관계없이 `unset`을 표시한다.
- 보드 카드와 워커 후보 카드의 흐린 점선 스타일은 미핀 상태의 시각적 단서로
  유지하되 `?` 접미사는 제거한다.
- 상세 패널의 workflow 읽기 행은 `unset`을 표시하고 title도 추론값이 아니라
  metadata 미핀 상태를 설명한다.
- 상세 패널 route 편집기의 빈 옵션은 `(unset)`으로 표시한다.
- 서버의 `deriveRoute()`, `workflow.route`, 단계 계산, 스텝퍼 셀 구성은 변경하지
  않는다.

모니터의 실행가능 카드는 worker admission을 통과한 명시적 route만 소비하므로
변경 대상이 아니다.

## 대안

1. 서버 응답에서 미핀 route를 `null`로 만들고 별도 `inferred_route`를 추가하는
   방법은 의미가 엄밀하지만 모든 workflow 소비자와 타입을 바꿔야 한다.
2. route fallback 자체를 제거하는 방법은 plan 단계와 artifact 표시까지 바꾸므로
   이번 표시 개선의 범위를 넘는다.

## 오류 처리와 호환성

새로운 저장값이나 route enum을 추가하지 않는다. 알 수 없는 route metadata도
서버가 현재처럼 `derived`로 정규화하므로 UI는 `unset`으로 조용히 표시한다.
기존 Bead metadata, worker admission, WebSocket mutation 계약은 영향을 받지 않는다.

## Test scope

- `app/views/board/card.test.js`: derived route 칩이 `unset`이고 명시적 route는 기존
  값을 유지하는지 검증한다.
- `app/views/worker/index.test.js`: derived route 후보 카드가 `unset`을 표시하면서
  기존 spec-backed 스텝퍼 구조를 유지하는지 검증한다.
- `app/views/detail-panel/index.test.js`: 미핀 route 읽기 행과 편집기의 빈 옵션이
  `unset`을 표시하는지 검증한다.
- `server/workflow-enrich.test.js`: 내부 fallback과 `route_source=derived` 계약이
  그대로 유지되는 기존 검증을 통과해야 한다.
- 전체 `tsc`, 테스트, lint, prettier, frontend build를 실행하고 생성 bundle을
  포함한다.

## 완료 기준

1. route가 명시되지 않은 해당 UI 표면에 `spec_backed ?`, `full_plan ?`,
   `? (추론)`이 더 이상 나타나지 않는다.
2. 대신 `unset`이 표시된다.
3. 명시적 route와 내부 workflow 단계 계산은 변하지 않는다.
4. frontend bundle과 source가 일치하고 전체 사전 인계 검증을 통과한다.
