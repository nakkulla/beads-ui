---
scope:
  - server/worker/delegation-monitor.js
  - app/utils/transcript-lines.js
  - server/ws/monitor-handlers.js
  - app/views/monitor/deck.js
  - server/workflow-enrich.js
  - server/worker/runnable-cache.js
  - server/worker/delegation-monitor.test.js
  - app/utils/transcript-lines.test.js
  - server/ws/monitor-handlers.test.js
  - app/views/monitor/deck.test.js
  - server/workflow-enrich.test.js
  - server/worker/runnable-cache.test.js
  - app/main.bundle.js
  - app/main.bundle.js.map
---
# dotfiles 계약 소비처 통합 구현 스펙

## 상태와 범위

- 통합 이슈: `UI-y9hl`. 사용자 승인으로 `UI-i36w`·`UI-61xi`의 미착수 범위를 흡수한다. 후자의 종료는 구현 완료를 뜻하지 않는다.
- 모니터 v2, 저장소 건강 표시, 계획 검토 기록 호환을 한 저장소의 한 소비처 변경으로 처리한다. 별도 Phase·자식·기능별 이슈를 만들지 않는다.
- 생산자·공유 형식의 설계 정본: dotfiles의 `docs/superpowers/specs/2026-09-08-delegation-monitor-v2-repo-health-design.md`(D4·D6, dotfiles-4bxr)와 `docs/superpowers/specs/2026-09-08-plan-review-record-design.md`(D7, dotfiles-2y0o). 이 문서는 그 형식을 바꾸지 않고 소비·표시·검증을 정의한다. 정식 검토·구현 전이다.
- 관련 생산자 이슈: `dotfiles-4bxr`(2026-09-08 사용자 승인으로 `dotfiles-rat3`를 흡수, rat3는 closed)와 `dotfiles-2y0o`(deferred). 두 생산자는 이 소비처의 배포 완료를 기다린다. 소비처는 이전 형식·값 부재와 호환되므로 생산자 구현 선행을 요구하지 않는다.

## 접근 비교

같은 저장소의 parser·표시·검증을 한 번에 변경하고 배포하는 안을 채택한다. 기능마다 별도 이슈를 두는 안은 독립 배포가 가능하지만 세 번의 추적·검토·마감 비용이 든다. 생산자를 먼저 바꾸는 안은 현재 strict parser나 옛 승인 해석을 깨뜨리므로 채택하지 않는다. 통합으로 두 생산자가 모두 UI의 한 배포를 기다리게 되는 지연은 수용한다.

## U1. 위임 모니터 v2 읽기

`server/worker/delegation-monitor.js`와 `app/utils/transcript-lines.js`가 기존 v1과 새 v2를 함께 읽는다. envelope·launch·thread·turn identity 검증과 partial tail·terminal 해석은 기존 의미를 유지한다. monitor 정보가 Worker의 lifecycle 판정 권한을 새로 갖지 않는다.

v2의 `parsed_cmd`, `exit_code`, `changes`, `details_truncated`는 생산자 D4의 allowlist·타입·개수·상대 경로 제한을 적용한다. 원문 command/query/output/diff/MCP payload를 표시하거나 unknown object를 펼치지 않는다. 잘못된 optional 상세는 표시하지 않고 유효한 coarse activity는 유지한다. 잘못된 envelope는 이벤트를 거절한다. 과거 v1 이력은 그대로 렌더한다.

명령은 read/list/search 등 종류와 허용 상대 경로, 완료 때 실제 종료 코드만 덧붙인다. 파일 활동은 add/modify/delete와 상대 경로를 표시한다. 상세가 없는 이벤트는 기존 표시다. 문자열은 기존 안전한 텍스트 렌더 경로로 출력해 HTML을 해석하지 않는다.

`UI-mn5u`의 native child 관측은 이 작업에 포함하지 않는다. 그 작업과 경로가 겹쳐도 새 producer·metadata·lifecycle을 대신 설계하지 않는다.

