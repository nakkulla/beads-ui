---
scope:
  - server/worker/state-paths.js
  - server/worker/session-log.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/bead-timeline.js
  - server/worker/record-retention.js
  - server/ws/worker-handlers.js
  - app/views/worker/
---

# Worker 기록 구조 재편 — bead 타임라인·실패 요약·상태 전용 queue.json·보존 정책

Bead: UI-8wpb · route: spec_backed · 2026-08-28 · 형제: UI-5ym8(실패 분류 2계층)

## 1. 문제 (beads-ui 워크스페이스 실측)

| 저장소 | 실측 | 문제 |
|---|---|---|
| `sessions/<bead>-<ts>-<n>.jsonl` | 376개 · 310MB · 최대 8.6MB | 보존·회전 정책 없음, 무한 증가 |
| `repo-operation-logs/<op_id>.log` | 163개 · 5.7MB | 같음 |
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
   타일·이슈 상세·`bd comment`가 읽는 SoT다.
2. 실패마다 `summary` 한 줄을 추출해 이벤트와 attempt 기록(UI-5ym8
   `cause_detail.summary`)에 싣는다.
3. `queue.json`은 살아 있는 상태만 보유한다. 정착한 attempt는 타임라인으로 이관하고
   큐 파일에서는 최근 N개(bead당 3개)만 남긴다.
4. 세션 원문 로그는 bead 디렉터리로 옮기고, 닫힌 bead의 로그는 30일 뒤 gzip
   아카이브·180일 뒤 삭제한다. 타임라인은 영구.

## 4. 파일 배치 (`state-paths.js`)

```
<state>/<workspace>/
  queue.json                      # 살아 있는 상태만
  beads/<bead_id>/
    events.jsonl                  # 타임라인 (영구)
    attempts/<attempt_id>.json    # 정착한 attempt 레코드 (queue.json에서 이관)
    sessions/<attempt_id>.jsonl   # 세션 원문 (기존 sessions/ 이동)
    sessions/<attempt_id>.stderr.log
    archive/<attempt_id>.jsonl.gz # 30일 뒤
  repo-operation-logs/            # 유지 (op_id는 bead 교차)
```

- `sessionLogPath(workspace, attempt_id)`는 새 경로를 돌려준다. 기존 flat 경로에
  파일이 있으면 읽기 시 fallback(이동은 §8 마이그레이션이 한 번 수행).
- `log_path` 소비자(프런트 16곳·세션 로그 뷰어·`bd comment` 문구)는 경로 문자열을
  서버가 주는 대로 쓰므로 변경 없음.

## 5. 타임라인 이벤트 (`bead-timeline.js`, 신규)

한 줄 = 한 이벤트. 필드: `{at, bead_id, attempt_id?, kind, summary, detail?, log_path?}`.

| kind | 발생 지점 | summary 예 |
|---|---|---|
| `dispatched` | scheduler dispatch | `claude opus/high 디스패치 · base a1b2c3d` |
| `guard_warning` | runner guard warn | `base 동기화 머지 기록: git merge origin/main` |
| `session_ended` | verdict | `성공 · 6커밋 push · PR #231` / `파킹 · codex 환경 장애 대기` |
| `attempt_failed` | `failAttempt` | `세션 실패 — API Error: 529 Overloaded` |
| `attempt_retry` | UI-5ym8 §3.3 | `자동 재시도 2/3 · 다음 14:05` |
| `queue_hold` / `queue_resume` | UI-5ym8 §4 | `환경 보류: gh 관측 실패` / `사용자 재개` |
| `landing_step` | quickfix-landing | `push 포함 확인 · deploy 시작 · close` |
| `merge_step` | merge-queue / completion-intent | `머지 큐 진입 · gate eligible · squash 머지 · cleanup` |
| `operation_failed` | repo-operation-coordinator | `배포 실패 — deploy: exit 1 · npm ci ENOENT` |
| `needs_human` | completion-intent | `확인 필요 — verify_red` |
| `user_action` | ws 핸들러 | `[머지] 클릭` / `[폐기]` / `재시도` |

- 쓰기는 append-only, 한 번에 한 줄, `O_APPEND`로 원자적. 실패해도 큐 진행을
  막지 않는다(로그 기록 실패는 서버 로그에만).
- 읽기 API `readTimeline(workspace, bead_id, {limit})`는 최근 `limit`줄을 돌려준다.

## 6. 실패 요약 추출 (`summary`)

| 원천 | 규칙 |
|---|---|
| 세션 실패/파킹 | 마지막 `result` 이벤트 텍스트의 첫 비어있지 않은 줄, 200자. `is_error`면 오류 문장 그대로 |
| verify/deploy 스크립트 | 출력에서 첫 매치 줄: `/^(FAIL|✗|Error|error:|npm ERR!|Traceback|AssertionError)/` 없으면 마지막 비어있지 않은 줄. 200자 |
| guard kill | `guardWarningMessage`/kill 메시지 그대로 |
| 착지/머지/정리 | 실패 토큰의 `failure-sentences.js` 문장 + 세부 토큰 |

