---
scope:
  - server/worker/session-observation
  - server/worker/session-ref
  - server/worker/session-monitor
  - server/worker/runner/claude
  - server/worker/runner/codex
  - server/worker/codex-children
  - server/worker/usage-store
  - server/worker/usage-replay
  - server/worker/usage-pricing
  - server/worker/runner-catalog
  - server/worker/runnable-cache
  - server/worker/queue-store
  - server/worker/compare-projection
  - server/ws/worker-handlers
  - server/ws/monitor-handlers
  - server/worker/__fixtures__
  - app/utils/token-usage
  - app/utils/session-ref
  - app/views/worker/
  - app/views/monitor/
  - app/views/detail-panel/session-history
  - app/protocol.js
  - app/protocol.md
  - app/styles.css
  - docs/adr/
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 워커·직접 세션 카드의 위임 현황·토큰·환산 비용 통일

Bead: UI-42l2. 작성: 2026-09-11. 상태: 사용자 검토용 설계 초안.
기준: main 및 공유 배포 HEAD `0a0522edd25eedeb257821234f6afd1c190bb73d`.
이 문서는 구현·게시·배포 승인을 기록하지 않는다.

## 1. 사용자 요구와 확인한 누락

사용자는 워커가 실행한 Codex 카드와 직접 연 Codex 대화의 ‘세션 진행중’ 카드 **둘 다** 현재 위임 대상, 완료 개수, 토큰 사용량과 설정 단가로 계산한 가격을 원한다. Claude와 비교해 누락을 보완한다.

| 표면 | 확인한 현재 동작 | 수정 결과 |
| --- | --- | --- |
| 워커 위임 | `lane-model.js:729`는 `legs`만 전달한다. Codex `codex_children`는 상세 화면에만 간다. | 두 종류의 관측을 기존 카드 진행 줄에서 표시한다. |
| 직접 세션 | `lane-model.js:3632`가 `usage:null`, `legs:[]`를 넣고 `running-grid.js:813`은 모든 session 위임을 숨긴다. Claude도 같은 결핍이다. | 연결된 현재 로컬 대화의 관측값을 카드까지 전달한다. |
| Codex 본체 사용량 | `runner/codex.js:143`은 `turn.completed`만 수용한다. | 종료 전 rollout의 실제 사용량으로도 갱신한다. |
| 비용 | `usage-pricing.js`가 Codex 전체 입력과 그 부분집합인 캐시읽기를 각각 곱한다. | 비캐시 입력과 캐시 입력을 분리해 한 번씩 계산한다. |
| 단가 | 설정 스키마는 있으나 현재 공유 서버가 읽는 `config.toml`에는 모델 `price` 항목이 없다. | 설정된 값 및 검증된 초기값만 사용하며, 없는 단가를 무료로 표시하지 않는다. |

수정 전 확인한 재현:

- 같은 `runningTile` 실렌더에 external live/done 두 행을 넣으면 ‘위임 중’과 ‘위임 완료 1’, native child 두 행을 넣으면 위임 칩 0개다.
- 저장소 Codex fixture의 root 누적값 18,941 / 37,929 / 57,181은 `liftUsage`에서 모두 null이다.
- Codex 입력 100·캐시읽기 60·출력 10, 백만 토큰당 단가 10·1·20이면 현재 $0.00126이다. 비중복 금액은 $0.00066이다.
- 저장소에는 별도 설정 화면 초안이 미추적 상태로 있다. 이 작업은 그 문서를 수정하지 않는다.

## 2. 접근과 표시 범위

부모·자식 중복 집계와 카드 간 차이를 막기 위해, **관측과 계산을 공유하고 두 카드에 같은 표시 자료를 공급**한다. 카드마다 전사를 읽는 방법은 파일 읽기와 계산이 중복되고, 직접 세션을 가짜 Worker attempt로 등록하는 방법은 실행 수명과 권한의 의미를 바꾼다.

