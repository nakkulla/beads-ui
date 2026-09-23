---
scope:
  - server/bd.js
  - server/ws/monitor-handlers.js
  - server/ws/connection.js
  - server/app.js
  - scripts/build-frontend.js
  - scripts/ws-latency-probe.mjs
  - app/views/monitor/bulk-preset-apply.js
  - app/views/monitor/bulk-account-apply.js
  - .gitignore
---

# 서버 bd 호출의 워크스페이스별 병렬화와 설정·프리셋 적용 지연 제거 (UI-j2h3)

- Bead: UI-j2h3 · route: spec_backed
- 형제: 프런트엔드 재작성 UI-dbn6(병행), 서버 스냅샷·이벤트루프 최적화 UI-7xrf(UI-dbn6
  뒤, spec-after-blocker). §8 표.
- 기준: `main` / `4d5cef234269ccbcdd7f5ef458ac7a26e43e8174`
- 상태: 사용자 검토용 완성 초안. 구현·스펙 게이트 승인 전이다.

## 1. 배경과 실측

사용자가 "모니터 탭에서 레포별 설정을 확인할 때 로딩이 느리고 프리셋 적용도
느리다"고 했다. 2026-09-23 공유 서버(`100.122.98.8:3000`, 가시 워크스페이스
8개)에 Node 내장 `WebSocket`으로 붙어 요청별 왕복을 쟀다.

| 요청 | 유휴 상태 | `subscribe-monitor-pipeline` 직후 |
| --- | --- | --- |
| `get-session-defaults` | 250~300ms | 5,181 / 5,618 / 6,074ms |
| `get-workspace-accounts` | 216~384ms | 5,351 / 5,791 / 6,275ms |
| `get-session-defaults` ×3 동시 | 264 / 482 / 727ms(직렬) | — |

CLI 직접 측정: `bd kv get <key> --json` 210~240ms, `bd kv list --json` 60~70ms,
`worker-url resolve --root … --json` 250ms. 동일 워크스페이스에서 `bd kv get`
3개를 동시에 띄우면 520ms(직렬이면 690ms)로 끝난다 — dolt 서버가 동시 접속을
받는다. 등록된 19개 워크스페이스 전부 `.beads/metadata.json`이
`backend: dolt, dolt_mode: server`다.

원인은 코드로 확인했다.

1. `server/bd.js` `withBdRunQueue`(236행)는 **프로세스 전역** 단일 promise
   체인이다. 주석의 근거는 "Dolt embedded 모드는 같은 워크스페이스에 bd 프로세스가
   동시에 붙으면 죽을 수 있다"인데, 큐는 워크스페이스를 구분하지 않는다.
2. `server/ws/monitor-handlers.js` `prewarmVisibleIssuePrefixes`(636행)가 구독
   직후와 매 push마다 가시 워크스페이스마다 `bd kv get`을 세 번
   (`workflow_session_defaults`·`workspace_exec_accounts`·`repo_health`, 각각
   `prewarmSessionDefaults` 184행·`prewarmWorkspaceAccounts` 281행·
   `prewarmRepoHealth` 575행) 큐에 넣는다. 8개 워크스페이스면 24회 ≈ 5.5초가
   먼저 줄을 서고, 사용자의 팝업 요청(`get-session-defaults` = `bd kv get` 1회 +
   `worker-url` 1회)이 그 뒤에 선다. 위 5.2~6.1초가 이 대기다.
3. `apply-impl-preset-global`(`server/ws/exec-preset-handlers.js` 630행)은
   저장소당 `bd kv get` → `bd kv set` → `bd kv get`(readback) 3회를 직렬로 한다
   (유휴 약 0.8초). `set-session-defaults`도 같다(`session-defaults-handlers.js`
   217·278·288행). 여러 저장소 일괄 적용(`app/views/monitor/bulk-preset-apply.js`
   `runBulkApply` 327행, `bulk-account-apply.js`)은 클라이언트가 저장소를
   **순차**로 보내므로 N개 저장소면 N × 0.8초 이상이고, 1번 큐와 겹치면 더 늘어난다.
