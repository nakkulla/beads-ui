# PR 대기 카드 검증·배포 진행 상태 설계 (UI-20gk)

## 배경

PR 대기 카드에서 머지가 끝난 뒤 검증·배포가 실행 중이어도 현재 화면은
`머지됨`과 비활성 `머지` 버튼만 남긴다. 사용자는 작업이 정상 진행 중인지,
대기 중인지, 실패했는지 구분할 수 없다.

원인은 진행 사실이 서로 다른 두 표면에 나뉘어 있기 때문이다.

- 카드가 읽는 `pr_activity.merge_progress`는 프로세스 메모리에만 있고 저장되지
  않는다. 배포가 별도 operation으로 넘어가거나 서버가 재시작되면 사라진다.
- `pr_wait.cleanup_cursor`, `merge_sha`, `repo_operations`에는 재시작 뒤에도 남는
  사실이 있지만 Worker와 Monitor의 PR 대기 카드는 이를 결합하지 않는다.
- 서버의 `repo_operations` 한 단계를 화면도 그대로 `저장소 작업`이라고 표시해
  실제 작업인 `검증`과 `배포`를 구분하지 못한다.

이 변경은 이미 공개된 데이터를 프런트엔드에서 정확히 투영하는 소비자 변경이다.
workflow 계약, repo-ops 설정 형식, 서버 operation 상태 전이는 바꾸지 않는다.

## 목표

- 머지 후 현재 작업을 `검증` 또는 `배포`라는 실제 이름으로 표시한다.
- 모든 저장소에서 같은 7개 의미 위치를 사용해 `배포 중 4/7`처럼 읽히게 한다.
- 검증이나 배포 선언이 없는 저장소도 다음 단계의 번호를 다시 매기지 않는다.
- 서버 재시작 뒤에도 durable cursor와 operation journal로 진행 상태를 복원한다.
- Worker와 Monitor가 같은 문구, 단계 번호, 진행률을 사용한다.
- 이미 머지된 행에서 의미 없는 `머지` 버튼과 진행 중 충돌 동작을 제거한다.

## 제외 범위

- `repo-ops/config.toml` 또는 workflow 계약의 키·상태·자동화 의미 변경
- 검증·배포 operation 생성, 재시도, 자동 해결, 배포 실행 로직 변경
- 서버 프로토콜 또는 queue 저장 형식 변경
- 카드 안에 전체 단계 목록이나 생략된 단계 목록 추가
- 새 색상, 새 애니메이션, 별도 진행 컴포넌트 도입
- 과거 operation 전체를 PR 대기 카드에 나열하는 기능

## 고정 표시 수명주기

카드의 진행 분모는 실행된 작업 수가 아니라 PR 완료 수명주기의 고정 의미 위치다.
항상 다음 7개 위치를 사용한다.

| 위치 | 표시 이름 | 서버 사실 |
| ---: | --- | --- |
| 1/7 | 머지 | `merge_progress=merging` |
| 2/7 | base | `base_containment` |
| 3/7 | 검증 | exact subject의 `kind=verify` operation |
| 4/7 | 배포 | exact subject의 `kind=deploy` operation |
| 5/7 | 자식 | `child_sweep` |
| 6/7 | 브랜치 | `branch_cleanup` |
| 7/7 | close | `parent_close` |

검증·배포 선언은 선택 사항이지만 위치는 선택 사항이 아니다. 따라서 다음 세 경우가
모두 같은 번호 체계를 쓴다.

- 검증과 배포가 모두 있으면 배포는 `4/7`이다.
- 배포만 있어도 배포는 `4/7`이다.
- 저장소 작업 선언이 없으면 자식 정리는 `5/7`이다.

생략된 단계는 카드에 따로 쓰지 않고 다음 관측 단계로 조용히 이동한다. `3/6`처럼
분모나 뒤 단계 번호를 다시 계산하지 않는다.

## 승인된 카드 표현

### 정상 진행

- 기존 카드의 초록색 왼쪽·아래쪽 progress rail을 그대로 사용한다.
- 카드 오른쪽 상태는 현재 작업 하나만 `배포 중 4/7`처럼 표시한다.
- `머지됨` 사실은 기존 배지로 유지한다.
- 카드 안에는 7개 단계 목록, `검증 생략`, `배포 선언 없음` 같은 부가 목록을
  넣지 않는다.
- 기존 `worker-mini--merging`, `merge-step` 계열의 색상·타이포그래피·움직임을
  재사용하고 새 테마 토큰을 만들지 않는다.

### 실패

- 실패 문구가 진행 문구보다 우선한다.
- exact operation을 식별할 수 있으면 `검증 실패 3/7` 또는 `배포 실패 4/7`로
  표시한다.
- 상세 원인과 재시도·자동 해결 동작은 기존 저장소 작업 타임라인이 계속 담당한다.
  전체 스텝퍼는 실패 상세에서만 허용한다.
