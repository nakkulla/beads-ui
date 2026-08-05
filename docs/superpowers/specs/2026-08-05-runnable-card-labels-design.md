# 실행가능 레인 카드 라벨 표시

- Bead: `UI-lzfa`
- Route: `spec_backed`
- 날짜: 2026-08-05

## 1. 문제

모니터 실행가능 레인 카드가 Bead 라벨을 표시하지 않아, 워커에 큐잉하는 사람이
`worker-ineligible` 같은 라우팅 라벨을 보지 못한 채 판단한다.

dotfiles `docs/contracts/workflow.yaml` labels.routing 주석은 worker-ineligible을
metadata 키가 아닌 라벨로 정한 근거를 "the reader at landing is the human
queueing to the worker: beads-ui renders every label by default"라고 적는다. 그
전제는 보드 카드에서만 성립한다 — 라벨을 렌더하는 곳은
`app/views/board/card.js`(`visibleLabels()`) 한 곳뿐이고, 정작 큐잉 판단이
일어나는 모니터 실행가능 레인에는 라벨이 없다.

실측:

- `server/worker/runnable-cache.js` `RunnableItem` 프로젝션이
  `bead_id · title · route · spec_id · created_at · updated_at` 6필드 — labels가
  서버에서 아예 나가지 않는다.
- `app/views/monitor/lanes.js` `monitorRunnableCard()`에 라벨 렌더 코드가 없다.
- `worker-ineligible` 문자열은 `app/`·`server/` 어디에도 없다(grep 0건).
- 모니터 뷰에는 표시 정책(display policy) 배선 자체가 없다 — 기존 의미론에서
  null 정책은 "전부 표시"다(`app/utils/label-policy.js`).

실제 피해: `worker-ineligible`이 붙은 UI-u7hh가 실행가능 레인에 라벨 없이 떠서,
계약이 "대화형으로 실행하라"고 지정한 Bead를 사람이 모르고 큐잉할 수 있었다.

## 2. 목표

실행가능 레인 카드에 Bead 라벨을 표시한다 — 서버 프로젝션에 `labels`를 싣고,
카드에서 보드 카드와 같은 유틸로 렌더한다.

## 3. 비목표

- **`qualify()`의 라벨 기반 제외** — 사용자와 확정한 결정: 라벨이 오판으로 붙는
  실사례(UI-1xcd · UI-dixx · UI-u7hh)가 이미 있고, 자동 제외였다면 그 Bead들이
  모니터에서 조용히 사라져 오판이 관측되지 않았다. 사람이 보고 판단하되 근거를
  화면에 남긴다.
- worker admission(`server/worker/admission.js`)의 라벨 판정 도입.
- 대기 row·실행중 카드의 라벨 표시 — 큐잉 **판단 시점**은 실행가능 레인이다.
  대기 row는 이미 판단이 끝난 항목이고, 라벨을 보고 빼는 흐름이 필요해지면
  additive 후속이다.
- 모니터 파이프라인에 표시 정책(숨김 규칙) 배선 — null 정책 = 전부 표시가 기존
  의미론이고, 라우팅 라벨은 숨겨질 이유가 없다. 숨김이 필요해지면 별도 유닛.
- 계약 표면 변경 — 이 저장소는 소비자다(AGENTS.md).

## 4. 설계

### 4.1 서버 — `RunnableItem` 프로젝션에 `labels` 추가

`server/worker/runnable-cache.js`:

- `RunnableItem` typedef에 `labels: string[]` 추가.
- `qualify()`가 `bd list --json` 행의 `labels`를 문자열만 걸러 싣는다(비배열·비문자
  요소는 빈 배열/제외 — `stampOf`와 같은 관용 원칙). **판정 조건은 4개 그대로** —
  labels는 투영에만 실린다.
- wire 비용: 라벨은 짧은 문자열 소수이고 실행가능 후보는 워크스페이스당 소수다.
  전체 백로그를 싣지 않는다는 프로젝션 원칙은 유지된다.

### 4.2 클라이언트 — `monitorRunnableCard()` 라벨 칩

`app/views/monitor/lanes.js` `monitorRunnableCard()`:

- 메타 줄에 라벨 칩을 렌더한다. `visibleLabels(item.labels, null)` 사용 — 보드
  카드(`app/views/board/card.js`)와 같은 유틸, 모니터에는 정책 배선이 없으므로
  null(전부 표시).
- 칩 스타일은 보드 카드의 라벨 칩 클래스를 재사용한다(신규 시각 언어를 만들지
  않는다). 위치는 route 칩 다음.
- `MonitorItem`에 `labels`가 흐르도록 실행가능 항목 조립부(모니터 스냅샷 투영)에
  필드를 통과시킨다.

## 5. Test scope

1. **`server/worker/runnable-cache.test.js` — 프로젝션에 labels**: labels를 실은
   행이 qualify를 통과할 때 `RunnableItem.labels`로 나온다. RED 근거: 현행
   프로젝션은 labels를 버린다(반환 객체에 키 자체가 없다).
2. **`app/views/monitor/lanes.test.js` — 카드 라벨 칩 렌더**: `labels:
   ['worker-ineligible']`인 실행가능 항목의 카드 템플릿에 그 라벨 텍스트가
   나타난다. RED 근거: `monitorRunnableCard()`에 라벨 렌더 경로가 없다.

## 6. 검증과 머지 후

- Pre-handoff: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(번들 갱신 커밋 포함).
- 머지 후: 이 저장소의 배포 커버리지(`docs/agents/repo-ops.toml` `[deploy]` 선언
  — dotfiles-1tif가 생성 — 실행 표면은 `~/.config/bdui/config.toml`의
  `[worker.deploy]`)가 재시작을 커버한다. 처분 불요. 재시작 후 실행가능 레인에
  라벨 칩이 실제 렌더되는지 육안 확인(프로세스 경로·포트·HTTP 실측 포함,
  AGENTS.md Post-Merge Runtime Validation).

## 7. 잔여 위험

- 라벨이 많은 Bead는 메타 줄이 길어진다 — 실행가능 후보의 라벨은 현재 라우팅
  라벨 소수이고, 넘치면 줄바꿈되는 기존 메타 줄 문법을 따른다. 시각 압축(개수
  제한·툴팁)은 필요해지면 additive.
