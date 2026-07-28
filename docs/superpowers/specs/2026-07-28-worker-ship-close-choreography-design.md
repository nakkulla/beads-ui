# 워커 머지 클릭 choreography에 capability ship 배선

- 날짜: 2026-07-28
- Bead: UI-4ii4
- 상위 계약: dotfiles `docs/superpowers/specs/2026-07-28-ship-close-choreography-design.md`
  (dotfiles-0gpe, close 완료 · `provides:ship-close-choreography` 발행됨)
- 상태: 설계 승인 완료 · spec 게이트 REVISE 반영 완료

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
closed 이슈만 받는다. (`--force`로 close 앞에 두는 대안은 기각한다 — close가
뒤이어 실패하면 `open` 이슈에 `provides:`만 발행된 허위 capability가 남고,
이는 이 스펙이 막으려는 사고보다 나쁘다.)

## 아키텍처

### 새 모듈 `server/worker/ship-capabilities.js`

```
shipExportedCapabilities({ bd, bead_ids })
  → { ok: true, removed?: string[] }
  | { ok: false, reason: string, detail?: string }
```

`pr-actions.js`(현재 1658행)에 인라인하지 않고 분리한다. 경계가 깨끗하고
(입력 = closed bead id 목록 + bd 어댑터, 출력 = ok 또는 실패 사유) 독립
테스트가 가능하다.

`bd` 의존은 세 함수다:

- `readIssue(id)` — 기존 어댑터 함수. 이미 fail-closed이고 `.labels`와
  `.metadata`를 담고 있으므로 `readLabels` 전용 함수는 만들지 않는다.
- `ship(capability)` — 신규.
- `removeLabel(id, label)` — 신규. 취소성 자손의 `export:` 라벨 제거용.

셋 중 하나라도 함수가 아니면 `{ ok: false, reason: 'ship_unavailable' }`을
반환한다. `sweepChildren`의 `child_sweep_unavailable`과 같은 규약이며, 능력
부재를 "할 일 없음"으로 읽지 않기 위한 것이다.

### bd 어댑터 확장 `server/worker/bd-metadata.js`

```
ship:        (capability: string) => Promise<{ status: string, issue_id: string|null }>
removeLabel: (bead_id: string, label: string) => Promise<void>
```

argv는 각각 `bd ship <capability> --json`, `bd label remove <id> <label>`
(둘 다 `bd --help`로 확인한 형태).
비영 exit는 throw(이 모듈의 모든 mutator 규칙), 페이로드가 읽을 수 없는
객체면 throw. 실측한 `bd ship` 반환 형태:

| 상황 | exit | payload |
| --- | --- | --- |
| 정상 발행 | 0 | `{capability, issue_id, status: "shipped"}` |
| 이미 발행됨 | 0 | `{capability, issue_id, status: "already_shipped"}` |
| `export:` 라벨 이슈 없음 | 1 | (에러 메시지) |

### 큐 스토어 확장 `server/worker/queue-store.js`

workspace 수준 ship 실패 레코드를 위해 `recordShipFailure(workspace, record)`와
그 해제를 추가한다. 저장 위치는 `recordLastDeploy`가 쓰는 workspace 수준
자리와 같고, 레인 멤버십과 무관하게 남는다는 성질도 같다 — 이유는 아래
"external 행" 절에 있다.

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

넓은 열거는 **이미 closed였던 자손**을 대상에 넣으므로, 그중 취소성 처분으로
닫힌 것을 걸러내는 일이 필수가 된다(다음 절).

## 취소성 처분 필터

상위 계약 §3.5는 canceled / out-of-scope / won't-do 처분으로 닫는 `export:`
라벨 Bead에 ship을 금지하고 `export:` 라벨 제거를 요구한다. 이 규칙은 이
경로에서 **parent에 대해서만** vacuous하고 **자손에 대해서는 실재한다**:

- parent: `runCleanup`은 PR이 실제로 머지된 뒤에만 실행되므로(클릭 머지 또는
  poller가 관측한 외부 머지) 정의상 성공적 완료다. `[폐기]`는 cleanup을 타지
  않는 별도 경로이며 status를 `open`으로 되돌리고 `pr_url`을 제거한다. 따라서
  parent가 취소성 close로 이 단계에 도달하는 경로는 없다.
