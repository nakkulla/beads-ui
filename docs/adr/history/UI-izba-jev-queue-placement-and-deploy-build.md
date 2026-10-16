---
id: UI-izba
title: jev 쌍 판정 대기열 배치 추천과 배포·빌드
status: superseded
superseded_by: UI-i7k9
date: 2026-10-16
summary: "Worker 대기열 배치 추천은 서버가 jev 쌍 판정(두 이슈 재료 digest로 캐시)과 고정 조건(blocks·scope 겹침)으로 쌍 관계를 만들고 화면이 현재 큐·후보 순서로 자리를 계산해 Worker 탭 후보 카드의 별도 [추천 배치] 버튼을 누를 때 점선 미리보기로 보이고([↴ 대기로] 수동 메뉴는 그대로) 레인에는 사람의 [적용]·[전체 적용]만 쓴다; 큐 변화는 jev를 부르지 않고 추천은 blocks 의존을 쓰지 않으며 질문 정의는 beads-ui 서버에 둔다; UI-u6ud-5의 나머지 조항(배포·빌드)은 그대로다"
supersedes: ["UI-u6ud-5"]
spec: docs/superpowers/specs/2026-10-16-jev-queue-placement-preview-design.md
bead: UI-izba
---

# jev 쌍 판정 대기열 배치 추천과 배포·빌드

## Context

- `UI-u6ud-5`는 배포 실행·빌드 소유와 함께 "병렬성 분석 기능은 없다"를 상시 조항으로 들고 있었다. 2026-08의 병렬성 분석(ADR 0009로 제거)은 버튼을 눌러야 분석이 돌았고 느려서 실시간으로 쓸 수 없었다. 0009 본문은 제거 이유를 신뢰·채택 실패로 적었지만, 사용자 증언(2026-10-16)으로 실제 이유는 느림·실시간 불가였다.
- 지금은 대기열에 넣을 이슈의 병렬·직렬 레인 배치를 사람이 매번 정한다. 결정적 신호(blocks 재정렬, spec scope 겹침 `⧉` 칩)는 이미 있지만 경로로 안 보이는 관계는 없다.
- jev 실측(workflow 판정 로그 1,787건)은 응답 p50 403ms·p90 940ms였다. 볼 때마다 부르면 지연이 남고, 미리 판정해 캐시하면 누르는 순간 기다리지 않는다.
- 이 ADR은 `UI-u6ud-5`를 대체한다. 배포·빌드 조항은 바뀌지 않고 아래 Decision에 그대로 다시 적는다. 뒤집는 조항은 "병렬성 분석 기능은 없다" 하나다.

## Decision

대기열 배치 추천

- 서버(`server/placement/`)는 후보와 다른 항목(다른 배치 가능 후보, 병렬·직렬 대기 항목, 레인을 점유한 구현 lineage)의 쌍 관계를 만든다. 고정 조건이 먼저다: blocks 의존은 순서, 선언 scope 겹침은 충돌이고(같은 spec·plan에서 나온 쌍은 `⧉` 칩처럼 겹침으로 보지 않는다) jev에 묻지 않는다. 나머지 쌍만 jev가 판정한다.
- jev 질문 정의(`placement_pair`)는 beads-ui 서버 상수다(ADR dotfiles/dotfiles-hkski). 모델·엔드포인트·시간 제한은 workflow 판정과 같은 값을 코드 registry로 두고 cross-runtime 테스트가 dotfiles 값과 대조한다(ADR UI-u6ud-2). 키는 `TYPESAFE_API_KEY`, 없으면 설치 dotfiles checkout의 `secrets-get typesafe/api-key`이고 프로세스 메모리에만 둔다 — 브라우저 wire와 호출 기록에 키·본문을 싣지 않는다.
- 쌍 판정은 두 이슈 재료 digest·질문 버전·모델을 키로 서버 상태 디렉터리에 캐시한다. 큐 변화는 jev를 부르지 않는다. 재료가 바뀐 쌍만 다시 묻고 호출 자동 일정·채택 확신도·실패 재시도 간격·동시 호출 수는 `server/placement/question.js`·`wire.js` 상수가 정한다.
- worker-queue wire는 `placement_relations`(쌍 관계·출처·확신도)와 `placement_status`(후보 상태)를 싣는다. 자리 계산은 화면의 순수 함수(`app/utils/placement/`)가 현재 큐 스냅샷·후보 정렬·고른 집합으로 하고, 레인 blocks 정렬 함수 `orderLaneByBlocks`는 서버 store와 화면이 같은 모듈을 쓴다. `queue-place.js`는 레인 판단을 하지 않는다.
- 추천은 Worker 탭 후보 카드 슬롯 6의 별도 `[추천 배치]`를 누를 때만 점선 미리보기로 보인다. `[↴ 대기로]` 수동 레인 메뉴는 그대로이고, jev를 못 쓰는 어떤 경우에도 수동 배치를 막지 않는다. 모니터 탭과 이슈 상세에는 달지 않는다(monitor-worker parity §9).
- 레인에는 사람의 `[적용]`·`[전체 적용]`만 쓴다. 미리보기를 계산한 스냅샷 revision으로 CAS 전송하고, 충돌이면 최종 자리가 같을 때만 한 번 다시 보낸다. 추천은 레인 배치만 쓰고 blocks 의존을 쓰지 않는다.