한 저장소의 관측→계산→카드 표시를 한 설계·한 구현 패킷으로 검증한다. 서버나 카드만 따로 완료로 인도하지 않는다.

| 카드 | 본체 사용량의 기간 | 위임 목록의 기간 |
| --- | --- | --- |
| Worker 구현·리뷰 attempt | 해당 attempt에서 실행한 turn. 기존 bead 누적 사용량을 표시하는 위치는 그 집계 규칙을 유지한다. | 해당 attempt에서 관측한 자식 활동 |
| 직접 세션 | 마지막 유효 `session_ref`가 가리키는 **현재 대화 전체** | 그 현재 대화에 연결된 위임. 과거 `session_ref`를 합치지 않는다. |

직접 세션의 사용량은 그 대화가 여러 Bead를 다뤘더라도 대화 전체 값이다. 카드에 ‘현재 대화 기준’을 설명하고 워크스페이스 비용 KPI에는 중복 가산하지 않는다. Worker와 직접 세션이 같은 Bead를 가리킬 때의 기존 대표 카드 선택도 유지한다.

## 3. 카드에서 보이는 것

공유 카드 문법의 슬롯 3(진행)과 슬롯 5(실행 사실·사용량)를 사용한다. 구현 시 카드 문법 §5.1에 아래 항목을 함께 명시한다. 새 운영 버튼은 추가하지 않는다.

- 슬롯 3: 실행 중인 위임마다 `위임 중 · <작업명> · <provider/model>`을 표시한다. 관측된 작업명·모델만 사용하며 없는 값은 생략한다.
- 성공 종료는 `위임 완료 N`, 실패는 `위임 실패 N`, 중단은 `위임 중단 N`으로 구분한다. 0개인 그룹은 생략한다. 기존의 ‘live가 아니면 모두 완료’ 판정도 같은 렌더러에서 수정한다.
- 동일 자식에 대한 wait·message·후속 turn은 새 위임으로 세지 않는다. 재사용된 자식이 다시 실행되면 진행 중 그룹으로 이동하고 이전 완료 그룹에서 뺀다.
- 슬롯 5: 본체 토큰과 USD 환산 비용을 함께 표시한다. 외부 위임이 합산되는 기존 provider별 배지는 유지하며, native child가 있는 경우 본체와 자식의 금액 범위를 명시한다.
- Codex native child의 개별 토큰·금액은 해당 위임 표시와 연결된 상세 내용에서 확인할 수 있게 한다. 실행 중 행에는 관측된 토큰·가격을 함께 표시하고, 종료 그룹은 펼치면 각 자식의 작업명·모델·종료 상태·토큰·금액을 보여 준다. 마우스와 터치·키보드 모두 접근 가능하게 한다.
- 직접 세션·자동 리뷰 타일도 자료가 있으면 위임과 가격을 그린다. `kind:session`만으로 숨기지 않는다. 자료가 없으면 줄을 생략한다.
- 금액에는 ‘API 단가 환산’을 설명한다. 구독 요금의 실제 추가 청구액이라고 표현하지 않는다. 토큰은 있지만 단가가 없으면 `단가 없음`을 표시한다.

결정: native child의 토큰·가격을 부모 또는 전체 KPI에 더하지 않는다 — 부모·중첩 자식 간 사용량의 중복 여부가 버전별로 입증되지 않았다. 자식별 값은 보이되 별도 합계를 만들지 않는다.

기존 상세 화면·전사 열기·재개 명령·외부 위임 연결은 유지한다. native child의 전사 버튼이 없다는 사실은 이번에 임의 경로로 해결하지 않는다.

## 4. 관측 경로와 수명

### 4.1 공통 원천과 전파

