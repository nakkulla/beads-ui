# 이슈 상세 패널 댓글·작업 보고서 섹션

- Bead: UI-ucq6 · Route: spec_backed · Base: main
- 출처: dotfiles/dotfiles-ygcy (split 단위)
- 작성일: 2026-08-04

## 배경 (실측, 2026-08-04)

dotfiles-ygcy가 워크플로우 계약에 완료 보고서 마감 단계를 신설했고 PR #339가
2026-08-04T02:04:22Z에 `main`으로 머지됐다. 세션 레인과 worker 레인이 작업을
마칠 때 진행 경과·설계 판단·검증 결과·남은 위험을 bd 댓글로 남긴다.

보고서는 DB에 정상 기록된다. 실측 사례 — `Analysis-ex0` 댓글
`019fcaa7-73d5-7528-a804-9b797cea0a64`, `dotfiles-ygcy` 댓글
`019fca82-62a0-75d8-a494-b47b13307a13`. 둘 다 세션 레인이다.

그런데 beads-ui 어디에서도 보이지 않는다. 서버 배선은 이미 있다 —
`handleGetComments`/`handleAddComment`(`server/ws/mutation-handlers.js:683,706`),
라우팅(`server/ws/connection.js:416,419`), 서버 테스트(`server/ws.comments.test.js`),
프로토콜 등록(`app/protocol.js:59-60`). **프론트엔드만 없어서 `get-comments`를
보내는 코드가 0건이다.**

`app/styles.css:2223`에 `.comments`/`.comment-item`/`.comment-header`/
`.comment-author` 스타일이 남아 있다. `255845f feat: add comments to issue detail
view`가 만든 것이고, `4185525 beads-ui 전면 재설계: Board/Worker 2탭 관제탑 UI
(UI-lo1k)`에서 프론트엔드가 재작성되며 소비자만 사라졌다.

## 계약 소유권

보고서 마커·목차의 canonical 정의는 dotfiles `docs/contracts/workflow.yaml`
`completion_report`다. beads-ui는 그 계약의 **소비자**이며 정의자가 아니다
(`AGENTS.md`). 이 단위는 정의를 바꾸지 않는다.

## 변경 1 — 마커 파싱 (`app/utils/report-marker.js`, 신규)

순수 함수 `parseReport(text)`. 계약 소비 경계를 파일 하나로 고정한다 — 계약이
바뀌면 여기만 바뀐다.

인식은 **앵커와 메타 줄 동시 일치**다(`marker.detection_requires`). 하나라도
어긋나면 `null`을 반환하고 호출부가 일반 댓글로 렌더한다. 부분 인식은 없다 —
앵커만 보는 소비자는 계약이 「일반 댓글」로 분류하는 것까지 보고서로 인정하게
된다.

| 요소 | 정규식 | 위치 |
| --- | --- | --- |
| 앵커 | `^## 🤖 작업 보고서$` | 댓글 첫 줄 |
| 메타 | `^> (worker · attempt\|session · sid) [A-Za-z0-9._-]{1,64} · \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$` | 앵커 바로 다음 줄 |
| 결론 | `^\*\*결론\*\* — .+$` | 메타 뒤 첫 비어있지 않은 줄 |

- 구분자는 정확히 ` · `이고, 레인과 식별자 종류는 **고정 쌍**이다
  (`worker`↔`attempt`, `session`↔`sid`). `worker · sid` 같은 교차 조합은 문법
  위반이므로 일반 댓글이다
- 결론 미리보기는 `**결론** — ` 접두를 떼고 연속 공백을 접는다
  (`preview_extraction`)
- 반환: `{ lane, identifier, timestamp, conclusion, body }` 또는 `null`

## 변경 2 — 댓글 섹션 (`app/views/detail-panel/comments.js`, 신규)

`session-history.js`와 같은 모양의 lit-html 템플릿 함수
`commentsTemplate(comments, handlers, view)`.

**배치**: `descTemplate` 다음, `notesTemplate` 앞(`index.js:1052-1053`). 요청 바로
뒤에 결과가 붙어 읽히고, 머지 판단 자료가 라벨·의존성 아래로 밀리지 않는다.

**헤더**: `댓글 (N)`. 섹션은 항상 펼쳐 둔다.

**정렬**: `created_at` 역순(최신 위).

