---
scope:
  - server/worker/pr-actions.js
  - server/worker/bd-metadata.js
  - app/views/worker/
---

# PR 머지 sweep의 full_plan Phase 자식 이월 변환과 완료 레인 이월 칩

Bead: `UI-btj6` · 2026-09-01

설계 정본: dotfiles
`docs/superpowers/specs/2026-09-01-fullplan-phase-carryover-contract-design.md`
§1·§5 (커밋 `a12ad7b42701345d458d5fd2da9b712278a6f7e5`, Bead `dotfiles-hlns`
close 2026-09-01, `spec_review=codex@a12ad7b…`). 이 문서는 그 계약(모델 B)의
beads-ui **소비 구현** 스펙이다 — 이월 모델·멱등 식별자·실패 분류의 결정은
정본이 소유하고, 여기는 beads-ui 배선만 정한다.

## §0 현행과 결함

- `server/worker/pr-actions.js` `sweepChildren`(:1292)은 `deps.bd.listChildren`이
  준 `{id, status}`만 보고 non-closed 자식을 leaves-first 전부 close한다.
  `child_disposition`·`started_at`·`exec_receipt`를 읽지 않는다.
- `closeCoveredRow`(:1530)는 sweep 성공 시 무조건 `parent_close`로 진행한다.
- 결과: 재발 3건(Analysis-90u·fd0·zv1v — Bead 본문 소유). 모양 A(미실행 active
  자식 일괄 close)와 모양 B(deferred 자식 삼킴) 모두 이 지점이다.

## §1 자식 분류 — sweep 내부에서 자식별 판정

non-closed 자식에 한해 자식별 상세(`bd show`급: status·metadata·`started_at`)를
읽어 3분류한다. 자식 수는 유한하므로 per-child 조회를 허용한다
(`listChildren` 반환 확장 또는 non-closed 자식에 `readIssue` 추가 —
`bd-metadata.js`의 fail-closed 규칙 유지: 읽기 실패는 빈 결과가 아니라 STOP).

| 자식 | 판정 | 행동 |
| --- | --- | --- |
| metadata `child_disposition=deferred` + non-closed | 이월 대상 | §2 이월 변환 후 `이월 → <후속 ID>` reason으로 close |
| phase 자식(metadata `parent=<P>` 또는 `parent-child` dep)이며 deferred 아님 + `started_at` 없음 + metadata `exec_receipt` 없음 | 미실행 active (모양 A) | `failCleanup('child_sweep', 'unexecuted_phase_child:<id>')` — 부모·자식을 닫지 않고 종단 |
| 그 외 (실행 흔적 있음 · phase 자식 아님) | 현행 유지 | leaves-first close |

- 미실행 active가 여럿이면 id 사전순 첫 항목으로 reason을 만든다(결정적).
- 종단의 durable 표면은 기존 `cleanup_failed` 기록이다: bead는 `resolved`로
  `pr_wait`에 남고, 행은 정리 재시도 버튼을 달며, 자동 재시도는 없다.
  Discord 알림은 `UI-jw27`이 이 기록 지점에 단다.

## §2 이월 변환 — 결정적·멱등

정본 §1-2(수행 주체 sweep)·§1-3(멱등성)의 beads-ui 구현. 자식 하나당 순서:

1. **조회**: `bd list --all --metadata-field carried_from=<원본 자식 ID>`.
   정확히 1건이면 그 Bead를 후속으로 **채택**(생성 생략), 0건이면 생성,
   2건 이상이면 `failCleanup('child_sweep', 'carryover_ambiguous:<id>')`.
2. **생성** (`bd create`): 제목 = 자식 제목. 본문 = 자식 본문 +
   `## 이월 출처` 블록(부모 ID · 원본 자식 ID · `plan_task_anchor` ·
   수행 주체 `sweep` · 머지 PR URL) — 수행 주체는 계약 키를 새로 만들지 않고
   본문에 기록한다. type = 자식 type(부재 시 `task`), priority = 부모 priority.
   metadata: `carried_from=<원본 자식 ID>` ·
   `plan_path`(부모 metadata에 있으면 승계) ·
   `plan_task_anchor`(자식 metadata에 있으면 승계) · `route=spec_backed`
   (succession spec이 스펙 게이트를 타는 잠정 route; 기계는 `rec_*` 판단 키를
   쓰지 않는다).