`session-observation` 모듈은 provider별 원문에서 확인된 모델, 사용량, 위임 상태만 추출하는 UI 소유 관측 경계다. 기존 Codex child parser·Claude `liftUsage`/`liftDelegation` 및 tail reader를 재사용하고, 부모와 자식 식별·중복 제거를 카드마다 복제하지 않는다.

Worker는 기존 `usage`, `usage_legs`, `codex_children`, `legs` 전파를 완성한다. 직접 세션은 `session_active[].session_observation`이라는 선택적 표시 자료를 받는다. 내용은 현재 provider/session ID, 관측 시각, 관측된 모델, 본체 사용량 및 위임 목록이다. 값 부재는 null 또는 필드 부재이며, 과거 서버 payload와 호환된다. 가격은 원시 관측에 저장하지 않고 현재 카탈로그로 계산한다.

이 자료는 `session_ref` 형식이나 workflow metadata 키를 확장하지 않는다. 원문 경로·대화 내용·비밀은 카드 payload에 싣지 않는다. 서버/클라이언트 프로토콜과 타입을 함께 갱신한다.

### 4.2 직접 세션

기존 `session_active`의 마지막 유효 참조만 대상으로 삼는다. 같은 workspace의 Bead 스냅샷에 그 provider/session ID가 연결돼 있을 때만 로컬 파일을 읽는다. 기존 파일 존재 기반 locality 판정을 유지한다. host 문자열 차이만으로 읽을 수 있는 로컬 전사를 거절하지 않는다.

관측은 카드 구독 수명에 연결하고 drawer를 열지 않아도 갱신한다. 기존 파일 snapshot+tail 경계를 재사용하되 drawer 표시 어댑터가 버리기 **전**의 raw usage·위임 이벤트를 읽는다. 같은 원천은 Worker/Monitor 탭과 여러 브라우저가 구독해도 한 번만 읽고 결과를 공유한다. 마지막 구독 종료·현재 참조 변경·대상 이탈·서버 종료 시 reader를 해제한다.

서버의 비동기 준비 경계에서 관측을 준비하고, 동기 카드/워크스페이스 투영은 준비된 값만 읽는다. 스냅샷마다 전체 전사를 다시 읽거나 추가 `bd` 프로세스를 띄우지 않는다. 변경된 파일의 완전한 줄만 증분 처리하고 기존 3초 사용량 알림 합치기를 재사용한다. 로컬 완전한 이벤트가 생기면 정상 조건에서 5초 이내에 카드에 반영한다.

시작 때 파일이 아직 없는 경우 기존 갱신에서 다시 찾는다. 원격 파일 접근·계정 추측 fallback은 하지 않는다. Worker는 기록된 계정의 sessions root를 사용하며 직접 세션은 기존 resolver가 확정한 로컬 경로만 사용한다. 연결이 확인된 자식만 읽는다.

mtime은 최근 갱신의 단서일 뿐 프로세스 생존·자식 성공의 증거가 아니다. 직접 대화의 한 turn 종료만으로 대화 전체나 모든 자식을 종료 처리하지 않는다. 파일 손상·미완성 줄·접근 불가 때는 확인된 자료만 남기고 없는 사용량을 0으로 합성하지 않는다.

### 4.3 사용량과 위임 수명

Codex의 raw `token_usage_record`와 검증된 `token_count`를 읽는다. thread·turn·response 식별자로 같은 이벤트의 중복 표현을 제거한다. 같은 turn 누적 사용량은 교체하고, 서로 다른 turn만 합산한다. 종료의 authoritative 사용량은 같은 범위를 대체하며 더하지 않는다.

Worker 재개는 attempt 경계를 적용한다. 과거 root rollout의 thread 누적값을 새 attempt 값으로 복사하지 않는다. 현재 turn의 누적값 또는 경계 전 baseline을 확인할 수 있는 차이만 사용하고, 경계를 입증할 수 없으면 부분 관측으로 명시한다. 직접 세션은 현재 thread의 검증된 전체 누적값을 사용할 수 있다.

