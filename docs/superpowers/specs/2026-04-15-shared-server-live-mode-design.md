# Shared Beads UI 서버 운영 단순화 — 로컬 repo 직접 실행 + live frontend mode

## 문제 정의

현재 `beads-ui` 공유 서버 운영에는 다음 문제가 있다.

1. **로컬 수정 반영 경로가 무겁다**
   - 공유 서버가 로컬 checkout이 아니라 전역 npm 설치본을 읽는다.
   - 따라서 로컬 `beads-ui` 레포를 수정해도 바로 반영되지 않고,
     `npm pack` → `npm install -g` → shared server restart 흐름이 필요하다.

2. **프론트엔드 변경이 refresh만으로 반영되지 않는다**
   - 현재 서버는 `app/main.bundle.js`가 존재하면 그 정적 번들을 우선 서빙한다.
   - 이 때문에 `app/**` 소스를 수정해도 bundle을 다시 만들지 않으면 브라우저에
     변경이 반영되지 않는다.

3. **운영 스크립트 책임이 섞여 있다**
   - `bdui-server`는 shared server bootstrap, global install 탐색, 실행 경로 결정,
     기본 workspace 선택을 함께 맡고 있다.
   - `bdui-deploy`는 전역 재설치 흐름을 고정해 개발 편의와 충돌한다.
   - `bdui-dolt-sync`는 UI 실행과 무관한 workspace background sync 기능인데,
     운영 핵심 경로처럼 같이 유지되고 있다.

4. **restart 명령의 표준 경로가 불명확하다**
   - 실제 shared server는 `launchd`가 관리하지만,
     사용자는 `bdui restart`와 `launchctl kickstart` 중 무엇이 canonical인지 혼동할 수 있다.

## 목표

- shared server URL을 유지한다.
  - 기준 URL: `http://100.122.98.8:3000/#/board`
- macOS 로그인/재부팅 후 shared server가 자동 복구된다.
- 로컬 `beads-ui` 레포 수정 후 **전역 재설치 없이** 반영 가능해야 한다.
- `app/**` 수정은 **브라우저 새로고침만으로** 반영된다.
- shared server restart의 표준 인터페이스를 하나로 정한다.
- UI 실행과 무관한 운영 스크립트는 제거한다.

## 비목표

- full hot reload(HMR) 구현
- `server/**` 변경까지 refresh만으로 반영
- background `bd dolt pull` 자동화 유지
- 여러 설치 소스를 동적으로 탐색하는 범용 launcher 유지

## 결정 요약

### 선택한 방향

**launchd 기반 shared server는 유지하고, 실행 소스는 전역 npm 설치본이 아니라 로컬 `beads-ui` repo checkout으로 바꾼다.**

또한 프론트엔드는 파일 존재 여부 기반 fallback이 아니라,
**명시적인 `live frontend mode`** 를 도입하여 refresh 반영을 보장한다.

### 운영 규칙

- `app/**` 변경 → 브라우저 refresh
- `server/**`, `bin/**` 변경 → shared server restart
- shared server restart 표준 명령 → `bdui-shared restart`
- `bdui restart`는 shared service의 canonical restart 명령으로 사용하지 않는다.

## 설계

## 변경 범위

이번 설계는 단일 레포 변경이 아니라 **`beads-ui` repo + `dotfiles` repo 연동 변경** 을 전제로 한다.

### `beads-ui` repo

- `server/app.js` 또는 관련 config 계층
  - `BDUI_FRONTEND_MODE=live` 지원
- 필요 시 관련 문서/README

### `dotfiles` repo

- `shell/bin/bdui-server`
  - repo 직접 실행 wrapper로 단순화
- `shell/bin/bdui-shared`
  - shared service 관리 명령 추가
- `shell/bin/bdui-deploy`
  - 제거 대상
- `shell/bin/bdui-dolt-sync`
  - 제거 대상
- `shell/launchd/com.beads-ui.server.plist`
  - launchd 연결 유지, 새 wrapper/운영 정책 반영

문서 안의 `shell/bin/...`, `shell/launchd/...` 경로는 모두 `dotfiles` repo 기준 경로를 의미한다.

## 1. shared service topology

### 유지 대상

#### `shell/launchd/com.beads-ui.server.plist`

