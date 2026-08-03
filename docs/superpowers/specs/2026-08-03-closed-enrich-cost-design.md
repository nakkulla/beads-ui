# closed 이슈 enrich 비용·'전체' 범위 절단 정리 — staleness 프로브 생략과 `--limit 0`

- Bead: UI-meft · Route: spec_backed · Base: main
- 작성일: 2026-08-03

## 배경 (측정 근거, 2026-08-03, workspace=dotfiles, closed 1493개)

UI-b6qs가 범위 뷰(today/7d/30d)의 비용을 `--closed-after` 푸시다운으로
해소한 뒤, 남은 후속 3건(UI-z23t·UI-meft·UI-ojs3)의 통합 가능성을 검토하다
원인이 셋 중 어디에도 정확히 적혀 있지 않다는 것을 실측으로 확인했다.

범위별 `fetchListForSubscription` 소요:

```
today   =  263ms (3건)
30d     = 2123ms (298건)
전체    = 6081ms cold / 3579ms warm (1000건)
```

1000건 기준 내역:

```
bd list                =  173ms
enrichIssuesWorkflow   = 3437ms (cold) / 1085ms (warm)   ← execFileSync 동기, 이벤트 루프 블록
bd dep list (1000 ids) = 2408ms                          ← 비동기
```

**enrich warm 1085ms 중 약 930ms는 영수증 보유 이슈 85건의 git 프로브다.**
`spec_review`/`impl_review` 키를 제거하고 같은 1000건을 enrich하면 1085ms →
157ms로 떨어진다(2회 측정, 157/152ms). `computeStaleWithHead`
(`server/workflow-enrich.js:330`)는 영수증이 있는 이슈에만 `pathChangedSince`
(`git log <sha>..HEAD -- <path>`)와 `implFreshness`(`git status --porcelain` +
`git log` + merge-base)를 돌리는데, `implFreshness`는 워크트리 커밋이 공유
HEAD를 움직이지 않는다는 이유로 캐시를 의도적으로 우회하므로 warm에서도
비용이 줄지 않는다. `poll_interval_seconds = 30`이라 이 블로킹이 클라이언트
접속 중 30초마다 반복된다.

`bd list` 변형 실측:

```
--limit 1000                      = 173ms, 1000건, 임의 순서
--sort closed --limit 1000        = 185ms, 1000건, 최신순(head 2026-08-03)
--limit 0                         = 194ms, 1493건 전부
```

즉 절단 문제의 bd 쪽 비용은 사실상 없다.

## 문제

**1. 정확성 — '전체'가 전체가 아니다.** `--limit 1000`이 1493건 중 493건을
자른다. 반환 순서가 `closed_at` 기준이 아니라 임의라(첫 3건의 `closed_at`이
3/28, 8/3, 7/30) 어느 493건이 빠졌는지 알 수 없고, UI에 절단 표시도 없다.
"전체"라고 적힌 뷰가 3분의 1을 말없이 빼먹는다.

**2. 비용 — 완료된 일의 staleness를 계속 다시 계산한다.** 이미 머지되어
`closed`된 bead의 `impl_stale`은 리뷰 영수증 이후 같은 파일을 건드리는 후속
커밋이 쌓이면 당연히 참이 되는 값이다. 사용자가 취할 수 있는 행동이 없는
표시에 30초마다 약 1초씩 이벤트 루프를 막고 있다.

## 변경 1 — `closed` bead는 staleness 프로브를 생략한다

`enrichIssueWorkflow`(`server/workflow-enrich.js:552`)에서 `status`가
`'closed'`일 때 세 개의 git 프로브를 모두 생략한다:

| 프로브 | 호출부 | 실제 git 명령 | 생략 시 값 |
| --- | --- | --- | --- |
| `pathChangedSince` (spec) | `computeStaleWithHead:336` | `git log <sha>..HEAD -- <spec_id>` | `spec_stale = false` |
| `implFreshness` (impl) | `computeStaleWithHead:339` | `git rev-parse --verify --quiet refs/heads/<bead_id>` + `git merge-base --is-ancestor` | `impl_stale = false` |
| `planFreshness` (plan) | `planStage:484` | `git status --porcelain -- <plan_path>` + `git log <sha>..HEAD -- <plan_path>` | `stale = false` |

