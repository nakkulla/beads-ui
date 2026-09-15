---
scope:
  - server/bd.js
  - server/bd.test.js
  - server/session-defaults.js
  - server/session-defaults.test.js
  - server/worker-url.js
  - server/worker-url.test.js
  - server/ws/session-defaults-handlers.js
  - server/ws/session-defaults-handlers.test.js
  - server/ws/connection.js
  - server/ws/exec-settings-mutation.test.js
  - app/views/settings-dialog/
  - app/protocol.md
  - app/protocol.js
  - app/protocol.test.js
  - docs/adr/
  - repo-ops/post-merge.d/2026-09-15-worker-url-verify
---

# 공통 Worker 주소의 표시와 편집

Bead: UI-wecw. 선행 구현: dotfiles-48gg. 스펙 작성과 리뷰는 함께 진행하고 UI 구현은 선행 계약·CLI 배포 완료 뒤 시작한다.

## 목표와 현재 근거

주소가 저장소에 없더라도 실제 적용되는 공통 Worker 주소를 보여준다. 운영자가 공통값과 저장소 예외를 구별해 바꾸고, 예외를 지워 상속으로 돌아올 수 있게 한다. 공통 주소 편집은 UI에서도 제공하며 dotfiles의 공용 쓰기 명령으로만 저장한다.

현재 `server/ws/session-defaults-handlers.js`의 `readSessionDefaults`는 raw kv를 normalize한 values/warnings를 반환한다. `handleSetSessionDefaults`의 저장 후 검증도 저장된 values를 대상으로 한다. `server/session-defaults.js`의 `mergeSessionDefaults`는 다른 키를 보존하며 null/빈 문자열 패치를 삭제로 처리한다. `app/views/settings-dialog/execution-pane.js`의 `loadSessionDefaults`·`saveSessionDefaults`·`adoptPresetApply`는 values를 폼 baseline/draft로 쓴다. 따라서 여기에 공통값을 섞으면 상속값이 예외로 저장되거나 삭제 readback이 실패한다.

## 결정: producer 계약 소비

형제 스펙은 dotfiles의 `docs/superpowers/specs/2026-09-15-worker-url-common-default-design.md`다. 공통 설정은 `${XDG_CONFIG_HOME:-$HOME/.config}/dotfiles/worker.json`, 저장소 예외는 기존 `workflow_session_defaults.bdui_url`이다. 유효한 예외→유효한 공통값→unset 순서와 무효값 skip/warn은 dotfiles가 소유한다. bd 조회 실패는 해석 실패이며 공통값으로 대신하지 않는다. UI는 파일 직접 읽기/쓰기나 자체 전역 URL 저장소를 만들지 않는다.

설치된 `worker-url` 명령을 서버 PATH로 찾고 비동기 execFile/argv로 호출하는 작은 `server/worker-url.js` 어댑터를 둔다. 설치 source checkout이나 계약 YAML을 런타임에 파싱하지 않는다. stdin에는 서버가 읽은 원본 defaults 객체만 전달하고 명령 전체 timeout 12초와 유한 출력 한도를 둔다. 호출 시 서비스 계정 HOME/XDG를 유지한다.

`worker-url resolve --root <검증된 root> --workspace-json-stdin --json`이 적용 주소를 결정한다. schema 1, effective_url, source(workspace|common|unset), workspace_override, common, warnings를 받아 구조/어휘를 검증한다. common은 value, state(configured|unset|invalid|unavailable), revision(sha256|missing|null)이다. CLI 비존재·timeout·출력 오류·미지원 schema는 helper_unavailable로 표시하고 적용값을 추측하지 않는다. 기존 저장소 defaults의 읽기와 유효한 예외 편집은 계속 가능하다. helper 오류를 저장소 미설정으로 표시하지 않는다.

