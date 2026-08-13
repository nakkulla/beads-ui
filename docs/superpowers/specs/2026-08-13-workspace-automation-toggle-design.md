# 워크스페이스 자동화 토글의 자동 진행·자동 머지 원자적 정합

- Bead: `UI-7l3j`
- Route: `spec_backed`
- 날짜: 2026-08-13

## 1. 배경과 원인

Worker의 `자동 진행`과 Monitor 레포별 `진행` 버튼은 현재
`worker-queue-toggle`을 보내 `auto_advance`만 바꾼다. `auto_merge`는 별도
`worker-merge-auto-toggle`에서만 바뀐다. 반면 Monitor 상단 `전체 자동화`는 두
플래그를 함께 바꾸므로, 사용자가 "자동화"라고 이해하는 제어가 화면에 따라 다른
상태 전이를 만든다.

이 분리는 세션 시작과 머지가 서로 다른 위험을 가진다는 이전 설계의 결과다. 새
요구사항은 위험 경계를 없애는 것이 아니라, **사용자가 자동화를 명시적으로
켜거나 끄는 순간에만** 두 축을 같은 값으로 맞추는 것이다. 그 뒤의
`자동 머지` 토글은 계속 독립 제어로 남는다.

## 2. 목표

Worker와 Monitor의 워크스페이스 단위 자동화 버튼이 다음 전이를 수행한다.

| 클릭 전 | 자동화 클릭 | 클릭 직후 | 이후 허용 |
| --- | --- | --- | --- |
| `auto_advance=false`, `auto_merge=*` | ON | 둘 다 `true` | `auto_merge`만 독립적으로 OFF 가능 |
| `auto_advance=true`, `auto_merge=*` | OFF | 둘 다 `false` | `auto_merge`만 독립적으로 ON 가능 |

두 플래그와 OFF 시 머지 대기열 정리는 한 워크스페이스의 단일 CAS mutation으로
저장한다. 중간 실패로 `auto_advance`만 바뀌거나 `auto_merge`만 바뀌는 상태를
만들지 않는다.

## 3. 범위와 비범위

### 범위

- Worker 툴바의 `자동 진행` 버튼을 워크스페이스 `자동화` 버튼으로 변경한다.
- Monitor 레포별 `진행` 버튼을 워크스페이스 `자동화` 버튼으로 변경한다.
- 새 `worker-automation-toggle` WebSocket mutation을 추가한다.
- queue store에 두 플래그를 함께 바꾸는 원자적 mutation을 추가한다.
- Monitor 상단 `전체 자동화`가 같은 store mutation을 레포별로 재사용하게 한다.
- frontend source 변경 후 canonical build로 `app/main.bundle.js`와 source map을
  갱신한다.

### 비범위

- 독립 `자동 머지` 버튼과 `worker-merge-auto-toggle`을 제거하거나 의미를 바꾸지
  않는다.
- 자동화 OFF가 이미 실행 중인 세션을 중단하지 않는다.
- 자동화 OFF가 이미 active인 머지 또는 실행 중인 conflict resolver를 취소하지
  않는다.
- 자동화 실패 정책, 슬롯, PR gate, merge eligibility, 외부 PR 관측 계약은 바꾸지
  않는다.
- dotfiles workflow 계약의 metadata·label·status 어휘는 바꾸지 않는다.

## 4. canonical 소유권과 소비자

- 상태 스키마와 mutation의 canonical 소유자:
  `server/worker/queue-store.js`
- 단일 워크스페이스 mutation·후속 효과 소비자:
  `server/ws/worker-handlers.js`, `server/ws/connection.js`
- 전체 visible workspace 소비자:
  `server/ws/monitor-handlers.js`
- 클라이언트 protocol 선언:
  `app/protocol.js`
- UI 소비자:
  `app/views/worker/index.js`, `app/views/monitor/index.js`,
  `app/views/monitor/lanes.js`
- runtime/generated copy:
  `app/main.bundle.js`, `app/main.bundle.js.map`
- checker/test 표면:
  queue-store, worker WebSocket, monitor master, Worker UI, Monitor UI와 protocol 테스트

