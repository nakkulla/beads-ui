---
scope:
  - server/worker/session-ref.js
  - server/worker/session-ref-transcript.js
  - server/worker/runnable-cache.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - app/protocol.js
  - app/protocol.md
  - app/utils/transcript-lines.js
  - app/utils/session-ref.js
  - app/views/worker/transcript-drawer.js
  - app/views/worker/running-grid.js
  - app/views/monitor/lanes.js
  - app/views/monitor/index.js
  - app/views/detail-panel/session-history.js
  - app/views/detail-panel/index.js
  - app/styles.css
---

# 세션 진행 이슈를 Worker attempt와 같은 포맷으로 — `session_ref` 칩·transcript drawer·재개 명령 (UI-4xzk)

- Bead: `UI-4xzk` (route `spec_backed`)
- 선행: `dotfiles-sdqo` (closed, PR nakkulla/dotfiles#440) — 계약 키 `session_ref`와
  claim 시 기록 절차. 이 문서는 그 스펙 §7 "beads-ui 소비자 요구"를 구현한다.
- 개정 대상: UI-yrzu `2026-08-24-monitor-session-active-route-chip-design.md` §6
  (세션 타일에 `▤ 세션` 없음)·§11(세션 식별·로그 열람 비범위). 충돌 문장은 이 문서가
  우선한다. 카드 자리 배정은 UI-251y `2026-08-25-card-header-grammar-unify-design.md`
  §5.1 슬롯 표를 따른다.
- 사용자 결정 2026-08-25: (1) 서버 경로는 기존 `subscribe-session-log` 확장, (2) 사람
  입력 턴은 새 `user` 라인 종류로 표시, (3) 세션 타일은 `session_ref`가 있을 때만
  `▤ 세션` 버튼.

## 1. 문제

Worker attempt는 세션 ID·라이브 transcript(`subscribe-session-log`)·재개 경로를 갖지만,
인터랙티브 세션이 `in_progress`로 잡은 이슈는 모니터 세션 타일(UI-yrzu)에 "세션"
배지만 있고 정체가 없다. dotfiles-sdqo가 Bead metadata `session_ref`
(`<provider>:<session-id>@<host>[; …]`, 마지막 항목이 현재 세션)를 정의해 그 사실을
남기기 시작했으므로, beads-ui가 그 키를 읽어 Worker attempt 행과 같은 어휘로
보여주고, ID로 transcript 파일을 찾아 열고, 재개 명령을 주면 된다.

두 가지 사실이 설계를 단순하게 만든다.

- Claude 프로젝트 JSONL(`~/.claude/projects/<slug>/<sid>.jsonl`)의 `user`/`assistant`
  레코드는 Worker runner의 `stream-json`과 같은 `message.content` 구조라 기존 파서
  (`app/utils/transcript-lines.js`)가 거의 그대로 읽는다. 다른 점은 사람 입력 턴이
  있다는 것뿐이다.
- Codex rollout(`~/.codex/sessions/YYYY/MM/DD/rollout-*-<sid>.jsonl`)은 runner의
  `--json` 이벤트와 형식이 다르다(`response_item`/`event_msg` 레코드). 서버 어댑터
  하나가 runner 형식으로 투영하면 클라이언트는 그대로다.

## 2. 목표와 원칙

- 세션 타일과 이슈 상세 `세션 이력`에 `session_ref` 항목을 Worker attempt 행과 같은
  시각 어휘(provider · short ID · 최근 활동 시각)로 그린다.
- 항목 클릭/`▤ 세션` 클릭은 **기존 transcript drawer**로 해당 세션 파일을
  snapshot + live follow로 연다.
- 재개 명령(`claude --resume <sid>` / `codex resume <sid>`)을 클릭 복사로 제공한다.
- 표시 전용. Worker 스케줄러·admission·게이트·`bd ready`에 영향 없음.
- fail-quiet 사다리: 키 부재 → 현재 표시 그대로 · 항목 malformed → 그 항목만 생략 ·
  다른 머신(host 불일치) → ID만, drawer 열기 불가 · 파일 없음 → 빈 snapshot.

## 3. 판정 규칙 (서버 helper `server/worker/session-ref.js`)

### 3.1 파싱 — `parseSessionRef(value): SessionRefEntry[]`

- 입력이 문자열이 아니거나 빈 문자열이면 `[]`.
- `; `로 나눈다(계약 §1.1 구분자; 앞뒤 공백은 trim). 각 항목을
  `^(claude|codex):([^:@;\s]+)@(\S+)$`로 읽는다(dotfiles-sdqo §7). 불일치 항목은 개별
  생략하되 **원래 index를 보존**한다 — 이력 순서가 사실이다.
- 결과 `{ index, provider: 'claude'|'codex', session_id, host }`. 마지막 유효 항목이
  `current`다.

### 3.2 파일 탐색 — `resolveSessionFile(entry, options)`

경로 탐색에 쓰는 세션 ID는 파싱 규칙보다 좁은 `^[A-Za-z0-9._-]+$`를 추가로 만족해야
한다(경로 구분자·`..` 차단). 불만족이면 `missing`.

- host 비교: `entry.host`와 서버의 `os.hostname()`을 **첫 라벨**(첫 `.` 앞)로
  대소문자 무시 비교한다. `hostname -s`가 `isy-macstudioui-MacStudio-2`, `os.hostname()`이
  `isy-macstudioui-MacStudio-2.local`인 것이 실측이다. 불일치면 파일 탐색 없이
  `locality: 'remote'`.
- Claude: `~/.claude/projects/*/<sid>.jsonl` — `projects` 디렉터리를 `readdirSync`하고
  각 하위 디렉터리에서 `<sid>.jsonl`을 `statSync`한다. 첫 매치가 파일이다(세션 ID는
  UUID라 유일). `claudeSessionFilePath`는 cwd를 요구하므로 재사용하지 않고, 같은
  파일 규칙(`.claude/projects/<dir>/<sid>.jsonl`)을 이 helper가 소유한다.
- Codex: `codexRolloutFilePath({ session_id, started_at })`(`codex-effort-observer.js`)를
  재사용한다. `started_at`은 세션 ID가 UUIDv7(15번째 문자 `7`)이면 앞 48비트 ms
  타임스탬프에서 얻는다(실측: `01a035fc-…` → 2026-08-24T22:55Z, rollout 디렉터리
  `2026/08/25` 로컬 날짜와 일치). 그 함수는 ±1일을 함께 살핀다. UUIDv7이 아니면
  `~/.codex/sessions` 아래 날짜 디렉터리를 최신순으로 최대 `CODEX_SCAN_DAYS`(=30)개
  훑는다.
- 결과 `{ locality: 'local'|'remote'|'missing', file: string|null, last_event_at: number|null }`.
  `last_event_at`은 파일 `mtimeMs`(있을 때만).

### 3.3 뷰 투영 — `sessionRefViews(metadata, options): SessionRefView[]`

```
SessionRefView = {
  index: number,              // 계약 값 안의 위치 (0부터)
  provider: 'claude'|'codex',
  session_id: string,
  host: string,
  current: boolean,           // 마지막 유효 항목
  locality: 'local'|'remote'|'missing',
  last_event_at: number|null, // 파일 mtime (epoch ms), local일 때만
  resume_command: string      // claude: `claude --resume <sid>` · codex: `codex resume <sid>`
}
```

`file` 경로는 뷰에 싣지 않는다(클라이언트가 알 필요가 없고, 경로는 서버 HOME의
사실이다). 순서는 계약 값 순서(과거 → 현재).

## 4. 서버 투영과 프로토콜 (`app/protocol.md` 동시 갱신)

### 4.1 `session_active[].session_refs` (`runnable-cache.js qualifySession`)

`SessionActiveItem`에 `session_refs: SessionRefView[]`를 더한다. 같은 스캔의
`metadataOf(row).session_ref`를 §3.3으로 투영한다 — 추가 `bd` 호출 없음, 항목당
`stat` 몇 번이다. 키 부재·전항목 malformed면 `[]`. 투영 함수 throw는 `[]`로 삼킨다
(`workflow: null`과 같은 규약). TTL·invalidate는 UI-yrzu §4.1 그대로다.

### 4.2 `get-session-refs` (request/response, 신규)

- payload `{ bead_id, root_dir? }` — `root_dir` 규약은 `get-attempt-prompt`와 같다
  (registry allow list, 부재 시 connection workspace).
- 서버는 대상 workspace에서 `bd show <bead_id> --json`(`runBdJson`)을 읽어
  `metadata.session_ref`를 §3.3으로 투영해 `{ bead_id, sessions: SessionRefView[] }`로
  답한다. Bead `status`는 싣지 않는다 — 상세 패널은 이미 `data.status`를 갖고 있고
  (§6.3 live 판정 재료), 두 출처를 두면 어긋날 수 있다.
- `bd show` 실패·Bead 없음·키 부재 → `{ bead_id, sessions: [] }` (오류 응답이
  아니다 — 상세 패널은 조용히 행을 그리지 않는다).
- `app/protocol.js MessageType`에 `'get-session-refs'`를 등록한다.

### 4.3 `subscribe-session-log`의 `session_ref` 변형

payload `{ id, attempt_id, session_ref: { bead_id, provider, session_id }, root_dir? }`.

- `session_ref`가 있으면 `launch_id`는 허용하지 않는다(`bad_request`).
- `attempt_id`는 **반드시** `session:<provider>:<session_id>`와 같아야 한다
  (`bad_request`). 이 값이 클라이언트 store·drawer의 키다 — 병렬 분석기가 `job_id`를
  attempt_id 슬롯에 넣는 선례(protocol.md 병렬 분석 절)와 같다.
- `provider`는 enum, `session_id`는 §3.2의 좁은 정규식. 위반은 `bad_request`.
- **인가**: 대상 workspace에서 `bd show <bead_id> --json`을 읽어 파싱한 `session_ref`
  항목 중 `(provider, session_id)`가 일치하는 것이 있어야 한다. 없으면 파일을 조회하지
  않고 빈 snapshot(`{ lines: [], last_event_at: null }`) — 다른 workspace의 attempt와
  같은 fail-quiet 처리다. 즉 이 경로로 읽을 수 있는 파일은 "어떤 Bead가 자기 세션이라고
  기록한 파일"뿐이다.
- 응답 `ok` 뒤 `session-log-snapshot { id, attempt_id, lines, last_event_at }`.
  `locality !== 'local'`이거나 파일이 없으면 빈 snapshot. 있으면 파일 전체를 읽어
  §5 어댑터로 투영한 `lines`와 mtime `last_event_at`.
- **live follow**: snapshot 뒤 `createTailReader({ file, start_offset: <snapshot이 읽은
  바이트>, onLine })`(`runner/tail-reader.js`, `fs.watch` + 500ms 폴링)를 붙여 새 줄마다
  어댑터를 거쳐 `session-log-append { id, attempt_id, event }`를 push한다. 어댑터
  인스턴스는 구독당 하나로 snapshot과 append가 같은 pairing 상태를 공유한다(§5.2).
  `SESSION_LOG_SUBS` 항목의 `off`는 `reader.close`다 — `unsubscribe-session-log`·연결
  종료·같은 client id 재구독이 기존 경로로 reader를 닫는다. 파일이 없어 reader가
  `open` 실패로 포기하면 조용히 끝난다(빈 snapshot 이후 append 없음).
- runtime `sessionLog`(attempt 브로커)는 거치지 않는다 — attempt가 없고 `last_activity`
  overlay 대상도 아니다.

### 4.4 문서

`app/protocol.md`에 (a) `session_active[]` 행의 `session_refs` 필드, (b)
`get-session-refs`, (c) `subscribe-session-log`의 `session_ref` 변형과 인가 규칙,
(d) session-log 라인의 `user` 종류(§5)를 적는다.

## 5. transcript 어댑터 (`server/worker/session-ref-transcript.js`)

파일의 한 줄(JSON) → drawer raw 이벤트 0..n개. 파싱 실패 줄은 생략.

### 5.1 Claude — 통과 필터

- `type ∈ { user, assistant, result }`만 통과, 그 외(`attachment`, `ai-title`,
  `file-history-snapshot`, `mode`, … )는 생략. 통과 레코드는 **그대로**(파서가 이미
  `message.content`를 읽는다).
- `isMeta === true` 또는 `isSidechain === true`인 레코드는 생략(주입 텍스트·서브에이전트
  분기).
- `type: 'system'`은 프로젝트 파일에 runner의 `init`/`thinking_tokens` 형식으로 존재하지
  않으므로 생략.

### 5.2 Codex — rollout → runner `--json` 투영

| rollout 레코드 | 투영 |
|---|---|
| `event_msg` / `user_message { message }` | `{ type: 'item.completed', item: { type: 'user_message', text } }` — beads-ui 정의 확장 항목(§5.3) |
| `event_msg` / `agent_message { message }` | `{ type: 'item.completed', item: { type: 'agent_message', text } }` |
| `event_msg` / `agent_reasoning { text }` | `{ type: 'item.completed', item: { type: 'reasoning', text } }` |
| `response_item` / `custom_tool_call { call_id, name: 'exec', input: <command string> }` | pairing 등록만(출력 없음) |
| `response_item` / `function_call { call_id, name, arguments }` — `JSON.parse(arguments)`에 문자열 `cmd`/`command`가 있을 때 | pairing 등록(command = 그 문자열) |
| `response_item` / `custom_tool_call_output` · `function_call_output { call_id, output }` — 짝이 있을 때 | `{ type: 'item.completed', item: { type: 'command_execution', command, aggregated_output, status: 'completed' } }`; `output`이 `{ text }[]`면 text를 이어 붙이고 문자열이면 그대로 |
| `event_msg` / `task_complete` | `{ type: 'turn.completed' }` |
| `event_msg` / `error { message }` | `{ type: 'error', message }` |
| 그 외(`session_meta`, `turn_context`, `token_count`, `task_started`, `patch_apply_end`, `response_item.message`(user/assistant 중복·developer), `reasoning`(encrypted) 등) | 생략 |

짝이 없는 output은 생략한다. 스냅샷 끝에 output이 아직 없는 call은 아무것도 내지
않는다(runner도 `item.started`는 표시하지 않는다).

### 5.3 파서 확장 (`app/utils/transcript-lines.js`) — `user` 라인

- `DisplayLine.kind`에 `'user'`를 더한다.
- Claude `type: 'user'`: `message.content`가 문자열이면 그 텍스트, 배열이면 `text`
  블록만 이어 붙인다(`tool_result` 블록은 현행대로 짝 채움만). 텍스트에서
  `<system-reminder>…</system-reminder>` 블록을 제거하고 trim한 결과가 비어 있지 않으면
  `{ kind: 'user', text }` 한 줄. Worker 로그의 `user` 레코드는 `tool_result`뿐이므로
  기존 출력은 변하지 않는다(테스트로 고정).
- Codex `item.completed` + `item.type === 'user_message'` → `{ kind: 'user', text }`.
  파일 머리말 주석의 wire shape 목록에 이 확장 항목을 적는다.
- `createTranscriptReducer`의 활동 overlay(`last_activity`)는 `user`를 **건너뛴다** —
  세션이 "하고 있는 일"이 아니다(`thinking` 제외 규칙 옆에 같은 조건).

### 5.4 drawer 렌더 (`transcript-drawer.js lineTemplate`)

`kind === 'user'`: `▷` 글리프, `sv__line--user` 수식 클래스(구분되는 배경, 경고색
금지), 본문은 `renderMarkdown` 없이 `pre-wrap` 텍스트(사람 입력은 마크다운이 아니라
명령문일 수 있다). 접기/펼치기는 `thinking`과 같은 1줄 요약 + 클릭 확장 규칙을 쓴다
(긴 프롬프트가 drawer를 채우지 않게).

## 6. 클라이언트

### 6.1 공용 helper `app/utils/session-ref.js`

- `sessionRefKey(view) = 'session:' + provider + ':' + session_id` — attempt_id 슬롯 값.
- `sessionRefLabel(view) = provider + ' · ' + session_id.slice(0, 8)`.
- `sessionRefDrawerInput(view, bead_id, bead_status, root_dir)` →
  `{ attempt_id: key, session_ref: { bead_id, provider, session_id }, root_dir?, hide_prompt: true, meta: { runner: provider, label, session_id, resume_command, status } }`.
  `status`는 §6.3의 live 판정.

### 6.2 drawer (`transcript-drawer.js`)

- `open(input)`에 `session_ref?: { bead_id, provider, session_id }`를 받아 subscribe
  payload에 그대로 싣는다. `launch_id`와 함께 오면 `session_ref`를 무시하지 않고
  `open`을 거부한다(호출자 버그).
- `DrawerMeta`에 `label?: string`(bar의 `sv__id` 텍스트 override)과
  `resume_command?: string`을 더한다. `resume_command`가 있으면 bar에
  `⧉ 재개 명령` 버튼(`sv__resume-cmd`, title = 명령 전문, 클릭 = `copyToClipboard` +
  toast). 기존 `⧉ <sid8>` 세션 ID 복사 버튼은 그대로 함께 보인다.
- `hide_prompt: true`로 발송 프롬프트 토글을 숨긴다(attempt 프롬프트가 없다).
- live 판정·heartbeat·`⇣` follow는 `meta.status === 'running'` 규칙 그대로다.

### 6.3 live 판정 (클라이언트)

`view.current && bead_status === 'in_progress' && view.locality === 'local'`이면
`status: 'running'`, 아니면 `'done'`. 세션 프로세스 생존은 판단하지 않는다(계약
비목표) — "진행 중" 칩은 "현재 세션이며 이슈가 아직 열려 있다"는 뜻이고, 마지막
이벤트 시각(`ago`)이 실제 움직임을 말한다.

### 6.4 모니터 세션 타일 (`monitor/lanes.js`, `monitor/index.js`, `worker/running-grid.js`)

- `lanes.js`: `session_active[]` → running 항목에 `session_refs: entry.session_refs`
  (배열 아니면 `[]`). `MonitorItem`에 `session_refs?: SessionRefView[]`.
- `index.js runningBody`: 세션 타일에 `session_refs`를 tile로 넘긴다.
- `running-grid.js RunningTile`에 `session_refs?: SessionRefView[]`. `kind === 'session'`
  이고 current 항목이 있으면:
  - **슬롯 1 조작(오른쪽 끝)**: `▤ 세션` 버튼(`rtile__session`, Worker 타일과 같은
    클래스·자리). `locality !== 'local'`이면 `disabled` + title(`remote`: "다른 머신
    세션 — 이 서버에 transcript 없음", `missing`: "transcript 파일 없음"). 버튼은 `세션`
    텍스트 배지 **앞**, 경과 뒤에 온다 — Worker 타일에서 `▤ 세션`이 경과 뒤에 오는
    자리와 같다.
  - **슬롯 5 좌표·실행 사실**: `session_meta` 줄에 `session_ref` 칩
    (`ctl-chip ctl-chip--sref`, 텍스트 `sessionRefLabel`, title
    `<provider>:<sid>@<host>` + 이력 수 `· 이력 n`(n = 항목 수, 2 이상일 때만)).
    `exec_receipt` 칩 앞에 둔다(정체 → 실행 순).
  - current 항목이 없으면(키 부재·전항목 malformed) 타일은 UI-yrzu §6 그대로다.
- `index.js` 클릭: `.rtile__session` 분기에서 `item.kind === 'session'`이면
  `attempt_id` 대신 `sessionRefDrawerInput(current, bead_id, 'in_progress', root_dir)`로
  `drawer.open`. `selected_attempt`는 세션 타일에서 바꾸지 않는다(하이라이트 대상
  attempt가 없다).

### 6.5 이슈 상세 `세션 이력` (`detail-panel/index.js`, `session-history.js`)

- 패널은 `data.metadata.session_ref`가 **문자열로 존재할 때만** `get-session-refs`
  `{ bead_id }`를 보낸다(키 부재 이슈는 요청 자체가 없다). 응답은 bead별로 캐시하고,
  같은 이슈의 `metadata.session_ref` 값이 바뀌면 다시 요청한다(값 비교). 요청
  실패·빈 응답은 행 없음.
- `sessionHistoryTemplate(attempts, handlers, usage_view, session_refs = [])`:
  `session_refs`가 비어 있지 않으면 목록 **맨 앞**에 세션 행 블록을 그린다. 순서는
  current 먼저, 이어서 과거 항목을 최신순(index 내림차순). attempt 행은 그 뒤에 현행
  정렬 그대로다. 혼합 정렬은 하지 않는다 — attempt는 `started_at`, 세션은 파일 mtime
  뿐이라 같은 축이 아니다.
- 세션 행은 attempt 행과 같은 `detail-session-row` / `detail-session` 껍데기를 쓴다:
  - glyph: current이면 `◐`(세션 타일 점과 같은 의미), 과거 항목은 `·`.
  - `detail-session__id`: `sessionRefLabel(view)` (`claude · a1b2c3d4`).
  - `detail-session__meta`: `host` + (`remote`: `· 다른 머신`, `missing`: `· 파일 없음`).
  - `detail-session__sid`: 전체 ID title, 앞 8자(attempt 행과 동일).
  - `detail-session__time`: `last_event_at`이 있으면 `shortTime`, 없으면 빈 칸.
  - 행 클릭 = `handlers.onOpenSessionRef(view)`; `locality !== 'local'`이면 버튼
    `disabled`(title은 §6.4와 같은 문구).
  - 행 아래 보조 버튼 `⧉ 재개`(`detail-session__resume-cmd`) = `resume_command`
    복사 + toast. `↻ 이어하기`와 다른 클래스·문구 — 그 버튼은 Worker attempt를 서버가
    재개하는 조작이고, 이것은 터미널에 붙여 넣을 명령이다.
- `onOpenSessionRef(view)`는 `sessionRefDrawerInput(view, current_id, data.status)`로
  `transcript_drawer.open`.
- 세션 이력이 attempt도 세션도 없으면 현행 `세션 이력 없음`.

### 6.6 CSS (`app/styles.css`)

`.sv__line--user`(배경·글리프), `.sv__resume-cmd`, `.ctl-chip--sref`(중립 계열,
`.ctl-chip--route`와 같은 톤), `.detail-session__resume-cmd`, `.rtile--session
.rtile__session`(세션 타일에서의 버튼 정렬). 새 색 토큰은 만들지 않는다.

## 7. 오류·호환 처리

| 상황 | 동작 |
|---|---|
| `session_ref` 키 없음(구 계약·과거 이슈) | 타일·상세 모두 현행 그대로, 요청 없음 |
| 항목 일부 malformed | 그 항목만 생략, index 보존 |
| host 불일치 | 칩·행은 그리되 `▤ 세션`/행 클릭 disabled, 재개 명령 복사는 가능 |
| 파일 없음(같은 머신이지만 삭제·미생성) | `missing` — 위와 같이 disabled |
| 파일이 열린 뒤 삭제·회전 | tail reader가 read 오류를 폴링마다 재시도; drawer는 snapshot까지 유지 |
| `bd show` 실패 | `get-session-refs`는 빈 sessions, 구독은 빈 snapshot |
| 구 서버 + 새 번들 | `session_refs`·`get-session-refs` 부재 → `unknown_type`/키 없음은 기존 규약대로 무시, 행·버튼 생략 |
| 새 서버 + 구 번들 | 알 수 없는 키 무시 |
| 어댑터 파싱 실패 줄 | 생략, 다음 줄 계속 |
| 같은 세션을 두 drawer가 구독 | client id로 키를 잡으므로 reader 두 개 — 허용(attempt 구독과 같은 비용 모델) |

## 8. 비범위

- 세션 프로세스 생존 판정, 세션 종료 기록, 세션 transcript 백필.
- Worker attempt 행에 재개 명령 버튼 추가(attempt는 `↻ 이어하기`가 그 역할).
- Worker 탭에 세션 타일 추가(UI-yrzu §11 유지).
- 다른 머신 세션 파일의 원격 조회.
- Codex rollout의 `patch_apply_end`·`function_call`(명령 없음) 투영 — 생략으로 둔다.
- 이슈 상세 외 보드 카드(`board/card.js`)의 `session_ref` 표시.

## 9. 테스트 계획

서버
- `session-ref.test.js`: 파싱(정상·malformed 개별 생략·index 보존·빈 값) / host 첫
  라벨 비교(`.local` 접미·대소문자) / Claude 파일 탐색(fake fs: 여러 project 디렉터리
  중 매치) / Codex UUIDv7 → started_at → `codexRolloutFilePath` 호출 인자 / 비-v7 ID의
  최신순 날짜 스캔 상한 / 좁은 ID 정규식 위반 → `missing` / `resume_command` 두 provider.
- `session-ref-transcript.test.js`: Claude 필터(`isMeta`·`isSidechain`·비대상 type
  생략, user/assistant 통과) / Codex 표 각 행(pairing 있음·없음, output 배열/문자열,
  `function_call` cmd 추출, `task_complete`, 생략 목록) / snapshot→append 사이 pairing
  상태 공유.
- `runnable-cache.test.js`: `session_active[].session_refs` 투영, 키 부재 `[]`, 투영
  throw → `[]`.
- `worker-handlers.test.js`: `subscribe-session-log` session_ref 변형 — attempt_id 슬롯
  불일치/launch_id 동반/provider·ID 위반 `bad_request` / Bead의 session_ref에 없는 ID →
  빈 snapshot·파일 미조회(fs spy) / 일치 → snapshot lines + mtime, tail append push /
  unsubscribe·연결 종료 시 reader close / `get-session-refs` 정상·bd 실패·root_dir
  검증.

클라이언트
- `transcript-lines.test.js`: Claude user 문자열/텍스트 블록/`system-reminder` 제거/빈
  텍스트 생략/`tool_result`만 있는 user는 기존과 동일 / Codex `user_message` → `user` /
  reducer 활동 overlay가 `user`를 건너뜀.
- `transcript-drawer.test.js`: `session_ref` open → subscribe payload / `label`·
  `resume_command` bar 렌더와 복사 / `launch_id`+`session_ref` 거부 / `hide_prompt`.
- `utils/session-ref.test.js`: key·label·drawer input·live 판정 3분기.
- `monitor/lanes.test.js`: `session_refs` 전달, 비배열 → `[]`.
- `worker/running-grid.test.js`: 세션 타일 — current 있음 → `▤ 세션` 버튼·칩, `remote`/
  `missing` disabled + title, current 없음 → UI-yrzu §6 그대로 / Worker 타일 불변.
- `monitor/index.test.js`: 세션 타일 `▤ 세션` 클릭 → `drawer.open` 인자(attempt_id
  슬롯·session_ref·root_dir·meta.status).
- `session-history.test.js`: 세션 행 블록 순서(current → 과거 최신순 → attempt) / glyph·
  meta·time / disabled 규칙 / `⧉ 재개` 복사 / 빈 `session_refs`는 현행 출력과 동일
  (스냅샷).
- `detail-panel` 테스트: `metadata.session_ref` 있을 때만 `get-session-refs` 요청, 값
  변경 시 재요청, 실패 시 행 없음.

**advisory 수동 관측(acceptance 아님)**: 배포 뒤 이 세션(`session_ref`가 기록된
UI-4xzk 자신)의 타일과 상세에서 `▤ 세션`으로 drawer가 열리고 live append가 도착하는
것을 스크린샷으로 확인해 보고서에 첨부한다. 실패해도 머지·close 판정을 바꾸지 않는다.

## 10. 구현 unit 후보 (구속력 없음)

1. `server`: `session-ref.js` + `session-ref-transcript.js` + `runnable-cache.js` +
   `worker-handlers.js`/`connection.js` + `protocol.js`/`protocol.md` + 테스트.
2. `view`: `transcript-lines.js` + `transcript-drawer.js` + `utils/session-ref.js` +
   `running-grid.js`/`monitor/lanes.js`/`monitor/index.js` + `session-history.js`/
   `detail-panel/index.js` + `styles.css` + 테스트 + `npm run build`.

같은 리포, 같은 검증 번들이라 한 delegation으로도 충분하다.

## 11. 수용 기준

1. `session_ref`가 기록된 `in_progress` 이슈의 모니터 세션 타일에 provider·short ID
   칩과 `▤ 세션` 버튼이 있고, 클릭하면 기존 drawer가 그 세션 transcript를 snapshot으로
   열고 새 줄이 append로 도착한다(Claude·Codex 모두).
2. 이슈 상세 `세션 이력`에 세션 행이 attempt 행과 같은 껍데기로 있고, 행 클릭으로 같은
   drawer가 열리며 `⧉ 재개`가 provider별 명령을 복사한다.
3. drawer bar에 `⧉ 재개 명령`이 있고 사람 입력 턴이 `user` 라인으로 보인다; Worker
   attempt drawer의 출력은 바뀌지 않는다.
4. host 불일치·파일 없음·키 부재·malformed 항목이 §7 표대로 fail-quiet다.
5. 서버는 Bead의 `session_ref`에 없는 세션 ID로는 어떤 파일도 열지 않는다.
6. §9의 자동 테스트와 Pre-Handoff Validation(tsc/test/lint/prettier/build)이 통과한다.