공통 쓰기는 `worker-url common set --value <origin> --expect-revision <revision> --json` 또는 `--unset`을 사용한다. CLI가 잠금·revision 비교·다른 키 보존·원자적 교체·readback을 소유한다. 무효 공통 문서는 덮어쓰지 않는다. revision_conflict는 최신값 새로고침을 안내하고 사용자 draft와 그 기준 revision을 보존한다. 자동 재시도하지 않는다.

## 결정: 저장값과 적용값의 WS 분리

기존 `get-session-defaults`/`set-session-defaults` 응답의 `values`, `warnings` 의미와 저장소 root 검증은 유지한다. 별도 `worker_url` 필드를 추가한다. 성공 시 `{status:"ok", effective_url, source, workspace_override, common, warnings}`이며 helper 실패 시 `{status:"unavailable", effective_url:null, source:null, error:{code:"helper_unavailable"}}`이다. unset은 status ok + source unset + null이다.

GET은 원본 kv snapshot을 한 번 읽고 그 객체로 resolve한다. `kvGetJson`의 성공 결과에 기존 필드를 보존한 채 `found`를 추가하고 `readSessionDefaults`까지 전달한다. 정상 `found:false`(bd exit 1 포함)만 stdin `{}`로 표현한다. `found:true`인데 raw가 undefined이거나 `kv_value_unparsable` 경고가 있으면 읽기/파싱 실패로 분류하여 CLI를 호출하지 않고 worker_url을 status unavailable, error.code workspace_unavailable로 반환한다. 기존 values/warnings는 유지한다. 이 경우도 helper 오류와 마찬가지로 유효한 저장소 예외 편집은 가능하다. 정상 부재와 실패를 `raw ?? {}` 하나로 합치지 않는다. SET은 기존 저장값 readback 비교를 먼저 수행하고 성공한 after.raw로 resolve한다. `values.bdui_url`에는 저장소 예외만 담고 공통 상속값을 넣지 않는다. resolver 실패는 이미 성공한 kv 저장을 실패로 위장하지 않고 worker_url.unavailable로 응답한다. 기존 warnings는 kv 경고이고 새 필드의 warnings는 resolver 경고다.

공통 편집용 `set-worker-url-common` 요청은 등록 root, `value`(canonical origin|null), `expected_revision`을 받는다. 빈 문자열은 클라이언트에서 null로 변환하고 서버에서는 null 외 삭제 표현을 거절한다. 저장소 root 검증 뒤 CLI set/unset을 한 번 호출하고 성공 응답의 common readback과 해당 root의 최신 kv를 resolve해 `worker_url`을 반환한다. 공통 쓰기는 kv나 큐를 쓰지 않는다. 공통 저장은 성공했지만 후속 root 읽기가 실패하면 `{common_saved:true, common, worker_url:{status:"unavailable",...}}`로 분리해 중복 저장을 유도하지 않는다. CLI 오류는 기존 WS 오류 응답 방식으로 error code를 전달한다.

이미 연결된 다른 브라우저는 설정 열기/창 focus/명시적 새로고침 때 다시 읽는다. 별도 파일 watcher나 지속 polling을 추가하지 않는다. 공통 편집이 dirty이면 편집 시작 시점 revision을 draft에 결속해 유지하고 focus/재조회가 최신 common 표시만 바꾸도록 한다. 저장은 그 원래 revision을 보내 다른 창의 변경과 충돌하게 한다. 성공 또는 사용자가 명시적으로 편집을 취소하고 최신값을 채택한 때에만 draft 기준 revision을 갱신한다. 깨끗한 폼은 조회 결과와 revision을 함께 갱신한다. 공통 저장 성공 후 현재 창은 즉시 새로 해석한다. 조회 결과는 요청을 시작한 root·화면 세대에 묶어, 저장소 전환/닫기 이후 늦게 온 응답이 새 화면을 덮지 못하게 한다.

## 설정 화면 동작

기존 실행 설정의 주소 영역에 다음을 표시한다. 화면에 CLI 경로 같은 구현 세부를 노출하지 않는다.