## U2. 저장소 건강 kv 읽기와 표시

workspace별 `bd kv`의 고정 키 `repo_health`를 기존 비동기 준비(warm) 컨텍스트·cache 경계(ADR 0043)에서 읽고 `workspaces_state`에 투영한다. 새 Git 호출, 동기 child process, UI 요청 중 blocking 조회는 추가하지 않는다. `found:false`, malformed JSON, 미지원 schema, 조회 실패는 usable value 없음으로 다룬다.

D6의 `repo-health-v1` allowlist만 소비한다. 기본 수집 주기 15분, stale 기준 45분을 공유 계약과 맞춘다. 성공·실패·부재·오래됨을 구분한다.

| 입력 | 표시 |
| --- | --- |
| 최근 status=ok | 관계·behind/ahead와 충돌/staged/unmerged 수, 관찰 시각 |
| 최근 status=error | 수집 실패와 제한된 error_code의 사용자 문구 |
| observed_at이 45분 초과 | 오래된 관찰값임을 표시, 마지막 오류가 있으면 함께 표시 |
| 부재·잘못된 시각·미래 시각·미지원 형식 | 미확인 |

class별 수가 겹칠 수 있으므로 합산해 고유 dirty 파일 수로 부르지 않는다. truncated 수치는 ‘이상/일부’로 표시한다. 파일 경로·명령·stderr·remote URL은 표시 데이터에 포함하지 않는다.

위치는 Monitor의 저장소 헤더다. 개별 Bead 카드의 정보칩이나 조작 줄을 새로 만들지 않는다. 기존 저장소 헤더의 정보 영역에서 최근 상태와 관찰 시각을 한 묶음으로 표현하고 작은 화면에서 줄바꿈돼도 저장소 조작 위치를 밀어내지 않게 한다. 승인된 공통 카드 슬롯은 바꾸지 않는다.

## U3. 계획 검토 기록의 새 쌍과 과거 기록 구분

`server/workflow-enrich.js`와 `server/worker/runnable-cache.js`에서 같은 판별 규칙을 적용한다. D7의 `plan_review=<reviewer>@40hex`와 **같은 앵커의** `plan_review_stats=...@40hex`가 유효한 쌍이면 새 검토 기록이다. 검토를 사용자 승인으로 승격하지 않는다. reviewer 토큰은 기존 canonical 집합 `codex`·`astra`·`fable`·`self`·`skipped`(현재 `PLAN_REVIEW_RECEIPT_RE`와 같은 집합)를 그대로 보존하며, 40자리 쌍 판별이 토큰 집합을 좁히지 않는다.

그 쌍이 없는 과거 `user|triage|codex@40hex`는 기존 legacy 승인 해석을 유지한다. 과거 reviewer@12hex와 12자리 통계, plan_check fallback도 유지한다. 새 40자리 통계가 존재하지만 앵커가 다르면 불완전 기록으로 표시하고 legacy 승인으로 재해석하지 않는다. `plan_approval`이 있는 경우 그 명시적인 사용자 승인 기록은 별도로 보존한다.

새 fast_track `codex@40hex` 검토 쌍에서 plan_approval을 만들어내지 않는다. 계획 검토의 advisory 성격, 기존 실행 admission·freshness 권한, impl_review ancestry 규칙은 바꾸지 않는다. 과거 DB 기록의 일괄 변환과 새 버전 metadata 키를 추가하지 않는다.

## Test scope와 수용 기준

구현 전 Node 버전과 해당 checkout의 의존성을 확인한다. focused 테스트는 Vitest로 실행한다.

```bash
npx vitest run --reporter=dot server/worker/delegation-monitor.test.js app/utils/transcript-lines.test.js server/ws/monitor-handlers.test.js app/views/monitor/deck.test.js server/workflow-enrich.test.js server/worker/runnable-cache.test.js
npm run tsc
npm run lint
npx vitest run --reporter=dot
npm run build
```

