# Codex native 하위 에이전트 fixture 관측 노트

- 확인 날짜: 2026-09-08
- CLI 버전: `codex-cli 0.153.4` (`codex --version`)
- 소유 Bead: UI-9xs2 (discovered-from UI-mn5u §6)
- fixture:
  - `server/worker/__fixtures__/codex-native-child.jsonl` — `codex exec --json` stdout 원문(8줄)
  - `server/worker/__fixtures__/codex-native-child-rollout.jsonl` — root rollout(33줄) 뒤에 child rollout(45줄)을 이어 붙인 파일. 두 파일 경계는 두 번째 `session_meta` 줄(ordinal 0)이다.

## 실행 명령

Worker runner(`server/worker/runner/codex.js`)와 같은 옵션 조합으로, 임시 전용 디렉터리(`/workspace/sample-repo`로 치환)에서 실행했다. 실제 rig의 Bead나 사용자 작업은 건드리지 않았다.

```
CODEX_SILENT=1 codex exec --json \
  -c model_reasoning_effort=low \
  -c agents.default_subagent_reasoning_effort=low \
  -c 'service_tier="default"' \
  --dangerously-bypass-approvals-and-sandbox \
  --disable hooks \
  '<하위 에이전트 하나를 spawn해 child-note.txt를 만들고 SHA-256을 보고하게 한 뒤 기다리라는 프롬프트>'
```

- 사용 계정 config: `[features] multi_agent = true`(stable), `multi_agent_v2 = false`이지만 rollout `turn_context.multi_agent_version`은 `"v2"`로 기록됐다. `[agents] default_subagent_model`이 설정돼 있어도 root가 `spawn_agent` 인자에 `model`을 직접 지정할 수 있다(이번 실측에서는 지정함).
- 종료: exit 0, root 소요 55.3초, child 소요 36.6초. child는 실제로 파일을 만들고 SHA-256을 보고했다(child `task_complete.last_agent_message`).

## 비식별 처리

`/Users/<home>` → `/home/sample`, 작업 디렉터리 → `/workspace/sample-repo`, 이메일 → `[email]`, 600자 초과 문자열(시스템 지침·AGENTS.md·스킬 목록·도구 출력·암호화된 spawn 메시지) → 앞 120자 + `[redacted N chars]`, `plan_type`/`limit_id` → `sample`. 이벤트 종류·순서·id·usage 숫자는 원문 그대로다.

## 1. exec JSONL(stdout)에 child 이벤트가 있는가 — **없다**

`codex exec --json` stdout에는 child thread가 전혀 나타나지 않는다.

- `spawn_agent` 호출은 stdout item으로 **나오지 않는다**. rollout에는 `function_call name=spawn_agent`가 있지만 exec JSONL에는 대응 item이 없다.
- `wait_agent`만 `item.started`/`item.completed`의 `type:"collab_tool_call", tool:"wait"`로 나오며, 그마저 `receiver_thread_ids: []`, `agents_states: {}`로 비어 있어 child thread_id를 주지 않는다.
- `turn.completed.usage`는 root thread의 누적치(`input_tokens 56733 …`)만이며 child usage는 포함하지 않는다.

따라서 §6의 parser는 exec JSONL을 root↔child 연결·child usage의 원천으로 쓸 수 없고, rollout 파일만 원천이다(스펙 §6.1 "exec JSONL에 child 이벤트가 없으면 rollout만 원천" 분기).

## 2. rollout 파일에서의 root↔child 연결 근거

### 파일 위치

- root: `~/.codex/sessions/<YYYY>/<MM>/<DD>/rollout-<local-time>-<root_thread_id>.jsonl`
- child: 같은 디렉터리에 별도 파일 `rollout-<local-time>-<child_thread_id>.jsonl`. root 파일 안에 child 이벤트가 인라인되지 않는다.
- child의 thread_id는 UUID v7이므로 기존 `uuidV7StartedAt`/`codexRolloutFilePath`(`server/worker/session-ref.js`) 경로 계산이 그대로 적용된다. 단 **root 쪽 기록에는 child thread_id가 없으므로**(아래) child 파일은 "root id로부터 계산"할 수 없고, 같은 sessions 디렉터리에서 `session_meta.payload.parent_thread_id == root_thread_id`인 파일을 탐색해야 한다. 탐색 범위는 root의 spawn 시각 이후에 생성된 파일로 좁힐 수 있다(child 파일명 timestamp `16-16-29` = root의 `spawn_agent` `function_call_output` 시각 `07:16:29.553Z`와 같은 초).

### root rollout이 주는 것 (연결에 불충분)

| ordinal | 줄 | 내용 |
| --- | --- | --- |
| 12 | `response_item` / `function_call` | `name:"spawn_agent"`, `namespace:"agents"`, `call_id`, `arguments`에 `task_name`, `fork_turns`, `model`(`gpt-5.6-terra`), `message`(암호문 `gAAAA…`, 평문 아님) |
| 15 | `response_item` / `function_call_output` | 같은 `call_id`, `output: {"task_name":"/root/create_child_note","nickname":"Aquinas"}` — **thread_id 없음** |
| 17 | `world_state` (`full:false`) | `state.environments.subagents: "- create_child_note: Aquinas"` — 텍스트 목록, id 없음 |
| 18 / 22 | `function_call` `wait_agent` / 그 output | `{"message":"Wait completed.","timed_out":false}` — id·usage 없음 |