4. 전송량: `monitor-pipeline-snapshot` 1.55MB(8개 워크스페이스), `main.bundle.js`
   842KB, `styles.css` 283KB 모두 비압축. WS도 `perMessageDeflate` 없음.

부차 관측(이 설계 밖, UI-7xrf): 150초 ping 관측에서 3.4초 이벤트루프 정지 1회,
첫 문서 로드 편차 0.1~26초. 동기 `execFileSync('git', …)`는
`server/workflow-enrich.js` `runGit`(1075행)·`runGitStatus`(1101행)이며 title-cache
채우기 경로가 `enrichIssueWorkflow(issue, workspace)`를 head·probes 없이 호출한다.

## 2. 목표와 비목표

목표

- 모니터 진입 직후에도 레포 설정 팝업의 두 읽기가 각각 1초 안에 답한다(수용 기준
  §6).
- 프리셋·계정 일괄 적용이 저장소 수에 비례해 늘지 않는다: 8개 저장소 3초 안.
- 프로토콜(`app/protocol.md`)의 메시지 종류·payload·응답 형태는 바꾸지 않는다.
  형제 UI-dbn6이 같은 계약을 소비한다.
- 의존성을 추가하지 않는다(`node:zlib`, `ws` 내장 옵션만).

비목표

- 스냅샷 크기 축소, 이벤트루프 정지 원인 제거, `bd list` 세대 구조 — UI-7xrf.
- 쓰기 뒤 readback 제거. **결정: `bd kv set` 뒤 readback은 바꾸지 않는다** —
  2026-09-09 하네스 감사에서 readback이 UI-e20c 실사고를 잡았고 사용자가 유지를
  결정했다.
- `get-session-defaults`의 `worker-url` 호출 순서. **결정: kv 읽기 → `worker-url`
  순차를 유지한다** — CLI는 kv 값을 stdin으로 받아 같은 읽기에서 판정하며(ADR
  UI-u6ud-11), 레인 도입 뒤 유휴 왕복 0.5초는 수용 범위다.
- 클라이언트 화면 변경. 일괄 창의 진행 표시(`done/total`)는 그대로다.

## 3. 대안

1. **워크스페이스별 레인 + 전역 동시성 상한, `bd kv list` 일괄 읽기, 클라이언트
   일괄 적용 병렬, 내장 압축** — 선택. 큐 주석의 안전 근거(같은 워크스페이스 동시
   금지)를 그대로 지키면서 워크스페이스 간 병렬을 연다. 프로토콜·핸들러 의미 불변.
2. 전역 직렬 큐를 그대로 두고 팝업 읽기만 모니터 캐시에서 답한다 — `get-session-
   defaults`가 최대 5분 묵은 값을 답할 수 있고(프로세스 밖 `bd kv set`), 일괄
   적용 지연은 그대로다.
3. 서버에 다중 저장소 apply op를 추가한다 — 프로토콜이 늘어나 UI-dbn6과 결합되고,
   1안의 레인만으로 같은 효과가 난다.
4. 큐를 없애고 전부 병렬 — embedded dolt·SQLite 워크스페이스가 등록될 때 안전
   근거가 사라지고, 19개 × 4회 프로세스가 한꺼번에 뜬다.

## 4. 설계

### 4.1 bd 실행 레인 (`server/bd.js`)

`withBdRunQueue(operation)`을 `withBdRunLane(lane_key, operation)`으로 바꾼다.

- `lane_key`는 `path.resolve(options.cwd || process.cwd())`. `runBd`가 계산해
  넘긴다. `runShell`은 지금처럼 큐를 타지 않는다.
- 레인: `Map<string, Promise<void>>`. 같은 레인의 호출은 지금의 promise 체인
  방식으로 직렬이다(순서 보존). 체인이 끝나고 대기자가 없으면 엔트리를 지운다.
