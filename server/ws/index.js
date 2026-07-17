/**
 * Barrel for the WebSocket server modules. Pure re-export surface so that
 * `server/ws.js` (the thin shim) and every existing `./ws.js` importer keep
 * their public API unchanged after the split.
 */
export {
  attachWsServer,
  handleMessage,
  isOriginAllowed
} from './connection.js';
export { scheduleListRefresh } from './refresh.js';
export { __resetRegistriesForTest, registryFor } from './context.js';
export { __resetWorkerQueueForTest } from './worker-handlers.js';
export { __resetUiOrderForTest } from './ui-order-handlers.js';
