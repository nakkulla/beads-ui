---
scope:
  - generated/contracts/quick-fix-handoff.json
  - generated/contracts/quick-fix-handoff.provenance.json
  - server/worker/quick-fix-handoff.js
  - server/worker/quick-fix-handoff.test.js
  - server/worker/quick-fix-handoff.cross-runtime.test.js
  - server/worker/__fixtures__/quick-fix-handoff-cases.json
  - server/worker/operation-recovery.js
  - server/worker/operation-recovery.test.js
  - server/workflow-enrich.js
  - server/workflow-enrich.test.js
  - server/list-adapters.js
  - server/worker/runnable-cache.js
  - app/protocol.md
---

# UI-o7ly — quick_fix 핸드오프 계약 핀 사본 재발행과 소비자 정렬

## 0. 배경과 소유권 경계

이 저장소의 핀 사본 `generated/contracts/quick-fix-handoff.json`은 dotfiles
`0220a0b58a488581e06edf1530aba154695f82e9`(2026-08-25)에 핀되어 있고, 그 뒤
dotfiles 정본 `docs/contracts/workflow-state.yaml`이 여덟 번 바뀌었다. 판정에
닿는 변화는 둘이다.

- `c42fb5216`(08-28): `checks.predecessor_edge` 신설 — `검증 bundle`·`선행 의존`
  절의 `선행` 줄에 적힌 Bead ID가 그 Bead의 `blocks` 의존으로 걸려 있는지.
- `50725430b`(09-22): `checks.baseline_red.line_regex`를
  `command=<명령> | base=<40hex> | exit=<정수>` 세 칸 형태만 인정하도록 좁힘.
  자리표시자(`<`로 시작)와 누락 필드를 거부한다.

그 결과 어긋난 것은 셋이다.

1. `server/worker/operation-recovery.js`의 `repairHandoffDescription()`이 만드는
   복구 인계 본문의 `- baseline_red: command=<script> --mode <mode> @ <sha>` 줄을
   정본 checker가 인정하지 않는다. Worker가 만드는 `type=bug` 수정 Bead는 정본
   `check-quick-fix-handoff.py`에서 `missing=[baseline_red]`로 떨어지고, ADR
   UI-a5l2-3이 UI-3vvi-2에서 승계한 "checker 통과 뒤 route·영수증"의 전제가
   깨진다. 저장소 테스트 `operation-recovery.test.js`는 낡은 핀 사본의 느슨한
   정규식으로 대조하므로 잡지 못했다.
2. JS 판정기 `server/worker/quick-fix-handoff.js`는 `predecessor_edge`를 모른다.
   워커·모니터의 `missing` 툴팁이 정본과 다른 목록을 낸다(표시 누락, fail-quiet).
3. cross-runtime parity 픽스처가 옛 `baseline_red` 형식을 담고 있어 정본 checker
   대조 2건이 red였다. 이것은 UI-7nhi 승계 세션이 픽스처 5곳을 측정 형태로 고쳐
   이미 닫았다(`6f77781203faad59bf628ee81aae9459cc3f7ee9`); 두 케이스가 검사하는
   것은 섹션 경계 파싱이고 그 의도는 그대로다. 이 spec은 그 사실만 기록한다.

같은 드리프트를 UI-4rpu 세션(UI-ctff)과 UI-7nhi 승계 세션(UI-o7ly)이 1분 차로
각각 발견했다. 설계 하나에 Bead 하나이므로 UI-o7ly가 남고 UI-ctff는 중복
close다(사용자 결정 2026-09-22). UI-ctff 본문의 고유 항목 — 새 투영 키의 소비
경계(§2.3), 픽스처 의도(위 3) — 는 이 spec이 흡수한다.

소유권: beads-ui는 계약 소비자이지 정의자가 아니다(AGENTS.md, ADR 0012). 어휘와
술어는 dotfiles 정본 바이트를 그대로 받고, 이 저장소는 그 바이트를 읽는 코드와
그 술어로 판정되는 본문을 만드는 코드만 고친다. dotfiles 쪽 변경은 없다.