- operation kind를 증명할 수 없으면 기존 `저장소 작업`/`정리 미완` 표현으로
  조용히 폴백하고 임의의 단계 번호를 붙이지 않는다.

### 동작

- `gate.tier === 'merged'`인 행에는 실행 중·실패 여부와 관계없이 `머지` 버튼을
  렌더하지 않는다. 이미 완료된 동작을 비활성 버튼으로 남기지 않는다.
- 검증·배포 또는 후속 정리가 진행 중이면 `discardProjection`에 cleanup active
  사실을 전달해 충돌하는 버리기 동작을 막는다.
- 실패 뒤 기존 정리·해결 버튼은 현재 계약과 허용 범위를 그대로 유지한다.

## 데이터 결합

### 입력

공유 projection은 현재 snapshot에 이미 있는 값만 받는다.

- PR 행: `bead_id`, `merge_sha`, `cleanup_cursor`
- 일시 활동: `pr_activity.merge_progress`
- 실패: `cleanup_failed`
- 저장소 작업 journal의 public card 배열: `repo_operations`

서버 필드나 새로운 파생 필드를 추가하지 않는다.

### operation subject 결속

operation은 다음 조건을 모두 만족할 때만 현재 카드의 근거로 쓴다.

1. `kind`가 `verify` 또는 `deploy`다.
2. `subjects`에 현재 행의 `bead_id`와 정확히 같은 항목이 있다.
3. 같은 subject의 `merged_sha`가 현재 행의 `merge_sha`와 정확히 같다.
4. `superseded_by`가 비어 있다.

`merge_sha`가 없거나 형식이 불완전하면 operation을 결속하지 않는다. 같은 Bead의
과거 merge SHA, 다른 Bead가 공유한 최신 operation, superseded failure는 모두
무시한다. 이는 저장소 전체의 가장 최근 operation을 잘못 붙이는 것을 막는 핵심
불변조건이다.

여러 후보가 남으면 먼저 현재 단계와 양립하는 후보만 남긴다. `cleanup_cursor` 또는
일시 활동이 `repo_operations`일 때만 검증·배포 후보를 사용하고, 후속 cursor가 이미
`child_sweep` 이후라면 과거 succeeded operation을 다시 표시하지 않는다. 후보 안에서는
고정 위치가 더 뒤인 deploy를 먼저 고르고, 같은 kind에서는 활성·실패 상태를 완료
상태보다 우선한 뒤 `requested_at`, 마지막으로 public card의 `operation_id` 순서로
결정한다.

### 우선순위

공유 projection은 다음 순서로 하나의 카드 상태를 결정한다.

1. `cleanup_failed`
2. 현재 단계와 결속된 exact repo operation
3. `pr_activity.merge_progress`
4. durable `cleanup_cursor`
5. 기존의 일반 `머지됨` 폴백

1번이 `repo_operations` 실패일 때는 2번과 같은 exact subject 결속을 보조 근거로
사용해 실패 이름만 `검증` 또는 `배포`로 구체화한다. 실패 자체의 근거는 계속
`cleanup_failed`이며, exact operation이 없다고 실패를 숨기지 않는다.

단, 2번의 succeeded operation은 cursor가 아직 `repo_operations`에 머물러 있을 때만
표시한다. cursor가 다음 단계로 이동했다면 4번의 더 최신 사실이 이긴다. 이 규칙으로
프로세스 재시작 후에는 cursor가 진행 위치를 복원하고, 실행 중에는 exact operation이
검증과 배포를 구체화한다.

### operation 상태 문구

단계 이름과 고정 위치에 아래 상태 접미사를 결합한다.

| operation state | 예시 |
| --- | --- |
| `queued` | `배포 대기 4/7` |
| `running` | `배포 중 4/7` |
| `retry_pending` | `배포 재시도 대기 4/7` |
| `repairing` | `배포 자동 해결 중 4/7` |
| `failed` | `배포 실패 4/7` |
| `succeeded` + cursor 대기 | `배포 완료 · 정리 재개 대기 4/7` |

알 수 없는 state, 잘못된 subject, 불완전한 operation은 예외를 던지지 않고 무시한다.

## 프런트엔드 구조

### 공유 pure projection

새 `app/views/worker/pr-wait-progress.js`가 데이터 결합과 표현용 상태를 소유한다.
DOM이나 store를 직접 읽지 않는 pure function으로 만들고 대략 다음 결과를 반환한다.

```js
{
  step: 'deploy',
  label: '배포 중',
  index: 4,
  total: 7,
  percent: 57,
  active: true,
  failed: false
}
```

근거가 없으면 `null`을 반환해 현재의 일반 표시로 폴백한다. Worker와 Monitor는 이
결과를 그대로 소비하며 자체 문구나 번호를 다시 계산하지 않는다.

### 단계 어휘

`app/views/worker/merge-steps.js`는 두 종류의 어휘를 분리한다.

