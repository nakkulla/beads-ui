/**
 * The 판정 칩 사유 팝업 vocabulary (UI-8x90 §4.5, UI-wg68 §5.2) — moved from
 * `views/worker/lanes.js` (UI-dbn6 Phase 1) so the pipeline screen and the
 * issue detail read the same sentences. Pure: no template.
 *
 * @import { MiniItem } from './lane-model.js'
 */
import {
  AREA_LABELS,
  areaLabels,
  areaTooltip
} from '../utils/area-judgement.js';
import { complexReasonSentences } from '../utils/complex-judgement.js';
import { placementTitle } from './placement.js';

/**
 * One popup's content. The view composes it; `exit` is the last-line exit
 * control (UI-pw2g §3.4), absent when there is no material (fail-quiet).
 *
 * @typedef {{ title: string, lines: string[], exit?: import('lit-html').TemplateResult }} ChipPopoverContent
 */

/**
 * The route this row observed, the only material deciding whether a chip click
 * is refused as a quick fix issue (§5.2). Candidate rows carry `route`; overlay
 * rows carry it inside `workflow` (false when neither is known).
 *
 * @param {MiniItem} item
 * @returns {string}
 */
export function routeOf(item) {
  if (typeof item.route === 'string' && item.route.length > 0) {
    return item.route;
  }
  const workflow = /** @type {any} */ (item.workflow);
  const route = workflow && workflow.route;
  return typeof route === 'string' ? route : '';
}

/**
 * The last guidance line of a chip that still opens a 팝업 (UI-wg68 §5.2).
 * quick fix 이슈에서는 바인딩이 있어도 칩 클릭이 없으므로 다른 문장을 읽는다.
 *
 * @param {MiniItem} item
 * @returns {string}
 */
function chipBindingGuidance(item) {
  return routeOf(item) === 'quick_fix'
    ? 'quick fix 이슈에는 칩 적용이 없습니다 — 적용은 이슈 상세의 quick fix 프리셋에서'
    : '칩에 프리셋을 매려면 전체 범위 ⚙ → 전역 탭';
}

/**
 * Select the first readiness judgment defined by UI-ff10 §6.1.
 *
 * @param {MiniItem} item
 * @returns {{ label: string, title: string }|null}
 */
export function readinessJudgement(item) {
  if (!Object.hasOwn(item, 'route_ok') || item.queue_placeable === true) {
    return null;
  }
  let label = '';
  if (item.route_ok === false) {
    label = '라우팅 필요';
  }
  if (
    label.length === 0 &&
    (item.worker_ineligible === true || item.awaiting_user === true)
  ) {
    return null;
  }
  if (label.length === 0 && item.missing_description === true) {
    label = '본문 필요';
  } else if (label.length === 0 && item.placement_spec === 'conflict') {
    label = '스펙 충돌';
  } else if (
    label.length === 0 &&
    Object.hasOwn(item, 'placement_spec') &&
    item.placement_spec !== 'published'
  ) {
    label = '스펙 미발행';
  }
  if (label.length === 0) {
    return null;
  }
  return {
    label,
    title: placementTitle({
      placeable: false,
      route_ok: item.route_ok,
      worker_ineligible: item.worker_ineligible === true,
      awaiting_user: item.awaiting_user === true,
      missing_description: item.missing_description === true,
      spec: item.placement_spec
    })
  };
}

/**
 * `badge` 등급 코드 하나가 무엇을 뜻하는지 (UI-h6t1 §4.3 표). 계약이 등급을
 * 소유하므로 여기 없는 코드는 코드 문자열 그대로 읽힌다 — 계약이 자란 코드를
 * 이 표가 삼키면 새 잔여가 화면에서 사라진다.
 *
 * @type {Record<string, string>}
 */
export const RECEIPT_BADGE_TEXT = {
  absent: '실행 영수증이 기록되지 않았다 — 과거 Bead·외부 경로 PR은 원래 없다',
  unparsable:
    '영수증 값을 읽을 수 없다 — 40hex SHA나 `delegated:`/`main:` 형식이 아니다',
  effort_unknown:
    'effort 토큰이 harness 어휘 밖이다 — 모델·SHA·unit은 유효하다',
  main_reason_retired:
    '`main:` 사유가 고정 4토큰(bead·quick_fix_default·phase_line·takeover) 밖이다',
  main_receipt_unbacked:
    '`main:` 사유를 뒷받침하는 메타데이터(impl_dispatch·route·planned_execution·quick_fix 기본 dispatch)가 없다',
  takeover_lineage_missing:
    '`main:takeover`인데 resolved 모델과 일치하는 완료된 위임 세션이 없다',
  takeover_lineage_unobservable:
    '`main:takeover`인데 위임 계보를 모니터가 볼 수 없다(Codex 밖 런타임)'
};

/**
 * @param {MiniItem} item
 * @returns {string[]}
 */
export function receiptBadgeCodesOf(item) {
  const codes = item.receipt_badge ? item.receipt_badge.codes : null;
  return Array.isArray(codes)
    ? codes.filter((code) => typeof code === 'string' && code.length > 0)
    : [];
}

