# beads-ui 전면 재설계 실행 계획 — Mac Studio canonical + 2탭 관제탑 UI

## Context

- **왜**: 기존 재설계 이슈 4건(UI-ufkg, UI-32ih, dotfiles-10zx, dotfiles-7xcx)은 v3-era 워크플로우 계약 기준이라 폐기·재작성이 확정됐다. 승인 스펙에 따라 dolt canonical을 NAS→Mac Studio로 이전하고, beads-ui를 Board/Worker 2탭 관제탑 UI로 전면 재작성하며, Worker를 현재 계약(fast_track) 네이티브 무인 실행기로 재구축한다.
- **스펙**: `docs/superpowers/specs/2026-07-15-beads-ui-redesign-mac-studio-canonical-design.md` — `spec_review=fable@c2ad79347b9c108ac54215cf18d6cf9ab77b2923` (UI-lo1k). 시각 기준: `docs/superpowers/specs/assets/2026-07-15-beads-ui-redesign/` 목업 4본.
- **Bead**: epic parent `UI-lo1k` (route=full_plan). dotfiles 연계 작업은 `dotfiles-zphl` — Phase 1~4의 dotfiles repo 커밋은 dotfiles-zphl 아래에서 수행하고, UI-lo1k phase child는 운영 절차와 조율을 앵커한다.
- **사용자 승인된 스펙 편차(집행 시 스펙에 소폭 반영, 영수증 유지 근거=본 계획 승인)**: ①로컬 3307의 `beads` DB는 활성이므로 아카이브 제외(frozen `dotfiles`만 아카이브) ②NAS는 컨테이너 유지, dolt/beads-ui 감독 스크립트만 제거(동거 서비스 11개·백업 ssh 경로 보존) ③wallace/fisher는 Mac 접근 가능 — 터널 대상 전환으로 writer 지위 유지.
- **핵심 실측 사실**: NAS dolt 2.1.8(supervisor 스크립트), 로컬 launchd 서버는 dolt 2.0.2로 가동 중(**2.1.8 데이터에 2.0.2 서빙 금지** — pinned `~/dolt-2.1.8/bin/dolt`로 승격 필수), 이전 대상 DB 9개 1.2GB, 13307 참조 repo 9개, **`.beads/dolt-server.port`(portfile)가 metadata.json 포트를 override하므로 두 파일 동시 플립**, `com.local.dolt-server`의 실소유는 `~/.config/projectmgr/services.d/dolt-server.toml`. 기존 mac→NAS 이전 도구 일체가 `dotfiles/scripts/nas-dolt-server/`에 있어 역방향 재사용. bd 1.0.5(a6e320377)=스키마 v50 호환. Tailscale IP `100.122.98.8`.
- **러너 CLI 실측**: `ccx`=claude CLI와 인터페이스 동일(env 라우팅만) → 어댑터는 claude계 1구현+codex exec. claude 헤드리스: `claude -p --output-format stream-json --verbose --model <alias> --effort <lv> --permission-mode bypassPermissions`. 성공 판정: result 이벤트 정확히 1개·subtype==success·is_error==false·permission_denials==[]. codex: `codex exec --json -m <model> -c model_reasoning_effort=<lv>` (이벤트 스키마 실측 필요). 프로세스 종료는 그룹 시그널(`kill -pid`).
- **순서**: Phase 1~4(인프라·계약)와 Phase 5~8(앱 재작성)은 상호 독립(UI는 bd 프록시 경유라 포트 전환 무영향) — 기본은 번호순, 필요 시 5~8을 2~4와 교차 진행 가능. Phase 9~10은 4(계약 키)와 6(인증)에 의존.

## Phase 1: 마이그레이션 준비·리허설 [dotfiles]

