---
id: UI-jbl1
title: 실패 대화 자동 기동과 확인 필요 알림 통일
status: accepted
date: 2026-10-07
summary: "실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 폐기 실패, 수동 배포 실패)은 공용 대화 자동 기동 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 실패당 한 번 자동으로 열고, 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일해 「🚨 사람 필요」를 없앤다; 수동 배포 실패는 「저장소 작업」 서랍의 [세션에서 이어가기]와 작업 식별자 키의 대화 레코드를 가지며 인계는 그 작업 1회 재실행이다"
supersedes: ["UI-qbgj", "UI-18a5-2", "UI-18a5-3"]
spec: docs/superpowers/specs/2026-10-06-failure-conversation-auto-launch-design.md
bead: UI-jbl1
---

# 실패 대화 자동 기동과 확인 필요 알림 통일

## Context

이 결정은 `ADR UI-qbgj`(대화형 세션 이어가기 짝과 외부 작업 바로 실행)·`ADR UI-18a5-2`(대화형 레코드 원천과 정산 세 종류)·`ADR UI-18a5-3`(머지 게이트 보류와 실패 행 출구)를 다시 쓴다. 세 ADR과 소비자(`notify.js` 알림 제목, 대화 레코드 키를 읽는 reconcile·투영·UI, 실패 행 출구, 진입 블록 사본과 다이제스트)를 공유하므로 새 주제가 아니다. 대화와 수리의 경계, 공용 스위치, 진입 블록의 읽기 전용 진단, Bead 없는 저장소 작업 실패 대화의 정본은 dotfiles `ADR dotfiles/dotfiles-ids1k`(실패 대화 세션 자동 기동 계약)이고 이 ADR은 그 소비자 쪽 결정이다.

UI-jbl1(2026-10-06): oliveyoung 수동 배포(`[배포 실행]`) 실패를 진단하던 중, 수동 배포 실패는 subject가 `manual` 자리표시라 `[세션에서 이어가기]`가 없고, 실패(「🚨 사람 필요」)는 알림 뒤 클릭으로만 세션이 열리는 반면 멈춤(「🙋 확인 필요」)은 세션을 자동으로 띄워 두 경험이 갈렸다. 해결 세션은 원래 세션의 런타임을 따르고 모델·effort를 넘기지 않았으며, 자동 기동 스위치는 config.toml에만 있었다.

사용자 결정(2026-10-06): (가) 수동 배포 실패에도 `[세션에서 이어가기]`를 「저장소 작업」 서랍 안에 둔다. (나) 해결 세션의 기본 런타임·모델·effort와 대화 자동 기동 스위치를 설정 창 전역 탭에서 정한다. (다) 실패 때도 대화 세션을 자동으로 띄우되 읽기 전용 진단 뒤 질문만 하고 답 전에는 상태를 바꾸지 않으며, 「🚨 사람 필요」를 「🙋 확인 필요 · <클래스>」로 통일한다.

- `UI-qbgj`: UI-18a5 승계 조항의 "자동 기동은 사람 판단 멈춤에만" 굵은 결정·대상 행·살아 있는 대화 판정 단위·알림 조항 변경, 나머지 유지.
- `UI-18a5-2`: 대화 레코드 키·해결 세션 원천·인계 출구 조항 변경(저장소 작업 행), 나머지 유지.
- `UI-18a5-3`: 남는 `needs_human` 알림 클래스 조항 변경(알림 제목 통일·자동 기동), 나머지 유지.
- 전제: ADR UI-ooc0 — 서버 전역 편집은 기존 전역 탭 하나에 둔다.
- 전제: ADR UI-u6ud-5 — 수동 `[배포 실행]`과 `script_retry` 한 단계 사다리를 그대로 쓴다.
- ADR 0005(무인 수리 레인 폐기)는 그대로다. 자동으로 연 실패 대화는 수리 dispatch가 아니고, 구분 근거는 "첫 사용자 답 전 상태 변경 없음"이다.

아래 승계 조항의 맥락은 `docs/adr/history/`의 세 원본에 있다.

## Decision

**실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 폐기 실패, 수동 배포 실패)은 공용 대화 자동 기동 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 실패당 한 번 자동으로 연다. 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일하고 「🚨 사람 필요」를 없앤다. 수동 배포 실패는 「저장소 작업」 서랍의 `[세션에서 이어가기]`와 작업 식별자 키의 대화 레코드를 가지며 인계는 그 작업 1회 재실행이다.**

실패 자동 대화

- 시점은 실패가 종단으로 기록된 뒤 한 번이다. 알림과 기동은 같은 1회 표시를 공유하고, 기동 전에 표시를 먼저 쓴다. 재시작·재관측·reconcile은 다시 띄우지 않는다.
- Bead 행(배포·post-merge 잡 실패, 머지 게이트 보류)은 completion intent 종단 처리의 1회 알림 판정 옆, 폐기 실패는 폐기 실패 알림 자리, 저장소 작업 행은 공통 종단 진입 `recoverAfterLadder`가 자리다. 저장소 작업은 `failed`로 바꾸는 같은 쓰기에 대화 대상 표시를 남기고, `recoverAfterLadder`가 대상 표시가 있고 소비 표시가 없을 때만 소비 표시를 먼저 쓴 뒤 알림·기동한다. 대상 표시 없는 옛 실패 기록은 소비된 것으로 본다.
- 기동은 클릭과 같은 해결 세션 기동 함수를 같은 기동기로 부르고 배치만 `placement: 'inquiry'`(분리된 대화 tmux 세션 창)다. 원천 순서는 클릭과 같고, 진입 블록은 실패 사유와 계약의 읽기 전용 진단으로 채운다.
- 스위치가 꺼져 있거나 그 행에 살아 있는 대화가 있으면 띄우지 않는다. `script_retry` 대기는 종단이 아니므로 띄우지 않는다. 머지 전 검증 보류·정리 중단·외부 작업 완료는 자동 기동하지 않는다.
- tmux가 없거나 기동에 실패하면 알림만 보내고 본문에 열지 못했다고 적으며 다시 시도하지 않는다. 클릭으로는 계속 열 수 있다.

알림

- 종단 실패 알림 제목은 `🙋 확인 필요 · <클래스>`다. 클래스 문자열은 현행 표 그대로이고 머지 게이트 보류는 계약 `notify_label`의 바이트 사본이다.
- 본문은 현행 실패 본문(클래스·원인·다음)에 대화 줄 하나(`대화: Discord 스레드 · tmux <세션:창>` 또는 `대화를 열지 못함 — [세션에서 이어가기]`)를 더한다. 실패 한 건당 알림 하나다.
- 멈춤 대화의 `🙋 확인 필요`, `⏸️ 머지 보류`·`❌ 실패`·`⏸️ 파킹` 등 다른 제목은 바꾸지 않는다.

저장소 작업 실패 대화

- 「저장소 작업」 서랍의 실패한 수동 배포 행이 `기록 닫기` 옆에 `[세션에서 이어가기]`를 갖는다. 서랍을 함께 쓰는 모니터 탭과 Worker 탭에 같이 보이고, 살아 있는 대화 판정은 `tile-resolve.js`가 한다.
- 클릭은 작업 식별자로 fresh 대화를 열고 Bead를 조회하지 않는다. 레코드 키는 `repo-op:<operation_id>:resolve`다.
- 결과 줄: `인계`는 같은 저장소 작업을 `[배포 실행]` 재클릭과 같은 경로(tip 선언)로 한 번 다시 실행하고, 실행 예약을 레코드에 먼저 남겨 재시작 뒤 다시 돌리지 않는다. `보류`는 행을 그대로 둔다. `인수`는 대화형 세션으로 넘어가고 큐 쪽 행은 그대로 둔다.

실행 설정

- 공용 스위치(멈춤·실패 공용)와 fresh 세션 런타임(원래 세션 따름·claude·codex), Claude·Codex 각각의 모델·effort를 설정 창 일괄 모드 `전역` 탭의 한 섹션에서 정하고 서버 전역 설정 파일에 둔다. `workflow_session_defaults`에는 넣지 않는다.
- 스위치는 저장값이 있으면 저장값, 없으면 config.toml `[worker.direction_inquiry] enabled`다. 파일이 손상되면 config.toml 값과 "따름"으로 돌아가고 경고를 남긴다.
- 런타임은 fresh 기동에만 쓰고 이어 쓰기·fork는 원래 세션 런타임이다. 모델·effort는 모든 대화 기동(클릭·자동, 멈춤·실패·외부 작업 완료)에 기동 런타임의 플래그로 붙이고, "따름"이면 붙이지 않는다.

승계 조항의 읽기

- 아래 승계 조항의 자동 게이트 `worker_direction_inquiry.enabled`는 공용 대화 자동 기동 스위치(저장값, 없으면 그 config.toml 값)로 읽는다. "Bead당 하나"인 대화 수는 "행(Bead 또는 저장소 작업)당 하나"로 읽는다.

### ADR UI-qbgj에서 승계하는 조항

**대기 중인 Slurm 등록 잡의 대기 사유·앞 대기 수·예상 시작·파티션 배정·호스트 실제 여유는 같은 관찰 ssh 안의 읽기 전용 조회로 얻는 표시 재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다. 외부 잡을 바꾸는 유일한 경로는 사람이 확인한 `▶ 바로 실행`이고, 단일 대기 Slurm 잡을 `sjob takeover` 한 명령으로 같은 호스트 로컬 실행(워크플로면 `profiles/server-local`로 하위 단계까지)으로 옮긴 뒤 같은 대기 레코드에서 `sjob_local` 잡으로 제자리 교체한다.**

용량 재료

- slurm 등록 잡이 `PENDING`일 때만 관찰 ssh 한 번 안에서 각 조회를 시간 상한으로 감싸 읽는다. 재료 실패는 저장된 값을 그대로 두고 레코드의 오류 횟수·백오프에 닿지 않으며, `PENDING`을 벗어나면 지운다.
- 호스트 실제 여유(CPU 수·1분 부하·`MemAvailable`)는 ssh 호스트가 파티션 노드일 때만 채운다. 바로 실행이 도는 곳이 그 호스트라서다.
- 오래된 재료는 읽은 시각으로 드러낸다.

바로 실행

- 노출 조건은 레코드 stage가 `hold`·`detached`이고 잡이 정확히 하나이며 그 잡이 진행 표시 없는 `PENDING` slurm 잡인 경우다. 서버가 카드 조작을 내리고 렌더러는 다시 판정하지 않는다.
- 레코드별 조작 잠금이 진행 중 관찰과 직렬화하고, ssh 전에 그 잡에 진행 표시(`takeover`, 계약 필드 `state`·`requested_at`·`cpus`·`mem_gb`)를 영속한다. 표시가 있는 동안 그 잡의 일반 Slurm 종료 판정과 재요청을 막는다.
- 결과 불명은 관찰 차례마다 `sjob takeover <id> --result --json`으로 복구한다. `started`·`done`은 제자리 교체, 미보류 `no_takeover`는 원격 takeover가 ssh보다 오래 살 수 있으므로 정착 창(`TAKEOVER_SETTLE_MS`, 현재 기본 5분)이 지난 뒤에만 표시를 지운다. 정착 창을 넘긴 표시는 사람 조치(`바로 실행 결과 확인 필요`)로 판정한다.
- 교체는 bd `external_wait` 키·`wait_id`·stage·owner·hold 예산을 바꾸지 않는다. 완료 식별은 `<ssh_host>:<local_id>`이고 완료 프롬프트는 Slurm에서의 전환과 원 잡 취소 미확인을 적는다.
- 자원 기본값의 비율은 타이밍 설정 표가 아닌 별도 서버 전역 설정(`server/external-wait-settings.js`)이 소유한다.
- 관찰 자체는 여전히 잡을 바꾸지 않는다. "실행 방식(작은 머리 잡 + 하위 잡)은 바꾸지 않는다"는 기본 실행 방식에 관한 것으로 유지하고, 바로 실행만 프로젝트의 `profiles/server-local`로 워크플로 전체를 정한 코어 안에서 로컬로 돌린다.