/**
 * `session_preferred_reason` → 칩 툴팁 문구 (UI-49mc §4.2). enum 밖 사유는 투영
 * 술어가 이미 걸러내므로 여기 닿지 않고, 매핑이 비면 툴팁 없이 칩만 그린다.
 *
 * @type {Record<string, string>}
 */
export const SESSION_PREFERRED_TOOLTIP = {
  external_roundtrip:
    '하네스 밖 상대와 예측 불가 왕복 반복 — 다른 rig 세션·사람·외부 시스템',
  user_feedback_loop:
    '진행 중 사용자 피드백 없이는 품질이 낮음 — 문안·설계 세부·방향 선택'
};

/**
 * One 판정 칩's 사유 팝업 내용 (UI-8x90 §4.5 표), without the gate popup's
 * template exit (`views` adds it). 두 탭과 이슈 상세가 같은
 * 함수를 부르므로 같은 판정이 어디서나 같은 문장으로 읽힌다. 재료가 없으면
 * `null`이고 그 칩에는 팝업이 열리지 않는다 (fail-quiet).
 *
 * @param {MiniItem} item
 * @param {string} chip_key
 * @returns {ChipPopoverContent|null}
 */
export function judgementPopoverLines(item, chip_key) {
  if (chip_key === 'complex') {
    const reason = item.complex_reason;
    if (typeof reason !== 'string' || reason.length === 0) {
      return null;
    }
    return {
      title: '복잡한 작업으로 판정됨',
      lines: [...complexReasonSentences(reason), chipBindingGuidance(item)]
    };
  }
  if (AREA_LABELS.includes(chip_key)) {
    // 영역 칩에는 사유 키가 없다 — 라벨 자체가 판정이다 (UI-wg68 §5.4). 그래서
    // 팝업의 제목이 그 판정의 한 줄이고, 본문은 클릭이 무엇을 하는지(또는 왜
    // 아무것도 하지 않는지)만 남는다. 라벨이 없는 bead에는 팝업도 없다.
    if (!areaLabels(item.labels).includes(chip_key)) {
      return null;
    }
    return {
      title: areaTooltip(chip_key),
      lines: [chipBindingGuidance(item)]
    };
  }
  if (chip_key === 'session_preferred') {
    if (item.session_preferred !== true) {
      return null;
    }
    const reason =
      SESSION_PREFERRED_TOOLTIP[item.session_preferred_reason || ''] || '';
    return {
      title: '워커로 돌릴 수 있지만 세션이 낫다',
      lines: reason.length > 0 ? [reason] : []
    };
  }
  if (chip_key === 'ineligible') {
    if (item.worker_ineligible !== true) {
      return null;
    }
    return {
      title: '워커 실행 대상이 아니다',
      lines: [
        'worker-ineligible 라벨이 붙어 있다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    };
  }
  if (chip_key === 'spec_after_blocker') {
    if (item.spec_after_blocker !== true) {
      return null;
    }
    const blockers = Array.isArray(item.blocked_by) ? item.blocked_by : [];
    return {
      title: '선행 결과가 설계 전제 — 스펙도 선행 뒤에',
      lines: [
        `선행: ${blockers.join(' · ')}`,
        '선행이 닫히면 이 표시는 저절로 사라진다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    };
  }
  if (chip_key === 'gate') {
    const gate = item.gate;
    if (!gate) {
      return null;
    }
    // 출구 `↻ 지금 프로브`는 이 팝업 안이다 (UI-pw2g §3.4) — 템플릿이라 그리는
    // 쪽이 붙인다; 여기는 보류의 사실만 말한다.
    return {
      title: '자동 디스패치가 막혀 있다',
      lines: gate.lines
    };
  }
  if (chip_key === 'readiness') {
    const judgement = readinessJudgement(item);
    if (!judgement) {
      return null;
    }
    return {
      title: judgement.title,
      lines: []
    };
  }
  if (chip_key === 'receipt') {
    const codes = receiptBadgeCodesOf(item);
    if (codes.length === 0) {
      return null;
    }
    return {
      title: '실행 영수증 회계 잔여 — 머지는 진행',
      lines: [
        ...codes.map((code) => RECEIPT_BADGE_TEXT[code] || code),
        '자동 머지 판정에는 영향이 없다 — 정정은 bd update --set-metadata exec_receipt=… 로'
      ]
    };
  }
  if (chip_key === 'qfr') {
    const review = item.workflow ? item.workflow.quick_fix_review : null;
    if (!review || (review.state !== 'reviewed' && review.state !== 'stale')) {
      return null;
    }
    const missing = Array.isArray(review.missing) ? review.missing : [];
    return {
      title:
        review.state === 'reviewed'
          ? 'quick_fix self-review 영수증이 지금 본문과 일치합니다'
          : 'quick_fix self-review 영수증이 지금 본문과 다릅니다',
      lines: missing.length > 0 ? missing : ['빠진 항목 없음']
    };
  }
  return null;
}
