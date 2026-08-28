---
scope:
  - docs/adr/
  - AGENTS.md
---

# 승인 spec 기반 ADR backfill + 인덱스·AGENTS.md ADR 참조 — beads-ui

- Bead: `UI-ucni` (`route=spec_backed`)
- 날짜: 2026-08-28
- 출처: dotfiles ADR 체계(ADR 0014, `dotfiles-c7mq`); 형식·판정 기준은 dotfiles `adr` 스킬
  (`src/shared/skills/tools/adr/`, 설치본 `~/.claude/skills/adr/`)

## 1. 문제

spec 233건 중 여러 건이 앞선 결정을 뒤집었고(자동 수리 레인 도입→확장→폐기, 병렬성 분석 4 spec→전면
제거, Reconciler→intent-only), 현재 유효한 방향은 spec 상단 `⚠️ SUPERSEDED` 배너를 따라가야만 알 수
있다. `docs/adr/001`, `002`만 있고 인덱스·frontmatter·읽기 훅이 없다.

## 2. 결정 (ADR 후보)

- 기존 001/002는 재작성하지 않고 4자리로 rename + frontmatter만 붙인다(001은 002에 superseded).
  3조건: 되돌리기 X / 놀라움 X / 대안(재작성) → ADR 아님, 본 spec 기록.
- 체인은 최종 상태 ADR 1건 + Context 이력. → ADR 아님(dotfiles `2026-08-28-adr-audit-and-backfill`
  spec과 동일 규칙).
- backfill 13건은 각각 ADR 후보이며 3조건 판정은 §4 표에 있다.

## 3. 기존 ADR 마이그레이션

| 파일 | 처분 |
|---|---|
| `001-push-only-lists.md` → `0001-push-only-lists.md` | frontmatter `id: 1`, `status: "superseded"`, `superseded_by: 2`, `date`는 파일 최초 git 추가일, `summary`는 본문 결정 한 줄; 본문 불변 |
| `002-per-subscription-stores-and-full-issue-push.md` → `0002-...md` | `id: 2`, `status: "accepted"`, `supersedes: [1]`; 본문 불변 |

rename은 `git mv`. 본문 안의 `001-`/`002-` 상호 링크가 있으면 새 파일명으로만 갱신(링크 수정 범주).

## 4. Backfill 목록 (신규 0003~0015)

`date`는 최종 spec 날짜, `spec`은 최종 spec 경로(`docs/superpowers/specs/` 상대), `bead`는 spec이
명시할 때만. 체인 이력은 Context에.

