---
scope:
  - app/styles/tokens.css
  - app/styles/base.css
  - app/styles.css
  - app/styles.worker-theme.test.js
  - app/utils/failure-sentences.js
  - app/utils/failure-sentences.test.js
  - app/utils/resume-flow.js
  - app/utils/resume-flow.test.js
  - app/utils/resume-instructions-dialog.js
  - app/utils/resume-instructions-dialog.test.js
  - app/views/worker/
  - app/views/monitor/
  - app/protocol.js
  - app/protocol.md
  - server/ws/worker-handlers.js
  - server/ws.worker-queue.test.js
  - server/ws/monitor-handlers.js
  - server/ws.monitor-pipeline.test.js
  - app/main.bundle.js
  - app/main.bundle.js.map
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-28-quickfix-settlement-resume-by-reason-design.md
  - docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md
  - docs/adr/
  - AGENTS.md
---

# UI-kyky — 실패 안내·작업 종류 색·외부 PR 표시 통일

- 상태: 사용자 검토용 초안. 2026-09-08 대화에서 승인한 변경안을 구체화했다. 색상
  값과 정본 반영 문구는 이 문서 검토 대상이다.
- 기준 코드: `7b63c5b961e070487ed38848c7799038b7b858fa` (재리뷰 정정 시 갱신. 원안
  `ed3ce09185bcac1ee756c2fbacee8efeb0bea081`).
- 소유: beads-ui, 기존 `route=spec_backed`, 하나의 구현·검증 단위.
- 함께 작성하는 스펙: [UI-ys18](2026-09-08-monitor-history-material-design.md),
  [UI-qce9](2026-09-08-running-session-instructions-restart-design.md).
- 구현 순서는 UI-kyky → UI-ys18 → UI-qce9다. 이는 착수 순서이며, 이 문서
  작성으로 새 `blocks` 간선을 만들지는 않는다.

## 1. 문제와 현재 근거

실패 화면이 원인만 보여 주거나 실제 거부 사유와 다른 문장을 표시한다. 사용자는
기다려야 하는지, 다시 눌러야 하는지, 세션에서 고쳐야 하는지 구분하기 어렵다.

| 현재 근거                                                                                                                                   | 영향                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `app/views/worker/index.js`의 `staleWorkAction`은 `conflict`에서 응답 `reason`을 읽지 않는다                                                | 다른 세션 점유·원격 브랜치 소유 문제도 모두 ‘상태가 바뀜’으로 표시              |
| `app/views/worker/running-grid.js`의 실패 팝업은 재개 가능 여부와 착지 여부를 표시하지만 다음 행동이 없고, 착지 후 안내가 `이어하기`로 고정 | 버튼이 `정산 재개`인 경우 설명과 이름이 다름                                    |
| `app/utils/failure-sentences.js`는 서버 완료 보고서도 읽는 의존성 없는 원인 사전                                                            | 화면 전용 동작을 원인 문자열에 무조건 붙이면 서버 보고서까지 잘못된 버튼을 안내 |
| `app/styles/tokens.css`의 밝은 테마는 단계색 `-dim`만 재정의                                                                                | 밝은 배경의 단계 글자와 검색 포커스 대비 부족                                   |
| `server/worker/external-pr.js`는 `foreign`, `repo_slug`, PR URL·번호를 계산하지만 `withExternalPrWait`가 합성 행에 전달하지 않음            | 외부 PR은 관측 오류로 보이고 대상 PR 링크를 그릴 재료도 없음                    |

`external`은 ‘Worker 밖 세션이 만든 PR’, `foreign`은 ‘현재 워크스페이스의
origin과 다른 저장소의 PR’이다. 두 사실은 서로 대체할 수 없다.

## 2. 사용자에게 보이는 변경과 대안

1. 작업 종류는 옅은 카드 배경과 기존 글자 칩으로 구분한다. 실패·실행·머지 상태의
   테두리와 배경이 있는 경우 그 상태 표시가 우선한다.
