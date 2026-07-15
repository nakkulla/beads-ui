/**
 * Worker view entry point. The implementation lives in `worker/index.js`
 * (queue console: candidate lanes + Serial/Parallel placement + ▶/⏸ controls);
 * this thin re-export preserves the `./views/worker.js` import specifier used by
 * `main.js`.
 */
export { createWorkerView } from './worker/index.js';
