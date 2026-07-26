# 워커 target_base 레포별 config 해석 + admission 거부 사유에 base 명시 (UI-2wa9)

- 라우트: spec_backed · bead: UI-2wa9
- 발단: TRACE-ICI-guu가 `gh_unavailable` 해소 후 `spec_missing`으로 연속 거부된 실사고.

## 배경 (실측)

1. `server/worker/attach.js:53` `DEFAULT_TARGET_BASE = 'main'`. 실제 해석은
   `attach.js:151-154`에서 `md.target_base`(bead 메타데이터) → `config.target_base`,
   그리고 `attach.js:241` `options.target_base || DEFAULT_TARGET_BASE`.
   운영 경로인 `attachmentsFor`(`attach.js:437`)는 `target_base` 옵션을 주지 않으므로
   **bead 메타데이터가 없으면 항상 `main`**이다.
2. 통합 브랜치가 `main`이 아닌 레포에서 admission의
   `git cat-file -e <base>:<spec_id>`(`admission.js:88`)가 실패해 `spec_missing`으로
   거부한다. 실측: TRACE-ICI의 spec은 `ilsun/dev`에만 존재하고 `main`에는 없다.
3. `origin/HEAD`는 `origin/main`이다 — **레포 기본 브랜치 자동감지로는 해결되지 않는다.**
   실제 통합 브랜치는 git이 선언적으로 알려주지 않는다.
4. config는 이미 절대경로로 키잉된 레포별 워커 섹션 패턴을 가진다
   (`[worker.verify."<abs>"]`, `config.js:83-145`).

`target_base`는 bead의 속성이 아니라 레포 워크플로의 속성이다 — 레포 내 모든 bead가
같은 base로 간다. bead마다 손으로 적는 것은 레포 단위 사실의 N회 반복이고, 한 번
빠뜨리면 위 증상이 난다.

## §1 레포별 config 해석

해석 순서를 **`bead metadata > 레포별 config > 'main'`**으로 만든다.

config 표면(신규):

```toml
[worker.target_base]
"/Users/me/GitHub/TRACE-ICI" = "ilsun/dev"
```

경로→브랜치 평면 맵. `worker.verify`와 동일하게 절대경로 키를 `normalizeWorkspacePath`로
정규화하고, 비절대 키·비문자열/빈 값 섹션은 무시한다(무시 시 `log` 1줄, 기존 선례 동일).

해석 지점은 `createWorkerAttachment` 내부:
`options.target_base ?? configTargetBase(workspace_root) ?? DEFAULT_TARGET_BASE`.
`options.target_base`를 유지해 테스트 주입 seam을 보존한다.

대안으로 `[worker.repo."<abs>"] target_base = "..."`(레포별 섹션에 향후 설정 추가 가능)을
검토했으나, 지금 필요한 설정이 하나뿐이라 쓰이지 않을 추상화를 미리 세우지 않는다.
설정이 둘 이상이 되면 그때 승격한다.

**계약 위치 (실측 정정)**: `target_base`는 dotfiles `docs/contracts/workflow.yaml`의
`parent_keys`에 **정의되어 있지 않다**(정의된 키는 `route`·`workflow_mode`·`spec_id`·
`plan_path`·`plan_review`·`plan_check`·`spec_review`·`impl_review`·`pr_url`·`blocked_reason`·
`last_checked_sha`·exec 4키·`parent`·`plan_task_anchor`·`child_disposition`. yaml 내
`target_base_integration`/`confirm_merged_sha_in_target_base`는 finishing 어휘이지 키 정의가
아니다). 즉 beads-ui가 `md.target_base`를 읽고는 있으나 canonical 정의가 없는 상태다.

이 스펙은 **그 키를 정의하지 않는다.** 바꾸는 것은 키 부재 시의 fallback뿐이고, 그 fallback은
지금도 beads-ui가 소유한다(`DEFAULT_TARGET_BASE`). bead 메타데이터가 최우선이라는 순서도
그대로다 — 따라서 계약에 정의가 생기더라도 이 변경과 충돌하지 않는다.

