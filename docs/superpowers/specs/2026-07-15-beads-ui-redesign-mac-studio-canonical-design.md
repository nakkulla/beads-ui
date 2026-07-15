# beads-ui 전면 재설계 — Mac Studio canonical + 2탭 관제탑 UI

- 날짜: 2026-07-15
- 상태: 설계 확정 (브레인스토밍 세션, 목업 기반 사용자 승인 + advise 컨설트 1회 반영)
- 라우트: full_plan (beads-ui epic parent 1 + dotfiles 소형 bead 1)
- supersede: `2026-07-05-beads-ui-workflow-contract-alignment-design.md`, `2026-07-12-worker-board-v2-ccx-queue-design.md` (두 문서는 v3-era 계약(`next_gate` 등) 기준이라 폐기 — 배경 참고용으로만 보존)

## 1. 배경과 목표

기존 재설계 이슈 4건(UI-ufkg, UI-32ih, dotfiles-10zx, dotfiles-7xcx)은 워크플로우 계약 대개편(2026-07-15, ADR 0011: `next_gate`·게이트 사다리 폐기 → route/영수증/fast_track 체계) 이전에 작성되어 정합 대상 자체가 사라졌다. 본 스펙은 이를 전면 대체한다.

**목표:**
1. dolt 중앙 서버 canonical을 NAS 컨테이너에서 Mac Studio로 이전 — 터널·NAS 컨테이너·NAS git 미러 3계층 제거, spec/plan 문서는 워크스페이스 파일시스템 직독.
2. beads-ui를 실사용 중심 2탭(Board/Worker)으로 재편, 현재 계약(workflow.yaml v4) 스키마를 그대로 렌더링.
3. Worker를 계약 네이티브 무인 실행기로 재구축 — headless 세션이 fast_track으로 spec 게이트→구현→PR→머지 완주.
4. 프론트 전면 재작성(다크 관제탑 디자인 시스템) + 서버 코어 정리·최적화.

**비목표:** 멀티 유저/권한 모델, NAS에서의 서버 구동(백업 수신만), Issues/Epics 뷰의 기능 보존, 구 ralph 러너 호환, dolt 리플리케이션.

## 2. 토폴로지 및 마이그레이션 (Phase 0)

### 2.1 목표 토폴로지

- **canonical dolt**: Mac Studio 기존 launchd `com.local.dolt-server`(127.0.0.1:3307, projectmgr 관리)를 승격. 신규 서버 생성 없음.
- **이전 범위는 NAS 서버가 서빙하는 DB 전수**(beads_ui·dotfiles만이 아님 — fence 시점 실측 기준 9개 내외: microbiome_bile, oliveyoung, prostate 등 포함)와, `127.0.0.1:13307`(터널)을 가리키는 **모든 repo의 `.beads/metadata.json`**. beads-ui의 멀티 워크스페이스 전환(§3)이 깨지지 않는 것이 전제 조건.
- **beads-ui**: Mac Studio 단일 인스턴스(projectmgr 서비스 재활성화), Tailscale 인터페이스 바인드로 폰/노트북 접근. NAS 인스턴스·"worker 전용 :3002 인스턴스" 분리 개념 폐기 — 단일 인스턴스가 조회+worker 담당.
- **NAS**: 서버·설정 없는 순수 백업 수신 폴더로 강등.

### 2.2 마이그레이션 절차 (쓰기 fence 강제)

