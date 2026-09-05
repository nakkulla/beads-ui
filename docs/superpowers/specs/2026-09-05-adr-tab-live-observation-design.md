---
scope:
  - server/adr/
  - server/ws/adr-handlers.js
  - server/ws/connection.js
  - app/views/adr/
  - app/views/nav.js
  - app/router.js
  - app/main.js
  - app/styles.css
  - app/protocol.md
---

# ADR 탭 — 워크스페이스별 ADR 현재표·이력·인덱스 drift·지침 인용 stale·후보 미실체화·교차 인용의 라이브 관측 표면 (UI-8uz7)

- Bead: `UI-8uz7`
- 기준 커밋: `625487fdc77d11fb6c51d1cce41eecaa0ec5a0f0`
- 선행: `dotfiles-em7q`(ADR 정합 체계, closed — 신호 정의와 체커 `--json` 계약을
  확정했다)
- 소유 스펙: dotfiles `docs/superpowers/specs/2026-09-02-adr-consistency-system-design.md`
  §7(신호 정의·체커 JSON 형식), `2026-08-25-card-header-grammar-unify-design.md`는
  적용되지 않는다(이 탭은 카드 렌더러를 쓰지 않는다)
- 출발점 목업: `~/tmp/mockups/2026-09-02-adr-overview.html`(2026-09-02 조사 페이지)

## 1. 문제

ADR 현황은 2026-09-02에 한 번 조사한 정적 페이지로만 볼 수 있다. 그 뒤 ADR이 갱신되고
스펙이 발행되고 AGENTS.md 인용이 바뀌어도 그 페이지는 그대로다. 사용자는 stale
ADR·후보 미실체화·지침 인용 stale을 지속 관측하고 싶어 하고, 공유 beads-ui 서버가
projectmgr 서비스로 상시 떠 있으므로 그 탭이 실시간 표면이 된다(2026-09-02 결정).

신호의 정의는 dotfiles 스펙 §7이 갖는다. 이 스펙은 그 신호를 **누가 언제 어떻게
계산해서 어떤 형태로 화면에 그리는지**만 정한다.

## 2. 검증된 전제

- 체커 세 개는 dotfiles가 이 머신에 설치한다: `$HOME/.claude/skills/adr/scripts/adr-index.py`,
  `$HOME/.claude/skills/adr/scripts/adr-cite-check.py`,
  `$HOME/.claude/skills/workflow/scripts/check-adr-candidates.py`. 이 리포의
  `repo-ops/script/verify`가 앞의 둘을 같은 경로로 이미 호출한다.
- `adr-index.py --dir <adr-dir> --check`: exit 0 정상, 1 검증 오류 또는 drift(stderr에
  사유), 2 usage. JSON 출력은 없다. frontmatter 규칙: 필수 키
  `id,title,status,date,summary`, 선택 키 `supersedes,superseded_by,superseded_by_note,spec,bead`,
  정수 키 `id,superseded_by`, 정수 리스트 `supersedes`, 상태 어휘
  `proposed|accepted|deprecated|superseded`, 값은 flat scalar(따옴표 선택, ` #` 뒤
  주석 제거).
- `adr-cite-check.py --repo <root> --json`: `{"ok": bool, "errors": [{kind, file, line,
  adr, detail}]}`, kind는 `missing|retired`. 기본 대상 `AGENTS.md`·`CLAUDE.md`·
  `docs/agents/*.md`. 교차 인용 구문 `ADR <repo>/NNNN`은 검사하지 않는다.
- `check-adr-candidates.py --spec <repo-relative> --adr-dir <dir> --json`: 같은 JSON 형식.
  `--spec`은 **cwd 기준** 상대 경로다. 관측된 kind: `section_missing`(이행 전
  스펙), `token_missing`, `adr_missing`, `adr_status`, `supersede_unapplied`, `usage`.
- 실측(2026-09-05, beads-ui 스펙 268개·ADR 38개): 후보 체커 스펙당 약 30ms(전체 8.4초),
  인용 체커 45ms, 인덱스 체크 37ms. dotfiles는 스펙 101개·ADR 63개·`docs/agents` 7개.
