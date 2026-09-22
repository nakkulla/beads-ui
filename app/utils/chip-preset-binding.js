/**
 * What ONE judgement chip does on ONE issue: nothing (it is a 사유 팝업), or an
 * `chip-preset-toggle` that applies the bound preset / restores the pre-click
 * pins (UI-wg68 §5.1·§5.2).
 *
 * Every surface — 후보 카드, 대기·완료 행, 실행 타일, 이슈 상세 헤더 — asks this
 * one function, so a chip never reads two ways. Three different facts share the
 * same silent answer (`null`): no binding, an unarrived preset snapshot, and a
 * `route=quick_fix` issue. All three mean "draw the popup chip you drew before".
 *
 * @typedef {Object} ChipPresetContext
 * @property {Record<string, string|null>|null|undefined} [bindings] - `chip_bindings` of the snapshot.
 * @property {Array<Record<string, any>>|null|undefined} [presets] - The snapshot's presets.
 * @property {number} [revision] - The snapshot revision, the CAS value of a click.
 * @property {(root_dir: string) => any} [catalogOf] - That repo's runner catalog, for the deviation judgement.
 * @property {(bead_id: string, chip: string) => boolean} [isBusy] - Whether a click is in flight.
 */
/**
 * @typedef {Object} ChipPresetBinding
 * @property {string} preset_id
 * @property {string} preset_name
 * @property {'applied'|'diverged'|'unapplied'|''} state - `''` while the
 * deviation is undecidable (no catalog yet): bound and clickable, but silent.
 * @property {'apply'|'restore'} action
 * @property {string} title_suffix
 * @property {boolean} busy
 */
import { presetDeviation } from '../views/detail-panel/effective-settings.js';
import {
  APPLIED_EXEC_PRESET_KEY,
  CHIP_BINDING_KEYS,
  CHIP_PRESET_SOURCE_KEY
} from '../views/settings-dialog/session-model.js';

/**
 * Whether one chip's click writes the issue instead of opening the 사유 팝업.
 *
 * @param {string} chip - The `data-chip-key` value.
 * @param {Record<string, any>|null|undefined} metadata - The issue metadata.
 * @param {string|null|undefined} route - The issue's observed `route`.
 * @param {ChipPresetContext|null|undefined} ctx - The preset snapshot context.
 * @param {string} [bead_id] - The issue id, for the in-flight lookup.
 * @param {string} [root_dir] - The issue's repo, for the catalog lookup.
 * @returns {ChipPresetBinding|null}
 */
export function chipPresetBinding(
  chip,
  metadata,
  route,
  ctx,
  bead_id = '',
  root_dir = ''
) {
  if (!ctx || !CHIP_BINDING_KEYS.includes(chip)) {
    return null;
  }
  // 칩 클릭은 quick_fix 이슈에서 동작하지 않는다 (§0, ADR UI-wg68).
  if (route === 'quick_fix') {
    return null;
  }
  const bindings = ctx.bindings;
  const preset_id =
    bindings && typeof bindings === 'object'
      ? /** @type {any} */ (bindings)[chip]
      : null;
  if (typeof preset_id !== 'string' || preset_id.length === 0) {
    return null;
  }
  const preset = (ctx.presets || []).find(
    (entry) => entry && entry.id === preset_id
  );
  if (!preset) {
    return null;
  }
  const meta = metadata && typeof metadata === 'object' ? metadata : null;
  const state = stateOf(chip, meta, preset, preset_id, route, ctx, root_dir);
  // 클릭이 적용인지 복원인지는 **정체성 두 키의 일치**가 정한다 (§4.1 표) —
  // `data-state`가 아니라. 어긋남 계산이 아직 불가능한 동안(카탈로그 미도착)
  // 상태는 비지만 서버의 판정은 이미 정해져 있으므로, 툴팁이 "적용"을 말하고
  // 서버가 복원하는 어긋남이 생기지 않게 같은 재료로 답한다.
  const action = identityMatches(chip, meta, preset_id) ? 'restore' : 'apply';
  const preset_name = typeof preset.name === 'string' ? preset.name : preset_id;
  return {
    preset_id,
    preset_name,
    state,
    action,
    title_suffix:
      action === 'restore'
        ? ' · 클릭: 클릭 전 설정으로 복원'
        : ` · 클릭: ${preset_name} 적용`,
    busy: ctx.isBusy ? ctx.isBusy(bead_id, chip) === true : false
  };
}

/**
 * Whether this chip owns the pins standing on the issue: the chip that wrote
 * them and the preset they came from both match (§4.1). This is the server's
 * own restore condition, so the click hint never promises the opposite of what
 * the write will do.
 *
 * @param {string} chip
 * @param {Record<string, any>|null} metadata
 * @param {string} preset_id
 * @returns {boolean}
 */