추출은 서버에서 한 번 하고 attempt 기록·이벤트·`bd comment`가 같은 문자열을 쓴다.

## 7. `queue.json` 상태 전용화

- attempt가 정착(`done|failed|discarded|parked|superseded`)하면 그 레코드를
  `beads/<bead>/attempts/<attempt_id>.json`으로 쓰고, `queue.json`에는 bead당 최근
  3개만 남긴다(실패 타일·dismiss·supersede 판정이 읽는 범위).
- `queue-store.js` 스냅샷 API는 유지하되 `attempts`에 없는 과거 레코드는
  `readAttempt(workspace, attempt_id)`로 지연 로드한다. 소비자: 세션 로그 뷰어,
  usage 집계(`usage-store.js`가 이미 별도 파일), 타임라인.
- `persist()`는 지금처럼 원자적 rename. 크기 목표: bead 수 × 3 레코드.

## 8. 보존 정책 (`record-retention.js`, 신규)

- 서버 시작 시와 매일 1회 실행. 대상은 bead status가 `closed`이고 마지막 이벤트가
  30일 전인 bead의 `sessions/*.jsonl` → `archive/*.jsonl.gz`; 180일 전이면 archive
  삭제. `events.jsonl`·`attempts/*.json`은 삭제하지 않는다.
- 일회성 마이그레이션(같은 모듈): flat `sessions/<attempt>.jsonl`을 bead 디렉터리로
  이동, `queue.json`의 정착 레코드를 `attempts/`로 이관, 과거 실패 레코드에서
  `attempt_failed` 이벤트를 역생성(summary는 `cause`만). 완료 마커
  `beads/.migrated-v1`.
- 기간은 `display-policy.json`에 `retention: {archive_days, delete_days}`로 조정
  가능, 기본 30/180.

## 9. 표면

- 실패 타일 팝오버(UI-rj02)와 `parked` 타일(UI-5ym8 §8): `summary` 한 줄을 첫 줄로,
  아래에 최근 타임라인 5줄, 마지막에 로그 경로.
- 이슈 상세(bead 페이지)에 "Worker 이력" 섹션: 타임라인 전체(최근순, 더 보기).
- `bd comment`: 실패·파킹·needs_human 시 `summary` 한 줄 + 로그 경로(지금의 완료
  실패 댓글과 같은 형식으로 통일).

## 10. 구현 unit 후보

1. `timeline` — `bead-timeline.js` + 발생 지점 12곳의 append 호출.
2. `summary` — runner verdict·operation 결과·착지 실패의 summary 추출.
3. `state-split` — `state-paths.js` 경로, `queue-store.js` 정착 레코드 이관·지연 로드.
4. `retention` — `record-retention.js` 아카이브·삭제·마이그레이션.
5. `surface` — 팝오버·이슈 상세·`bd comment` 문구, 번들.

## 11. 테스트 범위

- `bead-timeline.test.js`: append 원자성(동시 두 쓰기), `readTimeline` limit, 쓰기
  실패 시 예외 삼킴.
- summary 추출: 세션 result 첫 줄·200자 절단·`is_error` 문장, 스크립트 출력 첫 매치
  줄·fallback 마지막 줄.
- `queue-store`: 정착 시 `attempts/` 이관과 bead당 3개 유지, 지연 로드가 같은
  레코드를 돌려줌, 스냅샷 호환.
- `record-retention.test.js`: 30/180일 경계, `closed` 아닌 bead 제외, 마이그레이션
  멱등(`.migrated-v1`), flat 경로 fallback 읽기.
- 프런트: 팝오버 summary+타임라인 5줄 스냅샷, 이슈 상세 섹션.
- 회귀: 세션 로그 뷰어(`worker-handlers.js` session_log)·usage 집계 기존 테스트 통과.

## 12. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|
| 형제 | beads-ui | user_request | 실패 분류·큐 정지 규칙은 별개 판정 표면 | 없음 | UI-5ym8 |

- 관찰: `repo-operation-logs/`는 op_id가 bead를 교차(정리 작업이 여러 bead에 걸침)해
  bead 디렉터리로 옮기지 않는다 — 보존 정책만 같은 30/180일로 적용.

## 13. 결정 (ADR 후보)

- **Worker 이력의 SoT는 bead별 `events.jsonl` 타임라인이며 `queue.json`은 살아 있는
  상태만 갖는다.** 되돌리기 어려움: 있음(소비자·마이그레이션) / 맥락 없이 놀라움:
  있음(큐 파일에서 과거 attempt가 사라짐) / 실제 trade-off: 있음(지연 로드 복잡도
  vs 파일 크기·가독성). **세 조건 충족.** summary: "Worker의 실행·실패 이력은
  bead별 append-only 타임라인이 소유하고, 상태 파일은 진행 중인 것만 담는다."
- 보존 30/180일: 되돌리기 쉬움(설정값) → 후보 아님.
