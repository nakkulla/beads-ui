---
scope:
  - server/adr/
  - app/views/adr/
  - docs/adr/
  - AGENTS.md
---

# beads-ui ADR 정리 — ADR 탭 리더의 history/ 호환과 현재 42건의 강등·통합

- Bead: `UI-u6ud` (`route=spec_backed`, 사용자 요청 2026-09-23). dotfiles `dotfiles-u7ub`(ADR 체계 v3, 스펙 `docs/superpowers/specs/2026-09-23-adr-system-v3-history-dir-and-intake-tightening-design.md` @ `875ccbf408483a90651f264227bc406544d426b7`)의 다른 저장소 unit. 형제 `dotfiles-o7y9`(dotfiles 감사)와는 절차만 공유하고 파일은 겹치지 않는다.
- 상태: 사용자 승인(2026-09-23).
- 근거(2026-09-23 실측): `docs/adr/` 96파일 = accepted 42·superseded 54. 9월 한 달 신규 72건. 현재표 42행 가운데 되돌리기가 스펙·quick_fix 편집 한 번인 구현 세부(레인 출처 판정 키 `UI-us7l`, 완료 행 출처 칩 `UI-j10d`, 혼합 실행자 라벨 `UI-obl0`, 일괄 창 다섯 번째 탭 `UI-wg68-2`)와 dotfiles 계약이 정본인 규칙(`0020`)이 섞여 있고, 같은 주제가 4~8행으로 흩어져 있다(머지 게이트 보류 `0019`·`0031`·`0040`·`UI-a5l2-3`, Worker 대기 `0036`·`0046`·`UI-kq54`·`UI-tqqp`·`UI-a5l2-2`·`UI-hgd2`). ADR 탭 리더(`server/adr/adr-frontmatter.js` `readAdrDir`, `adr-signals.js` `listMarkdown`, `app/views/adr/index.js` `docCell('docs/adr/<file>')`)는 평면 디렉터리만 읽는다.

## 목표와 비목표

목표: (1) ADR 탭이 `docs/adr/`와 `docs/adr/history/` 두 위치를 읽어 dotfiles ADR 체계 v3(ADR dotfiles/dotfiles-u7ub D1·D2·D10)의 레이아웃을 가진 저장소와 아직 평면인 저장소를 모두 정확히 보인다. (2) beads-ui 현재표를 42행에서 12행으로 줄인다 — 주제 통합 10건, 유지 2건, 강등 4건 — 그리고 superseded 파일 전부를 `history/`로 옮긴다. (3) `AGENTS.md` 태그 4개를 새 id로 옮기고 인덱스·인용 검사기·`repo-ops/script/verify`가 rc=0이다.

비목표: 검사기 규칙의 JS 복제(ADR 0039 유지 — 위치 불일치 판정은 설치본 `adr-index.py --check`의 몫이고 탭은 그 drift를 보일 뿐이다), 코드 주석·옛 스펙의 옛 ADR id 인용 정정(`ADR 0012` 13곳 등은 이력으로 남는다), 옛 ADR 본문 수정, 새 ADR 상태 어휘, dotfiles ADR의 처분(`dotfiles-o7y9` 소유).

## 접근 비교

통합의 단위.
1. 체인 머리만 남기고 강등만 한다 — 현재표가 30행 안팎에 머물고 같은 주제가 여전히 흩어진다. 기각.
2. 주제별 통합 supersede(채택) — 한 주제의 살아남는 조항을 한 ADR이 재진술하고 흡수한 ADR은 superseded다(ADR 체계 v3 D8). 현재표 한 행이 한 주제다.
3. 저장소 전체를 ADR 한 건으로 — 한 조항 변경마다 전체를 다시 쓰는 비용이 커진다. 기각.

리더 호환의 범위.
1. 루트만 읽고 `history/`는 무시 — 이력 표가 비고 `supersedes` 링크가 끊긴다. 기각.
2. 두 위치를 읽고 `file`을 `docs/adr` 기준 상대 경로로 싣는다(채택) — 렌더러·오류 필터·링크가 그 한 필드만 따르면 된다.
3. 재귀 스캔 — `history/` 아래 다른 폴더를 만들 계획이 없고 규칙은 한 단계다. 기각.

## 결정

