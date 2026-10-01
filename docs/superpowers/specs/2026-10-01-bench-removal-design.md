---
scope:
  - server/worker/bench-runs.js
  - server/worker/scheduler.js
  - server/worker/quickfix-landing.js
  - server/worker/queue-store.js
  - server/worker/attach.js
  - server/worker/base-drift.js
  - server/worker/guard-hook.js
  - server/worker/state-paths.js
  - server/worker/compare-projection.js
  - server/worker/runner/preamble.js
  - server/worker/exec-enums.js
  - server/ws/bench-handlers.js
  - server/ws/compare-handlers.js
  - server/ws/connection.js
  - app/protocol.js
  - app/protocol.md
  - app/views/compare/
  - app/main.js
  - app/utils/label-policy.js
  - app/styles.css
  - docs/bd-json-compatibility.md
---

# 실험 벤치 전체 제거 (UI-pfbj)

## 1. 목표

실험 벤치를 beads-ui에서 완전히 없앤다. 벤치는 한 Bead를 여러 프리셋으로 복제 실행해 비교하는 기능이며, 다음을 모두 걷어낸다.

- 생성 화면과 WS op
- 스케줄러의 벤치 레인과 verify 채점
- close 판정과 attempt 필드
- 결과 줄 사본

비교 탭의 본 표(범위·레포·route·묶음 필터, 문제 기준)는 그대로 남는다.

사용자 결정은 두 번 있었다. 2026-09-23에 "실험 벤치 제거"를 정했고, 2026-10-01에 다시 확인하면서 dotfiles의 벤치 계약도 함께 은퇴하기로 했다(형제 dotfiles-9nnnb). 이 이슈는 원래 PR #338(UI-dbn6)이 생성 경로를 지운 뒤 남는 잔재만 다루려 했다. 그런데 UI-dbn6를 적용하지 않기로 해서 생성 경로까지 이 이슈의 범위가 되었다.

비목표는 다음과 같다.

- pre-push 가드의 `deny` 모드 구현과 모드 선택 함수 형태(ADR UI-a5l2)
- 비교 탭 본 표의 계산
- 실행 프리셋
- dotfiles 계약(형제가 맡는다)
- `generated/contracts/quick-fix-handoff.json` 핀 사본(dotfiles 착지 뒤 재고정)

## 2. 검증된 전제

base `7d183710189f508ce152f03673ecc7192b4cf1eb` 기준이다(2026-10-01 재리뷰에서 UI-o27t 착지 뒤 줄 번호를 갱신했다).

**벤치 핵심 모듈과 소비자**

- `bench-runs.js`(829줄)가 벤치 상수·튜플·클론 필드·매니페스트 읽기와 쓰기·`createBenchRun`을 모두 담는다. 클론은 `landing: 'none'`을 쓴다 — server/worker/bench-runs.js:53-158,437-454,503-637
- 비테스트 importer는 셋이다 — server/worker/scheduler.js:72-75, server/worker/compare-projection.js:20-23, server/ws/bench-handlers.js:24-28
- 생성 op는 `bench-run-create` 하나다. 클론을 만들어 병렬 레인에 놓고, 실패하면 `bench:<run_id>:aborted`로 닫는다 — server/ws/bench-handlers.js:64,280,341; server/ws/connection.js:15,709-710

**스케줄러 벤치 레인** — server/worker/scheduler.js 안에 있다.

- 스냅샷의 `bench_run`·`bench_base`를 읽는다 — :668-672
- cut base를 고정한다 — :7706
- `bench_base_unreachable`이면 디스패치를 거부한다 — :10815-10818
- 가드 모드를 고른다 — :10845, 재실행 시 :15661-15667
- 벤치 전용 함수 — :7687,7759,7782,7861,7898,7961
- 호출부 — :6072,6563-6572,6807-6825,8945-9031,9217,11188,15616

**나머지 워커 모듈의 벤치 분기**

- quickfix-landing.js — `bench_close` cursor, `readBenchBinding`, `settleBenchClose`, 그리고 no-change보다 먼저 도는 벤치 판정. server/worker/quickfix-landing.js:72,87,1029-1031,1063,1146-1166
- queue-store.js — `Attempt.bench_run`·`bench_verify`와 cursor `bench_close`. server/worker/queue-store.js:182-190,287-291,3457,3712-3716
- attach.js — 벤치 metadata 읽기와 `[verify]` 채점 연결. server/worker/attach.js:698-713,1285
- base-drift.js — `benchCell` 예외. server/worker/base-drift.js:156-202
- state-paths.js — 매니페스트 경로. server/worker/state-paths.js:409-433

**가드 훅**

- 가드 훅에는 guard·record·deny 세 모드가 있다. deny 모드의 유일한 호출자는 스케줄러의 벤치 분기이고, 주석과 거부 문구가 벤치를 말한다 — server/worker/guard-hook.js:333-431,542; scheduler.js:4077,10845
- ADR UI-a5l2는 모드 3종과 선택 규칙(bench=deny, quick_fix lane=record, 그 외 guard)을 "바꾸지 않는다"고 적는다 — docs/adr/UI-a5l2-guard-pre-tool-deny-no-kill-no-queue-hold.md:71

