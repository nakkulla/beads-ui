---
scope:
  - server/worker/quickfix-landing.js
  - server/worker/notify.js
  - server/worker/attempt-facts.js
  - server/worker/attach.js
  - docs/adr/
---

# 자기개선 자동 수정 착지 알림과 보호 경로 표시 (UI-jlov)

## 1. 목표

dotfiles 자기개선 루프가 사람 확인 없이 만든 수정 Bead(`self_improvement_tier=auto`)가 Worker quick_fix로 착지하면,
Worker의 착지 알림(Discord)이 바로 그 사실을 알린다. 바뀐 경로가 보호 경로(훅·권한 설정·계약·ADR 등)에 닿으면
그 경로를 알림에 경고로 싣는다. 착지를 막지 않는다.

비목표: 보호 경로 push의 거절(UI-1naj 폐기), 착지 판정·close·배포 흐름의 변경, 자동 등급이 아닌 Bead의 알림 변경,
보호 목록의 정의와 helper의 분류 규칙(dotfiles-8t7o0 소유).

## 2. 검증된 전제

base: beads-ui `ec9071f130dfbd713dff93a0251b591a2417ecb7`, dotfiles 스펙
`docs/superpowers/specs/2026-11-10-self-improvement-auto-tier-friction-design.md`(dotfiles-8t7o0, `spec_review` r2 APPROVE).

- quick_fix가 바뀐 채로 닫히면 Worker는 close와 `moveToDone` 뒤에 착지 알림을 기다려(await) 보낸다 — server/worker/quickfix-landing.js:1655-1683
- 바뀐 것 없이 닫힌 경우(`close_kind`)도 같은 알림을 보낸다 — server/worker/quickfix-landing.js:1107
- 알림 호출은 예외를 삼키는 래퍼 하나를 거친다 — server/worker/quickfix-landing.js:280-289
- 착지 알림 본문은 머리줄 + `착지: <sha>` 또는 `종결: <kind>` + `리포:` 줄이다 — server/worker/notify.js:1071-1094, :56
- 착지 마감(`settle`)은 `deps.bd.readIssue`로 Bead를 한 번 읽고, 읽기가 실패하면 `bd_read_failed`로 끝나 착지 알림을 보내지 않는다. 바뀐 것 없는 종결 판정도 같은 읽기 결과를 쓴다 — server/worker/quickfix-landing.js:1136, :1186-1200, :1234
- quick_fix 레인은 record 모드 pre-push가 push마다 `local_oid`·`remote_oid`·`remote_ref` 줄을 시도의 push 기록에 남기고 막지 않는다 — server/worker/guard-hook.js:315-329, :446-452
- 착지 마감은 다른 저장소 착지 여부를 `readForeignLanding` 바인딩(`{ repo, path, base }` 또는 null)으로 안다 — server/worker/quickfix-landing.js:653, :805-808
- pre-push 훅은 시도 자기 저장소가 아닌 저장소의 push를 기록하지 않고 통과시킨다 — server/worker/guard-hook.js:454-468
- 시도 워크트리 폴더 이름은 Bead ID다 — server/worker/worktree.js:741-743
- 착지 판정은 그 기록의 base 줄을 읽는다 — server/worker/quickfix-landing.js:558-598
- Worker는 설치된 workflow 스킬의 git 루트(`dotfiles_root`)와 그 아래 `.venv/bin/python`(`workflow_python`)을 해석한다 — server/worker/attempt-facts.js:133-160, :510-529, server/worker/attach.js:1416-1417
- 설치된 workflow 스킬은 dotfiles 배포 체크아웃을 가리킨다 — `ls -la ~/.claude/skills/workflow` → `dotfiles/.worktrees/.repo-ops-deploy/src/shared/skills/flow/workflow`
- ADR UI-u6ud-2: beads-ui는 dotfiles 계약 파일을 런타임에 읽지 않고, 설치본 체커를 실행해 `--json`을 소비하며 규칙을 JS로 복제하지 않는다. spawn은 비동기, 타임아웃 20초, `cwd`는 저장소 루트다 — docs/adr/UI-u6ud-2-dotfiles-contract-consumption.md:21-26
- dotfiles 스펙의 보호 목록 정본은 `workflow-state.yaml`의 `self_improvement_protected_paths`(모든 rig 목록 + rig 이름별 추가 목록, 항목은 경로 접두사)이고 아직 계약에 없다 — dotfiles 스펙 :150-157
- dotfiles에는 보호 경로 판정 스크립트가 아직 없다(dotfiles-8t7o0 미구현) — `grep -n protected <dotfiles>/src/shared/skills/flow/workflow/scripts/*.py`에 보호 목록 리더가 없다

