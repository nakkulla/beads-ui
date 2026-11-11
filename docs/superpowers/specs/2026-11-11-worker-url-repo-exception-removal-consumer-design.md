---
scope:
  - server/worker-url.js
  - server/ws/session-defaults-handlers.js
  - server/session-defaults.js
  - server/worker/exec-enums.js
  - app/views/settings-dialog/
  - app/protocol.md
---

# 설정 창·서버에서 Worker 주소 저장소별 예외를 걷어낸다 (UI-7gv4)

## 1. 목표

Worker는 Mac Studio 한 대에서만 돌고, 주소를 읽는 도구(`worker-url`·Beads 도구)도 그 머신에만 설치된다. 그래서
Worker 주소는 공통 파일 `${XDG_CONFIG_HOME:-$HOME/.config}/dotfiles/worker.json` 하나로 충분하다(2026-11-11 사용자
결정). 저장소마다 두던 예외(`bd kv workflow_session_defaults.bdui_url`)는 없앤다.

계약 정본과 `worker-url` 도구는 형제 dotfiles-ownp2가 바꾸고, beads-ui는 소비자다(ADR UI-jlov). 사용자 결정에
따라 **beads-ui가 먼저 착지한다**. 이 Bead는 지금의 `worker-url`과 dotfiles-ownp2 뒤의 `worker-url`을 둘 다 받아들이는
모양으로 소비 경로를 바꾼다. 그래서 두 저장소의 배포 사이에 설정 창 주소 표시가 깨지는 구간이 없다.

완료 기준:

- 설정 창 어디에도 저장소별 Worker 주소 예외가 보이지 않는다. `운영` 탭의 공통 주소 편집은 그대로다.
- 서버는 `worker-url`을 `--workspace-json-stdin` 없이 부르고, 응답에 `workspace_override`가 없어도 받아들인다.
- `bdui_url`은 더 이상 beads-ui가 아는 저장소 기본값 키가 아니다.
- 배포 뒤 `get-session-defaults`의 `worker_url`이 `worker-url resolve --root <root> --json`과 같은 주소·`source`다
  (배포한 세션이 직접 확인한다).

## 2. 검증된 전제

- 서버 어댑터는 `--workspace-json-stdin`으로 서버가 읽은 kv를 넘기고, `source` 세 값과 `workspace_override` 필드를
  엄격히 검사해 어긋나면 `unavailable`이다 — server/worker-url.js:84-110
- `get-session-defaults`는 kv 읽기 자체가 실패하면(`ok:false`) 요청 전체를 `kv_read_failed`로 실패시킨다. 읽기는
  됐지만 값이 비었거나 경고가 붙으면 `worker_url`을 resolver 없이 `workspace_unavailable`로 내고, resolver 오류는
  `helper_unavailable`로 바꾼다 — server/ws/session-defaults-handlers.js:151-170, 189-192
- 카드·모니터·Worker 화면은 Worker 주소(`worker_url`·`effective_url`·`bdui_url`)를 읽지 않는다 —
  `grep -rln 'worker_url\|effective_url\|bdui_url' app/views/worker app/views/monitor app/views/*.js` 결과 없음(테스트 제외)
- `bdui_url`은 저장소 기본값 키 목록과 형식 판정에 들어 있다 — server/worker/exec-enums.js:196-202,
  server/session-defaults.js:80
- 목록 밖 키는 읽을 때 `unknown_key:<key>` 경고와 함께 버려지고, 쓰기 요청에 들어 있으면 거절되며, 병합은 저장돼
  있던 다른 키를 보존한다 — server/session-defaults.js:134-158, 173-200, 209-224
- 공통 주소 저장 요청의 형식 판정은 같은 `isHttpOriginValue`를 쓴다 — server/ws/session-defaults-handlers.js:22, 365
- dotfiles 테스트가 beads-ui `server/session-defaults.js`의 `isHttpOriginValue` 본문을 읽어 origin fixture와
  대조한다 — dotfiles tests/worker_url_test.py:261-279
- 저장소 탭은 저장된 `bdui_url`을 `Worker 주소 예외` 읽기 전용 줄과 `지우기`로 보인다 —
  app/views/settings-dialog/repo-pane.js:38-55
- 대화창 모델은 `bdui_url`을 저장소 키 목록·형식 판정·`이 저장소의 예외` 라벨·`workspace_invalid` 경고 문구로
  다룬다 — app/views/settings-dialog/session-model.js:55-64, 115-125, 892-915
- `운영` 탭은 `workerUrlMessage`를 응답이 `ok`가 아닐 때만 부른다 — app/views/settings-dialog/worker-url-section.js:40-45
- 배포 후 잡은 파일 내용마다 한 번만 돌고(원장 키 `<파일명>@<blob sha>`), 내용이 바뀌면 새 키로 다시 돈다 —
  server/worker/post-merge-job.js:1-24, 40
