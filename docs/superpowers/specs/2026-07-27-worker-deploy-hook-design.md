# 워커 post-merge deploy hook + 검증·배포 설정 표시 (UI-3onr)

- 날짜: 2026-07-27
- Bead: UI-3onr
- 배경: UI-89q5 머지 후 공유 서버가 구버전 번들을 서빙한 사고. 워커 [머지]
  cleanup 파이프라인(base_sync → post_merge_verify → child_sweep → parent_close
  → branch_cleanup)에 배포 단계가 없고, AGENTS.md의 Post-Merge Runtime
  Validation은 에이전트 세션용 지침이라 UI 버튼 머지 경로에는 수행 주체가 없다.
- 목업: `http://<ts-ip>:9000/2026-07-27-worker-deploy-settings-dialog.html`
  (사용자 승인됨, 2026-07-27)

## 목표

1. repo별 post-merge deploy 명령을 `config.toml`로 정의하고, 머지 cleanup의
   최종 단계로 자동 실행한다 (verify 통과 시에만 — fail closed).
2. 워커 ⚙ 「전역 실행 설정」 다이얼로그에 현재 workspace의 verify/deploy 설정과
   마지막 배포 결과를 read-only로 표시한다.

## 스코프 제외 (YAGNI)

- 전체 repo 테이블 표시 (현재 workspace만 표시).
- UI에서의 명령 편집 (명령 정의는 config 파일 전용 — 보안 경계).
- 수동 [지금 배포] 버튼 (실패 시 기존 cleanup [재실행]으로 충분).
- deploy 자동 감지 (verify와 달리 감지 폴백 없음 — 임의 명령 추측 금지).

## 1. Config 스키마 (`server/config.js`)

`[worker.verify."<abs>"]`와 대칭인 섹션 신설:

```toml
[worker.deploy."/Users/me/GitHub/beads-ui"]
cmd = ["bdui-shared", "restart"]   # 필수: non-empty argv 배열 (셸 없이 spawn)
timeout_ms = 600000                # 선택: 양수 아니면 기본 10분 (verify와 동일)
detached = true                    # 선택: boolean 아니면 false
```

- `normalizeWorkerDeploy(parsed)` 추가 — `normalizeWorkerVerify` 미러링: 키는
  `normalizeWorkspacePath`로 절대경로 해석 실패 시 스킵, `cmd`가 non-empty
  string 배열이 아니면 스킵·로그(셸 한 줄 문자열 거부), `timeout_ms` 검증,
  `detached`는 `value.detached === true`만 true.
- `getConfig()` 반환에 `worker_deploy: Record<string, { cmd: string[],
  timeout_ms: number, detached: boolean }>` 추가. 기존 패턴대로 매 호출 재파싱
  (서버 재시작 없이 config 편집 반영).
- 섹션이 없는 repo는 "배포 해당 없음" — cleanup deploy 단계는 즉시 통과
  (verify의 "명령 없음 = 통과"와 동일한 의미론).

## 2. 파이프라인 통합 (`server/worker/pr-actions.js`)

- `CLEANUP_STEPS`를 6단계로 확장: `[..., 'branch_cleanup', 'deploy']`.
  deploy는 최종 단계. `post_merge_verify` 실패 시 파이프라인이 2단계에서 이미
  멈추므로 깨진 커밋은 deploy에 도달할 수 없다 (fail closed는 구조로 보장).
- 실행 대상: 배포는 verify와 달리 detached worktree가 아니라 **base_sync된
  로컬 base 체크아웃**을 전제로 한다. base_sync 결과가 `fast_forwarded`가
  아니면 (`fetch_only:dirty` / `fetch_only:not_on_base` — 로컬 체크아웃이 머지
  커밋과 다를 수 있는 상태) stale 코드 배포를 막기 위해 deploy 단계를
  `deploy_base_not_synced`로 실패 처리한다. 사용자가 체크아웃을 정리한 뒤
  [재실행]하면 된다.
- 동기 모드 (기본, `detached = false`): repo 루트에서 `cmd`를 셸 없이 spawn,
  `timeout_ms` 데드라인. 종료코드 0 = `deployed`, 비0 = `deploy_failed`,
  타임아웃 = `deploy_timeout`, spawn 불가 = `deploy_spawn_error`.
- detached 모드 (`detached = true`): 앞 5단계와 durable 기록(`last_deploy` +
  cleanup 완료 기록)을 모두 마친 뒤 detached + unref로 발사하고 즉시
  `launched`로 기록. 프로세스 결과는 추적하지 않는다 (자기재시작 repo — 예:
  beads-ui의 `bdui-shared restart` — 는 서버 자신이 죽으므로 추적 불가).
