# 상세 뷰 Metadata 경로 표시

Parent bead: UI-tuxb

## 목적

Issue detail 화면에서 `spec_id`, `metadata.plan`, `metadata.handoff` 값을 읽기
전용으로 노출하여, 사용자가 해당 이슈에 연결된 산출물 문서 경로를 UI에서 바로
확인할 수 있게 한다.

## 범위

프론트엔드 상세 뷰만 수정한다.

- 상세 뷰 사이드바에 `Metadata` 섹션 추가
- `Spec`, `Plan`, `Handoff` 경로 표시
- 긴 경로의 가독성/overflow 처리
- 관련 렌더링 테스트 추가

다음은 범위에서 제외한다.

- 리스트/보드/에픽 표에 metadata 경로 표시
- metadata 편집 기능
- 서버/프로토콜 구조 변경
- label(`has:spec`, `has:plan` 등) 정책 변경

## 현재 상태

- 상세 뷰는 `Type`, `Status`, `Close Reason`, `Priority`, `Assignee`, `Labels`,
  `Dependencies`, `Dependents`를 표시한다.
- 상세 뷰는 `design`, `notes`, `acceptance`, `comments`를 본문에 표시하지만,
  metadata 경로는 렌더링하지 않는다.
- 서버의 `issue-detail` 구독은 `bd show <id> --json` 결과를 사용하므로,
  `bd show`에 포함되는 `spec_id` 및 `metadata` 값을 프론트에서 사용할 수 있다.
- 카드/행에서는 `has:`/`reviewed:` prefix label만 badge로 노출되고, 실제 경로
  문자열은 노출되지 않는다.

## 디자인

### 표시 위치

상세 뷰 우측 사이드바에서 `Labels` 아래, `Dependencies` 위에 `Metadata` 섹션을
추가한다.

이 위치를 선택하는 이유:

- metadata 경로는 이슈 본문 내용보다 속성 정보에 가깝다.
- 리스트/보드보다 상세 뷰에서만 보는 것이 노이즈가 적다.
- 기존 사이드바 구조(`Properties` → `Labels` → 관계 정보)와 자연스럽게 맞는다.

### 표시 대상과 매핑

| UI label  | 데이터 소스              |
| --------- | ------------------------ |
| `Spec`    | `issue.spec_id`          |
| `Plan`    | `issue.metadata.plan`    |
| `Handoff` | `issue.metadata.handoff` |

데이터는 모두 읽기 전용으로 표시한다.

### 표시 규칙

- 값이 있는 항목만 행으로 렌더링한다.
- 세 값이 모두 비어 있으면 `Metadata` 섹션 전체를 렌더링하지 않는다.
- 빈 문자열, `null`, `undefined`, 공백 문자열은 값 없음으로 취급한다.
- 경로 문자열은 원본 값을 그대로 표시한다.
- 경로가 길면 한 줄 truncate 처리하고, `title` 속성으로 전체 경로를 노출한다.

예시:

```text
Metadata
- Spec: docs/superpowers/specs/2026-04-06-detail-metadata-paths-design.md
- Plan: docs/superpowers/plans/2026-04-06-detail-metadata-paths.md
- Handoff: docs/handoffs/2026-04-06_12-00-00_detail-metadata.md
```

### 렌더링 구조

`detail.js` 내부에서 metadata 값을 정규화한 뒤, reusable한 작은 렌더링 블록으로
사이드바에 삽입한다.

권장 정규화 규칙:

- `spec_value = normalizePath(issue.spec_id)`
- `plan_value = normalizePath(issue.metadata?.plan)`
- `handoff_value = normalizePath(issue.metadata?.handoff)`

여기서 `normalizePath(value)`는 문자열 여부와 trim 결과를 확인하여 표시할 값
또는 `''`를 반환하는 작은 helper다.

### 스타일

새 섹션은 기존 `props-card` 계열 톤을 유지한다.

- 섹션 제목: `Metadata`
- 각 행: 왼쪽에 key(`Spec`, `Plan`, `Handoff`), 오른쪽에 path value
- 값 영역은 monospace가 아니어도 되지만, 긴 경로 식별성을 위해 monospace 적용은
  허용된다.
- 모바일/좁은 폭에서도 레이아웃이 깨지지 않도록 값 영역은 `min-width: 0` 기반
  truncate 처리

## 수정 대상 파일

### 수정 파일

| 파일                                                           | 변경                                                                                                            |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `app/views/detail.js`                                          | `IssueDetail` typedef에 `spec_id`, `metadata` shape 반영. metadata 정규화 helper 및 `Metadata` 섹션 렌더링 추가 |
| `app/styles.css`                                               | metadata 섹션용 row/value truncate 스타일 추가                                                                  |
| `app/views/detail.test.js` 또는 별도 detail metadata test 파일 | metadata 경로 표시/숨김 동작 테스트 추가                                                                        |

### 서버/프로토콜

변경 없음.

현재 `issue-detail` 구독은 이미 `bd show <id> --json` 결과를 사용하므로, 필요한
데이터가 존재할 경우 프론트에서 바로 읽어 사용할 수 있다.

## 엣지 케이스

- `issue.metadata` 자체가 없음 → `Plan`, `Handoff` 미표시
- `spec_id`만 있고 `metadata` 없음 → `Spec`만 표시
- `metadata.plan`만 있고 나머지 없음 → `Plan`만 표시
- 값이 공백 문자열(`"   "`) → 미표시
- 예상 외 타입(숫자, 객체) → 문자열로 강제 표시하지 않고 미표시

## 테스트

다음 케이스를 검증한다.

1. `spec_id`, `metadata.plan`, `metadata.handoff`가 모두 있을 때 3개 행이
   표시된다.
2. 일부 값만 있을 때 해당 행만 표시된다.
3. 세 값이 모두 없을 때 `Metadata` 섹션 전체가 숨겨진다.
4. 긴 경로가 value element의 `title`에 전체 문자열로 들어간다.
5. `metadata`가 없는 snapshot payload에서도 렌더링이 깨지지 않는다.

## 구현 메모

- 초기 구현은 텍스트 표시만 다룬다. 클릭 가능한 링크 변환은 후속 작업으로
  분리한다.
- label 기반 요약(`has:spec`, `has:plan`)은 기존처럼 카드/행에서 유지하고,
  상세에서는 실제 경로를 보완적으로 제공한다.
- 이 변경은 서버 응답 shape를 바꾸지 않으므로, 회귀 리스크는 상세 뷰 렌더링
  범위로 제한된다.