## 결정

| 결정 | 값 |
| --- | --- |
| 재핀 | 핀 사본과 provenance를 구현 시점의 dotfiles `origin/main` 정본 exact blob으로 올린다. 게시 시점 관측값은 §2.1; 구현이 다시 읽어 그 시점 값을 쓴다 |
| 새 투영 키 | `automatic_queue_handoff`·`session_owned_pin`(값 변경)·`description_scope.writer`(값 변경)·`metadata.parent_keys`·`process_routes`·`manual_merge_continuation`은 바이트로 실리되 **읽는 코드가 없다(불활성)**. reader를 새로 만들지 않는다 |
| 복구 인계 `baseline_red` | 재현을 다시 돌리지 않는다. `code_defect`는 같은 `target_sha`·blob·mode에서 같은 fingerprint로 두 번 재현된 뒤에만 서므로 operation 기록 자체가 측정 기록이다. `command=`는 런너가 실제로 돌린 것(프로토콜 env 세 개 + `script_path`), `base=`는 `target_sha`, `exit=`는 `operation.exit_code` |
| 정수 exit 전제 | `classifyOperationRecovery`의 `code_defect` 술어에 `Number.isInteger(operation.exit_code)`와 `target_sha`가 40hex라는 조건을 더한다. 신호로 죽어 exit가 없는 재현은 측정 기록이 아니므로 `code_defect`가 아니라 기존 사다리의 `unknown_error` 대기로 남는다 |
| `predecessor_edge` JS 판정 | 옮긴다. `judgeQuickFixHandoff`가 선택적 resolver를 받아 워크스페이스 스냅샷 범위에서만 다른 Bead를 해석하고, resolver가 없거나 해석되지 않는 ID는 계약의 `unresolved_candidate=skip_fail_quiet` 그대로 건너뛴다. 동기 자식 프로세스는 띄우지 않는다(ADR 0043) |
| 드리프트 검사 | cross-runtime 테스트 파일에 핀 사본 바이트 ≠ 로컬 dotfiles 체크아웃 HEAD의 정본 바이트면 실패하는 검사를 둔다. dotfiles 체크아웃이 없으면 skip |
| 복구 본문의 정본 대조 | cross-runtime 테스트가 `repairHandoffDescription()` 산출 본문을 정본 checker에 넣어 `missing=[]`를 확인한다. `operation-recovery.test.js`의 핀 사본 정규식 대조는 유지한다(재핀 뒤에는 엄격한 정규식이 된다) |

## 1. 정본과 핀 사본의 차이(재핀 delta)

`git -C <dotfiles> diff 0220a0b58 origin/main -- generated/contracts/quick-fix-handoff.json`
기준.

| 키 | 변화 | 이 spec의 처리 |
| --- | --- | --- |
| `quick_fix_handoff.checks.baseline_red.line_regex` | 세 칸 측정 형태로 좁힘 | JS는 `new RegExp(line_regex)`로 그대로 읽는다. 복구 본문 생성기를 맞춘다(§3) |
| `quick_fix_handoff.checks.predecessor_edge` | 신설 | JS 판정 추가(§4) |
| `quick_fix_handoff.automatic_queue_handoff` | 신설 | 불활성. 세션 측 절차이며 beads-ui는 그 결과(큐 배치)를 기존 place API로 받을 뿐이다 |
| `quick_fix_handoff.session_owned_pin` | 값 변경 | 불활성. reader 없음 |
| `description_scope.writer` | 값 변경 | 불활성. `parseDescriptionScope`는 `section`·`item` 규칙만 읽는다 |
| `metadata.parent_keys.worker_created_from` | 신설 | 불활성. 이 저장소는 UI-j10d가 코드 registry로 이미 소비한다(ADR 0012 방식) |
| `process_routes.quick_fix.worker_dispatch` | 신설 | 불활성. 해당 동작은 ADR 0019·0031·0050이 이미 정한 코드 경로다 |
| `manual_merge_continuation.auto_review_dispatch` | 신설 | 불활성. ADR 0019 |