- 실패 처리: deploy 단계 실패는 기존 `merged_cleanup_failed` durable 레코드에
  `cleanup_step: 'deploy'`로 기록 — 기존 실패 배너 + [재실행] 경로 재사용.
  머지는 이미 일어난 뒤라는 기존 cleanup 실패 의미론과 동일하다.

## 3. Durable 기록 + 페이로드

- queue-store(queue.json)에 workspace당 `last_deploy` 레코드 (마지막 1건
  덮어쓰기): `{ outcome: 'deployed'|'launched'|'failed', reason: string|null,
  bead_id, base_sha, at }`.
- `worker-queue-snapshot`의 `workspace_info` 확장 (`server/ws/
  worker-handlers.js decorateQueue`): 기존 `verify_cmd`( `{ cmd, timeout_ms,
  source }` — 이미 전송 중, 렌더러 없음)에 더해
  `deploy_cmd: { cmd, timeout_ms, detached } | null`과
  `last_deploy: <레코드> | null` 추가.

## 4. UI (`app/views/worker/exec-defaults-dialog.js`)

기존 편집 폼 아래에 read-only 「검증·배포 설정」 섹션 추가. 데이터는 이미 구독
중인 `queueStore` 스냅샷의 `workspace_info`에서 읽는다 (새 요청/채널 없음).
목업(승인됨)의 상태별 구성:

- 검증: 명령(argv 공백 join) + source 배지(`config`/`자동감지`) + timeout.
  verify 신호가 없으면 "검증 없음" 안내.
- 배포: 명령 + `config` 배지 + (해당 시) `detached` 배지 + "timeout N분 ·
  verify 통과 시에만 실행". 미설정이면 "배포 없음 —
  `[worker.deploy."<현재 workspace 경로>"]` 섹션으로 정의" 안내 한 줄.
- 마지막 배포: `성공`/`발사됨`/`실패 · <reason>` 배지 + 시각 + bead ID + SHA
  앞 7자리. 기록이 없으면 행 자체를 생략 (fail-quiet — 계약 소비자 규칙).
- 섹션 제목 옆 「읽기 전용 — config.toml에서 정의」 pill로 편집 불가 경계 명시.
  편집 UI 없음. 컨트롤바 상시 스트립은 부활하지 않는다 (worker-phase2 §2 유지).

## 5. 계약 co-update (dotfiles)

cleanup 단계 시퀀스는 dotfiles pr-finish 계약이 소유하는 표면이다. beads-ui
구현과 같은 전달 단위로 dotfiles 계약 문서에 반영한다: 6단계 확장(`deploy`
최종), 실행 조건(verify green에서만 도달), `detached` 의미론(기록 후 발사 =
`launched`), `deploy_base_not_synced` 실패 사유. 반영 순서는 계약 문서
먼저(또는 동시) → beads-ui PR 머지.

## 6. 테스트

- `config.test.js`: `normalizeWorkerDeploy` — argv 아닌 cmd 거부, timeout
  기본값, `detached` boolean 강제, 비절대경로 키 스킵.
- `pr-actions.test.js`: 동기 성공/실패/타임아웃 기록, detached "기록 후 발사"
  순서(발사 전 durable 기록 완료 검증), `fetch_only:*` →
  `deploy_base_not_synced`, verify 실패 시 deploy 미도달, deploy 미설정 시
  통과, 실패 시 `merged_cleanup_failed`에 `cleanup_step: 'deploy'`.
- `worker-handlers` 테스트: `workspace_info.deploy_cmd`/`last_deploy` 노출.
- `exec-defaults-dialog` 테스트: 설정 있음/없음/마지막 배포 배지 렌더,
  detached 배지, 편집 요소 부재.

## 7. 전달 순서

1. dotfiles 계약 문서 업데이트 (별도 커밋, dotfiles 저장소).
2. beads-ui 구현 PR — Pre-Handoff Validation(tsc/test/lint/prettier/build,
   번들 포함) 후 제출.
3. 머지 후 `~/.config/bdui/config.toml`에 beads-ui용 `[worker.deploy]` 섹션
   추가 (사용자 소유 파일 — 기록 전 확인).
4. Post-Merge Runtime Validation (이번 변경 자체는 아직 hook 없이 머지되므로
   마지막 수동 배포: 번들 빌드 확인 + `bdui-shared restart` + 검증).