function identityMatches(chip, metadata, preset_id) {
  return (
    !!metadata &&
    metadata[CHIP_PRESET_SOURCE_KEY] === chip &&
    metadata[APPLIED_EXEC_PRESET_KEY] === preset_id
  );
}

/**
 * The `data-state` of one bound chip (§5.1 표). Without the issue's own
 * metadata nothing is decidable, so the chip stays bound but silent.
 *
 * @param {string} chip
 * @param {Record<string, any>|null} metadata
 * @param {Record<string, any>} preset
 * @param {string} preset_id
 * @param {string|null|undefined} route
 * @param {ChipPresetContext} ctx
 * @param {string} root_dir
 * @returns {'applied'|'diverged'|'unapplied'|''}
 */
function stateOf(chip, metadata, preset, preset_id, route, ctx, root_dir) {
  if (!metadata) {
    return '';
  }
  if (!identityMatches(chip, metadata, preset_id)) {
    return 'unapplied';
  }
  const catalog = ctx.catalogOf ? ctx.catalogOf(root_dir) : null;
  const deviation = presetDeviation(
    metadata,
    preset,
    typeof route === 'string' ? route : null,
    catalog
  );
  if (deviation === null) {
    return '';
  }
  return deviation.count === 0 ? 'applied' : 'diverged';
}

/**
 * The chip's own display name — `복잡` reads as its Korean chip text, the area
 * chips as the label itself (§5.4).
 *
 * @param {string} chip
 * @returns {string}
 */
export function chipDisplayName(chip) {
  return chip === 'complex' ? '복잡' : chip;
}

/**
 * The ONE click path behind a bound judgement chip, shared by 워커·모니터·이슈
 * 상세 so the same click never means two things (§5.3).
 *
 * The in-flight set is a convenience only: correctness belongs to the server's
 * per-issue chain (§4.5), and this merely stops a second request the user
 * cannot yet see the answer to.
 *
 * @param {{ transport: (type: any, payload?: unknown) => Promise<any>, store: { get: () => any, set: (state: any) => void }, onChange?: () => void, toast?: (message: string, kind?: string) => void }} options
 * @returns {{ isBusy: (bead_id: string, chip: string) => boolean, toggle: (bead_id: string, chip: string, root_dir?: string) => Promise<void> }}
 */
export function createChipPresetToggle(options) {
  /** @type {Set<string>} */
  const in_flight = new Set();

  /**
   * @param {string} bead_id
   * @param {string} chip
   * @param {string} root_dir
   * @returns {string}
   */
  function keyOf(bead_id, chip, root_dir) {
    return `${root_dir}\u0000${bead_id}\u0000${chip}`;
  }

  /**
   * @param {string} message
   * @param {string} [kind]
   */
  function say(message, kind = 'info') {
    options.toast?.(message, kind);
  }

  return {
    /**
     * @param {string} bead_id
     * @param {string} chip
     * @returns {boolean}
     */
    isBusy(bead_id, chip) {
      for (const key of in_flight) {
        if (key.endsWith(`\u0000${bead_id}\u0000${chip}`)) {
          return true;
        }
      }
      return false;
    },

    /**
     * @param {string} bead_id
     * @param {string} chip
     * @param {string} [root_dir]
     * @returns {Promise<void>}
     */
    async toggle(bead_id, chip, root_dir = '') {
      const state = options.store.get();
      if (!state || typeof state.revision !== 'number' || !bead_id || !chip) {
        return;
      }
      const key = keyOf(bead_id, chip, root_dir);
      if (in_flight.has(key)) {
        return;
      }
      const bound_id = (state.chip_bindings || {})[chip] || '';
      const preset = (state.presets || []).find(
        (/** @type {any} */ entry) => entry && entry.id === bound_id
      );
      in_flight.add(key);
      options.onChange?.();
      try {
        const res = await options.transport('chip-preset-toggle', {
          id: bead_id,
          chip,
          expected_revision: state.revision,
          ...(root_dir ? { root_dir } : {})
        });
        if (res && res.conflict === true) {
          options.store.set({
            revision: res.revision,
            presets: res.presets,
            chip_bindings: res.chip_bindings
          });
          say('프리셋 목록이 바뀌었습니다 — 다시 누르세요', 'error');
        } else if (res && res.applied === 'applied') {
          const name = preset && preset.name ? preset.name : bound_id;
          say(`${chipDisplayName(chip)} → ${name} 적용`, 'success');
        } else if (res && res.applied === 'restored') {
          say('클릭 전 설정으로 복원', 'success');
        }
      } catch (err) {
        say(
          `칩 적용 실패: ${err instanceof Error ? err.message : String(err)}`,
          'error'
        );
      } finally {
        in_flight.delete(key);
        options.onChange?.();
      }
    }
  };
}