Claude는 message ID별 누적 교체와 root/subagent 분리를 유지한다. 직접 전사의 실제 Agent 시작·결과·task notification 및 연결된 subagent 사용량을 같은 위임 상태로 읽는다. 과거 결과가 뒤늦게 와도 새 활동 상태를 덮지 않는다.

관측된 모델이 turn 사이에 바뀌면 모델별 사용량을 나눠 가격을 계산한다. 대화 전체를 마지막 모델 단가로 계산하지 않는다. 모델을 확정할 수 없는 부분은 토큰만 보존하고 미가격 부분으로 남긴다.

서버 재시작의 snapshot/replay와 live tail은 같은 누적 함수를 사용한다. Worker 종료·이력 이관은 기존 attempt 저장 경계를 사용한다. 직접 세션 때문에 새 durable attempt, usage receipt 또는 실행 승인 기록을 만들지 않는다.

## 5. 단가와 가격 계산

정본은 기존 `config.toml`의 `[runner.<provider>.models.<name>.price]`와 `runner_catalog`다. 단위는 **백만 토큰당 USD**, 필드는 `input`, `output`, `cache_read`, `cache_write`다. 모델 이름과 실제 CLI ID 모두 같은 항목으로 해결한다.

사용자 결정(2026-09-11): **공식 API 가격을 초기값으로 사용한다.** 현재 등록 단가가 없으므로 초기 설정에는 공식 API 가격표에서 **정확히 같은 모델 ID**의 단가를 확인할 수 있는 항목만 넣는다. 비슷한 모델이나 같은 모델군 가격을 대신 쓰지 않는다. 코드 내 상시 기본 단가나 자동 가격 갱신은 도입하지 않는다. 아래 공식 표를 초기값으로 사용하며, 이번 답변은 가격 기준의 확정이다. 전체 설계 승인과 실제 설정 적용 승인을 기록하지 않는다.

확인일 2026-09-11. 단위 USD/백만 토큰. OpenAI는 Standard·Short context, Anthropic은 기본 처리·5분 캐시쓰기 기준이다. 이는 설정된 **기준 단가 환산**이며 Fast·긴 문맥·1시간 캐시의 실제 청구액을 재현하는 표가 아니다. 카드 비용 설명에도 이 한계를 명시한다. 이 작업은 단가 스키마에 처리 등급별 가격 축을 추가하지 않는다.

| 정확한 모델 ID | 입력 | 캐시읽기 | 캐시쓰기 | 출력 |
| --- | --- | --- | --- | --- |
| gpt-6-astra | 10 | 1 | 12.5 | 50 |
| gpt-5.6-sol | 4 | 0.40 | 5 | 20 |
| gpt-5.6-terra | 2 | 0.20 | 2.5 | 12 |
| gpt-5.6-luna | 0.20 | 0.02 | 0.25 | 1.20 |
| claude-opus-4-8 | 5 | 0.50 | 6.25 | 25 |
| claude-opus-4-6 | 5 | 0.50 | 6.25 | 25 |