- 서버의 동기 투영 경로는 자식 프로세스를 띄우지 않는다(ADR 0026). 이 탭의 계산은
  전부 비동기 warm이며 bd를 읽지 않는다 — ADR 0008(bd CLI shell-out 데이터 계층)과
  별개의 파일 읽기 계층이다.
- 서버 셸은 `board|worker|monitor` 3탭이다(`app/router.js`·`app/views/nav.js`·
  `app/main.js`의 view 유니온). Monitor 채널은 `subscribe-monitor-pipeline`으로
  서버 전역 구독자 수에 따라 갱신 wiring을 올리고 내린다(`server/ws/monitor-handlers.js`).
- 문서 링크는 `GET /api/doc?workspace=<abs>&path=<rel>`이 `docs/` 아래 마크다운만
  1 MiB까지 서빙한다(`server/routes/doc.js`).
- 워크스페이스 집합은 Monitor와 같은 visible 워크스페이스다(`visible-workspaces-store.js`).

## 3. 사용자 결정 (2026-09-05)

1. 데이터 계층은 **체커 spawn + JS frontmatter 리더**다. 인덱스 drift·인용
   stale·후보 체크는 설치본 python 체커를 비동기로 spawn해 `--json`을 그대로
   소비하고, 현재 표·이력만 서버의 JS 최소 리더가 읽는다. 체커 규칙은 JS로
   복제하지 않는다.
2. 갱신 트리거는 **fs.watch + 지문 비교**다. 감시 경로군의 파일 지문이 바뀐 저장소만
   재계산하고, 안전망으로 `poll_interval_seconds`마다 spawn 없는 stat 스캔을 돈다.

## 4. 설계 원칙

- 사람 판정 열은 없다. 모든 값은 저장소 파일에서 결정적으로 계산된다(§7).
- 재료가 없는 절은 그리지 않는다(fail-quiet). 환경 오류는 그 저장소의 신호 절을
  한 줄로 대체하고 표는 그대로 그린다.
- 동기 경로 spawn 금지(ADR 0026). 계산은 워크스페이스당 in-flight 하나, 스폰 동시성
  상한 4.
- 계약 어휘(체커 JSON 형식·kind 어휘)는 코드의 registry 상수로 복제해 소비한다(ADR
  0012). 미지의 kind는 버리지 않고 `기타` 경고로 그린다.

## 5. 범위 1 — 서버 데이터 계층 (`server/adr/`)

### 5.1 frontmatter 리더 (`server/adr/adr-frontmatter.js`)

`readAdrFile(text, file_name)` → `{ ok: true, adr: AdrRecord } | { ok: false, error: string }`.

- 파일명 `^(\d{4})-.*\.md$`만 ADR이다. 파일 첫 줄이 `---`가 아니면 오류.
- §2의 키·타입·상태 어휘를 그대로 적용한다. 미허용 키·타입 불일치·필수 키 부재·
  미지 상태·파일명 번호와 `id` 불일치는 오류다. 검증 의미는 `adr-index.py`와 같지만
  이 리더가 판정하는 것은 **표를 그릴 수 있는가**뿐이다 — 전체 검증의 정본은
  `adr-index.py --check`이며 그 결과가 `index_drift`로 따로 실린다.
- `AdrRecord = { file, id, title, status, date, summary, supersedes: number[], superseded_by: number|null, superseded_by_note: string|null, spec: string|null, bead: string|null }`.

`readAdrDir(adr_dir)`(비동기) → `{ adrs: AdrRecord[], errors: { file, error }[] }`.

### 5.2 신호 계산기 (`server/adr/adr-signals.js`)

`createAdrSignals({ spawn, checker_paths, concurrency = 4 })`가
`computeWorkspace(root_dir, plan)` → `Promise<AdrWorkspace>`를 준다. `spawn`과
`checker_paths`는 테스트 주입점이고 기본은 `node:child_process.execFile`과 §2 경로다.
모든 spawn은 `cwd: root_dir`, 타임아웃 20초, `python3` 실행이다.

`plan`은 §5.3이 만든다: `{ full: true } | { full: false, specs: string[] }`. 계산 단계:

1. `readAdrDir` → `current`(status `accepted`)·`history`(그 외) — `id` 내림차순.
2. `adr-index.py --dir docs/adr --check` → `index_drift = { ok: exit === 0, detail }`.
   `detail`은 stderr 첫 줄(없으면 `null`). exit 2 또는 spawn 오류는 §8 환경 오류다.