| # | 결정(summary 초안) | 3조건 (되돌리기/놀라움/대안) | 근거 spec (→ 최종) | bead |
|---|---|---|---|---|
| 0003 | 머지 자격 판정은 GitHub checks·Actions를 보지 않으며 PR/base/head identity·mergeability·리뷰 영수증·`[verify]`만 입력이다 | O 머지 게이트 근간 / O CI 없이 머지 / O GH Actions 재도입 명시 기각 | 2026-08-13-worker-repo-operation-auto-repair-design.md | UI-vobi |
| 0004 | impl_review 신선도는 exact-head가 아니라 ancestry(`merge-base --is-ancestor`)로 판정하고 head 이동만으로 재리뷰를 dispatch하지 않으며(08-19의 resolver 예외 레이어도 08-27에 제거) 실질 검증은 `[verify]`가 맡는다 | O 머지 게이트 / O 리뷰 후 push해도 재리뷰 없음(잔여 리스크 수용) / O exact-head 유지·resolver 예외 유지 기각 | 2026-08-19-impl-review-ancestry-verify-design.md → 2026-08-27-head-review-layer-removal-design.md | UI-d7fy |
| 0005 | 자동 AI 수리 레인을 두지 않는다 — post-merge 실패는 `needs_human`으로 종단하고 재진입은 사람 클릭뿐이다(도입 08-11 → 세분화 08-24 → 폐기 08-27) | O 완료 경로 근간 / O 도입 16일 만에 전면 폐기 / O bounded repair 유지 기각 | 2026-08-11-self-healing-auto-merge-completion-intent-design.md, 2026-08-24-needs-human-auto-resolution-design.md → 2026-08-27-completion-repair-lane-removal-design.md (`AGENTS.md` 185–189행의 `auto_repair_session` 사다리는 stale — §9 형제 quick_fix가 정정; ADR Context에 그 Bead 인용) | UI-8w4t |
| 0006 | 세션은 PR 배달까지만 하고 머지는 Worker 단일 큐가 수동(`[머지]` 클릭) 또는 `auto_merge` authority에 따라 실행하며, 완료는 MERGED 관측으로 판정한다 — 세션 자체 머지와 codex `/goal`→pr-finish 파이프라인은 금지 | O 워커 아키텍처 / O 세션이 머지 안 함·큐 단일화 / O 세션 머지·2단 파이프라인 기각 | 2026-05-13-worker-board-redesign-design.md → 2026-07-12-worker-board-v2-ccx-queue-design.md → 2026-07-26-worker-phase2-pr-queue.md → 2026-07-28-pr-auto-merge-toggle-design.md | UI-yk55 |
| 0007 | 머지 금지 강제층은 git 수준 예방 + 사후 ref 불변식이며, 텍스트 판정은 추론성 판정(base push 등)을 경고·증거로 강등하되 정확한 원격 변경·가드 무력화 명령(`gh pr merge`, hook 무력화)의 kill은 유지한다 | O 보안 계층 / O 추론성 kill 권한 회수 / O 브랜치 보호 등 5개 대안 기각 | 2026-07-30-guard-enforcement-layer-replacement-design.md | UI-8mvc |
| 0008 | 데이터 계층은 `bd` CLI shell-out(snapshot 기본 2회 read, legacy capability fallback은 3회)이며 MySQL/Dolt 드라이버 직결·daemon·batch RPC는 채택하지 않는다 | O 전체 read 경로 / O SQL DB인데 드라이버 우회 / O daemon·batch RPC 기각 | 2026-08-12-workspace-snapshot-polling-design.md | |
| 0009 | 병렬성 분석 기능(코드·테스트·프로토콜)은 제거하고 수동 "배포 실행" 버튼만 두며 `script_retry`는 토글 없이 상시다 | O 4 spec 투자 폐기 / O 기능 통째 제거 / O 유지·축소 기각 | 2026-08-12-worker-parallelism-analysis-design.md, 2026-08-18-parallel-analysis-codex-runner-design.md, 2026-08-19-parallel-analysis-observability-design.md, 2026-08-20-parallel-analysis-scope-signal-design.md → 2026-08-27-worker-repo-ops-cleanup-deploy-button-design.md (08-13 lane-scheduling은 비범위로 유지) | UI-s582 |
| 0010 | 배포에서 Worker는 generic execution(durable operation journal·전용 worktree·프로세스 실행/대기)을 소유하고 repo-ops `[deploy]` 스크립트는 저장소별 apply/readback만 소유하며, Reconciler·self-restart helper·filesystem marker authority는 폐기했다 | O 배포 아키텍처 / O Reconciler→intent-only→journal 소유 2회 반전 / O Reconciler·external deployment-job 기각 | 2026-08-10-one-click-deployment-reconciler-design.md → 2026-08-12-repo-deployment-job-design.md → 2026-08-13-worker-repo-operation-auto-repair-design.md | UI-vobi |
| 0011 | `auto_merge`와 `auto_advance`는 독립 스위치다 — 세션은 되돌릴 수 있고 머지는 되돌릴 수 없으므로 한 스위치로 묶지 않는다 | O 자동화 안전 모델 / O 단순화 거부 / O 단일 스위치 기각 | 2026-07-28-pr-auto-merge-toggle-design.md | UI-yk55 |
| 0012 | 워크플로 계약의 canonical은 dotfiles이고 beads-ui는 계약 subset을 코드 내 field registry로 복제해 소비한다(런타임 직접 읽기 안 함) | O 계약 소비 방식 / O 직접 읽기 대신 복제 / O 직접 읽기 기각 | 2026-05-05-detail-workflow-config-design.md | |
| 0013 | 세션 기본값(9키)의 source of truth는 dotfiles `bd kv workflow_session_defaults`이며 beads-ui workspace 레이어는 소유권을 반납했다 | O 설정 SoT 이관 / O 자기 코드 줄이고 위임 / O workspace 레이어 유지 기각 | 2026-08-10-workspace-default-preset-runtime-target-design.md → 2026-08-16-unified-settings-session-defaults-design.md | UI-qeiz |
| 0014 | Worker/Monitor 레인·카드는 단일 `buildLanes` N-워크스페이스 계약 + 공유 슬롯 표로만 조립하며 카드가 자기 자리를 고르지 않는다 | O 뷰 계층 근간 / O 두 탭 분기 통일 / O 개별 조립 관행 기각 | 2026-08-25-card-header-grammar-unify-design.md, 2026-08-27-worker-monitor-lane-surface-unify-design.md → 2026-08-27-lane-model-unify-design.md | UI-4tud |
| 0015 | 30분 룰은 failure timeout이 아니라 queue-yield deadline이며 충돌 해소 fence는 manual authority 면제 + 자동 항목 슬롯 기반 디스패치다 | O 동시성 안전 모델 / O 같은 숫자 의미 반전·fence 완화 / O 전역 정지 유지 기각 | 2026-07-28-pr-wait-merge-queue-design.md → 2026-08-11-late-conflict-resolution-reentry-design.md, 2026-08-19-merge-queue-fence-lane-reconcile-design.md | UI-75xw |