1. **Fence**: Worker 자동진행 OFF + 활성 세션 0 확인 → NAS 서버에 `SHOW DATABASES`로 **이전 대상 DB 전수 열거·기록** → 13307을 가리키는 repo 전수 열거(`~/Documents/GitHub/*/.beads/metadata.json` 스캔) → 모든 beads-ui/bd writer 중지 → NAS dolt sql-server 종료 → NAS 컨테이너에서 dolt 프로세스·포트·데이터 디렉토리 오픈 핸들 0 확인 → **목적지 `com.local.dolt-server`도 launchctl bootout으로 정지**(KeepAlive 재기동 차단 확인; 같은 서버의 무관 DB `ProjectVault` writer 중지·재개도 fence 항목 — 다운타임 고지 포함).
2. **복사**: 1에서 열거한 **전체 DB**의 dolt 데이터 디렉토리를 SSH로 통째 복사(전체 히스토리 보존). data_dir 밖의 `config.yaml`·privilege/branch-control 파일이 있으면 함께. 로컬의 정체된 구 사본(`~/.local/share/dolt-server/data/{beads,dotfiles}`)은 삭제하지 않고 아카이브 디렉토리로 이동(이름 충돌 방지 + 복구 여지). 복사·아카이브 완료 후 목적지 서버 재기동.
3. **cutover manifest**: 변경 전 **13307을 가리키는 모든 repo**의 `.beads/metadata.json` 원본 바이트·체크섬과 대상 파일 목록을 manifest로 기록하고, all-or-restore 원복 스크립트를 먼저 작성.
4. **패리티 검증**: `bd list --json` 건수 비교가 아니라 — **DB 전수**에 대해 dolt HEAD 해시 일치 + 전체 이슈 덤프(상태·의존성·메타데이터 포함) diff + 브랜치/스키마 목록 비교.
5. **전환**: 1에서 열거한 모든 repo의 `.beads/metadata.json`을 `127.0.0.1:3307`로 변경 → repo별 `bd show/list --json` readback.
6. **커밋 포인트**: 로컬에서 **첫 쓰기 발생 전** 실패 시 manifest 원복 + NAS 재기동으로 복귀 가능. **첫 쓰기 후**에는 단순 복귀 금지 — 역방향 fence+복사만 허용(문서화).
7. **해체(패리티 통과 후에만)**: `com.local.dolt-tunnel` launchd 제거 → NAS dolt 컨테이너 중지 → NAS beads-ui 인스턴스 폐기 → NAS git 미러 9개 폐기.

### 2.3 백업 (dotfiles bead 소유)

- launchd 일 1회: DB별 `dolt_backup`으로 로컬 일관 스냅샷 → 기존 SSH 키 재활용해 NAS로 rsync.
- **날짜별 세대 보존**(단일 폴더 갱신 금지) + 보존 기간(기본 14세대). 첫 쓰기 전 초기 백업 1회 + restore 리허설 1회를 Phase 0 acceptance에 포함.

## 3. 정보 구조

- **2탭**: Board / Worker. Issues·Epics 뷰와 관련 코드 삭제. 검색·필터·이슈 생성은 Board에 흡수. 멀티 워크스페이스 전환은 유지.
- **공용 상세 패널**: 두 탭 어디서든 카드/타일 클릭으로 열림. 구성: 제목·설명·의존성(bd 엣지 파싱)·워크플로우 요약(영수증 원문 포함) · **Artifacts**(spec/plan 경로 — 클릭=클립보드 복사, "열기"=md 뷰어) · **실행 설정**(§6 metadata 키 편집) · 세션 이력.
- **md 뷰어**: `GET /api/doc` — 워크스페이스 파일시스템 직독(NAS 미러 폴백 삭제). marked+dompurify 다크 렌더, 모바일(≤640px) 전체화면. 보안: `docs/` 하위 `.md`만, **realpath 기준 워크스페이스 containment(symlink escape 차단)**, 응답 크기 제한(기본 1MB).

## 4. Board

- **5컬럼**: Blocked(의존성 파생, `bd ready` 기준) / Ready / In progress / Resolved / Closed(기본 접힘, 최근 N개). 드래그로 상태 변경(허용 전이만).
- **카드**:
  - ID(모노스페이스, **클릭=복사**+토스트) · P우선순위 · 제목.
  - 칩: `route`(spec_backed/full_plan) · `⚡fast_track`(workflow_mode) · `PR #n · CI상태`(pr_url 있을 때만 — 스테퍼 PR 칸과 항상 일치).
  - **단계색 스테퍼**: SPEC(teal)→PLAN(blue, full_plan만)→IMPL(violet)→PR(pink)→MERGE(green). 칸 의미: **빈 칸=산출물 없음 / 흐린 채움=산출물 존재**(spec_id·plan_path·실행 시작·pr_url·머지 확인) / **밝은 채움+✓=리뷰 영수증** / **밝은 채움+⊘=skip 영수증** / glow=현재 진행 칸. stale 판정 기준(게이트별): `spec_review`는 `git log <receipt-sha>..HEAD -- <spec_id 경로>`가 비어 있지 않으면 stale(스펙 문서 자체의 후속 변경만 stale 유발 — 무관 커밋은 무영향), `impl_review`는 대상 브랜치 head ≠ receipt SHA면 stale. stale이면 ✓를 회색 표시로 강등. `reviewed:*`/`skipped:*` 라벨은 display-only 계약 그대로 필터용으로만 쓰고 카드 칩으로는 중복 표기하지 않음.
  - **child rollup**: `children 2/4` + **in_progress child(Phase) 제목 한 줄 상시 표시**, 클릭 시 전체 child 목록(Phase 앵커·상태 점) 인라인 펼침.
  - 마지막 갱신 경과시간.