- `2026-09-15-worker-url-verify`는 stdin 스냅숏으로 resolve하고, `2026-09-10-exec-presets-replace`가 부르는 스크립트는
  적용 전후 `bdui_url`이 같은지 본다. 둘 다 이미 적용된 1회성 잡이다 —
  repo-ops/post-merge.d/2026-09-15-worker-url-verify:208, repo-ops/post-merge.d/2026-09-10-exec-presets-replace:9,
  scripts/exec-presets-replace.js:503-519
- 프로토콜 문서는 `values.bdui_url`을 저장소 예외로 설명한다 — app/protocol.md:1513
- 현재 `worker-url resolve`는 kv 예외가 있으면 `source=workspace`, 없으면 `common`/`unset`이고, 출력에
  `workspace_override`가 있다 — dotfiles src/shell/bin/worker-url:219-231
- Worker 주소 도구는 hub 프로필에만 설치된다 — dotfiles src/shell/config/fleet.toml:101-102, 122-143
- 2026-11-11 이 세션에서 kv 예외를 쓰던 4개 저장소(beads-ui·dotfiles·microbiome_bile·prostate, 값은 공통값과 같음)의
  `bdui_url`을 지웠다. `~/GitHub` 아래 Beads 저장소 19개와 그 밖의 등록 작업공간 4개(ProjectVault·External/beads·
  Cortex·Hippocampus) 모두 `source=common`이다 — WS `list-workspaces`, `worker-url resolve --root <각 저장소> --json`

## 3. 설계

### 3.1 resolve 호출과 응답 받기

- 서버는 `worker-url resolve --root <등록 root> --json`을 stdin 없이 부른다. 옛 도구는 이때 kv를 직접 읽고, 새 도구는
  공통 파일만 읽는다. 두 경우 모두 같은 명령이 성공한다.
- kv 읽기 자체가 실패하는 경우(`kv_read_failed`)의 처리는 바꾸지 않는다.
- 결정: kv는 읽혔지만 값이 비었거나 경고가 붙은 경우에도 `worker_url`은 resolver 결과를 싣는다 — 주소가 더 이상 kv에
  없으므로 kv 값의 상태가 주소 표시를 막을 이유가 없다. resolver가 낸 오류(옛 도구의 kv 읽기 실패 포함)는 지금처럼
  `helper_unavailable`로 보인다.
- 받아들이는 응답: `schema:1`, `effective_url` 문자열|null, `source` ∈ {`common`, `unset`}, 유효한 `common` 객체,
  `warnings` 배열이다. `workspace_override`는 있어도 없어도 되고 읽지 않는다.
- 결정: `source=workspace` 응답은 `helper_unavailable`로 처리한다 — 옛 도구가 kv 예외를 찾았다는 뜻인데, 그 예외는
  2.의 정리로 0개이고 이 Bead 뒤로는 어떤 화면도 그것을 설명하지 않는다. 받아서 보여 주는 대안은 없앨 개념을 화면에
  다시 들이므로 기각한다.
- 클라이언트로 가는 `worker_url`은 `{ status, effective_url, source, common, warnings }`다. `workspace_override`는 뺀다.

### 3.2 저장소 기본값 키에서 `bdui_url` 제거

- `bdui_url`을 저장소 기본값 키 목록과 형식 판정 표에서 뺀다.
- 결정: origin 형식 판정 함수 `isHttpOriginValue`는 `server/session-defaults.js`에 그 이름과 본문 그대로 남긴다 — 공통
  주소 저장이 쓰고, dotfiles 테스트가 그 파일에서 본문을 읽는다.
- kv에 `bdui_url`이 남아 있는 저장소는 기존 목록 밖 키 경로를 그대로 탄다: 읽을 때 `unknown_key:bdui_url` 경고,
  쓰기 요청이 그 키를 담으면 거절, 다른 키를 저장할 때는 보존.
- 결정: 남은 `bdui_url`을 지우는 화면 경로는 두지 않는다 — 지금 0개이고, 새 resolver는 그 값을 읽지 않으므로 남아도
  주소가 바뀌지 않는다. 필요하면 `bd kv`로 지운다.

### 3.3 설정 창

- 저장소 탭의 저장 전용 줄에서 `Worker 주소 예외` 행을 뺀다. `워크플로 모드` 행은 그대로다.
- 대화창 모델에서 `bdui_url` 키, `이 저장소의 예외` 라벨, `workspace_invalid` 경고 문구를 뺀다. `운영` 탭의 상태 문구는
  `공통 기본값`·`미설정`과 공통 주소 경고만 쓴다.