3. `adr-cite-check.py --repo . --json` → `citations_stale = errors[]`(형식 그대로).
   `ok:false`인데 errors가 비면 `기타` 한 행.
4. `check-adr-candidates.py --spec <rel> --adr-dir docs/adr --json`을 `docs/superpowers/specs/*.md`
   각각에 돈다(`assets/` 등 하위 디렉터리 제외, `.md`만). `plan.full`이 아니면
   `plan.specs`만 다시 돌고 나머지는 직전 결과를 재사용한다. 결과는 스펙별
   `{ spec, ok, errors[] }`. 스펙 하나의 `usage` kind는 그 스펙 행의 환경 오류이고
   저장소 전체의 환경 오류가 아니다.
5. 교차 인용: `docs/adr/*.md`와 `docs/superpowers/specs/*.md` 본문을 서버가 직접 읽어
   `\bADR ([a-z][a-z0-9-]*)/(\d{4})\b`(cite-check와 같은 정규식)를 줄 단위로 찾는다.
   `{ file, line, repo, adr }`. 상대 저장소 상태 결합은 §6이 한다(계산기는 저장소
   하나만 안다).
6. `docs/adr`가 없는 저장소는 `adr_dir_missing: true`로 표만 비우고 체커를 돌리지
   않는다(신호 절 전부 생략).

### 5.3 지문·감시·재계산 선택 (`server/adr/adr-watch.js`)

`createAdrWatch({ root_dir, onChange, poll_interval_ms, debounce_ms = 500 })`.

- 감시 경로군: `docs/adr/`(README 포함), `AGENTS.md`, `CLAUDE.md`, `docs/agents/`,
  `docs/superpowers/specs/`. 존재하는 것만 `fs.watch(..., { recursive: true })`로
  건다(macOS·Linux 모두 recursive 지원, 실패 시 poll만으로 fail-quiet).
- 지문은 경로군 안 파일의 `상대경로\0mtimeMs\0size` 정렬 집합의 해시다. 이벤트는
  debounce 후 지문을 다시 만들어 **바뀐 파일 목록**을 낸다. 같은 지문이면 무시한다.
- `onChange(plan)`: 바뀐 파일이 `docs/superpowers/specs/*.md`뿐이면
  `{ full: false, specs: [...] }`(그 스펙의 후보 체크와 교차 인용만), 하나라도
  `docs/adr/`·`AGENTS.md`·`CLAUDE.md`·`docs/agents/`에 걸리면 `{ full: true }`.
  스펙 삭제는 `specs`에 담기고 계산기는 부재 스펙의 직전 결과를 버린다.
- 안전망: `poll_interval_ms`마다 같은 지문 계산(spawn 없음). fs.watch가 놓친 변경을
  최대 한 주기 뒤에 잡는다.
- 계산 중 새 변경이 오면 plan을 합쳐(`full`이 이김) 끝난 뒤 한 번 더 돈다.
  in-flight는 저장소당 하나다.

## 6. 범위 2 — WS 채널 (`server/ws/adr-handlers.js`)

- 신규 op `subscribe-adr` / `unsubscribe-adr`(응답 `ok`), 서버 push `adr-snapshot`.
  `connection.js` 분기 두 개와 `app/protocol.md` 절 하나가 추가된다.
- 첫 구독자가 생기면 visible 워크스페이스마다 §5.3 watch를 올리고 `{ full: true }`로
  첫 계산을 시작한다. 계산 전에도 `computing: true`인 빈 스냅샷을 즉시 push한다.
  마지막 구독자가 빠지면 watch·타이머·캐시를 내린다(monitor 채널의 구독자 수
  wiring과 같은 모양). visible 집합 변경(`set-workspace-visibility`)은 추가된
  저장소를 올리고 빠진 저장소를 내린다.
- push 페이로드 `{ workspaces: AdrWorkspaceView[] }`, 저장소 순서는 Monitor와 같다.

