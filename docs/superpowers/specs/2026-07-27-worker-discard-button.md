# 워커 [재실행] → [폐기] 정합화 — 재큐잉·디스패치를 드래그 경로로 일원화 (UI-m4cg)

worker-phase2(`2026-07-26-worker-phase2-pr-queue.md`) §4/§6/§7/§11/§12의 [재실행]
정의를 **개정(amend)**한다. 이 문서가 [폐기]의 canonical 정의이며, phase2 문서의
[재실행] 서술은 역사 기록으로만 남는다.

## 배경 — 현행의 어긋남

현행 [재실행](`pr-actions.js` `rerun`)은 "폐기 + 재큐잉 + 디스패치 요청"을 한
버튼에 결합한다. 큐 일시정지(⏸) 시 디스패치는 일어나지 않으므로 "재실행 버튼을
눌렀는데 실행은 안 됨" 상태가 생기고, 서버는 이를 구분하려 `redispatched`
필드를 따로 내려준다 — 버튼 이름과 실제 보장이 어긋나 있다. 또한
`requeueFromPrWait`로 큐 꼬리에 직행하므로 admission 게이트(spec 존재·base
검증)를 재통과하지 않는다.

## §1 [폐기] 액션 정의

파괴적 액션은 폐기까지만 수행하고, 재실행은 별도 액션 없이 기존 경로(후보 레인
재등장 → 사용자 드래그로 대기 레인 이동 → admission → auto_advance 디스패치)로
일원화한다.

**상태 전이 (ORDER-SENSITIVE, 각 단계 검증 — phase2 §6 전이의 마지막 단계만
교체):**

0. 폐기 진행 중 배리어를 관측 캐시에 마킹한다(현행 `markRerunning` 상당) — close
   와 pr_wait 제거 사이의 창에서 폴러가 CLOSED-unmerged를 관측·게시하지 못하게
   하는 구조적 배리어. 유지 필수.
1. PR close. 단, 이미 CLOSED로 관측된 PR(§2)은 skip한다 — closed PR에 대한
   `gh pr close`는 비0 종료하므로 skip 없이는 CLOSED-unmerged 처분이 항상
   실패한다.
2. bd status를 `open`으로 복귀 + `metadata.pr_url` 제거, 각각 readback (현행
   유지).
3. 워크트리 + 로컬/원격 브랜치 폐기 (현행 유지).
4. **`pr_wait`에서 제거만 한다** (단일 mutation). `queue`로 이동하지 않는다 —
   현행 `requeueFromPrWait`(queue-store)는 pr_wait 단순 제거로 교체한다.

전이 완료 시 bead는 open 상태로 어느 워커 레인에도 없으므로, 후보 레인 합성
규칙(ready − queue∪pr_wait∪done, `index.js` `buildModel`)에 의해 **후보 레인에
자동 재등장**한다. 별도 레인 이동 코드·디스패치 tick 요청·`redispatched` 필드는
불필요하며 결과에서 제거한다.

## §2 대상 제한

- **대상**: `pr_wait`에 있고 PR이 OPEN 또는 CLOSED-unmerged인 bead.
  CLOSED-unmerged(phase2 §4의 "PR closed — 사람 처분 대기" 잔류)의 사람 처분은
  [폐기]가 담당한다 — phase2 §4의 "[재실행] 또는 큐 제거" 문구를 대체한다.
- **비대상**: MERGED PR(정리 실패 `merged_cleanup_failed` 포함). 머지가 이미
  landed한 PR은 폐기할 수 없다. 서버는 관측 tier가 `merged`면 사유
  `pr_already_merged`로 거부하고, UI는 merged 타일([머지]가 정리 재시도 버튼인
  타일)에 [폐기]를 렌더하지 않는다.
- 현행 가드(in-flight 중복 거부, `pr_wait` 밖 bead 거부, PR ref 미해석 거부,
  CAS `expected_revision`)는 그대로 유지한다.

## §3 UI 표면

