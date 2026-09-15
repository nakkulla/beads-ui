---
id: UI-wecw
title: Beads UI는 저장소 defaults와 공통 Worker 주소 적용값을 분리하며 공통 주소 조회·쓰기는 dotfiles 소유 CLI를 소비한다 — defaults 어휘·검증의 dotfiles 소유권과 fail-quiet 읽기·strict 쓰기는 0013을 승계한다
status: accepted
date: 2026-09-16
summary: "Beads UI는 저장소 defaults와 공통 Worker 주소 적용값을 분리하며 공통 주소 조회·쓰기는 dotfiles 소유 CLI를 소비한다"
supersedes: [13]
spec: docs/superpowers/specs/2026-09-15-worker-url-common-default-ui-design.md
bead: UI-wecw
---

# Beads UI는 저장소 defaults와 공통 Worker 주소 적용값을 분리하며 공통 주소 조회·쓰기는 dotfiles 소유 CLI를 소비한다 — defaults 어휘·검증의 dotfiles 소유권과 fail-quiet 읽기·strict 쓰기는 0013을 승계한다

## Context

ADR 0013(2026-08-16)은 워크스페이스 세션 기본값의 정본을 dotfiles가 소유한 `bd kv`
단일 키 `workflow_session_defaults`로 옮기고, beads-ui를 그 값의 소비자로 두었다.
`bdui_url`도 그 21키 중 하나여서 Worker 주소는 저장소마다 kv에 한 번 적어야 했다.
새 저장소를 등록할 때마다 주소를 빠뜨리는 누락이 반복되자 dotfiles-48gg가 운영
계정 공통 설정 `${XDG_CONFIG_HOME:-$HOME/.config}/dotfiles/worker.json`과 단일
resolver CLI `worker-url`을 도입했다. 우선순위(유효한 저장소 예외 → 유효한 공통값 →
unset), 무효값 skip/warn, 공통 쓰기의 revision 비교·원자적 교체는 그 CLI가 소유한다
(ADR dotfiles/dotfiles-48gg).

그 결과 "모든 기본값이 단일 kv에 산다"는 0013의 조항은 Worker 주소에 대해 더 이상
사실이 아니다. 저장소 kv에는 예외만 남고 실제 적용 주소는 kv 밖에서 결정된다. 반면
0013의 다른 조항 — 키 이름·schema·허용 키·허용값·부재/무효 규칙은 dotfiles 계약이
정하고 beads-ui는 어휘를 넓히지 않으며 하네스 기본값을 복제하지 않는다, 읽기는
fail-quiet이고 명시적 편집 쓰기는 strict하다 — 는 그대로 유효하다.

기존 UI 경로는 그 분리를 담을 수 없었다. `readSessionDefaults`가 돌려주는 `values`는
폼의 baseline이자 draft이고, `handleSetSessionDefaults`의 저장 후 검증도 그 `values`를
대상으로 한다. 여기에 공통 상속값을 섞으면 비어 있어야 할 예외 입력이 상속값으로
채워져 다음 저장에서 예외로 굳고, 예외를 지운 뒤 readback이 상속값을 관측해 삭제
검증이 실패한다. 실재한 대안은 셋이었다.

- **저장값과 적용값을 분리하고 공통 편집은 dotfiles CLI에 위임**(선택) — kv에는
  예외만, 적용 주소는 resolver 결과로 따로 실어 폼 baseline과 삭제 readback이 그대로
  맞는다. 공통값 정본은 한 곳(dotfiles 파일)이고 UI는 호출과 표시만 소유한다.
- **`values.bdui_url`에 상속값을 섞기** — 기각. 위의 자동 예외 저장과 삭제 검증 오류를
  만든다.
- **UI 자체 전역 주소 저장소** — 기각. 같은 주소의 정본이 dotfiles 파일과 UI 저장소
  둘로 갈라져 0013이 없애려던 drift를 다시 만든다.

## Decision

**저장값과 적용값을 분리한다.** `get-session-defaults`/`set-session-defaults` 응답의
`values`·`warnings`는 저장소 kv의 저장값과 kv 경고 그대로이고, `values.bdui_url`에는
저장소 예외만 담는다. 실제 적용 주소는 별도 `worker_url` 필드로 실으며 성공 시
`{ status:'ok', effective_url, source(workspace|common|unset), workspace_override, common{value,state,revision}, warnings }`,
실패 시 `{ status:'unavailable', effective_url:null, source:null, error:{ code } }`다.
helper 실패(`helper_unavailable`)와 저장소 조회·파싱 실패(`workspace_unavailable`)는
저장소 미설정(`source:'unset'`)과 다른 값이고 UI는 적용값을 추측하지 않는다.

