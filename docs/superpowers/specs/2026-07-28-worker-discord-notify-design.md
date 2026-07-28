# 워커 레인 Discord 알림 보강 — 설계 (UI-9rrk)

## 배경

워커 레인의 라이프사이클 알림은 UI-2yoq에서 `server/worker/notify.js`로 도입되어
시작(`attemptStarted`)·실패(`attemptFailed`)·PR 제출(`prWaitEntered`) 세 전환을
`discord` CLI(웹훅)로 전송한다. 그러나 두 가지가 빠져 있다:

1. **머지 완료 알림이 없다.** 수동 `[머지]` 클릭(`pr-actions.js merge`)과 외부
   관측 MERGED(`pr-poller.js` → `cleanupObservedMerge`)는 모두
   `pr-actions.js runCleanup`으로 수렴하는데, 이 경로에 알림 훅이 없고
   `notify`는 `createScheduler`에만 주입되어 있다.
2. **런타임 config가 꺼져 있다.** `~/.config/bdui/config.toml`에
   `[worker.notify]` 섹션이 없어 기존 알림도 전부 비활성 상태다
   (`normalizeWorkerNotify`는 섹션 부재 시 `enabled: false`로 fail-quiet).

또한 사용자 요구로, 알림이 "beads worker"로 진행된 작업임을 일관되게 표시해야
한다. 현행 제목("워커 시작"/"워커 실패"/"PR 대기")은 표기가 제각각이고 PR
대기에는 워커 표시가 없다.

## 요구사항

- 워커 작업의 세 시점 — 작업 시작, 작업 완료(PR 제출), 머지 완료 — 에 Discord
  알림이 간다.
- 모든 알림 제목이 "beads worker" 표시와 아이콘을 일관되게 포함한다.
- 기존 실패 알림은 유지하고 제목만 통일한다(범위 축소 아님).
- 알림 실패가 큐 전환을 깨지 않는다(기존 fire-and-forget·no-throw 계약 유지).

## 변경 1 — 알림 제목 통일 + 아이콘 (`server/worker/notify.js`)

| 이벤트 | 임베드 제목 | 색 | 멘션 |
|---|---|---|---|
| 작업 시작 (`attemptStarted`) | `🚀 beads worker · 시작` | 없음 (현행) | 무멘션 (현행) |
| 실패 (`attemptFailed`) | `❌ beads worker · 실패` | red (현행) | 멘션 (현행) |
| PR 제출 (`prWaitEntered`) | `📬 beads worker · PR 제출` | **blue** (green에서 변경) | 멘션 (현행) |
| 머지 완료 (`mergeCompleted`, 신규) | `✅ beads worker · 머지 완료` | green | 무멘션 |

- PR 제출을 blue로 바꾸는 이유: green을 "종결 완료"(머지 완료)에 배정하고, PR
  제출은 "사람 행동 대기" 신호로 색으로 구분한다.
- 멘션 원칙은 현행 유지: 사람이 행동해야 하는 전환(실패, PR 제출)만 멘션,
  정보성 전환(시작, 머지 완료)은 `-q`.
- 본문 구성(bead ID, 제목, `리포:`, `실행:`, PR URL 등)은 현행 유지.

## 변경 2 — 머지 완료 훅 (`notify.js` + `pr-actions.js` + `attach.js`)

- `notify.js`에 `mergeCompleted(input)` 메서드 추가.
  - 입력: `{ bead_id, pr_url?: string|null, repo?: string|null }`.
  - 본문: bead ID, PR URL(있으면), `리포:`(있으면).
  - 배포 상태는 알리지 않는다. `runCleanup`의 성공 반환 지점에서 배포는 "없음 /
    동기 완료 / detached launch 예정"이 섞여 있어 어느 경로를 탔는지로 배포
    여부를 추론하면 부정확하다(codex 스펙 리뷰 finding 1). 배포 상태 알림은
    범위 밖.
  - 기존 메서드와 동일한 fire-and-forget·no-throw·per-call config 읽기 계약.
- `pr-actions.js`의 `runCleanup` 두 성공 반환 지점에서
  `notify.mergeCompleted(...)` 호출.
  - 수동 머지 클릭과 외부 관측 MERGED가 모두 `runCleanup` 하나로 수렴하므로 훅은
    이 한 곳이면 두 경로를 모두 덮는다.
  - 가용한 필드만 채운다(fail-quiet): PR URL·리포가 없으면 해당 줄을 생략한다.
- `attach.js`: `createNotifier` 인스턴스를 `createPrActions` deps에 추가
  주입한다. `notify`가 주입되지 않은 기존 테스트 경로를 위해 옵셔널로 처리한다
  (no-op 허용).

## 변경 3 — 런타임 config 활성화 (배포 단계)

- `~/.config/bdui/config.toml`에 추가:

  ```toml
  [worker.notify]
  enabled = true
  ```

  (`cmd`는 기본값 `["discord"]`를 그대로 사용.)
- 머지 후 배포 절차(AGENTS.md Post-Merge Runtime Validation)에 따라
  `bdui-shared restart` 후 프로세스·포트·HTTP 검증. config는 per-call로 읽히지만
  코드 변경 반영에는 재시작이 필요하다.

## 테스트

- `notify.test.js`: 제목·색 변경 반영, `mergeCompleted`의 플래그(`-q`,
  `-c green`, `-t`)와 본문 라인 구성, 필드 생략(fail-quiet), config off 시 미전송.
- `pr-actions.test.js`: `runCleanup`의 두 성공 반환 경로(즉시 완료 경로,
  detached deploy 경로) 각각에서 `mergeCompleted`가 정확히 1회 호출되고,
  실패·거부 경로에서는 호출되지 않음. `notify` 미주입 시에도 cleanup이 정상
  동작함.

## 범위 밖 / 상호작용

- **UI-7agi(외부 행)**: main에 머지됨(#60, 36ba3d9). 외부 행 머지도 같은
  `runCleanup` 초레오그래피를 타므로 이 알림이 외부 행 머지에도 그대로
  적용된다. 외부 행은 durable 레인이 아니어서 `moveToDone*`를 타지 않지만, 훅은
  성공 반환 시점이므로 동일하게 발화한다.
- 프론트엔드 변경 없음(서버 전용). 알림 이벤트 종류 추가·문구 개인화 등은 이번
  범위가 아니다.