이 파일은 유지한다.

역할:
- 로그인/재부팅 시 자동 시작
- 프로세스 종료 시 재실행
- shared URL 유지

변경점:
- launchd가 호출하는 wrapper는 유지하되,
  wrapper가 더 이상 global install을 탐색하지 않고
  **고정된 로컬 repo checkout** 을 실행한다.

### 단순화 대상

#### `shell/bin/bdui-server`

이 스크립트는 “설치 위치 탐색기”가 아니라
**shared service bootstrap wrapper** 로 축소한다.

남길 책임:
- `HOME` / `PATH` 정리
- `node` 실행 경로 확보
- 기본 workspace 결정
- repo 경로 해석 후 서버 실행
- shared 운영용 env 주입

제거할 책임:
- global npm root에서 `beads-ui` 찾기
- nvm global module 위치 순회
- global install이 없을 때 설치 안내
- 전역 배포/재설치 전제 로직

repo 경로는 절대 경로를 코드에 박아두지 않고,
다음 우선순위로 해석한다.

1. `BDUI_REPO_DIR` 환경변수
2. 기본값: `$HOME/Documents/GitHub/beads-ui`

실행 대상은 예를 들어 다음 형태가 된다.

```bash
REPO_DIR="${BDUI_REPO_DIR:-$HOME/Documents/GitHub/beads-ui}"
exec "$NODE_BIN" "$REPO_DIR/server/index.js" \
  --host 0.0.0.0 \
  --port 3000
```

wrapper는 여기에 추가로 다음 env를 주입한다.

```bash
export BDUI_FRONTEND_MODE=live
```

## 2. frontend serving mode

### 현재 문제

현재 `server/app.js`는 다음 규칙을 사용한다.

- `app/main.bundle.js`가 있으면 정적 파일을 우선 서빙
- 파일이 없을 때만 on-demand esbuild bundle 생성

이 구조는 “개발 중 우연히 bundle 파일이 없을 때만 live-like 동작” 하므로,
공유 서버 운영 정책으로 쓰기에는 불명확하다.

### 변경안

명시적인 frontend mode를 추가한다.

예시 env:

```bash
BDUI_FRONTEND_MODE=live
```

#### `live` 모드 동작

- `app/main.bundle.js` 존재 여부와 무관하게
- `/main.bundle.js` 요청 시마다 `app/main.js`에서 즉석 bundle 생성
- 응답은 `Cache-Control: no-store` 를 유지
- 브라우저 refresh 시 항상 최신 `app/**` 소스 반영

#### 기본(static) 모드 동작

- 기존처럼 `app/main.bundle.js` 정적 서빙 가능
- 패키징/배포/릴리스 흐름은 기존 구조를 유지할 수 있음

### 의도

프론트엔드 반영 정책을 “bundle 파일이 있냐 없냐”가 아니라
**명시적인 설정값** 으로 제어한다.

## 3. shared management command

### 새 스크립트: `bdui-shared`

shared server restart 경로를 문서 속 raw `launchctl` 명령이 아니라,
기억하기 쉬운 표준 인터페이스로 감싼다.

최소 서브커맨드:

```bash
bdui-shared restart
bdui-shared status
bdui-shared logs
```

#### `restart`

내부적으로 아래를 실행한다.

```bash
launchctl kickstart -k "gui/$(id -u)/com.beads-ui.server"
```

#### `status`

아래 둘 중 최소 하나를 수행한다.
- launchd service 상태 확인
- `http://127.0.0.1:3000/healthz` health check

#### `logs`

launchd가 사용하는 stdout/stderr 로그를 tail한다.

### 정책

이후 shared server의 canonical restart 명령은
다음 하나로 통일한다.

```bash
bdui-shared restart
```

## 4. 제거 대상 스크립트

### `shell/bin/bdui-deploy`

삭제한다.

이 스크립트의 존재 이유는 전역 패키지를 다시 설치하고 shared server를
재시작하는 것이지만, 새 구조에서는 shared server가 local repo를 직접 읽으므로
필요 없다.

### `shell/bin/bdui-dolt-sync`

삭제한다.

이 스크립트는 등록된 workspace들에 대해 background `bd dolt pull` 을 수행하는
유틸일 뿐, UI 실행/반영 경로와 직접 관련이 없다.