- 모델/effort 등 실행 설정은 카드에 표시하지 않음(상세 패널 전용).

## 5. Worker

### 5.1 레인과 큐

- **후보 레인**: Board의 Ready·Blocked 이슈 라이브 연동(별도 저장 없음, "보내기" 없음). spec 유무·blocked 사유(🔒 + 의존 대상)는 bd 데이터 파싱 표시.
- **Serial 큐 / Parallel 풀**: 후보에서 **드래그로 배치**(배치가 곧 실행 대상화·병렬 허용 결정). 양방향 이동·레인 내 순서 드래그 조정 가능(풀 순서=슬롯 선점 우선순위). Blocked 이슈도 미리 배치 가능 — unblock 시 그 자리에서 실행 대상화. Serial 큐 안에 blocked가 head면 다음 runnable로 건너뜀.
- **스케줄**: `▶ 자동 진행`이면 Serial head 1개 + Parallel 풀에서 parallel slot N개까지 동시 실행(총 동시 세션 = 최대 1+N). `⏸ 정지`는 현재 세션 완주 허용, 신규 미착수.
- **큐 상태 저장**: bead metadata가 아닌 **서버 로컬 영속 상태** — repo checkout 밖 안정 경로(`$XDG_STATE_HOME/bdui/` 기본)에 저장. 순서 변경은 **queue revision CAS**(구버전 클라이언트의 드래그가 최신 순서를 덮지 못함). 디스패치 직전 Ready/Blocked/의존성/실행 설정을 재독하고 그 시점 값을 attempt에 스냅샷.

### 5.2 세션 수명주기

- 실행 = bead당 headless 세션 1개, 전용 `.worktrees/<bead-id>` 격리, runner 어댑터(§5.4) 경유 spawn.
- 세션은 launch 전 Worker가 기록·readback한 `workflow_mode=fast_track`(bead metadata) + 프롬프트 패킷 내 명시 이중 전달로 fast_track 확정. Worker는 launch 전 기존 `workflow_mode` 값을 attempt에 스냅샷하고, **attempt가 bead close 없이 종료되면(실패·중지·orphan 포함) 그 값을 원복**(원래 없었으면 unset) — 잔존 fast_track이 이후 수동 세션을 조용히 무인 모드로 전환시키는 것을 방지. 흐름: spec 게이트(영수증 없으면 자동 디스패치)→구현→implementation 게이트→PR→CI→머지→sweep, 전 과정 계약 네이티브.
- **머지 락 게이트**: 세션의 머지 단계는 Worker 소유 `(repo, target_base)` 락 획득이 선행 조건 — 프리앰블이 머지 진입 전 Worker의 로컬 lock API(`POST /api/worker/merge-lock`, 토큰 인증) 호출·대기를 지시하고, 어댑터는 락 미획득 상태의 머지 시도를 감지하면 강제 종료한다. base 재검사부터 머지·sweep까지 한 세션만. 첫 세션 머지로 base가 이동하면 다음 세션은 락 안에서 base drift를 재평가(계약의 fail-closed 규칙 그대로).
- **완료 판정**: 세션 exit 0만으로 Done 처리하지 않음 — Worker가 **독립 검증**(머지 SHA의 base 포함 + bd status/영수증 readback) 후 Done 이동·다음 디스패치. 스테퍼·단계 표시의 진실원천은 항상 bd metadata readback(세션 출력 아님).
- **attempt 기록**: attempt_id·디스패치 시점 base/head OID·시작 시각·PID·러너/모델 스냅샷·exit·검증 결과를 큐 상태에 기록.

### 5.3 실패 정책 (circuit breaker)

- 세션 실패(비정상 종료, loud-fail blocker, 머지 불변식 위반, Worker 독립 검증 실패) → 이슈 Failed 표시 + **자동 진행 OFF** + 원인 배너. 해당 repo의 **신규 launch와 머지 진입을 모두 차단**하되 실행 중인 다른 세션 프로세스는 강제 종료하지 않음(완주 후 머지 단계에서 차단). 재개는 수동 ▶.
- beads-ui 재시작: 자동 진행 기본 OFF. orphan 판정은 PID 존재가 아니라 attempt_id+PID+시작 시각 대조 — 불일치 시 Failed 처리, worktree 잔재는 삭제하지 않고 배너 안내(정리 소유권 불명확 시 중단 원칙).