- 전역 상한: 단순 세마포어(대기 FIFO 배열 + 카운터), 기본 `4`, 환경변수
  `BDUI_BD_CONCURRENCY`(정수 ≥ 1, 그 밖은 기본값)로 조정. 획득 순서는 **레인
  먼저, 그 다음 세마포어** — 한 워크스페이스가 상한을 독점하지 못한다.
- 코드 주석은 기존 근거를 그대로 옮기고 "레인 = 워크스페이스" 이유를 붙인다.
  registry의 백엔드 모드는 읽지 않는다(embedded가 등록돼도 안전).
- 타임아웃(`timeout_ms`)·`--sandbox` 처리·`BEADS_DB` 주입은 불변.

### 4.2 kv 일괄 읽기 (`server/bd.js` `kvListJson`)

`kvListJson(options)`을 추가한다: `bd kv list --json` 한 번으로 워크스페이스의
전체 kv를 읽어 `{ ok: true, entries: Record<string, KvGetResult> }` 또는
`{ ok: false, error }`를 돌려준다.

- 출력 형태(실측): `{ "schema_version": 2, "<key>": "<json 문자열>", … }`. 저장
  키는 임의 문자열이라 `data`라는 키도 올 수 있으므로 `normalizeBdJsonTransport`를
  쓰지 않고 이 명령 전용 판별을 둔다: 최상위가 객체이고 `data` 값이 **객체**이며
  정수 `schema_version`이 있고 그 밖의 키가 없으면 envelope(`data`가 목록 본문),
  그 밖에는 최상위 객체 자체가 목록이다. 목록의 값은 언제나 문자열이므로 `data`
  값이 문자열이면 저장 키 `data`다. `schema_version`은 엔트리에서 제외한다.
- 각 값의 해석은 `kvGetJson`의 값 판정 코드를 함수(`decodeKvValue(raw)`)로 빼내
  **같은 함수**를 쓴다: 빈 문자열은 `{ found: true, value: undefined }`(경고 없음,
  `server/bd.js:666`과 동일), JSON 객체는 `value`, 객체 아님·파싱 실패는
  `warning: 'kv_value_unparsable'`. 목록에 없는 키는 `{ ok: true, found: false,
  value: undefined }`다(`entryFor(entries, key)` 헬퍼). `kvGetJson`도 같은 함수를
  호출하도록 바꿔 두 경로가 갈라질 수 없게 한다.
- 종료 코드 0이 아니면 `cliFailure`. 성공인데 최상위가 객체가 아니거나 문자열이
  아닌 엔트리 값이 있으면 protocol failure로
  `recordBdProtocolObservation(command_family: 'kv')`.
- `kvGetJson`·`kvSetJson`은 그대로 남는다(핸들러의 단건 읽기·쓰기가 쓴다).

### 4.3 모니터 prewarm 통합 (`server/ws/monitor-handlers.js`)

`prewarmWorkspaceKv(root_dir, { kvList })`를 추가하고 세 `prewarm*` 함수가 이를
경유하게 한다.

- 워크스페이스당 in-flight 하나. 세 캐시 중 하나라도 cold/만료면 `kvListJson`
  한 번을 띄우고 결과로 세 캐시를 **함께** 채운다. 각 캐시는 지금의 `kvGet`
  결과와 같은 형태의 `entryFor(entries, key)`를 받으므로 TTL·retry(5분·60초)·
  `state: ready|pending`·`workspace_accounts` 3상태(`normalizeWorkspaceAccounts`
  그대로)·`repo_health` 투영 규칙은 불변이다. `bd` 실패(`ok: false`)의 투영도
  지금 그대로 셋이 다르다: 세션 기본값은 `pending`(retry 창), 계정은 `unusable`
  (retry 창), 저장소 건강은 `unknown`(retry 창).
