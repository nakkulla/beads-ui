---
scope:
  - server/worker/notify.js
  - server/worker/discard-coordinator.js
  - server/worker/completion-intent.js
  - server/worker/pr-actions.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/direction-inquiry.js
  - server/worker/session-ref.js
  - server/ws/
  - app/views/worker/
---

# needs_human·사용자 개시 작업 실패의 Discord 알림과 [정리 재시도]·[세션에서 해결] 재진입

Bead: `UI-jw27` · 2026-09-01

설계 정본: dotfiles
`docs/superpowers/specs/2026-09-01-fullplan-phase-carryover-contract-design.md`
§4·§5 (커밋 `a12ad7b42701345d458d5fd2da9b712278a6f7e5`, Bead `dotfiles-hlns`).
"알림 자동·행동 클릭"의 결정·자동 수리 dispatch 금지·설정 토글 없음은 정본이
소유하고, 이 문서는 beads-ui의 전이 어휘·발송 지점·버튼·세션 기동 배선을 정한다.

사용자 결정(2026-09-01, 이 세션): 알림 범위는 폐기만이 아니라 **모든 사용자
개시 작업의 terminal 실패**로 일반화한다.

## §0 현행 공백

- `server/worker/notify.js`의 전이는 7종뿐이다(`started`·`resume`·`conflict`·
  `failed`·`pr_wait`·`merged`·`awaiting_user`). `failed`는 attempt 세션 실패
  전용이다.
- `discard-coordinator.js`는 notify를 호출하지 않는다 — [폐기] 실패
  (`failDiscardOperation`, `queue-store.js:6562`)는 화면을 보지 않으면 알 수
  없다(발단 사건: `PROSTATE-0yz`, 두 번 실패·알림 0건).
- needs_human 종단(`completion-intent.js:1358 terminalize` →
  `queue-store.js:8842 terminalizeCompletionIntent`)과 정리 중단
  (`pr-actions.js failCleanup` → `recordCleanupFailure`)도 알림이 없다.

## §1 알림 어휘 — 새 전이 1종 `needsHuman`

`notify.js`에 전이 하나를 추가한다: `TITLE.needs_human = '🤖 🚨 사람 필요'`,
메서드 `needsHuman(input)`. 실패 종류는 전이를 늘리지 않고 본문의 **클래스**
줄로 구분한다.

본문(부재 필드는 fail-quiet 생략, 기존 `prBody` 문법과 동형):

```
🤖 🚨 사람 필요 — <bead_id> <제목…>
클래스: <폐기 실패|배포 실패|post-merge 잡 실패|정리 중단|수동 배포 실패>
사유: <원인 코드> [— <원인 꼬리 한 줄>]
다음: <[정리 재시도] | [세션에서 해결] | 재클릭>
<PR URL 있으면>
리포: <basename>
```

불변식 유지: fire-and-forget(비동기 spawn·unref) · NO-THROW ·
`enabled=false`면 어떤 프로세스도 spawn되지 않음 · 기존 7종 전이의 발송
조건·본문 불변.

## §2 발송 지점 — durable terminal 기록의 write 4곳

원칙: **기록을 쓰는 그 순간에만** 발송한다. 재관측·재시작 복구 pass는 기존
기록을 다시 발송하지 않는다(재시작이 알림 폭주를 만들지 않는다). 사용자
재시도가 다시 terminal 실패에 도달하면 새 기록 write이므로 다시 발송한다.
머지 전 보류(충돌·verify 실패·리뷰 stale)는 terminal이 아니므로 제외한다
(정본 §5의 "머지 전 보류" 행 — 출구가 이미 화면·기존 알림에 있다).

| 기록 지점 | 클래스 | 비고 |
| --- | --- | --- |
| `failDiscardOperation` 호출부 (`discard-coordinator.js` — notify dep 추가) | 폐기 실패 | 사다리가 없어 첫 실패가 terminal; 재클릭 실패도 매번 |
| `completion-intent.js terminalize()` | 배포 실패 · post-merge 잡 실패 | `script_retry` 소진 후 needs_human 진입 시 1건 |
| `pr-actions.js failCleanup` → `recordCleanupFailure` | 정리 중단 | `UI-btj6`의 `unexecuted_phase_child:*`·`carryover_*` 포함 |
| 수동 배포 run의 terminal 실패 (`repo-operation-coordinator.js`) | 수동 배포 실패 | `[배포 실행]` 클릭 기원(`manual_run_id`)의 실패 settle 시 |

배선은 각 소유 모듈에 기존 `notify` 인스턴스를 dep으로 전달하는 방식이다
(스토어 `queue-store.js`는 순수 기록 계층으로 남긴다 — 발송은 기록을 쓰게 한
coordinator/액션 계층이 한다).

## §3 `[정리 재시도]` 통합

기존 `[정리]`/`정리 재개` 계열 버튼·라벨(`lane-model.js merge_label`,
`repo-ops-timeline.js` resume 버튼)을 `정리 재시도`로 단일화한다. WS 액션
(`worker-cleanup-retry`)과 재개 의미론은 불변 — 개칭과 표면 통합이지 새 재시도
경로가 아니다. 정본 §4가 이 명칭 단일화를 소유한다.

## §4 `[세션에서 해결]` — 기록 세션 resume + Discord 중계