2. 실패 팝업의 원인 아래에 `다음` 행을 둔다. 원인과 현재 가능한 조작을 함께 읽어
   안내한다.
3. 세션을 띄우지 않고 착지 후 절차를 다시 수행하는 버튼은 `↻ 정리 재시도`로
   부른다. 세션 재개는 `↻ 이어하기`다.
4. 외부 PR은 기존 PR 링크 옆에 `↗ <owner/repo>`를 표시하고, 이 워크스페이스에서
   머지·정리하지 않는다는 설명을 제공한다.
5. 이전 작업 처리 거부는 실제 이유에 맞는 문장으로 바뀐다.

카드 테두리 전체를 작업 종류별로 바꾸는 대안은 상태색과 충돌한다. 칩만 바꾸는
대안은 긴 목록에서 카드 구분 효과가 작다. 따라서 중립 상태의 카드에만 낮은
채도의 배경을 적용하고, 상태 강조가 있는 카드에는 글자 칩으로 종류를 남긴다.

## 3. 작업 종류 색과 밝은 테마

### 3.1 판정과 우선순위

색 분류도 `routeChipValue`를 사용한다. `spec_backed`, `quick_fix`, `full_plan`,
`unset` 네 결과를 그대로 소비한다. 재료가 없는 `null`은 색 속성과 칩을 모두
생략한다. 파생 route를 명시적으로 핀된 route처럼 칠하지 않는다.

공유 카드 렌더러에 같은 분류를 한 번 전달한다. Worker·Monitor의 후보·대기·PR
대기·실행·완료·연결 레인 변형에 같은 규칙을 적용한다. CSS 우선순위는 다음과
같다.

1. 선택·포커스·실패·실행·머지 중·외부 세션 등의 기존 상태 표현.
2. 중립 상태의 작업 종류 배경.
3. 재료가 없을 때 기존 기본 배경.

작업 종류 규칙은 테두리, merge 진행 장식, 선택 ring, 드래그 표시, 검색 일치
판정, 카드 높이를 바꾸지 않는다. 이미 상태 배경이 있는
`.worker-mini--external`도 그 배경을 유지하고 route 칩으로 구분한다.

### 3.2 색상 값

색 정본은 `app/styles/tokens.css`다. 각 route에 `--route-<value>-bg`,
`--route-<value>-fg`를 정의하고 CSS 소비자는 토큰만 읽는다.

| 분류          | 어두운 배경 / 글자    | 밝은 배경 / 글자      |
| ------------- | --------------------- | --------------------- |
| `spec_backed` | `#122925` / `#5eead4` | `#e8f3f0` / `#0f766e` |
| `quick_fix`   | `#172338` / `#93c5fd` | `#edf2ff` / `#1d4ed8` |
| `full_plan`   | `#251d38` / `#c4b5fd` | `#f3edfb` / `#6d28d9` |
| `unset`       | `#171c26` / `#a9b4c6` | `#f2f5f9` / `#47536a` |

route 칩도 해당 배경·글자 토큰을 사용한다. `unset`은 글자와 점선으로 파생 상태를
구분한다. route 칩 자체의 `.is-derived` 불투명도 감소는 제거해 이 표의 글자
대비를 유지한다. 기존 비활성 카드·검색 비일치 행의 투명도 정책은 이번 작업에서
전역 변경하지 않는다.

밝은 테마의 단계별 `-on` 값은 아래로 바꾼다. 이 표가 UI-fj0b에서 넘어온 관측(밝은
테마에 `--stage-*-on` 재정의가 없어 흰 표면 위 대비 미달)을 흡수한다. `-dim`과
어두운 테마의 단계색은 유지한다. ‘on 값은 밝은 테마에서도 그대로’라는 토큰 파일 주석도 함께 정정한다.

| 토큰               | 밝은 테마 값 |
| ------------------ | ------------ |
| `--stage-spec-on`  | `#0f766e`    |
| `--stage-plan-on`  | `#1d4ed8`    |
| `--stage-impl-on`  | `#6d28d9`    |
| `--stage-pr-on`    | `#be185d`    |
| `--stage-merge-on` | `#166534`    |

