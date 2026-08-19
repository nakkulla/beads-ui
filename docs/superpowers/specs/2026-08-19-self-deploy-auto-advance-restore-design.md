# self-deploy 재시작 후 auto_advance 스냅샷 복원 설계 (UI-dckr)

- 작성일: 2026-08-19
- 상태: spec gate REVISE(blocking 5, minor 1) 전건 반영, controller self-review 완료
- Bead: `UI-dckr`
- route: `spec_backed`
- 선행: `UI-83tq`(blocks — 같은 파일 무리와 판정 술어 재사용)
- 관련: `UI-pmfr`(재시작 채택 정리, 머지됨 a77a299)

## 1. 문제와 관측

`load()`의 restart-safety(`queue-store.js ensureLoaded`, worker-phase2 spec
§5.3)는 모든 재시작에서 `auto_advance`를 무조건 false로 강제한다. 반면
`auto_merge`는 durable이다 — beads-ui를 머지하면 beads-ui가 배포되고 그 배포가
바로 이 서버를 재시작하므로, 메모리에 두면 머지 체인이 자기 저장소를 머지하는
순간 스스로 꺼지기 때문이다(UI-yk55).

이 비대칭의 결과로, 자동화를 켜 두고 운영하면 **첫 self-deploy가 일어나는
순간부터** 다음 상태가 매번 재생산된다:

- 머지 체인·배포·PR 관측은 계속 자동으로 돈다(`auto_merge=true` 유지).
- 그러나 **전 워크스페이스**의 대기 레인 신규 세션 디스패치는 사람이 ▶를
  누를 때까지 정지한다(`auto_advance=false` 강제 — 리셋은 워크스페이스별
  `load()`에 공통 적용되므로 beads-ui가 아닌 레포의 레인까지 선다).

사용자 관측(2026-08-19): "자동화는 꺼져 있는데 자동머지만 켜져 있는 경우가
많다" — 정확히 배포 직후 상태다. 무수동 운영 정책에서 이 정지는 매 배포마다
수동 개입을 요구하는 실질적 병목이다.

## 2. 목표와 불변식

- 재시작 시 `auto_advance=false` 기본은 유지한다. 크래시, 수동 재시작, 판정
  불능의 모든 경로는 현행과 바이트 단위로 동일하게 꺼진 채 남는다(fail-closed).
- 서버가 스스로 시작한 self-deploy의 재시작으로 판정된 부팅에 한해, 그 배포
  chain이 terminal success에 도달하면 **재시작 직전에 켜져 있던 워크스페이스**의
  `auto_advance`를 복원한다.
- 사용자 ⏸는 어떤 경로로도 기계가 덮지 않는다: 재시작 직전 꺼져 있던
  워크스페이스는 복원 대상이 아니고, 부팅 후 사용자가 토글에 개입한
  워크스페이스는 자격을 잃는다.