### 5.4 Runner 어댑터

- 공통 인터페이스: `spawn(bead, workspace, settings) → 이벤트 스트림(stream-json)`, 구현 3종 — **claude(기본)** / codex / ccx(claude-code-proxy).
- 무인 프리앰블은 beads-ui 소유: "무인 모드 — 질문 도구 사용 금지, hard-stop 조건은 blocker 출력 후 비정상 종료". 프롬프트 신뢰에 그치지 않고 **어댑터가 질문/승인 요청 이벤트를 감지하면 blocker 이벤트 + 강제 종료로 변환**(fail-closed).
- **full_plan 제약**: plan-save 훅이 Claude 전용이므로, `plan_path` 없는 full_plan bead는 claude 러너에서만 실행 가능. codex/ccx로 지정된 경우 큐 진입 시 경고 + 실행 차단(plan이 이미 있으면 허용).
- 큐 진입 조건: spec 존재(`spec_id`). 없으면 후보 레인에 사유 표시.

### 5.5 병렬 자원 락 계층

1. `(database, bead_id)` — 동일 bead 중복 실행·메타데이터 경합 방지.
2. repo git-topology 락 — worktree add/remove·fetch·branch 조작 직렬화.
3. `(repo, target_base)` 머지 락 — §5.2.
4. 공유 서비스 재시작/설치 락.
- worktree별 `node_modules` 독립(공유 npm 캐시만 공용). **vitest/eslint/prettier/tsc가 `.worktrees/**`를 순회하지 않도록 exclude를 이 repo와 워크스페이스 기본 검증 번들에 명시**(main에서 worktree 테스트까지 수집된 전례 있음).
- headless 자식들의 `bd` 호출은 dolt server 모드의 동시성에 의존 — Phase 계획 시 bd 동시 쓰기 안전성 1회 검증 항목 포함.

### 5.6 세션 트랜스크립트 뷰어

- Running 타일 클릭 → 드로어로 열림. stream-json 파싱 렌더: 어시스턴트 텍스트 / 툴 라인(`📖 Read`·`✎ Edit +42 −17`·`⚡ Bash → 결과`, 클릭=인자·출력 펼침) / 게이트 이벤트 강조(`✓ spec 게이트 — codex APPROVE`) / Phase 구분. "⇣ 라이브 따라가기"(위 스크롤 시 자동 해제). Done/Failed 세션 로그도 동일 뷰어.
- **Running 타일 그리드**: `auto-fill minmax(215px,1fr)` — 세션 수에 따라 자동 줄바꿈, 넘치면 Running 영역만 내부 스크롤, 모바일 1열. 타일: 상태점·ID·`serial`/`∥` 배지(번호 없음)·경과·중지 ■·제목·미니 스테퍼·마지막 로그 한 줄.

## 6. 실행 preference metadata + 계약 정합 (dotfiles bead)

bead metadata **5키** 신설. 우선순위는 기존 계약(현재 사용자 지시 > Bead metadata > harness 기본값) 그대로.

| 키 | 값 | 소비자 |
|---|---|---|
| `worker_runner` | `claude`(기본)·`codex`·`ccx` | **Worker**(launch 파라미터 — 스킬 시작 시점엔 러너가 이미 정해져 있으므로 workflow 스킬은 소비 불가) |
| `orchestration_model` / `orchestration_effort` | 러너별 허용 모델 / effort | **Worker**(launch argv) |
| `review_model` | `codex`·`opus`·`fable`·`self`·`skip` (reviewer selector, **두 게이트 공통**) | **workflow 스킬**(게이트 디스패치 시 harness 기본 대신 사용) |
| `impl_model` | 구현 위임 tier override | **workflow 스킬**(위임 시 model_tiers 대신 사용) |

- dotfiles 작업: ① `workflow.yaml` parent_keys에 위 5키 등재(Worker-소비/skill-소비 구분 주석 포함) + workflow 스킬 위임 규칙에 한 줄 반영 ② projectmgr 서비스 갱신(beads-ui 활성화, Tailscale 바인드) ③ 백업 launchd job(§2.3) ④ 터널 launchd 해체. **계약 변경 단위**: canonical 문서 + UI 파서/에디터 + Worker launcher + 스킬 + 체커/테스트 + 설치 사본을 한 변경으로 검증.
- UI: 상세 패널 "실행 설정"에서 5키 + `workflow_mode` 편집(드롭다운, 러너별 허용 조합만 노출). `workflow_mode`는 계약 enum이 `[fast_track]`, 부재=standard이므로 — 드롭다운에서 "standard" 선택 = **키 삭제**(unset)로 기록하고 "standard" 값을 저장하지 않는다.