D1. **리더는 두 위치를 읽는다.** `readAdrDir(adr_dir)`는 루트의 `<id>-*.md`와, 존재할 때 `history/` 바로 아래의 `<id>-*.md`를 읽는다. `AdrRecord.file`은 `docs/adr` 기준 상대 경로다 — 루트 파일은 지금처럼 파일명, `history/` 파일은 `history/<파일명>`. `ADR_FILE_NAME_RE`·frontmatter 파싱·정렬(`compareAdrDesc`)은 바꾸지 않는다. 읽기 실패 항목의 `file`도 같은 상대 경로다. `history/README.md`나 이름 규칙에 맞지 않는 파일은 루트와 같이 무시한다.

D2. **경로를 쓰는 곳은 `file` 하나를 따른다.** `app/views/adr/index.js`의 `docCell('docs/adr/' + adr.file)`과 `frontmatter_errors` 필터(`e.file === adr.file`)는 그대로이며 `history/` 접두가 붙은 값을 그대로 잇는다. `adr-signals.js`의 `adr_files`(교차 인용 스캔 대상)는 두 위치의 파일을 `docs/adr/<상대 경로>`로 싣는다 — 오늘 평면 디렉터리에서 superseded 파일도 스캔하던 동작과 같다. `adr-watch.js`는 `docs/adr`를 이미 재귀 감시하므로 바꾸지 않는다.

D3. **위치 판정은 복제하지 않는다.** `history/`에 accepted가 있거나 루트에 superseded가 있어도 리더는 status대로 현재·이력에 넣고 경고를 만들지 않는다. 위치 불일치는 설치본 `adr-index.py --check`가 내는 `index_drift`로만 보인다(ADR 0039의 "규칙은 JS로 복제하지 않는다" 그대로). `CANDIDATE_ERROR_KINDS`에 `title_too_long`을 더해 `기타` 대신 이름으로 그린다 — 어휘 등록일 뿐 판정은 없다.

D4. **처분 표.** 아래 표가 42건 각각의 처분이다. `통합 → <id>`는 그 id의 새 ADR이 이 행의 살아남는 조항을 전부 재진술하고 이 행을 `supersedes`에 싣는다는 뜻이고, `강등`은 새 ADR 없이 `status: superseded`와 `superseded_by_note: "강등 — <근거 스펙 경로>"`로 내린다는 뜻이며, `유지`는 손대지 않는다.

