---
status: working-ledger
deck: journey (custom deck.html, source ../source/deck-journey.src.html)
bead: UI-nqq2, UI-ympi, UI-hn9i
written: 2026-10-08
---

# 사실 원장과 시연 운영 메모 — journey 판

이 파일은 storyboard 스킬의 동결본이 아니다. 사용자가 "완성 화면부터 만들고 피드백"을 골라 원장을 화면과 함께 만들었다. 화면의 주장마다 출처를 적고, 확인하지 못한 것은 미확인으로 남긴다. 시각은 모두 KST.

2차(UI-ympi): 본편 영어 제목을 내용을 이름 붙인 명사구로 바꾸고(표지 키커 삭제), 본편 한국어 부제·화면 문구·노트를 korean-humanizer 기준으로 다듬었다. 수치·ID·시각과 원문 인용(이슈 제목, SPEC 제목)은 그대로다. 백업 장은 바꾸지 않았다.

3차(UI-hn9i): 발표자 창 피드백 24건을 반영해 본편을 실제 이슈 하나의 여정에서 일반적인 작업 흐름 설명으로 바꿨다. 본편은 39장(3부 + "시간이 되면" 묶음)이다. 화면에는 예시를 남기고 시각·커밋 해시·잡 ID·파일 경로는 뺐으며 노트는 장마다 2~3문장으로 줄였다. 반영한 피드백은 `feedback-applied-20261008-*.json`에 있다.

## 3차에서 바뀐 본편 구성

| 키 | 표시 | 3차 변경 | 출처 |
| --- | --- | --- | --- |
| s-life | — | 백업에서 4번으로, 단계 재생 추가 | intro 판 백업 장 |
| s-git | 모의 | 백업에서 5번으로. 네 이슈(EX-a1~d4)가 병렬·직렬로 main에 합쳐지는 재생 그림으로 다시 그림 | 규칙 칸은 workflow 계약(작업 폴더=브랜치=이슈 ID, squash, base 동기화 뒤 머지) |
| s-issue | 대화 재구성 · 카드 실제 | 시각·덱 이슈 ID 삭제, 영수증 칸(spec_review·impl_entry·exec_receipt·impl_review) 추가 | s-anat의 영수증 항목 |
| s-adr | — | 백업에서 s-gates2 뒤로, 결정 절 → 세 조건 판정 → 같은 PR에 ADR → 목록 자동 생성 → 대체 단계 재생 | intro 판 백업 장, workflow ADR 절차 |
| s-implflow, s-specrev, s-done, s-gates2 | 기록 | 시각·해시·테스트 개수·후속 이슈 ID 삭제, s-done은 일반 기준과 수치 예시 한 줄 | 위 출처 표 그대로 |
| s-servers, s-serverdata | — | s-server2 자리에 본편으로, s-servers는 단계 재생 | intro 판 백업 장 |
| s-night, s-fail | 모의 | 실제 기록에서 가상 예시로. 저장소 이름과 시간 구조만 남기고 작업 이름·PR 번호·날짜는 일반화 | 위 출처 표의 기록을 바탕으로 한 예시 |
| s-parallel, s-meet, s-models, s-effort, s-tokens, s-remote | — | 백업에서 본편으로 | intro 판 백업 장 |
| s-accounts | 모의 | 백업에서 본편으로. 계정 A 한도 → 보류 → 허용 계정 중 여유 있는 계정 B로 전환 재생, 기다림 모드 설명 | beads-ui `server/worker/queue-store.js` provider_limit_policy·account_switch, `notify.js` 전환 사유 문구 |
| s-extra, s-instr, s-sah, s-net | — | s-next 앞 "시간이 되면" 묶음 | intro 판 백업 장 |
| s-journey, s-server2 | 기록 | 본편에서 백업으로 | 위 출처 표 그대로 |

## 본편 슬라이드별 출처

