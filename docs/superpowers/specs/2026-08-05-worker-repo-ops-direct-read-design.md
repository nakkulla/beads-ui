# 워커의 repo-ops.toml 직접 읽기 — 레포별 verify·deploy 실행 표면 전환

- Bead: `UI-kfl4` (blocks: `dotfiles-1tif` — 선행 유닛의 `[deploy]` 선언 문법과
  각 레포 선언 파일이 이 유닛의 입력이다)
- Route: `spec_backed`
- 날짜: 2026-08-05
- 전제 스펙: dotfiles
  `docs/superpowers/specs/2026-08-05-post-merge-coverage-declaration-design.md`

## 1. 문제

선언 SoT 단일화(dotfiles-1tif) 이후에도 실행 표면은
`~/.config/bdui/config.toml`의 레포별 `[worker.verify."<abs>"]` /
`[worker.deploy."<abs>"]` 사본이다. 선언(`<repo>/docs/agents/repo-ops.toml`)과
실행이 두 파일로 남는 한:

- 드리프트 창이 구조적으로 존재한다 — warn-only 체커가 install 시점에만 잡는다.
- 명령과 코드가 따로 움직인다 — 배포 명령을 바꾸는 PR이 머지돼도 사람이
  config.toml을 따로 고칠 때까지 옛 명령이 돈다.
- 레포만 읽어서는 실행되는 명령을 확정할 수 없다.

## 2. 목표

워커가 각 워크스페이스의 `docs/agents/repo-ops.toml` `[verify]`/`[deploy]`를
실행 표면으로 읽는다 — 단 워킹트리 파일이 아니라 **핀된 base SHA의 git blob**
에서(§4.1). config.toml의 레포별 verify·deploy 섹션은 레거시 폴백으로 강등 후
퇴출 경로에 올린다.

신뢰 구조(사용자와 확정):

- **어느 레포를 서빙할지**는 사용자 소유 — config.toml `workspaces` 존속.
- **그 레포에서 뭘 돌릴지**는 레포 선언 — 리뷰 게이트와 사람의 머지 클릭이
  보호한다.
- **서버 전역 설정**(Discord·서버 옵션 등)은 config.toml 존속.

## 3. 비목표

- config.toml 전면 폐지 — 전역 설정과 workspaces는 남는다.
- `deploy.json`·repo-deploy 엔진 변경 — `cmd = ["repo-deploy"]`로 선언한 레포의
  구현 세부.
- 선언 스키마 변경 — 문법은 dotfiles repo-onboarding 스킬 소유. 이 유닛은
  소비자다.
- **verify 자동 감지의 재도입** — 자동 감지는 `6ec89cb`(UI-uk6d, 2026-07-28)
  에서 의도적으로 폐지됐다("추측된 명령은 canonical 검증이 아니다"). 이 유닛은
  그 결정을 유지한다. 해석 사다리는 2단이다(§4.2).

## 4. 설계

### 4.1 핀된 SHA의 blob 읽기 (중심 불변식)

선언은 워킹트리 파일이 아니라 **컨텍스트별로 핀된 base SHA의 git blob**에서
읽는다 (`git show <pinned-sha>:docs/agents/repo-ops.toml` 상당):

| 해석 컨텍스트 | 핀 SHA |
| --- | --- |
| 머지 전 (poller의 local verify 시작 · merge gate 자격 · auto-merge 자격 · WS decoration) | fetch된 원격 target-base tip |
| 머지 후 (post_merge_verify · deploy) | `base_sync`가 확정한 `synced.sha` |

이 규칙이 두 위험을 동시에 막는다:

- **self-attestation**: 선언이 항상 base ref에서 오므로, PR이 자기 브랜치에서
  선언을 `cmd = ["true"]`로 바꿔도 그 PR의 검증 명령에는 반영되지 않는다 —
  검증 대상 코드는 PR head, 검증 **명령**은 base의 선언.
- **stale/uncommitted 워킹트리**: `base_sync`는 체크아웃이 dirty거나 base 브랜치
  가 아니면 fetch만 하고 성공한다(`fetch_only:not_on_base` / `fetch_only:dirty`
  — `server/worker/pr-actions.js` `BaseSyncOutcome`). 워킹트리 파일을 읽으면 그
  경우 낡은·미커밋 내용이 실행 명령을 결정한다. blob 읽기는 체크아웃 상태와
  무관하다.

resolver는 `(workspace root, pinned sha)`를 입력으로 받는다. 워크트리 경로를
받는 서명은 만들지 않는다.

