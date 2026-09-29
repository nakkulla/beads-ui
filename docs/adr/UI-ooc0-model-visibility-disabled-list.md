---
id: UI-ooc0
title: 모델 활성은 서버 전역 꺼 둔 모델 목록으로 선택지만 거른다
status: accepted
date: 2026-09-29
summary: "모델 활성은 서버 전역 꺼 둔 모델 목록이 선택지 표시에서만 빼는 것이며 카탈로그·저장 값·디스패치 검증·단가는 그대로 둔다; 저장된 값이 꺼 둔 모델이면 (비활성)으로 남기고 러너마다 하나 이상 켜 둔다"
spec: docs/superpowers/specs/2026-09-29-enabled-models-selector-filter-design.md
bead: UI-ooc0
---

# 모델 활성은 서버 전역 꺼 둔 모델 목록으로 선택지만 거른다

## Context

모델 선택 목록에 더 이상 쓰지 않는 `opus-4.8`·`opus-4.6`과 GPT-5.6 세대(`sol-5.6`·
`terra`·5.6 luna)가 계속 보였다(사용자 요청 2026-09-29). 겉보기에 자연스러운 "정리"는
카탈로그에서 그 모델을 지우는 것이지만, 스펙 §1이 확인한 대로 카탈로그 삭제는 세 곳을
깨뜨린다.

- 과거 기록의 비용 단가를 잃는다. `usage-pricing.js modelPrice`는 기록된 모델 문자열을
  카탈로그 이름과 `id` 순서로 대조한다.
- 저장된 설정 검증이 실패한다(`exec-enums.js`, `policy.js`, `queue-store.js` 로드 시
  무효 모델 제거, `exec-preset-store.js`).
- 사용자 `config.toml`의 `[runner.claude.models."opus-4.8".price]` 절이 `id=opus-4.8`인
  잘못된 모델을 새로 만든다. `runner-catalog.js mergeModels`는 BUILTIN에 없는 이름을 이름
  그대로 `id`로 삼는다.

즉 "쓰지 않는 모델"과 "카탈로그가 알아야 하는 모델"은 다른 집합이고, 그 이유는 코드만
읽어서는 보이지 않는다. 인접 ADR UI-u6ud-10은 서버 전역 값의 편집 위치(모니터 일괄 창의
서버 전역 탭 하나)를 정하지만, 소비자(모델 활성 저장소·선택지 빌더·공급자 재개
대화상자)가 달라 새 주제다.

## Decision

**모델 활성은 카탈로그에서 지우는 것이 아니라 서버 전역 "꺼 둔 모델" 목록으로 선택지
표시에서만 뺀다. 카탈로그·저장 값·디스패치 검증·단가는 그대로 둔다.**

- **저장.** `$XDG_STATE_HOME/bdui/model-visibility.json`
  (`state-paths.js modelVisibilityFilePath()`)에 `{ revision, disabled_models }`를 둔다.
  워크스페이스와 무관한 서버 전역이며, 러너를 넘어 이름이 유일하므로 러너별로 나누지
  않는다. 저장은 "꺼 둔 모델" 목록이라 새로 추가되는 모델은 자동으로 보인다. 읽기는
  fail-quiet(파일 부재·손상은 기본값, 카탈로그에 없는 이름은 무시)이고 쓰기는 revision
  CAS와 `unknown_model`·`runner_all_disabled` 검증으로 엄격하다(ADR UI-u6ud-11).
- **적용 자리.** 필터(`app/utils/model-visibility.js visibleModelChoices`·
  `visibleReviewerChoices`)는 화면이 선택지를 만드는 자리에서만 건다 — 설정 창·모니터 일괄
  창의 모델 묶음과 리뷰 행, 이슈 상세 실행 설정, 공급자 재개 대화상자. 호환 판정
  (`narrowImplTarget`)과 해석기(`resolveExecutionSettings`·`deriveModelRuntime`)는 꺼 둔
  모델을 계속 알아본다. 서버 검증·디스패치·카탈로그·단가는 바꾸지 않는다.
- **저장된 값의 보존.** 저장된 값이 꺼 둔 모델이면 지우지 않고 선택된 채 `(비활성)`
  레이블로 남긴다. `(비호환)`과 겹치면 호환성이 더 강한 신호라 `(비호환)`을 둔다.
- **러너마다 하나 이상.** 어떤 러너의 모델을 전부 끄는 쓰기는 거부한다.
- **채널.** 서버 전역 구독 `subscribe-model-visibility`/`model-visibility-snapshot`/
  `model-visibility-set` 하나로 그린다. 모니터 스냅샷의 `runner_catalog`에 플래그를 싣지
  않는다 — 체크 하나에 1MB급 전체 스냅샷을 다시 밀지 않기 위해서다.
- **편집 위치.** 모니터 일괄 창의 서버 전역 탭(`칩`→`전역`)에 판정 칩 프리셋과 함께 둔다.
  ADR UI-u6ud-10의 "그 탭만" 조항을 따르며 두 번째 전역 탭을 만들지 않는다.

기각한 대안(스펙 §2): 카탈로그 삭제(위 세 파손), `config.toml` 모델별 `enabled` 플래그
(서버가 사용자 소유 설정 파일을 써야 함), `runner_catalog` 투영에 `disabled` 표시
(스냅샷 전체 재푸시).

## Consequences

- 워크플로·CLI·기존 프리셋이 꺼 둔 모델을 써도 지금처럼 동작한다. 워크플로의 `자동` 모델
  선택은 dotfiles `model_tiers`가 정하며 이 설정의 영향을 받지 않는다.
- 스냅샷을 받기 전이나 구독에 실패했을 때는 모든 모델이 보인다. 숨김이 풀리는 쪽으로
  실패하므로 잘못된 값이 저장되지 않는다.
- 되돌리려면 상태 파일·WS 채널·클라이언트 저장소·네 화면의 선택지 빌더·일괄 창 전역
  탭이 함께 움직인다.
- 별칭 재배치(`luna`→gpt-6-luna)는 이 결정과 별개로 직전 세대를 `luna-5.6`으로 남기는
  `sol-5.6`·`opus-4.8` 선례를 따른다(스펙 §6).
