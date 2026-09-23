---
id: UI-u6ud-11
title: Worker 주소와 저장소 defaults 소비
status: accepted
date: 2026-09-23
summary: "Beads UI는 저장소 defaults 저장값과 Worker 주소 적용값을 분리하고 공통 주소의 조회·쓰기는 설치된 dotfiles worker-url CLI로만 하며 kv·공통 파일을 직접 쓰거나 적용값을 추측하지 않는다; defaults의 키·schema·허용값·부재 규칙은 dotfiles 계약이 정의하고 beads-ui는 어휘를 넓히거나 하네스 기본값을 복제하지 않으며 kv 읽기는 fail-quiet, 사용자 편집 쓰기는 strict 거절이다; 설정 화면은 적용 주소·저장소 예외·공통 기본값을 따로 보이고 새 연결 점검 API는 두지 않는다"
supersedes: ["UI-wecw"]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# Worker 주소와 저장소 defaults 소비

## Context

- `UI-wecw`: 저장소 defaults 저장값과 Worker 주소 적용값의 분리, 공통 주소의 dotfiles `worker-url` CLI 소비, 0013에서 승계한 defaults 어휘·검증의 dotfiles 소유권과 fail-quiet 읽기·strict 쓰기를 전부 재진술한다(제목만 이름으로 줄인다).

## Decision

- `get-session-defaults`/`set-session-defaults` 응답의 `values`·`warnings`는 저장소 kv의 저장값과 kv 경고 그대로이고, `values.bdui_url`에는 저장소 예외만 담는다.
- 실제 적용 주소는 별도 `worker_url` 필드로 싣는다. 성공 시 `{ status:'ok', effective_url, source(workspace|common|unset), workspace_override, common{value,state,revision}, warnings }`, 실패 시 `{ status:'unavailable', effective_url:null, source:null, error:{ code } }`다. `helper_unavailable`과 `workspace_unavailable`은 `source:'unset'`과 다른 값이고 UI는 적용값을 추측하지 않는다.
- `kvGetJson`은 성공 결과에 `found`를 더하고, 키가 없는 정상 부재(`found:false`, bd exit 1 포함)만 resolver stdin `{}`로 표현한다. `found:true`인데 값이 비었거나 파싱 경고가 있으면 CLI를 호출하지 않고 `workspace_unavailable`이다.
- SET은 저장값 readback 비교를 먼저 마친 뒤 성공한 `after.raw`로 해석하고, resolver 실패는 이미 성공한 kv 저장을 실패로 위장하지 않는다.
- 공통 주소의 조회와 쓰기는 설치된 dotfiles `worker-url` CLI로만 한다. `server/worker-url.js` 어댑터가 PATH에서 CLI를 찾아 argv와 stdin으로만 호출하고(shell 문자열 없음), 12초 timeout과 유한 출력 한도를 둔다.
- 서버는 설치 source checkout이나 계약 YAML을 런타임에 읽지 않고 공통 파일·kv를 직접 쓰지 않는다.
- 공통 편집 요청 `set-worker-url-common { root_dir?, value: origin|null, expected_revision }`은 CLI `common set --value|--unset --expect-revision`을 한 번 호출하고 kv나 큐를 쓰지 않는다. 빈 문자열은 클라이언트가 `null`로 바꾸고 서버는 `null` 외 삭제 표현을 거절한다. `revision_conflict`는 그대로 전달하고 자동 재시도하지 않는다. 공통 저장 뒤 root 읽기가 실패해도 `{ common_saved:true, common, worker_url:{status:'unavailable'} }`로 분리한다.
- 설정 화면은 적용 주소·저장소 예외·공통 기본값을 따로 보인다. 적용 주소와 출처는 읽기 전용이고, 저장소 예외 입력은 비어 있으면 상속 상태이며 상속값을 채우지 않는다. 공통 기본값은 별도 draft·baseline·저장 버튼을 갖고 편집 시작 시점 revision을 draft에 결속한다.
- 재조회는 설정 열기·창 focus·명시적 새로고침에서만 하고 파일 watcher나 polling은 없다. 늦게 온 응답은 요청 시점의 root·화면 세대와 다르면 버린다.
- 프리셋 적용·비교 키에 `bdui_url`이나 공통값을 넣지 않는다. 주소 형식 유효성은 서버 연결 성공을 뜻하지 않으며 새 연결 점검 API는 두지 않는다.
- defaults의 키 이름·schema·허용 키·허용값·부재/무효 규칙의 정의자는 dotfiles 계약이다. beads-ui는 어휘를 넓히지 않고 하네스 기본값을 자기 코드로 복제하지 않는다.
- kv 읽기는 fail-quiet(경고와 함께 버림)이고 사용자의 명시적 편집 쓰기는 strict하게 거절한다.
- Worker 주소의 적용값은 kv 저장값과 dotfiles 공통 설정을 dotfiles resolver가 합쳐 정한다.

## Consequences

- Worker 주소와 defaults 소비 규칙이 이름 붙은 한 행으로 읽힌다. 되돌리려면 `server/worker-url.js` 어댑터·설정 화면 세 값·dotfiles `worker-url` CLI와 kv 계약이 함께 움직인다.
- `UI-wecw`의 조항은 전부 승계했고 폐기한 조항은 없다.