토큰 자체 대비는 일반 글자 4.5:1 이상, 포커스 테두리 등 비문자 표식 3:1 이상을
요구한다. 검증 배경은 현재 밝은 테마의
app·panel·card·candidate·drawer·tile-run·gate-pill과 위의 새 route 배경 전부다.
서로 다른 단계의 의미는 기존 단계 이름·위치·상태도 함께 전달한다. 색만으로
상태를 읽게 하지 않는다. 비활성·검색 비일치의 기존 투명도 정책까지 접근성을
개선했다는 주장은 하지 않는다.

## 4. 실패 원인과 다음 행동

### 4.1 소유와 데이터 흐름

원인 사전 `FAILURE_SENTENCES`는 같은 파일·export를 유지한다. 그 파일에 ‘실패
토큰 → 다음 행동의 설명’과 ‘이전 작업 거부 토큰 → 문장’을 별도 export로 둔다.
기존 `STALE_WORK_CAUSES`는 잔여 작업 자체의 원인을 설명하므로 거부 사전과 합치지
않고 원래 소유 위치에 남긴다.

사전에는 DOM·네트워크·현재 큐 판정을 넣지 않는다. 렌더러가 현재 재개 종류,
`resume_eligible`, 실제로 표시되는 세션 열기 조작을 읽어 설명을 완성한다. 새
서버 `next_action` 필드나 workflow enum을 만들지 않는다.

합성 실패 코드의 매핑은 현재 `failureSentence`의 세부 토큰 우선 순서를 따른다.
알려진 코드가 없으면 새 `다음` 행은 생략하고 기존 원인·코드·상세를 남긴다.

### 4.2 안내 선택

| 현재 상태                                 | `다음` 문장                                                           |
| ----------------------------------------- | --------------------------------------------------------------------- |
| 알려진 실패 + 정리 재실행 가능            | `아래 [정리 재시도]를 눌러 실패한 착지 후 절차를 다시 실행하세요.`    |
| 알려진 실패 + 같은 세션 재개 가능         | `원인을 확인한 뒤 아래 [이어하기]로 같은 세션에서 작업을 계속하세요.` |
| 재개 불가 + 해당 실패 세션 열기 조작 존재 | 재개 불가 사유를 함께 보이고 `세션 기록을 열어 원인을 확인하세요.`    |
| 재개 불가 + 세션 열기 조작도 없음         | 버튼명을 만들지 않고, 존재하는 상세 사유 또는 로그 확인만 안내        |
| 미지 코드                                 | `다음` 행 생략                                                        |

위 문장은 모든 실패의 원인을 동일하게 취급한다는 뜻이 아니다. 알려진 원인별 선행
설명을 먼저 붙인다.

- `verify_cmd_failed`, `verify_script_failure`, `deploy_script_failure`,
  `verify_red`: 실패 명령·출력 확인 및 원인 수정이 선행이다.
- `base_fetch_failed`, `gh_observation_failed`, `base_ref_unobserved`,
  `merge_sha_unobserved`, `base_rev_unavailable`,
  `deployment_candidate_ancestry_check_failed`: 원격 연결·관측 상태 확인이
  선행이다.
- `base_ff_diverged`, `deployment_target_not_covering_merge`,
  `repo_ops_worktree_unowned`, `manual_target_missing`, `base_unresolved`:
  대상·소유·브랜치 상태를 세션에서 확인한다. 문구가 임의 reset·삭제를 지시하지
  않는다.
- `bootstrap_not_approved`: 기존 원인의 절차 안내에 남은 `[정산 재개]` 표기를
  `[정리 재시도]`로 맞춘다. 팝업은 Worker 설정의 `[배포 실행]`이라는 기존
  진입점을 가리키고, 현재 카드에 그 버튼이 있다고 말하지 않는다.
- `foreign_landing_unpinned`, `foreign_checkout_unavailable`,
  `foreign_deploy_unsupported`: 외부 대상의 설정 또는 원 세션에서의 배포·마감
  확인을 안내한다. 이 워크스페이스가 외부 배포를 대신한다고 말하지 않는다.
