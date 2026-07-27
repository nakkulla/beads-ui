# 워커 큐 구독 누수 수정 — workspace 전환 시 교차 workspace 스냅샷 표시 (UI-yjtv)

## 문제

workspace를 전환하면 이전 workspace의 worker-queue 구독이 서버에 잔류한다.
이후 이전 workspace의 큐 변화(fanout)가 같은 연결로 계속 push되고, 클라이언트
store는 last-snapshot-wins라서 다른 레포의 `pr_wait` 항목과 실패 배너가 현재
선택된 workspace의 Worker 화면에 표시된다. 관측 사례: TRACE-ICI 선택 상태에서
`dotfiles-nwr8` PR 대기 카드와 dotfiles 세션 실패 배너 표시.

## 근본 원인

1. 클라이언트는 `set-workspace` 완료 **후** `unsubscribe-worker-queue`를 보낸다
   (`app/main.js` `handleWorkspaceChange` → `clearAndResubscribe`).
2. 서버 `handleUnsubscribeWorkerQueue`는 구독자를 **현재 연결의 workspace 키**
   (`workspaceKeyOf(ws)`)의 집합에서만 찾는다
   (`server/ws/worker-handlers.js`). 이 시점 연결은 이미 새 workspace로 바뀌어
   있어 이전 workspace 집합의 항목은 제거되지 않는다 (`removed: false`인데
   호출자는 이를 확인하지 않음).
3. 소켓 close 훅(`detachWorkerQueue`)은 전체 `SUBSCRIBERS`를 sweep하므로
   새로고침 시에만 누수가 해소된다.

부수 결함: 재연결(`onConnection open`) 시 `worker_queue_unsub` 가드가 truthy로
남아 새 소켓에서 worker-queue를 재구독하지 않는다 → 갱신이 멈춘 stale 화면.

## 수정 범위

1. **서버(근본 수정)**: `handleUnsubscribeWorkerQueue`가 `detachWorkerQueue`와
   동일하게 전체 `SUBSCRIBERS` 맵을 순회하며 `(ws, client_id)` 일치 항목을
   모두 제거한다. 현재 workspace 키 한정 검색을 폐기한다.
2. **프로토콜 방어층**: `worker-queue-snapshot`의 wire schema를
   `payload: { type, id, root_dir, queue }`로 고정한다 —
   `emitWorkerQueueSnapshot`(`server/ws/context.js`)이 `root_dir` 인자를 받아
   payload 최상위에 싣고, 두 호출부(`server/ws/worker-handlers.js`의 구독 응답
   ·fanout)가 해당 workspace 키를 전달한다. `queue` 내부에는 넣지 않는다.
   클라이언트 스냅샷 핸들러(`app/main.js`)는 **`workspace.current?.path`가
   존재할 때만** 불일치 스냅샷을 거부한다 — bootstrap 초기 스냅샷은
   `current === null` 상태에서 도착하므로 무조건 거부하면 최초 화면이 비게
   된다(전환 전에는 재스냅샷도 없음). `app/protocol.md`의 해당 이벤트 서술을
   함께 갱신한다.
3. **재연결 재구독**: 재연결 시 `worker_queue_unsub`를 리셋하고 workspace 복원
   (`set-workspace`) 후 활성 뷰 기준으로 `ensureWorkerSubscriptions`를 다시
   호출한다 (기존 `resubscribeDisplayPolicyAfterReconnect`와 같은 순서 규율:
   workspace 복원이 먼저).

## 비범위

- ui-order / display-policy / session-log 채널의 동종 점검(별도 관측 없음).
- Board 구독 경로(정상 동작 확인됨), 큐 저장 구조 변경.

## 검증 계획

- 서버 단위 테스트(`server/ws.worker-queue.test.js` 또는 인접): workspace 전환
  후 unsubscribe가 이전 workspace 구독을 제거함 — 이전 workspace fanout이 해당
  연결에 더 이상 push되지 않음을 단언. 스냅샷 payload가 고정 schema
  `{ type, id, root_dir, queue }`를 따름을 단언.
- 클라이언트 방어층 테스트: ① `workspace.current`가 설정된 상태에서 불일치
  스냅샷이 store에 반영되지 않음, ② `current === null`인 bootstrap 최초
  스냅샷은 반영됨.
- 클라이언트 재연결 테스트: Worker 뷰 활성 상태에서 재연결 시 새
  `subscribe-worker-queue`가 전송되고, 그 전송이 workspace 복원
  (`set-workspace`)보다 뒤에 온다.
- 기존 스위트: `npm run tsc` · `npm test` · `npm run lint`.
- 프런트엔드 변경이므로 `npm run build` 후 번들 포함, 머지 후
  `bdui-shared restart` + 프로세스·포트·HTTP 검증.

## 영향 파일

- `server/ws/worker-handlers.js`
- `server/ws/context.js`
- `app/main.js`
- `app/protocol.md`
- 관련 테스트 파일