```
AdrWorkspaceView = {
  root_dir, name,                      // name = path.basename(root_dir)
  computing: boolean, computed_at: number | null,
  env_error: string | null,            // §8
  adr_dir_missing: boolean,
  current: AdrRecord[], history: AdrRecord[],
  frontmatter_errors: { file, error }[],
  index_drift: { ok: boolean, detail: string | null } | null,
  citations_stale: CheckerError[],
  candidates: { spec, ok, errors: CheckerError[] }[],
  cross_citations: { file, line, repo, adr, target: { root_dir, status } | null }[]
}
CheckerError = { kind, file, line: number|null, adr: number|null, detail }
```

- `cross_citations[].target`은 핸들러가 채운다: `repo`와 `name`이 같은 visible
  저장소의 최신 스냅샷에서 `current ∪ history`의 `id === adr`을 찾으면
  `{ root_dir, status }`, 그 저장소가 없거나 그 번호가 없으면 `null`. 상대
  저장소 스냅샷이 갱신되면 이쪽 view도 다시 push한다(재계산 없음, 결합만).
- 계산기 결과는 저장소별 캐시에 남고 push는 저장소 하나가 끝날 때마다 전체
  `workspaces`를 보낸다(클라이언트는 교체 렌더).

## 7. 범위 3 — 프론트 탭 (`app/views/adr/`)

- 라우터 view 유니온에 `'adr'`을 더한다(`#/adr`). `nav.js`에 네 번째 탭 `ADR`을
  Monitor 탭 오른쪽에 둔다. `main.js`는 `adr_root.hidden = s.view !== 'adr'`로
  마운트하고, 탭이 보일 때만 `subscribe-adr`, 벗어나면 `unsubscribe-adr`.
- 상단 툴바(목업 그대로): 저장소 필터 버튼(`전체` + 저장소 이름별, `aria-pressed`),
  검색 `input[type=search]`(번호·제목·summary·spec·bead 부분 일치), 정렬 토글
  `stale 우선`(기본 on: 신호가 하나라도 붙은 ADR 행이 위, 그 안에서는 번호
  내림차순). 다크·라이트는 앱의 기존 테마를 그대로 쓴다 — 탭 전용 테마 버튼은
  두지 않는다.
- 저장소 섹션(`<section data-repo>`): 헤더 `h2 = name`과 카운트 칩 —
  `현재 유효 N` · `인덱스 drift`(ok:false일 때만) · `인용 stale N` · `후보 미실체화 N`
  (`adr_missing`+`supersede_unapplied`+`adr_status`) · `토큰 없음 N`(`token_missing`) ·
  `이행 전 스펙 N`(`section_missing`, 관찰) · `교차 인용 N` · `계산 중`/`갱신 HH:MM:SS`.
  0인 칩은 그리지 않는다.
  1. **현재 유효한 결정** 표: 번호 · 제목(파일 링크) · 날짜 · summary · spec(링크) ·
     bead(`#/board?issue=<id>` 링크) · 신호 칩. 신호 칩은 그 ADR 번호에 붙는
     `citations_stale`(retired)·`candidates`(`adr` 필드 일치)·`frontmatter_errors`·
     `cross_citations`(이 ADR을 가리키는 상대 저장소 인용 수)에서 만든다.
  2. **이력**: 접기(`<details>`, 기본 접힘) 안에 번호 · 제목 · 상태 · 대체(`superseded_by`).
  3. **인덱스 drift**: `ok:false`일 때만 `detail` 한 줄.
  4. **지침 인용 stale**: 행 `file:line · ADR NNNN · kind · detail`, file은 문서 링크.
  5. **후보 미실체화·토큰 없는 후보 절**: 스펙별 그룹. 경고 kind(`adr_missing`·
     `supersede_unapplied`·`adr_status`·`token_missing`·미지 kind)는 펼친 채,
     `section_missing`만 있는 스펙은 `이행 전 스펙 N`으로 접힌 목록에 넣는다.
     `usage`는 그 스펙 행에 `환경` 표기.
  6. **교차 인용**: 행 `file:line → ADR <repo>/NNNN` + 상대 상태 칩(`accepted`는
     녹색, `superseded`·`deprecated`·`proposed`는 경고색, `target:null`은 회색
     `미확인`).
  재료가 빈 절은 그리지 않는다. `env_error`가 있으면 3~6 대신 `환경 · <문장>` 한 줄.
- 문서 링크는 `/api/doc?workspace=<root_dir>&path=<docs 상대경로>`를 새 탭으로 연다.
  `AGENTS.md`·`CLAUDE.md`처럼 `docs/` 밖 파일은 링크 없이 문자만 보인다(`/api/doc`
  범위를 넓히지 않는다).
