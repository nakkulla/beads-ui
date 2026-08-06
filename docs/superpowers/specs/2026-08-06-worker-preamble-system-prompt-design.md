# 워커 preamble 재구조화·시스템 프롬프트 채널 이동·프롬프트 확인 UI (UI-rxp3)

- 날짜: 2026-08-06
- Bead: UI-rxp3
- 상태: 설계 승인 대기

## 배경

External/beads 워커 세션이 테스트 허메틱화 목적으로
`GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.hooksPath GIT_CONFIG_VALUE_0="$EMPTY" go test …`
를 실행했다가 command guard의 `hook_bypass_blocked`로 kill됐다. 현행
`GUARD_CONTRACT_DIRECTIVE`(`server/worker/runner/preamble.js`)는 이 금지를 이미
명시하지만 **허용 대안이 없어** 세션이 우회를 발명했다. 또한 계약 전체가 유저
프롬프트 앞에 접두되는 구조라 (1) 컨텍스트 컴팩션에서 원문이 뭉개질 수 있고,
(2) 과업 수준 추론이 계약을 뒤집기 쉬우며, (3) `--resume` 재개 세션에서 계약이
히스토리 깊숙이 묻힌다. 마지막으로 실제 발송된 프롬프트가 (disposition 제외)
어디에도 기록되지 않아 사용자가 확인할 수단이 없다.

업계 조사(OpenHands 섹션 레지스트리, Cline YOLO 시스템 프롬프트, SWE-agent,
Copilot agents.md 가이드, Anthropic harness 문서) 공통 패턴: 금지에는 허용
대안 병기, 심각도 어휘 선언, 무인 모드는 환경 사실로 서술, 계약은 시스템
프롬프트 계층, golden snapshot으로 드리프트 고정.

## 목표

1. 가드 계약을 심각도 3단으로 재구조화하고 금지마다 허용 대안을 병기한다.
2. 세션 상수인 계약부를 `--append-system-prompt` 채널로 이동하고, 유저
   프롬프트에는 과업만 남긴다.
3. 실제 발송본(시스템·과업)을 attempt 레코드에 기록한다.
4. UI에서 시스템 프롬프트(설정 접근)와 bead별 과업(이슈 상세, 기본 접힘)을
   확인할 수 있게 한다.

## 비목표

- 강제 계층 변경 없음: command-guard·pre-push hook은 그대로가 강제이고,
  프롬프트는 여전히 자문(advisory)이다.
- 프롬프트 편집 UI 없음(읽기 전용).
- codex 어댑터 추가 없음(현행 어댑터는 claude 하나).
- OpenHands식 섹션 레지스트리 도입 없음(현 규모에 과설계).

## 설계

### 1. preamble.js 재구조화

- `GUARD_CONTRACT_DIRECTIVE`를 심각도 3단 마크다운 섹션으로 재작성:
  - **즉시 종료(세션 kill)**: `gh pr merge`; hook 무력화 쓰기(`git push
    --no-verify`, `git -c core.hooksPath=…`, `git config … core.hooksPath
    <값>`, `GIT_CONFIG_COUNT/KEY_*/VALUE_*` 할당). git 설정 격리가 필요하면
    `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null`을 쓰라는 허용
    대안 병기 + 정답/오답 명령 예시 쌍(오답: 이번 사고의 `GIT_CONFIG_COUNT=…
    go test`, 정답: `GIT_CONFIG_GLOBAL=/dev/null … go test`).
  - **거부만 됨(세션 지속)**: 자기 base로의 `git push`(pre-push hook 거부),
    사후 `base_landing_detected` 규칙; hooksPath 읽기는 위반 아님.
  - **허용됨(오해 방지)**: `git merge origin/<base>` — 기록만 남는다.
- `UNATTENDED_PREAMBLE`을 환경 사실 프레이밍으로 재작성: "무인 모드 —
  사용자는 이 세션과 통신할 수 없다. 질문 도구는 응답자가 없다. hard-stop은
  `blocker` 줄 출력 후 비정상 종료로 표면화하라." 배경 태스크 유실 경고(현행
  (2)항)는 무인 모드의 환경 사실이므로 이쪽으로 이동.
- `applyPreamble(base_prompt, options)`의 반환을 문자열에서
  `{ system_prompt, task_prompt }` 객체로 변경:
  - `system_prompt` = 무인 계약 + (fast_track 시) fast_track 지시 + (pr_submit
    시) PR 제출 지시·PR base 고지 + 가드 계약.
  - `task_prompt` = `base_prompt` 그대로.