| ADR | 처분 | 근거 |
| --- | --- | --- |
| 0008 | 통합 → UI-u6ud | 데이터 계층 |
| 0025 | 통합 → UI-u6ud | 스냅샷 세대 투영 |
| 0043 | 통합 → UI-u6ud | 비동기 준비 컨텍스트 |
| 0044 | 통합 → UI-u6ud | 구독 store 통지 |
| 0012 | 통합 → UI-u6ud-2 | 계약 소비 관계 |
| 0039 | 통합 → UI-u6ud-2 | 설치본 체커 spawn |
| 0006 | 통합 → UI-u6ud-3 | 머지 큐 소유 |
| 0003 | 통합 → UI-u6ud-3 | 머지 자격 입력 |
| 0011 | 통합 → UI-u6ud-3 | 자동화 스위치 |
| 0015 | 통합 → UI-u6ud-3 | yield deadline·fence |
| 0019 | 통합 → UI-u6ud-4 | 영수증 보류 자동 dispatch |
| 0031 | 통합 → UI-u6ud-4 | ancestry 신선도 |
| 0040 | 통합 → UI-u6ud-4 | 위조 3종 terminal |
| UI-a5l2-3 | 통합 → UI-u6ud-4 | verify_hold·정리 실패 |
| 0010 | 통합 → UI-u6ud-5 | 배포 실행 소유 |
| 0009 | 통합 → UI-u6ud-5 | 병렬성 분석 제거는 끝났고 남는 조항(수동 [배포 실행]·script_retry 상시)만 승계 |
| 0051 | 통합 → UI-u6ud-5 | 번들 untracked |
| 0027 | 통합 → UI-u6ud-6 | 이력 SoT |
| 0029 | 통합 → UI-u6ud-6 | attempts 접미 불변식 |
| 0021 | 통합 → UI-u6ud-6 | review_session 생존 소유 |
| UI-6pif | 통합 → UI-u6ud-6 | 대화형 세션 레코드 |
| 0050 | 통합 → UI-u6ud-6 | in_progress 선점 |
| UI-a5l2-2 | 통합 → UI-u6ud-7 | 대기 어휘·사다리·잔재 |
| UI-hgd2 | 통합 → UI-u6ud-7 | 선행 대기 재개 후보 |
| 0036 | 통합 → UI-u6ud-7 | 파킹 출구 |
| UI-tqqp | 통합 → UI-u6ud-7 | closed·deferred 자동 퇴장 |
| UI-kq54 | 통합 → UI-u6ud-7 | route_changed 거절 |
| 0046 | 통합 → UI-u6ud-7 | provider 보존 재개 |
| 0014 | 통합 → UI-u6ud-8 | buildLanes·슬롯 표 |
| 0033 | 통합 → UI-u6ud-8 | 후보 레인 관측 집합 |
| UI-mfm1 | 통합 → UI-u6ud-8 | 후보 사실 키·단일 판정 |
| UI-p7s2 | 통합 → UI-u6ud-8 | Board 퇴역은 끝났고 남는 조항(워커 탭 단일 이슈 면·ui-order 없음)만 승계 |
| UI-42l2-2 | 통합 → UI-u6ud-9 | 직접 세션 사용량 |
| UI-mscc | 통합 → UI-u6ud-9 | 부모·자식 합산 |
| UI-wg68 | 통합 → UI-u6ud-10 | 칩 클릭·프리셋 정체성 |
| UI-wg68-2 | 통합 → UI-u6ud-10 | 남는 조항(서버 전역 값은 저장소 창에 섞지 않음)만 승계; 탭 구성 자체는 스펙이 정본 |
| UI-a5l2 | 유지 | Worker 가드 — 소비자(훅·pre-push·session-monitor)가 다른 독립 주제; 제목(71자)을 60자 이하 이름으로 축약(v3 D6 허용 편집) |
| UI-wecw | 유지 | dotfiles CLI 소비 계약 — 상대가 다른 저장소; 제목을 60자 이하 이름으로 축약(v3 D6 허용 편집, 조항은 summary가 이미 싣는다) |
| 0020 | 강등 | 규칙의 정본은 dotfiles 계약 `dependency_gating`이고 beads-ui 몫은 칩 표시뿐 — `docs/superpowers/specs/2026-08-28-blocked-bead-spec-authoring-allowed-design.md` |
| UI-us7l | 강등 | 레인 출처 판정 키 — 되돌리기는 `lane-model` 한 파일 — `docs/superpowers/specs/2026-09-22-run-lane-origin-and-parallel-slot-usage-design.md` |
| UI-j10d | 강등 | 완료 행 칩 배치 — 슬롯 표 스펙이 정본 — `docs/superpowers/specs/2026-09-14-worker-created-issue-chip-design.md` |
| UI-obl0 | 강등 | 실행자 라벨 표시 형식 — `docs/superpowers/specs/2026-09-21-mixed-unit-impl-actor-design.md` |

D5. **통합 ADR 10건의 형식.** id는 `UI-u6ud`, `UI-u6ud-2` … `UI-u6ud-10`이다 — 한 Bead의 ADR이 여럿인 것은 주제마다 되돌릴 때 움직이는 소비자가 다르기 때문이고(v3 D5의 허용 조건), 감사 Bead의 성격상 예외적이다. 제목은 60자 이하의 이름이고 승계 조항을 싣지 않는다(v3 D6). `date`는 착지일, `spec`은 이 스펙, `bead`는 `UI-u6ud`. Decision은 흡수한 ADR의 조항을 항목으로 재진술하되 옛 본문의 문단·기각 대안·구현 경로 설명은 옮기지 않는다 — 조항(무엇을 한다·하지 않는다)만이다. Context는 흡수한 id마다 "`<id>`: <가져온 조항 한 줄>"을 적는다. 버린 조항은 없는 것이 기본이며, 재진술하다 버려야 할 조항이 보이면 스펙 이탈로 보고하고 Consequences에 "폐기: …"로 적는다(v3 D8). 각 ADR의 `summary`는 아래 `## 결정 (ADR 후보)`의 초안과 문자열이 같다.

D6. **파일 이동과 태그.** 기존 superseded 54건, 통합으로 superseded가 되는 36건, 강등 4건을 `git mv docs/adr/<file> docs/adr/history/<file>`로 옮긴다 — 이 PR이 beads-ui의 `history/`를 처음 만든다. 루트에는 accepted 12건과 `README.md`만 남는다. `AGENTS.md` 태그는 `ADR 0012`→`ADR UI-u6ud-2`, `ADR 0014`→`ADR UI-u6ud-8`, `ADR 0010`→`ADR UI-u6ud-5`, `ADR 0003`→`ADR UI-u6ud-3`로 옮기고 문장은 바꾸지 않는다. `docs/adr/README.md`는 설치본 `adr-index.py`로 재생성한다.