3. **edge**: `bd dep add <후속> <부모> --type blocks`(부모 close 시 자동
   `bd ready` 복귀) · `bd dep add <후속> <부모> --type discovered-from`
   (같은 rig lineage — 원본 자식은 `carried_from`이 이미 가리키므로 부모에 건다).
4. **readback 후 close**: `bd show <후속> --json`으로 `carried_from`과 두 edge를
   확인한 뒤에만 원본 자식을 `bd close <자식> --reason "이월 → <후속 ID>"`.

중간 단계 실패는 `failCleanup('child_sweep', 'carryover_failed:<id>')`로
종단하며, 재시도는 1의 조회가 기존 후속을 채택해 회복한다 — 생성과 close
사이의 중단이 중복 후속을 만들지 않는다(정본 §1-3).

`bd-metadata.js`에 mutator 래퍼 추가: `createIssue`(제목·본문·type·priority·
`--metadata` JSON), `addDep`(type 지정), `closeWithReason`. 기존 mutator와 같은
fail-closed 규칙(비정상 exit는 throw)이다.

## §3 완료 레인 이월 칩

- **파생**: 완료 카드의 bead `P`에 대해, 클라이언트 이슈 집합에서
  **metadata `carried_from`이 있고 `P`에 `blocks` 의존을 가진 bead `S`** 각각이
  재료다. 새 metadata 키 없이 정본 §1의 흔적만으로 파생하므로 과거 사례도
  (복구로 같은 꼴의 metadata가 생기면) 소급 표시된다.
- **렌더**: 후속당 열리는 칩 1개 `이월 → <ID>`, 클릭 = 그 이슈 상세(카드 위
  칩은 상태를 쓰지 않는다 — 2026-08-28 칩 문법 스펙). 재료가 없으면 —
  후속이 구독 집합 밖이거나 이미 닫혔으면 — 줄 자체를 그리지 않는다(fail-quiet).
- **슬롯**: 구현이 `2026-08-25-card-header-grammar-unify-design.md` §5.1에
  정정 문단을 추가해 **4b 정보**에 배정한다 — 문답은 4a `→ <ID>`와 같은
  후속 관계지만, 완료 카드에서는 "지금 갈 수 있나"라는 행동에 답하지 않는
  관계 정보이기 때문이다(행동을 바꾸는 쪽이 이긴다는 §5.1 판정 규칙).

## §4 수용 기준

1. deferred 자식이 있는 부모의 sweep이 후속 생성(승계 metadata)·`blocks`·
   `discovered-from` edge·자식 `이월 →` close를 거쳐 부모 close까지 진행한다.
2. 후속 생성 후 중단된 sweep의 재시도가 기존 후속을 채택하고 중복 생성이
   없다; `carried_from` 매치 2건 이상은 종단한다.
3. 미실행 active 자식 발견 시 부모·자식이 닫히지 않고
   `cleanup_failed('child_sweep', 'unexecuted_phase_child:*')`가 기록된다.
4. 실행 흔적 있는 자식·비 phase 자식의 sweep 동작은 현행과 동일하다.
5. 완료 카드가 `carried_from`+`blocks` 파생으로 이월 칩을 그리고, 클릭이 후속
   이슈 상세를 열며, 재료가 없으면 줄이 없다.
6. 2026-08-25 카드 문법 스펙 §5.1에 이월 칩 슬롯 정정이 추가된다.
7. Pre-Handoff Validation(tsc/test/lint/prettier/build) 통과.

## 구현 unit 후보

- unit A: sweep 분류·이월 변환·bd mutator 래퍼 — scope anchor
  `server/worker/pr-actions.js`·`server/worker/bd-metadata.js`
- unit B: 이월 칩 파생·렌더 + 슬롯 표 정정 — scope anchor `app/views/worker/`

## 경계·후속

- 관찰: 구현 순서 결속 — `UI-i60a`가 이 Bead에, `UI-jw27`이 `UI-i60a`에
  `blocks`로 결속된다(같은 `pr-actions.js` 정리 cursor를 순차 수정; 핸드오프에서
  router가 edge를 기록).
- 관찰: 후속 자동 재디스패치의 완성은 기존 독립 Bead `UI-978d`·`UI-cacf` 몫 —
  이 스펙은 `bd ready` 복귀까지만 소유한다(정본 §1-4).

## 결정 (ADR 후보)

- 없음 — 이월 모델(모델 B)·멱등 식별자·실패 분류는 dotfiles 정본의 ADR
  후보가 소유하며, 이 스펙은 소비 구현의 배선(분류 지점·칩 파생·슬롯)만 정한다.
