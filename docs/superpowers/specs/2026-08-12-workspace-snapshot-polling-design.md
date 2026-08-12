# Workspace snapshot 기반 Dolt polling 재설계

## 배경

운영 `beads-ui`는 `poll_interval_seconds = 30`으로 실행 중이다. Board, Worker,
Monitor는 각자 필요한 subscription과 cache를 갱신하며 매 `runBdJson()` 호출마다 새
`bd` child를 spawn한다. Dolt server mode의 각 `bd` process는 자기 `sql.DB` pool을
열고 command 종료 시 닫으므로 `127.0.0.1:13307`에 짧은 TCP connection을 반복해서
만든다.

현장 실측은 다음과 같다.

- 전체 TCP `TIME_WAIT`: 38,534개
- Dolt `127.0.0.1:13307` 대상 `TIME_WAIT`: 24,554개
- macOS high ephemeral port range: `32768-65535`
- 운영 Node process의 historical forks: 62,000개 이상

현재 한 workspace의 Board가 여섯 list subscription을 모두 non-empty로 갱신하면 일반
subscription의 list+provenance 두 호출과 blocked의 list+ready-explain+provenance 세
호출로 최대 13개 `bd` child를 만든다. Worker와 Board의 같은 key는 refresh collection
단계에서 dedupe되지만, 다른 key는 각각 실행된다. concurrent cold subscribe와
background refresh, timer refresh 사이에는 fetch-level in-flight 공유도 없다.

Monitor는 별도로 visible workspace마다 runnable 후보용 `bd list --status open`을
30초마다 실행한다. external PR poller는 whole-list `bd list --all --limit 0`을 실행한다.
이 fan-out이 ephemeral port 고갈의 직접 원인이다.

## 목표

1. workspace의 한 logical refresh generation이 기본 두 번의 `bd` read로 모든 list와
   monitor의 Beads-derived view를 만든다.
2. poll, watcher, mutation, cold/background subscribe가 같은 in-flight refresh를 공유한다.
3. refresh 중 mutation은 유실하지 않고 정확히 한 번의 trailing refresh로 합친다.
4. 기존 subscription payload, status, blocked, closed range, provenance, runnable 의미를
   보존한다.
5. partial failure가 empty snapshot이나 대량 delete로 바뀌지 않게 한다.
6. Beads core와 storage driver 경계를 변경하지 않는다.

## 비목표

- Beads CLI에 daemon, batch RPC, connection pool API를 추가하지 않는다.
- `server/bd.js`를 MySQL client로 바꾸거나 Dolt driver 내부를 직접 사용하지 않는다.
- `issue-detail`, mutation command, `gh` PR observation을 snapshot으로 대체하지 않는다.
- poll interval 확장이나 macOS sysctl 변경을 근본 해결로 사용하지 않는다.
- worker Codex transport를 App Server나 SDK로 변경하지 않는다.

## Snapshot coordinator

server process는 workspace root별 coordinator를 하나 유지한다. coordinator의 canonical
state는 다음 개념을 가진다.

- `generation`: 성공한 snapshot에만 증가하는 monotonic number
- `snapshot`: normalized issue rows, ID index, ready/explain 결과, derived indexes
- `in_flight`: 현재 두 command와 projection을 수행하는 Promise
- `pending_mutation`: in-flight 중 새 write/watcher evidence가 도착했는지 여부
- `request_epoch`: 시작 순서와 stale completion을 구분하는 fence
- `last_success_at`, `last_failure_at`, bounded retry/backoff state

한 generation은 workspace cwd에서 다음 두 command를 실행한다.

1. `bd list --json --tree=false --all --limit 0`
2. `bd ready --explain --limit 0 --json`