`schema_version`은 1 그대로다. `loadQuickFixHandoff`의 `rules`는
`quick_fix_handoff`·`description_scope` 객체 전체를 그대로 싣고 있으므로 새 키는
아무 배선 없이 따라온다. 읽는 코드가 없다는 것이 "불활성"의 정의다.

## 2. 재핀

### 2.1 값

게시 시점(2026-09-22, dotfiles `origin/main` = `e6586d6f29b96925c592162f46ba52b214fbefad`)
관측값:

```json
{
  "source_repo": "dotfiles",
  "source_path": "generated/contracts/quick-fix-handoff.json",
  "source_commit": "e6586d6f29b96925c592162f46ba52b214fbefad",
  "source_blob_sha": "77dd3a635c9a7e76128c37591715b92926e9712b",
  "sha256": "30459ee5e8d614505bc27aa97b995c4d043f2678869cdba185edca0d7c8dd32e",
  "bytes": 7854
}
```

구현 시점에 `origin/main`이 더 나아갔으면 그 시점 값을 쓴다. `source_commit`은
바이트를 읽은 `origin/main` 커밋이고, blob·sha256·bytes는 그 커밋의 파일에서
다시 계산한다(기존 세 핀과 같은 필드 집합).

### 2.2 절차

1. `git -C <dotfiles> fetch origin` 뒤 `git -C <dotfiles> rev-parse origin/main`.
2. `git -C <dotfiles> show origin/main:generated/contracts/quick-fix-handoff.json`의
   바이트를 그대로 `generated/contracts/quick-fix-handoff.json`에 쓴다(작업 트리
   사본이 아니라 git 객체에서 읽는다 — 로컬 dirty 편집이 섞이지 않는다).
3. `git -C <dotfiles> rev-parse origin/main:generated/contracts/quick-fix-handoff.json`
   으로 blob, `shasum -a 256`·`wc -c`로 sha256·bytes를 계산해 provenance를 쓴다.
4. `loadQuickFixHandoff()`가 `supported: true`를 내는지 단위 테스트가 확인한다
   (`provenanceMatches`가 blob 이름을 재계산하므로 잘못 베낀 provenance는 여기서
   걸린다).

### 2.3 `rulesUsable` 확장

`checks.predecessor_edge`가 **있으면** 다음이 모두 성립해야 `supported`다. 없으면
(더 낡은 핀) 그 검사 없이 지금처럼 `supported`다 — 정본 checker가 `if not rule:
return []`로 다루는 것과 같다.

- `sections`: 비어 있지 않은 문자열 배열
- `line_trigger`, `id_regex`: 비어 있지 않은 문자열
- `excludes`: 부재이거나 `'self_id'`
- `absent_mention`·`unresolved_candidate`: 정확히 `'skip_fail_quiet'`
- `required_edge.dependency_type === 'blocks'`,
  `required_edge.side === 'issue_dependencies'`,
  `reversed_edge.side === 'predecessor_dependencies_contain_issue'`
- `missing_tokens.missing`·`missing_tokens.reversed`: 비어 있지 않은 문자열

정본 checker는 모르는 토큰에서 `SystemExit`한다. JS의 대응은 `supported: false`
→ 모든 판정이 `state: 'unknown'`(fail-quiet)이며, 로더 단위 테스트가 그 핀을
막는다. 그 밖의 새 키(§1 불활성 목록)는 `rulesUsable`이 요구하지 않는다.

## 3. 복구 인계 본문의 `baseline_red` 줄

### 3.1 재료 출처

