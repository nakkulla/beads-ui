---
id: 44
title: 구독별 store는 revision을 수신하되 내용 변경만 통지하고 registry는 구독 출처를 전달한다
status: accepted
date: 2026-09-08
summary: "구독별 store는 revision을 수신하되 내용 변경만 통지하고 registry는 구독 출처를 전달하며 전체 issue push와 기존 순서·identity 규칙을 유지한다"
supersedes: [2]
spec: docs/superpowers/specs/2026-09-08-refresh-work-efficiency-design.md
bead: UI-hhn9
---

# 구독별 store는 revision을 수신하되 내용 변경만 통지하고 registry는 구독 출처를 전달한다

## Context

ADR 0002는 구독 하나당 store 하나를 두고 서버가 전체 issue 페이로드를 push하도록
정했다. 구독별 store, 전체 issue push, revision 순서와 재연결, 결정적 정렬과 객체
identity — 그 조항들은 그대로 남는다. 갈라지는 것은 리스너 의미 하나다: "리스너는
적용된 메시지마다 호출된다".

2026-09-08 전체 점검에서 그 의미가 만드는 비용이 재현됐다.

- 1,000행 store에 기존 항목보다 오래된 `updated_at`의 upsert, 그리고 store에 없는
  id의 delete를 각각 보내면 메시지마다 정렬 비교 5,876회와 리스너 통지 1회가 일어났다.
  두 메시지 모두 렌더링 내용을 바꾸지 않는다.
- registry는 어떤 구독이 바뀌었는지 전달하지 않고 모든 전역 리스너를 불렀다. 숨긴
  Board가 `tab:worker:ready` snapshot 한 번에 열 여섯 개의 snapshot을 다시 읽었고,
  상세 패널도 무관한 목록 알림마다 자기 구독 snapshot을 조회했다.

서버 push 봉투나 프로토콜을 바꾸는 길, 모든 갱신에 debounce나 긴 캐시를 거는 길,
중앙 이슈 캐시를 다시 두는 길은 기각했다. 불필요한 작업은 그대로 남거나(debounce),
ADR 0002가 없앤 이중 소유가 돌아온다(중앙 캐시).

## Decision

**store는 revision 수신과 내용 변경 통지를 구분하고, registry는 변경을 낸 구독의
출처를 전달한다. 그 외 ADR 0002의 조항은 그대로 승계한다.**

- 구독별 store, 서버의 전체 issue push, 봉투 형태(`snapshot`·`upsert`·`delete`),
  revision 순서와 같거나 낮은 revision 무시, 재연결 시 새 store와 새 snapshot,
  결정적 정렬과 같은 id의 객체 identity 유지는 ADR 0002 그대로다.
- store의 리스너는 렌더링 내용이 바뀔 때 한 번 호출된다. 다음 두 메시지는 더 높은
  정상 revision의 수신으로 기록하되 정렬도 통지도 하지 않는다: 기존 항목의 유효 숫자
  `updated_at`이 더 새로워서 거절되는 upsert, 그리고 store에 없는 id의 delete. 그
  뒤에 도착하는 더 낮은 revision은 여전히 무시된다. 같은 timestamp의 upsert는 기존처럼
  적용하고, 정상 변경과 snapshot 교체는 기존처럼 정렬하고 통지한다.
- timestamp 형식과 revision 우선순위는 바꾸지 않는다. `updated_at`은 숫자 epoch ms이고
  freshness의 정본은 revision이다. ISO 문자열 호환 확대, 깊은 동등성 비교, 동일 내용
  snapshot 추정 생략은 하지 않는다.
- registry의 전역 리스너는 변경을 낸 subscription id를 인자로 받는다. 개별 store의
  리스너는 인자 없는 내용 변경 알림으로 유지하고, registry가 store를 연결할 때 아는 id를
  붙인다. register/unregister는 새 초기 알림을 만들지 않는다 — 초기 표시는 기존
  load·구독 snapshot 경로가 소유한다.
- `createListSelectors`는 자신이 그리는 id 집합의 알림만 소비자에게 전달하고, UI 정렬
  저장소의 알림은 출처와 무관하게 그대로 전달한다. 상세 패널은 현재 `detail:<id>`
  구독의 알림만 읽고, 선택이 없거나 다른 구독이면 snapshot을 조회하지 않는다.
- registry의 `snapshotFor`는 소비자 소유 배열을 돌려주는 경계로 남고, selector는 그
  배열을 다시 복사하지 않는다. 공유 배열을 노출하거나 별도의 selector 캐시를 두지
  않는다.

## Consequences

내용이 바뀌지 않은 메시지는 정렬도 렌더도 일으키지 않는다 — 1,000행에서 comparator
0회·통지 0회가 테스트 가능한 불변식이다. 무관한 구독의 push는 Board·Worker·상세의
snapshot 읽기와 렌더를 0회로 만들고, 자기 구독과 UI 정렬 변경에는 그대로 반응한다.

대가는 리스너 의미의 변화다. "수신한 revision이 진전해도 리스너가 호출되지 않는다"는
맥락 없이 보면 의외이므로, `types/subscription-issue-store.ts`의 설명과
`docs/data-exchange-subscription-plan.md`가 같은 문장으로 그 의미를 실어야 한다.
revision 진전을 관측해야 하는 소비자는 통지가 아니라 store를 직접 읽어야 한다.

registry 리스너 시그니처와 selector의 id 집합이 호출 계약이 됐다. 되돌리려면
store·타입·모든 구독 소비자와 테스트 stub을 함께 바꿔야 하므로, 이 결정을 뒤집는
것은 한 줄 편집이 아니다.

숨긴 화면의 렌더 생략은 이 결정이 아니다. 그것은 라우트가 이미 설정하는 mount의
`hidden`과 기존 load·pause lifecycle을 쓰는 뷰 내부 변경이며, 스펙이 ADR 아님으로
판정했다.
