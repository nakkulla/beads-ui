/**
 * Thin compatibility shim. The WebSocket server implementation moved into
 * `server/ws/` (split into context / refresh / handlers / connection modules).
 * This file preserves the literal `./ws.js` import specifier used by
 * `server/index.js` and the `ws.*.test.js` characterization suite: Node ESM
 * does not resolve a bare `./ws.js` specifier to the sibling `./ws/` directory,
 * so this shim must remain a real file.
 */
export * from './ws/index.js';
