# 상세 뷰 Metadata 경로 클릭 확장

## 목적

상세 뷰 sidebar의 `Metadata` 경로가 현재 한 줄 ellipsis로만 보여 가독성이 낮으므로, 기본은 축약 상태를 유지하되 사용자가 클릭하면 같은 카드 안에서 전체 경로를 여러 줄로 펼쳐 읽을 수 있게 한다.

## 범위

프론트엔드 상세 뷰의 `Metadata` 경로 표시만 수정한다.

- 기본 collapsed 표시 유지
- 클릭 시 inline wrap 방식으로 expanded 표시
- 재클릭 시 다시 collapsed
- 접근성 속성(`aria-expanded`) 추가
- 관련 렌더링 테스트 추가

다음은 범위에서 제외한다.

- 서버/프로토콜 변경
- copy 버튼 추가
- popover/modal UI 추가
- 리스트/보드/에픽 뷰 변경

## 현재 상태

- `Metadata` 경로는 `.metadata-path__value`로 렌더링된다.
- CSS는 `white-space: nowrap`, `text-overflow: ellipsis`, `overflow: hidden`을 사용한다.
- 전체 경로는 `title` tooltip으로만 확인 가능하다.
- 클릭 상호작용이나 expanded state는 없다.

## 디자인

### 상호작용

- 각 metadata row는 기본적으로 collapsed 상태다.
- 사용자가 해당 경로를 클릭하면 그 row만 expanded 상태가 된다.
- expanded 상태에서 다시 클릭하면 collapsed로 돌아간다.
- 다른 row의 상태는 유지된다.
- issue가 바뀌면 expanded state는 초기화한다.

### 렌더링 구조

`detail.js`에서 metadata row key(`Spec`, `Plan`, `Handoff`)를 기준으로 expanded state를 관리한다.

각 value element는 클릭 가능한 컨트롤로 렌더링한다.

- collapsed: 기존 ellipsis 스타일 유지
- expanded: 여러 줄 wrap으로 전체 경로 표시
- `aria-expanded="true|false"` 반영

### 스타일

collapsed 상태:
- `white-space: nowrap`
- `overflow: hidden`
- `text-overflow: ellipsis`

expanded 상태:
- `white-space: normal`
- `overflow: visible`
- `text-overflow: clip`
- `overflow-wrap: anywhere`

기존 monospace 계열 폰트는 유지한다.

## 수정 대상 파일

| 파일 | 변경 |
|------|------|
| `app/views/detail.js` | metadata expanded state 추가, 클릭 토글 렌더링 반영 |
| `app/styles.css` | collapsed / expanded 상태 스타일 분리 |
| `app/views/detail.test.js` | 클릭 확장/재접힘/독립 상태 테스트 추가 |

## 테스트

다음 케이스를 검증한다.

1. 기본 렌더링은 collapsed 상태다.
2. 경로를 클릭하면 해당 row만 expanded 상태가 된다.
3. expanded 상태에서 다시 클릭하면 collapsed로 돌아간다.
4. 한 row를 펼쳐도 다른 row는 collapsed 상태를 유지한다.
5. issue가 새로 로드되면 expanded state가 초기화된다.

## 구현 메모

- expanded state는 detail view 내부 local state로 관리한다.
- key는 label(`Spec`/`Plan`/`Handoff`) 기반으로 충분하다.
- tooltip(`title`)은 유지해도 무방하다.
