---
id: UI-y7h1
title: auto 구현 리프 후보는 beads-ui 서버 전역 설정이다
status: accepted
date: 2026-11-11
summary: "auto 구현 리프의 후보 모델과 effort 범위는 beads-ui 서버 전역 설정이 정본이고 저장소별 값 없이 dotfiles가 GET /api/auto-pool로만 읽으며, 빠진 런타임은 dotfiles 출하 기본값을 따른다"
spec: docs/superpowers/specs/2026-11-11-auto-pool-setting-design.md
bead: UI-y7h1
---

# auto 구현 리프 후보는 beads-ui 서버 전역 설정이다

## Context

dotfiles의 jev `bind` 판정은 구현 모델·effort가 `auto`인 단위에서 쓸 모델과 effort를
고른다. 그 후보 목록과 effort 범위는 지금까지 dotfiles 문서 문구에 박혀 있어서, 모델 세대가
바뀔 때마다 문서를 고쳐야 했다. 사용자는 후보(예: Codex `terra-6.1`·`sol-6.1`)와 effort
범위를 설정 화면에서 정하고, 그 설정을 모든 저장소에 공통으로 하나만 두기로 했다(사용자 결정
2026-11-11). 짝 결정은 dotfiles 쪽 설계(dotfiles-ti4xa,
`docs/superpowers/specs/2026-11-11-auto-leaf-pool-setting-criteria-loop-design.md`)가
기록하며, 판정 규칙과 보정 루프는 그쪽이 소유한다(ADR dotfiles/dotfiles-snhls를 그쪽이
대체한다).

가장 가까운 현행 ADR은 UI-gpac(Codex 모델 카탈로그의 원천)이다. 다만 그 결정은 화면이
보여 줄 선택지가 어디서 오는지를 정하고, 이 결정은 사람이 정한 판정 입력을 어디에 저장하고
어떻게 공개하는지를 정한다. 소비자가 다르므로 새 주제다. 전제로 ADR UI-jlov(dotfiles 계약은
런타임에 읽지 않고 고정한 투영본만 읽음)를 따른다.

## Decision

**auto 구현 리프의 후보 모델과 effort 범위는 beads-ui 서버 전역 설정이 정본이다. 저장소별
값은 두지 않는다. dotfiles는 `GET /api/auto-pool`로만 읽고, 빠진 런타임은 dotfiles 출하
기본값을 따른다.**

- **저장.** 서버 전역 상태 파일 하나(`$XDG_STATE_HOME/bdui/auto-pool.json`)에 런타임
  (`claude`·`codex`)별로 후보 모델 0~2개(낮은 자리부터)와 effort `{min, max}`를 둔다.
  `runtimes`에 없는 런타임은 "dotfiles 기본값을 따른다"는 뜻이다. 파일이 없거나 깨졌으면
  revision 0, 빈 `runtimes`로 읽는다.
- **쓰기.** 문서 전체를 바꾸고 `expected_revision`이 같을 때만 성공한다. 거부되면 아무것도
  쓰지 않는다. 허용 이름과 effort 목록의 정본은 고정 투영본의
  `implementation.model_catalog`·`effort_catalog`다. dotfiles가 같은 목록으로 판정하므로
  런타임 카탈로그 목록으로 검증하면 저장한 값을 dotfiles가 무효로 보고 기본값으로 돌린다.
  Codex 이름은 계열 별칭이나 `<계열>-<버전>` 문법만 보고, 계정 목록에 실제로 있는지는 실행
  때의 해석이 정한다.
- **공개.** 두 저장소가 공유하는 것은 `GET /api/auto-pool` 응답 모양
  (`{ok, schema, revision, runtimes}`)과 투영본의 `implementation.auto_pool_defaults` 키
  뿐이다. 응답은 저장값을 그대로 내고 기본값을 채우지 않는다. 저장 파일과 WebSocket 화면
  채널은 beads-ui 내부다.

기각한 대안: 실행 설정처럼 저장소별 kv에 두기. 판정 자료가 저장소마다 쪼개지고 임계와 보정도
저장소별로 나눠야 해서 전역 하나를 골랐다. 대신 저장소마다 다른 후보는 쓸 수 없다.

## Consequences

- 모델 세대가 바뀌면 설정 창 `프리셋·모델` 탭의 `auto 후보` 절만 고치면 된다. 직접 지정한
  모델·effort와 실행 프리셋은 이 설정의 영향을 받지 않는다.
- dotfiles 판정은 beads-ui API에 의존한다. API를 읽지 못하면 dotfiles는 출하 기본값으로
  판정한다.
- 되돌리려면 이 저장소의 `server/auto-pool-store.js`, `server/ws/auto-pool-handlers.js`,
  `server/routes/auto-pool.js`, `app/views/settings-dialog/auto-pool-section.js`와
  dotfiles의 설정 읽기 도구·판정 기록이 함께 움직인다.
