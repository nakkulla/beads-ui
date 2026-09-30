/**
 * The mobile lane bar (UI-dbn6 §3.6). Below 720px one lane fills the screen;
 * this bar at the bottom switches lanes within thumb reach and shows each
 * lane's count with its stage-colour dot.
 */
import { html } from 'lit-html';
import { LANES, laneCount } from './lanes.js';

/**
 * @import { LaneModel } from '../../model/lane-model.js'
 * @import { LaneId } from './lanes.js'
 */

/**
 * @param {LaneModel} model
 * @param {LaneId} active
 * @returns {import('lit-html').TemplateResult}
 */
export function laneBar(model, active) {
  return html`<nav class="pl-lanebar" aria-label="레인">
    ${LANES.map(
      (lane) =>
        html`<button
          type="button"
          class="pl-lanebar__item${lane.id === active ? ' is-on' : ''}"
          data-op="mobile-lane"
          data-value=${lane.id}
          data-stage=${lane.stage}
          aria-pressed=${lane.id === active ? 'true' : 'false'}
        >
          <i aria-hidden="true"></i>
          <b>${laneCount(model, lane.id)}</b>
          <span>${lane.short}</span>
        </button>`
    )}
  </nav>`;
}
