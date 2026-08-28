---
scope:
  - server/worker/state-paths.js
  - server/worker/session-log.js
  - server/worker/session-monitor.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/attach.js
  - server/worker/attempt-failure.js
  - server/worker/usage-store.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/bead-timeline.js
  - server/worker/record-retention.js
  - server/ws/worker-handlers.js
  - server/ws/snapshot-retention.js
  - app/views/worker/
---

# Worker 기록 구조 재편 — bead 타임라인·실패 요약·상태 전용 queue.json·보존 정책

Bead: UI-8wpb · route: spec_backed · 2026-08-28 · rev 2 (spec review REVISE 7건 반영) ·
형제: UI-5ym8(실패 분류 2계층)

## 1. 문제 (beads-ui 워크스페이스 실측)

| 저장소 | 실측 | 문제 |
|---|---|---|
| `sessions/<bead>-<ts>-<n>.jsonl` | 376개 · 310MB · 최대 8.6MB | 보존·회전 정책 없음, 무한 증가 |
| `repo-operation-logs/<op_id>.log` | 163개 · 5.7MB | 같음(이 spec 범위 밖, §12 관찰) |
| `queue.json` | 1.8MB 단일 파일 | 지나간 attempt 기록(cause·cause_detail·usage)을 전부 안고 매 변경마다 통째로 다시 씀 — 유일한 누적 파일이자 유일한 실패 이력 SoT |
| 실패 타일 | 코드 + 로그 경로 | "무엇이 실패했는지" 한 줄이 없음 |

bead 하나의 이력을 보려면 세 곳을 이어 붙여야 하고, 실패 이력이 상태 파일과 섞여 있다.

## 2. 참고한 관행

Airflow(`dag/run/task/attempt=N.log`, 원격 아카이브), GitHub Actions(step 로그 +
실패 annotation 요약 + 90일 보존), Temporal(실행별 이벤트 히스토리가 SoT, 종료 후
아카이브), Kubernetes(컨테이너별 크기 회전, JSON lines + 상관 ID), Sentry(지문 + 한
줄 메시지 + breadcrumb). 공통: **시도 단위 원문 파일**, **짧은 사람용 타임라인과
기계 원문의 분리**, **보존 정책**.

## 3. 결정 요약

1. bead마다 `events.jsonl` 타임라인을 둔다. 사람이 읽는 짧은 이벤트 목록이며 실패
   타일·이슈 상세·`bd comment`가 읽는 이력 SoT다. 쓰기는 **Worker 서버 프로세스
   하나**가 소유하고, 이벤트는 안정적인 `event_id`로 멱등하다.
2. 실패마다 `summary` 한 줄을 추출해 이벤트와 attempt 기록(UI-5ym8
   `cause_detail.summary`)에 싣는다.
3. `queue.json`은 **살아 있는 것과 아직 처리되지 않은 것**만 보유한다. 처리가 끝난
   terminal attempt만 bead 디렉터리로 이관한다.
4. 세션 원문 로그는 bead 디렉터리로 옮기고, 닫힌 bead의 로그는 30일 뒤 gzip
   아카이브·180일 뒤 삭제한다. 타임라인은 영구. 읽기 경로는 세 위치를 순서대로
   해석한다.

## 4. 파일 배치 (`state-paths.js`)

```
<state>/<workspace>/
  queue.json                      # 살아 있는 상태 + 미처리 attempt
  retention-policy.json           # {archive_days, delete_days}
  beads/<bead_id>/
    events.jsonl                  # 타임라인 (영구)
    attempts/<attempt_id>.json    # 처리 완료 attempt 레코드 (queue.json에서 이관)
    sessions/<attempt_id>.jsonl   # 세션 원문 (기존 sessions/ 이동)
    sessions/<attempt_id>.stderr.log
    archive/<attempt_id>.jsonl.gz # 30일 뒤
  beads/.migrated-v1              # 마이그레이션 완료 마커
  repo-operation-logs/            # 유지, 이 spec 범위 밖
```

- 경로 API는 전부 `bead_id`를 받는다: `sessionLogPath(workspace, bead_id, attempt_id)`,
  `attemptRecordPath(workspace, bead_id, attempt_id)`, `beadTimelinePath(workspace, bead_id)`.
  attempt ID에서 bead를 복원하지 않는다(`review:authority-…` 같은 ID는 불가능).
- 각 attempt 레코드는 **정확한 `log_path`를 저장**한다. 소비자(프런트 16곳·세션 로그
  뷰어·`bd comment`·`session-monitor.js`)는 저장된 문자열을 그대로 쓴다.