| 키 | 표시 | 화면의 주장 | 출처 |
| --- | --- | --- | --- |
| s-title | — | 제목·부제 | 인계서 §1 논지 |
| s-lost | 모의 | 네 저장소 대화가 사라지고 이슈 카드가 남는 장면 | 설명용 예시. 문장은 실제 기록이 아님 |
| s-problem | — | 채팅형 AI의 세 한계와 대응 | intro 판 s-problem 그대로 |
| s-journey | 기록 | 열 단계 시각: 17:08 등록, 17:28 진단, 17:41 SPEC v1, 18:01 v2, 18:03 f4a5197, 18:13 구현, 18:25 리뷰 반영, 18:30 머지, 19:55 산출 커밋, 20:01 09h 닫힘, 21:12 덱 이슈(PROSTATE-bcq) 닫힘 — 발송 시각은 기록에 없어 화면에 쓰지 않음 | `bd show PROSTATE-mpx`(created 08:07:56Z), `bd comments PROSTATE-mpx`(08:28Z 진단), spec 파일 `git log`, `gh pr view 10 --repo nakkulla/prostate`, prostate 커밋 6dc8800·1b17176, `bd show PROSTATE-09h`(closed 11:01:29Z), PROSTATE-bcq closed 12:11:58Z |
| s-issue | 대화 재구성 · 카드 실제 | 카드의 제목·출처·증거 3개·미확인·파급·route | PROSTATE-mpx 본문(출처/배경, 실측 증거 1–3, 미확인, 파급). 대화 문장은 본문에서 재구성 |
| s-spec2 | 실제 SPEC | 원인, 바꾸지 않는 것, 수용 기준(새 유의 개수 약속 안 함), 검증, 후속 이슈 | prostate `docs/superpowers/specs/2026-08-31-deseq-covariate-centering-design.md` §1·§2.3·§3·§4 |
| s-specrev | 기록 재생 | v1 a4f2969(17:41), Codex sol REVISE 막는 지적 4건, v2 67fd078(18:01, 영수증 codex@67fd078), f4a5197(18:03, self@), impl_entry user@f4a5197 | PROSTATE-mpx notes, spec 파일 `git log --follow`, 메타데이터 spec_review·spec_review_model·impl_entry |
| s-gates2 | 예시는 mpx 기록 | 두 리뷰의 질문, 규칙 4개(판정 둘, 게이트마다 독립 리뷰 1회, 영수증은 커밋에 묶임, 리뷰어 선택 순서) | dotfiles `docs/contracts/workflow-contract.md` Review gates(64–103행, 136–138행), mpx 리뷰 기록 |
| s-implflow | 기록 재생 | 87d7220(18:13), REVISE minor 1(수치 항 0개 → [] 저장), fd9cd6d(18:25), PR #10(18:26), 머지 26608f9(18:30), pytest 474·14 skip, snakemake -n, R 검사 skip, +40/−3 | `gh pr view 10`, PROSTATE-mpx 작업 보고서 댓글과 notes |
| s-server2 | 기록 재생 | remote_gate, 제출 전 관문, head job 244144(10분 27초)·244149(4분 45초)·244243(18분 35초) exit 0, 수용 검사, 산출 23개 커밋 6dc8800(19:55, wallace), 1b17176(19:59, Mac), 20:01 닫힘 | 커밋 6dc8800 메시지, `bd comments PROSTATE-09h` |
| s-done | 실제 산출 | 모형 B 27→5, 모형 A 26→111, GSEA 0→681/5,185, 회귀 계약 통과, 수용 검사 3 과잉 발화 판정(사람), PROSTATE-1ty 분리, 덱 이슈 21:12 닫힘. 회귀 계약 예외 1건(optimism_performance.tsv, 원인 PROSTATE-2jr seed, apparent 값 불변) | 6dc8800·1b17176, 09h 댓글, PROSTATE-1ty(discovered-from 09h), PROSTATE-bcq closed_at |
| s-queue2 | 모의 | 레인 이름(후보·대기·실행 중·PR 대기·완료), 슬롯 기본 2, 직렬 레인, blocks, 외부 대기, 구현 시작 승인 | beads-ui `app/views/worker/index.js` 레인 라벨, `server/worker/queue-store.js`(DEFAULT_SLOTS=2, serial_lanes s1–s5), workflow-contract 154행(bead-wait) |
| s-night | 기록 재생 | 10-01 01:05–05:51 일곱 이슈, PR #98·#99·rokit#4·#5·prostate#16, 02:14 사용 한도 보류 → 04:01 9초 안 재개, 외부 대기 2건 | `~/.local/state/bdui/<slug>/beads/<ID>/events.jsonl` (prostate·microbiome_bile·CRC-rokit) |
| s-fail | 기록 재생 | PROSTATE-u6u 잡 247700 FAILED(19시간 44분, 480분 한도), 113/225단계 보존, PROSTATE-suo 선행, 248074 재개(1440분), 두 번째 실패(PR089), PROSTATE-1fm, 10-05 22:36 닫힘 | u6u events.jsonl·notes, PROSTATE-1fm, 오른쪽 경계는 beads-ui `generated/contracts/repo-operation-policy.json` |
| s-live | 실시간 | 시연 순서 | 아래 운영 메모 |
| s-monitor·worker·detail·settings | 캡처 화면 | intro 판 캡처 재사용, 창 제목줄에 "캡처 화면, 실시간 아님" | intro 판 img/ |
| s-who | 이슈 기록 기준 | prostate(mpx·09h), microbiome_bile(Analysis-owzn: plan_approval 때 B안 판정 투영 선택), CRC-rokit(rokit-vej: 중복 환자 117명, PDGFRB 통합 HR 1.183→1.212) | 각 이슈 notes, CRC-rokit `outputs/reports/2026-09-30-data-pipeline-audit/report.md` D3 행. CRC는 미발표 랩 내부 |
| s-phone | 재구성 | Discord 스레드 흐름 | intro 판 s-phone. 연구 저장소 기록에 폰 응답 흔적은 없음 |
| s-measure | Compare 탭 | 433 세션, 343/385=89%, 중앙값 19분·$9.5(평균 45분·$16), $4.4 vs $11–17(표본 적음), 203억 토큰·$14.3k(API 환산) | intro 판 s-compare·s-tokens·s-meet. 착지율 정의는 beads-ui `compare-projection.js` 1074–1079행 |
| s-next | 가설 | H1은 기존 기록의 실험 상태, H2는 이번 판에서 처음 제안한 가설 | H2는 사용자 확인 필요 |

