# worker 실패 attempt 이어하기(세션 resume) + verify_cmd 자동 감지 (UI-nr98)

배경 실측(dotfiles-rdwr 사례): 세션이 꼬리 단계(PR Delivery 장부)에서 끊기면 attempt는
`failed`(cause=`verify_failed:*`)로 남고 breaker가 걸린다. 현재 복구 수단은 새 풀런뿐인데,
bead가 `in_progress`면 후보 lane(`bd ready`)에 나타나지 않아 재큐도 불가능하다. 한편
session_id는 UI-azj6부터 attempt에 영속된다(claude `session_id` / codex `thread_id`).
verify_cmd는 `config.toml [worker.verify."<abs>"]` 수동 설정뿐이라 미설정 repo는
auto_merge가 pr_stop으로 강등된다(`demoted_reason=verify_cmd_unset`).

- 라우팅 ledger: (1) 이어하기 → bead:UI-nr98 §1 · (2) 자동 감지 → bead:UI-nr98 §2.

## §1 실패 attempt 이어하기 (수동 resume)

1. **UI 진입점 2곳** — session_id 있는 `failed`/`orphaned` attempt 대상 "↻ 이어하기" 버튼:
   - detail-panel 세션 이력의 해당 행(행 클릭=드로어 열기 관례와 충돌하지 않게 별도 버튼).
   - worker breaker 배너(최신 실패 attempt 대상).
   session_id 없는 구 attempt는 버튼 비활성 + title에 사유. **자동 재큐·자동 resume 없음** —
   breaker가 걸렸다는 건 어긋남의 신호이므로 사람의 명시 클릭만 진입점이다.
2. **ws mutation `worker-attempt-resume { attempt_id }`** (기존 CAS revision 규약 동일).
   거부 사유는 admission 배지 관례로 반환: `not_failed`(failed/orphaned 아님) ·
   `no_session_id` · `worktree_missing`(bead 워크트리 부재 — 재생성하지 않고 거부로 단순화) ·
   `bead_running`(같은 bead의 running attempt 존재) · `already_resumed`(이 attempt를
   `resumed_from`으로 갖는 child attempt가 이미 존재 — 재-resume로 인한 장부/PR 중복 실행
   방지; child의 성패와 무관하게 ancestor는 영구 소진, 판정은 attempts 스캔으로 파생하므로
   cold reload에도 유지) · `runner_unavailable`(prior runner 스냅샷 부재/미지원 enum).
   **breaker 처리: resume 디스패치는 해당 repo의 breaker를 리셋한다** — ↻ 클릭은 ▶와
   동급의 명시적 사람 개입이며, merge-lock의 `isMergeBlocked`가 같은 breaker를 읽으므로
   (runtime.js:47) 리셋 없이는 auto_merge resume이 락 단계에서 다시 막힌다. 락/토큰
   예외 규칙은 만들지 않는다.
3. **디스패치** (scheduler `resume(workspace, attempt_id)`):
   - 새 attempt_id 발급 + `resumed_from: <prior attempt_id>` 기록 — Attempt typedef와
     `makeAttempt()` whitelist에 필드 추가(UI-azj6 §2에서 확인된 드랍 함정).
   - **워크트리 재사용**: `worktree.add`·admission 재검사 생략. base 전진 대응은 세션의
     drift 계약(auto_rereview 등)에 위임한다 — resume의 목적이 "남은 계약 단계 마무리"이므로
     서버가 미리 막지 않는다.
   - **prior 스냅샷 전면 승계(재해석 금지)**: repo/target_base/base_oid에 더해
     runner/model/effort, resolved `merge_policy`/`drift_policy`/`demoted_reason`,
     그리고 관측된 `merge_sha`를 prior attempt에서 그대로 복사한다. 전역 exec_defaults·
     정책의 현재값으로 재해석하지 않는다 — 강등된 `pr_stop`이 auto_merge로 되살아나거나,
     머지 후 orphan된 attempt가 `merge_sha` 없이 독립 검증에 들어가는 일을 막는다.
     workflow_mode/exec 재스탬핑도 prior 스냅샷 값으로 수행한다.
   - 토큰 발급, sessionLog attach, session_id 재캡처, onSessionDone(독립 검증 포함)은
     기존 dispatch 경로를 재사용한다.