- 읽기 해석 순서(`session-log.js`·세션 로그 뷰어 공통): 저장된 `log_path` → legacy
  flat `sessions/<attempt_id>.jsonl` → `archive/<attempt_id>.jsonl.gz`(서버가 gunzip
  스트림으로 읽음) → 없으면 `expired`. 뷰어는 `expired`를 "만료됨(180일 보존 정책)"
  으로 표시한다.
- 실행 중 세션 로그의 이동은 **같은 파일시스템 안의 원자적 `rename`**만 쓴다(copy+unlink
  금지 — 자식 프로세스가 상속한 fd가 삭제된 inode에 계속 쓰게 된다). 이동은 attempt가
  terminal이 된 뒤에만 하며, `session-monitor.js`가 재연결하기 전에 attempt 레코드의
  `log_path`를 먼저 갱신한다.

## 5. 타임라인 이벤트 (`bead-timeline.js`, 신규)

한 줄 = 한 이벤트. 필드:
`{event_id, at, bead_id, attempt_id?, kind, summary, detail?, log_path?}`.
`event_id = <kind>:<attempt_id|bead_id>:<단조 seq 또는 op_id>` — 같은 사실의 재기록은
같은 id이고, 읽기 쪽이 id로 dedupe한다.

| kind | 발생 지점 | summary 예 |
|---|---|---|
| `dispatched` | scheduler dispatch | `claude opus/high 디스패치 · base a1b2c3d` |
| `guard_warning` | runner guard warn | `base 동기화 머지 기록: git merge origin/main` |
| `session_ended` | verdict | `성공 · 6커밋 push · PR #231` / `파킹 · <awaiting_user>` |
| `attempt_failed` | `failAttempt` | `세션 실패 — API Error: 529 Overloaded` |
| `attempt_retry` | UI-5ym8 §3.3 | `자동 재시도 2/3 · 다음 14:05` |
| `queue_hold` / `queue_resume` | UI-5ym8 §4 | `환경 보류: gh 관측 실패` / `사용자 재개` |
| `landing_step` | quickfix-landing | `push 포함 확인 · deploy 시작 · close` |
| `merge_step` | merge-queue / completion-intent | `머지 큐 진입 · gate eligible · squash 머지 · cleanup` |
| `operation_failed` | repo-operation-coordinator | `배포 실패 — deploy: exit 1 · npm ci ENOENT` |
| `needs_human` | completion-intent | `확인 필요 — verify_red` |
| `user_action` | ws 핸들러 | `[머지] 클릭` / `[폐기]` / `재시도` |

- **단일 writer**: 쓰기는 Worker runtime의 `timeline` 인스턴스 하나가 `attach.js`에서
  만들어져 scheduler·merge-queue·coordinator·ws 핸들러에 주입된다. ws 핸들러는 직접
  파일을 열지 않고 이 인스턴스에 append를 요청한다. 다중 프로세스 쓰기는 없다
  (Worker 서버는 워크스페이스당 하나, 기존 `bdui-shared` 계약).
- append는 한 줄을 `O_APPEND`로 한 번의 `write`로 쓴다. 끊긴 마지막 줄(크래시)은
  읽기 쪽이 버리고 다음 줄부터 읽는다(`JSON.parse` 실패 줄 무시, 개수는 서버 로그).
- **순서 보장**: attempt를 `queue.json`에서 이관(§7)하는 쓰기는 그 attempt의 terminal
  이벤트 append가 `fsync`까지 돌아온 뒤에만 한다. 이벤트 append 실패는 예외를
  삼키되 이관을 **하지 않는다**(큐에 남아 다음 pass에서 재시도) — 그래서 큐 진행은
  막지 않으면서 이력이 누락되지 않는다.
- 읽기 API `readTimeline(workspace, bead_id, {limit})`는 최근 `limit`줄을 id-dedupe
  해서 돌려준다. 재시작 뒤 재생(idempotent replay) 테스트로 중복 없음을 고정한다.

## 6. 실패 요약 추출 (`summary`)

| 원천 | 규칙 |
|---|---|
| 세션 실패/파킹 | UI-5ym8 §6의 규칙(claude: 마지막 `result` 텍스트 첫 줄; codex: `turn.failed` → 마지막 agent_message → `no_result`), 200자 |
| verify/deploy 스크립트 | 출력에서 첫 매치 줄: `/^(FAIL|✗|Error|error:|npm ERR!|Traceback|AssertionError)/` 없으면 마지막 비어있지 않은 줄. 200자 |
| guard kill | `guardWarningMessage`/kill 메시지 그대로 |
| 착지/머지/정리 | 실패 토큰의 `failure-sentences.js` 문장 + 세부 토큰 |

