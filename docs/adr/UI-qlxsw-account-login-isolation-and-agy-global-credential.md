---
id: 'UI-qlxsw'
title: '화면 계정 로그인의 격리와 agy 전역 자격'
date: '2026-11-28'
summary: '화면 로그인·계정 추가는 Claude·Codex에서 활성 계정을 바꾸지 않는 격리 로그인이고, Claude 계정 추가는 cswap login 뒤 같은 창에서 cswap session login까지 이어 세션 전용 로그인을 만들며 그 성공은 종료 코드와 계정 목록의 sessionLoginOwn으로 확인한다 — agy만 자격이 머신에 한 자리라 화면 로그인이 활성 계정을 바꾸고 그 성공은 로그인 창 머리말의 계정 줄로 확인하며, 자격을 바꾸는 동작은 agy 실행이 없을 때 하나씩만 돈다; 나머지 조항은 UI-xm29 그대로다'
status: 'accepted'
spec: 'docs/superpowers/specs/2026-11-26-agy-runtime-design.md'
bead: 'UI-qlxsw'
supersedes: ['UI-xj50']
---

# 화면 계정 로그인의 격리와 agy 전역 자격

## Status

Accepted (spec `docs/superpowers/specs/2026-11-26-agy-runtime-design.md`)

## Context

ADR UI-xj50은 사용량 카드의 재로그인·계정 추가를 활성 계정을 바꾸지 않는 격리 로그인으로 정했다. Claude는 `cswap login`이 격리 프로필에서, Codex는 서버 상태 폴더 아래 임시 `CODEX_HOME`에서 로그인하므로 실행 중 세션과 Worker의 활성 로그인이 로그인 도중에 바뀌지 않는다.

2026-11-26 사용자는 `agy`(Antigravity CLI)를 세 번째 실행 런타임으로 두고 로그인·재인증·계정 추가·전환도 같은 화면에서 하기로 했다(스펙 `docs/superpowers/specs/2026-11-26-agy-runtime-design.md` §3.5). agy의 자격은 홈 폴더의 파일 두 개(`~/.gemini/antigravity-cli/antigravity-oauth-token`, `~/Library/Application Support/antigravity/credential-user-scope`) 한 자리에 있고 실행별·프로필별 자격을 둘 수단이 없다. 임시 홈 폴더에서 로그인해 자격만 옮기는 안은 자격 파일 교체가 계정 전환으로 동작하는지 확인되지 않아 버렸다. 짝 결정은 dotfiles 스펙 `docs/superpowers/specs/2026-11-26-agy-full-runtime-design.md` §3.9가 정한 `agy-auth`의 자리 보관과 배타 잠금이다.

이 ADR은 UI-xj50을 대체한다: Claude·Codex의 격리 로그인, Claude 계정 추가의 세션 전용 로그인, 잠금, 공급자 보류 조항은 그대로 다시 적고, agy 조항을 신설한다.

## Decision