**보고서 항목**: `▸ 🤖 작업 보고서 · session 5ac8ab71 · 08-04 02:43` 한 줄과 그
아래 결론 미리보기 한 줄. 가운데 조각은 파싱한 `lane`과 `identifier`를 공백으로
이어 쓴다 — 메타 줄의 ` · ` 구분자는 계약 문법이지 표시 형식이 아니므로 헤더에서
반복하지 않는다. 클릭하면 펼쳐 `renderMarkdown()`
(`app/utils/markdown.js`)으로 전문을 렌더한다 — 이 함수는 문자열을 바로 렌더하므로
md 뷰어의 `docs/` 경로 제약을 타지 않는다. 접힘 상태는 댓글 id의 `Set`으로 관리하며
`index.js`의 `usage_expanded`와 같은 패턴이다. 긴 `attempt_id`는 잘라 표시하고
전체는 `title`에 둔다.

접힘 단위를 개별 보고서로 둔 이유: 원 스펙이 걱정한 것은 "6절짜리 서술문이 라벨·
의존성·워크플로우·Artifacts를 화면 밖으로 밀어낸다"였고, 그것은 보고서 접힘만으로
해소된다. 섹션 전체를 접으면 짧은 사람 댓글까지 함께 숨는다.

**일반 댓글**: `<author> · MM-DD HH:MM`과 본문. 접힘은 없지만 렌더는 마찬가지로
`renderMarkdown()`을 쓴다. 사람이 쓴 댓글에도 코드 조각이나 목록이 들어가는데
한쪽만 평문으로 두면 같은 목록 안에서 렌더가 갈린다.

**빈 상태 — 원 스펙과 갈리는 지점**: 원 스펙은 "댓글이 0건이면 섹션 자체를
렌더하지 않는다(fail-quiet)"고 했다. 그것은 읽기 전용 전제에서 나온 규칙이고, 이
단위는 작성 기능을 포함하므로 0건에서 섹션이 사라지면 첫 댓글을 쓸 방법이 없어진다.
따라서 0건에서도 섹션을 렌더하되 `session-history`의 관례대로 `detail-empty`로
"댓글 없음"을 표시하고 입력창을 둔다.

**작성 UI**: 섹션 하단에 textarea와 `[댓글 추가]`. 전송 중 비활성, 성공 시 입력을
비우고 **응답 payload로 목록을 교체**하며(재요청하지 않는다 — 아래 변경 3), 실패는
`showToast`(`app/utils/toast.js`, `index.js:4`에서 이미 임포트)로 알리고 입력은
지우지 않는다. 빈 문자열은 서버가 이미 거부하므로
(`mutation-handlers.js`의 `text.trim().length === 0`) 프론트는 버튼 비활성만 맞춘다.

**스타일 잔해 제거**: `app/styles.css`의 `/* Comments section */` 블록
**전체(2223–2286행)** 를 제거한다 — `.comments`·`.comment-item`·`.comment-header`·
`.comment-author`·`.comment-date`·`.comment-text`·`.comment-input`·
`.comment-input textarea`·`.comment-input textarea:focus`·`.comment-input button`
열 개이며, grep 결과 소비자는 모두 0이다. 블록은 2287행 `/* --- Delete Issue
Button --- */` 직전에서 끝난다. 재설계 때 소비자가 사라진 죽은 코드이고, 같은 기능
영역에 이름이 겹치는 두 벌을 남기면 다음 사람이 어느 쪽이 살아있는지 파일을
열어봐야 한다. `.comment-input` 계열은 작성 UI 스타일이지만 구 토큰
(`--panel-bg` 등) 기반이라 재사용하지 않는다.

## 시각 설계

`app/styles/tokens.css`의 기존 토큰만 쓴다. **신규 색·간격·폰트 크기를 만들지
않는다.** 이 섹션은 관제탑 상세 패널 안의 한 블록이지 독립 화면이 아니다.

클래스는 `detail-*` 체계를 따른다 — 목록 `.detail-comments`, 보고서
`.detail-report`(+`__head`/`__tri`/`__glyph`/`__meta`/`__kind`/`__lane`/`__time`/
`__concl`/`__body`), 사람 댓글 `.detail-comment`(+`__meta`/`__author`/`__time`/
`__body`), 작성 `.detail-comment-compose`.