첫 command는 전체 status row, metadata, dependency edge, external PR metadata의 canonical
source다. 현재 운영 `bd 1.2.0-fork.1`에서 이 exact command를 직접 실행했을 때
`beads-ui` 562개 row 중 231개, dotfiles 1,618개 row 중 1,129개가 hydrated
`dependencies`를 포함했다. 두 번째 command만 readiness와 dependency-blocked 의미론의
source다. UI가 readiness algorithm을 재구현하지 않는다.

coordinator는 embedded dependency payload를 capability contract로 취급한다. 실제 CLI
boundary 검증에서 known dependency edge가 raw row에 실리지 않는 legacy binary가
발견되면 기존 batched `bd dep list`를 compatibility fallback으로 사용하고 그 workspace의
generation command count를 3으로 기록한다. current supported fork의 정상 경로는 두
command이며 synthetic fixture만으로 capability를 가정하지 않는다.

두 command가 모두 성공하고 payload normalization과 cross-reference validation을
통과해야 snapshot을 commit한다. 한쪽만 성공한 결과를 기존 snapshot과 섞지 않는다.
cross-reference는 `ready[].id`와 `blocked[].id` 같은 subject ID만 all rows에 존재하도록
요구한다. `blocked_by[].id`는 cross-rig external blocker나 local row가 없는 blocker를
유효하게 표현할 수 있으므로 all rows 부재를 허용하고 ID/reason을 그대로 보존한다.

`runBd`의 기존 global queue는 유지한다. coordinator는 process concurrency를 늘리는
것이 아니라 command 수와 redundant generation을 줄인다.

## Refresh 합치기

refresh cause는 최소 `cold-subscribe`, `background-subscribe`, `poll`, `watcher`,
`mutation`, `monitor`, `external-pr`로 구분한다.

- idle coordinator의 요청은 새 generation을 시작한다.
- in-flight 중 poll/background/monitor 요청은 기존 Promise에 join한다.
- in-flight 중 watcher나 성공한 Beads mutation evidence가 오면
  `pending_mutation=true`로 설정한다.
- 현재 generation 종료 뒤 `pending_mutation`이 있으면 flag를 지우고 정확히 한 번의
  trailing generation을 시작한다.
- 더 오래된 request epoch의 completion은 최신 state를 overwrite하거나 worker queue
  sweep에 사용하지 않는다.

cold initial subscription은 usable snapshot이 없고 refresh가 실패하면 기존 structured
error를 반환한다. warm/background/poll refresh 실패는 cached snapshot을 유지하고
delta를 publish하지 않는다. 반복 실패는 bounded backoff 동안 새 `bd` spawn을 막되,
새 mutation evidence는 backoff 뒤 trailing retry를 예약한다.

## Projection

raw snapshot과 client view projection을 분리한다. 각 projection은 기존 adapter fixture와
characterization test가 정의하는 의미를 보존한다.

- `all-issues`: 기존 default `bd list`가 포함하던 status category와 ordering/filter
  semantics를 fixture로 고정하여 `--all` raw rows에서 재현한다.
- `ready-issues`: `ready --explain`의 `ready` rows/IDs를 source로 한다.
- `blocked-issues`: raw rows의 stored `status=blocked`와 explain의 dependency-blocked를
  union하고 기존 `blocked_info.external`, dependency blockers, reason을 보존한다.
- `in-progress`, `resolved`, `deferred`: raw row status로 projection한다.
- `closed-issues`: raw closed rows에 기존 inclusive `since` filter를 적용하고 ordering을
  보존한다. 기존 `--closed-after` boundary fixture와 결과 parity를 검증한다.
- provenance: supported fork에서는 row에 포함된 `dependencies`의 `discovered-from`
  edge에서 `from_id`를 계산한다. malformed edge만 fail-quiet로 생략한다. capability
  boundary가 legacy binary를 판정한 workspace만 기존 batched `bd dep list` fallback을
  사용한다.

`issue-detail`은 `bd show` 전용으로 남긴다. list row가 detail payload와 같다고 가정하지
않는다. Beads mutation command도 기존 direct 실행을 유지하고 성공 뒤 coordinator에
mutation evidence를 전달한다.