- 자손: 그렇지 않다. phase child는 canonical 계약(dotfiles
  `docs/contracts/workflow.yaml`)의 `child_disposition` 키를 가지며 enum은
  `[active, deferred, out_of_scope, canceled]`다. parent 머지가 성공했다는
  사실은 자손의 처분을 바꾸지 않으므로, `out_of_scope`/`canceled`로 닫힌
  자손이 closed 상태로 열거에 포함될 수 있다.

따라서 각 Bead의 `metadata.child_disposition`으로 분기한다:

| disposition | ship | `export:` 라벨 | 비고 |
| --- | --- | --- | --- |
| 키 부재 | 발행 | 유지 | parent와 레거시 자손이 여기 해당 |
| `active` | 발행 | 유지 | |
| `out_of_scope` · `canceled` | **금지** | **제거 + readback** | 상위 계약 §3.5 |
| `deferred` | **금지** | 유지 | 미착수 작업이므로 발행은 허위, 라벨은 재개 시 필요 |

`deferred`가 §3.5의 명시 목록에 없는데도 ship을 막는 것은 fail-closed
선택이다 — 허위 capability 발행의 비용이 발행 지연의 비용보다 크다. 라벨을
제거하지 않는 것도 같은 이유로, 그 자손이 나중에 재개될 때 `export:`가
필요하다.

라벨 제거는 결과의 `removed[]`로 보고되어 실행 로그에 남는다. 제거 후
`readIssue` readback으로 `export:`가 실제로 사라졌는지 확인하며, 남아 있으면
`export_removal_failed:<id>:<cap>`로 실패 처리한다.

## ship 흐름 (2단계)

한 Bead씩 읽고 곧바로 ship하는 단일 패스는 첫 실패 시점에 뒤쪽 Bead를 아직
읽지 못해 잔여 capability 전체를 보고할 수 없다. 상위 계약 §2와 수용 기준이
요구하는 "잔여 `export:` 라벨과 실패 사유 보고"를 만족하려면 **수집과 실행을
분리**해야 한다.

**1단계 — 수집.** 모든 bead id에 대해 `readIssue`를 돌려 작업 목록을 만든다.

```
각 id:
  issue = await bd.readIssue(id)          // throw → ship_read_failed:<id>
  caps  = issue.labels 중 'export:' 접두 → 접두 제거
  disp  = issue.metadata?.child_disposition
  각 cap:
    labels에 'provides:'+cap 있음                  → 건너뜀(이미 발행)
    disp가 out_of_scope | canceled                  → 제거 작업으로 분류
    disp가 deferred                                 → 건너뜀(보고만)
    그 외                                           → ship 작업으로 분류
```

수집 단계에서 실패하면 아직 읽지 못한 bead id를 **확인된 잔여 capability와
구분해서** 보고한다: `detail`은 `pending=<cap,...> unread=<id,...>` 형태다.
"남은 일을 안다"와 "남은 일을 모른다"를 같은 문자열로 뭉개지 않는다.

**2단계 — 실행.** 수집이 끝난 목록에 대해서만 실행한다.

```
각 제거 작업:
  await bd.removeLabel(id, 'export:'+cap)
  readback에 'export:'+cap 남아 있음 → 실패 export_removal_failed:<id>:<cap>

각 ship 작업:
  r = await bd.ship(cap)                  // throw → ship_failed:<cap>
  r.issue_id !== id                        → 실패 ship_target_mismatch:<cap>
  after = await bd.readIssue(id)
  after.labels에 'provides:'+cap 없음      → 실패 ship_readback_failed:<cap>
```

`issue_id` 대조를 두는 이유: `bd ship`은 capability 이름으로 워크스페이스
전체를 뒤져 대상 이슈를 고르므로, 라벨을 읽은 Bead와 다른 Bead를 ship할 수
있다. 계약상 capability는 유일하지만 그 가정이 깨진 순간을 조용히
통과시키지 않는다.

2단계는 첫 실패에서 즉시 정지하며, 이때 `detail`에는 목록이 이미 완전하므로
잔여 capability 전체가 실린다.

실패 사유 어휘:

| reason | 의미 |
| --- | --- |
| `ship_unavailable` | bd 어댑터에 `readIssue`/`ship`/`removeLabel`이 없음 |
| `ship_read_failed:<id>` | 수집 단계 `readIssue` throw (bd 장애 포함) |
| `ship_failed:<cap>` | `bd ship` 비영 exit / throw |
| `ship_target_mismatch:<cap>` | ship이 다른 이슈를 대상으로 잡음 |
| `ship_readback_failed:<cap>` | ship 후에도 `provides:` 라벨 부재 |
| `export_removal_failed:<id>:<cap>` | 취소성 자손의 `export:` 제거 미확인 |

`export:` 라벨이 하나도 없으면 no-op으로 `{ ok: true }`이다.

## cleanup 배선과 실패 처분

`CLEANUP_STEPS`에 `parent_close` 뒤로 `ship_exported_capabilities`를 추가한다
(서버 cleanup 6 → 7단계; 프론트엔드는 `merging`을 더해 7 → 8단계).
`runCleanup`에서:

```js
markStep(bead_id, 'ship_exported_capabilities');
const shipped = await shipExportedCapabilities({ bd: deps.bd, bead_ids: swept.closed_ids });
if (!shipped.ok) {
  return failShip(bead_id, shipped, base_sync, durable);
}
```

### durable(레인 보유) 행