### ADR UI-18a5에서 승계하는 조항


**beads-ui가 여는 대화형 세션(확인 필요·실패·외부 작업 완료)은 모두 `[세션에서 이어가기]` 하나로 열고 `인계`·`인수`·`보류`로 끝난다. `[워커로 이어가기]`는 대화 없이 Worker가 잇는 짝이고, `인계`는 그 행의 Worker 출구를 사용자 답의 권한으로 많아야 한 번 실행하며 머지 게이트 위조 판정은 예외다. 외부 작업 완료 대화가 인수·인계 없이 끝나면 대기 키를 다시 써 완료 행으로 되돌린다. 자동 기동은 사람 판단 멈춤과, 공용 스위치가 켜졌을 때의 실패 종단에 둔다(변경, UI-jbl1).**

대상 행과 두 버튼

- `[세션에서 이어가기]`가 설 수 있는 행은 확인 필요(파킹·복구 대기), 실패(머지 전 검증 보류·`needs_human` 종단·`cleanup_failed`·실패한 폐기·실패한 수동 배포 저장소 작업(변경, UI-jbl1)), 외부 작업 완료(세션 소유 외부 대기의 `completing` 행) 셋이다. 그 행(Bead 또는 저장소 작업, 변경 UI-jbl1)의 살아 있는 대화형 세션이 종류와 상관없이 하나라도 있으면 서지 않는다.
- 클릭 op는 하나이고 서버가 행 상태로 런처를 고른다: 확인 필요 → 문의 런처, 외부 작업 완료 → 외부 재개 런처, 실패 → 해결 런처. 내부 종류(`inquiry`·`resolve`·`external_resume`), pane 마커 셋, 창 이름, fork·같은 세션 재개 방식, 자동 기동 게이트는 그대로다.
- `[워커로 이어가기]`는 기존 op의 이름을 맞춘 것이다: 확인 필요는 대화 인계, 외부 작업 완료는 Worker attempt fork 재개, 실패의 머지 후 정리는 정리 재시도, 실패의 폐기는 폐기 재시도. 머지 전 검증 보류와 `needs_human` 머지 게이트 행에는 그리지 않는다 — 그 행에서 Worker가 잇는 조작은 `[머지]`다.
- 짝의 유무와 자리는 `tileResolveFields` 하나가 정하고 PR 대기 행과 저장소 작업 타임라인도 그 판정을 그린다. 짝은 모든 카드에서 슬롯 6이다(카드 문법 스펙 §5.1 정정(UI-18a5)). `인수` 동안은 짝 둘만 숨기고 행의 나머지 조작은 그대로다.

첫 입력과 관측

- 세 런처 모두 dotfiles 진입 블록(`execution-common.md` `## Worker 세션 대화`)의 바이트 사본을 첫 입력으로 쓰고 블록이 정한 슬롯만 채운다. 사본의 sha256은 테스트로 고정한다.
- 세 런처 모두 레코드에 `conversation`을 쓰고 결과 줄 관측·답 대기 판정·`❓ 답 대기`·`🙋 사람 인수`가 종류와 상관없이 같은 규칙으로 돈다. (변경, UI-jbl1) `🙋 확인 필요`는 멈춤 자동 기동과 실패 종단 알림(`🙋 확인 필요 · <클래스>`)에 보낸다. `🚨 사람 필요` 제목은 없다. `⏸️ 머지 보류`, 외부 작업의 `✅ 외부 작업 완료`는 그대로다.

끝맺음

- `인계 ·`는 창을 닫고 소멸을 확인한 pass가 그 행의 Worker 출구를 실행한 뒤 레코드를 지운다. 확인 필요는 같은 attempt를 같은 세션으로 재개하고, 실패의 머지 후 정리는 사람 클릭과 같은 권한(`job_retry_authorized`)의 정리 재시도, 실패의 폐기는 폐기 재시도, 머지 전 검증 보류는 `[머지]`와 같은 머지 큐 재등록, 외부 작업 완료는 그 대화 세션을 원천으로 현행 fork·admission·실행 설정 규칙의 Worker attempt 하나를 `## 대화 결과` 블록과 함께 dispatch한다. 머지 게이트 `needs_human`은 실행하지 않고 `보류`처럼 끝난다 — `[머지]` 재클릭은 그 head의 영수증 tier를 waive하고 영수증 보류 출구는 사람 전용이다.
- 인계 실행 한 번은 사람 클릭 한 번이다. 자동 사다리 단계가 아니며 `script_retry` 횟수를 쓰지 않는다.
- 한 번 규칙: 실패는 `handoff` 예약에 대상 식별(정리 실패의 단계·기록 시각, 폐기 `operation_id`와 오류, 보류 head)을 고정하고 출구를 부르기 직전에 실행 시작 시각을 레코드에 durable하게 쓴다. 출구는 그 정산 pass 밖에서 돈다. 재시작한 pass는 식별이 바뀌었으면 실행된 것으로 보고 레코드를 지우고, 실행 시작이 있는데 식별이 그대로면 다시 실행하지 않고 `이어가기 거절: 결과 미상`으로 끝낸다. 외부 작업 완료는 dispatch된 attempt가 대화 식별(레코드 키·`launched_at`)을 싣고, 재시작한 pass는 그 attempt가 있으면 소진으로 본다; 예약 뒤 attempt 기록 전 재시작의 정산은 남은 대화 레코드로 같은 dispatch를 복원한다. 확인 필요는 자식 attempt의 `resumed_from`이다.
- 실행 전 거절(행이 이미 정산됨·op 사전조건 실패·진행 중 조작)은 레코드를 지우고 이유를 카드(`이어가기 거절: <사유>`)와 타임라인에 남긴다. 행은 그대로이고 짝이 다시 선다.
- `인수 ·`는 창을 두고 Worker는 관찰만 한다. `보류 ·`는 창을 닫고 확인 필요·실패 행은 그대로 남아 짝이 다시 선다. 결과 줄 없이 창이 사라지면 확인 필요는 `pane_gone`, 실패는 행이 그대로 남는다.
- 외부 작업 완료 대화가 인수·인계 없이 끝나면(보류, 결과 줄 없이 창 소멸, 인계 실행 전 거절) Worker는 같은 `wait_id`로 bd `external_wait` 키를 다시 쓰고 readback한 뒤 레코드를 `resumed`에서 `completing`으로 되돌리고 `resume`을 비운다. 순서는 키 쓰기 → readback → 레코드 전이이고 중간에 멈추면 다음 pass가 같은 순서를 다시 한다.
- `↪ Worker가 이어감`은 인계가 실행을 시작했을 때 한 번 보낸다(`실행: <정리 재시도|폐기 재시도|머지 큐 재등록|attempt 재개>`).

승계 조항의 읽기

- 아래 승계 조항의 대화 대상(사람이 필요한 멈춤)은 위 세 행으로 넓어진다. 승계 조항 안의 `[세션에서 해결]`은 `[세션에서 이어가기]`로, 실패 카드의 `[정리 재시도]`와 폐기 실패의 `[재시도]`는 `[워커로 이어가기]`로 읽는다. 실패 attempt 타일 슬롯 1의 `↻ 이어하기`·`↻ 정리 재시도`와 잔재 백업의 `백업 정리 재시도`·`백업 포기`는 그대로다.
- 대화형 세션 배지·대기 팝업·시각 줄의 종류 이름(`재개`·`해결`·`문의` 세션)은 `대화 세션` 하나다. fork·같은 세션·새 세션 구분은 툴팁에만 둔다.
- 배포 시점에 살아 있던 `conversation` 없는 해결·외부 재개 레코드는 옛 규칙으로 정산한다.

### ADR UI-ny0h-2에서 승계하는 조항

**미분류 실패 재시도 사다리와 base_moved 재개 지연의 길이는 서버 전역 타이밍 설정이 정하고 두 값은 서로 독립이다.** 사다리 칸 길이는 `env_retry_delays_seconds`, base_moved 재개 지연은 `base_moved_retry_seconds`(`server/timing-settings.js`)이다. 값은 지연을 계산하는 순간에 읽고, 바뀐 값은 다음 예약부터 적용되며 기록된 `next_at`은 다시 쓰지 않는다.

#### ADR UI-q15q에서 승계하는 조항

**외부 작업의 하위 잡은 등록 잡과 같은 사용자·같은 `WorkDir`에서 등록 잡 시작 이후 제출된 Slurm
잡이다. 사용자 큐와 Slurm 작업 완료 기록만으로 관찰하고 로그는 읽지 않는다. 하위 잡은 표시
재료일 뿐 대기 판정·완료·digest·알림에 들어가지 않는다. 사람이 필요한 멈춤의 같은 세션 대화와
그 밖의 UI-nuwy 조항은 그대로다.**

외부 작업 하위 잡 (UI-q15q가 더함)

- 소속 기준은 등록 slurm 잡의 사용자·작업 폴더·시작 시각(`anchor`)이다. 기준이 없으면 하위 잡을
  판정하지 않는다. 같은 호스트·폴더의 등록 잡이 여럿이면 하위 잡 제출 시각 이전에 시작한 등록
  잡 중 가장 늦게 시작한 잡에 붙인다. 다른 Bead의 같은 폴더 동시 실행은 구분하지 않는다.
- 관찰은 기존 관찰 ssh 한 번 안의 읽기 전용 조회(사용자 큐, `jobcomp/filetxt` 완료 기록)다.
  잡을 바꾸지 않는다(`mutates_job: never`). 하위 잡 재료의 실패는 저장된 하위 잡을 바꾸지 않고
  레코드의 `error_count`·`last_error`·백오프에 닿지 않는다.
- 등록 slurm 잡은 표시 필드 `name`·`anchor`·`spawned`(`total`·`counts`·`rows`·`omitted`)를 갖는다.
  개수는 행 상한과 무관하게 정확하고, 행 상한 값은 서버 상수(`SPAWNED_COMPLETED_ROW_LIMIT`)가
  소유한다. 하위 잡은 등록 판정·hold 판정·`completion`·`completionDigest`·판정 배지·알림에
  들어가지 않는다.
- 카드 슬롯 3은 등록 잡을 이름으로 보이고 하위 잡 요약 줄을 붙이며, 슬롯 1 배지는 등록 잡만
  센다. 표시 형식은 `docs/superpowers/specs/2026-10-02-external-job-spawned-slurm-jobs-design.md` §3.5·§3.6과 카드 문법 스펙 §5.1 정정(UI-q15q)이 소유한다.

#### ADR UI-nuwy에서 승계하는 조항

**사람이 필요한 멈춤은 같은 Worker 세션을 fork 없이 tmux 대화형으로 열어 해결한다. 대화 턴
종료는 답 대기(`action_required`)이고, 첫 줄 `인계 ·`를 관측하면 창 소멸을 확인한 뒤 같은
attempt를 같은 세션·기록 실행 설정으로 재개한다. `인수 ·`면 관찰만, `보류 ·`면 대기로 남는다.
알림은 `🙋 확인 필요`·`❓ 답 대기`·`↪ Worker가 이어감`·`🙋 사람 인수` 넷이다.**

대화 대상

- 대상은 파킹(`awaiting_user` 문자열, 어휘 안팎 모두)과 복구 대기 중 사유가 `authority`·
  `no_progress`인 것이다. 이미 기록된 옛 사유(`verification`·`reconcile`·세션 선언
  `unclassified`·빈 blockers `prerequisite`)도 읽기 호환으로 대상이고 진입 블록은
  `recovery:<사유> (옛 기록)`으로 적는다.