- 화면에서 하는 Claude·Codex 재로그인·계정 추가는 활성 계정을 바꾸지 않는 격리 로그인이다. 실행 중 세션과 Worker가 쓰는 활성 로그인과 활성 기록은 로그인 때문에 다른 계정으로 바뀌지 않는다.
- Codex: beads-ui가 서버 상태 폴더 아래 임시 `CODEX_HOME`에서 `codex login --device-auth`를 띄우고, 끝나면 `id_token`의 신원으로 계정 키를 만들어 확인한 뒤 `codex-auth import`로 넣는다. 로그인한 계정이 그때의 활성 계정일 때만 전역 `auth.json`을 같은 계정의 새 자격으로 원자 교체한다(같은 폴더 임시 파일 + rename). 활성 계정이 아니면 전역 `auth.json`을 건드리지 않고 사후 `switch`로 되돌리는 경로도 두지 않는다.
- Claude: 격리 프로필에서의 로그인, 신원 확인, 슬롯 저장은 claude-swap의 `cswap login`이 소유한다. beads-ui는 그 명령을 서버 전용 tmux 창에 띄우고 인증 URL을 화면에 보이고 사용자가 붙여 넣은 코드를 창에 넣고 마지막 JSON 줄을 읽는다. 추가 모드는 `cswap login --new --json`의 added 결과와 번호를 받은 뒤 같은 tmux 창에서 `cswap session login <번호>`를 이어 실행한다. 성공은 두 번째 명령의 종료 코드 0과 다시 읽은 같은 계정의 `sessionLoginOwn` true가 함께 확인될 때다.
- agy (신설): 자격이 머신에 한 자리라 화면의 로그인·재인증·계정 추가는 머신 전역 활성 계정을 바꾼다. 로그인은 서버 전용 tmux 창에서 `agy-auth exec-locked`로 agy를 띄워 인증 URL을 보이고 붙여 넣은 코드를 기존 코드 중계 경로로 그 창에 넣는다. 성공은 코드를 넣은 그 창이 로그인 화면을 벗어나 머리말에 계정 줄(이메일과 요금제)을 보이는 것이고, 그 이메일이 이번 로그인의 계정이다. 그 줄이 시간 안에 나오지 않으면 실패이고 아무것도 저장하지 않는다. 계정 추가는 성공 뒤 창의 agy를 끝내고 `agy-auth save <이름> --account <이메일>`로 자리를 만든다. 전환·삭제는 `agy-auth switch`·`remove`이고, `agy-auth list --json`의 `capabilities`가 거짓인 동작은 화면에서 숨기며 `switch`가 거짓이면 자동 전환도 하지 않는다.
- agy 조정 (신설): agy 계정은 머신 전역 하나이고 저장소·Bead·실행별 계정 고정은 두지 않는다. 자격을 바꾸는 동작(로그인, 재인증, 계정 추가, 전환, 삭제)은 서버 안에서 하나씩만 돌고, 도는 동안 스케줄러는 agy 실행을 새로 띄우지 않는다. 돌고 있는 agy 실행이나 agy 대화 창이 있으면 그 동작은 시작하지 않고 `busy`다. 한도 도달의 자동 전환은 돌던 agy 실행이 없을 때, 대기열이 다음 agy 실행을 띄우기 전에만 하고 후보 규칙은 ADR UI-d9c1을 따른다. 성공 뒤 agy 모델 목록과 사용량 보관값을 버린다.
- 잠금: 사용자를 기다리는 동안 Claude·Codex 전환 잠금을 잡지 않는다. 계정 목록에 쓰는 단계(Codex의 활성 키 확인·`import`·전역 `auth.json` 교체·목록 재읽기, Claude의 캐시 비우기·목록 재읽기)만 러너별 전환 잠금(`acquireSwitchLock`)을 잡아 수동 전환·자동 복귀와 겹치지 않게 한다. agy는 위 조정 규칙과 `agy-auth`의 배타 잠금이 같은 일을 맡는다.
- 로그인 세션은 공급자 보류를 직접 풀지 않는다. 보류 해제는 기존 프로브가 판정한다.
- Claude 추가된 계정은 두 번째 인증의 실패·취소·시간 초과에도 유지한다. 결과는 세션 로그인 미완료와 `cswap session login <번호>` 재시도 명령을 함께 보여 준다.

## Consequences

- 함께 움직이는 소비자: `server/routes/account-login.js`(로그인 세션 모듈), `server/routes/agy-usage.js`·`server/routes/agy-account.js`(agy 사용량·전환·삭제와 자격 변경 조정), `server/worker/agy-model-list.js`(자격 변경 표지와 보관값), `server/worker/scheduler.js`(자격 변경 중 agy 실행 거부와 자동 전환), `app/views/usage-meter.js`·`app/views/settings-dialog/account-catalog.js`(카드 로그인 패널과 계정 목록), claude-swap의 `cswap login`·`cswap session login`과 계정 목록의 `sessionLoginOwn`, dotfiles의 `agy-auth`와 agy 잠금. 되돌리려면 이들을 같이 바꿔야 한다.
- `codex-auth login`·`cswap add`는 화면 경로에서 쓰지 않는다.
- 같은 화면의 로그인 단추가 Claude·Codex에서는 활성 계정을 그대로 두고 agy에서는 활성 계정을 바꾼다. agy 로그인 동안에는 agy 실행이 대기한다.
- agy가 이미 로그인된 상태면 창이 코드 없이 머리말을 보이므로 화면 재로그인은 `already_signed_in`으로 끝난다.
- 로그인 세션은 메모리에만 있어 서버 재시작이 진행 중 로그인을 잃는다. 시작 정리는 소유 서버 프로세스가 죽은 잔재(tmux 세션·`codex login` 프로세스 그룹·임시 `CODEX_HOME`)만 지워, 같은 상태 폴더를 쓰는 다른 서버의 진행 중 로그인을 건드리지 않는다.
- 로그인 세션 모듈은 Express 없이 부를 수 있게 두어, 보류 중인 credential 자동 재로그인 흐름(UI-s4g1)이 나중에 재사용할 수 있다.
- 시간 제한·폴링 간격 같은 값은 `server/routes/account-login.js`의 상수가 소유한다.
- Claude 계정 추가는 브라우저 인증을 두 번 받는다. 인증을 한 번 더 받는 대신 새 계정이 세션 전용 로그인을 갖춰, 실행 중 작업이 그 계정을 쓰고 있어도 전역 자동 전환 후보가 된다. 계정 줄에 경고와 별도 버튼만 붙이는 대안은 인증을 빠뜨릴 수 있어 채택하지 않는다.
