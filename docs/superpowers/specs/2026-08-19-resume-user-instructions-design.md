---
scope:
  - app/utils/resume-instructions-dialog.js
  - app/views/worker/index.js
  - app/views/detail-panel/index.js
  - app/views/monitor/index.js
  - app/protocol.js
  - app/protocol.md
  - server/ws/worker-handlers.js
  - server/worker/attach.js
  - server/worker/scheduler.js
---

# 이어하기 사용자 추가 지침 (resume user instructions)

## 목적

Worker의 수동 이어하기(↻ / 일시정지 ▶)는 지금 고정 문구의 `resumePrompt()`만
전달한다. 사용자가 실패 원인을 이미 알거나 재개 방향을 바꾸고 싶어도 개입할
채널이 없다. 이 설계는 이어하기 클릭 시 선택적 지침을 입력받아 resume prompt에
합성하는 관통 경로(클라이언트 입력 → 프로토콜 필드 → 서버 합성)를 추가한다.

## 결정 사항 (사용자 승인)

1. **적용 범위**: 모든 수동 이어하기 진입점 — Worker 실패 배너·실패 타일,
   상세 패널 세션 히스토리, 모니터 레인 일시정지 ▶.
2. **UX**: 이어하기 클릭 시 다이얼로그. 빈 입력이면 기존과 동일한 재개.
3. **합성**: 기존 `resumePrompt()` 문구를 보존하고 뒤에 지침 문단을 append,
   충돌 시 사용자 지침이 우선함을 명시.

## 1. UX — 공유 다이얼로그

새 공유 유틸 `app/utils/resume-instructions-dialog.js`를
`continuation-dialog.js` 패턴(순수 DOM `<dialog>`, `doc` 주입, Promise 반환)으로
작성한다.

- 구성: 제목 "세션 이어하기", textarea(placeholder
  "추가 지침 (선택) — 비워두면 기본 절차로 재개", `maxlength=4000`),
  버튼 **[이어하기]** · **[취소]**.
- 반환: `Promise<string|null>` — [이어하기]는 trim된 지침 문자열(빈 문자열
  허용), [취소]/Esc(`cancel` 이벤트)는 `null`이며 재개 자체를 중단한다.
- 키보드: Ctrl/Cmd+Enter 제출, Esc 취소. 초기 포커스는 textarea.

### 발신부 배선 (3곳)

| 발신부 | 위치 | 변경 |
| --- | --- | --- |
| Worker 뷰 | `app/views/worker/index.js` `resumeAttempt()` | 전송 전 다이얼로그, `null`이면 return |
| 상세 패널 | `app/views/detail-panel/index.js` `resumeAttempt()` | 동일 |
| 모니터 | `app/views/monitor/index.js` `mon-op--resume` 분기 | 다이얼로그 후 `sendContinuationAction('worker-attempt-resume', payload, …)` |

지침은 최초 전송, CAS conflict 1회 재시도, continuation mismatch 재전송
(`resolveContinuationMismatch`의 resend) **모두에 동일하게 실린다** — 각
발신부의 send 클로저에 `...(instructions !== '' ? { instructions } : {})`를
포함시키는 방식으로 보장한다. 모니터의 `worker-revise-fix` 등
`sendContinuationAction`의 다른 사용처는 변경하지 않는다.

## 2. 프로토콜

`worker-attempt-resume` payload에 선택 필드를 추가한다:

```
{ attempt_id, expected_revision, continuation?, decision_token?, instructions? }
```

- `instructions?: string` — 1..4000자(trim 후 비면 부재 취급). 응답 형태 불변.
- `app/protocol.js`의 payload 주석과 `app/protocol.md`를 갱신한다.

## 3. 서버 검증 — `handleWorkerAttemptResume`

`server/ws/worker-handlers.js`:

- `p.instructions`가 존재하면 string이어야 하고 4000자 이하 — 위반 시 기존
  스타일대로 `bad_request` (`invalid instructions`).
- trim 후 빈 문자열은 부재로 정규화한다.
- 통과 값은
  `resumeWorkerAttempt(key, p.attempt_id, { continuation, decision_token, instructions })`
  로 전달한다. `server/worker/attach.js`의 `resumeWorkerAttempt`는 scheduler
  `resume()`의 continuation 인자로 그대로 관통시킨다.

## 4. 프롬프트 합성 — `scheduler.resume()`

`resumePrompt()` 자체는 불변. `resume()`이 `relaunchFromAttempt`에 넘기는
`prompt`를 지침 유무에 따라 합성한다:

```
<기존 resumePrompt 문자열>

사용자가 이번 재개에 추가 지침을 남겼다. 아래 지침이 위 기본 절차와 충돌하면
지침을 우선하라.
<지침 텍스트>
```

- `paused`/`failed`/`orphaned` 세 상태 모두 같은 경로이므로 동일 적용된다.
- 합성 프롬프트는 기존대로 새 attempt의 `task_prompt`에 저장되어
  `get-attempt-prompt`로 열람 가능 — 별도 감사 필드는 두지 않는다.

## 5. 범위 제외

- stale-work `[이어서 진행]`(`worker-stale-work-continue`), 충돌 해소 세션
  자동 dispatch(`conflictPrompt`), auto-repair 재개: 지침 없이 기존 동작 유지.
  서버 배관(`resume()` continuation 인자)은 재사용 가능하므로 후속 확장은
  열려 있다.
- 실행 preset/모델/effort 결정, 5가지 거부 사유, CAS 계약, admission 검사:
  모두 불변.

## 6. 오류 처리

- 클라이언트: 다이얼로그 취소는 어떤 전송도 하지 않는다. 거부(`resumed:false`)
  토스트는 기존 그대로.
- 서버: `instructions` 타입/길이 위반만 새 `bad_request`이고, 나머지 실패
  모드는 기존과 동일하다. 지침이 있어도 거부 사유 판정 순서는 변하지 않는다.

## 7. 테스트

- `app/utils/resume-instructions-dialog.test.js`: 제출 시 trim된 지침 반환,
  취소 시 `null`, 빈 입력 제출 시 `''`.
- `server/ws/worker-handlers` 테스트: string 아님/4000자 초과 →
  `bad_request`; 유효 지침 → `resumeWorkerAttempt` 인자로 전달됨(스파이).
- `server/worker/scheduler` 테스트: 지침 有 → `relaunchFromAttempt`가 받는
  prompt가 기본 문구 + 지침 문단; 無 → 기존 문자열과 정확히 동일.
- 기존 뷰 테스트(↻ 클릭 → transport 검증)는 다이얼로그가 끼므로 다이얼로그
  통과 스텁 또는 dialog 상호작용을 추가해 갱신한다.
- 마감: `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write`
  · `npm run build`(갱신된 `app/main.bundle.js`·`.map` 포함).

## 구현 unit 후보

- `client-dialog`: `app/utils/resume-instructions-dialog.js` + 발신부 3곳 배선
- `server-compose`: `app/protocol.js`·`server/ws/worker-handlers.js`·
  `server/worker/attach.js`·`server/worker/scheduler.js` 관통

단일 unit으로 묶어도 충분한 크기이며, 분리 여부는 실행 진입 시 `unit_plan`
기록으로 결정한다.