| 항목 | 값/동작 |
| --- | --- |
| 실제 적용 주소 | 읽기 전용 주소와 공통 기본값/이 저장소의 예외/미설정 출처 |
| 이 저장소의 예외 | 기존 저장값 입력. 비워 저장하면 공통값 사용 |
| 공통 기본값 | 별도 입력과 저장/지우기. 같은 서버 운영 계정의 모든 저장소에 적용됨을 인접 문구로 표시 |
| 상태 | 무효값을 건너뛴 이유, 공통 설정 읽기 오류, helper 설치 필요를 구분 |

공통값과 저장소 예외는 별도 draft/baseline·저장 버튼을 가진다. 공통값 편집을 현재 저장소의 일반 defaults 저장에 섞지 않는다. 공통 저장 시 영향을 설명한 버튼을 한 번 누르는 것으로 저장하며 별도 승인 대화상자를 추가하지 않는다. 공통값을 바꿔도 예외가 있는 현재 저장소는 예외가 계속 적용된다고 표시한다.

예외가 없을 때 입력은 비어 있고 hint/적용주소 영역에 상속값을 보여준다. 상속값을 입력 value에 채우지 않는다. 공통 삭제도 예외를 삭제하지 않는다. URL 삭제는 Worker 비활성화가 아니며 큐의 자동 실행 설정을 바꾸지 않는다.

입력 검증은 기존 canonical HTTP(S) origin 규칙을 유지한다. 저장을 위한 서버 검증과 CLI 최종 검증은 동일한 corpus를 통과한다. invalid 기존 값을 normalize해 숨긴 경우 경고를 남기며 정상 값 입력/삭제는 기존 예외 경로로 고칠 수 있다. 공통 파일 자체 invalid/unavailable일 때는 편집 불가 원인을 표시하고 기존 데이터의 강제 초기화를 제공하지 않는다.

`adoptPresetApply`는 프리셋 응답의 values만 기존대로 반영하고 주소의 effective 상태를 별도 새로고침한다. 프리셋 저장/적용/비교 키에 bdui_url 또는 공통값을 넣지 않는다. 모델·리뷰와 전환 중 draft를 보존하는 현행 reconcile 동작을 유지한다.

## 연결 상태의 의미

설정 조회와 저장은 로컬 설정 판정이다. 주소 형식이 유효하다는 이유로 서버 연결 성공을 표시하지 않는다. UI의 기본 상태 표시는 출처·설정 오류까지만 다루며 별도 새 연결 점검 API/자동 polling은 이 범위에 추가하지 않는다.

연결 실패는 Worker 배치/continuation의 기존 큐 GET에서 확인하며 선택된 주소를 다른 주소로 바꾸지 않는다. 실제 배포 수용에서는 UI가 반환한 effective_url과 동일 origin으로 등록 root의 `GET /api/worker/queue?root_dir=...`를 호출해 200을 확인한다. 해당 live 점검 실패는 배포 검증 실패로 남긴다. 설정 GET/SET은 큐 요청·자동 배치·서비스 재시작을 일으키지 않는다.

## 구현·배포 순서