기존 `failCleanup` 경로를 그대로 쓰되 `restore_bd`를 넘기지 **않는다**. 그것이
close 롤백 금지(상위 계약 §2 "ship 실패는 이미 수행된 close를 롤백하지
않되")의 구현이다.

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
choreography 주석 양쪽에 이 예외와 근거를 명시한다. 롤백하면 parent만
`resolved`이고 children은 `closed`인 반쪽 상태가 되어 더 나쁘다.

### external 행

`runCleanup`은 external PR 행에도 쓰인다(UI-7agi). external 행은 durable 레인
멤버가 아니라 `bd` 재스캔으로 매번 재구성되는 메모리 행이고, 그 소스는
`status=resolved` + `metadata.pr_url`이다. 따라서 **parent가 `closed`가 되는
순간 행 자체가 다음 스캔에서 사라진다**(`external-pr.js`의 full-replace 규칙).
`failCleanup`도 `inPrWait` 가드 때문에 external 행에는 `cleanup_failed`를
기록하지 않는다.

지금까지 이것이 문제가 아니었던 이유는 `parent_close`가 마지막 단계였기
때문이다 — close 뒤에 실패할 것이 없었다. ship을 그 뒤에 놓는 순간 external
경로에는 "머지·close는 끝났는데 ship만 실패했고, 행도 배너도 재시도 버튼도
없는" 침묵 구멍이 생긴다. 이 스펙이 막으려는 바로 그 사고 형태다.

처분: **workspace 수준 ship 실패 레코드**를 남긴다. `recordLastDeploy`가
workspace 수준 사실로 남는 선례와 같은 자리다.

```
store.recordShipFailure(workspace, {
  bead_id, reason, detail, pr_url, at
})
```

- 워커 탭에 배너로 표시하며, 문안은 수동 복구를 안내한다 —
  `bd -C <workspace> ship <capability>` 실행 후 `provides:` readback.
- 다음 성공적인 ship 단계(같은 bead_id의 재실행 포함)가 이 레코드를 지운다.
- external 행은 이미 사라진 뒤이므로 `[정리]` 버튼 재시도는 제공하지 않는다.

리뷰어가 제안한 대안 — external registry에 closed 이후에도 행을 overlay해
`[정리]` 재시도를 살리는 방식 — 은 채택하지 않는다. external 행의 수명 규칙
(`resolved` + `pr_url`인 동안만 존재)을 바꾸는 것은 UI-7agi 계약의 변경이고
본 유닛의 위임 범위를 넘는다. 침묵을 없앤다는 요구는 workspace 수준 레코드와
배너로 충족되며, 자동 재시도 부재는 아래 잔여 리스크로 기록한다.

파일 상단 주석의 cleanup 순서 요약(`... → parent bd close → bead
done(merged)`)도 새 단계를 포함하도록 갱신한다.

## 프론트엔드

`app/views/worker/index.js`의 `MERGE_STEPS`에 `parent_close` 뒤로
`{ step: 'ship_exported_capabilities', label: 'capability 발행' }`을 추가한다.
`mergeStepView`는 배열 길이 기반이므로 카운터는 자동으로 8단계가 된다.

같은 파일의 "seven steps" / "six `CLEANUP_STEPS`" 주석과 `4/7` 예시를 새
숫자로 갱신한다.

workspace 수준 ship 실패 배너를 추가한다 — bead_id, 실패 사유, 잔여
capability, 수동 복구 명령을 담는다.

## 테스트

신규 `server/worker/ship-capabilities.test.js`:

- `export:` 라벨이 없으면 ship을 호출하지 않고 ok를 반환한다
- `export:` 라벨 하나를 ship하고 `provides:` readback으로 확인한다
- `provides:`를 이미 가진 capability는 ship하지 않는다
- parent와 자손 여러 개의 capability를 모두 ship한다
- `child_disposition=canceled` 자손은 ship하지 않고 `export:` 라벨을 제거한다
- `child_disposition=out_of_scope` 자손도 같은 처분을 받는다
- `child_disposition=deferred` 자손은 ship도 라벨 제거도 하지 않는다
- `child_disposition` 키가 없는 Bead는 ship한다
- `export:` 제거 후에도 라벨이 남으면 `export_removal_failed:<id>:<cap>`
- 수집 단계 `readIssue` throw → `ship_read_failed:<id>`, `detail`이 확인된
  잔여 capability와 unread bead id를 구분해 담는다
- `bd.ship` throw → `ship_failed:<cap>`, `detail`에 잔여 목록 전체
- ship 후 `provides:` 부재 → `ship_readback_failed:<cap>`
- ship이 다른 이슈를 잡으면 `ship_target_mismatch:<cap>`
- `bd.ship`/`bd.removeLabel` 부재 → `ship_unavailable`

기존 갱신:

- `server/worker/bd-metadata.test.js` — 신규 `ship`/`removeLabel` 어댑터
  계약: 정확한 argv, 비영 exit throw, `--json` 페이로드 파싱,
  읽을 수 없는 페이로드 throw
- `server/worker/pr-actions.test.js` —
  `CLEANUP_STEPS` 순서 기대치; ship 실패 시 `cleanup_failed.step`과 **bd가
  `closed`로 남는지**(restore 미호출); ship 성공 시 done 이동; **이미 closed인
  parent·자손 상태에서 첫 ship 실패 후 `[정리]` 재실행이 전체 capability를
  발행하는 통합 케이스**(수용 기준 4); external 행에서 ship 실패 시
  `recordShipFailure`가 남고 `cleanup_failed`는 남지 않는 케이스
- `server/worker/queue-store.test.js` — `recordShipFailure` 기록·해제와
  workspace 수준 지속성(레인 멤버십과 무관)
- `app/views/worker/index.test.js` — 단계 목록·카운터, ship 실패 배너

검증: `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
`npm run build`(번들 동봉).

## 비범위와 잔여 리스크

- fork bd 무변경. resolver 의미론과 close-시 auto-ship은 상위 스펙에서 기각됨.
- external 의존 상태의 UI 표시(카드 badge 등)는 범위 밖.
- external 행의 ship 실패는 배너와 workspace 레코드로만 노출되고 버튼 재시도가
  없다 — 복구는 수동 `bd ship`이다. external 행 수명 규칙(UI-7agi)을 바꾸지
  않기로 한 결과이며, 필요해지면 별도 유닛으로 다룬다.
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
3. `child_disposition`이 `out_of_scope`/`canceled`인 자손은 ship되지 않고
   `export:` 라벨이 제거되며, `deferred`인 자손은 ship도 라벨 제거도 되지
   않는다.
4. durable 행의 ship 실패 시 bd는 `closed`로 남고, lane은 `pr_wait`에 머물며,
   `cleanup_failed`가 `step: 'ship_exported_capabilities'`와 잔여 capability
   목록을 기록한다. 수집 단계 실패는 확인된 잔여와 unread bead id를 구분해
   보고한다.
5. external 행의 ship 실패 시 workspace 수준 ship 실패 레코드가 남고 배너가
   수동 복구 명령을 안내한다.
6. `[정리]` 재클릭이 이미 closed인 parent·자손의 `export:` 라벨을 다시 열거해
   ship을 완주시킨다 (통합 테스트로 고정).
7. Pre-Handoff Validation 5종이 모두 통과하고 `app/main.bundle.js`가 갱신
   커밋에 포함된다.