**형태로 종류를 가른다.** 보고서는 카드(`--bg-card` + `--border-card` +
`--r-6`), 사람 댓글은 카드 없이 왼쪽 2px `--border-card` 선만. 배지 칩 없이도 6절
짜리 기계 산출물과 한 줄짜리 사람 메모가 한눈에 갈린다.

**결론이 카드에서 가장 큰 글자다.** 「작업 보고서」 제목은 `--fs-caption` /
`--text-dim`으로 눌러 메타 줄에 붙이고, 결론을 `--fs-body` / `--text-primary`로
올린다. 접힌 상태에서 읽어야 하는 문장은 결론 하나뿐인데, 제목을 키우면 카드마다
똑같은 「작업 보고서」가 크게 반복되고 정작 서로 다른 내용이 작게 깔린다.

**🤖는 글리프 자리에 둔다.** `.detail-session__glyph`가 이미 상태를 한 글자로
말하는 관례이므로 같은 위치를 쓴다. 새 배지 칩을 만들면 라벨 칩 체계와 경쟁한다.

**레인 색은 worker만.** `worker`는 `--text-id-mono`(청록), `session`은
`--text-dim` 중립. 무인 실행이 먼저 눈에 들어와야 한다. 새 색은 만들지 않는다.

**접힘 어포던스**는 `▸`/`▾`, `--text-dim`. 카드 헤더 전체가 버튼이고
`aria-expanded`를 갖는다. 포커스 링은 `--text-id-mono`, `outline-offset: -2px`.

**펼친 본문**은 상단 `--border-card` 구분선 하나로 헤더와 나눈다. 마크다운 `h2`는
섹션 라벨과 같은 대문자 캡션(`--fs-chip` / `--text-dim` / `letter-spacing: .05em`)
으로 눌러 6절이 섹션 헤더보다 튀지 않게 한다.

**모바일**(≤480px)에서는 시각을 `margin-left: auto`로 밀지 않고 메타 줄에
같이 흐르게 한다.

시각 확인용 목업(2026-08-04, 라이트·다크 전환 및 3개 상태 포함):
`~/tmp/mockups/2026-08-04-detail-panel-comments.html`.

## 변경 3 — 데이터 흐름 (`app/views/detail-panel/index.js`)

이슈를 선택하면 `ws.send('get-comments', { id })`로 1회 가져온다(`app/ws.js:224`의
`send(type, payload)`는 상관된 응답을 Promise로 돌려준다). 댓글은 이슈 스냅샷에
실려 오지 않는다.

이후 **이슈 스냅샷의 `comment_count`가 직전 값과 달라지면 재요청한다.**
`server/list-adapters.js:137,242,480`이 bd 출력을 `...it` 스프레드로 그대로
넘기므로 그 필드는 이미 클라이언트에 도달한다(`bd list --json`과
`bd show --json` 항목 키에 `comment_count` 존재 확인).

**외부 쓰기(worker 세션)의 갱신 발화 근거**: central dolt 서버 모드에서 원격
`bd` 쓰기는 로컬 fs watcher에 잡히지 않는다. 그래서 서버가 이미 주기 폴러를 둔다
— `server/index.js:89-97`이 `poll_interval_seconds`(현재 30초) 간격으로,
클라이언트가 하나라도 붙어 있는 동안 watcher가 돌렸을 같은 list refresh를
재실행한다(`server/poller.js`). 따라서 worker가 쓴 보고서는 **새 구독을 만들지
않고** 그 기존 폴러가 스냅샷을 갱신할 때 `comment_count` 변화로 감지된다. 지연
상한은 그 폴링 간격이다.

**작성 후 갱신은 다른 경로다.** `handleAddComment`는 `bd comment` 성공 뒤
`bd comments <id> --json`을 다시 돌려 **갱신된 댓글 배열 전체를 ok 응답 payload로
반환한다**(`server/ws/mutation-handlers.js:743-751`). 따라서 작성 성공 시 그
payload로 목록을 교체하고, `get-comments`를 재요청하지 않는다. 낙관적 갱신도 두지
않는다. `handleAddComment`는 12개 mutation 핸들러 중 유일하게
`triggerMutationRefreshOnce()`를 호출하지 않으므로 `comment_count` 감지 경로에
기대서는 안 된다 — 자기 작성이 화면에 반영되지 않는다.