1. dotfiles-48gg가 계약·schema 1 CLI·fixture를 착지하고 공유 서비스 운영 계정에 설치했는지 `worker-url common get --json`과 resolve로 확인한다. foreign blocks가 구현 선행을 보장한다. producer가 없으면 자체 fallback을 구현하지 않는다.
2. 서버 adapter→WS 응답/쓰기→폼 분리 순서로 하나의 구현 PR에서 맞춘다. 구 클라이언트는 추가 worker_url 필드를 무시하고 기존 values로 계속 동작한다. 신 클라이언트가 worker_url 없는 구 서버를 만나면 적용값을 확인할 수 없다고 표시하고 공통 편집을 비활성화한다.
3. 현재 이전 main의 `repo-ops/config.toml`에 `[deploy]` handler가 선언되어 있다. 기존 `repo-ops/script/deploy`의 build·공유 서비스 재시작·target SHA health 검증 순서를 유지한다. 새 주소 검증은 PR에 포함하는 실행 가능한 일반 파일 `repo-ops/post-merge.d/2026-09-15-worker-url-verify`가 수행한다. 기존 post_merge_jobs가 deploy 이후 merge tree에서 파일을 발견해 실행하고 원장에 성공을 기록한다. 변경된 deploy handler만으로 첫 적용을 검증하지 않는다. transition에서는 이전 handler blob이 실행될 수 있기 때문이다.
   잡은 cwd의 `git rev-parse --path-format=absolute --git-common-dir`가 가리키는 `.git`의 부모를 등록 root로 삼는다. 대상 health URL은 기존 deploy와 동일하게 BDUI_DEPLOY_HEALTH_URL을 우선하고, 없으면 BDUI_HOST→ts-ip→127.0.0.1의 host와 포트 3000의 /healthz를 사용한다. WS 연결의 서비스 origin은 이 health URL의 origin이다. 해당 서비스 health의 source SHA/root를 job target/release와 맞추고, 기존 WS 프로토콜로 그 등록 root의 get-session-defaults를 읽는다. WS 조회 전후에 bd raw snapshot과 공통 revision을 읽어 변하지 않았음을 확인하고, effective_url/source를 그 snapshot에 대한 설치 CLI 해석과 비교한 후 주소가 있으면 그 origin의 등록 root queue GET 200을 확인한다. 양쪽 정상 unset이면 출처와 null만 검증하고 연결 요청을 생략한다. 설정이나 revision이 조회 사이 바뀌면 불일치를 성공으로 처리하지 않고 변경 중으로 실패시켜 기존 재시도 절차로 보낸다. 잡 자체는 조회만 하며 각 결과와 exit/log/tracked-clean을 기존 원장이 완료 근거로 보존한다.
4. 공통값과 예외는 배포/재시작에서 수정하지 않는다. helper 부재나 현재 설정의 오류는 기존 저장소 작업을 파괴하지 않으면서 post-merge 검증 잡 실패로 남겨 close를 막는다. 수동 복구가 필요한 공통 문서 손상은 실패 원인에 명시한다. 중간 중단은 기존 deploy/잡 원장의 재진입 규칙을 따르며 새 성공을 꾸며 쓰지 않는다.
5. 배포된 화면에서 공통값 표시, 예외 우선/삭제 후 상속, invalid/helper 실패 문구를 확인한다. 자동 UI 검증은 fixture 설정으로 수행하고 실제 rig를 시험 때문에 변경하지 않는다. 실제 화면 육안 확인은 배포 후 운영 확인으로 인계할 수 있으며 close를 막는 대화형 승인 단계는 아니다.

## 검증과 수용 기준

- 기존 `server/session-defaults.test.js`와 WS handler 테스트에 raw/values 보존·effective 분리·예외 삭제 readback·다른 kv 키 보존을 추가한다. GET-only 호출 전후 writeKv와 공통 쓰기 호출 수가 0이어야 한다. 전체 kv 키가 없는 정상 GET은 stdin {}로 common을 반환하고, found:true 빈/손상 value와 파싱 경고는 workspace_unavailable로 공통 적용을 막는 사례를 포함한다.
- 새 adapter 테스트는 argv/stdin/root 바인딩·bounded timeout·schema 오류·CLI 부재·공통 충돌·오류 후 stored defaults 사용을 검증한다. shell 문자열로 실행하지 않음을 검증한다.
- 공통 저장 성공 후 root 읽기 실패는 common_saved true, 저장 실패는 성공 표시 없음, 두 브라우저의 같은 revision 저장은 한 번만 성공함을 검증한다. dirty draft 중 다른 창이 저장한 뒤 focus 재조회가 와도 원래 revision으로 저장해 충돌하며 draft가 남아야 한다. CLI 내부 잠금 검증은 producer가 소유하고 UI는 그 응답을 정확히 소비한다.
- `session-model.test.js`와 `execution-pane.test.js`는 상속값 비저장, 출처 세 상태, helper unavailable의 별도 표시, 예외/공통의 독립 저장, workspace 전환의 지연 응답, 공통값 외부 변경 후 focus 갱신, 프리셋 적용 뒤 주소 유지와 재조회, dirty draft 보존을 검증한다.
- producer의 착지 SHA에 있는 `tests/fixtures/worker-url-origins.json`를 cross-repo 계약 테스트로 확인한다. runtime 서버는 그 checkout을 읽지 않는다. 기존 UI validator와 CLI에서 localhost/IPv4/IPv6/HTTPS·default port·IDN·path/query/userinfo/공백 경계가 일치해야 한다.
- 최종 구현 검증은 저장소가 요구하는 typecheck/lint/format/vitest bundle과 build이며, 구체 명령은 현행 AGENTS.md/package.json을 따른다. 스펙 작성 단계에서 코드 테스트나 live 기능의 통과를 주장하지 않는다.
- live 완료 근거는 배포된 서비스의 target SHA/root health, WS 반환의 적용 주소·출처, 같은 주소의 등록 root queue GET 200이다. 공유 서비스에 작업을 시험 등록하지 않는다. 미설정이면 출처 unset을 확인하고 연결 성공을 주장하지 않는다.

