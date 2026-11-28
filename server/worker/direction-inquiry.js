/**
 * Same-session conversation launcher for a stopped Worker attempt (UI-nuwy
 * §3.2, superseding the UI-gjp2 fork inquiry).
 *
 * Every string-valued `awaiting_user` park and every conversation-target
 * recovery wait (`session-stall.js`) reaches this module. `onParkedAttempt` is
 * the automatic trigger and obeys the ONE conversation auto-launch switch the
 * failure conversation shares (`conversation-settings.js`, else config.toml
 * `worker_direction_inquiry.enabled`, UI-jbl1 §3.4);
 * `launchForClick` is the user's explicit `[세션에서 이어가기]` action and
 * deliberately ignores that automatic-launch gate. Both reopen the attempt's
 * OWN runner session interactively in tmux — no fork — with the one dotfiles
 * entry block as its first input, at most one live conversation pane per Bead.
 *
 * Four properties are load-bearing:
 *
 *   - NO-THROW. `onParkedAttempt` is called fire-and-forget from a queue
 *     transition, so every path is wrapped and the returned promise ALWAYS
 *     resolves. Nothing here may fail an attempt settlement.
 *   - FAIL-CLOSED ON TMUX. A tmux that cannot be reached means liveness cannot
 *     be judged, and a duplicate nobody could rule out is worse than no
 *     session: the launch is skipped and the notification says why.
 *   - ONE PROCESS PER SESSION ID. The attempt's runner process must be proven
 *     gone before its session is reopened; an alive or unobservable runner
 *     refuses the launch instead of letting two processes write one session.
 *   - THE MARKER PRECEDES THE CLI. The pane's `@bdui_inquiry_bead` option is
 *     written by the wrapper BEFORE it execs the runner, so a marker-less live
 *     conversation cannot exist and pane liveness stays a sound duplicate
 *     guard across a server restart.
 */
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { isUserPausedAttempt } from '../../app/utils/active-attempts.js';
import { DEFAULT_INQUIRY_TMUX_SESSION } from '../config.js';
import {
  conversationAutoLaunchEnabled,
  freshConversationRuntime,
  getConversationSettings
} from '../conversation-settings.js';
import { debug } from '../logging.js';
import {
  DEFAULT_START_TOLERANCE_MS,
  observeProcessIdentity
} from './process-controller.js';
import { agyConversationArgs } from './runner/agy.js';
import { UNKNOWN_RUNNER } from './runner/index.js';
import { resolveSessionLaunchOptions } from './session-launch-accounts.js';
import { qualifyAttemptSession } from './session-ref.js';
import { conversationStopLabel } from './session-stall.js';
// The tmux launch primitives are shared with the failure conversation
// (`resolve-session.js`, UI-jw27 §4). The marker option and the entry block
// stay this module's; the other two launchers fill the same block.
import {
  INQUIRY_PANE_MARKER,
  createTmuxLauncher,
  markerWrapper,
  shellQuote
} from './tmux-launcher.js';

const default_log = debug('worker:direction-inquiry');

/** The pane option that names the Bead a conversation window belongs to. */
const PANE_MARKER = INQUIRY_PANE_MARKER;

/** What a field with nothing behind it prints, rather than an empty slot. */
const ABSENT = '(없음)';

/**
 * Verbatim dotfiles `## 스펙 작성 대화` text block, without a trailing newline,
 * at aa1c48f01bb8b19ed69ca19ae5fd0dd4dd0959de. Only the six input slots belong
 * to beads-ui; the authoring procedure belongs to dotfiles.
 */
export const SPEC_AUTHORING_ENTRY_BLOCK = [
  '이 세션은 Worker 대기열 작업을 막는 스펙 미발행 spec_backed 선행의 스펙을 쓰도록 열린 스펙 작성 대화다. 사용자는 이 tmux 창이나 Discord 스레드에서 답한다.',
  '- 대상 Bead: <대상 Bead ID>',
  '- 막힌 원 Bead: <원 Bead ID 목록>',
  '- 선행 조건: <원 Bead마다 `prerequisite:` notes 줄의 조건 | (없음)>',
  '- 원 attempt: <원 attempt ID | (없음)>',
  '- 보존 워크트리: <경로 | (없음)>',
  '- 열린 경로: <자동 | 클릭>',
  '',
  '절차',
  '1. 대상 Bead로 workflow 라우터에 들어간다. route는 이미 `spec_backed`로 고정돼 있다.',
  '2. 질문하기 전에 증거부터 읽어 스펙을 채운다. 증거는 대상과 원 Bead 본문, `prerequisite:` 줄, 보존 워크트리의 diff와 로그다. 값이 `(없음)`이면 대상·원 Bead 본문과 `blocks` 간선을 근거로 작성을 계속한다. 증거로 답할 수 있는 사실은 묻지 않는다.',
  '3. 설계 선택만 묻는다(brainstorming 순서 그대로).',
  '4. 스펙 게이트는 보통의 대화형 세션 규칙을 따른다.',
  '5. `열린 경로`가 `자동`이면 `spec_review` 영수증을 되읽은 직후 구현 진입 질문 없이 대상 Bead를 Worker 레인에 배치한다. Worker 배치 절차의 점검 1~2와 배치·되읽기를 따르고 0단계(답의 형태 점검)는 건너뛴다. `impl_entry`, `in_progress`, `session_ref`는 쓰지 않는다. 대상이 `bd ready`에 없어도 배치한다. 배치를 되읽으면 6단계 없이 7단계로 간다. 칸이 없거나 비었거나 두 값이 아니면 `클릭`으로 본다.',
  '   - 이 대화에서 사용자가 이 세션에서 구현하겠다고 말했거나, 배치 점검이 통과하지 않거나, 배치 요청이나 되읽기가 실패했으면 이유를 한 줄로 알리고 6단계로 간다. 대상이 `bd ready`에 없으면 6단계 대신 그 한 줄을 알리고 턴을 끝낸다.',
  '   - 배치 요청을 보낸 뒤 그 결과를 관측하지 못했으면(시간 초과나 연결 끊김으로 서버에 닿았는지 모를 때도 같다) 6단계의 `지금 세션에서 처리` 답은 실행 전에 대기열 GET을 다시 한다. 대상이 대기 자리나 활성 attempt로 보이면 로컬 구현에 들어가지 않고 배치된 것으로 알린 뒤 7단계의 닫기 요청으로 끝낸다. 대상이 없다고 확인되면 구현한다. GET도 실패하면 아무것도 쓰지 않고 알린 뒤 끝낸다(`보류`와 같다).',
  '6. 질문하는 경우(`클릭`이거나 5단계 폴백) 구현 진입 질문은 보통의 대화형 세션 규칙을 따른다. 구현 진입 질문의 `Worker 레인에 배치` 답도 포함한다. 다만 `Worker 레인에 배치`를 보일 때는 첫 보기로 두고 그 보기 설명에 추천이라고 적는다. 보기 라벨과 입구 태그 줄의 보기 순서는 바꾸지 않는다. 대상이 `bd ready`에 없으면 질문 없이 영수증 되읽기에서 끝낸다.',
  '7. `Worker 레인에 배치` 답이나 자동 배치면 배치와 되읽기 뒤, `보류` 답이면 아무것도 쓰지 않은 채, 같은 턴에서 `python3 <workflow 스킬 디렉터리>/../../../hooks/agent_handoff.py request-close --bead <대상 Bead ID>`로 이 창의 닫기를 요청하고 턴을 끝낸다. 창은 입력 없이 10분이 지나면 닫히고, 그 사이 입력이 오거나 질문을 기다리면 닫히지 않는다. `지금 세션에서 처리` 답이면 닫기를 요청하지 않고, 5단계의 대기열 재확인이 필요하면 그 확인 뒤에만 구현을 이어간다.',
  '',
  '금지: 원 Bead의 상태·클레임·Worker 대기열 자리·보존 워크트리를 바꾸지 않는다.'
].join('\n');

