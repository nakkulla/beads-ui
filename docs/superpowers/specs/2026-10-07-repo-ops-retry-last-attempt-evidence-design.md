---
scope:
  - server/worker/repo-operation-log.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/operation-recovery.js
  - app/views/worker/failure-labels.js
  - docs/superpowers/specs/2026-10-06-repo-ops-log-viewer-design.md
---

# 저장소 작업 정산 증거를 마지막 시도 출력으로 좁힌다 (UI-ff7r)

Bead: UI-ff7r. 출처: UI-i8cy 스펙
(`docs/superpowers/specs/2026-10-06-repo-ops-log-viewer-design.md`) §9 관찰.
기준 base: `996e28ad36f1a4d7b64625fefabd6000350a354c`.

## 1. 목표

저장소 작업(머지 후 배포·검증·job)은 실패하면 같은 스크립트를 한 번 더
돌린다(`script_retry`). 두 번 모두 같은 방식으로 실패하면 "소유 코드 결함"으로
보고 수정 Bead를 자동으로 만든다. 그런데 재시도 출력이 같은 로그 파일에 이어
쓰이고, 실패 지문(digest)과 요약 줄은 파일 전체로 계산된다. 그래서 2차 지문은
1차 시도 출력까지 섞여 거의 항상 1차와 달라진다. 결과적으로 수정 Bead 자동
인계가 사실상 한 번도 일어나지 않는다.

이 스펙은 정산 증거(digest·요약)를 **마지막 시도의 출력**으로 계산하게 해서,
같은 스크립트가 같은 출력으로 두 번 실패하면 지문이 일치하게 한다. 이것은 지금
꺼져 있는 수정 Bead 자동 인계를 다시 살리는 의도된 동작 변경이다.

## 2. 검증된 전제

- 로그는 operation당 한 파일이고, 재시도도 같은 파일에 이어 쓴다 — `server/worker/repo-operation-runner.js:33-36`; child는 `a+`로 연다 — `server/worker/repo-operation-runner-child.js:66`
- child는 스크립트 spawn 직전에 시작 경계 줄을, close 때 끝 경계 줄을 쓴다 — `server/worker/repo-operation-runner-child.js:86`, `:110-118`; 경계 줄 쓰기 실패는 삼킨다 — `:35-52`
- 자동 재시도는 같은 `attempt_id`로 같은 runner를 다시 띄우므로 `attempt_id`로는 시도를 구분할 수 없다 — `server/worker/repo-operation-coordinator.js:1519-1545`(`attempt_id: operation.attempt_id`), 재시도 호출 `:2391-2398`
- 경계 줄 판별은 `repo-operation-log.js`가 소유한다: `scanBoundaryLines` — `server/worker/repo-operation-log.js:102`, 비공개 `outputRanges` — `:148`, `stripBoundaryLines`는 경계 줄이 없으면 같은 버퍼를 돌려준다 — `:179-190`; 시도 분할은 시작 줄 기준이고 첫 시작 줄 앞은 `preamble`이다 — `:259-357`(`:300-330`)
- 시도별 **원시 바이트**를 돌려주는 공개 함수는 없다. `parseRepoOperationLog`는 디코딩·마스킹한 줄을 꼬리 창에서만 준다 — `server/worker/repo-operation-log.js:259`
- 실패 지문은 `code`·`exit_code`·`signal`·`log_digest`의 sha256이다 — `server/worker/repo-operation-coordinator.js:84-101`
- 실패 증거 `logEvidence`는 경계 줄을 뺀 파일 전체로 digest와 요약을 한 번에 만든다 — `server/worker/repo-operation-coordinator.js:264-274`; 성공 경로 digest `fileSha256`도 같은 입력이며 "한 필드가 한 의미"를 주석으로 못박는다 — `:224-240`, 호출 `:1215-1226`
- `settleFailure`는 첫 실패면 재시도를 미루고(`retry_pending`), 재시도 뒤 실패는 곧장 정산한다 — `server/worker/repo-operation-coordinator.js:748-830`
- 첫 실패와 첫 지문은 `deferRepoOperationRetry`가 한 번만 고정한다 — `server/worker/queue-store.js:7912-7921`
- `local_code_defect` 판정은 재시도 소비 + 첫 지문과 현재 지문의 일치 + 요약의 실패 표지 줄(환경·인증 패턴 아님)을 요구한다 — `server/worker/operation-recovery.js:45-71`; 지문이 다르면 `verification_failure` — `:72-77`
- 요약은 앞에서부터 첫 실패 표지 줄, 없으면 마지막 비어 있지 않은 줄이다 — `server/worker/failure-class.js:235-254`
- 실패 카드는 첫 지문과 현재 지문이 같으면 "자동 재시도 1회 — 같은 실패", 다르면 "다른 실패"를 그린다 — `app/views/worker/failure-labels.js:466-480`
- 성공 `log_digest`의 소비처는 카드 투영 하나이고 지문 입력이 아니다 — `server/ws/worker-handlers.js:2831`(`grep -rn '\.log_digest' server app --include='*.js'`, 테스트 제외)
- 기존 코디네이터 테스트는 두 정산 사이에 로그를 덧붙이지 않아 누적을 재현하지 않는다 — `server/worker/repo-operation-coordinator.test.js:493-540`
- 핀 계약은 digest 범위를 정하지 않는다: 사다리는 `script_retry` 한 단계, 인계는 `proven_owned_code_defect` — `generated/contracts/repo-operation-policy.json:14`, `:43`
- 수동 `[배포 실행]` operation은 수정 인계 대상이 아니다 — `server/worker/repo-operation-coordinator.js:916`, `:977`

