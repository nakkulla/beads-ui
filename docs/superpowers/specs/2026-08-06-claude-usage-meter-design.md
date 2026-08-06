# 헤더 Claude Code 사용량 미터 (UI-1bm6)

## 배경과 목표

cswap(claude-swap)이 터미널에서 보여주는 Claude Code 사용량(5시간/7일/모델별
주간 윈도)을 beads-ui 헤더에서 실시간으로 확인할 수 있게 한다. 표시 범위는
**활성 계정 하나**이며, 레이아웃은 목업 1안(인라인 미니 바)으로 사용자
확정됐다(목업: `~/tmp/mockups/2026-08-06-usage-meter.html`).

## 데이터 소스 계약

- 소스 명령: `cswap list --json` (claude-swap의 문서화된 스크립팅 출력).
- 출력 상위 키: `schemaVersion`, `activeAccountNumber`, `accounts[]`.
- 계정 행에서 소비하는 필드: `active`(bool), `email`, `usageStatus`,
  `usage.fiveHour|sevenDay`(`pct`, `resetsAt`), `usage.scoped[]`(`name`, `pct`,
  `resetsAt`), `usageFetchedAt`, `usageAgeSeconds`.
- 신선도·API 예산은 cswap 소관이다: usage API는 토큰당 요청 예산을 강제하는데
  (비공식 UA 429), cswap이 자체 스토어(180초 serve TTL)와 백오프로 관리하므로
  beads-ui는 **cswap 캐시를 읽기만 하고 Anthropic API를 직접 호출하지 않는다**.
  토큰·Keychain에도 접근하지 않는다.
- `countdown`/`clock` 문자열은 소비하지 않는다 — 측정 시점 문자열은 캐시
  나이만큼 어긋나므로 클라이언트가 `resetsAt`으로 렌더 시점에 재계산한다.

## 서버

### 라우트

- `GET /api/claude-usage`를 `server/app.js`의 `createApp()`에 등록하고 핸들러는
  `server/routes/claude-usage.js`에 둔다(`server/routes/doc.js` 형태).
- 응답은 항상 200 + `Cache-Control: no-store`:

```json
{
  "available": true,
  "email": "user@example.com",
  "windows": [
    { "key": "5h", "pct": 26, "resetsAt": "2026-08-06T03:09:59Z" },
    { "key": "7d", "pct": 74, "resetsAt": "2026-08-09T15:59:59Z" },
    { "key": "Fable", "pct": 46, "resetsAt": "2026-08-09T16:00:00Z" }
  ],
  "fetchedAt": "2026-08-06T02:16:46Z",
  "ageSeconds": 209
}
```

- `windows`는 5h → 7d → `scoped[]` 순서. `scoped` 항목의 `key`는
  `display_name`(예: `Fable`) 그대로.
- 실패 시(`available: false`만 있는 몸체): cswap 실행 파일 없음, 종료 코드
  0 아님, 타임아웃, JSON 파싱 실패, `active` 계정 없음, `usage` 필드 없음.
  전부 200으로 fail-quiet — 헤더 위젯이 조용히 사라지는 게 계약이다.

### 실행과 캐시

- spawn은 `server/bd.js`의 `runBd`와 같은 방식: argv 배열, `shell: false`,
  `windowsHide: true`, stdout/stderr 수집, 타임아웃 10초.
- cswap 경로 해석: `PATH`에서 `cswap`을 찾고, 실패하면
  `~/.local/bin/cswap` 폴백(launchd 환경의 좁은 PATH 대비). 존재 확인은
  spawn 실패(ENOENT)로 감지해도 된다.
- 모듈 레벨 TTL 캐시 30초(`server/worker/title-cache.js` 패턴): 성공 응답은
  30초간 재사용, 실패 응답도 30초 네거티브 캐시. 탭 여러 개가 폴링해도
  cswap spawn은 30초에 1회로 제한된다. 테스트용 리셋 훅
  (`__resetCacheForTest`)을 노출한다.