기존 `worker-queue-toggle`은 단일 `auto_advance` mutation의 호환 표면으로 유지하되,
두 UI의 자동화 버튼은 더 이상 이를 호출하지 않는다.

## 5. 서버 설계

### 5.1 원자적 store mutation

queue store에 워크스페이스와 `expected_revision`, `on`, active merge 보존 ID를 받는
통합 mutation을 추가한다.

한 `applyMutation` 안에서 다음을 수행한다.

1. `auto_advance = on`
2. `auto_merge = on`
3. `on === false`이면 ordinary waiting merge entry를 제거한다.
4. active merge entry와 durable resolution journal entry는 기존
   `toggleAutoMerge(..., clear_waiting=true)` 규칙과 동일하게 보존한다.

성공 시 revision은 한 번만 증가한다. CAS conflict이면 두 플래그와 대기열 어느
것도 바뀌지 않는다.

### 5.2 `worker-automation-toggle`

새 WebSocket 메시지는 `{ root_dir, expected_revision, on }`을 받는다. 응답의
`applied`, `conflict`, `queue` 형식은 기존 queue mutation과 맞춘다.

- ON 성공: 최신 queue를 먼저 응답·fanout한 뒤 세션 scheduler tick과 PR 관측을
  fire-and-forget으로 시작한다. 관측이 끝날 때 `auto_merge`를 다시 읽어 여전히
  ON인 경우에만 eligible PR을 등록한다. 관측 중 사용자가 독립 머지 토글로 OFF한
  뒤 머지가 등록되는 race를 만들지 않는다.
- OFF 성공: 최신 queue를 응답·fanout하고 새 scheduler tick이나 PR 관측을
  시작하지 않는다. 이미 실행 중인 세션·active merge·resolver는 기존 규칙대로
  완료를 계속한다.
- CAS conflict: 현재 decorated queue를 반환한다. Worker와 Monitor의 기존 1회
  bounded retry 규칙을 유지한다.

### 5.3 Monitor 상단 전체 자동화

`monitor-auto-toggle`은 visible workspace별로 원자적 store mutation을 한 번씩
호출한다. 여러 레포 전체를 하나의 transaction으로 묶지는 않는다. 한 레포의
실패가 다른 레포를 막지 않고 `failed[]`에 기록되는 기존 partial-failure 계약을
유지하되, 한 레포 내부에서는 반쪽 적용이 불가능해진다.

ON 성공 레포에는 단일 워크스페이스 handler와 같은 scheduler·자동 머지 후속
효과를 적용한다. OFF 성공 레포는 waiting merge queue 정리까지 같은 mutation에서
끝낸다.

## 6. 프론트엔드 설계

### 6.1 Worker

- `.worker-play` 클릭은 `worker-automation-toggle`을 보낸다.
- 현재 `auto_advance`를 버튼 ON/OFF 상태의 기준으로 유지한다. 독립
  `auto_merge` 변경은 자동화 버튼의 pressed 상태를 바꾸지 않는다.
- 문구는 OFF에서 `▶ 자동화`, ON에서 `⏸ 자동화 멈춤`으로 바꾼다.
- 독립 `.worker-merge-all`은 그대로 `worker-merge-auto-toggle`을 보낸다.

### 6.2 Monitor 레포별 제어

- 기존 진행 버튼은 `worker-automation-toggle`을 보낸다.
- 레포 헤더 label과 title을 `자동화`의 두 축 효과에 맞춘다.
- 옆의 독립 `머지` 버튼은 그대로 남고 `worker-merge-auto-toggle`을 보낸다.
- DOM class를 유지할 수 있지만 사용자에게 보이는 문구와 protocol expectation은
  새 의미를 따라야 한다.

### 6.3 Monitor 상단 전체 자동화

버튼의 visible repo 집계와 `both_on` 표시, OFF 확인 dialog는 유지한다. 모든
레포가 두 플래그 모두 ON일 때만 멈춤 상태로 표시하는 기존 규칙도 바꾸지 않는다.

## 7. 오류와 안전 경계