- 버튼 라벨 [재실행] → **[폐기]**, WS 액션 `worker-pr-rerun` →
  `worker-pr-discard` (하위 호환 alias 불요 — 프런트/서버 동시 배포, 외부
  소비자 없음).
- confirm 문구: "PR을 닫고 워크트리/브랜치를 폐기합니다. 되돌릴 수 없습니다.
  다시 실행하려면 후보 레인에서 대기 레인으로 옮기세요." 취지로 갱신 — 재실행
  안내를 폐기 확인에 포함해 투스텝 흐름을 학습시킨다.
- 시각적 급: [머지] 옆 보조 동작 지위(phase2 §6 "오클릭 방지" 근거) 유지.
- toast: `폐기 거부: <reason>` / 성공 시 간결 통지.

## §4 부수 효과 (의도된 변화)

- **admission 재통과**: 재실행이 후보→대기 경로를 타므로 spec 존재·base 검증
  등 admission 체크를 새 base 기준으로 다시 받는다. base가 바뀐 상황에서 오히려
  올바른 동작이다.
- **⏸ 의미 단순화**: 폐기는 스케줄링 결정이 아니므로 일시정지와 무관하게 항상
  수행 가능하다. "사람이 누른 재실행도 ⏸를 우회하지 않는다"는 현행 특칙과
  `redispatched` 구분 보고가 소멸한다.

## §5 스펙·계약 정합

- phase2 문서 §6 [재실행] bullet 옆에 한 줄 개정 표기(이 문서 링크)를 추가한다
  (§10 supersede 표기 선례). phase2의 수용 기준 11·§12 [재실행] 테스트 항목은
  이 문서 §6/§7로 대체된다.
- `2026-07-27-worker-deploy-hook-design.md` 등 타 스펙의 [재실행] 언급은 역사
  기록으로 두고 수정하지 않는다(폐기 경로의 성질 — PR·브랜치 폐기 — 은 동일).
- bd 계약 표면(dotfiles) 무변경: `pr_url` 제거·`open` 복귀는 현행 그대로다.

## §6 수용 기준

1. [폐기] 클릭이 OPEN PR을 close하고, bd `open` 복귀·`pr_url` 제거(readback)·
   워크트리/브랜치 폐기 후 bead가 `pr_wait`에서 제거되며, `queue`에 들어가지
   않고 후보 레인에 재등장한다.
2. CLOSED-unmerged bead의 [폐기]는 close를 skip하고 나머지 전이를 동일 수행한다.
3. MERGED(정리 실패 포함) bead의 [폐기]는 `pr_already_merged`로 거부되고, UI
   merged 타일에는 [폐기] 버튼이 없다.
4. 폐기된 bead를 후보→대기로 드래그하면 admission을 재통과한 뒤 auto_advance
   ON일 때 새 base에서 새 attempt로 디스패치된다 (기존 경로, 신규 코드 없음).
5. 폐기 전이 중 폴러가 CLOSED-unmerged 배너를 게시하지 않는다 (배리어 유지).
6. ⏸ 상태에서도 [폐기]가 수행되고, 결과에 `redispatched` 필드가 없다.
7. `npm run all` green.

## §7 테스트 범위

- `pr-actions.test.js`: rerun 전이 테스트를 discard 전이로 교체 — queue 미이동·
  pr_wait 제거·CLOSED skip·MERGED 거부·배리어 유지.
- `ws.worker-queue.test.js`: 액션 rename + CAS 경로.
- UI `index.test.js`: 버튼 라벨·merged 타일 비렌더·confirm 경유 discard 호출.
- `queue-store.test.js`: `requeueFromPrWait` 교체분(단순 제거) 커버.

## 비목표

- 폐기 후 자동 재큐잉의 어떤 형태 (그게 이 개정이 제거하는 것이다).
- pr_wait "큐 제거"(폐기 없이 목록에서만 제거) 별도 액션 신설.
- 실패 attempt 복구(`2026-07-26-worker-failed-attempt-recovery.md`) 경로 변경 —
  `rerunTransition` readback 패턴 준용 서술은 discard 전이에도 동일 성립한다.
- dotfiles workflow 계약 문언 변경.