/**
 * Fill only server-owned slots in one pass, without rescanning inserted text.
 * The `열린 경로` slot reads `자동` only when `automatic` is true, else `클릭`.
 *
 * @param {{ bead_id: string, originals?: string|null, prerequisites?: string|null, attempts?: string|null, worktrees?: string|null, automatic?: boolean }} input
 * @returns {string}
 */
export function fillSpecAuthoringEntry(input) {
  /** @type {Record<string, string>} */
  const slots = {
    '<대상 Bead ID>': input.bead_id || ABSENT,
    '<원 Bead ID 목록>': input.originals || ABSENT,
    '<원 Bead마다 `prerequisite:` notes 줄의 조건 | (없음)>':
      input.prerequisites || ABSENT,
    '<원 attempt ID | (없음)>': input.attempts || ABSENT,
    '<경로 | (없음)>': input.worktrees || ABSENT,
    '<자동 | 클릭>': input.automatic === true ? '자동' : '클릭'
  };
  return SPEC_AUTHORING_ENTRY_BLOCK.replace(
    /<[^>]+>/g,
    (slot) => slots[slot] ?? slot
  );
}

/**
 * The first input of every Worker session conversation — 멈춤, 실패 and
 * 외부 작업 완료 alike (UI-18a5 §3.3) — quoted verbatim from dotfiles
 * `src/shared/skills/flow/workflow/references/execution-common.md`
 * (`## Worker 세션 대화`, commit `b4b89d8d5f727133cff838aa250524b5061958f4`),
 * with no trailing newline. This is the TEMPLATE: beads-ui fills only the
 * conversation reason, the situation, and the two paths; `<원문>`,
 * `<결정 한 줄>` and `<한 줄>` belong to the session. beads-ui adds no
 * procedure and no prohibition of its own.
 *
 * @type {string}
 */