- 채운 뒤 `schedulePush()` 한 번. `invalidateSessionDefaults`·
  `invalidateWorkspaceAccounts`는 자기 캐시만 지우고 push를 예약한다(불변);
  다음 push의 prewarm이 그 워크스페이스만 다시 읽는다.
- `prewarmSessionDefaults`·`prewarmWorkspaceAccounts`·`prewarmRepoHealth`의
  export 이름은 남기되 내부는 `prewarmWorkspaceKv` 호출이다. 테스트 시임은
  `kvGet` 대신 `kvList`로 옮긴다.
- `prewarmIssuePrefix`(`bd config list --json`, 최초 1회 캐시)는 그대로다.

효과: 구독 직후 bd 호출이 워크스페이스당 4회 → 2회(config 1 + kv list 1), 그중
kv list는 70ms. 레인 덕에 워크스페이스끼리 병렬이라 8개 기준 전체 prewarm은
1초 안에 끝나고, 팝업 요청은 자기 워크스페이스 레인에서 최대 2회 뒤에 선다.

### 4.4 일괄 적용 병렬 (`app/views/monitor/bulk-preset-apply.js`, `bulk-account-apply.js`)

서버 핸들러는 바꾸지 않는다. 두 러너의 `for … await` 순차 루프를 저장소 간
병렬(동시 상한 `BULK_PARALLEL = 4`, 파일 상수)로 바꾼다.

- 저장소 **안**의 동작은 바꾸지 않는다: 요청 순서(kv → 큐, 계정 → 정책 2건),
  1회 재시도, 그리고 **요청 사이마다** `isCancelled()`를 확인해 진행 중 저장소의
  재시도·후속 쓰기를 멈추고 `partial`로 판정하는 지금의 규칙(`runPresetTarget`·
  `runFormTarget`, `bulk-account-apply.js`의 정책 쓰기 사이 검사)이 그대로다.
  취소는 그 밖에 아직 시작하지 않은 대상을 보내지 않는다.
- `results`는 대상 순서대로 채우고, `onProgress`는 대상 하나가 끝날 때마다
  `done`을 올린다. `stopped`(preset 경로의 `conflict: true`)는 아직 시작하지 않은
  대상을 `skipped`로 만든다 — 지금과 같은 의미다.
- 병렬이 안전한 이유(파일 머리 주석을 이 내용으로 교체): 큐 revision은 저장소별
  독립이고, 프리셋 store revision은 apply가 바꾸지 않으며, 모니터 재빌드는
  1초 디바운스로 합쳐지고, 같은 저장소의 bd 호출은 서버 레인이 직렬화한다.
- `bulk-pane.js`의 렌더는 건드리지 않는다.

### 4.5 압축 (`server/ws/connection.js`, `server/app.js`, `scripts/build-frontend.js`)

- WS: `new WebSocketServer({ …, perMessageDeflate: { serverNoContextTakeover:
  true, threshold: 1024 } })`. 설치된 `ws`는 context takeover가 꺼진 경우에만
  `threshold`를 적용하므로(`sender.js`) 둘을 함께 둔다; 세션-로그 라인 같은 작은
  프레임은 비압축으로 나간다. 브라우저는 자동 협상하고 비대응 클라이언트는
  비압축으로 남는다.
- 정적 자산: `scripts/build-frontend.js`가 번들을 쓴 뒤 **빌드 시점에 `app/`
  아래에 존재하는 모든 `.js`·`.css` 파일**(테스트 파일 제외, 재귀)을 찾아 각각
  `<file>.gz`를 `zlib.gzipSync`(level 9)로 쓴다. 고정 파일 목록은 두지 않는다 —
  형제 UI-dbn6가 `app/styles.css`를 지우고 화면별 스타일시트로 옮겨도 규칙이
  그대로 맞는다. `.gitignore`에 `app/**/*.gz`를 더한다.
  `server/app.js`는 `express.static` 앞, live 번들 라우트 **뒤**에 미들웨어 하나를
  둔다: 요청 경로가 `.js`·`.css`이고 `Accept-Encoding`에 gzip이 있고 `<file>.gz`가
  있으며 원본보다 mtime이 같거나 새로우면 그 파일을 `Content-Encoding: gzip`,
  `Vary: Accept-Encoding`, 원본 Content-Type으로 보낸다. 조건이 하나라도 빠지면
  그냥 다음으로 넘긴다(기존 동작). mtime 비교는 정적 파일 자신의 갱신만 본다;
  번들의 소스 변경은 `npm run build`가 번들과 `.gz`를 함께 다시 쓰는 것으로
  맞춘다.