- 실패 halt(`halted_auto_advance` attempt)의 해소·복원은 이 설계의 소관이
  아니다 — `UI-83tq` §6의 moot reconcile가 소유한다. 이 설계는 UI-83tq §5의
  원칙("Worker를 멈춘 당사자를 durable하게 식별하고, 그 당사자의 사유가
  소멸했을 때만 복원")을 재시작-리셋이라는 세 번째 당사자에 적용한 것이다.

| 꺼진 원인 | 식별 근거 | 복원 주체 |
| --- | --- | --- |
| 실패 halt | `halted_auto_advance=true` attempt | UI-83tq §6 reconcile |
| self-deploy 재시작 리셋 | 재시작 직전 persisted 값 true + 채택된 self-deploy chain 성공 | **이 설계** |
| 사용자 ⏸ | 위 둘 다 없음 | 복원 금지(공통 불변식) |

## 3. 범위와 소유 경계

- workflow 계약 표면(enum, label, metadata 키, status 어휘)은 추가·변경하지
  않는다. 복원은 실패의 재dispatch가 아니라 성공 확인 후의 상태 복원이므로
  v2 사다리(`script_retry → auto_repair_session → user_triggered_session`)
  밖이다 — UI-83tq §3이 auto_advance 복원에 대해 세운 판정과 동류다.
- **새 durable 상태를 만들지 않는다.** queue.json 스키마, deploy 스크립트
  (`repo-ops/script/deploy`), `repo-ops/config.toml`, WebSocket payload,
  frontend는 전부 무변경이다. 캡처와 판정은 프로세스 in-memory로만 존재하고,
  트리거 전에 다시 죽으면 사라진다 — 그 결과가 곧 현행 동작이므로 fail-closed가
  구조적으로 성립한다.
- 토글 클릭의 의미(두 축 원자 정합, `2026-08-13-workspace-automation-toggle-design.md`)는
  바꾸지 않는다.

## 4. 스냅샷 캡처 — 재시작 직전 값의 회수

`ensureLoaded()`는 raw queue.json을 읽은 뒤 in-memory로만
`auto_advance=false`를 강제하고, 보정값은 다음 mutation에야 flush된다. 따라서
**load 시점의 `raw.auto_advance`가 곧 재시작 직전 상태다.** 별도 마커가 필요
없다.

- `ensureLoaded()`에서 `raw.auto_advance === true`를 워크스페이스별 비영속
  in-memory 맵(`auto_advance_at_shutdown`)에 기록한다. 파싱 실패·필드 부재는
  false로 캡처된다(복원 자격 없음).
- 캡처는 1회 소비다: 복원이 실행되거나, 그 워크스페이스에 **사용자 CAS 토글**
  (`toggleAutomation`, `toggleAutoAdvance`)이 한 번이라도 실행되면 소거한다.
  scheduler-owned `setAutoAdvance`(실패 halt, UI-83tq 복원)는 사용자 개입이
  아니므로 소거하지 않는다 — 실패 halt와의 상호작용은 §6의 미해소-실패
  조건이 막는다.

## 5. self-deploy 재시작 판정 — 전역 트리거

프로세스당 한 번 확정되는 전역 사실 "이 부팅은 검증된 self-deploy 재시작이고
그 배포는 성공했다"를 다음 조건의 동시 성립으로 판정한다.

**후보 고정(판정보다 먼저)**: §6의 process-singleton 복원 컨트롤러가 각
워크스페이스 coordinator 초기화 시 — 첫 reconcile pass의 **어떤 mutation보다
앞에서** — 그 시점에 non-terminal인 deploy 종류 repo operation의 ID 집합을
in-memory로 고정한다. 첫 pass의 재시작 채택이 exact-input 증거로 행을 즉시
succeeded로 종결해도(`exact_input_exit_zero_evidence_adoption`) 고정된 후보
자격은 유지된다. 이미 종결된 과거 배포 행은 후보가 아니다 — 과거 성공 행의
target SHA는 현재 소스와 자명하게 일치하므로, 이 고정이 없으면 크래시
재시작이 오판된다.

**트리거 성립**: 고정된 후보 중 다음을 전부 만족하는 operation이 존재할 때.

1. target SHA가 현재 runtime identity의 `source_sha`
   (`server/runtime-identity.js` — healthz가 서빙하는 것과 같은 내부 사실)와
   일치한다.
2. operation이 속한 워크스페이스의 저장소가 서버 `source_repo`의 저장소와
   같은 저장소다 — 판정은 root-commit identity
   (`git rev-list --max-parents=0 HEAD` 첫 항) 비교로 한다. `source_repo`는
   release checkout이라 경로 비교는 성립하지 않으므로 저장소 계보로 결속하고,
   무관 저장소의 우연한 SHA 일치를 배제한다.
3. 프로세스 시작 시각이 operation의 시작 이후다(op start < boot) — 재시작이
   그 배포의 lifetime 안에서 일어났음을 시간으로 결속한다.
4. operation의 chain이 terminal success에 도달한다. 판정은 UI-83tq §4가
   재사용하는 `judge()`의 `chain_closed` 규칙을 그대로 호출한다(직접 성공과
   repair 경유 늦은 성공 — `descendant_success_covers_ancestor_rows` — 를
   같은 규칙으로 흡수; 판정 로직을 복제하지 않는다).

트리거는 성립 시점부터 프로세스 수명 동안 유지되고, 워크스페이스별 복원은
각자의 캡처 소비로 멱등해진다. 배포가 끝내 실패하면 트리거는 성립하지 않고
캡처는 미사용으로 남는다 — 현행과 동일한 꺼짐 상태다.

## 6. 복원 pass — owner, 조건과 인계

**Owner와 wiring**: 복원의 소유자는 워크스페이스별 coordinator가 아니라
process-singleton **복원 컨트롤러**다. `attach.js initWorkerRuntime`이
attachment를 eager 생성하는 그 초기화에서 컨트롤러를 만들고, 각 워크스페이스의
캡처(§4)·후보 고정(§5)·runtime identity 읽기(`runtime-identity.js`)를 주입한다.
beads-ui 워크스페이스의 coordinator 주기 pass(`reconcileRepairsLocked`와 같은
실행 지점)가 §5 트리거 성립을 컨트롤러에 보고하면, 컨트롤러가 **모든 등록된
워크스페이스 attachment로 복원을 fan-out**한다 — 각 워크스페이스의 조건
판정과 `setAutoAdvance`는 그 워크스페이스의 기존 직렬화 규율 안에서,
`notifyChanged`/`tick` 인계는 lock 밖에서 실행한다. coordinator에는 identity·
notify·tick 의존성을 새로 주입하지 않는다 — 그것들은 컨트롤러가 소유한다.

각 워크스페이스에 대해 다음이 **전부** 성립할 때만
`setAutoAdvance(workspace, true)`를 실행하고 캡처를 소거한다:

1. §5의 전역 트리거 성립.
2. 해당 워크스페이스의 캡처값 true (사용자 ⏸ 중 배포, 실패 halt 중 배포는
   재시작 직전 persisted 값이 이미 false → 캡처 false → 비복원).
3. 현재 `auto_advance === false`이고 부팅 후 그 워크스페이스에 사용자 CAS
   토글이 없었음(§4의 소거 규칙이 곧 이 판정).
4. 미해소 실패가 0개 — UI-83tq §6이 재사용하는 실패 배너 projection
   predicate(미dismiss이며 후속 attempt로 supersede되지 않은 실패)를 **그대로
   재사용**한다. 별도 구현을 두지 않는다. 캡처와 재시작 사이, 또는 부팅 후에
   끼어든 halt·blocker 실패는 전부 이 조건이 막고, 그 해소는 UI-83tq 소관이다.
5. 판정 중 어떤 오류(`judge()` 예외, snapshot 실패 등)도 "복원 포기, OFF
   유지"다. 이 설계의 어느 분기도 기존보다 더 많이 자동 진행하는 쪽으로
   fail하지 않는다.

복원 범위는 캡처값 true인 **모든 워크스페이스**다 — 리셋이 전역이므로
beads-ui 배포가 타 레포 레인까지 세우던 현상을 함께 해소한다.

**인계**: 복원이 실제로 일어난 pass는 lock 해제 후 `notifyChanged`와 scheduler
`tick`을 호출한다(UI-83tq §6 인계 규칙과 동일). 이 인계 없이는 플래그만 켜진
채 다음 외부 이벤트까지 아무것도 디스패치되지 않는다.

UI-83tq의 moot 복원과 이 복원은 독립 조건·독립 트리거로 공존한다. 둘 다
`setAutoAdvance(true)`로 수렴하고 멱등하며, 서로의 보수 조건(§6-4의 미해소
실패 0 ↔ UI-83tq의 halting 실패 소진)을 약화시키지 않는다.

## 7. 오류·동시성 경계

- 복원 pass는 기존 lock 규율 안에서 실행하고 새 lock을 만들지 않는다.
- 캡처·트리거·토글-개입 추적은 전부 in-memory다. 트리거 확정 전 재크래시는
  캡처를 소실시키고 OFF로 남는다(수용 — 현행 동작).
- 채택된 self-deploy가 스크립트 재시도·repair를 거쳐 **늦게** 성공하는 경우
  복원도 그때 일어난다. 반대로 배포 성공 전 사용자가 ▶로 직접 재개하면 CAS
  토글이 캡처를 소거해 이 설계는 아무것도 하지 않는다.
- 부팅 시점에 이미 terminal success였던 self-deploy 행(스크립트가 재시작 전에
  종결을 기록한 경우)은 §5 후보 고정에 걸려 트리거가 성립하지 않는다. 이때 레인은
  현행처럼 꺼진 채 남는다 — 재시작 원인을 그 행에 귀속시킬 durable 증거가
  없으므로 보수적으로 수용한다.
- 오래 non-terminal로 남아 있던 self-deploy 행이 무관한 재시작 후 뒤늦게
  성공하는 희귀 경합에서는 복원이 일어날 수 있다. 이때도 "배포 chain 성공 +
  재시작 직전 켜짐 + 미해소 실패 없음"이 전부 증명된 상태이므로, 무수동 운영
  정책상 진행 재개가 기본값이라는 UI-83tq §6 수용 리스크와 같은 결로 수용한다.
- root-commit identity는 같은 계보의 fork·별도 checkout을 구분하지 못한다.
  같은 root-commit 저장소의 다른 워크스페이스가 같은 SHA를 다른 서비스로
  배포하는 동안 이 서버가 우연히 같은 창에서 재시작하는 경합은 이론상
  남는다 — 다만 그 배포가 **이 공유 서비스**를 재시작한 경우라면 복원은
  의도된 동작 그 자체이고, 다른 서비스 대상이면서 SHA·시간창·미해소-실패
  조건이 전부 우연히 겹치는 경우만 오발이다. 단일-canonical-워크스페이스
  운영(§`attach.js` 등록 모델)에서 이 폭은 수용한다.
- queue.json은 읽기만 하고 스키마를 바꾸지 않으므로 하위/상위 호환 문제가
  없다. 이전 서버와 이 서버가 번갈아 떠도 캡처는 각 프로세스의 사실일 뿐이다.

## 8. Test scope

### RED → GREEN seams

guard 조건(2–6, 8)은 단독으로는 현행 "항상 OFF" 구현에서도 통과하는 공허한
RED이므로, **모든 guard seam은 유효-복원 positive control과 한 쌍의 차등
테스트**로 작성한다: 같은 설정에서 guard 조건 하나만 바꾼 쌍둥이 케이스가
복원되는지(control)와 복원되지 않는지(guard)를 함께 단언한다. control이 없는
guard 단언은 이 spec의 RED 증명으로 인정하지 않는다.

1. **복원 성공 경로**(순수 RED): 캡처 true 워크스페이스 + §5 고정 후보
   self-deploy 행(조건 1–4 충족)이 chain_closed에 도달하면 `auto_advance`가
   true로 복원되고, lock 밖 `notifyChanged`+`tick` 인계로 대기 bead가 **실제
   dispatch**된다. (RED: 현재는 수동 ▶까지 정지)
2. **사용자 ⏸ 비복원**(차등쌍): persisted true인 control은 복원되고, 재시작
   직전 persisted `auto_advance=false`(사용자 ⏸ 중 배포, `auto_merge`는 독립
   ON)인 변형은 같은 배포 성공에도 복원되지 않는다.
3. **부팅 후 토글 개입 비복원**(차등쌍): 개입 없는 control은 복원되고, 부팅
   후 사용자 CAS 토글(▶→⏸ 포함)이 있었던 변형은 캡처 소거로 복원되지 않는다.
4. **미해소 실패 차단과 늦은 공존**(RED 포함): 캡처 true여도 미해소 실패(배너
   predicate 기준)가 남아 있으면 복원하지 않고, 그 실패가 UI-83tq 경로로 moot
   dismiss된 **뒤의** pass에서 복원된다(두 설계의 공존 — 후반부가 RED).
5. **크래시 비복원**(차등쌍): 부팅 시 non-terminal이던 행이 성공한 control은
   복원되고, 부팅 전에 이미 종결된 과거 성공 행만 있는 변형(SHA는 자명히
   일치)은 후보 고정에 걸려 복원되지 않는다.
6. **저장소 불일치 비복원**(차등쌍): 같은 root-commit·SHA 일치 control은
   복원되고, target SHA 불일치 변형과 root-commit 불일치(무관 저장소) 변형은
   각각 복원되지 않는다.
7. **배포 실패 비복원·늦은 성공 복원**(RED 포함): chain이 실패로 남으면
   복원되지 않고, 이후 repair 경유로 chain_closed가 되면 그 pass에서
   복원된다(후반부가 RED).
8. **판정 오류 fail-closed**(차등쌍): 정상 판정 control은 복원되고, `judge()`
   예외 변형은 복원 없이 OFF 유지 후 다음 pass가 재판정한다.
9. **멱등·1회 소비**: 복원 후 같은 pass가 반복 실행돼도 재복원·재인계가
   없다.
10. **후보 고정 선행성**(RED): 첫 reconcile pass가 exact-input 증거 채택으로
    행을 즉시 succeeded로 종결하는 재현에서도, mutation 전에 고정된 후보
    자격으로 복원이 성립한다.
11. **다중 워크스페이스 fan-out**(RED): 2-workspace 통합 재현에서 beads-ui의
    self-deploy 성공이 캡처 true인 **다른** 워크스페이스까지 복원하고 각자의
    tick 인계로 dispatch시킨다. 캡처 false인 워크스페이스는 그대로다.

### 회귀 보존

- `ensureLoaded()`의 기존 반환 형태·리셋 의미(크래시 경로), `setAutoAdvance`
  기존 소비자, `toggleAutomation`/`toggleAutoMerge`의 CAS 의미가 변하지
  않는다.
- UI-83tq §9의 전 seam이 이 변경 후에도 성립한다(특히 §9-7 사용자 ⏸
  비복원).

## 9. 적용·배포와 live 검증

- 서버 전용 변경이다. frontend 소스와 `app/main.bundle.js`는 변경하지 않으며
  PR에서 번들 diff 부재를 확인한다.
- Pre-handoff: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` 모두 exit 0.
- 머지 후 `repo-ops/config.toml` `[deploy]` 선언에 따라 배포 operation의
  terminal success와 프로세스 경로·포트·HTTP 응답 검증까지 마쳐야 완료다.
- **이 변경 자체의 배포가 첫 실증이다**: 재시작으로 뜨는 프로세스가 이미 새
  코드이므로, 새 `ensureLoaded()`가 구서버가 남긴 persisted `auto_advance`를
  캡처하고 채택된 이 배포 operation 자체가 §5 후보가 된다. 따라서 이 PR의
  머지·배포에서 곧바로 검증한다: 배포 전 `auto_advance=true`를 준비하고, 배포
  재시작 후 사람이 ▶를 누르지 않아도 `auto_advance=true`로 복원되며 대기
  bead가 디스패치되는지 live로 확인한다. 이 live 검증은 현재 PR의 `[deploy]`
  coverage 안에서 완료하며 후속 배포로 이월하지 않는다.

## 10. 수용 기준

1. §8-1 재현이 사용자 개입 없이 성립하고, §8-10(후보 고정 선행성)과
   §8-11(다중 워크스페이스 fan-out)이 성립한다: self-deploy 성공 후 캡처 true
   워크스페이스가 복원되고 대기 bead가 dispatch된다.
2. 사용자 ⏸·토글 개입·크래시·저장소 불일치·배포 실패·판정 오류의 모든
   경로에서 복원이 일어나지 않으며, 각 guard는 유효-복원 positive control과
   차등쌍으로 증명된다(§8-2/3/5/6/7/8).
3. 실패 halt와의 경계가 보존된다: 미해소 실패가 있으면 복원하지 않고, 그
   해소·복원은 UI-83tq 기제가 수행한다(§8-4).
4. workflow 계약 표면·queue.json 스키마·deploy 스크립트·frontend 무변경.
5. Pre-handoff 검증과 §9의 배포·runtime 검증을 통과한다.

## 11. 기존 설계와의 관계

- **worker-phase2 spec §5.3** (`2026-07-26-worker-phase2-pr-queue.md`): "재시작
  시 auto_advance 강제 OFF"를 좁힌다 — 기본은 유지하되, 검증된 self-deploy
  재시작의 성공 후 복원이라는 예외를 이 문서가 정의한다. `queue-store.js`
  헤더의 restart-safety 주석과 `auto_advance`/`auto_merge` 필드 doc의 대비
  서술도 이 예외를 반영해 갱신한다.
- **`2026-08-13-workspace-automation-toggle-design.md`**: 토글 클릭의 두 축
  원자 정합 의미는 무변경. 이 설계는 클릭이 아닌 재시작 경로만 다룬다.
- **`2026-08-19-moot-repair-failure-neutralization-design.md` (UI-83tq)**: §5의
  "멈춘 당사자" 식별 원칙을 공유하고, §6의 미해소-실패 predicate와 §4의
  `judge()` `chain_closed` 판정을 재사용하며, §8의 fail-closed 문장("덜
  기록하거나 더 자동 진행하는 쪽으로 fail하지 않는다")을 동일하게 적용한다.
  구현은 UI-83tq 랜딩 후 같은 seam 위에서 한다(blocks 의존).
- **UI-pmfr** (머지됨 a77a299): 재시작 중 repo operation 정리·채택 경로가 이
  설계의 §5 후보 고정(부팅 시 non-terminal 행 채택)의 기반이다.

## 12. 제외 범위

- 실패 halt의 무해화·복원 — `UI-83tq` 소유.
- v2 사다리 단·예산·금지 enum의 의미 변경 — dotfiles 계약 소유.
- `auto_merge`의 durable 의미 변경(현행 유지 — UI-yk55).
- 토글 UI·문구 변경.
- 크래시 재시작의 자동 재개(명시적 비목표 — spec §5.3 기본 유지).

## 13. 실행 단위와 route

단일 워크스페이스(beads-ui) 서버 전용 변경으로, 한 owner가 한 worktree에서
구현해 하나의 PR로 운반한다. route는 `spec_backed`이며 이 spec이 판정 규칙과
실패 의미를 고정하므로 별도 plan은 두지 않는다. 구현 파일 무리:
`server/worker/queue-store.js`(캡처·소거),
`server/worker/attach.js`(process-singleton 복원 컨트롤러 생성·identity 주입·
전 워크스페이스 fan-out 배선), `server/worker/repo-operation-coordinator.js`
(후보 고정·트리거 보고), `server/ws/worker-handlers.js`·`server/ws/monitor-handlers.js`
(사용자 토글의 캡처 소거 훅이 store 밖에 필요할 경우에 한함).