**비교 탭**

- 서버 쪽 벤치 처리 — server/worker/compare-projection.js
  - `include_bench` 필터 — :77,585,748
  - `is_bench` — :656
  - 벤치 verify 출처 — :633-663
  - `done_kind 'bench'` — :803
  - `bench_rows`·`runs` 조립 — :1288,1322-1397,1578,1645,1839
  - 벤치 attempt 사전 준비 — :1868-1871
- `compare-handlers.js`는 `include_bench`를 그대로 넘긴다 — server/ws/compare-handlers.js:62
- 화면은 실험 절·`include_bench` 체크박스·생성 폼·`bench-run-create` 송신·벤치 verify 칩을 그린다. 폼 규칙과 진행 묶음은 `bench-form.js`·`bench-model.js`에 있다 — app/views/compare/index.js:35-43,180-187,256-262,327-328,382,849,1002,1208-1566,1656; app/views/compare/bench-form.js; app/views/compare/bench-model.js
- `main.js`는 비교 뷰에 `sourceCandidates`를 넘긴다 — app/main.js:1657-1677

**프로토콜·문서·사본**

- 프로토콜 — app/protocol.js:15,380-383; app/protocol.md:1491-1509,1532,1573-1617
- 결과 줄 템플릿 사본에 `bench:<run_id>`가 있다 — server/worker/runner/preamble.js:139 (스냅샷 포함)
- 사본을 dotfiles 정본과 실시간으로 대조하는 검사는 없다. 테스트는 "정본은 dotfiles … 위는 사본이다" 문장이 있는지만 본다 — server/worker/runner/preamble.test.js:376,781
- `label-policy.js`의 벤치 export 셋은 importer가 없다 — app/utils/label-policy.js:94-124
- 실험 절 스타일 — `.cmp-bench*`·`.cmp-runs`·`.cmp-run*`·`.cmp-form*`·`.cmp-candidate*`. 이 선택자는 모두 index.js 실험 절(1208-1566)에서만 쓰인다 — app/styles.css:10945-11135
- 문서 언급 — docs/bd-json-compatibility.md:58

**디스크와 Bead 실측**

- 2026-10-01 실측(명령: `ls ~/.local/state/bdui/*/bench`, 모든 `queue.json`의 키 집계, `bd list --label bench --all`)
  - 벤치 매니페스트 디렉터리: 0
  - `bench:` close 사유·`done_kind:"bench"`·`bench_close` cursor: 0
  - `bench_run`·`bench_verify` 키를 가진 attempt 행: 256(값은 모두 null)
  - beads-ui·dotfiles rig의 bench 라벨 Bead: 0
- 미확인: beads-ui·dotfiles 밖 워크스페이스 rig의 bench 라벨 Bead 수 — 조회하지 않음. 3.4의 fail-quiet 처리로 결과가 바뀌지 않는다.

## 3. 설계

### 3.1 서버

- `server/worker/bench-runs.js`와 `server/ws/bench-handlers.js`를 지운다.
- 스케줄러에서 지우는 것: 벤치 레인 전부(스냅샷 읽기, cut base 고정과 거부, 푸시 관측, verify 채점, 잔재 청소, run 수거, 셀 종결 close)와 attempt로의 `bench_run` 전달.
- 그 밖의 정리:
  - `quickfix-landing.js`: 벤치 close 판정과 cursor
  - `attach.js`: 벤치 metadata 읽기와 `[verify]` 채점
  - `base-drift.js`: `benchCell` 예외
  - `state-paths.js`: 벤치 경로
- 결과 줄 템플릿 사본(`preamble.js`)에서 `bench:<run_id>` 형태를 뺀다. 정본(dotfiles)은 형제 dotfiles-9nnnb가 착지하기 전까지 이 형태를 더 갖는다. 그래도 beads-ui가 벤치 attempt를 더 만들지 않으므로 그 형태를 쓸 세션이 없고, 사본과 정본을 대조하는 검사도 없다(§2).

### 3.2 가드 모드

결정: pre-push 가드의 `deny` 모드 구현과 `guard`·`record`·`deny` 선택 함수 형태는 지우지 않는다 — ADR UI-a5l2가 모드와 선택 규칙을 바꾸지 않는다고 정했다.

벤치가 사라지면 스케줄러 호출부의 벤치 분기만 없어진다. 실제 선택은 quick_fix lane이면 `record`, 그 외에는 `guard`가 된다. deny 모드의 주석과 거부 문구는 벤치를 말하지 않는 일반 문장으로 바꾼다(예: "deny 모드 시도는 어떤 ref도 push하지 않는다").

### 3.3 프로토콜

- `bench-run-create`를 `MESSAGE_TYPES`와 typedef에서 지운다. 보내면 `unknown_type`으로 거절된다.
- `get-compare` 응답에서 `runs`·`bench_rows`·`rows[].is_bench`를 뺀다.
- 요청의 `include_bench`는 받아도 무시하고 정상 응답한다(`bad_request` 아님). 새로 고치지 않은 열린 탭이 보내는 값을 거절하지 않기 위해서다.
- `app/protocol.md`에서 해당 절을 지우고 `Removed (historical)`에 적는다.