이슈를 바꾸면 댓글 상태(목록·접힘·입력)를 초기화한다(`load()`의 `current_id`
변경 분기).

## 변경 4 — worker argv 가드 (`server/worker/runner/claude.test.js`)

원 스펙 F8이 이 단위에 부착한 회귀 검증이다. 원 스펙의 "worker 세션이 전역 지시와
`workflow` 스킬을 그대로 로드한다"는 판단은 **"launch argv에 축소 플래그가 없다"는
관측 하나에 의존**하는데 그것을 지키는 검사가 없었다.

`claudeSpec().buildArgv()`(`server/worker/runner/claude.js:288`)는 순수 함수로
노출돼 있다. 그 결과 argv에 `--setting-sources`·`--tools`·`--strict-mcp-config`·
`--allowedTools`가 없음을 단언한다. 축소 플래그가 도입되면 빨간불이 되고, 그것이
보고서 의무를 preamble로 옮길지 판단할 신호가 된다.

이 가드가 증명하는 것은 "스킬이 로드된다"가 아니라 "로드를 막는 플래그가 없다"이다.
end-to-end 실측은 아래 실행 레인이 담당한다.

## 실행 레인

이 단위의 **구현은 worker 레인에 디스패치한다.** 그 worker 세션이 남기는 보고서가
F8의 end-to-end 실측이 된다 — 현재 worker 레인 보고서는 한 번도 관측된 적이 없다
(beads-ui 워크스페이스에 댓글을 가진 이슈 0건).

### 머지 후 작업의 수행 주체

worker 세션은 PR Delivery에서 끝나고 beads-ui 머지 클릭 스윕은 세션이 없다.
따라서 머지 후 작업은 **수행 주체를 명시하지 않으면 유실된다** — 머지 클릭이 Bead를
`closed`로 만든 뒤 조용히 사라진다. 두 갈래로 나눠 처리한다.

**재시작은 자동이다.** beads-ui에는 root `deploy.json`이 없지만
`~/.config/bdui/config.toml`의 `[worker.deploy."<beads-ui 경로>"]`가
`cmd = ["bdui-shared", "restart"]`, `detached = true`로 등록돼 있어 머지 클릭
배포 훅이 실행한다. 수동 단계가 아니다.

**육안 확인은 자동이 아니다.** 재시작된 서버에서 보고서가 실제로 렌더되는지, 그리고
worker 자신의 보고서로 F8 end-to-end 실측이 닫히는지는 어떤 훅도 하지 않는다.
그래서 이 작업을 **`UI-pvkj`로 분리해 durable하게 등록했다**(`deferred_required`,
`route=spec_backed`). `UI-pvkj`는 `blocks: UI-ucq6` 엣지를 갖고 있어 이 단위가
닫히기 전에는 `bd ready`에 뜨지 않는다 — worker가 머지 전에 집어가 반드시 실패하는
확인을 시도하는 일을 막는다.

이 단위 자체의 완료 기준은 PR Delivery까지이며, 런타임 확인의 완료 기준은
`UI-pvkj`가 소유한다(`AGENTS.md` Post-Merge Runtime Validation).

## 엣지 케이스

- **앵커만 일치**: 메타 줄이 규격을 벗어나면 일반 댓글로 렌더된다. 긴 마크다운이
  그대로 보이므로 정보 손실은 없다
- **앵커가 첫 줄이 아님**: 보고서가 아니다(`anchor_position: comment_first_line`)
- **레인↔식별자 교차 조합**: 문법 위반이므로 일반 댓글
- **결론 줄 없음**: 앵커와 메타가 맞으면 보고서로 인식하되 미리보기는 비운다.
  헤더 줄은 그대로 남으므로 펼쳐 읽을 수 있다
- **한 이슈에 보고서 여러 건**: 계약이 실행 단위마다 하나씩 누적되도록 보장한다
  (`duplicate_guard: one_report_per_run_identifier`). UI는 시간 역순으로 모두
  나열한다
- **`get-comments` 실패**: 섹션은 렌더하되 목록 자리에 실패를 표시한다. 이슈 상세
  나머지는 영향받지 않는다
- **`comment_count` 부재**: 구 서버나 예기치 못한 응답에서 필드가 없으면 자동
  재요청만 멈추고 최초 1회 fetch는 그대로 동작한다(fail-quiet)

