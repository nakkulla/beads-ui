---
id: UI-obl0
title: 유닛 실행자가 엇갈린 attempt는 미기록이 아니라 혼합이다
status: accepted
date: 2026-09-21
summary: "유닛 실행자가 엇갈린 attempt는 미기록이 아니라 갈린 축만 말하는 혼합으로 표시하고 미기록은 영수증 부재·손상에만 남긴다"
spec: docs/superpowers/specs/2026-09-21-mixed-unit-impl-actor-design.md
bead: UI-obl0
---

# 유닛 실행자가 엇갈린 attempt는 미기록이 아니라 혼합이다

## Context

`server/worker/compare-projection.js`의 `implActorOf`는 attempt가 보존한 workflow
영수증에서 실제 구현 주체(`impl_actor`)를 읽는다. 비교 탭의 묶기 축·구성 줄과
모니터·워커 완료 타일의 워커 칩이 그 한 값을 함께 읽는다.

다중 unit 영수증(`checks.units`)에서는 유닛 실행자가 하나라도 다르면
`kind='missing'`을 돌려주었다. 정본 스펙 두 곳
(`2026-09-08-monitor-history-material-design.md` §5.1,
`2026-09-15-compare-tab-redesign-design.md` 묶기 키 목록)이 "서로 다른 구현
주체·손상·미기록은 `missing`"이라고 명시한 결정이었다. 그 결과 서로 다른 실행자로
돈 attempt와 영수증이 아예 없거나 깨진 attempt가 같은 `미기록` 한 칸에 들어가
구분되지 않았다. 2026-09-21 전수 스캔에서 유닛 2개 이상인 attempt 48건 가운데
3건이 그 칸에 들어갔고, 셋의 성격은 서로 달랐다 — 모델은 하나이고 effort만 갈린
것, 모델부터 갈린 것, 영수증 형식이 깨진 것.

## Decision

- 유닛 실행자가 엇갈린 영수증은 `missing`이 아니라 `kind='mixed'`다. `missing`은
  영수증 부재·손상·유닛 파싱 실패, 즉 **읽을 수 없는 기록**에만 남는다.
- `mixed`의 라벨은 갈린 축만 말한다. 모든 유닛이 `delegated`이고 모델이 하나로
  같으면 `<actor>/혼합`(`model`은 그 actor), 그 밖에는 중복을 제거한 유닛 실행자
  라벨 수로 `혼합 n종`이다.
- `mixed`는 유닛 순서를 보존한 `parts: [{ unit, label }]`를 함께 싣는다. 툴팁과
  묶기 키는 모두 이 한 재료에서 나오고, 라벨을 되파싱하는 소비자는 두지 않는다.
- 비교 탭 `impl_actor` 묶기 축에서 `mixed`는 같은 구성끼리 한 그룹이다. 키는
  `mixed:<정렬·중복 제거한 유닛 라벨을 +로 이은 것>`, 이름은 라벨이다. 이름이 같은
  `혼합 n종` 카드가 둘 이상 설 수 있다.
- 완료 타일의 워커 칩은 `mixed`에서 라벨로 서고 툴팁이 유닛별 실행자를 적는다.
  자리는 슬롯 5의 기존 exec 칩 그대로다(ADR 0014).
- `presetMatch`의 프리셋 역추론은 바꾸지 않는다. 한 프리셋이 여러 실행자를 낳았다면
  그 프리셋의 구현 값과 실행자 하나를 대조하는 일이 성립하지 않으므로 `mixed`는
  `missing`과 같이 구현 축을 점수에 쓰지 않는다.
- `impl_actor`는 계속 비영속 전송 필드다. Bead metadata·저장된 attempt·workflow
  상태 어휘를 늘리지 않는다(ADR 0012).

## Consequences

- 표본이 한 칸으로 뭉쳐 축이 단순하던 대신 실제 구성이 드러나 그룹이 늘어난다.
  구분은 세션 행 구성 줄과 워커 칩의 툴팁(`<unit>: <label>`)이 맡는다.
- 정본 스펙 두 곳의 "서로 다른 구현 주체는 `missing`" 조항은 정정(UI-obl0)
  문단으로 대체되었다. 문서만 읽은 소비자가 반대로 알 수 있었던 지점이 이 기록의
  이유다.
- 옛 서버·모르는 `kind`는 fail-quiet이다. 칩 포맷터는 아는 `kind`가 아니면
  `null`이고, 비교 뷰의 구성 줄은 서버가 준 문자열만 그린다.
- `checks.units`를 만드는 `server/worker/receipt-check.js`의 판정·위반 코드는 이
  결정의 범위 밖이다. 이 결정은 이미 기록된 영수증을 읽는 쪽만 다룬다.
