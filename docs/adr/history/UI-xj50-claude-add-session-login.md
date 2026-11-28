---
id: 'UI-xj50'
title: 'Claude 계정 추가와 세션 전용 로그인'
date: '2026-11-15'
summary: '화면 로그인·계정 추가는 활성 계정을 바꾸지 않는 격리 로그인이고, Claude 계정 추가는 cswap login 뒤 같은 창에서 cswap session login까지 이어 세션 전용 로그인을 만들며 그 성공은 종료 코드와 계정 목록의 sessionLoginOwn으로 확인한다 — 나머지 조항은 UI-xm29 그대로다'
status: superseded
bead: 'UI-xj50'
supersedes: ['UI-xm29']
superseded_by: 'UI-qlxsw'
---

# Claude 계정 추가와 세션 전용 로그인

## Status

Accepted (quick_fix Bead `UI-xj50`)

## Context

사용량 카드에 토큰 만료가 뜨거나 계정을 새로 넣고 뺄 때, 지금까지는 Mac 터미널에서
`codex-auth login`·`cswap add`·`remove`를 직접 돌려야 했다. 2026-11-10 사용자 결정으로 재로그인·계정
추가·삭제를 사용량 카드의 버튼으로 옮겨 휴대폰에서도 끝까지 할 수 있게 한다.

기존 명령을 그대로 부르면 단순하지만 둘 다 활성 로그인을 건드린다. `codex-auth login`은 전역
`auth.json`을 그 계정으로 바꾸고, `cswap add`는 "현재 로그인"을 등록하면서 그 슬롯을
`activeAccountNumber`로 기록한다. 화면 로그인은 Worker와 대화 세션이 돌고 있는 동안 일어나므로, 실행 중
세션의 계정이 로그인 도중에 다른 계정으로 바뀔 수 있다.

실측(2026-11-10, 스펙 §2): `codex-auth import`는 계정 파일만 쓰고 `active_account_key`와 전역
`auth.json`을 건드리지 않는다. 그런데 `codex-auth switch`는 떠나는 계정의 파일에 지금 `auth.json`을
백업하므로, 활성 계정을 `import`만 하고 전역 `auth.json`을 그대로 두면 다음 전환이 옛 자격으로 새 로그인을
덮는다.

짝 결정: claude-swap 쪽 계약(`cswap login`·`cswap remove --yes --json`)은 형제 Bead claude-swap-3uj의
스펙이 정하고, 이 ADR은 beads-ui 쪽 소비자에서 같은 결정을 기록한다.

UI-xm29: Claude 조항에 계정 추가의 두 번째 인증을 더하고, 그 단계가 미완료일 때 추가 결과를 보존하는
조항을 신설한다. Codex 격리·활성 로그인 유지·전환 잠금·공급자 보류 조항은 유지한다.

2026-11-12 사용자는 화면의 계정 추가가 세션 전용 로그인까지 이어지도록 결정했다. 세션 전용 로그인이
없던 새 계정은 Worker가 사용 중일 때 전역 자동 전환 후보에서 빠져, 소진 계정에 머무르는 원인이 되었다.

## Decision

- 화면에서 하는 재로그인·계정 추가는 활성 계정을 바꾸지 않는 격리 로그인이다. 실행 중 세션과 Worker가
  쓰는 활성 로그인과 활성 기록은 로그인 때문에 다른 계정으로 바뀌지 않는다.
- Codex: beads-ui가 서버 상태 폴더 아래 임시 `CODEX_HOME`에서 `codex login --device-auth`를 띄우고, 끝나면
  `id_token`의 신원으로 계정 키를 만들어 확인한 뒤 `codex-auth import`로 넣는다. 로그인한 계정이 그때의 활성
  계정일 때만 전역 `auth.json`을 같은 계정의 새 자격으로 원자 교체한다(같은 폴더 임시 파일 + rename).
  활성 계정이 아니면 전역 `auth.json`을 건드리지 않고 사후 `switch`로 되돌리는 경로도 두지 않는다.
- Claude (변경): 격리 프로필에서의 로그인, 신원 확인, 슬롯 저장은 claude-swap의 `cswap login`이 소유한다.
  beads-ui는 그 명령을 서버 전용 tmux 창에 띄우고 인증 URL을 화면에 보이고 사용자가 붙여 넣은 코드를 창에
  넣고 마지막 JSON 줄을 읽는다. 추가 모드는 `cswap login --new --json`의 added 결과와 번호를 받은 뒤
  같은 tmux 창에서 `cswap session login <번호>`를 이어 실행한다. 성공은 두 번째 명령의 종료 코드 0과
  다시 읽은 같은 계정의 `sessionLoginOwn` true가 함께 확인될 때다.
- 잠금: 사용자를 기다리는 동안에는 전환 잠금을 잡지 않는다. 계정 목록에 쓰는 단계(Codex의 활성 키 확인·
  `import`·전역 `auth.json` 교체·목록 재읽기, Claude의 캐시 비우기·목록 재읽기)만 러너별 전환 잠금
  (`acquireSwitchLock`)을 잡아 수동 전환·자동 복귀와 겹치지 않게 한다.
- 로그인 세션은 공급자 보류를 직접 풀지 않는다. 보류 해제는 기존 프로브가 판정한다.
- 추가된 계정은 두 번째 인증의 실패·취소·시간 초과에도 유지한다. 결과는 세션 로그인 미완료와
  `cswap session login <번호>` 재시도 명령을 함께 보여 준다. (신설)

## Consequences

- 함께 움직이는 소비자: `server/routes/account-login.js`(로그인 세션 모듈), `app/views/usage-meter.js`(카드
  로그인 패널), claude-swap의 `cswap login`과 그 JSON 계약. 되돌리려면 셋을 같이 바꿔야 한다.
- `codex-auth login`·`cswap add`는 화면 경로에서 쓰지 않는다.
- 로그인 세션은 메모리에만 있어 서버 재시작이 진행 중 로그인을 잃는다. 시작 정리는 소유 서버 프로세스가
  죽은 잔재(tmux 세션·`codex login` 프로세스 그룹·임시 `CODEX_HOME`)만 지워, 같은 상태 폴더를 쓰는 다른
  서버의 진행 중 로그인을 건드리지 않는다.
- 로그인 세션 모듈은 Express 없이 부를 수 있게 두어, 보류 중인 credential 자동 재로그인 흐름(UI-s4g1)이
  나중에 재사용할 수 있다.
- 시간 제한·폴링 간격 같은 값은 `server/routes/account-login.js`의 상수가 소유한다.
- Claude 계정 추가는 브라우저 인증을 두 번 받는다. 인증을 한 번 더 받는 대신 새 계정이 세션 전용 로그인을
  갖춰, 실행 중 작업이 그 계정을 쓰고 있어도 전역 자동 전환 후보가 된다. 계정 줄에 경고와 별도 버튼만
  붙이는 대안은 인증을 빠뜨릴 수 있어 채택하지 않는다.
- 함께 움직이는 명령에는 claude-swap의 `cswap session login`과 계정 목록의 `sessionLoginOwn`도 포함된다.