- live 모드 `GET /main.bundle.js`는 지금처럼 미들웨어보다 앞에 있고, `out.text`를
  요청이 gzip을 받을 때 `zlib.gzipSync`로 보낸다.
- `Cache-Control`·ETag 정책은 지금(`express.static` 기본)과 같다.

### 4.6 측정 스크립트 (`scripts/ws-latency-probe.mjs`)

수용 기준을 재현하는 스크립트를 리포에 둔다. 기본은 읽기 전용이다:
`node scripts/ws-latency-probe.mjs <host:port>`가 (1) `subscribe-monitor-pipeline`
직후 가시 워크스페이스 셋에 `get-session-defaults`·`get-workspace-accounts`를 보내
왕복 ms를, (2) 60초 동안 push가 없는 유휴 상태를 기다린 뒤 같은 요청의 왕복 ms를,
(3) 첫 스냅샷의 JSON 바이트와 실제 수신 프레임 바이트(WebSocket `message` 이벤트
크기가 아니라 소켓 수신 바이트 — Node `net.Socket.bytesRead` 차이)를, (4)
`GET /main.bundle.js`·`/styles.css`를 `Accept-Encoding: gzip`으로 받아 응답 헤더와
전송 바이트를, (5) 250ms 간격 ping의 p50/p99/max를 출력한다.

일괄 적용 기준은 명시 플래그가 있을 때만 도는 쓰기 모드로 잰다:
`--apply-preset <preset_id> --repos <root_dir,…>`는 각 저장소의 현재
`applied_exec_preset.id`가 `<preset_id>`와 같을 때만 `apply-impl-preset-global`을
동시 상한 4로 보내고(다르면 그 저장소는 건너뛰고 이유를 출력), 벽시계·저장소별
응답·`queue_applied`를 기록한다. 같은 프리셋의 재적용은 kv 값을 바꾸지 않고
`applied_at`만 갱신하므로 상태가 보존된다. 스크립트는 그 밖의 쓰기 요청을 보내지
않는다. UI-7xrf가 같은 스크립트로 전후를 비교한다.

## 5. 데이터 흐름 요약

1. 클라이언트가 `subscribe-monitor-pipeline` → 서버는 캐시로 첫 스냅샷을 바로
   push(불변) → `prewarmVisibleIssuePrefixes`가 워크스페이스마다 `config list`와
   `kv list`를 각자 레인에 넣는다(전역 상한 4).
2. 사용자가 레포 ⚙ → `get-session-defaults`·`get-workspace-accounts` → 그
   워크스페이스 레인에서 prewarm 2회 뒤에 실행(≤ 0.3초 대기) → 응답.
3. 일괄 적용 → 클라이언트가 최대 4개 저장소를 동시에 `apply-impl-preset-global`
   → 서버는 저장소별 레인에서 get/set/get 직렬 → 각 응답을 받는 대로 진행 갱신.

## 6. 오류 처리와 검증 조건

오류

- 세마포어·레인은 예외를 삼키지 않는다: `operation`이 던지면 레인·상한을 풀고
  그대로 전파(지금과 같음).
- `kvListJson` 실패 시 세 캐시는 각자의 실패 투영(세션 `pending`·계정
  `unusable`·건강 `unknown`)으로 retry 창(60초)에 들어간다 — 팝업
  `get-session-defaults`는 캐시를 보지 않으므로 영향이 없다.
