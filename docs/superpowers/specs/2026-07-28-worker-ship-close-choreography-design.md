# 워커 머지 클릭 choreography에 capability ship 배선

- 날짜: 2026-07-28
- Bead: UI-4ii4
- 상위 계약: dotfiles `docs/superpowers/specs/2026-07-28-ship-close-choreography-design.md`
  (dotfiles-0gpe, close 완료 · `provides:ship-close-choreography` 발행됨)
- 상태: 설계 승인 완료

## 배경

fork bd는 `external:<project>:<capability>` 의존을 쿼리 시점에 fail-closed로
해석한다 — 대상 프로젝트 DB에 `provides:<capability>` 라벨을 단 **closed**
이슈가 있을 때만 충족된다. 그 라벨은 `bd ship <capability>`가 `export:`
라벨 이슈에 부여하며, close만으로는 절대 발행되지 않는다.

dotfiles-0gpe가 close choreography의 4개 경로 중 3개(세션 direct-squash 스윕,
pr-finish close 스윕, bd-usage Core close 절차)에 ship 단계를 배선했다. 남은
경로가 **beads-ui 워커 머지 클릭**이며 본 유닛이 그것을 담당한다.

이 누락은 두 번 실사고로 관측됐다. 2026-07-28 dotfiles-v1hr이
`export:revise-disposition-contract`를 단 채 닫혀 UI-hs11이 영구 blocked(수동
dep 제거로 해소), 같은 날 dotfiles-0gpe 자신이 ship 없이 닫혀 UI-4ii4가
blocked(수동 `bd ship` fallback으로 해소 — 상위 스펙이 예고한 부트스트랩
교착이 실제로 발생). 워커 경로에 단계가 없는 한 세 번째 재현이 남아 있다.

## 목표

`server/worker/pr-actions.js`의 post-merge cleanup에 `parent_close` 다음
단계로 capability ship을 추가하고, 실패를 조용히 통과시키지 않는다.

ship이 close **뒤**여야 하는 것은 선택이 아니다: `bd ship`은 `--force` 없이
closed 이슈만 받는다.

## 아키텍처

### 새 모듈 `server/worker/ship-capabilities.js`

```
shipExportedCapabilities({ bd, bead_ids })
  → { ok: true }
  | { ok: false, reason: string, detail?: string }
```

`pr-actions.js`(현재 1658행)에 인라인하지 않고 분리한다. 경계가 깨끗하고
(입력 = closed bead id 목록 + bd 어댑터, 출력 = ok 또는 실패 사유) 독립
테스트가 가능하다.

`bd` 의존은 두 함수뿐이다:

- `readIssue(id)` — 기존 어댑터 함수. 이미 fail-closed이고 `.labels`를 담고
  있으므로 `readLabels` 전용 함수는 만들지 않는다.
- `ship(capability)` — 신규(아래).

둘 중 하나라도 함수가 아니면 `{ ok: false, reason: 'ship_unavailable' }`을
반환한다. `sweepChildren`의 `child_sweep_unavailable`과 같은 규약이며, 능력
부재를 "할 일 없음"으로 읽지 않기 위한 것이다.

### bd 어댑터 확장 `server/worker/bd-metadata.js`

```
ship: (capability: string) => Promise<{ status: string, issue_id: string|null }>
```

argv는 `bd ship <capability> --json`. 비영 exit는 throw(이 모듈의 모든
mutator 규칙), 페이로드가 읽을 수 없는 객체면 throw. 실측한 반환 형태:

| 상황 | exit | payload |
| --- | --- | --- |
| 정상 발행 | 0 | `{capability, issue_id, status: "shipped"}` |
| 이미 발행됨 | 0 | `{capability, issue_id, status: "already_shipped"}` |
| `export:` 라벨 이슈 없음 | 1 | (에러 메시지) |

## 열거 범위

`sweepChildren`의 반환을 `{ ok: true }` → `{ ok: true, closed_ids: string[] }`
로 넓힌다. 순회용 `seen` Set이 parent를 포함해 초기화되고(`new
Set([bead_id])`) walk가 끝난 시점에 그 안의 child는 전원 closed이므로, 별도
추적 없이 그 집합이 그대로 열거 대상이다.