**계약 정정은 별도 제기 대상이다.** AGENTS.md("계약 키의 부재를 관측하면 fail-quiet하고 계약
쪽 정정을 별도로 제기한다")에 따라, `target_base`의 형식·의미·우선순위를 dotfiles 계약에
정의하는 일은 이 단위 밖의 후속으로 남기고 이 스펙 안에서 정의를 선점하지 않는다.

## §2 거부 사유에 base 명시

`spec_missing`은 오해를 부른다 — spec이 없어진 게 아니라 **그 base에 없었을** 뿐이다.

**사유 값 형태(확정)**: `spec_missing_at_base:<base>` — 단일 문자열, `prefix:detail`.
이 레포의 기존 선례와 동일한 형태다(`verify_failed:<reason>`, `session_failed:<reason>`,
`merge_failed:<reason>`, `child_close_failed:<id>`). 별도 필드를 만들지 않는 이유:
`Queue.admission[bead_id]`는 `{ reason: string, at: number }`로 **영속**되고
(`queue-store.js` normalize가 `typeof value.reason === 'string'`으로 검증),
ws 응답과 UI가 모두 이 문자열 하나만 전달한다. 문자열 인코딩을 쓰면 스키마 변경도
normalize 마이그레이션도 필요 없다.

**실을 base 값(확정)**: 브랜치명 등 `snap.target_base` 문자열 그대로. pinned `base_oid`(SHA)가
아니다 — 사람이 배지를 보고 취해야 할 행동은 "base가 `main`인데 `ilsun/dev`여야 한다"는
판단이고, SHA는 그 판단에 쓸 수 없다. dispatch 재검사가 pinned OID로 돌 때도 사유에는
그 attempt의 `target_base` 문자열을 싣는다.

**전파 경로**: `admission.js`가 사유 생성 → `scheduler.js`의 `recordAdmission` → `queue.json`
영속 → ws `worker-queue-snapshot` → UI 배지가 첫 `:`에서 분리해 base를 표시. 기존에 기록된
`spec_missing` 문자열은 그대로 유효하며(정규화 불요) base 없이 렌더된다.

`spec_id` 자체가 비어 있는 거부(`admission.js:54-56`)는 base와 무관하므로 현행 `spec_missing`을
유지해 두 경우를 구분한다.

## §3 비목표

- **현재 체크아웃 HEAD 자동 추종.** 공유 체크아웃의 HEAD는 사용자가 수시로 바꾸는 휘발성
  상태다. base가 조용히 움직이면 PR 대상과 admission의 spec 도달성·신선도 판정 기준이 함께
  움직이고, dispatch 시점 base 핀 고정으로 TOCTOU를 막는 현행 설계와 정면 충돌한다.
  워크스페이스가 200여 개인 환경에서 각 레포 HEAD가 "마지막에 두고 온 상태"라면 무인
  자동화의 base가 예측 불가능해진다.
- 레포 기본 브랜치(`origin/HEAD`) 자동감지 — §배경 3으로 이 사례에서 무효.
- **dotfiles 계약에 `target_base` 키를 정의하는 일** — §1대로 별도 후속으로 제기한다.
  이 스펙은 계약 정의를 선점하지 않고, 정의가 생겨도 충돌하지 않는 범위(fallback)만 바꾼다.
- 기존 bead의 `target_base` 메타데이터 소급 정리.
- `[worker.verify]` 등 다른 config 섹션의 구조 변경.

## §4 수용 기준

1. 레포별 config에 `target_base`가 있고 bead 메타데이터가 없으면 config 값이 쓰인다.
2. bead 메타데이터가 있으면 config를 이긴다.
3. 둘 다 없으면 기존대로 `main`.
4. 비절대 키·빈 값 등 무효 섹션은 무시되고 `main`으로 떨어진다(로드 실패 없음).
5. base에서 spec을 찾지 못한 거부가 `spec_missing_at_base:<base>`로 기록되고 배지가 base를
   표시하며, `spec_id` 부재 거부(`spec_missing`)와 구분된다. 기존에 기록된 `spec_missing`
   문자열도 정규화 없이 그대로 렌더된다.
6. `npm run all` green.
7. UI 변경이 있으므로 `npm run build`를 실행하고 `app/main.bundle.js`·`app/main.bundle.js.map`
   갱신분을 함께 커밋한다(`npm run all`은 `lint && tsc && test && prettier:check`이며 build를
   포함하지 않는다 — AGENTS.md Pre-Handoff Validation).

## §5 테스트 범위

- `config.js`: `[worker.target_base]` 정규화(정상·비절대 키·빈 값·섹션 부재).
- `attach.js`: 해석 3순위(bead > config > 기본) 및 `options.target_base` 주입 우선.
- `admission.js`: base에서 spec 미발견 시 base가 실린 사유, `spec_id` 부재와의 구분.
- UI: 배지가 base를 표시.

제외: 실제 dispatch/worktree 생성 e2e(기존 커버리지로 충분, 이 변경은 base 문자열 해석만 바꾼다).