4. **runner resume argv** — 어댑터는 **prior `runner` 스냅샷으로 고정**(claude session_id를
   codex에 넘기거나 ccx 라우팅 없이 실행하는 일 방지; 부재/미지원은 §1.2 `runner_unavailable`
   거부). AdapterSpec에 resume 분기(설정 `settings.resume_session_id`):
   - claude/ccx: `claude -p --output-format stream-json --verbose --resume <session_id>
     [--model…] [--effort…] --permission-mode bypassPermissions "<이어하기 프롬프트>"`
   - codex: `codex exec resume <thread_id> --json --skip-git-repo-check "<이어하기 프롬프트>"`
   - 이어하기 프롬프트: 이전 세션 중단 고지 + 워크트리/bead/PR 현재 상태 자가 점검 지시 +
     "남은 계약 단계만 완료" 지시. merge-lock 등 preamble 블록은 기존 `applyPreamble`
     재사용(해당 attempt의 resolved 정책 기준).
   - fixture 어댑터는 resume 미지원(spawn_error 아닌 명시 거부 없이 일반 spawn으로 폴백해도
     테스트 목적상 무방 — 테스트에서 argv 분기만 검증).
5. **UI 표시**: resume attempt 타일·세션 이력에 `↻` 배지(title=`resumed_from` attempt id).
   이어하기 버튼은 **resume 계보의 최신 eligible attempt에만 활성** — `already_resumed`로
   소진된 ancestor는 비활성 + title 사유.

비목표: 자동 재큐/자동 resume, resume 시 서버 강제 재리뷰(게이트 신선도는 세션의 workflow
계약 소관), 삭제된 워크트리 재구성. (breaker 리셋은 §1.2대로 resume의 일부 — ▶ 외 자동
리셋 경로를 새로 만들지 않는다는 의미의 비목표는 유지.)

## §2 verify_cmd 자동 감지

1. **resolve 순서**: config 명시 설정 > 자동 감지 > 없음(기존 강등 규칙 불변 — 감지도
   없으면 auto_merge→pr_stop).
2. **감지 규칙** (보수적, dispatch 시 target repo 루트의 파일 존재/내용 검사만, 실행 없음):
   - `package.json` 존재 ∧ `scripts.test` 정의 → `["npm", "test"]`
   - `Cargo.toml` → `["cargo", "test"]`
   - `go.mod` → `["go", "test", "./..."]`
   - 그 외(python 등 툴체인·venv 모호) → 감지 없음, 명시 설정 요구.
   timeout은 기본 600000ms. 감지 명령도 기존과 동일하게 clean detached worktree에서 실행.
3. **출처 표기**: `verifyCmd(repo)` 반환에 `source: 'config'|'detected'` 추가, queue
   `workspace_info.verify_cmd`로 전파. ctrl 바 표시가 감지 출처면 `(자동 감지)` 병기
   (title에도 포함). demoted_reason은 config·감지 모두 없을 때만 기존대로.
4. 감지 실패/오탐 대비: config 명시 설정이 언제나 감지를 이긴다(문서 주석 + hint 문구에
   반영). 감지 결과가 실제로 실패하면 기존 `verify_cmd_failed` 경로 그대로(신규 상태 없음).

## Test scope

- §1: mutation 거부 6사유 각각(`already_resumed`는 child 성공/실패 양쪽 + cold reload
  파생 판정 포함), resume 디스패치(워크트리 재사용·`resumed_from` 영속·prior 스냅샷 전면
  승계 — 전역 설정 변경 후에도 prior runner/policy/merge_sha 유지·강등 pr_stop 불부활),
  breaker 리셋(리셋 후 해당 repo merge-lock acquire 가능 — ▶와 동일 의미론), claude/codex resume argv
  분기, UI 버튼 최신 leaf만 활성·`↻` 배지 렌더 — 기존 *.test.js에 추가.
- §2: 감지 규칙 3종 + 비감지 케이스, config 우선, 강등 상호작용(감지 존재 시 비강등),
  workspace_info source 전파·ctrl 바 표기.

## 검증

`npm run all`. resume 실동작은 로컬 워커에서 실패 attempt 1건으로 수동 실측(가능 시).