1. `scripts/mac-canonical/` 신규 스크립트 3본: `pull-transfer.sh`(seed-transfer 방향 반전, NAS→mac staging, dir_digest sha256 전수 대조), `cutover-manifest.sh`(metadata-snapshot 확장 — 9 repo × metadata.json+**portfile** 스냅샷/sha256, `restore` 서브커맨드=all-or-restore), `rollback-topology.sh`(커밋 포인트 전 전용: mac 서버 stop→manifest restore→NAS supervisor 재기동→터널 재기동→전 repo `BEADS_DOLT_AUTO_START=0 bd list` readback, 비파괴).
2. `src/shell/projectmgr/services/dolt-server.toml` 신규(bundled 채택): 현 user toml 복제, command를 `~/dolt-2.1.8/bin/dolt`로 핀(근거 versions.env). user toml 제거 절차 문서화(적용은 Phase 2 fence 창 안).
3. 사전 read-only 열거: 13307 `SHOW DATABASES`(참고치), 9 repo metadata+portfile 스캔, `lsof -nP -i :3307`로 로컬 beads/ProjectVault writer 클라이언트 식별, dotfiles DB 최근 커밋 작성자 실측(wallace 활동 확인).
4. 스펙 편차 3건(Context 참조)을 스펙 §2.2에 소폭 반영 커밋 + UI-lo1k notes에 사용자 승인 근거 기록.
- 검증: 임시 사본으로 cutover-manifest snapshot→변조→restore 왕복 PASS, pull-transfer 소형 왕복 digest 일치, 신규 toml projectmgr dry 검증.

## Phase 2: 마이그레이션 실행 — fence→이전→승격→패리티→전환 (다운타임 창, 목표 ≤3h)

1. **Fence**: Worker 자동진행 OFF·활성 세션 0 → NAS beads-ui 감독 정지 → NAS 서버 살아있는 상태에서 `SHOW DATABASES` 전수 기록·writer 0 확인 → per-DB NAS manifest(`dolt-integrity-manifest.sh`, 터널 경유)+전 테이블 CSV 덤프 → NAS dolt TERM(supervise.pid)·포트/프로세스/핸들 0 확인 → per-DB offline `DOLT_HASHOF_DB('HEAD'/'WORKING')` 기록(2.1.8) → 목적지 `write-freeze-barrier.sh engage`(projectmgr stop 선행, bootout+KeepAlive 차단 증명)·ProjectVault/beads writer 정지 고지.
2. **이전**: `pull-transfer.sh`로 9 DB → 로컬 staging(`incoming-<ts>/`, data_dir 밖) → `mac-3307-isolate.sh`로 frozen `dotfiles`만 `preserve-<ts>/`로 이동(테스트포트 미노출 검증, **beads·ProjectVault 불가침**) → beads·ProjectVault cold copy 확보(다운그레이드 앵커) → per-DB 원자 `mv`로 data_dir 장착.
3. **승격·재기동**: bundled dolt-server.toml(2.1.8) 활성+user toml 제거 → 재기동 → `SHOW DATABASES` = {beads, ProjectVault} ∪ NAS 9개.
4. **패리티 3중 검증(전수)**: offline 해시 diff + `dolt-integrity-manifest.sh compare`(브랜치/태그/스키마/테이블 해시·rowcount) + 전 테이블 CSV diff.
5. **전환·커밋 포인트**: `cutover-manifest.sh snapshot` → 9 repo metadata.json+portfile 동시 플립(13307→3307) → repo별 `BEADS_DOLT_AUTO_START=0 bd show/list --json` readback → "첫 쓰기 허용" 선언(이후 단순 롤백 불가 고지).
- 검증: 9 DB × (해시=manifest=덤프) PASS + 9 repo bd readback 전수 OK + beads-ui 워크스페이스 전환 정상.

## Phase 3: 백업·서빙·해체·원격 writer 전환 [dotfiles-zphl 연계]