- U1: 기존 v1, v2 정상·missing·malformed optional·unknown 필드·상대 경로 탈출·과도한 항목, secret sentinel 비노출, partial tail와 identity 거절을 확인한다.
- U2: unknown/current/error/stale·ahead/diverged·잘린 수치·미래 시각을 확인한다. cold cache에서도 snapshot이 즉시 반환되고 warm 이후 갱신되는지 검증한다.
- U3: 옛 codex@40 승인, reviewer@12 검토, plan_check, 새 codex/astra/fable/self/skipped 쌍(각 토큰의 동일 앵커 성공 사례와 `astra`의 앵커 불일치 사례 포함), mismatch와 명시 승인 존재·부재를 같은 fixture로 두 소비처에 대조한다.
- 변경 파일만 저장소 formatter를 적용하고 frontend bundle과 map을 재생성한다. 무관한 파일을 일괄 포맷하지 않는다.
- U1 입력은 dotfiles D4 스펙의 v2 계약을 그대로 옮긴 canonical v2 fixture로 검증한다. 실제 생산자가 쓴 v2 JSONL의 종단 간 확인은 생산자 구현이 이 이슈의 배포 뒤에 진입하므로 `dotfiles-4bxr`의 수용 기준이 소유하며, 이 이슈의 완료 조건이 아니다.
- U2 저장소 헤더의 좁은 폭 배치는 결정적 구조 검사로 고정한다: 정보 영역 컨테이너의 줄바꿈 허용(`flex-wrap`)과 저장소 조작 영역의 축소 금지·순서를 스타일시트와 렌더 결과에서 확인하는 테스트를 둔다. 실제 좁은 폭 스크린샷 확인은 배포 뒤 완료 보고서의 운영자 잔여 항목으로 기록하며 close 조건이 아니다.

## 배포와 완료

한 PR의 검증·검토를 마친 뒤 기존 `repo-ops/config.toml`의 deploy 스크립트로 배포한다. 스크립트 terminal success, 실제 서비스 checkout SHA·HTTP 응답을 확인한다. live 서비스는 영구 deploy checkout을 사용하며 임시 개발 서버로 대신하지 않는다.

소비처 세 부분이 모두 배포되고 이전 생산자에 대한 호환 검증이 끝나야 이 통합 이슈를 완료한다. 그 뒤 두 dotfiles 생산자가 진행할 수 있다. 새 데이터가 아직 없으면 U1은 v1, U2는 unknown, U3는 기존 기록을 표시하는 상태가 정상이다.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 위임 모니터 v2·저장소 건강 수집(D4·D6) 생산자와 공유 계약은 dotfiles 스펙이 소유한다 | UI-y9hl | dotfiles-4bxr |
| 형제 | dotfiles | user_request | 계획 검토 기록(D7) 생산자는 별도 dotfiles 스펙·Bead가 소유하며 착수 보류 상태다 | UI-y9hl | dotfiles-2y0o |

두 생산자 모두 UI-y9hl 배포 뒤 구현에 진입한다(`blocks` 엣지는 dotfiles 쪽에 있다). dotfiles-rat3는 dotfiles-4bxr에 흡수돼 closed다. 문서와 이슈를 더 만들지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 계약 정의는 dotfiles, 이 저장소는 명시 registry 소비자다.
- 전제: ADR 0043(0026 승계) — 워크스페이스·후보 투영은 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스를 띄우지 않는다. U2의 `repo_health` 읽기는 `warmWorkflowProbes`가 채우는 그 준비 컨텍스트 경계에 둔다.
- 전제: ADR 0014 — 기존 카드 슬롯과 조작 배치를 유지하며 건강 표시는 저장소 헤더에 둔다.
- 전제: ADR dotfiles/0033 — 다른 저장소의 공유 결정은 형제 스펙으로 함께 대조한다.
- 없음 — 공유 형식 결정은 dotfiles 통합 스펙의 ADR 후보가 소유하며 소비처에서 같은 결정을 중복 기록하지 않는다.
