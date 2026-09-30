/**
 * Overlay host primitive (UI-dbn6 §3.6·§4.4): a body-level full-viewport
 * layer — a dimmed backdrop and one content host — for a screen that sits
 * above the lanes (the transcript). The screen owns what goes in the host and
 * when the layer shows; `ui-overlay--sheet` makes the host full-screen below
 * 720px. The look (backdrop) is the primitive's, the z-order the screen's.
 */

/**
 * @param {Document} doc
 * @param {string} class_name - The screen's class; the host gets `<class>__host`.
 * @returns {{ overlay: HTMLDivElement, backdrop: HTMLDivElement, host: HTMLDivElement }}
 */
export function createOverlayHost(doc, class_name) {
  const overlay = doc.createElement('div');
  overlay.className = `ui-overlay ${class_name}`;
  overlay.hidden = true;
  const backdrop = doc.createElement('div');
  backdrop.className = 'ui-overlay__backdrop';
  const host = doc.createElement('div');
  host.className = `ui-overlay__host ${class_name}__host`;
  overlay.append(backdrop, host);
  doc.body.appendChild(overlay);
  return { overlay, backdrop, host };
}