1. **백업 잡**: `scripts/mac-canonical/dolt-backup-daily.sh`(SHOW DATABASES 전수→per-DB `CALL DOLT_BACKUP('sync-url','file://…/backups/<db>')`→NAS `dolt-backups/<YYYY-MM-DD>/` rsync, `--link-dest` 세대 절약, marker 기반 14세대 초과 삭제) + projectmgr job toml(`com.dotfiles.dolt-backup`, 새벽 1회). 초기 백업 1회 + restore 리허설(별도 디렉토리 restore→manifest compare, remotes 제외 규칙 준수).
2. **서빙 활성화**: beads-ui.toml에 `HOST=100.122.98.8`(ts-ip 바인딩, 0.0.0.0 금지 규칙) → projectmgr apply → 폰에서 `http://100.122.98.8:3000` 접근+워크스페이스 전환 확인.
3. **해체**: 터널 launchd bootout+plist 제거(repo 추적본 retired 표기) → NAS entrypoint에서 dolt/beads-ui 감독 블록 제거(**컨테이너 유지**) → NAS `data/`→`data-retired-<ts>` rename(보존) → beads-workspaces 스텁 아카이브 후 제거 → DSM tailscale serve down.
4. **wallace/fisher 전환**: 접근 경로 실측 후 두 서버의 dolt 터널 대상을 NAS→Mac Studio로 전환(로컬 13307 포트 유지 시 repo 설정 무변경), fleet `profiles.server` notes 갱신.
5. **fleet/문서 갱신**: `profiles.mac-studio.bd_dolt_port=3307`, `machines.mac-studio.services` += dolt-server/beads-ui/dolt-backup, ubuntu-nas 항목 backup-receiver로 재기술, `tests/test_projectmgr_fleet.py` 동반 갱신, 13307 참조 grep sweep(bd-recover/bd-setup 등).
- 검증: 재부팅 1회 후 dolt-server·beads-ui 자동 기동, NAS에 날짜 세대 백업 존재+restore 리허설 PASS, mac 13307 CLOSED, wallace/fisher bd readback 정상, dotfiles 테스트 green.

## Phase 4: workflow 계약 5키 등재 [dotfiles-zphl 연계]

1. `docs/contracts/workflow.yaml` parent_keys에 5키 등재: `worker_runner`(enum claude/codex/ccx, absent=claude)·`orchestration_model`·`orchestration_effort`(Worker-소비 주석), `review_model`(enum=harness review.options)·`impl_model`(skill-소비 주석).
2. `docs/contracts/workflow.md` 게이트/위임 절에 override 한 줄(bead `review_model`→harness review.default, `impl_model`→model_tiers, 기존 우선순위 계약 준용).
3. 체커 `check-workflow-contract.py`의 `expected_parent` set + `tests/workflow_skill_contract_test.sh` 픽스처 동반 갱신 (symlink 설치 사본은 자동 반영 — 체커로 확인만).
- 검증: 체커·계약 테스트 green + `bd update --set-metadata worker_runner=claude` 왕복 readback.

## Phase 5: 기반 정리 + 레거시 절제 [beads-ui]