## 범위 밖

- 댓글 편집·삭제 — 서버 핸들러가 없고 이 단위의 목적(머지 판단 자료 읽기)과 무관
- 마커·목차 정의 변경 — dotfiles `docs/contracts/workflow.yaml` 소유
- 보고서 검색·필터·이슈 목록 카드의 보고서 배지
- `subscribe-comments` 같은 실시간 푸시 구독 — `comment_count` 감지로 충분하고
  서버·프로토콜·테스트가 함께 늘어난다

## Test scope

| 파일 | seam |
| --- | --- |
| `app/utils/report-marker.test.js` (신규) | 정상 인식 · 앵커만 일치 · 메타 규격 위반 · 앵커가 첫 줄이 아님 · 레인↔식별자 교차 조합(`worker · sid`) · 결론 추출과 공백 접기 · 결론 줄 부재 |
| `app/views/detail-panel/comments.test.js` (신규) | 0건 빈 상태 · 보고서와 일반 댓글 혼재 정렬 · 접힘 토글과 `aria-expanded` 반영 · 인식 실패 댓글이 일반 댓글로 렌더 · 작성 전송과 입력 비우기 · 빈 입력 시 버튼 비활성 |
| `app/views/detail-panel/index.test.js` (추가) | `comment_count` 변화 시 재요청 · 불변 시 미요청 · 이슈 전환 시 상태 초기화 |
| `server/worker/runner/claude.test.js` (추가) | **회귀 가드 (도입 시 GREEN, RED 선행 없음)** — `buildArgv()` argv에 축소 플래그 부재 |

앞의 세 행은 RED 선행 seam이다 — `report-marker.js`와 `comments.js`는 신규
모듈이라 테스트가 대상 없이 실패하고, `index.test.js`의 세 항목은 현재 코드에
`comment_count` 감지 자체가 없어 실패한다.

**네 번째 행만 성격이 다르다.** `buildArgv()` 실측 결과 현재 argv는
`-p --output-format stream-json --verbose [--resume] [--model] [--effort]
--permission-mode bypassPermissions`뿐이고 축소 플래그 네 종은 오늘 이미 없다.
따라서 이 단언은 도입 시점에 GREEN이며 RED를 만들 수 없다 — 목적이 회귀 방지이지
미구현 동작의 구현이 아니기 때문이다. `tdd`의 RED-first 규율은 이 행에 적용되지
않으며, 그 예외를 여기에 명시적으로 기록한다.

## 검증

이 단위(PR Delivery까지)의 검증:

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write`
- `npm run build` 후 갱신된 `app/main.bundle.js`·`app/main.bundle.js.map` 포함

머지 후 런타임 검증(재시작 후 프로세스 경로·포트·HTTP 응답, 보고서 실제 렌더,
worker 보고서 F8 실측)은 **`UI-pvkj`가 소유한다** — 위 「머지 후 작업의 수행 주체」
참조. 재시작 자체는 config.toml deploy 훅이 자동 실행한다.

## 남은 위험

- **worker 레인 보고서 미관측**: 파서의 `worker · attempt` 분기는 계약 정규식만을
  근거로 작성된다. 실측 사례는 세션 레인 2건뿐이다. 실행 레인을 worker로 잡은 것이
  이 위험에 대한 대응이고, 관측 자체는 `UI-pvkj`에서 닫는다
- **argv 가드의 한계**: "로드를 막는 플래그가 없다"만 증명한다. 축소 플래그 없이도
  스킬 로딩이 깨지는 경로(스킬 파일 자체의 문제, 설정 경로 변경)는 잡지 못한다
- **`comment_count` 전달은 코드 근거**: `...it` 스프레드와 `bd show --json` 키
  존재로 확인했으나 런타임 실측은 구현 시점에 한다. 부재 시 fail-quiet으로 최초
  1회 fetch는 유지된다
- **폴링 발화의 런타임 미확인**: 외부 쓰기 감지가 `server/index.js:89-97`의 주기
  폴러에 의존한다는 것은 코드 근거다. 그 폴러가 실제로 `comment_count` 변화를 실은
  스냅샷을 밀어주는지는 구현 시점에 실측한다. 미발화로 판명되면 이슈 재선택 시
  재요청은 그대로 동작하므로 기능이 사라지지는 않고 자동 갱신만 지연된다