export const CONVERSATION_ENTRY_BLOCK = [
  '이 세션은 Worker 작업이 <대화 사유>에 이르러 지금 사용자와 대화하도록 다시 열렸다. 사용자는 이 tmux 창이나 Discord 스레드에서 답한다.',
  '- 대화 사유: <멈춤 awaiting_user=<값> | 멈춤 recovery:<authority|no_progress|credential> | 멈춤 recovery:<옛 사유> (옛 기록) | 멈춤 paused | 실패 <클래스> · <원인 코드> | 외부 작업 완료 <wait_id>>',
  '- 상황: <세션이 남긴 문장 | 일시정지 문장 | 실패 진단 | 외부 작업 완료 블록>',
  '- 구현 워크트리: <path>',
  '- target_base 체크아웃: <path>',
  '',
  '절차',
  '1. 질문 전에 자가 수리 단계를 적용한다. 대상은 실패 대화(`receipt_hold` 제외; 머지 전 검증 보류는 아래 base 쪽 원인 갈래만)와 `멈춤 recovery:no_progress`이고, 설계·범위 충돌과 자격 증명 멈춤은 제외한다. 실패한 Bead 자신에게 `auto_fix_for`가 있거나 같은 실패 정체의 자동 수정 1회를 이미 썼으면 자가 수리를 건너뛰고 아래처럼 한 번 묻는다.',
  '   - 원래 실행이 끝났고 실제 효과를 확인한 뒤 원인을 읽기 전용으로 진단한다. 허용: 기록된 로그·실패 기록·Bead·git 상태 읽기, 원격 호스트의 읽기 조회(예: 서비스 `status`, 로그 `tail`, `ps`). 금지: 파일·서비스·Worker 큐·Bead·원격 상태를 바꾸는 명령(아래 자가 수리 쓰기 예외와, 진단이 끝나 아래 자동 진행 조건이 모두 선 뒤의 `자동 진행:` notes 한 줄만 허용), 실패 단계 재실행·재시도, 잠금 획득. 재현용 쓰기는 세션 임시 디렉터리 안의 사본에서만 한다.',
  '   - 세 조건을 모두 확인한다: 재현(원인을 보여 주는 읽기 명령 또는 임시 사본의 명령과 그 출력을 직접 얻음; 같은 원인 반복 멈춤은 같은 명령이 같은 오류로 두 번 끝난 기록), 코드 소유(고칠 곳이 rig가 있는 저장소의 추적 파일), 자동 등급(가드·권한·계약 의미·jev binding 권한을 바꾸지 않고 열린 설계 선택이 없음; `self-improvement.md` Triage judgments를 쓰되 보정 계획만의 `기준 조정` 예외는 제외). 라이브 상태를 직접 손보거나 실패 단계를 다시 돌리는 것은 재현이 아니다.',
  '   - 세 조건이 서면 `execution-worker-lane.md` `## Prerequisite gate` 2·3단계 순서로 대상 rig의 quick_fix 수정 Bead를 reuse probe로 채택하거나 만들고, 본문·인계 자기 검토 영수증·`route` 핀·Worker 배치를 마친다. `self_improvement_tier=auto`, `auto_fix_for=<막힌 행의 Bead ID 또는 저장소 작업 ID>`, 진입 `상황`에 `지문:`이 있으면 그 값의 `incident_fp`를 싣는다. 본문 검증 bundle에 재현 명령을 `baseline_red:` 줄로 쓰고 수정 뒤 통과와 표준 quick_fix 배포 확인을 닫힘 기준으로 삼는다(막힌 행의 실패 단계 통과는 닫힌 뒤 Worker가 판정). 보호 경로의 외부 리뷰·착지 알림은 기존 장치를 따른다. 즉시 경로는 하루 상한 없이 자기개선 원장에도 세지 않고, 기존 `code_defect_handoff`는 바꾸지 않으며 이미 생긴 수정 Bead를 채택한다.',
  '   - 막힌 행에 Bead가 있으면 notes에 `자가 수리: <대화 사유> — 수정 Bead <ID>`를 남긴다. 같은 원인 반복 멈춤만 `blocks` 간선을 걸고, 실패 행은 수정 Bead의 `discovered-from` 출처 간선과 결과 줄로 연결한다. 수정 Bead가 Worker 대기열에 놓였거나 실행 중임을 읽어 확인한 뒤에만 `수정 대기`로 끝낸다. 생성·배치가 권한·주소 문제로 실패하면 만든 Bead를 그대로 두고 어디서 왜 실패했는지 붙여 질문으로 끝낸다. 이 단계는 승인 키를 쓰지 않는다.',
  '   - 머지 전 검증 보류는 base 쪽 원인일 때만 자가 수리한다. 진입 `상황`에 Worker가 실은 대기 가능 표지 `대기 가능: pre_merge_wait`가 있고, 이 PR의 변경 없이 같은 핀 base에서도 같은 검증이 실패하는 것을 위 재현으로 보여야 한다(세션 임시 디렉터리의 base 사본에서 실패한 검증이나 그 시험을 돌려 같은 오류를 얻거나 원인을 보여 주는 읽기 명령의 출력을 얻음; PR diff와 겹치지 않는다는 사실만으로는 확정하지 않는다). 위 세 조건에 더해 수정 Bead가 원 Bead와 같은 rig일 때만 위 채택/생성·인계 검토·Worker 배치와 notes 줄을 거친다. 배치 되읽기가 성공한 뒤 `bd update <원 Bead ID> --set-metadata base_red_followup=<수정 Bead ID> --json`으로 원 Bead에 연결을 쓰고(기존 값이 있으면 쉼표로 덧붙여 `<기존 값>,<수정 Bead ID>`), `bd show <원 Bead ID> --json`으로 되읽은 뒤에만 `수정 대기`로 끝낸다. `blocks` 간선은 걸지 않는다. 대기 가능 표지가 없거나, PR 자체 결함이거나, 조건이 하나라도 빠지거나, 원 Bead에 `auto_fix_for`가 있거나, 진입 `상황`에 대기 종료 꼬리 `대기 종료:`가 있으면 수정 Bead를 만들지 않고 아래처럼 한 번 묻는다(PR 자체 결함은 사용자 답 뒤 같은 PR 브랜치 수정 push 예외를 그대로 쓴다). 배치가 실패하면 만든 Bead를 그대로 두고 어디서 왜 실패했는지 붙여 묻는다.',
  '   - 같은 원인 반복 멈춤은 원인과 소유자를 재판정해 세션 손 밖 코드에 세 조건이 설 때만 위 선행 게이트로 보낸다. 세션 손 안 원인이거나 판정이 서지 않으면 묻고, 스스로 다른 접근을 골라 `워커가 이어감`을 쓰지 않는다.',
  '   - 75 조기 진단에서 재확인이 이미 통과했으면 사용자 답 없이 `나중에`로 닫는다. 아직 75로 막혔으면 해소 전망 판단 전에 선언과 실제 거부를 대조한다: 배포 대상 커밋의 선언·실행 기록(저장소 계약·설계 문서·스크립트 주석)에서 기대한 거부 사유·대상을 정하고 로그·거부 경로·대상/라이브 커밋 등 실제 입력과 비교한다. 주석과 상위 계약이 충돌하면 일치로 확정하지 않는다. `일치`·`불일치`·`불명`은 설명용이며 새 결과 줄·metadata 키·기계 enum이 아니다. `일치`이고 해소 근거가 있을 때만 Bead·사용자 답 없이 `나중에 · 조건 대기 — <근거>`로 닫는다(24시간 기한과 기한 뒤 대화는 유지). 근거에는 선언 일치를 확인한 조회 명령·관찰 결과와 해소 주체·시점을 포함한다. 로그 문장 하나나 예상 시각만으로는 대기하지 않는다.',
  '   - `불일치`면 해소 전망과 무관하게 기존 세 조건(재현·코드 소유·자동 등급)을 판정해 모두 서면 위 채택/생성·인계 검토·Worker 배치 되읽기를 거쳐 `수정 대기`, 하나라도 빠지면 한 번 묻는다. 불일치를 결함으로 보내려면 원인을 보여 주는 읽기 명령 또는 세션 임시 사본의 재현 명령과 출력을 직접 얻는다. diff와 교집합이 없다는 사실만으로 불일치를 확정하지 않는다. `불명`이면 확인 못 한 것을 붙여 한 번 묻고 조건 대기나 자동 수정의 근거로 쓰지 않는다. `일치`지만 해소 근거가 없으면 같은 세 조건을 판정해 모두 서면 위 인계·되읽기 뒤 `수정 대기`, 아니면 한 번 묻는다. 증거는 기존 진단 대화·기록에 남기며 새 로그 저장소·영수증·결과 줄 형식은 만들지 않는다. 진단 중 병행 재확인이 통과해도 이미 확인한 코드 결함을 단순 조건 해소로 바꾸지 않는다.',
  '   - 조건 하나라도 서지 않으면 무엇이 막혔거나 끝났고 사용자가 무엇을 정해야 하는지 한 문단으로 요약하고, 사용자가 정할 내용에만 선택지와 권고를 붙여 한 번만 묻는다. 원인 불명·자격 증명 필요·소유나 실행 결과 불명·권한 변경·설계 선택·라이브 상태 조치는 추측으로 Bead를 만들지 않고 질문한다. 실패 요약은 관찰한 사실과 원인 추정·확신 정도를 담는다. 진행 방식(Worker가 이어갈지, 이 대화에서 마무리할지)은 선택지로도 권고로도 내지 않는다. 아래 자동 진행 조건이 서면 묻지 않고 그 줄로 끝낸다. 답을 기다리는 질문 도구가 있으면 그것으로 묻고, 없으면 산문으로 묻고 턴을 끝낸다. 답을 기다리지 않는 비동기 질문 도구는 쓰지 않고, 도구로 물은 질문을 산문으로 다시 묻지 않는다. 턴이 끝나면 사용자 차례다.',
  '   - 자동 진행: 대상은 `워커가 이어감`이 "실패한 단계를 한 번 다시 돌린다"를 뜻하고 실패가 종결로 기록된 뒤 열리는 실패 대화다 — 저장소 작업 실패(수동 배포 실패, Worker가 dispatch한 quick_fix 착지의 자동 배포 실패), 사람 확인이 필요한 `post_merge_failure`, `post_merge_environment`, 정리 중단. 제외: `receipt_hold`, 머지 전 검증 보류, 머지 게이트 보류, 폐기 실패, dispatch 잔여물 처분 실패, `[deploy]` 종료 코드 75 조기 진단과 조건 대기, 모든 멈춤 대화, 외부 작업 완료 대화. 자가 수리 단계가 먼저다: 자가 수리 조건이 서면 `수정 대기`로 끝내고, 자가 수리 조건이 서지 않아 위처럼 질문으로 가는 지점에서 아래가 모두 서면 질문 대신 3의 `자동 진행` 줄로 끝낸다. (1) 원래 실행이 끝났고 실제 효과를 확인했다. (2) 원인이 실패한 단계 밖의 조건이고 지금은 사라졌음을 읽기 명령의 출력으로 직접 확인했다(추측이나 경과 시간만으로는 서지 않는다). (3) 재실행이 실패 기록의 단계·대상 커밋·선언 그대로다. 수동 배포처럼 재실행이 원격 base 끝을 다시 읽는 단계는 그 끝이 실패 기록의 대상 커밋과 같을 때만 선다. 검증을 건너뛰거나 낮추지 않는다. (4) 사용자가 정할 다른 내용이 없다(원인 불명·자격 증명·소유나 실행 결과 불명·권한 변경·설계 선택·라이브 상태 조치가 걸리면 묻는다). (5) 진입 `상황`에 `자동 진행: 소진` 표지가 없다. 모델을 바꿔 다시 검증하기, 검증 건너뛰기, 폐기, 설정 값 고르기는 입력이나 판정이 달라지는 선택이라 이 재실행이 아니므로 그대로 묻는다. 행에 Bead가 있으면 결과 줄을 쓰기 전에 notes에 `자동 진행: <대화 사유> — 실패 단계 재실행; 근거: <한 줄>` 한 줄을 남긴다(Bead 없는 행은 결과 줄만). 줄이 받아들여지지 않아 대화가 이어지면 같은 줄을 다시 쓰지 않고 묻는다.',
  '   - 예외: quick_fix Bead의 `## 결정 (ADR 후보)` 절이 새로 생기거나 바뀌거나, 그대로여도 유효한 `adr_approval`이 없으면 대화 사유(멈춤·실패·외부 작업 완료)와 무관하게 절 승인을 묻는다. Bead 없는 행·`spec_backed`·`full_plan`에는 적용하지 않고, 현재 절과 맞는 승인이 있으면 다시 묻지 않는다. 바뀐 description 전체는 세션 임시 디렉터리의 초안 파일에 쓰고 `check-adr-candidates.py --bead <id> --description-file <초안> --approval-digest`로 계산한다. 절이 그대로면 `--bead <id> --approval-digest`로 계산한다. 절 전문과 `절 다이제스트: <12 hex>` 한 줄을 싣고, 질문 도구가 있으면 승인 태그 질문(질문 한 문장과 마지막 줄 `입구 태그: adr_approval · <bead_id> · d=<12 hex> · 승인|수정|보류`, 보기 `승인`·`수정`·`보류`)으로, 없으면 산문 한 문장으로 묻고 턴을 끝낸다. 다른 선택도 함께 묻는다면 권고안의 절을 보여 준다. 사용자가 다른 안을 고르거나 절을 고쳐 답하면 승인이 아니므로 그 문안으로 초안·절 전문·다이제스트를 다시 준비해 묻는다. `수정` 답이면 무엇을 고칠지 산문으로 묻고, 고친 절과 새 다이제스트를 보여 준 뒤 새 태그로 다시 묻는다. `보류` 답이면 아무것도 쓰지 않고 `나중에`로 끝낸다.',
  '   - 일시정지: `멈춤 paused`(사용자가 Worker 실행을 일시정지함) 대화는 위 자가 수리와 질문을 건너뛴다. 멈춘 지점과 남은 일을 요약하고 사용자 지시를 기다린 뒤, 지시에 따라 구현 워크트리 안의 수정과 로컬 검증을 이 대화에서 계속한다. 지시 하나를 결정으로 보아 2의 `워커가 이어감`으로 닫지 않고, 위 ADR 절 승인 예외의 답 턴도 기록 뒤 `워커가 이어감`으로 닫지 않고 대화를 잇는다. 결과 줄은 사용자가 Worker로 넘기라고 할 때 `워커가 이어감`, 여기서 끝까지 가라고 할 때 `이 대화에서 마무리`, 나중에 보겠다고 할 때 `나중에`다. `대화 결정:` 줄은 Worker로 넘기는 턴과 위 ADR 절 승인 답 턴에만 남긴다.',
  '2. 답이 결정을 주면 notes에 `대화 결정: <대화 사유> — 사용자 답: <원문>` 한 줄을 남긴다. Bead 없는 저장소 작업 행이면 이 줄을 건너뛰고 결정은 결과 줄에만 남긴다. 결정을 확인하는 데 필요한 읽기·진단·워크트리 안 로컬 수정·로컬 검증은 이 대화에서 해도 된다. 그리고 같은 턴을 `워커가 이어감`으로 끝낸다(결정이 행을 그대로 두는 것이거나 3의 `나중에` 조건이면 `나중에`로). 이미 받은 결정을 다시 확인하는 질문("확인해 주실 것" 같은 목록 포함)을 덧붙이지 않는다. 결정의 적용(스펙 정정·발행·영수증·해제·push)은 `워커가 이어감` 뒤 Worker가 하고, 대화가 직접 적용하려고 `이 대화에서 마무리`를 권하지 않는다. `이 대화에서 마무리`는 사용자의 말이 이 대화에서 끝까지 하라고 할 때만 쓴다(예: "여기서 끝까지 해"). 보기를 고른 답은 그 근거가 아니다.',
  '   - quick_fix ADR 절을 보여 준 그대로 조건 없이 승인한 사용자 산문 답(중계 답 포함)이나 승인 태그 질문의 `승인` 보기 답이면 위 `대화 결정:` notes 기록 → 절이 바뀌었을 때만 초안 파일로 description 갱신(초안이 비어 있으면 쓰지 않는다) → `check-adr-candidates.py --bead <id> --approval-digest` 재계산 순서다. 보여 준 다이제스트와 같을 때만 `bd update <id> --set-metadata adr_approval=user@<digest> --json`을 쓰고 `bd show <id> --json`으로 값을 되읽은 뒤 `워커가 이어감 · <결정 한 줄>`로 끝낸다. 다이제스트가 다르면 키를 쓰지 않고 새 절과 다이제스트를 보여 주고 다시 묻는다. 가드가 승인 태그 질문 답의 쓰기를 거부하면 같은 절과 다이제스트를 보인 산문 한 문장으로 한 번 다시 묻는다. 산문 답 턴의 쓰기를 가드가 거부하면 재시도 없이 `나중에 · adr_approval 기록이 가드에 거부됨 — <사유>`로 끝낸다. 이 승인 답 턴에는 `awaiting_user` 해제·다른 영수증(`quick_fix_review`·`impl_review`·`spec_review`)·Bead 상태·ADR 파일·구현 파일을 쓰지 않는다. Worker는 `adr_approval`을 쓰지 않는다.',
  '3. 대화를 끝내는 턴의 마지막 메시지 첫 줄에 결과 줄 하나를 쓴다.',
  '   - `워커가 이어감 · <결정 한 줄>`: Worker가 이 행을 잇는다. 멈춤이면 이 세션을 무인으로 이어받아 결정의 적용·영수증·해제·발행·push·보고를 하고, 실패면 실패한 단계를 한 번 다시 돌리며(사용자 답이 그 클릭의 권한이다), 외부 작업 완료면 이 세션에서 Worker attempt를 시작한다. 머지 게이트 보류는 사람의 `[머지]`만 풀므로 `워커가 이어감`이 아니라 `나중에`로 끝낸다.',
  '   - `이 대화에서 마무리 · <한 줄>`: 사용자가 이 대화에서 끝까지 가겠다고 명시했을 때만. 그 뒤 이 세션은 대화형 세션 규칙으로 finish까지 간다.',
  '   - `나중에 · <한 줄>`: 사용자가 나중에 보겠다고 했을 때, 또는 1의 75 조기 진단 예외일 때. 대화를 끝내고 그 행은 그대로 남는다.',
  '   - `수정 대기 · <수정 Bead ID> — <원인 한 줄>`: 자가 수리 단계만 쓰는, 사용자 답 없이 쓸 수 있는 두 상태 변경 결과 줄 중 하나다(다른 하나는 아래 `자동 진행`). 수정 Bead가 착지·배포를 거쳐 닫히면 Worker가 한 번 이어 간다: 실패 행은 `[정리 재시도]`처럼 실패한 잡·배포·정리 단계만, 75 사슬은 간격을 기다리지 않고 재확인, 같은 원인 반복 멈춤은 무인 재개한다. 착지 없이 닫힘(`refuted`·`no-delta`·폐기), 48시간 초과, 같은 실패로 끝난 재실행은 사람 출구로 돌아가 알림·대화를 열고 다시 수리하지 않고 질문한다. 다른 실패는 새 실패 정체다. 머지 전 검증 보류의 `수정 대기`는 이 재실행과 수정 대기 기한을 쓰지 않고, 원 Bead `base_red_followup` 연결을 읽은 Worker가 그 보류를 `pre_merge_wait`로 옮겨 이어 간다(출구·48시간 상한·(PR, head)당 한 번은 그 대기의 것). 그 대기가 보류로 끝나면 Worker가 알림과 대화를 한 번 더 열고, 그 대화는 다시 수리하지 않고 묻는다.',
  '   - `자동 진행 · 실패 단계 재실행 — <원인이 사라졌다는 근거 한 줄> — 되돌리기: 없음 — <사유 한 줄>`: 1의 자동 진행 조건이 선 실패 대화만 쓴다. Worker가 실패한 단계를 한 번 다시 돌리며(`워커가 이어감`의 재실행과 같은 단계), 권한은 사용자 답이 아니라 승인된 스펙 결정이다. 같은 실패 정체에 한 번만 쓰고 beads-ui가 그 한도와 줄의 형식·실패 종류·실패 정체·재실행 입력이 실패 기록과 같은지를 검사한다. 그 한도를 쓴 뒤 같은 실패로 다시 열린 대화는 진입 `상황`에 `자동 진행: 소진 — 같은 실패 재발`을 싣고, 그 표지가 있으면 자동 진행 없이 묻는다.',
  '   결과 줄 없이 끝난 턴은 사용자 답을 기다리는 턴이다.',
  '',
  '금지(마무리 전): push·PR·발행·배포·릴리스(예외: 머지 전 검증 보류의 같은 PR 브랜치 수정 커밋 push) · 머지·폐기 실행, Worker 큐 상태 편집, 실패 기록 삭제 · Bead 상태 변경 · metadata 영수증 쓰기와 `awaiting_user` 해제(예외: 사용자 답 턴에서만 쓸 수 있는 `plan_approval=user@<sha>`와, 그와 같은 쓰기로 하는 `awaiting_user` 해제; 추가 예외: 1의 자동 진행 조건이 선 실패 대화의 `자동 진행:` notes 한 줄; 추가 예외: quick_fix ADR 절 승인 답 턴(산문·중계 답 턴 또는 승인 태그 질문의 `승인` 보기 답 턴)의 description 절 갱신과 `adr_approval=user@<절 다이제스트>`, `awaiting_user` 해제와 다른 영수증은 쓰지 않음) · 외부 리뷰어 dispatch · 공급자 세션 상태 파일 직접 수정 · 중첩 헤드리스 세션 기동. 자가 수리 단계만의 예외: 대상 rig의 `bd create`·수정 Bead 본문·인계 영수증·`route` 핀·출처 간선, 그 수정 Bead 하나의 Worker 대기열 배치, 위 notes 줄, 같은 원인 반복 멈춤의 `blocks` 간선, 머지 전 검증 보류의 base 쪽 원인 갈래에서 배치 되읽기 뒤 원 Bead `base_red_followup` 쓰기만 허용한다. 막힌 행의 상태·큐·실패 기록과 그 밖의 금지는 그대로다.'
].join('\n');