- 스타일은 `app/styles.css`에 `.adr-` 접두로 더하고 토큰은 Monitor 테마 변수를
  재사용한다. 모바일 폭에서는 표가 `overflow-x: auto` 컨테이너 안에서 스크롤한다.

## 8. 에러·경계

- 환경 오류(`env_error`): `python3` 부재, 체커 파일 부재, spawn 실패, exit 2, 타임아웃.
  문장은 `<체커 파일명>: <원인>`. 그 저장소의 §5.2 2~4단계 결과는 비우고 표·교차
  인용은 그린다. 다음 지문 변경이나 poll에서 다시 시도한다.
- 체커 stdout이 JSON이 아니면 그 체커만 `env_error`로 취급한다(다른 체커 결과는 유지).
- `docs/superpowers/specs`가 없으면 `candidates: []`, 후보 절 생략.
- 저장소 이름 충돌(같은 basename 두 개)은 첫 번째만 교차 인용 target 후보이고 둘째
  섹션 헤더에 `이름 중복` 표시.
- fs.watch가 `EMFILE`·`ENOSPC`로 실패하면 poll만으로 동작하고 서버 로그에 한 번 남긴다.
- 클라이언트 재연결 시 `subscribe-adr`를 다시 보내고 마지막 스냅샷을 즉시 받는다.
- 이 탭은 아무것도 쓰지 않는다 — bd·파일·kv 어디에도.

## 9. 문서 갱신

- `app/protocol.md`에 `## ADR channel (UI-8uz7 §6)` 절: op 둘, push 형태, 갱신 규칙.
- `AGENTS.md`에는 더하지 않는다 — 탭 배치 문법(카드 렌더러)과 무관하고 새 계약 키가
  없다.

## 10. 검증 bundle

| 파일 | 고정하는 것 |
| --- | --- |
| `server/adr/adr-frontmatter.test.js` | 정상 파일·따옴표 값·` #` 주석·정수 리스트 `supersedes`·`superseded_by` 정수; 미허용 키·필수 키 부재·미지 status·파일명-`id` 불일치·frontmatter 없음이 오류; `readAdrDir`가 비-ADR 파일명을 건너뛴다 |
| `server/adr/adr-signals.test.js` | 주입 spawn으로 세 체커 호출 인자(`cwd`, `--spec` 상대경로, `--json`)와 결과 조합; `plan.specs` 부분 재계산이 나머지 결과를 재사용하고 삭제 스펙을 버린다; 동시성 상한 4; exit 2·spawn 오류·비JSON·타임아웃 → `env_error`(다른 체커 결과 유지); `usage` kind는 스펙 행 국소; `docs/adr` 부재 → `adr_dir_missing`·spawn 0회; 교차 인용 추출 정규식·줄 번호 |
| `server/adr/adr-watch.test.js` | 지문이 같으면 `onChange` 없음; 스펙만 변경 → `{full:false, specs}`; `docs/adr`/`AGENTS.md`/`docs/agents` 변경 → `{full:true}`; debounce 병합; poll 안전망; fs.watch 실패 시 poll 동작; 해제 시 타이머·watcher 정리 |
| `server/ws/adr-handlers.test.js` | 첫 구독에 `computing:true` 즉시 push와 계산 시작; 마지막 해제에 watch 내림; visible 변경 반영; `cross_citations[].target` 결합(있음·번호 없음·저장소 없음)과 상대 저장소 갱신 시 재push; 재구독 시 캐시 즉시 push; 이 경로가 `bd`를 부르지 않는다 |
| `app/router.test.js` | `#/adr` → view `'adr'`, 왕복 직렬화 |
| `app/views/adr/index.test.js` | 저장소 필터·검색·`stale 우선` 정렬; 카운트 칩 0 생략; 신호 칩이 ADR 번호로 결합; `section_missing`만 있는 스펙이 접힌 목록으로; `env_error` 한 줄 대체; 교차 인용 상태 칩 세 색; 문서 링크 URL과 `docs/` 밖 파일 무링크 |
| `app/main.*.test.js`(기존 view-sync 계열에 추가) | 탭 진입에 `subscribe-adr`, 이탈에 `unsubscribe-adr` |
| `app/protocol.test.js` | 신규 op·push 이름이 문서와 일치 |
| Pre-Handoff | `npm run tsc` · `npx vitest run --reporter=dot` · `npm run lint` · `npm run prettier:write` → `npm run build`(bundle·map 포함) |
| 배포 후 | `bdui-shared restart` 뒤 tailnet IP `/healthz` SHA와 `#/adr`에서 beads-ui·dotfiles 두 섹션이 실제 파일 상태로 그려지는 스크린샷 |