## 3. 설계

### 3.1 마지막 시도 바이트 (repo-operation-log.js)

- 결정: 경계 줄 모듈에 "마지막 시도의 스크립트 출력 바이트"를 돌려주는 함수를
  하나 더한다(예: `lastAttemptOutput(buffer)`). 규칙:
  - 시작 경계 줄이 하나도 없으면 경계 줄을 뺀 전체(= 지금의
    `stripBoundaryLines` 결과).
  - 시작 줄이 있으면 **마지막 시작 줄 뒤부터 파일 끝까지**의 출력 바이트(그
    구간의 끝 경계 줄과 `sep` 개행은 뺀다). 첫 시작 줄 앞 `preamble`과 앞선
    시도는 들어가지 않는다.
- 경계 줄 판별·`sep` 처리는 `outputRanges`와 같은 규칙을 공유한다. 판별 규칙을
  두 벌 만들지 않는다(UI-i8cy §5.2 "파서 모듈 하나가 소유").

### 3.2 정산 증거 (repo-operation-coordinator.js)

- 결정: `logEvidence`의 digest와 요약, 그리고 성공 경로 `fileSha256`이 모두 §3.1
  바이트로 계산한다. 세 값이 같은 입력을 본다는 기존 불변식은 유지된다.
- 요약을 digest와 함께 좁히는 이유: `local_code_defect` 증명은 지문(digest)과
  요약의 실패 표지 줄을 함께 본다. 둘이 다른 시도를 보면 한 시도의 지문과 다른
  시도의 요약으로 증명이 섞인다.
- 결정: 성공 `log_digest`도 마지막 시도로 좁힌다(대안: 성공만 전체 유지. 이유:
  소비처가 카드 투영 하나뿐이고 지문 입력이 아니며, 한 필드가 경로마다 다른 뜻을
  갖지 않게 한다). 1차 실패 뒤 2차 성공(absorbed)의 digest는 이제 2차 출력만
  덮는다.

### 3.3 첫 지문과의 호환

- 1차 정산 시점에 로그에는 시도가 하나뿐이므로, 1차 정산의 "마지막 시도"는
  지금의 "파일 전체"와 같은 바이트다. 이미 고정된 `first_fingerprint`는
  마이그레이션 없이 새 2차 지문과 비교된다.
- 과도기: 배포 시점에 `retry_pending`이던 operation은 경계 줄 없는 1차 출력 +
  경계 줄 있는 2차 출력을 갖는다. 1차 출력은 `preamble`이 되어 빠지므로 2차
  지문은 2차 출력만 본다. 1차 지문(경계 줄 없는 전체 = 1차 출력)과 같은 기준으로
  비교되므로 별도 처리가 필요 없다.
- 경계 줄이 없는 옛 로그와 배포 전부터 떠 있던 child는 §3.1의 "시작 줄 없음"
  규칙으로 지금과 같은 값을 낸다. 이미 정산된 레코드는 다시 계산하지 않는다.
- 시작 경계 줄 쓰기가 실패하면 두 시도가 한 구간으로 합쳐진다. 이때 지문은
  1차와 달라질 뿐이고(지금과 같은 결과), 거짓 일치는 생기지 않는다. 별도의 안전
  장치(marker 시각 대조 등)는 두지 않는다.

### 3.4 동작 변경과 표시

