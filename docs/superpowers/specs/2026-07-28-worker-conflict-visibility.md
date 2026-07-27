# 워커 충돌 해소 가시화 — running 타일·pr_wait 카드 구분 표시 + 머지 버튼 충돌 라벨

- Bead: UI-dxgz · route: spec_backed
- 발단(실측, 2026-07-28): UI-2yoq PR #49이 main과 충돌(CONFLICTING) 상태에서 사용자가 [머지]를 클릭 → 설계대로 충돌 해소 세션이 디스패치됐으나, 사용자는 (a) 클릭 전에 충돌 존재를 인지하지 못했고 (b) 클릭 후 "진행중" 표시의 정체가 충돌 해소 세션임을 UI에서 알 수 없었다.

## 현재 동작 (실측)

- pr_wait 카드: merge-gate의 `base_badge`(`'충돌'`)가 배지로 표시되고 툴팁도 있다(`app/views/worker/index.js` `prWaitRow`, 431–488행). 그러나 버튼 라벨은 `lanes.js` 131행에 `머지`로 하드코딩 — 배지/툴팁은 보조 신호라 클릭 결과(머지가 아니라 해소 세션 디스패치)가 버튼 자체로는 드러나지 않는다.
- 충돌 해소 attempt: 큐 스냅샷 `attempts[*].conflict_resolution`은 서버가 이미 기록·전파한다(`queue-store.js` 338행 파싱). 그러나 `index.js` 1153–1168행 running 타일 매핑에서 이 필드가 탈락해, running 그리드 타일이 일반 실행 attempt와 구분되지 않는다.
- pr_wait 카드도 해소 세션 실행 여부를 모른다: `prWaitRow`의 `active` 파라미터는 poller activity(`checking`/`verifying`)와 `merge_progress`만 받는다. 해소 세션 실행 중 [머지]가 다시 활성 상태로 남아 재클릭하면 서버가 해소 세션을 중복 디스패치할 수 있다.

## 변경 ① — 충돌 해소 세션 구분 표시

1. `index.js` running 타일 매핑에 `conflict_resolution: a.conflict_resolution === true` 전달; `running-grid.js` `runningTile`이 참일 때 `충돌 해소` 배지를 타일에 렌더한다(기존 runner/model 라벨 옆, 기존 배지 스타일 재사용).
2. `index.js`에서 running 목록으로부터 `충돌 해소 attempt가 실행 중인 bead_id 집합`을 만들어 `prWaitRow`에 전달한다. 해당 bead의 pr_wait 카드는:
   - live 배지 `충돌 해소 중` 표시(기존 `live_badge` 경로 재사용 — 서버 활동이라 breathing dot 렌더),
   - `merge_enabled: false` + `merge_title: '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요'`,
   - `discard_enabled: false`(실행 중 세션이 있는 bead 폐기 방지, 기존 merge_step 중 폐기 금지와 동일한 논리).

## 변경 ② — 머지 버튼 라벨 동적화

3. `lanes.js` `MiniItem`에 선택 필드 `merge_label`(기본 `'머지'`) 추가, 버튼 텍스트를 `item.merge_label || '머지'`로 렌더.
4. `prWaitRow`: `conflicting && !merge_step && !cleanup_retry`일 때 `merge_label: '충돌 해소'`. 그 외(정상 게이트, cleanup-retry, 머지 진행 중)는 기존 `머지` 유지. 기존 툴팁 문구는 유지.

## 비목표

- 서버 측 중복 디스패치 방어(pr-actions/scheduler)는 범위 외 — UI 비활성화로 실질 방지하되, 서버 가드 필요성이 관측되면 별도 제기.
- merge-gate 어휘·계약 표면 변경 없음(표시 전용, workflow 계약 소비자 위치 유지).
- 해소 세션 완료 후 흐름(poller 재관측 → 배지 `base 뒤처짐`/`최신` 갱신, 버튼 `머지` 복귀)은 기존 경로 그대로.

## 수용 기준

1. `conflict_resolution: true` attempt 실행 중: running 타일에 `충돌 해소` 배지, 같은 bead의 pr_wait 카드에 `충돌 해소 중` live 배지가 보이고 [머지]/[폐기]가 비활성이다.
2. 게이트 `충돌` 상태의 pr_wait 카드 액션 버튼이 `충돌 해소`로 읽힌다; 비충돌 카드는 `머지` 그대로.
3. 위 두 상태 전이(해소 세션 시작/종료, 충돌↔비충돌)에 대한 단위 테스트가 추가된다.
4. `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` · `npm run build` green, 갱신된 `app/main.bundle.js`(.map 포함) 커밋.