## 11. 구현 unit 후보

1. `server/adr/adr-frontmatter.js` + `adr-signals.js` + `adr-watch.js` — §5 전부와
   그 테스트.
2. `server/ws/adr-handlers.js` + `connection.js` + `app/protocol.md` — §6·§9.
3. `app/views/adr/index.js` + `router.js` + `nav.js` + `main.js` + `styles.css` — §7.

## 12. 경계·후속

- 관찰: `adr-index.py`에 `--json` 덤프가 생기면 §5.1 JS 리더를 그 출력 소비로 바꿀
  수 있다 — dotfiles 소유이며 지금은 필요하지 않다(리더 규칙이 §2에 고정돼 있다).
- 관찰: `/api/doc`은 `docs/` 아래만 서빙하므로 `AGENTS.md` 인용 stale 행은 링크가
  없다. 범위 확장은 path-safety 계약 변경이라 이 스펙이 다루지 않는다.
- 결정: 체커 규칙(R1·R5·R6)은 JS로 복제하지 않는다 — 정의는 dotfiles가 소유하고
  이 탭은 `--json`의 소비자다. 규칙이 바뀌면 설치본 갱신만으로 탭이 따라간다.

## 결정 (ADR 후보)

- 전제: ADR 0026 — 동기 투영 경로는 자식 프로세스를 띄우지 않는다(§5.2 계산은 전부
  비동기 warm, §5.3 poll 안전망은 spawn 없는 stat 스캔).
- 전제: ADR 0012 — 계약 어휘는 코드의 registry로 복제해 소비한다(체커 JSON 형식과
  kind 어휘를 상수로 두고 미지 kind는 `기타`로 그린다).
- 전제: ADR 0008 — bd 데이터 계층은 bd CLI shell-out이다(이 탭은 bd를 읽지 않으므로
  그 계층을 건드리지 않는다).
- 전제: ADR dotfiles/0045 — 결정은 ADR에만 살고 인용 ADR이 accepted가 아니면
  stale이다(§5.2의 신호 의미는 이 결정을 그대로 소비한다).
- ADR 탭의 신호는 dotfiles가 설치한 체커(`$HOME/.claude/skills/...`)를 서버가
  runtime에 spawn해 `--json`으로 소비하고, 체커 규칙을 JS로 복제하지 않으며, 현재
  표·이력만 서버의 JS frontmatter 리더가 읽는다. **되돌리기 어렵다**: 규칙 복제로
  바꾸면 R1·R5·R6이 바뀔 때마다 두 저장소를 맞춰야 하는 이중 정의가 생긴다.
  **맥락 없이는 의외다**: beads-ui 서버가 `$HOME/.claude/skills` 아래 python을
  실행하는 이유는 코드만 읽어서는 알 수 없다(ADR 0012의 "계약 파일을 런타임에 읽지
  않는다"와 나란히 놓이면 더 그렇다 — 읽는 것은 계약 파일이 아니라 설치된 도구의
  출력이다). **trade-off가 실재한다**: 대안(전부 JS 재구현, python -c 리더 import)은
  각각 정의 이중화와 내부 함수명 결합을 대가로 spawn을 없앤다. `summary`: "ADR 탭
  신호는 설치본 체커를 runtime spawn해 --json으로 소비하고 규칙을 JS로 복제하지
  않으며 현재 표만 JS frontmatter 리더가 읽는다" → ADR
- ADR 채널이 bd 스냅샷 코디네이터와 별개이고 파일 지문 변경에만 재계산한다 — ADR
  0026·0008의 적용이며 되돌리기 쉬운 구현 선택이다 → ADR 아님.
- 네 번째 탭 `#/adr`과 툴바 배치 — 표시 어휘이며 목업이 정한 출발점이다 → ADR 아님.