### 4.2 해석 사다리와 3-상태 계약 (verify / deploy 공통)

```
1. <pinned-sha>:docs/agents/repo-ops.toml [verify]/[deploy]  ← 신규, 우선
2. config.toml [worker.verify]/[worker.deploy]                ← 레거시 폴백
```

해석 결과는 null로 축약하지 않고 **3-상태**로 반환한다:

- `resolved` — 유효한 선언/설정을 찾음. 1단이 있으면 1단이 이긴다. 1·2가 모두
  있고 내용이 다르면 경고 로그를 남기고 1단을 쓴다.
- `absent` — 그 단에 섹션이 없음 → 다음 단으로. 2단까지 없으면 최종 `absent`.
- `invalid` — 섹션은 있으나 해석 불가(TOML 파싱 실패, `cmd` 부재·비배열·빈
  배열). **다음 단으로 넘어가지 않는다** — 깨진 선언을 조용히 폴백으로 넘기면
  드리프트가 다시 숨는다. 모르는 키는 무시한다(additive 스키마, 관용 파싱 —
  구 서버가 신 선언을 읽는 창이 항상 존재한다, §4.3-1).

소비자 매핑 — 현행 소비자 전수(`resolveVerifyCmd`: poller local verify 시작
`pr-poller.js`, merge gate/auto-merge 자격 `attach.js`, WS decoration,
post-merge verify; `resolveDeploy`: cleanup deploy 단계)는 **같은 resolver
결과를 소비**하며, 상태별 행동은:

| 상태 | verify 소비자 | deploy 소비자 |
| --- | --- | --- |
| `resolved` | 현행 그대로 | 현행 그대로 |
| `absent` | 현행 null 의미 유지 — gate `'none'` tier, deploy는 `deploy_verify_missing` | 현행 "배포 없음" 통과. 단 자기 레포 예외(§4.3-3) |
| `invalid` | **fail-closed** — gate는 `'none'`으로 강등하지 않고 `undecidable`류 차단, post-merge verify는 실패로 기록 | `deploy_config_invalid`(신규 reason, 기존 `prefix:detail` 관용)로 cleanup 중단 |

`invalid`를 `'none'` tier로 붕괴시키면 깨진 선언이 무검증 통과 경로가 된다 —
현행 코드는 resolver 예외를 null로 축약하므로 이 구분 자체가 신규 계약이다.

- 파싱은 기존 `smol-toml`(이미 의존성, `server/config.js`)로 한다. 신규 의존성
  없음. blob 읽기는 기존 git spawn 관용을 따른다.

### 4.3 beads-ui 자기 레포 방어 3종

1. **구 프로세스가 신 파일을 파싱**: restart 전까지 도는 서버는 머지 전
   빌드이고 읽는 blob은 머지된 선언이다. 관용 파싱(§4.2 — 모르는 키 무시)이
   방어한다. 스키마 소유자(repo-onboarding 스킬)의 additive 원칙이 전제다.
2. **자기 레포 non-detached 거부**: 배포 대상 워크스페이스가 서버 자신의 설치
   레포(realpath 비교 — 서버 프로세스의 모듈 루트 vs workspace root)이면
   `detached = true`가 아닌 deploy를 거부한다(`deploy_not_detached_for_self`).
   동기 spawn이 정리 도중 서버 자신을 죽여 cleanup이 미완으로 멈추는 사고를
   선언 오류 시점에 차단한다. 선언 경로와 config 폴백 경로에 동일 적용.
3. **자기 레포 커버리지 소실 방어**: 일반 레포에서 최종 `absent`는 정당한 "배포
   없음"이지만, **서버 자신의 레포**에서 두 단 모두 deploy가 `absent`면 머지가
   재시작 없이 조용히 닫힌다 — "머지는 완료가 아니다"(AGENTS.md)가 침묵 속에
   깨진다. 이 경우만 명명된 실패(`deploy_missing_for_self`)로 cleanup을 중단해
   배너에 태운다. 선언 오염(`invalid`)은 §4.2가 이미 fail-closed.

### 4.4 마이그레이션과 부트스트랩

- 이 유닛은 **코드 전환만** 한다: 사다리 1단이 생기고, 2단(config.toml)은
  폴백으로 남는다. 각 레포의 선언 파일은 dotfiles-1tif가 이미 생성했으므로,
  랜딩 후 첫 해석부터 1단이 실효 표면이 된다.
