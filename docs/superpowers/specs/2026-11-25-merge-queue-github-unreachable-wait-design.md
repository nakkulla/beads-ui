---
scope:
  - server/bd.js
  - server/worker/gh.js
  - server/worker/gh.test.js
  - server/worker/target-base.js
  - server/worker/foreign-target.js
  - server/worker/pr-actions.js
  - server/worker/pr-actions.test.js
  - server/worker/pr-poller.js
  - server/worker/merge-queue.js
  - server/worker/merge-queue.test.js
  - server/worker/completion-intent.js
  - server/worker/completion-intent.test.js
  - server/worker/queue-store.js
  - server/worker/attach.js
  - server/worker/manual-merge-enqueue.test.js
  - server/worker/notify.js
  - server/worker/notify.test.js
  - server/timing-settings.js
  - server/ws/worker-handlers.js
  - server/ws.worker-queue.test.js
  - app/views/worker/pr-wait-row.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/views/settings-dialog/timing-section.js
---

# 머지 큐가 GitHub 연결 실패를 실패로 굳히지 않고 기다렸다가 풀리면 이어서 머지한다

Bead: `UI-aui8` · 날짜: 2026-11-25 · 출처: dotfiles `dotfiles-4ief3`(PR #710)

## 1. 목표

2026-11-25 22:16:47에 머지 큐는 PR #710을 `merge_failed:gh_failed`로 한 번 보류했다. 22:18:44에는 머지 직전 재확인을 `verify_candidate_stale`로 거부하고, head에 고정된 자동 머지 제외를 기록한 뒤 PR을 큐에서 뺐다. 그 사이 PR head도 main도 바뀌지 않았다. 같은 시간대에 GitHub 접속 실패가 관측돼, 실제 후보 변경이 아니라 재조회 실패로 보인다. 사람이 다시 누를 때까지 PR은 `머지 실패 — verify_candidate_stale`로 멈춰 있었다. 22:23의 `[머지]` 클릭도 아무것도 바꾸지 못했는데, 기록에는 결과 없이 "[머지] 클릭"만 남았다.

이 변경 뒤 머지 큐는 다음처럼 동작한다.

- GitHub 접속 장애, 호출 시간 초과, 호출 한도로 생긴 실패는 실패가 아니라 대기다. 그 PR만 보류하고 뒤 PR은 계속 처리한다. 연결이 돌아오면 사람 손 없이 이어서 머지한다.
- 대기가 30분(설정) 넘게 풀리지 않으면 Discord로 한 번 알린다. 그 뒤에도 기다림은 계속된다.
- 확인은 성공했는데 PR head·base가 실제로 바뀌었으면, 그 자리에서 머지 조건을 다시 판정한다. 연속 세 번이면 제외한다.
- 인증 실패와 원인을 모르는 실패는 사람이 고쳐야 하는 실패로 보고, 한국어 사유를 보여 준다. 다른 PR의 머지는 막지 않는다.
- `[머지]` 클릭이 거부되면 Worker 탭과 모니터 탭 모두 이유를 보여 주고, 이력에도 결과가 남는다.

사용자 결정(2026-11-25): 그 PR만 보류한다. 30분이 넘으면 알림을 한 번 보낸다. 진짜 낡은 후보는 자동으로 다시 판정한다.

## 2. 검증된 전제

인용은 beads-ui `bcd751edf4364be6fc530e479c19e61274ff0146` 기준이다.

- 머지 직전 재확인은 PR 재조회 실패, PR이 OPEN 아님, head 불일치, base 재조회 실패, base 불일치의 다섯 조건을 모두 `verify_candidate_stale` 하나로 거부한다. PR의 base 브랜치 이름은 비교하지 않는다 — `server/worker/pr-actions.js:3866-3885`
- 이 재확인은 `verification.repo_operations`가 참일 때 돈다. 게이트는 `[verify]` 스크립트가 없어도 저장소 작업이 있으면 참을 넘긴다 — `server/worker/pr-actions.js:1315-1323`
- 머지 명령 실패는 `merge_failed:<사유>`로 거부된다. 명령은 `--match-head-commit`으로 게이트가 본 head에 고정된다 — `server/worker/pr-actions.js:3899-3910`, `server/worker/gh.js:936-962`
- 명령이 성공한 뒤 상태를 읽지 못하거나 아직 OPEN이면 `merge_unconfirmed`다. 큐는 머리를 유지한 채 다시 관측하며, 관측 실패와 OPEN을 같게 다룬다. 기한이 지나면 `merge_unconfirmed_timeout`으로 제외한다 — `server/worker/pr-actions.js:3912-3936`, `server/worker/merge-queue.js:1604-1650`, `server/worker/merge-queue.js:2341-2360`, `docs/adr/UI-ny0h-merge-queue-and-resolution-wait-setting.md:28`
- 게이트의 PR 관측 실패는 `{ error }`로 돌아오고, 관측 캐시의 PR을 비운다. 머지 클릭은 그 사유로 거부된다 — `server/worker/pr-actions.js:1001-1029`, `server/worker/pr-actions.js:3706-3710`, `server/worker/pr-observations.js:181-196`
- 게이트는 PR이 이미 MERGED이면 머지하지 않고 정리로 간다. `cleanup_failed`가 있으면 정리 재시도를 부른다 — `server/worker/pr-actions.js:3735-3750`
- PR 폴러도 MERGED를 관측하면 같은 정리를 시작한다 — `server/worker/pr-poller.js:520-530`
- `gh` 어댑터는 127이 아닌 모든 0 아닌 종료를 `gh_failed` 하나로 돌려주고 오류 원문을 읽지 않는다. 호출에 시간 상한을 넘기지 않는다 — `server/worker/gh.js:216-218`, `server/worker/gh.js:309`, `server/worker/gh.js:336`, `server/worker/gh.js:368`
- 셸 실행기는 오류 원문을 수집하고 `timeout_ms`를 지원한다 — `server/bd.js:374-378`, `server/bd.js:385-390`
- base 재조회(`git fetch`)는 실패 원문을 `network`·`auth`·`missing_ref`·`ref_lock`·`unknown`으로 분류한다. 호출 한도와 HTTP 429·5xx는 분류하지 않는다. 원문은 보관하지 않는다 — `server/worker/target-base.js:72-104`, `server/worker/target-base.js:405-413`
- 외부 저장소 base 조회는 실패 원인 없이 `{ ok: false }`를 돌려준다 — `server/worker/foreign-target.js:585-592`
- 일반 항목의 처리에서 리뷰 영수증 사유는 보류로 간다. 보류는 자리와 권한을 유지하며 실패나 제외가 되지 않고, 뒤 항목은 계속 처리된다. 그 밖의 알려지지 않은 거부는 `failAndDequeue`로 간다 — `server/worker/merge-queue.js:728-733`, `server/worker/merge-queue.js:2242-2258`, `server/worker/merge-queue.js:2434`
- 보류 기록은 `{ reason, head_sha, since }`와 선택 필드 `auto_review_wait`다. 같은 사유와 head면 `since`를 유지하고 저장하지 않는다. 이때 저장소는 `ok: false`를 돌려주고, `writeHold`는 저장 오류를 로그로만 남긴다 — `server/worker/queue-store.js:1140-1155`, `server/worker/queue-store.js:14612-14626`, `server/worker/merge-queue.js:747-768`
- 보류가 있으면 PR 관측 pass의 큐 변경 신호가 드레인을 다시 돌린다. 리뷰 보류에 들어가면 자동 리뷰 세션 판정이 함께 돈다 — `server/worker/merge-queue.js:979-983`, `server/worker/merge-queue.js:944-949`
- `failAndDequeue`는 관측 head가 없고 폴러가 그 행을 관측하면 `halted_on_head`로 드레인을 멈춘다 — `server/worker/merge-queue.js:1054-1103`
- 충돌 해소 경로는 머지 결과를 판정하기 전에 해소 횟수를 차감할 수 있다. base 뒤처짐의 `updateBase` 실패는 곧바로 `failAndDequeue`로 간다 — `server/worker/merge-queue.js:1825-1840`, `server/worker/merge-queue.js:2371-2399`
- 머지 시도마다 처분 전에 `merge_step` 이력을 쓴다 — `server/worker/merge-queue.js:1708-1724`
- 큐가 비어 있지 않은 동안 PR 폴러가 돈다(기본 45초) — `server/worker/pr-poller.js:311`, `server/timing-settings.js:119`
- 완료 의도 항목은 두 곳에서 GitHub를 읽는다. 관측(`completionGate` → 실패면 `undecidable`)과 머지 거부 뒤 재판정이며, 처분표에 없는 사유는 `human`(종단)이다 — `server/worker/completion-intent.js:2488-2495`, `server/worker/completion-intent.js:2661-2667`, `server/worker/completion-intent.js:266-291`, `server/worker/completion-intent.js:377-381`, `server/worker/completion-intent.js:4378-4398`
- 메모리 실패 기록(`failures`)은 다음 처리 시작 때만 지워진다 — `server/worker/merge-queue.js:304`, `server/worker/merge-queue.js:2143`
- 수동 클릭 확인이 PR head나 base를 읽지 못하면 원인 없이 `pr_identity_unreadable`로 거부된다 — `server/worker/attach.js:4199-4219`
- `[머지] 클릭` 이력은 결과와 무관하게 결과 없이 기록된다. 거부되면 큐 드라이버를 깨우지 않는다 — `server/ws/worker-handlers.js:6796-6815`, `server/ws/worker-handlers.js:6701-6714`
- 모니터 탭의 머지 클릭은 서버 응답을 안내하지 않는다 — `app/views/monitor/index.js:1240-1262`
- 큐에 있는 행은 `[머지]` 대신 `[취소]`를 그리고, `[보관]` 행은 `[머지]`가 없다 — `app/views/worker/pr-wait-row.js:1276-1290`
- PR 대기 행의 상태 배지는 하나다. 툴팁은 `live` 배지에만 붙는다. `머지 실패`와 `자동 제외` 배지는 주의 색이고, 매핑에 없는 사유는 원문이 보인다 — `app/views/worker/pr-wait-row.js:1217-1220`, `app/views/worker/pr-wait-row.js:119-163`, `app/views/worker/pr-wait-row.js:811-822`
- 알림 제목 표에는 `provider_hold`·`condition_wait` 같은 대기 제목이 있다 — `server/worker/notify.js:49-66`
- 대기는 종단이 아니므로 실패 대화를 자동으로 열지 않는다 — `docs/adr/UI-19sj-conversation-automatic-proceed.md:1370`
- "대기 사유 판정은 Discord로 알리지 않는다"는 Bead 대기 사유 판정(`action_required`·`overdue`)의 조항이다. 같은 조항이 공급자 보류 진입·회복 알림은 그대로라고 적는다. 알림 셋(`🙋 확인 필요`·`↪ Worker가 이어감`·`🙋 사람 인수`)은 대화형 멈춤 해결의 조항이다. 둘 다 머지 큐의 시스템 보류 알림을 다루지 않는다 — `docs/adr/UI-19sj-conversation-automatic-proceed.md:1334-1336`, `docs/adr/UI-19sj-conversation-automatic-proceed.md:1354`, `docs/adr/UI-19sj-conversation-automatic-proceed.md:1479-1486`
- 미확인: 22:16–22:18의 실패가 접속 장애였는지 — 서버 로그에 원문이 없다. 이 세션에서 직접 관측한 GitHub 접속 실패(`gh api`·`git fetch` 시간 초과)는 22:28–22:36이다.
- 미확인: 22:23 클릭이 정확히 어느 거부 분기로 끝났는지 — 서버가 거부 사유를 기록하지 않는다. `pr_identity_unreadable`로 추정한다.

## 3. 설계

### 3.1 GitHub 실패 분류

머지 판단과 재관측에 쓰는 원격 호출이 실패하면, 결과는 지금의 사유 코드와 함께 분류 하나를 갖는다. 이 호출은 `gh` 호출, 일반 base fetch, 외부 저장소 base fetch다. 분류표는 셋이 하나를 같이 쓴다.

| 분류 | 뜻 | 예: 원문 |
| --- | --- | --- |
| `network` | 접속 불가, 시간 초과, 연결 끊김, GitHub 5xx | `dial tcp`, `i/o timeout`, `TLS handshake timeout`, `connection reset`, `could not resolve host`, `HTTP 500/502/503/504` |
| `rate_limit` | API·git 호출 한도 | `API rate limit exceeded`, `secondary rate limit`, `HTTP 429` |
| `auth` | 인증 만료, 권한 없음 | `HTTP 401`, `Bad credentials`, `gh auth login`, `Authentication failed`, `Permission denied (publickey)` |
| `unknown` | 그 밖 | — |

- 각 호출에는 유한한 호출별 시간 상한을 둔다(예: 60초). 상한을 넘겨 끝난 호출(일반 base fetch의 종료 코드 124 포함)은 `network`다. 이 상한은 한 호출의 상한일 뿐이고, 3.3 보류에는 상한이 없다.
- 원문은 저장하지 않고 분류만 넘긴다. 자격 증명이 섞일 수 있어서이며, `target-base.js`의 선례와 같다.
- **일시 실패**는 `network`와 `rate_limit`이다.
- 결정: `auth`·`unknown`·`gh` 없음·응답 해석 실패는 일시 실패가 아니다. 원인 모를 실패를 끝없이 기다리지 않기 위해서다(대안: 모든 실패를 대기로 둔다. 인증 만료가 조용히 무한 대기가 된다).

### 3.2 머지 차례의 GitHub 호출

일시 실패는 아래 지점 어디서든 하나의 연결 대기 사유(예: `github_unreachable`)가 된다. 실패 지점은 사유가 아니라 부가 정보로 남긴다.

1. **게이트 읽기**: PR 관측과 그 재관측, base 재조회.
2. **머지 직전 재확인**: PR과 base 재조회.
3. **머지 명령**: `gh pr merge`.
4. **머지 명령 뒤 상태 확인**: 3.5.
5. **충돌 해소·base 갱신 경로**: 머지 가능성 조회와 `updateBase`. 일시 실패면 해소 횟수를 차감하지 않고 원격 변경을 다시 시도하지 않는다. 다음 관측에서 다시 판정한다.

머지 직전 재확인의 결과는 다음 순서로 처분한다.

1. 하나라도 일시가 아닌 실패면 3.6 영구 실패다.
2. 하나라도 일시 실패면 3.3 보류다. 다른 쪽이 변경을 보였어도 보류가 이긴다. 보류 뒤 재판정이 게이트부터 다시 돌기 때문이다.
3. 둘 다 성공했고 PR이 OPEN이 아니거나, head·base 끝·PR의 base 브랜치 이름 중 하나라도 게이트가 검증한 값과 다르면 3.4다.
4. 그 밖이면 머지 명령으로 간다.

머지 명령 실패는 GitHub에서 실제로 머지된 뒤일 수 있다. 그래도 보류 뒤 재판정은 게이트부터 돌고, 게이트는 MERGED를 먼저 본다. 명령도 `--match-head-commit`으로 head에 고정돼 있다. 그래서 다시 시도해도 다른 커밋이 머지되지 않는다. 정리 단일 실행은 3.3에서 다룬다.

결정: 사유 코드 이름(`github_unreachable`, `verify_candidate_moved` 등)은 예시다. 구현이 지키는 것은 3.1–3.9의 동작과 5의 수락 기준이다(대안: 이름 고정. 아직 이 이름을 읽는 외부 소비자가 없다).

### 3.3 연결 대기 보류

일시 실패는 그 항목을 보류로 둔다. 기존 리뷰 보류와 같은 보류 기록을 쓰고, 사유만 연결 대기다.

- **정체**: 보류의 정체는 "연결 대기" 하나다. 실패 지점이 바뀌어도 같은 보류다. `since`와 알림 표시를 유지하고, 마지막 실패 지점과 분류만 갱신한다.
- **수명**: 재판정 턴이 일시 실패가 아닌 처분으로 확정될 때만 보류를 다음 상태로 옮긴다. 다음 상태는 머지 완료, 정리 인계, 리뷰 보류, 3.4 재판정 반복 뒤의 처분, 영구 실패, 제외 중 하나다. 게이트 통과만으로 보류를 지우지 않는다. 같은 턴의 재확인이나 머지 명령이 다시 일시 실패하면 같은 보류가 이어진다.
- **유지하는 것**: 큐 자리와 머지 권한(수동 클릭 권한 포함). 메모리 실패 기록, 제외 기록, dequeue는 쓰지 않는다. 보류에 들어갈 때 그 항목의 메모리 실패 기록은 지운다.
- **뒤 항목**: 같은 드레인의 뒤 항목은 계속 처리한다.
- **재판정**: 큐가 돌 때마다 게이트부터 다시 판정한다. 폴러의 관측 pass가 기본 45초마다 돈다.
- 결정: 시간이나 횟수로 보류를 제외로 바꾸지 않는다(대안: 30분 뒤 제외. 사용자가 고르지 않았다). 사람이 할 수 있는 일은 기존 `[취소]`·`[보관]`·폐기 그대로다.
- **띄우지 않는 것**: 연결 대기 보류는 자동 리뷰 세션, 해소 세션, 실패 대화를 띄우지 않는다.
- **정리**: 재판정이 MERGED를 보면, 폴러가 이미 시작했거나 끝낸 정리 결과를 그대로 받아들인다. 연결 대기 재판정은 실패한 정리를 다시 돌리지 않는다. `cleanup_failed`는 기존 배너와 사람 조작이 맡는다.
- **저장**: 보류 기록의 "변경 없음"과 "저장 실패"를 구분한다. 저장 실패는 UI-yk55 §3.2대로 dequeue하지 않고 이번 드레인을 끝낸다.
- 보류는 큐 파일에 있으므로 서버 재시작 뒤에도 남고, 다음 드레인이 다시 판정한다.

### 3.4 진짜 낡은 후보

재확인이 3.2의 3번을 관측하면, 같은 차례에서 게이트부터 다시 돈다. 이것은 기존 `mergeability_changed`와 같은 처리다.

- 게이트는 새 head·base로 영수증과 `[verify]`를 다시 판정한다. 새 head에 리뷰 영수증이 없으면 기존 리뷰 보류로, 검증이 실패하면 기존 검증 실패 처분으로 간다. MERGED와 CLOSED는 게이트의 기존 처분을 따른다.
- 한 차례에서 연속 세 번 낡음을 관측하면 그때 제외한다. 사유는 낡은 후보 반복(예: `verify_candidate_moved`)이고, 한국어 문구는 "머지 직전 후보가 계속 바뀜"이다. 제외 기록의 head는 세 번째 재확인이 직접 본 head다. 이 head를 제외·dequeue의 원자적 쓰기에 넘겨, 다음 관측이 같은 head를 다시 편입하지 않게 한다.

### 3.5 머지 명령 뒤 상태 확인

- 명령 성공 뒤 상태를 기다리는 동안 큐 머리를 유지하는 기존 동작(ADR UI-ny0h)은 바꾸지 않는다. 명령이 성공했으므로 머지는 거의 확실하고, 확인만 남았기 때문이다.
- 기한이 지났을 때 마지막 관측이 일시 실패였으면 제외하지 않는다. 그 항목은 연결 대기 보류가 되고 턴을 양보한다. 보류의 `since`는 그 대기에서 처음 일시 실패한 시각이다. 마지막 관측이 OPEN이면 지금처럼 `merge_unconfirmed_timeout`으로 제외한다.

### 3.6 영구 실패

`auth`·`unknown` 같은 일시가 아닌 실패의 처분이다.

- **현재 head를 읽었으면**: 지금처럼 그 head에 고정된 제외로 처리한다. 사유에 분류를 담는다(예: `gh_failed:auth`, `merge_failed:unknown`, `verify_candidate_unreadable:auth`).
- **head를 읽지 못했으면**(게이트의 첫 PR 조회 실패): head를 추정하지 않는다. 드레인을 멈추는 `halted_on_head`로 가지 않고, 그 항목만 영구 실패 보류로 둔다.
  - 보류는 자리를 유지하고 턴을 양보하며, 큐가 돌 때마다 다시 판정한다.
  - 배지는 주의 색의 분류 문구다.
  - Discord 알림은 진입 때 한 번 보낸다. 기다려도 풀리지 않는 실패라서 30분을 기다리지 않는다.

### 3.7 완료 의도 항목

Worker가 자동 머지로 이어가는 항목은 완료 의도가 관측과 머지 결과를 처분한다. 두 진입점 모두 같은 규칙을 따른다.

- **관측**: `completionGate`가 일시 실패하면 `undecidable`로 종단에 가지 않는다. 단계(phase)와 실행 기록을 그대로 둔 채 연결 대기 표시를 남기고, 다음 관측(폴러 pass)이 다시 판정한다.
- **머지 결과**: 3.2의 일시 실패와 3.5의 기한 처분은 `needs_human`이 되지 않는다. 같은 연결 대기로 남는다.
- **낡은 후보**: 기존 완료 게이트 재판정이 `gating`으로 되돌린다. 재판정 자체가 일시 실패하면 연결 대기다. 연속 세 번 낡음이면 3.4와 같은 사유로 끝낸다(완료 의도의 종단 처분).
- 그 행은 3.9와 같은 `GitHub 연결 대기` 배지를 보이고, 3.8의 알림 시계 하나를 쓴다. 연결 대기의 정체·`since`·알림 표시는 큐 항목과 완료 의도 중 한 곳에만 둔다. 구현은 어느 쪽이든 고를 수 있다.

### 3.8 알림

- 연결 대기 보류가 시작(`since`)부터 새 타이밍 설정(예: `merge_github_wait_notify_seconds`, 기본 1800초, 범위 300–14400, 분 단위 표시) 동안 풀리지 않으면 Discord 알림을 보류당 한 번 보낸다.
  - 제목 예: `🤖 ⏳ GitHub 연결 대기`
  - 본문: Bead, PR, 대기 시작 시각, 마지막 실패 지점, 분류
- 판정은 재판정 때 `since`와 현재 시각을 비교해서 한다. 새 타이머는 두지 않는다.
- 보낸 표시는 보내기 전에 보류 기록에 쓴다. 재시작 뒤에도 다시 보내지 않는다. 보류가 다음 상태로 옮겨졌다가 다시 생기면 새 보류로 센다.
- 회복 알림은 보내지 않는다. 머지되면 기존 머지 결과 경로가 알린다.
- 알림 실패는 큐 전이를 막지 않고, 다시 보내지도 않는다.

### 3.9 표시

- PR 대기 행의 상태 배지는 연결 대기 보류일 때 `GitHub 연결 대기`다.
  - 진행 중인 대기이므로 `live` 배지로 그린다. 주의 색이 아니고, 기존 렌더러가 툴팁을 붙인다.
  - 툴팁: 대기 시작 시각, 마지막 실패 지점, 분류
  - 배지 resolver 순위: `머지 중`보다 아래, `머지 실패`·`자동 제외`보다 위
  - 새 슬롯 없이 기존 상태 배지 자리를 쓴다. Worker 탭과 모니터 탭이 같은 배지를 보인다.
- 영구 실패 보류와 제외 사유는 분류로 한국어 문구를 고르고, 지점은 툴팁에 둔다. 예:

  | 사유 | 문구 |
  | --- | --- |
  | 낡은 후보 반복 | 머지 직전 후보가 계속 바뀜 |
  | 분류 `auth` | GitHub 인증 실패 |
  | 분류 `unknown` | GitHub 확인 실패 |

- 이력은 보류 진입 한 줄(예: `머지 큐 · GitHub 연결 대기 — <지점>`)과 다음 상태로 옮길 때 한 줄만 쓴다. 일시 실패한 시도는 시도별 `merge_step` 이력에서 거른다. 재판정마다, 지점이 바뀔 때마다 줄을 쓰지 않는다.
- 큐에 있는 행의 조작은 지금처럼 `[취소]`다. 연결 대기 행에 새 조작을 달지 않는다.

### 3.10 `[머지]` 클릭

`[머지]`는 큐에 없는 행에만 있다.

- 클릭 확인이 일시 실패로 PR을 읽지 못하면 연결 대기 사유로 거부한다. 안내 문구는 "GitHub에 연결되지 않아 머지 큐에 넣지 못했습니다 — 연결이 돌아오면 다시 눌러 주세요"다. PR의 head를 고정할 수 없어 큐에 넣지 않는다.
- 일시가 아닌 실패는 분류를 담은 사유와 3.9의 문구로 거부한다.
- 모니터 탭도 Worker 탭과 같은 거부 안내를 띄운다.
- `[머지] 클릭` 이력 요약에 결과를 싣는다(예: `[머지] 클릭 — 큐 등록`, `[머지] 클릭 — 거부: <한국어 사유>`).

## 4. 오류 처리

- 보류 기록을 쓰지 못하면 dequeue하지 않고 이번 드레인을 끝낸다(UI-yk55 §3.2). "변경 없음"은 실패가 아니다.
- 분류할 수 없는 원문은 `unknown`이다. 일시 실패로 보지 않는다.
- 보류 중 PR이 큐에서 빠지면(취소·보관·폐기·머지 완료) 보류와 알림 표시도 함께 사라진다.
- 저장된 이전 보류 기록에 알림 표시가 없으면 아직 보내지 않은 것으로 본다.

## 5. 수락 기준

1. 머지 직전 재확인에서 PR 재조회가 `network`로 실패하면, 항목은 같은 자리에 연결 대기 보류로 남는다. 제외 기록과 메모리 실패 기록이 없고, 뒤 항목은 같은 드레인에서 처리된다.
2. 게이트 읽기·재관측, 일반·외부 base 재조회, 머지 명령, 충돌 해소·base 갱신 경로가 `network`(호출 시간 초과와 HTTP 5xx 포함)나 `rate_limit`(HTTP 429 포함)으로 실패해도 1과 같다. 해소 횟수는 차감되지 않는다.
3. 보류 뒤 관측이 성공하면 사람 클릭 없이 게이트를 통과해 머지된다. 머지 명령 실패 뒤 실제로는 MERGED였으면 정리로 간다. 폴러가 먼저 정리를 시작한 경우에도 정리는 한 번만 돈다.
4. 보류 시작부터 설정 시간이 지나면 알림이 한 번 간다. 재시작 뒤에도 다시 가지 않는다. 회복 알림은 없다.
5. 30분보다 길게 실패해도 항목은 제외되지 않는다. 실패 지점이 바뀌어도, 같은 턴에서 게이트를 통과한 뒤 다시 일시 실패해도 `since`와 알림 표시가 유지된다.
6. 머지 명령 성공 뒤 상태 확인이 기한까지 일시 실패하면, 제외되지 않고 연결 대기 보류가 되어 턴을 양보한다. 기한까지 OPEN이면 지금처럼 제외된다.
7. 현재 head를 읽은 `auth`·`unknown` 실패는 그 head에 고정된 제외가 되고, 배지에 분류별 한국어 사유가 보인다. head를 읽지 못한 경우에는 드레인이 멈추지 않는다. 그 항목만 영구 실패 보류가 되고 알림이 한 번 간다.
8. 재확인에서 head, base 끝, PR의 base 브랜치 이름 중 하나가 바뀌면 같은 차례에서 게이트를 다시 돈다. 연속 세 번이면 세 번째에 본 head로 제외되고, 다음 관측이 그 head를 다시 편입하지 않는다. 한쪽 재조회가 일시 실패하면 다른 쪽 변경과 무관하게 보류된다.
9. 완료 의도 항목은 관측과 머지 결과의 일시 실패에서 `needs_human`이 되지 않는다. 단계와 실행 기록을 유지한 채 기다리고, 같은 배지와 알림 규칙을 따르며, 낡음 세 번 상한도 같다.
10. 연결 대기 보류는 자동 리뷰 세션, 해소 세션, 실패 대화를 띄우지 않는다.
11. PR 대기 행 배지는 `GitHub 연결 대기`(live, 툴팁 있음)이고, Worker 탭과 모니터 탭이 같으며, 행의 조작은 `[취소]`다.
12. GitHub 접속 실패 중 큐에 없는 PR의 `[머지]` 클릭은 연결 대기 사유로 거부된다. 두 탭 모두 안내를 띄우고, 이력에 거부 결과가 남는다.
13. 보류 진입과 다음 상태로 옮길 때 이력이 한 줄씩만 남는다. 실패 지점이 바뀌는 재판정을 여러 번 해도 같다.
14. 리뷰 영수증 보류, 명령 성공 뒤 OPEN 대기, 충돌 해소, `[verify]` 실패 처분은 바뀌지 않는다.

## 6. 시험

Test scope — GitHub 실패 분류와 호출 상한, 머지 차례의 일시 실패 처분, 보류 수명·정리 단일 실행·알림, 완료 의도 처분, 클릭 거부와 이력, 배지.

각 변경 지점에 수정 전 base에서 실패하는 양성 단언을 붙인다.

- `server/worker/gh.test.js`: 분류 표의 원문별 분류, 호출 시간 초과를 `network`로 분류.
- `server/worker/pr-actions.test.js`: 수락 기준 1·2·7·8의 거부 사유, base 브랜치 이름 변경, 머지 명령 실패 뒤 MERGED 관측.
- `server/worker/merge-queue.test.js`: 수락 기준 1·2·3·4·5·6·7·8·10·13. 폴러가 먼저 정리를 시작하는 순서를 포함한다.
- `server/worker/completion-intent.test.js`: 수락 기준 9의 두 진입점.
- `server/worker/manual-merge-enqueue.test.js`, `server/ws.worker-queue.test.js`: 수락 기준 12의 서버 쪽.
- `server/worker/notify.test.js`: 대기 알림 제목과 본문.
- `app/views/worker/index.test.js`: 수락 기준 11의 배지 순위·live·툴팁·`[취소]`, 수락 기준 12의 Worker 탭 안내.
- `app/views/monitor/index.test.js`: 수락 기준 11·12의 모니터 탭.
- 회귀 시험(수정 전에도 통과): 원문 미보관, 수락 기준 14의 기존 처분 유지.
- baseline_red: 수락 기준 1의 시험은 수정 전 base에서 실패한다(`verify_candidate_stale`로 제외되고 dequeue된다).
- 이어서 `npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`

## 7. 경계·후속

후속 Bead 없음.

- 비목표: 큐 전체 정지. 공급자 장애 보류와의 통합. 같은 revision에서 반복된 클릭 이력이 한 줄로 합쳐지는 동작. 머지 명령 성공 뒤 상태 확인 대기의 큐 머리 점유(ADR UI-ny0h).
- 관찰: 거부된 클릭은 이전 실행의 메모리 실패 기록을 지우지 않는다. 이 설계에서는 연결 장애가 실패 기록을 남기지 않으므로 이번 사례는 생기지 않는다. 다른 사유의 경우는 바꾸지 않는다.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-ny0h — 단일 순차 드라이버를 따른다. MERGED 관측으로 완료하고, 명령 성공 뒤 확인 대기는 큐 머리를 유지한다. 실패 예산은 head에 고정된 제외가 맡는다. 일시 GitHub 장애는 실패가 아니므로 그 예산을 쓰지 않는다. 확인 대기의 기한 처분만 3.5대로 보류가 되는데, 이 조항은 기한 처분을 정하지 않는다.
- 전제: ADR UI-19sj — 대기는 종단이 아니므로 실패 대화를 자동으로 열지 않는다. 카드 상태 배지는 기존 자리 하나를 쓴다. 연결 대기 알림은 공급자 보류 진입·회복 알림과 같은 시스템 보류 알림이다. 대기 사유 판정 무알림 조항과 대화 알림 셋 조항의 대상이 아니다(2절).
- 머지 큐와 완료 의도에서 `network`·`rate_limit`으로 분류된 GitHub 실패를 제외 대신 상한 없는 보류로 두고, 설정 시간 뒤 한 번 알린다 — 되돌리기 어렵지 않다. 바뀌는 소비자는 셋이다. 첫째는 머지 큐·완료 의도·`gh` 어댑터의 분기다. 둘째는 큐 저장 보류 기록이며, 기존 형식에 선택 필드만 더하므로 옛 코드도 보류로 읽는다. 셋째는 타이밍 설정 하나와 배지 표시다. 모두 beads-ui 한 저장소, 한 번의 배포 안에 있고, 다른 저장소나 도구가 소비하지 않는다. 그래서 되돌리기는 PR 하나로 끝난다 → ADR 아님
- 분류 원문 패턴, 호출 시간 상한 값, 배지·알림 문구, 알림 시간 기본값 — 조정 가능한 수치와 표시 형식(기본 제외 목록) → ADR 아님