- **영수증 파싱은 유지한다.** `parseReceipt`/`parsePlanReceipt`는 문자열
  파싱이라 비용이 없고 `classifyGlyph`의 glyph 표시에 필요하다. `closed`
  카드에서 사라지는 것은 stale 마커 하나뿐이고 route·PR·glyph·labels 칩과
  스테퍼 채움은 그대로다.
- **`resolved`는 제외한다.** 아직 머지 전이라 staleness가 실제로 행동을
  유발하는 정보다. 가드 조건은 `status === 'closed'` 단독이며
  `status === 'resolved' || status === 'closed'` 형태로 확장하지 않는다.
- 구현 형태: `computeStaleWithHead`에 `status` 파라미터를 추가하고
  `enrichIssueWorkflow`가 이미 보유한 `status`(`:554`)를 넘긴다. `planStage`는
  이미 `status`를 받으므로(`:470`) 시그니처 변경 없이 내부에서 분기한다.
- 공개 래퍼 `computeStale`(`workflow-enrich.js:351`)은 런타임 소비자가 없고
  `workflow-enrich.test.js`만 호출한다(전수 확인). 선택적 `status` 파라미터를
  끝에 추가하되 기본값(미전달)에서 기존 동작을 유지해 기존 테스트를 무수정으로
  통과시킨다.

효과(실측 근거): 1493건 enrich가 180ms로 떨어진다. 이벤트 루프 블록이
사실상 소멸한다.

## 변경 2 — `closed-issues`는 `--limit 0`

`mapSubscriptionToBdArgs`(`server/list-adapters.js:48-67`)의 `closed-issues`
케이스에서 `--limit 1000`을 `--limit 0`(무제한)으로 바꾼다. `--closed-after`
푸시다운은 그대로 둔다.

`params.since` 유무와 무관하게 조건 없이 적용한다. 지금은 30d가 298건이라
범위 뷰가 상한에 닿지 않지만, 상한이 남아 있는 한 같은 조용한 절단이 다른
범위에서 재발할 수 있고 `--limit 0`이 1493건에 194ms라 상한을 남길 이유가
없다. `--sort closed`로 최신순 상한을 유지하는 대안은 '전체'라는 레이블과
실제 동작의 불일치를 그대로 두므로 채택하지 않는다.

다른 구독 타입(`blocked-issues`, `ready-issues`, `resolved-issues`,
`deferred-issues`)의 `--limit 1000`은 건드리지 않는다. 이번 검토의 측정
근거가 없는 범위다.

## 표시 결과 의미론

- `closed` 카드에서 stale 마커가 사라진다. dotfiles 기준 closed 1493건 중
  영수증 보유 86건이 프로브 대상이지만, **실제로 stale 마커가 떠 있는 카드는
  14건**(spec 13 · plan 1 · impl 0)이다. impl이 0인 이유는 머지 후 bead ID
  브랜치가 삭제되어 `implFreshness`가 `unknown`(= stale false)을 반환하기
  때문이다 — 즉 impl 프로브 비용은 판정값이 아니라 `git rev-parse` 프로세스
  기동 자체다. 30초마다 약 930ms를 쓰는 대가로 얻는 표시가 14건이다.
- '전체' 범위가 1493건 전부를 표시한다. 잔여 소요는 약 4.2초이며 그중
  3864ms는 provenance용 `bd dep list`(비동기, 다른 구독을 막지 않음)다.
  기본 범위가 `today`(263ms)이므로 첫 로딩 경로는 영향받지 않는다.

## 범위 밖

- **provenance `bd dep list` 비용**(1493건 3864ms). 줄이려면 `closed`
  카드의 `↩ from` 칩을 포기해야 하는데, 출처는 완료된 일에도 유효한 정보라
  staleness와 같은 논리로 버릴 수 없다. 별개 판단이므로 이번 범위에서 뺀다.
- **UI-z23t** (`runGit` 비동기 전환). 총 비용을 줄이지 않고 블로킹만 옮기며,
  블로킹의 86%는 변경 1로 사라진다. close 처분한다.
- **UI-ojs3** (자정 롤오버). `params.since`가 구독 시점에 고정되어 자정 이후
  'today' 열에 어제 항목이 남는다. 데이터 누락은 없고(오늘 닫힌 항목은
  `closed_at >= 어제 00:00`이라 그대로 표시된다) 새로고침·워크스페이스
  전환·범위 변경으로 자동 교정된다. 근본 해법(서버가 상대 범위 해석)은
  현재 브라우저 로컬 자정 기준이 정확한 자리에 타임존 불일치 리스크를
  새로 만든다. p4로 강등해 남긴다.