- 압축 파일이 원본보다 오래되면(빌드 없이 소스만 바뀐 live 개발) 미들웨어가
  건너뛴다. 배포는 `npm run build`가 선행이라 항상 최신이다.

수용 기준(배포 뒤 공유 서버에서 §4.6 스크립트로 확인, 8개 가시 워크스페이스;
각 행의 측정 절차는 §4.6의 번호)

| 항목 | 현재 | 기준 | 절차 |
| --- | --- | --- | --- |
| 구독 직후 `get-session-defaults` | 5.2~6.1초 | ≤ 1.0초 | (1) |
| 구독 직후 `get-workspace-accounts` | 5.4~6.3초 | ≤ 1.0초 | (1) |
| 유휴 `get-session-defaults` | 0.25~0.3초 | ≤ 0.6초 | (2) |
| 8개 저장소 프리셋 일괄 적용 벽시계 | ≈ N × 0.8초 이상 | ≤ 3초 | 쓰기 모드 `--apply-preset`, 8개 저장소 모두 같은 적용 프리셋일 때 |
| `monitor-pipeline-snapshot` 수신 바이트 | 1.55MB | JSON의 20% 이하 | (3) |
| `main.bundle.js` 전송 바이트 | 842KB | ≤ 250KB | (4) |
| ping p99 | 2.2초(정지 포함) | 기준 없음 — 기록만, UI-7xrf 입력 | (5) |

테스트(vitest)

- `server/bd.test.js`: 같은 cwd 두 호출은 겹치지 않음(가짜 spawn으로 시작·종료
  순서 관측), 다른 cwd 두 호출은 겹침, 상한 4 초과 시 다섯 번째는 대기, `cwd`
  없는 호출은 `process.cwd()` 레인, 예외 뒤 레인·상한 해제; `kvListJson` 파싱:
  정상 목록, `data`라는 저장 키를 가진 정상 목록(문자열 값 → 엔트리), envelope
  (`data`가 객체), 빈 문자열 값(경고 없음), 비객체 값(경고), 종료 코드 ≠ 0;
  `kvGetJson`과 `kvListJson`이 같은 입력 문자열에 같은 결과를 냄.
- `server/ws/monitor-handlers.test.js`: prewarm이 워크스페이스당 `kvList` 1회로
  세 캐시를 채움, in-flight 중복 억제, 실패 시 세 캐시가 각자의 투영(`pending`·
  `unusable`·`unknown`)으로 retry 창, 기존 `session_defaults_state`·
  `workspace_accounts` 3상태 테스트 유지.
- `app/views/monitor/bulk-preset-apply.test.js`·`bulk-account-apply.test.js`:
  동시 상한 준수, 결과 순서 보존, `stopped`가 미시작 대상만 `skipped`, 취소가
  미시작 대상을 보내지 않고 진행 중 저장소는 다음 요청 전에 멈춰 `partial`, 저장소
  안 순서 유지, 기존 취소·재시도 테스트 유지.
- `server/app.test.js`(또는 새 `app.static-gzip.test.js`): `.gz` 있으면 gzip
  응답, 없거나 오래되면 원본, `Accept-Encoding` 없으면 원본, live 모드 번들은
  gzip 요청에 압축 응답. `scripts/build-frontend.js`: 임시 `app/`에서 `.js`·
  `.css`마다 `.gz` 생성.
- `server/ws.test.js`: `perMessageDeflate`가 `serverNoContextTakeover: true`와
  `threshold: 1024`로 서버 생성에 전달되고, 1KB 미만 push 프레임은 비압축
  (`ws` 클라이언트로 수신 프레임의 RSV1 비트 관측), 첫 스냅샷은 압축.

## 7. 구현 unit 후보