## 경계·후속

분할 근거 — 공통 설정 저장과 런타임 규칙은 dotfiles, 설정 폼·WS 프로토콜·공유 UI 배포는 beads-ui라 검증과 인도 단위가 다르다.

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소의 공통 설정·resolver·런타임 설치 단위 | 없음 | dotfiles-48gg |

이 이슈 UI-wecw의 선행은 dotfiles-48gg이며 실제 foreign blocks를 유지한다. 공통값 편집의 정의와 원자적 저장은 producer가 소유하고 이 이슈는 그 호출과 표시만 소유한다.

## 결정 (ADR 후보)

- 전제: ADR 0013 — defaults 어휘와 검증의 정의자는 dotfiles이고 UI는 소비자라는 조항을 승계한다. 모든 기본값이 단일 kv에 저장된다는 조항은 아래 후보로 교체한다.
- 전제: ADR 0012 — UI registry는 좁은 계약 subset을 명시하고 런타임에 dotfiles 계약 YAML을 읽지 않는다. 서버 helper 결과 필드 검증과 cross-repo fixture 검증으로 따른다.
- 전제: ADR 0039 — 설치된 checker/도구를 비동기 JSON 프로세스로 소비하고 정본 규칙을 서버에 중복 구현하지 않는 경계를 따른다. 주소 helper는 설정 요청에만 쓰며 board/queue hot path에 추가하지 않는다.
- 전제: ADR UI-3vvi-2 — post-merge 잡은 merge tree에서 발견하고 deploy 이후 기존 실행 봉투·원장으로 실제 성공을 증명한다(UI-j9j5 승계).
- 전제: ADR UI-00lf — 프리셋은 정의된 25키 프로파일이고 주소는 프리셋 키 밖에 둔다(UI-7yh2 승계).
- 전제: ADR dotfiles/0064 — continuation의 큐 근거와 무권한 부작용 경계는 유지하며 주소 조회 조항 교체는 dotfiles-48gg가 소유한다.
- 저장소 defaults의 저장값과 공통 주소 적용값을 분리하고 공통 편집은 dotfiles CLI로 위임한다. 되돌리기 어려움: WS와 폼 baseline·공통 저장 인터페이스를 함께 변경해야 한다. 맥락 없으면 놀라움: 입력이 비었는데 실제 주소가 있으며 공통 변경이 현재 예외에는 영향을 주지 않는다. 실제 대안: values에 상속값을 섞으면 자동 예외 저장과 삭제 검증 오류를 만들고 UI 별도 저장소는 정본을 둘로 나누므로 배제한다. `summary`: "Beads UI는 저장소 defaults와 공통 Worker 주소 적용값을 분리하며 공통 주소 조회·쓰기는 dotfiles 소유 CLI를 소비한다" → ADR, supersede 0013