## Test scope

RED → GREEN 시맨틱 seam. 세 staleness seam 모두 **현재 구현에서 `stale ===
true`가 관측되는 fixture**를 만든 뒤 가드로 `false`로 뒤집는 형태다 — 값이
이미 `false`인 fixture(예: bead 브랜치가 삭제된 전형적 closed bead)로는 공허한
RED가 되므로 쓰지 않는다. fixture는 기존 테스트가 쓰는 실제 임시 git repo
헬퍼(`makeRepo`/`commitAll`/`git`)를 재사용한다.

1. **spec_stale** (`server/workflow-enrich.test.js`) — repo에 spec 파일을
   커밋해 receipt SHA를 잡고, 같은 파일을 한 번 더 커밋한다.
   `enrichIssueWorkflow({ status: 'closed', metadata: { spec_id, spec_review } })`
   가 현재 `stages.spec.stale === true`, 변경 후 `false`.
2. **impl_stale** (`server/workflow-enrich.test.js`) — 커밋 후 bead ID와 같은
   이름의 브랜치(`UI-1`)를 만들고 그 위에 커밋을 하나 더 올린다.
   `enrichIssueWorkflow({ id: 'UI-1', status: 'closed', metadata: { impl_review } })`
   가 현재 `stages.impl.stale === true`, 변경 후 `false`. 브랜치를 살려 두는
   fixture여야 하는 이유는 위 「표시 결과 의미론」에 적은 대로 브랜치가 없으면
   현재 구현도 이미 `false`이기 때문이다.
3. **plan stale** (`server/workflow-enrich.test.js`) — `route: 'full_plan'`
   (`plan_path` + `plan_review`)로 plan 파일을 receipt 이후 커밋한다.
   `stages.plan.stale`이 현재 `true`, 변경 후 `false`.
4. **`--limit 0`** (`server/list-adapters.test.js`) —
   `mapSubscriptionToBdArgs({ type: 'closed-issues' })`의 args에 `--limit 0`이
   포함되고 `--limit 1000`이 없다. (현재 구현은 `1000`을 내보내므로 비공허
   RED.)

회귀 가드 (RED 아님 — 불변 보증):

- seam 1~3과 동일한 fixture에서 `status: 'resolved'`로 바꾸면 세 stale이 모두
  `true`로 유지된다 — 가드가 `closed`에만 걸렸음을 보증한다.
- `closed` + 영수증 → glyph(`stages.impl.glyph`)와 route/PR 칩이 보존된다.
- `mapSubscriptionToBdArgs({ type: 'closed-issues', params: { since } })` →
  `--limit 0`과 `--closed-after`가 공존하고 경계값이 `since - 1000ms`의
  RFC3339로 유지된다.
- 다른 구독 타입의 args 불변(`--limit 1000` 유지).
- `computeStale` 기존 호출 형태(status 인자 없음)의 동작 불변 —
  `workflow-enrich.test.js` 기존 케이스가 무수정 green.

## 검증

- `npm run lint` / `npm run tsc` / `npm test` / `npm run prettier:write`
- `npm run build` — 서버 전용 변경이므로 `app/main.bundle.js` 무변화를 확인
  한다. 변화가 있으면 프론트엔드 오염이므로 조사한다.
- 실측 재확인(workspace=dotfiles): '전체' 범위 `fetchListForSubscription`이
  1493건을 반환하고, enrich 구간이 200ms 미만인지 확인한다.

머지 후 마감(AGENTS.md Post-Merge Runtime Validation, 순서 고정):

1. `~/.config/bdui/config.toml` 런타임 설정 정합 확인.
2. `bdui-shared restart`로 공유 서버 재시작.
3. 실행 중인 프로세스 경로(머지된 체크아웃 소유인지)·리스닝 포트·HTTP 응답을
   확인한 뒤에만 완료를 선언한다.

각 단계는 다음 단계 전에 결과를 확인한다. 중간에 멈추면 이전 단계까지의 상태가
그대로 유지되므로(설정 확인은 읽기 전용, 재시작은 멱등) 재개는 1번부터 다시
밟으면 된다.