한 snapshot이 commit되면 active `(workspace, spec)`별 projection과 registry delta를
계산한다. fetch는 workspace generation에 한 번이고 registry의 key별 serialization은
publish 순서와 subscriber isolation을 위해 유지한다.

## Monitor와 worker 재사용

### Runnable

Monitor runnable 후보는 raw all rows에서 기존 qualification을 그대로 적용한다.
현재 runnable lane은 `status=open`, workflow route/spec receipt/phase-child/label 조건을
보는 display-only 후보이며 readiness ID로 제한하지 않는다. `ready --explain` 결과를
새 필터로 추가해 사용자-visible 의미를 바꾸지 않는다.

별도 `runnable-cache`의 periodic `bd list --status open`은 제거하고 coordinator snapshot
projection으로 대체한다. queue lane exclusion과 monitor subscriber gate는 유지한다.

### External PR와 closed queue sweep

external PR registry가 필요로 하는 Beads metadata와 status map은 raw all snapshot에서
파생한다. `gh` observation과 PR state polling은 공유 대상이 아니며 기존 경로를 유지한다.

closed queue sweep처럼 stale status가 reopened bead를 잘못 이동시킬 수 있는 consumer는
stale-while-revalidate snapshot을 사용하지 않는다. 자기 refresh request 이후 성공한
최신 generation만 적용하고, 더 최신 mutation/generation이 시작됐으면 generation fence로
적용을 보류한다.

### Title decoration

현재 generation에 issue row가 있으면 title decoration은 snapshot index를 우선 사용할 수
있다. snapshot에 없는 ID와 detail-only 필드는 기존 title cache/direct fallback을
유지한다. 이 최적화는 title 의미를 바꾸지 않는 범위로 제한한다.

## Demand와 lifecycle

workspace refresh는 다음 demand가 하나 이상 있을 때만 주기 실행한다.

- active list subscription
- visible Monitor가 요구하는 runnable/external status
- worker external PR/closed sweep demand

연결된 WebSocket이 있지만 위 demand가 없는 경우 top-level poll tick은 `bd`를 실행하지
않는다. workspace가 hidden 되거나 마지막 demand가 사라져도 cached snapshot은 process
memory에 남길 수 있지만 새 periodic generation은 시작하지 않는다.

`poll_interval_seconds=30`은 이번 변경에서 유지한다. 근본 개선 효과는 interval을
늘려 얻지 않고 generation당 command 수와 overlap을 제거하여 얻는다. 배포 뒤 관측값이
필요하면 별도 운영 결정으로 interval을 조정한다.

## 오류와 stale 정책

- all command 실패: 새 generation 미적용, warm snapshot 유지
- ready explain 실패: 새 generation 미적용, ready/blocked만 부분 교체 금지
- malformed payload/subject cross-reference: 새 generation 미적용, structured log;
  external/missing blocker row 자체는 오류가 아님
- cold 상태의 실패: subscriber에 existing `bd_error` 계열 반환
- warm 상태의 실패: delta/delete 미발행, retry backoff
- projection 하나의 예외: 해당 generation 전체를 버리지 않고 해당 subscription publish만
  실패시키되 snapshot은 유지; deterministic projection defect는 test failure로 취급
- workspace generation mismatch: old completion 폐기

log는 workspace, cause, generation, join/trailing 여부, 두 command duration과 exit status,
projection count를 남긴다. issue body나 credential-bearing config는 기록하지 않는다.

## 배포와 운영 검증

canonical repo에서 검증과 PR/landing을 완료한 뒤 managed deploy adapter가 exact candidate
release를 설치한다. 운영 service는 `bdui-shared` owner를 통해 restart하고 다음을
read back한다.