## 프론트엔드

### 마운트와 컴포넌트

- `app/index.html` 헤더 `.header-actions` 맨 앞에
  `<div id="usage-meter" class="usage-meter-mount"></div>` 추가.
- `app/views/usage-meter.js`에 `createUsageMeter(mount_element)` —
  `app/views/nav.js`의 lit-html 컴포넌트 패턴(`{ destroy() }` 반환).
  `app/main.js` `bootstrap()`에서 생성한다.

### 폴링과 렌더링

- 부트스트랩 직후 1회 + 60초 `setInterval`로 `/api/claude-usage` fetch.
  `destroy()`에서 interval 해제.
- 표시(목업 1안): 윈도별로 `라벨 + 52px 바 + %` 3쌍을 인라인 배치.
  바 fill 폭은 `--progress` CSS 변수(`app/views/worker/lanes.js:281` 패턴).
- 색 임계값(기존 토큰 재사용, 텍스트는 텍스트 토큰 유지):
  - `pct < 60` → `--accent-success`
  - `60 <= pct < 85` → `--accent-warn`
  - `pct >= 85` → `--accent-danger`
- 툴팁은 네이티브 `title` 속성으로 구현(커스텀 팝업 없음):
  `resets <카운트다운> · <현지시각>` —
  `resetsAt`에서 렌더 시점에 재계산. 같은 날이면 `HH:MM`, 아니면
  `Aug 10 01:00` 형태(cswap 표기 준용).
- 상태 처리:
  - `available: false` 또는 fetch 실패 → 마운트 비우고 숨김(fail-quiet).
  - `ageSeconds > 600` → 위젯 반투명(0.55) + 툴팁에 `n분 전 측정` 추가.
- 반응형: 뷰포트 폭 900px 미만에서 media query로 위젯 숨김.
- 스타일은 `app/styles.css`에 `.usage-meter*` 블록으로 추가, 색·간격은 기존
  토큰 변수만 사용.

### 이름 충돌 주의

`server/worker/usage-store.js`·`app/utils/token-usage.js`는 무관한 도메인
(빈 단위 토큰 사용량)이다. 이번 기능은 파일·클래스·CSS 전부
`claude-usage`/`usage-meter` 네이밍을 쓴다.

## Test scope

- `server/routes/claude-usage.js` 정규화 함수: cswap JSON → 응답 페이로드
  변환(활성 계정 선택, windows 순서, scoped 매핑, 결측 필드 fail-quiet)을
  RED→GREEN으로 작성 — `server/routes/claude-usage.test.js`.
- 라우트 동작: 성공 페이로드, spawn 실패 시 `available:false`, TTL 캐시로
  spawn 1회 제한(리셋 훅 사용) — 같은 테스트 파일.
- `app/views/usage-meter.js`: jsdom 렌더 테스트 — 임계값별 색 클래스,
  `available:false`일 때 숨김, stale 표시 — `app/views/usage-meter.test.js`.
- 툴팁 카운트다운 재계산 유틸(순수 함수로 분리): 같은 날/다른 날 포맷 경계 —
  프론트 테스트 파일에 포함.

## 검증

- Pre-Handoff: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(번들 산출물 포함 커밋).
- 수동 확인: `BDUI_FRONTEND_MODE=live bdui start --host 127.0.0.1 --port 3001`
  로 헤더 위젯 표시·툴팁·라이트/다크를 확인.
- 머지 후: 기존 `docs/agents/repo-ops.toml [deploy]` 자동 경로로
  `bdui-shared restart`, 프로세스 경로·포트·HTTP 응답 확인(AGENTS.md 절차).

## 범위 제외 (후속 후보)

- 다중 계정 팝오버(전 계정 보기), `extra_usage`(스펜드) 표시, WS push 전환,
  `[usage]` 설정 섹션(폴링 주기 등), cswap 미설치 환경 안내 UI.