출처: [OpenAI Pricing](https://developers.openai.com/api/docs/pricing), [Anthropic Pricing](https://platform.claude.com/docs/en/about-claude/pricing). 표의 값은 확인된 exact ID에만 연결한다. `opus`·`sonnet`·`haiku`·`fable` 같은 유동 별칭을 관측된 버전 확인 없이 이 표에 매핑하지 않는다. 원문에 실제 모델 ID나 보고 비용이 있으면 그것을 사용하고, 없으면 단가 없음으로 남긴다.

기존 `priceUsage`를 공용 계산 경계로 유지하고 provider별 토큰 의미를 입력에 명시한다.

- Claude: `(input × input_rate + output × output_rate + cache_read × cache_read_rate + cache_write × cache_write_rate) / 1e6`.
- Codex: `(noncached_input × input_rate + cached_input × cache_read_rate + output × output_rate) / 1e6`. `noncached_input = input_tokens - cached_input_tokens`이며 native/external 필드 이름은 경계에서 정규화한다.
- Codex cache-write가 별도로 관측되면 원천이 보장하는 중복 없는 분해만 과금한다. cache-read와 cache-write의 관계를 확인할 수 없는 shape는 완전한 계산값으로 표시하지 않는다.
- 추론 토큰은 output의 부분집합이므로 별도 과금하지 않는다. 캐시가 입력보다 크거나 음수·비유한 값이면 해당 가격은 계산 불가다.
- provider가 보고한 유효 `total_cost_usd` 우선, 분해 없는 총량만 있으면 기존 입력 단가 기반 `추정` 표시, 유료 토큰 종류의 단가가 없으면 해당 부분은 `단가 없음`이라는 기존 정책을 유지한다.
- 한 provider 안에 가격 없는 실행이 섞이면 기존의 부분 금액+미가격 개수를 표시한다. 실제 0원과 단가 부재를 구분한다. 단가 변경은 기존처럼 표시 시 재계산한다.

이 계산 변경은 카드뿐 아니라 동일 helper를 쓰는 상세 화면·비교 화면에도 적용하고 검증한다. 별도 환율 변환이나 과거 청구액 재구성은 범위 밖이다.

## 6. 기존 결정과 문구의 변경

ADR 0047의 내부 관측 기록·부모 연결 검증·누적 교체·부모 합산 제외는 유지한다. 다음 표시 장소 한정을 개정하므로 구현 PR에서 `adr` 절차로 대체 ADR을 함께 만든다.

```diff
- child usage는 child 상세 행에만 표시하고 attempt 총합·headline·비용 합산에서 제외한다.
+ child usage와 모델 단가로 계산한 개별 비용은 상세 행과 카드의 해당 위임 표시에서 제공한다.
+ 부모/자식의 중복 여부가 입증되지 않은 native child 값은 attempt 총합·headline·비용 합산에서 제외한다.
```

직접 세션 타일의 관측·사용량 배제는 기존 세션 표시 스펙의 해당 비범위 조항을 이 문서로 대체한다. 동작의 표시는 넓히지만 Worker 제어 권한을 추가하지 않는다. 기존 가격 스펙의 provider 공통 입력 계산은 §5의 provider별 식으로 정정한다.

## 7. Test scope와 인도 조건

| 검증 경계 | 필수 수용 사례 |
| --- | --- |
| 카드 전파 | Worker·Monitor, 일반 attempt·자동 리뷰·직접 세션에서 native/external 현재 대상·모델·완료수·토큰·가격 표시; native 2행 누락 재현이 해소됨 |
| 위임 상태 | 성공/실패/중단 구분, 반복 wait/send 중복 없음, 재사용 child가 진행으로 복귀, 뒤늦은 종료와 미관측 값 처리 |
| 직접 참조 | 현재 로컬 연결만, 과거 참조 제외, 참조 변경·제거, host 별칭과 실제 파일 일치, 원격/파일 없음/이후 생성, 계정 경로 격리 |
| 구독 수명 | drawer 닫혀도 갱신, 같은 파일 중복 reader 없음, 마지막 구독 해제, 동기 projection에서 파일 전체 재파싱/추가 bd 호출 없음 |
| 사용량 | Codex 종료 전 실제 fixture 값 표시, 중복 이벤트·누적 교체, 여러 turn·모델 변경, resume 경계, Claude message 중복 제거, native 합산 제외 |
| 복구 | 초기 snapshot과 live/restart 결과 동일, 미완성 줄 완성·손상 줄·파일 truncate/교체 때 중복 집계 없음, 부모 종료와 자식 종료 구분 |
| 비용 | Codex 캐시 재현 $0.00066, Claude 기존 결과 유지, reasoning 이중 과금 없음, alias/CLI ID 동등, 미등록·부분 단가·명시적 0·보고값·총량 추정·모델 변경 |
| 화면 접근성 | 좁은 화면에서 대상/토큰/가격과 운영 버튼 유지, 종료 그룹 상세를 터치·키보드로 열 수 있음, 자료 없는 줄 생략 |

구현 검증은 새 worktree Node engine 확인·`npm ci` 뒤 범위 테스트, `npm run tsc`, `npm run lint`, 변경 파일 prettier, 전체 `npx vitest run --reporter=dot`(120초), `npm run build`다. 캐시 비용 helper의 모든 소비자를 함께 확인한다.

머지 전 별도 localhost 서버에서 비식별 fixture를 순차 공급해 두 카드의 진행→완료, 토큰·비용 갱신과 새로고침을 관측하고 데스크톱/좁은 화면 캡처를 남긴다. 실패 시 구현 완료로 인도하지 않는다. 공유 서비스에 테스트 세션이나 가짜 이슈를 넣지 않는다.

인도는 검증된 PR까지다. 이후 기존 Worker 머지·배포 절차가 핀된 SHA, 프로세스 경로, 포트, HTTP 응답을 검증한다. 이 호스트의 초기 단가 설정은 검증된 가격표와 실제 설정 readback을 근거로 적용하며, 존재하던 단가·다른 설정은 보존한다. 배포 뒤 실제 세션 한 건의 화면 확인은 완료 보고서에 잔여 관찰로 운반한다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — workflow 키와 권한은 기존 계약을 소비한다. 새 관측은 UI payload다.
- 전제: ADR 0014 — 같은 카드 렌더러와 슬롯 3·5를 사용한다.
- 전제: ADR 0027 — Worker 종료 이력은 기존 bead 타임라인/attempt 기록에 보존한다.
- 전제: ADR 0043 — 동기 투영은 준비된 비동기 관측을 읽고 추가 bd 프로세스를 띄우지 않는다.
- 전제: ADR 0047 — native child 내부 관측·부모 연결·누적 교체와 합산 제외를 승계하고 표시 장소 한정만 대체한다.
- native child의 개별 토큰·환산 비용을 카드에도 보이되 합산에서는 제외한다. 되돌리기 어려움: 예(공유 표시·회계 의미), 맥락 없으면 놀라움: 예(보이는 자식 비용이 부모 금액과 별개), 실제 절충: 예(완전 합계 대신 검증된 관측). `summary`: "Codex native child의 개별 사용량과 환산 비용은 카드·상세에 표시하고 중복 여부가 미확인된 값은 부모 합계에 더하지 않는다" → ADR, supersede 0047
- 직접 세션 표시는 현재 참조 대화 전체의 관측이며 Bead별·워크스페이스 비용에 자동 가산하지 않는다. 되돌리기 어려움: 예(세션과 Bead의 사용량 범위), 맥락 없으면 놀라움: 예(카드 비용과 KPI 합계 차이), 실제 절충: 예(대화 전체 표시 대신 근거 없는 Bead 배분을 피함). `summary`: "직접 세션 카드의 사용량은 현재 참조 대화 전체이며 Bead별 비용으로 나누거나 워크스페이스 합계에 자동 가산하지 않는다" → ADR
- provider별 캐시 가격식을 공용 helper에서 고친다. 되돌리기 어려움: 아니오(기존 계산의 오류 수정), 맥락 없으면 놀라움: 아니오, 실제 절충: 아니오 → ADR 아님

## 경계·후속

요청된 두 카드·Claude 비교·토큰·비용과 캐시 중복 수정은 UI-42l2 한 건이 소유한다. 별도 형제나 선행 구현은 필요 없다. 기존 `session_ref` 생산 계약, 외부 위임 receipt 스키마, 원격 전사 수집, 환율·구독 청구액 계산, 설정 화면 재구성은 변경하지 않는다.
