# Worker 완료 lane의 Codex·Claude 세션 작업 표시

## 배경

Worker 탭의 완료 lane은 Worker queue가 소유한 `queue.json.done`만 표시한다.
따라서 Worker가 직접 실행·머지·정리한 Bead는 남지만, 사용자가 Codex 또는
Claude 대화형 세션에서 동일한 workflow를 거쳐 완료한 Bead는 `closed`가 되어도
완료 이력에서 사라진다.

workflow completion report는 이미 Bead 댓글에 다음 두 출처를 구분해 기록한다.

- Worker 실행: `worker · attempt <id>`
- 대화형 Codex/Claude 실행: `session · sid <id>`

beads-ui는 이 문법을 `app/utils/report-marker.js`에서 소비하고 있으므로, 새로운
출처 키나 토큰 계약을 만들지 않고 기존 보고서를 완료 이력의 근거로 재사용한다.

## 목표

- Worker가 완료한 작업과 Codex/Claude workflow 세션이 완료한 작업을 같은 완료
  lane에서 최신순으로 표시한다.
- 대화형 세션 행은 `세션 작업`이라고 명시한다.
- Worker와 세션 양쪽에서 관측되는 같은 Bead는 한 번만 표시한다.
- 세션 토큰을 신뢰성 있게 수집할 수 없으면 토큰·비용을 표시하지 않는다.
- PR Delivery의 `resolved`는 완료로 간주하지 않고, 머지·정리 후 `closed`가 된
  Bead만 추가한다.

## 비목표

- Codex와 Claude provider를 완료 행에서 서로 구분하지 않는다.
- 대화형 세션의 토큰·비용을 새로 수집하거나 추정하지 않는다.
- workflow completion report 문법이나 durable metadata 계약을 변경하지 않는다.
- PR 대기 lane, Monitor lane, Worker scheduler의 상태 전이는 변경하지 않는다.

## 설계

### 1. Worker 전용 closed 구독

Worker 화면이 활성화될 때 `tab:worker:closed` client id로 기존
`closed-issues` list adapter를 구독한다. Board의 closed store와는 별도 client id를
사용해 탭 전환 시 서로의 store 수명을 건드리지 않는다.

구독의 `params.since`는 Worker 완료 lane의 기존 `오늘 / 최근 7일 / 최근 30일 /
전체` 선택과 동일하게 계산한다. 기간이 바뀌면 기존 Worker closed 구독을 해제한
뒤 새 범위로 다시 구독한다. 클라이언트도 `closed_at`으로 같은 범위를 한 번 더
적용해 재구독 응답 사이의 stale snapshot을 노출하지 않는다.

### 2. 세션 보고서 확인

closed issue 중 `comment_count > 0`인 항목만 기존 `get-comments` 요청으로 읽는다.
각 댓글은 기존 `parseReport()`로 해석하며, 유효한 보고서 중 `lane === 'session'`인
보고서가 하나 이상 있는 Bead만 세션 완료 행 후보가 된다. 일반 댓글,
`worker · attempt`, 깨진 marker는 후보가 아니다.

댓글 조회 결과는 다음 identity로 메모리 캐시한다.

```text
<workspace> + <bead id> + <updated_at> + <comment_count>
```

같은 issue snapshot에서는 다시 요청하지 않는다. workspace 또는 issue 갱신 identity가
바뀌면 새 조회를 허용한다. 조회 실패는 negative completion으로 확정하지 않고 현재
render에서만 생략해 다음 snapshot 갱신 뒤 재시도할 수 있게 한다.

### 3. 완료 행 합성

기존 Worker `done` 행을 먼저 만든 뒤 세션 완료 후보를 합친다.

- `q.done`에 같은 Bead id가 있으면 Worker 행만 유지한다.
- 세션 행의 `done_at`은 보고서 작성 시각이 아니라 Bead의 `closed_at`을 쓴다.
- 세션 행의 title·created_at·updated_at은 closed issue snapshot을 쓴다.
- 세션 행은 기존 badge 스타일로 `세션 작업`을 표시한다.
- 세션 행의 `usage`는 `null`이며 토큰·비용 배지를 렌더하지 않는다.
- 합친 행 전체를 `done_at` 내림차순으로 정렬한다.

Worker 토큰 합계는 현재처럼 usage가 있는 완료 행만 합산한다. 따라서 세션 행이
추가되어도 Worker가 보고한 토큰 합계의 모집단과 산식은 바뀌지 않는다.

### 4. 오류와 호환성

- `closed-issues` 구독이 아직 없거나 실패하면 기존 Worker 완료 행만 보인다.
- `get-comments` 실패, 빈 댓글, 알 수 없는 보고서 문법은 fail-quiet로 생략한다.
- 구버전 issue snapshot에 `comment_count` 또는 `closed_at`이 없으면 세션 행을
  만들지 않는다.
- 기존 `queue.json`, worker snapshot protocol, completion report 계약에는 새 durable
  필드를 추가하지 않는다.

## Test scope

### RED seam

1. Worker view가 `session · sid` 보고서가 있는 closed issue를 `세션 작업` 배지와
   `closed_at` 완료 시각으로 렌더한다.
2. `worker · attempt`, 일반 댓글, 문법 오류 보고서는 세션 완료 행을 만들지 않는다.
3. 같은 Bead가 `q.done`과 session report 양쪽에 있으면 Worker 행 하나만 남는다.
4. 세션 행에는 토큰·비용 배지가 없고 기존 Worker 완료 토큰 합계는 유지된다.
5. 완료 기간 변경은 `tab:worker:closed`를 새 `since`로 재구독한다.

### 회귀 검증

- 기존 Worker 완료 최신순 정렬과 기간 필터
- Worker 완료 행 provider별 토큰·비용 표시와 toolbar 합계
- Board/Worker 탭 전환 시 각 탭의 list subscription 격리
- workspace 전환·reconnect 후 Worker closed 구독 복구

## 완료 기준

- 오늘 완료한 Codex/Claude workflow Bead가 Worker 완료 lane에 `세션 작업`으로
  나타난다.
- 아직 `resolved`인 Bead는 완료 lane에 나타나지 않는다.
- 동일 Bead의 Worker/세션 중복이 없고, 세션 행에 추정 토큰이 표시되지 않는다.
- `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
  `npm run build`가 통과하고 생성 bundle이 함께 갱신된다.