D7. **선행과 전환기.** 구현 진입은 `dotfiles-u7ub`의 close 뒤다(foreign `blocks`) — 설치본 `adr-index.py`·`adr-cite-check.py`·`check-adr-candidates.py`가 두 위치를 읽어야 이 PR의 `repo-ops/script/verify`와 finish의 후보 검사가 통과한다. D1~D3(리더)은 그 전에 착지해도 무해하지만 같은 PR로 간다. dotfiles가 먼저 `history/`를 만들면(`dotfiles-o7y9`) 이 PR 착지 전까지 ADR 탭의 dotfiles 이력 표는 비어 보이고 신호는 정확하다(v3 D10(d), fail-quiet).

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 관찰: 형제는 없다. `dotfiles-u7ub`(선행, foreign `blocks`)와 `dotfiles-o7y9`(dotfiles 감사)는 dotfiles rig의 unit이고 이 스펙은 그 결과를 소비한다.
- 관찰: 진행 중 스펙 `UI-vui5`(`docs/superpowers/specs/2026-09-23-codex-sol-alias-consumer-alignment-design.md`)와는 경로가 겹치지 않는다.

## Test scope

- `server/adr/adr-frontmatter.test.js`: (1) `history/`가 있으면 두 위치의 ADR을 읽고 `file`이 `history/<name>`, (2) `history/`가 없으면 결과가 지금과 동일, (3) `history/`의 이름 규칙 밖 파일과 `history/README.md` 무시, (4) `history/` 안 읽기 실패 항목의 `file`이 상대 경로.
- `server/adr/adr-signals.test.js`: `adr_files`가 두 위치를 `docs/adr/<상대 경로>`로 싣고 교차 인용의 `file`이 그 경로; `current`·`history` 분류는 status만 따른다.
- `app/views/adr/index.test.js`: `history/` 접두 레코드의 링크가 `docs/adr/history/<name>`이고 frontmatter 오류 표시가 같은 `file`로 붙는다.
- `server/adr/adr-registry.test.js`가 있으면 `title_too_long` 등록, 없으면 `adr-signals.test.js`의 kind 라벨 사례.
- required 묶음: `npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`, `repo-ops/script/verify`(설치본 `adr-index.py --check`·`adr-cite-check.py`가 새 레이아웃에서 rc=0).

## 실행·인도

- PR 1건. 순서: 리더(D1~D3)와 테스트 → 통합 ADR 10건 작성 → 옛 ADR 상태·`superseded_by`·강등 note → `git mv` → `AGENTS.md` 태그 → `adr-index.py --dir docs/adr` 재생성 → `--check`·`adr-cite-check.py`·`check-adr-candidates.py --spec <이 스펙> --adr-dir docs/adr` rc=0 → Pre-Handoff Validation.
- 배포는 `repo-ops/config.toml [deploy]`가 소유한다. 인도 증거는 공유 서버 재시작 뒤 ADR 탭이 beads-ui 저장소를 현재 12행·이력 94행으로, dotfiles 저장소를 그 시점 레이아웃대로 보이는 것이다.

## 결정 (ADR 후보)