`classifyOperationRecovery`가 `local_code_defect`를 내는 조건은 이미 "같은
`target_sha`·script blob·mode에서 `script_failed`가 재시도 뒤 같은 fingerprint로
재현"이다(ADR UI-3vvi-2 §2, UI-a5l2-3 승계). fingerprint는
`code·exit_code·signal·log_digest`의 sha256이므로, 재현이 두 번 같은 exit로
끝났다는 사실이 operation 기록 안에 있다. 따라서 UI-ctff가 나열한 세 갈래 중
(a) 생성 시점 재실행은 불필요하고, (b) 줄 생략은 정본 `type=bug` 요건에
어긋나며, (c) 타입 변경은 UI-a5l2-3의 `type:bug` 조항을 뒤집는다. 답은 넷째 —
**기록을 그대로 적는다.**

| 칸 | 값 | 근거 |
| --- | --- | --- |
| `command=` | `REPO_OPS_TARGET_SHA=<target_sha> REPO_OPS_TARGET_BASE=<target_base> REPO_OPS_REPO_ROOT="$PWD" <script_path>` | 런너(`repo-operation-runner.js`)가 자식에 주는 프로토콜 env 세 개와 스크립트 경로. 옛 줄의 `--mode <mode>`는 git 파일 모드(`100755`)라 명령이 아니었다; blob·mode는 `출처/배경`의 `스크립트:` 줄에 남는다 |
| `base=` | `target_sha` | 스크립트가 돈 워크트리의 HEAD. `target_base`는 브랜치 이름, `effective_base_sha`는 정책 base라 둘 다 측정 지점이 아니다 |
| `exit=` | `operation.exit_code` | 런너 marker의 정수 종료 코드 |

생성 줄:

```
- baseline_red: command=REPO_OPS_TARGET_SHA=<target_sha> REPO_OPS_TARGET_BASE=<target_base> REPO_OPS_REPO_ROOT="$PWD" <script_path> | base=<target_sha> | exit=<exit_code>
```

정본 정규식의 `command=[^< \t]`는 첫 글자가 `<`가 아니어야 한다는 뜻이고, 이
줄의 첫 글자는 `R`이다. 인계받은 세션은 `target_sha` 체크아웃에서 이 명령을
그대로 돌려 같은 exit를 본다.

### 3.2 정수 exit 전제

`operation.exit_code`는 신호로 죽은 실행에서 `null`일 수 있다(런너 marker의
`exit_code?: number|null`). 그 경우 이 줄을 쓸 수 없고, 쓸 수 없는 본문으로
Bead를 만들면 coordinator가 `handoff_unreviewed:baseline_red`로 매 reconcile마다
같은 오류를 반복한다. 원인은 본문이 아니라 분류다 — exit 없는 재현은 측정
기록이 아니다. `classifyOperationRecovery`의 `code_defect` 분기에
`Number.isInteger(operation.exit_code)`와 `/^[0-9a-f]{40}$/.test(target_sha)`를
더한다(이미 `typeof target_sha === 'string'`은 본다). 조건을 못 채우면 기존
사다리대로 `unknown_error` 대기이며, 새 분류 키나 새 대기 어휘는 만들지 않는다.

### 3.3 테스트

- `operation-recovery.test.js` "meets the pinned section and baseline-red
  syntax"는 그대로 두되 재핀 뒤 엄격한 정규식이 된다. 생성 줄의 정확한 문자열
  한 줄을 추가로 단언한다(정규식이 느슨해질 때 다시 조용히 통과하지 않도록).
- `exit_code: null` operation은 `code_defect: false`·`handoff_key: null`을 낸다.
- cross-runtime(§5.3): 픽스처 operation으로 만든 본문을 `type=bug` 이슈로
  정본 checker에 넣어 `state: unreviewed, missing: []`를 확인한다. 이것이 수용
  기준 "산출 본문이 정본 checker에서 missing 없이 판정된다"의 기계 증거다.

## 4. `predecessor_edge` JS 판정

### 4.1 인터페이스