- **부트스트랩 순서(F6)**: 이 유닛을 머지하는 시점의 구 서버 빌드에는 선언
  reader가 없다. 따라서 이 유닛 자신을 배달하는 재시작은 **레거시 config
  경로**가 수행하고, 1단 해석은 재시작된 신 서버의 다음 해석부터 관측된다.
  머지 전 확인: config.toml의 beads-ui `[worker.deploy]` 항목이 존재하고 선언
  파일과 일치하는지. 머지 후 확인: §6.
- config.toml 레포별 섹션의 실제 제거는 운영자 수동 정리다 — 드리프트 경고
  (§4.2)와 repo_ops_check가 정리 후보를 알려준다. 단 **서버 자기 레포의 config
  항목은 §4.3-3이 랜딩되기 전까지 제거하지 않는다**. repo-onboarding 스킬의
  신규 등록 안내 문구 갱신은 dotfiles 측 한 줄 후속으로 제기한다(스키마·스킬은
  dotfiles 소유 — 비목표).

## 5. Test scope

1. **사다리 우선순위**: 선언 blob과 config.toml이 다른 cmd를 가질 때 선언이
   이긴다. RED 근거: 현행 resolver는 config.toml만 읽으므로 config 값이 나온다.
2. **self-attestation**: PR 브랜치가 자기 선언을 `cmd = ["true"]`로 바꿔도 그
   PR의 머지 전 verify 해석은 base tip의 선언을 쓴다. RED 근거: (구현 전에는
   선언을 아예 안 읽어 base/PR 구분 자체가 없다) — 구현 후 이 테스트가 blob
   핀 규칙의 회귀 방벽이 된다.
3. **fetch_only 회귀**: `fetch_only:dirty` 상황(워킹트리에 미커밋 선언 수정)
   에서도 해석은 핀 SHA의 blob 내용을 쓴다. RED 근거: 워킹트리 읽기 구현이라면
   미커밋 내용이 나온다 — blob 구현을 강제하는 시임.
4. **자기 레포 non-detached 거부**: 배포 대상 == 서버 설치 레포 픽스처에서
   `detached` 없는 선언이 `deploy_not_detached_for_self`로 거부된다. RED 근거:
   현행 코드에 그런 가드가 없어 동기 spawn 경로로 진행된다.
5. **invalid fail-closed (verify·deploy 각각)**: `cmd = "문자열"`인 선언이
   verify에선 gate 차단·post-merge 실패로, deploy에선 `deploy_config_invalid`로
   기록되고 config 폴백으로 넘어가지 않는다. RED 근거: 현행 코드는 선언을 읽지
   않으므로 config 값으로 성공한다.
6. **자기 레포 커버리지 소실**: 서버 설치 레포에서 두 단 모두 deploy `absent`면
   `deploy_missing_for_self`로 중단된다. RED 근거: 현행 `resolveDeploy()` null은
   "배포 없음" 통과다.

## 6. 검증과 머지 후

- Pre-handoff: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`.
- 머지 후(부트스트랩 순서 반영): ① 레거시 config 경로가 재시작을 수행한다(구
  서버 빌드 — §4.4). ② 재시작 후 실측: 프로세스 경로·포트·HTTP 응답. ③ 신
  서버에서 해석을 한 번 유발(모니터 갱신 또는 다음 워커 이벤트)한 뒤 워커
  로그에서 1단(blob) 해석 로그를 확인한다. ①이 실패하면 수동 `bdui-shared
  restart` 후 ②③.

## 7. 잔여 위험

- **머지된 선언 오류의 즉시 반영**: 선언이 이기므로, 잘못된 cmd가 리뷰를 뚫고
  머지되면 다음 해석부터 실행된다. 방어는 리뷰 게이트 + 자기 레포 가드(§4.3) +
  invalid fail-closed(§4.2)이며, config.toml 시절에도 사용자 오타는 같은 등급의
  위험이었다 — 사람 손이 한 번 더 갔을 뿐이다.
- **blob 읽기의 git 의존**: 해석마다 git spawn이 하나 늘어난다. 소비자 중 빈도
  높은 곳(WS decoration)은 poller 주기 캐시를 따르므로 부하 증가는 상수 배다.
  실측에서 문제되면 (sha, path) 키 캐시는 additive.
- **머지 전 핀과 머지 후 핀의 불일치 창**: base tip이 머지 사이에 움직이면 머지
  전 해석과 머지 후 해석이 다른 선언을 볼 수 있다 — 그러나 각 시점의 blob은
  그 시점 base의 리뷰된 내용이므로, 이는 드리프트가 아니라 base 전진의 정상
  의미론이다.