제외: bd JSON capability 판정(08-17), resolver 결속 SoT(08-20), exec-point guard 위협 모델(07-27) —
되돌리기 비용은 있으나 놀라움·대안이 약함.

## 5. 인덱스·읽기 훅

- `python3 ~/.claude/skills/adr/scripts/adr-index.py --dir docs/adr` 로 `docs/adr/README.md` 생성,
  `--check` 0.
- `AGENTS.md`에 한 줄: `- 설계 결정 정본: \`docs/adr/README.md\` "현재 유효한 결정" — 설계 변경 전
  확인, 충돌 시 supersede ADR 필요 (\`adr\` 스킬; 인덱스는 생성물이라 직접 편집 금지).`
- `docs/architecture.md`의 "SQLite" 표기는 이 spec 범위 밖(관찰).

## 6. 작성 규칙

dotfiles spec `2026-08-28-adr-audit-and-backfill-design.md` §5와 동일: 한국어, Context / Decision /
Considered Options / Consequences, 1쪽 이내, spec 복사 금지, Decision 문장은 현재 코드(`server/`,
`AGENTS.md`)에서 한 번 실측 확인.

## 7. Test scope

- `python3 ~/.claude/skills/adr/scripts/adr-index.py --dir docs/adr --check` — 파일 추가 후
  미재생성이면 exit 1, 재생성 후 0. 이 repo에 required 테스트로 등록하지 않는다(테스트 러너 정책은
  이 spec 범위 밖).

## 8. 구현 unit 후보

1. `migrate`: §3 rename + frontmatter.
2. `backfill-a`: 0003~0009. 3. `backfill-b`: 0010~0015 + 인덱스 + AGENTS.md.

## 9. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | blocks 대상 | Bead ID |
|---|---|---|---|---|---|
| 형제 | beads-ui (UI rig) | defect | `AGENTS.md` 185–189행 `auto_repair_session` 사다리가 08-27 제거 이후 stale — 지침 정정(+생성본 동기화)은 ADR 작성과 별개의 소유자·검증(지침 checker) | 없음 (0005 Context가 이 Bead를 인용; 실행 순서 무관) | UI-jye3 |

- 관찰: `docs/architecture.md` SQLite 표기 stale — 이 spec 범위 밖, 별도 quick_fix 후보.
- 관찰: `--check`를 beads-ui 테스트 러너에 등록할지는 러너 정책 소유자 판단.
