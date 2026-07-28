# 워커 헤드리스 세션의 Discord 알림 억제 (UI-ljcu)

## 배경

UI-9rrk가 워커 레인 알림을 네 시점(🚀 시작 · ❌ 실패 · 📬 PR 제출 · ✅ 머지 완료)으로 정리하면서,
같은 작업에 대해 두 계열의 Discord 알림이 겹치게 됐다.

워커는 `claude -p --output-format stream-json --permission-mode bypassPermissions`로 헤드리스 세션을
띄운다(`server/worker/runner/claude.js`). `--settings`/`--setting-sources`를 지정하지 않으므로
사용자의 `~/.claude/settings.json` hook이 그대로 걸리고, 세션이 끝날 때마다 `stop-hook.sh`의 Stop 분기가
"🟣✅ Claude Code - 응답 완료"를 브리지로 스풀한다. 브리지 세션 manifest에 워커 세션이 실제로 쌓여 있는
것으로 확인된다(`tmux_pane: null`, `cwd`가 `.worktrees/UI-*`).

`notify_policy.should_mention_stop()`은 duration이 길면 멘션을 붙이므로, 장기 작업이 대부분인 워커
세션은 거의 항상 멘션 조건에 걸린다.

## 변경

`claudeSpec()`이 반환하는 spawn env에 `CLAUDE_HOOK_SUPPRESS=1`을 싣는다.

```js
return { command: 'claude', args, env: { CLAUDE_HOOK_SUPPRESS: '1', ...routing_env } };
```

`session.js`가 `{ ...process.env, ...settings.env, ...adapter env }` 순으로 병합해 spawn하고 hook은
claude 프로세스의 자식이므로 env를 상속한다. 상수를 앞에 두어 `routing_env`의 명시적 오버라이드
여지를 남긴다(실사용 경로에서 `routing_env`는 항상 `{}`이므로 실효는 항상 억제).

## 근거

`CLAUDE_HOOK_SUPPRESS=1`은 dotfiles `src/claude/hooks/stop-hook.sh:10`에 이미 있는 전면 억제
스위치다. stdin만 소비하고 side effect 없이 종료하며, 전용 테스트
(`tests/claude_stop_hook_suppress_test.sh`)와 선례(`src/shell/bin/claude-rolling-reset.sh:79`의
헤드리스 ping)가 있다. 따라서 dotfiles는 변경하지 않는다 — 새 마커를 도입하는 대신 기존 계약을
소비한다.

배선 위치는 `claudeSpec()`이다. `runner/index.js`의 `routing_env`에 넣는 방안도 있으나 그 자리는
라우팅 전용이고, `CLAUDE_HOOK_SUPPRESS`는 claude CLI 전용 변수라 claude 어댑터와 의미가 정확히
겹친다.

## 수용 기준

- 워커가 spawn하는 claude 프로세스의 env에 `CLAUDE_HOOK_SUPPRESS=1`이 실린다.
- `routing_env`가 같은 키를 주면 그 값이 이긴다.
- 워커 세션 종료 시 Discord에 "응답 완료" 알림이 오지 않고, 브리지 `sessions/`에 새 워커 세션
  manifest가 생기지 않는다.
- 워커 레인 알림(🚀/❌/📬/✅)은 그대로 동작한다.

## 비목표

- 억제 범위의 세분화. 전면 억제이므로 워커 세션의 질문 대기(🟣❓)·plan 승인 대기(🟣📋) 알림도 함께
  사라진다. 그 신호는 워커 레인 UI에서 확인한다. 한도(limit) 상황은 기존에도 Stop 분기가
  `preserve`로 알림을 보내지 않았으므로 추가 손실이 없다.
- codex/ccx 러너 대응. `runner/index.js:4` 기준 러너는 claude 하나뿐이다. 다른 어댑터가 도입되면
  해당 CLI의 hook 억제는 그때 별도로 배선한다.
- dotfiles 변경 일체.

## 검증

- 단위: `runner/claude.test.js`에 spawn env의 `CLAUDE_HOOK_SUPPRESS=1`과 `routing_env` 우선순위 검증
- Pre-handoff: `npm run tsc` / `test` / `lint` / `prettier:write` (서버 코드라 프론트엔드 빌드 불필요)
- Post-merge: `bdui-shared restart` 후 프로세스 경로·리스닝 포트·HTTP 응답 확인
- 사후 실측: 다음 워커 세션 종료 시 Discord 알림 부재와 브리지 manifest 미생성
