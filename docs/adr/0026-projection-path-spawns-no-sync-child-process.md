---
id: 26
title: 워크스페이스 투영 경로는 동기 자식 프로세스를 띄우지 않는다
status: accepted
date: 2026-09-03
summary: '워크스페이스 투영은 warm이 채운 불변 키 캐시와 세대 컨텍스트만 읽어 동기 자식 프로세스를 띄우지 않고, 미스는 미판정으로 그린다'
spec: docs/superpowers/specs/2026-09-02-issue-detail-snapshot-projection-design.md
bead: UI-wbjx
---

# 워크스페이스 투영 경로는 동기 자식 프로세스를 띄우지 않는다

## Context

`workflow-enrich.js`의 신선도 판정(`spec_stale`·`impl_stale`·plan `approval_state`)은
`execFileSync`로 git을 부른다. HEAD 조회, cursor 존재·조상 확인, 경로 변경, 브랜치
tip, 워크트리 dirty — 상세 하나를 여는 데만 200~300ms가 이벤트 루프를 막았고, 30초
폴링 한 패스에서는 모듈 주석이 실측해 둔 약 930ms가 같은 방식으로 막혔다. 블로킹
동안에는 다른 WS 연결도 함께 멈춘다.

단순히 API를 비동기로 바꾸는 길은 막혀 있었다. `enrichIssueWorkflow`는 동기 API이고
Worker의 `title-cache`·`runnable-cache`가 동기로 부른다. 캐시를 넓히는 길도 그대로는
틀린다 — 기존 `stale_cache`는 `git log` 결과만 `<head>\0<sha>\0<path>`로 캐시하고,
anchor·브랜치 tip·dirty에는 캐시가 없었다. 이들 중 일부는 HEAD가 그대로여도 값이
변할 수 있어서(다른 워크트리의 커밋, fetch로 생긴 객체, 커밋 없는 편집) 같은 키로
캐시하면 틀린 답을 오래 붙들게 된다.

## Decision

투영 경로는 자식 프로세스를 **비동기 warm 단계 하나**에서만 띄우고, 동기 enrich API는
그 결과를 읽는 캐시 리더가 된다.

사실을 두 종류로 가른다.

- **가변 사실**은 캐시하지 않고 세대 컨텍스트로 명시 전달한다: HEAD, 로컬 브랜치 tip
  전체, plan 경로 dirty 여부.
- **불변 사실**만 모듈 캐시에 넣고, 확정 결과만 넣는다: 경로 변경
  `<head>\0<sha>\0<path>`, 조상 관계 `<root>\0<a>\0<b>`(exit 0/1만), 커밋 객체 존재
  `<root>\0<sha>`(존재 확인만). 상한·비움은 기존 `STALE_CACHE_CAP` 정책을 공유한다.
- **미판정과 부재는 불변이 아니다.** git 오류의 `null`과 "커밋 없음"은 전역 캐시에
  넣지 않고 세대 컨텍스트의 `undetermined`에만 기록해, 같은 세대 안의 재질의만 막고
  다음 세대에서 다시 묻는다.

`warmWorkflowProbes(items, workspace_root, generation)`가 그 warm이다. 세대 컨텍스트는
`(workspace_root, generation)`당 공유 in-flight Promise 하나이며, 재료는 이번 items가
아니라 `generation.all` 전체다 — 첫 투영의 선택 항목만으로 만들면 같은 세대의 다른
구독이 가진 `plan_path`가 검사에서 빠져 "깨끗함"으로 오판된다. 개별 프로브는 키별
in-flight 공유와 동시성 상한 8로 실행한다.

동기 API(`enrichIssuesWorkflow`·`enrichIssueWorkflow`와 그 프로브 함수들)는 `probes`
인자를 받는다. `probes`가 있으면 캐시와 컨텍스트만 읽고 **절대 spawn하지 않는다**;
미스는 `null`/`unknown`, 즉 미판정으로 fail-quiet하게 그린다. `probes`가 없으면
기존 동기 경로 그대로다 — Worker의 `title-cache`·`runnable-cache`가 그 경로를 쓴다.

경로 변경 프로브는 `git log <sha>..<captured_head> -- <path>`로 캡처한 head를
명시한다. 기존 `..HEAD` 리터럴은 비동기 실행 중 HEAD가 움직이면 결과와 캐시 키가
어긋난다.

## Consequences

"투영 경로에서 동기 자식 프로세스 0회"가 테스트 가능한 불변식이 된다 —
`execFileSync` spy 하나로 판정할 수 있고, 이벤트 루프 블로킹 0ms를 계측 대신 구조로
답한다.

대가는 미스의 표시다. warm이 채우지 못한 프로브는 그 세대 동안 미판정으로 그려진다.
신선도 배지는 원래 fail-quiet(프로브 실패로 카드를 stale로 만들지 않는다)이므로
표시 정책은 그대로이며, 미판정은 다음 세대에서 다시 묻는다. 대안이었던 "미스에서
동기로 한 번 더 띄우기"는 블로킹 0회라는 불변식 자체를 없애기 때문에 채택하지
않았다.

프로브 함수의 `probes` 분기와 세대 컨텍스트가 이제 호출 계약이다. 되돌리려면 warm
단계와 그 인자를 모든 프로브 함수에서 걷어내야 한다.

이 결정은 투영 경로에만 적용된다. Worker의 `title-cache`·`runnable-cache`는 호출
빈도가 낮아 `probes` 없는 동기 경로에 남는다.
