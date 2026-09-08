---
id: 43
title: 워크스페이스와 후보 투영은 기존 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스를 띄우지 않는다
status: accepted
date: 2026-09-08
summary: "워크스페이스와 후보 투영은 기존 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스를 띄우지 않으며 title-cache 예외는 유지한다"
supersedes: [26]
spec: docs/superpowers/specs/2026-09-08-refresh-work-efficiency-design.md
bead: UI-hhn9
---

# 워크스페이스와 후보 투영은 기존 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스를 띄우지 않는다

## Context

ADR 0026은 워크스페이스 투영 경로의 자식 프로세스를 비동기 warm 단계 하나로 모으고,
동기 enrich API를 그 결과를 읽는 캐시 리더로 만들었다. 그 결정은 그대로 남는다.
갈라지는 것은 마지막 조항 하나다 — "Worker의 `title-cache`·`runnable-cache`는 호출
빈도가 낮아 `probes` 없는 동기 경로에 남는다".

2026-09-08 전체 점검에서 그 예외의 비용이 재현됐다. `runnable-cache`는 후보 목록을
채울 때 행마다 `enrichIssueWorkflow(issue, workspace)`를 컨텍스트 없이 불렀고, 그
분기는 행마다 `gitHead`를 동기로 띄운다. 실제 기본 enrich와 주입 스냅샷으로 open
10행/100행을 채우면 동기 HEAD 조회가 10회/100회, 약 108ms/1,095ms 동안 이벤트 루프가
막혔다. 후보 목록은 모니터 push마다 다시 채워지므로 "호출 빈도가 낮다"는 전제가
성립하지 않았다.

새 캐시나 주기 타이머를 붙이는 길은 기각했다. `runnable-cache`가 받는 공유 스냅샷은
이미 `generation`과 `all`을 갖고 있고, `warmWorkflowProbes(items, workspace_root,
generation)`가 바로 그 입력으로 세대 컨텍스트를 만든다. 필요한 것은 그 준비를 후보
채우기에도 쓰는 것뿐이다.

## Decision

**후보 투영도 워크스페이스 투영과 같은 비동기 준비 컨텍스트만 읽는다. 동기 자식
프로세스 예외는 `title-cache`에만 남는다.**

- `runnable-cache`의 한 번의 채우기는 받은 스냅샷의 `generation`·`all`로
  `warmWorkflowProbes`를 한 번 기다리고, 반환된 컨텍스트를 그 채우기의 지역 값으로
  보관해 모든 행의 `enrichIssueWorkflow(issue, root, undefined, probes)`에 명시
  전달한다. 행마다 HEAD를 다시 읽지 않는다. 다른 세대가 시작돼도 진행 중인 채우기의
  컨텍스트를 바꾸지 않는다.
- 준비 실패(warm이 `null`을 돌려주거나 throw)는 빈 미판정 컨텍스트로 대체한다.
  `probes`를 생략해 동기 `gitHead` 분기로 되돌아가는 fallback은 허용하지 않는다 —
  "후보 채우기 경로에서 동기 자식 프로세스 0회"가 테스트 가능한 불변식이다.
- 워크스페이스 문자열은 `path.resolve`로 한 번 정규화해 스냅샷 요청과 준비 단계에
  같은 값을 전달한다. 같은 workspace·세대의 준비는 기존 공유 in-flight Promise를
  재사용하고, 불변 사실의 키·상한·동시성 상한, 미판정의 세대 한정, 캡처한 HEAD 기준
  경로 변경 조회는 ADR 0026의 규칙을 그대로 승계한다.
- 준비 대상 행은 후보·세션 자격 판정이 이미 고른 행이다. 자격·라벨·차단 의존 판정을
  준비 단계에서 복제하지 않고, 준비 대상 축소가 자격 판정 결과를 바꾸지 않는다.
- 테스트 전용 `runJson` 분기와 옵션은 제거한다. 테스트는 실제 스냅샷 형태의
  `requestSnapshot` 주입으로 통일하고, 가짜 세대를 만드는 런타임 계층을 두지 않는다.
- `title-cache`의 동기 호출, bd 명령 의미, admission·머지 자격의 실행 직전 재확인은
  바꾸지 않는다. 실행 직전 검사는 읽은 뒤 상태가 바뀌는 문제를 막는 별도 책임이다.

## Consequences

ADR 0026의 불변식 "투영 경로에서 동기 자식 프로세스 0회"가 후보 투영까지 넓어진다.
`execFileSync` spy 하나로 10행과 100행 모두에서 판정할 수 있고, 공유 HEAD 준비 횟수는
행 수와 함께 늘지 않는다.

대가는 ADR 0026과 같다. 준비가 채우지 못한 프로브는 그 세대 동안 미판정으로 그려지고
다음 세대에서 다시 묻는다. 후보 채우기가 준비 완료를 기다리므로 첫 응답은 동기
경로보다 늦을 수 있지만, 그 대기는 이벤트 루프를 막지 않는다.

`enrichWorkflow` 주입의 호출 계약이 `(issue, workspace, probes)`로 바뀌었다. 되돌리려면
준비 단계와 미판정 대체를 걷어내고 동기 fallback을 다시 열어야 하므로, 이 결정을
뒤집는 것은 한 줄 편집이 아니다.

`title-cache`는 여전히 `probes` 없는 동기 경로다. 그 예외를 없애는 것은 이 결정의
범위가 아니며, 비용이 재현될 때 별도로 판단한다.