배포 실행과 프런트엔드 빌드 (UI-u6ud-5 승계)

- Worker는 저장소 지식이 없는 실행기만 소유한다: 큐 안의 durable `repo_operations` journal, 락 아래 직렬화되는 bind → prerecord → align → spawn 경로, 전용 detached 워크트리 `.worktrees/.repo-ops-deploy`, detached 일회성 자식 프로세스의 exit·timeout 관측.
- 저장소별 apply와 readback은 핀된 base SHA에서 읽은 `repo-ops/config.toml`의 `[deploy]` 스크립트가 전부 소유한다. 이 저장소에서는 그 스크립트가 self-flock, HEAD 검증, 빌드, 재시작, health identity readback을 수행한다.
- reconciler, 외부 deployment job, candidate release 디렉터리와 `current` symlink, runtime marker 읽기·쓰기, self-restart helper는 없고 retirement checker가 그 토큰의 재등장을 막는다.
- 스크립트의 restart marker 파일은 진단용 흔적이지 성공 판정의 authority가 아니다. 성공 조건은 health identity readback이다.
- 수동 `[배포 실행]` 버튼이 저장소 작업 화면에 있다.
- 배포 해소 사다리는 `script_retry` 한 단계이고 토글 없이 상시다.
- `app/main.bundle.js`·`app/main.bundle.js.map`은 tracked가 아니다(`.gitignore`). `package.json#files`의 두 항목은 유지해 `prepack`이 만든 파일이 패키지에 들어간다.
- 빌드 소유자는 배포(`repo-ops/script/deploy`), 머지 직전 `repo-ops/script/verify`(`npm run tsc` 뒤·`npm test` 앞에 `npm run build`), 패키징(`prepack`) 셋이다.
- 정적 모드 서버(`server/app.js`)는 시작 시 번들이 없으면 `npm run build`와 `BDUI_FRONTEND_MODE=live`를 안내하는 오류로 종료한다. 자동 빌드도 live 모드로의 조용한 fallback도 없고, on-demand 번들은 live 모드에만 있다.
- 어떤 테스트도 커밋된 번들의 존재에 의존하지 않고 정적 모드 응답은 임시 `app_dir`의 번들 fixture로 검증한다.
- 번들 커밋이 남은 PR·워크트리는 base 동기화의 modify/delete 충돌에서 삭제를 채택한다. 별도 마이그레이션 스크립트는 없다.

## Consequences

- 되돌리려면 worker-queue wire 필드 `placement_relations`·`placement_status`, `server/placement/`의 jev 클라이언트·쌍 캐시·일정, `app/utils/placement/` 자리 계산, 카드 슬롯 6의 `[추천 배치]`와 카드 문법 스펙 §5.1 행, parity §9 행, 저장된 쌍 캐시, jev 키 소비가 함께 움직인다.
- 이슈 제목·본문·spec 절이 jev(외부 API)로 나간다. 그 대가로 사람이 매번 배치를 정하는 부담이 준다. 키가 없는 서버에서는 `[추천 배치]`가 꺼진 채 수동 배치만 남는다.
- 기각한 대안: dotfiles workflow 판정 pack을 새로 두고 서버가 `workflow-judge.py`를 spawn — pack·호출 상한·로그가 Bead 하나 기준이라 쌍 질문과 맞지 않고 호출마다 Python을 띄운다. 버튼을 눌러야 분석 — 0009를 지운 이유를 되풀이한다. 볼 때 jev 호출 — 0.4~0.9초 지연이 남는다. `[적용]`이 blocks 의존까지 쓰기 — 잘못된 판정이 구현 진입을 막는다.
- 배포·빌드 조항은 `UI-u6ud-5`에서 바뀌지 않았다. 그 밖에 폐기한 조항은 없다.