즉 대상은 **parent + walk가 본 모든 자손 중 closed인 것 전체**이며, "이번
스윕이 새로 close한 것"으로 좁히지 않는다. 근거는 재시도 온전성이다. 실패
처분이 보고형 정지이고 재시도 경로가 `[정리]` 재클릭인데, 재시도 시점에는
parent도 children도 이미 closed다. `leaves_first`는 이미 closed인 child를
담지 않으므로 좁은 열거는 자손이 가진 `export:` 라벨을 재시도에서 영구히
누락시킨다. `bd ship`이 멱등(`already_shipped`, exit 0)이므로 넓은 열거의
비용은 없다.

상위 계약 문구("이번 스윕에서 close된 parent + phase children")보다 범위가
넓지만 구현 상세 수준의 편차이며, 계약이 소유한 키 표면(`export:` /
`provides:` 라벨 어휘, capability 이름)은 그대로 소비한다.

## ship 흐름

각 bead id에 대해:

```
labels = (await bd.readIssue(id)).labels ?? []   // throw → ship_read_failed:<id>
caps   = labels 중 'export:' 접두 → 접두 제거
각 cap:
  labels에 'provides:'+cap 이미 있으면 → 건너뜀
  r = await bd.ship(cap)
  r.issue_id !== id  → 실패 ship_target_mismatch:<cap>
  after = await bd.readIssue(id)
  after.labels에 'provides:'+cap 없음 → 실패 ship_readback_failed:<cap>
```

`issue_id` 대조를 두는 이유: `bd ship`은 capability 이름으로 워크스페이스
전체를 뒤져 대상 이슈를 고르므로, 라벨을 읽은 Bead와 다른 Bead를 ship할 수
있다. 계약상 capability는 유일하지만 그 가정이 깨진 순간을 조용히
통과시키지 않는다.

실패 사유 어휘(첫 실패에서 즉시 정지):

| reason | 의미 |
| --- | --- |
| `ship_unavailable` | bd 어댑터에 `readIssue`/`ship`이 없음 |
| `ship_read_failed:<id>` | `readIssue` throw (bd 장애 포함) |
| `ship_failed:<cap>` | `bd ship` 비영 exit / throw |
| `ship_target_mismatch:<cap>` | ship이 다른 이슈를 대상으로 잡음 |
| `ship_readback_failed:<cap>` | ship 후에도 `provides:` 라벨 부재 |

`detail`에는 아직 처리하지 못한 capability 목록을 담는다(상위 계약 §2의
"잔여 `export:` 라벨과 실패 사유를 보고").

`export:` 라벨이 하나도 없으면 no-op으로 `{ ok: true }`이다.

## cleanup 배선과 실패 처분

`CLEANUP_STEPS`에 `parent_close` 뒤로 `ship_exported_capabilities`를 추가한다
(서버 cleanup 6 → 7단계; 프론트엔드는 `merging`을 더해 7 → 8단계).
`runCleanup`에서:

```js
markStep(bead_id, 'ship_exported_capabilities');
const shipped = await shipExportedCapabilities({ bd: deps.bd, bead_ids: swept.closed_ids });
if (!shipped.ok) {
  return failCleanup(bead_id, 'ship_exported_capabilities', shipped.reason,
                     base_sync, /* restore_bd */ undefined, shipped.detail);
}
```

