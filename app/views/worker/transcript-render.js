/**
 * Compatibility re-export of the transcript parser (UI-eey2 §9.3).
 *
 * The parser itself moved to `app/utils/transcript-lines.js` so the SERVER can
 * import it too — `server/worker/session-log.js` runs one
 * {@link createTranscriptReducer} per attempt to derive the running attempt's
 * `last_activity` overlay. The drawer and its tests keep importing from here,
 * so no render path changed.
 */
export {
  createTranscriptReducer,
  diffCounts,
  parseTranscript
} from '../../utils/transcript-lines.js';

/**
 * A parsed display line.
 *
 * @typedef {import('../../utils/transcript-lines.js').DisplayLine} DisplayLine
 */
