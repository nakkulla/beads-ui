/**
 * Server-side periodic list-refresh poller (spec §7).
 *
 * The single fs watcher follows only the startup workspace's local DB file, so
 * writes from remote `bd` clients through central dolt never reach `fs.watch`.
 * This timer bridges that gap: while at least one WS client is connected it
 * invokes `onTick` on a fixed cadence so cross-device changes surface within one
 * interval. Ticks are gated on the live client count, so an idle server (no
 * connected clients) does no refresh work.
 *
 * The timer is `.unref()`ed so it never keeps the process alive. A non-positive
 * `intervalSeconds` (0 or negative) disables polling entirely — no timer is
 * armed.
 *
 * @param {{ intervalSeconds: number, getClientCount: () => number, onTick: () => void }} options
 * @returns {{ start: () => void, stop: () => void }}
 */
export function createPoller({ intervalSeconds, getClientCount, onTick }) {
  /** @type {ReturnType<typeof setInterval> | null} */
  let timer = null;

  function start() {
    // Non-positive interval → polling off; never arm a timer. Guard re-entry so
    // a double start() does not stack intervals.
    if (!(intervalSeconds > 0) || timer) {
      return;
    }
    timer = setInterval(() => {
      if (getClientCount() > 0) {
        onTick();
      }
    }, intervalSeconds * 1000);
    timer.unref?.();
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  return { start, stop };
}
