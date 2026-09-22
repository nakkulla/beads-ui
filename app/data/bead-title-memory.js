/**
 * Last-known bead titles per workspace, for the client stores that assemble
 * server snapshots (UI-uhfj).
 *
 * The server's `bead_titles` decoration is partial by design (UI-12k6): a title
 * its cache does not hold right now — after a server restart, or while a
 * running session's `bd` write has expired the record (UI-eey2 §9.2) — is
 * omitted from that snapshot and arrives on a later one. An omitted key
 * therefore means "not known right now", not "untitled", yet the lane model
 * falls back to the bead id for it. This memory fills only the omitted keys; a
 * title the snapshot does carry always wins.
 *
 * The owning store keeps it across its own `clear()`: the resubscribe after a
 * server restart is exactly when the fresh snapshot knows the fewest titles.
 */

/**
 * @returns {{ fill: (root_dir: unknown, titles: unknown) => Record<string, string>|null }}
 */
export function createBeadTitleMemory() {
  /** @type {Map<string, Map<string, string>>} */
  const by_root = new Map();

  return {
    /**
     * Remember the titles a snapshot carries and return them with the
     * remembered ones filling its omitted keys, or null when nothing was
     * omitted so the caller keeps its object as it is.
     *
     * @param {unknown} root_dir
     * @param {unknown} titles
     * @returns {Record<string, string>|null}
     */
    fill(root_dir, titles) {
      if (typeof root_dir !== 'string' || root_dir.length === 0) {
        return null;
      }
      let known = by_root.get(root_dir);
      if (!known) {
        known = new Map();
        by_root.set(root_dir, known);
      }
      const incoming = /** @type {Record<string, string>} */ (
        titles && typeof titles === 'object' && !Array.isArray(titles)
          ? titles
          : {}
      );
      for (const [bead_id, title] of Object.entries(incoming)) {
        if (typeof title === 'string' && title.length > 0) {
          known.set(bead_id, title);
        }
      }
      /** @type {Record<string, string>|null} */
      let filled = null;
      for (const [bead_id, title] of known) {
        if (!Object.hasOwn(incoming, bead_id)) {
          if (filled === null) {
            filled = { ...incoming };
          }
          filled[bead_id] = title;
        }
      }
      return filled;
    }
  };
}