- process executable과 release path
- bind address와 port
- HTTP response
- active workspace 하나의 poll generation log/command count
- Dolt `127.0.0.1:13307` TIME_WAIT count와 30초 단위 증가량

기존 TIME_WAIT는 macOS `net.inet.tcp.msl=15000` 환경에서 새 연결 생성이 멈춘 뒤 시간이
지나야 배수된다. 배포 직후 absolute count만으로 실패를 판정하지 않고, 최소 60초 동안
새 증가율과 안정화를 함께 본다. sysctl이나 port range는 변경하지 않는다.

## Test scope

### RED→GREEN seam 1: workspace single-flight

- 같은 workspace의 concurrent cold subscribe, background refresh, poll이 두 base command를
  한 번씩만 실행하는 실패 테스트를 먼저 추가한다.
- 다른 workspace는 서로 독립 generation을 갖는 기존 isolation을 보존한다.
- in-flight 중 mutation burst가 정확히 한 trailing generation만 만드는 테스트를 추가한다.

### RED→GREEN seam 2: atomic snapshot과 failure

- all/ready 중 하나가 실패하면 warm registry에 delete/upsert가 발행되지 않고 이전
  snapshot이 유지되는 테스트를 추가한다.
- cold failure가 structured error를 반환하는 테스트를 추가한다.
- stale completion과 newer mutation의 generation fence를 검증한다.

### RED→GREEN seam 3: projection parity

- 기존 adapter fixture를 raw all+ready snapshot fixture로 재사용해 all, ready, blocked,
  in-progress, closed range, resolved, deferred 결과가 동일함을 검증한다.
- stored+dependency blocked union과 `blocked_info`를 고정한다.
- external 또는 missing `blocked_by` ID가 all rows에 없어도 generation이 성공하고 blocker
  ID/reason이 보존되는 fixture를 추가한다.
- current installed `bd`를 통과하는 runner-boundary contract probe에서 whole-list row의
  known `discovered-from` edge를 확인한다. supported path에서는 embedded provenance가 기존
  batch `bd dep list` 결과와 같고 별도 dep command를 실행하지 않음을 검증한다.
- embedded dependency capability가 없는 legacy CLI fixture에서는 batched dep fallback을
  정확히 한 번 실행하고 provenance parity를 유지함을 검증한다.

### RED→GREEN seam 4: Monitor/worker reuse

- Board+Worker+Monitor가 같은 workspace에서 활성화된 poll generation이 detail, `gh`, write를
  제외하고 supported fork에서 기본 두 `bd` child만 실행하는 integration test를 추가한다.
- runnable 의미와 visible/hidden subscriber gate를 보존한다.
- external PR status와 closed sweep이 fresh fenced generation을 사용하고 추가 whole-list
  scan을 만들지 않는 테스트를 추가한다.

### RED→GREEN seam 5: managed runtime

- focused server tests, full test/lint/typecheck/format/build gate를 통과한다.
- exact candidate deploy 후 service path/HTTP와 generation command count를 확인한다.
- 배포 전후 같은 관측 창의 Dolt TIME_WAIT 증가율이 유의하게 감소하는지 확인한다.

### 제외

- Beads CLI/driver test나 schema migration은 추가하지 않는다.
- 실제 GitHub API 상태를 network fixture 없이 검증하지 않는다.
- macOS kernel networking 설정을 변경하지 않는다.

## 완료 조건

1. 한 workspace의 정상 refresh generation은 기본 두 `bd` read로 모든 list와
   Beads-derived Monitor/worker view를 만든다.
2. concurrent/overlapping refresh가 duplicate generation을 만들지 않는다.
3. partial failure가 empty snapshot이나 대량 delete를 만들지 않는다.
4. 기존 subscription과 monitor semantics가 fixture parity를 유지한다.
5. managed release 배포 뒤 서비스가 정상이고 Dolt TIME_WAIT 생성률이 감소한다.
6. Beads core에는 변경이 없다.
