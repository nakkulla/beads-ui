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

워커가 각 워크스페이스 **base 체크아웃**의 `docs/agents/repo-ops.toml`
`[verify]`/`[deploy]`를 실행 표면으로 직접 읽는다. config.toml의 레포별 verify·
deploy 섹션은 레거시 폴백으로 강등 후 퇴출 경로에 올린다.

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
- verify 자동 감지(`server/worker/verify-cmd.js`)의 제거 — 폴백 사다리의 마지막
  단으로 유지.

## 4. 설계

### 4.1 self-attestation 제약 (중심 불변식)

선언은 **base_sync 이후의 base 체크아웃에서만** 읽는다. PR 워크트리에서 읽으면
PR이 자기 검증 명령을 정의한다 — `cmd = ["true"]`로 바꾼 PR은 검증을 자동
통과한다. 워커가 실행하는 verify/deploy는 머지 후(post_merge_verify → deploy)
뿐이므로 base 읽기로 충분하다. resolver는 워크스페이스 root(= config.toml
`workspaces`에 등록된 base 체크아웃 경로)만 입력으로 받고, 워크트리 경로를 받는
서명을 만들지 않는다.

### 4.2 해석 사다리 (verify / deploy 공통)

```
1. <workspace root>/docs/agents/repo-ops.toml [verify]/[deploy]  ← 신규, 우선
2. config.toml [worker.verify]/[worker.deploy]                    ← 레거시 폴백
3. (verify만) 기존 자동 감지                                       ← 최후단, 현행 유지
```

- 1이 있으면 1이 이긴다. 1·2가 모두 있고 내용이 다르면 **경고 로그**를 남기고
  1을 쓴다 — 드리프트가 런타임에서도 보이게 된다(install 시 warn-only 체커와
  이중화).
- 1의 파싱은 기존 `smol-toml`(이미 의존성, `server/config.js`가 사용)로 한다.
  신규 의존성 없음.
- **관용 파싱**: 모르는 키는 무시한다(스키마 additive 원칙 — 구 서버가 신 선언을
  읽는 창이 항상 존재한다, §4.3-1). 형식이 깨진 파일·`cmd`가 비어 있거나 argv
  배열이 아닌 섹션은 **그 섹션 부재로 취급하지 않고 fail-closed**한다 — verify는
  해석 불가(`deploy_verify_missing`과 같은 등급의 기존 실패 어휘), deploy는
  `deploy_config_invalid`(신규 reason, 기존 `prefix:detail` 관용을 따름). 깨진
  선언을 조용히 폴백으로 넘기면 드리프트가 다시 숨는다.

### 4.3 beads-ui 자기 레포 방어 3종

1. **구 프로세스가 신 파일을 파싱**: restart 전까지 도는 서버는 머지 전 빌드이고
   읽는 파일은 머지된 선언이다. 관용 파싱(§4.2)이 방어한다. 스키마 소유자
   (repo-onboarding 스킬)의 additive 원칙이 전제다.
2. **자기 레포 가드**: 배포 대상 워크스페이스가 서버 자신의 설치 레포(realpath
   비교 — 서버 프로세스의 모듈 루트 vs workspace root)이면 `detached = true`가
   아닌 deploy를 **거부**한다(`deploy_not_detached_for_self`). 동기 spawn이
   정리 도중 서버 자신을 죽여 cleanup이 미완으로 멈추는 사고를 선언 오류
   시점에 차단한다. 이 가드는 config.toml 폴백 경로에도 동일 적용한다.
3. **선언 부재·오염**: §4.2의 fail-closed 규칙. 배너 + 수동 경로라는 기존 실패
   표면을 그대로 쓴다 — 새 실패 UI를 만들지 않는다.

### 4.4 마이그레이션

- 이 유닛은 **코드 전환만** 한다: 사다리 1단이 생기고, 2단(config.toml)은 폴백
  으로 남는다. 각 레포의 선언 파일은 dotfiles-1tif가 이미 생성했으므로, 랜딩
  직후부터 1단이 실효 표면이 된다.
- config.toml 레포별 섹션의 실제 제거는 운영자 수동 정리다 — 강제하지 않고,
  드리프트 경고(§4.2)와 repo_ops_check가 "선언과 일치하는 레거시 섹션"을 정리
  후보로 알려준다. dotfiles repo-onboarding 스킬의 동기화 절차 문구 갱신(신규
  등록은 선언 파일로 안내)은 dotfiles 측 한 줄 후속으로 제기한다 — 이 유닛의
  비목표(스키마·스킬은 dotfiles 소유).

## 5. Test scope

1. **해석 사다리 우선순위** (`server/worker/verify-cmd` 및 deploy resolver
   테스트): 선언 파일과 config.toml이 다른 cmd를 가질 때 선언이 이긴다. RED
   근거: 현행 resolver는 config.toml만 읽으므로 config 값이 나온다.
2. **자기 레포 가드**: 배포 대상 == 서버 설치 레포 픽스처에서 `detached` 없는
   선언이 `deploy_not_detached_for_self`로 거부된다. RED 근거: 현행 코드에 그런
   가드 자체가 없어 동기 spawn 경로로 진행된다.
3. **깨진 선언 fail-closed**: `cmd = "문자열"`(argv 아님)인 `[deploy]` 선언이
   `deploy_config_invalid`를 반환하고 config.toml 폴백으로 넘어가지 않는다. RED
   근거: 현행 코드는 선언 파일을 아예 읽지 않으므로 config 값으로 성공한다.

## 6. 검증과 머지 후

- Pre-handoff: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`.
- 머지 후: 이 저장소 자신의 `[deploy]` 선언(`bdui-shared restart`,
  `detached = true`)이 재시작을 커버한다 — 이 유닛이 랜딩하면 그 선언을 읽는
  주체가 바로 이 유닛의 코드가 된다(첫 자기 적용). 재시작 후 실측: 프로세스
  경로·포트·HTTP 응답 + 워커 로그에서 선언 경로(1단)로 해석됐는지 확인.

## 7. 잔여 위험

- **머지된 선언 오류의 즉시 반영**: 선언이 이기므로, 잘못된 cmd가 리뷰를 뚫고
  머지되면 다음 머지의 post-merge부터 실행된다. 방어는 리뷰 게이트 + 자기 레포
  가드(§4.3-2) + fail-closed(§4.2)이며, config.toml 시절에도 사용자 오타는 같은
  등급의 위험이었다 — 사람 손이 한 번 더 갔을 뿐이다.
- **base 체크아웃이 낡은 경우**: 선언 읽기는 base_sync 이후이므로 정리 경로에선
  항상 머지 tip이다. 정리 밖에서 resolver를 재사용하는 소비자가 생기면 그
  시점의 base가 낡을 수 있다 — 서명에 "base_sync 이후 호출" 전제를 JSDoc으로
  못박고, 정리 밖 소비자 추가는 별도 판단.