## 3. 사용자 결정 (2026-11-10, 이 세션)

1. 자동 수정이 보호 경로를 바꾸는 push를 막지 않는다. 필요한 수정은 고치고 사용자에게 알린다.
2. helper가 계획 단계에서 보호 경로 항목을 질문으로 돌리는 분류도 없앤다. 보호 경로 수정은 더 신중하게 고치게 한다
   (dotfiles-8t7o0 소유).
3. 알림은 Worker가 착지 즉시 보낸다. 자동 수정임을 표시하고, 보호 경로를 수정했을 때는 그것을 표시한다.
4. 구현은 UI-jlov가 맡는다. UI-1naj는 닫는다.

## 4. 설계

### 4.1 대상

착지 알림을 보낼 때 그 Bead의 metadata `self_improvement_tier`가 정확히 `auto`일 때만 아래 줄을 더한다. 키가 없거나
다른 값이면 알림은 지금과 같다(계약 키 부재는 표시 생략, ADR UI-u6ud-2).

- 결정: `self_improvement_tier`는 착지 마감이 이미 읽은 Bead(`settle`의 `readIssue` 결과)의 metadata에서 얻고 따로
  읽지 않는다 (대안: 알림 직전 별도 metadata 읽기; 이유: 별도 읽기가 실패하면 자동 수정 표시가 조용히 사라진다. 마감의
  읽기가 실패하면 착지 알림 자체가 없으므로 "auto인데 표시 없음"인 경우가 생기지 않는다).

### 4.2 알림 본문

기존 줄(머리줄·`착지:`/`종결:`·`리포:`) 아래에 붙인다.

| 경우 | 더하는 줄 |
| --- | --- |
| 바뀐 채 착지, 보호 경로 있음 | `자기개선 자동 수정 · 바뀐 파일 <N>개` / `⚠ 보호 경로 수정: <경로>, <경로> …` |
| 바뀐 채 착지, 보호 경로 없음 | `자기개선 자동 수정 · 바뀐 파일 <N>개` / `보호 경로: 없음` |
| 바뀐 채 착지, 판정 실패 | `자기개선 자동 수정 · 바뀐 파일 <N>개`(N을 모르면 생략) / `보호 경로: 확인 못 함 (<사유>)` |
| 바뀐 것 없이 닫힘 | `자기개선 자동 수정` |