- 카드 표시용 고정 7단계: `merge`, `base`, `verify`, `deploy`, `child`, `branch`,
  `close`
- 서버 cursor 소비용 기존 어휘: `base_containment`, `repo_operations`,
  `child_sweep`, `branch_cleanup`, `parent_close`

기존 `cleanupStepperView`가 소비하는 서버 cursor 순서는 별도로 보존한다.
`repo_operations`를 무조건 검증 또는 배포라고 바꾸지 않고 exact operation이 있을 때만
세분화한다.

### 소비자

- `app/views/worker/index.js`: `pr_wait` entry의 `merge_sha`, `cleanup_cursor`와
  `repo_operations`를 shared projection에 전달하고 카드 rail·상태·동작을 렌더한다.
- `app/views/monitor/lanes.js`: 같은 projection을 사용해 Worker와 동일한 문구·번호를
  표시한다.
- `app/views/worker/repo-ops-timeline.js`: 기존 실패 상세, operation action, 로그를
  변경 없이 유지한다.
- `app/styles.css`: 기존 토큰과 modifier를 재사용하고 필요한 selector만 최소 조정한다.
- `app/main.bundle.js`, `app/main.bundle.js.map`: frontend build 산출물로 갱신한다.

## 오류·경계 처리

- `repo_operations`가 배열이 아니거나 operation 필드가 누락돼도 렌더를
  중단하지 않는다.
- `subjects`가 없거나 현재 `bead_id`·`merge_sha`를 동시에 증명하지 못하면 해당
  operation을 무시한다.
- 알 수 없는 cursor는 원문을 새 단계로 추측하지 않고 기존 fail-quiet 표시를 쓴다.
- `cleanup_failed`와 활성 operation이 동시에 보이면 실패를 우선해 사용자가 해결
  필요 상태를 놓치지 않게 한다.
- Worker와 Monitor 중 한쪽 입력이 일시적으로 덜 완전해도 shared projection의 같은
  폴백 규칙을 적용한다.

## Test scope

승인된 RED-GREEN seam은 프런트엔드 projection과 두 소비자에 한정한다.

### 단계·projection

- 고정 단계가 `머지, base, 검증, 배포, 자식, 브랜치, close` 순서와 `1/7`~`7/7`
  위치·진행률을 반환한다.
- 검증+배포, 배포만, 저장소 작업 없음 모두 뒤 단계 번호를 재계산하지 않는다.
- `bead_id`와 `merge_sha`가 모두 같은 operation만 결속한다.
- 다른 Bead, 과거 merge SHA, superseded operation을 무시한다.
- verify/deploy의 `queued`, `running`, `retry_pending`, `repairing`, `failed`,
  `succeeded` 문구를 각각 반환한다.
- `cleanup_cursor`로 서버 재시작 뒤 base·자식·브랜치·close 위치를 복원한다.
- 후속 cursor가 과거 succeeded operation보다 우선한다.
- 알 수 없거나 불완전한 입력은 throw 없이 `null` 또는 일반 폴백을 반환한다.

### Worker·Monitor

- 같은 snapshot에서 두 화면이 정확히 같은 작업명, `n/7`, 진행률을 렌더한다.
- 활성 검증·배포에서 기존 초록 rail과 상태 문구를 렌더한다.
- merged 행에는 비활성 `머지` 버튼을 렌더하지 않는다.
- cleanup active 동안 버리기 동작이 차단되고, 실패 뒤 허용된 기존 해결 동작은
  유지된다.
- `cleanup_failed`가 exact verify/deploy failure와 결속되면 각각
  `검증 실패 3/7`, `배포 실패 4/7`을 표시한다.
- exact operation이 없으면 기존 일반 정리 실패 표현으로 폴백한다.

### 회귀 검증

- 기존 cleanup cursor stepper와 repo-ops 타임라인 action을 유지한다.
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write` 후 exact-path diff 확인
- `npm run build` 및 `app/main.bundle.js`, `app/main.bundle.js.map` 갱신

## 수용 기준

1. 배포가 running이면 PR 대기 카드가 `머지됨`과 `배포 중 4/7`을 함께 보여준다.
2. queued·재시도 대기·자동 해결·실패를 정상 진행과 명확히 구분한다.
3. 검증·배포 선언 유무와 관계없이 7단계 의미 위치가 유지된다.
4. 서버 재시작 뒤에도 `cleanup_cursor`와 exact operation으로 현재 진행을 복원한다.
5. 관련 없는 operation을 현재 카드에 붙이지 않는다.
6. Worker와 Monitor의 문구·번호·진행률이 일치한다.
7. 이미 머지된 행의 비활성 `머지` 버튼이 사라지고 진행 중 충돌 동작이 차단된다.
8. 카드에는 현재 작업만 남고 전체 단계 목록은 실패 상세 밖에 표시하지 않는다.
9. Pre-Handoff 검증과 정적 번들 생성이 모두 통과한다.