- 전제: ADR dotfiles/dotfiles-u7ub — ADR 체계 v3의 두 위치 레이아웃(D1·D2), 강등 전이(D7), 통합 supersede(D8), 소비자 계약(D10); 이 스펙은 그 규칙을 소비하고 넓히지 않는다.
- 데이터 계층: 되돌림 어려움=충족(서버 스냅샷 코디네이터·구독 registry·상세 투영·후보 캐시가 함께 움직인다), 맥락 없으면 의외=충족(왜 상세 전용 read가 없고 동기 자식 프로세스가 금지인지), 실제 대안=충족(DB 직결·상세 전용 bd show·동기 gitHead 폴백). `summary`: "데이터 계층은 bd CLI shell-out(스냅샷 세대당 기본 2회 read, legacy 3회)이고 DB 직결·daemon·batch RPC는 없다; issue-detail을 포함한 모든 목록은 같은 워크스페이스 스냅샷 세대에서 투영하고 상세 전용 bd read는 없다; 워크스페이스·후보 투영은 비동기 준비 컨텍스트만 읽고 동기 자식 프로세스는 title-cache 외에 띄우지 않는다; 구독별 store는 전체 issue push를 받아 내용 변경만 통지하고 registry가 구독 출처를 전달한다" → ADR, supersede 0008·0025·0043·0044
- 계약 소비: 되돌림 어려움=충족(exec-enums·workflow-enrich registry, ADR 탭 spawn 경로, cross-runtime 테스트), 의외=충족(왜 계약 파일을 런타임에 안 읽는지), 대안=충족(런타임 YAML 로드·규칙 JS 복제). `summary`: "beads-ui는 dotfiles 계약을 런타임에 읽지 않고 필요한 subset만 코드 registry로 복제해 검증을 소유하며 계약 키 부재는 fail-quiet 표시 생략이다; ADR 탭 신호는 설치본 체커를 비동기로 spawn해 --json을 소비하고 규칙을 JS로 복제하지 않으며 JS 리더는 표를 그릴 수 있는지만 판정한다" → ADR, supersede 0012·0039
- 머지 큐: 되돌림 어려움=충족(merge-queue 드라이버·admission·자동화 mutation·fence·`.github/workflows` 부재 테스트), 의외=충족(왜 checks를 안 보고 30분이 실패가 아닌지), 대안=충족(세션 직접 머지·checks 입력·마스터 스위치·시간 타임아웃). `summary`: "PR 랜딩 작업의 머지는 Worker의 단일 순차 큐만 실행하고 완료는 MERGED 관측이다; 머지 자격은 저장소 안의 입력(PR·base·head identity, mergeability, 리뷰·실행 영수증, [verify])만 보고 GitHub checks는 읽지 않는다; auto_merge와 auto_advance는 독립 스위치이고 자동화 클릭만 둘을 원자적으로 맞춘다; 30분은 실패가 아니라 queue-yield deadline이고 충돌 해소 fence는 수동 권한 면제·슬롯 여유로 판정한다" → ADR, supersede 0006·0003·0011·0015
- 머지 게이트 보류: 되돌림 어려움=충족(receipt-check 레지스트리·review lineage claim·completion intent phase·알림 클래스), 의외=충족(왜 head 이동이 재리뷰가 아니고 위조만 terminal인지), 대안=충족(head당 재리뷰·사람 클릭 유일 출구·metadata_watch 대기·terminal verify_red). `summary`: "impl_review 영수증은 head와 같거나 조상이면 유효하고 head 이동만으로 재리뷰하지 않는다; 영수증 부재·stale·invalid·undetermined는 terminal이 아니라 보류이며 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch하고 소진 뒤 출구는 [리뷰 후 머지] resume이다; 자동 해소 주체가 없는 위조 3종만 즉시 terminal needs_human이다; verify_cmd red는 비종단 verify_hold이고 머지 후 정리 실패는 카드에만 남고 알림하지 않는다" → ADR, supersede 0019·0031·0040·UI-a5l2-3
- 배포·빌드: 되돌림 어려움=충족(repo-ops 스크립트·operation journal·verify·prepack·정적 모드 서버), 의외=충족(왜 Worker가 저장소 지식이 없고 번들이 untracked인지), 대안=충족(reconciler·release 디렉터리·번들 커밋·자동 빌드). `summary`: "배포는 Worker의 저장소 지식 없는 durable operation 실행이고 저장소별 적용·확인은 핀된 base의 repo-ops [deploy] 스크립트가 소유한다; 자동 해소 사다리는 script_retry 한 단계 상시이고 수동 [배포 실행] 버튼이 있으며 병렬성 분석·reconciler·release 디렉터리는 없다; 프런트엔드 번들은 tracked가 아니고 배포·verify·prepack이 빌드하며 정적 모드 서버는 번들 부재 시 안내 종료하고 자동 빌드하지 않는다" → ADR, supersede 0010·0009·0051
- Worker 기록·생존: 되돌림 어려움=충족(events.jsonl 기록기·queue.json 이관·reconcile·claim 경로), 의외=충족(왜 상태 파일에 과거가 없고 세션 종류가 셋인데 소유가 하나인지), 대안=충족(queue.json 이력 보존·세션별 감시자·세션 자체 claim). `summary`: "Worker 이력의 SoT는 bead별 append-only events.jsonl이고 queue.json은 살아 있는 상태만 담으며 살아 있는 queue.attempts는 bead 이력의 최신 접미다; 구현·리뷰·대화형 세션의 생존·슬롯·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다; Worker는 구현 attempt dispatch에서만 open Bead를 in_progress로 선점하고 session_ref는 쓰지 않는다" → ADR, supersede 0027·0029·0021·UI-6pif·0050
- Worker 대기·재개·잔재: 되돌림 어려움=충족(wait-judgment·resolution-ladder·잔재 처분·문의 세션 기동·큐 sweep·resume 경로), 의외=충족(왜 재시도 버튼이 없고 잔재를 자동으로 버리는지), 대안=충족(라벨만 접기·즉시 실패 타일·항상 백업 후 새로 시작·자동 재배치). `summary`: "Worker 대기 어휘는 선행 대기·공급자 보류·재시도 대기·세션이 멈춤 넷이고 사람 결정이 필요한 곳에서만 멈춘다; 미분류 실패는 같은 세션 재시도 사다리 뒤 실패 타일이고 파킹과 복구 대기의 출구는 문의 세션뿐이며 새 attempt 재시도 버튼은 없다; base_moved는 보존 세션을 자동 재개하고 잔재는 resume·continue·backup_fresh 순으로 자동 처분하며 선행 대기 attempt도 그 후보다; 재개는 기록된 provider와 레인을 보존하고 route가 바뀐 재개는 route_changed로 거절한다; closed·deferred Bead는 대기 레인에서 자동으로 물러나고 자동 재배치는 없다" → ADR, supersede UI-a5l2-2·UI-hgd2·0036·UI-tqqp·UI-kq54·0046
- 후보 레인·카드: 되돌림 어려움=충족(buildLanes·슬롯 표 스펙·runnable-cache·lane-model·라우터 기본 뷰), 의외=충족(왜 후보가 자격 집합이 아니고 Board가 없는지), 대안=충족(탭별 모델 빌더·자격 필터·Board 유지). `summary`: "레인은 buildLanes 하나로 조립하고 카드 줄 순서는 공유 슬롯 표가 정하며 재료 없는 줄은 그리지 않는다; 후보 레인은 미착수 이슈의 관측 집합이고 큐 진입 자격은 서버 admission이 판정한다; Worker와 Monitor의 후보 행은 같은 사실 키를 싣고 lane-model 한 경로가 자격을 접으며 배치 불가 사유는 슬롯 4a 칩 하나다; 워커 탭이 저장소의 단일 이슈 면이고 Board 탭·ui-order는 없다" → ADR, supersede 0014·0033·UI-mfm1·UI-p7s2
- 사용량: 되돌림 어려움=충족(공용 투영·카드·비교·워크스페이스 KPI), 의외=충족(왜 부분 집계를 0으로 채우지 않는지), 대안=충족(추정 가산·직접 세션의 Bead 배분). `summary`: "사용량은 검증된 직접 사용량만 부모·자식 중복 없이 합산하고 입증되지 않은 값은 추정 가산하지 않으며 미관측 범위는 부분 집계로 표시한다; 직접 세션 카드는 현재 참조 대화 전체를 보이되 Bead별 배분·워크스페이스 합계 가산을 하지 않는다" → ADR, supersede UI-42l2-2·UI-mscc
- 프리셋·칩: 되돌림 어려움=충족(exec-presets 저장소·chip-preset-toggle op·dispatchPreset·설정 창 두 모드), 의외=충족(왜 재클릭이 마지막이 아니라 첫 클릭 전으로 돌아가는지), 대안=충족(작성자 단일화 유지·저장소 창에 전역 값 편집). `summary`: "실행 프리셋은 applies_to 계열별 id 하나가 정체성이고 읽을 때 계열 키 집합을 대칭 비교하며 dispatchPreset과 카드 비교는 분리한다; 판정 칩 복잡·frontend·backend 클릭은 서버 전역 바인딩의 general 프리셋을 그 이슈에 적용하고 재클릭은 첫 클릭 전 핀으로 되돌리며 quick_fix 이슈는 거부한다; 칩 바인딩 편집은 모니터 일괄 창의 서버 전역 탭에만 있고 저장소 하나를 편집하는 창에는 섞지 않는다" → ADR, supersede UI-wg68·UI-wg68-2
- 리더의 두 위치 읽기(D1~D3): 되돌리기 비용 X(리더 한 파일과 `file` 소비자 두 곳) / 놀라움 X(dotfiles 계약을 따를 뿐) / 대안 있음 → ADR 아님
- 강등 4건과 유지 2건의 판정: 되돌리기 비용 X(status 줄) / 놀라움 X(표가 근거를 적는다) / 대안 있음 → ADR 아님