- `운영` 탭의 공통 주소 편집(읽기·저장·충돌 처리·포커스 재읽기)은 바꾸지 않는다. 주석의 "저장소 예외는 저장소 탭이
  보인다" 설명은 지운다.
- 카드·모니터 표면은 Worker 주소를 그리지 않으므로 영향이 없다.

### 3.4 배포 후 잡

- 결정: `repo-ops/post-merge.d/`의 두 잡과 `scripts/exec-presets-replace.js`는 바꾸지 않는다 — 이미 적용된 1회성
  잡이라 다시 돌지 않는다. 고치면 원장 키가 바뀌어 이 Bead 머지 때 다시 돈다. 프리셋 스크립트의 `bdui_url` 전후
  비교는 키가 없으면 둘 다 비어 있어 통과한다.

### 3.5 프로토콜 문서

- `get-session-defaults`·`set-session-defaults` 응답의 `values`에 `bdui_url`이 없다는 점과 `worker_url`의 새 필드 집합을
  적는다. `set-worker-url-common`은 그대로다.

## 4. 호환 구간

| 설치된 `worker-url` | kv 예외 | 서버 결과 |
| --- | --- | --- |
| 옛 도구 | 없음(현재 전부) | `source=common`/`unset`, `workspace_override:null`은 무시 → 정상 |
| 옛 도구 | 남은 예외 | `source=workspace` → `helper_unavailable` |
| 옛 도구 | kv 읽기 실패 | resolver 오류 → `helper_unavailable` |
| 새 도구(dotfiles-ownp2 뒤) | 무관 | `source=common`/`unset` → 정상 |

## 5. 테스트

- `server/worker-url.test.js`: stdin 없이 `resolve --root`를 부른다; `workspace_override` 없는 응답 수용; 옛 모양
  (`workspace_override:null`, `source=common`) 수용; `source=workspace` → `helper_unavailable`; 반환값에
  `workspace_override` 없음. 같은 파일의 배포 후 잡 테스트는 잡 파일을 바꾸지 않으므로 그대로다.
- `server/ws/session-defaults-handlers.test.js`: kv 값에 경고가 붙어도 `worker_url`은 resolver 결과를 싣는다; kv 읽기
  자체가 실패하면(`ok:false`) 지금처럼 `kv_read_failed`다.
- `server/session-defaults.test.js`: kv의 `bdui_url` → `unknown_key:bdui_url` 경고; `bdui_url` 쓰기 요청 거절; 다른 키
  저장 때 남은 `bdui_url` 보존.
- `server/worker/exec-enums.test.js`: 키 목록에 `bdui_url` 없음.
- `app/views/settings-dialog/` 테스트: 저장소 탭에 `Worker 주소 예외` 줄이 없다; `운영` 탭 상태 문구에 예외 라벨이 없다;
  공통 주소 편집 테스트는 그대로 통과한다.

## 6. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 저장소가 다른 계약 정본과 `worker-url` 도구 — 따로 승인·실패·재개되는 dotfiles 설치 착지 | UI-7gv4 | dotfiles-ownp2 |

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — Worker 주소 해석 규칙의 정본은 dotfiles 계약이고 beads-ui는 소비자다. 계약에서 사라질 키는
  표시를 생략한다.
- beads-ui는 Worker 주소를 dotfiles resolver가 공통 설정 하나로 정한 값으로만 읽고 보이며, 저장소별 예외를 읽거나
  보이거나 쓰지 않는다. resolver는 stdin 없이 부르고 `workspace_override` 유무와 무관하게 받는다.
  - 되돌리기 어려움: 서버 어댑터, `get-session-defaults` 응답, 저장소 기본값 키 목록, 설정 창 두 탭, 프로토콜 문서가
    dotfiles 계약·`worker-url`과 함께 움직인다.
  - 맥락 없이는 의외: dotfiles 계약이 아직 `bdui_url` kv 키를 허용하는 동안 beads-ui가 먼저 그 키를 모르는 키로 다룬다.
  - 실제 절충: 응답 모양을 영구 유지하는 대안과 dotfiles를 먼저 바꾸는 대안이 있었다. 사용자가 beads-ui 먼저를 골랐다.
  - `summary`: "Worker 주소는 dotfiles resolver가 공통 설정 하나로 정한 값만 읽고 보이며 저장소별 예외는 읽지도 보이지도 쓰지도 않는다 — 나머지 조항은 UI-3713 그대로다"
  → ADR, supersede UI-3713
- 저장소 탭 문구·주석 정리 — 문구는 되돌리기 쉽다 → ADR 아님