추출은 서버에서 한 번 하고 attempt 기록·이벤트·`bd comment`가 같은 문자열을 쓴다.

## 7. `queue.json` 상태 전용화

- **`queue.json`에 남는 attempt**: `running`, `retry_wait`, `parked`, dismiss되지 않은
  `failed`, 그리고 `done`이지만 완료 saga(completion-intent)가 아직 참조하는 것.
  즉 UI-5ym8의 unhandled-failure predicate·`settleMootRepairFailures`·재시작
  reconcile·리뷰 세션 판정이 보는 모든 레코드는 큐에 그대로 있다.
- **이관 대상**: 처리 완료 terminal — `done`(saga 종료 후), `discarded`,
  `dismissed_at`이 찍힌 `failed`, `superseded`. 이관은 §5의 순서 보장 뒤
  `attempts/<attempt_id>.json`(임시 파일→rename→readback) 후 큐에서 제거.
  bead당 개수 상한은 두지 않는다(상한이 미처리 실패를 밀어내는 문제).
- 조회 API: `readAttempt(workspace, bead_id, attempt_id)`,
  `readAttemptsForBead(workspace, bead_id)`(큐 + `attempts/` 합집합, attempt_id
  dedupe). 소비자:
  - `usage-store.js`는 메모리 집계이고 `scheduler`가 attempt 레코드에 persist한다 →
    bead 총 사용량·작업시간 집계는 `readAttemptsForBead`로 바꾼다.
  - `server/ws/snapshot-retention.js`(전송 스냅샷 보존 판정)와 세션 이력 표시는
    큐 스냅샷의 attempt만 보던 것을 필요 시 `readAttemptsForBead`로 보강한다.
  - 세션 로그 뷰어는 `readAttempt`로 `log_path`를 얻는다.
- `persist()`는 지금처럼 원자적 rename.

## 8. 보존 정책과 마이그레이션 (`record-retention.js`, 신규)

### 8.1 설정

`retention-policy.json` `{archive_days:30, delete_days:180}` — 별도 파일
(`display-policy-store.js`는 알 수 없는 필드를 정규화 시 버리므로 거기 두지 않는다).
없으면 기본값.

### 8.2 보존 실행

서버 시작 시와 매일 1회. 대상은 bead status가 `closed`이고 마지막 이벤트가
`archive_days` 전인 bead의 `sessions/*.jsonl`·`.stderr.log` → `archive/*.jsonl.gz`
(gzip 후 원본 rename→unlink; attempt `log_path`는 그대로 두고 §4 해석 순서가
archive를 찾는다); `delete_days` 전이면 archive 삭제. `events.jsonl`·`attempts/*.json`
은 삭제하지 않는다.

### 8.3 마이그레이션 (일회성, 멱등, 고정 순서)

`attach.js`의 Worker 시작 순서에서 **최초 `queue.json` load·detached session monitor
재연결·reconcile보다 먼저** 실행하고, 완료 전에는 서버 health가 `ready`를 돌려주지
않는다. 마커 `beads/.migrated-v1`이 있으면 건너뛴다. 없으면 각 단계는 이미 된 것을
검사해 건너뛰므로 중단 뒤 재실행이 안전하다.

1. `queue.json`을 읽어 이관 대상(§7) attempt마다 `attempts/<id>.json`을 임시
   파일→rename으로 쓰고 readback. 이미 있으면 건너뜀.
2. flat `sessions/<attempt>.jsonl`·`.stderr.log`를 bead 디렉터리로 **rename**(같은
   파일시스템). 대상이 이미 있으면 건너뜀. 실행 중 attempt(`running`)의 로그는
   옮기지 않는다(재시작 직후엔 없지만 규칙으로 고정).
3. 과거 실패 레코드에서 `attempt_failed` 이벤트를 역생성(`event_id`로 멱등, summary는
   `cause`만).
4. 새 `queue.json`(이관된 attempt 제거)을 임시 파일→rename→readback.
5. 마커를 원자적으로 생성.

어느 단계에서 중단돼도: 1·2·3은 재실행 시 존재 검사로 통과, 4 이전 중단은 큐가
아직 축소되지 않았으므로 데이터 손실 없음, 4 이후 5 이전 중단은 재실행 시 1~4가
no-op이고 5만 남는다.

