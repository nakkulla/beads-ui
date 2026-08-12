# 이슈 상세 후행 blocks 이슈 표시 설계

## 배경

현재 Board 카드와 이슈 상세의 `의존성` 영역은 해당 이슈가 기다리는 선행 이슈를
`dependencies` 칩으로 보여준다. 반대 방향, 즉 현재 이슈가 완료된 뒤 진행할 수 있는
후행 이슈는 CLI의 `bd dep list <id> --direction=up`에서는 조회할 수 있지만 상세 UI에는
노출되지 않는다. 사용자는 카드의 정보 밀도나 기존 선행 표시를 바꾸지 않고 이슈 상세에서
후행 작업을 확인하고 이동할 수 있어야 한다.

## 범위

- `beads-ui` 한 저장소만 변경한다.
- Board 카드와 Worker 카드에는 후행 이슈를 추가하지 않는다.
- 기존 상세 `의존성` 칩의 표시, 아이콘, 순서, 동작은 변경하지 않는다.
- 이슈 상세에서 현재 이슈에 `blocks`로 의존하는 후행 이슈만 표시한다.
- `related`, `parent-child`, `discovered-from` 역방향 관계는 후행 작업으로 표시하지 않는다.
- workflow 계약이나 Beads dependency 의미는 변경하지 않고 기존 CLI 의미를 소비한다.

## 설계

### 상세 데이터

`issue-detail` 구독의 `bd show` 호출에 `--include-dependents`를 추가한다. 현재 상세 조회가
사용하는 단일 CLI 호출에서 `dependencies`와 `dependents`를 함께 받고,
`normalizeIssueList`, WebSocket snapshot/upsert, client subscription store의 기존 임의 필드
전달 경로를 그대로 사용한다. 새 request type이나 별도 client store를 만들지 않는다.

UI는 `dependents` 배열에서 `dependency_type === "blocks"`인 항목만 선택한다. 필드가 없거나
배열이 아니면 빈 배열로 취급해 오래된 payload를 fail-quiet하게 표시한다. 표시 개수는
`dependent_count`가 아니라 필터 결과 길이로 계산한다. `dependent_count`에는 다른 관계
유형도 포함될 수 있기 때문이다.

### 상세 UI

기존 `의존성` 영역 바로 다음에 `후행 이슈` 영역을 추가한다. Board/Worker 카드에는 아무
표시도 추가하지 않는다.

- 각 항목은 아이콘 없는 클릭 가능한 ID 칩이다.
- 칩은 기존 `.detail-dep`와 상세 이동 동작을 재사용한다.
- 칩의 tooltip에는 가능한 경우 `status · title`을 넣는다.
- 배열 순서는 CLI가 반환한 순서를 유지한다.
- 항목이 없으면 `후행 이슈 없음`을 명시한다.
- 클릭하면 현재 의존성 칩과 동일하게 해당 이슈 상세로 이동한다.

새 색상 token, 카드 badge, 관계 방향 아이콘, 접기 상태는 추가하지 않는다.

### 갱신

상세 구독은 dependency edge만 바뀌고 현재 이슈의 `updated_at`이 그대로인 경우에도 후행
목록을 갱신해야 한다. subscription delta 비교에 `dependents`의 표시 관련 signature를
포함한다. signature는 각 항목의 `id`, `dependency_type`, `status`, `title`로 만들고 배열
순서를 보존한다. 이 값이 달라지면 상세 upsert를 발행한다. 다른 구독에서 `dependents`가
없으면 기존 timestamp 비교 동작을 유지한다.

### 오류 처리

- `bd show --include-dependents` 자체가 실패하면 기존 `issue-detail` 오류 흐름을 그대로
  사용하며 불완전한 상세 snapshot을 만들지 않는다.
- 정상 payload에 `dependents`가 없거나 형식이 다르면 기존 상세 정보는 렌더하고 후행
  영역은 빈 상태로 표시한다.
- 잘못된 dependent 항목은 ID를 정규화할 수 없으면 제외한다.

## Test scope

이 스펙이 승인하는 테스트 seam은 다음과 같다.

1. `server/list-adapters.test.js`
   - `issue-detail`이 `bd show <id> --include-dependents --json`으로 매핑된다.
   - 반환된 `dependents`가 정규화 뒤에도 보존된다.
2. `server/subscriptions.test.js`
   - 같은 `updated_at`에서 후행 blocks 항목의 ID·type·status·title이 바뀌면 upsert가
     발생한다.
   - `dependents`가 없는 일반 목록은 기존 timestamp 비교 결과를 유지한다.
3. `server/ws.list-subscriptions.test.js`
   - 상세 snapshot이 `dependents`를 client payload로 전달한다.
4. `app/views/detail-panel/index.test.js`
   - `blocks` 후행 항목만 ID 칩으로 표시한다.
   - 다른 역방향 관계는 표시하지 않는다.
   - 빈 상태가 `후행 이슈 없음`을 표시한다.
   - 칩 클릭이 해당 이슈 ID로 `onNavigate`를 호출한다.
   - 기존 선행 의존성 렌더 테스트가 그대로 통과한다.

구현 후 `npm run lint`, `npm run tsc`, `npm test`, `npm run prettier:write`,
`npm run build`를 실행하고 생성된 `app/main.bundle.js`와
`app/main.bundle.js.map`을 포함한다.

## 수용 기준

- 선행 `blocks` edge를 가진 이슈의 기존 카드와 상세 `의존성` 표시는 변경되지 않는다.
- 현재 이슈를 선행 조건으로 기다리는 `blocks` 이슈가 상세의 `후행 이슈` 영역에 보인다.
- 후행 칩을 누르면 해당 이슈 상세로 이동한다.
- `blocks`가 아닌 역방향 관계는 후행 목록에 나타나지 않는다.
- 후행 이슈가 없으면 상세에 `후행 이슈 없음`이 보인다.
- edge나 후행 이슈의 표시 필드가 바뀌면 열린 상세가 최신 목록으로 갱신된다.
- Board/Worker 카드 markup과 동작에는 후행 이슈 관련 변경이 없다.

## 비범위

- dependency 생성·삭제 UI
- dependency graph 또는 시각화
- 선행 의존성 표현 재설계
- 후행 이슈를 이용한 Worker 우선순위·자동 스케줄링 변경
- 다른 dependency type의 역방향 관계 표시