/** The server-owned slots; every other `<…>` belongs to the session. */
const SLOT_REASON_LINE =
  '- 대화 사유: <멈춤 awaiting_user=<값> | 멈춤 recovery:<authority|no_progress|credential> | 멈춤 recovery:<옛 사유> (옛 기록) | 멈춤 paused | 실패 <클래스> · <원인 코드> | 외부 작업 완료 <wait_id>>';
const SLOT_REASON = '<대화 사유>';
const SLOT_SITUATION_LINE =
  '- 상황: <세션이 남긴 문장 | 일시정지 문장 | 실패 진단 | 외부 작업 완료 블록>';
const SLOT_WORKTREE = '- 구현 워크트리: <path>';
const SLOT_CHECKOUT = '- target_base 체크아웃: <path>';

/**
 * The `대화 사유` of a 멈춤 conversation: the stop label
 * (`session-stall.js` `conversationStopLabel`) under the kind word, or null
 * when no label could be read.
 *
 * @param {string|null|undefined} stop
 * @returns {string|null}
 */
export function stopConversationReason(stop) {
  return typeof stop === 'string' && stop.length > 0 ? `멈춤 ${stop}` : null;
}

/**
 * The `대화 사유` of a 실패 conversation: `실패 <클래스> · <원인 코드>`.
 *
 * @param {{ failure_class: string, reason: string }} failure
 * @returns {string}
 */
