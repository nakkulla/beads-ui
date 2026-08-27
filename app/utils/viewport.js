/**
 * Viewport breakpoint watcher shared by the Worker and Monitor consoles
 * (UI-5ksp §4.7).
 *
 * 두 탭이 같은 모바일 분기를 쓰려면 "지금 모바일인가"의 판정이 한 곳에 있어야
 * 한다. 계약은 두 줄이다: 등록 시 현재 값을 **동기적으로 한 번** 콜백하고
 * (그래서 첫 렌더부터 모바일 DOM이다), 이후에는 값이 바뀔 때만 전달한다.
 * `matchMedia`가 없는 런타임은 최초 `false`만 받고 구독 자체가 없다 — 데스크톱
 * 조립으로 남는 것이 그런 환경에서 옳은 기본값이다.
 */

/** @type {string} */
export const MOBILE_QUERY = '(max-width: 640px)';

/**
 * @param {(is_mobile: boolean) => void} on_change - 등록 즉시 현재 `matches`를
 * 받고, 이후에는 값이 바뀔 때만 다시 받는다.
 * @returns {() => void} 이 구독을 끊는다. `matchMedia`가 없는 런타임에서는
 * 끊을 것이 없으므로 아무것도 하지 않는다.
 */
export function watchMobile(on_change) {
  if (typeof window.matchMedia !== 'function') {
    on_change(false);
    return () => {};
  }
  const mql = window.matchMedia(MOBILE_QUERY);
  let current = !!mql.matches;
  on_change(current);
  /** @param {unknown} ev */
  const onMediaChange = (ev) => {
    const from_event =
      typeof ev === 'object' &&
      ev !== null &&
      typeof (/** @type {{ matches?: unknown }} */ (ev).matches) === 'boolean'
        ? /** @type {{ matches: boolean }} */ (ev).matches
        : mql.matches;
    const next = !!from_event;
    if (next === current) {
      return;
    }
    current = next;
    on_change(next);
  };
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', onMediaChange);
    return () => {
      mql.removeEventListener('change', onMediaChange);
    };
  }
  if (typeof mql.addListener === 'function') {
    // Safari < 14 과 legacy API만 가진 jsdom shim.
    mql.addListener(onMediaChange);
    return () => {
      if (typeof mql.removeListener === 'function') {
        mql.removeListener(onMediaChange);
      }
    };
  }
  return () => {};
}
