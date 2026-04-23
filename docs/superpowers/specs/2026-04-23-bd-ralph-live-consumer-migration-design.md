# bd-ralph Live Consumer Migration Design

## 배경

`dotfiles`의 `dotfiles-gt4u`는 upstream 쪽 live surface canonicalization만 직접
처리했고, `beads-ui`는 별도 repo ownership 이므로 Worker UI / worker job runtime
/ process runner의 consumer surface를 이 repo에서 후속 이관해야 한다.

## 목표

- `beads-ui`의 live consumer surface에서 canonical worker command를 `bd-ralph`로
  맞춘다.
- 사용자-facing 문구, API validation, process runner target, 관련 테스트,
  frontend bundle이 동일한 contract를 가리키도록 유지한다.

## In Scope

- Worker 탭의 `Run bd-ralph-v2` 버튼/문구를 `Run bd-ralph`로 변경
- worker job enqueue path에서 `bd-ralph` command를 canonical enum으로 사용
- process runner가 `codex exec $bd-ralph <issue>`를 실행하도록 변경
- 관련 source/test/build artifact 갱신
- parent bead에 local spec/plan 링크 기록

## Out of Scope

- 과거 review ledger / verification log / historical spec/plan rename
- `pr-review` contract 변경
- cross-repo upstream 문서 일괄 수정
- persisted historical worker jobs의 기존 command 문자열 일괄 migration

## 설계

1. **UI canonicalization**
   - Worker parent/detail view와 app entrypoint의 run action label/command
     literal을 `bd-ralph`로 통일한다.
2. **Runtime canonicalization**
   - `/api/worker/jobs` route validation과 `buildWorkerExecTarget()` 분기를
     `bd-ralph` 기준으로 바꾼다.
3. **Regression coverage**
   - route/process-runner/worker/jobs/supervisor 관련 테스트 fixture의 canonical
     command를 `bd-ralph`로 업데이트한다.
4. **Bundled frontend truthfulness**
   - source 변경 후 `npm run build`로 `app/main.bundle.js`를 재생성한다.

## 검증

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`