`restore_bd`를 넘기지 **않는** 것이 close 롤백 금지(상위 계약 §2 "ship 실패는
이미 수행된 close를 롤백하지 않되")의 구현이다.

실패 후 상태:

| 대상 | 상태 |
| --- | --- |
| bd(parent) | `closed` — 롤백하지 않음 |
| bd(children) | `closed` |
| lane | `pr_wait` — `moveToDone` 미도달 |
| 기록 | `cleanup_failed { step: 'ship_exported_capabilities', reason, detail }` |
| 배너 | 표시 |
| 재시도 | `[정리]` 클릭 → 전 단계 재실행 (close·sweep·ship 모두 멱등) |

이 조합은 이 모듈이 유지해온 "cleanup이 실패하면 bd는 `resolved`로 남는다"는
불변식이 **처음 깨지는 지점**이다. `failCleanup`의 JSDoc과 파일 상단
choreography 주석 양쪽에 이 예외와 근거를 명시한다. 근거는 상위 계약이 close
롤백을 금지하기 때문이며, 롤백하면 parent만 `resolved`이고 children은
`closed`인 반쪽 상태가 되어 더 나쁘다.

파일 상단 주석의 cleanup 순서 요약(`... → parent bd close → bead
done(merged)`)도 새 단계를 포함하도록 갱신한다.

## 취소성 close 규칙이 이 경로에서 vacuous한 이유

상위 계약 §3.5는 canceled / out-of-scope / won't-do 처분으로 닫는 `export:`
라벨 Bead에 ship을 금지하고 라벨 제거를 요구한다. 워커 머지 클릭 경로에는
그 처분이 **구조적으로 도달하지 않는다**:

- `runCleanup`은 PR이 실제로 머지된 뒤에만 실행된다(클릭 머지 또는 poller가
  관측한 외부 머지). 정의상 성공적 완료다.
- `[폐기]`는 cleanup을 타지 않는 별도 경로이며 status를 `open`으로 되돌리고
  `pr_url`을 제거한다(`pr-actions.js` 폐기 액션).

따라서 취소성 판정 로직을 넣지 않는다. 대신 이 근거를 새 모듈 상단 주석에
기록해, 다음 독자가 "규칙을 빠뜨렸다"로 읽지 않게 한다.

## 프론트엔드

`app/views/worker/index.js`의 `MERGE_STEPS`에 `parent_close` 뒤로
`{ step: 'ship_exported_capabilities', label: 'capability 발행' }`을 추가한다.
`mergeStepView`는 배열 길이 기반이므로 카운터는 자동으로 8단계가 된다.

같은 파일의 "seven steps" / "six `CLEANUP_STEPS`" 주석과 `4/7` 예시를 새
숫자로 갱신한다.

## 테스트

신규 `server/worker/ship-capabilities.test.js`:

- `export:` 라벨이 없으면 ship을 호출하지 않고 ok를 반환한다
- `export:` 라벨 하나를 ship하고 `provides:` readback으로 확인한다
- `provides:`를 이미 가진 capability는 ship하지 않는다
- `bd.ship`이 throw하면 `ship_failed:<cap>`과 잔여 목록을 반환한다
- ship 후에도 `provides:`가 없으면 `ship_readback_failed:<cap>`을 반환한다
- ship이 다른 이슈를 대상으로 잡으면 `ship_target_mismatch:<cap>`을 반환한다
- `bd.ship`이 없으면 `ship_unavailable`을 반환한다
- parent와 자손 여러 개의 capability를 모두 ship한다

기존 갱신:

- `server/worker/pr-actions.test.js` — `CLEANUP_STEPS` 순서 기대치, ship 실패
  시 `cleanup_failed.step`과 **bd가 `closed`로 남는지**(restore 미호출),
  ship 성공 시 done 이동
- `app/views/worker/index.test.js` — 단계 목록·카운터 기대치

검증: `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
`npm run build`(번들 동봉).

## 비범위와 잔여 리스크

- fork bd 무변경. resolver 의미론과 close-시 auto-ship은 상위 스펙에서 기각됨.
- external 의존 상태의 UI 표시(카드 badge 등)는 범위 밖.
- detached 배포는 성공 경로 끝에서만 launch되므로 ship 실패로 정지하면 배포도
  실행되지 않는다. `parent_close` 실패에 이미 있던 성질이고 창이 한 단계
  넓어질 뿐이라 새 방어를 넣지 않되 리스크로 기록한다. `[정리]` 재클릭이
  배포까지 재실행한다.
- 사용자 수동 `bd close` 경로는 여전히 bd-usage 지침으로만 완화된다(상위 스펙
  잔여 리스크 승계).

## 수용 기준

1. `CLEANUP_STEPS`가 `ship_exported_capabilities`를 `parent_close` 뒤에
   포함하고, 서버·프론트엔드·테스트의 단계 목록이 같은 순서를 기술한다.
2. `export:` 라벨을 가진 Bead가 워커 머지 클릭으로 닫히면 `provides:` 라벨이
   발행되고 readback으로 확인된다.
3. ship 실패 시 bd는 `closed`로 남고, lane은 `pr_wait`에 머물며,
   `cleanup_failed`가 `step: 'ship_exported_capabilities'`와 잔여 capability
   목록을 기록한다.
4. `[정리]` 재클릭이 이미 closed인 parent·자손의 `export:` 라벨을 다시 열거해
   ship을 완주시킨다.
5. Pre-Handoff Validation 5종이 모두 통과하고 `app/main.bundle.js`가 갱신
   커밋에 포함된다.