- 기존 상수 분리·조건부 조립 구조(`fast_track`/`pr_submit`/`target_base`)는
  유지. 텍스트 소유는 이 파일 단일 소스.

### 2. claude.js 채널 이동

- `buildArgv`: `args.push('--append-system-prompt', system_prompt)` 추가,
  positional 인자는 `task_prompt`만.
- `--resume` 분기에도 동일 적용. 재개 세션에 `--append-system-prompt`가 실제
  반영되는지 구현 중 실측 검증한다(간단한 headless resume 실험). 미반영이
  확인되면 resume 경로에 한해 계약부를 task_prompt 앞에 병송하는 폴백을
  적용하고 그 사실을 코드 주석과 Bead notes에 기록한다.

### 3. 발송본 기록

- attempt 레코드에 `system_prompt`·`task_prompt` 문자열 필드를 spawn 시점에
  저장(기본·stale·resume·conflict·disposition 5형태 모두). 기존
  `disposition_prompt`는 호환 유지.
- worker-state push에는 프롬프트 본문을 싣지 않는다(페이로드 비대 방지).
  조회는 on-demand 요청/응답 `get-attempt-prompt { attempt_id }` →
  `{ attempt_id, system_prompt, task_prompt, recorded_at }`; 기록 없는 과거
  attempt는 `{ missing: true }`로 fail-quiet.

### 4. UI — 시스템 프롬프트 (설정 접근)

- 설정 버튼 영역에서 "워커 시스템 프롬프트" 항목 → 다이얼로그로 현재 코드
  기준 계약 전문 표시. 서버가 preamble.js로 조립해 반환하는 on-demand 요청
  `get-worker-system-prompt {}` → 기본 변형(fast_track=false,
  pr_submit=true, target_base 플레이스홀더) 전문 + 조건부 파트의 조건 라벨.
  프론트에 텍스트 사본을 두지 않는다.

### 5. UI — 과업 (이슈 상세)

- Board 이슈 상세 패널에 "과업 프롬프트" 접힌 섹션(기본 접힘, 클릭 펼침).
  표시 우선순위: ① 최근 attempt의 기록된 `task_prompt`(attempt id·시각 병기)
  ② 없으면 bead 커스텀 `prompt` 필드 ③ 그것도 없으면 `defaultTaskPrompt`
  미리보기를 "예상 기본 과업" 라벨로.
- Monitor 트랜스크립트 뷰어에 해당 attempt의 발송본(시스템+과업) 표시 —
  `get-attempt-prompt` 재사용.

### 6. 오류 처리

- 프롬프트 기록이 없는 attempt: UI는 "기록 없음" 표시(fail-quiet).
- `get-*` 요청 실패: 섹션에 오류 문구, 다른 UI 동작에 영향 없음.

## Test scope

RED→GREEN 시드 대상 seam:

1. `applyPreamble` — `{system_prompt, task_prompt}` 분리 반환과 옵션 조합
   (fast_track × pr_submit × target_base 유무)별 golden snapshot
   (`preamble.test.js`).
2. `claudeSpec().buildArgv` — `--append-system-prompt` 포함, positional은
   task만, resume 분기 동일 (`claude.test.js`).
3. attempt 레코드 프롬프트 필드 영속 — spawn 경로별 기록 (`queue-store` /
   session 테스트).
4. 프로토콜 `get-attempt-prompt`·`get-worker-system-prompt` 요청/응답과
   missing 케이스 (프로토콜 테스트).
5. 이슈 상세 과업 섹션 접힘/펼침·우선순위 폴백, 설정 다이얼로그 시스템
   프롬프트 표시 (프론트 렌더 테스트).

기존 preamble 문자열을 단언하는 테스트는 새 구조로 갱신한다(구현 코드를
테스트에 맞추지 않는다는 원칙 위반 아님 — 계약 자체가 바뀌는 변경).

## 적용 순서·검증

1. 구현·테스트 → Pre-Handoff Validation(tsc/test/lint/prettier) + `npm run
   build`(번들 포함 커밋).
2. PR → 사람 머지 클릭 → 워커 자동 정리 sweep이 `docs/agents/repo-ops.toml`
   `[deploy]` 선언(`bdui-shared restart`, detached)으로 재시작.
3. 재시작 후 검증: 프로세스 경로·포트·HTTP 응답 + 설정 다이얼로그에서 새
   3단 계약 전문 확인 + 신규 디스패치 attempt에서 발송본 기록·이슈 상세
   표시 확인.