## 9. 표면

- 실패 타일 팝오버(UI-rj02)와 `parked` 타일(UI-5ym8 §8): `summary` 한 줄을 첫 줄로,
  아래에 최근 타임라인 5줄, 마지막에 로그 경로(만료면 "만료됨").
- 이슈 상세(bead 페이지)에 "Worker 이력" 섹션: 타임라인 전체(최근순, 더 보기).
- `bd comment`: 실패·파킹·needs_human 시 `summary` 한 줄 + 로그 경로(지금의 완료
  실패 댓글과 같은 형식으로 통일).

## 10. 구현 unit 후보

1. `timeline` — `bead-timeline.js` + `attach.js` 주입 + 발생 지점 12곳의 append.
2. `summary` — runner verdict·operation 결과·착지 실패의 summary 추출.
3. `state-split` — `state-paths.js` 경로(bead_id), `queue-store.js` 이관·조회 API,
   `usage`·`snapshot-retention`·세션 뷰어 소비자 전환, `session-monitor.js` 경로.
4. `retention` — `record-retention.js` 설정·아카이브·삭제·마이그레이션·health 게이트.
5. `surface` — 팝오버·이슈 상세·`bd comment` 문구, 번들.

## 11. 테스트 범위

- `bead-timeline.test.js`: `event_id` dedupe(같은 사실 두 번 append → 한 줄로 읽힘),
  끊긴 마지막 줄 무시, 재시작 재생 중복 없음, append 실패 시 이관 보류.
- summary 추출: 세션 result 첫 줄·200자 절단·`is_error` 문장, codex 우선순위,
  스크립트 출력 첫 매치 줄·fallback 마지막 줄.
- `queue-store`: `failed`(미 dismiss)·`parked`·`retry_wait`는 이관되지 않음 / dismiss
  후 이관 / `readAttemptsForBead` 합집합·dedupe / 리뷰 세션 attempt가 섞여도 미처리
  실패가 남음 / 재시작 reconcile 회귀.
- `state-paths`: `bead_id` 없는 호출은 타입 오류; `log_path` 저장값이 해석 순서의 첫
  후보.
- `session-log`·뷰어: 새 경로 → legacy flat → gzip → `expired` 순서, 30일 경계 뷰어
  접근, 180일 뒤 "만료됨" 표면.
- `record-retention.test.js`: 30/180 경계, `closed` 아닌 bead 제외, 실행 중 attempt
  로그 미이동, 마이그레이션 각 단계 중단 후 재실행 멱등(1~5 각각), 마커 있으면
  no-op, health가 완료 전 not-ready.
- `session-monitor`: 재연결이 attempt `log_path`를 쓰고 rename 후에도 tail이 이어짐.
- 프런트: 팝오버 summary+타임라인 5줄 스냅샷, 이슈 상세 섹션.
- 회귀: 세션 로그 뷰어(`worker-handlers.js` session_log)·usage 집계·`snapshot-retention`
  기존 테스트 통과.

## 12. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|
| 형제 | beads-ui | user_request | 실패 분류·큐 정지 규칙은 별개 판정 표면 | 없음 | UI-5ym8 |

- 관찰: `repo-operation-logs/`(op_id가 bead를 교차)의 보존은 이 spec 범위 밖 —
  다중 bead operation의 기준 시각·아카이브 위치를 정하는 별도 결정이 필요하다.

## 13. 결정 (ADR 후보)

- **Worker 이력의 SoT는 bead별 `events.jsonl` 타임라인이며 `queue.json`은 살아 있는
  것과 미처리 상태만 갖는다.** 되돌리기 어려움: 있음 — 소비자(뷰어·집계·타일)가
  `readAttemptsForBead`와 타임라인을 읽게 바뀌고 마이그레이션이 큐 파일을 축소하므로
  되돌리려면 역마이그레이션과 소비자 재작성이 필요하다 / 맥락 없이 놀라움: 있음 —
  `queue.json`을 열면 과거 attempt가 없어 "기록이 지워졌다"로 읽힌다 / 실제
  trade-off: 있음 — 조회 API·단일 writer·순서 보장의 복잡도 vs 1.8MB 통째 재쓰기와
  세 곳 조인의 비용. **세 조건 충족.** summary: "Worker의 실행·실패 이력은 bead별
  append-only 타임라인이 소유하고, 상태 파일은 진행 중·미처리 것만 담는다."
- 보존 30/180일: 되돌리기 쉬움(설정값) → 후보 아님.