- `interrupted_without_terminal_exit`, `cleanup_failed`, `retry_exhausted`,
  `conflict_unresolved`, `internal_record_failed`, `repair_lane_retired`: 남아
  있는 원인·실행 기록 확인을 먼저 안내한다.

팝업의 기존 `재개` 행과 ‘이미 base에 착지됨’ 문장도 동일한 재개 종류로 작성한다.
정리 재시도 시 새 AI 세션을 연다고 표시하지 않는다. ‘세션 기록 열기’와 실제
실행을 재개하는 ‘이어하기’를 구별한다.

### 4.3 버튼 명칭 범위

quick_fix 착지 정산 버튼의 글자·`title`·`aria-label`·팝업·공유 원인 문장에 남은
명칭을 함께 바꾼다. `resume-instructions-dialog.js`의 제목은
`착지 후 정리 재시도`, 확인 버튼은 `정리 재시도`로 바꾸고, `resume-flow.js`의
거부 토스트도 `정리 재시도 거부`로 맞춘다. `resumeKindOf`의 판정,
`data-resume-kind`, 이벤트, 서버 resume 로직은 그대로다.

기존 머지 후 버튼의 `정리 재시도`, `배포 재시도 후 정리`,
`검증 재시도 후 정리`는 이미 대상 단계를 구분한다. 이 작업은 그 구체적인 문구를
지우지 않는다. UI-qce9의 `지시와 함께 재시작`은 살아 있는 세션을 대상으로 하므로
이 이름을 재사용하지 않는다.

## 5. 이전 작업 처리 거부 문장

`staleWorkAction`은 응답 스냅샷을 반영한 뒤 `reason`을 사전 조회한다.
`conflict`와 비충돌 `!ok` 모두 알려진 reason에는 같은 문장을 사용한다. 알 수
없는 conflict는 현행 일반 문구, 알 수 없는 비충돌 오류는 현행 raw reason 표시를
유지한다.

| reason                      | 문장                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `revision_conflict`         | `작업 목록이 갱신되었습니다. 현재 상태를 확인한 뒤 다시 선택하세요.`                       |
| `stale_work_conflict`       | `이전 작업의 확인 결과가 바뀌었습니다. 현재 표시된 상태를 확인하세요.`                     |
| `waiting_lane_changed`      | `대기열 배치가 바뀌었습니다. 현재 위치를 확인한 뒤 다시 선택하세요.`                       |
| `discard_in_progress`       | `이 작업의 폐기가 진행 중입니다. 끝난 뒤 상태를 확인하세요.`                               |
| `action_in_flight`          | `다른 작업 처리가 진행 중입니다. 끝난 뒤 다시 선택하세요.`                                 |
| `bead_running`              | `이 이슈의 세션이 실행 중입니다. 실행 상태를 먼저 확인하세요.`                             |
| `external_pr_owner`         | `다른 세션이 관리하는 PR이 있습니다. 해당 PR과 세션 상태를 먼저 확인하세요.`               |
| `remote_branch_owner`       | `원격 브랜치가 남아 있어 자동으로 처리할 수 없습니다. 브랜치와 PR 상태를 확인하세요.`      |
| `base_identity_changed`     | `기준 브랜치의 상태가 바뀌었습니다. 현재 기준 브랜치를 확인하세요.`                        |
| `worktree_identity_changed` | `작업 디렉터리의 식별 정보가 바뀌었습니다. 해당 작업 디렉터리를 확인하세요.`               |
| `remote_ref_observe_failed` | `원격 PR·브랜치 상태를 확인하지 못했습니다. 연결과 접근 권한을 확인한 뒤 다시 선택하세요.` |