```js
/**
 * @typedef {Object} PredecessorResolver
 * @property {(bead_id: string) => string[]|null} blocksOf
 *   그 Bead가 `blocks`로 의존하는(=자기 선행) ID 목록. 스냅샷에 없는 ID는 null.
 */

export function judgeQuickFixHandoff(issue, deps = {}) // deps.predecessors?: PredecessorResolver
```

- resolver가 **없으면** 검사를 통째로 건너뛴다(`missing`에 토큰 없음). 자기
  자신의 선행 목록도 resolver가 주므로, 없는 자리에서는 자기 간선도 읽지
  않는다. 이것은 "모든 후보가 unresolved"와 같은 결과이며 계약의
  `unresolved_candidate=skip_fail_quiet` 안이다.
- resolver가 있으면 정본 `predecessor_state`와 같은 순서로 판정한다:
  `sections`의 각 절에서 트림하지 않은 줄에 `line_trigger`가 있으면
  `id_regex`(`g` 플래그, lookbehind는 Node가 지원)로 ID를 모으고 `self_id`를
  뺀다(첫 등장 순, 중복 제거) → 자기 `blocksOf(self_id)`에 있으면 통과 →
  없으면 `blocksOf(candidate)`: `null`이면 건너뜀, 목록에 `self_id`가 있으면
  `predecessor_edge_reversed:<id>`, 아니면 `predecessor_edge_missing:<id>`.
- `missing` 순서는 정본과 같다: `section:*` → `scope:*` → `baseline_red` →
  predecessor 토큰(언급 순).
- 섹션 경계: 정본은 `predecessor_edge.sections`를 required 이름 집합에 합쳐
  `find_sections`를 부른다 — `선행 의존 —` 라벨 줄이 앞 절을 닫고, `## 선행 의존`
  이 절을 연다. JS `findSections`도 같은 합집합을 받는다. 이 한 줄이 parity의
  핵심이라 픽스처가 반드시 덮는다(§5.1).

### 4.2 resolver를 주는 자리

| 호출처 | resolver | 근거 |
| --- | --- | --- |
| `workflow-enrich.js` `enrichIssueWorkflow` ← `warmWorkflowProbes(items, root, snapshot)` | `WorkflowProbeContext`에 `predecessors?: PredecessorResolver`를 더하고, 스냅샷의 `id_index`·`blocks_out`으로 만든다: `blocksOf(id) = id_index.has(id) ? (blocks_out.get(id) ?? []) : null` | `blocks_out`은 `type === 'blocks'` 간선만 담는다(`buildBlocksIndex`). ADR 0025의 세대 간선 인덱스 |
| `list-adapters.js` 스냅샷 투영 경로 | 위와 같다(`warmWorkflowProbes`가 채움) | 워커 탭·상세 |
| `runnable-cache.js` `warmProbes(root, rows, snapshot)` | 위와 같다 | 모니터 후보 행 |
| `list-adapters.js` raw 경로(`fetchListForSubscriptionRaw`, probes 없음) | 없음 → 건너뜀 | 스냅샷이 없다 |
| `scheduler.js` 첫 dispatch 프롬프트 | 없음 → 건너뜀 | `BeadSnapshot`은 단일 Bead. 프롬프트의 `누락:` 줄이 predecessor 토큰을 싣지 않는 것은 의도된 부분집합이며 세션은 어차피 정본 checker를 돈다 |
| `title-cache.js` | 없음 → 건너뜀 | 단일 `bd show` |
| `repo-operation-coordinator.js` 복구 인계 | 없음 → 건너뜀 | 복구 본문은 `선행` 줄을 쓰지 않는다 |

`quickFixReview(issue)`는 `quickFixReview(issue, probes?.predecessors ?? null)`이
된다. `judgeQuickFixHandoff`의 `deps.fs`(캐시 우회)와 `deps.predecessors`는
독립이다 — resolver를 줘도 캐시는 쓴다.