즉 root 쪽에서 child를 식별하는 키는 `agent_path`(`/root/<task_name>`)와 `nickname`뿐이다. `launch_id`로 쓸 수 있는 값은 `spawn_agent`의 `call_id`(`call_…`)이며, 이것은 child rollout에는 나타나지 않는다.

### child rollout이 주는 것 (연결의 정본)

`session_meta`(ordinal 0)의 `payload`:

| 필드 | 값(실측) | 의미 |
| --- | --- | --- |
| `id` | `01a07fe0-1e96-7443-b224-30d21a82419a` | child thread_id (파일명과 일치) |
| `session_id` | `01a07fdf-ee94-7ac3-8e6f-bc0910eee0af` | **root** thread_id (child 자신의 id가 아님에 주의) |
| `parent_thread_id` | root thread_id | 직접 부모 |
| `thread_source` | `"subagent"` | root는 `"user"` |
| `source.subagent.thread_spawn` | `{parent_thread_id, depth:1, agent_path:"/root/create_child_note", agent_nickname:"Aquinas", agent_role:null}` | root의 `spawn_agent` output(`task_name`, `nickname`)과 대응하는 키 |
| `agent_path`, `agent_nickname` | 위와 같음 | |

보조 근거:

- child `turn_context.root_turn_id`(ordinal 7) == root `turn_context.turn_id` == root `task_started.turn_id`. child 자신의 `turn_id`는 별도 값이다.
- child `token_usage_record.session_id` == root thread_id, `thread_id` == child thread_id, `root_turn_id` == root turn_id.
- child `inter_agent_communication_metadata.trigger_turn: true`(root는 `false`).
- child `turn_context.model`은 `gpt-5.6-terra`(spawn 인자의 model), `effort`는 `low`(`agents.default_subagent_reasoning_effort`).

깊이 2 이상(child의 child)은 이번 실측에 없다. `source.subagent.thread_spawn.depth`와 `parent_thread_id`가 그 경우의 연결 키가 될 것으로 보이지만 미관측이다.

## 3. child 사용량 이벤트의 위치

child rollout 안에만 있다. 두 종류가 응답마다 짝으로 기록된다.

- `type:"token_usage_record"` — `payload.usage`(이번 응답), `payload.turn_token_usage`(turn 누적), `payload.thread_token_usage`(thread 누적). 키는 `input_tokens, cached_input_tokens, cache_write_input_tokens, output_tokens, reasoning_output_tokens, total_tokens`로 §6.2 표의 usage 키 집합과 같다.
- `type:"event_msg"`, `payload.type:"token_count"` — `info.total_token_usage`(thread 누적), `info.last_token_usage`(이번 응답), `rate_limits`.

child 최종 누적(ordinal 42/43): `input 113441 / cached 87040 / output 902 / reasoning 276 / total 114343`. 마지막 `thread_token_usage`가 곧 §6.2의 "마지막 검증된 누적 usage"이며 turn마다 더하면 안 된다.

### root 총합이 child를 포함하는가 — **포함하지 않는다**

root의 `token_usage_record` 3건의 `usage.total_tokens`는 `18941 + 18988 + 19252 = 57181`이고, root 최종 `thread_token_usage.total_tokens`도 `57181`, exec JSONL `turn.completed.usage`도 같은 값이다. child 누적 114343은 어디에도 합산되지 않았다. §6.4의 "attempt 총합에 child를 가산하지 않는다"는 이 실측과 일치하며, 별도 합산 정책을 정하려면 이 관측을 근거로 삼을 수 있다.

## 4. child 수명 이벤트

| 상태 | 근거 |
| --- | --- |
| started | child `session_meta`(파일 생성) + `event_msg task_started {turn_id, started_at(epoch s)}` |
| done | child `event_msg task_complete {turn_id, last_agent_message, started_at, completed_at, duration_ms}` (`completed_at` epoch 초) |
| failed / interrupted | 미관측. 이번 실측은 정상 종료 1건뿐이다 |

root의 `wait_agent` 완료(`Wait completed.`)는 child의 `task_complete`(07:17:06.165Z)와 사실상 동시(07:17:06.167Z)지만 child 상태의 정본이 아니다. §6.2대로 spawn 도구 호출 완료(ordinal 15)는 child 완료가 아니다.

## 5. 부수 관측

- root의 마지막 `agent_message`는 child가 보고한 SHA-256이 아니라 "지침을 확인했습니다…"였다(exec JSONL `item_3`). child 결과가 root 답변에 반영되지 않은 것은 프롬프트/모델 동작 문제이며 이벤트 문법과는 무관하다.
- `spawn_agent.arguments.message`는 root rollout에 암호문으로 저장된다. child가 받은 실제 지시는 child rollout ordinal 9의 `response_item` / `agent_message`에 평문 `Message Type: NEW_TASK\nTask name: /root/create_child_note\nSender: /root\nPayload: …` 형식으로 있다. `Task name`·`Sender`가 root의 `spawn_agent` output(`task_name`)·`agent_path`와 다시 대응한다.
- exec stderr는 `Reading additional input from stdin...` 한 줄뿐이었다(stdin 비어 있음).