- **표면**: terminal 실패 행 3종(`cleanup_failed` 행 · needs_human
  completion intent 행 · 폐기 실패 행)에 버튼 `[세션에서 해결]`을 단다. 새 WS
  액션 `worker-resolve-in-session` `{ bead_id }`(+ CAS revision) →
  `worker-handlers.js` 핸들러 → 아래 런처. 클릭이 유일한 기동이다 — 자동
  기동은 없다.
- **런처**: `direction-inquiry.js`의 tmux 기동 계열(`listPanes` pane 마커
  중복 가드 · `resolveClaude` · `tmux new-window` wrapper · bridge heartbeat
  판정 `bridgeActive`)을 공용 모듈로 일반화해 재사용한다. Discord 중계는 외부
  `claude-discord-bridge`가 marked pane을 집는 기존 방식 그대로이며 beads-ui는
  기동·마킹·상태 보고만 한다.
- **기동 명령 판정** (`session-ref.js` 자산 사용):
  1. Bead metadata `session_ref`의 마지막 유효 항목이 claude이고 로컬이면
     (`resolveSessionFile` 성립) —
     `claude --resume '<session_id>' --fork-session` + 첫 입력 = 실패
     컨텍스트(클래스·원인 코드·Bead ID·후보 행동). **기본 fork**: 원 transcript를
     불변으로 두어 Worker의 후속 resume(`scheduler.js`의 충돌 세션 기동과 같은
     꼴)과 간섭하지 않는다.
  2. resume 불가(`no_session_ref`·`unsafe_session_id`·`not_local`·파일 소실)
     이면 새 세션 + notes 계보 인용 프롬프트 fallback — 사유를 응답과 알림에
     기록한다(fail-quiet 은폐 금지).
- UI-7uid 시절의 "headless는 이어받기 불가" 전제는 정본 §4가 폐기했다.

## §5 ADR 0005 supersede

마감 단계에서 `adr` 스킬로 beads-ui ADR 0005를 supersede하는 새 ADR를
기록한다(§6의 후보). 자동 수리 dispatch 금지는 유지되며, 바뀌는 것은
"needs_human 해결 시 사람이 터미널에서 하던 수동 작업의 Discord 이관"이다
(정본 §4).

## §6 수용 기준

1. 폐기 작업이 실패하면 `[worker.notify]` 켜진 환경에서 알림 1건이 발송되고
   본문에 bead ID와 실패 원인 코드가 있다.
2. needs_human 종단(배포·잡)·정리 중단·수동 배포 실패도 같은 수준으로
   발송되고 본문에 클래스·원인·권장 다음 행동이 있다.
3. fire-and-forget·NO-THROW 불변식이 유지된다.
4. `enabled=false`에서는 아무 프로세스도 spawn되지 않는다.
5. 기존 7종 전이의 발송 조건·본문은 불변이다.
6. 재시작 복구 pass는 기존 terminal 기록을 재발송하지 않는다; 사용자 재시도의
   새 terminal 실패는 다시 발송된다.
7. `[세션에서 해결]` 클릭이 기록 세션 `--resume --fork-session` 대화형 tmux
   세션을 기동하고(불가 시 fallback 새 세션 + 사유 기록) marked pane으로
   Discord 중계 대상이 된다. 자동 기동 경로는 없다.
8. `[정리]` 계열 라벨이 `정리 재시도`로 단일화된다.
9. ADR 0005 supersede ADR가 기록된다.
10. Pre-Handoff Validation(tsc/test/lint/prettier/build) 통과.

## 구현 unit 후보

- unit A: notify 전이·발송 지점 4곳 배선 — scope anchor `server/worker/`
- unit B: 세션 런처 공용화·WS 액션·버튼 — scope anchor
  `server/worker/direction-inquiry.js`·`server/ws/`·`app/views/worker/`

## 경계·후속

- 관찰: 이 Bead는 `UI-i60a`에 `blocks`로 결속된다(post-merge 잡 실패 클래스가
  그 러너의 존재를 전제; 핸드오프에서 router가 기록).
- 관찰: 폐기 교착의 종료 경로 자체(포기 액션 등)는 기존 독립 Bead `UI-3si1`이
  소유한다 — 이 스펙은 실패를 알리는 것까지다.
- 관찰: scope 교차 — `UI-iv7l`
  (`docs/superpowers/specs/2026-08-31-review-gate-speed-design.md`)과
  `server/ws/`를 공유하나 다른 절이다: iv7l은 리뷰 게이트 속도 설정 표면,
  이 스펙은 새 액션 `worker-resolve-in-session`을 추가한다. 의존 관계 없음.

## 결정 (ADR 후보)

- **needs_human 재진입은 알림 자동·행동 클릭 2종이다 (ADR 0005 supersede)** —
  되돌리기 어려움: 성립(버튼·전이 어휘·세션 기동 경로를 UI와 운영 습관이
  소비). 맥락 없이 놀라움: 성립(자동 수리 금지와 클릭 기동 대화형 세션이
  공존하는 이유). 실제 트레이드오프: 성립(자동 dispatch 부활·설정 토글 기각).
  → summary 초안: "needs_human은 Discord 푸시로 자동 관측되고 재진입은
  [정리 재시도]와 기록 세션 resume 기반 Discord 중계 대화형 [세션에서 해결]
  두 클릭뿐이며 자동 수리 dispatch 금지는 유지된다"
