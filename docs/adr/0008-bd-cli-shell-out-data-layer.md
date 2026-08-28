---
id: 8
title: 데이터 계층은 bd CLI shell-out으로 고정
status: accepted
date: 2026-08-12
summary: '데이터 계층은 bd CLI shell-out(스냅샷 기본 2회 read, legacy fallback 3회)이며 DB 드라이버 직결·daemon·batch RPC는 채택하지 않는다'
spec: docs/superpowers/specs/2026-08-12-workspace-snapshot-polling-design.md
---

# 데이터 계층은 bd CLI shell-out으로 고정

## Context

beads의 저장소는 실제 SQL 데이터베이스(SQLite 또는 Dolt)다. 서버가 드라이버로
직접 붙으면 프로세스당 read가 한 번에 끝나고 지연도 줄어든다. 그럼에도 스키마·
준비 상태 판정·`ready` 계산·의존성 전개는 전부 `bd`가 소유하는 로직이며, 그
로직은 DB 스키마가 아니라 CLI 출력 계약으로 노출된다.

드라이버로 붙는다는 것은 그 로직을 beads-ui 안에 복제한다는 뜻이고, 복제본은
`bd` 버전이 올라갈 때마다 조용히 어긋난다. 워크스페이스 스냅샷 폴링을 설계하면서
이 경계를 명시적으로 고정했다.

## Decision

데이터 계층은 `bd` CLI를 자식 프로세스로 실행(shell-out)해 `--json` 출력을 읽는
것이다. 한 세대의 워크스페이스 스냅샷은 기본 **2회 read**로 만든다:
`bd list --json --all`과 `bd ready --explain --json`. 의존성이 목록 payload에
포함되지 않는 legacy 모드에서만 `bd dep list --json`을 더해 **3회**가 된다.

세대는 원자적이다 — 어느 단계에서든 프로토콜·검증 실패가 나면 그 세대를 실패로
기록하고 백오프 후 다시 만든다. 부분 결과를 섞지 않는다.

## Considered Options

- **MySQL/Dolt 드라이버 직결.** `bd`의 준비 상태·의존성 로직을 복제해야 하고,
  스키마 변경이 곧 런타임 파손이 된다. 채택하지 않았다.
- **상주 daemon.** shell-out 비용은 없어지지만 별도 프로세스의 생애주기·버전
  정합·장애 모드를 새로 소유해야 한다. 얻는 지연 개선이 그 비용에 미치지 못했다.
- **batch RPC.** 여러 질의를 한 번에 보내는 프로토콜을 `bd`와 합의해야 하는데,
  beads-ui는 그 계약의 소비자이지 정의자가 아니다.

## Consequences

- 쉬워지는 것: `bd`가 소유한 판정은 언제나 `bd` 버전의 것이다. 백엔드가
  SQLite에서 Dolt로 바뀌어도 이 계층은 그대로다. 테스트는 CLI 응답을 주입해
  결정적으로 돈다.
- 어려워지는 것: 스냅샷 한 세대마다 프로세스 spawn 비용이 든다. 그래서 read
  횟수를 2회로 눌러 두었고, 늘리려면 명시적 근거가 필요하다.
- 배제되는 것: DB 드라이버 의존성(런타임 의존성은 debug·dompurify·express·
  lit-html·marked·smol-toml·ws뿐), 상주 daemon, 그리고 batch RPC 프로토콜.