- 술어는 `session-stall.js` 하나(`isSessionStalledRecovery`, 현행 사유 집합
  `CONVERSATION_RECOVERY_REASONS`, 멈춤 표기 `conversationStopLabel`)이고, 현행 사유 집합은 핀
  투영의 `result_line_reasons`와 대조하는 테스트로 고정한다.

기동 — 같은 세션, fork 없음

- 기동 조건은 자동 게이트 `worker_direction_inquiry.enabled`, tmux(닿지 않으면 fail-closed),
  Bead당 하나다. 사람 클릭 `[세션에서 해결]`은 게이트를 읽지 않는다.
- 명령은 attempt의 기록 세션을 그대로 연다: Codex `codex resume <session_id> <진입 블록>`,
  Claude `claude --resume <session_id> <진입 블록>`(`--fork-session`·새 `--session-id` 없음). cwd는
  attempt 워크트리이고 레코드는 `mode: 'resume'`이며 `session_id`를 기동 시점에 안다.
- 한 세션 ID에는 프로세스 하나다. attempt의 `process_identity`가 가리키는 러너가 살아 있으면
  `runner_alive`, 확인할 수 없으면 `runner_liveness_unknown`으로 기동하지 않는다. Worker 재개도
  대화 창의 소멸을 reconcile이 확인한 뒤에만 한다.
- 기록 세션을 열 수 없으면(전사 없음·다른 호스트·러너 불명·워크트리 없음) fresh 세션(변경, UI-jbl1: 런타임은 공용 대화 설정, "원래 세션 따름"이면 같은 provider)에 진입 블록을 주고 `fallback_reason`을 기록한다. 그때 인계 뒤 재개는 `resume()`의
  기존 사다리가 정한다.
- 첫 입력은 dotfiles `execution-common.md` `## Worker 세션 대화` 진입 블록의 바이트 사본 하나
  (`CONVERSATION_ENTRY_BLOCK`, sha256 `cdc347bb…`)이고 beads-ui는 멈춤 사유·세션이 남긴 문장·두
  경로만 채운다. 옛 fork 문의 프롬프트 4종은 은퇴했다. 배포 시점에 살아 있던 `mode: 'fork'`
  레코드는 옛 규칙으로 정산한다.

관측과 판정 — 새 assistant 메시지 단위

- 대화가 살아 있는 동안 단계(`turn_state`)는 현행대로 pane 옵션이 정한다. 결과 줄과 답 대기는
  단계 전환이 아니라 **새 assistant 메시지** 단위로 처리한다: 매 pass(`INTERACTIVE_RECONCILE_INTERVAL_SECONDS`, 현재 30초) 전사 끝(현재 64KB)에서
  마지막 assistant 메시지와 그 식별자(메시지 시각, 없으면 전사 mtime)를 읽고, 기동 뒤이면서
  마지막 처리 식별자보다 새 메시지이고 단계가 `running`이 아니면 한 번 처리한다. 관측 사이에
  시작하고 끝난 턴도 잡힌다. 처리한 식별자와 발췌(`PROGRESS_EXCERPT_MAX_CHARS`, 현재 400자)는 같은 레코드 쓰기에 남는다.
- 첫 줄이 `인계 ·`·`인수 ·`·`보류 ·`로 시작하면 결과 줄이고, 그 밖은 답 대기다.

  | 대화 레코드 상태 | verdict | 카드 조작 |
  | --- | --- | --- |
  | 살아 있는 대화 없음 | `action_required` · `decision` | `[세션에서 해결]` · (`결과 줄 없이 창이 사라진` 경우) `[워커로 이어가기]` · `폐기` |
  | `running` | `normal` (대화 중) | `폐기` |
  | 기동 뒤 assistant 메시지 없음(`idle`·`null`) | `normal` (기동 중) | `폐기` |
  | `question`·`limit`, 또는 결과 줄이 아닌 메시지를 처리한 `idle` | `action_required` (답 대기) | `[워커로 이어가기]` · `폐기` |
  | 인계 예약·사람 인수 | `normal` | `폐기` |

- 결과 줄 없이 창이 사라지면 레코드를 지우고 attempt에 `pane_gone`을 남겨 확인 필요로 되돌린다.
  옛 fork 레코드는 UI-ri8n 규칙(질문·한도만 `action_required`) 그대로다.

인계 — Worker가 같은 세션을 이어감

- `인계 ·`(또는 `[워커로 이어가기]`) → 레코드에 `handoff` 예약(결과 줄·메시지 식별자)을 쓰고 창을
  닫는다(Claude `/exit`, Codex 창 종료). 소멸을 확인한 pass가 이어가기를 한 번 실행하고, 그것이
  돌아온 뒤에야 레코드를 지운다(재시작 중간이면 다음 pass가 다시 실행하고, 이미 자식이 있으면
  소진으로 본다).
- 살아 있는 대화나 `handoff` 예약이 있는 동안 `onIssuesChanged`의 파킹 해제 전이 재디스패치는
  보류한다. 창 소멸 뒤 이어가는 경로는 하나다: 대화의 사용자 답 턴에서 `awaiting_user`가 이미
  해제된 stale 파킹은 기존 해제 전이 재디스패치가 한 번 잇고 `resume()`은 부르지 않는다. 그 밖은
  `resume(workspace, attempt_id, { continuation: 'prior_session', conversation_return })`이다.
- `resume()`는 자식 attempt(`resumed_from`, 같은 `session_id`)를 먼저 기록하고 launch한다. 실행
  설정은 `recordedDispatchSettings(prior)`이고 가드 훅·push 로그·착지 판정은 일반 재개와 같다.
  launch 종류는 `conversation_return`이다.
- 이 경로에만 있는 예외: `parked`를 재개 가능 상태로 받고, admission의 `awaiting_user` 거절을
  `allow_conversation_return`으로 건너뛴다(해제는 재개 세션의 영수증 쓰기가 한다). WS
  `recovery_requires_inquiry`, `settledAttemptFence`, 공급자 자동 재개 차단은 그대로여서 사람
  `↻`나 자동 재디스패치로는 재개하지 않는다.
- 재개 프롬프트 첫머리에 beads-ui 소유 `## 대화 결과` 블록(대화 뒤 무인 attempt로 돌아왔다는
  사실, 이번 대화의 결과 줄 원문, 대화 단계 금지가 풀리고 무인 규칙·가드가 다시 적용되며 남은
  단계는 dotfiles `Worker 세션 대화` 표 순서라는 문장)을 둔다. notes는 읽지 않고 새 권한을 주지
  않는다.
- 자식 기록 전의 거절은 예약을 지우고 확인 필요로 되돌리며 이유를 카드(`이어가기 거절: <사유>`)에
  남긴다. 자식 기록 뒤의 실패는 그 자식의 일반 실패 처리가 맡고 대기 attempt는
  `already_resumed`로 소진된다.

인수·보류·대체 출구

- `인수 ·`: 창을 두고 Worker는 재개하지 않으며 정산은 Bead close·PR 관측(`bd_closed`·`done`)이다.
  판정은 `normal`, 배지는 `사람 인수`, 조작은 `폐기`뿐이다. 인수 세션의 push는 가드 밖이고 사람이
  명시적으로 소유한 것으로 감수한다.
- `보류 ·`: 창을 닫고 attempt는 대기로 남으며 카드는 `[세션에서 해결]`·`폐기`, 알림은 없다.
- `[워커로 이어가기]`는 대화가 살아 있고 답 대기일 때, 또는 결과 줄 없이 창이 사라진 대기
  attempt에만 선다. 누르면 인계와 같은 경로이고 결과 줄 자리에 "사용자가 [워커로 이어가기]로
  인계"를 싣는다. 재개 세션은 이번 대화의 결정(같은 세션의 자기 맥락)이 있으면 적용하고, 없으면
  원래 멈춤을 다시 판단한다. notes의 이전 `대화 결정:` 줄은 쓰지 않는다.
- 두 버튼의 유무는 `tileResolveFields` 하나가 정하고 `[워커로 이어가기]`는 서버 `wait-judgment`의
  actions 투영(`worker-conversation-handoff`)을 찾기만 한다. 렌더러는 다시 판정하지 않는다.

알림

| 종류 | 언제 | 억제 |
| --- | --- | --- |
| `🙋 확인 필요` | 대화 대상 멈춤 기록 직후 자동 기동 시도 뒤 1회(이유 `설계 충돌 · <값>`·`범위 충돌`·`같은 원인 반복`·`옛 기록 · …`, 대화 위치 또는 열지 못한 사유) | attempt `cause_detail.confirm_notified_at` — 보내기 전에 기록 |
| `❓ 답 대기` | 결과 줄이 아닌 새 assistant 메시지를 처리할 때마다(발췌 포함) | 레코드의 처리 식별자 `(bead, launched_at, message_at)` |
| `↪ Worker가 이어감` | `conversation_return` launch 성공(`결정:`·`실행:` 줄) | launch당 1회 |
| `🙋 사람 인수` | `인수` 관측 | 레코드당 1회 |

- `🙋 확인 필요`는 이 대상의 `⏸️ 파킹`과 `⚠ … 지연 · 세션이 멈춤`을 대체한다 —
  `notifyWaitReasons`는 `awaiting_user` 행과 대화 대상 복구 행을 보내지 않는다. 대화가 시작되면
  확인 필요는 소비된 채로 두고 같은 멈춤의 재알림은 `❓`가 맡는다. 보류·대화 중(`running`)은 알림이
  없고 `✅`·`📬`·`❌`는 그대로다.

카드 표면

- 대기 어휘 `awaiting_user`·`recovery` 행의 라벨은 `확인 필요`다. 대화형 세션 배지 꼬리는 대화
  레코드에서 `대화 중 <경과>`·`답 대기`·`사람 인수`다.
- 표면 판정은 서버 투영(`wait-judgment` actions·`tileResolveFields`)에만 둔다. Worker·Monitor가
  같은 `buildLanes` 경로와 같은 클릭 배선을 쓴다.

계약 핀

- `generated/contracts/work-recovery-policy.json`은 schema 2 사본이다(dotfiles
  `f031c9853f536c1478e9d1129b8c69628be27ef8`). `validPolicy`는 `result_line_reasons` 명시 목록이
  `wait_reasons`의 부분집합인지 보고 `reason`은 `wait` 항목에만, `next`는 `reconcile` 항목에만
  요구한다. `recoveryResultLineReasons()`는 그 목록을 그대로 광고한다. schema 1 핀은 받지 않는다.
- schema 2에서 이유 없는 `repair`(코드 결함 아님)·`reconcile` 작업 복구도 수정 Bead가 없으면
  사람 판단 행(`action_required`)으로 남는다.

##### ADR UI-ri8n에서 승계하는 조항

단계 관측

- `interactive_sessions` 레코드는 `turn_state`(`running`·`question`·`limit`·`idle`·`null`),
  `turn_state_since`, `last_message`(`{ text, at }`, 마지막 assistant 메시지 첫 줄, `PROGRESS_MESSAGE_MAX_CHARS`(현재 160자) 이하; 대화
  레코드는 자르지 않은 첫 줄·`PROGRESS_EXCERPT_MAX_CHARS`(현재 400자) 발췌·전사 mtime을 더 싣는다), `last_message_read_at`을 갖는다.
  reconcile pass가 `listPanesExtended` 포맷에 실린 `@agent_running`·`@agent_attention`으로 단계를
  정하고(`1` → `running`; `question`·`plan` → `question`; `limit` → `limit`; 그 밖·둘 다 비어
  있음 → `idle`), 값이 바뀔 때만 `turn_state_since`를 쓴다. `null`은 첫 관측 전 레코드뿐이다.
  전사는 `session_id`가 있고 로컬이며 mtime이 새로울 때만 끝(현재 64KB)을 읽는다
  (`interactive-progress.js`).