export function failureConversationReason(failure) {
  return `실패 ${failure.failure_class} · ${failure.reason}`;
}

/**
 * The `대화 사유` an 외부 작업 완료 conversation prints: the kind words and
 * the completed wait's id.
 *
 * @param {string} wait_id
 * @returns {string}
 */
export function externalConversationReason(wait_id) {
  return `외부 작업 완료 ${wait_id}`;
}

/**
 * Fill the entry block's server-owned slots in ONE pass, so an inserted value
 * that quotes a slot is never rescanned. `<대화 사유>` stands in several
 * places (the opening sentence, the self-repair note, the automatic proceed
 * rule, and step 2) and takes the same value everywhere; the two `<path>`
 * slots are told apart by their line prefix. The three launchers share this
 * one filler (UI-18a5 §3.3).
 *
 * @param {{ reason: string|null, situation: string|null, worktree: string|null, checkout: string|null }} input
 * @returns {string}
 */
export function fillConversationEntry(input) {
  const reason = input.reason || ABSENT;
  /** @type {Map<string, string>} */
  const values = new Map([
    [SLOT_REASON_LINE, `- 대화 사유: ${reason}`],
    [SLOT_REASON, reason],
    [SLOT_SITUATION_LINE, `- 상황: ${input.situation || ABSENT}`],
    [SLOT_WORKTREE, `- 구현 워크트리: ${input.worktree || ABSENT}`],
    [SLOT_CHECKOUT, `- target_base 체크아웃: ${input.checkout || ABSENT}`]
  ]);
  const pattern = new RegExp(
    [...values.keys()]
      .map((slot) => slot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g'
  );
  return CONVERSATION_ENTRY_BLOCK.replace(
    pattern,
    (slot) => values.get(slot) ?? slot
  );
}

/**
 * The sentence a park left: the last notes line naming this park's value,
 * else the last `park:` line, printed as-is.
 *
 * @param {unknown} notes
 * @param {string} awaiting_user
 * @returns {string|null}
 */
export function parkSentence(notes, awaiting_user) {
  if (typeof notes !== 'string' || notes.length === 0) {
    return null;
  }
  const lines = notes.split('\n').map((line) => line.trim());
  const own = lines.filter((line) => line.startsWith(`park: ${awaiting_user}`));
  if (own.length > 0) {
    return own[own.length - 1];
  }
  const any = lines.filter((line) => line.startsWith('park:'));
  return any.length > 0 ? any[any.length - 1] : null;
}

/**
 * The `상황` of a person's own pause (UI-6kj0 §3.3): the session asked
 * nothing, so beads-ui states the one fact it knows. Exported for tests.
 */
export const PAUSED_SITUATION =
  '사용자가 Worker 실행을 일시정지했다 — 세션이 묻던 질문은 없다';

/**
 * The blocker sentence a recovery wait left: the summary's first line without
 * its leading `blocker:`.
 *
 * @param {unknown} summary
 * @returns {string|null}
 */
export function recoverySentence(summary) {
  if (typeof summary !== 'string') {
    return null;
  }
  const first = summary
    .split('\n')[0]
    .replace(/^blocker:\s*/, '')
    .trim();
  return first.length > 0 ? first : null;
}

/**
 * @typedef {Object} InquiryOutcome
 * @property {boolean} launched
 * @property {'launched'|'already_running'|'not_launched'} session
 * @property {string|null} reason
 * @property {'resume'|'fresh'} mode
 * @property {'attempt'|'fresh'} [source]
 * @property {string|null} fallback_reason
 * @property {string|null} session_id
 * @property {'claude'|'codex'|'agy'} runner - The provider the window actually runs.
 * The attempt's own runner for a same-session conversation; a fresh fallback
 * keeps the same provider.
 * @property {string|null} command
 * @property {boolean} bridge_active
 * @property {import('./tmux-launcher.js').LaunchPlacement|null} [placement] -
 * Where the window actually opened or was found; null when not launched.
 * @property {string|null} tmux_session
 * @property {string|null} tmux_window
 * @property {string|null} [stop] - The stop label the entry block printed.
 * @property {string|null} [sentence] - The session's own sentence.
 */

// Re-exported rather than re-implemented: the wrapper's quoting is the shared
// launcher's, and this module's own tests still assert it here.
export { shellQuote };

/**
 * The one-line shell command the conversation pane runs.
 *
 * `set-option` comes FIRST and the two commands are joined by `&&`: a marker
 * that cannot be written never reaches the `exec`, so the runner does not
 * start and the pane closes.
 *
 * @param {{ bead_id: string, claude: string, prompt: string }} input
 * @returns {string}
 */
export function inquiryWrapper(input) {
  return markerWrapper({
    marker: PANE_MARKER,
    key: input.bead_id,
    argv: [input.claude, input.prompt]
  });
}

/**
 * @typedef {Object} DirectionInquiryDeps
 * @property {import('./session-launch-accounts.js').ResolveSessionAccounts} [resolveSessionAccounts]
 * @property {() => any} getConfig - Runtime config accessor (server/config.js).
 * @property {{ readIssue: (workspace: string, bead_id: string) => Promise<any> }} bd
 * @property {{ conversationConfirm?: (input: any) => Promise<unknown>|unknown }} notifier
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runTmux]
 * @property {import('./tmux-launcher.js').TmuxLauncherDeps['runSessionHub']} [runSessionHub]
 * @property {() => string|null} [resolveClaude]
 * @property {(runner: string) => string|null} [resolveRunner]
 * @property {(workspace: string, issue: any) => 'claude'|'codex'|'agy'|null} [currentRunner]
 * @property {(file_path: string) => { mtimeMs: number }} [statFile]
 * @property {() => number} [now]
 * @property {{ recordInteractiveSession: (workspace: string, record: any) => ({ ok: boolean }|void) }} [store]
 * @property {(...args: any[]) => void} [log]
 * @property {string} [heartbeatPath]
 * @property {{ home_dir?: string, hostname?: string, fs?: any, now?: () => number }} [sessionRefOptions]
 * @property {(workspace: string, attempt_id: string) => any|Promise<any>} [readAttempt] - Injected queue-store lookup; omission reads as unavailable rather than importing the runtime back through a cycle.
 * @property {(workspace: string, bead_id: string) => boolean} [handoffPending] - Injected queue-store judgment (`holdsHandoffReservation`): whether this Bead's inquiry record still holds an unsettled handoff reservation. Omission reads as none pending; the store's own write guard still refuses the overwrite.
 * @property {(workspace: string, attempt_id: string) => boolean} [attemptSpent] - Injected queue-store judgment: whether a child attempt already carries this one as `resumed_from`. A paused conversation (UI-6kj0 §3.3) opens only on an unspent pause; omission reads as unspent.
 * @property {(pid: number) => { ok: true, identity: { pid: number, process_started_at: number } }|{ ok: false, reason: string }} [observeProcess]
 * @property {(file_path: string) => boolean} [existsSync]
 * @property {(config_enabled: boolean) => boolean} [autoLaunchEnabled] - The
 * shared switch over config.toml's own reading (UI-jbl1 §3.4).
 * @property {() => import('../conversation-settings.js').ConversationSettingValues} [conversationSettings] -
 * Read per launch for a fresh fallback's runtime.
 * @property {(runner: string) => string[]} [launchFlags] - Passed to the
 * launcher; defaults to the stored settings' model/effort flags.
 * @property {import('./tmux-launcher.js').TmuxLauncherDeps['agyModels']} [agyModels] -
 * Passed to the launcher; defaults to the process-wide agy model list.
 */

/**
 * Build the conversation launcher.
 *
 * @param {DirectionInquiryDeps} deps
 */
export function createDirectionInquiry(deps) {
  const log = deps.log || default_log;
  const observeProcess = deps.observeProcess || observeProcessIdentity;
  const existsSync =
    deps.existsSync || ((/** @type {string} */ p) => fs.existsSync(p));
  const launcher = createTmuxLauncher({
    ...(deps.runTmux ? { runTmux: deps.runTmux } : {}),
    ...(deps.runSessionHub ? { runSessionHub: deps.runSessionHub } : {}),
    ...(deps.resolveClaude ? { resolveClaude: deps.resolveClaude } : {}),
    ...(deps.resolveRunner ? { resolveRunner: deps.resolveRunner } : {}),
    ...(deps.statFile ? { statFile: deps.statFile } : {}),
    ...(deps.now ? { now: deps.now } : {}),
    ...(deps.heartbeatPath ? { heartbeatPath: deps.heartbeatPath } : {}),
    ...(deps.launchFlags ? { launchFlags: deps.launchFlags } : {}),
    ...(deps.agyModels ? { agyModels: deps.agyModels } : {}),
    log
  });
  const autoLaunchEnabled =
    deps.autoLaunchEnabled || conversationAutoLaunchEnabled;
  // Reserve a bead synchronously before either public entry reaches its first
  // `await`. Otherwise two calls in one tick both observe no owner and launch
  // duplicate panes before either can publish its marker. A paused attempt's
  // resume takes this SAME reservation (UI-6kj0 §3.3) through `reserve`, so a
  // launch and a resume of one Bead can never both proceed.
  /** @type {Set<string>} */
  const in_flight = new Set();

  /** Read automatic enablement and the shared tmux session name. */
  function readInquiryConfig() {
    /** @type {any} */
    let section;
    try {
      section = deps.getConfig()?.worker_direction_inquiry;
    } catch (err) {
      // Broken config cannot prove automatic launch was authorized. Read it as
      // disabled while retaining the default socket name for click responses.
      log('config read failed: %o', err);
      return { enabled: false, tmux_session: DEFAULT_INQUIRY_TMUX_SESSION };
    }
    const name = section?.tmux_session;
    /** @type {boolean} */
    let enabled = false;
    try {
      enabled = autoLaunchEnabled(section?.enabled === true) === true;
    } catch (err) {
      log('conversation switch read failed: %o', err);
    }
    return {
      enabled,
      tmux_session:
        typeof name === 'string' && name.length > 0
          ? name
          : DEFAULT_INQUIRY_TMUX_SESSION
    };
  }

  /**
   * Read an attempt through the injected queue-store seam.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   */
  async function readAttempt(workspace, attempt_id) {
    try {
      if (!deps.readAttempt) {
        return null;
      }
      return await deps.readAttempt(workspace, attempt_id);
    } catch (err) {
      log('attempt read failed for %s: %o', attempt_id, err);
      return null;
    }
  }

  /**
   * The runner current execution settings name, without an attempt's own
   * session to follow. A name that is no registered runner is null, never
   * Claude (UI-6o70); with no resolver injected the lane default is claude.
   *
   * @param {string} workspace
   * @param {any} issue
   * @returns {'claude'|'codex'|'agy'|null}
   */
  function currentRunnerOf(workspace, issue) {
    if (typeof deps.currentRunner !== 'function') {
      return 'claude';
    }
    const runner = deps.currentRunner(workspace, issue);
    return runner === 'claude' || runner === 'codex' || runner === 'agy'
      ? runner
      : null;
  }

  /**
   * Choose the attempt's own session, else a fresh session of the same
   * provider. The worktree must exist too: Claude resolves `--resume` by the
   * cwd's project, so the session cannot be reopened anywhere else.
   *
   * @param {string} workspace
   * @param {any} issue
   * @param {any} attempt
   * @param {boolean} worktree_present
   * @returns {{ session_id: string|null, runner: 'claude'|'codex'|'agy'|null, source: 'attempt'|'fresh', fallback_reason: string|null }}
   * `runner` is null when the settings name no registered runner (UI-6o70).
   */
  function conversationTarget(workspace, issue, attempt, worktree_present) {
    const own = qualifyAttemptSession({
      attempt,
      options: deps.sessionRefOptions || {}
    });
    const runner = own.provider ?? currentRunnerOf(workspace, issue);
    if (own.ok && worktree_present) {
      return {
        session_id: own.session_id,
        runner,
        source: 'attempt',
        fallback_reason: null
      };
    }
    // A fresh fallback takes the configured runtime (UI-jbl1 §3.4); the
    // attempt's own session above always keeps its runtime.
    /** @type {'claude'|'codex'|'agy'|null} */
    let fresh_runner = runner;
    try {
      fresh_runner = freshConversationRuntime(
        (deps.conversationSettings || getConversationSettings)(),
        runner
      );
    } catch (err) {
      log('conversation settings read failed: %o', err);
    }
    return {
      session_id: null,
      runner: fresh_runner,
      source: 'fresh',
      fallback_reason: own.ok ? 'worktree_missing' : own.reason
    };
  }

  /**
   * One process per session id: the attempt's runner must be proven gone.
   * A recycled pid (different start time) is gone too.
   *
   * @param {any} attempt
   * @returns {string|null} The refusal reason, or null when the launch may go.
   */
  function runnerLivenessRefusal(attempt) {
    const identity = attempt?.process_identity;
    if (!identity || typeof identity.pid !== 'number') {
      return null;
    }
    /** @type {ReturnType<typeof observeProcessIdentity>} */
    let observed;
    try {
      observed = observeProcess(identity.pid);
    } catch (err) {
      log('runner observation failed for %s: %o', attempt.attempt_id, err);
      return 'runner_liveness_unknown';
    }
    if (!observed.ok) {
      return observed.reason === 'process_gone'
        ? null
        : 'runner_liveness_unknown';
    }
    const started_at = identity.started_at;
    if (
      typeof started_at === 'number' &&
      Math.abs(observed.identity.process_started_at - started_at) >
        DEFAULT_START_TOLERANCE_MS
    ) {
      return null;
    }
    return 'runner_alive';
  }

  /**
   * Create a uniform not-launched response.
   *
   * @param {string} reason
   * @param {{ stop?: string|null, sentence?: string|null, runner?: 'claude'|'codex'|'agy' }} [facts]
   * @returns {InquiryOutcome}
   */
  function refusal(reason, facts = {}) {
    return {
      launched: false,
      session: 'not_launched',
      reason,
      mode: 'fresh',
      fallback_reason: null,
      session_id: null,
      runner: facts.runner ?? 'claude',
      command: null,
      bridge_active: launcher.bridgeActive(),
      placement: null,
      tmux_session: null,
      tmux_window: null,
      stop: facts.stop ?? null,
      sentence: facts.sentence ?? null
    };
  }

  /**
   * Map the shared launcher result to the click response contract. The window
   * coordinates are the launcher's, since it alone chose the session.
   *
   * @param {import('./tmux-launcher.js').LaunchOutcome} outcome
   * @param {{ session_id: string|null, runner: 'claude'|'codex'|'agy', source: 'attempt'|'fresh', fallback_reason: string|null }} target
   * @param {{ tmux_session: string, bead_id: string, stop: string, sentence: string|null }} place
   * @param {string|null} launch_session_id
   * @returns {InquiryOutcome}
   */
  function inquiryOutcome(outcome, target, place, launch_session_id) {
    const same = target.session_id !== null;
    return {
      launched: outcome.session === 'launched',
      session: outcome.session,
      reason: outcome.session === 'not_launched' ? outcome.reason : null,
      mode: same ? 'resume' : 'fresh',
      source: target.source,
      fallback_reason: target.fallback_reason,
      session_id: same ? target.session_id : launch_session_id,
      runner: target.runner,
      command: same
        ? target.runner === 'codex'
          ? `codex resume ${shellQuote(/** @type {string} */ (target.session_id))}`
          : target.runner === 'agy'
            ? `agy --conversation ${shellQuote(/** @type {string} */ (target.session_id))}`
            : `claude --resume ${shellQuote(/** @type {string} */ (target.session_id))}`
        : target.runner === 'claude'
          ? `claude --session-id ${shellQuote(/** @type {string} */ (launch_session_id))}`
          : target.runner,
      bridge_active: launcher.bridgeActive(),
      placement:
        outcome.session === 'not_launched' ? null : (outcome.placement ?? null),
      tmux_session:
        outcome.session === 'not_launched'
          ? null
          : (outcome.tmux_session ?? place.tmux_session),
      tmux_window:
        outcome.session === 'not_launched'
          ? null
          : (outcome.tmux_window ?? place.bead_id),
      stop: place.stop,
      sentence: place.sentence
    };
  }

  /**
   * Build and launch one conversation.
   *
   * @param {any} input
   * @param {boolean} automatic
   * @returns {Promise<{ outcome: InquiryOutcome, title: string|null, repo: string, stop: string|null }>}
   */
  async function dispose(input, automatic) {
    const workspace = String(input.workspace ?? '');
    const bead_id = String(input.bead_id ?? '');
    const attempt_id = String(input.attempt_id ?? '');
    const awaiting_user = String(input.awaiting_user ?? '');
    const repo =
      typeof input.repo === 'string' && input.repo.length > 0
        ? input.repo
        : workspace;
    // A person's own pause opens only from a click (UI-6kj0 §3.3): pausing
    // launches nothing, so the automatic path never reads this flag.
    const paused = !automatic && input.paused === true;
    const attempt = await readAttempt(workspace, attempt_id);
    const recovery = paused
      ? null
      : (input.recovery ?? attempt?.cause_detail?.recovery ?? null);
    const stop = paused
      ? conversationStopLabel({ paused: true })
      : (conversationStopLabel({
          awaiting_user,
          recovery,
          blockers: attempt?.cause_detail?.blockers || []
        }) ??
        // A click may open any recovery wait; its label names the reason as is.
        (typeof recovery?.reason === 'string'
          ? `recovery:${recovery.reason}`
          : null));
    /** @type {any} */
    let issue = null;
    try {
      issue = await deps.bd.readIssue(workspace, bead_id);
    } catch (err) {
      log('bd read failed for %s: %o', bead_id, err);
    }
    const sentence = paused
      ? PAUSED_SITUATION
      : awaiting_user
        ? parkSentence(issue?.notes, awaiting_user)
        : recoverySentence(attempt?.cause_detail?.summary);
    const facts = { stop, sentence };
    if (!issue || typeof issue !== 'object') {
      return {
        outcome: refusal('bd_unavailable', facts),
        title: null,
        repo,
        stop
      };
    }
    const title = typeof issue.title === 'string' ? issue.title : null;
    const attempt_repo =
      typeof attempt?.repo === 'string' && attempt.repo.length > 0
        ? attempt.repo
        : null;
    if (!attempt || attempt_repo === null) {
      return {
        outcome: refusal('attempt_unavailable', facts),
        title,
        repo,
        stop
      };
    }
    // Read under the reservation: a resume that minted its child before this
    // click reserved has spent the pause, and a resume racing it now is
    // refused by that same reservation (UI-6kj0 §3.3).
    if (
      paused &&
      (!isUserPausedAttempt(attempt) ||
        deps.attemptSpent?.(workspace, attempt_id) === true)
    ) {
      return { outcome: refusal('not_paused', facts), title, repo, stop };
    }
    const worktree = path.join(attempt_repo, '.worktrees', bead_id);
    const checkout = attempt_repo;
    const config = readInquiryConfig();
    if (automatic && !config.enabled) {
      return { outcome: refusal('disabled', facts), title, repo, stop };
    }
    const worktree_present = existsSync(worktree);
    const chosen = conversationTarget(
      workspace,
      issue,
      attempt,
      worktree_present
    );
    if (chosen.runner === null) {
      return { outcome: refusal(UNKNOWN_RUNNER, facts), title, repo, stop };
    }
    const target = { ...chosen, runner: chosen.runner };
    if (target.session_id !== null) {
      const refused = runnerLivenessRefusal(attempt);
      if (refused !== null) {
        return {
          outcome: refusal(refused, { ...facts, runner: target.runner }),
          title,
          repo,
          stop
        };
      }
    }
    const account_options = await resolveSessionLaunchOptions(
      deps.resolveSessionAccounts,
      workspace,
      bead_id,
      target.runner
    );
    // A handoff reservation belongs to the reconcile pass that continues it
    // (UI-nuwy §3.4). Checked with no await left before the launch, so a new
    // window can neither reopen the handed-off session nor replace the record.
    if (deps.handoffPending?.(workspace, bead_id) === true) {
      return {
        outcome: refusal('handoff_pending', {
          ...facts,
          runner: target.runner
        }),
        title,
        repo,
        stop
      };
    }
    const reason = stopConversationReason(stop);
    const block = fillConversationEntry({
      reason,
      situation:
        [
          sentence,
          recovery?.self_repair_exhausted
            ? `자가 수리: 소진 — ${recovery.self_repair_exhausted}`
            : ''
        ]
          .filter(Boolean)
          .join('\n') || null,
      worktree,
      checkout
    });
    const launch_session_id =
      target.session_id === null && target.runner === 'claude'
        ? randomUUID()
        : null;
    // agy takes its first input through `-i`; its conversation id is read
    // from the hub later, like codex's (UI-ufgo Phase 4).
    const command_args =
      target.runner === 'agy'
        ? agyConversationArgs({
            conversation_id: target.session_id,
            prompt: block
          })
        : target.session_id !== null
          ? target.runner === 'codex'
            ? ['resume', target.session_id, block]
            : ['--resume', target.session_id, block]
          : target.runner === 'claude'
            ? ['--session-id', /** @type {string} */ (launch_session_id), block]
            : [block];
    const cwd = worktree_present ? worktree : checkout;
    // Both open in the inquiry session; only a click selects the window
    // (UI-1fss §4.4).
    const launched = await launcher.launch({
      ...account_options,
      marker: PANE_MARKER,
      key: bead_id,
      tmux_session: config.tmux_session,
      window_name: bead_id,
      cwd,
      commandArgs: command_args,
      runner: target.runner,
      placement: automatic ? 'inquiry' : 'user'
    });
    if (launched.session === 'launched') {
      let recorded = true;
      try {
        const launched_at = deps.now ? deps.now() : Date.now();
        const session_id = target.session_id ?? launch_session_id;
        if (deps.store) {
          const stored = deps.store.recordInteractiveSession(workspace, {
            bead_id,
            kind: 'inquiry',
            provider: target.runner,
            session_id,
            session_id_source: session_id === null ? null : 'launch',
            mode: target.session_id === null ? 'fresh' : 'resume',
            source: target.source,
            forked_from: null,
            fallback_reason: target.fallback_reason,
            attempt_id: attempt_id || null,
            failure_class: null,
            tmux_session: launched.tmux_session,
            tmux_window: launched.tmux_window,
            pane_id: launched.pane_id,
            cwd,
            launched_at,
            last_seen_alive_at: launched_at,
            settled_at: null,
            settled_by: null,
            state: 'live',
            exit_requested_at: null,
            defer_since: null,
            ...(typeof launched.codex_project_untrusted === 'boolean'
              ? { codex_project_untrusted: launched.codex_project_untrusted }
              : {}),
            conversation: {
              stop: reason ?? ABSENT,
              wait_id: null,
              processed_message_at: null,
              message_excerpt: null,
              result: null,
              handoff: null,
              takeover_notified_at: null
            }
          });
          recorded = stored?.ok !== false;
        } else {
          log('interactive session store unavailable for %s', bead_id);
        }
      } catch (err) {
        recorded = false;
        log('interactive session record failed for %s: %o', bead_id, err);
      }
      if (paused && !recorded) {
        // Once the reservation is released only this record refuses a paused
        // resume, so a window without one would share its session with that
        // resume (UI-6kj0 §3.3): close it and report the click refused.
        try {
          await launcher.killWindow(
            launched.tmux_session,
            launched.tmux_window
          );
        } catch (err) {
          log('unrecorded paused window close failed for %s: %o', bead_id, err);
        }
        return {
          outcome: refusal('record_failed', facts),
          title,
          repo,
          stop
        };
      }
    }
    return {
      outcome: inquiryOutcome(
        launched,
        target,
        {
          tmux_session: config.tmux_session,
          bead_id,
          stop: stop ?? ABSENT,
          sentence
        },
        launch_session_id
      ),
      title,
      repo,
      stop
    };
  }

  /**
   * Send the one `🙋 확인 필요` notification, no-throw.
   *
   * @param {Record<string, unknown>} input
   */
  async function announce(input) {
    try {
      await deps.notifier.conversationConfirm?.(input);
    } catch (err) {
      // Production notifier is no-throw; injected test/embedding fakes are not
      // bound by that contract and still must not fail attempt settlement.
      log('conversation confirm notify failed: %o', err);
    }
  }

  return {
    /**
     * Launch automatically after the stopped record is durable, then send the
     * `🙋 확인 필요` notification unless the caller already spent it for this
     * attempt (`confirm: false`).
     *
     * @param {{ workspace: string, bead_id: string, attempt_id: string, repo: string|null, target_base: string|null, awaiting_user: string|null, recovery?: { reason: string }, confirm?: boolean }} input
     * @returns {Promise<InquiryOutcome|undefined>}
     */
    async onParkedAttempt(input) {
      const bead_id =
        input && typeof input.bead_id === 'string' ? input.bead_id : '';
      const awaiting_user =
        input && typeof input.awaiting_user === 'string'
          ? input.awaiting_user
          : '';
      if (
        bead_id.length === 0 ||
        (awaiting_user.length === 0 && !input.recovery?.reason)
      ) {
        return undefined;
      }
      if (in_flight.has(bead_id)) {
        return refusal('inquiry_in_flight');
      }
      in_flight.add(bead_id);
      try {
        const result = await dispose(input, true);
        if (input.confirm !== false) {
          await announce({
            bead_id,
            title: result.title,
            awaiting_user: awaiting_user || null,
            repo: result.repo,
            ...result.outcome,
            stop: result.stop
          });
        }
        return result.outcome;
      } catch (err) {
        log('conversation launch failed for %s: %o', bead_id, err);
        return refusal('error');
      } finally {
        in_flight.delete(bead_id);
      }
    },

    /**
     * Launch from the stopped tile without consulting `enabled`.
     *
     * The liveness question is answered by the pane marker BEFORE any Bead or
     * attempt read: a `bd` that cannot be reached must not hide a session
     * that is already up, and the module reservation is not that evidence —
     * it is held while the launch is still being built, and that can still
     * end in a refusal, so answering `already_running` from it would name a
     * window nobody opened.
     *
     * A `paused` input is a person's own pause (UI-6kj0 §3.3): no question,
     * the stop label `paused`, and the attempt must still be that unspent
     * pause when read under the reservation.
     *
     * @param {{ workspace: string, bead_id: string, attempt_id: string, repo: string|null, awaiting_user: string|null, recovery?: { reason: string }, paused?: boolean }} input
     * @returns {Promise<InquiryOutcome>}
     */
    async launchForClick(input) {
      const bead_id =
        input && typeof input.bead_id === 'string' ? input.bead_id : '';
      const awaiting_user =
        input && typeof input.awaiting_user === 'string'
          ? input.awaiting_user
          : '';
      if (
        bead_id.length === 0 ||
        (awaiting_user.length === 0 &&
          !input.recovery?.reason &&
          input.paused !== true)
      ) {
        return refusal('invalid_park');
      }
      const focused = await launcher.focusRunning({
        marker: PANE_MARKER,
        key: bead_id,
        tmux_session: readInquiryConfig().tmux_session,
        window_name: bead_id,
        placement: 'user'
      });
      if (!focused.ok) {
        return refusal('tmux_unavailable');
      }
      const live = focused.outcome;
      if (live && live.session === 'already_running') {
        return {
          ...refusal('already_running'),
          session: 'already_running',
          reason: null,
          placement: live.placement ?? null,
          tmux_session: live.tmux_session ?? null,
          tmux_window: live.tmux_window ?? bead_id
        };
      }
      if (in_flight.has(bead_id)) {
        // A launch is mid-flight and its pane has not appeared yet. Saying
        // `already_running` would point at nothing; the honest answer lets the
        // next click read the settled state.
        return refusal('inquiry_in_flight');
      }
      in_flight.add(bead_id);
      try {
        return (await dispose(input, false)).outcome;
      } catch (err) {
        log('conversation click failed for %s: %o', bead_id, err);
        return refusal('error');
      } finally {
        in_flight.delete(bead_id);
      }
    },

    /**
     * Whether a launch (or a paused resume) holds this Bead's reservation.
     *
     * @param {string} bead_id
     */
    isInFlight(bead_id) {
      return in_flight.has(bead_id);
    },

    /**
     * Take this Bead's reservation synchronously for a paused attempt's
     * resume or residue settlement (UI-6kj0 §3.3). False when a launch or
     * another holder has it;
     * the caller must `release` exactly what it took.
     *
     * @param {string} bead_id
     */
    reserve(bead_id) {
      if (in_flight.has(bead_id)) {
        return false;
      }
      in_flight.add(bead_id);
      return true;
    },

    /**
     * Give back a reservation `reserve` took.
     *
     * @param {string} bead_id
     */
    release(bead_id) {
      in_flight.delete(bead_id);
    },

    /** Probe the configured tmux socket at startup. */
    async probeTmux() {
      if (!readInquiryConfig().enabled) {
        return;
      }
      const listed = await launcher.listPanes(PANE_MARKER);
      // Daemons normally run without `--debug`; startup reachability must use
      // console output or this operational failure disappears entirely.
      if (!listed.ok) {
        console.warn(`direction_inquiry: tmux unreachable: ${listed.error}`);
        return;
      }
      console.log(
        `direction_inquiry: tmux reachable (${listed.rows.length} panes)`
      );
    }
  };
}