1. vitest.config.mjs(2 project)+eslint.config.js에 `.worktrees/**` 제외 추가(실측 버그 수정 — 로컬 워크트리 존재 시 npm test 확정 실패).
2. v3 잔재 제거: ws.js `update-workflow-settings` 핸들러+헬퍼+상수, server/config.js `workflow_summary` 블록(~230줄), detail.js workflow_settings 편집 UI(947-1369).
3. 죽은 프로토콜 제거: `list-issues`/`list-ready`/`epic-status` + new-issue-dialog.js:245의 죽은 호출.
4. 구 worker 절제: server/worker/* 10파일+routes/worker-{jobs,prs,spec}.js+app.js 마운트+app/views/worker*.js 8파일+worker-selectors.js+관련 테스트 삭제, Worker 탭은 "재구축 중" placeholder.
- 검증: 로컬 워크트리 존재 상태에서 `npm run all` green + Issues/Epics/Board 정상, Worker placeholder.

## Phase 6: 서버 코어 재구성 — ws 분할·토큰 인증·doc API [beads-ui]

1. ws.js → `server/ws/{index,connection,refresh,subscription-handlers,mutation-handlers,workspace-handlers,context}.js` 분할(동작 불변, export 표면 유지 — 기존 ws 테스트 12본이 특성 테스트).
2. 토큰 인증: `server/auth.js`(config.toml `[auth] token`, timingSafeEqual, 토큰 부재 시 기동 거부) — WS first-frame auth(5초 데드라인)+REST Bearer(/api/worker/*·/api/doc·/api/register-workspace), Origin 강화. 클라이언트: app/ws.js auth 선송신+localStorage+입력 다이얼로그(서버 강제화와 동일 커밋).
3. `GET /api/doc`: path-safety.js realpath containment 확장(symlink escape 차단)+1MB 제한+`server/routes/doc.js`.
4. `/healthz` 확장: `{ok, checks:{bd,db,worker:'absent'}}`, 503 readiness.
- 검증: 기존 ws 테스트 green + 미인증 구독/뮤테이션/REST 각각 거부 + 토큰 제공 시 기존 흐름 정상 + symlink escape 차단 테스트.

## Phase 7: 디자인 시스템 + 2탭 셸 + Board v1 (Issues/Epics 삭제) [beads-ui]

1. `app/styles/tokens.css`(다크 :root 기본+`[data-theme=light]` 오버라이드, 단계색 5종·상태색 4종·모노스페이스)+base.css — 목업 4본이 canonical.
2. 셸 재작성: app/main.js 얇은 bootstrap(2 section+detail 오버레이), router.js 2뷰 축소, nav.js 재작성, index.html 갱신.
3. Board v1: `app/views/board/{index,column,card,filter-bar}.js` — 5컬럼(Closed 접힘)·허용 전이 드래그·카드 골격(ID 복사+토스트·P·제목·경과)·검색/필터/생성 흡수(new-issue-dialog 재사용). 데이터는 기존 subscriptions-store/list-selectors 무수정 소비.
4. Issues/Epics 삭제: list/epics/issue-row/구 board/구 detail.js+관련 테스트+`epics`·`deferred` 어댑터 타입 제거, 임시 최소 상세 패널 유지. "셸 green→삭제" 순서 강제.
- 검증: board-card-final.html 대비 컬럼/카드 골격 일치, 검색·생성·드래그가 실 워크스페이스에서 동작, `npm run all` green.

## Phase 8: Board 완성 + 공용 상세 패널 [beads-ui]

1. `server/workflow-enrich.js`: 영수증 파싱+stale 판정(spec: `git log <sha>..HEAD -- <spec_id>` 비어있지 않으면 / impl: head≠sha), (HEAD, sha, 경로) 캐시, 판정 실패는 fail-quiet.
2. 카드 완성: `board/stepper.js`(빈/흐림/✓/⊘/glow/stale 의미론)+칩(route/⚡/PR·CI)+child rollup(in_progress child 상시 한 줄+펼침)+키보드 내비.
3. 상세 패널: `app/views/detail-panel/{index,artifacts,session-history}.js` — 의존성·영수증 원문·Artifacts(경로 클릭=복사).
4. md 뷰어+실행 설정: `detail-panel/md-viewer.js`(/api/doc, marked+dompurify 재사용, ≤640px 전체화면)+`exec-settings.js`(5키+workflow_mode, 러너별 허용 조합, standard=unset).
- 검증: 스테퍼 8상태·stale 강등·rollup·Artifacts·실행 설정이 실 bead로 목업 2본과 일치 렌더.

## Phase 9: Worker 큐 코어 (실행 없는 큐 관리) [beads-ui]

1. `server/worker/queue-store.js`: `$XDG_STATE_HOME/bdui/<workspace>/queue.json`, revision CAS, attempt 스키마, 재시작 시 자동진행 OFF.
2. ws 채널: 구독 타입 `worker-queue`+큐 뮤테이션(배치/reorder/토글/제거) — 기존 snapshot/upsert/delete 프로토콜 확장(worker 데이터도 push 통일).
3. Worker 프론트 v1: `app/views/worker/{index,lanes,running-grid}.js` — 후보 레인(Ready/Blocked 라이브, spec 없음 차단 사유, 🔒 의존 표시), Serial/Parallel 드래그 배치·순서(CAS 재시도), ▶/⏸(실행 비활성 배너).
- 검증: 두 클라이언트 동시 드래그에서 구 revision 거부(CAS), 서버 재시작 후 큐 복원+자동진행 OFF.

## Phase 10: 세션 실행 — 러너·스케줄러·락·독립 검증 [beads-ui]

1. 러너 어댑터: `server/worker/runner/{index,claude,codex,preamble}.js` — claude계(ccx=env 변주) spawn+성공 판정 4규칙, 질문/승인 이벤트→blocker+프로세스 그룹 kill(-pid), codex는 `codex exec --json` 이벤트 실측 스파이크 선행→fixture 계약 테스트, full_plan+plan_path 없음+codex/ccx=진입 차단.
2. worktree+락: `server/worker/{worktree,locks}.js` — `.worktrees/<bead-id>`(git-topology 락), 4계층 락, `POST /api/worker/merge-lock`(세션 env `BDUI_WORKER_TOKEN`).
3. 스케줄러: `scheduler.js` — Serial head 1+Parallel N, blocked head skip, 디스패치 직전 재독→attempt 스냅샷, `workflow_mode=fast_track` 기록·readback+**close 없이 종료 시 원복**.
4. 독립 검증+breaker: `verify.js`(머지 SHA base 포함+bd readback 후 Done), 실패 시 자동진행 OFF·배너·해당 repo launch/머지 차단(실행 중 비강제), orphan 판정(attempt_id+PID+시작시각), `session-log.js`(attempt별 jsonl), healthz worker 연결. 프론트 Running 타일 실데이터+Failed 배너. bd 동시 쓰기 안전성 1회 검증.
- 검증: fake runner로 큐→디스패치→머지 락→독립 검증→Done + 실패 주입 시 breaker·workflow_mode 원복 테스트 통과.

## Phase 11: 트랜스크립트 뷰어 + e2e + Bead 재구성 마감 [beads-ui]

1. `worker/transcript-render.js`(stream-json→텍스트/툴/게이트/Phase 라인, 순수 파서)+`transcript-drawer.js`(`session-log:<attempt-id>` append 구독, 라이브 따라가기, Done/Failed 동일 뷰어)+상세 패널 세션 이력 연결.
2. e2e 1본: 더미 bead+fake runner로 전체 흐름 서버 통합 테스트.
3. 마감: 구 styles.css 잔재 제거, protocol.md 갱신, 폰 반응형 점검, README 갱신.
4. Bead 재구성: 구 4건(UI-ufkg, UI-32ih, dotfiles-10zx, dotfiles-7xcx) JSON export 후 삭제(Phase 2 패리티 통과가 전제), 구 스펙 2건 superseded 헤더 표기.
- 검증: worker-final.html·worker-session-log.html 대비 렌더 일치 + e2e green — 스펙 §11 승인 기준 6항 전수 점검.

## Test scope

| Seam | RED→GREEN |
|---|---|
| server/ws/* 분할 | 신규 RED 없음 — 기존 ws.*.test.js 특성 테스트 GREEN 유지 (리팩터 seam) |
| server/auth.js | RED: 미인증 구독/뮤테이션/REST 거부·5초 데드라인·Origin 거부 → GREEN |
| server/routes/doc.js + path-safety | RED: symlink escape·비-docs·1MB 초과 거부 → GREEN |
| server/workflow-enrich.js | RED: spec 후속 커밋→stale, 무관 커밋→무영향, head≠receipt→stale, git 실패→미표시 → GREEN |
| server/worker/queue-store.js | RED: revision mismatch 거부·XDG 영속 복원·attempt append → GREEN |
| server/worker/scheduler.js | RED: 1+N 슬롯·blocked skip·⏸ 완주·breaker 후 차단·orphan 판정·workflow_mode 원복 (fake clock/runner/bd) → GREEN |
| server/worker/runner/* | RED: 성공 판정 4규칙·질문 이벤트→그룹 kill·codex fixture 매핑·full_plan 차단 → GREEN |
| merge-lock 라우트 | RED: 획득/대기/해제·breaker 시 거부·토큰 필수 → GREEN |
| app board/card+stepper | RED: 스테퍼 상태 매트릭스·칩 조건·rollup·ID 복사 → GREEN |
| app worker/lanes | RED: 드래그 CAS 재시도·spec 차단 사유 → GREEN |
| app worker/transcript-render | RED: stream-json fixture→라인 분류 → GREEN |
| app detail-panel/exec-settings | RED: standard=unset·러너별 조합 → GREEN |
| e2e 통합 | RED: fake runner 전체 흐름+실패 주입 → GREEN |

## 검증(전체)

스펙 §11 승인 기준 6항이 최종 게이트: ①Mac 3307 유일 서버+전 repo readback ②NAS 세대 백업+restore 리허설 ③2탭+상세+md 뷰어=목업 4본 ④worker 전체 흐름+breaker 실증 ⑤5키 일관 동작 ⑥구 이슈 export+삭제·구 스펙 supersede. 각 phase 경계에서 컨트롤러가 diff·검증 리뷰 후 phase child resolve, 통합 후 implementation 게이트 1회.