- 시작 타임라인 이벤트는 레코드당 1회다(첫 관측 pass).

대기 판정

- `judgeWaitReasons`의 `recovery` 분기 중 `isSessionStalledRecovery`가 참인 경우와
  `awaiting_user` 분기만 `queue.interactive_sessions[<bead>:inquiry]`를 읽는다.
  `state === 'live'`·`settled_at === null`이 "살아 있는 대화"다. verdict 표는 위 결정이다
  (UI-nuwy가 뒤집음: UI-ri8n 표의 `idle → normal`).
- `provider`·`credential`·선행 목록 있는 `prerequisite` 등 다른 복구 대기의 판정은 바뀌지
  않는다. `headline`은 세션이 남긴 blocker 문장, `since`는 `attempt.finished_at` 그대로다.

카드 출구와 표면

- `[세션에서 해결]`의 유무는 `tileResolveFields(item, resolve_pending, handoff_pending)` 하나가
  정한다: `eligible = parked || wait.recovery || wait_reasons에 recovery || discard.error`,
  `live = interactive_sessions 중 state==='live' && !closing && kind ∈ {inquiry, resolve}`,
  `resolve_action = eligible && !live`. 같은 함수가 `[워커로 이어가기]`의 `handoff_action`을 서버
  actions 투영에서 정한다. 렌더러(`running-grid.js`·`lanes.js`)는 다시 판정하지 않는다. 호출자는
  Worker·Monitor 실행 타일, Worker 대기 행·ghost 행, Monitor `parallelRow`·`serialRow`, PR 대기
  행이다. `external_resume` 세션은 `live`에 세지 않는다.
- 서버 `launchForClick`의 `already_running` 응답은 오래된 스냅샷·타임라인 클릭의 방어로
  남고 토스트 톤은 `info`다.
- 슬롯 표(2026-08-25 스펙 §5.1 `정정(UI-ri8n)`): 슬롯 1 대화형 세션 배지에 단계 꼬리(대화
  레코드는 `대화 중 <경과>`·`답 대기`·`사람 인수`, 옛 레코드는 `작업 중 <경과>`·`질문 대기`·
  `한도 대기`·`턴 종료 <경과>`), 대기 배지 팝업에 `문의 세션 <tmux_session:tmux_window> · <단계>`
  줄, 슬롯 3 held 타일·대기 행에 `▤ <마지막 메시지>` 진행 줄(재료 없으면 안 그림), 슬롯 7 시각
  줄은 살아 있는 문의가 있으면 `문의 세션 <n>분째`. `[워커로 이어가기]`는 `[세션에서 해결]`과 같은
  조작 자리에 선다. Worker·Monitor가 같은 `buildLanes` 경로를 그린다.
- 바꾸지 않는 것: 자동 기동 게이트·브리지 이벤트, 레코드의 생존·종료 규칙(ADR UI-nuwy-2),
  대기 어휘 4종과 대표 사유 순서, 슬롯 6의 `폐기`.

###### ADR UI-l48z에서 승계한 조항


세션 소유 외부 대기 Bead는 `external_wait` 키 하나를 술어로 후보 레인이 아니라
실행 중 레인의 세션 타일에 서고, 외부 대기 조작은 슬롯 6 foot이며, 좌표 칩은 상세
패널 잡 표가 갖는다.

외부 대기 타일과 카드

- `runnable-cache`의 한 행 판정에서 metadata `external_wait`가 비어 있지 않은
  문자열이면 `qualify()`를 건너뛰고 `qualifySession()`으로 간다. `qualifySession`은
  `in_progress`이거나 `external_wait` 키가 있는 `open` 행을 받아 행의 실제 `status`
  (`'in_progress'|'open'`)를 싣는다. Worker 소유 대기 Bead도 같은 규칙으로
  `session_active`에 실리고, 클라이언트의 `claimed` 집합(보류 타일이 먼저 잡음)이
  중복을 막는다. 빈 문자열·비문자열 키와 `deferred`·`closed`는 그대로다.
- `lane-model`의 세션 타일 루프가 `status: entry.status`를 싣고, 소유가 `session`인
  살아 있는 레코드(`stage ∈ {hold, detached, completing}`)를 조립 시점에 `external_wait`
  로 붙인다. 그 타일은 `started_at`·`updated_at`을 싣지 않는다 — 세션이 살아 있지
  않으므로 타일 시계를 돌리지 않는다. 후보 루프의 `claimed` 검사가 같은 bead의 후보
  카드를 없앤다.
- `runningTile`의 다섯째 held 상태는 `external_wait`이고 술어는 레코드가 아니라
  사유(`externalWaitCardParts(tile).badge`)다 — 레코드 없이 키만 남은
  `wait_record_missing`도 `⛔ 조치 필요`와 `[관찰 중단]` 출구를 같은 경로로 갖는다.
  슬롯 1은 `직접 세션` 배지 대신 외부 대기 배지, 조작은 `▤ 세션`뿐(경과 라벨 없음),
  슬롯 3은 `wait_body_lines.body`, 슬롯 7은 `wait_body_lines.times`다.
- `external_wait_check`·`external_wait_stop`·`external_wait_resume`은 `runningTile`·
  `candidateCard`·`miniRow`(카드 변형) 셋 모두에서 슬롯 6 foot이다 — 파킹 처분
  버튼과 같은 판정("이 대기를 어떻게 처분하나")이다. 후보 카드에서는 `↴ 대기로`
  대신 선다. 라벨과 `title`은 서버 `wait-judgment`가 stage별로 정한다: `[지금 확인]`·
  `[관찰 중단]`(hold·detached), `[대기 해제]`(completing stop), `[워커로 이어가기]`
  (fork), `[새 세션으로]`(fresh). 세션 소유 `completing`에서 `[워커로 이어가기]`는
  `session-preferred` 라벨이 있으면 보통 버튼, 없으면 primary다.
- 카드의 `ssh <host>`·잡 번호·`log <path>` 칩은 없다. 상세 패널 `externalJobsTemplate`이
  이름·상태·경과/제한·자원·번호·exit·expected·로그(클릭 = 복사) 표 — 등록 잡 행 아래
  하위 잡 행이 붙고 완료 하위 잡은 접힌다 — 와 그 아래 같은 `data-external-wait-op`
  계약의 조작 줄을 갖는다. 상세 패널은 Worker·Monitor mount의 형제라 자기 처리기로
  같은 op·payload를 보낸다. (UI-q15q가 바꿈: 표의 열과 하위 잡 행)
- 모든 세션 타일의 세션 정체 칩 `.ctl-chip--sref`는 버튼이고 클릭이 전체 세션 ID를
  복사한다. 세션 소유 완료 Discord 알림은 `session_ref` 마지막 항목에서 재개 명령이
  만들어지면 ` · 세션 <provider> <8자>`와 재개 명령 한 줄을 붙이고, 아니면 지금
  메시지다(fail-quiet).
- `.worker-card__head`·`.worker-mini__head`·`.worker-mini__row1`·`.rtile__hd`는 모든
  폭에서 `flex-wrap: wrap`이고, 머리줄 `.ctl-chip`과 대기 배지 `summary`는 말줄임
  없이 `white-space: normal; overflow-wrap: anywhere`다. 열린 배지의 `flex-basis:
  100%`와 레포 배지 12ch 해제는 640px 이하 미디어쿼리에 그대로 둔다.
- 대기 레코드 투영 `projectExternalWait`는 slurm 잡의 관찰 표시 필드(`name`·`anchor`·
  `spawned`)를 더 싣는다(UI-q15q가 바꿈). `EXTERNAL_WAIT_FIELDS`(최상위 키), `/resume`
  fork·fresh와 `/stop`의 서버 동작, 관찰기 주기·hold 예산·admission의 `external_wait`
  거절은 바꾸지 않는다.

###### ADR UI-u6ud-8에서 승계한 조항

레인과 카드 조립

- 레인 조립은 순수 함수 `buildLanes(workspaces, workspaces_state, options)` 하나다. 입력
  단위는 언제나 워크스페이스 항목 N개이고 Worker 탭은 자기 store를 어댑터로 그 모양에
  접어 넣는다. Worker 전용 모델 빌더는 없다.
- 카드 렌더러는 두 탭이 공유한다. 줄 순서와 새 요소의 자리는 그 요소가 답하는 질문으로
  카드 헤더 문법 스펙의 슬롯 표가 정한다 — 그 표의 현재 값은 2026-08-25 스펙 §2·§5.1의
  `정정(UI-ri8n)` 문단까지다.
- 재료가 없는 줄은 그리지 않는다. 조작은 첫 줄 오른쪽 끝이거나 액션 foot이고 그 사이에
  칩을 끼우지 않는다. 슬롯 표에 없는 요소는 스펙을 먼저 갱신한 뒤 단다.

후보 레인

- 후보 레인은 미착수 이슈의 관측 집합이고 실행 안전은 서버 admission이 지킨다.
  `runnable-cache`의 채택 조건은 `bead_id` 있음, `status`가 `open`, phase child 아님,
  그리고 **`external_wait` 키가 없음** 넷이다 — 키가 있는 `open` 행은 후보 버킷이 아니라
  `session_active` 버킷이다(위 결정). 외부 대기 Bead는 세션이 일하고 결과를 기다리는
  착수된 Bead이므로 미착수 관측 집합이라는 정의와 맞는다.
- 자격 조건은 사실(`admitted`·`spec_state`·`has_description`·`awaiting_user`·
  `worker_ineligible`)로 실리고 `admitted`는 그 사실을 접은 결과다.
- 좁히기는 읽는 쪽이 한다. `runnableFor`/`runnablePeek`의 `include_unadmitted` 기본값은
  `false`이고 `true`는 모니터 투영과 `laneCountsFor`만 넘긴다.
- 모집단은 세그먼트 `전체`/`착수 가능`/`준비 필요`와 슬롯 4a 판정 칩이 갈라 보이고,
  판정 입력은 `queue_placeable` 하나여서 세그먼트와 `↴ 대기로` 버튼이 같은 답을 낸다.
- 큐 진입 자격은 서버 `checkWorkerQueueAdmission()`이 판정하고, `runnable-cache`는 표시
  전용 사전필터이며 스케줄러 dispatch 경로는 이 캐시를 읽지 않는다(`bd ready`가 원천).
- 두 원천의 후보 행은 같은 사실 키 집합 `CandidateFacts`(`app/views/worker/placement.js`가
  typedef 소유: `route`·`spec_state`·`has_description`·`awaiting_user`·
  `awaiting_user_reason`·`release_info`·`dependents_info`·`exec_pins`·`worker_ineligible`·
  `session_preferred_reason`·`spec_after_blocker`)를 싣는다. 어댑터 행은
  `observation: true`만 더하고 판정 필드를 싣지 않는다.
- 자격 판정은 `lane-model`의 `placementFromFacts(facts, null)` 한 경로가 두 원천에 같이
  내린다. 사실 키가 없는 구 서버 행만 허용 폴백(`eligible: true`)이다.
- 배치 불가 사유는 슬롯 4a 준비도 칩(`라우팅 필요`/`본문 필요`/`스펙 충돌`/
  `스펙 미발행`, title = `placementTitle` 문장) 하나가 말한다. `.worker-card__reason`
  줄에는 배치 판정이 서지 않고 관측(⛔ 거절, 사용자 결정 대기 사유, ID 없는 blocked)만
  남는다.