- 워크스페이스 단위 상태 저장은 all-or-nothing이다.
- 전체 자동화는 레포 간 partial success를 허용하고 실패 레포를 toast로 표시한다.
- 독립 자동 머지 OFF는 waiting entry를 비우고 active 작업은 보존한다.
- 자동화 OFF도 같은 머지 정리 규칙을 적용한다. Worker 단일 레포 버튼은 기존
  독립 자동 머지 OFF처럼 별도 확인 dialog를 추가하지 않는다.
- 자동화 ON의 PR 관측·등록 실패는 저장된 플래그를 되돌리지 않고 로그에 남긴다.
  다음 poll/reconcile이 durable ON 상태에서 이어갈 수 있어야 한다.

## 8. Test scope

아래 seam에 RED→GREEN 실행 권한을 둔다.

1. **queue store 통합 mutation**
   - ON이 두 플래그를 한 revision에서 `true`로 만든다.
   - OFF가 두 플래그를 `false`로 만들고 ordinary waiting entry를 제거한다.
   - OFF가 active entry와 resolution journal entry를 보존한다.
   - stale revision은 어떤 상태도 바꾸지 않는다.
2. **Worker WebSocket handler**
   - ON 응답에 두 플래그가 반영되고 scheduler tick·PR 관측·조건부 등록을 시작한다.
   - 관측 중 독립 머지 OFF가 일어나면 등록하지 않는다.
   - OFF는 waiting queue 정리 결과를 반환하고 ON 후속 효과를 시작하지 않는다.
   - CAS conflict는 현재 queue를 반환한다.
3. **Monitor master handler**
   - 레포마다 통합 mutation을 한 번 호출한다.
   - 한 레포 실패가 다른 레포 적용을 막지 않는다.
   - 레포 내부의 두 축 partial application expectation을 제거한다.
4. **Worker UI**
   - 자동화 버튼이 `worker-automation-toggle`을 정확한 revision과 함께 보낸다.
   - ON/OFF 문구가 새 의미를 표시한다.
   - 독립 자동 머지 버튼은 계속 `worker-merge-auto-toggle`을 보낸다.
5. **Monitor UI**
   - 레포별 자동화 버튼이 `worker-automation-toggle`을 보낸다.
   - label/title이 두 축 효과를 설명한다.
   - 독립 머지 버튼과 상단 전체 자동화 호출은 유지된다.
6. **protocol·generated artifact**
   - 새 message type이 protocol allowlist에 포함된다.
   - canonical frontend build가 bundle과 source map을 source와 정합시킨다.

## 9. 수용 기준

1. Worker에서 `▶ 자동화`를 누르면 같은 queue snapshot에서
   `auto_advance=true`, `auto_merge=true`가 관측된다.
2. Worker에서 `⏸ 자동화 멈춤`을 누르면 두 플래그가 `false`가 되고 waiting
   merge queue가 비워지며 active 작업은 보존된다.
3. Monitor 레포별 자동화 버튼도 동일한 전이를 수행한다.
4. 자동화 ON 뒤 독립 자동 머지 OFF, 자동화 OFF 뒤 독립 자동 머지 ON이 모두
   가능하다.
5. Monitor 상단 전체 자동화의 표시·확인·partial-failure 동작이 유지된다.
6. `npm run tsc`, `npm test`, `npm run lint`, `npm run prettier:write`,
   `npm run build`가 통과하고 생성 bundle이 커밋된다.
7. 머지 후 공유 서비스가 merged checkout에서 재시작되고 process path·port·HTTP
   응답 검증을 통과한다.

## 10. 기존 설계와의 관계

이 스펙은 `2026-08-05-worker-tab-cleanup-design.md`의 “자동 진행과 자동 머지를
별도 토글로 둔다”는 UI 구조 자체는 유지한다. 다만 자동화 버튼 클릭 순간에도
두 축을 절대 함께 켜지 않는다는 의미는 이 스펙이 대체한다.

`2026-07-28-pr-auto-merge-toggle-design.md`와 후속 자동 머지 복구 스펙의 durable
auto-merge, OFF 정리, active 작업 보존, 재관측·재등록 안전 규칙은 계속 유효하다.