- 보호 경로는 최대 5개를 쓰고 나머지는 `외 <k>개`로 줄인다.
- 결정: 판정 실패는 줄을 생략하지 않고 `확인 못 함`으로 쓴다 (대안: fail-quiet 생략; 이유: 생략하면 "보호 경로
  없음"과 구별되지 않는다).
- `<사유>`는 고정 토큰 하나다. 예: `range_unknown`, `git_error`, `checker_missing`, `checker_exit_<n>`, `timeout`,
  `bad_json`.

### 4.3 바뀐 경로

- 시도의 push 기록에서 착지 저장소 base(`refs/heads/<base>`)로 간 줄마다 `remote_oid..local_oid`의 변경 경로를
  모아 합친다. `git diff --name-only --no-renames`라서 이름 변경은 옛 경로와 새 경로가 모두 들어간다.
- 결정: 범위는 push 기록의 base 줄에서 얻는다 (대안: 시도 워크트리를 만든 base부터; 이유: base가 움직인 뒤에는 남의
  커밋이 섞인다. push 기록의 `remote_oid`는 push 시점 원격 끝이라 이 시도가 올린 것만 잡는다).
- base 줄이 없거나 `remote_oid`가 0이면 `range_unknown`이다. git 명령이 실패하면 `git_error`다.
- 다른 저장소에 착지한 경우(foreign 착지)는 pre-push가 그 저장소의 push를 기록하지 않으므로 범위를 알 수 없다.
  push 기록을 쓰지 않고 `range_unknown`으로 적는다(같은 이름의 base 줄이 있어도 시도 저장소의 것이라 쓰지 않는다).
- rig 이름은 Worker 저장소 루트 디렉터리 이름이다(워크트리 폴더 이름은 Bead ID라 쓰지 않는다).

### 4.4 보호 경로 판정 (dotfiles 체커 실행)

- 결정: beads-ui는 보호 목록을 읽지 않고, 설치본 dotfiles 체커를 실행해 판정만 받는다 (대안: 계약 YAML 직접 읽기,
  핀 사본; 이유: ADR UI-u6ud-2가 직접 읽기를 막고, 사본은 목록이 바뀔 때마다 재핀이 필요해 어긋난다. 접두사 규칙과
  목록 합치기도 dotfiles가 갖는다).
- 인터페이스(dotfiles-8t7o0이 제공):
  - 실행: `<workflow_python 또는 python3> <dotfiles_root>/src/shared/skills/flow/workflow/scripts/check-protected-paths.py --rig <rig> --json`
  - 입력: stdin에 저장소 상대 경로를 한 줄에 하나.
  - 출력: exit 0과 stdout `{"rig": "<rig>", "protected": ["<입력 경로>", ...]}`. `protected`는 보호 목록 접두사에 닿은
    입력 경로이고, 없으면 빈 배열이다.
  - 그 밖의 결과(체커 파일 없음, exit 0이 아님, JSON 아님, `protected`가 문자열 배열이 아님)는 판정 실패다.
- spawn은 비동기이고 타임아웃 20초, `cwd`는 Worker 저장소 루트다(ADR UI-u6ud-2와 같은 값).
- 결정: 착지 알림의 체커 실행은 ADR 탭의 warm 경로 제한(저장소당 in-flight 하나, 동시성 상한 4)과 별개다. 착지
  한 번에 한 번 실행하고 그 상한에 세지 않는다 (대안: ADR 탭 상한 공유; 이유: 착지는 드물고 한 번뿐이라 줄을 세울
  이유가 없고, ADR 탭 spawn이 밀려 알림이 타임아웃 나면 안 된다). ADR 탭의 warm 경로 제한은 그대로다.
- 알림은 판정이 끝나거나 타임아웃이 난 뒤 한 번 보낸다. close와 `moveToDone`은 이미 끝난 뒤라 착지 결과는 바뀌지
  않는다. 기다림은 그 뒤의 로컬 base 동기화를 최대 20초 늦출 뿐이다.
- `dotfiles_root`를 해석하지 못하면 `checker_missing`이다.

### 4.5 바꾸지 않는 것

- 결정: pre-push 모드(guard·record·deny)와 push 기록 줄 모양은 바꾸지 않는다 — 막지 않기로 했으므로 기록에 판정을
  남길 이유가 없다.
- 착지 판정(`proveDelivery`)·실패 사실 수집·배포·자동 등급이 아닌 Bead의 알림은 그대로다.

## 5. 수용 기준

1. `self_improvement_tier=auto` Bead가 보호 접두사에 닿는 파일을 바꿔 착지하면 알림에 `자기개선 자동 수정 · 바뀐 파일 N개`와
   `⚠ 보호 경로 수정: <그 경로>`가 있다.
2. 같은 Bead가 보호 밖 파일만 바꾸면 `보호 경로: 없음`이 있다.
3. 이름 변경으로 보호 경로를 떠나는 착지도 옛 경로가 보호 경로로 표시된다.
4. 체커가 없거나 실패하거나 20초를 넘기면 `보호 경로: 확인 못 함 (<사유>)`가 있고, 알림은 나가며 착지 결과는 그대로다.
5. 바뀐 것 없이 닫힌 auto Bead의 알림에는 `자기개선 자동 수정` 줄만 더해진다.
6. 다른 저장소에 착지한 auto Bead의 알림에는 `자기개선 자동 수정`과 `보호 경로: 확인 못 함 (range_unknown)`이 있다.
7. `self_improvement_tier`가 없거나 `auto`가 아닌 Bead의 알림은 지금과 글자 하나 다르지 않고, 체커를 실행하지 않는다.

## 6. 테스트

- notify focused vitest: 네 경우의 본문 줄(보호 있음·없음·실패·변경 없음), 보호 경로 6개 이상일 때 `외 k개`,
  auto가 아닐 때 본문 불변.
- quickfix-landing focused vitest: auto Bead만 체커를 부르고 push 기록 base 줄 범위로 경로를 모은다, 여러 base 줄
  합치기, `remote_oid` 0이면 `range_unknown`, 체커 실패·타임아웃이어도 close·moveToDone 결과 불변, foreign 착지는
  push 기록에 같은 base 이름 줄이 있어도 `range_unknown`, tier는 `settle`이 읽은 issue에서 얻고 별도 metadata 읽기를
  하지 않는다.
- 체커 실행 단위 vitest: 가짜 체커 스크립트로 exit 0·빈 배열·exit 2·비JSON·타임아웃.
- `npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`.

## 7. 경계·후속

- dotfiles-8t7o0(dotfiles): 이 스펙의 §3 사용자 결정 1·2·3에 맞춰 dotfiles 스펙 §4.5(helper의 `needs_approval` 보호 경로
  분류 제거, 보호 경로 수정의 신중한 처리)와 §4.6(pre-push 거절 → Worker 착지 알림 표시)을 정정하고, §4.4의
  `check-protected-paths.py`를 제공한다. dotfiles-8t7o0은 UI-1naj 대신 UI-jlov를 `blocks` 선행으로 기다린다 — 알림이
  먼저 있어야 자동 수정이 알림 없이 착지하지 않는다. UI-jlov는 체커가 없을 때 `확인 못 함`으로 나가므로 dotfiles를
  기다리지 않는다.
- UI-1naj: §3 사용자 결정 1로 폐기하고 닫는다.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 설치본 체커를 실행해 `--json`을 소비하고 규칙을 JS로 복제하지 않는 방식, spawn 타임아웃·`cwd` 값을 따른다.
- Worker 착지 알림의 보호 경로 표시는 설치본 dotfiles 체커 `check-protected-paths.py`를 실행해 판정만 받고, 판정 실패는
  생략하지 않고 `확인 못 함`으로 적는다.
  - 되돌리기 어려움: dotfiles 체커 인터페이스(인자·stdin·JSON 모양)와 beads-ui 착지 알림 경로가 함께 움직인다.
  - 맥락 없이 놀라움: beads-ui가 계약 파일 대신 dotfiles 스크립트를 착지 경로에서 실행하는 이유와, 계약 키 부재
    fail-quiet 원칙에 예외(`확인 못 함` 표시)를 두는 이유가 코드만으로 드러나지 않는다.
  - 실제 트레이드오프: 직접 읽기·핀 사본·체커 실행 중 하나를 골랐다.
  - 같은 소비자 집합(dotfiles 계약 소비 방식)이 UI-u6ud-2에 있으므로 그 ADR을 대체해 한 행으로 유지한다. 바뀌는 조항은
    둘이다: spawn 소비자에 Worker 착지 알림이 더해지고(warm 경로 제한 밖, 착지당 한 번, 타임아웃 20초), 그 판정 실패는
    생략하지 않고 `확인 못 함`으로 적는다. 나머지 조항(런타임 계약 파일 비읽기, 코드 registry의 검증 소유, cross-runtime
    테스트, 계약 키 부재 fail-quiet, JS frontmatter 리더의 범위, ADR 탭 spawn의 warm 경로·in-flight·동시성 상한·cwd,
    미지 kind의 `기타` 표시, 체커별 환경 오류 격리)은 그대로 승계한다.
  - `summary`: "beads-ui는 dotfiles 계약을 런타임에 읽지 않고 필요한 subset만 코드 registry로 복제하며 계약 키 부재는 fail-quiet 표시 생략이다; ADR 탭 신호와 Worker 착지 알림의 보호 경로 표시는 설치본 체커를 비동기로 spawn해 --json을 소비하고 규칙을 JS로 복제하지 않으며, 보호 경로 판정 실패는 생략하지 않고 확인 못 함으로 적는다" → ADR, supersede UI-u6ud-2
- 알림 줄 문구와 보호 경로 5개 상한 — 쉽게 되돌릴 수 있다 → ADR 아님
- 바뀐 경로 범위를 push 기록 base 줄에서 얻는다 — 쉽게 되돌릴 수 있다 → ADR 아님