## 미확인으로 남긴 것

- 구현 진입 승인(impl_entry)의 정확한 시각. 화면에는 "18:03 이후"로만 표시.
- SPEC 리뷰가 돈 정확한 시각. 화면에서 시각을 뺐다.
- 09h 잡별 Slurm JobState 문자열과 Discord 알림 시각. 화면은 exit 0과 "알림이 폰으로"까지만.
- 모바일 beads-ui에서 카드를 대기열에 넣는 정확한 경로와 연구 저장소에서 폰으로 답한 기록. 폰 장은 재구성으로 표시.
- s-night의 microbiome_bile Analysis-owzn(00:21 이어하기)은 화면에서 뺐다.

## 시연 운영 메모

1. 덱 s-live에서 탭 전환: `http://<tailnet IP>:3000/#/monitor` (발표 직전 `ts-ip`로 확인).
2. Worker 탭에서 저장소 하나를 열고 후보·대기(병렬·직렬)·실행 중·PR 대기 레인을 짚는다.
3. 이슈 상세 하나: 단계 막대와 영수증 커밋, 본문, 작업 보고서 댓글.
4. 설정 → 워커 탭의 프리셋. 보기만 하고 바꾸지 않는다.
5. 실행 중인 세션이 있으면 열어 질문과 로그를 보여 준다. 없으면 건너뛴다.
6. 덱으로 돌아와 s-part3부터 이어 간다.
- 접속 실패 시: s-monitor·s-worker·s-detail·s-settings 캡처로 같은 순서를 설명한다.

## 조작

- 재생형 장(s-lost, s-life, s-git, s-issue, s-specrev, s-adr, s-implflow, s-servers, s-queue2, s-night, s-fail, s-accounts, s-phone, 백업의 s-server2): 화면의 [재생]을 누르거나 `S` 키. `.` 키는 한 단계씩.
- 발표자 창(`N`)의 미리보기는 재생형 장을 마지막 상태로 보여 준다.

## 인계서 §7 발표 전 수용 점검

| 항목 | 상태 | 근거 |
| --- | --- | --- |
| 첫 3분 안에 문제와 이유 | 충족 | s-lost, s-problem |
| 대화→이슈→SPEC→SPEC 리뷰→구현→구현 리뷰→완료 증거가 한 이야기 | 충족 | s-life·s-git 개요 → s-issue~s-done, 예시는 PROSTATE-mpx·09h |
| 두 리뷰 구분, 지어낸 규칙 없음 | 충족 | s-gates2 규칙은 workflow-contract 인용 |
| 라이브 화면이 데모 첫 장면, 과거·재구성 표시 | 충족 | 모든 장에 표시 라벨, s-live |
| 같은 이슈의 단계는 ID와 출처 연결 | 충족 | 위 표 |
| 선행 관계·직렬/병렬·외부 대기·우선순위·실패 후 복귀 | 부분 | 우선순위 변경 장면은 없음 |
| 서버에 Claude 없음, 코드·데이터 경계, 잡 완료 증거 | 충족 | s-server2 |
| 모바일·Discord·tmux 실제 동작 검증 | 미충족 | 폰 장은 재구성. 발표 전 실제 확인 필요 |
| 89%·API 환산·작은 표본·CRC 미발표 표기 | 충족 | s-measure, s-who |
| 발표자 노트와 폴백 | 충족 | 각 장 notes, 캡처 4장 |