이번 설계에서는 background sync를 비목표로 두므로 유지하지 않는다.

## 반영 흐름

### 프론트엔드 변경

대상:
- `app/**`

흐름:
1. 파일 수정
2. 브라우저 refresh
3. 서버가 live bundle 생성
4. 최신 UI 반영

### 서버/CLI 변경

대상:
- `server/**`
- `bin/**`

흐름:
1. 파일 수정
2. `bdui-shared restart`
3. 최신 서버 코드 반영

## 운영 지침에 반영할 정책

문서/지침에는 아래 내용을 짧게 명시한다.

- shared `beads-ui` server는 `launchd`가 관리한다.
- shared server restart 표준 명령은 `bdui-shared restart` 이다.
- live frontend mode에서는 프론트 변경이 browser refresh로 반영된다.
- `server/**` 와 `bin/**` 변경은 restart가 필요하다.
- `bdui restart`는 shared-service canonical restart 명령으로 사용하지 않는다.

## 리스크와 완화책

### 리스크 1. working tree가 곧 shared service 코드가 된다

로컬 repo가 shared URL의 실제 소스가 되므로,
검증되지 않은 변경도 shared server에 바로 노출될 수 있다.

완화:
- 큰 실험은 별도 branch/worktree에서 진행
- shared service는 안정적인 checkout에서만 실행하는 운영 습관 유지

### 리스크 2. live bundle 생성 비용으로 refresh가 느려질 수 있다

esbuild가 매 요청마다 실행되므로 정적 bundle보다 refresh 비용이 커질 수 있다.

완화:
- 먼저 live mode로 단순하게 시작
- 체감 성능이 부족할 때만 후속으로 incremental cache 또는 watch build를 검토

### 리스크 3. 서버 변경은 여전히 restart가 필요하다

이것은 의도된 trade-off다.
본 설계의 목표는 full hot reload가 아니라
**프론트 변경의 refresh 반영 보장** 이다.

## 성공 기준

### 운영 성공 기준

- macOS 재로그인/재부팅 후 shared server가 자동 기동된다.
- `http://100.122.98.8:3000/#/board` 로 접근 가능하다.

### 개발 성공 기준

- `app/**` 수정 후 refresh만으로 반영된다.
- `server/**` 수정 후 `bdui-shared restart` 로 반영된다.
- `npm install -g .` 재설치가 필요하지 않다.

### 정리 성공 기준

- `bdui-deploy` 제거
- `bdui-dolt-sync` 제거
- `bdui-server` 역할 단순화
- shared restart 경로가 `bdui-shared restart` 로 통일

## 전환 계획

1. `bdui-server` 를 repo 직접 실행 wrapper로 단순화한다.
2. `server/app.js` 또는 config 계층에 `BDUI_FRONTEND_MODE=live` 지원을 추가한다.
3. `bdui-shared` 스크립트를 추가한다.
4. `launchd` plist는 유지하되 새 wrapper/운영 규칙에 연결한다.
5. 검증을 수행한다.
   - `app/**` 수정 후 refresh 반영
   - `server/**` 수정 후 restart 반영
   - 재로그인/재부팅 후 자동 기동
6. 전환 검증이 끝나면 다음을 제거한다.
   - `bdui-deploy`
   - `bdui-dolt-sync`
7. 문서/지침을 새 운영 규칙으로 정리한다.

## 검증 항목

구현 단계에서 최소 다음을 확인해야 한다.

- live mode에서 `app/main.bundle.js` 존재 여부와 무관하게 on-demand bundle이 우선되는가
- live mode 응답에 `Cache-Control: no-store` 가 유지되는가
- `bdui-shared restart` 가 launchd shared service를 실제로 재시작하는가
- repo 경로가 잘못되었을 때 wrapper가 명확한 에러를 내는가
- 재부팅/재로그인 후 shared URL이 복구되는가

## 구현 범위 메모

이번 spec는 **운영 구조와 책임 재정의** 를 다룬다.
구현 단계에서는 아래를 각각 별도 작업 단위로 나눌 수 있다.

1. live frontend mode 도입
2. `bdui-server` 단순화
3. `bdui-shared` 추가
4. launchd/plist 정리
5. obsolete 스크립트 삭제 및 문서 업데이트