**정상 부재와 실패를 구분한다.** `kvGetJson`은 성공 결과에 `found`를 더하고, 키 자체가
없는 정상 부재(`found:false`, bd exit 1 포함)만 resolver stdin `{}`로 표현한다.
`found:true`인데 값이 비었거나 파싱 경고가 있으면 CLI를 호출하지 않고
`workspace_unavailable`이다. SET은 기존 저장값 readback 비교를 먼저 마친 뒤 성공한
`after.raw`로 해석하며, resolver 실패는 이미 성공한 kv 저장을 실패로 위장하지 않는다.

**공통 주소의 조회와 쓰기는 설치된 `worker-url` CLI로만 한다.** `server/worker-url.js`
어댑터가 PATH에서 CLI를 찾아 argv와 stdin으로만 호출하고(shell 문자열 없음), 12초
timeout과 유한 출력 한도를 둔다. 서버는 설치 source checkout이나 계약 YAML을 런타임에
읽지 않고 공통 파일을 직접 읽거나 쓰지 않는다. 공통 편집 요청
`set-worker-url-common { root_dir?, value: origin|null, expected_revision }`은 CLI
`common set --value|--unset --expect-revision`을 한 번 호출하며 kv나 큐를 쓰지 않는다.
빈 문자열은 클라이언트가 `null`로 바꾸고 서버는 `null` 외 삭제 표현을 거절한다.
`revision_conflict`는 그대로 전달하고 자동 재시도하지 않는다. 공통 저장 뒤 해당 root
읽기가 실패해도 `{ common_saved:true, common, worker_url:{status:'unavailable'} }`로
분리해 중복 저장을 유도하지 않는다.

**설정 화면은 세 값을 따로 보인다.** 실제 적용 주소와 출처는 읽기 전용이고, 저장소
예외 입력은 비어 있으면 상속 상태이며 상속값을 입력 value에 채우지 않는다. 공통
기본값은 별도 draft·baseline·저장 버튼을 가지며 편집 시작 시점 revision을 draft에
결속해 focus/재조회가 그 revision을 바꾸지 못하게 한다. 재조회는 설정 열기·창 focus·
명시적 새로고침에서만 하고 파일 watcher나 polling을 두지 않는다. 늦게 온 응답은
요청 시점의 root·화면 세대와 다르면 버린다. 프리셋 적용·비교 키에 `bdui_url`이나
공통값을 넣지 않는다. 주소 형식 유효성은 서버 연결 성공을 뜻하지 않으며 UI는 새
연결 점검 API를 추가하지 않는다.

**0013에서 승계하는 조항.** defaults의 키 이름·schema·허용 키·허용값·부재/무효 규칙의
정의자는 dotfiles 계약이고 beads-ui는 소비자로서 어휘를 넓히지 않으며 하네스
기본값을 자기 코드로 복제하지 않는다. kv 읽기는 fail-quiet(경고와 함께 버림)이고
사용자의 명시적 편집 쓰기는 strict하게 거절한다. 허용 키 집합도 계약이 소유한다.
바뀌는 것은 "모든 기본값이 단일 kv에 저장된다"는 조항 하나이며, Worker 주소의
적용값은 kv 저장값과 dotfiles 공통 설정을 dotfiles resolver가 합쳐 정한다.

## Consequences

- 쉬워지는 것: 저장소에 주소가 없어도 화면이 실제 적용 주소와 출처를 보여 주고,
  예외 삭제가 상속으로 돌아오는 것이 readback으로 검증된다. 공통 주소 변경은 한 곳에서
  하고 다음 조회부터 모든 저장소에 적용된다.
- 어려워지는 것: 설정 화면의 주소 영역은 WS 응답·폼 baseline·공통 저장 인터페이스가
  함께 묶여 있어 한쪽만 되돌릴 수 없다. 공유 서비스 계정에 `worker-url`이 설치되어
  있지 않으면 적용 주소를 표시할 수 없고 공통 편집이 비활성화된다(저장소 예외 편집은
  계속 가능).
- 배제되는 것: `values.bdui_url`에 상속값을 섞는 경로, UI 자체 전역 주소 저장소, 서버가
  공통 파일을 직접 읽거나 쓰는 경로, 공통값을 각 rig kv에 자동 복사하는 경로, 주소
  조회를 board/queue hot path에 넣는 경로.
- 배포 검증: 실행 가능한 read-only 잡 `repo-ops/post-merge.d/2026-09-15-worker-url-verify`가
  merge tree에서 발견되어 배포된 서비스의 target SHA/root health, WS 반환의
  `worker_url`, 설치 CLI 해석과의 일치, 등록 root queue GET 200을 확인한다. 조회 사이에
  설정이나 revision이 바뀌면 실패로 남긴다.