### 3.4 화면과 데이터

- 비교 화면에서 지운다: 실험 절, `include_bench` 체크박스, 생성 폼, 벤치 verify 출처 분기, 벤치 상태와 펼침.
  - `bench-form.js`·`bench-model.js`는 테스트와 함께 지운다.
  - verify 칸은 머지 후보 `[verify]` 영수증으로만 채운다.
- 함께 정리한다: `main.js`의 `sourceCandidates` 전달, 실험 절 스타일(§2의 `.cmp-bench*`·`.cmp-runs`·`.cmp-run*`·`.cmp-form*`·`.cmp-candidate*`), `label-policy.js`의 벤치 export.
- 기존 `queue.json`의 `bench_run`·`bench_verify` 키(모두 null)와 cursor 값 `bench_close`(0건)는 읽을 때 정규화가 버린다. 다시 쓸 때는 이 키가 없다. 마이그레이션은 없다.
- 혹시 남은 bench 라벨 Bead는 일반 Bead로 다룬다(fail-quiet).

## 4. 수용 기준

1. `bench-run-create`를 보내면 `unknown_type`이다. `get-compare` 응답에 `runs`·`bench_rows`·`is_bench`가 없다. `include_bench: true`를 보내도 같은 정상 응답이 온다.
2. 비교 탭 본 표의 행·묶음·요약·문제 기준 결과는 벤치 행이 없던 입력에서 이전과 같다(기존 테스트 통과).
3. `bench_run`·`bench_verify`·cursor `bench_close`가 있는 옛 `queue.json`을 읽어도 오류가 없고, 저장한 파일에는 그 키가 없다.
4. 스케줄러가 설치하는 가드 모드는 quick_fix lane이면 `record`, 그 외에는 `guard`다. `deny` 모드는 가드 훅 단위 테스트에서 지금처럼 동작한다.
5. 운영 코드에 벤치가 남지 않는다: `git grep -n -i bench -- server app ':!*.map' ':!app/main.bundle.js' ':!app/protocol.md' ':!*.test.js' ':!**/__snapshots__/**'` 결과가 0건이다(deny 모드 주석·거부 문구와 `exec-enums.js` 주석 포함).
   - `app/protocol.md`에는 `Removed (historical)` 기록만 남는다.
   - 테스트에는 §5의 호환성 회귀 테스트가 쓰는 레거시 입력만 남을 수 있다: `bench-run-create`, `include_bench`, 옛 queue의 `bench_run`·`bench_verify`·`bench_close`.
6. Pre-Handoff Validation(`npm run tsc`, `npm run lint`, prettier, `npx vitest run --reporter=dot`)이 통과한다.

## 5. 테스트

- 지우는 테스트: `server/worker/bench-runs.test.js`, `server/ws/bench-handlers.test.js`, `app/views/compare/bench-form.test.js`, `app/views/compare/bench-model.test.js`
- 벤치 케이스만 빼는 테스트: `compare-projection.test.js`, `quickfix-landing.test.js`, `scheduler.test.js`, `app/views/compare/index.test.js`, `guard-hook.test.js`(deny 모드 케이스는 유지), `compare-handlers.test.js`, `runner/preamble.test.js`와 스냅샷
- 새 테스트: `bench-run-create` → `unknown_type`, `include_bench` 무시, 옛 벤치 키를 가진 queue 정규화, 스케줄러 가드 모드 두 갈래

## 6. 결정 (ADR 후보)

- 전제: ADR UI-a5l2 — pre-push 가드 모드 3종과 선택 규칙을 바꾸지 않는다. 벤치 대상이 사라질 뿐 `deny` 모드 구현은 남긴다.
- beads-ui에서 실험 벤치 기능을 제거한다 — 되돌리기 쉬움(beads-ui에는 벤치 ADR이 없고 코드 제거는 되돌릴 수 있다. 함께 움직이는 dotfiles 계약 결정은 형제 dotfiles-9nnnb의 ADR이 담는다) → ADR 아님
- `get-compare`가 `include_bench`를 받아도 무시한다 — 되돌리기 쉬움(소비자는 이 저장소 화면뿐) → ADR 아님

## 7. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소 — workflow 계약·스킬의 `landing=none`(bench) 꼬리, close 가드, 계약 검사의 은퇴(ADR dotfiles/dotfiles-o7y9-6 대체). 벤치를 만들 수 있는 동안 계약을 지우면 클론 세션이 일반 꼬리로 push할 수 있어 이 이슈 뒤에 착지 | UI-pfbj | dotfiles-9nnnb |

- 핀 사본 `generated/contracts/quick-fix-handoff.json`의 `landing_none` 항목은 dotfiles-9nnnb 착지 뒤 그 스펙의 크로스 리포 unit이 다시 고정한다. 이 이슈는 건드리지 않는다.