한 unit(서버 레인·kv list·prewarm·압축·클라이언트 러너·스크립트)으로 충분하다.
파일 수가 아니라 검증 묶음이 하나(위 테스트 + 배포 뒤 §6 측정)라서다.

## 8. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | user_request | 승인된 병렬 쓰기(사용자 2026-09-23: 서버 핫픽스 먼저·프런트엔드 병행) + 독립 착지 검증 묶음(프런트엔드 전면 재작성은 여러 Phase, 이 Bead는 서버 단일 unit) | 없음 | UI-dbn6 |
| 형제 | beads-ui | user_request | 독립 착지 검증 묶음(스냅샷 축소·이벤트루프 정지 프로파일링은 새 프런트엔드가 소비하는 스냅샷 형태를 전제) spec-after-blocker | UI-dbn6 | UI-7xrf |

- 관찰: `get-session-defaults`의 첫 호출 2초(`beads-ui` 워크스페이스, 이후 0.26초)
  — 원인 미확인(worker-url 콜드 스타트 추정), UI-7xrf의 프로파일링 항목.
- 관찰: UI-7xrf는 §4.6 측정 스크립트의 소비자라 `blocks` 엣지(UI-7xrf ← UI-j2h3)를
  함께 둔다; 표의 선행 열은 설계 전제인 UI-dbn6 하나만 적는다.
- 관찰: UI-dbn6 §3.7이 이 설계의 병렬 러너를 소비한다 — 그쪽 스펙의 선행 표기는
  UI-dbn6 재검토 라운드에서 보완한다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud — 데이터 계층은 bd CLI shell-out이며 DB 직결·daemon·batch
  RPC를 두지 않는다. 이 설계는 shell-out의 동시성과 횟수만 바꾸고 `bd kv list`는
  bd의 기존 부명령이다.
- 전제: ADR UI-u6ud-11 — Worker 주소 조회는 설치된 `worker-url` CLI로만 하며
  호출 형태(kv 값 stdin)를 유지한다.
- 전제: ADR UI-u6ud-10 — 프리셋 적용의 `applies_to` 계열·applied 기록 의미는
  서버 핸들러 불변으로 그대로다.
- bd 실행 직렬화 단위는 워크스페이스(cwd) 레인이고 워크스페이스 간은 전역 상한
  아래 병렬이다. 되돌리기 쉬움: `bd.js` 한 함수와 상한 상수이며 다른 소비자는
  `runBd` 시그니처를 그대로 쓴다. 맥락 필요 낮음: 원래 직렬화 근거(embedded dolt)
  와 레인 근거를 함수 주석이 담는다. 실제 절충 있음(안전 vs 지연)이나 레인이 원래
  근거를 그대로 만족해 경쟁하는 선택지가 아니다 → ADR 아님
- 일괄 적용은 클라이언트가 저장소 간 병렬(상한 4)로 보낸다. 되돌리기 쉬움: 러너
  상수 하나. 맥락 필요 낮음: 안전 근거가 파일 머리 주석에 있다. 실제 절충 있음:
  대안인 서버 다중 저장소 op는 프로토콜을 늘려 UI-dbn6와 결합되고, 순차 유지는
  지연을 남긴다 — 클라이언트 병렬은 프로토콜을 바꾸지 않는 대신 진행 표시가 대상
  순서와 완료 순서로 갈린다. 한 조건만 성립한다 → ADR 아님
- 정적 자산은 빌드 시 사전 압축, WS는 `perMessageDeflate`. 되돌리기 쉬움: 옵션과
  미들웨어 하나. 맥락 필요 낮음. 실제 절충 있음: 대안인 요청 시 압축(`compression`
  의존성 또는 스트림 gzip)은 요청마다 CPU를 쓰고 의존성이 늘며, 사전 압축은 빌드
  없이 소스만 바뀐 live 개발에서 압축 응답을 건너뛴다 — 배포는 항상 빌드가
  선행하므로 후자를 택했다. 한 조건만 성립한다 → ADR 아님
