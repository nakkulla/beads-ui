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
 * `setIntervalSeconds` changes the cadence of a running poller at once: the
 * old timer is dropped and a new one armed (or none, for a non-positive value),
 * so a later positive value restarts a poller that was switched off. Before
 * `start()` or after `stop()` it only records the value.
 *
 * @param {{ intervalSeconds: number, getClientCount: () => number, onTick: () => void }} options
 * @returns {{ start: () => void, stop: () => void, setIntervalSeconds: (seconds: number) => void }}
 */
export function createPoller({ intervalSeconds, getClientCount, onTick }) {
  /** @type {ReturnType<typeof setInterval> | null} */
  let timer = null;
  let started = false;
  let interval_seconds = intervalSeconds;

  function arm() {
    // Non-positive interval → polling off; never arm a timer. Guard re-entry so
    // a double start() does not stack intervals.
    if (!(interval_seconds > 0) || timer) {
      return;
    }
    timer = setInterval(() => {
      if (getClientCount() > 0) {
        onTick();
      }
    }, interval_seconds * 1000);
    timer.unref?.();
  }

  function disarm() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    started = true;
    arm();
  }

  function stop() {
    started = false;
    disarm();
  }

  /**
   * @param {number} seconds
   */
  function setIntervalSeconds(seconds) {
    interval_seconds = seconds;
    if (started) {
      disarm();
      arm();
    }
  }

  return { start, stop, setIntervalSeconds };
}