## 7. 서버 재구성

- **worker 백엔드 교체**: 구 ralph 러너(`server/worker/*`) 삭제 → `queue-store`(§5.1 저장·CAS) / `scheduler`(자동진행 상태머신·슬롯·락 계층) / `runner`(어댑터 3종) / `session-log`(저장·테일) 신규.
- **ws.js(2,181줄) 모듈 분할** + v3 잔재 mutation 제거(`update-workflow-settings` 등). push 구독 프로토콜(snapshot/upsert/delete)은 유지.
- **인증**: Tailscale 바인드는 인증이 아님 — mutation ws 메시지·worker/doc REST에 **토큰 인증**(config.toml 발급, UI가 저장·전송) + Origin 검사 강화. 읽기 전용 구독은 토큰 없이 허용하지 않음(단일 토큰 일괄 적용).
- `/healthz`: `{ok, checks:{bd, db, worker}}`, 503=readiness.

## 8. 디자인 시스템

- 다크 우선 관제탑 + 라이트 지원. 토큰 파일 단일 소스: 배경 `#0b0e14`/서피스 `#11151d`/카드 `#171c26`, 단계색(§4), 상태색(ready=green·progress=blue·blocked=red·resolved=violet), ID·로그·경로=모노스페이스. 정보 밀도 높게, 모든 목록은 키보드 내비 유지. 기존 `app/` 뷰 전면 재작성(lit-html 유지).
- **canonical 시각 기준**: 사용자 확정 목업 4본을 `docs/superpowers/specs/assets/2026-07-15-beads-ui-redesign/`에 추적 고정 — `board-card-final.html`(카드 규칙·단계색·범례), `worker-final.html`(Worker 레이아웃·레인·Running 그리드), `worker-session-log.html`(세션 뷰어), `detail-panel.html`(상세 패널·md 뷰어). 승인 기준 3은 이 파일들에 바인딩.

## 9. 테스트/검증

- 스케줄러 상태머신 유닛(직렬/병렬/정지/재개/circuit breaker/머지 락/CAS reorder), runner 어댑터는 fake 프로세스(질문 이벤트→강제 종료 포함). doc API: realpath/symlink/크기 제한. 프론트 뷰 렌더 테스트(vitest 기존 패턴). e2e 1본: 더미 bead + fake runner로 큐→머지→독립 검증 전체 흐름.
- Phase 0은 §2.2 패리티 + §2.3 restore 리허설이 acceptance.

## 10. Bead 재구성

- 신규: **beads-ui epic parent**(본 스펙, route=full_plan, spec_id=본 문서 — phase children은 plan 승인 시 1:1 생성) + **dotfiles 소형 bead**(§6·§2.3·터널 해체, 본 스펙 참조).
- 구 4건(UI-ufkg, UI-32ih, dotfiles-10zx, dotfiles-7xcx): **JSON export 후, Phase 0 패리티 검증 통과 뒤 삭제**(사용자 확정). 구 스펙 문서 2건은 헤더에 superseded 표기 후 보존.

## 11. 승인 기준 (전체)

1. Mac Studio dolt(3307)가 유일한 활성 서버 — 터널·NAS 컨테이너·NAS 미러 부재, **13307을 가리키던 모든 repo**의 bd 정상 readback + beads-ui 워크스페이스 전환 정상.
2. NAS에 날짜별 백업 세대 생성 + restore 리허설 1회 통과.
3. Board/Worker 2탭 + 상세 패널 + md 뷰어가 §8 추적 목업 4본대로 동작(스테퍼 의미론·stale 표시·ID 복사·child rollup 포함), 폰(Tailscale)에서 접근 가능.
4. Worker: 드래그 큐잉→자동 진행→fast_track 세션→머지→독립 검증→Done 전체 흐름이 실 bead 1건으로 검증, 실패 주입 시 circuit breaker 동작.
5. metadata 5키가 계약·스킬·UI·Worker에서 일관 동작.
6. 구 이슈 4건 export+삭제, 신규 2건 생성, 구 스펙 2건 superseded 표기.
