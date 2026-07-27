# 워커 충돌 해소 가시화 — running 타일·pr_wait 카드 구분 표시 + 머지 버튼 충돌 라벨

- Bead: UI-dxgz · route: spec_backed
- 발단(실측, 2026-07-28): UI-2yoq PR #49이 main과 충돌(CONFLICTING) 상태에서 사용자가 [머지]를 클릭 → 설계대로 충돌 해소 세션이 디스패치됐으나, 사용자는 (a) 클릭 전에 충돌 존재를 인지하지 못했고 (b) 클릭 후 "진행중" 표시의 정체가 충돌 해소 세션임을 UI에서 알 수 없었다.

## 현재 동작 (실측)

- pr_wait 카드: merge-gate의 `base_badge`(`'충돌'`)가 배지로 표시되고 툴팁도 있다(`app/views/worker/index.js` `prWaitRow`, 431–488행). 그러나 버튼 라벨은 `lanes.js` 131행에 `머지`로 하드코딩 — 배지/툴팁은 보조 신호라 클릭 결과(머지가 아니라 해소 세션 디스패치)가 버튼 자체로는 드러나지 않는다.
- 충돌 해소 attempt: 큐 스냅샷 `attempts[*].conflict_resolution`은 서버가 이미 기록·전파한다(`queue-store.js` 338행 파싱). 그러나 `index.js` 1153–1168행 running 타일 매핑에서 이 필드가 탈락해, running 그리드 타일이 일반 실행 attempt와 구분되지 않는다.
- pr_wait 카드도 해소 세션 실행 여부를 모른다: `prWaitRow`의 `active` 파라미터는 poller activity(`checking`/`verifying`)와 `merge_progress`만 받는다. 해소 세션 실행 중에도 [머지]가 활성 상태로 남는다 — 실제 중복 디스패치는 서버의 `claimed`/`status === 'running'` 가드가 이미 거부하므로(scheduler), 여기서의 비활성화는 방어가 아니라 상태 전달(왜 지금 머지가 무의미한지)이 목적이다.

## 변경 ① — 충돌 해소 세션 구분 표시

1. `index.js` running 타일 매핑에 `conflict_resolution: a.conflict_resolution === true` 전달; `running-grid.js` `runningTile`이 참일 때 배지를 타일에 렌더한다(기존 runner/model 라벨 옆, 기존 배지 스타일 재사용). 라벨은 attempt 상태로 구분: `status === 'running'` → `충돌 해소`, leaf-paused → `충돌 해소 일시정지`.
2. `index.js`에서 충돌 해소 attempt를 가진 bead_id를 두 집합으로 나눠 `prWaitRow`에 전달한다 — running 타일 목록은 leaf-paused attempt도 포함하므로 구분이 필요하다:
   - **live 집합**(`status === 'running'`): live 배지 `충돌 해소 중`(기존 `live_badge` 경로 재사용 — breathing dot 렌더).
   - **비활성 집합**(running ∪ leaf-paused): `merge_enabled: false` + `merge_title: '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요'`(paused면 `'충돌 해소 세션 일시정지 — 재개 후 완료되면 머지하세요'`), `discard_enabled: false` + **`discard_title: '충돌 해소 세션 있음 — 폐기하려면 먼저 세션을 정리하세요'`**. leaf-paused는 live 배지 대신 일반(비-live) 배지 `충돌 해소 일시정지`로 표시한다.
3. `lanes.js` 폐기 버튼 비활성 툴팁의 하드코딩(`'머지 진행 중 — 폐기할 수 없습니다'`)을 선택 필드 `discard_title`로 대체한다: `item.discard_title || '머지 진행 중 — 폐기할 수 없습니다'`(기본값이 기존 문구라 merge_step 경로는 무변경).
4. live_badge 우선순위: 충돌 해소 배지(live/비-live 모두)가 poller activity(`checking`/`verifying`) 치환 배지보다 우선한다 — 동시 존재 시 사용자 행동 관점에서 더 중요한 상태가 충돌 해소이므로 activity 배지를 억제한다.

## 변경 ② — 머지 버튼 라벨 동적화

5. `lanes.js` `MiniItem`에 선택 필드 `merge_label`(기본 `'머지'`) 추가, 버튼 텍스트를 `item.merge_label || '머지'`로 렌더.
6. `prWaitRow`: `conflicting && !merge_step && !cleanup_retry`일 때 `merge_label: '충돌 해소'`. 그 외(정상 게이트, cleanup-retry, 머지 진행 중)는 기존 `머지` 유지. 기존 툴팁 문구는 유지.

## 비목표

- 서버 측 변경 없음 — 중복 디스패치는 scheduler의 `claimed`/`status === 'running'` 가드가 이미 거부하므로 UI 비활성화는 상태 전달 목적이다.
- merge-gate 어휘·계약 표면 변경 없음(표시 전용, workflow 계약 소비자 위치 유지).
- 해소 세션 완료 후 흐름(poller 재관측 → 배지 `base 뒤처짐`/`최신` 갱신, 버튼 `머지` 복귀)은 기존 경로 그대로.

## 수용 기준

1. `conflict_resolution: true` attempt가 `running`일 때: running 타일에 `충돌 해소` 배지, 같은 bead의 pr_wait 카드에 `충돌 해소 중` live 배지(poller activity 배지보다 우선)가 보이고 [머지]/[폐기]가 비활성이며 [폐기] 툴팁이 충돌 해소 전용 문구다.
2. 같은 attempt가 leaf-paused일 때: 타일/카드 배지가 `충돌 해소 일시정지`(비-live)로 표시되고 [머지]/[폐기]는 여전히 비활성이다.
3. 게이트 `충돌` 상태의 pr_wait 카드 액션 버튼이 `충돌 해소`로 읽힌다; 비충돌 카드는 `머지` 그대로, merge_step 경로의 폐기 툴팁도 기존 문구 그대로.
4. 위 상태 전이(해소 세션 시작/일시정지/종료, 충돌↔비충돌)에 대한 단위 테스트가 추가된다.
5. `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` · `npm run build` green, 갱신된 `app/main.bundle.js`(.map 포함) 커밋.