### 4.3 표시

카드 툴팁과 상세 패널은 `missing`을 그대로 나열하므로(UI-r7or §5.4) 새 토큰은
클라이언트 변경 없이 보인다. 토큰 문구를 번역하지 않는다 — 정본 어휘를 그대로
보이는 것이 소비자의 자리다.

## 5. 테스트

### 5.1 픽스처 확장 — `quick-fix-handoff-cases.json`

케이스에 선택 필드 `related`(Bead ID → `bd show --json` 모양 스냅샷)를 더하고,
predecessor 케이스의 `issue`는 `id`와 `dependencies`(`{id, dependency_type}`)를
갖는다. 최소 케이스:

- `검증 bundle`의 `선행 UI-aaaa` 줄, `blocks` 의존 있음 → `missing: []`
- 같은 줄, 의존 없음, `related`에 UI-aaaa 있음 → `predecessor_edge_missing:UI-aaaa`
- 같은 줄, UI-aaaa가 거꾸로 이 Bead를 `blocks` → `predecessor_edge_reversed:UI-aaaa`
- 같은 줄, `related`에 없음 → `missing: []`(unresolved skip)
- `선행 의존 — UI-aaaa` 라벨 줄이 `검증 bundle`을 닫는다(앞 절의 `baseline_red`
  줄이 라벨 뒤에 있으면 밖으로 나감)
- `## 선행 의존` 절 안의 언급도 읽힌다
- `선행` 단어가 없는 줄의 ID는 모으지 않는다
- 자기 ID는 제외한다

두 테스트가 한 픽스처를 읽는 규칙(UI-r7or §7.2)은 그대로다.

- `quick-fix-handoff.test.js`: resolver는 `blocksOf(id)`가 `id === issue.id`면
  `issue.dependencies`의 `blocks` ID, `related[id]`가 있으면 그것의 `blocks`
  ID, 아니면 `null`. 이것은 정본 `blocks_ids(issue)`·`resolve(candidate)`와
  같은 읽기다.
- `cross-runtime.test.js`: `related`가 있는 케이스는 임시 파일로 써서
  `--related-json`을 넘긴다(정본 checker는 이 옵션이 있으면 `bd`를 부르지
  않는다). `bead_id` 인자는 픽스처 `issue.id`가 있으면 그것을, 없으면 지금처럼
  `UI-r7or`를 준다.

### 5.2 로더

- 재핀된 파일이 `supported: true`.
- `predecessor_edge`에서 토큰 하나를 바꾼 사본(`absent_mention: 'error'`)은
  `supported: false`.
- `predecessor_edge` 키를 통째로 뺀 사본은 `supported: true`이고 판정은
  predecessor 토큰을 내지 않는다.

### 5.3 cross-runtime 파일의 두 describe 추가

같은 skip 조건(dotfiles 체크아웃 부재) 아래.

- **드리프트**: `git -C <DOTFILES_ROOT> show HEAD:generated/contracts/quick-fix-handoff.json`
  바이트와 핀 사본 바이트를 비교한다. 작업 트리가 아니라 HEAD 객체를 읽는 것은
  §2.2와 같은 이유다. python·PyYAML은 필요 없으므로 이 describe의 조건은
  체크아웃 존재만이다. 실패 메시지는 provenance의 `source_commit`, 체크아웃
  HEAD, 두 sha256, 그리고 §2.2 절차 한 줄을 담는다 — 어느 쪽이 뒤처졌는지
  읽는 사람이 바로 알도록. 이 검사는 dotfiles 투영이 바뀌면 재핀 전까지
  beads-ui 로컬 검증과 공유 서버 `[verify]`를 red로 만든다. 그것이 목적이다
  (ADR 0012: drift는 사람이 아니라 테스트가 잡는다).
- **복구 본문 parity**: §3.3.

### 5.4 그 밖