- 같은 스크립트가 같은 출력으로 두 번 실패하면, 대상 Bead가 있는
  deploy·verify·job 실패는 `local_code_defect`가 되어 기존 경로대로 수정 Bead
  (`type:bug`, quick_fix handoff)가 자동으로 만들어진다. 사다리(`script_retry`
  한 번)와 수동 작업 제외 규칙은 바뀌지 않는다.
- 실패 카드의 "같은 실패 / 다른 실패" 라벨은 이제 실제 재현 여부를 말한다. 라벨
  코드는 바꾸지 않는다.
- 결정: 「🙋 확인 필요」 알림의 `next_action` 문구는 바꾸지 않는다 — 이 스펙은
  증거 범위만 다루고, 수정 Bead 언급 여부는 알림 문구 쪽 결정이다(§경계·후속
  관찰).
- 시각·소요 시간을 출력하는 스크립트는 좁혀도 바이트가 달라 일치하지 않는다.
  출력 정규화는 하지 않는다(보수적 거짓 음성 유지).

### 3.5 UI-i8cy 스펙 정정

- UI-i8cy 스펙 §5.2의 "계산 범위(파일 전체)는 바꾸지 않는다"와 §8 ADR 아님
  항목은 이 스펙으로 대체된다. 구현 PR에서 그 문단 끝에 "UI-ff7r 이후 마지막
  시도 출력으로 계산한다"는 한 줄 정정을 단다.

## 4. 오류 처리

- 로그 읽기 실패는 지금처럼 digest·요약 `null`이다.
- 끝 경계 줄이 없는 마지막 시도(중단·kill)는 파일 끝까지를 그 시도로 본다.

## 5. 수용 기준

1. 같은 출력으로 두 번 실패한 operation의 2차 지문이 1차 지문과 같고,
   `operation-recovery`가 `local_code_defect`로 분류한다.
2. 출력이 다른 두 실패는 지금처럼 `verification_failure`다.
3. 경계 줄 없는 로그의 digest·요약은 변경 전과 바이트 단위로 같다.
4. 요약은 마지막 시도의 첫 실패 표지 줄이다(1차 시도의 줄을 고르지 않는다).
5. absorbed 성공의 `log_digest`는 2차 출력만의 sha256이다.

## 6. 테스트

- `server/worker/repo-operation-log.test.js`: 마지막 시도 바이트 — 경계 없음(전체),
  preamble + 한 시도, 두 시도(마지막만), `sep` 개행, 끝 줄 없는 마지막 시도.
- `server/worker/repo-operation-coordinator.test.js`: 두 정산 사이에 **프레임된
  2차 출력을 덧붙이는** 재현 — 같은 출력이면 지문 일치·수정 인계, 다른 출력이면
  `verification_failure`; 요약이 2차 시도의 줄; absorbed 성공 digest.
- 과도기 로그(경계 없는 1차 + 경계 있는 2차)의 지문 일치.

## 7. 대안

- 시도별 로그 파일 분리 — UI-i8cy의 "한 파일 + 경계 줄" 결정과 충돌해 기각.
- 레코드에 시도 시작 바이트 오프셋 저장 — 스키마 변경이 필요하고 경계 줄이 이미
  같은 정보를 담아 기각.

## 8. 비목표

- 출력 정규화(시각 제거 등), 사다리 길이, 알림 문구, 수동 작업의 인계 대상화.

## 결정 (ADR 후보)

- 전제: ADR UI-jbl1 — UI-3vvi-2에서 승계한 "재시도 뒤 같은 fingerprint(exit·log digest)로 재현된 소유 코드 결함의 단일 자동 증명"을 그대로 따르고, digest의 입력 범위만 마지막 시도로 바로잡는다.
- 전제: ADR UI-u6ud-5 — `script_retry` 한 단계 사다리는 바꾸지 않는다.
- 정산 digest·요약·성공 `log_digest`를 마지막 시도 출력으로 계산 — 되돌리기 쉬움: 경계 줄 모듈의 함수 하나와 그 호출 두 곳이고 저장 형식·계약이 바뀌지 않는다 → ADR 아님

## 경계·후속

- 관찰: 「🙋 확인 필요」 알림의 `next_action`이 자동으로 생긴 수정 Bead를 언급하지 않는다 — 결함이 아니라 문구 선택이고, 인계가 실제로 살아난 뒤 필요가 드러나면 사용자 요청으로 연다.
- 관찰: 수정 Bead 생성과 실패 댓글(`completion-intent.js`의 `다음:` 줄) 중 무엇이 먼저 실행되는지 확인하지 못했다 — 구현 중 재현 테스트에서 순서를 확인하고, 댓글이 수정 Bead를 놓치면 그때 결함으로 판정한다.