- `♻ 재리뷰 필요`는 구조화 키 `rereview_required: true`로 실리고 슬롯 1 상태 배지다.
- 실행 설정 칩은 `execChipsFor(state, exec_pins, route)` 한 빌더가 후보·대기 행에
  유효값 칩을 만들고 핀에서 온 축만 `pinned`로 표시한다. 완료 행은 마지막 구현 attempt
  기록을 유지한다.
- 숨김 개수 산식은 `per_control` 하나다. 어댑터의 `location` 판정은 후보 제외에만 쓰고
  카드 사유로 쓰지 않는다.

단일 이슈 면

- 워커 탭이 저장소의 단일 이슈 면이다. Board 탭·Board 구독·`state.board`는 없고, 라우터
  기본 뷰와 알 수 없는 해시는 `worker`이며, 레거시 해시(`#/board`·`#/board?issue=<id>`·
  `#/issue/<id>`·`#/issues`·`#/epics`)는 `#/worker` 또는 `#/worker?issue=<id>`로
  정규화한다. nav의 저장소 탭 묶음에는 `Worker` 하나다.
- deferred 이슈는 후보 레인 아래 접힌 `보류 <N>` 선반에 `candidateCard`의
  `variant: 'deferred'`로 그리고 `[↴ 대기로]`·준비도 칩·자격 판정이 없다.
- `+ 새 이슈`는 워커 툴바 버튼이다. 완료 레인 기간은 `오늘`·`7일`·`30일`·`전체`이고 완료
  레인은 Worker 완료 행과 `closed-issues` 구독의 합집합이며, 세션 완료 보고서가 확인된
  행만 세션 배지를 얻는다.
- 우선순위·타입·라벨 필터는 `worker-filter` 줄의 세 축으로 모든 레인에 적용되고
  후보·보류는 숨기며 대기·실행 중·PR 대기·완료는 흐린다.
- 드래그로 상태 변경과 카드 키보드 탐색은 없다(상태 변경은 이슈 상세의 상태 드롭다운).
  `ui-order`(`subscribe-ui-order`·`unsubscribe-ui-order`·`ui-order-set`·
  `ui-order-snapshot`)와 그 서버 저장소는 없다.
- 공유 코드는 `app/views/stepper.js`와 `app/views/exec-format.js`에 둔다.

###### ADR UI-u6ud-7에서 승계한 조항

대기 어휘

- Worker는 사람 결정이 필요한 곳에서만 멈춘다.
- 대기 어휘는 넷이다: `선행 대기 ⛓`(`prerequisite`·`prerequisite_foreign`; 선행이
  `blocked`·`deferred`·worker-ineligible이면 `action_required`), `공급자 보류 ⏳`
  (`provider_hold`), `재시도 대기 ↻`(`retry_wait`; 예약 + `grace_ms` 경과면 `overdue`),
  `확인 필요 ⏸`(`awaiting_user`와 `recovery`; verdict는 위 결정의 대화 레코드 표가 정한다 —
  UI-nuwy가 뒤집음: 살아 있는 대화의 턴 종료는 답 대기 `action_required`, 대화 중·기동 중만
  `normal`).
  `external_job` 행은 나란히 선다.
- 판정은 `normal`·`overdue`·`action_required`이고 `overdue`는 다음 확인 시각이 있는
  종류(공급자 보류·재시도 대기·외부 작업)에만 난다. 대표 사유 순서는
  `awaiting_user`/`recovery` > `provider_hold` > `prerequisite_foreign` > `prerequisite` >
  `retry_wait`다.
- `확인 필요` 카드 본문(슬롯 3)은 세션이 남긴 문장 한 줄이다. `조건 대기`·`확인 대기`·
  `반영 대기`·`처분 대기`·`정지`·`환경 보류` 라벨, `stale_work`·`base_moved`·`queue_hold`
  종류, verdict `disposition`·`hold`·`recovery_confirm`·`settle_overdue`(recovery)는 없다.
- `막힘 N`은 이슈 단위 사유가 하나라도 있는 원래 이슈 수이고 새 대기 종류는 어휘 표에
  행을 더한다. 화면 대표는 "무엇을 기다리나"가 정하고, attempt의 생사와 레인 점유가
  대표를 정한다. `복귀 대기` 배지는 없다.

복구 계약 소비

- 복구 계약은 핀된 사본 `generated/contracts/work-recovery-policy.json`으로 소비하고
  provenance로 검증하며 `supported:false`면 새 자동 동작을 보류한다. disposition·wait
  reason·분류 키는 계약이 정의하고, 이 저장소는 분류 순서(`unclassified`를 주는 키를
  정책 조회 뒤 env 티어로 보내는 것)만 정한다.
- 세션이 선언한 대기 줄은 계약의 `result_line_reasons` 명시 목록(schema 2)만 허용하고 대기 의도일 뿐
  승인·종료·효과·재개 자격을 입증하지 않는다. `BDUI_WORK_RECOVERY_SCHEMA=1`과 preamble
  결과 줄은 검증된 구현·quick_fix 세션에만 전달된다.
- 실제 usage-limit는 구조화 증거로만 보류가 된다. 자동 fatal 목록은 비어 있으며 모델의
  실패 주장·retry 소진·PR 부재만으로 최종 실패를 만들지 않는다.
- 재개 fence는 복구 대기를 실패 행과 같이 막아 새 attempt를 자동 디스패치하지 않고,
  재개는 기록된 runner·model·effort·speed·세션을 보존하며, 같은 계보의 같은 원인 반복은
  `no_progress`로 승격한다.

미분류 실패

- 정책 키 `finished_without_result_line`·`past_failure_line`·`environment_line`·
  `unknown_error`로 `unclassified`가 되는 종료와 `session_failed:turn_failed`는 `env`
  티어다(env 패턴이 맞으면 그 그룹, 아니면 `unknown`).
- 재시도는 이 호스트에 실패 attempt의 세션 기록이 있으면 같은 세션·러너·모델·effort·
  계정을 `resume`하고, 없으면 같은 실행 설정을 승계한 새 `dispatch`다.
- 사다리(칸 길이는 서버 전역 타이밍 설정 `env_retry_delays_seconds`, 기본 2·5·15분; 횟수는 `RETRY_MAX`, 현재 3회)를 다 쓰면 attempt는 `failed`, 카드는 실패 타일(`↻`·`폐기`),
  `❌ 실패` 알림 1회, Bead는 `open`이다. `transient_retry_exhausted → wait`는 없고 예산은
  리셋되지 않으며 사람의 `↻`는 같은 계보의 수동 재개다. 저장된 `waiting/unclassified`
  기록은 로드 시 `failed`(`retry.migrated:'unclassified_wait'`)로 이행하고 알림·자동
  재개는 없다.

파킹과 복구 대기의 출구

- `parked`는 verdict `success` ∧ bead status ∉ {resolved, closed} ∧ `pr_url` 없음 ∧
  `awaiting_user` 키 존재일 때 `status='parked'`, `cause='session_parked'`이고 실패가
  아니므로 큐는 계속 간다. Worker는 스스로 새 attempt를 만들지 않는다.
- 모든 파킹(`awaiting_user` 문자열이 계약 어휘 안이든 밖이든)은 기록 직후 같은 세션
  대화를 기동한다(UI-nuwy가 뒤집음: fork 문의 세션과 값별 프롬프트 4종 대신 attempt 세션의
  fork 없는 재개와 dotfiles 진입 블록 하나, 바이트 사본은 다이제스트로 고정).
- 파킹 타일의 출구는 `[세션에서 해결]`·`[워커로 이어가기]`(위 결정의 조건)·`[폐기]`다.
  `[세션에서 해결]`은 살아 있는 문의·해결 세션이 없을 때만 서고 같은 세션을 대화형으로 열며
  자동 기동 게이트(`worker_direction_inquiry.enabled`)를 읽지 않는다. 서버 `already_running`
  응답은 오래된 스냅샷·타임라인 클릭의 방어로 남는다.
- 새 attempt `[재시도]` 버튼은 없다.
- 해제 전이 자동 재디스패치는 stale 두 값에만 걸리고 후보 판정은 파킹 레코드의
  `cause_detail.awaiting_user`로 한다. `impl_review_conflict:design`은 PR 관측
  (`resolved` + `pr_url`)으로만 정산하고, 어휘 밖 값의 정산은 그 값을 정의하는 계약이
  소유한다. stale 경로의 attempt당 1회 fence(`parked_resumed_at`)를 둔다. 살아 있는 대화나
  인계 예약이 있는 동안 해제 전이 재디스패치는 보류한다(UI-nuwy).
- 세션이 선언한 복구 대기(결과 줄 `대기 · recovery:<reason>`의 `authority`·`no_progress`,
  옛 기록의 `verification`·`reconcile`·세션이 선언한 `unclassified`·`blocks` 목록이 빈
  `prerequisite`)는 술어 `isSessionStalledRecovery` 하나로 판정하고, `waiting` 기록 직후
  파킹과 같은 게이트(`worker_direction_inquiry.enabled`·tmux·Bead당 1개)로 같은 세션 대화를
  띄운다(UI-nuwy가 뒤집음: fork 문의 세션과 `recovery` 프롬프트 대신 진입 블록 하나).
- 복구 대기 카드 조작은 `[세션에서 해결]`(살아 있는 문의·해결 세션이 없을 때)·
  `[워커로 이어가기]`(위 결정의 조건)·`폐기`이고 `↻ 이어하기`는 없다. 알림은 위 결정의 네
  종류이고 `waitActionRequired`의 `⚠ … 지연`은 이 대상에 보내지 않는다(UI-nuwy가 뒤집음).
  `provider`·`credential`은 공급자 보류 경로, `blocks` 목록이 있는 `prerequisite`는 선행
  대기다.

base_moved와 재개 종류

- `base_moved`는 기록 직후 서버 전역 타이밍 설정 `base_moved_retry_seconds`(기본 2분)만큼 뒤 같은 세션을
  자동 재개하고(방아쇠만 자동, 미분류 실패 사다리와 독립), 같은 계보에서 반복 상한(현재 세 번)에 이르면 `확인 필요`(`reason: no_progress`, `base가 반복 이동함 ·
  후보 <sha7>`)이다.
- 재개 종류는 `resumeKindOf(quickfix_landing)`이 사유 문자열로 정하고 `session` 목록에
  `base_moved`가 있다. 기계 정산은 같은 attempt의 착지 후 단계 재실행이며 버튼은
  `↻ 정리 재시도`, 세션 실행은 `↻ 이어하기`다. `settlement`의 세션 참조 면제와
  `bd_read_failed` 기록, 폐기의 `parent_reset` 파괴성 경계를 둔다.

잔재 처분

- 디스패치의 `disposeStaleResidue`가 검증된 잔재 identity(`identity`·`state`·`cause`·
  capability 플래그)로 순서대로 처분한다: `can_resume` → 같은 세션 `resume`;
  `can_continue` → 잔재 워크트리·브랜치로 새 attempt `dispatch`(커밋 보존);
  `can_backup_fresh` → `backupFreshResidue(identity)`로 `discard-backups`에 보관 뒤 같은
  tick에서 새 attempt(백업이 `identity_changed`면 재관측 뒤 재판정); 그 밖은 재관측 1회
  뒤 `failed`·`stale_work_unresolved`.
- 다른 소유자의 PR·원격 브랜치가 확인된 잔재는 `preserve:true`로 재관측해 자동 정리하지
  않는다. timeline `stale_work_auto`만 남기고 알림은 없다. WS op `worker-stale-work-*`,
  admission `worktree_stale_work`는 없고 로드 시 남은 admission은 지운다.
- 선행 대기 attempt(`status === 'waiting' && cause === 'prerequisite_unmet'`)는
  `resumableResidueAttempts`의 잔재 재개 후보다. 복귀 트리거·재스캔 후보·`bd ready`
  판정·클레임은 그대로이고 재개 여부는 preflight의 잔재 처분 사다리가 고른다.