`ownership_unknown`은 이전 작업 admission의 원인이지 이 액션의 응답 사유가
아니므로 거부 사전에 넣지 않는다. `staleWorkOwnerReason`이 실제로 반환하는
`remote_ref_observe_failed`를 정확히 매핑하며, 다른 소유권 세부 코드를 접두
일치로 뭉뚱그리지 않는다. 자동 재전송, 오래된 `action_id` 재사용, 버튼 활성 조건
변경은 하지 않는다.

## 6. 외부 PR의 전달과 표시

### 6.1 전달 경계

`ExternalPrRow`가 소유한 `foreign`, `repo_slug`, `pr_url`, `pr_number`를 실제
외부 PR 합성 행에 선택 필드로 싣는다. 기존 필드와 이름을 재사용하고, merge
queue만으로 합성한 행은 없는 값을 만들지 않는다. Worker snapshot과 Monitor
snapshot 모두 같은 `withExternalPrWait` 결과를 소비하도록 경로를 확인하고,
타입·프로토콜 문서를 함께 갱신한다.

공유 레인 모델은 이 네 필드를 보존한다. `foreign === true`이고 검증된 대상
URL·번호가 있는 행의 PR 링크는 해당 원본값으로 만든다. 같은 저장소 PR은 기존
관측된 PR 값이 우선한다. `repo_slug`만 보고 foreign을 재판정하지 않는다. 필드가
부족하면 원본 URL이나 저장소 이름을 지어내지 않는다.

### 6.2 화면

외부 PR의 대상 표시 `↗ <owner/repo>`는 **슬롯 1 정체성, PR 링크 바로 옆**이다.
현재 워크스페이스의 머지·정리 대상이 아니라는 사실이 행동을 바꾸므로 일반 좌표
슬롯으로 보내지 않는다. 조작 버튼 영역 사이에는 넣지 않는다.

설명은
`다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다.`다.
같은 저장소의 `external=true` 행은 기존 `· 세션` 표시를 유지하며 이 설명을
붙이지 않는다. 외부 행의 관측 결과가 `pr_repo_foreign`인 경우 일반
`상태 확인 실패` 대신 `외부 저장소 PR`으로 표시한다. 다른 관측 오류는 기존
규칙대로 남긴다.

이 작업은 외부 PR 폴링·머지·정리 권한을 추가하지 않는다. 해당 행에 머지·정리
조작이 활성화되지 않는지 회귀 검증한다. 경고가 버튼을 막는 근거가 아니라 기존
서버 게이트가 권한의 근거다. 직접 링크는 기존 PR 링크의 URL 검증·외부 열기
방식을 재사용한다.

## 7. 공유 정본 반영 문구

구현 PR에서 카드 문법 스펙 §5.1 슬롯 표와 관련 설명에 다음 문구를 반영한다. 이번
초안 작성에서는 기존 정본을 수정하지 않는다.

§5.1 슬롯 표의 `1 정체성 (왼쪽)` 행에서 `PR 링크` 항목을 아래처럼 넓힌다.

```diff
- · PR 링크 ·
+ · PR 링크 · 외부 저장소 PR 대상 표시(`↗ owner/repo`, PR 링크 바로 옆) ·
```

정정 문단:

> 정정(UI-kyky). 외부 저장소 PR 대상 표시는 현재 워크스페이스에서 머지·정리할 수
> 없다는 사실을 말하므로 슬롯 1의 PR 링크 옆에 둔다. 작업 종류 색은 중립 카드의
> 배경과 기존 route 칩에만 적용하며, 실패·실행·머지·선택·포커스 상태 표현이
> 우선한다. quick_fix 착지 후 재실행 버튼은 ‘정리 재시도’, 세션 재개 버튼은
> ‘이어하기’다.

ADR 0018의 재개 판정은 승계하되, Consequences가 명시한 `정산 재개` 이름은
바뀐다. 기존 ADR 본문을 고치지 않고 아래 ADR 후보대로 대체 ADR을 구현 PR에서
작성한다. 원래 재개 스펙에는 이 스펙의 문구 정정을 가리키고, 지침의 기존 ADR
인용은 새 ADR로 옮긴다.