- `workflow-enrich.test.js`: probes에 resolver가 있으면 predecessor 토큰이
  붙고, 없으면 붙지 않는다.
- `runnable-cache` 기존 테스트에서 `enrichWorkflow` 주입 시그니처는 그대로다
  (probes 인자에 필드 하나가 늘 뿐).

## 6. 문서

- `app/protocol.md` 복구 인계 단락("The new issue is read back and checked
  against the quick-fix handoff contract" 부근): `검증 bundle`이 측정 기록
  `baseline_red: command=… | base=<target_sha> | exit=<exit_code>` 줄을 싣고,
  정수 exit가 없는 operation은 code defect로 분류되지 않는다는 문장을 더한다.
- `server/workflow-enrich.js`의 `WorkflowSummary.quick_fix_review` typedef
  주석: `missing`이 정본 토큰 어휘(`section:*`·`scope:*`·`baseline_red`·
  `predecessor_edge_missing:<id>`·`predecessor_edge_reversed:<id>`)임과
  predecessor 토큰은 스냅샷 resolver가 있는 경로에서만 나온다는 것.
- `server/worker/quick-fix-handoff.js` 머리 주석: 불활성 키 목록(§1)과 "읽는
  코드가 없다"는 정의.

## 7. 비목표

- 계약 어휘·정규식·토큰을 이 저장소에서 다시 정하거나 번역하지 않는다.
- dotfiles 정본·checker·스킬 문서를 바꾸지 않는다(크로스 리포 unit 없음).
- `automatic_queue_handoff` 등 불활성 키의 reader를 만들지 않는다.
- 투영 갱신 자동화를 만들지 않는다 — 핀은 사람이 옮긴다(UI-r7or §8). 드리프트
  테스트는 옮길 때를 알리는 것이지 옮기는 것이 아니다.
- admission·dispatch에 새 거부 사유를 만들지 않는다(`enforcement: advisory`).
- 복구 인계 Bead의 타입·우선순위·metadata 키·배치 레인은 바꾸지 않는다.
- 클라이언트(`lanes.js`·상세 패널·CSS)는 바꾸지 않는다.

## 8. 검증

- `npm run tsc` · `npm run lint` · `npx prettier --write <변경 파일>` ·
  `npx vitest run --reporter=dot`(cross-runtime 포함, 이 머신은 dotfiles
  체크아웃과 `.venv`가 있어 skip이 아니라 실제로 돈다).
- 수용 기준(UI-ctff·UI-o7ly 본문 합집합):
  1. 핀 사본 바이트가 dotfiles `origin/main` blob과 같고 provenance가 그
     커밋·blob·sha256·bytes를 담는다(§5.2·§5.3 드리프트 describe green).
  2. `quick-fix-handoff.cross-runtime.test.js`가 skip이 아니라 pass다.
  3. `repairHandoffDescription()` 산출 본문이 정본 `check-quick-fix-handoff.py`
     에서 `missing=[]`(§5.3).
  4. §5.1 predecessor 픽스처 전건이 JS·정본 양쪽에서 같은 답을 낸다.
- 배포 뒤 공유 서버는 `bdui-shared restart` 후 healthz SHA 확인만이다. 복구
  인계는 실제 스크립트 결함이 있어야 관측되므로 화면 확인 항목은 없다.

## 9. 경계·후속

- 관찰: UI-ctff — 같은 드리프트의 중복 Bead. 이 spec 승인과 함께 close(사유에
  UI-o7ly). 후속 없음.
- 관찰: `scheduler.js` 프롬프트의 `누락:` 줄은 predecessor 토큰을 싣지 않는다
  (§4.2). 세션이 정본 checker를 직접 돌리므로 값이 없다 — 후속 아님.
- 관찰: dotfiles 투영이 다음에 바뀌면 §5.3 드리프트 검사가 red가 되고 그때의
  재핀은 UI-ctff와 같은 admission으로 새 Bead가 된다. 이 spec은 자동화하지
  않는다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 계약 subset은 코드가 명시하고 검증을 소유하며 drift는
  테스트가 잡는다; 핀 사본은 정본 바이트 그대로이고 이 저장소는 정의자가 아니다.
- 전제: ADR UI-a5l2-3 — UI-3vvi-2에서 승계한 수정 Bead 인계 조항(`type:bug`,
  네 절·`## scope`·`baseline_red`, 정본 checker 통과 뒤 route·영수증 한 번에
  기록, 배치 확인 전 미완료).
- 전제: ADR 0043 — 투영은 동기 자식 프로세스를 띄우지 않는다(resolver는 스냅샷
  안에서만).
- 전제: ADR 0025 — 간선은 스냅샷 세대의 인덱스에서 읽는다(`blocks_out`).
- 복구 인계 본문의 `baseline_red`는 재실행이 아니라 operation의 측정 기록이며
  (`command=`는 런너 프로토콜 env와 스크립트, `base=`는 `target_sha`, `exit=`는
  `exit_code`), 정수 exit가 없는 재현은 code defect가 아니다. 되돌리기 어려움:
  인계 Bead 본문의 형식과 분류 술어가 정본 checker·Worker 큐 배치에 묶인다.
  맥락 필요: 왜 생성 시점에 다시 돌리지 않는지(두 번 재현이 분류 조건이라 기록이
  곧 측정), 왜 `effective_base_sha`가 아니라 `target_sha`인지가 코드만으로
  드러나지 않는다. 실제 절충: 재실행·줄 생략·타입 변경을 버리고 신호 종료를
  `unknown_error` 대기로 남긴다. `summary`: "복구 인계 Bead의 baseline_red는
  operation의 측정 기록(런너 프로토콜 env와 스크립트, base=target_sha,
  exit=exit_code)이며 정수 exit가 없는 재현은 code defect가 아니라 unknown_error
  대기다" → ADR
- 핀 투영 드리프트는 정본 체크아웃이 있는 자리에서 red 테스트다. 되돌리기
  어려움: dotfiles 투영 변경이 재핀 전까지 beads-ui 로컬 검증과 공유 서버
  `[verify]`를 막는 결합이 생긴다. 맥락 필요: 무관한 머지가 왜 dotfiles 커밋
  때문에 막히는지, 왜 경고가 아니라 실패인지(한 달 조용한 어긋남의 재발 방지)가
  테스트 코드만으로 드러나지 않는다. 실제 절충: 픽스처가 우연히 건드릴 때만
  드러나는 현행을 버린다. `summary`: "핀된 dotfiles 투영은 로컬 정본 체크아웃
  HEAD와 바이트가 다르면 cross-runtime 테스트가 실패하며, 재핀은 사람이 그
  실패를 보고 옮긴다" → ADR
- `predecessor_edge` JS 판정은 resolver가 있을 때만·스냅샷 범위에서 돌고 나머지는
  unresolved skip이다. 계약이 이미 `unresolved_candidate=skip_fail_quiet`를
  정했고 이것은 그 소비자 구현이다; resolver를 다른 자리에 더하는 일은 되돌리기
  쉽다 → ADR 아님
- 새 투영 키를 불활성으로 두는 것. reader가 없다는 상태이지 결정이 아니며 키를
  읽기 시작하는 순간 그 Bead의 spec이 다룬다 → ADR 아님

## 구현 unit 후보

권고이지 구속이 아니다.

1. **재핀 + 판정기 + 픽스처** — `generated/contracts/quick-fix-handoff*`,
   `server/worker/quick-fix-handoff.js`, 픽스처, 두 테스트(드리프트·parity
   포함), `workflow-enrich.js`·`list-adapters.js`·`runnable-cache.js`의
   resolver 배선
2. **복구 인계 본문 + 분류 가드 + 문서** — `operation-recovery.js`와 테스트,
   cross-runtime 복구 본문 parity, `app/protocol.md`