- 선행 대기 후보는 `unique` 잔재(dirty 또는 고유 커밋)에만 매칭되고 `preserve`를 켜지
  않는다. 버릴 수 있는 잔재와 worktree 없음은 보통 dispatch다.
- `judgePrerequisiteWait`는 owned worktree의 HEAD를 attempt `head_oid`로 기록한다. 관측
  실패·브랜치 불일치는 아무것도 쓰지 않는다.
- `resume()`는 선행 대기를 `preclaimed` 경로에서만 받고 사람 클릭 `[이어하기]` 경로는
  열리지 않는다. 프롬프트는 `prerequisite_return` 서두 + 기존 ancestor 사실 +
  `## 선행 완료` 블록(닫힌 선행의 `status`·`closed_at`·`close_reason` readback, "선행
  완료는 구현 완료가 아니다")이다.
- 선행 대기 후보의 기동 전 판정 거절(`not_failed`·`prior_session_unavailable`·
  `transcript_missing`·`worktree_missing`·`runner_mismatch`·`continuation_decision_stale`·
  `already_resumed`·`no_progress`)은 같은 pass에서 `continue`·`backup_fresh`로 이어지고
  타임라인 cause는 `resume_refused:<reason>`이다. 기동·상태 오류만 `stale_work_unresolved`다.
- 선행 대기 재개에 예약 레코드·재시작 정산·새 status/cause 어휘·카드 조작은 없고, 재개
  attempt는 `resumed_from` 계보·`launch_kind: resume`으로 선다.

외부 작업 대기

- 외부 작업 대기는 소비자 Bead 자신의 `external_wait` 상태이고, Worker 한 런타임이
  관찰·완료·알림·재개를 소유하며, hold 예산 판정과 `대기 · external:<wait_id>` 종결,
  보존 세션의 fork 재개를 둔다. Worker 소유는 자동 fork이고 세션 소유는 알림 뒤 사람의
  출구 — 세션 칩 복사로 자기 세션에서 잇거나 `[워커로 이어가기]` — 이며 fork 자격
  실패는 launch 없이 사람의 `[새 세션으로]`다(동작은 UI-z437 그대로, 라벨만 바뀐다).
  소비자 카드 표면은 위 결정(외부 대기 타일과 카드)이 정한다.
- 이벤트 구독 복귀·admission 진단 기록·재스캔 후보(`external_job` 제외)·foreign 트리거
  매칭을 따른다.
- 자동 진행 꺼짐은 무표시이고 `manual_only`·`[지금 시작]` 게이트 조건·직렬 레인 선두
  규칙·연결 레인 폐기를 따른다. `waiting`은 기계 사실 대기이고 `external_wait` 외 새
  상태는 만들지 않으며 `prerequisite_unmet`은 증명으로만 선다.

레인 퇴장

- bd `closed` 또는 `deferred` Bead는 병렬 `queue`와 모든 직렬 레인의 대기 행에서
  자동으로 물러난다. `closed`는 `done`으로 이동하고, `deferred`는 제거하며 그 Bead의
  비종료 계보가 잡은 직렬 레인 연결도 푼다. `resolved`는 대상이 아니고 `pr_wait`·`done`은
  순회하지 않는다. poller sweep과 tick 안 admission 처분은 같은 헬퍼로 판정한다.
- leaf `paused` attempt는 그 Bead의 bd 종료가 우선한다. ■ 정지의 paused 분기와 같은
  순서(leaf 가드 → 종료 약속 대기 → 기준 이동 관측 → `stopped` 기록 → 보호 훅 해제 →
  잔재 정리)로 처분하고 `stopped`에 `cause: bead_closed | bead_deferred`를 싣는다. 처분
  뒤 bd 상태를 다시 읽어 여전히 `closed`/`deferred`일 때만 레인을 변이한다.
- 워크트리는 버릴 수 있을 때만 지우고(`removeIfDiscardable`) 미반영 변경이 있으면
  보존한다.
- 제거 사실은 Bead 타임라인 `queue_removed` 한 줄로 남긴다. 다시 `open`이 돼도 자동
  재배치는 없다 — 배치는 사람·세션의 명시적 place다.
- dispatch·lane fence의 활성 집합은 paused를 포함하고, sweep만 옵션으로 leaf paused를
  제외한다.

레인과 provider 보존

- 실행 레인은 매 launch에서 현재 route로만 유도한다. `app/utils/quickfix-lane.js`의
  `laneOfRoute(route)` 하나가 소유하고 서버·클라이언트가 같은 사본을 읽는다. `quick_fix`만
  `quick_fix`, 그 외는 `pr`다. 레인은 relaunch 상속 목록에 들어가지 않는다.
- 기록된 레인(`prior.quickfix_lane`)과 현재 레인이 다르면 모든 재개·relaunch 경로(수동
  이어하기, `base_moved` 보존 후보, 공급자 자동 재개, 지시 재시작, 머지 큐 충돌 해소,
  REVISE 처분)는 세션을 띄우지 않고 `route_changed`로 거절한다. 판정은
  `laneMismatchOf(prior, bead_snapshot)`가 진입 경로와 launch 직전 두 곳에서 하고
  admission보다 먼저 거절한다.
- 거절은 실행 상태를 바꾸지 않고 이전 attempt의 진단 필드
  `resume_refused='route_changed:<prior_lane>→<current_route>'`와 공급자 자동 재개의
  `auto_resume_refused`만 쓴다. Bead metadata는 읽기 입력이다.
- 사유 기반 정산 재실행(`[정리 재시도]`, `resumeKindOf === 'settlement'`)만 기록된
  레인으로 완료한다.
- `route_changed` 복구는 기존 조작([폐기] 뒤 재배치 또는 [지금 시작])이고 세션 승계·자동
  재진입·승인 키 위조는 없다. 표현은 기존 슬롯(응답 `reason='route_changed'`·
  `route_change`, 토스트, 실패 타일 안내 줄 `RESUME_REFUSALS`)이고 새 슬롯·배지·버튼·
  타임라인 이벤트는 없다.
- 세션 참조는 provider와 함께 전달되고, 유효한 로컬 원본 세션이 있으면 기록된 provider와
  ID로 resume 또는 fork한다. 현재 기본 provider가 달라도 유지한다.
- transcript가 없거나 쓸 수 없으면 fresh fallback을 원본 provider 안에서 수행하고 이유를
  기록한다. 원본 자체가 없을 때만 현재 실행 설정으로 fresh를 시작한다.
- provider 변경은 사용자의 명시적 선택(`fresh_current`·`exec_override`·decision token)으로만
  일어나고, 도구 오류·기록 누락·알 수 없는 runner로 Claude↔Codex를 자동 전환하지 않는다.
  실행 파일 부재는 `launch_failed:<runner>_not_found`다.
- `continuation_choice='prior_attempt'` 자식은 same-provider fresh fallback 없이 기록된
  세션의 엄격한 재개만 허용한다.
- provider 보존은 실행 위치 선택이며 승인·review 권한을 부여하지 않는다.

##### 대안과 기각 사유

- **fork 문의 세션이 끝까지 가는 현행.** 가드·관측이 없고 문의 금지 때문에 끝내지 못한다
  (`beads-sw1` 실측).
- **fork 수리 뒤 fork 세션을 Worker가 재개.** fork 세션 ID 포착이 pane 옵션에 기대어 취약하고
  결정 맥락이 원래 세션과 갈린다.
- **대화 단계 판정을 턴 단계(pane 옵션)로만 한다.** 산문 질문이 `idle`로 읽혀 `normal`이 되고,
  관측 사이에 끝난 턴의 결과 줄을 놓친다 — 메시지 단위 처리로 대신한다.

UI-ri8n에서 승계한 대안:

- **대기 배지를 숨기고 문의 배지만 남긴다.** 카드는 단순하지만 attempt가 멈춰 있다는 사실과
  `막힘 N` 요약이 어긋난다.
- **버튼을 남기고 `already_running` 토스트만 고친다.** 코드 변경이 가장 적지만 이미 열린
  창을 다시 가리키는 조작이 남아 실측에서 사용자가 두 번 헤맸다.
- **클라이언트가 transcript 서랍 구독으로 진행을 파생한다.** 카드마다 구독을 열어야 하고
  판정(배지)이 서버와 클라이언트로 갈린다.
- **브리지 스풀·manifest에서 마지막 메시지를 읽는다.** 스풀은 Discord ack 뒤 삭제되고
  manifest에는 메시지가 없다.

UI-l48z에서 승계한 대안:


- **클라이언트가 대기 레코드만으로 타일을 만든다.** 제목·라벨·`session_refs`를 다른
  경로에서 끌어와야 하고 Worker 탭(Board live store)과 Monitor 탭(runnable-cache)의 후보
  원천이 달라 조립 규칙이 둘이 된다 — 승계한 "lane-model 한 경로" 조항과 어긋난다.
- **후보 레인 안에 "외부 대기" 구획을 둔다.** `↴ 대기로`가 뜻 없는 카드가 후보 집합에
  남고 Worker 소유 대기와 자리가 갈린다.
- **머리줄 유지 + 줄바꿈만.** 조작 셋이 다음 줄로 내려가 제목 위에 뜬다 — 조작 묶음이
  자기 줄 오른쪽 끝에 남는 규칙과 어긋난다.
- **카드에 `⧉ 재개 명령` 버튼을 더한다.** 조작이 하나 늘고 세션 칩 복사와 Discord 명령
  줄로 같은 일이 된다.

### ADR UI-18a5-2에서 승계하는 조항

이력 기록

- Worker의 실행·실패 이력 SoT는 bead마다 하나인 append-only `events.jsonl` 타임라인이다. 쓰기는 Worker 서버 프로세스 하나가 소유하고, 각 이벤트는 생산자가 안정적으로 구성한 `event_id`를 가져 읽는 쪽이 멱등 처리한다.
- `queue.json`은 살아 있는 attempt와 미처리 상태만 보유한다. 처리가 끝난 terminal attempt는 terminal 이벤트 기록 뒤 bead 디렉터리의 attempt 레코드로 이관한다. 상태 파일에 과거 attempt가 없는 것은 정상이다.
- 실패마다 한 줄 `summary`를 한 번 추출해 타임라인 이벤트와 attempt 레코드 양쪽에 싣는다. 세션 원문 로그는 bead 디렉터리로 옮겨 보존 정책을 받고, 닫힌 bead의 원문 로그는 압축·삭제할 수 있지만 `events.jsonl`은 영구 보존한다.
- 살아 있는 `queue.attempts`는 각 bead 전체 이력의 최신 접미다. 한 attempt는 처리 완료 terminal이고 직렬 레인을 점유하지 않을 때 이관 가능하며, 같은 bead의 더 오래된(`q.attempts` 삽입 순서) attempt가 모두 같은 pass에서 이관 가능할 때만 큐를 떠난다.
- reader는 라이브 큐만 보고 이관된 파일과의 합집합 조회를 쓰지 않는다.

생존 소유

- `isSchedulerOwned`는 lifecycle 소유 predicate다. `kind ∈ {implementation, review_session}`이면 참이고 `retired_kind`와 미지의 kind는 거짓이다.
- 살아 있는가(pid probe), 슬롯을 점유하는가, 죽었을 때 정산을 시작하는가는 scheduler(`reconcile`·`occupiedBeadIds`)가 소유한다. 죽은 세션의 결과(영수증이 current인가, claim이 어느 head에 exhausted인가)는 큐(`review-session.js complete()` → `settleReviewSession`)가 소유한다.
- `reconcile`의 후보 선별(`running`/`settling`/`claimed` fence와 pid + start time 기반 `isDeadAttempt`)은 두 kind에 같고 처분만 kind로 가른다. 죽은 `review_session`은 로그를 EOF까지 drain해 usage·guard 증거를 확정한 뒤 `exit: null` verdict로 `complete()`를 호출한다.
- 자동 리뷰 전용 동시성 한도는 없다. 부팅 복구(`recoverReviewSessions`)는 살아 있거나 probe가 `unknown`인 기록을 그대로 두고 reconcile에 맡긴다.
- beads-ui가 띄운 대화형 세션(문의·해결·외부 재개, claude·codex)은 큐 스냅샷의 durable 레코드 `interactive_sessions[<bead_id>:<kind>]`로 투영되고 슬롯을 점유하지 않는다. (변경, UI-jbl1) Bead 없는 저장소 작업 행(수동 배포 실패)의 해결 레코드 키는 `repo-op:<operation_id>:resolve`이고, 그 레코드는 Bead 상태를 읽지 않고 결과 줄과 세션 종료로 정산한다. 기동 직후 런처가 레코드를 쓰고 클라이언트 CAS op는 없다.
- 대화형 세션의 생존·복구·종료는 scheduler reconcile이 소유한다. pane 마커·pane id로 생존을 판정하고, 레코드 없는 마커 pane은 복구 레코드로 재구성하며, tmux에 닿지 못하면 그 pass는 아무것도 판정하지 않는다.
- 해결(resolve) 세션의 fork 원천은 `qualifyInteractiveForkSource` 하나가 정하고 순서는 최신 implementation attempt의 러너 세션(transcript가 local일 때) → bd `session_ref` 마지막 항목 → fresh다. (변경, UI-jbl1) fresh 기동의 런타임은 공용 대화 설정이 정하고 "원래 세션 따름"일 때만 기록된 provider를 보존한다. 저장소 작업 행은 기록 세션이 없으므로 항상 fresh이고 cwd는 저장소 루트다.
- 문의(대화) 세션의 원천은 fork가 아니라 attempt 러너 세션의 fork 없는 재개다. 자격은 `qualifyAttemptSession`(러너·세션 ID·로컬 transcript)과 워크트리 존재가 정하고, 자격이 없으면 fresh(변경, UI-jbl1: 런타임은 공용 대화 설정, "원래 세션 따름"이면 같은 provider)에 `fallback_reason`을 남긴다. 한 세션 ID에는 프로세스 하나다 — 러너가 살아 있으면 기동하지 않고 Worker 재개는 창 소멸 확인 뒤에만 한다.
- 세 종류(문의·해결·외부 재개)의 레코드 모두 `conversation`(대화 사유 표기·처리한 메시지 식별자·발췌·결과·`handoff` 예약·인수 알림 시각)을 갖는다(UI-18a5가 넓힘). 해결 레코드의 `handoff` 예약은 실패 행의 대상 식별과 실행 시작 시각을, 외부 재개 레코드는 `wait_id`를 함께 싣는다.
- 대화형 세션의 정산은 전이 시점의 write(머지 뒤 `done` 이동, 일반 폐기 완료, 이슈 스냅샷의 `closed` 관측)다. 정산된 세션은 idle일 때만 닫는다 — claude는 `/exit` 주입 뒤 유예(현재 90초), codex는 `kill-window`; 턴 중·대화상자 대기는 미루되 상한(현재 30분) 뒤 `kill-window`. 스레드 아카이브는 브리지 소유다.
- 세 종류 모두 정산 write에 `인계`와 `보류`가 더해진다(UI-18a5가 넓힘): `인계`(또는 `[워커로 이어가기]`)는 `handoff` 예약을 쓰고 창을 닫으며, 소멸을 확인한 pass가 그 행의 Worker 출구 하나(문의는 같은 세션 재개, 해결은 정리 재시도·폐기 재시도·머지 큐 재등록·저장소 작업 1회 재실행(변경, UI-jbl1), 외부 재개는 Worker attempt dispatch)를 실행한 뒤에야 레코드를 지운다; `보류`는 창을 닫는다; `인수`는 창을 두고 기존 정산(`bd_closed`·`done`·폐기)을 기다린다. 문의 대화의 끝은 attempt `cause_detail.conversation`(`pane_gone`·`hold`·`handoff`·`takeover`, 거절 사유)로 남고, 해결·외부 재개의 실행 전 거절은 카드와 타임라인에 남는다. `conversation` 없는 옛 레코드는 옛 규칙으로 정산한다.
- 끝난 대화형 세션의 레코드는 지우고 타임라인 `interactive_session` 이벤트만 남긴다.

in_progress 선점

- Worker는 구현 attempt의 dispatch 경로에서만, `prerecordAttempt` 성공 뒤 직전에 읽은 status가 정확히 `open`일 때 `bd update <id> --status in_progress`를 1회 쓰고 readback한다. `open`이 아니거나 bd 오류면 쓰지 않고 dispatch는 계속된다.
- Worker는 `session_ref`를 쓰지 않는다.
- `resolved` Bead를 다루는 경로(`dispatchExternalConflict`, `relaunchResolvedAttempt`)와 재개·처분·리뷰·stale-work 이어하기 경로에는 선점을 넣지 않는다.
- 선점은 attempt 기록에 `worker_claim: pending → written → released`로 남긴다.
- 해제는 기존 종료 경로(`releaseBeadClaim`)와 `reconcile` 정산이 한다. `worker_claim=written`인 채 terminal이 된 attempt(같은 Bead의 살아 있는 attempt 없음·`pr_url` 없음·Bead가 여전히 `in_progress`)는 정산에서 `open`으로 되돌리고 `released`를 기록한다. 기록 없는 Bead를 스캔하는 별도 재조정은 없다.
- readiness 술어(route·spec_review·impl_entry·의존성)는 status와 무관하게 판정한다.

### ADR UI-18a5-3에서 승계하는 조항

영수증 신선도

- `impl_review` 영수증 SHA가 관측된 head와 같거나 그 조상이면(`git merge-base --is-ancestor`) 유효하다. 조상이 아니면 계보가 끊긴 stale 영수증이다. 큐가 만든 `resolver:` 커밋에도 이 규칙 하나를 예외 없이 적용한다. head 이동만으로 재리뷰하지 않는다.
- ancestry probe가 실패하면 머지 게이트는 fail-closed로 보류하고 보드 표시는 fail-quiet로 `unknown`을 보인다.
- 리뷰 뒤 push된 델타를 사람이 다시 읽지 않을 수 있는 잔여 위험은 수용하고, ancestry가 통과시킨 조합의 의미 충돌은 `[verify]` 영수증이 검사한다.

영수증 보류와 자동 리뷰 dispatch

- 영수증 부재·stale·invalid·undetermined(`review_receipt_missing`·`stale`·`invalid`·`undetermined`)는 terminal이 아니라 merge-gate hold다. 머지는 계속 큐가 소유한다.
- 보류에서 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch한다. 판정 자리는 게이트가 보류 사유를 낸 그 턴(`merge-queue.js` `holdEntry`)이고 매 `kick()`이 재판정하므로 별도 감시자·타이머는 없다.
- 주체는 lineage다. 행의 durable claim `review_dispatch={head_sha, attempt_id, state, at}`을 자동 dispatch와 클릭이 함께 쓴다.
- claim 뒤의 dispatch 실패는 원인 구분 없이 `exhausted`이고 보류는 유지되며 자동으로 다시 뜨지 않는다. `exhausted` head의 출구는 `[리뷰 후 머지]` 하나이고 그 클릭은 같은 lineage의 resume이다.
- 자동 dispatch는 authority를 부여하거나 source를 바꾸지 않는다. authority 없는 행의 출구도 버튼이다.
- 자동(enrollment) authority 행에는 머지 큐의 슬롯 fence를 적용하고 수동 authority는 면제다.

위조 3종 terminal

- 보류 분류의 정본은 `server/worker/receipt-check.js`의 `RECEIPT_HOLD_RESOLUTION`이다. `unresolvable`(위조 3종)과 `resolvable`(나머지 3종)은 서로소이고 합집합은 `EXEC_RECEIPT_MERGE_GATE.hold`와 같다.
- `receipt_unbacked:<code>`의 코드가 `unresolvable`이면 대기 없이 terminal needs_human이다. 저장 이유는 `receipt_unresolvable:<code>`, `failure_key.stage`는 `merge_gate`, `evidence`는 위반 detail이다. 게이트의 `receipt_unbacked:<code>` 문자열은 바꾸지 않는다.
- `resolvable`은 `metadata_watch`이고 대기 상한이 없으며, PR 대기 행의 자동 해소 배지를 「영수증 대기 — <code>」로 보인다.
- terminal의 출구는 `[머지]` 재클릭(그 head의 receipt tier를 waive)과 `[세션에서 이어가기]` 둘이다. 그 실패 대화의 `인계`는 아무것도 실행하지 않고 `보류`처럼 끝난다 — waive는 사람 `[머지]`뿐이다. 알림 클래스 「머지 게이트 보류」(dotfiles `failure_classes.receipt_hold.notify_label`의 바이트 복사)와 `next_action` `'[머지] 재클릭 또는 [세션에서 이어가기]'`로 안내한다.
- `receipt_baseline`은 재포착하지 않고 불변식·위조 판정 규칙·hold/badge 표·`[머지]` 클릭의 waive 권한은 바꾸지 않는다.

verify 보류

- 머지 전 verify 실패는 completion intent의 비종단 phase `holding`이 소유하는 보이는 보류(`verify_hold`)다. 등록 자격은 「verify 영수증이 있고 실패했다」다. 보류 중인 행은 `merge_queue`에서 빠지고 뒤의 PR이 선두에 오른다.
- `verify_cmd_failed`는 재평가 없이 곧바로 `verify_hold`다. 배지 `검증 실패 — 수정 push 대기`, 출구 `[세션에서 이어가기]`, 수정 push가 자동 해제하며, Discord는 「머지 전 검증 실패」를 head당 1회 쓴다. 실패 키 stage는 `verify`, reason은 `verify_cmd_failed`다. 그 실패 대화의 `인계`는 `[머지]`와 같은 머지 큐 재등록이고 현재 head에서 검증이 다시 돈다.
- `verify_cmd_spawn_error`·`verify_cmd_timeout`(환경 증거가 있는 경우)은 `auto_resolution`(`class:'retry'`)으로 정해진 지연(현재 5분) 뒤 한 번 재평가하고, 다시 같은 코드면 같은 `verify_hold`에 사유 코드를 싣고 배지만 `검증 명령 실패 — 환경 확인`이다.
- terminal `needs_human('verify_red')`와 그 systemic 판정은 없다.
- 알림 이력의 단위는 head다. 타임라인 `merge_step hold:<head_sha>`, Bead 댓글 `## 🤖 완료 보류 기록`, Discord 「머지 보류」가 head당 한 번이고 재관측·재시작은 침묵이다. `[머지]` 재클릭은 무해하다.
- PR 대기 행의 `[세션에서 이어가기]` 재료는 넷(머지 후 정리 실패·needs_human·폐기 실패·holding)이고, 그 유무는 카드와 같은 `tileResolveFields`가 정한다. 첫 입력은 dotfiles 진입 블록(실패 대화 사유)이며 보류형 의미 — 수정 push가 보류를 푼다 — 는 유지한다. 투영은 `phase === 'holding'`일 때만 `hold`를 싣고 같은 head의 terminal 증거가 우선한다. 알림 라벨은 dotfiles 계약의 바이트 복사다.

머지 후 정리와 자동 인계

- `failCleanup`은 「정리 중단」 알림을 보내지 않는다(첫 실패, 관측형 자동 재실행 소진, `[워커로 이어가기]` 재실패 모두). 정리 실패는 Bead 카드의 `cleanup_failed` 행·timeline·Bead 댓글에만 남는다.
- 남는 `needs_human` 알림 클래스는 머지 게이트 보류(위조 3종), 배포 실패(사다리 소진 뒤 terminal), post-merge 잡 실패, 수동 배포 실패, 폐기 실패다. (변경, UI-jbl1) 그 알림 제목은 `🙋 확인 필요 · <클래스>`이고, 공용 스위치가 켜져 있으면 실패당 한 번 해결 세션을 분리 창에 자동으로 연다.
- 완료 정리의 `expected_head`는 머지 op의 head(`merge_head_sha`)이고, 읽을 수 없는 오래된 intent는 관측 head → subject head 순으로 폴백한다.
- 머지 후 결함의 자동 인계는 원시 operation 보존과 복구 분류, 소유 코드 결함의 단일 자동 증명(`deterministic_owned_script_failure`), operation 원장이 소유하는 단일 예약과 재채택, 일반 workflow 입구인 수정 Bead(`type:bug`·quick_fix handoff 네 절·`quick_fix_review=worker@<digest>`·parallel 배치)로 한다. 수정 PR 생성만으로 원래 작업을 완료시키지 않는다.
- post-merge 잡 원장·`replaces` 승계·CAS 확정을 둔다. 실패 행의 출구는 `[워커로 이어가기]`(정리 재시도·폐기 재시도, 옛 `[정리 재시도]`·폐기 실패 `[재시도]`), `[머지]` 재클릭, `[세션에서 이어가기]`(실패 대화), `[폐기 포기]`다. `[워커로 이어가기]`는 사람 클릭이나 같은 행 실패 대화의 `인계`로 실행되고, 그 인계는 사용자 답의 권한(결과 미상 머지 후 잡 재실행 포함)으로 많아야 한 번 실행한다. 자동 인계는 폐기나 사람 결정을 대신하지 않는다.

## Consequences

- 되돌리기 어렵다: 알림 제목을 읽는 사람의 Discord 필터와 습관, 대화 레코드 키를 읽는 reconcile·투영·UI(`queue-store.js`·`scheduler.js`·`worker-handlers.js`·`repo-ops-timeline.js`·`tile-resolve.js`), 종단 자리(`completion-intent.js`·`discard-coordinator.js`·`repo-operation-coordinator.js`), `notify.js`, 서버 전역 `conversation-settings.js`와 전역 탭 섹션, 진입 블록 사본과 다이제스트가 함께 움직인다.
- 맥락 없이는 놀랍다: 나흘 전 결정(UI-18a5, 자동 기동은 멈춤에만)과 ADR 0005의 자동 수리 폐기를 뒤집는 것처럼 보인다. 자동 대화는 첫 답 전 읽기 전용 진단과 질문만 한다.
- 얻는 것: 알림 직후 진단을 받은 대화가 이미 열려 있다. 수동 배포 실패도 같은 대화·인계 경로를 갖는다.
- 감수하는 것: 실패마다 드는 세션 토큰. 알림 종류를 하나로 줄이는 대신 제목 접미사로 급한 정도를 보인다.
- 대안과 기각 사유: 실패는 클릭으로만 여는 현행 — 멈춤과 경험이 갈린다. 실패별 스위치 — 사용자가 전체 공통 하나로 정했다. 설정을 `workflow_session_defaults`에 둠 — 계약 등록 키가 아니고 dotfiles 스킬이 읽지 않는다.
- UI-qbgj·UI-18a5-2·UI-18a5-3의 조항은 위에 표시한 변경 외에 전부 승계했고 폐기한 조항은 없다.

### ADR UI-qbgj의 결과 (승계)

- 되돌리기 어렵다: dotfiles `docs/contracts/external-wait.md`·`workflow-state.yaml`, `sjob takeover`·실행 기록, 연구 템플릿 `profiles/server-local`·`run_workflow.sh`와 그것을 받은 프로젝트, `adapters/slurm.js`·`adapters/sjob-local.js`·`takeover.js`·`observer.js`·`service.js`, `attach.js` 투영, 카드·상세 렌더러, 완료 프롬프트가 함께 움직인다.
- 맥락 없이는 놀랍다: 관찰 전용이던 외부 대기에 잡을 취소·실행하는 조작이 하나 있고, head job만이 아니라 워크플로 전체를 옮긴다.
- 얻는 것: 큐 정체를 사람이 판단할 재료와 한 번의 확인으로 우회하는 길.
- 감수하는 것: 공용 서버에서 다른 사용자에게 배정된 자원을 나눠 쓴다. sjob 실행 기록이 없는 옛 작업은 대상에서 빠진다. 결과 불명이면 정착 창만큼 표시가 남는다.
- 대안과 기각 사유: wrapper 역파싱으로 원 명령 복원 — `--wrapper`·확장자 없는 실행을 놓친다. beads-ui가 `scancel`·`sjob run --local`을 직접 조합 — sjob 형식 지식이 새고 hold 보상 순서를 둘이 나눠 갖는다. head job만 로컬 — 하위 단계가 다시 같은 큐 뒤에 선다.
- UI-18a5의 조항은 외부 작업 조항에 두 조항을 더한 것 외에 전부 승계했고 폐기한 조항은 없다.

### ADR UI-18a5의 결과 (승계)


- 되돌리기 어렵다: dotfiles 계약 어휘·진입 블록 핀(`direction-inquiry.js` 사본과 다이제스트 테스트), `tile-resolve.js` 술어, `worker-handlers.js` 클릭 라우팅, `scheduler.js` 인계 실행·한 번 규칙·외부 되돌림, `notify.js` 대화 알림, 카드 슬롯 표가 함께 움직인다.
- 맥락 없이는 놀랍다: 실패 대화의 결과 줄 하나가 결과 미상 머지 후 잡을 다시 돌릴 수 있다. 같은 이름의 버튼이 행마다 다른 op를 부른다(뜻은 같다).
- 얻는 것: 카드 어디서나 같은 두 버튼과 같은 끝맺음. 실패를 고친 뒤 사람이 다시 누를 필요가 없다.
- 감수하는 것: 세션이 쓴 결과 줄을 사람 클릭으로 보는 권한 위임. 머지 게이트 위조 판정은 예외로 남는다.
- 대안과 기각 사유: 종류별 표면 유지 — 같은 이름이 다른 세션을 열어 혼동이 남는다. 실패 인계는 창만 닫고 재시도는 사람이 누름 — 버튼을 합쳐도 끝맺음이 종류마다 달라진다.
- UI-ny0h-2의 조항은 넓힌 둘(대화 대상, 출구 이름) 외에 전부 승계했고 폐기한 조항은 없다.

### ADR UI-ny0h-2의 결과 (승계)

- 두 지연은 설정 화면 `대기·주기` 묶음에서 따로 바뀐다. 되돌리려면 위 소비자와 함께 `server/timing-settings.js`의 두 키와 저장 파일 `timing-settings.json`이 움직인다.
- 하위 잡 관찰을 되돌리려면 dotfiles `docs/contracts/external-wait.md` Record·관찰 절,
  `server/worker/external-wait/adapters/slurm.js` 원격 프로그램, `observer.js`·`store.js` 저장,
  `server/worker/attach.js` 투영, 카드 렌더러(`app/views/worker/wait-vocabulary.js`·`lanes.js`),
  상세 패널(`app/views/detail-panel/index.js`), `completion-prompt.js`가 함께 움직인다.
- 얻는 것: snakemake가 아닌 sbatch 하위 잡도 같은 규칙으로 붙는 일반성과 로그 비의존. 잃는 것:
  전체 단계 수(Slurm은 아직 던지지 않은 잡을 모른다)와 같은 폴더 동시 실행의 구분.
- 기각한 대안: 별도 감시 루프와 별도 파일(ssh·수명·정리가 두 갈래), snakemake 진행 줄 파싱
  (snakemake 전용이라 사용자 기각), 의존성 일괄 제출(플러그인 미지원, 실패 시 의존 잡이 대기로 남음).

#### ADR UI-nuwy의 결과 (승계)

- 되돌리기 어렵다: `direction-inquiry.js` 기동(같은 세션 명령·진입 블록 사본), `scheduler.js`
  reconcile의 메시지 처리·인계 이어가기와 `resume()`의 `conversation_return` 예외, `admission.js`의
  `allow_conversation_return`, `wait-judgment.js` 대화 verdict 표와 actions, `notify.js` 네 종류와
  억제, `tile-resolve.js`의 두 버튼 술어, `session-stall.js` 술어, 핀 투영 schema 2가 함께 움직인다.
- 맥락 없이는 놀랍다: 파킹된 attempt가 `awaiting_user`를 단 채 재개되고, 그런데도 사람 `↻`는
  없다. 재개는 대화의 `인계`(또는 `[워커로 이어가기]`) 뒤 창 소멸을 확인한 한 경로뿐이다.
- 감수하는 것: 메시지 단위 관측을 위해 매 pass(현재 30초)마다 대화 전사 끝(현재 64KB)을 읽는다. 무인 세션 이력에
  대화가 섞인다. 인수 세션의 push는 가드 밖이다.
- 미확인 전제: 대화형 Codex 창이 기본 `CODEX_HOME`에서 attempt 세션을 `codex resume`로 이어 쓰고
  이후 attempt 홈의 `codex exec resume`가 같은 rollout을 찾는지는 배포 뒤 첫 실제 대화에서
  확인한다.
- UI-ri8n의 조항은 뒤집은 둘(`idle → normal`, 파킹·복구 대기 출구를 fork 문의 세션이 끝까지
  처리하는 조항과 그 알림·프롬프트) 외에 전부 승계했고 폐기한 조항은 없다.

### ADR UI-18a5-2의 결과 (승계)

- 되돌리기 어렵다: `queue-store.js` 레코드 필드, `scheduler.js` `reconcileInteractivePass` 정산, 세 런처(`direction-inquiry.js`·`resolve-session.js`·`external-wait/session-resume.js`)의 레코드 쓰기가 함께 움직인다.
- 맥락 없이는 놀랍다: fork로 연 해결 세션도 대화 레코드이고, 그 인계는 세션 재개가 아니라 행의 조작을 실행한다.
- 얻는 것은 정산 규칙 하나, 감수하는 것은 옛 레코드 읽기 호환 기간이다. 대안(종류별 정산 유지)은 끝맺음 통합을 막는다.
- UI-nuwy-2의 조항은 넓힌 둘(`conversation` 보유 종류, 인계·보류 정산 종류) 외에 전부 승계했고 폐기한 조항은 없다.

### ADR UI-18a5-3의 결과 (승계)

- 머지 게이트의 보류·terminal·알림 규칙과 실패 행 출구가 한 행으로 읽힌다. 되돌리려면 receipt-check 레지스트리·review lineage claim·completion intent phase·알림 클래스와 함께 `pr-actions.js` 정리 재시도 권한, `discard-coordinator.js` 재시도, 머지 큐 재등록, `scheduler.js` 인계 실행·한 번 규칙, PR 대기 행 버튼과 `pr-wait-row.js` 술어, `notify.js` 다음 행동 문구가 움직인다.
- 맥락 없이는 놀랍다: 세션 결과 줄로 정리 재시도·머지 큐 재등록이 일어나고, 위조 판정 행에서만 인계가 아무것도 하지 않는다.
- 얻는 것: 실패를 고친 뒤 사람이 다시 누를 필요가 없다. 감수하는 것: 권한 위임, 결과 미상이면 거절로 끝나는 보수적 규칙. 대안(출구 이름만 바꾸고 인계는 창만 닫음)은 끝맺음이 종류마다 갈린다.
- UI-u6ud-4의 조항은 바꾼 출구 조항 외에 전부 승계했고 폐기한 조항은 없다.