조작 표면 스펙 `2026-09-02-worker-operation-surface-unify-design.md`도 같은
PR에서 정정한다. §3.2의 버튼 적용 표·§3.3의 라벨 규칙은 `↻ 정리 재시도`, §5.1의
거부 토스트 라벨은 `정리 재시도`, §5.2의 다이얼로그 제목·확인 버튼은 각각
`착지 후 정리 재시도`·`정리 재시도`로 맞춘다. 크기·배치·지시 전달·충돌 재시도
규칙은 바꾸지 않는다.

## 8. 검증과 수용 기준

- 기존 conflict 테스트에 서로 다른 두 사유의 서로 다른 문장을 요구해 수정 전
  실패를 확인한다. `remote_ref_observe_failed` conflict의 전용 문장, 알려진
  비충돌 reason, 미지 reason, 응답 스냅샷 반영, 자동 재전송 없음도 검증한다.
- 실패 팝업은 session·settlement·disabled·세션 기록 없음·미지 토큰의 조합을
  검증한다. 버튼 글자·접근성 문구·팝업이 같은 행동을 말해야 한다.
- 외부 PR은 서버 store → 두 snapshot → 공통 레인 모델 → 두 탭 링크·대상 표시의
  전달을 검증한다. 같은 저장소 external, merge-queue-only 합성, 필드 누락을
  대조군으로 둔다.
- 카드 종류 네 값과 재료 없음, 밝고 어두운 테마, 중립·실패·실행·머지·외부
  세션·선택·검색 비일치 상태를 검증한다. 상태 테두리·조작 배치는 보존돼야 한다.
- 색 대비는 §3의 실제 토큰 값과 배경 집합으로 계산하고, 브라우저에서 검색
  focus·단계 글자·route 칩을 확인한다. 375px와 1280px에서 두 탭의 버튼과 PR
  대상이 겹치지 않아야 한다.
- 구현 전 환경 확인 후 `npm run tsc`, `npx vitest run --reporter=dot`(120초
  상한), `npm run lint`, 변경 경로의 Prettier 검사, `npm run build`를 통과하고
  번들 두 파일을 포함한다. 전체 저장소 포맷 명령으로 무관한 파일을 변경하지
  않는다.
- 머지 후 배포·실제 프로세스 경로·포트·HTTP 확인은 저장소의 기존 배포 계약을
  따른다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — workflow 토큰을 정의하지 않고 기존 서버 사실을 화면 문장으로
  소비한다.
- 전제: ADR 0014 — 두 탭의 공통 레인 모델·렌더러와 카드 슬롯 표를 사용한다.
- 전제: ADR 0018 — 실패 사유 기반 session/settlement 판정과 미지 사유의
  settlement 기본값은 승계한다. 버튼 이름만 아래 후보가 대체한다.
- 작업 종류 배경과 상태 강조 우선순위: 되돌리기 어려움 불성립(CSS·표시 변경),
  맥락 없이는 놀라움 불성립(상태 우선), 실질 트레이드오프 성립(종류 식별과 상태
  강조) → ADR 아님
- 원인·다음 행동·거부 사전 분리: 되돌리기 어려움 불성립(소규모 순수 표시 코드),
  맥락 없이는 놀라움 불성립(서로 다른 질문), 실질 트레이드오프 성립(한 문장과
  상태별 안내) → ADR 아님
- 재개 판정은 사유 기반으로 승계하고 정산 버튼 이름만 ‘정리 재시도’로 통일:
  되돌리기 어려움 성립(공유 사전·서버 보고·팝업·조작의 이름과 의미를 함께
  정합해야 함), 맥락 없이는 놀라움 성립(같은 이벤트가 세션 없이 정리), 실질
  트레이드오프 성립(기존 정산 용어와 사용자 행동 용어). ADR 0018을
  supersede한다. 명시된 결과 조항만 바꾸고 전체 재개 판정 규칙은 승계한다.
  `summary`: "quick_fix 재개는 실패 사유로 session과 settlement를 가르고, 같은
  attempt의 착지 정산 재실행 버튼은 정리 재시도로 부른다" → ADR
